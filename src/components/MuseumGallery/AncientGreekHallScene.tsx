import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from 'react';
import type {WebGLRenderer} from 'three';
import {ANCIENT_GREEK_HALL_LAYOUT} from '../../data/museum/ancientGreekHall';
import type {MuseumExhibitId} from '../../data/museumCatalog';
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
import {HallArchitecture} from './HallArchitecture';
import {MuseumExhibits} from './MuseumExhibits';

const colliders = [
  ...ANCIENT_GREEK_HALL_LAYOUT.wallColliders,
  ...ANCIENT_GREEK_HALL_LAYOUT.obstacleColliders,
];

class SceneErrorBoundary extends Component<{
  children: ReactNode;
  onError: (error: unknown) => void;
}, {failed: boolean}> {
  state = {failed: false};

  static getDerivedStateFromError(): {failed: boolean} {
    return {failed: true};
  }

  componentDidCatch(error: unknown, _info: ErrorInfo): void {
    this.props.onError(error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function FirstPersonRig({
  active,
  blocked,
  inputRef,
  poseRef,
  onNearbyChange,
  onNearbyVisualChange,
}: Pick<
  MuseumSceneRuntimeProps,
  'active' | 'blocked' | 'inputRef' | 'poseRef' | 'onNearbyChange'
> & {onNearbyVisualChange: (id: MuseumExhibitId | undefined) => void}) {
  const {camera, invalidate} = useThree();
  const lastNearbyRef = useRef<MuseumExhibitId | undefined>(undefined);
  const displacementRef = useRef({x: 0, z: 0});

  const applyPose = useCallback(() => {
    const pose = poseRef.current;
    camera.position.set(pose.x, ANCIENT_GREEK_HALL_LAYOUT.eyeHeight, pose.z);
    camera.rotation.order = 'YXZ';
    camera.rotation.set(pose.pitch, pose.yaw, 0);
    camera.updateMatrixWorld();
  }, [camera, poseRef]);

  const publishNearby = useCallback(() => {
    const next = nearestInteractable(poseRef.current, ANCIENT_GREEK_HALL_LAYOUT.exhibits);
    if (next === lastNearbyRef.current) return;
    lastNearbyRef.current = next;
    onNearbyVisualChange(next);
    onNearbyChange(next);
  }, [onNearbyChange, onNearbyVisualChange, poseRef]);

  useEffect(() => {
    applyPose();
    publishNearby();
    invalidate();
  }, [applyPose, invalidate, publishNearby]);

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
      const delta = clampFrameDelta(rawDelta, .05);
      const speed = 3.75;
      const displacement = displacementRef.current;
      setMuseumMovementDisplacement(displacement, direction, pose.yaw, speed * delta);
      const next = moveWithCollisions(
        pose,
        displacement,
        ANCIENT_GREEK_HALL_LAYOUT.playerRadius,
        ANCIENT_GREEK_HALL_LAYOUT.bounds,
        colliders,
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

function GalleryScene(props: MuseumSceneRuntimeProps & {
  lowPower: boolean;
}) {
  const [nearbyId, setNearbyId] = useState<MuseumExhibitId | undefined>();
  return <>
    <color attach="background" args={['#40372d']}/>
    <fog attach="fog" args={['#40372d', 26, 76]}/>
    <hemisphereLight args={['#f4e0bc', '#332b24', .72]}/>
    <ambientLight intensity={.18}/>
    <directionalLight
      position={[5, 10, 14]}
      intensity={1.35}
      color="#ffe2b2"
      castShadow={false}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-left={-11}
      shadow-camera-right={11}
      shadow-camera-top={16}
      shadow-camera-bottom={-16}
      shadow-camera-near={1}
      shadow-camera-far={42}
    />
    <pointLight position={[0, 5.8, 18]} color="#d8a85c" intensity={18} distance={18} decay={2}/>
    <pointLight position={[0, 5.8, -3]} color="#c88b50" intensity={15} distance={19} decay={2}/>
    <pointLight position={[0, 5.8, -24]} color="#9a82c7" intensity={17} distance={16} decay={2}/>
    <HallArchitecture/>
    <MuseumExhibits nearbyId={nearbyId} onSelectExhibit={props.onSelectExhibit}/>
    <FirstPersonRig
      active={props.active}
      blocked={props.blocked}
      inputRef={props.inputRef}
      poseRef={props.poseRef}
      onNearbyChange={props.onNearbyChange}
      onNearbyVisualChange={setNearbyId}
    />
  </>;
}

export function AncientGreekHallScene(props: MuseumSceneRuntimeProps) {
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
    try {
      props.onCanvasReady(canvas);
    } catch (error) {
      props.onSceneError(error);
    }
  }, [props]);

  const running = props.active && !props.blocked && documentVisible && inViewport;
  return <div
    ref={hostRef}
    className="museum-scene-host"
    style={{position: 'absolute', inset: 0, overflow: 'hidden'}}
  >
    <SceneErrorBoundary onError={props.onSceneError}>
      <Canvas
        className="museum-scene-canvas"
        camera={{
          position: [props.poseRef.current.x, ANCIENT_GREEK_HALL_LAYOUT.eyeHeight, props.poseRef.current.z],
          fov: 68,
          near: .08,
          far: 90,
        }}
        dpr={lowPower ? [1, 1.25] : [1, 1.5]}
        frameloop={running ? 'always' : 'demand'}
        gl={{antialias: !lowPower, alpha: false, powerPreference: lowPower ? 'low-power' : 'high-performance'}}
        shadows={false}
        onCreated={onCreated}
      >
        <GalleryScene {...props} lowPower={lowPower}/>
      </Canvas>
    </SceneErrorBoundary>
  </div>;
}
