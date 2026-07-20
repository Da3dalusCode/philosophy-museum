import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from 'react';
import {PerspectiveCamera, type WebGLRenderer} from 'three';
import type {
  MuseumExhibitRef,
  MuseumInteractionTarget,
  MuseumSupplementalExhibitRef,
} from '../../data/museum/museumWorldTypes';
import {
  getMuseumConnectionTargetHallId,
  getMuseumNodeConnections,
  getMuseumRuntimeNode,
} from '../../data/museum/museumBuildingRuntime';
import {MUSEUM_BUILDING_MANIFEST} from '../../data/museum/museumBuildingManifest';
import {visitorMapInteractionAtPose} from '../../data/museum/museumVisitorMap';
import {MUSEUM_TEXTURE_SPECS} from '../../data/museum/museumTexturePolicy';
import {getMuseumHallCatalog, type MuseumPublicHallId} from '../../data/museumCatalog';
import {
  clampPitch,
  nearestInteractableItem,
  normalizeYaw,
} from './museumMovement';
import {
  museumHallEntryReadinessKey,
  MUSEUM_READINESS_GATE_CONFIG,
  MUSEUM_READINESS_PRESENTATIONS,
  resolveMuseumHallRenderedReadinessKeys,
  resolveMuseumReadinessGateGeometry,
  resolveMuseumReadinessGateStatus,
  type MuseumHallLoadStatus,
  type MuseumSceneRuntimeProps,
} from './museumRuntime';
import {loadMuseumHallContent, type MuseumHallRegistration} from './museumWorldRegistry';
import {museumPoseToWorld} from './museumWorldTransform';
import {advanceMuseumPhysicalFrame, museumConnectionAtPose} from './museumHallTransitions';
import {MuseumBuildingArchitecture} from './MuseumBuildingArchitecture';
import {usePlaqueTexture} from './plaqueTextures';

function DoorReadinessGate({title, entrance, status}: {
  title: string;
  entrance: MuseumSceneRuntimeProps['definition']['entrances'][number];
  status: Exclude<MuseumHallLoadStatus, 'ready'>;
}) {
  const presentation = MUSEUM_READINESS_PRESENTATIONS[status];
  const geometry = resolveMuseumReadinessGateGeometry(entrance);
  const texture = usePlaqueTexture({
    title: presentation.title,
    kicker: title,
    subtitle: presentation.subtitle,
    accent: presentation.accent,
    width: MUSEUM_TEXTURE_SPECS.readinessSign.width,
    height: MUSEUM_TEXTURE_SPECS.readinessSign.height,
  });
  return <group
    position={[entrance.position.x, 0, entrance.position.z]}
    rotation={[0, geometry.rotation, 0]}
    userData={{museumReadinessGate: true, status, nonOccluding: true}}
  >
    <mesh position={[0, MUSEUM_READINESS_GATE_CONFIG.threshold.centerY, MUSEUM_READINESS_GATE_CONFIG.threshold.centerZ]} userData={{readinessThreshold: true}}>
      <boxGeometry args={[geometry.thresholdWidth, MUSEUM_READINESS_GATE_CONFIG.threshold.height, MUSEUM_READINESS_GATE_CONFIG.threshold.depth]}/>
      <meshBasicMaterial color={presentation.accent} toneMapped={false}/>
    </mesh>
    {[-geometry.stanchionOffset, geometry.stanchionOffset].map((x) => <group key={x} position={[x, 0, MUSEUM_READINESS_GATE_CONFIG.stanchion.centerZ]}>
      <mesh position={[0, MUSEUM_READINESS_GATE_CONFIG.stanchion.postCenterY, 0]}>
        <cylinderGeometry args={[
          MUSEUM_READINESS_GATE_CONFIG.stanchion.postTopRadius,
          MUSEUM_READINESS_GATE_CONFIG.stanchion.postBottomRadius,
          MUSEUM_READINESS_GATE_CONFIG.stanchion.postHeight,
          12,
        ]}/>
        <meshStandardMaterial color="#272827" metalness={.72} roughness={.34}/>
      </mesh>
      <mesh position={[0, MUSEUM_READINESS_GATE_CONFIG.stanchion.markerCenterY, 0]}>
        <sphereGeometry args={[MUSEUM_READINESS_GATE_CONFIG.stanchion.markerRadius, 12, 8]}/>
        <meshBasicMaterial color={presentation.accent} toneMapped={false}/>
      </mesh>
    </group>)}
    <mesh position={[geometry.plaqueX, MUSEUM_READINESS_GATE_CONFIG.plaque.centerY, MUSEUM_READINESS_GATE_CONFIG.plaque.backingCenterZ]}>
      <boxGeometry args={[
        geometry.plaqueWidth + MUSEUM_READINESS_GATE_CONFIG.plaque.backingPadding,
        geometry.plaqueHeight + MUSEUM_READINESS_GATE_CONFIG.plaque.backingPadding,
        MUSEUM_READINESS_GATE_CONFIG.plaque.backingDepth,
      ]}/>
      <meshStandardMaterial color="#202120" roughness={.42} metalness={.5}/>
    </mesh>
    <mesh position={[geometry.plaqueX, MUSEUM_READINESS_GATE_CONFIG.plaque.centerY, MUSEUM_READINESS_GATE_CONFIG.plaque.planeCenterZ]}>
      <planeGeometry args={[geometry.plaqueWidth, geometry.plaqueHeight]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
  </group>;
}

function MuseumReadinessGates({definition, readyHallEntryKeys, hallEntryLoadStatus}: Pick<MuseumSceneRuntimeProps, 'definition' | 'readyHallEntryKeys' | 'hallEntryLoadStatus'>) {
  const ready = new Set(readyHallEntryKeys);
  const gates = getMuseumNodeConnections(definition.id).flatMap((connection) => {
    const hallId = getMuseumConnectionTargetHallId(connection);
    const entrance = definition.entrances.find(({id}) => id === connection.localEntranceId);
    if (!hallId || !entrance) return [];
    const readinessKey = museumHallEntryReadinessKey(hallId, connection.targetEntranceId);
    const status = resolveMuseumReadinessGateStatus(
      hallEntryLoadStatus[readinessKey],
      ready.has(readinessKey),
    );
    if (!status) return [];
    return [{
      id: connection.id,
      title: getMuseumHallCatalog(hallId)?.title ?? 'Connected gallery',
      entrance,
      status,
    }];
  });
  if (!gates.length) return null;
  return <group position={[definition.worldTransform.x, 0, definition.worldTransform.z]} rotation={[0, definition.worldTransform.yaw, 0]}>
    {gates.map((gate) => <DoorReadinessGate key={gate.id} title={gate.title} entrance={gate.entrance} status={gate.status}/>)}
  </group>;
}

class WorldSceneErrorBoundary extends Component<{
  children: ReactNode;
  onError: (error: unknown) => void;
}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError(): {failed: boolean} { return {failed: true}; }
  componentDidCatch(error: unknown, _info: ErrorInfo): void { this.props.onError(error); }
  render() { return this.state.failed ? null : this.props.children; }
}

class HallContentErrorBoundary extends Component<{
  children: ReactNode;
  hallId: MuseumPublicHallId;
  onError: MuseumSceneRuntimeProps['onHallContentError'];
}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError(): {failed: boolean} { return {failed: true}; }
  componentDidCatch(error: unknown): void { this.props.onError(this.props.hallId, error); }
  render() { return this.state.failed ? null : this.props.children; }
}

const interactionTargetKey = (target: MuseumInteractionTarget | undefined): string => {
  if (!target) return '';
  if (target.kind === 'exhibit') return `${target.kind}:${target.hallId}:${target.exhibitId}`;
  if (target.kind === 'supplemental-exhibit') return `${target.kind}:${target.hallId}:${target.supplementalExhibitId}`;
  return `${target.kind}:${target.hallId}:${target.kioskId}`;
};

function MuseumPlayerRig({
  definition,
  active,
  blocked,
  poseRevision,
  inputRef,
  poseRef,
  onNearbyInteractionChange,
  onNearbyVisualChange,
  readyHallEntryKeys,
  onNodeTransition,
  onNodeTransitionBlocked,
  onApproachHall,
}: Pick<
  MuseumSceneRuntimeProps,
  'definition' | 'active' | 'blocked' | 'poseRevision' | 'inputRef' | 'poseRef' | 'onNearbyInteractionChange'
  | 'readyHallEntryKeys' | 'onNodeTransition' | 'onNodeTransitionBlocked' | 'onApproachHall'
> & {onNearbyVisualChange: (target: MuseumInteractionTarget | undefined) => void}) {
  const {camera, invalidate} = useThree();
  const lastNearbyRef = useRef<MuseumInteractionTarget | undefined>(undefined);
  const transitionLatchRef = useRef<string | undefined>(undefined);
  const transitionTargetRef = useRef<string | undefined>(undefined);
  const blockedTransitionLatchRef = useRef<string | undefined>(undefined);
  const layout = definition.layout;
  const readyHallEntrySet = useMemo(() => new Set(readyHallEntryKeys), [readyHallEntryKeys]);
  const approachedHallRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const requestFrame = () => invalidate();
    inputRef.current.requestFrame = requestFrame;
    return () => {
      if (inputRef.current.requestFrame === requestFrame) delete inputRef.current.requestFrame;
    };
  }, [inputRef, invalidate]);

  useEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) return;
    camera.fov = layout.cameraFov;
    camera.near = .08;
    camera.far = layout.cameraFar;
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, invalidate, layout.cameraFar, layout.cameraFov]);

  const applyPose = useCallback(() => {
    const pose = poseRef.current;
    const worldPose = museumPoseToWorld(definition, pose);
    camera.position.set(worldPose.x, layout.eyeHeight, worldPose.z);
    camera.rotation.order = 'YXZ';
    camera.rotation.set(worldPose.pitch, worldPose.yaw, 0);
    camera.updateMatrixWorld();
  }, [camera, definition, layout.eyeHeight, poseRef]);

  const publishNearby = useCallback(() => {
    const hallId = definition.publicHallId;
    const visitorMap = hallId ? visitorMapInteractionAtPose(hallId, poseRef.current) : undefined;
    const primary = visitorMap ? undefined : nearestInteractableItem(poseRef.current, layout.exhibits);
    const supplemental = visitorMap ? undefined : nearestInteractableItem(poseRef.current, layout.supplementalExhibits ?? []);
    const primaryDistance = primary
      ? Math.hypot(poseRef.current.x - primary.position.x, poseRef.current.z - primary.position.z)
      : Number.POSITIVE_INFINITY;
    const supplementalDistance = supplemental
      ? Math.hypot(poseRef.current.x - supplemental.position.x, poseRef.current.z - supplemental.position.z)
      : Number.POSITIVE_INFINITY;
    const next: MuseumInteractionTarget | undefined = visitorMap
      ?? (hallId && supplemental && supplementalDistance < primaryDistance
        ? {kind: 'supplemental-exhibit', hallId, supplementalExhibitId: supplemental.id}
        : hallId && primary
          ? {kind: 'exhibit', hallId, exhibitId: primary.id}
          : undefined);
    const nextKey = interactionTargetKey(next);
    const previous = lastNearbyRef.current;
    const previousKey = interactionTargetKey(previous);
    if (nextKey === previousKey) return;
    lastNearbyRef.current = next;
    onNearbyVisualChange(next);
    onNearbyInteractionChange(next);
  }, [definition.publicHallId, layout.exhibits, onNearbyInteractionChange, onNearbyVisualChange, poseRef]);

  useEffect(() => {
    void poseRevision;
    transitionLatchRef.current = undefined;
    blockedTransitionLatchRef.current = undefined;
    applyPose();
    publishNearby();
    invalidate();
  }, [applyPose, invalidate, poseRevision, publishNearby]);

  useEffect(() => {
    if (active && !blocked) return;
    const input = inputRef.current;
    input.forward = 0;
    input.strafe = 0;
    input.lookX = 0;
    input.lookY = 0;
    applyPose();
    publishNearby();
    invalidate();
  }, [active, applyPose, blocked, inputRef, invalidate, publishNearby]);

  useFrame((_state, rawDelta) => {
    if (!active || blocked) return;
    // The target node is committed after the crossing frame returns. Do not
    // let the source rig reinterpret its resolved arrival as source-local data.
    const transitionTargetId = transitionTargetRef.current;
    if (transitionTargetId) {
      if (transitionTargetId !== definition.id) return;
      transitionTargetRef.current = undefined;
    }
    const input = inputRef.current;
    const pose = poseRef.current;
    let changed = false;
    let physicalFrame: ReturnType<typeof advanceMuseumPhysicalFrame> | undefined;

    if (input.lookX || input.lookY) {
      pose.yaw = normalizeYaw(pose.yaw - input.lookX * .00235);
      pose.pitch = clampPitch(pose.pitch - input.lookY * .0021);
      input.lookX = 0;
      input.lookY = 0;
      changed = true;
    }

    if (input.forward || input.strafe) {
      physicalFrame = advanceMuseumPhysicalFrame({
        definition,
        pose,
        input,
        rawDelta,
        readyHallEntryKeys: readyHallEntrySet,
      });
      pose.x = physicalFrame.pose.x;
      pose.z = physicalFrame.pose.z;
      changed = true;
    }

    if (!changed) return;
    let approachedHall: {hallId: MuseumPublicHallId; entranceId: string} | undefined;
    let approachedDistance = Number.POSITIVE_INFINITY;
    for (const candidate of getMuseumNodeConnections(definition.id)) {
      const entrance = definition.entrances.find(({id}) => id === candidate.localEntranceId);
      const targetHallId = getMuseumConnectionTargetHallId(candidate);
      if (!entrance || !targetHallId) continue;
      const distance = Math.hypot(pose.x - entrance.position.x, pose.z - entrance.position.z);
      if (distance <= MUSEUM_BUILDING_MANIFEST.residencyPolicy.approachDistance && distance < approachedDistance) {
        approachedDistance = distance;
        approachedHall = {hallId: targetHallId, entranceId: candidate.targetEntranceId};
      }
    }
    const approachedKey = approachedHall
      ? museumHallEntryReadinessKey(approachedHall.hallId, approachedHall.entranceId)
      : undefined;
    if (approachedHallRef.current !== approachedKey) {
      approachedHallRef.current = approachedKey;
      onApproachHall(approachedHall);
    }
    if (physicalFrame?.kind === 'transition') {
      const {connection} = physicalFrame.transition;
      if (transitionLatchRef.current !== connection.id) {
        transitionLatchRef.current = connection.id;
        transitionTargetRef.current = connection.targetNodeId;
        if (!onNodeTransition(physicalFrame.transition)) {
          transitionTargetRef.current = undefined;
          transitionLatchRef.current = undefined;
          pose.x = physicalFrame.previousPose.x;
          pose.z = physicalFrame.previousPose.z;
          applyPose();
          publishNearby();
          if (input.forward || input.strafe || input.lookX || input.lookY) invalidate();
        }
      }
      return;
    }
    if (physicalFrame?.kind === 'blocked') {
      const {connection} = physicalFrame;
      // Keep the visitor on the inward side of an unready threshold. Holding
      // movement can then produce a fresh signed-plane crossing as soon as the
      // adjacent hall becomes ready, without asking the visitor to backtrack.
      if (blockedTransitionLatchRef.current !== connection.id) {
        blockedTransitionLatchRef.current = connection.id;
        onNodeTransitionBlocked(connection);
      }
    } else if (!museumConnectionAtPose(definition, pose)) {
      transitionLatchRef.current = undefined;
      blockedTransitionLatchRef.current = undefined;
    }
    applyPose();
    publishNearby();
    if (input.forward || input.strafe || input.lookX || input.lookY) invalidate();
  });
  return null;
}

function LoadedHall({
  registration,
  active,
  entryEntranceId,
  nearby,
  nearbySupplemental,
  visitorMapNearby,
  onSelectExhibit,
  onSelectSupplementalExhibit,
  onSelectVisitorMap,
  onSceneGesture,
  onHallContentReady,
  onHallContentUnavailable,
  onHallContentError,
}: {
  registration: MuseumHallRegistration;
  active: boolean;
  entryEntranceId?: string;
  nearby?: MuseumExhibitRef;
  nearbySupplemental?: MuseumSupplementalExhibitRef;
  visitorMapNearby: boolean;
  onSelectExhibit: MuseumSceneRuntimeProps['onSelectExhibit'];
  onSelectSupplementalExhibit: MuseumSceneRuntimeProps['onSelectSupplementalExhibit'];
  onSelectVisitorMap: MuseumSceneRuntimeProps['onSelectVisitorMap'];
  onSceneGesture: MuseumSceneRuntimeProps['onSceneGesture'];
  onHallContentReady: MuseumSceneRuntimeProps['onHallContentReady'];
  onHallContentUnavailable: MuseumSceneRuntimeProps['onHallContentUnavailable'];
  onHallContentError: MuseumSceneRuntimeProps['onHallContentError'];
}) {
  const HallContent = useMemo(
    () => lazy(() => loadMuseumHallContent(registration.definition.id)!),
    [registration],
  );
  const readinessKeys = resolveMuseumHallRenderedReadinessKeys(
    registration.definition.id,
    active,
    entryEntranceId,
  );
  return <HallContentErrorBoundary hallId={registration.definition.id} onError={onHallContentError}>
    <Suspense fallback={null}>
      <HallContent
        definition={registration.definition}
        active={active}
        entryEntranceId={entryEntranceId}
        nearby={nearby}
        nearbySupplemental={nearbySupplemental}
        visitorMapNearby={visitorMapNearby}
        onSelectExhibit={onSelectExhibit}
        onSelectSupplementalExhibit={onSelectSupplementalExhibit}
        onSelectVisitorMap={onSelectVisitorMap}
        onSceneGesture={onSceneGesture}
      />
      {readinessKeys.map((readinessKey) => <HallRenderedSignal
        key={readinessKey}
        hallId={registration.definition.id}
        readinessKey={readinessKey}
        onReady={onHallContentReady}
        onUnavailable={onHallContentUnavailable}
      />)}
    </Suspense>
  </HallContentErrorBoundary>;
}

function HallRenderedSignal({hallId, readinessKey, onReady, onUnavailable}: {
  hallId: MuseumPublicHallId;
  readinessKey: string;
  onReady: MuseumSceneRuntimeProps['onHallContentReady'];
  onUnavailable: MuseumSceneRuntimeProps['onHallContentUnavailable'];
}) {
  useLayoutEffect(() => {
    onReady(hallId, readinessKey);
    return () => onUnavailable(hallId, readinessKey);
  }, [hallId, onReady, onUnavailable, readinessKey]);
  return null;
}

function MuseumWorldContents(props: MuseumSceneRuntimeProps) {
  const [nearbyTarget, setNearbyTarget] = useState<MuseumInteractionTarget | undefined>();
  const nearby = nearbyTarget?.kind === 'exhibit'
    ? {hallId: nearbyTarget.hallId, exhibitId: nearbyTarget.exhibitId}
    : undefined;
  const nearbySupplemental = nearbyTarget?.kind === 'supplemental-exhibit'
    ? {hallId: nearbyTarget.hallId, supplementalExhibitId: nearbyTarget.supplementalExhibitId}
    : undefined;
  const visitorMapNearby = nearbyTarget?.kind === 'visitor-map';
  // The public hall remains the lighting/content owner while the visitor is in
  // its connector. This prevents a hall from unloading or changing shade at
  // the physical seam before the next hall is actually entered.
  const activeHallLighting = props.registrations.find(({definition}) => definition.id === props.activeHallId)?.definition.layout.lighting;
  const hemisphereIntensity = activeHallLighting?.hemisphereIntensity ?? .64;
  const ambientIntensity = activeHallLighting?.ambientIntensity ?? .48;
  const connectedEntranceByHallId = useMemo(() => new Map(
    getMuseumNodeConnections(props.definition.id).flatMap((connection) => {
      const hallId = getMuseumConnectionTargetHallId(connection);
      return hallId ? [[hallId, connection.targetEntranceId] as const] : [];
    }),
  ), [props.definition.id]);
  return <>
    <color attach="background" args={['#d8d3ca']}/>
    <hemisphereLight args={['#fff8e8', '#48433d', hemisphereIntensity]}/>
    <ambientLight color="#fff5e5" intensity={ambientIntensity}/>
    <MuseumBuildingArchitecture onSceneGesture={props.onSceneGesture}/>
    <MuseumReadinessGates
      definition={props.definition}
      readyHallEntryKeys={props.readyHallEntryKeys}
      hallEntryLoadStatus={props.hallEntryLoadStatus}
    />
    {props.registrations.map((registration) => <LoadedHall
      key={`${registration.definition.id}-${props.hallContentEpochs[registration.definition.id] ?? 0}`}
      registration={registration}
      active={registration.definition.id === props.activeHallId}
      entryEntranceId={connectedEntranceByHallId.get(registration.definition.id)}
      nearby={nearby}
      nearbySupplemental={nearbySupplemental}
      visitorMapNearby={visitorMapNearby}
      onSelectExhibit={props.onSelectExhibit}
      onSelectSupplementalExhibit={props.onSelectSupplementalExhibit}
      onSelectVisitorMap={props.onSelectVisitorMap}
      onSceneGesture={props.onSceneGesture}
      onHallContentReady={props.onHallContentReady}
      onHallContentUnavailable={props.onHallContentUnavailable}
      onHallContentError={props.onHallContentError}
    />)}
    <MuseumPlayerRig
      definition={props.definition}
      active={props.active}
      blocked={props.blocked}
      poseRevision={props.poseRevision}
      inputRef={props.inputRef}
      poseRef={props.poseRef}
      onNearbyInteractionChange={props.onNearbyInteractionChange}
      onNearbyVisualChange={setNearbyTarget}
      readyHallEntryKeys={props.readyHallEntryKeys}
      onNodeTransition={props.onNodeTransition}
      onNodeTransitionBlocked={props.onNodeTransitionBlocked}
      onApproachHall={props.onApproachHall}
    />
  </>;
}

/** Owns the one Museum Canvas. Exhibit and future hall route changes must not key this component. */
export function MuseumWorldScene(props: MuseumSceneRuntimeProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const contextCleanupRef = useRef<(() => void) | undefined>(undefined);
  const [documentVisible, setDocumentVisible] = useState(() => !document.hidden);
  const [inViewport, setInViewport] = useState(true);
  const lowPower = useMemo(
    () => window.matchMedia('(pointer: coarse), (max-width: 760px)').matches,
    [],
  );

  useEffect(() => {
    const onVisibilityChange = () => setDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(Boolean(entry?.isIntersecting)),
      {rootMargin: '120px 0px', threshold: .01},
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => contextCleanupRef.current?.(), []);

  const onCreated = useCallback(({gl}: {gl: WebGLRenderer}) => {
    contextCleanupRef.current?.();
    const canvas = gl.domElement;
    const onContextLost = (event: Event) => {
      event.preventDefault();
      props.onSceneError(new Error('The Museum WebGL context was lost.'));
    };
    canvas.addEventListener('webglcontextlost', onContextLost);
    contextCleanupRef.current = () => canvas.removeEventListener('webglcontextlost', onContextLost);
    try { props.onCanvasReady(canvas); }
    catch (error) { props.onSceneError(error); }
  }, [props.onCanvasReady, props.onSceneError]);

  const renderable = documentVisible && inViewport;
  const layout = props.definition.layout;
  const initialCameraPose = museumPoseToWorld(props.definition, props.poseRef.current);
  return <div ref={hostRef} className="museum-scene-host" style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <WorldSceneErrorBoundary onError={props.onSceneError}>
      <Canvas
        className="museum-scene-canvas"
        camera={{position: [initialCameraPose.x, layout.eyeHeight, initialCameraPose.z], fov: layout.cameraFov, near: .08, far: layout.cameraFar}}
        dpr={lowPower ? [1, 1.25] : [1, 1.5]}
        frameloop={renderable ? 'demand' : 'never'}
        gl={{antialias: !lowPower, alpha: false, powerPreference: lowPower ? 'low-power' : 'high-performance'}}
        shadows={false}
        onCreated={onCreated}
        onPointerMissed={props.onSceneGesture}
      >
        <MuseumWorldContents {...props}/>
      </Canvas>
    </WorldSceneErrorBoundary>
  </div>;
}
