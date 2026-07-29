import type {ThreeEvent} from '@react-three/fiber';
import {
  getHellenisticRomanSupplementalExhibit,
  HELLENISTIC_ROMAN_PALETTE,
} from '../../data/museum/hellenisticRomanSupplementalExhibits';
import {
  getLateAntiquitySupplementalExhibit,
  LATE_ANTIQUITY_PALETTE,
} from '../../data/museum/lateAntiquitySupplementalExhibits';
import {
  MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL,
  MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY,
  MUSEUM_CANONICAL_EXHIBIT_PLINTH_MATERIAL,
} from '../../data/museum/museumArchitectureMaterials';
import {MUSEUM_TEXTURE_SPECS, museumTextureDimensionsForPlane} from '../../data/museum/museumTexturePolicy';
import type {MuseumSupplementalExhibit} from '../../data/museum/platoSupplementalExhibits';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from '../../data/museum/museumWorldTypes';
import {MuseumSceneMedia} from './MuseumSceneMedia';
import {usePlaqueTexture} from './plaqueTextures';

type RecordGetter = (id: MuseumSupplementalExhibitId) => MuseumSupplementalExhibit;

function ExhibitLabel({
  layout,
  ink,
  getRecord,
}: {
  layout: MuseumSupplementalExhibitLayout;
  ink: string;
  getRecord: RecordGetter;
}) {
  const record = getRecord(layout.id);
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
      <meshStandardMaterial color={ink} roughness={.78} metalness={.04}/>
    </mesh>
    <mesh position={[0, 0, .012]}>
      <planeGeometry args={[layout.label.width, layout.label.height]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
  </group>;
}

function ExhibitBacking({
  layout,
  ink,
}: {
  layout: MuseumSupplementalExhibitLayout;
  ink: string;
}) {
  const width = layout.footprint.width;
  const height = layout.footprint.height - .12;
  const centerY = height / 2 + .04;
  const plinth = MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY;
  const structuralRearZ = -.58 - .24 / 2;
  return <group>
    <mesh position={[0, centerY, -.58]}>
      <boxGeometry args={[width, height, .24]}/>
      <meshStandardMaterial {...MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL}/>
    </mesh>
    <mesh position={[0, 1.88, -.445]}>
      <boxGeometry args={[width - .26, 2.85, .045]}/>
      <meshStandardMaterial color={ink} roughness={.9} metalness={0}/>
    </mesh>
    <mesh position={[0, .46, -.405]}>
      <boxGeometry args={[width - .42, .065, .045]}/>
      <meshStandardMaterial color={layout.accent} roughness={.52} metalness={.24}/>
    </mesh>
    {[-1, 1].map((direction) => <mesh
      key={direction}
      position={[direction * (width / 2 - .11), 1.88, -.39]}
    >
      <boxGeometry args={[.07, 3.08, .06]}/>
      <meshStandardMaterial color={layout.accent} roughness={.58} metalness={.18}/>
    </mesh>)}
    <mesh position={[0, centerY, -.705]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[width - .24, height - .24]}/>
      <meshStandardMaterial {...MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL}/>
    </mesh>
    <mesh position={[0, plinth.height / 2, structuralRearZ + plinth.largeDepth / 2]}>
      <boxGeometry args={[width + plinth.sideOverhang * 2, plinth.height, plinth.largeDepth]}/>
      <meshStandardMaterial {...MUSEUM_CANONICAL_EXHIBIT_PLINTH_MATERIAL}/>
    </mesh>
  </group>;
}

function SupplementalInstallation({
  layout,
  nearby,
  ink,
  getRecord,
}: {
  layout: MuseumSupplementalExhibitLayout;
  nearby: boolean;
  ink: string;
  getRecord: RecordGetter;
}) {
  return <group userData={{
    supplementalExhibitId: layout.id,
    parentExhibitId: layout.parentExhibitId,
    museumStatus: 'supplemental-work-context-discovery',
    installationKind: layout.installationKind,
  }}>
    <ExhibitBacking layout={layout} ink={ink}/>
    <MuseumSceneMedia mount={layout.mediaMount} nearby={nearby} accent={layout.accent}/>
    <ExhibitLabel layout={layout} ink={ink} getRecord={getRecord}/>
    <mesh position={[0, layout.footprint.height / 2, 0]} userData={{interactionForSupplemental: layout.id}}>
      <boxGeometry args={[layout.footprint.width, layout.footprint.height, layout.footprint.depth]}/>
      <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false}/>
    </mesh>
  </group>;
}

function SupplementalCollection({
  layouts,
  nearbyId,
  onSelect,
  collection,
  ink,
  getRecord,
}: {
  layouts: readonly MuseumSupplementalExhibitLayout[];
  nearbyId?: MuseumSupplementalExhibitId;
  onSelect: (id: MuseumSupplementalExhibitId) => void;
  collection: string;
  ink: string;
  getRecord: RecordGetter;
}) {
  return <group userData={{supplementalCollection: collection}}>
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
        <SupplementalInstallation
          layout={layout}
          nearby={nearbyId === layout.id}
          ink={ink}
          getRecord={getRecord}
        />
      </group>;
    })}
  </group>;
}

type GallerySupplementalProps = {
  layouts: readonly MuseumSupplementalExhibitLayout[];
  nearbyId?: MuseumSupplementalExhibitId;
  onSelect: (id: MuseumSupplementalExhibitId) => void;
};

export function HellenisticRomanSupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-14-hellenistic-roman-ways-v1"
    ink={HELLENISTIC_ROMAN_PALETTE.ink}
    getRecord={getHellenisticRomanSupplementalExhibit}
  />;
}

export function LateAntiquitySupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-15-late-antiquity-inheritance-v1"
    ink={LATE_ANTIQUITY_PALETTE.ink}
    getRecord={getLateAntiquitySupplementalExhibit}
  />;
}
