import type {MuseumFurnishingDefinition} from './museumWorldTypes';

const WELCOME_CENTERLINE_Z = -9.5;

export const MUSEUM_GRAND_ENTRANCE_WELCOME_COPY = Object.freeze({
  kicker: 'PHILOSOPHY ATLAS MUSEUM · GRAND ENTRANCE',
  titleLead: 'ENTER',
  titleRest: 'THE CONVERSATION',
  subtitleLead: '26 GALLERIES',
  subtitleRest: ' of questions, arguments, and changing ideas',
} as const);

/**
 * The north-up plan's east wall compiles to the Grand Entrance's local min-x
 * wall. All three welcome elements share this z centerline and face runtime
 * +x, which is plan west and therefore inward from that wall.
 */
export const MUSEUM_GRAND_ENTRANCE_WELCOME_COMPOSITION = Object.freeze({
  wall: 'east',
  planWall: 'max-x',
  runtimeWall: 'min-x',
  centerlineZ: WELCOME_CENTERLINE_Z,
  inwardRotation: Math.PI / 2,
  oculus: {
    center: {x: -19.55, y: 3, z: WELCOME_CENTERLINE_Z},
    size: {width: 7.35, height: 4.6},
    rotation: Math.PI / 2,
  },
  welcomeSign: {
    center: {x: -19.3, y: 3.05, z: WELCOME_CENTERLINE_Z},
    size: {width: 6.7, height: 1.809},
    rotation: Math.PI / 2,
  },
} as const);

/**
 * A room-wide engaged-pilaster order. Blank walls follow the coffer rhythm;
 * opening walls use paired supports to frame the public entrance, Welcome
 * composition, and Gallery 01 threshold instead of scattering decorative posts.
 */
export const MUSEUM_GRAND_ENTRANCE_PILASTER_SYSTEM = Object.freeze({
  ceilingHeight: 5.8,
  architecturalTop: 5.7,
  shaftTop: 4.9,
  placements: [
    ...[-16.5, -5.5, 5.5, 16.5].flatMap((x) => [
      {id: `south:${x}`, wall: 'south', role: 'coffer-rhythm', x, z: -27.62, rotation: 0, inward: 1 as const},
      {id: `north:${x}`, wall: 'north', role: 'coffer-rhythm', x, z: 27.62, rotation: 0, inward: -1 as const},
    ]),
    {id: 'west:outer-south', wall: 'west', role: 'wall-rhythm', x: 19.62, z: -20, rotation: Math.PI / 2, inward: -1 as const},
    {id: 'west:public-entry-south', wall: 'west', role: 'public-entry-frame', x: 19.62, z: -2.75, rotation: Math.PI / 2, inward: -1 as const},
    {id: 'west:public-entry-north', wall: 'west', role: 'public-entry-frame', x: 19.62, z: 2.75, rotation: Math.PI / 2, inward: -1 as const},
    {id: 'west:outer-north', wall: 'west', role: 'wall-rhythm', x: 19.62, z: 20, rotation: Math.PI / 2, inward: -1 as const},
    {id: 'east:welcome-south', wall: 'east', role: 'welcome-frame', x: -19.62, z: -14.7, rotation: Math.PI / 2, inward: 1 as const},
    {id: 'east:welcome-north', wall: 'east', role: 'welcome-frame', x: -19.62, z: -4.3, rotation: Math.PI / 2, inward: 1 as const},
    {id: 'east:gallery-01-south', wall: 'east', role: 'gallery-01-frame', x: -19.62, z: 11.2, rotation: Math.PI / 2, inward: 1 as const},
    {id: 'east:gallery-01-north', wall: 'east', role: 'gallery-01-frame', x: -19.62, z: 16.8, rotation: Math.PI / 2, inward: 1 as const},
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
