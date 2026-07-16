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
import type {MuseumExhibitRef, MuseumInteractionTarget} from '../../data/museum/museumWorldTypes';
import {
  getMuseumConnectionTargetHallId,
  getMuseumNodeConnections,
  getMuseumRuntimeNode,
} from '../../data/museum/museumBuildingRuntime';
import {MUSEUM_BUILDING_MANIFEST} from '../../data/museum/museumBuildingManifest';
import {visitorMapInteractionAtPose} from '../../data/museum/museumVisitorMap';
import {getMuseumHallCatalog, type MuseumHallId} from '../../data/museumCatalog';
import {
  clampFrameDelta,
  clampPitch,
  moveWithCollisions,
  nearestInteractable,
  normalizeMoveInput,
  normalizeYaw,
  setMuseumMovementDisplacement,
} from './museumMovement';
import type {MuseumSceneRuntimeProps} from './museumRuntime';
import {loadMuseumHallContent, type MuseumHallRegistration} from './museumWorldRegistry';
import {museumPoseToWorld} from './museumWorldTransform';
import {museumConnectionAtPose, museumConnectionCrossed} from './museumHallTransitions';
import {MuseumBuildingArchitecture} from './MuseumBuildingArchitecture';
import {usePlaqueTexture} from './plaqueTextures';

function DoorReadinessGate({title, entrance}: {
  title: string;
  entrance: MuseumSceneRuntimeProps['definition']['entrances'][number];
}) {
  const texture = usePlaqueTexture({
    title: 'Gallery preparing',
    kicker: title,
    subtitle: 'Approach this doorway to prepare the gallery · alternate Ring routes remain open',
    accent: '#8b6b43',
    width: 1200,
    height: 320,
  });
  const acrossX = Math.abs(entrance.inwardNormal.z) > .5;
  const clearWidth = acrossX ? entrance.transitionBounds.size.width : entrance.transitionBounds.size.depth;
  const rotation = acrossX
    ? (entrance.inwardNormal.z > 0 ? 0 : Math.PI)
    : (entrance.inwardNormal.x > 0 ? Math.PI / 2 : -Math.PI / 2);
  return <group position={[entrance.position.x, 0, entrance.position.z]} rotation={[0, rotation, 0]}>
    <mesh position={[0, 1.56, 0]}>
      <boxGeometry args={[clearWidth, 3.12, .1]}/>
      <meshStandardMaterial color="#d8d1c4" roughness={.88}/>
    </mesh>
    <mesh position={[0, 1.86, .056]}>
      <planeGeometry args={[Math.max(2.7, clearWidth - .45), .76]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
  </group>;
}

function MuseumReadinessGates({definition, readyHallIds}: Pick<MuseumSceneRuntimeProps, 'definition' | 'readyHallIds'>) {
  const ready = new Set(readyHallIds);
  const gates = getMuseumNodeConnections(definition.id).flatMap((connection) => {
    const hallId = getMuseumConnectionTargetHallId(connection);
    const entrance = definition.entrances.find(({id}) => id === connection.localEntranceId);
    if (!hallId || ready.has(hallId) || !entrance) return [];
    return [{id: connection.id, title: getMuseumHallCatalog(hallId)?.title ?? 'Connected gallery', entrance}];
  });
  if (!gates.length) return null;
  return <group position={[definition.worldTransform.x, 0, definition.worldTransform.z]} rotation={[0, definition.worldTransform.yaw, 0]}>
    {gates.map((gate) => <DoorReadinessGate key={gate.id} title={gate.title} entrance={gate.entrance}/>)}
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
  hallId: MuseumHallId;
  onError: MuseumSceneRuntimeProps['onHallContentError'];
}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError(): {failed: boolean} { return {failed: true}; }
  componentDidCatch(error: unknown): void { this.props.onError(this.props.hallId, error); }
  render() { return this.state.failed ? null : this.props.children; }
}

function MuseumPlayerRig({
  definition,
  active,
  blocked,
  poseRevision,
  inputRef,
  poseRef,
  onNearbyInteractionChange,
  onNearbyVisualChange,
  readyHallIds,
  onNodeTransition,
  onNodeTransitionBlocked,
  onApproachHall,
}: Pick<
  MuseumSceneRuntimeProps,
  'definition' | 'active' | 'blocked' | 'poseRevision' | 'inputRef' | 'poseRef' | 'onNearbyInteractionChange'
  | 'readyHallIds' | 'onNodeTransition' | 'onNodeTransitionBlocked' | 'onApproachHall'
> & {onNearbyVisualChange: (target: MuseumInteractionTarget | undefined) => void}) {
  const {camera, invalidate} = useThree();
  const lastNearbyRef = useRef<MuseumInteractionTarget | undefined>(undefined);
  const displacementRef = useRef({x: 0, z: 0});
  const transitionLatchRef = useRef<string | undefined>(undefined);
  const transitionTargetRef = useRef<string | undefined>(undefined);
  const blockedTransitionLatchRef = useRef<string | undefined>(undefined);
  const layout = definition.layout;
  const readyHallSet = useMemo(() => new Set<MuseumHallId>(readyHallIds), [readyHallIds]);
  const approachedHallRef = useRef<MuseumHallId | undefined>(undefined);
  const colliders = useMemo(
    () => [...layout.wallColliders, ...layout.obstacleColliders],
    [layout],
  );

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
    const exhibitId = visitorMap ? undefined : nearestInteractable(poseRef.current, layout.exhibits);
    const next: MuseumInteractionTarget | undefined = visitorMap
      ?? (hallId && exhibitId ? {kind: 'exhibit', hallId, exhibitId} : undefined);
    const nextKey = next?.kind === 'exhibit' ? `${next.kind}:${next.hallId}:${next.exhibitId}` : next ? `${next.kind}:${next.hallId}:${next.kioskId}` : '';
    const previous = lastNearbyRef.current;
    const previousKey = previous?.kind === 'exhibit' ? `${previous.kind}:${previous.hallId}:${previous.exhibitId}` : previous ? `${previous.kind}:${previous.hallId}:${previous.kioskId}` : '';
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
    const previousPosition = {x: pose.x, z: pose.z};
    let changed = false;
    let moved = false;

    if (input.lookX || input.lookY) {
      pose.yaw = normalizeYaw(pose.yaw - input.lookX * .00235);
      pose.pitch = clampPitch(pose.pitch - input.lookY * .0021);
      input.lookX = 0;
      input.lookY = 0;
      changed = true;
    }

    if (input.forward || input.strafe) {
      const direction = normalizeMoveInput(input.strafe, input.forward);
      const displacement = displacementRef.current;
      setMuseumMovementDisplacement(displacement, direction, pose.yaw, 3.75 * clampFrameDelta(rawDelta, .05));
      const next = moveWithCollisions(
        pose,
        displacement,
        layout.playerRadius,
        layout.bounds,
        colliders,
        layout.spatialCells,
      );
      pose.x = next.x;
      pose.z = next.z;
      changed = true;
      moved = true;
    }

    if (!changed) return;
    let approachedHallId: MuseumHallId | undefined;
    let approachedDistance = Number.POSITIVE_INFINITY;
    for (const candidate of getMuseumNodeConnections(definition.id)) {
      const entrance = definition.entrances.find(({id}) => id === candidate.localEntranceId);
      const targetHallId = getMuseumConnectionTargetHallId(candidate);
      if (!entrance || !targetHallId) continue;
      const distance = Math.hypot(pose.x - entrance.position.x, pose.z - entrance.position.z);
      if (distance <= MUSEUM_BUILDING_MANIFEST.residencyPolicy.approachDistance && distance < approachedDistance) {
        approachedDistance = distance;
        approachedHallId = targetHallId;
      }
    }
    if (approachedHallRef.current !== approachedHallId) {
      approachedHallRef.current = approachedHallId;
      onApproachHall(approachedHallId);
    }
    const connection = moved
      ? museumConnectionCrossed(definition, previousPosition, pose)
      : undefined;
    if (connection) {
      const targetNode = getMuseumRuntimeNode(connection.targetNodeId);
      const targetReady = Boolean(targetNode && (!targetNode.publicHallId || readyHallSet.has(targetNode.publicHallId)));
      if (targetReady) {
        if (transitionLatchRef.current !== connection.id) {
          transitionLatchRef.current = connection.id;
          transitionTargetRef.current = connection.targetNodeId;
          if (!onNodeTransition(connection)) {
            transitionTargetRef.current = undefined;
            transitionLatchRef.current = undefined;
            pose.x = previousPosition.x;
            pose.z = previousPosition.z;
            applyPose();
            publishNearby();
            if (input.forward || input.strafe || input.lookX || input.lookY) invalidate();
          }
        }
        return;
      }
      // Keep the visitor on the inward side of an unready threshold. Holding
      // movement can then produce a fresh signed-plane crossing as soon as the
      // adjacent hall becomes ready, without asking the visitor to backtrack.
      pose.x = previousPosition.x;
      pose.z = previousPosition.z;
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
  visitorMapNearby,
  onSelectExhibit,
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
  visitorMapNearby: boolean;
  onSelectExhibit: MuseumSceneRuntimeProps['onSelectExhibit'];
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
  return <HallContentErrorBoundary hallId={registration.definition.id} onError={onHallContentError}>
    <Suspense fallback={null}>
      <HallContent
        definition={registration.definition}
        active={active}
        entryEntranceId={entryEntranceId}
        nearby={nearby}
        visitorMapNearby={visitorMapNearby}
        onSelectExhibit={onSelectExhibit}
        onSelectVisitorMap={onSelectVisitorMap}
        onSceneGesture={onSceneGesture}
      />
      <HallRenderedSignal
        hallId={registration.definition.id}
        onReady={onHallContentReady}
        onUnavailable={onHallContentUnavailable}
      />
    </Suspense>
  </HallContentErrorBoundary>;
}

function HallRenderedSignal({hallId, onReady, onUnavailable}: {
  hallId: MuseumHallId;
  onReady: MuseumSceneRuntimeProps['onHallContentReady'];
  onUnavailable: MuseumSceneRuntimeProps['onHallContentUnavailable'];
}) {
  useLayoutEffect(() => {
    onReady(hallId);
    return () => onUnavailable(hallId);
  }, [hallId, onReady, onUnavailable]);
  return null;
}

function MuseumWorldContents(props: MuseumSceneRuntimeProps) {
  const [nearbyTarget, setNearbyTarget] = useState<MuseumInteractionTarget | undefined>();
  const nearby = nearbyTarget?.kind === 'exhibit'
    ? {hallId: nearbyTarget.hallId, exhibitId: nearbyTarget.exhibitId}
    : undefined;
  const visitorMapNearby = nearbyTarget?.kind === 'visitor-map';
  const activeHallLighting = props.registrations.find(({definition}) => definition.id === props.definition.publicHallId)?.definition.layout.lighting;
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
    <MuseumReadinessGates definition={props.definition} readyHallIds={props.readyHallIds}/>
    {props.registrations.map((registration) => <LoadedHall
      key={`${registration.definition.id}-${props.hallContentEpochs[registration.definition.id] ?? 0}`}
      registration={registration}
      active={registration.definition.id === props.definition.publicHallId}
      entryEntranceId={connectedEntranceByHallId.get(registration.definition.id)}
      nearby={nearby}
      visitorMapNearby={visitorMapNearby}
      onSelectExhibit={props.onSelectExhibit}
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
      readyHallIds={props.readyHallIds}
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
