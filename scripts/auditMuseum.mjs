import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {dirname, extname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const galleryRoot = resolve(repoRoot, 'src/components/MuseumGallery');
const museumDataRoot = resolve(repoRoot, 'src/data/museum');
const buildingManifest = JSON.parse(readFileSync(resolve(museumDataRoot, 'museumBuildingManifest.json'), 'utf8'));
const masterplanProgram = JSON.parse(readFileSync(resolve(repoRoot, 'docs/museum-masterplan/hall-program.json'), 'utf8'));
const source = (file) => readFileSync(resolve(repoRoot, file), 'utf8');
const registrySource = source('src/components/MuseumGallery/museumWorldRegistry.ts');
const museumPageSource = source('src/components/MuseumGallery/MuseumPage.tsx');
const museumWorldSource = source('src/components/MuseumGallery/MuseumWorldScene.tsx');
const museumControlsSource = source('src/components/MuseumGallery/useMuseumControls.ts');
const museumModalSource = source('src/components/MuseumGallery/MuseumModal.tsx');
const architectureSource = source('src/components/MuseumGallery/ContemporaryHallArchitecture.tsx');
const buildingArchitectureSource = source('src/components/MuseumGallery/MuseumBuildingArchitecture.tsx');
const canonicalSceneSource = source('src/components/MuseumGallery/CanonicalMuseumHallScene.tsx');
const canonicalExhibitsSource = source('src/components/MuseumGallery/CanonicalMuseumExhibits.tsx');
const mediterraneanMediaSource = source('src/components/MuseumGallery/MediterraneanExhibitMedia.tsx');
const mediterraneanCurationSource = source('src/components/MuseumGallery/MediterraneanGalleryCuration.tsx');
const platoSupplementalDataSource = source('src/data/museum/platoSupplementalExhibits.ts');
const platoSupplementalSceneSource = source('src/components/MuseumGallery/PlatoSupplementalExhibits.tsx');
const phenomenologySupplementalDataSource = source('src/data/museum/phenomenologySupplementalExhibits.ts');
const phenomenologySupplementalSceneSource = source('src/components/MuseumGallery/PhenomenologySupplementalExhibits.tsx');
const supplementalPanelSource = source('src/components/MuseumGallery/MuseumSupplementalInterpretationPanel.tsx');
const interpretationPanelSource = source('src/components/MuseumGallery/MuseumInterpretationPanel.tsx');
const globalSearchSource = source('src/components/Search/GlobalSearch.tsx');
const hashRouterSource = source('src/routing/hashRouter.ts');
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
      export * from '/src/data/museum/museumArchitectureMaterials.ts';
      export * from '/src/data/museum/mediterraneanGalleryCuration.ts';
      export * from '/src/data/museum/museumVisitorMap.ts';
      export * from '/src/data/museum/museumVisitorMapProjection.ts';
      export * from '/src/data/museum/museumAssets.ts';
      export * from '/src/data/museum/museumTextureBudget.ts';
      export * from '/src/data/museum/museumTexturePolicy.ts';
      export * from '/src/data/museum/museumInterpretations.ts';
      export * from '/src/data/museum/platoSupplementalExhibits.ts';
      export * from '/src/data/museum/museumSupplementalExhibits.ts';
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
let museum;
try {
  museum = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`);
} catch (error) {
  console.error(`Museum audit module initialization failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}

const {
  MUSEUM_ASSETS,
  MUSEUM_BUILDING_MANIFEST,
  MUSEUM_CANONICAL_WALL_MATERIAL,
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
  MEDITERRANEAN_EXHIBIT_CURATION,
  MEDITERRANEAN_GALLERY_ID,
  MEDITERRANEAN_ORIENTATION_DISPLAY,
  MEDITERRANEAN_ROOM_SIGN_COPY,
  MUSEUM_PLANNED_HALL_TITLES,
  MUSEUM_OWNER_APPROVED_WALL_MATERIAL_EXCEPTIONS,
  MUSEUM_PERSISTENT_TEXTURE_ESTIMATE,
  MUSEUM_READINESS_PRESENTATIONS,
  MUSEUM_RUNTIME_NODES,
  MUSEUM_STANDARD_WALK_SPEED,
  MUSEUM_SUPPLEMENTAL_EXHIBITS,
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
  PLATO_SUPPLEMENTAL_EXHIBITS,
  PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  advanceMuseumPhysicalFrame,
  branches,
  philosophers,
  circleIntersectsCollider,
  clampFrameDelta,
  createMuseumExhibitVisitContext,
  createMuseumHallTravelContext,
  createMuseumInputState,
  estimateMuseumHallTextureResidency,
  hasMuseumBrowserModifier,
  getMuseumGuidedStops,
  isValidMuseumPosition,
  moveWithCollisions,
  museumPointToWorld,
  museumPoseToWorld,
  parseMuseumExhibitVisitContext,
  parseMuseumHallTravelContext,
  parseMuseumSession,
  positionInsideSpatialUnion,
  resolveMuseumHallRenderedReadinessKeys,
  resolveMuseumHallResidencyPlan,
  resolveMuseumWallMaterial,
  resolveMuseumOrientationReset,
  resolveMuseumReadinessGateGeometry,
  resolveMuseumReadinessGateStatus,
  resolveMuseumVisitorMapDestination,
  resolveMuseumWalkingSpeed,
  sanitizeMuseumPose,
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
  'mediterranean-beginnings-classical': {rooms: 4, exhibits: 22, template: 'sequence-3'},
  'renaissance-humanism-new-method': {rooms: 3, exhibits: 5, template: 'sequence-3'},
  'phenomenology-existence-embodiment': {rooms: 5, exhibits: 9, template: 'sequence-3'},
  'analytic-traditions': {rooms: 5, exhibits: 7, template: 'sequence-3'},
  'justice-democratic-reason': {rooms: 3, exhibits: 5, template: 'sequence-3'},
  'core-questions-forum': {rooms: 9, exhibits: 15, template: 'crossroads-4'},
};
const EXPECTED_MAP_LABELS = {
  'mediterranean-beginnings-classical': 'Gallery 01 · Mediterranean Beginnings & Classical Athens',
  'renaissance-humanism-new-method': 'Gallery 02 · Renaissance, Political Order, and New Science',
  'phenomenology-existence-embodiment': 'Gallery 03 · Phenomenology, Existence, and Embodiment',
  'analytic-traditions': 'Gallery 04 · Analytic Traditions: Logic, Language, and Analysis',
  'justice-democratic-reason': 'Gallery 05 · Political Action, Justice, and Democratic Reason',
  'core-questions-forum': 'Forum · Core Questions Forum',
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
const seamCrossingFailures = [];
const residencyAdmissionFailures = [];
const interpretationQualityFailures = [];

let checks = 0;
let physicalMovementTrajectories = 0;
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
const independentDecodedTextureBytes = ({width, height, mipmaps}) => {
  let levelWidth = Math.max(1, Math.floor(width));
  let levelHeight = Math.max(1, Math.floor(height));
  let pixels = levelWidth * levelHeight;
  while (mipmaps && (levelWidth > 1 || levelHeight > 1)) {
    levelWidth = Math.max(1, Math.floor(levelWidth / 2));
    levelHeight = Math.max(1, Math.floor(levelHeight / 2));
    pixels += levelWidth * levelHeight;
  }
  return pixels * 4;
};
const independentTextureDimensionsForPlane = (planeWidth, planeHeight, reference) => {
  const pixelBudget = Math.floor(reference.width) * Math.floor(reference.height);
  const aspect = planeWidth / planeHeight;
  let width;
  let height;
  if (aspect >= 1) {
    height = Math.max(1, Math.floor(Math.sqrt(pixelBudget / aspect)));
    width = Math.max(1, Math.floor(height * aspect));
  } else {
    width = Math.max(1, Math.floor(Math.sqrt(pixelBudget * aspect)));
    height = Math.max(1, Math.floor(width / aspect));
  }
  return {width, height, mipmaps: reference.mipmaps};
};
const allColliders = (layout) => [...layout.wallColliders, ...layout.obstacleColliders];
const sampleSegment = (from, to, spacing, visit) => {
  const length = distance(from, to);
  const sampleCount = Math.max(1, Math.ceil(length / spacing));
  for (let index = 0; index <= sampleCount; index += 1) {
    const ratio = index / sampleCount;
    visit({
      x: from.x + (to.x - from.x) * ratio,
      z: from.z + (to.z - from.z) * ratio,
    });
  }
  return length;
};
const unionBounds = (bounds) => ({
  minX: Math.min(...bounds.map(({minX}) => minX)),
  maxX: Math.max(...bounds.map(({maxX}) => maxX)),
  minZ: Math.min(...bounds.map(({minZ}) => minZ)),
  maxZ: Math.max(...bounds.map(({maxZ}) => maxZ)),
});
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
const wallPlane = (node, wall) => {
  const {x, z, yaw} = node.worldTransform;
  const cosine = Math.cos(yaw);
  const sine = Math.sin(yaw);
  const centerX = x + cosine * wall.center.x + sine * wall.center.z;
  const centerZ = z - sine * wall.center.x + cosine * wall.center.z;
  const directionX = Math.cos(wall.rotation + yaw);
  const directionZ = -Math.sin(wall.rotation + yaw);
  const halfRun = wall.size.width / 2;
  const firstX = centerX - directionX * halfRun;
  const secondX = centerX + directionX * halfRun;
  const firstZ = centerZ - directionZ * halfRun;
  const secondZ = centerZ + directionZ * halfRun;
  const bottom = wall.bottom ?? 0;
  return Math.abs(directionX) >= Math.abs(directionZ)
    ? {axis: 'x', coordinate: centerZ, start: Math.min(firstX, secondX), end: Math.max(firstX, secondX), bottom, top: bottom + wall.height}
    : {axis: 'z', coordinate: centerX, start: Math.min(firstZ, secondZ), end: Math.max(firstZ, secondZ), bottom, top: bottom + wall.height};
};
const wallPlaneFullyCovers = (covering, candidate) => {
  const epsilon = .012;
  return covering.axis === candidate.axis
    && Math.abs(covering.coordinate - candidate.coordinate) <= epsilon
    && covering.start <= candidate.start + epsilon
    && covering.end >= candidate.end - epsilon
    && covering.bottom <= candidate.bottom + epsilon
    && covering.top >= candidate.top - epsilon;
};

check('the public catalog is exactly the canonical six-hall, 29-room, 63-exhibit program', () => {
  assert.deepEqual(MUSEUM_HALLS.map(({id}) => id), HALL_IDS);
  assert.equal(MUSEUM_HALLS.reduce((sum, hall) => sum + hall.zones.length, 0), 29);
  assert.equal(MUSEUM_HALLS.reduce((sum, hall) => sum + hall.exhibits.length, 0), 63);
  assert.deepEqual(MUSEUM_LIVE_PROGRAM_TOTALS.tierCounts, {
    'anchor-exhibit': 36,
    'standard-individual-exhibit': 23,
    'supporting-exhibit': 3,
    'thematic-cluster-participant': 0,
    'gallery-archive-or-study-wall-record': 1,
  });
  assert.equal(MUSEUM_LIVE_PROGRAM_TOTALS.recordCapacity, 80);
  assert.equal(MUSEUM_LIVE_PROGRAM_TOTALS.reserveCapacity, 17);
  for (const hall of MUSEUM_HALLS) {
    const expected = EXPECTED_COUNTS[hall.id];
    const runtimeNode = MUSEUM_RUNTIME_NODES.find(({publicHallId}) => publicHallId === hall.id);
    assert.equal(hall.zones.length, expected.rooms, `${hall.id} room count changed`);
    assert.equal(hall.exhibits.length, expected.exhibits, `${hall.id} exhibit count changed`);
    assert.equal(hall.templateId, expected.template, `${hall.id} template changed`);
    assert.deepEqual(hall.guidedOrder, hall.exhibits.map(({id}) => id), `${hall.id} guided order is stale`);
    assert.equal(runtimeNode?.mapLabel, EXPECTED_MAP_LABELS[hall.id], `${hall.id} map label drifted from its canonical title`);
  }
  assert.equal(philosophers.length, 146);
  assert.equal(branches.length, 43);
});

check('current halls and the Gallery 01–02 connector use the canonical wall material without coplanar render surfaces', () => {
  const currentExceptions = HALL_IDS.filter((hallId) => Object.hasOwn(MUSEUM_OWNER_APPROVED_WALL_MATERIAL_EXCEPTIONS, hallId));
  assert.deepEqual(currentExceptions, [], 'A current hall has an unapproved architectural wall exception');
  for (const hallId of HALL_IDS) {
    assert.deepEqual(resolveMuseumWallMaterial(hallId), MUSEUM_CANONICAL_WALL_MATERIAL, `${hallId} does not resolve the Gallery 01 wall standard`);
  }
  assert.match(architectureSource, /resolveMuseumWallMaterial\(definition\.id\)/, 'Canonical hall walls bypass the shared material resolver');
  assert.doesNotMatch(architectureSource, /RENAISSANCE_PALETTE\.plaster/, 'Gallery 02 still overrides the architectural wall color');
  assert.match(buildingArchitectureSource, /resolveMuseumWallMaterial\(\)/, 'Museum connectors bypass the shared wall standard');

  const connector = runtimeNodeById.get('corridor:outer-01-mediterranean-renaissance');
  const hallNodes = MUSEUM_RUNTIME_NODES.filter(({kind}) => kind === 'hall');
  assert(connector?.architectureWalls, 'The Gallery 01–02 connector has no rendered architecture');
  const coveredByHall = (wall) => {
    const candidate = wallPlane(connector, wall);
    return hallNodes.some((hallNode) => (hallNode.architectureWalls ?? hallNode.layout.wallColliders)
      .some((hallWall) => wallPlaneFullyCovers(wallPlane(hallNode, hallWall), candidate)));
  };
  assert(connector.architectureWalls.every((wall) => !coveredByHall(wall)), 'The Gallery 01–02 connector still renders a hall-covered wall plane');
  const renderedWallIds = new Set(connector.architectureWalls.map(({id}) => id));
  const collisionOnlySeamWalls = connector.layout.wallColliders.filter(({id}) => !renderedWallIds.has(id));
  assert(collisionOnlySeamWalls.length > 0, 'The Gallery 01–02 seam removed no duplicate rendered surfaces');
  assert(collisionOnlySeamWalls.every(coveredByHall), 'The connector removed a rendered wall that is not fully covered by a hall shell');
});

check('Gallery 01 has bounded authored curation, visitor-facing orientation, and a clear first connector', () => {
  const hall = hallById.get(MEDITERRANEAN_GALLERY_ID);
  const definition = definitionById.get(MEDITERRANEAN_GALLERY_ID);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === MEDITERRANEAN_GALLERY_ID);
  assert(hall && definition && program);

  const curationEntries = Object.entries(MEDITERRANEAN_EXHIBIT_CURATION);
  const exhibitLayoutById = new Map(definition.layout.exhibits.map((layout) => [layout.id, layout]));
  assert.equal(curationEntries.length, 22, 'Gallery 01 must retain exactly 22 authored curation entries');
  assert.deepEqual(sorted(curationEntries.map(([id]) => id)), sorted(hall.exhibits.map(({id}) => id)), 'Gallery 01 curation ids differ from its public exhibits');
  assert.deepEqual(sorted(Object.keys(MEDITERRANEAN_ROOM_SIGN_COPY)), sorted(program.rooms.map(({id}) => id)), 'Gallery 01 visitor sign copy differs from its four rooms');
  for (const [id, curation] of curationEntries) {
    const layout = exhibitLayoutById.get(id);
    assert(layout, `${id} has no physical Gallery 01 exhibit layout`);
    assert([curation.authored.x, curation.authored.z, curation.authored.rotationY].every(Number.isFinite), `${id} has an invalid authored placement`);
    assert(curation.publicKicker.trim().length >= 12, `${id} lacks visitor-facing context`);
    assert(curation.groupLabel.trim().length >= 8 && curation.visualKind.trim(), `${id} lacks an interpretive visual grouping`);
    assert(layout.scene.mediaMounts.length > 0, `${id} has no provenance-backed physical image`);
    assert(!('generatedMedia' in curation), `${id} still substitutes a generated diagram for sourced media`);
  }
  assert.equal(definition.layout.exhibits.filter(({scene}) => scene.mediaMounts.length > 0).length, 22, 'Every Gallery 01 exhibit must retain provenance-backed scene media');
  assert.equal(definition.layout.exhibits.reduce((sum, {scene}) => sum + scene.mediaMounts.length, 0), 25, 'Gallery 01 media-placement count changed');
  assert.equal(curationEntries.filter(([, curation]) => curation.frontTitle).length, 6, 'Gallery 01 question-first hierarchy changed');
  assert.deepEqual(MEDITERRANEAN_EXHIBIT_CURATION.anaxagoras.authored, {x: -5.8, z: -1.15, rotationY: Math.PI}, 'Anaxagoras returned to the crowded side-wall sightline');

  const kiosk = definition.layout.furnishings.find(({id}) => id === MUSEUM_VISITOR_MAP_KIOSK.id);
  const orientation = definition.layout.furnishings.find(({id}) => id === MEDITERRANEAN_ORIENTATION_DISPLAY.id);
  assert.deepEqual(kiosk, MUSEUM_VISITOR_MAP_KIOSK, 'Gallery 01 map kiosk is absent or stale');
  assert.deepEqual(orientation, MEDITERRANEAN_ORIENTATION_DISPLAY, 'Gallery 01 orientation display is absent or stale');
  assert(definition.layout.obstacleColliders.some(({id}) => id === kiosk.id), 'Gallery 01 map kiosk is absent from collision');
  assert(definition.layout.obstacleColliders.some(({id}) => id === orientation.id), 'Gallery 01 orientation display is absent from collision');
  assert(validPose(definition, MUSEUM_VISITOR_MAP_KIOSK.approachPose), 'Gallery 01 map approach is unsafe');
  assert.deepEqual(definition.layout.spawnFocalPoint, MUSEUM_VISITOR_MAP_KIOSK.center, 'Gallery 01 spawn does not focus the visitor map');
  const focalDistance = distance(definition.layout.spawn, definition.layout.spawnFocalPoint);
  const spawnForward = {x: -Math.sin(definition.layout.spawn.yaw), z: -Math.cos(definition.layout.spawn.yaw)};
  const focalDirection = {
    x: (definition.layout.spawnFocalPoint.x - definition.layout.spawn.x) / focalDistance,
    z: (definition.layout.spawnFocalPoint.z - definition.layout.spawn.z) / focalDistance,
  };
  assert(spawnForward.x * focalDirection.x + spawnForward.z * focalDirection.z > .95, 'Gallery 01 spawn does not face its map focal point');

  const forbiddenPublicLabels = /anchor[-\s]+exhibit|standard[-\s]+individual[-\s]+exhibit|supporting[-\s]+exhibit|thematic[-\s]+cluster[-\s]+participant|gallery[-\s]+archive[-\s]+or[-\s]+study[-\s]+wall[-\s]+record|(?:anchor|standard)[-\s]+bay|(?:supporting|cluster)[-\s]+panel|archive[-\s]+label|presentation\s+tier|gallery\s+installation/i;
  assert.doesNotMatch(canonicalExhibitsSource, /kicker:\s*[^\n]*(?:presentationTier|treatment)/u, 'Public exhibit name strips expose internal tier or treatment fields');
  assert.doesNotMatch(museumPageSource, /item\.tier\.replaceAll/u, 'The public directory exposes internal exhibit tiers');
  assert.doesNotMatch(interpretationPanelSource, /content\.tier\.replaceAll/u, 'The interpretation panel exposes internal exhibit tiers');
  for (const interpretation of MUSEUM_INTERPRETATIONS) assert.doesNotMatch(interpretation.lead, forbiddenPublicLabels, `${interpretation.hallId}/${interpretation.id} lead exposes internal presentation language`);
  assert.match(canonicalSceneSource, /<MediterraneanGalleryCuration\/>/u, 'Gallery 01 does not render its authored orientation display');
  assert.doesNotMatch(canonicalExhibitsSource, /MediterraneanExhibitMedia/u, 'Gallery 01 still renders diagram substitutes');
  assert.match(canonicalExhibitsSource, /<MediterraneanFinishedBack/u, 'Gallery 01 exhibit backs are unfinished');
  assert.match(canonicalExhibitsSource, /theme:\s*'mediterranean'/u, 'Gallery 01 interpretation faces do not opt into their curatorial palette');
  assert.doesNotMatch(canonicalExhibitsSource, /MediterraneanExhibitObject/u, 'Gallery 01 still renders the generic object template');
  assert.doesNotMatch(mediterraneanMediaSource, /torus(?:Knot)?Geometry|sphereGeometry/u, 'Gallery 01 media reintroduces unsupported floating sculpture geometry');
  assert.match(mediterraneanCurationSource, /createFrontTexture/u, 'Gallery 01 opening installation has no front-side story');
  assert.doesNotMatch(mediterraneanCurationSource, /createBackTexture/u, 'Gallery 01 opening installation restored unwanted reverse-side content');
  assert.equal([...mediterraneanCurationSource.matchAll(/<MuseumSceneMedia\b/gu)].length, 1, 'Gallery 01 opening installation must retain one local gallery-level image mount');
  assert.doesNotMatch(
    architectureSource,
    /MediterraneanSignRear|Continue through Gallery 01|Return to the Museum Ring/u,
    'Gallery 01 sign backs regressed to full-wall route slogans',
  );
  assert.equal(definition.layout.signs.length, 4, 'Gallery 01 must retain its entrance sign and the three approved physical room signs');
  const entranceSign = definition.layout.signs.find(({kind}) => kind === 'entrance');
  assert(entranceSign && entranceSign.width === 3.4 && entranceSign.height === .7, 'Gallery 01 entrance sign returned to its oversized treatment');
  assert(!definition.layout.signs.some(({id}) => id === 'med-sophists-socratic:room-sign'), 'The removed Room 03 physical sign returned');
  assert.equal(definition.layout.signs.find(({id}) => id === 'med-being-change-plurality:room-sign')?.position.z, -14.22, 'Room 02 sign is not mounted on its Room 01 approach face');
  assert.equal(definition.layout.signs.find(({id}) => id === 'med-plato-aristotle:room-sign')?.position.z, 13.78, 'Room 04 sign is not mounted on its Room 03 approach face');
  const gallery01NaturalApproachZ = [-27.2, -13.2, .8, 14.8];
  for (const [index, view] of definition.layout.entryViews.entries()) {
    const cell = definition.layout.spatialCells.find(({id}) => id === view.spatialCellId);
    assert(cell, `Gallery 01 entry view ${view.spatialCellId} has no room`);
    assert(Math.abs(view.pose.x) < .001, `${view.spatialCellId} no longer stages the central chronological route`);
    assert(Math.abs(view.pose.z - gallery01NaturalApproachZ[index]) < .001, `${view.spatialCellId} no longer stages its natural threshold approach`);
    assert(Math.abs(view.pose.yaw - Math.PI) < .001, `${view.spatialCellId} no longer faces along the authored Gallery 01 route`);
  }
  for (const sign of definition.layout.signs) {
    assert.doesNotMatch(`${sign.kicker} ${sign.title} ${sign.subtitle}`, forbiddenPublicLabels, `${sign.id} exposes internal presentation language`);
    const front = {x: Math.sin(sign.rotationY), z: Math.cos(sign.rotationY)};
    const approach = {
      x: sign.position.x,
      z: sign.position.z + (sign.id === 'med-orientation-nature:room-sign' ? 2 : -2),
    };
    assert(front.x * (approach.x - sign.position.x) + front.z * (approach.z - sign.position.z) > 0, `${sign.id} does not face the forward visitor approach`);
  }

  const connector = runtimeNodeById.get('corridor:outer-01-mediterranean-renaissance');
  assert(connector, 'The Galleries 01–02 connector is missing');
  const connectorCellIds = ['outer-01-gallery-entry', 'outer-01-east-run', 'outer-01-central-link', 'outer-01-west-run', 'outer-01-turn'];
  assert.deepEqual(connector.layout.spatialCells.map(({id}) => id), connectorCellIds.map((id) => `${connector.id}:${id}`), 'The Galleries 01–02 connector cell sequence drifted');
  const cellsShareEdge = (first, second) => {
    const xOverlap = Math.min(first.maxX, second.maxX) - Math.max(first.minX, second.minX);
    const zOverlap = Math.min(first.maxZ, second.maxZ) - Math.max(first.minZ, second.minZ);
    return (Math.abs(first.maxX - second.minX) < .001 || Math.abs(second.maxX - first.minX) < .001) && zOverlap > 0
      || (Math.abs(first.maxZ - second.minZ) < .001 || Math.abs(second.maxZ - first.minZ) < .001) && xOverlap > 0;
  };
  for (let index = 1; index < connector.layout.spatialCells.length; index += 1) {
    assert(cellsShareEdge(connector.layout.spatialCells[index - 1].bounds, connector.layout.spatialCells[index].bounds), `${connectorCellIds[index - 1]} does not meet ${connectorCellIds[index]}`);
  }
  for (let first = 0; first < connector.layout.spatialCells.length; first += 1) {
    for (let second = first + 1; second < connector.layout.spatialCells.length; second += 1) {
      const a = connector.layout.spatialCells[first].bounds;
      const b = connector.layout.spatialCells[second].bounds;
      const overlapWidth = Math.min(a.maxX, b.maxX) - Math.max(a.minX, b.minX);
      const overlapDepth = Math.min(a.maxZ, b.maxZ) - Math.max(a.minZ, b.minZ);
      assert(overlapWidth <= 0 || overlapDepth <= 0, `${connectorCellIds[first]} overlaps ${connectorCellIds[second]}`);
    }
  }
  sampleSegment({x: 0, z: 58}, {x: -28, z: 56}, .05, (point) => {
    assert(positionInsideSpatialUnion(point, connector.layout.playerRadius, connector.layout.spatialCells), `The Galleries 01–02 seam path leaves the connector near ${JSON.stringify(point)}`);
    assert(isValidMuseumPosition(point, connector.layout.playerRadius, connector.layout.bounds, allColliders(connector.layout), connector.layout.spatialCells), `The Galleries 01–02 seam path collides near ${JSON.stringify(point)}`);
  });
});

check('Plato’s Cave and Republic form a substantial supplemental U without changing the 63-primary program', () => {
  const definition = definitionById.get(MEDITERRANEAN_GALLERY_ID);
  const hall = hallById.get(MEDITERRANEAN_GALLERY_ID);
  assert(definition && hall);
  const supplemental = definition.layout.supplementalExhibits ?? [];
  const stableIds = ['plato-cave-book-vii', 'plato-republic'];
  assert.equal(supplemental.length, 2, 'Gallery 01 must have exactly two supplemental Plato work exhibits');
  assert.deepEqual(sorted(supplemental.map(({id}) => id)), stableIds);
  assert.deepEqual(supplemental, PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS);
  assert.deepEqual(sorted(PLATO_SUPPLEMENTAL_EXHIBITS.map(({id}) => id)), stableIds);
  assert.equal(new Set(supplemental.map(({assetId}) => assetId)).size, 2, 'The Plato works need distinct media');
  assert(!hall.exhibits.some(({id}) => stableIds.includes(id)), 'A supplemental Plato work entered the public primary catalog');
  assert(!definition.layout.guidedOrder.some((id) => stableIds.includes(id)), 'A supplemental Plato work entered the canonical guided order');
  assert(!MUSEUM_INTERPRETATIONS.some(({id}) => stableIds.includes(id)), 'A supplemental Plato work entered the 63-primary interpretation registry');

  assert.deepEqual(MEDITERRANEAN_EXHIBIT_CURATION.platonism.authored, {x: -10.85, z: 18, rotationY: Math.PI / 2}, 'The principal Platonism wall moved');
  assert.deepEqual(MEDITERRANEAN_EXHIBIT_CURATION.plato.authored, {x: -10.85, z: 24, rotationY: Math.PI / 2}, 'The principal Plato wall moved');
  assert.deepEqual(MEDITERRANEAN_EXHIBIT_CURATION.aristotelianism.authored, {x: 10.85, z: 18, rotationY: -Math.PI / 2}, 'The Aristotle half-room moved');
  assert.deepEqual(MEDITERRANEAN_EXHIBIT_CURATION.aristotle.authored, {x: 10.85, z: 24, rotationY: -Math.PI / 2}, 'The Aristotle half-room moved');

  const byId = new Map(supplemental.map((layout) => [layout.id, layout]));
  const republic = byId.get('plato-republic');
  const cave = byId.get('plato-cave-book-vii');
  assert(republic && cave);
  approx(republic.position.x, -6.45, 'Republic side-wall x');
  approx(cave.position.x, -6.45, 'Cave side-wall x');
  assert(republic.position.z < 16 && cave.position.z > 26, 'The two work exhibits no longer bracket the Plato wall');
  approx(republic.rotationY, 0, 'Republic inward-facing rotation');
  approx(cave.rotationY, Math.PI, 'Cave inward-facing rotation');
  assert(distance(republic.position, cave.position) > 11, 'The opposing work exhibits collapsed into one wall');
  for (const layout of supplemental) {
    assert.equal(layout.parentExhibitId, 'plato', `${layout.id} lost its supplemental Plato parent`);
    assert.equal(layout.zoneId, 'med-plato-aristotle', `${layout.id} left Room 04`);
    assert.equal(layout.spatialCellId, 'med-plato-aristotle', `${layout.id} left the Room 04 spatial cell`);
    assert(layout.position.x + layout.footprint.width / 2 < -4, `${layout.id} intrudes into the central circulation/sightline`);
    assert(layout.footprint.width >= 4.7 && layout.footprint.height >= 4.5, `${layout.id} is not visually substantial`);
    assert(layout.mediaMount.width >= 2 && layout.mediaMount.height >= 2.8, `${layout.id} media is too slight`);
    assert.equal(layout.mediaMount.assetId, layout.assetId, `${layout.id} media and prefetch assets differ`);
    assert(assetById.has(layout.assetId), `${layout.id} mounts missing asset ${layout.assetId}`);
    assert(definition.layout.obstacleColliders.some(({id}) => id === layout.collider.id), `${layout.id} is absent from collision`);
    assert(validPose(definition, layout.viewpoint), `${layout.id} has an unsafe viewing pose`);
  }

  for (const exhibit of PLATO_SUPPLEMENTAL_EXHIBITS) {
    assert.equal(exhibit.articleRoute.kind, 'philosopher');
    assert.equal(exhibit.articleRoute.philosopherId, 'plato');
    assert.match(exhibit.dateLabel, /uncertain/i, `${exhibit.id} overstates its composition date`);
    assert(exhibit.keyIdeas.length >= 5, `${exhibit.id} lacks a usable argument map`);
    assert(exhibit.cautions.length >= 3, `${exhibit.id} lacks historical or interpretive caveats`);
    assert(exhibit.sections.length >= 3, `${exhibit.id} interpretation is too shallow`);
    assert(wordCount(`${exhibit.lead} ${exhibit.sections.flatMap(({paragraphs}) => paragraphs).join(' ')}`) >= 150, `${exhibit.id} interpretation is too brief`);
    assert(exhibit.sources.some(({kind}) => kind === 'primary-text'), `${exhibit.id} lacks a primary-text link`);
    assert(exhibit.sources.some(({kind}) => kind === 'academic-reference'), `${exhibit.id} lacks an academic reference`);
  }
  assert.match(PLATO_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === 'plato-cave-book-vii').lead, /not merely saying that ordinary reality is an illusion/i);
  assert.match(PLATO_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === 'plato-republic').cautions.join(' '), /hierarchy|censorship|concentrated power|coercive/i);
  assert.match(platoSupplementalDataSource, /outside the canonical program so the Museum retains 63 truthful primaries/u);
  assert.match(canonicalSceneSource, /<PlatoSupplementalExhibits/u, 'Gallery 01 does not mount the two work exhibits');
  assert.match(platoSupplementalSceneSource, /onClick=\{activate\}/u, 'The supplemental installations lack normal mouse activation');
  assert.match(platoSupplementalSceneSource, /interactionForSupplemental/u, 'The supplemental installations lack stable interaction identity');
  assert.match(museumPageSource, /Press E or Enter to open the supplemental exhibit/u, 'The shared keyboard interaction does not announce the supplemental exhibits');
  assert.match(museumPageSource, /onSelectSupplementalExhibit=/u, 'Mouse selection is not routed into the supplemental panel');
  assert.match(supplementalPanelSource, /Open Plato’s full Atlas article/u, 'The supplemental panel lacks its full Plato article route');
  assert.match(supplementalPanelSource, /MuseumSourceDetails/u, 'The supplemental panel does not expose media provenance');
  assert.match(supplementalPanelSource, /event\.key === 'Escape'/u, 'The supplemental panel lacks its keyboard close path');
});

check('all thirty-four supplemental exhibits share route, directory, search, guided, and fallback contracts', () => {
  assert.equal(MUSEUM_SUPPLEMENTAL_EXHIBITS.length, 34);
  assert.equal(
    new Set(MUSEUM_SUPPLEMENTAL_EXHIBITS.map(({exhibit}) => exhibit.id)).size,
    MUSEUM_SUPPLEMENTAL_EXHIBITS.length,
    'Supplemental exhibit ids must remain globally unique',
  );

  for (const {hallId, exhibit, layout} of MUSEUM_SUPPLEMENTAL_EXHIBITS) {
    const hall = hallById.get(hallId);
    const definition = definitionById.get(hallId);
    assert(hall && definition, `${exhibit.id} points to an unknown live hall`);
    assert(hall.exhibits.some(({id}) => id === layout.parentExhibitId), `${exhibit.id} has no primary parent`);
    assert(hall.zones.some(({id}) => id === layout.zoneId), `${exhibit.id} has no live room`);
    assert(definition.layout.supplementalExhibits?.some(({id}) => id === exhibit.id), `${exhibit.id} is absent from its hall layout`);
    assert(!hall.exhibits.some(({id}) => id === exhibit.id), `${exhibit.id} collides with a primary exhibit id`);
    assert(exhibit.keyIdeas.length >= 3, `${exhibit.id} lacks a usable idea map`);
    assert(exhibit.cautions.length >= 2, `${exhibit.id} lacks interpretive cautions`);
    assert(exhibit.sections.length >= 3, `${exhibit.id} interpretation is too shallow`);
    assert(exhibit.sources.length >= 2, `${exhibit.id} lacks a useful source layer`);
    assert(
      wordCount(`${exhibit.lead} ${exhibit.sections.flatMap(({paragraphs}) => paragraphs).join(' ')}`) >= 120,
      `${exhibit.id} interpretation is too brief`,
    );
  }

  for (const hall of MUSEUM_HALLS) {
    const supplemental = MUSEUM_SUPPLEMENTAL_EXHIBITS.filter(({hallId}) => hallId === hall.id);
    const guided = getMuseumGuidedStops(hall.id, hall.guidedOrder);
    assert.equal(guided.length, hall.guidedOrder.length + supplemental.length, `${hall.id} guided stop count is stale`);
    for (const {exhibit, layout} of supplemental) {
      const primaryIndex = guided.findIndex(({kind, exhibitId}) =>
        kind === 'primary' && exhibitId === layout.parentExhibitId);
      const supplementalIndex = guided.findIndex(({kind, exhibitId}) =>
        kind === 'supplemental' && exhibitId === exhibit.id);
      assert(primaryIndex >= 0 && supplementalIndex > primaryIndex, `${exhibit.id} is not guided after its parent`);
    }
  }

  assert.match(hashRouterSource, /isMuseumSupplementalExhibitId/u, 'Supplemental ids are not accepted by the Museum route guard');
  assert.match(museumPageSource, /getMuseumSupplementalExhibitsForHall/u, 'The directory/fallback does not enumerate supplemental exhibits');
  assert.match(museumPageSource, /getMuseumGuidedStops/u, 'Guided mode does not include supplemental exhibits');
  assert.match(globalSearchSource, /MUSEUM_SUPPLEMENTAL_EXHIBITS/u, 'Global search does not index supplemental exhibits');
  assert.match(supplementalPanelSource, /onClose\('history'\)/u, 'Supplemental Escape behavior does not use history-aware closing');
  assert.match(supplementalPanelSource, /museum-guided-controls/u, 'Supplemental panels lack guided navigation');
});

check('Gallery 03 gives every unobstructed half-room wall one substantial exhibit', () => {
  const hallId = 'phenomenology-existence-embodiment';
  const hall = hallById.get(hallId);
  const definition = definitionById.get(hallId);
  assert(hall && definition);
  const supplemental = MUSEUM_SUPPLEMENTAL_EXHIBITS.filter((entry) => entry.hallId === hallId);
  assert.equal(hall.exhibits.length, 9, 'Gallery 03 primary catalog changed');
  assert.equal(supplemental.length, 19, 'Gallery 03 must have nineteen bounded supplemental stops');
  assert.equal(definition.layout.supplementalExhibits?.length, 19, 'Gallery 03 scene layout is missing supplemental stops');

  const expectedPrimaryCounts = new Map([
    ['phenomenology-method', 2],
    ['phenomenology-being-embodiment', 2],
    ['existentialism-freedom', 2],
    ['existentialism-situated-absurd', 1],
    ['phenomenology-interpretation-alterity', 2],
  ]);
  const expectedSupplementalCounts = new Map([
    ['phenomenology-method', 4],
    ['phenomenology-being-embodiment', 4],
    ['existentialism-freedom', 2],
    ['existentialism-situated-absurd', 5],
    ['phenomenology-interpretation-alterity', 4],
  ]);
  const expectedWallSlots = new Map([
    ['phenomenology-method', ['north-west', 'outer-west', 'south-west', 'north-east', 'outer-east', 'south-east']],
    ['phenomenology-being-embodiment', ['north-west', 'outer-west', 'south-west', 'north-east', 'outer-east', 'south-east']],
    ['existentialism-freedom', ['north-west', 'south-west', 'north-east', 'south-east']],
    ['existentialism-situated-absurd', ['north-west', 'outer-west', 'south-west', 'north-east', 'outer-east', 'south-east']],
    ['phenomenology-interpretation-alterity', ['north-west', 'outer-west', 'south-west', 'north-east', 'outer-east', 'south-east']],
  ]);
  const wallSlotFor = (layout) => {
    const side = layout.position.x < 0 ? 'west' : 'east';
    const sine = Math.sin(layout.rotationY);
    if (Math.abs(sine) > .5) return sine > 0 ? 'outer-west' : 'outer-east';
    return `${Math.cos(layout.rotationY) > 0 ? 'north' : 'south'}-${side}`;
  };
  for (const zone of hall.zones) {
    const primaryCount = hall.exhibits.filter(({zoneId}) => zoneId === zone.id).length;
    const roomSupplemental = supplemental.filter(({layout}) => layout.zoneId === zone.id);
    const supplementalCount = roomSupplemental.length;
    assert.equal(primaryCount, expectedPrimaryCounts.get(zone.id), `${zone.id} primary count changed`);
    assert.equal(supplementalCount, expectedSupplementalCounts.get(zone.id), `${zone.id} supplemental count is stale`);
    assert.equal(
      primaryCount + supplementalCount,
      expectedWallSlots.get(zone.id)?.length,
      `${zone.id} interpreted-stop count is stale`,
    );
    const roomLayouts = [
      ...definition.layout.exhibits.filter(({spatialCellId}) => spatialCellId === zone.id),
      ...roomSupplemental.map(({layout}) => layout),
    ];
    const occupiedSlots = roomLayouts.map(wallSlotFor);
    assert.equal(
      new Set(occupiedSlots).size,
      roomLayouts.length,
      `${zone.id} places more than one exhibit on a wall face`,
    );
    assert.deepEqual(
      [...new Set(occupiedSlots)].sort(),
      [...(expectedWallSlots.get(zone.id) ?? [])].sort(),
      `${zone.id} leaves a usable wall face blank or occupies a portal wall`,
    );
  }

  const beauvoir = supplemental.find(({exhibit}) => exhibit.id === 'beauvoir-ethics-ambiguity');
  assert(beauvoir, 'Gallery 03 lost Beauvoir’s anchor-strength secondary');
  assert.equal(beauvoir.layout.zoneId, 'existentialism-situated-absurd');
  assert.deepEqual(beauvoir.exhibit.articleRoute, {kind: 'philosopher', philosopherId: 'beauvoir'});
  assert.match(beauvoir.exhibit.presentation?.panelKicker ?? '', /anchor secondary/i);
  assert.match(beauvoir.exhibit.presentation?.factRows.map(({value}) => value).join(' ') ?? '', /Feminist Philosophies remains primary/i);
  assert.match(beauvoir.exhibit.lead, /not as an appendix to Sartre/i);

  for (const {exhibit, layout} of supplemental) {
    assert(assetById.has(exhibit.assetId), `${exhibit.id} uses missing scene asset ${exhibit.assetId}`);
    assert(assetById.has(exhibit.panelAssetId), `${exhibit.id} uses missing panel asset ${exhibit.panelAssetId}`);
    assert.equal(layout.assetId, exhibit.assetId, `${exhibit.id} scene and interpretation assets diverge`);
    assert.equal(layout.mediaMount.assetId, layout.assetId, `${exhibit.id} prefetch and media assets diverge`);
    assert(definition.layout.obstacleColliders.some(({id}) => id === layout.collider.id), `${exhibit.id} is absent from collision`);
    assert(validPose(definition, layout.viewpoint), `${exhibit.id} has an unsafe viewing pose`);
    assert(layout.footprint.width >= 4.3 && layout.footprint.height >= 4.4, `${exhibit.id} is visually slight`);
    assert(layout.mediaMount.width >= 2.1 && layout.mediaMount.height >= 2.2, `${exhibit.id} media is too small to read`);
  }

  const levinas = supplemental.find(({exhibit}) => exhibit.id === 'levinas-ethics-before-ontology')?.exhibit;
  const gadamer = supplemental.find(({exhibit}) => exhibit.id === 'gadamer-truth-method')?.exhibit;
  assert.equal(levinas?.assetId, 'levinas-totality-infinity-2002');
  assert.match(`${levinas?.lead} ${levinas?.cautions.join(' ')}`, /German study edition|1961 French first edition/i);
  assert.equal(gadamer?.assetId, 'gadamer-letter-pawliszyn');
  assert.match(`${gadamer?.lead} ${gadamer?.cautions.join(' ')}`, /signed 1989 letter|scholarly correspondence/i);
  assert.match(canonicalSceneSource, /<PhenomenologySupplementalExhibits/u, 'Gallery 03 does not mount its shared supplemental collection');
  assert.match(phenomenologySupplementalSceneSource, /onClick=\{activate\}/u, 'Gallery 03 supplemental installations lack mouse activation');
  assert.match(phenomenologySupplementalSceneSource, /interactionForSupplemental/u, 'Gallery 03 supplemental installations lack stable interaction identity');
  assert.match(phenomenologySupplementalDataSource, /Room 01 · Attend[\s\S]*Room 05 · Answer/u, 'Gallery 03 room sequence copy is incomplete');
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
  const plannedTemplateById = new Map(masterplanProgram.templates.map((template) => [template.id, template]));
  assert.deepEqual(MUSEUM_HALL_TEMPLATE_REGISTRY.map(({id}) => id), ['standard-rect', 'sequence-3', 'crossroads-4', 'focal-terminal']);
  assert.deepEqual(MUSEUM_HALL_TEMPLATE_REGISTRY.map(({id}) => id), masterplanProgram.templates.map(({id}) => id), 'runtime and approved planning template registries differ');
  for (const template of MUSEUM_HALL_TEMPLATE_REGISTRY) {
    const planned = plannedTemplateById.get(template.id);
    assert(planned, `${template.id} is absent from the approved masterplan`);
    assert.equal(template.title, planned.title, `${template.id} title differs from the approved masterplan`);
    assert.deepEqual(template.footprintMetres, planned.footprintMetres, `${template.id} footprint differs from the approved masterplan`);
    assert.deepEqual(template.roomRange, planned.roomRange, `${template.id} room range differs from the approved masterplan`);
    assert.deepEqual(template.portalSlots.map(({id}) => id), planned.portalSlots, `${template.id} portal slots differ from the approved masterplan`);
    assert.deepEqual(template.portalSlots.filter(({optional}) => optional).map(({id}) => id), planned.optionalPortalSlots, `${template.id} optional portal slots differ from the approved masterplan`);
    assert.equal(template.wallThicknessMetres, planned.wallThicknessMetres, `${template.id} wall thickness differs from the approved masterplan`);
    assert.equal(template.ceilingHeightMetres, planned.ceilingHeightMetres, `${template.id} ceiling height differs from the approved masterplan`);
    assert.deepEqual(template.publicPortal, planned.publicPortal, `${template.id} public portal differs from the approved masterplan`);
    assert.deepEqual(template.safeArrivalLanding, {width: 4, depth: 4, poseOffsetFromPortal: 2});
    assert.deepEqual(template.lightingInterface, ['ambient', 'threshold', 'perimeter-track', 'anchor-track', 'accessible-label-light']);
    assert.deepEqual(template.collisionPolicy, {
      openingAuthority: 'live-connection-endpoints',
      inactiveSlotClosure: 'full-height-collision-wall',
      activeSlotLintel: 'render-only-above-clear-height',
    });
    assert.deepEqual(template.mapPolicy, {canonicalShape: 'footprint-rectangle', legacyAdapterShape: 'spatial-cell-union'});
    assert.deepEqual(template.exhibitSlotPolicy, {standardBayWidth: 3, anchorBayWidth: 4.5, clearViewingFloor: {width: .9, depth: 1.4}});
    assert.equal(template.availability, template.id === 'focal-terminal' ? 'rare-special-case' : 'normal-active');
  }
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
    const removedPhysicalRoomSigns = [
      MEDITERRANEAN_GALLERY_ID,
      'renaissance-humanism-new-method',
      'phenomenology-existence-embodiment',
    ].includes(definition.id) ? 1 : 0;
    assert.equal(definition.layout.signs.length, hall.zones.length + 1 + comparativeLensCount - removedPhysicalRoomSigns);
    assert(validPose(definition, definition.layout.spawn), `${definition.id} spawn is unsafe`);
    assert(validPose(definition, definition.layout.reset), `${definition.id} reset is unsafe`);
    const expectedWidth = expected.template === 'crossroads-4' ? 28 : 24;
    const expectedDepth = expected.template === 'crossroads-4' ? 28 : 56;
    const renderBounds = definition.resolvedTemplate.resolvedFootprint.bounds;
    const mapBounds = unionBounds(definition.resolvedTemplate.mapCells.map(({bounds}) => bounds));
    approx(renderBounds.maxX - renderBounds.minX, expectedWidth, `${definition.id} rendered width`);
    approx(renderBounds.maxZ - renderBounds.minZ, expectedDepth, `${definition.id} rendered depth`);
    assert.deepEqual(mapBounds, renderBounds, `${definition.id} map cells differ from the rendered canonical footprint`);
    assert.deepEqual(definition.resolvedTemplate.mapCells, [{id: `${definition.id}:canonical-footprint`, bounds: renderBounds}], `${definition.id} map projection must use one canonical footprint cell`);
    assert(definition.layout.bounds.minX <= renderBounds.minX && definition.layout.bounds.maxX >= renderBounds.maxX, `${definition.id} navigation bounds do not contain the rendered footprint`);
    assert(definition.layout.bounds.minZ <= renderBounds.minZ && definition.layout.bounds.maxZ >= renderBounds.maxZ, `${definition.id} navigation bounds do not contain the rendered footprint`);
    approx(definition.layout.floorArea, expectedWidth * expectedDepth, `${definition.id} floor area`);
    assert.deepEqual(definition.resolvedTemplate.canonicalFootprint, {width: expectedWidth, depth: expectedDepth});
    assert.deepEqual(definition.resolvedTemplate.resolvedRoomCeilingRange, [definition.resolvedTemplate.canonicalCeilingHeight, definition.resolvedTemplate.canonicalCeilingHeight]);
    assert.deepEqual(definition.resolvedTemplate.lightingInterface.roles, ['ambient', 'threshold', 'perimeter-track', 'anchor-track', 'accessible-label-light']);
    assert.equal(definition.resolvedTemplate.lightingInterface.perimeterTrackIds.length, expected.rooms);
    assert.equal(definition.resolvedTemplate.lightingInterface.anchorTrackIds.length > 0, true);
    assert.equal(definition.resolvedTemplate.lightingInterface.accessibleLabelAnchorIds.length, hall.zones.length + hall.exhibits.length + 1 + comparativeLensCount - removedPhysicalRoomSigns);
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
    const expectedEntranceIds = sorted(definition.entrances.map(({id}) => id));
    assert.deepEqual(sorted(Object.keys(definition.prefetch.entryExhibitIdsByEntrance)), expectedEntranceIds, `${definition.id} entry-exhibit keys drifted from its entrances`);
    assert.deepEqual(sorted(Object.keys(definition.prefetch.entrySceneAssetIdsByEntrance ?? {})), expectedEntranceIds, `${definition.id} entry-media keys drifted from its entrances`);
    for (const entrance of definition.entrances) {
      const expectedRoom = definition.layout.spatialCells.reduce((nearest, cell) => {
        const authoredBounds = cell.renderBounds ?? cell.bounds;
        const center = {x: (authoredBounds.minX + authoredBounds.maxX) / 2, z: (authoredBounds.minZ + authoredBounds.maxZ) / 2};
        const centerDistance = distance(center, entrance.position);
        return !nearest || centerDistance < nearest.distance ? {cell, distance: centerDistance} : nearest;
      }, undefined).cell;
      const expectedExhibitIds = expectedRoom.exhibitIds.slice(0, 2);
      assert.deepEqual(definition.prefetch.entryExhibitIdsByEntrance[entrance.id], expectedExhibitIds, `${definition.id}/${entrance.id} entry exhibits do not match the nearest rendered room`);
      const expectedAssetIds = sorted([...new Set(definition.layout.exhibits
        .filter(({id}) => expectedExhibitIds.includes(id))
        .flatMap(({scene}) => scene.mediaMounts.map(({assetId}) => assetId))
        .concat((definition.layout.supplementalExhibits ?? [])
          .filter(({spatialCellId}) => spatialCellId === expectedRoom.id)
          .map(({assetId}) => assetId)))]);
      assert.deepEqual(sorted(definition.prefetch.entrySceneAssetIdsByEntrance[entrance.id]), expectedAssetIds, `${definition.id}/${entrance.id} entry media do not match the rendered entry exhibits`);
    }
    const expectedEntrySceneAssetIds = sorted([...new Set(Object.values(definition.prefetch.entrySceneAssetIdsByEntrance).flat())]);
    assert.deepEqual(sorted(definition.prefetch.entrySceneAssetIds), expectedEntrySceneAssetIds, `${definition.id} aggregate entry media drifted from the entrance-specific sets`);
    assert(definition.prefetch.entrySceneAssetIds.every((id) => definition.prefetch.sceneAssetIds.includes(id)), `${definition.id} entry media is not a bounded subset`);
  }
});

check('primary circulation and every guided leg are continuously sampled and collision-free', () => {
  for (const definition of definitions) {
    const {layout} = definition;
    const colliders = allColliders(layout);
    const circulation = layout.primaryCirculation;
    assert(circulation.id.trim(), `${definition.id} primary circulation has no id`);
    assert(circulation.clearanceRadius >= layout.playerRadius, `${definition.id} primary circulation is narrower than the visitor`);
    assert(circulation.points.length >= 2, `${definition.id} primary circulation has no usable path`);
    let circulationLength = 0;
    for (let index = 1; index < circulation.points.length; index += 1) {
      circulationLength += sampleSegment(circulation.points[index - 1], circulation.points[index], .05, (point) => {
        assert(positionInsideSpatialUnion(point, circulation.clearanceRadius, layout.spatialCells), `${definition.id} primary circulation exits the spatial union near ${JSON.stringify(point)}`);
        assert(isValidMuseumPosition(point, circulation.clearanceRadius, layout.bounds, colliders, layout.spatialCells), `${definition.id} primary circulation loses ${circulation.clearanceRadius.toFixed(2)} m clearance near ${JSON.stringify(point)}`);
      });
    }
    assert(circulationLength > 20, `${definition.id} primary circulation is implausibly short`);

    const exhibitById = new Map(layout.exhibits.map((exhibit) => [exhibit.id, exhibit]));
    assert.equal(layout.guidedWalkLegs.length, Math.max(0, layout.guidedOrder.length - 1));
    for (const [index, leg] of layout.guidedWalkLegs.entries()) {
      assert.equal(leg.fromExhibitId, layout.guidedOrder[index], `${definition.id} guided leg ${index} has the wrong source`);
      assert.equal(leg.toExhibitId, layout.guidedOrder[index + 1], `${definition.id} guided leg ${index} has the wrong target`);
      const from = exhibitById.get(leg.fromExhibitId);
      const to = exhibitById.get(leg.toExhibitId);
      assert(from && to, `${definition.id} guided leg ${index} references a missing exhibit`);
      const points = [from.viewpoint, ...leg.waypoints, to.viewpoint];
      assert(points.length >= 2, `${definition.id} guided leg ${leg.fromExhibitId} -> ${leg.toExhibitId} has no path`);
      for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
        sampleSegment(points[pointIndex - 1], points[pointIndex], .05, (point) => {
          assert(positionInsideSpatialUnion(point, layout.playerRadius, layout.spatialCells), `${definition.id} guided leg ${leg.fromExhibitId} -> ${leg.toExhibitId} exits the hall near ${JSON.stringify(point)}`);
          assert(isValidMuseumPosition(point, layout.playerRadius, layout.bounds, colliders, layout.spatialCells), `${definition.id} guided leg ${leg.fromExhibitId} -> ${leg.toExhibitId} collides near ${JSON.stringify(point)}`);
        });
      }
    }
  }
});

check('runtime seams are bidirectional, world-aligned, step-free, and crossable', () => {
  assert.equal(MUSEUM_DIRECTED_CONNECTIONS.length, MUSEUM_BUILDING_MANIFEST.connections.length * 2);
  for (const connection of MUSEUM_BUILDING_MANIFEST.connections) {
    const directed = MUSEUM_DIRECTED_CONNECTIONS.filter(({connectionId}) => connection.id === connectionId);
    assert.equal(directed.length, 2, `${connection.id} is not bidirectional`);
    assert.deepEqual(directed.map(({id, sourceNodeId, targetNodeId, localEntranceId, targetEntranceId}) => ({id, sourceNodeId, targetNodeId, localEntranceId, targetEntranceId})), [
      {id: `${connection.id}:a-to-b`, sourceNodeId: connection.a.nodeId, targetNodeId: connection.b.nodeId, localEntranceId: connection.a.slotId, targetEntranceId: connection.b.slotId},
      {id: `${connection.id}:b-to-a`, sourceNodeId: connection.b.nodeId, targetNodeId: connection.a.nodeId, localEntranceId: connection.b.slotId, targetEntranceId: connection.a.slotId},
    ], `${connection.id} directed endpoints drifted`);
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
    const sourceDimensions = Math.abs(sourceEntrance.inwardNormal.x) > .5
      ? {clearWidth: sourceEntrance.transitionBounds.size.depth, transitionDepth: sourceEntrance.transitionBounds.size.width}
      : {clearWidth: sourceEntrance.transitionBounds.size.width, transitionDepth: sourceEntrance.transitionBounds.size.depth};
    const targetDimensions = Math.abs(targetEntrance.inwardNormal.x) > .5
      ? {clearWidth: targetEntrance.transitionBounds.size.depth, transitionDepth: targetEntrance.transitionBounds.size.width}
      : {clearWidth: targetEntrance.transitionBounds.size.width, transitionDepth: targetEntrance.transitionBounds.size.depth};
    assert.deepEqual(sourceDimensions, targetDimensions, `${connection.id} endpoint dimensions differ`);
    assert(validPose(source, sourceEntrance.arrivalPose), `${connection.id} source landing is unsafe`);
    assert(validPose(target, targetEntrance.arrivalPose), `${connection.id} target landing is unsafe`);
  }

  const runPhysicalCrossing = (connection, walkingSpeed, retainedTargetActive) => {
    physicalMovementTrajectories += 1;
    const source = runtimeNodeById.get(connection.sourceNodeId);
    const target = runtimeNodeById.get(connection.targetNodeId);
    assert(source && target, `${connection.id} references a missing runtime node`);
    const entrance = source.entrances.find(({id}) => id === connection.localEntranceId);
    assert(entrance, `${connection.id} has no source entrance ${connection.localEntranceId}`);
    assert(validPose(source, entrance.arrivalPose), `${connection.id} starts from an invalid source arrival`);
    const portalWorld = museumPointToWorld(source, entrance.position);
    const inwardWorld = worldNormal(source, entrance.inwardNormal);
    const signedWorldDistance = (worldPose) =>
      (worldPose.x - portalWorld.x) * inwardWorld.x
      + (worldPose.z - portalWorld.z) * inwardWorld.z;
    const renderedTargetKeys = target.publicHallId
      ? resolveMuseumHallRenderedReadinessKeys(
          target.publicHallId,
          retainedTargetActive,
          connection.targetEntranceId,
        )
      : [];
    const requiredTargetKey = target.publicHallId
      ? `${target.publicHallId}::museum-entry::${connection.targetEntranceId}`
      : undefined;
    if (requiredTargetKey) assert(
      renderedTargetKeys.includes(requiredTargetKey),
      `${connection.id} retained active hall never publishes connector-facing readiness ${requiredTargetKey}`,
    );
    const readyHallEntryKeys = new Set(renderedTargetKeys);
    let currentNode = source;
    let currentPose = {
      ...entrance.arrivalPose,
      yaw: Math.atan2(entrance.inwardNormal.x, entrance.inwardNormal.z),
      pitch: 0,
    };
    let currentWorld = museumPoseToWorld(currentNode, currentPose);
    assert(signedWorldDistance(currentWorld) > 0, `${connection.id} authored arrival is not inside its source portal`);
    const areaSequence = [source.id];
    let portalCrossings = 0;
    let transitionCount = 0;
    let targetProgress = 0;
    const frameLimit = 360;

    for (let frame = 0; frame < frameLimit && targetProgress < 3; frame += 1) {
      const previousWorld = currentWorld;
      const previousSigned = signedWorldDistance(previousWorld);
      const result = advanceMuseumPhysicalFrame({
        definition: currentNode,
        pose: currentPose,
        input: {forward: 1, strafe: 0, walkingSpeed},
        rawDelta: 1 / 60,
        readyHallEntryKeys,
      });
      assert.notEqual(result.kind, 'blocked', `${connection.id} blocked during held production movement (${result.reason ?? 'unknown'})`);
      const frameNode = currentNode;
      const framePose = result.pose;
      assert(validPose(frameNode, framePose), `${connection.id} produced an invalid ${frameNode.id} pose`);
      const crossingWorld = museumPoseToWorld(frameNode, framePose);
      const crossingSigned = signedWorldDistance(crossingWorld);
      const frameProgress = -(
        (crossingWorld.x - previousWorld.x) * inwardWorld.x
        + (crossingWorld.z - previousWorld.z) * inwardWorld.z
      );
      assert(frameProgress > 1e-6, `${connection.id} stalled or reversed while forward input remained held`);
      if (frameNode.id === source.id && previousSigned >= 0 && crossingSigned < 0) portalCrossings += 1;

      if (result.kind === 'transition') {
        transitionCount += 1;
        assert.equal(result.transition.connection.id, connection.id, `${connection.id} triggered ${result.transition.connection.id}`);
        assert.equal(result.transition.targetNode.id, target.id, `${connection.id} entered ${result.transition.targetNode.id}`);
        const arrivalWorld = museumPoseToWorld(result.transition.targetNode, result.transition.arrival);
        assert(
          distance(crossingWorld, arrivalWorld) <= 1e-5,
          `${connection.id} transition fell back or teleported ${distance(crossingWorld, arrivalWorld).toFixed(3)} m`,
        );
        currentNode = result.transition.targetNode;
        currentPose = result.transition.arrival;
        assert(validPose(currentNode, currentPose), `${connection.id} committed an invalid target pose`);
        areaSequence.push(currentNode.id);
        currentWorld = arrivalWorld;
      } else {
        currentPose = result.pose;
        currentWorld = crossingWorld;
      }
      if (currentNode.id === target.id) targetProgress = Math.max(0, -signedWorldDistance(currentWorld));
    }

    assert.deepEqual(areaSequence, [source.id, target.id], `${connection.id} area sequence drifted`);
    assert.equal(transitionCount, 1, `${connection.id} did not commit exactly one transition`);
    assert.equal(portalCrossings, 1, `${connection.id} did not cross exactly one portal plane`);
    assert(targetProgress >= 3, `${connection.id} stopped ${targetProgress.toFixed(2)} m beyond the seam`);
  };

  for (const connection of MUSEUM_DIRECTED_CONNECTIONS) {
    runPhysicalCrossing(connection, MUSEUM_STANDARD_WALK_SPEED, false);
    runPhysicalCrossing(connection, MUSEUM_FAST_WALK_SPEED, false);
    const source = runtimeNodeById.get(connection.sourceNodeId);
    const target = runtimeNodeById.get(connection.targetNodeId);
    if (target?.publicHallId && !source?.publicHallId) {
      runPhysicalCrossing(connection, MUSEUM_STANDARD_WALK_SPEED, true);
      runPhysicalCrossing(connection, MUSEUM_FAST_WALK_SPEED, true);
    }
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
  assert.deepEqual(sorted(MUSEUM_VISITOR_MAP_EDGES.map(({connectionId}) => connectionId)), sorted(MUSEUM_BUILDING_MANIFEST.connections.map(({id}) => id)), 'Visitor-map edges differ from the manifest connections');
  assert.deepEqual(sorted(MUSEUM_VISITOR_MAP_RESERVATIONS.map(({id}) => id)), sorted(MUSEUM_BUILDING_MANIFEST.reservations.map(({id}) => id)), 'Visitor-map reservations differ from the manifest reservations');
  for (const projection of MUSEUM_VISITOR_MAP_NODE_PROJECTIONS) {
    assert(runtimeNodeById.has(projection.id), `Visitor map projects unknown physical node ${projection.id}`);
    assert(projection.cells.length > 0, `${projection.id} has no projected map polygon`);
    assert(projection.cells.every(({area, points}) => area > 0 && points.length >= 4 && points.every(({x, y}) => Number.isFinite(x) && Number.isFinite(y))), `${projection.id} has invalid projected geometry`);
    assert(Number.isFinite(projection.labelPoint.x) && Number.isFinite(projection.labelPoint.y), `${projection.id} has an invalid map label point`);
  }
  for (const edge of MUSEUM_VISITOR_MAP_EDGES) {
    assert(edge.points.length >= 2 && edge.points.every(({x, y}) => Number.isFinite(x) && Number.isFinite(y)), `${edge.connectionId} has invalid map-edge geometry`);
  }
  for (const node of MUSEUM_VISITOR_MAP_NODES) {
    const definition = definitionById.get(node.hallId);
    const destination = resolveMuseumVisitorMapDestination(definition, node);
    assert(destination && validPose(definition, destination), `${node.hallId} fast-travel destination is unsafe`);
    const physicalProjection = MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.find(({id}) => id === definition.physicalNodeId);
    assert(physicalProjection, `${node.hallId} has no physical map projection`);
    approx(physicalProjection.cells.reduce((sum, cell) => sum + cell.area, 0), definition.layout.floorArea, `${node.hallId} map footprint area`);
  }
  const projectedDoorwayKeys = sorted(MUSEUM_VISITOR_MAP_DOORWAYS.map(({key}) => key));
  assert.deepEqual(projectedDoorwayKeys, sorted(activeEndpointKeys), 'Visitor map must show active doorways plus the main entrance, not inactive template slots');
  assert(!MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.some(({publicHallId, id}) => LEGACY_HALL_IDS.includes(publicHallId) || LEGACY_HALL_IDS.some((legacyId) => id === `hall:${legacyId}`)));
});

check('decoded texture residency admits every active and approached hall under 96 MiB', () => {
  assert.equal(MUSEUM_DECODED_TEXTURE_BUDGET_MIB, 96);
  assert.equal(MUSEUM_DECODED_TEXTURE_BUDGET_BYTES, 96 * 1024 * 1024);
  assert.equal(buildingManifest.reservations.length, 11, 'persistent reservation-label count changed');
  const expectedBuildingSignBytes = independentDecodedTextureBytes(independentTextureDimensionsForPlane(
    5.6,
    5.6 * .27,
    {width: 600, height: 160, mipmaps: true},
  ));
  const expectedReservationSignBytes = buildingManifest.reservations.reduce((sum, reservation) =>
    sum + independentDecodedTextureBytes(independentTextureDimensionsForPlane(
      reservation.barrierWidth * .9,
      reservation.barrierWidth * .245,
      {width: 700, height: 190, mipmaps: true},
    )), 0);
  const expectedReadinessGateBytes = independentDecodedTextureBytes({width: 600, height: 160, mipmaps: true});
  const publicNodeIds = new Set(buildingManifest.nodes.filter(({publicHallId}) => Boolean(publicHallId)).map(({id}) => id));
  const gateCounts = new Map();
  for (const connection of buildingManifest.connections.filter(({implementationStatus}) => implementationStatus === 'live')) {
    if (publicNodeIds.has(connection.b.nodeId)) gateCounts.set(connection.a.nodeId, (gateCounts.get(connection.a.nodeId) ?? 0) + 1);
    if (publicNodeIds.has(connection.a.nodeId)) gateCounts.set(connection.b.nodeId, (gateCounts.get(connection.b.nodeId) ?? 0) + 1);
  }
  const expectedMaximumReadinessGates = Math.max(1, ...gateCounts.values());
  assert.equal(expectedMaximumReadinessGates, 2, 'the independent physical-node gate count changed');
  const expectedPersistentBytes = expectedBuildingSignBytes
    + expectedReservationSignBytes
    + expectedReadinessGateBytes * expectedMaximumReadinessGates;
  assert.deepEqual(MUSEUM_PERSISTENT_TEXTURE_ESTIMATE, {
    buildingSignBytes: expectedBuildingSignBytes,
    reservationSignBytes: expectedReservationSignBytes,
    readinessGateBytes: expectedReadinessGateBytes,
    maximumSimultaneousReadinessGates: expectedMaximumReadinessGates,
    totalBytes: expectedPersistentBytes,
    totalMiB: expectedPersistentBytes / 1024 / 1024,
  }, 'persistent building, reservation, and readiness allocations drifted');
  let peak = 0;
  for (const hallId of HALL_IDS) {
    const active = estimateMuseumHallTextureResidency(hallId, 'active');
    const entry = estimateMuseumHallTextureResidency(hallId, 'entry-resident');
    console.log(`  ${hallId}: active ${active.totalMiB.toFixed(2)} MiB · entry ${entry.totalMiB.toFixed(2)} MiB`);
    assert(active.totalBytes > 0, `${hallId} has no active texture residency`);
    if (active.totalBytes > MUSEUM_DECODED_TEXTURE_BUDGET_BYTES) residencyAdmissionFailures.push(`${hallId} active textures use ${active.totalMiB.toFixed(2)} MiB and exceed 96 MiB`);
    assert(entry.totalBytes > 0 && entry.totalBytes <= active.totalBytes, `${hallId} entry textures are unbounded`);
  }
  assert(MUSEUM_PERSISTENT_TEXTURE_ESTIMATE.totalBytes > 0, 'persistent building textures are missing from the residency estimate');
  assert(MUSEUM_PERSISTENT_TEXTURE_ESTIMATE.totalBytes < MUSEUM_DECODED_TEXTURE_BUDGET_BYTES, 'persistent building textures consume the whole budget');
  const realApproaches = MUSEUM_DIRECTED_CONNECTIONS.flatMap((connection) => {
    const target = runtimeNodeById.get(connection.targetNodeId);
    return target?.publicHallId ? [{hallId: target.publicHallId, entranceId: connection.targetEntranceId, connectionId: connection.id}] : [];
  });
  assert(realApproaches.length > 0, 'the building exposes no physical public-hall approaches');
  for (const activeHallId of HALL_IDS) {
    for (const approach of realApproaches) {
      const approachedHallId = approach.hallId;
      if (activeHallId === approachedHallId) continue;
      const plan = resolveMuseumHallResidencyPlan({activeHallId, approachedHallId, approachedEntranceId: approach.entranceId});
      assert(plan.hallIds.includes(activeHallId), `${activeHallId} was evicted`);
      if (!plan.hallIds.includes(approachedHallId)) residencyAdmissionFailures.push(`${activeHallId} -> ${approach.connectionId}: active=${estimateMuseumHallTextureResidency(activeHallId, 'active').totalMiB.toFixed(2)} MiB entry=${estimateMuseumHallTextureResidency(approachedHallId, 'entry-resident', approach.entranceId).totalMiB.toFixed(2)} MiB skipped=${plan.skippedForTextureBudget.join(',')}`);
      assert(plan.hallIds.length <= 3);
      assert(plan.decodedTextureBytes <= plan.decodedTextureBudgetBytes);
      assert.equal(plan.persistentDecodedTextureBytes, MUSEUM_PERSISTENT_TEXTURE_ESTIMATE.totalBytes);
      peak = Math.max(peak, plan.decodedTextureBytes);
      for (const recentHallId of HALL_IDS) {
        if (recentHallId === activeHallId || recentHallId === approachedHallId) continue;
        const withRecent = resolveMuseumHallResidencyPlan({activeHallId, approachedHallId, approachedEntranceId: approach.entranceId, recentHallId});
        if (!withRecent.hallIds.includes(activeHallId) || !withRecent.hallIds.includes(approachedHallId)) residencyAdmissionFailures.push(`${activeHallId} -> ${approachedHallId} with recent ${recentHallId}`);
        assert(withRecent.hallIds.length <= 3);
        assert(withRecent.decodedTextureBytes <= withRecent.decodedTextureBudgetBytes);
        peak = Math.max(peak, withRecent.decodedTextureBytes);
      }
    }
  }
  console.log(`  texture residency peak: ${(peak / 1024 / 1024).toFixed(2)} MiB / 96 MiB`);
});

check('all 63 live exhibits have substantial, sourced, route-aware interpretation', () => {
  assert.equal(MUSEUM_INTERPRETATIONS.length, 63);
  assert.equal(new Set(MUSEUM_INTERPRETATIONS.map(({hallId, id}) => `${hallId}/${id}`)).size, 63);
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

check('Fast movement substeps cannot tunnel through walls, exhibits, barriers, or readiness thresholds', () => {
  assert.equal(clampFrameDelta(10), .05);
  const playerRadius = .32;
  const bounds = {minX: -5, maxX: 5, minZ: -5, maxZ: 5};
  const spatialCells = [{id: 'speed-audit', bounds, ceilingHeight: 4, lightingGroupId: 'audit'}];
  const fastFrameDistance = MUSEUM_FAST_WALK_SPEED * clampFrameDelta(10);
  for (const [label, collider] of [
    ['wall', {id: 'speed-wall', center: {x: 0, z: 0}, size: {width: 8, depth: .05}, rotation: 0}],
    ['exhibit', {id: 'speed-exhibit', center: {x: 0, z: 0}, size: {width: .7, depth: .7}, rotation: 0}],
    ['future barrier', {id: 'speed-future', center: {x: 0, z: 0}, size: {width: 4, depth: .08}, rotation: 0}],
  ]) {
    const next = moveWithCollisions(
      {x: 0, z: -1},
      {x: 0, z: fastFrameDistance * 8},
      playerRadius,
      bounds,
      [collider],
      spatialCells,
    );
    assert(!circleIntersectsCollider(next, playerRadius, collider), `Fast movement ended inside ${label}`);
    assert(next.z <= -playerRadius, `Fast movement tunneled through ${label}`);
  }
  for (const node of MUSEUM_RUNTIME_NODES) {
    for (const entrance of node.entrances) {
      const thresholdDepth = Math.abs(entrance.inwardNormal.x) > .5
        ? entrance.transitionBounds.size.width
        : entrance.transitionBounds.size.depth;
      assert(fastFrameDistance < thresholdDepth, `${node.id}/${entrance.id} readiness threshold can be skipped in one Fast frame`);
    }
  }
});

check('sessions, walking pace, readiness, and travel contexts remain safe and hall-qualified', () => {
  assert.equal(MUSEUM_STANDARD_WALK_SPEED, 3.75);
  assert.equal(MUSEUM_FAST_WALK_SPEED, 6);
  assert.equal(resolveMuseumWalkingSpeed('standard'), 3.75);
  assert.equal(resolveMuseumWalkingSpeed('standard', true), 6);
  assert.equal(resolveMuseumWalkingSpeed('fast', true), 6);
  assert.deepEqual(createMuseumInputState(), {forward: 0, strafe: 0, walkingSpeed: 3.75, lookX: 0, lookY: 0});
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: false, metaKey: false}), false);
  assert.equal(hasMuseumBrowserModifier({altKey: true, ctrlKey: false, metaKey: false}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: true, metaKey: false}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: false, metaKey: true}), true);
  assert.equal(resolveMuseumReadinessGateStatus('loading', false), 'loading');
  assert.equal(resolveMuseumReadinessGateStatus('failed', false), 'failed');
  assert.equal(resolveMuseumReadinessGateStatus('ready', true), undefined);
  assert.deepEqual(Object.keys(MUSEUM_READINESS_PRESENTATIONS), ['idle', 'loading', 'failed']);
  const orientationDefinition = definitionById.get(MUSEUM_VISITOR_MAP_KIOSK.hallId);
  const orientationNode = MUSEUM_RUNTIME_NODES.find(({publicHallId}) => publicHallId === MUSEUM_VISITOR_MAP_KIOSK.hallId);
  assert(orientationDefinition && orientationNode, 'The authored Museum orientation destination is missing');
  assert.deepEqual(orientationDefinition.layout.reset, orientationDefinition.layout.spawn, 'Fresh arrival and Reset use different orientation poses');
  assert(validPose(orientationDefinition, orientationDefinition.layout.reset), 'The authored Museum orientation pose is unsafe');
  const resetScenarios = [
    ['ordinary hall', 'justice-democratic-reason'],
    ['connector with a retained hall', 'renaissance-humanism-new-method'],
    ['after fast travel', 'analytic-traditions'],
  ];
  for (const [scenario, sourceHallId] of resetScenarios) {
    const reset = resolveMuseumOrientationReset({
      sourceHallId,
      targetHallId: MUSEUM_VISITOR_MAP_KIOSK.hallId,
      targetNodeId: orientationNode.id,
      targetPose: orientationDefinition.layout.reset,
    });
    assert.equal(reset.activeHallId, MUSEUM_VISITOR_MAP_KIOSK.hallId, `${scenario} Reset chose the wrong hall`);
    assert.equal(reset.activeNodeId, orientationNode.id, `${scenario} Reset chose the wrong physical node`);
    assert.deepEqual(reset.pose, orientationDefinition.layout.reset, `${scenario} Reset changed the authored pose`);
    assert(reset.clearedHallIds.includes(sourceHallId), `${scenario} Reset did not clear its saved source position`);
    assert(reset.clearedHallIds.includes(MUSEUM_VISITOR_MAP_KIOSK.hallId), `${scenario} Reset did not clear the orientation position`);
  }
  const identitySign = orientationDefinition.layout.signs.find(({kind}) => kind === 'entrance');
  assert(identitySign, 'Gallery 01 has no entrance identity sign');
  assert.equal(identitySign.title, 'PHILOSOPHY ATLAS MUSEUM');
  assert.equal(identitySign.kicker, '');
  assert.equal(identitySign.subtitle, 'Gallery 01 · Mediterranean Beginnings & Classical Athens');
  const spawnForward = {
    x: -Math.sin(orientationDefinition.layout.spawn.yaw),
    z: -Math.cos(orientationDefinition.layout.spawn.yaw),
  };
  const visibleFromSpawn = (point) => {
    const offset = {x: point.x - orientationDefinition.layout.spawn.x, z: point.z - orientationDefinition.layout.spawn.z};
    const length = Math.hypot(offset.x, offset.z);
    return length > 0 && (offset.x * spawnForward.x + offset.z * spawnForward.z) / length
      >= Math.cos(orientationDefinition.layout.cameraFov / 2 * Math.PI / 180);
  };
  assert(visibleFromSpawn(MUSEUM_VISITOR_MAP_KIOSK.center), 'Fresh arrival does not face the physical visitor map');
  assert(visibleFromSpawn(identitySign.position), 'Fresh arrival does not include the Museum/Gallery 01 identity sign');
  for (const definition of definitions) {
    const raw = JSON.stringify({version: 1, hallId: definition.id, ...definition.layout.spawn, lastNearbyExhibit: definition.layout.exhibits[0]?.id});
    assert(parseMuseumSession(raw, definition.layout), `${definition.id} valid session was rejected`);
    assert.equal(parseMuseumSession('{bad json', definition.layout), undefined, `${definition.id} accepted malformed JSON`);
    assert.equal(parseMuseumSession('x'.repeat(4097), definition.layout), undefined, `${definition.id} accepted an oversized session`);
    assert.equal(parseMuseumSession(JSON.stringify({version: 1, hallId: 'ancient-greek', ...definition.layout.spawn}), definition.layout), undefined, `${definition.id} accepted a retired hall session`);
    assert.equal(parseMuseumSession(JSON.stringify({version: 0, hallId: definition.id, ...definition.layout.spawn}), definition.layout), undefined, `${definition.id} accepted the wrong session version`);
    assert.equal(parseMuseumSession(JSON.stringify({version: 1, hallId: definition.id, x: null, z: 0, yaw: 0, pitch: 0}), definition.layout), undefined, `${definition.id} accepted a null coordinate`);
    assert.equal(sanitizeMuseumPose({...definition.layout.spawn, x: Number.POSITIVE_INFINITY}, definition.layout), undefined, `${definition.id} accepted a non-finite pose`);
    assert.equal(sanitizeMuseumPose({...definition.layout.exhibits[0].collider.center, yaw: 0, pitch: 0}, definition.layout), undefined, `${definition.id} accepted a pose inside an exhibit`);
    const authoredSpatialCells = definition.layout.spatialCells.map((cell) => cell.renderBounds
      ? {...cell, bounds: cell.renderBounds}
      : cell);
    const seamCandidates = definition.entrances.flatMap((entrance) => definition.layout.spatialCells.flatMap((cell) => {
      if (!cell.renderBounds) return [];
      const authored = cell.renderBounds;
      const candidates = [];
      if (cell.bounds.minX < authored.minX && Math.abs(entrance.position.x - authored.minX) < .01) candidates.push({x: authored.minX - .15, z: entrance.position.z, yaw: 0, pitch: 0});
      if (cell.bounds.maxX > authored.maxX && Math.abs(entrance.position.x - authored.maxX) < .01) candidates.push({x: authored.maxX + .15, z: entrance.position.z, yaw: 0, pitch: 0});
      if (cell.bounds.minZ < authored.minZ && Math.abs(entrance.position.z - authored.minZ) < .01) candidates.push({x: entrance.position.x, z: authored.minZ - .15, yaw: 0, pitch: 0});
      if (cell.bounds.maxZ > authored.maxZ && Math.abs(entrance.position.z - authored.maxZ) < .01) candidates.push({x: entrance.position.x, z: authored.maxZ + .15, yaw: 0, pitch: 0});
      return candidates;
    }));
    const expandedSeamPose = seamCandidates.find((candidate) =>
      isValidMuseumPosition(candidate, definition.layout.playerRadius, definition.layout.bounds, allColliders(definition.layout), definition.layout.spatialCells)
      && !positionInsideSpatialUnion(candidate, definition.layout.playerRadius, authoredSpatialCells));
    assert(expandedSeamPose, `${definition.id} exposes no valid expanded seam pose for the session audit`);
    const sanitizedSeamPose = sanitizeMuseumPose(expandedSeamPose, definition.layout);
    assert(sanitizedSeamPose, `${definition.id} could not clamp an expanded seam pose into its authored footprint`);
    assert(positionInsideSpatialUnion(sanitizedSeamPose, definition.layout.playerRadius, authoredSpatialCells), `${definition.id} preserved a session in navigation-only seam overlap`);
    assert(distance(sanitizedSeamPose, expandedSeamPose) > .1, `${definition.id} did not move the navigation-only seam session pose`);
    const parsedSeamSession = parseMuseumSession(JSON.stringify({version: 1, hallId: definition.id, ...expandedSeamPose}), definition.layout);
    assert(parsedSeamSession && positionInsideSpatialUnion(parsedSeamSession, definition.layout.playerRadius, authoredSpatialCells), `${definition.id} restored a session outside the authored spatial union`);
    const unknownNearby = parseMuseumSession(JSON.stringify({version: 1, hallId: definition.id, ...definition.layout.spawn, lastNearbyExhibit: 'not-an-exhibit'}), definition.layout);
    assert(unknownNearby && !Object.hasOwn(unknownNearby, 'lastNearbyExhibit'), `${definition.id} preserved an unknown nearby exhibit`);
    const travel = createMuseumHallTravelContext(definition.id);
    assert.deepEqual(parseMuseumHallTravelContext({philosophyAtlasMuseumTravel: travel}, definition.id), travel);
    assert.equal(parseMuseumHallTravelContext({philosophyAtlasMuseumTravel: {...travel, version: 0}}, definition.id), undefined);
    assert.equal(parseMuseumHallTravelContext({philosophyAtlasMuseumTravel: {...travel, resumeExploration: false}}, definition.id), undefined);
    assert.equal(parseMuseumHallTravelContext({philosophyAtlasMuseumTravel: travel}, HALL_IDS.find((id) => id !== definition.id)), undefined);
    const visit = createMuseumExhibitVisitContext(definition.id, 'direct');
    assert.deepEqual(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: visit}, definition.id), visit);
    assert.equal(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: {...visit, version: 0}}, definition.id), undefined);
    assert.equal(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: visit}, HALL_IDS.find((id) => id !== definition.id)), undefined);
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
  assert.match(canonicalExhibitsSource, /Every Gallery 01 installation presents provenance-backed imagery/);
  assert.match(canonicalExhibitsSource, /usePlaqueTexture/);
  assert.match(architectureSource, /museumTextureDimensionsForPlane/);
  assert.match(architectureSource, /<mesh position=\{\[0, 0, \.002\]\}><planeGeometry/);
  assert.match(visitorMapSource, /This main-level plan shows/);
  assert.match(visitorMapSource, /Fast travel returns you to the selected gallery entrance/);
  assert.doesNotMatch(visitorMapSource, /Permanent construction stage|registered hall’s authored safe spawn/);
  assert.match(visitorMapSource, /MUSEUM_VISITOR_MAP_RESERVATIONS/);
  assert.match(compatibilitySource, /is not currently installed/);
  assert.match(compatibilitySource, /underlying Atlas record, article, relationships, media, and source data have not been deleted/);
  assert.match(museumPageSource, /residentHallIds/);
  assert.match(museumPageSource, /retryHallContent/);
  assert.match(museumPageSource, /Retry gallery/);
  assert.match(museumPageSource, /MUSEUM_WORLD_REGISTRY\.filter/);
  assert.match(museumPageSource, /onOpenVisitorMap: showVisitorMap/);
  assert.match(museumPageSource, /<span>MAP \(M\)<\/span>/);
  assert.match(museumPageSource, /resolveMuseumOrientationReset/);
  assert.match(museumPageSource, /reset\.clearedHallIds\.forEach/);
  assert.match(museumControlsSource, /event\.code === 'KeyM'[\s\S]{0,180}onOpenVisitorMap/);
  assert.doesNotMatch(museumControlsSource, /event\.code === 'KeyD'/, 'D must remain movement-only');
  assert.doesNotMatch(museumControlsSource, /onOpenDirectory/, 'The keyboard controls still expose a Directory shortcut');
  assert.match(visitorMapSource, /panelClassName="museum-visitor-map-panel"/);
  assert.match(visitorMapSource, /museum-visitor-map-action/);
  assert.match(museumModalSource, /document\.documentElement\.style\.overflow = 'hidden'/);
  assert.match(museumModalSource, /document\.body\.style\.overflow = 'hidden'/);
  assert.match(museumCssSource, /\.museum-visitor-map-panel\{[^}]*height:100%[^}]*overflow:hidden/);
  assert.match(museumCssSource, /@media\(min-width:901px\) and \(max-height:820px\)/);
  assert.match(museumCssSource, /museum-visitor-map-reservations/);
});

assert.deepEqual(unsafeExhibitViewpoints, [], `unsafe exhibit viewpoints:\n${unsafeExhibitViewpoints.join('\n')}`);
assert.deepEqual(unsafeNavigationPoses, [], `unsafe navigation poses:\n${unsafeNavigationPoses.join('\n')}`);
assert.deepEqual(seamCrossingFailures, [], `collision-resolved seam failures:\n${seamCrossingFailures.join('\n')}`);
assert.deepEqual(residencyAdmissionFailures, [], `approached-hall residency failures:\n${[...new Set(residencyAdmissionFailures)].join('\n')}`);
assert.deepEqual(interpretationQualityFailures, [], `interpretation quality failures:\n${interpretationQualityFailures.join('\n')}`);

console.log(`\nMuseum audit passed: ${checks} groups covering ${definitions.length} canonical halls, 29 rooms, 63 exhibits, ${physicalMovementTrajectories} production-frame crossing trajectories over ${MUSEUM_DIRECTED_CONNECTIONS.length} directed crossings and ${MUSEUM_BUILDING_MANIFEST.connections.length} physical seams, ${MUSEUM_INTERPRETATIONS.length} interpretations, and 96 MiB bounded residency.`);
