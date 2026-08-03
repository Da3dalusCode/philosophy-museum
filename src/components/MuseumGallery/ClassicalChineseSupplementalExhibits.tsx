import type {ThreeEvent} from '@react-three/fiber';
import {
  CLASSICAL_CHINESE_PALETTE,
  getClassicalChineseSupplementalExhibit,
} from '../../data/museum/classicalChineseSupplementalExhibits';
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

function ExhibitLabel({layout}: {layout: MuseumSupplementalExhibitLayout}) {
  const record = getClassicalChineseSupplementalExhibit(layout.id);
  const texture = useSupplementalPlaqueTexture(record, layout);
  return <group position={layout.label.position}>
    <mesh position={[0, 0, -.045]}>
      <boxGeometry args={[layout.label.width + .14, layout.label.height + .12, .1]}/>
      <meshStandardMaterial color={CLASSICAL_CHINESE_PALETTE.ink} roughness={.78} metalness={.04}/>
    </mesh>
    <mesh position={[0, 0, .012]}>
      <planeGeometry args={[layout.label.width, layout.label.height]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
  </group>;
}

function ExhibitBacking({layout}: {layout: MuseumSupplementalExhibitLayout}) {
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
      <meshStandardMaterial color={CLASSICAL_CHINESE_PALETTE.ink} roughness={.9} metalness={0}/>
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

function SupplementalInstallation({layout, nearby}: {
  layout: MuseumSupplementalExhibitLayout;
  nearby: boolean;
}) {
  return <group userData={{
    supplementalExhibitId: layout.id,
    parentExhibitId: layout.parentExhibitId,
    museumStatus: 'supplemental-work-context-discovery',
    installationKind: layout.installationKind,
  }}>
    <ExhibitBacking layout={layout}/>
    <MuseumSceneMedia mount={layout.mediaMount} nearby={nearby} accent={layout.accent}/>
    <ExhibitLabel layout={layout}/>
    <mesh position={[0, layout.footprint.height / 2, 0]} userData={{interactionForSupplemental: layout.id}}>
      <boxGeometry args={[layout.footprint.width, layout.footprint.height, layout.footprint.depth]}/>
      <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false}/>
    </mesh>
  </group>;
}

export function ClassicalChineseSupplementalExhibits({
  layouts,
  nearbyId,
  onSelect,
}: {
  layouts: readonly MuseumSupplementalExhibitLayout[];
  nearbyId?: MuseumSupplementalExhibitId;
  onSelect: (id: MuseumSupplementalExhibitId) => void;
}) {
  return <group userData={{supplementalCollection: 'gallery-09-classical-chinese-traditions-v1'}}>
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
