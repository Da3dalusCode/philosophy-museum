import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const museumPageSource = readFileSync(resolve(repoRoot, 'src/components/MuseumGallery/MuseumPage.tsx'), 'utf8');
const museumWorldSource = readFileSync(resolve(repoRoot, 'src/components/MuseumGallery/MuseumWorldScene.tsx'), 'utf8');
const museumRegistrySource = readFileSync(resolve(repoRoot, 'src/components/MuseumGallery/museumWorldRegistry.ts'), 'utf8');
const medievalArchitectureSource = readFileSync(resolve(repoRoot, 'src/components/MuseumGallery/MedievalHallArchitecture.tsx'), 'utf8');
const medievalHallSceneSource = readFileSync(resolve(repoRoot, 'src/components/MuseumGallery/MedievalWorldsHallScene.tsx'), 'utf8');
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
      export * from '/src/data/museum/medievalWorldsHall.ts';
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
const moduleUrl = `data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`;
const museum = await import(moduleUrl);
const {
  ANCIENT_GREEK_HALL_LAYOUT: layout,
  ANCIENT_GREEK_HALL_DEFINITION: definition,
  MEDIEVAL_WORLDS_HALL_LAYOUT: medievalLayout,
  MEDIEVAL_WORLDS_HALL_DEFINITION: medievalDefinition,
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
  museumPoseFromWorld,
  museumConnectionCrossed,
  resolveMuseumHallArrival,
} = museum;

let checks = 0;
const check = (name, assertion) => {
  assertion();
  checks += 1;
  console.log(`✓ ${name}`);
};
const unique = (values) => new Set(values).size === values.length;
const finitePoint = (point) => Number.isFinite(point.x) && Number.isFinite(point.z);
const EPSILON = 1e-7;
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
const pointInsideFootprint = (point, footprint) => (
  Math.abs(point.x) <= footprint.width / 2 + EPSILON
  && point.y >= -EPSILON
  && point.y <= footprint.height + EPSILON
  && Math.abs(point.z) <= footprint.depth / 2 + EPSILON
);
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
  return [
    {x: -size.width / 2, z: -size.depth / 2},
    {x: size.width / 2, z: -size.depth / 2},
    {x: size.width / 2, z: size.depth / 2},
    {x: -size.width / 2, z: size.depth / 2},
  ].map(({x: localX, z: localZ}) => ({
      x: center.x + localX * cosine + localZ * sine,
      z: center.z - localX * sine + localZ * cosine,
    }));
};
const polygonAxes = (corners) => corners.map((corner, index) => {
  const next = corners[(index + 1) % corners.length];
  const edge = {x: next.x - corner.x, z: next.z - corner.z};
  const length = Math.hypot(edge.x, edge.z);
  return {x: -edge.z / length, z: edge.x / length};
});
const projectedInterval = (corners, axis) => {
  const projections = corners.map((corner) => corner.x * axis.x + corner.z * axis.z);
  return {min: Math.min(...projections), max: Math.max(...projections)};
};
const polygonsOverlap = (first, second) => [...polygonAxes(first), ...polygonAxes(second)].every((axis) => {
  const firstInterval = projectedInterval(first, axis);
  const secondInterval = projectedInterval(second, axis);
  return firstInterval.max >= secondInterval.min - EPSILON
    && secondInterval.max >= firstInterval.min - EPSILON;
});
const pointToSegmentDistance = (point, start, end) => {
  const segment = {x: end.x - start.x, z: end.z - start.z};
  const lengthSquared = segment.x ** 2 + segment.z ** 2;
  const fraction = lengthSquared === 0
    ? 0
    : Math.max(0, Math.min(1, ((point.x - start.x) * segment.x + (point.z - start.z) * segment.z) / lengthSquared));
  return Math.hypot(point.x - (start.x + segment.x * fraction), point.z - (start.z + segment.z * fraction));
};
const rectangleClearance = (first, second) => {
  const firstCorners = rotatedRectangleCorners(first.center, first.size, first.rotation);
  const secondCorners = rotatedRectangleCorners(second.center, second.size, second.rotation);
  if (polygonsOverlap(firstCorners, secondCorners)) return 0;
  const edgeDistances = (source, target) => source.flatMap((point) =>
    target.map((start, index) => pointToSegmentDistance(point, start, target[(index + 1) % target.length])));
  return Math.min(...edgeDistances(firstCorners, secondCorners), ...edgeDistances(secondCorners, firstCorners));
};
const footprintRectangle = (exhibit) => ({
  center: exhibit.position,
  size: {width: exhibit.scene.footprint.width, depth: exhibit.scene.footprint.depth},
  rotation: exhibit.rotationY,
});
const boundsRectangle = (bounds, padding = 0) => ({
  center: {x: (bounds.minX + bounds.maxX) / 2, z: (bounds.minZ + bounds.maxZ) / 2},
  size: {
    width: bounds.maxX - bounds.minX + padding * 2,
    depth: bounds.maxZ - bounds.minZ + padding * 2,
  },
  rotation: 0,
});
const pointToColliderClearance = (point, collider) => {
  const cosine = Math.cos(collider.rotation);
  const sine = Math.sin(collider.rotation);
  const dx = point.x - collider.center.x;
  const dz = point.z - collider.center.z;
  const localX = cosine * dx + sine * dz;
  const localZ = -sine * dx + cosine * dz;
  const outsideX = Math.max(Math.abs(localX) - collider.size.width / 2, 0);
  const outsideZ = Math.max(Math.abs(localZ) - collider.size.depth / 2, 0);
  return Math.hypot(outsideX, outsideZ);
};
const pointToRenderedRectangleClearance = (point, rectangle) => {
  const cosine = Math.cos(rectangle.rotation);
  const sine = Math.sin(rectangle.rotation);
  const dx = point.x - rectangle.center.x;
  const dz = point.z - rectangle.center.z;
  const localX = dx * cosine - dz * sine;
  const localZ = dx * sine + dz * cosine;
  const outsideX = Math.max(Math.abs(localX) - rectangle.size.width / 2, 0);
  const outsideZ = Math.max(Math.abs(localZ) - rectangle.size.depth / 2, 0);
  return Math.hypot(outsideX, outsideZ);
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
const projectMuseumPoint = (pose, point, hallLayout = layout) => {
  const delta = {x: point.x - pose.x, y: point.y - hallLayout.eyeHeight, z: point.z - pose.z};
  const cosineYaw = Math.cos(pose.yaw);
  const sineYaw = Math.sin(pose.yaw);
  const cosinePitch = Math.cos(pose.pitch);
  const sinePitch = Math.sin(pose.pitch);
  const cameraX = cosineYaw * delta.x - sineYaw * delta.z;
  const yawedZ = sineYaw * delta.x + cosineYaw * delta.z;
  const cameraY = cosinePitch * delta.y + sinePitch * yawedZ;
  const depth = sinePitch * delta.y - cosinePitch * yawedZ;
  assert(depth > .08, `${JSON.stringify(point)} extends behind the Museum camera`);
  const tanHalfVerticalFov = Math.tan(hallLayout.cameraFov * Math.PI / 360);
  return {
    x: cameraX / (depth * tanHalfVerticalFov * (16 / 9)),
    y: cameraY / (depth * tanHalfVerticalFov),
  };
};
const projectedScreenBounds = (pose, points, hallLayout = layout) => {
  const projected = points.map((point) => projectMuseumPoint(pose, point, hallLayout));
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
const hallPointToLocal = (exhibit, point) => {
  const cosine = Math.cos(exhibit.rotationY);
  const sine = Math.sin(exhibit.rotationY);
  const dx = point.x - exhibit.position.x;
  const dz = point.z - exhibit.position.z;
  return {
    x: dx * cosine - dz * sine,
    y: point.y,
    z: dx * sine + dz * cosine,
  };
};
const volumeWorldCorners = (exhibit, renderedVolume) => rotatedBoxCorners(
  renderedVolume.center,
  renderedVolume.size,
  0,
).map((point) => localPointToHall(exhibit, point));
const assertWallSightlineClear = (start, target, label, hallLayout = layout) => {
  const samples = Math.max(2, Math.ceil(segmentLength(start, target) / .15));
  for (let index = 0; index < samples; index += 1) {
    const fraction = index / samples;
    const sample = {
      x: start.x + (target.x - start.x) * fraction,
      z: start.z + (target.z - start.z) * fraction,
    };
    assert(!hallLayout.wallColliders.some((wall) => intersects(sample, .02, wall)), `${label} is hidden by a wall near ${JSON.stringify(sample)}`);
  }
};
const assertOtherColliderSightlineClear = (start, target, ignoredExhibitId, label, hallLayout = layout) => {
  const ignoredColliderId = `exhibit-${ignoredExhibitId}`;
  const blockers = hallLayout.obstacleColliders.filter(({id}) => id !== ignoredColliderId);
  const samples = Math.max(2, Math.ceil(segmentLength(start, target) / .15));
  for (let index = 1; index < samples; index += 1) {
    const fraction = index / samples;
    const sample = {
      x: start.x + (target.x - start.x) * fraction,
      z: start.z + (target.z - start.z) * fraction,
    };
    const blocker = blockers.find((collider) => intersects(sample, .02, collider));
    assert(!blocker, `${label} is occluded by ${blocker?.id} near ${JSON.stringify(sample)}`);
  }
};
const assertLocalVolumeSightlineClear = (exhibit, start, target, volumes, label) => {
  const localStart = hallPointToLocal(exhibit, {...start, y: layout.eyeHeight});
  const localTarget = hallPointToLocal(exhibit, target);
  const samples = Math.max(2, Math.ceil(Math.hypot(
    localTarget.x - localStart.x,
    localTarget.y - localStart.y,
    localTarget.z - localStart.z,
  ) / .08));
  for (let index = 1; index < samples; index += 1) {
    const fraction = index / samples;
    const sample = {
      x: localStart.x + (localTarget.x - localStart.x) * fraction,
      y: localStart.y + (localTarget.y - localStart.y) * fraction,
      z: localStart.z + (localTarget.z - localStart.z) * fraction,
    };
    const blocker = volumes.find((volume) => (
      Math.abs(sample.x - volume.center.x) <= volume.size.width / 2
      && Math.abs(sample.y - volume.center.y) <= volume.size.height / 2
      && Math.abs(sample.z - volume.center.z) <= volume.size.depth / 2
    ));
    assert(!blocker, `${label} is occluded by ${blocker?.id}`);
  }
};

check('two unique Museum halls exist in the approved order', () => {
  assert.equal(MUSEUM_HALLS.length, 2);
  assert.deepEqual(MUSEUM_HALLS.map(({id}) => id), ['ancient-greek', 'medieval-worlds']);
  assert(unique(MUSEUM_HALLS.map(({id}) => id)));
  assert.equal(layout.id, MUSEUM_HALLS[0].id);
  assert.equal(medievalLayout.id, MUSEUM_HALLS[1].id);
});

check('each hall catalog contains eight unique exhibits in three unique zones', () => {
  for (const hall of MUSEUM_HALLS) {
    assert.equal(hall.exhibits.length, 8);
    assert.equal(hall.zones.length, 3);
    assert(unique(hall.exhibits.map(({id}) => id)));
    assert(unique(hall.zones.map(({id}) => id)));
    const zones = new Set(hall.zones.map(({id}) => id));
    for (const exhibit of hall.exhibits) assert(zones.has(exhibit.zoneId));
  }
  assert(unique(MUSEUM_HALLS.flatMap((hall) => hall.exhibits.map(({id}) => `${hall.id}:${id}`))));
});

check('exhibit entity references exist and match their declared kinds', () => {
  const philosopherIds = new Set(philosophers.map(({id}) => id));
  const branchIds = new Set(branches.map(({id}) => id));
  for (const exhibit of MUSEUM_HALLS.flatMap(({exhibits}) => exhibits)) {
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
  const medieval = MUSEUM_HALLS[1].exhibits;
  assert.deepEqual(medieval.map(({id}) => id), ['augustine', 'boethius', 'avicenna', 'al-ghazali', 'averroes', 'maimonides', 'aquinas', 'ockham']);
  assert(medieval.every(({entityKind}) => entityKind === 'philosopher'));
  assert.equal(medieval.filter(({zoneId}) => zoneId === 'late-antique-inheritance').length, 2);
  assert.equal(medieval.filter(({zoneId}) => zoneId === 'arabic-islamic-worlds').length, 3);
  assert.equal(medieval.filter(({zoneId}) => zoneId === 'jewish-latin-scholastic').length, 3);
});

check('guided order contains every exhibit exactly once', () => {
  for (const hall of MUSEUM_HALLS) {
    assert.equal(hall.guidedOrder.length, hall.exhibits.length);
    assert(unique(hall.guidedOrder));
    assert.deepEqual([...hall.guidedOrder].sort(), hall.exhibits.map(({id}) => id).sort());
  }
});

check('each route catalog and full layout agree exactly', () => {
  for (const [index, hallLayout] of [layout, medievalLayout].entries()) {
    assert.deepEqual(hallLayout.exhibits.map(({id}) => id).sort(), MUSEUM_HALLS[index].exhibits.map(({id}) => id).sort());
    assert.deepEqual([...hallLayout.guidedOrder], [...MUSEUM_HALLS[index].guidedOrder]);
  }
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

check('movement follows rendered heading and viewpoints center each authored focal target', () => {
  for (const yaw of [0, Math.PI / 4, Math.PI / 2, -Math.PI / 2]) {
    const heading = setMuseumMovementDisplacement({x: 0, z: 0}, {x: 0, z: 1}, yaw, 1);
    assert(Math.abs(heading.x + Math.sin(yaw)) < 1e-9);
    assert(Math.abs(heading.z + Math.cos(yaw)) < 1e-9);
  }
  for (const exhibit of layout.exhibits) {
    const cell = layout.spatialCells.find(({id}) => id === exhibit.spatialCellId);
    assert(cell && cell.kind === 'room', `${exhibit.id} has no declared exhibit room`);
    assert(boundsContainPoint(cell.bounds, exhibit.viewpoint, layout.playerRadius), `${exhibit.id} viewpoint escapes ${cell.id}`);
    assert(!allColliders.some((collider) => intersects(exhibit.viewpoint, layout.playerRadius, collider)), `${exhibit.id} viewpoint intersects a collider`);

    const focalTarget = localPointToHall(exhibit, exhibit.scene.focalTarget);
    const focalProjection = projectMuseumPoint(exhibit.viewpoint, focalTarget);
    assert(Math.abs(focalProjection.x) <= .015, `${exhibit.id} yaw leaves its focal target ${focalProjection.x.toFixed(3)} NDC off center`);
    assert(Math.abs(focalProjection.y) <= .015, `${exhibit.id} pitch leaves its focal target ${focalProjection.y.toFixed(3)} NDC off center`);
    assertWallSightlineClear(exhibit.viewpoint, focalTarget, `${exhibit.id} focal target`);
    assertOtherColliderSightlineClear(exhibit.viewpoint, focalTarget, exhibit.id, `${exhibit.id} focal target`);

    const plaque = exhibit.scene.plaque;
    const plaqueCenter = localPointToHall(exhibit, {
      x: plaque.position[0],
      y: plaque.position[1],
      z: plaque.position[2],
    });
    const plaqueProjection = projectMuseumPoint(exhibit.viewpoint, plaqueCenter);
    assert(Math.abs(plaqueProjection.x) <= .96 && Math.abs(plaqueProjection.y) <= .96, `${exhibit.id} plaque center falls outside its authored viewpoint`);
    assertWallSightlineClear(exhibit.viewpoint, plaqueCenter, `${exhibit.id} plaque`);
    assertOtherColliderSightlineClear(exhibit.viewpoint, plaqueCenter, exhibit.id, `${exhibit.id} plaque`);
    const plaqueScreenBounds = projectedScreenBounds(exhibit.viewpoint, volumeWorldCorners(exhibit, plaque.bounds));
    assert(plaqueScreenBounds.minX >= -.98 && plaqueScreenBounds.maxX <= .98, `${exhibit.id} plaque is horizontally clipped at its authored viewpoint`);
    assert(plaqueScreenBounds.minY >= -.98 && plaqueScreenBounds.maxY <= .98, `${exhibit.id} plaque is vertically clipped at its authored viewpoint`);
    assert(plaqueScreenBounds.widthPixels >= 80 && plaqueScreenBounds.heightPixels >= 28, `${exhibit.id} plaque is too small at its authored viewpoint`);
    assertLocalVolumeSightlineClear(
      exhibit,
      exhibit.viewpoint,
      plaqueCenter,
      [...exhibit.scene.objectBounds, ...exhibit.scene.mediaMounts.flatMap(({bounds, supportBounds}) => [bounds, supportBounds])],
      `${exhibit.id} plaque`,
    );

    const [rotationX, rotationY] = plaque.rotation;
    const plaqueNormal = {
      x: Math.sin(rotationY),
      y: -Math.sin(rotationX) * Math.cos(rotationY),
      z: Math.cos(rotationX) * Math.cos(rotationY),
    };
    const cosine = Math.cos(exhibit.rotationY);
    const sine = Math.sin(exhibit.rotationY);
    const worldNormal = {
      x: plaqueNormal.x * cosine + plaqueNormal.z * sine,
      y: plaqueNormal.y,
      z: -plaqueNormal.x * sine + plaqueNormal.z * cosine,
    };
    const towardEye = {
      x: exhibit.viewpoint.x - plaqueCenter.x,
      y: layout.eyeHeight - plaqueCenter.y,
      z: exhibit.viewpoint.z - plaqueCenter.z,
    };
    const facingDot = (worldNormal.x * towardEye.x + worldNormal.y * towardEye.y + worldNormal.z * towardEye.z)
      / Math.hypot(towardEye.x, towardEye.y, towardEye.z);
    assert(facingDot >= .5, `${exhibit.id} plaque faces materially away from its viewpoint (${facingDot.toFixed(3)} dot)`);
  }
});

check('every exhibit room has one safe entry view with its promised focal exhibits recognizable', () => {
  const exhibitRooms = layout.spatialCells.filter(({kind, exhibitIds}) => kind === 'room' && exhibitIds.length > 0);
  assert.equal(layout.entryViews.length, exhibitRooms.length, 'entry-view count must match exhibit-room count');
  const minimumVisibleByRoom = new Map([
    ['classical-foundations-room', 3],
    ['hellenistic-ways-room', 2],
    ['late-antiquity-room', 1],
  ]);
  assert.deepEqual([...minimumVisibleByRoom.keys()].sort(), exhibitRooms.map(({id}) => id).sort());

  for (const cell of exhibitRooms) {
    const entries = layout.entryViews.filter(({spatialCellId}) => spatialCellId === cell.id);
    assert.equal(entries.length, 1, `${cell.id} must declare exactly one entry view`);
    const [entry] = entries;
    assert(boundsContainPoint(cell.bounds, entry.pose, layout.playerRadius), `${cell.id} entry view escapes its declared room`);
    assert(!allColliders.some((collider) => intersects(entry.pose, layout.playerRadius, collider)), `${cell.id} entry view intersects a collider`);
    assert(unique(entry.expectedVisibleExhibitIds), `${cell.id} repeats an expected exhibit`);
    const minimumVisible = minimumVisibleByRoom.get(cell.id);
    assert(entry.expectedVisibleExhibitIds.length >= minimumVisible, `${cell.id} promises ${entry.expectedVisibleExhibitIds.length}; expected at least ${minimumVisible}`);
    if (cell.id === 'classical-foundations-room' || cell.id === 'late-antiquity-room') {
      assert.deepEqual([...entry.expectedVisibleExhibitIds].sort(), [...cell.exhibitIds].sort(), `${cell.id} must promise every exhibit at entry`);
    }
    for (const id of entry.expectedVisibleExhibitIds) {
      const exhibit = layout.exhibits.find((item) => item.id === id);
      assert(exhibit && exhibit.spatialCellId === cell.id, `${cell.id} promises an exhibit from another room`);
      const catalog = MUSEUM_HALLS[0].exhibits.find((item) => item.id === id);
      assert(catalog, `${cell.id} promises an exhibit missing from the catalog`);
      const principalMount = exhibit.scene.mediaMounts.find(({assetId}) => assetId === catalog.principalAssetId);
      assert(principalMount, `${id} entry view has no principal media mount to establish recognition`);
      const principalCenter = localPointToHall(exhibit, principalMount.bounds.center);
      const focalTarget = localPointToHall(exhibit, exhibit.scene.focalTarget);
      const principalProjection = projectMuseumPoint(entry.pose, principalCenter);
      const focalProjection = projectMuseumPoint(entry.pose, focalTarget);
      assert(Math.abs(principalProjection.x) <= .98 && Math.abs(principalProjection.y) <= .98, `${id} principal media center falls outside the ${cell.id} entry view (${principalProjection.x.toFixed(3)}, ${principalProjection.y.toFixed(3)} NDC)`);
      assert(Math.abs(focalProjection.x) <= .98 && Math.abs(focalProjection.y) <= .98, `${id} focal target falls outside the ${cell.id} entry view (${focalProjection.x.toFixed(3)}, ${focalProjection.y.toFixed(3)} NDC)`);

      const projected = projectedScreenBounds(entry.pose, volumeWorldCorners(exhibit, principalMount.bounds));
      assert(projected.maxX >= -.98 && projected.minX <= .98 && projected.maxY >= -.98 && projected.minY <= .98, `${id} principal media is clipped out of the ${cell.id} entry view`);
      const visibleWidthPixels = Math.max(0, Math.min(1, projected.maxX) - Math.max(-1, projected.minX)) * 960;
      const visibleHeightPixels = Math.max(0, Math.min(1, projected.maxY) - Math.max(-1, projected.minY)) * 540;
      const visibleArea = visibleWidthPixels * visibleHeightPixels;
      const projectedArea = projected.widthPixels * projected.heightPixels;
      console.log(`  Entry media ${id}: center ${principalProjection.x.toFixed(3)} NDC; ${visibleWidthPixels.toFixed(1)}×${visibleHeightPixels.toFixed(1)} px; ${(visibleArea / projectedArea * 100).toFixed(1)}% visible`);
      assert(visibleWidthPixels >= 70 && visibleHeightPixels >= 70, `${id} principal media is too small to recognize at the ${cell.id} entry`);
      assert(visibleArea >= 7_000, `${id} principal media lacks recognizable visible area at the ${cell.id} entry`);
      assert(visibleArea / projectedArea >= .6, `${id} shows only ${(visibleArea / projectedArea * 100).toFixed(1)}% of its principal media at the ${cell.id} entry`);

      const frontNormal = {x: Math.sin(exhibit.rotationY), z: Math.cos(exhibit.rotationY)};
      const towardEntry = {x: entry.pose.x - principalCenter.x, z: entry.pose.z - principalCenter.z};
      const frontFacing = (frontNormal.x * towardEntry.x + frontNormal.z * towardEntry.z) / Math.hypot(towardEntry.x, towardEntry.z);
      assert(frontFacing >= .3, `${id} turns materially away from the ${cell.id} entry (${frontFacing.toFixed(3)} dot)`);
      assertWallSightlineClear(entry.pose, principalCenter, `${id} principal media from ${cell.id} entry`);
      assertWallSightlineClear(entry.pose, focalTarget, `${id} focal target from ${cell.id} entry`);
      assertOtherColliderSightlineClear(entry.pose, principalCenter, id, `${id} principal media from ${cell.id} entry`);
      assertOtherColliderSightlineClear(entry.pose, focalTarget, id, `${id} focal target from ${cell.id} entry`);
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

check('the authored primary circulation path is continuous and clear at its declared radius', () => {
  const circulation = layout.primaryCirculation;
  assert(circulation.id.trim(), 'primary circulation needs a stable ID');
  assert(circulation.clearanceRadius >= layout.playerRadius, 'primary circulation must clear at least one player footprint');
  assert(circulation.points.length >= 2, 'primary circulation needs at least one segment');
  assert(circulation.points.every(finitePoint), 'primary circulation contains a non-finite point');
  assert(segmentLength(circulation.points[0], layout.spawn) <= layout.playerRadius, 'primary circulation must begin at the Museum spawn');
  const finalGuidedExhibit = layout.exhibits.find(({id}) => id === layout.guidedOrder.at(-1));
  const finalRoom = layout.spatialCells.find(({id}) => id === finalGuidedExhibit?.spatialCellId);
  assert(finalRoom?.kind === 'room', 'primary circulation has no final exhibit room');
  assert(circulation.points.some((point) => boundsContainPoint(finalRoom.bounds, point, circulation.clearanceRadius)), 'primary circulation must reach the final exhibit room');
  const crossedConnections = new Set();
  let nearestClearance = Number.POSITIVE_INFINITY;
  let nearestCollider;
  let nearestPoint;
  let totalLength = 0;
  for (let segmentIndex = 1; segmentIndex < circulation.points.length; segmentIndex += 1) {
    const start = circulation.points[segmentIndex - 1];
    const end = circulation.points[segmentIndex];
    const length = segmentLength(start, end);
    assert(length > EPSILON, `${circulation.id} repeats point ${segmentIndex}`);
    totalLength += length;
    const samples = Math.max(1, Math.ceil(length / .08));
    for (let sampleIndex = 0; sampleIndex <= samples; sampleIndex += 1) {
      const fraction = sampleIndex / samples;
      const point = {x: start.x + (end.x - start.x) * fraction, z: start.z + (end.z - start.z) * fraction};
      assert(positionInsideSpatialUnion(point, circulation.clearanceRadius, layout.spatialCells), `${circulation.id} loses ${circulation.clearanceRadius.toFixed(2)} clearance near ${JSON.stringify(point)}`);
      for (const connection of layout.spatialConnections) {
        if (boundsContainPoint(connection.openingBounds, point)) crossedConnections.add(connection.id);
      }
      for (const collider of allColliders) {
        const clearance = pointToColliderClearance(point, collider);
        if (clearance < nearestClearance) {
          nearestClearance = clearance;
          nearestCollider = collider;
          nearestPoint = point;
        }
        assert(clearance >= circulation.clearanceRadius - EPSILON, `${circulation.id} leaves ${clearance.toFixed(3)} clearance from ${collider.id} near ${JSON.stringify(point)}`);
      }
      for (const exhibit of layout.exhibits) {
        const clearance = pointToRenderedRectangleClearance(point, footprintRectangle(exhibit));
        assert(clearance >= circulation.clearanceRadius - EPSILON, `${circulation.id} enters the rendered ${exhibit.id} footprint near ${JSON.stringify(point)}`);
      }
    }
  }
  assert.deepEqual([...crossedConnections].sort(), layout.spatialConnections.map(({id}) => id).sort(), 'primary circulation must cross every authored room connection');
  assert(Number.isFinite(nearestClearance) && nearestCollider && nearestPoint);
  console.log(`  Primary circulation: ${totalLength.toFixed(3)} units; minimum collider clearance ${nearestClearance.toFixed(3)} from ${nearestCollider.id} near (${nearestPoint.x.toFixed(2)}, ${nearestPoint.z.toFixed(2)})`);
});

check('rendered exhibit footprints preserve padded doorway approaches', () => {
  const doorwayPadding = Math.max(layout.playerRadius * 2, layout.primaryCirculation.clearanceRadius);
  let nearest = {clearance: Number.POSITIVE_INFINITY};
  for (const connection of layout.spatialConnections) {
    const opening = boundsRectangle(connection.openingBounds);
    const paddedOpening = boundsRectangle(connection.openingBounds, doorwayPadding);
    const paddedCorners = rotatedRectangleCorners(paddedOpening.center, paddedOpening.size, 0);
    for (const exhibit of layout.exhibits) {
      const footprint = footprintRectangle(exhibit);
      const footprintCorners = rotatedRectangleCorners(footprint.center, footprint.size, footprint.rotation);
      assert(!polygonsOverlap(footprintCorners, paddedCorners), `${exhibit.id} enters the ${doorwayPadding.toFixed(2)}-unit padded approach to ${connection.id}`);
      const clearance = rectangleClearance(footprint, opening);
      if (clearance < nearest.clearance) nearest = {clearance, exhibitId: exhibit.id, connectionId: connection.id};
    }
  }
  assert(Number.isFinite(nearest.clearance));
  console.log(`  Nearest doorway clearance: ${nearest.exhibitId} to ${nearest.connectionId} ${nearest.clearance.toFixed(3)} units (${doorwayPadding.toFixed(3)} padded approach)`);
});

check('the world definition is the single source for the current hall boundary', () => {
  assert.equal(definition.id, layout.id);
  assert.equal(definition.layout, layout);
  assert.deepEqual(definition.worldTransform, {x: 0, z: 0, yaw: 0});
  assert.deepEqual(definition.entrances.map(({id}) => id), ['south-entry', 'medieval-threshold']);
  assert.deepEqual(definition.entrances[0].arrivalPose, layout.spawn);
  assert(definition.entrances[0].transitionBounds.size.width > 0);
  assert(definition.entrances[0].transitionBounds.size.depth > 0);
  assert.equal(definition.connections.length, 1);
  assert.equal(definition.connections[0].targetHallId, 'medieval-worlds');
  assert.deepEqual(definition.prefetch.adjacentHallIds, ['medieval-worlds']);
  const catalogAssetIds = MUSEUM_HALLS[0].exhibits.flatMap((item) => [item.principalAssetId, ...item.supportingAssetIds]);
  assert.deepEqual([...definition.prefetch.sceneAssetIds].sort(), [...catalogAssetIds].sort());
});

check('walls and systematic neutral exhibit lighting are data-authored once', () => {
  assert.equal(layout.wallColliders.length, 31);
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
    assert(pointInsideFootprint(exhibit.scene.focalTarget, exhibit.scene.footprint), `${exhibit.id} focal target escapes its installation footprint`);
    assert.deepEqual(light.target, localPointToHall(exhibit, exhibit.scene.focalTarget));
    const localLightTarget = hallPointToLocal(exhibit, light.target);
    assert(pointInsideFootprint(localLightTarget, exhibit.scene.footprint), `${light.id} target escapes ${exhibit.id}'s footprint`);
    assert(boundsContainPoint(cell.bounds, light.target), `${light.id} target escapes ${cell.id}`);
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
    assert(beamLength > .35, `${light.id} has a degenerate spotlight beam`);
    const expectedLens = {
      x: light.mountPosition.x + beam.x / beamLength * .35,
      y: light.mountPosition.y + beam.y / beamLength * .35,
      z: light.mountPosition.z + beam.z / beamLength * .35,
    };
    assert(Math.hypot(light.position.x - expectedLens.x, light.position.y - expectedLens.y, light.position.z - expectedLens.z) < 1e-9, `${light.id} does not originate at its rendered lens`);
    const renderedBeamLength = Math.hypot(
      light.target.x - light.position.x,
      light.target.y - light.position.y,
      light.target.z - light.position.z,
    );
    assert(renderedBeamLength <= light.distance + EPSILON, `${light.id} target is ${renderedBeamLength.toFixed(3)} units from its lens but its beam reaches only ${light.distance.toFixed(3)}`);
    assert(boundsContainPoint(cell.bounds, light.position), `${light.id} is outside ${cell.id}`);
    assert(light.intensity >= 28 && light.intensity <= 42, `${light.id} intensity falls outside the restrained exhibit-light range`);
    assert(light.distance <= 20, `${light.id} uses an implausible spotlight range`);
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

check('eight authored spatial cells form one connected continuous gallery', () => {
  assert.equal(layout.spatialCells.length, 8);
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
    'room', 'passage', 'room', 'passage', 'room', 'passage', 'room', 'passage',
  ]);
});

check('the pilot wing is materially denser while remaining larger than the original hall', () => {
  const authoredArea = layout.spatialCells.reduce((total, {bounds}) =>
    total + (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ), 0);
  assert.equal(layout.floorArea, authoredArea);
  assert(layout.floorArea > 1320, `floor area ${layout.floorArea} does not exceed the original hall`);
  assert(layout.floorArea <= 3072 * .8, `floor area ${layout.floorArea} is not materially denser than the expanded wing`);
  assert.equal(layout.floorArea, 1626.4);
  console.log(`  Floor area: ${layout.floorArea} units² (47.06% below the prior 3,072-unit wing)`);
  const passages = layout.spatialCells.filter(({kind}) => kind === 'passage');
  assert.equal(passages.length, 4);
  for (const passage of passages) {
    const width = passage.bounds.maxX - passage.bounds.minX;
    const depth = passage.bounds.maxZ - passage.bounds.minZ;
    const connector = passage.id === 'medieval-transition-passage';
    assert(Math.min(width, depth) <= (connector ? 4 : 3), `${passage.id} is too long to read as a threshold`);
    assert(width * depth <= (connector ? 36 : 24), `${passage.id} consumes excessive empty floor`);
  }
  const exhibitRooms = layout.spatialCells.filter(({exhibitIds}) => exhibitIds.length > 0);
  for (const room of exhibitRooms) {
    const roomArea = (room.bounds.maxX - room.bounds.minX) * (room.bounds.maxZ - room.bounds.minZ);
    const areaPerExhibit = roomArea / room.exhibitIds.length;
    assert(areaPerExhibit <= (room.exhibitIds.length === 1 ? 320 : 150), `${room.id} strands its exhibits in excess floor`);
  }
});

check('the guided walking route is clear, ordered, and paced for short exhibit transitions', () => {
  const walkingUnitsPerSecond = 3.75;
  const targetMeanSeconds = 4.5;
  const maximumLegSeconds = 6;
  const byId = new Map(layout.exhibits.map((exhibit) => [exhibit.id, exhibit]));
  assert.equal(layout.guidedWalkLegs.length, layout.guidedOrder.length - 1);
  const gaps = layout.guidedWalkLegs.map((leg, index) => {
    const expectedFrom = layout.guidedOrder[index];
    const expectedTo = layout.guidedOrder[index + 1];
    assert.equal(leg.fromExhibitId, expectedFrom);
    assert.equal(leg.toExhibitId, expectedTo);
    const from = byId.get(leg.fromExhibitId);
    const to = byId.get(leg.toExhibitId);
    assert(from && to, `${leg.fromExhibitId} → ${leg.toExhibitId} references a missing exhibit`);
    assert(leg.waypoints.every(finitePoint), `${leg.fromExhibitId} → ${leg.toExhibitId} has a non-finite waypoint`);
    if (from.spatialCellId !== to.spatialCellId) {
      assert(leg.waypoints.length > 0, `${leg.fromExhibitId} → ${leg.toExhibitId} changes rooms without authored passage waypoints`);
    }
    const points = [from.viewpoint, ...leg.waypoints, to.viewpoint];
    const segments = points.slice(1).map((point, pointIndex) => [points[pointIndex], point]);
    for (const [start, end] of segments) {
      assert(segmentLength(start, end) > EPSILON, `${leg.fromExhibitId} → ${leg.toExhibitId} repeats a route point`);
      sampleClearSegment(start, end, `${leg.fromExhibitId} → ${leg.toExhibitId}`);
    }
    const distance = segments.reduce((total, [start, end]) => total + segmentLength(start, end), 0);
    const directDistance = segmentLength(from.viewpoint, to.viewpoint);
    assert(distance + EPSILON >= directDistance, `${leg.fromExhibitId} → ${leg.toExhibitId} path is shorter than its endpoints`);
    return {
      from: leg.fromExhibitId,
      to: leg.toExhibitId,
      distance,
    };
  });
  for (const gap of gaps) {
    const walkingSeconds = gap.distance / walkingUnitsPerSecond;
    assert(walkingSeconds <= maximumLegSeconds + EPSILON, `${gap.from} → ${gap.to} takes ${walkingSeconds.toFixed(2)} seconds at the Museum walking pace`);
  }
  const total = gaps.reduce((sum, {distance}) => sum + distance, 0);
  const mean = total / gaps.length;
  const maximum = Math.max(...gaps.map(({distance}) => distance));
  assert(mean / walkingUnitsPerSecond <= targetMeanSeconds + EPSILON, `guided-route mean takes ${(mean / walkingUnitsPerSecond).toFixed(2)} seconds at the Museum walking pace`);
  console.log(`  Guided walking gaps: ${gaps.map(({from, to, distance}) => `${from}→${to} ${distance.toFixed(3)} (${(distance / walkingUnitsPerSecond).toFixed(2)}s)`).join('; ')}`);
  console.log(`  Guided walking total: ${total.toFixed(3)}; mean: ${mean.toFixed(3)}; max: ${maximum.toFixed(3)} units`);
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

check('rendered installation OBBs do not overlap and preserve visitor-scale breathing room', () => {
  const minimumClearance = layout.playerRadius * 2 + .5;
  let nearest = {clearance: Number.POSITIVE_INFINITY};
  for (const room of layout.spatialCells.filter(({kind, exhibitIds}) => kind === 'room' && exhibitIds.length > 1)) {
    const exhibits = room.exhibitIds.map((id) => layout.exhibits.find((exhibit) => exhibit.id === id));
    assert(exhibits.every(Boolean), `${room.id} references a missing exhibit`);
    for (let firstIndex = 0; firstIndex < exhibits.length; firstIndex += 1) {
      for (let secondIndex = firstIndex + 1; secondIndex < exhibits.length; secondIndex += 1) {
        const first = exhibits[firstIndex];
        const second = exhibits[secondIndex];
        const clearance = rectangleClearance(footprintRectangle(first), footprintRectangle(second));
        assert(clearance > EPSILON, `${first.id} and ${second.id} rendered footprints overlap in ${room.id}`);
        assert(clearance >= minimumClearance - EPSILON, `${first.id} and ${second.id} leave only ${clearance.toFixed(3)} units in ${room.id}`);
        if (clearance < nearest.clearance) nearest = {clearance, firstId: first.id, secondId: second.id, roomId: room.id};
      }
    }
  }
  assert(Number.isFinite(nearest.clearance));
  console.log(`  Nearest same-room exhibits: ${nearest.firstId} ↔ ${nearest.secondId} in ${nearest.roomId}, ${nearest.clearance.toFixed(3)} units (minimum ${minimumClearance.toFixed(3)})`);
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
      for (const other of occupied) {
        assert(!aabbOverlaps(plaqueVolume, other), `${plaqueVolume.id} intersects ${other.id}`);
      }
    }
    assert(layout.obstacleColliders.includes(exhibit.collider), `${exhibit.id} is rendered without its authored exhibit collider`);
    assert.equal(layout.obstacleColliders.filter(({id}) => id === exhibit.collider.id).length, 1, `${exhibit.id} collider is missing or duplicated`);
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
    const silhouetteGap = Math.abs(lectern.position[0] - frame.position[0]) - lectern.width / 2 - (frame.width + .2) / 2;
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
  const ancientRecords = MUSEUM_INTERPRETATIONS.filter(({hallId}) => hallId === 'ancient-greek');
  assert.equal(ancientRecords.length, MUSEUM_HALLS[0].exhibits.length);
  assert(unique(ancientRecords.map(({id}) => id)));
  assert.deepEqual(ancientRecords.map(({id}) => id).sort(), MUSEUM_HALLS[0].exhibits.map(({id}) => id).sort());
  const allExhibitRefs = new Set(MUSEUM_HALLS.flatMap((hall) => hall.exhibits.map(({id}) => `${hall.id}:${id}`)));
  for (const record of ancientRecords) {
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
    assert(record.relatedExhibits.length > 0);
    assert(record.relatedExhibits.every((reference) => allExhibitRefs.has(`${reference.hallId}:${reference.exhibitId}`)), `${record.id} has an invalid related exhibit`);
  }
  for (const record of MUSEUM_INTERPRETATIONS) {
    const hall = MUSEUM_HALLS.find(({id}) => id === record.hallId);
    const catalog = hall?.exhibits.find(({id}) => id === record.id);
    assert(catalog, `${record.hallId}:${record.id} has no catalog exhibit`);
    for (const assetId of [catalog.principalAssetId, ...catalog.supportingAssetIds]) {
      assert(record.objectInterpretations[assetId]?.trim(), `${record.hallId}:${record.id} lacks interpretation for ${assetId}`);
    }
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

check('the Medieval hall has complete safe spatial, exhibit, light, and guided definitions', () => {
  const hall = MUSEUM_HALLS.find(({id}) => id === 'medieval-worlds');
  assert(hall);
  assert.equal(medievalDefinition.layout, medievalLayout);
  assert.equal(medievalLayout.floorArea, 1006.4);
  const authoredArea = medievalLayout.spatialCells.reduce((total, {bounds}) => total + (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ), 0);
  assert.equal(authoredArea, medievalLayout.floorArea);
  assert.equal(medievalLayout.spatialCells.length, 6);
  assert.equal(medievalLayout.spatialConnections.length, 5);
  assert.equal(medievalLayout.entryViews.length, 3);
  assert(medievalLayout.entryViews.every(({expectedVisibleExhibitIds}) => expectedVisibleExhibitIds.length >= 2));
  assert.deepEqual(medievalLayout.exhibits.map(({id}) => id).sort(), hall.exhibits.map(({id}) => id).sort());
  assert.deepEqual([...medievalLayout.guidedOrder], [...hall.guidedOrder]);

  const colliders = [...medievalLayout.wallColliders, ...medievalLayout.obstacleColliders];
  assert(unique(colliders.map(({id}) => id)));
  const safe = (pose) => isValidMuseumPosition(pose, medievalLayout.playerRadius, medievalLayout.bounds, colliders, medievalLayout.spatialCells);
  assert(safe(medievalLayout.spawn));
  assert(safe(medievalLayout.reset));
  for (const entry of medievalLayout.entryViews) {
    assert(safe(entry.pose), `${entry.spatialCellId} entry pose is unsafe`);
    const cell = medievalLayout.spatialCells.find(({id}) => id === entry.spatialCellId);
    assert(cell?.kind === 'room', `${entry.spatialCellId} is not an exhibit room`);
    assert(entry.expectedVisibleExhibitIds.length >= 2, `${entry.spatialCellId} must reveal at least two exhibits at entry`);
    for (const id of entry.expectedVisibleExhibitIds) {
      const exhibit = medievalLayout.exhibits.find((item) => item.id === id);
      const catalog = hall.exhibits.find((item) => item.id === id);
      assert(exhibit && catalog && exhibit.spatialCellId === cell.id, `${entry.spatialCellId} promises an invalid exhibit ${id}`);
      const principalMount = exhibit.scene.mediaMounts.find(({assetId}) => assetId === catalog.principalAssetId);
      assert(principalMount, `${id} has no principal entry-view anchor`);
      const principalCenter = localPointToHall(exhibit, principalMount.bounds.center);
      const focalTarget = localPointToHall(exhibit, exhibit.scene.focalTarget);
      const principalProjection = projectMuseumPoint(entry.pose, principalCenter, medievalLayout);
      const focalProjection = projectMuseumPoint(entry.pose, focalTarget, medievalLayout);
      assert(Math.abs(principalProjection.x) <= .98 && Math.abs(principalProjection.y) <= .98, `${id} principal media falls outside the ${cell.id} entry view`);
      assert(Math.abs(focalProjection.x) <= .98 && Math.abs(focalProjection.y) <= .98, `${id} focal target falls outside the ${cell.id} entry view`);
      const projected = projectedScreenBounds(entry.pose, volumeWorldCorners(exhibit, principalMount.bounds), medievalLayout);
      const visibleWidthPixels = Math.max(0, Math.min(1, projected.maxX) - Math.max(-1, projected.minX)) * 960;
      const visibleHeightPixels = Math.max(0, Math.min(1, projected.maxY) - Math.max(-1, projected.minY)) * 540;
      const visibleArea = visibleWidthPixels * visibleHeightPixels;
      assert(visibleWidthPixels >= 70 && visibleHeightPixels >= 70 && visibleArea >= 7_000, `${id} principal media is too small to recognize at the ${cell.id} entry`);
      const compactWidthPixels = visibleWidthPixels * 1365 / 1920;
      const compactHeightPixels = visibleHeightPixels * 768 / 1080;
      assert(compactWidthPixels >= 52 && compactHeightPixels >= 50 && compactWidthPixels * compactHeightPixels >= 3_500, `${id} principal media is too small to recognize at the 1365×768 ${cell.id} entry`);
      const frontNormal = {x: Math.sin(exhibit.rotationY), z: Math.cos(exhibit.rotationY)};
      const towardEntry = {x: entry.pose.x - principalCenter.x, z: entry.pose.z - principalCenter.z};
      const frontFacing = (frontNormal.x * towardEntry.x + frontNormal.z * towardEntry.z) / Math.hypot(towardEntry.x, towardEntry.z);
      assert(frontFacing >= .3, `${id} turns materially away from the ${cell.id} entry`);
      assertWallSightlineClear(entry.pose, principalCenter, `${id} principal media from ${cell.id} entry`, medievalLayout);
      assertWallSightlineClear(entry.pose, focalTarget, `${id} focal target from ${cell.id} entry`, medievalLayout);
      assertOtherColliderSightlineClear(entry.pose, principalCenter, id, `${id} principal media from ${cell.id} entry`, medievalLayout);
      assertOtherColliderSightlineClear(entry.pose, focalTarget, id, `${id} focal target from ${cell.id} entry`, medievalLayout);
      console.log(`  Medieval entry media ${id}: center ${principalProjection.x.toFixed(3)} NDC; 1920×1080 ${visibleWidthPixels.toFixed(1)}×${visibleHeightPixels.toFixed(1)} px; 1365×768 ${compactWidthPixels.toFixed(1)}×${compactHeightPixels.toFixed(1)} px`);
    }
  }
  for (const exhibit of medievalLayout.exhibits) {
    assert(safe(exhibit.viewpoint), `${exhibit.id} viewpoint is unsafe`);
    const cell = medievalLayout.spatialCells.find(({id}) => id === exhibit.spatialCellId);
    assert(cell?.exhibitIds.includes(exhibit.id), `${exhibit.id} is not assigned to its room`);
    const extents = footprintWorldExtents(exhibit);
    assert(exhibit.position.x - extents.x >= cell.bounds.minX - EPSILON);
    assert(exhibit.position.x + extents.x <= cell.bounds.maxX + EPSILON);
    assert(exhibit.position.z - extents.z >= cell.bounds.minZ - EPSILON);
    assert(exhibit.position.z + extents.z <= cell.bounds.maxZ + EPSILON);
    const catalog = hall.exhibits.find(({id}) => id === exhibit.id);
    const mountedAssets = exhibit.scene.mediaMounts.map(({assetId}) => assetId).sort();
    assert.deepEqual(mountedAssets, [catalog.principalAssetId, ...catalog.supportingAssetIds].sort());
    for (const volume of [
      exhibit.scene.interactionBounds,
      exhibit.scene.plaque.bounds,
      exhibit.scene.plaque.supportBounds,
      ...exhibit.scene.objectBounds,
      ...exhibit.scene.mediaMounts.flatMap(({bounds, supportBounds}) => [bounds, supportBounds]),
    ]) assert(volumeInsideFootprint(volume, exhibit.scene.footprint), `${volume.id} escapes ${exhibit.id}`);
    const base = exhibit.scene.objectBounds.find(({id}) => id === `${exhibit.id}-plinth`);
    const concept = exhibit.scene.objectBounds.find(({id}) => id === `${exhibit.id}-concept`);
    assert(base && concept, `${exhibit.id} is missing its plinth or manuscript case`);
    assert(Math.abs((concept.center.y - concept.size.height / 2) - (base.center.y + base.size.height / 2)) < EPSILON, `${exhibit.id} manuscript case is not supported by its plinth`);
    const overlapsVolume = (first, second) => ['x', 'y', 'z'].every((axis) => {
      const size = axis === 'x' ? 'width' : axis === 'y' ? 'height' : 'depth';
      return first.center[axis] - first.size[size] / 2 < second.center[axis] + second.size[size] / 2 - EPSILON
        && first.center[axis] + first.size[size] / 2 > second.center[axis] - second.size[size] / 2 + EPSILON;
    });
    for (const mount of exhibit.scene.mediaMounts.filter(({kind}) => kind === 'lectern')) {
      assert(!overlapsVolume(concept, mount.bounds), `${exhibit.id} manuscript case intersects ${mount.id}`);
      assert(!overlapsVolume(concept, mount.supportBounds), `${exhibit.id} manuscript case intersects the ${mount.id} support`);
    }
  }
  const unequalCeilingConnections = medievalLayout.spatialConnections.filter((connection) => {
    const from = medievalLayout.spatialCells.find(({id}) => id === connection.fromCellId);
    const to = medievalLayout.spatialCells.find(({id}) => id === connection.toCellId);
    return from && to && Math.abs(from.ceilingHeight - to.ceilingHeight) >= .02;
  });
  assert.equal(unequalCeilingConnections.length, medievalLayout.spatialConnections.length);
  assert.match(medievalArchitectureSource, /spatialConnections\.map\(\(connection\) => <ThresholdFascia/);
  assert.match(medievalArchitectureSource, /<GallerySignBack title="Ancient Greek & Hellenistic Gallery"/);
  assert.match(medievalHallSceneSource, /<directionalLight[\s\S]*target=\{target\}/, 'the transformed Medieval key light needs a hall-local target');
  assert.equal(medievalLayout.lighting.exhibitLights.length, medievalLayout.exhibits.length);
  assert(unique(medievalLayout.lighting.exhibitLights.map(({exhibitId}) => exhibitId)));
  for (const light of medievalLayout.lighting.exhibitLights) {
    const exhibit = medievalLayout.exhibits.find(({id}) => id === light.exhibitId);
    const track = medievalLayout.lighting.tracks.find(({id}) => id === light.trackId);
    assert(exhibit && track, `${light.id} has an orphan target or track`);
    assert.deepEqual(light.target, localPointToHall(exhibit, exhibit.scene.focalTarget));
    assert(light.distance >= Math.hypot(light.target.x - light.position.x, light.target.y - light.position.y, light.target.z - light.position.z));
  }
  assert.equal(medievalLayout.guidedWalkLegs.length, hall.guidedOrder.length - 1);
  const exhibitsById = new Map(medievalLayout.exhibits.map((item) => [item.id, item]));
  const guidedDistances = [];
  for (const [index, leg] of medievalLayout.guidedWalkLegs.entries()) {
    assert.equal(leg.fromExhibitId, hall.guidedOrder[index]);
    assert.equal(leg.toExhibitId, hall.guidedOrder[index + 1]);
    const from = exhibitsById.get(leg.fromExhibitId);
    const to = exhibitsById.get(leg.toExhibitId);
    const points = [from.viewpoint, ...leg.waypoints, to.viewpoint];
    const distance = points.slice(1).reduce((total, point, pointIndex) => total + segmentLength(points[pointIndex], point), 0);
    guidedDistances.push(`${leg.fromExhibitId}→${leg.toExhibitId} ${distance.toFixed(2)}`);
    const changesRoom = from.spatialCellId !== to.spatialCellId;
    assert(distance <= (changesRoom ? 17.25 : 16.5), `${leg.fromExhibitId} → ${leg.toExhibitId} is ${distance.toFixed(2)} authored units`);
    for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
      const start = points[pointIndex - 1];
      const end = points[pointIndex];
      const samples = Math.max(1, Math.ceil(segmentLength(start, end) / .08));
      for (let sampleIndex = 0; sampleIndex <= samples; sampleIndex += 1) {
        const fraction = sampleIndex / samples;
        const point = {x: start.x + (end.x - start.x) * fraction, z: start.z + (end.z - start.z) * fraction};
        assert(positionInsideSpatialUnion(point, medievalLayout.playerRadius, medievalLayout.spatialCells), `${leg.fromExhibitId} → ${leg.toExhibitId} exits the hall`);
        const blocker = colliders.find((collider) => intersects(point, medievalLayout.playerRadius, collider));
        assert(!blocker, `${leg.fromExhibitId} → ${leg.toExhibitId} hits ${blocker?.id ?? 'a collider'}`);
      }
    }
  }
  console.log(`  Medieval floor area: ${medievalLayout.floorArea} units²; guided legs: ${guidedDistances.join('; ')}`);
});

check('the two-way doorway resolves entrances, plane crossings, world pose, and safe arrivals', () => {
  const definitions = new Map([[definition.id, definition], [medievalDefinition.id, medievalDefinition]]);
  for (const source of definitions.values()) {
    assert.equal(source.connections.length, 1);
    const connection = source.connections[0];
    const target = definitions.get(connection.targetHallId);
    const localEntrance = source.entrances.find(({id}) => id === connection.localEntranceId);
    const targetEntrance = target?.entrances.find(({id}) => id === connection.targetEntranceId);
    assert(target && localEntrance && targetEntrance);
    const reciprocal = target.connections.find((item) => item.targetHallId === source.id && item.localEntranceId === targetEntrance.id && item.targetEntranceId === localEntrance.id);
    assert(reciprocal, `${source.id} → ${target.id} is not reciprocal`);
    const sourceWorld = museumPointToWorld(source, localEntrance.position);
    const targetWorld = museumPointToWorld(target, targetEntrance.position);
    assert(Math.hypot(sourceWorld.x - targetWorld.x, sourceWorld.z - targetWorld.z) < EPSILON);
    assert(Math.abs(Math.hypot(localEntrance.inwardNormal.x, localEntrance.inwardNormal.z) - 1) < EPSILON);
    const targetColliders = [...target.layout.wallColliders, ...target.layout.obstacleColliders];
    assert(isValidMuseumPosition(targetEntrance.arrivalPose, target.layout.playerRadius, target.layout.bounds, targetColliders, target.layout.spatialCells));
  }

  const ancientConnection = museumConnectionCrossed(
    definition,
    {x: 17.95, z: -28.5},
    {x: 18.05, z: -28.5},
  );
  assert.equal(ancientConnection?.targetHallId, 'medieval-worlds');
  assert.equal(museumConnectionCrossed(definition, {x: 17.9, z: -28.5}, {x: 17.95, z: -28.5}), undefined, 'movement inside the overlap must not cross early');
  const sourcePose = {x: 18.05, z: -28.5, yaw: -Math.PI / 2, pitch: .04};
  const medievalArrival = resolveMuseumHallArrival(definition, medievalDefinition, ancientConnection.targetEntranceId, sourcePose);
  assert(medievalArrival);
  const sourceWorldPose = museumPoseToWorld(definition, sourcePose);
  const targetWorldPose = museumPoseToWorld(medievalDefinition, medievalArrival);
  assert(Math.hypot(sourceWorldPose.x - targetWorldPose.x, sourceWorldPose.z - targetWorldPose.z) < EPSILON);
  assert(Math.abs(sourceWorldPose.yaw - targetWorldPose.yaw) < EPSILON);
  assert.equal(sourceWorldPose.pitch, targetWorldPose.pitch);
  const roundTrip = museumPoseFromWorld(definition, targetWorldPose);
  assert(Math.hypot(roundTrip.x - sourcePose.x, roundTrip.z - sourcePose.z) < EPSILON);

  const returnConnection = museumConnectionCrossed(medievalDefinition, {x: 0, z: -.05}, {x: 0, z: .05});
  assert.equal(returnConnection?.targetHallId, 'ancient-greek');
  const ancientArrival = resolveMuseumHallArrival(medievalDefinition, definition, returnConnection.targetEntranceId, {x: 0, z: .05, yaw: Math.PI, pitch: 0});
  assert(ancientArrival);
  assert(Math.hypot(ancientArrival.x - 17.95, ancientArrival.z + 28.5) < EPSILON);
});

check('hall prefetch declarations and qualified interpretation graph are complete', () => {
  const assetIds = new Set(MUSEUM_ASSETS.map(({id}) => id));
  const exhibitRefs = new Set(MUSEUM_HALLS.flatMap((hall) => hall.exhibits.map(({id}) => `${hall.id}:${id}`)));
  for (const hallDefinition of [definition, medievalDefinition]) {
    const hall = MUSEUM_HALLS.find(({id}) => id === hallDefinition.id);
    const expectedAssets = hall.exhibits.flatMap((item) => [item.principalAssetId, ...item.supportingAssetIds]);
    assert.deepEqual([...hallDefinition.prefetch.sceneAssetIds].sort(), [...expectedAssets].sort());
    assert(hallDefinition.prefetch.entrySceneAssetIds.length >= 2);
    assert(hallDefinition.prefetch.entrySceneAssetIds.every((id) => hallDefinition.prefetch.sceneAssetIds.includes(id) && assetIds.has(id)));
    assert.equal(hallDefinition.prefetch.adjacentHallIds.length, 1);
  }
  assert.equal(MUSEUM_INTERPRETATIONS.length, exhibitRefs.size);
  assert(unique(MUSEUM_INTERPRETATIONS.map(({hallId, id}) => `${hallId}:${id}`)));
  for (const interpretation of MUSEUM_INTERPRETATIONS) {
    const reference = `${interpretation.hallId}:${interpretation.id}`;
    assert(exhibitRefs.has(reference), `${reference} is an orphan interpretation`);
    assert(interpretation.sources.length >= 3, `${reference} lacks curated sources`);
    assert(interpretation.relatedExhibits.length > 0, `${reference} lacks related exhibits`);
    assert(interpretation.relatedExhibits.every((item) => exhibitRefs.has(`${item.hallId}:${item.exhibitId}`)), `${reference} has an invalid related exhibit`);
    if (interpretation.hallId === 'medieval-worlds') {
      const words = wordCount(interpretation.lead);
      assert(words >= 150 && words <= 250, `${reference} lead has ${words} words`);
      assert.equal(interpretation.kind, 'philosopher');
      assert(interpretation.originalName?.trim(), `${reference} needs an original-language name`);
      assert(interpretation.biography.associatedPlaces.length >= 2);
      assert(interpretation.biography.affiliations.length >= 2);
      assert(interpretation.biography.influencedBy.length >= 2);
      assert(interpretation.biography.sourceSituation.trim());
      assert(interpretation.keyWorks.length >= 3);
      assert(interpretation.keyIdeas.length >= 3);
      assert(interpretation.sections.length >= 3);
    }
  }
  const leadCounts = MUSEUM_INTERPRETATIONS.filter(({hallId}) => hallId === 'medieval-worlds').map(({id, lead}) => `${id} ${wordCount(lead)}`);
  console.log(`  Medieval interpretation lead words: ${leadCounts.join('; ')}`);
});

check('the persistent runtime, directory, and failure recovery cover both halls without a second Canvas', () => {
  assert.equal((museumWorldSource.match(/<Canvas\b/g) ?? []).length, 1);
  assert.match(museumWorldSource, /props\.registrations\.map/);
  assert.match(museumWorldSource, /onHallTransition\(connection\)/);
  assert.match(museumWorldSource, /pose\.x = previousPosition\.x;[\s\S]*pose\.z = previousPosition\.z;/, 'blocked crossings must retain an inward pose until the target is ready');
  assert.match(museumWorldSource, /frameloop=\{renderable \? 'demand' : 'never'\}/, 'the Canvas must render on demand rather than continuously while idle');
  assert.doesNotMatch(museumWorldSource, /frameloop=\{[^}]*'always'/);
  assert.match(museumWorldSource, /inputRef\.current\.requestFrame = requestFrame/);
  assert.match(museumPageSource, /MUSEUM_HALLS\.map/);
  assert.match(museumPageSource, /onHallActivate/);
  assert.match(museumPageSource, /onZoneViewpoint/);
  assert.match(museumPageSource, /replace\(\s*\{kind: 'museum', hallId: connection\.targetHallId\}/);
  assert.match(museumPageSource, /retryHallContent/);
  assert.match(museumPageSource, /key=\{sceneEpoch\}/);
  assert.doesNotMatch(museumPageSource, /key=\{(?:activeHallId|route\.hallId)\}/, 'hall routes must not remount the Canvas owner');
  assert.match(museumPageSource, /pendingHallTransitionRef/);
  assert.match(museumPageSource, /pendingCrossHallCloseRef/);
  assert.match(museumPageSource, /failedHallContentIdsRef/);
  assert.match(museumPageSource, /Retry connection/);
  assert.match(museumPageSource, /activeHallLoading \|\| activeHallLoadFailed/);
  assert.match(museumPageSource, /focusSuspended[\s\S]*onClick=\{controls\.handleSceneGesture\}[\s\S]*Resume visit/, 'focus-suspended visits need a keyboard-operable resume action');
  assert.match(museumPageSource, /role="group" aria-label="Choose a Museum gallery"/);
  assert.doesNotMatch(museumPageSource, /role="tablist"|role="tab"/);
  assert.match(museumPageSource, /returnFocus=\{overlayOpenerRef\.current\}/);
  assert.match(museumPageSource, /retryingHallIdsRef/);
  assert.match(museumPageSource, /connection\?\.saveData/);
  assert.match(museumPageSource, /lastSavedHallSignatureRef/);
  const medievalEntryExhibitIds = ['augustine', 'boethius'];
  const medievalHall = MUSEUM_HALLS.find(({id}) => id === 'medieval-worlds');
  const mountedEntryAssets = medievalHall.exhibits
    .filter(({id}) => medievalEntryExhibitIds.includes(id))
    .flatMap(({principalAssetId, supportingAssetIds}) => [principalAssetId, ...supportingAssetIds]);
  assert.deepEqual([...medievalDefinition.prefetch.entrySceneAssetIds].sort(), mountedEntryAssets.sort(), 'Medieval entry prefetch must cover every asset mounted in the inactive threshold view');
  assert.doesNotMatch(museumPageSource, /Suspense fallback=\{<div className="museum-scene-loading"/, 'hall loading must remain nonblocking');
  assert.match(museumRegistrySource, /prefetchMuseumHallEntry/);
  assert.match(museumRegistrySource, /Promise\.allSettled/);
  assert.match(museumRegistrySource, /import\('\.\/MedievalWorldsHallScene'\)/);
});

console.log(`\nMuseum audit passed: ${checks} groups covering ${MUSEUM_HALLS.length} halls, ${MUSEUM_HALLS.reduce((total, hall) => total + hall.exhibits.length, 0)} exhibits, and ${MUSEUM_HALLS.reduce((total, hall) => total + hall.zones.length, 0)} zones.`);
