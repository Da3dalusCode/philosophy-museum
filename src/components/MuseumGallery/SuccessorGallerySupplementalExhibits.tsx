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
  getLatinScholasticSupplementalExhibit,
  LATIN_SCHOLASTIC_PALETTE,
} from '../../data/museum/latinChristianScholasticSupplementalExhibits';
import {
  getRationalismSupplementalExhibit,
  RATIONALISM_PALETTE,
} from '../../data/museum/rationalismSupplementalExhibits';
import {
  EMPIRICISM_PALETTE,
  getEmpiricismSupplementalExhibit,
} from '../../data/museum/empiricismSupplementalExhibits';
import {
  ENLIGHTENMENT_PALETTE,
  getEnlightenmentSupplementalExhibit,
} from '../../data/museum/enlightenmentSupplementalExhibits';
import {
  getUtilityLibertyCapitalSupplementalExhibit,
  UTILITY_LIBERTY_CAPITAL_PALETTE,
} from '../../data/museum/utilityLibertyCapitalSupplementalExhibits';
import {
  FAITH_PESSIMISM_VALUE_PALETTE,
  getFaithPessimismValueSupplementalExhibit,
} from '../../data/museum/faithPessimismValueSupplementalExhibits';
import {
  GERMAN_IDEALISM_PALETTE,
  getGermanIdealismSupplementalExhibit,
} from '../../data/museum/germanIdealismSupplementalExhibits';
import {
  getPragmatismSupplementalExhibit,
  PRAGMATISM_PALETTE,
} from '../../data/museum/pragmatismSupplementalExhibits';
import {
  getMoralLifePracticalReasonSupplementalExhibit,
  MORAL_LIFE_PRACTICAL_REASON_PALETTE,
} from '../../data/museum/moralLifePracticalReasonSupplementalExhibits';
import {
  CRITIQUE_POWER_DECONSTRUCTION_PALETTE,
  getCritiquePowerDeconstructionSupplementalExhibit,
} from '../../data/museum/critiquePowerDeconstructionSupplementalExhibits';
import {
  COLONIALISM_RACE_LIBERATION_PALETTE,
  getColonialismRaceLiberationSupplementalExhibit,
} from '../../data/museum/colonialismRaceLiberationSupplementalExhibits';
import {
  FEMINIST_PHILOSOPHIES_PALETTE,
  getFeministPhilosophiesSupplementalExhibit,
} from '../../data/museum/feministPhilosophiesSupplementalExhibits';
import {
  MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL,
  MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY,
  MUSEUM_CANONICAL_EXHIBIT_PLINTH_MATERIAL,
} from '../../data/museum/museumArchitectureMaterials';
import type {MuseumSupplementalExhibit} from '../../data/museum/platoSupplementalExhibits';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from '../../data/museum/museumWorldTypes';
import {MuseumSceneMedia} from './MuseumSceneMedia';
import {useSupplementalPlaqueTexture} from './supplementalPlaqueContract';

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

export function LatinScholasticSupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-13-latin-christian-scholastic-v1"
    ink={LATIN_SCHOLASTIC_PALETTE.ink}
    getRecord={getLatinScholasticSupplementalExhibit}
  />;
}

export function RationalismSupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-16-rationalism-mind-nature-system-v1"
    ink={RATIONALISM_PALETTE.ink}
    getRecord={getRationalismSupplementalExhibit}
  />;
}

export function EmpiricismSupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-17-empiricism-science-political-order-v1"
    ink={EMPIRICISM_PALETTE.ink}
    getRecord={getEmpiricismSupplementalExhibit}
  />;
}

export function EnlightenmentSupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-18-enlightenment-revolution-kant-v1"
    ink={ENLIGHTENMENT_PALETTE.ink}
    getRecord={getEnlightenmentSupplementalExhibit}
  />;
}

export function UtilityLibertyCapitalSupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-20-utility-liberty-history-capital-v1"
    ink={UTILITY_LIBERTY_CAPITAL_PALETTE.charcoal}
    getRecord={getUtilityLibertyCapitalSupplementalExhibit}
  />;
}

export function FaithPessimismValueSupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-21-faith-pessimism-life-value-v1"
    ink={FAITH_PESSIMISM_VALUE_PALETTE.midnight}
    getRecord={getFaithPessimismValueSupplementalExhibit}
  />;
}

export function GermanIdealismSupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-19-german-idealism-afterlives-v1"
    ink={GERMAN_IDEALISM_PALETTE.ink}
    getRecord={getGermanIdealismSupplementalExhibit}
  />;
}

export function PragmatismSupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-22-pragmatism-democratic-inquiry-v1"
    ink={PRAGMATISM_PALETTE.ink}
    getRecord={getPragmatismSupplementalExhibit}
  />;
}

export function CritiquePowerDeconstructionSupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-23-critique-power-deconstruction-v1"
    ink={CRITIQUE_POWER_DECONSTRUCTION_PALETTE.charcoal}
    getRecord={getCritiquePowerDeconstructionSupplementalExhibit}
  />;
}

export function MoralLifePracticalReasonSupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-24-moral-life-practical-reason-v1"
    ink={MORAL_LIFE_PRACTICAL_REASON_PALETTE.ink}
    getRecord={getMoralLifePracticalReasonSupplementalExhibit}
  />;
}

export function FeministPhilosophiesSupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-25-feminist-philosophies-v1"
    ink={FEMINIST_PHILOSOPHIES_PALETTE.ink}
    getRecord={getFeministPhilosophiesSupplementalExhibit}
  />;
}

export function ColonialismRaceLiberationSupplementalExhibits(props: GallerySupplementalProps) {
  return <SupplementalCollection
    {...props}
    collection="gallery-26-colonialism-race-liberation-v1"
    ink={COLONIALISM_RACE_LIBERATION_PALETTE.ink}
    getRecord={getColonialismRaceLiberationSupplementalExhibit}
  />;
}
