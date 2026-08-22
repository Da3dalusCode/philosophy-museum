import type {NavigableAppRoute} from '../../routing/routes';
import type {MuseumExhibitReview} from '../../editorial/exhibitReview';
import type {MuseumAssetId} from './museumAssetTypes';
import type {
  MuseumMediaMountDefinition,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from './museumWorldTypes';
import {GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS} from './gallery01Placement';

export type MuseumSupplementalInterpretationSource = {
  id?: string;
  label: string;
  url: string;
  kind: 'primary-text' | 'primary-interview' | 'academic-reference' | 'bibliographic-record' | 'collection-record';
};

export type MuseumSupplementalInterpretationSection = {
  heading: string;
  paragraphs: readonly string[];
  points?: readonly string[];
  sourceIds?: readonly string[];
};

export type MuseumSupplementalVisitorGuideItem = {
  label: string;
  description: string;
  sourceIds: readonly string[];
};

export type MuseumSupplementalVisitorGuideSection = {
  heading: string;
  items: readonly MuseumSupplementalVisitorGuideItem[];
};

export type MuseumSupplementalExhibitPresentation = {
  panelKicker: string;
  proximityKicker: string;
  factRows: readonly {label: string; value: string}[];
  articleActionLabel: string;
  entityKind: 'philosopher' | 'branch';
  keyIdeasLabel?: string;
  cautionsLabel?: string;
  exhibitLayout?: 'object-led';
};

export type MuseumSupplementalPlaqueType =
  | 'work-or-text'
  | 'concept-argument-diagram-or-method'
  | 'paired-or-grouped-historical-figures'
  | 'object-manuscript-site-or-archaeological-context'
  | 'reception-or-transmission-history'
  | 'historical-event-or-institutional-context'
  | 'other';

export type MuseumCanonicalContextRef = {
  kind: 'philosopher' | 'branch';
  id: string;
};

export type MuseumSupplementalWallPlaque = {
  /** Factual subject category used by the renderer and deterministic audit, never as visible copy. */
  type?: MuseumSupplementalPlaqueType;
  /** Focused factual override when the existing concise title remains curatorial or ambiguous. */
  title?: string;
  /** Focused complete-sentence override when the existing lead cannot supply concise wall copy. */
  invitation?: string;
  /** Explicit semantic contexts; supports genuine comparison without relying on title parsing. */
  canonicalContexts?: readonly MuseumCanonicalContextRef[];
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
  visitorGuide?: readonly MuseumSupplementalVisitorGuideSection[];
  sources: readonly MuseumSupplementalInterpretationSource[];
  objectInterpretation?: string;
  assetId: MuseumAssetId;
  panelAssetId: MuseumAssetId;
  /** Omitted when the Atlas has no truthful canonical article for this context. */
  articleRoute?: NavigableAppRoute;
  /** Gallery-specific copy; omitted here so Gallery 01 retains its exact output. */
  presentation?: MuseumSupplementalExhibitPresentation;
  /** Wall-only presentation metadata. Modal and article copy remain independent. */
  wallPlaque?: MuseumSupplementalWallPlaque;
  review?: MuseumExhibitReview & {resolution: string};
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
export const PLATO_SUPPLEMENTAL_BACKING_WIDTH = 4.72;

/**
 * These are work-and-idea exhibits associated with Plato. They are deliberately
 * outside the canonical program so the Museum retains a truthful primary roster.
 */
export const PLATO_SUPPLEMENTAL_EXHIBITS = [
  {
    id: CAVE_ID,
    displayName: 'The Allegory of the Cave',
    shortTitle: 'The Allegory of the Cave',
    workLabel: 'PLATO · REPUBLIC, BOOK VII',
    dateLabel: 'Republic VII, 514a–520e · composition date uncertain, fourth century BCE',
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
      'Saenredam’s 1604 engraving is later reception art, not an ancient image or direct witness to Plato’s text.',
      'Plato connects education to rule by philosophers; that hierarchical political conclusion remains contestable.',
    ],
    sections: [
      {
        heading: '',
        paragraphs: ['This Museum interpretive illustration presents Plato’s Cave as a vertical passage from confinement toward light. Below ground, chained prisoners face shadows cast by objects carried behind them; above, a sunlit landscape opens beyond the cave. The image follows the central movement of Book VII of the Republic while remaining a contemporary visual interpretation rather than historical artwork. Its divided composition makes the contrast between an enclosed field of experience and a wider world immediately visible, preparing the ascent that Plato describes as difficult, gradual, and transformative.'],
        sourceIds: ['cave-illustration', 'republic-cave'],
      },
      {
        heading: '',
        paragraphs: ['In Plato’s account, the prisoners have been confined since childhood, so shadows and echoes make up the only world they know. Release is painful and confusing. The familiar shadows at first seem clearer than the objects responsible for them, and the freed prisoner must adjust gradually before looking toward the sun. Plato compares education to this turning of the whole person: learning is not simply filling an empty mind with facts, but changing what someone is able and willing to see. The Cave is therefore about habit, attention, desire, explanation, and the difficulty of leaving a settled way of understanding.'],
        sourceIds: ['republic-cave', 'republic-turning', 'iep-republic'],
      },
      {
        heading: '',
        paragraphs: ['The story does not end in sunlight. The educated person must return to the cave, accept the confusion of descending into darkness, and share the work of governing with those who remain below. This return links knowledge to public responsibility, yet it also supports Plato’s controversial claim that philosophers should rule. The image asks difficult questions that remain alive: who can tell the difference between clearer understanding and confident illusion, who decides what education should turn us toward, and when does claimed knowledge become a reason to concentrate power? The illustration holds ascent and confinement in one view, keeping that political return visible alongside the promise of clearer understanding.'],
        sourceIds: ['republic-return', 'iep-republic'],
      },
    ],
    visitorGuide: [
      {
        heading: 'The image’s vertical argument',
        items: [
          {label: 'Below ground', description: 'Prisoners encounter shadows and echoes within a field they have never been able to test.', sourceIds: ['republic-cave']},
          {label: 'Toward the light', description: 'The ascent proceeds by painful adjustment rather than one effortless leap into knowledge.', sourceIds: ['republic-cave', 'republic-turning']},
        ],
      },
      {
        heading: 'Education and return',
        items: [
          {label: 'Turning the soul', description: 'Education redirects attention and desire toward better objects of understanding.', sourceIds: ['republic-turning', 'iep-republic']},
          {label: 'Civic obligation', description: 'The person who ascends is required to return, linking knowledge to Plato’s contested case for philosopher-rule.', sourceIds: ['republic-return', 'iep-republic']},
        ],
      },
    ],
    sources: [
      {id: 'republic-cave', label: 'Plato, Republic VII, 514a–518b: cave and ascent (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=plat.+rep.+7.514a', kind: 'primary-text'},
      {id: 'republic-turning', label: 'Plato, Republic 518c–d: education as turning the soul (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Plat.+Rep.+518C', kind: 'primary-text'},
      {id: 'republic-return', label: 'Plato, Republic 519c–520e: compelled return (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Plat.+Rep.+519C', kind: 'primary-text'},
      {id: 'iep-republic', label: 'Internet Encyclopedia of Philosophy: Plato’s Republic', url: 'https://iep.utm.edu/republic/', kind: 'academic-reference'},
      {id: 'cave-illustration', label: 'Philosophy Atlas Museum: Cave interpretive illustration', url: 'https://github.com/Da3dalusCode/philosophy-museum/blob/4e8587112422ca01c2a3b70b02bcd4e356f529b0/public/assets/museum/ancient-greek/plato-cave-interpretive-illustration-panel.webp', kind: 'collection-record'},
    ],
    objectInterpretation: 'This contemporary Museum illustration places the prisoners, shadow-making objects, cave, and sunlit world in one vertical composition. It interprets Plato’s argument rather than documenting an ancient place or object.',
    assetId: 'plato-cave-interpretive-illustration',
    panelAssetId: 'plato-cave-interpretive-illustration',
    articleRoute: {kind: 'philosopher', philosopherId: 'plato'},
    presentation: {
      panelKicker: 'Gallery 01 Plato work exhibit',
      proximityKicker: 'Plato work',
      factRows: [
        {label: 'Text', value: 'Republic VII, 514a–520e'},
        {label: 'Object', value: 'Philosophy Atlas Museum interpretive illustration · generation date unknown'},
        {label: 'Museum role', value: 'Contemporary argument image; not ancient evidence'},
      ],
      articleActionLabel: 'Read the full sourced Plato article',
      entityKind: 'philosopher',
      keyIdeasLabel: 'Interpretive anchors',
      cautionsLabel: 'Historical cautions',
      exhibitLayout: 'object-led',
    },
    wallPlaque: {
      type: 'concept-argument-diagram-or-method',
      title: 'The Allegory of the Cave',
      invitation: 'Plato’s Cave makes education a painful turning toward understanding and binds the ascent to a contested obligation to return.',
      canonicalContexts: [{kind: 'philosopher', id: 'plato'}],
    },
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-12',
      method: 'Gallery 01 supplemental review: object identity, claims, sources, rights, accessibility, provenance, subject-specific structured interpretation, and aspect-safe object-led presentation.',
      resolution: 'Resolved: restored the approved portrait-format Museum interpretive illustration; identified it honestly as contemporary interpretation; corrected its presentation metadata; and restored a claim-mapped ascent, education, and return sidebar while retaining its natural 4:5 wall format.',
      lock: 'fnv1a64:763b2eb986ae8f43',
    },
  },
  {
    id: REPUBLIC_ID,
    displayName: 'Plato’s Republic',
    shortTitle: 'Plato’s Republic',
    workLabel: 'PLATO · POLITEIA (REPUBLIC)',
    dateLabel: 'Composition date uncertain · fourth century BCE · medieval witness c. 900 CE',
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
        heading: '',
        paragraphs: ['The image shows the opening page of Plato’s Politeia, or Republic, in Codex Parisinus graecus 1807. An unknown Byzantine scribe copied the manuscript around 900 CE, more than a thousand years after Plato composed the dialogue. The carefully written Greek page is an important witness to the text’s survival and transmission. Elsewhere in this installation, Raimondi’s figure of Justice and the Renaissance painting The Ideal City offer later visual responses to justice and ordered civic space. The manuscript preserves Plato’s words; the Renaissance images show how later artists gave related ideals visible form.'],
        sourceIds: ['biblissima-manuscript', 'commons-manuscript', 'nga-justice', 'walters-city'],
      },
      {
        heading: '',
        paragraphs: ['The dialogue begins from a troubling question: why be just when injustice can appear profitable? Socrates enlarges the problem by building a city “in speech,” reasoning that justice may be easier to recognize in a community before turning back to the individual. He compares the city’s different functions with reason, spirit, and appetite in the soul, and describes an education meant to shape desire as well as judgment. The ascent toward knowledge of the Good and the return to the Cave lead to the proposal that philosophers should rule. These ideas belong together within a single inquiry into what makes a life and a community well ordered.'],
        sourceIds: ['republic-city', 'republic-soul', 'republic-education', 'republic-philosophers', 'republic-cave', 'sep-republic'],
      },
      {
        heading: '',
        paragraphs: ['The political vision remains deliberately unsettling. It gives great power to a supposedly knowledgeable elite, regulates education and poetry, reshapes family life among the guardians, and places democracy on a path of decline toward tyranny. Plato’s proposal that qualified women may serve as guardians challenges one ancient convention, but it does so within a strict hierarchy rather than a modern ideal of equality. The city in speech can be read as a model for thinking about the soul, yet its institutions are too serious to dismiss as harmless metaphor. That tension—between ethical inquiry, imaginative construction, and coercive politics—has kept the Republic at the center of philosophical argument for centuries.'],
        sourceIds: ['republic-education', 'republic-women', 'republic-regimes', 'sep-republic', 'iep-republic'],
      },
    ],
    visitorGuide: [
      {
        heading: 'What the manuscript witnesses',
        items: [
          {label: 'Byzantine copy', description: 'Codex Parisinus graecus 1807 was copied around 900 CE, long after Plato composed the dialogue.', sourceIds: ['biblissima-manuscript', 'commons-manuscript']},
          {label: 'Textual survival', description: 'The page is evidence for the Republic’s transmission, not Plato’s handwriting or an ancient original.', sourceIds: ['biblissima-manuscript', 'commons-manuscript']},
        ],
      },
      {
        heading: 'Justice at two scales',
        items: [
          {label: 'City and soul', description: 'The city in speech enlarges the question of justice before the dialogue returns to reason, spirit, and appetite in a person.', sourceIds: ['republic-city', 'republic-soul', 'sep-republic']},
          {label: 'Political risk', description: 'Guardian education and philosopher-rule join ethical order to hierarchy, concentrated authority, and coercive institutions.', sourceIds: ['republic-education', 'republic-women', 'republic-philosophers', 'republic-regimes', 'sep-republic', 'iep-republic']},
        ],
      },
    ],
    sources: [
      {id: 'republic-city', label: 'Plato, Republic 369a–c: the city in speech (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=urn:cts:greekLit:tlg0059.tlg030.perseus-eng1:369', kind: 'primary-text'},
      {id: 'republic-education', label: 'Plato, Republic III, 376c onward: guardian education (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Plat.+Rep.+3.376c', kind: 'primary-text'},
      {id: 'republic-soul', label: 'Plato, Republic IV, 435b–441c: city and soul (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0168:book=4:page=435', kind: 'primary-text'},
      {id: 'republic-women', label: 'Plato, Republic V, 451c onward: women, guardians, and families (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Plat.+Rep.+5.451c', kind: 'primary-text'},
      {id: 'republic-philosophers', label: 'Plato, Republic VI, 484a onward: philosopher-rulers (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Plat.+Rep.+6.484a', kind: 'primary-text'},
      {id: 'republic-cave', label: 'Plato, Republic VII, 514a–520e: Cave and return (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=plat.+rep.+7.514a', kind: 'primary-text'},
      {id: 'republic-regimes', label: 'Plato, Republic VIII, 543a onward: regime sequence (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Plat.+Rep.+8.543a', kind: 'primary-text'},
      {id: 'sep-republic', label: 'Stanford Encyclopedia of Philosophy: Plato’s Ethics and Politics in the Republic', url: 'https://plato.stanford.edu/entries/plato-ethics-politics/', kind: 'academic-reference'},
      {id: 'iep-republic', label: 'Internet Encyclopedia of Philosophy: Plato’s Republic', url: 'https://iep.utm.edu/republic/', kind: 'academic-reference'},
      {id: 'biblissima-manuscript', label: 'Biblissima: BnF Grec 1807 manuscript record', url: 'https://portail.biblissima.fr/ark:/43093/mdatabde59ea6f8e12384377f802b6c3df691133c0893', kind: 'collection-record'},
      {id: 'commons-manuscript', label: 'Wikimedia Commons: Codex Parisinus graecus 1807 reproduction', url: 'https://commons.wikimedia.org/wiki/File:Politeia_beginning._Codex_Parisinus_graecus_1807.jpg', kind: 'collection-record'},
      {id: 'nga-justice', label: 'National Gallery of Art: Justice by Marcantonio Raimondi after Raphael', url: 'https://www.nga.gov/artworks/10139-justice', kind: 'collection-record'},
      {id: 'walters-city', label: 'Walters Art Museum: The Ideal City', url: 'https://art.thewalters.org/object/37.677/', kind: 'collection-record'},
    ],
    objectInterpretation: 'Copied around 900 CE, this Greek manuscript preserves the opening of the Republic and gives material form to the long history through which Plato’s dialogue reached later readers.',
    assetId: 'plato-republic-justice-ideal-city',
    panelAssetId: 'plato-republic-parisinus-1807',
    articleRoute: {kind: 'philosopher', philosopherId: 'plato'},
    presentation: {
      panelKicker: 'Gallery 01 Plato work exhibit',
      proximityKicker: 'Plato work',
      factRows: [
        {label: 'Text', value: 'Plato’s Politeia (Republic) · fourth century BCE'},
        {label: 'Manuscript', value: 'BnF Codex Parisinus graecus 1807 · c. 900 CE'},
        {label: 'Related imagery', value: 'Later representations of Justice and the Ideal City'},
      ],
      articleActionLabel: 'Read the full sourced Plato article',
      entityKind: 'philosopher',
      keyIdeasLabel: 'Interpretive anchors',
      cautionsLabel: 'Historical cautions',
      exhibitLayout: 'object-led',
    },
    wallPlaque: {
      type: 'work-or-text',
      title: 'Plato’s Republic',
      invitation: 'The Republic tests justice through a city in speech and a divided soul while making philosopher-rule inseparable from coercive political risks.',
      canonicalContexts: [{kind: 'philosopher', id: 'plato'}],
    },
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-12',
      method: 'Gallery 01 supplemental review: object identity, claims, sources, rights, accessibility, provenance, subject-specific structured interpretation, and aspect-safe object-led presentation.',
      resolution: 'Resolved: distinguished the manuscript panel from the installed reception composite; retained authenticated catalogue evidence; restored a claim-mapped transmission-and-justice sidebar; and confirmed natural proportions for both the manuscript panel and 3:4 wall composition.',
      lock: 'fnv1a64:858b7e3f6004bef6',
    },
  },
] as const satisfies readonly PlatoSupplementalExhibit[];

export const PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  {
    id: REPUBLIC_ID,
    parentExhibitId: 'plato',
    zoneId: 'med-plato-aristotle',
    spatialCellId: 'med-plato-aristotle',
    position: GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS['plato-republic'].position,
    rotationY: GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS['plato-republic'].rotationY,
    interactionRadius: 3.5,
    collider: {id: `supplemental:${REPUBLIC_ID}`, center: GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS['plato-republic'].position, size: {width: 4.75, depth: 1.08}, rotation: GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS['plato-republic'].rotationY},
    viewpoint: GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS['plato-republic'].viewpoint,
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
    position: GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS['plato-cave-book-vii'].position,
    rotationY: GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS['plato-cave-book-vii'].rotationY,
    interactionRadius: 3.55,
    collider: {id: `supplemental:${CAVE_ID}`, center: GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS['plato-cave-book-vii'].position, size: {width: 4.75, depth: 1.08}, rotation: GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS['plato-cave-book-vii'].rotationY},
    viewpoint: GALLERY_01_PLATO_SUPPLEMENTAL_PLACEMENTS['plato-cave-book-vii'].viewpoint,
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

