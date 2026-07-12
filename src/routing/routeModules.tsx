import {lazy} from 'react';
import type {ViewId} from '../types/philosophy';
import {isRouteLoadError} from './routeLoadErrors';

const once = <T,>(loader: () => Promise<T>): (() => Promise<T>) => {
  let promise: Promise<T> | undefined;
  return () => {
    if (!promise) {
      promise = loader().catch((error: unknown) => {
        promise = undefined;
        throw error;
      });
    }
    return promise;
  };
};

const loadMap = once(() => import('../components/PhilosophyMap/PhilosophyMap'));
const loadBranches = once(() => import('../components/BranchExplorer/BranchExplorer'));
const loadPhilosophers = once(() => import('../components/PhilosopherProfile/PhilosopherProfile'));
const loadCompare = once(() => import('../components/Compare/CompareMode'));
const loadPaths = once(() => import('../components/LearningPaths/LearningPaths'));
const loadMuseum = once(() => import('../components/MuseumGallery/MuseumPage'));
let museumIntentPreloadError: Error | undefined;
const loadMuseumForNavigation = () => museumIntentPreloadError
  ? Promise.reject(museumIntentPreloadError)
  : loadMuseum();

export const LazyPhilosophyMap = lazy(() =>
  loadMap().then(({PhilosophyMap}) => ({default: PhilosophyMap})),
);
export const LazyBranchExplorer = lazy(() =>
  loadBranches().then(({BranchExplorer}) => ({default: BranchExplorer})),
);
export const LazyPhilosopherProfile = lazy(() =>
  loadPhilosophers().then(({PhilosopherProfile}) => ({default: PhilosopherProfile})),
);
export const LazyCompareMode = lazy(() =>
  loadCompare().then(({CompareMode}) => ({default: CompareMode})),
);
export const LazyLearningPaths = lazy(() =>
  loadPaths().then(({LearningPaths}) => ({default: LearningPaths})),
);
export const LazyMuseumPage = lazy(() =>
  loadMuseumForNavigation().then(({MuseumPage}) => ({default: MuseumPage})),
);

const loaders: Partial<Record<ViewId, () => Promise<unknown>>> = {
  map: loadMap,
  branches: loadBranches,
  philosophers: loadPhilosophers,
  compare: loadCompare,
  paths: loadPaths,
  museum: loadMuseumForNavigation,
};

export const preloadRouteView = (view: ViewId): void => {
  const loader = loaders[view];
  if (!loader) return;
  void loader().catch((error: unknown) => {
    // Vite remembers a failed CSS preload for the life of the page. Preserve the
    // failure so navigation reaches the reload recovery boundary instead of
    // rendering the Museum without its route stylesheet.
    if (view === 'museum' && isRouteLoadError(error)) {
      museumIntentPreloadError = error instanceof Error ? error : new Error(String(error));
    }
    console.warn(`Unable to preload the ${view} route module.`, error);
  });
};
