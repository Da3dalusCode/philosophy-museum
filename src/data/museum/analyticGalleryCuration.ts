/**
 * Gallery 04 uses authored placements so every primary anchors a distinct wall
 * face and the paired half-room bays remain legible from the centre aisle.
 */
export const ANALYTIC_PRIMARY_PLACEMENTS = {
  'analytic-philosophy': {x: -10.85, z: -22.4, rotationY: Math.PI / 2},
  russell: {x: -6, z: -26.85, rotationY: 0},
  frege: {x: 10.85, z: -22.4, rotationY: -Math.PI / 2},
  'g-e-moore': {x: -10.85, z: -11.2, rotationY: Math.PI / 2},
  wittgenstein: {x: -5.55, z: -4.45, rotationY: 0},
  quine: {x: -10.85, z: 11.2, rotationY: Math.PI / 2},
  anscombe: {x: -10.85, z: 22.4, rotationY: Math.PI / 2},
} as const;
