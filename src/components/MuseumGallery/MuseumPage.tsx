import {
  DoorOpen,
  Info,
  Landmark,
  MapPinned,
  Maximize2,
  Minimize2,
  RotateCcw,
  Scan,
  X,
} from 'lucide-react';
import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ErrorInfo,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import {ANCIENT_GREEK_HALL_LAYOUT, type MuseumPose} from '../../data/museum/ancientGreekHall';
import {
  getMuseumExhibitCatalog,
  getMuseumHallCatalog,
  type MuseumExhibitCatalog,
  type MuseumExhibitId,
} from '../../data/museumCatalog';
import type {MuseumRoute, NavigableAppRoute, RouteHref, RouteNavigator} from '../../routing/routes';
import {getMuseumExhibitContent} from './exhibitContent';
import {MuseumInterpretationPanel} from './MuseumInterpretationPanel';
import {MuseumTouchControls} from './MuseumTouchControls';
import {loadMuseumSession, removeMuseumSession, saveMuseumSession} from './museumSession';
import {useMuseumControls, type MuseumControls} from './useMuseumControls';
import {useMuseumExperienceMode} from './useMuseumExperienceMode';
import './museum.css';

const createLazyAncientGreekHallScene = () => lazy(() => import('./AncientGreekHallScene').then(
  ({AncientGreekHallScene}) => ({default: AncientGreekHallScene}),
));

type Overlay = 'directory' | 'help' | null;
type MuseumHistoryState = {
  philosophyAtlasMuseum?: {hallId: string; openedFromHall: boolean};
  [key: string]: unknown;
};

const articleRoute = (exhibit: MuseumExhibitCatalog): NavigableAppRoute =>
  exhibit.entityKind === 'philosopher'
    ? {kind: 'philosopher', philosopherId: exhibit.entityId}
    : {kind: 'branch', branchId: exhibit.entityId};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const historyStateWithMuseumMarker = (hallId: string, openedFromHall = true): MuseumHistoryState => ({
  ...(isPlainObject(window.history.state) ? window.history.state : {}),
  philosophyAtlasMuseum: {hallId, openedFromHall},
});

const getMuseumHistoryMarker = (): MuseumHistoryState['philosophyAtlasMuseum'] => {
  if (!isPlainObject(window.history.state)) return undefined;
  const marker = window.history.state.philosophyAtlasMuseum;
  return isPlainObject(marker)
    && typeof marker.hallId === 'string'
    && typeof marker.openedFromHall === 'boolean'
    ? {hallId: marker.hallId, openedFromHall: marker.openedFromHall}
    : undefined;
};

const isOrdinaryActivation = (event: MouseEvent<HTMLAnchorElement>): boolean =>
  event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

const hasWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
};

const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
};

class MuseumSceneBoundary extends Component<{
  children: ReactNode;
  onError: (error: unknown) => void;
  resetKey: number;
}, {error: unknown; resetKey: number}> {
  state = {error: null, resetKey: this.props.resetKey};
  static getDerivedStateFromError(error: unknown) { return {error}; }
  static getDerivedStateFromProps(props: {resetKey: number}, state: {resetKey: number}) {
    return props.resetKey === state.resetKey ? null : {error: null, resetKey: props.resetKey};
  }
  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error('The walkable Museum scene could not be rendered.', error, info.componentStack);
    this.props.onError(error);
  }
  render() { return this.state.error ? null : this.props.children; }
}

const focusableSelector = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])';
const visibleFocusable = (root: HTMLElement): HTMLElement[] => [...root.querySelectorAll<HTMLElement>(focusableSelector)]
  .filter((item) => !item.closest('[inert],[aria-hidden="true"],[hidden]') && Boolean(item.offsetWidth || item.offsetHeight || item.getClientRects().length));

function MuseumModal({labelledBy, describedBy, onClose, children}: {
  labelledBy: string;
  describedBy?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
    dialogRef.current?.focus();
    return () => {
      window.requestAnimationFrame(() => {
        if (previous?.isConnected && !previous.closest('[inert],[aria-hidden="true"]')) previous.focus({preventScroll: true});
      });
    };
  }, []);
  const trapFocus = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== 'Tab' || !dialogRef.current) return;
    const focusable = visibleFocusable(dialogRef.current);
    if (!focusable.length) {
      event.preventDefault();
      dialogRef.current.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable.at(-1)!;
    if (!focusable.includes(document.activeElement as HTMLElement)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  return <div className="museum-overlay-backdrop" role="presentation" onMouseDown={(event) => {
    if (event.target === event.currentTarget) onClose();
  }}>
    <section className="museum-overlay-panel" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={labelledBy} aria-describedby={describedBy} tabIndex={-1} onKeyDown={trapFocus}>{children}</section>
  </div>;
}

function ExhibitRouteLink({route, exhibit, href, push, className = 'btn btn-primary', onActivate, current, children}: {
  route: MuseumRoute;
  exhibit: MuseumExhibitCatalog;
  href: RouteHref;
  push: RouteNavigator;
  className?: string;
  onActivate?: (exhibit: MuseumExhibitCatalog) => void;
  current?: boolean;
  children: ReactNode;
}) {
  const target = {kind: 'museum' as const, hallId: route.hallId, exhibitId: exhibit.id};
  return <a className={className} href={href(target)} aria-current={current ? 'page' : undefined} onClick={(event) => {
    if (!isOrdinaryActivation(event)) return;
    event.preventDefault();
    onActivate?.(exhibit);
    push(target, {state: historyStateWithMuseumMarker(route.hallId)});
  }}>{children}</a>;
}

function DirectoryContents({route, href, push, onExhibitActivate, showSummaries = false}: {
  route: MuseumRoute;
  href: RouteHref;
  push: RouteNavigator;
  onExhibitActivate?: (exhibit: MuseumExhibitCatalog) => void;
  showSummaries?: boolean;
}) {
  const hall = getMuseumHallCatalog(route.hallId)!;
  const headingPrefix = useId();
  return <div className="museum-directory-zones">
    {hall.zones.map((zone) => <section key={zone.id} aria-labelledby={`${headingPrefix}-${zone.id}`}>
      <p className="museum-zone-period">{zone.period}</p><h3 id={`${headingPrefix}-${zone.id}`}>{zone.title}</h3><p>{zone.description}</p>
      <ul>{hall.exhibits.filter((item) => item.zoneId === zone.id).map((item) => {
        const current = route.exhibitId === item.id;
        const summary = showSummaries ? getMuseumExhibitContent(item).introduction : item.question;
        return <li key={item.id} className={current ? 'is-current' : ''} data-entity-kind={item.entityKind}>
          <div><b>{item.displayName}</b><span>{item.entityKind === 'philosopher' ? 'Philosopher' : 'School / tradition'}</span></div>
          {current && <strong className="museum-current-label">Currently open</strong>}
          <p>{summary}</p>
          <div className="museum-directory-actions">
            <ExhibitRouteLink route={route} exhibit={item} href={href} push={push} onActivate={onExhibitActivate} current={current}>View exhibit</ExhibitRouteLink>
            <a className="btn" href={href(articleRoute(item))}>Open full article</a>
          </div>
        </li>;
      })}</ul>
    </section>)}
  </div>;
}

function Directory({route, href, push, onClose, onGuidedStart, onExhibitViewpoint}: {
  route: MuseumRoute;
  href: RouteHref;
  push: RouteNavigator;
  onClose: () => void;
  onGuidedStart: () => void;
  onExhibitViewpoint: (id: MuseumExhibitId) => void;
}) {
  const titleId = useId();
  const descriptionId = useId();
  return <MuseumModal labelledBy={titleId} describedBy={descriptionId} onClose={onClose}>
    <div className="museum-overlay-head">
      <div><p className="eyebrow">Museum directory</p><h2 id={titleId}>Eight stops across three eras</h2></div>
      <button className="museum-icon-button" type="button" onClick={onClose} aria-label="Close Museum directory"><X/></button>
    </div>
    <p id={descriptionId}>Every exhibit, object label, and full article remains available without entering the walkable hall.</p>
    <button className="btn btn-primary museum-guided-start" type="button" onClick={onGuidedStart}>Start guided directory visit</button>
    <DirectoryContents route={route} href={href} push={push} onExhibitActivate={(exhibit) => {
      onExhibitViewpoint(exhibit.id);
      onClose();
    }}/>
  </MuseumModal>;
}

function Help({onClose}: {onClose: () => void}) {
  const titleId = useId();
  return <MuseumModal labelledBy={titleId} onClose={onClose}>
    <div className="museum-overlay-head"><div><p className="eyebrow">Controls & access</p><h2 id={titleId}>Explore at your pace</h2></div><button className="museum-icon-button" type="button" onClick={onClose} aria-label="Close Museum help"><X/></button></div>
    <div className="museum-help-grid">
      <section><h3>Keyboard & mouse</h3><p>Choose Enter museum, then use W A S D or the arrow keys. Look with the mouse. Press E or Enter near an exhibit, R to reset, M for the directory, and Escape to pause.</p></section>
      <section><h3>Immersive viewing</h3><p>Immersive mode hides Atlas chrome. Fullscreen uses the browser’s real Fullscreen API; press F when no panel is open. Native Escape exits browser fullscreen.</p></section>
      <section><h3>Touch</h3><p>Use the left movement control and separate right look area. A contextual Interact action appears when an exhibit is near.</p></section>
      <section><h3>Without free movement</h3><p>The directory contains every exhibit and native article link. Guided mode moves between safe viewpoints without requiring manual movement.</p></section>
    </div>
  </MuseumModal>;
}

function MuseumFallback({route, href, push, onRetry, onReload, immersive, fullscreen, onToggleImmersive, onToggleFullscreen}: {
  route: MuseumRoute;
  href: RouteHref;
  push: RouteNavigator;
  onRetry: () => void;
  onReload: () => void;
  immersive: boolean;
  fullscreen: boolean;
  onToggleImmersive: () => void;
  onToggleFullscreen: () => void;
}) {
  return <div className="museum-fallback" role="region" aria-labelledby="museum-fallback-title">
    <p className="eyebrow">Directory mode</p><h2 id="museum-fallback-title" tabIndex={-1}>The walkable hall is unavailable on this device.</h2>
    <p>You can still visit every interpreted object and open every complete Atlas article.</p>
    <div className="museum-fallback-actions">
      <button className="btn btn-primary" type="button" onClick={onRetry}>Retry 3D hall</button>
      <button className="btn" type="button" onClick={onReload}>Reload atlas</button>
      {immersive && <button className="btn" type="button" onClick={onToggleImmersive}>Exit immersive</button>}
      {fullscreen && <button className="btn" type="button" onClick={onToggleFullscreen}>Exit fullscreen</button>}
      <a className="btn" href={href({kind: 'history'})}>Return to Big History</a>
    </div>
    <DirectoryContents route={route} href={href} push={push} showSummaries/>
  </div>;
}

export function MuseumPage({route, href, push, replace}: {
  route: MuseumRoute;
  href: RouteHref;
  push: RouteNavigator;
  replace: RouteNavigator;
}) {
  const hall = getMuseumHallCatalog(route.hallId)!;
  const exhibit = route.exhibitId ? getMuseumExhibitCatalog(route.hallId, route.exhibitId) : undefined;
  const content = useMemo(() => exhibit ? getMuseumExhibitContent(exhibit) : undefined, [exhibit]);
  const experienceRootRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<MuseumControls | null>(null);
  const poseRef = useRef<MuseumPose>((() => {
    const session = loadMuseumSession(ANCIENT_GREEK_HALL_LAYOUT);
    const marker = getMuseumHistoryMarker();
    if (session && (!route.exhibitId || marker?.hallId === route.hallId)) {
      return {x: session.x, z: session.z, yaw: session.yaw, pitch: session.pitch};
    }
    const directViewpoint = route.exhibitId
      ? ANCIENT_GREEK_HALL_LAYOUT.exhibits.find(({id}) => id === route.exhibitId)?.viewpoint
      : undefined;
    return {...(directViewpoint ?? ANCIENT_GREEK_HALL_LAYOUT.spawn)};
  })());
  const nearbyRef = useRef<MuseumExhibitId | undefined>(undefined);
  const lastAnnouncedNearbyRef = useRef<MuseumExhibitId | undefined>(undefined);
  const [nearbyId, setNearbyId] = useState<MuseumExhibitId | undefined>();
  const [announcement, setAnnouncement] = useState('');
  const [exploring, setExploring] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [guided, setGuided] = useState(false);
  const [sceneError, setSceneError] = useState<unknown>(() => hasWebGL() ? null : new Error('WebGL is unavailable.'));
  const hadSceneErrorRef = useRef(Boolean(sceneError));
  const previousModalOpenRef = useRef(false);
  const [sceneEpoch, setSceneEpoch] = useState(0);
  const [poseRevision, setPoseRevision] = useState(0);
  const LazyAncientGreekHallScene = useMemo(createLazyAncientGreekHallScene, [sceneEpoch]);
  const reducedMotion = useReducedMotion();
  const modalOpen = Boolean(exhibit || overlay);
  const blocked = modalOpen || Boolean(sceneError);

  const handleSceneError = useCallback((error: unknown) => {
    controlsRef.current?.pauseExploring();
    setExploring(false);
    setSceneError(error);
  }, []);

  const openExhibit = useCallback((id: MuseumExhibitId) => {
    controlsRef.current?.pauseExploring();
    setExploring(false);
    setGuided(false);
    saveMuseumSession(ANCIENT_GREEK_HALL_LAYOUT, poseRef.current, nearbyRef.current);
    push({kind: 'museum', hallId: route.hallId, exhibitId: id}, {state: historyStateWithMuseumMarker(route.hallId)});
  }, [push, route.hallId]);

  const resetPosition = useCallback(() => {
    controlsRef.current?.pauseExploring();
    removeMuseumSession(route.hallId);
    poseRef.current = {...ANCIENT_GREEK_HALL_LAYOUT.reset};
    setExploring(false);
    setPoseRevision((value) => value + 1);
  }, [route.hallId]);

  const controls = useMuseumControls({
    active: exploring,
    blocked,
    nearbyExhibitId: nearbyId,
    onInteract: openExhibit,
    onReset: resetPosition,
    onOpenDirectory: () => setOverlay('directory'),
    onPause: () => setExploring(false),
  });
  controlsRef.current = controls;

  const experience = useMuseumExperienceMode({
    experienceRootRef,
    shortcutBlocked: blocked,
  });

  const stageExhibitViewpoint = useCallback((id: MuseumExhibitId) => {
    const viewpoint = ANCIENT_GREEK_HALL_LAYOUT.exhibits.find((item) => item.id === id)?.viewpoint;
    if (!viewpoint) return;
    poseRef.current = {...viewpoint};
    saveMuseumSession(ANCIENT_GREEK_HALL_LAYOUT, poseRef.current, id);
    setPoseRevision((value) => value + 1);
  }, []);

  const pauseAndOpen = (next: Exclude<Overlay, null>) => {
    controls.pauseExploring();
    setExploring(false);
    setOverlay(next);
  };
  const beginExploring = () => {
    if (sceneError) return;
    setOverlay(null);
    setExploring(true);
    controls.beginExploring();
  };
  const closeExhibit = () => {
    const marker = getMuseumHistoryMarker();
    setGuided(false);
    if (marker?.hallId === route.hallId && marker.openedFromHall) window.history.back();
    else replace(
      {kind: 'museum', hallId: route.hallId},
      {state: isPlainObject(window.history.state) ? {...window.history.state, philosophyAtlasMuseum: undefined} : undefined},
    );
  };

  const goGuided = (index: number, replaceCurrent = false) => {
    const id = hall.guidedOrder[index];
    const viewpoint = ANCIENT_GREEK_HALL_LAYOUT.exhibits.find((item) => item.id === id)?.viewpoint;
    if (!id || !viewpoint) return;
    controls.pauseExploring();
    setExploring(false);
    poseRef.current = {...viewpoint};
    saveMuseumSession(ANCIENT_GREEK_HALL_LAYOUT, poseRef.current, id);
    setPoseRevision((value) => value + 1);
    setGuided(true);
    setOverlay(null);
    const target = {kind: 'museum' as const, hallId: route.hallId, exhibitId: id};
    const state = historyStateWithMuseumMarker(route.hallId);
    if (replaceCurrent) replace(target, {state}); else push(target, {state});
  };

  const retryScene = () => {
    setSceneError(null);
    setSceneEpoch((value) => value + 1);
    window.requestAnimationFrame(() => document.getElementById('museum-enter-button')?.focus({preventScroll: true}));
  };

  useEffect(() => {
    const background = backgroundRef.current;
    const appHeader = document.querySelector<HTMLElement>('.shell-museum > .app-header');
    if (!background) return;
    background.inert = modalOpen;
    if (appHeader) appHeader.inert = modalOpen;
    if (modalOpen) background.setAttribute('aria-hidden', 'true');
    else background.removeAttribute('aria-hidden');
    if (appHeader) {
      if (modalOpen) appHeader.setAttribute('aria-hidden', 'true');
      else appHeader.removeAttribute('aria-hidden');
    }
    return () => {
      background.inert = false;
      background.removeAttribute('aria-hidden');
      if (appHeader) {
        appHeader.inert = false;
        appHeader.removeAttribute('aria-hidden');
      }
    };
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    experience.clearError();
  }, [experience.clearError, modalOpen]);

  useEffect(() => {
    if (route.exhibitId || modalOpen) return;
    const frame = window.requestAnimationFrame(() => {
      const target = sceneError
        ? document.getElementById('museum-fallback-title')
        : document.getElementById('museum-title');
      target?.focus({preventScroll: true});
    });
    return () => window.cancelAnimationFrame(frame);
  }, [route.exhibitId, sceneError]);

  useEffect(() => {
    const failed = Boolean(sceneError);
    const shouldFocus = failed
      && !modalOpen
      && (!hadSceneErrorRef.current || previousModalOpenRef.current);
    hadSceneErrorRef.current = failed;
    previousModalOpenRef.current = modalOpen;
    if (!shouldFocus) return;
    const frame = window.requestAnimationFrame(() => document.getElementById('museum-fallback-title')?.focus({preventScroll: true}));
    return () => window.cancelAnimationFrame(frame);
  }, [modalOpen, sceneError]);

  useEffect(() => {
    if (route.exhibitId) setOverlay(null);
    else setGuided(false);
  }, [route.exhibitId]);

  const previousRouteExhibitRef = useRef(route.exhibitId);
  useEffect(() => {
    const previous = previousRouteExhibitRef.current;
    previousRouteExhibitRef.current = route.exhibitId;
    if (!route.exhibitId || route.exhibitId === previous) return;
    if (getMuseumHistoryMarker()?.hallId === route.hallId) return;
    const viewpoint = ANCIENT_GREEK_HALL_LAYOUT.exhibits.find(({id}) => id === route.exhibitId)?.viewpoint;
    if (!viewpoint) return;
    poseRef.current = {...viewpoint};
    setPoseRevision((value) => value + 1);
  }, [route.exhibitId, route.hallId]);

  useEffect(() => {
    if (!route.exhibitId || getMuseumHistoryMarker()?.hallId === route.hallId) return;
    window.history.replaceState(historyStateWithMuseumMarker(route.hallId, false), '');
  }, [route.exhibitId, route.hallId]);

  useEffect(() => {
    if (!exploring) return;
    const timer = window.setInterval(() => saveMuseumSession(ANCIENT_GREEK_HALL_LAYOUT, poseRef.current, nearbyRef.current), 500);
    return () => window.clearInterval(timer);
  }, [exploring]);

  useEffect(() => () => {
    saveMuseumSession(ANCIENT_GREEK_HALL_LAYOUT, poseRef.current, nearbyRef.current);
  }, []);

  const nearby = nearbyId ? getMuseumExhibitCatalog(route.hallId, nearbyId) : undefined;
  const nearbyContent = useMemo(() => nearby ? getMuseumExhibitContent(nearby) : undefined, [nearby]);
  useEffect(() => {
    if (!exploring || !nearby || nearby.id === lastAnnouncedNearbyRef.current) return;
    const timer = window.setTimeout(() => {
      if (nearbyRef.current !== nearby.id) return;
      lastAnnouncedNearbyRef.current = nearby.id;
      setAnnouncement(`Near ${nearby.displayName}. Press E or Enter to open the exhibit.`);
    }, reducedMotion ? 0 : 650);
    return () => window.clearTimeout(timer);
  }, [exploring, nearby, reducedMotion]);

  const exhibitIndex = exhibit ? hall.guidedOrder.indexOf(exhibit.id) : -1;

  return <div
    ref={experienceRootRef}
    className="museum-page"
    data-immersive={experience.immersive ? 'true' : 'false'}
    data-fullscreen={experience.fullscreen ? 'true' : 'false'}
  >
    <section className="museum-stage" data-exploring={exploring ? 'true' : 'false'} aria-describedby="museum-controls-description">
      <p className="sr-only" id="museum-controls-description">A first-person gallery. Use Enter museum before keyboard, mouse, or touch controls affect the scene. The complete directory and guided visit are available without free movement.</p>

      <div ref={backgroundRef} className="museum-stage-surface" data-museum-background>
        {sceneError ? <MuseumFallback
          route={route}
          href={href}
          push={push}
          onRetry={retryScene}
          onReload={() => window.location.reload()}
          immersive={experience.immersive}
          fullscreen={experience.fullscreen}
          onToggleImmersive={experience.toggleImmersive}
          onToggleFullscreen={() => void experience.toggleFullscreen()}
        /> : <MuseumSceneBoundary onError={handleSceneError} resetKey={sceneEpoch}>
          <Suspense fallback={<div className="museum-scene-loading" role="status">Preparing the walkable hall…</div>}>
            <LazyAncientGreekHallScene
              key={sceneEpoch}
              active={exploring}
              blocked={blocked}
              poseRevision={poseRevision}
              reducedMotion={reducedMotion}
              inputRef={controls.inputRef}
              poseRef={poseRef}
              onCanvasReady={(canvas) => {
                canvas.setAttribute('role', 'img');
                canvas.setAttribute('aria-label', 'Walkable Ancient Greek and Hellenistic philosophy gallery');
                canvas.setAttribute('aria-describedby', 'museum-controls-description');
                canvas.tabIndex = 0;
                controls.onCanvasReady(canvas);
              }}
              onNearbyChange={(id) => {
                const typed = id as MuseumExhibitId | undefined;
                nearbyRef.current = typed;
                setNearbyId(typed);
              }}
              onSelectExhibit={(id) => {
                if (!controls.shouldSuppressActivation()) openExhibit(id as MuseumExhibitId);
              }}
              onSceneError={handleSceneError}
            />
          </Suspense>
        </MuseumSceneBoundary>}

        <div className="museum-hud">
          <header className="museum-masthead" data-condensed={exploring ? 'true' : 'false'}>
            <p className="museum-masthead-kicker"><Landmark size={14}/> Philosophy Atlas Museum <span>Gallery 01</span></p>
            <h1 id="museum-title" tabIndex={-1}>{hall.title}</h1>
            <p className="museum-masthead-period">5th century BCE — 6th century CE</p>
            <p className="museum-masthead-sweep">Classical inquiry <span>→</span> Hellenistic ways of life <span>→</span> late-antique ascent</p>
            <div className="museum-entry-row">
              <button id="museum-enter-button" className="museum-enter-button" type="button" onClick={beginExploring} disabled={Boolean(sceneError)}><DoorOpen size={17}/> {exploring ? 'Resume visit' : 'Enter museum'}</button>
              <span>{exploring ? controls.mode.replace('-', ' ') : 'WASD · arrows · touch'}</span>
            </div>
          </header>

          <nav className="museum-utility-bar" aria-label="Museum display and navigation controls">
            <button className="museum-control-directory" type="button" onClick={() => pauseAndOpen('directory')} aria-expanded={overlay === 'directory'} aria-label="Open Museum directory" title="Directory"><MapPinned size={16}/><span>Directory</span></button>
            <button className="museum-control-help" type="button" onClick={() => pauseAndOpen('help')} aria-expanded={overlay === 'help'} aria-label="Open Museum controls and access help" title="Controls"><Info size={16}/><span>Controls</span></button>
            <button className="museum-control-reset" type="button" onClick={resetPosition} aria-label="Reset Museum position" title="Reset position"><RotateCcw size={16}/><span>Reset</span></button>
            <button className="museum-control-immersive" type="button" onClick={experience.toggleImmersive} aria-pressed={experience.immersive} aria-label={experience.immersive ? 'Exit immersive Museum mode' : 'Enter immersive Museum mode'} title={experience.immersive ? 'Exit immersive' : 'Enter immersive'}><Scan size={16}/><span>{experience.immersive ? 'Exit immersive' : 'Immersive'}</span></button>
            {experience.fullscreenSupported && <button className="museum-control-fullscreen" type="button" onClick={() => void experience.toggleFullscreen()} aria-pressed={experience.fullscreen} aria-label={experience.fullscreen ? 'Exit browser fullscreen' : 'Enter browser fullscreen'} title={experience.fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{experience.fullscreen ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}<span>{experience.fullscreen ? 'Exit fullscreen' : 'Fullscreen'}</span></button>}
            {exploring && <button className="museum-pause-button" type="button" onClick={controls.pauseExploring} aria-label="Pause Museum visit">Pause visit</button>}
          </nav>

          {nearby && nearbyContent && exploring && <aside className="museum-proximity-card" data-zone={nearby.zoneId}>
            <p><span>{nearby.entityKind === 'philosopher' ? 'Philosopher' : 'School & tradition'}</span><span>{nearbyContent.dateLabel}</span></p>
            <h2>{nearby.displayName}</h2>
            <blockquote>{nearby.question}</blockquote>
            <button type="button" onClick={() => openExhibit(nearby.id)}>E / Enter · Interpret exhibit</button>
          </aside>}

          <div className="museum-era-rail" aria-label="Gallery chronology">
            {hall.zones.map((zone, index) => <div key={zone.id} data-zone={zone.id}><span>0{index + 1}</span><strong>{zone.title}</strong><small>{zone.period}</small></div>)}
          </div>
        </div>

        <MuseumTouchControls
          active={exploring}
          blocked={blocked}
          canInteract={Boolean(nearby)}
          nearbyLabel={nearby?.displayName}
          movementBindings={controls.movementBindings}
          lookBindings={controls.lookBindings}
          onInteract={() => nearby && openExhibit(nearby.id)}
          onPause={controls.pauseExploring}
          onReset={resetPosition}
          onDirectory={() => pauseAndOpen('directory')}
        />
        <div className="museum-live-region sr-only" aria-live="polite" aria-atomic="true">{announcement}</div>
      </div>

      {experience.fullscreenError && <div className="museum-status-message" role="status"><span>{experience.fullscreenError}</span><button type="button" onClick={experience.clearError}>Dismiss</button></div>}
      {!exhibit && overlay === 'directory' && <Directory route={route} href={href} push={push} onClose={() => setOverlay(null)} onGuidedStart={() => goGuided(0)} onExhibitViewpoint={stageExhibitViewpoint}/>}
      {!exhibit && overlay === 'help' && <Help onClose={() => setOverlay(null)}/>}
      {exhibit && content && <MuseumInterpretationPanel
        key={exhibit.id}
        route={route}
        exhibit={exhibit}
        content={content}
        href={href}
        guided={guided}
        exhibitIndex={exhibitIndex}
        exhibitCount={hall.guidedOrder.length}
        onClose={closeExhibit}
        onArticleIntent={() => saveMuseumSession(ANCIENT_GREEK_HALL_LAYOUT, poseRef.current, nearbyRef.current)}
        onGuidedPrevious={() => goGuided(exhibitIndex - 1, true)}
        onGuidedNext={() => goGuided(exhibitIndex + 1, true)}
        onRelated={(related, event) => {
          if (!isOrdinaryActivation(event)) return;
          event.preventDefault();
          stageExhibitViewpoint(related.id);
          openExhibit(related.id);
        }}
      />}
    </section>
  </div>;
}
