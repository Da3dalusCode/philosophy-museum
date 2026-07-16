import {
  getMuseumHallCatalog,
  type EthicsJusticePoliticalLifeExhibitId,
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
  MuseumHallContentDefinition,
  MuseumHallLayout,
  MuseumRoomEntryView,
  MuseumSignDefinition,
  MuseumSpatialCell,
  MuseumSpatialConnection,
  MuseumTrackDefinition,
  MuseumWallDefinition,
} from './museumWorldTypes';

const hall = getMuseumHallCatalog('ethics-justice-political-life');
const EYE_HEIGHT = 1.68;

const sceneConfig: Record<EthicsJusticePoliticalLifeExhibitId, ContemporarySceneConfig> = {
  bentham: {
    principal: {assetId: 'bentham-pickering-portrait', width: .94, height: 1.4},
    support: {assetId: 'bentham-principles-1823', width: .78, height: 1.12},
  },
  wollstonecraft: {
    principal: {assetId: 'wollstonecraft-opie-portrait', width: .94, height: 1.4},
    support: {assetId: 'wollstonecraft-vindication-1792', width: .78, height: 1.12},
  },
  mill: {
    principal: {assetId: 'mill-stereoscopic-portrait', width: .96, height: 1.38},
    support: {assetId: 'mill-on-liberty-1859', width: .78, height: 1.12},
  },
  arendt: {
    principal: {assetId: 'arendt-portrait-1933', width: .94, height: 1.4},
    support: {assetId: 'arendt-grave-bard', width: 1.08, height: .76, kind: 'wall-frame'},
  },
  fanon: {
    principal: {assetId: 'fanon-portrait', width: .96, height: 1.38},
    support: {assetId: 'fanon-paris-plaque', width: 1.02, height: .82, kind: 'wall-frame'},
  },
  rawls: {
    principal: {assetId: 'rawls-portrait', width: .96, height: 1.38},
    support: {assetId: 'rawls-theory-justice-1971', width: .78, height: 1.12},
  },
  nozick: {
    principal: {assetId: 'nozick-portrait', width: .96, height: 1.38},
    support: {assetId: 'nozick-anarchy-state-utopia-1974', width: .78, height: 1.12},
  },
  habermas: {
    principal: {assetId: 'habermas-portrait', width: .96, height: 1.38},
    support: {assetId: 'habermas-lecture-2011', width: 1.08, height: .76, kind: 'wall-frame'},
  },
};

const scenes = createContemporaryScenes(sceneConfig);

const placements: Record<EthicsJusticePoliticalLifeExhibitId, ContemporaryPlacement> = {
  bentham: {zoneId: 'utility-equality-liberty', spatialCellId: 'utility-equality-room', position: {x: -9.35, z: -13}, rotationY: Math.PI / 2},
  wollstonecraft: {zoneId: 'utility-equality-liberty', spatialCellId: 'utility-equality-room', position: {x: 9.35, z: -13}, rotationY: -Math.PI / 2},
  mill: {zoneId: 'utility-equality-liberty', spatialCellId: 'utility-equality-room', position: {x: -5, z: -20.35}, rotationY: 0},
  arendt: {zoneId: 'freedom-decolonization-public-life', spatialCellId: 'freedom-public-life-room', position: {x: -8.35, z: -33.5}, rotationY: Math.PI / 2},
  fanon: {zoneId: 'freedom-decolonization-public-life', spatialCellId: 'freedom-public-life-room', position: {x: 8.35, z: -33.5}, rotationY: -Math.PI / 2},
  rawls: {zoneId: 'justice-rights-democratic-reason', spatialCellId: 'justice-democratic-reason-room', position: {x: -9.35, z: -51.5}, rotationY: Math.PI / 2},
  nozick: {zoneId: 'justice-rights-democratic-reason', spatialCellId: 'justice-democratic-reason-room', position: {x: 9.35, z: -51.5}, rotationY: -Math.PI / 2},
  habermas: {zoneId: 'justice-rights-democratic-reason', spatialCellId: 'justice-democratic-reason-room', position: {x: 9.35, z: -57}, rotationY: -Math.PI / 2},
};

const exhibits = createContemporaryExhibitLayouts(scenes, placements, EYE_HEIGHT);

const spatialCells: readonly MuseumSpatialCell[] = [
  {id: 'logic-connection-passage', kind: 'passage', title: 'From Gallery 04', bounds: {minX: -2, maxX: 2, minZ: -4, maxZ: .6}, renderBounds: {minX: -2, maxX: 2, minZ: -4, maxZ: 0}, ceilingHeight: 5.2, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'utility-equality-room', kind: 'room', title: 'Utility, Equality, and Liberty', bounds: {minX: -11, maxX: 11, minZ: -23, maxZ: -4}, ceilingHeight: 6, exhibitIds: ['bentham', 'wollstonecraft', 'mill'], lightingGroupId: 'utility'},
  {id: 'public-life-threshold', kind: 'passage', title: 'Public Life Threshold', bounds: {minX: -3.5, maxX: 3.5, minZ: -26, maxZ: -23}, ceilingHeight: 5.1, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'freedom-public-life-room', kind: 'room', title: 'Freedom, Decolonization, and Public Life', bounds: {minX: -10, maxX: 10, minZ: -40, maxZ: -26}, ceilingHeight: 5.8, exhibitIds: ['arendt', 'fanon'], lightingGroupId: 'public-life'},
  {id: 'justice-threshold', kind: 'passage', title: 'Justice Threshold', bounds: {minX: -3.5, maxX: 3.5, minZ: -43, maxZ: -40}, ceilingHeight: 5.1, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'justice-democratic-reason-room', kind: 'room', title: 'Justice, Rights, and Democratic Reason', bounds: {minX: -11, maxX: 11, minZ: -61, maxZ: -43}, ceilingHeight: 6.2, exhibitIds: ['rawls', 'nozick', 'habermas'], lightingGroupId: 'justice'},
  {id: 'mind-connection-passage', kind: 'passage', title: 'To Mind, Consciousness, and the Self', bounds: {minX: -2, maxX: 2, minZ: -64.6, maxZ: -61}, renderBounds: {minX: -2, maxX: 2, minZ: -64, maxZ: -61}, ceilingHeight: 5.2, exhibitIds: [], lightingGroupId: 'threshold'},
];

const spatialConnections: readonly MuseumSpatialConnection[] = [
  {id: 'logic-passage-to-utility', fromCellId: 'logic-connection-passage', toCellId: 'utility-equality-room', openingBounds: {minX: -2, maxX: 2, minZ: -4.2, maxZ: -3.8}},
  {id: 'utility-to-public-threshold', fromCellId: 'utility-equality-room', toCellId: 'public-life-threshold', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -23.2, maxZ: -22.8}},
  {id: 'public-threshold-to-freedom', fromCellId: 'public-life-threshold', toCellId: 'freedom-public-life-room', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -26.2, maxZ: -25.8}},
  {id: 'freedom-to-justice-threshold', fromCellId: 'freedom-public-life-room', toCellId: 'justice-threshold', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -40.2, maxZ: -39.8}},
  {id: 'justice-threshold-to-room', fromCellId: 'justice-threshold', toCellId: 'justice-democratic-reason-room', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -43.2, maxZ: -42.8}},
  {id: 'justice-to-mind-passage', fromCellId: 'justice-democratic-reason-room', toCellId: 'mind-connection-passage', openingBounds: {minX: -2, maxX: 2, minZ: -61.2, maxZ: -60.8}},
];

const walls: readonly MuseumWallDefinition[] = [
  museumWall('logic-passage-west', {x: -2, z: -1.7}, .36, 4.6, 5.2, {center: {x: -2, z: -2}, size: {width: .36, depth: 4}}),
  museumWall('logic-passage-east', {x: 2, z: -1.7}, .36, 4.6, 5.2, {center: {x: 2, z: -2}, size: {width: .36, depth: 4}}),
  museumWall('utility-entry-west', {x: -6.5, z: -4}, 9, .36, 6),
  museumWall('utility-entry-east', {x: 6.5, z: -4}, 9, .36, 6),
  museumWall('utility-west', {x: -11, z: -13.5}, .36, 19.36, 6),
  museumWall('utility-east', {x: 11, z: -13.5}, .36, 19.36, 6),
  museumWall('utility-exit-west', {x: -7.25, z: -23}, 7.5, .36, 6),
  museumWall('utility-exit-east', {x: 7.25, z: -23}, 7.5, .36, 6),
  museumWall('public-threshold-west', {x: -3.5, z: -24.5}, .36, 3.36, 5.1),
  museumWall('public-threshold-east', {x: 3.5, z: -24.5}, .36, 3.36, 5.1),
  museumWall('public-entry-west', {x: -6.75, z: -26}, 6.5, .36, 5.8),
  museumWall('public-entry-east', {x: 6.75, z: -26}, 6.5, .36, 5.8),
  museumWall('public-west', {x: -10, z: -33}, .36, 14.36, 5.8),
  museumWall('public-east', {x: 10, z: -33}, .36, 14.36, 5.8),
  museumWall('public-exit-west', {x: -6.75, z: -40}, 6.5, .36, 5.8),
  museumWall('public-exit-east', {x: 6.75, z: -40}, 6.5, .36, 5.8),
  museumWall('justice-threshold-west', {x: -3.5, z: -41.5}, .36, 3.36, 5.1),
  museumWall('justice-threshold-east', {x: 3.5, z: -41.5}, .36, 3.36, 5.1),
  museumWall('justice-entry-west', {x: -7.25, z: -43}, 7.5, .36, 6.2),
  museumWall('justice-entry-east', {x: 7.25, z: -43}, 7.5, .36, 6.2),
  museumWall('justice-west', {x: -11, z: -52}, .36, 18.36, 6.2),
  museumWall('justice-east', {x: 11, z: -52}, .36, 18.36, 6.2),
  museumWall('justice-end-west', {x: -6.5, z: -61}, 9, .36, 6.2),
  museumWall('justice-end-east', {x: 6.5, z: -61}, 9, .36, 6.2),
  museumWall('mind-passage-west', {x: -2, z: -62.8}, .36, 3.6, 5.2, {center: {x: -2, z: -62.5}, size: {width: .36, depth: 3}}),
  museumWall('mind-passage-east', {x: 2, z: -62.8}, .36, 3.6, 5.2, {center: {x: 2, z: -62.5}, size: {width: .36, depth: 3}}),
];

const furnishings: readonly MuseumFurnishingDefinition[] = [
  {id: 'public-life-bench', kind: 'bench', center: {x: 5.6, z: -28.7}, size: {width: 2.7, depth: .72}, rotation: Math.PI / 2, height: .5},
];

const tracks: readonly MuseumTrackDefinition[] = [
  {id: 'utility-north-track', center: {x: 0, y: 5.65, z: -12.5}, size: {width: 18, height: .08, depth: .08}},
  {id: 'utility-south-track', center: {x: -4, y: 5.65, z: -19}, size: {width: 12, height: .08, depth: .08}},
  {id: 'public-side-track', center: {x: 0, y: 5.45, z: -33}, size: {width: 17, height: .08, depth: .08}},
  {id: 'justice-north-track', center: {x: 0, y: 5.85, z: -50}, size: {width: 19, height: .08, depth: .08}},
  {id: 'justice-south-track', center: {x: 5, y: 5.85, z: -57}, size: {width: 10, height: .08, depth: .08}},
];

const lights = createContemporaryExhibitLights<EthicsJusticePoliticalLifeExhibitId>(
  exhibits,
  tracks,
  {
    bentham: 'utility-north-track',
    wollstonecraft: 'utility-north-track',
    mill: 'utility-south-track',
    arendt: 'public-side-track',
    fanon: 'public-side-track',
    rawls: 'justice-north-track',
    nozick: 'justice-north-track',
    habermas: 'justice-south-track',
  },
  ['habermas'],
);

const entryViews: readonly MuseumRoomEntryView[] = [
  {spatialCellId: 'utility-equality-room', pose: {x: 0, z: -4.5, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['bentham', 'wollstonecraft', 'mill']},
  {spatialCellId: 'freedom-public-life-room', pose: {x: 0, z: -26.4, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['arendt', 'fanon']},
  {spatialCellId: 'justice-democratic-reason-room', pose: {x: 0, z: -43.4, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['rawls', 'nozick', 'habermas']},
];

const guidedWalkLegs: readonly MuseumGuidedWalkLeg[] = [
  {fromExhibitId: 'bentham', toExhibitId: 'wollstonecraft', waypoints: []},
  {fromExhibitId: 'wollstonecraft', toExhibitId: 'mill', waypoints: []},
  {fromExhibitId: 'mill', toExhibitId: 'arendt', waypoints: [{x: -2.4, z: -17}, {x: -2.4, z: -24.5}, {x: 0, z: -27.5}, {x: 0, z: -30}]},
  {fromExhibitId: 'arendt', toExhibitId: 'fanon', waypoints: []},
  {fromExhibitId: 'fanon', toExhibitId: 'rawls', waypoints: [{x: 2.5, z: -38}, {x: 2.5, z: -44.5}, {x: 0, z: -47}]},
  {fromExhibitId: 'rawls', toExhibitId: 'nozick', waypoints: []},
  {fromExhibitId: 'nozick', toExhibitId: 'habermas', waypoints: []},
];

const primaryCirculation: MuseumCirculationPath = {
  id: 'ethics-justice-political-life-spine',
  clearanceRadius: .75,
  points: [
    {x: 0, z: -.8}, {x: 0, z: -13}, {x: 0, z: -24.5}, {x: 0, z: -33},
    {x: 0, z: -41.5}, {x: 0, z: -50}, {x: 0, z: -58}, {x: 0, z: -63.8},
  ],
};

const signs: readonly MuseumSignDefinition[] = [
  {id: 'gallery-05-entrance', kind: 'entrance', title: 'Ethics, Justice, and Political Life', kicker: 'Gallery 05 · 18th–21st centuries', subtitle: 'Utility · liberty · decolonization · justice', position: {x: 0, y: 4.7, z: -3.76}, rotationY: 0, width: 5, height: .52},
  {id: 'public-life-zone', kind: 'zone', title: 'Freedom, Decolonization & Public Life', kicker: 'Zone II · 20th century', subtitle: 'Action · liberation · shared worlds', position: {x: 0, y: 4.62, z: -25.76}, rotationY: 0, width: 4.7, height: .46},
  {id: 'justice-zone', kind: 'zone', title: 'Justice, Rights & Democratic Reason', kicker: 'Zone III · 20th–21st centuries', subtitle: 'Fairness · entitlement · deliberation', position: {x: 0, y: 4.62, z: -42.76}, rotationY: 0, width: 4.6, height: .46},
  {id: 'gallery-06-wayfinding', kind: 'wayfinding', title: 'Outer Ring · Gallery 06', kicker: 'Mind, Consciousness, and the Self', subtitle: 'The loop returns to the entrance beyond', position: {x: 0, y: 4.25, z: -60.76}, rotationY: 0, width: 3.55, height: .42},
];

export const ETHICS_JUSTICE_POLITICAL_LIFE_HALL_LAYOUT: MuseumHallLayout = {
  id: hall.id,
  title: hall.title,
  eyeHeight: EYE_HEIGHT,
  playerRadius: .38,
  bounds: {minX: -11, maxX: 11, minZ: -64.6, maxZ: .6},
  floorArea: 1168.8,
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
  lighting: {ambientIntensity: .3, hemisphereIntensity: .91, directionalIntensity: .75, tracks, exhibitLights: lights},
  signs,
};

export const ETHICS_JUSTICE_POLITICAL_LIFE_HALL_DEFINITION: MuseumHallContentDefinition = {
  id: hall.id,
  layout: ETHICS_JUSTICE_POLITICAL_LIFE_HALL_LAYOUT,
  prefetch: {
    entrySceneAssetIds: [
      'bentham-pickering-portrait', 'bentham-principles-1823',
      'wollstonecraft-opie-portrait', 'wollstonecraft-vindication-1792',
      'mill-stereoscopic-portrait', 'mill-on-liberty-1859',
      'rawls-portrait', 'rawls-theory-justice-1971',
      'nozick-portrait', 'nozick-anarchy-state-utopia-1974',
      'habermas-portrait', 'habermas-lecture-2011',
    ],
    sceneAssetIds: hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]),
  },
  fallbackLabel: 'Ethics, Justice, and Political Life gallery directory',
};
