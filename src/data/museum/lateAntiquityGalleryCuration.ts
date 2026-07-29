export const LATE_ANTIQUITY_GALLERY_ID = 'late-antiquity-inheritance' as const;

/**
 * Gallery 15 uses the 24 × 56 metre three-room sequence. Room 01 carries five
 * equal full-scale primaries, Room 02 carries four, and the final room is an
 * intentionally primary-free transmission room filled by six interpreted
 * work/context installations.
 */
export const LATE_ANTIQUITY_PRIMARY_PLACEMENTS = {
  neoplatonism: {x: -10.85, z: -18.6667, rotationY: Math.PI / 2},
  plotinus: {x: 10.85, z: -18.6667, rotationY: -Math.PI / 2},
  porphyry: {x: -5.55, z: -26.88, rotationY: 0},
  iamblichus: {x: 5.55, z: -26.88, rotationY: 0},
  proclus: {x: -5.55, z: -10.45, rotationY: Math.PI},
  origen: {x: -10.85, z: 0, rotationY: Math.PI / 2},
  augustine: {x: 10.85, z: 0, rotationY: -Math.PI / 2},
  'gregory-nyssa': {x: -5.55, z: -8.22, rotationY: 0},
  'pseudo-dionysius': {x: 5.55, z: -8.22, rotationY: 0},
} as const;

export const LATE_ANTIQUITY_ROOM_ENTRY_POSES = {
  'late-neoplatonic-systems': {x: -3.5, z: -18.6667, yaw: Math.PI / 2, pitch: -.02},
  'late-christian-platonisms': {x: -3.5, z: 0, yaw: Math.PI / 2, pitch: -.02},
  'late-commentary-transmission': {x: -3.5, z: 18.6667, yaw: Math.PI / 2, pitch: -.02},
} as const;

export const LATE_ANTIQUITY_ROOM_SIGN_COPY = {
  'late-neoplatonic-systems': {
    kicker: 'Room 01 · Unity, procession, participation, return',
    title: 'Plotinus and Later Pagan Platonisms',
    subtitle: 'Porphyry edits a tradition; Iamblichus and Proclus transform its metaphysics, pedagogy, and ritual stakes.',
  },
  'late-christian-platonisms': {
    kicker: 'Room 02 · Appropriation, argument, and transformation',
    title: 'Christian Platonisms in the Making',
    subtitle: 'Origen, Augustine, Gregory of Nyssa, and Pseudo-Dionysius reconstruct Platonist problems within distinct Christian projects.',
  },
  'late-commentary-transmission': {
    kicker: 'Room 03 · No single bridge and no empty afterlife',
    title: 'Commentary, Translation, and Transmission',
    subtitle: 'Codices, classrooms, translations, disputes, and later revivals carry late-antique arguments into several intellectual worlds.',
  },
} as const;
