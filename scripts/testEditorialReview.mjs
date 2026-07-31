import assert from 'node:assert/strict';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildEditorialCoverageFromData} from './buildEditorialCoverage.mjs';
import {loadAppData} from './loadAppData.mjs';

const repoRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const {canonicalArticles, reviewLock} = await loadAppData();
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

console.log('Editorial review regression tests: 10 lock mutations/invariants, 5 status semantics, and standalone category integration passed.');
