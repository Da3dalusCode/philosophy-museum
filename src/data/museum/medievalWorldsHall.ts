import {
  getMuseumHallCatalog,
  type MedievalWorldsExhibitId,
} from '../museumCatalog';
import type {
  MuseumCollider,
  MuseumCirculationPath,
  MuseumExhibitLayout,
  MuseumExhibitLightDefinition,
  MuseumFurnishingDefinition,
  MuseumGuidedWalkLeg,
  MuseumHallDefinition,
  MuseumHallLayout,
  MuseumInstallationSceneDefinition,
  MuseumMediaMountDefinition,
  MuseumMediaMountKind,
  MuseumPlaqueDefinition,
  MuseumPoint,
  MuseumPoint3,
  MuseumRoomEntryView,
  MuseumSceneVolume,
  MuseumSceneVolumeRole,
  MuseumSize3,
  MuseumSpatialCell,
  MuseumSpatialConnection,
  MuseumTrackDefinition,
  MuseumWallDefinition,
} from './museumWorldTypes';

const volume = (
  id: string,
  role: MuseumSceneVolumeRole,
  center: MuseumPoint3,
  size: MuseumSize3,
): MuseumSceneVolume => ({id, role, center, size});

const media = (
  id: string,
  assetId: MuseumMediaMountDefinition['assetId'],
  kind: MuseumMediaMountKind,
  position: readonly [number, number, number],
  rotation: readonly [number, number, number],
  width: number,
  height: number,
  anchor: MuseumSceneVolume,
): MuseumMediaMountDefinition => {
  const contactY = anchor.center.y + anchor.size.height / 2;
  const footHalfHeight = kind === 'lectern' ? .04 : .035;
  const supportHeight = kind === 'wall-frame' ? 0 : position[1] - height / 2 - footHalfHeight - contactY;
  const supportTop = position[1] - height / 2;
  const supportWidth = kind === 'lectern' ? Math.max(.56, width * .72) : width * .64 + .055;
  return {
    id,
    assetId,
    kind,
    position,
    rotation,
    width,
    height,
    frameDepth: .12,
    supportHeight,
    anchorId: anchor.id,
    bounds: volume(`${id}-bounds`, 'media', {x: position[0], y: position[1], z: position[2]}, {
      width: width + .2,
      height: height + .18,
      depth: kind === 'lectern' ? .5 : .22,
    }),
    supportBounds: kind === 'wall-frame'
      ? volume(`${id}-support`, 'media', {x: position[0], y: position[1], z: position[2] - .17}, {width: supportWidth, height: height * .72, depth: .28})
      : volume(`${id}-support`, 'media', {x: position[0], y: (contactY + supportTop) / 2, z: position[2] + .02}, {width: supportWidth, height: supportTop - contactY, depth: .42}),
  };
};

const plaque = (id: string, x = -1.08): MuseumPlaqueDefinition => ({
  id,
  position: [x, .45, 1.02],
  rotation: [-.2, 0, 0],
  width: 1.02,
  height: .32,
  supportHeight: .25,
  anchorId: 'gallery-floor',
  bounds: volume(`${id}-bounds`, 'plaque', {x, y: .45, z: 1.02}, {width: 1.18, height: .46, depth: .28}),
  supportBounds: volume(`${id}-support`, 'plaque', {x, y: .125, z: 1.04}, {width: .62, height: .25, depth: .4}),
});

type SceneConfig = {
  principal: {assetId: MuseumMediaMountDefinition['assetId']; width: number; height: number};
  support: {assetId: MuseumMediaMountDefinition['assetId']; width: number; height: number; kind?: 'lectern' | 'wall-frame'};
};

const sceneConfig: Record<MedievalWorldsExhibitId, SceneConfig> = {
  augustine: {principal: {assetId: 'augustine-lateran', width: .91, height: 1.55}, support: {assetId: 'augustine-city-of-god', width: .82, height: 1.12}},
  boethius: {principal: {assetId: 'boethius-consolation-teaching', width: 1.44, height: 1.1}, support: {assetId: 'boethius-arithmetic', width: .7, height: .99}},
  avicenna: {principal: {assetId: 'avicenna-canon', width: .9, height: 1.4}, support: {assetId: 'avicenna-thevet-portrait', width: .75, height: .91}},
  'al-ghazali': {principal: {assetId: 'al-ghazali-asas-al-qiyas', width: .86, height: 1.43}, support: {assetId: 'al-ghazali-faysal', width: 1.1, height: .76}},
  averroes: {principal: {assetId: 'averroes-de-anima', width: 1.12, height: 1.3}, support: {assetId: 'averroes-lithograph', width: .72, height: .96}},
  maimonides: {principal: {assetId: 'maimonides-mishnah-autograph', width: 1, height: 1.35}, support: {assetId: 'maimonides-mishneh-torah', width: 1.15, height: .71}},
  aquinas: {principal: {assetId: 'aquinas-summa', width: 1, height: 1.33}, support: {assetId: 'aquinas-triumph', width: .58, height: 1.52, kind: 'wall-frame'}},
  ockham: {principal: {assetId: 'ockham-logica-sketch', width: 1.1, height: 1.3}, support: {assetId: 'ockham-sentences', width: .7, height: 1.05}},
};

const sceneDefinitions = Object.fromEntries(Object.entries(sceneConfig).map(([id, config]) => {
  const base = volume(`${id}-plinth`, 'base', {x: 0, y: .13, z: .02}, {width: 3.25, height: .26, depth: 1.5});
  const backing = volume(`${id}-backing`, 'base', {x: 0, y: 1.86, z: -.76}, {width: 3.45, height: 3.38, depth: .18});
  const concept = volume(`${id}-concept`, 'concept-object', {x: 0, y: .57, z: .39}, {width: .82, height: .62, depth: .48});
  const supportKind = config.support.kind ?? 'lectern';
  const supportPosition = supportKind === 'wall-frame'
    ? [1.02, 2.02, -.63] as const
    : [1.14, 1.02, .14] as const;
  const supportRotation = supportKind === 'wall-frame'
    ? [0, 0, 0] as const
    : [-.36, 0, 0] as const;
  const scene: MuseumInstallationSceneDefinition = {
    footprint: {width: 3.65, height: 3.72, depth: 2.7},
    mediaMounts: [
      media(`${id}-principal`, config.principal.assetId, 'wall-frame', [-.72, 2.08, -.63], [0, 0, 0], config.principal.width, config.principal.height, backing),
      media(`${id}-support`, config.support.assetId, supportKind, supportPosition, supportRotation, config.support.width, config.support.height, supportKind === 'wall-frame' ? backing : base),
    ],
    plaque: plaque(`${id}-plaque`),
    objectBounds: [base, backing, concept],
    focalTarget: {x: -.12, y: 1.7, z: -.13},
    interactionBounds: volume(`${id}-interaction`, 'principal-object', {x: 0, y: 1.58, z: 0}, {width: 3.56, height: 3.16, depth: 2.58}),
  };
  return [id, scene];
})) as Record<MedievalWorldsExhibitId, MuseumInstallationSceneDefinition>;

const spatialCells: readonly MuseumSpatialCell[] = [
  {id: 'ancient-transition-passage', kind: 'passage', title: 'From Late Antiquity', bounds: {minX: -2, maxX: 2, minZ: -4, maxZ: .6}, ceilingHeight: 5.2, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'late-antique-inheritance-room', kind: 'room', title: 'Late Antique Inheritance', bounds: {minX: -10, maxX: 10, minZ: -18, maxZ: -4}, ceilingHeight: 5.8, exhibitIds: ['augustine', 'boethius'], lightingGroupId: 'inheritance'},
  {id: 'translation-threshold', kind: 'passage', title: 'Translation and Manuscript Threshold', bounds: {minX: -3, maxX: 3, minZ: -21, maxZ: -18}, ceilingHeight: 5.1, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'arabic-islamic-room', kind: 'room', title: 'Arabic and Islamic Philosophical Worlds', bounds: {minX: -12, maxX: 12, minZ: -35, maxZ: -21}, ceilingHeight: 6, exhibitIds: ['avicenna', 'al-ghazali', 'averroes'], lightingGroupId: 'arabic'},
  {id: 'scholastic-threshold', kind: 'passage', title: 'Hebrew and Latin Threshold', bounds: {minX: -3, maxX: 3, minZ: -38, maxZ: -35}, ceilingHeight: 5.1, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'jewish-latin-scholastic-room', kind: 'room', title: 'Jewish and Latin Scholastic Conversations', bounds: {minX: -12, maxX: 12, minZ: -52, maxZ: -38}, ceilingHeight: 6, exhibitIds: ['maimonides', 'aquinas', 'ockham'], lightingGroupId: 'scholastic'},
];

const spatialConnections: readonly MuseumSpatialConnection[] = [
  {id: 'transition-to-inheritance', fromCellId: 'ancient-transition-passage', toCellId: 'late-antique-inheritance-room', openingBounds: {minX: -2, maxX: 2, minZ: -4.2, maxZ: -3.8}},
  {id: 'inheritance-to-translation', fromCellId: 'late-antique-inheritance-room', toCellId: 'translation-threshold', openingBounds: {minX: -3, maxX: 3, minZ: -18.2, maxZ: -17.8}},
  {id: 'translation-to-arabic', fromCellId: 'translation-threshold', toCellId: 'arabic-islamic-room', openingBounds: {minX: -3, maxX: 3, minZ: -21.2, maxZ: -20.8}},
  {id: 'arabic-to-scholastic-threshold', fromCellId: 'arabic-islamic-room', toCellId: 'scholastic-threshold', openingBounds: {minX: -3, maxX: 3, minZ: -35.2, maxZ: -34.8}},
  {id: 'threshold-to-scholastic', fromCellId: 'scholastic-threshold', toCellId: 'jewish-latin-scholastic-room', openingBounds: {minX: -3, maxX: 3, minZ: -38.2, maxZ: -37.8}},
];

const wall = (id: string, center: MuseumPoint, width: number, depth: number, height: number): MuseumWallDefinition => ({id, center, size: {width, depth}, rotation: 0, height});
const walls: readonly MuseumWallDefinition[] = [
  wall('transition-west', {x: -2, z: -1.7}, .36, 4.6, 5.2),
  wall('transition-east', {x: 2, z: -1.7}, .36, 4.6, 5.2),
  wall('inheritance-entry-west', {x: -6, z: -4}, 8, .36, 5.8),
  wall('inheritance-entry-east', {x: 6, z: -4}, 8, .36, 5.8),
  wall('inheritance-west', {x: -10, z: -11}, .36, 14.36, 5.8),
  wall('inheritance-east', {x: 10, z: -11}, .36, 14.36, 5.8),
  wall('inheritance-exit-west', {x: -6.5, z: -18}, 7, .36, 5.8),
  wall('inheritance-exit-east', {x: 6.5, z: -18}, 7, .36, 5.8),
  wall('translation-west', {x: -3, z: -19.5}, .36, 3.36, 5.1),
  wall('translation-east', {x: 3, z: -19.5}, .36, 3.36, 5.1),
  wall('arabic-entry-west', {x: -7.5, z: -21}, 9, .36, 6),
  wall('arabic-entry-east', {x: 7.5, z: -21}, 9, .36, 6),
  wall('arabic-west', {x: -12, z: -28}, .36, 14.36, 6),
  wall('arabic-east', {x: 12, z: -28}, .36, 14.36, 6),
  wall('arabic-exit-west', {x: -7.5, z: -35}, 9, .36, 6),
  wall('arabic-exit-east', {x: 7.5, z: -35}, 9, .36, 6),
  wall('scholastic-threshold-west', {x: -3, z: -36.5}, .36, 3.36, 5.1),
  wall('scholastic-threshold-east', {x: 3, z: -36.5}, .36, 3.36, 5.1),
  wall('scholastic-entry-west', {x: -7.5, z: -38}, 9, .36, 6),
  wall('scholastic-entry-east', {x: 7.5, z: -38}, 9, .36, 6),
  wall('scholastic-west', {x: -12, z: -45}, .36, 14.36, 6),
  wall('scholastic-east', {x: 12, z: -45}, .36, 14.36, 6),
  wall('scholastic-end', {x: 0, z: -52}, 24.36, .36, 6),
];

const furnishings: readonly MuseumFurnishingDefinition[] = [
  {id: 'inheritance-bench', kind: 'bench', center: {x: -8.3, z: -6.1}, size: {width: 2.5, depth: .72}, rotation: Math.PI / 2, height: .5},
  {id: 'translation-table', kind: 'translation-table', center: {x: -9.8, z: -40.2}, size: {width: 2.8, depth: .85}, rotation: 0, height: 1.05},
];

const tracks: readonly MuseumTrackDefinition[] = [
  {id: 'inheritance-back-track', center: {x: 0, y: 5.45, z: -13.2}, size: {width: 15, height: .08, depth: .08}},
  {id: 'arabic-back-track', center: {x: 0, y: 5.65, z: -30.2}, size: {width: 18, height: .08, depth: .08}},
  {id: 'arabic-east-track', center: {x: 8.4, y: 5.65, z: -27.2}, size: {width: .08, height: .08, depth: 9}},
  {id: 'scholastic-back-track', center: {x: 0, y: 5.65, z: -47.2}, size: {width: 18, height: .08, depth: .08}},
  {id: 'scholastic-east-track', center: {x: 8.4, y: 5.65, z: -44.2}, size: {width: .08, height: .08, depth: 9}},
];

const hall = getMuseumHallCatalog('medieval-worlds');
type Placement = Omit<MuseumExhibitLayout, 'id' | 'zoneId' | 'collider' | 'scene'>;
const EYE_HEIGHT = 1.68;

const installationPointToHall = (position: MuseumPoint, rotation: number, point: MuseumPoint): MuseumPoint => ({
  x: position.x + point.x * Math.cos(rotation) + point.z * Math.sin(rotation),
  z: position.z - point.x * Math.sin(rotation) + point.z * Math.cos(rotation),
});
const installationViewpoint = (id: MedievalWorldsExhibitId, position: MuseumPoint, rotation: number, distance = 4.2) => {
  const focal = sceneDefinitions[id].focalTarget;
  const target = installationPointToHall(position, rotation, focal);
  const camera = installationPointToHall(position, rotation, {x: focal.x, z: focal.z + distance});
  return {...camera, yaw: rotation, pitch: Math.atan2(focal.y - EYE_HEIGHT, Math.hypot(target.x - camera.x, target.z - camera.z))};
};

const positions: Record<MedievalWorldsExhibitId, MuseumPoint> = {
  augustine: {x: -4.5, z: -16.3},
  boethius: {x: 4.5, z: -16.3},
  avicenna: {x: 10.2, z: -25.8},
  'al-ghazali': {x: -4, z: -32.8},
  averroes: {x: 4.5, z: -33.3},
  maimonides: {x: 10.2, z: -42.8},
  aquinas: {x: -4, z: -49.8},
  ockham: {x: 4.5, z: -50.3},
};
const rotations: Record<MedievalWorldsExhibitId, number> = {
  augustine: 0, boethius: 0, avicenna: -Math.PI / 2, 'al-ghazali': 0,
  averroes: 0, maimonides: -Math.PI / 2, aquinas: 0, ockham: 0,
};
const cellIds: Record<MedievalWorldsExhibitId, string> = {
  augustine: 'late-antique-inheritance-room', boethius: 'late-antique-inheritance-room',
  avicenna: 'arabic-islamic-room', 'al-ghazali': 'arabic-islamic-room', averroes: 'arabic-islamic-room',
  maimonides: 'jewish-latin-scholastic-room', aquinas: 'jewish-latin-scholastic-room', ockham: 'jewish-latin-scholastic-room',
};
const placement = Object.fromEntries(hall.exhibits.map(({id}) => {
  const position = positions[id];
  const rotationY = rotations[id];
  const authored: Placement = {spatialCellId: cellIds[id], position, rotationY, interactionRadius: 3.65, viewpoint: installationViewpoint(id, position, rotationY)};
  return [id, authored];
})) as Record<MedievalWorldsExhibitId, Placement>;

const colliderFromScene = (id: MedievalWorldsExhibitId, position: MuseumPoint, rotation: number, scene: MuseumInstallationSceneDefinition): MuseumCollider => ({
  id: `exhibit-${id}`,
  center: position,
  size: {width: scene.footprint.width, depth: scene.footprint.depth},
  rotation,
});
const exhibitLayouts = hall.exhibits.map((exhibit) => {
  const authored = placement[exhibit.id];
  const scene = sceneDefinitions[exhibit.id];
  return {...authored, id: exhibit.id, zoneId: exhibit.zoneId, scene, collider: colliderFromScene(exhibit.id, authored.position, authored.rotationY, scene)};
});

const localPointToHall = (layout: MuseumExhibitLayout, point: MuseumPoint3): MuseumPoint3 => {
  const cos = Math.cos(layout.rotationY);
  const sin = Math.sin(layout.rotationY);
  return {x: layout.position.x + point.x * cos + point.z * sin, y: point.y, z: layout.position.z - point.x * sin + point.z * cos};
};
const exhibitTrackIds: Record<MedievalWorldsExhibitId, string> = {
  augustine: 'inheritance-back-track', boethius: 'inheritance-back-track',
  avicenna: 'arabic-east-track', 'al-ghazali': 'arabic-back-track', averroes: 'arabic-back-track',
  maimonides: 'scholastic-east-track', aquinas: 'scholastic-back-track', ockham: 'scholastic-back-track',
};
const exhibitLights: readonly MuseumExhibitLightDefinition[] = exhibitLayouts.map((layout) => {
  const target = localPointToHall(layout, layout.scene.focalTarget);
  const trackId = exhibitTrackIds[layout.id as MedievalWorldsExhibitId];
  const track = tracks.find(({id}) => id === trackId)!;
  const alongX = track.size.width > track.size.depth;
  const clamp = (value: number, center: number, length: number) => Math.min(center + length / 2, Math.max(center - length / 2, value));
  const mountPosition = {x: alongX ? clamp(target.x, track.center.x, track.size.width) : track.center.x, y: track.center.y - .05, z: alongX ? track.center.z : clamp(target.z, track.center.z, track.size.depth)};
  const beam = {x: target.x - mountPosition.x, y: target.y - mountPosition.y, z: target.z - mountPosition.z};
  const length = Math.hypot(beam.x, beam.y, beam.z) || 1;
  return {id: `light-${layout.id}`, exhibitId: layout.id, trackId, mountPosition, position: {x: mountPosition.x + beam.x / length * .35, y: mountPosition.y + beam.y / length * .35, z: mountPosition.z + beam.z / length * .35}, target, intensity: 34, distance: 12, angle: .36, penumbra: .74};
});

const entryViews: readonly MuseumRoomEntryView[] = [
  {spatialCellId: 'late-antique-inheritance-room', pose: {x: 0, z: -5.1, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['augustine', 'boethius']},
  {spatialCellId: 'arabic-islamic-room', pose: {x: 0, z: -22.1, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['al-ghazali', 'averroes']},
  {spatialCellId: 'jewish-latin-scholastic-room', pose: {x: 0, z: -39.1, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['aquinas', 'ockham']},
];
const guidedWalkLegs: readonly MuseumGuidedWalkLeg[] = [
  {fromExhibitId: 'augustine', toExhibitId: 'boethius', waypoints: []},
  {fromExhibitId: 'boethius', toExhibitId: 'avicenna', waypoints: [{x: 2, z: -13.2}, {x: 1.8, z: -17.7}, {x: 1.8, z: -21.7}]},
  {fromExhibitId: 'avicenna', toExhibitId: 'al-ghazali', waypoints: []},
  {fromExhibitId: 'al-ghazali', toExhibitId: 'averroes', waypoints: []},
  {fromExhibitId: 'averroes', toExhibitId: 'maimonides', waypoints: [{x: 2, z: -30.2}, {x: 1.8, z: -34.7}, {x: 1.8, z: -38.7}]},
  {fromExhibitId: 'maimonides', toExhibitId: 'aquinas', waypoints: []},
  {fromExhibitId: 'aquinas', toExhibitId: 'ockham', waypoints: []},
];
const primaryCirculation: MuseumCirculationPath = {
  id: 'medieval-gallery-spine', clearanceRadius: .62,
  points: [{x: 0, z: -.8}, {x: 0, z: -11}, {x: 0, z: -19.5}, {x: 0, z: -28}, {x: 0, z: -36.5}, {x: 0, z: -45}],
};

export const MEDIEVAL_WORLDS_HALL_LAYOUT: MuseumHallLayout = {
  id: hall.id,
  title: hall.title,
  eyeHeight: EYE_HEIGHT,
  playerRadius: .38,
  bounds: {minX: -12, maxX: 12, minZ: -52, maxZ: .6},
  floorArea: 1006.4,
  cameraFov: 68,
  cameraFar: 110,
  spawn: {x: 0, z: -2.2, yaw: 0, pitch: -.02},
  spawnFocalPoint: {x: 0, z: -16},
  reset: {x: 0, z: -2.2, yaw: 0, pitch: -.02},
  spatialCells,
  spatialConnections,
  entryViews,
  wallColliders: walls,
  furnishings,
  obstacleColliders: [...exhibitLayouts.map(({collider}) => collider), ...furnishings],
  exhibits: exhibitLayouts,
  primaryCirculation,
  guidedOrder: hall.guidedOrder,
  guidedWalkLegs,
  lighting: {ambientIntensity: .3, hemisphereIntensity: .9, directionalIntensity: .78, tracks, exhibitLights},
};

export const MEDIEVAL_WORLDS_HALL_DEFINITION: MuseumHallDefinition = {
  id: hall.id,
  worldTransform: {x: 18, z: -28.5, yaw: -Math.PI / 2},
  layout: MEDIEVAL_WORLDS_HALL_LAYOUT,
  entrances: [{
    id: 'ancient-threshold',
    position: {x: 0, z: 0},
    inwardNormal: {x: 0, z: -1},
    arrivalPose: {x: 0, z: -.8, yaw: 0, pitch: 0},
    transitionBounds: {center: {x: 0, z: 0}, size: {width: 4, depth: 1.2}},
  }],
  connections: [{id: 'medieval-worlds-to-ancient', targetHallId: 'ancient-greek', localEntranceId: 'ancient-threshold', targetEntranceId: 'medieval-threshold'}],
  prefetch: {
    entrySceneAssetIds: [
      'augustine-lateran',
      'augustine-city-of-god',
      'boethius-consolation-teaching',
      'boethius-arithmetic',
    ],
    sceneAssetIds: hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]),
    adjacentHallIds: ['ancient-greek'],
  },
  fallbackLabel: 'Medieval Worlds gallery directory',
};
