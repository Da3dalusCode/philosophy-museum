import type {
  MuseumBounds,
  MuseumCirculationPath,
  MuseumPoint,
  MuseumPose,
  MuseumSpatialConnection,
  MuseumWallDefinition,
} from './museumWorldTypes';

export const HELLENISTIC_ROMAN_GALLERY_ID = 'hellenistic-roman-ways' as const;

export const HELLENISTIC_ROMAN_HALL_DIMENSIONS = Object.freeze({
  width: 28,
  depth: 28,
  ceilingHeight: 6.2,
  wallThickness: .36,
  crossHalfWidth: 4,
});

export type HellenisticRomanRoomId =
  | 'hell-cynic-way'
  | 'hell-epicurean-garden'
  | 'hell-stoic-stoa'
  | 'hell-skeptical-lineages';

export type HellenisticRomanPrimaryExhibitId =
  | 'cynicism'
  | 'antisthenes'
  | 'diogenes'
  | 'epicureanism'
  | 'epicurus'
  | 'lucretius'
  | 'stoicism'
  | 'zeno'
  | 'cleanthes'
  | 'chrysippus'
  | 'epictetus'
  | 'seneca'
  | 'marcus-aurelius'
  | 'skepticism'
  | 'pyrrho'
  | 'arcesilaus'
  | 'carneades'
  | 'sextus-empiricus';

export const HELLENISTIC_ROMAN_ROOM_ORDER = [
  'hell-cynic-way',
  'hell-epicurean-garden',
  'hell-stoic-stoa',
  'hell-skeptical-lineages',
] as const satisfies readonly HellenisticRomanRoomId[];

export const HELLENISTIC_ROMAN_ROOM_BOUNDS = Object.freeze({
  'hell-cynic-way': {minX: -14, maxX: 0, minZ: -14, maxZ: 0},
  'hell-epicurean-garden': {minX: 0, maxX: 14, minZ: -14, maxZ: 0},
  'hell-stoic-stoa': {minX: -14, maxX: 0, minZ: 0, maxZ: 14},
  'hell-skeptical-lineages': {minX: 0, maxX: 14, minZ: 0, maxZ: 14},
} as const satisfies Readonly<Record<HellenisticRomanRoomId, MuseumBounds>>);

export const HELLENISTIC_ROMAN_SPATIAL_CONNECTIONS = [
  {id: 'threshold:hell-cynic-way:hell-epicurean-garden', fromCellId: 'hell-cynic-way', toCellId: 'hell-epicurean-garden', openingBounds: {minX: -.3, maxX: .3, minZ: -14, maxZ: 0}},
  {id: 'threshold:hell-stoic-stoa:hell-skeptical-lineages', fromCellId: 'hell-stoic-stoa', toCellId: 'hell-skeptical-lineages', openingBounds: {minX: -.3, maxX: .3, minZ: 0, maxZ: 14}},
  {id: 'threshold:hell-cynic-way:hell-stoic-stoa', fromCellId: 'hell-cynic-way', toCellId: 'hell-stoic-stoa', openingBounds: {minX: -14, maxX: 0, minZ: -.3, maxZ: .3}},
  {id: 'threshold:hell-epicurean-garden:hell-skeptical-lineages', fromCellId: 'hell-epicurean-garden', toCellId: 'hell-skeptical-lineages', openingBounds: {minX: 0, maxX: 14, minZ: -.3, maxZ: .3}},
] as const satisfies readonly MuseumSpatialConnection[];

const baffleId = (
  room: 'nw' | 'ne' | 'sw' | 'se',
  edge: 'vertical' | 'horizontal',
  prefix = HELLENISTIC_ROMAN_GALLERY_ID,
): string => `${prefix}:hrw-${room}-${edge}-baffle`;

export const hellenisticRomanInteriorWalls = (
  prefix = HELLENISTIC_ROMAN_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {ceilingHeight: height, wallThickness} = HELLENISTIC_ROMAN_HALL_DIMENSIONS;
  return [
    {id: baffleId('nw', 'vertical', prefix), center: {x: -4, z: -11}, size: {width: wallThickness, depth: 6}, rotation: 0, height},
    {id: baffleId('nw', 'horizontal', prefix), center: {x: -11, z: -4}, size: {width: 6, depth: wallThickness}, rotation: 0, height},
    {id: baffleId('ne', 'vertical', prefix), center: {x: 4, z: -11}, size: {width: wallThickness, depth: 6}, rotation: 0, height},
    {id: baffleId('ne', 'horizontal', prefix), center: {x: 11, z: -4}, size: {width: 6, depth: wallThickness}, rotation: 0, height},
    {id: baffleId('sw', 'vertical', prefix), center: {x: -4, z: 11}, size: {width: wallThickness, depth: 6}, rotation: 0, height},
    {id: baffleId('sw', 'horizontal', prefix), center: {x: -11, z: 4}, size: {width: 6, depth: wallThickness}, rotation: 0, height},
    {id: baffleId('se', 'vertical', prefix), center: {x: 4, z: 11}, size: {width: wallThickness, depth: 6}, rotation: 0, height},
    {id: baffleId('se', 'horizontal', prefix), center: {x: 11, z: 4}, size: {width: 6, depth: wallThickness}, rotation: 0, height},
  ];
};

export type HellenisticRomanInstallationSlot = Readonly<{
  id: string;
  spatialCellId: HellenisticRomanRoomId;
  x: number;
  z: number;
  rotationY: number;
  backingWallId: string;
  supplementalViewpointDistance: number;
}>;

const outerWallId = (edge: 'north' | 'south' | 'west' | 'east'): string =>
  `${HELLENISTIC_ROMAN_GALLERY_ID}:${edge}-wall`;

const slot = (
  id: string,
  spatialCellId: HellenisticRomanRoomId,
  x: number,
  z: number,
  rotationY: number,
  backingWallId: string,
  supplementalViewpointDistance = 2.92,
): HellenisticRomanInstallationSlot => ({
  id,
  spatialCellId,
  x,
  z,
  rotationY,
  backingWallId,
  supplementalViewpointDistance,
});

/**
 * Six backed faces complete the Cynic, Epicurean, and Skeptical rooms. The
 * Stoic room has a seventh outer-wall bay because its approved program has
 * seven primary assignments; no philosopher is demoted to make the room
 * artificially symmetrical.
 */
export const HELLENISTIC_ROMAN_INSTALLATION_SLOTS = [
  slot('hell-cynic-way:north-outer', 'hell-cynic-way', -9, -12.8, 0, outerWallId('north')),
  slot('hell-cynic-way:west-outer', 'hell-cynic-way', -12.8, -9, Math.PI / 2, outerWallId('west')),
  slot('hell-cynic-way:east-room-face', 'hell-cynic-way', -5.2, -11, -Math.PI / 2, baffleId('nw', 'vertical')),
  slot('hell-cynic-way:east-cross-face', 'hell-cynic-way', -3, -11, Math.PI / 2, baffleId('nw', 'vertical'), 2.5),
  slot('hell-cynic-way:south-room-face', 'hell-cynic-way', -11, -5.2, Math.PI, baffleId('nw', 'horizontal')),
  slot('hell-cynic-way:south-cross-face', 'hell-cynic-way', -11, -3, 0, baffleId('nw', 'horizontal'), 2.5),

  slot('hell-epicurean-garden:north-outer', 'hell-epicurean-garden', 9, -12.8, 0, outerWallId('north')),
  slot('hell-epicurean-garden:east-outer', 'hell-epicurean-garden', 12.8, -9, -Math.PI / 2, outerWallId('east')),
  slot('hell-epicurean-garden:west-room-face', 'hell-epicurean-garden', 5.2, -11, Math.PI / 2, baffleId('ne', 'vertical')),
  slot('hell-epicurean-garden:west-cross-face', 'hell-epicurean-garden', 3, -11, -Math.PI / 2, baffleId('ne', 'vertical'), 2.5),
  slot('hell-epicurean-garden:south-room-face', 'hell-epicurean-garden', 11, -5.2, Math.PI, baffleId('ne', 'horizontal')),
  slot('hell-epicurean-garden:south-cross-face', 'hell-epicurean-garden', 11, -3, 0, baffleId('ne', 'horizontal'), 2.5),

  slot('hell-stoic-stoa:west-outer-north', 'hell-stoic-stoa', -12.8, 7.25, Math.PI / 2, outerWallId('west')),
  slot('hell-stoic-stoa:west-outer-south', 'hell-stoic-stoa', -12.8, 11.55, Math.PI / 2, outerWallId('west')),
  slot('hell-stoic-stoa:south-outer', 'hell-stoic-stoa', -8.8, 12.8, Math.PI, outerWallId('south')),
  slot('hell-stoic-stoa:east-room-face', 'hell-stoic-stoa', -5.2, 11, -Math.PI / 2, baffleId('sw', 'vertical')),
  slot('hell-stoic-stoa:east-cross-face', 'hell-stoic-stoa', -3, 11, Math.PI / 2, baffleId('sw', 'vertical'), 2.5),
  slot('hell-stoic-stoa:north-room-face', 'hell-stoic-stoa', -9.9, 5.2, 0, baffleId('sw', 'horizontal')),
  slot('hell-stoic-stoa:north-cross-face', 'hell-stoic-stoa', -11, 3, Math.PI, baffleId('sw', 'horizontal'), 2.5),

  slot('hell-skeptical-lineages:east-outer', 'hell-skeptical-lineages', 12.8, 9, -Math.PI / 2, outerWallId('east')),
  slot('hell-skeptical-lineages:south-outer', 'hell-skeptical-lineages', 9, 12.8, Math.PI, outerWallId('south')),
  slot('hell-skeptical-lineages:west-room-face', 'hell-skeptical-lineages', 5.2, 11, Math.PI / 2, baffleId('se', 'vertical')),
  slot('hell-skeptical-lineages:west-cross-face', 'hell-skeptical-lineages', 3, 11, -Math.PI / 2, baffleId('se', 'vertical'), 2.5),
  slot('hell-skeptical-lineages:north-room-face', 'hell-skeptical-lineages', 11, 5.2, 0, baffleId('se', 'horizontal')),
  slot('hell-skeptical-lineages:north-cross-face', 'hell-skeptical-lineages', 11, 3, Math.PI, baffleId('se', 'horizontal'), 2.5),
] as const satisfies readonly HellenisticRomanInstallationSlot[];

const installationSlotById = new Map(
  HELLENISTIC_ROMAN_INSTALLATION_SLOTS.map((item) => [item.id, item]),
);

export const getHellenisticRomanInstallationSlot = (
  slotId: string,
): HellenisticRomanInstallationSlot => {
  const result = installationSlotById.get(slotId);
  if (!result) throw new Error(`Gallery 14 installation slot ${slotId} does not exist.`);
  return result;
};

const fullScalePlacement = (slotId: string) => {
  const authoredSlot = getHellenisticRomanInstallationSlot(slotId);
  return {
    x: authoredSlot.x,
    z: authoredSlot.z,
    rotationY: authoredSlot.rotationY,
    slotId: authoredSlot.id,
    backingWallId: authoredSlot.backingWallId,
    viewpointDistance: authoredSlot.supplementalViewpointDistance,
    scale: 'full' as const,
  };
};

export const HELLENISTIC_ROMAN_PRIMARY_PLACEMENTS = {
  cynicism: fullScalePlacement('hell-cynic-way:north-outer'),
  antisthenes: fullScalePlacement('hell-cynic-way:west-outer'),
  diogenes: fullScalePlacement('hell-cynic-way:east-room-face'),
  epicureanism: fullScalePlacement('hell-epicurean-garden:north-outer'),
  epicurus: fullScalePlacement('hell-epicurean-garden:east-outer'),
  lucretius: fullScalePlacement('hell-epicurean-garden:west-room-face'),
  stoicism: fullScalePlacement('hell-stoic-stoa:west-outer-south'),
  zeno: fullScalePlacement('hell-stoic-stoa:south-outer'),
  cleanthes: fullScalePlacement('hell-stoic-stoa:east-room-face'),
  chrysippus: fullScalePlacement('hell-stoic-stoa:north-room-face'),
  epictetus: fullScalePlacement('hell-stoic-stoa:east-cross-face'),
  seneca: fullScalePlacement('hell-stoic-stoa:north-cross-face'),
  'marcus-aurelius': fullScalePlacement('hell-stoic-stoa:west-outer-north'),
  skepticism: fullScalePlacement('hell-skeptical-lineages:east-outer'),
  pyrrho: fullScalePlacement('hell-skeptical-lineages:south-outer'),
  arcesilaus: fullScalePlacement('hell-skeptical-lineages:west-room-face'),
  carneades: fullScalePlacement('hell-skeptical-lineages:north-room-face'),
  'sextus-empiricus': fullScalePlacement('hell-skeptical-lineages:west-cross-face'),
} as const satisfies Readonly<Record<HellenisticRomanPrimaryExhibitId, {
  x: number;
  z: number;
  rotationY: number;
  slotId: string;
  backingWallId: string;
  viewpointDistance: number;
  scale: 'full';
}>>;

export const HELLENISTIC_ROMAN_PRIMARY_SCALE_FLOOR = Object.freeze({
  bayWidth: 4.6,
  objectWidth: 3.8,
  objectHeight: 3.55,
  footprintHeight: 3.71,
});

export const HELLENISTIC_ROMAN_ROOM_SIGN_COPY = {
  'hell-cynic-way': {
    kicker: 'Room 01 · Freedom performed in public',
    title: 'The Cynic Challenge',
    subtitle: 'Socratic virtue becomes exposure, self-sufficiency, frank speech, and a disputed lineage.',
  },
  'hell-epicurean-garden': {
    kicker: 'Room 02 · Friendship, nature, and measured desire',
    title: 'The Garden and Its Roman Afterlife',
    subtitle: 'Epicurus and Lucretius make atomism, friendship, and pleasure into practices against fear.',
  },
  'hell-stoic-stoa': {
    kicker: 'Room 03 · From system to daily exercise',
    title: 'The Early System and the Roman Stoa',
    subtitle: 'Logic, nature, assent, emotion, duty, and cosmopolitan belonging connect seven full primaries.',
  },
  'hell-skeptical-lineages': {
    kicker: 'Room 04 · Academic and Pyrrhonian strategies',
    title: 'Rival Skeptical Lineages',
    subtitle: 'Opposed arguments, persuasive appearances, and suspension test certainty without one founder myth.',
  },
} as const satisfies Readonly<Record<HellenisticRomanRoomId, {
  title: string;
  kicker: string;
  subtitle: string;
}>>;

export const HELLENISTIC_ROMAN_ROOM_ENTRY_POSES = Object.freeze({
  'hell-cynic-way': {x: -8.2, z: -8.2, yaw: .408, pitch: -.02},
  'hell-epicurean-garden': {x: 8.2, z: -8.2, yaw: -.408, pitch: -.02},
  'hell-stoic-stoa': {x: -8.2, z: 8.2, yaw: 1.979, pitch: -.02},
  'hell-skeptical-lineages': {x: 8.2, z: 8.2, yaw: -1.979, pitch: -.02},
} as const satisfies Readonly<Record<HellenisticRomanRoomId, MuseumPose>>);

export const HELLENISTIC_ROMAN_PRIMARY_CIRCULATION = Object.freeze({
  id: `${HELLENISTIC_ROMAN_GALLERY_ID}:primary-circulation`,
  points: [
    {x: 0, z: -12},
    {x: 0, z: 0},
    {x: -12, z: 0},
    {x: 0, z: 0},
    {x: 12, z: 0},
    {x: 0, z: 0},
    {x: 0, z: 12},
  ],
  clearanceRadius: 1.25,
} as const satisfies MuseumCirculationPath);

const assertCuration: (condition: unknown, message: string) => asserts condition = (
  condition,
  message,
) => {
  if (!condition) throw new Error(`Gallery 14 curation contract: ${message}`);
};

const footprintFor = (
  point: MuseumPoint,
  rotationY: number,
  width: number,
  depth: number,
): MuseumBounds => {
  const quarterTurn = Math.abs(Math.sin(rotationY)) > .5;
  const worldWidth = quarterTurn ? depth : width;
  const worldDepth = quarterTurn ? width : depth;
  return {
    minX: point.x - worldWidth / 2,
    maxX: point.x + worldWidth / 2,
    minZ: point.z - worldDepth / 2,
    maxZ: point.z + worldDepth / 2,
  };
};

const overlaps = (first: MuseumBounds, second: MuseumBounds, padding = 0): boolean =>
  first.minX < second.maxX + padding
  && first.maxX > second.minX - padding
  && first.minZ < second.maxZ + padding
  && first.maxZ > second.minZ - padding;

export const validateHellenisticRomanGalleryCuration = () => {
  assertCuration(Object.keys(HELLENISTIC_ROMAN_ROOM_BOUNDS).length === 4, 'the crossroads must have four rooms.');
  assertCuration(HELLENISTIC_ROMAN_SPATIAL_CONNECTIONS.length === 4, 'all four room seams must stay open.');
  assertCuration(HELLENISTIC_ROMAN_INSTALLATION_SLOTS.length === 25, 'the hall must have exactly 25 installations.');
  assertCuration(new Set(HELLENISTIC_ROMAN_INSTALLATION_SLOTS.map(({id}) => id)).size === 25, 'slot IDs must be unique.');
  assertCuration(Object.keys(HELLENISTIC_ROMAN_PRIMARY_PLACEMENTS).length === 18, 'all 18 canonical primaries need authored placements.');

  const expectedRoomCounts: Readonly<Record<HellenisticRomanRoomId, number>> = {
    'hell-cynic-way': 6,
    'hell-epicurean-garden': 6,
    'hell-stoic-stoa': 7,
    'hell-skeptical-lineages': 6,
  };
  for (const roomId of HELLENISTIC_ROMAN_ROOM_ORDER) {
    const roomSlots = HELLENISTIC_ROMAN_INSTALLATION_SLOTS.filter(
      ({spatialCellId}) => spatialCellId === roomId,
    );
    assertCuration(roomSlots.length === expectedRoomCounts[roomId], `${roomId} has an incorrect slot count.`);
    const footprints = roomSlots.map(({x, z, rotationY}) => footprintFor({x, z}, rotationY, 2.55, 1.05));
    for (let first = 0; first < footprints.length; first += 1) {
      for (let second = first + 1; second < footprints.length; second += 1) {
        assertCuration(!overlaps(footprints[first], footprints[second], .08), `${roomId} has overlapping installation footprints.`);
      }
    }
  }

  const backingWalls = new Set([
    ...hellenisticRomanInteriorWalls().map(({id}) => id),
    ...(['north', 'south', 'west', 'east'] as const).map(outerWallId),
  ]);
  for (const authoredSlot of HELLENISTIC_ROMAN_INSTALLATION_SLOTS) {
    assertCuration(backingWalls.has(authoredSlot.backingWallId), `${authoredSlot.id} has no backing wall.`);
    const room = HELLENISTIC_ROMAN_ROOM_BOUNDS[authoredSlot.spatialCellId];
    assertCuration(
      authoredSlot.x >= room.minX && authoredSlot.x <= room.maxX
      && authoredSlot.z >= room.minZ && authoredSlot.z <= room.maxZ,
      `${authoredSlot.id} is outside its room.`,
    );
  }
  return Object.freeze({
    roomCount: 4,
    connectionCount: 4,
    interiorWallCount: 8,
    installationCount: 25,
    primaryCount: 18,
    supplementalCount: 7,
  });
};

export const HELLENISTIC_ROMAN_CURATION_VALIDATION =
  validateHellenisticRomanGalleryCuration();
