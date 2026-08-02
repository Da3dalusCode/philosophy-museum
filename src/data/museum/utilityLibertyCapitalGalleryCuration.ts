import type {MuseumWallDefinition} from './museumWorldTypes';

export const UTILITY_LIBERTY_CAPITAL_GALLERY_ID = 'utility-liberty-history-capital' as const;

export const UTILITY_LIBERTY_CAPITAL_HALL_DIMENSIONS = Object.freeze({
  width: 24,
  depth: 56,
  ceilingHeight: 5.8,
  wallThickness: .36,
  openingWidth: 4,
  openingHeight: 3.2,
});

/**
 * Gallery 20 preserves the approved 24 × 56 metre shell as four equal rooms.
 * Rooms retain their approved shell and full context program. The final room
 * adds Marxism as a distinct post-Marx tradition on a divided side-wall run.
 */
export const UTILITY_LIBERTY_CAPITAL_PRIMARY_PLACEMENTS = {
  bentham: {x: -10.85, z: -21, rotationY: Math.PI / 2},
  mill: {x: 10.85, z: -21, rotationY: -Math.PI / 2},
  marx: {x: -10.85, z: 7, rotationY: Math.PI / 2},
  marxism: {x: -10.85, z: 24.5, rotationY: Math.PI / 2},
} as const;

export const UTILITY_LIBERTY_CAPITAL_ROOM_ENTRY_POSES = {
  'nineteenth-utilitarian-reform': {x: -3.5, z: -21, yaw: Math.PI / 2, pitch: -.02},
  'nineteenth-liberty-equality': {x: -3.5, z: -7, yaw: Math.PI / 2, pitch: -.02},
  'nineteenth-labor-capital': {x: -3.5, z: 7, yaw: Math.PI / 2, pitch: -.02},
  'nineteenth-social-transformations': {x: -3.5, z: 21, yaw: Math.PI / 2, pitch: -.02},
} as const;

export const UTILITY_LIBERTY_CAPITAL_ROOM_SIGN_COPY = {
  'nineteenth-utilitarian-reform': {
    kicker: 'Room 01 · Consequences, law, and reform',
    title: 'Bentham and Mill: Utility in Dispute',
    subtitle: 'Pleasure, pain, institutions, character, liberty, and social improvement turn one family name into a sustained argument rather than a single formula.',
  },
  'nineteenth-liberty-equality': {
    kicker: 'Room 02 · Freedom within social power',
    title: 'Liberty, Equality, and Experiments in Living',
    subtitle: 'Social tyranny, representative government, women’s subordination, public dissent, empire, and exclusion test whose individuality institutions actually protect.',
  },
  'nineteenth-labor-capital': {
    kicker: 'Room 03 · Production becomes social power',
    title: 'Marx: Labor, Commodities, and Capital',
    subtitle: 'Factories, machinery, wages, commodities, accumulation, class conflict, and revolution reveal a dynamic order made by people yet experienced as necessity.',
  },
  'nineteenth-social-transformations': {
    kicker: 'Room 04 · Organization, cities, and the world market',
    title: 'Marxism and Political Economy in Collective Life',
    subtitle: 'Marxism develops through disputed parties, movements, revisions, and revolutions while urban labor, colonial trade, and the world market resist any single-author story.',
  },
} as const;

/** Render-only lintels restore the visible wall above each walkable room threshold. */
export const utilityLibertyCapitalInteriorLintels = (
  prefix = UTILITY_LIBERTY_CAPITAL_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {
    ceilingHeight,
    openingHeight,
    wallThickness,
    openingWidth,
  } = UTILITY_LIBERTY_CAPITAL_HALL_DIMENSIONS;
  const height = ceilingHeight - openingHeight;
  return [
    {
      id: `${prefix}:utilitarian-liberty-lintel`,
      center: {x: 0, z: -14},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:nineteenth-utilitarian-reform:nineteenth-liberty-equality',
    },
    {
      id: `${prefix}:liberty-capital-lintel`,
      center: {x: 0, z: 0},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:nineteenth-liberty-equality:nineteenth-labor-capital',
    },
    {
      id: `${prefix}:capital-transformations-lintel`,
      center: {x: 0, z: 14},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:nineteenth-labor-capital:nineteenth-social-transformations',
    },
  ];
};
