import type {NavigableAppRoute} from '../../routing/routes';
import type {MuseumAssetId} from './museumAssetTypes';
import type {
  MuseumMediaMountDefinition,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from './museumWorldTypes';

export type MuseumSupplementalInterpretationSource = {
  label: string;
  url: string;
  kind: 'primary-text' | 'academic-reference' | 'collection-record';
};

export type MuseumSupplementalInterpretationSection = {
  heading: string;
  paragraphs: readonly string[];
  points?: readonly string[];
};

export type MuseumSupplementalExhibitPresentation = {
  panelKicker: string;
  proximityKicker: string;
  factRows: readonly {label: string; value: string}[];
  articleActionLabel: string;
  entityKind: 'philosopher' | 'branch';
  keyIdeasLabel?: string;
  cautionsLabel?: string;
};

export type MuseumSupplementalExhibit = {
  id: MuseumSupplementalExhibitId;
  displayName: string;
  shortTitle: string;
  workLabel: string;
  dateLabel: string;
  question: string;
  frontSubtitle: string;
  lead: string;
  keyIdeas: readonly string[];
  cautions: readonly string[];
  sections: readonly MuseumSupplementalInterpretationSection[];
  sources: readonly MuseumSupplementalInterpretationSource[];
  assetId: MuseumAssetId;
  panelAssetId: MuseumAssetId;
  articleRoute: NavigableAppRoute;
  /** Gallery-specific copy; omitted here so Gallery 01 retains its exact output. */
  presentation?: MuseumSupplementalExhibitPresentation;
};

export type PlatoSupplementalExhibit = MuseumSupplementalExhibit;

const volume = (
  id: string,
  role: MuseumSceneVolume['role'],
  center: MuseumSceneVolume['center'],
  size: MuseumSceneVolume['size'],
): MuseumSceneVolume => ({id, role, center, size});

const mediaMount = (
  id: MuseumSupplementalExhibitId,
  assetId: MuseumAssetId,
  width: number,
  height: number,
  y: number,
): MuseumMediaMountDefinition => ({
  id: `${id}-hero-media`,
  assetId,
  kind: 'wall-frame',
  position: [0, y, -.38],
  rotation: [0, 0, 0],
  width,
  height,
  frameDepth: .11,
  supportHeight: 0,
  anchorId: `${id}-backing`,
  bounds: volume(`${id}-media-bounds`, 'media', {x: 0, y, z: -.38}, {width: width + .18, height: height + .18, depth: .2}),
  supportBounds: volume(`${id}-media-support`, 'media', {x: 0, y, z: -.55}, {width: width * .72, height: height * .72, depth: .18}),
});

const CAVE_ID = 'plato-cave-book-vii' as const;
const REPUBLIC_ID = 'plato-republic' as const;

/**
 * These are work-and-idea exhibits associated with Plato. They are deliberately
 * outside the canonical program so the Museum retains 63 truthful primaries.
 */
export const PLATO_SUPPLEMENTAL_EXHIBITS = [
  {
    id: CAVE_ID,
    displayName: 'The Allegory of the Cave',
    shortTitle: 'The Allegory of the Cave',
    workLabel: 'PLATO · REPUBLIC, BOOK VII',
    dateLabel: 'Republic, Book VII · composition date uncertain, often placed c. 380 BCE',
    question: 'What if everything familiar were only shadows?',
    frontSubtitle: 'Shadows, awakening, and the world beyond appearances',
    lead: 'The Cave is an image of education, intellectual reorientation, and civic responsibility. Prisoners mistake a constrained field of shadows and echoes for the whole of reality; release first hurts, clearer sight comes gradually, and the person who ascends is required to return. Plato is not merely saying that ordinary reality is an illusion.',
    keyIdeas: [
      'The prisoners’ certainty grows inside a restricted situation they have never been able to test.',
      'Release is painful: the familiar can initially seem clearer than a demanding new explanation.',
      'The ascent stages acclimation from shadows and reflections toward the sun, Plato’s image for the Good.',
      'Education turns the whole soul toward better objects of understanding rather than inserting knowledge into an empty mind.',
      'The ascent ends with an obligation to return to the cave and share the work of civic life.',
    ],
    cautions: [
      'This is one argument-image inside the Republic, not a free-standing doctrine that “everything is fake.”',
      'The exhibit image is a contemporary Philosophy Atlas Museum interpretive illustration, not an ancient image or historical witness.',
      'Plato connects education to rule by philosophers; that hierarchical political conclusion remains contestable.',
    ],
    sections: [
      {
        heading: 'A world narrowed to shadows',
        paragraphs: ['The prisoners have been constrained since childhood. A fire burns behind them, carried objects cast shadows, and echoes seem to come from the wall. Their mistake is not stupidity: their available evidence has been organized so that the shadows appear complete.'],
      },
      {
        heading: 'Why turning toward knowledge hurts',
        paragraphs: ['Release begins with coercion, glare, confusion, and resistance. The freed prisoner must learn to see in stages—first shadows and reflections, then objects, the night sky, and finally the sun. Plato makes education a reorientation of desire, attention, and judgment, not an instant revelation.'],
      },
      {
        heading: 'The return is part of the argument',
        paragraphs: ['The enlightened prisoner does not simply escape society. In the Republic, those educated for philosophy must descend again, accept ridicule and danger, and govern for the city’s sake. The image therefore joins knowledge to a demanding—and politically controversial—account of obligation.'],
      },
    ],
    sources: [
      {label: 'Plato, Republic VII, 514a–520e (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=plat.+rep.+7.514a', kind: 'primary-text'},
      {label: 'Plato, Republic 518c: education as turning the soul (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Plat.+Rep.+518C', kind: 'primary-text'},
      {label: 'Internet Encyclopedia of Philosophy: Plato’s Republic', url: 'https://iep.utm.edu/republic/', kind: 'academic-reference'},
    ],
    assetId: 'plato-cave-interpretive-illustration',
    panelAssetId: 'plato-cave-interpretive-illustration',
    articleRoute: {kind: 'philosopher', philosopherId: 'plato'},
  },
  {
    id: REPUBLIC_ID,
    displayName: 'Plato’s Republic',
    shortTitle: 'Plato’s Republic',
    workLabel: 'PLATO · POLITEIA (REPUBLIC)',
    dateLabel: 'Composition date uncertain, often placed in Plato’s middle period, perhaps c. 380 BCE',
    question: 'What would a just city—and a just person—require?',
    frontSubtitle: 'Justice in the soul and the city',
    lead: 'The Republic asks why anyone should be just when injustice can look profitable. Socrates builds a city “in speech” so that justice can be examined at a larger scale, then turns back to the person. The work is a serious political provocation and an ethical inquiry—not a simple municipal blueprint to copy.',
    keyIdeas: [
      'The city–soul analogy uses political order as a model for asking what makes a person internally just.',
      'Reason, spirit, and appetite form the tripartite soul; justice is their ordered cooperation under reason.',
      'Education forms character before advancing through mathematics and dialectic toward knowledge of the Good.',
      'Philosopher-rulers join knowledge to power because Plato distrusts rule by wealth, force, or popularity.',
      'Books VIII–IX pair a decline of regimes with increasingly disordered character types, ending in tyranny.',
    ],
    cautions: [
      'The city in speech is both an argumentative model and a politically serious ideal; reducing it to either a harmless metaphor or a ready construction plan misses the tension.',
      'The proposed order relies on hierarchy, controlled education, censorship, founding myths, concentrated power, and coercive family and reproductive arrangements.',
      'Plato’s hostile account of democracy belongs to an ancient Athenian debate and is not a neutral description of modern constitutional democracy.',
      'The c. 900 manuscript is a major witness to transmission, not Plato’s handwriting or a fourth-century BCE copy.',
    ],
    sections: [
      {
        heading: 'Justice written in larger letters',
        paragraphs: ['Glaucon challenges Socrates to show that justice is worth choosing for itself. The imagined city enlarges the problem: rulers deliberate, guardians defend, and producers supply material needs; the corresponding soul contains reason, spirit, and appetite. Plato calls justice an order in which each part does its work without taking over the whole.'],
      },
      {
        heading: 'Education and philosopher-rulers',
        paragraphs: ['Stories, music, physical training, mathematics, and dialectic shape both desire and judgment. Philosophers are made to rule because Plato thinks knowledge of the Good qualifies political authority—but the Cave’s return also shows that they must be compelled to accept that burden.'],
      },
      {
        heading: 'Regimes as moral psychology',
        paragraphs: ['The sequence from ideal order through timocracy, oligarchy, democracy, and tyranny is not a neutral constitutional history. Plato pairs each regime with a dominant motive—reason, honor, wealth, unbounded desire, and finally lawless appetite—to argue that political disorder and inner disorder mirror one another.'],
      },
      {
        heading: 'What should trouble us?',
        paragraphs: ['The Republic’s concentration of authority in a supposedly knowing elite, restrictions on poetry and public stories, hierarchy of social roles, hostility to democracy, communal guardian families, deceptive reproductive management, and doubtful feasibility have driven lasting criticism. Qualified women may become guardians, an unusual claim in its setting, but that inclusion does not cancel the system’s coercive structure.'],
      },
    ],
    sources: [
      {label: 'Plato, Republic 369a–c: the city in speech (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=urn:cts:greekLit:tlg0059.tlg030.perseus-eng1:369', kind: 'primary-text'},
      {label: 'Plato, Republic IV, 441a–b: city and soul (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0168:book=4:page=441', kind: 'primary-text'},
      {label: 'Stanford Encyclopedia of Philosophy: Plato’s Ethics and Politics in the Republic', url: 'https://plato.stanford.edu/entries/plato-ethics-politics/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy: Plato’s Republic', url: 'https://iep.utm.edu/republic/', kind: 'academic-reference'},
      {label: 'National Gallery of Art: Justice by Marcantonio Raimondi after Raphael', url: 'https://www.nga.gov/artworks/10139-justice', kind: 'collection-record'},
      {label: 'Walters Art Museum: The Ideal City', url: 'https://art.thewalters.org/object/37.677/', kind: 'collection-record'},
    ],
    assetId: 'plato-republic-justice-ideal-city',
    panelAssetId: 'plato-republic-parisinus-1807',
    articleRoute: {kind: 'philosopher', philosopherId: 'plato'},
  },
] as const satisfies readonly PlatoSupplementalExhibit[];

export const PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  {
    id: REPUBLIC_ID,
    parentExhibitId: 'plato',
    zoneId: 'med-plato-aristotle',
    spatialCellId: 'med-plato-aristotle',
    position: {x: -6.45, z: 15.12},
    rotationY: 0,
    interactionRadius: 3.5,
    collider: {id: `supplemental:${REPUBLIC_ID}`, center: {x: -6.45, z: 15.12}, size: {width: 4.75, depth: 1.08}, rotation: 0},
    viewpoint: {x: -6.45, z: 18.28, yaw: 0, pitch: -.08},
    assetId: 'plato-republic-justice-ideal-city',
    mediaMount: mediaMount(REPUBLIC_ID, 'plato-republic-justice-ideal-city', 2.55, 3.4, 1.82),
    label: {position: [0, 4.03, -.31], width: 4.18, height: .84},
    footprint: {width: 4.75, height: 4.55, depth: 1.08},
    installationKind: 'republic-altarpiece',
    accent: '#2f6f78',
  },
  {
    id: CAVE_ID,
    parentExhibitId: 'plato',
    zoneId: 'med-plato-aristotle',
    spatialCellId: 'med-plato-aristotle',
    position: {x: -6.45, z: 26.88},
    rotationY: Math.PI,
    interactionRadius: 3.55,
    collider: {id: `supplemental:${CAVE_ID}`, center: {x: -6.45, z: 26.88}, size: {width: 4.75, depth: 1.08}, rotation: Math.PI},
    viewpoint: {x: -6.45, z: 23.72, yaw: Math.PI, pitch: -.08},
    assetId: 'plato-cave-interpretive-illustration',
    mediaMount: mediaMount(CAVE_ID, 'plato-cave-interpretive-illustration', 2.72, 3.4, 1.82),
    label: {position: [0, 4.03, -.31], width: 4.18, height: .84},
    footprint: {width: 4.75, height: 4.55, depth: 1.08},
    installationKind: 'cave-ascent',
    accent: '#c98a34',
  },
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

const supplementalById = new Map<MuseumSupplementalExhibitId, MuseumSupplementalExhibit>(
  PLATO_SUPPLEMENTAL_EXHIBITS.map((record) => [record.id, record]),
);

export const findPlatoSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): PlatoSupplementalExhibit | undefined => supplementalById.get(id);

export const getPlatoSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): PlatoSupplementalExhibit => {
  const record = supplementalById.get(id);
  if (!record) throw new Error(`Plato supplemental exhibit ${id} is missing.`);
  return record;
};

