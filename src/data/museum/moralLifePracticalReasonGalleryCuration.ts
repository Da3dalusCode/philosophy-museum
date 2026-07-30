import type {
  MuseumBounds,
  MuseumCirculationPath,
  MuseumPoint,
  MuseumPose,
  MuseumSpatialConnection,
  MuseumWallDefinition,
} from './museumWorldTypes';

export const MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID = 'moral-life-practical-reason' as const;

export const MORAL_LIFE_PRACTICAL_REASON_HALL_DIMENSIONS = Object.freeze({
  width: 28,
  depth: 28,
  ceilingHeight: 6.2,
  wallThickness: .36,
  crossHalfWidth: 4,
});

export type MoralLifePracticalReasonRoomId =
  | 'moral-ethics-orientation'
  | 'moral-character-virtue'
  | 'moral-duty-consequence'
  | 'moral-rights-persons-futures';

export type MoralLifePracticalReasonPrimaryExhibitId =
  | 'ethics'
  | 'virtue-ethics'
  | 'iris-murdoch'
  | 'philippa-foot'
  | 'deontology'
  | 'utilitarianism'
  | 'judith-thomson'
  | 'derek-parfit';

export const MORAL_LIFE_PRACTICAL_REASON_ROOM_ORDER = [
  'moral-ethics-orientation',
  'moral-character-virtue',
  'moral-duty-consequence',
  'moral-rights-persons-futures',
] as const satisfies readonly MoralLifePracticalReasonRoomId[];

export const MORAL_LIFE_PRACTICAL_REASON_ROOM_BOUNDS = Object.freeze({
  'moral-ethics-orientation': {minX: -14, maxX: 0, minZ: -14, maxZ: 0},
  'moral-character-virtue': {minX: 0, maxX: 14, minZ: -14, maxZ: 0},
  'moral-duty-consequence': {minX: 0, maxX: 14, minZ: 0, maxZ: 14},
  'moral-rights-persons-futures': {minX: -14, maxX: 0, minZ: 0, maxZ: 14},
} as const satisfies Readonly<Record<MoralLifePracticalReasonRoomId, MuseumBounds>>);

export const MORAL_LIFE_PRACTICAL_REASON_SPATIAL_CONNECTIONS = [
  {
    id: 'threshold:moral-ethics-orientation:moral-character-virtue',
    fromCellId: 'moral-ethics-orientation',
    toCellId: 'moral-character-virtue',
    openingBounds: {minX: -.3, maxX: .3, minZ: -14, maxZ: 0},
  },
  {
    id: 'threshold:moral-rights-persons-futures:moral-duty-consequence',
    fromCellId: 'moral-rights-persons-futures',
    toCellId: 'moral-duty-consequence',
    openingBounds: {minX: -.3, maxX: .3, minZ: 0, maxZ: 14},
  },
  {
    id: 'threshold:moral-ethics-orientation:moral-rights-persons-futures',
    fromCellId: 'moral-ethics-orientation',
    toCellId: 'moral-rights-persons-futures',
    openingBounds: {minX: -14, maxX: 0, minZ: -.3, maxZ: .3},
  },
  {
    id: 'threshold:moral-character-virtue:moral-duty-consequence',
    fromCellId: 'moral-character-virtue',
    toCellId: 'moral-duty-consequence',
    openingBounds: {minX: 0, maxX: 14, minZ: -.3, maxZ: .3},
  },
] as const satisfies readonly MuseumSpatialConnection[];

const baffleId = (
  room: 'nw' | 'ne' | 'sw' | 'se',
  edge: 'vertical' | 'horizontal',
  prefix = MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID,
): string => `${prefix}:mlpr-${room}-${edge}-baffle`;

export const moralLifePracticalReasonInteriorWalls = (
  prefix = MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {ceilingHeight: height, wallThickness} = MORAL_LIFE_PRACTICAL_REASON_HALL_DIMENSIONS;
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

export type MoralLifePracticalReasonInstallationSlot = Readonly<{
  id: string;
  spatialCellId: MoralLifePracticalReasonRoomId;
  x: number;
  z: number;
  rotationY: number;
  backingWallId: string;
  supplementalViewpointDistance: number;
}>;

const outerWallId = (edge: 'north' | 'south' | 'west' | 'east'): string =>
  `${MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID}:${edge}-wall`;

const slot = (
  id: string,
  spatialCellId: MoralLifePracticalReasonRoomId,
  x: number,
  z: number,
  rotationY: number,
  backingWallId: string,
  supplementalViewpointDistance = 2.92,
): MoralLifePracticalReasonInstallationSlot => ({
  id,
  spatialCellId,
  x,
  z,
  rotationY,
  backingWallId,
  supplementalViewpointDistance,
});

/**
 * Every quadrant has six wall-backed installations. The two pairs of
 * full-height L-baffles preserve four-metre throats into the open cross, so
 * the gallery reads as one moral forum rather than four sealed corridors.
 */
export const MORAL_LIFE_PRACTICAL_REASON_INSTALLATION_SLOTS = [
  slot('moral-ethics-orientation:north-outer', 'moral-ethics-orientation', -9, -12.8, 0, outerWallId('north')),
  slot('moral-ethics-orientation:west-outer', 'moral-ethics-orientation', -12.8, -9, Math.PI / 2, outerWallId('west')),
  slot('moral-ethics-orientation:east-room-face', 'moral-ethics-orientation', -5.2, -11, -Math.PI / 2, baffleId('nw', 'vertical')),
  slot('moral-ethics-orientation:east-cross-face', 'moral-ethics-orientation', -3, -11, Math.PI / 2, baffleId('nw', 'vertical'), 2.5),
  slot('moral-ethics-orientation:south-room-face', 'moral-ethics-orientation', -11, -5.2, Math.PI, baffleId('nw', 'horizontal')),
  slot('moral-ethics-orientation:south-cross-face', 'moral-ethics-orientation', -11, -3, 0, baffleId('nw', 'horizontal'), 2.5),

  slot('moral-character-virtue:north-outer', 'moral-character-virtue', 9, -12.8, 0, outerWallId('north')),
  slot('moral-character-virtue:east-outer', 'moral-character-virtue', 12.8, -9, -Math.PI / 2, outerWallId('east')),
  slot('moral-character-virtue:west-room-face', 'moral-character-virtue', 5.2, -11, Math.PI / 2, baffleId('ne', 'vertical')),
  slot('moral-character-virtue:west-cross-face', 'moral-character-virtue', 3, -11, -Math.PI / 2, baffleId('ne', 'vertical'), 2.5),
  slot('moral-character-virtue:south-room-face', 'moral-character-virtue', 11, -5.2, Math.PI, baffleId('ne', 'horizontal')),
  slot('moral-character-virtue:south-cross-face', 'moral-character-virtue', 11, -3, 0, baffleId('ne', 'horizontal'), 2.5),

  slot('moral-duty-consequence:east-outer', 'moral-duty-consequence', 12.8, 9, -Math.PI / 2, outerWallId('east')),
  slot('moral-duty-consequence:south-outer', 'moral-duty-consequence', 9, 12.8, Math.PI, outerWallId('south')),
  slot('moral-duty-consequence:west-room-face', 'moral-duty-consequence', 5.2, 11, Math.PI / 2, baffleId('se', 'vertical')),
  slot('moral-duty-consequence:west-cross-face', 'moral-duty-consequence', 3, 11, -Math.PI / 2, baffleId('se', 'vertical'), 2.5),
  slot('moral-duty-consequence:north-room-face', 'moral-duty-consequence', 11, 5.2, 0, baffleId('se', 'horizontal')),
  slot('moral-duty-consequence:north-cross-face', 'moral-duty-consequence', 11, 3, Math.PI, baffleId('se', 'horizontal'), 2.5),

  slot('moral-rights-persons-futures:west-outer', 'moral-rights-persons-futures', -12.8, 9, Math.PI / 2, outerWallId('west')),
  slot('moral-rights-persons-futures:south-outer', 'moral-rights-persons-futures', -9, 12.8, Math.PI, outerWallId('south')),
  slot('moral-rights-persons-futures:east-room-face', 'moral-rights-persons-futures', -5.2, 11, -Math.PI / 2, baffleId('sw', 'vertical')),
  slot('moral-rights-persons-futures:east-cross-face', 'moral-rights-persons-futures', -3, 11, Math.PI / 2, baffleId('sw', 'vertical'), 2.5),
  slot('moral-rights-persons-futures:north-room-face', 'moral-rights-persons-futures', -11, 5.2, 0, baffleId('sw', 'horizontal')),
  slot('moral-rights-persons-futures:north-cross-face', 'moral-rights-persons-futures', -11, 3, Math.PI, baffleId('sw', 'horizontal'), 2.5),
] as const satisfies readonly MoralLifePracticalReasonInstallationSlot[];

const installationSlotById = new Map(
  MORAL_LIFE_PRACTICAL_REASON_INSTALLATION_SLOTS.map((item) => [item.id, item]),
);

export const getMoralLifePracticalReasonInstallationSlot = (
  slotId: string,
): MoralLifePracticalReasonInstallationSlot => {
  const result = installationSlotById.get(slotId);
  if (!result) throw new Error(`Gallery 24 installation slot ${slotId} does not exist.`);
  return result;
};

const fullScalePlacement = (slotId: string) => {
  const authoredSlot = getMoralLifePracticalReasonInstallationSlot(slotId);
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

export const MORAL_LIFE_PRACTICAL_REASON_PRIMARY_PLACEMENTS = {
  ethics: fullScalePlacement('moral-ethics-orientation:north-outer'),
  'virtue-ethics': fullScalePlacement('moral-character-virtue:north-outer'),
  'iris-murdoch': fullScalePlacement('moral-character-virtue:east-outer'),
  'philippa-foot': fullScalePlacement('moral-character-virtue:west-room-face'),
  deontology: fullScalePlacement('moral-duty-consequence:east-outer'),
  utilitarianism: fullScalePlacement('moral-duty-consequence:south-outer'),
  'judith-thomson': fullScalePlacement('moral-rights-persons-futures:west-outer'),
  'derek-parfit': fullScalePlacement('moral-rights-persons-futures:south-outer'),
} as const satisfies Readonly<Record<MoralLifePracticalReasonPrimaryExhibitId, {
  x: number;
  z: number;
  rotationY: number;
  slotId: string;
  backingWallId: string;
  viewpointDistance: number;
  scale: 'full';
}>>;

export const MORAL_LIFE_PRACTICAL_REASON_PRIMARY_SCALE_FLOOR = Object.freeze({
  bayWidth: 4.6,
  objectWidth: 3.8,
  objectHeight: 3.55,
  footprintHeight: 3.71,
});

export const MORAL_LIFE_PRACTICAL_REASON_ROOM_SIGN_COPY = {
  'moral-ethics-orientation': {
    kicker: 'Room 01 · Many starting points for moral inquiry',
    title: 'How Should a Life Be Lived?',
    subtitle: 'Practice, care, suffering, role, ritual, and social conditions widen ethics beyond one modern formula.',
  },
  'moral-character-virtue': {
    kicker: 'Room 02 · Character, attention, and natural goodness',
    title: 'Becoming the Sort of Person Who Can See',
    subtitle: 'Virtue is trained in action while Murdoch and Foot reopen attention, reason, and human life-form.',
  },
  'moral-duty-consequence': {
    kicker: 'Room 03 · Rival structures of practical reason',
    title: 'Duty, Consequence, and Public Choice',
    subtitle: 'Autonomy and universal obligation confront welfare, institutions, evidence, coercion, and distribution.',
  },
  'moral-rights-persons-futures': {
    kicker: 'Room 04 · Claims across bodies, selves, and generations',
    title: 'Rights, Persons, and Futures',
    subtitle: 'Thomson and Parfit test bodily authority, rescue, identity over time, and responsibility to people not yet born.',
  },
} as const satisfies Readonly<Record<MoralLifePracticalReasonRoomId, {
  title: string;
  kicker: string;
  subtitle: string;
}>>;

export const MORAL_LIFE_PRACTICAL_REASON_ROOM_ENTRY_POSES = Object.freeze({
  'moral-ethics-orientation': {x: -8.2, z: -8.2, yaw: .408, pitch: -.02},
  'moral-character-virtue': {x: 8.2, z: -8.2, yaw: -.408, pitch: -.02},
  'moral-duty-consequence': {x: 8.2, z: 8.2, yaw: -1.979, pitch: -.02},
  'moral-rights-persons-futures': {x: -8.2, z: 8.2, yaw: 1.979, pitch: -.02},
} as const satisfies Readonly<Record<MoralLifePracticalReasonRoomId, MuseumPose>>);

export const MORAL_LIFE_PRACTICAL_REASON_PRIMARY_CIRCULATION = Object.freeze({
  id: `${MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID}:primary-circulation`,
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

export const MORAL_LIFE_PRACTICAL_REASON_PHYSICAL_INSTALL_COUNT = 24 as const;
export const MORAL_LIFE_PRACTICAL_REASON_INSTALLS_PER_ROOM = 6 as const;

const assertCuration: (condition: unknown, message: string) => asserts condition = (
  condition,
  message,
) => {
  if (!condition) throw new Error(`Gallery 24 curation contract: ${message}`);
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

export const validateMoralLifePracticalReasonGalleryCuration = () => {
  assertCuration(Object.keys(MORAL_LIFE_PRACTICAL_REASON_ROOM_BOUNDS).length === 4, 'the crossroads must have four rooms.');
  assertCuration(MORAL_LIFE_PRACTICAL_REASON_SPATIAL_CONNECTIONS.length === 4, 'all four room seams must stay open.');
  assertCuration(
    MORAL_LIFE_PRACTICAL_REASON_INSTALLATION_SLOTS.length === MORAL_LIFE_PRACTICAL_REASON_PHYSICAL_INSTALL_COUNT,
    'the hall must have exactly 24 installations.',
  );
  assertCuration(
    new Set(MORAL_LIFE_PRACTICAL_REASON_INSTALLATION_SLOTS.map(({id}) => id)).size
      === MORAL_LIFE_PRACTICAL_REASON_PHYSICAL_INSTALL_COUNT,
    'slot IDs must be unique.',
  );
  assertCuration(
    Object.keys(MORAL_LIFE_PRACTICAL_REASON_PRIMARY_PLACEMENTS).length === 8,
    'all eight canonical primaries need authored placements.',
  );

  for (const roomId of MORAL_LIFE_PRACTICAL_REASON_ROOM_ORDER) {
    const roomSlots = MORAL_LIFE_PRACTICAL_REASON_INSTALLATION_SLOTS.filter(
      ({spatialCellId}) => spatialCellId === roomId,
    );
    assertCuration(
      roomSlots.length === MORAL_LIFE_PRACTICAL_REASON_INSTALLS_PER_ROOM,
      `${roomId} must have six installations.`,
    );
    const footprints = roomSlots.map(({x, z, rotationY}) =>
      footprintFor({x, z}, rotationY, 2.55, 1.05));
    for (let first = 0; first < footprints.length; first += 1) {
      for (let second = first + 1; second < footprints.length; second += 1) {
        assertCuration(
          !overlaps(footprints[first], footprints[second], .08),
          `${roomId} has overlapping installation footprints.`,
        );
      }
    }
  }

  const backingWalls = new Set([
    ...moralLifePracticalReasonInteriorWalls().map(({id}) => id),
    ...(['north', 'south', 'west', 'east'] as const).map(outerWallId),
  ]);
  for (const authoredSlot of MORAL_LIFE_PRACTICAL_REASON_INSTALLATION_SLOTS) {
    assertCuration(backingWalls.has(authoredSlot.backingWallId), `${authoredSlot.id} has no backing wall.`);
    const room = MORAL_LIFE_PRACTICAL_REASON_ROOM_BOUNDS[authoredSlot.spatialCellId];
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
    installationCount: MORAL_LIFE_PRACTICAL_REASON_PHYSICAL_INSTALL_COUNT,
    primaryCount: 8,
    supplementalCount: 16,
  });
};

export const MORAL_LIFE_PRACTICAL_REASON_CURATION_VALIDATION =
  validateMoralLifePracticalReasonGalleryCuration();
