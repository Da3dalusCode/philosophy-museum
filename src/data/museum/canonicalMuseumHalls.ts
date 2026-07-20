import type {MuseumAssetId} from './museumAssetTypes';
import {museumAssetById} from './museumAssets';
import {
  MUSEUM_CANONICAL_PROGRAM,
  MUSEUM_PLANNED_HALL_TITLES,
  type MuseumCanonicalExhibit,
  type MuseumCanonicalHall,
  type MuseumCanonicalRoom,
  type MuseumPresentationTier,
} from './museumCanonicalProgram';
import {getMuseumManifestHallNode} from './museumBuildingManifest';
import {
  MEDITERRANEAN_EXHIBIT_CURATION,
  MEDITERRANEAN_GALLERY_ID,
  MEDITERRANEAN_ORIENTATION_DISPLAY,
  MEDITERRANEAN_ROOM_SIGN_COPY,
} from './mediterraneanGalleryCuration';
import {PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS} from './platoSupplementalExhibits';
import {
  RENAISSANCE_EXHIBIT_CURATION,
  RENAISSANCE_GALLERY_ID,
  RENAISSANCE_ROOM_SIGN_COPY,
} from './renaissanceGalleryCuration';
import {RENAISSANCE_SUPPLEMENTAL_EXHIBIT_LAYOUTS} from './renaissanceSupplementalExhibits';
import {MUSEUM_VISITOR_MAP_KIOSK} from './museumVisitorMapKioskDefinition';
import type {
  MuseumBounds,
  MuseumCollider,
  MuseumExhibitLayout,
  MuseumHallContentDefinition,
  MuseumInstallationSceneDefinition,
  MuseumInstallationTier,
  MuseumInstallationTreatment,
  MuseumMediaMountDefinition,
  MuseumPoint,
  MuseumPoint3,
  MuseumSceneVolume,
  MuseumSceneVolumeRole,
  MuseumSize3,
  MuseumSpatialCell,
  MuseumSpatialConnection,
  MuseumTrackDefinition,
  MuseumWallDefinition,
} from './museumWorldTypes';
import type {MuseumExhibitId, MuseumPublicHallId, MuseumZoneId} from '../museumCatalog';

export type MuseumCanonicalHallContentDefinition = Omit<MuseumHallContentDefinition, 'id'> & {
  id: MuseumPublicHallId;
};

const SEQUENCE_WIDTH = 24;
const SEQUENCE_DEPTH = 56;
const SEQUENCE_CEILING = 5.8;
const FORUM_SIZE = 28;
const FORUM_CEILING = 6.2;
const WALL = .36;
const EYE_HEIGHT = 1.7;

type TierContract = {
  tier: MuseumInstallationTier;
  treatment: MuseumInstallationTreatment;
  bayWidth: number;
  objectWidth: number;
  objectDepth: number;
  objectHeight: number;
};

const TIER_CONTRACTS: Readonly<Record<MuseumPresentationTier, TierContract>> = {
  'anchor-exhibit': {tier: 'anchor', treatment: 'anchor-bay', bayWidth: 4.6, objectWidth: 3.8, objectDepth: 2.05, objectHeight: 3.55},
  'standard-individual-exhibit': {tier: 'standard', treatment: 'standard-bay', bayWidth: 3.2, objectWidth: 2.8, objectDepth: 1.85, objectHeight: 3.15},
  'supporting-exhibit': {tier: 'supporting', treatment: 'supporting-panel', bayWidth: 2.5, objectWidth: 2.25, objectDepth: 1.55, objectHeight: 2.75},
  'thematic-cluster-participant': {tier: 'cluster', treatment: 'cluster-panel', bayWidth: 3.1, objectWidth: 2.7, objectDepth: 1.7, objectHeight: 2.9},
  'gallery-archive-or-study-wall-record': {tier: 'archive', treatment: 'archive-label', bayWidth: 1.9, objectWidth: 1.75, objectDepth: 1.45, objectHeight: 2.35},
};

const volume = (
  id: string,
  role: MuseumSceneVolumeRole,
  center: MuseumPoint3,
  size: MuseumSize3,
): MuseumSceneVolume => ({id, role, center, size});

const optionalAsset = (id: string | undefined): MuseumAssetId | undefined => {
  if (!id) return undefined;
  const candidate = id as MuseumAssetId;
  return museumAssetById.has(candidate) ? candidate : undefined;
};

const mediaMount = (
  exhibitId: string,
  assetId: MuseumAssetId,
  index: number,
  backing: MuseumSceneVolume,
  sceneWidth: number,
  sceneHeight: number,
  totalCount: number,
  preserveMediterraneanAspect: boolean,
): MuseumMediaMountDefinition => {
  const source = museumAssetById.get(assetId)?.variants.scene;
  const sourceAspect = source ? source.width / source.height : 1;
  const maximumWidth = totalCount === 1
    ? sceneWidth - .48
    : Math.max(.8, (sceneWidth - .7) / 2);
  const maximumHeight = Math.max(.9, sceneHeight - 1.16);
  let countWidth = index === 0 ? Math.min(1.45, sceneWidth * .42) : Math.min(1.08, sceneWidth * .32);
  let height = index === 0 ? Math.min(1.72, sceneHeight * .48) : Math.min(1.28, sceneHeight * .38);
  let x = index === 0 ? -sceneWidth * .18 : sceneWidth * .27;
  let y = Math.max(1.35, sceneHeight * .58);
  if (preserveMediterraneanAspect) {
    countWidth = maximumWidth;
    height = countWidth / sourceAspect;
    if (height > maximumHeight) {
      height = maximumHeight;
      countWidth = height * sourceAspect;
    }
    x = totalCount === 1 ? 0 : index === 0 ? -sceneWidth * .23 : sceneWidth * .23;
    y = (.3 + sceneHeight - .86) / 2;
  }
  const id = `${exhibitId}-media-${index + 1}`;
  return {
    id,
    assetId,
    kind: 'wall-frame',
    position: [x, y, -.69],
    rotation: [0, 0, 0],
    width: countWidth,
    height,
    frameDepth: .11,
    supportHeight: 0,
    anchorId: backing.id,
    bounds: volume(`${id}-bounds`, 'media', {x, y, z: -.69}, {width: countWidth + .18, height: height + .18, depth: .2}),
    supportBounds: volume(`${id}-support`, 'media', {x, y, z: -.82}, {width: countWidth * .7, height: height * .72, depth: .2}),
  };
};

const createScene = (
  record: MuseumCanonicalExhibit,
  compactForumInstallation = false,
): MuseumInstallationSceneDefinition => {
  const contract = TIER_CONTRACTS[record.tier];
  const physicalContract = compactForumInstallation
    ? {
        ...contract,
        objectWidth: Math.min(contract.objectWidth, contract.tier === 'anchor' ? 3 : 2.55),
        objectDepth: Math.min(contract.objectDepth, contract.tier === 'anchor' ? 1.45 : 1.4),
        objectHeight: Math.min(contract.objectHeight, contract.tier === 'anchor' ? 3.15 : 2.85),
      }
    : contract;
  const backing = volume(
    `${record.id}-backing`,
    'base',
    {x: 0, y: physicalContract.objectHeight / 2, z: -.76},
    {width: physicalContract.objectWidth, height: physicalContract.objectHeight, depth: .16},
  );
  const plinth = volume(
    `${record.id}-plinth`,
    'base',
    {x: 0, y: .1, z: -.05},
    {width: Math.max(1.2, physicalContract.objectWidth * .82), height: .2, depth: Math.max(.72, physicalContract.objectDepth * .55)},
  );
  const motif = volume(
    `${record.id}-concept`,
    'concept-object',
    {x: 0, y: .52, z: .18},
    {width: Math.min(.82, physicalContract.objectWidth * .3), height: .58, depth: .42},
  );
  const mediaAssets = [
    optionalAsset(record.principalAssetId),
    optionalAsset(record.supportingAssetIds?.[0]),
  ].filter((assetId): assetId is MuseumAssetId => Boolean(assetId));
  const preserveCuratedAspect = Object.hasOwn(MEDITERRANEAN_EXHIBIT_CURATION, record.id)
    || Object.hasOwn(RENAISSANCE_EXHIBIT_CURATION, record.id);
  const plaqueWidth = Math.min(1.22, physicalContract.objectWidth - .28);
  const plaqueId = `${record.id}-plaque`;
  return {
    footprint: {width: physicalContract.objectWidth, height: physicalContract.objectHeight + .16, depth: physicalContract.objectDepth},
    mediaMounts: mediaAssets.map((assetId, index) => mediaMount(
      record.id,
      assetId,
      index,
      backing,
      physicalContract.objectWidth,
      physicalContract.objectHeight,
      mediaAssets.length,
      preserveCuratedAspect,
    )),
    plaque: {
      id: plaqueId,
      position: [0, .48, physicalContract.objectDepth / 2 - .18],
      rotation: [-.18, 0, 0],
      width: plaqueWidth,
      height: .46,
      supportHeight: .22,
      anchorId: 'gallery-floor',
      bounds: volume(`${plaqueId}-bounds`, 'plaque', {x: 0, y: .48, z: physicalContract.objectDepth / 2 - .18}, {width: plaqueWidth + .14, height: .58, depth: .28}),
      supportBounds: volume(`${plaqueId}-support`, 'plaque', {x: 0, y: .11, z: physicalContract.objectDepth / 2 - .16}, {width: .55, height: .22, depth: .34}),
    },
    objectBounds: [plinth, backing, motif],
    focalTarget: {x: 0, y: Math.min(1.72, physicalContract.objectHeight * .56), z: -.2},
    interactionBounds: volume(
      `${record.id}-interaction`,
      'principal-object',
      {x: 0, y: physicalContract.objectHeight / 2, z: 0},
      {width: physicalContract.objectWidth, height: physicalContract.objectHeight, depth: Math.max(1.42, physicalContract.objectDepth)},
    ),
  };
};

const colliderBounds = (center: MuseumPoint, rotation: number, width: number, depth: number): MuseumBounds => {
  const quarterTurn = Math.abs(Math.sin(rotation)) > .5;
  const worldWidth = quarterTurn ? depth : width;
  const worldDepth = quarterTurn ? width : depth;
  return {
    minX: center.x - worldWidth / 2,
    maxX: center.x + worldWidth / 2,
    minZ: center.z - worldDepth / 2,
    maxZ: center.z + worldDepth / 2,
  };
};

const overlaps = (first: MuseumBounds, second: MuseumBounds, padding = 0): boolean =>
  first.minX < second.maxX + padding
  && first.maxX > second.minX - padding
  && first.minZ < second.maxZ + padding
  && first.maxZ > second.minZ - padding;

const VIEWPOINT_CLEARANCE_RADIUS = .34;

const circleIntersectsBounds = (
  point: MuseumPoint,
  radius: number,
  bounds: MuseumBounds,
): boolean => {
  const nearestX = Math.max(bounds.minX, Math.min(bounds.maxX, point.x));
  const nearestZ = Math.max(bounds.minZ, Math.min(bounds.maxZ, point.z));
  return Math.hypot(point.x - nearestX, point.z - nearestZ) < radius;
};

const viewpointFitsRoom = (point: MuseumPoint, bounds: MuseumBounds): boolean =>
  point.x >= bounds.minX + VIEWPOINT_CLEARANCE_RADIUS
  && point.x <= bounds.maxX - VIEWPOINT_CLEARANCE_RADIUS
  && point.z >= bounds.minZ + VIEWPOINT_CLEARANCE_RADIUS
  && point.z <= bounds.maxZ - VIEWPOINT_CLEARANCE_RADIUS;

const guidedSegmentIsClear = (
  from: MuseumPoint,
  to: MuseumPoint,
  bounds: MuseumBounds,
  colliders: readonly MuseumCollider[],
): boolean => {
  const distance = Math.hypot(to.x - from.x, to.z - from.z);
  const sampleCount = Math.max(1, Math.ceil(distance / .05));
  for (let index = 0; index <= sampleCount; index += 1) {
    const ratio = index / sampleCount;
    const point = {
      x: from.x + (to.x - from.x) * ratio,
      z: from.z + (to.z - from.z) * ratio,
    };
    if (!viewpointFitsRoom(point, bounds)) return false;
    if (colliders.some((collider) => circleIntersectsBounds(
      point,
      VIEWPOINT_CLEARANCE_RADIUS,
      colliderBounds(collider.center, collider.rotation, collider.size.width, collider.size.depth),
    ))) return false;
  }
  return true;
};

const compactRoute = (points: readonly MuseumPoint[]): readonly MuseumPoint[] =>
  points.filter((point, index) => index === 0
    || Math.hypot(point.x - points[index - 1].x, point.z - points[index - 1].z) > .001);

const guidedRouteLength = (points: readonly MuseumPoint[]): number => points.slice(1)
  .reduce((sum, point, index) => sum + Math.hypot(
    point.x - points[index].x,
    point.z - points[index].z,
  ), 0);

const guidedRouteIsClear = (
  points: readonly MuseumPoint[],
  bounds: MuseumBounds,
  colliders: readonly MuseumCollider[],
): boolean => points.slice(1).every((point, index) =>
  guidedSegmentIsClear(points[index], point, bounds, colliders));

/** Find a short, deterministic aisle route instead of letting a tour cut through an installation. */
const guidedWaypointsWithinRoom = (
  from: MuseumPoint,
  to: MuseumPoint,
  bounds: MuseumBounds,
  colliders: readonly MuseumCollider[],
): readonly MuseumPoint[] => {
  const candidates: MuseumPoint[][] = [
    [from, to],
    [from, {x: from.x, z: to.z}, to],
    [from, {x: to.x, z: from.z}, to],
    [from, {x: 0, z: from.z}, {x: 0, z: to.z}, to],
  ];
  for (let z = bounds.minZ + 1; z <= bounds.maxZ - 1; z += 1) {
    candidates.push([from, {x: from.x, z}, {x: to.x, z}, to]);
  }
  for (let x = bounds.minX + 1; x <= bounds.maxX - 1; x += 1) {
    candidates.push([from, {x, z: from.z}, {x, z: to.z}, to]);
  }
  const clear = candidates
    .map((candidate) => compactRoute(candidate))
    .filter((candidate) => guidedRouteIsClear(candidate, bounds, colliders))
    .sort((first, second) => guidedRouteLength(first) - guidedRouteLength(second));
  if (!clear.length) throw new Error(`No collision-free guided route exists between ${JSON.stringify(from)} and ${JSON.stringify(to)}.`);
  return clear[0];
};

type PlacementCandidate = MuseumPoint & {rotationY: number};

const MEDITERRANEAN_AUTHORED_PLACEMENTS = Object.fromEntries(
  Object.entries(MEDITERRANEAN_EXHIBIT_CURATION).map(([id, curation]) => [id, {
    ...curation.authored,
  }]),
) as Readonly<Record<string, PlacementCandidate>>;

const RENAISSANCE_AUTHORED_PLACEMENTS = Object.fromEntries(
  Object.entries(RENAISSANCE_EXHIBIT_CURATION).map(([id, curation]) => [id, {
    ...curation.authored,
  }]),
) as Readonly<Record<string, PlacementCandidate>>;

const wallCandidates = (bounds: MuseumBounds): readonly PlacementCandidate[] => {
  const width = bounds.maxX - bounds.minX;
  const depth = bounds.maxZ - bounds.minZ;
  const zAt = (ratio: number) => bounds.minZ + depth * ratio;
  const xAt = (ratio: number) => bounds.minX + width * ratio;
  const perimeter = [
    ...[.17, .5, .83].map((ratio) => ({x: bounds.minX + 1.15, z: zAt(ratio), rotationY: Math.PI / 2})),
    ...[.17, .5, .83].map((ratio) => ({x: bounds.maxX - 1.15, z: zAt(ratio), rotationY: -Math.PI / 2})),
    ...[.25, .75].map((ratio) => ({x: xAt(ratio), z: bounds.minZ + 1.15, rotationY: 0})),
    ...[.25, .75].map((ratio) => ({x: xAt(ratio), z: bounds.maxZ - 1.15, rotationY: Math.PI})),
  ];
  if (width < 16) return perimeter;
  // Deep sequence rooms can carry a restrained inner study row while the
  // four-metre centreline remains a continuous, unobstructed walking route.
  return [
    ...perimeter,
    ...[.22, .5, .78].map((ratio) => ({x: bounds.minX + 6, z: zAt(ratio), rotationY: Math.PI / 2})),
    ...[.22, .5, .78].map((ratio) => ({x: bounds.maxX - 6, z: zAt(ratio), rotationY: -Math.PI / 2})),
  ];
};

const createExhibitLayout = (
  record: MuseumCanonicalExhibit,
  roomId: string,
  candidate: PlacementCandidate,
  compactForumInstallation = false,
): MuseumExhibitLayout => {
  const scene = createScene(record, compactForumInstallation);
  const contract = TIER_CONTRACTS[record.tier];
  const target = {
    x: candidate.x + scene.focalTarget.x * Math.cos(candidate.rotationY) + scene.focalTarget.z * Math.sin(candidate.rotationY),
    z: candidate.z - scene.focalTarget.x * Math.sin(candidate.rotationY) + scene.focalTarget.z * Math.cos(candidate.rotationY),
  };
  // Compact canonical rooms keep the whole visitor circle clear of neighboring
  // bays while remaining inside each installation's interaction radius.
  const viewpointDistance = contract.tier === 'anchor' ? 2.85 : 2.65;
  const camera = {
    x: candidate.x + (scene.focalTarget.x * Math.cos(candidate.rotationY) + (scene.focalTarget.z + viewpointDistance) * Math.sin(candidate.rotationY)),
    z: candidate.z + (-scene.focalTarget.x * Math.sin(candidate.rotationY) + (scene.focalTarget.z + viewpointDistance) * Math.cos(candidate.rotationY)),
  };
  const collider: MuseumCollider = {
    id: `exhibit-${record.id}`,
    center: {x: candidate.x, z: candidate.z},
    size: {width: scene.footprint.width, depth: scene.footprint.depth},
    rotation: candidate.rotationY,
  };
  return {
    id: record.id as MuseumExhibitId,
    zoneId: roomId as MuseumZoneId,
    spatialCellId: roomId,
    position: {x: candidate.x, z: candidate.z},
    rotationY: candidate.rotationY,
    interactionRadius: contract.tier === 'anchor' ? 4 : 3.45,
    bayWidth: contract.bayWidth,
    presentationTier: contract.tier,
    treatment: contract.treatment,
    collider,
    viewpoint: {
      ...camera,
      yaw: candidate.rotationY,
      pitch: Math.atan2(scene.focalTarget.y - EYE_HEIGHT, Math.hypot(target.x - camera.x, target.z - camera.z)),
    },
    scene,
  };
};

const roomBoundsForSequence = (rooms: readonly MuseumCanonicalRoom[]): ReadonlyMap<string, MuseumBounds> => {
  const roomDepth = SEQUENCE_DEPTH / rooms.length;
  return new Map(rooms.map((room, index) => [room.id, {
    minX: -SEQUENCE_WIDTH / 2,
    maxX: SEQUENCE_WIDTH / 2,
    minZ: -SEQUENCE_DEPTH / 2 + index * roomDepth,
    maxZ: -SEQUENCE_DEPTH / 2 + (index + 1) * roomDepth,
  }]));
};

const FORUM_ROOM_ORDER = [
  'core-reality-being', 'core-knowledge', 'core-mind-self',
  'core-logic-language', 'core-aesthetics', 'core-science',
  'core-ethics-portal', 'core-political-portal', 'core-religion',
] as const;

const roomBoundsForForum = (rooms: readonly MuseumCanonicalRoom[]): ReadonlyMap<string, MuseumBounds> => {
  const byId = new Map(rooms.map((room) => [room.id, room]));
  const cellSize = FORUM_SIZE / 3;
  const result = new Map<string, MuseumBounds>();
  FORUM_ROOM_ORDER.forEach((roomId, index) => {
    if (!byId.has(roomId)) throw new Error(`Core Questions Forum is missing canonical room ${roomId}.`);
    const column = index % 3;
    const row = Math.floor(index / 3);
    result.set(roomId, {
      minX: -FORUM_SIZE / 2 + column * cellSize,
      maxX: -FORUM_SIZE / 2 + (column + 1) * cellSize,
      minZ: -FORUM_SIZE / 2 + row * cellSize,
      maxZ: -FORUM_SIZE / 2 + (row + 1) * cellSize,
    });
  });
  return result;
};

const sequenceConnections = (rooms: readonly MuseumCanonicalRoom[], roomBounds: ReadonlyMap<string, MuseumBounds>): MuseumSpatialConnection[] =>
  rooms.slice(0, -1).map((room, index) => {
    const next = rooms[index + 1];
    const boundary = roomBounds.get(room.id)!.maxZ;
    return {
      id: `threshold:${room.id}:${next.id}`,
      fromCellId: room.id,
      toCellId: next.id,
      openingBounds: {minX: -2, maxX: 2, minZ: boundary - .3, maxZ: boundary + .3},
    };
  });

const forumConnections = (roomBounds: ReadonlyMap<string, MuseumBounds>): MuseumSpatialConnection[] => {
  const result: MuseumSpatialConnection[] = [];
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      const index = row * 3 + column;
      const id = FORUM_ROOM_ORDER[index];
      const bounds = roomBounds.get(id)!;
      if (column < 2) {
        const target = FORUM_ROOM_ORDER[index + 1];
        const centerZ = (bounds.minZ + bounds.maxZ) / 2;
        result.push({id: `threshold:${id}:${target}`, fromCellId: id, toCellId: target, openingBounds: {minX: bounds.maxX - .3, maxX: bounds.maxX + .3, minZ: centerZ - 2, maxZ: centerZ + 2}});
      }
      if (row < 2) {
        const target = FORUM_ROOM_ORDER[index + 3];
        const centerX = (bounds.minX + bounds.maxX) / 2;
        result.push({id: `threshold:${id}:${target}`, fromCellId: id, toCellId: target, openingBounds: {minX: centerX - 2, maxX: centerX + 2, minZ: bounds.maxZ - .3, maxZ: bounds.maxZ + .3}});
      }
    }
  }
  return result;
};

const outerWalls = (width: number, depth: number, height: number, prefix: string): MuseumWallDefinition[] => [
  {id: `${prefix}:north-wall`, center: {x: 0, z: -depth / 2}, size: {width, depth: WALL}, rotation: 0, height},
  {id: `${prefix}:south-wall`, center: {x: 0, z: depth / 2}, size: {width, depth: WALL}, rotation: 0, height},
  {id: `${prefix}:west-wall`, center: {x: -width / 2, z: 0}, size: {width: WALL, depth}, rotation: 0, height},
  {id: `${prefix}:east-wall`, center: {x: width / 2, z: 0}, size: {width: WALL, depth}, rotation: 0, height},
];

const sequencePartitionWalls = (rooms: readonly MuseumCanonicalRoom[], roomBounds: ReadonlyMap<string, MuseumBounds>, prefix: string): MuseumWallDefinition[] =>
  rooms.slice(0, -1).flatMap((room, index) => {
    const z = roomBounds.get(room.id)!.maxZ;
    return [
      {id: `${prefix}:partition-${index + 1}-west`, center: {x: -7, z}, size: {width: 10, depth: WALL}, rotation: 0, height: SEQUENCE_CEILING},
      {id: `${prefix}:partition-${index + 1}-east`, center: {x: 7, z}, size: {width: 10, depth: WALL}, rotation: 0, height: SEQUENCE_CEILING},
    ];
  });

const forumPartitionWalls = (prefix: string): MuseumWallDefinition[] => {
  const cellSize = FORUM_SIZE / 3;
  const walls: MuseumWallDefinition[] = [];
  for (const x of [-FORUM_SIZE / 6, FORUM_SIZE / 6]) {
    for (let row = 0; row < 3; row += 1) {
      const minZ = -FORUM_SIZE / 2 + row * cellSize;
      const midZ = minZ + cellSize / 2;
      const segment = (cellSize - 4) / 2;
      walls.push(
        {id: `${prefix}:vertical-${x}-${row}-a`, center: {x, z: minZ + segment / 2}, size: {width: WALL, depth: segment}, rotation: 0, height: FORUM_CEILING},
        {id: `${prefix}:vertical-${x}-${row}-b`, center: {x, z: midZ + 2 + segment / 2}, size: {width: WALL, depth: segment}, rotation: 0, height: FORUM_CEILING},
      );
    }
  }
  for (const z of [-FORUM_SIZE / 6, FORUM_SIZE / 6]) {
    for (let column = 0; column < 3; column += 1) {
      const minX = -FORUM_SIZE / 2 + column * cellSize;
      const midX = minX + cellSize / 2;
      const segment = (cellSize - 4) / 2;
      walls.push(
        {id: `${prefix}:horizontal-${z}-${column}-a`, center: {x: minX + segment / 2, z}, size: {width: segment, depth: WALL}, rotation: 0, height: FORUM_CEILING},
        {id: `${prefix}:horizontal-${z}-${column}-b`, center: {x: midX + 2 + segment / 2, z}, size: {width: segment, depth: WALL}, rotation: 0, height: FORUM_CEILING},
      );
    }
  }
  return walls;
};

const placeRoomExhibits = (
  room: MuseumCanonicalRoom,
  bounds: MuseumBounds,
  exclusions: readonly MuseumBounds[],
  centerFallback = false,
  authoredPlacements?: Readonly<Record<string, PlacementCandidate>>,
): MuseumExhibitLayout[] => {
  const accepted: MuseumExhibitLayout[] = [];
  const candidates = [...wallCandidates(bounds)];
  if (centerFallback) {
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerZ = (bounds.minZ + bounds.maxZ) / 2;
    const freestanding: PlacementCandidate[] = [];
    for (const zOffset of [-2.15, 2.15]) {
      for (const xOffset of [-3, -.75, .75, 3]) {
        freestanding.push({x: centerX + xOffset, z: centerZ + zOffset, rotationY: xOffset > 0 ? -Math.PI / 2 : Math.PI / 2});
      }
    }
    freestanding.push({x: centerX, z: centerZ, rotationY: 0});
    // Try four compact, inward-facing corner bays first; perimeter and inner
    // study positions remain deterministic fallbacks for rooms with portals.
    const halfWidth = (bounds.maxX - bounds.minX) / 2;
    const halfDepth = (bounds.maxZ - bounds.minZ) / 2;
    candidates.unshift(
      {x: centerX - halfWidth * .6, z: centerZ - halfDepth * .7, rotationY: 0},
      {x: centerX + halfWidth * .6, z: centerZ - halfDepth * .7, rotationY: 0},
      {x: centerX - halfWidth * .6, z: centerZ + halfDepth * .7, rotationY: Math.PI},
      {x: centerX + halfWidth * .6, z: centerZ + halfDepth * .7, rotationY: Math.PI},
    );
    candidates.push(...freestanding);
  }
  const resolveCandidate = (
    record: MuseumCanonicalExhibit,
    candidate: PlacementCandidate,
    placed: readonly MuseumExhibitLayout[],
  ): MuseumExhibitLayout | undefined => {
    const scene = createScene(record, centerFallback);
    const footprint = colliderBounds(candidate, candidate.rotationY, scene.footprint.width, scene.footprint.depth);
    const proposed = createExhibitLayout(record, room.id, candidate, centerFallback);
    const inside = footprint.minX >= bounds.minX + .08 && footprint.maxX <= bounds.maxX - .08
      && footprint.minZ >= bounds.minZ + .08 && footprint.maxZ <= bounds.maxZ - .08;
    const blocked = placed.some((layout) => {
      const acceptedFootprint = colliderBounds(
        layout.position,
        layout.rotationY,
        layout.scene.footprint.width,
        layout.scene.footprint.depth,
      );
      return overlaps(footprint, acceptedFootprint, .25)
        || circleIntersectsBounds(proposed.viewpoint, VIEWPOINT_CLEARANCE_RADIUS, acceptedFootprint)
        || circleIntersectsBounds(layout.viewpoint, VIEWPOINT_CLEARANCE_RADIUS, footprint);
    });
    return inside
      && viewpointFitsRoom(proposed.viewpoint, bounds)
      && !exclusions.some((exclusion) => overlaps(footprint, exclusion, .28))
      && !blocked
      ? proposed
      : undefined;
  };

  if (authoredPlacements) {
    for (const record of room.exhibits) {
      const candidate = authoredPlacements[record.id];
      if (!candidate) throw new Error(`Canonical authored gallery has no placement for ${record.id}.`);
      const proposed = resolveCandidate(record, candidate, accepted);
      if (!proposed) throw new Error(`Canonical authored placement for ${record.id} violates its room, route, or neighboring installation.`);
      accepted.push(proposed);
    }
    return accepted;
  }

  if (centerFallback) {
    const search = (
      recordIndex: number,
      remaining: readonly PlacementCandidate[],
      placed: readonly MuseumExhibitLayout[],
    ): readonly MuseumExhibitLayout[] | undefined => {
      if (recordIndex >= room.exhibits.length) return placed;
      const record = room.exhibits[recordIndex];
      for (let index = 0; index < remaining.length; index += 1) {
        const proposed = resolveCandidate(record, remaining[index], placed);
        if (!proposed) continue;
        const resolved = search(
          recordIndex + 1,
          remaining.filter((_, candidateIndex) => candidateIndex !== index),
          [...placed, proposed],
        );
        if (resolved) return resolved;
      }
      return undefined;
    };
    const resolved = search(0, candidates, []);
    if (!resolved) {
      throw new Error(`Canonical room ${room.id} cannot place its exhibits with clear visitor viewpoints.`);
    }
    return [...resolved];
  }

  for (const record of room.exhibits) {
    const candidateIndex = candidates.findIndex((candidate) => Boolean(resolveCandidate(record, candidate, accepted)));
    if (candidateIndex < 0) {
      throw new Error(`Canonical room ${room.id} cannot place exhibit ${record.id} without violating a landing, opening, or adjacent bay.`);
    }
    accepted.push(resolveCandidate(record, candidates.splice(candidateIndex, 1)[0], accepted)!);
  }
  return accepted;
};

const createCanonicalHall = (hall: MuseumCanonicalHall): MuseumCanonicalHallContentDefinition => {
  const isForum = hall.templateId === 'crossroads-4';
  const ceiling = isForum ? FORUM_CEILING : SEQUENCE_CEILING;
  const width = isForum ? FORUM_SIZE : SEQUENCE_WIDTH;
  const depth = isForum ? FORUM_SIZE : SEQUENCE_DEPTH;
  const roomBounds = isForum ? roomBoundsForForum(hall.rooms) : roomBoundsForSequence(hall.rooms);
  const orderedRooms = isForum
    ? FORUM_ROOM_ORDER.map((id) => hall.rooms.find((room) => room.id === id)!)
    : [...hall.rooms];
  const spatialConnections = isForum
    ? forumConnections(roomBounds)
    : sequenceConnections(orderedRooms, roomBounds);
  const node = getMuseumManifestHallNode(hall.id);
  if (!node) throw new Error(`Canonical hall ${hall.id} has no physical manifest node.`);
  const doorwayExclusions = node.doorwaySlots.map(({landingBounds}) => landingBounds);
  const furnishings = hall.id === MUSEUM_VISITOR_MAP_KIOSK.hallId
    ? [
        MUSEUM_VISITOR_MAP_KIOSK,
        ...(hall.id === MEDITERRANEAN_GALLERY_ID ? [MEDITERRANEAN_ORIENTATION_DISPLAY] : []),
      ]
    : [];
  const furnishingExclusions = furnishings.map((item) => colliderBounds(
    item.center,
    item.rotation,
    item.size.width,
    item.size.depth,
  ));
  const exhibits = orderedRooms.flatMap((room) => {
    const bounds = roomBounds.get(room.id)!;
    const connectionExclusions = spatialConnections
      .filter(({fromCellId, toCellId}) => fromCellId === room.id || toCellId === room.id)
      .map(({openingBounds}) => openingBounds);
    return placeRoomExhibits(
      room,
      bounds,
      [...doorwayExclusions, ...connectionExclusions, ...furnishingExclusions],
      isForum,
      hall.id === MEDITERRANEAN_GALLERY_ID
        ? MEDITERRANEAN_AUTHORED_PLACEMENTS
        : hall.id === RENAISSANCE_GALLERY_ID
          ? RENAISSANCE_AUTHORED_PLACEMENTS
          : undefined,
    );
  });
  const supplementalExhibits = hall.id === MEDITERRANEAN_GALLERY_ID
    ? PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS
    : hall.id === RENAISSANCE_GALLERY_ID
      ? RENAISSANCE_SUPPLEMENTAL_EXHIBIT_LAYOUTS
      : [];
  const cells: MuseumSpatialCell[] = orderedRooms.map((room) => ({
    id: room.id,
    kind: 'room',
    title: room.title,
    bounds: roomBounds.get(room.id)!,
    ceilingHeight: ceiling,
    exhibitIds: room.exhibits.map(({id}) => id as MuseumExhibitId),
    lightingGroupId: `lighting:${room.id}`,
  }));
  const tracks: MuseumTrackDefinition[] = cells.map((cell) => ({
    id: `track:${cell.id}`,
    center: {x: (cell.bounds.minX + cell.bounds.maxX) / 2, y: ceiling - .24, z: (cell.bounds.minZ + cell.bounds.maxZ) / 2},
    size: {width: Math.max(2, cell.bounds.maxX - cell.bounds.minX - 1.2), height: .07, depth: .08},
  }));
  const exhibitLights = exhibits.map((layout) => {
    const target = {x: layout.position.x, y: Math.min(1.72, layout.scene.focalTarget.y), z: layout.position.z};
    const track = tracks.find(({id}) => id === `track:${layout.spatialCellId}`)!;
    const mountPosition = {x: Math.max(track.center.x - track.size.width / 2, Math.min(track.center.x + track.size.width / 2, target.x)), y: ceiling - .28, z: track.center.z};
    return {
      id: `light:${layout.id}`,
      exhibitId: layout.id,
      trackId: track.id,
      mountPosition,
      position: {...mountPosition, y: mountPosition.y - .32},
      target,
      intensity: layout.presentationTier === 'anchor' ? 38 : 31,
      distance: 10,
      angle: .4,
      penumbra: .72,
    };
  });
  const wallColliders = [
    ...outerWalls(width, depth, ceiling, hall.id),
    ...(isForum ? forumPartitionWalls(hall.id) : sequencePartitionWalls(orderedRooms, roomBounds, hall.id)),
  ];
  if (hall.id === RENAISSANCE_GALLERY_ID) {
    const acceptedSupplementalBounds: MuseumBounds[] = [];
    for (const layout of supplementalExhibits) {
      const cellBounds = roomBounds.get(layout.spatialCellId);
      if (!cellBounds) throw new Error(`Gallery 02 supplemental exhibit ${layout.id} has no room.`);
      const footprint = colliderBounds(
        layout.position,
        layout.rotationY,
        layout.collider.size.width,
        layout.collider.size.depth,
      );
      const inside = footprint.minX >= cellBounds.minX + .08
        && footprint.maxX <= cellBounds.maxX - .08
        && footprint.minZ >= cellBounds.minZ + .08
        && footprint.maxZ <= cellBounds.maxZ - .08;
      const primaryBounds = exhibits
        .filter(({spatialCellId}) => spatialCellId === layout.spatialCellId)
        .map((item) => colliderBounds(item.position, item.rotationY, item.collider.size.width, item.collider.size.depth));
      if (
        !inside
        || !viewpointFitsRoom(layout.viewpoint, cellBounds)
        || doorwayExclusions.some((exclusion) => overlaps(footprint, exclusion, .28))
        || primaryBounds.some((bounds) => overlaps(footprint, bounds, .32))
        || acceptedSupplementalBounds.some((bounds) => overlaps(footprint, bounds, .32))
      ) throw new Error(`Gallery 02 supplemental placement ${layout.id} violates its room, doorway, or neighboring installation.`);
      acceptedSupplementalBounds.push(footprint);
    }
  }
  const obstacleColliders = [
    ...exhibits.map(({collider}) => collider),
    ...supplementalExhibits.map(({collider}) => collider),
    ...furnishings,
  ];
  const guidedWalkLegs = exhibits.slice(0, -1).map((layout, index) => {
    const target = exhibits[index + 1];
    const waypoints = layout.spatialCellId === target.spatialCellId
      ? guidedWaypointsWithinRoom(
          layout.viewpoint,
          target.viewpoint,
          roomBounds.get(layout.spatialCellId)!,
          [...wallColliders, ...obstacleColliders],
        )
      : [
          layout.viewpoint,
          {x: 0, z: layout.viewpoint.z},
          {x: 0, z: target.viewpoint.z},
          target.viewpoint,
        ];
    return {fromExhibitId: layout.id, toExhibitId: target.id, waypoints};
  });
  const defaultSpawn = node.doorwaySlots.find(({id}) => id === 'N0')?.arrivalPose ?? node.doorwaySlots[0].arrivalPose;
  const spawn = hall.id === MEDITERRANEAN_GALLERY_ID
    ? {...defaultSpawn, yaw: 2.65, pitch: -.015}
    : defaultSpawn;
  const standardSigns = [
    {
      id: `${hall.id}:entrance-sign`,
      kind: 'entrance' as const,
      title: hall.title,
      kicker: isForum ? 'Core Questions Forum' : 'Permanent gallery',
      subtitle: hall.period,
      position: {x: -Math.min(7, width / 3), y: 2.15, z: -depth / 2 + .22},
      rotationY: 0,
      width: Math.min(4.8, width * .38),
      height: 1.08,
    },
    ...orderedRooms.flatMap((room) => {
      const bounds = roomBounds.get(room.id)!;
      const roomSign = {
        id: `${room.id}:room-sign`,
        kind: 'zone' as const,
        title: room.title,
        kicker: 'Room',
        subtitle: 'Questions, objects, and arguments in historical context',
        position: {x: bounds.maxX - .22, y: 2.2, z: (bounds.minZ + bounds.maxZ) / 2},
        rotationY: -Math.PI / 2,
        width: Math.min(3.6, Math.max(2.4, bounds.maxZ - bounds.minZ - 1)),
        height: .88,
      };
      const comparativeLensSigns = (room.comparativeLenses ?? []).map((lens, index) => ({
        id: `${room.id}:lens:${lens.id}`,
        kind: 'wayfinding' as const,
        title: lens.displayName,
        kicker: 'Comparative lens · route outward',
        subtitle: `${lens.culturalSetting} → ${MUSEUM_PLANNED_HALL_TITLES[lens.primaryHallId]}`,
        position: {
          x: bounds.minX + .22,
          y: 1.25 + index * 1.18,
          z: (bounds.minZ + bounds.maxZ) / 2,
        },
        rotationY: Math.PI / 2,
        width: Math.min(4.15, Math.max(2.8, bounds.maxZ - bounds.minZ - .8)),
        height: .76,
      }));
      return [roomSign, ...comparativeLensSigns];
    }),
  ];
  const signs = hall.id === MEDITERRANEAN_GALLERY_ID
    ? [
        {
          id: `${hall.id}:entrance-sign`,
          kind: 'entrance' as const,
          title: 'PHILOSOPHY ATLAS MUSEUM',
          kicker: '',
          subtitle: 'Gallery 01 · Mediterranean Beginnings & Classical Athens',
          position: {x: 0, y: 4.35, z: -18.2},
          rotationY: Math.PI,
          width: 3.4,
          height: .7,
        },
        ...orderedRooms
          .filter(({id}) => id !== 'med-sophists-socratic')
          .map((room, index) => {
            const copy = MEDITERRANEAN_ROOM_SIGN_COPY[room.id as keyof typeof MEDITERRANEAN_ROOM_SIGN_COPY];
            if (!copy) throw new Error(`Gallery 01 has no visitor-facing room copy for ${room.id}.`);
            const bounds = roomBounds.get(room.id)!;
            return {
              id: `${room.id}:room-sign`,
              kind: 'zone' as const,
              title: copy.title,
              kicker: copy.kicker,
              subtitle: copy.subtitle,
              position: {
                x: index === 0 ? 6 : -6,
                y: 2.25,
                z: index === 0 ? bounds.maxZ + .22 : bounds.minZ - .22,
              },
              rotationY: index === 0 ? 0 : Math.PI,
              width: 3.9,
              height: .88,
            };
          }),
      ]
    : hall.id === RENAISSANCE_GALLERY_ID
      ? orderedRooms.map((room) => {
          const copy = RENAISSANCE_ROOM_SIGN_COPY[room.id as keyof typeof RENAISSANCE_ROOM_SIGN_COPY];
          if (!copy) throw new Error(`Gallery 02 has no visitor-facing orientation copy for ${room.id}.`);
          const bounds = roomBounds.get(room.id)!;
          return {
            id: `${room.id}:room-sign`,
            kind: room.id === 'early-statecraft-republic' ? 'entrance' as const : 'zone' as const,
            title: copy.title,
            kicker: copy.kicker,
            subtitle: copy.subtitle,
            position: {x: 6.5, y: 2.3, z: bounds.maxZ - .22},
            rotationY: Math.PI,
            width: room.id === 'early-statecraft-republic' ? 5.2 : 4.8,
            height: room.id === 'early-statecraft-republic' ? 1.22 : 1.02,
          };
        })
      : standardSigns;
  const guidedOrder = orderedRooms.flatMap((room) => room.exhibits.map(({id}) => id as MuseumExhibitId));
  const entryRoomIdByEntrance = new Map<string, string>();
  const entryExhibitIdsByEntrance = Object.fromEntries(node.doorwaySlots.map((slot) => {
    const nearestRoom = cells.reduce((nearest, cell) => {
      const center = {x: (cell.bounds.minX + cell.bounds.maxX) / 2, z: (cell.bounds.minZ + cell.bounds.maxZ) / 2};
      const distance = Math.hypot(center.x - slot.position.x, center.z - slot.position.z);
      return !nearest || distance < nearest.distance ? {cell, distance} : nearest;
    }, undefined as {cell: MuseumSpatialCell; distance: number} | undefined)!.cell;
    entryRoomIdByEntrance.set(slot.id, nearestRoom.id);
    return [slot.id, nearestRoom.exhibitIds.slice(0, 2)] as const;
  }));
  const entrySceneAssetIdsByEntrance = Object.fromEntries(Object.entries(entryExhibitIdsByEntrance).map(([entranceId, entryIds]) => {
    const ids = new Set(entryIds);
    const roomId = entryRoomIdByEntrance.get(entranceId);
    return [entranceId, [...new Set([
      ...exhibits
        .filter(({id}) => ids.has(id))
        .flatMap(({scene}) => scene.mediaMounts.map(({assetId}) => assetId)),
      ...supplementalExhibits
        .filter(({spatialCellId}) => spatialCellId === roomId)
        .map(({assetId}) => assetId),
    ])]];
  }));
  const allSceneAssetIds = [...new Set([
    ...exhibits.flatMap(({scene}) => scene.mediaMounts.map(({assetId}) => assetId)),
    ...supplementalExhibits.map(({assetId}) => assetId),
  ])];
  const entrySceneAssetIds = [...new Set(Object.values(entrySceneAssetIdsByEntrance).flat())];
  return {
    id: hall.id,
    fallbackLabel: hall.title,
    prefetch: {entryExhibitIdsByEntrance, entrySceneAssetIdsByEntrance, entrySceneAssetIds, sceneAssetIds: allSceneAssetIds},
    layout: {
      id: hall.id,
      title: hall.title,
      eyeHeight: EYE_HEIGHT,
      playerRadius: .34,
      bounds: {minX: -width / 2, maxX: width / 2, minZ: -depth / 2, maxZ: depth / 2},
      floorArea: width * depth,
      cameraFov: 66,
      cameraFar: 260,
      spawn,
      spawnFocalPoint: hall.id === MEDITERRANEAN_GALLERY_ID
        ? {...MUSEUM_VISITOR_MAP_KIOSK.center}
        : hall.id === RENAISSANCE_GALLERY_ID
          ? {...RENAISSANCE_EXHIBIT_CURATION.machiavelli.authored}
          : {x: 0, z: 0},
      reset: spawn,
      spatialCells: cells,
      spatialConnections,
      entryViews: cells.map((cell) => ({
        spatialCellId: cell.id,
        // Gallery 01 is read as a chronological promenade. Stage its directory
        // views just inside each threshold so the visitor sees the room unfold
        // in the same direction as the authored route. Other halls retain the
        // established room-centre viewpoint.
        pose: hall.id === MEDITERRANEAN_GALLERY_ID || hall.id === RENAISSANCE_GALLERY_ID
          ? {x: 0, z: cell.bounds.minZ + .8, yaw: Math.PI, pitch: -.01}
          : {x: Math.max(cell.bounds.minX + 2.8, Math.min(cell.bounds.maxX - 2.8, 0)), z: (cell.bounds.minZ + cell.bounds.maxZ) / 2, yaw: Math.PI, pitch: 0},
        expectedVisibleExhibitIds: cell.exhibitIds,
      })),
      wallColliders,
      furnishings,
      obstacleColliders,
      exhibits,
      ...(supplementalExhibits.length ? {supplementalExhibits} : {}),
      primaryCirculation: {
        id: `${hall.id}:primary-circulation`,
        points: isForum
          ? [{x: 0, z: -12}, {x: 0, z: -3.2}, {x: 0, z: 3.2}, {x: 0, z: 12}]
          : [{x: 0, z: -26}, {x: 0, z: 0}, {x: 0, z: 26}],
        clearanceRadius: 1.25,
      },
      guidedOrder,
      guidedWalkLegs,
      lighting: {
        ambientIntensity: isForum ? .5 : .46,
        hemisphereIntensity: isForum ? .68 : .62,
        directionalIntensity: .72,
        tracks,
        exhibitLights,
      },
      signs,
    },
  };
};

/** One data-driven authoring pipeline for the six permanent, canonical halls. */
export const CANONICAL_MUSEUM_HALL_DEFINITIONS: readonly MuseumCanonicalHallContentDefinition[] =
  MUSEUM_CANONICAL_PROGRAM.map(createCanonicalHall);
