import {
  getMuseumHallCatalog,
  type MindConsciousnessSelfExhibitId,
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

const hall = getMuseumHallCatalog('mind-consciousness-self');
const EYE_HEIGHT = 1.68;

const sceneConfig: Record<MindConsciousnessSelfExhibitId, ContemporarySceneConfig> = {
  patanjali: {
    principal: {assetId: 'patanjali-statue', width: .92, height: 1.42},
    support: {assetId: 'patanjali-yoga-sutra-manuscript', width: 1.12, height: .82, kind: 'wall-frame'},
  },
  vasubandhu: {
    principal: {assetId: 'vasubandhu-statue', width: .92, height: 1.42},
    support: {assetId: 'vasubandhu-abhidharmakosha-manuscript', width: 1.12, height: .82, kind: 'wall-frame'},
  },
  'william-james': {
    principal: {assetId: 'william-james-portrait', width: .96, height: 1.38},
    support: {assetId: 'william-james-principles-1890', width: .78, height: 1.12},
  },
  husserl: {
    principal: {assetId: 'husserl-portrait', width: .96, height: 1.38},
    support: {assetId: 'husserl-goettingen-plaque', width: 1.06, height: .78, kind: 'wall-frame'},
  },
  'merleau-ponty': {
    principal: {assetId: 'merleau-ponty-portrait', width: .96, height: 1.38},
    support: {assetId: 'merleau-ponty-grave', width: 1.08, height: .76, kind: 'wall-frame'},
  },
  anscombe: {
    principal: {assetId: 'anscombe-portrait', width: .96, height: 1.38},
    support: {assetId: 'anscombe-philosophical-investigations-1953', width: .78, height: 1.12},
  },
  'thomas-nagel': {
    principal: {assetId: 'thomas-nagel-portrait', width: .96, height: 1.38},
    support: {assetId: 'thomas-nagel-teaching', width: 1.08, height: .76, kind: 'wall-frame'},
  },
  'derek-parfit': {
    principal: {assetId: 'derek-parfit-portrait', width: .96, height: 1.38},
    support: {assetId: 'derek-parfit-repugnant-conclusion', width: 1.08, height: .78, kind: 'wall-frame'},
  },
};

const scenes = createContemporaryScenes(sceneConfig);

const placements: Record<MindConsciousnessSelfExhibitId, ContemporaryPlacement> = {
  patanjali: {zoneId: 'disciplines-of-mind-and-self', spatialCellId: 'disciplines-mind-self-room', position: {x: -8.35, z: -12.7}, rotationY: Math.PI / 2},
  vasubandhu: {zoneId: 'disciplines-of-mind-and-self', spatialCellId: 'disciplines-mind-self-room', position: {x: 8.35, z: -12.7}, rotationY: -Math.PI / 2},
  'william-james': {zoneId: 'experience-intentionality-embodiment', spatialCellId: 'experience-embodiment-room', position: {x: -10.35, z: -30.9}, rotationY: Math.PI / 2},
  husserl: {zoneId: 'experience-intentionality-embodiment', spatialCellId: 'experience-embodiment-room', position: {x: 10.35, z: -30.9}, rotationY: -Math.PI / 2},
  'merleau-ponty': {zoneId: 'experience-intentionality-embodiment', spatialCellId: 'experience-embodiment-room', position: {x: -7.2, z: -35.35}, rotationY: 0},
  anscombe: {zoneId: 'action-consciousness-personhood', spatialCellId: 'action-personhood-room', position: {x: 10.35, z: -49.8}, rotationY: -Math.PI / 2},
  'thomas-nagel': {zoneId: 'action-consciousness-personhood', spatialCellId: 'action-personhood-room', position: {x: -10.35, z: -53.2}, rotationY: Math.PI / 2},
  'derek-parfit': {zoneId: 'action-consciousness-personhood', spatialCellId: 'action-personhood-room', position: {x: 0, z: -54.35}, rotationY: 0},
};

const exhibits = createContemporaryExhibitLayouts(scenes, placements, EYE_HEIGHT);

const spatialCells: readonly MuseumSpatialCell[] = [
  {id: 'ethics-connection-passage', kind: 'passage', title: 'From Gallery 05', bounds: {minX: -2, maxX: 2, minZ: -4, maxZ: .6}, renderBounds: {minX: -2, maxX: 2, minZ: -4, maxZ: 0}, ceilingHeight: 5.2, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'disciplines-mind-self-room', kind: 'room', title: 'Disciplines of Mind and Self', bounds: {minX: -10, maxX: 10, minZ: -18, maxZ: -4}, ceilingHeight: 5.8, exhibitIds: ['patanjali', 'vasubandhu'], lightingGroupId: 'disciplines'},
  {id: 'experience-threshold', kind: 'passage', title: 'Experience Threshold', bounds: {minX: -3.5, maxX: 3.5, minZ: -21, maxZ: -18}, ceilingHeight: 5.1, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'experience-embodiment-room', kind: 'room', title: 'Experience, Intentionality, and Embodiment', bounds: {minX: -12, maxX: 12, minZ: -37, maxZ: -21}, ceilingHeight: 6, exhibitIds: ['william-james', 'husserl', 'merleau-ponty'], lightingGroupId: 'experience'},
  {id: 'personhood-threshold', kind: 'passage', title: 'Personhood Threshold', bounds: {minX: -3.5, maxX: 3.5, minZ: -40, maxZ: -37}, ceilingHeight: 5.1, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'action-personhood-room', kind: 'room', title: 'Action, Consciousness, and Personhood', bounds: {minX: -12, maxX: 12, minZ: -56, maxZ: -40}, ceilingHeight: 6.2, exhibitIds: ['anscombe', 'thomas-nagel', 'derek-parfit'], lightingGroupId: 'personhood'},
];

const spatialConnections: readonly MuseumSpatialConnection[] = [
  {id: 'ethics-passage-to-disciplines', fromCellId: 'ethics-connection-passage', toCellId: 'disciplines-mind-self-room', openingBounds: {minX: -2, maxX: 2, minZ: -4.2, maxZ: -3.8}},
  {id: 'disciplines-to-experience-threshold', fromCellId: 'disciplines-mind-self-room', toCellId: 'experience-threshold', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -18.2, maxZ: -17.8}},
  {id: 'experience-threshold-to-room', fromCellId: 'experience-threshold', toCellId: 'experience-embodiment-room', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -21.2, maxZ: -20.8}},
  {id: 'experience-to-personhood-threshold', fromCellId: 'experience-embodiment-room', toCellId: 'personhood-threshold', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -37.2, maxZ: -36.8}},
  {id: 'personhood-threshold-to-action', fromCellId: 'personhood-threshold', toCellId: 'action-personhood-room', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -40.2, maxZ: -39.8}},
];

const walls: readonly MuseumWallDefinition[] = [
  museumWall('ethics-passage-west', {x: -2, z: -1.7}, .36, 4.6, 5.2, {center: {x: -2, z: -2}, size: {width: .36, depth: 4}}),
  museumWall('ethics-passage-east', {x: 2, z: -1.7}, .36, 4.6, 5.2, {center: {x: 2, z: -2}, size: {width: .36, depth: 4}}),
  museumWall('disciplines-entry-west', {x: -6, z: -4}, 8, .36, 5.8),
  museumWall('disciplines-entry-east', {x: 6, z: -4}, 8, .36, 5.8),
  museumWall('disciplines-west', {x: -10, z: -11}, .36, 14.36, 5.8),
  museumWall('disciplines-east', {x: 10, z: -11}, .36, 14.36, 5.8),
  museumWall('disciplines-exit-west', {x: -6.75, z: -18}, 6.5, .36, 5.8),
  museumWall('disciplines-exit-east', {x: 6.75, z: -18}, 6.5, .36, 5.8),
  museumWall('experience-threshold-west', {x: -3.5, z: -19.5}, .36, 3.36, 5.1),
  museumWall('experience-threshold-east', {x: 3.5, z: -19.5}, .36, 3.36, 5.1),
  museumWall('experience-entry-west', {x: -7.75, z: -21}, 8.5, .36, 6),
  museumWall('experience-entry-east', {x: 7.75, z: -21}, 8.5, .36, 6),
  museumWall('experience-west', {x: -12, z: -29}, .36, 16.36, 6),
  museumWall('experience-east', {x: 12, z: -29}, .36, 16.36, 6),
  museumWall('experience-exit-west', {x: -7.75, z: -37}, 8.5, .36, 6),
  museumWall('experience-exit-east', {x: 7.75, z: -37}, 8.5, .36, 6),
  museumWall('personhood-threshold-west', {x: -3.5, z: -38.5}, .36, 3.36, 5.1),
  museumWall('personhood-threshold-east', {x: 3.5, z: -38.5}, .36, 3.36, 5.1),
  museumWall('action-entry-west', {x: -7.75, z: -40}, 8.5, .36, 6.2),
  museumWall('action-entry-east', {x: 7.75, z: -40}, 8.5, .36, 6.2),
  museumWall('action-west', {x: -12, z: -48}, .36, 16.36, 6.2),
  museumWall('action-east', {x: 12, z: -48}, .36, 16.36, 6.2),
  museumWall('action-end', {x: 0, z: -56}, 24.36, .36, 6.2),
];

const furnishings: readonly MuseumFurnishingDefinition[] = [
  {id: 'experience-bench', kind: 'bench', center: {x: 7.6, z: -23.5}, size: {width: 2.6, depth: .72}, rotation: Math.PI / 2, height: .5},
];

const tracks: readonly MuseumTrackDefinition[] = [
  {id: 'disciplines-side-track', center: {x: 0, y: 5.45, z: -12.7}, size: {width: 16, height: .08, depth: .08}},
  {id: 'experience-side-track', center: {x: 0, y: 5.65, z: -30.9}, size: {width: 19, height: .08, depth: .08}},
  {id: 'merleau-far-track', center: {x: -5, y: 5.65, z: -33.1}, size: {width: 12, height: .08, depth: .08}},
  {id: 'anscombe-side-track', center: {x: 4, y: 5.85, z: -49.8}, size: {width: 13, height: .08, depth: .08}},
  {id: 'nagel-side-track', center: {x: -4, y: 5.85, z: -53.2}, size: {width: 13, height: .08, depth: .08}},
  {id: 'parfit-far-track', center: {x: 0, y: 5.85, z: -52.5}, size: {width: 10, height: .08, depth: .08}},
];

const lights = createContemporaryExhibitLights<MindConsciousnessSelfExhibitId>(
  exhibits,
  tracks,
  {
    patanjali: 'disciplines-side-track',
    vasubandhu: 'disciplines-side-track',
    'william-james': 'experience-side-track',
    husserl: 'experience-side-track',
    'merleau-ponty': 'merleau-far-track',
    anscombe: 'anscombe-side-track',
    'thomas-nagel': 'nagel-side-track',
    'derek-parfit': 'parfit-far-track',
  },
  ['derek-parfit'],
);

const entryViews: readonly MuseumRoomEntryView[] = [
  {spatialCellId: 'disciplines-mind-self-room', pose: {x: 0, z: -4.5, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['patanjali', 'vasubandhu']},
  {spatialCellId: 'experience-embodiment-room', pose: {x: 0, z: -21.5, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['william-james', 'husserl', 'merleau-ponty']},
  {spatialCellId: 'action-personhood-room', pose: {x: 0, z: -40.5, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['anscombe', 'thomas-nagel', 'derek-parfit']},
];

const guidedWalkLegs: readonly MuseumGuidedWalkLeg[] = [
  {fromExhibitId: 'patanjali', toExhibitId: 'vasubandhu', waypoints: []},
  {fromExhibitId: 'vasubandhu', toExhibitId: 'william-james', waypoints: [{x: 2.5, z: -16}, {x: 2.5, z: -22.5}, {x: 0, z: -27}]},
  {fromExhibitId: 'william-james', toExhibitId: 'husserl', waypoints: []},
  {fromExhibitId: 'husserl', toExhibitId: 'merleau-ponty', waypoints: [{x: 2.5, z: -33.5}, {x: -2.5, z: -33.5}]},
  {fromExhibitId: 'merleau-ponty', toExhibitId: 'anscombe', waypoints: [{x: 0, z: -34.5}, {x: 0, z: -41.5}, {x: 4, z: -46}]},
  {fromExhibitId: 'anscombe', toExhibitId: 'thomas-nagel', waypoints: [{x: 3, z: -51.5}, {x: -3, z: -51.5}]},
  {fromExhibitId: 'thomas-nagel', toExhibitId: 'derek-parfit', waypoints: []},
];

const primaryCirculation: MuseumCirculationPath = {
  id: 'mind-consciousness-self-spine',
  clearanceRadius: .75,
  points: [
    {x: 0, z: -.8}, {x: 0, z: -12}, {x: 0, z: -19.5}, {x: 0, z: -29},
    {x: 0, z: -38.5}, {x: 0, z: -47.5}, {x: 0, z: -51.8},
  ],
};

const signs: readonly MuseumSignDefinition[] = [
  {id: 'gallery-06-entrance', kind: 'entrance', title: 'Mind, Consciousness, and the Self', kicker: 'Gallery 06 · ancient–contemporary', subtitle: 'Discipline · experience · embodiment · personhood', position: {x: 0, y: 4.7, z: -3.76}, rotationY: 0, width: 4.9, height: .52},
  {id: 'experience-zone', kind: 'zone', title: 'Experience, Intentionality & Embodiment', kicker: 'Zone II · 19th–20th centuries', subtitle: 'Stream · aboutness · lived perception', position: {x: 0, y: 4.62, z: -20.76}, rotationY: 0, width: 4.8, height: .46},
  {id: 'personhood-zone', kind: 'zone', title: 'Action, Consciousness & Personhood', kicker: 'Zone III · 20th–21st centuries', subtitle: 'Intention · subjectivity · identity', position: {x: 0, y: 4.62, z: -39.76}, rotationY: 0, width: 4.6, height: .46},
  {id: 'museum-journey-end', kind: 'wayfinding', title: 'Museum Journey Complete', kicker: 'Six galleries · forty-eight encounters', subtitle: 'Use the directory to revisit any hall', position: {x: 0, y: 4.25, z: -55.76}, rotationY: 0, width: 3.5, height: .42},
];

export const MIND_CONSCIOUSNESS_SELF_HALL_LAYOUT: MuseumHallLayout = {
  id: hall.id,
  title: hall.title,
  eyeHeight: EYE_HEIGHT,
  playerRadius: .38,
  bounds: {minX: -12, maxX: 12, minZ: -56, maxZ: .6},
  floorArea: 1108.4,
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

export const MIND_CONSCIOUSNESS_SELF_HALL_DEFINITION: MuseumHallDefinition = {
  id: hall.id,
  worldTransform: {x: 149, z: -159.5, yaw: -Math.PI / 2},
  layout: MIND_CONSCIOUSNESS_SELF_HALL_LAYOUT,
  entrances: [
    {
      id: 'ethics-threshold',
      position: {x: 0, z: 0},
      inwardNormal: {x: 0, z: -1},
      arrivalPose: {x: 0, z: -.8, yaw: 0, pitch: 0},
      transitionBounds: {center: {x: 0, z: 0}, size: {width: 4, depth: 1.2}},
    },
  ],
  connections: [
    {id: 'mind-to-ethics', targetHallId: 'ethics-justice-political-life', localEntranceId: 'ethics-threshold', targetEntranceId: 'mind-threshold'},
  ],
  prefetch: {
    entrySceneAssetIds: [
      'patanjali-statue', 'patanjali-yoga-sutra-manuscript',
      'vasubandhu-statue', 'vasubandhu-abhidharmakosha-manuscript',
    ],
    sceneAssetIds: hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]),
    adjacentHallIds: ['ethics-justice-political-life'],
  },
  fallbackLabel: 'Mind, Consciousness, and the Self gallery directory',
};
