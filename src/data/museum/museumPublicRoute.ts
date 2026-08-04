import manifestJson from './museumContinuousEnfiladeManifest.json';
import type {MuseumPlannedHallId} from './museumCanonicalProgram';

type MuseumPublicRouteManifest = {
  throughRoute: {hallOrder: readonly MuseumPlannedHallId[]};
  nodes: readonly {
    kind: string;
    programHallId?: MuseumPlannedHallId;
    publicHallId?: string;
  }[];
};

const manifest = manifestJson as unknown as MuseumPublicRouteManifest;

/** The generated through-route is the single public 01–26 numbering authority. */
export const MUSEUM_PUBLIC_ROUTE_HALL_IDS = [...manifest.throughRoute.hallOrder];

const routeIds = new Set(MUSEUM_PUBLIC_ROUTE_HALL_IDS);
const registeredHallIds = new Set(manifest.nodes
  .filter(({kind, publicHallId}) => kind === 'hall' && publicHallId !== undefined)
  .map(({programHallId}) => programHallId)
  .filter((id): id is MuseumPlannedHallId => id !== undefined));

if (
  MUSEUM_PUBLIC_ROUTE_HALL_IDS.length !== 26
  || routeIds.size !== 26
  || registeredHallIds.size !== 26
  || MUSEUM_PUBLIC_ROUTE_HALL_IDS.some((hallId) => !registeredHallIds.has(hallId))
) {
  throw new Error('The Museum public route must contain 26 unique, registered canonical hall IDs.');
}

export const MUSEUM_PUBLIC_GALLERY_NUMBERS = Object.freeze(Object.fromEntries(
  MUSEUM_PUBLIC_ROUTE_HALL_IDS.map((hallId, index) => [hallId, index + 1]),
)) as Readonly<Record<MuseumPlannedHallId, number>>;

export const getMuseumPublicGalleryNumber = (hallId: MuseumPlannedHallId): number =>
  MUSEUM_PUBLIC_GALLERY_NUMBERS[hallId];

export const formatMuseumPublicGalleryNumber = (hallId: MuseumPlannedHallId): string =>
  `Gallery ${String(getMuseumPublicGalleryNumber(hallId)).padStart(2, '0')}`;
