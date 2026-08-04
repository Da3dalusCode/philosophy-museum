import {MUSEUM_ROUTE_INLAY_RENDER_OFFSET} from './museumArchitectureMaterials';
import {MUSEUM_BUILDING_MANIFEST} from './museumBuildingManifest';
import {
  MUSEUM_RUNTIME_NODES,
  museumRuntimePointToWorld,
} from './museumBuildingRuntime';
import type {
  MuseumHallEntrance,
  MuseumCirculationPath,
  MuseumPoint,
  MuseumRuntimeNodeDefinition,
  MuseumSpatialCell,
} from './museumWorldTypes';

export type MuseumRouteInlayKind = 'main' | 'crosscut';

export type MuseumRouteInlaySegment = Readonly<{
  id: string;
  kind: MuseumRouteInlayKind;
  ownerNodeId: string;
  from: MuseumPoint;
  to: MuseumPoint;
}>;

export type MuseumRouteInlaySpan = Readonly<{
  id: string;
  kind: MuseumRouteInlayKind;
  nodeId: string;
  inputId: string;
  outputId: string;
  points: readonly MuseumPoint[];
  segmentIds: readonly string[];
}>;

export type MuseumRouteInlayMarker = Readonly<{
  id: string;
  kind: MuseumRouteInlayKind;
  role: 'entrance' | 'threshold' | 'turn' | 'intersection' | 'exit' | 'terminus';
  nodeId: string;
  point: MuseumPoint;
}>;

const EPSILON = .001;
const runtimeNodeById = new Map(MUSEUM_RUNTIME_NODES.map((node) => [node.id, node]));

const distance = (first: MuseumPoint, second: MuseumPoint): number =>
  Math.hypot(second.x - first.x, second.z - first.z);

const samePoint = (first: MuseumPoint, second: MuseumPoint): boolean =>
  distance(first, second) <= EPSILON;

const compactPolyline = (points: readonly MuseumPoint[]): readonly MuseumPoint[] => {
  const unique = points.filter((point, index) => !index || !samePoint(point, points[index - 1]));
  const result: MuseumPoint[] = [];
  for (const point of unique) {
    const before = result[result.length - 2];
    const previous = result[result.length - 1];
    if (before && previous) {
      const first = {x: previous.x - before.x, z: previous.z - before.z};
      const second = {x: point.x - previous.x, z: point.z - previous.z};
      const collinear = Math.abs(first.x * second.z - first.z * second.x) <= EPSILON;
      const continues = first.x * second.x + first.z * second.z >= 0;
      if (collinear && continues) {
        result[result.length - 1] = point;
        continue;
      }
    }
    result.push(point);
  }
  return result;
};

const requireNode = (nodeId: string): MuseumRuntimeNodeDefinition => {
  const node = runtimeNodeById.get(nodeId);
  if (!node) throw new Error(`Museum route inlay cannot resolve node ${nodeId}.`);
  return node;
};

const requireEntrance = (
  node: MuseumRuntimeNodeDefinition,
  entranceId: string,
): MuseumHallEntrance => {
  const entrance = node.entrances.find(({id}) => id === entranceId);
  if (!entrance) throw new Error(`Museum route inlay cannot resolve ${node.id}/${entranceId}.`);
  return entrance;
};

const shortestCirculationPath = (
  node: MuseumRuntimeNodeDefinition,
  start: MuseumPoint,
  finish: MuseumPoint,
): readonly MuseumPoint[] => {
  const circulation = (node.layout as typeof node.layout & {
    primaryCirculation?: MuseumCirculationPath;
  }).primaryCirculation;
  if (!circulation?.points.length) return [];

  const pointByKey = new Map<string, MuseumPoint>();
  const neighbours = new Map<string, Map<string, number>>();
  const keyFor = (point: MuseumPoint): string => `${point.x.toFixed(4)}:${point.z.toFixed(4)}`;
  const register = (point: MuseumPoint): string => {
    const key = keyFor(point);
    pointByKey.set(key, point);
    if (!neighbours.has(key)) neighbours.set(key, new Map());
    return key;
  };
  for (let index = 1; index < circulation.points.length; index += 1) {
    const first = circulation.points[index - 1];
    const second = circulation.points[index];
    const firstKey = register(first);
    const secondKey = register(second);
    const length = distance(first, second);
    if (length <= EPSILON) continue;
    neighbours.get(firstKey)?.set(secondKey, length);
    neighbours.get(secondKey)?.set(firstKey, length);
  }

  const nearestKey = (target: MuseumPoint): string => {
    const nearest = [...pointByKey].reduce((best, candidate) =>
      distance(candidate[1], target) < distance(best[1], target) ? candidate : best);
    return nearest[0];
  };
  const startKey = nearestKey(start);
  const finishKey = nearestKey(finish);
  const pending = new Set(pointByKey.keys());
  const cost = new Map<string, number>([[startKey, 0]]);
  const previous = new Map<string, string>();
  while (pending.size) {
    const current = [...pending].reduce<string | undefined>((best, candidate) =>
      best === undefined || (cost.get(candidate) ?? Infinity) < (cost.get(best) ?? Infinity)
        ? candidate
        : best, undefined);
    if (!current || (cost.get(current) ?? Infinity) === Infinity) break;
    pending.delete(current);
    if (current === finishKey) break;
    for (const [next, edgeCost] of neighbours.get(current) ?? []) {
      if (!pending.has(next)) continue;
      const candidateCost = (cost.get(current) ?? Infinity) + edgeCost;
      if (candidateCost < (cost.get(next) ?? Infinity)) {
        cost.set(next, candidateCost);
        previous.set(next, current);
      }
    }
  }
  const keys = [finishKey];
  while (keys[0] !== startKey) {
    const predecessor = previous.get(keys[0]);
    if (!predecessor) return [];
    keys.unshift(predecessor);
  }
  return keys.map((key) => pointByKey.get(key) as MuseumPoint);
};

const cellCenter = ({bounds}: MuseumSpatialCell): MuseumPoint => ({
  x: (bounds.minX + bounds.maxX) / 2,
  z: (bounds.minZ + bounds.maxZ) / 2,
});

const turnCourtPath = (
  node: MuseumRuntimeNodeDefinition,
  start: MuseumPoint,
  finish: MuseumPoint,
): readonly MuseumPoint[] => {
  const cells = node.layout.spatialCells;
  const axes = cells.map((cell) => cell.guidanceAxis
    ?? (cell.bounds.maxX - cell.bounds.minX >= cell.bounds.maxZ - cell.bounds.minZ ? 'x' : 'z'));
  const points: MuseumPoint[] = [start];
  for (let index = 1; index < cells.length; index += 1) {
    const previous = cellCenter(cells[index - 1]);
    const current = cellCenter(cells[index]);
    if (axes[index - 1] === axes[index]) {
      points.push({x: (previous.x + current.x) / 2, z: (previous.z + current.z) / 2});
    } else {
      points.push(axes[index - 1] === 'x'
        ? {x: current.x, z: previous.z}
        : {x: previous.x, z: current.z});
    }
  }
  points.push(finish);
  return compactPolyline(points);
};

const rectilinearPath = (
  node: MuseumRuntimeNodeDefinition,
  start: MuseumPoint,
  finish: MuseumPoint,
): readonly MuseumPoint[] => {
  if (Math.abs(start.x - finish.x) <= EPSILON || Math.abs(start.z - finish.z) <= EPSILON) {
    return [start, finish];
  }
  const center = cellCenter({bounds: node.layout.bounds} as MuseumSpatialCell);
  return compactPolyline([
    start,
    {x: center.x, z: start.z},
    {x: center.x, z: finish.z},
    finish,
  ]);
};

const routeBetweenEntrances = (
  node: MuseumRuntimeNodeDefinition,
  input: MuseumHallEntrance,
  output: MuseumHallEntrance,
): readonly MuseumPoint[] => {
  const interior = node.kind === 'court'
    ? turnCourtPath(node, input.arrivalPose, output.arrivalPose)
    : node.publicHallId
      ? shortestCirculationPath(node, input.arrivalPose, output.arrivalPose)
      : rectilinearPath(node, input.arrivalPose, output.arrivalPose);
  return compactPolyline([
    input.position,
    input.arrivalPose,
    ...interior,
    output.arrivalPose,
    output.position,
  ]);
};

const worldPoints = (
  node: MuseumRuntimeNodeDefinition,
  localPoints: readonly MuseumPoint[],
): readonly MuseumPoint[] => compactPolyline(
  localPoints.map((point) => museumRuntimePointToWorld(node, point)),
);

const segmentsForSpan = (
  id: string,
  kind: MuseumRouteInlayKind,
  nodeId: string,
  points: readonly MuseumPoint[],
): readonly MuseumRouteInlaySegment[] => points.slice(1).map((to, index) => ({
  id: `${id}:segment-${String(index + 1).padStart(2, '0')}`,
  kind,
  ownerNodeId: nodeId,
  from: points[index],
  to,
}));

const createSpan = (
  id: string,
  kind: MuseumRouteInlayKind,
  node: MuseumRuntimeNodeDefinition,
  inputId: string,
  outputId: string,
  localPoints: readonly MuseumPoint[],
): {span: MuseumRouteInlaySpan; segments: readonly MuseumRouteInlaySegment[]} => {
  const points = worldPoints(node, localPoints);
  const segments = segmentsForSpan(id, kind, node.id, points);
  return {
    span: {id, kind, nodeId: node.id, inputId, outputId, points, segmentIds: segments.map(({id: segmentId}) => segmentId)},
    segments,
  };
};

const buildMainRoute = () => {
  const connections = MUSEUM_BUILDING_MANIFEST.connections
    .filter(({accessible, implementationStatus, routeRole}) =>
      accessible && implementationStatus === 'live' && routeRole === 'through-route');
  const remaining = new Set(connections.map(({id}) => id));
  const spans: MuseumRouteInlaySpan[] = [];
  const segments: MuseumRouteInlaySegment[] = [];
  let currentNodeId = MUSEUM_BUILDING_MANIFEST.throughRoute.start;
  let inputId = MUSEUM_BUILDING_MANIFEST.mainEntrance.slotId;
  let ordinal = 0;
  while (true) {
    const node = requireNode(currentNodeId);
    const next = connections.find((connection) => remaining.has(connection.id)
      && (connection.a.nodeId === currentNodeId || connection.b.nodeId === currentNodeId));
    const outputId = next
      ? (next.a.nodeId === currentNodeId ? next.a.slotId : next.b.slotId)
      : node.entrances.find(({id}) => id !== inputId)?.id;
    if (!outputId) throw new Error(`Museum main route has no exit from ${currentNodeId}.`);
    const input = requireEntrance(node, inputId);
    const output = requireEntrance(node, outputId);
    const created = createSpan(
      `route-inlay:main:${String(ordinal).padStart(2, '0')}:${node.id}`,
      'main',
      node,
      inputId,
      outputId,
      routeBetweenEntrances(node, input, output),
    );
    spans.push(created.span);
    segments.push(...created.segments);
    if (!next) {
      if (currentNodeId !== MUSEUM_BUILDING_MANIFEST.throughRoute.finish) {
        throw new Error(`Museum main route stops early at ${currentNodeId}.`);
      }
      break;
    }
    remaining.delete(next.id);
    const nextEndpoint = next.a.nodeId === currentNodeId ? next.b : next.a;
    currentNodeId = nextEndpoint.nodeId;
    inputId = nextEndpoint.slotId;
    ordinal += 1;
  }
  if (remaining.size) throw new Error('Museum main route inlay did not consume every through-route seam.');
  return {spans, segments};
};

const buildCrosscutRoute = () => {
  const connections = MUSEUM_BUILDING_MANIFEST.connections
    .filter(({accessible, implementationStatus, routeRole}) =>
      accessible && implementationStatus === 'live' && routeRole === 'crosscut');
  const spans: MuseumRouteInlaySpan[] = [];
  const segments: MuseumRouteInlaySegment[] = [];
  const nodeIds = [connections[0]?.a.nodeId, ...connections.map(({b}) => b.nodeId)].filter(Boolean) as string[];
  for (let index = 0; index < nodeIds.length; index += 1) {
    const node = requireNode(nodeIds[index]);
    const incoming = index ? connections[index - 1].b.slotId : undefined;
    const outgoing = connections[index]?.a.slotId;
    let inputId = incoming ?? 'main-intersection';
    let outputId = outgoing ?? 'extension-terminus';
    let localPoints: readonly MuseumPoint[];
    if (!incoming && outgoing) {
      const output = requireEntrance(node, outgoing);
      localPoints = rectilinearPath(node, cellCenter({bounds: node.layout.bounds} as MuseumSpatialCell), output.position);
    } else if (incoming && outgoing) {
      const input = requireEntrance(node, incoming);
      const output = requireEntrance(node, outgoing);
      localPoints = routeBetweenEntrances(node, input, output);
    } else if (incoming) {
      const input = requireEntrance(node, incoming);
      localPoints = rectilinearPath(node, input.position, cellCenter({bounds: node.layout.bounds} as MuseumSpatialCell));
    } else {
      throw new Error('Museum crosscut route is empty.');
    }
    const created = createSpan(
      `route-inlay:crosscut:${String(index).padStart(2, '0')}:${node.id}`,
      'crosscut',
      node,
      inputId,
      outputId,
      localPoints,
    );
    spans.push(created.span);
    segments.push(...created.segments);
  }
  return {spans, segments};
};

const main = buildMainRoute();
const crosscut = buildCrosscutRoute();
const firstMainSpan = main.spans[0];
const lastMainSpan = main.spans[main.spans.length - 1];

export const MUSEUM_ROUTE_INLAY = Object.freeze({
  levelId: MUSEUM_BUILDING_MANIFEST.level.id,
  floorElevation: MUSEUM_BUILDING_MANIFEST.level.elevation,
  renderOffset: MUSEUM_ROUTE_INLAY_RENDER_OFFSET,
  physicalHeight: 0,
  collisionOwnerIds: Object.freeze([]) as readonly string[],
  main: Object.freeze(main),
  crosscut: Object.freeze(crosscut),
  markers: Object.freeze([
    {
      id: 'route-inlay:marker:main-entrance', kind: 'main', role: 'entrance',
      nodeId: firstMainSpan.nodeId, point: firstMainSpan.points[0],
    },
    ...main.spans.slice(0, -1).map((span, index) => ({
      id: `route-inlay:marker:threshold-${String(index + 1).padStart(2, '0')}`,
      kind: 'main' as const,
      role: requireNode(span.nodeId).kind === 'court' ? 'turn' as const : 'threshold' as const,
      nodeId: span.nodeId,
      point: span.points[span.points.length - 1],
    })),
    {
      id: 'route-inlay:marker:final-exit', kind: 'main', role: 'exit',
      nodeId: lastMainSpan.nodeId, point: lastMainSpan.points[lastMainSpan.points.length - 1],
    },
    ...crosscut.spans.map((span, index) => ({
      id: `route-inlay:marker:crosscut-${String(index + 1).padStart(2, '0')}`,
      kind: 'crosscut' as const,
      role: index === crosscut.spans.length - 1 ? 'terminus' as const : 'intersection' as const,
      nodeId: span.nodeId,
      point: index ? span.points[span.points.length - 1] : span.points[0],
    })),
  ] satisfies readonly MuseumRouteInlayMarker[]),
});
