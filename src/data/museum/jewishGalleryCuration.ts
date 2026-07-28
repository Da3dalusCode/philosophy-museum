/**
 * Gallery 12 is the 20 × 24 metre standard rectangle. Its two rooms each have
 * two half-rooms and six wall installations. Saadia Gaon and Judah Halevi are
 * equal full-scale primaries; Maimonides anchors the second room.
 */
export const JEWISH_PRIMARY_PLACEMENTS = {
  'saadia-gaon': {x: -8.85, z: -6, rotationY: Math.PI / 2},
  'judah-halevi': {x: 8.85, z: -6, rotationY: -Math.PI / 2},
  maimonides: {x: -8.85, z: 6, rotationY: Math.PI / 2},
} as const;

export const JEWISH_ROOM_ENTRY_POSES = {
  'jewish-reason-revelation': {x: -2.7, z: -6, yaw: Math.PI / 2, pitch: -.02},
  'jewish-maimonidean-crossroads': {x: -2.7, z: 6, yaw: Math.PI / 2, pitch: -.02},
} as const;
