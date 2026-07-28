/**
 * Gallery 10 uses the five-room sequence template. Every room is divided into
 * west and east half-rooms; their outer walls are the primary walls.
 *
 * Room 01 has three canonical primaries. Al-Farabi therefore occupies the
 * entrance-facing return wall at the same full primary scale as the two outer
 * primaries. It must never be rendered with the smaller supplemental treatment.
 */
export const ISLAMIC_PRIMARY_PLACEMENTS = {
  'islamic-philosophy': {x: -10.85, z: -22.4, rotationY: Math.PI / 2},
  'al-kindi': {x: 10.85, z: -22.4, rotationY: -Math.PI / 2},
  'al-farabi': {x: -5.55, z: -26.88, rotationY: 0},
  avicenna: {x: -10.85, z: -11.2, rotationY: Math.PI / 2},
  'al-ghazali': {x: -10.85, z: 0, rotationY: Math.PI / 2},
  averroes: {x: -10.85, z: 11.2, rotationY: Math.PI / 2},
  'ibn-tufayl': {x: 10.85, z: 11.2, rotationY: -Math.PI / 2},
  suhrawardi: {x: -10.85, z: 22.4, rotationY: Math.PI / 2},
  'mulla-sadra': {x: 10.85, z: 22.4, rotationY: -Math.PI / 2},
} as const;

/**
 * Directory room views stand just inside the west half-room and face its
 * primary outer wall. The side installations remain visible at the frame
 * edges without becoming the first or largest visual read.
 */
export const ISLAMIC_ROOM_ENTRY_POSES = {
  'islamic-translation-falsafa': {x: -3.5, z: -22.4, yaw: Math.PI / 2, pitch: -.02},
  'islamic-avicennan-system': {x: -3.5, z: -11.2, yaw: Math.PI / 2, pitch: -.02},
  'islamic-kalam-critique': {x: -3.5, z: 0, yaw: Math.PI / 2, pitch: -.02},
  'islamic-andalusian-worlds': {x: -3.5, z: 11.2, yaw: Math.PI / 2, pitch: -.02},
  'islamic-post-avicennian': {x: -3.5, z: 22.4, yaw: Math.PI / 2, pitch: -.02},
} as const;
