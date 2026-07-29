import type {MuseumPublicHallId as MuseumHallId} from '../../data/museumCatalog';
import type {MuseumRoute} from '../../routing/routes';

export type PendingMuseumHallRouteSync = {
  sourceHallId: MuseumHallId;
  targetHallId: MuseumHallId;
};

/**
 * A committed physical crossing or map journey already owns the exact target
 * pose. Clearing the one-shot `entrance` URL marker must not reload a semantic
 * room anchor on top of that pose.
 */
export const shouldPreserveCommittedMuseumPose = ({
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
}): boolean => previousEntry === 'entrance'
  && nextEntry === undefined
  && activeHallId === routeHallId
  && [pendingTransition, pendingTravel].some((pending) => pending?.targetHallId === routeHallId);
