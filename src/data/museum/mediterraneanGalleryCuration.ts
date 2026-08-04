import type {MuseumFurnishingDefinition} from './museumWorldTypes';
import {
  GALLERY_01_ENTRANCE_ORIENTATION_PLACEMENT,
  GALLERY_01_PRIMARY_PLACEMENTS,
  type Gallery01PrimaryExhibitId,
  type Gallery01RoomId,
} from './gallery01Placement';

export const MEDITERRANEAN_GALLERY_ID = 'mediterranean-beginnings-classical' as const;

export const MEDITERRANEAN_PALETTE = {
  plaster: '#eee2cf',
  limestone: '#d7c6aa',
  terracotta: '#a95339',
  ochre: '#c98a34',
  aegean: '#2f6f78',
  seaGlass: '#7fa3a1',
  ink: '#17313a',
  bronze: '#806246',
} as const;

export const MEDITERRANEAN_ROOM_ACCENTS = [
  MEDITERRANEAN_PALETTE.terracotta,
  MEDITERRANEAN_PALETTE.ochre,
  MEDITERRANEAN_PALETTE.aegean,
  '#8d5a3d',
] as const;

export type MediterraneanExhibitId = Gallery01PrimaryExhibitId;

export type MediterraneanVisualKind =
  | 'water'
  | 'boundless'
  | 'air'
  | 'number'
  | 'harmony'
  | 'being'
  | 'paradox'
  | 'atoms-archive'
  | 'atoms'
  | 'change'
  | 'elements'
  | 'ordering-mind'
  | 'civic-speech'
  | 'examined-life'
  | 'academy'
  | 'lyceum'
  | 'portrait';

export type MediterraneanExhibitCuration = {
  authored: {x: number; z: number; rotationY: number};
  publicKicker: string;
  visualKind: MediterraneanVisualKind;
  groupLabel: string;
  /** Used when a visitor question should lead and the proper name should recede. */
  frontTitle?: string;
};

/** Authored Gallery 01 placement and public interpretation, independent of runtime tier names. */
export const MEDITERRANEAN_EXHIBIT_CURATION = {
  'ancient-greek': {
    authored: GALLERY_01_PRIMARY_PLACEMENTS['ancient-greek'],
    publicKicker: 'Aegean and Mediterranean worlds',
    visualKind: 'portrait',
    groupLabel: 'One beginning among many',
    frontTitle: 'One Mediterranean beginning among many',
  },
  thales: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.thales,
    publicKicker: 'Miletus · late 7th–6th century BCE',
    visualKind: 'water',
    groupLabel: 'Milesian natural explanation',
    frontTitle: 'Could nature explain nature?',
  },
  anaximander: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.anaximander,
    publicKicker: 'Miletus · early–mid 6th century BCE',
    visualKind: 'boundless',
    groupLabel: 'Milesian natural explanation',
    frontTitle: 'What if no familiar substance is enough?',
  },
  anaximenes: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.anaximenes,
    publicKicker: 'Miletus · mid-6th century BCE; dates uncertain',
    visualKind: 'air',
    groupLabel: 'Milesian natural explanation',
    frontTitle: 'How could air become many things?',
  },
  pythagoras: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.pythagoras,
    publicKicker: 'Samos and Croton · c. 570–c. 495 BCE',
    visualKind: 'number',
    groupLabel: 'Pythagorean order and practice',
  },
  philolaus: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.philolaus,
    publicKicker: 'Greek world · late 5th century BCE; dates uncertain',
    visualKind: 'harmony',
    groupLabel: 'Pythagorean order and practice',
  },
  parmenides: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.parmenides,
    publicKicker: 'Elea · early 5th century BCE; chronology debated',
    visualKind: 'being',
    groupLabel: 'The Eleatic challenge',
  },
  'zeno-elea': {
    authored: GALLERY_01_PRIMARY_PLACEMENTS['zeno-elea'],
    publicKicker: 'Elea · c. 490–c. 430 BCE',
    visualKind: 'paradox',
    groupLabel: 'The Eleatic challenge',
  },
  leucippus: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.leucippus,
    publicKicker: 'Greek world · 5th century BCE; biography uncertain',
    visualKind: 'atoms-archive',
    groupLabel: 'Atomists: bodies and void',
  },
  democritus: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.democritus,
    publicKicker: 'Abdera · c. 460–c. 370 BCE',
    visualKind: 'atoms',
    groupLabel: 'Atomists: bodies and void',
  },
  heraclitus: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.heraclitus,
    publicKicker: 'Ephesus · fl. c. 500 BCE; dates uncertain',
    visualKind: 'change',
    groupLabel: 'Rival accounts of change and order',
  },
  empedocles: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.empedocles,
    publicKicker: 'Akragas, Sicily · c. 494–c. 434 BCE',
    visualKind: 'elements',
    groupLabel: 'Rival accounts of change and order',
  },
  anaxagoras: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.anaxagoras,
    publicKicker: 'Klazomenai and Athens · c. 500–c. 428 BCE',
    visualKind: 'ordering-mind',
    groupLabel: 'Rival accounts of change and order',
  },
  protagoras: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.protagoras,
    publicKicker: 'Abdera and Athens · c. 490–c. 420 BCE',
    visualKind: 'civic-speech',
    groupLabel: 'Speech, education, and civic judgment',
  },
  prodicus: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.prodicus,
    publicKicker: 'Ceos and Athens · late 5th century BCE; dates uncertain',
    visualKind: 'civic-speech',
    groupLabel: 'Sophists: language, education, and civic performance',
    frontTitle: 'Can careful words guide a life?',
  },
  'hippias-of-elis': {
    authored: GALLERY_01_PRIMARY_PLACEMENTS['hippias-of-elis'],
    publicKicker: 'Elis and Olympia · c. 460–after 399 BCE; dates uncertain',
    visualKind: 'civic-speech',
    groupLabel: 'Sophists: language, education, and civic performance',
    frontTitle: 'Can learning make a person self-sufficient?',
  },
  gorgias: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.gorgias,
    publicKicker: 'Leontinoi and Athens · c. 485–c. 380 BCE',
    visualKind: 'civic-speech',
    groupLabel: 'Speech, education, and civic judgment',
  },
  socrates: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.socrates,
    publicKicker: 'Athens · c. 470–399 BCE',
    visualKind: 'examined-life',
    groupLabel: 'The examined life',
  },
  platonism: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.platonism,
    publicKicker: 'The Academy, Athens · from the 4th century BCE',
    visualKind: 'academy',
    groupLabel: 'Plato and the Academy',
  },
  plato: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.plato,
    publicKicker: 'Athens · c. 429/427–347 BCE',
    visualKind: 'portrait',
    groupLabel: 'Plato and the Academy',
  },
  aristotelianism: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.aristotelianism,
    publicKicker: 'The Lyceum, Athens · founded c. 335 BCE',
    visualKind: 'lyceum',
    groupLabel: 'Aristotle and the Lyceum',
  },
  aristotle: {
    authored: GALLERY_01_PRIMARY_PLACEMENTS.aristotle,
    publicKicker: 'Stagira and Athens · 384–322 BCE',
    visualKind: 'portrait',
    groupLabel: 'Aristotle and the Lyceum',
  },
} as const satisfies Record<MediterraneanExhibitId, MediterraneanExhibitCuration>;

/** Grand Entrance landmark; its footprint participates in entrance collision checks. */
export const MEDITERRANEAN_ORIENTATION_DISPLAY = {
  id: 'mediterranean-orientation-display',
  kind: 'orientation-plinth',
  ...GALLERY_01_ENTRANCE_ORIENTATION_PLACEMENT,
  height: 3.15,
} as const satisfies MuseumFurnishingDefinition;

export type MediterraneanRoomId = Gallery01RoomId;

export type MediterraneanRoomSignCopy = {
  title: string;
  kicker: string;
  subtitle: string;
};

export const MEDITERRANEAN_ROOM_SIGN_COPY = {
  'med-orientation-nature': {
    title: 'Could nature explain nature?',
    kicker: 'Room 01 · Begin in Miletus',
    subtitle: 'Thales → Anaximander → Anaximenes · names for three changing answers',
  },
  'med-being-change-plurality': {
    title: 'What survives when everything changes?',
    kicker: 'Room 02 · Being, motion, atoms, elements, mind',
    subtitle: 'Rival answers travel through Elea, Ephesus, Akragas, Abdera, and Ionia',
  },
  'med-sophists-socratic': {
    title: 'Can speech change a life?',
    kicker: 'Room 03 · Classical Athens',
    subtitle: 'Persuasion and civic judgment → Socrates and the examined life',
  },
  'med-plato-aristotle': {
    title: 'How does a conversation become a school?',
    kicker: 'Room 04 · Academy and Lyceum',
    subtitle: 'Plato and Aristotle → institutions, arguments, and long afterlives',
  },
} as const satisfies Record<MediterraneanRoomId, MediterraneanRoomSignCopy>;
