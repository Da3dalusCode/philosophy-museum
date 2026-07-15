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
import type {MuseumExhibitRef, MuseumHallConnection, MuseumPose} from '../../data/museum/museumWorldTypes';
import {getMuseumInterpretation} from '../../data/museum/museumInterpretations';
import {
  getMuseumExhibitCatalog,
  getMuseumHallCatalog,
  MUSEUM_HALLS,
  type MuseumExhibitCatalog,
  type MuseumExhibitId,
  type MuseumHallId,
} from '../../data/museumCatalog';
import type {MuseumRoute, NavigableAppRoute, RouteHref, RouteNavigator} from '../../routing/routes';
import {MuseumInterpretationPanel} from './MuseumInterpretationPanel';
import {MuseumTouchControls} from './MuseumTouchControls';
import {loadMuseumSession, removeMuseumSession, saveMuseumSession} from './museumSession';
import {useMuseumControls, type MuseumControls} from './useMuseumControls';
import {useMuseumExperienceMode} from './useMuseumExperienceMode';
import {resolveMuseumHallArrival} from './museumHallTransitions';
import {
  getMuseumHallRegistration,
  MUSEUM_WORLD_REGISTRY,
  prefetchMuseumHallEntry,
  prefetchMuseumHallRemainder,
} from './museumWorldRegistry';
import {
  createMuseumExhibitVisitContext,
  directMuseumVisitContext,
  museumHistoryStateWithVisitContext,
  museumPhaseHasActiveIntent,
  parseMuseumExhibitVisitContext,
  resolveMuseumCloseResumeStrategy,
  resolveMuseumExitPolicy,
  transitionMuseumVisitPhase,
  type MuseumExhibitOrigin,
  type MuseumExhibitVisitContext,
  type MuseumExitTrigger,
  type MuseumVisitPhase,
} from './museumVisitState';
import './museum.css';

const createLazyMuseumWorldScene = () => lazy(() => import('./MuseumWorldScene').then(
  ({MuseumWorldScene}) => ({default: MuseumWorldScene}),
));

type Overlay = 'directory' | 'help' | null;

class MuseumHallResidencyError extends Error {
  constructor(hallId: MuseumHallId) {
    super(`Museum hall ${hallId} left the resident world before it finished rendering.`);
    this.name = 'MuseumHallResidencyError';
  }
}

type HallRenderWaiter = {
  promise: Promise<void>;
  resolve: () => void;
  reject: (error: unknown) => void;
};

const articleRoute = (exhibit: MuseumExhibitCatalog): NavigableAppRoute =>
  exhibit.entityKind === 'philosopher'
    ? {kind: 'philosopher', philosopherId: exhibit.entityId}
    : {kind: 'branch', branchId: exhibit.entityId};

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
const isVisibleFocusTarget = (item: HTMLElement | null | undefined): item is HTMLElement => Boolean(
  item
  && item.isConnected
  && !item.matches(':disabled')
  && !item.closest('[inert],[aria-hidden="true"],[hidden]')
  && (item.offsetWidth || item.offsetHeight || item.getClientRects().length),
);
const visibleFocusable = (root: HTMLElement): HTMLElement[] => [...root.querySelectorAll<HTMLElement>(focusableSelector)]
  .filter(isVisibleFocusTarget);

function MuseumModal({labelledBy, describedBy, returnFocus, onClose, children}: {
  labelledBy: string;
  describedBy?: string;
  returnFocus?: HTMLElement | null;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const previous = returnFocus
      ?? (document.activeElement instanceof HTMLElement ? document.activeElement : undefined);
    dialogRef.current?.focus();
    return () => {
      window.requestAnimationFrame(() => {
        const fallback = document.getElementById('museum-enter-button')
          ?? document.querySelector<HTMLElement>('.museum-scene-canvas');
        const target = isVisibleFocusTarget(previous) ? previous : isVisibleFocusTarget(fallback) ? fallback : undefined;
        target?.focus({preventScroll: true});
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

function ExhibitRouteLink({route, exhibit, href, push, origin, className = 'btn btn-primary', onActivate, current, children}: {
  route: MuseumRoute;
  exhibit: MuseumExhibitCatalog;
  href: RouteHref;
  push: RouteNavigator;
  origin: MuseumExhibitOrigin;
  className?: string;
  onActivate?: (exhibit: MuseumExhibitCatalog, hallId: MuseumHallId) => void;
  current?: boolean;
  children: ReactNode;
}) {
  const target = {kind: 'museum' as const, hallId: route.hallId, exhibitId: exhibit.id};
  return <a className={className} href={href(target)} aria-current={current ? 'page' : undefined} onClick={(event) => {
    if (!isOrdinaryActivation(event)) return;
    event.preventDefault();
    onActivate?.(exhibit, route.hallId);
    push(target, {state: museumHistoryStateWithVisitContext(
      window.history.state,
      createMuseumExhibitVisitContext(route.hallId, origin),
    )});
  }}>{children}</a>;
}

function DirectoryContents({route, hallId = route.hallId, href, push, onExhibitActivate, onZoneActivate, showSummaries = false, exhibitOrigin = 'direct'}: {
  route: MuseumRoute;
  hallId?: MuseumHallId;
  href: RouteHref;
  push: RouteNavigator;
  onExhibitActivate?: (reference: MuseumExhibitRef) => void;
  onZoneActivate?: (hallId: MuseumHallId, zoneId: string) => void;
  showSummaries?: boolean;
  exhibitOrigin?: MuseumExhibitOrigin;
}) {
  const hall = getMuseumHallCatalog(hallId)!;
  const hallRoute: MuseumRoute = {kind: 'museum', hallId, exhibitId: route.hallId === hallId ? route.exhibitId : undefined};
  const headingPrefix = useId();
  return <div className="museum-directory-zones">
    {hall.zones.map((zone) => <section key={zone.id} aria-labelledby={`${headingPrefix}-${zone.id}`}>
      <p className="museum-zone-period">{zone.period}</p><h3 id={`${headingPrefix}-${zone.id}`}>{zone.title}</h3><p>{zone.description}</p>
      <ul>{hall.exhibits.filter((item) => item.zoneId === zone.id).map((item) => {
        const current = route.hallId === hallId && route.exhibitId === item.id;
        const summary = showSummaries ? getMuseumInterpretation({hallId, exhibitId: item.id}).lead : item.question;
        return <li key={item.id} className={current ? 'is-current' : ''} data-entity-kind={item.entityKind}>
          <div><b>{item.displayName}</b><span>{item.entityKind === 'philosopher' ? 'Philosopher' : 'School / tradition'}</span></div>
          {current && <strong className="museum-current-label">Currently open</strong>}
          <p>{summary}</p>
          <div className="museum-directory-actions">
            <ExhibitRouteLink route={hallRoute} exhibit={item} href={href} push={push} origin={exhibitOrigin} onActivate={(selected, selectedHallId) => onExhibitActivate?.({hallId: selectedHallId, exhibitId: selected.id})} current={current}>View exhibit</ExhibitRouteLink>
            <a className="btn" href={href(articleRoute(item))}>Open full article</a>
          </div>
        </li>;
      })}</ul>
      {onZoneActivate && <button className="btn museum-zone-view-button" type="button" onClick={() => onZoneActivate(hallId, zone.id)}>View this room entrance</button>}
    </section>)}
  </div>;
}

function Directory({route, href, push, returnFocus, onClose, onGuidedStart, onHallActivate, onExhibitViewpoint, onZoneViewpoint}: {
  route: MuseumRoute;
  href: RouteHref;
  push: RouteNavigator;
  returnFocus?: HTMLElement | null;
  onClose: () => void;
  onGuidedStart: () => void;
  onHallActivate: (hallId: MuseumHallId) => void;
  onExhibitViewpoint: (reference: MuseumExhibitRef) => void;
  onZoneViewpoint: (hallId: MuseumHallId, zoneId: string) => void;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const [selectedHallId, setSelectedHallId] = useState<MuseumHallId>(route.hallId);
  const selectedHall = getMuseumHallCatalog(selectedHallId)!;
  return <MuseumModal labelledBy={titleId} describedBy={descriptionId} returnFocus={returnFocus} onClose={onClose}>
    <div className="museum-overlay-head">
      <div><p className="eyebrow">Museum directory</p><h2 id={titleId}>{MUSEUM_HALLS.length} connected galleries · {MUSEUM_HALLS.reduce((total, hall) => total + hall.exhibits.length, 0)} interpreted stops</h2></div>
      <button className="museum-icon-button" type="button" onClick={onClose} aria-label="Close Museum directory"><X/></button>
    </div>
    <p id={descriptionId}>Choose a gallery, stage a safe room viewpoint, or open any exhibit without relying on free movement.</p>
    <div className="museum-directory-halls" role="group" aria-label="Choose a Museum gallery">
      {MUSEUM_HALLS.map((item) => <button key={item.id} type="button" aria-pressed={selectedHallId === item.id} className={selectedHallId === item.id ? 'is-selected' : ''} onClick={() => setSelectedHallId(item.id)}>
        <span>{item.galleryNumber}</span><b>{item.title}</b><small>{item.period}</small>
      </button>)}
    </div>
    <section className="museum-directory-hall-intro">
      <div><p className="eyebrow">{selectedHall.galleryNumber} · {selectedHall.period}</p><h3>{selectedHall.title}</h3><p>{selectedHall.description}</p><p className="museum-directory-sweep">{selectedHall.sweep.join(' → ')}</p></div>
      <div className="museum-directory-hall-actions">
        <button className="btn btn-primary" type="button" onClick={() => onHallActivate(selectedHallId)}>{route.hallId === selectedHallId ? 'Return to this hall' : `Go to ${selectedHall.title}`}</button>
        <button className="btn" type="button" onClick={onGuidedStart} disabled={selectedHallId !== route.hallId}>Start guided visit</button>
      </div>
    </section>
    <DirectoryContents route={route} hallId={selectedHallId} href={href} push={push} exhibitOrigin="directory" onZoneActivate={onZoneViewpoint} onExhibitActivate={(reference) => {
      onExhibitViewpoint(reference);
      onClose();
    }}/>
  </MuseumModal>;
}

function Help({returnFocus, onClose}: {returnFocus?: HTMLElement | null; onClose: () => void}) {
  const titleId = useId();
  return <MuseumModal labelledBy={titleId} returnFocus={returnFocus} onClose={onClose}>
    <div className="museum-overlay-head"><div><p className="eyebrow">Controls & access</p><h2 id={titleId}>Explore at your pace</h2></div><button className="museum-icon-button" type="button" onClick={onClose} aria-label="Close Museum help"><X/></button></div>
    <div className="museum-help-grid">
      <section><h3>Keyboard & mouse</h3><p>Choose Enter museum, then use W A S D or the arrow keys. Look with the mouse. Press E or Enter near an exhibit, R to reset, and M for the directory. Escape releases mouse capture; in drag-look it pauses. Pause visit always pauses explicitly.</p></section>
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
    <div className="museum-fallback-halls">{MUSEUM_HALLS.map((hall) => <section key={hall.id}>
      <p className="eyebrow">{hall.galleryNumber} · {hall.period}</p><h2>{hall.title}</h2><p>{hall.description}</p>
      <DirectoryContents route={route} hallId={hall.id} href={href} push={push} showSummaries exhibitOrigin="paused-hall"/>
    </section>)}</div>
  </div>;
}

export function MuseumPage({route, href, push, replace}: {
  route: MuseumRoute;
  href: RouteHref;
  push: RouteNavigator;
  replace: RouteNavigator;
}) {
  const [activeHallId, setActiveHallId] = useState<MuseumHallId>(route.hallId);
  const registration = getMuseumHallRegistration(activeHallId);
  if (!registration) throw new Error(`Museum hall ${route.hallId} is not registered in the persistent world.`);
  const hall = getMuseumHallCatalog(activeHallId)!;
  const definition = registration.definition;
  const layout = definition.layout;
  const exhibit = route.hallId === activeHallId && route.exhibitId ? getMuseumExhibitCatalog(activeHallId, route.exhibitId) : undefined;
  const content = useMemo(() => exhibit ? getMuseumInterpretation({hallId: activeHallId, exhibitId: exhibit.id}) : undefined, [activeHallId, exhibit]);
  const visitContext = route.hallId === activeHallId && route.exhibitId
    ? parseMuseumExhibitVisitContext(window.history.state, route.hallId) ?? directMuseumVisitContext(route.hallId)
    : undefined;
  const guided = visitContext?.origin === 'guided';
  const experienceRootRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const sceneCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayOpenerRef = useRef<HTMLElement | null>(null);
  const controlsRef = useRef<MuseumControls | null>(null);
  const poseRef = useRef<MuseumPose>((() => {
    const session = loadMuseumSession(layout);
    const marker = parseMuseumExhibitVisitContext(window.history.state, route.hallId);
    if (session && (!route.exhibitId || marker)) {
      return {x: session.x, z: session.z, yaw: session.yaw, pitch: session.pitch};
    }
    const directViewpoint = route.exhibitId
      ? layout.exhibits.find(({id}) => id === route.exhibitId)?.viewpoint
      : undefined;
    return {...(directViewpoint ?? layout.spawn)};
  })());
  const activeHallIdRef = useRef<MuseumHallId>(activeHallId);
  const activeDefinitionRef = useRef(definition);
  activeHallIdRef.current = activeHallId;
  activeDefinitionRef.current = definition;
  const nearbyRef = useRef<MuseumExhibitRef | undefined>(undefined);
  const lastAnnouncedNearbyRef = useRef<MuseumExhibitRef | undefined>(undefined);
  const lastExhibitContextRef = useRef<MuseumExhibitVisitContext | undefined>(visitContext);
  const pendingCloseRef = useRef<{
    context: MuseumExhibitVisitContext;
    trigger: MuseumExitTrigger;
  } | undefined>(undefined);
  const pendingCrossHallCloseRef = useRef<{
    context: MuseumExhibitVisitContext;
    trigger: MuseumExitTrigger;
  } | undefined>(undefined);
  const previousRouteExhibitRef = useRef(route.exhibitId);
  const previousHallIdRef = useRef(route.hallId);
  const pendingHallTransitionRef = useRef<{sourceHallId: MuseumHallId; targetHallId: MuseumHallId} | undefined>(undefined);
  const preparedHallIdsRef = useRef<Set<MuseumHallId>>(new Set());
  const renderedHallIdsRef = useRef<Set<MuseumHallId>>(new Set());
  const readyHallIdsRef = useRef<Set<MuseumHallId>>(new Set());
  const failedHallContentIdsRef = useRef<Set<MuseumHallId>>(new Set());
  const retryingHallIdsRef = useRef<Set<MuseumHallId>>(new Set());
  const hallLoadPromiseRef = useRef<Map<MuseumHallId, Promise<void>>>(new Map());
  const hallRenderWaiterRef = useRef<Map<MuseumHallId, HallRenderWaiter>>(new Map());
  const lastSavedHallSignatureRef = useRef<Map<MuseumHallId, string>>(new Map());
  if (visitContext) lastExhibitContextRef.current = visitContext;
  const [nearbyReference, setNearbyReference] = useState<MuseumExhibitRef | undefined>();
  const nearbyId = nearbyReference?.hallId === activeHallId ? nearbyReference.exhibitId : undefined;
  const [readyHallIds, setReadyHallIds] = useState<Set<MuseumHallId>>(() => new Set());
  const [hallLoadStatus, setHallLoadStatus] = useState<Partial<Record<MuseumHallId, 'idle' | 'loading' | 'ready' | 'failed'>>>({[route.hallId]: 'idle'});
  const [hallLoadErrors, setHallLoadErrors] = useState<Partial<Record<MuseumHallId, string>>>({});
  const [hallContentEpochs, setHallContentEpochs] = useState<Partial<Record<MuseumHallId, number>>>({});
  const [announcement, setAnnouncement] = useState('');
  const [visitPhase, setVisitPhase] = useState<MuseumVisitPhase>(route.exhibitId ? 'explicitly-paused' : 'unentered');
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [sceneError, setSceneError] = useState<unknown>(() => hasWebGL() ? null : new Error('WebGL is unavailable.'));
  const hadSceneErrorRef = useRef(Boolean(sceneError));
  const previousModalOpenRef = useRef(false);
  const [sceneEpoch, setSceneEpoch] = useState(0);
  const [poseRevision, setPoseRevision] = useState(0);
  const LazyMuseumWorldScene = useMemo(createLazyMuseumWorldScene, [sceneEpoch]);
  const reducedMotion = useReducedMotion();
  const modalOpen = Boolean(exhibit || overlay);
  const blocked = modalOpen || Boolean(sceneError);
  const exploring = visitPhase === 'active';
  const focusSuspended = visitPhase === 'focus-suspended';
  const activeIntent = museumPhaseHasActiveIntent(visitPhase);

  const saveCurrentHallSession = useCallback(() => {
    const currentDefinition = activeDefinitionRef.current;
    const currentNearby = nearbyRef.current;
    const pose = poseRef.current;
    const nearbyId = currentNearby?.hallId === currentDefinition.id ? currentNearby.exhibitId : undefined;
    const signature = `${pose.x}|${pose.z}|${pose.yaw}|${pose.pitch}|${nearbyId ?? ''}`;
    if (lastSavedHallSignatureRef.current.get(currentDefinition.id) === signature) return;
    if (saveMuseumSession(
      currentDefinition.layout,
      pose,
      nearbyId,
    )) lastSavedHallSignatureRef.current.set(currentDefinition.id, signature);
  }, []);

  const handleSceneError = useCallback((error: unknown) => {
    controlsRef.current?.blockInput();
    setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'scene-error'));
    setSceneError(error);
  }, []);

  const waitForHallRender = useCallback((hallId: MuseumHallId): Promise<void> => {
    if (renderedHallIdsRef.current.has(hallId)) return Promise.resolve();
    const existing = hallRenderWaiterRef.current.get(hallId);
    if (existing) return existing.promise;
    let resolve!: () => void;
    let reject!: (error: unknown) => void;
    const promise = new Promise<void>((onResolve, onReject) => {
      resolve = onResolve;
      reject = onReject;
    });
    hallRenderWaiterRef.current.set(hallId, {promise, resolve, reject});
    return promise;
  }, []);

  const warmHallRemainder = useCallback((hallId: MuseumHallId) => {
    const warm = () => {
      const connection = (navigator as Navigator & {connection?: {saveData?: boolean; effectiveType?: string}}).connection;
      if (document.hidden || connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') return;
      void prefetchMuseumHallRemainder(hallId).catch(() => {
        setAnnouncement(`The ${getMuseumHallCatalog(hallId)?.title ?? 'adjacent gallery'} is open; some object images will use documented fallbacks.`);
      });
    };
    if ('requestIdleCallback' in window) window.requestIdleCallback(warm, {timeout: 2400});
    else globalThis.setTimeout(warm, 250);
  }, []);

  const hallIsResident = useCallback((hallId: MuseumHallId) => {
    const activeDefinition = activeDefinitionRef.current;
    return activeDefinition.id === hallId || activeDefinition.prefetch.adjacentHallIds.includes(hallId);
  }, []);

  const markHallCrossable = useCallback((hallId: MuseumHallId) => {
    if (
      failedHallContentIdsRef.current.has(hallId)
      || !preparedHallIdsRef.current.has(hallId)
      || !renderedHallIdsRef.current.has(hallId)
      || readyHallIdsRef.current.has(hallId)
    ) return;
    readyHallIdsRef.current = new Set(readyHallIdsRef.current).add(hallId);
    setReadyHallIds(new Set(readyHallIdsRef.current));
    setHallLoadStatus((current) => ({...current, [hallId]: 'ready'}));
    if (retryingHallIdsRef.current.delete(hallId)) {
      setAnnouncement(`${getMuseumHallCatalog(hallId)?.title ?? 'The gallery'} is ready.`);
    }
    warmHallRemainder(hallId);
  }, [warmHallRemainder]);

  const ensureHallEntry = useCallback((hallId: MuseumHallId): Promise<void> => {
    if (failedHallContentIdsRef.current.has(hallId)) {
      return Promise.reject(new Error('The gallery renderer must be retried before this hall can reopen.'));
    }
    if (readyHallIdsRef.current.has(hallId)) return Promise.resolve();
    const pending = hallLoadPromiseRef.current.get(hallId);
    if (pending) return pending;
    setHallLoadStatus((current) => ({...current, [hallId]: 'loading'}));
    setHallLoadErrors((current) => ({...current, [hallId]: undefined}));
    const promise = prefetchMuseumHallEntry(hallId).then(() => {
      preparedHallIdsRef.current = new Set(preparedHallIdsRef.current).add(hallId);
      if (!hallIsResident(hallId)) throw new MuseumHallResidencyError(hallId);
      return waitForHallRender(hallId);
    }).then(() => {
      if (!preparedHallIdsRef.current.has(hallId) || !renderedHallIdsRef.current.has(hallId)) {
        throw new MuseumHallResidencyError(hallId);
      }
      markHallCrossable(hallId);
    }).catch((error: unknown) => {
      if (error instanceof MuseumHallResidencyError) {
        setHallLoadStatus((current) => failedHallContentIdsRef.current.has(hallId)
          ? current
          : {...current, [hallId]: 'idle'});
        throw error;
      }
      const message = error instanceof Error ? error.message : 'The gallery could not be prepared.';
      const wasRetrying = retryingHallIdsRef.current.delete(hallId);
      setHallLoadStatus((current) => ({...current, [hallId]: 'failed'}));
      setHallLoadErrors((current) => ({...current, [hallId]: message}));
      if (wasRetrying) setAnnouncement(`${getMuseumHallCatalog(hallId)?.title ?? 'The gallery'} retry failed.`);
      throw error;
    }).finally(() => {
      hallLoadPromiseRef.current.delete(hallId);
    });
    hallLoadPromiseRef.current.set(hallId, promise);
    return promise;
  }, [hallIsResident, markHallCrossable, waitForHallRender]);

  const handleHallContentReady = useCallback((hallId: MuseumHallId) => {
    renderedHallIdsRef.current = new Set(renderedHallIdsRef.current).add(hallId);
    const waiter = hallRenderWaiterRef.current.get(hallId);
    if (waiter) {
      hallRenderWaiterRef.current.delete(hallId);
      waiter.resolve();
    }
    markHallCrossable(hallId);
  }, [markHallCrossable]);

  const handleHallContentUnavailable = useCallback((hallId: MuseumHallId) => {
    renderedHallIdsRef.current = new Set([...renderedHallIdsRef.current].filter((id) => id !== hallId));
    readyHallIdsRef.current = new Set([...readyHallIdsRef.current].filter((id) => id !== hallId));
    setReadyHallIds(new Set(readyHallIdsRef.current));
    setHallLoadStatus((current) => failedHallContentIdsRef.current.has(hallId)
      ? current
      : {...current, [hallId]: 'idle'});
    const waiter = hallRenderWaiterRef.current.get(hallId);
    if (waiter) {
      hallRenderWaiterRef.current.delete(hallId);
      waiter.reject(new MuseumHallResidencyError(hallId));
    }
  }, []);

  const retryHallContent = useCallback((hallId: MuseumHallId) => {
    failedHallContentIdsRef.current.delete(hallId);
    retryingHallIdsRef.current.add(hallId);
    setAnnouncement(`Retrying ${getMuseumHallCatalog(hallId)?.title ?? 'the gallery'}…`);
    readyHallIdsRef.current = new Set([...readyHallIdsRef.current].filter((id) => id !== hallId));
    renderedHallIdsRef.current = new Set([...renderedHallIdsRef.current].filter((id) => id !== hallId));
    setReadyHallIds(new Set(readyHallIdsRef.current));
    setHallContentEpochs((current) => ({...current, [hallId]: (current[hallId] ?? 0) + 1}));
    setHallLoadStatus((current) => ({...current, [hallId]: 'idle'}));
    window.requestAnimationFrame(() => document.getElementById('museum-title')?.focus({preventScroll: true}));
    void ensureHallEntry(hallId).catch(() => undefined);
  }, [ensureHallEntry]);

  const handleHallContentError = useCallback((hallId: MuseumHallId, error: unknown) => {
    failedHallContentIdsRef.current.add(hallId);
    readyHallIdsRef.current = new Set([...readyHallIdsRef.current].filter((id) => id !== hallId));
    setReadyHallIds(new Set(readyHallIdsRef.current));
    setHallLoadStatus((current) => ({...current, [hallId]: 'failed'}));
    setHallLoadErrors((current) => ({...current, [hallId]: error instanceof Error ? error.message : 'The gallery content could not be rendered.'}));
    const waiter = hallRenderWaiterRef.current.get(hallId);
    if (waiter) {
      hallRenderWaiterRef.current.delete(hallId);
      waiter.reject(error);
    }
    if (hallId === activeHallIdRef.current) {
      controlsRef.current?.pauseExploring();
      setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'scene-error'));
    }
  }, []);

  const openExhibit = useCallback((id: MuseumExhibitId) => {
    const origin: MuseumExhibitOrigin = museumPhaseHasActiveIntent(visitPhase) ? 'active-exploration' : 'paused-hall';
    const currentDefinition = activeDefinitionRef.current;
    const context = createMuseumExhibitVisitContext(currentDefinition.id, origin);
    controlsRef.current?.blockInput();
    saveCurrentHallSession();
    lastExhibitContextRef.current = context;
    push({kind: 'museum', hallId: currentDefinition.id, exhibitId: id}, {
      state: museumHistoryStateWithVisitContext(window.history.state, context),
    });
  }, [push, saveCurrentHallSession, visitPhase]);

  const resetPosition = useCallback(() => {
    controlsRef.current?.pauseExploring();
    removeMuseumSession(activeHallId);
    poseRef.current = {...layout.reset};
    setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'explicit-pause'));
    setPoseRevision((value) => value + 1);
  }, [activeHallId, layout]);

  const controls = useMuseumControls({
    active: exploring,
    suspended: focusSuspended,
    blocked,
    nearbyExhibitId: nearbyId,
    onInteract: openExhibit,
    onReset: resetPosition,
    onOpenDirectory: () => {
      overlayOpenerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : sceneCanvasRef.current;
      controlsRef.current?.pauseExploring();
      setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'explicit-pause'));
      setOverlay('directory');
    },
    onPause: () => setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'explicit-pause')),
    onSuspend: () => setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'focus-lost')),
    onReactivate: () => setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'scene-reactivate')),
  });
  controlsRef.current = controls;

  const experience = useMuseumExperienceMode({
    experienceRootRef,
    shortcutBlocked: blocked,
  });

  const activateHall = useCallback((hallId: MuseumHallId, pose?: MuseumPose) => {
    const targetRegistration = getMuseumHallRegistration(hallId);
    if (!targetRegistration) return;
    if (hallId !== activeHallIdRef.current) saveCurrentHallSession();
    const targetLayout = targetRegistration.definition.layout;
    const session = pose ? undefined : loadMuseumSession(targetLayout);
    const targetPose = pose
      ?? (session ? {x: session.x, z: session.z, yaw: session.yaw, pitch: session.pitch} : undefined)
      ?? targetLayout.spawn;
    activeHallIdRef.current = hallId;
    activeDefinitionRef.current = targetRegistration.definition;
    setActiveHallId(hallId);
    poseRef.current = {...targetPose};
    nearbyRef.current = undefined;
    setNearbyReference(undefined);
    controlsRef.current?.pauseExploring();
    setVisitPhase('explicitly-paused');
    setOverlay(null);
    setPoseRevision((value) => value + 1);
    void ensureHallEntry(hallId).catch(() => undefined);
  }, [ensureHallEntry, saveCurrentHallSession]);

  const visitHallFromDirectory = useCallback((hallId: MuseumHallId) => {
    activateHall(hallId);
    push(
      {kind: 'museum', hallId},
      {state: museumHistoryStateWithVisitContext(window.history.state, undefined)},
    );
  }, [activateHall, push]);

  const stageZoneViewpoint = useCallback((hallId: MuseumHallId, zoneId: string) => {
    const targetRegistration = getMuseumHallRegistration(hallId);
    const targetHall = getMuseumHallCatalog(hallId);
    if (!targetRegistration || !targetHall) return;
    const exhibitIds = new Set(targetHall.exhibits.filter((item) => item.zoneId === zoneId).map(({id}) => id));
    const view = targetRegistration.definition.layout.entryViews.find((item) => item.expectedVisibleExhibitIds.some((id) => exhibitIds.has(id)));
    if (!view) return;
    activateHall(hallId, view.pose);
    saveMuseumSession(targetRegistration.definition.layout, view.pose);
    push(
      {kind: 'museum', hallId},
      {state: museumHistoryStateWithVisitContext(window.history.state, undefined)},
    );
  }, [activateHall, push]);

  const handleHallTransition = useCallback((connection: MuseumHallConnection) => {
    const source = activeDefinitionRef.current;
    const targetRegistration = getMuseumHallRegistration(connection.targetHallId);
    if (!targetRegistration) {
      setAnnouncement('The connected gallery is not registered in this Museum build.');
      return;
    }
    const sourcePose = {...poseRef.current};
    const arrival = resolveMuseumHallArrival(source, targetRegistration.definition, connection.targetEntranceId, sourcePose);
    if (!arrival) {
      setAnnouncement('The connected gallery entrance could not be resolved.');
      return;
    }
    const sourceNearby = nearbyRef.current;
    saveMuseumSession(source.layout, sourcePose, sourceNearby?.hallId === source.id ? sourceNearby.exhibitId : undefined);
    poseRef.current = arrival;
    saveMuseumSession(targetRegistration.definition.layout, arrival);
    pendingHallTransitionRef.current = {sourceHallId: source.id, targetHallId: connection.targetHallId};
    activeHallIdRef.current = connection.targetHallId;
    activeDefinitionRef.current = targetRegistration.definition;
    setActiveHallId(connection.targetHallId);
    nearbyRef.current = undefined;
    setNearbyReference(undefined);
    setOverlay(null);
    setAnnouncement(`Entered ${getMuseumHallCatalog(connection.targetHallId)?.title}.`);
    setPoseRevision((value) => value + 1);
    replace(
      {kind: 'museum', hallId: connection.targetHallId},
      {state: museumHistoryStateWithVisitContext(window.history.state, undefined)},
    );
  }, [replace]);

  const handleHallTransitionBlocked = useCallback((connection: MuseumHallConnection) => {
    const target = getMuseumHallCatalog(connection.targetHallId);
    const status = hallLoadStatus[connection.targetHallId];
    setAnnouncement(status === 'failed'
      ? `${target?.title ?? 'The connected gallery'} could not be prepared. Use the visible Retry control.`
      : `Preparing ${target?.title ?? 'the connected gallery'} before you cross…`);
    void ensureHallEntry(connection.targetHallId).catch(() => undefined);
  }, [ensureHallEntry, hallLoadStatus]);

  const stageExhibitViewpoint = useCallback((reference: MuseumExhibitRef) => {
    const targetRegistration = getMuseumHallRegistration(reference.hallId);
    const viewpoint = targetRegistration?.definition.layout.exhibits.find((item) => item.id === reference.exhibitId)?.viewpoint;
    if (!viewpoint) return;
    if (reference.hallId !== activeHallIdRef.current) saveCurrentHallSession();
    if (!targetRegistration) return;
    activeHallIdRef.current = reference.hallId;
    activeDefinitionRef.current = targetRegistration.definition;
    setActiveHallId(reference.hallId);
    poseRef.current = {...viewpoint};
    nearbyRef.current = reference;
    setNearbyReference(reference);
    saveMuseumSession(targetRegistration.definition.layout, poseRef.current, reference.exhibitId);
    setPoseRevision((value) => value + 1);
  }, [saveCurrentHallSession]);

  const pauseAndOpen = (next: Exclude<Overlay, null>) => {
    overlayOpenerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : sceneCanvasRef.current;
    controls.pauseExploring();
    setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'explicit-pause'));
    setOverlay(next);
  };
  const beginExploring = () => {
    if (sceneError || hallLoadStatus[activeHallId] !== 'ready') return;
    setOverlay(null);
    setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'enter'));
    controls.beginExploring();
  };
  const closeExhibit = (trigger: MuseumExitTrigger) => {
    const context = visitContext ?? directMuseumVisitContext(activeHallId);
    const policy = resolveMuseumExitPolicy(context, trigger);
    const resumeStrategy = resolveMuseumCloseResumeStrategy(context, trigger);
    pendingCloseRef.current = {context, trigger};
    lastExhibitContextRef.current = context;
    if (resumeStrategy === 'request-pointer-lock') {
      controls.requestOverlayCloseResume();
    }
    if (policy.navigation === 'back') window.history.back();
    else replace(
      {kind: 'museum', hallId: activeHallId},
      {state: museumHistoryStateWithVisitContext(window.history.state, undefined)},
    );
  };

  const goGuided = (index: number, replaceCurrent = false) => {
    const id = hall.guidedOrder[index];
    const viewpoint = layout.exhibits.find((item) => item.id === id)?.viewpoint;
    if (!id || !viewpoint) return;
    controls.pauseExploring();
    setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'explicit-pause'));
    poseRef.current = {...viewpoint};
    saveMuseumSession(layout, poseRef.current, id);
    setPoseRevision((value) => value + 1);
    setOverlay(null);
    const target = {kind: 'museum' as const, hallId: activeHallId, exhibitId: id};
    const context = createMuseumExhibitVisitContext(activeHallId, 'guided');
    lastExhibitContextRef.current = context;
    const state = museumHistoryStateWithVisitContext(window.history.state, context);
    if (replaceCurrent) replace(target, {state}); else push(target, {state});
  };

  const retryScene = () => {
    setSceneError(null);
    setSceneEpoch((value) => value + 1);
    window.requestAnimationFrame(() => document.getElementById('museum-enter-button')?.focus({preventScroll: true}));
  };

  useEffect(() => {
    sceneCanvasRef.current?.setAttribute('aria-label', `Walkable ${hall.title}, connected to the Philosophy Atlas Museum`);
  }, [hall.title]);

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
    if (route.exhibitId || modalOpen || activeIntent || previousRouteExhibitRef.current) return;
    const frame = window.requestAnimationFrame(() => {
      const target = sceneError
        ? document.getElementById('museum-fallback-title')
        : document.getElementById('museum-title');
      target?.focus({preventScroll: true});
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeIntent, modalOpen, route.exhibitId, sceneError]);

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
    const previous = previousRouteExhibitRef.current;
    if (previous === route.exhibitId) return;
    previousRouteExhibitRef.current = route.exhibitId;
    if (route.exhibitId) {
      lastExhibitContextRef.current = visitContext ?? directMuseumVisitContext(route.hallId);
      controlsRef.current?.blockInput();
      if (lastExhibitContextRef.current.origin !== 'active-exploration') setVisitPhase('explicitly-paused');
      setOverlay(null);
      return;
    }
    if (!previous) return;

    const pending = pendingCloseRef.current;
    const context = pending?.context
      ?? lastExhibitContextRef.current
      ?? directMuseumVisitContext(route.hallId);
    pendingCloseRef.current = undefined;
    const trigger = pending?.trigger ?? 'history';
    if (previousHallIdRef.current !== route.hallId) {
      pendingCrossHallCloseRef.current = {context, trigger};
      return;
    }
    const policy = resolveMuseumExitPolicy(context, trigger);
    const resumeStrategy = resolveMuseumCloseResumeStrategy(context, trigger);
    if (policy.resumeExploration) {
      setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'resume-active-origin'));
      setOverlay(null);
      if (resumeStrategy === 'request-pointer-lock') controlsRef.current?.completeOverlayCloseResume();
      else controlsRef.current?.resumeWithoutGesture();
    } else {
      controlsRef.current?.pauseExploring();
      setVisitPhase('explicitly-paused');
      setOverlay(policy.restoreDirectory ? 'directory' : null);
      if (!policy.restoreDirectory) {
        const frame = window.requestAnimationFrame(() => {
          const target = sceneError
            ? document.getElementById('museum-fallback-title')
            : document.getElementById('museum-enter-button');
          target?.focus({preventScroll: true});
        });
        return () => window.cancelAnimationFrame(frame);
      }
    }
  }, [route.exhibitId, route.hallId, sceneError, visitContext]);

  useEffect(() => {
    if (!route.exhibitId || parseMuseumExhibitVisitContext(window.history.state, route.hallId)) return;
    const direct = directMuseumVisitContext(route.hallId);
    lastExhibitContextRef.current = direct;
    window.history.replaceState(museumHistoryStateWithVisitContext(window.history.state, direct), '');
  }, [route.exhibitId, route.hallId]);

  useEffect(() => {
    if (previousHallIdRef.current === route.hallId) return;
    const previousRouteHallId = previousHallIdRef.current;
    previousHallIdRef.current = route.hallId;
    const pending = pendingHallTransitionRef.current;
    if (pending?.sourceHallId === previousRouteHallId && pending.targetHallId === route.hallId && activeHallIdRef.current === route.hallId) {
      pendingHallTransitionRef.current = undefined;
      return;
    }
    pendingHallTransitionRef.current = undefined;
    const targetRegistration = getMuseumHallRegistration(route.hallId);
    if (!targetRegistration) return;
    if (activeHallIdRef.current !== route.hallId) saveCurrentHallSession();
    const targetLayout = targetRegistration.definition.layout;
    const directViewpoint = route.exhibitId
      ? targetLayout.exhibits.find(({id}) => id === route.exhibitId)?.viewpoint
      : undefined;
    const session = directViewpoint ? undefined : loadMuseumSession(targetLayout);
    poseRef.current = directViewpoint
      ? {...directViewpoint}
      : session
        ? {x: session.x, z: session.z, yaw: session.yaw, pitch: session.pitch}
        : {...targetLayout.spawn};
    activeHallIdRef.current = route.hallId;
    activeDefinitionRef.current = targetRegistration.definition;
    setActiveHallId(route.hallId);
    nearbyRef.current = undefined;
    setNearbyReference(undefined);
    const crossHallClose = pendingCrossHallCloseRef.current;
    pendingCrossHallCloseRef.current = undefined;
    if (crossHallClose) {
      const policy = resolveMuseumExitPolicy(crossHallClose.context, crossHallClose.trigger);
      const resumeStrategy = resolveMuseumCloseResumeStrategy(crossHallClose.context, crossHallClose.trigger);
      if (policy.resumeExploration) {
        setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'resume-active-origin'));
        setOverlay(null);
        if (resumeStrategy === 'request-pointer-lock') controlsRef.current?.completeOverlayCloseResume();
        else controlsRef.current?.resumeWithoutGesture();
      } else {
        controlsRef.current?.pauseExploring();
        setVisitPhase('explicitly-paused');
        setOverlay(policy.restoreDirectory ? 'directory' : null);
        if (!policy.restoreDirectory) {
          window.requestAnimationFrame(() => document.getElementById('museum-enter-button')?.focus({preventScroll: true}));
        }
      }
    } else {
      controlsRef.current?.pauseExploring();
      setVisitPhase(route.exhibitId ? 'explicitly-paused' : 'unentered');
      setOverlay(null);
    }
    setPoseRevision((value) => value + 1);
    void ensureHallEntry(route.hallId).catch(() => undefined);
  }, [ensureHallEntry, route.exhibitId, route.hallId, saveCurrentHallSession]);

  useEffect(() => {
    void ensureHallEntry(activeHallId).catch(() => undefined);
  }, [activeHallId, ensureHallEntry]);

  useEffect(() => {
    definition.prefetch.adjacentHallIds.forEach((hallId) => void ensureHallEntry(hallId).catch(() => undefined));
  }, [definition.id, definition.prefetch.adjacentHallIds, ensureHallEntry]);

  useEffect(() => {
    if (!exploring) return;
    const timer = window.setInterval(saveCurrentHallSession, 500);
    return () => window.clearInterval(timer);
  }, [exploring, saveCurrentHallSession]);

  useEffect(() => () => {
    saveCurrentHallSession();
  }, [saveCurrentHallSession]);

  const nearby = nearbyId ? getMuseumExhibitCatalog(activeHallId, nearbyId) : undefined;
  const nearbyContent = useMemo(() => nearby ? getMuseumInterpretation({hallId: activeHallId, exhibitId: nearby.id}) : undefined, [activeHallId, nearby]);
  useEffect(() => {
    const reference = nearby ? {hallId: activeHallId, exhibitId: nearby.id} : undefined;
    if (!exploring || !nearby || (lastAnnouncedNearbyRef.current?.hallId === reference?.hallId && lastAnnouncedNearbyRef.current?.exhibitId === reference?.exhibitId)) return;
    const timer = window.setTimeout(() => {
      if (nearbyRef.current?.hallId !== activeHallId || nearbyRef.current.exhibitId !== nearby.id) return;
      lastAnnouncedNearbyRef.current = reference;
      setAnnouncement(`Near ${nearby.displayName}. Press E or Enter to open the exhibit.`);
    }, reducedMotion ? 0 : 650);
    return () => window.clearTimeout(timer);
  }, [activeHallId, exploring, nearby, reducedMotion]);

  const exhibitIndex = exhibit ? (hall.guidedOrder as readonly MuseumExhibitId[]).indexOf(exhibit.id) : -1;
  const residentHallIds = new Set<MuseumHallId>([activeHallId, ...definition.prefetch.adjacentHallIds]);
  const sceneRegistrations = MUSEUM_WORLD_REGISTRY.filter(({definition: item}) => residentHallIds.has(item.id));
  const activeHallLoadFailed = hallLoadStatus[activeHallId] === 'failed';
  const activeHallLoading = hallLoadStatus[activeHallId] === 'idle' || hallLoadStatus[activeHallId] === 'loading';
  const adjacentFailedHallIds = definition.prefetch.adjacentHallIds.filter((hallId) => hallLoadStatus[hallId] === 'failed');
  const adjacentLoadingHallIds = definition.prefetch.adjacentHallIds.filter((hallId) => hallLoadStatus[hallId] === 'loading');

  return <div
    ref={experienceRootRef}
    className="museum-page"
    data-immersive={experience.immersive ? 'true' : 'false'}
    data-fullscreen={experience.fullscreen ? 'true' : 'false'}
    data-exploring={exploring ? 'true' : 'false'}
  >
    <section className="museum-stage" data-exploring={exploring ? 'true' : 'false'} data-visit-phase={visitPhase} aria-describedby="museum-controls-description">
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
          <Suspense fallback={<div className="museum-load-chip" role="status">Preparing the walkable Museum…</div>}>
            <LazyMuseumWorldScene
              key={sceneEpoch}
              registrations={sceneRegistrations}
              readyHallIds={[...readyHallIds]}
              hallContentEpochs={hallContentEpochs}
              definition={definition}
              active={exploring}
              blocked={blocked}
              poseRevision={poseRevision}
              reducedMotion={reducedMotion}
              inputRef={controls.inputRef}
              poseRef={poseRef}
              onCanvasReady={(canvas) => {
                sceneCanvasRef.current = canvas;
                canvas.classList.add('museum-scene-canvas');
                canvas.setAttribute('role', 'img');
                canvas.setAttribute('aria-label', `Walkable ${hall.title}, connected to the Philosophy Atlas Museum`);
                canvas.setAttribute('aria-describedby', 'museum-controls-description');
                canvas.tabIndex = 0;
                controls.onCanvasReady(canvas);
              }}
              onNearbyChange={(reference) => {
                const typed = reference?.hallId === activeHallIdRef.current ? reference : undefined;
                nearbyRef.current = typed;
                setNearbyReference(typed);
              }}
              onSelectExhibit={(reference) => {
                if (reference.hallId === activeHallIdRef.current && !controls.shouldSuppressActivation()) openExhibit(reference.exhibitId);
              }}
              onHallTransition={handleHallTransition}
              onHallTransitionBlocked={handleHallTransitionBlocked}
              onHallContentReady={handleHallContentReady}
              onHallContentUnavailable={handleHallContentUnavailable}
              onHallContentError={handleHallContentError}
              onSceneGesture={controls.handleSceneGesture}
              onSceneError={handleSceneError}
            />
          </Suspense>
        </MuseumSceneBoundary>}

        <div className="museum-hud">
          <header className="museum-masthead" data-condensed={activeIntent ? 'true' : 'false'}>
            <p className="museum-masthead-kicker"><Landmark size={14}/> Philosophy Atlas Museum <span>{hall.galleryNumber}</span></p>
            <h1 id="museum-title" tabIndex={-1}>{hall.title}</h1>
            <p className="museum-masthead-period">{hall.period}</p>
            <p className="museum-masthead-sweep">{hall.sweep.map((item, index) => <span key={item}>{index > 0 && <i aria-hidden="true">→</i>}{item}</span>)}</p>
            <div className="museum-entry-row">
              {focusSuspended
                ? <button id="museum-enter-button" className="museum-enter-button" type="button" onClick={controls.handleSceneGesture}><DoorOpen size={17}/> Resume visit</button>
                : <button id="museum-enter-button" className="museum-enter-button" type="button" onClick={beginExploring} disabled={Boolean(sceneError) || activeHallLoading || activeHallLoadFailed}><DoorOpen size={17}/> {activeHallLoadFailed ? 'Gallery unavailable' : activeHallLoading ? 'Preparing gallery' : exploring ? 'Visit active' : visitPhase === 'explicitly-paused' ? 'Resume visit' : 'Enter museum'}</button>}
              <span>{activeIntent ? controls.mode.replace('-', ' ') : 'WASD · arrows · touch'}</span>
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

      {!modalOpen && experience.fullscreenError && <div className="museum-status-message" role="status"><span>{experience.fullscreenError}</span><button type="button" onClick={experience.clearError}>Dismiss</button></div>}
      {!modalOpen && activeHallLoading && !sceneError && <div className="museum-load-chip" role="status">Preparing {hall.title}…</div>}
      {!modalOpen && activeHallLoadFailed && <div className="museum-status-message museum-hall-load-error" role="alert"><span>{hall.title} could not finish loading. {hallLoadErrors[activeHallId]}</span><button type="button" onClick={() => retryHallContent(activeHallId)}>Retry gallery</button></div>}
      {!modalOpen && !activeHallLoadFailed && adjacentFailedHallIds.length > 0 && <div className="museum-status-message museum-adjacent-load-error" role="alert">
        <span>{adjacentFailedHallIds.length === 1 ? 'A connected gallery could not finish loading.' : `${adjacentFailedHallIds.length} connected galleries could not finish loading.`}</span>
        {adjacentFailedHallIds.map((hallId) => <button key={hallId} type="button" onClick={() => retryHallContent(hallId)}>Retry {getMuseumHallCatalog(hallId)?.title ?? 'connection'}</button>)}
      </div>}
      {!modalOpen && !activeHallLoadFailed && adjacentLoadingHallIds.length > 0 && <div className="museum-status-message museum-adjacent-load-status" role="status"><span>Preparing {adjacentLoadingHallIds.map((hallId) => getMuseumHallCatalog(hallId)?.title ?? 'an adjacent gallery').join(' and ')}…</span></div>}
      {!exhibit && overlay === 'directory' && <Directory
        route={route}
        href={href}
        push={push}
        returnFocus={overlayOpenerRef.current}
        onClose={() => setOverlay(null)}
        onGuidedStart={() => goGuided(0)}
        onHallActivate={visitHallFromDirectory}
        onExhibitViewpoint={stageExhibitViewpoint}
        onZoneViewpoint={stageZoneViewpoint}
      />}
      {!exhibit && overlay === 'help' && <Help returnFocus={overlayOpenerRef.current} onClose={() => setOverlay(null)}/>}
      {exhibit && content && <MuseumInterpretationPanel
        key={exhibit.id}
        exhibit={exhibit}
        content={content}
        href={href}
        guided={guided}
        exhibitIndex={exhibitIndex}
        exhibitCount={hall.guidedOrder.length}
        continueLabel={visitContext?.origin === 'active-exploration' ? 'Continue exploring' : 'Return to gallery'}
        focusReturn="none"
        onClose={closeExhibit}
        onArticleIntent={saveCurrentHallSession}
        onGuidedPrevious={() => goGuided(exhibitIndex - 1, true)}
        onGuidedNext={() => goGuided(exhibitIndex + 1, true)}
        onRelated={(reference, related, event) => {
          if (!isOrdinaryActivation(event)) return;
          event.preventDefault();
          const context = createMuseumExhibitVisitContext(reference.hallId, visitContext?.origin ?? 'direct');
          controls.blockInput();
          stageExhibitViewpoint(reference);
          lastExhibitContextRef.current = context;
          replace(
            {kind: 'museum', hallId: reference.hallId, exhibitId: related.id},
            {state: museumHistoryStateWithVisitContext(window.history.state, context)},
          );
        }}
      />}
    </section>
  </div>;
}
