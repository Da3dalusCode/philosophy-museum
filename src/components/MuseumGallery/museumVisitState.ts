import type {MuseumHallId} from '../../data/museumCatalog';

export const MUSEUM_VISIT_CONTEXT_VERSION = 2 as const;

export type MuseumExhibitOrigin =
  | 'active-exploration'
  | 'paused-hall'
  | 'directory'
  | 'guided'
  | 'direct';

export type MuseumExhibitVisitContext = {
  version: typeof MUSEUM_VISIT_CONTEXT_VERSION;
  hallId: MuseumHallId;
  origin: MuseumExhibitOrigin;
};

export type MuseumExitTrigger = 'gesture' | 'history';
export type MuseumCloseResumeStrategy =
  | 'request-pointer-lock'
  | 'resume-drag-look'
  | 'remain-paused';
export type MuseumExitPolicy = {
  navigation: 'back' | 'replace-hall';
  resumeExploration: boolean;
  restoreDirectory: boolean;
};

export type MuseumVisitPhase =
  | 'unentered'
  | 'active'
  | 'focus-suspended'
  | 'explicitly-paused';

export type MuseumVisitEvent =
  | 'enter'
  | 'focus-lost'
  | 'scene-reactivate'
  | 'explicit-pause'
  | 'resume-active-origin'
  | 'scene-error';

export const museumPhaseHasActiveIntent = (phase: MuseumVisitPhase): boolean =>
  phase === 'active' || phase === 'focus-suspended';

export const transitionMuseumVisitPhase = (
  phase: MuseumVisitPhase,
  event: MuseumVisitEvent,
): MuseumVisitPhase => {
  switch (event) {
    case 'enter':
      return 'active';
    case 'focus-lost':
      return phase === 'active' ? 'focus-suspended' : phase;
    case 'scene-reactivate':
      return phase === 'focus-suspended' ? 'active' : phase;
    case 'explicit-pause':
      return museumPhaseHasActiveIntent(phase) ? 'explicitly-paused' : phase;
    case 'resume-active-origin':
      return 'active';
    case 'scene-error':
      return 'explicitly-paused';
  }
};

type MuseumHistoryState = {
  philosophyAtlasMuseum?: MuseumExhibitVisitContext;
  [key: string]: unknown;
};

const origins = new Set<MuseumExhibitOrigin>([
  'active-exploration',
  'paused-hall',
  'directory',
  'guided',
  'direct',
]);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const createMuseumExhibitVisitContext = (
  hallId: MuseumHallId,
  origin: MuseumExhibitOrigin,
): MuseumExhibitVisitContext => ({
  version: MUSEUM_VISIT_CONTEXT_VERSION,
  hallId,
  origin,
});

export const parseMuseumExhibitVisitContext = (
  state: unknown,
  expectedHallId: MuseumHallId,
): MuseumExhibitVisitContext | undefined => {
  if (!isRecord(state) || !isRecord(state.philosophyAtlasMuseum)) return undefined;
  const value = state.philosophyAtlasMuseum;
  if (
    value.version !== MUSEUM_VISIT_CONTEXT_VERSION
    || value.hallId !== expectedHallId
    || typeof value.origin !== 'string'
    || !origins.has(value.origin as MuseumExhibitOrigin)
  ) return undefined;
  return value as MuseumExhibitVisitContext;
};

export const directMuseumVisitContext = (hallId: MuseumHallId): MuseumExhibitVisitContext =>
  createMuseumExhibitVisitContext(hallId, 'direct');

export const museumHistoryStateWithVisitContext = (
  currentState: unknown,
  context: MuseumExhibitVisitContext | undefined,
): MuseumHistoryState => ({
  ...(isRecord(currentState) ? currentState : {}),
  philosophyAtlasMuseum: context,
});

export const resolveMuseumExitPolicy = (
  context: MuseumExhibitVisitContext,
  _trigger: MuseumExitTrigger,
): MuseumExitPolicy => {
  switch (context.origin) {
    case 'active-exploration':
      return {
        navigation: 'back',
        resumeExploration: true,
        restoreDirectory: false,
      };
    case 'directory':
      return {
        navigation: 'back',
        resumeExploration: false,
        restoreDirectory: true,
      };
    case 'paused-hall':
    case 'guided':
      return {
        navigation: 'back',
        resumeExploration: false,
        restoreDirectory: false,
      };
    case 'direct':
      return {
        navigation: 'replace-hall',
        resumeExploration: false,
        restoreDirectory: false,
      };
  }
};

export const resolveMuseumCloseResumeStrategy = (
  context: MuseumExhibitVisitContext,
  trigger: MuseumExitTrigger,
): MuseumCloseResumeStrategy => {
  const policy = resolveMuseumExitPolicy(context, trigger);
  if (!policy.resumeExploration) return 'remain-paused';
  return trigger === 'gesture' ? 'request-pointer-lock' : 'resume-drag-look';
};
