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
  openingWidth: 4,
  openingHeight: 3.2,
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

/**
 * Exact bounds from the approved planned shell: four cardinal perimeter rooms
 * surround an independent 8 × 8 m Kant room. Gallery completion must never
 * replace this with generic quadrants or an overlapping semantic cell.
 */
export const ENLIGHTENMENT_ROOM_BOUNDS = Object.freeze({
  'enlightenment-law-institutions': {minX: -14, maxX: 14, minZ: -14, maxZ: -4},
  'enlightenment-society-freedom': {minX: 4, maxX: 14, minZ: -4, maxZ: 4},
  'enlightenment-sentiment-commerce': {minX: -14, maxX: 14, minZ: 4, maxZ: 14},
  'enlightenment-equality-education': {minX: -14, maxX: -4, minZ: -4, maxZ: 4},
  'enlightenment-kant-critical': {minX: -4, maxX: 4, minZ: -4, maxZ: 4},
} as const satisfies Readonly<Record<EnlightenmentRoomId, MuseumBounds>>);

export const ENLIGHTENMENT_SPATIAL_CONNECTIONS = [
  {
    id: 'opening:enlightenment-revolution-kant:enlightenment-law-institutions->enlightenment-kant-critical',
    fromCellId: 'enlightenment-law-institutions',
    toCellId: 'enlightenment-kant-critical',
    openingBounds: {minX: -2, maxX: 2, minZ: -4.6, maxZ: -3.4},
  },
  {
    id: 'opening:enlightenment-revolution-kant:enlightenment-society-freedom->enlightenment-kant-critical',
    fromCellId: 'enlightenment-society-freedom',
    toCellId: 'enlightenment-kant-critical',
    openingBounds: {minX: 3.4, maxX: 4.6, minZ: -2, maxZ: 2},
  },
  {
    id: 'opening:enlightenment-revolution-kant:enlightenment-sentiment-commerce->enlightenment-kant-critical',
    fromCellId: 'enlightenment-sentiment-commerce',
    toCellId: 'enlightenment-kant-critical',
    openingBounds: {minX: -2, maxX: 2, minZ: 3.4, maxZ: 4.6},
  },
  {
    id: 'opening:enlightenment-revolution-kant:enlightenment-equality-education->enlightenment-kant-critical',
    fromCellId: 'enlightenment-equality-education',
    toCellId: 'enlightenment-kant-critical',
    openingBounds: {minX: -4.6, maxX: -3.4, minZ: -2, maxZ: 2},
  },
] as const satisfies readonly MuseumSpatialConnection[];

const wallId = (name: string, prefix = ENLIGHTENMENT_GALLERY_ID): string =>
  `${prefix}:enlightenment-${name}`;

/** Full-height collision walls split around the four approved 4 m openings. */
export const enlightenmentInteriorWalls = (
  prefix = ENLIGHTENMENT_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {ceilingHeight: height, wallThickness} = ENLIGHTENMENT_HALL_DIMENSIONS;
  return [
    {id: wallId('north-boundary-west', prefix), center: {x: -8, z: -4}, size: {width: 12, depth: wallThickness}, rotation: 0, height},
    {id: wallId('north-boundary-east', prefix), center: {x: 8, z: -4}, size: {width: 12, depth: wallThickness}, rotation: 0, height},
    {id: wallId('east-boundary-north', prefix), center: {x: 4, z: -3}, size: {width: wallThickness, depth: 2}, rotation: 0, height},
    {id: wallId('east-boundary-south', prefix), center: {x: 4, z: 3}, size: {width: wallThickness, depth: 2}, rotation: 0, height},
    {id: wallId('south-boundary-west', prefix), center: {x: -8, z: 4}, size: {width: 12, depth: wallThickness}, rotation: 0, height},
    {id: wallId('south-boundary-east', prefix), center: {x: 8, z: 4}, size: {width: 12, depth: wallThickness}, rotation: 0, height},
    {id: wallId('west-boundary-north', prefix), center: {x: -4, z: -3}, size: {width: wallThickness, depth: 2}, rotation: 0, height},
    {id: wallId('west-boundary-south', prefix), center: {x: -4, z: 3}, size: {width: wallThickness, depth: 2}, rotation: 0, height},
  ];
};

/** Render-only lintels reproduce the approved shell without closing its 2D collision openings. */
export const enlightenmentInteriorLintels = (
  prefix = ENLIGHTENMENT_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {ceilingHeight, openingHeight, wallThickness} = ENLIGHTENMENT_HALL_DIMENSIONS;
  const height = ceilingHeight - openingHeight;
  return [
    {id: wallId('north-opening-lintel', prefix), center: {x: 0, z: -4}, size: {width: 4, depth: wallThickness}, rotation: 0, height, bottom: openingHeight, openingId: ENLIGHTENMENT_SPATIAL_CONNECTIONS[0].id},
    {id: wallId('east-opening-lintel', prefix), center: {x: 4, z: 0}, size: {width: wallThickness, depth: 4}, rotation: 0, height, bottom: openingHeight, openingId: ENLIGHTENMENT_SPATIAL_CONNECTIONS[1].id},
    {id: wallId('south-opening-lintel', prefix), center: {x: 0, z: 4}, size: {width: 4, depth: wallThickness}, rotation: 0, height, bottom: openingHeight, openingId: ENLIGHTENMENT_SPATIAL_CONNECTIONS[2].id},
    {id: wallId('west-opening-lintel', prefix), center: {x: -4, z: 0}, size: {width: wallThickness, depth: 4}, rotation: 0, height, bottom: openingHeight, openingId: ENLIGHTENMENT_SPATIAL_CONNECTIONS[3].id},
  ];
};

/** Exhibit millwork for Kant's central anchor; separate from the preserved shell. */
export const enlightenmentKantBaffle = (
  prefix = ENLIGHTENMENT_GALLERY_ID,
): MuseumWallDefinition => ({
  id: wallId('kant-critical-baffle', prefix),
  // Keep the display face at z=-2.62, flush with Kant's backing, while using
  // realistic thin exhibit millwork so the north opening has a forgiving
  // walking aisle instead of a merely mathematical collision clearance.
  center: {x: 0, z: -2.66},
  size: {width: 4.4, depth: .08},
  rotation: 0,
  height: ENLIGHTENMENT_HALL_DIMENSIONS.ceilingHeight,
});

export type EnlightenmentInstallationSlot = Readonly<{
  id: string;
  spatialCellId: EnlightenmentRoomId;
  x: number;
  z: number;
  rotationY: number;
  backingWallId: string;
  width: number;
  supplementalViewpointDistance: number;
}>;

const outerWallId = (edge: 'north' | 'south' | 'west' | 'east'): string =>
  `${ENLIGHTENMENT_GALLERY_ID}:${edge}-wall`;

const slot = (
  id: string,
  spatialCellId: EnlightenmentRoomId,
  x: number,
  z: number,
  rotationY: number,
  backingWallId: string,
  width = 3.8,
  supplementalViewpointDistance = 3.05,
): EnlightenmentInstallationSlot => ({
  id,
  spatialCellId,
  x,
  z,
  rotationY,
  backingWallId,
  width,
  supplementalViewpointDistance,
});

export const ENLIGHTENMENT_INSTALLATION_SLOTS = [
  slot('enlightenment-law-institutions:north-west', 'enlightenment-law-institutions', -7, -12.8, 0, outerWallId('north')),
  slot('enlightenment-law-institutions:north-east', 'enlightenment-law-institutions', 7, -12.8, 0, outerWallId('north')),
  slot('enlightenment-law-institutions:west', 'enlightenment-law-institutions', -12.8, -8.5, Math.PI / 2, outerWallId('west')),
  slot('enlightenment-law-institutions:east', 'enlightenment-law-institutions', 12.8, -8.5, -Math.PI / 2, outerWallId('east')),
  slot('enlightenment-law-institutions:south-west', 'enlightenment-law-institutions', -8, -4.8, Math.PI, wallId('north-boundary-west')),
  slot('enlightenment-law-institutions:south-east', 'enlightenment-law-institutions', 8, -4.8, Math.PI, wallId('north-boundary-east')),

  slot('enlightenment-society-freedom:north', 'enlightenment-society-freedom', 9, -3.15, 0, wallId('north-boundary-east')),
  slot('enlightenment-society-freedom:south', 'enlightenment-society-freedom', 9, 3.15, Math.PI, wallId('south-boundary-east')),
  slot('enlightenment-society-freedom:east-north-return', 'enlightenment-society-freedom', 13.2, -3.08, -Math.PI / 2, outerWallId('east'), 1.55, 2.35),
  slot('enlightenment-society-freedom:east-south-return', 'enlightenment-society-freedom', 13.2, 3.08, -Math.PI / 2, outerWallId('east'), 1.55, 2.35),
  slot('enlightenment-society-freedom:west-north-return', 'enlightenment-society-freedom', 4.8, -3.08, Math.PI / 2, wallId('east-boundary-north'), 1.55, 2.35),
  slot('enlightenment-society-freedom:west-south-return', 'enlightenment-society-freedom', 4.8, 3.08, Math.PI / 2, wallId('east-boundary-south'), 1.55, 2.35),

  slot('enlightenment-sentiment-commerce:south-west', 'enlightenment-sentiment-commerce', -7, 12.8, Math.PI, outerWallId('south')),
  slot('enlightenment-sentiment-commerce:south-east', 'enlightenment-sentiment-commerce', 7, 12.8, Math.PI, outerWallId('south')),
  slot('enlightenment-sentiment-commerce:west', 'enlightenment-sentiment-commerce', -12.8, 8.5, Math.PI / 2, outerWallId('west')),
  slot('enlightenment-sentiment-commerce:east', 'enlightenment-sentiment-commerce', 12.8, 8.5, -Math.PI / 2, outerWallId('east')),
  slot('enlightenment-sentiment-commerce:north-west', 'enlightenment-sentiment-commerce', -8, 4.8, 0, wallId('south-boundary-west')),
  slot('enlightenment-sentiment-commerce:north-east', 'enlightenment-sentiment-commerce', 8, 4.8, 0, wallId('south-boundary-east')),

  slot('enlightenment-equality-education:north', 'enlightenment-equality-education', -9, -3.15, 0, wallId('north-boundary-west')),
  slot('enlightenment-equality-education:south', 'enlightenment-equality-education', -9, 3.15, Math.PI, wallId('south-boundary-west')),
  slot('enlightenment-equality-education:west-north-return', 'enlightenment-equality-education', -13.2, -3.08, Math.PI / 2, outerWallId('west'), 1.55, 2.35),
  slot('enlightenment-equality-education:west-south-return', 'enlightenment-equality-education', -13.2, 3.08, Math.PI / 2, outerWallId('west'), 1.55, 2.35),
  slot('enlightenment-equality-education:east-north-return', 'enlightenment-equality-education', -4.8, -3.08, -Math.PI / 2, wallId('west-boundary-north'), 1.55, 2.35),
  slot('enlightenment-equality-education:east-south-return', 'enlightenment-equality-education', -4.8, 3.08, -Math.PI / 2, wallId('west-boundary-south'), 1.55, 2.35),

  // The canonical backing itself forms a display baffle against the north side
  // of the 8 × 8 room; the approved east–west route remains straight at z=0.
  slot('enlightenment-kant-critical:critical-screen', 'enlightenment-kant-critical', 0, -1.78, 0, wallId('kant-critical-baffle'), 3.8, 3.1),
] as const satisfies readonly EnlightenmentInstallationSlot[];

const installationSlotById = new Map(ENLIGHTENMENT_INSTALLATION_SLOTS.map((item) => [item.id, item]));

export const getEnlightenmentInstallationSlot = (slotId: string): EnlightenmentInstallationSlot => {
  const result = installationSlotById.get(slotId);
  if (!result) throw new Error(`Gallery 18 installation slot ${slotId} does not exist.`);
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
    viewpointDistance: authoredSlot.supplementalViewpointDistance,
    scale: 'full' as const,
  };
};

export const ENLIGHTENMENT_PRIMARY_PLACEMENTS = {
  montesquieu: fullScalePlacement('enlightenment-law-institutions:north-west'),
  rousseau: fullScalePlacement('enlightenment-society-freedom:north'),
  'adam-smith': fullScalePlacement('enlightenment-sentiment-commerce:south-west'),
  'mary-astell': fullScalePlacement('enlightenment-equality-education:north'),
  wollstonecraft: fullScalePlacement('enlightenment-equality-education:south'),
  kant: fullScalePlacement('enlightenment-kant-critical:critical-screen'),
} as const satisfies Readonly<Record<EnlightenmentPrimaryExhibitId, {
  x: number;
  z: number;
  rotationY: number;
  slotId: string;
  backingWallId: string;
  viewpointDistance: number;
  scale: 'full';
}>>;

export const ENLIGHTENMENT_PRIMARY_SCALE_FLOOR = Object.freeze({
  bayWidth: 3.8,
  objectWidth: 3.8,
  objectHeight: 3.55,
  footprintHeight: 4.44,
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
  'enlightenment-law-institutions': {x: 0, z: -5.6, yaw: 0, pitch: -.02},
  'enlightenment-society-freedom': {x: 5.6, z: 0, yaw: -Math.PI / 2, pitch: -.02},
  'enlightenment-sentiment-commerce': {x: 0, z: 5.6, yaw: Math.PI, pitch: -.02},
  'enlightenment-equality-education': {x: -5.6, z: 0, yaw: Math.PI / 2, pitch: -.02},
  'enlightenment-kant-critical': {x: 0, z: 1.15, yaw: 0, pitch: -.02},
} as const satisfies Readonly<Record<EnlightenmentRoomId, MuseumPose>>);

export const ENLIGHTENMENT_PRIMARY_CIRCULATION = Object.freeze({
  id: `${ENLIGHTENMENT_GALLERY_ID}:primary-circulation`,
  points: [
    {x: 12, z: 0},
    {x: 4.6, z: 0},
    {x: 3.4, z: 0},
    {x: -3.4, z: 0},
    {x: -4.6, z: 0},
    {x: -12, z: 0},
  ],
  clearanceRadius: .72,
} as const satisfies MuseumCirculationPath);

const assertCuration: (condition: unknown, message: string) => asserts condition = (
  condition,
  message,
) => {
  if (!condition) throw new Error(`Gallery 18 curation contract: ${message}`);
};

export const validateEnlightenmentGalleryCuration = () => {
  assertCuration(Object.keys(ENLIGHTENMENT_ROOM_BOUNDS).length === 5, 'four perimeter rooms and one central Kant room are required.');
  assertCuration(ENLIGHTENMENT_SPATIAL_CONNECTIONS.length === 4, 'the central room must open to all four perimeter rooms.');
  assertCuration(enlightenmentInteriorWalls().length === 8, 'the approved shell has eight collision wall segments.');
  assertCuration(enlightenmentInteriorLintels().length === 4, 'the approved shell has four render-only lintels.');
  assertCuration(enlightenmentKantBaffle().size.width === 4.4, 'Kant needs a real exhibit baffle without changing the shell.');
  assertCuration(ENLIGHTENMENT_INSTALLATION_SLOTS.length === 25, 'the hall must have exactly 25 installations.');
  assertCuration(new Set(ENLIGHTENMENT_INSTALLATION_SLOTS.map(({id}) => id)).size === 25, 'slot IDs must be unique.');
  assertCuration(Object.keys(ENLIGHTENMENT_PRIMARY_PLACEMENTS).length === 6, 'all six canonical primaries need authored placements.');
  for (const roomId of ENLIGHTENMENT_ROOM_ORDER) {
    const expected = roomId === 'enlightenment-kant-critical' ? 1 : 6;
    assertCuration(
      ENLIGHTENMENT_INSTALLATION_SLOTS.filter(({spatialCellId}) => spatialCellId === roomId).length === expected,
      `${roomId} has an incorrect installation count.`,
    );
  }
  return Object.freeze({
    roomCount: 5,
    connectionCount: 4,
    collisionWallCount: 8,
    lintelCount: 4,
    installationCount: 25,
    primaryCount: 6,
    supplementalCount: 19,
  });
};

export const ENLIGHTENMENT_CURATION_VALIDATION = validateEnlightenmentGalleryCuration();
