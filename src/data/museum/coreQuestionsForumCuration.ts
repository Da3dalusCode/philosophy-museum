import type {
  MuseumPose,
  MuseumSignDefinition,
  MuseumWallDefinition,
} from './museumWorldTypes';

export const CORE_QUESTIONS_FORUM_GALLERY_ID = 'core-questions-forum' as const;

export type CoreQuestionsForumPlacement = Readonly<{
  x: number;
  z: number;
  rotationY: number;
}>;

/**
 * Gallery 06 is a crossroads rather than a sequence. These authored positions
 * keep every primary at the Forum's full 3.8 m scale while preserving the five
 * live approaches and the open central cross.
 */
export const CORE_QUESTIONS_FORUM_PRIMARY_PLACEMENTS: Readonly<
  Record<string, CoreQuestionsForumPlacement>
> = {
  metaphysics: {x: -9.33, z: -12.8, rotationY: 0},
  ontology: {x: -12.8, z: -9, rotationY: Math.PI / 2},
  whitehead: {x: -6.153, z: -11.33, rotationY: -Math.PI / 2},
  epistemology: {x: -3.853, z: -11.33, rotationY: Math.PI / 2},
  'philosophy-of-mind': {x: 12.8, z: -8.8, rotationY: -Math.PI / 2},
  'thomas-nagel': {x: 11.33, z: -5.82, rotationY: Math.PI},
  'jiddu-krishnamurti': {x: 7.4, z: -8.4, rotationY: 0},
  logic: {x: -11.33, z: -3.52, rotationY: 0},
  'philosophy-of-language': {x: -11.33, z: 3.52, rotationY: Math.PI},
  aesthetics: {x: -2.62, z: -2.55, rotationY: 0},
  'philosophy-of-science': {x: 11.33, z: -3.52, rotationY: 0},
  carnap: {x: 5.45, z: -2.68, rotationY: Math.PI / 2},
  popper: {x: 5.45, z: 2.68, rotationY: Math.PI / 2},
  kuhn: {x: 11.33, z: 3.52, rotationY: Math.PI},
  'philosophy-of-religion': {x: 12.8, z: 8.45, rotationY: -Math.PI / 2},
};

/**
 * Portal rooms do not have a modern field anchor. Their staged views therefore
 * need to reveal the paired historical lenses instead of facing an unused
 * perimeter wall.
 */
export const CORE_QUESTIONS_FORUM_ROOM_ENTRY_POSES: Readonly<Record<string, MuseumPose>> = {
  'core-ethics-portal': {x: -9.45, z: 9.15, yaw: .72, pitch: -.02},
};

const WALL = .36;
const HEIGHT = 6.2;

/**
 * Four central seams stay fully open. The north/south supports begin at the
 * finished edges of the 10 m crosscut opening and retain their full outer-wall
 * joins; the paired installations move with those supports. At each peripheral
 * seam, the remaining 5.33 m wall is wide enough for a full primary bay. The
 * short baffles support installations that cannot use the perimeter.
 */
export const coreQuestionsForumInteriorWalls = (
  prefix: string,
): readonly MuseumWallDefinition[] => [
  // North row: support walls north of offset openings.
  {id: `${prefix}:forum-v-west-north`, center: {x: -5, z: -11.333}, size: {width: WALL, depth: 5.333}, rotation: 0, height: HEIGHT},
  {id: `${prefix}:forum-v-east-north`, center: {x: 5, z: -11.333}, size: {width: WALL, depth: 5.333}, rotation: 0, height: HEIGHT},
  // South row: support walls south of offset openings.
  {id: `${prefix}:forum-v-west-south`, center: {x: -5, z: 11.333}, size: {width: WALL, depth: 5.333}, rotation: 0, height: HEIGHT},
  {id: `${prefix}:forum-v-east-south`, center: {x: 5, z: 11.333}, size: {width: WALL, depth: 5.333}, rotation: 0, height: HEIGHT},
  // West column: support walls west of offset openings.
  {id: `${prefix}:forum-h-north-west`, center: {x: -11.333, z: -4.667}, size: {width: 5.333, depth: WALL}, rotation: 0, height: HEIGHT},
  {id: `${prefix}:forum-h-south-west`, center: {x: -11.333, z: 4.667}, size: {width: 5.333, depth: WALL}, rotation: 0, height: HEIGHT},
  // East column: support walls east of offset openings.
  {id: `${prefix}:forum-h-north-east`, center: {x: 11.333, z: -4.667}, size: {width: 5.333, depth: WALL}, rotation: 0, height: HEIGHT},
  {id: `${prefix}:forum-h-south-east`, center: {x: 11.333, z: 4.667}, size: {width: 5.333, depth: WALL}, rotation: 0, height: HEIGHT},
  // Authored display baffles. Their alternating positions leave a legible cross.
  {id: `${prefix}:forum-mind-baffle`, center: {x: 7.4, z: -9.6}, size: {width: 4.65, depth: WALL}, rotation: 0, height: 5.45},
  {id: `${prefix}:forum-logic-baffle`, center: {x: -7, z: 3.05}, size: {width: 3.7, depth: WALL}, rotation: 0, height: 5.45},
  {id: `${prefix}:forum-aesthetics-north-baffle`, center: {x: -2.62, z: -3.78}, size: {width: 3.9, depth: WALL}, rotation: 0, height: 5.45},
  {id: `${prefix}:forum-aesthetics-south-baffle`, center: {x: 2.45, z: 3.55}, size: {width: 3.5, depth: WALL}, rotation: 0, height: 5.15},
  {id: `${prefix}:forum-science-north-baffle`, center: {x: 4.4, z: -2.68}, size: {width: WALL, depth: 3.8}, rotation: 0, height: 5.45},
  {id: `${prefix}:forum-science-south-baffle`, center: {x: 4.4, z: 2.68}, size: {width: WALL, depth: 3.8}, rotation: 0, height: 5.45},
  {id: `${prefix}:forum-avicenna-baffle`, center: {x: 8.095, z: 1.82}, size: {width: 3.4, depth: .2}, rotation: 0, height: 5.15},
];

type ForumSignCopy = Readonly<{
  title: string;
  kicker: string;
  subtitle: string;
  position: {x: number; y: number; z: number};
  rotationY: number;
  width?: number;
  height?: number;
}>;

const ROOM_SIGNS: readonly ForumSignCopy[] = [
  {title: 'Reality & Being', kicker: 'Forum route 01', subtitle: 'Routes: existence · categories · process', position: {x: -9.33, y: 4.92, z: -13.78}, rotationY: 0},
  {title: 'Knowledge', kicker: 'Forum route 02', subtitle: 'Routes: perception · inference · reliable cognition', position: {x: -4.803, y: 4.92, z: -11.33}, rotationY: Math.PI / 2},
  {title: 'Mind & Self', kicker: 'Forum route 03', subtitle: 'Routes: consciousness · attention · selfhood', position: {x: 11.33, y: 4.92, z: -4.87}, rotationY: Math.PI},
  {title: 'Logic & Language', kicker: 'Forum route 04', subtitle: 'Routes: inference · names · meaning', position: {x: -11.33, y: 4.92, z: -4.47}, rotationY: 0},
  {title: 'Aesthetics', kicker: 'Forum route 05', subtitle: 'Routes: art · form · music · judgment', position: {x: -2.62, y: 4.72, z: -3.57}, rotationY: 0},
  {title: 'Science', kicker: 'Forum route 06', subtitle: 'Routes: evidence · models · criticism · change', position: {x: 11.33, y: 4.92, z: -4.47}, rotationY: 0},
  {title: 'Ethics', kicker: 'Forum route 07 · comparative portal', subtitle: 'Ritual · cultivation · humane judgment', position: {x: -9.33, y: 3.45, z: 13.78}, rotationY: Math.PI, width: 5.6, height: 1.08},
  {title: 'Political Life', kicker: 'Forum route 08', subtitle: 'Routes: civic order · law · interpretation', position: {x: -4.803, y: 4.92, z: 11.33}, rotationY: Math.PI / 2},
  {title: 'Philosophy of Religion', kicker: 'Forum route 09', subtitle: 'Routes: reason · revelation · critique', position: {x: 13.78, y: 4.82, z: 8.45}, rotationY: -Math.PI / 2},
];

export const coreQuestionsForumSigns = (): readonly MuseumSignDefinition[] => [
  {
    id: `${CORE_QUESTIONS_FORUM_GALLERY_ID}:entrance-sign`,
    kind: 'entrance',
    title: 'Core Questions Forum',
    kicker: 'Crosscut · ↑ North · Visitor map (M)',
    subtitle: 'West: Gallery 13 · Latin Christian & Scholastic Traditions | East: Gallery 02 · Renaissance, Political Order, and New Science',
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
    width: sign.width ?? 3.65,
    height: sign.height ?? .68,
  })),
];

export const CORE_QUESTIONS_FORUM_PRIMARY_CIRCULATION = [
  {x: -12, z: 0},
  {x: 0, z: 0},
  {x: 12, z: 0},
  {x: 0, z: 0},
  {x: 0, z: -12},
  {x: 0, z: 0},
  {x: 0, z: 12},
] as const;
