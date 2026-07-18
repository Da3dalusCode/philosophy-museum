import type {ThreeEvent} from '@react-three/fiber';
import type {MuseumExhibitLayout, MuseumHallDefinition, MuseumSceneVolume} from '../../data/museum/museumWorldTypes';
import {
  MEDITERRANEAN_EXHIBIT_CURATION,
  MEDITERRANEAN_GALLERY_ID,
  type MediterraneanExhibitCuration,
  type MediterraneanExhibitId,
} from '../../data/museum/mediterraneanGalleryCuration';
import {getMuseumHallCatalog, type MuseumExhibitId} from '../../data/museumCatalog';
import {MUSEUM_TEXTURE_SPECS, museumTextureDimensionsForPlane} from '../../data/museum/museumTexturePolicy';
import {MediterraneanExhibitObject} from './MediterraneanExhibitObject';
import {MuseumSceneMedia} from './MuseumSceneMedia';
import {usePlaqueTexture} from './plaqueTextures';

const ACCENTS = ['#8d6947', '#4f7480', '#755f88', '#897241', '#546f67', '#825861', '#556f8a', '#8b654b', '#657153'];

function Box({volume, color}: {volume: MuseumSceneVolume; color: string}) {
  return <mesh position={[volume.center.x, volume.center.y, volume.center.z]}>
    <boxGeometry args={[volume.size.width, volume.size.height, volume.size.depth]}/>
    <meshStandardMaterial color={color} roughness={.9} metalness={volume.role === 'concept-object' ? .34 : .03}/>
  </mesh>;
}

function InterpretationFace({layout, title, question, kicker, accent}: {
  layout: MuseumExhibitLayout;
  title: string;
  question: string;
  kicker: string;
  accent: string;
}) {
  const backing = layout.scene.objectBounds.find(({id}) => id.endsWith('-backing'))!;
  const hasMedia = layout.scene.mediaMounts.length > 0;
  const width = backing.size.width - .16;
  const height = hasMedia ? .42 : Math.min(1.55, backing.size.height - .48);
  const centerY = hasMedia
    ? backing.center.y + backing.size.height / 2 - .28
    : backing.center.y;
  const textureSize = museumTextureDimensionsForPlane(
    width,
    height,
    MUSEUM_TEXTURE_SPECS.contemporaryNameStrip,
  );
  const texture = usePlaqueTexture({
    title,
    kicker,
    subtitle: question,
    accent,
    width: textureSize.width,
    height: textureSize.height,
  });
  return <group position={[0, centerY, backing.center.z + backing.size.depth / 2 + .012]}>
    <mesh position={[0, 0, -.035]}><boxGeometry args={[width + .12, height + .1, .07]}/><meshStandardMaterial color="#202324" roughness={.55}/></mesh>
    <mesh position={[0, 0, .005]}><planeGeometry args={[width, height]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
  </group>;
}

function Installation({layout, title, question, kicker, accent, nearby, curation}: {
  layout: MuseumExhibitLayout;
  title: string;
  question: string;
  kicker: string;
  accent: string;
  nearby: boolean;
  curation?: MediterraneanExhibitCuration;
}) {
  const plinth = layout.scene.objectBounds.find(({id}) => id.endsWith('-plinth'))!;
  const backing = layout.scene.objectBounds.find(({id}) => id.endsWith('-backing'))!;
  const motif = layout.scene.objectBounds.find(({id}) => id.endsWith('-concept'))!;
  const interaction = layout.scene.interactionBounds;
  const backingColor = curation
    ? layout.presentationTier === 'archive'
      ? '#b9ad98'
      : layout.presentationTier === 'supporting'
        ? '#d0cbc1'
        : layout.presentationTier === 'anchor'
          ? '#e2ddd2'
          : '#d8d4cb'
    : '#d9d5cd';
  return <group>
    <Box volume={plinth} color="#6e6b65"/>
    <Box volume={backing} color={backingColor}/>
    {curation
      ? <group position={[motif.center.x, motif.center.y - motif.size.height / 2, motif.center.z]}>
        <MediterraneanExhibitObject kind={curation.visualKind} exhibitId={layout.id} nearby={nearby}/>
      </group>
      : <Box volume={motif} color={nearby ? accent : '#4a4d4e'}/>}
    {curation && <>
      <mesh position={[backing.center.x - backing.size.width / 2 + .055, backing.center.y, backing.center.z + backing.size.depth / 2 + .02]}>
        <boxGeometry args={[.035, backing.size.height - .16, .035]}/>
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={nearby ? .34 : .1} roughness={.35}/>
      </mesh>
    </>}
    <InterpretationFace layout={layout} title={title} question={question} kicker={kicker} accent={accent}/>
    {layout.scene.mediaMounts.map((mount) => <MuseumSceneMedia key={mount.id} mount={mount} nearby={nearby} accent={accent}/>)}
    <mesh position={[interaction.center.x, interaction.center.y, interaction.center.z]} userData={{interactionFor: layout.id}}>
      <boxGeometry args={[interaction.size.width, interaction.size.height, interaction.size.depth]}/>
      <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false}/>
    </mesh>
  </group>;
}

/** Text-first installations remain complete when an approved local image is unavailable. */
export function CanonicalMuseumExhibits({definition, nearbyId, visibleExhibitIds, onSelectExhibit}: {
  definition: MuseumHallDefinition;
  nearbyId?: MuseumExhibitId;
  visibleExhibitIds?: readonly MuseumExhibitId[];
  onSelectExhibit: (id: MuseumExhibitId) => void;
}) {
  const hall = getMuseumHallCatalog(definition.id);
  if (!hall) return null;
  return <group>{definition.layout.exhibits
    .filter(({id}) => !visibleExhibitIds || visibleExhibitIds.includes(id))
    .map((layout) => {
      const catalog = hall.exhibits.find(({id}) => id === layout.id);
      if (!catalog) return null;
      const roomIndex = hall.zones.findIndex(({id}) => id === layout.zoneId);
      const accent = ACCENTS[Math.max(0, roomIndex) % ACCENTS.length];
      const curation = definition.id === MEDITERRANEAN_GALLERY_ID
        ? MEDITERRANEAN_EXHIBIT_CURATION[layout.id as MediterraneanExhibitId]
        : undefined;
      const kicker = curation?.publicKicker
        ?? (catalog.entityKind === 'philosopher'
          ? 'Philosopher · question and historical context'
          : 'School and interpretive tradition');
      const activate = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        if (event.delta <= 7) onSelectExhibit(layout.id);
      };
      return <group key={layout.id} position={[layout.position.x, 0, layout.position.z]} rotation={[0, layout.rotationY, 0]} onClick={activate}>
        <Installation
          layout={layout}
          title={catalog.displayName}
          question={catalog.question}
          kicker={kicker}
          accent={accent}
          nearby={nearbyId === layout.id}
          curation={curation}
        />
      </group>;
    })}
  </group>;
}
