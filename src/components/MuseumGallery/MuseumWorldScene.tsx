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
import type {MuseumHallRegistration} from './museumWorldRegistry';
import {museumPoseToWorld} from './museumWorldTransform';

class WorldSceneErrorBoundary extends Component<{
  children: ReactNode;
  onError: (error: unknown) => void;
}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError(): {failed: boolean} { return {failed: true}; }
  componentDidCatch(error: unknown, _info: ErrorInfo): void { this.props.onError(error); }
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
}: Pick<
  MuseumSceneRuntimeProps,
  'definition' | 'active' | 'blocked' | 'poseRevision' | 'inputRef' | 'poseRef' | 'onNearbyChange'
> & {onNearbyVisualChange: (exhibit: MuseumExhibitRef | undefined) => void}) {
  const {camera, invalidate} = useThree();
  const lastNearbyRef = useRef<MuseumExhibitRef | undefined>(undefined);
  const displacementRef = useRef({x: 0, z: 0});
  const layout = definition.layout;
  const colliders = useMemo(
    () => [...layout.wallColliders, ...layout.obstacleColliders],
    [layout],
  );

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
    let changed = false;

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
    }

    if (!changed) return;
    applyPose();
    publishNearby();
  });
  return null;
}

function MuseumWorldContents({
  registration,
  ...props
}: MuseumSceneRuntimeProps & {registration: MuseumHallRegistration}) {
  const [nearby, setNearby] = useState<MuseumExhibitRef | undefined>();
  const HallContent = useMemo(() => lazy(registration.loadContent), [registration]);
  return <>
    <Suspense fallback={null}>
      <HallContent
        definition={props.definition}
        nearby={nearby}
        onSelectExhibit={props.onSelectExhibit}
        onSceneGesture={props.onSceneGesture}
      />
    </Suspense>
    <MuseumPlayerRig
      definition={props.definition}
      active={props.active}
      blocked={props.blocked}
      poseRevision={props.poseRevision}
      inputRef={props.inputRef}
      poseRef={props.poseRef}
      onNearbyChange={props.onNearbyChange}
      onNearbyVisualChange={setNearby}
    />
  </>;
}

/** Owns the one Museum Canvas. Exhibit and future hall route changes must not key this component. */
export function MuseumWorldScene(props: MuseumSceneRuntimeProps & {registration: MuseumHallRegistration}) {
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

  const running = props.active && !props.blocked && documentVisible && inViewport;
  const layout = props.definition.layout;
  const initialCameraPose = museumPoseToWorld(props.definition, props.poseRef.current);
  return <div ref={hostRef} className="museum-scene-host" style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
    <WorldSceneErrorBoundary onError={props.onSceneError}>
      <Canvas
        className="museum-scene-canvas"
        camera={{position: [initialCameraPose.x, layout.eyeHeight, initialCameraPose.z], fov: layout.cameraFov, near: .08, far: layout.cameraFar}}
        dpr={lowPower ? [1, 1.25] : [1, 1.5]}
        frameloop={running ? 'always' : 'demand'}
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
