import {readFile} from 'node:fs/promises';
import {loadAppData} from './loadAppData.mjs';
import {
  generatedArtifactMatches,
  writeGeneratedArtifactIfChanged,
} from './generatedArtifactIntegrity.mjs';

const LEDGER_JSON_URL = new URL('../docs/editorial/exhibit-review-ledger.json', import.meta.url);
const LEDGER_MARKDOWN_URL = new URL('../docs/editorial/exhibit-review-ledger.md', import.meta.url);
const ARTICLE_STATUSES = ['unreviewed', 'bibliography-only', 'source-mapped', 'claim-reviewed', 'review-out-of-date'];
const EXHIBIT_STATUSES = ['unreviewed', 'reconciled', 'standard-compliant', 'out-of-date'];
const ACCEPTED_PILOT_REFS = new Set([
  'buddhist-philosophies:nagarjuna',
  'german-idealism-afterlives:kantianism',
  'hellenistic-roman-ways:sextus-empiricus',
  'latin-christian-scholastic:boethius',
  'utility-liberty-history-capital:marxism',
]);
const write = process.argv.includes('--write');

const countWords = (value = '') => String(value).trim().split(/\s+/u).filter(Boolean).length;
const countsByStatus = (entries, key, statuses) => Object.fromEntries(
  statuses.map((status) => [status, entries.filter((entry) => entry[key] === status).length]),
);
const escapeCell = (value) => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');

const presentationReview = ({hallId, exhibit, interpretation, asset, plaqueInvitation}) => {
  const issues = [];
  const presentation = interpretation?.presentation;
  const paragraphs = interpretation?.sections?.flatMap((section) => section.paragraphs) ?? [];
  const mainWords = countWords(paragraphs.join(' '));
  const orientation = presentation?.orientation ?? [];
  const visitorGuideShape = orientation.length > 0 && orientation.every((section) =>
    section
    && typeof section === 'object'
    && typeof section.heading === 'string'
    && Array.isArray(section.items),
  );
  const guideSections = visitorGuideShape ? orientation : [];
  const guideItemCount = guideSections.reduce((total, section) => total + section.items.length, 0);
  const provenanceFields = asset
    ? ['creator', 'objectDate', 'institution', 'sourcePageUrl', 'attribution', 'license', 'historicalNote']
      .filter((field) => !String(asset[field] ?? '').trim())
    : [];
  const acceptedPilot = ACCEPTED_PILOT_REFS.has(`${hallId}:${exhibit.id}`);

  if (presentation?.mode !== 'concise') issues.push('not concise');
  if (presentation?.bodyLayout !== 'prose') issues.push('not prose-layout');
  if (presentation?.exhibitLayout !== 'object-led') issues.push('not object-led');
  if (String(interpretation?.lead ?? '').trim()) issues.push('duplicates a separate lead');
  if (interpretation?.sections?.length !== 1 || (acceptedPilot ? paragraphs.length !== 3 : ![3, 4].includes(paragraphs.length))) {
    issues.push(acceptedPilot ? 'accepted pilot no longer has three prose paragraphs' : 'not three or four prose paragraphs');
  }
  if (interpretation?.sections?.some(({heading}) => heading.trim())) issues.push('visible section heading');
  if (acceptedPilot ? mainWords < 250 || mainWords > 268 : mainWords < 280) {
    issues.push(`main interpretation ${mainWords} words`);
  }
  if (!visitorGuideShape) issues.push('missing subject-specific visitor-guide sections');
  if (guideSections.some(({heading, items}) => !heading.trim() || items.length === 0)) {
    issues.push('visitor-guide section lacks a heading or item');
  }
  if (guideSections.some(({items}) => items.some(({label, description}) =>
    !String(label ?? '').trim() || !String(description ?? '').trim()))) {
    issues.push('visitor-guide item lacks an explained label');
  }
  if (!presentation?.articleActionLabel?.startsWith('Read the full sourced ')) issues.push('missing full-article CTA');
  if ((interpretation?.keyIdeas?.length ?? 0) > 0 || (interpretation?.keyWorks?.length ?? 0) > 0) {
    issues.push('mechanical idea/work catalog retained');
  }
  const plaqueWords = countWords(plaqueInvitation);
  if (plaqueWords < 32 || plaqueWords > 35) issues.push(`wall plaque ${plaqueWords} words`);
  if (!asset) issues.push('missing principal object');
  if (!asset?.caption?.trim()) issues.push('missing object caption');
  if (provenanceFields.length) issues.push(`missing provenance: ${provenanceFields.join(', ')}`);
  if (!exhibit.principalAssetId || !interpretation?.objectInterpretations?.[exhibit.principalAssetId]?.trim()) {
    issues.push('missing object interpretation');
  }

  return {
    standardCompliant: issues.length === 0,
    plaqueWords,
    mainInterpretationWords: mainWords,
    paragraphCount: paragraphs.length,
    guideSectionCount: guideSections.length,
    guideItemCount,
    principalAssetId: exhibit.principalAssetId ?? null,
    issues,
  };
};

const data = await loadAppData();
const programEntries = data.museumCanonicalProgram.flatMap((hall) => hall.rooms.flatMap((room) =>
  room.exhibits.map((exhibit) => ({hall, room, exhibit})),
));
const interpretationByRef = new Map(data.museumInterpretations.map((record) => [`${record.hallId}:${record.id}`, record]));
const assetById = new Map(data.museumAssets.map((asset) => [asset.id, asset]));
const articleStatusEntries = data.canonicalArticles.map((article) => ({
  article,
  status: data.reviewLock.effectiveEditorialStatus(article.editorialRecord),
}));

const entries = programEntries.map(({hall, room, exhibit}) => {
  const category = exhibit.entityKind === 'philosopher' ? 'philosopher' : 'philosophy';
  const candidates = articleStatusEntries.filter(({article}) =>
    article.category === category && article.canonicalId === exhibit.entityId,
  );
  const interpretation = interpretationByRef.get(`${hall.id}:${exhibit.id}`);
  const routedId = interpretation?.articleRoute?.kind === 'philosopher'
    ? interpretation.articleRoute.philosopherId
    : interpretation?.articleRoute?.branchId;
  const routeMatches = interpretation?.articleRoute?.kind === exhibit.entityKind && routedId === exhibit.entityId;
  const relationshipStatus = candidates.length === 0 || !interpretation
    ? 'unmatched'
    : candidates.length > 1
      ? 'ambiguous'
      : routeMatches
        ? 'matched'
        : 'ambiguous';
  const article = candidates.length === 1 ? candidates[0].article : undefined;
  const articleReviewStatus = candidates.length === 1 ? candidates[0].status : null;
  const authoredStatus = interpretation
    ? data.exhibitReview.authoredMuseumExhibitReviewStatus(interpretation)
    : 'unreviewed';
  const effectiveStatus = interpretation && article
    ? data.exhibitReview.effectiveMuseumExhibitReviewStatus(interpretation, article.editorialRecord)
    : authoredStatus === 'unreviewed' ? 'unreviewed' : 'out-of-date';
  const plaqueInvitation = data.primaryPlaqueInvitationOverrides[exhibit.id] ?? exhibit.question;
  const presentation = presentationReview({
    hallId: hall.id,
    exhibit,
    interpretation,
    asset: exhibit.principalAssetId ? assetById.get(exhibit.principalAssetId) : undefined,
    plaqueInvitation,
  });

  return {
    hallId: hall.id,
    roomId: room.id,
    exhibitId: exhibit.id,
    entityKind: exhibit.entityKind,
    entityId: exhibit.entityId,
    canonicalTitle: candidates.length === 1 ? candidates[0].article.title : null,
    articleRelationship: {
      status: relationshipStatus,
      expectedCategory: category,
      candidateCount: candidates.length,
      routeMatches,
    },
    articleReviewStatus,
    exhibitAuthoredStatus: authoredStatus,
    exhibitStatus: effectiveStatus,
    reviewedOn: interpretation?.review?.reviewedOn ?? null,
    presentation: authoredStatus === 'unreviewed' ? undefined : presentation,
  };
});

const relationshipBlockers = entries
  .filter(({articleRelationship}) => articleRelationship.status !== 'matched')
  .map((entry) => ({
    hallId: entry.hallId,
    roomId: entry.roomId,
    exhibitId: entry.exhibitId,
    entityKind: entry.entityKind,
    entityId: entry.entityId,
    ...entry.articleRelationship,
  }));
const articleCounts = countsByStatus(articleStatusEntries, 'status', ARTICLE_STATUSES);
const exhibitCounts = countsByStatus(entries, 'exhibitStatus', EXHIBIT_STATUSES);
const relationshipCounts = Object.fromEntries(['matched', 'unmatched', 'ambiguous'].map((status) => [
  status,
  entries.filter(({articleRelationship}) => articleRelationship.status === status).length,
]));
const reviewedEntries = entries.filter(({exhibitAuthoredStatus}) => exhibitAuthoredStatus !== 'unreviewed');
const errors = [];

for (const blocker of relationshipBlockers) errors.push(`${blocker.hallId}/${blocker.exhibitId}: ${blocker.status} article relationship`);
for (const entry of reviewedEntries) {
  if (entry.exhibitStatus === 'out-of-date') errors.push(`${entry.hallId}/${entry.exhibitId}: exhibit review lock is out of date`);
  if (!entry.presentation.standardCompliant && entry.exhibitAuthoredStatus === 'standard-compliant') {
    errors.push(`${entry.hallId}/${entry.exhibitId}: ${entry.presentation.issues.join('; ')}`);
  }
  if (entry.exhibitAuthoredStatus === 'standard-compliant' && entry.articleReviewStatus !== 'claim-reviewed') {
    errors.push(`${entry.hallId}/${entry.exhibitId}: standard-compliant exhibit lacks a current claim-reviewed article`);
  }
}

const supplementalTotal = data.museumSupplementalExhibits.length;
const supplementalReviewed = data.museumSupplementalExhibits.filter(({exhibit}) =>
  data.exhibitReview.authoredMuseumExhibitReviewStatus(exhibit) !== 'unreviewed').length;
const supplementalBacklog = supplementalTotal - supplementalReviewed;
const museumStopCount = entries.length + supplementalTotal;
const dataAsOf = reviewedEntries.map(({reviewedOn}) => reviewedOn).filter(Boolean).sort().at(-1) ?? null;
const ledger = {
  dataAsOf,
  museumProgramContext: {
    supplementalExhibits: {total: supplementalTotal, reviewed: supplementalReviewed, backlog: supplementalBacklog},
    museumStops: museumStopCount,
  },
  canonicalArticleBaseline: {
    total: articleStatusEntries.length,
    countsByEffectiveStatus: articleCounts,
  },
  canonicalExhibitBaseline: {
    total: entries.length,
    countsByEffectiveStatus: exhibitCounts,
  },
  articleRelationships: {
    counts: relationshipCounts,
    blockers: relationshipBlockers,
  },
  reviewedExhibits: reviewedEntries.length,
  errors,
  entries,
};
const serialized = `${JSON.stringify(ledger, null, 2)}\n`;

const markdown = `# Canonical exhibit-review ledger

Data as of: ${dataAsOf ?? 'no exhibit reviews'}

This generated ledger inventories the canonical Museum program and joins each exhibit to the live canonical article registry, current article review lock, primary interpretation, principal object, and exhibit review lock. Authored review metadata remains in the canonical interpretation records; this file is a reproducible report, not a parallel source of truth.

Regenerate it with \`npm run report:exhibits\` and verify it with \`npm run audit:exhibits\`.

Current generated Museum context: **${supplementalReviewed}/${supplementalTotal} supplemental exhibits reviewed**, **${supplementalBacklog === 0 ? 'zero backlog' : `${supplementalBacklog} in backlog`}**, and **${museumStopCount}/${museumStopCount} current Museum stops interpreted**. These are internal, AI-assisted editorial review states, not independent academic or peer review.

## Article baseline

| Total | Unreviewed | Bibliography only | Source mapped | Claim reviewed | Review out of date |
| ---: | ---: | ---: | ---: | ---: | ---: |
| ${articleStatusEntries.length} | ${articleCounts.unreviewed} | ${articleCounts['bibliography-only']} | ${articleCounts['source-mapped']} | ${articleCounts['claim-reviewed']} | ${articleCounts['review-out-of-date']} |

## Exhibit baseline

| Total | Unreviewed | Reconciled | Standard compliant | Out of date |
| ---: | ---: | ---: | ---: | ---: |
| ${entries.length} | ${exhibitCounts.unreviewed} | ${exhibitCounts.reconciled} | ${exhibitCounts['standard-compliant']} | ${exhibitCounts['out-of-date']} |

## Article relationships

| Matched | Unmatched | Ambiguous |
| ---: | ---: | ---: |
| ${relationshipCounts.matched} | ${relationshipCounts.unmatched} | ${relationshipCounts.ambiguous} |

${relationshipBlockers.length ? relationshipBlockers.map((blocker) => `- ${blocker.hallId}/${blocker.exhibitId}: ${blocker.status} ${blocker.entityKind}:${blocker.entityId}`).join('\n') : 'No unmatched or ambiguous canonical exhibit-to-article relationships were found.'}

## Reviewed exhibits

| Exhibit | Article status | Exhibit status | Plaque words | Main words | Paragraphs | Guide sections | Guide items | Presentation |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
${reviewedEntries.map((entry) => `| ${escapeCell(entry.canonicalTitle ?? entry.exhibitId)} | ${entry.articleReviewStatus} | ${entry.exhibitStatus} | ${entry.presentation.plaqueWords} | ${entry.presentation.mainInterpretationWords} | ${entry.presentation.paragraphCount} | ${entry.presentation.guideSectionCount} | ${entry.presentation.guideItemCount} | ${entry.presentation.standardCompliant ? 'standard presentation' : escapeCell(entry.presentation.issues.join('; '))} |`).join('\n') || '| — | — | — | — | — | — | — | — | — |'}

## Complete canonical inventory

| Hall | Room | Exhibit | Entity | Article relationship | Article status | Exhibit status |
| --- | --- | --- | --- | --- | --- | --- |
${entries.map((entry) => `| ${escapeCell(entry.hallId)} | ${escapeCell(entry.roomId)} | ${escapeCell(entry.exhibitId)} | ${escapeCell(`${entry.entityKind}:${entry.entityId}`)} | ${entry.articleRelationship.status} | ${entry.articleReviewStatus ?? '—'} | ${entry.exhibitStatus} |`).join('\n')}
`;

const ledgerArtifacts = [
  [LEDGER_JSON_URL, serialized, 'JSON'],
  [LEDGER_MARKDOWN_URL, markdown, 'Markdown'],
];

if (write) {
  const changed = await Promise.all(ledgerArtifacts.map(([url, generated]) =>
    writeGeneratedArtifactIfChanged(url, generated)));
  console.log(
    `${changed.some(Boolean) ? 'Wrote changed' : 'Verified unchanged'} exhibit-review ledgers for `
    + `${entries.length} canonical exhibits and ${articleStatusEntries.length} canonical articles.`,
  );
} else {
  for (const [url, generated, label] of ledgerArtifacts) {
    try {
      const existing = await readFile(url, 'utf8');
      if (!generatedArtifactMatches(existing, generated)) {
        errors.push(`generated exhibit-review ${label} ledger is stale; run npm run report:exhibits`);
      }
    } catch {
      errors.push(`generated exhibit-review ${label} ledger is missing; run npm run report:exhibits`);
    }
  }
}

console.log(
  `Exhibit review audit: ${entries.length} canonical exhibits; ${exhibitCounts['standard-compliant']} standard-compliant; `
  + `${exhibitCounts.reconciled} reconciled; ${relationshipCounts.unmatched} unmatched; ${relationshipCounts.ambiguous} ambiguous; ${errors.length} errors.`,
);
if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exitCode = 1;
}
