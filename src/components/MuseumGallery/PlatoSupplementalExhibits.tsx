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

function QuestionLabel({layout}: {layout: MuseumSupplementalExhibitLayout}) {
  const record = getPlatoSupplementalExhibit(layout.id);
  const textureSize = museumTextureDimensionsForPlane(
    layout.label.width,
    layout.label.height,
    MUSEUM_TEXTURE_SPECS.platoSupplementalLabel,
  );
  const texture = usePlaqueTexture({
    title: record.question,
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

function CaveArchitecture({nearby}: {nearby: boolean}) {
  const warm = nearby ? '#e1a64a' : MEDITERRANEAN_PALETTE.ochre;
  return <group>
    <mesh position={[0, 2.28, -.58]}>
      <boxGeometry args={[4.72, 4.5, .2]}/>
      <meshStandardMaterial color="#252a29" roughness={.96}/>
    </mesh>
    {[-2.18, 2.18].map((x) => <mesh key={x} position={[x, 2.18, -.32]}>
      <boxGeometry args={[.28, 3.82, .42]}/>
      <meshStandardMaterial color={x < 0 ? MEDITERRANEAN_PALETTE.limestone : '#6b5946'} roughness={.86}/>
    </mesh>)}
    <mesh position={[0, 3.56, -.31]}>
      <boxGeometry args={[4.62, .18, .43]}/>
      <meshStandardMaterial color={warm} roughness={.56} metalness={.16}/>
    </mesh>
    {[0, 1, 2, 3].map((index) => <mesh key={index} position={[-1.55 + index * 1.03, .1 + index * .015, .08 + index * .055]}>
      <boxGeometry args={[.76, .08 + index * .03, .52]}/>
      <meshStandardMaterial color={['#3b3831', '#69533b', '#9a6638', warm][index]} roughness={.74}/>
    </mesh>)}
  </group>;
}

function RepublicArchitecture({nearby}: {nearby: boolean}) {
  const teal = nearby ? '#4f9aa1' : MEDITERRANEAN_PALETTE.aegean;
  const orderColors = [MEDITERRANEAN_PALETTE.aegean, '#607d75', MEDITERRANEAN_PALETTE.ochre, '#a96745', '#573c36'];
  return <group>
    <mesh position={[0, 2.28, -.58]}>
      <boxGeometry args={[4.72, 4.5, .2]}/>
      <meshStandardMaterial color="#e5d9c5" roughness={.92}/>
    </mesh>
    {[-1.62, 1.62].map((x) => <group key={x} position={[x, 2.05, -.31]}>
      {[.9, 0, -.9].map((y, index) => <mesh key={y} position={[0, y, 0]}>
        <boxGeometry args={[.66, .7, .38]}/>
        <meshStandardMaterial color={[teal, MEDITERRANEAN_PALETTE.terracotta, MEDITERRANEAN_PALETTE.ochre][index]} roughness={.66} metalness={.08}/>
      </mesh>)}
      <mesh position={[0, 1.48, 0]}>
        <boxGeometry args={[.82, .1, .42]}/>
        <meshStandardMaterial color={MEDITERRANEAN_PALETTE.bronze} roughness={.52} metalness={.24}/>
      </mesh>
    </group>)}
    <group position={[0, .22, -.22]}>
      {orderColors.map((color, index) => <mesh key={color} position={[-1.72 + index * .86, 0, .02]}>
        <boxGeometry args={[.7, .13, .48]}/>
        <meshStandardMaterial color={color} roughness={.7} metalness={.08}/>
      </mesh>)}
    </group>
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
      ? <CaveArchitecture nearby={nearby}/>
      : <RepublicArchitecture nearby={nearby}/>}
    <MuseumSceneMedia mount={layout.mediaMount} nearby={nearby} accent={layout.accent}/>
    <QuestionLabel layout={layout}/>
    <mesh position={[0, .1, -.06]}>
      <boxGeometry args={[layout.footprint.width, .2, layout.footprint.depth]}/>
      <meshStandardMaterial color={MEDITERRANEAN_PALETTE.bronze} roughness={.7} metalness={.1}/>
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

