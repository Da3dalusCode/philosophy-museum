import assert from 'node:assert/strict';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
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
      export * from '/src/data/museum/museumAssets.ts';
      export * from '/src/data/museum/museumInterpretations.ts';
      export * from '/src/components/MuseumGallery/museumMovement.ts';
      export * from '/src/components/MuseumGallery/museumPointerLockState.ts';
      export * from '/src/components/MuseumGallery/museumRuntime.ts';
      export * from '/src/components/MuseumGallery/museumSession.ts';
      export * from '/src/components/MuseumGallery/museumVisitState.ts';
      export * from '/src/components/MuseumGallery/museumWorldTransform.ts';
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
const moduleUrl = `data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`;
const museum = await import(moduleUrl);
const {
  ANCIENT_GREEK_HALL_LAYOUT: layout,
  ANCIENT_GREEK_HALL_DEFINITION: definition,
  MUSEUM_ASSETS,
  MUSEUM_HALLS,
  MUSEUM_INTERPRETATIONS,
  branches,
  philosophers,
  circleIntersectsCollider,
  isValidMuseumPosition,
  moveWithCollisions,
  nearestInteractable,
  normalizeMoveInput,
  parseMuseumSession,
  sanitizeMuseumPose,
  setMuseumMovementDisplacement,
  hasMuseumBrowserModifier,
  createMuseumExhibitVisitContext,
  directMuseumVisitContext,
  museumHistoryStateWithVisitContext,
  parseMuseumExhibitVisitContext,
  resolveMuseumExitPolicy,
  resolveMuseumCloseResumeStrategy,
  MUSEUM_POINTER_LOCK_SETTLED,
  museumPointerLockEventFailureRequestId,
  museumPointerLockSurvivesBlockedOverlay,
  transitionMuseumPointerLock,
  museumPhaseHasActiveIntent,
  positionInsideSpatialUnion,
  transitionMuseumVisitPhase,
  museumPointToWorld,
  museumPoseToWorld,
} = museum;

let checks = 0;
const check = (name, assertion) => {
  assertion();
  checks += 1;
  console.log(`✓ ${name}`);
};
const unique = (values) => new Set(values).size === values.length;
const finitePoint = (point) => Number.isFinite(point.x) && Number.isFinite(point.z);
const boundsContainPoint = (bounds, point, radius = 0) => point.x >= bounds.minX + radius - 1e-7
  && point.x <= bounds.maxX - radius + 1e-7
  && point.z >= bounds.minZ + radius - 1e-7
  && point.z <= bounds.maxZ - radius + 1e-7;
const insideBounds = (point, radius = 0) => point.x >= layout.bounds.minX + radius
  && point.x <= layout.bounds.maxX - radius
  && point.z >= layout.bounds.minZ + radius
  && point.z <= layout.bounds.maxZ - radius;
const intersects = (point, radius, collider) => {
  const cos = Math.cos(-collider.rotation);
  const sin = Math.sin(-collider.rotation);
  const dx = point.x - collider.center.x;
  const dz = point.z - collider.center.z;
  const localX = dx * cos - dz * sin;
  const localZ = dx * sin + dz * cos;
  const halfWidth = collider.size.width / 2;
  const halfDepth = collider.size.depth / 2;
  const nearestX = Math.max(-halfWidth, Math.min(halfWidth, localX));
  const nearestZ = Math.max(-halfDepth, Math.min(halfDepth, localZ));
  return Math.hypot(localX - nearestX, localZ - nearestZ) < radius - 1e-7;
};
const allColliders = [...layout.wallColliders, ...layout.obstacleColliders];
const aabbOverlaps = (first, second) => {
  const separated = Math.abs(first.center.x - second.center.x) >= (first.size.width + second.size.width) / 2
    || Math.abs(first.center.y - second.center.y) >= (first.size.height + second.size.height) / 2
    || Math.abs(first.center.z - second.center.z) >= (first.size.depth + second.size.depth) / 2;
  return !separated;
};
const horizontalGap = (first, second) => Math.abs(first.center.x - second.center.x)
  - (first.size.width + second.size.width) / 2;
const volumeInsideFootprint = (volume, footprint) => (
  Math.abs(volume.center.x) + volume.size.width / 2 <= footprint.width / 2 + 1e-7
  && volume.center.y - volume.size.height / 2 >= -1e-7
  && volume.center.y + volume.size.height / 2 <= footprint.height + 1e-7
  && Math.abs(volume.center.z) + volume.size.depth / 2 <= footprint.depth / 2 + 1e-7
);
const wordCount = (value) => value.trim().split(/\s+/).filter(Boolean).length;
const footprintWorldExtents = (exhibit) => {
  const cosine = Math.abs(Math.cos(exhibit.rotationY));
  const sine = Math.abs(Math.sin(exhibit.rotationY));
  return {
    x: (exhibit.scene.footprint.width * cosine + exhibit.scene.footprint.depth * sine) / 2,
    z: (exhibit.scene.footprint.width * sine + exhibit.scene.footprint.depth * cosine) / 2,
  };
};
const rotatedRectangleCorners = (center, size, rotation) => {
  const cosine = Math.cos(rotation);
  const sine = Math.sin(rotation);
  return [-size.width / 2, size.width / 2].flatMap((localX) =>
    [-size.depth / 2, size.depth / 2].map((localZ) => ({
      x: center.x + localX * cosine + localZ * sine,
      z: center.z - localX * sine + localZ * cosine,
    })));
};
const rotatedBoxCorners = (center, size, rotation) => {
  const cosine = Math.cos(rotation);
  const sine = Math.sin(rotation);
  return [-size.width / 2, size.width / 2].flatMap((localX) =>
    [-size.height / 2, size.height / 2].flatMap((localY) =>
      [-size.depth / 2, size.depth / 2].map((localZ) => ({
        x: center.x + localX * cosine + localZ * sine,
        y: center.y + localY,
        z: center.z - localX * sine + localZ * cosine,
      }))));
};
const projectMuseumPoint = (pose, point) => {
  const delta = {x: point.x - pose.x, y: point.y - layout.eyeHeight, z: point.z - pose.z};
  const cosineYaw = Math.cos(pose.yaw);
  const sineYaw = Math.sin(pose.yaw);
  const cosinePitch = Math.cos(pose.pitch);
  const sinePitch = Math.sin(pose.pitch);
  const cameraX = cosineYaw * delta.x - sineYaw * delta.z;
  const yawedZ = sineYaw * delta.x + cosineYaw * delta.z;
  const cameraY = cosinePitch * delta.y + sinePitch * yawedZ;
  const depth = sinePitch * delta.y - cosinePitch * yawedZ;
  assert(depth > .08, `${JSON.stringify(point)} extends behind the Museum camera`);
  const tanHalfVerticalFov = Math.tan(layout.cameraFov * Math.PI / 360);
  return {
    x: cameraX / (depth * tanHalfVerticalFov * (16 / 9)),
    y: cameraY / (depth * tanHalfVerticalFov),
  };
};
const projectedScreenBounds = (pose, points) => {
  const projected = points.map((point) => projectMuseumPoint(pose, point));
  const minX = Math.min(...projected.map(({x}) => x));
  const maxX = Math.max(...projected.map(({x}) => x));
  const minY = Math.min(...projected.map(({y}) => y));
  const maxY = Math.max(...projected.map(({y}) => y));
  return {
    minX,
    maxX,
    minY,
    maxY,
    widthPixels: (maxX - minX) * 960,
    heightPixels: (maxY - minY) * 540,
  };
};
const segmentLength = (start, end) => Math.hypot(end.x - start.x, end.z - start.z);
const sampleClearSegment = (start, end, label) => {
  const samples = Math.max(1, Math.ceil(segmentLength(start, end) / .08));
  for (let index = 0; index <= samples; index += 1) {
    const fraction = index / samples;
    const point = {x: start.x + (end.x - start.x) * fraction, z: start.z + (end.z - start.z) * fraction};
    assert(positionInsideSpatialUnion(point, layout.playerRadius, layout.spatialCells), `${label} exits the wing near ${JSON.stringify(point)}`);
    assert(!allColliders.some((collider) => intersects(point, layout.playerRadius, collider)), `${label} hits ${JSON.stringify(point)}`);
  }
};
const localPointToHall = (exhibit, point) => {
  const cosine = Math.cos(exhibit.rotationY);
  const sine = Math.sin(exhibit.rotationY);
  return {
    x: exhibit.position.x + point.x * cosine + point.z * sine,
    y: point.y,
    z: exhibit.position.z - point.x * sine + point.z * cosine,
  };
};
const installationWorldCorners = (exhibit) => {
  const scene = exhibit.scene;
  const renderedVolumes = [
    ...scene.objectBounds,
    ...scene.mediaMounts.flatMap(({bounds, supportBounds}) => [bounds, supportBounds]),
    scene.plaque.bounds,
    scene.plaque.supportBounds,
  ];
  return renderedVolumes.flatMap((renderedVolume) =>
    rotatedBoxCorners(renderedVolume.center, renderedVolume.size, 0)
      .map((point) => localPointToHall(exhibit, point)));
};

check('one initial Museum hall and the ancient Greek hall exist', () => {
  assert.equal(MUSEUM_HALLS.length, 1);
  assert.equal(MUSEUM_HALLS[0].id, 'ancient-greek');
  assert.equal(layout.id, MUSEUM_HALLS[0].id);
});

check('the catalog contains eight unique exhibits in three unique zones', () => {
  const hall = MUSEUM_HALLS[0];
  assert.equal(hall.exhibits.length, 8);
  assert.equal(hall.zones.length, 3);
  assert(unique(hall.exhibits.map(({id}) => id)));
  assert(unique(hall.zones.map(({id}) => id)));
  const zones = new Set(hall.zones.map(({id}) => id));
  for (const exhibit of hall.exhibits) assert(zones.has(exhibit.zoneId));
});

check('exhibit entity references exist and match their declared kinds', () => {
  const philosopherIds = new Set(philosophers.map(({id}) => id));
  const branchIds = new Set(branches.map(({id}) => id));
  for (const exhibit of MUSEUM_HALLS[0].exhibits) {
    assert.equal(exhibit.id, exhibit.entityId, `${exhibit.id} must keep a stable entity-matching exhibit ID`);
    const targets = exhibit.entityKind === 'philosopher' ? philosopherIds : branchIds;
    assert(targets.has(exhibit.entityId), `${exhibit.id} has an unknown ${exhibit.entityKind} target`);
  }
});

check('the mandated three-zone collection shape is preserved', () => {
  const exhibits = MUSEUM_HALLS[0].exhibits;
  const count = (zoneId, entityKind) => exhibits.filter((item) =>
    item.zoneId === zoneId && item.entityKind === entityKind).length;
  assert.equal(count('classical-foundations', 'philosopher'), 3);
  assert.equal(count('classical-foundations', 'branch'), 0);
  assert.equal(count('hellenistic-ways', 'branch'), 4);
  assert.equal(count('hellenistic-ways', 'philosopher'), 0);
  assert.equal(count('late-antiquity', 'branch'), 1);
  assert.equal(count('late-antiquity', 'philosopher'), 0);
});

check('guided order contains every exhibit exactly once', () => {
  const hall = MUSEUM_HALLS[0];
  assert.equal(hall.guidedOrder.length, hall.exhibits.length);
  assert(unique(hall.guidedOrder));
  assert.deepEqual([...hall.guidedOrder].sort(), hall.exhibits.map(({id}) => id).sort());
});

check('the route catalog and full layout agree exactly', () => {
  assert.deepEqual(
    layout.exhibits.map(({id}) => id).sort(),
    MUSEUM_HALLS[0].exhibits.map(({id}) => id).sort(),
  );
  assert.deepEqual([...layout.guidedOrder], [...MUSEUM_HALLS[0].guidedOrder]);
});

check('bounds, spawn, reset, placements, and viewpoints are finite', () => {
  assert(layout.bounds.minX < layout.bounds.maxX && layout.bounds.minZ < layout.bounds.maxZ);
  assert(layout.playerRadius > 0 && layout.eyeHeight > 0 && layout.cameraFar >= 100);
  assert(layout.cameraFov >= 60 && layout.cameraFov <= 75);
  assert(finitePoint(layout.spawnFocalPoint));
  for (const pose of [layout.spawn, layout.reset]) {
    assert(finitePoint(pose) && Number.isFinite(pose.yaw) && Number.isFinite(pose.pitch));
  }
  for (const exhibit of layout.exhibits) {
    assert(finitePoint(exhibit.position));
    assert(finitePoint(exhibit.viewpoint));
    assert(Number.isFinite(exhibit.rotationY));
    assert(Number.isFinite(exhibit.viewpoint.yaw) && Number.isFinite(exhibit.viewpoint.pitch));
    assert(exhibit.interactionRadius > 0);
  }
  for (const entry of layout.entryViews) {
    assert(finitePoint(entry.pose));
    assert(Number.isFinite(entry.pose.yaw) && Number.isFinite(entry.pose.pitch));
    assert(entry.expectedVisibleExhibitIds.length > 0);
  }
});

check('all collider dimensions and rotations are valid', () => {
  assert(unique(allColliders.map(({id}) => id)));
  for (const collider of allColliders) {
    assert(finitePoint(collider.center));
    assert(collider.size.width > 0 && collider.size.depth > 0);
    assert(Number.isFinite(collider.rotation));
  }
});

check('spawn, reset, and viewpoints are safe for the player footprint', () => {
  for (const [label, point] of [
    ['spawn', layout.spawn],
    ['reset', layout.reset],
    ...layout.exhibits.map((exhibit) => [`${exhibit.id} viewpoint`, exhibit.viewpoint]),
    ...layout.entryViews.map((entry) => [`${entry.spatialCellId} entry`, entry.pose]),
  ]) {
    assert(insideBounds(point, layout.playerRadius), `${label} is outside the walkable bounds`);
    assert(positionInsideSpatialUnion(point, layout.playerRadius, layout.spatialCells), `${label} is outside the spatial-cell union`);
    assert(!allColliders.some((collider) => intersects(point, layout.playerRadius, collider)), `${label} intersects a collider`);
  }
});

check('spawn fully frames the orientation furnishings without beginning inside an exhibit radius', () => {
  assert.equal(nearestInteractable(layout.spawn, layout.exhibits), undefined);
  const heading = setMuseumMovementDisplacement({x: 0, z: 0}, {x: 0, z: 1}, layout.spawn.yaw, 1);
  const orientationIds = new Set(['atrium-orientation-plinth', 'atrium-bench']);
  const orientationObjects = layout.furnishings.filter(({id}) => orientationIds.has(id));
  assert.equal(orientationObjects.length, 2);
  const projectedById = new Map();
  for (const object of orientationObjects) {
    const delta = {x: object.center.x - layout.spawn.x, z: object.center.z - layout.spawn.z};
    const distance = Math.hypot(delta.x, delta.z);
    const viewDot = (heading.x * delta.x + heading.z * delta.z) / distance;
    assert(distance > 5 && distance < 10, `${object.id} is not composed into the arrival view`);
    assert(viewDot > Math.cos(51 * Math.PI / 180), `${object.id} falls outside the arrival view`);
    const projected = projectedScreenBounds(layout.spawn, rotatedBoxCorners(
      {x: object.center.x, y: object.height / 2, z: object.center.z},
      {...object.size, height: object.height},
      object.rotation,
    ));
    projectedById.set(object.id, projected);
    assert(projected.minX >= -.9 && projected.maxX <= .9, `${object.id} is horizontally clipped at the 1920×1080 arrival view`);
    assert(projected.minY >= -.9 && projected.maxY <= .9, `${object.id} is vertically clipped at the 1920×1080 arrival view`);
    assert(projected.widthPixels >= 300 && projected.heightPixels >= 80, `${object.id} is too small to register as an arrival cue`);
  }
  const orientation = projectedById.get('atrium-orientation-plinth');
  const bench = projectedById.get('atrium-bench');
  assert(orientation.maxX < 0 && bench.minX > 0, 'arrival furnishings must frame the central gallery axis');
});

check('the spawn faces a clear focal sightline through the opening sequence', () => {
  const heading = setMuseumMovementDisplacement({x: 0, z: 0}, {x: 0, z: 1}, layout.spawn.yaw, 1);
  const delta = {
    x: layout.spawnFocalPoint.x - layout.spawn.x,
    z: layout.spawnFocalPoint.z - layout.spawn.z,
  };
  const distance = Math.hypot(delta.x, delta.z);
  assert(distance > 10, 'spawn focal point is too close to establish the gallery axis');
  assert((heading.x * delta.x + heading.z * delta.z) / distance > .999);
  for (let index = 0; index <= 80; index += 1) {
    const fraction = index / 80;
    const sample = {
      x: layout.spawn.x + delta.x * fraction,
      z: layout.spawn.z + delta.z * fraction,
    };
    assert(positionInsideSpatialUnion(sample, 0, layout.spatialCells), `sightline exits the gallery near ${JSON.stringify(sample)}`);
    assert(!layout.wallColliders.some((collider) => intersects(sample, .04, collider)), `wall blocks spawn sightline near ${JSON.stringify(sample)}`);
  }
});

check('core movement and collision functions handle representative boundaries', () => {
  const diagonal = normalizeMoveInput(1, 1);
  assert(Math.abs(Math.hypot(diagonal.x, diagonal.z) - 1) < 1e-9);
  const wall = layout.wallColliders.find(({id}) => id === 'atrium-west');
  assert(wall);
  assert(circleIntersectsCollider(wall.center, layout.playerRadius, wall));
  const bounded = moveWithCollisions(
    layout.spawn,
    {x: -100, z: 0},
    layout.playerRadius,
    layout.bounds,
    allColliders,
    layout.spatialCells,
  );
  assert(isValidMuseumPosition(bounded, layout.playerRadius, layout.bounds, allColliders, layout.spatialCells));
  assert(bounded.x >= layout.bounds.minX + layout.playerRadius);
  const plinth = layout.exhibits.find(({id}) => id === 'plato').collider;
  const platoViewpoint = layout.exhibits.find(({id}) => id === 'plato').viewpoint;
  const towardPlato = {
    x: plinth.center.x - platoViewpoint.x,
    z: plinth.center.z - platoViewpoint.z,
  };
  const towardPlatoLength = Math.hypot(towardPlato.x, towardPlato.z);
  const blocked = moveWithCollisions(
    platoViewpoint,
    {x: towardPlato.x / towardPlatoLength * 5, z: towardPlato.z / towardPlatoLength * 5},
    layout.playerRadius,
    layout.bounds,
    allColliders,
    layout.spatialCells,
  );
  assert(!circleIntersectsCollider(blocked, layout.playerRadius, plinth));
  assert(positionInsideSpatialUnion(blocked, layout.playerRadius, layout.spatialCells));
  const throughThreshold = moveWithCollisions(
    {x: 0, z: 30.5},
    {x: 0, z: -7},
    layout.playerRadius,
    layout.bounds,
    allColliders,
    layout.spatialCells,
  );
  assert(throughThreshold.z < 26, 'movement did not pass through the atrium/classical connection');
  assert(positionInsideSpatialUnion(throughThreshold, layout.playerRadius, layout.spatialCells));
});

check('movement and every recommended viewpoint follow the rendered camera heading', () => {
  for (const yaw of [0, Math.PI / 4, Math.PI / 2, -Math.PI / 2]) {
    const heading = setMuseumMovementDisplacement({x: 0, z: 0}, {x: 0, z: 1}, yaw, 1);
    assert(Math.abs(heading.x + Math.sin(yaw)) < 1e-9);
    assert(Math.abs(heading.z + Math.cos(yaw)) < 1e-9);
  }
  for (const exhibit of layout.exhibits) {
    const heading = setMuseumMovementDisplacement(
      {x: 0, z: 0},
      {x: 0, z: 1},
      exhibit.viewpoint.yaw,
      1,
    );
    const dx = exhibit.position.x - exhibit.viewpoint.x;
    const dz = exhibit.position.z - exhibit.viewpoint.z;
    const distance = Math.hypot(dx, dz);
    const facingDot = (heading.x * dx + heading.z * dz) / distance;
    assert(facingDot > .99, `${exhibit.id} viewpoint must face its installation`);
    assert.equal(nearestInteractable(exhibit.viewpoint, layout.exhibits), exhibit.id, `${exhibit.id} viewpoint must keep its exhibit interactable`);
  }
});

check('Classical and Hellenistic entry views fully frame multiple front-facing exhibits', () => {
  for (const entry of layout.entryViews) {
    const cell = layout.spatialCells.find(({id}) => id === entry.spatialCellId);
    assert(cell && cell.kind === 'room');
    assert(boundsContainPoint(cell.bounds, entry.pose, layout.playerRadius));
    assert(entry.expectedVisibleExhibitIds.length >= 2, `${entry.spatialCellId} needs at least two arrival exhibits`);
    for (const id of entry.expectedVisibleExhibitIds) {
      const exhibit = layout.exhibits.find((item) => item.id === id);
      assert(exhibit && exhibit.spatialCellId === entry.spatialCellId);
      const worldCorners = installationWorldCorners(exhibit);
      const projected = projectedScreenBounds(entry.pose, worldCorners);
      assert(projected.minX >= -.9 && projected.maxX <= .9, `${id} is horizontally clipped at the 1920×1080 ${entry.spatialCellId} entry`);
      assert(projected.minY >= -.9 && projected.maxY <= .9, `${id} is vertically clipped at the 1920×1080 ${entry.spatialCellId} entry`);
      assert(projected.widthPixels >= 120 && projected.heightPixels >= 150, `${id} is too small to establish the ${entry.spatialCellId} composition`);
      assert(projected.widthPixels * projected.heightPixels >= 20_000, `${id} lacks enough projected area at the ${entry.spatialCellId} entry`);
      const exhibitFront = {x: exhibit.viewpoint.x - exhibit.position.x, z: exhibit.viewpoint.z - exhibit.position.z};
      const viewer = {x: entry.pose.x - exhibit.position.x, z: entry.pose.z - exhibit.position.z};
      const frontFacing = (exhibitFront.x * viewer.x + exhibitFront.z * viewer.z)
        / (Math.hypot(exhibitFront.x, exhibitFront.z) * Math.hypot(viewer.x, viewer.z));
      assert(frontFacing >= .5, `${id} turns too far away from the entry`);
      for (const target of worldCorners) {
        for (let index = 0; index < 30; index += 1) {
          const fraction = index / 30;
          const sample = {x: entry.pose.x + (target.x - entry.pose.x) * fraction, z: entry.pose.z + (target.z - entry.pose.z) * fraction};
          assert(!layout.wallColliders.some((wall) => intersects(sample, .02, wall)), `${id} is partly hidden by a wall from ${entry.spatialCellId}`);
        }
      }
    }
  }
});

check('camera session parsing rejects malformed and unsafe values', () => {
  const valid = JSON.stringify({version: 1, hallId: layout.id, ...layout.spawn});
  assert(parseMuseumSession(valid, layout));
  assert.equal(parseMuseumSession('{bad json', layout), undefined);
  assert.equal(parseMuseumSession(JSON.stringify({version: 1, hallId: 'wrong', ...layout.spawn}), layout), undefined);
  assert.equal(parseMuseumSession(JSON.stringify({version: 1, hallId: layout.id, x: null, z: 0, yaw: 0, pitch: 0}), layout), undefined);
  assert.equal(sanitizeMuseumPose({...layout.spawn, x: Number.POSITIVE_INFINITY}, layout), undefined);
  const insidePlinth = layout.exhibits.find(({id}) => id === 'plato').collider.center;
  assert.equal(sanitizeMuseumPose({...insidePlinth, yaw: 0, pitch: 0}, layout), undefined);
  const insideGlobalBoundsButOutsideWing = {x: 11, z: 35, yaw: 0, pitch: 0};
  assert(insideBounds(insideGlobalBoundsButOutsideWing, layout.playerRadius));
  assert.equal(positionInsideSpatialUnion(insideGlobalBoundsButOutsideWing, layout.playerRadius, layout.spatialCells), false);
  assert.equal(sanitizeMuseumPose(insideGlobalBoundsButOutsideWing, layout), undefined);
});

check('the authored central route remains clear of walls and exhibit obstacles', () => {
  const routeSegments = [
    [{x: 0, z: 40}, {x: 0, z: 13}],
    [{x: 0, z: 13}, {x: 2.5, z: 12}],
    [{x: 2.5, z: 12}, {x: 2.5, z: 6.5}],
    [{x: 2.5, z: 6.5}, {x: 0, z: 4}],
    [{x: 0, z: 4}, {x: 0, z: -19}],
    [{x: 0, z: -19}, {x: 0, z: -29.3}],
  ];
  for (const [start, end] of routeSegments) {
    for (let index = 0; index <= 80; index += 1) {
      const fraction = index / 80;
      const point = {x: start.x + (end.x - start.x) * fraction, z: start.z + (end.z - start.z) * fraction};
      assert(positionInsideSpatialUnion(point, layout.playerRadius, layout.spatialCells), `central route exits the wing near ${JSON.stringify(point)}`);
      assert(!allColliders.some((collider) => intersects(point, layout.playerRadius, collider)), `central route hits ${JSON.stringify(point)}`);
    }
  }
});

check('the world definition is the single source for the current hall boundary', () => {
  assert.equal(definition.id, layout.id);
  assert.equal(definition.layout, layout);
  assert.deepEqual(definition.worldTransform, {x: 0, z: 0, yaw: 0});
  assert.deepEqual(definition.entrances.map(({id}) => id), ['south-entry']);
  assert.deepEqual(definition.entrances[0].arrivalPose, layout.spawn);
  assert(definition.entrances[0].transitionBounds.size.width > 0);
  assert(definition.entrances[0].transitionBounds.size.depth > 0);
  assert.deepEqual(definition.connections, []);
  assert.deepEqual(definition.prefetch.adjacentHallIds, []);
  const catalogAssetIds = MUSEUM_HALLS[0].exhibits.flatMap((item) => [item.principalAssetId, ...item.supportingAssetIds]);
  assert.deepEqual([...definition.prefetch.sceneAssetIds].sort(), [...catalogAssetIds].sort());
});

check('walls and systematic neutral exhibit lighting are data-authored once', () => {
  assert.equal(layout.wallColliders.length, 28);
  assert(unique(layout.wallColliders.map(({id}) => id)));
  assert(layout.wallColliders.every(({height}) => Number.isFinite(height) && height >= 5));
  assert(!layout.obstacleColliders.some(({id}) => layout.wallColliders.some((wall) => wall.id === id)));
  assert(layout.lighting.ambientIntensity > 0 && layout.lighting.ambientIntensity < .5);
  assert(layout.lighting.hemisphereIntensity >= .8);
  assert(layout.lighting.directionalIntensity >= .7);
  assert.equal(layout.lighting.tracks.length, 7);
  assert(unique(layout.lighting.tracks.map(({id}) => id)));
  const lights = layout.lighting.exhibitLights;
  assert.equal(lights.length, layout.exhibits.length);
  assert(unique(lights.map(({id}) => id)));
  assert(unique(lights.map(({exhibitId}) => exhibitId)));
  assert.deepEqual(lights.map(({exhibitId}) => exhibitId).sort(), layout.exhibits.map(({id}) => id).sort());
  for (const light of lights) {
    const exhibit = layout.exhibits.find(({id}) => id === light.exhibitId);
    assert(exhibit, `${light.id} references a missing exhibit`);
    const cell = layout.spatialCells.find(({id}) => id === exhibit.spatialCellId);
    const track = layout.lighting.tracks.find(({id}) => id === light.trackId);
    assert(cell, `${light.id} references an exhibit outside a cell`);
    assert(track, `${light.id} references a missing fixture track`);
    assert(finitePoint(light.mountPosition) && Number.isFinite(light.mountPosition.y));
    assert(finitePoint(light.position) && Number.isFinite(light.position.y));
    assert(finitePoint(light.target) && Number.isFinite(light.target.y));
    assert.deepEqual(light.target, localPointToHall(exhibit, exhibit.scene.focalTarget));
    assert(Math.abs(light.mountPosition.y - (track.center.y - .05)) < 1e-9);
    const runsAlongX = track.size.width > track.size.depth;
    const crossAxisOffset = runsAlongX
      ? Math.abs(light.mountPosition.z - track.center.z)
      : Math.abs(light.mountPosition.x - track.center.x);
    const alongAxisOffset = runsAlongX
      ? Math.abs(light.mountPosition.x - track.center.x)
      : Math.abs(light.mountPosition.z - track.center.z);
    assert(crossAxisOffset < 1e-9, `${light.id} is not attached to ${track.id}`);
    assert(alongAxisOffset <= (runsAlongX ? track.size.width : track.size.depth) / 2 + 1e-9, `${light.id} falls beyond ${track.id}`);
    const beam = {
      x: light.target.x - light.mountPosition.x,
      y: light.target.y - light.mountPosition.y,
      z: light.target.z - light.mountPosition.z,
    };
    const beamLength = Math.hypot(beam.x, beam.y, beam.z);
    const expectedLens = {
      x: light.mountPosition.x + beam.x / beamLength * .35,
      y: light.mountPosition.y + beam.y / beamLength * .35,
      z: light.mountPosition.z + beam.z / beamLength * .35,
    };
    assert(Math.hypot(light.position.x - expectedLens.x, light.position.y - expectedLens.y, light.position.z - expectedLens.z) < 1e-9, `${light.id} does not originate at its rendered lens`);
    assert(boundsContainPoint(cell.bounds, light.position), `${light.id} is outside ${cell.id}`);
    assert.equal(light.intensity, 38);
    assert.equal(light.distance, 13);
    assert(light.angle > .2 && light.angle < .5);
    assert(light.penumbra >= .7 && light.penumbra <= 1);
  }
});

check('hall origins transform local scene and camera coordinates consistently', () => {
  const translated = {...definition, worldTransform: {x: 100, z: -40, yaw: Math.PI / 2}};
  const point = museumPointToWorld(translated, {x: 2, z: 3});
  assert(Math.abs(point.x - 103) < 1e-9);
  assert(Math.abs(point.z + 42) < 1e-9);
  const pose = museumPoseToWorld(translated, {x: 2, z: 3, yaw: -.25, pitch: .1});
  assert.deepEqual({x: pose.x, z: pose.z}, point);
  assert(Math.abs(pose.yaw - (Math.PI / 2 - .25)) < 1e-9);
  assert.equal(pose.pitch, .1);
  for (const entrance of definition.entrances) {
    assert(insideBounds(entrance.arrivalPose, layout.playerRadius), `${entrance.id} arrival is outside the hall`);
    assert(!allColliders.some((collider) => intersects(entrance.arrivalPose, layout.playerRadius, collider)), `${entrance.id} arrival intersects a collider`);
  }
});

check('seven authored spatial cells form one connected continuous gallery', () => {
  assert.equal(layout.spatialCells.length, 7);
  assert.equal(layout.spatialConnections.length, layout.spatialCells.length - 1);
  assert(unique(layout.spatialCells.map(({id}) => id)));
  assert(unique(layout.spatialConnections.map(({id}) => id)));
  const cellsById = new Map(layout.spatialCells.map((cell) => [cell.id, cell]));
  const neighbors = new Map(layout.spatialCells.map(({id}) => [id, new Set()]));
  for (const connection of layout.spatialConnections) {
    const from = cellsById.get(connection.fromCellId);
    const to = cellsById.get(connection.toCellId);
    assert(from && to, `${connection.id} references a missing cell`);
    assert.notEqual(from.id, to.id, `${connection.id} loops back to one cell`);
    assert(connection.openingBounds.minX < connection.openingBounds.maxX);
    assert(connection.openingBounds.minZ < connection.openingBounds.maxZ);
    const openingCenter = {
      x: (connection.openingBounds.minX + connection.openingBounds.maxX) / 2,
      z: (connection.openingBounds.minZ + connection.openingBounds.maxZ) / 2,
    };
    const openingTouches = (cell) => openingCenter.x >= cell.bounds.minX - .21
      && openingCenter.x <= cell.bounds.maxX + .21
      && openingCenter.z >= cell.bounds.minZ - .21
      && openingCenter.z <= cell.bounds.maxZ + .21;
    assert(openingTouches(from) && openingTouches(to), `${connection.id} does not bridge both authored cells`);
    neighbors.get(from.id).add(to.id);
    neighbors.get(to.id).add(from.id);
  }
  const reached = new Set([layout.spatialCells[0].id]);
  const queue = [layout.spatialCells[0].id];
  while (queue.length) {
    const current = queue.shift();
    for (const neighbor of neighbors.get(current)) {
      if (reached.has(neighbor)) continue;
      reached.add(neighbor);
      queue.push(neighbor);
    }
  }
  assert.equal(reached.size, layout.spatialCells.length, 'the gallery cell graph is disconnected');
  assert.deepEqual(layout.spatialCells.map(({kind}) => kind), [
    'room', 'passage', 'room', 'passage', 'room', 'passage', 'room',
  ]);
});

check('the pilot wing is materially denser while remaining larger than the original hall', () => {
  const authoredArea = layout.spatialCells.reduce((total, {bounds}) =>
    total + (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ), 0);
  assert.equal(layout.floorArea, authoredArea);
  assert(layout.floorArea > 1320, `floor area ${layout.floorArea} does not exceed the original hall`);
  assert(layout.floorArea <= 3072 * .8, `floor area ${layout.floorArea} is not materially denser than the expanded wing`);
  assert.equal(layout.floorArea, 1592);
  console.log(`  Floor area: ${layout.floorArea} units² (48.18% below the prior 3,072-unit wing)`);
  const passages = layout.spatialCells.filter(({kind}) => kind === 'passage');
  assert.equal(passages.length, 3);
  for (const passage of passages) {
    const width = passage.bounds.maxX - passage.bounds.minX;
    const depth = passage.bounds.maxZ - passage.bounds.minZ;
    assert(Math.min(width, depth) <= 3, `${passage.id} is too long to read as a threshold`);
    assert(width * depth <= 24, `${passage.id} consumes excessive empty floor`);
  }
  const exhibitRooms = layout.spatialCells.filter(({exhibitIds}) => exhibitIds.length > 0);
  for (const room of exhibitRooms) {
    const roomArea = (room.bounds.maxX - room.bounds.minX) * (room.bounds.maxZ - room.bounds.minZ);
    const areaPerExhibit = roomArea / room.exhibitIds.length;
    assert(areaPerExhibit <= (room.exhibitIds.length === 1 ? 320 : 150), `${room.id} strands its exhibits in excess floor`);
  }
});

check('the guided walking route keeps every legal consecutive path within sixteen units', () => {
  const byId = new Map(layout.exhibits.map((exhibit) => [exhibit.id, exhibit]));
  assert.equal(layout.guidedWalkLegs.length, layout.guidedOrder.length - 1);
  const gaps = layout.guidedWalkLegs.map((leg, index) => {
    const expectedFrom = layout.guidedOrder[index];
    const expectedTo = layout.guidedOrder[index + 1];
    assert.equal(leg.fromExhibitId, expectedFrom);
    assert.equal(leg.toExhibitId, expectedTo);
    const points = [byId.get(leg.fromExhibitId).viewpoint, ...leg.waypoints, byId.get(leg.toExhibitId).viewpoint];
    const segments = points.slice(1).map((point, pointIndex) => [points[pointIndex], point]);
    for (const [start, end] of segments) sampleClearSegment(start, end, `${leg.fromExhibitId} → ${leg.toExhibitId}`);
    return {
      from: leg.fromExhibitId,
      to: leg.toExhibitId,
      distance: segments.reduce((total, [start, end]) => total + segmentLength(start, end), 0),
    };
  });
  for (const gap of gaps) {
    assert(gap.distance <= 16, `${gap.from} → ${gap.to} spans ${gap.distance.toFixed(3)} units`);
    const fromCell = byId.get(gap.from).spatialCellId;
    const toCell = byId.get(gap.to).spatialCellId;
    if (fromCell !== toCell) assert(gap.distance >= 14, `${gap.from} → ${gap.to} is not an honest room-transition leg`);
  }
  const total = gaps.reduce((sum, {distance}) => sum + distance, 0);
  assert(total <= 80, `guided route total ${total.toFixed(3)} remains too dispersed`);
  assert(total / gaps.length <= 11, `guided route mean ${(total / gaps.length).toFixed(3)} remains too dispersed`);
  console.log(`  Guided walking gaps: ${gaps.map(({from, to, distance}) => `${from}→${to} ${distance.toFixed(3)}`).join('; ')}`);
  console.log(`  Guided walking total: ${total.toFixed(3)}; mean: ${(total / gaps.length).toFixed(3)}; max: ${Math.max(...gaps.map(({distance}) => distance)).toFixed(3)}`);
});

check('orientation furnishings are physical, contained, and clear of central circulation', () => {
  assert.deepEqual(layout.furnishings.map(({id}) => id).sort(), ['atrium-bench', 'atrium-orientation-plinth']);
  assert(unique(layout.furnishings.map(({id}) => id)));
  const atrium = layout.spatialCells.find(({id}) => id === 'orientation-atrium');
  assert(atrium);
  for (const furnishing of layout.furnishings) {
    assert(furnishing.height > 0);
    const corners = rotatedRectangleCorners(furnishing.center, furnishing.size, furnishing.rotation);
    assert(corners.every((corner) => boundsContainPoint(atrium.bounds, corner)), `${furnishing.id} footprint escapes the atrium`);
    assert(layout.obstacleColliders.includes(furnishing), `${furnishing.id} is rendered without collision`);
    const zValues = corners.map(({z}) => z);
    const minZ = Math.min(...zValues);
    const maxZ = Math.max(...zValues);
    for (let index = 0; index <= 20; index += 1) {
      const z = minZ + (maxZ - minZ) * index / 20;
      assert(!intersects({x: 0, z}, layout.playerRadius, furnishing), `${furnishing.id} blocks the central aisle`);
    }
  }
  const [left, right] = [...layout.furnishings].sort((first, second) => first.center.x - second.center.x);
  const xExtent = (furnishing) => Math.abs(Math.cos(furnishing.rotation)) * furnishing.size.width / 2
    + Math.abs(Math.sin(furnishing.rotation)) * furnishing.size.depth / 2;
  const playerCenterClearWidth = right.center.x - xExtent(right) - (left.center.x + xExtent(left)) - layout.playerRadius * 2;
  assert(playerCenterClearWidth >= 3, `arrival furnishings leave only ${playerCenterClearWidth.toFixed(3)} units of player-center clearance`);
});

check('every exhibit belongs to exactly one declared room and its rotated footprint fits', () => {
  const assignedIds = layout.spatialCells.flatMap(({exhibitIds}) => exhibitIds);
  assert.equal(assignedIds.length, layout.exhibits.length);
  assert(unique(assignedIds));
  assert.deepEqual([...assignedIds].sort(), layout.exhibits.map(({id}) => id).sort());
  for (const exhibit of layout.exhibits) {
    const containingCells = layout.spatialCells.filter(({bounds}) => boundsContainPoint(bounds, exhibit.position));
    assert.equal(containingCells.length, 1, `${exhibit.id} must occupy exactly one spatial cell`);
    const cell = containingCells[0];
    assert.equal(exhibit.spatialCellId, cell.id, `${exhibit.id} spatialCellId disagrees with its position`);
    assert(cell.exhibitIds.includes(exhibit.id), `${cell.id} omits ${exhibit.id}`);
    assert.equal(cell.kind, 'room', `${exhibit.id} cannot be installed in a passage`);
    const extents = footprintWorldExtents(exhibit);
    assert(boundsContainPoint(cell.bounds, exhibit.position, 0), `${exhibit.id} center escapes ${cell.id}`);
    assert(exhibit.position.x - extents.x >= cell.bounds.minX - 1e-7, `${exhibit.id} footprint crosses west edge`);
    assert(exhibit.position.x + extents.x <= cell.bounds.maxX + 1e-7, `${exhibit.id} footprint crosses east edge`);
    assert(exhibit.position.z - extents.z >= cell.bounds.minZ - 1e-7, `${exhibit.id} footprint crosses south edge`);
    assert(exhibit.position.z + extents.z <= cell.bounds.maxZ + 1e-7, `${exhibit.id} footprint crosses north edge`);
  }
});

check('exhibit footprints are compacted by 20–35 percent from the reviewed baseline', () => {
  const baselineAreas = {
    socrates: 3.25 * 2.82,
    plato: 3.25 * 2.82,
    aristotle: 3.25 * 2.82,
    cynicism: 3.65 * 3.22,
    epicureanism: 3.45 * 3.52,
    stoicism: 3.35 * 2.82,
    skepticism: 3.4 * 3.18,
    neoplatonism: 5.85 * 4.5,
  };
  for (const exhibit of layout.exhibits) {
    const compactArea = exhibit.scene.footprint.width * exhibit.scene.footprint.depth;
    const retained = compactArea / baselineAreas[exhibit.id];
    assert(retained >= .65 - 1e-7, `${exhibit.id} was reduced by more than 35%`);
    assert(retained <= .8 + 1e-7, `${exhibit.id} was reduced by less than 20%`);
  }
});

check('every installation declares supported physical mounts and contained volumes', () => {
  const supportedMounts = new Set(['wall-frame', 'recess-frame', 'lectern', 'freestanding-panel']);
  const assetIds = new Set(MUSEUM_ASSETS.map(({id}) => id));
  for (const exhibit of layout.exhibits) {
    const catalog = MUSEUM_HALLS[0].exhibits.find(({id}) => id === exhibit.id);
    assert(catalog, `${exhibit.id} is absent from the catalog`);
    const scene = exhibit.scene;
    const expectedAssets = [catalog.principalAssetId, ...catalog.supportingAssetIds];
    assert.equal(scene.mediaMounts.length, expectedAssets.length, `${exhibit.id} must mount every catalog asset exactly once`);
    assert.deepEqual(scene.mediaMounts.map(({assetId}) => assetId).sort(), [...expectedAssets].sort());
    const anchorIds = new Set(scene.objectBounds.map(({id}) => id));
    const volumes = [
      scene.plaque.bounds,
      scene.plaque.supportBounds,
      scene.interactionBounds,
      ...scene.objectBounds,
      ...scene.mediaMounts.flatMap(({bounds, supportBounds}) => [bounds, supportBounds]),
    ];
    assert(unique(volumes.map(({id}) => id)), `${exhibit.id} repeats a scene volume ID`);
    for (const volume of volumes) {
      assert(volume.size.width > 0 && volume.size.height > 0 && volume.size.depth > 0, `${volume.id} has invalid dimensions`);
      assert(volumeInsideFootprint(volume, scene.footprint), `${volume.id} escapes ${exhibit.id}'s declared footprint`);
    }
    for (const mount of scene.mediaMounts) {
      assert(supportedMounts.has(mount.kind), `${mount.id} uses unsupported mount ${mount.kind}`);
      assert(assetIds.has(mount.assetId), `${mount.id} references a missing asset`);
      assert(anchorIds.has(mount.anchorId), `${mount.id} has no physical anchor ${mount.anchorId}`);
      assert(mount.width > 0 && mount.height > 0 && mount.frameDepth > 0 && mount.supportHeight >= 0);
      const anchor = scene.objectBounds.find(({id}) => id === mount.anchorId);
      assert(anchor);
      if (mount.kind === 'wall-frame') {
        assert(Math.abs(mount.bounds.size.width - (mount.width + .2)) < 1e-7, `${mount.id} bounds do not cover the rendered side rails`);
        assert(Math.abs(mount.bounds.size.height - (mount.height + .18)) < 1e-7, `${mount.id} bounds do not cover the rendered top and bottom rails`);
        const backingMargin = anchor.size.width / 2 - (Math.abs(mount.bounds.center.x) + mount.bounds.size.width / 2);
        assert(backingMargin >= .08 - 1e-7, `${mount.id} leaves only ${backingMargin.toFixed(3)} units at the backing edge`);
        assert(aabbOverlaps(mount.supportBounds, anchor), `${mount.id} brackets do not attach to ${anchor.id}`);
      } else {
        const supportBottom = mount.supportBounds.center.y - mount.supportBounds.size.height / 2;
        const anchorTop = anchor.center.y + anchor.size.height / 2;
        assert(Math.abs(supportBottom - anchorTop) < 1e-7, `${mount.id} support does not contact ${anchor.id}`);
      }
    }
    const plaqueAnchor = scene.objectBounds.find(({id}) => id === scene.plaque.anchorId);
    assert(plaqueAnchor || scene.plaque.anchorId === 'gallery-floor', `${scene.plaque.id} has no physical anchor ${scene.plaque.anchorId}`);
    const plaqueBottom = scene.plaque.supportBounds.center.y - scene.plaque.supportBounds.size.height / 2;
    const plaqueAnchorTop = plaqueAnchor ? plaqueAnchor.center.y + plaqueAnchor.size.height / 2 : 0;
    assert(Math.abs(plaqueBottom - plaqueAnchorTop) < 1e-7, `${scene.plaque.id} support does not contact ${scene.plaque.anchorId}`);
    const occupied = [
      ...scene.objectBounds,
      ...scene.mediaMounts.flatMap(({bounds, supportBounds}) => [bounds, supportBounds]),
    ];
    for (const plaqueVolume of [scene.plaque.bounds, scene.plaque.supportBounds]) {
      for (const other of occupied) assert(!aabbOverlaps(plaqueVolume, other), `${plaqueVolume.id} intersects ${other.id}`);
    }
    assert.deepEqual(exhibit.collider.center, exhibit.position, `${exhibit.id} collider center drifted from placement`);
    assert.equal(exhibit.collider.size.width, scene.footprint.width, `${exhibit.id} collider width drifted from footprint`);
    assert.equal(exhibit.collider.size.depth, scene.footprint.depth, `${exhibit.id} collider depth drifted from footprint`);
    assert.equal(exhibit.collider.rotation, exhibit.rotationY, `${exhibit.id} collider rotation drifted from placement`);
  }
});

check('paired media and focal objects retain deliberate visual breathing room', () => {
  for (const exhibit of layout.exhibits) {
    const frames = exhibit.scene.mediaMounts
      .filter(({kind}) => kind === 'wall-frame')
      .sort((first, second) => first.bounds.center.x - second.bounds.center.x);
    for (let index = 1; index < frames.length; index += 1) {
      assert(horizontalGap(frames[index - 1].bounds, frames[index].bounds) >= .08 - 1e-7, `${exhibit.id} wall frames crowd each other`);
    }
    for (const frame of frames) {
      for (const object of exhibit.scene.objectBounds.filter(({role}) => role !== 'base')) {
        const overlapsVertically = Math.abs(frame.bounds.center.y - object.center.y) < (frame.bounds.size.height + object.size.height) / 2;
        const overlapsInDepth = Math.abs(frame.bounds.center.z - object.center.z) < (frame.bounds.size.depth + object.size.depth) / 2;
        if (overlapsVertically && overlapsInDepth) {
          assert(horizontalGap(frame.bounds, object) >= .08 - 1e-7, `${frame.id} crowds ${object.id}`);
        }
      }
    }
  }
  for (const id of ['socrates', 'plato', 'aristotle']) {
    const exhibit = layout.exhibits.find((item) => item.id === id);
    const frame = exhibit.scene.mediaMounts.find(({kind}) => kind === 'wall-frame');
    const lectern = exhibit.scene.mediaMounts.find(({kind}) => kind === 'lectern');
    const silhouetteGap = lectern.position[0] - lectern.width / 2 - (frame.position[0] + (frame.width + .2) / 2);
    assert(silhouetteGap >= .05 - 1e-7, `${id} lectern crowds its principal frame`);
  }
  const neoplatonism = layout.exhibits.find(({id}) => id === 'neoplatonism');
  const relief = neoplatonism.scene.objectBounds.find(({id}) => id === 'neoplatonism-emanation-relief');
  for (const frame of neoplatonism.scene.mediaMounts) {
    assert(horizontalGap(frame.bounds, relief) >= .08 - 1e-7, `${frame.id} crowds the central relief`);
  }
});

check('the entrance corridor is clear and the removed directory kiosk has no collider', () => {
  assert(!layout.obstacleColliders.some(({id}) => /kiosk|directory/i.test(id)), 'a removed kiosk collider remains');
  for (const collider of layout.obstacleColliders) {
    const intrudes = collider.center.z > 24 && Math.abs(collider.center.x) < 2 + collider.size.width / 2;
    assert(!intrudes, `${collider.id} obstructs the entrance corridor`);
  }
});

check('dedicated Museum interpretations cover every exhibit and object', () => {
  assert.equal(MUSEUM_INTERPRETATIONS.length, MUSEUM_HALLS[0].exhibits.length);
  assert(unique(MUSEUM_INTERPRETATIONS.map(({id}) => id)));
  assert.deepEqual(MUSEUM_INTERPRETATIONS.map(({id}) => id).sort(), MUSEUM_HALLS[0].exhibits.map(({id}) => id).sort());
  for (const record of MUSEUM_INTERPRETATIONS) {
    const catalog = MUSEUM_HALLS[0].exhibits.find(({id}) => id === record.id);
    assert(catalog);
    const count = wordCount(record.lead);
    assert(count >= 130 && count <= 230, `${record.id} lead has ${count} words; expected 130–230`);
    assert(record.sections.length >= 3, `${record.id} needs at least three interpretation sections`);
    assert(record.sources.length >= 3, `${record.id} needs at least three interpretation sources`);
    assert(unique(record.sources.map(({url}) => url)), `${record.id} repeats an interpretation source`);
    for (const source of record.sources) {
      assert(source.label.trim(), `${record.id} has a blank interpretation source label`);
      const sourceUrl = new URL(source.url);
      assert.equal(sourceUrl.protocol, 'https:', `${record.id} interpretation sources must use HTTPS`);
      assert(['academic-reference', 'primary-text', 'collection-record'].includes(source.kind), `${record.id} has an invalid source kind`);
    }
    assert(record.keyIdeas.length >= 3 && record.keyWorks.length >= 3, `${record.id} needs substantial idea and work lists`);
    for (const assetId of [catalog.principalAssetId, ...catalog.supportingAssetIds]) {
      assert(record.objectInterpretations[assetId]?.trim(), `${record.id} lacks interpretation for ${assetId}`);
    }
    assert(MUSEUM_HALLS[0].exhibits.some(({id}) => id === record.relatedExhibitId), `${record.id} has an invalid related exhibit`);
  }
});

check('typed exhibit origins produce explicit close and history policies', () => {
  const expected = {
    'active-exploration': {navigation: 'back', resumeExploration: true, restoreDirectory: false},
    'paused-hall': {navigation: 'back', resumeExploration: false, restoreDirectory: false},
    directory: {navigation: 'back', resumeExploration: false, restoreDirectory: true},
    guided: {navigation: 'back', resumeExploration: false, restoreDirectory: false},
    direct: {navigation: 'replace-hall', resumeExploration: false, restoreDirectory: false},
  };
  for (const [origin, policy] of Object.entries(expected)) {
    const context = createMuseumExhibitVisitContext(layout.id, origin);
    assert.deepEqual(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: context}, layout.id), context);
    assert.deepEqual(resolveMuseumExitPolicy(context, 'gesture'), policy);
    const historyPolicy = resolveMuseumExitPolicy(context, 'history');
    assert.equal(historyPolicy.resumeExploration, origin === 'active-exploration');
    assert.equal(
      resolveMuseumCloseResumeStrategy(context, 'gesture'),
      origin === 'active-exploration' ? 'request-pointer-lock' : 'remain-paused',
    );
    assert.equal(
      resolveMuseumCloseResumeStrategy(context, 'history'),
      origin === 'active-exploration' ? 'resume-drag-look' : 'remain-paused',
    );
  }
  const direct = directMuseumVisitContext(layout.id);
  const carried = museumHistoryStateWithVisitContext({unrelated: 7}, direct);
  assert.equal(carried.unrelated, 7);
  assert.deepEqual(parseMuseumExhibitVisitContext(carried, layout.id), direct);
  assert.equal(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: {...direct, version: 1}}, layout.id), undefined);
  assert.equal(parseMuseumExhibitVisitContext(carried, 'not-a-hall'), undefined);
});

check('Pointer Lock transitions preserve only an active overlay-close request through teardown', () => {
  let transition = MUSEUM_POINTER_LOCK_SETTLED;
  transition = transitionMuseumPointerLock(transition, {type: 'begin-overlay-close', requestId: 1});
  assert.deepEqual(transition, {kind: 'overlay-close', outcome: 'pending', requestId: 1, failureChannel: 'event'});
  assert.equal(museumPointerLockSurvivesBlockedOverlay(transition), true);

  transition = transitionMuseumPointerLock(transition, {type: 'lock-acquired'});
  assert.deepEqual(transition, {kind: 'overlay-close', outcome: 'acquired', requestId: 1, failureChannel: 'event'});
  assert.equal(museumPointerLockSurvivesBlockedOverlay(transition), true);
  assert.deepEqual(
    transitionMuseumPointerLock(transition, {type: 'lock-rejected', requestId: 1}),
    transition,
    'a late failure cannot downgrade an acquired overlay lock',
  );
  transition = transitionMuseumPointerLock(transition, {type: 'complete-overlay-close'});
  assert.deepEqual(transition, {kind: 'settled'});

  transition = transitionMuseumPointerLock(MUSEUM_POINTER_LOCK_SETTLED, {type: 'begin-overlay-close', requestId: 2});
  transition = transitionMuseumPointerLock(transition, {type: 'lock-rejected', requestId: 2});
  assert.deepEqual(transition, {kind: 'overlay-close', outcome: 'rejected', requestId: 2, failureChannel: 'event'});
  assert.equal(museumPointerLockSurvivesBlockedOverlay(transition), true);
  assert.deepEqual(
    transitionMuseumPointerLock(transition, {type: 'complete-overlay-close'}),
    {kind: 'settled'},
  );

  const sceneRequest = transitionMuseumPointerLock(MUSEUM_POINTER_LOCK_SETTLED, {type: 'begin-scene', requestId: 3});
  assert.deepEqual(sceneRequest, {kind: 'requesting', source: 'scene', requestId: 3, failureChannel: 'event'});
  assert.equal(museumPointerLockSurvivesBlockedOverlay(sceneRequest), false);
  assert.equal(museumPointerLockEventFailureRequestId(sceneRequest), 3);
  const promiseRequest = transitionMuseumPointerLock(sceneRequest, {type: 'use-promise-failure', requestId: 3});
  assert.equal(museumPointerLockEventFailureRequestId(promiseRequest), undefined);
  assert.deepEqual(
    transitionMuseumPointerLock(promiseRequest, {type: 'lock-rejected', requestId: 2}),
    promiseRequest,
    'a stale rejection must not settle the current request',
  );
  assert.deepEqual(transitionMuseumPointerLock(promiseRequest, {type: 'lock-rejected', requestId: 3}), {kind: 'settled'});

  const expectedRelease = transitionMuseumPointerLock(MUSEUM_POINTER_LOCK_SETTLED, {type: 'expect-release'});
  assert.deepEqual(expectedRelease, {kind: 'expected-release'});
  assert.deepEqual(transitionMuseumPointerLock(expectedRelease, {type: 'release-observed'}), {kind: 'settled'});
});

check('focus suspension and explicit pause follow the visit-phase truth table', () => {
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
  for (const [phase, event, expected] of cases) {
    assert.equal(transitionMuseumVisitPhase(phase, event), expected, `${phase} + ${event}`);
  }
  assert.equal(museumPhaseHasActiveIntent('unentered'), false);
  assert.equal(museumPhaseHasActiveIntent('active'), true);
  assert.equal(museumPhaseHasActiveIntent('focus-suspended'), true);
  assert.equal(museumPhaseHasActiveIntent('explicitly-paused'), false);
});

check('Museum controls preserve modified browser shortcuts', () => {
  assert.equal(hasMuseumBrowserModifier({altKey: true, ctrlKey: false, metaKey: false}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: true, metaKey: false}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: false, metaKey: true}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: false, metaKey: false}), false);
});

console.log(`\nMuseum audit passed: ${checks} groups covering ${MUSEUM_HALLS[0].exhibits.length} exhibits, ${MUSEUM_HALLS[0].zones.length} zones, and ${allColliders.length} colliders.`);
