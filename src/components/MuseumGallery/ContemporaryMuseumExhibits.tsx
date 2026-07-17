import type {ThreeEvent} from '@react-three/fiber';
import type {ReactNode} from 'react';
import type {MuseumExhibitLayout, MuseumHallDefinition, MuseumSceneVolume} from '../../data/museum/museumWorldTypes';
import {getMuseumHallCatalog, type MuseumExhibitId, type MuseumZoneId} from '../../data/museumCatalog';
import {
  MUSEUM_TEXTURE_SPECS,
  museumTextureDimensionsForPlane,
} from '../../data/museum/museumTexturePolicy';
import {MuseumSceneMedia} from './MuseumSceneMedia';
import {usePlaqueTexture} from './plaqueTextures';

const zoneAccents: Partial<Record<MuseumZoneId, string>> = {
  'power-and-method': '#9b7145',
  'sovereignty-rights-nature': '#54758b',
  'experience-freedom-critique': '#8b5d64',
  'faith-alienation-crisis': '#75648d',
  'existence-freedom-absurd': '#a06745',
  'power-knowledge-institutions': '#496d70',
  'signs-and-structures': '#3f7180',
  'inquiry-and-testing': '#7b6041',
  'webs-and-revolutions': '#665783',
  'utility-equality-liberty': '#907044',
  'freedom-decolonization-public-life': '#7d535b',
  'justice-rights-democratic-reason': '#4e6f83',
  'disciplines-of-mind-and-self': '#727059',
  'experience-intentionality-embodiment': '#5d7188',
  'action-consciousness-personhood': '#756080',
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
    case 'peirce': return <ConceptStage volume={volume}>{[-.22, 0, .22].map((x, index) => <mesh key={x} position={[x, index === 1 ? .11 : -.08, 0]}><sphereGeometry args={[.09, 16, 12]}/>{index === 1 ? metal : dark}</mesh>)}<mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.28, .018, 8, 36]}/>{metal}</mesh></ConceptStage>;
    case 'frege': return <ConceptStage volume={volume}><mesh position={[-.18, 0, 0]}><boxGeometry args={[.08, .48, .08]}/>{dark}</mesh><mesh position={[.07, .18, 0]}><boxGeometry args={[.38, .08, .08]}/>{metal}</mesh><mesh position={[.2, -.07, 0]}><sphereGeometry args={[.1, 16, 12]}/>{metal}</mesh></ConceptStage>;
    case 'russell': return <ConceptStage volume={volume}>{[-.24, 0, .24].map((x, index) => <mesh key={x} position={[x, index === 1 ? .11 : -.06, 0]}><octahedronGeometry args={[.12, 0]}/>{index === 1 ? metal : dark}</mesh>)}<mesh position={[0, .02, 0]}><boxGeometry args={[.46, .025, .025]}/><meshBasicMaterial color="#ddd7cb"/></mesh></ConceptStage>;
    case 'dewey': return <ConceptStage volume={volume}>{[-.22, 0, .22].map((x, index) => <mesh key={x} position={[x, -.12 + index * .11, 0]}><boxGeometry args={[.18, .16 + index * .07, .26]}/>{index === 2 ? metal : dark}</mesh>)}</ConceptStage>;
    case 'carnap': return <ConceptStage volume={volume}>{[-.2, 0, .2].flatMap((x) => [-.14, .14].map((y) => <mesh key={`${x}-${y}`} position={[x, y, 0]}><boxGeometry args={[.1, .1, .1]}/>{x === 0 ? metal : dark}</mesh>))}</ConceptStage>;
    case 'popper': return <ConceptStage volume={volume}><mesh position={[-.16, -.02, 0]} rotation={[0, 0, Math.PI]}><coneGeometry args={[.16, .42, 12]}/>{dark}</mesh><mesh position={[.2, .06, 0]}><octahedronGeometry args={[.16, 0]}/>{metal}</mesh></ConceptStage>;
    case 'quine': return <ConceptStage volume={volume}><mesh rotation={[Math.PI / 2, 0, 0]}><torusKnotGeometry args={[.2, .035, 64, 8, 2, 3]}/>{metal}</mesh>{[-.25, .25].map((x) => <mesh key={x} position={[x, 0, 0]}><sphereGeometry args={[.055, 12, 8]}/>{dark}</mesh>)}</ConceptStage>;
    case 'kuhn': return <ConceptStage volume={volume}>{[-.16, .16].map((x, index) => <mesh key={x} position={[x, index ? .1 : -.08, 0]} rotation={[0, index ? .45 : 0, index ? .18 : 0]}><boxGeometry args={[.3, .3, .3]}/>{index ? metal : dark}</mesh>)}</ConceptStage>;
    case 'bentham': return <ConceptStage volume={volume}>{[-.24, -.08, .08, .24].map((x, index) => <mesh key={x} position={[x, -.09 + (index % 2) * .08, 0]}><sphereGeometry args={[.09, 14, 10]}/>{index === 3 ? metal : dark}</mesh>)}</ConceptStage>;
    case 'wollstonecraft': return <ConceptStage volume={volume}>{[-.2, 0, .2].map((x, index) => <mesh key={x} position={[x, 0, 0]}><cylinderGeometry args={[.07, .09, .42, 14]}/>{index === 1 ? metal : dark}</mesh>)}</ConceptStage>;
    case 'mill': return <ConceptStage volume={volume}><mesh position={[0, -.07, 0]}><cylinderGeometry args={[.055, .08, .38, 14]}/>{dark}</mesh>{[-.2, 0, .2].map((x, index) => <mesh key={x} position={[x, .12 + Math.abs(x) * .2, 0]} rotation={[0, 0, x * 1.4]}><coneGeometry args={[.09, .2, 12]}/>{index === 1 ? metal : dark}</mesh>)}</ConceptStage>;
    case 'arendt': return <ConceptStage volume={volume}><mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.25, .025, 10, 40]}/>{metal}</mesh>{[-.2, 0, .2].map((x) => <mesh key={x} position={[x, 0, 0]}><sphereGeometry args={[.07, 14, 10]}/>{dark}</mesh>)}</ConceptStage>;
    case 'fanon': return <ConceptStage volume={volume}>{[-.16, .16].map((x) => <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, x < 0 ? -.22 : .22]}><boxGeometry args={[.24, .44, .18]}/>{x < 0 ? dark : metal}</mesh>)}</ConceptStage>;
    case 'rawls': return <ConceptStage volume={volume}>{[-.2, .2].map((x) => <mesh key={x} position={[x, -.02, 0]}><boxGeometry args={[.12, .42, .2]}/>{dark}</mesh>)}<mesh position={[0, .02, .08]}><boxGeometry args={[.5, .34, .025]}/><meshPhysicalMaterial color={accent} transparent opacity={.35} roughness={.18}/></mesh></ConceptStage>;
    case 'nozick': return <ConceptStage volume={volume}><mesh><boxGeometry args={[.46, .4, .34]}/><meshStandardMaterial color={accent} wireframe metalness={.45} roughness={.4}/></mesh><mesh><sphereGeometry args={[.12, 16, 12]}/>{dark}</mesh></ConceptStage>;
    case 'habermas': return <ConceptStage volume={volume}>{[-.21, 0, .21].map((x, index) => <mesh key={x} position={[x, index === 1 ? .09 : -.04, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.1, .028, 10, 28]}/>{index === 1 ? metal : dark}</mesh>)}</ConceptStage>;
    case 'patanjali': return <ConceptStage volume={volume}><mesh><cylinderGeometry args={[.045, .045, .48, 16]}/>{dark}</mesh>{[-.14, 0, .14].map((y, index) => <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.13 + index * .035, .025, 10, 32]}/>{index === 1 ? metal : dark}</mesh>)}</ConceptStage>;
    case 'vasubandhu': return <ConceptStage volume={volume}>{[-.24, -.12, 0, .12, .24].map((x, index) => <mesh key={x} position={[x, -.06 + Math.abs(index - 2) * .045, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.09, .09, .04, 18]}/>{index === 2 ? metal : dark}</mesh>)}</ConceptStage>;
    case 'william-james': return <ConceptStage volume={volume}>{[-.24, -.08, .08, .24].map((x, index) => <mesh key={x} position={[x, Math.sin(index * 1.5) * .1, 0]}><sphereGeometry args={[.085, 14, 10]}/>{index === 2 ? metal : dark}</mesh>)}<mesh rotation={[0, 0, -.2]}><boxGeometry args={[.54, .02, .02]}/><meshBasicMaterial color="#ddd7cb"/></mesh></ConceptStage>;
    case 'husserl': return <ConceptStage volume={volume}>{[-.23, .23].map((x) => <mesh key={x} position={[x, 0, 0]}><boxGeometry args={[.06, .46, .08]}/>{dark}</mesh>)}{[-.16, .16].map((y) => <mesh key={y} position={[0, y, 0]}><boxGeometry args={[.4, .05, .08]}/>{metal}</mesh>)}</ConceptStage>;
    case 'merleau-ponty': return <ConceptStage volume={volume}>{[-.11, .11].map((x, index) => <mesh key={x} position={[x, 0, 0]} rotation={[Math.PI / 2, index ? .45 : -.45, 0]}><torusGeometry args={[.2, .04, 12, 36]}/>{index ? metal : dark}</mesh>)}</ConceptStage>;
    case 'anscombe': return <ConceptStage volume={volume}><mesh rotation={[0, 0, -Math.PI / 2]}><coneGeometry args={[.1, .34, 12]}/>{metal}</mesh><mesh position={[-.19, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[.035, .035, .3, 12]}/>{dark}</mesh></ConceptStage>;
    case 'thomas-nagel': return <ConceptStage volume={volume}><mesh><sphereGeometry args={[.26, 24, 16]}/><meshPhysicalMaterial color={accent} transparent opacity={.28} roughness={.14}/></mesh><mesh><sphereGeometry args={[.1, 16, 12]}/>{dark}</mesh></ConceptStage>;
    case 'derek-parfit': return <ConceptStage volume={volume}>{[-.23, .23].map((x) => <mesh key={x} position={[x, 0, 0]}><dodecahedronGeometry args={[.14, 0]}/>{x < 0 ? dark : metal}</mesh>)}<mesh><boxGeometry args={[.3, .025, .025]}/><meshBasicMaterial color="#ddd7cb"/></mesh></ConceptStage>;
    default: return <ConceptStage volume={volume}><mesh><boxGeometry args={[.42, .4, .34]}/>{metal}</mesh></ConceptStage>;
  }
}

function Plaque({layout, title, accent}: {layout: MuseumExhibitLayout; title: string; accent: string}) {
  const plaque = layout.scene.plaque;
  const textureSize = museumTextureDimensionsForPlane(
    plaque.width,
    plaque.height,
    MUSEUM_TEXTURE_SPECS.plaque,
  );
  const texture = usePlaqueTexture({
    title,
    kicker: 'Philosopher · object · argument',
    subtitle: 'Approach or select for interpretation',
    accent,
    width: textureSize.width,
    height: textureSize.height,
  });
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
  const planeWidth = backing.size.width - .18;
  const planeHeight = .34;
  const textureSize = museumTextureDimensionsForPlane(
    planeWidth,
    planeHeight,
    {
      width: MUSEUM_TEXTURE_SPECS.contemporaryNameStrip.width,
      height: MUSEUM_TEXTURE_SPECS.contemporaryNameStrip.height,
      mipmaps: MUSEUM_TEXTURE_SPECS.contemporaryNameStrip.mipmaps,
    },
  );
  const texture = usePlaqueTexture({
    title,
    kicker: 'Philosophy Atlas',
    subtitle: 'Select for the full interpretation',
    accent,
    width: textureSize.width,
    height: textureSize.height,
  });
  return <group position={[0, backing.center.y + backing.size.height / 2 - .24, backing.center.z + backing.size.depth / 2 + .012]}>
    <mesh position={[0, 0, -.025]}><boxGeometry args={[backing.size.width - .1, .4, .05]}/><meshStandardMaterial color="#242627" roughness={.54}/></mesh>
    <mesh position={[0, 0, .004]}><planeGeometry args={[planeWidth, planeHeight]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
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
