import {useEffect, useId, useRef, useState, type MouseEvent} from 'react';
import {BookOpen, Compass, GitCompareArrows, History, Map, Menu, Route, Users, X} from 'lucide-react';
import {subscribeToHashRoute} from '../../routing/hashHistory';
import {DEFAULT_ROUTES, type NavigableAppRoute, type RouteHref} from '../../routing/routes';
import type {ViewId} from '../../types/philosophy';

const items: [ViewId, string, typeof History, NavigableAppRoute][] = [
  ['history', 'Big History', History, DEFAULT_ROUTES.history],
  ['branches', 'Branch Explorer', Compass, DEFAULT_ROUTES.branch],
  ['map', 'Philosophy Map', Map, DEFAULT_ROUTES.map],
  ['philosophers', 'Philosophers', Users, DEFAULT_ROUTES.philosopher],
  ['compare', 'Compare', GitCompareArrows, DEFAULT_ROUTES.compare],
  ['paths', 'Learning Paths', Route, DEFAULT_ROUTES.learningPath],
];

export function Navigation({view, href, onRouteIntent}: {
  view?: ViewId;
  href: RouteHref;
  onRouteIntent?: (view: ViewId) => void;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const preloadTimerRef = useRef<number | undefined>(undefined);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => subscribeToHashRoute(() => {
    const shouldRestoreFocus = Boolean(openRef.current && toggleRef.current?.offsetParent);
    if (shouldRestoreFocus) toggleRef.current?.focus();
    setOpen(false);
  }), []);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);
  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 760px)');
    const reconcileBreakpoint = () => {
      if (!mobileQuery.matches) {
        setOpen(false);
        return;
      }
      if (!openRef.current && menuRef.current?.contains(document.activeElement)) {
        toggleRef.current?.focus();
      }
    };
    const resizeObserver = new ResizeObserver(reconcileBreakpoint);
    resizeObserver.observe(document.documentElement);
    mobileQuery.addEventListener('change', reconcileBreakpoint);
    window.addEventListener('resize', reconcileBreakpoint);
    return () => {
      resizeObserver.disconnect();
      mobileQuery.removeEventListener('change', reconcileBreakpoint);
      window.removeEventListener('resize', reconcileBreakpoint);
    };
  }, []);
  useEffect(() => () => {
    if (preloadTimerRef.current !== undefined) window.clearTimeout(preloadTimerRef.current);
  }, []);

  const cancelScheduledPreload = () => {
    if (preloadTimerRef.current === undefined) return;
    window.clearTimeout(preloadTimerRef.current);
    preloadTimerRef.current = undefined;
  };
  const schedulePreload = (id: ViewId, immediate = false) => {
    cancelScheduledPreload();
    if (!onRouteIntent) return;
    if (immediate) {
      onRouteIntent(id);
      return;
    }
    preloadTimerRef.current = window.setTimeout(() => {
      preloadTimerRef.current = undefined;
      onRouteIntent(id);
    }, 140);
  };

  const closeFromRouteActivation = (
    event: MouseEvent<HTMLAnchorElement>,
    isCurrent: boolean,
  ) => {
    if (
      event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) return;
    setOpen(false);
    if (isCurrent && toggleRef.current?.offsetParent) {
      window.requestAnimationFrame(() => toggleRef.current?.focus());
    }
  };

  return <nav className="primary-nav" aria-label="Primary navigation">
    <div className="nav-mast">
      <a className="brand" aria-label="Philosophy Atlas — Big History" href={href(DEFAULT_ROUTES.history)} onClick={(event) => closeFromRouteActivation(event, view === 'history')}><BookOpen size={20}/><span>Philosophy <b>Atlas</b></span></a>
      <button
        className="mobile-nav-toggle"
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >{open ? <X size={19}/> : <Menu size={19}/>}<span>{open ? 'Close menu' : 'Menu'}</span></button>
    </div>
    <div className="nav-scroll" ref={menuRef} id={menuId} data-expanded={open ? 'true' : 'false'}>
      {items.map(([id, label, Icon, route]) => <a
        key={id}
        className={view === id ? 'active' : ''}
        href={href(route)}
        aria-label={label}
        aria-current={view === id ? 'page' : undefined}
        onClick={(event) => closeFromRouteActivation(event, view === id)}
        onPointerEnter={() => schedulePreload(id)}
        onPointerLeave={cancelScheduledPreload}
        onPointerDown={(event) => event.pointerType === 'touch' && schedulePreload(id, true)}
        onFocus={() => schedulePreload(id)}
        onBlur={cancelScheduledPreload}
      ><Icon size={16}/><span>{label}</span></a>)}
    </div>
  </nav>;
}
