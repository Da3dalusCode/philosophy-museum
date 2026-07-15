import {
  getMuseumHallCatalog,
  type ModernityFreedomCritiqueExhibitId,
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

const hall = getMuseumHallCatalog('modernity-freedom-critique');
const EYE_HEIGHT = 1.68;

const sceneConfig: Record<ModernityFreedomCritiqueExhibitId, ContemporarySceneConfig> = {
  kierkegaard: {
    principal: {assetId: 'kierkegaard-royal-library-portrait', width: .9, height: 1.34},
    support: {assetId: 'kierkegaard-fragments-manuscript', width: 1.12, height: .79, kind: 'wall-frame'},
  },
  marx: {
    principal: {assetId: 'marx-mayall-portrait', width: .92, height: 1.42},
    support: {assetId: 'marx-capital-1867', width: .76, height: 1.13},
  },
  nietzsche: {
    principal: {assetId: 'nietzsche-schultze-1882', width: .92, height: 1.42},
    support: {assetId: 'nietzsche-zarathustra-1883', width: .76, height: 1.12},
  },
  heidegger: {
    principal: {assetId: 'heidegger-wetterauer-portrait', width: 1.08, height: 1.36},
    support: {assetId: 'heidegger-pragher-lecture-1954', width: 1.18, height: .76, kind: 'wall-frame'},
  },
  sartre: {
    principal: {assetId: 'sartre-anefo-1965', width: .94, height: 1.4},
    support: {assetId: 'sartre-beauvoir-balzac', width: .78, height: 1.16},
  },
  beauvoir: {
    principal: {assetId: 'beauvoir-gpo-1967', width: .96, height: 1.38},
    support: {assetId: 'beauvoir-suffrage-poster-1924', width: .78, height: 1.08},
  },
  camus: {
    principal: {assetId: 'camus-loc-1957', width: 1.02, height: 1.34},
    support: {assetId: 'camus-combat-1943', width: .76, height: 1.14},
  },
  foucault: {
    principal: {assetId: 'foucault-portugal-1968', width: .84, height: 1.42},
    support: {assetId: 'foucault-panopticon-plan', width: 1.08, height: 1.16, kind: 'wall-frame'},
  },
};

const scenes = createContemporaryScenes(sceneConfig);

const placements: Record<ModernityFreedomCritiqueExhibitId, ContemporaryPlacement> = {
  kierkegaard: {zoneId: 'faith-alienation-crisis', spatialCellId: 'faith-alienation-room', position: {x: -8.35, z: -12.7}, rotationY: Math.PI / 2},
  marx: {zoneId: 'faith-alienation-crisis', spatialCellId: 'faith-alienation-room', position: {x: 8.35, z: -12.7}, rotationY: -Math.PI / 2},
  nietzsche: {zoneId: 'existence-freedom-absurd', spatialCellId: 'existence-room', position: {x: -9.35, z: -30.3}, rotationY: Math.PI / 2},
  heidegger: {zoneId: 'existence-freedom-absurd', spatialCellId: 'existence-room', position: {x: 9.35, z: -30.3}, rotationY: -Math.PI / 2},
  sartre: {zoneId: 'existence-freedom-absurd', spatialCellId: 'existence-room', position: {x: -9.35, z: -38.2}, rotationY: Math.PI / 2},
  beauvoir: {zoneId: 'existence-freedom-absurd', spatialCellId: 'existence-room', position: {x: 9.35, z: -38.2}, rotationY: -Math.PI / 2},
  camus: {zoneId: 'power-knowledge-institutions', spatialCellId: 'power-knowledge-room', position: {x: 8.35, z: -54.8}, rotationY: -Math.PI / 2},
  foucault: {zoneId: 'power-knowledge-institutions', spatialCellId: 'power-knowledge-room', position: {x: -8.35, z: -54.8}, rotationY: Math.PI / 2},
};

const exhibits = createContemporaryExhibitLayouts(scenes, placements, EYE_HEIGHT);

const spatialCells: readonly MuseumSpatialCell[] = [
  {id: 'early-modern-connection-passage', kind: 'passage', title: 'From Gallery 02', bounds: {minX: -2, maxX: 2, minZ: -4, maxZ: .6}, renderBounds: {minX: -2, maxX: 2, minZ: -4, maxZ: 0}, ceilingHeight: 5.2, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'faith-alienation-room', kind: 'room', title: 'Faith, Alienation, and Crisis', bounds: {minX: -10, maxX: 10, minZ: -18, maxZ: -4}, ceilingHeight: 5.8, exhibitIds: ['kierkegaard', 'marx'], lightingGroupId: 'crisis'},
  {id: 'crisis-threshold', kind: 'passage', title: 'Crisis Threshold', bounds: {minX: -3.5, maxX: 3.5, minZ: -21, maxZ: -18}, ceilingHeight: 5.1, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'existence-room', kind: 'room', title: 'Existence, Freedom, and the Absurd', bounds: {minX: -11, maxX: 11, minZ: -43, maxZ: -21}, ceilingHeight: 6.2, exhibitIds: ['nietzsche', 'heidegger', 'sartre', 'beauvoir'], lightingGroupId: 'existence'},
  {id: 'critique-threshold', kind: 'passage', title: 'Critique Threshold', bounds: {minX: -3.5, maxX: 3.5, minZ: -46, maxZ: -43}, ceilingHeight: 5.1, exhibitIds: [], lightingGroupId: 'threshold'},
  {id: 'power-knowledge-room', kind: 'room', title: 'Power, Knowledge, and Institutions', bounds: {minX: -10, maxX: 10, minZ: -61, maxZ: -46}, ceilingHeight: 6, exhibitIds: ['camus', 'foucault'], lightingGroupId: 'power-knowledge'},
  {id: 'logic-connection-passage', kind: 'passage', title: 'To Logic, Language, and Science', bounds: {minX: -2, maxX: 2, minZ: -64.6, maxZ: -61}, renderBounds: {minX: -2, maxX: 2, minZ: -64, maxZ: -61}, ceilingHeight: 5.2, exhibitIds: [], lightingGroupId: 'threshold'},
];

const spatialConnections: readonly MuseumSpatialConnection[] = [
  {id: 'early-modern-passage-to-crisis', fromCellId: 'early-modern-connection-passage', toCellId: 'faith-alienation-room', openingBounds: {minX: -2, maxX: 2, minZ: -4.2, maxZ: -3.8}},
  {id: 'crisis-to-threshold', fromCellId: 'faith-alienation-room', toCellId: 'crisis-threshold', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -18.2, maxZ: -17.8}},
  {id: 'threshold-to-existence', fromCellId: 'crisis-threshold', toCellId: 'existence-room', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -21.2, maxZ: -20.8}},
  {id: 'existence-to-critique-threshold', fromCellId: 'existence-room', toCellId: 'critique-threshold', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -43.2, maxZ: -42.8}},
  {id: 'critique-threshold-to-power', fromCellId: 'critique-threshold', toCellId: 'power-knowledge-room', openingBounds: {minX: -3.5, maxX: 3.5, minZ: -46.2, maxZ: -45.8}},
  {id: 'power-to-logic-passage', fromCellId: 'power-knowledge-room', toCellId: 'logic-connection-passage', openingBounds: {minX: -2, maxX: 2, minZ: -61.2, maxZ: -60.8}},
];

const walls: readonly MuseumWallDefinition[] = [
  museumWall('early-modern-passage-west', {x: -2, z: -1.7}, .36, 4.6, 5.2, {center: {x: -2, z: -2}, size: {width: .36, depth: 4}}),
  museumWall('early-modern-passage-east', {x: 2, z: -1.7}, .36, 4.6, 5.2, {center: {x: 2, z: -2}, size: {width: .36, depth: 4}}),
  museumWall('crisis-entry-west', {x: -6, z: -4}, 8, .36, 5.8),
  museumWall('crisis-entry-east', {x: 6, z: -4}, 8, .36, 5.8),
  museumWall('crisis-west', {x: -10, z: -11}, .36, 14.36, 5.8),
  museumWall('crisis-east', {x: 10, z: -11}, .36, 14.36, 5.8),
  museumWall('crisis-exit-west', {x: -6.75, z: -18}, 6.5, .36, 5.8),
  museumWall('crisis-exit-east', {x: 6.75, z: -18}, 6.5, .36, 5.8),
  museumWall('crisis-threshold-west', {x: -3.5, z: -19.5}, .36, 3.36, 5.1),
  museumWall('crisis-threshold-east', {x: 3.5, z: -19.5}, .36, 3.36, 5.1),
  museumWall('existence-entry-west', {x: -7.25, z: -21}, 7.5, .36, 6.2),
  museumWall('existence-entry-east', {x: 7.25, z: -21}, 7.5, .36, 6.2),
  museumWall('existence-west', {x: -11, z: -32}, .36, 22.36, 6.2),
  museumWall('existence-east', {x: 11, z: -32}, .36, 22.36, 6.2),
  museumWall('existence-exit-west', {x: -7.25, z: -43}, 7.5, .36, 6.2),
  museumWall('existence-exit-east', {x: 7.25, z: -43}, 7.5, .36, 6.2),
  museumWall('critique-threshold-west', {x: -3.5, z: -44.5}, .36, 3.36, 5.1),
  museumWall('critique-threshold-east', {x: 3.5, z: -44.5}, .36, 3.36, 5.1),
  museumWall('power-entry-west', {x: -6.75, z: -46}, 6.5, .36, 6),
  museumWall('power-entry-east', {x: 6.75, z: -46}, 6.5, .36, 6),
  museumWall('power-west', {x: -10, z: -53.5}, .36, 15.36, 6),
  museumWall('power-east', {x: 10, z: -53.5}, .36, 15.36, 6),
  museumWall('power-end-west', {x: -6, z: -61}, 8, .36, 6),
  museumWall('power-end-east', {x: 6, z: -61}, 8, .36, 6),
  museumWall('logic-passage-west', {x: -2, z: -62.8}, .36, 3.6, 5.2, {center: {x: -2, z: -62.5}, size: {width: .36, depth: 3}}),
  museumWall('logic-passage-east', {x: 2, z: -62.8}, .36, 3.6, 5.2, {center: {x: 2, z: -62.5}, size: {width: .36, depth: 3}}),
];

const furnishings: readonly MuseumFurnishingDefinition[] = [
  {id: 'existence-bench', kind: 'bench', center: {x: 5.5, z: -25.2}, size: {width: 2.8, depth: .72}, rotation: Math.PI / 2, height: .5},
];

const tracks: readonly MuseumTrackDefinition[] = [
  {id: 'crisis-side-track', center: {x: 0, y: 5.45, z: -12.7}, size: {width: 16, height: .08, depth: .08}},
  {id: 'existence-north-track', center: {x: 0, y: 5.85, z: -30.3}, size: {width: 18, height: .08, depth: .08}},
  {id: 'existence-south-track', center: {x: 0, y: 5.85, z: -38.2}, size: {width: 18, height: .08, depth: .08}},
  {id: 'power-side-track', center: {x: 0, y: 5.65, z: -54.8}, size: {width: 18, height: .08, depth: .08}},
];

const lights = createContemporaryExhibitLights<ModernityFreedomCritiqueExhibitId>(
  exhibits,
  tracks,
  {
    kierkegaard: 'crisis-side-track',
    marx: 'crisis-side-track',
    nietzsche: 'existence-north-track',
    heidegger: 'existence-north-track',
    sartre: 'existence-south-track',
    beauvoir: 'existence-south-track',
    camus: 'power-side-track',
    foucault: 'power-side-track',
  },
  ['foucault'],
);

const entryViews: readonly MuseumRoomEntryView[] = [
  {spatialCellId: 'faith-alienation-room', pose: {x: 0, z: -5.1, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['kierkegaard', 'marx']},
  {spatialCellId: 'existence-room', pose: {x: 0, z: -22.1, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['nietzsche', 'heidegger', 'sartre', 'beauvoir']},
  {spatialCellId: 'power-knowledge-room', pose: {x: 0, z: -47.1, yaw: 0, pitch: -.01}, expectedVisibleExhibitIds: ['camus', 'foucault']},
];

const guidedWalkLegs: readonly MuseumGuidedWalkLeg[] = [
  {fromExhibitId: 'kierkegaard', toExhibitId: 'marx', waypoints: []},
  {fromExhibitId: 'marx', toExhibitId: 'nietzsche', waypoints: [{x: 2.4, z: -16}, {x: 2.4, z: -22.5}, {x: 0, z: -27}]},
  {fromExhibitId: 'nietzsche', toExhibitId: 'heidegger', waypoints: []},
  {fromExhibitId: 'heidegger', toExhibitId: 'sartre', waypoints: [{x: 2.5, z: -34.2}, {x: -2.5, z: -34.2}]},
  {fromExhibitId: 'sartre', toExhibitId: 'beauvoir', waypoints: []},
  {fromExhibitId: 'beauvoir', toExhibitId: 'camus', waypoints: [{x: 2.5, z: -41.5}, {x: 2.5, z: -47.5}, {x: 4, z: -51.5}]},
  {fromExhibitId: 'camus', toExhibitId: 'foucault', waypoints: []},
];

const primaryCirculation: MuseumCirculationPath = {
  id: 'modernity-freedom-critique-spine',
  clearanceRadius: .75,
  points: [
    {x: 0, z: -.8}, {x: 0, z: -12}, {x: 0, z: -19.5}, {x: 0, z: -28},
    {x: 0, z: -34.3}, {x: 0, z: -44.5}, {x: 0, z: -52.5}, {x: 0, z: -58},
    {x: 0, z: -63.8},
  ],
};

const signs: readonly MuseumSignDefinition[] = [
  {id: 'gallery-03-entrance', kind: 'entrance', title: 'Modernity, Freedom, and Critique', kicker: 'Gallery 03 · 19th–20th centuries', subtitle: 'Crisis · existence · responsibility · power', position: {x: 0, y: 4.7, z: -3.76}, rotationY: 0, width: 4.7, height: .52},
  {id: 'existence-zone', kind: 'zone', title: 'Existence, Freedom & the Absurd', kicker: 'Zone II · 19th–20th centuries', subtitle: 'Value · being · bad faith · situated freedom', position: {x: 0, y: 4.62, z: -20.76}, rotationY: 0, width: 4.4, height: .46},
  {id: 'power-zone', kind: 'zone', title: 'Power, Knowledge & Institutions', kicker: 'Zone III · 20th century', subtitle: 'Revolt · discipline · subject formation', position: {x: 0, y: 4.62, z: -45.76}, rotationY: 0, width: 4.3, height: .46},
  {id: 'gallery-04-wayfinding', kind: 'wayfinding', title: 'Continue to Gallery 04', kicker: 'Logic, Language, and Science', subtitle: 'Proceed through the south threshold', position: {x: 0, y: 4.25, z: -60.76}, rotationY: 0, width: 3.35, height: .42},
];

export const MODERNITY_FREEDOM_CRITIQUE_HALL_LAYOUT: MuseumHallLayout = {
  id: hall.id,
  title: hall.title,
  eyeHeight: EYE_HEIGHT,
  playerRadius: .38,
  bounds: {minX: -11, maxX: 11, minZ: -64.6, maxZ: .6},
  floorArea: 1138.8,
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

export const MODERNITY_FREEDOM_CRITIQUE_HALL_DEFINITION: MuseumHallDefinition = {
  id: hall.id,
  worldTransform: {x: 67, z: -46.5, yaw: 0},
  layout: MODERNITY_FREEDOM_CRITIQUE_HALL_LAYOUT,
  entrances: [
    {
      id: 'early-modern-threshold',
      position: {x: 0, z: 0},
      inwardNormal: {x: 0, z: -1},
      arrivalPose: {x: 0, z: -.8, yaw: 0, pitch: 0},
      transitionBounds: {center: {x: 0, z: 0}, size: {width: 4, depth: 1.2}},
    },
    {
      id: 'logic-threshold',
      position: {x: 0, z: -64},
      inwardNormal: {x: 0, z: 1},
      arrivalPose: {x: 0, z: -63.2, yaw: Math.PI, pitch: 0},
      transitionBounds: {center: {x: 0, z: -64}, size: {width: 4, depth: 1.2}},
    },
  ],
  connections: [
    {
      id: 'modernity-to-renaissance',
      targetHallId: 'renaissance-reason-revolution',
      localEntranceId: 'early-modern-threshold',
      targetEntranceId: 'modernity-threshold',
    },
    {
      id: 'modernity-to-logic',
      targetHallId: 'logic-language-science',
      localEntranceId: 'logic-threshold',
      targetEntranceId: 'modernity-threshold',
    },
  ],
  prefetch: {
    entrySceneAssetIds: [
      'kierkegaard-royal-library-portrait', 'kierkegaard-fragments-manuscript',
      'marx-mayall-portrait', 'marx-capital-1867',
      'camus-loc-1957', 'camus-combat-1943',
      'foucault-portugal-1968', 'foucault-panopticon-plan',
    ],
    sceneAssetIds: hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]),
    adjacentHallIds: ['renaissance-reason-revolution', 'logic-language-science'],
  },
  fallbackLabel: 'Modernity, Freedom, and Critique gallery directory',
};
