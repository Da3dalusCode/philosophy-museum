export type MuseumPointerLockTransition =
  | {kind: 'settled'}
  | {
    kind: 'requesting';
    source: 'entry' | 'scene';
    requestId: number;
    failureChannel: 'event' | 'promise';
  }
  | {
    kind: 'overlay-close';
    outcome: 'pending' | 'acquired' | 'rejected';
    requestId: number;
    failureChannel: 'event' | 'promise';
  }
  | {kind: 'expected-release'};

export type MuseumPointerLockEvent =
  | {type: 'begin-entry'; requestId: number}
  | {type: 'begin-scene'; requestId: number}
  | {type: 'begin-overlay-close'; requestId: number}
  | {type: 'use-promise-failure'; requestId: number}
  | {type: 'expect-release'}
  | {type: 'lock-acquired'}
  | {type: 'lock-rejected'; requestId: number}
  | {type: 'release-observed'}
  | {type: 'complete-overlay-close'}
  | {type: 'cancel'};

export const MUSEUM_POINTER_LOCK_SETTLED: MuseumPointerLockTransition = {kind: 'settled'};

export const transitionMuseumPointerLock = (
  transition: MuseumPointerLockTransition,
  event: MuseumPointerLockEvent,
): MuseumPointerLockTransition => {
  switch (event.type) {
    case 'begin-entry':
      return {kind: 'requesting', source: 'entry', requestId: event.requestId, failureChannel: 'event'};
    case 'begin-scene':
      return {kind: 'requesting', source: 'scene', requestId: event.requestId, failureChannel: 'event'};
    case 'begin-overlay-close':
      return {kind: 'overlay-close', outcome: 'pending', requestId: event.requestId, failureChannel: 'event'};
    case 'use-promise-failure':
      return (transition.kind === 'requesting' || transition.kind === 'overlay-close')
        && transition.requestId === event.requestId
        ? {...transition, failureChannel: 'promise'}
        : transition;
    case 'expect-release':
      return {kind: 'expected-release'};
    case 'lock-acquired':
      return transition.kind === 'overlay-close'
        ? {...transition, outcome: 'acquired'}
        : MUSEUM_POINTER_LOCK_SETTLED;
    case 'lock-rejected':
      if (
        (transition.kind !== 'requesting' && transition.kind !== 'overlay-close')
        || transition.requestId !== event.requestId
        || (transition.kind === 'overlay-close' && transition.outcome !== 'pending')
      ) return transition;
      return transition.kind === 'overlay-close'
        ? {...transition, outcome: 'rejected'}
        : MUSEUM_POINTER_LOCK_SETTLED;
    case 'release-observed':
      return transition.kind === 'overlay-close'
        ? {...transition, outcome: 'rejected'}
        : MUSEUM_POINTER_LOCK_SETTLED;
    case 'complete-overlay-close':
    case 'cancel':
      return MUSEUM_POINTER_LOCK_SETTLED;
  }
};

export const museumPointerLockSurvivesBlockedOverlay = (
  transition: MuseumPointerLockTransition,
): boolean => transition.kind === 'overlay-close';

export const museumPointerLockEventFailureRequestId = (
  transition: MuseumPointerLockTransition,
): number | undefined => (
  (transition.kind === 'requesting' || transition.kind === 'overlay-close')
  && transition.failureChannel === 'event'
    ? transition.requestId
    : undefined
);
