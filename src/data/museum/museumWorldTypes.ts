import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumResolvedHallTemplate} from './museumHallTemplates';
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
  /** Render-only vertical offset. Omitted for floor-standing collision walls. */
  bottom?: number;
  /** Doorway or reservation whose clear-height opening this lintel closes above. */
  openingId?: string;
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
  connectionId: string;
  sourceNodeId: MuseumPhysicalNodeId;
  targetNodeId: MuseumPhysicalNodeId;
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
};

export type MuseumHallContentDefinition = {
  id: MuseumHallId;
  layout: MuseumHallLayout;
  prefetch: MuseumHallPrefetch;
  fallbackLabel: string;
};

export type MuseumHallDefinition = MuseumHallContentDefinition & {
  physicalNodeId: MuseumPhysicalNodeId;
  worldTransform: MuseumWorldTransform;
  /** Compiler-owned shell: collision walls plus render-only portal lintels. */
  architectureWalls: readonly MuseumWallDefinition[];
  /** Canonical interface contract resolved through the node's geometry adapter. */
  resolvedTemplate: MuseumResolvedHallTemplate;
  entrances: readonly MuseumHallEntrance[];
};

export type MuseumPhysicalNodeId = string;
export type MuseumPhysicalNodeKind = 'hall' | 'court' | 'corridor' | 'entrance';
export type MuseumImplementationStatus = 'live' | 'planned' | 'retired';
export type MuseumPilotRole =
  | 'public-entrance'
  | 'outer-shell'
  | 'forum-location'
  | 'outer-loop-link'
  | 'forum-spoke'
  | 'shortcut';

export type MuseumDoorwaySlot = {
  id: string;
  position: MuseumPoint;
  /** Local-space direction from the seam into this physical node. */
  inwardNormal: MuseumPoint;
  clearWidth: number;
  clearHeight: number;
  transitionDepth: number;
  landingBounds: MuseumBounds;
  arrivalPose: MuseumPose;
};

export type MuseumNavigationLayout = {
  id: string;
  title: string;
  eyeHeight: number;
  playerRadius: number;
  bounds: MuseumBounds;
  cameraFov: number;
  cameraFar: number;
  spawn: MuseumPose;
  reset: MuseumPose;
  spatialCells: readonly MuseumSpatialCell[];
  spatialConnections: readonly MuseumSpatialConnection[];
  wallColliders: readonly MuseumWallDefinition[];
  furnishings: readonly MuseumFurnishingDefinition[];
  obstacleColliders: readonly MuseumCollider[];
  exhibits: readonly MuseumExhibitLayout[];
  signs?: readonly MuseumSignDefinition[];
};

export type MuseumRuntimeNodeDefinition = {
  id: MuseumPhysicalNodeId;
  kind: MuseumPhysicalNodeKind;
  publicHallId?: MuseumHallId;
  pilotRole: MuseumPilotRole;
  templateId?: 'standard-rect' | 'sequence-3' | 'crossroads-4' | 'focal-terminal';
  geometryAdapterId?: string;
  implementationStatus: MuseumImplementationStatus;
  levelId: 'L0';
  worldTransform: MuseumWorldTransform;
  layout: MuseumNavigationLayout;
  /** Full-height wall segments plus render-only lintels for public architecture. */
  architectureWalls?: readonly MuseumWallDefinition[];
  /** Present on public hall nodes compiled through a hall-template contract. */
  resolvedTemplate?: MuseumResolvedHallTemplate;
  entrances: readonly MuseumHallEntrance[];
  mapLabel: string;
  mapStatus: 'open' | 'orientation-open' | 'future';
};

export type MuseumDirectedConnection = MuseumHallConnection & {
  routeRole: MuseumPhysicalConnection['routeRole'];
  accessible: boolean;
  implementationStatus: MuseumPhysicalConnection['implementationStatus'];
};

export type MuseumPhysicalConnection = {
  id: string;
  a: {nodeId: MuseumPhysicalNodeId; slotId: string};
  b: {nodeId: MuseumPhysicalNodeId; slotId: string};
  routeRole: 'outer-loop' | 'forum-spoke' | 'shortcut';
  accessible: boolean;
  implementationStatus: 'live' | 'blocked' | 'planned';
};

export type MuseumReservation = {
  id: string;
  reservationType: 'insertion' | 'outward-expansion';
  hostNodeId: MuseumPhysicalNodeId;
  label: 'Future gallery — not yet open';
  /** Reserved future footprint, kept outside the live circulation envelope. */
  center: MuseumPoint;
  size: {width: number; depth: number};
  /** Physical wall-line center and clear blocking width for the closed portal. */
  barrierCenter: MuseumPoint;
  barrierWidth: number;
  rotation: number;
  blocked: true;
  implementationStatus: 'reserved';
  targetProgramHallId?: string;
  expansionPortalId?: string;
};

export type MuseumExhibitRef = {
  hallId: MuseumHallId;
  exhibitId: MuseumExhibitId;
};

export type MuseumInteractionTarget =
  | ({kind: 'exhibit'} & MuseumExhibitRef)
  | {kind: 'visitor-map'; hallId: MuseumHallId; kioskId: string};
