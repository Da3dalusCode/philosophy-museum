import type {MuseumHallId} from '../museumCatalog';
import {MUSEUM_BUILDING_MANIFEST} from './museumBuildingManifest';
import {MUSEUM_WORLD_DEFINITIONS} from './museumBuildingRuntime';
import type {
  MuseumHallDefinition,
  MuseumInteractionTarget,
  MuseumPhysicalNodeId,
  MuseumPose,
} from './museumWorldTypes';
import {
  MUSEUM_VISITOR_MAP_KIOSK,
  type MuseumVisitorMapKioskDefinition,
} from './museumVisitorMapKioskDefinition';

export {MUSEUM_VISITOR_MAP_KIOSK, type MuseumVisitorMapKioskDefinition};

export type MuseumVisitorMapDestination =
  | {kind: 'spawn'}
  | {kind: 'entrance'; entranceId: string};

export type MuseumVisitorMapNode = {
  hallId: MuseumHallId;
  physicalNodeId: MuseumPhysicalNodeId;
  destination: MuseumVisitorMapDestination;
};

/** The six public fast-travel destinations, derived from the live building registry. */
export const MUSEUM_VISITOR_MAP_NODES = MUSEUM_WORLD_DEFINITIONS.map(({id, physicalNodeId}) => ({
  hallId: id,
  physicalNodeId,
  destination: {kind: 'spawn'} as const,
})) satisfies readonly MuseumVisitorMapNode[];

if (
  MUSEUM_VISITOR_MAP_KIOSK.id !== MUSEUM_BUILDING_MANIFEST.kiosk.kioskId
  || MUSEUM_VISITOR_MAP_KIOSK.hallId !== MUSEUM_BUILDING_MANIFEST.kiosk.publicHallId
) throw new Error('The visitor-map kiosk furnishing does not match the approved building manifest.');

export const getMuseumVisitorMapNode = (hallId: MuseumHallId): MuseumVisitorMapNode | undefined =>
  MUSEUM_VISITOR_MAP_NODES.find((node) => node.hallId === hallId);

export const resolveMuseumVisitorMapDestination = (
  definition: MuseumHallDefinition,
  node: MuseumVisitorMapNode,
): MuseumPose | undefined => {
  if (definition.id !== node.hallId) return undefined;
  const destination = node.destination;
  if (destination.kind === 'spawn') return {...definition.layout.spawn};
  const entrance = definition.entrances.find(({id}) => id === destination.entranceId);
  return entrance ? {...entrance.arrivalPose} : undefined;
};

export const visitorMapInteractionAtPose = (
  hallId: MuseumHallId,
  pose: Pick<MuseumPose, 'x' | 'z'>,
): MuseumInteractionTarget | undefined => {
  if (hallId !== MUSEUM_VISITOR_MAP_KIOSK.hallId) return undefined;
  const kiosk = MUSEUM_VISITOR_MAP_KIOSK;
  if (!Number.isFinite(pose.x) || !Number.isFinite(pose.z)) return undefined;
  const offsetX = pose.x - kiosk.center.x;
  const offsetZ = pose.z - kiosk.center.z;
  const distance = Math.hypot(offsetX, offsetZ);
  const sine = Math.sin(kiosk.rotation);
  const cosine = Math.cos(kiosk.rotation);
  const localZ = sine * offsetX + cosine * offsetZ;
  return distance <= kiosk.interactionRadius && localZ > kiosk.size.depth / 2
    ? {kind: 'visitor-map', hallId, kioskId: MUSEUM_VISITOR_MAP_KIOSK.id}
    : undefined;
};
