import continuousEnfiladeJson from './museumContinuousEnfiladeManifest.json';
import rollbackRingJson from './museumBuildingManifest.json';
import type {
  MuseumBounds,
  MuseumFurnishingDefinition,
  MuseumGalleryState,
  MuseumImplementationStatus,
  MuseumPhysicalConnection,
  MuseumPhysicalNodeKind,
  MuseumPoint,
  MuseumPose,
  MuseumSignDefinition,
  MuseumWorldTransform,
} from './museumWorldTypes';
import type {MuseumPlannedHallId} from './museumCanonicalProgram';
import type {MuseumPublicHallId} from '../museumCatalog';

export type MuseumManifestDoorwaySlot = {
  id: string;
  position: MuseumPoint;
  inwardNormal: MuseumPoint;
  clearWidth: number;
  clearHeight: number;
  transitionDepth: number;
  landingBounds: MuseumBounds;
  arrivalPose: MuseumPose;
};

export type MuseumManifestGeometryCell = {
  id: string;
  kind?: 'room' | 'passage';
  title?: string;
  bounds: MuseumBounds;
  ceilingHeight: number;
  guidanceAxis?: 'x' | 'z';
};

export type MuseumManifestInteriorOpening = {
  id: string;
  fromCellId: string;
  toCellId: string;
  position: MuseumPoint;
  inwardNormal: MuseumPoint;
  clearWidth: number;
  clearHeight: number;
  transitionDepth: number;
};

export type MuseumManifestNode = {
  id: string;
  kind: MuseumPhysicalNodeKind;
  physicalRole: string;
  programHallId?: MuseumPlannedHallId;
  /** Curated content id; absent from the eight planned/walkable shells. */
  publicHallId?: MuseumPublicHallId;
  title: string;
  galleryState?: MuseumGalleryState;
  publicGalleryNumber?: number;
  visitSequence?: number;
  bandId?: string;
  roomIds?: readonly string[];
  rooms?: readonly {id: string; title: string}[];
  roomLayoutStrategy?: string;
  templateId?: 'standard-rect' | 'sequence-3' | 'crossroads-4' | 'focal-terminal';
  geometryAdapterId?: string;
  routePortals?: Readonly<Record<string, string>>;
  orientationLandmark?: {id: string; position: MuseumPoint};
  fastTravelEligible?: boolean;
  implementationStatus: MuseumImplementationStatus;
  levelId: 'L0';
  transform: MuseumWorldTransform;
  planPlacement?: {x: number; z: number; rotationDegrees: number};
  bounds: MuseumBounds;
  footprint?: unknown;
  map: {
    label: string;
    status:
      | 'open'
      | 'orientation-open'
      | 'future'
      | 'planned-walkable'
      | 'crosscut-open'
      | 'final-open'
      | 'closed-reserve';
  };
  geometry?: {
    coordinateFrame?: 'node-local' | 'hall-local';
    bounds?: MuseumBounds;
    cells: readonly MuseumManifestGeometryCell[];
    interiorOpenings?: readonly MuseumManifestInteriorOpening[];
    furnishings?: readonly MuseumFurnishingDefinition[];
    signs?: readonly MuseumSignDefinition[];
  };
  doorwaySlots: readonly MuseumManifestDoorwaySlot[];
};

export type MuseumManifestReserve = {
  id: string;
  title?: string;
  label?: string;
  status: 'site-and-structure-reserved-closed';
  bounds: MuseumBounds;
  maximumTemplate?: string;
  futureEntryFrom?: string;
  currentDoorState: 'solid-construction-wall';
  boundaryWall?: {
    id: string;
    center: MuseumPoint & {y?: number};
    size: {width: number; height: number; depth: number};
    rotationY: number;
    fullHeight: true;
    collision: true;
    rendered: true;
  };
};

export type MuseumBuildingManifest = {
  schemaVersion: 2;
  manifestVersion: string;
  status: 'implemented-approved-continuous-enfilade';
  physicalOptionId: 'continuous-enfilade-single-level';
  generatedBy: string;
  source: {
    plan: {path: string; planId: string; schemaVersion: number; sha256: string};
    program: {path: string; schemaVersion: number; sha256: string};
  };
  units: 'metres';
  level: {id: 'L0'; title: string; elevation: number};
  coordinateSystem: {
    xAxis: 'east-positive';
    zAxis: 'north-positive';
    yAxis: 'up-positive';
  };
  runtimeEmbedding: {
    engine: 'Three.js';
    runtimeHandedness: 'right-handed-y-up';
    planToRuntime: {x: '-plan.x'; z: 'plan.z'; y: 'plan.y'};
    mapFromRuntime: {x: '-runtime.x'; y: '-runtime.z'};
    reason: string;
  };
  physicalContract: {
    wallThickness: number;
    doorClearWidth: number;
    doorClearHeight: number;
    transitionDepth: number;
    safeLandingWidth: number;
    safeLandingDepth: number;
    defaultCeilingHeight: number;
    crosscutClearWidth: number;
    turnCourtClearWidth: number;
    mainGalleryBlock: {bounds: MuseumBounds; width: number; depth: number};
    controlledPlanBoundsIncludingEntranceAndReserves: MuseumBounds & {width: number; depth: number};
    stepFree: true;
  };
  residencyPolicy: {
    maxResidentHallContents: number;
    recentHallCount: number;
    approachDistance: number;
    decodedTextureBudgetMiB: number;
  };
  mainEntrance: {nodeId: string; slotId: string; routeTargetHallId?: MuseumPublicHallId};
  forumNodeId: string;
  finalThresholdNodeId: string;
  crosscut: {
    id: string;
    title: string;
    clearWidth: number;
    bounds?: MuseumBounds;
    intersections: readonly {
      id: string;
      nodeId?: string;
      zCenter: number;
      occupiedByHallId?: MuseumPlannedHallId;
      betweenHallIds?: readonly MuseumPlannedHallId[];
    }[];
  };
  throughRoute: {
    start: string;
    finish: string;
    hallOrder: readonly MuseumPlannedHallId[];
    crossingBayIds: readonly string[];
  };
  nodes: readonly MuseumManifestNode[];
  connections: readonly MuseumPhysicalConnection[];
  reserves: readonly MuseumManifestReserve[];
  counts: {
    halls: 26;
    rooms: 105;
    curatedOpen: 18;
    plannedWalkable: 8;
    reserves: 2;
  };
};

const manifest = continuousEnfiladeJson as unknown as MuseumBuildingManifest;

const assertApprovedManifest = (candidate: MuseumBuildingManifest): void => {
  if (
    candidate.schemaVersion !== 2
    || candidate.status !== 'implemented-approved-continuous-enfilade'
    || candidate.physicalOptionId !== 'continuous-enfilade-single-level'
    || candidate.level.id !== 'L0'
  ) throw new Error('The active Museum manifest is not the approved Continuous Enfilade contract.');

  const nodeIds = new Set(candidate.nodes.map(({id}) => id));
  if (nodeIds.size !== candidate.nodes.length) throw new Error('Museum building node IDs must be unique.');
  const halls = candidate.nodes.filter(({kind}) => kind === 'hall');
  const curated = halls.filter(({galleryState}) => galleryState === 'curated-open');
  const planned = halls.filter(({galleryState}) => galleryState === 'planned-walkable');
  const roomIds = halls.flatMap(({roomIds: ids}) => ids ?? []);
  if (
    halls.length !== 26
    || curated.length !== 18
    || planned.length !== 8
    || roomIds.length !== 105
    || new Set(roomIds).size !== 105
    || candidate.reserves.length !== 2
  ) throw new Error('The Continuous Enfilade must expose 26 halls, 105 rooms, 18 curated galleries, 8 planned shells, and two reserves.');
  if (candidate.crosscut.intersections.length !== 6 || candidate.throughRoute.hallOrder.length !== 26) {
    throw new Error('The Continuous Enfilade route and six-intersection crosscut are incomplete.');
  }
  for (const connection of candidate.connections) {
    for (const endpoint of [connection.a, connection.b]) {
      const node = candidate.nodes.find(({id}) => id === endpoint.nodeId);
      if (!node || !node.doorwaySlots.some(({id}) => id === endpoint.slotId)) {
        throw new Error(`Museum connection ${connection.id} references a missing doorway slot.`);
      }
    }
  }
  for (const hall of halls) {
    if (
      !hall.programHallId
      || !hall.publicGalleryNumber
      || !hall.visitSequence
      || !hall.roomIds?.length
      || !hall.templateId
    ) throw new Error(`Museum hall node ${hall.id} lacks stable program metadata.`);
    if (hall.galleryState === 'curated-open' && !hall.publicHallId) {
      throw new Error(`Curated hall ${hall.programHallId} has no content registration id.`);
    }
    if (hall.galleryState === 'planned-walkable' && hall.publicHallId) {
      throw new Error(`Planned hall ${hall.programHallId} must not masquerade as curated content.`);
    }
  }
};

assertApprovedManifest(manifest);

/** Atomic cutover: all runtime/map consumers select this one generated source. */
export const MUSEUM_BUILDING_MANIFEST = manifest;

/** Preserved authored v1 Ring source for rollback inspection and session migration only. */
export const MUSEUM_ROLLBACK_BUILDING_MANIFEST = rollbackRingJson as unknown;

export const getMuseumManifestNode = (nodeId: string): MuseumManifestNode | undefined =>
  MUSEUM_BUILDING_MANIFEST.nodes.find(({id}) => id === nodeId);

export const getMuseumManifestHallNode = (hallId: MuseumPublicHallId): MuseumManifestNode | undefined =>
  MUSEUM_BUILDING_MANIFEST.nodes.find(({publicHallId}) => publicHallId === hallId);

export const getMuseumManifestProgramHallNode = (
  hallId: MuseumPlannedHallId,
): MuseumManifestNode | undefined =>
  MUSEUM_BUILDING_MANIFEST.nodes.find(({programHallId}) => programHallId === hallId);
