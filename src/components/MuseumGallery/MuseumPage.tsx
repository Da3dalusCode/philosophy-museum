import {
  DoorOpen,
  Info,
  Landmark,
  Map as MapIcon,
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
  type MouseEvent,
  type ReactNode,
} from 'react';
import type {
  MuseumDirectedConnection,
  MuseumExhibitRef,
  MuseumHallLayout,
  MuseumPose,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitRef,
} from '../../data/museum/museumWorldTypes';
import {
  getMuseumConnectionTargetHallId,
  getMuseumRuntimeHallNode,
  getMuseumRuntimeNode,
} from '../../data/museum/museumBuildingRuntime';
import {getMuseumInterpretation} from '../../data/museum/museumInterpretations';
import {
  findMuseumSupplementalExhibit,
  findMuseumSupplementalExhibitEntry,
  getMuseumGuidedStops,
  getMuseumSupplementalExhibitsForHall,
  MUSEUM_SUPPLEMENTAL_EXHIBITS,
  type MuseumSupplementalExhibitEntry,
} from '../../data/museum/museumSupplementalExhibits';
import {
  getMuseumVisitorMapNode,
  MUSEUM_VISITOR_MAP_KIOSK,
  resolveMuseumVisitorMapDestination,
} from '../../data/museum/museumVisitorMap';
import {
  getMuseumExhibitCatalog,
  getMuseumHallCatalog,
  MUSEUM_HALLS,
  MUSEUM_PLANNED_HALL_TITLES,
  type MuseumExhibitCatalog,
  type MuseumExhibitId,
  type MuseumPublicHallId as MuseumHallId,
} from '../../data/museumCatalog';
import type {
  MuseumRoute,
  MuseumRouteExhibitId,
  NavigableAppRoute,
  RouteHref,
  RouteNavigator,
} from '../../routing/routes';
import {isRouteLoadError} from '../../routing/routeLoadErrors';
import {MuseumInterpretationPanel} from './MuseumInterpretationPanel';
import {MuseumSupplementalInterpretationPanel} from './MuseumSupplementalInterpretationPanel';
import {MuseumModal} from './MuseumModal';
import {MuseumTouchControls} from './MuseumTouchControls';
import {MuseumVisitorMap} from './MuseumVisitorMap';
import type {MuseumWalkingPace} from './museumMovement';
import {loadMuseumSession, removeMuseumSession, saveMuseumSession} from './museumSession';
import {useMuseumControls, type MuseumControls} from './useMuseumControls';
import {useMuseumExperienceMode} from './useMuseumExperienceMode';
import {resolveMuseumHallResidency} from './museumResidency';

import {
  museumHallEntryReadinessKey,
  museumHallReadinessKeyBelongsTo,
  resolveMuseumOrientationReset,
  type MuseumHallApproach,
  type MuseumHallLoadStatus,
  type MuseumNodeTransition,
} from './museumRuntime';
import {
  getMuseumHallRegistration,
  MUSEUM_WORLD_REGISTRY,
  prefetchMuseumHallEntry,
  prefetchMuseumHallRemainder,
} from './museumWorldRegistry';
import {
  createMuseumHallTravelContext,
  createMuseumExhibitVisitContext,
  directMuseumVisitContext,
  museumHistoryStateWithHallTravelContext,
  museumHistoryStateWithVisitContext,
  museumPhaseHasActiveIntent,
  parseMuseumHallTravelContext,
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

type Overlay = 'directory' | 'help' | 'visitor-map' | null;

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

const museumRouteViewpoint = (
  layout: MuseumHallLayout,
  exhibitId: MuseumRouteExhibitId | undefined,
): MuseumPose | undefined => exhibitId
  ? layout.exhibits.find(({id}) => id === exhibitId)?.viewpoint
    ?? layout.supplementalExhibits?.find(({id}) => id === exhibitId)?.viewpoint
  : undefined;

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

function SupplementalExhibitRouteLink({route, entry, href, push, origin, onActivate, current, children}: {
  route: MuseumRoute;
  entry: MuseumSupplementalExhibitEntry;
  href: RouteHref;
  push: RouteNavigator;
  origin: MuseumExhibitOrigin;
  onActivate?: (reference: MuseumSupplementalExhibitRef) => void;
  current?: boolean;
  children: ReactNode;
}) {
  const target = {kind: 'museum' as const, hallId: route.hallId, exhibitId: entry.exhibit.id};
  return <a className="btn btn-primary" href={href(target)} aria-current={current ? 'page' : undefined} onClick={(event) => {
    if (!isOrdinaryActivation(event)) return;
    event.preventDefault();
    onActivate?.({hallId: route.hallId, supplementalExhibitId: entry.exhibit.id});
    push(target, {state: museumHistoryStateWithVisitContext(
      window.history.state,
      createMuseumExhibitVisitContext(route.hallId, origin),
    )});
  }}>{children}</a>;
}

function DirectoryContents({route, hallId = route.hallId, href, push, onExhibitActivate, onSupplementalActivate, onZoneActivate, showSummaries = false, exhibitOrigin = 'direct'}: {
  route: MuseumRoute;
  hallId?: MuseumHallId;
  href: RouteHref;
  push: RouteNavigator;
  onExhibitActivate?: (reference: MuseumExhibitRef) => void;
  onSupplementalActivate?: (reference: MuseumSupplementalExhibitRef) => void;
  onZoneActivate?: (hallId: MuseumHallId, zoneId: string) => void;
  showSummaries?: boolean;
  exhibitOrigin?: MuseumExhibitOrigin;
}) {
  const hall = getMuseumHallCatalog(hallId)!;
  const supplementalEntries = getMuseumSupplementalExhibitsForHall(hallId);
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
      })}
      {supplementalEntries.filter(({layout}) => layout.zoneId === zone.id).map((entry) => {
        const {exhibit: item} = entry;
        const current = route.hallId === hallId && route.exhibitId === item.id;
        return <li key={item.id} className={current ? 'is-current' : ''} data-entity-kind={item.presentation?.entityKind ?? 'philosopher'} data-supplemental-id={item.id}>
          <div><b>{item.displayName}</b><span>Work / context exhibit</span></div>
          {current && <strong className="museum-current-label">Currently open</strong>}
          <p>{showSummaries ? item.lead : item.question}</p>
          <div className="museum-directory-actions">
            <SupplementalExhibitRouteLink
              route={hallRoute}
              entry={entry}
              href={href}
              push={push}
              origin={exhibitOrigin}
              onActivate={onSupplementalActivate}
              current={current}
            >View exhibit</SupplementalExhibitRouteLink>
            <a className="btn" href={href(item.articleRoute)}>Open full article</a>
          </div>
        </li>;
      })}</ul>
      {zone.comparativeLenses && zone.comparativeLenses.length > 0 && <aside className="museum-comparative-lenses" aria-label={`${zone.title} comparative lenses`}>
        <div><p className="eyebrow">Named historical and cultural lenses</p><p>Comparison only: each thinker remains primary in the intellectual world named below.</p></div>
        <ul>{zone.comparativeLenses.map((lens) => <li key={lens.id}>
          <div><b>{lens.displayName}</b><span>{lens.culturalSetting}</span></div>
          <p>{lens.rationale}</p>
          <p className="museum-comparative-lens-route">Primary route: {MUSEUM_PLANNED_HALL_TITLES[lens.primaryHallId]}</p>
          <a className="btn" href={href({kind: 'philosopher', philosopherId: lens.entityId})}>Open Atlas article</a>
        </li>)}</ul>
      </aside>}
      {onZoneActivate && <button className="btn museum-zone-view-button" type="button" onClick={() => onZoneActivate(hallId, zone.id)}>View this room entrance</button>}
    </section>)}
  </div>;
}

function Directory({route, href, push, returnFocus, onClose, onGuidedStart, onHallActivate, onExhibitViewpoint, onSupplementalViewpoint, onZoneViewpoint}: {
  route: MuseumRoute;
  href: RouteHref;
  push: RouteNavigator;
  returnFocus?: HTMLElement | null;
  onClose: () => void;
  onGuidedStart: () => void;
  onHallActivate: (hallId: MuseumHallId) => void;
  onExhibitViewpoint: (reference: MuseumExhibitRef) => void;
  onSupplementalViewpoint: (reference: MuseumSupplementalExhibitRef) => void;
  onZoneViewpoint: (hallId: MuseumHallId, zoneId: string) => void;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const [selectedHallId, setSelectedHallId] = useState<MuseumHallId>(route.hallId);
  const selectedHall = getMuseumHallCatalog(selectedHallId)!;
  return <MuseumModal labelledBy={titleId} describedBy={descriptionId} returnFocus={returnFocus} onClose={onClose}>
    <div className="museum-overlay-head">
      <div><p className="eyebrow">Museum directory</p><h2 id={titleId}>{MUSEUM_HALLS.length} connected galleries · {MUSEUM_HALLS.reduce((total, hall) => total + hall.exhibits.length, 0) + MUSEUM_SUPPLEMENTAL_EXHIBITS.length} interpreted stops</h2></div>
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
    }} onSupplementalActivate={(reference) => {
      onSupplementalViewpoint(reference);
      onClose();
    }}/>
  </MuseumModal>;
}

function Help({returnFocus, onClose, walkingPace, onWalkingPaceChange}: {
  returnFocus?: HTMLElement | null;
  onClose: () => void;
  walkingPace: MuseumWalkingPace;
  onWalkingPaceChange: (pace: MuseumWalkingPace) => void;
}) {
  const titleId = useId();
  return <MuseumModal labelledBy={titleId} returnFocus={returnFocus} onClose={onClose}>
    <div className="museum-overlay-head"><div><p className="eyebrow">Controls & access</p><h2 id={titleId}>Explore at your pace</h2></div><button className="museum-icon-button" type="button" onClick={onClose} aria-label="Close Museum help"><X/></button></div>
    <div className="museum-help-grid">
      <section><h3>Keyboard & mouse</h3><p>Choose Enter museum, then use W A S D or the arrow keys. Hold Shift while moving for a temporary faster pace. Look with the mouse. Press E or Enter near an exhibit, R to reset, and M for the visitor map. Escape releases mouse capture; in drag-look it pauses. The Directory remains click-only because D is a movement key.</p></section>
      <section><h3>Immersive viewing</h3><p>Immersive mode hides Atlas chrome. Fullscreen uses the browser’s real Fullscreen API; press F when no panel is open. Native Escape exits browser fullscreen.</p></section>
      <section><h3>Touch</h3><p>Use the left movement control and separate right look area. The Speed button switches between Standard and Fast. A contextual Interact action appears when an exhibit is near.</p></section>
      <section><h3>Without free movement</h3><p>The directory contains every exhibit and native article link. Guided mode moves between safe viewpoints without requiring manual movement.</p></section>
      <fieldset className="museum-walking-pace">
        <legend>Preferred walking speed</legend>
        <label><input type="radio" name="museum-walking-pace" value="standard" checked={walkingPace === 'standard'} onChange={() => onWalkingPaceChange('standard')}/> Standard</label>
        <label><input type="radio" name="museum-walking-pace" value="fast" checked={walkingPace === 'fast'} onChange={() => onWalkingPaceChange('fast')}/> Fast</label>
        <p>Fast is useful for long corridors and remains bounded by the same collision checks. Shift temporarily uses Fast on desktop.</p>
      </fieldset>
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
  const [activeNodeId, setActiveNodeId] = useState(() => getMuseumRuntimeHallNode(route.hallId)?.id ?? '');
  const activeNode = getMuseumRuntimeNode(activeNodeId);
  if (!activeNode) throw new Error(`Museum physical node ${activeNodeId || route.hallId} is not registered in the building manifest.`);
  const registration = getMuseumHallRegistration(activeHallId);
  if (!registration) throw new Error(`Museum hall ${route.hallId} is not registered in the persistent world.`);
  const hall = getMuseumHallCatalog(activeHallId)!;
  const definition = registration.definition;
  const layout = definition.layout;
  const exhibit = route.hallId === activeHallId && route.exhibitId ? getMuseumExhibitCatalog(activeHallId, route.exhibitId) : undefined;
  const content = useMemo(() => exhibit ? getMuseumInterpretation({hallId: activeHallId, exhibitId: exhibit.id}) : undefined, [activeHallId, exhibit]);
  const supplementalExhibit = route.hallId === activeHallId && route.exhibitId
    ? findMuseumSupplementalExhibit(activeHallId, route.exhibitId)
    : undefined;
  const guidedStops = useMemo(
    () => getMuseumGuidedStops(activeHallId, hall.guidedOrder as readonly MuseumExhibitId[]),
    [activeHallId, hall.guidedOrder],
  );
  const sceneLocationLabel = activeNode.publicHallId ? hall.title : activeNode.mapLabel;
  const visitContext = route.hallId === activeHallId && route.exhibitId
    ? parseMuseumExhibitVisitContext(window.history.state, route.hallId) ?? directMuseumVisitContext(route.hallId)
    : undefined;
  const guided = visitContext?.origin === 'guided';
  const experienceRootRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const sceneCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayOpenerRef = useRef<HTMLElement | null>(null);
  const overlayReturnFocusPendingRef = useRef(false);
  const visitorMapResumeRef = useRef(false);
  const travelResumeModeRef = useRef<'locked' | 'drag-look'>('drag-look');
  const controlsRef = useRef<MuseumControls | null>(null);
  const poseRef = useRef<MuseumPose>((() => {
    const session = loadMuseumSession(layout);
    const marker = parseMuseumExhibitVisitContext(window.history.state, route.hallId);
    if (session && (!route.exhibitId || marker)) {
      return {x: session.x, z: session.z, yaw: session.yaw, pitch: session.pitch};
    }
    const directViewpoint = museumRouteViewpoint(layout, route.exhibitId);
    return {...(directViewpoint ?? layout.spawn)};
  })());
  const activeHallIdRef = useRef<MuseumHallId>(activeHallId);
  const activeNodeIdRef = useRef(activeNode.id);
  const activeNodeRef = useRef(activeNode);
  const activeDefinitionRef = useRef(definition);
  activeHallIdRef.current = activeHallId;
  activeNodeIdRef.current = activeNode.id;
  activeNodeRef.current = activeNode;
  activeDefinitionRef.current = definition;
  const nearbyRef = useRef<MuseumExhibitRef | undefined>(undefined);
  const nearbySupplementalRef = useRef<MuseumSupplementalExhibitRef | undefined>(undefined);
  const visitorMapNearbyRef = useRef(false);
  const lastAnnouncedNearbyRef = useRef<MuseumExhibitRef | undefined>(undefined);
  const lastAnnouncedSupplementalRef = useRef<MuseumSupplementalExhibitRef | undefined>(undefined);
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
  const pendingHallTravelRef = useRef<{sourceHallId: MuseumHallId; targetHallId: MuseumHallId} | undefined>(undefined);
  const preparedHallEntryKeysRef = useRef<Set<string>>(new Set());
  const renderedHallEntryKeysRef = useRef<Set<string>>(new Set());
  const readyHallEntryKeysRef = useRef<Set<string>>(new Set());
  const readyHallIdsRef = useRef<Set<MuseumHallId>>(new Set());
  const failedHallContentIdsRef = useRef<Set<MuseumHallId>>(new Set());
  const retryingHallIdsRef = useRef<Set<MuseumHallId>>(new Set());
  const hallLoadPromiseRef = useRef<Map<string, Promise<void>>>(new Map());
  const hallRenderWaiterRef = useRef<Map<string, HallRenderWaiter>>(new Map());
  const latestEntranceByHallRef = useRef<Map<MuseumHallId, string>>(new Map());
  const lastSavedHallSignatureRef = useRef<Map<MuseumHallId, string>>(new Map());
  if (visitContext) lastExhibitContextRef.current = visitContext;
  const [nearbyReference, setNearbyReference] = useState<MuseumExhibitRef | undefined>();
  const [nearbySupplementalReference, setNearbySupplementalReference] = useState<MuseumSupplementalExhibitRef | undefined>();
  const [visitorMapNearby, setVisitorMapNearby] = useState(false);
  const nearbyId = nearbyReference?.hallId === activeHallId ? nearbyReference.exhibitId : undefined;
  const nearbySupplementalId = nearbySupplementalReference?.hallId === activeHallId
    ? nearbySupplementalReference.supplementalExhibitId
    : undefined;
  const [readyHallIds, setReadyHallIds] = useState<Set<MuseumHallId>>(() => new Set());
  const [readyHallEntryKeys, setReadyHallEntryKeys] = useState<Set<string>>(() => new Set());
  const [hallLoadStatus, setHallLoadStatus] = useState<Partial<Record<MuseumHallId, MuseumHallLoadStatus>>>({[route.hallId]: 'idle'});
  const [hallEntryLoadStatus, setHallEntryLoadStatus] = useState<Partial<Record<string, MuseumHallLoadStatus>>>({});
  const [hallLoadErrors, setHallLoadErrors] = useState<Partial<Record<MuseumHallId, string>>>({});
  const [hallContentEpochs, setHallContentEpochs] = useState<Partial<Record<MuseumHallId, number>>>({});
  const [approachedHall, setApproachedHall] = useState<MuseumHallApproach | undefined>();
  const approachedHallId = approachedHall?.hallId;
  const [recentHallId, setRecentHallId] = useState<MuseumHallId | undefined>();
  const residentHallIds = useMemo(() => new Set(resolveMuseumHallResidency({
    activeHallId,
    approachedHallId,
    approachedEntranceId: approachedHall?.entranceId,
    recentHallId,
  })), [activeHallId, approachedHall?.entranceId, approachedHallId, recentHallId]);
  const residentHallIdsRef = useRef(residentHallIds);
  residentHallIdsRef.current = residentHallIds;
  const [announcement, setAnnouncement] = useState('');
  const [visitPhase, setVisitPhase] = useState<MuseumVisitPhase>(() => (
    route.exhibitId
      ? 'explicitly-paused'
      : parseMuseumHallTravelContext(window.history.state, route.hallId)
        ? 'active'
        : 'unentered'
  ));
  const [overlay, setOverlay] = useState<Overlay>(null);
  const dismissOverlay = useCallback(() => {
    overlayReturnFocusPendingRef.current = true;
    setOverlay(null);
  }, []);
  const [sceneError, setSceneError] = useState<unknown>(() => hasWebGL() ? null : new Error('WebGL is unavailable.'));
  const hadSceneErrorRef = useRef(Boolean(sceneError));
  const previousModalOpenRef = useRef(false);
  const [sceneEpoch, setSceneEpoch] = useState(0);
  const [poseRevision, setPoseRevision] = useState(0);
  const LazyMuseumWorldScene = useMemo(createLazyMuseumWorldScene, [sceneEpoch]);
  const reducedMotion = useReducedMotion();
  const modalOpen = Boolean(exhibit || supplementalExhibit || overlay);
  const activeHallLoadFailed = hallLoadStatus[activeHallId] === 'failed';
  const activeHallLoading = hallLoadStatus[activeHallId] === 'idle' || hallLoadStatus[activeHallId] === 'loading';
  const blocked = modalOpen || Boolean(sceneError) || activeHallLoading;
  const exploring = visitPhase === 'active';
  const focusSuspended = visitPhase === 'focus-suspended';
  const activeIntent = museumPhaseHasActiveIntent(visitPhase);

  const saveCurrentHallSession = useCallback(() => {
    const currentDefinition = activeDefinitionRef.current;
    if (activeNodeRef.current.publicHallId !== currentDefinition.id) return;
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

  const waitForHallRender = useCallback((hallId: MuseumHallId, readinessKey: string): Promise<void> => {
    if (renderedHallEntryKeysRef.current.has(readinessKey)) return Promise.resolve();
    const existing = hallRenderWaiterRef.current.get(readinessKey);
    if (existing) return existing.promise;
    let resolve!: () => void;
    let reject!: (error: unknown) => void;
    const promise = new Promise<void>((onResolve, onReject) => {
      resolve = onResolve;
      reject = onReject;
    });
    hallRenderWaiterRef.current.set(readinessKey, {promise, resolve, reject});
    return promise;
  }, []);

  const warmHallRemainder = useCallback((hallId: MuseumHallId) => {
    const warm = () => {
      const connection = (navigator as Navigator & {connection?: {saveData?: boolean; effectiveType?: string}}).connection;
      if (
        activeHallIdRef.current !== hallId
        || document.hidden
        || connection?.saveData
        || connection?.effectiveType === 'slow-2g'
        || connection?.effectiveType === '2g'
      ) return;
      void prefetchMuseumHallRemainder(hallId).catch(() => {
        setAnnouncement(`The ${getMuseumHallCatalog(hallId)?.title ?? 'adjacent gallery'} is open; some object images will use documented fallbacks.`);
      });
    };
    if ('requestIdleCallback' in window) window.requestIdleCallback(warm, {timeout: 2400});
    else globalThis.setTimeout(warm, 250);
  }, []);

  const hallIsResident = useCallback((hallId: MuseumHallId) => {
    return residentHallIdsRef.current.has(hallId);
  }, []);

  const markHallCrossable = useCallback((hallId: MuseumHallId, readinessKey: string) => {
    if (
      failedHallContentIdsRef.current.has(hallId)
      || !preparedHallEntryKeysRef.current.has(readinessKey)
      || !renderedHallEntryKeysRef.current.has(readinessKey)
      || readyHallEntryKeysRef.current.has(readinessKey)
    ) return;
    readyHallEntryKeysRef.current = new Set(readyHallEntryKeysRef.current).add(readinessKey);
    setReadyHallEntryKeys(new Set(readyHallEntryKeysRef.current));
    readyHallIdsRef.current = new Set(readyHallIdsRef.current).add(hallId);
    setReadyHallIds(new Set(readyHallIdsRef.current));
    setHallEntryLoadStatus((current) => ({...current, [readinessKey]: 'ready'}));
    setHallLoadStatus((current) => ({...current, [hallId]: 'ready'}));
    const retried = retryingHallIdsRef.current.delete(hallId);
    setAnnouncement(`${getMuseumHallCatalog(hallId)?.title ?? 'The gallery'} is ready${retried ? ' after retry' : ''}.`);
  }, []);

  const ensureHallEntry = useCallback((hallId: MuseumHallId, entranceId?: string): Promise<void> => {
    const readinessKey = museumHallEntryReadinessKey(hallId, entranceId);
    if (entranceId) latestEntranceByHallRef.current.set(hallId, entranceId);
    if (failedHallContentIdsRef.current.has(hallId)) {
      return Promise.reject(new Error('The gallery renderer must be retried before this hall can reopen.'));
    }
    if (readyHallEntryKeysRef.current.has(readinessKey)) return Promise.resolve();
    const pending = hallLoadPromiseRef.current.get(readinessKey);
    if (pending) return pending;
    const updateHallStatus = entranceId === undefined || hallId !== activeHallIdRef.current;
    setHallEntryLoadStatus((current) => ({...current, [readinessKey]: 'loading'}));
    if (updateHallStatus) {
      setHallLoadStatus((current) => ({...current, [hallId]: 'loading'}));
      setHallLoadErrors((current) => ({...current, [hallId]: undefined}));
    }
    const promise = prefetchMuseumHallEntry(hallId, entranceId).then(() => {
      preparedHallEntryKeysRef.current = new Set(preparedHallEntryKeysRef.current).add(readinessKey);
      if (!hallIsResident(hallId)) throw new MuseumHallResidencyError(hallId);
      return waitForHallRender(hallId, readinessKey);
    }).then(() => {
      if (!preparedHallEntryKeysRef.current.has(readinessKey) || !renderedHallEntryKeysRef.current.has(readinessKey)) {
        throw new MuseumHallResidencyError(hallId);
      }
      markHallCrossable(hallId, readinessKey);
    }).catch((error: unknown) => {
      if (error instanceof MuseumHallResidencyError) {
        setHallEntryLoadStatus((current) => ({...current, [readinessKey]: 'idle'}));
        if (updateHallStatus) setHallLoadStatus((current) => failedHallContentIdsRef.current.has(hallId)
          ? current
          : {...current, [hallId]: 'idle'});
        throw error;
      }
      const message = error instanceof Error ? error.message : 'The gallery could not be prepared.';
      const wasRetrying = retryingHallIdsRef.current.delete(hallId);
      setHallEntryLoadStatus((current) => ({...current, [readinessKey]: 'failed'}));
      if (updateHallStatus) setHallLoadStatus((current) => ({...current, [hallId]: 'failed'}));
      setHallLoadErrors((current) => ({...current, [hallId]: message}));
      if (wasRetrying) setAnnouncement(`${getMuseumHallCatalog(hallId)?.title ?? 'The gallery'} retry failed.`);
      throw error;
    }).finally(() => {
      hallLoadPromiseRef.current.delete(readinessKey);
    });
    hallLoadPromiseRef.current.set(readinessKey, promise);
    return promise;
  }, [hallIsResident, markHallCrossable, waitForHallRender]);

  const handleHallContentReady = useCallback((hallId: MuseumHallId, readinessKey: string) => {
    renderedHallEntryKeysRef.current = new Set(renderedHallEntryKeysRef.current).add(readinessKey);
    const waiter = hallRenderWaiterRef.current.get(readinessKey);
    if (waiter) {
      hallRenderWaiterRef.current.delete(readinessKey);
      waiter.resolve();
    }
    markHallCrossable(hallId, readinessKey);
  }, [markHallCrossable]);

  const handleHallContentUnavailable = useCallback((hallId: MuseumHallId, readinessKey: string) => {
    renderedHallEntryKeysRef.current = new Set([...renderedHallEntryKeysRef.current].filter((key) => key !== readinessKey));
    readyHallEntryKeysRef.current = new Set([...readyHallEntryKeysRef.current].filter((key) => key !== readinessKey));
    setReadyHallEntryKeys(new Set(readyHallEntryKeysRef.current));
    setHallEntryLoadStatus((current) => ({...current, [readinessKey]: 'idle'}));
    const waiter = hallRenderWaiterRef.current.get(readinessKey);
    if (waiter) {
      hallRenderWaiterRef.current.delete(readinessKey);
      waiter.reject(new MuseumHallResidencyError(hallId));
    }
  }, []);

  const retryHallContent = useCallback((hallId: MuseumHallId) => {
    if (isRouteLoadError(hallLoadErrors[hallId])) {
      saveCurrentHallSession();
      window.location.reload();
      return;
    }
    failedHallContentIdsRef.current.delete(hallId);
    retryingHallIdsRef.current.add(hallId);
    setAnnouncement(`Retrying ${getMuseumHallCatalog(hallId)?.title ?? 'the gallery'}…`);
    const entranceId = activeNodeRef.current.publicHallId === hallId
      ? undefined
      : latestEntranceByHallRef.current.get(hallId);
    const readinessKey = museumHallEntryReadinessKey(hallId, entranceId);
    preparedHallEntryKeysRef.current = new Set([...preparedHallEntryKeysRef.current].filter((key) => !museumHallReadinessKeyBelongsTo(key, hallId)));
    renderedHallEntryKeysRef.current = new Set([...renderedHallEntryKeysRef.current].filter((key) => !museumHallReadinessKeyBelongsTo(key, hallId)));
    readyHallEntryKeysRef.current = new Set([...readyHallEntryKeysRef.current].filter((key) => !museumHallReadinessKeyBelongsTo(key, hallId)));
    readyHallIdsRef.current = new Set([...readyHallIdsRef.current].filter((id) => id !== hallId));
    setReadyHallEntryKeys(new Set(readyHallEntryKeysRef.current));
    setReadyHallIds(new Set(readyHallIdsRef.current));
    setHallContentEpochs((current) => ({...current, [hallId]: (current[hallId] ?? 0) + 1}));
    setHallLoadStatus((current) => ({...current, [hallId]: 'idle'}));
    window.requestAnimationFrame(() => document.getElementById('museum-title')?.focus({preventScroll: true}));
    setHallEntryLoadStatus((current) => ({...current, [readinessKey]: 'idle'}));
    void ensureHallEntry(hallId, entranceId).then(() => {
      if (activeHallIdRef.current === hallId) warmHallRemainder(hallId);
    }).catch(() => undefined);
  }, [ensureHallEntry, hallLoadErrors, saveCurrentHallSession, warmHallRemainder]);

  const handleHallContentError = useCallback((hallId: MuseumHallId, error: unknown) => {
    failedHallContentIdsRef.current.add(hallId);
    readyHallEntryKeysRef.current = new Set([...readyHallEntryKeysRef.current].filter((key) => !museumHallReadinessKeyBelongsTo(key, hallId)));
    renderedHallEntryKeysRef.current = new Set([...renderedHallEntryKeysRef.current].filter((key) => !museumHallReadinessKeyBelongsTo(key, hallId)));
    readyHallIdsRef.current = new Set([...readyHallIdsRef.current].filter((id) => id !== hallId));
    setReadyHallEntryKeys(new Set(readyHallEntryKeysRef.current));
    setReadyHallIds(new Set(readyHallIdsRef.current));
    setHallLoadStatus((current) => ({...current, [hallId]: 'failed'}));
    setHallLoadErrors((current) => ({...current, [hallId]: error instanceof Error ? error.message : 'The gallery content could not be rendered.'}));
    for (const [readinessKey, waiter] of hallRenderWaiterRef.current) {
      if (!museumHallReadinessKeyBelongsTo(readinessKey, hallId)) continue;
      hallRenderWaiterRef.current.delete(readinessKey);
      waiter.reject(error);
    }
    if (hallId === activeHallIdRef.current) {
      controlsRef.current?.pauseExploring();
      setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'scene-error'));
    }
  }, []);

  const promotePreparedEntranceToActive = useCallback((hallId: MuseumHallId, entranceId: string) => {
    const entryKey = museumHallEntryReadinessKey(hallId, entranceId);
    if (!readyHallEntryKeysRef.current.has(entryKey)) return;
    const activeKey = museumHallEntryReadinessKey(hallId);
    preparedHallEntryKeysRef.current = new Set(preparedHallEntryKeysRef.current).add(activeKey);
    renderedHallEntryKeysRef.current = new Set(renderedHallEntryKeysRef.current).add(activeKey);
    readyHallEntryKeysRef.current = new Set(readyHallEntryKeysRef.current).add(activeKey);
    readyHallIdsRef.current = new Set(readyHallIdsRef.current).add(hallId);
    setReadyHallEntryKeys(new Set(readyHallEntryKeysRef.current));
    setReadyHallIds(new Set(readyHallIdsRef.current));
    setHallEntryLoadStatus((current) => ({...current, [activeKey]: 'ready'}));
    setHallLoadStatus((current) => ({...current, [hallId]: 'ready'}));
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

  const openSupplementalExhibit = useCallback((id: MuseumSupplementalExhibitId) => {
    const record = findMuseumSupplementalExhibit(activeHallIdRef.current, id);
    if (!record) return;
    const origin: MuseumExhibitOrigin = museumPhaseHasActiveIntent(visitPhase) ? 'active-exploration' : 'paused-hall';
    const context = createMuseumExhibitVisitContext(activeHallIdRef.current, origin);
    saveCurrentHallSession();
    controlsRef.current?.blockInput();
    setOverlay(null);
    lastExhibitContextRef.current = context;
    push({kind: 'museum', hallId: activeHallIdRef.current, exhibitId: id}, {
      state: museumHistoryStateWithVisitContext(window.history.state, context),
    });
  }, [push, saveCurrentHallSession, visitPhase]);

  const resetPosition = useCallback(() => {
    const targetHallId = MUSEUM_VISITOR_MAP_KIOSK.hallId;
    const targetRegistration = getMuseumHallRegistration(targetHallId);
    const targetNode = getMuseumRuntimeHallNode(targetHallId);
    if (!targetRegistration || !targetNode) {
      setAnnouncement('The authored Museum orientation point is unavailable.');
      return;
    }
    const sourceHallId = activeHallIdRef.current;
    const reset = resolveMuseumOrientationReset({
      sourceHallId,
      targetHallId,
      targetNodeId: targetNode.id,
      targetPose: targetRegistration.definition.layout.reset,
    });
    controlsRef.current?.pauseExploring();
    activeHallIdRef.current = reset.activeHallId;
    activeNodeIdRef.current = reset.activeNodeId;
    activeNodeRef.current = targetNode;
    activeDefinitionRef.current = targetRegistration.definition;
    reset.clearedHallIds.forEach((hallId) => {
      removeMuseumSession(hallId);
      lastSavedHallSignatureRef.current.delete(hallId);
    });
    pendingHallTravelRef.current = undefined;
    pendingCrossHallCloseRef.current = undefined;
    const routeChangesHall = route.hallId !== targetHallId;
    pendingHallTransitionRef.current = routeChangesHall
      ? {sourceHallId: route.hallId, targetHallId}
      : undefined;
    setActiveHallId(reset.activeHallId);
    setActiveNodeId(reset.activeNodeId);
    setApproachedHall(undefined);
    setRecentHallId(undefined);
    residentHallIdsRef.current = new Set(resolveMuseumHallResidency({activeHallId: targetHallId}));
    poseRef.current = reset.pose;
    nearbyRef.current = undefined;
    setNearbyReference(undefined);
    nearbySupplementalRef.current = undefined;
    setNearbySupplementalReference(undefined);
    visitorMapNearbyRef.current = false;
    setVisitorMapNearby(false);
    visitorMapResumeRef.current = false;
    setOverlay(null);
    setVisitPhase('explicitly-paused');
    setAnnouncement('Position reset beside the visitor map and Gallery 01 entrance.');
    setPoseRevision((value) => value + 1);
    const resetHistoryState = museumHistoryStateWithHallTravelContext(
      museumHistoryStateWithVisitContext(window.history.state, undefined),
      undefined,
    );
    if (routeChangesHall || route.exhibitId) {
      replace({kind: 'museum', hallId: targetHallId}, {state: resetHistoryState});
    } else {
      window.history.replaceState(resetHistoryState, '');
    }
    void ensureHallEntry(targetHallId).catch(() => undefined);
  }, [ensureHallEntry, replace, route.exhibitId, route.hallId]);

  const showVisitorMap = useCallback(() => {
    overlayOpenerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : sceneCanvasRef.current;
    const resumeOnClose = museumPhaseHasActiveIntent(visitPhase);
    visitorMapResumeRef.current = resumeOnClose;
    travelResumeModeRef.current = resumeOnClose && controlsRef.current?.mode === 'locked' ? 'locked' : 'drag-look';
    saveCurrentHallSession();
    if (resumeOnClose) controlsRef.current?.blockInput();
    else {
      controlsRef.current?.pauseExploring();
      setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'explicit-pause'));
    }
    setOverlay('visitor-map');
  }, [saveCurrentHallSession, visitPhase]);

  const openVisitorMap = useCallback(() => {
    if (activeHallIdRef.current !== MUSEUM_VISITOR_MAP_KIOSK.hallId || !visitorMapNearbyRef.current) {
      setAnnouncement('The Museum visitor map is beside the Hall I entrance. Move closer to the illuminated kiosk to use it.');
      return;
    }
    showVisitorMap();
  }, [showVisitorMap]);

  const closeVisitorMap = useCallback(() => {
    const resume = visitorMapResumeRef.current && museumPhaseHasActiveIntent(visitPhase);
    visitorMapResumeRef.current = false;
    const resumeLocked = resume && travelResumeModeRef.current === 'locked';
    if (resumeLocked) controlsRef.current?.requestOverlayCloseResume();
    dismissOverlay();
    if (resume) {
      window.requestAnimationFrame(() => {
        if (resumeLocked) controlsRef.current?.completeOverlayCloseResume();
        else controlsRef.current?.resumeWithoutGesture();
      });
    }
  }, [dismissOverlay, visitPhase]);

  const interactNearby = useCallback(() => {
    if (visitorMapNearbyRef.current) {
      openVisitorMap();
      return;
    }
    const supplementalReference = nearbySupplementalRef.current;
    if (supplementalReference?.hallId === activeHallIdRef.current) {
      openSupplementalExhibit(supplementalReference.supplementalExhibitId);
      return;
    }
    const reference = nearbyRef.current;
    if (reference?.hallId === activeHallIdRef.current) openExhibit(reference.exhibitId);
  }, [openExhibit, openSupplementalExhibit, openVisitorMap]);

  const controls = useMuseumControls({
    active: exploring,
    suspended: focusSuspended,
    blocked,
    canInteract: Boolean(nearbyId || nearbySupplementalId || visitorMapNearby),
    onInteract: interactNearby,
    onReset: resetPosition,
    onOpenVisitorMap: showVisitorMap,
    onPause: () => setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'explicit-pause')),
    onSuspend: () => setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'focus-lost')),
    onReactivate: () => setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'scene-reactivate')),
  });
  controlsRef.current = controls;

  const experience = useMuseumExperienceMode({
    experienceRootRef,
    shortcutBlocked: blocked,
  });

  const activateHall = useCallback((
    hallId: MuseumHallId,
    pose?: MuseumPose,
    activation: 'paused' | 'resumable' = 'paused',
  ): boolean => {
    const targetRegistration = getMuseumHallRegistration(hallId);
    const targetNode = getMuseumRuntimeHallNode(hallId);
    if (!targetRegistration || !targetNode) return false;
    const sourceHallId = activeHallIdRef.current;
    if (hallId !== sourceHallId) saveCurrentHallSession();
    const targetLayout = targetRegistration.definition.layout;
    const session = pose ? undefined : loadMuseumSession(targetLayout);
    const targetPose = pose
      ?? (session ? {x: session.x, z: session.z, yaw: session.yaw, pitch: session.pitch} : undefined)
      ?? targetLayout.spawn;
    activeHallIdRef.current = hallId;
    activeNodeIdRef.current = targetNode.id;
    activeNodeRef.current = targetNode;
    activeDefinitionRef.current = targetRegistration.definition;
    setActiveHallId(hallId);
    setActiveNodeId(targetNode.id);
    setApproachedHall(undefined);
    if (hallId !== sourceHallId) setRecentHallId(sourceHallId);
    residentHallIdsRef.current = new Set(resolveMuseumHallResidency({
      activeHallId: hallId,
      recentHallId: hallId === sourceHallId ? recentHallId : sourceHallId,
    }));
    poseRef.current = {...targetPose};
    nearbyRef.current = undefined;
    setNearbyReference(undefined);
    nearbySupplementalRef.current = undefined;
    setNearbySupplementalReference(undefined);
    visitorMapNearbyRef.current = false;
    setVisitorMapNearby(false);
    if (activation === 'paused') {
      controlsRef.current?.pauseExploring();
      setVisitPhase('explicitly-paused');
    } else {
      setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'resume-active-origin'));
    }
    setOverlay(null);
    setPoseRevision((value) => value + 1);
    void ensureHallEntry(hallId).catch(() => undefined);
    return true;
  }, [ensureHallEntry, recentHallId, saveCurrentHallSession]);

  const resumeTravelWhenReady = useCallback((hallId: MuseumHallId, resumeLocked: boolean) => {
    void ensureHallEntry(hallId).then(() => {
      if (activeHallIdRef.current !== hallId || !readyHallIdsRef.current.has(hallId)) return;
      setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'resume-active-origin'));
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
        if (activeHallIdRef.current !== hallId) return;
        if (resumeLocked) controlsRef.current?.completeOverlayCloseResume();
        else controlsRef.current?.resumeWithoutGesture();
      }));
    }).catch(() => {
      if (activeHallIdRef.current !== hallId) return;
      controlsRef.current?.pauseExploring();
      setVisitPhase('explicitly-paused');
      setAnnouncement(`${getMuseumHallCatalog(hallId)?.title ?? 'The selected gallery'} could not be prepared. Retry is available.`);
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLElement>('.museum-hall-load-error button')?.focus({preventScroll: true});
      });
    });
  }, [ensureHallEntry]);

  const travelToHall = useCallback((hallId: MuseumHallId, destination: MuseumPose): boolean => {
    const sourceHallId = activeHallIdRef.current;
    const sourceHistoryState = museumHistoryStateWithHallTravelContext(
      museumHistoryStateWithVisitContext(window.history.state, undefined),
      createMuseumHallTravelContext(sourceHallId),
    );
    window.history.replaceState(sourceHistoryState, '');
    const targetHistoryState = museumHistoryStateWithHallTravelContext(
      sourceHistoryState,
      createMuseumHallTravelContext(hallId),
    );
    const resumeLocked = travelResumeModeRef.current === 'locked';
    visitorMapResumeRef.current = false;
    overlayOpenerRef.current = sceneCanvasRef.current;
    if (resumeLocked) controlsRef.current?.requestOverlayCloseResume();
    if (!activateHall(hallId, destination, 'resumable')) return false;
    saveMuseumSession(getMuseumHallRegistration(hallId)!.definition.layout, destination);
    if (hallId !== sourceHallId) {
      pendingHallTravelRef.current = {sourceHallId, targetHallId: hallId};
      push({kind: 'museum', hallId}, {state: targetHistoryState});
    } else {
      window.history.replaceState(targetHistoryState, '');
    }
    resumeTravelWhenReady(hallId, resumeLocked);
    return true;
  }, [activateHall, push, resumeTravelWhenReady]);

  const visitHallFromDirectory = useCallback((hallId: MuseumHallId) => {
    const targetRegistration = getMuseumHallRegistration(hallId);
    const node = getMuseumVisitorMapNode(hallId);
    const destination = targetRegistration && node
      ? resolveMuseumVisitorMapDestination(targetRegistration.definition, node)
      : undefined;
    if (!destination || !travelToHall(hallId, destination)) {
      setAnnouncement('That Museum gallery does not have a valid safe arrival.');
      return;
    }
    setAnnouncement(`Arrived at ${getMuseumHallCatalog(hallId)?.title ?? 'the selected gallery'}. Continue exploring.`);
  }, [travelToHall]);

  const visitHallFromVisitorMap = useCallback((hallId: MuseumHallId) => {
    const targetRegistration = getMuseumHallRegistration(hallId);
    const node = getMuseumVisitorMapNode(hallId);
    const destination = targetRegistration && node
      ? resolveMuseumVisitorMapDestination(targetRegistration.definition, node)
      : undefined;
    if (!targetRegistration || !destination) {
      setAnnouncement('That Museum gallery does not have a valid visitor-map destination.');
      return;
    }
    if (!travelToHall(hallId, destination)) return;
    setAnnouncement(`Arrived at the safe entrance to ${getMuseumHallCatalog(hallId)?.title ?? 'the selected gallery'}. Continue exploring.`);
  }, [travelToHall]);

  const stageZoneViewpoint = useCallback((hallId: MuseumHallId, zoneId: string) => {
    const targetRegistration = getMuseumHallRegistration(hallId);
    const targetHall = getMuseumHallCatalog(hallId);
    if (!targetRegistration || !targetHall) return;
    const exhibitIds = new Set<string>(targetHall.exhibits.filter((item) => item.zoneId === zoneId).map(({id}) => id));
    const view = targetRegistration.definition.layout.entryViews.find((item) => item.expectedVisibleExhibitIds.some((id) => exhibitIds.has(id)));
    if (!view) return;
    activateHall(hallId, view.pose);
    saveMuseumSession(targetRegistration.definition.layout, view.pose);
    push(
      {kind: 'museum', hallId},
      {state: museumHistoryStateWithVisitContext(window.history.state, undefined)},
    );
  }, [activateHall, push]);

  const handleNodeTransition = useCallback((transition: MuseumNodeTransition) => {
    const {arrival, connection, crossingPose: sourcePose, targetNode} = transition;
    const source = activeNodeRef.current;
    if (source.id !== connection.sourceNodeId || targetNode.id !== connection.targetNodeId) {
      setAnnouncement('The connected doorway changed before the crossing could finish.');
      return false;
    }
    const targetRegistration = targetNode.publicHallId
      ? getMuseumHallRegistration(targetNode.publicHallId)
      : undefined;
    if (targetNode.publicHallId && !targetRegistration) {
      setAnnouncement('The connected gallery is not registered in this Museum build.');
      return false;
    }
    const sourceNearby = nearbyRef.current;
    if (source.publicHallId) {
      const sourceHall = getMuseumHallRegistration(source.publicHallId)?.definition;
      const sourceEntrance = source.entrances.find(({id}) => id === connection.localEntranceId);
      const safeSourcePose = sourceEntrance
        ? {...sourceEntrance.arrivalPose, yaw: sourcePose.yaw, pitch: sourcePose.pitch}
        : sourcePose;
      if (sourceHall) saveMuseumSession(sourceHall.layout, safeSourcePose, sourceNearby?.hallId === source.publicHallId ? sourceNearby.exhibitId : undefined);
    }
    poseRef.current = arrival;
    activeNodeIdRef.current = targetNode.id;
    activeNodeRef.current = targetNode;
    setActiveNodeId(targetNode.id);
    setApproachedHall(undefined);
    nearbyRef.current = undefined;
    setNearbyReference(undefined);
    nearbySupplementalRef.current = undefined;
    setNearbySupplementalReference(undefined);
    visitorMapNearbyRef.current = false;
    setVisitorMapNearby(false);
    setOverlay(null);
    if (targetNode.publicHallId && targetRegistration) {
      const targetHallId = targetNode.publicHallId;
      const previousHallId = activeHallIdRef.current;
      promotePreparedEntranceToActive(targetHallId, connection.targetEntranceId);
      saveMuseumSession(targetRegistration.definition.layout, arrival);
      if (previousHallId !== targetHallId) setRecentHallId(previousHallId);
      pendingHallTransitionRef.current = {sourceHallId: previousHallId, targetHallId};
      activeHallIdRef.current = targetHallId;
      activeDefinitionRef.current = targetRegistration.definition;
      setActiveHallId(targetHallId);
      setAnnouncement(`Entered ${getMuseumHallCatalog(targetHallId)?.title}.`);
      if (previousHallId !== targetHallId) replace(
        {kind: 'museum', hallId: targetHallId},
        {state: museumHistoryStateWithVisitContext(window.history.state, undefined)},
      );
    } else {
      setAnnouncement(`Entered ${targetNode.mapLabel}.`);
    }
    setPoseRevision((value) => value + 1);
    return true;
  }, [promotePreparedEntranceToActive, replace]);

  const handleNodeTransitionBlocked = useCallback((connection: MuseumDirectedConnection) => {
    const targetHallId = getMuseumConnectionTargetHallId(connection);
    if (!targetHallId) return;
    const target = getMuseumHallCatalog(targetHallId);
    const readinessKey = museumHallEntryReadinessKey(targetHallId, connection.targetEntranceId);
    const status = hallEntryLoadStatus[readinessKey];
    setAnnouncement(status === 'failed'
      ? `${target?.title ?? 'The connected gallery'} could not be prepared. Use the visible Retry control.`
      : `Preparing ${target?.title ?? 'the connected gallery'} before you cross…`);
    void ensureHallEntry(targetHallId, connection.targetEntranceId).catch(() => undefined);
  }, [ensureHallEntry, hallEntryLoadStatus]);

  const handleApproachHall = useCallback((approach: MuseumHallApproach | undefined) => {
    setApproachedHall(approach);
    if (!approach) return;
    const {hallId, entranceId} = approach;
    residentHallIdsRef.current = new Set(resolveMuseumHallResidency({
      activeHallId: activeHallIdRef.current,
      approachedHallId: hallId,
      approachedEntranceId: entranceId,
      recentHallId,
    }));
    void ensureHallEntry(hallId, entranceId).catch(() => undefined);
  }, [ensureHallEntry, recentHallId]);

  const stageExhibitViewpoint = useCallback((reference: MuseumExhibitRef) => {
    const targetRegistration = getMuseumHallRegistration(reference.hallId);
    const targetNode = getMuseumRuntimeHallNode(reference.hallId);
    const viewpoint = targetRegistration?.definition.layout.exhibits.find((item) => item.id === reference.exhibitId)?.viewpoint;
    if (!viewpoint) return;
    if (reference.hallId !== activeHallIdRef.current) saveCurrentHallSession();
    if (!targetRegistration || !targetNode) return;
    activeHallIdRef.current = reference.hallId;
    activeNodeIdRef.current = targetNode.id;
    activeNodeRef.current = targetNode;
    activeDefinitionRef.current = targetRegistration.definition;
    setActiveHallId(reference.hallId);
    setActiveNodeId(targetNode.id);
    setApproachedHall(undefined);
    poseRef.current = {...viewpoint};
    nearbyRef.current = reference;
    setNearbyReference(reference);
    nearbySupplementalRef.current = undefined;
    setNearbySupplementalReference(undefined);
    visitorMapNearbyRef.current = false;
    setVisitorMapNearby(false);
    saveMuseumSession(targetRegistration.definition.layout, poseRef.current, reference.exhibitId);
    setPoseRevision((value) => value + 1);
  }, [saveCurrentHallSession]);

  const stageSupplementalViewpoint = useCallback((reference: MuseumSupplementalExhibitRef) => {
    const targetRegistration = getMuseumHallRegistration(reference.hallId);
    const targetNode = getMuseumRuntimeHallNode(reference.hallId);
    const entry = findMuseumSupplementalExhibitEntry(reference.hallId, reference.supplementalExhibitId);
    const viewpoint = targetRegistration?.definition.layout.supplementalExhibits
      ?.find(({id}) => id === reference.supplementalExhibitId)?.viewpoint
      ?? entry?.layout.viewpoint;
    if (!targetRegistration || !targetNode || !viewpoint) return;
    if (reference.hallId !== activeHallIdRef.current) saveCurrentHallSession();
    activeHallIdRef.current = reference.hallId;
    activeNodeIdRef.current = targetNode.id;
    activeNodeRef.current = targetNode;
    activeDefinitionRef.current = targetRegistration.definition;
    setActiveHallId(reference.hallId);
    setActiveNodeId(targetNode.id);
    setApproachedHall(undefined);
    poseRef.current = {...viewpoint};
    nearbyRef.current = undefined;
    setNearbyReference(undefined);
    nearbySupplementalRef.current = reference;
    setNearbySupplementalReference(reference);
    visitorMapNearbyRef.current = false;
    setVisitorMapNearby(false);
    saveMuseumSession(targetRegistration.definition.layout, poseRef.current);
    setPoseRevision((value) => value + 1);
  }, [saveCurrentHallSession]);

  const pauseAndOpen = (next: Exclude<Overlay, null>) => {
    visitorMapResumeRef.current = false;
    travelResumeModeRef.current = controls.mode === 'locked' ? 'locked' : 'drag-look';
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
  const resumeVisitOffered = visitPhase !== 'unentered'
    && controls.mode !== 'locked'
    && !sceneError
    && !activeHallLoading
    && !activeHallLoadFailed;
  const resumeVisit = () => {
    if (focusSuspended || exploring) {
      controls.handleSceneGesture();
      return;
    }
    beginExploring();
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
    const stop = guidedStops[index];
    const viewpoint = museumRouteViewpoint(layout, stop?.exhibitId);
    if (!stop || !viewpoint) return;
    controls.pauseExploring();
    setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'explicit-pause'));
    poseRef.current = {...viewpoint};
    saveMuseumSession(
      layout,
      poseRef.current,
      stop.kind === 'primary' ? stop.exhibitId : undefined,
    );
    setPoseRevision((value) => value + 1);
    setOverlay(null);
    const target = {kind: 'museum' as const, hallId: activeHallId, exhibitId: stop.exhibitId};
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
    sceneCanvasRef.current?.setAttribute('aria-label', `Walkable ${sceneLocationLabel}, connected to the Philosophy Atlas Museum`);
  }, [sceneLocationLabel]);

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
    if (!modalOpen && overlayReturnFocusPendingRef.current) {
      overlayReturnFocusPendingRef.current = false;
      return;
    }
    if (route.exhibitId || modalOpen || activeIntent || activeHallLoadFailed || previousRouteExhibitRef.current) return;
    const frame = window.requestAnimationFrame(() => {
      const target = sceneError
        ? document.getElementById('museum-fallback-title')
        : document.getElementById('museum-title');
      target?.focus({preventScroll: true});
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeHallLoadFailed, activeIntent, modalOpen, route.exhibitId, route.hallId, sceneError]);

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
      const displayName = getMuseumExhibitCatalog(route.hallId, route.exhibitId)?.displayName
        ?? findMuseumSupplementalExhibit(route.hallId, route.exhibitId)?.displayName
        ?? 'Museum exhibit';
      setAnnouncement(`Opened ${displayName} in ${getMuseumHallCatalog(route.hallId)?.title ?? 'the selected gallery'}.`);
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
    const returningHallTitle = getMuseumHallCatalog(route.hallId)?.title ?? 'the selected gallery';
    if (policy.resumeExploration) {
      setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'resume-active-origin'));
      setOverlay(null);
      if (resumeStrategy === 'request-pointer-lock') controlsRef.current?.completeOverlayCloseResume();
      else controlsRef.current?.resumeWithoutGesture();
      setAnnouncement(`Returned to ${returningHallTitle}. Continue exploring.`);
    } else {
      controlsRef.current?.pauseExploring();
      setVisitPhase('explicitly-paused');
      setOverlay(policy.restoreDirectory ? 'directory' : null);
      setAnnouncement(policy.restoreDirectory
        ? `Returned to the Museum directory from ${returningHallTitle}.`
        : `Returned to ${returningHallTitle}. Resume the visit when ready.`);
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
    const pendingTravel = pendingHallTravelRef.current;
    if (
      pendingTravel?.sourceHallId === previousRouteHallId
      && pendingTravel.targetHallId === route.hallId
      && activeHallIdRef.current === route.hallId
    ) {
      pendingHallTravelRef.current = undefined;
      return;
    }
    pendingHallTravelRef.current = undefined;
    const pending = pendingHallTransitionRef.current;
    if (pending?.sourceHallId === previousRouteHallId && pending.targetHallId === route.hallId && activeHallIdRef.current === route.hallId) {
      pendingHallTransitionRef.current = undefined;
      return;
    }
    pendingHallTransitionRef.current = undefined;
    const targetRegistration = getMuseumHallRegistration(route.hallId);
    const targetNode = getMuseumRuntimeHallNode(route.hallId);
    if (!targetRegistration || !targetNode) return;
    const syncsDifferentHall = activeHallIdRef.current !== route.hallId;
    if (syncsDifferentHall) saveCurrentHallSession();
    const targetLayout = targetRegistration.definition.layout;
    const directViewpoint = museumRouteViewpoint(targetLayout, route.exhibitId);
    const session = directViewpoint ? undefined : loadMuseumSession(targetLayout);
    poseRef.current = directViewpoint
      ? {...directViewpoint}
      : session
        ? {x: session.x, z: session.z, yaw: session.yaw, pitch: session.pitch}
        : {...targetLayout.spawn};
    activeHallIdRef.current = route.hallId;
    activeNodeIdRef.current = targetNode.id;
    activeNodeRef.current = targetNode;
    activeDefinitionRef.current = targetRegistration.definition;
    setActiveHallId(route.hallId);
    setActiveNodeId(targetNode.id);
    if (syncsDifferentHall) setRecentHallId(previousRouteHallId);
    residentHallIdsRef.current = new Set(resolveMuseumHallResidency({
      activeHallId: route.hallId,
      recentHallId: syncsDifferentHall ? previousRouteHallId : recentHallId,
    }));
    setApproachedHall(undefined);
    nearbyRef.current = undefined;
    setNearbyReference(undefined);
    nearbySupplementalRef.current = undefined;
    setNearbySupplementalReference(undefined);
    visitorMapNearbyRef.current = false;
    setVisitorMapNearby(false);
    const crossHallClose = pendingCrossHallCloseRef.current;
    const hallTravelContext = !route.exhibitId
      ? parseMuseumHallTravelContext(window.history.state, route.hallId)
      : undefined;
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
    } else if (hallTravelContext) {
      setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'resume-active-origin'));
      setOverlay(null);
    } else {
      controlsRef.current?.pauseExploring();
      setVisitPhase(route.exhibitId ? 'explicitly-paused' : 'unentered');
      setOverlay(null);
    }
    if (!route.exhibitId && syncsDifferentHall) {
      setAnnouncement(`Now in ${getMuseumHallCatalog(route.hallId)?.title ?? 'the selected Museum gallery'}.`);
    }
    setPoseRevision((value) => value + 1);
    void ensureHallEntry(route.hallId).then(() => {
      if (!hallTravelContext || activeHallIdRef.current !== route.hallId) return;
      setVisitPhase((phase) => transitionMuseumVisitPhase(phase, 'resume-active-origin'));
      controlsRef.current?.resumeWithoutGesture();
      setAnnouncement(`Returned to ${getMuseumHallCatalog(route.hallId)?.title ?? 'the selected gallery'}. Continue exploring.`);
    }).catch(() => {
      if (!hallTravelContext || activeHallIdRef.current !== route.hallId) return;
      controlsRef.current?.pauseExploring();
      setVisitPhase('explicitly-paused');
      setAnnouncement(`${getMuseumHallCatalog(route.hallId)?.title ?? 'The selected gallery'} could not be prepared. Retry is available.`);
    });
  }, [ensureHallEntry, recentHallId, route.exhibitId, route.hallId, saveCurrentHallSession]);

  useEffect(() => {
    void ensureHallEntry(activeHallId)
      .then(() => {
        warmHallRemainder(activeHallId);
        if (
          !route.exhibitId
          && route.hallId === activeHallId
          && parseMuseumHallTravelContext(window.history.state, activeHallId)
        ) controlsRef.current?.resumeWithoutGesture();
      })
      .catch(() => undefined);
  }, [activeHallId, ensureHallEntry, route.exhibitId, route.hallId, warmHallRemainder]);

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
  const nearbySupplemental = nearbySupplementalId
    ? findMuseumSupplementalExhibit(activeHallId, nearbySupplementalId)
    : undefined;
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
  useEffect(() => {
    const reference = nearbySupplemental
      ? {hallId: activeHallId, supplementalExhibitId: nearbySupplemental.id}
      : undefined;
    if (
      !exploring
      || !nearbySupplemental
      || (
        lastAnnouncedSupplementalRef.current?.hallId === reference?.hallId
        && lastAnnouncedSupplementalRef.current?.supplementalExhibitId === reference?.supplementalExhibitId
      )
    ) return;
    const timer = window.setTimeout(() => {
      if (
        nearbySupplementalRef.current?.hallId !== activeHallId
        || nearbySupplementalRef.current.supplementalExhibitId !== nearbySupplemental.id
      ) return;
      lastAnnouncedSupplementalRef.current = reference;
      setAnnouncement(`Near ${nearbySupplemental.displayName}. Press E or Enter to open the supplemental exhibit.`);
    }, reducedMotion ? 0 : 650);
    return () => window.clearTimeout(timer);
  }, [activeHallId, exploring, nearbySupplemental, reducedMotion]);
  useEffect(() => {
    if (!exploring || !visitorMapNearby) return;
    const timer = window.setTimeout(() => {
      if (visitorMapNearbyRef.current) setAnnouncement('Near the Museum visitor map. Press E or Enter to open it.');
    }, reducedMotion ? 0 : 350);
    return () => window.clearTimeout(timer);
  }, [exploring, reducedMotion, visitorMapNearby]);

  const exhibitIndex = route.exhibitId
    ? guidedStops.findIndex(({exhibitId}) => exhibitId === route.exhibitId)
    : -1;
  const sceneRegistrations = MUSEUM_WORLD_REGISTRY.filter(({definition: item}) => residentHallIds.has(item.id));
  const approachedHallIds = approachedHallId ? [approachedHallId] : [];
  const approachedReadinessKey = approachedHall
    ? museumHallEntryReadinessKey(approachedHall.hallId, approachedHall.entranceId)
    : undefined;
  const adjacentFailedHallIds = approachedHallIds.filter(() =>
    approachedReadinessKey && hallEntryLoadStatus[approachedReadinessKey] === 'failed');
  const adjacentLoadingHallIds = approachedHallIds.filter(() =>
    approachedReadinessKey && hallEntryLoadStatus[approachedReadinessKey] === 'loading');

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
              activeHallId={activeHallId}
              registrations={sceneRegistrations}
              readyHallEntryKeys={[...readyHallEntryKeys]}
              hallEntryLoadStatus={hallEntryLoadStatus}
              hallContentEpochs={hallContentEpochs}
              definition={activeNode}
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
                canvas.setAttribute('aria-label', `Walkable ${sceneLocationLabel}, connected to the Philosophy Atlas Museum`);
                canvas.setAttribute('aria-describedby', 'museum-controls-description');
                canvas.tabIndex = 0;
                controls.onCanvasReady(canvas);
              }}
              onNearbyInteractionChange={(target) => {
                const current = target?.hallId === activeHallIdRef.current ? target : undefined;
                const exhibitTarget = current?.kind === 'exhibit'
                  ? {hallId: current.hallId, exhibitId: current.exhibitId}
                  : undefined;
                nearbyRef.current = exhibitTarget;
                setNearbyReference(exhibitTarget);
                const supplementalTarget = current?.kind === 'supplemental-exhibit'
                  ? {hallId: current.hallId, supplementalExhibitId: current.supplementalExhibitId}
                  : undefined;
                nearbySupplementalRef.current = supplementalTarget;
                setNearbySupplementalReference(supplementalTarget);
                const mapNearby = current?.kind === 'visitor-map';
                visitorMapNearbyRef.current = mapNearby;
                setVisitorMapNearby(mapNearby);
              }}
              onSelectExhibit={(reference) => {
                if (reference.hallId === activeHallIdRef.current && !controls.shouldSuppressActivation()) openExhibit(reference.exhibitId);
              }}
              onSelectSupplementalExhibit={(reference) => {
                if (
                  reference.hallId === activeHallIdRef.current
                  && !controls.shouldSuppressActivation()
                ) openSupplementalExhibit(reference.supplementalExhibitId);
              }}
              onSelectVisitorMap={() => {
                if (controls.shouldSuppressActivation()) return;
                openVisitorMap();
              }}
              onNodeTransition={handleNodeTransition}
              onNodeTransitionBlocked={handleNodeTransitionBlocked}
              onApproachHall={handleApproachHall}
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
            {!activeNode.publicHallId && <p className="museum-masthead-location">Current location · {activeNode.mapLabel}</p>}
            <p className="museum-masthead-sweep">{hall.sweep.map((item, index) => <span key={item}>{index > 0 && <i aria-hidden="true">→</i>}{item}</span>)}</p>
            <div className="museum-entry-row">
              <button
                id="museum-enter-button"
                className={`museum-enter-button${resumeVisitOffered ? ' is-resume' : ''}`}
                type="button"
                onClick={resumeVisitOffered ? resumeVisit : beginExploring}
                disabled={Boolean(sceneError) || activeHallLoading || activeHallLoadFailed}
              >
                <DoorOpen size={17}/>
                {activeHallLoadFailed
                  ? 'Gallery unavailable'
                  : activeHallLoading
                    ? 'Preparing gallery'
                    : resumeVisitOffered
                      ? 'Resume visit'
                      : exploring
                        ? 'Visit active'
                        : 'Enter museum'}
              </button>
              <span>{activeIntent ? controls.mode.replace('-', ' ') : 'WASD · arrows · touch'}</span>
            </div>
          </header>

          <nav className="museum-utility-bar" aria-label="Museum display and navigation controls">
            <button className="museum-control-map" type="button" onClick={showVisitorMap} aria-expanded={overlay === 'visitor-map'} aria-label="Open Museum visitor map" title="Visitor map (M)"><MapIcon size={16}/><span>MAP (M)</span></button>
            <button className="museum-control-directory" type="button" onClick={() => pauseAndOpen('directory')} aria-expanded={overlay === 'directory'} aria-label="Open Museum directory" title="Directory"><MapPinned size={16}/><span>Directory</span></button>
            <button className="museum-control-help" type="button" onClick={() => pauseAndOpen('help')} aria-expanded={overlay === 'help'} aria-label="Open Museum controls and access help" title="Controls"><Info size={16}/><span>Controls</span></button>
            <button className="museum-control-reset" type="button" onClick={resetPosition} aria-label="Reset Museum position" title="Reset position"><RotateCcw size={16}/><span>Reset</span></button>
            <button className="museum-control-immersive" type="button" onClick={experience.toggleImmersive} aria-pressed={experience.immersive} aria-label={experience.immersive ? 'Exit immersive Museum mode' : 'Enter immersive Museum mode'} title={experience.immersive ? 'Exit immersive' : 'Enter immersive'}><Scan size={16}/><span>{experience.immersive ? 'Exit immersive' : 'Immersive'}</span></button>
            {experience.fullscreenSupported && <button className="museum-control-fullscreen" type="button" onClick={() => void experience.toggleFullscreen()} aria-pressed={experience.fullscreen} aria-label={experience.fullscreen ? 'Exit browser fullscreen' : 'Enter browser fullscreen'} title={experience.fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{experience.fullscreen ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}<span>{experience.fullscreen ? 'Exit fullscreen' : 'Fullscreen'}</span></button>}
            {exploring && <button className="museum-pause-button" type="button" onClick={controls.pauseExploring} aria-label="Pause Museum visit">Pause visit</button>}
          </nav>

          {visitorMapNearby && exploring && <aside className="museum-proximity-card museum-map-proximity-card" data-zone="visitor-map">
            <p><span>Visitor orientation</span><span>All registered galleries</span></p>
            <h2>Museum visitor map</h2>
            <blockquote>Plan your route through the connected halls and travel to any safe gallery entrance.</blockquote>
            <button type="button" onClick={openVisitorMap}>E / Enter · Open map</button>
          </aside>}

          {nearby && nearbyContent && exploring && <aside className="museum-proximity-card" data-zone={nearby.zoneId}>
            <p><span>{nearby.entityKind === 'philosopher' ? 'Philosopher' : 'School & tradition'}</span><span>{nearbyContent.dateLabel}</span></p>
            <h2>{nearby.displayName}</h2>
            <blockquote>{nearby.question}</blockquote>
            <button type="button" onClick={() => openExhibit(nearby.id)}>E / Enter · Interpret exhibit</button>
          </aside>}

          {nearbySupplemental && exploring && <aside className="museum-proximity-card" data-zone={activeHallId === 'mediterranean-beginnings-classical' ? 'med-plato-aristotle' : activeHallId} data-supplemental-id={nearbySupplemental.id}>
            <p><span>{nearbySupplemental.presentation?.proximityKicker ?? 'Supplemental Plato work'}</span><span>{nearbySupplemental.dateLabel}</span></p>
            <h2>{nearbySupplemental.displayName}</h2>
            <blockquote>{nearbySupplemental.question}</blockquote>
            <button type="button" onClick={() => openSupplementalExhibit(nearbySupplemental.id)}>E / Enter · {nearbySupplemental.presentation ? 'Explore exhibit' : 'Explore work'}</button>
          </aside>}

        </div>

        <MuseumTouchControls
          active={exploring}
          blocked={blocked}
          canInteract={Boolean(nearby || nearbySupplemental || visitorMapNearby)}
          nearbyLabel={visitorMapNearby ? 'Museum visitor map' : nearbySupplemental?.displayName ?? nearby?.displayName}
          movementBindings={controls.movementBindings}
          lookBindings={controls.lookBindings}
          walkingPace={controls.walkingPace}
          onWalkingPaceChange={controls.setWalkingPace}
          onInteract={interactNearby}
          onPause={controls.pauseExploring}
          onReset={resetPosition}
          onMap={showVisitorMap}
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
      {!exhibit && !supplementalExhibit && overlay === 'visitor-map' && <MuseumVisitorMap
        currentHallId={activeHallId}
        currentNodeId={activeNode.id}
        currentPose={poseRef.current}
        returnFocus={overlayOpenerRef.current}
        onClose={closeVisitorMap}
        onTravel={visitHallFromVisitorMap}
      />}
      {!exhibit && !supplementalExhibit && overlay === 'directory' && <Directory
        route={route}
        href={href}
        push={push}
        returnFocus={overlayOpenerRef.current}
        onClose={dismissOverlay}
        onGuidedStart={() => goGuided(0)}
        onHallActivate={visitHallFromDirectory}
        onExhibitViewpoint={stageExhibitViewpoint}
        onSupplementalViewpoint={stageSupplementalViewpoint}
        onZoneViewpoint={stageZoneViewpoint}
      />}
      {!exhibit && !supplementalExhibit && overlay === 'help' && <Help
        returnFocus={overlayOpenerRef.current}
        onClose={dismissOverlay}
        walkingPace={controls.walkingPace}
        onWalkingPaceChange={controls.setWalkingPace}
      />}
      {exhibit && content && <MuseumInterpretationPanel
        key={exhibit.id}
        exhibit={exhibit}
        content={content}
        href={href}
        guided={guided}
        exhibitIndex={exhibitIndex}
        exhibitCount={guidedStops.length}
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
      {supplementalExhibit && <MuseumSupplementalInterpretationPanel
        key={supplementalExhibit.id}
        exhibit={supplementalExhibit}
        href={href}
        guided={guided}
        exhibitIndex={exhibitIndex}
        exhibitCount={guidedStops.length}
        continueLabel={visitContext?.origin === 'active-exploration' ? 'Continue exploring' : 'Return to gallery'}
        onClose={closeExhibit}
        onArticleIntent={saveCurrentHallSession}
        onGuidedPrevious={() => goGuided(exhibitIndex - 1, true)}
        onGuidedNext={() => goGuided(exhibitIndex + 1, true)}
      />}
    </section>
  </div>;
}
