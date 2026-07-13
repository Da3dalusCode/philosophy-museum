import {
  getMuseumHallCatalog,
  type RenaissanceReasonRevolutionExhibitId,
} from '../museumCatalog';
import {
  createContemporaryExhibitLayouts,
  createContemporaryExhibitLights,
  createContemporaryScenes,
  museumWall,
  type ContemporaryPlacement,
  type ContemporarySceneConfig,
} from './contemporaryHallAuthoring';
import type {
  MuseumCirculationPath,
  MuseumFurnishingDefinition,
  MuseumGuidedWalkLeg,
  MuseumHallDefinition,
  MuseumHallLayout,
  MuseumRoomEntryView,
  MuseumSignDefinition,
  MuseumSpatialCell,
  MuseumSpatialConnection,
  MuseumTrackDefinition,
  MuseumWallDefinition,
} from './museumWorldTypes';

const hall = getMuseumHallCatalog('renaissance-reason-revolution');
const EYE_HEIGHT = 1.68;

const sceneConfig: Record<RenaissanceReasonRevolutionExhibitId, ContemporarySceneConfig> = {
  machiavelli: {
    principal: {assetId: 'machiavelli-santi-di-tito', width: 1.04, height: 1.34},
    support: {assetId: 'machiavelli-prince-1532', width: .76, height: 1.18},
  },
  descartes: {
    principal: {assetId: 'descartes-hals-portrait', width: .94, height: 1.42},
    support: {assetId: 'descartes-discourse-1637', width: .78, height: 1.06},
  },
  hobbes: {
    principal: {assetId: 'hobbes-wright-portrait', width: 1.02, height: 1.38},
    support: {assetId: 'hobbes-leviathan-1651', width: .76, height: 1.22},
  },
  locke: {
    principal: {assetId: 'locke-kneller-portrait', width: 1.02, height: 1.38},
    support: {assetId: 'locke-two-treatises-1690', width: .78, height: 1.1},
  },
  spinoza: {
    principal: {assetId: 'spinoza-hab-portrait', width: 1.02, height: 1.32},
    support: {assetId: 'spinoza-ethics-1677', width: .76, height: 1.13},
  },
  hume: {
    principal: {assetId: 'hume-ramsay-portrait', width: 1.03, height: 1.36},
    support: {assetId: 'hume-treatise-1739', width: .72, height: 1.18},
  },
  rousseau: {
    principal: {assetId: 'rousseau-la-tour-portrait', width: .98, height: 1.38},
    support: {assetId: 'rousseau-social-contract-1762', width: .74, height: 1.16},
  },
  kant: {
    principal: {assetId: 'kant-raab-portrait', width: .98, height: 1.38},
    support: {assetId: 'kant-critique-1781', width: 1.18, height: .94, kind: 'wall-frame'},
  },
};

const scenes = createContemporaryScenes(sceneConfig);

const placements: Record<RenaissanceReasonRevolutionExhibitId, ContemporaryPlacement> = {
  machiavelli: {zoneId: 'power-and-method', spatialCellId: 'power-method-room', position: {x: -8.35, z: -12.7}, rotationY: Math.PI / 2},
  descartes: {zoneId: 'power-and-method', spatialCellId: 'power-method-room', position: {x: 8.35, z: -12.7}, rotationY: -Math.PI / 2},
  hobbes: {zoneId: 'sovereignty-rights-nature', spatialCellId: 'sovereignty-room', position: {x: -10.35, z: -30.9}, rotationY: Math.PI / 2},
  locke: {zoneId: 'sovereignty-rights-nature', spatialCellId: 'sovereignty-room', position: {x: 10.35, z: -30.9}, rotationY: -Math.PI / 2},
  spinoza: {zoneId: 'sovereignty-rights-nature', spatialCellId: 'sovereignty-room', position: {x: -7.2, z: -35.35}, rotationY: 0},
  hume: {zoneId: 'experience-freedom-critique', spatialCellId: 'critique-room', position: {x: 10.35, z: -49.8}, rotationY: -Math.PI / 2},
  rousseau: {zoneId: 'experience-freedom-critique', spatialCellId: 'critique-room', position: {x: -10.35, z: -53.2}, rotationY: Math.PI / 2},
  kant: {zoneId: 'experience-freedom-critique', spatialCellId: 'critique-room', position: {x: 0, z: -54.35}, rotationY: 0},
};

const exhibits = createContemporaryExhibitLayouts(scenes, placements, EYE_HEIGHT);

const spatialCells: readonly MuseumSpatialCell[] = [
  {id: 'ancient-connection-passage', kind: 'passage', title: 'From the Ancient Gallery', bounds: {minX: -2, maxX: 2, minZ: -4, maxZ: .6}, renderBounds: {minX: -2, maxX: 2, minZ: -4, maxZ: 0}, ceilingHeight: 5.2, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'power-method-room', kind: 'room', title: 'Power and Method', bounds: {minX: -10, maxX: 10, minZ: -18, maxZ: -4}, ceilingHeight: 5.8, exhibitIds: ['machiavelli', 'descartes'], lightingGroupId: 'power-method'},
  {id: 'reason-threshold', kind: 'passage', title: 'Reason Threshold', bounds: {minX: -3.5, maxX: 3.5, minZ: -21, maxZ: -18}, ceilingHeight: 5.1, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'sovereignty-room', kind: 'room', title: 'Sovereignty, Rights, and Nature', bounds: {minX: -12, maxX: 12, minZ: -37, maxZ: -21}, ceilingHeight: 6, exhibitIds: ['hobbes', 'locke', 'spinoza'], lightingGroupId: 'sovereignty'},
  {id: 'revolution-threshold', kind: 'passage', title: 'Revolution Threshold', bounds: {minX: -3.5, maxX: 3.5, minZ: -40, maxZ: -37}, ceilingHeight: 5.1, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'critique-room', kind: 'room', title: 'Experience, Freedom, and Critique', bounds: {minX: -12, maxX: 12, minZ: -56, maxZ: -40}, ceilingHeight: 6.2, exhibitIds: ['hume', 'rousseau', 'kant'], lightingGroupId: 'critique'},
  {id: 'modernity-connection-passage', kind: 'passage', title: 'To Modernity, Freedom, and Critique', bounds: {minX: -18.6, maxX: -12, minZ: -51, maxZ: -47}, renderBounds: {minX: -18, maxX: -12, minZ: -51, maxZ: -47}, ceilingHeight: 5.2, exhibitIds: [], lightingGroupId: 'threshold'},
];

const spatialConnections: readonly MuseumSpatialConnection[] = [
  {id: 'ancient-passage-to-power', fromCellId: 'ancient-connection-passage', toCellId: 'power-method-room', openingBounds: {minX: -2, maxX: 2, minZ: -4.2, maxZ: -3.8}},
  {id: 'power-to-reason-threshold', fromCellId: 'power-method-room', toCellId: 'reason-threshold', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -18.2, maxZ: -17.8}},
  {id: 'reason-threshold-to-sovereignty', fromCellId: 'reason-threshold', toCellId: 'sovereignty-room', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -21.2, maxZ: -20.8}},
  {id: 'sovereignty-to-revolution-threshold', fromCellId: 'sovereignty-room', toCellId: 'revolution-threshold', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -37.2, maxZ: -36.8}},
  {id: 'revolution-threshold-to-critique', fromCellId: 'revolution-threshold', toCellId: 'critique-room', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -40.2, maxZ: -39.8}},
  {id: 'critique-to-modernity-passage', fromCellId: 'critique-room', toCellId: 'modernity-connection-passage', openingBounds: {minX: -12.2, maxX: -11.8, minZ: -51, maxZ: -47}},
];

const walls: readonly MuseumWallDefinition[] = [
  museumWall('ancient-passage-west', {x: -2, z: -1.7}, .36, 4.6, 5.2, {center: {x: -2, z: -2}, size: {width: .36, depth: 4}}),
  museumWall('ancient-passage-east', {x: 2, z: -1.7}, .36, 4.6, 5.2, {center: {x: 2, z: -2}, size: {width: .36, depth: 4}}),
  museumWall('power-entry-west', {x: -6, z: -4}, 8, .36, 5.8),
  museumWall('power-entry-east', {x: 6, z: -4}, 8, .36, 5.8),
  museumWall('power-west', {x: -10, z: -11}, .36, 14.36, 5.8),
  museumWall('power-east', {x: 10, z: -11}, .36, 14.36, 5.8),
  museumWall('power-exit-west', {x: -6.75, z: -18}, 6.5, .36, 5.8),
  museumWall('power-exit-east', {x: 6.75, z: -18}, 6.5, .36, 5.8),
  museumWall('reason-threshold-west', {x: -3.5, z: -19.5}, .36, 3.36, 5.1),
  museumWall('reason-threshold-east', {x: 3.5, z: -19.5}, .36, 3.36, 5.1),
  museumWall('sovereignty-entry-west', {x: -7.75, z: -21}, 8.5, .36, 6),
  museumWall('sovereignty-entry-east', {x: 7.75, z: -21}, 8.5, .36, 6),
  museumWall('sovereignty-west', {x: -12, z: -29}, .36, 16.36, 6),
  museumWall('sovereignty-east', {x: 12, z: -29}, .36, 16.36, 6),
  museumWall('sovereignty-exit-west', {x: -7.75, z: -37}, 8.5, .36, 6),
  museumWall('sovereignty-exit-east', {x: 7.75, z: -37}, 8.5, .36, 6),
  museumWall('revolution-threshold-west', {x: -3.5, z: -38.5}, .36, 3.36, 5.1),
  museumWall('revolution-threshold-east', {x: 3.5, z: -38.5}, .36, 3.36, 5.1),
  museumWall('critique-entry-west', {x: -7.75, z: -40}, 8.5, .36, 6.2),
  museumWall('critique-entry-east', {x: 7.75, z: -40}, 8.5, .36, 6.2),
  museumWall('critique-west-north', {x: -12, z: -43.5}, .36, 7.36, 6.2),
  museumWall('critique-west-south', {x: -12, z: -53.5}, .36, 5.36, 6.2),
  museumWall('critique-east', {x: 12, z: -48}, .36, 16.36, 6.2),
  museumWall('critique-end', {x: 0, z: -56}, 24.36, .36, 6.2),
  museumWall('modernity-passage-north', {x: -15.3, z: -47}, 6.6, .36, 5.2, {center: {x: -15, z: -47}, size: {width: 6, depth: .36}}),
  museumWall('modernity-passage-south', {x: -15.3, z: -51}, 6.6, .36, 5.2, {center: {x: -15, z: -51}, size: {width: 6, depth: .36}}),
];

const furnishings: readonly MuseumFurnishingDefinition[] = [
  {id: 'reason-bench', kind: 'bench', center: {x: 7.6, z: -23.5}, size: {width: 2.6, depth: .72}, rotation: Math.PI / 2, height: .5},
];

const tracks: readonly MuseumTrackDefinition[] = [
  {id: 'power-side-track', center: {x: 0, y: 5.45, z: -12.7}, size: {width: 16, height: .08, depth: .08}},
  {id: 'sovereignty-side-track', center: {x: 0, y: 5.65, z: -30.9}, size: {width: 19, height: .08, depth: .08}},
  {id: 'spinoza-far-track', center: {x: -5, y: 5.65, z: -33.1}, size: {width: 12, height: .08, depth: .08}},
  {id: 'hume-side-track', center: {x: 4, y: 5.85, z: -49.8}, size: {width: 13, height: .08, depth: .08}},
  {id: 'rousseau-side-track', center: {x: -4, y: 5.85, z: -53.2}, size: {width: 13, height: .08, depth: .08}},
  {id: 'kant-far-track', center: {x: 0, y: 5.85, z: -52.5}, size: {width: 10, height: .08, depth: .08}},
];

const lights = createContemporaryExhibitLights<RenaissanceReasonRevolutionExhibitId>(
  exhibits,
  tracks,
  {
    machiavelli: 'power-side-track',
    descartes: 'power-side-track',
    hobbes: 'sovereignty-side-track',
    locke: 'sovereignty-side-track',
    spinoza: 'spinoza-far-track',
    hume: 'hume-side-track',
    rousseau: 'rousseau-side-track',
    kant: 'kant-far-track',
  },
  ['kant'],
);

const entryViews: readonly MuseumRoomEntryView[] = [
  {spatialCellId: 'power-method-room', pose: {x: 0, z: -5.1, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['machiavelli', 'descartes']},
  {spatialCellId: 'sovereignty-room', pose: {x: 0, z: -22.1, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['hobbes', 'locke', 'spinoza']},
  {spatialCellId: 'critique-room', pose: {x: 0, z: -41.1, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['hume', 'rousseau', 'kant']},
];

const guidedWalkLegs: readonly MuseumGuidedWalkLeg[] = [
  {fromExhibitId: 'machiavelli', toExhibitId: 'descartes', waypoints: []},
  {fromExhibitId: 'descartes', toExhibitId: 'hobbes', waypoints: [{x: 2.5, z: -16}, {x: 2.5, z: -22.5}, {x: 0, z: -27}]},
  {fromExhibitId: 'hobbes', toExhibitId: 'locke', waypoints: []},
  {fromExhibitId: 'locke', toExhibitId: 'spinoza', waypoints: [{x: 2.5, z: -33.5}, {x: -2.5, z: -33.5}]},
  {fromExhibitId: 'spinoza', toExhibitId: 'hume', waypoints: [{x: 0, z: -34.5}, {x: 0, z: -41.5}, {x: 4, z: -46}]},
  {fromExhibitId: 'hume', toExhibitId: 'rousseau', waypoints: [{x: 3, z: -51.5}, {x: -3, z: -51.5}]},
  {fromExhibitId: 'rousseau', toExhibitId: 'kant', waypoints: []},
];

const primaryCirculation: MuseumCirculationPath = {
  id: 'renaissance-reason-revolution-spine',
  clearanceRadius: .75,
  points: [
    {x: 0, z: -.8}, {x: 0, z: -12}, {x: 0, z: -19.5}, {x: 0, z: -29},
    {x: 0, z: -38.5}, {x: 0, z: -47.5}, {x: -4, z: -49}, {x: -17.8, z: -49},
  ],
};

const signs: readonly MuseumSignDefinition[] = [
  {id: 'gallery-02-entrance', kind: 'entrance', title: 'Renaissance, Reason, and Revolution', kicker: 'Gallery 02 · 16th–18th centuries', subtitle: 'Power · method · rights · experience · critique', position: {x: 0, y: 4.7, z: -3.76}, rotationY: 0, width: 4.8, height: .52},
  {id: 'sovereignty-zone', kind: 'zone', title: 'Sovereignty, Rights & Nature', kicker: 'Zone II · 17th century', subtitle: 'Order · toleration · freedom · nature', position: {x: 0, y: 4.62, z: -20.76}, rotationY: 0, width: 4.2, height: .46},
  {id: 'critique-zone', kind: 'zone', title: 'Experience, Freedom & Critique', kicker: 'Zone III · 18th century', subtitle: 'Custom · inequality · autonomy', position: {x: 0, y: 4.62, z: -39.76}, rotationY: 0, width: 4.2, height: .46},
  {id: 'gallery-03-wayfinding', kind: 'wayfinding', title: 'Continue to Gallery 03', kicker: 'Modernity, Freedom, and Critique', subtitle: 'Turn west through the side passage', position: {x: -11.79, y: 3.15, z: -45.1}, rotationY: Math.PI / 2, width: 2.7, height: .42},
];

export const RENAISSANCE_REASON_REVOLUTION_HALL_LAYOUT: MuseumHallLayout = {
  id: hall.id,
  title: hall.title,
  eyeHeight: EYE_HEIGHT,
  playerRadius: .38,
  bounds: {minX: -18.6, maxX: 12, minZ: -56, maxZ: .6},
  floorArea: 1134.8,
  cameraFov: 68,
  cameraFar: 110,
  spawn: {x: 0, z: -2.2, yaw: 0, pitch: -.02},
  spawnFocalPoint: {x: 0, z: -13},
  reset: {x: 0, z: -2.2, yaw: 0, pitch: -.02},
  spatialCells,
  spatialConnections,
  entryViews,
  wallColliders: walls,
  furnishings,
  obstacleColliders: [...exhibits.map(({collider}) => collider), ...furnishings],
  exhibits,
  primaryCirculation,
  guidedOrder: hall.guidedOrder,
  guidedWalkLegs,
  lighting: {ambientIntensity: .31, hemisphereIntensity: .92, directionalIntensity: .76, tracks, exhibitLights: lights},
  signs,
};

export const RENAISSANCE_REASON_REVOLUTION_HALL_DEFINITION: MuseumHallDefinition = {
  id: hall.id,
  worldTransform: {x: 18, z: -28.5, yaw: -Math.PI / 2},
  layout: RENAISSANCE_REASON_REVOLUTION_HALL_LAYOUT,
  entrances: [
    {
      id: 'ancient-threshold',
      position: {x: 0, z: 0},
      inwardNormal: {x: 0, z: -1},
      arrivalPose: {x: 0, z: -.8, yaw: 0, pitch: 0},
      transitionBounds: {center: {x: 0, z: 0}, size: {width: 4, depth: 1.2}},
    },
    {
      id: 'modernity-threshold',
      position: {x: -18, z: -49},
      inwardNormal: {x: 1, z: 0},
      arrivalPose: {x: -17.2, z: -49, yaw: -Math.PI / 2, pitch: 0},
      transitionBounds: {center: {x: -18, z: -49}, size: {width: 1.2, depth: 4}},
    },
  ],
  connections: [
    {id: 'renaissance-to-ancient', targetHallId: 'ancient-greek', localEntranceId: 'ancient-threshold', targetEntranceId: 'early-modern-threshold'},
    {id: 'renaissance-to-modernity', targetHallId: 'modernity-freedom-critique', localEntranceId: 'modernity-threshold', targetEntranceId: 'early-modern-threshold'},
  ],
  prefetch: {
    entrySceneAssetIds: [
      'machiavelli-santi-di-tito', 'machiavelli-prince-1532',
      'descartes-hals-portrait', 'descartes-discourse-1637',
      'hume-ramsay-portrait', 'hume-treatise-1739',
      'rousseau-la-tour-portrait', 'rousseau-social-contract-1762',
      'kant-raab-portrait', 'kant-critique-1781',
    ],
    sceneAssetIds: hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]),
    adjacentHallIds: ['ancient-greek', 'modernity-freedom-critique'],
  },
  fallbackLabel: 'Renaissance, Reason, and Revolution gallery directory',
};
