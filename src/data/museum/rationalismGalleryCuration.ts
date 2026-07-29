export const RATIONALISM_GALLERY_ID = 'rationalism-mind-nature-system' as const;

/** Gallery 16 fills the standard three-room sequence with six authored bays per room. */
export const RATIONALISM_PRIMARY_PLACEMENTS = {
  rationalism: {x: -10.85, z: -18.6667, rotationY: Math.PI / 2},
  descartes: {x: 10.85, z: -18.6667, rotationY: -Math.PI / 2},
  spinoza: {x: -10.85, z: 0, rotationY: Math.PI / 2},
  'anne-conway': {x: 10.85, z: 0, rotationY: -Math.PI / 2},
  leibniz: {x: -10.85, z: 18.6667, rotationY: Math.PI / 2},
} as const;

export const RATIONALISM_ROOM_ENTRY_POSES = {
  'rationalism-cartesian-foundations': {x: -3.5, z: -18.6667, yaw: Math.PI / 2, pitch: -.02},
  'rationalism-spinoza-conway': {x: -3.5, z: 0, yaw: Math.PI / 2, pitch: -.02},
  'rationalism-leibniz-system': {x: -3.5, z: 18.6667, yaw: Math.PI / 2, pitch: -.02},
} as const;

export const RATIONALISM_ROOM_SIGN_COPY = {
  'rationalism-cartesian-foundations': {
    kicker: 'Room 01 · Method, certainty, and mechanism',
    title: 'Cartesian Foundations and Their Critique',
    subtitle: 'Descartes rebuilds knowledge and mechanizes nature while Princess Elisabeth presses the unresolved question of how an immaterial mind can move a body.',
  },
  'rationalism-spinoza-conway': {
    kicker: 'Room 02 · Rival alternatives to dualism',
    title: 'Substance, Vitality, God/Nature, Freedom',
    subtitle: 'Spinoza and Conway reject Cartesian substance dualism in sharply different systems whose proximity here marks comparison, not agreement or influence.',
  },
  'rationalism-leibniz-system': {
    kicker: 'Room 03 · Unity without material parts',
    title: 'Leibniz: Reasons, Monads, Possible Worlds',
    subtitle: 'Metaphysics, logic, mathematics, machines, correspondence, and theology converge in a system where every truth asks for a sufficient reason.',
  },
} as const;
