import {readFileSync} from 'node:fs';
import {createServer} from 'vite';

const artifact = JSON.parse(readFileSync(new URL(
  '../artifacts/museum-lighting-rollout/phase-1/installation-manifest.json',
  import.meta.url,
), 'utf8'));
const rendererSource = readFileSync(new URL(
  '../src/components/MuseumGallery/ContemporaryHallArchitecture.tsx',
  import.meta.url,
), 'utf8');

const failures = [];
const checks = new Map();
const pass = (id) => checks.set(id, (checks.get(id) ?? 0) + 1);
const assert = (condition, id, detail) => {
  if (condition) pass(id);
  else failures.push(`[${id}] ${detail}`);
};
const close = (a, b, tolerance = .001) => Math.abs(a - b) <= tolerance;
const pointClose = (a, b, tolerance = .001) => a && b
  && close(a.x, b.x, tolerance)
  && close(a.y, b.y, tolerance)
  && close(a.z, b.z, tolerance);
const rect = (id, center, size) => ({
  id,
  minX: center.x - size.width / 2,
  maxX: center.x + size.width / 2,
  minZ: center.z - size.depth / 2,
  maxZ: center.z + size.depth / 2,
});
const overlaps = (a, b, padding = 0) => a.minX < b.maxX + padding
  && a.maxX > b.minX - padding
  && a.minZ < b.maxZ + padding
  && a.maxZ > b.minZ - padding;
const circleOverlapsRect = (point, radius, area) => {
  const x = Math.max(area.minX, Math.min(point.x, area.maxX));
  const z = Math.max(area.minZ, Math.min(point.z, area.maxZ));
  return Math.hypot(point.x - x, point.z - z) < radius - .0001;
};
const physicalCellKey = (cell) => {
  const bounds = cell.renderBounds ?? cell.bounds;
  return [bounds.minX, bounds.maxX, bounds.minZ, bounds.maxZ].map((value) => value.toFixed(3)).join(':');
};
const localPoint = (point, center, rotation) => {
  const dx = point.x - center.x;
  const dz = point.z - center.z;
  return {
    x: dx * Math.cos(rotation) - dz * Math.sin(rotation),
    z: dx * Math.sin(rotation) + dz * Math.cos(rotation),
  };
};
const circleOverlapsCollider = (point, radius, collider) => {
  const local = localPoint(point, collider.center, collider.rotation);
  return circleOverlapsRect(local, radius, {
    minX: -collider.size.width / 2,
    maxX: collider.size.width / 2,
    minZ: -collider.size.depth / 2,
    maxZ: collider.size.depth / 2,
  });
};
const orientedRectsOverlap = (a, b) => {
  const axes = [
    {x: Math.cos(a.rotation), z: Math.sin(a.rotation)},
    {x: -Math.sin(a.rotation), z: Math.cos(a.rotation)},
    {x: Math.cos(b.rotation), z: Math.sin(b.rotation)},
    {x: -Math.sin(b.rotation), z: Math.cos(b.rotation)},
  ];
  const delta = {x: b.center.x - a.center.x, z: b.center.z - a.center.z};
  const basis = (item) => [
    {x: Math.cos(item.rotation), z: Math.sin(item.rotation), extent: item.size.width / 2},
    {x: -Math.sin(item.rotation), z: Math.cos(item.rotation), extent: item.size.depth / 2},
  ];
  const aBasis = basis(a);
  const bBasis = basis(b);
  return axes.every((axis) => {
    const centerDistance = Math.abs(delta.x * axis.x + delta.z * axis.z);
    const radius = (items) => items.reduce((sum, item) => sum
      + Math.abs(item.x * axis.x + item.z * axis.z) * item.extent, 0);
    return centerDistance < radius(aBasis) + radius(bBasis) - .0001;
  });
};
const rectOverlapsCollider = (area, collider) => orientedRectsOverlap({
  center: {x: (area.minX + area.maxX) / 2, z: (area.minZ + area.maxZ) / 2},
  size: {width: area.maxX - area.minX, depth: area.maxZ - area.minZ},
  rotation: 0,
}, collider);
const distancePointToCollider = (point, collider) => {
  const local = localPoint(point, collider.center, collider.rotation);
  const nearestX = Math.max(-collider.size.width / 2, Math.min(collider.size.width / 2, local.x));
  const nearestZ = Math.max(-collider.size.depth / 2, Math.min(collider.size.depth / 2, local.z));
  return Math.hypot(local.x - nearestX, local.z - nearestZ);
};
const sampledPathClearance = (path, colliders) => {
  let minimum = Number.POSITIVE_INFINITY;
  for (let index = 0; index < path.points.length - 1; index += 1) {
    const start = path.points[index];
    const end = path.points[index + 1];
    const samples = Math.max(1, Math.ceil(Math.hypot(end.x - start.x, end.z - start.z) / .1));
    for (let sample = 0; sample <= samples; sample += 1) {
      const ratio = sample / samples;
      const point = {
        x: start.x + (end.x - start.x) * ratio,
        z: start.z + (end.z - start.z) * ratio,
      };
      for (const collider of colliders) minimum = Math.min(minimum, distancePointToCollider(point, collider));
    }
  }
  return minimum;
};
const segmentColliderInterval = (start, end, collider) => {
  const a = localPoint(start, collider.center, collider.rotation);
  const b = localPoint(end, collider.center, collider.rotation);
  const bounds = {
    minX: -collider.size.width / 2,
    maxX: collider.size.width / 2,
    minZ: -collider.size.depth / 2,
    maxZ: collider.size.depth / 2,
  };
  let low = 0;
  let high = 1;
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  for (const [p, q] of [
    [-dx, a.x - bounds.minX],
    [dx, bounds.maxX - a.x],
    [-dz, a.z - bounds.minZ],
    [dz, bounds.maxZ - a.z],
  ]) {
    if (Math.abs(p) < 1e-9) {
      if (q < 0) return undefined;
      continue;
    }
    const ratio = q / p;
    if (p < 0) low = Math.max(low, ratio);
    else high = Math.min(high, ratio);
    if (low > high) return undefined;
  }
  return {low, high};
};
const transformPoint = (position, rotationY, local) => ({
  x: position.x + local.x * Math.cos(rotationY) + local.z * Math.sin(rotationY),
  y: local.y,
  z: position.z - local.x * Math.sin(rotationY) + local.z * Math.cos(rotationY),
});
const angleBetween = (a, b) => {
  const cosine = Math.max(-1, Math.min(1, (
    a.x * b.x + a.y * b.y + a.z * b.z
  ) / (Math.hypot(a.x, a.y, a.z) * Math.hypot(b.x, b.y, b.z))));
  return Math.acos(cosine) * 180 / Math.PI;
};
const expectedFixtureSystem = (classification) => classification.includes('track') ? 'track' : 'recessed';
const expectedBeamCategory = (selected) => selected <= 30
  ? 'narrow'
  : selected <= 45
    ? 'medium'
    : selected <= 60
      ? 'wide-flood'
      : selected <= 75
        ? 'extra-wide-flood'
        : 'very-wide-framing-or-wallwash';

const vite = await createServer({server: {middlewareMode: true}, appType: 'custom', logLevel: 'silent'});
try {
  const [world, route, building, rolloutModule] = await Promise.all([
    vite.ssrLoadModule('/src/data/museum/museumWorldDefinitions.ts'),
    vite.ssrLoadModule('/src/data/museum/museumPublicRoute.ts'),
    vite.ssrLoadModule('/src/data/museum/museumBuildingManifest.ts'),
    vite.ssrLoadModule('/src/data/museum/museumLightingRollout.ts'),
  ]);
  const definitions = new Map(world.MUSEUM_WORLD_DEFINITIONS.map((definition) => [definition.id, definition]));
  const gallerySpecs = new Map(artifact.galleries.map((gallery) => [gallery.hallId, gallery]));
  const installationSpecs = new Map(artifact.installations.map((installation) => [installation.installationKey, installation]));
  const publicIds = [...route.MUSEUM_PUBLIC_ROUTE_HALL_IDS];
  const rolloutIds = publicIds.slice(2);
  const liveEndpoints = new Set(building.MUSEUM_BUILDING_MANIFEST.connections
    .filter(({implementationStatus, accessible}) => implementationStatus === 'live' && accessible)
    .flatMap(({a, b}) => [`${a.nodeId}/${a.slotId}`, `${b.nodeId}/${b.slotId}`]));
  const activeDoorways = new Map(building.MUSEUM_BUILDING_MANIFEST.nodes.map((node) => [
    node.publicHallId,
    node.doorwaySlots.filter(({id}) => liveEndpoints.has(`${node.id}/${id}`)),
  ]));

  assert(publicIds.length === 26, 'route', `Expected 26 public galleries; found ${publicIds.length}.`);
  assert(rolloutIds.length === 24, 'route', `Expected 24 rollout galleries; found ${rolloutIds.length}.`);
  assert(artifact.summary.rolloutGallery03To26InstallationCount === 551, 'artifact-authority', 'Phase 1 rollout total changed.');

  const locked = publicIds.slice(0, 2).map((id) => definitions.get(id));
  assert(locked[0]?.layout.lighting.prototypeId === 'gallery-01-option-a', 'locked-reference', 'Gallery 01 prototype changed.');
  assert(locked[1]?.layout.lighting.prototypeId === 'gallery-02-option-a', 'locked-reference', 'Gallery 02 prototype changed.');
  assert(!locked.some(({layout}) => layout.lighting.lightingStandard), 'locked-reference', 'Gallery 01/02 entered production rollout dispatch.');
  assert((locked[0]?.layout.lighting.fixtures?.length ?? 0) === 27, 'locked-reference', 'Gallery 01 fixture count changed.');
  assert((locked[1]?.layout.lighting.fixtures?.length ?? 0) === 25, 'locked-reference', 'Gallery 02 fixture count changed.');
  for (const definition of locked) {
    const number = publicIds.indexOf(definition.id) + 1;
    for (const fixture of definition.layout.lighting.fixtures ?? []) {
      const kind = fixture.sourceIds[0].split(':')[0];
      const stableId = fixture.sourceIds[0].slice(kind.length + 1);
      const expected = installationSpecs.get(`${definition.id}/${kind}/${stableId}`)?.proposedFixture;
      assert(pointClose(fixture.mountPosition, expected?.sourceLocalM), 'locked-reference', `Gallery ${number} ${fixture.id} source changed.`);
      assert(pointClose(fixture.target, expected?.targetLocalM), 'locked-reference', `Gallery ${number} ${fixture.id} target changed.`);
    }
  }

  let rolloutFixtureCount = 0;
  let rolloutOverrideCount = 0;
  const allFixtureIds = new Set();
  const allInstallationKeys = new Set();
  const foundOverrides = new Set();
  const gallerySummary = [];

  for (const hallId of rolloutIds) {
    const definition = definitions.get(hallId);
    const gallery = gallerySpecs.get(hallId);
    assert(Boolean(definition && gallery), 'runtime-resolution', `${hallId} is missing from runtime or Phase 1.`);
    if (!definition || !gallery) continue;
    const {layout} = definition;
    const lighting = layout.lighting;
    const fixtures = lighting.fixtures ?? [];
    const system = expectedFixtureSystem(gallery.floorplanClassification);
    const installationCount = layout.exhibits.length + (layout.supplementalExhibits?.length ?? 0);
    assert(lighting.lightingStandard?.system === system, 'classification', `${hallId} does not use approved ${system}.`);
    assert(lighting.lightingStandard?.revision === 'rollout-v1', 'classification', `${hallId} has no rollout-v1 revision.`);
    assert(!lighting.prototypeId, 'production-dispatch', `${hallId} still uses prototypeId.`);
    assert(fixtures.length === installationCount, 'bijection', `${hallId}: ${fixtures.length} fixtures for ${installationCount} installs.`);
    assert(fixtures.length === gallery.counts.proposedAccentFixtures, 'bijection', `${hallId} differs from Phase 1 count.`);
    assert(lighting.exhibitLights.length === 0, 'light-budget', `${hallId} has per-exhibit WebGL lights.`);
    rolloutFixtureCount += fixtures.length;

    const currentInstallations = [
      ...layout.exhibits.map((source) => ({
        kind: 'primary', id: source.id, source, media: source.scene.mediaMounts.map((media) => ({
          id: media.id,
          position: {x: media.position[0], y: media.position[1], z: media.position[2]},
          width: media.width,
          height: media.height,
        })),
      })),
      ...(layout.supplementalExhibits ?? []).map((source) => ({
        kind: 'supplemental', id: source.id, source, media: [{
          id: source.mediaMount.id,
          position: {x: source.mediaMount.position[0], y: source.mediaMount.position[1], z: source.mediaMount.position[2]},
          width: source.mediaMount.width,
          height: source.mediaMount.height,
        }],
      })),
    ];
    const fixturesBySource = new Map();
    for (const fixture of fixtures) {
      assert(fixture.sourceIds.length === 1, 'bijection', `${fixture.id} is not independently accountable.`);
      const sourceId = fixture.sourceIds[0];
      assert(!fixturesBySource.has(sourceId), 'bijection', `${hallId} repeats ${sourceId}.`);
      fixturesBySource.set(sourceId, fixture);
      assert(!allFixtureIds.has(fixture.id), 'bijection', `Duplicate fixture ID ${fixture.id}.`);
      allFixtureIds.add(fixture.id);
      assert(fixture.lightingRole === (system === 'track' ? 'track-head' : 'recessed-gimbal'), 'renderer-role', `${fixture.id} has wrong production role.`);
      assert(!fixture.prototypeRole, 'production-dispatch', `${fixture.id} leaks a prototype role.`);
      if (fixture.sourceOverrideId) {
        rolloutOverrideCount += 1;
        foundOverrides.add(fixture.sourceOverrideId);
      }
    }

    const physicalCells = [...new Map(layout.spatialCells.map((cell) => [physicalCellKey(cell), cell])).values()];
    const cellById = new Map(layout.spatialCells.map((cell) => [cell.id, cell]));
    const trackSegments = lighting.tracks.flatMap((track) => track.segments ?? [track]);
    const trackById = new Map(trackSegments.map((track) => [track.id, track]));
    const diffuserRects = (lighting.ambientDiffusers ?? []).map(({id, center, size}) => rect(id, center, size));
    const passageSlots = (lighting.passageIlluminators ?? [])
      .filter(({kind}) => kind === 'slot')
      .map(({id, position, size}) => rect(id, position, size));
    const aperturePoints = [
      ...(lighting.circulationDownlights ?? []).map(({id, position}) => ({id, position, radius: .12})),
      ...(lighting.passageIlluminators ?? []).filter(({kind}) => kind === 'recess')
        .map(({id, position}) => ({id, position, radius: .1})),
    ];
    const doors = activeDoorways.get(hallId) ?? [];
    const walls = layout.wallColliders.filter(({bottom}) => (bottom ?? 0) < .1);
    const trackRects = trackSegments.map(({id, center, size}) => rect(id, center, size));
    const rectangularCeilingElements = [...trackRects, ...diffuserRects, ...passageSlots];
    const crossClearanceRequired = [
      'critique-power-deconstruction',
      'moral-life-practical-reason',
      'feminist-philosophies',
    ].includes(hallId);

    for (const area of rectangularCeilingElements) {
      assert(!doors.some(({landingBounds}) => overlaps(area, landingBounds)), 'ceiling-portal-clearance', `${hallId}/${area.id} enters a live landing.`);
      assert(!walls.some((wall) => rectOverlapsCollider(area, wall)), 'ceiling-wall-clearance', `${hallId}/${area.id} intersects a wall collider.`);
    }
    for (const aperture of aperturePoints) {
      assert(!doors.some(({landingBounds}) => circleOverlapsRect(aperture.position, aperture.radius, landingBounds)), 'ceiling-portal-clearance', `${hallId}/${aperture.id} enters a live landing.`);
      assert(!walls.some((wall) => circleOverlapsCollider(aperture.position, aperture.radius, wall)), 'ceiling-wall-clearance', `${hallId}/${aperture.id} intersects a wall collider.`);
    }
    if (crossClearanceRequired) {
      assert(close(layout.primaryCirculation.clearanceRadius, 1.25), 'crosscut-clearance', `${hallId} no longer declares the approved 1.25 m cross clearance.`);
      const clearance = sampledPathClearance(
        layout.primaryCirculation,
        [...walls, ...layout.obstacleColliders],
      );
      assert(clearance >= 1.25 - .0001, 'crosscut-clearance', `${hallId} final graph leaves only ${clearance.toFixed(3)} m of the required 1.25 m central cross clearance.`);
    }

    for (const item of currentInstallations) {
      const sourceId = `${item.kind}:${item.id}`;
      const fixture = fixturesBySource.get(sourceId);
      const key = `${hallId}/${item.kind}/${item.id}`;
      const expected = installationSpecs.get(key);
      assert(Boolean(fixture && expected), 'bijection', `${key} has no fixture or authoritative record.`);
      if (!fixture || !expected) continue;
      assert(!allInstallationKeys.has(key), 'bijection', `Duplicate installation ${key}.`);
      allInstallationKeys.add(key);
      assert(fixture.id === expected.proposedFixture.fixtureId, 'phase1-match', `${key} fixture ID differs.`);
      assert(pointClose(fixture.mountPosition, expected.proposedFixture.sourceLocalM), 'phase1-match', `${key} source differs.`);
      assert(pointClose(fixture.target, expected.proposedFixture.targetLocalM), 'phase1-match', `${key} target differs.`);
      assert((fixture.trackSegmentId ?? null) === (expected.proposedFixture.trackSegmentId ?? null), 'phase1-match', `${key} track segment differs.`);
      const expectedOverride = expected.proposedFixture.requiredOverride?.id;
      assert(fixture.sourceOverrideId === expectedOverride, 'override-set', `${key} override differs.`);
      if (expectedOverride) assert(foundOverrides.has(expectedOverride), 'override-set', `${expectedOverride} was not applied.`);

      const expanded = item.media.map((media) => {
        const marginX = Math.max(.1, media.width * .05);
        const marginY = Math.max(.1, media.height * .05);
        return {
          id: media.id,
          minX: media.position.x - media.width / 2 - marginX,
          maxX: media.position.x + media.width / 2 + marginX,
          minY: media.position.y - media.height / 2 - marginY,
          maxY: media.position.y + media.height / 2 + marginY,
          z: media.position.z,
        };
      });
      const bounds = {
        minX: Math.min(...expanded.map(({minX}) => minX)),
        maxX: Math.max(...expanded.map(({maxX}) => maxX)),
        minY: Math.min(...expanded.map(({minY}) => minY)),
        maxY: Math.max(...expanded.map(({maxY}) => maxY)),
        minZ: Math.min(...expanded.map(({z}) => z)),
        maxZ: Math.max(...expanded.map(({z}) => z)),
      };
      const target = transformPoint(item.source.position, item.source.rotationY, {
        x: (bounds.minX + bounds.maxX) / 2,
        y: (bounds.minY + bounds.maxY) / 2,
        z: (bounds.minZ + bounds.maxZ) / 2,
      });
      const axis = {
        x: target.x - fixture.mountPosition.x,
        y: target.y - fixture.mountPosition.y,
        z: target.z - fixture.mountPosition.z,
      };
      const cornerAngles = expanded.flatMap((media) => [
        [media.minX, media.minY], [media.minX, media.maxY],
        [media.maxX, media.minY], [media.maxX, media.maxY],
      ].map(([x, y]) => transformPoint(item.source.position, item.source.rotationY, {x, y, z: media.z})))
        .map((corner) => angleBetween(axis, {
          x: corner.x - fixture.mountPosition.x,
          y: corner.y - fixture.mountPosition.y,
          z: corner.z - fixture.mountPosition.z,
        }));
      const required = Math.max(...cornerAngles) * 2;
      const selected = Math.max(20, Math.ceil((required + 2) / 5) * 5);
      assert(pointClose(target, fixture.target), 'beam-coverage', `${key} does not aim at resolved coverage center.`);
      assert(close(fixture.beam?.requiredFullFieldAngleDegrees, required, .011), 'beam-coverage', `${key} required field is stale.`);
      assert(fixture.beam?.selectedMinimumFullFieldAngleDegrees === selected && selected <= 90, 'beam-coverage', `${key} selected optic does not cover all corners.`);
      assert(fixture.beam?.category === expectedBeamCategory(selected), 'beam-coverage', `${key} beam category is stale.`);
      assert(fixture.beam?.installationToleranceReserveDegrees === 2, 'beam-coverage', `${key} installation reserve is not 2 degrees.`);
      assert(Object.entries(bounds).every(([axis, value]) => close(fixture.beam?.expandedMediaBounds?.[axis], value, .00011)), 'beam-coverage', `${key} expanded media bounds are stale.`);
      assert(fixture.beam?.mediaMountIds.join('|') === item.media.map(({id}) => id).join('|'), 'beam-coverage', `${key} media coverage membership differs.`);
      const horizontal = Math.hypot(fixture.target.x - fixture.mountPosition.x, fixture.target.z - fixture.mountPosition.z);
      const aim = Math.atan2(horizontal, fixture.mountPosition.y - fixture.target.y) * 180 / Math.PI;
      assert(aim <= 50.001, 'aim-envelope', `${key} aims ${aim.toFixed(2)} degrees from nadir.`);

      const apertureRadius = system === 'track' ? .16 : .22;
      assert(!doors.some(({landingBounds}) => circleOverlapsRect(fixture.mountPosition, apertureRadius, landingBounds)), 'portal-clearance', `${key} source enters a live landing.`);
      assert(!diffuserRects.some((area) => circleOverlapsRect(fixture.mountPosition, apertureRadius, area)), 'system-separation', `${key} source enters an ambient aperture.`);
      assert(!passageSlots.some((area) => circleOverlapsRect(fixture.mountPosition, apertureRadius, area)), 'system-separation', `${key} source enters a passage slot.`);
      assert(!aperturePoints.some(({position, radius}) => Math.hypot(
        fixture.mountPosition.x - position.x,
        fixture.mountPosition.z - position.z,
      ) < apertureRadius + radius), 'system-separation', `${key} source intersects a circulation/passage recess.`);
      assert(!walls.some((wall) => circleOverlapsCollider(fixture.mountPosition, apertureRadius, wall)), 'wall-clearance', `${key} source intersects ${walls.find((wall) => circleOverlapsCollider(fixture.mountPosition, apertureRadius, wall))?.id}.`);

      let blockedBy;
      for (const wall of walls) {
        const interval = segmentColliderInterval(fixture.mountPosition, fixture.target, wall);
        if (!interval || interval.low >= .94) continue;
        const lowY = fixture.mountPosition.y + (fixture.target.y - fixture.mountPosition.y) * interval.low;
        const highY = fixture.mountPosition.y + (fixture.target.y - fixture.mountPosition.y) * interval.high;
        const wallBottom = wall.bottom ?? 0;
        const wallTop = wallBottom + wall.height;
        if (!(Math.max(lowY, highY) < wallBottom || Math.min(lowY, highY) > wallTop)) {
          blockedBy = wall.id;
          break;
        }
      }
      assert(!blockedBy, 'aim-path', `${key} aim crosses ${blockedBy}.`);

      const cell = cellById.get(item.source.spatialCellId);
      assert(Boolean(cell), 'runtime-resolution', `${key} cell does not exist.`);
      if (system === 'track') {
        const segment = trackById.get(fixture.trackSegmentId);
        assert(Boolean(segment), 'attachment-integration', `${key} track segment does not exist.`);
        if (segment) {
          const area = rect(segment.id, segment.center, segment.size);
          assert(circleOverlapsRect(fixture.mountPosition, .01, area), 'attachment-integration', `${key} head is not attached to ${segment.id}.`);
          assert(close(fixture.mountPosition.y, segment.center.y - .05, .001), 'attachment-integration', `${key} head is vertically detached from its rail.`);
        }
      } else if (cell) {
        assert(close(fixture.mountPosition.y + .035, cell.ceilingHeight, .001), 'attachment-integration', `${key} recess is not integrated into the ceiling plane.`);
      }
    }

    for (let first = 0; first < fixtures.length; first += 1) {
      for (let second = first + 1; second < fixtures.length; second += 1) {
        const a = fixtures[first].mountPosition;
        const b = fixtures[second].mountPosition;
        const minimum = system === 'track' ? .3 : .44;
        assert(Math.hypot(a.x - b.x, a.z - b.z) >= minimum, 'fixture-separation', `${fixtures[first].id} intersects ${fixtures[second].id}.`);
      }
    }
    for (const track of trackRects) {
      assert(!diffuserRects.some((diffuser) => overlaps(track, diffuser)), 'system-separation', `${track.id} intersects an ambient diffuser.`);
    }
    for (const aperture of aperturePoints) {
      assert(!diffuserRects.some((diffuser) => circleOverlapsRect(aperture.position, aperture.radius, diffuser)), 'system-separation', `${aperture.id} intersects an ambient aperture.`);
    }

    const expectedTracks = gallery.ceilingPlan.tracks ?? [];
    assert(trackSegments.length === expectedTracks.length, 'phase1-ceiling', `${hallId} track segment count differs.`);
    for (const expected of expectedTracks) {
      const actual = trackById.get(expected.id);
      assert(Boolean(actual), 'phase1-ceiling', `${hallId} lacks track ${expected.id}.`);
      if (actual) {
        assert(pointClose(actual.center, expected.centerLocalM), 'phase1-ceiling', `${expected.id} center differs.`);
        assert(close(actual.size.width, expected.sizeM.width) && close(actual.size.height, expected.sizeM.height) && close(actual.size.depth, expected.sizeM.depth), 'phase1-ceiling', `${expected.id} size differs.`);
      }
    }
    const expectedDiffusers = gallery.ceilingPlan.ambientDiffusers ?? [];
    const actualDiffusers = new Map((lighting.ambientDiffusers ?? []).map((item) => [item.id, item]));
    assert(actualDiffusers.size === expectedDiffusers.length, 'phase1-ceiling', `${hallId} ambient count differs.`);
    for (const expected of expectedDiffusers) {
      const actual = actualDiffusers.get(expected.id);
      assert(Boolean(actual) && pointClose(actual.center, expected.centerLocalM), 'phase1-ceiling', `${expected.id} center differs.`);
      assert(Boolean(actual) && close(actual.size.width, expected.sizeM.width) && close(actual.size.height, expected.sizeM.height) && close(actual.size.depth, expected.sizeM.depth), 'phase1-ceiling', `${expected.id} size differs.`);
    }
    const expectedCirculation = gallery.ceilingPlan.circulationDownlights ?? [];
    const actualCirculation = new Map((lighting.circulationDownlights ?? []).map((item) => [item.id, item]));
    assert(actualCirculation.size === expectedCirculation.length, 'phase1-ceiling', `${hallId} circulation count differs.`);
    for (const expected of expectedCirculation) {
      const actual = actualCirculation.get(expected.id);
      assert(Boolean(actual) && pointClose(actual.position, expected.centerLocalM), 'phase1-ceiling', `${expected.id} center differs.`);
    }
    const expectedPassages = gallery.ceilingPlan.passageIlluminators ?? [];
    const actualPassages = new Map((lighting.passageIlluminators ?? []).map((item) => [item.id, item]));
    assert(actualPassages.size === expectedPassages.length, 'phase1-ceiling', `${hallId} passage count differs.`);
    for (const expected of expectedPassages) {
      const actual = actualPassages.get(expected.id);
      assert(Boolean(actual) && pointClose(actual.position, expected.centerLocalM), 'phase1-ceiling', `${expected.id} center differs.`);
      const expectedSize = expected.sizeM;
      assert(expectedSize ? actual?.kind === 'slot' && close(actual.size.width, expectedSize.width) && close(actual.size.depth, expectedSize.depth) : actual?.kind === 'recess', 'phase1-ceiling', `${expected.id} form differs.`);
    }

    const physicalRoomCount = new Set(layout.spatialCells.map(physicalCellKey)).size;
    assert(physicalRoomCount === gallery.shell.physicalRoomCount, 'runtime-resolution', `${hallId} physical room count differs.`);
    gallerySummary.push({
      galleryNumber: gallery.galleryNumber,
      hallId,
      system,
      installations: installationCount,
      fixtures: fixtures.length,
      overrides: fixtures.filter(({sourceOverrideId}) => sourceOverrideId).length,
      physicalRooms: physicalCells.length,
    });
  }

  const expectedOverrideIds = new Set(artifact.installations
    .map(({proposedFixture}) => proposedFixture.requiredOverride?.id)
    .filter(Boolean));
  assert(rolloutFixtureCount === 551, 'bijection', `Rollout fixture total is ${rolloutFixtureCount}.`);
  assert(allFixtureIds.size === 551 && allInstallationKeys.size === 551, 'bijection', 'Rollout fixture/installation sets are not 551:551.');
  assert(rolloutOverrideCount === 28 && foundOverrides.size === 28, 'override-set', `Applied ${rolloutOverrideCount}/${foundOverrides.size} overrides.`);
  assert(expectedOverrideIds.size === 28, 'override-set', `Phase 1 declares ${expectedOverrideIds.size} overrides.`);
  assert([...expectedOverrideIds].every((id) => foundOverrides.has(id)), 'override-set', 'Applied override set differs from Phase 1.');
  assert(rolloutModule.MUSEUM_LIGHTING_SOURCE_OVERRIDES.size === 28, 'override-set', 'Source override declaration is not exactly 28 records.');
  assert(gallerySummary.filter(({system}) => system === 'track').length === 12, 'classification', 'Rollout track count is not 12.');
  assert(gallerySummary.filter(({system}) => system === 'recessed').length === 12, 'classification', 'Rollout recessed count is not 12.');

  const g11 = definitions.get('core-questions-forum');
  const g11Primaries = new Set(g11.layout.exhibits.map(({id}) => id));
  const missingParents = (g11.layout.supplementalExhibits ?? [])
    .filter(({parentExhibitId}) => !g11Primaries.has(parentExhibitId))
    .map(({id}) => id).sort();
  assert(missingParents.join('|') === [
    'forum-al-farabi-virtuous-city',
    'forum-confucius-cultivation',
    'forum-maimonides-law',
    'forum-mencius-humane-rule',
  ].join('|'), 'identity-allowance', `G11 comparative-parent allowance differs: ${missingParents.join(', ')}.`);

  assert(rendererSource.includes('const productionDetailed = Boolean(layout.lighting.lightingStandard)'), 'renderer-dispatch', 'Renderer has no production lightingStandard dispatch.');
  assert(rendererSource.includes('const detailedEnabled = productionDetailed || prototypeEnabled'), 'renderer-dispatch', 'Production renderer remains prototype-gated.');
  assert(rendererSource.includes("layout.lighting.lightingStandard?.system === 'recessed'"), 'renderer-dispatch', 'Production recessed ceiling dispatch is missing.');
  assert(rendererSource.includes('lightingRole === \'recessed-gimbal\''), 'renderer-role', 'Circular ceiling cutouts ignore production gimbals.');
  assert(rendererSource.includes('function InstanceBatch'), 'instancing', 'Detailed lighting does not use the shared instance batcher.');
  assert(!rendererSource.includes('<spotLight'), 'light-budget', 'Renderer creates exhibit spotlights.');

  const report = {
    status: failures.length ? 'failed' : 'passed',
    rollout: {
      galleries: gallerySummary.length,
      fixtures: rolloutFixtureCount,
      uniqueFixtures: allFixtureIds.size,
      uniqueInstallations: allInstallationKeys.size,
      overrides: rolloutOverrideCount,
      trackGalleries: gallerySummary.filter(({system}) => system === 'track').length,
      recessedGalleries: gallerySummary.filter(({system}) => system === 'recessed').length,
    },
    checkAssertions: Object.fromEntries([...checks.entries()].sort()),
    galleries: gallerySummary,
    failures,
  };
  console.log(JSON.stringify(report, null, 2));
  if (failures.length) process.exitCode = 1;
} finally {
  await vite.close();
}
