import {Suspense, useCallback, useEffect, useLayoutEffect, useRef} from 'react';
import {AppShell} from './components/Layout/AppShell';
import {BigHistoryView} from './components/BigHistory/BigHistoryView';
import {IdeaConstellation} from './components/Museum/IdeaConstellation';
import {MuseumCompatibilityPage} from './components/MuseumGallery/MuseumCompatibilityPage';
import {RouteNotFound} from './routing/RouteNotFound';
import {RouteLoadBoundary, RouteLoading} from './routing/RouteLoadBoundary';
import {serializeHashRoute} from './routing/hashRouter';
import {getArticleSectionTarget, getRouteTitle} from './routing/routeMetadata';
import {
  LazyBranchExplorer,
  LazyCompareMode,
  LazyLearningPaths,
  LazyMuseumPage,
  LazyPhilosopherProfile,
  LazyPhilosophyMap,
  preloadRouteView,
} from './routing/routeModules';
import type {AppRoute, RouteHref, RouteNavigator} from './routing/routes';
import {focusArticleTarget} from './routing/useArticleSection';
import {useHashRoute} from './routing/useHashRoute';
import type {ViewId} from './types/philosophy';

const activeViewForRoute = (route: AppRoute): ViewId | undefined => {
  switch (route.kind) {
    case 'history': return 'history';
    case 'map': return 'map';
    case 'branch': return 'branches';
    case 'philosopher': return 'philosophers';
    case 'compare-branches':
    case 'compare-philosophers': return 'compare';
    case 'learning-path': return 'paths';
    case 'museum': return 'museum';
    case 'museum-compatibility': return 'museum';
    case 'not-found': return undefined;
  }
};

function RouteView({route, routeKey, href, push, replace, onReady}: {
  route: AppRoute;
  routeKey: string;
  href: RouteHref;
  push: RouteNavigator;
  replace: RouteNavigator;
  onReady: (route: AppRoute, routeKey: string) => void | (() => void);
}) {
  useEffect(() => onReady(route, routeKey), [onReady, route, routeKey]);

  switch (route.kind) {
    case 'history':
      return <BigHistoryView href={href}/>;
    case 'map':
      return <LazyPhilosophyMap href={href}/>;
    case 'branch':
      return <LazyBranchExplorer route={route} href={href}/>;
    case 'philosopher':
      return <LazyPhilosopherProfile route={route} href={href}/>;
    case 'compare-branches':
    case 'compare-philosophers':
      return <LazyCompareMode route={route} href={href} onRouteChange={push}/>;
    case 'learning-path':
      return <LazyLearningPaths route={route} href={href}/>;
    case 'museum':
      return <LazyMuseumPage route={route} href={href} push={push} replace={replace}/>;
    case 'museum-compatibility':
      return <MuseumCompatibilityPage route={route} href={href}/>;
    case 'not-found':
      return <RouteNotFound route={route}/>;
  }
}

export default function App() {
  const {route, href, push, replace} = useHashRoute();
  const routeKey = serializeHashRoute(route);
  const title = getRouteTitle(route);
  const requestedRouteKeyRef = useRef(routeKey);
  const pendingFocusRouteKeyRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if ((route.kind === 'branch' || route.kind === 'philosopher') && getArticleSectionTarget(route)) return;
    window.scrollTo({top: 0, behavior: 'auto'});
  }, [routeKey, route.kind, route.kind === 'branch' || route.kind === 'philosopher' ? route.section : undefined]);

  useLayoutEffect(() => {
    if (requestedRouteKeyRef.current === routeKey) return;
    requestedRouteKeyRef.current = routeKey;
    pendingFocusRouteKeyRef.current = routeKey;
  }, [routeKey]);

  const handleRouteReady = useCallback((readyRoute: AppRoute, readyRouteKey: string) => {
    if (pendingFocusRouteKeyRef.current !== readyRouteKey) return;
    pendingFocusRouteKeyRef.current = undefined;
    // Museum owns focus for its hall, fallback, and route-synchronized interpretation panel.
    if (readyRoute.kind === 'museum') return;
    const frame = window.requestAnimationFrame(() => {
      const articleTarget = readyRoute.kind === 'branch' || readyRoute.kind === 'philosopher'
        ? getArticleSectionTarget(readyRoute)
        : undefined;
      if (articleTarget) {
        focusArticleTarget(articleTarget);
        return;
      }
      const heading = document.querySelector<HTMLElement>('main h1');
      if (!heading) return;
      heading.tabIndex = -1;
      heading.focus({preventScroll: true});
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return <AppShell view={activeViewForRoute(route)} href={href} onRouteIntent={preloadRouteView}>
    {route.kind !== 'museum' && route.kind !== 'museum-compatibility' && <IdeaConstellation/>}
    <RouteLoadBoundary resetKey={routeKey}>
      <Suspense fallback={<RouteLoading/>}>
        <RouteView route={route} routeKey={routeKey} href={href} push={push} replace={replace} onReady={handleRouteReady}/>
      </Suspense>
    </RouteLoadBoundary>
  </AppShell>;
}
