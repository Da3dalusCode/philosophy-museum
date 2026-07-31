import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {ARTICLE_PROSE_WORD_MINIMUM, countArticleProseWords} from './articleDepthPolicy.mjs';
import {loadAppData} from './loadAppData.mjs';

const VALID_STATUSES = new Set(['unreviewed', 'bibliography-only', 'source-mapped', 'claim-reviewed']);
const VALID_SOURCE_TYPES = new Set([
  'primary-text',
  'scholarly-reference',
  'journal-article',
  'scholarly-book',
  'institutional-archive',
]);
const VALID_LOCATOR_KINDS = new Set([
  'section',
  'chapter',
  'standard-division',
  'book-chapter',
  'line',
  'verse',
  'page',
  'work',
]);

const HIGH_RISK_PATTERNS = [
  {kind: 'quotation', pattern: /[“”]|(?:^|\s)"[^"\n]{4,}"/u},
  {kind: 'exact-date', pattern: /\b(?:[1-9]\d{0,3})\s*(?:BCE|CE)\b/u},
  {kind: 'priority-or-superlative', pattern: /\b(?:first|founder|founded|invented|originated|decisive|greatest|most influential)\b/iu},
  {kind: 'influence-or-causation', pattern: /\b(?:influenced|influence on|led to|gave rise to|caused|shaped the development|developed from)\b/iu},
  {kind: 'disputed-attribution', pattern: /\b(?:attributed|authorship|disputed|uncertain|legendary|pseudonymous)\b/iu},
  {kind: 'broad-classification', pattern: /\b(?:Western|Eastern|Indian|Chinese|African|Islamic|European) (?:philosophy|tradition|thought|culture)\b/iu},
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/u;
const DOI = /^10\.\d{4,9}\/\S+$/u;
const HTTP_URL = /^https?:\/\/\S+$/u;

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;
const duplicateValues = (values) => [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
const normalizeIsbn = (value) => String(value ?? '').replaceAll(/[-\s]/gu, '');
const validIsbn = (value) => {
  const normalized = normalizeIsbn(value);
  return /^\d{9}[\dX]$/u.test(normalized) || /^\d{13}$/u.test(normalized);
};

const citationEntries = (record) => {
  const paragraphCitations = (record.articleSections ?? []).flatMap((section) =>
    (section.paragraphs ?? []).flatMap((paragraph) =>
      typeof paragraph === 'string' ? [] : paragraph.citations.map((citation) => ({
        ...citation,
        location: `article paragraph ${paragraph.id || '(missing ID)'}`,
      }))),
  );
  const structuredClaimCitations = Object.entries(record.editorial?.structuredClaims ?? {}).flatMap(
    ([claimKey, claim]) => claim.citations.map((citation) => ({
      ...citation,
      location: `structured claim ${claimKey}`,
    })),
  );
  return [...paragraphCitations, ...structuredClaimCitations];
};

const readReviewNote = async (repoRoot, reviewNotePath) => {
  if (!isNonEmptyString(reviewNotePath)) return undefined;
  try {
    return await readFile(resolve(repoRoot, reviewNotePath), 'utf8');
  } catch {
    return undefined;
  }
};

const validateSource = (recordKey, source, errors) => {
  const at = `${recordKey}/source:${source.id || '(missing ID)'}`;
  if (!isNonEmptyString(source.id)) errors.push(`${at}: source ID is required.`);
  if (!VALID_SOURCE_TYPES.has(source.type)) errors.push(`${at}: invalid source type ${source.type ?? '(missing)'}.`);
  if (!Array.isArray(source.authors) || !source.authors.length || source.authors.some((author) => !isNonEmptyString(author))) {
    errors.push(`${at}: at least one non-empty author is required.`);
  }
  if (!isNonEmptyString(source.title)) errors.push(`${at}: title is required.`);
  if (!isNonEmptyString(source.url) || !HTTP_URL.test(source.url)) errors.push(`${at}: an HTTP(S) URL is required.`);
  if (source.year !== undefined && (!Number.isInteger(source.year) || source.year < 1 || source.year > 2100)) {
    errors.push(`${at}: year must be an integer from 1 through 2100.`);
  }
  if (source.accessedOn !== undefined && !ISO_DATE.test(source.accessedOn)) {
    errors.push(`${at}: accessedOn must use YYYY-MM-DD.`);
  }
  if (source.doi !== undefined && !DOI.test(source.doi)) errors.push(`${at}: malformed DOI ${source.doi}.`);
  if (source.isbn !== undefined && !validIsbn(source.isbn)) errors.push(`${at}: malformed ISBN ${source.isbn}.`);
  if (source.type === 'scholarly-reference' && (!isNonEmptyString(source.containerTitle) || !isNonEmptyString(source.publisher))) {
    errors.push(`${at}: scholarly references require containerTitle and publisher.`);
  }
  if (source.type === 'journal-article' && (!isNonEmptyString(source.containerTitle) || !Number.isInteger(source.year))) {
    errors.push(`${at}: journal articles require containerTitle and year.`);
  }
  if (source.type === 'scholarly-book' && (!isNonEmptyString(source.publisher) || !Number.isInteger(source.year))) {
    errors.push(`${at}: scholarly books require publisher and year.`);
  }
  if (source.type === 'institutional-archive' && !isNonEmptyString(source.publisher)) {
    errors.push(`${at}: institutional archives require publisher.`);
  }
};

const highRiskWarnings = (record, recordKey) => (record.articleSections ?? []).flatMap((section) =>
  (section.paragraphs ?? []).flatMap((paragraph, paragraphIndex) => {
    if (typeof paragraph !== 'string') return [];
    return HIGH_RISK_PATTERNS
      .filter(({pattern}) => pattern.test(paragraph))
      .map(({kind}) => ({
        recordKey,
        status: record.editorial?.review.status ?? (record.sourceLinks?.length ? 'bibliography-only' : 'unreviewed'),
        signal: kind,
        location: `${section.id || '(missing section)'}/paragraph-${paragraphIndex + 1}`,
        excerpt: paragraph.slice(0, 220).replaceAll(/\s+/gu, ' ').trim(),
      }));
  }),
);

export const buildEditorialCoverageFromData = async ({repoRoot, canonicalArticles, routeManifest, reviewLock}) => {
  const records = canonicalArticles.map((article) => ({
    category: article.category,
    title: article.title,
    visitorEntryPoint: article.visitorEntryPoint,
    record: article.editorialRecord,
  }));
  const errors = [];
  const warnings = [];
  const entries = [];

  const routedCanonicalKeys = new Set(canonicalArticles
    .filter(({category}) => ['philosopher', 'philosophy'].includes(category))
    .map(({category, canonicalId}) => `${category}:${canonicalId}`));
  const routeKeys = new Set([
    ...(routeManifest.philosophers ?? []).map(({id}) => `philosopher:${id}`),
    ...(routeManifest.branches ?? []).map(({id}) => `philosophy:${id}`),
  ]);
  for (const key of routedCanonicalKeys) if (!routeKeys.has(key)) errors.push(`${key}: canonical article is missing from the route manifest.`);
  for (const key of routeKeys) if (!routedCanonicalKeys.has(key)) errors.push(`${key}: route manifest record is missing from canonical article coverage.`);

  for (const {category, title, visitorEntryPoint, record} of records) {
    const recordKey = `${category}:${record.id}`;
    if (!isNonEmptyString(visitorEntryPoint)) errors.push(`${recordKey}: canonical visitor entry point is required.`);
    const editorial = record.editorial;
    const authoredStatus = reviewLock.authoredEditorialStatus(record);
    const effectiveStatus = reviewLock.effectiveEditorialStatus(record);
    const sources = editorial?.sources ?? [];
    const sourceIds = sources.map(({id}) => id);
    const duplicateSourceIds = duplicateValues(sourceIds);
    for (const id of duplicateSourceIds) errors.push(`${recordKey}: duplicate source ID ${id}.`);
    for (const source of sources) validateSource(recordKey, source, errors);

    const furtherReadingSourceIds = editorial?.furtherReadingSourceIds ?? [];
    for (const id of duplicateValues(furtherReadingSourceIds)) errors.push(`${recordKey}: duplicate further-reading source ID ${id}.`);
    for (const id of furtherReadingSourceIds) {
      if (!sourceIds.includes(id)) errors.push(`${recordKey}: further-reading source ${id} is not defined.`);
    }

    const citations = citationEntries(record);
    const citedSourceIds = new Set();
    for (const citation of citations) {
      const at = `${recordKey}/${citation.location}`;
      if (!isNonEmptyString(citation.sourceId)) {
        errors.push(`${at}: citation sourceId is required.`);
      } else if (!sourceIds.includes(citation.sourceId)) {
        errors.push(`${at}: citation points to undefined source ${citation.sourceId}.`);
      } else {
        citedSourceIds.add(citation.sourceId);
      }
      if (citation.locator) {
        if (!VALID_LOCATOR_KINDS.has(citation.locator.kind)) errors.push(`${at}: invalid locator kind ${citation.locator.kind}.`);
        if (!isNonEmptyString(citation.locator.value)) errors.push(`${at}: locator value is required.`);
      }
    }
    for (const id of furtherReadingSourceIds) {
      if (citedSourceIds.has(id)) errors.push(`${recordKey}: source ${id} cannot be both evidence and further reading.`);
    }
    for (const id of sourceIds) {
      if (!citedSourceIds.has(id) && !furtherReadingSourceIds.includes(id)) {
        errors.push(`${recordKey}: source ${id} is neither cited evidence nor declared further reading.`);
      }
    }

    const sectionIds = [];
    const paragraphIds = [];
    let structuredParagraphCount = 0;
    let paragraphCitationCount = 0;
    for (const section of record.articleSections ?? []) {
      sectionIds.push(section.id);
      for (const paragraph of section.paragraphs ?? []) {
        if (typeof paragraph === 'string') {
          if (['source-mapped', 'claim-reviewed'].includes(authoredStatus)) {
            errors.push(`${recordKey}/${section.id}: mapped or reviewed prose must use a structured paragraph with citations.`);
          }
          continue;
        }
        structuredParagraphCount += 1;
        paragraphIds.push(paragraph.id);
        paragraphCitationCount += paragraph.citations?.length ?? 0;
        if (!isNonEmptyString(paragraph.id)) errors.push(`${recordKey}/${section.id}: structured paragraph ID is required.`);
        if (!isNonEmptyString(paragraph.text)) errors.push(`${recordKey}/${section.id}/${paragraph.id}: paragraph text is required.`);
        if (!paragraph.citations?.length) errors.push(`${recordKey}/${section.id}/${paragraph.id}: mapped paragraph requires a citation.`);
      }
    }
    for (const id of duplicateValues(sectionIds)) errors.push(`${recordKey}: duplicate article section ID ${id}.`);
    for (const id of duplicateValues(paragraphIds)) errors.push(`${recordKey}: duplicate structured paragraph ID ${id}.`);

    const structuredClaims = Object.entries(editorial?.structuredClaims ?? {});
    for (const [claimKey, claim] of structuredClaims) {
      if (!isNonEmptyString(claimKey)) errors.push(`${recordKey}: structured claim key is required.`);
      if (!isNonEmptyString(claim.value)) errors.push(`${recordKey}/claim:${claimKey}: claim value is required.`);
      if (!claim.citations?.length) errors.push(`${recordKey}/claim:${claimKey}: mapped claim requires a citation.`);
    }
    if (editorial && !VALID_STATUSES.has(editorial.review?.status)) {
      errors.push(`${recordKey}: invalid authored editorial status ${editorial.review?.status ?? '(missing)'}.`);
    }
    if (['source-mapped', 'claim-reviewed'].includes(authoredStatus) && (!sources.length || !citations.length)) {
      errors.push(`${recordKey}: ${authoredStatus} requires defined sources and claim-level citations.`);
    }

    const wordCount = countArticleProseWords(record.articleSections);
    let noteExists = false;
    let currentLock = undefined;
    if (authoredStatus === 'claim-reviewed') {
      const review = editorial?.review;
      if (!reviewedDateIsValid(review?.reviewedOn)) errors.push(`${recordKey}: claim-reviewed record requires an ISO review date.`);
      if (!isNonEmptyString(review?.method)) errors.push(`${recordKey}: claim-reviewed record requires a recorded method.`);
      if (!isNonEmptyString(review?.reviewNotePath)) errors.push(`${recordKey}: claim-reviewed record requires a review-note path.`);
      const reviewNote = await readReviewNote(repoRoot, review?.reviewNotePath);
      noteExists = reviewNote !== undefined;
      if (!noteExists) errors.push(`${recordKey}: review note ${review?.reviewNotePath ?? '(missing)'} does not exist.`);
      if (!isNonEmptyString(review?.lock)) errors.push(`${recordKey}: claim-reviewed record requires a review lock.`);
      currentLock = reviewLock.computeEditorialReviewLock(record);
      if (review?.lock !== currentLock) errors.push(`${recordKey}: stored review lock is stale (stored ${review?.lock}; current ${currentLock}).`);
      if (reviewNote && review?.lock && !reviewNote.includes(review.lock)) {
        errors.push(`${recordKey}: review note does not record the stored review lock ${review.lock}.`);
      }
      if (reviewNote && !reviewNote.includes(`\`${record.id}\``)) {
        errors.push(`${recordKey}: review note does not identify canonical ID ${record.id}.`);
      }
      if (!structuredClaims.length) errors.push(`${recordKey}: claim-reviewed record requires cited structured claims.`);
      if (!structuredParagraphCount || !paragraphCitationCount) errors.push(`${recordKey}: claim-reviewed record requires cited structured article prose.`);
      const citedSources = sources.filter(({id}) => citedSourceIds.has(id));
      const citedSecondarySources = citedSources.filter(({type}) =>
        ['scholarly-reference', 'journal-article', 'scholarly-book'].includes(type));
      const citedSecondaryDomains = new Set(citedSecondarySources.map(({url}) => new URL(url).hostname));
      const evidencePolicy = review?.evidencePolicy ?? {};
      const minimumSecondarySources = evidencePolicy.minimumIndependentSecondarySources ?? 2;
      const minimumSecondaryDomains = evidencePolicy.minimumIndependentSecondaryDomains ?? 2;
      if (!Number.isInteger(minimumSecondarySources) || minimumSecondarySources < 1) {
        errors.push(`${recordKey}: minimumIndependentSecondarySources must be a positive integer.`);
      }
      if (!Number.isInteger(minimumSecondaryDomains) || minimumSecondaryDomains < 1) {
        errors.push(`${recordKey}: minimumIndependentSecondaryDomains must be a positive integer.`);
      }
      if (citedSecondarySources.length < minimumSecondarySources || citedSecondaryDomains.size < minimumSecondaryDomains) {
        errors.push(`${recordKey}: claim review requires at least ${minimumSecondarySources} cited secondary sources across ${minimumSecondaryDomains} independent domains.`);
      }
      const requiredSourceTypes = evidencePolicy.requiredSourceTypes ?? [];
      for (const sourceType of requiredSourceTypes) {
        if (!VALID_SOURCE_TYPES.has(sourceType)) {
          errors.push(`${recordKey}: evidence policy names invalid source type ${sourceType}.`);
        } else if (!citedSources.some(({type}) => type === sourceType)) {
          errors.push(`${recordKey}: claim review requires cited ${sourceType} evidence.`);
        }
      }
      if (wordCount < ARTICLE_PROSE_WORD_MINIMUM) {
        errors.push(`${recordKey}: claim-reviewed record has ${wordCount} substantive words; minimum is ${ARTICLE_PROSE_WORD_MINIMUM}.`);
      }
    }

    warnings.push(...highRiskWarnings(record, recordKey));
    entries.push({
      id: record.id,
      title,
      category,
      visitorEntryPoint,
      authoredStatus,
      effectiveStatus,
      sourceCount: sources.length,
      citedSourceCount: citedSourceIds.size,
      furtherReadingSourceCount: furtherReadingSourceIds.length,
      structuredClaimCount: structuredClaims.length,
      structuredParagraphCount,
      citationCount: citations.length,
      substantiveArticleWordCount: wordCount,
      reviewNotePath: editorial?.review.reviewNotePath,
      reviewNoteExists: authoredStatus === 'claim-reviewed' ? noteExists : undefined,
      storedReviewLock: editorial?.review.lock,
      currentReviewLock: currentLock,
    });
  }

  const reviewedDates = entries
    .map(({id, category}) => records.find(({record, category: recordCategory}) => record.id === id && recordCategory === category)?.record.editorial?.review.reviewedOn)
    .filter(reviewedDateIsValid)
    .sort();
  return {
    dataAsOf: reviewedDates.at(-1) ?? null,
    policy: {
      articleMinimum: ARTICLE_PROSE_WORD_MINIMUM,
      statusAndDepthAreIndependent: true,
      highRiskWarningsAreTriageSignalsOnly: true,
    },
    entries,
    warnings,
    errors,
  };
};

export const buildEditorialCoverage = async () => {
  const repoRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
  const {canonicalArticles, reviewLock} = await loadAppData();
  const routeManifest = JSON.parse(await readFile(new URL('../src/data/generated/routeManifest.json', import.meta.url), 'utf8'));
  return buildEditorialCoverageFromData({repoRoot, canonicalArticles, routeManifest, reviewLock});
};

const reviewedDateIsValid = (value) => isNonEmptyString(value) && ISO_DATE.test(value);
