import type {
  MuseumBounds,
  MuseumCirculationPath,
  MuseumPoint,
  MuseumPose,
  MuseumSpatialConnection,
  MuseumWallDefinition,
} from './museumWorldTypes';

export const CLASSICAL_CHINESE_GALLERY_ID = 'classical-chinese-traditions' as const;

export const CLASSICAL_CHINESE_HALL_DIMENSIONS = Object.freeze({
  width: 28,
  depth: 28,
  ceilingHeight: 6.2,
  wallThickness: .36,
  crossHalfWidth: 4,
});

export type ClassicalChineseRoomId =
  | 'china-many-ways'
  | 'china-confucian-cultivation'
  | 'china-daoist-way'
  | 'china-mohist-fa';

export type ClassicalChinesePrimaryExhibitId =
  | 'chinese-philosophy'
  | 'confucianism'
  | 'confucius'
  | 'mencius'
  | 'xunzi'
  | 'daoism'
  | 'laozi'
  | 'zhuangzi'
  | 'legalism'
  | 'mohism'
  | 'han-feizi'
  | 'mozi';

export const CLASSICAL_CHINESE_ROOM_ORDER = [
  'china-many-ways',
  'china-confucian-cultivation',
  'china-daoist-way',
  'china-mohist-fa',
] as const satisfies readonly ClassicalChineseRoomId[];

/**
 * The four records remain simple quadrants so their floors tile the complete
 * 28 × 28 metre shell. The authored L-baffles below, rather than the cell
 * bounds, define the visitor-visible rooms around the open cardinal cross.
 */
export const CLASSICAL_CHINESE_ROOM_BOUNDS = Object.freeze({
  'china-many-ways': {minX: -14, maxX: 0, minZ: -14, maxZ: 0},
  'china-confucian-cultivation': {minX: 0, maxX: 14, minZ: -14, maxZ: 0},
  'china-daoist-way': {minX: -14, maxX: 0, minZ: 0, maxZ: 14},
  'china-mohist-fa': {minX: 0, maxX: 14, minZ: 0, maxZ: 14},
} as const satisfies Readonly<Record<ClassicalChineseRoomId, MuseumBounds>>);

/**
 * All four conceptual seams remain open. The long opening bounds are
 * intentional: unlike Gallery 06's room grid, this hall has no wall on either
 * cardinal axis. Visitors can therefore enter from any template doorway and
 * reach the central crossing without threading through an exhibit bay.
 */
export const CLASSICAL_CHINESE_SPATIAL_CONNECTIONS = [
  {
    id: 'threshold:china-many-ways:china-confucian-cultivation',
    fromCellId: 'china-many-ways',
    toCellId: 'china-confucian-cultivation',
    openingBounds: {minX: -.3, maxX: .3, minZ: -14, maxZ: 0},
  },
  {
    id: 'threshold:china-daoist-way:china-mohist-fa',
    fromCellId: 'china-daoist-way',
    toCellId: 'china-mohist-fa',
    openingBounds: {minX: -.3, maxX: .3, minZ: 0, maxZ: 14},
  },
  {
    id: 'threshold:china-many-ways:china-daoist-way',
    fromCellId: 'china-many-ways',
    toCellId: 'china-daoist-way',
    openingBounds: {minX: -14, maxX: 0, minZ: -.3, maxZ: .3},
  },
  {
    id: 'threshold:china-confucian-cultivation:china-mohist-fa',
    fromCellId: 'china-confucian-cultivation',
    toCellId: 'china-mohist-fa',
    openingBounds: {minX: 0, maxX: 14, minZ: -.3, maxZ: .3},
  },
] as const satisfies readonly MuseumSpatialConnection[];

const baffleId = (
  room: 'nw' | 'ne' | 'sw' | 'se',
  edge: 'vertical' | 'horizontal',
  prefix = CLASSICAL_CHINESE_GALLERY_ID,
): string => `${prefix}:cct-${room}-${edge}-baffle`;

/**
 * Four restrained L-shaped pairs define the rooms without reproducing the
 * Forum's cubicle grid. Each full-height segment is six metres long: enough
 * for a full 4.6 m primary bay, while its four-metre inner-end opening gives
 * each corner room a comfortable entrance from the central cross.
 *
 * The baffles sit on x/z = ±4 and never cross either cardinal axis. Their
 * room-facing and cross-facing sides provide four backed exhibit faces per
 * room; the two perimeter walls provide the remaining two.
 */
export const classicalChineseInteriorWalls = (
  prefix = CLASSICAL_CHINESE_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {ceilingHeight: height, wallThickness} = CLASSICAL_CHINESE_HALL_DIMENSIONS;
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

export type ClassicalChineseInstallationFace =
  | 'outer-primary'
  | 'room-return'
  | 'cross-return';

export type ClassicalChineseInstallationSlot = Readonly<{
  id: string;
  spatialCellId: ClassicalChineseRoomId;
  x: number;
  z: number;
  rotationY: number;
  backingWallId: string;
  face: ClassicalChineseInstallationFace;
  /**
   * Cross-facing secondaries use a shallower viewing distance so their
   * viewpoint remains in the owning quadrant rather than crossing a cell seam.
   */
  supplementalViewpointDistance: number;
}>;

const outerWallId = (
  edge: 'north' | 'south' | 'west' | 'east',
): string => `${CLASSICAL_CHINESE_GALLERY_ID}:${edge}-wall`;

const slot = (
  id: string,
  spatialCellId: ClassicalChineseRoomId,
  x: number,
  z: number,
  rotationY: number,
  backingWallId: string,
  face: ClassicalChineseInstallationFace,
): ClassicalChineseInstallationSlot => ({
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
 * The complete physical wall contract: six unique, backed faces in each room.
 * Canonical primaries consume the prominent outer or room-facing slots below;
 * supplemental curation must consume every remaining slot exactly once.
 */
export const CLASSICAL_CHINESE_INSTALLATION_SLOTS = [
  // Northwest · Many ways in early China
  slot('china-many-ways:north-outer', 'china-many-ways', -9, -12.8, 0, outerWallId('north'), 'outer-primary'),
  slot('china-many-ways:west-outer', 'china-many-ways', -12.8, -9, Math.PI / 2, outerWallId('west'), 'outer-primary'),
  slot('china-many-ways:east-room-face', 'china-many-ways', -5.2, -11, -Math.PI / 2, baffleId('nw', 'vertical'), 'room-return'),
  slot('china-many-ways:east-cross-face', 'china-many-ways', -3, -11, Math.PI / 2, baffleId('nw', 'vertical'), 'cross-return'),
  slot('china-many-ways:south-room-face', 'china-many-ways', -11, -5.2, Math.PI, baffleId('nw', 'horizontal'), 'room-return'),
  slot('china-many-ways:south-cross-face', 'china-many-ways', -11, -3, 0, baffleId('nw', 'horizontal'), 'cross-return'),

  // Northeast · Confucian cultivation
  slot('china-confucian-cultivation:north-outer', 'china-confucian-cultivation', 9, -12.8, 0, outerWallId('north'), 'outer-primary'),
  slot('china-confucian-cultivation:east-outer', 'china-confucian-cultivation', 12.8, -9, -Math.PI / 2, outerWallId('east'), 'outer-primary'),
  slot('china-confucian-cultivation:west-room-face', 'china-confucian-cultivation', 5.2, -11, Math.PI / 2, baffleId('ne', 'vertical'), 'room-return'),
  slot('china-confucian-cultivation:west-cross-face', 'china-confucian-cultivation', 3, -11, -Math.PI / 2, baffleId('ne', 'vertical'), 'cross-return'),
  slot('china-confucian-cultivation:south-room-face', 'china-confucian-cultivation', 11, -5.2, Math.PI, baffleId('ne', 'horizontal'), 'room-return'),
  slot('china-confucian-cultivation:south-cross-face', 'china-confucian-cultivation', 11, -3, 0, baffleId('ne', 'horizontal'), 'cross-return'),

  // Southwest · Daodejing, Zhuangzi, and the Way
  slot('china-daoist-way:west-outer', 'china-daoist-way', -12.8, 9, Math.PI / 2, outerWallId('west'), 'outer-primary'),
  slot('china-daoist-way:south-outer', 'china-daoist-way', -9, 12.8, Math.PI, outerWallId('south'), 'outer-primary'),
  slot('china-daoist-way:east-room-face', 'china-daoist-way', -5.2, 11, -Math.PI / 2, baffleId('sw', 'vertical'), 'room-return'),
  slot('china-daoist-way:east-cross-face', 'china-daoist-way', -3, 11, Math.PI / 2, baffleId('sw', 'vertical'), 'cross-return'),
  slot('china-daoist-way:north-room-face', 'china-daoist-way', -11, 5.2, 0, baffleId('sw', 'horizontal'), 'room-return'),
  slot('china-daoist-way:north-cross-face', 'china-daoist-way', -11, 3, Math.PI, baffleId('sw', 'horizontal'), 'cross-return'),

  // Southeast · Mohist debate and fa/statecraft currents
  slot('china-mohist-fa:east-outer', 'china-mohist-fa', 12.8, 9, -Math.PI / 2, outerWallId('east'), 'outer-primary'),
  slot('china-mohist-fa:south-outer', 'china-mohist-fa', 9, 12.8, Math.PI, outerWallId('south'), 'outer-primary'),
  slot('china-mohist-fa:west-room-face', 'china-mohist-fa', 5.2, 11, Math.PI / 2, baffleId('se', 'vertical'), 'room-return'),
  slot('china-mohist-fa:west-cross-face', 'china-mohist-fa', 3, 11, -Math.PI / 2, baffleId('se', 'vertical'), 'cross-return'),
  slot('china-mohist-fa:north-room-face', 'china-mohist-fa', 11, 5.2, 0, baffleId('se', 'horizontal'), 'room-return'),
  slot('china-mohist-fa:north-cross-face', 'china-mohist-fa', 11, 3, Math.PI, baffleId('se', 'horizontal'), 'cross-return'),
] as const satisfies readonly ClassicalChineseInstallationSlot[];

export const CLASSICAL_CHINESE_PHYSICAL_INSTALL_COUNT = 24 as const;
export const CLASSICAL_CHINESE_INSTALLS_PER_ROOM = 6 as const;

const installationSlotById = new Map(
  CLASSICAL_CHINESE_INSTALLATION_SLOTS.map((item) => [item.id, item]),
);

export const getClassicalChineseInstallationSlot = (
  slotId: string,
): ClassicalChineseInstallationSlot => {
  const result = installationSlotById.get(slotId);
  if (!result) throw new Error(`Gallery 09 installation slot ${slotId} does not exist.`);
  return result;
};

export type ClassicalChinesePrimaryPlacement = Readonly<{
  x: number;
  z: number;
  rotationY: number;
  slotId: string;
  backingWallId: string;
  scale: 'full';
}>;

const fullScalePlacement = (
  slotId: string,
): ClassicalChinesePrimaryPlacement => {
  const authoredSlot = getClassicalChineseInstallationSlot(slotId);
  return {
    x: authoredSlot.x,
    z: authoredSlot.z,
    rotationY: authoredSlot.rotationY,
    slotId: authoredSlot.id,
    backingWallId: authoredSlot.backingWallId,
    scale: 'full',
  };
};

/**
 * Primaries use only perimeter-primary or room-facing return walls. The
 * corridor-facing surfaces remain secondary, so visitors encounter a school or
 * thinker before its works, concepts, and transmission context.
 */
export const CLASSICAL_CHINESE_PRIMARY_PLACEMENTS = {
  'chinese-philosophy': fullScalePlacement('china-many-ways:north-outer'),
  confucianism: fullScalePlacement('china-confucian-cultivation:north-outer'),
  confucius: fullScalePlacement('china-confucian-cultivation:east-outer'),
  mencius: fullScalePlacement('china-confucian-cultivation:west-room-face'),
  xunzi: fullScalePlacement('china-confucian-cultivation:south-room-face'),
  daoism: fullScalePlacement('china-daoist-way:west-outer'),
  zhuangzi: fullScalePlacement('china-daoist-way:south-outer'),
  laozi: fullScalePlacement('china-daoist-way:east-room-face'),
  mohism: fullScalePlacement('china-mohist-fa:east-outer'),
  legalism: fullScalePlacement('china-mohist-fa:south-outer'),
  mozi: fullScalePlacement('china-mohist-fa:west-room-face'),
  'han-feizi': fullScalePlacement('china-mohist-fa:north-room-face'),
} as const satisfies Readonly<
  Record<ClassicalChinesePrimaryExhibitId, ClassicalChinesePrimaryPlacement>
>;

/**
 * This is the minimum Gallery 03–08 full-primary envelope. Runtime curation
 * should continue taking the maximum of this contract and the largest
 * supplemental installation, so a future secondary can never outrank a
 * philosopher or tradition by size.
 */
export const CLASSICAL_CHINESE_PRIMARY_SCALE_FLOOR = Object.freeze({
  bayWidth: 4.6,
  objectWidth: 3.8,
  objectHeight: 3.55,
  footprintHeight: 3.71,
});

export const CLASSICAL_CHINESE_ROOM_SIGN_COPY = {
  'china-many-ways': {
    kicker: 'Room 01 · Begin with argument, not one doctrine',
    title: 'Many Ways in Early China',
    subtitle: 'Ritualists, Mohists, Daoist texts, and fa/statecraft currents emerge through contest and change.',
  },
  'china-confucian-cultivation': {
    kicker: 'Room 02 · Ritual, relationship, and formation',
    title: 'Confucian Cultivation and Human Nature',
    subtitle: 'Follow Confucius, Mencius, and Xunzi through rival accounts of learning, humaneness, ritual, and rule.',
  },
  'china-daoist-way': {
    kicker: 'Room 03 · Way, language, skill, and transformation',
    title: 'Daodejing, Zhuangzi, and the Way',
    subtitle: 'Read attributed Laozi with textual caution, then follow Zhuangzi across perspective, practice, and change.',
  },
  'china-mohist-fa': {
    kicker: 'Room 04 · Standards, care, argument, and statecraft',
    title: 'Mohist Debate and Fa/Statecraft Currents',
    subtitle: 'Mohism and diverse fa currents share a debate room—not a school—through Mozi, Han Feizi, and their disputes.',
  },
} as const satisfies Readonly<Record<ClassicalChineseRoomId, {
  title: string;
  kicker: string;
  subtitle: string;
}>>;

/**
 * Directory views begin just inside each room's four-metre opening and face its
 * strongest perimeter primary. They do not stage the central cross or a
 * secondary installation as the room's accidental focal point.
 */
export const CLASSICAL_CHINESE_ROOM_ENTRY_POSES = Object.freeze({
  'china-many-ways': {x: -8.2, z: -8.2, yaw: .408, pitch: -.02},
  'china-confucian-cultivation': {x: 8.2, z: -8.2, yaw: -.408, pitch: -.02},
  'china-daoist-way': {x: -8.2, z: 8.2, yaw: 1.979, pitch: -.02},
  'china-mohist-fa': {x: 8.2, z: 8.2, yaw: -1.979, pitch: -.02},
} as const satisfies Readonly<Record<ClassicalChineseRoomId, MuseumPose>>);

/**
 * The primary route is the unobstructed cardinal cross. Room tours branch from
 * it through the four-metre corner openings, but the building's required
 * north/south and east/west paths never enter an exhibit footprint.
 */
export const CLASSICAL_CHINESE_PRIMARY_CIRCULATION = Object.freeze({
  id: `${CLASSICAL_CHINESE_GALLERY_ID}:primary-circulation`,
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

type AxisAlignedFootprint = MuseumBounds;

const footprintFor = (
  point: MuseumPoint,
  rotationY: number,
  width: number,
  depth: number,
): AxisAlignedFootprint => {
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
  const {wallThickness, ceilingHeight} = CLASSICAL_CHINESE_HALL_DIMENSIONS;
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
  if (!condition) throw new Error(`Gallery 09 curation contract: ${message}`);
};

export type ClassicalChineseCurationValidation = Readonly<{
  roomCount: number;
  connectionCount: number;
  interiorWallCount: number;
  installationCount: number;
  primaryCount: number;
  installsPerRoom: number;
  minimumCrossClearance: number;
}>;

/**
 * A small deterministic geometry audit kept beside the authored contract. It
 * protects the exact mistakes this hall must not regress to: blank faces,
 * floating exhibits, undersized primaries, blocked axes, and overlapping bays.
 */
export const validateClassicalChineseGalleryCuration = (
): ClassicalChineseCurationValidation => {
  const halfWidth = CLASSICAL_CHINESE_HALL_DIMENSIONS.width / 2;
  const halfDepth = CLASSICAL_CHINESE_HALL_DIMENSIONS.depth / 2;
  const hallBounds: MuseumBounds = {
    minX: -halfWidth,
    maxX: halfWidth,
    minZ: -halfDepth,
    maxZ: halfDepth,
  };
  const rooms = Object.entries(CLASSICAL_CHINESE_ROOM_BOUNDS) as readonly [
    ClassicalChineseRoomId,
    MuseumBounds,
  ][];
  assertCuration(rooms.length === 4, 'the crossroads must have four rooms.');
  const roomArea = rooms.reduce(
    (sum, [, bounds]) =>
      sum + (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ),
    0,
  );
  assertCuration(
    roomArea === CLASSICAL_CHINESE_HALL_DIMENSIONS.width * CLASSICAL_CHINESE_HALL_DIMENSIONS.depth,
    'the four room floors must tile the complete 28 × 28 shell.',
  );
  for (const [roomId, bounds] of rooms) {
    assertCuration(
      bounds.minX >= hallBounds.minX
      && bounds.maxX <= hallBounds.maxX
      && bounds.minZ >= hallBounds.minZ
      && bounds.maxZ <= hallBounds.maxZ,
      `${roomId} exceeds the hall shell.`,
    );
  }

  assertCuration(
    CLASSICAL_CHINESE_SPATIAL_CONNECTIONS.length === 4,
    'all four adjacent room pairs need an open seam.',
  );
  assertCuration(
    CLASSICAL_CHINESE_INSTALLATION_SLOTS.length === CLASSICAL_CHINESE_PHYSICAL_INSTALL_COUNT,
    'the hall must retain exactly 24 physical installations.',
  );
  assertCuration(
    new Set(CLASSICAL_CHINESE_INSTALLATION_SLOTS.map(({id}) => id)).size
      === CLASSICAL_CHINESE_INSTALLATION_SLOTS.length,
    'installation slot IDs must be unique.',
  );

  for (const roomId of CLASSICAL_CHINESE_ROOM_ORDER) {
    const count = CLASSICAL_CHINESE_INSTALLATION_SLOTS.filter(
      ({spatialCellId}) => spatialCellId === roomId,
    ).length;
    assertCuration(
      count === CLASSICAL_CHINESE_INSTALLS_PER_ROOM,
      `${roomId} has ${count} slots instead of six.`,
    );
  }

  const primaryPlacements = Object.entries(
    CLASSICAL_CHINESE_PRIMARY_PLACEMENTS,
  ) as readonly [ClassicalChinesePrimaryExhibitId, ClassicalChinesePrimaryPlacement][];
  assertCuration(primaryPlacements.length === 12, 'all twelve canonical primaries need placements.');
  assertCuration(
    new Set(primaryPlacements.map(([, placement]) => placement.slotId)).size
      === primaryPlacements.length,
    'canonical primaries cannot share a physical wall face.',
  );
  for (const [exhibitId, placement] of primaryPlacements) {
    const authoredSlot = getClassicalChineseInstallationSlot(placement.slotId);
    assertCuration(placement.scale === 'full', `${exhibitId} is not explicitly full scale.`);
    assertCuration(
      authoredSlot.face !== 'cross-return',
      `${exhibitId} incorrectly occupies a secondary cross-facing surface.`,
    );
  }

  const primarySlotIds = new Set(primaryPlacements.map(([, placement]) => placement.slotId));
  const allWalls = [
    ...outerBackingWalls(),
    ...classicalChineseInteriorWalls(),
  ];
  const wallById = new Map(allWalls.map((wall) => [wall.id, wall]));
  const footprints = CLASSICAL_CHINESE_INSTALLATION_SLOTS.map((authoredSlot) => {
    const primary = primarySlotIds.has(authoredSlot.id);
    const footprint = footprintFor(
      authoredSlot,
      authoredSlot.rotationY,
      CLASSICAL_CHINESE_PRIMARY_SCALE_FLOOR.objectWidth,
      primary ? 2.05 : 1.34,
    );
    const roomBounds = CLASSICAL_CHINESE_ROOM_BOUNDS[authoredSlot.spatialCellId];
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
  });

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
  const pathPoints = CLASSICAL_CHINESE_PRIMARY_CIRCULATION.points;
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
    minimumCrossClearance >= CLASSICAL_CHINESE_PRIMARY_CIRCULATION.clearanceRadius,
    `the cardinal cross has only ${minimumCrossClearance.toFixed(2)} m clearance.`,
  );

  return Object.freeze({
    roomCount: rooms.length,
    connectionCount: CLASSICAL_CHINESE_SPATIAL_CONNECTIONS.length,
    interiorWallCount: classicalChineseInteriorWalls().length,
    installationCount: CLASSICAL_CHINESE_INSTALLATION_SLOTS.length,
    primaryCount: primaryPlacements.length,
    installsPerRoom: CLASSICAL_CHINESE_INSTALLS_PER_ROOM,
    minimumCrossClearance,
  });
};

export const CLASSICAL_CHINESE_CURATION_VALIDATION =
  validateClassicalChineseGalleryCuration();
