import type {MutableRefObject} from 'react';
import type {
  MuseumExhibitRef,
  MuseumDirectedConnection,
  MuseumInteractionTarget,
  MuseumPose,
  MuseumRuntimeNodeDefinition,
} from '../../data/museum/museumWorldTypes';
import {MUSEUM_TEXTURE_SPECS} from '../../data/museum/museumTexturePolicy';
import type {MuseumHallId} from '../../data/museumCatalog';
import type {MuseumHallRegistration} from './museumWorldRegistry';
import {resolveMuseumWalkingSpeed} from './museumMovement';

export type MuseumInputState = {
  forward: number;
  strafe: number;
  walkingSpeed: number;
  lookX: number;
  lookY: number;
  requestFrame?: () => void;
};

export type MuseumControlMode = 'idle' | 'requesting-lock' | 'locked' | 'drag-look' | 'suspended' | 'paused';

export type MuseumHallLoadStatus = 'idle' | 'loading' | 'ready' | 'failed';

export const MUSEUM_READINESS_PRESENTATIONS = {
  idle: {
    title: 'Gallery ahead',
    subtitle: 'Approach to prepare · alternate Ring routes remain open',
    accent: '#66878a',
  },
  loading: {
    title: 'Preparing gallery',
    subtitle: 'Please wait at the threshold · alternate Ring routes remain open',
    accent: '#b58a51',
  },
  failed: {
    title: 'Preparation failed',
    subtitle: 'Use Retry on screen · alternate Ring routes remain open',
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

export type MuseumSceneRuntimeProps = {
  definition: MuseumRuntimeNodeDefinition;
  registrations: readonly MuseumHallRegistration[];
  readyHallIds: readonly MuseumHallId[];
  hallLoadStatus: Partial<Record<MuseumHallId, MuseumHallLoadStatus>>;
  hallContentEpochs: Partial<Record<MuseumHallId, number>>;
  active: boolean;
  blocked: boolean;
  poseRevision: number;
  reducedMotion: boolean;
  inputRef: MutableRefObject<MuseumInputState>;
  poseRef: MutableRefObject<MuseumPose>;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
  onNearbyInteractionChange: (target: MuseumInteractionTarget | undefined) => void;
  onSelectExhibit: (exhibit: MuseumExhibitRef) => void;
  onSelectVisitorMap: () => void;
  onNodeTransition: (connection: MuseumDirectedConnection) => boolean;
  onNodeTransitionBlocked: (connection: MuseumDirectedConnection) => void;
  onApproachHall: (hallId: MuseumHallId | undefined) => void;
  onHallContentReady: (hallId: MuseumHallId) => void;
  onHallContentUnavailable: (hallId: MuseumHallId) => void;
  onHallContentError: (hallId: MuseumHallId, error: unknown) => void;
  onSceneGesture: () => void;
  onSceneError: (error: unknown) => void;
};

export const createMuseumInputState = (): MuseumInputState => ({
  forward: 0,
  strafe: 0,
  walkingSpeed: resolveMuseumWalkingSpeed('standard'),
  lookX: 0,
  lookY: 0,
});

export const hasMuseumBrowserModifier = (event: Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'metaKey'>): boolean =>
  event.altKey || event.ctrlKey || event.metaKey;
