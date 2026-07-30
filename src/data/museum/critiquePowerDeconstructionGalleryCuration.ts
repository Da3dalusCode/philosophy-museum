import type {
  MuseumBounds,
  MuseumCirculationPath,
  MuseumPoint,
  MuseumPose,
  MuseumSpatialConnection,
  MuseumWallDefinition,
} from './museumWorldTypes';

export const CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID =
  'critique-power-deconstruction' as const;

export const CRITIQUE_POWER_DECONSTRUCTION_HALL_DIMENSIONS = Object.freeze({
  width: 28,
  depth: 28,
  ceilingHeight: 6.2,
  wallThickness: .36,
  crossHalfWidth: 4,
});

export type CritiquePowerDeconstructionRoomId =
  | 'continental-orientation'
  | 'critique-genealogy-power'
  | 'critique-deconstruction'
  | 'critique-critical-theory';

export type CritiquePowerDeconstructionPrimaryExhibitId =
  | 'continental-philosophy'
  | 'foucault'
  | 'derrida'
  | 'habermas';

export const CRITIQUE_POWER_DECONSTRUCTION_ROOM_ORDER = [
  'continental-orientation',
  'critique-genealogy-power',
  'critique-deconstruction',
  'critique-critical-theory',
] as const satisfies readonly CritiquePowerDeconstructionRoomId[];

/**
 * The quadrant bounds tile the whole shell. Full-height L-baffles, rather than
 * the cell seams, make four legible rooms around an unobstructed cardinal
 * crossing. This is the established open-cross model, not a sequence gallery.
 */
export const CRITIQUE_POWER_DECONSTRUCTION_ROOM_BOUNDS = Object.freeze({
  'continental-orientation': {minX: -14, maxX: 0, minZ: -14, maxZ: 0},
  'critique-genealogy-power': {minX: 0, maxX: 14, minZ: -14, maxZ: 0},
  'critique-deconstruction': {minX: 0, maxX: 14, minZ: 0, maxZ: 14},
  'critique-critical-theory': {minX: -14, maxX: 0, minZ: 0, maxZ: 14},
} as const satisfies Readonly<
  Record<CritiquePowerDeconstructionRoomId, MuseumBounds>
>);

/**
 * Every conceptual seam remains open for its complete length. Gallery 23 has
 * no threshold wall or lintel: visitors orient themselves at the central cross
 * and can enter any argument without accepting a false linear succession.
 */
export const CRITIQUE_POWER_DECONSTRUCTION_SPATIAL_CONNECTIONS = [
  {
    id: 'threshold:continental-orientation:critique-genealogy-power',
    fromCellId: 'continental-orientation',
    toCellId: 'critique-genealogy-power',
    openingBounds: {minX: -.3, maxX: .3, minZ: -14, maxZ: 0},
  },
  {
    id: 'threshold:critique-critical-theory:critique-deconstruction',
    fromCellId: 'critique-critical-theory',
    toCellId: 'critique-deconstruction',
    openingBounds: {minX: -.3, maxX: .3, minZ: 0, maxZ: 14},
  },
  {
    id: 'threshold:continental-orientation:critique-critical-theory',
    fromCellId: 'continental-orientation',
    toCellId: 'critique-critical-theory',
    openingBounds: {minX: -14, maxX: 0, minZ: -.3, maxZ: .3},
  },
  {
    id: 'threshold:critique-genealogy-power:critique-deconstruction',
    fromCellId: 'critique-genealogy-power',
    toCellId: 'critique-deconstruction',
    openingBounds: {minX: 0, maxX: 14, minZ: -.3, maxZ: .3},
  },
] as const satisfies readonly MuseumSpatialConnection[];

const baffleId = (
  room: 'nw' | 'ne' | 'sw' | 'se',
  edge: 'vertical' | 'horizontal',
  prefix = CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID,
): string => `${prefix}:cpd-${room}-${edge}-baffle`;

/**
 * Each six-metre baffle backs two installations, one facing the room and one
 * facing the cross. Its four-metre throat remains fully walkable. The eight
 * segments reach the ceiling so no accidental lintel or partial-height wall
 * can make a second, misleading spatial system.
 */
export const critiquePowerDeconstructionInteriorWalls = (
  prefix = CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {
    ceilingHeight: height,
    wallThickness,
  } = CRITIQUE_POWER_DECONSTRUCTION_HALL_DIMENSIONS;
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

export type CritiquePowerDeconstructionInstallationFace =
  | 'outer-primary'
  | 'room-return'
  | 'cross-return';

export type CritiquePowerDeconstructionInstallationSlot = Readonly<{
  id: string;
  spatialCellId: CritiquePowerDeconstructionRoomId;
  x: number;
  z: number;
  rotationY: number;
  backingWallId: string;
  face: CritiquePowerDeconstructionInstallationFace;
  supplementalViewpointDistance: number;
}>;

const outerWallId = (
  edge: 'north' | 'south' | 'west' | 'east',
): string => `${CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID}:${edge}-wall`;

const slot = (
  id: string,
  spatialCellId: CritiquePowerDeconstructionRoomId,
  x: number,
  z: number,
  rotationY: number,
  backingWallId: string,
  face: CritiquePowerDeconstructionInstallationFace,
): CritiquePowerDeconstructionInstallationSlot => ({
  id,
  spatialCellId,
  x,
  z,
  rotationY,
  backingWallId,
  face,
  supplementalViewpointDistance: face === 'cross-return' ? 2.5 : 2.92,
});

/**
 * Six unique backed faces per room are the complete physical contract. The one
 * canonical primary in each quadrant takes a perimeter face; five deep
 * supplementals consume the remainder.
 */
export const CRITIQUE_POWER_DECONSTRUCTION_INSTALLATION_SLOTS = [
  // Northwest · orientation and the disputed family label
  slot('continental-orientation:north-outer', 'continental-orientation', -9, -12.8, 0, outerWallId('north'), 'outer-primary'),
  slot('continental-orientation:west-outer', 'continental-orientation', -12.8, -9, Math.PI / 2, outerWallId('west'), 'outer-primary'),
  slot('continental-orientation:east-room-face', 'continental-orientation', -5.2, -11, -Math.PI / 2, baffleId('nw', 'vertical'), 'room-return'),
  slot('continental-orientation:east-cross-face', 'continental-orientation', -3, -11, Math.PI / 2, baffleId('nw', 'vertical'), 'cross-return'),
  slot('continental-orientation:south-room-face', 'continental-orientation', -11, -5.2, Math.PI, baffleId('nw', 'horizontal'), 'room-return'),
  slot('continental-orientation:south-cross-face', 'continental-orientation', -11, -3, 0, baffleId('nw', 'horizontal'), 'cross-return'),

  // Northeast · Foucault, genealogy, institutions, and power
  slot('critique-genealogy-power:north-outer', 'critique-genealogy-power', 9, -12.8, 0, outerWallId('north'), 'outer-primary'),
  slot('critique-genealogy-power:east-outer', 'critique-genealogy-power', 12.8, -9, -Math.PI / 2, outerWallId('east'), 'outer-primary'),
  slot('critique-genealogy-power:west-room-face', 'critique-genealogy-power', 5.2, -11, Math.PI / 2, baffleId('ne', 'vertical'), 'room-return'),
  slot('critique-genealogy-power:west-cross-face', 'critique-genealogy-power', 3, -11, -Math.PI / 2, baffleId('ne', 'vertical'), 'cross-return'),
  slot('critique-genealogy-power:south-room-face', 'critique-genealogy-power', 11, -5.2, Math.PI, baffleId('ne', 'horizontal'), 'room-return'),
  slot('critique-genealogy-power:south-cross-face', 'critique-genealogy-power', 11, -3, 0, baffleId('ne', 'horizontal'), 'cross-return'),

  // Southeast · Derrida, writing, difference, and deconstruction
  slot('critique-deconstruction:east-outer', 'critique-deconstruction', 12.8, 9, -Math.PI / 2, outerWallId('east'), 'outer-primary'),
  slot('critique-deconstruction:south-outer', 'critique-deconstruction', 9, 12.8, Math.PI, outerWallId('south'), 'outer-primary'),
  slot('critique-deconstruction:west-room-face', 'critique-deconstruction', 5.2, 11, Math.PI / 2, baffleId('se', 'vertical'), 'room-return'),
  slot('critique-deconstruction:west-cross-face', 'critique-deconstruction', 3, 11, -Math.PI / 2, baffleId('se', 'vertical'), 'cross-return'),
  slot('critique-deconstruction:north-room-face', 'critique-deconstruction', 11, 5.2, 0, baffleId('se', 'horizontal'), 'room-return'),
  slot('critique-deconstruction:north-cross-face', 'critique-deconstruction', 11, 3, Math.PI, baffleId('se', 'horizontal'), 'cross-return'),

  // Southwest · Critical Theory, publics, media, and deliberation
  slot('critique-critical-theory:west-outer', 'critique-critical-theory', -12.8, 9, Math.PI / 2, outerWallId('west'), 'outer-primary'),
  slot('critique-critical-theory:south-outer', 'critique-critical-theory', -9, 12.8, Math.PI, outerWallId('south'), 'outer-primary'),
  slot('critique-critical-theory:east-room-face', 'critique-critical-theory', -5.2, 11, -Math.PI / 2, baffleId('sw', 'vertical'), 'room-return'),
  slot('critique-critical-theory:east-cross-face', 'critique-critical-theory', -3, 11, Math.PI / 2, baffleId('sw', 'vertical'), 'cross-return'),
  slot('critique-critical-theory:north-room-face', 'critique-critical-theory', -11, 5.2, 0, baffleId('sw', 'horizontal'), 'room-return'),
  slot('critique-critical-theory:north-cross-face', 'critique-critical-theory', -11, 3, Math.PI, baffleId('sw', 'horizontal'), 'cross-return'),
] as const satisfies readonly CritiquePowerDeconstructionInstallationSlot[];

export const CRITIQUE_POWER_DECONSTRUCTION_PHYSICAL_INSTALL_COUNT = 24 as const;
export const CRITIQUE_POWER_DECONSTRUCTION_INSTALLS_PER_ROOM = 6 as const;

const installationSlotById = new Map(
  CRITIQUE_POWER_DECONSTRUCTION_INSTALLATION_SLOTS.map((item) => [item.id, item]),
);

export const getCritiquePowerDeconstructionInstallationSlot = (
  slotId: string,
): CritiquePowerDeconstructionInstallationSlot => {
  const result = installationSlotById.get(slotId);
  if (!result) throw new Error(`Gallery 23 installation slot ${slotId} does not exist.`);
  return result;
};

export type CritiquePowerDeconstructionPrimaryPlacement = Readonly<{
  x: number;
  z: number;
  rotationY: number;
  slotId: string;
  backingWallId: string;
  scale: 'full';
}>;

const fullScalePlacement = (
  slotId: string,
): CritiquePowerDeconstructionPrimaryPlacement => {
  const authoredSlot = getCritiquePowerDeconstructionInstallationSlot(slotId);
  return {
    x: authoredSlot.x,
    z: authoredSlot.z,
    rotationY: authoredSlot.rotationY,
    slotId: authoredSlot.id,
    backingWallId: authoredSlot.backingWallId,
    scale: 'full',
  };
};

export const CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_PLACEMENTS = {
  'continental-philosophy': fullScalePlacement('continental-orientation:north-outer'),
  foucault: fullScalePlacement('critique-genealogy-power:north-outer'),
  derrida: fullScalePlacement('critique-deconstruction:south-outer'),
  habermas: fullScalePlacement('critique-critical-theory:south-outer'),
} as const satisfies Readonly<
  Record<
    CritiquePowerDeconstructionPrimaryExhibitId,
    CritiquePowerDeconstructionPrimaryPlacement
  >
>;

export const CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_SCALE_FLOOR = Object.freeze({
  bayWidth: 4.6,
  objectWidth: 3.8,
  objectHeight: 3.55,
  footprintHeight: 3.71,
});

export const CRITIQUE_POWER_DECONSTRUCTION_ROOM_SIGN_COPY = {
  'continental-orientation': {
    kicker: 'Room 01 · A disputed family, not a doctrine',
    title: 'Orienting “Continental Philosophy”',
    subtitle: 'Begin with a retrospective label, then test how language, interpretation, institutions, history, and experience cut across it.',
  },
  'critique-genealogy-power': {
    kicker: 'Room 02 · Practices produce subjects and fields of truth',
    title: 'Foucault: Genealogy, Knowledge, and Power',
    subtitle: 'Follow visibility, examination, discipline, normalization, and archives without reducing power to one ruler or institution.',
  },
  'critique-deconstruction': {
    kicker: 'Room 03 · Reading the differences that make presence possible',
    title: 'Derrida: Writing and Deconstruction',
    subtitle: 'Trace colonial language, translation, iterability, supplement, and différance without turning deconstruction into demolition.',
  },
  'critique-critical-theory': {
    kicker: 'Room 04 · Domination, publicity, and unfinished reason',
    title: 'Critical Theory and Democratic Communication',
    subtitle: 'Set culture-industry critique beside Habermas’s accounts of public spheres, communicative reason, legitimacy, and exclusion.',
  },
} as const satisfies Readonly<Record<
  CritiquePowerDeconstructionRoomId,
  {title: string; kicker: string; subtitle: string}
>>;

export const CRITIQUE_POWER_DECONSTRUCTION_ROOM_ENTRY_POSES = Object.freeze({
  'continental-orientation': {x: -8.2, z: -8.2, yaw: .408, pitch: -.02},
  'critique-genealogy-power': {x: 8.2, z: -8.2, yaw: -.408, pitch: -.02},
  'critique-deconstruction': {x: 8.2, z: 8.2, yaw: -1.979, pitch: -.02},
  'critique-critical-theory': {x: -8.2, z: 8.2, yaw: 1.979, pitch: -.02},
} as const satisfies Readonly<Record<CritiquePowerDeconstructionRoomId, MuseumPose>>);

export const CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_CIRCULATION = Object.freeze({
  id: `${CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID}:primary-circulation`,
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

const overlaps = (
  first: MuseumBounds,
  second: MuseumBounds,
  padding = 0,
): boolean =>
  first.minX < second.maxX + padding
  && first.maxX > second.minX - padding
  && first.minZ < second.maxZ + padding
  && first.maxZ > second.minZ - padding;

const distanceFromPointToBounds = (
  point: MuseumPoint,
  bounds: MuseumBounds,
): number => {
  const nearestX = Math.max(bounds.minX, Math.min(bounds.maxX, point.x));
  const nearestZ = Math.max(bounds.minZ, Math.min(bounds.maxZ, point.z));
  return Math.hypot(point.x - nearestX, point.z - nearestZ);
};

const wallBounds = (wall: MuseumWallDefinition): MuseumBounds =>
  footprintFor(wall.center, wall.rotation, wall.size.width, wall.size.depth);

const outerBackingWalls = (): readonly MuseumWallDefinition[] => {
  const {
    wallThickness,
    ceilingHeight,
  } = CRITIQUE_POWER_DECONSTRUCTION_HALL_DIMENSIONS;
  return [
    {id: outerWallId('north'), center: {x: 0, z: -14}, size: {width: 28, depth: wallThickness}, rotation: 0, height: ceilingHeight},
    {id: outerWallId('south'), center: {x: 0, z: 14}, size: {width: 28, depth: wallThickness}, rotation: 0, height: ceilingHeight},
    {id: outerWallId('west'), center: {x: -14, z: 0}, size: {width: wallThickness, depth: 28}, rotation: 0, height: ceilingHeight},
    {id: outerWallId('east'), center: {x: 14, z: 0}, size: {width: wallThickness, depth: 28}, rotation: 0, height: ceilingHeight},
  ];
};

const assertCuration: (
  condition: unknown,
  message: string,
) => asserts condition = (condition, message) => {
  if (!condition) throw new Error(`Gallery 23 curation contract: ${message}`);
};

export type CritiquePowerDeconstructionCurationValidation = Readonly<{
  roomCount: number;
  connectionCount: number;
  interiorWallCount: number;
  installationCount: number;
  primaryCount: number;
  installsPerRoom: number;
  minimumCrossClearance: number;
}>;

/**
 * Deterministic checks protect the agreed six-wall standard: exact room and
 * installation counts, full-scale backed primaries, no shared slots, no bay
 * overlap, and an unobstructed cardinal crossing.
 */
export const validateCritiquePowerDeconstructionGalleryCuration = (
): CritiquePowerDeconstructionCurationValidation => {
  const rooms = Object.entries(
    CRITIQUE_POWER_DECONSTRUCTION_ROOM_BOUNDS,
  ) as readonly [CritiquePowerDeconstructionRoomId, MuseumBounds][];
  assertCuration(rooms.length === 4, 'the crossroads must have four rooms.');
  const roomArea = rooms.reduce(
    (sum, [, bounds]) =>
      sum + (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ),
    0,
  );
  assertCuration(
    roomArea
      === CRITIQUE_POWER_DECONSTRUCTION_HALL_DIMENSIONS.width
        * CRITIQUE_POWER_DECONSTRUCTION_HALL_DIMENSIONS.depth,
    'the four room floors must tile the complete 28 × 28 shell.',
  );
  assertCuration(
    CRITIQUE_POWER_DECONSTRUCTION_SPATIAL_CONNECTIONS.length === 4,
    'all four adjacent room pairs need an open seam.',
  );
  assertCuration(
    critiquePowerDeconstructionInteriorWalls().length === 8,
    'four rooms require eight full-height L-baffle segments.',
  );
  assertCuration(
    CRITIQUE_POWER_DECONSTRUCTION_INSTALLATION_SLOTS.length
      === CRITIQUE_POWER_DECONSTRUCTION_PHYSICAL_INSTALL_COUNT,
    'the hall must retain exactly 24 physical installations.',
  );
  assertCuration(
    new Set(
      CRITIQUE_POWER_DECONSTRUCTION_INSTALLATION_SLOTS.map(({id}) => id),
    ).size === CRITIQUE_POWER_DECONSTRUCTION_INSTALLATION_SLOTS.length,
    'installation slot IDs must be unique.',
  );
  for (const roomId of CRITIQUE_POWER_DECONSTRUCTION_ROOM_ORDER) {
    const count = CRITIQUE_POWER_DECONSTRUCTION_INSTALLATION_SLOTS.filter(
      ({spatialCellId}) => spatialCellId === roomId,
    ).length;
    assertCuration(
      count === CRITIQUE_POWER_DECONSTRUCTION_INSTALLS_PER_ROOM,
      `${roomId} has ${count} slots instead of six.`,
    );
  }

  const primaries = Object.entries(
    CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_PLACEMENTS,
  ) as readonly [
    CritiquePowerDeconstructionPrimaryExhibitId,
    CritiquePowerDeconstructionPrimaryPlacement,
  ][];
  assertCuration(primaries.length === 4, 'all four canonical primaries need placements.');
  assertCuration(
    new Set(primaries.map(([, placement]) => placement.slotId)).size
      === primaries.length,
    'canonical primaries cannot share a wall face.',
  );
  for (const [exhibitId, placement] of primaries) {
    const authoredSlot =
      getCritiquePowerDeconstructionInstallationSlot(placement.slotId);
    assertCuration(placement.scale === 'full', `${exhibitId} is not full scale.`);
    assertCuration(
      authoredSlot.face === 'outer-primary',
      `${exhibitId} must lead its room from a perimeter-primary face.`,
    );
  }

  const primarySlotIds = new Set(primaries.map(([, placement]) => placement.slotId));
  const allWalls = [
    ...outerBackingWalls(),
    ...critiquePowerDeconstructionInteriorWalls(),
  ];
  const wallById = new Map(allWalls.map((wall) => [wall.id, wall]));
  const footprints = CRITIQUE_POWER_DECONSTRUCTION_INSTALLATION_SLOTS.map(
    (authoredSlot) => {
      const primary = primarySlotIds.has(authoredSlot.id);
      const footprint = footprintFor(
        authoredSlot,
        authoredSlot.rotationY,
        CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_SCALE_FLOOR.objectWidth,
        primary ? 2.05 : 1.34,
      );
      const roomBounds =
        CRITIQUE_POWER_DECONSTRUCTION_ROOM_BOUNDS[authoredSlot.spatialCellId];
      assertCuration(
        footprint.minX >= roomBounds.minX + .08
        && footprint.maxX <= roomBounds.maxX - .08
        && footprint.minZ >= roomBounds.minZ + .08
        && footprint.maxZ <= roomBounds.maxZ - .08,
        `${authoredSlot.id} leaves its room bounds.`,
      );
      const backingWall = wallById.get(authoredSlot.backingWallId);
      assertCuration(backingWall, `${authoredSlot.id} has no physical backing wall.`);
      const backingPoint = {
        x: authoredSlot.x - Math.sin(authoredSlot.rotationY) * .76,
        z: authoredSlot.z - Math.cos(authoredSlot.rotationY) * .76,
      };
      assertCuration(
        distanceFromPointToBounds(backingPoint, wallBounds(backingWall)) <= .3,
        `${authoredSlot.id} floats too far from ${authoredSlot.backingWallId}.`,
      );
      return {slot: authoredSlot, footprint};
    },
  );

  for (const [index, first] of footprints.entries()) {
    for (const second of footprints.slice(index + 1)) {
      if (first.slot.spatialCellId !== second.slot.spatialCellId) continue;
      assertCuration(
        !overlaps(first.footprint, second.footprint, .32),
        `${first.slot.id} overlaps ${second.slot.id}.`,
      );
    }
  }

  const solidBounds = [
    ...allWalls.map(wallBounds),
    ...footprints.map(({footprint}) => footprint),
  ];
  let minimumCrossClearance = Number.POSITIVE_INFINITY;
  const pathPoints = CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_CIRCULATION.points;
  for (let legIndex = 0; legIndex < pathPoints.length - 1; legIndex += 1) {
    const from = pathPoints[legIndex];
    const to = pathPoints[legIndex + 1];
    const distance = Math.hypot(to.x - from.x, to.z - from.z);
    const samples = Math.max(1, Math.ceil(distance / .1));
    for (let sampleIndex = 0; sampleIndex <= samples; sampleIndex += 1) {
      const ratio = sampleIndex / samples;
      const point = {
        x: from.x + (to.x - from.x) * ratio,
        z: from.z + (to.z - from.z) * ratio,
      };
      for (const bounds of solidBounds) {
        minimumCrossClearance = Math.min(
          minimumCrossClearance,
          distanceFromPointToBounds(point, bounds),
        );
      }
    }
  }
  assertCuration(
    minimumCrossClearance
      >= CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_CIRCULATION.clearanceRadius,
    `the cardinal cross has only ${minimumCrossClearance.toFixed(2)} m clearance.`,
  );

  return Object.freeze({
    roomCount: rooms.length,
    connectionCount: CRITIQUE_POWER_DECONSTRUCTION_SPATIAL_CONNECTIONS.length,
    interiorWallCount: critiquePowerDeconstructionInteriorWalls().length,
    installationCount:
      CRITIQUE_POWER_DECONSTRUCTION_INSTALLATION_SLOTS.length,
    primaryCount: primaries.length,
    installsPerRoom: CRITIQUE_POWER_DECONSTRUCTION_INSTALLS_PER_ROOM,
    minimumCrossClearance,
  });
};

export const CRITIQUE_POWER_DECONSTRUCTION_CURATION_VALIDATION =
  validateCritiquePowerDeconstructionGalleryCuration();
