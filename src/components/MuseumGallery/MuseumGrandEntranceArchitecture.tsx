import type {MuseumRuntimeNodeDefinition} from '../../data/museum/museumWorldTypes';

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
const DARK_STONE = {
  color: '#282824',
  roughness: .82,
  metalness: .03,
} as const;
const DAYLIGHT = '#fff1d2';

type FloorPoint = readonly [number, number];

function BrassRouteSegment({
  from,
  to,
  width = .1,
}: {
  from: FloorPoint;
  to: FloorPoint;
  width?: number;
}) {
  const dx = to[0] - from[0];
  const dz = to[1] - from[1];
  const length = Math.hypot(dx, dz);
  const rotationY = -Math.atan2(dz, dx);
  return <mesh
    position={[(from[0] + to[0]) / 2, .018, (from[1] + to[1]) / 2]}
    rotation={[0, rotationY, 0]}
  >
    <boxGeometry args={[length, .028, width]}/>
    <meshStandardMaterial {...BRONZE}/>
  </mesh>;
}

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
      <pointLight position={[4.5, 3.4, 0]} color={DAYLIGHT} intensity={1.25} distance={14} decay={2}/>
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

function OrientationFloor() {
  const routeOrigin: FloorPoint = [18.8, 0];
  const compassCenter: FloorPoint = [6.8, 0];
  const routeTurn: FloorPoint = [-1.2, 3.9];
  const galleryPortal: FloorPoint = [-19.2, 14];
  return <group userData={{museumEntranceFeature: 'arrival-axis'}}>
    <mesh position={[13.2, .012, 0]}>
      <boxGeometry args={[11.2, .025, 3.7]}/>
      <meshStandardMaterial color="#716b61" roughness={.9}/>
    </mesh>
    {[-1.92, 1.92].map((offset) => <mesh key={offset} position={[13.2, .028, offset]}>
      <boxGeometry args={[11.25, .035, .09]}/>
      <meshStandardMaterial {...BRONZE}/>
    </mesh>)}
    <BrassRouteSegment from={routeOrigin} to={compassCenter} width={.14}/>
    <BrassRouteSegment from={compassCenter} to={routeTurn} width={.14}/>
    <BrassRouteSegment from={routeTurn} to={galleryPortal} width={.14}/>

    <group position={[compassCenter[0], .026, compassCenter[1]]}>
      <mesh>
        <cylinderGeometry args={[3.65, 3.65, .035, 64]}/>
        <meshStandardMaterial {...DARK_STONE}/>
      </mesh>
      {[3.22, 2.2].map((radius) => <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, radius === 3.22 ? .075 : .035, 10, 64]}/>
        <meshStandardMaterial {...BRONZE}/>
      </mesh>)}
      <mesh position={[0, .026, 0]}>
        <boxGeometry args={[6.3, .035, .08]}/>
        <meshStandardMaterial {...BRONZE}/>
      </mesh>
      <mesh position={[0, .027, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[6.3, .035, .08]}/>
        <meshStandardMaterial {...BRONZE}/>
      </mesh>
      <mesh position={[0, .06, 0]}>
        <cylinderGeometry args={[.22, .22, .09, 32]}/>
        <meshStandardMaterial
          color="#f0bf77"
          emissive="#a6642f"
          emissiveIntensity={.6}
          roughness={.3}
          metalness={.62}
        />
      </mesh>
    </group>

    {[.2, .4, .6, .8].map((progress) => {
      const x = routeTurn[0] + (galleryPortal[0] - routeTurn[0]) * progress;
      const z = routeTurn[1] + (galleryPortal[1] - routeTurn[1]) * progress;
      return <mesh key={progress} position={[x, .035, z]} rotation={[0, -.51, 0]}>
        <boxGeometry args={[.08, .04, 1.7]}/>
        <meshStandardMaterial {...BRONZE}/>
      </mesh>;
    })}
  </group>;
}

function OrientationOculus() {
  return <group
    position={[10, 3, -27.55]}
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
    <pointLight position={[1.5, 2.55, 0]} color="#ffd99c" intensity={.85} distance={9} decay={2}/>
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
    <OrientationFloor/>
    <OrientationOculus/>
    <GalleryOnePortal x={throughRoute.position.x} z={throughRoute.position.z}/>
    {[-13, -3, 7, 17].flatMap((x) => [
      <WallPilaster key={`${x}:south`} x={x} z={-27.62} inward={1}/>,
      <WallPilaster key={`${x}:north`} x={x} z={27.62} inward={-1}/>,
    ])}
  </group>;
}
