/**
 * Gallery 08 uses one installation on each usable room wall. Primary branches
 * and philosophers take the forward wall or the strongest intact side walls,
 * and the shared full-scale floor keeps every primary at least as large as the
 * supporting manuscript and transmission exhibits.
 */
export const BUDDHIST_PRIMARY_PLACEMENTS = {
  'buddhist-philosophy': {x: -5.55, z: -17.92, rotationY: Math.PI},
  buddha: {x: -10.85, z: -22.4, rotationY: Math.PI / 2},
  nagarjuna: {x: -5.55, z: -6.72, rotationY: Math.PI},
  vasubandhu: {x: -5.55, z: 4.48, rotationY: Math.PI},
  'buddhist-epistemology': {x: -5.55, z: 15.68, rotationY: Math.PI},
  dignaga: {x: -10.85, z: 11.2, rotationY: Math.PI / 2},
  dharmakirti: {x: 10.85, z: 11.2, rotationY: -Math.PI / 2},
} as const;
