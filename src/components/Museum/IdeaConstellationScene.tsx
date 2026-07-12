import {Line, Stars} from '@react-three/drei';
import {Canvas, useFrame} from '@react-three/fiber';
import {useEffect, useRef, useState} from 'react';
import type {Group} from 'three';

const points: [number, number, number][] = [
  [-3, 1, 0],
  [-1, -1, 0],
  [1, 1.5, 0],
  [3, -.5, 0],
  [0, 0, 0],
];

function Scene() {
  const ref = useRef<Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * .015;
  });
  return <group ref={ref}>
    {points.map((point, index) => <mesh key={index} position={point}>
      <sphereGeometry args={[index === 4 ? .12 : .06, 16, 16]}/>
      <meshBasicMaterial color={index === 4 ? '#d99b5b' : '#8da6d9'}/>
    </mesh>)}
    <Line points={points} color="#596887" transparent opacity={.35}/>
  </group>;
}

export default function IdeaConstellationScene() {
  const [visible, setVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const onVisibilityChange = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  return <Canvas
    camera={{position: [0, 0, 7]}}
    dpr={[1, 1.5]}
    frameloop={visible ? 'always' : 'never'}
    gl={{powerPreference: 'low-power'}}
  >
    <Stars radius={20} depth={10} count={300} factor={1.5} fade speed={.2}/>
    <Scene/>
  </Canvas>;
}
