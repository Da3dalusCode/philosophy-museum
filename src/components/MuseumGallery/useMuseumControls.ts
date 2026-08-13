import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
  type PointerEventHandler,
} from 'react';
import {
  createMuseumInputState,
  hasMuseumBrowserModifier,
  type MuseumControlMode,
  type MuseumInputState,
} from './museumRuntime';
import {
  normalizeMoveInput,
  resolveMuseumWalkingSpeed,
  type MuseumWalkingPace,
} from './museumMovement';
import {
  MUSEUM_POINTER_LOCK_SETTLED,
  museumControlModeAfterUngesturedResume,
  museumPointerLockEventFailureRequestId,
  museumPointerLockSurvivesBlockedOverlay,
  transitionMuseumPointerLock,
  type MuseumPointerLockEvent,
  type MuseumPointerLockTransition,
} from './museumPointerLockState';
import type {MuseumControlScheme} from './museumControlScheme';
import {
  canClaimMuseumTouchPointer,
  resolveMuseumTouchAxes,
} from './museumTouchInput';

const DRAG_THRESHOLD = 7;
const movementCodes = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);
const temporaryFastCodes = new Set(['ShiftLeft', 'ShiftRight']);
const jumpCodes = new Set(['Space']);
const slideCodes = new Set(['ControlLeft', 'ControlRight', 'KeyC']);

type PointerSlot = {
  id: number;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  dragged: boolean;
  target: Element;
};

export type MuseumPointerBindings = {
  onPointerDown: PointerEventHandler<HTMLElement>;
  onPointerMove: PointerEventHandler<HTMLElement>;
  onPointerUp: PointerEventHandler<HTMLElement>;
  onPointerCancel: PointerEventHandler<HTMLElement>;
  onLostPointerCapture: PointerEventHandler<HTMLElement>;
};

export type UseMuseumControlsOptions = {
  active: boolean;
  suspended: boolean;
  blocked: boolean;
  controlScheme: MuseumControlScheme;
  canInteract: boolean;
  onInteract: () => void;
  onReset: () => void;
  onOpenVisitorMap: () => void;
  onPause?: () => void;
  onSuspend?: () => void;
  onReactivate?: () => void;
};

export type MuseumControls = {
  inputRef: MutableRefObject<MuseumInputState>;
  mode: MuseumControlMode;
  walkingPace: MuseumWalkingPace;
  pointerLockSupported: boolean;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
  beginExploring: () => void;
  handleSceneGesture: () => void;
  requestOverlayCloseResume: () => void;
  completeOverlayCloseResume: () => void;
  resumeWithoutGesture: () => void;
  blockInput: () => void;
  pauseExploring: () => void;
  clearInput: () => void;
  setWalkingPace: (pace: MuseumWalkingPace) => void;
  requestJump: () => void;
  requestSlide: () => void;
  movementBindings: MuseumPointerBindings;
  lookBindings: MuseumPointerBindings;
  shouldSuppressActivation: () => boolean;
};

const capture = (target: Element, pointerId: number): void => {
  try {
    if (target instanceof Element && 'setPointerCapture' in target) target.setPointerCapture(pointerId);
  } catch { /* The browser may already have cancelled the pointer. */ }
};

const release = (target: Element, pointerId: number): void => {
  try {
    if (target instanceof Element && 'hasPointerCapture' in target && target.hasPointerCapture(pointerId)) {
      target.releasePointerCapture(pointerId);
    }
  } catch { /* lostpointercapture is already a complete cleanup signal. */ }
};

const isEditableTarget = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement && Boolean(target.closest('input, textarea, select, button, a, [contenteditable="true"]'));

export function useMuseumControls(options: UseMuseumControlsOptions): MuseumControls {
  const inputRef = useRef<MuseumInputState>(createMuseumInputState());
  const [mode, setModeState] = useState<MuseumControlMode>('idle');
  const [walkingPace, setWalkingPaceState] = useState<MuseumWalkingPace>('standard');
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const modeRef = useRef(mode);
  const walkingPaceRef = useRef(walkingPace);
  const activeRef = useRef(options.active);
  const suspendedRef = useRef(options.suspended);
  const blockedRef = useRef(options.blocked);
  const controlSchemeRef = useRef(options.controlScheme);
  const canInteractRef = useRef(options.canInteract);
  const callbacksRef = useRef(options);
  const keysRef = useRef(new Set<string>());
  const touchMoveRef = useRef({strafe: 0, forward: 0});
  const movePointerRef = useRef<PointerSlot | null>(null);
  const lookPointerRef = useRef<PointerSlot | null>(null);
  const suppressUntilRef = useRef(0);
  const nextPointerLockRequestIdRef = useRef(0);
  const pointerLockTransitionRef = useRef<MuseumPointerLockTransition>(MUSEUM_POINTER_LOCK_SETTLED);
  walkingPaceRef.current = walkingPace;
  activeRef.current = options.active;
  suspendedRef.current = options.suspended;
  blockedRef.current = options.blocked;
  controlSchemeRef.current = options.controlScheme;
  canInteractRef.current = options.canInteract;
  callbacksRef.current = options;

  const setMode = useCallback((next: MuseumControlMode) => {
    modeRef.current = next;
    setModeState(next);
  }, []);

  const advancePointerLock = useCallback((event: MuseumPointerLockEvent) => {
    const next = transitionMuseumPointerLock(pointerLockTransitionRef.current, event);
    pointerLockTransitionRef.current = next;
    return next;
  }, []);

  const updateMovement = useCallback(() => {
    const keys = keysRef.current;
    const keyboardForward = Number(keys.has('KeyW') || keys.has('ArrowUp')) - Number(keys.has('KeyS') || keys.has('ArrowDown'));
    const keyboardStrafe = Number(keys.has('KeyD') || keys.has('ArrowRight')) - Number(keys.has('KeyA') || keys.has('ArrowLeft'));
    const normalized = normalizeMoveInput(
      keyboardStrafe + touchMoveRef.current.strafe,
      keyboardForward + touchMoveRef.current.forward,
    );
    inputRef.current.strafe = normalized.x;
    inputRef.current.forward = normalized.z;
    inputRef.current.walkingSpeed = resolveMuseumWalkingSpeed(
      walkingPaceRef.current,
      keys.has('ShiftLeft') || keys.has('ShiftRight'),
    );
    inputRef.current.requestFrame?.();
  }, []);

  const setWalkingPace = useCallback((pace: MuseumWalkingPace) => {
    walkingPaceRef.current = pace;
    setWalkingPaceState(pace);
    updateMovement();
  }, [updateMovement]);

  const clearInput = useCallback(() => {
    keysRef.current.clear();
    touchMoveRef.current = {strafe: 0, forward: 0};
    inputRef.current.forward = 0;
    inputRef.current.strafe = 0;
    inputRef.current.walkingSpeed = resolveMuseumWalkingSpeed(walkingPaceRef.current);
    inputRef.current.jumpRequested = false;
    inputRef.current.slideRequested = false;
    inputRef.current.lookX = 0;
    inputRef.current.lookY = 0;
    inputRef.current.requestFrame?.();
    const movement = movePointerRef.current;
    const look = lookPointerRef.current;
    if (movement?.target instanceof HTMLElement) {
      movement.target.style.removeProperty('--museum-touch-x');
      movement.target.style.removeProperty('--museum-touch-y');
    }
    if (movement) release(movement.target, movement.id);
    if (look) release(look.target, look.id);
    movePointerRef.current = null;
    lookPointerRef.current = null;
  }, []);

  const canControl = useCallback(() =>
    activeRef.current
    && !blockedRef.current
    && (modeRef.current === 'locked' || modeRef.current === 'drag-look'), []);

  const requestJump = useCallback(() => {
    if (!canControl()) return;
    inputRef.current.jumpRequested = true;
    inputRef.current.requestFrame?.();
  }, [canControl]);

  const requestSlide = useCallback(() => {
    if (!canControl()) return;
    inputRef.current.slideRequested = true;
    inputRef.current.requestFrame?.();
  }, [canControl]);

  const rejectPointerLock = useCallback((requestId: number) => {
    if (canvas && document.pointerLockElement === canvas) return;
    const previous = pointerLockTransitionRef.current;
    const next = advancePointerLock({type: 'lock-rejected', requestId});
    if (next === previous) return;
    if (museumPointerLockSurvivesBlockedOverlay(next) && blockedRef.current) {
      setMode('suspended');
      return;
    }
    if (activeRef.current && !blockedRef.current) setMode('drag-look');
  }, [advancePointerLock, canvas, setMode]);

  const requestPointerLock = useCallback((source: 'entry' | 'scene' | 'overlay-close') => {
    const requestId = ++nextPointerLockRequestIdRef.current;
    advancePointerLock({
      type: source === 'entry'
        ? 'begin-entry'
        : source === 'scene'
          ? 'begin-scene'
          : 'begin-overlay-close',
      requestId,
    });
    setMode(source === 'overlay-close' ? 'requesting-lock' : 'drag-look');
    if (!canvas || typeof canvas.requestPointerLock !== 'function') {
      rejectPointerLock(requestId);
      return;
    }
    try {
      const result = canvas.requestPointerLock() as unknown;
      if (result && typeof (result as Promise<void>).catch === 'function') {
        advancePointerLock({type: 'use-promise-failure', requestId});
        void (result as Promise<void>).catch(() => rejectPointerLock(requestId));
      }
    } catch {
      rejectPointerLock(requestId);
    }
  }, [advancePointerLock, canvas, rejectPointerLock, setMode]);

  const pauseExploring = useCallback(() => {
    activeRef.current = false;
    suspendedRef.current = false;
    advancePointerLock({type: canvas && document.pointerLockElement === canvas ? 'expect-release' : 'cancel'});
    clearInput();
    setMode('paused');
    if (canvas && document.pointerLockElement === canvas) document.exitPointerLock?.();
    callbacksRef.current.onPause?.();
  }, [advancePointerLock, canvas, clearInput, setMode]);

  const beginExploring = useCallback(() => {
    activeRef.current = true;
    suspendedRef.current = false;
    clearInput();
    canvas?.focus({preventScroll: true});
    if (controlSchemeRef.current === 'touch') {
      advancePointerLock({type: 'cancel'});
      setMode('drag-look');
    } else requestPointerLock('entry');
  }, [advancePointerLock, canvas, clearInput, requestPointerLock, setMode]);

  const handleSceneGesture = useCallback(() => {
    if (blockedRef.current || (canvas && document.pointerLockElement === canvas)) return;
    if (suspendedRef.current) {
      activeRef.current = true;
      suspendedRef.current = false;
      clearInput();
      callbacksRef.current.onReactivate?.();
      canvas?.focus({preventScroll: true});
      if (controlSchemeRef.current === 'touch') setMode('drag-look');
      else requestPointerLock('scene');
      return;
    }
    if (!activeRef.current || modeRef.current !== 'drag-look') return;
    clearInput();
    canvas?.focus({preventScroll: true});
    if (controlSchemeRef.current === 'touch') setMode('drag-look');
    else requestPointerLock('scene');
  }, [canvas, clearInput, requestPointerLock, setMode]);

  const requestOverlayCloseResume = useCallback(() => {
    activeRef.current = true;
    suspendedRef.current = false;
    clearInput();
    if (controlSchemeRef.current === 'touch') {
      advancePointerLock({type: 'cancel'});
      setMode('drag-look');
    } else requestPointerLock('overlay-close');
  }, [advancePointerLock, clearInput, requestPointerLock, setMode]);

  const completeOverlayCloseResume = useCallback(() => {
    activeRef.current = true;
    suspendedRef.current = false;
    clearInput();
    const locked = Boolean(canvas && document.pointerLockElement === canvas);
    advancePointerLock({type: 'complete-overlay-close'});
    if (document.hidden || !document.hasFocus()) {
      activeRef.current = false;
      suspendedRef.current = true;
      advancePointerLock({type: locked ? 'expect-release' : 'cancel'});
      setMode('suspended');
      if (locked) document.exitPointerLock?.();
      callbacksRef.current.onSuspend?.();
      return;
    }
    setMode(locked ? 'locked' : 'drag-look');
    window.requestAnimationFrame(() => canvas?.focus({preventScroll: true}));
  }, [advancePointerLock, canvas, clearInput, setMode]);

  const resumeWithoutGesture = useCallback(() => {
    activeRef.current = true;
    suspendedRef.current = false;
    const locked = Boolean(canvas && document.pointerLockElement === canvas);
    advancePointerLock({type: 'cancel'});
    clearInput();
    if (document.hidden || !document.hasFocus()) {
      activeRef.current = false;
      suspendedRef.current = true;
      advancePointerLock({type: locked ? 'expect-release' : 'cancel'});
      setMode('suspended');
      if (locked) document.exitPointerLock?.();
      callbacksRef.current.onSuspend?.();
      return;
    }
    setMode(museumControlModeAfterUngesturedResume(locked));
    window.requestAnimationFrame(() => canvas?.focus({preventScroll: true}));
  }, [advancePointerLock, canvas, clearInput, setMode]);

  const blockInput = useCallback(() => {
    advancePointerLock({type: canvas && document.pointerLockElement === canvas ? 'expect-release' : 'cancel'});
    clearInput();
    setMode(activeRef.current || suspendedRef.current ? 'suspended' : 'paused');
    if (canvas && document.pointerLockElement === canvas) document.exitPointerLock?.();
  }, [advancePointerLock, canvas, clearInput, setMode]);

  const suspendForFocusLoss = useCallback(() => {
    if (!activeRef.current || blockedRef.current) return;
    activeRef.current = false;
    suspendedRef.current = true;
    advancePointerLock({type: canvas && document.pointerLockElement === canvas ? 'expect-release' : 'cancel'});
    clearInput();
    setMode('suspended');
    if (canvas && document.pointerLockElement === canvas) document.exitPointerLock?.();
    callbacksRef.current.onSuspend?.();
  }, [advancePointerLock, canvas, clearInput, setMode]);

  useEffect(() => {
    const onPointerLockChange = () => {
      if (canvas && document.pointerLockElement === canvas) {
        const next = advancePointerLock({type: 'lock-acquired'});
        if (museumPointerLockSurvivesBlockedOverlay(next)) {
          setMode('requesting-lock');
        } else if (activeRef.current && !blockedRef.current) {
          setMode('locked');
        }
        else document.exitPointerLock?.();
        return;
      }
      if (pointerLockTransitionRef.current.kind === 'expected-release') {
        advancePointerLock({type: 'release-observed'});
        return;
      }
      if (pointerLockTransitionRef.current.kind === 'overlay-close') {
        advancePointerLock({type: 'release-observed'});
        if (blockedRef.current) setMode('suspended');
        else if (activeRef.current) setMode('drag-look');
        return;
      }
      if (modeRef.current !== 'locked' && modeRef.current !== 'requesting-lock') return;
      advancePointerLock({type: 'release-observed'});
      clearInput();
      if (activeRef.current && !blockedRef.current) {
        if (document.hidden || !document.hasFocus()) suspendForFocusLoss();
        else setMode('drag-look');
      } else if (suspendedRef.current || blockedRef.current) setMode('suspended');
      else setMode('paused');
    };
    const onPointerLockError = () => {
      const requestId = museumPointerLockEventFailureRequestId(pointerLockTransitionRef.current);
      if (requestId !== undefined) rejectPointerLock(requestId);
    };
    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('pointerlockerror', onPointerLockError);
    return () => {
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      document.removeEventListener('pointerlockerror', onPointerLockError);
    };
  }, [advancePointerLock, canvas, clearInput, rejectPointerLock, setMode, suspendForFocusLoss]);

  useEffect(() => {
    if (options.blocked) {
      if (museumPointerLockSurvivesBlockedOverlay(pointerLockTransitionRef.current)) {
        clearInput();
        return;
      }
      blockInput();
      return;
    }
    if (options.suspended) {
      const locked = Boolean(canvas && document.pointerLockElement === canvas);
      advancePointerLock({type: locked ? 'expect-release' : 'cancel'});
      clearInput();
      if (modeRef.current !== 'suspended') setMode('suspended');
      if (locked) document.exitPointerLock?.();
      return;
    }
    if (options.active) {
      if (modeRef.current === 'idle' || modeRef.current === 'paused' || modeRef.current === 'suspended') {
        setMode('drag-look');
      }
      return;
    }
    advancePointerLock({type: canvas && document.pointerLockElement === canvas ? 'expect-release' : 'cancel'});
    clearInput();
    if (modeRef.current !== 'idle' && modeRef.current !== 'paused') setMode('idle');
    if (canvas && document.pointerLockElement === canvas) document.exitPointerLock?.();
  }, [advancePointerLock, blockInput, canvas, clearInput, options.active, options.blocked, options.suspended, setMode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;
      if (!event.repeat && jumpCodes.has(event.code) && canControl()) {
        event.preventDefault();
        requestJump();
        return;
      }
      if (!event.repeat && slideCodes.has(event.code) && canControl()) {
        event.preventDefault();
        requestSlide();
        return;
      }
      if (hasMuseumBrowserModifier(event)) return;
      if (temporaryFastCodes.has(event.code)) {
        if (!canControl()) return;
        event.preventDefault();
        keysRef.current.add(event.code);
        updateMovement();
        return;
      }
      if (movementCodes.has(event.code)) {
        if (!canControl()) return;
        event.preventDefault();
        keysRef.current.add(event.code);
        updateMovement();
        return;
      }
      if (event.code === 'Escape' && modeRef.current === 'drag-look' && activeRef.current) {
        event.preventDefault();
        pauseExploring();
        return;
      }
      if (!canControl() || event.repeat) return;
      if ((event.code === 'KeyE' || event.code === 'Enter') && canInteractRef.current) {
        event.preventDefault();
        callbacksRef.current.onInteract();
      } else if (event.code === 'KeyR') {
        event.preventDefault();
        clearInput();
        callbacksRef.current.onReset();
      } else if (event.code === 'KeyM') {
        event.preventDefault();
        clearInput();
        callbacksRef.current.onOpenVisitorMap();
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (!movementCodes.has(event.code) && !temporaryFastCodes.has(event.code)) return;
      keysRef.current.delete(event.code);
      updateMovement();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [canControl, clearInput, pauseExploring, requestJump, requestSlide, updateMovement]);

  useEffect(() => {
    const onVisibility = () => document.hidden && suspendForFocusLoss();
    const onViewportChange = () => clearInput();
    window.addEventListener('blur', suspendForFocusLoss);
    window.addEventListener('resize', onViewportChange);
    window.addEventListener('orientationchange', onViewportChange);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('blur', suspendForFocusLoss);
      window.removeEventListener('resize', onViewportChange);
      window.removeEventListener('orientationchange', onViewportChange);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [clearInput, suspendForFocusLoss]);

  const startLook = useCallback((pointerId: number, clientX: number, clientY: number, target: Element) => {
    if (!canControl() || !canClaimMuseumTouchPointer(
      pointerId,
      lookPointerRef.current?.id,
      movePointerRef.current?.id,
    )) return;
    lookPointerRef.current = {id: pointerId, startX: clientX, startY: clientY, lastX: clientX, lastY: clientY, dragged: false, target};
    capture(target, pointerId);
  }, [canControl]);

  const moveLook = useCallback((pointerId: number, clientX: number, clientY: number) => {
    const pointer = lookPointerRef.current;
    if (!pointer || pointer.id !== pointerId || !canControl()) return;
    const deltaX = clientX - pointer.lastX;
    const deltaY = clientY - pointer.lastY;
    pointer.lastX = clientX;
    pointer.lastY = clientY;
    if (!pointer.dragged && Math.hypot(clientX - pointer.startX, clientY - pointer.startY) >= DRAG_THRESHOLD) pointer.dragged = true;
    if (!pointer.dragged) return;
    inputRef.current.lookX += deltaX;
    inputRef.current.lookY += deltaY;
    inputRef.current.requestFrame?.();
  }, [canControl]);

  const endLook = useCallback((pointerId: number, releaseCapture: boolean) => {
    const pointer = lookPointerRef.current;
    if (!pointer || pointer.id !== pointerId) return;
    if (pointer.dragged) suppressUntilRef.current = performance.now() + 300;
    if (releaseCapture) release(pointer.target, pointer.id);
    lookPointerRef.current = null;
  }, []);

  useEffect(() => {
    if (!canvas) return;
    const previousTouchAction = canvas.style.touchAction;
    canvas.style.touchAction = options.active && !options.blocked ? 'none' : previousTouchAction;
    const down = (event: PointerEvent) => {
      if (event.button !== 0 || modeRef.current !== 'drag-look') return;
      startLook(event.pointerId, event.clientX, event.clientY, canvas);
    };
    const move = (event: PointerEvent) => moveLook(event.pointerId, event.clientX, event.clientY);
    const up = (event: PointerEvent) => endLook(event.pointerId, true);
    const lost = (event: PointerEvent) => endLook(event.pointerId, false);
    const click = (event: MouseEvent) => {
      if (performance.now() >= suppressUntilRef.current) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('lostpointercapture', lost);
    canvas.addEventListener('click', click, true);
    return () => {
      canvas.style.touchAction = previousTouchAction;
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('lostpointercapture', lost);
      canvas.removeEventListener('click', click, true);
    };
  }, [canvas, endLook, moveLook, options.active, options.blocked, startLook]);

  useEffect(() => {
    if (options.controlScheme !== 'touch' || !canvas || document.pointerLockElement !== canvas) return;
    advancePointerLock({type: 'expect-release'});
    clearInput();
    setMode('drag-look');
    document.exitPointerLock?.();
  }, [advancePointerLock, canvas, clearInput, options.controlScheme, setMode]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (modeRef.current !== 'locked' || !canControl()) return;
      inputRef.current.lookX += event.movementX;
      inputRef.current.lookY += event.movementY;
      inputRef.current.requestFrame?.();
    };
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [canControl]);

  useEffect(() => () => {
    advancePointerLock({type: canvas && document.pointerLockElement === canvas ? 'expect-release' : 'cancel'});
    clearInput();
    if (canvas && document.pointerLockElement === canvas) document.exitPointerLock?.();
  }, [advancePointerLock, canvas, clearInput]);

  const beginMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (!canControl() || !canClaimMuseumTouchPointer(
      event.pointerId,
      movePointerRef.current?.id,
      lookPointerRef.current?.id,
    )) return;
    event.preventDefault();
    const bounds = event.currentTarget.getBoundingClientRect();
    movePointerRef.current = {
      id: event.pointerId,
      startX: bounds.left + bounds.width / 2,
      startY: bounds.top + bounds.height / 2,
      lastX: event.clientX,
      lastY: event.clientY,
      dragged: false,
      target: event.currentTarget,
    };
    capture(event.currentTarget, event.pointerId);
    const axes = resolveMuseumTouchAxes(
      movePointerRef.current.startX,
      movePointerRef.current.startY,
      event.clientX,
      event.clientY,
    );
    touchMoveRef.current = axes;
    event.currentTarget.style.setProperty('--museum-touch-x', `${axes.strafe * 18}px`);
    event.currentTarget.style.setProperty('--museum-touch-y', `${-axes.forward * 18}px`);
    updateMovement();
  }, [canControl, updateMovement]);
  const moveJoystick = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const pointer = movePointerRef.current;
    if (!pointer || pointer.id !== event.pointerId || !canControl()) return;
    event.preventDefault();
    const axes = resolveMuseumTouchAxes(pointer.startX, pointer.startY, event.clientX, event.clientY);
    touchMoveRef.current = axes;
    if (pointer.target instanceof HTMLElement) {
      pointer.target.style.setProperty('--museum-touch-x', `${axes.strafe * 18}px`);
      pointer.target.style.setProperty('--museum-touch-y', `${-axes.forward * 18}px`);
    }
    updateMovement();
  }, [canControl, updateMovement]);
  const endMove = useCallback((event: ReactPointerEvent<HTMLElement>, releaseCapture: boolean) => {
    const pointer = movePointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    if (releaseCapture) release(pointer.target, pointer.id);
    movePointerRef.current = null;
    touchMoveRef.current = {strafe: 0, forward: 0};
    if (pointer.target instanceof HTMLElement) {
      pointer.target.style.removeProperty('--museum-touch-x');
      pointer.target.style.removeProperty('--museum-touch-y');
    }
    updateMovement();
  }, [updateMovement]);

  useEffect(() => {
    const finishPointer = (event: PointerEvent) => {
      const movePointer = movePointerRef.current;
      if (movePointer?.id === event.pointerId) {
        movePointerRef.current = null;
        touchMoveRef.current = {strafe: 0, forward: 0};
        if (movePointer.target instanceof HTMLElement) {
          movePointer.target.style.removeProperty('--museum-touch-x');
          movePointer.target.style.removeProperty('--museum-touch-y');
        }
        updateMovement();
      }
      endLook(event.pointerId, false);
    };
    window.addEventListener('pointerup', finishPointer, true);
    window.addEventListener('pointercancel', finishPointer, true);
    return () => {
      window.removeEventListener('pointerup', finishPointer, true);
      window.removeEventListener('pointercancel', finishPointer, true);
    };
  }, [endLook, updateMovement]);

  const movementBindings: MuseumPointerBindings = {
    onPointerDown: beginMove,
    onPointerMove: moveJoystick,
    onPointerUp: (event) => endMove(event, true),
    onPointerCancel: (event) => endMove(event, true),
    onLostPointerCapture: (event) => endMove(event, false),
  };
  const lookBindings: MuseumPointerBindings = {
    onPointerDown: (event) => { event.preventDefault(); startLook(event.pointerId, event.clientX, event.clientY, event.currentTarget); },
    onPointerMove: (event) => { event.preventDefault(); moveLook(event.pointerId, event.clientX, event.clientY); },
    onPointerUp: (event) => endLook(event.pointerId, true),
    onPointerCancel: (event) => endLook(event.pointerId, true),
    onLostPointerCapture: (event) => endLook(event.pointerId, false),
  };

  return {
    inputRef,
    mode,
    walkingPace,
    pointerLockSupported: Boolean(canvas?.requestPointerLock),
    onCanvasReady: setCanvas,
    beginExploring,
    handleSceneGesture,
    requestOverlayCloseResume,
    completeOverlayCloseResume,
    resumeWithoutGesture,
    blockInput,
    pauseExploring,
    clearInput,
    setWalkingPace,
    requestJump,
    requestSlide,
    movementBindings,
    lookBindings,
    shouldSuppressActivation: () => performance.now() < suppressUntilRef.current,
  };
}
