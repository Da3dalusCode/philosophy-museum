import type {MuseumAssetId} from './museumAssetTypes';
import type {
  MuseumExhibitId,
  MuseumHallId,
  MuseumZoneId,
} from '../museumCatalog';

export type MuseumPoint = {x: number; z: number};
export type MuseumPoint3 = {x: number; y: number; z: number};
export type MuseumPose = MuseumPoint & {yaw: number; pitch: number};
export type MuseumBounds = {minX: number; maxX: number; minZ: number; maxZ: number};
export type MuseumSize3 = {width: number; height: number; depth: number};
export type MuseumWorldTransform = MuseumPoint & {yaw: number};

export type MuseumCollider = {
  id: string;
  center: MuseumPoint;
  size: {width: number; depth: number};
  rotation: number;
};

export type MuseumWallDefinition = MuseumCollider & {
  height: number;
};

export type MuseumSceneVolumeRole =
  | 'base'
  | 'principal-object'
  | 'concept-object'
  | 'media'
  | 'plaque';

export type MuseumSceneVolume = {
  id: string;
  role: MuseumSceneVolumeRole;
  center: MuseumPoint3;
  size: MuseumSize3;
};

export type MuseumMediaMountKind =
  | 'recess-frame'
  | 'freestanding-panel'
  | 'lectern'
  | 'wall-frame';

export type MuseumMediaMountDefinition = {
  id: string;
  assetId: MuseumAssetId;
  kind: MuseumMediaMountKind;
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
  width: number;
  height: number;
  frameDepth: number;
  supportHeight: number;
  anchorId: string;
  bounds: MuseumSceneVolume;
  supportBounds: MuseumSceneVolume;
};

export type MuseumPlaqueDefinition = {
  id: string;
  position: readonly [number, number, number];
  rotation: readonly [number, number, number];
  width: number;
  height: number;
  supportHeight: number;
  anchorId: string;
  bounds: MuseumSceneVolume;
  supportBounds: MuseumSceneVolume;
};

export type MuseumInstallationSceneDefinition = {
  footprint: MuseumSize3;
  mediaMounts: readonly MuseumMediaMountDefinition[];
  plaque: MuseumPlaqueDefinition;
  objectBounds: readonly MuseumSceneVolume[];
  focalTarget: MuseumPoint3;
  interactionBounds: MuseumSceneVolume;
};

export type MuseumExhibitLayout = {
  id: MuseumExhibitId;
  zoneId: MuseumZoneId;
  spatialCellId: string;
  position: MuseumPoint;
  rotationY: number;
  interactionRadius: number;
  collider: MuseumCollider;
  viewpoint: MuseumPose;
  scene: MuseumInstallationSceneDefinition;
};

export type MuseumSpatialCell = {
  id: string;
  kind: 'room' | 'passage';
  title: string;
  bounds: MuseumBounds;
  ceilingHeight: number;
  exhibitIds: readonly MuseumExhibitId[];
  lightingGroupId: string;
};

export type MuseumSpatialConnection = {
  id: string;
  fromCellId: string;
  toCellId: string;
  openingBounds: MuseumBounds;
};

export type MuseumTrackDefinition = {
  id: string;
  center: MuseumPoint3;
  size: MuseumSize3;
};

export type MuseumExhibitLightDefinition = {
  id: string;
  exhibitId: MuseumExhibitId;
  trackId: string;
  mountPosition: MuseumPoint3;
  position: MuseumPoint3;
  target: MuseumPoint3;
  intensity: number;
  distance: number;
  angle: number;
  penumbra: number;
};

export type MuseumLightingDefinition = {
  ambientIntensity: number;
  hemisphereIntensity: number;
  directionalIntensity: number;
  tracks: readonly MuseumTrackDefinition[];
  exhibitLights: readonly MuseumExhibitLightDefinition[];
};

export type MuseumHallLayout = {
  id: MuseumHallId;
  title: string;
  eyeHeight: number;
  playerRadius: number;
  bounds: MuseumBounds;
  floorArea: number;
  cameraFar: number;
  spawn: MuseumPose;
  spawnFocalPoint: MuseumPoint;
  reset: MuseumPose;
  spatialCells: readonly MuseumSpatialCell[];
  spatialConnections: readonly MuseumSpatialConnection[];
  wallColliders: readonly MuseumWallDefinition[];
  obstacleColliders: readonly MuseumCollider[];
  exhibits: readonly MuseumExhibitLayout[];
  guidedOrder: readonly MuseumExhibitId[];
  lighting: MuseumLightingDefinition;
};

export type MuseumHallConnection = {
  id: string;
  targetHallId: MuseumHallId;
  localEntranceId: string;
  targetEntranceId: string;
};

export type MuseumHallEntrance = {
  id: string;
  position: MuseumPoint;
  arrivalPose: MuseumPose;
  transitionBounds: {
    center: MuseumPoint;
    size: {width: number; depth: number};
  };
};

export type MuseumHallPrefetch = {
  sceneAssetIds: readonly MuseumAssetId[];
  adjacentHallIds: readonly MuseumHallId[];
};

export type MuseumHallDefinition = {
  id: MuseumHallId;
  worldTransform: MuseumWorldTransform;
  layout: MuseumHallLayout;
  entrances: readonly MuseumHallEntrance[];
  connections: readonly MuseumHallConnection[];
  prefetch: MuseumHallPrefetch;
  fallbackLabel: string;
};

export type MuseumExhibitRef = {
  hallId: MuseumHallId;
  exhibitId: MuseumExhibitId;
};
