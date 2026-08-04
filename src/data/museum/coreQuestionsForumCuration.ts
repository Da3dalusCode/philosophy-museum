import type {
  MuseumBounds,
  MuseumCirculationPath,
  MuseumPose,
  MuseumSignDefinition,
  MuseumSpatialConnection,
  MuseumWallDefinition,
} from './museumWorldTypes';

export const CORE_QUESTIONS_FORUM_GALLERY_ID = 'core-questions-forum' as const;

export const CORE_QUESTIONS_FORUM_HALL_DIMENSIONS = Object.freeze({
  width: 28,
  depth: 28,
  ceilingHeight: 6.2,
  wallThickness: .36,
});

export const CORE_QUESTIONS_FORUM_PRIMARY_SCALE_FLOOR = Object.freeze({
  bayWidth: 4.6,
  objectWidth: 3,
  objectHeight: 3.12,
  footprintHeight: 3.28,
});

export const CORE_QUESTIONS_FORUM_CELL_ORDER = [
  'forum-reality-knowledge-bay',
  'forum-mind-language-bay',
  'forum-science-aesthetics-bay',
  'forum-practical-religion-bay',
] as const;

export const CORE_QUESTIONS_FORUM_ZONE_ORDER = [
  'core-reality-being',
  'core-knowledge',
  'core-mind-self',
  'core-logic-language',
  'core-science',
  'core-aesthetics',
  'core-ethics-portal',
  'core-political-portal',
  'core-religion',
] as const;

export type CoreQuestionsForumCellId = (typeof CORE_QUESTIONS_FORUM_CELL_ORDER)[number];

export const CORE_QUESTIONS_FORUM_CELL_BOUNDS = Object.freeze({
  'forum-reality-knowledge-bay': {minX: -14, maxX: 0, minZ: -14, maxZ: 0},
  'forum-mind-language-bay': {minX: 0, maxX: 14, minZ: -14, maxZ: 0},
  'forum-science-aesthetics-bay': {minX: -14, maxX: 0, minZ: 0, maxZ: 14},
  'forum-practical-religion-bay': {minX: 0, maxX: 14, minZ: 0, maxZ: 14},
} as const satisfies Readonly<Record<CoreQuestionsForumCellId, MuseumBounds>>);

export const CORE_QUESTIONS_FORUM_CELL_TITLES = Object.freeze({
  'forum-reality-knowledge-bay': 'Reality & Knowledge',
  'forum-mind-language-bay': 'Mind, Logic & Language',
  'forum-science-aesthetics-bay': 'Science & Aesthetics',
  'forum-practical-religion-bay': 'Ethics, Political Life & Religion',
} as const satisfies Readonly<Record<CoreQuestionsForumCellId, string>>);

export const CORE_QUESTIONS_FORUM_ZONE_TO_CELL = Object.freeze({
  'core-reality-being': 'forum-reality-knowledge-bay',
  'core-knowledge': 'forum-reality-knowledge-bay',
  'core-mind-self': 'forum-mind-language-bay',
  'core-logic-language': 'forum-mind-language-bay',
  'core-science': 'forum-science-aesthetics-bay',
  'core-aesthetics': 'forum-science-aesthetics-bay',
  'core-ethics-portal': 'forum-practical-religion-bay',
  'core-political-portal': 'forum-practical-religion-bay',
  'core-religion': 'forum-practical-religion-bay',
} as const);

export const getCoreQuestionsForumCellIdForZone = (
  zoneId: string,
): CoreQuestionsForumCellId => {
  const result = CORE_QUESTIONS_FORUM_ZONE_TO_CELL[
    zoneId as keyof typeof CORE_QUESTIONS_FORUM_ZONE_TO_CELL
  ];
  if (!result) throw new Error(`Gallery 06 zone ${zoneId} has no physical question bay.`);
  return result;
};

export const CORE_QUESTIONS_FORUM_SPATIAL_CONNECTIONS = [
  {
    id: 'threshold:forum-reality-knowledge-bay:forum-mind-language-bay',
    fromCellId: 'forum-reality-knowledge-bay',
    toCellId: 'forum-mind-language-bay',
    openingBounds: {minX: -.3, maxX: .3, minZ: -14, maxZ: 0},
  },
  {
    id: 'threshold:forum-science-aesthetics-bay:forum-practical-religion-bay',
    fromCellId: 'forum-science-aesthetics-bay',
    toCellId: 'forum-practical-religion-bay',
    openingBounds: {minX: -.3, maxX: .3, minZ: 0, maxZ: 14},
  },
  {
    id: 'threshold:forum-reality-knowledge-bay:forum-science-aesthetics-bay',
    fromCellId: 'forum-reality-knowledge-bay',
    toCellId: 'forum-science-aesthetics-bay',
    openingBounds: {minX: -14, maxX: 0, minZ: -.3, maxZ: .3},
  },
  {
    id: 'threshold:forum-mind-language-bay:forum-practical-religion-bay',
    fromCellId: 'forum-mind-language-bay',
    toCellId: 'forum-practical-religion-bay',
    openingBounds: {minX: 0, maxX: 14, minZ: -.3, maxZ: .3},
  },
] as const satisfies readonly MuseumSpatialConnection[];

const WALL = CORE_QUESTIONS_FORUM_HALL_DIMENSIONS.wallThickness;
const HEIGHT = CORE_QUESTIONS_FORUM_HALL_DIMENSIONS.ceilingHeight;

const forumWallId = (
  id:
    | 'v-west-north'
    | 'v-east-north'
    | 'v-west-south'
    | 'v-east-south'
    | 'h-north-west'
    | 'h-south-west'
    | 'h-north-east'
    | 'h-south-east',
  prefix: string = CORE_QUESTIONS_FORUM_GALLERY_ID,
): string => `${prefix}:forum-${id}`;

const outerWallId = (
  edge: 'north' | 'south' | 'west' | 'east',
): string => `${CORE_QUESTIONS_FORUM_GALLERY_ID}:${edge}-wall`;

/**
 * Eight repeated return walls define four corner bays while preserving the
 * Forum's ten-metre north/south crosscut and full east/west approach. There
 * are deliberately no one-off exhibit baffles inside the walking cross.
 */
export const coreQuestionsForumInteriorWalls = (
  prefix: string = CORE_QUESTIONS_FORUM_GALLERY_ID,
): readonly MuseumWallDefinition[] => [
  {id: forumWallId('v-west-north', prefix), center: {x: -5, z: -11.333}, size: {width: WALL, depth: 5.333}, rotation: 0, height: HEIGHT},
  {id: forumWallId('v-east-north', prefix), center: {x: 5, z: -11.333}, size: {width: WALL, depth: 5.333}, rotation: 0, height: HEIGHT},
  {id: forumWallId('v-west-south', prefix), center: {x: -5, z: 11.333}, size: {width: WALL, depth: 5.333}, rotation: 0, height: HEIGHT},
  {id: forumWallId('v-east-south', prefix), center: {x: 5, z: 11.333}, size: {width: WALL, depth: 5.333}, rotation: 0, height: HEIGHT},
  {id: forumWallId('h-north-west', prefix), center: {x: -11.333, z: -4.667}, size: {width: 5.333, depth: WALL}, rotation: 0, height: HEIGHT},
  {id: forumWallId('h-south-west', prefix), center: {x: -11.333, z: 4.667}, size: {width: 5.333, depth: WALL}, rotation: 0, height: HEIGHT},
  {id: forumWallId('h-north-east', prefix), center: {x: 11.333, z: -4.667}, size: {width: 5.333, depth: WALL}, rotation: 0, height: HEIGHT},
  {id: forumWallId('h-south-east', prefix), center: {x: 11.333, z: 4.667}, size: {width: 5.333, depth: WALL}, rotation: 0, height: HEIGHT},
];

export type CoreQuestionsForumInstallationFace =
  | 'outer-primary'
  | 'room-return'
  | 'cross-return';

export type CoreQuestionsForumInstallationSlot = Readonly<{
  id: string;
  spatialCellId: CoreQuestionsForumCellId;
  x: number;
  z: number;
  rotationY: number;
  backingWallId: string;
  face: CoreQuestionsForumInstallationFace;
  supplementalViewpointDistance: number;
}>;

const slot = (
  id: string,
  spatialCellId: CoreQuestionsForumCellId,
  x: number,
  z: number,
  rotationY: number,
  backingWallId: string,
  face: CoreQuestionsForumInstallationFace,
): CoreQuestionsForumInstallationSlot => ({
  id,
  spatialCellId,
  x,
  z,
  rotationY,
  backingWallId,
  face,
  supplementalViewpointDistance: face === 'cross-return' ? 2.25 : 2.92,
});

/**
 * The complete 25-installation contract. The repeated 6/6/7/6 rhythm is the
 * same compact crossroads model proven in Galleries 09 and 14. Every slot is
 * backed by either the perimeter or one of the eight return walls.
 */
export const CORE_QUESTIONS_FORUM_INSTALLATION_SLOTS = [
  // Northwest · Reality & Knowledge · 6
  slot('forum-nw:north-outer', 'forum-reality-knowledge-bay', -9, -12.8, 0, outerWallId('north'), 'outer-primary'),
  slot('forum-nw:west-outer', 'forum-reality-knowledge-bay', -12.8, -9, Math.PI / 2, outerWallId('west'), 'outer-primary'),
  slot('forum-nw:east-room-face', 'forum-reality-knowledge-bay', -6.153, -10.17, -Math.PI / 2, forumWallId('v-west-north'), 'room-return'),
  slot('forum-nw:east-cross-face', 'forum-reality-knowledge-bay', -3.853, -10.17, Math.PI / 2, forumWallId('v-west-north'), 'cross-return'),
  slot('forum-nw:south-room-face', 'forum-reality-knowledge-bay', -10.17, -5.82, Math.PI, forumWallId('h-north-west'), 'room-return'),
  slot('forum-nw:south-cross-face', 'forum-reality-knowledge-bay', -10.17, -3.52, 0, forumWallId('h-north-west'), 'cross-return'),

  // Northeast · Mind, Logic & Language · 6
  slot('forum-ne:north-outer', 'forum-mind-language-bay', 9, -12.8, 0, outerWallId('north'), 'outer-primary'),
  slot('forum-ne:east-outer', 'forum-mind-language-bay', 12.8, -9, -Math.PI / 2, outerWallId('east'), 'outer-primary'),
  slot('forum-ne:west-room-face', 'forum-mind-language-bay', 6.153, -10.17, Math.PI / 2, forumWallId('v-east-north'), 'room-return'),
  slot('forum-ne:west-cross-face', 'forum-mind-language-bay', 3.853, -10.17, -Math.PI / 2, forumWallId('v-east-north'), 'cross-return'),
  slot('forum-ne:south-room-face', 'forum-mind-language-bay', 10.17, -5.82, Math.PI, forumWallId('h-north-east'), 'room-return'),
  slot('forum-ne:south-cross-face', 'forum-mind-language-bay', 10.17, -3.52, 0, forumWallId('h-north-east'), 'cross-return'),

  // Southwest · Science & Aesthetics · 7
  slot('forum-sw:west-outer-north', 'forum-science-aesthetics-bay', -12.8, 7.25, Math.PI / 2, outerWallId('west'), 'outer-primary'),
  slot('forum-sw:west-outer-south', 'forum-science-aesthetics-bay', -12.8, 11.55, Math.PI / 2, outerWallId('west'), 'outer-primary'),
  slot('forum-sw:south-outer', 'forum-science-aesthetics-bay', -9, 12.8, Math.PI, outerWallId('south'), 'outer-primary'),
  slot('forum-sw:east-room-face', 'forum-science-aesthetics-bay', -6.153, 10.17, -Math.PI / 2, forumWallId('v-west-south'), 'room-return'),
  slot('forum-sw:east-cross-face', 'forum-science-aesthetics-bay', -3.853, 10.17, Math.PI / 2, forumWallId('v-west-south'), 'cross-return'),
  slot('forum-sw:north-room-face', 'forum-science-aesthetics-bay', -10.17, 5.82, 0, forumWallId('h-south-west'), 'room-return'),
  slot('forum-sw:north-cross-face', 'forum-science-aesthetics-bay', -10.17, 3.52, Math.PI, forumWallId('h-south-west'), 'cross-return'),

  // Southeast · Ethics, Political Life & Religion · 6
  slot('forum-se:east-outer', 'forum-practical-religion-bay', 12.8, 9, -Math.PI / 2, outerWallId('east'), 'outer-primary'),
  slot('forum-se:south-outer', 'forum-practical-religion-bay', 9, 12.8, Math.PI, outerWallId('south'), 'outer-primary'),
  slot('forum-se:west-room-face', 'forum-practical-religion-bay', 6.153, 10.17, Math.PI / 2, forumWallId('v-east-south'), 'room-return'),
  slot('forum-se:west-cross-face', 'forum-practical-religion-bay', 3.853, 10.17, -Math.PI / 2, forumWallId('v-east-south'), 'cross-return'),
  slot('forum-se:north-room-face', 'forum-practical-religion-bay', 10.17, 5.82, 0, forumWallId('h-south-east'), 'room-return'),
  slot('forum-se:north-cross-face', 'forum-practical-religion-bay', 10.17, 3.52, Math.PI, forumWallId('h-south-east'), 'cross-return'),
] as const satisfies readonly CoreQuestionsForumInstallationSlot[];

const installationSlotById = new Map(
  CORE_QUESTIONS_FORUM_INSTALLATION_SLOTS.map((item) => [item.id, item]),
);

export const getCoreQuestionsForumInstallationSlot = (
  slotId: string,
): CoreQuestionsForumInstallationSlot => {
  const result = installationSlotById.get(slotId);
  if (!result) throw new Error(`Gallery 06 installation slot ${slotId} does not exist.`);
  return result;
};

export type CoreQuestionsForumPlacement = Readonly<{
  x: number;
  z: number;
  rotationY: number;
  spatialCellId: CoreQuestionsForumCellId;
  slotId: string;
  backingWallId: string;
  viewpointDistance: number;
  scale: 'compact';
}>;

const compactPlacement = (slotId: string): CoreQuestionsForumPlacement => {
  const authoredSlot = getCoreQuestionsForumInstallationSlot(slotId);
  return {
    x: authoredSlot.x,
    z: authoredSlot.z,
    rotationY: authoredSlot.rotationY,
    spatialCellId: authoredSlot.spatialCellId,
    slotId: authoredSlot.id,
    backingWallId: authoredSlot.backingWallId,
    viewpointDistance: authoredSlot.supplementalViewpointDistance,
    scale: 'compact',
  };
};

export const CORE_QUESTIONS_FORUM_PRIMARY_PLACEMENTS: Readonly<
  Record<string, CoreQuestionsForumPlacement>
> = {
  metaphysics: compactPlacement('forum-nw:north-outer'),
  ontology: compactPlacement('forum-nw:west-outer'),
  whitehead: compactPlacement('forum-nw:east-room-face'),
  epistemology: compactPlacement('forum-nw:south-room-face'),
  'philosophy-of-mind': compactPlacement('forum-ne:north-outer'),
  'thomas-nagel': compactPlacement('forum-ne:east-outer'),
  'jiddu-krishnamurti': compactPlacement('forum-ne:west-room-face'),
  logic: compactPlacement('forum-ne:south-room-face'),
  'philosophy-of-language': compactPlacement('forum-ne:west-cross-face'),
  'philosophy-of-science': compactPlacement('forum-sw:west-outer-north'),
  kuhn: compactPlacement('forum-sw:west-outer-south'),
  aesthetics: compactPlacement('forum-sw:south-outer'),
  carnap: compactPlacement('forum-sw:east-room-face'),
  popper: compactPlacement('forum-sw:north-room-face'),
  'philosophy-of-religion': compactPlacement('forum-se:east-outer'),
};

export const CORE_QUESTIONS_FORUM_CELL_ENTRY_POSES = Object.freeze({
  'forum-reality-knowledge-bay': {x: -8.2, z: -8.2, yaw: .408, pitch: -.02},
  'forum-mind-language-bay': {x: 8.2, z: -8.2, yaw: -.408, pitch: -.02},
  'forum-science-aesthetics-bay': {x: -8.2, z: 8.2, yaw: 1.979, pitch: -.02},
  'forum-practical-religion-bay': {x: 8.2, z: 8.2, yaw: -1.979, pitch: -.02},
} as const satisfies Readonly<Record<CoreQuestionsForumCellId, MuseumPose>>);

/** Directory views retain all nine intellectual routes inside four physical bays. */
export const CORE_QUESTIONS_FORUM_ROOM_ENTRY_POSES: Readonly<Record<string, MuseumPose>> = {
  'core-reality-being': {x: -9, z: -8.4, yaw: 0, pitch: -.02},
  'core-knowledge': {x: -11.333, z: -10.22, yaw: Math.PI, pitch: -.02},
  'core-mind-self': {x: 9, z: -8.4, yaw: 0, pitch: -.02},
  'core-logic-language': {x: 8.4, z: -7.25, yaw: -Math.PI / 2, pitch: -.02},
  'core-science': {x: -8.4, z: 7.25, yaw: Math.PI / 2, pitch: -.02},
  'core-aesthetics': {x: -9, z: 8.4, yaw: Math.PI, pitch: -.02},
  'core-ethics-portal': {x: 9, z: 9.75, yaw: Math.PI, pitch: -.02},
  'core-political-portal': {x: 11.333, z: 8.45, yaw: 0, pitch: -.02},
  'core-religion': {x: 9.75, z: 9, yaw: -Math.PI / 2, pitch: -.02},
};

type ForumSignCopy = Readonly<{
  title: string;
  kicker: string;
  subtitle: string;
  position: {x: number; y: number; z: number};
  rotationY: number;
}>;

const ROOM_SIGNS: readonly ForumSignCopy[] = [
  {title: 'Reality & Being', kicker: 'Forum route 01', subtitle: 'Existence · categories · process', position: {x: -9, y: 4.92, z: -13.78}, rotationY: 0},
  {title: 'Knowledge', kicker: 'Forum route 02', subtitle: 'Perception · inference · reliable cognition', position: {x: -13.78, y: 4.92, z: -9}, rotationY: Math.PI / 2},
  {title: 'Mind & Self', kicker: 'Forum route 03', subtitle: 'Consciousness · attention · selfhood', position: {x: 9, y: 4.92, z: -13.78}, rotationY: 0},
  {title: 'Logic & Language', kicker: 'Forum route 04', subtitle: 'Inference · names · meaning', position: {x: 13.78, y: 4.92, z: -8.7}, rotationY: -Math.PI / 2},
  {title: 'Science', kicker: 'Forum route 05', subtitle: 'Evidence · models · criticism · change', position: {x: -13.78, y: 4.92, z: 8.7}, rotationY: Math.PI / 2},
  {title: 'Aesthetics', kicker: 'Forum route 06', subtitle: 'Art · form · music · judgment', position: {x: -9, y: 4.92, z: 13.78}, rotationY: Math.PI},
  {title: 'Ethics', kicker: 'Forum route 07', subtitle: 'Ritual · cultivation · humane judgment', position: {x: 9, y: 4.92, z: 13.78}, rotationY: Math.PI},
  {title: 'Political Life', kicker: 'Forum route 08', subtitle: 'Civic order · law · interpretation', position: {x: 11.333, y: 4.92, z: 4.87}, rotationY: 0},
  {title: 'Philosophy of Religion', kicker: 'Forum route 09', subtitle: 'Reason · revelation · critique', position: {x: 13.78, y: 4.92, z: 9}, rotationY: -Math.PI / 2},
];

export const coreQuestionsForumSigns = (): readonly MuseumSignDefinition[] => [
  {
    id: `${CORE_QUESTIONS_FORUM_GALLERY_ID}:entrance-sign`,
    kind: 'entrance',
    title: 'Core Questions Forum',
    kicker: 'Four question bays · ↑ North · Visitor map (M)',
    subtitle: 'West: Gallery 10 · Latin Christian & Scholastic Traditions | East: Gallery 12 · Renaissance, Political Order, and New Science',
    position: {x: 0, y: 4.72, z: -13.78},
    rotationY: 0,
    width: 6.6,
    height: 1.08,
  },
  ...ROOM_SIGNS.map((sign, index) => ({
    id: `${CORE_QUESTIONS_FORUM_GALLERY_ID}:route-sign-${index + 1}`,
    kind: 'zone' as const,
    title: sign.title,
    kicker: sign.kicker,
    subtitle: sign.subtitle,
    position: sign.position,
    rotationY: sign.rotationY,
    width: 3.45,
    height: .68,
  })),
];

export const CORE_QUESTIONS_FORUM_PRIMARY_CIRCULATION = Object.freeze({
  id: `${CORE_QUESTIONS_FORUM_GALLERY_ID}:primary-circulation`,
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
