import type {ThreeEvent} from '@react-three/fiber';
import type {MuseumAssetId} from '../../data/museum/museumAssetTypes';
import {ANCIENT_GREEK_HALL_LAYOUT} from '../../data/museum/ancientGreekHall';
import {getMuseumHallCatalog, type MuseumExhibitId, type MuseumZoneId} from '../../data/museumCatalog';
import {MuseumSceneMedia} from './MuseumSceneMedia';
import {usePlaqueTexture} from './plaqueTextures';

const LIMESTONE = '#d1c8b5';
const LIMESTONE_DARK = '#8f8777';
const BRONZE = '#86623d';
const DARK_BRONZE = '#302820';
const CHARCOAL = '#12181c';

const zoneAccents: Record<MuseumZoneId, string> = {
  'classical-foundations': '#567895',
  'hellenistic-ways': '#a66449',
  'late-antiquity': '#766291',
};

function ExhibitPlaque({title, kind, accent, far = false}: {
  title: string;
  kind: string;
  accent: string;
  far?: boolean;
}) {
  const texture = usePlaqueTexture({
    title,
    kicker: kind,
    subtitle: kind.startsWith('Philosopher')
      ? 'Individual voice · identity · text · question'
      : 'Tradition · practice · text · transmission',
    accent,
  });
  return <group position={[0, far ? .68 : .54, far ? 2.02 : .88]} rotation={[-.23, 0, 0]}>
    <mesh position={[0, 0, -.06]}>
      <boxGeometry args={[far ? 2.65 : 1.78, far ? .76 : .58, .12]}/>
      <meshStandardMaterial color={BRONZE} metalness={.62} roughness={.42}/>
    </mesh>
    <mesh position={[0, 0, .025]}>
      <planeGeometry args={[far ? 2.5 : 1.64, far ? .61 : .44]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
  </group>;
}

function PhilosopherSignature({id, accent}: {
  id: 'socrates' | 'plato' | 'aristotle';
  accent: string;
}) {
  if (id === 'socrates') return <group position={[-.7, .96, .55]}>
    <mesh><torusGeometry args={[.25, .035, 8, 30]}/><meshStandardMaterial color={accent} metalness={.65} roughness={.34}/></mesh>
    <mesh position={[.24, .12, .02]}><torusGeometry args={[.16, .025, 8, 24]}/><meshStandardMaterial color={LIMESTONE} roughness={.8}/></mesh>
  </group>;
  if (id === 'plato') return <group position={[-.72, .96, .55]}>
    {[.18, .29, .4].map((radius, index) => <mesh key={radius} position={[0, index * .03, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[radius, .025, 7, 28, Math.PI]}/><meshStandardMaterial color={index === 2 ? DARK_BRONZE : accent} metalness={.55}/></mesh>)}
    <mesh position={[0, -.2, 0]}><sphereGeometry args={[.09, 12, 9]}/><meshBasicMaterial color="#f0ddaa" toneMapped={false}/></mesh>
  </group>;
  return <group position={[-.72, .94, .55]}>
    {[[-.2,.16],[.2,.16],[-.2,-.18],[.2,-.18]].map(([x,y], index) => <mesh key={index} position={[x,y,0]}><sphereGeometry args={[.095, 12, 9]}/><meshStandardMaterial color={index === 3 ? accent : LIMESTONE} metalness={index === 3 ? .5 : 0} roughness={.68}/></mesh>)}
    <mesh><boxGeometry args={[.58,.58,.035]}/><meshStandardMaterial color={BRONZE} wireframe metalness={.65}/></mesh>
  </group>;
}

function PhilosopherBay({id, principalAssetId, supportingAssetId, accent, nearby}: {
  id: 'socrates' | 'plato' | 'aristotle';
  principalAssetId: MuseumAssetId;
  supportingAssetId: MuseumAssetId;
  accent: string;
  nearby: boolean;
}) {
  return <group>
    <mesh position={[0, .2, 0]}>
      <boxGeometry args={[1.82, .4, 1.1]}/>
      <meshStandardMaterial color={LIMESTONE_DARK} roughness={.86}/>
    </mesh>
    <mesh position={[0, 1.92, .1]}>
      <boxGeometry args={[1.66, 3.22, .16]}/>
      <meshStandardMaterial color={CHARCOAL} roughness={.72} metalness={.12}/>
    </mesh>
    <MuseumSceneMedia assetId={principalAssetId} width={1.42} maxHeight={2.3} position={[0, 2.08, .21]} nearby={nearby} accent={accent}/>
    <MuseumSceneMedia assetId={supportingAssetId} width={1.02} maxHeight={.78} position={[.72, 1.02, .46]} rotation={[0, -.18, -.03]} nearby={nearby} accent={accent}/>
    <PhilosopherSignature id={id} accent={accent}/>
    <mesh position={[0, .43, .57]}>
      <boxGeometry args={[1.18, .08, .75]}/>
      <meshStandardMaterial color={BRONZE} metalness={.65} roughness={.38}/>
    </mesh>
  </group>;
}

function CynicismInstallation({principal, supporting, accent, nearby}: {principal: MuseumAssetId; supporting: MuseumAssetId; accent: string; nearby: boolean}) {
  return <group>
    <mesh position={[0, .2, 0]}><boxGeometry args={[2.72,.4,1.38]}/><meshStandardMaterial color={LIMESTONE_DARK} roughness={.88}/></mesh>
    <MuseumSceneMedia assetId={principal} width={1.14} maxHeight={.9} position={[-.82, 1.86, .2]} rotation={[0,.12,.02]} nearby={nearby} accent={accent}/>
    <MuseumSceneMedia assetId={supporting} width={1.14} maxHeight={.9} position={[.82, 1.86, .2]} rotation={[0,-.12,-.02]} nearby={nearby} accent={accent}/>
    <mesh position={[0, 1.0, .44]} scale={[.62,.82,.56]}><sphereGeometry args={[1,18,12]}/><meshStandardMaterial color="#7d5540" roughness={.92}/></mesh>
    <mesh position={[0, 1.72, .44]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.34,.065,10,28]}/><meshStandardMaterial color={accent} metalness={.48}/></mesh>
    <mesh position={[-.48,.74,.57]} rotation={[0,0,-.38]}><cylinderGeometry args={[.03,.045,.95,8]}/><meshStandardMaterial color={BRONZE} metalness={.7}/></mesh>
    <pointLight color={accent} intensity={nearby ? 1.1 : .35} distance={3.2} position={[0,1.5,.7]}/>
  </group>;
}

function EpicureanInstallation({principal, supporting, accent, nearby}: {principal: MuseumAssetId; supporting: MuseumAssetId; accent: string; nearby: boolean}) {
  return <group>
    <mesh position={[0,.17,0]}><cylinderGeometry args={[1.2,1.34,.34,24]}/><meshStandardMaterial color="#4d5847" roughness={.88}/></mesh>
    <MuseumSceneMedia assetId={principal} width={1.0} maxHeight={1.55} position={[-.62,1.72,.18]} rotation={[0,.08,0]} nearby={nearby} accent={accent}/>
    <MuseumSceneMedia assetId={supporting} width={.82} maxHeight={1.25} position={[.67,1.72,.27]} rotation={[0,-.08,0]} nearby={nearby} accent={accent}/>
    {[[-.48,.82,.64,.11],[0,.98,.69,.14],[.45,.78,.64,.09]].map(([x,y,z,size],index)=><mesh key={index} position={[x,y,z]}><icosahedronGeometry args={[size,1]}/><meshStandardMaterial color={index===1?accent:'#9aa882'} emissive={accent} emissiveIntensity={index===1?.15:.01}/></mesh>)}
    <mesh position={[0,.92,.62]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.68,.025,7,36]}/><meshStandardMaterial color={BRONZE} metalness={.58}/></mesh>
  </group>;
}

function StoicismInstallation({principal, supporting, accent, nearby}: {principal: MuseumAssetId; supporting: MuseumAssetId; accent: string; nearby: boolean}) {
  return <group>
    <mesh position={[0,.22,0]}><boxGeometry args={[2.35,.44,1.22]}/><meshStandardMaterial color={CHARCOAL} roughness={.76}/></mesh>
    <MuseumSceneMedia assetId={principal} width={.98} maxHeight={1.55} position={[-.62,1.76,.2]} rotation={[0,.07,0]} nearby={nearby} accent={accent}/>
    <MuseumSceneMedia assetId={supporting} width={.86} maxHeight={1.22} position={[.66,1.68,.28]} rotation={[0,-.07,0]} nearby={nearby} accent={accent}/>
    {[[1.05,.68],[.72,.46],[.4,.25]].map(([width,height],index)=><group key={width} position={[0,.92,.66-index*.025]}><mesh position={[-width/2,0,0]}><boxGeometry args={[.035,height,.04]}/><meshStandardMaterial color={index?accent:BRONZE} metalness={.7}/></mesh><mesh position={[width/2,0,0]}><boxGeometry args={[.035,height,.04]}/><meshStandardMaterial color={index?accent:BRONZE} metalness={.7}/></mesh><mesh position={[0,height/2,0]}><boxGeometry args={[width,.035,.04]}/><meshStandardMaterial color={index?accent:BRONZE} metalness={.7}/></mesh></group>)}
  </group>;
}

function SkepticismInstallation({principal, supporting, accent, nearby}: {principal: MuseumAssetId; supporting: MuseumAssetId; accent: string; nearby: boolean}) {
  return <group>
    <mesh position={[0,.18,0]}><boxGeometry args={[2.25,.36,1.2]}/><meshStandardMaterial color={LIMESTONE_DARK} roughness={.9}/></mesh>
    <MuseumSceneMedia assetId={principal} width={.9} maxHeight={1.42} position={[-.61,1.7,.2]} rotation={[0,.08,0]} nearby={nearby} accent={accent}/>
    <MuseumSceneMedia assetId={supporting} width={.88} maxHeight={1.38} position={[.62,1.7,.26]} rotation={[0,-.08,0]} nearby={nearby} accent={accent}/>
    <mesh position={[0,.93,.64]}><coneGeometry args={[.17,.62,4]}/><meshStandardMaterial color={DARK_BRONZE} metalness={.65}/></mesh>
    <mesh position={[0,1.22,.64]} rotation={[0,0,.05]}><boxGeometry args={[1.15,.045,.05]}/><meshStandardMaterial color={accent} metalness={.62}/></mesh>
    <mesh position={[-.42,1.01,.64]}><torusGeometry args={[.19,.025,8,24,Math.PI]}/><meshStandardMaterial color={LIMESTONE}/></mesh>
    <mesh position={[.42,1.04,.64]}><torusGeometry args={[.19,.025,8,24,Math.PI]}/><meshStandardMaterial color={LIMESTONE}/></mesh>
  </group>;
}

function NeoplatonismInstallation({principal, supporting, accent, nearby}: {principal: MuseumAssetId; supporting: MuseumAssetId; accent: string; nearby: boolean}) {
  return <group>
    <mesh position={[0,.22,0]}><cylinderGeometry args={[2.5,2.72,.44,32]}/><meshStandardMaterial color={CHARCOAL} roughness={.78}/></mesh>
    <MuseumSceneMedia assetId={principal} width={1.22} maxHeight={1.9} position={[-1.48,2.18,.14]} rotation={[0,.05,0]} nearby={nearby} accent={accent}/>
    <MuseumSceneMedia assetId={supporting} width={1.18} maxHeight={1.9} position={[1.48,2.18,.14]} rotation={[0,-.05,0]} nearby={nearby} accent={accent}/>
    {[1.05,.72,.4].map((radius,index)=><mesh key={radius} position={[0,1.75+index*.08,.62]}><torusGeometry args={[radius,.045+index*.008,9,44]}/><meshStandardMaterial color={index===2?LIMESTONE:accent} emissive={accent} emissiveIntensity={.16+index*.09} metalness={.54}/></mesh>)}
    <mesh position={[0,1.91,.65]}><sphereGeometry args={[.16,18,14]}/><meshBasicMaterial color="#f7e8c3" toneMapped={false}/></mesh>
    <mesh position={[0,3.18,.25]}><octahedronGeometry args={[.18]}/><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={.4}/></mesh>
  </group>;
}

function BranchInstallation({id, principal, supporting, accent, nearby}: {
  id: Exclude<MuseumExhibitId, 'socrates' | 'plato' | 'aristotle'>;
  principal: MuseumAssetId;
  supporting: MuseumAssetId;
  accent: string;
  nearby: boolean;
}) {
  switch (id) {
    case 'cynicism': return <CynicismInstallation principal={principal} supporting={supporting} accent={accent} nearby={nearby}/>;
    case 'epicureanism': return <EpicureanInstallation principal={principal} supporting={supporting} accent={accent} nearby={nearby}/>;
    case 'stoicism': return <StoicismInstallation principal={principal} supporting={supporting} accent={accent} nearby={nearby}/>;
    case 'skepticism': return <SkepticismInstallation principal={principal} supporting={supporting} accent={accent} nearby={nearby}/>;
    case 'neoplatonism': return <NeoplatonismInstallation principal={principal} supporting={supporting} accent={accent} nearby={nearby}/>;
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
      const accent = zoneAccents[layout.zoneId];
      const nearby = nearbyId === layout.id;
      const philosopher = catalog.entityKind === 'philosopher';
      const activate = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        if (event.delta <= 7) onSelectExhibit(layout.id);
      };
      return <group key={layout.id} position={[layout.position.x,0,layout.position.z]} rotation={[0,layout.rotationY,0]}>
        {philosopher
          ? <PhilosopherBay id={layout.id as 'socrates'|'plato'|'aristotle'} principalAssetId={catalog.principalAssetId} supportingAssetId={catalog.supportingAssetIds[0]} accent={accent} nearby={nearby}/>
          : <BranchInstallation id={layout.id as Exclude<MuseumExhibitId,'socrates'|'plato'|'aristotle'>} principal={catalog.principalAssetId} supporting={catalog.supportingAssetIds[0]} accent={accent} nearby={nearby}/>
        }
        <ExhibitPlaque title={catalog.displayName} kind={philosopher?'Philosopher bay':'School & tradition'} accent={accent} far={layout.id==='neoplatonism'}/>
        <mesh onClick={activate} position={[0,1.65,.2]}>
          <boxGeometry args={[layout.id==='neoplatonism'?5.5:2.8,3.3,.7]}/>
          <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false}/>
        </mesh>
        {nearby && <>
          <pointLight position={[0,3.2,2]} color={accent} intensity={7} distance={6} decay={2}/>
          <mesh position={[0,.045,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={layout.id==='neoplatonism'?[2.3,2.38,48]:[1.35,1.42,40]}/><meshBasicMaterial color={accent} transparent opacity={.62} toneMapped={false}/></mesh>
        </>}
      </group>;
    })}
  </group>;
}
