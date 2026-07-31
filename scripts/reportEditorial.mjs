import {mkdir, writeFile} from 'node:fs/promises';
import {buildEditorialCoverage} from './buildEditorialCoverage.mjs';

const result = await buildEditorialCoverage();
const standaloneCategories = new Set(['work', 'text', 'argument', 'concept', 'museum-exhibit', 'other']);
const groups = [
  {key: 'philosophers', label: 'Philosophers', entries: result.entries.filter(({category}) => category === 'philosopher')},
  {key: 'philosophies', label: 'Philosophies / branches / schools / traditions', entries: result.entries.filter(({category}) => category === 'philosophy')},
  {key: 'standalone', label: 'Standalone articles and major exhibits', entries: result.entries.filter(({category}) => standaloneCategories.has(category))},
];
const statuses = ['unreviewed', 'bibliography-only', 'source-mapped', 'claim-reviewed', 'review-out-of-date'];
const summarize = (entries) => Object.fromEntries([
  ['total', entries.length],
  ...statuses.map((status) => [status, entries.filter(({effectiveStatus}) => effectiveStatus === status).length]),
]);
const groupSummary = Object.fromEntries(groups.map(({key, entries}) => [key, summarize(entries)]));
const report = {...result, groupSummary};
const escapeCell = (value) => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');

const markdown = `# Editorial coverage report

Generated: ${result.generatedOn}

This report distinguishes bibliographies, mapped evidence, completed claim review, and stale review locks. It also reports article depth, but the hard ${result.policy.articleMinimum.toLocaleString('en-US')}-word completeness requirement is a separate test: length does not establish accuracy, sourcing, or review status.

## Status coverage

| Category | Total | Unreviewed | Bibliography only | Source mapped | Claim review current | Review out of date |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
${groups.map(({key, label}) => {
  const counts = groupSummary[key];
  return `| ${label} | ${counts.total} | ${counts.unreviewed} | ${counts['bibliography-only']} | ${counts['source-mapped']} | ${counts['claim-reviewed']} | ${counts['review-out-of-date']} |`;
}).join('\n')}

## Complete record inventory

| Category | ID | Title | Status | Sources | Cited | Claims | Paragraphs | Citations | Article words | Route |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
${result.entries.map((entry) => `| ${escapeCell(entry.category)} | ${escapeCell(entry.id)} | ${escapeCell(entry.title)} | ${entry.effectiveStatus} | ${entry.sourceCount} | ${entry.citedSourceCount} | ${entry.structuredClaimCount} | ${entry.structuredParagraphCount} | ${entry.citationCount} | ${entry.substantiveArticleWordCount} | ${escapeCell(entry.visitorEntryPoint)} |`).join('\n')}

## High-risk uncited-language triage

The patterns below flag uncited legacy article paragraphs containing quotation-like text, exact dates, priority claims, influence/causation language, disputed attribution, or broad classifications. They are review-routing signals, not findings of error or padding. Proximity to the depth floor is not treated as evidence of padding.

Total signals: **${result.warnings.length}**.

| Record | Current status | Signal | Location | Excerpt |
| --- | --- | --- | --- | --- |
${result.warnings.length ? result.warnings.map((warning) => `| ${escapeCell(warning.recordKey)} | ${warning.status} | ${warning.signal} | ${escapeCell(warning.location)} | ${escapeCell(warning.excerpt)} |`).join('\n') : '| — | — | — | — | — |'}

## Audit integrity

Structural errors: **${result.errors.length}**.

${result.errors.length ? result.errors.map((error) => `- ${error}`).join('\n') : 'No broken source IDs, duplicate source IDs, malformed source metadata, invalid locators, missing review notes, stale locks, or reviewed pages below the article floor were found.'}

Run \`npm run audit:editorial\` for the failing deterministic check and \`npm run report:editorial\` to regenerate this report.
`;

await mkdir(new URL('../docs/editorial/', import.meta.url), {recursive: true});
await Promise.all([
  writeFile(new URL('../docs/editorial/editorial-coverage-report.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`, 'utf8'),
  writeFile(new URL('../docs/editorial/editorial-coverage-report.md', import.meta.url), markdown, 'utf8'),
]);

console.log(
  `Editorial coverage report: ${result.entries.length} records; `
  + `${result.entries.filter(({effectiveStatus}) => effectiveStatus === 'claim-reviewed').length} current claim reviews; `
  + `${result.errors.length} structural errors; ${result.warnings.length} triage signals.`,
);
console.log('Wrote docs/editorial/editorial-coverage-report.md and docs/editorial/editorial-coverage-report.json.');
