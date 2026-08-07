import type {MuseumRuntimeNodeDefinition} from '../../data/museum/museumWorldTypes';
import {
  MUSEUM_GRAND_ENTRANCE_FRONT_DESK,
  MUSEUM_GRAND_ENTRANCE_PILASTER_SYSTEM,
  MUSEUM_GRAND_ENTRANCE_WELCOME_COMPOSITION,
} from '../../data/museum/museumGrandEntranceFurnishings';
import {
  MUSEUM_TEXTURE_SPECS,
  museumTextureDimensionsForPlane,
} from '../../data/museum/museumTexturePolicy';
import {useGrandEntranceWelcomeTexture} from './grandEntranceWelcomeTexture';

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

function WallPilaster({
  x,
  z,
  inward,
  rotation = 0,
}: {
  x: number;
  z: number;
  inward: 1 | -1;
  rotation?: number;
}) {
  return <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
    <mesh position={[0, .09, inward * .1]}>
      <boxGeometry args={[1.48, .18, .78]}/>
      <meshStandardMaterial {...DARK_BRONZE}/>
    </mesh>
    <mesh position={[0, .31, inward * .075]}>
      <boxGeometry args={[1.28, .28, .68]}/>
      <meshStandardMaterial {...LIMESTONE}/>
    </mesh>
    <mesh position={[0, .5, inward * .09]}>
      <boxGeometry args={[1.36, .1, .72]}/>
      <meshStandardMaterial {...BRONZE}/>
    </mesh>

    <mesh position={[0, 2.72, 0]}>
      <boxGeometry args={[1.04, 4.34, .48]}/>
      <meshStandardMaterial {...LIMESTONE}/>
    </mesh>
    {[-.45, .45].map((railX) => <mesh key={railX} position={[railX, 2.72, inward * .252]}>
      <boxGeometry args={[.055, 3.98, .025]}/>
      <meshStandardMaterial {...DARK_BRONZE}/>
    </mesh>)}
    <mesh position={[0, 2.72, inward * .265]}>
      <boxGeometry args={[.095, 3.72, .026]}/>
      <meshStandardMaterial {...BRONZE}/>
    </mesh>

    <mesh position={[0, 4.96, inward * .025]}>
      <boxGeometry args={[1.14, .14, .56]}/>
      <meshStandardMaterial {...DARK_BRONZE}/>
    </mesh>
    <mesh position={[0, 5.1, inward * .055]}>
      <boxGeometry args={[1.28, .14, .66]}/>
      <meshStandardMaterial {...LIMESTONE}/>
    </mesh>
    <mesh position={[0, 5.23, inward * .08]}>
      <boxGeometry args={[1.46, .12, .76]}/>
      <meshStandardMaterial {...BRONZE}/>
    </mesh>
    <mesh position={[0, 5.39, inward * .1]}>
      <boxGeometry args={[1.58, .2, .82]}/>
      <meshStandardMaterial {...LIMESTONE}/>
    </mesh>
    <mesh position={[0, 5.53, inward * .11]}>
      <boxGeometry args={[1.64, .08, .86]}/>
      <meshStandardMaterial {...DARK_BRONZE}/>
    </mesh>
    <mesh position={[0, 5.64, inward * .095]}>
      <boxGeometry args={[1.5, .12, .8]}/>
      <meshStandardMaterial {...LIMESTONE}/>
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
      {[-2.05, 2.05].map((offset) => <mesh key={offset} position={[-.42, 1.62, offset]}>
        <boxGeometry args={[.08, 3.24, .14]}/>
        <meshStandardMaterial {...BRONZE}/>
      </mesh>)}
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
  const {oculus} = MUSEUM_GRAND_ENTRANCE_WELCOME_COMPOSITION;
  return <group
    position={[oculus.center.x, oculus.center.y, oculus.center.z]}
    rotation={[0, oculus.rotation, 0]}
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

function GrandEntranceWelcomeSign() {
  const {welcomeSign} = MUSEUM_GRAND_ENTRANCE_WELCOME_COMPOSITION;
  const textureSize = museumTextureDimensionsForPlane(
    welcomeSign.size.width,
    welcomeSign.size.height,
    MUSEUM_TEXTURE_SPECS.buildingSign,
  );
  const texture = useGrandEntranceWelcomeTexture(textureSize.width, textureSize.height);
  return <group
    position={[welcomeSign.center.x, welcomeSign.center.y, welcomeSign.center.z]}
    rotation={[0, welcomeSign.rotation, 0]}
    userData={{museumEntranceFeature: 'enter-the-conversation-sign'}}
  >
    <mesh position={[0, 0, -.045]}>
      <boxGeometry args={[welcomeSign.size.width + .16, welcomeSign.size.height + .16, .09]}/>
      <meshStandardMaterial {...DARK_BRONZE}/>
    </mesh>
    <mesh position={[0, 0, .006]}>
      <planeGeometry args={[welcomeSign.size.width, welcomeSign.size.height]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
    <mesh position={[0, 0, -.096]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[welcomeSign.size.width, welcomeSign.size.height]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
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
    {[-2.05, 2.05].map((offset) => <mesh key={offset} position={[.39, 1.62, offset]}>
      <boxGeometry args={[.075, 3.24, .14]}/>
      <meshStandardMaterial {...BRONZE}/>
    </mesh>)}
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
    <GrandEntranceWelcomeSign/>
    <FrontDesk/>
    <GalleryOnePortal x={throughRoute.position.x} z={throughRoute.position.z}/>
    {MUSEUM_GRAND_ENTRANCE_PILASTER_SYSTEM.placements.map((pilaster) => <WallPilaster
      key={pilaster.id}
      x={pilaster.x}
      z={pilaster.z}
      inward={pilaster.inward}
      rotation={pilaster.rotation}
    />)}
  </group>;
}
