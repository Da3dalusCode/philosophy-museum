import type {ThreeEvent} from '@react-three/fiber';
import {Vector2} from 'three';
import type {
  MuseumExhibitLayout,
  MuseumHallDefinition,
  MuseumInstallationSceneDefinition,
  MuseumSceneVolume,
} from '../../data/museum/museumWorldTypes';
import {getMuseumHallCatalog, type MuseumExhibitId, type MuseumZoneId} from '../../data/museumCatalog';
import {MuseumSceneMedia} from './MuseumSceneMedia';
import {usePlaqueTexture} from './plaqueTextures';

const LIMESTONE = '#d1c8b5';
const LIMESTONE_DARK = '#8f8777';
const BRONZE = '#86623d';
const DARK_BRONZE = '#302820';
const TERRACOTTA = '#81513d';

const zoneAccents: Record<MuseumZoneId, string> = {
  'classical-foundations': '#567895',
  'hellenistic-ways': '#a66449',
  'late-antiquity': '#766291',
};

const bound = (scene: MuseumInstallationSceneDefinition, id: string): MuseumSceneVolume => {
  const result = scene.objectBounds.find((item) => item.id === id);
  if (!result) throw new Error(`Museum scene bound ${id} is missing.`);
  return result;
};

function BoxVolume({volume, color = LIMESTONE_DARK, metalness = 0, roughness = .86}: {
  volume: MuseumSceneVolume;
  color?: string;
  metalness?: number;
  roughness?: number;
}) {
  return <mesh position={[volume.center.x, volume.center.y, volume.center.z]}>
    <boxGeometry args={[volume.size.width, volume.size.height, volume.size.depth]}/>
    <meshStandardMaterial color={color} metalness={metalness} roughness={roughness}/>
  </mesh>;
}

function DisplayBacking({volume, accent}: {volume: MuseumSceneVolume; accent: string}) {
  const frontZ = volume.center.z + volume.size.depth / 2 + .012;
  return <group userData={{placementId: volume.id}}>
    <BoxVolume volume={volume} color="#c8c2b7" roughness={.92}/>
    <mesh position={[volume.center.x, volume.center.y + volume.size.height / 2 - .055, frontZ]}>
      <boxGeometry args={[volume.size.width - .08, .07, .035]}/>
      <meshStandardMaterial color={accent} metalness={.34} roughness={.5}/>
    </mesh>
    <mesh position={[volume.center.x - volume.size.width / 2 + .055, volume.center.y, frontZ]}>
      <boxGeometry args={[.07, volume.size.height - .08, .035]}/>
      <meshStandardMaterial color={accent} metalness={.34} roughness={.5}/>
    </mesh>
  </group>;
}

function ExhibitPlaque({scene, title, kind, accent}: {
  scene: MuseumInstallationSceneDefinition;
  title: string;
  kind: string;
  accent: string;
}) {
  const definition = scene.plaque;
  const texture = usePlaqueTexture({
    title,
    kicker: kind,
    subtitle: kind.startsWith('Philosopher')
      ? 'Documented likeness · text · question'
      : 'Tradition · practice · text · transmission',
    accent,
  });
  const postY = -definition.height / 2 - definition.supportHeight / 2;
  const footY = -definition.height / 2 - definition.supportHeight;
  return <group position={definition.position} userData={{placementId: definition.id}}>
    <mesh position={[0, postY, -.04]}><boxGeometry args={[.075, definition.supportHeight, .075]}/><meshStandardMaterial color={BRONZE} metalness={.62} roughness={.42}/></mesh>
    <mesh position={[0, footY, .02]}><boxGeometry args={[.7, .08, .42]}/><meshStandardMaterial color={BRONZE} metalness={.58} roughness={.48}/></mesh>
    <group rotation={definition.rotation}>
      <mesh position={[0, 0, -.06]}>
        <boxGeometry args={[definition.width + .16, definition.height + .14, .12]}/>
        <meshStandardMaterial color={BRONZE} metalness={.62} roughness={.42}/>
      </mesh>
      <mesh position={[0, 0, .025]}>
        <planeGeometry args={[definition.width, definition.height]}/>
        <meshStandardMaterial map={texture} roughness={.7} metalness={0} emissive="#0d0d0d" emissiveIntensity={.08}/>
      </mesh>
    </group>
  </group>;
}

function PhilosopherSignature({id, accent, volume}: {
  id: 'socrates' | 'plato' | 'aristotle';
  accent: string;
  volume: MuseumSceneVolume;
}) {
  const position: [number, number, number] = [volume.center.x, volume.center.y, volume.center.z];
  if (id === 'socrates') return <group position={position}>
    <mesh><torusGeometry args={[.25, .035, 8, 30]}/><meshStandardMaterial color={accent} metalness={.65} roughness={.34}/></mesh>
    <mesh position={[.24, .12, .02]}><torusGeometry args={[.16, .025, 8, 24]}/><meshStandardMaterial color={LIMESTONE} roughness={.8}/></mesh>
    <mesh position={[0,-.22,-.05]}><boxGeometry args={[.72,.08,.3]}/><meshStandardMaterial color={BRONZE} metalness={.6}/></mesh>
  </group>;
  if (id === 'plato') return <group position={position}>
    {[.18, .29, .4].map((radius, index) => <mesh key={radius} position={[0, index * .03, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[radius, .025, 7, 28, Math.PI]}/><meshStandardMaterial color={index === 2 ? DARK_BRONZE : accent} metalness={.55}/></mesh>)}
    <mesh position={[0, -.2, 0]}><sphereGeometry args={[.09, 12, 9]}/><meshBasicMaterial color="#f0ddaa" toneMapped={false}/></mesh>
    <mesh position={[0,-.23,-.04]}><boxGeometry args={[.8,.07,.28]}/><meshStandardMaterial color={BRONZE} metalness={.6}/></mesh>
  </group>;
  return <group position={position}>
    {[[-.2,.16],[.2,.16],[-.2,-.18],[.2,-.18]].map(([x,y], index) => <mesh key={index} position={[x,y,0]}><sphereGeometry args={[.095, 12, 9]}/><meshStandardMaterial color={index === 3 ? accent : LIMESTONE} metalness={index === 3 ? .5 : 0} roughness={.68}/></mesh>)}
    <mesh><boxGeometry args={[.58,.58,.035]}/><meshStandardMaterial color={BRONZE} metalness={.65} roughness={.42}/></mesh>
  </group>;
}

function PhilosopherBay({layout, accent, nearby}: {layout: MuseumExhibitLayout; accent: string; nearby: boolean}) {
  const scene = layout.scene;
  const base = bound(scene, `${layout.id}-plinth`);
  const backing = bound(scene, `${layout.id}-backing`);
  const concept = bound(scene, `${layout.id}-concept`);
  return <group>
    <BoxVolume volume={base}/>
    <DisplayBacking volume={backing} accent={accent}/>
    {scene.mediaMounts.map((mount) => <MuseumSceneMedia key={mount.id} mount={mount} nearby={nearby} accent={accent}/>)}
    <PhilosopherSignature id={layout.id as 'socrates' | 'plato' | 'aristotle'} accent={accent} volume={concept}/>
  </group>;
}

const pithosProfile = [
  [.34, 0], [.49, .08], [.58, .35], [.61, .78], [.56, 1.08], [.47, 1.28], [.34, 1.39], [.31, 1.48],
].map(([radius, y]) => new Vector2(radius, y));

function CynicismInstallation({layout, accent, nearby}: {layout: MuseumExhibitLayout; accent: string; nearby: boolean}) {
  const scene = layout.scene;
  const base = bound(scene, 'cynicism-plinth');
  const backing = bound(scene, 'cynicism-backing');
  const vessel = bound(scene, 'cynicism-pithos');
  const lamp = bound(scene, 'cynicism-lamp');
  const bottomY = vessel.center.y - vessel.size.height / 2;
  const vesselScale: [number, number, number] = [
    vessel.size.width / 1.46,
    vessel.size.height / 1.615,
    vessel.size.depth / 1.22,
  ];
  return <group>
    <BoxVolume volume={base}/>
    <DisplayBacking volume={backing} accent={accent}/>
    {scene.mediaMounts.map((mount) => <MuseumSceneMedia key={mount.id} mount={mount} nearby={nearby} accent={accent}/>)}
    <group position={[vessel.center.x, bottomY, vessel.center.z]} scale={vesselScale}>
      <mesh><latheGeometry args={[pithosProfile, 28]}/><meshStandardMaterial color={TERRACOTTA} roughness={.9} metalness={.02}/></mesh>
      <mesh position={[0,1.48,0]}><cylinderGeometry args={[.31,.32,.12,28]}/><meshStandardMaterial color="#714634" roughness={.88}/></mesh>
      <mesh position={[0,1.56,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.34,.055,10,32]}/><meshStandardMaterial color="#6b4030" roughness={.86}/></mesh>
      <mesh position={[0,1.555,0]}><cylinderGeometry args={[.27,.27,.018,28]}/><meshStandardMaterial color="#17100e" roughness={1}/></mesh>
      {[-.53,.53].map((x) => <mesh key={x} position={[x,1.15,0]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[.2,.045,8,24,Math.PI*1.45]}/><meshStandardMaterial color="#714634" roughness={.88}/></mesh>)}
    </group>
    <group position={[lamp.center.x, lamp.center.y - .265, lamp.center.z]}>
      <mesh position={[0,.18,0]}><cylinderGeometry args={[.03,.04,.42,8]}/><meshStandardMaterial color={BRONZE} metalness={.68}/></mesh>
      <mesh position={[.05,.42,0]} rotation={[0,0,-.25]}><coneGeometry args={[.13,.25,12]}/><meshStandardMaterial color="#6b4d2f" roughness={.65}/></mesh>
      <mesh position={[0,-.02,0]}><boxGeometry args={[.42,.07,.3]}/><meshStandardMaterial color={BRONZE} metalness={.6}/></mesh>
    </group>
  </group>;
}

function EpicureanInstallation({layout, accent, nearby}: {layout: MuseumExhibitLayout; accent: string; nearby: boolean}) {
  const scene = layout.scene;
  const base = bound(scene, 'epicureanism-plinth');
  const backing = bound(scene, 'epicureanism-backing');
  const caseBounds = bound(scene, 'epicureanism-atom-case');
  return <group>
    <BoxVolume volume={base} color="#53604f" roughness={.88}/>
    <DisplayBacking volume={backing} accent={accent}/>
    {scene.mediaMounts.map((mount) => <MuseumSceneMedia key={mount.id} mount={mount} nearby={nearby} accent={accent}/>)}
    <group position={[caseBounds.center.x,caseBounds.center.y,caseBounds.center.z]}>
      <mesh><boxGeometry args={[caseBounds.size.width,caseBounds.size.height,caseBounds.size.depth]}/><meshPhysicalMaterial color="#b8c2b7" transparent opacity={.13} roughness={.18} transmission={.25} thickness={.03}/></mesh>
      <mesh position={[0,-caseBounds.size.height/2-.05,0]}><boxGeometry args={[caseBounds.size.width+.12,.1,caseBounds.size.depth+.12]}/><meshStandardMaterial color={BRONZE} metalness={.62}/></mesh>
      {[[-.32,-.12,.12,.08],[0,.08,0,.11],[.31,-.08,-.1,.07]].map(([x,y,z,size],index)=><mesh key={index} position={[x,y,z]}><icosahedronGeometry args={[size,1]}/><meshStandardMaterial color={index===1?accent:'#9aa882'} roughness={.5}/></mesh>)}
      <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.38,.018,7,32]}/><meshStandardMaterial color={BRONZE} metalness={.58}/></mesh>
    </group>
  </group>;
}

function StoicismInstallation({layout, accent, nearby}: {layout: MuseumExhibitLayout; accent: string; nearby: boolean}) {
  const scene = layout.scene;
  const base = bound(scene, 'stoicism-plinth');
  const backing = bound(scene, 'stoicism-backing');
  const relief = bound(scene, 'stoicism-control-relief');
  return <group>
    <BoxVolume volume={base} color="#394449"/>
    <DisplayBacking volume={backing} accent={accent}/>
    {scene.mediaMounts.map((mount) => <MuseumSceneMedia key={mount.id} mount={mount} nearby={nearby} accent={accent}/>)}
    <group position={[relief.center.x,relief.center.y,relief.center.z]}>
      <mesh position={[0,0,-.06]}><boxGeometry args={[relief.size.width,relief.size.height,.12]}/><meshStandardMaterial color="#232a2c" roughness={.82}/></mesh>
      {[[1.0,.55],[.68,.37],[.36,.19]].map(([width,height],index)=><group key={width} position={[0,0,index*.025]}>
        <mesh position={[-width/2,0,0]}><boxGeometry args={[.035,height,.04]}/><meshStandardMaterial color={index?accent:BRONZE} metalness={.7}/></mesh>
        <mesh position={[width/2,0,0]}><boxGeometry args={[.035,height,.04]}/><meshStandardMaterial color={index?accent:BRONZE} metalness={.7}/></mesh>
        <mesh position={[0,height/2,0]}><boxGeometry args={[width,.035,.04]}/><meshStandardMaterial color={index?accent:BRONZE} metalness={.7}/></mesh>
      </group>)}
    </group>
  </group>;
}

function SkepticismInstallation({layout, accent, nearby}: {layout: MuseumExhibitLayout; accent: string; nearby: boolean}) {
  const scene = layout.scene;
  const base = bound(scene, 'skepticism-plinth');
  const backing = bound(scene, 'skepticism-backing');
  const balance = bound(scene, 'skepticism-balance');
  return <group>
    <BoxVolume volume={base}/>
    <DisplayBacking volume={backing} accent={accent}/>
    {scene.mediaMounts.map((mount) => <MuseumSceneMedia key={mount.id} mount={mount} nearby={nearby} accent={accent}/>)}
    <group position={[balance.center.x,balance.center.y,balance.center.z]}>
      <mesh position={[0,-.4,0]}><boxGeometry args={[.68,.08,.38]}/><meshStandardMaterial color={DARK_BRONZE} metalness={.65}/></mesh>
      <mesh position={[0,-.05,0]}><cylinderGeometry args={[.035,.05,.7,10]}/><meshStandardMaterial color={BRONZE} metalness={.68}/></mesh>
      <mesh position={[0,.28,0]}><cylinderGeometry args={[.12,.12,.12,12]}/><meshStandardMaterial color={accent} metalness={.62}/></mesh>
      <mesh position={[0,.34,0]} rotation={[0,0,.035]}><boxGeometry args={[1.12,.045,.06]}/><meshStandardMaterial color={BRONZE} metalness={.7}/></mesh>
      {[-.45,.45].map((x)=><group key={x} position={[x,.1,0]}><mesh position={[0,.12,0]}><cylinderGeometry args={[.012,.012,.4,6]}/><meshStandardMaterial color={BRONZE}/></mesh><mesh position={[0,-.1,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.17,.025,8,24,Math.PI]}/><meshStandardMaterial color={LIMESTONE}/></mesh></group>)}
    </group>
  </group>;
}

function NeoplatonismInstallation({layout, accent, nearby}: {layout: MuseumExhibitLayout; accent: string; nearby: boolean}) {
  const scene = layout.scene;
  const base = bound(scene, 'neoplatonism-plinth');
  const wall = bound(scene, 'neoplatonism-end-wall');
  const relief = bound(scene, 'neoplatonism-emanation-relief');
  const reliefRadius = Math.min(relief.size.width, relief.size.height) / 2;
  const ringRadii = [reliefRadius * .82, reliefRadius * .56, reliefRadius * .29];
  return <group>
    <BoxVolume volume={base} color="#38343f" roughness={.78}/>
    <mesh position={[base.center.x, base.center.y + base.size.height / 2 + .025, base.center.z + base.size.depth / 2 - .055]}>
      <boxGeometry args={[base.size.width - .2, .05, .08]}/>
      <meshStandardMaterial color={BRONZE} metalness={.58} roughness={.42}/>
    </mesh>
    <DisplayBacking volume={wall} accent={accent}/>
    {scene.mediaMounts.map((mount) => <MuseumSceneMedia key={mount.id} mount={mount} nearby={nearby} accent={accent}/>)}
    <group position={[relief.center.x,relief.center.y,relief.center.z]}>
      <mesh position={[0,0,-.08]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[reliefRadius,reliefRadius,.12,48]}/><meshStandardMaterial color="#171d21" metalness={.2} roughness={.78}/></mesh>
      {ringRadii.map((radius,index)=><mesh key={radius} position={[0,0,.02+index*.018]}><torusGeometry args={[radius,reliefRadius*(.035+index*.006),9,44]}/><meshStandardMaterial color={index===2?LIMESTONE:accent} metalness={.54} roughness={.38}/></mesh>)}
      <mesh position={[0,0,.07]}><sphereGeometry args={[reliefRadius*.13,18,14]}/><meshStandardMaterial color="#ead8b7" roughness={.35}/></mesh>
    </group>
  </group>;
}

function ExhibitInstallation({layout, accent, nearby}: {layout: MuseumExhibitLayout; accent: string; nearby: boolean}) {
  switch (layout.id) {
    case 'socrates':
    case 'plato':
    case 'aristotle': return <PhilosopherBay layout={layout} accent={accent} nearby={nearby}/>;
    case 'cynicism': return <CynicismInstallation layout={layout} accent={accent} nearby={nearby}/>;
    case 'epicureanism': return <EpicureanInstallation layout={layout} accent={accent} nearby={nearby}/>;
    case 'stoicism': return <StoicismInstallation layout={layout} accent={accent} nearby={nearby}/>;
    case 'skepticism': return <SkepticismInstallation layout={layout} accent={accent} nearby={nearby}/>;
    case 'neoplatonism': return <NeoplatonismInstallation layout={layout} accent={accent} nearby={nearby}/>;
  }
}

export function MuseumExhibits({definition, nearbyId, onSelectExhibit}: {
  definition: MuseumHallDefinition;
  nearbyId?: MuseumExhibitId;
  onSelectExhibit: (exhibitId: MuseumExhibitId) => void;
}) {
  const hall = getMuseumHallCatalog(definition.id)!;
  return <group>
    {definition.layout.exhibits.map((layout) => {
      const catalog = hall.exhibits.find(({id}) => id === layout.id)!;
      const accent = zoneAccents[layout.zoneId];
      const nearby = nearbyId === layout.id;
      const philosopher = catalog.entityKind === 'philosopher';
      const activate = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        if (event.delta <= 7) onSelectExhibit(layout.id);
      };
      const interaction = layout.scene.interactionBounds;
      return <group key={layout.id} position={[layout.position.x,0,layout.position.z]} rotation={[0,layout.rotationY,0]}>
        <ExhibitInstallation layout={layout} accent={accent} nearby={nearby}/>
        <ExhibitPlaque scene={layout.scene} title={catalog.displayName} kind={philosopher?'Philosopher bay':'School & tradition'} accent={accent}/>
        <mesh onClick={activate} position={[interaction.center.x,interaction.center.y,interaction.center.z]}>
          <boxGeometry args={[interaction.size.width,interaction.size.height,interaction.size.depth]}/>
          <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false}/>
        </mesh>
      </group>;
    })}
  </group>;
}
