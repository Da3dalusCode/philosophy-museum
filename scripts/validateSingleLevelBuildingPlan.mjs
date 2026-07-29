import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root = process.cwd();
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const plan = readJson('docs/museum-masterplan/single-level-building-plan.json');
const program = readJson('docs/museum-masterplan/hall-program.json');
const runtime = readJson('src/data/museum/museumContinuousEnfiladeManifest.json');

const checks = [];
const check = (title, callback) => checks.push({title, callback});
const sorted = (values) => [...values].sort((a, b) => `${a}`.localeCompare(`${b}`));
const unique = (values) => new Set(values).size === values.length;
const close = (first, second, epsilon = .001) => Math.abs(first - second) <= epsilon;

const templateWorldSize = {
  'sequence-3': {width: 56, depth: 24},
  'crossroads-4': {width: 28, depth: 28},
  'standard-rect': {width: 24, depth: 20},
};

const templateLocalPortals = {
  'sequence-3': {
    N0: {x: 0, z: -28},
    S0: {x: 0, z: 28},
  },
  'crossroads-4': {
    N0: {x: 0, z: -14},
    S0: {x: 0, z: 14},
    E0: {x: 14, z: 0},
    W0: {x: -14, z: 0},
  },
  'standard-rect': {
    N0: {x: 0, z: -12},
    S0: {x: 0, z: 12},
  },
};

const hallById = new Map(plan.halls.map((hall) => [hall.id, hall]));
const programHallById = new Map(program.halls.map((hall) => [hall.id, hall]));
const bandById = new Map(plan.structuralBands.map((band) => [band.id, band]));

const worldBounds = (hall) => {
  const size = templateWorldSize[hall.templateId];
  return {
    minX: hall.placement.x - size.width / 2,
    maxX: hall.placement.x + size.width / 2,
    minZ: hall.placement.z - size.depth / 2,
    maxZ: hall.placement.z + size.depth / 2,
  };
};

const strictOverlap = (first, second) => (
  Math.min(first.maxX, second.maxX) - Math.max(first.minX, second.minX) > .001
  && Math.min(first.maxZ, second.maxZ) - Math.max(first.minZ, second.minZ) > .001
);

const portalWorld = (hall, portalId) => {
  const local = templateLocalPortals[hall.templateId][portalId];
  assert(local, `${hall.id} uses unsupported route portal ${portalId}`);
  const radians = hall.placement.rotationDegrees * Math.PI / 180;
  return {
    x: hall.placement.x + local.x * Math.cos(radians) - local.z * Math.sin(radians),
    z: hall.placement.z + local.x * Math.sin(radians) + local.z * Math.cos(radians),
  };
};

const distance = (first, second) => Math.hypot(second.x - first.x, second.z - first.z);

check('plan identity and approved status are explicit', () => {
  assert.equal(plan.schemaVersion, 2);
  assert.equal(plan.planId, 'continuous-enfilade-single-level-v1');
  assert.equal(plan.status, 'owner-approved-planning-basis');
  assert.equal(plan.runtimeStatus, 'implemented-approved-continuous-enfilade');
  assert.equal(plan.units, 'metres');
  assert.equal(plan.coordinateSystem.levelId, 'L0');
});

check('approved program totals and complete roster are unchanged', () => {
  assert.equal(plan.programContract.wingCount, 10);
  assert.equal(plan.programContract.hallCount, 26);
  assert.equal(plan.programContract.roomCount, 105);
  assert.equal(plan.programContract.recordCapacity, 260);
  assert.equal(plan.halls.length, 26);
  assert(unique(plan.halls.map(({id}) => id)), 'building plan duplicates a hall id');
  assert.deepEqual(sorted(plan.halls.map(({id}) => id)), sorted(program.halls.map(({id}) => id)));
});

check('all 105 canonical rooms are bound exactly once', () => {
  const plannedRooms = plan.halls.flatMap(({roomIds}) => roomIds);
  const canonicalRooms = program.rooms.map(({id}) => id);
  assert.equal(plannedRooms.length, 105);
  assert(unique(plannedRooms), 'building plan duplicates a room id');
  assert.deepEqual(sorted(plannedRooms), sorted(canonicalRooms));
  for (const hall of plan.halls) {
    const canonical = programHallById.get(hall.id);
    assert(canonical, `${hall.id} is absent from hall-program.json`);
    assert.equal(hall.title, canonical.title, `${hall.id} title differs from the canonical program`);
    assert.equal(hall.templateId, canonical.templateId, `${hall.id} template differs from the canonical program`);
    assert.deepEqual(hall.roomIds, canonical.roomIds, `${hall.id} room sequence differs from the canonical program`);
  }
});

check('template mix and exact physical embedding match the approved program', () => {
  const counts = Object.fromEntries(Object.keys(templateWorldSize).map((id) => [
    id,
    plan.halls.filter(({templateId}) => templateId === id).length,
  ]));
  assert.deepEqual(counts, {
    'sequence-3': 18,
    'crossroads-4': 7,
    'standard-rect': 1,
  });
  assert.deepEqual(plan.physicalContract.templateEmbedding['sequence-3'].worldFootprint, {width: 56, depth: 24});
  assert.deepEqual(plan.physicalContract.templateEmbedding['crossroads-4'].worldFootprint, {width: 28, depth: 28});
  assert.deepEqual(plan.physicalContract.templateEmbedding['standard-rect'].worldFootprint, {width: 24, depth: 20});
  assert.equal(plan.physicalContract.structuralBandDepth, 28);
  assert.equal(plan.physicalContract.bandCount, 6);
});

check('stable public numbers and physical visit sequence are independent and complete', () => {
  assert.deepEqual(plan.halls.map(({publicGalleryNumber}) => publicGalleryNumber).sort((a, b) => a - b), Array.from({length: 26}, (_, index) => index + 1));
  assert.deepEqual(plan.halls.map(({visitSequence}) => visitSequence).sort((a, b) => a - b), Array.from({length: 26}, (_, index) => index + 1));
  assert.deepEqual(plan.throughRoute.hallOrder, [...plan.halls].sort((a, b) => a.visitSequence - b.visitSequence).map(({id}) => id));
  assert.deepEqual(
    plan.numberingPolicy.futureReleaseOrder,
    [...plan.halls]
      .filter(({migrationState}) => migrationState === 'construct-planned-walkable-shell')
      .sort((a, b) => a.publicGalleryNumber - b.publicGalleryNumber)
      .map(({id}) => id),
  );
});

check('current twelve populated galleries retain their public numbers', () => {
  const expectedNumbers = new Map([
    ['mediterranean-beginnings-classical', 1],
    ['renaissance-humanism-new-method', 2],
    ['phenomenology-existence-embodiment', 3],
    ['analytic-traditions', 4],
    ['justice-democratic-reason', 5],
    ['core-questions-forum', 6],
    ['classical-south-asian-worlds', 7],
    ['buddhist-philosophies', 8],
    ['classical-chinese-traditions', 9],
    ['islamic-philosophical-worlds', 10],
    ['east-asian-continuities', 11],
    ['jewish-philosophy', 12],
  ]);
  const migrating = plan.halls.filter(({migrationState}) => migrationState === 'migrate-populated');
  const planned = plan.halls.filter(({migrationState}) => migrationState === 'construct-planned-walkable-shell');
  assert.equal(migrating.length, 12);
  assert.equal(planned.length, 14);
  assert.equal(plan.programContract.curatedOpenAtMigration, 12);
  assert.equal(plan.programContract.plannedWalkableShellsAtMigration, 14);
  assert.deepEqual(sorted(migrating.map(({id}) => id)), sorted([...expectedNumbers.keys()]));
  for (const [id, number] of expectedNumbers) assert.equal(hallById.get(id).publicGalleryNumber, number);

  const runtimeIds = runtime.nodes
    .filter(({implementationStatus, publicHallId}) => implementationStatus === 'live' && publicHallId)
    .map(({publicHallId}) => publicHallId);
  assert.deepEqual(sorted(runtimeIds), sorted([...expectedNumbers.keys()]));
});

check('six structural bands preserve the serpentine route and exact crosscut joints', () => {
  assert.equal(plan.structuralBands.length, 6);
  assert.deepEqual(plan.structuralBands.map(({zCenter}) => zCenter), [-70, -42, -14, 14, 42, 70]);
  assert.deepEqual(plan.structuralBands.map(({routeDirection}) => routeDirection), [
    'west-to-east',
    'east-to-west',
    'west-to-east',
    'east-to-west',
    'west-to-east',
    'east-to-west',
  ]);
  const flattened = plan.structuralBands.flatMap(({visitSequence}) => visitSequence);
  assert.deepEqual(flattened, plan.throughRoute.hallOrder);
  for (const band of plan.structuralBands) {
    for (const id of band.visitSequence) {
      const hall = hallById.get(id);
      assert(hall, `${band.id} references unknown hall ${id}`);
      assert.equal(hall.bandId, band.id, `${id} points at the wrong band`);
      assert.equal(hall.placement.z, band.zCenter, `${id} is off the band centreline`);
      const bounds = worldBounds(hall);
      assert(bounds.minZ >= band.zCenter - 14 - .001 && bounds.maxZ <= band.zCenter + 14 + .001, `${id} escapes its 28 metre band`);
    }
  }
});

check('gallery shells do not overlap and no ordinary hall is pierced by the crosscut', () => {
  for (let firstIndex = 0; firstIndex < plan.halls.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < plan.halls.length; secondIndex += 1) {
      const first = plan.halls[firstIndex];
      const second = plan.halls[secondIndex];
      assert(!strictOverlap(worldBounds(first), worldBounds(second)), `${first.id} overlaps ${second.id}`);
    }
  }
  const crosscutMain = {minX: -5, maxX: 5, minZ: -84, maxZ: 84};
  for (const hall of plan.halls.filter(({id}) => id !== 'core-questions-forum')) {
    assert(!strictOverlap(worldBounds(hall), crosscutMain), `${hall.id} is pierced by the north-south crosscut`);
  }
  const forum = hallById.get('core-questions-forum');
  assert.deepEqual(forum.placement, {x: 0, z: -14, rotationDegrees: 0});
  assert.deepEqual(worldBounds(forum), {minX: -14, maxX: 14, minZ: -28, maxZ: 0});
});

check('main block, entrance, final threshold, and capacity reserves are dimensioned exactly', () => {
  assert.deepEqual(plan.physicalContract.mainGalleryBlock, {
    bounds: {minX: -117, maxX: 145, minZ: -84, maxZ: 84},
    width: 262,
    depth: 168,
  });
  assert.equal(plan.grandEntrance.width, 40);
  assert.equal(plan.grandEntrance.depth, 56);
  assert.deepEqual(plan.grandEntrance.bounds, {minX: -129, maxX: -89, minZ: -112, maxZ: -56});
  assert.deepEqual(plan.finalThreshold.bounds, {minX: -101, maxX: -89, minZ: 56, maxZ: 84});
  assert.equal(plan.expansionReservations.length, 2);
  for (const reserve of plan.expansionReservations) {
    assert.equal(reserve.bounds.maxX - reserve.bounds.minX, 56);
    assert.equal(reserve.bounds.maxZ - reserve.bounds.minZ, 28);
    assert.equal(reserve.currentDoorState, 'solid-construction-wall');
    assert.equal(reserve.futureEntryFrom, plan.crosscut.id);
  }
});

check('all adjacent halls have a direct threshold, 10 metre crossing, or bounded turn court', () => {
  const turnByPair = new Map(plan.turnCourts.map((turn) => [`${turn.fromHallId}->${turn.toHallId}`, turn]));
  const crossingPairs = new Set([
    'hellenistic-roman-ways->late-antiquity-inheritance',
    'classical-chinese-traditions->east-asian-continuities',
    'german-idealism-afterlives->utility-liberty-history-capital',
    'analytic-traditions->phenomenology-existence-embodiment',
    'justice-democratic-reason->feminist-philosophies',
  ]);
  let computedTurnLength = 0;
  let computedCrossingLength = 0;
  for (let index = 0; index < plan.throughRoute.hallOrder.length - 1; index += 1) {
    const from = hallById.get(plan.throughRoute.hallOrder[index]);
    const to = hallById.get(plan.throughRoute.hallOrder[index + 1]);
    const exit = portalWorld(from, from.routePortals.exit);
    const entry = portalWorld(to, to.routePortals.entry);
    const gap = distance(exit, entry);
    const pair = `${from.id}->${to.id}`;
    const turn = turnByPair.get(pair);
    if (turn) {
      assert(close(gap, turn.centerlineLength), `${turn.id} length does not match its portal endpoints`);
      assert(close(turn.centerline[0].x, exit.x) && close(turn.centerline[0].z, exit.z), `${turn.id} does not begin at the source portal`);
      assert(close(turn.centerline.at(-1).x, entry.x) && close(turn.centerline.at(-1).z, entry.z), `${turn.id} does not end at the target portal`);
      assert(turn.centerlineLength <= plan.physicalContract.maximumTurnCourtSightline, `${turn.id} exceeds the sightline cap`);
      computedTurnLength += gap;
    } else if (crossingPairs.has(pair)) {
      assert(close(gap, 10), `${pair} is not a 10 metre crosscut crossing`);
      computedCrossingLength += gap;
    } else {
      assert(close(gap, 0), `${pair} has an unexplained ${gap.toFixed(3)} metre gap`);
    }
  }
  assert.equal(turnByPair.size, 5);
  assert(close(computedTurnLength, plan.throughRoute.turnCourtRunLength));
  assert(close(computedCrossingLength, plan.throughRoute.crossingBayRunLength));
});

check('route length is derived from gallery footprints and real connectors', () => {
  const hallRun = plan.throughRoute.hallOrder.reduce((sum, id) => sum + templateWorldSize[hallById.get(id).templateId].width, 0);
  assert.equal(hallRun, 1228);
  assert.equal(plan.throughRoute.nominalHallRunLength, 1228);
  const total = hallRun + plan.throughRoute.crossingBayRunLength + plan.throughRoute.turnCourtRunLength;
  assert(close(total, plan.throughRoute.completeVisitLength));
  assert(close(total, 1443.671));
});

check('crosscut owns six truthful intersections and no exhibit-space fiction', () => {
  assert.equal(plan.crosscut.bounds.maxX - plan.crosscut.bounds.minX, 10);
  assert.equal(plan.crosscut.publicMainLength, 168);
  assert.equal(plan.crosscut.reserveExtensionLength, 28);
  assert.equal(plan.crosscut.intersections.length, 6);
  assert.deepEqual(plan.crosscut.intersections.map(({zCenter}) => zCenter), [-70, -42, -14, 14, 42, 70]);
  assert.equal(plan.crosscut.intersections.filter(({occupiedByHallId}) => occupiedByHallId === 'core-questions-forum').length, 1);
  assert.equal(plan.crosscut.intersections.filter(({betweenHallIds}) => betweenHallIds).length, 5);
});

check('planned shells remain honest, walkable, and non-curated', () => {
  assert.match(plan.roomShellContract.plannedShellPresentation, /no placeholder exhibits/i);
  assert.match(plan.roomShellContract.openCountRule, /not counted as an open gallery/i);
  assert.match(plan.roomShellContract.wallAuditActivation, /curated-open/i);
  for (const hall of plan.halls) {
    if (hall.migrationState === 'migrate-populated') {
      assert.equal(hall.roomLayoutStrategy, 'preserve-existing-authored-layout');
    } else {
      assert.notEqual(hall.roomLayoutStrategy, 'preserve-existing-authored-layout');
    }
  }
});

check('compiled runtime manifest is the approved Continuous Enfilade cutover', () => {
  assert.equal(runtime.schemaVersion, 2);
  assert.equal(runtime.manifestVersion, plan.planId);
  assert.equal(runtime.status, 'implemented-approved-continuous-enfilade');
  assert.equal(runtime.physicalOptionId, 'continuous-enfilade-single-level');
  assert.equal(runtime.level.id, 'L0');
  assert.deepEqual(runtime.counts, {
    halls: 26,
    rooms: 105,
    curatedOpen: 12,
    plannedWalkable: 14,
    reserves: 2,
    hallCount: 26,
    curatedOpenHallCount: 12,
    plannedWalkableHallCount: 14,
    canonicalRoomCount: 105,
    nodeCount: 39,
    connectionCount: 43,
    throughRouteConnectionCount: 37,
    crosscutConnectionCount: 6,
    crosscutIntersectionCount: 6,
    standaloneCrossingNodeCount: 5,
    turnCourtCount: 5,
    reserveCount: 2,
    plannedStatusSignCount: 14,
  });
  assert.deepEqual(runtime.physicalContract.mainGalleryBlock, plan.physicalContract.mainGalleryBlock);
  assert.deepEqual(
    runtime.physicalContract.controlledPlanBoundsIncludingEntranceAndReserves,
    plan.physicalContract.controlledPlanBoundsIncludingEntranceAndReserves,
  );
  assert.equal(runtime.physicalContract.crosscutClearWidth, 10);
  assert.equal(runtime.physicalContract.turnCourtClearWidth, 8);
  assert.equal(runtime.residencyPolicy.maxResidentHallContents, 3);
  assert.equal(runtime.residencyPolicy.recentHallCount, 1);
  assert.equal(runtime.residencyPolicy.approachDistance, 6);
  assert.equal(runtime.residencyPolicy.decodedTextureBudgetMiB, 96);
});

check('compiled runtime binds all 26 transforms and all 105 named rooms exactly', () => {
  const runtimeHalls = runtime.nodes.filter(({kind}) => kind === 'hall');
  const runtimeHallByProgramId = new Map(runtimeHalls.map((node) => [node.programHallId, node]));
  assert.equal(runtimeHalls.length, 26);
  assert.equal(runtimeHalls.filter(({galleryState}) => galleryState === 'curated-open').length, 12);
  assert.equal(runtimeHalls.filter(({galleryState}) => galleryState === 'planned-walkable').length, 14);
  assert.deepEqual(
    sorted(runtimeHalls.filter(({publicHallId}) => publicHallId).map(({publicHallId}) => publicHallId)),
    sorted(plan.halls.filter(({migrationState}) => migrationState === 'migrate-populated').map(({id}) => id)),
  );
  const runtimeRooms = runtimeHalls.flatMap(({roomIds}) => roomIds);
  assert.equal(runtimeRooms.length, 105);
  assert(unique(runtimeRooms));
  assert.deepEqual(sorted(runtimeRooms), sorted(program.rooms.map(({id}) => id)));
  assert.equal(runtimeHalls.flatMap(({rooms}) => rooms).length, 105);

  for (const approved of plan.halls) {
    const compiled = runtimeHallByProgramId.get(approved.id);
    assert(compiled, `${approved.id} is absent from the compiled runtime`);
    assert.equal(compiled.publicGalleryNumber, approved.publicGalleryNumber);
    assert.equal(compiled.visitSequence, approved.visitSequence);
    assert.equal(compiled.templateId, approved.templateId);
    assert.equal(compiled.bandId, approved.bandId);
    assert.deepEqual(compiled.roomIds, approved.roomIds);
    assert.deepEqual(compiled.planPlacement, approved.placement);
    assert.deepEqual(compiled.bounds, worldBounds(approved));
    assert(close(compiled.transform.x, approved.placement.x));
    assert(close(compiled.transform.z, approved.placement.z));
    assert(close(compiled.transform.yaw, -approved.placement.rotationDegrees * Math.PI / 180));
    if (approved.migrationState === 'migrate-populated') {
      assert.equal(compiled.publicHallId, approved.id);
      assert.equal(compiled.galleryState, 'curated-open');
      assert.equal(compiled.geometry, undefined, `${approved.id} replaced its preserved curated root with generated shell geometry`);
    } else {
      assert.equal(compiled.publicHallId, undefined);
      assert.equal(compiled.galleryState, 'planned-walkable');
      assert.notEqual(compiled.fastTravelEligible, true);
      assert(compiled.geometry, `${approved.id} has no generated planned-shell geometry`);
      assert.deepEqual(
        sorted(compiled.geometry.cells.filter(({kind}) => kind === 'room').map(({id}) => id)),
        sorted(approved.roomIds),
      );
      assert.equal(compiled.geometry.signs.length, 1);
      assert.equal(compiled.geometry.signs[0].kind, 'planned-status');
      assert.equal(compiled.geometry.signs[0].interactive, false);
      assert(!/"(?:exhibits|media|articleRoutes|assetIds|interactions|attributions)"/u.test(JSON.stringify(compiled.geometry)));
    }
  }
});

check('compiled route, crosscut, turn courts, entrance, threshold, and reserves match control geometry', () => {
  const runtimeNodeById = new Map(runtime.nodes.map((node) => [node.id, node]));
  assert.equal(runtime.nodes.length, 39);
  assert.equal(runtime.connections.length, 43);
  assert.equal(runtime.connections.filter(({routeRole}) => routeRole === 'through-route').length, 37);
  assert.equal(runtime.connections.filter(({routeRole}) => routeRole === 'crosscut').length, 6);
  assert.deepEqual(runtime.throughRoute.hallOrder, plan.throughRoute.hallOrder);
  assert.equal(runtime.throughRoute.start, plan.grandEntrance.id);
  assert.equal(runtime.throughRoute.finish, plan.finalThreshold.id);
  assert.equal(runtime.crosscut.intersections.length, 6);
  assert.equal(runtime.crosscut.clearWidth, 10);
  assert.equal(runtime.nodes.filter(({physicalRole}) => physicalRole === 'crosscut-intersection').length, 5);
  assert.equal(runtime.nodes.filter(({physicalRole}) => physicalRole === 'turn-court').length, 5);
  assert.equal(runtime.nodes.filter(({physicalRole}) => physicalRole === 'final-return-threshold').length, 1);
  assert.equal(runtime.nodes.filter(({physicalRole}) => physicalRole === 'grand-entrance-orientation').length, 1);
  assert.equal(runtime.forumNodeId, 'hall:core-questions-forum');
  assert.deepEqual(runtimeNodeById.get(runtime.mainEntrance.nodeId).bounds, plan.grandEntrance.bounds);
  assert.equal(runtimeNodeById.get(runtime.mainEntrance.nodeId).orientationLandmark.id, 'entrance-visitor-map-kiosk');
  assert.deepEqual(runtimeNodeById.get(runtime.finalThresholdNodeId).bounds, plan.finalThreshold.bounds);

  const forum = runtimeNodeById.get(runtime.forumNodeId);
  assert.equal(forum.doorwaySlots.find(({id}) => id === 'N0').clearWidth, 10);
  assert.equal(forum.doorwaySlots.find(({id}) => id === 'S0').clearWidth, 10);
  for (const turn of plan.turnCourts) {
    const compiled = runtimeNodeById.get(turn.id);
    assert(compiled, `${turn.id} is absent from the runtime`);
    assert.deepEqual(compiled.geometry.worldCenterline, turn.centerline);
    assert(close(compiled.geometry.centerlineLength, turn.centerlineLength));
    assert(close(compiled.geometry.measuredCenterlineLength, turn.centerlineLength));
    assert.equal(compiled.geometry.clearWidth, 8);
  }

  assert.equal(runtime.reserves.length, 2);
  for (const approved of plan.expansionReservations) {
    const reserve = runtime.reserves.find(({id}) => id === approved.id);
    assert(reserve, `${approved.id} is absent from the runtime`);
    assert.deepEqual(reserve.bounds, approved.bounds);
    assert.equal(reserve.currentDoorState, 'solid-construction-wall');
    assert.equal(reserve.boundaryWall.size.height, 5.8);
    assert.equal(reserve.boundaryWall.fullHeight, true);
    assert.equal(reserve.boundaryWall.collision, true);
    assert.equal(reserve.boundaryWall.rendered, true);
  }
});

check('compiled thresholds are safe, unique, continuously walkable, and close unused portals', () => {
  const runtimeNodeById = new Map(runtime.nodes.map((node) => [node.id, node]));
  const connectedEndpoints = new Set();
  const graph = new Map();
  const link = (left, right) => {
    if (!graph.has(left)) graph.set(left, new Set());
    if (!graph.has(right)) graph.set(right, new Set());
    graph.get(left).add(right);
    graph.get(right).add(left);
  };
  for (const connection of runtime.connections) {
    assert.equal(connection.accessible, true);
    assert.equal(connection.implementationStatus, 'live');
    const endpoints = [connection.a, connection.b];
    for (const endpoint of endpoints) {
      const node = runtimeNodeById.get(endpoint.nodeId);
      const slot = node?.doorwaySlots.find(({id}) => id === endpoint.slotId);
      assert(slot, `${connection.id} references missing ${endpoint.nodeId}/${endpoint.slotId}`);
      const key = `${endpoint.nodeId}/${endpoint.slotId}`;
      assert(!connectedEndpoints.has(key), `${connection.id} reuses ${key}`);
      connectedEndpoints.add(key);
    }
    link(connection.a.nodeId, connection.b.nodeId);
  }
  for (const node of runtime.nodes) {
    for (const slot of node.doorwaySlots) {
      assert(close(slot.landingBounds.maxX - slot.landingBounds.minX, 4));
      assert(close(slot.landingBounds.maxZ - slot.landingBounds.minZ, 4));
      assert(close(Math.hypot(
        slot.arrivalPose.x - slot.position.x,
        slot.arrivalPose.z - slot.position.z,
      ), 2));
      if (
        node.kind === 'hall'
        && !connectedEndpoints.has(`${node.id}/${slot.id}`)
      ) assert.equal(slot.openingState, 'closed-solid-wall', `${node.id}/${slot.id} is an unconnected open portal`);
    }
  }
  const reached = new Set();
  const queue = [runtime.mainEntrance.nodeId];
  while (queue.length) {
    const current = queue.shift();
    if (reached.has(current)) continue;
    reached.add(current);
    queue.push(...(graph.get(current) ?? []));
  }
  assert(runtime.nodes.every(({id}) => reached.has(id)), 'runtime is not continuously walkable from the Grand Entrance');
});

check('performance contract extends the authoritative runtime residency policy', () => {
  assert.equal(plan.performanceContract.authority, 'Extend the current runtime residency and lazy-loading implementation; do not replace it.');
  assert.equal(plan.performanceContract.maxResidentHallContents, runtime.residencyPolicy.maxResidentHallContents);
  assert.equal(plan.performanceContract.recentHallCount, runtime.residencyPolicy.recentHallCount);
  assert.equal(plan.performanceContract.approachDistance, runtime.residencyPolicy.approachDistance);
  assert.equal(plan.performanceContract.decodedTextureBudgetMiB, runtime.residencyPolicy.decodedTextureBudgetMiB);
  assert.match(plan.performanceContract.plannedShellRule, /import no exhibit media/i);
  assert.match(plan.performanceContract.mapRule, /never imports hall scene or media modules/i);
});

check('scaled drawing and implementation handoff files exist', () => {
  assert(existsSync(resolve(root, 'docs/museum-masterplan/diagrams/continuous-enfilade-single-level.svg')));
  assert(existsSync(resolve(root, 'docs/museum-masterplan/single-level-building-plan.md')));
  const drawing = readFileSync(resolve(root, 'docs/museum-masterplan/diagrams/continuous-enfilade-single-level.svg'), 'utf8');
  assert.match(drawing, /width="420mm" height="297mm"/);
  assert.match(drawing, /1:1000/);
  assert.match(drawing, /Core Questions/);
  assert.match(drawing, /Grand Entrance/);
  assert(!/\bMBC\b|\bHRW\b|\bLAI\b|\bCSA\b|\bCQ\b/.test(drawing), 'scaled drawing exposes unexplained internal abbreviations');
});

let failures = 0;
for (const {title, callback} of checks) {
  try {
    callback();
    console.log(`✓ ${title}`);
  } catch (error) {
    failures += 1;
    console.error(`✗ ${title}`);
    console.error(`  ${error.message}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} building-plan check${failures === 1 ? '' : 's'} failed.`);
  process.exitCode = 1;
} else {
  console.log(`\n${checks.length} building-plan checks passed.`);
}
