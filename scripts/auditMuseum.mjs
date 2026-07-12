import assert from 'node:assert/strict';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const virtualEntry = 'virtual:philosophy-atlas-museum-audit';
const resolvedEntry = `\0${virtualEntry}`;
const result = await build({
  root: repoRoot,
  configFile: false,
  logLevel: 'silent',
  plugins: [{
    name: 'museum-audit-entry',
    resolveId: (id) => id === virtualEntry ? resolvedEntry : undefined,
    load: (id) => id === resolvedEntry ? `
      export * from '/src/data/museumCatalog.ts';
      export * from '/src/data/museum/ancientGreekHall.ts';
      export * from '/src/components/MuseumGallery/museumMovement.ts';
      export * from '/src/components/MuseumGallery/museumSession.ts';
      export {branches} from '/src/data/branches.ts';
      export {philosophers} from '/src/data/philosophers.ts';
    ` : undefined,
  }],
  build: {
    ssr: true,
    write: false,
    minify: false,
    target: 'node18',
    rollupOptions: {input: virtualEntry, output: {format: 'es', codeSplitting: false}},
  },
});
const outputs = (Array.isArray(result) ? result : [result]).flatMap(({output}) => output);
const entry = outputs.find((item) => item.type === 'chunk' && item.isEntry);
assert(entry, 'Vite did not produce an executable Museum audit entry.');
const moduleUrl = `data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`;
const museum = await import(moduleUrl);
const {
  ANCIENT_GREEK_HALL_LAYOUT: layout,
  MUSEUM_HALLS,
  branches,
  philosophers,
  circleIntersectsCollider,
  isValidMuseumPosition,
  moveWithCollisions,
  normalizeMoveInput,
  parseMuseumSession,
  sanitizeMuseumPose,
} = museum;

let checks = 0;
const check = (name, assertion) => {
  assertion();
  checks += 1;
  console.log(`✓ ${name}`);
};
const unique = (values) => new Set(values).size === values.length;
const finitePoint = (point) => Number.isFinite(point.x) && Number.isFinite(point.z);
const insideBounds = (point, radius = 0) => point.x >= layout.bounds.minX + radius
  && point.x <= layout.bounds.maxX - radius
  && point.z >= layout.bounds.minZ + radius
  && point.z <= layout.bounds.maxZ - radius;
const intersects = (point, radius, collider) => {
  const cos = Math.cos(-collider.rotation);
  const sin = Math.sin(-collider.rotation);
  const dx = point.x - collider.center.x;
  const dz = point.z - collider.center.z;
  const localX = dx * cos - dz * sin;
  const localZ = dx * sin + dz * cos;
  const halfWidth = collider.size.width / 2;
  const halfDepth = collider.size.depth / 2;
  const nearestX = Math.max(-halfWidth, Math.min(halfWidth, localX));
  const nearestZ = Math.max(-halfDepth, Math.min(halfDepth, localZ));
  return Math.hypot(localX - nearestX, localZ - nearestZ) < radius - 1e-7;
};
const allColliders = [...layout.wallColliders, ...layout.obstacleColliders];

check('one initial Museum hall and the ancient Greek hall exist', () => {
  assert.equal(MUSEUM_HALLS.length, 1);
  assert.equal(MUSEUM_HALLS[0].id, 'ancient-greek');
  assert.equal(layout.id, MUSEUM_HALLS[0].id);
});

check('the catalog contains eight unique exhibits in three unique zones', () => {
  const hall = MUSEUM_HALLS[0];
  assert.equal(hall.exhibits.length, 8);
  assert.equal(hall.zones.length, 3);
  assert(unique(hall.exhibits.map(({id}) => id)));
  assert(unique(hall.zones.map(({id}) => id)));
  const zones = new Set(hall.zones.map(({id}) => id));
  for (const exhibit of hall.exhibits) assert(zones.has(exhibit.zoneId));
});

check('exhibit entity references exist and match their declared kinds', () => {
  const philosopherIds = new Set(philosophers.map(({id}) => id));
  const branchIds = new Set(branches.map(({id}) => id));
  for (const exhibit of MUSEUM_HALLS[0].exhibits) {
    const targets = exhibit.entityKind === 'philosopher' ? philosopherIds : branchIds;
    assert(targets.has(exhibit.entityId), `${exhibit.id} has an unknown ${exhibit.entityKind} target`);
  }
});

check('guided order contains every exhibit exactly once', () => {
  const hall = MUSEUM_HALLS[0];
  assert.equal(hall.guidedOrder.length, hall.exhibits.length);
  assert(unique(hall.guidedOrder));
  assert.deepEqual([...hall.guidedOrder].sort(), hall.exhibits.map(({id}) => id).sort());
});

check('the route catalog and full layout agree exactly', () => {
  assert.deepEqual(
    layout.exhibits.map(({id}) => id).sort(),
    MUSEUM_HALLS[0].exhibits.map(({id}) => id).sort(),
  );
  assert.deepEqual([...layout.guidedOrder], [...MUSEUM_HALLS[0].guidedOrder]);
});

check('bounds, spawn, reset, placements, and viewpoints are finite', () => {
  assert(layout.bounds.minX < layout.bounds.maxX && layout.bounds.minZ < layout.bounds.maxZ);
  assert(layout.playerRadius > 0 && layout.eyeHeight > 0);
  for (const pose of [layout.spawn, layout.reset]) {
    assert(finitePoint(pose) && Number.isFinite(pose.yaw) && Number.isFinite(pose.pitch));
  }
  for (const exhibit of layout.exhibits) {
    assert(finitePoint(exhibit.position));
    assert(finitePoint(exhibit.viewpoint));
    assert(Number.isFinite(exhibit.rotationY));
    assert(Number.isFinite(exhibit.viewpoint.yaw) && Number.isFinite(exhibit.viewpoint.pitch));
    assert(exhibit.interactionRadius > 0);
  }
});

check('all collider dimensions and rotations are valid', () => {
  assert(unique(allColliders.map(({id}) => id)));
  for (const collider of allColliders) {
    assert(finitePoint(collider.center));
    assert(collider.size.width > 0 && collider.size.depth > 0);
    assert(Number.isFinite(collider.rotation));
  }
});

check('spawn, reset, and viewpoints are safe for the player footprint', () => {
  for (const [label, point] of [
    ['spawn', layout.spawn],
    ['reset', layout.reset],
    ...layout.exhibits.map((exhibit) => [`${exhibit.id} viewpoint`, exhibit.viewpoint]),
  ]) {
    assert(insideBounds(point, layout.playerRadius), `${label} is outside the walkable bounds`);
    assert(!allColliders.some((collider) => intersects(point, layout.playerRadius, collider)), `${label} intersects a collider`);
  }
});

check('core movement and collision functions handle representative boundaries', () => {
  const diagonal = normalizeMoveInput(1, 1);
  assert(Math.abs(Math.hypot(diagonal.x, diagonal.z) - 1) < 1e-9);
  const wall = layout.wallColliders.find(({id}) => id === 'wall-west');
  assert(wall);
  assert(circleIntersectsCollider(wall.center, layout.playerRadius, wall));
  const bounded = moveWithCollisions(
    layout.spawn,
    {x: -100, z: 0},
    layout.playerRadius,
    layout.bounds,
    allColliders,
  );
  assert(isValidMuseumPosition(bounded, layout.playerRadius, layout.bounds, allColliders));
  assert(bounded.x >= layout.bounds.minX + layout.playerRadius);
  const plinth = layout.exhibits.find(({id}) => id === 'plato').collider;
  const blocked = moveWithCollisions(
    {x: 4.2, z: 16.5},
    {x: 4, z: 0},
    layout.playerRadius,
    layout.bounds,
    allColliders,
  );
  assert(!circleIntersectsCollider(blocked, layout.playerRadius, plinth));
});

check('camera session parsing rejects malformed and unsafe values', () => {
  const valid = JSON.stringify({version: 1, hallId: layout.id, ...layout.spawn});
  assert(parseMuseumSession(valid, layout));
  assert.equal(parseMuseumSession('{bad json', layout), undefined);
  assert.equal(parseMuseumSession(JSON.stringify({version: 1, hallId: 'wrong', ...layout.spawn}), layout), undefined);
  assert.equal(parseMuseumSession(JSON.stringify({version: 1, hallId: layout.id, x: null, z: 0, yaw: 0, pitch: 0}), layout), undefined);
  assert.equal(sanitizeMuseumPose({...layout.spawn, x: Number.POSITIVE_INFINITY}, layout), undefined);
  const insidePlinth = layout.exhibits.find(({id}) => id === 'plato').collider.center;
  assert.equal(sanitizeMuseumPose({...insidePlinth, yaw: 0, pitch: 0}, layout), undefined);
});

console.log(`\nMuseum audit passed: ${checks} groups covering ${MUSEUM_HALLS[0].exhibits.length} exhibits, ${MUSEUM_HALLS[0].zones.length} zones, and ${allColliders.length} colliders.`);
