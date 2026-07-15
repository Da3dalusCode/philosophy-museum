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
const museumControlsSource = readFileSync(resolve(galleryRoot, 'useMuseumControls.ts'), 'utf8');
const museumModalSource = readFileSync(resolve(galleryRoot, 'MuseumModal.tsx'), 'utf8');
const museumVisitorMapSource = readFileSync(resolve(galleryRoot, 'MuseumVisitorMap.tsx'), 'utf8');
const museumKioskSource = readFileSync(resolve(galleryRoot, 'MuseumVisitorMapKiosk.tsx'), 'utf8');
const museumCssSource = readFileSync(resolve(galleryRoot, 'museum.css'), 'utf8');
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
      export * from '/src/data/museum/logicLanguageScienceHall.ts';
      export * from '/src/data/museum/ethicsJusticePoliticalLifeHall.ts';
      export * from '/src/data/museum/mindConsciousnessSelfHall.ts';
      export * from '/src/data/museum/museumVisitorMap.ts';
      export * from '/src/data/museum/museumVisitorMapProjection.ts';
      export * from '/src/data/museum/museumWorldDefinitions.ts';
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
  ETHICS_JUSTICE_POLITICAL_LIFE_HALL_DEFINITION,
  LOGIC_LANGUAGE_SCIENCE_HALL_DEFINITION,
  MIND_CONSCIOUSNESS_SELF_HALL_DEFINITION,
  MODERNITY_FREEDOM_CRITIQUE_HALL_DEFINITION,
  RENAISSANCE_REASON_REVOLUTION_HALL_DEFINITION,
  MUSEUM_ASSETS,
  MUSEUM_HALLS,
  MUSEUM_INTERPRETATIONS,
  MUSEUM_VISITOR_MAP_EDGES,
  MUSEUM_VISITOR_MAP_KIOSK,
  MUSEUM_VISITOR_MAP_NODES,
  MUSEUM_VISITOR_MAP_PROJECTION,
  MUSEUM_WORLD_DEFINITIONS,
  branches,
  philosophers,
  MUSEUM_POINTER_LOCK_SETTLED,
  createMuseumExhibitVisitContext,
  circleIntersectsCollider,
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
  resolveMuseumVisitorMapDestination,
  sanitizeMuseumPose,
  transitionMuseumPointerLock,
  transitionMuseumVisitPhase,
  visitorMapInteractionAtPose,
} = museum;

const HALL_IDS = [
  'ancient-greek',
  'renaissance-reason-revolution',
  'modernity-freedom-critique',
  'logic-language-science',
  'ethics-justice-political-life',
  'mind-consciousness-self',
];
const EXPECTED_EXHIBITS = {
  'ancient-greek': ['socrates', 'plato', 'aristotle', 'cynicism', 'epicureanism', 'stoicism', 'skepticism', 'neoplatonism'],
  'renaissance-reason-revolution': ['machiavelli', 'descartes', 'hobbes', 'locke', 'spinoza', 'hume', 'rousseau', 'kant'],
  'modernity-freedom-critique': ['kierkegaard', 'marx', 'nietzsche', 'heidegger', 'sartre', 'beauvoir', 'camus', 'foucault'],
  'logic-language-science': ['peirce', 'frege', 'russell', 'dewey', 'carnap', 'popper', 'quine', 'kuhn'],
  'ethics-justice-political-life': ['bentham', 'wollstonecraft', 'mill', 'arendt', 'fanon', 'rawls', 'nozick', 'habermas'],
  'mind-consciousness-self': ['patanjali', 'vasubandhu', 'william-james', 'husserl', 'merleau-ponty', 'anscombe', 'thomas-nagel', 'derek-parfit'],
};
const EXPECTED_NEIGHBORS = {
  'ancient-greek': ['renaissance-reason-revolution'],
  'renaissance-reason-revolution': ['ancient-greek', 'modernity-freedom-critique'],
  'modernity-freedom-critique': ['renaissance-reason-revolution', 'logic-language-science'],
  'logic-language-science': ['modernity-freedom-critique', 'ethics-justice-political-life'],
  'ethics-justice-political-life': ['logic-language-science', 'mind-consciousness-self'],
  'mind-consciousness-self': ['ethics-justice-political-life'],
};
const definitions = [...MUSEUM_WORLD_DEFINITIONS];
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
const colliderCorners = (collider) => {
  const cosine = Math.cos(collider.rotation);
  const sine = Math.sin(collider.rotation);
  return [-1, 1].flatMap((xSign) => [-1, 1].map((zSign) => {
    const x = xSign * collider.size.width / 2;
    const z = zSign * collider.size.depth / 2;
    return {
      x: collider.center.x + x * cosine + z * sine,
      z: collider.center.z - x * sine + z * cosine,
    };
  }));
};
const colliderAxes = (collider) => {
  const cosine = Math.cos(collider.rotation);
  const sine = Math.sin(collider.rotation);
  return [{x: cosine, z: -sine}, {x: sine, z: cosine}];
};
const projectionRadius = (collider, axis) => {
  const [widthAxis, depthAxis] = colliderAxes(collider);
  return Math.abs(widthAxis.x * axis.x + widthAxis.z * axis.z) * collider.size.width / 2
    + Math.abs(depthAxis.x * axis.x + depthAxis.z * axis.z) * collider.size.depth / 2;
};
const collidersOverlap = (first, second) => {
  const delta = {x: second.center.x - first.center.x, z: second.center.z - first.center.z};
  return [...colliderAxes(first), ...colliderAxes(second)].every((axis) => {
    const separation = Math.abs(delta.x * axis.x + delta.z * axis.z);
    return separation < projectionRadius(first, axis) + projectionRadius(second, axis) - 1e-6;
  });
};
const localPointToWorld = (collider, point) => {
  const cosine = Math.cos(collider.rotation);
  const sine = Math.sin(collider.rotation);
  return {
    x: collider.center.x + point.x * cosine + point.z * sine,
    z: collider.center.z - point.x * sine + point.z * cosine,
  };
};
const wrappedAngularDelta = (angle, yaw) =>
  Math.atan2(Math.sin(angle - yaw), Math.cos(angle - yaw));
const bearingFromPose = (pose, point) =>
  Math.atan2(-(point.x - pose.x), -(point.z - pose.z));
const assertFinitePose = (pose, message) => {
  for (const key of ['x', 'z', 'yaw', 'pitch']) assert(Number.isFinite(pose[key]), `${message} has non-finite ${key}`);
};

check('oriented collision math matches the yaw convention used by rendered Three groups', () => {
  const collider = {id: 'rotation-contract', center: {x: 2, z: -3}, size: {width: 2, depth: .4}, rotation: .55};
  const renderedInside = localPointToWorld(collider, {x: .9, z: 0});
  const renderedOutside = localPointToWorld(collider, {x: 0, z: .5});
  assert(circleIntersectsCollider(renderedInside, .04, collider), 'a point inside the rendered rotated housing misses its collider');
  assert(!circleIntersectsCollider(renderedOutside, .04, collider), 'a point outside the rendered rotated housing hits a mirrored collider');
});

check('the active Museum catalog is exactly the ordered six-hall collection', () => {
  assert.deepEqual(MUSEUM_HALLS.map(({id}) => id), HALL_IDS);
  assert.deepEqual(definitions.map(({id}) => id), HALL_IDS);
  assert(unique(HALL_IDS));
  assert.equal(hallsById.size, 6);
  assert.equal(definitionsById.size, 6);
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
  assert.equal(activeExhibitRefs.size, 48);
  assert.equal(activeExhibitIds.size, 48, 'active exhibit IDs must remain globally unique');
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

    const expectedFromEntryViews = [];
    const horizontalHalfFov = Math.atan(Math.tan(layout.cameraFov * Math.PI / 360) * (16 / 9));
    for (const entryView of layout.entryViews) {
      const cell = cellById.get(entryView.spatialCellId);
      assert(cell, `${layout.id} entry view names unknown spatial cell ${entryView.spatialCellId}`);
      assert(
        isValidMuseumPosition(entryView.pose, layout.playerRadius, layout.bounds, allColliders(layout), layout.spatialCells),
        `${layout.id}/${entryView.spatialCellId} entry pose is unsafe`,
      );
      assert(
        entryView.pose.x >= cell.bounds.minX && entryView.pose.x <= cell.bounds.maxX
          && entryView.pose.z >= cell.bounds.minZ && entryView.pose.z <= cell.bounds.maxZ,
        `${layout.id}/${entryView.spatialCellId} entry pose sits outside its authored room`,
      );
      for (const exhibitId of entryView.expectedVisibleExhibitIds) {
        const exhibit = layoutExhibitById.get(exhibitId);
        assert(exhibit, `${layout.id}/${entryView.spatialCellId} entry view names unknown exhibit ${exhibitId}`);
        assert.equal(exhibit.spatialCellId, entryView.spatialCellId, `${layout.id}/${exhibitId} is not in the entry view's room`);
        const bearing = Math.atan2(-(exhibit.position.x - entryView.pose.x), -(exhibit.position.z - entryView.pose.z));
        const angularDelta = Math.atan2(Math.sin(bearing - entryView.pose.yaw), Math.cos(bearing - entryView.pose.yaw));
        assert(
          Math.abs(angularDelta) <= horizontalHalfFov,
          `${layout.id}/${exhibitId} falls outside the 16:9 entry-view frustum (${(Math.abs(angularDelta) * 180 / Math.PI).toFixed(1)}°)`,
        );
        expectedFromEntryViews.push(exhibitId);
      }
    }
    assert(unique(expectedFromEntryViews), `${layout.id} repeats an exhibit across room-entry compositions`);
    assert.deepEqual(expectedFromEntryViews.sort(), layout.exhibits.map(({id}) => id).sort(), `${layout.id} entry views must introduce all eight exhibits`);
  }
});

check('the visitor-map projection covers every registered hall and resolves only safe authored destinations', () => {
  const nodeIds = MUSEUM_VISITOR_MAP_NODES.map(({hallId}) => hallId);
  assert(unique(nodeIds), 'visitor-map hall IDs must be unique');
  assert.deepEqual([...nodeIds].sort(), definitions.map(({id}) => id).sort());
  assert.deepEqual([...nodeIds].sort(), MUSEUM_HALLS.map(({id}) => id).sort());
  assert.deepEqual(MUSEUM_VISITOR_MAP_PROJECTION.map(({hall}) => hall.id), definitions.map(({id}) => id));
  const expectedEdgeKeys = new Set(definitions.flatMap(({id, connections}) =>
    connections.map(({targetHallId}) => [id, targetHallId].sort().join('::'))));
  assert.deepEqual(new Set(MUSEUM_VISITOR_MAP_EDGES.map(({key}) => key)), expectedEdgeKeys);
  assert.equal(MUSEUM_VISITOR_MAP_EDGES.length, expectedEdgeKeys.size, 'visitor-map connections must render exactly once');
  const positions = [];
  for (const node of MUSEUM_VISITOR_MAP_NODES) {
    assert.deepEqual(Object.keys(node).sort(), ['destination', 'hallId', 'mapPosition'], `${node.hallId} duplicates non-map catalog data`);
    assert(Number.isFinite(node.mapPosition.x) && Number.isFinite(node.mapPosition.y), `${node.hallId} has non-finite map coordinates`);
    assert(node.mapPosition.x >= 5 && node.mapPosition.x <= 95, `${node.hallId} map x leaves the diagram`);
    assert(node.mapPosition.y >= 5 && node.mapPosition.y <= 95, `${node.hallId} map y leaves the diagram`);
    assert(positions.every((position) => Math.hypot(position.x - node.mapPosition.x, position.y - node.mapPosition.y) >= 18), `${node.hallId} overlaps another map node`);
    positions.push(node.mapPosition);
    const definition = definitionsById.get(node.hallId);
    assert(definition, `${node.hallId} has no registered Museum definition`);
    const destination = resolveMuseumVisitorMapDestination(definition, node);
    assert(destination, `${node.hallId} visitor-map destination cannot resolve`);
    assertFinitePose(destination, `${node.hallId} visitor-map destination`);
    assert(
      isValidMuseumPosition(destination, definition.layout.playerRadius, definition.layout.bounds, allColliders(definition.layout), definition.layout.spatialCells),
      `${node.hallId} visitor-map destination is not collision-safe`,
    );
    if (node.destination.kind === 'spawn') assert.deepEqual(destination, definition.layout.spawn, `${node.hallId} must use its authored spawn`);
    else assert(definition.entrances.some(({id}) => id === node.destination.entranceId), `${node.hallId} names an unknown visitor-map entrance`);
  }
});

check('the Hall I visitor-map kiosk is visible, approachable, collision-backed, and clear of circulation', () => {
  const definition = ANCIENT_GREEK_HALL_DEFINITION;
  const {layout} = definition;
  const kiosk = MUSEUM_VISITOR_MAP_KIOSK;
  assert.equal(kiosk.hallId, definition.id);
  assert.equal(kiosk.kind, 'visitor-map-kiosk');
  assert(kiosk.center.x > layout.spawn.x, 'the kiosk must sit to the spawn visitor’s right');
  for (const value of [kiosk.center.x, kiosk.center.z, kiosk.size.width, kiosk.size.depth, kiosk.rotation, kiosk.height, kiosk.interactionRadius]) {
    assert(Number.isFinite(value), 'the kiosk housing contains non-finite geometry');
  }
  assert(kiosk.size.width >= 1.8 && kiosk.size.width <= 3.2);
  assert(kiosk.size.depth >= .5 && kiosk.size.depth <= 1.3);
  assert(kiosk.height >= 2 && kiosk.height <= 3);
  assert(kiosk.interactionRadius >= 2.4 && kiosk.interactionRadius <= 4);
  for (const value of [kiosk.screen.width, kiosk.screen.height, kiosk.screen.centerY]) {
    assert(Number.isFinite(value) && value > 0, 'the kiosk screen geometry must be finite and positive');
  }
  assert(kiosk.screen.width <= kiosk.size.width - .2, 'the visitor-map screen leaves its horizontal housing');
  assert(kiosk.screen.centerY - kiosk.screen.height / 2 > .3, 'the visitor-map screen intersects the base');
  assert(kiosk.screen.centerY + kiosk.screen.height / 2 < kiosk.height, 'the visitor-map screen leaves the housing height');
  assert(Number.isFinite(kiosk.light.intensity) && kiosk.light.intensity > 0);
  assert(Number.isFinite(kiosk.light.distance) && kiosk.light.distance > 0);
  const furnishingMatches = layout.furnishings.filter(({id}) => id === kiosk.id);
  const colliderMatches = layout.obstacleColliders.filter(({id}) => id === kiosk.id);
  assert.equal(furnishingMatches.length, 1, 'the kiosk must be an authored furnishing exactly once');
  assert.equal(colliderMatches.length, 1, 'the kiosk collider must join movement obstacles exactly once');
  assert.equal(furnishingMatches[0], kiosk, 'the rendered furnishing must use the shared kiosk geometry object');
  assert.equal(colliderMatches[0], kiosk, 'movement collision must use the shared kiosk geometry object');
  const atrium = layout.spatialCells.find(({id}) => id === 'orientation-atrium');
  assert(atrium, 'Hall I needs its Orientation Atrium');
  const corners = colliderCorners(kiosk);
  for (const corner of corners) {
    assert(corner.x > atrium.bounds.minX && corner.x < atrium.bounds.maxX, 'the kiosk footprint leaves the atrium on x');
    assert(corner.z > atrium.bounds.minZ && corner.z < atrium.bounds.maxZ, 'the kiosk footprint leaves the atrium on z');
  }
  assert(distance(layout.spawn, kiosk.center) > kiosk.interactionRadius + 1.5, 'the kiosk must invite approach rather than activate at spawn');
  assert(distance(kiosk.approachPose, kiosk.center) < kiosk.interactionRadius - .15, 'the authored approach pose must enter interaction range');
  assertFinitePose(kiosk.approachPose, 'the visitor-map approach pose');
  assert.equal(visitorMapInteractionAtPose(definition.id, layout.spawn), undefined, 'spawn must not be in kiosk interaction range');
  assert.deepEqual(visitorMapInteractionAtPose(definition.id, kiosk.approachPose), {kind: 'visitor-map', hallId: definition.id, kioskId: kiosk.id});
  const behindKiosk = localPointToWorld(kiosk, {x: 0, z: -(kiosk.size.depth / 2 + .5)});
  assert.equal(visitorMapInteractionAtPose(definition.id, behindKiosk), undefined, 'the one-sided screen activates from behind');
  assert(
    isValidMuseumPosition(kiosk.approachPose, layout.playerRadius, layout.bounds, allColliders(layout), layout.spatialCells),
    'the kiosk approach pose must be collision-free',
  );
  assert(!circleIntersectsCollider(kiosk.approachPose, layout.playerRadius, kiosk), 'the kiosk approach pose intersects its housing');
  const approachBearing = bearingFromPose(kiosk.approachPose, kiosk.center);
  assert(Math.abs(wrappedAngularDelta(approachBearing, kiosk.approachPose.yaw)) < .08, 'the authored approach pose does not face the screen');
  for (const collider of allColliders(layout).filter(({id}) => id !== kiosk.id)) {
    assert(!collidersOverlap(kiosk, collider), `the kiosk housing overlaps collider ${collider.id}`);
  }
  sampleSegment(layout.spawn, kiosk.approachPose, .08, (point) => {
    assert(
      isValidMuseumPosition(point, layout.playerRadius, layout.bounds, allColliders(layout), layout.spatialCells),
      `the direct spawn-to-kiosk approach collides near ${JSON.stringify(point)}`,
    );
  });
  sampleSegment(layout.spawn, layout.spawnFocalPoint, .08, (point) => {
    assert(!circleIntersectsCollider(point, layout.primaryCirculation.clearanceRadius, kiosk), 'the kiosk interrupts the entrance-to-gallery sightline');
  });

  const screenPlaneZ = .151;
  const screenWorldPoints = [-kiosk.screen.width / 2, 0, kiosk.screen.width / 2].map((x) =>
    localPointToWorld(kiosk, {x, z: screenPlaneZ}));
  for (const aspect of [16 / 9, 9 / 16]) {
    const horizontalHalfFov = Math.atan(Math.tan(layout.cameraFov * Math.PI / 360) * aspect);
    for (const point of screenWorldPoints) {
      const delta = wrappedAngularDelta(bearingFromPose(layout.spawn, point), layout.spawn.yaw);
      assert(Math.abs(delta) <= horizontalHalfFov, `the visitor-map screen leaves the initial ${aspect > 1 ? '16:9' : '9:16'} frustum at ${(Math.abs(delta) * 180 / Math.PI).toFixed(1)}°`);
    }
  }
  const verticalHalfFov = layout.cameraFov * Math.PI / 360;
  for (const point of [screenWorldPoints[0], screenWorldPoints.at(-1)]) {
    const horizontalDistance = distance(layout.spawn, point);
    for (const y of [kiosk.screen.centerY - kiosk.screen.height / 2, kiosk.screen.centerY + kiosk.screen.height / 2]) {
      const verticalAngle = Math.atan2(y - layout.eyeHeight, horizontalDistance);
      assert(Math.abs(verticalAngle - layout.spawn.pitch) <= verticalHalfFov, 'the visitor-map screen leaves the initial vertical frustum');
    }
  }
  const screenCenter = screenWorldPoints[1];
  const otherColliders = allColliders(layout).filter(({id}) => id !== kiosk.id);
  sampleSegment(layout.spawn, screenCenter, .08, (point) => {
    for (const collider of otherColliders) {
      assert(!circleIntersectsCollider(point, .02, collider), `collider ${collider.id} occludes the kiosk from spawn`);
    }
  });
  const front = {x: Math.sin(kiosk.rotation), z: Math.cos(kiosk.rotation)};
  const toSpawnLength = distance(kiosk.center, layout.spawn);
  const toSpawn = {x: (layout.spawn.x - kiosk.center.x) / toSpawnLength, z: (layout.spawn.z - kiosk.center.z) / toSpawnLength};
  assert(front.x * toSpawn.x + front.z * toSpawn.z > .9, 'the kiosk screen must face the initial visitor');
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
  assert.equal(auditedPairs.size, 5);
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

check('all 48 dedicated interpretations are active, substantial, linked, and asset-complete', () => {
  assert.equal(MUSEUM_INTERPRETATIONS.length, 48);
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
  assert.equal(MUSEUM_ASSETS.length, 96);
  assert.equal(assetById.size, 96);
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

check('the physical visitor-map source wiring reuses Museum interaction, overlay, directory, and navigation contracts', () => {
  assert.match(museumWorldSource, /visitorMapInteractionAtPose\(definition\.id, poseRef\.current\)/);
  assert.match(museumWorldSource, /kind: 'exhibit'/);
  assert.match(museumKioskSource, /MUSEUM_VISITOR_MAP_KIOSK/);
  assert.match(museumKioskSource, /MUSEUM_VISITOR_MAP_PROJECTION\.length/);
  assert.match(museumKioskSource, /MUSEUM_VISITOR_MAP_EDGES\.forEach/);
  assert.match(museumKioskSource, /hall\.id === MUSEUM_VISITOR_MAP_KIOSK\.hallId/);
  assert.match(museumKioskSource, /hall\.galleryNumber/);
  assert.match(museumKioskSource, /kiosk\.height/);
  assert.match(museumKioskSource, /onClick=\{activate\}/);
  assert.match(museumKioskSource, /CanvasTexture/);
  assert.match(museumVisitorMapSource, /MUSEUM_VISITOR_MAP_PROJECTION/);
  assert.match(museumVisitorMapSource, /MUSEUM_VISITOR_MAP_EDGES\.map/);
  assert.match(museumVisitorMapSource, /<MuseumModal/);
  assert.match(museumVisitorMapSource, /aria-current=\{current \? 'location'/);
  assert.match(museumVisitorMapSource, /onTravel\(selected\.hall\.id\)/);
  assert.match(museumModalSource, /event\.key === 'Escape'/);
  assert.match(museumModalSource, /event\.target === event\.currentTarget/);
  assert.match(museumModalSource, /visibleFocusable/);
  assert.match(museumModalSource, /target\?\.focus\(\{preventScroll: true\}\)/);
  assert.match(museumPageSource, /resolveMuseumVisitorMapDestination\(targetRegistration\.definition, node\)/);
  assert.match(museumPageSource, /activateHall\(hallId, destination\)/);
  assert.match(museumPageSource, /saveMuseumSession\(targetRegistration\.definition\.layout, destination\)/);
  assert.match(museumPageSource, /if \(hallId !== sourceHallId\)[\s\S]*push\(/);
  assert.match(museumPageSource, /visitorMapResumeRef/);
  assert.match(museumPageSource, /overlayReturnFocusPendingRef/);
  assert.match(museumPageSource, /onClose=\{dismissOverlay\}/);
  assert.match(museumPageSource, /requestOverlayCloseResume/);
  assert.match(museumPageSource, /completeOverlayCloseResume/);
  assert.match(museumPageSource, /onInteract=\{interactNearby\}/);
  assert.match(museumControlsSource, /event\.code === 'KeyM'[\s\S]*callbacksRef\.current\.onOpenDirectory\(\)/);
  assert.match(museumPageSource, /overlay === 'directory'[\s\S]*<Directory/);
  assert.match(museumPageSource, /MUSEUM_HALLS\.map/);
  assert.match(museumCssSource, /@media\(max-width:900px\)[\s\S]*?\.museum-visitor-map-layout\{grid-template-columns:1fr\}[\s\S]*?\.museum-visitor-map-node\{[^}]*width:100%/);
});

check('the world registry is the active six-hall lazy graph with no retired import', () => {
  assert.match(registrySource, /MUSEUM_WORLD_DEFINITIONS\.map/);
  assert.match(registrySource, /contentLoaders\[definition\.id\]/);
  assert.match(registrySource, /import\('\.\/AncientGreekHallScene'\)/);
  assert.match(registrySource, /import\('\.\/RenaissanceReasonRevolutionHallScene'\)/);
  assert.match(registrySource, /import\('\.\/ModernityFreedomCritiqueHallScene'\)/);
  assert.match(registrySource, /import\('\.\/LogicLanguageScienceHallScene'\)/);
  assert.match(registrySource, /import\('\.\/EthicsJusticePoliticalLifeHallScene'\)/);
  assert.match(registrySource, /import\('\.\/MindConsciousnessSelfHallScene'\)/);
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

console.log(`\nMuseum audit passed: ${checks} groups covering 6 halls, 48 exhibits, 96 assets, 5 bidirectional physical seams, and the entrance visitor-map kiosk.`);
