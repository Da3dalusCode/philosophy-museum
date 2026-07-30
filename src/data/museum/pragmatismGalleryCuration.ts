import type {MuseumWallDefinition} from './museumWorldTypes';

export const PRAGMATISM_GALLERY_ID = 'pragmatism-democratic-inquiry' as const;

export const PRAGMATISM_HALL_DIMENSIONS = Object.freeze({
  width: 24,
  depth: 56,
  ceilingHeight: 5.8,
  wallThickness: .36,
  openingWidth: 4,
  openingHeight: 3.2,
});

/**
 * Gallery 22 preserves its approved 24 × 56 metre, four-room shell. Peirce and
 * the pragmatist tradition share the first room; James and Dewey anchor the
 * next two; the final room treats later continuities and exclusions without
 * converting contextual figures into duplicate canonical primaries.
 */
export const PRAGMATISM_PRIMARY_PLACEMENTS = {
  pragmatism: {x: -10.85, z: -21, rotationY: Math.PI / 2},
  peirce: {x: 10.85, z: -21, rotationY: -Math.PI / 2},
  'william-james': {x: -10.85, z: -7, rotationY: Math.PI / 2},
  dewey: {x: -10.85, z: 7, rotationY: Math.PI / 2},
} as const;

export const PRAGMATISM_ROOM_ENTRY_POSES = {
  'pragmatism-peirce-inquiry': {x: -3.5, z: -21, yaw: Math.PI / 2, pitch: -.02},
  'pragmatism-james-experience': {x: -3.5, z: -7, yaw: Math.PI / 2, pitch: -.02},
  'pragmatism-dewey-democracy': {x: -3.5, z: 7, yaw: Math.PI / 2, pitch: -.02},
  'pragmatism-continuities-reserve': {x: -3.5, z: 21, yaw: Math.PI / 2, pitch: -.02},
} as const;

export const PRAGMATISM_ROOM_SIGN_COPY = {
  'pragmatism-peirce-inquiry': {
    kicker: 'Inquiry zone · Doubt enters a community',
    title: 'Peirce: Signs, Consequences, and Fallibilism',
    subtitle: 'Laboratory practice, measurement, abduction, the pragmatic maxim, semeiotic, and future correction make inquiry public without promising a final view from nowhere.',
  },
  'pragmatism-james-experience': {
    kicker: 'Experience zone · An unfinished world makes demands now',
    title: 'James: Experience, Belief, and Pluralism',
    subtitle: 'The stream of thought, radical empiricism, religious experience, the will to believe, pluralism, and truth’s practical testing resist both crude utility and detached certainty.',
  },
  'pragmatism-dewey-democracy': {
    kicker: 'Democracy zone · Inquiry reconstructs situations',
    title: 'Dewey: Education, Publics, and Democracy',
    subtitle: 'Schools, laboratories, workshops, art, communication, and collective problem-solving make democracy a learned way of life rather than only a voting procedure.',
  },
  'pragmatism-continuities-reserve': {
    kicker: 'Continuities zone · Expansion, omission, and renewal',
    title: 'Pragmatism Beyond Its Founding Canon',
    subtitle: 'Addams, Locke, Cooper, Hull House practice, and civil-rights organizing expose exclusions while extending experimental inquiry; the Atlas route continues to later neopragmatism.',
  },
} as const;

/** Render-only lintels restore the visible wall above all three room thresholds. */
export const pragmatismInteriorLintels = (
  prefix = PRAGMATISM_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {
    ceilingHeight,
    openingHeight,
    wallThickness,
    openingWidth,
  } = PRAGMATISM_HALL_DIMENSIONS;
  const height = ceilingHeight - openingHeight;
  return [
    {
      id: `${prefix}:peirce-james-lintel`,
      center: {x: 0, z: -14},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:pragmatism-peirce-inquiry:pragmatism-james-experience',
    },
    {
      id: `${prefix}:james-dewey-lintel`,
      center: {x: 0, z: 0},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:pragmatism-james-experience:pragmatism-dewey-democracy',
    },
    {
      id: `${prefix}:dewey-continuities-lintel`,
      center: {x: 0, z: 14},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:pragmatism-dewey-democracy:pragmatism-continuities-reserve',
    },
  ];
};
