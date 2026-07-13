import type {ThreeEvent} from '@react-three/fiber';
import type {ReactNode} from 'react';
import type {MuseumExhibitLayout, MuseumHallDefinition, MuseumSceneVolume} from '../../data/museum/museumWorldTypes';
import {getMuseumHallCatalog, type MuseumExhibitId, type MuseumZoneId} from '../../data/museumCatalog';
import {MuseumSceneMedia} from './MuseumSceneMedia';
import {usePlaqueTexture} from './plaqueTextures';

const zoneAccents: Partial<Record<MuseumZoneId, string>> = {
  'power-and-method': '#9b7145',
  'sovereignty-rights-nature': '#54758b',
  'experience-freedom-critique': '#8b5d64',
  'faith-alienation-crisis': '#75648d',
  'existence-freedom-absurd': '#a06745',
  'power-knowledge-institutions': '#496d70',
};

function bound(layout: MuseumExhibitLayout, suffix: string): MuseumSceneVolume {
  const item = layout.scene.objectBounds.find(({id}) => id === `${layout.id}-${suffix}`);
  if (!item) throw new Error(`Missing contemporary exhibit volume ${layout.id}-${suffix}.`);
  return item;
}

function Box({volume, color, roughness = .86, metalness = 0}: {volume: MuseumSceneVolume; color: string; roughness?: number; metalness?: number}) {
  return <mesh position={[volume.center.x, volume.center.y, volume.center.z]}><boxGeometry args={[volume.size.width, volume.size.height, volume.size.depth]}/><meshStandardMaterial color={color} roughness={roughness} metalness={metalness}/></mesh>;
}

function ConceptStage({volume, children}: {volume: MuseumSceneVolume; children: ReactNode}) {
  return <group position={[volume.center.x, volume.center.y, volume.center.z]}>
    <mesh position={[0, -volume.size.height / 2 + .035, 0]}><boxGeometry args={[volume.size.width, .07, volume.size.depth]}/><meshStandardMaterial color="#222526" metalness={.58} roughness={.38}/></mesh>
    {children}
  </group>;
}

function ConceptObject({id, volume, accent}: {id: MuseumExhibitId; volume: MuseumSceneVolume; accent: string}) {
  const metal = <meshStandardMaterial color={accent} metalness={.5} roughness={.42}/>;
  const dark = <meshStandardMaterial color="#303334" metalness={.42} roughness={.48}/>;
  switch (id) {
    case 'machiavelli': return <ConceptStage volume={volume}>{[-.26, .26].map((x) => <mesh key={x} position={[x, -.04, 0]}><boxGeometry args={[.22, .38, .28]}/>{metal}</mesh>)}<mesh position={[0, -.12, 0]}><boxGeometry args={[.32, .16, .42]}/>{dark}</mesh></ConceptStage>;
    case 'descartes': return <ConceptStage volume={volume}><mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.2, .2, .05, 24]}/>{metal}</mesh>{[0, Math.PI / 2].map((r) => <mesh key={r} rotation={[r, 0, 0]}><torusGeometry args={[.27, .018, 8, 36]}/>{dark}</mesh>)}</ConceptStage>;
    case 'hobbes': return <ConceptStage volume={volume}>{[-.19, .19].map((x) => <mesh key={x} position={[x, -.06, 0]} rotation={[0, x, 0]}><boxGeometry args={[.34, .42, .36]}/>{x < 0 ? dark : metal}</mesh>)}</ConceptStage>;
    case 'locke': return <ConceptStage volume={volume}>{[-.18, .18].map((x) => <mesh key={x} position={[x, 0, 0]} rotation={[0, x * .45, 0]}><boxGeometry args={[.28, .44, .05]}/><meshPhysicalMaterial color={x < 0 ? '#e6e1d7' : accent} transparent opacity={.72} roughness={.2}/></mesh>)}</ConceptStage>;
    case 'spinoza': return <ConceptStage volume={volume}><mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.25, .045, 12, 40]}/>{metal}</mesh>{[-.2, 0, .2].map((x) => <mesh key={x} position={[x, 0, 0]}><sphereGeometry args={[.06, 14, 10]}/>{dark}</mesh>)}</ConceptStage>;
    case 'hume': return <ConceptStage volume={volume}>{[-.25, .25].map((x) => <mesh key={x} position={[x, -.04, 0]}><sphereGeometry args={[.16, 20, 14]}/>{x < 0 ? dark : metal}</mesh>)}<mesh position={[0, -.05, 0]}><boxGeometry args={[.12, .025, .025]}/><meshBasicMaterial color="#ddd7cb"/></mesh></ConceptStage>;
    case 'rousseau': return <ConceptStage volume={volume}>{[-.13, .13].map((x) => <mesh key={x} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.2, .045, 12, 36]}/>{x < 0 ? dark : metal}</mesh>)}</ConceptStage>;
    case 'kant': return <ConceptStage volume={volume}>{[-.24, 0, .24].map((x, index) => <mesh key={x} position={[x, -.02 + index * .04, 0]}><boxGeometry args={[.16, .34 + index * .08, .34]}/>{index === 1 ? metal : dark}</mesh>)}</ConceptStage>;
    case 'kierkegaard': return <ConceptStage volume={volume}>{[-.18, .18].map((x) => <mesh key={x} position={[x, -.04, 0]} rotation={[0, x * 1.2, x * .6]}><boxGeometry args={[.08, .4, .08]}/>{x < 0 ? dark : metal}</mesh>)}</ConceptStage>;
    case 'marx': return <ConceptStage volume={volume}>{[-.22, 0, .22].map((x, index) => <mesh key={x} position={[x, -.12 + index * .1, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.14, .14, .18, 10]}/>{index === 1 ? metal : dark}</mesh>)}</ConceptStage>;
    case 'nietzsche': return <ConceptStage volume={volume}>{[-.24, 0, .24].map((x, index) => <mesh key={x} position={[x, -.1 + index * .12, 0]} rotation={[0, 0, -.18 + index * .18]}><coneGeometry args={[.16, .4, 4]}/>{index === 2 ? metal : dark}</mesh>)}</ConceptStage>;
    case 'heidegger': return <ConceptStage volume={volume}><mesh position={[-.12, -.02, 0]} rotation={[0, 0, -.45]}><boxGeometry args={[.11, .5, .11]}/>{dark}</mesh><mesh position={[.1, .12, 0]}><boxGeometry args={[.36, .14, .18]}/>{metal}</mesh></ConceptStage>;
    case 'sartre': return <ConceptStage volume={volume}><mesh position={[-.1, .02, -.06]} rotation={[0, -.2, 0]}><boxGeometry args={[.38, .42, .04]}/><meshPhysicalMaterial color="#b8c5c5" metalness={.72} roughness={.12}/></mesh><mesh position={[.2, -.04, .05]}><boxGeometry args={[.18, .32, .16]}/>{metal}</mesh></ConceptStage>;
    case 'beauvoir': return <ConceptStage volume={volume}>{[-.16, 0, .16].map((x, index) => <mesh key={x} position={[x, 0, index * .04]} rotation={[0, x * .45, 0]}><boxGeometry args={[.28, .42, .035]}/><meshPhysicalMaterial color={index === 1 ? accent : '#d8d7d2'} transparent opacity={.62} roughness={.18}/></mesh>)}</ConceptStage>;
    case 'camus': return <ConceptStage volume={volume}><mesh position={[-.15, -.06, 0]} rotation={[0, 0, -.22]}><boxGeometry args={[.48, .08, .34]}/>{dark}</mesh><mesh position={[.14, .02, 0]}><dodecahedronGeometry args={[.18, 0]}/>{metal}</mesh></ConceptStage>;
    case 'foucault': return <ConceptStage volume={volume}>{[.12, .23, .34].map((radius, index) => <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[radius, .018, 8, 40]}/>{index === 1 ? metal : dark}</mesh>)}{[0, Math.PI / 2].map((r) => <mesh key={r} rotation={[0, 0, r]}><boxGeometry args={[.03, .62, .03]}/>{metal}</mesh>)}</ConceptStage>;
    default: return <ConceptStage volume={volume}><mesh><boxGeometry args={[.42, .4, .34]}/>{metal}</mesh></ConceptStage>;
  }
}

function Plaque({layout, title, accent}: {layout: MuseumExhibitLayout; title: string; accent: string}) {
  const plaque = layout.scene.plaque;
  const texture = usePlaqueTexture({title, kicker: 'Philosopher · object · argument', subtitle: 'Approach or select for interpretation', accent});
  return <group position={plaque.position}>
    <mesh position={[0, -plaque.height / 2 - plaque.supportHeight / 2, -.04]}><boxGeometry args={[.07, plaque.supportHeight, .07]}/><meshStandardMaterial color="#242627" metalness={.56} roughness={.4}/></mesh>
    <mesh position={[0, -plaque.height / 2 - plaque.supportHeight, .01]}><boxGeometry args={[.62, .07, .38]}/><meshStandardMaterial color="#242627" metalness={.52} roughness={.44}/></mesh>
    <group rotation={plaque.rotation}>
      <mesh position={[0, 0, -.055]}><boxGeometry args={[plaque.width + .14, plaque.height + .12, .11]}/><meshStandardMaterial color="#242627" roughness={.58}/></mesh>
      <mesh position={[0, 0, .015]}><planeGeometry args={[plaque.width, plaque.height]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    </group>
  </group>;
}

function NameStrip({layout, title, accent}: {layout: MuseumExhibitLayout; title: string; accent: string}) {
  const backing = bound(layout, 'backing');
  const texture = usePlaqueTexture({title, kicker: 'Philosophy Atlas', subtitle: 'Select for the full interpretation', accent, width: 1200, height: 190});
  return <group position={[0, backing.center.y + backing.size.height / 2 - .24, backing.center.z + backing.size.depth / 2 + .012]}>
    <mesh position={[0, 0, -.025]}><boxGeometry args={[backing.size.width - .1, .4, .05]}/><meshStandardMaterial color="#242627" roughness={.54}/></mesh>
    <mesh position={[0, 0, .004]}><planeGeometry args={[backing.size.width - .18, .34]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
  </group>;
}

function Installation({layout, title, nearby}: {layout: MuseumExhibitLayout; title: string; nearby: boolean}) {
  const accent = zoneAccents[layout.zoneId] ?? '#826b48';
  const base = bound(layout, 'plinth');
  const backing = bound(layout, 'backing');
  const concept = bound(layout, 'concept');
  const interaction = layout.scene.interactionBounds;
  return <group>
    <Box volume={base} color="#706d67"/>
    <Box volume={backing} color="#d6d2ca" roughness={.95}/>
    <NameStrip layout={layout} title={title} accent={accent}/>
    {layout.scene.mediaMounts.map((mount) => <MuseumSceneMedia key={mount.id} mount={mount} nearby={nearby} accent={accent}/>)}
    <ConceptObject id={layout.id} volume={concept} accent={accent}/>
    <Plaque layout={layout} title={title} accent={accent}/>
    <mesh position={[interaction.center.x, interaction.center.y, interaction.center.z]} userData={{interactionFor: layout.id}}>
      <boxGeometry args={[interaction.size.width, interaction.size.height, interaction.size.depth]}/><meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false}/>
    </mesh>
  </group>;
}

export function ContemporaryMuseumExhibits({definition, nearbyId, visibleExhibitIds, onSelectExhibit}: {
  definition: MuseumHallDefinition;
  nearbyId?: MuseumExhibitId;
  visibleExhibitIds?: readonly MuseumExhibitId[];
  onSelectExhibit: (id: MuseumExhibitId) => void;
}) {
  const hall = getMuseumHallCatalog(definition.id);
  if (!hall) return null;
  return <group>{definition.layout.exhibits.filter((layout) => !visibleExhibitIds || visibleExhibitIds.includes(layout.id)).map((layout) => {
    const catalog = hall.exhibits.find(({id}) => id === layout.id)!;
    const activate = (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      if (event.delta <= 7) onSelectExhibit(layout.id);
    };
    return <group key={layout.id} position={[layout.position.x, 0, layout.position.z]} rotation={[0, layout.rotationY, 0]} onClick={activate}>
      <Installation layout={layout} title={catalog.displayName} nearby={nearbyId === layout.id}/>
    </group>;
  })}</group>;
}
