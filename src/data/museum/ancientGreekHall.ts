import {
  getMuseumHallCatalog,
  type MuseumExhibitId,
} from '../museumCatalog';
import type {
  MuseumCollider,
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
    frameDepth: .12,
    supportHeight,
    anchorId: anchor.id,
    bounds: volume(`${id}-bounds`, 'media', {x: position[0], y: position[1], z: position[2]}, {
      width: width + .2,
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
  const supportTop = position[1] - height / 2;
  const supportHeight = supportTop - .04;
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
    supportBounds: volume(`${id}-support`, 'plaque', {x: position[0], y: supportTop / 2, z: position[2] + .02}, {
      width: .62,
      height: supportTop,
      depth: .4,
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
  const base = volume(`${id}-plinth`, 'base', {x: 0, y: .14, z: 0}, {width: 2.2, height: .28, depth: 1.02});
  const backing = volume(`${id}-backing`, 'base', {x: 0, y: 1.85, z: -.6}, {width: 2.65, height: 3.35, depth: .16});
  const concept = volume(`${id}-concept`, 'concept-object', {x: -.52, y: .55, z: .3}, {width: .56, height: .36, depth: .24});
  return {
    footprint: {width: 2.75, height: 3.55, depth: 2.35},
    mediaMounts: [
      media(`${id}-principal-frame`, principalAssetId, 'wall-frame', [-.4, 2.05, -.48], [0, 0, 0], 1.16, principalHeight * 1.32, backing),
      media(`${id}-support-lectern`, supportingAssetId, 'lectern', [.78, .95, .2], [-.34, -.1, 0], supportingWidth, supportingHeight, base),
    ],
    plaque: plaque(`${id}-plaque`, [0, .46, .9], 1.22, .34),
    objectBounds: [base, backing, concept],
    focalTarget: {x: -.22, y: 1.72, z: -.18},
    interactionBounds: volume(`${id}-interaction`, 'principal-object', {x: 0, y: 1.55, z: .05}, {width: 2.7, height: 3.1, depth: 2.2}),
  };
};

const sceneDefinitions: Record<MuseumExhibitId, MuseumInstallationSceneDefinition> = {
  socrates: philosopherScene('socrates', 'socrates-louvre-head', 'socrates-death-of-socrates', 1.14, .76, .5),
  plato: philosopherScene('plato', 'plato-capitoline-bust', 'plato-school-of-athens', 1.27, .78, .51),
  aristotle: philosopherScene('aristotle', 'aristotle-altemps-bust', 'aristotle-athenian-constitution-papyrus', 1.15, .86, .26),
  cynicism: (() => {
    const base = volume('cynicism-plinth', 'base', {x: 0, y: .14, z: -.02}, {width: 2.65, height: .28, depth: 1.35});
    const backing = volume('cynicism-backing', 'base', {x: 0, y: 1.8, z: -.75}, {width: 2.9, height: 3.2, depth: .16});
    return {
      footprint: {width: 3.05, height: 3.45, depth: 2.55},
      mediaMounts: [
        media('cynicism-diogenes-panel', 'cynicism-diogenes-walters', 'wall-frame', [-.78, 2.08, -.63], [0, .03, 0], .92, .68, backing),
        media('cynicism-alexander-panel', 'cynicism-alexander-and-diogenes', 'wall-frame', [.78, 2.08, -.63], [0, -.03, 0], .92, .65, backing),
      ],
      plaque: plaque('cynicism-plaque', [0, .48, 1], 1.18, .34),
      objectBounds: [
        base,
        backing,
        volume('cynicism-pithos', 'principal-object', {x: 0, y: 1.04, z: .08}, {width: 1.22, height: 1.52, depth: 1.08}),
        volume('cynicism-lamp', 'concept-object', {x: -.66, y: .6, z: .42}, {width: .36, height: .54, depth: .26}),
      ],
      focalTarget: {x: 0, y: 1.32, z: -.02},
      interactionBounds: volume('cynicism-interaction', 'principal-object', {x: 0, y: 1.5, z: 0}, {width: 3, height: 3, depth: 2.45}),
    };
  })(),
  epicureanism: (() => {
    const base = volume('epicureanism-plinth', 'base', {x: 0, y: .13, z: 0}, {width: 2.2, height: .26, depth: 1.45});
    const backing = volume('epicureanism-backing', 'base', {x: 0, y: 1.8, z: -.8}, {width: 2.8, height: 3.15, depth: .16});
    return {
      footprint: {width: 3.05, height: 3.4, depth: 2.75},
      mediaMounts: [
        media('epicureanism-herm-panel', 'epicureanism-double-herm', 'wall-frame', [-.58, 1.98, -.68], [0, .03, 0], .9, 1.2, backing),
        media('epicureanism-lucretius-lectern', 'epicureanism-lucretius-manuscript', 'lectern', [.65, 1.02, .12], [-.4, -.06, 0], .55, .83, base),
      ],
      plaque: plaque('epicureanism-plaque', [0, .47, 1.08], 1.2, .34),
      objectBounds: [
        base,
        backing,
        volume('epicureanism-atom-case', 'concept-object', {x: 0, y: .62, z: .35}, {width: .82, height: .54, depth: .55}),
      ],
      focalTarget: {x: -.2, y: 1.42, z: -.12},
      interactionBounds: volume('epicureanism-interaction', 'principal-object', {x: 0, y: 1.5, z: 0}, {width: 3, height: 3, depth: 2.65}),
    };
  })(),
  stoicism: (() => {
    const base = volume('stoicism-plinth', 'base', {x: 0, y: .13, z: 0}, {width: 2.25, height: .26, depth: 1.1});
    const backing = volume('stoicism-backing', 'base', {x: 0, y: 1.78, z: -.66}, {width: 2.58, height: 3.12, depth: .16});
    return {
      footprint: {width: 2.75, height: 3.4, depth: 2.35},
      mediaMounts: [
        media('stoicism-zeno-panel', 'stoicism-zeno-naples', 'wall-frame', [-.62, 2.02, -.54], [0, .025, 0], .86, 1.26, backing),
        media('stoicism-marcus-panel', 'stoicism-marcus-aurelius-bust', 'wall-frame', [.62, 1.94, -.54], [0, -.025, 0], .86, 1.03, backing),
      ],
      plaque: plaque('stoicism-plaque', [0, .46, .91], 1.18, .34),
      objectBounds: [
        base,
        backing,
        volume('stoicism-control-relief', 'concept-object', {x: 0, y: .59, z: .31}, {width: .9, height: .48, depth: .14}),
      ],
      focalTarget: {x: 0, y: 1.5, z: -.16},
      interactionBounds: volume('stoicism-interaction', 'principal-object', {x: 0, y: 1.45, z: 0}, {width: 2.7, height: 2.9, depth: 2.25}),
    };
  })(),
  skepticism: (() => {
    const base = volume('skepticism-plinth', 'base', {x: 0, y: .13, z: 0}, {width: 2.25, height: .26, depth: 1.2});
    const backing = volume('skepticism-backing', 'base', {x: 0, y: 1.8, z: -.7}, {width: 2.7, height: 3.15, depth: .16});
    return {
      footprint: {width: 2.85, height: 3.4, depth: 2.55},
      mediaMounts: [
        media('skepticism-sextus-panel', 'skepticism-sextus-riedel', 'wall-frame', [-.58, 2.02, -.58], [0, .025, 0], .9, 1.24, backing),
        media('skepticism-text-lectern', 'skepticism-adversus-mathematicos', 'lectern', [.65, 1.02, .1], [-.4, -.06, 0], .55, .84, base),
      ],
      plaque: plaque('skepticism-plaque', [0, .47, .96], 1.18, .34),
      objectBounds: [
        base,
        backing,
        volume('skepticism-balance', 'concept-object', {x: 0, y: .78, z: .3}, {width: 1.08, height: .94, depth: .34}),
      ],
      focalTarget: {x: -.15, y: 1.45, z: -.12},
      interactionBounds: volume('skepticism-interaction', 'principal-object', {x: 0, y: 1.45, z: 0}, {width: 2.8, height: 2.9, depth: 2.45}),
    };
  })(),
  neoplatonism: (() => {
    const base = volume('neoplatonism-plinth', 'base', {x: 0, y: .15, z: 0}, {width: 4.1, height: .3, depth: 2.4});
    const wall = volume('neoplatonism-end-wall', 'base', {x: 0, y: 2, z: -1.22}, {width: 4.65, height: 3.7, depth: .18});
    return {
      footprint: {width: 4.8, height: 4.2, depth: 3.8},
      mediaMounts: [
        media('neoplatonism-plotinus-frame', 'neoplatonism-plotinus-ostia', 'wall-frame', [-1.58, 2.18, -1.08], [0, 0, 0], 1.05, 1.6, wall),
        media('neoplatonism-ficino-frame', 'neoplatonism-ficino-enneads', 'wall-frame', [1.58, 2.18, -1.08], [0, 0, 0], 1.05, 1.45, wall),
      ],
      plaque: plaque('neoplatonism-plaque', [0, .54, 1.55], 1.72, .4),
      objectBounds: [
        base,
        wall,
        volume('neoplatonism-emanation-relief', 'concept-object', {x: 0, y: 1.98, z: -1.04}, {width: 1.72, height: 1.72, depth: .2}),
      ],
      focalTarget: {x: 0, y: 1.98, z: -.94},
      interactionBounds: volume('neoplatonism-interaction', 'principal-object', {x: 0, y: 1.9, z: -.05}, {width: 4.7, height: 3.8, depth: 3.6}),
    };
  })(),
};

const spatialCells: readonly MuseumSpatialCell[] = [
  {id: 'orientation-atrium', kind: 'room', title: 'Orientation Atrium', bounds: {minX: -10, maxX: 10, minZ: 29, maxZ: 41}, ceilingHeight: 6.4, exhibitIds: [], lightingGroupId: 'atrium'},
  {id: 'atrium-classical-passage', kind: 'passage', title: 'Classical Threshold', bounds: {minX: -4, maxX: 4, minZ: 26, maxZ: 29}, ceilingHeight: 5, exhibitIds: [], lightingGroupId: 'passage'},
  {id: 'classical-foundations-room', kind: 'room', title: 'Classical Foundations', bounds: {minX: -12, maxX: 12, minZ: 8, maxZ: 26}, ceilingHeight: 5.8, exhibitIds: ['socrates', 'plato', 'aristotle'], lightingGroupId: 'classical'},
  {id: 'classical-hellenistic-passage', kind: 'passage', title: 'Ways of Life Threshold', bounds: {minX: -4, maxX: 4, minZ: 5, maxZ: 8}, ceilingHeight: 5, exhibitIds: [], lightingGroupId: 'passage'},
  {id: 'hellenistic-ways-room', kind: 'room', title: 'Hellenistic Ways of Life', bounds: {minX: -12, maxX: 12, minZ: -17, maxZ: 5}, ceilingHeight: 5.8, exhibitIds: ['cynicism', 'epicureanism', 'stoicism', 'skepticism'], lightingGroupId: 'hellenistic'},
  {id: 'hellenistic-late-passage', kind: 'passage', title: 'Late Antiquity Threshold', bounds: {minX: -4, maxX: 4, minZ: -20, maxZ: -17}, ceilingHeight: 5, exhibitIds: [], lightingGroupId: 'passage'},
  {id: 'late-antiquity-room', kind: 'room', title: 'Late Antiquity', bounds: {minX: -10, maxX: 10, minZ: -36, maxZ: -20}, ceilingHeight: 6.2, exhibitIds: ['neoplatonism'], lightingGroupId: 'late'},
];

const spatialConnections: readonly MuseumSpatialConnection[] = [
  {id: 'atrium-to-classical', fromCellId: 'orientation-atrium', toCellId: 'atrium-classical-passage', openingBounds: {minX: -4, maxX: 4, minZ: 28.8, maxZ: 29.2}},
  {id: 'passage-to-classical', fromCellId: 'atrium-classical-passage', toCellId: 'classical-foundations-room', openingBounds: {minX: -4, maxX: 4, minZ: 25.8, maxZ: 26.2}},
  {id: 'classical-to-hellenistic', fromCellId: 'classical-foundations-room', toCellId: 'classical-hellenistic-passage', openingBounds: {minX: -4, maxX: 4, minZ: 7.8, maxZ: 8.2}},
  {id: 'passage-to-hellenistic', fromCellId: 'classical-hellenistic-passage', toCellId: 'hellenistic-ways-room', openingBounds: {minX: -4, maxX: 4, minZ: 4.8, maxZ: 5.2}},
  {id: 'hellenistic-to-late', fromCellId: 'hellenistic-ways-room', toCellId: 'hellenistic-late-passage', openingBounds: {minX: -4, maxX: 4, minZ: -17.2, maxZ: -16.8}},
  {id: 'passage-to-late', fromCellId: 'hellenistic-late-passage', toCellId: 'late-antiquity-room', openingBounds: {minX: -4, maxX: 4, minZ: -20.2, maxZ: -19.8}},
];

const entryViews: readonly MuseumRoomEntryView[] = [
  {spatialCellId: 'classical-foundations-room', pose: {x: 0, z: 24.2, yaw: 0, pitch: 0}, expectedVisibleExhibitIds: ['plato', 'aristotle']},
  {spatialCellId: 'hellenistic-ways-room', pose: {x: 0, z: 4.4, yaw: 0, pitch: 0}, expectedVisibleExhibitIds: ['cynicism', 'epicureanism']},
];

const wall = (id: string, center: MuseumPoint, width: number, depth: number, height: number): MuseumWallDefinition => ({
  id,
  center,
  size: {width, depth},
  rotation: 0,
  height,
});

const walls: readonly MuseumWallDefinition[] = [
  wall('atrium-back', {x: 0, z: 41}, 20.36, .36, 6.4),
  wall('atrium-west', {x: -10, z: 35}, .36, 12.36, 6.4),
  wall('atrium-east', {x: 10, z: 35}, .36, 12.36, 6.4),
  wall('atrium-threshold-left', {x: -7, z: 29}, 6.18, .36, 5.8),
  wall('atrium-threshold-right', {x: 7, z: 29}, 6.18, .36, 5.8),
  wall('atrium-passage-west', {x: -4, z: 27.5}, .36, 3.18, 5),
  wall('atrium-passage-east', {x: 4, z: 27.5}, .36, 3.18, 5),
  wall('classical-entry-left', {x: -8, z: 26}, 8.18, .36, 5.8),
  wall('classical-entry-right', {x: 8, z: 26}, 8.18, .36, 5.8),
  wall('classical-west', {x: -12, z: 17}, .36, 18.36, 5.8),
  wall('classical-east', {x: 12, z: 17}, .36, 18.36, 5.8),
  wall('classical-exit-left', {x: -8, z: 8}, 8.18, .36, 5.8),
  wall('classical-exit-right', {x: 8, z: 8}, 8.18, .36, 5.8),
  wall('classical-passage-west', {x: -4, z: 6.5}, .36, 3.18, 5),
  wall('classical-passage-east', {x: 4, z: 6.5}, .36, 3.18, 5),
  wall('hellenistic-entry-left', {x: -8, z: 5}, 8.18, .36, 5.8),
  wall('hellenistic-entry-right', {x: 8, z: 5}, 8.18, .36, 5.8),
  wall('hellenistic-west', {x: -12, z: -6}, .36, 22.36, 5.8),
  wall('hellenistic-east', {x: 12, z: -6}, .36, 22.36, 5.8),
  wall('hellenistic-exit-left', {x: -8, z: -17}, 8.18, .36, 5.8),
  wall('hellenistic-exit-right', {x: 8, z: -17}, 8.18, .36, 5.8),
  wall('hellenistic-passage-west', {x: -4, z: -18.5}, .36, 3.18, 5),
  wall('hellenistic-passage-east', {x: 4, z: -18.5}, .36, 3.18, 5),
  wall('late-entry-left', {x: -7, z: -20}, 6.18, .36, 6.2),
  wall('late-entry-right', {x: 7, z: -20}, 6.18, .36, 6.2),
  wall('late-west', {x: -10, z: -28}, .36, 16.36, 6.2),
  wall('late-east', {x: 10, z: -28}, .36, 16.36, 6.2),
  wall('late-end', {x: 0, z: -36}, 20.36, .36, 6.2),
];

const furnishings: readonly MuseumFurnishingDefinition[] = [
  {id: 'atrium-orientation-plinth', kind: 'orientation-plinth', center: {x: -3.6, z: 32.2}, size: {width: 3, depth: .65}, rotation: 0, height: 2.2},
  {id: 'atrium-bench', kind: 'bench', center: {x: 3.6, z: 32.2}, size: {width: 3.1, depth: .85}, rotation: 0, height: .51},
];

const tracks: readonly MuseumTrackDefinition[] = [
  {id: 'atrium-track-west', center: {x: -3.7, y: 6.05, z: 35}, size: {width: .08, height: .08, depth: 8.5}},
  {id: 'atrium-track-east', center: {x: 3.7, y: 6.05, z: 35}, size: {width: .08, height: .08, depth: 8.5}},
  {id: 'classical-track-north', center: {x: 0, y: 5.45, z: 18}, size: {width: 20, height: .08, depth: .08}},
  {id: 'classical-track-south', center: {x: 0, y: 5.45, z: 11.5}, size: {width: 20, height: .08, depth: .08}},
  {id: 'hellenistic-track-north', center: {x: 0, y: 5.45, z: -5.2}, size: {width: 20, height: .08, depth: .08}},
  {id: 'hellenistic-track-south', center: {x: 0, y: 5.45, z: -12.2}, size: {width: 20, height: .08, depth: .08}},
  {id: 'late-track', center: {x: 0, y: 5.85, z: -30.2}, size: {width: 14, height: .08, depth: .08}},
];

const hall = getMuseumHallCatalog('ancient-greek');
if (!hall) throw new Error('The ancient Greek Museum catalog is missing.');

type Placement = Omit<MuseumExhibitLayout, 'id' | 'zoneId' | 'collider' | 'scene'>;

const cynicismRotation = -Math.PI / 4;
const epicureanismRotation = Math.PI / 4;
const installationViewpoint = (
  position: MuseumPoint,
  yaw: number,
  distance: number,
  pitch = 0,
) => ({
  x: position.x + Math.sin(yaw) * distance,
  z: position.z + Math.cos(yaw) * distance,
  yaw,
  pitch,
});

const cynicismPosition = {x: 5.6, z: -3};
const epicureanismPosition = {x: -5.6, z: -3};

const placement: Record<MuseumExhibitId, Placement> = {
  socrates: {spatialCellId: 'classical-foundations-room', position: {x: -10.4, z: 18.5}, rotationY: Math.PI / 2, interactionRadius: 3.25, viewpoint: {x: -7.2, z: 18.5, yaw: Math.PI / 2, pitch: 0}},
  plato: {spatialCellId: 'classical-foundations-room', position: {x: 0, z: 9.45}, rotationY: 0, interactionRadius: 3.25, viewpoint: {x: 0, z: 12.65, yaw: 0, pitch: 0}},
  aristotle: {spatialCellId: 'classical-foundations-room', position: {x: 10.4, z: 11.2}, rotationY: -Math.PI / 2, interactionRadius: 3.25, viewpoint: {x: 7.2, z: 11.2, yaw: -Math.PI / 2, pitch: 0}},
  cynicism: {spatialCellId: 'hellenistic-ways-room', position: cynicismPosition, rotationY: cynicismRotation, interactionRadius: 3.35, viewpoint: installationViewpoint(cynicismPosition, cynicismRotation, 3, -.02)},
  epicureanism: {spatialCellId: 'hellenistic-ways-room', position: epicureanismPosition, rotationY: epicureanismRotation, interactionRadius: 3.35, viewpoint: installationViewpoint(epicureanismPosition, epicureanismRotation, 3, -.02)},
  stoicism: {spatialCellId: 'hellenistic-ways-room', position: {x: -8.5, z: -10.5}, rotationY: Math.PI / 2, interactionRadius: 3.25, viewpoint: {x: -5.4, z: -10.5, yaw: Math.PI / 2, pitch: -.02}},
  skepticism: {spatialCellId: 'hellenistic-ways-room', position: {x: 8.5, z: -15.3}, rotationY: -Math.PI / 2, interactionRadius: 3.35, viewpoint: {x: 5.2, z: -15.3, yaw: -Math.PI / 2, pitch: -.02}},
  neoplatonism: {spatialCellId: 'late-antiquity-room', position: {x: 0, z: -33.5}, rotationY: 0, interactionRadius: 4.35, viewpoint: {x: 0, z: -29.2, yaw: 0, pitch: -.04}},
};

const guidedWalkLegs: readonly MuseumGuidedWalkLeg[] = [
  {fromExhibitId: 'socrates', toExhibitId: 'plato', waypoints: []},
  {fromExhibitId: 'plato', toExhibitId: 'aristotle', waypoints: []},
  {fromExhibitId: 'aristotle', toExhibitId: 'cynicism', waypoints: [{x: 3.2, z: 8.7}, {x: 3.2, z: 4.3}]},
  {fromExhibitId: 'cynicism', toExhibitId: 'epicureanism', waypoints: []},
  {fromExhibitId: 'epicureanism', toExhibitId: 'stoicism', waypoints: [{x: -2.9, z: -3.1}, {x: -5.49, z: -5.7}]},
  {fromExhibitId: 'stoicism', toExhibitId: 'skepticism', waypoints: []},
  {fromExhibitId: 'skepticism', toExhibitId: 'neoplatonism', waypoints: [{x: 3.3, z: -16.3}, {x: 3.3, z: -20.7}]},
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

const localPointToHall = (layout: MuseumExhibitLayout, point: MuseumPoint3): MuseumPoint3 => {
  const cos = Math.cos(layout.rotationY);
  const sin = Math.sin(layout.rotationY);
  return {
    x: layout.position.x + point.x * cos + point.z * sin,
    y: point.y,
    z: layout.position.z - point.x * sin + point.z * cos,
  };
};

const exhibitTrackIds: Record<MuseumExhibitId, string> = {
  socrates: 'classical-track-north',
  plato: 'classical-track-south',
  aristotle: 'classical-track-south',
  cynicism: 'hellenistic-track-north',
  epicureanism: 'hellenistic-track-north',
  stoicism: 'hellenistic-track-south',
  skepticism: 'hellenistic-track-south',
  neoplatonism: 'late-track',
};

const exhibitLights: readonly MuseumExhibitLightDefinition[] = exhibitLayouts.map((layout) => {
  const target = localPointToHall(layout, layout.scene.focalTarget);
  const trackId = exhibitTrackIds[layout.id];
  const track = tracks.find(({id}) => id === trackId)!;
  const runsAlongX = track.size.width > track.size.depth;
  const clampToTrack = (value: number, center: number, length: number) =>
    Math.min(center + length / 2, Math.max(center - length / 2, value));
  const mountPosition = {
    x: runsAlongX ? clampToTrack(target.x, track.center.x, track.size.width) : track.center.x,
    y: track.center.y - .05,
    z: runsAlongX ? track.center.z : clampToTrack(target.z, track.center.z, track.size.depth),
  };
  const beam = {
    x: target.x - mountPosition.x,
    y: target.y - mountPosition.y,
    z: target.z - mountPosition.z,
  };
  const beamLength = Math.hypot(beam.x, beam.y, beam.z) || 1;
  return {
    id: `light-${layout.id}`,
    exhibitId: layout.id,
    trackId,
    mountPosition,
    position: {
      x: mountPosition.x + beam.x / beamLength * .35,
      y: mountPosition.y + beam.y / beamLength * .35,
      z: mountPosition.z + beam.z / beamLength * .35,
    },
    target,
    intensity: 38,
    distance: 13,
    angle: .36,
    penumbra: .72,
  };
});

export const ANCIENT_GREEK_HALL_LAYOUT: MuseumHallLayout = {
  id: hall.id,
  title: hall.title,
  eyeHeight: 1.68,
  playerRadius: .38,
  bounds: {minX: -12, maxX: 12, minZ: -36, maxZ: 41},
  floorArea: 1592,
  cameraFov: 68,
  cameraFar: 110,
  spawn: {x: 0, z: 37.5, yaw: 0, pitch: -.025},
  spawnFocalPoint: {x: 0, z: 10.5},
  reset: {x: 0, z: 37.5, yaw: 0, pitch: -.025},
  spatialCells,
  spatialConnections,
  entryViews,
  wallColliders: walls,
  furnishings,
  obstacleColliders: [...exhibitLayouts.map(({collider}) => collider), ...furnishings],
  exhibits: exhibitLayouts,
  guidedOrder: hall.guidedOrder,
  guidedWalkLegs,
  lighting: {
    ambientIntensity: .28,
    hemisphereIntensity: .92,
    directionalIntensity: .82,
    tracks,
    exhibitLights,
  },
};

export const ANCIENT_GREEK_HALL_DEFINITION: MuseumHallDefinition = {
  id: hall.id,
  worldTransform: {x: 0, z: 0, yaw: 0},
  layout: ANCIENT_GREEK_HALL_LAYOUT,
  entrances: [{
    id: 'south-entry',
    position: {x: 0, z: 39.2},
    arrivalPose: {...ANCIENT_GREEK_HALL_LAYOUT.spawn},
    transitionBounds: {center: {x: 0, z: 39.2}, size: {width: 8, depth: 2.4}},
  }],
  connections: [],
  prefetch: {
    sceneAssetIds: hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]),
    adjacentHallIds: [],
  },
  fallbackLabel: 'Ancient Greek and Hellenistic gallery directory',
};
