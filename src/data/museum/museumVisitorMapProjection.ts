import {getMuseumHallCatalog, type MuseumCanonicalHallCatalog, type MuseumPublicHallId as MuseumHallId} from '../museumCatalog';
import {MUSEUM_BUILDING_MANIFEST} from './museumBuildingManifest';
import {
  getMuseumRuntimeHallNode,
  getMuseumRuntimeNode,
  MUSEUM_DIRECTED_CONNECTIONS,
  MUSEUM_RUNTIME_NODES,
  MUSEUM_WORLD_DEFINITIONS,
} from './museumBuildingRuntime';
import {
  getMuseumVisitorMapNode,
  MUSEUM_VISITOR_MAP_KIOSK,
  type MuseumVisitorMapNode,
} from './museumVisitorMap';
import type {
  MuseumBounds,
  MuseumPhysicalConnection,
  MuseumPhysicalNodeId,
  MuseumPhysicalNodeKind,
  MuseumPilotRole,
  MuseumPoint,
  MuseumReservation,
  MuseumRuntimeNodeDefinition,
  MuseumWorldTransform,
} from './museumWorldTypes';

export type MuseumVisitorMapPoint = {x: number; y: number};

export type MuseumVisitorMapProjectionNode = {
  hall: MuseumCanonicalHallCatalog;
  node: MuseumVisitorMapNode;
  physicalNode: MuseumRuntimeNodeDefinition;
};

export type MuseumVisitorMapProjectedCell = {
  id: string;
  points: readonly MuseumVisitorMapPoint[];
  center: MuseumVisitorMapPoint;
  area: number;
};

export type MuseumVisitorMapPhysicalNodeProjection = {
  id: MuseumPhysicalNodeId;
  kind: MuseumPhysicalNodeKind;
  publicHallId?: MuseumHallId;
  pilotRole: MuseumPilotRole;
  label: string;
  status: MuseumRuntimeNodeDefinition['mapStatus'];
  cells: readonly MuseumVisitorMapProjectedCell[];
  labelPoint: MuseumVisitorMapPoint;
};

export type MuseumVisitorMapProjectionEdge = {
  key: string;
  connectionId: string;
  fromNodeId: MuseumPhysicalNodeId;
  toNodeId: MuseumPhysicalNodeId;
  routeRole: MuseumPhysicalConnection['routeRole'];
  points: readonly MuseumVisitorMapPoint[];
};

export type MuseumVisitorMapDoorwayProjection = {
  key: string;
  nodeId: MuseumPhysicalNodeId;
  entranceId: string;
  position: MuseumVisitorMapPoint;
  start: MuseumVisitorMapPoint;
  end: MuseumVisitorMapPoint;
  inwardPoint: MuseumVisitorMapPoint;
  isMainEntrance: boolean;
};

export type MuseumVisitorMapReservationProjection = {
  id: string;
  reservationType: MuseumReservation['reservationType'];
  hostNodeId: MuseumPhysicalNodeId;
  label: MuseumReservation['label'];
  points: readonly MuseumVisitorMapPoint[];
  labelPoint: MuseumVisitorMapPoint;
  targetProgramHallId?: string;
  expansionPortalId?: string;
};

export type MuseumVisitorMapViewBox = {
  minX: number;
  minY: number;
  width: number;
  height: number;
};

/**
 * Converts authored local x/z coordinates to a north-up diagram. This mirrors
 * the runtime's yaw transform and then flips world z onto SVG's downward y axis.
 */
const projectLocalPoint = (
  point: MuseumPoint,
  transform: MuseumWorldTransform,
): MuseumVisitorMapPoint => {
  const cosine = Math.cos(transform.yaw);
  const sine = Math.sin(transform.yaw);
  const worldX = transform.x + point.x * cosine + point.z * sine;
  const worldZ = transform.z - point.x * sine + point.z * cosine;
  return {x: worldX, y: -worldZ};
};

/** Project a frozen local visitor pose through the same runtime transform as the plan geometry. */
export const projectMuseumVisitorMapPoint = (
  nodeId: MuseumPhysicalNodeId,
  point: MuseumPoint,
): MuseumVisitorMapPoint | undefined => {
  const node = getMuseumRuntimeNode(nodeId);
  return node ? projectLocalPoint(point, node.worldTransform) : undefined;
};

const midpoint = (
  first: MuseumVisitorMapPoint,
  second: MuseumVisitorMapPoint,
): MuseumVisitorMapPoint => ({x: (first.x + second.x) / 2, y: (first.y + second.y) / 2});

const projectedRectangle = (
  center: MuseumPoint,
  size: {width: number; depth: number},
  rotation: number,
  transform: MuseumWorldTransform,
): readonly MuseumVisitorMapPoint[] => {
  const cosine = Math.cos(rotation);
  const sine = Math.sin(rotation);
  return [
    {x: -size.width / 2, z: -size.depth / 2},
    {x: size.width / 2, z: -size.depth / 2},
    {x: size.width / 2, z: size.depth / 2},
    {x: -size.width / 2, z: size.depth / 2},
  ].map((offset) => projectLocalPoint({
    x: center.x + offset.x * cosine + offset.z * sine,
    z: center.z - offset.x * sine + offset.z * cosine,
  }, transform));
};

const projectedCell = (
  node: MuseumRuntimeNodeDefinition,
  cell: {id: string; bounds: MuseumBounds; renderBounds?: MuseumBounds},
): MuseumVisitorMapProjectedCell => {
  const bounds = cell.renderBounds ?? cell.bounds;
  const points = [
    {x: bounds.minX, z: bounds.minZ},
    {x: bounds.maxX, z: bounds.minZ},
    {x: bounds.maxX, z: bounds.maxZ},
    {x: bounds.minX, z: bounds.maxZ},
  ].map((point) => projectLocalPoint(point, node.worldTransform));
  return {
    id: cell.id,
    points,
    center: midpoint(points[0], points[2]),
    area: (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ),
  };
};

const requireProjectionNode = (hallId: MuseumHallId): MuseumVisitorMapProjectionNode => {
  const hall = getMuseumHallCatalog(hallId);
  const node = getMuseumVisitorMapNode(hallId);
  const physicalNode = getMuseumRuntimeHallNode(hallId);
  if (!hall || !node || !physicalNode || node.physicalNodeId !== physicalNode.id) {
    throw new Error(`Museum visitor-map projection is incomplete for ${hallId}.`);
  }
  return {hall, node, physicalNode};
};

/** The six catalogued public destinations joined to their physical runtime nodes. */
export const MUSEUM_VISITOR_MAP_PROJECTION = MUSEUM_WORLD_DEFINITIONS.map(({id}) =>
  requireProjectionNode(id));

/** Every live physical cell in the approved L0 building plan. */
export const MUSEUM_VISITOR_MAP_NODE_PROJECTIONS: readonly MuseumVisitorMapPhysicalNodeProjection[] =
  MUSEUM_RUNTIME_NODES.filter(({implementationStatus}) => implementationStatus === 'live').map((node) => {
    const mapCells = node.resolvedTemplate?.mapCells ?? node.layout.spatialCells;
    const cells = mapCells.map((cell) => projectedCell(node, cell));
    const labelCell = cells.reduce((largest, cell) => cell.area > largest.area ? cell : largest);
    return {
      id: node.id,
      kind: node.kind,
      publicHallId: node.publicHallId,
      pilotRole: node.pilotRole,
      label: node.mapLabel,
      status: node.mapStatus,
      cells,
      labelPoint: labelCell.center,
    };
  });

const requireEntrance = (node: MuseumRuntimeNodeDefinition, entranceId: string) => {
  const entrance = node.entrances.find(({id}) => id === entranceId);
  if (!entrance) throw new Error(`Museum map node ${node.id} has no entrance ${entranceId}.`);
  return entrance;
};

const uniqueConsecutivePoints = (
  points: readonly MuseumVisitorMapPoint[],
): readonly MuseumVisitorMapPoint[] => points.filter((point, index) => {
  const previous = points[index - 1];
  return !previous || Math.hypot(point.x - previous.x, point.y - previous.y) > .01;
});

/**
 * Authored walking seams, including safe landing points and door thresholds.
 * These are physical paths rather than center-to-center conceptual graph lines.
 */
export const MUSEUM_VISITOR_MAP_EDGES: readonly MuseumVisitorMapProjectionEdge[] = (() => {
  const seen = new Set<string>();
  return MUSEUM_DIRECTED_CONNECTIONS.flatMap((connection) => {
    if (
      seen.has(connection.connectionId)
      || !connection.accessible
      || connection.implementationStatus !== 'live'
    ) return [];
    seen.add(connection.connectionId);
    const sourceNode = getMuseumRuntimeNode(connection.sourceNodeId);
    const targetNode = getMuseumRuntimeNode(connection.targetNodeId);
    if (!sourceNode || !targetNode) {
      throw new Error(`Museum map connection ${connection.connectionId} has a missing runtime node.`);
    }
    const sourceEntrance = requireEntrance(sourceNode, connection.localEntranceId);
    const targetEntrance = requireEntrance(targetNode, connection.targetEntranceId);
    return [{
      key: connection.connectionId,
      connectionId: connection.connectionId,
      fromNodeId: sourceNode.id,
      toNodeId: targetNode.id,
      routeRole: connection.routeRole,
      points: uniqueConsecutivePoints([
        projectLocalPoint(sourceEntrance.arrivalPose, sourceNode.worldTransform),
        projectLocalPoint(sourceEntrance.position, sourceNode.worldTransform),
        projectLocalPoint(targetEntrance.position, targetNode.worldTransform),
        projectLocalPoint(targetEntrance.arrivalPose, targetNode.worldTransform),
      ]),
    }];
  });
})();

const liveDoorwayKeys = new Set<string>([
  `${MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId}:${MUSEUM_BUILDING_MANIFEST.mainEntrance.slotId}`,
  ...MUSEUM_DIRECTED_CONNECTIONS
    .filter(({accessible, implementationStatus}) => accessible && implementationStatus === 'live')
    .flatMap((connection) => [
      `${connection.sourceNodeId}:${connection.localEntranceId}`,
      `${connection.targetNodeId}:${connection.targetEntranceId}`,
    ]),
]);

/**
 * Every constructed, walkable doorway, projected with its true clear width and
 * inward side. Dormant template slots are solid closures and deliberately do
 * not appear as doors; blocked future interfaces are represented separately by
 * MUSEUM_VISITOR_MAP_RESERVATIONS.
 */
export const MUSEUM_VISITOR_MAP_DOORWAYS: readonly MuseumVisitorMapDoorwayProjection[] =
  MUSEUM_BUILDING_MANIFEST.nodes.flatMap((node) => node.doorwaySlots
    .filter((slot) => liveDoorwayKeys.has(`${node.id}:${slot.id}`))
    .map((slot) => {
    const tangent = {x: -slot.inwardNormal.z, z: slot.inwardNormal.x};
    const start = projectLocalPoint({
      x: slot.position.x - tangent.x * slot.clearWidth / 2,
      z: slot.position.z - tangent.z * slot.clearWidth / 2,
    }, node.transform);
    const end = projectLocalPoint({
      x: slot.position.x + tangent.x * slot.clearWidth / 2,
      z: slot.position.z + tangent.z * slot.clearWidth / 2,
    }, node.transform);
    return {
      key: `${node.id}:${slot.id}`,
      nodeId: node.id,
      entranceId: slot.id,
      position: projectLocalPoint(slot.position, node.transform),
      start,
      end,
      inwardPoint: projectLocalPoint({
        x: slot.position.x + slot.inwardNormal.x * 2.4,
        z: slot.position.z + slot.inwardNormal.z * 2.4,
      }, node.transform),
      isMainEntrance: node.id === MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId
        && slot.id === MUSEUM_BUILDING_MANIFEST.mainEntrance.slotId,
    };
    }));

export const MUSEUM_VISITOR_MAP_ENTRANCE: MuseumVisitorMapDoorwayProjection = (() => {
  const entrance = MUSEUM_VISITOR_MAP_DOORWAYS.find(({isMainEntrance}) => isMainEntrance);
  if (!entrance) throw new Error('The Museum visitor map has no projected main entrance.');
  return entrance;
})();

/** Three insertion bays and eight blocked outward portals from the approved manifest. */
export const MUSEUM_VISITOR_MAP_RESERVATIONS: readonly MuseumVisitorMapReservationProjection[] =
  MUSEUM_BUILDING_MANIFEST.reservations.map((reservation) => {
    const host = getMuseumRuntimeNode(reservation.hostNodeId);
    if (!host) throw new Error(`Museum map reservation ${reservation.id} has no host node.`);
    const points = projectedRectangle(
      reservation.center,
      reservation.size,
      reservation.rotation,
      host.worldTransform,
    );
    return {
      id: reservation.id,
      reservationType: reservation.reservationType,
      hostNodeId: reservation.hostNodeId,
      label: reservation.label,
      points,
      labelPoint: midpoint(points[0], points[2]),
      targetProgramHallId: reservation.targetProgramHallId,
      expansionPortalId: reservation.expansionPortalId,
    };
  });

export const MUSEUM_VISITOR_MAP_KIOSK_MARKER = (() => {
  const node = getMuseumRuntimeHallNode(MUSEUM_VISITOR_MAP_KIOSK.hallId);
  if (!node) throw new Error('The Museum visitor-map kiosk hall has no runtime node.');
  return {
    nodeId: node.id,
    hallId: MUSEUM_VISITOR_MAP_KIOSK.hallId,
    kioskId: MUSEUM_VISITOR_MAP_KIOSK.id,
    point: projectLocalPoint(MUSEUM_VISITOR_MAP_KIOSK.center, node.worldTransform),
  } as const;
})();

const projectedExtents = [
  ...MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.flatMap(({cells}) => cells.flatMap(({points}) => points)),
  ...MUSEUM_VISITOR_MAP_RESERVATIONS.flatMap(({points}) => points),
  ...MUSEUM_VISITOR_MAP_DOORWAYS.flatMap(({start, end}) => [start, end]),
  MUSEUM_VISITOR_MAP_KIOSK_MARKER.point,
];

/** A padded, aspect-preserving view box shared by the modal SVG and kiosk canvas. */
export const MUSEUM_VISITOR_MAP_VIEWBOX: MuseumVisitorMapViewBox = (() => {
  const padding = 8;
  const minimumX = Math.min(...projectedExtents.map(({x}) => x)) - padding;
  const maximumX = Math.max(...projectedExtents.map(({x}) => x)) + padding;
  const minimumY = Math.min(...projectedExtents.map(({y}) => y)) - padding;
  const maximumY = Math.max(...projectedExtents.map(({y}) => y)) + padding;
  return {
    minX: minimumX,
    minY: minimumY,
    width: maximumX - minimumX,
    height: maximumY - minimumY,
  };
})();
