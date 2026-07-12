import type {ThreeEvent} from '@react-three/fiber';
import {getMuseumHallCatalog, type MuseumExhibitId} from '../../data/museumCatalog';
import {ANCIENT_GREEK_HALL_LAYOUT} from '../../data/museum/ancientGreekHall';
import {usePlaqueTexture} from './plaqueTextures';

const STONE = '#b9aa8e';
const PALE_STONE = '#d2c5ab';
const BRONZE = '#79552d';
const DARK_BRONZE = '#3b3024';

const accents: Record<MuseumExhibitId, string> = {
  socrates: '#d8a85c',
  plato: '#9988e6',
  aristotle: '#b29a68',
  cynicism: '#d57862',
  epicureanism: '#e4bb63',
  stoicism: '#d99b5b',
  skepticism: '#729edb',
  neoplatonism: '#a786d6',
};

function ExhibitPlaque({
  title,
  kind,
  question,
  accent,
  far = false,
}: {
  title: string;
  kind: string;
  question: string;
  accent: string;
  far?: boolean;
}) {
  const texture = usePlaqueTexture({title, kicker: kind, subtitle: question, accent});
  return <group position={[0, far ? .78 : .96, far ? 1.32 : .91]} rotation={[-.2, 0, 0]}>
    <mesh position={[0, 0, -.06]}>
      <boxGeometry args={[far ? 2.3 : 1.72, far ? .7 : .54, .12]}/>
      <meshStandardMaterial color={BRONZE} metalness={.62} roughness={.4}/>
    </mesh>
    <mesh position={[0, 0, .025]}>
      <planeGeometry args={[far ? 2.15 : 1.58, far ? .55 : .4]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
  </group>;
}

function PhilosopherBust({id, accent, nearby}: {
  id: 'socrates' | 'plato' | 'aristotle';
  accent: string;
  nearby: boolean;
}) {
  return <group>
    <mesh position={[0, .5, 0]} castShadow receiveShadow>
      <boxGeometry args={[1.38, 1, 1.12]}/>
      <meshStandardMaterial color={STONE} roughness={.9}/>
    </mesh>
    <mesh position={[0, 1.18, 0]} castShadow>
      <cylinderGeometry args={[.42, .58, .43, 12]}/>
      <meshStandardMaterial color={PALE_STONE} roughness={.84}/>
    </mesh>
    <mesh position={[0, 1.55, .03]} scale={[.74, .4, .42]} castShadow>
      <sphereGeometry args={[.76, 16, 12]}/>
      <meshStandardMaterial color={PALE_STONE} roughness={.86}/>
    </mesh>

    {id === 'socrates' && <group>
      <mesh position={[0, 2.05, .05]} scale={[.43, .5, .39]} castShadow>
        <sphereGeometry args={[1, 18, 14]}/>
        <meshStandardMaterial color={PALE_STONE} roughness={.88}/>
      </mesh>
      <mesh position={[0, 1.77, .38]} scale={[.34, .34, .24]} castShadow>
        <sphereGeometry args={[1, 14, 10]}/>
        <meshStandardMaterial color="#9f9077" roughness={.95}/>
      </mesh>
      <mesh position={[0, 2.16, .41]} scale={[.1, .1, .13]}>
        <sphereGeometry args={[1, 10, 8]}/>
        <meshStandardMaterial color={PALE_STONE} roughness={.88}/>
      </mesh>
      <mesh position={[0, 2.37, -.02]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[.34, .08, 7, 18, Math.PI]}/>
        <meshStandardMaterial color="#95856e" roughness={.94}/>
      </mesh>
    </group>}

    {id === 'plato' && <group>
      <mesh position={[0, 2.08, .04]} scale={[.4, .55, .38]} castShadow>
        <sphereGeometry args={[1, 18, 14]}/>
        <meshStandardMaterial color={PALE_STONE} roughness={.86}/>
      </mesh>
      <mesh position={[0, 2.42, -.02]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[.35, .1, 8, 20, Math.PI * 1.35]}/>
        <meshStandardMaterial color="#a29379" roughness={.92}/>
      </mesh>
      <mesh position={[.52, 1.6, -.12]} rotation={[0, 0, -.16]}>
        <cylinderGeometry args={[.08, .08, 1.16, 10]}/>
        <meshStandardMaterial color={accent} metalness={.56} roughness={.45}/>
      </mesh>
    </group>}

    {id === 'aristotle' && <group>
      <mesh position={[0, 2.03, .03]} scale={[.41, .48, .39]} castShadow>
        <sphereGeometry args={[1, 18, 14]}/>
        <meshStandardMaterial color={PALE_STONE} roughness={.87}/>
      </mesh>
      <mesh position={[0, 2.33, -.06]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[.34, .085, 8, 18, Math.PI]}/>
        <meshStandardMaterial color="#8e816e" roughness={.94}/>
      </mesh>
      {[-.18, 0, .18].map((x, index) => <mesh key={x} position={[x, 1.56, .48]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[.12 + index * .025, .025, 6, 16]}/>
        <meshStandardMaterial color={accent} metalness={.58} roughness={.4}/>
      </mesh>)}
    </group>}

    <mesh position={[0, 2.7, -.12]}>
      <ringGeometry args={[.45, .51, 32]}/>
      <meshBasicMaterial color={accent} transparent opacity={nearby ? .95 : .32} toneMapped={false}/>
    </mesh>
  </group>;
}

function BranchPlinth({accent}: {accent: string}) {
  return <group>
    <mesh position={[0, .27, 0]} castShadow receiveShadow>
      <boxGeometry args={[2.05, .54, 1.4]}/>
      <meshStandardMaterial color={STONE} roughness={.9}/>
    </mesh>
    <mesh position={[0, .58, 0]}>
      <boxGeometry args={[1.85, .12, 1.2]}/>
      <meshStandardMaterial color={accent} metalness={.5} roughness={.45}/>
    </mesh>
  </group>;
}

function CynicismInstallation({accent}: {accent: string}) {
  return <group>
    <BranchPlinth accent={accent}/>
    <mesh position={[-.68, 1.56, 0]}>
      <boxGeometry args={[.12, 1.85, .12]}/>
      <meshStandardMaterial color={DARK_BRONZE} metalness={.7} roughness={.38}/>
    </mesh>
    <mesh position={[.68, 1.23, 0]}>
      <boxGeometry args={[.12, 1.2, .12]}/>
      <meshStandardMaterial color={DARK_BRONZE} metalness={.7} roughness={.38}/>
    </mesh>
    <mesh position={[-.2, 2.28, 0]} rotation={[0, 0, -.18]}>
      <boxGeometry args={[1.15, .12, .12]}/>
      <meshStandardMaterial color={accent} metalness={.64} roughness={.4}/>
    </mesh>
    <mesh position={[.12, 1.23, .16]} scale={[.42, .55, .36]}>
      <sphereGeometry args={[1, 14, 10]}/>
      <meshStandardMaterial color="#8f5b3f" roughness={.94}/>
    </mesh>
    <mesh position={[.12, 1.72, .16]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[.22, .06, 8, 20]}/>
      <meshStandardMaterial color="#ad7654" roughness={.9}/>
    </mesh>
  </group>;
}

function EpicureanInstallation({accent}: {accent: string}) {
  return <group>
    <BranchPlinth accent={accent}/>
    <mesh position={[0, .85, 0]}>
      <cylinderGeometry args={[.72, .62, .2, 24]}/>
      <meshStandardMaterial color="#6c7b5a" roughness={.86}/>
    </mesh>
    {[[-.45, 1.38, .08, .24], [0, 1.7, -.03, .31], [.46, 1.28, .13, .2]].map(([x, y, z, scale], index) => <group key={index}>
      <mesh position={[x, (y + .88) / 2, z]}>
        <cylinderGeometry args={[.025, .035, y - .88, 7]}/>
        <meshStandardMaterial color={BRONZE} metalness={.5} roughness={.5}/>
      </mesh>
      <mesh position={[x, y, z]} scale={[scale * 1.35, scale, scale * .72]}>
        <sphereGeometry args={[1, 12, 9]}/>
        <meshStandardMaterial color={index === 1 ? accent : '#80936a'} roughness={.78} emissive={accent} emissiveIntensity={index === 1 ? .12 : .02}/>
      </mesh>
    </group>)}
    <mesh position={[0, 2.22, -.05]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[.68, .035, 7, 32]}/>
      <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={.2} metalness={.45}/>
    </mesh>
  </group>;
}

function StoicismInstallation({accent}: {accent: string}) {
  const frames = [[1.55, 2.25], [1.12, 1.72], [.72, 1.2]] as const;
  return <group>
    <BranchPlinth accent={accent}/>
    {frames.map(([width, height], index) => <group key={width} position={[0, .64 + height / 2, -.08 - index * .08]}>
      <mesh position={[-width / 2, 0, 0]}><boxGeometry args={[.08, height, .09]}/><meshStandardMaterial color={index ? accent : DARK_BRONZE} metalness={.65} roughness={.4}/></mesh>
      <mesh position={[width / 2, 0, 0]}><boxGeometry args={[.08, height, .09]}/><meshStandardMaterial color={index ? accent : DARK_BRONZE} metalness={.65} roughness={.4}/></mesh>
      <mesh position={[0, height / 2, 0]}><boxGeometry args={[width, .08, .09]}/><meshStandardMaterial color={index ? accent : DARK_BRONZE} metalness={.65} roughness={.4}/></mesh>
    </group>)}
    <mesh position={[0, 1.45, .12]}>
      <icosahedronGeometry args={[.34, 1]}/>
      <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={.22} metalness={.4} roughness={.35}/>
    </mesh>
  </group>;
}

function SkepticismInstallation({accent}: {accent: string}) {
  return <group>
    <BranchPlinth accent={accent}/>
    <mesh position={[0, 1.42, 0]}>
      <coneGeometry args={[.38, 1.55, 4]}/>
      <meshStandardMaterial color={DARK_BRONZE} metalness={.62} roughness={.44}/>
    </mesh>
    <mesh position={[0, 2.12, .02]} rotation={[0, 0, .08]}>
      <boxGeometry args={[1.75, .09, .11]}/>
      <meshStandardMaterial color={accent} metalness={.58} roughness={.4}/>
    </mesh>
    <mesh position={[-.57, 1.72, .08]} rotation={[0, .24, -.07]}>
      <boxGeometry args={[.58, .72, .08]}/>
      <meshStandardMaterial color="#b8c6dc" transparent opacity={.58} metalness={.12} roughness={.34}/>
    </mesh>
    <mesh position={[.57, 1.82, .08]} rotation={[0, -.24, .07]}>
      <boxGeometry args={[.58, .72, .08]}/>
      <meshStandardMaterial color="#7f91ad" transparent opacity={.58} metalness={.12} roughness={.34}/>
    </mesh>
  </group>;
}

function NeoplatonismInstallation({accent}: {accent: string}) {
  return <group>
    <mesh position={[0, .38, 0]} receiveShadow>
      <cylinderGeometry args={[1.5, 1.72, .76, 32]}/>
      <meshStandardMaterial color={STONE} roughness={.9}/>
    </mesh>
    {[1.18, .86, .54].map((radius, index) => <mesh key={radius} position={[0, 1.62 + index * .12, 0]}>
      <torusGeometry args={[radius, .055 + index * .012, 10, 42]}/>
      <meshStandardMaterial color={index === 2 ? '#eee3c9' : accent} emissive={accent} emissiveIntensity={.28 + index * .12} metalness={.5} roughness={.3}/>
    </mesh>)}
    <mesh position={[0, 1.86, .03]}>
      <sphereGeometry args={[.22, 18, 14]}/>
      <meshBasicMaterial color="#fff3d4" toneMapped={false}/>
    </mesh>
    <mesh position={[0, 2.96, 0]}>
      <octahedronGeometry args={[.22]}/>
      <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={.5}/>
    </mesh>
  </group>;
}

function BranchInstallation({id, accent}: {
  id: Exclude<MuseumExhibitId, 'socrates' | 'plato' | 'aristotle'>;
  accent: string;
}) {
  switch (id) {
    case 'cynicism': return <CynicismInstallation accent={accent}/>;
    case 'epicureanism': return <EpicureanInstallation accent={accent}/>;
    case 'stoicism': return <StoicismInstallation accent={accent}/>;
    case 'skepticism': return <SkepticismInstallation accent={accent}/>;
    case 'neoplatonism': return <NeoplatonismInstallation accent={accent}/>;
  }
}

export function MuseumExhibits({nearbyId, onSelectExhibit}: {
  nearbyId?: MuseumExhibitId;
  onSelectExhibit: (exhibitId: MuseumExhibitId) => void;
}) {
  const hall = getMuseumHallCatalog(ANCIENT_GREEK_HALL_LAYOUT.id)!;
  return <group>
    {ANCIENT_GREEK_HALL_LAYOUT.exhibits.map((layout) => {
      const catalog = hall.exhibits.find(({id}) => id === layout.id)!;
      const accent = accents[layout.id];
      const nearby = nearbyId === layout.id;
      const philosopher = catalog.entityKind === 'philosopher';
      const activate = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        if (event.delta <= 7) onSelectExhibit(layout.id);
      };
      return <group
        key={layout.id}
        position={[layout.position.x, 0, layout.position.z]}
        rotation={[0, layout.rotationY, 0]}
      >
        {philosopher
          ? <PhilosopherBust id={layout.id as 'socrates' | 'plato' | 'aristotle'} accent={accent} nearby={nearby}/>
          : <BranchInstallation id={layout.id as Exclude<MuseumExhibitId, 'socrates' | 'plato' | 'aristotle'>} accent={accent}/>
        }
        <ExhibitPlaque
          title={catalog.displayName}
          kind={philosopher ? 'Philosopher installation' : 'School installation'}
          question={catalog.question}
          accent={accent}
          far={layout.id === 'neoplatonism'}
        />
        <mesh onClick={activate} position={[0, 1.4, .05]}>
          <sphereGeometry args={[layout.id === 'neoplatonism' ? 1.75 : 1.3, 10, 8]}/>
          <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false}/>
        </mesh>
        {nearby && <mesh position={[0, .07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={layout.id === 'neoplatonism' ? [1.7, 1.82, 40] : [1.08, 1.18, 36]}/>
          <meshBasicMaterial color={accent} transparent opacity={.9} toneMapped={false}/>
        </mesh>}
      </group>;
    })}
  </group>;
}
