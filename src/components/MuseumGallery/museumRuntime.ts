import type {MutableRefObject} from 'react';
import type {MuseumPose} from '../../data/museum/ancientGreekHall';

export type MuseumInputState = {
  forward: number;
  strafe: number;
  lookX: number;
  lookY: number;
};

export type MuseumControlMode = 'idle' | 'requesting-lock' | 'locked' | 'drag-look' | 'paused';

export type MuseumSceneRuntimeProps = {
  active: boolean;
  blocked: boolean;
  poseRevision: number;
  reducedMotion: boolean;
  inputRef: MutableRefObject<MuseumInputState>;
  poseRef: MutableRefObject<MuseumPose>;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
  onNearbyChange: (exhibitId: string | undefined) => void;
  onSelectExhibit: (exhibitId: string) => void;
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
