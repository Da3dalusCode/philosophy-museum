import type {MuseumExhibitId, MuseumHallId} from '../data/museumCatalog';

export type ArticleSectionRoute = {section?: string};

export type HistoryRoute = {kind: 'history'};
export type MapRoute = {kind: 'map'};
export type BranchRoute = {kind: 'branch'; branchId: string} & ArticleSectionRoute;
export type PhilosopherRoute = {kind: 'philosopher'; philosopherId: string} & ArticleSectionRoute;
export type BranchComparisonRoute = {
  kind: 'compare-branches';
  leftId: string;
  rightId: string;
};
export type PhilosopherComparisonRoute = {
  kind: 'compare-philosophers';
  leftId: string;
  rightId: string;
};
export type LearningPathRoute = {
  kind: 'learning-path';
  pathId: string;
  /** Public route steps are one-based. */
  step: number;
};
export type MuseumRoute = {
  kind: 'museum';
  hallId: MuseumHallId;
  exhibitId?: MuseumExhibitId;
};
export type NotFoundRoute = {
  kind: 'not-found';
  requestedHash: string;
  reason: string;
};

export type NavigableAppRoute =
  | HistoryRoute
  | MapRoute
  | BranchRoute
  | PhilosopherRoute
  | BranchComparisonRoute
  | PhilosopherComparisonRoute
  | LearningPathRoute
  | MuseumRoute;

export type AppRoute = NavigableAppRoute | NotFoundRoute;

export type ComparisonRoute = BranchComparisonRoute | PhilosopherComparisonRoute;
export type ArticleRoute = BranchRoute | PhilosopherRoute;
export type RouteHref = (route: NavigableAppRoute) => string;
export type RouteNavigationOptions = {replace?: boolean; state?: unknown};
export type RouteNavigator = (route: NavigableAppRoute, options?: RouteNavigationOptions) => void;

/** Defaults intentionally preserve the pre-router app's initial selections. */
export const DEFAULT_BRANCH_ID = 'stoicism';
export const DEFAULT_PHILOSOPHER_ID = 'epictetus';
export const DEFAULT_BRANCH_COMPARISON = {
  leftId: 'stoicism',
  rightId: 'epicureanism',
} as const;
export const DEFAULT_PHILOSOPHER_COMPARISON = {
  leftId: 'plato',
  rightId: 'aristotle',
} as const;
export const DEFAULT_LEARNING_PATH_ID = 'stoic';
export const DEFAULT_LEARNING_PATH_STEP = 1;

export const DEFAULT_ROUTES = {
  history: {kind: 'history'},
  map: {kind: 'map'},
  branch: {kind: 'branch', branchId: DEFAULT_BRANCH_ID, section: undefined},
  philosopher: {kind: 'philosopher', philosopherId: DEFAULT_PHILOSOPHER_ID, section: undefined},
  compare: {
    kind: 'compare-branches',
    ...DEFAULT_BRANCH_COMPARISON,
  },
  comparePhilosophers: {
    kind: 'compare-philosophers',
    ...DEFAULT_PHILOSOPHER_COMPARISON,
  },
  learningPath: {
    kind: 'learning-path',
    pathId: DEFAULT_LEARNING_PATH_ID,
    step: DEFAULT_LEARNING_PATH_STEP,
  },
  museum: {
    kind: 'museum',
    hallId: 'ancient-greek',
  },
} as const satisfies Record<string, NavigableAppRoute>;

export const isNotFoundRoute = (route: AppRoute): route is NotFoundRoute =>
  route.kind === 'not-found';
