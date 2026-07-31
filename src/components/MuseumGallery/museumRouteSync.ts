import type {MuseumPublicHallId as MuseumHallId} from '../../data/museumCatalog';
import type {MuseumRoute} from '../../routing/routes';

export type PendingMuseumHallRouteSync = {
  sourceHallId: MuseumHallId;
  targetHallId: MuseumHallId;
};

export type MuseumCommittedPoseOwner = 'transition' | 'travel';

/**
 * A committed physical crossing or map journey already owns the exact target
 * pose. Clearing the one-shot `entrance` URL marker must not reload a semantic
 * room anchor on top of that pose.
 */
export const getCommittedMuseumPoseOwner = ({
  previousEntry,
  nextEntry,
  routeHallId,
  activeHallId,
  pendingTransition,
  pendingTravel,
}: {
  previousEntry: MuseumRoute['entry'];
  nextEntry: MuseumRoute['entry'];
  routeHallId: MuseumHallId;
  activeHallId: MuseumHallId;
  pendingTransition: PendingMuseumHallRouteSync | undefined;
  pendingTravel: PendingMuseumHallRouteSync | undefined;
}): MuseumCommittedPoseOwner | undefined => {
  if (
    previousEntry !== 'entrance'
    || nextEntry !== undefined
    || activeHallId !== routeHallId
  ) return undefined;
  if (pendingTransition?.targetHallId === routeHallId) return 'transition';
  if (pendingTravel?.targetHallId === routeHallId) return 'travel';
  return undefined;
};

export const shouldPreserveCommittedMuseumPose = (
  options: Parameters<typeof getCommittedMuseumPoseOwner>[0],
): boolean => getCommittedMuseumPoseOwner(options) !== undefined;
