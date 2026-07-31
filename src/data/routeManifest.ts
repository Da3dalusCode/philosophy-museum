import routeManifestJson from './generated/routeManifest.json';
import type {
  MuseumExhibitId,
  MuseumPublicHallId,
} from './museumCatalog';
import type {
  MuseumLegacyExhibitCompatibility,
  MuseumLegacyHallId,
} from './museum/museumCanonicalProgram';
import type {MuseumSupplementalExhibitId} from './museum/museumWorldTypes';

type ArticleRouteRecord = {
  id: string;
  name: string;
  sections: readonly {id: string; title: string}[];
  hasSources: boolean;
};

type LearningPathRouteRecord = {
  id: string;
  title: string;
  stepCount: number;
};

type MuseumRouteExhibitRecord = {
  id: string;
  displayName: string;
};

type MuseumRouteHallRecord = {
  id: MuseumPublicHallId;
  title: string;
  primaryExhibits: readonly MuseumRouteExhibitRecord[];
  supplementalExhibits: readonly MuseumRouteExhibitRecord[];
};

type RouteManifest = {
  schemaVersion: 1;
  branches: readonly ArticleRouteRecord[];
  philosophers: readonly ArticleRouteRecord[];
  learningPaths: readonly LearningPathRouteRecord[];
  museumHalls: readonly MuseumRouteHallRecord[];
  museumHallAliases: Readonly<Record<MuseumLegacyHallId, MuseumPublicHallId>>;
  legacyExhibits: readonly MuseumLegacyExhibitCompatibility[];
};

export const ROUTE_MANIFEST = routeManifestJson as RouteManifest;

const branchById = new Map(ROUTE_MANIFEST.branches.map((record) => [record.id, record]));
const philosopherById = new Map(ROUTE_MANIFEST.philosophers.map((record) => [record.id, record]));
const learningPathById = new Map(ROUTE_MANIFEST.learningPaths.map((record) => [record.id, record]));
const museumHallById = new Map(ROUTE_MANIFEST.museumHalls.map((record) => [record.id, record]));

export const getRouteArticleRecord = (
  kind: 'branch' | 'philosopher',
  id: string,
): ArticleRouteRecord | undefined =>
  (kind === 'branch' ? branchById : philosopherById).get(id);

export const getRouteLearningPath = (id: string): LearningPathRouteRecord | undefined =>
  learningPathById.get(id);

export const getRouteMuseumHall = (id: string | undefined): MuseumRouteHallRecord | undefined =>
  id ? museumHallById.get(id as MuseumPublicHallId) : undefined;

export const getRouteMuseumExhibit = (
  hallId: string,
  exhibitId: string | undefined,
): MuseumRouteExhibitRecord | undefined => {
  if (!exhibitId) return undefined;
  const hall = getRouteMuseumHall(hallId);
  return hall?.primaryExhibits.find(({id}) => id === exhibitId)
    ?? hall?.supplementalExhibits.find(({id}) => id === exhibitId);
};

export const isRouteBranchId = (id: string): boolean => branchById.has(id);
export const isRoutePhilosopherId = (id: string): boolean => philosopherById.has(id);
export const isRouteLearningPathId = (id: string): boolean => learningPathById.has(id);
export const isRouteMuseumHallId = (id: string | undefined): id is MuseumPublicHallId =>
  Boolean(id && museumHallById.has(id as MuseumPublicHallId));
export const isRouteMuseumPrimaryExhibitId = (
  hallId: string,
  exhibitId: string | undefined,
): exhibitId is MuseumExhibitId =>
  Boolean(exhibitId && getRouteMuseumHall(hallId)?.primaryExhibits.some(({id}) => id === exhibitId));
export const isRouteMuseumSupplementalExhibitId = (
  hallId: string,
  exhibitId: string | undefined,
): exhibitId is MuseumSupplementalExhibitId =>
  Boolean(exhibitId && getRouteMuseumHall(hallId)?.supplementalExhibits.some(({id}) => id === exhibitId));

export const MUSEUM_ROUTE_HALL_ALIASES = ROUTE_MANIFEST.museumHallAliases;

export const getRouteLegacyExhibitCompatibility = (
  formerHallId: string,
  exhibitId: string,
): MuseumLegacyExhibitCompatibility | undefined =>
  ROUTE_MANIFEST.legacyExhibits.find(
    (record) => record.formerHallId === formerHallId && record.exhibitId === exhibitId,
  );
