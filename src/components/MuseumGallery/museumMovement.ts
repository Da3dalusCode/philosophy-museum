import type {
  MuseumBounds,
  MuseumCollider,
  MuseumExhibitLayout,
  MuseumPoint,
  MuseumSpatialCell,
} from '../../data/museum/museumWorldTypes';
import type {MuseumExhibitId} from '../../data/museumCatalog';

const EPSILON = 1e-7;
const DEFAULT_MAX_DELTA = .05;
const MAX_SUBSTEP_DISTANCE = .12;
const MAX_RESOLUTION_PASSES = 4;
const MAX_PITCH = Math.PI / 2 - .08;

export type MuseumWalkingPace = 'standard' | 'fast';

export type MuseumLocomotionMode = 'grounded' | 'jumping' | 'sliding';

export type MuseumArcadeMotionState = {
  mode: MuseumLocomotionMode;
  verticalOffset: number;
  verticalVelocity: number;
  crouchOffset: number;
  slideElapsed: number;
  slideDirection: MuseumPoint;
  momentumDirection: MuseumPoint;
  momentumSpeed: number;
  momentumRemaining: number;
};

export type MuseumArcadeMotionFrame = {
  state: MuseumArcadeMotionState;
  forward: number;
  strafe: number;
  walkingSpeed: number;
  cameraOffset: number;
  active: boolean;
  changed: boolean;
};

export const MUSEUM_STANDARD_WALK_SPEED = 5.625;
export const MUSEUM_FAST_WALK_SPEED = 9;
export const MUSEUM_SLIDE_INITIAL_SPEED = 10.8;
export const MUSEUM_SLIDE_END_SPEED = 5.85;
export const MUSEUM_MAX_MOVEMENT_SPEED = MUSEUM_SLIDE_INITIAL_SPEED;
export const MUSEUM_SLIDE_DURATION = .66;
export const MUSEUM_JUMP_VELOCITY = 4.7;
export const MUSEUM_JUMP_GRAVITY = 13.4;
export const MUSEUM_SLIDE_CAMERA_DROP = .52;
export const MUSEUM_SLIDE_CANCEL_MOMENTUM_DURATION = .24;

export const createMuseumArcadeMotionState = (): MuseumArcadeMotionState => ({
  mode: 'grounded',
  verticalOffset: 0,
  verticalVelocity: 0,
  crouchOffset: 0,
  slideElapsed: 0,
  slideDirection: {x: 0, z: 0},
  momentumDirection: {x: 0, z: 0},
  momentumSpeed: 0,
  momentumRemaining: 0,
});

/** Resolve one bounded walking speed; temporary fast movement never stacks. */
export const resolveMuseumWalkingSpeed = (
  pace: MuseumWalkingPace,
  temporaryFast = false,
): number => pace === 'fast' || temporaryFast
  ? MUSEUM_FAST_WALK_SPEED
  : MUSEUM_STANDARD_WALK_SPEED;

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, value));

const isFinitePoint = (point: MuseumPoint): boolean =>
  Number.isFinite(point.x) && Number.isFinite(point.z);

/** Normalize keyboard/joystick axes so diagonal movement is not faster. */
export const normalizeMoveInput = (strafe: number, forward: number): MuseumPoint => {
  if (!Number.isFinite(strafe) || !Number.isFinite(forward)) return {x: 0, z: 0};
  const length = Math.hypot(strafe, forward);
  if (length <= 1) return {x: strafe, z: forward};
  return {x: strafe / length, z: forward / length};
};

/** Convert local strafe/forward input to the same world heading used by Three's camera. */
export const setMuseumMovementDisplacement = (
  target: MuseumPoint,
  direction: MuseumPoint,
  yaw: number,
  distance: number,
): MuseumPoint => {
  if (!isFinitePoint(direction) || !Number.isFinite(yaw) || !Number.isFinite(distance)) {
    target.x = 0;
    target.z = 0;
    return target;
  }
  const sine = Math.sin(yaw);
  const cosine = Math.cos(yaw);
  target.x = (direction.x * cosine - direction.z * sine) * distance;
  target.z = (-direction.x * sine - direction.z * cosine) * distance;
  return target;
};

export const clampFrameDelta = (delta: number, maxDelta = DEFAULT_MAX_DELTA): number => {
  if (!Number.isFinite(delta) || delta <= 0) return 0;
  const safeMaximum = Number.isFinite(maxDelta) && maxDelta > 0 ? maxDelta : DEFAULT_MAX_DELTA;
  return Math.min(delta, safeMaximum);
};

const moveToward = (value: number, target: number, maximumDelta: number): number => {
  if (value < target) return Math.min(target, value + maximumDelta);
  if (value > target) return Math.max(target, value - maximumDelta);
  return value;
};

export const resolveMuseumSlideSpeed = (elapsed: number): number => {
  const progress = clamp(elapsed / MUSEUM_SLIDE_DURATION, 0, 1);
  return MUSEUM_SLIDE_INITIAL_SPEED
    + (MUSEUM_SLIDE_END_SPEED - MUSEUM_SLIDE_INITIAL_SPEED) * progress;
};

/**
 * Advance the intentionally lightweight first-person movement layer. Vertical
 * motion only changes eye height; horizontal travel continues through the same
 * collision and doorway path used by ordinary walking.
 */
export const advanceMuseumArcadeMotion = (
  previous: MuseumArcadeMotionState,
  input: {
    forward: number;
    strafe: number;
    walkingSpeed: number;
    jumpRequested: boolean;
    slideRequested: boolean;
  },
  rawDelta: number,
): MuseumArcadeMotionFrame => {
  const delta = clampFrameDelta(rawDelta);
  const direction = normalizeMoveInput(input.strafe, input.forward);
  const hasDirection = Math.hypot(direction.x, direction.z) > EPSILON;
  const baseSpeed = Number.isFinite(input.walkingSpeed)
    ? clamp(input.walkingSpeed, 0, MUSEUM_FAST_WALK_SPEED)
    : MUSEUM_STANDARD_WALK_SPEED;
  const state: MuseumArcadeMotionState = {
    ...previous,
    slideDirection: {...previous.slideDirection},
    momentumDirection: {...previous.momentumDirection},
  };

  if (input.jumpRequested && state.mode !== 'jumping') {
    if (state.mode === 'sliding') {
      state.momentumDirection = {...state.slideDirection};
      state.momentumSpeed = resolveMuseumSlideSpeed(state.slideElapsed);
      state.momentumRemaining = MUSEUM_SLIDE_CANCEL_MOMENTUM_DURATION;
    } else {
      state.momentumDirection = {...direction};
      state.momentumSpeed = 0;
      state.momentumRemaining = 0;
    }
    state.mode = 'jumping';
    state.verticalOffset = Math.max(0, state.verticalOffset);
    state.verticalVelocity = MUSEUM_JUMP_VELOCITY;
  } else if (input.slideRequested && state.mode === 'grounded' && hasDirection) {
    state.mode = 'sliding';
    state.slideElapsed = 0;
    state.slideDirection = {...direction};
  }

  if (state.mode === 'jumping') {
    state.verticalOffset += state.verticalVelocity * delta;
    state.verticalVelocity -= MUSEUM_JUMP_GRAVITY * delta;
    if (state.verticalOffset <= 0 && state.verticalVelocity <= 0) {
      state.mode = 'grounded';
      state.verticalOffset = 0;
      state.verticalVelocity = 0;
      state.momentumSpeed = 0;
      state.momentumRemaining = 0;
    }
  } else {
    state.verticalOffset = 0;
    state.verticalVelocity = 0;
  }

  if (state.mode === 'sliding') {
    state.slideElapsed += delta;
    if (state.slideElapsed >= MUSEUM_SLIDE_DURATION) state.mode = 'grounded';
  }

  const crouchTarget = state.mode === 'sliding' ? -MUSEUM_SLIDE_CAMERA_DROP : 0;
  state.crouchOffset = moveToward(state.crouchOffset, crouchTarget, delta * 6.5);

  let frameDirection = direction;
  let walkingSpeed = baseSpeed;
  if (state.mode === 'sliding') {
    frameDirection = state.slideDirection;
    walkingSpeed = resolveMuseumSlideSpeed(state.slideElapsed);
  } else if (state.mode === 'jumping' && state.momentumRemaining > 0) {
    const momentumRatio = state.momentumRemaining / MUSEUM_SLIDE_CANCEL_MOMENTUM_DURATION;
    frameDirection = hasDirection ? direction : state.momentumDirection;
    walkingSpeed = Math.max(
      baseSpeed,
      baseSpeed + (state.momentumSpeed - baseSpeed) * momentumRatio,
    );
    state.momentumRemaining = Math.max(0, state.momentumRemaining - delta);
  }

  const active = state.mode !== 'grounded' || Math.abs(state.crouchOffset) > EPSILON;
  const changed = input.jumpRequested
    || input.slideRequested
    || active
    || previous.mode !== state.mode
    || Math.abs(previous.verticalOffset - state.verticalOffset) > EPSILON
    || Math.abs(previous.crouchOffset - state.crouchOffset) > EPSILON;
  return {
    state,
    forward: frameDirection.z,
    strafe: frameDirection.x,
    walkingSpeed: clamp(walkingSpeed, 0, MUSEUM_MAX_MOVEMENT_SPEED),
    cameraOffset: state.verticalOffset + state.crouchOffset,
    active,
    changed,
  };
};

export const resolveMuseumArcadeCameraOffset = (
  state: MuseumArcadeMotionState,
  reducedMotion: boolean,
): number => (state.verticalOffset + state.crouchOffset) * (reducedMotion ? .45 : 1);

export const normalizeYaw = (yaw: number): number => {
  if (!Number.isFinite(yaw)) return 0;
  const wrapped = (yaw + Math.PI) % (Math.PI * 2);
  return (wrapped < 0 ? wrapped + Math.PI * 2 : wrapped) - Math.PI;
};

export const clampPitch = (pitch: number): number =>
  Number.isFinite(pitch) ? clamp(pitch, -MAX_PITCH, MAX_PITCH) : 0;

export const circleIntersectsCollider = (
  position: MuseumPoint,
  playerRadius: number,
  collider: MuseumCollider,
): boolean => {
  if (!isFinitePoint(position) || !Number.isFinite(playerRadius) || playerRadius <= 0) return true;
  const halfWidth = collider.size.width / 2;
  const halfDepth = collider.size.depth / 2;
  if (
    !isFinitePoint(collider.center)
    || !Number.isFinite(halfWidth)
    || !Number.isFinite(halfDepth)
    || halfWidth <= 0
    || halfDepth <= 0
    || !Number.isFinite(collider.rotation)
  ) return true;

  const cosine = Math.cos(collider.rotation);
  const sine = Math.sin(collider.rotation);
  const offsetX = position.x - collider.center.x;
  const offsetZ = position.z - collider.center.z;
  const localX = cosine * offsetX - sine * offsetZ;
  const localZ = sine * offsetX + cosine * offsetZ;
  const nearestX = clamp(localX, -halfWidth, halfWidth);
  const nearestZ = clamp(localZ, -halfDepth, halfDepth);
  const distanceSquared = (localX - nearestX) ** 2 + (localZ - nearestZ) ** 2;
  return distanceSquared < playerRadius ** 2 - EPSILON;
};

/** Return the minimum translated circle center outside an oriented rectangle. */
export const resolveCircleAgainstCollider = (
  position: MuseumPoint,
  playerRadius: number,
  collider: MuseumCollider,
): MuseumPoint => {
  if (!circleIntersectsCollider(position, playerRadius, collider)) return position;

  const halfWidth = collider.size.width / 2;
  const halfDepth = collider.size.depth / 2;
  const cosine = Math.cos(collider.rotation);
  const sine = Math.sin(collider.rotation);
  const offsetX = position.x - collider.center.x;
  const offsetZ = position.z - collider.center.z;
  let localX = cosine * offsetX - sine * offsetZ;
  let localZ = sine * offsetX + cosine * offsetZ;
  const nearestX = clamp(localX, -halfWidth, halfWidth);
  const nearestZ = clamp(localZ, -halfDepth, halfDepth);
  const differenceX = localX - nearestX;
  const differenceZ = localZ - nearestZ;
  const distance = Math.hypot(differenceX, differenceZ);

  if (distance > EPSILON) {
    const push = playerRadius - distance + EPSILON;
    localX += differenceX / distance * push;
    localZ += differenceZ / distance * push;
  } else {
    const distanceToXFace = halfWidth - Math.abs(localX);
    const distanceToZFace = halfDepth - Math.abs(localZ);
    if (distanceToXFace <= distanceToZFace) {
      localX = (localX < 0 ? -1 : 1) * (halfWidth + playerRadius + EPSILON);
    } else {
      localZ = (localZ < 0 ? -1 : 1) * (halfDepth + playerRadius + EPSILON);
    }
  }

  return {
    x: collider.center.x + cosine * localX + sine * localZ,
    z: collider.center.z - sine * localX + cosine * localZ,
  };
};

const clampToBounds = (
  position: MuseumPoint,
  playerRadius: number,
  bounds: MuseumBounds,
): MuseumPoint => ({
  x: clamp(position.x, bounds.minX + playerRadius, bounds.maxX - playerRadius),
  z: clamp(position.z, bounds.minZ + playerRadius, bounds.maxZ - playerRadius),
});

const pointInsideBounds = (point: MuseumPoint, bounds: MuseumBounds): boolean =>
  point.x >= bounds.minX - EPSILON
  && point.x <= bounds.maxX + EPSILON
  && point.z >= bounds.minZ - EPSILON
  && point.z <= bounds.maxZ + EPSILON;

/** Require the player's complete circular footprint to remain in the union of authored rooms/passages. */
export const positionInsideSpatialUnion = (
  position: MuseumPoint,
  playerRadius: number,
  spatialCells: readonly MuseumSpatialCell[],
): boolean => {
  if (!spatialCells.length) return true;
  const sampleCount = 16;
  for (let index = -1; index < sampleCount; index += 1) {
    const point = index < 0
      ? position
      : {
          x: position.x + Math.cos(index / sampleCount * Math.PI * 2) * playerRadius,
          z: position.z + Math.sin(index / sampleCount * Math.PI * 2) * playerRadius,
        };
    if (!spatialCells.some((cell) => pointInsideBounds(point, cell.bounds))) return false;
  }
  return true;
};

export const isValidMuseumPosition = (
  position: MuseumPoint,
  playerRadius: number,
  bounds: MuseumBounds,
  colliders: readonly MuseumCollider[],
  spatialCells: readonly MuseumSpatialCell[] = [],
): boolean => {
  if (!isFinitePoint(position) || !Number.isFinite(playerRadius) || playerRadius <= 0) return false;
  if (![bounds.minX, bounds.maxX, bounds.minZ, bounds.maxZ].every(Number.isFinite)) return false;
  if (bounds.maxX - bounds.minX < playerRadius * 2 || bounds.maxZ - bounds.minZ < playerRadius * 2) {
    return false;
  }
  if (
    position.x < bounds.minX + playerRadius - EPSILON
    || position.x > bounds.maxX - playerRadius + EPSILON
    || position.z < bounds.minZ + playerRadius - EPSILON
    || position.z > bounds.maxZ - playerRadius + EPSILON
  ) return false;
  if (!positionInsideSpatialUnion(position, playerRadius, spatialCells)) return false;
  return !colliders.some((collider) => circleIntersectsCollider(position, playerRadius, collider));
};

/** Move through a deterministic series of short collision-resolution steps. */
export const moveWithCollisions = (
  position: MuseumPoint,
  displacement: MuseumPoint,
  playerRadius: number,
  bounds: MuseumBounds,
  colliders: readonly MuseumCollider[],
  spatialCells: readonly MuseumSpatialCell[] = [],
): MuseumPoint => {
  if (
    !isFinitePoint(position)
    || !isFinitePoint(displacement)
    || !Number.isFinite(playerRadius)
    || playerRadius <= 0
  ) return position;

  const distance = Math.hypot(displacement.x, displacement.z);
  if (distance <= EPSILON) return position;
  const maxStep = Math.min(MAX_SUBSTEP_DISTANCE, Math.max(playerRadius * .5, .02));
  const stepCount = Math.max(1, Math.ceil(distance / maxStep));
  const step = {x: displacement.x / stepCount, z: displacement.z / stepCount};
  let current = position;

  for (let index = 0; index < stepCount; index += 1) {
    const previous = current;
    let candidate = clampToBounds({x: current.x + step.x, z: current.z + step.z}, playerRadius, bounds);
    for (let pass = 0; pass < MAX_RESOLUTION_PASSES; pass += 1) {
      let changed = false;
      for (const collider of colliders) {
        if (!circleIntersectsCollider(candidate, playerRadius, collider)) continue;
        candidate = resolveCircleAgainstCollider(candidate, playerRadius, collider);
        candidate = clampToBounds(candidate, playerRadius, bounds);
        changed = true;
      }
      if (!changed) break;
    }
    current = isValidMuseumPosition(candidate, playerRadius, bounds, colliders, spatialCells)
      ? candidate
      : previous;
  }

  return current;
};

export const nearestInteractableItem = <T extends Pick<MuseumExhibitLayout, 'position' | 'interactionRadius'>>(
  position: MuseumPoint,
  exhibits: readonly T[],
): T | undefined => {
  if (!isFinitePoint(position)) return undefined;
  let nearest: T | undefined;
  let nearestDistance = Number.POSITIVE_INFINITY;
  for (const exhibit of exhibits) {
    if (!Number.isFinite(exhibit.interactionRadius) || exhibit.interactionRadius <= 0) continue;
    const distance = Math.hypot(position.x - exhibit.position.x, position.z - exhibit.position.z);
    if (distance <= exhibit.interactionRadius && distance < nearestDistance - EPSILON) {
      nearest = exhibit;
      nearestDistance = distance;
    }
  }
  return nearest;
};

export const nearestInteractable = (
  position: MuseumPoint,
  exhibits: readonly MuseumExhibitLayout[],
): MuseumExhibitId | undefined => nearestInteractableItem(position, exhibits)?.id;
