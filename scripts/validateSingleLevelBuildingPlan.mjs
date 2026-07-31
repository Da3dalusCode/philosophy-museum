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
const normalizeRadians = (value) => {
  const wrapped = (value + Math.PI) % (Math.PI * 2);
  return (wrapped < 0 ? wrapped + Math.PI * 2 : wrapped) - Math.PI;
};
const planPointToRuntime = ({x, z}) => ({x: -x, z});
const planBoundsToRuntime = (bounds) => ({
  minX: -bounds.maxX,
  maxX: -bounds.minX,
  minZ: bounds.minZ,
  maxZ: bounds.maxZ,
});

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
const runtimeWorldBounds = (hall) => planBoundsToRuntime(worldBounds(hall));

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

const mirroredRuntimeHallYaw = (hall) => {
  const entry = templateLocalPortals[hall.templateId][hall.routePortals.entry];
  const exit = templateLocalPortals[hall.templateId][hall.routePortals.exit];
  assert(entry && exit, `${hall.id} lacks a route axis for runtime embedding`);
  const localRoute = {x: exit.x - entry.x, z: exit.z - entry.z};
  const entryWorld = portalWorld(hall, hall.routePortals.entry);
  const exitWorld = portalWorld(hall, hall.routePortals.exit);
  const runtimeRoute = {
    x: -(exitWorld.x - entryWorld.x),
    z: exitWorld.z - entryWorld.z,
  };
  return normalizeRadians(
    Math.atan2(localRoute.z, localRoute.x) - Math.atan2(runtimeRoute.z, runtimeRoute.x),
  );
};

const distance = (first, second) => Math.hypot(second.x - first.x, second.z - first.z);

check('plan identity and approved status are explicit', () => {
  assert.equal(plan.schemaVersion, 2);
  assert.equal(plan.planId, 'continuous-enfilade-single-level-v1');
  assert.equal(plan.status, 'owner-approved-planning-basis');
  assert.equal(plan.runtimeStatus, 'implemented-approved-continuous-enfilade');
  assert.equal(plan.units, 'metres');
  assert.equal(plan.coordinateSystem.levelId, 'L0');
  assert.deepEqual(plan.runtimeEmbedding.planToRuntime, {x: '-plan.x', z: 'plan.z', y: 'plan.y'});
  assert.deepEqual(plan.runtimeEmbedding.mapFromRuntime, {x: '-runtime.x', y: '-runtime.z'});
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

check('all twenty-six populated galleries retain their stable public numbers', () => {
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
    ['latin-christian-scholastic', 13],
    ['hellenistic-roman-ways', 14],
    ['late-antiquity-inheritance', 15],
    ['rationalism-mind-nature-system', 16],
    ['empiricism-science-political-order', 17],
    ['enlightenment-revolution-kant', 18],
    ['german-idealism-afterlives', 19],
    ['utility-liberty-history-capital', 20],
    ['faith-pessimism-life-value', 21],
    ['pragmatism-democratic-inquiry', 22],
    ['critique-power-deconstruction', 23],
    ['moral-life-practical-reason', 24],
    ['feminist-philosophies', 25],
    ['colonialism-race-liberation', 26],
  ]);
  const migrating = plan.halls.filter(({migrationState}) => migrationState === 'migrate-populated');
  const planned = plan.halls.filter(({migrationState}) => migrationState === 'construct-planned-walkable-shell');
  assert.equal(migrating.length, 26);
  assert.equal(planned.length, 0);
  assert.equal(plan.programContract.curatedOpenAtMigration, 26);
  assert.equal(plan.programContract.plannedWalkableShellsAtMigration, 0);
  assert.deepEqual(sorted(migrating.map(({id}) => id)), sorted([...expectedNumbers.keys()]));
  for (const [id, number] of expectedNumbers) assert.equal(hallById.get(id).publicGalleryNumber, number);

  const promotedExpectations = new Map([
    ['empiricism-science-political-order', {
      roomCount: 3,
      primaryCount: 4,
      templateId: 'sequence-3',
      roomLayoutStrategy: 'sequence-equal-room-spans',
    }],
    ['enlightenment-revolution-kant', {
      roomCount: 5,
      primaryCount: 6,
      templateId: 'crossroads-4',
      roomLayoutStrategy: 'crossroads-four-quadrants-with-central-kant-room',
    }],
    ['german-idealism-afterlives', {
      roomCount: 4,
      primaryCount: 7,
      templateId: 'sequence-3',
      roomLayoutStrategy: 'sequence-equal-room-spans',
    }],
    ['utility-liberty-history-capital', {
      roomCount: 4,
      primaryCount: 5,
      templateId: 'sequence-3',
      roomLayoutStrategy: 'sequence-equal-room-spans',
    }],
    ['faith-pessimism-life-value', {
      roomCount: 3,
      primaryCount: 3,
      templateId: 'sequence-3',
      roomLayoutStrategy: 'sequence-equal-room-spans',
    }],
    ['pragmatism-democratic-inquiry', {
      roomCount: 4,
      primaryCount: 6,
      templateId: 'sequence-3',
      roomLayoutStrategy: 'sequence-equal-room-spans',
    }],
    ['critique-power-deconstruction', {
      roomCount: 4,
      primaryCount: 5,
      templateId: 'crossroads-4',
      roomLayoutStrategy: 'crossroads-four-quadrants',
    }],
    ['moral-life-practical-reason', {
      roomCount: 4,
      primaryCount: 9,
      templateId: 'crossroads-4',
      roomLayoutStrategy: 'crossroads-four-quadrants',
    }],
    ['feminist-philosophies', {
      roomCount: 4,
      primaryCount: 5,
      templateId: 'crossroads-4',
      roomLayoutStrategy: 'crossroads-four-quadrants',
    }],
    ['colonialism-race-liberation', {
      roomCount: 3,
      primaryCount: 5,
      templateId: 'sequence-3',
      roomLayoutStrategy: 'sequence-equal-room-spans',
    }],
  ]);
  for (const [id, expected] of promotedExpectations) {
    const plannedHall = hallById.get(id);
    const canonicalHall = programHallById.get(id);
    assert.equal(plannedHall.templateId, expected.templateId, `${id} changed its approved template`);
    assert.equal(plannedHall.roomIds.length, expected.roomCount, `${id} changed its approved room count`);
    assert.equal(plannedHall.roomLayoutStrategy, expected.roomLayoutStrategy, `${id} changed its approved room layout`);
    assert.equal(canonicalHall.recordCapacity, expected.primaryCount, `${id} changed its approved primary count`);
  }

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
  assert.deepEqual(plan.physicalContract.controlledPlanBoundsIncludingEntranceAndReserves, {
    minX: -129,
    maxX: 153,
    minZ: -112,
    maxZ: 112,
    width: 282,
    depth: 224,
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
      assert(close(turn.centerline[0].x, exit.x) && close(turn.centerline[0].z, exit.z), `${turn.id} does not begin at the source portal`);
      assert(close(turn.centerline.at(-1).x, entry.x) && close(turn.centerline.at(-1).z, entry.z), `${turn.id} does not end at the target portal`);
      assert.equal(turn.centerline.length, 4, `${turn.id} is not a three-run exterior dogleg`);
      const runs = turn.centerline.slice(1).map((point, runIndex) => {
        const previous = turn.centerline[runIndex];
        const delta = {x: point.x - previous.x, z: point.z - previous.z};
        assert(
          (Math.abs(delta.x) > .001 && Math.abs(delta.z) <= .001)
            || (Math.abs(delta.z) > .001 && Math.abs(delta.x) <= .001),
          `${turn.id} run ${runIndex + 1} is not orthogonal`,
        );
        return {
          direction: {
            x: Math.sign(delta.x),
            z: Math.sign(delta.z),
          },
          length: Math.hypot(delta.x, delta.z),
        };
      });
      assert(
        Math.abs(runs[0].direction.x * runs[1].direction.x + runs[0].direction.z * runs[1].direction.z) < .001
          && Math.abs(runs[1].direction.x * runs[2].direction.x + runs[1].direction.z * runs[2].direction.z) < .001,
        `${turn.id} does not make two right-angle turns`,
      );
      const pathLength = runs.reduce((sum, run) => sum + run.length, 0);
      assert(close(pathLength, turn.centerlineLength), `${turn.id} path length is stale`);
      assert(
        runs.every(({length}) => length <= plan.physicalContract.maximumTurnCourtStraightRun),
        `${turn.id} exceeds the straight-run cap`,
      );
      computedTurnLength += pathLength;
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
  assert(close(total, 1560));
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

check('all released galleries retain honest authored-room strategies', () => {
  assert.match(plan.roomShellContract.plannedShellPresentation, /no placeholder exhibits/i);
  assert.match(plan.roomShellContract.openCountRule, /not counted as an open gallery/i);
  assert.match(plan.roomShellContract.wallAuditActivation, /curated-open/i);
  const approvedPromotedStrategies = new Map([
    ['empiricism-science-political-order', 'sequence-equal-room-spans'],
    ['enlightenment-revolution-kant', 'crossroads-four-quadrants-with-central-kant-room'],
    ['utility-liberty-history-capital', 'sequence-equal-room-spans'],
    ['faith-pessimism-life-value', 'sequence-equal-room-spans'],
    ['german-idealism-afterlives', 'sequence-equal-room-spans'],
    ['pragmatism-democratic-inquiry', 'sequence-equal-room-spans'],
    ['critique-power-deconstruction', 'crossroads-four-quadrants'],
    ['moral-life-practical-reason', 'crossroads-four-quadrants'],
    ['feminist-philosophies', 'crossroads-four-quadrants'],
    ['colonialism-race-liberation', 'sequence-equal-room-spans'],
  ]);
  for (const hall of plan.halls) {
    if (hall.migrationState === 'migrate-populated') {
      assert.equal(
        hall.roomLayoutStrategy,
        approvedPromotedStrategies.get(hall.id) ?? 'preserve-existing-authored-layout',
        `${hall.id} changed its approved populated-room strategy`,
      );
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
  assert.deepEqual(runtime.runtimeEmbedding, plan.runtimeEmbedding);
  assert.equal(runtime.level.id, 'L0');
  assert.deepEqual(runtime.counts, {
    halls: 26,
    rooms: 105,
    curatedOpen: 26,
    plannedWalkable: 0,
    reserves: 2,
    hallCount: 26,
    curatedOpenHallCount: 26,
    plannedWalkableHallCount: 0,
    canonicalRoomCount: 105,
    nodeCount: 39,
    connectionCount: 43,
    throughRouteConnectionCount: 37,
    crosscutConnectionCount: 6,
    crosscutIntersectionCount: 6,
    standaloneCrossingNodeCount: 5,
    turnCourtCount: 5,
    reserveCount: 2,
    plannedStatusSignCount: 0,
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
  assert.equal(runtimeHalls.filter(({galleryState}) => galleryState === 'curated-open').length, 26);
  assert.equal(runtimeHalls.filter(({galleryState}) => galleryState === 'planned-walkable').length, 0);
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
    assert.deepEqual(compiled.bounds, runtimeWorldBounds(approved));
    assert(close(compiled.transform.x, planPointToRuntime(approved.placement).x));
    assert(close(compiled.transform.z, approved.placement.z));
    assert(close(compiled.transform.yaw, mirroredRuntimeHallYaw(approved)));
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
  for (const intersection of plan.crosscut.intersections.filter(({betweenHallIds}) => betweenHallIds)) {
    const node = runtimeNodeById.get(intersection.id);
    assert(node?.geometry, `${intersection.id} is missing from the compiled crosscut`);
    assert.equal(node.geometry.signs.length, 1, `${intersection.id} must expose one orientation sign`);
    const sign = node.geometry.signs[0];
    const [westHallId, eastHallId] = intersection.betweenHallIds;
    assert.equal(sign.kind, 'wayfinding');
    assert.match(sign.title, /^West · Gallery \d{2} \| East · Gallery \d{2}$/u);
    assert.match(sign.kicker, /North/u);
    assert.match(sign.subtitle, /Visitor map: M/u);
    assert(sign.subtitle.includes(hallById.get(westHallId).title), `${intersection.id} omits its west hall`);
    assert(sign.subtitle.includes(hallById.get(eastHallId).title), `${intersection.id} omits its east hall`);
  }
  assert.equal(runtime.nodes.filter(({physicalRole}) => physicalRole === 'turn-court').length, 5);
  assert.equal(runtime.nodes.filter(({physicalRole}) => physicalRole === 'final-return-threshold').length, 1);
  assert.equal(runtime.nodes.filter(({physicalRole}) => physicalRole === 'grand-entrance-orientation').length, 1);
  assert.equal(runtime.forumNodeId, 'hall:core-questions-forum');
  assert.deepEqual(runtimeNodeById.get(runtime.mainEntrance.nodeId).bounds, planBoundsToRuntime(plan.grandEntrance.bounds));
  assert.equal(runtimeNodeById.get(runtime.mainEntrance.nodeId).orientationLandmark.id, 'entrance-visitor-map-kiosk');
  assert.deepEqual(runtimeNodeById.get(runtime.finalThresholdNodeId).bounds, planBoundsToRuntime(plan.finalThreshold.bounds));

  const forum = runtimeNodeById.get(runtime.forumNodeId);
  assert.equal(forum.doorwaySlots.find(({id}) => id === 'N0').clearWidth, 10);
  assert.equal(forum.doorwaySlots.find(({id}) => id === 'S0').clearWidth, 10);
  for (const turn of plan.turnCourts) {
    const compiled = runtimeNodeById.get(turn.id);
    assert(compiled, `${turn.id} is absent from the runtime`);
    assert.deepEqual(compiled.geometry.planCenterline, turn.centerline);
    assert.deepEqual(compiled.geometry.worldCenterline, turn.centerline.map(planPointToRuntime));
    assert(close(compiled.geometry.centerlineLength, turn.centerlineLength));
    assert(close(compiled.geometry.measuredCenterlineLength, turn.centerlineLength));
    assert.equal(compiled.geometry.clearWidth, 8);
    assert.equal(compiled.geometry.segmentCount, 3);
    assert([2, 3].includes(compiled.geometry.cells.length));
    assert.equal(compiled.geometry.interiorOpenings.length, compiled.geometry.cells.length - 1);
    assert(compiled.geometry.interiorOpenings.every(({clearWidth}) => clearWidth === 8));
    assert.equal(compiled.geometry.signs.length, 1);
    assert.equal(compiled.geometry.signs[0].kind, 'wayfinding');
    assert(compiled.geometry.cells.every(({guidanceAxis}) => guidanceAxis === 'x' || guidanceAxis === 'z'));
    const constructedArea = compiled.geometry.cells.reduce((sum, {bounds}) =>
      sum + (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ), 0);
    assert(close(constructedArea, compiled.geometry.clearWidth * compiled.geometry.measuredCenterlineLength));
    for (let first = 0; first < compiled.geometry.cells.length; first += 1) {
      for (let second = first + 1; second < compiled.geometry.cells.length; second += 1) {
        assert(
          !strictOverlap(compiled.geometry.cells[first].bounds, compiled.geometry.cells[second].bounds),
          `${turn.id} contains overlapping structural cells`,
        );
      }
      for (const hall of plan.halls) {
        assert(
          !strictOverlap(compiled.geometry.cells[first].bounds, runtimeWorldBounds(hall)),
          `${turn.id}/${compiled.geometry.cells[first].id} cuts through ${hall.id}`,
        );
      }
    }
  }

  assert.equal(runtime.reserves.length, 2);
  for (const approved of plan.expansionReservations) {
    const reserve = runtime.reserves.find(({id}) => id === approved.id);
    assert(reserve, `${approved.id} is absent from the runtime`);
    assert.deepEqual(reserve.bounds, planBoundsToRuntime(approved.bounds));
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
  const expectedTurnPaths = plan.turnCourts.map(({centerline}) => centerline.reduce((path, point, index) => {
    const projected = {x: point.x + 159, y: 140 - point.z};
    if (index === 0) return `M${projected.x} ${projected.y}`;
    const previous = centerline[index - 1];
    return `${path}${close(point.z, previous.z) ? `H${projected.x}` : `V${projected.y}`}`;
  }, ''));
  const drawnTurnPaths = [...drawing.matchAll(/<path class="turn" d="([^"]+)"/gu)]
    .map((match) => match[1]);
  assert.deepEqual(drawnTurnPaths, expectedTurnPaths, 'scaled drawing turn paths differ from the control plan');
  const controlled = plan.physicalContract.controlledPlanBoundsIncludingEntranceAndReserves;
  assert(drawing.includes(`${controlled.width} m controlled width`));
  assert(drawing.includes(`${controlled.depth} m controlled depth`));
  assert(drawing.includes(`${plan.throughRoute.completeVisitLength.toLocaleString('en-US')} m`));
  assert.equal([...drawing.matchAll(/<rect class="open"/gu)].length, 27, 'scaled drawing curated/open count is stale');
  assert.equal([...drawing.matchAll(/<rect class="planned"/gu)].length, 0, 'scaled drawing planned/walkable count is stale');
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
