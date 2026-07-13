import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
  type PointerEventHandler,
} from 'react';
import type {MuseumExhibitId} from '../../data/museumCatalog';
import {
  createMuseumInputState,
  hasMuseumBrowserModifier,
  type MuseumControlMode,
  type MuseumInputState,
} from './museumRuntime';
import {normalizeMoveInput} from './museumMovement';

const DRAG_THRESHOLD = 7;
const JOYSTICK_RADIUS = 52;
const JOYSTICK_DEAD_ZONE = .12;
const movementCodes = new Set(['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

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
  blocked: boolean;
  nearbyExhibitId?: MuseumExhibitId;
  onInteract: (exhibitId: MuseumExhibitId) => void;
  onReset: () => void;
  onOpenDirectory: () => void;
  onPause?: () => void;
};

export type MuseumControls = {
  inputRef: MutableRefObject<MuseumInputState>;
  mode: MuseumControlMode;
  pointerLockSupported: boolean;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
  beginExploring: () => void;
  pauseExploring: () => void;
  clearInput: () => void;
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
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const modeRef = useRef(mode);
  const activeRef = useRef(options.active);
  const blockedRef = useRef(options.blocked);
  const nearbyRef = useRef(options.nearbyExhibitId);
  const callbacksRef = useRef(options);
  const keysRef = useRef(new Set<string>());
  const touchMoveRef = useRef({strafe: 0, forward: 0});
  const movePointerRef = useRef<PointerSlot | null>(null);
  const lookPointerRef = useRef<PointerSlot | null>(null);
  const suppressUntilRef = useRef(0);
  const releaseReasonRef = useRef(false);
  const entryPendingRef = useRef(false);
  activeRef.current = options.active;
  blockedRef.current = options.blocked;
  nearbyRef.current = options.nearbyExhibitId;
  callbacksRef.current = options;

  const setMode = useCallback((next: MuseumControlMode) => {
    modeRef.current = next;
    setModeState(next);
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
  }, []);

  const clearInput = useCallback(() => {
    keysRef.current.clear();
    touchMoveRef.current = {strafe: 0, forward: 0};
    inputRef.current.forward = 0;
    inputRef.current.strafe = 0;
    inputRef.current.lookX = 0;
    inputRef.current.lookY = 0;
    const movement = movePointerRef.current;
    const look = lookPointerRef.current;
    if (movement) release(movement.target, movement.id);
    if (look) release(look.target, look.id);
    movePointerRef.current = null;
    lookPointerRef.current = null;
  }, []);

  const canControl = useCallback(() =>
    activeRef.current
    && !blockedRef.current
    && (modeRef.current === 'locked' || modeRef.current === 'drag-look'), []);

  const pauseExploring = useCallback(() => {
    entryPendingRef.current = false;
    releaseReasonRef.current = Boolean(canvas && document.pointerLockElement === canvas);
    clearInput();
    setMode('paused');
    if (canvas && document.pointerLockElement === canvas) document.exitPointerLock?.();
    callbacksRef.current.onPause?.();
  }, [canvas, clearInput, setMode]);

  const beginExploring = useCallback(() => {
    if (blockedRef.current) return;
    entryPendingRef.current = true;
    clearInput();
    canvas?.focus({preventScroll: true});
    if (!canvas || typeof canvas.requestPointerLock !== 'function') {
      entryPendingRef.current = false;
      setMode('drag-look');
      return;
    }
    setMode('requesting-lock');
    try {
      const result = canvas.requestPointerLock() as unknown;
      if (result && typeof (result as Promise<void>).catch === 'function') {
        void (result as Promise<void>).catch(() => {
          entryPendingRef.current = false;
          if (modeRef.current === 'requesting-lock') setMode('drag-look');
        });
      }
    } catch {
      entryPendingRef.current = false;
      setMode('drag-look');
    }
  }, [canvas, clearInput, setMode]);

  useEffect(() => {
    const onPointerLockChange = () => {
      if (canvas && document.pointerLockElement === canvas) {
        releaseReasonRef.current = false;
        if ((activeRef.current || entryPendingRef.current) && !blockedRef.current) {
          entryPendingRef.current = false;
          setMode('locked');
        }
        else document.exitPointerLock?.();
        return;
      }
      if (releaseReasonRef.current) {
        releaseReasonRef.current = false;
        return;
      }
      if (modeRef.current !== 'locked' && modeRef.current !== 'requesting-lock') return;
      clearInput();
      setMode('paused');
      callbacksRef.current.onPause?.();
    };
    const onPointerLockError = () => {
      entryPendingRef.current = false;
      if (modeRef.current === 'requesting-lock') setMode('drag-look');
    };
    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('pointerlockerror', onPointerLockError);
    return () => {
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      document.removeEventListener('pointerlockerror', onPointerLockError);
    };
  }, [canvas, clearInput, setMode]);

  useEffect(() => {
    if (options.active && !options.blocked) {
      canvas?.focus({preventScroll: true});
      if (modeRef.current === 'paused') setMode('drag-look');
      return;
    }
    entryPendingRef.current = false;
    releaseReasonRef.current = Boolean(canvas && document.pointerLockElement === canvas);
    clearInput();
    if (modeRef.current !== 'idle') setMode(options.active ? 'paused' : 'idle');
    if (canvas && document.pointerLockElement === canvas) document.exitPointerLock?.();
  }, [canvas, clearInput, options.active, options.blocked, setMode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;
      if (hasMuseumBrowserModifier(event)) return;
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
      if ((event.code === 'KeyE' || event.code === 'Enter') && nearbyRef.current) {
        event.preventDefault();
        callbacksRef.current.onInteract(nearbyRef.current);
      } else if (event.code === 'KeyR') {
        event.preventDefault();
        clearInput();
        callbacksRef.current.onReset();
      } else if (event.code === 'KeyM') {
        event.preventDefault();
        clearInput();
        callbacksRef.current.onOpenDirectory();
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (!movementCodes.has(event.code)) return;
      keysRef.current.delete(event.code);
      updateMovement();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [canControl, clearInput, pauseExploring, updateMovement]);

  useEffect(() => {
    const pauseForInterruption = () => {
      if (!activeRef.current) return;
      pauseExploring();
    };
    const onVisibility = () => document.hidden && pauseForInterruption();
    const onOrientation = () => clearInput();
    window.addEventListener('blur', pauseForInterruption);
    window.addEventListener('orientationchange', onOrientation);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('blur', pauseForInterruption);
      window.removeEventListener('orientationchange', onOrientation);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [clearInput, pauseExploring]);

  const startLook = useCallback((pointerId: number, clientX: number, clientY: number, target: Element) => {
    if (!canControl() || lookPointerRef.current || movePointerRef.current?.id === pointerId) return;
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
    const onMouseMove = (event: MouseEvent) => {
      if (modeRef.current !== 'locked' || !canControl()) return;
      inputRef.current.lookX += event.movementX;
      inputRef.current.lookY += event.movementY;
    };
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [canControl]);

  useEffect(() => () => {
    entryPendingRef.current = false;
    releaseReasonRef.current = Boolean(canvas && document.pointerLockElement === canvas);
    clearInput();
    if (canvas && document.pointerLockElement === canvas) document.exitPointerLock?.();
  }, [canvas, clearInput]);

  const beginMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (!canControl() || movePointerRef.current || lookPointerRef.current?.id === event.pointerId) return;
    event.preventDefault();
    movePointerRef.current = {id: event.pointerId, startX: event.clientX, startY: event.clientY, lastX: event.clientX, lastY: event.clientY, dragged: false, target: event.currentTarget};
    capture(event.currentTarget, event.pointerId);
  }, [canControl]);
  const moveJoystick = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const pointer = movePointerRef.current;
    if (!pointer || pointer.id !== event.pointerId || !canControl()) return;
    event.preventDefault();
    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;
    const length = Math.hypot(dx, dy);
    const scale = length > JOYSTICK_RADIUS ? JOYSTICK_RADIUS / length : 1;
    let strafe = dx * scale / JOYSTICK_RADIUS;
    let forward = -dy * scale / JOYSTICK_RADIUS;
    if (Math.hypot(strafe, forward) < JOYSTICK_DEAD_ZONE) ({x: strafe, z: forward} = {x: 0, z: 0});
    touchMoveRef.current = {strafe, forward};
    updateMovement();
  }, [canControl, updateMovement]);
  const endMove = useCallback((event: ReactPointerEvent<HTMLElement>, releaseCapture: boolean) => {
    const pointer = movePointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    if (releaseCapture) release(pointer.target, pointer.id);
    movePointerRef.current = null;
    touchMoveRef.current = {strafe: 0, forward: 0};
    updateMovement();
  }, [updateMovement]);

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
    pointerLockSupported: Boolean(canvas?.requestPointerLock),
    onCanvasReady: setCanvas,
    beginExploring,
    pauseExploring,
    clearInput,
    movementBindings,
    lookBindings,
    shouldSuppressActivation: () => performance.now() < suppressUntilRef.current,
  };
}
