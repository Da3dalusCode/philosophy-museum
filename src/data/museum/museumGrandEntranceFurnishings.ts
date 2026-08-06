import type {MuseumFurnishingDefinition} from './museumWorldTypes';

/**
 * The north-up plan's east wall compiles to the Grand Entrance's local min-x
 * wall. All three welcome elements share this z centerline and face runtime
 * +x, which is plan west and therefore inward from that wall.
 */
export const MUSEUM_GRAND_ENTRANCE_WELCOME_COMPOSITION = Object.freeze({
  wall: 'east',
  planWall: 'max-x',
  runtimeWall: 'min-x',
  centerlineZ: -9.5,
  inwardRotation: Math.PI / 2,
  oculus: {
    center: {x: -19.55, y: 3, z: -9.5},
    size: {width: 7.35, height: 4.6},
    rotation: Math.PI / 2,
  },
  welcomeSign: {
    center: {x: -19.3, y: 3.05, z: -9.5},
    size: {width: 6.7, height: 1.809},
    rotation: Math.PI / 2,
  },
  framingPilasters: [
    {x: -19.62, z: -14.7, rotation: Math.PI / 2},
    {x: -19.62, z: -4.3, rotation: Math.PI / 2},
  ],
} as const);

/**
 * A quiet reception focal point for the Grand Entrance east wall.
 * It is intentionally noninteractive, but its footprint remains part of
 * movement collision so the visual and navigable room stay in agreement.
 */
export const MUSEUM_GRAND_ENTRANCE_FRONT_DESK = {
  id: 'grand-entrance-front-desk',
  kind: 'reception-desk',
  center: {x: -15.35, z: MUSEUM_GRAND_ENTRANCE_WELCOME_COMPOSITION.centerlineZ},
  size: {width: 6.2, depth: 1.45},
  rotation: MUSEUM_GRAND_ENTRANCE_WELCOME_COMPOSITION.inwardRotation,
  height: 1.16,
} as const satisfies MuseumFurnishingDefinition;
