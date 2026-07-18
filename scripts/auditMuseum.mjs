import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {dirname, extname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const galleryRoot = resolve(repoRoot, 'src/components/MuseumGallery');
const museumDataRoot = resolve(repoRoot, 'src/data/museum');
const buildingManifest = JSON.parse(readFileSync(resolve(museumDataRoot, 'museumBuildingManifest.json'), 'utf8'));
const source = (file) => readFileSync(resolve(repoRoot, file), 'utf8');
const registrySource = source('src/components/MuseumGallery/museumWorldRegistry.ts');
const museumPageSource = source('src/components/MuseumGallery/MuseumPage.tsx');
const museumWorldSource = source('src/components/MuseumGallery/MuseumWorldScene.tsx');
const architectureSource = source('src/components/MuseumGallery/ContemporaryHallArchitecture.tsx');
const canonicalSceneSource = source('src/components/MuseumGallery/CanonicalMuseumHallScene.tsx');
const canonicalExhibitsSource = source('src/components/MuseumGallery/CanonicalMuseumExhibits.tsx');
const visitorMapSource = source('src/components/MuseumGallery/MuseumVisitorMap.tsx');
const compatibilitySource = source('src/components/MuseumGallery/MuseumCompatibilityPage.tsx');
const museumCssSource = source('src/components/MuseumGallery/museum.css');
const virtualEntry = 'virtual:philosophy-atlas-canonical-museum-audit';
const resolvedEntry = `\0${virtualEntry}`;

const result = await build({
  root: repoRoot,
  configFile: false,
  logLevel: 'silent',
  plugins: [{
    name: 'canonical-museum-audit-entry',
    resolveId: (id) => id === virtualEntry ? resolvedEntry : undefined,
    load: (id) => id === resolvedEntry ? `
      export * from '/src/data/museumCatalog.ts';
      export * from '/src/data/museum/museumBuildingManifest.ts';
      export * from '/src/data/museum/museumBuildingRuntime.ts';
      export * from '/src/data/museum/museumHallTemplates.ts';
      export * from '/src/data/museum/museumVisitorMap.ts';
      export * from '/src/data/museum/museumVisitorMapProjection.ts';
      export * from '/src/data/museum/museumAssets.ts';
      export * from '/src/data/museum/museumTextureBudget.ts';
      export * from '/src/data/museum/museumTexturePolicy.ts';
      export * from '/src/data/museum/museumInterpretations.ts';
      export * from '/src/components/MuseumGallery/museumMovement.ts';
      export * from '/src/components/MuseumGallery/museumResidency.ts';
      export * from '/src/components/MuseumGallery/museumSession.ts';
      export * from '/src/components/MuseumGallery/museumVisitState.ts';
      export * from '/src/components/MuseumGallery/museumWorldTransform.ts';
      export * from '/src/components/MuseumGallery/museumHallTransitions.ts';
      export * from '/src/components/MuseumGallery/museumRuntime.ts';
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
assert(entry, 'Vite did not produce an executable canonical Museum audit entry.');
const museum = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`);

const {
  MUSEUM_ASSETS,
  MUSEUM_BUILDING_MANIFEST,
  MUSEUM_CANONICAL_PROGRAM,
  MUSEUM_DECODED_TEXTURE_BUDGET_BYTES,
  MUSEUM_DECODED_TEXTURE_BUDGET_MIB,
  MUSEUM_DIRECTED_CONNECTIONS,
  MUSEUM_FAST_WALK_SPEED,
  MUSEUM_HALLS,
  MUSEUM_HALL_TEMPLATE_REGISTRY,
  MUSEUM_INTERPRETATIONS,
  MUSEUM_LEGACY_GEOMETRY_ADAPTERS,
  MUSEUM_LIVE_PROGRAM_TOTALS,
  MUSEUM_PLANNED_HALL_TITLES,
  MUSEUM_READINESS_PRESENTATIONS,
  MUSEUM_RUNTIME_NODES,
  MUSEUM_STANDARD_WALK_SPEED,
  MUSEUM_VISITOR_MAP_DOORWAYS,
  MUSEUM_VISITOR_MAP_EDGES,
  MUSEUM_VISITOR_MAP_ENTRANCE,
  MUSEUM_VISITOR_MAP_KIOSK,
  MUSEUM_VISITOR_MAP_KIOSK_MARKER,
  MUSEUM_VISITOR_MAP_NODES,
  MUSEUM_VISITOR_MAP_NODE_PROJECTIONS,
  MUSEUM_VISITOR_MAP_PROJECTION,
  MUSEUM_VISITOR_MAP_RESERVATIONS,
  MUSEUM_VISITOR_MAP_VIEWBOX,
  MUSEUM_WORLD_DEFINITIONS,
  branches,
  philosophers,
  circleIntersectsCollider,
  createMuseumExhibitVisitContext,
  createMuseumHallTravelContext,
  createMuseumInputState,
  estimateMuseumHallTextureResidency,
  hasMuseumBrowserModifier,
  isValidMuseumPosition,
  museumConnectionCrossed,
  museumPointToWorld,
  parseMuseumExhibitVisitContext,
  parseMuseumHallTravelContext,
  parseMuseumSession,
  resolveMuseumHallArrival,
  resolveMuseumHallResidencyPlan,
  resolveMuseumReadinessGateGeometry,
  resolveMuseumReadinessGateStatus,
  resolveMuseumVisitorMapDestination,
  resolveMuseumWalkingSpeed,
} = museum;

const HALL_IDS = [
  'mediterranean-beginnings-classical',
  'renaissance-humanism-new-method',
  'phenomenology-existence-embodiment',
  'analytic-traditions',
  'justice-democratic-reason',
  'core-questions-forum',
];
const LEGACY_HALL_IDS = [
  'ancient-greek',
  'renaissance-reason-revolution',
  'modernity-freedom-critique',
  'logic-language-science',
  'ethics-justice-political-life',
  'mind-consciousness-self',
];
const EXPECTED_COUNTS = {
  'mediterranean-beginnings-classical': {rooms: 4, exhibits: 20, template: 'sequence-3'},
  'renaissance-humanism-new-method': {rooms: 3, exhibits: 3, template: 'sequence-3'},
  'phenomenology-existence-embodiment': {rooms: 5, exhibits: 9, template: 'sequence-3'},
  'analytic-traditions': {rooms: 5, exhibits: 7, template: 'sequence-3'},
  'justice-democratic-reason': {rooms: 3, exhibits: 5, template: 'sequence-3'},
  'core-questions-forum': {rooms: 9, exhibits: 15, template: 'crossroads-4'},
};
const TIER_RUNTIME = {
  'anchor-exhibit': {tier: 'anchor', treatment: 'anchor-bay'},
  'standard-individual-exhibit': {tier: 'standard', treatment: 'standard-bay'},
  'supporting-exhibit': {tier: 'supporting', treatment: 'supporting-panel'},
  'thematic-cluster-participant': {tier: 'cluster', treatment: 'cluster-panel'},
  'gallery-archive-or-study-wall-record': {tier: 'archive', treatment: 'archive-label'},
};
const definitions = [...MUSEUM_WORLD_DEFINITIONS];
const definitionById = new Map(definitions.map((definition) => [definition.id, definition]));
const runtimeNodeById = new Map(MUSEUM_RUNTIME_NODES.map((node) => [node.id, node]));
const hallById = new Map(MUSEUM_HALLS.map((hall) => [hall.id, hall]));
const assetById = new Map(MUSEUM_ASSETS.map((asset) => [asset.id, asset]));
const activeRefs = new Set(MUSEUM_HALLS.flatMap((hall) => hall.exhibits.map(({id}) => `${hall.id}/${id}`)));
const activeEndpointKeys = new Set(MUSEUM_BUILDING_MANIFEST.connections.flatMap(({a, b}) => [`${a.nodeId}:${a.slotId}`, `${b.nodeId}:${b.slotId}`]));
activeEndpointKeys.add(`${MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId}:${MUSEUM_BUILDING_MANIFEST.mainEntrance.slotId}`);
const unsafeExhibitViewpoints = [];
const unsafeNavigationPoses = [];
const residencyAdmissionFailures = [];
const interpretationQualityFailures = [];

let checks = 0;
const check = (name, assertion) => {
  assertion();
  checks += 1;
  console.log(`✓ ${name}`);
};
const unique = (values) => new Set(values).size === values.length;
const sorted = (values) => [...values].sort();
const wordCount = (value) => value.trim().split(/\s+/).filter(Boolean).length;
const distance = (first, second) => Math.hypot(first.x - second.x, first.z - second.z);
const approx = (actual, expected, message, epsilon = 1e-5) => assert(Math.abs(actual - expected) <= epsilon, `${message}: expected ${expected}, got ${actual}`);
const validPose = (definition, pose) => isValidMuseumPosition(
  pose,
  definition.layout.playerRadius,
  definition.layout.bounds,
  [...definition.layout.wallColliders, ...definition.layout.obstacleColliders],
  definition.layout.spatialCells,
);
const worldNormal = (definition, normal) => ({
  x: normal.x * Math.cos(definition.worldTransform.yaw) + normal.z * Math.sin(definition.worldTransform.yaw),
  z: -normal.x * Math.sin(definition.worldTransform.yaw) + normal.z * Math.cos(definition.worldTransform.yaw),
});

check('the public catalog is exactly the canonical six-hall, 29-room, 59-exhibit program', () => {
  assert.deepEqual(MUSEUM_HALLS.map(({id}) => id), HALL_IDS);
  assert.equal(MUSEUM_HALLS.reduce((sum, hall) => sum + hall.zones.length, 0), 29);
  assert.equal(MUSEUM_HALLS.reduce((sum, hall) => sum + hall.exhibits.length, 0), 59);
  assert.deepEqual(MUSEUM_LIVE_PROGRAM_TOTALS.tierCounts, {
    'anchor-exhibit': 30,
    'standard-individual-exhibit': 25,
    'supporting-exhibit': 3,
    'thematic-cluster-participant': 0,
    'gallery-archive-or-study-wall-record': 1,
  });
  assert.equal(MUSEUM_LIVE_PROGRAM_TOTALS.recordCapacity, 78);
  assert.equal(MUSEUM_LIVE_PROGRAM_TOTALS.reserveCapacity, 19);
  for (const hall of MUSEUM_HALLS) {
    const expected = EXPECTED_COUNTS[hall.id];
    assert.equal(hall.zones.length, expected.rooms, `${hall.id} room count changed`);
    assert.equal(hall.exhibits.length, expected.exhibits, `${hall.id} exhibit count changed`);
    assert.equal(hall.templateId, expected.template, `${hall.id} template changed`);
    assert.deepEqual(hall.guidedOrder, hall.exhibits.map(({id}) => id), `${hall.id} guided order is stale`);
  }
  assert.equal(philosophers.length, 142);
  assert.equal(branches.length, 43);
});

check('all nine Forum rooms carry rigorous comparative lenses into the directory and compiled wayfinding', () => {
  const forumProgram = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === 'core-questions-forum');
  const forumDirectory = hallById.get('core-questions-forum');
  const forumDefinition = definitionById.get('core-questions-forum');
  assert(forumProgram && forumDirectory && forumDefinition);
  assert.equal(forumProgram.rooms.length, 9);

  const plannedHallIds = new Set(Object.keys(MUSEUM_PLANNED_HALL_TITLES));
  const culturallyOutwardHallIds = new Set([
    'classical-south-asian-worlds',
    'buddhist-philosophies',
    'classical-chinese-traditions',
    'islamic-philosophical-worlds',
    'jewish-philosophy',
  ]);
  const primaryExhibitIds = new Set(MUSEUM_CANONICAL_PROGRAM.flatMap(({rooms}) => rooms.flatMap(({exhibits}) => exhibits.map(({id}) => id))));
  const forumPrimaryEntityIds = new Set(forumProgram.rooms.flatMap(({exhibits}) => exhibits.map(({entityId}) => entityId)));
  const philosopherIds = new Set(philosophers.map(({id}) => id));
  const lensIds = [];
  const lensEntityIds = [];

  for (const room of forumProgram.rooms) {
    const lenses = room.comparativeLenses ?? [];
    assert(lenses.length >= 2, `${room.id} must carry at least two comparative lenses`);
    assert(unique(lenses.map(({id}) => id)), `${room.id} repeats a comparative-lens id`);
    assert(unique(lenses.map(({entityId}) => entityId)), `${room.id} repeats a comparative entity`);
    assert(unique(lenses.map(({displayName}) => displayName)), `${room.id} repeats a comparative display name`);
    assert(unique(lenses.map(({culturalSetting}) => culturalSetting)), `${room.id} repeats a cultural setting`);
    assert(lenses.some(({primaryHallId}) => culturallyOutwardHallIds.has(primaryHallId)), `${room.id} lacks a lens outside modern European/North-American framing`);

    const directoryRoom = forumDirectory.zones.find(({id}) => id === room.id);
    assert.deepEqual(directoryRoom?.comparativeLenses, lenses, `${room.id} comparative lenses are missing or stale in the directory`);
    for (const lens of lenses) {
      assert(lens.id.trim().length >= 5, `${room.id} has an invalid comparative-lens id`);
      assert(philosopherIds.has(lens.entityId), `${room.id}/${lens.id} does not name a registered philosopher`);
      assert(lens.displayName.trim().length >= 8, `${room.id}/${lens.id} lacks a useful display name`);
      assert(lens.culturalSetting.trim().length >= 12, `${room.id}/${lens.id} lacks a substantive cultural setting`);
      assert(plannedHallIds.has(lens.primaryHallId), `${room.id}/${lens.id} points to an unknown planned primary hall`);
      assert.notEqual(lens.primaryHallId, 'core-questions-forum', `${room.id}/${lens.id} must route outward from the Forum`);
      assert(lens.rationale.trim().length >= 48, `${room.id}/${lens.id} lacks a substantive routing rationale`);
      assert(!primaryExhibitIds.has(lens.id), `${room.id}/${lens.id} was incorrectly counted as a primary exhibit`);
      assert(!forumPrimaryEntityIds.has(lens.entityId), `${room.id}/${lens.id} duplicates a Forum primary assignment`);
      const sign = forumDefinition.layout.signs.find(({id}) => id === `${room.id}:lens:${lens.id}`);
      assert(sign, `${room.id}/${lens.id} lacks a compiled wayfinding sign`);
      assert.equal(sign.kind, 'wayfinding');
      assert.equal(sign.title, lens.displayName);
      assert(sign.subtitle.includes(MUSEUM_PLANNED_HALL_TITLES[lens.primaryHallId]), `${room.id}/${lens.id} sign omits its planned primary hall`);
      lensIds.push(lens.id);
      lensEntityIds.push(lens.entityId);
    }
  }

  assert(unique(lensIds), 'Forum comparative-lens ids must be globally unique');
  const requiredEntities = ['aristotle', 'patanjali', 'kanada', 'nagarjuna', 'dignaga', 'dharmakirti', 'confucius', 'zhuangzi', 'maimonides'];
  for (const entityId of requiredEntities) assert(lensEntityIds.includes(entityId), `Forum comparative lenses omit required entity ${entityId}`);
  const islamicThinkers = new Set(['al-farabi', 'al-ghazali', 'avicenna', 'averroes', 'mulla-sadra', 'suhrawardi']);
  assert(lensEntityIds.some((entityId) => islamicThinkers.has(entityId)), 'Forum comparative lenses require at least one named Islamic thinker');
  assert.equal(forumDefinition.layout.signs.filter(({kind}) => kind === 'wayfinding').length, lensIds.length, 'Forum wayfinding-sign count must equal its comparative-lens count');
});

check('the executable template registry retains the approved canonical contracts', () => {
  const templateById = new Map(MUSEUM_HALL_TEMPLATE_REGISTRY.map((template) => [template.id, template]));
  assert.deepEqual(MUSEUM_HALL_TEMPLATE_REGISTRY.map(({id}) => id), ['standard-rect', 'sequence-3', 'crossroads-4', 'focal-terminal']);
  const sequence = templateById.get('sequence-3');
  const forum = templateById.get('crossroads-4');
  assert.deepEqual(sequence.footprintMetres, {width: 24, depth: 56});
  assert.equal(sequence.wallThicknessMetres, .36);
  assert.equal(sequence.ceilingHeightMetres, 5.8);
  assert.deepEqual(sequence.roomRange, [3, 5]);
  assert.deepEqual(sequence.portalSlots.map(({id}) => id), ['N0', 'S0', 'E1', 'W1']);
  assert.deepEqual(forum.footprintMetres, {width: 28, depth: 28});
  assert.equal(forum.wallThicknessMetres, .36);
  assert.equal(forum.ceilingHeightMetres, 6.2);
  assert.deepEqual(forum.roomRange, [4, 9]);
  assert.deepEqual(forum.portalSlots.map(({id}) => id), ['N0', 'S0', 'E0', 'W0', 'N1', 'S1']);
  for (const template of [sequence, forum]) {
    assert.deepEqual(template.publicPortal, {clearWidthMetres: 4, clearHeightMetres: 3.2, transitionDepthMetres: 1.2});
    assert.deepEqual(template.safeArrivalLanding, {width: 4, depth: 4, poseOffsetFromPortal: 2});
  }
  assert(MUSEUM_LEGACY_GEOMETRY_ADAPTERS.length > 0, 'retained prototype data should remain explicitly classified, not silently erased');
});

check('all six runtime halls are canonical, data-driven, and internally aligned', () => {
  assert.deepEqual(definitions.map(({id}) => id), HALL_IDS);
  assert.equal(new Set(definitions.map(({physicalNodeId}) => physicalNodeId)).size, 6);
  for (const definition of definitions) {
    const hall = hallById.get(definition.id);
    const node = MUSEUM_BUILDING_MANIFEST.nodes.find(({publicHallId}) => publicHallId === definition.id);
    const expected = EXPECTED_COUNTS[definition.id];
    assert(hall && node);
    assert.equal(node.geometryAdapterId, undefined, `${definition.id} still uses a legacy geometry adapter`);
    assert.equal(definition.resolvedTemplate.adapterId, 'canonical-template');
    assert.equal(definition.resolvedTemplate.conformance, 'canonical');
    assert.equal(definition.resolvedTemplate.footprintConformance, 'exact');
    assert.deepEqual(definition.resolvedTemplate.deviations, []);
    assert.equal(definition.resolvedTemplate.templateId, expected.template);
    assert.equal(definition.resolvedTemplate.exhibitSlots.length, expected.exhibits);
    assert.equal(definition.layout.spatialCells.filter(({kind}) => kind === 'room').length, expected.rooms);
    assert.deepEqual(sorted(definition.layout.spatialCells.map(({id}) => id)), sorted(hall.zones.map(({id}) => id)));
    assert.deepEqual(sorted(definition.layout.exhibits.map(({id}) => id)), sorted(hall.exhibits.map(({id}) => id)));
    assert.deepEqual(definition.layout.guidedOrder, definition.layout.exhibits.map(({id}) => id));
    assert.equal(definition.layout.guidedWalkLegs.length, Math.max(0, hall.exhibits.length - 1));
    assert.equal(definition.layout.entryViews.length, hall.zones.length);
    assert.equal(definition.layout.lighting.tracks.length, hall.zones.length);
    assert.equal(definition.layout.lighting.exhibitLights.length, hall.exhibits.length);
    const comparativeLensCount = hall.zones.reduce((sum, zone) => sum + (zone.comparativeLenses?.length ?? 0), 0);
    assert.equal(definition.layout.signs.length, hall.zones.length + 1 + comparativeLensCount);
    assert(validPose(definition, definition.layout.spawn), `${definition.id} spawn is unsafe`);
    assert(validPose(definition, definition.layout.reset), `${definition.id} reset is unsafe`);
    const expectedWidth = expected.template === 'crossroads-4' ? 28 : 24;
    const expectedDepth = expected.template === 'crossroads-4' ? 28 : 56;
    approx(definition.layout.bounds.maxX - definition.layout.bounds.minX, expectedWidth, `${definition.id} width`);
    approx(definition.layout.bounds.maxZ - definition.layout.bounds.minZ, expectedDepth, `${definition.id} depth`);
    approx(definition.layout.floorArea, expectedWidth * expectedDepth, `${definition.id} floor area`);
    assert.deepEqual(definition.resolvedTemplate.mapCells.map(({bounds}) => bounds), [definition.layout.bounds]);
    assert(unique(definition.layout.exhibits.map(({id}) => id)), `${definition.id} duplicates exhibit layouts`);
    assert(unique(definition.layout.wallColliders.map(({id}) => id)), `${definition.id} duplicates wall colliders`);
    for (const layout of definition.layout.exhibits) {
      const catalog = hall.exhibits.find(({id}) => id === layout.id);
      const tier = TIER_RUNTIME[catalog.tier];
      assert.equal(layout.zoneId, catalog.zoneId, `${definition.id}/${layout.id} room drifted`);
      assert.equal(layout.spatialCellId, catalog.zoneId, `${definition.id}/${layout.id} spatial cell drifted`);
      assert.equal(layout.presentationTier, tier.tier, `${definition.id}/${layout.id} tier drifted`);
      assert.equal(layout.treatment, tier.treatment, `${definition.id}/${layout.id} treatment drifted`);
      const viewpointBlockers = [...definition.layout.wallColliders, ...definition.layout.obstacleColliders]
        .filter((collider) => circleIntersectsCollider(layout.viewpoint, definition.layout.playerRadius, collider))
        .map(({id}) => id);
      if (!validPose(definition, layout.viewpoint)) unsafeExhibitViewpoints.push(`${definition.id}/${layout.id} ${JSON.stringify(layout.viewpoint)} blockers=${viewpointBlockers.join(',') || 'bounds/spatial-union'}`);
      assert(!definition.layout.wallColliders.some((collider) => circleIntersectsCollider(layout.position, .1, collider)), `${definition.id}/${layout.id} intersects architecture`);
      for (const mount of layout.scene.mediaMounts) assert(assetById.has(mount.assetId), `${definition.id}/${layout.id} mounts missing asset ${mount.assetId}`);
    }
    for (const slot of definition.resolvedTemplate.exhibitSlots) {
      assert.equal(slot.viewingClearance, 'meets-target', `${definition.id}/${slot.exhibitId} misses viewing clearance`);
      assert.equal(slot.tierConformance, 'meets-tier', `${definition.id}/${slot.exhibitId} misses tier bay width`);
    }
    for (const view of definition.layout.entryViews) {
      if (!validPose(definition, view.pose)) unsafeNavigationPoses.push(`${definition.id}/${view.spatialCellId} room-entry ${JSON.stringify(view.pose)}`);
    }
    for (const point of definition.layout.primaryCirculation.points) {
      if (!validPose(definition, {...point, yaw: 0, pitch: 0})) unsafeNavigationPoses.push(`${definition.id} primary-circulation ${JSON.stringify(point)}`);
    }
    for (const sign of definition.layout.signs) {
      assert(sign.width > 1 && sign.height > .5, `${definition.id}/${sign.id} sign plane is too small`);
      assert(sign.position.x >= definition.layout.bounds.minX && sign.position.x <= definition.layout.bounds.maxX, `${definition.id}/${sign.id} sign escapes the hall`);
      assert(sign.position.z >= definition.layout.bounds.minZ && sign.position.z <= definition.layout.bounds.maxZ, `${definition.id}/${sign.id} sign escapes the hall`);
    }

    const connectedSlots = new Set(MUSEUM_BUILDING_MANIFEST.connections.flatMap(({a, b}) => [a, b]).filter(({nodeId}) => nodeId === node.id).map(({slotId}) => slotId));
    assert.deepEqual(sorted(definition.resolvedTemplate.portalInterfaces.filter(({active}) => active).map(({manifestSlotId}) => manifestSlotId)), sorted(connectedSlots));
    for (const portal of definition.resolvedTemplate.portalInterfaces) {
      assert.equal(portal.dimensionConformance, 'exact');
      const closureId = `${node.id}:${portal.manifestSlotId}:inactive-closure`;
      if (portal.active) {
        assert(!definition.layout.wallColliders.some(({id}) => id === closureId), `${definition.id}/${portal.manifestSlotId} active portal is closed`);
      } else {
        assert(definition.layout.wallColliders.some(({id}) => id === closureId), `${definition.id}/${portal.manifestSlotId} inactive portal lacks full closure`);
      }
    }
    const activePortalIds = new Set(definition.resolvedTemplate.portalInterfaces.filter(({active}) => active).map(({manifestSlotId}) => manifestSlotId));
    for (const entrance of definition.entrances.filter(({id}) => activePortalIds.has(id))) assert(validPose(definition, entrance.arrivalPose), `${definition.id}/${entrance.id} active arrival is unsafe`);
    assert(Object.values(definition.prefetch.entryExhibitIdsByEntrance).flat().every((id) => hall.exhibits.some((exhibit) => exhibit.id === id)), `${definition.id} entry prefetch references unknown exhibits`);
    assert(definition.prefetch.entrySceneAssetIds.every((id) => definition.prefetch.sceneAssetIds.includes(id)), `${definition.id} entry media is not a bounded subset`);
  }
});

check('runtime seams are bidirectional, world-aligned, step-free, and crossable', () => {
  assert.equal(MUSEUM_DIRECTED_CONNECTIONS.length, MUSEUM_BUILDING_MANIFEST.connections.length * 2);
  for (const connection of MUSEUM_BUILDING_MANIFEST.connections) {
    const directed = MUSEUM_DIRECTED_CONNECTIONS.filter(({connectionId}) => connection.id === connectionId);
    assert.equal(directed.length, 2, `${connection.id} is not bidirectional`);
    const source = runtimeNodeById.get(connection.a.nodeId);
    const target = runtimeNodeById.get(connection.b.nodeId);
    const sourceEntrance = source.entrances.find(({id}) => id === connection.a.slotId);
    const targetEntrance = target.entrances.find(({id}) => id === connection.b.slotId);
    assert(sourceEntrance && targetEntrance);
    const sourceWorld = museumPointToWorld(source, sourceEntrance.position);
    const targetWorld = museumPointToWorld(target, targetEntrance.position);
    assert(distance(sourceWorld, targetWorld) < .001, `${connection.id} endpoints do not meet in world space`);
    const sourceNormal = worldNormal(source, sourceEntrance.inwardNormal);
    const targetNormal = worldNormal(target, targetEntrance.inwardNormal);
    assert(Math.hypot(sourceNormal.x + targetNormal.x, sourceNormal.z + targetNormal.z) < .001, `${connection.id} normals do not oppose`);
    assert(validPose(source, sourceEntrance.arrivalPose), `${connection.id} source landing is unsafe`);
    assert(validPose(target, targetEntrance.arrivalPose), `${connection.id} target landing is unsafe`);
    const crossed = museumConnectionCrossed(source, sourceEntrance.arrivalPose, {
      x: sourceEntrance.position.x - sourceEntrance.inwardNormal.x * .15,
      z: sourceEntrance.position.z - sourceEntrance.inwardNormal.z * .15,
    });
    assert.equal(crossed?.connectionId, connection.id, `${connection.id} cannot be crossed from its safe landing`);
    const arrival = resolveMuseumHallArrival(source, target, targetEntrance.id, {...sourceEntrance.position, yaw: 0, pitch: 0});
    assert(arrival && validPose(target, arrival), `${connection.id} cannot resolve a safe target arrival`);
  }
});

check('the physical visitor map is a truthful projection of live geometry and safe travel', () => {
  assert.deepEqual(MUSEUM_VISITOR_MAP_PROJECTION.map(({hall}) => hall.id), HALL_IDS);
  assert.deepEqual(MUSEUM_VISITOR_MAP_NODES.map(({hallId}) => hallId), HALL_IDS);
  assert.equal(MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.length, MUSEUM_RUNTIME_NODES.length);
  assert.equal(MUSEUM_VISITOR_MAP_EDGES.length, MUSEUM_BUILDING_MANIFEST.connections.length);
  assert.equal(MUSEUM_VISITOR_MAP_RESERVATIONS.length, 11);
  assert.equal(MUSEUM_VISITOR_MAP_RESERVATIONS.filter(({reservationType}) => reservationType === 'insertion').length, 3);
  assert.equal(MUSEUM_VISITOR_MAP_RESERVATIONS.filter(({reservationType}) => reservationType === 'outward-expansion').length, 8);
  assert(MUSEUM_VISITOR_MAP_RESERVATIONS.every(({targetProgramHallId}) => !targetProgramHallId || !HALL_IDS.includes(targetProgramHallId)));
  assert(MUSEUM_VISITOR_MAP_VIEWBOX.width > 0 && MUSEUM_VISITOR_MAP_VIEWBOX.height > 0);
  assert.equal(MUSEUM_VISITOR_MAP_ENTRANCE.key, `${MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId}:${MUSEUM_BUILDING_MANIFEST.mainEntrance.slotId}`);
  assert.equal(MUSEUM_VISITOR_MAP_KIOSK.hallId, 'mediterranean-beginnings-classical');
  assert.equal(MUSEUM_VISITOR_MAP_KIOSK_MARKER.hallId, 'mediterranean-beginnings-classical');
  for (const node of MUSEUM_VISITOR_MAP_NODES) {
    const definition = definitionById.get(node.hallId);
    const destination = resolveMuseumVisitorMapDestination(definition, node);
    assert(destination && validPose(definition, destination), `${node.hallId} fast-travel destination is unsafe`);
  }
  const projectedDoorwayKeys = sorted(MUSEUM_VISITOR_MAP_DOORWAYS.map(({key}) => key));
  assert.deepEqual(projectedDoorwayKeys, sorted(activeEndpointKeys), 'Visitor map must show active doorways plus the main entrance, not inactive template slots');
  assert(!MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.some(({publicHallId, id}) => LEGACY_HALL_IDS.includes(publicHallId) || LEGACY_HALL_IDS.some((legacyId) => id === `hall:${legacyId}`)));
});

check('decoded texture residency admits every active and approached hall under 96 MiB', () => {
  assert.equal(MUSEUM_DECODED_TEXTURE_BUDGET_MIB, 96);
  assert.equal(MUSEUM_DECODED_TEXTURE_BUDGET_BYTES, 96 * 1024 * 1024);
  let peak = 0;
  for (const hallId of HALL_IDS) {
    const active = estimateMuseumHallTextureResidency(hallId, 'active');
    const entry = estimateMuseumHallTextureResidency(hallId, 'entry-resident');
    assert(active.totalBytes > 0, `${hallId} has no active texture residency`);
    if (active.totalBytes > MUSEUM_DECODED_TEXTURE_BUDGET_BYTES) residencyAdmissionFailures.push(`${hallId} active textures use ${active.totalMiB.toFixed(2)} MiB and exceed 96 MiB`);
    assert(entry.totalBytes > 0 && entry.totalBytes <= active.totalBytes, `${hallId} entry textures are unbounded`);
  }
  for (const activeHallId of HALL_IDS) {
    for (const approachedHallId of HALL_IDS) {
      if (activeHallId === approachedHallId) continue;
      const plan = resolveMuseumHallResidencyPlan({activeHallId, approachedHallId});
      assert(plan.hallIds.includes(activeHallId), `${activeHallId} was evicted`);
      if (!plan.hallIds.includes(approachedHallId)) residencyAdmissionFailures.push(`${activeHallId} -> ${approachedHallId}: active=${estimateMuseumHallTextureResidency(activeHallId, 'active').totalMiB.toFixed(2)} MiB entry=${estimateMuseumHallTextureResidency(approachedHallId, 'entry-resident').totalMiB.toFixed(2)} MiB skipped=${plan.skippedForTextureBudget.join(',')}`);
      assert(plan.hallIds.length <= 3);
      assert(plan.decodedTextureBytes <= plan.decodedTextureBudgetBytes);
      peak = Math.max(peak, plan.decodedTextureBytes);
      for (const recentHallId of HALL_IDS) {
        if (recentHallId === activeHallId || recentHallId === approachedHallId) continue;
        const withRecent = resolveMuseumHallResidencyPlan({activeHallId, approachedHallId, recentHallId});
        if (!withRecent.hallIds.includes(activeHallId) || !withRecent.hallIds.includes(approachedHallId)) residencyAdmissionFailures.push(`${activeHallId} -> ${approachedHallId} with recent ${recentHallId}`);
        assert(withRecent.hallIds.length <= 3);
        assert(withRecent.decodedTextureBytes <= withRecent.decodedTextureBudgetBytes);
        peak = Math.max(peak, withRecent.decodedTextureBytes);
      }
    }
  }
  console.log(`  texture residency peak: ${(peak / 1024 / 1024).toFixed(2)} MiB / 96 MiB`);
});

check('all 59 live exhibits have substantial, sourced, route-aware interpretation', () => {
  assert.equal(MUSEUM_INTERPRETATIONS.length, 59);
  assert.equal(new Set(MUSEUM_INTERPRETATIONS.map(({hallId, id}) => `${hallId}/${id}`)).size, 59);
  assert.deepEqual(sorted(MUSEUM_INTERPRETATIONS.map(({hallId, id}) => `${hallId}/${id}`)), sorted(activeRefs));
  for (const interpretation of MUSEUM_INTERPRETATIONS) {
    const hall = hallById.get(interpretation.hallId);
    const exhibit = hall?.exhibits.find(({id}) => id === interpretation.id);
    assert(exhibit, `${interpretation.hallId}/${interpretation.id} is not live`);
    const minimumLead = ['anchor-exhibit', 'standard-individual-exhibit'].includes(interpretation.tier) ? 100 : 70;
    const minimumTotal = ['anchor-exhibit', 'standard-individual-exhibit'].includes(interpretation.tier) ? 220 : 150;
    if (wordCount(interpretation.lead) < minimumLead) interpretationQualityFailures.push(`${interpretation.id}: lead ${wordCount(interpretation.lead)} < ${minimumLead} words`);
    assert(wordCount(interpretation.centralQuestion) >= 5, `${interpretation.id} central question is too shallow`);
    if (interpretation.sections.length < 3) interpretationQualityFailures.push(`${interpretation.id}: ${interpretation.sections.length} < 3 sections`);
    const sectionWords = wordCount(interpretation.sections.flatMap(({paragraphs}) => paragraphs).join(' '));
    if (sectionWords < 80) interpretationQualityFailures.push(`${interpretation.id}: section body ${sectionWords} < 80 words`);
    const totalInterpretiveWords = wordCount(interpretation.lead) + sectionWords;
    if (totalInterpretiveWords < minimumTotal) interpretationQualityFailures.push(`${interpretation.id}: total interpretation ${totalInterpretiveWords} < ${minimumTotal} words`);
    if (interpretation.keyIdeas.length < 1) interpretationQualityFailures.push(`${interpretation.id}: no key ideas`);
    if (interpretation.keyWorks.length < 1) interpretationQualityFailures.push(`${interpretation.id}: no key works or traditions`);
    if (interpretation.sources.length < 3) interpretationQualityFailures.push(`${interpretation.id}: ${interpretation.sources.length} < 3 sources`);
    for (const sourceRecord of interpretation.sources) assert(/^https?:\/\//.test(sourceRecord.url), `${interpretation.id} has invalid source ${sourceRecord.url}`);
    assert.equal(interpretation.articleRoute.kind, exhibit.entityKind === 'philosopher' ? 'philosopher' : 'branch');
    const articleId = interpretation.articleRoute.philosopherId ?? interpretation.articleRoute.branchId;
    assert.equal(articleId, exhibit.entityId, `${interpretation.id} article route targets the wrong record`);
    for (const related of interpretation.relatedExhibits) assert(activeRefs.has(`${related.hallId}/${related.exhibitId}`), `${interpretation.id} links a non-live related exhibit`);
    for (const [assetId, text] of Object.entries(interpretation.objectInterpretations)) {
      assert(assetById.has(assetId), `${interpretation.id} interprets missing asset ${assetId}`);
      assert(wordCount(text) >= 12, `${interpretation.id}/${assetId} object interpretation is too shallow`);
    }
    for (const assetId of [exhibit.principalAssetId, ...(exhibit.supportingAssetIds ?? [])].filter(Boolean)) {
      assert(interpretation.objectInterpretations[assetId], `${interpretation.id} lacks interpretation for ${assetId}`);
    }
    for (const connection of interpretation.connections ?? []) {
      assert(connection.relationship.length >= 24, `${interpretation.id} has an unexplained connection`);
      if (connection.status === 'planned') assert.equal(connection.route, undefined, `${interpretation.id} links an unopened planned hall`);
    }
  }
  const krishnamurti = MUSEUM_INTERPRETATIONS.find(({id}) => id === 'jiddu-krishnamurti');
  assert(krishnamurti);
  assert.equal(krishnamurti.hallId, 'core-questions-forum');
  assert.equal(krishnamurti.roomId, 'core-mind-self');
  assert.equal(krishnamurti.tier, 'standard-individual-exhibit');
  assert(krishnamurti.connections.some(({kind, label}) => kind === 'room-comparison' && /Religion/i.test(label)));
  assert(krishnamurti.connections.some(({kind, status, label}) => kind === 'secondary-route' && status === 'planned' && /South Asia/i.test(label)));
  assert(krishnamurti.connections.some(({kind, label, relationship}) => kind === 'live-comparison' && /Nagel/i.test(label) && /not a claim of influence/i.test(relationship)));
  assert.deepEqual(Object.keys(krishnamurti.objectInterpretations).sort(), ['jiddu-krishnamurti-bain-portrait', 'jiddu-krishnamurti-besant-1927']);
});

check('sessions, walking pace, readiness, and travel contexts remain safe and hall-qualified', () => {
  assert.equal(MUSEUM_STANDARD_WALK_SPEED, 3.75);
  assert.equal(MUSEUM_FAST_WALK_SPEED, 6);
  assert.equal(resolveMuseumWalkingSpeed('standard'), 3.75);
  assert.equal(resolveMuseumWalkingSpeed('standard', true), 6);
  assert.equal(resolveMuseumWalkingSpeed('fast', true), 6);
  assert.deepEqual(createMuseumInputState(), {forward: 0, strafe: 0, walkingSpeed: 3.75, lookX: 0, lookY: 0});
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: false, metaKey: false}), false);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: true, metaKey: false}), true);
  assert.equal(resolveMuseumReadinessGateStatus('loading', false), 'loading');
  assert.equal(resolveMuseumReadinessGateStatus('failed', false), 'failed');
  assert.equal(resolveMuseumReadinessGateStatus('ready', true), undefined);
  assert.deepEqual(Object.keys(MUSEUM_READINESS_PRESENTATIONS), ['idle', 'loading', 'failed']);
  for (const definition of definitions) {
    const raw = JSON.stringify({version: 1, hallId: definition.id, ...definition.layout.spawn, lastNearbyExhibit: definition.layout.exhibits[0]?.id});
    assert(parseMuseumSession(raw, definition.layout), `${definition.id} valid session was rejected`);
    assert.equal(parseMuseumSession(raw.replace(definition.id, 'ancient-greek'), definition.layout), undefined, `${definition.id} accepted a retired hall session`);
    const travel = createMuseumHallTravelContext(definition.id);
    assert.deepEqual(parseMuseumHallTravelContext({philosophyAtlasMuseumTravel: travel}, definition.id), travel);
    const visit = createMuseumExhibitVisitContext(definition.id, 'direct');
    assert.deepEqual(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: visit}, definition.id), visit);
    for (const entrance of definition.entrances) {
      const gate = resolveMuseumReadinessGateGeometry(entrance);
      assert(gate.thresholdWidth < gate.clearWidth && gate.plaqueWidth < gate.clearWidth, `${definition.id}/${entrance.id} readiness furniture blocks the doorway`);
    }
  }
});

check('the React implementation uses one persistent Canvas, one shared canonical renderer, truthful compatibility, and retryable readiness', () => {
  const tsxSources = readdirSync(galleryRoot).filter((file) => extname(file) === '.tsx').map((file) => readFileSync(resolve(galleryRoot, file), 'utf8'));
  const canvasCount = tsxSources.reduce((sum, text) => sum + [...text.matchAll(/<Canvas\b/g)].length, 0);
  assert.equal(canvasCount, 1, 'MuseumGallery must contain exactly one React Three Fiber Canvas');
  assert.match(museumWorldSource, /Owns the one Museum Canvas/);
  assert.doesNotMatch(museumWorldSource, /key=\{(?:activeHallId|route\.hallId)\}/);
  assert.match(registrySource, /CanonicalMuseumHallScene/);
  assert.match(registrySource, /MUSEUM_CANONICAL_HALL_IDS\.map/);
  for (const legacyScene of ['AncientGreekHallScene', 'RenaissanceReasonRevolutionHallScene', 'ModernityFreedomCritiqueHallScene', 'LogicLanguageScienceHallScene', 'EthicsJusticePoliticalLifeHallScene', 'MindConsciousnessSelfHallScene']) {
    assert(!registrySource.includes(legacyScene), `runtime registry still imports ${legacyScene}`);
  }
  assert.match(canonicalSceneSource, /CanonicalMuseumExhibits/);
  assert.match(canonicalSceneSource, /ContemporaryHallArchitecture/);
  assert.match(canonicalExhibitsSource, /Text-first installations remain complete/);
  assert.match(canonicalExhibitsSource, /usePlaqueTexture/);
  assert.match(architectureSource, /museumTextureDimensionsForPlane/);
  assert.match(architectureSource, /<mesh position=\{\[0, 0, \.002\]\}><planeGeometry/);
  assert.match(visitorMapSource, /Permanent construction stage/);
  assert.match(visitorMapSource, /Fast travel uses the registered hall/);
  assert.match(visitorMapSource, /MUSEUM_VISITOR_MAP_RESERVATIONS/);
  assert.match(compatibilitySource, /is not currently installed/);
  assert.match(compatibilitySource, /underlying Atlas record, article, relationships, media, and source data have not been deleted/);
  assert.match(museumPageSource, /residentHallIds/);
  assert.match(museumPageSource, /retryHallContent/);
  assert.match(museumPageSource, /Retry gallery/);
  assert.match(museumPageSource, /MUSEUM_WORLD_REGISTRY\.filter/);
  assert.match(museumCssSource, /museum-visitor-map-reservations/);
});

assert.deepEqual(unsafeExhibitViewpoints, [], `unsafe exhibit viewpoints:\n${unsafeExhibitViewpoints.join('\n')}`);
assert.deepEqual(unsafeNavigationPoses, [], `unsafe navigation poses:\n${unsafeNavigationPoses.join('\n')}`);
assert.deepEqual(residencyAdmissionFailures, [], `approached-hall residency failures:\n${[...new Set(residencyAdmissionFailures)].join('\n')}`);
assert.deepEqual(interpretationQualityFailures, [], `interpretation quality failures:\n${interpretationQualityFailures.join('\n')}`);

console.log(`\nMuseum audit passed: ${checks} groups covering ${definitions.length} canonical halls, 29 rooms, 59 exhibits, ${MUSEUM_BUILDING_MANIFEST.connections.length} physical seams, ${MUSEUM_INTERPRETATIONS.length} interpretations, and 96 MiB bounded residency.`);
