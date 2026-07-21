import type {ThreeEvent} from '@react-three/fiber';
import {getRenaissanceSupplementalExhibit} from '../../data/museum/renaissanceSupplementalExhibits';
import {RENAISSANCE_PALETTE} from '../../data/museum/renaissanceGalleryCuration';
import {
  MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL,
  MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY,
  MUSEUM_CANONICAL_EXHIBIT_PLINTH_MATERIAL,
} from '../../data/museum/museumArchitectureMaterials';
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

/** Shared neutral structure with the authored paper inset and walnut trim retained. */
function FinishedBacking({layout}: {layout: MuseumSupplementalExhibitLayout}) {
  const paper = layout.installationKind === 'renaissance-observation'
    ? '#c7c3b7'
    : RENAISSANCE_PALETTE.paper;
  const width = layout.label.width + .38;
  const height = layout.footprint.height - .12;
  const centerY = height / 2 + .04;
  const insetWidth = width - .24;
  const insetHeight = height - .24;
  const trim = .07;
  const plinth = MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY;
  const structuralRearZ = -.58 - .24 / 2;
  return <group>
    <mesh position={[0, centerY, -.58]}>
      <boxGeometry args={[width, height, .24]}/>
      <meshStandardMaterial {...MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL}/>
    </mesh>
    <mesh position={[0, centerY, -.445]}>
      <boxGeometry args={[insetWidth, insetHeight, .055]}/>
      <meshStandardMaterial color={paper} roughness={.95} metalness={0}/>
    </mesh>
    {[
      {id: 'top', position: [0, centerY + insetHeight / 2 + trim / 2, -.405], size: [insetWidth + trim * 2, trim, .05]},
      {id: 'bottom', position: [0, centerY - insetHeight / 2 - trim / 2, -.405], size: [insetWidth + trim * 2, trim, .05]},
      {id: 'left', position: [-insetWidth / 2 - trim / 2, centerY, -.405], size: [trim, insetHeight, .05]},
      {id: 'right', position: [insetWidth / 2 + trim / 2, centerY, -.405], size: [trim, insetHeight, .05]},
    ].map(({id, position, size}) => <mesh key={id} position={position as [number, number, number]}>
      <boxGeometry args={size as [number, number, number]}/>
      <meshStandardMaterial color={RENAISSANCE_PALETTE.walnut} roughness={.82} metalness={.02}/>
    </mesh>)}
    <mesh position={[0, centerY, -.705]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[width - .28, height - .28]}/>
      <meshStandardMaterial {...MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL}/>
    </mesh>
    <mesh position={[0, plinth.height / 2, structuralRearZ + plinth.largeDepth / 2]}>
      <boxGeometry args={[width + plinth.sideOverhang * 2, plinth.height, plinth.largeDepth]}/>
      <meshStandardMaterial {...MUSEUM_CANONICAL_EXHIBIT_PLINTH_MATERIAL}/>
    </mesh>
    <mesh position={[0, plinth.height + .0275, -.115]}>
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
