import type {MutableRefObject} from 'react';
import type {
  MuseumExhibitRef,
  MuseumDirectedConnection,
  MuseumInteractionTarget,
  MuseumPose,
  MuseumRuntimeNodeDefinition,
} from '../../data/museum/museumWorldTypes';
import type {MuseumHallId} from '../../data/museumCatalog';
import type {MuseumHallRegistration} from './museumWorldRegistry';

export type MuseumInputState = {
  forward: number;
  strafe: number;
  lookX: number;
  lookY: number;
  requestFrame?: () => void;
};

export type MuseumControlMode = 'idle' | 'requesting-lock' | 'locked' | 'drag-look' | 'suspended' | 'paused';

export type MuseumSceneRuntimeProps = {
  definition: MuseumRuntimeNodeDefinition;
  registrations: readonly MuseumHallRegistration[];
  readyHallIds: readonly MuseumHallId[];
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
  onNodeTransition: (connection: MuseumDirectedConnection) => void;
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
  lookX: 0,
  lookY: 0,
});

export const hasMuseumBrowserModifier = (event: Pick<KeyboardEvent, 'altKey' | 'ctrlKey' | 'metaKey'>): boolean =>
  event.altKey || event.ctrlKey || event.metaKey;
