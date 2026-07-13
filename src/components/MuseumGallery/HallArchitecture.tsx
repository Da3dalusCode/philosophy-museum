import {useLayoutEffect, useRef} from 'react';
import {InstancedMesh, Object3D} from 'three';
import {
  ANCIENT_GREEK_HALL_COLUMN_POSITIONS,
  ANCIENT_GREEK_HALL_LAYOUT,
} from '../../data/museum/ancientGreekHall';
import {usePlaqueTexture} from './plaqueTextures';

const LIMESTONE = '#d2c9b6';
const LIMESTONE_DARK = '#8a8376';
const FLOOR = '#171b1b';
const BRONZE = '#80603f';
const IRON = '#0c1114';

function InstancedColumns() {
  const shafts = useRef<InstancedMesh>(null);
  const capitals = useRef<InstancedMesh>(null);
  const bases = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    const transform = new Object3D();
    ANCIENT_GREEK_HALL_COLUMN_POSITIONS.forEach(([x, z], index) => {
      transform.position.set(x, 3.25, z);
      transform.updateMatrix();
      shafts.current?.setMatrixAt(index, transform.matrix);
      transform.position.set(x, .24, z);
      transform.updateMatrix();
      bases.current?.setMatrixAt(index, transform.matrix);
      transform.position.set(x, 6.28, z);
      transform.updateMatrix();
      capitals.current?.setMatrixAt(index, transform.matrix);
    });
    if (shafts.current) shafts.current.instanceMatrix.needsUpdate = true;
    if (bases.current) bases.current.instanceMatrix.needsUpdate = true;
    if (capitals.current) capitals.current.instanceMatrix.needsUpdate = true;
  }, []);

  return <group>
    <instancedMesh ref={shafts} args={[undefined, undefined, ANCIENT_GREEK_HALL_COLUMN_POSITIONS.length]}>
      <cylinderGeometry args={[.34, .43, 5.75, 12]}/>
      <meshStandardMaterial color={LIMESTONE} roughness={.9}/>
    </instancedMesh>
    <instancedMesh ref={bases} args={[undefined, undefined, ANCIENT_GREEK_HALL_COLUMN_POSITIONS.length]}>
      <cylinderGeometry args={[.63, .72, .48, 12]}/>
      <meshStandardMaterial color={LIMESTONE_DARK} roughness={.92}/>
    </instancedMesh>
    <instancedMesh ref={capitals} args={[undefined, undefined, ANCIENT_GREEK_HALL_COLUMN_POSITIONS.length]}>
      <cylinderGeometry args={[.72, .48, .52, 8]}/>
      <meshStandardMaterial color={LIMESTONE_DARK} roughness={.9}/>
    </instancedMesh>
  </group>;
}

function WallSign({
  title,
  kicker,
  subtitle,
  position,
  width,
  accent,
}: {
  title: string;
  kicker: string;
  subtitle?: string;
  position: [number, number, number];
  width: number;
  accent: string;
}) {
  const texture = usePlaqueTexture({title, kicker, subtitle, accent});
  return <group position={position}>
    <mesh position={[0, 0, -.05]}>
      <boxGeometry args={[width + .24, width / 4 + .24, .12]}/>
      <meshStandardMaterial color={BRONZE} metalness={.55} roughness={.42}/>
    </mesh>
    <mesh position={[0, 0, .025]}>
      <planeGeometry args={[width, width / 4]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
  </group>;
}

function ZoneArch({z, title, period, accent}: {
  z: number;
  title: string;
  period: string;
  accent: string;
}) {
  return <group position={[0, 0, z]}>
    <mesh position={[-6.65, 3.55, 0]}>
      <boxGeometry args={[5.3, 7.1, .6]}/>
      <meshStandardMaterial color={LIMESTONE} roughness={.92}/>
    </mesh>
    <mesh position={[6.65, 3.55, 0]}>
      <boxGeometry args={[5.3, 7.1, .6]}/>
      <meshStandardMaterial color={LIMESTONE} roughness={.92}/>
    </mesh>
    <mesh position={[0, 7.15, 0]}>
      <boxGeometry args={[8, 1.7, .7]}/>
      <meshStandardMaterial color={LIMESTONE_DARK} roughness={.9}/>
    </mesh>
    <WallSign
      title={title}
      kicker="Next gallery zone"
      subtitle={period}
      position={[0, 6.85, .38]}
      width={5.6}
      accent={accent}
    />
  </group>;
}

function Recesses() {
  const sideExhibits = ANCIENT_GREEK_HALL_LAYOUT.exhibits.filter(({id}) => id !== 'neoplatonism');
  return <group>
    {sideExhibits.map(({id, position}) => {
      const west = position.x < 0;
      return <group
        key={id}
        position={[west ? -9.24 : 9.24, 2.6, position.z]}
        rotation={[0, west ? Math.PI / 2 : -Math.PI / 2, 0]}
      >
        <mesh>
          <boxGeometry args={[3.7, 4.5, .16]}/>
          <meshStandardMaterial color={IRON} roughness={.76} metalness={.18}/>
        </mesh>
        <mesh position={[0, 2.28, .12]}><boxGeometry args={[4,.14,.09]}/><meshStandardMaterial color={BRONZE} roughness={.4} metalness={.68}/></mesh>
        <mesh position={[0, -2.28, .12]}><boxGeometry args={[4,.14,.09]}/><meshStandardMaterial color={BRONZE} roughness={.4} metalness={.68}/></mesh>
        <mesh position={[-1.93, 0, .12]}><boxGeometry args={[.14,4.45,.09]}/><meshStandardMaterial color={BRONZE} roughness={.4} metalness={.68}/></mesh>
        <mesh position={[1.93, 0, .12]}><boxGeometry args={[.14,4.45,.09]}/><meshStandardMaterial color={BRONZE} roughness={.4} metalness={.68}/></mesh>
      </group>;
    })}
    <mesh position={[0, 3.25, -31.24]}>
      <boxGeometry args={[7.2, 6.1, .18]}/>
      <meshStandardMaterial color={IRON} roughness={.75} metalness={.2}/>
    </mesh>
    <mesh position={[0, 3.25, -31.08]}>
      <torusGeometry args={[2.75, .12, 10, 48]}/>
      <meshStandardMaterial color={BRONZE} metalness={.68} roughness={.36}/>
    </mesh>
  </group>;
}

function TrackLighting() {
  const stops = [23, 17, 12, 6, 0, -6, -11, -25];
  return <group>
    {[-5.4, 5.4].map((x) => <mesh key={x} position={[x, 7.72, 0]}>
      <boxGeometry args={[.09,.09,58]}/>
      <meshStandardMaterial color="#171d20" metalness={.78} roughness={.32}/>
    </mesh>)}
    {stops.map((z, index) => {
      const x = index % 2 === 0 ? -5.4 : 5.4;
      return <group key={z} position={[x,7.48,z]} rotation={[index%2===0?0:-.08,0,index%2===0?-.34:.34]}>
        <mesh><cylinderGeometry args={[.09,.12,.36,10]}/><meshStandardMaterial color="#252b2d" metalness={.7} roughness={.35}/></mesh>
        <mesh position={[0,-.22,0]}><cylinderGeometry args={[.16,.11,.18,12]}/><meshStandardMaterial color={BRONZE} metalness={.66} roughness={.4}/></mesh>
      </group>;
    })}
  </group>;
}

function DirectoryKiosk() {
  const texture = usePlaqueTexture({
    title: 'Museum Directory',
    kicker: 'Eight exhibits · Three eras',
    subtitle: 'Press M or use the directory control',
    accent: '#d9a45e',
  });
  return <group position={[4.15, 0, 24.65]} rotation={[0, -.34, 0]}>
    <mesh position={[0, .55, 0]}>
      <boxGeometry args={[1.5, 1.1, 1]}/>
      <meshStandardMaterial color={LIMESTONE_DARK} roughness={.88}/>
    </mesh>
    <mesh position={[0, 1.46, -.08]} rotation={[-.28, 0, 0]}>
      <boxGeometry args={[1.58, .15, 1.12]}/>
      <meshStandardMaterial color={BRONZE} metalness={.62} roughness={.4}/>
    </mesh>
    <mesh position={[0, 1.59, .028]} rotation={[-Math.PI / 2 - .28, 0, 0]}>
      <planeGeometry args={[1.42, .76]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
  </group>;
}

export function HallArchitecture() {
  return <group>
    <mesh position={[0, -.15, 0]} receiveShadow>
      <boxGeometry args={[20, .3, 66]}/>
      <meshStandardMaterial color={FLOOR} roughness={.84} metalness={.04}/>
    </mesh>
    <mesh position={[0, .015, 18]} receiveShadow>
      <boxGeometry args={[18.4, .025, 16]}/>
      <meshStandardMaterial color="#20282b" roughness={.9}/>
    </mesh>
    <mesh position={[0, .018, -2.5]} receiveShadow>
      <boxGeometry args={[18.4, .03, 21]}/>
      <meshStandardMaterial color="#242522" roughness={.9}/>
    </mesh>
    <mesh position={[0, .021, -22.5]} receiveShadow>
      <boxGeometry args={[18.4, .035, 15]}/>
      <meshStandardMaterial color="#211d29" roughness={.9}/>
    </mesh>
    <mesh position={[0, .055, -.5]}>
      <boxGeometry args={[.16, .045, 57]}/>
      <meshStandardMaterial color={BRONZE} metalness={.72} roughness={.42}/>
    </mesh>
    {[24, 16, 8, 0, -8, -16, -24].map((z) => <mesh key={z} position={[0, .08, z]}>
      <boxGeometry args={[2.2, .06, .09]}/>
      <meshStandardMaterial color="#8b6843" emissive="#2a1c10" emissiveIntensity={.04} metalness={.62}/>
    </mesh>)}

    <mesh position={[-9.7, 4, 0]}>
      <boxGeometry args={[.8, 8, 66]}/>
      <meshStandardMaterial color="#bcb4a4" roughness={.94}/>
    </mesh>
    <mesh position={[9.7, 4, 0]}>
      <boxGeometry args={[.8, 8, 66]}/>
      <meshStandardMaterial color="#bcb4a4" roughness={.94}/>
    </mesh>
    <mesh position={[0, 4, -31.7]}>
      <boxGeometry args={[20, 8, .8]}/>
      <meshStandardMaterial color={LIMESTONE_DARK} roughness={.93}/>
    </mesh>
    <mesh position={[0, 4, 31.7]}>
      <boxGeometry args={[20, 8, .8]}/>
      <meshStandardMaterial color={LIMESTONE_DARK} roughness={.93}/>
    </mesh>
    <mesh position={[0, 8.15, 0]}>
      <boxGeometry args={[20, .3, 66]}/>
      <meshStandardMaterial color="#0b1013" roughness={.88} metalness={.08}/>
    </mesh>

    <InstancedColumns/>
    <TrackLighting/>
    <Recesses/>
    <ZoneArch z={9} title="Hellenistic Ways of Life" period="4th–1st centuries BCE" accent="#bd8a4c"/>
    <ZoneArch z={-14} title="Late Antiquity" period="3rd–6th centuries CE" accent="#947bc0"/>
    <WallSign
      title="Ancient Greek & Hellenistic Gallery"
      kicker="Gallery 01 · Enter the conversation"
      subtitle="Follow the bronze path from examination to ascent"
      position={[0, 3.25, 24.65]}
      width={7.4}
      accent="#d8a85c"
    />
    <WallSign
      title="Late Antiquity"
      kicker="Zone 03"
      subtitle="Unity · Intellect · Soul · Return"
      position={[0, 6.35, -31.02]}
      width={5.8}
      accent="#a786d6"
    />
    <DirectoryKiosk/>

    <mesh position={[0, .035, 27.45]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.05, 1.28, 48]}/>
      <meshBasicMaterial color="#d4a25c" toneMapped={false}/>
    </mesh>
  </group>;
}
