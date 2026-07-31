import {MUSEUM_BUILDING_MANIFEST} from '../../data/museum/museumBuildingManifest';
import {
  getMuseumGuidedStops,
  type MuseumGuidedStop,
} from '../../data/museum/museumSupplementalExhibits';
import {
  getMuseumHallCatalog,
  MUSEUM_HALLS,
  type MuseumExhibitId,
  type MuseumPublicHallId as MuseumHallId,
} from '../../data/museumCatalog';

export type MuseumBuildingGuidedStop = MuseumGuidedStop & {
  hallId: MuseumHallId;
};

const publicHallIds = new Set<MuseumHallId>(MUSEUM_HALLS.map(({id}) => id));

/** The guided visit follows the same entrance-to-exit order as the physical route. */
export const MUSEUM_BUILDING_GUIDED_HALL_ORDER: readonly MuseumHallId[] =
  MUSEUM_BUILDING_MANIFEST.throughRoute.hallOrder.map((hallId) => {
    if (!publicHallIds.has(hallId)) {
      throw new Error(`Guided Museum route references unavailable hall ${hallId}.`);
    }
    return hallId;
  });

export const MUSEUM_BUILDING_GUIDED_STOPS: readonly MuseumBuildingGuidedStop[] =
  MUSEUM_BUILDING_GUIDED_HALL_ORDER.flatMap((hallId) => {
    const hall = getMuseumHallCatalog(hallId);
    if (!hall) throw new Error(`Guided Museum route cannot resolve hall ${hallId}.`);
    const stops = getMuseumGuidedStops(
      hallId,
      hall.guidedOrder as readonly MuseumExhibitId[],
    );
    if (stops.length === 0) {
      throw new Error(`Guided Museum route has no interpreted stops in ${hallId}.`);
    }
    return stops.map((stop) => ({...stop, hallId}));
  });

export const getMuseumBuildingGuidedStopIndex = (
  hallId: MuseumHallId,
  exhibitId: string | undefined,
): number => exhibitId
  ? MUSEUM_BUILDING_GUIDED_STOPS.findIndex(
    (stop) => stop.hallId === hallId && stop.exhibitId === exhibitId,
  )
  : -1;

export const getMuseumBuildingGuidedHallStartIndex = (
  hallId: MuseumHallId,
): number => MUSEUM_BUILDING_GUIDED_STOPS.findIndex((stop) => stop.hallId === hallId);

export const MUSEUM_BUILDING_GUIDED_FINAL_HALL_ID =
  MUSEUM_BUILDING_GUIDED_HALL_ORDER.at(-1)!;
