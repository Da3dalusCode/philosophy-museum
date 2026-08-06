import assert from 'node:assert/strict';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const virtualEntry = 'virtual:philosophy-atlas-gallery-01-placement-audit';
const resolvedEntry = `\0${virtualEntry}`;

const result = await build({
  root: repoRoot,
  configFile: false,
  logLevel: 'silent',
  ssr: {noExternal: true},
  plugins: [{
    name: 'gallery-01-placement-audit-entry',
    resolveId: (id) => id === virtualEntry ? resolvedEntry : undefined,
    load: (id) => id === resolvedEntry ? `
      export * from '/src/data/museum/canonicalMuseumHalls.ts';
      export * from '/src/data/museum/museumCanonicalProgram.ts';
      export * from '/src/data/museum/gallery01Placement.ts';
      export * from '/src/data/museum/mediterraneanGalleryCuration.ts';
      export * from '/src/data/museum/platoSupplementalExhibits.ts';
      export * from '/src/data/museum/gallery01SupplementalExhibits.ts';
      export * from '/src/data/museum/museumArchitectureMaterials.ts';
      export * from '/src/data/museum/museumBuildingRuntime.ts';
      export * from '/src/data/museum/museumGrandEntranceFurnishings.ts';
      export * from '/src/data/museum/museumVisitorMapKioskDefinition.ts';
      export * from '/src/data/museum/ancientGreekHall.ts';
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
assert(entry, 'Vite did not produce the Gallery 01 placement audit module.');
const museum = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`);

const {
  ANCIENT_GREEK_HALL_DEFINITION,
  CANONICAL_MUSEUM_HALL_DEFINITIONS,
  GALLERY_01_DOORWAY_CLEARANCES,
  GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS,
  GALLERY_01_CURATORIAL_WALL_SEQUENCES,
  GALLERY_01_HALL_BOUNDS,
  GALLERY_01_ENTRANCE_ORIENTATION_PLACEMENT,
  GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS,
  GALLERY_01_PRIMARY_PLACEMENTS,
  GALLERY_01_ROOM_ANCHORS,
  GALLERY_01_ROOM_BOUNDS,
  GALLERY_01_ROOM_PRIMARY_IDS,
  GALLERY_01_ROUTE_HALF_WIDTH,
  GALLERY_01_ROUTE_STEERING_MARGIN,
  GALLERY_01_CONTEXT_SUPPLEMENTAL_EXHIBITS,
  GALLERY_01_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  MEDITERRANEAN_GALLERY_ID,
  MEDITERRANEAN_ORIENTATION_DISPLAY,
  MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY,
  MUSEUM_CANONICAL_PROGRAM,
  MUSEUM_GRAND_ENTRANCE_FRONT_DESK,
  MUSEUM_GRAND_ENTRANCE_WELCOME_COMPOSITION,
  MUSEUM_RUNTIME_NODES,
  MUSEUM_VISITOR_MAP_KIOSK,
  PLATO_SUPPLEMENTAL_BACKING_WIDTH,
  PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} = museum;

const sorted = (values) => [...values].sort((a, b) => a.localeCompare(b));
const approx = (actual, expected, label, tolerance = .001) =>
  assert(Math.abs(actual - expected) <= tolerance, `${label}: expected ${expected}, received ${actual}`);
const overlaps = (first, second, padding = 0) =>
  first.minX < second.maxX + padding
  && first.maxX > second.minX - padding
  && first.minZ < second.maxZ + padding
  && first.maxZ > second.minZ - padding;
const contains = (outer, inner, inset = 0) =>
  inner.minX >= outer.minX + inset
  && inner.maxX <= outer.maxX - inset
  && inner.minZ >= outer.minZ + inset
  && inner.maxZ <= outer.maxZ - inset;
const union = (bounds) => ({
  minX: Math.min(...bounds.map(({minX}) => minX)),
  maxX: Math.max(...bounds.map(({maxX}) => maxX)),
  minZ: Math.min(...bounds.map(({minZ}) => minZ)),
  maxZ: Math.max(...bounds.map(({maxZ}) => maxZ)),
});
const rotatedBounds = (center, rotation, width, depth) => {
  const quarterTurn = Math.abs(Math.sin(rotation)) > .5;
  const worldWidth = quarterTurn ? depth : width;
  const worldDepth = quarterTurn ? width : depth;
  return {
    minX: center.x - worldWidth / 2,
    maxX: center.x + worldWidth / 2,
    minZ: center.z - worldDepth / 2,
    maxZ: center.z + worldDepth / 2,
  };
};
const localPointToHall = (layout, point) => ({
  x: layout.position.x + point.x * Math.cos(layout.rotationY) + point.z * Math.sin(layout.rotationY),
  z: layout.position.z - point.x * Math.sin(layout.rotationY) + point.z * Math.cos(layout.rotationY),
});
const volumeBounds = (layout, volume) => rotatedBounds(
  localPointToHall(layout, volume.center),
  layout.rotationY,
  volume.size.width,
  volume.size.depth,
);
const primaryPhysicalBounds = (layout) => {
  const volumes = [
    ...layout.scene.objectBounds,
    layout.scene.interactionBounds,
    layout.scene.plaque.bounds,
    layout.scene.plaque.supportBounds,
    ...layout.scene.mediaMounts.flatMap(({bounds, supportBounds}) => [bounds, supportBounds]),
  ];
  return union([
    rotatedBounds(layout.collider.center, layout.collider.rotation, layout.collider.size.width, layout.collider.size.depth),
    ...volumes.map((volume) => volumeBounds(layout, volume)),
  ]);
};
const supplementalPhysicalBounds = (layout) => rotatedBounds(
  layout.position,
  layout.rotationY,
  Math.max(
    layout.footprint.width,
    PLATO_SUPPLEMENTAL_BACKING_WIDTH + MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY.sideOverhang * 2,
  ),
  Math.max(layout.footprint.depth, MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY.largeDepth),
);
const orientationPhysicalBounds = rotatedBounds(
  GALLERY_01_ENTRANCE_ORIENTATION_PLACEMENT.center,
  GALLERY_01_ENTRANCE_ORIENTATION_PLACEMENT.rotation,
  GALLERY_01_ENTRANCE_ORIENTATION_PLACEMENT.size.width + .18,
  Math.max(GALLERY_01_ENTRANCE_ORIENTATION_PLACEMENT.size.depth, .24),
);
const circleIntersectsBounds = (point, radius, bounds) => {
  const nearestX = Math.max(bounds.minX, Math.min(bounds.maxX, point.x));
  const nearestZ = Math.max(bounds.minZ, Math.min(bounds.maxZ, point.z));
  return Math.hypot(point.x - nearestX, point.z - nearestZ) < radius;
};
const visibleFacing = (position, rotation, viewpoint, label) => {
  const front = {x: Math.sin(rotation), z: Math.cos(rotation)};
  const vector = {x: viewpoint.x - position.x, z: viewpoint.z - position.z};
  const length = Math.hypot(vector.x, vector.z);
  assert(length > .25, `${label} viewpoint collapses into its installation`);
  assert((front.x * vector.x + front.z * vector.z) / length > .98, `${label} viewpoint cannot see its front face`);
};
const distanceToSegment = (point, start, end) => {
  const delta = {x: end.x - start.x, z: end.z - start.z};
  const lengthSquared = delta.x ** 2 + delta.z ** 2;
  const progress = lengthSquared === 0
    ? 0
    : Math.max(0, Math.min(1, ((point.x - start.x) * delta.x + (point.z - start.z) * delta.z) / lengthSquared));
  return Math.hypot(
    point.x - (start.x + delta.x * progress),
    point.z - (start.z + delta.z * progress),
  );
};
const wallFace = (position, rotation, roomBounds) => {
  if (Math.abs(position.x + 10.85) < .001 && Math.abs(rotation - Math.PI / 2) < .001) return 'outer-west';
  if (Math.abs(position.x - 10.85) < .001 && Math.abs(rotation + Math.PI / 2) < .001) return 'outer-east';
  if (Math.abs(position.z - (roomBounds.minZ + 1.15)) < .05 && Math.abs(rotation) < .001) {
    return position.x < 0 ? 'north-west' : 'north-east';
  }
  if (Math.abs(position.z - (roomBounds.maxZ - 1.15)) < .05 && Math.abs(rotation - Math.PI) < .001) {
    return position.x < 0 ? 'south-west' : 'south-east';
  }
  return undefined;
};

const gallery = CANONICAL_MUSEUM_HALL_DEFINITIONS.find(({id}) => id === MEDITERRANEAN_GALLERY_ID);
const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === MEDITERRANEAN_GALLERY_ID);
assert(gallery && program, 'Gallery 01 canonical definition or program is missing.');

assert.deepEqual(gallery.layout.bounds, GALLERY_01_HALL_BOUNDS, 'Gallery 01 hall envelope changed');
const runtimeNode = MUSEUM_RUNTIME_NODES.find(({publicHallId}) => publicHallId === MEDITERRANEAN_GALLERY_ID);
assert(runtimeNode, 'Gallery 01 runtime node is missing');
assert.equal(runtimeNode.routePortals.entry, 'S0', 'Gallery 01 must physically enter at S0');
assert.equal(runtimeNode.routePortals.exit, 'N0', 'Gallery 01 must physically exit at N0');
const southEntry = runtimeNode.entrances.find(({id}) => id === 'S0');
const northExit = runtimeNode.entrances.find(({id}) => id === 'N0');
assert(southEntry && northExit, 'Gallery 01 route portals are absent');
assert.deepEqual(
  {x: southEntry.arrivalPose.x, z: southEntry.arrivalPose.z},
  {x: 0, z: 26},
  'Gallery 01 S0 arrival moved',
);
approx(gallery.layout.spawn.yaw, 0, 'Gallery 01 spawn must face north into Room 01');
assert.deepEqual(
  {x: northExit.arrivalPose.x, z: northExit.arrivalPose.z},
  {x: 0, z: -26},
  'Gallery 01 N0 arrival moved',
);
assert.deepEqual(
  Object.fromEntries(gallery.layout.spatialCells.map(({id, bounds}) => [id, bounds])),
  GALLERY_01_ROOM_BOUNDS,
  'Gallery 01 room bounds differ from the placement contract',
);

const primaryById = new Map(gallery.layout.exhibits.map((layout) => [layout.id, layout]));
const supplementalById = new Map((gallery.layout.supplementalExhibits ?? []).map((layout) => [layout.id, layout]));
assert.equal(primaryById.size, 22, 'Gallery 01 must retain 22 unique canonical primaries');
assert.equal(supplementalById.size, 5, 'Gallery 01 must retain three context and two Plato supplemental installations');
assert.equal(new Set(gallery.layout.obstacleColliders.map(({id}) => id)).size, gallery.layout.obstacleColliders.length, 'Gallery 01 has duplicate collider ids');
assert(!gallery.layout.furnishings.some(({id}) => id === MEDITERRANEAN_ORIENTATION_DISPLAY.id), 'The freestanding orientation landmark remains mounted inside Gallery 01');

const anaxagoras = primaryById.get('anaxagoras');
assert(anaxagoras, 'Anaxagoras is absent from Gallery 01');
for (const layout of primaryById.values()) {
  assert(layout.scene.footprint.width >= anaxagoras.scene.footprint.width, `${layout.id} is narrower than the approved Anaxagoras minimum`);
  assert(layout.scene.footprint.depth >= anaxagoras.scene.footprint.depth, `${layout.id} is shallower than the approved Anaxagoras minimum`);
  assert(layout.scene.footprint.height >= anaxagoras.scene.footprint.height, `${layout.id} is shorter than the approved Anaxagoras minimum`);
}
const prodicus = primaryById.get('prodicus');
assert(prodicus, 'Prodicus is absent from Gallery 01');
assert(prodicus.scene.footprint.width >= anaxagoras.scene.footprint.width + .7, 'Prodicus does not read materially wider than Anaxagoras');
assert(prodicus.scene.footprint.height >= anaxagoras.scene.footprint.height + .25, 'Prodicus does not read materially taller than Anaxagoras');

for (const room of program.rooms) {
  const expectedIds = GALLERY_01_ROOM_PRIMARY_IDS[room.id];
  assert(expectedIds, `Gallery 01 placement contract lacks room ${room.id}`);
  assert.deepEqual(sorted(room.exhibits.map(({id}) => id)), sorted(expectedIds), `${room.id} entity assignment changed`);
  assert.deepEqual(
    sorted(gallery.layout.exhibits.filter(({spatialCellId}) => spatialCellId === room.id).map(({id}) => id)),
    sorted(expectedIds),
    `${room.id} runtime assignment changed`,
  );
}

const installations = [];
for (const [id, authored] of Object.entries(GALLERY_01_PRIMARY_PLACEMENTS)) {
  const layout = primaryById.get(id);
  assert(layout, `${id} is absent from the Gallery 01 runtime`);
  assert.deepEqual(layout.position, {x: authored.x, z: authored.z}, `${id} runtime position is stale`);
  approx(layout.rotationY, authored.rotationY, `${id} rotation`);
  assert.equal(layout.collider.id, `exhibit-${id}`, `${id} collider identity changed`);
  assert.deepEqual(layout.collider.center, layout.position, `${id} collider is detached from its installation`);
  approx(layout.collider.rotation, layout.rotationY, `${id} collider rotation`);
  const roomBounds = GALLERY_01_ROOM_BOUNDS[layout.spatialCellId];
  assert(roomBounds, `${id} has unknown room ${layout.spatialCellId}`);
  const physicalBounds = primaryPhysicalBounds(layout);
  assert(contains(roomBounds, physicalBounds, .08), `${id} physical installation leaves ${layout.spatialCellId}: ${JSON.stringify(physicalBounds)}`);
  assert(wallFace(layout.position, layout.rotationY, roomBounds), `${id} is not aligned to an authored Gallery 01 wall face`);
  visibleFacing(layout.position, layout.rotationY, layout.viewpoint, id);
  assert(contains(roomBounds, rotatedBounds(layout.viewpoint, 0, 0, 0)), `${id} viewpoint leaves ${layout.spatialCellId}`);
  for (const volume of layout.scene.objectBounds) {
    assert(volume.center.y - volume.size.height / 2 >= -.001, `${id}/${volume.id} falls below the gallery floor`);
  }
  const plinth = layout.scene.objectBounds.find(({id: volumeId}) => volumeId.endsWith('-plinth'));
  assert(plinth, `${id} has no physical plinth`);
  approx(plinth.center.y - plinth.size.height / 2, 0, `${id} plinth floor contact`);
  installations.push({
    id,
    roomId: layout.spatialCellId,
    kind: 'primary',
    position: layout.position,
    rotationY: layout.rotationY,
    bounds: physicalBounds,
    viewpoint: layout.viewpoint,
  });
}

const supplementalPlacementContracts = {
  ...GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS,
  ...GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS,
};
assert.deepEqual(
  sorted([...supplementalById.keys()]),
  sorted(Object.keys(supplementalPlacementContracts)),
  'Gallery 01 supplemental roster changed',
);
assert.deepEqual(gallery.layout.supplementalExhibits, GALLERY_01_SUPPLEMENTAL_EXHIBIT_LAYOUTS, 'Gallery 01 supplemental runtime is stale');
for (const exhibit of GALLERY_01_CONTEXT_SUPPLEMENTAL_EXHIBITS) {
  assert(exhibit.presentation, `${exhibit.id} must provide context-specific presentation metadata`);
  const presentationText = JSON.stringify(exhibit.presentation);
  assert(!/Supplemental Plato|Author.*Plato|Plato.s full Atlas profile/i.test(presentationText), `${exhibit.id} inherited Plato-specific drawer metadata`);
}
for (const [id, authored] of Object.entries(supplementalPlacementContracts)) {
  const layout = supplementalById.get(id);
  assert(layout, `${id} is absent from Gallery 01`);
  const expectedRoomId = id === 'greek-philosophy-reception'
    ? 'med-orientation-nature'
    : id === 'miletus-ionian-coast'
      ? 'med-orientation-nature'
    : id === 'socrates-trial-death'
      ? 'med-sophists-socratic'
      : 'med-plato-aristotle';
  assert.equal(layout.zoneId, expectedRoomId, `${id} left its canonical room`);
  assert.equal(layout.spatialCellId, expectedRoomId, `${id} left its spatial room`);
  assert.deepEqual(layout.position, authored.position, `${id} runtime position is stale`);
  approx(layout.rotationY, authored.rotationY, `${id} rotation`);
  assert.deepEqual(layout.viewpoint, authored.viewpoint, `${id} viewpoint is stale`);
  assert.deepEqual(layout.collider.center, layout.position, `${id} collider is detached`);
  approx(layout.collider.rotation, layout.rotationY, `${id} collider rotation`);
  visibleFacing(layout.position, layout.rotationY, layout.viewpoint, id);
  const physicalBounds = supplementalPhysicalBounds(layout);
  assert(contains(GALLERY_01_ROOM_BOUNDS[expectedRoomId], physicalBounds, .08), `${id} leaves ${expectedRoomId}`);
  installations.push({
    id,
    roomId: layout.spatialCellId,
    kind: 'supplemental',
    position: layout.position,
    rotationY: layout.rotationY,
    bounds: physicalBounds,
    viewpoint: layout.viewpoint,
  });
}

assert.deepEqual(MEDITERRANEAN_ORIENTATION_DISPLAY.center, GALLERY_01_ENTRANCE_ORIENTATION_PLACEMENT.center, 'Entrance orientation center is stale');
approx(MEDITERRANEAN_ORIENTATION_DISPLAY.rotation, GALLERY_01_ENTRANCE_ORIENTATION_PLACEMENT.rotation, 'Entrance orientation rotation');
const entranceNode = MUSEUM_RUNTIME_NODES.find(({id}) => id === 'place:grand-entrance-orientation');
assert(entranceNode, 'Grand Entrance runtime node is missing');
const publicEntry = entranceNode.entrances.find(({id}) => id === 'public-entry');
const gallery01Threshold = entranceNode.entrances.find(({id}) => id === 'through-route');
assert(publicEntry && gallery01Threshold, 'Grand Entrance route thresholds are missing');
approx(
  entranceNode.layout.spawn.yaw,
  Math.atan2(
    -(gallery01Threshold.position.x - entranceNode.layout.spawn.x),
    -(gallery01Threshold.position.z - entranceNode.layout.spawn.z),
  ),
  'Grand Entrance spawn must face the Gallery 01 threshold',
);
assert(contains(entranceNode.layout.bounds, orientationPhysicalBounds, .08), 'Orientation landmark leaves the Grand Entrance');
assert.deepEqual(
  entranceNode.layout.furnishings.find(({id}) => id === MEDITERRANEAN_ORIENTATION_DISPLAY.id),
  MEDITERRANEAN_ORIENTATION_DISPLAY,
  'The Grand Entrance does not own the freestanding orientation landmark',
);
assert(
  entranceNode.layout.obstacleColliders.some(({id}) => id === MEDITERRANEAN_ORIENTATION_DISPLAY.id),
  'The freestanding entrance orientation landmark lacks collision',
);
visibleFacing(
  MEDITERRANEAN_ORIENTATION_DISPLAY.center,
  MEDITERRANEAN_ORIENTATION_DISPLAY.rotation,
  {x: -9.8, z: MEDITERRANEAN_ORIENTATION_DISPLAY.center.z},
  'Grand Entrance orientation landmark',
);
const entranceRoute = {minX: -2.5, maxX: 2.5, minZ: entranceNode.layout.bounds.minZ, maxZ: entranceNode.layout.bounds.maxZ};
assert(!overlaps(orientationPhysicalBounds, entranceRoute, .34), 'The entrance orientation landmark blocks the chronological route');
const mapBounds = rotatedBounds(
  MUSEUM_VISITOR_MAP_KIOSK.center,
  MUSEUM_VISITOR_MAP_KIOSK.rotation,
  MUSEUM_VISITOR_MAP_KIOSK.size.width,
  MUSEUM_VISITOR_MAP_KIOSK.size.depth,
);
const deskBounds = rotatedBounds(
  MUSEUM_GRAND_ENTRANCE_FRONT_DESK.center,
  MUSEUM_GRAND_ENTRANCE_FRONT_DESK.rotation,
  MUSEUM_GRAND_ENTRANCE_FRONT_DESK.size.width,
  MUSEUM_GRAND_ENTRANCE_FRONT_DESK.size.depth,
);
const welcome = MUSEUM_GRAND_ENTRANCE_WELCOME_COMPOSITION;
const runtimeEastWallX = gallery01Threshold.position.x;
const entranceRenderBounds = entranceNode.layout.spatialCells[0].renderBounds
  ?? entranceNode.layout.spatialCells[0].bounds;
const runtimeSouthWallZ = entranceRenderBounds.minZ;
assert.equal(welcome.wall, 'east', 'The welcome composition lost its authored east-wall identity');
assert.equal(welcome.planWall, 'max-x', 'Plan east must remain the max-x Grand Entrance wall');
assert.equal(welcome.runtimeWall, 'min-x', 'The plan reflection must map east to runtime min-x');
approx(welcome.oculus.center.x, runtimeEastWallX + .45, 'The oculus must mount on the east wall');
approx(welcome.welcomeSign.center.x, runtimeEastWallX + .7, 'The Welcome sign must mount on the east wall');
approx(MUSEUM_GRAND_ENTRANCE_FRONT_DESK.center.x, runtimeEastWallX + 4.65, 'The desk must stand just inside the east wall');
for (const [label, point] of [
  ['oculus', welcome.oculus.center],
  ['Welcome sign', welcome.welcomeSign.center],
  ['front desk', MUSEUM_GRAND_ENTRANCE_FRONT_DESK.center],
]) {
  approx(point.z, welcome.centerlineZ, `${label} must share the east-wall centerline`);
  assert(Math.abs(point.z - runtimeSouthWallZ) > 12, `${label} remains on the south wall`);
}
for (const [label, rotation] of [
  ['oculus', welcome.oculus.rotation],
  ['Welcome sign', welcome.welcomeSign.rotation],
  ['front desk', MUSEUM_GRAND_ENTRANCE_FRONT_DESK.rotation],
]) {
  approx(rotation, welcome.inwardRotation, `${label} must face plan west into the Grand Entrance`);
  assert(Math.sin(rotation) > .99, `${label} does not face runtime +x / plan west`);
}
assert(
  MUSEUM_GRAND_ENTRANCE_FRONT_DESK.center.x > welcome.welcomeSign.center.x,
  'The desk must stand in front of the wall-mounted sign and oculus',
);
const compositionHalfWidth = welcome.oculus.size.width / 2;
const pilasterZs = welcome.framingPilasters.map(({z}) => z).sort((first, second) => first - second);
assert.equal(pilasterZs.length, 2, 'The east-wall composition must have exactly two framing pilasters');
assert(pilasterZs[0] < welcome.centerlineZ - compositionHalfWidth, 'The first east-wall pilaster overlaps the oculus');
assert(pilasterZs[1] > welcome.centerlineZ + compositionHalfWidth, 'The second east-wall pilaster overlaps the oculus');
for (const pilaster of welcome.framingPilasters) {
  approx(pilaster.x, runtimeEastWallX + .38, 'An east-wall framing pilaster left its wall');
  approx(pilaster.rotation, welcome.inwardRotation, 'An east-wall framing pilaster lost its wall orientation');
  const pilasterBounds = rotatedBounds(
    pilaster,
    pilaster.rotation,
    1.42,
    .86,
  );
  assert(!overlaps(pilasterBounds, deskBounds, .2), 'An east-wall framing pilaster overlaps the front desk');
}
for (const furnishing of [MUSEUM_VISITOR_MAP_KIOSK, MUSEUM_GRAND_ENTRANCE_FRONT_DESK]) {
  assert.deepEqual(
    entranceNode.layout.furnishings.find(({id}) => id === furnishing.id),
    furnishing,
    `${furnishing.id} is detached from the Grand Entrance runtime`,
  );
  assert(
    entranceNode.layout.obstacleColliders.some(({id}) => id === furnishing.id),
    `${furnishing.id} lacks movement collision`,
  );
}
assert(contains(entranceNode.layout.bounds, mapBounds, .08), 'The Museum Map leaves the Grand Entrance');
assert(contains(entranceNode.layout.bounds, deskBounds, .08), 'The front desk leaves the Grand Entrance');
visibleFacing(
  MUSEUM_VISITOR_MAP_KIOSK.center,
  MUSEUM_VISITOR_MAP_KIOSK.rotation,
  MUSEUM_VISITOR_MAP_KIOSK.approachPose,
  'Museum Map orientation stop',
);
const sideOfGalleryRoute = (point) => {
  const route = {
    x: gallery01Threshold.position.x - entranceNode.layout.spawn.x,
    z: gallery01Threshold.position.z - entranceNode.layout.spawn.z,
  };
  const offset = {x: point.x - entranceNode.layout.spawn.x, z: point.z - entranceNode.layout.spawn.z};
  return route.x * offset.z - route.z * offset.x;
};
assert(sideOfGalleryRoute(MEDITERRANEAN_ORIENTATION_DISPLAY.center) < 0, 'The Gallery 01 orientation sign must remain left of the arrival route');
assert(sideOfGalleryRoute(MUSEUM_VISITOR_MAP_KIOSK.center) > 0, 'The Museum Map must stand right of the arrival route');
assert(
  Math.hypot(
    MUSEUM_VISITOR_MAP_KIOSK.center.x - gallery01Threshold.position.x,
    MUSEUM_VISITOR_MAP_KIOSK.center.z - gallery01Threshold.position.z,
  ) < 12,
  'The Museum Map is not close enough to serve as a pre–Gallery 01 orientation stop',
);
assert(!overlaps(mapBounds, orientationPhysicalBounds, .5), 'The Museum Map crowds the Gallery 01 orientation sign');
assert(!overlaps(mapBounds, deskBounds, .5), 'The Museum Map crowds the front desk');
const gallery01ThresholdClearance = {
  minX: gallery01Threshold.position.x,
  maxX: gallery01Threshold.position.x + 6,
  minZ: gallery01Threshold.position.z - 3,
  maxZ: gallery01Threshold.position.z + 3,
};
assert(!overlaps(deskBounds, gallery01ThresholdClearance, .8), 'The east-wall desk crowds the Gallery 01 threshold');
assert(
  MUSEUM_GRAND_ENTRANCE_FRONT_DESK.center.z < MUSEUM_VISITOR_MAP_KIOSK.center.z - 10,
  'The east-wall reception bay must remain beyond and clear of the Museum Map',
);
assert(
  distanceToSegment(MUSEUM_VISITOR_MAP_KIOSK.center, entranceNode.layout.spawn, gallery01Threshold.position) > 3.2,
  'The Museum Map blocks the direct Gallery 01 arrival path',
);
assert(
  distanceToSegment(MUSEUM_GRAND_ENTRANCE_FRONT_DESK.center, entranceNode.layout.spawn, gallery01Threshold.position) > 5,
  'The front desk blocks the direct Gallery 01 arrival path',
);

const routeBounds = {
  minX: -GALLERY_01_ROUTE_HALF_WIDTH,
  maxX: GALLERY_01_ROUTE_HALF_WIDTH,
  minZ: GALLERY_01_HALL_BOUNDS.minZ,
  maxZ: GALLERY_01_HALL_BOUNDS.maxZ,
};
for (const installation of installations) {
  assert(
    !overlaps(installation.bounds, routeBounds, GALLERY_01_ROUTE_STEERING_MARGIN),
    `${installation.id} intrudes into the Gallery 01 centerline route or its steering margin`,
  );
  for (const doorway of GALLERY_01_DOORWAY_CLEARANCES) {
    assert(!overlaps(installation.bounds, doorway.bounds), `${installation.id} intrudes into doorway clearance ${doorway.id}`);
  }
}

for (let index = 0; index < installations.length; index += 1) {
  const first = installations[index];
  for (const second of installations.slice(index + 1)) {
    if (first.roomId !== second.roomId) continue;
    assert(!overlaps(first.bounds, second.bounds, .22), `${first.id} and ${second.id} overlap or lack 0.22 m separation`);
  }
}

for (const installation of installations.filter(({viewpoint}) => viewpoint)) {
  for (const obstacle of installations) {
    if (installation.id === obstacle.id || installation.roomId !== obstacle.roomId) continue;
    assert(!circleIntersectsBounds(installation.viewpoint, .34, obstacle.bounds), `${installation.id} viewpoint collides with ${obstacle.id}`);
  }
}

for (const [roomId, anchorIds] of Object.entries(GALLERY_01_ROOM_ANCHORS)) {
  const anchors = anchorIds.map((id) => primaryById.get(id));
  assert(anchors.every(Boolean), `${roomId} has a missing anchor`);
  assert(anchors.some(({position}) => position.x < -10), `${roomId} lacks a west outer-wall anchor`);
  assert(anchors.some(({position}) => position.x > 10), `${roomId} lacks an east outer-wall anchor`);
  const roomInstallations = installations.filter((item) => item.roomId === roomId);
  const westCount = roomInstallations.filter(({bounds}) => (bounds.minX + bounds.maxX) / 2 < 0).length;
  const eastCount = roomInstallations.length - westCount;
  assert(westCount >= 3, `${roomId} west half-room has fewer than three exhibits`);
  assert(eastCount >= 3, `${roomId} east half-room has fewer than three exhibits`);
  assert(Math.abs(westCount - eastCount) <= 2, `${roomId} has an unbalanced ${westCount}/${eastCount} left-right composition`);
  const faceCounts = new Map();
  const faceInstallations = new Map();
  for (const installation of roomInstallations) {
    const face = wallFace(installation.position, installation.rotationY, GALLERY_01_ROOM_BOUNDS[roomId]);
    assert(face, `${roomId}/${installation.id} is not assigned to one of its six half-room wall faces`);
    faceCounts.set(face, (faceCounts.get(face) ?? 0) + 1);
    faceInstallations.set(face, [...(faceInstallations.get(face) ?? []), installation]);
  }
  const requiredFaces = ['outer-west', 'north-west', 'south-west', 'outer-east', 'north-east', 'south-east'];
  assert.deepEqual(sorted([...faceCounts.keys()]), sorted(requiredFaces), `${roomId} leaves a usable half-room wall blank`);
  assert.equal((faceCounts.get('north-west') ?? 0), 1, `${roomId} north-west return wall must have one centred exhibit`);
  assert.equal((faceCounts.get('south-west') ?? 0), 1, `${roomId} south-west return wall must have one centred exhibit`);
  assert.equal((faceCounts.get('north-east') ?? 0), 1, `${roomId} north-east return wall must have one centred exhibit`);
  assert.equal((faceCounts.get('south-east') ?? 0), 1, `${roomId} south-east return wall must have one centred exhibit`);
  assert((faceCounts.get('outer-west') ?? 0) <= 3, `${roomId} overloads its west outer wall`);
  assert((faceCounts.get('outer-east') ?? 0) <= 3, `${roomId} overloads its east outer wall`);

  const roomBounds = GALLERY_01_ROOM_BOUNDS[roomId];
  const roomCenterZ = (roomBounds.minZ + roomBounds.maxZ) / 2;
  for (const face of ['outer-west', 'outer-east']) {
    const faceItems = faceInstallations.get(face);
    assert(faceItems?.length, `${roomId}/${face} is blank`);
    const zPositions = faceItems.map(({position}) => position.z).sort((a, b) => a - b);
    approx(zPositions.reduce((sum, value) => sum + value, 0) / zPositions.length, roomCenterZ, `${roomId}/${face} group centre`);
    if (zPositions.length > 2) {
      const gaps = zPositions.slice(1).map((value, index) => value - zPositions[index]);
      for (const gap of gaps.slice(1)) approx(gap, gaps[0], `${roomId}/${face} even spacing`, .05);
    }
  }

  for (const face of ['north-west', 'south-west']) {
    approx(faceInstallations.get(face)[0].position.x, -7.5, `${roomId}/${face} wall centre`);
  }
  for (const face of ['north-east', 'south-east']) {
    approx(faceInstallations.get(face)[0].position.x, 7.5, `${roomId}/${face} wall centre`);
  }

  for (const side of ['west', 'east']) {
    const observedSequence = roomInstallations
      .filter(({position}) => side === 'west' ? position.x < 0 : position.x > 0)
      .sort((first, second) => second.position.z - first.position.z)
      .map(({id}) => id);
    assert.deepEqual(
      observedSequence,
      GALLERY_01_CURATORIAL_WALL_SEQUENCES[roomId][side],
      `${roomId}/${side} intellectual sequence or adjacency changed`,
    );
  }
}

const entranceSign = gallery.layout.signs.find(({id}) => id === `${MEDITERRANEAN_GALLERY_ID}:entrance-sign`);
assert(entranceSign, 'Gallery 01 entrance sign is missing');
assert.deepEqual(entranceSign.position, {x: 0, y: 4.52, z: 27.78}, 'Gallery 01 entrance sign left the S0 lintel');
approx(entranceSign.rotationY, Math.PI, 'Gallery 01 entrance sign facing');
assert(entranceSign.title.trim() && entranceSign.kicker.trim() && entranceSign.subtitle.trim(), 'Gallery 01 entrance sign has a blank face');
assert.match(entranceSign.subtitle, /Room 01.*Miletus.*natural explanation/, 'Gallery 01 entrance sign no longer introduces the opening room');
const roomSigns = gallery.layout.signs.filter(({kind}) => kind === 'zone');
assert.equal(roomSigns.length, 3, 'Gallery 01 should use only the three internal threshold signs');
for (const sign of roomSigns) {
  approx(sign.position.x, 0, `${sign.id} threshold centre`);
  approx(sign.position.y, 4.52, `${sign.id} lintel height`);
  approx(sign.rotationY, Math.PI, `${sign.id} visitor-facing rotation`);
  assert(sign.title.trim() && sign.kicker.trim() && sign.subtitle.trim(), `${sign.id} has a blank face`);
}

const physicalRoomOrder = [
  'med-orientation-nature',
  'med-being-change-plurality',
  'med-sophists-socratic',
  'med-plato-aristotle',
];
assert.deepEqual(
  physicalRoomOrder,
  program.rooms.map(({id}) => id),
  'Gallery 01 physical S0-to-N0 order diverges from its canonical editorial array',
);
assert.equal(physicalRoomOrder.at(-1), 'med-plato-aristotle', 'Plato and Aristotle are no longer in Gallery 01’s final room');
assert.deepEqual(
  gallery.layout.primaryCirculation.points,
  [{x: 0, z: 26}, {x: 0, z: 0}, {x: 0, z: -26}],
  'Gallery 01 primary circulation no longer follows the S0-to-N0 visitor sequence',
);
for (const roomId of physicalRoomOrder) {
  const bounds = GALLERY_01_ROOM_BOUNDS[roomId];
  const southApproach = {x: 0, z: bounds.maxZ - .8};
  const northApproach = {x: 0, z: bounds.minZ + .8};
  assert(!installations.some(({bounds: obstacle}) => circleIntersectsBounds(southApproach, .34, obstacle)), `${roomId} south approach is blocked`);
  assert(!installations.some(({bounds: obstacle}) => circleIntersectsBounds(northApproach, .34, obstacle)), `${roomId} north approach is blocked`);
}

const legacy = ANCIENT_GREEK_HALL_DEFINITION.layout;
const gallery02Passage = legacy.spatialCells.find(({id}) => id === 'early-modern-transition-passage');
assert(gallery02Passage, 'The preserved Gallery 02 transition passage is missing');
assert(
  legacy.spatialConnections.some(({id}) => id === 'late-to-early-modern-threshold'),
  'The preserved Gallery 01-to-02 spatial connection is missing',
);
const legacyRouteEnd = legacy.primaryCirculation.points.at(-1);
assert(legacyRouteEnd && contains(gallery02Passage.bounds, rotatedBounds(legacyRouteEnd, 0, 0, 0)), 'The Gallery 02 route no longer reaches its passage');
for (const collider of legacy.obstacleColliders) {
  const bounds = rotatedBounds(collider.center, collider.rotation ?? 0, collider.size.width, collider.size.depth);
  assert(!overlaps(bounds, gallery02Passage.bounds), `${collider.id} blocks the preserved Gallery 02 transition`);
}

console.log(
  `Gallery 01 placement audit passed: ${primaryById.size} primaries, ${supplementalById.size} supplemental works, `
  + `${program.rooms.length} rooms in S0-to-N0 physical order, ${installations.length} physical placements, `
  + `${GALLERY_01_DOORWAY_CLEARANCES.length} doorway clearances.`,
);
