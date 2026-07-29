import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const root = process.cwd();
const planRelativePath = 'docs/museum-masterplan/single-level-building-plan.json';
const programRelativePath = 'docs/museum-masterplan/hall-program.json';
const outputRelativePath = 'src/data/museum/museumContinuousEnfiladeManifest.json';
const planPath = resolve(root, planRelativePath);
const programPath = resolve(root, programRelativePath);
const outputPath = resolve(root, outputRelativePath);
const checkOnly = process.argv.includes('--check');

const planSource = readFileSync(planPath, 'utf8');
const programSource = readFileSync(programPath, 'utf8');
const plan = JSON.parse(planSource);
const program = JSON.parse(programSource);

const round = (value, places = 6) => {
  const rounded = Number(value.toFixed(places));
  return Object.is(rounded, -0) ? 0 : rounded;
};
const close = (first, second, epsilon = .001) => Math.abs(first - second) <= epsilon;
const samePoint = (first, second, epsilon = .001) =>
  close(first.x, second.x, epsilon) && close(first.z, second.z, epsilon);
const sorted = (values) => [...values].sort((first, second) => `${first}`.localeCompare(`${second}`));
const unique = (values) => new Set(values).size === values.length;
const canonicalizeText = (source) => source.replace(/\r\n?/g, '\n');
const hash = (source) => createHash('sha256').update(canonicalizeText(source)).digest('hex');
const clone = (value) => JSON.parse(JSON.stringify(value));
const hallNodeId = (programHallId) => `hall:${programHallId}`;
const pairKey = (first, second) => sorted([first, second]).join('|');
const galleryNumber = (value) => String(value).padStart(2, '0');

assert.equal(
  hash('cross-platform\r\nmanifest\rhash\r\n'),
  hash('cross-platform\nmanifest\nhash\n'),
  'Authority hashes must be independent of checkout line endings.',
);

const templatePortalSpecs = {
  'standard-rect': [
    {id: 'N0', position: {x: 0, z: -12}, inwardNormal: {x: 0, z: 1}, optional: false},
    {id: 'S0', position: {x: 0, z: 12}, inwardNormal: {x: 0, z: -1}, optional: false},
    {id: 'E0', position: {x: 10, z: 0}, inwardNormal: {x: -1, z: 0}, optional: true},
    {id: 'W0', position: {x: -10, z: 0}, inwardNormal: {x: 1, z: 0}, optional: true},
  ],
  'sequence-3': [
    {id: 'N0', position: {x: 0, z: -28}, inwardNormal: {x: 0, z: 1}, optional: false},
    {id: 'S0', position: {x: 0, z: 28}, inwardNormal: {x: 0, z: -1}, optional: false},
    {id: 'E1', position: {x: 12, z: 0}, inwardNormal: {x: -1, z: 0}, optional: true},
    {id: 'W1', position: {x: -12, z: 0}, inwardNormal: {x: 1, z: 0}, optional: true},
  ],
  'crossroads-4': [
    {id: 'N0', position: {x: 0, z: -14}, inwardNormal: {x: 0, z: 1}, optional: false},
    {id: 'S0', position: {x: 0, z: 14}, inwardNormal: {x: 0, z: -1}, optional: false},
    {id: 'E0', position: {x: 14, z: 0}, inwardNormal: {x: -1, z: 0}, optional: false},
    {id: 'W0', position: {x: -14, z: 0}, inwardNormal: {x: 1, z: 0}, optional: false},
    {id: 'N1', position: {x: 7, z: -14}, inwardNormal: {x: 0, z: 1}, optional: true},
    {id: 'S1', position: {x: -7, z: 14}, inwardNormal: {x: 0, z: -1}, optional: true},
  ],
};

const programHallById = new Map(program.halls.map((hall) => [hall.id, hall]));
const programRoomById = new Map(program.rooms.map((room) => [room.id, room]));
const programTemplateById = new Map(program.templates.map((template) => [template.id, template]));
const planHallById = new Map(plan.halls.map((hall) => [hall.id, hall]));

const portalDimensions = (() => {
  const dimensions = program.templates
    .filter(({id}) => Object.hasOwn(templatePortalSpecs, id))
    .map(({publicPortal}) => JSON.stringify(publicPortal));
  assert.equal(new Set(dimensions).size, 1, 'Normal templates must share one public portal contract.');
  return clone(program.templates.find(({id}) => id === 'sequence-3').publicPortal);
})();

const wallThicknessMetres = (() => {
  const values = program.templates
    .filter(({id}) => Object.hasOwn(templatePortalSpecs, id))
    .map(({wallThicknessMetres}) => wallThicknessMetres);
  assert.equal(new Set(values).size, 1, 'Normal templates must share one wall thickness.');
  return values[0];
})();
const safeArrivalLanding = clone(program.sharedPhysicalContract.safeArrivalLanding);
const defaultCeilingHeight = programTemplateById.get('sequence-3').ceilingHeightMetres;

const runtimeYaw = (rotationDegrees) => round(-rotationDegrees * Math.PI / 180, 12);
const normalizeRadians = (value) => {
  const wrapped = (value + Math.PI) % (Math.PI * 2);
  return round((wrapped < 0 ? wrapped + Math.PI * 2 : wrapped) - Math.PI, 12);
};
const planPointToRuntime = ({x, z}) => ({x: round(-x), z: round(z)});
const planVectorToRuntime = ({x, z}) => ({x: round(-x), z: round(z)});
const planBoundsToRuntime = (bounds) => ({
  minX: round(-bounds.maxX),
  maxX: round(-bounds.minX),
  minZ: round(bounds.minZ),
  maxZ: round(bounds.maxZ),
});
const pointToWorld = (transform, point) => {
  const cosine = Math.cos(transform.yaw);
  const sine = Math.sin(transform.yaw);
  return {
    x: round(transform.x + point.x * cosine + point.z * sine),
    z: round(transform.z - point.x * sine + point.z * cosine),
  };
};
const vectorToWorld = (transform, vector) => {
  const cosine = Math.cos(transform.yaw);
  const sine = Math.sin(transform.yaw);
  return {
    x: round(vector.x * cosine + vector.z * sine),
    z: round(-vector.x * sine + vector.z * cosine),
  };
};
const mirroredHallRuntimeYaw = (hall, portalSpecs) => {
  const entryPortal = portalSpecs.find(({id}) => id === hall.routePortals.entry);
  const exitPortal = portalSpecs.find(({id}) => id === hall.routePortals.exit);
  assert(entryPortal && exitPortal, `${hall.id} lacks an entry/exit axis for runtime embedding.`);
  const localRoute = {
    x: exitPortal.position.x - entryPortal.position.x,
    z: exitPortal.position.z - entryPortal.position.z,
  };
  const architecturalRoute = vectorToWorld(
    {x: 0, z: 0, yaw: runtimeYaw(hall.placement.rotationDegrees)},
    localRoute,
  );
  const runtimeRoute = planVectorToRuntime(architecturalRoute);
  return normalizeRadians(
    Math.atan2(localRoute.z, localRoute.x) - Math.atan2(runtimeRoute.z, runtimeRoute.x),
  );
};
const boundsFromCenter = ({x, z}, width, depth) => ({
  minX: round(x - width / 2),
  maxX: round(x + width / 2),
  minZ: round(z - depth / 2),
  maxZ: round(z + depth / 2),
});
const localBounds = (width, depth) => ({
  minX: round(-width / 2),
  maxX: round(width / 2),
  minZ: round(-depth / 2),
  maxZ: round(depth / 2),
});
const centerOfBounds = (bounds) => ({
  x: round((bounds.minX + bounds.maxX) / 2),
  z: round((bounds.minZ + bounds.maxZ) / 2),
});
const sizeOfBounds = (bounds) => ({
  width: round(bounds.maxX - bounds.minX),
  depth: round(bounds.maxZ - bounds.minZ),
});
const strictOverlap = (first, second) =>
  Math.min(first.maxX, second.maxX) - Math.max(first.minX, second.minX) > .001
  && Math.min(first.maxZ, second.maxZ) - Math.max(first.minZ, second.minZ) > .001;
const boundsArea = (bounds) =>
  (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ);
const containsBounds = (outer, inner) =>
  inner.minX >= outer.minX - .001
  && inner.maxX <= outer.maxX + .001
  && inner.minZ >= outer.minZ - .001
  && inner.maxZ <= outer.maxZ + .001;

const safeDoorwayContract = (position, inwardNormal) => {
  const normalLength = Math.hypot(inwardNormal.x, inwardNormal.z);
  assert(close(normalLength, 1), 'Doorway inward normals must be unit vectors.');
  const tangent = {x: -inwardNormal.z, z: inwardNormal.x};
  const nearLeft = {
    x: position.x - tangent.x * safeArrivalLanding.width / 2,
    z: position.z - tangent.z * safeArrivalLanding.width / 2,
  };
  const nearRight = {
    x: position.x + tangent.x * safeArrivalLanding.width / 2,
    z: position.z + tangent.z * safeArrivalLanding.width / 2,
  };
  const farCenter = {
    x: position.x + inwardNormal.x * safeArrivalLanding.depth,
    z: position.z + inwardNormal.z * safeArrivalLanding.depth,
  };
  const farLeft = {
    x: farCenter.x - tangent.x * safeArrivalLanding.width / 2,
    z: farCenter.z - tangent.z * safeArrivalLanding.width / 2,
  };
  const farRight = {
    x: farCenter.x + tangent.x * safeArrivalLanding.width / 2,
    z: farCenter.z + tangent.z * safeArrivalLanding.width / 2,
  };
  const corners = [nearLeft, nearRight, farLeft, farRight];
  return {
    landingBounds: {
      minX: round(Math.min(...corners.map(({x}) => x))),
      maxX: round(Math.max(...corners.map(({x}) => x))),
      minZ: round(Math.min(...corners.map(({z}) => z))),
      maxZ: round(Math.max(...corners.map(({z}) => z))),
    },
    arrivalPose: {
      x: round(position.x + inwardNormal.x * safeArrivalLanding.poseOffsetFromPortal),
      z: round(position.z + inwardNormal.z * safeArrivalLanding.poseOffsetFromPortal),
      yaw: round(Math.atan2(-inwardNormal.x, -inwardNormal.z), 12),
      pitch: 0,
    },
  };
};

const interiorOpening = (
  id,
  position,
  inwardNormal,
  fromCellId,
  toCellId,
  clearWidth = portalDimensions.clearWidthMetres,
) => ({
  id,
  position,
  inwardNormal,
  clearWidth,
  clearHeight: portalDimensions.clearHeightMetres,
  transitionDepth: portalDimensions.transitionDepthMetres,
  fromCellId,
  toCellId,
});

const roomCell = (roomId, bounds, ceilingHeight) => {
  const room = programRoomById.get(roomId);
  assert(room, `Unknown canonical room ${roomId}.`);
  return {
    id: roomId,
    kind: 'room',
    title: room.title,
    bounds,
    ceilingHeight,
  };
};

const passageCell = (hallId, suffix, bounds, ceilingHeight) => ({
  id: `passage:${hallId}:${suffix}`,
  kind: 'passage',
  title: 'Central circulation passage',
  bounds,
  ceilingHeight,
});

const plannedStatusSign = (hall, portalSpec) => ({
  id: `sign:planned-status:${hall.id}`,
  kind: 'planned-status',
  title: `Gallery ${galleryNumber(hall.publicGalleryNumber)} · ${hall.title}`,
  kicker: 'Planned gallery',
  subtitle: 'Architectural shell open · exhibits not yet installed',
  position: {
    x: round(portalSpec.position.x + portalSpec.inwardNormal.x * 2),
    y: 1.65,
    z: round(portalSpec.position.z + portalSpec.inwardNormal.z * 2),
  },
  rotationY: round(Math.atan2(-portalSpec.inwardNormal.x, -portalSpec.inwardNormal.z), 12),
  width: 3.2,
  height: 1.35,
  interactive: false,
});

const sequenceGeometry = (hall, template) => {
  const bounds = localBounds(template.footprintMetres.width, template.footprintMetres.depth);
  const boundaries = Array.from({length: hall.roomIds.length + 1}, (_, index) =>
    round(bounds.minZ + (bounds.maxZ - bounds.minZ) * index / hall.roomIds.length),
  );
  const cells = hall.roomIds.map((roomId, index) => roomCell(roomId, {
    minX: bounds.minX,
    maxX: bounds.maxX,
    minZ: boundaries[index],
    maxZ: boundaries[index + 1],
  }, template.ceilingHeightMetres));
  const openings = hall.roomIds.slice(0, -1).map((roomId, index) =>
    interiorOpening(
      `opening:${hall.id}:${roomId}->${hall.roomIds[index + 1]}`,
      {x: 0, z: boundaries[index + 1]},
      {x: 0, z: 1},
      roomId,
      hall.roomIds[index + 1],
    ),
  );
  return {bounds, cells, openings};
};

const crossroadsFourGeometry = (hall, template) => {
  const bounds = localBounds(template.footprintMetres.width, template.footprintMetres.depth);
  const passageHalfWidth = 2;
  const [northWestId, northEastId, southEastId, southWestId] = hall.roomIds;
  const northPassageId = `passage:${hall.id}:north`;
  const eastPassageId = `passage:${hall.id}:east`;
  const southPassageId = `passage:${hall.id}:south`;
  const westPassageId = `passage:${hall.id}:west`;
  const centerPassageId = `passage:${hall.id}:center`;
  const cells = [
    roomCell(northWestId, {
      minX: bounds.minX, maxX: -passageHalfWidth,
      minZ: bounds.minZ, maxZ: -passageHalfWidth,
    }, template.ceilingHeightMetres),
    roomCell(northEastId, {
      minX: passageHalfWidth, maxX: bounds.maxX,
      minZ: bounds.minZ, maxZ: -passageHalfWidth,
    }, template.ceilingHeightMetres),
    roomCell(southEastId, {
      minX: passageHalfWidth, maxX: bounds.maxX,
      minZ: passageHalfWidth, maxZ: bounds.maxZ,
    }, template.ceilingHeightMetres),
    roomCell(southWestId, {
      minX: bounds.minX, maxX: -passageHalfWidth,
      minZ: passageHalfWidth, maxZ: bounds.maxZ,
    }, template.ceilingHeightMetres),
    passageCell(hall.id, 'north', {
      minX: -passageHalfWidth, maxX: passageHalfWidth,
      minZ: bounds.minZ, maxZ: -passageHalfWidth,
    }, template.ceilingHeightMetres),
    passageCell(hall.id, 'east', {
      minX: passageHalfWidth, maxX: bounds.maxX,
      minZ: -passageHalfWidth, maxZ: passageHalfWidth,
    }, template.ceilingHeightMetres),
    passageCell(hall.id, 'south', {
      minX: -passageHalfWidth, maxX: passageHalfWidth,
      minZ: passageHalfWidth, maxZ: bounds.maxZ,
    }, template.ceilingHeightMetres),
    passageCell(hall.id, 'west', {
      minX: bounds.minX, maxX: -passageHalfWidth,
      minZ: -passageHalfWidth, maxZ: passageHalfWidth,
    }, template.ceilingHeightMetres),
    passageCell(hall.id, 'center', {
      minX: -passageHalfWidth, maxX: passageHalfWidth,
      minZ: -passageHalfWidth, maxZ: passageHalfWidth,
    }, template.ceilingHeightMetres),
  ];
  const openings = [
    interiorOpening(`opening:${hall.id}:${northWestId}->north-passage`, {x: -2, z: -8}, {x: 1, z: 0}, northWestId, northPassageId),
    interiorOpening(`opening:${hall.id}:${northEastId}->north-passage`, {x: 2, z: -8}, {x: -1, z: 0}, northEastId, northPassageId),
    interiorOpening(`opening:${hall.id}:${southEastId}->south-passage`, {x: 2, z: 8}, {x: -1, z: 0}, southEastId, southPassageId),
    interiorOpening(`opening:${hall.id}:${southWestId}->south-passage`, {x: -2, z: 8}, {x: 1, z: 0}, southWestId, southPassageId),
    interiorOpening(`opening:${hall.id}:north-passage->center`, {x: 0, z: -2}, {x: 0, z: 1}, northPassageId, centerPassageId),
    interiorOpening(`opening:${hall.id}:east-passage->center`, {x: 2, z: 0}, {x: -1, z: 0}, eastPassageId, centerPassageId),
    interiorOpening(`opening:${hall.id}:south-passage->center`, {x: 0, z: 2}, {x: 0, z: -1}, southPassageId, centerPassageId),
    interiorOpening(`opening:${hall.id}:west-passage->center`, {x: -2, z: 0}, {x: 1, z: 0}, westPassageId, centerPassageId),
  ];
  return {bounds, cells, openings};
};

const crossroadsKantGeometry = (hall, template) => {
  const bounds = localBounds(template.footprintMetres.width, template.footprintMetres.depth);
  const [northId, eastId, southId, westId, kantId] = hall.roomIds;
  const centerHalfSize = 4;
  const cells = [
    roomCell(northId, {
      minX: bounds.minX, maxX: bounds.maxX,
      minZ: bounds.minZ, maxZ: -centerHalfSize,
    }, template.ceilingHeightMetres),
    roomCell(eastId, {
      minX: centerHalfSize, maxX: bounds.maxX,
      minZ: -centerHalfSize, maxZ: centerHalfSize,
    }, template.ceilingHeightMetres),
    roomCell(southId, {
      minX: bounds.minX, maxX: bounds.maxX,
      minZ: centerHalfSize, maxZ: bounds.maxZ,
    }, template.ceilingHeightMetres),
    roomCell(westId, {
      minX: bounds.minX, maxX: -centerHalfSize,
      minZ: -centerHalfSize, maxZ: centerHalfSize,
    }, template.ceilingHeightMetres),
    roomCell(kantId, {
      minX: -centerHalfSize, maxX: centerHalfSize,
      minZ: -centerHalfSize, maxZ: centerHalfSize,
    }, template.ceilingHeightMetres),
  ];
  const openings = [
    interiorOpening(`opening:${hall.id}:${northId}->${kantId}`, {x: 0, z: -4}, {x: 0, z: 1}, northId, kantId),
    interiorOpening(`opening:${hall.id}:${eastId}->${kantId}`, {x: 4, z: 0}, {x: -1, z: 0}, eastId, kantId),
    interiorOpening(`opening:${hall.id}:${southId}->${kantId}`, {x: 0, z: 4}, {x: 0, z: -1}, southId, kantId),
    interiorOpening(`opening:${hall.id}:${westId}->${kantId}`, {x: -4, z: 0}, {x: 1, z: 0}, westId, kantId),
  ];
  return {bounds, cells, openings};
};

const buildPlannedGeometry = (hall, template, entryPortalSpec) => {
  let compiled;
  if (hall.roomLayoutStrategy === 'sequence-equal-room-spans') {
    compiled = sequenceGeometry(hall, template);
  } else if (hall.roomLayoutStrategy === 'crossroads-four-quadrants') {
    compiled = crossroadsFourGeometry(hall, template);
  } else if (hall.roomLayoutStrategy === 'crossroads-four-quadrants-with-central-kant-room') {
    compiled = crossroadsKantGeometry(hall, template);
  } else {
    throw new Error(`Unsupported planned-shell strategy ${hall.roomLayoutStrategy} for ${hall.id}.`);
  }
  return {
    coordinateFrame: 'node-local',
    bounds: compiled.bounds,
    cells: compiled.cells,
    interiorOpenings: compiled.openings,
    signs: [plannedStatusSign(hall, entryPortalSpec)],
  };
};

const hallNodes = plan.halls.map((hall) => {
  const canonicalHall = programHallById.get(hall.id);
  const template = programTemplateById.get(hall.templateId);
  const portalSpecs = templatePortalSpecs[hall.templateId];
  assert(canonicalHall, `${hall.id} is absent from hall-program.json.`);
  assert(template, `${hall.id} uses unknown template ${hall.templateId}.`);
  assert(portalSpecs, `${hall.id} uses unsupported template ${hall.templateId}.`);
  assert.deepEqual(hall.roomIds, canonicalHall.roomIds, `${hall.id} room IDs differ from the approved program.`);
  const runtimePlacement = planPointToRuntime(hall.placement);
  const transform = {
    ...runtimePlacement,
    yaw: mirroredHallRuntimeYaw(hall, portalSpecs),
  };
  const embedding = plan.physicalContract.templateEmbedding[hall.templateId];
  assert(embedding, `${hall.id} has no approved template embedding.`);
  const galleryState = hall.migrationState === 'migrate-populated'
    ? 'curated-open'
    : 'planned-walkable';
  const routeRoleByPortalId = new Map(
    Object.entries(hall.routePortals).map(([role, portalId]) => [portalId, role]),
  );
  const doorwaySlots = portalSpecs.map((portalSpec) => ({
    id: portalSpec.id,
    position: clone(portalSpec.position),
    worldPosition: pointToWorld(transform, portalSpec.position),
    inwardNormal: clone(portalSpec.inwardNormal),
    worldInwardNormal: vectorToWorld(transform, portalSpec.inwardNormal),
    clearWidth: hall.id === 'core-questions-forum'
      && [hall.routePortals.crosscutNorth, hall.routePortals.crosscutSouth].includes(portalSpec.id)
      ? plan.physicalContract.crosscutClearWidth
      : portalDimensions.clearWidthMetres,
    clearHeight: portalDimensions.clearHeightMetres,
    transitionDepth: portalDimensions.transitionDepthMetres,
    ...safeDoorwayContract(portalSpec.position, portalSpec.inwardNormal),
    optional: portalSpec.optional,
    routeRole: routeRoleByPortalId.get(portalSpec.id) ?? null,
    openingState: routeRoleByPortalId.has(portalSpec.id) ? 'open' : 'closed-solid-wall',
  }));
  const entryPortalSpec = portalSpecs.find(({id}) => id === hall.routePortals.entry);
  assert(entryPortalSpec, `${hall.id} entry portal ${hall.routePortals.entry} is missing.`);
  return {
    id: hallNodeId(hall.id),
    kind: 'hall',
    physicalRole: 'gallery',
    programHallId: hall.id,
    ...(galleryState === 'curated-open' ? {publicHallId: hall.id} : {}),
    title: hall.title,
    galleryState,
    publicGalleryNumber: hall.publicGalleryNumber,
    visitSequence: hall.visitSequence,
    bandId: hall.bandId,
    roomIds: clone(hall.roomIds),
    rooms: hall.roomIds.map((roomId) => {
      const room = programRoomById.get(roomId);
      assert(room, `${hall.id} references unknown canonical room ${roomId}.`);
      return {id: room.id, title: room.title};
    }),
    roomLayoutStrategy: hall.roomLayoutStrategy,
    templateId: hall.templateId,
    implementationStatus: 'live',
    levelId: 'L0',
    transform,
    planPlacement: clone(hall.placement),
    bounds: boundsFromCenter(runtimePlacement, embedding.worldFootprint.width, embedding.worldFootprint.depth),
    footprint: {
      world: clone(embedding.worldFootprint),
      local: clone(template.footprintMetres),
      solidServiceMarginPerBandSide: embedding.solidServiceMarginPerBandSide,
    },
    routePortals: clone(hall.routePortals),
    map: {
      label: `Gallery ${galleryNumber(hall.publicGalleryNumber)} · ${hall.title}`,
      status: galleryState === 'curated-open' ? 'open' : 'planned-walkable',
    },
    doorwaySlots,
    ...(galleryState === 'planned-walkable'
      ? {geometry: buildPlannedGeometry(hall, template, entryPortalSpec)}
      : {}),
  };
});

const hallNodeByProgramId = new Map(hallNodes.map((node) => [node.programHallId, node]));

const rectangularNode = ({
  id,
  kind,
  physicalRole,
  title,
  bounds,
  mapStatus = 'orientation-open',
  slotSpecs,
  metadata = {},
}) => {
  const transform = {...centerOfBounds(bounds), yaw: 0};
  return {
    id,
    kind,
    physicalRole,
    title,
    implementationStatus: 'live',
    levelId: 'L0',
    transform,
    bounds: clone(bounds),
    map: {label: title, status: mapStatus},
    doorwaySlots: slotSpecs.map((slot) => {
      const position = {
        x: round(slot.worldPosition.x - transform.x),
        z: round(slot.worldPosition.z - transform.z),
      };
      return {
        id: slot.id,
        position,
        worldPosition: clone(slot.worldPosition),
        inwardNormal: clone(slot.inwardNormal),
        worldInwardNormal: clone(slot.inwardNormal),
        clearWidth: slot.clearWidth ?? portalDimensions.clearWidthMetres,
        clearHeight: portalDimensions.clearHeightMetres,
        transitionDepth: portalDimensions.transitionDepthMetres,
        ...safeDoorwayContract(position, slot.inwardNormal),
        openingState: slot.external ? 'external-open' : 'pending',
        ...(slot.external ? {external: true} : {}),
      };
    }),
    geometry: {
      coordinateFrame: 'node-local',
      bounds: localBounds(bounds.maxX - bounds.minX, bounds.maxZ - bounds.minZ),
      cells: [{
        id: `cell:${id}`,
        kind: 'passage',
        title,
        bounds: localBounds(bounds.maxX - bounds.minX, bounds.maxZ - bounds.minZ),
        ceilingHeight: metadata.ceilingHeight ?? 5.8,
      }],
      interiorOpenings: [],
      signs: [],
    },
    ...metadata,
  };
};

const entranceBounds = planBoundsToRuntime(plan.grandEntrance.bounds);
const entranceOrientationLandmark = {
  id: 'entrance-visitor-map-kiosk',
  position: {x: 10, z: -9},
};
const entranceNode = rectangularNode({
  id: plan.grandEntrance.id,
  kind: 'entrance',
  physicalRole: 'grand-entrance-orientation',
  title: plan.grandEntrance.title,
  bounds: entranceBounds,
  slotSpecs: [
    {
      id: 'public-entry',
      worldPosition: planPointToRuntime({
        x: plan.grandEntrance.bounds.minX,
        z: round((plan.grandEntrance.bounds.minZ + plan.grandEntrance.bounds.maxZ) / 2),
      }),
      inwardNormal: planVectorToRuntime({x: 1, z: 0}),
      external: true,
    },
    {
      id: 'through-route',
      worldPosition: hallNodeByProgramId.get(plan.grandEntrance.routeTargetHallId)
        .doorwaySlots.find(({id}) => id === planHallById.get(plan.grandEntrance.routeTargetHallId).routePortals.entry)
        .worldPosition,
      inwardNormal: planVectorToRuntime({x: -1, z: 0}),
    },
  ],
  metadata: {
    width: plan.grandEntrance.width,
    depth: plan.grandEntrance.depth,
    ceilingTreatment: plan.grandEntrance.ceilingTreatment,
    publicFunctions: clone(plan.grandEntrance.publicFunctions),
    excludedFunctions: clone(plan.grandEntrance.excludedFunctions),
    routeTargetProgramHallId: plan.grandEntrance.routeTargetHallId,
    orientationLandmark: clone(entranceOrientationLandmark),
  },
});
const publicEntrySlot = entranceNode.doorwaySlots.find(({id}) => id === 'public-entry');
assert(publicEntrySlot, 'The Grand Entrance public doorway is missing.');
publicEntrySlot.arrivalPose.yaw = round(Math.atan2(
  -(entranceOrientationLandmark.position.x - publicEntrySlot.arrivalPose.x),
  -(entranceOrientationLandmark.position.z - publicEntrySlot.arrivalPose.z),
), 12);

const crossingNodes = plan.crosscut.intersections
  .filter(({betweenHallIds}) => betweenHallIds)
  .map((intersection) => {
    const architecturalBounds = {
      minX: plan.crosscut.bounds.minX,
      maxX: plan.crosscut.bounds.maxX,
      minZ: intersection.zCenter - plan.physicalContract.structuralBandDepth / 2,
      maxZ: intersection.zCenter + plan.physicalContract.structuralBandDepth / 2,
    };
    const bounds = planBoundsToRuntime(architecturalBounds);
    return rectangularNode({
      id: intersection.id,
      kind: 'corridor',
      physicalRole: 'crosscut-intersection',
      title: `North–South crosscut · ${intersection.id.replace('crossing:', '')}`,
      bounds,
      slotSpecs: [
        {
          id: 'west',
          worldPosition: planPointToRuntime({x: architecturalBounds.minX, z: intersection.zCenter}),
          inwardNormal: planVectorToRuntime({x: 1, z: 0}),
        },
        {
          id: 'east',
          worldPosition: planPointToRuntime({x: architecturalBounds.maxX, z: intersection.zCenter}),
          inwardNormal: planVectorToRuntime({x: -1, z: 0}),
        },
        {
          id: 'south',
          worldPosition: {x: 0, z: bounds.minZ},
          inwardNormal: {x: 0, z: 1},
          clearWidth: plan.physicalContract.crosscutClearWidth,
        },
        {
          id: 'north',
          worldPosition: {x: 0, z: bounds.maxZ},
          inwardNormal: {x: 0, z: -1},
          clearWidth: plan.physicalContract.crosscutClearWidth,
        },
      ],
      metadata: {
        crosscutIntersectionId: intersection.id,
        betweenProgramHallIds: clone(intersection.betweenHallIds),
        clearWidth: plan.physicalContract.crosscutClearWidth,
      },
    });
  });
const crossingNodeById = new Map(crossingNodes.map((node) => [node.id, node]));

const turnCourtNodes = plan.turnCourts.map((turn) => {
  assert.equal(turn.centerline.length, 4, `${turn.id} must define a three-run exterior dogleg.`);
  const runtimeCenterline = turn.centerline.map(planPointToRuntime);
  const from = runtimeCenterline[0];
  const to = runtimeCenterline.at(-1);
  const halfWidth = plan.physicalContract.turnCourtClearWidth / 2;
  const segments = runtimeCenterline.slice(1).map((point, index) => {
    const previous = runtimeCenterline[index];
    const delta = {x: point.x - previous.x, z: point.z - previous.z};
    const length = Math.hypot(delta.x, delta.z);
    assert(length > .001, `${turn.id} contains a zero-length centerline segment.`);
    const horizontal = Math.abs(delta.x) > .001 && Math.abs(delta.z) <= .001;
    const vertical = Math.abs(delta.z) > .001 && Math.abs(delta.x) <= .001;
    assert(horizontal || vertical, `${turn.id} centerline segments must be orthogonal.`);
    return {
      from: previous,
      to: point,
      direction: {x: round(delta.x / length), z: round(delta.z / length)},
      horizontal,
      length,
    };
  });
  const measuredLength = segments.reduce((sum, segment) => sum + segment.length, 0);
  assert(
    Math.abs(segments[0].direction.x * segments[1].direction.x + segments[0].direction.z * segments[1].direction.z) < .001
      && Math.abs(segments[1].direction.x * segments[2].direction.x + segments[1].direction.z * segments[2].direction.z) < .001,
    `${turn.id} must make two right-angle turns.`,
  );
  assert(segments[0].length >= halfWidth * 2, `${turn.id} source turn basin is too shallow.`);
  assert(segments[2].length >= halfWidth, `${turn.id} target turn basin is too shallow.`);
  const passageBounds = (start, end, direction) => Math.abs(direction.x) > .5
    ? {
        minX: round(Math.min(start.x, end.x)),
        maxX: round(Math.max(start.x, end.x)),
        minZ: round(start.z - halfWidth),
        maxZ: round(start.z + halfWidth),
      }
    : {
        minX: round(start.x - halfWidth),
        maxX: round(start.x + halfWidth),
        minZ: round(Math.min(start.z, end.z)),
        maxZ: round(Math.max(start.z, end.z)),
      };
  const passageCell = (suffix, bounds, direction) => ({
    id: `cell:${turn.id}:${suffix}`,
    kind: 'passage',
    title: `Turn court · ${turn.fromHallId} to ${turn.toHallId}`,
    bounds,
    ceilingHeight: defaultCeilingHeight,
    guidanceAxis: Math.abs(direction.x) > .5 ? 'x' : 'z',
  });
  const firstArmEnd = {
    x: round(segments[0].to.x - segments[0].direction.x * halfWidth),
    z: round(segments[0].to.z - segments[0].direction.z * halfWidth),
  };
  const spineStart = {
    x: round(segments[1].from.x - segments[1].direction.x * halfWidth),
    z: round(segments[1].from.z - segments[1].direction.z * halfWidth),
  };
  const spineEnd = {
    x: round(segments[1].to.x + segments[1].direction.x * halfWidth),
    z: round(segments[1].to.z + segments[1].direction.z * halfWidth),
  };
  const lastArmStart = {
    x: round(segments[2].from.x + segments[2].direction.x * halfWidth),
    z: round(segments[2].from.z + segments[2].direction.z * halfWidth),
  };
  const firstCell = passageCell(
    'from-arm',
    passageBounds(from, firstArmEnd, segments[0].direction),
    segments[0].direction,
  );
  const spineCell = passageCell(
    'turn-spine',
    passageBounds(spineStart, spineEnd, segments[1].direction),
    segments[1].direction,
  );
  const hasLastArm = segments[2].length > halfWidth + .001;
  const lastCell = hasLastArm
    ? passageCell('to-arm', passageBounds(lastArmStart, to, segments[2].direction), segments[2].direction)
    : undefined;
  const cells = [firstCell, spineCell, ...(lastCell ? [lastCell] : [])];
  for (let firstIndex = 0; firstIndex < cells.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < cells.length; secondIndex += 1) {
      assert(
        !strictOverlap(cells[firstIndex].bounds, cells[secondIndex].bounds),
        `${turn.id} circulation cells overlap.`,
      );
    }
  }
  const openings = [
    interiorOpening(
      `opening:${turn.id}:from-arm->turn-spine`,
      firstArmEnd,
      segments[0].direction,
      firstCell.id,
      spineCell.id,
      plan.physicalContract.turnCourtClearWidth,
    ),
    ...(lastCell
      ? [interiorOpening(
          `opening:${turn.id}:turn-spine->to-arm`,
          lastArmStart,
          segments[2].direction,
          spineCell.id,
          lastCell.id,
          plan.physicalContract.turnCourtClearWidth,
        )]
      : []),
  ];
  const localTurnBounds = {
    minX: Math.min(...cells.map(({bounds}) => bounds.minX)),
    maxX: Math.max(...cells.map(({bounds}) => bounds.maxX)),
    minZ: Math.min(...cells.map(({bounds}) => bounds.minZ)),
    maxZ: Math.max(...cells.map(({bounds}) => bounds.maxZ)),
  };
  const fromInwardNormal = clone(segments[0].direction);
  const toInwardNormal = {
    x: round(-segments[2].direction.x),
    z: round(-segments[2].direction.z),
  };
  const targetHall = planHallById.get(turn.toHallId);
  const spineMidpoint = {
    x: round((segments[1].from.x + segments[1].to.x) / 2),
    z: round((segments[1].from.z + segments[1].to.z) / 2),
  };
  const signSideNormal = {
    x: round(-segments[1].direction.z),
    z: round(segments[1].direction.x),
  };
  const signFrontNormal = {x: -signSideNormal.x, z: -signSideNormal.z};
  const turnWayfindingSign = {
    id: `sign:turn-wayfinding:${turn.id}`,
    kind: 'wayfinding',
    title: `Next · Gallery ${galleryNumber(targetHall.publicGalleryNumber)}`,
    kicker: 'Continuous Enfilade · Turn court',
    subtitle: targetHall.title,
    position: {
      x: round(spineMidpoint.x + signSideNormal.x * (halfWidth - .2)),
      y: 2.55,
      z: round(spineMidpoint.z + signSideNormal.z * (halfWidth - .2)),
    },
    rotationY: round(Math.atan2(signFrontNormal.x, signFrontNormal.z), 12),
    width: 4.2,
    height: 1.14,
    interactive: false,
  };
  const transform = {x: 0, z: 0, yaw: 0};
  return {
    id: turn.id,
    kind: 'court',
    physicalRole: 'turn-court',
    title: `Turn court · ${turn.fromHallId} to ${turn.toHallId}`,
    implementationStatus: 'live',
    levelId: 'L0',
    transform,
    bounds: localTurnBounds,
    boundsKind: 'constructed-circulation-envelope',
    map: {
      label: `Turn court · Galleries ${galleryNumber(planHallById.get(turn.fromHallId).publicGalleryNumber)}–${galleryNumber(planHallById.get(turn.toHallId).publicGalleryNumber)}`,
      status: 'orientation-open',
    },
    doorwaySlots: [
      {
        id: 'from',
        position: clone(from),
        worldPosition: clone(from),
        inwardNormal: fromInwardNormal,
        worldInwardNormal: fromInwardNormal,
        clearWidth: portalDimensions.clearWidthMetres,
        clearHeight: portalDimensions.clearHeightMetres,
        transitionDepth: portalDimensions.transitionDepthMetres,
        ...safeDoorwayContract(
          from,
          fromInwardNormal,
        ),
        openingState: 'pending',
      },
      {
        id: 'to',
        position: clone(to),
        worldPosition: clone(to),
        inwardNormal: toInwardNormal,
        worldInwardNormal: toInwardNormal,
        clearWidth: portalDimensions.clearWidthMetres,
        clearHeight: portalDimensions.clearHeightMetres,
        transitionDepth: portalDimensions.transitionDepthMetres,
        ...safeDoorwayContract(
          to,
          toInwardNormal,
        ),
        openingState: 'pending',
      },
    ],
    geometry: {
      coordinateFrame: 'node-local',
      bounds: localTurnBounds,
      cells,
      planCenterline: clone(turn.centerline),
      worldCenterline: runtimeCenterline,
      centerlineLength: turn.centerlineLength,
      measuredCenterlineLength: round(measuredLength, 6),
      segmentCount: segments.length,
      clearWidth: plan.physicalContract.turnCourtClearWidth,
      treatment: turn.treatment,
      interiorOpenings: openings,
      signs: [turnWayfindingSign],
    },
    fromProgramHallId: turn.fromHallId,
    toProgramHallId: turn.toHallId,
  };
});
const turnCourtByPair = new Map(
  turnCourtNodes.map((node) => [`${node.fromProgramHallId}->${node.toProgramHallId}`, node]),
);

const finalBounds = planBoundsToRuntime(plan.finalThreshold.bounds);
const finalSourceHall = hallNodeByProgramId.get(plan.finalThreshold.routeSourceHallId);
const finalSourcePlan = planHallById.get(plan.finalThreshold.routeSourceHallId);
const finalSourcePortal = finalSourceHall.doorwaySlots.find(({id}) => id === finalSourcePlan.routePortals.exit);
const finalThresholdNode = rectangularNode({
  id: plan.finalThreshold.id,
  kind: 'corridor',
  physicalRole: 'final-return-threshold',
  title: plan.finalThreshold.title,
  bounds: finalBounds,
  slotSpecs: [
    {
      id: 'through-route',
      worldPosition: clone(finalSourcePortal.worldPosition),
      inwardNormal: planVectorToRuntime({x: -1, z: 0}),
    },
    {
      id: 'return-exit',
      worldPosition: planPointToRuntime({
        x: plan.finalThreshold.bounds.minX,
        z: round((plan.finalThreshold.bounds.minZ + plan.finalThreshold.bounds.maxZ) / 2),
      }),
      inwardNormal: planVectorToRuntime({x: 1, z: 0}),
      external: true,
    },
  ],
  metadata: {
    routeSourceProgramHallId: plan.finalThreshold.routeSourceHallId,
    actions: clone(plan.finalThreshold.actions),
  },
});

const extensionBounds = {
  minX: plan.crosscut.bounds.minX,
  maxX: plan.crosscut.bounds.maxX,
  minZ: plan.physicalContract.mainGalleryBlock.bounds.maxZ,
  maxZ: plan.crosscut.bounds.maxZ,
};
const crosscutExtensionNode = rectangularNode({
  id: 'route:north-south-crosscut:north-extension',
  kind: 'corridor',
  physicalRole: 'crosscut-north-extension',
  title: 'North–South Collection Crosscut · closed-reserve extension',
  bounds: extensionBounds,
  slotSpecs: [
    {
      id: 'south',
      worldPosition: {x: 0, z: extensionBounds.minZ},
      inwardNormal: {x: 0, z: 1},
      clearWidth: plan.physicalContract.crosscutClearWidth,
    },
    {
      id: 'north',
      worldPosition: {x: 0, z: extensionBounds.maxZ},
      inwardNormal: {x: 0, z: -1},
      clearWidth: plan.physicalContract.crosscutClearWidth,
    },
  ],
  metadata: {
    clearWidth: plan.physicalContract.crosscutClearWidth,
    publicLength: plan.crosscut.reserveExtensionLength,
  },
});

const reserves = plan.expansionReservations.map((reserve) => {
  const westReserve = reserve.bounds.maxX === plan.crosscut.bounds.minX;
  const architecturalBoundaryX = westReserve ? reserve.bounds.maxX : reserve.bounds.minX;
  const runtimeBounds = planBoundsToRuntime(reserve.bounds);
  const boundaryX = planPointToRuntime({x: architecturalBoundaryX, z: 0}).x;
  const fullHeight = programTemplateById.get('sequence-3').ceilingHeightMetres;
  return {
    id: reserve.id,
    kind: 'closed-expansion-reserve',
    status: reserve.status,
    implementationStatus: 'reserved',
    levelId: 'L0',
    bounds: runtimeBounds,
    center: centerOfBounds(runtimeBounds),
    size: sizeOfBounds(runtimeBounds),
    maximumTemplate: reserve.maximumTemplate,
    futureEntryFrom: reserve.futureEntryFrom,
    futureEntryFromNodeId: crosscutExtensionNode.id,
    currentDoorState: reserve.currentDoorState,
    accessible: false,
    map: {label: 'Closed expansion reserve', status: 'closed-reserve'},
    boundaryWall: {
      id: `wall:${reserve.id}:crosscut-boundary`,
      center: {
        x: boundaryX,
        y: round(fullHeight / 2),
        z: round((runtimeBounds.minZ + runtimeBounds.maxZ) / 2),
      },
      line: {
        from: {x: boundaryX, z: runtimeBounds.minZ},
        to: {x: boundaryX, z: runtimeBounds.maxZ},
      },
      size: {
        width: runtimeBounds.maxZ - runtimeBounds.minZ,
        height: fullHeight,
        depth: wallThicknessMetres,
      },
      rotationY: round(Math.PI / 2, 12),
      fullHeight: true,
      openingState: 'closed-solid-wall',
      collision: true,
      rendered: true,
    },
  };
});

const nodes = [
  ...hallNodes,
  entranceNode,
  ...crossingNodes,
  ...turnCourtNodes,
  finalThresholdNode,
  crosscutExtensionNode,
];
const nodeById = new Map(nodes.map((node) => [node.id, node]));
const connections = [];
const throughConnectionIds = [];
const crosscutConnectionIds = [];

const getSlot = (nodeId, slotId) => {
  const node = nodeById.get(nodeId);
  assert(node, `Connection references unknown node ${nodeId}.`);
  const slot = node.doorwaySlots.find(({id}) => id === slotId);
  assert(slot, `Connection references unknown slot ${nodeId}/${slotId}.`);
  return slot;
};

const addConnection = (id, a, b, routeRole, targetList) => {
  assert(!connections.some((connection) => connection.id === id), `Duplicate connection ${id}.`);
  getSlot(a.nodeId, a.slotId);
  getSlot(b.nodeId, b.slotId);
  const connection = {
    id,
    a,
    b,
    routeRole,
    accessible: true,
    implementationStatus: 'live',
  };
  connections.push(connection);
  targetList.push(id);
  return connection;
};

const throughNodeOrder = [entranceNode.id];
let throughSegment = 0;
const nextThroughId = (label) =>
  `conn:through:${String(throughSegment++).padStart(2, '0')}:${label}`;
const firstProgramHallId = plan.throughRoute.hallOrder[0];
const firstHallNode = hallNodeByProgramId.get(firstProgramHallId);
addConnection(
  nextThroughId(`entrance->${firstProgramHallId}`),
  {nodeId: entranceNode.id, slotId: 'through-route'},
  {nodeId: firstHallNode.id, slotId: planHallById.get(firstProgramHallId).routePortals.entry},
  'through-route',
  throughConnectionIds,
);
throughNodeOrder.push(firstHallNode.id);

const crossingByPair = new Map(
  plan.crosscut.intersections
    .filter(({betweenHallIds}) => betweenHallIds)
    .map((intersection) => [pairKey(...intersection.betweenHallIds), crossingNodeById.get(intersection.id)]),
);

const nearestLateralSlot = (node, point) => {
  const candidates = node.doorwaySlots.filter(({id}) => id === 'west' || id === 'east');
  const slot = candidates.find(({worldPosition}) => samePoint(worldPosition, point));
  assert(slot, `${node.id} has no lateral slot at (${point.x}, ${point.z}).`);
  return slot;
};

for (let index = 0; index < plan.throughRoute.hallOrder.length - 1; index += 1) {
  const fromProgramHallId = plan.throughRoute.hallOrder[index];
  const toProgramHallId = plan.throughRoute.hallOrder[index + 1];
  const fromNode = hallNodeByProgramId.get(fromProgramHallId);
  const toNode = hallNodeByProgramId.get(toProgramHallId);
  const fromPlan = planHallById.get(fromProgramHallId);
  const toPlan = planHallById.get(toProgramHallId);
  const fromSlotId = fromPlan.routePortals.exit;
  const toSlotId = toPlan.routePortals.entry;
  const fromPoint = getSlot(fromNode.id, fromSlotId).worldPosition;
  const toPoint = getSlot(toNode.id, toSlotId).worldPosition;
  const turn = turnCourtByPair.get(`${fromProgramHallId}->${toProgramHallId}`);
  const crossing = crossingByPair.get(pairKey(fromProgramHallId, toProgramHallId));

  if (turn) {
    addConnection(
      nextThroughId(`${fromProgramHallId}->${turn.id}`),
      {nodeId: fromNode.id, slotId: fromSlotId},
      {nodeId: turn.id, slotId: 'from'},
      'through-route',
      throughConnectionIds,
    );
    addConnection(
      nextThroughId(`${turn.id}->${toProgramHallId}`),
      {nodeId: turn.id, slotId: 'to'},
      {nodeId: toNode.id, slotId: toSlotId},
      'through-route',
      throughConnectionIds,
    );
    throughNodeOrder.push(turn.id, toNode.id);
  } else if (crossing) {
    const crossingFromSlot = nearestLateralSlot(crossing, fromPoint);
    const crossingToSlot = nearestLateralSlot(crossing, toPoint);
    addConnection(
      nextThroughId(`${fromProgramHallId}->${crossing.id}`),
      {nodeId: fromNode.id, slotId: fromSlotId},
      {nodeId: crossing.id, slotId: crossingFromSlot.id},
      'through-route',
      throughConnectionIds,
    );
    addConnection(
      nextThroughId(`${crossing.id}->${toProgramHallId}`),
      {nodeId: crossing.id, slotId: crossingToSlot.id},
      {nodeId: toNode.id, slotId: toSlotId},
      'through-route',
      throughConnectionIds,
    );
    throughNodeOrder.push(crossing.id, toNode.id);
  } else {
    addConnection(
      nextThroughId(`${fromProgramHallId}->${toProgramHallId}`),
      {nodeId: fromNode.id, slotId: fromSlotId},
      {nodeId: toNode.id, slotId: toSlotId},
      'through-route',
      throughConnectionIds,
    );
    throughNodeOrder.push(toNode.id);
  }
}

addConnection(
  nextThroughId(`${plan.finalThreshold.routeSourceHallId}->final-threshold`),
  {nodeId: finalSourceHall.id, slotId: finalSourcePlan.routePortals.exit},
  {nodeId: finalThresholdNode.id, slotId: 'through-route'},
  'through-route',
  throughConnectionIds,
);
throughNodeOrder.push(finalThresholdNode.id);

const forumPlan = planHallById.get('core-questions-forum');
const crosscutChain = [
  {nodeId: 'crossing:band-01', lowerSlotId: 'south', upperSlotId: 'north'},
  {nodeId: 'crossing:band-02', lowerSlotId: 'south', upperSlotId: 'north'},
  {
    nodeId: hallNodeId('core-questions-forum'),
    lowerSlotId: forumPlan.routePortals.crosscutSouth,
    upperSlotId: forumPlan.routePortals.crosscutNorth,
  },
  {nodeId: 'crossing:band-04', lowerSlotId: 'south', upperSlotId: 'north'},
  {nodeId: 'crossing:band-05', lowerSlotId: 'south', upperSlotId: 'north'},
  {nodeId: 'crossing:band-06', lowerSlotId: 'south', upperSlotId: 'north'},
  {nodeId: crosscutExtensionNode.id, lowerSlotId: 'south', upperSlotId: 'north'},
];
for (let index = 0; index < crosscutChain.length - 1; index += 1) {
  const from = crosscutChain[index];
  const to = crosscutChain[index + 1];
  addConnection(
    `conn:crosscut:${String(index + 1).padStart(2, '0')}`,
    {nodeId: from.nodeId, slotId: from.upperSlotId},
    {nodeId: to.nodeId, slotId: to.lowerSlotId},
    'crosscut',
    crosscutConnectionIds,
  );
}

const referencedSlotKeys = new Set(connections.flatMap(({a, b}) => [
  `${a.nodeId}/${a.slotId}`,
  `${b.nodeId}/${b.slotId}`,
]));
for (const node of nodes) {
  for (const slot of node.doorwaySlots) {
    const key = `${node.id}/${slot.id}`;
    if (slot.external) slot.openingState = 'external-open';
    else slot.openingState = referencedSlotKeys.has(key) ? 'open' : 'closed-solid-wall';
  }
}

const counts = {
  halls: hallNodes.length,
  rooms: hallNodes.reduce((sum, node) => sum + node.roomIds.length, 0),
  curatedOpen: hallNodes.filter(({galleryState}) => galleryState === 'curated-open').length,
  plannedWalkable: hallNodes.filter(({galleryState}) => galleryState === 'planned-walkable').length,
  reserves: reserves.length,
  hallCount: hallNodes.length,
  curatedOpenHallCount: hallNodes.filter(({galleryState}) => galleryState === 'curated-open').length,
  plannedWalkableHallCount: hallNodes.filter(({galleryState}) => galleryState === 'planned-walkable').length,
  canonicalRoomCount: hallNodes.reduce((sum, node) => sum + node.roomIds.length, 0),
  nodeCount: nodes.length,
  connectionCount: connections.length,
  throughRouteConnectionCount: throughConnectionIds.length,
  crosscutConnectionCount: crosscutConnectionIds.length,
  crosscutIntersectionCount: plan.crosscut.intersections.length,
  standaloneCrossingNodeCount: crossingNodes.length,
  turnCourtCount: turnCourtNodes.length,
  reserveCount: reserves.length,
  plannedStatusSignCount: hallNodes
    .filter(({galleryState}) => galleryState === 'planned-walkable')
    .reduce((sum, node) => sum + node.geometry.signs.length, 0),
};

const manifest = {
  schemaVersion: 2,
  manifestVersion: 'continuous-enfilade-single-level-v1',
  status: 'implemented-approved-continuous-enfilade',
  physicalOptionId: 'continuous-enfilade-single-level',
  generatedBy: 'scripts/compileContinuousEnfiladeManifest.mjs',
  source: {
    plan: {
      path: planRelativePath,
      planId: plan.planId,
      schemaVersion: plan.schemaVersion,
      sha256: hash(planSource),
    },
    program: {
      path: programRelativePath,
      schemaVersion: program.schemaVersion,
      sha256: hash(programSource),
    },
  },
  units: plan.units,
  level: {id: plan.coordinateSystem.levelId, title: 'Single public level', elevation: plan.coordinateSystem.finishedFloorY},
  coordinateSystem: clone(plan.coordinateSystem),
  runtimeEmbedding: clone(plan.runtimeEmbedding),
  physicalContract: {
    ...clone(plan.physicalContract),
    wallThickness: wallThicknessMetres,
    doorClearWidth: portalDimensions.clearWidthMetres,
    doorClearHeight: portalDimensions.clearHeightMetres,
    transitionDepth: portalDimensions.transitionDepthMetres,
    safeLandingWidth: safeArrivalLanding.width,
    safeLandingDepth: safeArrivalLanding.depth,
    defaultCeilingHeight,
    wallThicknessMetres,
    publicPortal: clone(portalDimensions),
    safeArrivalLanding,
    stepFree: true,
  },
  residencyPolicy: {
    maxResidentHallContents: plan.performanceContract.maxResidentHallContents,
    recentHallCount: plan.performanceContract.recentHallCount,
    approachDistance: plan.performanceContract.approachDistance,
    decodedTextureBudgetMiB: plan.performanceContract.decodedTextureBudgetMiB,
  },
  mainEntrance: {
    nodeId: entranceNode.id,
    slotId: 'public-entry',
    routeTargetHallId: plan.grandEntrance.routeTargetHallId,
    publicEntrySlotId: 'public-entry',
    throughRouteSlotId: 'through-route',
    routeTargetProgramHallId: plan.grandEntrance.routeTargetHallId,
  },
  forumNodeId: hallNodeId('core-questions-forum'),
  finalThresholdNodeId: finalThresholdNode.id,
  crosscut: {
    id: plan.crosscut.id,
    title: plan.crosscut.title,
    clearWidth: plan.physicalContract.crosscutClearWidth,
    bounds: clone(plan.crosscut.bounds),
    publicMainLength: plan.crosscut.publicMainLength,
    reserveExtensionLength: plan.crosscut.reserveExtensionLength,
    intersections: plan.crosscut.intersections.map((intersection) => ({
      ...clone(intersection),
      nodeId: intersection.occupiedByHallId
        ? hallNodeId(intersection.occupiedByHallId)
        : intersection.id,
    })),
    intersectionIds: plan.crosscut.intersections.map(({id}) => id),
    standaloneCrossingNodeIds: crossingNodes.map(({id}) => id),
    forumIntersection: {
      id: 'crossing:forum',
      nodeId: hallNodeId('core-questions-forum'),
    },
    extensionNodeId: crosscutExtensionNode.id,
    nodeOrder: crosscutChain.map(({nodeId}) => nodeId),
    connectionIds: crosscutConnectionIds,
  },
  throughRoute: {
    start: entranceNode.id,
    finish: finalThresholdNode.id,
    hallOrder: clone(plan.throughRoute.hallOrder),
    crossingBayIds: clone(plan.throughRoute.crossingBayIds),
    startNodeId: entranceNode.id,
    finishNodeId: finalThresholdNode.id,
    programHallOrder: clone(plan.throughRoute.hallOrder),
    nodeOrder: throughNodeOrder,
    connectionIds: throughConnectionIds,
    nominalHallRunLength: plan.throughRoute.nominalHallRunLength,
    crossingBayRunLength: plan.throughRoute.crossingBayRunLength,
    turnCourtRunLength: plan.throughRoute.turnCourtRunLength,
    completeVisitLength: plan.throughRoute.completeVisitLength,
  },
  nodes,
  connections,
  reserves,
  counts,
};

const validateManifest = (candidate) => {
  assert.equal(candidate.schemaVersion, 2);
  assert.equal(candidate.status, 'implemented-approved-continuous-enfilade');
  assert.equal(candidate.physicalOptionId, 'continuous-enfilade-single-level');
  assert.deepEqual(candidate.runtimeEmbedding, plan.runtimeEmbedding);
  assert.equal(candidate.physicalContract.wallThickness, wallThicknessMetres);
  assert.equal(candidate.physicalContract.doorClearWidth, portalDimensions.clearWidthMetres);
  assert.equal(candidate.physicalContract.doorClearHeight, portalDimensions.clearHeightMetres);
  assert.equal(candidate.physicalContract.transitionDepth, portalDimensions.transitionDepthMetres);
  assert.equal(candidate.physicalContract.safeLandingWidth, safeArrivalLanding.width);
  assert.equal(candidate.physicalContract.safeLandingDepth, safeArrivalLanding.depth);
  assert.equal(candidate.physicalContract.defaultCeilingHeight, defaultCeilingHeight);
  assert.equal(candidate.mainEntrance.slotId, 'public-entry');
  assert.equal(candidate.mainEntrance.routeTargetHallId, plan.grandEntrance.routeTargetHallId);
  assert.equal(candidate.crosscut.clearWidth, plan.physicalContract.crosscutClearWidth);
  assert.deepEqual(
    candidate.crosscut.intersections.map(({id}) => id),
    plan.crosscut.intersections.map(({id}) => id),
  );
  assert.equal(candidate.throughRoute.start, candidate.mainEntrance.nodeId);
  assert.equal(candidate.throughRoute.finish, candidate.finalThresholdNodeId);
  assert.deepEqual(candidate.throughRoute.hallOrder, plan.throughRoute.hallOrder);
  assert.deepEqual(candidate.throughRoute.crossingBayIds, plan.throughRoute.crossingBayIds);
  assert.equal(candidate.nodes.length, candidate.counts.nodeCount);
  assert.equal(candidate.connections.length, candidate.counts.connectionCount);
  assert.equal(candidate.counts.hallCount, 26);
  assert.equal(candidate.counts.curatedOpenHallCount, 16);
  assert.equal(candidate.counts.plannedWalkableHallCount, 10);
  assert.equal(candidate.counts.canonicalRoomCount, 105);
  assert.equal(candidate.counts.standaloneCrossingNodeCount, 5);
  assert.equal(candidate.counts.crosscutIntersectionCount, 6);
  assert.equal(candidate.counts.turnCourtCount, 5);
  assert.equal(candidate.counts.reserveCount, 2);
  assert.equal(candidate.counts.plannedStatusSignCount, 10);
  assert.equal(candidate.counts.throughRouteConnectionCount, 37);
  assert.equal(candidate.counts.crosscutConnectionCount, 6);
  assert.equal(candidate.counts.connectionCount, 43);
  assert.equal(candidate.counts.halls, 26);
  assert.equal(candidate.counts.rooms, 105);
  assert.equal(candidate.counts.curatedOpen, 16);
  assert.equal(candidate.counts.plannedWalkable, 10);
  assert.equal(candidate.counts.reserves, 2);
  assert(unique(candidate.nodes.map(({id}) => id)), 'Compiled node IDs are not unique.');
  assert(unique(candidate.connections.map(({id}) => id)), 'Compiled connection IDs are not unique.');
  assert(unique(candidate.reserves.map(({id}) => id)), 'Compiled reserve IDs are not unique.');

  const compiledHallNodes = candidate.nodes.filter(({kind}) => kind === 'hall');
  assert.deepEqual(
    sorted(compiledHallNodes.map(({programHallId}) => programHallId)),
    sorted(plan.halls.map(({id}) => id)),
  );
  assert.deepEqual(
    sorted(compiledHallNodes.flatMap(({roomIds}) => roomIds)),
    sorted(program.rooms.map(({id}) => id)),
  );
  assert.deepEqual(
    compiledHallNodes.map(({publicGalleryNumber}) => publicGalleryNumber).sort((a, b) => a - b),
    Array.from({length: 26}, (_, index) => index + 1),
  );
  assert.deepEqual(
    compiledHallNodes.map(({visitSequence}) => visitSequence).sort((a, b) => a - b),
    Array.from({length: 26}, (_, index) => index + 1),
  );

  for (const node of compiledHallNodes) {
    const approved = planHallById.get(node.programHallId);
    const canonical = programHallById.get(node.programHallId);
    assert(approved && canonical, `${node.id} lacks approved program data.`);
    assert.equal(node.publicGalleryNumber, approved.publicGalleryNumber);
    assert.equal(node.visitSequence, approved.visitSequence);
    assert.equal(node.bandId, approved.bandId);
    assert.equal(node.templateId, approved.templateId);
    assert.equal(node.roomLayoutStrategy, approved.roomLayoutStrategy);
    assert.deepEqual(node.roomIds, approved.roomIds);
    assert.deepEqual(
      node.rooms,
      approved.roomIds.map((roomId) => {
        const room = programRoomById.get(roomId);
        assert(room, `${node.id} references unknown canonical room ${roomId}.`);
        return {id: room.id, title: room.title};
      }),
    );
    const expectedRuntimePlacement = planPointToRuntime(approved.placement);
    const expectedPortalSpecs = templatePortalSpecs[approved.templateId];
    assert.equal(node.transform.x, expectedRuntimePlacement.x);
    assert.equal(node.transform.z, approved.placement.z);
    assert(close(node.transform.yaw, mirroredHallRuntimeYaw(approved, expectedPortalSpecs), 1e-9));
    assert.deepEqual(node.planPlacement, approved.placement);
    const expectedEmbedding = plan.physicalContract.templateEmbedding[approved.templateId];
    assert.deepEqual(node.bounds, boundsFromCenter(
      expectedRuntimePlacement,
      expectedEmbedding.worldFootprint.width,
      expectedEmbedding.worldFootprint.depth,
    ));
    assert.equal(node.implementationStatus, 'live');

    if (approved.migrationState === 'migrate-populated') {
      assert.equal(node.galleryState, 'curated-open');
      assert.equal(node.publicHallId, approved.id);
      assert(!Object.hasOwn(node, 'geometry'), `${node.id} must preserve its separately authored curated geometry.`);
    } else {
      assert.equal(node.galleryState, 'planned-walkable');
      assert(!Object.hasOwn(node, 'publicHallId'), `${node.id} must not register planned content as public/curated.`);
      assert(node.geometry, `${node.id} has no planned-shell geometry.`);
      const roomCells = node.geometry.cells.filter(({kind}) => kind === 'room');
      assert.deepEqual(sorted(roomCells.map(({id}) => id)), sorted(node.roomIds));
      assert.equal(node.geometry.signs.length, 1, `${node.id} must have exactly one planned-status sign.`);
      assert.equal(node.geometry.signs[0].kind, 'planned-status');
      assert.equal(node.geometry.signs[0].interactive, false);
      const geometrySource = JSON.stringify(node.geometry);
      for (const forbidden of ['"exhibits"', '"media"', '"articleRoutes"', '"assetIds"', '"interactions"', '"attributions"']) {
        assert(!geometrySource.includes(forbidden), `${node.id} planned geometry contains forbidden ${forbidden}.`);
      }
      const cellIds = new Set(node.geometry.cells.map(({id}) => id));
      assert.equal(cellIds.size, node.geometry.cells.length, `${node.id} duplicates a geometry cell.`);
      for (const cell of node.geometry.cells) {
        assert(containsBounds(node.geometry.bounds, cell.bounds), `${node.id}/${cell.id} escapes the hall-local footprint.`);
      }
      for (let first = 0; first < node.geometry.cells.length; first += 1) {
        for (let second = first + 1; second < node.geometry.cells.length; second += 1) {
          assert(
            !strictOverlap(node.geometry.cells[first].bounds, node.geometry.cells[second].bounds),
            `${node.id} geometry cells ${node.geometry.cells[first].id} and ${node.geometry.cells[second].id} overlap.`,
          );
        }
      }
      const totalCellArea = node.geometry.cells.reduce((sum, cell) => sum + boundsArea(cell.bounds), 0);
      assert(close(totalCellArea, boundsArea(node.geometry.bounds)), `${node.id} planned cells do not fill their local footprint.`);
      for (const opening of node.geometry.interiorOpenings) {
        assert(cellIds.has(opening.fromCellId) && cellIds.has(opening.toCellId), `${node.id}/${opening.id} references an unknown cell.`);
        assert.equal(opening.clearWidth, 4);
        assert.equal(opening.clearHeight, 3.2);
        assert.equal(opening.transitionDepth, 1.2);
      }
    }
  }

  for (let first = 0; first < compiledHallNodes.length; first += 1) {
    for (let second = first + 1; second < compiledHallNodes.length; second += 1) {
      assert(
        !strictOverlap(compiledHallNodes[first].bounds, compiledHallNodes[second].bounds),
        `${compiledHallNodes[first].id} overlaps ${compiledHallNodes[second].id}.`,
      );
    }
  }

  const occupancyNodes = candidate.nodes;
  const occupancyFootprints = (node) => node.physicalRole === 'turn-court'
    ? node.geometry.cells.map(({bounds}) => bounds)
    : [node.bounds];
  for (let first = 0; first < occupancyNodes.length; first += 1) {
    for (let second = first + 1; second < occupancyNodes.length; second += 1) {
      for (const firstBounds of occupancyFootprints(occupancyNodes[first])) {
        for (const secondBounds of occupancyFootprints(occupancyNodes[second])) {
          assert(
            !strictOverlap(firstBounds, secondBounds),
            `${occupancyNodes[first].id} overlaps ${occupancyNodes[second].id}.`,
          );
        }
      }
    }
  }
  for (const reserve of candidate.reserves) {
    assert.equal(reserve.size.width, 56);
    assert.equal(reserve.size.depth, 28);
    assert.equal(reserve.currentDoorState, 'solid-construction-wall');
    assert.equal(reserve.boundaryWall.fullHeight, true);
    assert.equal(reserve.boundaryWall.openingState, 'closed-solid-wall');
    assert.equal(reserve.boundaryWall.collision, true);
    assert.equal(reserve.boundaryWall.rendered, true);
    for (const node of occupancyNodes) {
      for (const bounds of occupancyFootprints(node)) {
        assert(!strictOverlap(reserve.bounds, bounds), `${reserve.id} overlaps ${node.id}.`);
      }
    }
  }
  assert(!strictOverlap(candidate.reserves[0].bounds, candidate.reserves[1].bounds));

  const controlledBounds = plan.physicalContract.controlledPlanBoundsIncludingEntranceAndReserves;
  const boundedItems = [
    ...occupancyNodes.flatMap(occupancyFootprints),
    ...candidate.reserves.map(({bounds}) => bounds),
  ];
  const measuredBounds = {
    minX: Math.min(...boundedItems.map(({minX}) => minX)),
    maxX: Math.max(...boundedItems.map(({maxX}) => maxX)),
    minZ: Math.min(...boundedItems.map(({minZ}) => minZ)),
    maxZ: Math.max(...boundedItems.map(({maxZ}) => maxZ)),
  };
  assert.deepEqual(measuredBounds, {
    ...planBoundsToRuntime(controlledBounds),
  });

  const compiledNodeById = new Map(candidate.nodes.map((node) => [node.id, node]));
  const compiledSlot = (endpoint) => {
    const node = compiledNodeById.get(endpoint.nodeId);
    assert(node, `Unknown connection node ${endpoint.nodeId}.`);
    const slot = node.doorwaySlots.find(({id}) => id === endpoint.slotId);
    assert(slot, `Unknown connection slot ${endpoint.nodeId}/${endpoint.slotId}.`);
    return slot;
  };
  const connectedSlotKeys = new Set();
  for (const connection of candidate.connections) {
    const first = compiledSlot(connection.a);
    const second = compiledSlot(connection.b);
    assert(samePoint(first.worldPosition, second.worldPosition), `${connection.id} endpoints are not coincident.`);
    assert(
      Math.hypot(
        first.worldInwardNormal.x + second.worldInwardNormal.x,
        first.worldInwardNormal.z + second.worldInwardNormal.z,
      ) < .001,
      `${connection.id} endpoint normals do not oppose.`,
    );
    connectedSlotKeys.add(`${connection.a.nodeId}/${connection.a.slotId}`);
    connectedSlotKeys.add(`${connection.b.nodeId}/${connection.b.slotId}`);
    assert.equal(connection.accessible, true);
    assert.equal(connection.implementationStatus, 'live');
  }
  for (const node of candidate.nodes) {
    for (const slot of node.doorwaySlots) {
      assert.equal(round(slot.landingBounds.maxX - slot.landingBounds.minX), safeArrivalLanding.width);
      assert.equal(round(slot.landingBounds.maxZ - slot.landingBounds.minZ), safeArrivalLanding.depth);
      assert.equal(
        slot.arrivalPose.x,
        round(slot.position.x + slot.inwardNormal.x * safeArrivalLanding.poseOffsetFromPortal),
      );
      assert.equal(
        slot.arrivalPose.z,
        round(slot.position.z + slot.inwardNormal.z * safeArrivalLanding.poseOffsetFromPortal),
      );
      const expectedArrivalYaw = node.id === candidate.mainEntrance.nodeId
        && slot.id === candidate.mainEntrance.slotId
        ? round(Math.atan2(
            -(node.orientationLandmark.position.x - slot.arrivalPose.x),
            -(node.orientationLandmark.position.z - slot.arrivalPose.z),
          ), 12)
        : round(Math.atan2(-slot.inwardNormal.x, -slot.inwardNormal.z), 12);
      assert.equal(slot.arrivalPose.yaw, expectedArrivalYaw);
      assert.equal(slot.arrivalPose.pitch, 0);
      assert(
        slot.arrivalPose.x >= slot.landingBounds.minX
          && slot.arrivalPose.x <= slot.landingBounds.maxX
          && slot.arrivalPose.z >= slot.landingBounds.minZ
          && slot.arrivalPose.z <= slot.landingBounds.maxZ,
        `${node.id}/${slot.id} arrival pose lies outside its safe landing.`,
      );
      const connected = connectedSlotKeys.has(`${node.id}/${slot.id}`);
      if (slot.external) assert.equal(slot.openingState, 'external-open');
      else assert.equal(slot.openingState, connected ? 'open' : 'closed-solid-wall');
    }
  }

  assert.deepEqual(candidate.throughRoute.programHallOrder, plan.throughRoute.hallOrder);
  assert.equal(candidate.throughRoute.nodeOrder[0], candidate.mainEntrance.nodeId);
  assert.equal(candidate.throughRoute.nodeOrder.at(-1), candidate.finalThresholdNodeId);
  assert.equal(candidate.crosscut.nodeOrder.length, 7);
  assert.equal(candidate.crosscut.forumIntersection.nodeId, candidate.forumNodeId);
  assert.equal(candidate.crosscut.standaloneCrossingNodeIds.length, 5);

  const adjacency = new Map(candidate.nodes.map(({id}) => [id, new Set()]));
  for (const {a, b} of candidate.connections) {
    adjacency.get(a.nodeId).add(b.nodeId);
    adjacency.get(b.nodeId).add(a.nodeId);
  }
  const reached = new Set();
  const queue = [candidate.mainEntrance.nodeId];
  while (queue.length) {
    const current = queue.shift();
    if (reached.has(current)) continue;
    reached.add(current);
    queue.push(...adjacency.get(current));
  }
  assert.equal(reached.size, candidate.nodes.length, 'Compiled physical graph is not fully reachable from the Grand Entrance.');

  for (const turn of plan.turnCourts) {
    const node = compiledNodeById.get(turn.id);
    assert(node, `Missing turn court ${turn.id}.`);
    assert.equal(node.geometry.coordinateFrame, 'node-local');
    assert([2, 3].includes(node.geometry.cells.length));
    assert(node.geometry.cells.every(({kind}) => kind === 'passage'));
    assert(node.geometry.cells.every(({ceilingHeight}) => ceilingHeight === defaultCeilingHeight));
    assert.deepEqual(node.geometry.planCenterline, turn.centerline);
    assert.deepEqual(node.geometry.worldCenterline, turn.centerline.map(planPointToRuntime));
    assert.equal(node.geometry.centerlineLength, turn.centerlineLength);
    assert(close(node.geometry.measuredCenterlineLength, turn.centerlineLength));
    assert.equal(node.geometry.segmentCount, turn.centerline.length - 1);
    assert.equal(node.geometry.clearWidth, 8);
    assert.equal(node.geometry.interiorOpenings.length, node.geometry.cells.length - 1);
    assert(node.geometry.interiorOpenings.every(({clearWidth}) => clearWidth === 8));
    assert.equal(node.geometry.signs.length, 1);
    assert.equal(node.geometry.signs[0].kind, 'wayfinding');
    assert.match(node.geometry.signs[0].title, /^Next · Gallery \d{2}$/u);
    assert(node.geometry.cells.every(({guidanceAxis}) => guidanceAxis === 'x' || guidanceAxis === 'z'));
    const constructedArea = node.geometry.cells.reduce((sum, {bounds}) =>
      sum + (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ), 0);
    assert(close(constructedArea, node.geometry.clearWidth * node.geometry.measuredCenterlineLength));
    for (let first = 0; first < node.geometry.cells.length; first += 1) {
      for (let second = first + 1; second < node.geometry.cells.length; second += 1) {
        assert(!strictOverlap(node.geometry.cells[first].bounds, node.geometry.cells[second].bounds));
      }
    }
  }
};

validateManifest(manifest);
const serialized = `${JSON.stringify(manifest, null, 2)}\n`;

if (checkOnly) {
  const committed = readFileSync(outputPath, 'utf8');
  assert.equal(committed.replaceAll('\r\n', '\n'), serialized, `${outputRelativePath} is stale. Run the compiler.`);
  validateManifest(JSON.parse(committed));
  console.log(`Verified ${outputRelativePath}: ${counts.hallCount} halls, ${counts.canonicalRoomCount} rooms, ${counts.connectionCount} connections.`);
} else {
  writeFileSync(outputPath, serialized, 'utf8');
  console.log(`Generated ${outputRelativePath}: ${counts.hallCount} halls, ${counts.canonicalRoomCount} rooms, ${counts.connectionCount} connections.`);
}
