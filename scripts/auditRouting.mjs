import assert from 'node:assert/strict';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const virtualEntry = 'virtual:philosophy-atlas-routing-audit';
const resolvedVirtualEntry = `\0${virtualEntry}`;

const buildResult = await build({
  root: repoRoot,
  configFile: false,
  logLevel: 'silent',
  plugins: [
    {
      name: 'routing-audit-entry',
      resolveId(id) {
        return id === virtualEntry ? resolvedVirtualEntry : undefined;
      },
      load(id) {
        if (id !== resolvedVirtualEntry) return undefined;
        return `
          export * from '/src/routing/hashRouter.ts';
          export * from '/src/routing/routes.ts';
          export * from '/src/routing/routeMetadata.ts';
          export {branches} from '/src/data/branches.ts';
          export {philosophers} from '/src/data/philosophers.ts';
          export {learningPaths} from '/src/data/learningPaths.ts';
        `;
      },
    },
  ],
  build: {
    ssr: true,
    write: false,
    minify: false,
    target: 'node18',
    rollupOptions: {
      input: virtualEntry,
      output: {
        format: 'es',
        codeSplitting: false,
      },
    },
  },
});

const buildOutputs = Array.isArray(buildResult) ? buildResult : [buildResult];
const entryChunk = buildOutputs
  .flatMap(({output}) => output)
  .find((item) => item.type === 'chunk' && item.isEntry);

assert(entryChunk, 'Vite did not produce an executable routing-audit entry chunk.');

const moduleUrl = `data:text/javascript;base64,${Buffer.from(entryChunk.code).toString('base64')}`;
const routing = await import(moduleUrl);

const {
  DEFAULT_ROUTES,
  branches,
  philosophers,
  learningPaths,
  getArticleRouteEntries,
  getArticleSectionTarget,
  getRouteTitle,
  parseHashRoute,
  serializeHashRoute,
} = routing;

let checks = 0;
const check = (name, assertion) => {
  assertion();
  checks += 1;
  console.log(`✓ ${name}`);
};

const expectKind = (hash, kind) => {
  const parsed = parseHashRoute(hash);
  assert.equal(parsed.route.kind, kind, `${hash || '(empty hash)'} should parse as ${kind}`);
  return parsed;
};

const expectNotFound = (hash, reasonPattern) => {
  const parsed = expectKind(hash, 'not-found');
  assert.equal(parsed.shouldReplace, false, 'Invalid routes must remain visible to the not-found view.');
  assert.equal(parsed.canonicalHash, hash.startsWith('#') ? hash : `#${hash}`);
  assert.match(parsed.route.reason, reasonPattern);
  return parsed;
};

const expectRoundTrip = (route) => {
  const hash = serializeHashRoute(route);
  const parsed = parseHashRoute(hash);
  assert.notEqual(parsed.route.kind, 'not-found', `${hash} should be a valid route`);
  assert.equal(parsed.canonicalHash, hash);
  assert.equal(parsed.shouldReplace, false);
  assert.deepEqual(parsed.route, route);
};

const expectCanonicalStability = (inputHash) => {
  const first = parseHashRoute(inputHash);
  assert.notEqual(first.route.kind, 'not-found', `${inputHash || '(empty hash)'} must be recoverable`);
  const serialized = serializeHashRoute(first.route);
  assert.equal(serialized, first.canonicalHash);
  const second = parseHashRoute(serialized);
  assert.deepEqual(second.route, first.route);
  assert.equal(second.canonicalHash, serialized);
  assert.equal(second.shouldReplace, false);
};

check('empty and root hashes canonicalize to Big History', () => {
  for (const hash of ['', '#', '#/']) {
    const parsed = expectKind(hash, 'history');
    assert.equal(parsed.canonicalHash, '#/history');
    assert.equal(parsed.shouldReplace, true);
  }
});

check('top-level history and map routes parse and serialize', () => {
  expectRoundTrip({kind: 'history'});
  expectRoundTrip({kind: 'map'});
});

check('top-level convenience routes resolve to their canonical defaults', () => {
  for (const [hash, expectedRoute] of [
    ['#/branches', DEFAULT_ROUTES.branch],
    ['#/philosophers', DEFAULT_ROUTES.philosopher],
    ['#/compare', DEFAULT_ROUTES.compare],
    ['#/paths', DEFAULT_ROUTES.learningPath],
  ]) {
    const parsed = parseHashRoute(hash);
    assert.deepEqual(parsed.route, expectedRoute);
    assert.equal(parsed.canonicalHash, serializeHashRoute(expectedRoute));
    assert.equal(parsed.shouldReplace, true);
  }
});

check(`all ${branches.length} branch IDs round-trip`, () => {
  for (const {id} of branches) {
    expectRoundTrip({kind: 'branch', branchId: id, section: undefined});
  }
});

check(`all ${philosophers.length} philosopher IDs round-trip`, () => {
  for (const {id} of philosophers) {
    expectRoundTrip({kind: 'philosopher', philosopherId: id, section: undefined});
  }
});

check(`all ${learningPaths.length} learning paths accept their first and final steps`, () => {
  for (const path of learningPaths) {
    expectRoundTrip({kind: 'learning-path', pathId: path.id, step: 1});
    expectRoundTrip({kind: 'learning-path', pathId: path.id, step: path.steps.length});
  }
});

check('invalid learning-path steps and route shapes are rejected', () => {
  const path = learningPaths[0];
  for (const hash of [
    `#/paths/${path.id}/0`,
    `#/paths/${path.id}/${path.steps.length + 1}`,
    `#/paths/${path.id}/-1`,
    `#/paths/${path.id}/1.5`,
    `#/paths/${path.id}/not-a-number`,
    `#/paths/${path.id}`,
  ]) {
    expectNotFound(hash, /step|requires/i);
  }
});

check('branch and philosopher comparisons round-trip', () => {
  expectRoundTrip({
    kind: 'compare-branches',
    leftId: DEFAULT_ROUTES.compare.leftId,
    rightId: DEFAULT_ROUTES.compare.rightId,
  });
  expectRoundTrip({
    kind: 'compare-philosophers',
    leftId: DEFAULT_ROUTES.comparePhilosophers.leftId,
    rightId: DEFAULT_ROUTES.comparePhilosophers.rightId,
  });
});

check('unknown branch, philosopher, and learning-path IDs are rejected', () => {
  expectNotFound('#/branches/__missing_branch__', /No branch exists/);
  expectNotFound('#/philosophers/__missing_philosopher__', /No philosopher exists/);
  expectNotFound('#/paths/__missing_path__/1', /No learning path exists/);
});

check('mixed-kind and duplicate comparisons are rejected', () => {
  const branchIds = new Set(branches.map(({id}) => id));
  const philosopherIds = new Set(philosophers.map(({id}) => id));
  const branchOnlyId = branches.find(({id}) => !philosopherIds.has(id))?.id;
  const philosopherOnlyId = philosophers.find(({id}) => !branchIds.has(id))?.id;
  assert(branchOnlyId, 'The dataset needs a branch-only ID for the mixed-kind audit.');
  assert(philosopherOnlyId, 'The dataset needs a philosopher-only ID for the mixed-kind audit.');

  expectNotFound(`#/compare/branches/${branchOnlyId}/${philosopherOnlyId}`, /two different, existing branch ids/);
  expectNotFound(`#/compare/philosophers/${philosopherOnlyId}/${branchOnlyId}`, /two different, existing philosopher ids/);
  expectNotFound(`#/compare/branches/${branchOnlyId}/${branchOnlyId}`, /two different, existing branch ids/);
  expectNotFound(`#/compare/philosophers/${philosopherOnlyId}/${philosopherOnlyId}`, /two different, existing philosopher ids/);
});

check('malformed percent encoding is rejected without throwing', () => {
  for (const hash of [
    '#/branches/%',
    '#/philosophers/%E0%A4%A',
    '#/branches/stoicism?section=%ZZ',
    '#/philosophers/plato?section=%E0%A4',
  ]) {
    expectNotFound(hash, /malformed percent encoding/);
  }
});

check('unknown routes and unexpected known-route shapes are rejected', () => {
  expectNotFound('#/totally-unknown', /not recognized/);
  expectNotFound('#/history/extra', /not recognized/);
  expectNotFound('#/compare/schools/a/b', /branches or philosophers/);
  expectNotFound('#branches/stoicism', /must begin/);
});

check('branch and philosopher sections parse and serialize canonically', () => {
  const branch = parseHashRoute('#/branches/stoicism?section=overview');
  assert.deepEqual(branch.route, {kind: 'branch', branchId: 'stoicism', section: 'overview'});
  assert.equal(serializeHashRoute(branch.route), '#/branches/stoicism?section=overview');

  const philosopher = parseHashRoute('#/philosophers/plato?section=major-works');
  assert.deepEqual(philosopher.route, {
    kind: 'philosopher',
    philosopherId: 'plato',
    section: 'major-works-early-middle',
  });
  assert.equal(philosopher.canonicalHash, '#/philosophers/plato?section=major-works-early-middle');
  assert.equal(philosopher.shouldReplace, true);
  assert.equal(
    serializeHashRoute({kind: 'philosopher', philosopherId: 'heidegger', section: 'reading-path'}),
    '#/philosophers/heidegger?section=reading-path',
  );
});

check('article route metadata uses real targets and conditional extras', () => {
  const stoicismEntries = getArticleRouteEntries({kind: 'branch', branchId: 'stoicism'});
  assert(stoicismEntries.some(({id, targetId}) => id === 'overview' && targetId === 'article-overview'));
  assert(stoicismEntries.some(({id, targetId}) => id === 'branch-reading' && targetId === 'branch-reading'));
  assert.equal(getArticleSectionTarget({kind: 'branch', branchId: 'stoicism', section: 'not-a-real-section'}), undefined);

  const platoEntries = getArticleRouteEntries({kind: 'philosopher', philosopherId: 'plato'});
  assert(platoEntries.some(({id, targetId}) => id === 'major-works-early-middle' && targetId === 'article-major-works-early-middle'));
  assert(!platoEntries.some(({id}) => id === 'major-works'));

  const philosopherWithoutSources = philosophers.find(({sourceLinks}) => !sourceLinks?.length);
  assert(philosopherWithoutSources);
  assert(!getArticleRouteEntries({kind: 'philosopher', philosopherId: philosopherWithoutSources.id}).some(({id}) => id === 'profile-sources'));
});

check('document titles are exhaustive and section-aware', () => {
  const routes = [
    DEFAULT_ROUTES.history,
    DEFAULT_ROUTES.map,
    DEFAULT_ROUTES.branch,
    DEFAULT_ROUTES.philosopher,
    DEFAULT_ROUTES.compare,
    DEFAULT_ROUTES.comparePhilosophers,
    DEFAULT_ROUTES.learningPath,
    {kind: 'not-found', requestedHash: '#/missing', reason: 'Missing'},
  ];
  for (const route of routes) assert.match(getRouteTitle(route), / \| Philosophy Atlas$/);
  assert.equal(getRouteTitle({kind: 'history'}), 'Big History | Philosophy Atlas');
  assert.equal(
    getRouteTitle({kind: 'branch', branchId: 'stoicism', section: 'overview'}),
    'Stoicism — A system for living as a rational and social being | Philosophy Atlas',
  );
  assert.equal(getRouteTitle({kind: 'not-found', requestedHash: '#/missing', reason: 'Missing'}), 'Route Not Found | Philosophy Atlas');
});

check('invalid or irrelevant section queries are safely removed during canonicalization', () => {
  for (const hash of [
    '#/branches/stoicism?section=not%20valid',
    '#/philosophers/plato?section=',
    '#/branches/stoicism?unrelated=value',
    '#/history?section=overview',
  ]) {
    const parsed = parseHashRoute(hash);
    assert.notEqual(parsed.route.kind, 'not-found');
    assert.equal(parsed.shouldReplace, true);
    assert(!parsed.canonicalHash.includes('?'));
  }
});

check('canonical hashes remain stable under parse → serialize → parse', () => {
  const hashes = [
    '',
    '#/',
    '#/history',
    '#/map',
    '#/branches',
    '#/philosophers',
    '#/compare',
    '#/paths',
    '#/branches/stoicism?section=overview',
    '#/philosophers/plato?section=major-works',
    serializeHashRoute(DEFAULT_ROUTES.compare),
    serializeHashRoute(DEFAULT_ROUTES.comparePhilosophers),
    serializeHashRoute(DEFAULT_ROUTES.learningPath),
  ];
  for (const hash of hashes) expectCanonicalStability(hash);
});

console.log(`\nRouting audit passed: ${checks} groups covering ${branches.length} branches, ${philosophers.length} philosophers, and ${learningPaths.length} learning paths.`);
