import type {
  MuseumFurnishingDefinition,
  MuseumPhysicalNodeId,
  MuseumPose,
} from './museumWorldTypes';

export type MuseumVisitorMapKioskDefinition = MuseumFurnishingDefinition & {
  kind: 'visitor-map-kiosk';
  /** The kiosk belongs to the architectural entrance node, never a gallery. */
  nodeId: MuseumPhysicalNodeId;
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
 * Dependency-free physical furnishing definition. Coordinates are local to
 * the Grand Entrance & Orientation Hall and are projected through that node's
 * transform by the map and runtime.
 */
export const MUSEUM_VISITOR_MAP_KIOSK = {
  id: 'entrance-visitor-map-kiosk',
  kind: 'visitor-map-kiosk',
  nodeId: 'place:grand-entrance-orientation',
  center: {x: 10, z: -9},
  size: {width: 2.1, depth: .9},
  rotation: Math.PI,
  height: 2.52,
  interactionRadius: 3.2,
  approachPose: {x: 10, z: -12.2, yaw: Math.PI, pitch: -.025},
  screen: {width: 1.7, height: 1.3, centerY: 1.55},
  light: {color: '#ffe8c6', intensity: 1.6, distance: 4.6},
} as const satisfies MuseumVisitorMapKioskDefinition;
