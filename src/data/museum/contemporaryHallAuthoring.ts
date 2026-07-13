import type {
  MuseumCollider,
  MuseumExhibitLayout,
  MuseumExhibitLightDefinition,
  MuseumInstallationSceneDefinition,
  MuseumMediaMountDefinition,
  MuseumMediaMountKind,
  MuseumPlaqueDefinition,
  MuseumPoint,
  MuseumPoint3,
  MuseumSceneVolume,
  MuseumSceneVolumeRole,
  MuseumSize3,
  MuseumTrackDefinition,
  MuseumWallDefinition,
} from './museumWorldTypes';
import type {MuseumExhibitId, MuseumZoneId} from '../museumCatalog';

export type ContemporarySceneConfig = {
  principal: {assetId: MuseumMediaMountDefinition['assetId']; width: number; height: number};
  support: {
    assetId: MuseumMediaMountDefinition['assetId'];
    width: number;
    height: number;
    kind?: 'lectern' | 'wall-frame';
  };
};

export type ContemporaryPlacement = {
  zoneId: MuseumZoneId;
  spatialCellId: string;
  position: MuseumPoint;
  rotationY: number;
  interactionRadius?: number;
  viewpointDistance?: number;
};

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
    frameDepth: .115,
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

const plaque = (id: string): MuseumPlaqueDefinition => ({
  id,
  position: [-1.08, .45, 1.02],
  rotation: [-.2, 0, 0],
  width: 1.02,
  height: .32,
  supportHeight: .25,
  anchorId: 'gallery-floor',
  bounds: volume(`${id}-bounds`, 'plaque', {x: -1.08, y: .45, z: 1.02}, {width: 1.18, height: .46, depth: .28}),
  supportBounds: volume(`${id}-support`, 'plaque', {x: -1.08, y: .125, z: 1.04}, {width: .62, height: .25, depth: .4}),
});

export function createContemporaryScenes<T extends MuseumExhibitId>(
  configs: Record<T, ContemporarySceneConfig>,
): Record<T, MuseumInstallationSceneDefinition> {
  return Object.fromEntries(Object.entries<ContemporarySceneConfig>(configs).map(([id, config]) => {
    const base = volume(`${id}-plinth`, 'base', {x: 0, y: .13, z: .02}, {width: 3.25, height: .26, depth: 1.5});
    const backing = volume(`${id}-backing`, 'base', {x: 0, y: 1.86, z: -.76}, {width: 3.45, height: 3.38, depth: .18});
    const concept = volume(`${id}-concept`, 'concept-object', {x: 0, y: .57, z: .39}, {width: .88, height: .64, depth: .5});
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
  })) as Record<T, MuseumInstallationSceneDefinition>;
}

const installationPointToHall = (position: MuseumPoint, rotation: number, point: MuseumPoint): MuseumPoint => ({
  x: position.x + point.x * Math.cos(rotation) + point.z * Math.sin(rotation),
  z: position.z - point.x * Math.sin(rotation) + point.z * Math.cos(rotation),
});

export function createContemporaryExhibitLayouts<T extends MuseumExhibitId>(
  scenes: Record<T, MuseumInstallationSceneDefinition>,
  placements: Record<T, ContemporaryPlacement>,
  eyeHeight: number,
): MuseumExhibitLayout[] {
  return (Object.keys(placements) as T[]).map((id) => {
    const authored = placements[id];
    const scene = scenes[id];
    const focal = scene.focalTarget;
    const target = installationPointToHall(authored.position, authored.rotationY, focal);
    const camera = installationPointToHall(authored.position, authored.rotationY, {
      x: focal.x,
      z: focal.z + (authored.viewpointDistance ?? 4.2),
    });
    const viewpoint = {
      ...camera,
      yaw: authored.rotationY,
      pitch: Math.atan2(focal.y - eyeHeight, Math.hypot(target.x - camera.x, target.z - camera.z)),
    };
    const collider: MuseumCollider = {
      id: `exhibit-${id}`,
      center: authored.position,
      size: {width: scene.footprint.width, depth: scene.footprint.depth},
      rotation: authored.rotationY,
    };
    return {
      id,
      zoneId: authored.zoneId,
      spatialCellId: authored.spatialCellId,
      position: authored.position,
      rotationY: authored.rotationY,
      interactionRadius: authored.interactionRadius ?? 3.65,
      viewpoint,
      collider,
      scene,
    };
  });
}

const localPointToHall = (layout: MuseumExhibitLayout, point: MuseumPoint3): MuseumPoint3 => {
  const cos = Math.cos(layout.rotationY);
  const sin = Math.sin(layout.rotationY);
  return {
    x: layout.position.x + point.x * cos + point.z * sin,
    y: point.y,
    z: layout.position.z - point.x * sin + point.z * cos,
  };
};

export function createContemporaryExhibitLights<T extends MuseumExhibitId>(
  layouts: readonly MuseumExhibitLayout[],
  tracks: readonly MuseumTrackDefinition[],
  trackIds: Record<T, string>,
  focalExhibitIds: readonly T[] = [],
): readonly MuseumExhibitLightDefinition[] {
  return layouts.map((layout) => {
    const target = localPointToHall(layout, layout.scene.focalTarget);
    const trackId = trackIds[layout.id as T];
    const track = tracks.find(({id}) => id === trackId);
    if (!track) throw new Error(`Missing track ${trackId} for ${layout.id}.`);
    const alongX = track.size.width > track.size.depth;
    const clamp = (value: number, center: number, length: number) => Math.min(center + length / 2, Math.max(center - length / 2, value));
    const mountPosition = {
      x: alongX ? clamp(target.x, track.center.x, track.size.width) : track.center.x,
      y: track.center.y - .05,
      z: alongX ? track.center.z : clamp(target.z, track.center.z, track.size.depth),
    };
    const beam = {x: target.x - mountPosition.x, y: target.y - mountPosition.y, z: target.z - mountPosition.z};
    const length = Math.hypot(beam.x, beam.y, beam.z) || 1;
    return {
      id: `light-${layout.id}`,
      exhibitId: layout.id,
      trackId,
      mountPosition,
      position: {
        x: mountPosition.x + beam.x / length * .35,
        y: mountPosition.y + beam.y / length * .35,
        z: mountPosition.z + beam.z / length * .35,
      },
      target,
      intensity: focalExhibitIds.includes(layout.id as T) ? 38 : 35,
      distance: 13,
      angle: .36,
      penumbra: .72,
    };
  });
}

export const museumWall = (
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
