import {useCallback, useEffect, useSyncExternalStore} from 'react';
import {
  applyHashCanonicalization,
  enableManualScrollRestoration,
  subscribeToHashRoute,
  writeHashRoute,
} from './hashHistory';
import {parseHashRoute, serializeHashRoute} from './hashRouter';
import type {AppRoute, NavigableAppRoute, RouteNavigationOptions, RouteNavigator} from './routes';

const serverHash = '#/history';

const currentHash = (): string =>
  typeof window === 'undefined' ? serverHash : window.location.hash;

export type HashNavigationOptions = RouteNavigationOptions;

export type HashRouteController = {
  route: AppRoute;
  href: (route: NavigableAppRoute) => string;
  navigate: (route: NavigableAppRoute, options?: HashNavigationOptions) => void;
  push: RouteNavigator;
  replace: RouteNavigator;
};

/** React bridge over the pure parser. Browser location remains the route source of truth. */
export const useHashRoute = (): HashRouteController => {
  const hash = useSyncExternalStore(subscribeToHashRoute, currentHash, () => serverHash);
  const parsed = parseHashRoute(hash);

  useEffect(() => {
    applyHashCanonicalization(parsed);
  }, [parsed.canonicalHash, parsed.shouldReplace]);

  useEffect(() => enableManualScrollRestoration(), []);

  const href = useCallback((route: NavigableAppRoute) => serializeHashRoute(route), []);
  const navigate = useCallback(
    (route: NavigableAppRoute, options: HashNavigationOptions = {}) => {
      writeHashRoute(serializeHashRoute(route), options.replace === true, undefined, options.state);
    },
    [],
  );
  const push = useCallback(
    (route: NavigableAppRoute, options: HashNavigationOptions = {}) =>
      navigate(route, {...options, replace: false}),
    [navigate],
  );
  const replace = useCallback(
    (route: NavigableAppRoute, options: HashNavigationOptions = {}) =>
      navigate(route, {...options, replace: true}),
    [navigate],
  );

  return {route: parsed.route, href, navigate, push, replace};
};
