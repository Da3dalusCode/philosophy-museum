/**
 * Each sequence room contains west and east half-rooms. Their outer walls are
 * the primary walls; the north/south return walls normally hold secondaries.
 * Overflow primaries remain full scale on a return wall.
 */
export const CLASSICAL_SOUTH_ASIAN_PRIMARY_PLACEMENTS = {
  'indian-philosophy': {x: -10.85, z: -22.4, rotationY: Math.PI / 2},
  jainism: {x: -10.85, z: -11.2, rotationY: Math.PI / 2},
  mahavira: {x: 10.85, z: -11.2, rotationY: -Math.PI / 2},
  kanada: {x: -10.85, z: 0, rotationY: Math.PI / 2},
  patanjali: {x: -10.85, z: 11.2, rotationY: Math.PI / 2},
  vedanta: {x: -10.85, z: 22.4, rotationY: Math.PI / 2},
  shankara: {x: 10.85, z: 22.4, rotationY: -Math.PI / 2},
  ramanuja: {x: -5.55, z: 17.92, rotationY: 0},
  madhva: {x: 5.55, z: 17.92, rotationY: 0},
} as const;
