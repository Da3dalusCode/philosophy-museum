import type {MuseumPublicHallId as MuseumHallId} from '../museumCatalog';
import type {MuseumPlannedHallId} from './museumCanonicalProgram';
import manifestJson from './museumContinuousEnfiladeManifest.json';
import {
  MUSEUM_VISITOR_MAP_KIOSK,
  type MuseumVisitorMapKioskDefinition,
} from './museumVisitorMapKioskDefinition';
import type {
  MuseumBounds,
  MuseumGalleryState,
  MuseumHallDefinition,
  MuseumImplementationStatus,
  MuseumInteractionTarget,
  MuseumPhysicalConnection,
  MuseumPhysicalNodeId,
  MuseumPhysicalNodeKind,
  MuseumPoint,
  MuseumPose,
  MuseumRuntimeNodeDefinition,
  MuseumWorldTransform,
} from './museumWorldTypes';

export {MUSEUM_VISITOR_MAP_KIOSK, type MuseumVisitorMapKioskDefinition};

export type MuseumVisitorMapManifestCell = {
  id: string;
  kind?: 'room' | 'passage';
  bounds: MuseumBounds;
  renderBounds?: MuseumBounds;
  ceilingHeight: number;
};

export type MuseumVisitorMapManifestDoorway = {
  id: string;
  position: MuseumPoint;
  inwardNormal: MuseumPoint;
  clearWidth: number;
  clearHeight: number;
  transitionDepth: number;
  landingBounds: MuseumBounds;
  arrivalPose: MuseumPose;
};

export type MuseumVisitorMapManifestNode = {
  id: MuseumPhysicalNodeId;
  kind: MuseumPhysicalNodeKind;
  physicalRole: string;
  programHallId?: MuseumPlannedHallId;
  /** Compatibility content id: deliberately absent from planned gallery shells. */
  publicHallId?: MuseumHallId;
  galleryState?: MuseumGalleryState;
  publicGalleryNumber?: number;
  visitSequence?: number;
  bandId?: string;
  roomIds?: readonly string[];
  rooms?: readonly {id: string; title: string}[];
  roomLayoutStrategy?: string;
  routePortals?: Readonly<Record<string, string>>;
  fastTravelEligible?: boolean;
  title: string;
  /** Compatibility field accepted from older manifests; v2 uses physicalRole. */
  pilotRole?: string;
  implementationStatus: MuseumImplementationStatus;
  levelId: 'L0';
  transform: MuseumWorldTransform;
  bounds: MuseumBounds;
  footprint?: unknown;
  geometry?: {
    cells?: readonly MuseumVisitorMapManifestCell[];
    interiorOpenings?: readonly unknown[];
    signs?: readonly unknown[];
  };
  doorwaySlots: readonly MuseumVisitorMapManifestDoorway[];
  map: {
    label: string;
    status: MuseumRuntimeNodeDefinition['mapStatus'];
  };
};

export type MuseumVisitorMapReserve = {
  id: string;
  title?: string;
  label?: string;
  status: string;
  bounds: MuseumBounds;
  currentDoorState?: string;
  futureEntryFrom?: string;
  map?: {label: string; status: 'closed-reserve'};
};

export type MuseumVisitorMapManifest = {
  schemaVersion: 2;
  manifestVersion: string;
  status: string;
  physicalOptionId: string;
  units: 'metres';
  level: {id: 'L0'; title: string; elevation: number};
  physicalContract: {
    crosscutClearWidth?: number;
    [key: string]: unknown;
  };
  residencyPolicy: {
    maxResidentHallContents: number;
    recentHallCount: number;
    approachDistance: number;
    decodedTextureBudgetMiB: number;
  };
  mainEntrance: {nodeId: MuseumPhysicalNodeId; slotId: string};
  forumNodeId: MuseumPhysicalNodeId;
  finalThresholdNodeId: MuseumPhysicalNodeId;
  crosscut: {
    id: string;
    title: string;
    clearWidth: number;
    intersections: readonly {
      id: MuseumPhysicalNodeId;
      nodeId?: MuseumPhysicalNodeId;
      zCenter: number;
      occupiedByHallId?: MuseumPlannedHallId;
      betweenHallIds?: readonly MuseumPlannedHallId[];
    }[];
  };
  throughRoute: {
    start: MuseumPhysicalNodeId;
    finish: MuseumPhysicalNodeId;
    hallOrder: readonly MuseumPlannedHallId[];
    crossingBayIds: readonly MuseumPhysicalNodeId[];
  };
  nodes: readonly MuseumVisitorMapManifestNode[];
  connections: readonly MuseumPhysicalConnection[];
  reserves: readonly MuseumVisitorMapReserve[];
  counts: {
    halls: number;
    rooms: number;
    curatedOpen: number;
    plannedWalkable: number;
    reserves: number;
  };
};

/**
 * Lightweight public-plan source for the map and kiosk. It contains no scene,
 * interpretation, supplemental-exhibit, image, or texture registrations.
 */
export const MUSEUM_VISITOR_MAP_MANIFEST =
  manifestJson as unknown as MuseumVisitorMapManifest;

export type MuseumVisitorMapDestination =
  | {kind: 'spawn'}
  | {kind: 'entrance'; entranceId: string}
  | {kind: 'walk-only'};

export type MuseumVisitorMapNode = {
  programHallId: MuseumPlannedHallId;
  /** Present only for the twelve curated/open content registrations. */
  hallId?: MuseumHallId;
  physicalNodeId: MuseumPhysicalNodeId;
  title: string;
  publicGalleryNumber: number;
  visitSequence: number;
  galleryState: MuseumGalleryState;
  roomIds: readonly string[];
  rooms: readonly {id: string; title: string}[];
  fastTravelEligible: boolean;
  destination: MuseumVisitorMapDestination;
};

const hallNodes = MUSEUM_VISITOR_MAP_MANIFEST.nodes.filter(
  (node): node is MuseumVisitorMapManifestNode & {
    programHallId: MuseumPlannedHallId;
    galleryState: MuseumGalleryState;
    publicGalleryNumber: number;
    visitSequence: number;
    roomIds: readonly string[];
  } => (
    node.kind === 'hall'
    && node.programHallId !== undefined
    && node.galleryState !== undefined
    && node.publicGalleryNumber !== undefined
    && node.visitSequence !== undefined
    && node.roomIds !== undefined
  ),
);

/** All 26 walkable galleries, ordered by physical through-route sequence. */
export const MUSEUM_VISITOR_MAP_NODES = hallNodes
  .map((node): MuseumVisitorMapNode => {
    const fastTravelEligible = node.galleryState === 'curated-open'
      && node.publicHallId !== undefined
      && node.fastTravelEligible !== false;
    return {
      programHallId: node.programHallId,
      hallId: node.publicHallId,
      physicalNodeId: node.id,
      title: node.title,
      publicGalleryNumber: node.publicGalleryNumber,
      visitSequence: node.visitSequence,
      galleryState: node.galleryState,
      roomIds: node.roomIds,
      rooms: node.rooms?.length === node.roomIds.length
        ? node.rooms
        : node.roomIds.map((id) => ({id, title: id})),
      fastTravelEligible,
      destination: fastTravelEligible ? {kind: 'spawn'} : {kind: 'walk-only'},
    };
  })
  .sort((first, second) => first.visitSequence - second.visitSequence);

const publicNumbers = new Set(MUSEUM_VISITOR_MAP_NODES.map(({publicGalleryNumber}) => publicGalleryNumber));
const programIds = new Set(MUSEUM_VISITOR_MAP_NODES.map(({programHallId}) => programHallId));
const roomIds = MUSEUM_VISITOR_MAP_NODES.flatMap((node) => node.roomIds);
const curatedDestinations = MUSEUM_VISITOR_MAP_NODES.filter(({fastTravelEligible}) => fastTravelEligible);
if (
  MUSEUM_VISITOR_MAP_NODES.length !== 26
  || publicNumbers.size !== 26
  || programIds.size !== 26
  || roomIds.length !== 105
  || new Set(roomIds).size !== 105
  || curatedDestinations.length !== 12
  || MUSEUM_VISITOR_MAP_MANIFEST.reserves.length !== 2
) {
  throw new Error('The Continuous Enfilade visitor-map program is incomplete.');
}

if (MUSEUM_VISITOR_MAP_KIOSK.nodeId !== MUSEUM_VISITOR_MAP_MANIFEST.mainEntrance.nodeId) {
  throw new Error('The visitor-map kiosk must belong to the Grand Entrance node.');
}

export const getMuseumVisitorMapNode = (
  hallId: MuseumHallId | MuseumPlannedHallId,
): MuseumVisitorMapNode | undefined =>
  MUSEUM_VISITOR_MAP_NODES.find((node) =>
    node.programHallId === hallId || node.hallId === hallId);

export const getMuseumVisitorMapNodeByPhysicalId = (
  nodeId: MuseumPhysicalNodeId,
): MuseumVisitorMapNode | undefined =>
  MUSEUM_VISITOR_MAP_NODES.find((node) => node.physicalNodeId === nodeId);

/** Only curated/open galleries resolve to a direct-travel destination. */
export const resolveMuseumVisitorMapDestination = (
  definition: MuseumHallDefinition,
  node: MuseumVisitorMapNode,
): MuseumPose | undefined => {
  if (
    !node.fastTravelEligible
    || node.hallId === undefined
    || definition.id !== node.hallId
  ) return undefined;
  const destination = node.destination;
  if (destination.kind === 'spawn') return {...definition.layout.spawn};
  if (destination.kind === 'walk-only') return undefined;
  const entrance = definition.entrances.find(({id}) => id === destination.entranceId);
  return entrance ? {...entrance.arrivalPose} : undefined;
};

/**
 * Node-keyed kiosk hit test. The entrance is an architectural location with no
 * curated hall id, so interaction identity must never be inferred from content.
 */
export const visitorMapInteractionAtPose = (
  nodeId: MuseumPhysicalNodeId,
  pose: Pick<MuseumPose, 'x' | 'z'>,
): MuseumInteractionTarget | undefined => {
  if (nodeId !== MUSEUM_VISITOR_MAP_KIOSK.nodeId) return undefined;
  const kiosk = MUSEUM_VISITOR_MAP_KIOSK;
  if (!Number.isFinite(pose.x) || !Number.isFinite(pose.z)) return undefined;
  const offsetX = pose.x - kiosk.center.x;
  const offsetZ = pose.z - kiosk.center.z;
  const distance = Math.hypot(offsetX, offsetZ);
  const sine = Math.sin(kiosk.rotation);
  const cosine = Math.cos(kiosk.rotation);
  const localZ = sine * offsetX + cosine * offsetZ;
  return distance <= kiosk.interactionRadius && localZ > kiosk.size.depth / 2
    ? {kind: 'visitor-map', nodeId, kioskId: kiosk.id}
    : undefined;
};
