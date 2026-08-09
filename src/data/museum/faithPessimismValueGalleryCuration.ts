import type {MuseumWallDefinition} from './museumWorldTypes';

export const FAITH_PESSIMISM_VALUE_GALLERY_ID = 'faith-pessimism-life-value' as const;

export const FAITH_PESSIMISM_VALUE_HALL_DIMENSIONS = Object.freeze({
  width: 24,
  depth: 56,
  ceilingHeight: 5.8,
  wallThickness: .36,
  openingWidth: 4,
  openingHeight: 3.2,
});

/**
 * Gallery 18 preserves the approved 24 × 56 metre three-room sequence. The
 * middle room pairs Kierkegaard and Dostoevsky on opposing outer walls; the
 * remaining faces hold distinct work, context, and reception installations.
 */
export const FAITH_PESSIMISM_VALUE_PRIMARY_PLACEMENTS = {
  schopenhauer: {x: -10.85, z: -18.6667, rotationY: Math.PI / 2},
  kierkegaard: {x: -10.85, z: 0, rotationY: Math.PI / 2},
  dostoevsky: {x: 10.85, z: 0, rotationY: -Math.PI / 2},
  nietzsche: {x: -10.85, z: 18.6667, rotationY: Math.PI / 2},
} as const;

export const FAITH_PESSIMISM_VALUE_ROOM_ENTRY_POSES = {
  'nineteenth-will-pessimism': {x: -3.5, z: -18.6667, yaw: Math.PI / 2, pitch: -.02},
  'nineteenth-faith-subjectivity': {x: -3.5, z: 0, yaw: Math.PI / 2, pitch: -.02},
  'nineteenth-genealogy-value': {x: -3.5, z: 18.6667, yaw: Math.PI / 2, pitch: -.02},
} as const;

export const FAITH_PESSIMISM_VALUE_ROOM_SIGN_COPY = {
  'nineteenth-will-pessimism': {
    kicker: 'Room 01 · Representation, striving, and suffering',
    title: 'Schopenhauer: The World and the Will',
    subtitle: 'Embodied striving, compassion, art, music, ascetic release, and cross-cultural reading make pessimism an ethical and aesthetic problem—not a mood.',
  },
  'nineteenth-faith-subjectivity': {
    kicker: 'Room 02 · Choosing without a system’s guarantee',
    title: 'Kierkegaard and Dostoevsky: Freedom Put at Risk',
    subtitle: 'Pseudonyms and polyphonic voices test anxiety, faith, rational revolt, guilt, innocent suffering, active love, and the difficult responsibility of becoming a self among others.',
  },
  'nineteenth-genealogy-value': {
    kicker: 'Room 03 · Values acquire histories',
    title: 'Nietzsche: Genealogy, Nihilism, and Affirmation',
    subtitle: 'Tragedy, perspectivism, ressentiment, the death of God, recurrence, value creation, and a contested archive turn philosophy into diagnosis and experiment.',
  },
} as const;

/** Render-only lintels restore the wall above the two walkable room thresholds. */
export const faithPessimismValueInteriorLintels = (
  prefix = FAITH_PESSIMISM_VALUE_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {
    ceilingHeight,
    openingHeight,
    wallThickness,
    openingWidth,
  } = FAITH_PESSIMISM_VALUE_HALL_DIMENSIONS;
  const height = ceilingHeight - openingHeight;
  return [
    {
      id: `${prefix}:will-faith-lintel`,
      center: {x: 0, z: -9.333333},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:nineteenth-will-pessimism:nineteenth-faith-subjectivity',
    },
    {
      id: `${prefix}:faith-value-lintel`,
      center: {x: 0, z: 9.333333},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:nineteenth-faith-subjectivity:nineteenth-genealogy-value',
    },
  ];
};
