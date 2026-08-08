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

export type Gallery01InstallationId = Gallery01PrimaryExhibitId
  | 'miletus-ionian-coast'
  | 'greek-philosophy-reception'
  | 'socrates-trial-death'
  | 'plato-republic'
  | 'plato-cave-book-vii';

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

/**
 * Gallery 01-only pilot for the standard transverse-wall composition.
 *
 * The protected route edge is 2.55 m from the hall centreline. Gallery 21's
 * completed sequence rooms leave .825 m between that edge and a standard
 * 4.35 m installation, so Gallery 01 uses the same physical-bounds clearance
 * while preserving every installation's size. The original authored lane was
 * x = +/-7.5 m. Keeping this policy hall-local makes the pilot reversible and
 * prevents it from silently changing another gallery.
 */
export const GALLERY_01_TRANSVERSE_PILOT = Object.freeze({
  baselineCenterX: 7.5,
  protectedRouteHalfWidth: 2.55,
  targetInnerEdgeGap: .825,
  centerXByInstallation: Object.freeze({
    thales: 4.925,
    anaximenes: 4.925,
    pythagoras: 4.925,
    'zeno-elea': 4.925,
    heraclitus: 4.925,
    leucippus: 4.925,
    prodicus: 5.3,
    'hippias-of-elis': 4.925,
    gorgias: 5.425,
    platonism: 5.425,
    aristotelianism: 5.425,
    'miletus-ionian-coast': 5.885,
    'greek-philosophy-reception': 5.885,
    'socrates-trial-death': 5.885,
    'plato-republic': 5.885,
    'plato-cave-book-vii': 5.885,
  }),
});

const transverseX = (
  id: keyof typeof GALLERY_01_TRANSVERSE_PILOT.centerXByInstallation,
  side: 'west' | 'east',
): number => GALLERY_01_TRANSVERSE_PILOT.centerXByInstallation[id] * (side === 'west' ? -1 : 1);

export const GALLERY_01_HALL_BOUNDS = Object.freeze({
  minX: -12,
  maxX: 12,
  minZ: -28,
  maxZ: 28,
}) satisfies Gallery01Bounds;

export const GALLERY_01_ROOM_BOUNDS = Object.freeze({
  'med-orientation-nature': {minX: -12, maxX: 12, minZ: 14, maxZ: 28},
  'med-being-change-plurality': {minX: -12, maxX: 12, minZ: 0, maxZ: 14},
  'med-sophists-socratic': {minX: -12, maxX: 12, minZ: -14, maxZ: 0},
  'med-plato-aristotle': {minX: -12, maxX: 12, minZ: -28, maxZ: -14},
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
 * Transverse installations use the Gallery 01 pilot's bounds-normalized inward
 * lane; overflow stays symmetric on the longer outer walls. This is the
 * Gallery 01 wall-slot contract, rather than a set of loose composition points.
 */
export const GALLERY_01_PRIMARY_PLACEMENTS = Object.freeze({
  // Room 01: a Milesian sequence on the west; place and reception on the east.
  'ancient-greek': {x: 10.85, z: 21, rotationY: -Math.PI / 2},
  thales: {x: transverseX('thales', 'west'), z: 26.85, rotationY: Math.PI},
  anaximander: {x: -10.85, z: 21, rotationY: Math.PI / 2},
  anaximenes: {x: transverseX('anaximenes', 'west'), z: 15.15, rotationY: 0},

  // Room 02: Pythagorean and Eleatic pairs to the west; change,
  // pluralist responses, and the Atomists progress along the east.
  pythagoras: {x: transverseX('pythagoras', 'west'), z: 12.85, rotationY: Math.PI},
  philolaus: {x: -10.85, z: 8.8, rotationY: Math.PI / 2},
  parmenides: {x: -10.85, z: 5.2, rotationY: Math.PI / 2},
  'zeno-elea': {x: transverseX('zeno-elea', 'west'), z: 1.15, rotationY: 0},
  heraclitus: {x: transverseX('heraclitus', 'east'), z: 12.85, rotationY: Math.PI},
  empedocles: {x: 10.85, z: 10.5, rotationY: -Math.PI / 2},
  anaxagoras: {x: 10.85, z: 7, rotationY: -Math.PI / 2},
  democritus: {x: 10.85, z: 3.5, rotationY: -Math.PI / 2},
  leucippus: {x: transverseX('leucippus', 'east'), z: 1.15, rotationY: 0},

  // Room 03: the Sophists frame Protagoras; Socrates leads to the trial.
  protagoras: {x: -10.85, z: -7, rotationY: Math.PI / 2},
  prodicus: {x: transverseX('prodicus', 'west'), z: -12.85, rotationY: 0},
  'hippias-of-elis': {x: transverseX('hippias-of-elis', 'west'), z: -1.15, rotationY: Math.PI},
  gorgias: {x: transverseX('gorgias', 'east'), z: -1.15, rotationY: Math.PI},
  socrates: {x: 10.85, z: -7, rotationY: -Math.PI / 2},

  // Room 04: Plato and Aristotle are the final anchors; their institutional
  // afterlives terminate the gallery and point toward the successor galleries.
  platonism: {x: transverseX('platonism', 'west'), z: -26.85, rotationY: 0},
  plato: {x: -10.85, z: -21, rotationY: Math.PI / 2},
  aristotelianism: {x: transverseX('aristotelianism', 'east'), z: -26.85, rotationY: 0},
  aristotle: {x: 10.85, z: -21, rotationY: -Math.PI / 2},
}) satisfies Readonly<Record<Gallery01PrimaryExhibitId, Gallery01Placement>>;

/** Freestanding orientation landmark in the Grand Entrance near Gallery 01. */
export const GALLERY_01_ENTRANCE_ORIENTATION_PLACEMENT = Object.freeze({
  center: {x: -13.2, z: 20.25},
  rotation: Math.PI / 2,
  size: {width: 5.8, depth: .62},
});

export const GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS = Object.freeze({
  'plato-republic': {
    position: {x: transverseX('plato-republic', 'east'), z: -15.12},
    rotationY: Math.PI,
    viewpoint: {x: transverseX('plato-republic', 'east'), z: -18.28, yaw: Math.PI, pitch: -.08},
  },
  'plato-cave-book-vii': {
    position: {x: transverseX('plato-cave-book-vii', 'west'), z: -15.12},
    rotationY: Math.PI,
    viewpoint: {x: transverseX('plato-cave-book-vii', 'west'), z: -18.28, yaw: Math.PI, pitch: -.08},
  },
});

export const GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS = Object.freeze({
  'miletus-ionian-coast': {
    position: {x: transverseX('miletus-ionian-coast', 'east'), z: 26.88},
    rotationY: Math.PI,
    viewpoint: {x: transverseX('miletus-ionian-coast', 'east'), z: 23.72, yaw: Math.PI, pitch: -.08},
  },
  'greek-philosophy-reception': {
    position: {x: transverseX('greek-philosophy-reception', 'east'), z: 15.12},
    rotationY: 0,
    viewpoint: {x: transverseX('greek-philosophy-reception', 'east'), z: 18.28, yaw: 0, pitch: -.08},
  },
  'socrates-trial-death': {
    position: {x: transverseX('socrates-trial-death', 'east'), z: -12.88},
    rotationY: 0,
    viewpoint: {x: transverseX('socrates-trial-death', 'east'), z: -9.72, yaw: 0, pitch: -.08},
  },
});

/**
 * The complete visitor-facing narrative on each side of the route, ordered
 * from the south entrance toward the north exit. This keeps wall geometry and
 * intellectual adjacency under one auditable contract.
 */
export const GALLERY_01_CURATORIAL_WALL_SEQUENCES = Object.freeze({
  'med-orientation-nature': {
    west: ['thales', 'anaximander', 'anaximenes'],
    east: ['miletus-ionian-coast', 'ancient-greek', 'greek-philosophy-reception'],
  },
  'med-being-change-plurality': {
    west: ['pythagoras', 'philolaus', 'parmenides', 'zeno-elea'],
    east: ['heraclitus', 'empedocles', 'anaxagoras', 'democritus', 'leucippus'],
  },
  'med-sophists-socratic': {
    west: ['hippias-of-elis', 'protagoras', 'prodicus'],
    east: ['gorgias', 'socrates', 'socrates-trial-death'],
  },
  'med-plato-aristotle': {
    west: ['plato-cave-book-vii', 'plato', 'platonism'],
    east: ['plato-republic', 'aristotle', 'aristotelianism'],
  },
}) satisfies Readonly<Record<Gallery01RoomId, Readonly<{
  west: readonly Gallery01InstallationId[];
  east: readonly Gallery01InstallationId[];
}>>>;

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
  'med-orientation-nature': ['thales', 'anaximander', 'ancient-greek'],
  'med-being-change-plurality': ['pythagoras', 'parmenides', 'democritus', 'heraclitus'],
  'med-sophists-socratic': ['protagoras', 'gorgias', 'socrates'],
  'med-plato-aristotle': ['plato', 'aristotle'],
}) satisfies Readonly<Record<Gallery01RoomId, readonly Gallery01PrimaryExhibitId[]>>;
