import type {ThreeEvent} from '@react-three/fiber';
import type {MuseumSupplementalExhibit} from '../../data/museum/platoSupplementalExhibits';
import {
  MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL,
  MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY,
  MUSEUM_CANONICAL_EXHIBIT_PLINTH_MATERIAL,
} from '../../data/museum/museumArchitectureMaterials';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from '../../data/museum/museumWorldTypes';
import {MuseumSceneMedia} from './MuseumSceneMedia';
import {useSupplementalPlaqueTexture} from './supplementalPlaqueContract';

type SupplementalCollectionProps = {
  collectionId: string;
  ink: string;
  layouts: readonly MuseumSupplementalExhibitLayout[];
  nearbyId?: MuseumSupplementalExhibitId;
  getExhibit: (id: MuseumSupplementalExhibitId) => MuseumSupplementalExhibit;
  onSelect: (id: MuseumSupplementalExhibitId) => void;
};

function ExhibitLabel({
  layout,
  ink,
  getExhibit,
}: Pick<SupplementalCollectionProps, 'ink' | 'getExhibit'> & {layout: MuseumSupplementalExhibitLayout}) {
  const record = getExhibit(layout.id);
  const texture = useSupplementalPlaqueTexture(record, layout);
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

function ExhibitBacking({layout, ink}: {layout: MuseumSupplementalExhibitLayout; ink: string}) {
  const width = layout.label.width + .36;
  const height = layout.footprint.height - .12;
  const centerY = height / 2 + .04;
  const plinth = MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY;
  const structuralRearZ = -.58 - .24 / 2;
  return <group>
    <mesh position={[0, centerY, -.58]}>
      <boxGeometry args={[width, height, .24]}/>
      <meshStandardMaterial {...MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL}/>
    </mesh>
    <mesh position={[0, 2.18, -.445]}>
      <boxGeometry args={[width - .3, 3.42, .045]}/>
      <meshStandardMaterial color={ink} roughness={.9} metalness={0}/>
    </mesh>
    <mesh position={[0, .48, -.405]}>
      <boxGeometry args={[width - .48, .065, .045]}/>
      <meshStandardMaterial color={layout.accent} roughness={.52} metalness={.24}/>
    </mesh>
    {[-1, 1].map((direction) => <mesh
      key={direction}
      position={[direction * (width / 2 - .13), 2.18, -.39]}
    >
      <boxGeometry args={[.075, 3.66, .06]}/>
      <meshStandardMaterial color={layout.accent} roughness={.58} metalness={.18}/>
    </mesh>)}
    <mesh position={[0, centerY, -.705]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[width - .28, height - .28]}/>
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
  getExhibit,
}: Pick<SupplementalCollectionProps, 'ink' | 'getExhibit'> & {
  layout: MuseumSupplementalExhibitLayout;
  nearby: boolean;
}) {
  return <group userData={{
    supplementalExhibitId: layout.id,
    parentExhibitId: layout.parentExhibitId,
    museumStatus: 'supplemental-work-context-discovery',
    installationKind: layout.installationKind,
  }}>
    <ExhibitBacking layout={layout} ink={ink}/>
    <MuseumSceneMedia mount={layout.mediaMount} nearby={nearby} accent={layout.accent}/>
    <ExhibitLabel layout={layout} ink={ink} getExhibit={getExhibit}/>
    <mesh position={[0, layout.footprint.height / 2, 0]} userData={{interactionForSupplemental: layout.id}}>
      <boxGeometry args={[layout.footprint.width, layout.footprint.height, layout.footprint.depth]}/>
      <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false}/>
    </mesh>
  </group>;
}

export function MuseumSupplementalExhibitCollection({
  collectionId,
  layouts,
  nearbyId,
  ink,
  getExhibit,
  onSelect,
}: SupplementalCollectionProps) {
  return <group userData={{supplementalCollection: collectionId}}>
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
          getExhibit={getExhibit}
        />
      </group>;
    })}
  </group>;
}
