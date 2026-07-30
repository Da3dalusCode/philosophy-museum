import type {MuseumWallDefinition} from './museumWorldTypes';

export const COLONIALISM_RACE_LIBERATION_GALLERY_ID = 'colonialism-race-liberation' as const;

export const COLONIALISM_RACE_LIBERATION_HALL_DIMENSIONS = Object.freeze({
  width: 24,
  depth: 56,
  ceilingHeight: 5.8,
  wallThickness: .36,
  openingWidth: 4,
  openingHeight: 3.2,
});

export type ColonialismRaceLiberationRoomId =
  | 'colonial-embodiment-liberation'
  | 'colonial-black-feminism-abolition'
  | 'colonial-context-reserve';

/**
 * Gallery 26 preserves the approved 24 × 56 metre, three-room sequence and
 * north-to-south visit. Fanon anchors the first room. Davis and hooks receive
 * equal, opposite full-scale walls in the second so adjacency invites
 * comparison without collapsing their different projects. The final room has
 * no invented canonical primary: Césaire and Wynter occupy the outer walls as
 * full-scale contextual anchors while all six installations remain secondary.
 */
export const COLONIALISM_RACE_LIBERATION_PRIMARY_PLACEMENTS = {
  fanon: {x: -10.85, z: -18.6667, rotationY: Math.PI / 2},
  'angela-davis': {x: -10.85, z: 0, rotationY: Math.PI / 2},
  'bell-hooks': {x: 10.85, z: 0, rotationY: -Math.PI / 2},
} as const;

export const COLONIALISM_RACE_LIBERATION_CONTEXTUAL_ANCHOR_PLACEMENTS = {
  'cesaire-colonialism-thingification': {x: -10.85, z: 18.6667, rotationY: Math.PI / 2},
  'wynter-humanism-coloniality': {x: 10.85, z: 18.6667, rotationY: -Math.PI / 2},
} as const;

export const COLONIALISM_RACE_LIBERATION_ROOM_ENTRY_POSES = {
  'colonial-embodiment-liberation': {x: -3.5, z: -18.6667, yaw: Math.PI / 2, pitch: -.02},
  'colonial-black-feminism-abolition': {x: -3.5, z: 0, yaw: Math.PI / 2, pitch: -.02},
  'colonial-context-reserve': {x: -3.5, z: 18.6667, yaw: Math.PI / 2, pitch: -.02},
} as const satisfies Readonly<Record<ColonialismRaceLiberationRoomId, {
  x: number;
  z: number;
  yaw: number;
  pitch: number;
}>>;

export const COLONIALISM_RACE_LIBERATION_ROOM_SIGN_COPY = {
  'colonial-embodiment-liberation': {
    kicker: 'Room 01 · Colonial rule enters body, clinic, and struggle',
    title: 'Fanon: Racialization, Psychiatry, and Liberation',
    subtitle: 'Racialization, psychiatry, revolution, and national consciousness connect lived experience to colonial institutions.',
  },
  'colonial-black-feminism-abolition': {
    kicker: 'Room 02 · Interlocking domination demands different methods',
    title: 'Davis and hooks: Abolition, Pedagogy, and Everyday Transformation',
    subtitle: 'Davis’s abolition and hooks’s cultural criticism, pedagogy, and ethics of love meet without collapsing their distinct projects.',
  },
  'colonial-context-reserve': {
    kicker: 'Room 03 · Distinct routes through empire and its afterlives',
    title: 'Anticolonial, Africana, Postcolonial, and Decolonial Continuities',
    subtitle: 'Césaire, Du Bois, Said, Spivak, Ngũgĩ, and Wynter trace distinct routes through empire; adjacency does not make them one school.',
  },
} as const satisfies Readonly<Record<ColonialismRaceLiberationRoomId, {
  title: string;
  kicker: string;
  subtitle: string;
}>>;

/** Render-only lintels restore the wall above both walkable room thresholds. */
export const colonialismRaceLiberationInteriorLintels = (
  prefix = COLONIALISM_RACE_LIBERATION_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {
    ceilingHeight,
    openingHeight,
    wallThickness,
    openingWidth,
  } = COLONIALISM_RACE_LIBERATION_HALL_DIMENSIONS;
  const height = ceilingHeight - openingHeight;
  return [
    {
      id: `${prefix}:embodiment-black-feminism-lintel`,
      center: {x: 0, z: -9.333333},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:colonial-embodiment-liberation:colonial-black-feminism-abolition',
    },
    {
      id: `${prefix}:black-feminism-continuities-lintel`,
      center: {x: 0, z: 9.333333},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:colonial-black-feminism-abolition:colonial-context-reserve',
    },
  ];
};
