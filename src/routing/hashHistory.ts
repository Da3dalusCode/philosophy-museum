export const HASH_ROUTE_CHANGE_EVENT = 'philosophy-atlas:routechange';

export type HashHistoryTarget = Pick<
  Window,
  'location' | 'history' | 'addEventListener' | 'removeEventListener' | 'dispatchEvent'
>;

const browserTarget = (): HashHistoryTarget | undefined =>
  typeof window === 'undefined' ? undefined : window;

export const subscribeToHashRoute = (
  onStoreChange: () => void,
  target: HashHistoryTarget | undefined = browserTarget(),
): (() => void) => {
  if (!target) return () => undefined;
  target.addEventListener('hashchange', onStoreChange);
  target.addEventListener('popstate', onStoreChange);
  target.addEventListener(HASH_ROUTE_CHANGE_EVENT, onStoreChange);
  return () => {
    target.removeEventListener('hashchange', onStoreChange);
    target.removeEventListener('popstate', onStoreChange);
    target.removeEventListener(HASH_ROUTE_CHANGE_EVENT, onStoreChange);
  };
};

export const writeHashRoute = (
  hash: string,
  replace: boolean,
  target: HashHistoryTarget | undefined = browserTarget(),
): boolean => {
  if (!target || target.location.hash === hash) return false;
  if (replace) target.history.replaceState(target.history.state, '', hash);
  else target.history.pushState(target.history.state, '', hash);
  target.dispatchEvent(new Event(HASH_ROUTE_CHANGE_EVENT));
  return true;
};

export const applyHashCanonicalization = (
  parsed: {canonicalHash: string; shouldReplace: boolean},
  target: HashHistoryTarget | undefined = browserTarget(),
): boolean => parsed.shouldReplace && writeHashRoute(parsed.canonicalHash, true, target);

export const enableManualScrollRestoration = (
  target: HashHistoryTarget | undefined = browserTarget(),
): (() => void) => {
  if (!target || !('scrollRestoration' in target.history)) return () => undefined;
  const previous = target.history.scrollRestoration;
  target.history.scrollRestoration = 'manual';
  return () => {
    target.history.scrollRestoration = previous;
  };
};
