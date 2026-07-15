import type {MuseumHallId} from '../museumCatalog';
import type {
  MuseumFurnishingDefinition,
  MuseumHallDefinition,
  MuseumInteractionTarget,
  MuseumPose,
} from './museumWorldTypes';

export type MuseumVisitorMapDestination =
  | {kind: 'spawn'}
  | {kind: 'entrance'; entranceId: string};

export type MuseumVisitorMapNode = {
  hallId: MuseumHallId;
  mapPosition: {x: number; y: number};
  destination: MuseumVisitorMapDestination;
};

export type MuseumVisitorMapKioskDefinition = MuseumFurnishingDefinition & {
  kind: 'visitor-map-kiosk';
  hallId: MuseumHallId;
  interactionRadius: number;
  approachPose: MuseumPose;
  screen: {
    width: number;
    height: number;
    centerY: number;
  };
  light: {
    color: string;
    intensity: number;
    distance: number;
  };
};

/**
 * One authored floor-plan projection for the registered continuous world.
 * Names, dates, descriptions, routes, and graph edges stay in the catalog and
 * world registry; this file only owns the diagram coordinates and safe-arrival
 * policy that cannot be inferred cleanly from the dogleg world geometry.
 */
export const MUSEUM_VISITOR_MAP_NODES = [
  {hallId: 'ancient-greek', mapPosition: {x: 14, y: 18}, destination: {kind: 'spawn'}},
  {hallId: 'renaissance-reason-revolution', mapPosition: {x: 42, y: 18}, destination: {kind: 'spawn'}},
  {hallId: 'modernity-freedom-critique', mapPosition: {x: 70, y: 34}, destination: {kind: 'spawn'}},
  {hallId: 'logic-language-science', mapPosition: {x: 70, y: 66}, destination: {kind: 'spawn'}},
  {hallId: 'ethics-justice-political-life', mapPosition: {x: 42, y: 82}, destination: {kind: 'spawn'}},
  {hallId: 'mind-consciousness-self', mapPosition: {x: 14, y: 82}, destination: {kind: 'spawn'}},
] as const satisfies readonly MuseumVisitorMapNode[];

/** Shared placement drives the rendered object, collider, proximity, and audit. */
export const MUSEUM_VISITOR_MAP_KIOSK = {
  id: 'entrance-visitor-map-kiosk',
  kind: 'visitor-map-kiosk',
  hallId: 'ancient-greek',
  center: {x: 2.27, z: 32.15},
  size: {width: 2.1, depth: .9},
  rotation: -.42,
  height: 2.52,
  interactionRadius: 3.2,
  approachPose: {x: 1.55, z: 34.85, yaw: -.26, pitch: -.025},
  screen: {width: 1.7, height: 1.3, centerY: 1.55},
  light: {color: '#ffe8c6', intensity: 1.6, distance: 4.6},
} as const satisfies MuseumVisitorMapKioskDefinition;

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
