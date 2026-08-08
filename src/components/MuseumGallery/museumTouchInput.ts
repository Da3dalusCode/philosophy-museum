export type MuseumTouchAxes = {strafe: number; forward: number};

export const MUSEUM_TOUCH_JOYSTICK_RADIUS = 52;
export const MUSEUM_TOUCH_JOYSTICK_DEAD_ZONE = .12;

/** Resolve a fixed-center touch pad into bounded strafe/forward axes. */
export const resolveMuseumTouchAxes = (
  centerX: number,
  centerY: number,
  clientX: number,
  clientY: number,
  radius = MUSEUM_TOUCH_JOYSTICK_RADIUS,
  deadZone = MUSEUM_TOUCH_JOYSTICK_DEAD_ZONE,
): MuseumTouchAxes => {
  if (![centerX, centerY, clientX, clientY, radius, deadZone].every(Number.isFinite) || radius <= 0) {
    return {strafe: 0, forward: 0};
  }
  const dx = clientX - centerX;
  const dy = clientY - centerY;
  const length = Math.hypot(dx, dy);
  if (length / radius < Math.max(0, deadZone)) return {strafe: 0, forward: 0};
  const scale = length > radius ? radius / length : 1;
  return {
    strafe: dx * scale / radius,
    forward: -dy * scale / radius,
  };
};

/** A single pointer may own only one surface; different pointers may move and look together. */
export const canClaimMuseumTouchPointer = (
  pointerId: number,
  ownPointerId: number | undefined,
  otherPointerId: number | undefined,
): boolean => Number.isFinite(pointerId)
  && ownPointerId === undefined
  && otherPointerId !== pointerId;
