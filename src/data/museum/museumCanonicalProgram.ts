/**
 * The approved live intellectual program for the permanent Museum halls.
 *
 * This module deliberately contains curatorial/program data only. Physical transforms,
 * authored geometry, interpretations, and media provenance live in their own contracts.
 */

export const MUSEUM_PRESENTATION_TIERS = [
  'anchor-exhibit',
  'standard-individual-exhibit',
  'supporting-exhibit',
  'thematic-cluster-participant',
  'gallery-archive-or-study-wall-record',
] as const;

export type MuseumPresentationTier = (typeof MUSEUM_PRESENTATION_TIERS)[number];

export const MUSEUM_CANONICAL_HALL_IDS = [
  'mediterranean-beginnings-classical',
  'renaissance-humanism-new-method',
  'phenomenology-existence-embodiment',
  'analytic-traditions',
  'justice-democratic-reason',
  'core-questions-forum',
  'classical-south-asian-worlds',
  'buddhist-philosophies',
  'classical-chinese-traditions',
  'islamic-philosophical-worlds',
  'east-asian-continuities',
  'jewish-philosophy',
  'latin-christian-scholastic',
  'hellenistic-roman-ways',
  'late-antiquity-inheritance',
  'rationalism-mind-nature-system',
  'empiricism-science-political-order',
  'enlightenment-revolution-kant',
  'german-idealism-afterlives',
  'utility-liberty-history-capital',
  'faith-pessimism-life-value',
  'pragmatism-democratic-inquiry',
  'critique-power-deconstruction',
  'moral-life-practical-reason',
  'feminist-philosophies',
  'colonialism-race-liberation',
] as const;

export type MuseumCanonicalHallId = (typeof MUSEUM_CANONICAL_HALL_IDS)[number];

export const MUSEUM_LEGACY_HALL_IDS = [
  'ancient-greek',
  'renaissance-reason-revolution',
  'modernity-freedom-critique',
  'logic-language-science',
  'ethics-justice-political-life',
  'mind-consciousness-self',
] as const;

export type MuseumLegacyHallId = (typeof MUSEUM_LEGACY_HALL_IDS)[number];

export const MUSEUM_PLANNED_HALL_TITLES = {
  'core-questions-forum': 'Core Questions Forum',
  'mediterranean-beginnings-classical': 'Mediterranean Beginnings & Classical Athens',
  'hellenistic-roman-ways': 'Hellenistic & Roman Ways of Life',
  'late-antiquity-inheritance': 'Late Antiquity & Neoplatonic Inheritance',
  'classical-south-asian-worlds': 'Classical South Asia: Jain, Yoga, and Brahmanical Systems',
  'buddhist-philosophies': 'Buddhist Philosophies of Liberation and Knowledge',
  'classical-chinese-traditions': 'Warring States & Classical Chinese Traditions',
  'east-asian-continuities': 'Confucian Renewal & East Asian Continuities',
  'islamic-philosophical-worlds': 'Arabic & Islamic Philosophical Worlds',
  'jewish-philosophy': 'Jewish Philosophy in Arabic-Speaking & Mediterranean Worlds',
  'latin-christian-scholastic': 'Latin Christian & Scholastic Traditions',
  'renaissance-humanism-new-method': 'Renaissance, Political Order, and New Science',
  'rationalism-mind-nature-system': 'Rationalism: Mind, Nature, and System',
  'empiricism-science-political-order': 'Empiricism, Science, and Political Order',
  'enlightenment-revolution-kant': 'Enlightenment, Revolution, and Kant’s Critical Turn',
  'german-idealism-afterlives': 'German Idealism & Romantic Afterlives',
  'utility-liberty-history-capital': 'Utility, Liberty, History, and Capital',
  'faith-pessimism-life-value': 'Faith, Pessimism, Life, and Value',
  'pragmatism-democratic-inquiry': 'Pragmatism, Science, and Democratic Inquiry',
  'analytic-traditions': 'Analytic Traditions: Logic, Language, and Analysis',
  'phenomenology-existence-embodiment': 'Phenomenology, Existence, and Embodiment',
  'critique-power-deconstruction': 'Critique, Power, and Deconstruction',
  'moral-life-practical-reason': 'Moral Life & Practical Reason',
  'justice-democratic-reason': 'Political Action, Justice, and Democratic Reason',
  'feminist-philosophies': 'Feminist Philosophies',
  'colonialism-race-liberation': 'Colonialism, Race, and Liberation',
} as const;

export type MuseumPlannedHallId = keyof typeof MUSEUM_PLANNED_HALL_TITLES;

export const MUSEUM_CANONICAL_ROOM_IDS = [
  'med-orientation-nature',
  'med-being-change-plurality',
  'med-sophists-socratic',
  'med-plato-aristotle',
  'early-statecraft-republic',
  'early-experiment-method',
  'early-sovereignty-materialism',
  'phenomenology-method',
  'phenomenology-being-embodiment',
  'existentialism-freedom',
  'existentialism-situated-absurd',
  'phenomenology-interpretation-alterity',
  'analytic-origins-foundations',
  'analytic-common-sense-metaethics',
  'analytic-wittgenstein',
  'analytic-naturalism',
  'analytic-action-intention',
  'justice-political-orientation',
  'justice-distribution-rights',
  'justice-capabilities-democracy',
  'core-reality-being',
  'core-knowledge',
  'core-mind-self',
  'core-logic-language',
  'core-science',
  'core-ethics-portal',
  'core-political-portal',
  'core-aesthetics',
  'core-religion',
  'south-orientation-many-schools',
  'south-jain-worlds',
  'south-categories-realism',
  'south-yoga-mind-liberation',
  'south-vedanta-rival-readings',
  'buddhist-many-paths',
  'buddhist-madhyamaka',
  'buddhist-abhidharma-yogacara',
  'buddhist-pramana',
  'buddhist-transmission-reserve',
  'china-many-ways',
  'china-confucian-cultivation',
  'china-daoist-way',
  'china-mohist-fa',
  'islamic-translation-falsafa',
  'islamic-avicennan-system',
  'islamic-kalam-critique',
  'islamic-andalusian-worlds',
  'islamic-post-avicennian',
  'east-song-ming-confucian',
  'east-buddhist-daoist-transmissions',
  'east-regional-continuities-reserve',
  'jewish-reason-revelation',
  'jewish-maimonidean-crossroads',
  'latin-transmission-carolingian',
  'latin-dialectic-early-scholastic',
  'latin-high-scholastic',
  'latin-late-debates',
  'hell-cynic-way',
  'hell-epicurean-garden',
  'hell-stoic-stoa',
  'hell-skeptical-lineages',
  'late-neoplatonic-systems',
  'late-christian-platonisms',
  'late-commentary-transmission',
  'rationalism-cartesian-foundations',
  'rationalism-spinoza-conway',
  'rationalism-leibniz-system',
  'empiricism-locke-ideas-rights',
  'empiricism-berkeley-perception',
  'empiricism-hume-skepticism',
  'enlightenment-law-institutions',
  'enlightenment-society-freedom',
  'enlightenment-sentiment-commerce',
  'enlightenment-equality-education',
  'enlightenment-kant-critical',
  'german-idealism-orientation',
  'german-idealism-nature',
  'german-idealism-hegel',
  'german-idealism-afterlives-room',
  'nineteenth-utilitarian-reform',
  'nineteenth-liberty-equality',
  'nineteenth-labor-capital',
  'nineteenth-social-transformations',
  'nineteenth-will-pessimism',
  'nineteenth-faith-subjectivity',
  'nineteenth-genealogy-value',
  'pragmatism-peirce-inquiry',
  'pragmatism-james-experience',
  'pragmatism-dewey-democracy',
  'pragmatism-continuities-reserve',
  'continental-orientation',
  'critique-genealogy-power',
  'critique-deconstruction',
  'critique-critical-theory',
  'moral-ethics-orientation',
  'moral-character-virtue',
  'moral-duty-consequence',
  'moral-rights-persons-futures',
  'feminist-orientation-genealogies',
  'feminist-early-genealogies',
  'feminist-situated-freedom',
  'feminist-gender-norms',
  'colonial-embodiment-liberation',
  'colonial-black-feminism-abolition',
  'colonial-context-reserve',
] as const;

export type MuseumCanonicalRoomId = (typeof MUSEUM_CANONICAL_ROOM_IDS)[number];
export type MuseumCanonicalTemplateId = 'standard-rect' | 'sequence-3' | 'crossroads-4';
export type MuseumCanonicalWingId =
  | 'wing-core-questions'
  | 'wing-mediterranean-antiquity'
  | 'wing-early-modern-enlightenment'
  | 'wing-nineteenth-transformations'
  | 'wing-modern-traditions'
  | 'wing-ethics-politics-society'
  | 'wing-south-asian-worlds'
  | 'wing-buddhist-worlds'
  | 'wing-east-asian-worlds'
  | 'wing-medieval-connected-worlds';
export type MuseumCanonicalEntityKind = 'philosopher' | 'branch';

export type MuseumCanonicalRoomComparison = {
  targetHallId: MuseumCanonicalHallId;
  targetRoomId: MuseumCanonicalRoomId;
  targetExhibitId?: string;
  relationType: 'comparison';
  rationale: string;
};

export type MuseumCanonicalExhibit = {
  id: string;
  entityKind: MuseumCanonicalEntityKind;
  entityId: string;
  displayName: string;
  tier: MuseumPresentationTier;
  question: string;
  secondaryHallIds: readonly MuseumPlannedHallId[];
  roomComparisons?: readonly MuseumCanonicalRoomComparison[];
  formerHallId?: MuseumLegacyHallId;
  principalAssetId?: string;
  supportingAssetIds?: readonly string[];
};

/**
 * A named comparative presence in a Forum room. Lenses are routes to a
 * thinker’s historically defensible primary home, never duplicate primary
 * installations or claims that the thinker belongs to a modern field.
 */
export type MuseumCanonicalRoomLens = {
  id: string;
  entityId: string;
  displayName: string;
  culturalSetting: string;
  primaryHallId: MuseumPlannedHallId;
  rationale: string;
};

export type MuseumCanonicalRoom = {
  id: MuseumCanonicalRoomId;
  title: string;
  recordCapacity: number;
  exhibits: readonly MuseumCanonicalExhibit[];
  comparativeLenses?: readonly MuseumCanonicalRoomLens[];
};

export type MuseumCanonicalHall = {
  id: MuseumCanonicalHallId;
  wingId: MuseumCanonicalWingId;
  title: string;
  templateId: MuseumCanonicalTemplateId;
  period: string;
  description: string;
  recordCapacity: number;
  rooms: readonly MuseumCanonicalRoom[];
};

/**
 * Gallery numbers are stable release identities, not array indexes or physical
 * visit positions.
 */
export const MUSEUM_PUBLIC_GALLERY_NUMBERS = {
  'mediterranean-beginnings-classical': 1,
  'renaissance-humanism-new-method': 2,
  'phenomenology-existence-embodiment': 3,
  'analytic-traditions': 4,
  'justice-democratic-reason': 5,
  'core-questions-forum': 6,
  'classical-south-asian-worlds': 7,
  'buddhist-philosophies': 8,
  'classical-chinese-traditions': 9,
  'islamic-philosophical-worlds': 10,
  'east-asian-continuities': 11,
  'jewish-philosophy': 12,
  'latin-christian-scholastic': 13,
  'hellenistic-roman-ways': 14,
  'late-antiquity-inheritance': 15,
  'rationalism-mind-nature-system': 16,
  'empiricism-science-political-order': 17,
  'enlightenment-revolution-kant': 18,
  'german-idealism-afterlives': 19,
  'utility-liberty-history-capital': 20,
  'faith-pessimism-life-value': 21,
  'pragmatism-democratic-inquiry': 22,
  'critique-power-deconstruction': 23,
  'moral-life-practical-reason': 24,
  'feminist-philosophies': 25,
  'colonialism-race-liberation': 26,
} as const satisfies Readonly<Record<MuseumCanonicalHallId, number>>;

const exhibit = <const Record extends MuseumCanonicalExhibit>(record: Record) => ({
  ...record,
  supportingAssetIds: record.supportingAssetIds ?? [],
});

export const MUSEUM_CANONICAL_PROGRAM = [
  {
    id: 'mediterranean-beginnings-classical',
    wingId: 'wing-mediterranean-antiquity',
    title: 'Mediterranean Beginnings & Classical Athens',
    templateId: 'sequence-3',
    period: 'Late 7th–4th centuries BCE',
    description: 'Trace Ionian natural explanation, disputes over being and change, civic argument, and the institutional worlds of Socrates, Plato, and Aristotle.',
    recordCapacity: 26,
    rooms: [
      {
        id: 'med-orientation-nature',
        title: 'Orientation, Ionia, and natural explanation',
        recordCapacity: 5,
        exhibits: [
          exhibit({id: 'ancient-greek', entityKind: 'branch', entityId: 'ancient-greek', displayName: 'Ancient Greek Philosophy', tier: 'supporting-exhibit', question: 'How should this particular Mediterranean history be situated without treating it as philosophy’s universal beginning?', secondaryHallIds: ['core-questions-forum', 'moral-life-practical-reason', 'hellenistic-roman-ways', 'late-antiquity-inheritance'], principalAssetId: 'ancient-greek-colonization-map'}),
          exhibit({id: 'thales', entityKind: 'philosopher', entityId: 'thales', displayName: 'Thales', tier: 'standard-individual-exhibit', question: 'Thales is remembered through later reports as a Milesian thinker who sought natural explanations and treated water as a basic principle. Enter to examine what the evidence supports and why later histories made him foundational.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'thales-promptuarii-portrait'}),
          exhibit({id: 'anaximander', entityKind: 'philosopher', entityId: 'anaximander', displayName: 'Anaximander', tier: 'standard-individual-exhibit', question: 'Anaximander is credited with explaining cosmic order through the indefinite or boundless. Enter to distinguish one surviving fragment from later reports about worlds, opposites, geography, weather, and life.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'anaximander-world-map'}),
          exhibit({id: 'anaximenes', entityKind: 'philosopher', entityId: 'anaximenes', displayName: 'Anaximenes', tier: 'supporting-exhibit', question: 'Anaximenes is remembered for making air the underlying principle and rarefaction and condensation the processes of change. Enter to see how later testimony preserves this economical model and limits what can be claimed.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'anaximenes-bnf-portrait'}),
        ],
      },
      {
        id: 'med-being-change-plurality',
        title: 'Number, being, change, plurality, and atomism',
        recordCapacity: 10,
        exhibits: [
          exhibit({id: 'pythagoras', entityKind: 'philosopher', entityId: 'pythagoras', displayName: 'Pythagoras', tier: 'standard-individual-exhibit', question: 'Pythagoras became the founding figure of communities joining a disciplined way of life to teachings about soul and cosmic order. Enter to separate the elusive teacher from later Pythagorean mathematics, doctrine, and legend.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'pythagoras-ratios-raphael'}),
          exhibit({id: 'philolaus', entityKind: 'philosopher', entityId: 'philolaus', displayName: 'Philolaus', tier: 'supporting-exhibit', question: 'Philolaus gave a distinctive account of limiters, unlimiteds, harmony, and number. Enter to see what his fragments support, what later testimony adds, and why his thought cannot simply be assigned to Pythagoras.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'philolaus-musical-pipes'}),
          exhibit({id: 'parmenides', entityKind: 'philosopher', entityId: 'parmenides', displayName: 'Parmenides', tier: 'standard-individual-exhibit', question: 'Parmenides used a fragmentary philosophical poem to test what coherent inquiry can think and say about what-is. Enter to explore its challenge to accounts of generation, difference, and change without reducing it to a slogan.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'parmenides-raphael-traditional'}),
          exhibit({id: 'zeno-elea', entityKind: 'philosopher', entityId: 'zeno-elea', displayName: 'Zeno of Elea', tier: 'standard-individual-exhibit', question: 'Zeno of Elea used paradoxical arguments to expose hidden commitments in ordinary accounts of plurality, magnitude, motion, place, and time. Enter to reconstruct arguments preserved through several later witnesses.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'zeno-elea-rijksmuseum-print'}),
          exhibit({id: 'leucippus', entityKind: 'philosopher', entityId: 'leucippus', displayName: 'Leucippus', tier: 'gallery-archive-or-study-wall-record', question: 'Leucippus is the earliest named Greek atomist in the main ancient tradition. Enter to examine how atoms and void answer problems of change—and why his contribution remains difficult to separate from Democritus.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'leucippus-giordano'}),
          exhibit({id: 'democritus', entityKind: 'philosopher', entityId: 'democritus', displayName: 'Democritus', tier: 'standard-individual-exhibit', question: 'Democritus developed atomist inquiry across nature, perception, knowledge, culture, and ethics. Enter to explore this lost corpus through fragments and testimony while keeping ancient atoms distinct from modern science.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'democritus-velazquez'}),
          exhibit({id: 'heraclitus', entityKind: 'philosopher', entityId: 'heraclitus', displayName: 'Heraclitus', tier: 'standard-individual-exhibit', question: 'Heraclitus survives in fragments and later reports, not in the slogan “everything flows.” Enter to explore how logos, fire, opposition, and measured change make conflict part of an intelligible world without forcing one uncontested system.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'heraclitus-va-bust'}),
          exhibit({id: 'empedocles', entityKind: 'philosopher', entityId: 'empedocles', displayName: 'Empedocles', tier: 'standard-individual-exhibit', question: 'Empedocles joined four enduring roots with Love and Strife, perception, and religious purification. Enter to see how surviving verse supports this remarkable project—and why its poem structure and cosmic cycle remain disputed.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'empedocles-met-print'}),
          exhibit({id: 'anaxagoras', entityKind: 'philosopher', entityId: 'anaxagoras', displayName: 'Anaxagoras', tier: 'standard-individual-exhibit', question: 'Anaxagoras explained differentiated things through universal mixture and relative separation, with an unmixed Nous beginning cosmic rotation. Enter to distinguish his fragments from later testimony and explore how much ordering Mind actually provides.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'anaxagoras-ribera'}),
        ],
      },
      {
        id: 'med-sophists-socratic',
        title: 'Sophists, civic speech, and Socratic inquiry',
        recordCapacity: 6,
        exhibits: [
          exhibit({id: 'protagoras', entityKind: 'philosopher', entityId: 'protagoras', displayName: 'Protagoras', tier: 'anchor-exhibit', question: 'Protagoras made human judgment, education, language, and civic competence central philosophical problems. Enter to distinguish his surviving formulations from the influential theories and speeches Plato builds around them.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'protagoras-ribera'}),
          exhibit({id: 'prodicus', entityKind: 'philosopher', entityId: 'prodicus', displayName: 'Prodicus of Ceos', tier: 'standard-individual-exhibit', question: 'Prodicus of Ceos was known for verbal distinctions and an ethical performance about Heracles choosing a life. Enter to see how Plato, Xenophon, and later witnesses preserve—and reshape—his teaching.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'prodicus-choice-of-hercules'}),
          exhibit({id: 'hippias-of-elis', entityKind: 'philosopher', entityId: 'hippias-of-elis', displayName: 'Hippias of Elis', tier: 'standard-individual-exhibit', question: 'Can broad learning and practical skill make a person self-sufficient?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'hippias-greek-strigil'}),
          exhibit({id: 'gorgias', entityKind: 'philosopher', entityId: 'gorgias', displayName: 'Gorgias', tier: 'anchor-exhibit', question: 'Gorgias of Leontini explored how speech shapes belief, feeling, evidence, and responsibility. Enter to compare his surviving speeches, the later summaries of On Not-Being, and Plato’s separate dramatic portrait.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'gorgias-ortolani'}),
          exhibit({id: 'socrates', entityKind: 'philosopher', entityId: 'socrates', displayName: 'Socrates', tier: 'anchor-exhibit', question: 'What does an examined life demand of us?', secondaryHallIds: ['moral-life-practical-reason'], formerHallId: 'ancient-greek', principalAssetId: 'socrates-louvre-head', supportingAssetIds: ['socrates-death-of-socrates']}),
        ],
      },
      {
        id: 'med-plato-aristotle',
        title: 'Plato, Aristotle, Academy, and Lyceum',
        recordCapacity: 5,
        exhibits: [
          exhibit({id: 'platonism', entityKind: 'branch', entityId: 'platonism', displayName: 'Platonism', tier: 'anchor-exhibit', question: 'How did Plato’s dialogues and Academy establish a changing philosophical lineage?', secondaryHallIds: ['core-questions-forum', 'justice-democratic-reason'], principalAssetId: 'platonism-academy-mosaic'}),
          exhibit({id: 'aristotelianism', entityKind: 'branch', entityId: 'aristotelianism', displayName: 'Aristotelianism', tier: 'anchor-exhibit', question: 'How did Aristotle’s methods become resources for many later intellectual worlds?', secondaryHallIds: ['core-questions-forum', 'islamic-philosophical-worlds', 'jewish-philosophy', 'latin-christian-scholastic', 'moral-life-practical-reason'], principalAssetId: 'aristotelianism-walters-teaching'}),
          exhibit({id: 'plato', entityKind: 'philosopher', entityId: 'plato', displayName: 'Plato', tier: 'anchor-exhibit', question: 'How can dialogue reorient knowledge, desire, and political judgment?', secondaryHallIds: ['core-questions-forum', 'justice-democratic-reason', 'late-antiquity-inheritance'], formerHallId: 'ancient-greek', principalAssetId: 'plato-capitoline-bust', supportingAssetIds: ['plato-school-of-athens']}),
          exhibit({id: 'aristotle', entityKind: 'philosopher', entityId: 'aristotle', displayName: 'Aristotle', tier: 'anchor-exhibit', question: 'How do causes, purposes, and habits make a life intelligible?', secondaryHallIds: ['core-questions-forum', 'islamic-philosophical-worlds', 'jewish-philosophy', 'justice-democratic-reason', 'latin-christian-scholastic', 'moral-life-practical-reason'], formerHallId: 'ancient-greek', principalAssetId: 'aristotle-altemps-bust', supportingAssetIds: ['aristotle-athenian-constitution-papyrus']}),
        ],
      },
    ],
  },
  {
    id: 'renaissance-humanism-new-method',
    wingId: 'wing-early-modern-enlightenment',
    title: 'Renaissance, Political Order, and New Science',
    templateId: 'sequence-3',
    period: '16th–17th centuries',
    description: 'Follow civic statecraft, experimental method, and rival accounts of sovereignty at the threshold of early modern philosophy.',
    recordCapacity: 6,
    rooms: [
      {id: 'early-statecraft-republic', title: 'Civic power and statecraft', recordCapacity: 2, exhibits: [
        exhibit({id: 'machiavelli', entityKind: 'philosopher', entityId: 'machiavelli', displayName: 'Machiavelli', tier: 'anchor-exhibit', question: 'What does political judgment require when ideals and power diverge?', secondaryHallIds: ['justice-democratic-reason'], formerHallId: 'renaissance-reason-revolution', principalAssetId: 'machiavelli-santi-di-tito'}),
        exhibit({id: 'ficino', entityKind: 'philosopher', entityId: 'ficino', displayName: 'Marsilio Ficino and the Work of Recovery', tier: 'anchor-exhibit', question: 'How does translation become a philosophical act that changes what a culture can think?', secondaryHallIds: ['late-antiquity-inheritance', 'latin-christian-scholastic'], principalAssetId: 'ficino-nga-medal-1499'}),
      ]},
      {id: 'early-experiment-method', title: 'Experiment, method, and organized inquiry', recordCapacity: 2, exhibits: [
        exhibit({id: 'bacon', entityKind: 'philosopher', entityId: 'bacon', displayName: 'Francis Bacon', tier: 'anchor-exhibit', question: 'How should organized observation and experiment reform inquiry?', secondaryHallIds: ['core-questions-forum', 'empiricism-science-political-order'], principalAssetId: 'francis-bacon-portrait-1617'}),
        exhibit({id: 'galileo', entityKind: 'philosopher', entityId: 'galileo', displayName: 'Galileo: Instruments, Evidence, and Authority', tier: 'anchor-exhibit', question: 'How can instrument-mediated observations earn authority when the instrument itself is disputed?', secondaryHallIds: ['core-questions-forum', 'empiricism-science-political-order'], principalAssetId: 'galileo-sustermans-portrait-1636'}),
      ]},
      {id: 'early-sovereignty-materialism', title: 'Sovereignty, covenant, and materialism', recordCapacity: 2, exhibits: [
        exhibit({id: 'hobbes', entityKind: 'philosopher', entityId: 'hobbes', displayName: 'Thomas Hobbes', tier: 'anchor-exhibit', question: 'Why would free people authorize a sovereign power?', secondaryHallIds: ['justice-democratic-reason'], formerHallId: 'renaissance-reason-revolution', principalAssetId: 'hobbes-wright-portrait'}),
      ]},
    ],
  },
  {
    id: 'phenomenology-existence-embodiment',
    wingId: 'wing-modern-traditions',
    title: 'Phenomenology, Existence, and Embodiment',
    templateId: 'sequence-3',
    period: '20th century',
    description: 'Move from intentionality and lifeworld through being-in-the-world, existential freedom, the absurd, interpretation, and alterity.',
    recordCapacity: 10,
    rooms: [
      {id: 'phenomenology-method', title: 'Intentionality, reduction, and lifeworld', recordCapacity: 2, exhibits: [
        exhibit({id: 'phenomenology', entityKind: 'branch', entityId: 'phenomenology', displayName: 'Phenomenology', tier: 'anchor-exhibit', question: 'How can disciplined description disclose the structures of experience?', secondaryHallIds: ['critique-power-deconstruction']}),
        exhibit({id: 'husserl', entityKind: 'philosopher', entityId: 'husserl', displayName: 'Husserl', tier: 'anchor-exhibit', question: 'How can careful description disclose the structures by which consciousness is directed toward a world?', secondaryHallIds: [], formerHallId: 'mind-consciousness-self', principalAssetId: 'husserl-portrait', supportingAssetIds: ['husserl-grossmann-seated-1920s']}),
      ]},
      {id: 'phenomenology-being-embodiment', title: 'Being-in-the-world, perception, and embodiment', recordCapacity: 2, exhibits: [
        exhibit({id: 'heidegger', entityKind: 'philosopher', entityId: 'heidegger', displayName: 'Heidegger', tier: 'anchor-exhibit', question: 'What does our practical involvement disclose about being?', secondaryHallIds: ['core-questions-forum', 'critique-power-deconstruction'], formerHallId: 'modernity-freedom-critique', principalAssetId: 'heidegger-pragher-portrait-1960', supportingAssetIds: ['heidegger-pragher-lecture-1954']}),
        exhibit({id: 'merleau-ponty', entityKind: 'philosopher', entityId: 'merleau-ponty', displayName: 'Maurice Merleau-Ponty', tier: 'standard-individual-exhibit', question: 'How does the lived body open a meaningful world before reflective thought?', secondaryHallIds: ['critique-power-deconstruction'], formerHallId: 'mind-consciousness-self', principalAssetId: 'merleau-ponty-portrait', supportingAssetIds: ['merleau-marey-motion-study']}),
      ]},
      {id: 'existentialism-freedom', title: 'Existentialism: freedom, facticity, and bad faith', recordCapacity: 2, exhibits: [
        exhibit({id: 'existentialism', entityKind: 'branch', entityId: 'existentialism', displayName: 'Existentialism', tier: 'anchor-exhibit', question: 'How do freedom and responsibility take shape within concrete situations?', secondaryHallIds: ['critique-power-deconstruction', 'faith-pessimism-life-value', 'hellenistic-roman-ways', 'moral-life-practical-reason'], principalAssetId: 'existentialism-munch-karl-johan'}),
        exhibit({id: 'sartre', entityKind: 'philosopher', entityId: 'sartre', displayName: 'Jean-Paul Sartre', tier: 'anchor-exhibit', question: 'What responsibility follows from freedom without a fixed essence?', secondaryHallIds: ['critique-power-deconstruction'], formerHallId: 'modernity-freedom-critique', principalAssetId: 'sartre-anefo-1965', supportingAssetIds: ['sartre-beauvoir-balzac']}),
      ]},
      {id: 'existentialism-situated-absurd', title: 'Situated freedom, ambiguity, the absurd, and revolt', recordCapacity: 2, exhibits: [
        exhibit({id: 'camus', entityKind: 'philosopher', entityId: 'camus', displayName: 'Albert Camus', tier: 'standard-individual-exhibit', question: 'How can revolt answer a world that offers no final guarantee?', secondaryHallIds: ['justice-democratic-reason', 'colonialism-race-liberation'], formerHallId: 'modernity-freedom-critique', principalAssetId: 'camus-loc-1957', supportingAssetIds: ['camus-combat-1943']}),
      ]},
      {id: 'phenomenology-interpretation-alterity', title: 'Interpretation, tradition, alterity, and responsibility', recordCapacity: 2, exhibits: [
        exhibit({id: 'levinas', entityKind: 'philosopher', entityId: 'levinas', displayName: 'Emmanuel Levinas', tier: 'standard-individual-exhibit', question: 'What ethical demand arrives in the encounter with another person?', secondaryHallIds: ['critique-power-deconstruction', 'moral-life-practical-reason'], principalAssetId: 'levinas-ettinger-portrait-1991'}),
        exhibit({id: 'gadamer', entityKind: 'philosopher', entityId: 'gadamer', displayName: 'Hans-Georg Gadamer', tier: 'standard-individual-exhibit', question: 'How do language, history, and tradition shape understanding?', secondaryHallIds: ['critique-power-deconstruction'], principalAssetId: 'gadamer-ruuskanen-portrait-2000'}),
      ]},
    ],
  },
  {
    id: 'analytic-traditions',
    wingId: 'wing-modern-traditions',
    title: 'Analytic Traditions: Logic, Language, and Analysis',
    templateId: 'sequence-3',
    period: 'Late 19th–20th centuries',
    description: 'Trace formal analysis, common-sense realism, ordinary language, naturalism, and theories of action across diverse analytic traditions.',
    recordCapacity: 7,
    rooms: [
      {id: 'analytic-origins-foundations', title: 'Origins in logic, analysis, and reference', recordCapacity: 3, exhibits: [
        exhibit({id: 'analytic-philosophy', entityKind: 'branch', entityId: 'analytic-philosophy', displayName: 'Analytic Philosophy', tier: 'anchor-exhibit', question: 'How did logic and analysis become a diverse modern philosophical family?', secondaryHallIds: ['core-questions-forum', 'critique-power-deconstruction'], principalAssetId: 'analytic-founders-collage'}),
        exhibit({id: 'russell', entityKind: 'philosopher', entityId: 'russell', displayName: 'Bertrand Russell', tier: 'standard-individual-exhibit', question: 'Can logical analysis reveal what our sentences commit us to?', secondaryHallIds: ['core-questions-forum'], formerHallId: 'logic-language-science', principalAssetId: 'russell-portrait-1894', supportingAssetIds: ['russell-on-denoting-1905']}),
        exhibit({id: 'frege', entityKind: 'philosopher', entityId: 'frege', displayName: 'Gottlob Frege', tier: 'anchor-exhibit', question: 'How can logical form clarify number, reference, and the difference between sense and object?', secondaryHallIds: ['core-questions-forum'], formerHallId: 'logic-language-science', principalAssetId: 'frege-portrait', supportingAssetIds: ['frege-begriffsschrift-1879']}),
      ]},
      {id: 'analytic-common-sense-metaethics', title: 'Common sense, realism, and metaethics', recordCapacity: 1, exhibits: [
        exhibit({id: 'g-e-moore', entityKind: 'philosopher', entityId: 'g-e-moore', displayName: 'G. E. Moore', tier: 'standard-individual-exhibit', question: 'Can analysis defend common sense and resist reducing goodness to a natural property?', secondaryHallIds: ['moral-life-practical-reason'], principalAssetId: 'moore-portrait-1914'}),
      ]},
      {id: 'analytic-wittgenstein', title: 'Wittgenstein: logical form, use, and therapy', recordCapacity: 1, exhibits: [
        exhibit({id: 'wittgenstein', entityKind: 'philosopher', entityId: 'wittgenstein', displayName: 'Wittgenstein', tier: 'anchor-exhibit', question: 'How do logical form and later language-games change the work of philosophy?', secondaryHallIds: ['core-questions-forum', 'moral-life-practical-reason'], principalAssetId: 'wittgenstein-naehr-1930'}),
      ]},
      {id: 'analytic-naturalism', title: 'Holism, naturalism, and ontology', recordCapacity: 1, exhibits: [
        exhibit({id: 'quine', entityKind: 'philosopher', entityId: 'quine', displayName: 'W. V. O. Quine', tier: 'standard-individual-exhibit', question: 'What changes when beliefs confront experience as an interconnected web?', secondaryHallIds: ['core-questions-forum'], formerHallId: 'logic-language-science', principalAssetId: 'quine-portrait', supportingAssetIds: ['quine-qualitative-sphere']}),
      ]},
      {id: 'analytic-action-intention', title: 'Action, intention, and ordinary language', recordCapacity: 1, exhibits: [
        exhibit({id: 'anscombe', entityKind: 'philosopher', entityId: 'anscombe', displayName: 'Elizabeth Anscombe', tier: 'standard-individual-exhibit', question: 'What distinguishes an intentional action from an event that merely happens through us?', secondaryHallIds: ['core-questions-forum', 'moral-life-practical-reason'], formerHallId: 'mind-consciousness-self', principalAssetId: 'anscombe-portrait-interpretive'}),
      ]},
    ],
  },
  {
    id: 'justice-democratic-reason',
    wingId: 'wing-ethics-politics-society',
    title: 'Political Action, Justice, and Democratic Reason',
    templateId: 'sequence-3',
    period: '20th–21st centuries',
    description: 'Stage disputes over public action, authority, distribution, rights, capabilities, dignity, and democratic justification.',
    recordCapacity: 6,
    rooms: [
      {id: 'justice-political-orientation', title: 'Political philosophy, authority, and public action', recordCapacity: 3, exhibits: [
        exhibit({id: 'political-philosophy', entityKind: 'branch', entityId: 'political-philosophy', displayName: 'Political Philosophy', tier: 'anchor-exhibit', question: 'What makes political power legitimate, contestable, and answerable to a public?', secondaryHallIds: ['moral-life-practical-reason'], principalAssetId: 'political-philosophy-good-government'}),
        exhibit({id: 'arendt', entityKind: 'philosopher', entityId: 'arendt', displayName: 'Hannah Arendt', tier: 'anchor-exhibit', question: 'What forms of public action, judgment, and shared world make political freedom possible?', secondaryHallIds: [], formerHallId: 'ethics-justice-political-life', principalAssetId: 'arendt-portrait-1933'}),
      ]},
      {id: 'justice-distribution-rights', title: 'Justice, distribution, rights, and the state', recordCapacity: 2, exhibits: [
        exhibit({id: 'rawls', entityKind: 'philosopher', entityId: 'rawls', displayName: 'John Rawls', tier: 'anchor-exhibit', question: 'Which principles would fairly situated citizens choose for their basic institutions?', secondaryHallIds: [], formerHallId: 'ethics-justice-political-life', principalAssetId: 'rawls-portrait'}),
        exhibit({id: 'nozick', entityKind: 'philosopher', entityId: 'nozick', displayName: 'Robert Nozick', tier: 'standard-individual-exhibit', question: 'When do individual rights constrain redistribution and the purposes of the state?', secondaryHallIds: [], formerHallId: 'ethics-justice-political-life', principalAssetId: 'nozick-portrait'}),
      ]},
      {id: 'justice-capabilities-democracy', title: 'Capabilities, dignity, democracy, and public reason', recordCapacity: 1, exhibits: [
        exhibit({id: 'martha-nussbaum', entityKind: 'philosopher', entityId: 'martha-nussbaum', displayName: 'Martha Nussbaum', tier: 'anchor-exhibit', question: 'What capabilities and conditions does a life of human dignity require?', secondaryHallIds: ['feminist-philosophies', 'moral-life-practical-reason'], principalAssetId: 'martha-nussbaum-portrait-2010'}),
      ]},
    ],
  },
  {
    id: 'core-questions-forum',
    wingId: 'wing-core-questions',
    title: 'Core Questions Forum',
    templateId: 'crossroads-4',
    period: 'Comparative routes across the collection',
    description: 'Use modern field anchors as a routing vocabulary while following named historical and cultural lenses outward to their primary intellectual homes.',
    recordCapacity: 25,
    rooms: [
      {id: 'core-reality-being', title: 'Reality & Being', recordCapacity: 4, exhibits: [
        exhibit({id: 'metaphysics', entityKind: 'branch', entityId: 'metaphysics', displayName: 'Metaphysics', tier: 'anchor-exhibit', question: 'What kinds of reality and explanation do philosophical systems propose?', secondaryHallIds: ['mediterranean-beginnings-classical', 'classical-south-asian-worlds', 'buddhist-philosophies', 'islamic-philosophical-worlds', 'rationalism-mind-nature-system', 'german-idealism-afterlives'], principalAssetId: 'metaphysics-reality-layers-interpretive'}),
        exhibit({id: 'ontology', entityKind: 'branch', entityId: 'ontology', displayName: 'Ontology', tier: 'anchor-exhibit', question: 'What does it mean to inquire into being without assigning that inquiry a single origin?', secondaryHallIds: ['mediterranean-beginnings-classical', 'classical-south-asian-worlds', 'buddhist-philosophies', 'islamic-philosophical-worlds', 'rationalism-mind-nature-system', 'german-idealism-afterlives', 'phenomenology-existence-embodiment'], principalAssetId: 'ontology-being-process-interpretive'}),
        exhibit({id: 'whitehead', entityKind: 'philosopher', entityId: 'whitehead', displayName: 'Alfred North Whitehead', tier: 'anchor-exhibit', question: 'What if reality is better understood through processes and relations than static substances?', secondaryHallIds: ['analytic-traditions'], principalAssetId: 'alfred-north-whitehead-portrait-1923'}),
      ], comparativeLenses: [
        {id: 'reality-aristotle', entityId: 'aristotle', displayName: 'Aristotle on substance and cause', culturalSetting: 'Classical Athens and the Lyceum', primaryHallId: 'mediterranean-beginnings-classical', rationale: 'A live historical route from modern field language to Aristotle’s distinct account of substance, form, matter, and explanation.'},
        {id: 'reality-kanada', entityId: 'kanada', displayName: 'Kaṇāda and Vaiśeṣika categories', culturalSetting: 'Classical South Asian intellectual worlds', primaryHallId: 'classical-south-asian-worlds', rationale: 'A named South Asian route to categories, substances, qualities, motion, and atomism without absorbing Vaiśeṣika into a modern Western field.'},
        {id: 'reality-mulla-sadra', entityId: 'mulla-sadra', displayName: 'Mulla Sadra on existence and change', culturalSetting: 'Safavid Islamic philosophy', primaryHallId: 'islamic-philosophical-worlds', rationale: 'A route to post-Avicennian debates over the primacy of existence and substantial motion in their Islamic philosophical setting.'},
      ]},
      {id: 'core-knowledge', title: 'Knowledge', recordCapacity: 2, exhibits: [
        exhibit({id: 'epistemology', entityKind: 'branch', entityId: 'epistemology', displayName: 'Epistemology', tier: 'anchor-exhibit', question: 'What makes cognition, testimony, inference, or experience warrant belief?', secondaryHallIds: ['empiricism-science-political-order', 'hellenistic-roman-ways', 'rationalism-mind-nature-system', 'classical-south-asian-worlds', 'buddhist-philosophies'], principalAssetId: 'epistemology-evidence-lens-interpretive'}),
      ], comparativeLenses: [
        {id: 'knowledge-dignaga', entityId: 'dignaga', displayName: 'Dignāga on perception and inference', culturalSetting: 'Buddhist pramāṇa traditions in South Asia', primaryHallId: 'buddhist-philosophies', rationale: 'A route to Buddhist debates over reliable cognition whose categories should not be treated as a local example of modern epistemology.'},
        {id: 'knowledge-dharmakirti', entityId: 'dharmakirti', displayName: 'Dharmakīrti on reliable cognition', culturalSetting: 'Buddhist scholastic philosophy', primaryHallId: 'buddhist-philosophies', rationale: 'A named route to Dharmakīrti’s arguments about perception, inference, language, and proof in the pramāṇa lineage.'},
      ]},
      {id: 'core-mind-self', title: 'Mind & Self', recordCapacity: 3, exhibits: [
        exhibit({id: 'philosophy-of-mind', entityKind: 'branch', entityId: 'philosophy-of-mind', displayName: 'Philosophy of Mind', tier: 'anchor-exhibit', question: 'How should mind, consciousness, embodiment, and selfhood be investigated?', secondaryHallIds: ['classical-south-asian-worlds', 'buddhist-philosophies', 'rationalism-mind-nature-system', 'phenomenology-existence-embodiment', 'analytic-traditions'], principalAssetId: 'philosophy-mind-subjective-objective-interpretive'}),
        exhibit({id: 'thomas-nagel', entityKind: 'philosopher', entityId: 'thomas-nagel', displayName: 'Thomas Nagel', tier: 'anchor-exhibit', question: 'How can an objective account include the subjective character of experience, and how should personal and impersonal standpoints be negotiated in reasons, moral luck, equality, war, legitimacy, and the meaning of life?', secondaryHallIds: ['justice-democratic-reason', 'moral-life-practical-reason'], formerHallId: 'mind-consciousness-self', principalAssetId: 'thomas-nagel-portrait', supportingAssetIds: ['thomas-nagel-teaching']}),
        exhibit({id: 'jiddu-krishnamurti', entityKind: 'philosopher', entityId: 'jiddu-krishnamurti', displayName: 'Jiddu Krishnamurti', tier: 'standard-individual-exhibit', question: 'Can attention disclose conditioning and psychological fear without relying on authority or a fixed path?', secondaryHallIds: ['classical-south-asian-worlds'], roomComparisons: [{targetHallId: 'core-questions-forum', targetRoomId: 'core-religion', targetExhibitId: 'philosophy-of-religion', relationType: 'comparison', rationale: 'Compare Krishnamurti’s critique of guru authority, organized allegiance, ritual dependence, and fixed paths with philosophical debates about religious belief, practice, experience, and institutions; this is criticism and comparison, not affiliation.'}], principalAssetId: 'jiddu-krishnamurti-bain-portrait', supportingAssetIds: ['jiddu-krishnamurti-besant-1927']}),
      ], comparativeLenses: [
        {id: 'mind-patanjali', entityId: 'patanjali', displayName: 'Patañjali and the Yoga Sūtra tradition', culturalSetting: 'Classical South Asian Yoga traditions', primaryHallId: 'classical-south-asian-worlds', rationale: 'A route to disciplined analyses of mind, affliction, practice, and liberation in a disputed textual and historical lineage—not membership for Krishnamurti or a generic wellness analogy.'},
        {id: 'mind-vasubandhu', entityId: 'vasubandhu', displayName: 'Vasubandhu on cognition and self', culturalSetting: 'Buddhist Abhidharma and Yogācāra debates', primaryHallId: 'buddhist-philosophies', rationale: 'A route to Buddhist arguments about cognition and continuity that preserves their liberation-oriented and scholastic contexts.'},
      ]},
      {id: 'core-logic-language', title: 'Logic & Language', recordCapacity: 3, exhibits: [
        exhibit({id: 'logic', entityKind: 'branch', entityId: 'logic', displayName: 'Logic', tier: 'anchor-exhibit', question: 'How do different traditions distinguish valid inference from error?', secondaryHallIds: ['analytic-traditions', 'mediterranean-beginnings-classical', 'buddhist-philosophies', 'classical-chinese-traditions', 'islamic-philosophical-worlds', 'latin-christian-scholastic'], principalAssetId: 'logic-hamilton-euler-diagrams-1874'}),
        exhibit({id: 'philosophy-of-language', entityKind: 'branch', entityId: 'philosophy-of-language', displayName: 'Philosophy of Language', tier: 'anchor-exhibit', question: 'How do words, signs, practices, and interpretations make meaning possible?', secondaryHallIds: ['analytic-traditions', 'mediterranean-beginnings-classical', 'buddhist-philosophies', 'classical-chinese-traditions', 'phenomenology-existence-embodiment'], principalAssetId: 'language-rosetta-stone-1922'}),
      ], comparativeLenses: [
        {id: 'logic-dignaga', entityId: 'dignaga', displayName: 'Dignāga on inference and exclusion', culturalSetting: 'Buddhist pramāṇa traditions in South Asia', primaryHallId: 'buddhist-philosophies', rationale: 'A route to inference and theories of meaning in Buddhist scholastic debate, not an assertion that Dignāga was an analytic philosopher.'},
        {id: 'logic-mozi', entityId: 'mozi', displayName: 'Mohist argument and the later Mohist Canons', culturalSetting: 'Warring States Chinese traditions', primaryHallId: 'classical-chinese-traditions', rationale: 'A Chinese route to standards, distinctions, names, and argument that resists presenting logic as cultureless or exclusively Greek-to-European.'},
      ]},
      {id: 'core-science', title: 'Science', recordCapacity: 5, exhibits: [
        exhibit({id: 'philosophy-of-science', entityKind: 'branch', entityId: 'philosophy-of-science', displayName: 'Philosophy of Science', tier: 'anchor-exhibit', question: 'How do methods, evidence, models, criticism, and historical change shape science?', secondaryHallIds: ['renaissance-humanism-new-method', 'empiricism-science-political-order', 'islamic-philosophical-worlds', 'pragmatism-democratic-inquiry', 'analytic-traditions'], principalAssetId: 'science-air-pump-wright-1768'}),
        exhibit({id: 'carnap', entityKind: 'philosopher', entityId: 'carnap', displayName: 'Rudolf Carnap', tier: 'standard-individual-exhibit', question: 'Which disputes can be clarified by choosing and constructing explicit linguistic frameworks?', secondaryHallIds: ['analytic-traditions'], formerHallId: 'logic-language-science', principalAssetId: 'carnap-portrait', supportingAssetIds: ['carnap-reichenbach-collection']}),
        exhibit({id: 'popper', entityKind: 'philosopher', entityId: 'popper', displayName: 'Karl Popper', tier: 'standard-individual-exhibit', question: 'How can bold theories remain answerable to tests that might refute them?', secondaryHallIds: [], formerHallId: 'logic-language-science', principalAssetId: 'popper-portrait-1987', supportingAssetIds: ['popper-alien-registration']}),
        exhibit({id: 'kuhn', entityKind: 'philosopher', entityId: 'kuhn', displayName: 'Thomas Kuhn', tier: 'anchor-exhibit', question: 'How do scientific communities move between normal inquiry and revolutionary change?', secondaryHallIds: [], formerHallId: 'logic-language-science', principalAssetId: 'kuhn-portrait-1977', supportingAssetIds: ['kuhn-structure-1962']}),
      ], comparativeLenses: [
        {id: 'science-bacon', entityId: 'bacon', displayName: 'Francis Bacon on organized inquiry', culturalSetting: 'Early modern Europe and new experimental programs', primaryHallId: 'renaissance-humanism-new-method', rationale: 'A live route to the historical reform of method without treating later philosophy of science as its inevitable destination.'},
        {id: 'science-avicenna', entityId: 'avicenna', displayName: 'Avicenna on demonstration and natural inquiry', culturalSetting: 'Arabic and Islamic philosophical worlds', primaryHallId: 'islamic-philosophical-worlds', rationale: 'A route to Avicennian logic, demonstration, medicine, and natural philosophy in an Islamic intellectual setting.'},
      ]},
      {id: 'core-ethics-portal', title: 'Ethics portal', recordCapacity: 2, exhibits: [], comparativeLenses: [
        {id: 'ethics-confucius', entityId: 'confucius', displayName: 'Confucius on ritual and humaneness', culturalSetting: 'Classical Confucian traditions', primaryHallId: 'classical-chinese-traditions', rationale: 'A route to ethical cultivation through ritual, relationship, and humaneness rather than a claim that the Analects instantiates a modern ethical theory.'},
        {id: 'ethics-mencius', entityId: 'mencius', displayName: 'Mencius on cultivation and human nature', culturalSetting: 'Warring States Confucian debates', primaryHallId: 'classical-chinese-traditions', rationale: 'A named route to arguments about moral sprouts, education, political responsibility, and human nature in their Confucian setting.'},
      ]},
      {id: 'core-political-portal', title: 'Political Life portal', recordCapacity: 2, exhibits: [], comparativeLenses: [
        {id: 'political-al-farabi', entityId: 'al-farabi', displayName: 'Al-Farabi on virtuous political order', culturalSetting: 'Arabic and Islamic philosophical worlds', primaryHallId: 'islamic-philosophical-worlds', rationale: 'An Islamic philosophical route to political knowledge, civic order, and the virtuous city.'},
        {id: 'political-maimonides', entityId: 'maimonides', displayName: 'Maimonides on law, authority, and interpretation', culturalSetting: 'Medieval Jewish philosophy in Arabic-speaking worlds', primaryHallId: 'jewish-philosophy', rationale: 'A Jewish philosophical route to law, communal authority, interpretation, and the relation between intellectual and political life.'},
      ]},
      {id: 'core-aesthetics', title: 'Aesthetics', recordCapacity: 2, exhibits: [
        exhibit({id: 'aesthetics', entityKind: 'branch', entityId: 'aesthetics', displayName: 'Aesthetics', tier: 'anchor-exhibit', question: 'How do art, beauty, form, expression, and judgment shape experience?', secondaryHallIds: ['moral-life-practical-reason', 'mediterranean-beginnings-classical', 'classical-chinese-traditions', 'enlightenment-revolution-kant', 'german-idealism-afterlives', 'faith-pessimism-life-value', 'pragmatism-democratic-inquiry'], principalAssetId: 'aesthetics-hokusai-great-wave'}),
      ], comparativeLenses: [
        {id: 'aesthetics-zhuangzi', entityId: 'zhuangzi', displayName: 'Zhuangzi on skill, transformation, and perspective', culturalSetting: 'Classical Daoist texts and reception', primaryHallId: 'classical-chinese-traditions', rationale: 'A Daoist route to skilled activity, transformation, language, and perspective without reducing the Zhuangzi to a modern theory of art.'},
        {id: 'aesthetics-confucius', entityId: 'confucius', displayName: 'Confucian ritual, music, and cultivation', culturalSetting: 'Classical Confucian traditions', primaryHallId: 'classical-chinese-traditions', rationale: 'A named route to the formative roles of ritual and music in ethical and political cultivation.'},
      ]},
      {id: 'core-religion', title: 'Philosophy of Religion', recordCapacity: 2, exhibits: [
        exhibit({id: 'philosophy-of-religion', entityKind: 'branch', entityId: 'philosophy-of-religion', displayName: 'Philosophy of Religion', tier: 'anchor-exhibit', question: 'How should philosophical inquiry approach religious belief, practice, experience, and authority?', secondaryHallIds: ['classical-south-asian-worlds', 'late-antiquity-inheritance', 'islamic-philosophical-worlds', 'jewish-philosophy', 'latin-christian-scholastic', 'enlightenment-revolution-kant'], principalAssetId: 'philosophy-religion-plural-inquiry-interpretive'}),
      ], comparativeLenses: [
        {id: 'religion-nagarjuna', entityId: 'nagarjuna', displayName: 'Nāgārjuna on emptiness and dependent arising', culturalSetting: 'Madhyamaka Buddhist traditions', primaryHallId: 'buddhist-philosophies', rationale: 'A Buddhist route whose arguments and liberative setting should not be collapsed into a generic debate over theism.'},
        {id: 'religion-al-ghazali', entityId: 'al-ghazali', displayName: 'Al-Ghazali on reason, revelation, and critique', culturalSetting: 'Islamic kalām, law, and philosophical reception', primaryHallId: 'islamic-philosophical-worlds', rationale: 'An Islamic route to critique and appropriation of philosophy within kalām, law, and religious practice.'},
        {id: 'religion-aquinas', entityId: 'aquinas', displayName: 'Aquinas on reason, revelation, and divine language', culturalSetting: 'Latin Christian scholastic traditions', primaryHallId: 'latin-christian-scholastic', rationale: 'A Latin scholastic route to arguments about God, analogy, creation, and the relation between philosophical and revealed theology.'},
      ]},
    ],
  },
  {
    id: 'classical-south-asian-worlds',
    wingId: 'wing-south-asian-worlds',
    title: 'Classical South Asia: Jain, Yoga, and Brahmanical Systems',
    templateId: 'sequence-3',
    period: 'c. 6th century BCE–14th century CE',
    description: 'Enter a plural field of Jain, Vaiśeṣika, Yoga, and Vedānta arguments about reality, mind, knowledge, discipline, and liberation without treating one system as the voice of all South Asian philosophy.',
    recordCapacity: 14,
    rooms: [
      {id: 'south-orientation-many-schools', title: 'Many schools, shared questions, and missing traditions', recordCapacity: 2, exhibits: [
        exhibit({id: 'indian-philosophy', entityKind: 'branch', entityId: 'indian-philosophy', displayName: 'Indian Philosophy: Many Schools, Contested Canons', tier: 'supporting-exhibit', question: 'How can a gallery orient visitors across many South Asian traditions without pretending to contain them all?', secondaryHallIds: ['buddhist-philosophies', 'core-questions-forum'], principalAssetId: 'south-many-schools-interpretive'}),
      ]},
      {id: 'south-jain-worlds', title: 'Jain worlds: soul, karma, nonviolence, and knowing', recordCapacity: 3, exhibits: [
        exhibit({id: 'jainism', entityKind: 'branch', entityId: 'jainism', displayName: 'Jain Philosophy', tier: 'anchor-exhibit', question: 'How do living souls become bound by karma, and how can disciplined nonviolence lead toward liberation?', secondaryHallIds: ['buddhist-philosophies', 'moral-life-practical-reason'], principalAssetId: 'jain-lokapurusha-cosmology'}),
        exhibit({id: 'mahavira', entityKind: 'philosopher', entityId: 'mahavira', displayName: 'Mahāvīra and the Jina Lineage', tier: 'anchor-exhibit', question: 'How did Mahāvīra reform and transmit a path whose lineage Jain traditions place before him?', secondaryHallIds: ['moral-life-practical-reason'], principalAssetId: 'mahavira-chandigarh-bust'}),
      ]},
      {id: 'south-categories-realism', title: 'Categories, atoms, and realist debate', recordCapacity: 2, exhibits: [
        exhibit({id: 'kanada', entityKind: 'philosopher', entityId: 'kanada', displayName: 'Kaṇāda and the Vaiśeṣika Tradition', tier: 'standard-individual-exhibit', question: 'Can categories of substance, quality, motion, and relation explain a world composed from enduring atoms?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'kanada-vaisesika-sutra-1793'}),
      ]},
      {id: 'south-yoga-mind-liberation', title: 'Yoga, mind, discipline, and liberation', recordCapacity: 2, exhibits: [
        exhibit({id: 'patanjali', entityKind: 'philosopher', entityId: 'patanjali', displayName: 'Patañjali and the Yoga Sūtra Tradition', tier: 'thematic-cluster-participant', question: 'How can disciplined practice still the fluctuations of mind and loosen the causes of suffering?', secondaryHallIds: ['core-questions-forum'], formerHallId: 'mind-consciousness-self', principalAssetId: 'patanjali-statue'}),
      ]},
      {id: 'south-vedanta-rival-readings', title: 'Vedānta: rival readings of self, world, and Brahman', recordCapacity: 5, exhibits: [
        exhibit({id: 'vedanta', entityKind: 'branch', entityId: 'vedanta', displayName: 'Vedānta: Rival Interpretations', tier: 'anchor-exhibit', question: 'How should Upaniṣadic claims about self, world, and Brahman be interpreted—and why do Vedānta schools disagree?', secondaryHallIds: ['buddhist-philosophies', 'core-questions-forum'], principalAssetId: 'vedanta-telugu-manuscript'}),
        exhibit({id: 'shankara', entityKind: 'philosopher', entityId: 'shankara', displayName: 'Śaṅkara and Advaita Vedānta', tier: 'anchor-exhibit', question: 'How can nondual Brahman be the deepest reality while ordinary plurality remains experientially powerful?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'shankara-ravi-varma'}),
        exhibit({id: 'ramanuja', entityKind: 'philosopher', entityId: 'ramanuja', displayName: 'Rāmānuja and Viśiṣṭādvaita', tier: 'standard-individual-exhibit', question: 'How can selves and the world be real modes of a unified Brahman rather than mere appearance?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'ramanuja-statue-cc0'}),
        exhibit({id: 'madhva', entityKind: 'philosopher', entityId: 'madhva', displayName: 'Madhva and Dvaita Vedānta', tier: 'standard-individual-exhibit', question: 'What follows if God, individual selves, and matter are irreducibly distinct?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'madhva-pajaka-vigraha'}),
      ]},
    ],
  },
  {
    id: 'buddhist-philosophies',
    wingId: 'wing-buddhist-worlds',
    title: 'Buddhist Philosophies of Liberation and Knowledge',
    templateId: 'sequence-3',
    period: 'c. 5th century BCE–8th century CE, with later transmission',
    description: 'Follow Buddhist philosophy from early teachings on suffering and no-self through Madhyamaka, Abhidharma, Yogācāra, and the pramāṇa traditions, while keeping later translation and material transmission visible.',
    recordCapacity: 13,
    rooms: [
      {id: 'buddhist-many-paths', title: 'Many Buddhist paths and early discourses', recordCapacity: 3, exhibits: [
        exhibit({id: 'buddhist-philosophy', entityKind: 'branch', entityId: 'buddhist-philosophy', displayName: 'Buddhist Philosophy: Many Paths of Liberation', tier: 'anchor-exhibit', question: 'How do suffering, impermanence, no-self, ethical discipline, meditation, and insight fit together across diverse Buddhist traditions?', secondaryHallIds: ['classical-south-asian-worlds', 'core-questions-forum', 'hellenistic-roman-ways', 'moral-life-practical-reason', 'east-asian-continuities'], principalAssetId: 'buddhist-wheel-life-dazu'}),
        exhibit({id: 'buddha', entityKind: 'philosopher', entityId: 'buddha', displayName: 'The Buddha and the Early Discourses', tier: 'anchor-exhibit', question: 'How can suffering cease through a path of ethical, meditative, and cognitive transformation?', secondaryHallIds: ['classical-south-asian-worlds'], principalAssetId: 'buddha-gandhara-meditating'}),
      ]},
      {id: 'buddhist-madhyamaka', title: 'Madhyamaka: emptiness and dependence', recordCapacity: 2, exhibits: [
        exhibit({id: 'nagarjuna', entityKind: 'philosopher', entityId: 'nagarjuna', displayName: 'Nāgārjuna and the Madhyamaka Tradition', tier: 'anchor-exhibit', question: 'What follows if things arise dependently and therefore lack an independent essence?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'nagarjuna-sichuan-thangka'}),
      ]},
      {id: 'buddhist-abhidharma-yogacara', title: 'Abhidharma to Yogacara', recordCapacity: 2, exhibits: [
        exhibit({id: 'vasubandhu', entityKind: 'philosopher', entityId: 'vasubandhu', displayName: 'Vasubandhu: Abhidharma and Yogācāra Debates', tier: 'standard-individual-exhibit', question: 'How should experience, cognition, continuity, and the apparent self be analyzed?', secondaryHallIds: ['core-questions-forum'], formerHallId: 'mind-consciousness-self', principalAssetId: 'vasubandhu-statue'}),
      ]},
      {id: 'buddhist-pramana', title: 'Pramāṇa, perception, inference, and language', recordCapacity: 4, exhibits: [
        exhibit({id: 'buddhist-epistemology', entityKind: 'branch', entityId: 'buddhist-epistemology', displayName: 'Buddhist Epistemology: Perception and Inference', tier: 'thematic-cluster-participant', question: 'What makes cognition reliable, and how do perception, inference, and language differ?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'buddhist-monastic-debate'}),
        exhibit({id: 'dignaga', entityKind: 'philosopher', entityId: 'dignaga', displayName: 'Dignāga: Foundations of Buddhist Logic', tier: 'anchor-exhibit', question: 'How can perception and inference become a disciplined account of reliable cognition?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'dignaga-teaching-logic-relief'}),
        exhibit({id: 'dharmakirti', entityKind: 'philosopher', entityId: 'dharmakirti', displayName: 'Dharmakīrti: Reliable Cognition and Proof', tier: 'standard-individual-exhibit', question: 'How do cognition, inference, language, and practical success bear on knowledge?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'dharmakirti-cleveland-silver'}),
      ]},
      {id: 'buddhist-transmission-reserve', title: 'Translation and transformation across Asia', recordCapacity: 2, exhibits: []},
    ],
  },
  {
    id: 'classical-chinese-traditions',
    wingId: 'wing-east-asian-worlds',
    title: 'Warring States & Classical Chinese Traditions',
    templateId: 'crossroads-4',
    period: '5th–3rd centuries BCE, with later transmission',
    description: 'Enter a contested Warring States field of ritual cultivation, argument over names and standards, Daoist transformation, Mohist ethics, and statecraft without turning adjacent debates into one school or treating later labels as timeless.',
    recordCapacity: 16,
    rooms: [
      {id: 'china-many-ways', title: 'Many ways in early China', recordCapacity: 2, exhibits: [
        exhibit({id: 'chinese-philosophy', entityKind: 'branch', entityId: 'chinese-philosophy', displayName: 'Classical Chinese Philosophy: Many Ways, Rival Standards', tier: 'supporting-exhibit', question: 'How did argument, teaching, ritual, warfare, and political change generate rival ways of ordering life and government?', secondaryHallIds: ['justice-democratic-reason', 'moral-life-practical-reason', 'east-asian-continuities'], principalAssetId: 'china-warring-states-bronze-vessel'}),
      ]},
      {id: 'china-confucian-cultivation', title: 'Ritual, humaneness, cultivation, and human nature', recordCapacity: 5, exhibits: [
        exhibit({id: 'confucianism', entityKind: 'branch', entityId: 'confucianism', displayName: 'Confucian Traditions: Ritual, Learning, and Cultivation', tier: 'anchor-exhibit', question: 'How can ritual, music, learning, and relationships cultivate humane persons and legitimate political order?', secondaryHallIds: ['justice-democratic-reason', 'moral-life-practical-reason', 'east-asian-continuities'], principalAssetId: 'china-confucian-apricot-altar'}),
        exhibit({id: 'confucius', entityKind: 'philosopher', entityId: 'confucius', displayName: 'Confucius and the Analects Tradition', tier: 'anchor-exhibit', question: 'How can ritual practice, learning, and humane attention transform persons and communities?', secondaryHallIds: ['moral-life-practical-reason'], principalAssetId: 'china-confucius-yuan-portrait'}),
        exhibit({id: 'mencius', entityKind: 'philosopher', entityId: 'mencius', displayName: 'Mencius: Moral Sprouts and Humane Government', tier: 'standard-individual-exhibit', question: 'What capacities for goodness require cultivation, and what does government owe the people?', secondaryHallIds: ['moral-life-practical-reason'], principalAssetId: 'china-mencius-yuan-portrait'}),
        exhibit({id: 'xunzi', entityKind: 'philosopher', entityId: 'xunzi', displayName: 'Xunzi: Deliberate Effort, Ritual, and Human Nature', tier: 'standard-individual-exhibit', question: 'How can deliberate learning and ritual reshape unruly dispositions into ethical and political order?', secondaryHallIds: ['moral-life-practical-reason'], principalAssetId: 'china-xunzi-qing-portrait'}),
      ]},
      {id: 'china-daoist-way', title: 'Daodejing, Zhuangzi, and the Way', recordCapacity: 4, exhibits: [
        exhibit({id: 'daoism', entityKind: 'branch', entityId: 'daoism', displayName: 'Daoist Traditions: Way, Transformation, and Skilled Living', tier: 'anchor-exhibit', question: 'How do texts associated with Daoist traditions unsettle fixed distinctions, coercive action, and rigid accounts of the good life?', secondaryHallIds: ['core-questions-forum', 'moral-life-practical-reason', 'east-asian-continuities'], principalAssetId: 'china-daoist-immortals-weiqi'}),
        exhibit({id: 'laozi', entityKind: 'philosopher', entityId: 'laozi', displayName: 'Laozi and the Daodejing Textual Persona', tier: 'thematic-cluster-participant', question: 'How should a layered text and uncertain authorial persona guide reflection on the Way, noncoercive action, and political order?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'china-laozi-daodejing-handscroll'}),
        exhibit({id: 'zhuangzi', entityKind: 'philosopher', entityId: 'zhuangzi', displayName: 'Zhuangzi: Perspective, Skill, and Transformation', tier: 'anchor-exhibit', question: 'What changes when language, identity, knowledge, and death are viewed through shifting perspectives?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'china-zhuangzi-hua-zuli-1326'}),
      ]},
      {id: 'china-mohist-fa', title: 'Mohist debate and fa/statecraft currents', recordCapacity: 5, exhibits: [
        exhibit({id: 'mohism', entityKind: 'branch', entityId: 'mohism', displayName: 'Mohism: Impartial Concern, Standards, and Argument', tier: 'anchor-exhibit', question: 'How can public standards test claims, guide action, oppose aggressive war, and promote inclusive concern?', secondaryHallIds: ['justice-democratic-reason', 'moral-life-practical-reason'], principalAssetId: 'china-mohist-crossbow-trigger'}),
        exhibit({id: 'legalism', entityKind: 'branch', entityId: 'legalism', displayName: 'Fa, Standards, and Statecraft—Later Grouped as “Legalism”', tier: 'thematic-cluster-participant', question: 'How did distinct arguments about law, administrative technique, authority, and power become retrospectively grouped under one label?', secondaryHallIds: ['justice-democratic-reason'], principalAssetId: 'china-qin-iron-weight'}),
        exhibit({id: 'mozi', entityKind: 'philosopher', entityId: 'mozi', displayName: 'Mozi and the Mohist Community', tier: 'standard-individual-exhibit', question: 'Why should benefit, practical standards, inclusive care, and opposition to aggression guide ethical and political judgment?', secondaryHallIds: ['moral-life-practical-reason'], principalAssetId: 'china-mozi-lost-article-slips'}),
        exhibit({id: 'han-feizi', entityKind: 'philosopher', entityId: 'han-feizi', displayName: 'Han Feizi: Fa, Administrative Technique, and Authority', tier: 'standard-individual-exhibit', question: 'How can institutions and publicly knowable standards constrain unreliable motives while strengthening rule?', secondaryHallIds: ['justice-democratic-reason'], principalAssetId: 'china-han-fei-modern-statue'}),
      ]},
    ],
  },
  {
    id: 'islamic-philosophical-worlds',
    wingId: 'wing-medieval-connected-worlds',
    title: 'Arabic & Islamic Philosophical Worlds',
    templateId: 'sequence-3',
    period: '9th–17th centuries',
    description: 'Follow the reconstruction of Greek learning in Arabic, the development and critique of falsafa, Andalusian arguments, illuminationist philosophy, and post-Avicennian continuities without reducing this multilingual field to a conduit toward Latin Europe.',
    recordCapacity: 14,
    rooms: [
      {id: 'islamic-translation-falsafa', title: 'Translation-era falsafa and classification of knowledge', recordCapacity: 4, exhibits: [
        exhibit({id: 'islamic-philosophy', entityKind: 'branch', entityId: 'islamic-philosophy', displayName: 'Arabic & Islamic Philosophy: Many Languages, Arguments, and Communities', tier: 'anchor-exhibit', question: 'How did translation, commentary, theology, science, and political life generate new philosophical arguments in Arabic and other languages?', secondaryHallIds: ['core-questions-forum', 'jewish-philosophy', 'latin-christian-scholastic'], principalAssetId: 'islamic-scholarly-lecture-maqamat'}),
        exhibit({id: 'al-kindi', entityKind: 'philosopher', entityId: 'al-kindi', displayName: 'Al-Kindi: Philosophy in an Arabic Intellectual World', tier: 'standard-individual-exhibit', question: 'How can inherited sciences be translated, tested, and redirected toward new questions?', secondaryHallIds: [], principalAssetId: 'al-kindi-cryptanalysis-manuscript'}),
        exhibit({id: 'al-farabi', entityKind: 'philosopher', entityId: 'al-farabi', displayName: 'Al-Farabi: Demonstration, Classification, and the Virtuous City', tier: 'standard-individual-exhibit', question: 'How do logic, metaphysics, and political philosophy fit within an ordered account of knowledge and human flourishing?', secondaryHallIds: ['justice-democratic-reason'], principalAssetId: 'al-farabi-metaphysics-bodleian'}),
      ]},
      {id: 'islamic-avicennan-system', title: 'Avicennian system: being, soul, logic, and science', recordCapacity: 2, exhibits: [
        exhibit({id: 'avicenna', entityKind: 'philosopher', entityId: 'avicenna', displayName: 'Avicenna: An Avicennian System of Knowledge', tier: 'anchor-exhibit', question: 'How can essence and existence, necessity and possibility, soul and body, and demonstration form one philosophical system?', secondaryHallIds: ['core-questions-forum', 'jewish-philosophy', 'latin-christian-scholastic'], principalAssetId: 'avicenna-pharmacy-wellcome'}),
      ]},
      {id: 'islamic-kalam-critique', title: 'Kalām, critique, and philosophical appropriation', recordCapacity: 2, exhibits: [
        exhibit({id: 'al-ghazali', entityKind: 'philosopher', entityId: 'al-ghazali', displayName: 'Al-Ghazali: Understanding Philosophy Before Critique', tier: 'anchor-exhibit', question: 'How can philosophical methods be appropriated while selected metaphysical conclusions are challenged?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'al-ghazali-gibran-1917'}),
      ]},
      {id: 'islamic-andalusian-worlds', title: 'Al-Andalus: philosophy, law, medicine, and commentary', recordCapacity: 3, exhibits: [
        exhibit({id: 'averroes', entityKind: 'philosopher', entityId: 'averroes', displayName: 'Averroes (Ibn Rushd): Demonstration and Interpretation', tier: 'anchor-exhibit', question: 'How should demonstrative philosophy, law, scripture, medicine, and Aristotle’s texts be interpreted together?', secondaryHallIds: ['jewish-philosophy', 'latin-christian-scholastic'], principalAssetId: 'averroes-wellcome-portrait'}),
        exhibit({id: 'ibn-tufayl', entityKind: 'philosopher', entityId: 'ibn-tufayl', displayName: 'Ibn Tufayl: Hayy ibn Yaqzan and the Education of Reason', tier: 'standard-individual-exhibit', question: 'What might an isolated human discover through experience, reflection, and disciplined transformation?', secondaryHallIds: [], principalAssetId: 'ibn-tufayl-hayy-1929'}),
      ]},
      {id: 'islamic-post-avicennian', title: 'Illumination and post-Avicennian Safavid continuities', recordCapacity: 3, exhibits: [
        exhibit({id: 'suhrawardi', entityKind: 'philosopher', entityId: 'suhrawardi', displayName: 'Suhrawardi: The Philosophy of Illumination', tier: 'standard-individual-exhibit', question: 'How can presence, light, and visionary knowledge redirect Avicennian philosophical questions?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'suhrawardi-later-portrait'}),
        exhibit({id: 'mulla-sadra', entityKind: 'philosopher', entityId: 'mulla-sadra', displayName: 'Mulla Sadra: Existence and Substantial Motion in Safavid Iran', tier: 'standard-individual-exhibit', question: 'What changes if existence is primary and substances themselves unfold through motion?', secondaryHallIds: ['core-questions-forum', 'rationalism-mind-nature-system'], principalAssetId: 'mulla-sadra-modern-statue'}),
      ]},
    ],
  },
  {
    id: 'east-asian-continuities',
    wingId: 'wing-east-asian-worlds',
    title: 'Confucian Renewal & East Asian Continuities',
    templateId: 'sequence-3',
    period: '6th–21st centuries',
    description: 'Follow Song–Ming Confucian reconstruction, the contested coexistence of Buddhist, Daoist, and Confucian institutions, and specific Korean, Japanese, Vietnamese, and modern continuities without treating East Asia as a single derivative tradition.',
    recordCapacity: 7,
    rooms: [
      {id: 'east-song-ming-confucian', title: 'Song-Ming Confucian reconstructions', recordCapacity: 3, exhibits: [
        exhibit({id: 'zhu-xi', entityKind: 'philosopher', entityId: 'zhu-xi', displayName: 'Zhu Xi: Pattern, Material Force, and the Architecture of Learning', tier: 'anchor-exhibit', question: 'How can study, investigation, ritual, and self-cultivation disclose an intelligible moral order?', secondaryHallIds: ['classical-chinese-traditions', 'core-questions-forum'], principalAssetId: 'zhu-xi-traditional-portrait'}),
        exhibit({id: 'wang-yangming', entityKind: 'philosopher', entityId: 'wang-yangming', displayName: 'Wang Yangming: Innate Knowing and the Unity of Knowledge and Action', tier: 'standard-individual-exhibit', question: 'What changes when moral knowledge is understood as already active within responsible judgment?', secondaryHallIds: ['classical-chinese-traditions', 'moral-life-practical-reason'], principalAssetId: 'wang-yangming-traditional-portrait'}),
      ]},
      {id: 'east-buddhist-daoist-transmissions', title: 'Buddhist translation, Daoist institutions, and the Three Teachings', recordCapacity: 2, exhibits: []},
      {id: 'east-regional-continuities-reserve', title: 'Korea, Japan, Vietnam, and modern continuities', recordCapacity: 2, exhibits: []},
    ],
  },
  {
    id: 'jewish-philosophy',
    wingId: 'wing-medieval-connected-worlds',
    title: 'Jewish Philosophy in Arabic-Speaking & Mediterranean Worlds',
    templateId: 'standard-rect',
    period: '9th century–modern continuities',
    description: 'Explore Jewish kalām, poetry, law, revelation, Judeo-Arabic intellectual culture, Maimonidean argument, translation, and later debate as a distinct Jewish intellectual history connected to—without being absorbed into—its Islamic, Arabic-speaking, and Mediterranean settings.',
    recordCapacity: 5,
    rooms: [
      {id: 'jewish-reason-revelation', title: 'Jewish kalām, poetry, law, reason, and revelation', recordCapacity: 3, exhibits: [
        exhibit({id: 'saadia-gaon', entityKind: 'philosopher', entityId: 'saadia-gaon', displayName: 'Saadia Gaon: Reason, Revelation, and Jewish Kalām', tier: 'standard-individual-exhibit', question: 'How can reasoned inquiry, transmitted revelation, law, language, and communal responsibility belong to one Jewish intellectual project?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'saadia-baqashah-geniza'}),
        exhibit({id: 'judah-halevi', entityKind: 'philosopher', entityId: 'judah-halevi', displayName: 'Judah Halevi: Poetry, Philosophy, and Covenant', tier: 'standard-individual-exhibit', question: 'What can poetry, embodied practice, transmitted history, and revelation show that demonstration alone cannot?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'judah-halevi-letter-geniza'}),
      ]},
      {id: 'jewish-maimonidean-crossroads', title: 'Maimonides: law, negative theology, and Aristotelian argument', recordCapacity: 2, exhibits: [
        exhibit({id: 'maimonides', entityKind: 'philosopher', entityId: 'maimonides', displayName: 'Maimonides: Law, Negative Theology, and Aristotelian Argument', tier: 'anchor-exhibit', question: 'How can law, disciplined interpretation, philosophical demonstration, and limits on divine language guide a perplexed reader?', secondaryHallIds: ['core-questions-forum', 'islamic-philosophical-worlds', 'latin-christian-scholastic'], principalAssetId: 'maimonides-mishnah-autograph'}),
      ]},
    ],
  },
  {
    id: 'latin-christian-scholastic',
    wingId: 'wing-medieval-connected-worlds',
    title: 'Latin Christian & Scholastic Traditions',
    templateId: 'sequence-3',
    period: '6th–14th centuries, with late-antique inheritances',
    description: 'Follow translation and reconstruction after Late Antiquity, the growth of dialectical and university practices, Aquinas’s connected intellectual world, and late-medieval disputes over universals, freedom, mystical theology, poverty, and political authority.',
    recordCapacity: 14,
    rooms: [
      {id: 'latin-transmission-carolingian', title: 'Late-antique transmission and Carolingian reception', recordCapacity: 3, exhibits: [
        exhibit({id: 'boethius', entityKind: 'philosopher', entityId: 'boethius', displayName: 'Boethius: Logic, Fortune, and a Double Transmission', tier: 'standard-individual-exhibit', question: 'How could one author reshape Greek logical learning in Latin and stage Philosophy as a guide through fortune, providence, and freedom?', secondaryHallIds: ['late-antiquity-inheritance'], principalAssetId: 'scholastic-boethius-miniature'}),
        exhibit({id: 'eriugena', entityKind: 'philosopher', entityId: 'eriugena', displayName: 'John Scotus Eriugena: Translation, Nature, and Return', tier: 'standard-individual-exhibit', question: 'How can translation, negative theology, and a dialogue about nature reconstruct Greek Christian sources in a Carolingian setting?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'scholastic-eriugena-stained-glass'}),
      ]},
      {id: 'latin-dialectic-early-scholastic', title: 'Monastic reason, dialectic, and early scholastic practice', recordCapacity: 4, exhibits: [
        exhibit({id: 'medieval-scholasticism', entityKind: 'branch', entityId: 'medieval-scholasticism', displayName: 'Scholasticism: Reading, Questioning, and Disputation', tier: 'anchor-exhibit', question: 'How did shared practices of reading authorities, posing questions, making distinctions, and disputing objections organize several rival intellectual projects?', secondaryHallIds: ['core-questions-forum', 'islamic-philosophical-worlds', 'jewish-philosophy'], principalAssetId: 'scholastic-university-lecture'}),
        exhibit({id: 'anselm', entityKind: 'philosopher', entityId: 'anselm', displayName: 'Anselm: Faith Seeking Understanding', tier: 'standard-individual-exhibit', question: 'How can prayer, conceptual analysis, freedom, truth, and reflection on divine necessity belong to one inquiry?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'scholastic-anselm-cur-deus-homo'}),
        exhibit({id: 'abelard', entityKind: 'philosopher', entityId: 'abelard', displayName: 'Peter Abelard: Dialectic, Intention, and Conflicting Authorities', tier: 'standard-individual-exhibit', question: 'What can disciplined contradiction reveal about language, universals, moral intention, and the interpretation of authorities?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'scholastic-abelard-heloise-manuscript'}),
      ]},
      {id: 'latin-high-scholastic', title: 'High university synthesis and contest', recordCapacity: 2, exhibits: [
        exhibit({id: 'aquinas', entityKind: 'philosopher', entityId: 'aquinas', displayName: 'Thomas Aquinas: Creation, Causation, Virtue, and Law', tier: 'anchor-exhibit', question: 'How can Aristotelian philosophy, Christian theology, and arguments inherited through Arabic and Jewish thinkers be transformed within a university synthesis?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'scholastic-aquinas-crivelli'}),
      ]},
      {id: 'latin-late-debates', title: 'Late scholastic alternatives, mysticism, and political conflict', recordCapacity: 5, exhibits: [
        exhibit({id: 'duns-scotus', entityKind: 'philosopher', entityId: 'duns-scotus', displayName: 'Duns Scotus: Univocity, Individuation, and Freedom', tier: 'standard-individual-exhibit', question: 'How can common concepts apply to God and creatures while each individual remains irreducibly this one?', secondaryHallIds: [], principalAssetId: 'scholastic-scotus-urbino'}),
        exhibit({id: 'ockham', entityKind: 'philosopher', entityId: 'ockham', displayName: 'William of Ockham: Mental Language, Signs, and Economy', tier: 'standard-individual-exhibit', question: 'How can theories of signs, supposition, cognition, and divine freedom work without multiplying explanatory entities?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'scholastic-ockham-logica'}),
        exhibit({id: 'meister-eckhart', entityKind: 'philosopher', entityId: 'meister-eckhart', displayName: 'Meister Eckhart: Intellect, Detachment, and Divine Birth', tier: 'standard-individual-exhibit', question: 'How do scholastic argument and vernacular preaching pursue detachment, intellect, and the relation between God and creatures?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'scholastic-eckhart-fragment'}),
        exhibit({id: 'marsilius-padua', entityKind: 'philosopher', entityId: 'marsilius-padua', displayName: 'Marsilius of Padua: Peace, Law, and Political Authority', tier: 'standard-individual-exhibit', question: 'Who has authority to legislate, coerce, appoint, and interpret when civic peace and claims of papal plenitude collide?', secondaryHallIds: ['justice-democratic-reason'], principalAssetId: 'scholastic-marsilius-defensor'}),
      ]},
    ],
  },
  {
    id: 'hellenistic-roman-ways',
    wingId: 'wing-mediterranean-antiquity',
    title: 'Hellenistic & Roman Ways of Life',
    templateId: 'crossroads-4',
    period: 'Late 5th century BCE–3rd century CE',
    description: 'Enter four rival practices of freedom: Cynic exposure of convention, Epicurean friendship and measured pleasure, Stoic disciplines of judgment and social duty, and Academic and Pyrrhonian ways of testing assent.',
    recordCapacity: 22,
    rooms: [
      {id: 'hell-cynic-way', title: 'Cynic challenge', recordCapacity: 4, exhibits: [
        exhibit({id: 'cynicism', entityKind: 'branch', entityId: 'cynicism', displayName: 'Cynicism: Freedom Against Convention', tier: 'anchor-exhibit', question: 'How much convention, property, reputation, and comfort must be refused to live freely?', secondaryHallIds: ['moral-life-practical-reason'], formerHallId: 'ancient-greek', principalAssetId: 'cynicism-alexander-and-diogenes'}),
        exhibit({id: 'antisthenes', entityKind: 'philosopher', entityId: 'antisthenes', displayName: 'Antisthenes', tier: 'supporting-exhibit', question: 'Antisthenes was a Socratic writer whose evidence spans ethics, literature, language, and logic. Enter to distinguish that varied record from the later, disputed story that made him the founder of Cynicism and teacher of Diogenes.', secondaryHallIds: ['moral-life-practical-reason'], principalAssetId: 'antisthenes-british-museum-bust'}),
        exhibit({id: 'diogenes', entityKind: 'philosopher', entityId: 'diogenes', displayName: 'Diogenes: Philosophy Performed in Public', tier: 'standard-individual-exhibit', question: 'What can shameless practice and frank speech expose about a city’s accepted values?', secondaryHallIds: [], principalAssetId: 'cynicism-diogenes-walters'}),
      ]},
      {id: 'hell-epicurean-garden', title: 'Epicurean Garden and Roman transmission', recordCapacity: 4, exhibits: [
        exhibit({id: 'epicureanism', entityKind: 'branch', entityId: 'epicureanism', displayName: 'Epicureanism: Pleasure Without Excess', tier: 'anchor-exhibit', question: 'Which desires, friendships, and explanations of nature free a life from needless disturbance?', secondaryHallIds: ['moral-life-practical-reason'], formerHallId: 'ancient-greek', principalAssetId: 'epicurean-garden-herculaneum-papyrus'}),
        exhibit({id: 'epicurus', entityKind: 'philosopher', entityId: 'epicurus', displayName: 'Epicurus: Friendship, Nature, and Tranquility', tier: 'anchor-exhibit', question: 'How can modest pleasure and understanding nature loosen fear of gods and death?', secondaryHallIds: ['moral-life-practical-reason'], principalAssetId: 'epicureanism-double-herm'}),
        exhibit({id: 'lucretius', entityKind: 'philosopher', entityId: 'lucretius', displayName: 'Lucretius: Epicurean Nature in Latin Verse', tier: 'standard-individual-exhibit', question: 'How can poetry make atomism a practical therapy against fear and superstition?', secondaryHallIds: [], principalAssetId: 'epicureanism-lucretius-manuscript'}),
      ]},
      {id: 'hell-stoic-stoa', title: 'Early system and Roman Stoa', recordCapacity: 8, exhibits: [
        exhibit({id: 'stoicism', entityKind: 'branch', entityId: 'stoicism', displayName: 'Stoicism: Logic, Nature, and the Work of Assent', tier: 'anchor-exhibit', question: 'How can reasoned judgment and social duty make freedom possible inside a causal world?', secondaryHallIds: ['buddhist-philosophies', 'moral-life-practical-reason'], formerHallId: 'ancient-greek', principalAssetId: 'stoicism-stoa-attalos'}),
        exhibit({id: 'zeno', entityKind: 'philosopher', entityId: 'zeno', displayName: 'Zeno of Citium: Beginning at the Stoa', tier: 'anchor-exhibit', question: 'How can virtue, nature, reason, and cosmopolitan community form one way of life?', secondaryHallIds: [], principalAssetId: 'stoicism-zeno-naples'}),
        exhibit({id: 'cleanthes', entityKind: 'philosopher', entityId: 'cleanthes', displayName: 'Cleanthes: Labor, Logos, and Cosmic Order', tier: 'supporting-exhibit', question: 'What does it mean to consent responsibly to an ordered cosmos?', secondaryHallIds: [], principalAssetId: 'cleanthes-olgiati-portrait'}),
        exhibit({id: 'chrysippus', entityKind: 'philosopher', entityId: 'chrysippus', displayName: 'Chrysippus: Building the Stoic System', tier: 'standard-individual-exhibit', question: 'How can logic, fate, responsibility, psychology, and ethics hold together?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'chrysippus-portrait-bust'}),
        exhibit({id: 'epictetus', entityKind: 'philosopher', entityId: 'epictetus', displayName: 'Epictetus: Training Judgment and Desire', tier: 'standard-individual-exhibit', question: 'Which judgments and commitments belong to us even when outcomes do not?', secondaryHallIds: [], principalAssetId: 'epictetus-enchiridion-frontispiece'}),
        exhibit({id: 'seneca', entityKind: 'philosopher', entityId: 'seneca', displayName: 'Seneca: Practicing Amid Wealth, Power, and Loss', tier: 'standard-individual-exhibit', question: 'Can an imperfect person practice philosophy within political compromise, anger, grief, and privilege?', secondaryHallIds: [], principalAssetId: 'seneca-pseudo-seneca-bm'}),
        exhibit({id: 'marcus-aurelius', entityKind: 'philosopher', entityId: 'marcus-aurelius', displayName: 'Marcus Aurelius: Private Exercises in Public Duty', tier: 'standard-individual-exhibit', question: 'How can attention to mortality, judgment, and common humanity guide action under pressure?', secondaryHallIds: [], principalAssetId: 'stoicism-marcus-aurelius-bust'}),
      ]},
      {id: 'hell-skeptical-lineages', title: 'Academic and Pyrrhonian skeptical lineages', recordCapacity: 6, exhibits: [
        exhibit({id: 'skepticism', entityKind: 'branch', entityId: 'skepticism', displayName: 'Ancient Skepticism: Rival Ways of Withholding Assent', tier: 'anchor-exhibit', question: 'How can disciplined opposition and suspension test dogmatism without becoming one more dogma?', secondaryHallIds: ['core-questions-forum', 'rationalism-mind-nature-system'], formerHallId: 'ancient-greek', principalAssetId: 'skepticism-adversus-mathematicos'}),
        exhibit({id: 'pyrrho', entityKind: 'philosopher', entityId: 'pyrrho', displayName: 'Pyrrho: A Life Reconstructed Through Later Reports', tier: 'supporting-exhibit', question: 'What can later testimony responsibly tell us about an early skeptical practice?', secondaryHallIds: [], principalAssetId: 'pyrrho-stanley-portrait'}),
        exhibit({id: 'arcesilaus', entityKind: 'philosopher', entityId: 'arcesilaus', displayName: 'Arcesilaus', tier: 'standard-individual-exhibit', question: 'Arcesilaus left no writings but made skeptical dialectic central to Plato’s Academy. Enter to see how he challenged Stoic certainty—and why reported arguments, suspension, and practical criteria do not form one secure personal doctrine.', secondaryHallIds: ['core-questions-forum', 'mediterranean-beginnings-classical'], principalAssetId: 'arcesilaus-carneades-academica'}),
        exhibit({id: 'carneades', entityKind: 'philosopher', entityId: 'carneades', displayName: 'Carneades', tier: 'standard-individual-exhibit', question: 'Carneades wrote nothing yet transformed skeptical argument across knowledge, ethics, theology, fate, and justice. Enter to explore persuasive appearances, action without certainty, and the difference between constructing a position and personally assenting to it.', secondaryHallIds: ['core-questions-forum', 'moral-life-practical-reason'], principalAssetId: 'carneades-louvre-bust'}),
        exhibit({id: 'sextus-empiricus', entityKind: 'philosopher', entityId: 'sextus-empiricus', displayName: 'Sextus Empiricus: Pyrrhonian Practice Preserved', tier: 'standard-individual-exhibit', question: 'How do equipollence and suspension change a person’s relation to unsettled claims?', secondaryHallIds: [], principalAssetId: 'skepticism-sextus-riedel'}),
      ]},
    ],
  },
  {
    id: 'late-antiquity-inheritance',
    wingId: 'wing-mediterranean-antiquity',
    title: 'Late Antiquity & Neoplatonic Inheritance',
    templateId: 'sequence-3',
    period: '3rd–6th centuries CE, with later transmission',
    description: 'Follow pagan Platonist systems of unity, intellect, soul, ritual, procession, and return; Christian transformations of Platonism; and the commentary and translation practices that carried late-antique arguments into several later intellectual worlds.',
    recordCapacity: 13,
    rooms: [
      {id: 'late-neoplatonic-systems', title: 'Plotinus and later pagan Platonisms', recordCapacity: 6, exhibits: [
        exhibit({id: 'neoplatonism', entityKind: 'branch', entityId: 'neoplatonism', displayName: 'Neoplatonism: A Modern Name for Late-Antique Platonisms', tier: 'anchor-exhibit', question: 'How can plurality depend on unity, and how can a soul return toward its source?', secondaryHallIds: ['core-questions-forum', 'islamic-philosophical-worlds', 'jewish-philosophy', 'latin-christian-scholastic', 'mediterranean-beginnings-classical'], formerHallId: 'ancient-greek', principalAssetId: 'late-neoplatonic-reader-sarcophagus'}),
        exhibit({id: 'plotinus', entityKind: 'philosopher', entityId: 'plotinus', displayName: 'Plotinus: The One, Intellect, Soul, and Return', tier: 'anchor-exhibit', question: 'How can all reality depend on a source beyond ordinary being and thought?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'neoplatonism-plotinus-ostia'}),
        exhibit({id: 'porphyry', entityKind: 'philosopher', entityId: 'porphyry', displayName: 'Porphyry', tier: 'standard-individual-exhibit', question: 'Porphyry was a philosopher, editor, commentator, teacher, and practical writer with an unevenly surviving corpus. Enter to encounter more than Plotinus’s editor or Christianity’s opponent: a Platonist who reordered several fields of inquiry.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'porphyry-plotinus-medieval'}),
        exhibit({id: 'iamblichus', entityKind: 'philosopher', entityId: 'iamblichus', displayName: 'Iamblichus', tier: 'standard-individual-exhibit', question: 'Iamblichus joined metaphysics, pedagogy, mathematics, Pythagorean formation, and theurgy. Enter to see why embodied souls might require divinely grounded ritual—and how the Abamon persona and fragmented transmission shape what can be reconstructed.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'iamblichus-protreptikos-manuscript'}),
        exhibit({id: 'proclus', entityKind: 'philosopher', entityId: 'proclus', displayName: 'Proclus', tier: 'standard-individual-exhibit', question: 'Proclus integrated systematic metaphysics with commentary, teaching, mathematics, hymns, prayer, and ritual. Enter to move beyond the Elements of Theology and see remaining, procession, and return within a complete philosophical way of life.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'proclus-platonic-theology-manuscript'}),
      ]},
      {id: 'late-christian-platonisms', title: 'Christian transformations of Platonism', recordCapacity: 5, exhibits: [
        exhibit({id: 'origen', entityKind: 'philosopher', entityId: 'origen', displayName: 'Origen', tier: 'standard-individual-exhibit', question: 'Origen joined scriptural scholarship with philosophical inquiry into God, freedom, embodiment, and restoration. Enter to trace a corpus divided among Greek originals, Latin translations, fragments, and hostile reports without confusing it with later Origenism.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'origen-schaftlarn-manuscript'}),
        exhibit({id: 'augustine', entityKind: 'philosopher', entityId: 'augustine', displayName: 'Augustine: Inwardness, Will, Evil, and Time', tier: 'anchor-exhibit', question: 'How do memory, desire, creation, grace, and responsibility transform Platonist ascent?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'augustine-lateran-fresco'}),
        exhibit({id: 'gregory-nyssa', entityKind: 'philosopher', entityId: 'gregory-nyssa', displayName: 'Gregory of Nyssa', tier: 'standard-individual-exhibit', question: 'Gregory of Nyssa connected divine infinity with embodied freedom and perpetual transformation toward the good. Enter to explore body, soul, virtue, resurrection, and the genuine dispute over whether his eschatology culminates in universal restoration.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'gregory-nyssa-mosaic'}),
        exhibit({id: 'pseudo-dionysius', entityKind: 'philosopher', entityId: 'pseudo-dionysius', displayName: 'Pseudo-Dionysius', tier: 'thematic-cluster-participant', question: 'Pseudo-Dionysius was an anonymous late-antique Christian, not the biblical convert whose name the author adopted. Enter to explore divine names, hierarchy, procession and return, apophatic unknowing, and the corpus’s transformed Byzantine and Latin afterlives.', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'pseudo-dionysius-opera-1556'}),
      ]},
      {id: 'late-commentary-transmission', title: 'Commentary, translation, and transmission', recordCapacity: 2, exhibits: []},
    ],
  },
  {
    id: 'rationalism-mind-nature-system',
    wingId: 'wing-early-modern-enlightenment',
    title: 'Rationalism: Mind, Nature, and System',
    templateId: 'sequence-3',
    period: '17th–early 18th centuries',
    description: 'Treat rationalism as a later historical grouping rather than a unified self-declared school: begin with Cartesian method and mind–body dualism, stage Spinoza and Conway as rival accounts of substance and living nature, and end with Leibniz’s monads, sufficient reason, and possible worlds.',
    recordCapacity: 7,
    rooms: [
      {id: 'rationalism-cartesian-foundations', title: 'Cartesian foundations and dualism', recordCapacity: 3, exhibits: [
        exhibit({id: 'rationalism', entityKind: 'branch', entityId: 'rationalism', displayName: 'Rationalism: A Later Family Name', tier: 'anchor-exhibit', question: 'What unites—and what separates—early-modern projects that gave reason, intelligible structure, and systematic explanation unusually ambitious roles?', secondaryHallIds: ['core-questions-forum', 'empiricism-science-political-order'], principalAssetId: 'rationalism-cartesian-vortices'}),
        exhibit({id: 'descartes', entityKind: 'philosopher', entityId: 'descartes', displayName: 'René Descartes: Method, Mind, and Mechanized Nature', tier: 'anchor-exhibit', question: 'Can methodic doubt secure a thinking self and a mathematical science of nature without leaving mind and body unintelligibly divided?', secondaryHallIds: ['core-questions-forum'], formerHallId: 'renaissance-reason-revolution', principalAssetId: 'rationalism-descartes-weenix'}),
      ]},
      {id: 'rationalism-spinoza-conway', title: 'Substance, vitality, God/Nature, and freedom', recordCapacity: 3, exhibits: [
        exhibit({id: 'spinoza', entityKind: 'philosopher', entityId: 'spinoza', displayName: 'Baruch Spinoza: Substance, Affects, and Freedom', tier: 'anchor-exhibit', question: 'What becomes of mind, body, God, nature, ethics, and freedom if there is only one infinite substance?', secondaryHallIds: ['core-questions-forum', 'jewish-philosophy'], formerHallId: 'renaissance-reason-revolution', principalAssetId: 'rationalism-spinoza-engraving'}),
        exhibit({id: 'anne-conway', entityKind: 'philosopher', entityId: 'anne-conway', displayName: 'Anne Conway: Living Substance Against Dualism', tier: 'standard-individual-exhibit', question: 'Can an entire created world be living, changeable, and spiritually continuous without collapsing creator and creatures?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'rationalism-conway-portrait'}),
      ]},
      {id: 'rationalism-leibniz-system', title: 'Monads, sufficient reason, and possible worlds', recordCapacity: 1, exhibits: [
        exhibit({id: 'leibniz', entityKind: 'philosopher', entityId: 'leibniz', displayName: 'Gottfried Wilhelm Leibniz: Monads, Reasons, and Possible Worlds', tier: 'standard-individual-exhibit', question: 'How can simple perceiving substances, complete concepts, sufficient reasons, and divine choice explain unity, change, and contingency?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'rationalism-leibniz-francke'}),
      ]},
    ],
  },
  {
    id: 'empiricism-science-political-order',
    wingId: 'wing-early-modern-enlightenment',
    title: 'Empiricism, Science, and Political Order',
    templateId: 'sequence-3',
    period: 'Late 17th–18th centuries',
    description: 'Follow experience from Locke’s account of ideas, identity, toleration, rights, and authority through Berkeley’s immaterialist reconstruction of perception to Hume’s analysis of causation, habit, sentiment, religion, and mitigated skepticism.',
    recordCapacity: 4,
    rooms: [
      {id: 'empiricism-locke-ideas-rights', title: 'Ideas, experience, identity, and rights', recordCapacity: 2, exhibits: [
        exhibit({id: 'empiricism', entityKind: 'branch', entityId: 'empiricism', displayName: 'Empiricism: Experience, Experiment, and Their Limits', tier: 'anchor-exhibit', question: 'How did experience become an early-modern source and test of ideas without making observation a simple, neutral transcript of the world?', secondaryHallIds: ['core-questions-forum', 'rationalism-mind-nature-system'], principalAssetId: 'empiricism-orrery-lecture-1766'}),
        exhibit({id: 'locke', entityKind: 'philosopher', entityId: 'locke', displayName: 'John Locke: Ideas, Persons, Rights, and Authority', tier: 'anchor-exhibit', question: 'How can experience ground knowledge while memory, toleration, property, government, and colonial power define—and strain—the boundaries of freedom?', secondaryHallIds: ['justice-democratic-reason'], formerHallId: 'renaissance-reason-revolution', principalAssetId: 'empiricism-locke-greenhill-portrait'}),
      ]},
      {id: 'empiricism-berkeley-perception', title: 'Perception and immaterialism', recordCapacity: 1, exhibits: [
        exhibit({id: 'berkeley', entityKind: 'philosopher', entityId: 'berkeley', displayName: 'George Berkeley: Vision, Ideas, Spirits, and Immaterialism', tier: 'standard-individual-exhibit', question: 'If sensible objects are collections of perceived ideas, what remains of matter, abstraction, causation, other minds, and an ordered world?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'empiricism-berkeley-smibert-portrait'}),
      ]},
      {id: 'empiricism-hume-skepticism', title: 'Causation, habit, sentiment, and mitigated skepticism', recordCapacity: 1, exhibits: [
        exhibit({id: 'hume', entityKind: 'philosopher', entityId: 'hume', displayName: 'David Hume: Habit, Sentiment, and the Limits of Experience', tier: 'anchor-exhibit', question: 'What justifies causal inference, personal identity, moral judgment, and religious belief when experience never displays necessary connection itself?', secondaryHallIds: ['core-questions-forum'], formerHallId: 'renaissance-reason-revolution', principalAssetId: 'hume-ramsay-portrait-1754'}),
      ]},
    ],
  },
  {
    id: 'enlightenment-revolution-kant',
    wingId: 'wing-early-modern-enlightenment',
    title: 'Enlightenment, Revolution, and Kant’s Critical Turn',
    templateId: 'crossroads-4',
    period: 'Late 17th–late 18th centuries',
    description: 'Compare law, civic freedom, moral sentiment, commercial society, education, gender, and revolution in four perimeter rooms, then cross a distinct central threshold where Kant turns the rationalist–empiricist crisis into a critical inquiry into the conditions and limits of reason.',
    recordCapacity: 6,
    rooms: [
      {id: 'enlightenment-law-institutions', title: 'Law and comparative institutions', recordCapacity: 1, exhibits: [
        exhibit({id: 'montesquieu', entityKind: 'philosopher', entityId: 'montesquieu', displayName: 'Montesquieu: Law, Comparison, and Institutional Power', tier: 'standard-individual-exhibit', question: 'How do laws and political forms depend on institutions, economy, custom, history, and place—and how can power be made to check power?', secondaryHallIds: ['justice-democratic-reason'], principalAssetId: 'enlightenment-montesquieu-versailles-portrait'}),
      ]},
      {id: 'enlightenment-society-freedom', title: 'Inequality, civic freedom, and education', recordCapacity: 1, exhibits: [
        exhibit({id: 'rousseau', entityKind: 'philosopher', entityId: 'rousseau', displayName: 'Jean-Jacques Rousseau: Inequality, Civic Freedom, and Education', tier: 'anchor-exhibit', question: 'Can people become free by obeying laws they prescribe together when social dependence and unequal institutions have already formed their desires?', secondaryHallIds: ['justice-democratic-reason'], formerHallId: 'renaissance-reason-revolution', principalAssetId: 'enlightenment-rousseau-ramsay-portrait'}),
      ]},
      {id: 'enlightenment-sentiment-commerce', title: 'Moral sentiments and commercial society', recordCapacity: 1, exhibits: [
        exhibit({id: 'adam-smith', entityKind: 'philosopher', entityId: 'adam-smith', displayName: 'Adam Smith: Sympathy, Judgment, Labor, and Commercial Society', tier: 'standard-individual-exhibit', question: 'How do spectatorship, institutions, labor, exchange, inequality, and empire shape both moral judgment and commercial life?', secondaryHallIds: ['justice-democratic-reason', 'moral-life-practical-reason'], principalAssetId: 'enlightenment-smith-wedgwood-medallion'}),
      ]},
      {id: 'enlightenment-equality-education', title: 'Education, gender, and excluded universalism', recordCapacity: 2, exhibits: [
        exhibit({id: 'mary-astell', entityKind: 'philosopher', entityId: 'mary-astell', displayName: 'Mary Astell: Reason, Education, and Freedom in Marriage', tier: 'standard-individual-exhibit', question: 'If women possess rational souls, how can denied education and subordination in marriage be defended without contradicting the era’s own standards of reason and freedom?', secondaryHallIds: ['feminist-philosophies', 'justice-democratic-reason'], principalAssetId: 'enlightenment-astell-serious-proposal-1694'}),
        exhibit({id: 'wollstonecraft', entityKind: 'philosopher', entityId: 'wollstonecraft', displayName: 'Mary Wollstonecraft: Education, Citizenship, and Manufactured Inequality', tier: 'anchor-exhibit', question: 'What becomes of universal rights when education and social expectations train women for dependence, appearance, and obedience rather than citizenship?', secondaryHallIds: ['feminist-philosophies', 'justice-democratic-reason'], formerHallId: 'ethics-justice-political-life', principalAssetId: 'enlightenment-wollstonecraft-heath-engraving'}),
      ]},
      {id: 'enlightenment-kant-critical', title: 'Kant: critical philosophy as threshold', recordCapacity: 1, exhibits: [
        exhibit({id: 'kant', entityKind: 'philosopher', entityId: 'kant', displayName: 'Immanuel Kant: The Conditions and Limits of Reason', tier: 'anchor-exhibit', question: 'What must cognition contribute for experience to be possible, and how can critique delimit knowledge while defending autonomy, obligation, and public reason?', secondaryHallIds: ['core-questions-forum', 'german-idealism-afterlives', 'justice-democratic-reason', 'moral-life-practical-reason'], formerHallId: 'renaissance-reason-revolution', principalAssetId: 'enlightenment-kant-doebler-portrait'}),
      ]},
    ],
  },
  {
    id: 'german-idealism-afterlives',
    wingId: 'wing-nineteenth-transformations',
    title: 'German Idealism & Romantic Afterlives',
    templateId: 'sequence-3',
    period: 'Late 18th–mid-19th centuries',
    description: 'Begin with the post-Kantian demand to explain self-conscious activity, follow Schelling’s philosophies of nature, art, identity, and freedom, enter Hegel’s accounts of recognition, history, and social freedom, and test the divergent afterlives of systematic idealism.',
    recordCapacity: 7,
    rooms: [
      {id: 'german-idealism-orientation', title: 'Post-Kantian self, activity, and freedom', recordCapacity: 3, exhibits: [
        exhibit({id: 'german-idealism', entityKind: 'branch', entityId: 'german-idealism', displayName: 'German Idealism: Critique Becomes System', tier: 'anchor-exhibit', question: 'How did post-Kantian thinkers turn the limits of critique into competing systems of self, nature, freedom, reason, and history?', secondaryHallIds: ['core-questions-forum', 'enlightenment-revolution-kant'], principalAssetId: 'german-idealism-kant-claessens-portrait'}),
        exhibit({id: 'fichte', entityKind: 'philosopher', entityId: 'fichte', displayName: 'Johann Gottlieb Fichte: Activity, Self-Positing, and Freedom', tier: 'standard-individual-exhibit', question: 'What if self-consciousness is not a thing we discover but an activity through which a world of obligation, resistance, and freedom becomes intelligible?', secondaryHallIds: [], principalAssetId: 'german-idealism-fichte-bury-1801'}),
      ]},
      {id: 'german-idealism-nature', title: 'Nature, identity, art, and freedom', recordCapacity: 1, exhibits: [
        exhibit({id: 'schelling', entityKind: 'philosopher', entityId: 'schelling', displayName: 'F. W. J. Schelling: Nature, Art, Identity, and Freedom', tier: 'standard-individual-exhibit', question: 'Can nature be understood as productive and self-organizing rather than as inert material—and can freedom include the real possibility of evil?', secondaryHallIds: [], principalAssetId: 'german-idealism-schelling-stieler-1835'}),
      ]},
      {id: 'german-idealism-hegel', title: 'History, recognition, social freedom, and system', recordCapacity: 1, exhibits: [
        exhibit({id: 'hegel', entityKind: 'philosopher', entityId: 'hegel', displayName: 'G. W. F. Hegel: Recognition, History, and Social Freedom', tier: 'anchor-exhibit', question: 'How can freedom become actual through conflict, recognition, institutions, and the historical revision of inadequate forms of life?', secondaryHallIds: ['critique-power-deconstruction'], principalAssetId: 'german-idealism-hegel-schlesinger-1831'}),
      ]},
      {id: 'german-idealism-afterlives-room', title: 'Divergent receptions and later arguments', recordCapacity: 2, exhibits: [
        exhibit({id: 'kantianism', entityKind: 'branch', entityId: 'kantianism', displayName: 'Kantianism', tier: 'anchor-exhibit', question: 'Kantianism examines the powers and limits of human reason, the conditions of knowledge, the basis of moral freedom, and the demands of judgment. Enter to see how those questions became a diverse philosophical tradition.', secondaryHallIds: ['enlightenment-revolution-kant', 'core-questions-forum'], principalAssetId: 'german-idealism-reinhold-rijksmuseum-1795'}),
      ]},
    ],
  },
  {
    id: 'utility-liberty-history-capital',
    wingId: 'wing-nineteenth-transformations',
    title: 'Utility, Liberty, History, and Capital',
    templateId: 'sequence-3',
    period: '19th century',
    description: 'Follow utilitarian reform from Bentham to Mill, test liberty against social and imperial power, and enter Marx’s critique of labor, commodities, capital, and collective transformation.',
    recordCapacity: 5,
    rooms: [
      {id: 'nineteenth-utilitarian-reform', title: 'Utility, law, reform, and individuality', recordCapacity: 2, exhibits: [
        exhibit({id: 'bentham', entityKind: 'philosopher', entityId: 'bentham', displayName: 'Jeremy Bentham: Utility, Law, and Institutional Reform', tier: 'standard-individual-exhibit', question: 'Can public institutions be judged and redesigned by the consequences they produce for pleasure, pain, security, and well-being?', secondaryHallIds: ['justice-democratic-reason', 'moral-life-practical-reason'], formerHallId: 'ethics-justice-political-life', principalAssetId: 'utility-bentham-auto-icon'}),
        exhibit({id: 'mill', entityKind: 'philosopher', entityId: 'mill', displayName: 'John Stuart Mill: Liberty, Character, and Social Progress', tier: 'anchor-exhibit', question: 'How can a consequentialist ethics defend individuality, qualitative goods, free discussion, equality, and experiments in living?', secondaryHallIds: ['justice-democratic-reason', 'moral-life-practical-reason'], formerHallId: 'ethics-justice-political-life', principalAssetId: 'utility-mill-watts-portrait'}),
      ]},
      {id: 'nineteenth-liberty-equality', title: 'Liberty, equality, and experiments in living', recordCapacity: 1, exhibits: []},
      {id: 'nineteenth-labor-capital', title: 'Labor, capital, class, and historical critique', recordCapacity: 1, exhibits: [
        exhibit({id: 'marx', entityKind: 'philosopher', entityId: 'marx', displayName: 'Karl Marx: Labor, Capital, and Historical Transformation', tier: 'anchor-exhibit', question: 'How do social relations created through labor confront people as commodities, capital, class power, and an apparently independent historical system?', secondaryHallIds: ['critique-power-deconstruction', 'justice-democratic-reason'], formerHallId: 'modernity-freedom-critique', principalAssetId: 'utility-marx-1861-beard-portrait'}),
      ]},
      {id: 'nineteenth-social-transformations', title: 'Political economy and social transformations', recordCapacity: 1, exhibits: [
        exhibit({id: 'marxism', entityKind: 'branch', entityId: 'marxism', displayName: 'Marxism', tier: 'anchor-exhibit', question: 'Marxism analyzes capitalism through labor, class, exploitation, and historical change while asking how collective action might transform social life. Enter to explore why its theories, movements, and political forms remain deeply contested.', secondaryHallIds: ['critique-power-deconstruction', 'justice-democratic-reason', 'colonialism-race-liberation'], principalAssetId: 'utility-marxism-zurich-congress-1893'}),
      ]},
    ],
  },
  {
    id: 'faith-pessimism-life-value',
    wingId: 'wing-nineteenth-transformations',
    title: 'Faith, Pessimism, Life, and Value',
    templateId: 'sequence-3',
    period: '19th century',
    description: 'Move from Schopenhauer’s metaphysics of representation and striving through Kierkegaard’s indirect communication and religious subjectivity to Nietzsche’s genealogy of values, nihilism, and experiments in affirmation.',
    recordCapacity: 3,
    rooms: [
      {id: 'nineteenth-will-pessimism', title: 'Will, representation, suffering, and reception', recordCapacity: 1, exhibits: [
        exhibit({id: 'schopenhauer', entityKind: 'philosopher', entityId: 'schopenhauer', displayName: 'Arthur Schopenhauer: Representation, Will, and Compassion', tier: 'standard-individual-exhibit', question: 'What if the ordered world of experience is representation while embodied striving discloses a restless will beneath it?', secondaryHallIds: ['buddhist-philosophies', 'classical-south-asian-worlds', 'core-questions-forum'], principalAssetId: 'value-schopenhauer-schaefer-portrait'}),
      ]},
      {id: 'nineteenth-faith-subjectivity', title: 'Faith, subjectivity, anxiety, and becoming a self', recordCapacity: 1, exhibits: [
        exhibit({id: 'kierkegaard', entityKind: 'philosopher', entityId: 'kierkegaard', displayName: 'Søren Kierkegaard: Choice, Anxiety, Faith, and the Self', tier: 'standard-individual-exhibit', question: 'How can a person become a self through choices and commitments that no detached philosophical system can make on that person’s behalf?', secondaryHallIds: ['core-questions-forum', 'phenomenology-existence-embodiment'], formerHallId: 'modernity-freedom-critique', principalAssetId: 'value-kierkegaard-copenhagen-portrait'}),
      ]},
      {id: 'nineteenth-genealogy-value', title: 'Genealogy, nihilism, life, and value creation', recordCapacity: 1, exhibits: [
        exhibit({id: 'nietzsche', entityKind: 'philosopher', entityId: 'nietzsche', displayName: 'Friedrich Nietzsche: Genealogy, Nihilism, and Affirmation', tier: 'anchor-exhibit', question: 'What histories of power, embodiment, resentment, and interpretation lie behind moral values—and what could it mean to create values after their authority collapses?', secondaryHallIds: ['critique-power-deconstruction', 'phenomenology-existence-embodiment'], formerHallId: 'modernity-freedom-critique', principalAssetId: 'value-nietzsche-1869-siebe-portrait'}),
      ]},
    ],
  },
  {
    id: 'pragmatism-democratic-inquiry',
    wingId: 'wing-modern-traditions',
    title: 'Pragmatism, Science, and Democratic Inquiry',
    templateId: 'sequence-3',
    period: 'Late 19th–21st centuries',
    description: 'Follow pragmatism from Peirce’s logic of signs and fallibilist inquiry through James’s pluralism and radical empiricism to Dewey’s experimental account of education, publics, democracy, and art, then confront the movement’s later continuities and exclusions.',
    recordCapacity: 6,
    rooms: [
      {id: 'pragmatism-peirce-inquiry', title: 'Peirce: signs, fallibilism, and public inquiry', recordCapacity: 2, exhibits: [
        exhibit({id: 'pragmatism', entityKind: 'branch', entityId: 'pragmatism', displayName: 'Pragmatism: Meaning Through Consequences and Inquiry', tier: 'anchor-exhibit', question: 'How can ideas earn meaning and credibility through their conceivable consequences, disciplined testing, and exposure to future correction?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'pragmatism-peirce-quincuncial-map-1879'}),
        exhibit({id: 'peirce', entityKind: 'philosopher', entityId: 'peirce', displayName: 'Charles Sanders Peirce: Signs, Abduction, and Fallibilism', tier: 'anchor-exhibit', question: 'How can a community of inquiry move from real doubt through hypothesis and testing without claiming final certainty?', secondaryHallIds: ['core-questions-forum'], formerHallId: 'logic-language-science', principalAssetId: 'peirce-harvard-graduation-portrait-1859'}),
      ]},
      {id: 'pragmatism-james-experience', title: 'James: experience, belief, and pluralism', recordCapacity: 1, exhibits: [
        exhibit({id: 'william-james', entityKind: 'philosopher', entityId: 'william-james', displayName: 'William James: Experience, Pluralism, and the Will to Believe', tier: 'standard-individual-exhibit', question: 'How should belief and truth be understood when inquiry occurs within a plural, unfinished world and some choices cannot wait for certainty?', secondaryHallIds: ['core-questions-forum'], formerHallId: 'mind-consciousness-self', principalAssetId: 'william-james-whitman-painted-portrait-1903'}),
      ]},
      {id: 'pragmatism-dewey-democracy', title: 'Dewey: inquiry, education, and experimental democracy', recordCapacity: 1, exhibits: [
        exhibit({id: 'dewey', entityKind: 'philosopher', entityId: 'dewey', displayName: 'John Dewey: Inquiry, Education, and Democracy as a Way of Life', tier: 'standard-individual-exhibit', question: 'How can inquiry reconstruct problematic situations, and what institutions help people learn the habits of shared democratic intelligence?', secondaryHallIds: ['justice-democratic-reason'], formerHallId: 'logic-language-science', principalAssetId: 'dewey-gibson-studio-portrait-c1890'}),
      ]},
      {id: 'pragmatism-continuities-reserve', title: 'Later pragmatist continuities and omissions', recordCapacity: 2, exhibits: []},
    ],
  },
  {
    id: 'critique-power-deconstruction',
    wingId: 'wing-modern-traditions',
    title: 'Critique, Power, and Deconstruction',
    templateId: 'crossroads-4',
    period: '20th–21st centuries',
    description: 'Treat “Continental philosophy” as a contested retrospective family, then compare Foucault’s historical analyses of knowledge and power, Derrida’s deconstruction of textual and institutional oppositions, and Habermas’s reconstruction of communicative reason and the public sphere.',
    recordCapacity: 5,
    rooms: [
      {id: 'continental-orientation', title: 'Continental philosophy as a retrospective family', recordCapacity: 2, exhibits: [
        exhibit({id: 'continental-philosophy', entityKind: 'branch', entityId: 'continental-philosophy', displayName: 'Continental Philosophy: A Retrospective and Contested Family', tier: 'supporting-exhibit', question: 'What does the label “Continental philosophy” illuminate, and what histories or disagreements does it risk flattening?', secondaryHallIds: ['analytic-traditions', 'phenomenology-existence-embodiment', 'german-idealism-afterlives', 'utility-liberty-history-capital', 'faith-pessimism-life-value'], principalAssetId: 'critique-continental-europe-orthographic'}),
      ]},
      {id: 'critique-genealogy-power', title: 'Archaeology, genealogy, institutions, and subject formation', recordCapacity: 1, exhibits: [
        exhibit({id: 'foucault', entityKind: 'philosopher', entityId: 'foucault', displayName: 'Michel Foucault: Knowledge, Power, and the Formation of Subjects', tier: 'anchor-exhibit', question: 'How do historically specific practices, institutions, and regimes of truth make subjects and fields of knowledge possible?', secondaryHallIds: ['colonialism-race-liberation', 'feminist-philosophies', 'justice-democratic-reason'], formerHallId: 'modernity-freedom-critique', principalAssetId: 'critique-foucault-watercolor-2013'}),
      ]},
      {id: 'critique-deconstruction', title: 'Writing, difference, institution, and justice', recordCapacity: 1, exhibits: [
        exhibit({id: 'derrida', entityKind: 'philosopher', entityId: 'derrida', displayName: 'Jacques Derrida: Writing, Difference, and Deconstruction', tier: 'standard-individual-exhibit', question: 'How can close reading expose the exclusions and instabilities through which texts, concepts, and institutions organize meaning?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'critique-derrida-espinosa-drawing-2013'}),
      ]},
      {id: 'critique-critical-theory', title: 'Critical Theory, public sphere, and communicative reason', recordCapacity: 1, exhibits: [
        exhibit({id: 'habermas', entityKind: 'philosopher', entityId: 'habermas', displayName: 'Jürgen Habermas: Public Reason, Communication, and Modernity', tier: 'anchor-exhibit', question: 'What social conditions allow reasons to be tested through communication rather than imposed through force, status, or administrative power?', secondaryHallIds: ['justice-democratic-reason'], formerHallId: 'ethics-justice-political-life', principalAssetId: 'critique-habermas-critical-theory-heidelberg-1964'}),
      ]},
    ],
  },
  {
    id: 'moral-life-practical-reason',
    wingId: 'wing-ethics-politics-society',
    title: 'Moral Life & Practical Reason',
    templateId: 'crossroads-4',
    period: 'Ancient worlds–21st century',
    description: 'Compare ethical inquiry as a practice of asking how to live, then test character, attention, duty, consequence, rights, personal identity, and responsibility to future people without reducing moral philosophy to one master principle.',
    recordCapacity: 9,
    rooms: [
      {id: 'moral-ethics-orientation', title: 'Ethics: reasons, relationships, practices, and ways of living', recordCapacity: 2, exhibits: [
        exhibit({id: 'ethics', entityKind: 'branch', entityId: 'ethics', displayName: 'Ethics: Reasons, Relationships, Practices, and Ways of Living', tier: 'anchor-exhibit', question: 'How should reasons, relationships, character, consequences, practices, and forms of life guide what we do and become?', secondaryHallIds: ['justice-democratic-reason'], principalAssetId: 'moral-ethics-seven-works-mercy'}),
      ]},
      {id: 'moral-character-virtue', title: 'Character, flourishing, attention, and virtue revival', recordCapacity: 3, exhibits: [
        exhibit({id: 'virtue-ethics', entityKind: 'branch', entityId: 'virtue-ethics', displayName: 'Virtue Ethics: Character, Practice, and Human Flourishing', tier: 'anchor-exhibit', question: 'What traits, practices, relationships, and forms of attention help a person live and act well across changing situations?', secondaryHallIds: ['hellenistic-roman-ways'], principalAssetId: 'moral-virtue-aristotle-homer'}),
        exhibit({id: 'iris-murdoch', entityKind: 'philosopher', entityId: 'iris-murdoch', displayName: 'Iris Murdoch: Attention, Moral Vision, and the Sovereignty of Good', tier: 'standard-individual-exhibit', question: 'How can just and loving attention transform the moral world we are able to see before a choice is made?', secondaryHallIds: [], principalAssetId: 'moral-murdoch-charlbury-road'}),
        exhibit({id: 'philippa-foot', entityKind: 'philosopher', entityId: 'philippa-foot', displayName: 'Philippa Foot', tier: 'standard-individual-exhibit', question: 'How can virtue and natural goodness ground objective moral reasons without turning biology or one trolley case into a complete ethics?', secondaryHallIds: [], principalAssetId: 'moral-foot-somerville-1939'}),
      ]},
      {id: 'moral-duty-consequence', title: 'Duty, respect, consequences, and welfare', recordCapacity: 2, exhibits: [
        exhibit({id: 'deontology', entityKind: 'branch', entityId: 'deontology', displayName: 'Deontology: Duty, Respect, and the Constraints on Action', tier: 'anchor-exhibit', question: 'Which duties, rights, or forms of respect constrain what we may do even when violating them could improve the outcome?', secondaryHallIds: ['enlightenment-revolution-kant'], principalAssetId: 'moral-deontology-oath-horatii'}),
        exhibit({id: 'utilitarianism', entityKind: 'branch', entityId: 'utilitarianism', displayName: 'Utilitarianism: Consequences, Welfare, and Impartial Concern', tier: 'anchor-exhibit', question: 'How should the well-being of everyone affected guide action, and what might aggregate judgment leave out?', secondaryHallIds: ['justice-democratic-reason'], principalAssetId: 'moral-utilitarian-sidgwick-portrait'}),
      ]},
      {id: 'moral-rights-persons-futures', title: 'Rights, persons, hard cases, and future generations', recordCapacity: 2, exhibits: [
        exhibit({id: 'judith-thomson', entityKind: 'philosopher', entityId: 'judith-thomson', displayName: 'Judith Jarvis Thomson', tier: 'standard-individual-exhibit', question: 'How do rights, bodily use, consent, self-defense, and duties of aid shape what people may demand from one another—and why did Thomson keep revising the trolley cases used to test those claims?', secondaryHallIds: [], principalAssetId: 'moral-thomson-trolley-problem'}),
        exhibit({id: 'derek-parfit', entityKind: 'philosopher', entityId: 'derek-parfit', displayName: 'Derek Parfit', tier: 'anchor-exhibit', question: 'What matters in survival if identity is not a further fact, and what do we owe future people whose existence depends on our choices?', secondaryHallIds: ['core-questions-forum'], formerHallId: 'mind-consciousness-self', principalAssetId: 'moral-parfit-all-souls-college'}),
      ]},
    ],
  },
  {
    id: 'feminist-philosophies',
    wingId: 'wing-ethics-politics-society',
    title: 'Feminist Philosophies',
    templateId: 'crossroads-4',
    period: '17th–21st centuries',
    description: 'Follow plural feminist genealogies through education, abolition, citizenship, standpoint, care, embodied and situated freedom, intersectionality, gender norms, disability, queer and trans livability, coalition, and public assembly—without treating one universal “woman” or one national movement as the field’s subject.',
    recordCapacity: 5,
    rooms: [
      {id: 'feminist-orientation-genealogies', title: 'Feminist philosophy and plural genealogies', recordCapacity: 2, exhibits: [
        exhibit({id: 'feminist-philosophy', entityKind: 'branch', entityId: 'feminist-philosophy', displayName: 'Feminist Philosophy: Plural Genealogies, Methods, and Subjects', tier: 'anchor-exhibit', question: 'How do gender, race, class, sexuality, disability, coloniality, labor, and knowledge reorganize philosophical questions rather than merely add neglected examples?', secondaryHallIds: ['colonialism-race-liberation', 'enlightenment-revolution-kant', 'justice-democratic-reason', 'moral-life-practical-reason', 'phenomenology-existence-embodiment'], principalAssetId: 'feminist-philosophy-procession'}),
      ]},
      {id: 'feminist-early-genealogies', title: 'Early-modern education, marriage, virtue, and citizenship', recordCapacity: 1, exhibits: []},
      {id: 'feminist-situated-freedom', title: 'Situated freedom, embodiment, and otherness', recordCapacity: 1, exhibits: [
        exhibit({id: 'beauvoir', entityKind: 'philosopher', entityId: 'beauvoir', displayName: 'Simone de Beauvoir: Situated Freedom, Otherness, and Social Becoming', tier: 'anchor-exhibit', question: 'How can freedom be embodied and socially constrained without becoming either a fixed destiny or an abstract power of choice?', secondaryHallIds: ['phenomenology-existence-embodiment'], formerHallId: 'modernity-freedom-critique', principalAssetId: 'feminist-beauvoir-portrait'}),
      ]},
      {id: 'feminist-gender-norms', title: 'Gender, norms, performativity, and social ontology', recordCapacity: 1, exhibits: [
        exhibit({id: 'judith-butler', entityKind: 'philosopher', entityId: 'judith-butler', displayName: 'Judith Butler', tier: 'anchor-exhibit', question: 'How do norms make genders and lives recognizable, and how can repeated embodied action contest the terms of recognition?', secondaryHallIds: ['critique-power-deconstruction'], principalAssetId: 'feminist-butler-portrait'}),
      ]},
    ],
  },
  {
    id: 'colonialism-race-liberation',
    wingId: 'wing-ethics-politics-society',
    title: 'Colonialism, Race, and Liberation',
    templateId: 'sequence-3',
    period: '19th–21st centuries',
    description: 'Follow anticolonial philosophy from Fanon’s analysis of racialized embodiment, colonial psychiatry, revolutionary violence, and national consciousness through Black feminist abolition, engaged pedagogy, postcolonial representation, language, and contested projects of decolonizing the human.',
    recordCapacity: 5,
    rooms: [
      {id: 'colonial-embodiment-liberation', title: 'Colonial embodiment, violence, psychiatry, and liberation', recordCapacity: 1, exhibits: [
        exhibit({id: 'fanon', entityKind: 'philosopher', entityId: 'fanon', displayName: 'Frantz Fanon: Colonial Embodiment, Violence, and Liberation', tier: 'anchor-exhibit', question: 'How does colonial domination enter bodies, identities, institutions, and struggles for liberation?', secondaryHallIds: ['critique-power-deconstruction', 'justice-democratic-reason', 'phenomenology-existence-embodiment'], formerHallId: 'ethics-justice-political-life', principalAssetId: 'colonial-fanon-portrait'}),
      ]},
      {id: 'colonial-black-feminism-abolition', title: 'Black feminism, abolition, education, culture, and love', recordCapacity: 2, exhibits: [
        exhibit({id: 'angela-davis', entityKind: 'philosopher', entityId: 'angela-davis', displayName: 'Angela Davis', tier: 'anchor-exhibit', question: 'How do prisons, policing, racial capitalism, gender, and organized struggle shape what freedom can mean beyond reform?', secondaryHallIds: ['feminist-philosophies', 'justice-democratic-reason'], principalAssetId: 'colonial-davis-portrait'}),
        exhibit({id: 'bell-hooks', entityKind: 'philosopher', entityId: 'bell-hooks', displayName: 'bell hooks', tier: 'anchor-exhibit', question: 'How can education, cultural criticism, and an ethic of love resist interlocking structures of race, class, and gender?', secondaryHallIds: ['feminist-philosophies', 'justice-democratic-reason'], principalAssetId: 'colonial-hooks-portrait'}),
      ]},
      {id: 'colonial-context-reserve', title: 'Anticolonial, postcolonial, Africana, and decolonial continuities', recordCapacity: 2, exhibits: []},
    ],
  },
] as const satisfies readonly MuseumCanonicalHall[];

export const MUSEUM_HALL_ROUTE_ALIASES = {
  'ancient-greek': 'mediterranean-beginnings-classical',
  'renaissance-reason-revolution': 'renaissance-humanism-new-method',
  'modernity-freedom-critique': 'phenomenology-existence-embodiment',
  'logic-language-science': 'analytic-traditions',
  'ethics-justice-political-life': 'justice-democratic-reason',
  'mind-consciousness-self': 'core-questions-forum',
} as const satisfies Readonly<Record<MuseumLegacyHallId, MuseumCanonicalHallId>>;

export type MuseumPrimaryExhibitRef = {
  hallId: MuseumCanonicalHallId;
  roomId: MuseumCanonicalRoomId;
  exhibitId: string;
};

export type MuseumLegacyExhibitDisposition =
  | 'live-primary'
  | 'move-primary-later'
  | 'become-secondary-later';

export type MuseumLegacyExhibitCompatibility = {
  formerHallId: MuseumLegacyHallId;
  exhibitId: string;
  entityKind: MuseumCanonicalEntityKind;
  entityId: string;
  displayName: string;
  plannedHallId: MuseumPlannedHallId;
  plannedHallTitle: string;
  disposition: MuseumLegacyExhibitDisposition;
  liveExhibitRef?: MuseumPrimaryExhibitRef;
};

export const MUSEUM_LEGACY_EXHIBIT_COMPATIBILITY: readonly MuseumLegacyExhibitCompatibility[] = [];

const canonicalProgramForIndexes: readonly MuseumCanonicalHall[] = MUSEUM_CANONICAL_PROGRAM;

const primaryExhibitEntries = canonicalProgramForIndexes.flatMap((hall) =>
  hall.rooms.flatMap((room) => room.exhibits.map((record) => [
    record.entityId,
    {hallId: hall.id, roomId: room.id, exhibitId: record.id},
  ] as const)),
);

const PRIMARY_EXHIBIT_BY_ENTITY_ID = new Map<string, MuseumPrimaryExhibitRef>(primaryExhibitEntries);

export const MUSEUM_LIVE_LEGACY_EXHIBIT_COMPATIBILITY: readonly MuseumLegacyExhibitCompatibility[] =
  canonicalProgramForIndexes.flatMap((hall) => hall.rooms.flatMap((room) =>
    room.exhibits.flatMap((record) => record.formerHallId ? [{
      formerHallId: record.formerHallId,
      exhibitId: record.id,
      entityKind: record.entityKind,
      entityId: record.entityId,
      displayName: record.displayName,
      plannedHallId: hall.id,
      plannedHallTitle: hall.title,
      disposition: 'live-primary' as const,
      liveExhibitRef: {hallId: hall.id, roomId: room.id, exhibitId: record.id},
    }] : []),
  ));

export const getMuseumPrimaryExhibitRef = (
  entityId: string,
): MuseumPrimaryExhibitRef | undefined => PRIMARY_EXHIBIT_BY_ENTITY_ID.get(entityId);

export const getMuseumLegacyExhibitCompatibility = (
  formerHallId: string,
  exhibitId: string,
): MuseumLegacyExhibitCompatibility | undefined => MUSEUM_LEGACY_EXHIBIT_COMPATIBILITY.find(
  (record) => record.formerHallId === formerHallId && record.exhibitId === exhibitId,
) ?? MUSEUM_LIVE_LEGACY_EXHIBIT_COMPATIBILITY.find(
  (record) => record.formerHallId === formerHallId && record.exhibitId === exhibitId,
);

const liveRooms = canonicalProgramForIndexes.flatMap((hall) => hall.rooms);
const liveExhibits = liveRooms.flatMap((room) => room.exhibits);
const countPresentationTiers = (
  records: readonly MuseumCanonicalExhibit[],
): Readonly<Record<MuseumPresentationTier, number>> => Object.freeze(Object.fromEntries(
  MUSEUM_PRESENTATION_TIERS.map((tier) => [
    tier,
    records.filter((record) => record.tier === tier).length,
  ]),
) as Record<MuseumPresentationTier, number>);

export const MUSEUM_LIVE_ROOM_TOTALS = Object.freeze(canonicalProgramForIndexes.flatMap((hall) =>
  hall.rooms.map((room) => ({
    hallId: hall.id,
    roomId: room.id,
    recordCapacity: room.recordCapacity,
    exhibitCount: room.exhibits.length,
    reserveCapacity: room.recordCapacity - room.exhibits.length,
    tierCounts: countPresentationTiers(room.exhibits),
  })),
));

export const MUSEUM_LIVE_HALL_TOTALS = Object.freeze(canonicalProgramForIndexes.map((hall) => {
  const records = hall.rooms.flatMap((room) => room.exhibits);
  return {
    hallId: hall.id,
    roomCount: hall.rooms.length,
    recordCapacity: hall.recordCapacity,
    exhibitCount: records.length,
    reserveCapacity: hall.recordCapacity - records.length,
    tierCounts: countPresentationTiers(records),
  };
}));

const tierCounts = countPresentationTiers(liveExhibits);

export const MUSEUM_LIVE_PROGRAM_TOTALS = Object.freeze({
  hallCount: MUSEUM_CANONICAL_PROGRAM.length,
  roomCount: liveRooms.length,
  recordCapacity: MUSEUM_CANONICAL_PROGRAM.reduce((sum, hall) => sum + hall.recordCapacity, 0),
  exhibitCount: liveExhibits.length,
  philosopherCount: liveExhibits.filter((record) => record.entityKind === 'philosopher').length,
  branchCount: liveExhibits.filter((record) => record.entityKind === 'branch').length,
  reserveCapacity: MUSEUM_CANONICAL_PROGRAM.reduce((sum, hall) => sum + hall.recordCapacity, 0) - liveExhibits.length,
  tierCounts,
  carriedLegacyExhibitCount: MUSEUM_LIVE_LEGACY_EXHIBIT_COMPATIBILITY.length,
  displacedLegacyExhibitCount: MUSEUM_LEGACY_EXHIBIT_COMPATIBILITY.length,
});
