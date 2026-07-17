import {
  getMuseumHallCatalog,
  type AncientGreekExhibitId,
} from '../museumCatalog';
import {MUSEUM_VISITOR_MAP_KIOSK} from './museumVisitorMapKioskDefinition';
import type {
  MuseumCollider,
  MuseumCirculationPath,
  MuseumExhibitLayout,
  MuseumExhibitLightDefinition,
  MuseumFurnishingDefinition,
  MuseumGuidedWalkLeg,
  MuseumHallContentDefinition,
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
  MuseumSignDefinition,
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
  const composition = {
    socrates: {principalX: -.48, supportX: .76, plaqueX: -1, conceptX: .05},
    plato: {principalX: -.08, supportX: 1.05, plaqueX: -1, conceptX: -.12},
    aristotle: {principalX: .48, supportX: -.76, plaqueX: 1, conceptX: -.05},
  }[id];
  const base = volume(`${id}-plinth`, 'base', {x: 0, y: .14, z: .08}, {width: 2.85, height: .28, depth: 1.42});
  const backing = volume(`${id}-backing`, 'base', {x: 0, y: 1.9, z: -.72}, {width: 3.05, height: 3.45, depth: .18});
  const concept = volume(`${id}-concept`, 'concept-object', {x: composition.conceptX, y: .6, z: .42}, {width: .6, height: .4, depth: .26});
  return {
    footprint: {width: 3.2, height: 3.7, depth: 2.55},
    mediaMounts: [
      media(`${id}-principal-frame`, principalAssetId, 'wall-frame', [composition.principalX, 2.12, -.59], [0, 0, 0], 1.18, principalHeight * 1.28, backing),
      media(`${id}-support-lectern`, supportingAssetId, 'lectern', [composition.supportX, 1.02, .17], [-.34, 0, 0], supportingWidth, supportingHeight, base),
    ],
    plaque: plaque(`${id}-plaque`, [composition.plaqueX, .44, 1.01], 1.02, .32),
    objectBounds: [base, backing, concept],
    focalTarget: {x: composition.principalX * .28, y: 1.78, z: -.18},
    interactionBounds: volume(`${id}-interaction`, 'principal-object', {x: 0, y: 1.62, z: .04}, {width: 3.12, height: 3.24, depth: 2.42}),
  };
};

const sceneDefinitions: Record<AncientGreekExhibitId, MuseumInstallationSceneDefinition> = {
  socrates: philosopherScene('socrates', 'socrates-louvre-head', 'socrates-death-of-socrates', 1.14, .76, .5),
  plato: philosopherScene('plato', 'plato-capitoline-bust', 'plato-school-of-athens', 1.27, .78, .51),
  aristotle: philosopherScene('aristotle', 'aristotle-altemps-bust', 'aristotle-athenian-constitution-papyrus', 1.15, .86, .26),
  cynicism: (() => {
    const base = volume('cynicism-plinth', 'base', {x: 0, y: .14, z: .02}, {width: 3.2, height: .28, depth: 1.5});
    const backing = volume('cynicism-backing', 'base', {x: 0, y: 1.86, z: -.78}, {width: 3.35, height: 3.38, depth: .18});
    return {
      footprint: {width: 3.5, height: 3.65, depth: 2.7},
      mediaMounts: [
        media('cynicism-diogenes-panel', 'cynicism-diogenes-walters', 'wall-frame', [-.82, 2.18, -.65], [0, 0, 0], 1.04, .77, backing),
        media('cynicism-alexander-panel', 'cynicism-alexander-and-diogenes', 'wall-frame', [.82, 2.18, -.65], [0, 0, 0], 1.04, .74, backing),
      ],
      plaque: plaque('cynicism-plaque', [1.15, .46, 1.02], 1.02, .32),
      objectBounds: [
        base,
        backing,
        volume('cynicism-pithos', 'principal-object', {x: .08, y: .79, z: .17}, {width: .96, height: 1.14, depth: .86}),
        volume('cynicism-lamp', 'concept-object', {x: -.92, y: .6, z: .4}, {width: .36, height: .54, depth: .26}),
      ],
      focalTarget: {x: 0, y: 1.56, z: -.12},
      interactionBounds: volume('cynicism-interaction', 'principal-object', {x: 0, y: 1.58, z: 0}, {width: 3.42, height: 3.16, depth: 2.58}),
    };
  })(),
  epicureanism: (() => {
    const base = volume('epicureanism-plinth', 'base', {x: 0, y: .13, z: .03}, {width: 3.05, height: .26, depth: 1.5});
    const backing = volume('epicureanism-backing', 'base', {x: 0, y: 1.86, z: -.78}, {width: 3.3, height: 3.35, depth: .18});
    return {
      footprint: {width: 3.45, height: 3.62, depth: 2.72},
      mediaMounts: [
        media('epicureanism-herm-panel', 'epicureanism-double-herm', 'wall-frame', [-.72, 2.1, -.65], [0, 0, 0], 1, 1.34, backing),
        media('epicureanism-lucretius-lectern', 'epicureanism-lucretius-manuscript', 'lectern', [.74, 1.03, .14], [-.38, 0, 0], .62, .86, base),
      ],
      plaque: plaque('epicureanism-plaque', [-1.12, .45, 1.02], 1.02, .32),
      objectBounds: [
        base,
        backing,
        volume('epicureanism-atom-case', 'concept-object', {x: -.02, y: .64, z: .38}, {width: .82, height: .54, depth: .55}),
      ],
      focalTarget: {x: -.2, y: 1.68, z: -.16},
      interactionBounds: volume('epicureanism-interaction', 'principal-object', {x: 0, y: 1.56, z: 0}, {width: 3.36, height: 3.12, depth: 2.6}),
    };
  })(),
  stoicism: (() => {
    const base = volume('stoicism-plinth', 'base', {x: 0, y: .13, z: .03}, {width: 3.05, height: .26, depth: 1.38});
    const backing = volume('stoicism-backing', 'base', {x: 0, y: 1.86, z: -.74}, {width: 3.28, height: 3.34, depth: .18});
    return {
      footprint: {width: 3.42, height: 3.62, depth: 2.58},
      mediaMounts: [
        media('stoicism-zeno-panel', 'stoicism-zeno-naples', 'wall-frame', [-.72, 2.1, -.61], [0, 0, 0], .9, 1.28, backing),
        media('stoicism-marcus-panel', 'stoicism-marcus-aurelius-bust', 'wall-frame', [.72, 1.99, -.61], [0, 0, 0], .9, 1.06, backing),
      ],
      plaque: plaque('stoicism-plaque', [-1.12, .45, 1], 1.02, .32),
      objectBounds: [
        base,
        backing,
        volume('stoicism-control-relief', 'concept-object', {x: .3, y: .62, z: .4}, {width: 1, height: .5, depth: .14}),
      ],
      focalTarget: {x: 0, y: 1.7, z: -.14},
      interactionBounds: volume('stoicism-interaction', 'principal-object', {x: 0, y: 1.56, z: 0}, {width: 3.34, height: 3.12, depth: 2.46}),
    };
  })(),
  skepticism: (() => {
    const base = volume('skepticism-plinth', 'base', {x: 0, y: .13, z: .03}, {width: 3.12, height: .26, depth: 1.48});
    const backing = volume('skepticism-backing', 'base', {x: 0, y: 1.86, z: -.76}, {width: 3.34, height: 3.36, depth: .18});
    return {
      footprint: {width: 3.48, height: 3.64, depth: 2.7},
      mediaMounts: [
        media('skepticism-sextus-panel', 'skepticism-sextus-riedel', 'wall-frame', [-.72, 2.1, -.63], [0, 0, 0], .94, 1.28, backing),
        media('skepticism-text-lectern', 'skepticism-adversus-mathematicos', 'lectern', [1.02, 1.04, .1], [-.38, 0, 0], .58, .86, base),
      ],
      plaque: plaque('skepticism-plaque', [-1.14, .45, 1.03], 1.02, .32),
      objectBounds: [
        base,
        backing,
        volume('skepticism-balance', 'concept-object', {x: -.16, y: .78, z: .38}, {width: 1.28, height: .94, depth: .34}),
      ],
      focalTarget: {x: -.08, y: 1.66, z: -.14},
      interactionBounds: volume('skepticism-interaction', 'principal-object', {x: 0, y: 1.56, z: 0}, {width: 3.4, height: 3.12, depth: 2.58}),
    };
  })(),
  neoplatonism: (() => {
    const base = volume('neoplatonism-plinth', 'base', {x: 0, y: .15, z: .02}, {width: 5.35, height: .3, depth: 1.9});
    const wall = volume('neoplatonism-end-wall', 'base', {x: 0, y: 2.05, z: -1.15}, {width: 5.85, height: 3.8, depth: .18});
    return {
      footprint: {width: 6, height: 4.25, depth: 3.3},
      mediaMounts: [
        media('neoplatonism-plotinus-frame', 'neoplatonism-plotinus-ostia', 'wall-frame', [-1.85, 2.2, -1.02], [0, 0, 0], 1.08, 1.55, wall),
        media('neoplatonism-ficino-frame', 'neoplatonism-ficino-enneads', 'wall-frame', [1.85, 2.2, -1.02], [0, 0, 0], 1.08, 1.55, wall),
      ],
      plaque: plaque('neoplatonism-plaque', [2.08, .5, 1.18], 1.25, .36),
      objectBounds: [
        base,
        wall,
        volume('neoplatonism-emanation-relief', 'concept-object', {x: 0, y: 2.05, z: -.98}, {width: 1.55, height: 1.55, depth: .2}),
      ],
      focalTarget: {x: 0, y: 2.05, z: -.9},
      interactionBounds: volume('neoplatonism-interaction', 'principal-object', {x: 0, y: 1.95, z: -.02}, {width: 5.9, height: 3.9, depth: 3.15}),
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
  {id: 'early-modern-transition-passage', kind: 'passage', title: 'Gallery 02 Threshold', bounds: {minX: 10, maxX: 18.6, minZ: -30.5, maxZ: -26.5}, renderBounds: {minX: 10, maxX: 18, minZ: -30.5, maxZ: -26.5}, ceilingHeight: 5.2, exhibitIds: [], lightingGroupId: 'passage'},
  {id: 'forum-west-threshold', kind: 'passage', title: 'Forum West Threshold', bounds: {minX: -14.6, maxX: -4, minZ: 4.5, maxZ: 8.5}, renderBounds: {minX: -14, maxX: -4, minZ: 4.5, maxZ: 8.5}, ceilingHeight: 5.2, exhibitIds: [], lightingGroupId: 'passage'},
];

const spatialConnections: readonly MuseumSpatialConnection[] = [
  {id: 'atrium-to-classical', fromCellId: 'orientation-atrium', toCellId: 'atrium-classical-passage', openingBounds: {minX: -4, maxX: 4, minZ: 28.8, maxZ: 29.2}},
  {id: 'passage-to-classical', fromCellId: 'atrium-classical-passage', toCellId: 'classical-foundations-room', openingBounds: {minX: -4, maxX: 4, minZ: 25.8, maxZ: 26.2}},
  {id: 'classical-to-hellenistic', fromCellId: 'classical-foundations-room', toCellId: 'classical-hellenistic-passage', openingBounds: {minX: -4, maxX: 4, minZ: 7.8, maxZ: 8.2}},
  {id: 'passage-to-hellenistic', fromCellId: 'classical-hellenistic-passage', toCellId: 'hellenistic-ways-room', openingBounds: {minX: -4, maxX: 4, minZ: 4.8, maxZ: 5.2}},
  {id: 'hellenistic-to-late', fromCellId: 'hellenistic-ways-room', toCellId: 'hellenistic-late-passage', openingBounds: {minX: -4, maxX: 4, minZ: -17.2, maxZ: -16.8}},
  {id: 'passage-to-late', fromCellId: 'hellenistic-late-passage', toCellId: 'late-antiquity-room', openingBounds: {minX: -4, maxX: 4, minZ: -20.2, maxZ: -19.8}},
  {id: 'late-to-early-modern-threshold', fromCellId: 'late-antiquity-room', toCellId: 'early-modern-transition-passage', openingBounds: {minX: 9.8, maxX: 10.2, minZ: -30.5, maxZ: -26.5}},
  {id: 'classical-threshold-to-forum-west', fromCellId: 'classical-hellenistic-passage', toCellId: 'forum-west-threshold', openingBounds: {minX: -4.2, maxX: -3.8, minZ: 4.5, maxZ: 8.5}},
];

const entryViews: readonly MuseumRoomEntryView[] = [
  {spatialCellId: 'classical-foundations-room', pose: {x: 0, z: 24.4, yaw: 0, pitch: -.015}, expectedVisibleExhibitIds: ['socrates', 'plato', 'aristotle']},
  {spatialCellId: 'hellenistic-ways-room', pose: {x: 0, z: 4.25, yaw: 0, pitch: -.015}, expectedVisibleExhibitIds: ['cynicism', 'epicureanism', 'stoicism', 'skepticism']},
  {spatialCellId: 'late-antiquity-room', pose: {x: 0, z: -20.75, yaw: 0, pitch: .015}, expectedVisibleExhibitIds: ['neoplatonism']},
];

const wall = (
  id: string,
  center: MuseumPoint,
  width: number,
  depth: number,
  height: number,
  visual?: {center: MuseumPoint; size: {width: number; depth: number}},
): MuseumWallDefinition => ({
  id,
  center,
  size: {width, depth},
  rotation: 0,
  height,
  renderCenter: visual?.center,
  renderSize: visual?.size,
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
  wall('late-east-north', {x: 10, z: -23.25}, .36, 6.5, 6.2),
  wall('late-east-south', {x: 10, z: -33.25}, .36, 5.5, 6.2),
  wall('late-end', {x: 0, z: -36}, 20.36, .36, 6.2),
  wall('early-modern-passage-north', {x: 14.3, z: -26.5}, 8.6, .36, 5.2, {center: {x: 14, z: -26.5}, size: {width: 8, depth: .36}}),
  wall('early-modern-passage-south', {x: 14.3, z: -30.5}, 8.6, .36, 5.2, {center: {x: 14, z: -30.5}, size: {width: 8, depth: .36}}),
  wall('forum-west-threshold-north', {x: -9.3, z: 8.5}, 10.6, .36, 5.2, {center: {x: -9, z: 8.5}, size: {width: 10, depth: .36}}),
  wall('forum-west-threshold-south', {x: -9.3, z: 4.5}, 10.6, .36, 5.2, {center: {x: -9, z: 4.5}, size: {width: 10, depth: .36}}),
];

const furnishings: readonly MuseumFurnishingDefinition[] = [
  {id: 'atrium-orientation-plinth', kind: 'orientation-plinth', center: {x: -3.6, z: 32.2}, size: {width: 3, depth: .65}, rotation: 0, height: 2.2},
  MUSEUM_VISITOR_MAP_KIOSK,
];

const tracks: readonly MuseumTrackDefinition[] = [
  {id: 'atrium-track-west', center: {x: -3.7, y: 6.05, z: 35}, size: {width: .08, height: .08, depth: 8.5}},
  {id: 'atrium-track-east', center: {x: 3.7, y: 6.05, z: 35}, size: {width: .08, height: .08, depth: 8.5}},
  {id: 'classical-track-north', center: {x: 0, y: 5.45, z: 13.3}, size: {width: 18, height: .08, depth: .08}},
  {id: 'classical-track-south', center: {x: 0, y: 5.45, z: 10.35}, size: {width: 20, height: .08, depth: .08}},
  {id: 'hellenistic-track-north', center: {x: 0, y: 5.45, z: -7}, size: {width: 20, height: .08, depth: .08}},
  {id: 'hellenistic-track-south', center: {x: 0, y: 5.45, z: -13.6}, size: {width: 18, height: .08, depth: .08}},
  {id: 'late-track', center: {x: 0, y: 5.85, z: -31.2}, size: {width: 14, height: .08, depth: .08}},
];

const hall = getMuseumHallCatalog('ancient-greek');
if (!hall) throw new Error('The ancient Greek Museum catalog is missing.');

type Placement = Omit<MuseumExhibitLayout, 'id' | 'zoneId' | 'collider' | 'scene'>;

const EYE_HEIGHT = 1.68;
const installationPointToHall = (
  position: MuseumPoint,
  rotation: number,
  point: MuseumPoint,
): MuseumPoint => ({
  x: position.x + point.x * Math.cos(rotation) + point.z * Math.sin(rotation),
  z: position.z - point.x * Math.sin(rotation) + point.z * Math.cos(rotation),
});
const installationViewpoint = (
  id: AncientGreekExhibitId,
  position: MuseumPoint,
  rotation: number,
  distance: number,
) => {
  const focal = sceneDefinitions[id].focalTarget;
  const target = installationPointToHall(position, rotation, focal);
  const camera = installationPointToHall(position, rotation, {x: focal.x, z: focal.z + distance});
  return {
    ...camera,
    yaw: rotation,
    pitch: Math.atan2(focal.y - EYE_HEIGHT, Math.hypot(target.x - camera.x, target.z - camera.z)),
  };
};

const socratesPosition = {x: -8.6, z: 13.3};
const platoPosition = {x: 0, z: 10.35};
const aristotlePosition = {x: 8.6, z: 13.3};
const cynicismPosition = {x: 10.35, z: -7};
const epicureanismPosition = {x: -10.34, z: -7};
const stoicismPosition = {x: -7.4, z: -15.41};
const skepticismPosition = {x: 7.4, z: -15.35};
const neoplatonismPosition = {x: 0, z: -33};

const placement: Record<AncientGreekExhibitId, Placement> = {
  socrates: {spatialCellId: 'classical-foundations-room', position: socratesPosition, rotationY: Math.PI / 2, interactionRadius: 3.6, viewpoint: installationViewpoint('socrates', socratesPosition, Math.PI / 2, 4.15)},
  plato: {spatialCellId: 'classical-foundations-room', position: platoPosition, rotationY: 0, interactionRadius: 3.5, viewpoint: installationViewpoint('plato', platoPosition, 0, 4.25)},
  aristotle: {spatialCellId: 'classical-foundations-room', position: aristotlePosition, rotationY: -Math.PI / 2, interactionRadius: 3.6, viewpoint: installationViewpoint('aristotle', aristotlePosition, -Math.PI / 2, 4.15)},
  cynicism: {spatialCellId: 'hellenistic-ways-room', position: cynicismPosition, rotationY: -Math.PI / 2, interactionRadius: 3.65, viewpoint: installationViewpoint('cynicism', cynicismPosition, -Math.PI / 2, 4.25)},
  epicureanism: {spatialCellId: 'hellenistic-ways-room', position: epicureanismPosition, rotationY: Math.PI / 2, interactionRadius: 3.65, viewpoint: installationViewpoint('epicureanism', epicureanismPosition, Math.PI / 2, 4.25)},
  stoicism: {spatialCellId: 'hellenistic-ways-room', position: stoicismPosition, rotationY: 0, interactionRadius: 3.55, viewpoint: installationViewpoint('stoicism', stoicismPosition, 0, 4.2)},
  skepticism: {spatialCellId: 'hellenistic-ways-room', position: skepticismPosition, rotationY: 0, interactionRadius: 3.6, viewpoint: installationViewpoint('skepticism', skepticismPosition, 0, 4.25)},
  neoplatonism: {spatialCellId: 'late-antiquity-room', position: neoplatonismPosition, rotationY: 0, interactionRadius: 4.8, viewpoint: installationViewpoint('neoplatonism', neoplatonismPosition, 0, 5.1)},
};

const guidedWalkLegs: readonly MuseumGuidedWalkLeg[] = [
  {fromExhibitId: 'socrates', toExhibitId: 'plato', waypoints: []},
  {fromExhibitId: 'plato', toExhibitId: 'aristotle', waypoints: []},
  {fromExhibitId: 'aristotle', toExhibitId: 'cynicism', waypoints: [{x: 3.15, z: 8.7}, {x: 3.15, z: 4.2}, {x: 5.4, z: -2.8}]},
  {fromExhibitId: 'cynicism', toExhibitId: 'epicureanism', waypoints: []},
  {fromExhibitId: 'epicureanism', toExhibitId: 'stoicism', waypoints: []},
  {fromExhibitId: 'stoicism', toExhibitId: 'skepticism', waypoints: []},
  {fromExhibitId: 'skepticism', toExhibitId: 'neoplatonism', waypoints: [{x: 3.15, z: -16.15}, {x: 3.15, z: -20.75}, {x: 0, z: -25}]},
];

const primaryCirculation: MuseumCirculationPath = {
  id: 'gallery-spine',
  clearanceRadius: .62,
  points: [
    {x: 0, z: 37.5},
    {x: 0, z: 16},
    {x: 3.15, z: 13.35},
    {x: 3.15, z: 8.65},
    {x: 0, z: 6.2},
    {x: 0, z: -29.3},
    {x: 6.2, z: -28.5},
    {x: 17.8, z: -28.5},
  ],
};

const colliderFromScene = (
  id: AncientGreekExhibitId,
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

const exhibitTrackIds: Record<AncientGreekExhibitId, string> = {
  socrates: 'classical-track-north',
  plato: 'classical-track-south',
  aristotle: 'classical-track-north',
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
    intensity: layout.id === 'neoplatonism' ? 36 : 34,
    distance: 13,
    angle: .36,
    penumbra: .72,
  };
});

const signs: readonly MuseumSignDefinition[] = [
  {
    id: 'classical-foundations-sign',
    kind: 'zone',
    title: 'Classical Foundations',
    kicker: 'Ancient wing · Room I',
    subtitle: 'Socrates · Plato · Aristotle',
    position: {x: 7.6, y: 3.95, z: 26.2},
    rotationY: 0,
    width: 3.4,
    height: 3.4 / 4,
  },
  {
    id: 'hellenistic-ways-sign',
    kind: 'zone',
    title: 'Hellenistic Ways of Life',
    kicker: 'Ancient wing · Room II',
    subtitle: 'Practice · freedom · judgment · flourishing',
    position: {x: 7.6, y: 3.95, z: 5.2},
    rotationY: 0,
    width: 3.6,
    height: 3.6 / 4,
  },
  {
    id: 'late-antiquity-sign',
    kind: 'zone',
    title: 'Late Antiquity',
    kicker: 'Ancient wing · Room III',
    subtitle: 'Unity · intellect · soul · return',
    position: {x: -7, y: 4.05, z: -19.8},
    rotationY: 0,
    width: 3.2,
    height: 3.2 / 4,
  },
  {
    id: 'gallery-02-wayfinding-sign',
    kind: 'wayfinding',
    title: 'Outer Ring · Gallery 02',
    kicker: 'Renaissance, Reason, and Revolution',
    subtitle: 'The loop continues · Forum spoke available in this gallery',
    position: {x: 17.82, y: 3.8, z: -28.5},
    rotationY: -Math.PI / 2,
    width: 3.5,
    height: 3.5 / 4,
  },
];

export const ANCIENT_GREEK_HALL_LAYOUT: MuseumHallLayout = {
  id: hall.id,
  title: hall.title,
  eyeHeight: EYE_HEIGHT,
  playerRadius: .38,
  bounds: {minX: -14.6, maxX: 18.6, minZ: -36, maxZ: 41},
  floorArea: 1668.8,
  cameraFov: 68,
  cameraFar: 110,
  spawn: {x: 0, z: 37.5, yaw: -.2, pitch: -.025},
  spawnFocalPoint: {x: 0, z: 10.5},
  reset: {x: 0, z: 37.5, yaw: -.2, pitch: -.025},
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
  lighting: {
    ambientIntensity: .28,
    hemisphereIntensity: .92,
    directionalIntensity: .82,
    tracks,
    exhibitLights,
  },
  signs,
};

export const ANCIENT_GREEK_HALL_DEFINITION: MuseumHallContentDefinition = {
  id: hall.id,
  layout: ANCIENT_GREEK_HALL_LAYOUT,
  prefetch: {
    entryExhibitIdsByEntrance: {
      'south-entry': ['plato'],
      'early-modern-threshold': ['neoplatonism'],
      'forum-west-threshold': ['socrates'],
    },
    entrySceneAssetIds: [
      'socrates-louvre-head', 'socrates-death-of-socrates',
      'plato-capitoline-bust', 'plato-school-of-athens',
      'neoplatonism-plotinus-ostia', 'neoplatonism-ficino-enneads',
    ],
    sceneAssetIds: hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]),
  },
  fallbackLabel: 'Ancient Greek and Hellenistic gallery directory',
};
