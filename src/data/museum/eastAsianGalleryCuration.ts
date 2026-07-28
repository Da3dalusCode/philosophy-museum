/**
 * Gallery 11 uses the three-room sequence template. Each room is split into
 * west and east half-rooms, with one installation on the outer wall and one on
 * each return wall. Zhu Xi and Wang Yangming occupy equal full-scale outer
 * primaries; neither may be visually subordinated to a work exhibit.
 */
export const EAST_ASIAN_PRIMARY_PLACEMENTS = {
  'zhu-xi': {x: -10.85, z: -18.6667, rotationY: Math.PI / 2},
  'wang-yangming': {x: 10.85, z: -18.6667, rotationY: -Math.PI / 2},
} as const;

/**
 * Directory views begin in the west half-room and face the most substantial
 * outer-wall installation. Return-wall works remain legible at the edges.
 */
export const EAST_ASIAN_ROOM_ENTRY_POSES = {
  'east-song-ming-confucian': {x: -3.5, z: -18.6667, yaw: Math.PI / 2, pitch: -.02},
  'east-buddhist-daoist-transmissions': {x: -3.5, z: 0, yaw: Math.PI / 2, pitch: -.02},
  'east-regional-continuities-reserve': {x: -3.5, z: 18.6667, yaw: Math.PI / 2, pitch: -.02},
} as const;
