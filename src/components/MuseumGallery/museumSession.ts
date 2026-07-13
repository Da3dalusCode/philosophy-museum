import type {
  MuseumHallLayout,
  MuseumPose,
} from '../../data/museum/museumWorldTypes';
import type {MuseumExhibitId, MuseumHallId} from '../../data/museumCatalog';
import {clampPitch, isValidMuseumPosition, normalizeYaw} from './museumMovement';

const SESSION_PREFIX = 'philosophy-atlas:museum-camera:v1:';
const SESSION_VERSION = 1;
const MAX_SERIALIZED_LENGTH = 4096;

export type MuseumSessionState = MuseumPose & {
  version: typeof SESSION_VERSION;
  hallId: MuseumHallId;
  lastNearbyExhibit?: MuseumExhibitId;
};

type MuseumSessionStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const finiteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const defaultStorage = (): MuseumSessionStorage | undefined => {
  if (typeof window === 'undefined') return undefined;
  try {
    return window.sessionStorage;
  } catch {
    return undefined;
  }
};
export const museumSessionStorageKey = (hallId: string): string => `${SESSION_PREFIX}${hallId}`;

/** Clamp finite pose values to the playable hall and reject collider intersections. */
export const sanitizeMuseumPose = (
  value: unknown,
  layout: MuseumHallLayout,
): MuseumPose | undefined => {
  if (!isRecord(value)) return undefined;
  if (!finiteNumber(value.x) || !finiteNumber(value.z)) return undefined;
  if (!finiteNumber(value.yaw) || !finiteNumber(value.pitch)) return undefined;
  const pose: MuseumPose = {
    x: Math.min(layout.bounds.maxX - layout.playerRadius, Math.max(layout.bounds.minX + layout.playerRadius, value.x)),
    z: Math.min(layout.bounds.maxZ - layout.playerRadius, Math.max(layout.bounds.minZ + layout.playerRadius, value.z)),
    yaw: normalizeYaw(value.yaw),
    pitch: clampPitch(value.pitch),
  };
  const colliders = [...layout.wallColliders, ...layout.obstacleColliders];
  return isValidMuseumPosition(pose, layout.playerRadius, layout.bounds, colliders, layout.spatialCells)
    ? pose
    : undefined;
};

export const sanitizeMuseumSession = (
  value: unknown,
  layout: MuseumHallLayout,
): MuseumSessionState | undefined => {
  if (!isRecord(value)) return undefined;
  if (value.version !== SESSION_VERSION || value.hallId !== layout.id) return undefined;
  const pose = sanitizeMuseumPose(value, layout);
  if (!pose) return undefined;

  const nearby = value.lastNearbyExhibit;
  const lastNearbyExhibit = typeof nearby === 'string'
    ? layout.exhibits.find(({id}) => id === nearby)?.id
    : undefined;
  return {
    version: SESSION_VERSION,
    hallId: layout.id,
    ...pose,
    ...(lastNearbyExhibit ? {lastNearbyExhibit} : {}),
  };
};

export const parseMuseumSession = (
  raw: string | null,
  layout: MuseumHallLayout,
): MuseumSessionState | undefined => {
  if (!raw || raw.length > MAX_SERIALIZED_LENGTH) return undefined;
  try {
    return sanitizeMuseumSession(JSON.parse(raw) as unknown, layout);
  } catch {
    return undefined;
  }
};

export const loadMuseumSession = (
  layout: MuseumHallLayout,
  storage: MuseumSessionStorage | undefined = defaultStorage(),
): MuseumSessionState | undefined => {
  if (!storage) return undefined;
  try {
    return parseMuseumSession(storage.getItem(museumSessionStorageKey(layout.id)), layout);
  } catch {
    return undefined;
  }
};

export const saveMuseumSession = (
  layout: MuseumHallLayout,
  pose: MuseumPose,
  lastNearbyExhibit?: MuseumExhibitId,
  storage: MuseumSessionStorage | undefined = defaultStorage(),
): boolean => {
  if (!storage) return false;
  const session = sanitizeMuseumSession({
    version: SESSION_VERSION,
    hallId: layout.id,
    ...pose,
    lastNearbyExhibit,
  }, layout);
  if (!session) return false;
  try {
    storage.setItem(museumSessionStorageKey(layout.id), JSON.stringify(session));
    return true;
  } catch {
    return false;
  }
};

export const removeMuseumSession = (
  hallId: MuseumHallId,
  storage: MuseumSessionStorage | undefined = defaultStorage(),
): boolean => {
  if (!storage) return false;
  try {
    storage.removeItem(museumSessionStorageKey(hallId));
    return true;
  } catch {
    return false;
  }
};
