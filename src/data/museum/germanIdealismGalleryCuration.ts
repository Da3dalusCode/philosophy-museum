import type {MuseumWallDefinition} from './museumWorldTypes';

export const GERMAN_IDEALISM_GALLERY_ID = 'german-idealism-afterlives' as const;

export const GERMAN_IDEALISM_HALL_DIMENSIONS = Object.freeze({
  width: 24,
  depth: 56,
  ceilingHeight: 5.8,
  wallThickness: .36,
  openingWidth: 4,
  openingHeight: 3.2,
});

/**
 * Gallery 19 preserves its approved 24 × 56 metre, four-room shell. The branch
 * and Fichte share equal full-scale outer walls in the opening room; Schelling
 * and Hegel anchor the next two rooms; the final room remains a contextual
 * afterlives room without inventing additional primary assignments.
 */
export const GERMAN_IDEALISM_PRIMARY_PLACEMENTS = {
  'german-idealism': {x: -10.85, z: -21, rotationY: Math.PI / 2},
  fichte: {x: 10.85, z: -21, rotationY: -Math.PI / 2},
  schelling: {x: -10.85, z: -7, rotationY: Math.PI / 2},
  hegel: {x: -10.85, z: 7, rotationY: Math.PI / 2},
} as const;

export const GERMAN_IDEALISM_ROOM_ENTRY_POSES = {
  'german-idealism-orientation': {x: -3.5, z: -21, yaw: Math.PI / 2, pitch: -.02},
  'german-idealism-nature': {x: -3.5, z: -7, yaw: Math.PI / 2, pitch: -.02},
  'german-idealism-hegel': {x: -3.5, z: 7, yaw: Math.PI / 2, pitch: -.02},
  'german-idealism-afterlives-room': {x: -3.5, z: 21, yaw: Math.PI / 2, pitch: -.02},
} as const;

export const GERMAN_IDEALISM_ROOM_SIGN_COPY = {
  'german-idealism-orientation': {
    kicker: 'Room 01 · Critique becomes activity',
    title: 'After Kant: Self, World, and Freedom',
    subtitle: 'Fichte’s self-positing activity, moral vocation, recognition, education, and contested politics turn critical limits into a practical demand for systematic freedom.',
  },
  'german-idealism-nature': {
    kicker: 'Room 02 · Nature is productive, not inert',
    title: 'Schelling: Nature, Art, and Freedom',
    subtitle: 'Naturphilosophie, identity, artistic intuition, mythology, and the possibility of evil resist any system that makes nature a dead object or freedom a predictable mechanism.',
  },
  'german-idealism-hegel': {
    kicker: 'Room 03 · Freedom takes social form',
    title: 'Hegel: Recognition, History, and Institution',
    subtitle: 'Consciousness, labor, conflict, recognition, ethical life, religion, art, and philosophy develop through determinate failures rather than a mechanical three-step formula.',
  },
  'german-idealism-afterlives-room': {
    kicker: 'Room 04 · One system, divergent inheritances',
    title: 'Romantic, Left-Hegelian, and Critical Afterlives',
    subtitle: 'Hölderlin, Novalis, Romantic art, Young Hegelians, Feuerbach, and Strauss divide the inheritance; routes onward carry its problems to Marx, Kierkegaard, British Idealism, and later critique.',
  },
} as const;

/** Render-only lintels restore the visible wall above all three room thresholds. */
export const germanIdealismInteriorLintels = (
  prefix = GERMAN_IDEALISM_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {
    ceilingHeight,
    openingHeight,
    wallThickness,
    openingWidth,
  } = GERMAN_IDEALISM_HALL_DIMENSIONS;
  const height = ceilingHeight - openingHeight;
  return [
    {
      id: `${prefix}:orientation-nature-lintel`,
      center: {x: 0, z: -14},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:german-idealism-orientation:german-idealism-nature',
    },
    {
      id: `${prefix}:nature-hegel-lintel`,
      center: {x: 0, z: 0},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:german-idealism-nature:german-idealism-hegel',
    },
    {
      id: `${prefix}:hegel-afterlives-lintel`,
      center: {x: 0, z: 14},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:german-idealism-hegel:german-idealism-afterlives-room',
    },
  ];
};
