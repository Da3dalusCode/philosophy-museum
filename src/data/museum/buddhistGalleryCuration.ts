/**
 * Each sequence room contains west and east half-rooms. Their outer walls are
 * the primary walls; the north/south return walls normally hold secondaries.
 * Overflow primaries remain full scale on a return wall.
 */
export const BUDDHIST_PRIMARY_PLACEMENTS = {
  'buddhist-philosophy': {x: -10.85, z: -22.4, rotationY: Math.PI / 2},
  buddha: {x: 10.85, z: -22.4, rotationY: -Math.PI / 2},
  nagarjuna: {x: -10.85, z: -11.2, rotationY: Math.PI / 2},
  vasubandhu: {x: -10.85, z: 0, rotationY: Math.PI / 2},
  'buddhist-epistemology': {x: -10.85, z: 11.2, rotationY: Math.PI / 2},
  dignaga: {x: 10.85, z: 11.2, rotationY: -Math.PI / 2},
  dharmakirti: {x: -5.55, z: 6.72, rotationY: 0},
} as const;
