import {mkdir, writeFile} from 'node:fs/promises';
import {buildArticleDepthInventory} from './buildArticleDepthInventory.mjs';

const inventory = await buildArticleDepthInventory();
const standaloneCategories = new Set(['work', 'text', 'argument', 'concept', 'museum-exhibit', 'other']);
const groups = [
  {
    label: 'Philosophers',
    records: inventory.articles.filter(({contentCategory}) => contentCategory === 'philosopher'),
  },
  {
    label: 'Philosophies, branches, schools, traditions, movements, methods, and frameworks',
    records: inventory.articles.filter(({contentCategory}) => contentCategory === 'philosophy'),
  },
  {
    label: 'Standalone works, texts, arguments, concepts, and article-backed exhibits',
    records: inventory.articles.filter(({contentCategory}) => standaloneCategories.has(contentCategory)),
  },
];
const summarize = (records) => ({
  total: records.length,
  pass: records.filter(({complianceStatus}) => complianceStatus === 'pass').length,
  fail: records.filter(({complianceStatus}) => complianceStatus === 'fail').length,
  missing: records.filter(({complianceStatus}) => complianceStatus === 'missing').length,
});
const groupSummaries = groups.map((group) => ({label: group.label, ...summarize(group.records)}));
const omitted = inventory.articles.filter(({legacyDepthAuditIncluded}) => !legacyDepthAuditIncluded);
const failures = inventory.articles.filter(({complianceStatus}) => complianceStatus !== 'pass');
const primaryBackings = inventory.museumPrimarySurfaces;
const supplementalBackings = inventory.museumSupplementalSurfaces.filter(({claimsArticleBacking}) => claimsArticleBacking);
const unbackedSupplemental = inventory.museumSupplementalSurfaces.filter(({claimsArticleBacking}) => !claimsArticleBacking);
const examples = inventory.museumSupplementalSurfaces.filter(({surfaceId}) =>
  ['plato-republic', 'plato-cave-book-vii'].includes(surfaceId));
const pilotBaselines = new Map([
  ['socrates', 2702],
  ['nagarjuna', 1805],
  ['feminist-philosophy', 3631],
]);
const pilotChanges = inventory.articles
  .filter(({canonicalId}) => pilotBaselines.has(canonicalId))
  .map((record) => ({
    canonicalId: record.canonicalId,
    title: record.title,
    baselineSubstantiveWordCount: pilotBaselines.get(record.canonicalId),
    removedSubstantiveWords: pilotBaselines.get(record.canonicalId),
    addedSubstantiveWords: record.substantiveWordCount,
    finalSubstantiveWordCount: record.substantiveWordCount,
    netChange: record.substantiveWordCount - pilotBaselines.get(record.canonicalId),
    complianceStatus: record.complianceStatus,
  }));

const report = {
  policy: inventory.policy,
  definition: 'A canonical visitor-facing body of long-form educational article-section prose that explains a philosopher, philosophy, branch, school, tradition, movement, method, major framework, standalone work, text, argument, concept, or major exhibit in depth. Short labels, drawers, plaques, captions, and Museum interpretation panels that route to a canonical article are supporting surfaces, not additional full articles.',
  categorySummary: groupSummaries,
  universalSummary: summarize(inventory.articles),
  pilotChanges,
  integrityIssues: inventory.integrityIssues,
  articles: inventory.articles,
  legacyAuditOmissions: omitted,
  museum: {
    primaryInterpretationCount: primaryBackings.length,
    supplementalSurfaceCount: inventory.museumSupplementalSurfaces.length,
    supplementalArticleBackingCount: supplementalBackings.length,
    supplementalWithoutArticleClaimCount: unbackedSupplemental.length,
    primarySurfaces: primaryBackings,
    supplementalSurfaces: inventory.museumSupplementalSurfaces,
  },
};

const escapeCell = (value) => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
const articleRow = (record) =>
  `| ${escapeCell(record.contentCategory)} | ${escapeCell(record.canonicalId)} | ${escapeCell(record.title)} | `
  + `${escapeCell(record.visitorEntryPoint)} | ${record.substantiveWordCount} | ${record.complianceStatus} | `
  + `${record.legacyDepthAuditIncluded ? 'yes' : 'no'} | `
  + `${record.reusedInMuseum ? `yes (${record.museumPrimaryReuseCount} primary; ${record.museumSupplementalReuseCount} supplemental)` : 'no'} |`;
const failingRows = failures.length
  ? failures.map((record) => `| ${escapeCell(record.canonicalId)} | ${escapeCell(record.title)} | ${escapeCell(record.contentCategory)} | ${record.substantiveWordCount} | ${record.complianceStatus} |`).join('\n')
  : '| — | — | — | — | — |';
const omittedRows = omitted.length
  ? omitted.map((record) => `| ${escapeCell(record.canonicalId)} | ${escapeCell(record.title)} | ${escapeCell(record.contentCategory)} | ${record.substantiveWordCount} | ${record.complianceStatus} |`).join('\n')
  : '| — | — | — | — | — |';
const exampleRows = examples.map((surface) =>
  `| ${escapeCell(surface.surfaceId)} | ${escapeCell(surface.title)} | ${surface.surfaceWords} | `
  + `${escapeCell(surface.canonicalArticleId)} | ${surface.canonicalArticleWordCount} | `
  + `${surface.canonicalArticleComplianceStatus} | no — this is a short Museum surface |`,
).join('\n');

const markdown = `# Universal article-depth inventory

## Applicable full article

${report.definition}

The current authoritative registry contains philosopher and philosophy articles. It contains no standalone long-form work, text, argument, concept, or Museum-exhibit article. Wall work drawers, timeline entries, nested work/concept cards, 191 primary Museum interpretation panels, and 409 supplemental Museum surfaces are intentionally concise interfaces; when they claim article backing, their route is validated against one canonical article.

## Word-count method

The hard floor is **${inventory.policy.minimumSubstantiveArticleWords.toLocaleString('en-US')} substantive article-prose words**. The counter tokenizes only the text of canonical article-section paragraphs with the Unicode pattern \`\\b[\\p{L}\\p{N}][\\p{L}\\p{N}’'-]*\\b\`. It does not count titles, headings, navigation, metadata, bibliography or citation text, reading-list metadata, image metadata, repeated rendering, or short Museum/interface copy. Length is a completeness test, not an accuracy, evidence, or review-status test.

## Category results

| Category | Total | Pass | Fail | Missing article |
| --- | ---: | ---: | ---: | ---: |
${groupSummaries.map((group) => `| ${escapeCell(group.label)} | ${group.total} | ${group.pass} | ${group.fail} | ${group.missing} |`).join('\n')}

Universal total: **${report.universalSummary.total}** applicable articles; **${report.universalSummary.pass} pass**; **${report.universalSummary.fail} fail**; **${report.universalSummary.missing} are missing article prose**.

Current failures are migration backlog, not approved exceptions. The strict audit is intentionally separate from the ordinary build until that backlog reaches zero.

## Pilot prose changes

Each pilot article was replaced as one reviewed body, so removed substantive words equal the complete baseline article count and added substantive words equal the complete final reviewed article count.

| Canonical ID | Baseline | Removed | Added | Final | Net | Final status |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
${pilotChanges.map((record) => `| ${record.canonicalId} | ${record.baselineSubstantiveWordCount} | ${record.removedSubstantiveWords} | ${record.addedSubstantiveWords} | ${record.finalSubstantiveWordCount} | ${record.netChange >= 0 ? '+' : ''}${record.netChange} | ${record.complianceStatus} |`).join('\n')}

## Every failing canonical article

| ID | Title | Category | Words | Status |
| --- | --- | --- | ---: | --- |
${failingRows}

## Records omitted by the former manual target list

| ID | Title | Category | Words | Status |
| --- | --- | --- | ---: | --- |
${omittedRows}

## Complete canonical inventory

| Category | Canonical ID | Title | Visitor entry point | Words | Status | In former audit | Museum reuse |
| --- | --- | --- | --- | ---: | --- | --- | --- |
${inventory.articles.map(articleRow).join('\n')}

## Museum article-backing audit

- Primary Museum interpretations: ${primaryBackings.length}; each maps one-to-one to a canonical philosopher or philosophy article.
- Supplemental Museum surfaces: ${inventory.museumSupplementalSurfaces.length}; ${supplementalBackings.length} claim a philosopher/philosophy article route and ${unbackedSupplemental.length} explicitly do not.
- Standalone Museum full articles discovered: 0.
- Full per-surface mappings are recorded in \`docs/editorial/article-depth-inventory.json\`.

| Example surface | Title | Supporting prose words | Canonical target | Target words | Target status | Standalone full article? |
| --- | --- | ---: | --- | ---: | --- | --- |
${exampleRows}

## Commands

- Complete report: \`npm run report:depth\`
- Strict universal audit: \`npm run audit:articles\`
- Pilot-only strict check: \`npm run audit:articles:pilots\`
`;

await mkdir(new URL('../docs/editorial/', import.meta.url), {recursive: true});
await Promise.all([
  writeFile(new URL('../docs/editorial/article-depth-inventory.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`, 'utf8'),
  writeFile(new URL('../docs/editorial/article-depth-inventory.md', import.meta.url), markdown, 'utf8'),
]);

console.log(
  `Complete article-depth report: ${report.universalSummary.total} canonical articles; `
  + `${report.universalSummary.pass} pass; ${report.universalSummary.fail + report.universalSummary.missing} fail or are missing.`,
);
for (const record of inventory.articles) {
  console.log(
    `${record.contentCategory}/${record.canonicalId}: ${record.substantiveWordCount} — `
    + `${record.complianceStatus.toUpperCase()} — ${record.visitorEntryPoint}`,
  );
}
console.log('Wrote docs/editorial/article-depth-inventory.md and docs/editorial/article-depth-inventory.json.');
