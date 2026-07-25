/**
 * Gallery 07 keeps primary branches and philosophers on the forward partition
 * or the most prominent intact side walls. Every primary is rendered at the
 * same full-scale floor as the largest supporting exhibit.
 */
export const CLASSICAL_SOUTH_ASIAN_PRIMARY_PLACEMENTS = {
  'indian-philosophy': {x: -5.55, z: -17.92, rotationY: Math.PI},
  jainism: {x: -5.55, z: -6.72, rotationY: Math.PI},
  mahavira: {x: -10.85, z: -11.2, rotationY: Math.PI / 2},
  kanada: {x: -5.55, z: 4.48, rotationY: Math.PI},
  patanjali: {x: -5.55, z: 15.68, rotationY: Math.PI},
  vedanta: {x: -10.85, z: 19.6, rotationY: Math.PI / 2},
  shankara: {x: 10.85, z: 19.6, rotationY: -Math.PI / 2},
  ramanuja: {x: -10.85, z: 25.2, rotationY: Math.PI / 2},
  madhva: {x: 10.85, z: 25.2, rotationY: -Math.PI / 2},
} as const;
