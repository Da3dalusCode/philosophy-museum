import type {MuseumFurnishingDefinition} from './museumWorldTypes';

/**
 * A quiet reception focal point for the Grand Entrance welcome wall.
 * It is intentionally noninteractive, but its footprint remains part of
 * movement collision so the visual and navigable room stay in agreement.
 */
export const MUSEUM_GRAND_ENTRANCE_FRONT_DESK = {
  id: 'grand-entrance-front-desk',
  kind: 'reception-desk',
  center: {x: 0, z: -23.35},
  size: {width: 6.2, depth: 1.45},
  rotation: 0,
  height: 1.16,
} as const satisfies MuseumFurnishingDefinition;
