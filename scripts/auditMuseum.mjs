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
      export * from '/src/data/museum/museumAssets.ts';
      export * from '/src/data/museum/museumInterpretations.ts';
      export * from '/src/components/MuseumGallery/museumMovement.ts';
      export * from '/src/components/MuseumGallery/museumRuntime.ts';
      export * from '/src/components/MuseumGallery/museumSession.ts';
      export * from '/src/components/MuseumGallery/museumVisitState.ts';
      export * from '/src/components/MuseumGallery/museumWorldTransform.ts';
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
  ANCIENT_GREEK_HALL_DEFINITION: definition,
  MUSEUM_ASSETS,
  MUSEUM_HALLS,
  MUSEUM_INTERPRETATIONS,
  branches,
  philosophers,
  circleIntersectsCollider,
  isValidMuseumPosition,
  moveWithCollisions,
  normalizeMoveInput,
  parseMuseumSession,
  sanitizeMuseumPose,
  setMuseumMovementDisplacement,
  hasMuseumBrowserModifier,
  createMuseumExhibitVisitContext,
  directMuseumVisitContext,
  museumHistoryStateWithVisitContext,
  parseMuseumExhibitVisitContext,
  resolveMuseumExitPolicy,
  museumPointToWorld,
  museumPoseToWorld,
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
const aabbOverlaps = (first, second) => {
  const separated = Math.abs(first.center.x - second.center.x) >= (first.size.width + second.size.width) / 2
    || Math.abs(first.center.y - second.center.y) >= (first.size.height + second.size.height) / 2
    || Math.abs(first.center.z - second.center.z) >= (first.size.depth + second.size.depth) / 2;
  return !separated;
};
const volumeInsideFootprint = (volume, footprint) => (
  Math.abs(volume.center.x) + volume.size.width / 2 <= footprint.width / 2 + 1e-7
  && volume.center.y - volume.size.height / 2 >= -1e-7
  && volume.center.y + volume.size.height / 2 <= footprint.height + 1e-7
  && Math.abs(volume.center.z) + volume.size.depth / 2 <= footprint.depth / 2 + 1e-7
);
const wordCount = (value) => value.trim().split(/\s+/).filter(Boolean).length;

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
    assert.equal(exhibit.id, exhibit.entityId, `${exhibit.id} must keep a stable entity-matching exhibit ID`);
    const targets = exhibit.entityKind === 'philosopher' ? philosopherIds : branchIds;
    assert(targets.has(exhibit.entityId), `${exhibit.id} has an unknown ${exhibit.entityKind} target`);
  }
});

check('the mandated three-zone collection shape is preserved', () => {
  const exhibits = MUSEUM_HALLS[0].exhibits;
  const count = (zoneId, entityKind) => exhibits.filter((item) =>
    item.zoneId === zoneId && item.entityKind === entityKind).length;
  assert.equal(count('classical-foundations', 'philosopher'), 3);
  assert.equal(count('classical-foundations', 'branch'), 0);
  assert.equal(count('hellenistic-ways', 'branch'), 4);
  assert.equal(count('hellenistic-ways', 'philosopher'), 0);
  assert.equal(count('late-antiquity', 'branch'), 1);
  assert.equal(count('late-antiquity', 'philosopher'), 0);
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

check('movement and every recommended viewpoint follow the rendered camera heading', () => {
  for (const yaw of [0, Math.PI / 4, Math.PI / 2, -Math.PI / 2]) {
    const heading = setMuseumMovementDisplacement({x: 0, z: 0}, {x: 0, z: 1}, yaw, 1);
    assert(Math.abs(heading.x + Math.sin(yaw)) < 1e-9);
    assert(Math.abs(heading.z + Math.cos(yaw)) < 1e-9);
  }
  for (const exhibit of layout.exhibits) {
    const heading = setMuseumMovementDisplacement(
      {x: 0, z: 0},
      {x: 0, z: 1},
      exhibit.viewpoint.yaw,
      1,
    );
    const dx = exhibit.position.x - exhibit.viewpoint.x;
    const dz = exhibit.position.z - exhibit.viewpoint.z;
    const distance = Math.hypot(dx, dz);
    const facingDot = (heading.x * dx + heading.z * dz) / distance;
    assert(facingDot > .99, `${exhibit.id} viewpoint must face its installation`);
  }
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

check('the world definition is the single source for the current hall boundary', () => {
  assert.equal(definition.id, layout.id);
  assert.equal(definition.layout, layout);
  assert.deepEqual(definition.worldTransform, {x: 0, z: 0, yaw: 0});
  assert.deepEqual(definition.entrances.map(({id}) => id), ['south-entry']);
  assert.deepEqual(definition.entrances[0].arrivalPose, layout.spawn);
  assert(definition.entrances[0].transitionBounds.size.width > 0);
  assert(definition.entrances[0].transitionBounds.size.depth > 0);
  assert.deepEqual(definition.connections, []);
  assert.deepEqual(definition.prefetch.adjacentHallIds, []);
  const catalogAssetIds = MUSEUM_HALLS[0].exhibits.flatMap((item) => [item.principalAssetId, ...item.supportingAssetIds]);
  assert.deepEqual([...definition.prefetch.sceneAssetIds].sort(), [...catalogAssetIds].sort());
});

check('hall origins transform local scene and camera coordinates consistently', () => {
  const translated = {...definition, worldTransform: {x: 100, z: -40, yaw: Math.PI / 2}};
  const point = museumPointToWorld(translated, {x: 2, z: 3});
  assert(Math.abs(point.x - 103) < 1e-9);
  assert(Math.abs(point.z + 42) < 1e-9);
  const pose = museumPoseToWorld(translated, {x: 2, z: 3, yaw: -.25, pitch: .1});
  assert.deepEqual({x: pose.x, z: pose.z}, point);
  assert(Math.abs(pose.yaw - (Math.PI / 2 - .25)) < 1e-9);
  assert.equal(pose.pitch, .1);
  for (const entrance of definition.entrances) {
    assert(insideBounds(entrance.arrivalPose, layout.playerRadius), `${entrance.id} arrival is outside the hall`);
    assert(!allColliders.some((collider) => intersects(entrance.arrivalPose, layout.playerRadius, collider)), `${entrance.id} arrival intersects a collider`);
  }
});

check('every installation declares supported physical mounts and contained volumes', () => {
  const supportedMounts = new Set(['wall-frame', 'recess-frame', 'lectern', 'freestanding-panel']);
  const assetIds = new Set(MUSEUM_ASSETS.map(({id}) => id));
  for (const exhibit of layout.exhibits) {
    const catalog = MUSEUM_HALLS[0].exhibits.find(({id}) => id === exhibit.id);
    assert(catalog, `${exhibit.id} is absent from the catalog`);
    const scene = exhibit.scene;
    const expectedAssets = [catalog.principalAssetId, ...catalog.supportingAssetIds];
    assert.equal(scene.mediaMounts.length, expectedAssets.length, `${exhibit.id} must mount every catalog asset exactly once`);
    assert.deepEqual(scene.mediaMounts.map(({assetId}) => assetId).sort(), [...expectedAssets].sort());
    const anchorIds = new Set(scene.objectBounds.map(({id}) => id));
    const volumes = [
      scene.plaque.bounds,
      scene.plaque.supportBounds,
      scene.interactionBounds,
      ...scene.objectBounds,
      ...scene.mediaMounts.flatMap(({bounds, supportBounds}) => [bounds, supportBounds]),
    ];
    assert(unique(volumes.map(({id}) => id)), `${exhibit.id} repeats a scene volume ID`);
    for (const volume of volumes) {
      assert(volume.size.width > 0 && volume.size.height > 0 && volume.size.depth > 0, `${volume.id} has invalid dimensions`);
      assert(volumeInsideFootprint(volume, scene.footprint), `${volume.id} escapes ${exhibit.id}'s declared footprint`);
    }
    for (const mount of scene.mediaMounts) {
      assert(supportedMounts.has(mount.kind), `${mount.id} uses unsupported mount ${mount.kind}`);
      assert(assetIds.has(mount.assetId), `${mount.id} references a missing asset`);
      assert(anchorIds.has(mount.anchorId), `${mount.id} has no physical anchor ${mount.anchorId}`);
      assert(mount.width > 0 && mount.height > 0 && mount.frameDepth > 0 && mount.supportHeight >= 0);
      const anchor = scene.objectBounds.find(({id}) => id === mount.anchorId);
      assert(anchor);
      if (mount.kind === 'wall-frame') {
        assert(aabbOverlaps(mount.supportBounds, anchor), `${mount.id} brackets do not attach to ${anchor.id}`);
      } else {
        const supportBottom = mount.supportBounds.center.y - mount.supportBounds.size.height / 2;
        const anchorTop = anchor.center.y + anchor.size.height / 2;
        assert(Math.abs(supportBottom - anchorTop) < 1e-7, `${mount.id} support does not contact ${anchor.id}`);
      }
    }
    const plaqueAnchor = scene.objectBounds.find(({id}) => id === scene.plaque.anchorId);
    assert(plaqueAnchor || scene.plaque.anchorId === 'gallery-floor', `${scene.plaque.id} has no physical anchor ${scene.plaque.anchorId}`);
    const plaqueBottom = scene.plaque.supportBounds.center.y - scene.plaque.supportBounds.size.height / 2;
    const plaqueAnchorTop = plaqueAnchor ? plaqueAnchor.center.y + plaqueAnchor.size.height / 2 : 0;
    assert(Math.abs(plaqueBottom - plaqueAnchorTop) < 1e-7, `${scene.plaque.id} support does not contact ${scene.plaque.anchorId}`);
    const occupied = [
      ...scene.objectBounds,
      ...scene.mediaMounts.flatMap(({bounds, supportBounds}) => [bounds, supportBounds]),
    ];
    for (const plaqueVolume of [scene.plaque.bounds, scene.plaque.supportBounds]) {
      for (const other of occupied) assert(!aabbOverlaps(plaqueVolume, other), `${plaqueVolume.id} intersects ${other.id}`);
    }
    assert.deepEqual(exhibit.collider.center, exhibit.position, `${exhibit.id} collider center drifted from placement`);
    assert.equal(exhibit.collider.size.width, scene.footprint.width, `${exhibit.id} collider width drifted from footprint`);
    assert.equal(exhibit.collider.size.depth, scene.footprint.depth, `${exhibit.id} collider depth drifted from footprint`);
    assert.equal(exhibit.collider.rotation, exhibit.rotationY, `${exhibit.id} collider rotation drifted from placement`);
  }
});

check('the entrance corridor is clear and the removed directory kiosk has no collider', () => {
  assert(!layout.obstacleColliders.some(({id}) => /kiosk|directory/i.test(id)), 'a removed kiosk collider remains');
  for (const collider of layout.obstacleColliders) {
    const intrudes = collider.center.z > 24 && Math.abs(collider.center.x) < 2 + collider.size.width / 2;
    assert(!intrudes, `${collider.id} obstructs the entrance corridor`);
  }
});

check('dedicated Museum interpretations cover every exhibit and object', () => {
  assert.equal(MUSEUM_INTERPRETATIONS.length, MUSEUM_HALLS[0].exhibits.length);
  assert(unique(MUSEUM_INTERPRETATIONS.map(({id}) => id)));
  assert.deepEqual(MUSEUM_INTERPRETATIONS.map(({id}) => id).sort(), MUSEUM_HALLS[0].exhibits.map(({id}) => id).sort());
  for (const record of MUSEUM_INTERPRETATIONS) {
    const catalog = MUSEUM_HALLS[0].exhibits.find(({id}) => id === record.id);
    assert(catalog);
    const count = wordCount(record.lead);
    assert(count >= 130 && count <= 230, `${record.id} lead has ${count} words; expected 130–230`);
    assert(record.sections.length >= 3, `${record.id} needs at least three interpretation sections`);
    assert(record.sources.length >= 3, `${record.id} needs at least three interpretation sources`);
    assert(unique(record.sources.map(({url}) => url)), `${record.id} repeats an interpretation source`);
    for (const source of record.sources) {
      assert(source.label.trim(), `${record.id} has a blank interpretation source label`);
      const sourceUrl = new URL(source.url);
      assert.equal(sourceUrl.protocol, 'https:', `${record.id} interpretation sources must use HTTPS`);
      assert(['academic-reference', 'primary-text', 'collection-record'].includes(source.kind), `${record.id} has an invalid source kind`);
    }
    assert(record.keyIdeas.length >= 3 && record.keyWorks.length >= 3, `${record.id} needs substantial idea and work lists`);
    for (const assetId of [catalog.principalAssetId, ...catalog.supportingAssetIds]) {
      assert(record.objectInterpretations[assetId]?.trim(), `${record.id} lacks interpretation for ${assetId}`);
    }
    assert(MUSEUM_HALLS[0].exhibits.some(({id}) => id === record.relatedExhibitId), `${record.id} has an invalid related exhibit`);
  }
});

check('typed exhibit origins produce explicit close and history policies', () => {
  const expected = {
    'active-exploration': {navigation: 'back', resumeExploration: true, requestPointerLock: true, restoreDirectory: false},
    'paused-hall': {navigation: 'back', resumeExploration: false, requestPointerLock: false, restoreDirectory: false},
    directory: {navigation: 'back', resumeExploration: false, requestPointerLock: false, restoreDirectory: true},
    guided: {navigation: 'back', resumeExploration: false, requestPointerLock: false, restoreDirectory: false},
    direct: {navigation: 'replace-hall', resumeExploration: false, requestPointerLock: false, restoreDirectory: false},
  };
  for (const [origin, policy] of Object.entries(expected)) {
    const context = createMuseumExhibitVisitContext(layout.id, origin);
    assert.deepEqual(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: context}, layout.id), context);
    assert.deepEqual(resolveMuseumExitPolicy(context, 'gesture'), policy);
    const historyPolicy = resolveMuseumExitPolicy(context, 'history');
    assert.equal(historyPolicy.requestPointerLock, false);
    assert.equal(historyPolicy.resumeExploration, origin === 'active-exploration');
  }
  const direct = directMuseumVisitContext(layout.id);
  const carried = museumHistoryStateWithVisitContext({unrelated: 7}, direct);
  assert.equal(carried.unrelated, 7);
  assert.deepEqual(parseMuseumExhibitVisitContext(carried, layout.id), direct);
  assert.equal(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: {...direct, version: 1}}, layout.id), undefined);
  assert.equal(parseMuseumExhibitVisitContext(carried, 'not-a-hall'), undefined);
});

check('Museum controls preserve modified browser shortcuts', () => {
  assert.equal(hasMuseumBrowserModifier({altKey: true, ctrlKey: false, metaKey: false}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: true, metaKey: false}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: false, metaKey: true}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: false, metaKey: false}), false);
});

console.log(`\nMuseum audit passed: ${checks} groups covering ${MUSEUM_HALLS[0].exhibits.length} exhibits, ${MUSEUM_HALLS[0].zones.length} zones, and ${allColliders.length} colliders.`);
