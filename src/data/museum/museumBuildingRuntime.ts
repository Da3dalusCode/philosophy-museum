import {ANCIENT_GREEK_HALL_DEFINITION} from './ancientGreekHall';
import {ETHICS_JUSTICE_POLITICAL_LIFE_HALL_DEFINITION} from './ethicsJusticePoliticalLifeHall';
import {LOGIC_LANGUAGE_SCIENCE_HALL_DEFINITION} from './logicLanguageScienceHall';
import {MIND_CONSCIOUSNESS_SELF_HALL_DEFINITION} from './mindConsciousnessSelfHall';
import {MODERNITY_FREEDOM_CRITIQUE_HALL_DEFINITION} from './modernityFreedomCritiqueHall';
import {RENAISSANCE_REASON_REVOLUTION_HALL_DEFINITION} from './renaissanceReasonRevolutionHall';
import {
  MUSEUM_BUILDING_MANIFEST,
  type MuseumManifestDoorwaySlot,
  type MuseumManifestGeometryCell,
  type MuseumManifestNode,
} from './museumBuildingManifest';
import {resolveMuseumHallShell} from './museumHallTemplates';
import type {
  MuseumBounds,
  MuseumDirectedConnection,
  MuseumHallContentDefinition,
  MuseumHallDefinition,
  MuseumHallEntrance,
  MuseumNavigationLayout,
  MuseumPhysicalNodeId,
  MuseumReservation,
  MuseumRuntimeNodeDefinition,
  MuseumSpatialCell,
  MuseumWallDefinition,
} from './museumWorldTypes';
import type {MuseumHallId} from '../museumCatalog';

const hallContents = [
  ANCIENT_GREEK_HALL_DEFINITION,
  RENAISSANCE_REASON_REVOLUTION_HALL_DEFINITION,
  MODERNITY_FREEDOM_CRITIQUE_HALL_DEFINITION,
  LOGIC_LANGUAGE_SCIENCE_HALL_DEFINITION,
  ETHICS_JUSTICE_POLITICAL_LIFE_HALL_DEFINITION,
  MIND_CONSCIOUSNESS_SELF_HALL_DEFINITION,
] as const satisfies readonly MuseumHallContentDefinition[];

const toEntrance = (slot: MuseumManifestDoorwaySlot): MuseumHallEntrance => ({
  id: slot.id,
  position: slot.position,
  inwardNormal: slot.inwardNormal,
  arrivalPose: slot.arrivalPose,
  transitionBounds: {
    center: slot.position,
    size: Math.abs(slot.inwardNormal.x) > .5
      ? {width: slot.transitionDepth * 2, depth: slot.clearWidth}
      : {width: slot.clearWidth, depth: slot.transitionDepth * 2},
  },
});

const subtractIntervals = (
  intervals: readonly [number, number][],
  cutStart: number,
  cutEnd: number,
): [number, number][] => intervals.flatMap(([start, end]) => {
  if (cutEnd <= start || cutStart >= end) return [[start, end]];
  const result: [number, number][] = [];
  if (cutStart > start) result.push([start, Math.min(cutStart, end)]);
  if (cutEnd < end) result.push([Math.max(cutEnd, start), end]);
  return result;
});

type CellEdge = {
  axis: 'x' | 'z';
  coordinate: number;
  start: number;
  end: number;
  side: 'minimum' | 'maximum';
  height: number;
  cellId: string;
};

const cellEdges = (cell: MuseumManifestGeometryCell): readonly CellEdge[] => [
  {axis: 'x', coordinate: cell.bounds.minZ, start: cell.bounds.minX, end: cell.bounds.maxX, side: 'minimum', height: cell.ceilingHeight, cellId: cell.id},
  {axis: 'x', coordinate: cell.bounds.maxZ, start: cell.bounds.minX, end: cell.bounds.maxX, side: 'maximum', height: cell.ceilingHeight, cellId: cell.id},
  {axis: 'z', coordinate: cell.bounds.minX, start: cell.bounds.minZ, end: cell.bounds.maxZ, side: 'minimum', height: cell.ceilingHeight, cellId: cell.id},
  {axis: 'z', coordinate: cell.bounds.maxX, start: cell.bounds.minZ, end: cell.bounds.maxZ, side: 'maximum', height: cell.ceilingHeight, cellId: cell.id},
];

const otherCellCrossesEdge = (
  edge: CellEdge,
  other: MuseumManifestGeometryCell,
): [number, number] | undefined => {
  const epsilon = .001;
  if (edge.axis === 'x') {
    const crosses = edge.side === 'minimum'
      ? other.bounds.minZ < edge.coordinate - epsilon && other.bounds.maxZ >= edge.coordinate - epsilon
      : other.bounds.maxZ > edge.coordinate + epsilon && other.bounds.minZ <= edge.coordinate + epsilon;
    if (!crosses) return undefined;
    return [Math.max(edge.start, other.bounds.minX), Math.min(edge.end, other.bounds.maxX)];
  }
  const crosses = edge.side === 'minimum'
    ? other.bounds.minX < edge.coordinate - epsilon && other.bounds.maxX >= edge.coordinate - epsilon
    : other.bounds.maxX > edge.coordinate + epsilon && other.bounds.minX <= edge.coordinate + epsilon;
  if (!crosses) return undefined;
  return [Math.max(edge.start, other.bounds.minZ), Math.min(edge.end, other.bounds.maxZ)];
};

const slotCutsEdge = (
  edge: CellEdge,
  slot: MuseumManifestDoorwaySlot,
): [number, number] | undefined => {
  const epsilon = .01;
  if (edge.axis === 'x' && Math.abs(slot.position.z - edge.coordinate) <= epsilon) {
    return [slot.position.x - slot.clearWidth / 2, slot.position.x + slot.clearWidth / 2];
  }
  if (edge.axis === 'z' && Math.abs(slot.position.x - edge.coordinate) <= epsilon) {
    return [slot.position.z - slot.clearWidth / 2, slot.position.z + slot.clearWidth / 2];
  }
  return undefined;
};

const reservationCutsEdge = (
  edge: CellEdge,
  reservation: MuseumReservation,
): [number, number] | undefined => {
  const epsilon = .01;
  const cosine = Math.cos(reservation.rotation);
  const sine = Math.sin(reservation.rotation);
  const halfWidth = reservation.barrierWidth / 2;
  if (
    edge.axis === 'x'
    && Math.abs(sine) <= epsilon
    && Math.abs(reservation.barrierCenter.z - edge.coordinate) <= epsilon
  ) return [reservation.barrierCenter.x - halfWidth, reservation.barrierCenter.x + halfWidth];
  if (
    edge.axis === 'z'
    && Math.abs(cosine) <= epsilon
    && Math.abs(reservation.barrierCenter.x - edge.coordinate) <= epsilon
  ) return [reservation.barrierCenter.z - halfWidth, reservation.barrierCenter.z + halfWidth];
  return undefined;
};

type WallOpening = {
  id: string;
  interval: [number, number];
  clearHeight: number;
};

type CirculationWallSet = {
  colliders: readonly MuseumWallDefinition[];
  architecture: readonly MuseumWallDefinition[];
};

const createCirculationWalls = (node: MuseumManifestNode): CirculationWallSet => {
  const cells = node.geometry?.cells ?? [];
  const thickness = MUSEUM_BUILDING_MANIFEST.physicalContract.wallThickness;
  const reservations = MUSEUM_BUILDING_MANIFEST.reservations.filter(({hostNodeId}) => hostNodeId === node.id);
  const colliders: MuseumWallDefinition[] = [];
  const architecture: MuseumWallDefinition[] = [];
  const seen = new Set<string>();
  const addWall = (
    edge: CellEdge,
    start: number,
    end: number,
    height: number,
    bottom = 0,
    openingId?: string,
  ): MuseumWallDefinition => {
    const alongX = edge.axis === 'x';
    return {
      id: `${node.id}:${openingId ? 'lintel' : 'wall'}:${architecture.length + 1}`,
      center: alongX
        ? {x: (start + end) / 2, z: edge.coordinate}
        : {x: edge.coordinate, z: (start + end) / 2},
      size: {width: end - start, depth: thickness},
      rotation: alongX ? 0 : Math.PI / 2,
      height,
      ...(bottom > 0 ? {bottom} : {}),
      ...(openingId ? {openingId} : {}),
    };
  };
  for (const cell of cells) {
    for (const edge of cellEdges(cell)) {
      let exposedIntervals: [number, number][] = [[edge.start, edge.end]];
      for (const other of cells) {
        if (other.id === cell.id) continue;
        const cut = otherCellCrossesEdge(edge, other);
        if (cut && cut[1] > cut[0]) exposedIntervals = subtractIntervals(exposedIntervals, cut[0], cut[1]);
      }
      const openings: WallOpening[] = [];
      for (const slot of node.doorwaySlots) {
        const cut = slotCutsEdge(edge, slot);
        if (cut) openings.push({id: `${node.id}:${slot.id}`, interval: cut, clearHeight: slot.clearHeight});
      }
      for (const reservation of reservations) {
        const cut = reservationCutsEdge(edge, reservation);
        if (cut) openings.push({
          id: reservation.id,
          interval: cut,
          clearHeight: MUSEUM_BUILDING_MANIFEST.physicalContract.doorClearHeight,
        });
      }
      let wallIntervals = [...exposedIntervals];
      for (const {interval: [start, end]} of openings) {
        wallIntervals = subtractIntervals(wallIntervals, start, end);
      }
      for (const [start, end] of wallIntervals) {
        if (end - start < .08) continue;
        const key = `wall:${edge.axis}:${edge.coordinate.toFixed(3)}:${start.toFixed(3)}:${end.toFixed(3)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const wall = addWall(edge, start, end, edge.height);
        colliders.push(wall);
        architecture.push(wall);
      }
      for (const opening of openings) {
        for (const [exposedStart, exposedEnd] of exposedIntervals) {
          const start = Math.max(opening.interval[0], exposedStart);
          const end = Math.min(opening.interval[1], exposedEnd);
          const lintelHeight = edge.height - opening.clearHeight;
          if (end - start < .08 || lintelHeight < .08) continue;
          const key = `lintel:${opening.id}:${edge.axis}:${edge.coordinate.toFixed(3)}:${start.toFixed(3)}:${end.toFixed(3)}`;
          if (seen.has(key)) continue;
          seen.add(key);
          architecture.push(addWall(edge, start, end, lintelHeight, opening.clearHeight, opening.id));
        }
      }
    }
  }
  return {colliders, architecture};
};

/** One physical body contract shared by rendering, collision, and portal-wall cuts. */
export const getMuseumReservationBarrierBody = (reservation: MuseumReservation) => ({
  id: reservation.id,
  center: reservation.barrierCenter,
  size: {
    width: reservation.barrierWidth,
    depth: MUSEUM_BUILDING_MANIFEST.physicalContract.wallThickness * 2 / 3,
  },
  rotation: reservation.rotation,
  height: 1.24,
});

const unionBounds = (cells: readonly MuseumManifestGeometryCell[]): MuseumBounds => ({
  minX: Math.min(...cells.map(({bounds}) => bounds.minX)),
  maxX: Math.max(...cells.map(({bounds}) => bounds.maxX)),
  minZ: Math.min(...cells.map(({bounds}) => bounds.minZ)),
  maxZ: Math.max(...cells.map(({bounds}) => bounds.maxZ)),
});

const toSpatialCells = (node: MuseumManifestNode): readonly MuseumSpatialCell[] => {
  const seamOverlap = Math.max(.6, MUSEUM_BUILDING_MANIFEST.physicalContract.transitionDepth / 2);
  const epsilon = .01;
  return (node.geometry?.cells ?? []).map((cell) => {
    const bounds = {...cell.bounds};
    for (const slot of node.doorwaySlots) {
      if (Math.abs(slot.position.x - cell.bounds.minX) <= epsilon && slot.inwardNormal.x > .5) bounds.minX -= seamOverlap;
      if (Math.abs(slot.position.x - cell.bounds.maxX) <= epsilon && slot.inwardNormal.x < -.5) bounds.maxX += seamOverlap;
      if (Math.abs(slot.position.z - cell.bounds.minZ) <= epsilon && slot.inwardNormal.z > .5) bounds.minZ -= seamOverlap;
      if (Math.abs(slot.position.z - cell.bounds.maxZ) <= epsilon && slot.inwardNormal.z < -.5) bounds.maxZ += seamOverlap;
    }
    const expanded = bounds.minX !== cell.bounds.minX
      || bounds.maxX !== cell.bounds.maxX
      || bounds.minZ !== cell.bounds.minZ
      || bounds.maxZ !== cell.bounds.maxZ;
    return {
      id: `${node.id}:${cell.id}`,
      kind: cell.kind ?? 'passage',
      title: node.map.label,
      bounds,
      ...(expanded ? {renderBounds: cell.bounds} : {}),
      ceilingHeight: cell.ceilingHeight,
      exhibitIds: [],
      lightingGroupId: `${node.id}:circulation`,
    };
  });
};

const createNavigationLayout = (
  node: MuseumManifestNode,
  wallColliders: readonly MuseumWallDefinition[],
): MuseumNavigationLayout => {
  const geometryCells = node.geometry?.cells;
  if (!geometryCells?.length) throw new Error(`Circulation node ${node.id} has no authored geometry.`);
  const spatialCells = toSpatialCells(node);
  const preferredSpawn = node.id === MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId
    ? node.doorwaySlots.find(({id}) => id === MUSEUM_BUILDING_MANIFEST.mainEntrance.slotId)?.arrivalPose
    : node.doorwaySlots[0]?.arrivalPose;
  const spawn = preferredSpawn ?? {
    x: (geometryCells[0].bounds.minX + geometryCells[0].bounds.maxX) / 2,
    z: (geometryCells[0].bounds.minZ + geometryCells[0].bounds.maxZ) / 2,
    yaw: 0,
    pitch: 0,
  };
  const furnishings = node.geometry?.furnishings ?? [];
  const reservations = MUSEUM_BUILDING_MANIFEST.reservations.filter(({hostNodeId}) => hostNodeId === node.id);
  return {
    id: node.id,
    title: node.map.label,
    eyeHeight: 1.7,
    playerRadius: .34,
    bounds: unionBounds(spatialCells.map(({bounds, id, ceilingHeight}) => ({id, bounds, ceilingHeight}))),
    cameraFov: 66,
    cameraFar: 260,
    spawn,
    reset: spawn,
    spatialCells,
    spatialConnections: [],
    wallColliders,
    furnishings,
    obstacleColliders: [
      ...furnishings,
      ...reservations.map(getMuseumReservationBarrierBody),
    ],
    exhibits: [],
  };
};

const liveConnectionEndpointKeys = new Set(
  MUSEUM_BUILDING_MANIFEST.connections
    .filter(({implementationStatus}) => implementationStatus === 'live')
    .flatMap(({a, b}) => [`${a.nodeId}/${a.slotId}`, `${b.nodeId}/${b.slotId}`]),
);

const hallDefinitions: readonly MuseumHallDefinition[] = hallContents.map((content) => {
  const node = MUSEUM_BUILDING_MANIFEST.nodes.find(({publicHallId}) => publicHallId === content.id);
  if (!node) throw new Error(`Museum hall ${content.id} has no physical node in the building manifest.`);
  const activeSlotIds = new Set(
    node.doorwaySlots
      .filter(({id}) => liveConnectionEndpointKeys.has(`${node.id}/${id}`))
      .map(({id}) => id),
  );
  const shell = resolveMuseumHallShell(node, content.layout, activeSlotIds);
  return {
    ...content,
    layout: shell.layout,
    physicalNodeId: node.id,
    worldTransform: node.transform,
    architectureWalls: shell.architectureWalls,
    resolvedTemplate: shell.resolvedTemplate,
    entrances: node.doorwaySlots.map(toEntrance),
  };
});

const runtimeNodes: readonly MuseumRuntimeNodeDefinition[] = MUSEUM_BUILDING_MANIFEST.nodes.map((node) => {
  const hall = node.publicHallId
    ? hallDefinitions.find(({id}) => id === node.publicHallId)
    : undefined;
  const circulationWalls = hall ? undefined : createCirculationWalls(node);
  return {
    id: node.id,
    kind: node.kind,
    publicHallId: node.publicHallId,
    pilotRole: node.pilotRole,
    templateId: node.templateId,
    geometryAdapterId: node.geometryAdapterId,
    implementationStatus: node.implementationStatus,
    levelId: node.levelId,
    worldTransform: node.transform,
    layout: hall?.layout ?? createNavigationLayout(node, circulationWalls?.colliders ?? []),
    ...(hall
      ? {architectureWalls: hall.architectureWalls, resolvedTemplate: hall.resolvedTemplate}
      : circulationWalls
        ? {architectureWalls: circulationWalls.architecture}
        : {}),
    entrances: node.doorwaySlots.map(toEntrance),
    mapLabel: node.map.label,
    mapStatus: node.map.status,
  };
});

const directedConnections: readonly MuseumDirectedConnection[] = MUSEUM_BUILDING_MANIFEST.connections.flatMap((connection) => [
  {
    id: `${connection.id}:a-to-b`,
    connectionId: connection.id,
    sourceNodeId: connection.a.nodeId,
    targetNodeId: connection.b.nodeId,
    localEntranceId: connection.a.slotId,
    targetEntranceId: connection.b.slotId,
    routeRole: connection.routeRole,
    accessible: connection.accessible,
    implementationStatus: connection.implementationStatus,
  },
  {
    id: `${connection.id}:b-to-a`,
    connectionId: connection.id,
    sourceNodeId: connection.b.nodeId,
    targetNodeId: connection.a.nodeId,
    localEntranceId: connection.b.slotId,
    targetEntranceId: connection.a.slotId,
    routeRole: connection.routeRole,
    accessible: connection.accessible,
    implementationStatus: connection.implementationStatus,
  },
]);

export const MUSEUM_WORLD_DEFINITIONS = hallDefinitions;
export const MUSEUM_RUNTIME_NODES = runtimeNodes;
export const MUSEUM_CIRCULATION_NODES = runtimeNodes.filter(({kind}) => kind !== 'hall');
export const MUSEUM_DIRECTED_CONNECTIONS = directedConnections;

export const getMuseumRuntimeNode = (nodeId: MuseumPhysicalNodeId): MuseumRuntimeNodeDefinition | undefined =>
  MUSEUM_RUNTIME_NODES.find(({id}) => id === nodeId);

export const getMuseumRuntimeHallNode = (hallId: MuseumHallId): MuseumRuntimeNodeDefinition | undefined =>
  MUSEUM_RUNTIME_NODES.find(({publicHallId}) => publicHallId === hallId);

export const getMuseumHallDefinition = (hallId: MuseumHallId): MuseumHallDefinition | undefined =>
  MUSEUM_WORLD_DEFINITIONS.find(({id}) => id === hallId);

export const getMuseumNodeConnections = (nodeId: MuseumPhysicalNodeId): readonly MuseumDirectedConnection[] =>
  MUSEUM_DIRECTED_CONNECTIONS.filter(({sourceNodeId}) => sourceNodeId === nodeId);

export const getMuseumConnectionTargetHallId = (
  connection: Pick<MuseumDirectedConnection, 'targetNodeId'>,
): MuseumHallId | undefined => getMuseumRuntimeNode(connection.targetNodeId)?.publicHallId;
