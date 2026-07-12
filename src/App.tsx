import {useEffect, useRef} from 'react';
import {AppShell} from './components/Layout/AppShell';
import {BranchExplorer} from './components/BranchExplorer/BranchExplorer';
import {BigHistoryView} from './components/BigHistory/BigHistoryView';
import {PhilosophyMap} from './components/PhilosophyMap/PhilosophyMap';
import {PhilosopherProfile} from './components/PhilosopherProfile/PhilosopherProfile';
import {CompareMode} from './components/Compare/CompareMode';
import {LearningPaths} from './components/LearningPaths/LearningPaths';
import {IdeaConstellation} from './components/Museum/IdeaConstellation';
import {RouteNotFound} from './routing/RouteNotFound';
import {serializeHashRoute} from './routing/hashRouter';
import {getArticleSectionTarget, getRouteTitle} from './routing/routeMetadata';
import type {AppRoute} from './routing/routes';
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
    case 'not-found': return undefined;
  }
};

export default function App() {
  const {route, href, push} = useHashRoute();
  const routeKey = serializeHashRoute(route);
  const title = getRouteTitle(route);
  const previousRouteKeyRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if ((route.kind === 'branch' || route.kind === 'philosopher') && getArticleSectionTarget(route)) return;
    window.scrollTo({top: 0, behavior: 'auto'});
  }, [routeKey, route.kind, route.kind === 'branch' || route.kind === 'philosopher' ? route.section : undefined]);

  useEffect(() => {
    const previousRouteKey = previousRouteKeyRef.current;
    previousRouteKeyRef.current = routeKey;
    if (previousRouteKey === undefined || previousRouteKey === routeKey) return;
    const frame = window.requestAnimationFrame(() => {
      const articleTarget = route.kind === 'branch' || route.kind === 'philosopher'
        ? getArticleSectionTarget(route)
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
  }, [routeKey, route]);

  let content: React.ReactNode;
  switch (route.kind) {
    case 'history':
      content = <BigHistoryView href={href}/>;
      break;
    case 'map':
      content = <PhilosophyMap href={href}/>;
      break;
    case 'branch':
      content = <BranchExplorer route={route} href={href}/>;
      break;
    case 'philosopher':
      content = <PhilosopherProfile route={route} href={href}/>;
      break;
    case 'compare-branches':
    case 'compare-philosophers':
      content = <CompareMode route={route} href={href} onRouteChange={push}/>;
      break;
    case 'learning-path':
      content = <LearningPaths route={route} href={href}/>;
      break;
    case 'not-found':
      content = <RouteNotFound route={route}/>;
      break;
  }

  return <AppShell view={activeViewForRoute(route)} href={href}>
    <IdeaConstellation/>
    {content}
  </AppShell>;
}
