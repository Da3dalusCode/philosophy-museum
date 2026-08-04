import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const virtualEntry = 'virtual:philosophy-atlas-museum-route-inlay-audit';
const resolvedEntry = `\0${virtualEntry}`;
const result = await build({
  root: repoRoot,
  configFile: false,
  logLevel: 'silent',
  ssr: {noExternal: true},
  plugins: [{
    name: 'museum-route-inlay-audit-entry',
    resolveId: (id) => id === virtualEntry ? resolvedEntry : undefined,
    load: (id) => id === resolvedEntry ? `
      export * from '/src/data/museum/museumBuildingManifest.ts';
      export * from '/src/data/museum/museumBuildingRuntime.ts';
      export * from '/src/data/museum/museumArchitectureMaterials.ts';
      export * from '/src/data/museum/museumRouteInlay.ts';
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
assert(entry, 'Vite did not produce the route-inlay audit entry.');
const bundledSource = `${entry.code}\n//# sourceURL=philosophy-atlas-route-inlay-audit.bundle.mjs`;
const museum = await import(`data:text/javascript;base64,${Buffer.from(bundledSource).toString('base64')}`);
const {
  MUSEUM_BUILDING_MANIFEST,
  MUSEUM_ROUTE_INLAY,
  MUSEUM_ROUTE_INLAY_RENDER_OFFSET,
  MUSEUM_RUNTIME_NODES,
  museumRuntimePointToWorld,
} = museum;

const EPSILON = .002;
const close = (first, second, epsilon = EPSILON) => Math.abs(first - second) <= epsilon;
const samePoint = (first, second, epsilon = EPSILON) =>
  close(first.x, second.x, epsilon) && close(first.z, second.z, epsilon);
const pointKey = ({x, z}) => `${x.toFixed(4)}:${z.toFixed(4)}`;
const undirectedSegmentKey = ({from, to}) =>
  [pointKey(from), pointKey(to)].sort().join('->');
const unique = (values) => new Set(values).size === values.length;
const nodeById = new Map(MUSEUM_RUNTIME_NODES.map((node) => [node.id, node]));

const worldToLocal = (node, point) => {
  const cosine = Math.cos(node.worldTransform.yaw);
  const sine = Math.sin(node.worldTransform.yaw);
  const dx = point.x - node.worldTransform.x;
  const dz = point.z - node.worldTransform.z;
  return {x: dx * cosine - dz * sine, z: dx * sine + dz * cosine};
};

const sampleSegment = (segment, step, visitor) => {
  const length = Math.hypot(segment.to.x - segment.from.x, segment.to.z - segment.from.z);
  const sampleCount = Math.max(1, Math.ceil(length / step));
  for (let index = 0; index <= sampleCount; index += 1) {
    const progress = index / sampleCount;
    visitor({
      x: segment.from.x + (segment.to.x - segment.from.x) * progress,
      z: segment.from.z + (segment.to.z - segment.from.z) * progress,
    });
  }
};

const insideSpatialUnion = (node, point) => node.layout.spatialCells.some(({bounds}) =>
  point.x >= bounds.minX - EPSILON
  && point.x <= bounds.maxX + EPSILON
  && point.z >= bounds.minZ - EPSILON
  && point.z <= bounds.maxZ + EPSILON);

const pointIntersectsCollider = (point, radius, collider) => {
  const cosine = Math.cos(-collider.rotation);
  const sine = Math.sin(-collider.rotation);
  const dx = point.x - collider.center.x;
  const dz = point.z - collider.center.z;
  const localX = dx * cosine - dz * sine;
  const localZ = dx * sine + dz * cosine;
  return Math.abs(localX) < collider.size.width / 2 + radius - EPSILON
    && Math.abs(localZ) < collider.size.depth / 2 + radius - EPSILON;
};

const pointOnSegment = (point, segment) => {
  const dx = segment.to.x - segment.from.x;
  const dz = segment.to.z - segment.from.z;
  const lengthSquared = dx * dx + dz * dz;
  if (lengthSquared <= EPSILON * EPSILON) return samePoint(point, segment.from);
  const progress = ((point.x - segment.from.x) * dx + (point.z - segment.from.z) * dz) / lengthSquared;
  if (progress < -EPSILON || progress > 1 + EPSILON) return false;
  return samePoint(point, {
    x: segment.from.x + progress * dx,
    z: segment.from.z + progress * dz,
  });
};

const collinearOverlap = (first, second) => {
  const firstVector = {x: first.to.x - first.from.x, z: first.to.z - first.from.z};
  const secondVector = {x: second.to.x - second.from.x, z: second.to.z - second.from.z};
  const cross = firstVector.x * secondVector.z - firstVector.z * secondVector.x;
  const offset = {x: second.from.x - first.from.x, z: second.from.z - first.from.z};
  const offsetCross = firstVector.x * offset.z - firstVector.z * offset.x;
  if (Math.abs(cross) > EPSILON || Math.abs(offsetCross) > EPSILON) return 0;
  const length = Math.hypot(firstVector.x, firstVector.z);
  const axis = {x: firstVector.x / length, z: firstVector.z / length};
  const projection = (point) => point.x * axis.x + point.z * axis.z;
  const firstRange = [projection(first.from), projection(first.to)].sort((a, b) => a - b);
  const secondRange = [projection(second.from), projection(second.to)].sort((a, b) => a - b);
  return Math.max(0, Math.min(firstRange[1], secondRange[1]) - Math.max(firstRange[0], secondRange[0]));
};

const throughConnections = MUSEUM_BUILDING_MANIFEST.connections.filter(({routeRole}) => routeRole === 'through-route');
assert.equal(throughConnections.length, 37, 'The main inlay must derive from all 37 chronological seams.');
assert.equal(MUSEUM_ROUTE_INLAY.main.spans.length, throughConnections.length + 1);
assert.equal(MUSEUM_ROUTE_INLAY.main.spans[0].nodeId, MUSEUM_BUILDING_MANIFEST.throughRoute.start);
assert.equal(MUSEUM_ROUTE_INLAY.main.spans.at(-1).nodeId, MUSEUM_BUILDING_MANIFEST.throughRoute.finish);

const galleryOrder = MUSEUM_ROUTE_INLAY.main.spans
  .map(({nodeId}) => nodeById.get(nodeId)?.programHallId)
  .filter(Boolean);
assert.deepEqual(galleryOrder, MUSEUM_BUILDING_MANIFEST.throughRoute.hallOrder,
  'The inlay no longer traverses Gallery 01–26 in architectural visit order.');

for (let index = 1; index < MUSEUM_ROUTE_INLAY.main.spans.length; index += 1) {
  const previous = MUSEUM_ROUTE_INLAY.main.spans[index - 1];
  const current = MUSEUM_ROUTE_INLAY.main.spans[index];
  assert(samePoint(previous.points.at(-1), current.points[0]),
    `Main inlay breaks between ${previous.nodeId} and ${current.nodeId}.`);
}

const entranceNode = nodeById.get(MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId);
const entrance = entranceNode.entrances.find(({id}) => id === MUSEUM_BUILDING_MANIFEST.mainEntrance.slotId);
assert(samePoint(
  MUSEUM_ROUTE_INLAY.main.spans[0].points[0],
  museumRuntimePointToWorld(entranceNode, entrance.position),
), 'The inlay does not begin at the Main Entrance.');
const finalNode = nodeById.get(MUSEUM_BUILDING_MANIFEST.finalThresholdNodeId);
const finalExit = finalNode.entrances.find(({id}) => id === 'return-exit');
assert(samePoint(
  MUSEUM_ROUTE_INLAY.main.spans.at(-1).points.at(-1),
  museumRuntimePointToWorld(finalNode, finalExit.position),
), 'The inlay does not finish at the final return/exit.');

const turnSpans = MUSEUM_ROUTE_INLAY.main.spans.filter(({nodeId}) => nodeById.get(nodeId)?.kind === 'court');
assert.equal(turnSpans.length, 5, 'The inlay must traverse all five turn courts.');
for (const span of turnSpans) {
  assert(span.points.length >= 3, `${span.nodeId} has no visible right-angle route guidance.`);
  const directions = span.points.slice(1).map((point, index) => ({
    x: point.x - span.points[index].x,
    z: point.z - span.points[index].z,
  }));
  assert(directions.some((direction, index) => index
    && Math.abs(direction.x * directions[index - 1].z - direction.z * directions[index - 1].x) > EPSILON),
  `${span.nodeId} no longer shows its turn.`);
}

const crosscutConnections = MUSEUM_BUILDING_MANIFEST.connections.filter(({routeRole}) => routeRole === 'crosscut');
assert.equal(crosscutConnections.length, 6);
assert.equal(MUSEUM_ROUTE_INLAY.crosscut.spans.length, 7,
  'The quieter crosscut must join six seams and the north extension terminus.');
for (let index = 1; index < MUSEUM_ROUTE_INLAY.crosscut.spans.length; index += 1) {
  const previous = MUSEUM_ROUTE_INLAY.crosscut.spans[index - 1];
  const current = MUSEUM_ROUTE_INLAY.crosscut.spans[index];
  assert(samePoint(previous.points.at(-1), current.points[0]),
    `Crosscut inlay breaks between ${previous.nodeId} and ${current.nodeId}.`);
}

const intersectionNodeIds = [
  ...MUSEUM_BUILDING_MANIFEST.crosscut.intersections.map((intersection) =>
    intersection.nodeId
      ?? nodeById.get(`hall:${intersection.occupiedByHallId}`)?.id
      ?? intersection.id),
];
assert.equal(intersectionNodeIds.length, 6);
for (const nodeId of intersectionNodeIds) {
  const node = nodeById.get(nodeId);
  const mainSegments = MUSEUM_ROUTE_INLAY.main.segments.filter((segment) => segment.ownerNodeId === nodeId);
  const crosscutSegmentsForNode = MUSEUM_ROUTE_INLAY.crosscut.segments.filter((segment) => segment.ownerNodeId === nodeId);
  assert(mainSegments.length && crosscutSegmentsForNode.length, `${nodeId} is not represented by both route treatments.`);
  const localCenter = {
    x: (node.layout.bounds.minX + node.layout.bounds.maxX) / 2,
    z: (node.layout.bounds.minZ + node.layout.bounds.maxZ) / 2,
  };
  const center = museumRuntimePointToWorld(node, localCenter);
  assert(mainSegments.some((segment) => pointOnSegment(center, segment))
    && crosscutSegmentsForNode.some((segment) => pointOnSegment(center, segment)),
  `${nodeId} crosscut treatment does not connect to the chronological route.`);
}

assert.equal(MUSEUM_ROUTE_INLAY.floorElevation, MUSEUM_BUILDING_MANIFEST.level.elevation);
assert.equal(MUSEUM_ROUTE_INLAY.renderOffset, MUSEUM_ROUTE_INLAY_RENDER_OFFSET);
assert(MUSEUM_ROUTE_INLAY.renderOffset > 0 && MUSEUM_ROUTE_INLAY.renderOffset <= .006,
  'The inlay render offset must remain microscopic.');
assert.equal(MUSEUM_ROUTE_INLAY.physicalHeight, 0, 'The inlay must remain a zero-thickness floor plane.');
assert.deepEqual(MUSEUM_ROUTE_INLAY.collisionOwnerIds, [], 'The inlay must own no collision geometry.');

const allSegments = [...MUSEUM_ROUTE_INLAY.main.segments, ...MUSEUM_ROUTE_INLAY.crosscut.segments];
assert(unique(allSegments.map(({id}) => id)), 'Route-inlay segment IDs must be unique.');
assert(allSegments.every((segment) => Math.hypot(segment.to.x - segment.from.x, segment.to.z - segment.from.z) > EPSILON),
  'Route-inlay segments must have nonzero length.');
for (const kind of ['main', 'crosscut']) {
  const segments = allSegments.filter((segment) => segment.kind === kind);
  assert(unique(segments.map(undirectedSegmentKey)), `${kind} route contains duplicate segments.`);
  for (let firstIndex = 0; firstIndex < segments.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < segments.length; secondIndex += 1) {
      assert(collinearOverlap(segments[firstIndex], segments[secondIndex]) <= EPSILON,
        `${kind} route overlaps ${segments[firstIndex].id} and ${segments[secondIndex].id}.`);
    }
  }
}

for (const segment of allSegments) {
  const owner = nodeById.get(segment.ownerNodeId);
  assert(owner, `${segment.id} has no architecture owner.`);
  const ownedColliders = [...owner.layout.wallColliders, ...owner.layout.obstacleColliders];
  sampleSegment(segment, .1, (worldPoint) => {
    const localPoint = worldToLocal(owner, worldPoint);
    assert(insideSpatialUnion(owner, localPoint), `${segment.id} leaves ${owner.id}'s floor architecture.`);
    const blockers = owner.layout.obstacleColliders
      .filter((collider) => pointIntersectsCollider(localPoint, .04, collider));
    assert(!blockers.length,
      `${segment.id} crosses ${blockers.map(({id}) => id).join(', ')} in ${owner.id} near ${JSON.stringify(localPoint)}.`);
  });
  assert(!ownedColliders.some(({id}) => id === segment.id), `${segment.id} was registered as a collider.`);
}

assert(unique(MUSEUM_ROUTE_INLAY.markers.map(({id}) => id)), 'Route-inlay marker IDs must be unique.');
assert.equal(MUSEUM_ROUTE_INLAY.markers.filter(({role}) => role === 'entrance').length, 1);
assert.equal(MUSEUM_ROUTE_INLAY.markers.filter(({role}) => role === 'exit').length, 1);

const componentSource = readFileSync(
  resolve(repoRoot, 'src/components/MuseumGallery/MuseumRouteInlay.tsx'),
  'utf8',
);
assert.match(componentSource, /<planeGeometry\b/, 'Route segments must render as zero-thickness planes.');
assert.doesNotMatch(componentSource, /<boxGeometry\b/, 'Route inlay must not render raised boxes.');
assert.doesNotMatch(componentSource, /\btransparent\b|\bopacity\b|\bpolygonOffset\b/,
  'Route inlay must not use transparent or depth-offset hacks.');

console.log('Museum route-inlay audit passed.');
console.log(`  main: ${MUSEUM_ROUTE_INLAY.main.segments.length} segments · ${MUSEUM_ROUTE_INLAY.main.spans.length} architecture spans · 37 continuous thresholds`);
console.log(`  turns: ${turnSpans.length} courts · galleries: ${galleryOrder.length}`);
console.log(`  crosscut: ${MUSEUM_ROUTE_INLAY.crosscut.segments.length} segments · ${crosscutConnections.length} branch connections`);
console.log(`  floor: L0 ${MUSEUM_ROUTE_INLAY.floorElevation.toFixed(3)} m · render offset ${MUSEUM_ROUTE_INLAY.renderOffset.toFixed(3)} m · collision owners 0`);
