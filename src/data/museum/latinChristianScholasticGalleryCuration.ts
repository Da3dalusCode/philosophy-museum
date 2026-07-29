export const LATIN_SCHOLASTIC_GALLERY_ID = 'latin-christian-scholastic' as const;

/**
 * Gallery 13 uses the approved 24 × 56 metre sequence as four equal rooms.
 * Primaries occupy explicit members of the same six full-scale wall slots that
 * the supplemental program completes in each room.
 */
export const LATIN_SCHOLASTIC_PRIMARY_PLACEMENTS = {
  boethius: {x: -10.85, z: -21, rotationY: Math.PI / 2},
  eriugena: {x: 10.85, z: -21, rotationY: -Math.PI / 2},
  'medieval-scholasticism': {x: -10.85, z: -7, rotationY: Math.PI / 2},
  abelard: {x: 10.85, z: -7, rotationY: -Math.PI / 2},
  anselm: {x: -5.55, z: -12.88, rotationY: 0},
  aquinas: {x: -10.85, z: 7, rotationY: Math.PI / 2},
  'meister-eckhart': {x: -10.85, z: 21, rotationY: Math.PI / 2},
  ockham: {x: 10.85, z: 21, rotationY: -Math.PI / 2},
  'duns-scotus': {x: -5.55, z: 15.12, rotationY: 0},
  'marsilius-padua': {x: 5.55, z: 15.12, rotationY: 0},
} as const;

export const LATIN_SCHOLASTIC_ROOM_ENTRY_POSES = {
  'latin-transmission-carolingian': {x: -3.5, z: -21, yaw: Math.PI / 2, pitch: -.02},
  'latin-dialectic-early-scholastic': {x: -3.5, z: -7, yaw: Math.PI / 2, pitch: -.02},
  'latin-high-scholastic': {x: -3.5, z: 7, yaw: Math.PI / 2, pitch: -.02},
  'latin-late-debates': {x: -3.5, z: 21, yaw: Math.PI / 2, pitch: -.02},
} as const;

export const LATIN_SCHOLASTIC_ROOM_SIGN_COPY = {
  'latin-transmission-carolingian': {
    kicker: 'Room 01 · Translation is philosophical work',
    title: 'Transmission, Translation, Reconstruction',
    subtitle: 'Boethius and Eriugena do more than relay inherited texts: they create Latin vocabularies, arguments, genres, and new intellectual settings.',
  },
  'latin-dialectic-early-scholastic': {
    kicker: 'Room 02 · A practice, not one doctrine',
    title: 'Dialectic Becomes an Institution',
    subtitle: 'Monastic and school traditions organize reading, questions, objections, distinctions, and disputation without making every Latin Christian thinker the same.',
  },
  'latin-high-scholastic': {
    kicker: 'Room 03 · Connected university worlds',
    title: 'Aquinas and the Contested Synthesis',
    subtitle: 'Greek, Arabic, Jewish, Augustinian, and Aristotelian arguments are translated, disputed, and transformed inside a thirteenth-century university project.',
  },
  'latin-late-debates': {
    kicker: 'Room 04 · No single scholastic ending',
    title: 'Individuals, Signs, Mysticism, Authority',
    subtitle: 'Scotus, Ockham, Eckhart, and Marsilius reopen metaphysics, language, will, spiritual practice, poverty, church office, and political power.',
  },
} as const;
