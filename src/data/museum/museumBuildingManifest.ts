import manifestJson from './museumBuildingManifest.json';
import type {
  MuseumBounds,
  MuseumFurnishingDefinition,
  MuseumImplementationStatus,
  MuseumPhysicalConnection,
  MuseumPhysicalNodeKind,
  MuseumPilotRole,
  MuseumPoint,
  MuseumPose,
  MuseumReservation,
  MuseumWorldTransform,
} from './museumWorldTypes';
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
  bounds: MuseumBounds;
  ceilingHeight: number;
};

export type MuseumManifestNode = {
  id: string;
  kind: MuseumPhysicalNodeKind;
  publicHallId?: MuseumPublicHallId;
  pilotRole: MuseumPilotRole;
  templateId?: 'standard-rect' | 'sequence-3' | 'crossroads-4' | 'focal-terminal';
  geometryAdapterId?: string;
  implementationStatus: MuseumImplementationStatus;
  levelId: 'L0';
  transform: MuseumWorldTransform;
  map: {label: string; status: 'open' | 'orientation-open' | 'future'};
  geometry?: {
    cells: readonly MuseumManifestGeometryCell[];
    furnishings?: readonly MuseumFurnishingDefinition[];
  };
  doorwaySlots: readonly MuseumManifestDoorwaySlot[];
};

export type MuseumBuildingManifest = {
  schemaVersion: 1;
  manifestVersion: string;
  status: 'approved-canonical-six';
  physicalOptionId: 'ring-of-wings';
  units: 'metres';
  level: {id: 'L0'; title: string; elevation: number};
  physicalContract: {
    wallThickness: number;
    doorClearWidth: number;
    doorClearHeight: number;
    transitionDepth: number;
    safeLandingWidth: number;
    safeLandingDepth: number;
    defaultCeilingHeight: number;
    stepFree: true;
  };
  residencyPolicy: {
    maxResidentHallContents: number;
    recentHallCount: number;
    approachDistance: number;
    decodedTextureBudgetMiB: number;
  };
  mainEntrance: {nodeId: string; slotId: string};
  forumLocationNodeId: string;
  kiosk: {publicHallId: MuseumPublicHallId; kioskId: string};
  nodes: readonly MuseumManifestNode[];
  connections: readonly MuseumPhysicalConnection[];
  reservations: readonly MuseumReservation[];
};

const manifest = manifestJson as MuseumBuildingManifest;

const assertApprovedManifest = (candidate: MuseumBuildingManifest): void => {
  if (
    candidate.schemaVersion !== 1
    || candidate.status !== 'approved-canonical-six'
    || candidate.physicalOptionId !== 'ring-of-wings'
    || candidate.level.id !== 'L0'
  ) throw new Error('The Museum building manifest is not the approved canonical Ring of Wings contract.');

  const nodeIds = new Set(candidate.nodes.map(({id}) => id));
  if (nodeIds.size !== candidate.nodes.length) throw new Error('Museum building node IDs must be unique.');
  for (const connection of candidate.connections) {
    for (const endpoint of [connection.a, connection.b]) {
      const node = candidate.nodes.find(({id}) => id === endpoint.nodeId);
      if (!node || !node.doorwaySlots.some(({id}) => id === endpoint.slotId)) {
        throw new Error(`Museum connection ${connection.id} references a missing doorway slot.`);
      }
    }
  }
  const outwardPortals = candidate.reservations.filter(({reservationType}) => reservationType === 'outward-expansion');
  if (outwardPortals.length !== 8) throw new Error('The canonical Ring must retain exactly eight outward expansion portals.');
  for (const reservation of candidate.reservations) {
    if (
      !Number.isFinite(reservation.barrierCenter?.x)
      || !Number.isFinite(reservation.barrierCenter?.z)
      || !Number.isFinite(reservation.barrierWidth)
      || reservation.barrierWidth <= 0
      || reservation.barrierWidth > reservation.size.width
    ) throw new Error(`Museum reservation ${reservation.id} has an invalid physical barrier contract.`);
  }
};

assertApprovedManifest(manifest);

/** The sole authored physical source for geometry placement, seams, and expansion reservations. */
export const MUSEUM_BUILDING_MANIFEST = manifest;

export const getMuseumManifestNode = (nodeId: string): MuseumManifestNode | undefined =>
  MUSEUM_BUILDING_MANIFEST.nodes.find(({id}) => id === nodeId);

export const getMuseumManifestHallNode = (hallId: MuseumPublicHallId): MuseumManifestNode | undefined =>
  MUSEUM_BUILDING_MANIFEST.nodes.find(({publicHallId}) => publicHallId === hallId);
