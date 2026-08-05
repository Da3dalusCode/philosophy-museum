import type {MutableRefObject} from 'react';
import type {
  MuseumExhibitRef,
  MuseumDirectedConnection,
  MuseumInteractionTarget,
  MuseumPhysicalNodeId,
  MuseumPose,
  MuseumRuntimeNodeDefinition,
  MuseumSupplementalExhibitRef,
} from '../../data/museum/museumWorldTypes';
import {MUSEUM_TEXTURE_SPECS} from '../../data/museum/museumTexturePolicy';
import type {MuseumHallId, MuseumPublicHallId} from '../../data/museumCatalog';
import type {MuseumHallRegistration} from './museumWorldRegistry';
import {resolveMuseumWalkingSpeed} from './museumMovement';
import {
  getMuseumConnectionTargetHallId,
  getMuseumNodeConnections,
} from '../../data/museum/museumBuildingRuntime';
import {MUSEUM_BUILDING_MANIFEST} from '../../data/museum/museumBuildingManifest';

export type MuseumInputState = {
  forward: number;
  strafe: number;
  walkingSpeed: number;
  jumpRequested: boolean;
  slideRequested: boolean;
  lookX: number;
  lookY: number;
  requestFrame?: () => void;
};

export type MuseumControlMode = 'idle' | 'requesting-lock' | 'locked' | 'drag-look' | 'suspended' | 'paused';

export type MuseumHallLoadStatus = 'idle' | 'loading' | 'ready' | 'failed';

export type MuseumHallApproach = {
  hallId: MuseumPublicHallId;
  entranceId: string;
};

/**
 * Keeps the last public hall as the full-content owner while the visitor is in
 * ordinary connectors. The Grand Entrance is the one exception: its route
 * remains Gallery 01 for public-URL compatibility, but Gallery 01 must stay in
 * entry-resident mode until the visitor actually crosses its threshold.
 */
export const museumHallContentIsActive = ({
  physicalNodeId,
  logicalActiveHallId,
  hallId,
}: {
  physicalNodeId: MuseumPhysicalNodeId;
  logicalActiveHallId: MuseumHallId;
  hallId: MuseumPublicHallId;
}): boolean =>
  physicalNodeId !== MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId
  && logicalActiveHallId === hallId;

/**
 * Resolves the same natural threshold approach used during walking. Development
 * camera instrumentation calls this after moving the visitor pose; it never
 * names or forces a resident hall.
 */
export const resolveMuseumHallApproachAtPose = (
  definition: MuseumRuntimeNodeDefinition,
  pose: MuseumPose,
): MuseumHallApproach | undefined => {
  let approachedHall: MuseumHallApproach | undefined;
  let approachedDistance = Number.POSITIVE_INFINITY;
  for (const candidate of getMuseumNodeConnections(definition.id)) {
    const entrance = definition.entrances.find(({id}) => id === candidate.localEntranceId);
    const targetHallId = getMuseumConnectionTargetHallId(candidate);
    if (!entrance || !targetHallId) continue;
    const distance = Math.hypot(pose.x - entrance.position.x, pose.z - entrance.position.z);
    if (
      distance <= MUSEUM_BUILDING_MANIFEST.residencyPolicy.approachDistance
      && distance < approachedDistance
    ) {
      approachedDistance = distance;
      approachedHall = {hallId: targetHallId, entranceId: candidate.targetEntranceId};
    }
  }
  return approachedHall;
};

const MUSEUM_HALL_READINESS_SEPARATOR = '::museum-entry::';

export const museumHallEntryReadinessKey = (
  hallId: MuseumPublicHallId,
  entranceId?: string,
): string => `${hallId}${MUSEUM_HALL_READINESS_SEPARATOR}${entranceId ?? 'active'}`;

export const museumHallResidentRenderKey = (hallId: MuseumPublicHallId): string =>
  `${hallId}${MUSEUM_HALL_READINESS_SEPARATOR}resident`;

/** Readiness signals emitted by one mounted hall-content subtree. */
export const resolveMuseumHallRenderedReadinessKeys = (
  hallId: MuseumPublicHallId,
  active: boolean,
  entryEntranceId?: string,
): readonly string[] => {
  const keys = active
    ? [museumHallEntryReadinessKey(hallId)]
    : [];
  if (entryEntranceId) keys.push(museumHallEntryReadinessKey(hallId, entryEntranceId));
  if (!keys.length) keys.push(museumHallResidentRenderKey(hallId));
  return keys;
};

export const museumHallReadinessKeyBelongsTo = (
  key: string,
  hallId: MuseumPublicHallId,
): boolean => key.startsWith(`${hallId}${MUSEUM_HALL_READINESS_SEPARATOR}`);

export const MUSEUM_READINESS_PRESENTATIONS = {
  idle: {
    title: 'Gallery ahead',
    subtitle: 'Approach to prepare · the crosscut and through-route remain open',
    accent: '#66878a',
  },
  loading: {
    title: 'Preparing gallery',
    subtitle: 'Please wait at the threshold · other Museum routes remain open',
    accent: '#b58a51',
  },
  failed: {
    title: 'Preparation failed',
    subtitle: 'Use Retry on screen · other Museum routes remain open',
    accent: '#b35f47',
  },
} as const satisfies Record<Exclude<MuseumHallLoadStatus, 'ready'>, {
  title: string;
  subtitle: string;
  accent: string;
}>;

export const MUSEUM_READINESS_GATE_CONFIG = {
  threshold: {
    minimumWidth: .8,
    horizontalInset: .18,
    height: .036,
    depth: .11,
    centerY: .018,
    centerZ: .07,
  },
  plaque: {
    minimumWidth: 1.45,
    maximumWidth: 1.9,
    clearWidthFraction: .42,
    edgeInset: .18,
    centerY: 1.42,
    backingPadding: .08,
    backingDepth: .055,
    backingCenterZ: .042,
    planeCenterZ: .073,
  },
  stanchion: {
    minimumOffset: .4,
    edgeInset: .16,
    centerZ: .07,
    postCenterY: .52,
    postHeight: 1.04,
    postTopRadius: .045,
    postBottomRadius: .06,
    markerCenterY: 1.07,
    markerRadius: .075,
  },
} as const;

export type MuseumReadinessGateGeometry = {
  acrossX: boolean;
  clearWidth: number;
  rotation: number;
  thresholdWidth: number;
  plaqueWidth: number;
  plaqueHeight: number;
  plaqueX: number;
  stanchionOffset: number;
};

export const resolveMuseumReadinessGateGeometry = (
  entrance: MuseumRuntimeNodeDefinition['entrances'][number],
): MuseumReadinessGateGeometry => {
  const acrossX = Math.abs(entrance.inwardNormal.z) > .5;
  const clearWidth = acrossX ? entrance.transitionBounds.size.width : entrance.transitionBounds.size.depth;
  const thresholdWidth = Math.max(
    MUSEUM_READINESS_GATE_CONFIG.threshold.minimumWidth,
    clearWidth - MUSEUM_READINESS_GATE_CONFIG.threshold.horizontalInset,
  );
  const plaqueWidth = Math.min(
    MUSEUM_READINESS_GATE_CONFIG.plaque.maximumWidth,
    Math.max(
      MUSEUM_READINESS_GATE_CONFIG.plaque.minimumWidth,
      clearWidth * MUSEUM_READINESS_GATE_CONFIG.plaque.clearWidthFraction,
    ),
  );
  const plaqueHeight = plaqueWidth
    * MUSEUM_TEXTURE_SPECS.readinessSign.height
    / MUSEUM_TEXTURE_SPECS.readinessSign.width;
  return {
    acrossX,
    clearWidth,
    thresholdWidth,
    plaqueWidth,
    plaqueHeight,
    plaqueX: -clearWidth / 2 + plaqueWidth / 2 + MUSEUM_READINESS_GATE_CONFIG.plaque.edgeInset,
    stanchionOffset: Math.max(
      MUSEUM_READINESS_GATE_CONFIG.stanchion.minimumOffset,
      clearWidth / 2 - MUSEUM_READINESS_GATE_CONFIG.stanchion.edgeInset,
    ),
    rotation: acrossX
      ? (entrance.inwardNormal.z > 0 ? 0 : Math.PI)
      : (entrance.inwardNormal.x > 0 ? Math.PI / 2 : -Math.PI / 2),
  };
};

export const resolveMuseumReadinessGateStatus = (
  status: MuseumHallLoadStatus | undefined,
  ready: boolean,
): Exclude<MuseumHallLoadStatus, 'ready'> | undefined => {
  if (ready) return undefined;
  return status === 'loading' || status === 'failed' ? status : 'idle';
};

/** One deterministic authored destination shared by every Reset origin. */
export const resolveMuseumOrientationReset = ({
  sourceHallId,
  targetHallId,
  targetNodeId,
  targetPose,
}: {
  sourceHallId: MuseumPublicHallId;
  targetHallId: MuseumPublicHallId;
  targetNodeId: MuseumPhysicalNodeId;
  targetPose: MuseumPose;
}) => ({
  activeHallId: targetHallId,
  activeNodeId: targetNodeId,
  pose: {...targetPose},
  clearedHallIds: [...new Set<MuseumPublicHallId>([sourceHallId, targetHallId])],
});

export type MuseumNodeTransition = {
  connection: MuseumDirectedConnection;
  targetNode: MuseumRuntimeNodeDefinition;
  crossingPose: MuseumPose;
  arrival: MuseumPose;
};

export type MuseumNodeTransitionBlockReason = 'unready' | 'invalid-target';

export type MuseumSceneRuntimeProps = {
  definition: MuseumRuntimeNodeDefinition;
  activeHallId: MuseumHallId;
  registrations: readonly MuseumHallRegistration[];
  readyHallEntryKeys: readonly string[];
  hallEntryLoadStatus: Readonly<Partial<Record<string, MuseumHallLoadStatus>>>;
  hallContentEpochs: Partial<Record<MuseumPublicHallId, number>>;
  active: boolean;
  blocked: boolean;
  poseRevision: number;
  reducedMotion: boolean;
  inputRef: MutableRefObject<MuseumInputState>;
  poseRef: MutableRefObject<MuseumPose>;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
  onNearbyInteractionChange: (target: MuseumInteractionTarget | undefined) => void;
  onSelectExhibit: (exhibit: MuseumExhibitRef) => void;
  onSelectSupplementalExhibit: (exhibit: MuseumSupplementalExhibitRef) => void;
  onSelectVisitorMap: () => void;
  onNodeTransition: (transition: MuseumNodeTransition) => boolean;
  onNodeTransitionBlocked: (
    connection: MuseumDirectedConnection,
    reason: MuseumNodeTransitionBlockReason,
  ) => void;
  onApproachHall: (approach: MuseumHallApproach | undefined) => void;
  onHallContentReady: (hallId: MuseumPublicHallId, readinessKey: string) => void;
  onHallContentUnavailable: (hallId: MuseumPublicHallId, readinessKey: string) => void;
  onHallContentError: (hallId: MuseumPublicHallId, error: unknown) => void;
  onSceneGesture: () => void;
  onSceneError: (error: unknown) => void;
};

export const createMuseumInputState = (): MuseumInputState => ({
  forward: 0,
  strafe: 0,
  walkingSpeed: resolveMuseumWalkingSpeed('standard'),
  jumpRequested: false,
  slideRequested: false,
  lookX: 0,
  lookY: 0,
});

export const hasMuseumBrowserModifier = (event: Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'metaKey'>): boolean =>
  event.altKey || event.ctrlKey || event.metaKey;
