export const RENAISSANCE_GALLERY_ID = 'renaissance-humanism-new-method' as const;

export const RENAISSANCE_PALETTE = {
  plaster: '#e8dcc8',
  paper: '#d8c6a8',
  walnut: '#4b2f25',
  walnutEdge: '#2f1d18',
  oxblood: '#7c302f',
  terracotta: '#a95f43',
  inkBlue: '#263f51',
  agedBrass: '#9a7847',
  charcoal: '#262523',
  luminous: '#fff0cf',
} as const;

export const RENAISSANCE_ROOM_ACCENTS = [
  RENAISSANCE_PALETTE.oxblood,
  RENAISSANCE_PALETTE.inkBlue,
  RENAISSANCE_PALETTE.agedBrass,
] as const;

export type RenaissancePrimaryExhibitId = 'machiavelli' | 'ficino' | 'bacon' | 'galileo' | 'hobbes';

export type RenaissanceExhibitCuration = {
  authored: {x: number; z: number; rotationY: number};
  publicKicker: string;
  groupLabel: string;
};

/**
 * Paired philosopher anchors occupy the forward wall where a room has two.
 * Orientation copy sits above the central threshold, leaving both bays clear.
 */
export const RENAISSANCE_EXHIBIT_CURATION = {
  machiavelli: {
    authored: {x: -6.5, z: -10.48, rotationY: Math.PI},
    publicKicker: 'Florence · 1469–1527',
    groupLabel: 'Civic power, contingency, and political judgment',
  },
  ficino: {
    authored: {x: 6.5, z: -10.48, rotationY: Math.PI},
    publicKicker: 'Florence · 1433–1499',
    groupLabel: 'Translation, commentary, and Renaissance Platonism',
  },
  bacon: {
    authored: {x: -6.5, z: 8.18, rotationY: Math.PI},
    publicKicker: 'England · 1561–1626',
    groupLabel: 'Observation, experiment, and organized inquiry',
  },
  galileo: {
    authored: {x: 6.5, z: 8.18, rotationY: Math.PI},
    publicKicker: 'Italy · 1564–1642',
    groupLabel: 'Instruments, evidence, and contested authority',
  },
  hobbes: {
    authored: {x: -6.5, z: 26.85, rotationY: Math.PI},
    publicKicker: 'England and France · 1588–1679',
    groupLabel: 'Civil war, covenant, and sovereign authority',
  },
} as const satisfies Record<RenaissancePrimaryExhibitId, RenaissanceExhibitCuration>;

export type RenaissanceRoomId =
  | 'early-statecraft-republic'
  | 'early-experiment-method'
  | 'early-sovereignty-materialism';

export const RENAISSANCE_ROOM_SIGN_COPY = {
  'early-statecraft-republic': {
    title: 'Renaissance, Political Order, and New Science',
    kicker: 'GALLERY 02 · 16TH–17TH CENTURIES',
    subtitle: 'Humanist recovery → civic power → experiment → sovereignty',
  },
  'early-experiment-method': {
    title: 'Experiment, Method, and Organized Inquiry',
    kicker: 'OBSERVATION · INSTRUMENTS · COLLECTIVE REFORM',
    subtitle: 'Francis Bacon → Galileo → instrument-mediated evidence',
  },
  'early-sovereignty-materialism': {
    title: 'Sovereignty, Covenant, and Civil War',
    kicker: 'AUTHORITY · SECURITY · OBLIGATION',
    subtitle: 'Thomas Hobbes → Leviathan → the crisis of political order',
  },
} as const satisfies Record<RenaissanceRoomId, {
  title: string;
  kicker: string;
  subtitle: string;
}>;
