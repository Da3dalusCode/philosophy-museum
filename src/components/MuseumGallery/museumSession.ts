import {MUSEUM_BUILDING_MANIFEST} from '../../data/museum/museumBuildingManifest';
import type {
  MuseumHallLayout,
  MuseumPose,
  MuseumSpatialCell,
} from '../../data/museum/museumWorldTypes';
import type {MuseumExhibitId, MuseumHallId} from '../../data/museumCatalog';
import {clampPitch, isValidMuseumPosition, normalizeYaw} from './museumMovement';

const sessionManifest = MUSEUM_BUILDING_MANIFEST as {
  manifestVersion: string;
  nodes: readonly {
    publicHallId?: string;
    doorwaySlots: readonly {id: string; arrivalPose: MuseumPose}[];
  }[];
};
const SESSION_PREFIX = 'philosophy-atlas:museum-camera:v2:';
const LEGACY_SESSION_PREFIX = 'philosophy-atlas:museum-camera:v1:';
export const MUSEUM_LAST_VISIT_STORAGE_KEY = 'philosophy-atlas:museum-last-visit:v2';
export const MUSEUM_SESSION_VERSION = 2 as const;
export const MUSEUM_SESSION_MANIFEST_VERSION = sessionManifest.manifestVersion;
const LEGACY_SESSION_VERSION = 1 as const;
const MAX_SERIALIZED_LENGTH = 4096;
const MAX_SEMANTIC_ID_LENGTH = 512;

export type MuseumSessionAnchor = {
  hallId: MuseumHallId;
  roomId?: string;
  exhibitId?: string;
  entranceId?: string;
};

export type MuseumStoredSession = MuseumSessionAnchor & {
  version: typeof MUSEUM_SESSION_VERSION;
  manifestVersion: string;
};

export type MuseumLastVisitPointer = MuseumStoredSession;

export type MuseumSessionState = MuseumPose & MuseumStoredSession & {
  /** Retained for existing callers while `exhibitId` is the persisted semantic field. */
  lastNearbyExhibit?: MuseumExhibitId;
  migratedFromVersion?: typeof LEGACY_SESSION_VERSION;
};

export type MuseumSessionStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

type ResumableExhibit = {
  id: string;
  spatialCellId: string;
  viewpoint: MuseumPose;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const finiteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const semanticId = (value: unknown): string | undefined =>
  typeof value === 'string'
  && value.length > 0
  && value.length <= MAX_SEMANTIC_ID_LENGTH
    ? value
    : undefined;

const defaultStorage = (): MuseumSessionStorage | undefined => {
  if (typeof window === 'undefined') return undefined;
  try {
    return window.sessionStorage;
  } catch {
    return undefined;
  }
};

export const museumSessionStorageKey = (hallId: string): string => `${SESSION_PREFIX}${hallId}`;
export const legacyMuseumSessionStorageKey = (hallId: string): string =>
  `${LEGACY_SESSION_PREFIX}${hallId}`;
export const museumLastVisitStorageKey = (): string => MUSEUM_LAST_VISIT_STORAGE_KEY;

const authoredSpatialCells = (layout: MuseumHallLayout): readonly MuseumSpatialCell[] =>
  layout.spatialCells.map((cell) => cell.renderBounds
    ? {...cell, bounds: cell.renderBounds}
    : cell);

const findRoom = (
  layout: MuseumHallLayout,
  roomId: unknown,
): MuseumSpatialCell | undefined => {
  const id = semanticId(roomId);
  return id
    ? authoredSpatialCells(layout).find((cell) => cell.kind === 'room' && cell.id === id)
    : undefined;
};

const findContainingRoom = (
  layout: MuseumHallLayout,
  point: {x: number; z: number},
): MuseumSpatialCell | undefined =>
  authoredSpatialCells(layout).find(({kind, bounds}) =>
    kind === 'room'
    && point.x >= bounds.minX
    && point.x <= bounds.maxX
    && point.z >= bounds.minZ
    && point.z <= bounds.maxZ);

const findResumableExhibit = (
  layout: MuseumHallLayout,
  exhibitId: unknown,
): ResumableExhibit | undefined => {
  const id = semanticId(exhibitId);
  if (!id) return undefined;
  return layout.exhibits.find((exhibit) => exhibit.id === id)
    ?? layout.supplementalExhibits?.find((exhibit) => exhibit.id === id);
};

const findPrimaryExhibitId = (
  layout: MuseumHallLayout,
  exhibitId: unknown,
): MuseumExhibitId | undefined => {
  const id = semanticId(exhibitId);
  return id ? layout.exhibits.find((exhibit) => exhibit.id === id)?.id : undefined;
};

/** Clamp finite pose values to the playable hall and reject collider intersections. */
export const sanitizeMuseumPose = (
  value: unknown,
  layout: MuseumHallLayout,
): MuseumPose | undefined => {
  if (!isRecord(value)) return undefined;
  if (!finiteNumber(value.x) || !finiteNumber(value.z)) return undefined;
  if (!finiteNumber(value.yaw) || !finiteNumber(value.pitch)) return undefined;
  const spatialCells = authoredSpatialCells(layout);
  const authoredBounds = spatialCells.length
    ? {
        minX: Math.min(...spatialCells.map(({bounds}) => bounds.minX)),
        maxX: Math.max(...spatialCells.map(({bounds}) => bounds.maxX)),
        minZ: Math.min(...spatialCells.map(({bounds}) => bounds.minZ)),
        maxZ: Math.max(...spatialCells.map(({bounds}) => bounds.maxZ)),
      }
    : layout.bounds;
  const pose: MuseumPose = {
    x: Math.min(
      authoredBounds.maxX - layout.playerRadius,
      Math.max(authoredBounds.minX + layout.playerRadius, value.x),
    ),
    z: Math.min(
      authoredBounds.maxZ - layout.playerRadius,
      Math.max(authoredBounds.minZ + layout.playerRadius, value.z),
    ),
    yaw: normalizeYaw(value.yaw),
    pitch: clampPitch(value.pitch),
  };
  const colliders = [...layout.wallColliders, ...layout.obstacleColliders];
  return isValidMuseumPosition(
    pose,
    layout.playerRadius,
    authoredBounds,
    colliders,
    spatialCells,
  )
    ? pose
    : undefined;
};

const safeEntryPose = (
  layout: MuseumHallLayout,
  roomId: string | undefined,
): MuseumPose | undefined => {
  if (!roomId) return undefined;
  const entryView = layout.entryViews.find((view) => view.spatialCellId === roomId);
  return entryView ? sanitizeMuseumPose(entryView.pose, layout) : undefined;
};

const safeEntrancePose = (
  layout: MuseumHallLayout,
  entranceId: string | undefined,
): MuseumPose | undefined => {
  if (!entranceId) return undefined;
  const hallNode = sessionManifest.nodes.find(({publicHallId}) => publicHallId === layout.id);
  const entrance = hallNode?.doorwaySlots.find(({id}) => id === entranceId);
  return entrance ? sanitizeMuseumPose(entrance.arrivalPose, layout) : undefined;
};

const safeFallbackPose = (layout: MuseumHallLayout): MuseumPose | undefined =>
  sanitizeMuseumPose(layout.spawn, layout)
  ?? layout.entryViews
    .map(({pose}) => sanitizeMuseumPose(pose, layout))
    .find((pose): pose is MuseumPose => Boolean(pose))
  ?? sanitizeMuseumPose(layout.reset, layout);

const normalizeAnchorForLayout = (
  value: MuseumSessionAnchor,
  layout: MuseumHallLayout,
): MuseumSessionAnchor | undefined => {
  if (value.hallId !== layout.id) return undefined;
  const exhibit = findResumableExhibit(layout, value.exhibitId);
  const requestedRoom = findRoom(layout, value.roomId);
  const exhibitRoom = exhibit ? findRoom(layout, exhibit.spatialCellId) : undefined;
  const room = exhibitRoom ?? requestedRoom;
  const entranceId = semanticId(value.entranceId);
  return {
    hallId: layout.id,
    ...(room ? {roomId: room.id} : {}),
    ...(exhibit ? {exhibitId: exhibit.id} : {}),
    ...(entranceId ? {entranceId} : {}),
  };
};

const resolveAnchorPose = (
  layout: MuseumHallLayout,
  anchor: MuseumSessionAnchor,
): MuseumPose | undefined => {
  const exhibit = findResumableExhibit(layout, anchor.exhibitId);
  const exhibitPose = exhibit ? sanitizeMuseumPose(exhibit.viewpoint, layout) : undefined;
  if (exhibitPose) return exhibitPose;

  const roomId = findRoom(layout, anchor.roomId)?.id
    ?? (exhibit ? findRoom(layout, exhibit.spatialCellId)?.id : undefined);
  return safeEntryPose(layout, roomId)
    ?? safeEntrancePose(layout, anchor.entranceId)
    ?? safeFallbackPose(layout);
};

const resolvedSessionState = (
  layout: MuseumHallLayout,
  anchor: MuseumSessionAnchor,
  manifestVersion: string,
  migratedFromVersion?: typeof LEGACY_SESSION_VERSION,
): MuseumSessionState | undefined => {
  const normalizedAnchor = normalizeAnchorForLayout(anchor, layout);
  if (!normalizedAnchor) return undefined;
  const pose = resolveAnchorPose(layout, normalizedAnchor);
  if (!pose) return undefined;
  const lastNearbyExhibit = findPrimaryExhibitId(layout, normalizedAnchor.exhibitId);
  return {
    version: MUSEUM_SESSION_VERSION,
    manifestVersion,
    ...normalizedAnchor,
    ...pose,
    ...(lastNearbyExhibit ? {lastNearbyExhibit} : {}),
    ...(migratedFromVersion ? {migratedFromVersion} : {}),
  };
};

const sanitizeStoredSession = (
  value: Record<string, unknown>,
  layout: MuseumHallLayout,
): MuseumSessionState | undefined => {
  if (
    value.version !== MUSEUM_SESSION_VERSION
    || value.hallId !== layout.id
  ) {
    return undefined;
  }
  const manifestVersion = semanticId(value.manifestVersion);
  if (!manifestVersion) return undefined;
  return resolvedSessionState(
    layout,
    {
      hallId: layout.id,
      roomId: semanticId(value.roomId),
      exhibitId: semanticId(value.exhibitId),
      entranceId: semanticId(value.entranceId),
    },
    manifestVersion,
  );
};

const migrateLegacySession = (
  value: Record<string, unknown>,
  layout: MuseumHallLayout,
): MuseumSessionState | undefined => {
  if (
    value.version !== LEGACY_SESSION_VERSION
    || value.hallId !== layout.id
  ) {
    return undefined;
  }

  const exhibit = findResumableExhibit(layout, value.lastNearbyExhibit);
  const room = !exhibit && finiteNumber(value.x) && finiteNumber(value.z)
    ? findContainingRoom(layout, {x: value.x, z: value.z})
    : undefined;
  return resolvedSessionState(
    layout,
    {
      hallId: layout.id,
      ...(room ? {roomId: room.id} : {}),
      ...(exhibit ? {exhibitId: exhibit.id} : {}),
    },
    MUSEUM_SESSION_MANIFEST_VERSION,
    LEGACY_SESSION_VERSION,
  );
};

/**
 * Resolve either a semantic v2 record or a v1 camera record to a safe authored
 * pose. Legacy coordinates select a containing room only; they are never replayed.
 */
export const sanitizeMuseumSession = (
  value: unknown,
  layout: MuseumHallLayout,
): MuseumSessionState | undefined => {
  if (!isRecord(value)) return undefined;
  if (value.version === MUSEUM_SESSION_VERSION) {
    return sanitizeStoredSession(value, layout);
  }
  if (value.version === LEGACY_SESSION_VERSION) {
    return migrateLegacySession(value, layout);
  }
  return undefined;
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

const storedSessionFromAnchor = (
  layout: MuseumHallLayout,
  anchor: MuseumSessionAnchor,
): MuseumStoredSession | undefined => {
  const normalizedAnchor = normalizeAnchorForLayout(anchor, layout);
  if (!normalizedAnchor || !resolveAnchorPose(layout, normalizedAnchor)) return undefined;
  return {
    version: MUSEUM_SESSION_VERSION,
    manifestVersion: MUSEUM_SESSION_MANIFEST_VERSION,
    ...normalizedAnchor,
  };
};

const sanitizeLastVisitPointer = (value: unknown): MuseumLastVisitPointer | undefined => {
  if (!isRecord(value) || value.version !== MUSEUM_SESSION_VERSION) return undefined;
  const manifestVersion = semanticId(value.manifestVersion);
  const hallId = semanticId(value.hallId);
  if (!manifestVersion || !hallId) return undefined;
  const roomId = semanticId(value.roomId);
  const exhibitId = semanticId(value.exhibitId);
  const entranceId = semanticId(value.entranceId);
  return {
    version: MUSEUM_SESSION_VERSION,
    manifestVersion,
    hallId: hallId as MuseumHallId,
    ...(roomId ? {roomId} : {}),
    ...(exhibitId ? {exhibitId} : {}),
    ...(entranceId ? {entranceId} : {}),
  };
};

export const loadMuseumLastVisit = (
  storage: MuseumSessionStorage | undefined = defaultStorage(),
): MuseumLastVisitPointer | undefined => {
  if (!storage) return undefined;
  try {
    const raw = storage.getItem(MUSEUM_LAST_VISIT_STORAGE_KEY);
    if (!raw || raw.length > MAX_SERIALIZED_LENGTH) return undefined;
    return sanitizeLastVisitPointer(JSON.parse(raw) as unknown);
  } catch {
    return undefined;
  }
};

export const saveMuseumLastVisit = (
  anchor: MuseumSessionAnchor,
  storage: MuseumSessionStorage | undefined = defaultStorage(),
): boolean => {
  if (!storage) return false;
  const pointer = sanitizeLastVisitPointer({
    ...anchor,
    version: MUSEUM_SESSION_VERSION,
    manifestVersion: MUSEUM_SESSION_MANIFEST_VERSION,
  });
  if (!pointer) return false;
  try {
    storage.setItem(MUSEUM_LAST_VISIT_STORAGE_KEY, JSON.stringify(pointer));
    return true;
  } catch {
    return false;
  }
};

export const removeMuseumLastVisit = (
  storage: MuseumSessionStorage | undefined = defaultStorage(),
): boolean => {
  if (!storage) return false;
  try {
    storage.removeItem(MUSEUM_LAST_VISIT_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
};

const persistSemanticSession = (
  layout: MuseumHallLayout,
  anchor: MuseumSessionAnchor,
  storage: MuseumSessionStorage,
): boolean => {
  const session = storedSessionFromAnchor(layout, anchor);
  if (!session) return false;
  try {
    storage.setItem(museumSessionStorageKey(layout.id), JSON.stringify(session));
    storage.setItem(MUSEUM_LAST_VISIT_STORAGE_KEY, JSON.stringify(session));
    return true;
  } catch {
    return false;
  }
};

export const loadMuseumSession = (
  layout: MuseumHallLayout,
  storage: MuseumSessionStorage | undefined = defaultStorage(),
): MuseumSessionState | undefined => {
  if (!storage) return undefined;
  try {
    const current = parseMuseumSession(
      storage.getItem(museumSessionStorageKey(layout.id)),
      layout,
    );
    if (current) {
      if (
        current.migratedFromVersion
        || current.manifestVersion !== MUSEUM_SESSION_MANIFEST_VERSION
      ) {
        persistSemanticSession(layout, current, storage);
      }
      return current;
    }

    const legacy = parseMuseumSession(
      storage.getItem(legacyMuseumSessionStorageKey(layout.id)),
      layout,
    );
    if (!legacy) return undefined;
    // Keep the legacy record available for rollback while writing its v2 replacement.
    persistSemanticSession(layout, legacy, storage);
    return legacy;
  } catch {
    return undefined;
  }
};

export const saveMuseumSessionAnchor = (
  layout: MuseumHallLayout,
  anchor: MuseumSessionAnchor,
  storage: MuseumSessionStorage | undefined = defaultStorage(),
): boolean => storage ? persistSemanticSession(layout, anchor, storage) : false;

export const saveMuseumSession = (
  layout: MuseumHallLayout,
  pose: MuseumPose,
  lastNearbyExhibit?: MuseumExhibitId,
  storage: MuseumSessionStorage | undefined = defaultStorage(),
): boolean => {
  if (!storage) return false;
  const safePose = sanitizeMuseumPose(pose, layout);
  if (!safePose) return false;
  const exhibit = findResumableExhibit(layout, lastNearbyExhibit);
  const room = exhibit
    ? findRoom(layout, exhibit.spatialCellId)
    : findContainingRoom(layout, safePose);
  return persistSemanticSession(
    layout,
    {
      hallId: layout.id,
      ...(room ? {roomId: room.id} : {}),
      ...(exhibit ? {exhibitId: exhibit.id} : {}),
    },
    storage,
  );
};

export const removeMuseumSession = (
  hallId: MuseumHallId,
  storage: MuseumSessionStorage | undefined = defaultStorage(),
): boolean => {
  if (!storage) return false;
  const lastVisit = loadMuseumLastVisit(storage);
  try {
    storage.removeItem(museumSessionStorageKey(hallId));
    storage.removeItem(legacyMuseumSessionStorageKey(hallId));
    if (lastVisit?.hallId === hallId) {
      storage.removeItem(MUSEUM_LAST_VISIT_STORAGE_KEY);
    }
    return true;
  } catch {
    return false;
  }
};

/** Building-level aliases make the intended Grand Entrance consumer explicit. */
export const loadMuseumBuildingLastVisit = loadMuseumLastVisit;
export const saveMuseumBuildingLastVisit = saveMuseumLastVisit;
export const removeMuseumBuildingLastVisit = removeMuseumLastVisit;
