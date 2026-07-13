import {
  getMuseumHallCatalog,
  type MuseumExhibitId,
} from '../museumCatalog';
import type {
  MuseumCollider,
  MuseumExhibitLayout,
  MuseumHallDefinition,
  MuseumHallLayout,
  MuseumInstallationSceneDefinition,
  MuseumMediaMountDefinition,
  MuseumMediaMountKind,
  MuseumPlaqueDefinition,
  MuseumPoint,
  MuseumPoint3,
  MuseumSceneVolume,
  MuseumSceneVolumeRole,
  MuseumSize3,
} from './museumWorldTypes';

export type {
  MuseumBounds,
  MuseumCollider,
  MuseumExhibitLayout,
  MuseumHallLayout,
  MuseumPoint,
  MuseumPose,
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
  const supportHeight = kind === 'wall-frame'
    ? 0
    : position[1] - height / 2 - footHalfHeight - contactY;
  const supportTop = position[1] - height / 2;
  const supportWidth = kind === 'lectern'
    ? Math.max(.56, width * .72)
    : kind === 'wall-frame'
      ? width * .64 + .055
      : width * .62 + .32;
  const supportBounds = kind === 'wall-frame'
    ? volume(`${id}-support`, 'media', {x: position[0], y: position[1], z: position[2] - .17}, {
      width: supportWidth,
      height: height * .72,
      depth: .28,
    })
    : volume(`${id}-support`, 'media', {x: position[0], y: (contactY + supportTop) / 2, z: position[2] + .02}, {
      width: supportWidth,
      height: supportTop - contactY,
      depth: .42,
    });
  return {
    id,
    assetId,
    kind,
    position,
    rotation,
    width,
    height,
    frameDepth: .14,
    supportHeight,
    anchorId: anchor.id,
    bounds: volume(`${id}-bounds`, 'media', {x: position[0], y: position[1], z: position[2]}, {
      width: width + .18,
      height: height + .18,
      depth: kind === 'lectern' ? .5 : .22,
    }),
    supportBounds,
  };
};

const plaque = (
  id: string,
  position: readonly [number, number, number],
  width: number,
  height: number,
  rotation: readonly [number, number, number] = [-.2, 0, 0],
): MuseumPlaqueDefinition => {
  const contactY = 0;
  const supportTop = position[1] - height / 2;
  const supportHeight = supportTop - .04 - contactY;
  return {
    id,
    position,
    rotation,
    width,
    height,
    supportHeight,
    anchorId: 'gallery-floor',
    bounds: volume(`${id}-bounds`, 'plaque', {x: position[0], y: position[1], z: position[2]}, {
      width: width + .16,
      height: height + .14,
      depth: .28,
    }),
    supportBounds: volume(`${id}-support`, 'plaque', {x: position[0], y: (contactY + supportTop) / 2, z: position[2] + .02}, {
      width: .7,
      height: supportTop - contactY,
      depth: .42,
    }),
  };
};

const philosopherScene = (
  id: 'socrates' | 'plato' | 'aristotle',
  principalAssetId: MuseumMediaMountDefinition['assetId'],
  supportingAssetId: MuseumMediaMountDefinition['assetId'],
  principalHeight: number,
  supportingWidth: number,
  supportingHeight: number,
): MuseumInstallationSceneDefinition => {
  const base = volume(`${id}-plinth`, 'base', {x: 0, y: .2, z: 0}, {width: 2.9, height: .4, depth: 1.45});
  const concept = volume(`${id}-concept`, 'concept-object', {x: -.62, y: .77, z: .56}, {width: .72, height: .46, depth: .3});
  return {
    footprint: {width: 3.25, height: 3.55, depth: 2.82},
    mediaMounts: [
      media(`${id}-principal-frame`, principalAssetId, 'recess-frame', [-.52, 2.05, -.24], [0, 0, 0], 1.14, principalHeight, base),
      media(`${id}-support-lectern`, supportingAssetId, 'lectern', [.78, 1.12, .35], [-.34, -.12, 0], supportingWidth, supportingHeight, base),
    ],
    plaque: plaque(`${id}-plaque`, [0, .58, 1.18], 1.55, .46),
    objectBounds: [base, concept],
    focalTarget: {x: -.35, y: 1.75, z: 0},
    interactionBounds: volume(`${id}-interaction`, 'principal-object', {x: 0, y: 1.65, z: .15}, {width: 3.2, height: 3.3, depth: 2.2}),
  };
};

const sceneDefinitions: Record<MuseumExhibitId, MuseumInstallationSceneDefinition> = {
  socrates: philosopherScene('socrates', 'socrates-louvre-head', 'socrates-death-of-socrates', 1.52, 1.02, .67),
  plato: philosopherScene('plato', 'plato-capitoline-bust', 'plato-school-of-athens', 1.71, 1.04, .68),
  aristotle: philosopherScene('aristotle', 'aristotle-altemps-bust', 'aristotle-athenian-constitution-papyrus', 1.53, 1.22, .36),
  cynicism: (() => {
    const base = volume('cynicism-plinth', 'base', {x: 0, y: .2, z: 0}, {width: 3.3, height: .4, depth: 1.9});
    return {
      footprint: {width: 3.65, height: 3.25, depth: 3.22},
      mediaMounts: [
        media('cynicism-diogenes-panel', 'cynicism-diogenes-walters', 'freestanding-panel', [-1.08, 2.02, -.48], [0, .08, 0], 1.02, .75, base),
        media('cynicism-alexander-panel', 'cynicism-alexander-and-diogenes', 'freestanding-panel', [1.08, 2.02, -.48], [0, -.08, 0], 1.02, .73, base),
      ],
      plaque: plaque('cynicism-plaque', [0, .63, 1.38], 1.62, .48),
      objectBounds: [
        base,
        volume('cynicism-pithos', 'principal-object', {x: 0, y: 1.18, z: .18}, {width: 1.22, height: 1.56, depth: 1.08}),
        volume('cynicism-lamp', 'concept-object', {x: -.78, y: .77, z: .56}, {width: .42, height: .68, depth: .3}),
      ],
      focalTarget: {x: 0, y: 1.35, z: .15},
      interactionBounds: volume('cynicism-interaction', 'principal-object', {x: 0, y: 1.55, z: .1}, {width: 3.6, height: 3.1, depth: 2.7}),
    };
  })(),
  epicureanism: (() => {
    const base = volume('epicureanism-plinth', 'base', {x: 0, y: .18, z: 0}, {width: 2.78, height: .36, depth: 2.4});
    return {
      footprint: {width: 3.45, height: 3.3, depth: 3.52},
      mediaMounts: [
        media('epicureanism-herm-panel', 'epicureanism-double-herm', 'freestanding-panel', [-.92, 1.78, -.28], [0, .08, 0], .9, 1.2, base),
        media('epicureanism-lucretius-lectern', 'epicureanism-lucretius-manuscript', 'lectern', [1.02, 1.24, .34], [-.4, -.08, 0], .72, 1.09, base),
      ],
      plaque: plaque('epicureanism-plaque', [0, .62, 1.53], 1.62, .48),
      objectBounds: [
        base,
        volume('epicureanism-atom-case', 'concept-object', {x: 0, y: .78, z: .58}, {width: 1.1, height: .72, depth: .72}),
      ],
      focalTarget: {x: -.25, y: 1.45, z: .05},
      interactionBounds: volume('epicureanism-interaction', 'principal-object', {x: 0, y: 1.55, z: .1}, {width: 3.4, height: 3.1, depth: 3.15}),
    };
  })(),
  stoicism: (() => {
    const base = volume('stoicism-plinth', 'base', {x: 0, y: .22, z: 0}, {width: 3.05, height: .44, depth: 1.65});
    return {
      footprint: {width: 3.35, height: 3.25, depth: 2.82},
      mediaMounts: [
        media('stoicism-zeno-panel', 'stoicism-zeno-naples', 'freestanding-panel', [-.9, 1.78, -.3], [0, .06, 0], .9, 1.35, base),
        media('stoicism-marcus-panel', 'stoicism-marcus-aurelius-bust', 'freestanding-panel', [.9, 1.68, -.3], [0, -.06, 0], .9, 1.11, base),
      ],
      plaque: plaque('stoicism-plaque', [0, .61, 1.18], 1.62, .48),
      objectBounds: [
        base,
        volume('stoicism-control-relief', 'concept-object', {x: 0, y: .78, z: .53}, {width: 1.15, height: .62, depth: .16}),
      ],
      focalTarget: {x: 0, y: 1.55, z: 0},
      interactionBounds: volume('stoicism-interaction', 'principal-object', {x: 0, y: 1.5, z: .08}, {width: 3.3, height: 3, depth: 2.45}),
    };
  })(),
  skepticism: (() => {
    const base = volume('skepticism-plinth', 'base', {x: 0, y: .18, z: 0}, {width: 3.05, height: .36, depth: 1.72});
    return {
      footprint: {width: 3.4, height: 3.25, depth: 3.18},
      mediaMounts: [
        media('skepticism-sextus-panel', 'skepticism-sextus-riedel', 'freestanding-panel', [-.98, 1.78, -.34], [0, .07, 0], .82, 1.13, base),
        media('skepticism-text-lectern', 'skepticism-adversus-mathematicos', 'lectern', [1.02, 1.24, .22], [-.4, -.07, 0], .72, 1.11, base),
      ],
      plaque: plaque('skepticism-plaque', [0, .62, 1.36], 1.62, .48),
      objectBounds: [
        base,
        volume('skepticism-balance', 'concept-object', {x: 0, y: .91, z: .58}, {width: 1.2, height: 1.08, depth: .38}),
      ],
      focalTarget: {x: -.2, y: 1.5, z: .05},
      interactionBounds: volume('skepticism-interaction', 'principal-object', {x: 0, y: 1.5, z: .08}, {width: 3.35, height: 3, depth: 2.7}),
    };
  })(),
  neoplatonism: (() => {
    const base = volume('neoplatonism-plinth', 'base', {x: 0, y: .22, z: 0}, {width: 5.25, height: .44, depth: 3.25});
    const wall = volume('neoplatonism-end-wall', 'base', {x: 0, y: 2.25, z: -1.48}, {width: 5.25, height: 4.1, depth: .24});
    return {
      footprint: {width: 5.85, height: 4.55, depth: 4.5},
      mediaMounts: [
        media('neoplatonism-plotinus-frame', 'neoplatonism-plotinus-ostia', 'wall-frame', [-1.85, 2.45, -1.28], [0, 0, 0], 1.1, 1.69, wall),
        media('neoplatonism-ficino-frame', 'neoplatonism-ficino-enneads', 'wall-frame', [1.85, 2.45, -1.28], [0, 0, 0], 1.1, 1.52, wall),
      ],
      plaque: plaque('neoplatonism-plaque', [0, .68, 1.96], 2.38, .56),
      objectBounds: [
        base,
        wall,
        volume('neoplatonism-emanation-relief', 'concept-object', {x: 0, y: 2.18, z: -1.28}, {width: 2.12, height: 2.12, depth: .22}),
      ],
      focalTarget: {x: 0, y: 2.15, z: -1.1},
      interactionBounds: volume('neoplatonism-interaction', 'principal-object', {x: 0, y: 2.1, z: -.15}, {width: 5.8, height: 4.2, depth: 4.2}),
    };
  })(),
};

export const ANCIENT_GREEK_HALL_COLUMN_POSITIONS = [
  [-8.62, 27], [8.62, 27],
  [-8.62, 23], [8.62, 23],
  [-8.62, 18], [8.62, 18],
  [-8.62, 13], [8.62, 13],
  [-8.62, 6], [8.62, 6],
  [-8.62, 1], [8.62, 1],
  [-8.62, -5], [8.62, -5],
  [-8.62, -10.5], [8.62, -10.5],
  [-8.62, -18], [8.62, -18],
  [-8.62, -24], [8.62, -24],
] as const;

const hall = getMuseumHallCatalog('ancient-greek');
if (!hall) throw new Error('The ancient Greek Museum catalog is missing.');

type Placement = Omit<MuseumExhibitLayout, 'id' | 'zoneId' | 'collider' | 'scene'>;

const placement: Record<MuseumExhibitId, Placement> = {
  socrates: {position: {x: -6.9, z: 21.5}, rotationY: Math.PI / 2, interactionRadius: 3.4, viewpoint: {x: -3.95, z: 21.5, yaw: Math.PI / 2, pitch: 0}},
  plato: {position: {x: 6.9, z: 16.5}, rotationY: -Math.PI / 2, interactionRadius: 3.4, viewpoint: {x: 3.95, z: 16.5, yaw: -Math.PI / 2, pitch: 0}},
  aristotle: {position: {x: -6.9, z: 11.5}, rotationY: Math.PI / 2, interactionRadius: 3.4, viewpoint: {x: -3.95, z: 11.5, yaw: Math.PI / 2, pitch: 0}},
  cynicism: {position: {x: 6.75, z: 5.5}, rotationY: -Math.PI / 2, interactionRadius: 3.7, viewpoint: {x: 3.55, z: 5.5, yaw: -Math.PI / 2, pitch: -.03}},
  epicureanism: {position: {x: -6.75, z: 0}, rotationY: Math.PI / 2, interactionRadius: 3.7, viewpoint: {x: -3.45, z: 0, yaw: Math.PI / 2, pitch: -.03}},
  stoicism: {position: {x: 6.75, z: -5.5}, rotationY: -Math.PI / 2, interactionRadius: 3.6, viewpoint: {x: 3.55, z: -5.5, yaw: -Math.PI / 2, pitch: -.03}},
  skepticism: {position: {x: -6.75, z: -11}, rotationY: Math.PI / 2, interactionRadius: 3.7, viewpoint: {x: -3.45, z: -11, yaw: Math.PI / 2, pitch: -.03}},
  neoplatonism: {position: {x: 0, z: -27.65}, rotationY: 0, interactionRadius: 5, viewpoint: {x: 0, z: -22.8, yaw: 0, pitch: -.08}},
};

const perimeter: MuseumCollider[] = [
  {id: 'wall-west', center: {x: -9.7, z: 0}, size: {width: .8, depth: 66}, rotation: 0},
  {id: 'wall-east', center: {x: 9.7, z: 0}, size: {width: .8, depth: 66}, rotation: 0},
  {id: 'wall-north', center: {x: 0, z: -31.7}, size: {width: 20, depth: .8}, rotation: 0},
  {id: 'wall-south', center: {x: 0, z: 31.7}, size: {width: 20, depth: .8}, rotation: 0},
  {id: 'arch-classical-left', center: {x: -6.65, z: 9}, size: {width: 5.3, depth: .6}, rotation: 0},
  {id: 'arch-classical-right', center: {x: 6.65, z: 9}, size: {width: 5.3, depth: .6}, rotation: 0},
  {id: 'arch-late-left', center: {x: -6.65, z: -14}, size: {width: 5.3, depth: .6}, rotation: 0},
  {id: 'arch-late-right', center: {x: 6.65, z: -14}, size: {width: 5.3, depth: .6}, rotation: 0},
];

const colliderFromScene = (
  id: MuseumExhibitId,
  position: MuseumPoint,
  rotation: number,
  scene: MuseumInstallationSceneDefinition,
): MuseumCollider => ({
  id: `exhibit-${id}`,
  center: position,
  size: {width: scene.footprint.width, depth: scene.footprint.depth},
  rotation,
});

const exhibitLayouts = hall.exhibits.map((exhibit) => {
  const authored = placement[exhibit.id];
  const scene = sceneDefinitions[exhibit.id];
  return {
    id: exhibit.id,
    zoneId: exhibit.zoneId,
    ...authored,
    scene,
    collider: colliderFromScene(exhibit.id, authored.position, authored.rotationY, scene),
  };
});

export const ANCIENT_GREEK_HALL_LAYOUT: MuseumHallLayout = {
  id: hall.id,
  title: hall.title,
  eyeHeight: 1.68,
  playerRadius: .38,
  bounds: {minX: -9.3, maxX: 9.3, minZ: -31.3, maxZ: 31.3},
  spawn: {x: 0, z: 28.6, yaw: 0, pitch: 0},
  reset: {x: 0, z: 28.6, yaw: 0, pitch: 0},
  wallColliders: perimeter,
  obstacleColliders: [
    ...exhibitLayouts.map(({collider}) => collider),
    ...ANCIENT_GREEK_HALL_COLUMN_POSITIONS.map(([x, z], index) => ({
      id: `column-${index + 1}`,
      center: {x, z},
      size: {width: 1.44, depth: 1.44},
      rotation: 0,
    })),
  ],
  exhibits: exhibitLayouts,
  guidedOrder: hall.guidedOrder,
};

export const ANCIENT_GREEK_HALL_DEFINITION: MuseumHallDefinition = {
  id: hall.id,
  worldTransform: {x: 0, z: 0, yaw: 0},
  layout: ANCIENT_GREEK_HALL_LAYOUT,
  entrances: [{
    id: 'south-entry',
    position: {x: 0, z: 30.4},
    arrivalPose: {...ANCIENT_GREEK_HALL_LAYOUT.spawn},
    transitionBounds: {center: {x: 0, z: 30.2}, size: {width: 3.2, depth: 1.6}},
  }],
  connections: [],
  prefetch: {
    sceneAssetIds: hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]),
    adjacentHallIds: [],
  },
  fallbackLabel: 'Ancient Greek and Hellenistic gallery directory',
};
