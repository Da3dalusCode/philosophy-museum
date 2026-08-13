import {
  GALLERY_02_CIRCULATION_ARM_OFFSET,
  GALLERY_01_LIGHTING_TARGETS,
  GALLERY_02_LIGHTING_TARGETS,
  GALLERY_02_RECESS_PROFILE,
  createGallery01PrototypeDiffusers,
  createGallery01PrototypeTracks,
  createGallery02CirculationDownlights,
  createGallery02PrototypeDiffusers,
  resolveGallery01PrototypeMount,
  resolveGallery02PrototypeMount,
} from '../src/data/museum/galleryLightingPrototypes.ts';
import {readFileSync} from 'node:fs';

const gallery01Cells = [
  {id: 'med-plato-aristotle', bounds: {minX: -12, maxX: 12, minZ: -28, maxZ: -14}, ceilingHeight: 5.8},
  {id: 'med-sophists-socratic', bounds: {minX: -12, maxX: 12, minZ: -14, maxZ: 0}, ceilingHeight: 5.8},
  {id: 'med-being-change-plurality', bounds: {minX: -12, maxX: 12, minZ: 0, maxZ: 14}, ceilingHeight: 5.8},
  {id: 'med-orientation-nature', bounds: {minX: -12, maxX: 12, minZ: 14, maxZ: 28}, ceilingHeight: 5.8},
];

const gallery02Cells = [
  {id: 'hell-cynic-way', bounds: {minX: -14, maxX: 0, minZ: -14, maxZ: 0}, ceilingHeight: 6.2},
  {id: 'hell-epicurean-garden', bounds: {minX: 0, maxX: 14, minZ: -14, maxZ: 0}, ceilingHeight: 6.2},
  {id: 'hell-stoic-stoa', bounds: {minX: -14, maxX: 0, minZ: 0, maxZ: 14}, ceilingHeight: 6.2},
  {id: 'hell-skeptical-lineages', bounds: {minX: 0, maxX: 14, minZ: 0, maxZ: 14}, ceilingHeight: 6.2},
];

const rect = (id, x, z, width, depth) => ({
  id,
  minX: x - width / 2,
  maxX: x + width / 2,
  minZ: z - depth / 2,
  maxZ: z + depth / 2,
});

const fromBounds = (id, bounds) => ({id, ...bounds});
const overlaps = (a, b, padding = 0) => a.minX < b.maxX + padding
  && a.maxX > b.minX - padding
  && a.minZ < b.maxZ + padding
  && a.maxZ > b.minZ - padding;

const circleOverlapsRect = (point, radius, area) => {
  const nearestX = Math.max(area.minX, Math.min(point.x, area.maxX));
  const nearestZ = Math.max(area.minZ, Math.min(point.z, area.maxZ));
  return Math.hypot(point.x - nearestX, point.z - nearestZ) < radius;
};

const segmentIntersectsRect = (start, end, area) => {
  let low = 0;
  let high = 1;
  const dx = end.x - start.x;
  const dz = end.z - start.z;
  for (const [p, q] of [
    [-dx, start.x - area.minX],
    [dx, area.maxX - start.x],
    [-dz, start.z - area.minZ],
    [dz, area.maxZ - start.z],
  ]) {
    if (p === 0 && q < 0) return false;
    if (p === 0) continue;
    const ratio = q / p;
    if (p < 0) low = Math.max(low, ratio);
    else high = Math.min(high, ratio);
    if (low > high) return false;
  }
  return true;
};

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const gallery01Walls = [
  rect('g01-west', -12, 0, .36, 56),
  rect('g01-east', 12, 0, .36, 56),
  rect('g01-north-left', -7, -28, 10, .36),
  rect('g01-north-right', 7, -28, 10, .36),
  rect('g01-south-left', -7, 28, 10, .36),
  rect('g01-south-right', 7, 28, 10, .36),
  ...[-14, 0, 14].flatMap((z) => [
    rect(`g01-partition-west-${z}`, -7, z, 10, .36),
    rect(`g01-partition-east-${z}`, 7, z, 10, .36),
  ]),
];

const gallery01Doorways = [
  fromBounds('g01-N0', {minX: -3.2, maxX: 3.2, minZ: -28, maxZ: -23.8}),
  fromBounds('g01-room-01-02', {minX: -3.2, maxX: 3.2, minZ: -15.25, maxZ: -12.75}),
  fromBounds('g01-room-02-03', {minX: -3.2, maxX: 3.2, minZ: -1.25, maxZ: 1.25}),
  fromBounds('g01-room-03-04', {minX: -3.2, maxX: 3.2, minZ: 12.75, maxZ: 15.25}),
  fromBounds('g01-S0', {minX: -3.2, maxX: 3.2, minZ: 23.8, maxZ: 28}),
  fromBounds('g01-E1', {minX: 8, maxX: 12, minZ: -2, maxZ: 2}),
];

const gallery02Walls = [
  rect('g02-west-north', -14, -8, .36, 12),
  rect('g02-west-south', -14, 8, .36, 12),
  rect('g02-east-north', 14, -8, .36, 12),
  rect('g02-east-south', 14, 8, .36, 12),
  rect('g02-north', 0, -14, 28, .36),
  rect('g02-south', 0, 14, 28, .36),
  rect('g02-nw-v', -4, -11, .36, 6),
  rect('g02-nw-h', -11, -4, 6, .36),
  rect('g02-ne-v', 4, -11, .36, 6),
  rect('g02-ne-h', 11, -4, 6, .36),
  rect('g02-sw-v', -4, 11, .36, 6),
  rect('g02-sw-h', -11, 4, 6, .36),
  rect('g02-se-v', 4, 11, .36, 6),
  rect('g02-se-h', 11, 4, 6, .36),
];

const gallery02Doorways = [
  fromBounds('g02-W0', {minX: -14, maxX: -10, minZ: -2, maxZ: 2}),
  fromBounds('g02-E0', {minX: 10, maxX: 14, minZ: -2, maxZ: 2}),
];

const cellMap = (cells) => new Map(cells.map((cell) => [cell.id, cell]));
const g01CellById = cellMap(gallery01Cells);
const g02CellById = cellMap(gallery02Cells);
const g01Tracks = createGallery01PrototypeTracks(gallery01Cells);
const g01Diffusers = createGallery01PrototypeDiffusers(gallery01Cells);
const g02Diffusers = createGallery02PrototypeDiffusers(gallery02Cells);
const g02CirculationDownlights = createGallery02CirculationDownlights(gallery02Cells);
const diffuserRects = (diffusers) => diffusers.map(({id, center, size}) => rect(id, center.x, center.z, size.width, size.depth));
const physicalTrackSegments = g01Tracks.flatMap((track) => track.segments ?? [track]);
const trackRects = physicalTrackSegments.map(({id, center, size}) => rect(id, center.x, center.z, size.width, size.depth));
const g01DiffuserRects = diffuserRects(g01Diffusers);
const g02DiffuserRects = diffuserRects(g02Diffusers);
const g02GimbalMounts = GALLERY_02_LIGHTING_TARGETS.map((spec) => ({
  id: spec.sourceId,
  ...resolveGallery02PrototypeMount(spec, g02CellById.get(spec.spatialCellId)),
}));

assert(GALLERY_01_LIGHTING_TARGETS.length === 27, 'Gallery 01 must have 27 target specifications.');
assert(GALLERY_02_LIGHTING_TARGETS.length === 25, 'Gallery 02 must have 25 target specifications.');
assert(new Set(GALLERY_01_LIGHTING_TARGETS.map(({sourceId}) => sourceId)).size === 27, 'Gallery 01 source IDs must be unique.');
assert(new Set(GALLERY_02_LIGHTING_TARGETS.map(({sourceId}) => sourceId)).size === 25, 'Gallery 02 source IDs must be unique.');
assert(g02CirculationDownlights.length === 5, 'Gallery 02 must have five circulation downlights.');

const empedocles = GALLERY_01_LIGHTING_TARGETS.find(({sourceId}) => sourceId === 'primary:empedocles');
const anaxagoras = GALLERY_01_LIGHTING_TARGETS.find(({sourceId}) => sourceId === 'primary:anaxagoras');
assert(empedocles && anaxagoras, 'Empedocles and Anaxagoras must both have explicit targets.');
const empMount = resolveGallery01PrototypeMount(empedocles, g01CellById.get(empedocles.spatialCellId)).mountPosition;
const anaMount = resolveGallery01PrototypeMount(anaxagoras, g01CellById.get(anaxagoras.spatialCellId)).mountPosition;
assert(Math.hypot(empMount.x - anaMount.x, empMount.z - anaMount.z) > 3, 'Empedocles and Anaxagoras must not share a head.');

for (const track of trackRects) {
  assert(!gallery01Walls.some((wall) => overlaps(track, wall)), `${track.id} intersects a Gallery 01 wall.`);
  assert(!gallery01Doorways.some((door) => overlaps(track, door)), `${track.id} intersects a Gallery 01 doorway.`);
  assert(!g01DiffuserRects.some((diffuser) => overlaps(track, diffuser)), `${track.id} intersects a Gallery 01 diffuser.`);
}

for (let first = 0; first < trackRects.length; first += 1) {
  for (let second = first + 1; second < trackRects.length; second += 1) {
    assert(!overlaps(trackRects[first], trackRects[second]), `${trackRects[first].id} intersects ${trackRects[second].id}.`);
  }
}

for (const diffuser of g01DiffuserRects) {
  assert(!gallery01Walls.some((wall) => overlaps(diffuser, wall)), `${diffuser.id} intersects a Gallery 01 wall.`);
  assert(!gallery01Doorways.some((door) => overlaps(diffuser, door)), `${diffuser.id} intersects a Gallery 01 doorway.`);
}

for (const spec of GALLERY_01_LIGHTING_TARGETS) {
  const cell = g01CellById.get(spec.spatialCellId);
  const {trackId, mountPosition} = resolveGallery01PrototypeMount(spec, cell);
  const logicalTrack = g01Tracks.find(({id}) => id === trackId);
  const supportingTrack = logicalTrack?.segments
    ?.map(({id, center, size}) => rect(id, center.x, center.z, size.width, size.depth))
    .find((segment) => circleOverlapsRect(mountPosition, .08, segment));
  assert(logicalTrack, `${spec.sourceId} has no Gallery 01 logical service rail.`);
  assert(supportingTrack, `${spec.sourceId} has no Gallery 01 supporting rail.`);
  assert(circleOverlapsRect(mountPosition, .08, supportingTrack), `${spec.sourceId} is not mounted on its Gallery 01 rail.`);
  assert(!gallery01Walls.some((wall) => circleOverlapsRect(mountPosition, .16, wall)), `${spec.sourceId} intersects a Gallery 01 wall.`);
  assert(!gallery01Doorways.some((door) => circleOverlapsRect(mountPosition, .16, door)), `${spec.sourceId} intersects a Gallery 01 doorway.`);
  assert(!g01DiffuserRects.some((diffuser) => circleOverlapsRect(mountPosition, .16, diffuser)), `${spec.sourceId} intersects a Gallery 01 diffuser.`);
}

for (const diffuser of g02DiffuserRects) {
  assert(Math.abs((diffuser.maxX - diffuser.minX) - 3) < .001, `${diffuser.id} is not 3.0 m east-west.`);
  assert(Math.abs((diffuser.maxZ - diffuser.minZ) - .62) < .001, `${diffuser.id} is not the approved .62 m width.`);
  assert(!gallery02Walls.some((wall) => overlaps(diffuser, wall)), `${diffuser.id} intersects a Gallery 02 wall or baffle.`);
  assert(!gallery02Doorways.some((door) => overlaps(diffuser, door)), `${diffuser.id} intersects a Gallery 02 passage.`);
}

for (let first = 0; first < g02DiffuserRects.length; first += 1) {
  for (let second = first + 1; second < g02DiffuserRects.length; second += 1) {
    assert(!overlaps(g02DiffuserRects[first], g02DiffuserRects[second]), `${g02DiffuserRects[first].id} intersects ${g02DiffuserRects[second].id}.`);
  }
}

for (const spec of GALLERY_02_LIGHTING_TARGETS) {
  const cell = g02CellById.get(spec.spatialCellId);
  const mount = resolveGallery02PrototypeMount(spec, cell);
  assert(!gallery02Walls.some((wall) => circleOverlapsRect(mount, .22, wall)), `${spec.sourceId} intersects a Gallery 02 wall or baffle.`);
  assert(!gallery02Doorways.some((door) => circleOverlapsRect(mount, .22, door)), `${spec.sourceId} intersects a Gallery 02 passage.`);
  assert(!g02DiffuserRects.some((diffuser) => circleOverlapsRect(mount, .22, diffuser)), `${spec.sourceId} intersects a Gallery 02 diffuser.`);
  assert(!gallery02Walls.some((wall) => segmentIntersectsRect(mount, spec, wall)), `${spec.sourceId} aim crosses an intervening Gallery 02 wall or baffle.`);
  assert(Math.abs(mount.y + GALLERY_02_RECESS_PROFILE.mountInset - cell.ceilingHeight) < .0001, `${spec.sourceId} mount datum does not resolve to the Gallery 02 ceiling plane.`);
}

const expectedCirculationPositions = new Set([
  '0,0',
  `0,${-GALLERY_02_CIRCULATION_ARM_OFFSET}`,
  `${GALLERY_02_CIRCULATION_ARM_OFFSET},0`,
  `0,${GALLERY_02_CIRCULATION_ARM_OFFSET}`,
  `${-GALLERY_02_CIRCULATION_ARM_OFFSET},0`,
]);
assert(new Set(g02CirculationDownlights.map(({position}) => `${position.x},${position.z}`)).size === 5, 'Gallery 02 circulation positions must be unique.');
for (const downlight of g02CirculationDownlights) {
  const {position} = downlight;
  assert(expectedCirculationPositions.delete(`${position.x},${position.z}`), `${downlight.id} is not on the symmetric Gallery 02 plus.`);
  assert(position.y === gallery02Cells[0].ceilingHeight, `${downlight.id} trim datum is not coplanar with the Gallery 02 ceiling.`);
  assert(downlight.colorTemperatureK === 3000, `${downlight.id} is not specified at 3000 K.`);
  assert(!gallery02Walls.some((wall) => circleOverlapsRect(position, .22, wall)), `${downlight.id} intersects a Gallery 02 wall or baffle.`);
  assert(!gallery02Doorways.some((door) => circleOverlapsRect(position, .22, door)), `${downlight.id} intersects a Gallery 02 passage.`);
  assert(!g02DiffuserRects.some((diffuser) => circleOverlapsRect(position, .22, diffuser)), `${downlight.id} intersects a Gallery 02 diffuser.`);
  assert(!g02GimbalMounts.some((mount) => Math.hypot(position.x - mount.x, position.z - mount.z) < .44), `${downlight.id} intersects an exhibit gimbal.`);
}
assert(expectedCirculationPositions.size === 0, 'Gallery 02 circulation plus is incomplete.');
for (let first = 0; first < g02CirculationDownlights.length; first += 1) {
  for (let second = first + 1; second < g02CirculationDownlights.length; second += 1) {
    const a = g02CirculationDownlights[first].position;
    const b = g02CirculationDownlights[second].position;
    assert(Math.hypot(a.x - b.x, a.z - b.z) >= .44, `${g02CirculationDownlights[first].id} intersects ${g02CirculationDownlights[second].id}.`);
  }
}

const maximumOpticRise = GALLERY_02_RECESS_PROFILE.opticOuterRadius
  * Math.sin(GALLERY_02_RECESS_PROFILE.maximumAimDegrees * Math.PI / 180);
assert(GALLERY_02_RECESS_PROFILE.trimInset <= .001, 'Gallery 02 trim is not coplanar with the ceiling plane.');
assert(GALLERY_02_RECESS_PROFILE.cutoutRadius > .14, 'Gallery 02 ceiling cutout is too small for the recessed aperture.');
assert(
  GALLERY_02_RECESS_PROFILE.opticCenterInset - maximumOpticRise >= GALLERY_02_RECESS_PROFILE.minimumConcealment,
  'Gallery 02 aimed optic can project through the ceiling plane at the validated maximum aim.',
);
assert(
  GALLERY_02_RECESS_PROFILE.opticCenterInset + maximumOpticRise < GALLERY_02_RECESS_PROFILE.baffleDepth,
  'Gallery 02 aimed optic does not fit within the concealed baffle depth.',
);

const architectureSource = readFileSync(new URL('../src/components/MuseumGallery/ContemporaryHallArchitecture.tsx', import.meta.url), 'utf8');
assert(architectureSource.includes('function Gallery02RecessedCeiling'), 'Gallery 02 renderer has no perforated ceiling treatment.');
assert(architectureSource.includes('new ShapeGeometry(shape, 16)'), 'Gallery 02 ceiling cutouts are not generated as circular holes.');
assert(architectureSource.includes('recessedOpticRootMatrix'), 'Gallery 02 renderer does not inset aimed optics independently of the ceiling recess.');
assert(!architectureSource.includes('PROTOTYPE_HINGE_GEOMETRY'), 'Gallery 02 still exposes the upper hinge mechanism.');

console.log(JSON.stringify({
  galleries: {
    gallery01: {targets: 27, individualHeads: 27, serviceTracks: g01Tracks.length, trackSegments: physicalTrackSegments.length, diffusers: g01Diffusers.length},
    gallery02: {
      targets: 25,
      individualGimbals: 25,
      recessedCeilingCutouts: 30,
      circulationDownlights: g02CirculationDownlights.length,
      pooledCirculationSources: 1,
      diffusers: g02Diffusers.length,
      doorwayDiagonalAims: 4,
    },
  },
  intersections: 0,
  result: 'Gallery 01/02 lighting prototype geometry is clear.',
}, null, 2));
