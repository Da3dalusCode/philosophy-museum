import type {ThreeEvent} from '@react-three/fiber';
import {getRenaissanceSupplementalExhibit} from '../../data/museum/renaissanceSupplementalExhibits';
import {RENAISSANCE_PALETTE} from '../../data/museum/renaissanceGalleryCuration';
import {MUSEUM_TEXTURE_SPECS, museumTextureDimensionsForPlane} from '../../data/museum/museumTexturePolicy';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from '../../data/museum/museumWorldTypes';
import {MuseumSceneMedia} from './MuseumSceneMedia';
import {usePlaqueTexture} from './plaqueTextures';

function ExhibitLabel({layout}: {layout: MuseumSupplementalExhibitLayout}) {
  const record = getRenaissanceSupplementalExhibit(layout.id);
  const textureSize = museumTextureDimensionsForPlane(
    layout.label.width,
    layout.label.height,
    MUSEUM_TEXTURE_SPECS.platoSupplementalLabel,
  );
  const texture = usePlaqueTexture({
    title: record.shortTitle,
    kicker: record.workLabel,
    subtitle: record.frontSubtitle,
    accent: layout.accent,
    width: textureSize.width,
    height: textureSize.height,
    theme: 'dark',
  });
  return <group position={layout.label.position}>
    <mesh position={[0, 0, -.045]}>
      <boxGeometry args={[layout.label.width + .14, layout.label.height + .12, .1]}/>
      <meshStandardMaterial color={RENAISSANCE_PALETTE.walnutEdge} roughness={.7} metalness={.08}/>
    </mesh>
    <mesh position={[0, 0, .012]}>
      <planeGeometry args={[layout.label.width, layout.label.height]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
  </group>;
}

/** Paper-faced walnut casework with a deliberately finished reverse and sides. */
function FinishedBacking({layout}: {layout: MuseumSupplementalExhibitLayout}) {
  const paper = layout.installationKind === 'renaissance-observation'
    ? '#c7c3b7'
    : RENAISSANCE_PALETTE.paper;
  const width = layout.footprint.width;
  const height = layout.footprint.height - .12;
  return <group>
    <mesh position={[0, height / 2 + .04, -.58]}>
      <boxGeometry args={[width, height, .24]}/>
      <meshStandardMaterial color={RENAISSANCE_PALETTE.walnut} roughness={.82} metalness={.02}/>
    </mesh>
    <mesh position={[0, height / 2 + .04, -.445]}>
      <boxGeometry args={[width - .24, height - .24, .055]}/>
      <meshStandardMaterial color={paper} roughness={.95} metalness={0}/>
    </mesh>
    <mesh position={[0, height / 2 + .04, -.705]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[width - .28, height - .28]}/>
      <meshStandardMaterial color={RENAISSANCE_PALETTE.walnutEdge} roughness={.9} metalness={.02}/>
    </mesh>
    <mesh position={[0, .18, -.42]}>
      <boxGeometry args={[width * .86, .24, .58]}/>
      <meshStandardMaterial color={RENAISSANCE_PALETTE.walnutEdge} roughness={.78} metalness={.05}/>
    </mesh>
    <mesh position={[0, .33, -.115]}>
      <boxGeometry args={[width * .72, .055, .04]}/>
      <meshStandardMaterial color={layout.accent} roughness={.48} metalness={.34}/>
    </mesh>
  </group>;
}

function SupplementalInstallation({layout, nearby}: {
  layout: MuseumSupplementalExhibitLayout;
  nearby: boolean;
}) {
  return <group userData={{
    supplementalExhibitId: layout.id,
    parentExhibitId: layout.parentExhibitId,
    museumStatus: 'supplemental-work',
  }}>
    <FinishedBacking layout={layout}/>
    <MuseumSceneMedia mount={layout.mediaMount} nearby={nearby} accent={layout.accent}/>
    <ExhibitLabel layout={layout}/>
    <mesh position={[0, layout.footprint.height / 2, 0]} userData={{interactionForSupplemental: layout.id}}>
      <boxGeometry args={[layout.footprint.width, layout.footprint.height, layout.footprint.depth]}/>
      <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false}/>
    </mesh>
  </group>;
}

export function RenaissanceSupplementalExhibits({
  layouts,
  nearbyId,
  onSelect,
}: {
  layouts: readonly MuseumSupplementalExhibitLayout[];
  nearbyId?: MuseumSupplementalExhibitId;
  onSelect: (id: MuseumSupplementalExhibitId) => void;
}) {
  return <group userData={{supplementalCollection: 'gallery-02-work-discovery-context-v1'}}>
    {layouts.map((layout) => {
      const activate = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        if (event.delta <= 7) onSelect(layout.id);
      };
      return <group
        key={layout.id}
        position={[layout.position.x, 0, layout.position.z]}
        rotation={[0, layout.rotationY, 0]}
        onClick={activate}
      >
        <SupplementalInstallation layout={layout} nearby={nearbyId === layout.id}/>
      </group>;
    })}
  </group>;
}
