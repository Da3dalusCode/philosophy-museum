import type {MuseumPublicHallId as MuseumHallId} from '../museumCatalog';
import type {MuseumFurnishingDefinition, MuseumPose} from './museumWorldTypes';

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
 * Dependency-free physical furnishing definition. The visitor-map registry
 * verifies its identity and public hall against the authoritative manifest.
 */
export const MUSEUM_VISITOR_MAP_KIOSK = {
  id: 'entrance-visitor-map-kiosk',
  kind: 'visitor-map-kiosk',
  hallId: 'mediterranean-beginnings-classical',
  center: {x: 5.4, z: -23},
  size: {width: 2.1, depth: .9},
  rotation: 0,
  height: 2.52,
  interactionRadius: 3.2,
  approachPose: {x: 5.4, z: -19.8, yaw: 0, pitch: -.025},
  screen: {width: 1.7, height: 1.3, centerY: 1.55},
  light: {color: '#ffe8c6', intensity: 1.6, distance: 4.6},
} as const satisfies MuseumVisitorMapKioskDefinition;
