import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from 'react';
import type {WebGLRenderer} from 'three';
import type {MuseumExhibitRef} from '../../data/museum/museumWorldTypes';
import type {MuseumHallId} from '../../data/museumCatalog';
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
  onNearbyChange,
  onNearbyVisualChange,
  readyHallIds,
  onHallTransition,
  onHallTransitionBlocked,
}: Pick<
  MuseumSceneRuntimeProps,
  'definition' | 'active' | 'blocked' | 'poseRevision' | 'inputRef' | 'poseRef' | 'onNearbyChange'
  | 'readyHallIds' | 'onHallTransition' | 'onHallTransitionBlocked'
> & {onNearbyVisualChange: (exhibit: MuseumExhibitRef | undefined) => void}) {
  const {camera, invalidate} = useThree();
  const lastNearbyRef = useRef<MuseumExhibitRef | undefined>(undefined);
  const displacementRef = useRef({x: 0, z: 0});
  const transitionLatchRef = useRef<string | undefined>(undefined);
  const blockedTransitionLatchRef = useRef<string | undefined>(undefined);
  const layout = definition.layout;
  const readyHallSet = useMemo(() => new Set<MuseumHallId>(readyHallIds), [readyHallIds]);
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

  const applyPose = useCallback(() => {
    const pose = poseRef.current;
    const worldPose = museumPoseToWorld(definition, pose);
    camera.position.set(worldPose.x, layout.eyeHeight, worldPose.z);
    camera.rotation.order = 'YXZ';
    camera.rotation.set(worldPose.pitch, worldPose.yaw, 0);
    camera.updateMatrixWorld();
  }, [camera, definition, layout.eyeHeight, poseRef]);

  const publishNearby = useCallback(() => {
    const exhibitId = nearestInteractable(poseRef.current, layout.exhibits);
    const next = exhibitId ? {hallId: definition.id, exhibitId} : undefined;
    if (
      next?.hallId === lastNearbyRef.current?.hallId
      && next?.exhibitId === lastNearbyRef.current?.exhibitId
    ) return;
    lastNearbyRef.current = next;
    onNearbyVisualChange(next);
    onNearbyChange(next);
  }, [definition.id, layout.exhibits, onNearbyChange, onNearbyVisualChange, poseRef]);

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
    const connection = moved
      ? museumConnectionCrossed(definition, previousPosition, pose)
      : undefined;
    if (connection) {
      if (readyHallSet.has(connection.targetHallId)) {
        if (transitionLatchRef.current !== connection.id) {
          transitionLatchRef.current = connection.id;
          onHallTransition(connection);
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
        onHallTransitionBlocked(connection);
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
  nearby,
  onSelectExhibit,
  onSceneGesture,
  onHallContentError,
}: {
  registration: MuseumHallRegistration;
  active: boolean;
  nearby?: MuseumExhibitRef;
  onSelectExhibit: MuseumSceneRuntimeProps['onSelectExhibit'];
  onSceneGesture: MuseumSceneRuntimeProps['onSceneGesture'];
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
        nearby={nearby}
        onSelectExhibit={onSelectExhibit}
        onSceneGesture={onSceneGesture}
      />
    </Suspense>
  </HallContentErrorBoundary>;
}

function MuseumWorldContents(props: MuseumSceneRuntimeProps) {
  const [nearby, setNearby] = useState<MuseumExhibitRef | undefined>();
  const lighting = props.definition.layout.lighting;
  return <>
    <color attach="background" args={['#d8d3ca']}/>
    <hemisphereLight args={['#fff8e8', '#48433d', lighting.hemisphereIntensity]}/>
    <ambientLight color="#fff5e5" intensity={lighting.ambientIntensity}/>
    {props.registrations.map((registration) => <LoadedHall
      key={`${registration.definition.id}-${props.hallContentEpochs[registration.definition.id] ?? 0}`}
      registration={registration}
      active={registration.definition.id === props.definition.id}
      nearby={nearby}
      onSelectExhibit={props.onSelectExhibit}
      onSceneGesture={props.onSceneGesture}
      onHallContentError={props.onHallContentError}
    />)}
    <MuseumPlayerRig
      definition={props.definition}
      active={props.active}
      blocked={props.blocked}
      poseRevision={props.poseRevision}
      inputRef={props.inputRef}
      poseRef={props.poseRef}
      onNearbyChange={props.onNearbyChange}
      onNearbyVisualChange={setNearby}
      readyHallIds={props.readyHallIds}
      onHallTransition={props.onHallTransition}
      onHallTransitionBlocked={props.onHallTransitionBlocked}
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
