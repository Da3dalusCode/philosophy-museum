import type {
  MuseumBounds,
  MuseumCollider,
  MuseumExhibitLayout,
  MuseumPoint,
} from '../../data/museum/ancientGreekHall';
import type {MuseumExhibitId} from '../../data/museumCatalog';

const EPSILON = 1e-7;
const DEFAULT_MAX_DELTA = .05;
const MAX_SUBSTEP_DISTANCE = .12;
const MAX_RESOLUTION_PASSES = 4;
const MAX_PITCH = Math.PI / 2 - .08;

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

export const clampFrameDelta = (delta: number, maxDelta = DEFAULT_MAX_DELTA): number => {
  if (!Number.isFinite(delta) || delta <= 0) return 0;
  const safeMaximum = Number.isFinite(maxDelta) && maxDelta > 0 ? maxDelta : DEFAULT_MAX_DELTA;
  return Math.min(delta, safeMaximum);
};

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
  const localX = cosine * offsetX + sine * offsetZ;
  const localZ = -sine * offsetX + cosine * offsetZ;
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
  let localX = cosine * offsetX + sine * offsetZ;
  let localZ = -sine * offsetX + cosine * offsetZ;
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
    x: collider.center.x + cosine * localX - sine * localZ,
    z: collider.center.z + sine * localX + cosine * localZ,
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

export const isValidMuseumPosition = (
  position: MuseumPoint,
  playerRadius: number,
  bounds: MuseumBounds,
  colliders: readonly MuseumCollider[],
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
  return !colliders.some((collider) => circleIntersectsCollider(position, playerRadius, collider));
};

/** Move through a deterministic series of short collision-resolution steps. */
export const moveWithCollisions = (
  position: MuseumPoint,
  displacement: MuseumPoint,
  playerRadius: number,
  bounds: MuseumBounds,
  colliders: readonly MuseumCollider[],
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
    current = isValidMuseumPosition(candidate, playerRadius, bounds, colliders)
      ? candidate
      : previous;
  }

  return current;
};

export const nearestInteractable = (
  position: MuseumPoint,
  exhibits: readonly MuseumExhibitLayout[],
): MuseumExhibitId | undefined => {
  if (!isFinitePoint(position)) return undefined;
  let nearest: MuseumExhibitLayout | undefined;
  let nearestDistance = Number.POSITIVE_INFINITY;
  for (const exhibit of exhibits) {
    if (!Number.isFinite(exhibit.interactionRadius) || exhibit.interactionRadius <= 0) continue;
    const distance = Math.hypot(position.x - exhibit.position.x, position.z - exhibit.position.z);
    if (distance <= exhibit.interactionRadius && distance < nearestDistance - EPSILON) {
      nearest = exhibit;
      nearestDistance = distance;
    }
  }
  return nearest?.id;
};
