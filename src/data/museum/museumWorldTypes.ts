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
  /** Optional visual trim for authored overlaps; collision continues to use center/size. */
  renderCenter?: MuseumPoint;
  renderSize?: {width: number; depth: number};
};

export type MuseumFurnishingDefinition = MuseumCollider & {
  kind: 'bench' | 'orientation-plinth' | 'translation-table' | 'threshold-marker' | 'visitor-map-kiosk';
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
  /** Optional visual trim for a shared hall seam; traversal still uses bounds. */
  renderBounds?: MuseumBounds;
};

export type MuseumSignDefinition = {
  id: string;
  kind: 'entrance' | 'zone' | 'wayfinding';
  title: string;
  kicker: string;
  subtitle: string;
  position: MuseumPoint3;
  rotationY: number;
  width: number;
  height: number;
};

export type MuseumSpatialConnection = {
  id: string;
  fromCellId: string;
  toCellId: string;
  openingBounds: MuseumBounds;
};

export type MuseumRoomEntryView = {
  spatialCellId: string;
  pose: MuseumPose;
  expectedVisibleExhibitIds: readonly MuseumExhibitId[];
};

export type MuseumGuidedWalkLeg = {
  fromExhibitId: MuseumExhibitId;
  toExhibitId: MuseumExhibitId;
  waypoints: readonly MuseumPoint[];
};

export type MuseumCirculationPath = {
  id: string;
  points: readonly MuseumPoint[];
  clearanceRadius: number;
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
  cameraFov: number;
  cameraFar: number;
  spawn: MuseumPose;
  spawnFocalPoint: MuseumPoint;
  reset: MuseumPose;
  spatialCells: readonly MuseumSpatialCell[];
  spatialConnections: readonly MuseumSpatialConnection[];
  entryViews: readonly MuseumRoomEntryView[];
  wallColliders: readonly MuseumWallDefinition[];
  furnishings: readonly MuseumFurnishingDefinition[];
  obstacleColliders: readonly MuseumCollider[];
  exhibits: readonly MuseumExhibitLayout[];
  primaryCirculation: MuseumCirculationPath;
  guidedOrder: readonly MuseumExhibitId[];
  guidedWalkLegs: readonly MuseumGuidedWalkLeg[];
  lighting: MuseumLightingDefinition;
  signs?: readonly MuseumSignDefinition[];
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
  /** Local-space direction from the seam into this hall. */
  inwardNormal: MuseumPoint;
  arrivalPose: MuseumPose;
  transitionBounds: {
    center: MuseumPoint;
    size: {width: number; depth: number};
  };
};

export type MuseumHallPrefetch = {
  /** The small scene-media set that must be ready before a physical crossing. */
  entrySceneAssetIds: readonly MuseumAssetId[];
  /** The complete hall scene-media set, warmed after the entry set is ready. */
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

export type MuseumInteractionTarget =
  | ({kind: 'exhibit'} & MuseumExhibitRef)
  | {kind: 'visitor-map'; hallId: MuseumHallId; kioskId: string};
