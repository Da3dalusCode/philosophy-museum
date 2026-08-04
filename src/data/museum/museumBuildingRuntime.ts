import {
  CANONICAL_MUSEUM_HALL_DEFINITIONS,
  type MuseumCanonicalHallContentDefinition,
} from './canonicalMuseumHalls';
import {
  MUSEUM_BUILDING_MANIFEST,
  type MuseumManifestDoorwaySlot,
  type MuseumManifestGeometryCell,
  type MuseumManifestInteriorOpening,
  type MuseumManifestNode,
} from './museumBuildingManifest';
import {resolveMuseumHallShell} from './museumHallTemplates';
import {
  MUSEUM_PERMANENT_STRUCTURAL_HALL_IDS,
  museumHallHasPermanentStructure,
  type MuseumPermanentStructuralHallId,
} from './museumStructuralResidency';
import {MUSEUM_VISITOR_MAP_KIOSK} from './museumVisitorMapKioskDefinition';
import {
  museumWorldWallPlane,
  removeCoveredMuseumWallSurfaces,
  type MuseumWorldWallPlane,
} from './museumWallGeometry';
import type {
  MuseumBounds,
  MuseumDirectedConnection,
  MuseumHallDefinition,
  MuseumHallEntrance,
  MuseumNavigationLayout,
  MuseumPoint,
  MuseumPhysicalNodeId,
  MuseumPilotRole,
  MuseumRuntimeNodeDefinition,
  MuseumSpatialCell,
  MuseumSpatialConnection,
  MuseumWallDefinition,
} from './museumWorldTypes';
import type {MuseumPublicHallId} from '../museumCatalog';

const hallContents: readonly MuseumCanonicalHallContentDefinition[] = CANONICAL_MUSEUM_HALL_DEFINITIONS;

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
): {interval: [number, number]; renderLintel: boolean} | undefined => {
  const epsilon = .01;
  const seamReach = slot.transitionDepth / 2 + epsilon;
  if (
    edge.axis === 'x'
    && Math.abs(slot.inwardNormal.z) > .5
    && Math.abs(slot.position.z - edge.coordinate) <= seamReach
  ) {
    return {
      interval: [slot.position.x - slot.clearWidth / 2, slot.position.x + slot.clearWidth / 2],
      renderLintel: Math.abs(slot.position.z - edge.coordinate) <= epsilon,
    };
  }
  if (
    edge.axis === 'z'
    && Math.abs(slot.inwardNormal.z) > .5
    && Math.abs(slot.position.x - edge.coordinate) <= slot.clearWidth / 2 + epsilon
  ) {
    return {
      interval: [slot.position.z - seamReach, slot.position.z + seamReach],
      renderLintel: false,
    };
  }
  if (
    edge.axis === 'z'
    && Math.abs(slot.inwardNormal.x) > .5
    && Math.abs(slot.position.x - edge.coordinate) <= seamReach
  ) {
    return {
      interval: [slot.position.z - slot.clearWidth / 2, slot.position.z + slot.clearWidth / 2],
      renderLintel: Math.abs(slot.position.x - edge.coordinate) <= epsilon,
    };
  }
  if (
    edge.axis === 'x'
    && Math.abs(slot.inwardNormal.x) > .5
    && Math.abs(slot.position.z - edge.coordinate) <= slot.clearWidth / 2 + epsilon
  ) {
    return {
      interval: [slot.position.x - seamReach, slot.position.x + seamReach],
      renderLintel: false,
    };
  }
  return undefined;
};

type WallOpening = {
  id: string;
  interval: [number, number];
  clearHeight: number;
  renderLintel: boolean;
};

type CirculationWallSet = {
  colliders: readonly MuseumWallDefinition[];
  architecture: readonly MuseumWallDefinition[];
};

const interiorOpeningAsSlot = (
  opening: MuseumManifestInteriorOpening,
): MuseumManifestDoorwaySlot => ({
  id: opening.id,
  position: opening.position,
  inwardNormal: opening.inwardNormal,
  clearWidth: opening.clearWidth,
  clearHeight: opening.clearHeight,
  transitionDepth: opening.transitionDepth,
  landingBounds: {
    minX: opening.position.x - 2,
    maxX: opening.position.x + 2,
    minZ: opening.position.z - 2,
    maxZ: opening.position.z + 2,
  },
  arrivalPose: {
    x: opening.position.x,
    z: opening.position.z,
    yaw: 0,
    pitch: 0,
  },
});

const createCirculationWalls = (
  node: MuseumManifestNode,
  activeSlotIds: ReadonlySet<string>,
): CirculationWallSet => {
  const cells = node.geometry?.cells ?? [];
  const thickness = MUSEUM_BUILDING_MANIFEST.physicalContract.wallThickness;
  const activeExteriorSlots = node.doorwaySlots.filter(({id}) => activeSlotIds.has(id));
  const interiorSlots = (node.geometry?.interiorOpenings ?? []).map(interiorOpeningAsSlot);
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
      for (const slot of [...activeExteriorSlots, ...interiorSlots]) {
        const cut = slotCutsEdge(edge, slot);
        if (cut) openings.push({
          id: `${node.id}:${slot.id}`,
          interval: cut.interval,
          clearHeight: slot.clearHeight,
          renderLintel: cut.renderLintel,
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
        if (!opening.renderLintel) continue;
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
      title: cell.title ?? node.map.label,
      bounds,
      ...(expanded ? {renderBounds: cell.bounds} : {}),
      ceilingHeight: cell.ceilingHeight,
      exhibitIds: [],
      lightingGroupId: `${node.id}:circulation`,
      ...(cell.guidanceAxis ? {guidanceAxis: cell.guidanceAxis} : {}),
    };
  });
};

const createInteriorSpatialConnections = (
  node: MuseumManifestNode,
): readonly MuseumSpatialConnection[] => (node.geometry?.interiorOpenings ?? []).map((opening) => {
  const acrossX = Math.abs(opening.inwardNormal.z) > .5;
  return {
    id: `${node.id}:${opening.id}`,
    fromCellId: `${node.id}:${opening.fromCellId}`,
    toCellId: `${node.id}:${opening.toCellId}`,
    openingBounds: acrossX
      ? {
          minX: opening.position.x - opening.clearWidth / 2,
          maxX: opening.position.x + opening.clearWidth / 2,
          minZ: opening.position.z - opening.transitionDepth / 2,
          maxZ: opening.position.z + opening.transitionDepth / 2,
        }
      : {
          minX: opening.position.x - opening.transitionDepth / 2,
          maxX: opening.position.x + opening.transitionDepth / 2,
          minZ: opening.position.z - opening.clearWidth / 2,
          maxZ: opening.position.z + opening.clearWidth / 2,
        },
  };
});

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
  const furnishings = [
    ...(node.geometry?.furnishings ?? []),
    ...(node.id === MUSEUM_VISITOR_MAP_KIOSK.nodeId ? [MUSEUM_VISITOR_MAP_KIOSK] : []),
  ];
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
    spatialConnections: createInteriorSpatialConnections(node),
    wallColliders,
    furnishings,
    obstacleColliders: [...furnishings],
    exhibits: [],
    signs: node.geometry?.signs ?? [],
  };
};

const liveConnectionEndpointKeys = new Set(
  MUSEUM_BUILDING_MANIFEST.connections
    .filter(({implementationStatus, accessible}) => implementationStatus === 'live' && accessible)
    .flatMap(({a, b}) => [`${a.nodeId}/${a.slotId}`, `${b.nodeId}/${b.slotId}`]),
);

const activeSlotIdsForNode = (node: MuseumManifestNode): ReadonlySet<string> => new Set(
  node.doorwaySlots
    .filter(({id}) => liveConnectionEndpointKeys.has(`${node.id}/${id}`))
    .map(({id}) => id),
);

const hallDefinitions: readonly MuseumHallDefinition[] = hallContents.map((content) => {
  const node = MUSEUM_BUILDING_MANIFEST.nodes.find(({publicHallId}) => publicHallId === content.id);
  if (!node) throw new Error(`Museum hall ${content.id} has no physical node in the building manifest.`);
  const shell = resolveMuseumHallShell(node, content.layout, activeSlotIdsForNode(node));
  return {
    ...content,
    layout: shell.layout,
    physicalNodeId: node.id,
    worldTransform: node.transform,
    architectureWalls: [...shell.architectureWalls, ...(content.architectureOnlyWalls ?? [])],
    resolvedTemplate: shell.resolvedTemplate,
    entrances: node.doorwaySlots.map(toEntrance),
  };
});

const hallDefinitionByPhysicalNodeId = new Map(
  hallDefinitions.map((definition) => [definition.physicalNodeId, definition]),
);
const circulationWallSetsByNodeId = new Map(
  MUSEUM_BUILDING_MANIFEST.nodes.flatMap((node) => hallDefinitionByPhysicalNodeId.has(node.id)
    ? []
    : [[node.id, createCirculationWalls(node, activeSlotIdsForNode(node))] as const]),
);
const manifestNodeIndex = new Map(
  MUSEUM_BUILDING_MANIFEST.nodes.map((node, index) => [node.id, index]),
);
const persistentArchitectureNodes = MUSEUM_BUILDING_MANIFEST.nodes
  .filter((node) => circulationWallSetsByNodeId.has(node.id))
  .sort((first, second) => {
    const firstRole = first.kind === 'hall' ? 0 : 1;
    const secondRole = second.kind === 'hall' ? 0 : 1;
    return firstRole - secondRole
      || (manifestNodeIndex.get(first.id) ?? 0) - (manifestNodeIndex.get(second.id) ?? 0);
  });
const visibleCirculationArchitectureByNodeId = new Map<string, readonly MuseumWallDefinition[]>();
const ownedArchitecturePlanes: MuseumWorldWallPlane[] = hallDefinitions.flatMap((hall) =>
  (hall.architectureWalls ?? hall.layout.wallColliders)
    .map((wall) => museumWorldWallPlane(hall.worldTransform, wall)));
for (const node of persistentArchitectureNodes) {
  const rawWalls = circulationWallSetsByNodeId.get(node.id)?.architecture ?? [];
  const visibleWalls = removeCoveredMuseumWallSurfaces(
    node.transform,
    rawWalls,
    ownedArchitecturePlanes,
  );
  visibleCirculationArchitectureByNodeId.set(node.id, visibleWalls);
  ownedArchitecturePlanes.push(
    ...visibleWalls.map((wall) => museumWorldWallPlane(node.transform, wall)),
  );
}

// Physical manifest order is the permanent ownership priority. Activation-list
// order must never change which hall owns a shared atomic wall or portal.
const permanentStructuralSources = MUSEUM_BUILDING_MANIFEST.nodes.flatMap((node) => {
  const source = node.publicHallId
    ? hallDefinitions.find(({id}) => id === node.publicHallId)
    : undefined;
  return source && museumHallHasPermanentStructure(source.id) ? [source] : [];
});
if (permanentStructuralSources.length !== MUSEUM_PERMANENT_STRUCTURAL_HALL_IDS.length) {
  throw new Error('Permanent Museum structure does not resolve every configured canonical hall.');
}
const permanentStructuralOrderByNodeId = new Map(
  permanentStructuralSources.map((definition, index) => [definition.physicalNodeId, index]),
);
const suppressedPermanentPortalKeys = new Set<string>();
for (const connection of MUSEUM_BUILDING_MANIFEST.connections) {
  const firstIndex = permanentStructuralOrderByNodeId.get(connection.a.nodeId);
  const secondIndex = permanentStructuralOrderByNodeId.get(connection.b.nodeId);
  if (firstIndex === undefined || secondIndex === undefined) continue;
  const suppressed = firstIndex < secondIndex ? connection.b : connection.a;
  suppressedPermanentPortalKeys.add(`${suppressed.nodeId}/${suppressed.slotId}`);
}

export type MuseumPermanentStructuralHall = {
  hallId: MuseumPermanentStructuralHallId;
  definition: MuseumHallDefinition;
  structuralWallIds: readonly string[];
  ownedPortalIds: readonly string[];
  sceneAssetIds: readonly [];
  sceneBytes: 0;
};

const permanentStructuralOwnedPlanes: MuseumWorldWallPlane[] = [];
export const MUSEUM_PERMANENT_STRUCTURAL_HALLS: readonly MuseumPermanentStructuralHall[] =
  permanentStructuralSources.map((source) => {
    const hallId = source.id as MuseumPermanentStructuralHallId;
    const architectureWalls = removeCoveredMuseumWallSurfaces(
      source.worldTransform,
      source.architectureWalls,
      permanentStructuralOwnedPlanes,
    );
    permanentStructuralOwnedPlanes.push(
      ...architectureWalls.map((wall) => museumWorldWallPlane(source.worldTransform, wall)),
    );
    const ownedPortalIds = source.resolvedTemplate.portalInterfaces
      .filter(({active, manifestSlotId}) =>
        active
        && !suppressedPermanentPortalKeys.has(`${source.physicalNodeId}/${manifestSlotId}`))
      .map(({manifestSlotId}) => manifestSlotId);
    return {
      hallId,
      definition: {...source, architectureWalls},
      structuralWallIds: architectureWalls.map(({id}) => id),
      ownedPortalIds,
      sceneAssetIds: [],
      sceneBytes: 0,
    };
  });

const runtimeNodes: readonly MuseumRuntimeNodeDefinition[] = MUSEUM_BUILDING_MANIFEST.nodes.map((node) => {
  const hall = node.publicHallId
    ? hallDefinitions.find(({id}) => id === node.publicHallId)
    : undefined;
  const circulationWalls = hall ? undefined : circulationWallSetsByNodeId.get(node.id);
  const circulationArchitectureWalls = hall
    ? undefined
    : visibleCirculationArchitectureByNodeId.get(node.id);
  return {
    id: node.id,
    kind: node.kind,
    programHallId: node.programHallId,
    publicHallId: node.publicHallId,
    galleryState: node.galleryState,
    publicGalleryNumber: node.publicGalleryNumber,
    visitSequence: node.visitSequence,
    bandId: node.bandId,
    roomIds: node.roomIds,
    roomLayoutStrategy: node.roomLayoutStrategy,
    routePortals: node.routePortals,
    fastTravelEligible: node.fastTravelEligible ?? node.galleryState === 'curated-open',
    pilotRole: node.physicalRole as MuseumPilotRole,
    templateId: node.templateId,
    geometryAdapterId: node.geometryAdapterId,
    implementationStatus: node.implementationStatus,
    levelId: node.levelId,
    worldTransform: node.transform,
    layout: hall?.layout ?? createNavigationLayout(node, circulationWalls?.colliders ?? []),
    ...(hall
      ? {architectureWalls: hall.architectureWalls, resolvedTemplate: hall.resolvedTemplate}
      : circulationArchitectureWalls
        ? {architectureWalls: circulationArchitectureWalls}
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
/** Persistent architecture outside the 26 curated hall-content subtrees. */
export const MUSEUM_CIRCULATION_NODES = runtimeNodes.filter(({publicHallId}) => !publicHallId);
export const MUSEUM_DIRECTED_CONNECTIONS = directedConnections;

export const getMuseumRuntimeNode = (nodeId: MuseumPhysicalNodeId): MuseumRuntimeNodeDefinition | undefined =>
  MUSEUM_RUNTIME_NODES.find(({id}) => id === nodeId);

export const getMuseumRuntimeHallNode = (hallId: MuseumPublicHallId): MuseumRuntimeNodeDefinition | undefined =>
  MUSEUM_RUNTIME_NODES.find(({publicHallId}) => publicHallId === hallId);

export const getMuseumHallDefinition = (hallId: string): MuseumHallDefinition | undefined =>
  MUSEUM_WORLD_DEFINITIONS.find(({id}) => id === hallId);

export const getMuseumNodeConnections = (nodeId: MuseumPhysicalNodeId): readonly MuseumDirectedConnection[] =>
  MUSEUM_DIRECTED_CONNECTIONS.filter(({sourceNodeId, accessible, implementationStatus}) =>
    sourceNodeId === nodeId && accessible && implementationStatus === 'live');

export const getMuseumConnectionTargetHallId = (
  connection: Pick<MuseumDirectedConnection, 'targetNodeId'>,
): MuseumPublicHallId | undefined => getMuseumRuntimeNode(connection.targetNodeId)?.publicHallId;

/** The single runtime transform used by architecture derived from node-local geometry. */
export const museumRuntimePointToWorld = (
  node: Pick<MuseumRuntimeNodeDefinition, 'worldTransform'>,
  point: MuseumPoint,
): MuseumPoint => {
  const cosine = Math.cos(node.worldTransform.yaw);
  const sine = Math.sin(node.worldTransform.yaw);
  return {
    x: node.worldTransform.x + point.x * cosine + point.z * sine,
    z: node.worldTransform.z - point.x * sine + point.z * cosine,
  };
};
