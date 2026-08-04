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
  GALLERY_01_HALL_BOUNDS,
  GALLERY_01_ORIENTATION_PLACEMENT,
  GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS,
  GALLERY_01_PRIMARY_PLACEMENTS,
  GALLERY_01_ROOM_ANCHORS,
  GALLERY_01_ROOM_BOUNDS,
  GALLERY_01_ROOM_PRIMARY_IDS,
  GALLERY_01_ROUTE_HALF_WIDTH,
  GALLERY_01_ROUTE_STEERING_MARGIN,
  GALLERY_01_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  MEDITERRANEAN_GALLERY_ID,
  MEDITERRANEAN_ORIENTATION_DISPLAY,
  MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY,
  MUSEUM_CANONICAL_PROGRAM,
  MUSEUM_RUNTIME_NODES,
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
  GALLERY_01_ORIENTATION_PLACEMENT.center,
  GALLERY_01_ORIENTATION_PLACEMENT.rotation,
  GALLERY_01_ORIENTATION_PLACEMENT.size.width + .18,
  Math.max(GALLERY_01_ORIENTATION_PLACEMENT.size.depth, .24),
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
assert.equal(supplementalById.size, 4, 'Gallery 01 must retain two context and two Plato supplemental installations');
assert.equal(new Set(gallery.layout.obstacleColliders.map(({id}) => id)).size, gallery.layout.obstacleColliders.length, 'Gallery 01 has duplicate collider ids');

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
for (const [id, authored] of Object.entries(supplementalPlacementContracts)) {
  const layout = supplementalById.get(id);
  assert(layout, `${id} is absent from Gallery 01`);
  const expectedRoomId = id === 'greek-philosophy-reception'
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

assert.deepEqual(MEDITERRANEAN_ORIENTATION_DISPLAY.center, GALLERY_01_ORIENTATION_PLACEMENT.center, 'Orientation center is stale');
approx(MEDITERRANEAN_ORIENTATION_DISPLAY.rotation, GALLERY_01_ORIENTATION_PLACEMENT.rotation, 'Orientation rotation');
assert(contains(GALLERY_01_ROOM_BOUNDS['med-orientation-nature'], orientationPhysicalBounds, .08), 'Orientation structure leaves Room 01');
visibleFacing(
  MEDITERRANEAN_ORIENTATION_DISPLAY.center,
  MEDITERRANEAN_ORIENTATION_DISPLAY.rotation,
  {x: MEDITERRANEAN_ORIENTATION_DISPLAY.center.x, z: -23.7},
  'Gallery 01 orientation installation',
);
installations.push({
  id: MEDITERRANEAN_ORIENTATION_DISPLAY.id,
  roomId: 'med-orientation-nature',
  kind: 'orientation',
  position: MEDITERRANEAN_ORIENTATION_DISPLAY.center,
  rotationY: MEDITERRANEAN_ORIENTATION_DISPLAY.rotation,
  bounds: orientationPhysicalBounds,
});

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
}

const entranceSign = gallery.layout.signs.find(({id}) => id === `${MEDITERRANEAN_GALLERY_ID}:entrance-sign`);
assert(entranceSign, 'Gallery 01 entrance sign is missing');
assert.deepEqual(entranceSign.position, {x: 0, y: 4.52, z: 27.78}, 'Gallery 01 entrance sign left the S0 lintel');
approx(entranceSign.rotationY, Math.PI, 'Gallery 01 entrance sign facing');
assert(entranceSign.title.trim() && entranceSign.kicker.trim() && entranceSign.subtitle.trim(), 'Gallery 01 entrance sign has a blank face');
const roomSigns = gallery.layout.signs.filter(({kind}) => kind === 'zone');
assert.equal(roomSigns.length, 3, 'Gallery 01 should use only the three internal threshold signs');
for (const sign of roomSigns) {
  approx(sign.position.x, 0, `${sign.id} threshold centre`);
  approx(sign.position.y, 4.52, `${sign.id} lintel height`);
  approx(sign.rotationY, Math.PI, `${sign.id} visitor-facing rotation`);
  assert(sign.title.trim() && sign.kicker.trim() && sign.subtitle.trim(), `${sign.id} has a blank face`);
}

const physicalRoomOrder = [
  'med-plato-aristotle',
  'med-sophists-socratic',
  'med-being-change-plurality',
  'med-orientation-nature',
];
assert.deepEqual(
  physicalRoomOrder,
  [...program.rooms.map(({id}) => id)].reverse(),
  'Gallery 01 physical S0-to-N0 order no longer reverses its canonical editorial array',
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
