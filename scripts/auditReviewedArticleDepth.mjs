import {ARTICLE_PROSE_WORD_MINIMUM} from './articleDepthPolicy.mjs';
import {buildArticleDepthInventory} from './buildArticleDepthInventory.mjs';
import {buildEditorialCoverage} from './buildEditorialCoverage.mjs';

const [inventory, editorial] = await Promise.all([
  buildArticleDepthInventory(),
  buildEditorialCoverage(),
]);

for (const issue of inventory.integrityIssues) console.error(`INTEGRITY: ${issue}`);
const reviewedKeys = new Set(
  editorial.entries
    .filter(({authoredStatus}) => authoredStatus === 'claim-reviewed')
    .map(({category, id}) => `${category}:${id}`),
);
const reviewed = inventory.articles.filter(({contentCategory, canonicalId}) =>
  reviewedKeys.has(`${contentCategory}:${canonicalId}`));
const missing = [...reviewedKeys].filter((key) => !reviewed.some(({contentCategory, canonicalId}) =>
  key === `${contentCategory}:${canonicalId}`));
const failures = reviewed.filter(({substantiveWordCount}) => substantiveWordCount < ARTICLE_PROSE_WORD_MINIMUM);

for (const record of reviewed) {
  console.log(
    `${record.contentCategory}/${record.canonicalId}: ${record.substantiveWordCount} substantive article words — `
    + `${record.substantiveWordCount >= ARTICLE_PROSE_WORD_MINIMUM ? 'PASS' : 'FAIL'} `
    + `(minimum ${ARTICLE_PROSE_WORD_MINIMUM})`,
  );
}
for (const key of missing) console.error(`${key}: claim-reviewed record is missing from the canonical depth inventory.`);
console.log(
  `Dynamic reviewed-depth audit: ${reviewed.length} claim-reviewed canonical articles; `
  + `${failures.length + missing.length} failures.`,
);
if (inventory.integrityIssues.length || failures.length || missing.length) process.exitCode = 1;
