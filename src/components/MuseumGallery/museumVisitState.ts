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
export type MuseumExitPolicy = {
  navigation: 'back' | 'replace-hall';
  resumeExploration: boolean;
  requestPointerLock: boolean;
  restoreDirectory: boolean;
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
  trigger: MuseumExitTrigger,
): MuseumExitPolicy => {
  switch (context.origin) {
    case 'active-exploration':
      return {
        navigation: 'back',
        resumeExploration: true,
        requestPointerLock: trigger === 'gesture',
        restoreDirectory: false,
      };
    case 'directory':
      return {
        navigation: 'back',
        resumeExploration: false,
        requestPointerLock: false,
        restoreDirectory: true,
      };
    case 'paused-hall':
    case 'guided':
      return {
        navigation: 'back',
        resumeExploration: false,
        requestPointerLock: false,
        restoreDirectory: false,
      };
    case 'direct':
      return {
        navigation: 'replace-hall',
        resumeExploration: false,
        requestPointerLock: false,
        restoreDirectory: false,
      };
  }
};
