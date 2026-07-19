import type {ThreeEvent} from '@react-three/fiber';
import type {MuseumExhibitLayout, MuseumHallDefinition, MuseumSceneVolume} from '../../data/museum/museumWorldTypes';
import {
  MEDITERRANEAN_EXHIBIT_CURATION,
  MEDITERRANEAN_GALLERY_ID,
  MEDITERRANEAN_PALETTE,
  MEDITERRANEAN_ROOM_ACCENTS,
  type MediterraneanExhibitCuration,
  type MediterraneanExhibitId,
} from '../../data/museum/mediterraneanGalleryCuration';
import {getMuseumHallCatalog, type MuseumExhibitId} from '../../data/museumCatalog';
import {MUSEUM_TEXTURE_SPECS, museumTextureDimensionsForPlane} from '../../data/museum/museumTexturePolicy';
import {MuseumSceneMedia} from './MuseumSceneMedia';
import {usePlaqueTexture} from './plaqueTextures';

const ACCENTS = ['#8d6947', '#4f7480', '#755f88', '#897241', '#546f67', '#825861', '#556f8a', '#8b654b', '#657153'];

function Box({volume, color}: {volume: MuseumSceneVolume; color: string}) {
  return <mesh position={[volume.center.x, volume.center.y, volume.center.z]}>
    <boxGeometry args={[volume.size.width, volume.size.height, volume.size.depth]}/>
    <meshStandardMaterial color={color} roughness={.9} metalness={volume.role === 'concept-object' ? .34 : .03}/>
  </mesh>;
}

function InterpretationFace({layout, title, question, kicker, accent, mediterranean}: {
  layout: MuseumExhibitLayout;
  title: string;
  question: string;
  kicker: string;
  accent: string;
  mediterranean: boolean;
}) {
  const backing = layout.scene.objectBounds.find(({id}) => id.endsWith('-backing'))!;
  const hasMedia = layout.scene.mediaMounts.length > 0;
  const width = backing.size.width - .16;
  const height = mediterranean ? .7 : hasMedia ? .42 : Math.min(1.55, backing.size.height - .48);
  const centerY = hasMedia
    ? backing.center.y + backing.size.height / 2 - .28
    : backing.center.y;
  const textureSize = museumTextureDimensionsForPlane(
    width,
    height,
    mediterranean ? MUSEUM_TEXTURE_SPECS.mediterraneanNameStrip : MUSEUM_TEXTURE_SPECS.contemporaryNameStrip,
  );
  const texture = usePlaqueTexture({
    title,
    kicker,
    subtitle: question,
    accent,
    width: textureSize.width,
    height: textureSize.height,
    theme: mediterranean ? 'mediterranean' : 'dark',
  });
  return <group position={[0, centerY, backing.center.z + backing.size.depth / 2 + .012]}>
    <mesh position={[0, 0, -.035]}><boxGeometry args={[width + .12, height + .1, .07]}/><meshStandardMaterial color={mediterranean ? accent : '#202324'} roughness={.62}/></mesh>
    <mesh position={[0, 0, .005]}><planeGeometry args={[width, height]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
  </group>;
}

function MediterraneanFinishedBack({backing, groupLabel, accent}: {
  backing: MuseumSceneVolume;
  groupLabel: string;
  accent: string;
}) {
  const width = Math.min(backing.size.width - .34, 2.25);
  const height = .64;
  const textureSize = museumTextureDimensionsForPlane(
    width,
    height,
    MUSEUM_TEXTURE_SPECS.mediterraneanBackLabel,
  );
  const texture = usePlaqueTexture({
    title: groupLabel,
    kicker: 'Gallery 01',
    subtitle: 'Center route · Socrates, Plato, Aristotle ahead',
    accent: MEDITERRANEAN_PALETTE.aegean,
    width: textureSize.width,
    height: textureSize.height,
    theme: 'mediterranean',
  });
  return <group position={[
    backing.center.x,
    backing.center.y,
    backing.center.z - backing.size.depth / 2 - .012,
  ]} rotation={[0, Math.PI, 0]}>
    <mesh>
      <planeGeometry args={[backing.size.width, backing.size.height]}/>
      <meshStandardMaterial color={accent} roughness={.86}/>
    </mesh>
    <mesh position={[0, 0, .012]}>
      <planeGeometry args={[width, height]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
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
      ? '#cfb995'
      : layout.presentationTier === 'supporting'
        ? '#e4d4bc'
        : layout.presentationTier === 'anchor'
          ? '#eee2cf'
          : '#dfceb2'
    : '#d9d5cd';
  return <group>
    <Box volume={plinth} color={curation ? MEDITERRANEAN_PALETTE.limestone : '#6e6b65'}/>
    <Box volume={backing} color={backingColor}/>
    {curation
      ? <MediterraneanFinishedBack backing={backing} groupLabel={curation.groupLabel} accent={accent}/>
      : <Box volume={motif} color={nearby ? accent : '#4a4d4e'}/>}
    <InterpretationFace
      layout={layout}
      title={title}
      question={question}
      kicker={kicker}
      accent={accent}
      mediterranean={Boolean(curation)}
    />
    {layout.scene.mediaMounts.map((mount) => <MuseumSceneMedia key={mount.id} mount={mount} nearby={nearby} accent={accent}/>)}
    <mesh position={[interaction.center.x, interaction.center.y, interaction.center.z]} userData={{interactionFor: layout.id}}>
      <boxGeometry args={[interaction.size.width, interaction.size.height, interaction.size.depth]}/>
      <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false}/>
    </mesh>
  </group>;
}

/** Every Gallery 01 installation presents provenance-backed imagery in a physically supported frame. */
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
      const curation: MediterraneanExhibitCuration | undefined = definition.id === MEDITERRANEAN_GALLERY_ID
        ? MEDITERRANEAN_EXHIBIT_CURATION[layout.id as MediterraneanExhibitId]
        : undefined;
      const accent = curation
        ? MEDITERRANEAN_ROOM_ACCENTS[Math.max(0, roomIndex) % MEDITERRANEAN_ROOM_ACCENTS.length]
        : ACCENTS[Math.max(0, roomIndex) % ACCENTS.length];
      const title = curation?.frontTitle ?? catalog.displayName;
      const kicker = curation?.frontTitle
        ? `${catalog.displayName} · ${curation.publicKicker}`
        : curation?.publicKicker
        ?? (catalog.entityKind === 'philosopher'
          ? 'Philosopher · question and historical context'
          : 'School and interpretive tradition');
      const question = curation?.frontTitle ? curation.groupLabel : catalog.question;
      const activate = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        if (event.delta <= 7) onSelectExhibit(layout.id);
      };
      return <group key={layout.id} position={[layout.position.x, 0, layout.position.z]} rotation={[0, layout.rotationY, 0]} onClick={activate}>
        <Installation
          layout={layout}
          title={title}
          question={question}
          kicker={kicker}
          accent={accent}
          nearby={nearbyId === layout.id}
          curation={curation}
        />
      </group>;
    })}
  </group>;
}
