import type {MuseumZoneId} from '../museumCatalog';
import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {
  MuseumMediaMountDefinition,
  MuseumPoint,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export const BUDDHIST_GALLERY_ID = 'buddhist-philosophies' as const;

export const BUDDHIST_PALETTE = Object.freeze({
  ink: '#1c2220',
  saffron: '#c58a35',
  lotus: '#9c4f4f',
  lapis: '#355e7b',
  jade: '#3f7165',
  paper: '#e7dcc6',
});

export const BUDDHIST_ROOM_SIGN_COPY = {
  'buddhist-many-paths': {
    kicker: 'Room 01 · Begin with plurality',
    title: 'Many Buddhist paths and early discourses',
    subtitle: 'Suffering, no-self, discipline, meditation, and insight enter through layered communal transmission.',
  },
  'buddhist-madhyamaka': {
    kicker: 'Room 02 · Emptiness without nihilism',
    title: 'Madhyamaka: dependence, emptiness, and two truths',
    subtitle: 'Ask how dependent arising undercuts independent essence without making practice or suffering unreal.',
  },
  'buddhist-abhidharma-yogacara': {
    kicker: 'Room 03 · Analyze experience',
    title: 'Abhidharma to Yogācāra',
    subtitle: 'Follow Vasubandhu across classification, cognition, continuity, and contested accounts of representation.',
  },
  'buddhist-pramana': {
    kicker: 'Room 04 · Test cognition',
    title: 'Pramāṇa: perception, inference, and language',
    subtitle: 'Dignāga and Dharmakīrti make reliable cognition a precise philosophical problem.',
  },
  'buddhist-transmission-reserve': {
    kicker: 'Room 05 · Translation transforms',
    title: 'Texts move—and philosophical worlds change',
    subtitle: 'Chinese printing, Tibetan manuscripts, travel, commentary, and institutions carry arguments into new settings.',
  },
} as const;

const volume = (id: string, center: MuseumSceneVolume['center'], size: MuseumSceneVolume['size']): MuseumSceneVolume =>
  ({id, role: 'media', center, size});
const mediaMount = (id: MuseumSupplementalExhibitId, assetId: MuseumAssetId, width: number, height: number): MuseumMediaMountDefinition => {
  const y = 2.14;
  return {
    id: `${id}-hero-media`, assetId, kind: 'wall-frame', position: [0, y, -.39], rotation: [0, 0, 0],
    width, height, frameDepth: .1, supportHeight: 0, anchorId: `${id}-backing`,
    bounds: volume(`${id}-media-bounds`, {x: 0, y, z: -.39}, {width: width + .18, height: height + .18, depth: .2}),
    supportBounds: volume(`${id}-media-support`, {x: 0, y, z: -.55}, {width: width * .74, height: height * .74, depth: .18}),
  };
};
const cameraFor = (position: MuseumPoint, rotationY: number, distance = 2.92): MuseumPoint => ({
  x: position.x + Math.sin(rotationY) * distance, z: position.z + Math.cos(rotationY) * distance,
});
const layout = ({
  id, parentExhibitId, zoneId, position, rotationY, assetId, mediaWidth, mediaHeight, installationKind, accent,
}: {
  id: MuseumSupplementalExhibitId;
  parentExhibitId: 'buddhist-philosophy' | 'nagarjuna' | 'vasubandhu';
  zoneId: MuseumZoneId;
  position: MuseumPoint;
  rotationY: number;
  assetId: MuseumAssetId;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: MuseumSupplementalInstallationKind;
  accent: string;
}): MuseumSupplementalExhibitLayout => {
  const width = 4.35;
  return {
    id, parentExhibitId, zoneId, spatialCellId: zoneId, position, rotationY, interactionRadius: 3.65,
    collider: {id: `supplemental:${id}`, center: position, size: {width, depth: 1.05}, rotation: rotationY},
    viewpoint: {...cameraFor(position, rotationY), yaw: rotationY, pitch: -.055},
    assetId, mediaMount: mediaMount(id, assetId, mediaWidth, mediaHeight),
    label: {position: [0, 4.04, -.3], width: width - .36, height: .72},
    footprint: {width, height: 4.44, depth: 1.05}, installationKind, accent,
  };
};
const presentation = (
  panelKicker: string,
  proximityKicker: string,
  factRows: readonly {label: string; value: string}[],
  articleActionLabel: string,
  entityKind: 'philosopher' | 'branch',
) => ({panelKicker, proximityKicker, factRows, articleActionLabel, entityKind, keyIdeasLabel: 'Interpretive anchors', cautionsLabel: 'Keep in view'});

const exhibits = [
  {
    id: 'buddhist-early-discourse-scrolls',
    displayName: 'The Buddha’s Teachings: Early Discourses in Transmission',
    shortTitle: 'The Buddha: Early Discourses in Transmission',
    workLabel: 'EARLY BUDDHIST TEXTS · COMMUNAL MEMORY',
    dateLabel: 'Gandhāran birch-bark fragments · 1st century CE',
    question: 'How do teachings associated with an oral community become surviving texts?',
    frontSubtitle: 'Recitation, collection, variation, copying, and material fragility',
    lead: 'The Buddha left no autograph. Early discourses were recited, organized, debated, and transmitted by communities before the surviving Gandhāran fragments were written. These birch-bark pieces are extraordinarily early material witnesses, but they still belong to a history of preservation rather than a stenographic record of one speaker.',
    keyIdeas: ['Oral and textual transmission are historical processes.', 'Different canons preserve overlapping and divergent collections.', 'A surviving manuscript date is not the date of the teaching it carries.'],
    cautions: ['Do not label the fragments as the Buddha’s handwriting.', 'One fragment cannot stand for every Buddhist canon or school.'],
    sections: [
      {heading: 'A teaching becomes a collection', paragraphs: ['Communities recited teachings in patterned forms, grouped them, and preserved them across languages and institutions. Variation is evidence of transmission, not simply corruption.']},
      {heading: 'Material evidence changes the question', paragraphs: ['Birch bark, Kharoṣṭhī script, damage, and provenance tell a history of copying and survival. The object asks what can be inferred without pretending that every layer is equally old.']},
      {heading: 'Plural canons require careful comparison', paragraphs: ['Pāli, Sanskrit, Gāndhārī, Chinese, and Tibetan witnesses preserve related teachings through different textual histories. Comparison can reveal shared structures and meaningful variation without inventing a single recoverable transcript behind them all.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Gandhāran birch-bark fragments', url: 'https://commons.wikimedia.org/wiki/File:Fragmentary_Buddhist_text_-_Gandhara_birchbark_scrolls_(1st_C),_part_31_-_BL_Or._14915.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Buddha', url: 'https://plato.stanford.edu/entries/buddha/', kind: 'academic-reference'},
    ],
    assetId: 'buddhist-gandhara-birchbark', panelAssetId: 'buddhist-gandhara-birchbark',
    articleRoute: {kind: 'philosopher', philosopherId: 'buddha'},
    presentation: presentation('Gallery 08 textual history', 'Early discourses in transmission', [
      {label: 'Witness', value: 'Gandhāran birch bark'}, {label: 'Date', value: '1st century CE'}, {label: 'Caution', value: 'Transmission, not autograph'},
    ], 'Open the Buddha in the Atlas', 'philosopher'),
  },
  {
    id: 'nagarjuna-prajnaparamita-witness',
    displayName: 'Nāgārjuna’s Context: Prajñāpāramitā in Manuscript',
    shortTitle: 'Nāgārjuna: Prajñāpāramitā Transmission',
    workLabel: 'MADHYAMAKA CONTEXT · PERFECTION OF WISDOM',
    dateLabel: 'Tibetan manuscript leaf · 13th century',
    question: 'How did emptiness arguments develop alongside the Perfection of Wisdom literature?',
    frontSubtitle: 'Wisdom, non-grasping, bodhisattva practice, and later Tibetan transmission',
    lead: 'Prajñāpāramitā literature repeatedly unsettles attachment to fixed categories while situating wisdom within the bodhisattva path. Nāgārjuna’s Madhyamaka is historically distinct from any one sūtra, but later traditions read his arguments in close conversation with this literature. The leaf makes that interpretive afterlife visible.',
    keyIdeas: ['Emptiness is joined to practice rather than offered as a detached theory.', 'Madhyamaka and Prajñāpāramitā are related but not identical.', 'Later Tibetan manuscripts witness reception, not Nāgārjuna’s authorship.'],
    cautions: ['The leaf was copied about a millennium after Nāgārjuna.', 'Do not turn “emptiness” into a claim that nothing exists.'],
    sections: [
      {heading: 'Wisdom without a new essence', paragraphs: ['Perfection of Wisdom texts challenge the impulse to make even liberating categories into permanent things. Madhyamaka develops rigorous arguments against that reification.']},
      {heading: 'Traditions read texts together', paragraphs: ['Commentaries and institutions constructed relationships among sūtras, treatises, ritual practice, and philosophical debate. The manuscript belongs to that later history.']},
      {heading: 'The object stages a later encounter', paragraphs: ['Text, painted figures, format, and preservation show how philosophical argument entered devotional and scholastic settings far from its earliest composition. That encounter is evidence for reception, not proof of a simple authorial lineage. Its distance is historically meaningful.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Walters Prajñāpāramitā leaf', url: 'https://commons.wikimedia.org/wiki/File:Tibetan_-_Buddha_Shakyamuni_and_Prajnaparamita_-_Walters_W8561_(2).jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Nāgārjuna', url: 'https://plato.stanford.edu/entries/nagarjuna/', kind: 'academic-reference'},
    ],
    assetId: 'buddhist-prajnaparamita-walters', panelAssetId: 'buddhist-prajnaparamita-walters',
    articleRoute: {kind: 'philosopher', philosopherId: 'nagarjuna'},
    presentation: presentation('Gallery 08 manuscript exhibit', 'Prajñāpāramitā transmission', [
      {label: 'Object', value: '13th-century Tibetan leaf'}, {label: 'Context', value: 'Perfection of Wisdom'}, {label: 'Caution', value: 'Later reception'},
    ], 'Open Nāgārjuna in the Atlas', 'philosopher'),
  },
  {
    id: 'nagarjuna-dependent-arising',
    displayName: 'Nāgārjuna: Dependent Arising and Emptiness',
    shortTitle: 'Nāgārjuna: Dependent Arising',
    workLabel: 'NĀGĀRJUNA · DEPENDENCE WITHOUT ESSENCE',
    dateLabel: 'Modern bhavacakra mural · photographed 2019',
    question: 'Why does dependence undermine independent essence rather than ordinary causal life?',
    frontSubtitle: 'Conditioned arising, conventional truth, emptiness, and the rejection of nihilism',
    lead: 'Nāgārjuna argues that whatever arises through conditions cannot possess an independent, self-grounding essence. Emptiness names that absence of intrinsic nature; it does not erase causal practice, ethical consequence, or suffering. The modern wheel is a prompt for dependent arising, not a diagram of Madhyamaka’s full argument.',
    keyIdeas: ['Dependent things are empty of independent essence.', 'Conventional relations remain indispensable.', 'Emptiness itself must not be reified into a hidden substance.'],
    cautions: ['The mural is contemporary and not Nāgārjuna’s diagram.', 'Emptiness is not simple nonexistence.'],
    sections: [
      {heading: 'The argument turns on dependence', paragraphs: ['A thing that depends on causes, parts, concepts, and practices cannot be what it is entirely from its own side. This critique targets essence, not every form of existence.']},
      {heading: 'Two truths are not two worlds', paragraphs: ['Conventional truth concerns the working distinctions through which life and inquiry proceed. Ultimate analysis shows why those distinctions lack independent foundation; it does not reveal a separate metaphysical realm.']},
      {heading: 'Analysis returns to practice', paragraphs: ['Because persons and actions function conventionally, insight into emptiness does not cancel compassion, responsibility, or causal consequence. Madhyamaka instead asks practitioners to use distinctions without mistaking them for self-grounded realities.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Bhavacakra mural', url: 'https://commons.wikimedia.org/wiki/File:Bhavachakra_Samsara,_Buddhist_Wheel_of_Life,_Dhamma_Nagajjuna,_Nagarjuna_Sagar_Telangana,_India.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Nāgārjuna', url: 'https://plato.stanford.edu/entries/nagarjuna/', kind: 'academic-reference'},
    ],
    assetId: 'buddhist-dependent-arising-wheel', panelAssetId: 'buddhist-dependent-arising-wheel',
    articleRoute: {kind: 'philosopher', philosopherId: 'nagarjuna'},
    presentation: presentation('Gallery 08 concept exhibit', 'Dependent arising', [
      {label: 'Claim', value: 'Dependence excludes independent essence'}, {label: 'Method', value: 'Analyze relations and conditions'}, {label: 'Caution', value: 'Not nihilism'},
    ], 'Open Nāgārjuna in the Atlas', 'philosopher'),
  },
  {
    id: 'vasubandhu-abhidharmakosa',
    displayName: 'Vasubandhu’s Abhidharmakośa: Analysis and Critique',
    shortTitle: 'Vasubandhu: Abhidharmakośa',
    workLabel: 'VASUBANDHU · TREASURY OF ABHIDHARMA',
    dateLabel: 'Later manuscript witness · National Archives of Nepal',
    question: 'How can experience be analyzed without positing a permanent self?',
    frontSubtitle: 'Dharmas, causation, cognition, karma, and Vasubandhu’s critical commentary',
    lead: 'The Abhidharmakośa organizes a vast field of scholastic analysis while its commentary also questions positions associated with Sarvāstivāda. Vasubandhu is therefore not a static label between “Abhidharma” and “Yogācāra,” but a thinker working across inherited systems, criticism, and later reinterpretation.',
    keyIdeas: ['Analysis breaks the person into conditioned processes without denying continuity.', 'The commentary records argument within Buddhist scholasticism.', 'Vasubandhu’s intellectual biography and affiliations remain debated.'],
    cautions: ['The manuscript is not an autograph.', 'Do not make every Abhidharma school say the same thing.'],
    sections: [
      {heading: 'A treasury can also criticize', paragraphs: ['Classification clarifies causal and cognitive relations, but Vasubandhu’s commentary frequently stages objections and rival positions. System and debate belong together.']},
      {heading: 'No-self does not mean no continuity', paragraphs: ['Buddhist analysis explains memory, responsibility, and rebirth through conditioned sequences rather than an unchanging owner. The explanatory details remain contested.']},
      {heading: 'A thinker crosses inherited boundaries', paragraphs: ['Later biographies and doxographies organize Vasubandhu into neat stages, yet the works themselves preserve complex engagements with multiple scholastic positions. The exhibit treats those affiliations as historical questions rather than a fixed conversion story. That uncertainty matters when relating one work to another.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Abhidharmakośa manuscript', url: 'https://commons.wikimedia.org/wiki/File:Abhidharmakosha_manuscript.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Vasubandhu', url: 'https://plato.stanford.edu/entries/vasubandhu/', kind: 'academic-reference'},
    ],
    assetId: 'vasubandhu-abhidharmakosha-manuscript', panelAssetId: 'vasubandhu-abhidharmakosha-manuscript',
    articleRoute: {kind: 'philosopher', philosopherId: 'vasubandhu'},
    presentation: presentation('Gallery 08 work exhibit', 'Abhidharmakośa', [
      {label: 'Work', value: 'Treasury of Abhidharma'}, {label: 'Method', value: 'Classification and critique'}, {label: 'Caution', value: 'Affiliations debated'},
    ], 'Open Vasubandhu in the Atlas', 'philosopher'),
  },
  {
    id: 'vasubandhu-mere-ideation',
    displayName: 'Vasubandhu’s Mere Ideation: Representation and Experience',
    shortTitle: 'Vasubandhu: Mere Ideation',
    workLabel: 'VASUBANDHU · VIJÑAPTIMĀTRATĀ',
    dateLabel: 'Later Tibetan xylograph witness',
    question: 'What changes when experience is analyzed through representation rather than external objects as ordinarily assumed?',
    frontSubtitle: 'Cognition, appearance, karmic continuity, and rival readings of Yogācāra',
    lead: 'Texts attributed to Vasubandhu use “mere ideation” to analyze how experience appears structured by cognition and karmic dispositions. Interpreters dispute whether this amounts to idealism, a phenomenological method, a soteriological strategy, or some combination. The exhibit keeps that tension visible instead of translating the doctrine into a slogan.',
    keyIdeas: ['Experience is examined through representational and causal processes.', 'The ordinary subject-object split is not taken for granted.', 'Modern labels such as “idealism” remain interpretive and contested.'],
    cautions: ['Do not reduce the argument to “nothing exists outside my mind.”', 'The Tibetan print is a later transmission witness.'],
    sections: [
      {heading: 'A diagnosis serves transformation', paragraphs: ['Yogācāra analysis is not only a theory of what exists. It asks how mistaken constructions arise and how transformed cognition could loosen suffering.']},
      {heading: 'The modern category remains contested', paragraphs: ['Calling Vasubandhu an idealist can clarify some arguments and conceal others. Responsible interpretation states the comparison without making it the ancient author’s own label.']},
      {heading: 'Representation has a causal history', paragraphs: ['Appearances are shaped by dispositions, previous acts, conceptual habits, and shared conditions rather than produced by a sovereign private mind. That causal account keeps ethical and soteriological questions joined to the analysis of cognition.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Completion of Mere Ideation', url: 'https://commons.wikimedia.org/wiki/File:The_Completion_of_Mere_Ideation_WDL11843.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Vasubandhu', url: 'https://plato.stanford.edu/entries/vasubandhu/', kind: 'academic-reference'},
    ],
    assetId: 'vasubandhu-mere-ideation', panelAssetId: 'vasubandhu-mere-ideation',
    articleRoute: {kind: 'philosopher', philosopherId: 'vasubandhu'},
    presentation: presentation('Gallery 08 work exhibit', 'Mere ideation', [
      {label: 'Focus', value: 'Representation and cognition'}, {label: 'Aim', value: 'Transform mistaken construction'}, {label: 'Debate', value: 'What kind of idealism?'},
    ], 'Open Vasubandhu in the Atlas', 'philosopher'),
  },
  {
    id: 'buddhist-xuanzang-translation',
    displayName: 'Xuanzang: Translation as Philosophical Labor',
    shortTitle: 'Xuanzang: Translation and Debate',
    workLabel: 'TRANSLATION · TRAVEL · TERMINOLOGY',
    dateLabel: 'Modern Xi’an monument · photographed 2010',
    question: 'What philosophical work occurs when texts cross languages and institutions?',
    frontSubtitle: 'Terminology, travel, commentary, institutions, and East Asian Yogācāra',
    lead: 'Xuanzang’s journeys, translations, and commentarial projects helped reshape Buddhist philosophy in East Asia. Translation required choices about terms, arguments, textual families, and authority. The modern statue commemorates that labor while reminding visitors that a tradition moves through people and institutions, not disembodied ideas alone.',
    keyIdeas: ['Translation selects philosophical equivalents and creates new vocabularies.', 'Travel and institutions affect which texts become authoritative.', 'East Asian Yogācāra develops rather than merely copies South Asian debates.'],
    cautions: ['The statue is modern and not a Tang portrait.', 'Translation is not a transparent transfer of identical meanings.'],
    sections: [
      {heading: 'Words carry arguments', paragraphs: ['Rendering technical terms demands decisions about similarity, ambiguity, and established usage. Those decisions become resources for later debates.']},
      {heading: 'Transmission transforms', paragraphs: ['Schools, catalogues, commentaries, and pedagogies reorganize imported materials. New settings do not simply preserve a frozen original.']},
      {heading: 'Institutions make translation possible', paragraphs: ['Patronage, teams of specialists, libraries, travel routes, and teaching communities supplied the labor behind translated canons. Xuanzang’s achievement therefore belongs to a network even while his choices decisively shaped that network’s vocabulary. Later commentators then debated those choices within new intellectual settings.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Xuanzang statue', url: 'https://commons.wikimedia.org/wiki/File:Xuanzang.jpg', kind: 'collection-record'},
      {label: 'Internet Encyclopedia of Philosophy — Yogācāra', url: 'https://iep.utm.edu/yogacara-buddhism/', kind: 'academic-reference'},
    ],
    assetId: 'buddhist-xuanzang-statue', panelAssetId: 'buddhist-xuanzang-statue',
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    presentation: presentation('Gallery 08 transmission', 'Translation as philosophy', [
      {label: 'Figure', value: 'Xuanzang'}, {label: 'Work', value: 'Travel, translation, commentary'}, {label: 'Result', value: 'New philosophical vocabularies'},
    ], 'Open Buddhist Philosophy in the Atlas', 'branch'),
  },
  {
    id: 'buddhist-tibetan-pecha',
    displayName: 'Tibetan Manuscript Worlds: Text, Image, and Institution',
    shortTitle: 'Tibetan Manuscript Worlds',
    workLabel: 'TRANSMISSION · MANUSCRIPT CULTURE',
    dateLabel: 'Painted manuscript cover · c. 13th–14th century',
    question: 'How do translated texts acquire material, ritual, and institutional lives?',
    frontSubtitle: 'Pecha format, painting, recitation, commentary, collection, and use',
    lead: 'A painted Tibetan manuscript cover protected and framed a text as a valued material object. Translation, copying, recitation, commentary, image, and institutional stewardship all contributed to a philosophical work’s life. The cover does not reveal one doctrine, but it makes the conditions of preservation and authority impossible to ignore.',
    keyIdeas: ['Texts persist through skilled material and institutional practices.', 'Image and ornament can mark value without summarizing doctrine.', 'Tibetan philosophical traditions developed extensive new debates and curricula.'],
    cautions: ['A manuscript cover is not a diagram of its text.', 'Tibetan Buddhism is internally diverse and cannot be represented by one object.'],
    sections: [
      {heading: 'A book has a social life', paragraphs: ['Commissioning, copying, housing, reading, reciting, and teaching determine which texts survive and how they are interpreted.']},
      {heading: 'Reception creates new arguments', paragraphs: ['Tibetan scholars did not merely preserve Indian works. They organized curricula, wrote commentaries, and developed competing interpretations across institutions and lineages.']},
      {heading: 'Material form directs attention', paragraphs: ['Long leaves, protective boards, pigments, and ordered bundles govern how a reader handles and encounters a text. The cover’s visual authority frames study while remaining distinct from the propositions found inside. Handling and display are part of transmission.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Walters manuscript cover W.896', url: 'https://commons.wikimedia.org/wiki/File:Tibetan_-_Cover_of_a_Buddhist_Manuscript_-_Walters_W896_-_Top_(cropped).jpg', kind: 'collection-record'},
      {label: 'Internet Encyclopedia of Philosophy — Buddhist Philosophy', url: 'https://iep.utm.edu/buddha/', kind: 'academic-reference'},
    ],
    assetId: 'buddhist-tibetan-pecha', panelAssetId: 'buddhist-tibetan-pecha',
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    presentation: presentation('Gallery 08 transmission', 'Tibetan manuscript worlds', [
      {label: 'Object', value: 'Painted manuscript cover'}, {label: 'Date', value: 'c. 13th–14th century'}, {label: 'Focus', value: 'Material and institutional life'},
    ], 'Open Buddhist Philosophy in the Atlas', 'branch'),
  },
  {
    id: 'buddhist-diamond-sutra',
    displayName: 'The Diamond Sūtra: Translation, Printing, and Circulation',
    shortTitle: 'Diamond Sūtra: Print and Circulation',
    workLabel: 'EAST ASIA · PRINT · PUBLIC TRANSMISSION',
    dateLabel: 'Dated Chinese woodblock print · 868 CE',
    question: 'How does printing change the scale and setting of Buddhist textual life?',
    frontSubtitle: 'Chinese translation, patronage, image, text, reproducibility, and Dunhuang',
    lead: 'The dated 868 Diamond Sūtra combines a teaching frontispiece, Chinese text, printing, and patronage. It is not the first Buddhist translation or printed image, but it is a remarkable surviving object in which philosophical language, ritual merit, technology, and circulation meet. It closes the hall by turning transmission into a visible historical process.',
    keyIdeas: ['Printing changes reproducibility without fixing interpretation.', 'Translation and patronage shape which texts circulate.', 'Material history belongs inside philosophical history.'],
    cautions: ['The object is one Chinese translation and not a complete East Asian canon.', 'Its survival should not be confused with being the first instance of every feature it displays.'],
    sections: [
      {heading: 'Reproduction creates new publics', paragraphs: ['Woodblock printing enabled repeated copies while preserving a designed relation between image and text. Distribution, merit-making, and study could now meet at a different scale.']},
      {heading: 'A route continues beyond the hall', paragraphs: ['The object points toward Chinese, Korean, Japanese, Tibetan, and other Buddhist histories that exceed this gallery’s South Asian primary roster. The wall marks transformation, not a final destination.']},
      {heading: 'A date anchors one surviving object', paragraphs: ['The colophon identifies a particular act of production and dedication in 868. It offers unusually precise evidence without establishing that printing, translation, or illustrated Buddhist books began with this copy.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Diamond Sūtra, British Library Or. 8210/P.2', url: 'https://commons.wikimedia.org/wiki/File:Diamond_Sutra_of_868_AD_-_The_Diamond_Sutra_(868),_frontispiece_and_text_-_BL_Or._8210-P.2.jpg', kind: 'collection-record'},
      {label: 'British Library — Diamond Sutra', url: 'https://www.bl.uk/collection-items/the-diamond-sutra', kind: 'collection-record'},
    ],
    assetId: 'buddhist-diamond-sutra-868', panelAssetId: 'buddhist-diamond-sutra-868',
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    presentation: presentation('Gallery 08 transmission', 'Print and circulation', [
      {label: 'Object', value: 'Dated woodblock print'}, {label: 'Date', value: '868 CE'}, {label: 'Place', value: 'China; found at Dunhuang'},
    ], 'Open Buddhist Philosophy in the Atlas', 'branch'),
  },
] as const satisfies readonly MuseumSupplementalExhibit[];

export const BUDDHIST_SUPPLEMENTAL_EXHIBITS = exhibits;
export const BUDDHIST_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'buddhist-early-discourse-scrolls', parentExhibitId: 'buddhist-philosophy', zoneId: 'buddhist-many-paths', position: {x: 10.85, z: -22.4}, rotationY: -Math.PI / 2, assetId: 'buddhist-gandhara-birchbark', mediaWidth: 3.48, mediaHeight: 2.32, installationKind: 'buddhist-work', accent: BUDDHIST_PALETTE.saffron}),
  layout({id: 'nagarjuna-prajnaparamita-witness', parentExhibitId: 'nagarjuna', zoneId: 'buddhist-madhyamaka', position: {x: -10.85, z: -11.2}, rotationY: Math.PI / 2, assetId: 'buddhist-prajnaparamita-walters', mediaWidth: 3.58, mediaHeight: 1.17, installationKind: 'buddhist-work', accent: BUDDHIST_PALETTE.lapis}),
  layout({id: 'nagarjuna-dependent-arising', parentExhibitId: 'nagarjuna', zoneId: 'buddhist-madhyamaka', position: {x: 10.85, z: -11.2}, rotationY: -Math.PI / 2, assetId: 'buddhist-dependent-arising-wheel', mediaWidth: 2.78, mediaHeight: 3.28, installationKind: 'buddhist-concept', accent: BUDDHIST_PALETTE.lotus}),
  layout({id: 'vasubandhu-abhidharmakosa', parentExhibitId: 'vasubandhu', zoneId: 'buddhist-abhidharma-yogacara', position: {x: -10.85, z: 0}, rotationY: Math.PI / 2, assetId: 'vasubandhu-abhidharmakosha-manuscript', mediaWidth: 3.42, mediaHeight: 2.61, installationKind: 'buddhist-work', accent: BUDDHIST_PALETTE.saffron}),
  layout({id: 'vasubandhu-mere-ideation', parentExhibitId: 'vasubandhu', zoneId: 'buddhist-abhidharma-yogacara', position: {x: 10.85, z: 0}, rotationY: -Math.PI / 2, assetId: 'vasubandhu-mere-ideation', mediaWidth: 3.58, mediaHeight: 1, installationKind: 'buddhist-work', accent: BUDDHIST_PALETTE.jade}),
  layout({id: 'buddhist-xuanzang-translation', parentExhibitId: 'buddhist-philosophy', zoneId: 'buddhist-transmission-reserve', position: {x: -10.85, z: 19.6}, rotationY: Math.PI / 2, assetId: 'buddhist-xuanzang-statue', mediaWidth: 2.22, mediaHeight: 3.33, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.saffron}),
  layout({id: 'buddhist-tibetan-pecha', parentExhibitId: 'buddhist-philosophy', zoneId: 'buddhist-transmission-reserve', position: {x: 10.85, z: 19.6}, rotationY: -Math.PI / 2, assetId: 'buddhist-tibetan-pecha', mediaWidth: 3.58, mediaHeight: 1.08, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.lapis}),
  layout({id: 'buddhist-diamond-sutra', parentExhibitId: 'buddhist-philosophy', zoneId: 'buddhist-transmission-reserve', position: {x: 0, z: 27.38}, rotationY: Math.PI, assetId: 'buddhist-diamond-sutra-868', mediaWidth: 3.32, mediaHeight: 2, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.lotus}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getBuddhistSupplementalExhibit = (id: MuseumSupplementalExhibitId): MuseumSupplementalExhibit => {
  const record = BUDDHIST_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 08 supplemental exhibit ${id} is missing.`);
  return record;
};
