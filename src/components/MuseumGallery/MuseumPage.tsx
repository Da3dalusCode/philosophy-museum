import {BookOpen, Compass, DoorOpen, Info, Landmark, MapPinned, RotateCcw, X} from 'lucide-react';
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
  type CSSProperties,
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
import {MuseumTouchControls} from './MuseumTouchControls';
import {loadMuseumSession, removeMuseumSession, saveMuseumSession} from './museumSession';
import {useMuseumControls} from './useMuseumControls';
import './museum.css';

const LazyAncientGreekHallScene = lazy(() => import('./AncientGreekHallScene').then(
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

const historyStateWithMuseumMarker = (hallId: string): MuseumHistoryState => ({
  ...(isPlainObject(window.history.state) ? window.history.state : {}),
  philosophyAtlasMuseum: {hallId, openedFromHall: true},
});

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

function Modal({labelledBy, describedBy, onClose, children}: {
  labelledBy: string;
  describedBy?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (previous?.isConnected) previous.focus();
    };
  }, []);
  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])') ?? [])]
      .filter((item) => !item.hasAttribute('hidden'));
    if (!focusable.length) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable.at(-1)!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  return <div className="museum-modal-backdrop" role="presentation" onMouseDown={(event) => {
    if (event.target === event.currentTarget) onClose();
  }}>
    <div className="museum-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={labelledBy} aria-describedby={describedBy} tabIndex={-1} onKeyDown={trapFocus}>{children}</div>
  </div>;
}

function ExhibitRouteLink({route, exhibit, href, push, className = 'btn btn-primary', onActivate, children}: {
  route: MuseumRoute;
  exhibit: MuseumExhibitCatalog;
  href: RouteHref;
  push: RouteNavigator;
  className?: string;
  onActivate?: () => void;
  children: ReactNode;
}) {
  const target = {kind: 'museum' as const, hallId: route.hallId, exhibitId: exhibit.id};
  return <a className={className} href={href(target)} onClick={(event) => {
    if (!isOrdinaryActivation(event)) return;
    event.preventDefault();
    onActivate?.();
    push(target, {state: historyStateWithMuseumMarker(route.hallId)});
  }}>{children}</a>;
}

function Directory({route, href, push, onClose, onGuidedStart}: {
  route: MuseumRoute;
  href: RouteHref;
  push: RouteNavigator;
  onClose: () => void;
  onGuidedStart: () => void;
}) {
  const hall = getMuseumHallCatalog(route.hallId)!;
  const titleId = useId();
  const descriptionId = useId();
  return <Modal labelledBy={titleId} describedBy={descriptionId} onClose={onClose}>
    <div className="museum-modal-head">
      <div><p className="eyebrow">Museum directory</p><h2 id={titleId}>Eight stops across three eras</h2></div>
      <button className="museum-icon-button" type="button" onClick={onClose} aria-label="Close Museum directory"><X/></button>
    </div>
    <p id={descriptionId}>Every exhibit and full article remains available without entering the 3D hall.</p>
    <button className="btn btn-primary museum-guided-start" type="button" onClick={onGuidedStart}>Start guided directory visit</button>
    <div className="museum-directory-zones">
      {hall.zones.map((zone) => <section key={zone.id} aria-labelledby={`museum-zone-${zone.id}`}>
        <p className="museum-zone-period">{zone.period}</p><h3 id={`museum-zone-${zone.id}`}>{zone.title}</h3><p>{zone.description}</p>
        <ul>{hall.exhibits.filter((item) => item.zoneId === zone.id).map((item) => <li key={item.id} className={route.exhibitId === item.id ? 'is-current' : ''}>
          <div><b>{item.displayName}</b><span>{item.entityKind === 'philosopher' ? 'Philosopher' : 'School / branch'}</span></div>
          <p>{item.question}</p>
          <div className="museum-directory-actions">
            <ExhibitRouteLink route={route} exhibit={item} href={href} push={push} onActivate={onClose}>View exhibit</ExhibitRouteLink>
            <a className="btn" href={href(articleRoute(item))}>Open full article</a>
          </div>
        </li>)}</ul>
      </section>)}
    </div>
  </Modal>;
}

function Help({onClose}: {onClose: () => void}) {
  const titleId = useId();
  return <Modal labelledBy={titleId} onClose={onClose}>
    <div className="museum-modal-head"><div><p className="eyebrow">Controls & access</p><h2 id={titleId}>Explore at your pace</h2></div><button className="museum-icon-button" type="button" onClick={onClose} aria-label="Close Museum help"><X/></button></div>
    <div className="museum-help-grid">
      <section><h3>Keyboard & mouse</h3><p>Choose Enter museum, then use W A S D or the arrow keys. Look with the mouse. Press E or Enter near an exhibit, R to reset, M for the directory, and Escape to pause.</p></section>
      <section><h3>Touch</h3><p>Use the left movement control and the separate right look area. A contextual Interact button appears when an exhibit is near.</p></section>
      <section><h3>Without 3D</h3><p>The directory contains every exhibit label and native link. Guided mode moves directly between safe viewpoints without requiring free movement.</p></section>
    </div>
  </Modal>;
}

function MuseumFallback({route, href, onRetry}: {route: MuseumRoute; href: RouteHref; onRetry: () => void}) {
  const hall = getMuseumHallCatalog(route.hallId)!;
  return <div className="museum-fallback" role="status">
    <p className="eyebrow">Directory mode</p><h2>The walkable hall is unavailable on this device.</h2>
    <p>You can still visit every exhibit and open every complete Atlas article.</p>
    <div className="museum-fallback-actions"><button className="btn btn-primary" type="button" onClick={onRetry}>Retry 3D hall</button><a className="btn" href={href({kind: 'history'})}>Return to Big History</a></div>
    <ul>{hall.exhibits.map((item) => <li key={item.id}><b>{item.displayName}</b><span>{item.question}</span><a href={href(articleRoute(item))}>Open full article</a></li>)}</ul>
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
  const backgroundRef = useRef<HTMLDivElement>(null);
  const poseRef = useRef<MuseumPose>((() => {
    const session = loadMuseumSession(ANCIENT_GREEK_HALL_LAYOUT);
    if (session) return {x: session.x, z: session.z, yaw: session.yaw, pitch: session.pitch};
    const directViewpoint = route.exhibitId
      ? ANCIENT_GREEK_HALL_LAYOUT.exhibits.find(({id}) => id === route.exhibitId)?.viewpoint
      : undefined;
    return {...(directViewpoint ?? ANCIENT_GREEK_HALL_LAYOUT.spawn)};
  })());
  const nearbyRef = useRef<MuseumExhibitId | undefined>(undefined);
  const [nearbyId, setNearbyId] = useState<MuseumExhibitId | undefined>();
  const [exploring, setExploring] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [guided, setGuided] = useState(false);
  const [sceneError, setSceneError] = useState<unknown>(() => hasWebGL() ? null : new Error('WebGL is unavailable.'));
  const [sceneEpoch, setSceneEpoch] = useState(0);
  const reducedMotion = useReducedMotion();
  const modalOpen = Boolean(exhibit || overlay);
  const blocked = modalOpen || Boolean(sceneError);

  const openExhibit = useCallback((id: MuseumExhibitId) => {
    const target = {kind: 'museum' as const, hallId: route.hallId, exhibitId: id};
    saveMuseumSession(ANCIENT_GREEK_HALL_LAYOUT, poseRef.current, nearbyRef.current);
    push(target, {state: historyStateWithMuseumMarker(route.hallId)});
  }, [push, route.hallId]);

  const resetPosition = useCallback(() => {
    removeMuseumSession(route.hallId);
    poseRef.current = {...ANCIENT_GREEK_HALL_LAYOUT.reset};
    setExploring(false);
    setSceneEpoch((value) => value + 1);
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

  const pauseAndOpen = (next: Exclude<Overlay, null>) => {
    controls.pauseExploring();
    setOverlay(next);
  };
  const beginExploring = () => {
    if (sceneError) return;
    setOverlay(null);
    setExploring(true);
    controls.beginExploring();
  };
  const closeExhibit = () => {
    const marker = isPlainObject(window.history.state)
      ? (window.history.state as MuseumHistoryState).philosophyAtlasMuseum
      : undefined;
    setGuided(false);
    if (marker?.hallId === route.hallId && marker.openedFromHall) window.history.back();
    else replace({kind: 'museum', hallId: route.hallId}, {state: isPlainObject(window.history.state) ? {...window.history.state, philosophyAtlasMuseum: undefined} : undefined});
  };

  const goGuided = (index: number, replaceCurrent = false) => {
    const id = hall.guidedOrder[index];
    const viewpoint = ANCIENT_GREEK_HALL_LAYOUT.exhibits.find((item) => item.id === id)?.viewpoint;
    if (!id || !viewpoint) return;
    controls.pauseExploring();
    poseRef.current = {...viewpoint};
    saveMuseumSession(ANCIENT_GREEK_HALL_LAYOUT, poseRef.current, id);
    setSceneEpoch((value) => value + 1);
    setGuided(true);
    setOverlay(null);
    const target = {kind: 'museum' as const, hallId: route.hallId, exhibitId: id};
    const state = historyStateWithMuseumMarker(route.hallId);
    if (replaceCurrent) replace(target, {state}); else push(target, {state});
  };

  const retryScene = () => {
    setSceneError(null);
    setSceneEpoch((value) => value + 1);
  };

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;
    background.inert = modalOpen;
    if (modalOpen) background.setAttribute('aria-hidden', 'true');
    else background.removeAttribute('aria-hidden');
    return () => {
      background.inert = false;
      background.removeAttribute('aria-hidden');
    };
  }, [modalOpen]);

  useEffect(() => {
    if (!exploring) return;
    const timer = window.setInterval(() => saveMuseumSession(
      ANCIENT_GREEK_HALL_LAYOUT,
      poseRef.current,
      nearbyRef.current,
    ), 500);
    return () => window.clearInterval(timer);
  }, [exploring]);

  useEffect(() => () => {
    saveMuseumSession(ANCIENT_GREEK_HALL_LAYOUT, poseRef.current, nearbyRef.current);
  }, []);

  const exhibitIndex = exhibit ? hall.guidedOrder.indexOf(exhibit.id) : -1;
  const exhibitTitleId = useId();
  const exhibitDescriptionId = useId();
  const nearby = nearbyId ? getMuseumExhibitCatalog(route.hallId, nearbyId) : undefined;

  return <div className="museum-page">
    <div ref={backgroundRef} data-museum-background>
      <section className="museum-intro" aria-labelledby="museum-title">
        <div><p className="eyebrow"><Landmark size={15}/> Walkable collection · Gallery 01</p><h1 id="museum-title">{hall.title}</h1><p>{hall.description}</p></div>
        <div className="museum-intro-actions">
          <button className="btn btn-primary" type="button" onClick={beginExploring} disabled={Boolean(sceneError)}><DoorOpen size={17}/> {exploring ? 'Resume exploring' : 'Enter museum'}</button>
          <button className="btn" type="button" onClick={() => pauseAndOpen('directory')} aria-expanded={overlay === 'directory'}><MapPinned size={17}/> Directory</button>
          <button className="btn" type="button" onClick={() => pauseAndOpen('help')} aria-expanded={overlay === 'help'}><Info size={17}/> Controls</button>
          <button className="btn" type="button" onClick={resetPosition}><RotateCcw size={17}/> Reset</button>
        </div>
      </section>

      <section className="museum-stage" data-exploring={exploring ? 'true' : 'false'} aria-describedby="museum-controls-description">
        <p className="sr-only" id="museum-controls-description">A first-person gallery. Use the Enter museum button before keyboard, mouse, or touch controls affect the scene.</p>
        {sceneError ? <MuseumFallback route={route} href={href} onRetry={retryScene}/> : <MuseumSceneBoundary onError={setSceneError} resetKey={sceneEpoch}>
          <Suspense fallback={<div className="museum-scene-loading" role="status">Preparing the walkable hall…</div>}>
            <LazyAncientGreekHallScene
              key={sceneEpoch}
              active={exploring}
              blocked={blocked}
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
              onSceneError={setSceneError}
            />
          </Suspense>
        </MuseumSceneBoundary>}

        {!sceneError && <div className="museum-hud">
          <div className="museum-hud-status"><span>{exploring ? controls.mode.replace('-', ' ') : 'Gallery paused'}</span><b>{nearby ? `Near ${nearby.displayName}` : 'Follow the bronze timeline'}</b></div>
          {nearby && exploring && <button className="museum-interact-prompt" type="button" onClick={() => openExhibit(nearby.id)}>E / Enter · View {nearby.displayName}</button>}
          <div className="museum-hud-actions">
            {exploring ? <button type="button" onClick={controls.pauseExploring}>Pause / Exit</button> : <button type="button" onClick={beginExploring}>Enter museum</button>}
            <button type="button" onClick={() => pauseAndOpen('directory')}>Directory</button>
            <button type="button" onClick={() => pauseAndOpen('help')}>Help</button>
            <button type="button" onClick={resetPosition}>Reset</button>
          </div>
        </div>}

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
        <div className="museum-live-region sr-only" aria-live="polite">{nearby ? `Near ${nearby.displayName}. Press E or Enter to interact.` : exploring ? 'Exploring the gallery.' : 'Gallery paused.'}</div>
      </section>
    </div>

    {overlay === 'directory' && <Directory route={route} href={href} push={push} onClose={() => setOverlay(null)} onGuidedStart={() => goGuided(0)}/>}
    {overlay === 'help' && <Help onClose={() => setOverlay(null)}/>}
    {exhibit && content && <Modal labelledBy={exhibitTitleId} describedBy={exhibitDescriptionId} onClose={closeExhibit}>
      <div className="museum-modal-head"><div><p className="eyebrow">{content.entityType}</p><h2 id={exhibitTitleId}>{content.displayName}</h2><span className="museum-date-label">{content.dateLabel}</span></div><button className="museum-icon-button" type="button" onClick={closeExhibit} aria-label={`Close ${content.displayName} exhibit`}><X/></button></div>
      <p className="museum-exhibit-question" id={exhibitDescriptionId}>{content.centralQuestion}</p>
      <p>{content.introduction}</p>
      <dl className="museum-label-details" style={{'--museum-accent': content.accent} as CSSProperties}>
        <div><dt>Featured idea</dt><dd>{content.featuredIdea}</dd></div>
        <div><dt>Why it matters</dt><dd>{content.whyItMatters}</dd></div>
        <div><dt>Representative reading</dt><dd>{content.representativeWork}</dd></div>
      </dl>
      {guided && <div className="museum-guided-controls" aria-label="Guided exhibit navigation">
        <button type="button" disabled={exhibitIndex <= 0} onClick={() => goGuided(exhibitIndex - 1, true)}>Previous exhibit</button>
        <span>{exhibitIndex + 1} of {hall.guidedOrder.length}</span>
        <button type="button" disabled={exhibitIndex >= hall.guidedOrder.length - 1} onClick={() => goGuided(exhibitIndex + 1, true)}>Next exhibit</button>
        <button type="button" onClick={() => {setGuided(false); closeExhibit();}}>Return to free exploration</button>
      </div>}
      <div className="museum-modal-actions">
        <a className="btn btn-primary" href={href(content.articleRoute)} onClick={() => saveMuseumSession(ANCIENT_GREEK_HALL_LAYOUT, poseRef.current, nearbyRef.current)}>{exhibit.entityKind === 'philosopher' ? 'Open full philosopher profile' : 'Open Branch Explorer'}</a>
        <button className="btn" type="button" onClick={closeExhibit}>Continue exploring</button>
      </div>
    </Modal>}
  </div>;
}
