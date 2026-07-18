/**
 * The approved live intellectual program for the first six permanent Museum halls.
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
] as const;

export type MuseumCanonicalRoomId = (typeof MUSEUM_CANONICAL_ROOM_IDS)[number];
export type MuseumCanonicalTemplateId = 'sequence-3' | 'crossroads-4';
export type MuseumCanonicalWingId =
  | 'wing-core-questions'
  | 'wing-mediterranean-antiquity'
  | 'wing-early-modern-enlightenment'
  | 'wing-modern-traditions'
  | 'wing-ethics-politics-society';
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
    recordCapacity: 24,
    rooms: [
      {
        id: 'med-orientation-nature',
        title: 'Orientation, Ionia, and natural explanation',
        recordCapacity: 5,
        exhibits: [
          exhibit({id: 'ancient-greek', entityKind: 'branch', entityId: 'ancient-greek', displayName: 'Ancient Greek Philosophy', tier: 'supporting-exhibit', question: 'How should this particular Mediterranean history be situated without treating it as philosophy’s universal beginning?', secondaryHallIds: ['core-questions-forum', 'moral-life-practical-reason', 'hellenistic-roman-ways', 'late-antiquity-inheritance']}),
          exhibit({id: 'thales', entityKind: 'philosopher', entityId: 'thales', displayName: 'Thales', tier: 'standard-individual-exhibit', question: 'Could the changing world be explained through nature itself?', secondaryHallIds: ['core-questions-forum']}),
          exhibit({id: 'anaximander', entityKind: 'philosopher', entityId: 'anaximander', displayName: 'Anaximander', tier: 'standard-individual-exhibit', question: 'If no familiar substance is enough, could the world arise from an indefinite source?', secondaryHallIds: ['core-questions-forum']}),
          exhibit({id: 'anaximenes', entityKind: 'philosopher', entityId: 'anaximenes', displayName: 'Anaximenes', tier: 'supporting-exhibit', question: 'How could air become many different kinds of thing?', secondaryHallIds: ['core-questions-forum']}),
        ],
      },
      {
        id: 'med-being-change-plurality',
        title: 'Number, being, change, plurality, and atomism',
        recordCapacity: 10,
        exhibits: [
          exhibit({id: 'pythagoras', entityKind: 'philosopher', entityId: 'pythagoras', displayName: 'Pythagoras', tier: 'standard-individual-exhibit', question: 'How might number and proportion disclose an ordered cosmos and way of life?', secondaryHallIds: ['core-questions-forum']}),
          exhibit({id: 'philolaus', entityKind: 'philosopher', entityId: 'philolaus', displayName: 'Philolaus', tier: 'supporting-exhibit', question: 'How do limit and unlimited combine into an intelligible order?', secondaryHallIds: ['core-questions-forum']}),
          exhibit({id: 'parmenides', entityKind: 'philosopher', entityId: 'parmenides', displayName: 'Parmenides', tier: 'standard-individual-exhibit', question: 'What can thought consistently say about being and change?', secondaryHallIds: ['core-questions-forum']}),
          exhibit({id: 'zeno-elea', entityKind: 'philosopher', entityId: 'zeno-elea', displayName: 'Zeno of Elea', tier: 'standard-individual-exhibit', question: 'What do paradoxes reveal about motion, plurality, and reasoning?', secondaryHallIds: ['core-questions-forum']}),
          exhibit({id: 'leucippus', entityKind: 'philosopher', entityId: 'leucippus', displayName: 'Leucippus', tier: 'gallery-archive-or-study-wall-record', question: 'Can change be explained through indivisible bodies moving in void?', secondaryHallIds: ['core-questions-forum']}),
          exhibit({id: 'democritus', entityKind: 'philosopher', entityId: 'democritus', displayName: 'Democritus', tier: 'standard-individual-exhibit', question: 'How far can atomism explain nature, perception, and human flourishing?', secondaryHallIds: ['core-questions-forum']}),
          exhibit({id: 'heraclitus', entityKind: 'philosopher', entityId: 'heraclitus', displayName: 'Heraclitus', tier: 'standard-individual-exhibit', question: 'How can conflict and transformation belong to an intelligible order?', secondaryHallIds: ['core-questions-forum']}),
          exhibit({id: 'empedocles', entityKind: 'philosopher', entityId: 'empedocles', displayName: 'Empedocles', tier: 'standard-individual-exhibit', question: 'Can stable elements and opposing forces account for cosmic change?', secondaryHallIds: ['core-questions-forum']}),
          exhibit({id: 'anaxagoras', entityKind: 'philosopher', entityId: 'anaxagoras', displayName: 'Anaxagoras', tier: 'standard-individual-exhibit', question: 'What role could mind play in ordering an indefinitely mixed cosmos?', secondaryHallIds: ['core-questions-forum']}),
        ],
      },
      {
        id: 'med-sophists-socratic',
        title: 'Sophists, civic speech, and Socratic inquiry',
        recordCapacity: 4,
        exhibits: [
          exhibit({id: 'protagoras', entityKind: 'philosopher', entityId: 'protagoras', displayName: 'Protagoras', tier: 'standard-individual-exhibit', question: 'How do judgment, education, and civic argument depend on human measure?', secondaryHallIds: ['core-questions-forum']}),
          exhibit({id: 'gorgias', entityKind: 'philosopher', entityId: 'gorgias', displayName: 'Gorgias', tier: 'standard-individual-exhibit', question: 'What can speech accomplish when truth and persuasion come apart?', secondaryHallIds: ['core-questions-forum']}),
          exhibit({id: 'socrates', entityKind: 'philosopher', entityId: 'socrates', displayName: 'Socrates', tier: 'anchor-exhibit', question: 'What does an examined life demand of us?', secondaryHallIds: ['moral-life-practical-reason'], formerHallId: 'ancient-greek', principalAssetId: 'socrates-louvre-head', supportingAssetIds: ['socrates-death-of-socrates']}),
        ],
      },
      {
        id: 'med-plato-aristotle',
        title: 'Plato, Aristotle, Academy, and Lyceum',
        recordCapacity: 5,
        exhibits: [
          exhibit({id: 'platonism', entityKind: 'branch', entityId: 'platonism', displayName: 'Platonism', tier: 'anchor-exhibit', question: 'How did Plato’s dialogues and Academy establish a changing philosophical lineage?', secondaryHallIds: ['core-questions-forum', 'justice-democratic-reason']}),
          exhibit({id: 'aristotelianism', entityKind: 'branch', entityId: 'aristotelianism', displayName: 'Aristotelianism', tier: 'anchor-exhibit', question: 'How did Aristotle’s methods become resources for many later intellectual worlds?', secondaryHallIds: ['core-questions-forum', 'islamic-philosophical-worlds', 'jewish-philosophy', 'latin-christian-scholastic', 'moral-life-practical-reason']}),
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
        exhibit({id: 'machiavelli', entityKind: 'philosopher', entityId: 'machiavelli', displayName: 'Machiavelli', tier: 'anchor-exhibit', question: 'What does political judgment require when ideals and power diverge?', secondaryHallIds: ['justice-democratic-reason'], formerHallId: 'renaissance-reason-revolution', principalAssetId: 'machiavelli-santi-di-tito', supportingAssetIds: ['machiavelli-prince-1532']}),
      ]},
      {id: 'early-experiment-method', title: 'Experiment, method, and organized inquiry', recordCapacity: 2, exhibits: [
        exhibit({id: 'bacon', entityKind: 'philosopher', entityId: 'bacon', displayName: 'Francis Bacon', tier: 'standard-individual-exhibit', question: 'How should organized observation and experiment reform inquiry?', secondaryHallIds: ['core-questions-forum', 'empiricism-science-political-order'], principalAssetId: 'francis-bacon-portrait-1617'}),
      ]},
      {id: 'early-sovereignty-materialism', title: 'Sovereignty, covenant, and materialism', recordCapacity: 2, exhibits: [
        exhibit({id: 'hobbes', entityKind: 'philosopher', entityId: 'hobbes', displayName: 'Hobbes', tier: 'standard-individual-exhibit', question: 'Why would free people authorize a sovereign power?', secondaryHallIds: ['justice-democratic-reason'], formerHallId: 'renaissance-reason-revolution', principalAssetId: 'hobbes-wright-portrait', supportingAssetIds: ['hobbes-leviathan-1651']}),
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
        exhibit({id: 'husserl', entityKind: 'philosopher', entityId: 'husserl', displayName: 'Husserl', tier: 'anchor-exhibit', question: 'How can careful description disclose the structures by which consciousness is directed toward a world?', secondaryHallIds: [], formerHallId: 'mind-consciousness-self', principalAssetId: 'husserl-portrait', supportingAssetIds: ['husserl-goettingen-plaque']}),
      ]},
      {id: 'phenomenology-being-embodiment', title: 'Being-in-the-world, perception, and embodiment', recordCapacity: 2, exhibits: [
        exhibit({id: 'heidegger', entityKind: 'philosopher', entityId: 'heidegger', displayName: 'Heidegger', tier: 'anchor-exhibit', question: 'What does our practical involvement disclose about being?', secondaryHallIds: ['core-questions-forum', 'critique-power-deconstruction'], formerHallId: 'modernity-freedom-critique', principalAssetId: 'heidegger-wetterauer-portrait', supportingAssetIds: ['heidegger-pragher-lecture-1954']}),
        exhibit({id: 'merleau-ponty', entityKind: 'philosopher', entityId: 'merleau-ponty', displayName: 'Maurice Merleau-Ponty', tier: 'standard-individual-exhibit', question: 'How does the lived body open a meaningful world before reflective thought?', secondaryHallIds: ['critique-power-deconstruction'], formerHallId: 'mind-consciousness-self', principalAssetId: 'merleau-ponty-portrait', supportingAssetIds: ['merleau-ponty-grave']}),
      ]},
      {id: 'existentialism-freedom', title: 'Existentialism: freedom, facticity, and bad faith', recordCapacity: 2, exhibits: [
        exhibit({id: 'existentialism', entityKind: 'branch', entityId: 'existentialism', displayName: 'Existentialism', tier: 'anchor-exhibit', question: 'How do freedom and responsibility take shape within concrete situations?', secondaryHallIds: ['critique-power-deconstruction', 'faith-pessimism-life-value', 'hellenistic-roman-ways', 'moral-life-practical-reason']}),
        exhibit({id: 'sartre', entityKind: 'philosopher', entityId: 'sartre', displayName: 'Jean-Paul Sartre', tier: 'anchor-exhibit', question: 'What responsibility follows from freedom without a fixed essence?', secondaryHallIds: ['critique-power-deconstruction'], formerHallId: 'modernity-freedom-critique', principalAssetId: 'sartre-anefo-1965', supportingAssetIds: ['sartre-beauvoir-balzac']}),
      ]},
      {id: 'existentialism-situated-absurd', title: 'Situated freedom, ambiguity, the absurd, and revolt', recordCapacity: 2, exhibits: [
        exhibit({id: 'camus', entityKind: 'philosopher', entityId: 'camus', displayName: 'Albert Camus', tier: 'standard-individual-exhibit', question: 'How can revolt answer a world that offers no final guarantee?', secondaryHallIds: ['justice-democratic-reason', 'colonialism-race-liberation'], formerHallId: 'modernity-freedom-critique', principalAssetId: 'camus-loc-1957', supportingAssetIds: ['camus-combat-1943']}),
      ]},
      {id: 'phenomenology-interpretation-alterity', title: 'Interpretation, tradition, alterity, and responsibility', recordCapacity: 2, exhibits: [
        exhibit({id: 'levinas', entityKind: 'philosopher', entityId: 'levinas', displayName: 'Emmanuel Levinas', tier: 'standard-individual-exhibit', question: 'What ethical demand arrives in the encounter with another person?', secondaryHallIds: ['critique-power-deconstruction', 'moral-life-practical-reason']}),
        exhibit({id: 'gadamer', entityKind: 'philosopher', entityId: 'gadamer', displayName: 'Hans-Georg Gadamer', tier: 'standard-individual-exhibit', question: 'How do language, history, and tradition shape understanding?', secondaryHallIds: ['critique-power-deconstruction']}),
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
        exhibit({id: 'analytic-philosophy', entityKind: 'branch', entityId: 'analytic-philosophy', displayName: 'Analytic Philosophy', tier: 'anchor-exhibit', question: 'How did logic and analysis become a diverse modern philosophical family?', secondaryHallIds: ['core-questions-forum', 'critique-power-deconstruction']}),
        exhibit({id: 'russell', entityKind: 'philosopher', entityId: 'russell', displayName: 'Bertrand Russell', tier: 'standard-individual-exhibit', question: 'Can logical analysis reveal what our sentences commit us to?', secondaryHallIds: ['core-questions-forum'], formerHallId: 'logic-language-science', principalAssetId: 'russell-portrait-1894', supportingAssetIds: ['russell-on-denoting-1905']}),
        exhibit({id: 'frege', entityKind: 'philosopher', entityId: 'frege', displayName: 'Gottlob Frege', tier: 'anchor-exhibit', question: 'How can logical form clarify number, reference, and the difference between sense and object?', secondaryHallIds: ['core-questions-forum'], formerHallId: 'logic-language-science', principalAssetId: 'frege-portrait', supportingAssetIds: ['frege-begriffsschrift-1879']}),
      ]},
      {id: 'analytic-common-sense-metaethics', title: 'Common sense, realism, and metaethics', recordCapacity: 1, exhibits: [
        exhibit({id: 'g-e-moore', entityKind: 'philosopher', entityId: 'g-e-moore', displayName: 'G. E. Moore', tier: 'standard-individual-exhibit', question: 'Can analysis defend common sense and resist reducing goodness to a natural property?', secondaryHallIds: ['moral-life-practical-reason']}),
      ]},
      {id: 'analytic-wittgenstein', title: 'Wittgenstein: logical form, use, and therapy', recordCapacity: 1, exhibits: [
        exhibit({id: 'wittgenstein', entityKind: 'philosopher', entityId: 'wittgenstein', displayName: 'Wittgenstein', tier: 'anchor-exhibit', question: 'How do logical form and later language-games change the work of philosophy?', secondaryHallIds: ['core-questions-forum', 'moral-life-practical-reason']}),
      ]},
      {id: 'analytic-naturalism', title: 'Holism, naturalism, and ontology', recordCapacity: 1, exhibits: [
        exhibit({id: 'quine', entityKind: 'philosopher', entityId: 'quine', displayName: 'W. V. O. Quine', tier: 'standard-individual-exhibit', question: 'What changes when beliefs confront experience as an interconnected web?', secondaryHallIds: ['core-questions-forum'], formerHallId: 'logic-language-science', principalAssetId: 'quine-portrait', supportingAssetIds: ['quine-qualitative-sphere']}),
      ]},
      {id: 'analytic-action-intention', title: 'Action, intention, and ordinary language', recordCapacity: 1, exhibits: [
        exhibit({id: 'anscombe', entityKind: 'philosopher', entityId: 'anscombe', displayName: 'Elizabeth Anscombe', tier: 'standard-individual-exhibit', question: 'What distinguishes an intentional action from an event that merely happens through us?', secondaryHallIds: ['core-questions-forum', 'moral-life-practical-reason'], formerHallId: 'mind-consciousness-self', principalAssetId: 'anscombe-portrait', supportingAssetIds: ['anscombe-philosophical-investigations-1953']}),
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
        exhibit({id: 'political-philosophy', entityKind: 'branch', entityId: 'political-philosophy', displayName: 'Political Philosophy', tier: 'anchor-exhibit', question: 'What makes political power legitimate, contestable, and answerable to a public?', secondaryHallIds: ['moral-life-practical-reason']}),
        exhibit({id: 'arendt', entityKind: 'philosopher', entityId: 'arendt', displayName: 'Hannah Arendt', tier: 'anchor-exhibit', question: 'What forms of public action, judgment, and shared world make political freedom possible?', secondaryHallIds: [], formerHallId: 'ethics-justice-political-life', principalAssetId: 'arendt-portrait-1933', supportingAssetIds: ['arendt-grave-bard']}),
      ]},
      {id: 'justice-distribution-rights', title: 'Justice, distribution, rights, and the state', recordCapacity: 2, exhibits: [
        exhibit({id: 'rawls', entityKind: 'philosopher', entityId: 'rawls', displayName: 'John Rawls', tier: 'anchor-exhibit', question: 'Which principles would fairly situated citizens choose for their basic institutions?', secondaryHallIds: [], formerHallId: 'ethics-justice-political-life', principalAssetId: 'rawls-portrait', supportingAssetIds: ['rawls-theory-justice-1971']}),
        exhibit({id: 'nozick', entityKind: 'philosopher', entityId: 'nozick', displayName: 'Robert Nozick', tier: 'standard-individual-exhibit', question: 'When do individual rights constrain redistribution and the purposes of the state?', secondaryHallIds: [], formerHallId: 'ethics-justice-political-life', principalAssetId: 'nozick-portrait', supportingAssetIds: ['nozick-anarchy-state-utopia-1974']}),
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
        exhibit({id: 'metaphysics', entityKind: 'branch', entityId: 'metaphysics', displayName: 'Metaphysics', tier: 'anchor-exhibit', question: 'What kinds of reality and explanation do philosophical systems propose?', secondaryHallIds: ['mediterranean-beginnings-classical', 'classical-south-asian-worlds', 'buddhist-philosophies', 'islamic-philosophical-worlds', 'rationalism-mind-nature-system', 'german-idealism-afterlives']}),
        exhibit({id: 'ontology', entityKind: 'branch', entityId: 'ontology', displayName: 'Ontology', tier: 'anchor-exhibit', question: 'What does it mean to inquire into being without assigning that inquiry a single origin?', secondaryHallIds: ['mediterranean-beginnings-classical', 'classical-south-asian-worlds', 'buddhist-philosophies', 'islamic-philosophical-worlds', 'rationalism-mind-nature-system', 'german-idealism-afterlives', 'phenomenology-existence-embodiment']}),
        exhibit({id: 'whitehead', entityKind: 'philosopher', entityId: 'whitehead', displayName: 'Alfred North Whitehead', tier: 'anchor-exhibit', question: 'What if reality is better understood through processes and relations than static substances?', secondaryHallIds: ['analytic-traditions'], principalAssetId: 'alfred-north-whitehead-portrait-1923'}),
      ], comparativeLenses: [
        {id: 'reality-aristotle', entityId: 'aristotle', displayName: 'Aristotle on substance and cause', culturalSetting: 'Classical Athens and the Lyceum', primaryHallId: 'mediterranean-beginnings-classical', rationale: 'A live historical route from modern field language to Aristotle’s distinct account of substance, form, matter, and explanation.'},
        {id: 'reality-kanada', entityId: 'kanada', displayName: 'Kaṇāda and Vaiśeṣika categories', culturalSetting: 'Classical South Asian intellectual worlds', primaryHallId: 'classical-south-asian-worlds', rationale: 'A named South Asian route to categories, substances, qualities, motion, and atomism without absorbing Vaiśeṣika into a modern Western field.'},
        {id: 'reality-mulla-sadra', entityId: 'mulla-sadra', displayName: 'Mulla Sadra on existence and change', culturalSetting: 'Safavid Islamic philosophy', primaryHallId: 'islamic-philosophical-worlds', rationale: 'A route to post-Avicennian debates over the primacy of existence and substantial motion in their Islamic philosophical setting.'},
      ]},
      {id: 'core-knowledge', title: 'Knowledge', recordCapacity: 2, exhibits: [
        exhibit({id: 'epistemology', entityKind: 'branch', entityId: 'epistemology', displayName: 'Epistemology', tier: 'anchor-exhibit', question: 'What makes cognition, testimony, inference, or experience warrant belief?', secondaryHallIds: ['empiricism-science-political-order', 'hellenistic-roman-ways', 'rationalism-mind-nature-system', 'classical-south-asian-worlds', 'buddhist-philosophies']}),
      ], comparativeLenses: [
        {id: 'knowledge-dignaga', entityId: 'dignaga', displayName: 'Dignāga on perception and inference', culturalSetting: 'Buddhist pramāṇa traditions in South Asia', primaryHallId: 'buddhist-philosophies', rationale: 'A route to Buddhist debates over reliable cognition whose categories should not be treated as a local example of modern epistemology.'},
        {id: 'knowledge-dharmakirti', entityId: 'dharmakirti', displayName: 'Dharmakīrti on reliable cognition', culturalSetting: 'Buddhist scholastic philosophy', primaryHallId: 'buddhist-philosophies', rationale: 'A named route to Dharmakīrti’s arguments about perception, inference, language, and proof in the pramāṇa lineage.'},
      ]},
      {id: 'core-mind-self', title: 'Mind & Self', recordCapacity: 3, exhibits: [
        exhibit({id: 'philosophy-of-mind', entityKind: 'branch', entityId: 'philosophy-of-mind', displayName: 'Philosophy of Mind', tier: 'anchor-exhibit', question: 'How should mind, consciousness, embodiment, and selfhood be investigated?', secondaryHallIds: ['classical-south-asian-worlds', 'buddhist-philosophies', 'rationalism-mind-nature-system', 'phenomenology-existence-embodiment', 'analytic-traditions']}),
        exhibit({id: 'thomas-nagel', entityKind: 'philosopher', entityId: 'thomas-nagel', displayName: 'Thomas Nagel', tier: 'anchor-exhibit', question: 'Why can an objective account leave out what an experience is like for its subject?', secondaryHallIds: ['justice-democratic-reason', 'moral-life-practical-reason'], formerHallId: 'mind-consciousness-self', principalAssetId: 'thomas-nagel-portrait', supportingAssetIds: ['thomas-nagel-teaching']}),
        exhibit({id: 'jiddu-krishnamurti', entityKind: 'philosopher', entityId: 'jiddu-krishnamurti', displayName: 'Jiddu Krishnamurti', tier: 'standard-individual-exhibit', question: 'Can attention disclose conditioning and psychological fear without relying on authority or a fixed path?', secondaryHallIds: ['classical-south-asian-worlds'], roomComparisons: [{targetHallId: 'core-questions-forum', targetRoomId: 'core-religion', targetExhibitId: 'philosophy-of-religion', relationType: 'comparison', rationale: 'Compare Krishnamurti’s critique of guru authority, organized allegiance, ritual dependence, and fixed paths with philosophical debates about religious belief, practice, experience, and institutions; this is criticism and comparison, not affiliation.'}], principalAssetId: 'jiddu-krishnamurti-bain-portrait', supportingAssetIds: ['jiddu-krishnamurti-besant-1927']}),
      ], comparativeLenses: [
        {id: 'mind-patanjali', entityId: 'patanjali', displayName: 'Patañjali and the Yoga Sūtra tradition', culturalSetting: 'Classical South Asian Yoga traditions', primaryHallId: 'classical-south-asian-worlds', rationale: 'A route to disciplined analyses of mind, affliction, practice, and liberation in a disputed textual and historical lineage—not membership for Krishnamurti or a generic wellness analogy.'},
        {id: 'mind-vasubandhu', entityId: 'vasubandhu', displayName: 'Vasubandhu on cognition and self', culturalSetting: 'Buddhist Abhidharma and Yogācāra debates', primaryHallId: 'buddhist-philosophies', rationale: 'A route to Buddhist arguments about cognition and continuity that preserves their liberation-oriented and scholastic contexts.'},
      ]},
      {id: 'core-logic-language', title: 'Logic & Language', recordCapacity: 3, exhibits: [
        exhibit({id: 'logic', entityKind: 'branch', entityId: 'logic', displayName: 'Logic', tier: 'anchor-exhibit', question: 'How do different traditions distinguish valid inference from error?', secondaryHallIds: ['analytic-traditions', 'mediterranean-beginnings-classical', 'buddhist-philosophies', 'classical-chinese-traditions', 'islamic-philosophical-worlds', 'latin-christian-scholastic']}),
        exhibit({id: 'philosophy-of-language', entityKind: 'branch', entityId: 'philosophy-of-language', displayName: 'Philosophy of Language', tier: 'anchor-exhibit', question: 'How do words, signs, practices, and interpretations make meaning possible?', secondaryHallIds: ['analytic-traditions', 'mediterranean-beginnings-classical', 'buddhist-philosophies', 'classical-chinese-traditions', 'phenomenology-existence-embodiment']}),
      ], comparativeLenses: [
        {id: 'logic-dignaga', entityId: 'dignaga', displayName: 'Dignāga on inference and exclusion', culturalSetting: 'Buddhist pramāṇa traditions in South Asia', primaryHallId: 'buddhist-philosophies', rationale: 'A route to inference and theories of meaning in Buddhist scholastic debate, not an assertion that Dignāga was an analytic philosopher.'},
        {id: 'logic-mozi', entityId: 'mozi', displayName: 'Mohist argument and the later Mohist Canons', culturalSetting: 'Warring States Chinese traditions', primaryHallId: 'classical-chinese-traditions', rationale: 'A Chinese route to standards, distinctions, names, and argument that resists presenting logic as cultureless or exclusively Greek-to-European.'},
      ]},
      {id: 'core-science', title: 'Science', recordCapacity: 5, exhibits: [
        exhibit({id: 'philosophy-of-science', entityKind: 'branch', entityId: 'philosophy-of-science', displayName: 'Philosophy of Science', tier: 'anchor-exhibit', question: 'How do methods, evidence, models, criticism, and historical change shape science?', secondaryHallIds: ['renaissance-humanism-new-method', 'empiricism-science-political-order', 'islamic-philosophical-worlds', 'pragmatism-democratic-inquiry', 'analytic-traditions']}),
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
        exhibit({id: 'aesthetics', entityKind: 'branch', entityId: 'aesthetics', displayName: 'Aesthetics', tier: 'anchor-exhibit', question: 'How do art, beauty, form, expression, and judgment shape experience?', secondaryHallIds: ['moral-life-practical-reason', 'mediterranean-beginnings-classical', 'classical-chinese-traditions', 'enlightenment-revolution-kant', 'german-idealism-afterlives', 'faith-pessimism-life-value', 'pragmatism-democratic-inquiry']}),
      ], comparativeLenses: [
        {id: 'aesthetics-zhuangzi', entityId: 'zhuangzi', displayName: 'Zhuangzi on skill, transformation, and perspective', culturalSetting: 'Classical Daoist texts and reception', primaryHallId: 'classical-chinese-traditions', rationale: 'A Daoist route to skilled activity, transformation, language, and perspective without reducing the Zhuangzi to a modern theory of art.'},
        {id: 'aesthetics-confucius', entityId: 'confucius', displayName: 'Confucian ritual, music, and cultivation', culturalSetting: 'Classical Confucian traditions', primaryHallId: 'classical-chinese-traditions', rationale: 'A named route to the formative roles of ritual and music in ethical and political cultivation.'},
      ]},
      {id: 'core-religion', title: 'Philosophy of Religion', recordCapacity: 2, exhibits: [
        exhibit({id: 'philosophy-of-religion', entityKind: 'branch', entityId: 'philosophy-of-religion', displayName: 'Philosophy of Religion', tier: 'anchor-exhibit', question: 'How should philosophical inquiry approach religious belief, practice, experience, and authority?', secondaryHallIds: ['classical-south-asian-worlds', 'late-antiquity-inheritance', 'islamic-philosophical-worlds', 'jewish-philosophy', 'latin-christian-scholastic', 'enlightenment-revolution-kant']}),
      ], comparativeLenses: [
        {id: 'religion-nagarjuna', entityId: 'nagarjuna', displayName: 'Nāgārjuna on emptiness and dependent arising', culturalSetting: 'Madhyamaka Buddhist traditions', primaryHallId: 'buddhist-philosophies', rationale: 'A Buddhist route whose arguments and liberative setting should not be collapsed into a generic debate over theism.'},
        {id: 'religion-al-ghazali', entityId: 'al-ghazali', displayName: 'Al-Ghazali on reason, revelation, and critique', culturalSetting: 'Islamic kalām, law, and philosophical reception', primaryHallId: 'islamic-philosophical-worlds', rationale: 'An Islamic route to critique and appropriation of philosophy within kalām, law, and religious practice.'},
        {id: 'religion-aquinas', entityId: 'aquinas', displayName: 'Aquinas on reason, revelation, and divine language', culturalSetting: 'Latin Christian scholastic traditions', primaryHallId: 'latin-christian-scholastic', rationale: 'A Latin scholastic route to arguments about God, analogy, creation, and the relation between philosophical and revealed theology.'},
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
  displaced('ancient-greek', 'branch', 'cynicism', 'Cynicism', 'hellenistic-roman-ways', 'move-primary-later'),
  displaced('ancient-greek', 'branch', 'epicureanism', 'Epicureanism', 'hellenistic-roman-ways', 'move-primary-later'),
  displaced('ancient-greek', 'branch', 'stoicism', 'Stoicism', 'hellenistic-roman-ways', 'move-primary-later'),
  displaced('ancient-greek', 'branch', 'skepticism', 'Skepticism', 'hellenistic-roman-ways', 'move-primary-later'),
  displaced('ancient-greek', 'branch', 'neoplatonism', 'Neoplatonism', 'late-antiquity-inheritance', 'become-secondary-later'),
  displaced('renaissance-reason-revolution', 'philosopher', 'descartes', 'René Descartes', 'rationalism-mind-nature-system', 'move-primary-later'),
  displaced('renaissance-reason-revolution', 'philosopher', 'locke', 'John Locke', 'empiricism-science-political-order', 'move-primary-later'),
  displaced('renaissance-reason-revolution', 'philosopher', 'spinoza', 'Baruch Spinoza', 'rationalism-mind-nature-system', 'move-primary-later'),
  displaced('renaissance-reason-revolution', 'philosopher', 'hume', 'David Hume', 'empiricism-science-political-order', 'move-primary-later'),
  displaced('renaissance-reason-revolution', 'philosopher', 'rousseau', 'Jean-Jacques Rousseau', 'enlightenment-revolution-kant', 'move-primary-later'),
  displaced('renaissance-reason-revolution', 'philosopher', 'kant', 'Immanuel Kant', 'enlightenment-revolution-kant', 'move-primary-later'),
  displaced('modernity-freedom-critique', 'philosopher', 'kierkegaard', 'Søren Kierkegaard', 'faith-pessimism-life-value', 'become-secondary-later'),
  displaced('modernity-freedom-critique', 'philosopher', 'marx', 'Karl Marx', 'utility-liberty-history-capital', 'move-primary-later'),
  displaced('modernity-freedom-critique', 'philosopher', 'nietzsche', 'Friedrich Nietzsche', 'faith-pessimism-life-value', 'become-secondary-later'),
  displaced('modernity-freedom-critique', 'philosopher', 'beauvoir', 'Simone de Beauvoir', 'feminist-philosophies', 'become-secondary-later'),
  displaced('modernity-freedom-critique', 'philosopher', 'foucault', 'Michel Foucault', 'critique-power-deconstruction', 'move-primary-later'),
  displaced('logic-language-science', 'philosopher', 'peirce', 'Charles Sanders Peirce', 'pragmatism-democratic-inquiry', 'move-primary-later'),
  displaced('logic-language-science', 'philosopher', 'dewey', 'John Dewey', 'pragmatism-democratic-inquiry', 'move-primary-later'),
  displaced('ethics-justice-political-life', 'philosopher', 'bentham', 'Jeremy Bentham', 'utility-liberty-history-capital', 'become-secondary-later'),
  displaced('ethics-justice-political-life', 'philosopher', 'wollstonecraft', 'Mary Wollstonecraft', 'enlightenment-revolution-kant', 'become-secondary-later'),
  displaced('ethics-justice-political-life', 'philosopher', 'mill', 'John Stuart Mill', 'utility-liberty-history-capital', 'become-secondary-later'),
  displaced('ethics-justice-political-life', 'philosopher', 'fanon', 'Frantz Fanon', 'colonialism-race-liberation', 'become-secondary-later'),
  displaced('ethics-justice-political-life', 'philosopher', 'habermas', 'Jürgen Habermas', 'critique-power-deconstruction', 'become-secondary-later'),
  displaced('mind-consciousness-self', 'philosopher', 'patanjali', 'Patañjali', 'classical-south-asian-worlds', 'become-secondary-later'),
  displaced('mind-consciousness-self', 'philosopher', 'vasubandhu', 'Vasubandhu', 'buddhist-philosophies', 'become-secondary-later'),
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
