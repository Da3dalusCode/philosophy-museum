import type {MuseumRuntimeNodeDefinition} from '../../data/museum/museumWorldTypes';
import {MUSEUM_GRAND_ENTRANCE_FRONT_DESK} from '../../data/museum/museumGrandEntranceFurnishings';

const BRONZE = {
  color: '#9d7546',
  roughness: .34,
  metalness: .62,
} as const;
const DARK_BRONZE = {
  color: '#32281d',
  roughness: .5,
  metalness: .52,
} as const;
const LIMESTONE = {
  color: '#d8d0c2',
  roughness: .9,
  metalness: .02,
} as const;
const DAYLIGHT = '#fff1d2';

function WallPilaster({x, z, inward}: {x: number; z: number; inward: 1 | -1}) {
  return <group position={[x, 0, z]}>
    <mesh position={[0, 2.48, 0]}>
      <boxGeometry args={[1.08, 4.96, .56]}/>
      <meshStandardMaterial {...LIMESTONE}/>
    </mesh>
    <mesh position={[0, .18, inward * .15]}>
      <boxGeometry args={[1.42, .36, .86]}/>
      <meshStandardMaterial {...DARK_BRONZE}/>
    </mesh>
    <mesh position={[0, 4.98, inward * .13]}>
      <boxGeometry args={[1.46, .28, .82]}/>
      <meshStandardMaterial {...BRONZE}/>
    </mesh>
    <mesh position={[0, 2.52, inward * .295]}>
      <boxGeometry args={[.08, 4.45, .025]}/>
      <meshStandardMaterial
        color="#d8a665"
        emissive="#8a5425"
        emissiveIntensity={.7}
        roughness={.34}
        metalness={.48}
      />
    </mesh>
  </group>;
}

function CofferedCeiling() {
  const panels = [-12, 0, 12].flatMap((x) => [-13, 12].map((z) => ({x, z})));
  return <group userData={{museumEntranceFeature: 'coffered-ceiling'}}>
    {panels.map(({x, z}) => <group key={`${x}:${z}`} position={[x, 5.7, z]}>
      <mesh position={[0, .035, 0]}>
        <boxGeometry args={[9.25, .07, 20.25]}/>
        <meshStandardMaterial {...DARK_BRONZE}/>
      </mesh>
      <mesh>
        <boxGeometry args={[8.72, .05, 19.72]}/>
        <meshStandardMaterial
          color="#f7e5c0"
          emissive="#edc783"
          emissiveIntensity={.46}
          roughness={.58}
          metalness={.02}
        />
      </mesh>
    </group>)}
    {[10, 0, -10].map((x) => <pointLight
      key={x}
      position={[x, 5.2, x === 10 ? -8 : x === -10 ? 12 : 2]}
      userData={{
        museumLightId: `entrance:coffer:${x}`,
        museumLightRole: 'persistent-entrance',
      }}
      color={DAYLIGHT}
      intensity={.5}
      distance={24}
      decay={2}
    />)}
  </group>;
}

function ExteriorArrival({x, z}: {x: number; z: number}) {
  return <group userData={{museumEntranceFeature: 'public-threshold'}}>
    <group position={[x, 0, z]}>
      <mesh position={[4.6, -.055, 0]}>
        <boxGeometry args={[9.2, .11, 18]}/>
        <meshStandardMaterial color="#aaa397" roughness={.96}/>
      </mesh>
      {[-5.8, 5.8].map((offset) => <mesh key={offset} position={[4.6, .012, offset]}>
        <boxGeometry args={[9.2, .024, .12]}/>
        <meshStandardMaterial {...BRONZE}/>
      </mesh>)}

      <mesh position={[3.35, 4.28, 0]}>
        <boxGeometry args={[6.7, .24, 11.4]}/>
        <meshStandardMaterial {...DARK_BRONZE}/>
      </mesh>
      <mesh position={[3.35, 4.12, 0]}>
        <boxGeometry args={[6.15, .08, 10.85]}/>
        <meshStandardMaterial
          color="#ead7af"
          emissive="#e2b96f"
          emissiveIntensity={.38}
          roughness={.56}
        />
      </mesh>
      {[1.25, 5.5].flatMap((columnX) => [-4.35, 4.35].map((columnZ) =>
        <group key={`${columnX}:${columnZ}`} position={[columnX, 0, columnZ]}>
          <mesh position={[0, 1.98, 0]}>
            <cylinderGeometry args={[.36, .48, 3.96, 20]}/>
            <meshStandardMaterial {...LIMESTONE}/>
          </mesh>
          <mesh position={[0, .16, 0]}>
            <cylinderGeometry args={[.64, .64, .32, 8]}/>
            <meshStandardMaterial {...DARK_BRONZE}/>
          </mesh>
          <mesh position={[0, 3.88, 0]}>
            <cylinderGeometry args={[.58, .42, .28, 8]}/>
            <meshStandardMaterial {...BRONZE}/>
          </mesh>
        </group>))}
      <pointLight
        position={[4.5, 3.4, 0]}
        userData={{
          museumLightId: 'entrance:public-threshold',
          museumLightRole: 'persistent-entrance',
        }}
        color={DAYLIGHT}
        intensity={1.25}
        distance={14}
        decay={2}
      />
    </group>

    <group position={[x - .38, 0, z]}>
      {[-2.75, 2.75].map((offset) => <group key={offset} position={[0, 0, offset]}>
        <mesh position={[0, 1.82, 0]}>
          <boxGeometry args={[.76, 3.64, 1.08]}/>
          <meshStandardMaterial {...LIMESTONE}/>
        </mesh>
        <mesh position={[-.42, 1.82, -Math.sign(offset) * .32]}>
          <boxGeometry args={[.08, 3.22, .16]}/>
          <meshStandardMaterial {...BRONZE}/>
        </mesh>
      </group>)}
      <mesh position={[0, 3.82, 0]}>
        <boxGeometry args={[.78, .54, 6.58]}/>
        <meshStandardMaterial {...DARK_BRONZE}/>
      </mesh>
      <mesh position={[-.42, 3.81, 0]}>
        <boxGeometry args={[.08, .18, 5.58]}/>
        <meshStandardMaterial
          color="#e6b46d"
          emissive="#a96b2f"
          emissiveIntensity={.65}
          roughness={.38}
          metalness={.55}
        />
      </mesh>
    </group>

    {[-1, 1].map((side) => <group
      key={side}
      position={[x + .28, 1.67, z + side * 1.45]}
      rotation={[0, side * Math.PI / 3.2, 0]}
    >
      <mesh>
        <boxGeometry args={[.07, 3.18, 1.72]}/>
        <meshStandardMaterial
          color="#9db4b7"
          transparent
          opacity={.33}
          roughness={.12}
          metalness={.16}
        />
      </mesh>
      <mesh position={[-.045, 0, 0]}>
        <boxGeometry args={[.04, 3.28, 1.82]}/>
        <meshStandardMaterial {...BRONZE}/>
      </mesh>
    </group>)}
  </group>;
}

function OrientationOculus() {
  return <group
    position={[0, 3, -27.55]}
    userData={{museumEntranceFeature: 'orientation-oculus'}}
  >
    {[2.3, 2.04].map((radius) => <mesh key={radius} scale={[1.75, 1, 1]}>
      <torusGeometry args={[radius, radius === 2.3 ? .11 : .035, 12, 72]}/>
      <meshStandardMaterial {...(radius === 2.3 ? DARK_BRONZE : BRONZE)}/>
    </mesh>)}
    <mesh>
      <boxGeometry args={[.055, 4.05, .07]}/>
      <meshStandardMaterial {...BRONZE}/>
    </mesh>
    <mesh>
      <boxGeometry args={[7.35, .055, .07]}/>
      <meshStandardMaterial {...BRONZE}/>
    </mesh>
    <mesh position={[0, 0, .02]}>
      <circleGeometry args={[.36, 32]}/>
      <meshStandardMaterial
        color="#e8b56d"
        emissive="#9d5c2b"
        emissiveIntensity={.72}
        roughness={.28}
        metalness={.64}
      />
    </mesh>
  </group>;
}

function FrontDesk() {
  const desk = MUSEUM_GRAND_ENTRANCE_FRONT_DESK;
  return <group
    position={[desk.center.x, 0, desk.center.z]}
    rotation={[0, desk.rotation, 0]}
    userData={{museumEntranceFeature: 'front-desk', furnishingId: desk.id}}
  >
    <mesh position={[0, .54, 0]}>
      <boxGeometry args={[desk.size.width, 1.02, desk.size.depth]}/>
      <meshStandardMaterial {...LIMESTONE}/>
    </mesh>
    <mesh position={[0, 1.09, 0]}>
      <boxGeometry args={[desk.size.width + .24, .14, desk.size.depth + .16]}/>
      <meshStandardMaterial {...DARK_BRONZE}/>
    </mesh>
    <mesh position={[0, .58, desk.size.depth / 2 + .025]}>
      <boxGeometry args={[4.72, .55, .08]}/>
      <meshStandardMaterial {...DARK_BRONZE}/>
    </mesh>
    {[-1.66, 0, 1.66].map((x) => <mesh key={x} position={[x, .58, desk.size.depth / 2 + .075]}>
      <boxGeometry args={[.055, .42, .055]}/>
      <meshStandardMaterial {...BRONZE}/>
    </mesh>)}
    <mesh position={[0, .58, desk.size.depth / 2 + .09]}>
      <boxGeometry args={[1.05, .06, .04]}/>
      <meshStandardMaterial
        color="#e8b56d"
        emissive="#9d5c2b"
        emissiveIntensity={.68}
        roughness={.3}
        metalness={.6}
      />
    </mesh>
  </group>;
}

function GalleryOnePortal({x, z}: {x: number; z: number}) {
  return <group
    position={[x + .34, 0, z]}
    userData={{museumEntranceFeature: 'gallery-one-portal'}}
  >
    {[-2.72, 2.72].map((offset) => <group key={offset} position={[0, 0, offset]}>
      <mesh position={[0, 1.82, 0]}>
        <boxGeometry args={[.72, 3.64, 1.02]}/>
        <meshStandardMaterial {...DARK_BRONZE}/>
      </mesh>
      <mesh position={[.39, 1.82, 0]}>
        <boxGeometry args={[.075, 3.25, .78]}/>
        <meshStandardMaterial {...BRONZE}/>
      </mesh>
    </group>)}
    <mesh position={[0, 3.82, 0]}>
      <boxGeometry args={[.72, .52, 6.46]}/>
      <meshStandardMaterial {...DARK_BRONZE}/>
    </mesh>
    <mesh position={[.39, 3.81, 0]}>
      <boxGeometry args={[.075, .17, 5.55]}/>
      <meshStandardMaterial
        color="#edbe78"
        emissive="#a86932"
        emissiveIntensity={.75}
        roughness={.32}
        metalness={.58}
      />
    </mesh>
    <pointLight
      position={[1.5, 2.55, 0]}
      userData={{
        museumLightId: 'entrance:first-gallery-threshold',
        museumLightRole: 'persistent-entrance',
      }}
      color="#ffd99c"
      intensity={.85}
      distance={9}
      decay={2}
    />
  </group>;
}

/**
 * The entrance is intentionally architecture, not content: every element
 * clarifies threshold, arrival, orientation, or the first chronological route.
 * It adds no fake exhibits and no dead interactive surfaces.
 */
export function MuseumGrandEntranceArchitecture({node}: {node: MuseumRuntimeNodeDefinition}) {
  const publicEntry = node.entrances.find(({id}) => id === 'public-entry');
  const throughRoute = node.entrances.find(({id}) => id === 'through-route');
  if (!publicEntry || !throughRoute) return null;

  return <group userData={{museumEntrance: 'ceremonial-threshold-sequence'}}>
    <CofferedCeiling/>
    <ExteriorArrival x={publicEntry.position.x} z={publicEntry.position.z}/>
    <OrientationOculus/>
    <FrontDesk/>
    <GalleryOnePortal x={throughRoute.position.x} z={throughRoute.position.z}/>
    {[-15, -7, 7, 15].flatMap((x) => [
      <WallPilaster key={`${x}:south`} x={x} z={-27.62} inward={1}/>,
      <WallPilaster key={`${x}:north`} x={x} z={27.62} inward={-1}/>,
    ])}
  </group>;
}
