import {
  getMuseumHallCatalog,
  type LogicLanguageScienceExhibitId,
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

const hall = getMuseumHallCatalog('logic-language-science');
const EYE_HEIGHT = 1.68;

const sceneConfig: Record<LogicLanguageScienceExhibitId, ContemporarySceneConfig> = {
  peirce: {
    principal: {assetId: 'peirce-sarony-portrait', width: .96, height: 1.38},
    support: {assetId: 'peirce-existential-graphs', width: 1.18, height: .88, kind: 'wall-frame'},
  },
  frege: {
    principal: {assetId: 'frege-portrait', width: .94, height: 1.4},
    support: {assetId: 'frege-begriffsschrift-1879', width: .78, height: 1.12},
  },
  russell: {
    principal: {assetId: 'russell-portrait-1894', width: .98, height: 1.38},
    support: {assetId: 'russell-on-denoting-1905', width: .78, height: 1.12},
  },
  dewey: {
    principal: {assetId: 'dewey-portrait-1902', width: .98, height: 1.38},
    support: {assetId: 'dewey-democracy-education-1916', width: .77, height: 1.12},
  },
  carnap: {
    principal: {assetId: 'carnap-portrait', width: .94, height: 1.4},
    support: {assetId: 'carnap-reichenbach-collection', width: .94, height: .76, kind: 'wall-frame'},
  },
  popper: {
    principal: {assetId: 'popper-portrait-1987', width: .96, height: 1.38},
    support: {assetId: 'popper-alien-registration', width: 1.08, height: .72, kind: 'wall-frame'},
  },
  quine: {
    principal: {assetId: 'quine-portrait', width: .98, height: 1.38},
    support: {assetId: 'quine-qualitative-sphere', width: 1.02, height: .86, kind: 'wall-frame'},
  },
  kuhn: {
    principal: {assetId: 'kuhn-portrait-1977', width: .98, height: 1.38},
    support: {assetId: 'kuhn-structure-1962', width: .78, height: 1.12},
  },
};

const scenes = createContemporaryScenes(sceneConfig);

const placements: Record<LogicLanguageScienceExhibitId, ContemporaryPlacement> = {
  peirce: {zoneId: 'signs-and-structures', spatialCellId: 'signs-structures-room', position: {x: -8.35, z: -12}, rotationY: Math.PI / 2},
  frege: {zoneId: 'signs-and-structures', spatialCellId: 'signs-structures-room', position: {x: 8.35, z: -12}, rotationY: -Math.PI / 2},
  russell: {zoneId: 'signs-and-structures', spatialCellId: 'signs-structures-room', position: {x: -5, z: -16.35}, rotationY: 0},
  dewey: {zoneId: 'inquiry-and-testing', spatialCellId: 'inquiry-testing-room', position: {x: -10.35, z: -30.9}, rotationY: Math.PI / 2},
  carnap: {zoneId: 'inquiry-and-testing', spatialCellId: 'inquiry-testing-room', position: {x: 10.35, z: -30.9}, rotationY: -Math.PI / 2},
  popper: {zoneId: 'inquiry-and-testing', spatialCellId: 'inquiry-testing-room', position: {x: -7.2, z: -35.35}, rotationY: 0},
  quine: {zoneId: 'webs-and-revolutions', spatialCellId: 'webs-revolutions-room', position: {x: -10.35, z: -49.8}, rotationY: Math.PI / 2},
  kuhn: {zoneId: 'webs-and-revolutions', spatialCellId: 'webs-revolutions-room', position: {x: 10.35, z: -53.2}, rotationY: -Math.PI / 2},
};

const exhibits = createContemporaryExhibitLayouts(scenes, placements, EYE_HEIGHT);

const spatialCells: readonly MuseumSpatialCell[] = [
  {id: 'modernity-connection-passage', kind: 'passage', title: 'From Gallery 03', bounds: {minX: -2, maxX: 2, minZ: -4, maxZ: .6}, renderBounds: {minX: -2, maxX: 2, minZ: -4, maxZ: 0}, ceilingHeight: 5.2, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'signs-structures-room', kind: 'room', title: 'Signs and Structures', bounds: {minX: -10, maxX: 10, minZ: -18, maxZ: -4}, ceilingHeight: 5.8, exhibitIds: ['peirce', 'frege', 'russell'], lightingGroupId: 'signs'},
  {id: 'inquiry-threshold', kind: 'passage', title: 'Inquiry Threshold', bounds: {minX: -3.5, maxX: 3.5, minZ: -21, maxZ: -18}, ceilingHeight: 5.1, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'inquiry-testing-room', kind: 'room', title: 'Inquiry and Testing', bounds: {minX: -12, maxX: 12, minZ: -37, maxZ: -21}, ceilingHeight: 6, exhibitIds: ['dewey', 'carnap', 'popper'], lightingGroupId: 'inquiry'},
  {id: 'revolutions-threshold', kind: 'passage', title: 'Revolutions Threshold', bounds: {minX: -3.5, maxX: 3.5, minZ: -40, maxZ: -37}, ceilingHeight: 5.1, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'webs-revolutions-room', kind: 'room', title: 'Webs and Revolutions', bounds: {minX: -12, maxX: 12, minZ: -56, maxZ: -40}, ceilingHeight: 6.2, exhibitIds: ['quine', 'kuhn'], lightingGroupId: 'revolutions'},
  {id: 'ethics-connection-passage', kind: 'passage', title: 'To Ethics, Justice, and Political Life', bounds: {minX: 12, maxX: 18.6, minZ: -51, maxZ: -47}, renderBounds: {minX: 12, maxX: 18, minZ: -51, maxZ: -47}, ceilingHeight: 5.2, exhibitIds: [], lightingGroupId: 'threshold'},
];

const spatialConnections: readonly MuseumSpatialConnection[] = [
  {id: 'modernity-passage-to-signs', fromCellId: 'modernity-connection-passage', toCellId: 'signs-structures-room', openingBounds: {minX: -2, maxX: 2, minZ: -4.2, maxZ: -3.8}},
  {id: 'signs-to-inquiry-threshold', fromCellId: 'signs-structures-room', toCellId: 'inquiry-threshold', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -18.2, maxZ: -17.8}},
  {id: 'inquiry-threshold-to-room', fromCellId: 'inquiry-threshold', toCellId: 'inquiry-testing-room', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -21.2, maxZ: -20.8}},
  {id: 'inquiry-to-revolutions-threshold', fromCellId: 'inquiry-testing-room', toCellId: 'revolutions-threshold', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -37.2, maxZ: -36.8}},
  {id: 'revolutions-threshold-to-webs', fromCellId: 'revolutions-threshold', toCellId: 'webs-revolutions-room', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -40.2, maxZ: -39.8}},
  {id: 'webs-to-ethics-passage', fromCellId: 'webs-revolutions-room', toCellId: 'ethics-connection-passage', openingBounds: {minX: 11.8, maxX: 12.2, minZ: -51, maxZ: -47}},
];

const walls: readonly MuseumWallDefinition[] = [
  museumWall('modernity-passage-west', {x: -2, z: -1.7}, .36, 4.6, 5.2, {center: {x: -2, z: -2}, size: {width: .36, depth: 4}}),
  museumWall('modernity-passage-east', {x: 2, z: -1.7}, .36, 4.6, 5.2, {center: {x: 2, z: -2}, size: {width: .36, depth: 4}}),
  museumWall('signs-entry-west', {x: -6, z: -4}, 8, .36, 5.8),
  museumWall('signs-entry-east', {x: 6, z: -4}, 8, .36, 5.8),
  museumWall('signs-west', {x: -10, z: -11}, .36, 14.36, 5.8),
  museumWall('signs-east', {x: 10, z: -11}, .36, 14.36, 5.8),
  museumWall('signs-exit-west', {x: -6.75, z: -18}, 6.5, .36, 5.8),
  museumWall('signs-exit-east', {x: 6.75, z: -18}, 6.5, .36, 5.8),
  museumWall('inquiry-threshold-west', {x: -3.5, z: -19.5}, .36, 3.36, 5.1),
  museumWall('inquiry-threshold-east', {x: 3.5, z: -19.5}, .36, 3.36, 5.1),
  museumWall('inquiry-entry-west', {x: -7.75, z: -21}, 8.5, .36, 6),
  museumWall('inquiry-entry-east', {x: 7.75, z: -21}, 8.5, .36, 6),
  museumWall('inquiry-west', {x: -12, z: -29}, .36, 16.36, 6),
  museumWall('inquiry-east', {x: 12, z: -29}, .36, 16.36, 6),
  museumWall('inquiry-exit-west', {x: -7.75, z: -37}, 8.5, .36, 6),
  museumWall('inquiry-exit-east', {x: 7.75, z: -37}, 8.5, .36, 6),
  museumWall('revolutions-threshold-west', {x: -3.5, z: -38.5}, .36, 3.36, 5.1),
  museumWall('revolutions-threshold-east', {x: 3.5, z: -38.5}, .36, 3.36, 5.1),
  museumWall('webs-entry-west', {x: -7.75, z: -40}, 8.5, .36, 6.2),
  museumWall('webs-entry-east', {x: 7.75, z: -40}, 8.5, .36, 6.2),
  museumWall('webs-west', {x: -12, z: -48}, .36, 16.36, 6.2),
  museumWall('webs-east-north', {x: 12, z: -43.5}, .36, 7.36, 6.2),
  museumWall('webs-east-south', {x: 12, z: -53.5}, .36, 5.36, 6.2),
  museumWall('webs-end', {x: 0, z: -56}, 24.36, .36, 6.2),
  museumWall('ethics-passage-north', {x: 15.3, z: -47}, 6.6, .36, 5.2, {center: {x: 15, z: -47}, size: {width: 6, depth: .36}}),
  museumWall('ethics-passage-south', {x: 15.3, z: -51}, 6.6, .36, 5.2, {center: {x: 15, z: -51}, size: {width: 6, depth: .36}}),
];

const furnishings: readonly MuseumFurnishingDefinition[] = [
  {id: 'inquiry-bench', kind: 'bench', center: {x: 7.6, z: -23.5}, size: {width: 2.6, depth: .72}, rotation: Math.PI / 2, height: .5},
];

const tracks: readonly MuseumTrackDefinition[] = [
  {id: 'signs-north-track', center: {x: 0, y: 5.45, z: -10.5}, size: {width: 16, height: .08, depth: .08}},
  {id: 'signs-south-track', center: {x: -3.5, y: 5.45, z: -15}, size: {width: 9, height: .08, depth: .08}},
  {id: 'inquiry-side-track', center: {x: 0, y: 5.65, z: -30.9}, size: {width: 19, height: .08, depth: .08}},
  {id: 'popper-far-track', center: {x: -5, y: 5.65, z: -33.1}, size: {width: 12, height: .08, depth: .08}},
  {id: 'webs-north-track', center: {x: -4, y: 5.85, z: -49.8}, size: {width: 13, height: .08, depth: .08}},
  {id: 'webs-south-track', center: {x: 4, y: 5.85, z: -53.2}, size: {width: 13, height: .08, depth: .08}},
];

const lights = createContemporaryExhibitLights<LogicLanguageScienceExhibitId>(
  exhibits,
  tracks,
  {
    peirce: 'signs-north-track',
    frege: 'signs-north-track',
    russell: 'signs-south-track',
    dewey: 'inquiry-side-track',
    carnap: 'inquiry-side-track',
    popper: 'popper-far-track',
    quine: 'webs-north-track',
    kuhn: 'webs-south-track',
  },
  ['kuhn'],
);

const entryViews: readonly MuseumRoomEntryView[] = [
  {spatialCellId: 'signs-structures-room', pose: {x: 0, z: -4.5, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['peirce', 'frege', 'russell']},
  {spatialCellId: 'inquiry-testing-room', pose: {x: 0, z: -21.5, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['dewey', 'carnap', 'popper']},
  {spatialCellId: 'webs-revolutions-room', pose: {x: 0, z: -40.5, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['quine', 'kuhn']},
];

const guidedWalkLegs: readonly MuseumGuidedWalkLeg[] = [
  {fromExhibitId: 'peirce', toExhibitId: 'frege', waypoints: []},
  {fromExhibitId: 'frege', toExhibitId: 'russell', waypoints: []},
  {fromExhibitId: 'russell', toExhibitId: 'dewey', waypoints: [{x: -2.4, z: -13}, {x: -2.4, z: -19.5}, {x: 0, z: -22.5}, {x: 0, z: -27}]},
  {fromExhibitId: 'dewey', toExhibitId: 'carnap', waypoints: []},
  {fromExhibitId: 'carnap', toExhibitId: 'popper', waypoints: [{x: 2.5, z: -33.5}, {x: -2.5, z: -33.5}]},
  {fromExhibitId: 'popper', toExhibitId: 'quine', waypoints: [{x: -2.5, z: -34}, {x: -2.5, z: -41.5}, {x: -4, z: -46}]},
  {fromExhibitId: 'quine', toExhibitId: 'kuhn', waypoints: [{x: -3, z: -51.5}, {x: 3, z: -51.5}]},
];

const primaryCirculation: MuseumCirculationPath = {
  id: 'logic-language-science-spine',
  clearanceRadius: .75,
  points: [
    {x: 0, z: -.8}, {x: 0, z: -12}, {x: 0, z: -19.5}, {x: 0, z: -29},
    {x: 0, z: -38.5}, {x: 0, z: -47.5}, {x: 4, z: -49}, {x: 17.8, z: -49},
  ],
};

const signs: readonly MuseumSignDefinition[] = [
  {id: 'gallery-04-entrance', kind: 'entrance', title: 'Logic, Language, and Science', kicker: 'Gallery 04 · 19th–20th centuries', subtitle: 'Signs · logic · inquiry · evidence · revolution', position: {x: 0, y: 4.7, z: -3.76}, rotationY: 0, width: 4.8, height: .52},
  {id: 'inquiry-zone', kind: 'zone', title: 'Inquiry & Testing', kicker: 'Zone II · early–mid 20th century', subtitle: 'Experiment · reconstruction · criticism', position: {x: 0, y: 4.62, z: -20.76}, rotationY: 0, width: 4.2, height: .46},
  {id: 'webs-zone', kind: 'zone', title: 'Webs & Revolutions', kicker: 'Zone III · mid–late 20th century', subtitle: 'Holism · paradigms · scientific change', position: {x: 0, y: 4.62, z: -39.76}, rotationY: 0, width: 4.2, height: .46},
  {id: 'gallery-05-wayfinding', kind: 'wayfinding', title: 'Continue to Gallery 05', kicker: 'Ethics, Justice, and Political Life', subtitle: 'Turn east through the side passage', position: {x: 11.79, y: 3.15, z: -45.1}, rotationY: -Math.PI / 2, width: 2.9, height: .42},
];

export const LOGIC_LANGUAGE_SCIENCE_HALL_LAYOUT: MuseumHallLayout = {
  id: hall.id,
  title: hall.title,
  eyeHeight: EYE_HEIGHT,
  playerRadius: .38,
  bounds: {minX: -12, maxX: 18.6, minZ: -56, maxZ: .6},
  floorArea: 1134.8,
  cameraFov: 68,
  cameraFar: 110,
  spawn: {x: 0, z: -2.2, yaw: 0, pitch: -.02},
  spawnFocalPoint: {x: 0, z: -12},
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

export const LOGIC_LANGUAGE_SCIENCE_HALL_DEFINITION: MuseumHallDefinition = {
  id: hall.id,
  worldTransform: {x: 67, z: -110.5, yaw: 0},
  layout: LOGIC_LANGUAGE_SCIENCE_HALL_LAYOUT,
  entrances: [
    {
      id: 'modernity-threshold',
      position: {x: 0, z: 0},
      inwardNormal: {x: 0, z: -1},
      arrivalPose: {x: 0, z: -.8, yaw: 0, pitch: 0},
      transitionBounds: {center: {x: 0, z: 0}, size: {width: 4, depth: 1.2}},
    },
    {
      id: 'ethics-threshold',
      position: {x: 18, z: -49},
      inwardNormal: {x: -1, z: 0},
      arrivalPose: {x: 17.2, z: -49, yaw: Math.PI / 2, pitch: 0},
      transitionBounds: {center: {x: 18, z: -49}, size: {width: 1.2, depth: 4}},
    },
  ],
  connections: [
    {id: 'logic-to-modernity', targetHallId: 'modernity-freedom-critique', localEntranceId: 'modernity-threshold', targetEntranceId: 'logic-threshold'},
    {id: 'logic-to-ethics', targetHallId: 'ethics-justice-political-life', localEntranceId: 'ethics-threshold', targetEntranceId: 'logic-threshold'},
  ],
  prefetch: {
    entrySceneAssetIds: [
      'peirce-sarony-portrait', 'peirce-existential-graphs',
      'frege-portrait', 'frege-begriffsschrift-1879',
      'russell-portrait-1894', 'russell-on-denoting-1905',
      'quine-portrait', 'quine-qualitative-sphere',
      'kuhn-portrait-1977', 'kuhn-structure-1962',
    ],
    sceneAssetIds: hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]),
    adjacentHallIds: ['modernity-freedom-critique', 'ethics-justice-political-life'],
  },
  fallbackLabel: 'Logic, Language, and Science gallery directory',
};
