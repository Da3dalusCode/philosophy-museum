import {branches} from '../data/branches';
import {learningPaths} from '../data/learningPaths';
import {philosophers} from '../data/philosophers';
import {
  getMuseumHallCatalog,
  isMuseumExhibitId,
  isMuseumHallId,
} from '../data/museumCatalog';
import {canonicalizeArticleSection} from './routeMetadata';
import {
  DEFAULT_ROUTES,
  type AppRoute,
  type NavigableAppRoute,
  type NotFoundRoute,
} from './routes';

const branchIds = new Set(branches.map(({id}) => id));
const philosopherIds = new Set(philosophers.map(({id}) => id));
const learningPathById = new Map(learningPaths.map((path) => [path.id, path]));
const sectionPattern = /^[A-Za-z0-9][A-Za-z0-9_-]*$/;
const invalidPercentEscapePattern = /%(?![0-9A-Fa-f]{2})/;

export type ParsedHashRoute = {
  route: AppRoute;
  /** The stable representation of a valid route, or the original hash for not-found routes. */
  canonicalHash: string;
  /** True only for recoverable aliases/normalization, never for a not-found route. */
  shouldReplace: boolean;
};

export const isBranchId = (id: string): boolean => branchIds.has(id);
export const isPhilosopherId = (id: string): boolean => philosopherIds.has(id);
export const isLearningPathId = (id: string): boolean => learningPathById.has(id);

export const isValidLearningPathStep = (pathId: string, step: number): boolean => {
  const path = learningPathById.get(pathId);
  return Boolean(path && Number.isSafeInteger(step) && step >= 1 && step <= path.steps.length);
};

export const isValidBranchComparison = (leftId: string, rightId: string): boolean =>
  leftId !== rightId && isBranchId(leftId) && isBranchId(rightId);

export const isValidPhilosopherComparison = (leftId: string, rightId: string): boolean =>
  leftId !== rightId && isPhilosopherId(leftId) && isPhilosopherId(rightId);

export const isValidSection = (section: string): boolean => sectionPattern.test(section);

const requestedHash = (hash: string): string => {
  if (!hash) return '';
  return hash.startsWith('#') ? hash : `#${hash}`;
};

const notFound = (hash: string, reason: string): NotFoundRoute => ({
  kind: 'not-found',
  requestedHash: requestedHash(hash),
  reason,
});

const decodeSegment = (value: string): string | undefined => {
  try {
    return decodeURIComponent(value);
  } catch {
    return undefined;
  }
};

const parseSection = (query: string): {section?: string; malformed: boolean} => {
  if (!query) return {malformed: false};
  try {
    decodeURIComponent(query.replace(/\+/g, ' '));
  } catch {
    return {malformed: true};
  }
  const section = new URLSearchParams(query).get('section');
  return {
    section: section && isValidSection(section) ? section : undefined,
    malformed: false,
  };
};

const appendSection = (hash: string, section?: string): string =>
  section && isValidSection(section)
    ? `${hash}?${new URLSearchParams({section}).toString()}`
    : hash;

/** Serialize a typed route using encoded path segments and a single route query. */
export const serializeHashRoute = (route: AppRoute): string => {
  switch (route.kind) {
    case 'history':
      return '#/history';
    case 'map':
      return '#/map';
    case 'branch':
      return appendSection(`#/branches/${encodeURIComponent(route.branchId)}`, route.section);
    case 'philosopher':
      return appendSection(
        `#/philosophers/${encodeURIComponent(route.philosopherId)}`,
        route.section,
      );
    case 'compare-branches':
      return `#/compare/branches/${encodeURIComponent(route.leftId)}/${encodeURIComponent(route.rightId)}`;
    case 'compare-philosophers':
      return `#/compare/philosophers/${encodeURIComponent(route.leftId)}/${encodeURIComponent(route.rightId)}`;
    case 'learning-path':
      return `#/paths/${encodeURIComponent(route.pathId)}/${route.step}`;
    case 'museum':
      return route.exhibitId
        ? `#/museum/${encodeURIComponent(route.hallId)}/exhibits/${encodeURIComponent(route.exhibitId)}`
        : `#/museum/${encodeURIComponent(route.hallId)}`;
    case 'not-found':
      return requestedHash(route.requestedHash);
  }
};

export const routeToHash = serializeHashRoute;

const finalize = (route: NavigableAppRoute, hash: string): ParsedHashRoute => {
  const canonicalHash = serializeHashRoute(route);
  return {
    route,
    canonicalHash,
    shouldReplace: requestedHash(hash) !== canonicalHash,
  };
};

const fail = (hash: string, reason: string): ParsedHashRoute => ({
  route: notFound(hash, reason),
  canonicalHash: requestedHash(hash),
  shouldReplace: false,
});

/**
 * Parse a browser hash without throwing. Known convenience routes are marked for
 * replacement; malformed and unknown routes remain visible for a not-found view.
 */
export const parseHashRoute = (hash: string): ParsedHashRoute => {
  if (invalidPercentEscapePattern.test(hash)) {
    return fail(hash, 'The route contains malformed percent encoding.');
  }

  const normalizedHash = requestedHash(hash);
  const body = normalizedHash.startsWith('#') ? normalizedHash.slice(1) : normalizedHash;
  const queryIndex = body.indexOf('?');
  const pathPart = queryIndex === -1 ? body : body.slice(0, queryIndex);
  const query = queryIndex === -1 ? '' : body.slice(queryIndex + 1);
  const parsedSection = parseSection(query);
  if (parsedSection.malformed) {
    return fail(hash, 'The route contains malformed percent encoding.');
  }

  if (!pathPart || pathPart === '/') return finalize(DEFAULT_ROUTES.history, hash);
  if (!pathPart.startsWith('/')) return fail(hash, 'Application routes must begin with “#/”.');

  const rawSegments = pathPart.slice(1).split('/');
  while (rawSegments.length > 1 && rawSegments.at(-1) === '') rawSegments.pop();
  const segments = rawSegments.map(decodeSegment);
  if (segments.some((segment) => segment === undefined)) {
    return fail(hash, 'The route contains malformed percent encoding.');
  }
  const [head, second, third, fourth] = segments as string[];

  if (segments.length === 1 && head === 'history') return finalize(DEFAULT_ROUTES.history, hash);
  if (segments.length === 1 && head === 'map') return finalize(DEFAULT_ROUTES.map, hash);

  if (head === 'museum') {
    if (segments.length === 1) return finalize(DEFAULT_ROUTES.museum, hash);
    if (!isMuseumHallId(second)) {
      return fail(hash, `No museum hall exists with the id “${second}”.`);
    }
    if (segments.length === 2) return finalize({kind: 'museum', hallId: second}, hash);
    if (segments.length !== 4 || third !== 'exhibits') {
      return fail(hash, 'This museum route has an unexpected shape.');
    }
    if (!isMuseumExhibitId(second, fourth)) {
      const hall = getMuseumHallCatalog(second);
      return fail(hash, `No exhibit exists with the id “${fourth}” in “${hall?.title ?? second}”.`);
    }
    return finalize({kind: 'museum', hallId: second, exhibitId: fourth}, hash);
  }

  if (head === 'branches') {
    if (segments.length === 1) return finalize(DEFAULT_ROUTES.branch, hash);
    if (segments.length !== 2) return fail(hash, 'This branch route has an unexpected shape.');
    if (!isBranchId(second)) return fail(hash, `No branch exists with the id “${second}”.`);
    return finalize({
      kind: 'branch',
      branchId: second,
      section: canonicalizeArticleSection('branch', second, parsedSection.section),
    }, hash);
  }

  if (head === 'philosophers') {
    if (segments.length === 1) return finalize(DEFAULT_ROUTES.philosopher, hash);
    if (segments.length !== 2) {
      return fail(hash, 'This philosopher route has an unexpected shape.');
    }
    if (!isPhilosopherId(second)) {
      return fail(hash, `No philosopher exists with the id “${second}”.`);
    }
    return finalize(
      {
        kind: 'philosopher',
        philosopherId: second,
        section: canonicalizeArticleSection('philosopher', second, parsedSection.section),
      },
      hash,
    );
  }

  if (head === 'compare') {
    if (segments.length === 1) return finalize(DEFAULT_ROUTES.compare, hash);
    if (segments.length !== 4) return fail(hash, 'This comparison route has an unexpected shape.');
    if (second === 'branches') {
      if (!isValidBranchComparison(third, fourth)) {
        return fail(hash, 'A branch comparison requires two different, existing branch ids.');
      }
      return finalize({kind: 'compare-branches', leftId: third, rightId: fourth}, hash);
    }
    if (second === 'philosophers') {
      if (!isValidPhilosopherComparison(third, fourth)) {
        return fail(hash, 'A philosopher comparison requires two different, existing philosopher ids.');
      }
      return finalize({kind: 'compare-philosophers', leftId: third, rightId: fourth}, hash);
    }
    return fail(hash, 'Comparison routes must compare branches or philosophers.');
  }

  if (head === 'paths') {
    if (segments.length === 1) return finalize(DEFAULT_ROUTES.learningPath, hash);
    if (segments.length !== 3) return fail(hash, 'A learning-path route requires a path id and step.');
    if (!isLearningPathId(second)) return fail(hash, `No learning path exists with the id “${second}”.`);
    if (!/^\d+$/.test(third)) return fail(hash, 'Learning-path steps must be one-based whole numbers.');
    const step = Number(third);
    if (!isValidLearningPathStep(second, step)) {
      return fail(hash, `Step ${third} does not exist in the “${second}” learning path.`);
    }
    return finalize({kind: 'learning-path', pathId: second, step}, hash);
  }

  return fail(hash, 'The requested route is not recognized.');
};

export const parseHash = (hash: string): AppRoute => parseHashRoute(hash).route;
