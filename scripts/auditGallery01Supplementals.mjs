import {readFile, writeFile} from 'node:fs/promises';
import {loadAppData} from './loadAppData.mjs';

const HALL_ID = 'mediterranean-beginnings-classical';
const EXPECTED_COUNT = 5;
const LEDGER_JSON_URL = new URL('../docs/editorial/gallery-01-supplemental-review-ledger.json', import.meta.url);
const LEDGER_MARKDOWN_URL = new URL('../docs/editorial/gallery-01-supplemental-review-ledger.md', import.meta.url);
const PANEL_RENDERER_URL = new URL('../src/components/MuseumGallery/MuseumSupplementalInterpretationPanel.tsx', import.meta.url);
const MUSEUM_CSS_URL = new URL('../src/components/MuseumGallery/museum.css', import.meta.url);
const write = process.argv.includes('--write');
const countWords = (value = '') => String(value).trim().split(/\s+/u).filter(Boolean).length;
const escapeCell = (value) => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
const aspectRatio = ({width, height}) => width / height;
const aspectMatches = (left, right, tolerance = .002) => Math.abs(left - right) <= tolerance;
const genericGuideHeading = /^(?:visitor guide|how to read(?: this exhibit)?|key ideas|historical cautions|interpretive anchors|keep in view)$/iu;

const data = await loadAppData();
const [panelRendererSource, museumCssSource] = await Promise.all([
  readFile(PANEL_RENDERER_URL, 'utf8'),
  readFile(MUSEUM_CSS_URL, 'utf8'),
]);
const registryEntries = data.museumSupplementalExhibits.filter(({hallId}) => hallId === HALL_ID);
const assetsById = new Map(data.museumAssets.map((asset) => [asset.id, asset]));
const errors = [];
const reviewedGuideHeadingCounts = new Map();
for (const {exhibit} of data.museumSupplementalExhibits.filter(({hallId}) =>
  hallId === HALL_ID || hallId === 'hellenistic-roman-ways')) {
  for (const {heading} of exhibit.visitorGuide ?? []) {
    reviewedGuideHeadingCounts.set(heading, (reviewedGuideHeadingCounts.get(heading) ?? 0) + 1);
  }
}

if (registryEntries.length !== EXPECTED_COUNT) {
  errors.push(`${HALL_ID}: authoritative runtime registry returned ${registryEntries.length}, expected ${EXPECTED_COUNT}`);
}
if (new Set(registryEntries.map(({exhibit}) => exhibit.id)).size !== registryEntries.length) {
  errors.push(`${HALL_ID}: duplicate supplemental IDs in authoritative runtime registry`);
}
if (!/exhibit\.visitorGuide[\s\S]*museum-visitor-guide/u.test(panelRendererSource)) {
  errors.push('supplemental renderer does not consume the subject-specific structured interpretation');
}
if (!/museum-primary-reference \.museum-object-hero img\{width:auto;max-width:100%;height:auto;[\s\S]*object-fit:contain/u.test(museumCssSource)) {
  errors.push('object-led panel images are not protected from non-uniform scaling');
}

const entries = registryEntries.map(({exhibit, layout}) => {
  const routeId = exhibit.articleRoute?.kind === 'philosopher'
    ? exhibit.articleRoute.philosopherId
    : exhibit.articleRoute?.branchId;
  const category = exhibit.articleRoute?.kind === 'philosopher' ? 'philosopher' : 'philosophy';
  const article = data.canonicalArticles.find((candidate) =>
    candidate.category === category && candidate.canonicalId === routeId,
  );
  const authoredStatus = data.exhibitReview.authoredMuseumExhibitReviewStatus(exhibit);
  const effectiveStatus = article
    ? data.exhibitReview.effectiveMuseumExhibitReviewStatus(exhibit, article.editorialRecord)
    : authoredStatus === 'unreviewed' ? 'unreviewed' : 'out-of-date';
  const articleStatus = article ? data.reviewLock.effectiveEditorialStatus(article.editorialRecord) : null;
  const sourceIds = exhibit.sources.map(({id}) => id).filter(Boolean);
  const sourceIdSet = new Set(sourceIds);
  const visitorGuide = exhibit.visitorGuide ?? [];
  const visitorGuideItems = visitorGuide.flatMap(({items}) => items);
  const mappedClaims = [
    ...exhibit.sections.map((section, index) => ({kind: `paragraph ${index + 1}`, ids: section.sourceIds})),
    ...visitorGuide.flatMap((section, sectionIndex) => section.items.map((item, itemIndex) => ({
      kind: `structured interpretation ${sectionIndex + 1}.${itemIndex + 1}`,
      ids: item.sourceIds,
    }))),
  ];
  const principalAsset = assetsById.get(exhibit.panelAssetId);
  const physicalAsset = assetsById.get(layout.assetId);
  const paragraphs = exhibit.sections.flatMap(({paragraphs}) => paragraphs);
  const mainWords = countWords(paragraphs.join(' '));
  const visitorCopy = [
    exhibit.displayName,
    exhibit.objectInterpretation,
    ...paragraphs,
    ...visitorGuide.flatMap(({heading, items}) => [heading, ...items.flatMap(({label, description}) => [label, description])]),
  ].filter(Boolean).join(' ');
  const issues = [];

  if (!article) issues.push('canonical article route is unmatched');
  if (articleStatus !== 'claim-reviewed') issues.push(`canonical article status is ${articleStatus ?? 'missing'}`);
  if (authoredStatus !== 'standard-compliant') issues.push(`authored review status is ${authoredStatus}`);
  if (effectiveStatus !== 'standard-compliant') issues.push(`effective review status is ${effectiveStatus}`);
  if (!exhibit.review?.resolution?.trim()) issues.push('missing explicit resolution');
  if (exhibit.presentation?.exhibitLayout !== 'object-led') issues.push('not object-led');
  if (visitorGuide.length < 1 || visitorGuide.length > 3) issues.push(`structured interpretation has ${visitorGuide.length} sections`);
  if (visitorGuideItems.length < 2 || visitorGuideItems.length > 6) issues.push(`structured interpretation has ${visitorGuideItems.length} items`);
  for (const section of visitorGuide) {
    if (!section.heading.trim() || genericGuideHeading.test(section.heading.trim())) issues.push(`generic structured heading: ${section.heading || '(blank)'}`);
    if (reviewedGuideHeadingCounts.get(section.heading) !== 1) issues.push(`structured heading is reused across reviewed supplementals: ${section.heading}`);
    if (section.items.length < 1 || section.items.length > 3) issues.push(`${section.heading} has ${section.items.length} items`);
    for (const item of section.items) {
      if (!item.label.trim() || !item.description.trim()) issues.push(`${section.heading} has an empty label or explanation`);
    }
  }
  if (paragraphs.length !== 3 || mainWords < 280) issues.push(`interpretation depth is ${paragraphs.length} paragraphs / ${mainWords} words`);
  if (exhibit.sections.some(({heading}) => heading.trim())) issues.push('object-led interpretation retains visible section headings');
  if (!exhibit.objectInterpretation?.trim()) issues.push('missing object interpretation');
  if (/\b(?:modal|panel|room) object\b|Visitor Guide|How to read this exhibit|previously displayed|generated (?:hall|image|illustration)/iu.test(visitorCopy)) {
    issues.push('visitor-facing copy retains internal, instructional, or change-log language');
  }
  if (exhibit.id === 'greek-philosophy-reception' && exhibit.displayName !== 'The School of Athens') {
    issues.push('School of Athens does not use its sole canonical subject title');
  }
  if (!exhibit.wallPlaque?.title?.trim() && !exhibit.shortTitle.trim()) issues.push('missing factual plaque title');
  if (!exhibit.wallPlaque?.invitation?.trim()) issues.push('missing authored plaque invitation');
  if (sourceIds.length !== exhibit.sources.length || sourceIdSet.size !== sourceIds.length) issues.push('source IDs are missing or duplicated');
  for (const source of exhibit.sources) {
    if (!source.id?.trim()) continue;
    try {
      const url = new URL(source.url);
      if (url.protocol !== 'https:') issues.push(`${source.id} does not use HTTPS`);
    } catch {
      issues.push(`${source.id} has an invalid URL`);
    }
  }
  for (const claim of mappedClaims) {
    if (!claim.ids?.length) issues.push(`${claim.kind} has no source mapping`);
    for (const id of claim.ids ?? []) if (!sourceIdSet.has(id)) issues.push(`${claim.kind} cites unknown source ${id}`);
  }
  if (!principalAsset) issues.push(`missing panel asset ${exhibit.panelAssetId}`);
  if (!physicalAsset) issues.push(`missing physical asset ${layout.assetId}`);
  if (layout.assetId !== exhibit.assetId) issues.push('physical layout asset differs from record asset');
  for (const [role, asset] of [['panel', principalAsset], ['physical', physicalAsset]]) {
    if (!asset) continue;
    for (const field of ['creator', 'objectDate', 'institution', 'sourcePageUrl', 'license', 'attribution', 'alt', 'caption', 'historicalNote']) {
      if (!String(asset[field] ?? '').trim()) issues.push(`${role} asset lacks ${field}`);
    }
    const ownerApprovedCaveIllustration = asset.id === 'plato-cave-interpretive-illustration'
      && asset.sourcePageUrl === 'https://github.com/Da3dalusCode/philosophy-museum/blob/main/public/assets/museum/ancient-greek/plato-cave-interpretive-illustration-panel.webp'
      && asset.license === 'Original Philosophy Atlas Museum interpretive illustration';
    const collectionBackedSource = asset.sourcePageUrl.startsWith('https://commons.wikimedia.org/wiki/File:')
      || ownerApprovedCaveIllustration
      || (asset.id === 'plato-republic-justice-ideal-city' && asset.sourcePageUrl === 'https://www.nga.gov/artworks/10139-justice');
    if (!collectionBackedSource) issues.push(`${role} asset lacks an exact reusable file or collection source`);
    if (!ownerApprovedCaveIllustration && /generated|original Philosophy Atlas Museum interpretive illustration|2026/iu.test(JSON.stringify(asset))) issues.push(`${role} asset retains generated-image metadata`);
    if (!asset.variants?.scene || !asset.variants?.panel) issues.push(`${role} asset lacks scene or panel derivative dimensions`);
    else if (!aspectMatches(aspectRatio(asset.variants.scene), aspectRatio(asset.variants.panel))) {
      issues.push(`${role} scene and panel derivatives use inconsistent aspect ratios`);
    }
  }
  if (physicalAsset?.variants?.scene && !aspectMatches(
    layout.mediaMount.width / layout.mediaMount.height,
    aspectRatio(physicalAsset.variants.scene),
    .00001,
  )) issues.push('3D media mount distorts the scene derivative aspect ratio');

  if (issues.length) errors.push(`${exhibit.id}: ${issues.join('; ')}`);
  return {
    id: exhibit.id,
    title: exhibit.displayName,
    articleRoute: exhibit.articleRoute,
    articleStatus,
    authoredReviewStatus: authoredStatus,
    effectiveReviewStatus: effectiveStatus,
    reviewedOn: exhibit.review?.reviewedOn ?? null,
    resolution: exhibit.review?.resolution ?? null,
    presentation: {
      objectLed: exhibit.presentation?.exhibitLayout === 'object-led',
      mainWords,
      paragraphs: paragraphs.length,
      visitorGuideSections: visitorGuide.length,
      visitorGuideItems: visitorGuideItems.length,
      aspectSafe: Boolean(physicalAsset?.variants?.scene) && aspectMatches(
        layout.mediaMount.width / layout.mediaMount.height,
        aspectRatio(physicalAsset.variants.scene),
        .00001,
      ),
    },
    evidence: {
      interpretationSources: exhibit.sources.length,
      mappedClaimUnits: mappedClaims.length,
      panelAssetId: exhibit.panelAssetId,
      physicalAssetId: layout.assetId,
      sourcePageUrl: principalAsset?.sourcePageUrl ?? null,
      rights: principalAsset?.license ?? null,
      sceneDimensions: physicalAsset?.variants?.scene
        ? `${physicalAsset.variants.scene.width}×${physicalAsset.variants.scene.height}`
        : null,
      panelDimensions: principalAsset?.variants?.panel
        ? `${principalAsset.variants.panel.width}×${principalAsset.variants.panel.height}`
        : null,
    },
    issues,
  };
});

const ledger = {
  dataAsOf: entries.map(({reviewedOn}) => reviewedOn).filter(Boolean).sort().at(-1) ?? null,
  authority: 'Runtime MUSEUM_SUPPLEMENTAL_EXHIBITS registry filtered by hallId',
  hallId: HALL_ID,
  registryCount: registryEntries.length,
  reviewedCount: entries.filter(({authoredReviewStatus}) => authoredReviewStatus !== 'unreviewed').length,
  resolvedCount: entries.filter(({effectiveReviewStatus, issues}) => effectiveReviewStatus === 'standard-compliant' && issues.length === 0).length,
  errors,
  entries,
};
const serialized = `${JSON.stringify(ledger, null, 2)}\n`;
const markdown = `# Gallery 01 supplemental review ledger

Data as of: ${ledger.dataAsOf ?? 'no reviews'}

This generated ledger derives its complete inventory from the authoritative runtime supplemental registry filtered to \`${HALL_ID}\`. Authored review metadata remains on each supplemental record; this report proves registry-to-review coverage without creating a second exhibit registry.

Regenerate with \`npm run report:gallery01-supplementals\` and verify with \`npm run audit:gallery01-supplementals\`.

| Registry | Reviewed | Resolved | Errors |
| ---: | ---: | ---: | ---: |
| ${ledger.registryCount} | ${ledger.reviewedCount} | ${ledger.resolvedCount} | ${errors.length} |

| ID | Title | Resolution | Article | Main words | Sidebar | Sources | Scene / panel pixels | Asset / rights |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
${entries.map((entry) => `| ${escapeCell(entry.id)} | ${escapeCell(entry.title)} | ${escapeCell(entry.resolution)} | ${escapeCell(entry.articleStatus)} / ${escapeCell(entry.effectiveReviewStatus)} | ${entry.presentation.mainWords} | ${entry.presentation.visitorGuideSections} / ${entry.presentation.visitorGuideItems} | ${entry.evidence.interpretationSources} | ${escapeCell(entry.evidence.sceneDimensions)} / ${escapeCell(entry.evidence.panelDimensions)} | ${escapeCell(entry.evidence.panelAssetId)} / ${escapeCell(entry.evidence.rights)} |`).join('\n')}
`;

if (write) {
  await Promise.all([
    writeFile(LEDGER_JSON_URL, serialized, 'utf8'),
    writeFile(LEDGER_MARKDOWN_URL, markdown, 'utf8'),
  ]);
  console.log(`Wrote Gallery 01 supplemental ledger for ${entries.length} registry records.`);
} else {
  let existing;
  try {
    existing = await readFile(LEDGER_JSON_URL, 'utf8');
  } catch {
    errors.push('generated ledger is missing; run npm run report:gallery01-supplementals');
  }
  if (existing !== undefined && existing !== serialized) errors.push('generated ledger is stale; run npm run report:gallery01-supplementals');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Gallery 01 supplemental audit passed: ${entries.length} registry records, ${ledger.resolvedCount} resolved.`);
}
