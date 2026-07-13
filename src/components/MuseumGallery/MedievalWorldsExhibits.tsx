import type {ThreeEvent} from '@react-three/fiber';
import type {MuseumExhibitLayout, MuseumHallDefinition, MuseumSceneVolume} from '../../data/museum/museumWorldTypes';
import {getMuseumHallCatalog, type MuseumExhibitId} from '../../data/museumCatalog';
import {MuseumSceneMedia} from './MuseumSceneMedia';
import {usePlaqueTexture} from './plaqueTextures';

const zoneAccents = {
  'late-antique-inheritance': '#8b6048',
  'arabic-islamic-worlds': '#34746d',
  'jewish-latin-scholastic': '#75613e',
} as const;

function bound(layout: MuseumExhibitLayout, suffix: string): MuseumSceneVolume {
  const item = layout.scene.objectBounds.find(({id}) => id === `${layout.id}-${suffix}`);
  if (!item) throw new Error(`Missing Medieval exhibit volume ${layout.id}-${suffix}.`);
  return item;
}

function Box({volume, color, roughness = .86, metalness = 0}: {volume: MuseumSceneVolume; color: string; roughness?: number; metalness?: number}) {
  return <mesh position={[volume.center.x, volume.center.y, volume.center.z]}><boxGeometry args={[volume.size.width, volume.size.height, volume.size.depth]}/><meshStandardMaterial color={color} roughness={roughness} metalness={metalness}/></mesh>;
}

function ManuscriptConcept({volume, accent, index}: {volume: MuseumSceneVolume; accent: string; index: number}) {
  return <group position={[volume.center.x, volume.center.y, volume.center.z]} rotation={[0, index % 2 ? -.18 : .16, 0]}>
    <mesh position={[0, -volume.size.height / 2 + .045, 0]}><boxGeometry args={[volume.size.width, .09, volume.size.depth]}/><meshStandardMaterial color="#735b37" metalness={.48} roughness={.5}/></mesh>
    <mesh position={[0, -.12, 0]}><boxGeometry args={[volume.size.width - .12, .12, volume.size.depth - .1]}/><meshStandardMaterial color="#68462f" roughness={.8}/></mesh>
    <mesh position={[0, -.049, 0]}><boxGeometry args={[volume.size.width - .21, .035, volume.size.depth - .17]}/><meshStandardMaterial color="#d8c59c" roughness={.93}/></mesh>
    <mesh position={[0, -.022, 0]}><boxGeometry args={[.035, .02, volume.size.depth - .22]}/><meshStandardMaterial color={accent} metalness={.28} roughness={.58}/></mesh>
    {[-.18, -.09, .09, .18].map((z) => <mesh key={z} position={[0, -.008, z]}><boxGeometry args={[volume.size.width * .6, .009, .012]}/><meshStandardMaterial color="#4f4033" roughness={.9}/></mesh>)}
    <mesh position={[0, .04, 0]}><boxGeometry args={[volume.size.width - .05, volume.size.height - .12, volume.size.depth - .04]}/><meshPhysicalMaterial color="#e5ddd0" transparent opacity={.12} roughness={.12} metalness={0} depthWrite={false}/></mesh>
    {[-1, 1].flatMap((x) => [-1, 1].map((z) => <mesh key={`${x}-${z}`} position={[x * (volume.size.width / 2 - .025), .02, z * (volume.size.depth / 2 - .025)]}><boxGeometry args={[.035, volume.size.height - .08, .035]}/><meshStandardMaterial color="#735b37" metalness={.54} roughness={.44}/></mesh>))}
  </group>;
}

function Plaque({layout, title, accent}: {layout: MuseumExhibitLayout; title: string; accent: string}) {
  const plaque = layout.scene.plaque;
  const texture = usePlaqueTexture({title, kicker: 'Philosopher · texts · transmission', subtitle: 'Approach or select for interpretation', accent});
  const postY = -plaque.height / 2 - plaque.supportHeight / 2;
  const footY = -plaque.height / 2 - plaque.supportHeight;
  return <group position={plaque.position}>
    <mesh position={[0, postY, -.04]}><boxGeometry args={[.07, plaque.supportHeight, .07]}/><meshStandardMaterial color="#735b37" metalness={.56} roughness={.46}/></mesh>
    <mesh position={[0, footY, .01]}><boxGeometry args={[.62, .07, .38]}/><meshStandardMaterial color="#735b37" metalness={.52} roughness={.48}/></mesh>
    <group rotation={plaque.rotation}>
      <mesh position={[0, 0, -.055]}><boxGeometry args={[plaque.width + .14, plaque.height + .12, .11]}/><meshStandardMaterial color="#4b3022" roughness={.7}/></mesh>
      <mesh position={[0, 0, .015]}><planeGeometry args={[plaque.width, plaque.height]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    </group>
  </group>;
}

function Installation({layout, title, nearby, index}: {layout: MuseumExhibitLayout; title: string; nearby: boolean; index: number}) {
  const accent = zoneAccents[layout.zoneId as keyof typeof zoneAccents] ?? '#8b6b38';
  const base = bound(layout, 'plinth');
  const backing = bound(layout, 'backing');
  const concept = bound(layout, 'concept');
  const interaction = layout.scene.interactionBounds;
  return <group>
    <Box volume={base} color="#7b6b56"/>
    <Box volume={backing} color="#c6b79f" roughness={.94}/>
    <mesh position={[backing.center.x, backing.center.y + backing.size.height / 2 - .065, backing.center.z + backing.size.depth / 2 + .01]}><boxGeometry args={[backing.size.width - .08, .08, .04]}/><meshStandardMaterial color={accent} metalness={.32} roughness={.54}/></mesh>
    {layout.scene.mediaMounts.map((mount) => <MuseumSceneMedia key={mount.id} mount={mount} nearby={nearby} accent={accent}/>)}
    <ManuscriptConcept volume={concept} accent={accent} index={index}/>
    <Plaque layout={layout} title={title} accent={accent}/>
    <mesh position={[interaction.center.x, interaction.center.y, interaction.center.z]} userData={{interactionFor: layout.id}}>
      <boxGeometry args={[interaction.size.width, interaction.size.height, interaction.size.depth]}/><meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false}/>
    </mesh>
  </group>;
}

export function MedievalWorldsExhibits({definition, nearbyId, visibleExhibitIds, onSelectExhibit}: {definition: MuseumHallDefinition; nearbyId?: MuseumExhibitId; visibleExhibitIds?: readonly MuseumExhibitId[]; onSelectExhibit: (id: MuseumExhibitId) => void}) {
  const hall = getMuseumHallCatalog('medieval-worlds');
  return <group>{definition.layout.exhibits.filter((layout) => !visibleExhibitIds || visibleExhibitIds.includes(layout.id)).map((layout, index) => {
    const catalog = hall.exhibits.find(({id}) => id === layout.id)!;
    const activate = (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      if (event.delta <= 7) onSelectExhibit(layout.id);
    };
    return <group key={layout.id} position={[layout.position.x, 0, layout.position.z]} rotation={[0, layout.rotationY, 0]} onClick={activate}>
      <Installation layout={layout} title={catalog.displayName} nearby={nearbyId === layout.id} index={index}/>
    </group>;
  })}</group>;
}
