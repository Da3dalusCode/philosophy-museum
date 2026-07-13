import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {dirname, extname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const galleryRoot = resolve(repoRoot, 'src/components/MuseumGallery');
const registrySource = readFileSync(resolve(galleryRoot, 'museumWorldRegistry.ts'), 'utf8');
const museumPageSource = readFileSync(resolve(galleryRoot, 'MuseumPage.tsx'), 'utf8');
const museumWorldSource = readFileSync(resolve(galleryRoot, 'MuseumWorldScene.tsx'), 'utf8');
const virtualEntry = 'virtual:philosophy-atlas-museum-audit';
const resolvedEntry = `\0${virtualEntry}`;

const result = await build({
  root: repoRoot,
  configFile: false,
  logLevel: 'silent',
  plugins: [{
    name: 'museum-audit-entry',
    resolveId: (id) => id === virtualEntry ? resolvedEntry : undefined,
    load: (id) => id === resolvedEntry ? `
      export * from '/src/data/museumCatalog.ts';
      export * from '/src/data/museum/ancientGreekHall.ts';
      export * from '/src/data/museum/renaissanceReasonRevolutionHall.ts';
      export * from '/src/data/museum/modernityFreedomCritiqueHall.ts';
      export * from '/src/data/museum/museumAssets.ts';
      export * from '/src/data/museum/museumInterpretations.ts';
      export * from '/src/components/MuseumGallery/museumMovement.ts';
      export * from '/src/components/MuseumGallery/museumPointerLockState.ts';
      export * from '/src/components/MuseumGallery/museumRuntime.ts';
      export * from '/src/components/MuseumGallery/museumSession.ts';
      export * from '/src/components/MuseumGallery/museumVisitState.ts';
      export * from '/src/components/MuseumGallery/museumWorldTransform.ts';
      export * from '/src/components/MuseumGallery/museumHallTransitions.ts';
      export {branches} from '/src/data/branches.ts';
      export {philosophers} from '/src/data/philosophers.ts';
    ` : undefined,
  }],
  build: {
    ssr: true,
    write: false,
    minify: false,
    target: 'node18',
    rollupOptions: {input: virtualEntry, output: {format: 'es', codeSplitting: false}},
  },
});

const outputs = (Array.isArray(result) ? result : [result]).flatMap(({output}) => output);
const entry = outputs.find((item) => item.type === 'chunk' && item.isEntry);
assert(entry, 'Vite did not produce an executable Museum audit entry.');
const museum = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`);

const {
  ANCIENT_GREEK_HALL_DEFINITION,
  MODERNITY_FREEDOM_CRITIQUE_HALL_DEFINITION,
  RENAISSANCE_REASON_REVOLUTION_HALL_DEFINITION,
  MUSEUM_ASSETS,
  MUSEUM_HALLS,
  MUSEUM_INTERPRETATIONS,
  branches,
  philosophers,
  MUSEUM_POINTER_LOCK_SETTLED,
  createMuseumExhibitVisitContext,
  directMuseumVisitContext,
  hasMuseumBrowserModifier,
  isValidMuseumPosition,
  museumHistoryStateWithVisitContext,
  museumConnectionCrossed,
  museumPhaseHasActiveIntent,
  museumPointerLockEventFailureRequestId,
  museumPointerLockSurvivesBlockedOverlay,
  museumPointToWorld,
  museumPoseToWorld,
  parseMuseumExhibitVisitContext,
  parseMuseumSession,
  positionInsideSpatialUnion,
  resolveMuseumCloseResumeStrategy,
  resolveMuseumExitPolicy,
  resolveMuseumHallArrival,
  sanitizeMuseumPose,
  transitionMuseumPointerLock,
  transitionMuseumVisitPhase,
} = museum;

const HALL_IDS = [
  'ancient-greek',
  'renaissance-reason-revolution',
  'modernity-freedom-critique',
];
const EXPECTED_EXHIBITS = {
  'ancient-greek': ['socrates', 'plato', 'aristotle', 'cynicism', 'epicureanism', 'stoicism', 'skepticism', 'neoplatonism'],
  'renaissance-reason-revolution': ['machiavelli', 'descartes', 'hobbes', 'locke', 'spinoza', 'hume', 'rousseau', 'kant'],
  'modernity-freedom-critique': ['kierkegaard', 'marx', 'nietzsche', 'heidegger', 'sartre', 'beauvoir', 'camus', 'foucault'],
};
const EXPECTED_NEIGHBORS = {
  'ancient-greek': ['renaissance-reason-revolution'],
  'renaissance-reason-revolution': ['ancient-greek', 'modernity-freedom-critique'],
  'modernity-freedom-critique': ['renaissance-reason-revolution'],
};
const definitions = [
  ANCIENT_GREEK_HALL_DEFINITION,
  RENAISSANCE_REASON_REVOLUTION_HALL_DEFINITION,
  MODERNITY_FREEDOM_CRITIQUE_HALL_DEFINITION,
];
const definitionsById = new Map(definitions.map((definition) => [definition.id, definition]));
const hallsById = new Map(MUSEUM_HALLS.map((hall) => [hall.id, hall]));
const activeExhibitRefs = new Set(MUSEUM_HALLS.flatMap((hall) => hall.exhibits.map((exhibit) => `${hall.id}/${exhibit.id}`)));
const activeExhibitIds = new Set(MUSEUM_HALLS.flatMap((hall) => hall.exhibits.map(({id}) => id)));
const assetById = new Map(MUSEUM_ASSETS.map((asset) => [asset.id, asset]));

let checks = 0;
const check = (name, assertion) => {
  assertion();
  checks += 1;
  console.log(`✓ ${name}`);
};
const unique = (values) => new Set(values).size === values.length;
const wordCount = (value) => value.trim().split(/\s+/).filter(Boolean).length;
const distance = (first, second) => Math.hypot(first.x - second.x, first.z - second.z);
const approx = (actual, expected, message, epsilon = 1e-6) => assert(Math.abs(actual - expected) <= epsilon, `${message}: expected ${expected}, got ${actual}`);
const rotateDirectionToWorld = (definition, direction) => {
  const cosine = Math.cos(definition.worldTransform.yaw);
  const sine = Math.sin(definition.worldTransform.yaw);
  return {
    x: direction.x * cosine + direction.z * sine,
    z: -direction.x * sine + direction.z * cosine,
  };
};
const sumCellArea = (layout) => layout.spatialCells.reduce((sum, {bounds}) =>
  sum + (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ), 0);
const allColliders = (layout) => [...layout.wallColliders, ...layout.obstacleColliders];
const sampleSegment = (start, end, interval, callback) => {
  const length = distance(start, end);
  const samples = Math.max(1, Math.ceil(length / interval));
  for (let index = 0; index <= samples; index += 1) {
    const fraction = index / samples;
    callback({x: start.x + (end.x - start.x) * fraction, z: start.z + (end.z - start.z) * fraction});
  }
  return length;
};

check('the active Museum catalog is exactly the ordered three-hall collection', () => {
  assert.deepEqual(MUSEUM_HALLS.map(({id}) => id), HALL_IDS);
  assert.deepEqual(definitions.map(({id}) => id), HALL_IDS);
  assert(unique(HALL_IDS));
  assert.equal(hallsById.size, 3);
  assert.equal(definitionsById.size, 3);
  assert(!hallsById.has('medieval-worlds'), 'the retired Medieval hall must not remain active');
});

check('each hall has the mandated eight exhibits, three zones, and guided order', () => {
  for (const hall of MUSEUM_HALLS) {
    assert.deepEqual(hall.exhibits.map(({id}) => id), EXPECTED_EXHIBITS[hall.id]);
    assert.equal(hall.exhibits.length, 8);
    assert.equal(hall.zones.length, 3);
    assert(unique(hall.exhibits.map(({id}) => id)));
    assert(unique(hall.zones.map(({id}) => id)));
    assert.deepEqual([...hall.guidedOrder], EXPECTED_EXHIBITS[hall.id]);
    const zoneIds = new Set(hall.zones.map(({id}) => id));
    for (const exhibit of hall.exhibits) assert(zoneIds.has(exhibit.zoneId), `${hall.id}/${exhibit.id} uses an unknown zone`);
  }
  assert.equal(activeExhibitRefs.size, 24);
  assert.equal(activeExhibitIds.size, 24, 'active exhibit IDs must remain globally unique');
});

check('catalog entities resolve to real philosopher or branch records', () => {
  const philosopherIds = new Set(philosophers.map(({id}) => id));
  const branchIds = new Set(branches.map(({id}) => id));
  for (const hall of MUSEUM_HALLS) {
    for (const exhibit of hall.exhibits) {
      assert.equal(exhibit.id, exhibit.entityId, `${hall.id}/${exhibit.id} must keep its entity-matching stable ID`);
      const ids = exhibit.entityKind === 'philosopher' ? philosopherIds : branchIds;
      assert(ids.has(exhibit.entityId), `${hall.id}/${exhibit.id} has no ${exhibit.entityKind} record`);
      assert.equal(exhibit.supportingAssetIds.length, 1, `${hall.id}/${exhibit.id} must have exactly two curated assets total`);
    }
  }
});

check('each authored layout agrees exactly with its catalog and remains internally safe', () => {
  for (const definition of definitions) {
    const {layout} = definition;
    const hall = hallsById.get(definition.id);
    assert(hall);
    assert.equal(layout.id, definition.id);
    assert.equal(layout.title, hall.title);
    assert.deepEqual(layout.exhibits.map(({id}) => id).sort(), hall.exhibits.map(({id}) => id).sort());
    assert.deepEqual([...layout.guidedOrder], [...hall.guidedOrder]);
    assert.equal(layout.guidedWalkLegs.length, 7);
    approx(sumCellArea(layout), layout.floorArea, `${layout.id} floor area`);
    assert(layout.spatialCells.length >= 3);
    assert(layout.spatialConnections.length >= layout.spatialCells.length - 1);
    assert(layout.wallColliders.length > 0);
    assert.equal(layout.lighting.exhibitLights.length, 8);
    assert(unique(layout.lighting.exhibitLights.map(({exhibitId}) => exhibitId)));
    assert.equal(layout.cameraFov, 68, `${layout.id} must keep the persistent camera projection contract`);
    assert.equal(layout.cameraFar, 110, `${layout.id} must keep the persistent camera far plane`);

    const cellById = new Map(layout.spatialCells.map((cell) => [cell.id, cell]));
    const layoutExhibitById = new Map(layout.exhibits.map((exhibit) => [exhibit.id, exhibit]));
    assert.equal(cellById.size, layout.spatialCells.length);
    assert.equal(layoutExhibitById.size, 8);
    for (const cell of layout.spatialCells) {
      assert(cell.bounds.minX < cell.bounds.maxX && cell.bounds.minZ < cell.bounds.maxZ, `${layout.id}/${cell.id} has invalid bounds`);
      for (const exhibitId of cell.exhibitIds) {
        const exhibit = layoutExhibitById.get(exhibitId);
        assert(exhibit, `${layout.id}/${cell.id} names unknown exhibit ${exhibitId}`);
        assert.equal(exhibit.spatialCellId, cell.id, `${layout.id}/${exhibitId} is assigned to a different cell`);
      }
    }
    for (const connection of layout.spatialConnections) {
      assert(cellById.has(connection.fromCellId), `${layout.id}/${connection.id} has unknown from-cell`);
      assert(cellById.has(connection.toCellId), `${layout.id}/${connection.id} has unknown to-cell`);
    }
    for (const exhibit of layout.exhibits) {
      assert(cellById.has(exhibit.spatialCellId), `${layout.id}/${exhibit.id} has unknown spatial cell`);
      assert.equal(exhibit.collider.id, `exhibit-${exhibit.id}`);
      assert(exhibit.interactionRadius > 0);
      assert(isValidMuseumPosition(exhibit.viewpoint, layout.playerRadius, layout.bounds, allColliders(layout), layout.spatialCells), `${layout.id}/${exhibit.id} viewpoint is unsafe`);
      assert.equal(exhibit.scene.mediaMounts.length, 2, `${layout.id}/${exhibit.id} must render two media objects`);
      const catalog = hall.exhibits.find(({id}) => id === exhibit.id);
      const mounted = exhibit.scene.mediaMounts.map(({assetId}) => assetId).sort();
      assert.deepEqual(mounted, [catalog.principalAssetId, ...catalog.supportingAssetIds].sort(), `${layout.id}/${exhibit.id} mounted assets drifted`);
    }
    assert(isValidMuseumPosition(layout.spawn, layout.playerRadius, layout.bounds, allColliders(layout), layout.spatialCells), `${layout.id} spawn is unsafe`);
    assert(isValidMuseumPosition(layout.reset, layout.playerRadius, layout.bounds, allColliders(layout), layout.spatialCells), `${layout.id} reset is unsafe`);
  }
});

check('primary circulation and every guided leg remain continuous and collision-free', () => {
  for (const definition of definitions) {
    const {layout} = definition;
    const colliders = allColliders(layout);
    const circulation = layout.primaryCirculation;
    assert(circulation.id.trim());
    assert(circulation.clearanceRadius >= layout.playerRadius);
    assert(circulation.points.length >= 2);
    let circulationLength = 0;
    for (let index = 1; index < circulation.points.length; index += 1) {
      circulationLength += sampleSegment(circulation.points[index - 1], circulation.points[index], .1, (point) => {
        assert(positionInsideSpatialUnion(point, circulation.clearanceRadius, layout.spatialCells), `${layout.id} primary circulation exits the spatial union near ${JSON.stringify(point)}`);
        assert(isValidMuseumPosition(point, circulation.clearanceRadius, layout.bounds, colliders, layout.spatialCells), `${layout.id} primary circulation loses authored clearance near ${JSON.stringify(point)}`);
      });
    }
    assert(circulationLength > 20, `${layout.id} primary circulation is implausibly short`);

    const exhibits = new Map(layout.exhibits.map((exhibit) => [exhibit.id, exhibit]));
    for (const [index, leg] of layout.guidedWalkLegs.entries()) {
      assert.equal(leg.fromExhibitId, layout.guidedOrder[index]);
      assert.equal(leg.toExhibitId, layout.guidedOrder[index + 1]);
      const from = exhibits.get(leg.fromExhibitId);
      const to = exhibits.get(leg.toExhibitId);
      assert(from && to);
      const points = [from.viewpoint, ...leg.waypoints, to.viewpoint];
      for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
        sampleSegment(points[pointIndex - 1], points[pointIndex], .1, (point) => {
          assert(positionInsideSpatialUnion(point, layout.playerRadius, layout.spatialCells), `${layout.id} guided leg ${leg.fromExhibitId} → ${leg.toExhibitId} exits the hall`);
          assert(isValidMuseumPosition(point, layout.playerRadius, layout.bounds, colliders, layout.spatialCells), `${layout.id} guided leg ${leg.fromExhibitId} → ${leg.toExhibitId} collides near ${JSON.stringify(point)}`);
        });
      }
    }
  }
});

check('the Ancient compositions retain the required classical triad and Hellenistic perimeter U', () => {
  const layout = ANCIENT_GREEK_HALL_DEFINITION.layout;
  const positions = Object.fromEntries(layout.exhibits.map(({id, position, rotationY}) => [id, {...position, rotationY}]));
  assert.deepEqual(positions.socrates, {x: -8.6, z: 13.3, rotationY: Math.PI / 2});
  assert.deepEqual(positions.plato, {x: 0, z: 10.35, rotationY: 0});
  assert.deepEqual(positions.aristotle, {x: 8.6, z: 13.3, rotationY: -Math.PI / 2});
  assert(positions.cynicism.x > 0 && positions.epicureanism.x < 0);
  assert(positions.stoicism.x < 0 && positions.skepticism.x > 0);
  assert.equal(positions.stoicism.rotationY, 0);
  assert.equal(positions.skepticism.rotationY, 0);
  const hellenisticEntry = layout.entryViews.find(({spatialCellId}) => spatialCellId === 'hellenistic-ways-room');
  assert(hellenisticEntry, 'the Hellenistic room needs an entry view');
  assert.deepEqual([...hellenisticEntry.expectedVisibleExhibitIds].sort(), ['cynicism', 'epicureanism', 'skepticism', 'stoicism']);
});

check('the hall graph and prefetch adjacency are exactly bidirectional', () => {
  for (const definition of definitions) {
    const expected = EXPECTED_NEIGHBORS[definition.id];
    assert.deepEqual(definition.connections.map(({targetHallId}) => targetHallId).sort(), [...expected].sort());
    assert.deepEqual([...definition.prefetch.adjacentHallIds].sort(), [...expected].sort());
    assert.equal(definition.prefetch.sceneAssetIds.length, 16);
    assert(unique(definition.prefetch.sceneAssetIds));
    for (const id of definition.prefetch.entrySceneAssetIds) assert(definition.prefetch.sceneAssetIds.includes(id), `${definition.id} entry prefetch includes non-scene asset ${id}`);
    for (const connection of definition.connections) {
      const target = definitionsById.get(connection.targetHallId);
      assert(target, `${definition.id}/${connection.id} targets an inactive hall`);
      const sourceEntrance = definition.entrances.find(({id}) => id === connection.localEntranceId);
      const targetEntrance = target.entrances.find(({id}) => id === connection.targetEntranceId);
      assert(sourceEntrance, `${definition.id}/${connection.id} has no local entrance`);
      assert(targetEntrance, `${definition.id}/${connection.id} has no target entrance`);
      const reverse = target.connections.find((candidate) =>
        candidate.targetHallId === definition.id
        && candidate.localEntranceId === connection.targetEntranceId
        && candidate.targetEntranceId === connection.localEntranceId);
      assert(reverse, `${definition.id} → ${target.id} has no exact reverse seam`);
    }
  }
});

check('every bidirectional seam coincides in world space with opposed inward normals', () => {
  const auditedPairs = new Set();
  for (const source of definitions) {
    for (const connection of source.connections) {
      const pairKey = [source.id, connection.targetHallId].sort().join('↔');
      if (auditedPairs.has(pairKey)) continue;
      auditedPairs.add(pairKey);
      const target = definitionsById.get(connection.targetHallId);
      const sourceEntrance = source.entrances.find(({id}) => id === connection.localEntranceId);
      const targetEntrance = target.entrances.find(({id}) => id === connection.targetEntranceId);
      const sourceWorld = museumPointToWorld(source, sourceEntrance.position);
      const targetWorld = museumPointToWorld(target, targetEntrance.position);
      assert(distance(sourceWorld, targetWorld) <= 1e-6, `${pairKey} seam positions differ by ${distance(sourceWorld, targetWorld)}`);
      const sourceNormal = rotateDirectionToWorld(source, sourceEntrance.inwardNormal);
      const targetNormal = rotateDirectionToWorld(target, targetEntrance.inwardNormal);
      approx(Math.hypot(sourceNormal.x, sourceNormal.z), 1, `${source.id} seam normal length`);
      approx(Math.hypot(targetNormal.x, targetNormal.z), 1, `${target.id} seam normal length`);
      approx(sourceNormal.x * targetNormal.x + sourceNormal.z * targetNormal.z, -1, `${pairKey} inward-normal dot product`);
    }
  }
  assert.equal(auditedPairs.size, 2);
});

check('physical seam crossing and arrival resolution work in both directions', () => {
  for (const source of definitions) {
    for (const connection of source.connections) {
      const entrance = source.entrances.find(({id}) => id === connection.localEntranceId);
      const previous = {
        x: entrance.position.x + entrance.inwardNormal.x * .05,
        z: entrance.position.z + entrance.inwardNormal.z * .05,
      };
      const current = {
        x: entrance.position.x - entrance.inwardNormal.x * .05,
        z: entrance.position.z - entrance.inwardNormal.z * .05,
      };
      assert.equal(museumConnectionCrossed(source, previous, current)?.id, connection.id, `${source.id}/${connection.id} did not cross`);
      const sourcePose = {...current, yaw: 0, pitch: 0};
      const target = definitionsById.get(connection.targetHallId);
      const arrival = resolveMuseumHallArrival(source, target, connection.targetEntranceId, sourcePose);
      assert(arrival, `${source.id}/${connection.id} could not resolve an arrival`);
      assert(isValidMuseumPosition(arrival, target.layout.playerRadius, target.layout.bounds, allColliders(target.layout), target.layout.spatialCells), `${source.id}/${connection.id} resolves an unsafe arrival`);
      const sourceWorld = museumPoseToWorld(source, sourcePose);
      const arrivalWorld = museumPoseToWorld(target, arrival);
      assert(distance(sourceWorld, arrivalWorld) < 1.5, `${source.id}/${connection.id} arrival teleports too far from its physical seam`);
    }
  }
});

check('all 24 dedicated interpretations are active, substantial, linked, and asset-complete', () => {
  assert.equal(MUSEUM_INTERPRETATIONS.length, 24);
  assert(unique(MUSEUM_INTERPRETATIONS.map(({hallId, id}) => `${hallId}/${id}`)));
  for (const interpretation of MUSEUM_INTERPRETATIONS) {
    const ref = `${interpretation.hallId}/${interpretation.id}`;
    assert(activeExhibitRefs.has(ref), `${ref} is not an active Museum exhibit`);
    const hall = hallsById.get(interpretation.hallId);
    const exhibit = hall.exhibits.find(({id}) => id === interpretation.id);
    assert(exhibit);
    assert(wordCount(interpretation.lead) >= 100, `${ref} lead is too shallow (${wordCount(interpretation.lead)} words)`);
    assert(interpretation.keyIdeas.length >= 3, `${ref} needs at least three key ideas`);
    assert(interpretation.keyWorks.length >= 3, `${ref} needs at least three key works`);
    const isNewHall = interpretation.hallId !== 'ancient-greek';
    assert(interpretation.sections.length >= (isNewHall ? 4 : 3), `${ref} needs a complete interpretive section set`);
    assert(interpretation.sources.length >= 3, `${ref} needs at least three sources`);
    assert(interpretation.relatedExhibits.length >= (isNewHall ? 2 : 1), `${ref} needs active related-exhibit links`);
    for (const source of interpretation.sources) assert.equal(new URL(source.url).protocol, 'https:', `${ref} has a non-HTTPS source`);
    for (const related of interpretation.relatedExhibits) assert(activeExhibitRefs.has(`${related.hallId}/${related.exhibitId}`), `${ref} links to inactive exhibit ${related.hallId}/${related.exhibitId}`);
    const objectIds = Object.keys(interpretation.objectInterpretations).sort();
    assert.deepEqual(objectIds, [exhibit.principalAssetId, ...exhibit.supportingAssetIds].sort(), `${ref} object interpretation assets drifted`);
    assert(interpretation.articleRoute.kind === exhibit.entityKind, `${ref} article route kind disagrees with the exhibit entity`);
    assert.equal(interpretation.articleRoute[`${exhibit.entityKind}Id`], exhibit.entityId, `${ref} article route target drifted`);
  }
});

check('the active asset graph contains exactly two unique records per exhibit', () => {
  assert.equal(MUSEUM_ASSETS.length, 48);
  assert.equal(assetById.size, 48);
  const referencedIds = [];
  for (const hall of MUSEUM_HALLS) {
    for (const exhibit of hall.exhibits) {
      const ids = [exhibit.principalAssetId, ...exhibit.supportingAssetIds];
      assert.equal(ids.length, 2);
      for (const id of ids) {
        referencedIds.push(id);
        const asset = assetById.get(id);
        assert(asset, `${hall.id}/${exhibit.id} references missing asset ${id}`);
        assert.equal(asset.entityKind, exhibit.entityKind);
        assert.equal(asset.entityId, exhibit.entityId);
      }
    }
  }
  assert(unique(referencedIds), 'an active Museum asset is reused by multiple catalog slots');
  assert.deepEqual([...referencedIds].sort(), MUSEUM_ASSETS.map(({id}) => id).sort());
  assert(MUSEUM_ASSETS.every(({variants}) => !variants.scene.path.includes('/medieval-worlds/')), 'retired Medieval media must not remain active');
});

check('camera-session parsing is hall-qualified and rejects malformed or unsafe poses', () => {
  for (const definition of definitions) {
    const {layout} = definition;
    const valid = JSON.stringify({version: 1, hallId: layout.id, ...layout.spawn});
    assert(parseMuseumSession(valid, layout));
    assert.equal(parseMuseumSession('{bad json', layout), undefined);
    assert.equal(parseMuseumSession(JSON.stringify({version: 1, hallId: 'wrong', ...layout.spawn}), layout), undefined);
    assert.equal(parseMuseumSession(JSON.stringify({version: 1, hallId: layout.id, x: null, z: 0, yaw: 0, pitch: 0}), layout), undefined);
    assert.equal(sanitizeMuseumPose({...layout.spawn, x: Number.POSITIVE_INFINITY}, layout), undefined);
    const occupied = layout.exhibits[0].collider.center;
    assert.equal(sanitizeMuseumPose({...occupied, yaw: 0, pitch: 0}, layout), undefined);
  }
});

check('typed exhibit origins preserve explicit close, history, and resume policies', () => {
  const expected = {
    'active-exploration': {navigation: 'back', resumeExploration: true, restoreDirectory: false},
    'paused-hall': {navigation: 'back', resumeExploration: false, restoreDirectory: false},
    directory: {navigation: 'back', resumeExploration: false, restoreDirectory: true},
    guided: {navigation: 'back', resumeExploration: false, restoreDirectory: false},
    direct: {navigation: 'replace-hall', resumeExploration: false, restoreDirectory: false},
  };
  for (const [origin, policy] of Object.entries(expected)) {
    const context = createMuseumExhibitVisitContext('ancient-greek', origin);
    assert.deepEqual(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: context}, 'ancient-greek'), context);
    assert.deepEqual(resolveMuseumExitPolicy(context, 'gesture'), policy);
    const historyPolicy = resolveMuseumExitPolicy(context, 'history');
    assert.equal(historyPolicy.resumeExploration, origin === 'active-exploration');
    assert.equal(resolveMuseumCloseResumeStrategy(context, 'gesture'), origin === 'active-exploration' ? 'request-pointer-lock' : 'remain-paused');
    assert.equal(resolveMuseumCloseResumeStrategy(context, 'history'), origin === 'active-exploration' ? 'resume-drag-look' : 'remain-paused');
  }
  const direct = directMuseumVisitContext('modernity-freedom-critique');
  const carried = museumHistoryStateWithVisitContext({unrelated: 7}, direct);
  assert.equal(carried.unrelated, 7);
  assert.deepEqual(parseMuseumExhibitVisitContext(carried, 'modernity-freedom-critique'), direct);
  assert.equal(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: {...direct, version: 1}}, 'modernity-freedom-critique'), undefined);
  assert.equal(parseMuseumExhibitVisitContext(carried, 'not-a-hall'), undefined);
});

check('Pointer Lock transitions preserve only a live overlay-close request through teardown', () => {
  let transition = MUSEUM_POINTER_LOCK_SETTLED;
  transition = transitionMuseumPointerLock(transition, {type: 'begin-overlay-close', requestId: 1});
  assert.deepEqual(transition, {kind: 'overlay-close', outcome: 'pending', requestId: 1, failureChannel: 'event'});
  assert.equal(museumPointerLockSurvivesBlockedOverlay(transition), true);
  transition = transitionMuseumPointerLock(transition, {type: 'lock-acquired'});
  assert.deepEqual(transition, {kind: 'overlay-close', outcome: 'acquired', requestId: 1, failureChannel: 'event'});
  assert.deepEqual(transitionMuseumPointerLock(transition, {type: 'lock-rejected', requestId: 1}), transition);
  assert.deepEqual(transitionMuseumPointerLock(transition, {type: 'complete-overlay-close'}), {kind: 'settled'});

  const sceneRequest = transitionMuseumPointerLock(MUSEUM_POINTER_LOCK_SETTLED, {type: 'begin-scene', requestId: 3});
  assert.deepEqual(sceneRequest, {kind: 'requesting', source: 'scene', requestId: 3, failureChannel: 'event'});
  assert.equal(museumPointerLockSurvivesBlockedOverlay(sceneRequest), false);
  assert.equal(museumPointerLockEventFailureRequestId(sceneRequest), 3);
  const promiseRequest = transitionMuseumPointerLock(sceneRequest, {type: 'use-promise-failure', requestId: 3});
  assert.equal(museumPointerLockEventFailureRequestId(promiseRequest), undefined);
  assert.deepEqual(transitionMuseumPointerLock(promiseRequest, {type: 'lock-rejected', requestId: 2}), promiseRequest);
  assert.deepEqual(transitionMuseumPointerLock(promiseRequest, {type: 'lock-rejected', requestId: 3}), {kind: 'settled'});
  const expectedRelease = transitionMuseumPointerLock(MUSEUM_POINTER_LOCK_SETTLED, {type: 'expect-release'});
  assert.deepEqual(transitionMuseumPointerLock(expectedRelease, {type: 'release-observed'}), {kind: 'settled'});
});

check('focus suspension and explicit pause retain the Museum visit-phase truth table', () => {
  const cases = [
    ['unentered', 'enter', 'active'],
    ['active', 'focus-lost', 'focus-suspended'],
    ['focus-suspended', 'focus-lost', 'focus-suspended'],
    ['focus-suspended', 'scene-reactivate', 'active'],
    ['active', 'explicit-pause', 'explicitly-paused'],
    ['focus-suspended', 'explicit-pause', 'explicitly-paused'],
    ['explicitly-paused', 'scene-reactivate', 'explicitly-paused'],
    ['explicitly-paused', 'resume-active-origin', 'active'],
    ['focus-suspended', 'resume-active-origin', 'active'],
    ['active', 'scene-error', 'explicitly-paused'],
  ];
  for (const [phase, event, expected] of cases) assert.equal(transitionMuseumVisitPhase(phase, event), expected, `${phase} + ${event}`);
  assert.equal(museumPhaseHasActiveIntent('unentered'), false);
  assert.equal(museumPhaseHasActiveIntent('active'), true);
  assert.equal(museumPhaseHasActiveIntent('focus-suspended'), true);
  assert.equal(museumPhaseHasActiveIntent('explicitly-paused'), false);
});

check('Museum controls leave modified browser shortcuts untouched', () => {
  assert.equal(hasMuseumBrowserModifier({altKey: true, ctrlKey: false, metaKey: false}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: true, metaKey: false}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: false, metaKey: true}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: false, metaKey: false}), false);
});

check('the world registry is the active three-hall lazy graph with no retired import', () => {
  assert.match(registrySource, /import\('\.\/AncientGreekHallScene'\)/);
  assert.match(registrySource, /import\('\.\/RenaissanceReasonRevolutionHallScene'\)/);
  assert.match(registrySource, /import\('\.\/ModernityFreedomCritiqueHallScene'\)/);
  assert.doesNotMatch(registrySource, /medieval/i);
  assert.match(registrySource, /prefetchMuseumHallEntry/);
  assert.match(registrySource, /prefetchMuseumHallRemainder/);
});

check('the persistent runtime keeps resident adjacency, rendered readiness, and failure recovery', () => {
  assert.match(museumWorldSource, /props\.registrations\.map/);
  assert.match(museumWorldSource, /onHallTransition\(connection\)/);
  assert.match(museumWorldSource, /pose\.x = previousPosition\.x;[\s\S]*pose\.z = previousPosition\.z;/);
  assert.match(museumWorldSource, /frameloop=\{renderable \? 'demand' : 'never'\}/);
  assert.doesNotMatch(museumWorldSource, /frameloop=\{[^}]*'always'/);
  assert.match(museumWorldSource, /inputRef\.current\.requestFrame = requestFrame/);
  assert.match(museumWorldSource, /onHallContentReady/);
  assert.match(museumPageSource, /preparedHallIdsRef/);
  assert.match(museumPageSource, /renderedHallIdsRef/);
  assert.match(museumPageSource, /residentHallIds/);
  assert.match(museumPageSource, /MUSEUM_WORLD_REGISTRY\.filter/);
  assert.match(museumPageSource, /MUSEUM_HALLS\.map/);
  assert.match(museumPageSource, /onHallActivate/);
  assert.match(museumPageSource, /onZoneViewpoint/);
  assert.match(museumPageSource, /replace\(\s*\{kind: 'museum', hallId: connection\.targetHallId\}/);
  assert.match(museumPageSource, /retryHallContent/);
  assert.match(museumPageSource, /key=\{sceneEpoch\}/);
  assert.doesNotMatch(museumPageSource, /key=\{(?:activeHallId|route\.hallId)\}/);
  assert.match(museumPageSource, /pendingHallTransitionRef/);
  assert.match(museumPageSource, /pendingCrossHallCloseRef/);
  assert.match(museumPageSource, /failedHallContentIdsRef/);
  assert.match(museumPageSource, /adjacentFailedHallIds\.map/);
  assert.match(museumPageSource, /activeHallLoading \|\| activeHallLoadFailed/);
  assert.match(museumPageSource, /role="group" aria-label="Choose a Museum gallery"/);
  assert.doesNotMatch(museumPageSource, /role="tablist"|role="tab"/);
  assert.match(museumPageSource, /returnFocus=\{overlayOpenerRef\.current\}/);
  assert.match(museumPageSource, /retryingHallIdsRef/);
  assert.match(museumPageSource, /connection\?\.saveData/);
  assert.match(museumPageSource, /lastSavedHallSignatureRef/);
});

check('the persistent Museum implementation contains exactly one React Three Fiber Canvas', () => {
  const tsxFiles = readdirSync(galleryRoot, {withFileTypes: true})
    .filter((entry) => entry.isFile() && extname(entry.name) === '.tsx')
    .map((entry) => resolve(galleryRoot, entry.name));
  const canvasOccurrences = tsxFiles.flatMap((path) => {
    const source = readFileSync(path, 'utf8');
    return [...source.matchAll(/<Canvas(?:\s|>)/g)].map(() => path);
  });
  assert.equal(canvasOccurrences.length, 1, `expected one persistent Canvas, found ${canvasOccurrences.length}`);
  assert(canvasOccurrences[0].endsWith('MuseumWorldScene.tsx'));
});

console.log(`\nMuseum audit passed: ${checks} groups covering 3 halls, 24 exhibits, 48 assets, and 2 bidirectional physical seams.`);
