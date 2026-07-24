/**
 * Gallery 03 is composed of paired half-room bays around a clear centre aisle.
 * These authored placements keep one primary on each usable outer wall instead
 * of allowing the generic placement search to stack two primaries on one side.
 */
export const PHENOMENOLOGY_PRIMARY_PLACEMENTS = {
  phenomenology: {x: -10.85, z: -22.4, rotationY: Math.PI / 2},
  husserl: {x: 10.85, z: -22.4, rotationY: -Math.PI / 2},
  heidegger: {x: -10.85, z: -11.2, rotationY: Math.PI / 2},
  'merleau-ponty': {x: 10.85, z: -11.2, rotationY: -Math.PI / 2},
  existentialism: {x: -6, z: -4.45, rotationY: 0},
  sartre: {x: 6, z: -4.45, rotationY: 0},
  camus: {x: -10.85, z: 11.2, rotationY: Math.PI / 2},
  levinas: {x: -10.85, z: 22.4, rotationY: Math.PI / 2},
  gadamer: {x: 10.85, z: 22.4, rotationY: -Math.PI / 2},
} as const;
