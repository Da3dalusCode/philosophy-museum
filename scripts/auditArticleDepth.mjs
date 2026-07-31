import {ARTICLE_PROSE_WORD_MINIMUM} from './articleDepthPolicy.mjs';
import {buildArticleDepthInventory, rawParagraphText} from './buildArticleDepthInventory.mjs';

const args = process.argv.slice(2);
const requestedIds = [];
for (let index = 0; index < args.length; index += 1) {
  if (args[index] === '--id') {
    const id = args[index + 1];
    if (!id) throw new Error('--id requires a canonical article ID');
    requestedIds.push(id);
    index += 1;
  } else {
    requestedIds.push(args[index]);
  }
}

const inventory = await buildArticleDepthInventory();
const fail = (message) => {
  console.error(message);
  process.exitCode = 1;
};
for (const issue of inventory.integrityIssues) fail(`INTEGRITY: ${issue}`);

const selected = requestedIds.length
  ? inventory.articles.filter(({canonicalId}) => requestedIds.includes(canonicalId))
  : inventory.articles;
for (const id of requestedIds) {
  if (!inventory.articles.some((record) => record.canonicalId === id)) fail(`${id}: unknown canonical article ID`);
}

console.log(
  `${requestedIds.length ? 'Targeted' : 'Universal'} article-depth audit: `
  + `${selected.length} canonical full articles; hard minimum ${ARTICLE_PROSE_WORD_MINIMUM} substantive words.`,
);

for (const record of selected) {
  console.log(
    `${record.contentCategory}/${record.canonicalId}: ${record.substantiveWordCount} substantive article words — `
    + `${record.complianceStatus.toUpperCase()} (minimum ${ARTICLE_PROSE_WORD_MINIMUM})`,
  );
  if (record.complianceStatus !== 'pass') process.exitCode = 1;

  const raw = inventory.rawArticleByKey.get(`${record.contentCategory}:${record.canonicalId}`);
  const sections = raw?.articleSections;
  if (!sections?.length) continue;
  const sectionIds = new Set();
  const paragraphIds = new Set();
  for (const section of sections) {
    if (!section.id || sectionIds.has(section.id)) fail(`${record.canonicalId}: duplicate or missing section ID ${section.id || '(missing)'}`);
    sectionIds.add(section.id);
    if (!section.title?.trim() || !section.paragraphs?.length) fail(`${record.canonicalId}/${section.id}: empty section title or prose`);
    for (const paragraph of section.paragraphs ?? []) {
      if (!rawParagraphText(paragraph).trim()) fail(`${record.canonicalId}/${section.id}: empty article paragraph`);
      if (typeof paragraph !== 'string') {
        if (!paragraph.id || paragraphIds.has(paragraph.id)) {
          fail(`${record.canonicalId}: duplicate or missing structured paragraph ID ${paragraph.id || '(missing)'}`);
        }
        paragraphIds.add(paragraph.id);
      }
    }
  }
}

const selectedIds = new Set(selected.map(({canonicalId}) => canonicalId));
const backedSurfaces = inventory.museumSupplementalSurfaces.filter(
  (surface) => surface.claimsArticleBacking
    && (!requestedIds.length || selectedIds.has(surface.canonicalArticleId)),
);
const inadequateBackings = backedSurfaces.filter(
  (surface) => surface.canonicalArticleComplianceStatus !== 'pass',
);
if (inadequateBackings.length) {
  const targets = new Set(inadequateBackings.map(({canonicalArticleId}) => canonicalArticleId));
  console.error(
    `Museum backing check: ${inadequateBackings.length} supplemental surfaces point to `
    + `${targets.size} missing or sub-${ARTICLE_PROSE_WORD_MINIMUM} canonical articles.`,
  );
  process.exitCode = 1;
} else {
  console.log(`Museum backing check: ${backedSurfaces.length} relevant supplemental article links resolve to compliant canonical articles.`);
}

if (!requestedIds.length) {
  const failures = inventory.articles.filter(({complianceStatus}) => complianceStatus !== 'pass');
  console.log(
    `Universal result: ${inventory.articles.length - failures.length} pass; ${failures.length} fail or are missing.`,
  );
}
