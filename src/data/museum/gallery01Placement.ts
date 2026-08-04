/**
 * Gallery 01's hall-local placement contract.
 *
 * The four 24 x 14 metre rooms retain their canonical records while using the
 * same outer-wall / return-wall rhythm proven in the later sequence galleries.
 * The physical route enters at S0 (local z = 28) and leaves at N0 (z = -28),
 * so the south return of each room is also its first physical read.
 */
export type Gallery01RoomId =
  | 'med-orientation-nature'
  | 'med-being-change-plurality'
  | 'med-sophists-socratic'
  | 'med-plato-aristotle';

export type Gallery01PrimaryExhibitId =
  | 'ancient-greek'
  | 'thales'
  | 'anaximander'
  | 'anaximenes'
  | 'pythagoras'
  | 'philolaus'
  | 'parmenides'
  | 'zeno-elea'
  | 'leucippus'
  | 'democritus'
  | 'heraclitus'
  | 'empedocles'
  | 'anaxagoras'
  | 'protagoras'
  | 'prodicus'
  | 'hippias-of-elis'
  | 'gorgias'
  | 'socrates'
  | 'platonism'
  | 'plato'
  | 'aristotelianism'
  | 'aristotle';

export type Gallery01Placement = Readonly<{
  x: number;
  z: number;
  rotationY: number;
}>;

export type Gallery01Bounds = Readonly<{
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}>;

export const GALLERY_01_HALL_BOUNDS = Object.freeze({
  minX: -12,
  maxX: 12,
  minZ: -28,
  maxZ: 28,
}) satisfies Gallery01Bounds;

export const GALLERY_01_ROOM_BOUNDS = Object.freeze({
  'med-orientation-nature': {minX: -12, maxX: 12, minZ: -28, maxZ: -14},
  'med-being-change-plurality': {minX: -12, maxX: 12, minZ: -14, maxZ: 0},
  'med-sophists-socratic': {minX: -12, maxX: 12, minZ: 0, maxZ: 14},
  'med-plato-aristotle': {minX: -12, maxX: 12, minZ: 14, maxZ: 28},
}) satisfies Readonly<Record<Gallery01RoomId, Gallery01Bounds>>;

export const GALLERY_01_ROOM_PRIMARY_IDS = Object.freeze({
  'med-orientation-nature': ['ancient-greek', 'thales', 'anaximander', 'anaximenes'],
  'med-being-change-plurality': [
    'pythagoras',
    'philolaus',
    'parmenides',
    'zeno-elea',
    'leucippus',
    'democritus',
    'heraclitus',
    'empedocles',
    'anaxagoras',
  ],
  'med-sophists-socratic': ['protagoras', 'prodicus', 'hippias-of-elis', 'gorgias', 'socrates'],
  'med-plato-aristotle': ['platonism', 'aristotelianism', 'plato', 'aristotle'],
}) satisfies Readonly<Record<Gallery01RoomId, readonly Gallery01PrimaryExhibitId[]>>;

/**
 * Every room is split by the central route into two three-wall half-rooms.
 * A single installation uses the geometric centre of its wall face; overflow
 * stays symmetric on the longer outer walls. This is the Gallery 01 wall-slot
 * contract, rather than a set of loose composition points.
 */
export const GALLERY_01_PRIMARY_PLACEMENTS = Object.freeze({
  'ancient-greek': {x: 10.85, z: -21, rotationY: -Math.PI / 2},
  thales: {x: -10.85, z: -21, rotationY: Math.PI / 2},
  anaximander: {x: -7.5, z: -26.85, rotationY: 0},
  anaximenes: {x: -7.5, z: -15.15, rotationY: Math.PI},

  pythagoras: {x: 7.5, z: -12.85, rotationY: 0},
  philolaus: {x: -10.85, z: -8.8, rotationY: Math.PI / 2},
  democritus: {x: -10.85, z: -5.2, rotationY: Math.PI / 2},
  parmenides: {x: 10.85, z: -10.5, rotationY: -Math.PI / 2},
  'zeno-elea': {x: 10.85, z: -7, rotationY: -Math.PI / 2},
  heraclitus: {x: 10.85, z: -3.5, rotationY: -Math.PI / 2},
  leucippus: {x: -7.5, z: -12.85, rotationY: 0},
  empedocles: {x: 7.5, z: -1.15, rotationY: Math.PI},
  anaxagoras: {x: -7.5, z: -1.15, rotationY: Math.PI},

  protagoras: {x: -10.85, z: 7, rotationY: Math.PI / 2},
  prodicus: {x: -7.5, z: 1.15, rotationY: 0},
  'hippias-of-elis': {x: -7.5, z: 12.85, rotationY: Math.PI},
  gorgias: {x: 10.85, z: 7, rotationY: -Math.PI / 2},
  socrates: {x: 7.5, z: 12.85, rotationY: Math.PI},

  platonism: {x: -7.5, z: 15.15, rotationY: 0},
  plato: {x: -10.85, z: 21, rotationY: Math.PI / 2},
  aristotelianism: {x: -7.5, z: 26.85, rotationY: Math.PI},
  aristotle: {x: 10.85, z: 21, rotationY: -Math.PI / 2},
}) satisfies Readonly<Record<Gallery01PrimaryExhibitId, Gallery01Placement>>;

/** Room 01's north-east contextual installation, centred on its return wall. */
export const GALLERY_01_ORIENTATION_PLACEMENT = Object.freeze({
  center: {x: 7.5, z: -26.85},
  rotation: 0,
  size: {width: 5.8, depth: .55},
});

export const GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS = Object.freeze({
  'plato-republic': {
    position: {x: 7.5, z: 15.12},
    rotationY: 0,
    viewpoint: {x: 7.5, z: 18.28, yaw: 0, pitch: -.08},
  },
  'plato-cave-book-vii': {
    position: {x: 7.5, z: 26.88},
    rotationY: Math.PI,
    viewpoint: {x: 7.5, z: 23.72, yaw: Math.PI, pitch: -.08},
  },
});

export const GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS = Object.freeze({
  'greek-philosophy-reception': {
    position: {x: 7.5, z: -15.12},
    rotationY: Math.PI,
    viewpoint: {x: 7.5, z: -18.28, yaw: Math.PI, pitch: -.08},
  },
  'socrates-trial-death': {
    position: {x: 7.5, z: 1.12},
    rotationY: 0,
    viewpoint: {x: 7.5, z: 4.28, yaw: 0, pitch: -.08},
  },
});

/** Four-metre route plus a modest steering margin around the inlaid centerline. */
export const GALLERY_01_ROUTE_HALF_WIDTH = 2.25;
export const GALLERY_01_ROUTE_STEERING_MARGIN = .3;

/** Live end landings and the three internal centered thresholds. */
export const GALLERY_01_DOORWAY_CLEARANCES = Object.freeze([
  {id: 'N0', bounds: {minX: -3.2, maxX: 3.2, minZ: -28, maxZ: -23.8}},
  {id: 'room-01-02', bounds: {minX: -3.2, maxX: 3.2, minZ: -15.25, maxZ: -12.75}},
  {id: 'room-02-03', bounds: {minX: -3.2, maxX: 3.2, minZ: -1.25, maxZ: 1.25}},
  {id: 'room-03-04', bounds: {minX: -3.2, maxX: 3.2, minZ: 12.75, maxZ: 15.25}},
  {id: 'S0', bounds: {minX: -3.2, maxX: 3.2, minZ: 23.8, maxZ: 28}},
]);

export const GALLERY_01_ROOM_ANCHORS = Object.freeze({
  'med-orientation-nature': ['thales', 'ancient-greek'],
  'med-being-change-plurality': ['pythagoras', 'parmenides', 'democritus', 'heraclitus'],
  'med-sophists-socratic': ['protagoras', 'gorgias', 'socrates'],
  'med-plato-aristotle': ['plato', 'aristotle'],
}) satisfies Readonly<Record<Gallery01RoomId, readonly Gallery01PrimaryExhibitId[]>>;
