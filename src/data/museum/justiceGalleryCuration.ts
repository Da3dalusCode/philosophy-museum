/**
 * Gallery 05 uses the most prominent intact outer walls for its five primary
 * exhibits. The remaining partition faces and the final east wall are reserved
 * for the room's supporting arguments, works, and public-life contexts.
 */
export const JUSTICE_PRIMARY_PLACEMENTS = {
  'political-philosophy': {x: -10.85, z: -18.667, rotationY: Math.PI / 2},
  arendt: {x: 10.85, z: -18.667, rotationY: -Math.PI / 2},
  rawls: {x: -10.85, z: 0, rotationY: Math.PI / 2},
  nozick: {x: 10.85, z: 0, rotationY: -Math.PI / 2},
  'martha-nussbaum': {x: -10.85, z: 18.667, rotationY: Math.PI / 2},
} as const;
