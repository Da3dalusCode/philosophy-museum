import type {
  MuseumBounds,
  MuseumCirculationPath,
  MuseumPoint,
  MuseumPose,
  MuseumSpatialConnection,
  MuseumWallDefinition,
} from './museumWorldTypes';

export const FEMINIST_PHILOSOPHIES_GALLERY_ID = 'feminist-philosophies' as const;

export const FEMINIST_PHILOSOPHIES_HALL_DIMENSIONS = Object.freeze({
  width: 28,
  depth: 28,
  ceilingHeight: 6.2,
  wallThickness: .36,
  crossHalfWidth: 4,
});

export type FeministPhilosophiesRoomId =
  | 'feminist-orientation-genealogies'
  | 'feminist-early-genealogies'
  | 'feminist-situated-freedom'
  | 'feminist-gender-norms';

export type FeministPhilosophiesPrimaryExhibitId =
  | 'feminist-philosophy'
  | 'beauvoir'
  | 'judith-butler';

export const FEMINIST_PHILOSOPHIES_ROOM_ORDER = [
  'feminist-orientation-genealogies',
  'feminist-early-genealogies',
  'feminist-situated-freedom',
  'feminist-gender-norms',
] as const satisfies readonly FeministPhilosophiesRoomId[];

export const FEMINIST_PHILOSOPHIES_ROOM_BOUNDS = Object.freeze({
  'feminist-orientation-genealogies': {minX: -14, maxX: 0, minZ: -14, maxZ: 0},
  'feminist-early-genealogies': {minX: 0, maxX: 14, minZ: -14, maxZ: 0},
  'feminist-situated-freedom': {minX: 0, maxX: 14, minZ: 0, maxZ: 14},
  'feminist-gender-norms': {minX: -14, maxX: 0, minZ: 0, maxZ: 14},
} as const satisfies Readonly<Record<FeministPhilosophiesRoomId, MuseumBounds>>);

export const FEMINIST_PHILOSOPHIES_SPATIAL_CONNECTIONS = [
  {id: 'threshold:feminist-orientation-genealogies:feminist-early-genealogies', fromCellId: 'feminist-orientation-genealogies', toCellId: 'feminist-early-genealogies', openingBounds: {minX: -.3, maxX: .3, minZ: -14, maxZ: 0}},
  {id: 'threshold:feminist-gender-norms:feminist-situated-freedom', fromCellId: 'feminist-gender-norms', toCellId: 'feminist-situated-freedom', openingBounds: {minX: -.3, maxX: .3, minZ: 0, maxZ: 14}},
  {id: 'threshold:feminist-orientation-genealogies:feminist-gender-norms', fromCellId: 'feminist-orientation-genealogies', toCellId: 'feminist-gender-norms', openingBounds: {minX: -14, maxX: 0, minZ: -.3, maxZ: .3}},
  {id: 'threshold:feminist-early-genealogies:feminist-situated-freedom', fromCellId: 'feminist-early-genealogies', toCellId: 'feminist-situated-freedom', openingBounds: {minX: 0, maxX: 14, minZ: -.3, maxZ: .3}},
] as const satisfies readonly MuseumSpatialConnection[];

const baffleId = (
  room: 'nw' | 'ne' | 'sw' | 'se',
  edge: 'vertical' | 'horizontal',
  prefix = FEMINIST_PHILOSOPHIES_GALLERY_ID,
): string => `${prefix}:fp-${room}-${edge}-baffle`;

export const feministPhilosophiesInteriorWalls = (
  prefix = FEMINIST_PHILOSOPHIES_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {ceilingHeight: height, wallThickness} = FEMINIST_PHILOSOPHIES_HALL_DIMENSIONS;
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

export type FeministPhilosophiesInstallationSlot = Readonly<{
  id: string;
  spatialCellId: FeministPhilosophiesRoomId;
  x: number;
  z: number;
  rotationY: number;
  backingWallId: string;
  supplementalViewpointDistance: number;
}>;

const outerWallId = (edge: 'north' | 'south' | 'west' | 'east'): string =>
  `${FEMINIST_PHILOSOPHIES_GALLERY_ID}:${edge}-wall`;

const slot = (
  id: string,
  spatialCellId: FeministPhilosophiesRoomId,
  x: number,
  z: number,
  rotationY: number,
  backingWallId: string,
  supplementalViewpointDistance = 2.92,
): FeministPhilosophiesInstallationSlot => ({
  id, spatialCellId, x, z, rotationY, backingWallId, supplementalViewpointDistance,
});

export const FEMINIST_PHILOSOPHIES_INSTALLATION_SLOTS = [
  slot('feminist-orientation-genealogies:north-outer', 'feminist-orientation-genealogies', -9, -12.8, 0, outerWallId('north')),
  slot('feminist-orientation-genealogies:west-outer', 'feminist-orientation-genealogies', -12.8, -9, Math.PI / 2, outerWallId('west')),
  slot('feminist-orientation-genealogies:east-room-face', 'feminist-orientation-genealogies', -5.2, -11, -Math.PI / 2, baffleId('nw', 'vertical'), 2.1),
  slot('feminist-orientation-genealogies:east-cross-face', 'feminist-orientation-genealogies', -3, -11, Math.PI / 2, baffleId('nw', 'vertical'), 2.5),
  slot('feminist-orientation-genealogies:south-room-face', 'feminist-orientation-genealogies', -11, -5.2, Math.PI, baffleId('nw', 'horizontal'), 2.1),
  slot('feminist-orientation-genealogies:south-cross-face', 'feminist-orientation-genealogies', -11, -3, 0, baffleId('nw', 'horizontal'), 2.5),

  slot('feminist-early-genealogies:north-outer', 'feminist-early-genealogies', 9, -12.8, 0, outerWallId('north')),
  slot('feminist-early-genealogies:east-outer', 'feminist-early-genealogies', 12.8, -9, -Math.PI / 2, outerWallId('east')),
  slot('feminist-early-genealogies:west-room-face', 'feminist-early-genealogies', 5.2, -11, Math.PI / 2, baffleId('ne', 'vertical'), 2.1),
  slot('feminist-early-genealogies:west-cross-face', 'feminist-early-genealogies', 3, -11, -Math.PI / 2, baffleId('ne', 'vertical'), 2.5),
  slot('feminist-early-genealogies:south-room-face', 'feminist-early-genealogies', 11, -5.2, Math.PI, baffleId('ne', 'horizontal'), 2.1),
  slot('feminist-early-genealogies:south-cross-face', 'feminist-early-genealogies', 11, -3, 0, baffleId('ne', 'horizontal'), 2.5),

  slot('feminist-situated-freedom:east-outer', 'feminist-situated-freedom', 12.8, 9, -Math.PI / 2, outerWallId('east')),
  slot('feminist-situated-freedom:south-outer', 'feminist-situated-freedom', 9, 12.8, Math.PI, outerWallId('south')),
  slot('feminist-situated-freedom:west-room-face', 'feminist-situated-freedom', 5.2, 11, Math.PI / 2, baffleId('se', 'vertical'), 2.1),
  slot('feminist-situated-freedom:west-cross-face', 'feminist-situated-freedom', 3, 11, -Math.PI / 2, baffleId('se', 'vertical'), 2.5),
  slot('feminist-situated-freedom:north-room-face', 'feminist-situated-freedom', 11, 5.2, 0, baffleId('se', 'horizontal'), 2.1),
  slot('feminist-situated-freedom:north-cross-face', 'feminist-situated-freedom', 11, 3, Math.PI, baffleId('se', 'horizontal'), 2.5),

  slot('feminist-gender-norms:west-outer', 'feminist-gender-norms', -12.8, 9, Math.PI / 2, outerWallId('west')),
  slot('feminist-gender-norms:south-outer', 'feminist-gender-norms', -9, 12.8, Math.PI, outerWallId('south')),
  slot('feminist-gender-norms:east-room-face', 'feminist-gender-norms', -5.2, 11, -Math.PI / 2, baffleId('sw', 'vertical'), 2.1),
  slot('feminist-gender-norms:east-cross-face', 'feminist-gender-norms', -3, 11, Math.PI / 2, baffleId('sw', 'vertical'), 2.5),
  slot('feminist-gender-norms:north-room-face', 'feminist-gender-norms', -11, 5.2, 0, baffleId('sw', 'horizontal'), 2.1),
  slot('feminist-gender-norms:north-cross-face', 'feminist-gender-norms', -11, 3, Math.PI, baffleId('sw', 'horizontal'), 2.5),
] as const satisfies readonly FeministPhilosophiesInstallationSlot[];

const slotById = new Map(FEMINIST_PHILOSOPHIES_INSTALLATION_SLOTS.map((item) => [item.id, item]));

export const getFeministPhilosophiesInstallationSlot = (
  slotId: string,
): FeministPhilosophiesInstallationSlot => {
  const result = slotById.get(slotId);
  if (!result) throw new Error(`Gallery 25 installation slot ${slotId} does not exist.`);
  return result;
};

const fullScalePlacement = (slotId: string) => {
  const authoredSlot = getFeministPhilosophiesInstallationSlot(slotId);
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

export const FEMINIST_PHILOSOPHIES_PRIMARY_PLACEMENTS = {
  'feminist-philosophy': fullScalePlacement('feminist-orientation-genealogies:north-outer'),
  beauvoir: fullScalePlacement('feminist-situated-freedom:east-outer'),
  'judith-butler': fullScalePlacement('feminist-gender-norms:west-outer'),
} as const satisfies Readonly<Record<FeministPhilosophiesPrimaryExhibitId, {
  x: number; z: number; rotationY: number; slotId: string; backingWallId: string;
  viewpointDistance: number; scale: 'full';
}>>;

export const FEMINIST_PHILOSOPHIES_PRIMARY_SCALE_FLOOR = Object.freeze({
  bayWidth: 4.6,
  objectWidth: 3.8,
  objectHeight: 3.55,
  footprintHeight: 3.71,
});

export const FEMINIST_PHILOSOPHIES_ROOM_SIGN_COPY = {
  'feminist-orientation-genealogies': {
    kicker: 'Room 01 · Plural genealogies and methods',
    title: 'Who Counts as a Knower and a Political Subject?',
    subtitle: 'Black feminism, intersectionality, standpoint, care, and labor prevent one universal “woman” from closing the field.',
  },
  'feminist-early-genealogies': {
    kicker: 'Room 02 · Education, marriage, virtue, and citizenship',
    title: 'Reason Against Manufactured Dependence',
    subtitle: 'Astell, Wollstonecraft, de Gouges, abolition, and women’s intellectual publics expose exclusions inside universal reason.',
  },
  'feminist-situated-freedom': {
    kicker: 'Room 03 · Embodiment, otherness, labor, and colonial violence',
    title: 'Freedom Is Lived in a Situation',
    subtitle: 'Beauvoir asks how bodies become socially meaningful without turning history into destiny or freedom into abstraction.',
  },
  'feminist-gender-norms': {
    kicker: 'Room 04 · Performativity, livability, dependency, and assembly',
    title: 'Norms Are Repeated—and Can Be Contested',
    subtitle: 'Butler’s route moves from gendered recognition to queer and trans life, disability, precarity, and public coalition.',
  },
} as const satisfies Readonly<Record<FeministPhilosophiesRoomId, {
  title: string; kicker: string; subtitle: string;
}>>;

export const FEMINIST_PHILOSOPHIES_ROOM_ENTRY_POSES = Object.freeze({
  'feminist-orientation-genealogies': {x: -8.2, z: -8.2, yaw: .408, pitch: -.02},
  'feminist-early-genealogies': {x: 8.2, z: -8.2, yaw: -.408, pitch: -.02},
  'feminist-situated-freedom': {x: 8.2, z: 8.2, yaw: -1.979, pitch: -.02},
  'feminist-gender-norms': {x: -8.2, z: 8.2, yaw: 1.979, pitch: -.02},
} as const satisfies Readonly<Record<FeministPhilosophiesRoomId, MuseumPose>>);

export const FEMINIST_PHILOSOPHIES_PRIMARY_CIRCULATION = Object.freeze({
  id: `${FEMINIST_PHILOSOPHIES_GALLERY_ID}:primary-circulation`,
  points: [
    {x: 0, z: -12}, {x: 0, z: 0}, {x: -12, z: 0},
    {x: 0, z: 0}, {x: 12, z: 0}, {x: 0, z: 0}, {x: 0, z: 12},
  ],
  clearanceRadius: 1.25,
} as const satisfies MuseumCirculationPath);

export const FEMINIST_PHILOSOPHIES_PHYSICAL_INSTALL_COUNT = 24 as const;
export const FEMINIST_PHILOSOPHIES_INSTALLS_PER_ROOM = 6 as const;

const assertCuration: (condition: unknown, message: string) => asserts condition = (
  condition, message,
) => {
  if (!condition) throw new Error(`Gallery 25 curation contract: ${message}`);
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

export const validateFeministPhilosophiesGalleryCuration = () => {
  assertCuration(Object.keys(FEMINIST_PHILOSOPHIES_ROOM_BOUNDS).length === 4, 'the crossroads must have four rooms.');
  assertCuration(FEMINIST_PHILOSOPHIES_SPATIAL_CONNECTIONS.length === 4, 'all four room seams must stay open.');
  assertCuration(FEMINIST_PHILOSOPHIES_INSTALLATION_SLOTS.length === 24, 'the hall must have exactly 24 installations.');
  assertCuration(new Set(FEMINIST_PHILOSOPHIES_INSTALLATION_SLOTS.map(({id}) => id)).size === 24, 'slot IDs must be unique.');
  assertCuration(Object.keys(FEMINIST_PHILOSOPHIES_PRIMARY_PLACEMENTS).length === 3, 'all three primaries need authored placements.');
  for (const roomId of FEMINIST_PHILOSOPHIES_ROOM_ORDER) {
    const roomSlots = FEMINIST_PHILOSOPHIES_INSTALLATION_SLOTS.filter(({spatialCellId}) => spatialCellId === roomId);
    assertCuration(roomSlots.length === 6, `${roomId} must have six installations.`);
    const footprints = roomSlots.map(({x, z, rotationY}) => footprintFor({x, z}, rotationY, 2.55, 1.05));
    for (let first = 0; first < footprints.length; first += 1) {
      for (let second = first + 1; second < footprints.length; second += 1) {
        assertCuration(!overlaps(footprints[first], footprints[second], .08), `${roomId} has overlapping installation footprints.`);
      }
    }
  }
  const backingWalls = new Set([
    ...feministPhilosophiesInteriorWalls().map(({id}) => id),
    ...(['north', 'south', 'west', 'east'] as const).map(outerWallId),
  ]);
  for (const authoredSlot of FEMINIST_PHILOSOPHIES_INSTALLATION_SLOTS) {
    assertCuration(backingWalls.has(authoredSlot.backingWallId), `${authoredSlot.id} has no backing wall.`);
    const room = FEMINIST_PHILOSOPHIES_ROOM_BOUNDS[authoredSlot.spatialCellId];
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
    installationCount: 24,
    primaryCount: 3,
    supplementalCount: 21,
  });
};

export const FEMINIST_PHILOSOPHIES_CURATION_VALIDATION =
  validateFeministPhilosophiesGalleryCuration();
