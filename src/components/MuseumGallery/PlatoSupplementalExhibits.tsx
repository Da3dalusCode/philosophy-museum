import type {ThreeEvent} from '@react-three/fiber';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from '../../data/museum/museumWorldTypes';
import {getPlatoSupplementalExhibit} from '../../data/museum/platoSupplementalExhibits';
import {MEDITERRANEAN_PALETTE} from '../../data/museum/mediterraneanGalleryCuration';
import {MUSEUM_TEXTURE_SPECS, museumTextureDimensionsForPlane} from '../../data/museum/museumTexturePolicy';
import {MuseumSceneMedia} from './MuseumSceneMedia';
import {usePlaqueTexture} from './plaqueTextures';

const GALLERY_FRAME_BRONZE = '#675039';

function ExhibitLabel({layout}: {layout: MuseumSupplementalExhibitLayout}) {
  const record = getPlatoSupplementalExhibit(layout.id);
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
    theme: 'mediterranean',
  });
  return <group position={layout.label.position}>
    <mesh position={[0, 0, -.04]}>
      <boxGeometry args={[layout.label.width + .14, layout.label.height + .12, .09]}/>
      <meshStandardMaterial color={MEDITERRANEAN_PALETTE.ink} roughness={.58} metalness={.12}/>
    </mesh>
    <mesh position={[0, 0, .012]}>
      <planeGeometry args={[layout.label.width, layout.label.height]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
  </group>;
}

function CaveArchitecture() {
  return <group>
    <mesh position={[0, 2.28, -.58]}>
      <boxGeometry args={[4.72, 4.5, .2]}/>
      <meshStandardMaterial color={MEDITERRANEAN_PALETTE.ink} roughness={.92}/>
    </mesh>
    {[-2.18, 2.18].map((x) => <mesh key={x} position={[x, 2.18, -.32]}>
      <boxGeometry args={[.28, 3.82, .42]}/>
      <meshStandardMaterial color={MEDITERRANEAN_PALETTE.ink} roughness={.82}/>
    </mesh>)}
    <mesh position={[0, 3.56, -.31]}>
      <boxGeometry args={[4.62, .18, .43]}/>
      <meshStandardMaterial color={MEDITERRANEAN_PALETTE.ink} roughness={.82}/>
    </mesh>
  </group>;
}

function RepublicArchitecture() {
  return <group>
    <mesh position={[0, 2.28, -.58]}>
      <boxGeometry args={[4.72, 4.5, .2]}/>
      <meshStandardMaterial color={MEDITERRANEAN_PALETTE.plaster} roughness={.92}/>
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
    {layout.installationKind === 'cave-ascent'
      ? <CaveArchitecture/>
      : <RepublicArchitecture/>}
    <MuseumSceneMedia mount={layout.mediaMount} nearby={nearby} accent={GALLERY_FRAME_BRONZE}/>
    <ExhibitLabel layout={layout}/>
    <mesh position={[0, .1, -.06]}>
      <boxGeometry args={[layout.footprint.width, .2, layout.footprint.depth]}/>
      <meshStandardMaterial color={MEDITERRANEAN_PALETTE.limestone} roughness={.9} metalness={.03}/>
    </mesh>
    <mesh position={[0, layout.footprint.height / 2, 0]} userData={{interactionForSupplemental: layout.id}}>
      <boxGeometry args={[layout.footprint.width, layout.footprint.height, layout.footprint.depth]}/>
      <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false}/>
    </mesh>
  </group>;
}

export function PlatoSupplementalExhibits({
  layouts,
  nearbyId,
  onSelect,
}: {
  layouts: readonly MuseumSupplementalExhibitLayout[];
  nearbyId?: MuseumSupplementalExhibitId;
  onSelect: (id: MuseumSupplementalExhibitId) => void;
}) {
  return <group userData={{supplementalCollection: 'plato-work-exhibits-v1'}}>
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

