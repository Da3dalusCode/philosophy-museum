import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const buildingManifest = JSON.parse(readFileSync(resolve(repoRoot, 'src/data/museum/museumBuildingManifest.json'), 'utf8'));
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
          export * from '/src/routing/hashHistory.ts';
          export * from '/src/routing/routes.ts';
          export * from '/src/routing/routeMetadata.ts';
          export * from '/src/routing/routeLoadErrors.ts';
          export * from '/src/data/museumCatalog.ts';
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
  HASH_ROUTE_CHANGE_EVENT,
  DEFAULT_ROUTES,
  applyHashCanonicalization,
  branches,
  enableManualScrollRestoration,
  philosophers,
  learningPaths,
  MUSEUM_HALLS,
  getArticleRouteEntries,
  getArticleSectionTarget,
  getRouteTitle,
  isRouteLoadError,
  parseHashRoute,
  serializeHashRoute,
  subscribeToHashRoute,
  writeHashRoute,
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

const createHistoryHarness = (initialHash = '') => {
  const calls = [];
  const listeners = new Map();
  const location = {hash: initialHash};
  const state = {audit: 'routing'};
  const target = {
    location,
    history: {
      state,
      scrollRestoration: 'auto',
      pushState(nextState, _title, url) {
        calls.push({method: 'pushState', state: nextState, url});
        location.hash = url;
      },
      replaceState(nextState, _title, url) {
        calls.push({method: 'replaceState', state: nextState, url});
        location.hash = url;
      },
    },
    addEventListener(type, listener) {
      const handlers = listeners.get(type) ?? new Set();
      handlers.add(listener);
      listeners.set(type, handlers);
    },
    removeEventListener(type, listener) {
      listeners.get(type)?.delete(listener);
    },
    dispatchEvent(event) {
      calls.push({method: 'dispatchEvent', type: event.type});
      for (const listener of listeners.get(event.type) ?? []) listener(event);
      return true;
    },
  };
  const emit = (type) => {
    for (const listener of listeners.get(type) ?? []) listener(new Event(type));
  };
  return {calls, emit, listeners, state, target};
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

check('Museum convenience, hall, and exhibit routes parse and serialize', () => {
  const convenience = expectKind('#/museum', 'museum');
  assert.deepEqual(convenience.route, {kind: 'museum', hallId: 'ancient-greek'});
  assert.equal(convenience.canonicalHash, '#/museum/ancient-greek');
  assert.equal(convenience.shouldReplace, true);
  for (const hall of MUSEUM_HALLS) {
    expectRoundTrip({kind: 'museum', hallId: hall.id});
    for (const exhibit of hall.exhibits) {
      expectRoundTrip({kind: 'museum', hallId: hall.id, exhibitId: exhibit.id});
    }
  }
});

check('serializers emit the required literal route families', () => {
  assert.equal(serializeHashRoute({kind: 'history'}), '#/history');
  assert.equal(serializeHashRoute({kind: 'map'}), '#/map');
  assert.equal(
    serializeHashRoute({kind: 'museum', hallId: 'ancient-greek'}),
    '#/museum/ancient-greek',
  );
  assert.equal(
    serializeHashRoute({kind: 'museum', hallId: 'ancient-greek', exhibitId: 'plato'}),
    '#/museum/ancient-greek/exhibits/plato',
  );
  assert.equal(serializeHashRoute({kind: 'museum', hallId: 'logic-language-science'}), '#/museum/logic-language-science');
  assert.equal(serializeHashRoute({kind: 'museum', hallId: 'logic-language-science', exhibitId: 'peirce'}), '#/museum/logic-language-science/exhibits/peirce');
  assert.equal(serializeHashRoute({kind: 'museum', hallId: 'ethics-justice-political-life'}), '#/museum/ethics-justice-political-life');
  assert.equal(serializeHashRoute({kind: 'museum', hallId: 'ethics-justice-political-life', exhibitId: 'rawls'}), '#/museum/ethics-justice-political-life/exhibits/rawls');
  assert.equal(serializeHashRoute({kind: 'museum', hallId: 'mind-consciousness-self'}), '#/museum/mind-consciousness-self');
  assert.equal(serializeHashRoute({kind: 'museum', hallId: 'mind-consciousness-self', exhibitId: 'thomas-nagel'}), '#/museum/mind-consciousness-self/exhibits/thomas-nagel');
  assert.equal(
    serializeHashRoute({kind: 'branch', branchId: 'stoicism'}),
    '#/branches/stoicism',
  );
  assert.equal(
    serializeHashRoute({kind: 'philosopher', philosopherId: 'plato'}),
    '#/philosophers/plato',
  );
  assert.equal(
    serializeHashRoute({kind: 'compare-branches', leftId: 'stoicism', rightId: 'epicureanism'}),
    '#/compare/branches/stoicism/epicureanism',
  );
  assert.equal(
    serializeHashRoute({kind: 'compare-philosophers', leftId: 'plato', rightId: 'aristotle'}),
    '#/compare/philosophers/plato/aristotle',
  );
  assert.equal(
    serializeHashRoute({kind: 'learning-path', pathId: 'stoic', step: 2}),
    '#/paths/stoic/2',
  );
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

check('unknown and malformed Museum routes remain visible as not-found', () => {
  expectNotFound('#/museum/unknown-hall', /No museum hall exists/);
  expectNotFound('#/museum/ancient-greek/exhibits/unknown-exhibit', /No exhibit exists/);
  expectNotFound('#/museum/medieval-worlds', /No museum hall exists/);
  expectNotFound('#/museum/medieval-worlds/exhibits/plato', /No museum hall exists/);
  expectNotFound('#/museum/ancient-greek/exhibits/aquinas', /No exhibit exists/);
  expectNotFound('#/museum/renaissance-reason-revolution/exhibits/foucault', /No exhibit exists/);
  expectNotFound('#/museum/modernity-freedom-critique/exhibits/kant', /No exhibit exists/);
  expectNotFound('#/museum/logic-language-science/exhibits/rawls', /No exhibit exists/);
  expectNotFound('#/museum/ethics-justice-political-life/exhibits/quine', /No exhibit exists/);
  expectNotFound('#/museum/mind-consciousness-self/exhibits/habermas', /No exhibit exists/);
  expectNotFound('#/museum/ancient-greek/plato', /unexpected shape/);
  expectNotFound('#/museum/ancient-greek/exhibits/plato/extra', /unexpected shape/);
  expectNotFound('#/museum/%', /malformed percent encoding/);
  expectNotFound('#/museum/ancient-greek/exhibits/%E0%A4%A', /malformed percent encoding/);
});

check('physical building and reserved expansion IDs are never accepted as public Museum routes', () => {
  const publicHallIds = buildingManifest.nodes.filter(({kind, implementationStatus}) => kind === 'hall' && implementationStatus === 'live').map(({publicHallId}) => publicHallId);
  assert.equal(publicHallIds.length, 6);
  assert.deepEqual(publicHallIds.sort(), MUSEUM_HALLS.map(({id}) => id).sort());
  for (const node of buildingManifest.nodes) {
    expectNotFound(`#/museum/${encodeURIComponent(node.id)}`, /No museum hall exists/);
  }
  for (const reservation of buildingManifest.reservations) {
    expectNotFound(`#/museum/${encodeURIComponent(reservation.id)}`, /No museum hall exists/);
    if (reservation.expansionPortalId) expectNotFound(`#/museum/${encodeURIComponent(reservation.expansionPortalId)}`, /No museum hall exists/);
    if (reservation.targetProgramHallId) expectNotFound(`#/museum/${encodeURIComponent(reservation.targetProgramHallId)}`, /No museum hall exists/);
  }
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
    DEFAULT_ROUTES.museum,
    {kind: 'museum', hallId: 'ancient-greek', exhibitId: 'plato'},
    {kind: 'not-found', requestedHash: '#/missing', reason: 'Missing'},
  ];
  for (const route of routes) assert.match(getRouteTitle(route), / \| Philosophy Atlas$/);
  assert.equal(getRouteTitle({kind: 'history'}), 'Big History | Philosophy Atlas');
  assert.equal(
    getRouteTitle({kind: 'museum', hallId: 'ancient-greek'}),
    'Ancient Greek & Hellenistic Gallery | Philosophy Atlas',
  );
  assert.equal(
    getRouteTitle({kind: 'museum', hallId: 'ancient-greek', exhibitId: 'plato'}),
    'Plato — Ancient Greek & Hellenistic Gallery | Philosophy Atlas',
  );
  assert.equal(
    getRouteTitle({kind: 'museum', hallId: 'ancient-greek', exhibitId: 'stoicism'}),
    'Stoicism — Ancient Greek & Hellenistic Gallery | Philosophy Atlas',
  );
  assert.equal(
    getRouteTitle({kind: 'museum', hallId: 'renaissance-reason-revolution'}),
    'Renaissance, Reason, and Revolution | Philosophy Atlas',
  );
  assert.equal(
    getRouteTitle({kind: 'museum', hallId: 'renaissance-reason-revolution', exhibitId: 'kant'}),
    'Immanuel Kant — Renaissance, Reason, and Revolution | Philosophy Atlas',
  );
  assert.equal(
    getRouteTitle({kind: 'museum', hallId: 'modernity-freedom-critique'}),
    'Modernity, Freedom, and Critique | Philosophy Atlas',
  );
  assert.equal(
    getRouteTitle({kind: 'museum', hallId: 'modernity-freedom-critique', exhibitId: 'beauvoir'}),
    'Simone de Beauvoir — Modernity, Freedom, and Critique | Philosophy Atlas',
  );
  assert.equal(getRouteTitle({kind: 'museum', hallId: 'logic-language-science'}), 'Logic, Language, and Science | Philosophy Atlas');
  assert.equal(getRouteTitle({kind: 'museum', hallId: 'logic-language-science', exhibitId: 'kuhn'}), 'Thomas Kuhn — Logic, Language, and Science | Philosophy Atlas');
  assert.equal(getRouteTitle({kind: 'museum', hallId: 'ethics-justice-political-life'}), 'Ethics, Justice, and Political Life | Philosophy Atlas');
  assert.equal(getRouteTitle({kind: 'museum', hallId: 'ethics-justice-political-life', exhibitId: 'wollstonecraft'}), 'Mary Wollstonecraft — Ethics, Justice, and Political Life | Philosophy Atlas');
  assert.equal(getRouteTitle({kind: 'museum', hallId: 'mind-consciousness-self'}), 'Mind, Consciousness, and the Self | Philosophy Atlas');
  assert.equal(getRouteTitle({kind: 'museum', hallId: 'mind-consciousness-self', exhibitId: 'derek-parfit'}), 'Derek Parfit — Mind, Consciousness, and the Self | Philosophy Atlas');
  assert.equal(
    getRouteTitle({kind: 'branch', branchId: 'stoicism', section: 'overview'}),
    'Stoicism — A system for living as a rational and social being | Philosophy Atlas',
  );
  assert.equal(getRouteTitle({kind: 'not-found', requestedHash: '#/missing', reason: 'Missing'}), 'Route Not Found | Philosophy Atlas');
});

check('invalid or irrelevant section queries are safely removed during canonicalization', () => {
  for (const hash of [
    '#/branches/stoicism?section=not%20valid',
    '#/branches/stoicism?section=not-a-real-section',
    '#/philosophers/plato?section=not-a-real-section',
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
    '#/museum',
    '#/museum/ancient-greek',
    '#/museum/ancient-greek/exhibits/plato',
    '#/museum/renaissance-reason-revolution',
    '#/museum/renaissance-reason-revolution/exhibits/kant',
    '#/museum/modernity-freedom-critique',
    '#/museum/modernity-freedom-critique/exhibits/beauvoir',
    '#/museum/logic-language-science',
    '#/museum/logic-language-science/exhibits/peirce',
    '#/museum/ethics-justice-political-life',
    '#/museum/ethics-justice-political-life/exhibits/rawls',
    '#/museum/mind-consciousness-self',
    '#/museum/mind-consciousness-self/exhibits/thomas-nagel',
    '#/branches/stoicism?section=overview',
    '#/philosophers/plato?section=major-works',
    serializeHashRoute(DEFAULT_ROUTES.compare),
    serializeHashRoute(DEFAULT_ROUTES.comparePhilosophers),
    serializeHashRoute(DEFAULT_ROUTES.learningPath),
  ];
  for (const hash of hashes) expectCanonicalStability(hash);
});

check('browser history writes preserve push, replace, and same-hash semantics', () => {
  const pushHarness = createHistoryHarness('#/history');
  assert.equal(writeHashRoute('#/map', false, pushHarness.target), true);
  assert.deepEqual(pushHarness.calls[0], {
    method: 'pushState',
    state: pushHarness.state,
    url: '#/map',
  });
  assert.deepEqual(pushHarness.calls[1], {
    method: 'dispatchEvent',
    type: HASH_ROUTE_CHANGE_EVENT,
  });
  assert.equal(writeHashRoute('#/map', false, pushHarness.target), false);
  assert.equal(pushHarness.calls.length, 2, 'Writing the current hash must be idempotent.');

  const replaceHarness = createHistoryHarness('#/history');
  assert.equal(writeHashRoute('#/branches/stoicism', true, replaceHarness.target), true);
  assert.deepEqual(replaceHarness.calls[0], {
    method: 'replaceState',
    state: replaceHarness.state,
    url: '#/branches/stoicism',
  });

  const stateHarness = createHistoryHarness('#/history');
  const museumState = {museum: {hallId: 'ancient-greek', openedFromHall: true}};
  assert.equal(
    writeHashRoute('#/museum/ancient-greek/exhibits/plato', false, stateHarness.target, museumState),
    true,
  );
  assert.deepEqual(stateHarness.calls[0], {
    method: 'pushState',
    state: museumState,
    url: '#/museum/ancient-greek/exhibits/plato',
  });
});

check('deferred route asset failures include Vite CSS preload errors', () => {
  for (const error of [
    new Error('Failed to fetch dynamically imported module: /assets/MuseumPage.js'),
    new Error('Unable to preload CSS for /assets/MuseumPage.css'),
    Object.assign(new Error('Loading CSS chunk 4 failed.'), {name: 'ChunkLoadError'}),
  ]) assert.equal(isRouteLoadError(error), true);
  assert.equal(isRouteLoadError(new Error('Museum content validation failed.')), false);
});

check('canonicalization replaces once and remains Strict Mode idempotent', () => {
  const harness = createHistoryHarness('');
  assert.equal(
    applyHashCanonicalization({canonicalHash: '#/history', shouldReplace: false}, harness.target),
    false,
  );
  assert.equal(harness.calls.length, 0);
  assert.equal(
    applyHashCanonicalization({canonicalHash: '#/history', shouldReplace: true}, harness.target),
    true,
  );
  assert.equal(
    applyHashCanonicalization({canonicalHash: '#/history', shouldReplace: true}, harness.target),
    false,
  );
  assert.equal(harness.calls.filter(({method}) => method === 'replaceState').length, 1);
  assert.equal(harness.calls.filter(({method}) => method === 'pushState').length, 0);
});

check('history subscriptions notify for native and programmatic changes, then clean up', () => {
  const harness = createHistoryHarness('#/history');
  let notifications = 0;
  const cleanup = subscribeToHashRoute(() => {
    notifications += 1;
  }, harness.target);
  assert.deepEqual(
    [...harness.listeners.keys()].sort(),
    [HASH_ROUTE_CHANGE_EVENT, 'hashchange', 'popstate'].sort(),
  );

  writeHashRoute('#/map', false, harness.target);
  assert.equal(notifications, 1, 'Programmatic navigation must notify the external store.');
  harness.emit('hashchange');
  harness.emit('popstate');
  assert.equal(notifications, 3, 'Native hash and history traversal events must notify.');

  cleanup();
  for (const handlers of harness.listeners.values()) assert.equal(handlers.size, 0);
  harness.emit(HASH_ROUTE_CHANGE_EVENT);
  harness.emit('hashchange');
  harness.emit('popstate');
  assert.equal(notifications, 3, 'Cleanup must remove every browser listener.');
});

check('manual scroll restoration delegates route scrolling to the application', () => {
  const harness = createHistoryHarness('#/history');
  const cleanup = enableManualScrollRestoration(harness.target);
  assert.equal(harness.target.history.scrollRestoration, 'manual');
  cleanup();
  assert.equal(harness.target.history.scrollRestoration, 'auto');
});

console.log(`\nRouting audit passed: ${checks} groups covering ${branches.length} branches, ${philosophers.length} philosophers, and ${learningPaths.length} learning paths.`);
