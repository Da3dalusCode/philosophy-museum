import type {
  MuseumBounds,
  MuseumCirculationPath,
  MuseumPose,
  MuseumSpatialConnection,
  MuseumWallDefinition,
} from './museumWorldTypes';

export const ENLIGHTENMENT_GALLERY_ID = 'enlightenment-revolution-kant' as const;

export const ENLIGHTENMENT_HALL_DIMENSIONS = Object.freeze({
  width: 28,
  depth: 28,
  ceilingHeight: 6.2,
  wallThickness: .36,
  crossHalfWidth: 4,
});

export type EnlightenmentRoomId =
  | 'enlightenment-law-institutions'
  | 'enlightenment-society-freedom'
  | 'enlightenment-sentiment-commerce'
  | 'enlightenment-equality-education'
  | 'enlightenment-kant-critical';

export type EnlightenmentPrimaryExhibitId =
  | 'montesquieu'
  | 'rousseau'
  | 'adam-smith'
  | 'mary-astell'
  | 'wollstonecraft'
  | 'kant';

export const ENLIGHTENMENT_ROOM_ORDER = [
  'enlightenment-law-institutions',
  'enlightenment-society-freedom',
  'enlightenment-sentiment-commerce',
  'enlightenment-equality-education',
  'enlightenment-kant-critical',
] as const satisfies readonly EnlightenmentRoomId[];

export const ENLIGHTENMENT_CELL_ORDER = [
  'enlightenment-law-institutions',
  'enlightenment-society-freedom',
  'enlightenment-sentiment-commerce',
  'enlightenment-equality-education',
] as const;

export type EnlightenmentCellId = (typeof ENLIGHTENMENT_CELL_ORDER)[number];

/** Four full physical bays carry five stable semantic routes. */
export const ENLIGHTENMENT_ROOM_BOUNDS = Object.freeze({
  'enlightenment-law-institutions': {minX: 0, maxX: 14, minZ: -14, maxZ: 0},
  'enlightenment-society-freedom': {minX: 0, maxX: 14, minZ: 0, maxZ: 14},
  'enlightenment-sentiment-commerce': {minX: -14, maxX: 0, minZ: 0, maxZ: 14},
  'enlightenment-equality-education': {minX: -14, maxX: 0, minZ: -14, maxZ: 0},
  'enlightenment-kant-critical': {minX: -14, maxX: 0, minZ: -14, maxZ: 0},
} as const satisfies Readonly<Record<EnlightenmentRoomId, MuseumBounds>>);

export const ENLIGHTENMENT_ZONE_TO_CELL = Object.freeze({
  'enlightenment-law-institutions': 'enlightenment-law-institutions',
  'enlightenment-society-freedom': 'enlightenment-society-freedom',
  'enlightenment-sentiment-commerce': 'enlightenment-sentiment-commerce',
  'enlightenment-equality-education': 'enlightenment-equality-education',
  'enlightenment-kant-critical': 'enlightenment-equality-education',
} as const satisfies Readonly<Record<EnlightenmentRoomId, EnlightenmentCellId>>);

export const getEnlightenmentCellIdForZone = (zoneId: string): EnlightenmentCellId => {
  const result = ENLIGHTENMENT_ZONE_TO_CELL[zoneId as EnlightenmentRoomId];
  if (!result) throw new Error(`Gallery 15 zone ${zoneId} has no physical bay.`);
  return result;
};

export const ENLIGHTENMENT_SPATIAL_CONNECTIONS = [
  {
    id: 'threshold:enlightenment-law-institutions:enlightenment-society-freedom',
    fromCellId: 'enlightenment-law-institutions',
    toCellId: 'enlightenment-society-freedom',
    openingBounds: {minX: 0, maxX: 14, minZ: -.3, maxZ: .3},
  },
  {
    id: 'threshold:enlightenment-society-freedom:enlightenment-sentiment-commerce',
    fromCellId: 'enlightenment-sentiment-commerce',
    toCellId: 'enlightenment-society-freedom',
    openingBounds: {minX: -.3, maxX: .3, minZ: 0, maxZ: 14},
  },
  {
    id: 'threshold:enlightenment-sentiment-commerce:enlightenment-equality-education',
    fromCellId: 'enlightenment-sentiment-commerce',
    toCellId: 'enlightenment-equality-education',
    openingBounds: {minX: -14, maxX: 0, minZ: -.3, maxZ: .3},
  },
  {
    id: 'threshold:enlightenment-equality-education:enlightenment-law-institutions',
    fromCellId: 'enlightenment-equality-education',
    toCellId: 'enlightenment-law-institutions',
    openingBounds: {minX: -.3, maxX: .3, minZ: -14, maxZ: 0},
  },
] as const satisfies readonly MuseumSpatialConnection[];

const wallId = (name: string, prefix = ENLIGHTENMENT_GALLERY_ID): string =>
  `${prefix}:enlightenment-${name}`;

const baffleId = (
  room: 'nw' | 'ne' | 'sw' | 'se',
  edge: 'vertical' | 'horizontal',
  prefix = ENLIGHTENMENT_GALLERY_ID,
): string => wallId(`${room}-${edge}-baffle`, prefix);

/** Mirrored Gallery 02 L-baffles leave the cardinal cross completely open. */
export const enlightenmentInteriorWalls = (
  prefix = ENLIGHTENMENT_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {ceilingHeight: height, wallThickness} = ENLIGHTENMENT_HALL_DIMENSIONS;
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

export type EnlightenmentInstallationSlot = Readonly<{
  id: string;
  zoneId: EnlightenmentRoomId;
  spatialCellId: EnlightenmentCellId;
  x: number;
  z: number;
  rotationY: number;
  backingWallId: string;
  supplementalViewpointDistance: number;
}>;

const outerWallId = (edge: 'north' | 'south' | 'west' | 'east'): string =>
  `${ENLIGHTENMENT_GALLERY_ID}:${edge}-wall`;

const slot = (
  id: string,
  zoneId: EnlightenmentRoomId,
  x: number,
  z: number,
  rotationY: number,
  backingWallId: string,
  supplementalViewpointDistance = 2.92,
): EnlightenmentInstallationSlot => ({
  id,
  zoneId,
  spatialCellId: getEnlightenmentCellIdForZone(zoneId),
  x,
  z,
  rotationY,
  backingWallId,
  supplementalViewpointDistance,
});

export const ENLIGHTENMENT_INSTALLATION_SLOTS = [
  // Northeast · law and institutions · 6
  slot('enlightenment-law-institutions:north-outer', 'enlightenment-law-institutions', 9, -12.8, 0, outerWallId('north')),
  slot('enlightenment-law-institutions:east-outer', 'enlightenment-law-institutions', 12.8, -9, -Math.PI / 2, outerWallId('east')),
  slot('enlightenment-law-institutions:west-room-face', 'enlightenment-law-institutions', 5.2, -11, Math.PI / 2, baffleId('ne', 'vertical')),
  slot('enlightenment-law-institutions:west-cross-face', 'enlightenment-law-institutions', 3, -11, -Math.PI / 2, baffleId('ne', 'vertical'), 2.5),
  slot('enlightenment-law-institutions:south-room-face', 'enlightenment-law-institutions', 11, -5.2, Math.PI, baffleId('ne', 'horizontal')),
  slot('enlightenment-law-institutions:south-cross-face', 'enlightenment-law-institutions', 11, -3, 0, baffleId('ne', 'horizontal'), 2.5),

  // Southeast · society and freedom · 6
  slot('enlightenment-society-freedom:east-outer', 'enlightenment-society-freedom', 12.8, 9, -Math.PI / 2, outerWallId('east')),
  slot('enlightenment-society-freedom:south-outer', 'enlightenment-society-freedom', 9, 12.8, Math.PI, outerWallId('south')),
  slot('enlightenment-society-freedom:west-room-face', 'enlightenment-society-freedom', 5.2, 11, Math.PI / 2, baffleId('se', 'vertical')),
  slot('enlightenment-society-freedom:west-cross-face', 'enlightenment-society-freedom', 3, 11, -Math.PI / 2, baffleId('se', 'vertical'), 2.5),
  slot('enlightenment-society-freedom:north-room-face', 'enlightenment-society-freedom', 11, 5.2, 0, baffleId('se', 'horizontal')),
  slot('enlightenment-society-freedom:north-cross-face', 'enlightenment-society-freedom', 11, 3, Math.PI, baffleId('se', 'horizontal'), 2.5),

  // Southwest · sentiment and commerce · 6
  slot('enlightenment-sentiment-commerce:west-outer', 'enlightenment-sentiment-commerce', -12.8, 9, Math.PI / 2, outerWallId('west')),
  slot('enlightenment-sentiment-commerce:south-outer', 'enlightenment-sentiment-commerce', -9, 12.8, Math.PI, outerWallId('south')),
  slot('enlightenment-sentiment-commerce:east-room-face', 'enlightenment-sentiment-commerce', -5.2, 11, -Math.PI / 2, baffleId('sw', 'vertical')),
  slot('enlightenment-sentiment-commerce:east-cross-face', 'enlightenment-sentiment-commerce', -3, 11, Math.PI / 2, baffleId('sw', 'vertical'), 2.5),
  slot('enlightenment-sentiment-commerce:north-room-face', 'enlightenment-sentiment-commerce', -11, 5.2, 0, baffleId('sw', 'horizontal')),
  slot('enlightenment-sentiment-commerce:north-cross-face', 'enlightenment-sentiment-commerce', -11, 3, Math.PI, baffleId('sw', 'horizontal'), 2.5),

  // Northwest · equality/education plus Kant's final threshold · 8
  slot('enlightenment-equality-education:west-outer-north', 'enlightenment-equality-education', -12.8, -11.55, Math.PI / 2, outerWallId('west')),
  slot('enlightenment-equality-education:north-outer', 'enlightenment-equality-education', -9.4, -12.8, 0, outerWallId('north')),
  slot('enlightenment-equality-education:east-room-face', 'enlightenment-equality-education', -5.2, -11, -Math.PI / 2, baffleId('nw', 'vertical')),
  slot('enlightenment-equality-education:east-cross-face', 'enlightenment-equality-education', -3, -10.1, Math.PI / 2, baffleId('nw', 'vertical'), 2.5),
  slot('enlightenment-equality-education:south-room-face', 'enlightenment-equality-education', -9.9, -5.2, Math.PI, baffleId('nw', 'horizontal')),
  slot('enlightenment-equality-education:south-cross-face', 'enlightenment-equality-education', -11, -3, 0, baffleId('nw', 'horizontal'), 2.5),
  slot('enlightenment-kant-critical:west-exit-threshold', 'enlightenment-kant-critical', -12.8, -7.25, Math.PI / 2, outerWallId('west')),
  slot('enlightenment-kant-critical:north-outer', 'enlightenment-kant-critical', 0, -12.8, 0, outerWallId('north')),
] as const satisfies readonly EnlightenmentInstallationSlot[];

const installationSlotById = new Map(ENLIGHTENMENT_INSTALLATION_SLOTS.map((item) => [item.id, item]));

export const getEnlightenmentInstallationSlot = (slotId: string): EnlightenmentInstallationSlot => {
  const result = installationSlotById.get(slotId);
  if (!result) throw new Error(`Gallery 15 installation slot ${slotId} does not exist.`);
  return result;
};

const fullScalePlacement = (slotId: string) => {
  const authoredSlot = getEnlightenmentInstallationSlot(slotId);
  return {
    x: authoredSlot.x,
    z: authoredSlot.z,
    rotationY: authoredSlot.rotationY,
    slotId: authoredSlot.id,
    backingWallId: authoredSlot.backingWallId,
    spatialCellId: authoredSlot.spatialCellId,
    viewpointDistance: authoredSlot.supplementalViewpointDistance,
    scale: 'full' as const,
  };
};

export const ENLIGHTENMENT_PRIMARY_PLACEMENTS = {
  montesquieu: fullScalePlacement('enlightenment-law-institutions:north-outer'),
  rousseau: fullScalePlacement('enlightenment-society-freedom:east-outer'),
  'adam-smith': fullScalePlacement('enlightenment-sentiment-commerce:south-outer'),
  'mary-astell': fullScalePlacement('enlightenment-equality-education:north-outer'),
  wollstonecraft: fullScalePlacement('enlightenment-equality-education:west-outer-north'),
  kant: fullScalePlacement('enlightenment-kant-critical:west-exit-threshold'),
} as const satisfies Readonly<Record<EnlightenmentPrimaryExhibitId, {
  x: number;
  z: number;
  rotationY: number;
  slotId: string;
  backingWallId: string;
  spatialCellId: EnlightenmentCellId;
  viewpointDistance: number;
  scale: 'full';
}>>;

export const ENLIGHTENMENT_PRIMARY_SCALE_FLOOR = Object.freeze({
  bayWidth: 4.6,
  objectWidth: 3.8,
  objectHeight: 3.55,
  footprintHeight: 3.71,
});

export const ENLIGHTENMENT_ROOM_SIGN_COPY = {
  'enlightenment-law-institutions': {
    kicker: 'Room 01 · Comparison, law, and institutional power',
    title: 'Montesquieu: Laws in Their Worlds',
    subtitle: 'Political forms vary with history, economy, custom, geography, and institutional arrangements; separated powers are one part of that comparative project.',
  },
  'enlightenment-society-freedom': {
    kicker: 'Room 02 · Inequality, civic formation, and rule',
    title: 'Rousseau: Freedom Remade Together',
    subtitle: 'Natural independence, social inequality, education, popular sovereignty, and the general will form a powerful argument whose exclusions and political risks remain visible.',
  },
  'enlightenment-sentiment-commerce': {
    kicker: 'Room 03 · Sympathy, labor, markets, and empire',
    title: 'Adam Smith: Moral Judgment and Commercial Society',
    subtitle: 'The impartial spectator, division of labor, institutions, inequality, trade, and colonial power belong to one inquiry—not two unrelated books.',
  },
  'enlightenment-equality-education': {
    kicker: 'Room 04 · Universal reason and its exclusions',
    title: 'Astell and Wollstonecraft: Education as Freedom',
    subtitle: 'Arguments for rational agency expose marriage, schooling, manners, and citizenship as institutions that manufacture the inequality they claim merely to observe.',
  },
  'enlightenment-kant-critical': {
    kicker: 'Central threshold · Conditions, limits, and autonomy',
    title: 'Kant’s Critical Turn',
    subtitle: 'Experience is possible because cognition contributes form; critique limits speculative reason while opening contested accounts of freedom, morality, history, race, and public reason.',
  },
} as const satisfies Readonly<Record<EnlightenmentRoomId, {
  title: string;
  kicker: string;
  subtitle: string;
}>>;

export const ENLIGHTENMENT_ROOM_ENTRY_POSES = Object.freeze({
  'enlightenment-law-institutions': {x: 8.2, z: -8.2, yaw: -.408, pitch: -.02},
  'enlightenment-society-freedom': {x: 8.2, z: 8.2, yaw: -1.979, pitch: -.02},
  'enlightenment-sentiment-commerce': {x: -8.2, z: 8.2, yaw: 1.979, pitch: -.02},
  'enlightenment-equality-education': {x: -8.2, z: -8.2, yaw: .408, pitch: -.02},
  'enlightenment-kant-critical': {x: -9.55, z: -7.25, yaw: Math.PI / 2, pitch: -.02},
} as const satisfies Readonly<Record<EnlightenmentRoomId, MuseumPose>>);

export const ENLIGHTENMENT_PRIMARY_CIRCULATION = Object.freeze({
  id: `${ENLIGHTENMENT_GALLERY_ID}:primary-circulation`,
  points: [
    {x: 12, z: 0},
    {x: 0, z: 0},
    {x: -12, z: 0},
  ],
  clearanceRadius: 1.25,
} as const satisfies MuseumCirculationPath);

const assertCuration: (condition: unknown, message: string) => asserts condition = (
  condition,
  message,
) => {
  if (!condition) throw new Error(`Gallery 15 curation contract: ${message}`);
};

export const validateEnlightenmentGalleryCuration = () => {
  assertCuration(Object.keys(ENLIGHTENMENT_ROOM_BOUNDS).length === 5, 'five stable semantic routes are required.');
  assertCuration(ENLIGHTENMENT_CELL_ORDER.length === 4, 'the open crossroads must have four physical bays.');
  assertCuration(ENLIGHTENMENT_SPATIAL_CONNECTIONS.length === 4, 'all four physical bay seams must stay open.');
  assertCuration(enlightenmentInteriorWalls().length === 8, 'the open crossroads must have eight L-baffles.');
  assertCuration(ENLIGHTENMENT_INSTALLATION_SLOTS.length === 26, 'the hall must have exactly 26 installations.');
  assertCuration(new Set(ENLIGHTENMENT_INSTALLATION_SLOTS.map(({id}) => id)).size === 26, 'slot IDs must be unique.');
  assertCuration(Object.keys(ENLIGHTENMENT_PRIMARY_PLACEMENTS).length === 6, 'all six canonical primaries need authored placements.');
  for (const roomId of ENLIGHTENMENT_ROOM_ORDER) {
    const expected = roomId === 'enlightenment-kant-critical' ? 2 : 6;
    assertCuration(
      ENLIGHTENMENT_INSTALLATION_SLOTS.filter(({zoneId}) => zoneId === roomId).length === expected,
      `${roomId} has an incorrect installation count.`,
    );
  }
  return Object.freeze({
    semanticRouteCount: 5,
    physicalBayCount: 4,
    connectionCount: 4,
    interiorWallCount: 8,
    installationCount: 26,
    primaryCount: 6,
    supplementalCount: 20,
  });
};

export const ENLIGHTENMENT_CURATION_VALIDATION = validateEnlightenmentGalleryCuration();
