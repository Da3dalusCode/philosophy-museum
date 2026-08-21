import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildEditorialCoverageFromData} from './buildEditorialCoverage.mjs';
import {loadAppData} from './loadAppData.mjs';

const repoRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const {canonicalArticles, museumAssets, museumSupplementalExhibits, reviewLock} = await loadAppData();
const socratesArticle = canonicalArticles.find(({canonicalId, category}) =>
  canonicalId === 'socrates' && category === 'philosopher');
assert(socratesArticle, 'Socrates canonical article must exist.');
const original = socratesArticle.editorialRecord;
assert.equal(reviewLock.effectiveEditorialStatus(original), 'claim-reviewed');

const clone = () => structuredClone(original);
const expectStale = (mutate, label) => {
  const record = clone();
  mutate(record);
  assert.equal(reviewLock.effectiveEditorialStatus(record), 'review-out-of-date', label);
};

expectStale((record) => { record.articleSections[0].paragraphs[0].text += ' Material prose change.'; }, 'prose mutation invalidates review');
expectStale((record) => { record.editorial.structuredClaims.classification.value += ' changed'; }, 'structured-fact mutation invalidates review');
expectStale((record) => { record.articleSections[0].paragraphs[0].citations[0].sourceId = 'changed-source'; }, 'source-ID mutation invalidates review');
expectStale((record) => { record.articleSections[0].paragraphs[0].citations[0].locator.value += ' changed'; }, 'locator mutation invalidates review');
expectStale((record) => { record.editorial.sources[0].title += ' changed'; }, 'cited-source metadata mutation invalidates review');
expectStale((record) => {
  record.articleSections[0].paragraphs[0].text += ' Changed after review.';
  record.editorial.review.lock = original.editorial.review.lock;
}, 'stored lock alone cannot validate changed content');

const stale = clone();
stale.articleSections[0].paragraphs[0].text += ' Runtime/audit parity mutation.';
const staleCoverage = await buildEditorialCoverageFromData({
  repoRoot,
  canonicalArticles: [{...socratesArticle, editorialRecord: stale}],
  routeManifest: {philosophers: [{id: 'socrates'}], branches: []},
  reviewLock,
});
assert.equal(staleCoverage.entries[0].effectiveStatus, reviewLock.effectiveEditorialStatus(stale), 'runtime and audit status must agree');
assert.equal(reviewLock.editorialStatusLabel[staleCoverage.entries[0].effectiveStatus], 'Claim review needs renewal', 'stale content cannot present as current');

const presentationOnly = clone();
presentationOnly.color = '#123456';
assert.equal(reviewLock.computeEditorialReviewLock(presentationOnly), original.editorial.review.lock, 'presentation-only mutation must not invalidate review');

const reverseKeys = (value) => {
  if (Array.isArray(value)) return value.map(reverseKeys);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.keys(value).reverse().map((key) => [key, reverseKeys(value[key])]));
};
assert.equal(reviewLock.computeEditorialReviewLock(reverseKeys(original)), original.editorial.review.lock, 'object key order must be stable');

const statusRecord = (status, withSource = false) => ({
  id: `status-${status}`,
  articleSections: [],
  sourceLinks: withSource ? [{label: 'Reference', url: 'https://example.org', type: 'other'}] : [],
  ...(status ? {editorial: {sources: [], structuredClaims: {}, review: {status}}} : {}),
});
assert.equal(reviewLock.authoredEditorialStatus(statusRecord(undefined)), 'unreviewed');
assert.equal(reviewLock.authoredEditorialStatus(statusRecord(undefined, true)), 'bibliography-only');
assert.equal(reviewLock.effectiveEditorialStatus(statusRecord('source-mapped')), 'source-mapped');
assert.equal(reviewLock.effectiveEditorialStatus(original), 'claim-reviewed');
assert.equal(reviewLock.effectiveEditorialStatus(stale), 'review-out-of-date');

const standaloneCoverage = await buildEditorialCoverageFromData({
  repoRoot,
  canonicalArticles: [{
    canonicalId: 'socrates',
    title: 'Synthetic standalone review',
    category: 'work',
    visitorEntryPoint: '#/works/socrates',
    articleSections: original.articleSections,
    editorialRecord: original,
  }],
  routeManifest: {philosophers: [], branches: []},
  reviewLock,
});
assert.equal(standaloneCoverage.entries[0].effectiveStatus, 'claim-reviewed');
assert.equal(standaloneCoverage.errors.length, 0, standaloneCoverage.errors.join('\n'));

const gallery24To26Ids = new Set([
  'political-authority-legitimacy',
  'public-action-civil-disobedience',
  'arendt-human-condition',
  'arendt-eichmann-judgment',
  'rawls-theory-of-justice',
  'rawls-original-position',
  'nozick-anarchy-state-utopia',
  'nozick-entitlement-rectification',
  'nussbaum-capabilities-approach',
  'nussbaum-frontiers-justice',
  'amartya-sen-capability-development',
  'habermas-public-sphere',
  'democratic-deliberation-assembly',
  'feminist-cooper-voice-education',
  'feminist-truth-abolition-rights',
  'feminist-crenshaw-intersectionality',
  'feminist-standpoint-situated-objectivity',
  'feminist-care-dependency-labor',
  'feminist-astell-reason-education',
  'feminist-wollstonecraft-manufactured-inequality',
  'feminist-de-gouges-citizenship',
  'feminist-bluestocking-intellectual-publics',
  'feminist-education-domesticity',
  'feminist-abolition-convention-exclusion',
  'beauvoir-labor-and-immanence',
  'beauvoir-situation-and-place',
  'beauvoir-second-sex-movement',
  'beauvoir-aging-and-otherness',
  'beauvoir-boupacha-colonial-violence',
  'butler-performativity-and-action',
  'butler-trans-livability',
  'butler-disability-dependency',
  'butler-coalition-and-contestation',
  'butler-assembly-precarity',
  'fanon-racializing-gaze',
  'fanon-colonial-psychiatry',
  'fanon-algerian-revolution',
  'fanon-violence-decolonization',
  'fanon-national-consciousness',
  'davis-prison-abolition',
  'davis-race-gender-class',
  'hooks-margin-center',
  'hooks-engaged-pedagogy-love',
  'cesaire-colonialism-thingification',
  'dubois-color-line-colonial-world',
  'said-orientalism-representation',
  'spivak-subaltern-representation',
  'ngugi-language-decolonization',
  'wynter-humanism-coloniality',
]);

const scopedSupplementals = museumSupplementalExhibits
  .map(({exhibit}) => exhibit)
  .filter(({id}) => gallery24To26Ids.has(id));
assert.equal(scopedSupplementals.length, 49, 'Gallery 24–26 closeout regression scope must contain its exact 49 exhibits.');
assert.deepEqual(new Set(scopedSupplementals.map(({id}) => id)), gallery24To26Ids, 'Gallery 24–26 closeout regression IDs must remain complete.');

const prohibitedCloseoutBoilerplate = /The installed object is therefore|linked primary text or academic reference bears the interpretive claim|later applications, institutions, or criticism remain separate reception evidence|The exhibit’s evidentiary discipline follows from those limits/iu;
const secondParagraphs = new Set();
for (const exhibit of scopedSupplementals) {
  assert.equal(exhibit.sections.length, 3, `${exhibit.id} must retain exactly three sections.`);
  assert(exhibit.sections.every(({heading, paragraphs}) => heading === '' && paragraphs.length === 1), `${exhibit.id} must retain three untitled substantive paragraphs.`);
  const paragraphMappings = exhibit.sections.map(({sourceIds}) => [...sourceIds].sort().join('|'));
  assert(new Set(paragraphMappings).size > 1, `${exhibit.id} cannot map every paragraph to one blanket source set.`);
  const sourceKinds = new Map(exhibit.sources.map(({id, kind}) => [id, kind]));
  assert(exhibit.sections[0].sourceIds.every((id) => sourceKinds.get(id) === 'collection-record'), `${exhibit.id} opening paragraph must remain mapped to object, reproduction, or repository evidence.`);
  assert(exhibit.sections[1].sourceIds.some((id) => sourceKinds.get(id) !== 'collection-record'), `${exhibit.id} claim paragraph must cite direct philosophical evidence.`);
  assert(exhibit.sections[2].sourceIds.some((id) => sourceKinds.get(id) !== 'collection-record'), `${exhibit.id} boundary paragraph must cite direct philosophical evidence.`);
  const prose = exhibit.sections.flatMap(({paragraphs}) => paragraphs).join(' ');
  assert(!prohibitedCloseoutBoilerplate.test(prose), `${exhibit.id} cannot restore the Gallery 24–26 audit boilerplate.`);
  secondParagraphs.add(exhibit.sections[1].paragraphs[0]);
}
assert.equal(secondParagraphs.size, 49, 'Every Gallery 24–26 second paragraph must remain exhibit-specific.');

const asset = (id) => {
  const matched = museumAssets.find((item) => item.id === id);
  assert(matched, `Museum asset ${id} must exist.`);
  return matched;
};
const ngugiAsset = asset('colonial-ngugi-language');
assert.equal(ngugiAsset.creator, 'Unknown photographer');
assert.equal(ngugiAsset.objectPageUrl, 'https://archives.collections.ed.ac.uk/repositories/2/resources/87170');
assert.equal(ngugiAsset.licenseUrl, 'https://library.ed.ac.uk/digitisation-services/cultural-heritage-digitisation-service/image-licensing');
assert.match(ngugiAsset.license, /require contact.*pre-1931 U\.S\. rationale is unverified/iu);
const ngugiExhibit = scopedSupplementals.find(({id}) => id === 'ngugi-language-decolonization');
assert.equal(ngugiExhibit.sources.find(({url}) => url === 'https://www.humanities.uci.edu/news/power-language')?.kind, 'collection-record');

const fanonViolenceAsset = asset('colonial-fanon-war-displacement');
assert.match(fanonViolenceAsset.objectDate, /1958.*before 1984/iu);
assert.match(fanonViolenceAsset.institution, /no archive identifier or original publication record/iu);
assert.match(fanonViolenceAsset.license, /before July 1984.*original publication and archive record remain unverified/iu);

assert.equal(asset('feminist-act-up-assembly').objectPageUrl, 'https://www.nlm.nih.gov/exhibition/surviving-and-thriving/index.html');
assert.match(asset('feminist-trans-visibility-march').objectDate, /^28 September 2019/u);

const generatedAssetIds = [
  'political-authority-interpretive',
  'arendt-human-condition-interpretive',
  'rawls-original-position-interpretive',
  'nozick-entitlement-interpretive',
  'nussbaum-capabilities-interpretive',
];
const immutableAssetCommit = 'd51e4a00acd0f2848614b9c4917b502f37602bc5';
for (const id of generatedAssetIds) {
  assert.match(asset(id).sourcePageUrl, new RegExp(`/blob/${immutableAssetCommit}/`, 'u'), `${id} provenance must use an immutable commit.`);
  assert(!asset(id).sourcePageUrl.includes('/blob/main/'), `${id} provenance cannot use mutable main.`);
}
const modernAssetManifest = JSON.parse(await readFile(resolve(repoRoot, 'scripts/museumModernAssetManifest.json'), 'utf8'));
for (const id of generatedAssetIds) {
  for (const field of ['sourcePageUrl', 'sourceImageUrl', 'selectedThumbnailUrl']) {
    assert(modernAssetManifest.assets[id][field].includes(`/${immutableAssetCommit}/`), `${id} ${field} must use an immutable commit.`);
  }
}

console.log('Editorial review regression tests: lock/status invariants plus 49 Gallery 24–26 evidence, prose, rights, and provenance regressions passed.');
