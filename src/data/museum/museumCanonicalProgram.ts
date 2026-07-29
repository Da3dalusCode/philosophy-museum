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
] as const;

export type MuseumCanonicalRoomId = (typeof MUSEUM_CANONICAL_ROOM_IDS)[number];
export type MuseumCanonicalTemplateId = 'standard-rect' | 'sequence-3' | 'crossroads-4';
export type MuseumCanonicalWingId =
  | 'wing-core-questions'
  | 'wing-mediterranean-antiquity'
  | 'wing-early-modern-enlightenment'
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
          exhibit({id: 'thales', entityKind: 'philosopher', entityId: 'thales', displayName: 'Thales', tier: 'standard-individual-exhibit', question: 'Could the changing world be explained through nature itself?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'thales-promptuarii-portrait'}),
          exhibit({id: 'anaximander', entityKind: 'philosopher', entityId: 'anaximander', displayName: 'Anaximander', tier: 'standard-individual-exhibit', question: 'If no familiar substance is enough, could the world arise from an indefinite source?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'anaximander-world-map'}),
          exhibit({id: 'anaximenes', entityKind: 'philosopher', entityId: 'anaximenes', displayName: 'Anaximenes', tier: 'supporting-exhibit', question: 'How could air become many different kinds of thing?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'anaximenes-bnf-portrait'}),
        ],
      },
      {
        id: 'med-being-change-plurality',
        title: 'Number, being, change, plurality, and atomism',
        recordCapacity: 10,
        exhibits: [
          exhibit({id: 'pythagoras', entityKind: 'philosopher', entityId: 'pythagoras', displayName: 'Pythagoras', tier: 'standard-individual-exhibit', question: 'How might number and proportion disclose an ordered cosmos and way of life?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'pythagoras-ratios-raphael'}),
          exhibit({id: 'philolaus', entityKind: 'philosopher', entityId: 'philolaus', displayName: 'Philolaus', tier: 'supporting-exhibit', question: 'How do limit and unlimited combine into an intelligible order?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'philolaus-musical-pipes'}),
          exhibit({id: 'parmenides', entityKind: 'philosopher', entityId: 'parmenides', displayName: 'Parmenides', tier: 'standard-individual-exhibit', question: 'What can thought consistently say about being and change?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'parmenides-raphael-traditional'}),
          exhibit({id: 'zeno-elea', entityKind: 'philosopher', entityId: 'zeno-elea', displayName: 'Zeno of Elea', tier: 'standard-individual-exhibit', question: 'What do paradoxes reveal about motion, plurality, and reasoning?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'zeno-elea-rijksmuseum-print'}),
          exhibit({id: 'leucippus', entityKind: 'philosopher', entityId: 'leucippus', displayName: 'Leucippus', tier: 'gallery-archive-or-study-wall-record', question: 'Can change be explained through indivisible bodies moving in void?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'leucippus-giordano'}),
          exhibit({id: 'democritus', entityKind: 'philosopher', entityId: 'democritus', displayName: 'Democritus', tier: 'standard-individual-exhibit', question: 'How far can atomism explain nature, perception, and human flourishing?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'democritus-velazquez'}),
          exhibit({id: 'heraclitus', entityKind: 'philosopher', entityId: 'heraclitus', displayName: 'Heraclitus', tier: 'standard-individual-exhibit', question: 'How can conflict and transformation belong to an intelligible order?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'heraclitus-va-bust'}),
          exhibit({id: 'empedocles', entityKind: 'philosopher', entityId: 'empedocles', displayName: 'Empedocles', tier: 'standard-individual-exhibit', question: 'Can stable elements and opposing forces account for cosmic change?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'empedocles-met-print'}),
          exhibit({id: 'anaxagoras', entityKind: 'philosopher', entityId: 'anaxagoras', displayName: 'Anaxagoras', tier: 'standard-individual-exhibit', question: 'What role could mind play in ordering an indefinitely mixed cosmos?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'anaxagoras-ribera'}),
        ],
      },
      {
        id: 'med-sophists-socratic',
        title: 'Sophists, civic speech, and Socratic inquiry',
        recordCapacity: 6,
        exhibits: [
          exhibit({id: 'protagoras', entityKind: 'philosopher', entityId: 'protagoras', displayName: 'Protagoras', tier: 'anchor-exhibit', question: 'How do judgment, education, and civic argument depend on human measure?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'protagoras-ribera'}),
          exhibit({id: 'prodicus', entityKind: 'philosopher', entityId: 'prodicus', displayName: 'Prodicus of Ceos', tier: 'standard-individual-exhibit', question: 'Can careful distinctions in language help a person choose how to live?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'prodicus-choice-of-hercules'}),
          exhibit({id: 'hippias-of-elis', entityKind: 'philosopher', entityId: 'hippias-of-elis', displayName: 'Hippias of Elis', tier: 'standard-individual-exhibit', question: 'Can broad learning and practical skill make a person self-sufficient?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'hippias-greek-strigil'}),
          exhibit({id: 'gorgias', entityKind: 'philosopher', entityId: 'gorgias', displayName: 'Gorgias', tier: 'anchor-exhibit', question: 'What can speech accomplish when truth and persuasion come apart?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'gorgias-ortolani'}),
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
          exhibit({id: 'plato', entityKind: 'philosopher', entityId: 'plato', displayName: 'Plato', tier: 'anchor-exhibit', question: 'What is more real than the appearances around us?', secondaryHallIds: ['core-questions-forum', 'justice-democratic-reason', 'late-antiquity-inheritance'], formerHallId: 'ancient-greek', principalAssetId: 'plato-capitoline-bust', supportingAssetIds: ['plato-school-of-athens']}),
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
        exhibit({id: 'thomas-nagel', entityKind: 'philosopher', entityId: 'thomas-nagel', displayName: 'Thomas Nagel', tier: 'anchor-exhibit', question: 'Why can an objective account leave out what an experience is like for its subject?', secondaryHallIds: ['justice-democratic-reason', 'moral-life-practical-reason'], formerHallId: 'mind-consciousness-self', principalAssetId: 'thomas-nagel-portrait', supportingAssetIds: ['thomas-nagel-teaching']}),
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
        exhibit({id: 'antisthenes', entityKind: 'philosopher', entityId: 'antisthenes', displayName: 'Antisthenes: A Disputed Cynic Beginning', tier: 'supporting-exhibit', question: 'How did Socratic virtue become a demand for self-sufficiency without inventing a tidy founder story?', secondaryHallIds: ['moral-life-practical-reason'], principalAssetId: 'antisthenes-british-museum-bust'}),
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
        exhibit({id: 'arcesilaus', entityKind: 'philosopher', entityId: 'arcesilaus', displayName: 'Arcesilaus: The Academy Turns Against Certainty', tier: 'standard-individual-exhibit', question: 'Can Socratic and Platonic inquiry undermine every claimed criterion of secure cognition?', secondaryHallIds: ['core-questions-forum', 'mediterranean-beginnings-classical'], principalAssetId: 'arcesilaus-carneades-academica'}),
        exhibit({id: 'carneades', entityKind: 'philosopher', entityId: 'carneades', displayName: 'Carneades: Argument on Both Sides', tier: 'standard-individual-exhibit', question: 'How can action proceed through persuasive appearances without claiming certainty?', secondaryHallIds: ['core-questions-forum', 'moral-life-practical-reason'], principalAssetId: 'carneades-louvre-bust'}),
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
        exhibit({id: 'porphyry', entityKind: 'philosopher', entityId: 'porphyry', displayName: 'Porphyry: Editing Plotinus and Ordering Inquiry', tier: 'standard-individual-exhibit', question: 'How do editorial form, logic, interpretation, and philosophical purification shape a tradition?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'porphyry-plotinus-medieval'}),
        exhibit({id: 'iamblichus', entityKind: 'philosopher', entityId: 'iamblichus', displayName: 'Iamblichus: Theurgy and Divine Causation', tier: 'standard-individual-exhibit', question: 'Why might rational contemplation require ritual participation in a divine order?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'iamblichus-protreptikos-manuscript'}),
        exhibit({id: 'proclus', entityKind: 'philosopher', entityId: 'proclus', displayName: 'Proclus: Participation, Procession, and Return', tier: 'standard-individual-exhibit', question: 'How can a systematic metaphysics preserve both causal dependence and structured plurality?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'proclus-platonic-theology-manuscript'}),
      ]},
      {id: 'late-christian-platonisms', title: 'Christian transformations of Platonism', recordCapacity: 5, exhibits: [
        exhibit({id: 'origen', entityKind: 'philosopher', entityId: 'origen', displayName: 'Origen: Scripture, Freedom, and First Principles', tier: 'standard-individual-exhibit', question: 'How can philosophical argument and layered scriptural interpretation belong to one Christian inquiry?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'origen-schaftlarn-manuscript'}),
        exhibit({id: 'augustine', entityKind: 'philosopher', entityId: 'augustine', displayName: 'Augustine: Inwardness, Will, Evil, and Time', tier: 'anchor-exhibit', question: 'How do memory, desire, creation, grace, and responsibility transform Platonist ascent?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'augustine-lateran-fresco'}),
        exhibit({id: 'gregory-nyssa', entityKind: 'philosopher', entityId: 'gregory-nyssa', displayName: 'Gregory of Nyssa: Infinity and Transformative Ascent', tier: 'standard-individual-exhibit', question: 'What if flourishing toward the divine has no final intellectual stopping point?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'gregory-nyssa-mosaic'}),
        exhibit({id: 'pseudo-dionysius', entityKind: 'philosopher', entityId: 'pseudo-dionysius', displayName: 'Pseudo-Dionysius: Divine Names and Unknowing', tier: 'thematic-cluster-participant', question: 'How can affirmative and negative language lead thought toward what exceeds every name?', secondaryHallIds: ['core-questions-forum'], principalAssetId: 'pseudo-dionysius-opera-1556'}),
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

const displaced = (
  formerHallId: MuseumLegacyHallId,
  entityKind: MuseumCanonicalEntityKind,
  entityId: string,
  displayName: string,
  plannedHallId: MuseumPlannedHallId,
  disposition: MuseumLegacyExhibitDisposition,
): MuseumLegacyExhibitCompatibility => ({
  formerHallId,
  exhibitId: entityId,
  entityKind,
  entityId,
  displayName,
  plannedHallId,
  plannedHallTitle: MUSEUM_PLANNED_HALL_TITLES[plannedHallId],
  disposition,
});

export const MUSEUM_LEGACY_EXHIBIT_COMPATIBILITY = [
  displaced('modernity-freedom-critique', 'philosopher', 'kierkegaard', 'Søren Kierkegaard', 'faith-pessimism-life-value', 'become-secondary-later'),
  displaced('modernity-freedom-critique', 'philosopher', 'marx', 'Karl Marx', 'utility-liberty-history-capital', 'move-primary-later'),
  displaced('modernity-freedom-critique', 'philosopher', 'nietzsche', 'Friedrich Nietzsche', 'faith-pessimism-life-value', 'become-secondary-later'),
  displaced('modernity-freedom-critique', 'philosopher', 'beauvoir', 'Simone de Beauvoir', 'feminist-philosophies', 'become-secondary-later'),
  displaced('modernity-freedom-critique', 'philosopher', 'foucault', 'Michel Foucault', 'critique-power-deconstruction', 'move-primary-later'),
  displaced('logic-language-science', 'philosopher', 'peirce', 'Charles Sanders Peirce', 'pragmatism-democratic-inquiry', 'move-primary-later'),
  displaced('logic-language-science', 'philosopher', 'dewey', 'John Dewey', 'pragmatism-democratic-inquiry', 'move-primary-later'),
  displaced('ethics-justice-political-life', 'philosopher', 'bentham', 'Jeremy Bentham', 'utility-liberty-history-capital', 'become-secondary-later'),
  displaced('ethics-justice-political-life', 'philosopher', 'mill', 'John Stuart Mill', 'utility-liberty-history-capital', 'become-secondary-later'),
  displaced('ethics-justice-political-life', 'philosopher', 'fanon', 'Frantz Fanon', 'colonialism-race-liberation', 'become-secondary-later'),
  displaced('ethics-justice-political-life', 'philosopher', 'habermas', 'Jürgen Habermas', 'critique-power-deconstruction', 'become-secondary-later'),
  displaced('mind-consciousness-self', 'philosopher', 'william-james', 'William James', 'pragmatism-democratic-inquiry', 'become-secondary-later'),
  displaced('mind-consciousness-self', 'philosopher', 'derek-parfit', 'Derek Parfit', 'moral-life-practical-reason', 'become-secondary-later'),
] as const satisfies readonly MuseumLegacyExhibitCompatibility[];

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
