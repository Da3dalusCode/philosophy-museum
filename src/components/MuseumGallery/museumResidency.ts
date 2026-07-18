import {MUSEUM_BUILDING_MANIFEST} from '../../data/museum/museumBuildingManifest';
import {
  estimateMuseumHallTextureResidency,
  MUSEUM_DECODED_TEXTURE_BUDGET_BYTES,
  MUSEUM_PERSISTENT_TEXTURE_ESTIMATE,
  type MuseumHallTextureMode,
} from '../../data/museum/museumTextureBudget';
import type {MuseumHallId} from '../../data/museumCatalog';

export type MuseumHallResidencyRequest = {
  activeHallId: MuseumHallId;
  approachedHallId?: MuseumHallId;
  approachedEntranceId?: string;
  recentHallId?: MuseumHallId;
};

export type MuseumHallResidencyPlan = {
  hallIds: readonly MuseumHallId[];
  decodedTextureBytes: number;
  persistentDecodedTextureBytes: number;
  decodedTextureBudgetBytes: number;
  skippedForTextureBudget: readonly MuseumHallId[];
};

/**
 * Small hub-safe content policy: current hall first, the specifically approached
 * doorway target second, and one recent hall last, capped by the manifest budget.
 */
export const resolveMuseumHallResidencyPlan = ({
  activeHallId,
  approachedHallId,
  approachedEntranceId,
  recentHallId,
}: MuseumHallResidencyRequest): MuseumHallResidencyPlan => {
  const hallIds: MuseumHallId[] = [];
  const skippedForTextureBudget: MuseumHallId[] = [];
  let decodedTextureBytes = MUSEUM_PERSISTENT_TEXTURE_ESTIMATE.totalBytes;
  const add = (
    hallId: MuseumHallId | undefined,
    mode: MuseumHallTextureMode,
    required: boolean,
    entranceId?: string | null,
  ) => {
    if (!hallId || hallIds.includes(hallId)) return;
    if (hallIds.length >= MUSEUM_BUILDING_MANIFEST.residencyPolicy.maxResidentHallContents) return;
    const estimate = estimateMuseumHallTextureResidency(hallId, mode, entranceId);
    if (!required && decodedTextureBytes + estimate.totalBytes > MUSEUM_DECODED_TEXTURE_BUDGET_BYTES) {
      skippedForTextureBudget.push(hallId);
      return;
    }
    hallIds.push(hallId);
    decodedTextureBytes += estimate.totalBytes;
  };

  // The current hall is never evicted. Audits guarantee that one active hall
  // plus every live approached target fits; recently used content is optional.
  add(activeHallId, 'active', true);
  add(approachedHallId, 'entry-resident', true, approachedEntranceId);
  if (MUSEUM_BUILDING_MANIFEST.residencyPolicy.recentHallCount > 0) {
    // A recent but unconnected subtree renders architecture only; no doorway
    // exhibit subset is mounted until that hall is specifically approached.
    add(recentHallId, 'entry-resident', false, null);
  }
  return {
    hallIds,
    decodedTextureBytes,
    persistentDecodedTextureBytes: MUSEUM_PERSISTENT_TEXTURE_ESTIMATE.totalBytes,
    decodedTextureBudgetBytes: MUSEUM_DECODED_TEXTURE_BUDGET_BYTES,
    skippedForTextureBudget,
  };
};

export const resolveMuseumHallResidency = (request: MuseumHallResidencyRequest): readonly MuseumHallId[] =>
  resolveMuseumHallResidencyPlan(request).hallIds;
