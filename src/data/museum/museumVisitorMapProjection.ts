import type {MuseumPublicHallId as MuseumHallId} from '../museumCatalog';
import type {MuseumPlannedHallId} from './museumCanonicalProgram';
import {
  getMuseumVisitorMapNode,
  MUSEUM_VISITOR_MAP_KIOSK,
  MUSEUM_VISITOR_MAP_MANIFEST,
  MUSEUM_VISITOR_MAP_NODES,
  type MuseumVisitorMapManifestCell,
  type MuseumVisitorMapManifestNode,
  type MuseumVisitorMapNode,
} from './museumVisitorMap';
import type {
  MuseumBounds,
  MuseumGalleryState,
  MuseumPhysicalConnection,
  MuseumPhysicalNodeId,
  MuseumPhysicalNodeKind,
  MuseumPoint,
  MuseumWorldTransform,
} from './museumWorldTypes';

export type MuseumVisitorMapPoint = {x: number; y: number};
export type MuseumVisitorMapOutlineSegment = {
  start: MuseumVisitorMapPoint;
  end: MuseumVisitorMapPoint;
};

export type MuseumVisitorMapGallerySummary = {
  id: MuseumPlannedHallId;
  publicHallId?: MuseumHallId;
  title: string;
  publicGalleryNumber: number;
  galleryNumber: string;
  visitSequence: number;
  galleryState: MuseumGalleryState;
  roomIds: readonly string[];
  rooms: readonly {id: string; title: string}[];
  roomCount: number;
  fastTravelEligible: boolean;
  /** Compatibility aliases for callers that previously consumed the catalog. */
  period: string;
  description: string;
  sweep: readonly string[];
};

export type MuseumVisitorMapProjectionNode = {
  hall: MuseumVisitorMapGallerySummary;
  node: MuseumVisitorMapNode;
  physicalNode: MuseumVisitorMapManifestNode;
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
  programHallId?: MuseumPlannedHallId;
  publicHallId?: MuseumHallId;
  galleryState?: MuseumGalleryState;
  publicGalleryNumber?: number;
  visitSequence?: number;
  roomIds: readonly string[];
  fastTravelEligible: boolean;
  /** v2 architectural role; property name retained for existing map callers. */
  pilotRole: string;
  label: string;
  status: MuseumVisitorMapManifestNode['map']['status'];
  cells: readonly MuseumVisitorMapProjectedCell[];
  outline: readonly MuseumVisitorMapOutlineSegment[];
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
  reservationType: 'gallery-reserve';
  label: string;
  points: readonly MuseumVisitorMapPoint[];
  labelPoint: MuseumVisitorMapPoint;
  status: 'closed-reserve';
};

export type MuseumVisitorMapViewBox = {
  minX: number;
  minY: number;
  width: number;
  height: number;
};

const manifestNodeById = new Map(
  MUSEUM_VISITOR_MAP_MANIFEST.nodes.map((node) => [node.id, node]),
);

/**
 * Converts local x/z coordinates to the north-up plan. This is intentionally
 * the runtime transform convention, after the plan compiler has inverted the
 * source document's positive rotation.
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

const projectWorldPoint = ({x, z}: MuseumPoint): MuseumVisitorMapPoint => ({x, y: -z});

export const projectMuseumVisitorMapPoint = (
  nodeId: MuseumPhysicalNodeId,
  point: MuseumPoint,
): MuseumVisitorMapPoint | undefined => {
  const node = manifestNodeById.get(nodeId);
  return node ? projectLocalPoint(point, node.transform) : undefined;
};

export const projectMuseumVisitorMapHeading = (
  nodeId: MuseumPhysicalNodeId,
  yaw: number,
): number | undefined => {
  const node = manifestNodeById.get(nodeId);
  if (!node || !Number.isFinite(yaw)) return undefined;
  return (yaw + node.transform.yaw + Math.PI) * 180 / Math.PI;
};

const midpoint = (
  first: MuseumVisitorMapPoint,
  second: MuseumVisitorMapPoint,
): MuseumVisitorMapPoint => ({
  x: (first.x + second.x) / 2,
  y: (first.y + second.y) / 2,
});

const polygonArea = (points: readonly MuseumVisitorMapPoint[]): number =>
  Math.abs(points.reduce((area, point, index) => {
    const next = points[(index + 1) % points.length];
    return area + point.x * next.y - next.x * point.y;
  }, 0) / 2);

const projectedWorldBounds = (
  id: string,
  bounds: MuseumBounds,
): MuseumVisitorMapProjectedCell => {
  const points = [
    {x: bounds.minX, z: bounds.minZ},
    {x: bounds.maxX, z: bounds.minZ},
    {x: bounds.maxX, z: bounds.maxZ},
    {x: bounds.minX, z: bounds.maxZ},
  ].map(projectWorldPoint);
  return {
    id,
    points,
    center: midpoint(points[0], points[2]),
    area: (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ),
  };
};

const projectedLocalCell = (
  node: MuseumVisitorMapManifestNode,
  cell: MuseumVisitorMapManifestCell,
): MuseumVisitorMapProjectedCell => {
  const bounds = cell.renderBounds ?? cell.bounds;
  const points = [
    {x: bounds.minX, z: bounds.minZ},
    {x: bounds.maxX, z: bounds.minZ},
    {x: bounds.maxX, z: bounds.maxZ},
    {x: bounds.minX, z: bounds.maxZ},
  ].map((point) => projectLocalPoint(point, node.transform));
  return {
    id: cell.id,
    points,
    center: midpoint(points[0], points[2]),
    area: polygonArea(points),
  };
};

const nodeCells = (
  node: MuseumVisitorMapManifestNode,
): readonly MuseumVisitorMapProjectedCell[] => {
  const cells = node.geometry?.cells;
  if (cells?.length) return cells.map((cell) => projectedLocalCell(node, cell));
  if (Array.isArray(node.footprint) && node.footprint.length >= 3) {
    const points = node.footprint.map(projectWorldPoint);
    return [{
      id: `${node.id}:footprint`,
      points,
      center: {
        x: points.reduce((sum, point) => sum + point.x, 0) / points.length,
        y: points.reduce((sum, point) => sum + point.y, 0) / points.length,
      },
      area: polygonArea(points),
    }];
  }
  return [projectedWorldBounds(`${node.id}:bounds`, node.bounds)];
};

const nodeOutline = (
  cells: readonly MuseumVisitorMapProjectedCell[],
): readonly MuseumVisitorMapOutlineSegment[] => {
  const normalize = (value: number) => Math.round(value * 1_000_000) / 1_000_000;
  const rectangles = cells.map(({points}) => ({
    minX: normalize(Math.min(...points.map(({x}) => x))),
    maxX: normalize(Math.max(...points.map(({x}) => x))),
    minY: normalize(Math.min(...points.map(({y}) => y))),
    maxY: normalize(Math.max(...points.map(({y}) => y))),
  }));
  const xCoordinates = [...new Set(rectangles.flatMap(({minX, maxX}) => [minX, maxX]))]
    .sort((first, second) => first - second);
  const yCoordinates = [...new Set(rectangles.flatMap(({minY, maxY}) => [minY, maxY]))]
    .sort((first, second) => first - second);
  const occupied = new Set<string>();
  for (let xIndex = 0; xIndex < xCoordinates.length - 1; xIndex += 1) {
    for (let yIndex = 0; yIndex < yCoordinates.length - 1; yIndex += 1) {
      const x = (xCoordinates[xIndex] + xCoordinates[xIndex + 1]) / 2;
      const y = (yCoordinates[yIndex] + yCoordinates[yIndex + 1]) / 2;
      if (rectangles.some((rectangle) =>
        x > rectangle.minX && x < rectangle.maxX && y > rectangle.minY && y < rectangle.maxY)) {
        occupied.add(`${xIndex}:${yIndex}`);
      }
    }
  }
  const outline: MuseumVisitorMapOutlineSegment[] = [];
  const append = (start: MuseumVisitorMapPoint, end: MuseumVisitorMapPoint) => {
    outline.push({start, end});
  };
  for (const key of occupied) {
    const [xIndex, yIndex] = key.split(':').map(Number);
    const minimumX = xCoordinates[xIndex];
    const maximumX = xCoordinates[xIndex + 1];
    const minimumY = yCoordinates[yIndex];
    const maximumY = yCoordinates[yIndex + 1];
    if (!occupied.has(`${xIndex - 1}:${yIndex}`)) {
      append({x: minimumX, y: minimumY}, {x: minimumX, y: maximumY});
    }
    if (!occupied.has(`${xIndex + 1}:${yIndex}`)) {
      append({x: maximumX, y: minimumY}, {x: maximumX, y: maximumY});
    }
    if (!occupied.has(`${xIndex}:${yIndex - 1}`)) {
      append({x: minimumX, y: minimumY}, {x: maximumX, y: minimumY});
    }
    if (!occupied.has(`${xIndex}:${yIndex + 1}`)) {
      append({x: minimumX, y: maximumY}, {x: maximumX, y: maximumY});
    }
  }
  return outline;
};

const projectedNodeKind = (
  node: MuseumVisitorMapManifestNode,
): MuseumPhysicalNodeKind => {
  if (node.physicalRole === 'turn-court') return 'turn-court';
  if (node.physicalRole === 'final-return-threshold') return 'final-threshold';
  if (node.physicalRole === 'crosscut-intersection') return 'crossing';
  if (node.physicalRole === 'crosscut-north-extension') return 'reserve-extension';
  return node.kind;
};

const requireProjectionNode = (
  programHallId: MuseumPlannedHallId,
): MuseumVisitorMapProjectionNode => {
  const node = getMuseumVisitorMapNode(programHallId);
  const physicalNode = node ? manifestNodeById.get(node.physicalNodeId) : undefined;
  if (!node || !physicalNode) {
    throw new Error(`Museum visitor-map projection is incomplete for ${programHallId}.`);
  }
  return {
    hall: {
      id: node.programHallId,
      publicHallId: node.hallId,
      title: node.title,
      publicGalleryNumber: node.publicGalleryNumber,
      galleryNumber: `Gallery ${String(node.publicGalleryNumber).padStart(2, '0')}`,
      visitSequence: node.visitSequence,
      galleryState: node.galleryState,
      roomIds: node.roomIds,
      rooms: node.rooms,
      roomCount: node.roomIds.length,
      fastTravelEligible: node.fastTravelEligible,
      period: `Visit sequence ${String(node.visitSequence).padStart(2, '0')}`,
      description: node.galleryState === 'curated-open'
        ? `${node.roomIds.length} named rooms · curated and open`
        : `${node.roomIds.length} named rooms · architectural shell open, installations planned`,
      sweep: node.roomIds,
    },
    node,
    physicalNode,
  };
};

/** All 26 galleries, in chronological walking order, joined to manifest nodes. */
export const MUSEUM_VISITOR_MAP_PROJECTION: readonly MuseumVisitorMapProjectionNode[] =
  MUSEUM_VISITOR_MAP_NODES.map(({programHallId}) => requireProjectionNode(programHallId));

/** Every walkable architectural node in the Continuous Enfilade. */
export const MUSEUM_VISITOR_MAP_NODE_PROJECTIONS: readonly MuseumVisitorMapPhysicalNodeProjection[] =
  MUSEUM_VISITOR_MAP_MANIFEST.nodes
    .filter(({implementationStatus}) => implementationStatus === 'live')
    .map((node) => {
      const cells = nodeCells(node);
      const labelCell = cells.reduce((largest, cell) => cell.area > largest.area ? cell : largest);
      const galleryNode = node.programHallId
        ? getMuseumVisitorMapNode(node.programHallId)
        : undefined;
      return {
        id: node.id,
        kind: projectedNodeKind(node),
        programHallId: node.programHallId,
        publicHallId: node.publicHallId,
        galleryState: node.galleryState,
        publicGalleryNumber: node.publicGalleryNumber,
        visitSequence: node.visitSequence,
        roomIds: node.roomIds ?? [],
        fastTravelEligible: galleryNode?.fastTravelEligible ?? false,
        pilotRole: node.physicalRole ?? node.pilotRole ?? node.kind,
        label: node.map.label,
        status: node.map.status,
        cells,
        outline: nodeOutline(cells),
        labelPoint: labelCell.center,
      };
    });

const requireDoorway = (node: MuseumVisitorMapManifestNode, doorwayId: string) => {
  const doorway = node.doorwaySlots.find(({id}) => id === doorwayId);
  if (!doorway) throw new Error(`Museum map node ${node.id} has no doorway ${doorwayId}.`);
  return doorway;
};

const uniqueConsecutivePoints = (
  points: readonly MuseumVisitorMapPoint[],
): readonly MuseumVisitorMapPoint[] => points.filter((point, index) => {
  const previous = points[index - 1];
  return !previous || Math.hypot(point.x - previous.x, point.y - previous.y) > .01;
});

/** Every physically crossable seam in the through route and crosscut. */
export const MUSEUM_VISITOR_MAP_EDGES: readonly MuseumVisitorMapProjectionEdge[] =
  MUSEUM_VISITOR_MAP_MANIFEST.connections
    .filter(({accessible, implementationStatus}) =>
      accessible && implementationStatus === 'live')
    .map((connection) => {
      const sourceNode = manifestNodeById.get(connection.a.nodeId);
      const targetNode = manifestNodeById.get(connection.b.nodeId);
      if (!sourceNode || !targetNode) {
        throw new Error(`Museum map connection ${connection.id} has a missing manifest node.`);
      }
      const sourceDoorway = requireDoorway(sourceNode, connection.a.slotId);
      const targetDoorway = requireDoorway(targetNode, connection.b.slotId);
      return {
        key: connection.id,
        connectionId: connection.id,
        fromNodeId: sourceNode.id,
        toNodeId: targetNode.id,
        routeRole: connection.routeRole,
        points: uniqueConsecutivePoints([
          projectLocalPoint(sourceDoorway.arrivalPose, sourceNode.transform),
          projectLocalPoint(sourceDoorway.position, sourceNode.transform),
          projectLocalPoint(targetDoorway.position, targetNode.transform),
          projectLocalPoint(targetDoorway.arrivalPose, targetNode.transform),
        ]),
      };
    });

const liveDoorwayKeys = new Set<string>([
  `${MUSEUM_VISITOR_MAP_MANIFEST.mainEntrance.nodeId}:${MUSEUM_VISITOR_MAP_MANIFEST.mainEntrance.slotId}`,
  ...MUSEUM_VISITOR_MAP_MANIFEST.connections
    .filter(({accessible, implementationStatus}) =>
      accessible && implementationStatus === 'live')
    .flatMap((connection) => [
      `${connection.a.nodeId}:${connection.a.slotId}`,
      `${connection.b.nodeId}:${connection.b.slotId}`,
    ]),
]);

/** All constructed public doorways; closed reserves deliberately contribute none. */
export const MUSEUM_VISITOR_MAP_DOORWAYS: readonly MuseumVisitorMapDoorwayProjection[] =
  MUSEUM_VISITOR_MAP_MANIFEST.nodes.flatMap((node) =>
    node.doorwaySlots
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
          isMainEntrance: node.id === MUSEUM_VISITOR_MAP_MANIFEST.mainEntrance.nodeId
            && slot.id === MUSEUM_VISITOR_MAP_MANIFEST.mainEntrance.slotId,
        };
      }),
  );

export const MUSEUM_VISITOR_MAP_ENTRANCE: MuseumVisitorMapDoorwayProjection = (() => {
  const entrance = MUSEUM_VISITOR_MAP_DOORWAYS.find(({isMainEntrance}) => isMainEntrance);
  if (!entrance) throw new Error('The Continuous Enfilade map has no main entrance doorway.');
  return entrance;
})();

/** Exactly two closed, noninteractive capacity reserves north of the public block. */
export const MUSEUM_VISITOR_MAP_RESERVATIONS: readonly MuseumVisitorMapReservationProjection[] =
  MUSEUM_VISITOR_MAP_MANIFEST.reserves.map((reserve) => {
    const cell = projectedWorldBounds(reserve.id, reserve.bounds);
    return {
      id: reserve.id,
      reservationType: 'gallery-reserve',
      label: reserve.map?.label ?? reserve.title ?? reserve.label ?? 'Closed capacity reserve',
      points: cell.points,
      labelPoint: cell.center,
      status: 'closed-reserve',
    };
  });

export const MUSEUM_VISITOR_MAP_KIOSK_MARKER = (() => {
  const node = manifestNodeById.get(MUSEUM_VISITOR_MAP_KIOSK.nodeId);
  if (!node) throw new Error('The visitor-map kiosk entrance node is missing.');
  return {
    nodeId: node.id,
    kioskId: MUSEUM_VISITOR_MAP_KIOSK.id,
    point: projectLocalPoint(MUSEUM_VISITOR_MAP_KIOSK.center, node.transform),
  } as const;
})();

export const MUSEUM_VISITOR_MAP_CROSSCUT_INTERSECTIONS = MUSEUM_VISITOR_MAP_MANIFEST.crosscut.intersections
  .map((intersection) => {
    const nodeId = intersection.nodeId
      ?? (intersection.occupiedByHallId
        ? getMuseumVisitorMapNode(intersection.occupiedByHallId)?.physicalNodeId
        : intersection.id);
    const projection = nodeId
      ? MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.find(({id}) => id === nodeId)
      : undefined;
    if (!projection) {
      throw new Error(`Crosscut intersection ${intersection.id} has no map node.`);
    }
    return {
      ...intersection,
      nodeId: projection.id,
      point: projection.labelPoint,
      label: intersection.occupiedByHallId ? 'Forum intersection' : 'Crosscut intersection',
    };
  });

export const MUSEUM_VISITOR_MAP_TURN_COURTS =
  MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.filter(
    ({kind, pilotRole}) => kind === 'turn-court' || pilotRole === 'turn-court',
  );

const projectedExtents = [
  ...MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.flatMap(({cells}) =>
    cells.flatMap(({points}) => points)),
  ...MUSEUM_VISITOR_MAP_RESERVATIONS.flatMap(({points}) => points),
  ...MUSEUM_VISITOR_MAP_DOORWAYS.flatMap(({start, end}) => [start, end]),
  MUSEUM_VISITOR_MAP_KIOSK_MARKER.point,
];

/** Padded north-up bounds shared by the modal SVG and physical kiosk canvas. */
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
