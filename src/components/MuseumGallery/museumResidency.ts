import {MUSEUM_BUILDING_MANIFEST} from '../../data/museum/museumBuildingManifest';
import {
  estimateMuseumHallTextureResidency,
  MUSEUM_DECODED_TEXTURE_BUDGET_BYTES,
  type MuseumHallTextureMode,
} from '../../data/museum/museumTextureBudget';
import type {MuseumHallId} from '../../data/museumCatalog';

export type MuseumHallResidencyRequest = {
  activeHallId: MuseumHallId;
  approachedHallId?: MuseumHallId;
  recentHallId?: MuseumHallId;
};

export type MuseumHallResidencyPlan = {
  hallIds: readonly MuseumHallId[];
  decodedTextureBytes: number;
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
  recentHallId,
}: MuseumHallResidencyRequest): MuseumHallResidencyPlan => {
  const hallIds: MuseumHallId[] = [];
  const skippedForTextureBudget: MuseumHallId[] = [];
  let decodedTextureBytes = 0;
  const add = (hallId: MuseumHallId | undefined, mode: MuseumHallTextureMode, required: boolean) => {
    if (!hallId || hallIds.includes(hallId)) return;
    if (hallIds.length >= MUSEUM_BUILDING_MANIFEST.residencyPolicy.maxResidentHallContents) return;
    const estimate = estimateMuseumHallTextureResidency(hallId, mode);
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
  add(approachedHallId, 'entry-resident', true);
  if (MUSEUM_BUILDING_MANIFEST.residencyPolicy.recentHallCount > 0) {
    add(recentHallId, 'entry-resident', false);
  }
  return {
    hallIds,
    decodedTextureBytes,
    decodedTextureBudgetBytes: MUSEUM_DECODED_TEXTURE_BUDGET_BYTES,
    skippedForTextureBudget,
  };
};

export const resolveMuseumHallResidency = (request: MuseumHallResidencyRequest): readonly MuseumHallId[] =>
  resolveMuseumHallResidencyPlan(request).hallIds;
