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

const substantiveEvidenceKinds = new Set(['primary-text', 'primary-interview', 'academic-reference']);
for (const exhibit of scopedSupplementals) {
  assert.equal(exhibit.sections.length, 3, `${exhibit.id} must retain exactly three sections.`);
  assert(exhibit.sections.every(({heading, paragraphs}) => heading === '' && paragraphs.length === 1), `${exhibit.id} must retain three untitled substantive paragraphs.`);
  const paragraphMappings = exhibit.sections.map(({sourceIds}) => [...sourceIds].sort().join('|'));
  assert(new Set(paragraphMappings).size > 1, `${exhibit.id} cannot map every paragraph to one blanket source set.`);
  const sourceKinds = new Map(exhibit.sources.map(({id, kind}) => [id, kind]));
  assert(exhibit.sections[0].sourceIds.every((id) => sourceKinds.get(id) === 'collection-record'), `${exhibit.id} opening paragraph must remain mapped to object, reproduction, or repository evidence.`);
  assert(exhibit.sections[1].sourceIds.some((id) => substantiveEvidenceKinds.has(sourceKinds.get(id))), `${exhibit.id} claim paragraph must cite direct primary, interview, or scholarly evidence.`);
  assert(exhibit.sections[2].sourceIds.some((id) => substantiveEvidenceKinds.has(sourceKinds.get(id))), `${exhibit.id} boundary paragraph must cite direct primary, interview, or scholarly evidence.`);
  const claimsAndLimits = exhibit.visitorGuide?.find(({heading}) => heading.endsWith(': claims and limits'));
  assert(claimsAndLimits, `${exhibit.id} must retain its object-specific claims-and-limits guidance.`);
  for (const item of claimsAndLimits.items) {
    assert(item.sourceIds?.length, `${exhibit.id} guidance ${item.label} must map to evidence.`);
    assert(item.sourceIds.some((id) => substantiveEvidenceKinds.has(sourceKinds.get(id))), `${exhibit.id} guidance ${item.label} must cite direct primary, interview, or scholarly evidence.`);
  }
}

const coreSourceRoleRemediationIds = new Set([
  'arendt-eichmann-judgment',
  'rawls-theory-of-justice',
  'nozick-anarchy-state-utopia',
  'nozick-entitlement-rectification',
  'nussbaum-frontiers-justice',
  'amartya-sen-capability-development',
  'butler-trans-livability',
  'butler-disability-dependency',
  'butler-coalition-and-contestation',
  'fanon-racializing-gaze',
  'fanon-colonial-psychiatry',
  'fanon-violence-decolonization',
  'fanon-national-consciousness',
  'davis-race-gender-class',
  'hooks-margin-center',
  'hooks-engaged-pedagogy-love',
  'spivak-subaltern-representation',
]);
assert.equal(coreSourceRoleRemediationIds.size, 17, 'The demonstrated source-role scope must remain the exact seventeen audited records.');

const bibliographicRoleExpectations = {
  'arendt-human-condition': ['https://press.uchicago.edu/ucp/books/book/chicago/H/bo29137972.html'],
  'arendt-eichmann-judgment': ['https://www.penguinrandomhouse.com/books/320983/eichmann-in-jerusalem-by-hannah-arendt/'],
  'rawls-theory-of-justice': ['https://www.hup.harvard.edu/books/9780674000780'],
  'nozick-anarchy-state-utopia': ['https://www.basicbooks.com/titles/robert-nozick/anarchy-state-and-utopia/9780465097203/'],
  'nozick-entitlement-rectification': ['https://www.basicbooks.com/titles/robert-nozick/anarchy-state-and-utopia/9780465097203/'],
  'nussbaum-frontiers-justice': ['https://www.hup.harvard.edu/books/9780674019171'],
  'amartya-sen-capability-development': ['https://www.penguinrandomhouse.com/books/163962/development-as-freedom-by-amartya-sen/'],
  'feminist-standpoint-situated-objectivity': ['https://doi.org/10.2307/3178066'],
  'butler-performativity-and-action': ['https://www.routledge.com/Gender-Trouble/Butler/p/book/9780415389556'],
  'butler-trans-livability': ['https://www.routledge.com/Undoing-Gender/Butler/p/book/9780415969239'],
  'butler-disability-dependency': ['https://doi.org/10.4159/9780674495548'],
  'butler-coalition-and-contestation': ['https://doi.org/10.4159/9780674495548'],
  'butler-assembly-precarity': ['https://doi.org/10.4159/9780674495548'],
  'fanon-racializing-gaze': ['https://groveatlantic.com/book/black-skin-white-masks/'],
  'fanon-colonial-psychiatry': ['https://www.editionsladecouverte.fr/ecrits_sur_l_alienation_et_la_liberte-9782348037337'],
  'fanon-violence-decolonization': ['https://groveatlantic.com/book/the-wretched-of-the-earth/'],
  'fanon-national-consciousness': ['https://groveatlantic.com/book/the-wretched-of-the-earth/'],
  'davis-prison-abolition': ['https://www.penguinrandomhouse.com/books/213837/are-prisons-obsolete-by-angela-y-davis/'],
  'davis-race-gender-class': ['https://www.penguinrandomhouse.com/books/36909/women-race-and-class-by-angela-y-davis/'],
  'hooks-margin-center': ['https://www.routledge.com/Feminist-Theory/hooks/p/book/9781138821668'],
  'hooks-engaged-pedagogy-love': [
    'https://www.routledge.com/Teaching-to-Transgress/hooks/p/book/9780415908085',
    'https://www.harpercollins.com/products/all-about-love-bell-hooks',
  ],
  'cesaire-colonialism-thingification': ['https://nyupress.org/9781583670248/discourse-on-colonialism/'],
  'said-orientalism-representation': ['https://www.penguinrandomhouse.com/books/159783/orientalism-by-edward-w-said/'],
  'spivak-subaltern-representation': ['https://cup.columbia.edu/book/can-the-subaltern-speak/9780231512855/'],
  'ngugi-language-decolonization': ['https://boydellandbrewer.com/book/decolonising-the-mind-9780852555019/'],
  'wynter-humanism-coloniality': ['https://doi.org/10.1215/01642472-8750064'],
};
assert.equal(Object.keys(bibliographicRoleExpectations).length, 26, 'The exact audited bibliographic-role record set drifted.');
for (const [id, urls] of Object.entries(bibliographicRoleExpectations)) {
  const exhibit = scopedSupplementals.find((record) => record.id === id);
  assert(exhibit, `${id} is absent from the 49-record remediation scope.`);
  for (const url of urls) assert.equal(exhibit.sources.find((item) => item.url === url)?.kind, 'bibliographic-record', `${id} misclassifies ${url}.`);
}
for (const id of coreSourceRoleRemediationIds) {
  const exhibit = scopedSupplementals.find((record) => record.id === id);
  assert(exhibit.sources.some(({kind}) => kind === 'bibliographic-record'), `${id} must expose its corrected bibliographic role.`);
}

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
assert.equal(ngugiExhibit.sources.find(({url}) => url === 'https://www.humanities.uci.edu/news/power-language')?.kind, 'primary-interview');
assert.equal(scopedSupplementals.find(({id}) => id === 'wynter-humanism-coloniality')?.sources.find(({url}) => url === 'https://historicalsociety.stanford.edu/sylvia-wynter')?.kind, 'primary-interview');
assert.equal(scopedSupplementals.find(({id}) => id === 'butler-assembly-precarity')?.sources.find(({url}) => url === 'https://ndpr.nd.edu/reviews/notes-toward-a-performative-theory-of-assembly/')?.kind, 'academic-reference');
assert.equal(scopedSupplementals.find(({id}) => id === 'davis-prison-abolition')?.sources.find(({url}) => url === 'https://harvardlawreview.org/wp-content/uploads/2019/04/1568-1574_Online.pdf')?.kind, 'academic-reference');
assert.equal(scopedSupplementals.find(({id}) => id === 'spivak-subaltern-representation')?.sources.find(({url}) => url === 'https://press-files.anu.edu.au/downloads/press/p15131/html/ch01.xhtml?page=3')?.kind, 'academic-reference');
const spivakExhibit = scopedSupplementals.find(({id}) => id === 'spivak-subaltern-representation');
assert.match(spivakExhibit?.presentation?.articleActionLabel ?? '', /compare.+bell hooks/iu);
assert.equal(spivakExhibit?.visitorGuide?.[1]?.heading, 'Spivak and representation: claims and limits');

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
