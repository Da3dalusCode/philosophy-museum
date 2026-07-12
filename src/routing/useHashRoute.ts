import {useCallback, useEffect, useSyncExternalStore} from 'react';
import {parseHashRoute, serializeHashRoute} from './hashRouter';
import type {AppRoute, NavigableAppRoute} from './routes';

const routeChangeEvent = 'philosophy-atlas:routechange';
const serverHash = '#/history';

const currentHash = (): string =>
  typeof window === 'undefined' ? serverHash : window.location.hash;

const subscribe = (onStoreChange: () => void): (() => void) => {
  window.addEventListener('hashchange', onStoreChange);
  window.addEventListener('popstate', onStoreChange);
  window.addEventListener(routeChangeEvent, onStoreChange);
  return () => {
    window.removeEventListener('hashchange', onStoreChange);
    window.removeEventListener('popstate', onStoreChange);
    window.removeEventListener(routeChangeEvent, onStoreChange);
  };
};

const writeHash = (hash: string, replace: boolean): void => {
  if (typeof window === 'undefined' || window.location.hash === hash) return;
  const method = replace ? 'replaceState' : 'pushState';
  window.history[method](window.history.state, '', hash);
  window.dispatchEvent(new Event(routeChangeEvent));
};

export type HashNavigationOptions = {replace?: boolean};

export type HashRouteController = {
  route: AppRoute;
  href: (route: NavigableAppRoute) => string;
  navigate: (route: NavigableAppRoute, options?: HashNavigationOptions) => void;
  push: (route: NavigableAppRoute) => void;
  replace: (route: NavigableAppRoute) => void;
};

/** React bridge over the pure parser. Browser location remains the route source of truth. */
export const useHashRoute = (): HashRouteController => {
  const hash = useSyncExternalStore(subscribe, currentHash, () => serverHash);
  const parsed = parseHashRoute(hash);

  useEffect(() => {
    if (parsed.shouldReplace) writeHash(parsed.canonicalHash, true);
  }, [parsed.canonicalHash, parsed.shouldReplace]);

  const href = useCallback((route: NavigableAppRoute) => serializeHashRoute(route), []);
  const navigate = useCallback(
    (route: NavigableAppRoute, options: HashNavigationOptions = {}) => {
      writeHash(serializeHashRoute(route), options.replace === true);
    },
    [],
  );
  const push = useCallback((route: NavigableAppRoute) => navigate(route), [navigate]);
  const replace = useCallback(
    (route: NavigableAppRoute) => navigate(route, {replace: true}),
    [navigate],
  );

  return {route: parsed.route, href, navigate, push, replace};
};
