import type {MuseumFurnishingDefinition} from './museumWorldTypes';

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

export type MediterraneanExhibitId =
  | 'ancient-greek'
  | 'thales'
  | 'anaximander'
  | 'anaximenes'
  | 'pythagoras'
  | 'philolaus'
  | 'parmenides'
  | 'zeno-elea'
  | 'leucippus'
  | 'democritus'
  | 'heraclitus'
  | 'empedocles'
  | 'anaxagoras'
  | 'protagoras'
  | 'gorgias'
  | 'socrates'
  | 'platonism'
  | 'plato'
  | 'aristotelianism'
  | 'aristotle';

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
    authored: {x: 10.85, z: -24.1, rotationY: -Math.PI / 2},
    publicKicker: 'Aegean and Mediterranean worlds',
    visualKind: 'portrait',
    groupLabel: 'One beginning among many',
    frontTitle: 'One Mediterranean beginning among many',
  },
  thales: {
    authored: {x: -10.85, z: -23.4, rotationY: Math.PI / 2},
    publicKicker: 'Miletus · late 7th–6th century BCE',
    visualKind: 'water',
    groupLabel: 'Milesian natural explanation',
    frontTitle: 'Could nature explain nature?',
  },
  anaximander: {
    authored: {x: 10.85, z: -17.4, rotationY: -Math.PI / 2},
    publicKicker: 'Miletus · early–mid 6th century BCE',
    visualKind: 'boundless',
    groupLabel: 'Milesian natural explanation',
    frontTitle: 'What if no familiar substance is enough?',
  },
  anaximenes: {
    authored: {x: -10.85, z: -17.4, rotationY: Math.PI / 2},
    publicKicker: 'Miletus · mid-6th century BCE; dates uncertain',
    visualKind: 'air',
    groupLabel: 'Milesian natural explanation',
    frontTitle: 'How could air become many things?',
  },
  pythagoras: {
    authored: {x: -10.85, z: -11.3, rotationY: Math.PI / 2},
    publicKicker: 'Samos and Croton · c. 570–c. 495 BCE',
    visualKind: 'number',
    groupLabel: 'Pythagorean order and practice',
  },
  philolaus: {
    authored: {x: -10.85, z: -7, rotationY: Math.PI / 2},
    publicKicker: 'Greek world · late 5th century BCE; dates uncertain',
    visualKind: 'harmony',
    groupLabel: 'Pythagorean order and practice',
  },
  parmenides: {
    authored: {x: 10.85, z: -11.3, rotationY: -Math.PI / 2},
    publicKicker: 'Elea · early 5th century BCE; chronology debated',
    visualKind: 'being',
    groupLabel: 'The Eleatic challenge',
  },
  'zeno-elea': {
    authored: {x: 10.85, z: -7, rotationY: -Math.PI / 2},
    publicKicker: 'Elea · c. 490–c. 430 BCE',
    visualKind: 'paradox',
    groupLabel: 'The Eleatic challenge',
  },
  leucippus: {
    authored: {x: 6, z: -5.7, rotationY: -Math.PI / 2},
    publicKicker: 'Greek world · 5th century BCE; biography uncertain',
    visualKind: 'atoms-archive',
    groupLabel: 'Atomists: bodies and void',
  },
  democritus: {
    authored: {x: -10.85, z: -3.8, rotationY: Math.PI / 2},
    publicKicker: 'Abdera · c. 460–c. 370 BCE',
    visualKind: 'atoms',
    groupLabel: 'Atomists: bodies and void',
  },
  heraclitus: {
    authored: {x: 10.85, z: -3.8, rotationY: -Math.PI / 2},
    publicKicker: 'Ephesus · fl. c. 500 BCE; dates uncertain',
    visualKind: 'change',
    groupLabel: 'Rival accounts of change and order',
  },
  empedocles: {
    authored: {x: 5.8, z: -1.15, rotationY: Math.PI},
    publicKicker: 'Akragas, Sicily · c. 494–c. 434 BCE',
    visualKind: 'elements',
    groupLabel: 'Rival accounts of change and order',
  },
  anaxagoras: {
    authored: {x: -5.8, z: -1.15, rotationY: Math.PI},
    publicKicker: 'Klazomenai and Athens · c. 500–c. 428 BCE',
    visualKind: 'ordering-mind',
    groupLabel: 'Rival accounts of change and order',
  },
  protagoras: {
    authored: {x: -10.85, z: 4.2, rotationY: Math.PI / 2},
    publicKicker: 'Abdera and Athens · c. 490–c. 420 BCE',
    visualKind: 'civic-speech',
    groupLabel: 'Speech, education, and civic judgment',
  },
  gorgias: {
    authored: {x: 10.85, z: 5.1, rotationY: -Math.PI / 2},
    publicKicker: 'Leontinoi and Athens · c. 485–c. 380 BCE',
    visualKind: 'civic-speech',
    groupLabel: 'Speech, education, and civic judgment',
  },
  socrates: {
    authored: {x: 6, z: 12.85, rotationY: Math.PI},
    publicKicker: 'Athens · c. 470–399 BCE',
    visualKind: 'examined-life',
    groupLabel: 'The examined life',
  },
  platonism: {
    authored: {x: -10.85, z: 18, rotationY: Math.PI / 2},
    publicKicker: 'The Academy, Athens · from the 4th century BCE',
    visualKind: 'academy',
    groupLabel: 'Plato and the Academy',
  },
  plato: {
    authored: {x: -10.85, z: 24, rotationY: Math.PI / 2},
    publicKicker: 'Athens · c. 429/427–347 BCE',
    visualKind: 'portrait',
    groupLabel: 'Plato and the Academy',
  },
  aristotelianism: {
    authored: {x: 10.85, z: 18, rotationY: -Math.PI / 2},
    publicKicker: 'The Lyceum, Athens · founded c. 335 BCE',
    visualKind: 'lyceum',
    groupLabel: 'Aristotle and the Lyceum',
  },
  aristotle: {
    authored: {x: 10.85, z: 24, rotationY: -Math.PI / 2},
    publicKicker: 'Stagira and Athens · 384–322 BCE',
    visualKind: 'portrait',
    groupLabel: 'Aristotle and the Lyceum',
  },
} as const satisfies Record<MediterraneanExhibitId, MediterraneanExhibitCuration>;

/** Central orientation wall; its footprint participates in collision and guided-route checks. */
export const MEDITERRANEAN_ORIENTATION_DISPLAY = {
  id: 'mediterranean-orientation-display',
  kind: 'orientation-plinth',
  center: {x: 4.65, z: -21.1},
  size: {width: 5.8, depth: .55},
  rotation: Math.PI,
  height: 3.15,
} as const satisfies MuseumFurnishingDefinition;

export type MediterraneanRoomId =
  | 'med-orientation-nature'
  | 'med-being-change-plurality'
  | 'med-sophists-socratic'
  | 'med-plato-aristotle';

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
