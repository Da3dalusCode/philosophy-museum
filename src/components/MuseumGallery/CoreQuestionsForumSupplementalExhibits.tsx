import type {ThreeEvent} from '@react-three/fiber';
import {
  CORE_QUESTIONS_FORUM_SUPPLEMENTAL_EXHIBITS,
  CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS,
} from '../../data/museum/coreQuestionsForumSupplementalExhibits';
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

const FORUM_PALETTE = Object.freeze({
  ink: '#171d1f',
  charcoal: '#2a3234',
  bronze: '#806a4d',
  slate: '#617277',
});

/**
 * Forum lenses support comparison among the full-sized primary questions.
 * Their authored footprint remains available for collision and interaction,
 * while the visible millwork stays deliberately quieter and smaller.
 */
const FORUM_SUPPLEMENTAL_VISUAL_SCALE = .88;

const getForumSupplementalExhibit = (id: MuseumSupplementalExhibitId) => {
  const record = CORE_QUESTIONS_FORUM_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Core Questions Forum supplemental exhibit ${id} is missing.`);
  return record;
};

function ExhibitLabel({layout}: {layout: MuseumSupplementalExhibitLayout}) {
  const record = getForumSupplementalExhibit(layout.id);
  const texture = useSupplementalPlaqueTexture(record, layout);
  return <group position={layout.label.position}>
    <mesh position={[0, 0, -.04]}>
      <boxGeometry args={[layout.label.width + .12, layout.label.height + .1, .08]}/>
      <meshStandardMaterial color={FORUM_PALETTE.ink} roughness={.8} metalness={.04}/>
    </mesh>
    <mesh position={[0, 0, .012]}>
      <planeGeometry args={[layout.label.width, layout.label.height]}/>
      <meshBasicMaterial map={texture} toneMapped={false}/>
    </mesh>
  </group>;
}

function ForumLensBacking({layout}: {layout: MuseumSupplementalExhibitLayout}) {
  const width = Math.min(layout.footprint.width - .12, layout.label.width + .28);
  const height = Math.min(layout.footprint.height - .12, 3.82);
  const centerY = height / 2 + .03;
  const backingZ = -.56;
  const backingDepth = .18;
  const plinth = MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY;
  const structuralRearZ = backingZ - backingDepth / 2;
  return <group>
    <mesh position={[0, centerY, backingZ]}>
      <boxGeometry args={[width, height, backingDepth]}/>
      <meshStandardMaterial {...MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL}/>
    </mesh>
    <mesh position={[0, centerY, -.455]}>
      <boxGeometry args={[Math.max(.8, width - .2), Math.max(.9, height - .22), .04]}/>
      <meshStandardMaterial color={FORUM_PALETTE.charcoal} roughness={.92} metalness={0}/>
    </mesh>
    <mesh position={[0, .39, -.425]}>
      <boxGeometry args={[Math.max(.62, width - .48), .045, .035]}/>
      <meshStandardMaterial color={layout.accent} roughness={.58} metalness={.2}/>
    </mesh>
    {[-1, 1].map((direction) => <mesh
      key={direction}
      position={[direction * (width / 2 - .1), centerY, -.425]}
    >
      <boxGeometry args={[.035, Math.max(.82, height - .4), .035]}/>
      <meshStandardMaterial color={FORUM_PALETTE.bronze} roughness={.62} metalness={.18}/>
    </mesh>)}
    <mesh position={[0, centerY, structuralRearZ - .012]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[Math.max(.72, width - .24), Math.max(.82, height - .24)]}/>
      <meshStandardMaterial color={FORUM_PALETTE.slate} roughness={.92} metalness={0}/>
    </mesh>
    <mesh position={[0, plinth.height / 2, structuralRearZ + plinth.depth / 2]}>
      <boxGeometry args={[width + .2, plinth.height, plinth.depth]}/>
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
    museumStatus: 'supplemental-comparative-lens',
    installationKind: layout.installationKind,
  }}>
    <group scale={[
      FORUM_SUPPLEMENTAL_VISUAL_SCALE,
      FORUM_SUPPLEMENTAL_VISUAL_SCALE,
      FORUM_SUPPLEMENTAL_VISUAL_SCALE,
    ]}>
      <ForumLensBacking layout={layout}/>
      <MuseumSceneMedia mount={layout.mediaMount} nearby={nearby} accent={layout.accent}/>
      <ExhibitLabel layout={layout}/>
    </group>
    <mesh position={[0, layout.footprint.height / 2, 0]} userData={{interactionForSupplemental: layout.id}}>
      <boxGeometry args={[layout.footprint.width, layout.footprint.height, layout.footprint.depth]}/>
      <meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false}/>
    </mesh>
  </group>;
}

export function CoreQuestionsForumSupplementalExhibits({
  layouts = CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS,
  nearbyId,
  onSelect,
}: {
  layouts?: readonly MuseumSupplementalExhibitLayout[];
  nearbyId?: MuseumSupplementalExhibitId;
  onSelect: (id: MuseumSupplementalExhibitId) => void;
}) {
  return <group userData={{
    supplementalCollection: 'gallery-06-core-questions-forum-v1',
    visualHierarchy: 'secondary-to-primary',
  }}>
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
