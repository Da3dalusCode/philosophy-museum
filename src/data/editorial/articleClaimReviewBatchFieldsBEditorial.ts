import type {
  ArticleSection,
  Branch,
  CitationLocatorKind,
  CitationReference,
  EditorialSource,
  KeyConcept,
} from '../../types/philosophy';
import {citation as cite, paragraph as paragraphClaim, structuredClaim} from './pilotHelpers';

/*
 * Isolated seven-branch claim-review overlay for Fields B. Sol owns registration
 * at the end of the branch pipeline, generated review notes, Museum reconciliation,
 * and release integration. This module deliberately has no import from branches.ts.
 */
const reviewedOn = '2026-08-10';
const reviewIds = [
  'existentialism',
  'phenomenology',
  'pragmatism',
  'analytic-philosophy',
  'continental-philosophy',
  'ancient-greek',
  'chinese-philosophy',
] as const;
type ReviewId = (typeof reviewIds)[number];

const reviewLocks: Record<ReviewId, string> = {
  existentialism: 'fnv1a64:881ec4b853f6c73e',
  phenomenology: 'fnv1a64:03cd9623d7e277f6',
  pragmatism: 'fnv1a64:f9b594c2730739db',
  'analytic-philosophy': 'fnv1a64:f7f31a1d6354759b',
  'continental-philosophy': 'fnv1a64:ef74afb9a56fa5e5',
  'ancient-greek': 'fnv1a64:9e7926250d960243',
  'chinese-philosophy': 'fnv1a64:013c04c2f91e12bc',
};

const c = (sourceId: string, kind: CitationLocatorKind, value: string, note?: string): CitationReference =>
  cite(sourceId, kind, value, note);

const source = (entry: Omit<EditorialSource, 'accessedOn'>): EditorialSource => ({
  ...entry,
  accessedOn: reviewedOn,
});

const sep = (
  id: string,
  authors: string[],
  title: string,
  url: string,
  note: string,
  year?: number,
): EditorialSource => source({
  id,
  type: 'scholarly-reference',
  authors,
  title,
  containerTitle: 'The Stanford Encyclopedia of Philosophy',
  editors: ['Edward N. Zalta', 'Uri Nodelman'],
  publisher: 'Metaphysics Research Lab, Stanford University',
  ...(year ? {year} : {}),
  url,
  note,
});

const iep = (
  id: string,
  authors: string[],
  title: string,
  url: string,
  note: string,
): EditorialSource => source({
  id,
  type: 'scholarly-reference',
  authors,
  title,
  containerTitle: 'Internet Encyclopedia of Philosophy',
  publisher: 'Internet Encyclopedia of Philosophy',
  url,
  note,
});

const primary = (
  id: string,
  authors: string[],
  title: string,
  publisher: string,
  year: number,
  url: string,
  note: string,
): EditorialSource => source({id, type: 'primary-text', authors, title, publisher, year, url, note});

const book = (
  id: string,
  authors: string[],
  title: string,
  publisher: string,
  year: number,
  url: string,
  note: string,
): EditorialSource => source({id, type: 'scholarly-book', authors, title, publisher, year, url, note});

const concept = (
  id: string,
  name: string,
  plainDefinition: string,
  deeperExplanation: string,
  example: string,
  relatedConceptIds: string[] = [],
): KeyConcept => ({id, name, plainDefinition, deeperExplanation, example, relatedConceptIds});

type Profile = {
  sources: EditorialSource[];
  defaultCitations: CitationReference[];
  sectionCitations?: Record<string, CitationReference[]>;
  patch: Omit<Partial<Branch>, 'id' | 'articleSections' | 'editorial'>;
  edits?: Record<string, Record<number, string>>;
};

const existentialismSources: EditorialSource[] = [
  sep('exi-sep', ['Kevin Aho'], 'Existentialism', 'https://plato.stanford.edu/entries/existentialism/', 'Specialist account of the historically situated movement, its earlier sources, freedom, authenticity, ethics, and contemporary transformations.', 2023),
  iep('exi-iep', ['Douglas Burnham', 'George Papandreopoulos'], 'Existentialism', 'https://iep.utm.edu/existent/', 'Independent overview used to distinguish the movement’s heterogeneous figures, questions, and debates.'),
  primary('exi-sartre', ['Jean-Paul Sartre'], 'Being and Nothingness: An Essay on Phenomenological Ontology', 'Routledge', 2003, 'https://archive.org/details/beingnothingness0000sart', 'Hazel E. Barnes translation. Cited by part and chapter for facticity, bad faith, freedom, and relations with others; it is not a complete account of every existential project.'),
  primary('exi-beauvoir', ['Simone de Beauvoir'], 'The Ethics of Ambiguity', 'Citadel Press', 1962, 'https://archive.org/details/ethicsofambiguit0000unse', 'Bernard Frechtman translation. Cited by part and chapter for ambiguity, reciprocity, oppression, and the ethical stakes of freedom.'),
  primary('exi-camus', ['Albert Camus'], 'The Myth of Sisyphus', 'Vintage', 2018, 'https://www.penguinrandomhouse.ca/books/23470/the-myth-of-sisyphus-by-albert-camus/9780525564454', 'Justin O’Brien translation. Cited by essay chapter for absurdity and revolt, while preserving Camus’s rejection of the existentialist label.'),
];

const phenomenologySources: EditorialSource[] = [
  sep('phe-sep', ['David Woodruff Smith'], 'Phenomenology', 'https://plato.stanford.edu/entries/phenomenology/', 'Specialist survey of phenomenology as both a field and a historical movement, including intentionality, method, variants, and links to philosophy of mind.', 2013),
  iep('phe-iep', ['Joel Smith'], 'Phenomenology', 'https://iep.utm.edu/phenom/', 'Independent account of the historical movement, intentionality, reduction, and the distinct projects of Husserl, Heidegger, Sartre, and Merleau-Ponty.'),
  primary('phe-husserl', ['Edmund Husserl'], 'Ideas Pertaining to a Pure Phenomenology and to a Phenomenological Philosophy, First Book', 'Martinus Nijhoff', 1983, 'https://archive.org/details/ideaspertainingt0000huss', 'F. Kersten translation, cited by section for epoché, reduction, intentionality, and constitution; later Husserlian work is not silently collapsed into this 1913 book.'),
  primary('phe-merleau', ['Maurice Merleau-Ponty'], 'Phenomenology of Perception', 'Routledge', 2012, 'https://www.routledge.com/Phenomenology-of-Perception/Merleau-Ponty/p/book/9780415834339', 'Donald A. Landes translation, cited by preface and part for embodiment, body schema, perceptual faith, and practical orientation.'),
];

const pragmatismSources: EditorialSource[] = [
  sep('pra-sep', ['Catherine Legg', 'Christopher Hookway'], 'Pragmatism', 'https://plato.stanford.edu/entries/pragmatism/', 'Specialist overview for the movement’s United States history, Peirce’s maxim, James, truth, inquiry, experience, and contemporary extensions.', 2024),
  iep('pra-iep', ['Douglas McDermid'], 'Pragmatism', 'https://iep.utm.edu/pragmati/', 'Independent overview used to distinguish competing pragmatist accounts of truth, realism, empiricism, and inquiry.'),
  primary('pra-peirce', ['Charles S. Peirce'], 'Writings of Charles S. Peirce: A Chronological Edition, Volume 3, 1872–1878', 'Indiana University Press', 1986, 'https://iupress.org/9780253016652/writings-of-charles-s-peirce-a-chronological-edition-volume-3/', 'Critical edition for “The Fixation of Belief” and “How to Make Our Ideas Clear”; locators use the named essays rather than unstable page references.'),
  primary('pra-james', ['William James'], 'Pragmatism: A New Name for Some Old Ways of Thinking', 'Project Gutenberg', 1907, 'https://www.gutenberg.org/ebooks/5116', 'Cited by lecture for the pragmatic method, truth, pluralism, and the difference between James and Peirce.'),
  primary('pra-dewey', ['John Dewey'], 'The Public and Its Problems', 'Project Gutenberg', 1927, 'https://www.gutenberg.org/ebooks/71000', 'Cited by chapter for publics, indirect consequences, communication, and democracy; it does not exhaust Dewey’s theory of inquiry or education.'),
];

const analyticSources: EditorialSource[] = [
  iep('ana-iep', ['Aaron Preston'], 'Analytic Philosophy', 'https://iep.utm.edu/analytic-philosophy/', 'Independent historical account used for competing origin stories, logical analysis, logical positivism, ordinary-language philosophy, and later disciplinary pluralism.'),
  sep('ana-analysis-sep', ['Michael Beaney'], 'Analysis', 'https://plato.stanford.edu/entries/analysis/', 'Specialist methodological history used to avoid equating analytic philosophy with one timeless, decompositional procedure or a single geographic bloc.', 2024),
  primary('ana-frege', ['Gottlob Frege'], 'On Sense and Reference', 'Zeitschrift für Philosophie und philosophische Kritik', 1892, 'https://www.marxists.org/reference/subject/philosophy/works/ge/frege.htm', 'Primary source for sense and reference, cited by essay; Frege’s place in a later analytic origin narrative remains historically contested.'),
  primary('ana-wittgenstein', ['Ludwig Wittgenstein'], 'Philosophical Investigations', 'Wiley', 2010, 'https://books.google.com/books?id=vGXWRovhS44C', 'Fourth revised bilingual edition, cited by section for language-games, meaning in use, and rule-following; it was published posthumously and should not be made representative of the entire tradition.'),
];

const continentalSources: EditorialSource[] = [
  sep('con-feminism-sep', ['Ann V. Murphy', 'Gayle M. Salamon'], 'Continental Feminism', 'https://plato.stanford.edu/entries/femapproach-continental/', 'Specialist source for the retrospective, institutionally shaped continental umbrella and for feminist criticism and transformation of its familiar genealogies.', 2025),
  iep('con-iep-category', ['Internet Encyclopedia of Philosophy'], 'Continental Philosophy topic archive', 'https://iep.utm.edu/category/continental/', 'Curated professional-philosopher archive used only to check the diversity of movements and figures conventionally collected by the modern label; it is not treated as a definition of a unified school.'),
  book('con-companion', ['Simon Critchley', 'William R. Schroeder'], 'A Companion to Continental Philosophy', 'Blackwell Publishing', 1998, 'https://onlinelibrary.wiley.com/doi/book/10.1002/9781405164538', 'Scholarly collection used for the distinct genealogies of phenomenology, hermeneutics, critical theory, structuralism, post-structuralism, and deconstruction.'),
  primary('con-hegel', ['G. W. F. Hegel'], 'The Phenomenology of Spirit', 'Cambridge University Press', 2018, 'https://www.cambridge.org/core/books/georg-wilhelm-friedrich-hegel-the-phenomenology-of-spirit/6FEDB42FDEF2E5FF97FEAE0EEEDABE8E', 'Cited by named division to ground the Hegelian inheritance without treating Hegel as a self-described continental philosopher.'),
];

const ancientGreekSources: EditorialSource[] = [
  iep('grk-iep', ['Jacob N. Graham'], 'Ancient Greek Philosophy', 'https://iep.utm.edu/ancient-greek-philosophy/', 'Independent chronological survey used for the fragmentary evidence, Presocratic, Classical, Hellenistic, Roman, and late-antique phases.'),
  sep('grk-presocratics-sep', ['Patricia Curd'], 'Presocratic Philosophy', 'https://plato.stanford.edu/entries/presocratics/', 'Specialist source for early Greek evidence, testimony, fragments, chronology, and the dangers of a simple myth-to-reason origin story.', 2019),
  sep('grk-stoicism-sep', ['Marion Durand', 'Simon Shogry', 'Dirk Baltzly'], 'Stoicism', 'https://plato.stanford.edu/entries/stoicism/', 'Specialist account used for the Hellenistic school’s logic, physics, ethics, source loss, Roman development, and reception.', 2023),
  primary('grk-plato', ['Plato'], 'Selected Dialogues', 'Perseus Digital Library', 1925, 'https://www.perseus.tufts.edu/hopper/collection?collection=Perseus:collection:Greco-Roman', 'Primary collection cited by Stephanus divisions; dialogue speakers and dramatic setting are not automatically Plato’s settled authorial doctrine.'),
  primary('grk-aristotle', ['Aristotle'], 'Selected Treatises', 'Perseus Digital Library', 1926, 'https://www.perseus.tufts.edu/hopper/collection?collection=Perseus:collection:Greco-Roman', 'Primary collection cited by Bekker divisions; surviving treatises have layered pedagogical and editorial histories.'),
];

const chineseSources: EditorialSource[] = [
  sep('chi-metaphysics-sep', ['Franklin Perkins'], 'Metaphysics in Chinese Philosophy', 'https://plato.stanford.edu/entries/chinese-metaphysics/', 'Specialist treatment of cross-cultural category cautions, cosmogony, dao, qi, yin-yang, Buddhist developments, and Song-Ming debates.', 2023),
  sep('chi-han-sep', ['Alexus McLeod'], 'Philosophy in Han Dynasty China', 'https://plato.stanford.edu/entries/han-dynasty/', 'Specialist account of imperial institutions, retrospective school categories, commentarial traditions, and transformations after the Warring States period.', 2022),
  book('chi-lai', ['Karyn Lai'], 'An Introduction to Chinese Philosophy: From Ancient Philosophy to Chinese Buddhism', 'Cambridge University Press', 2017, 'https://www.cambridge.org/core/books/an-introduction-to-chinese-philosophy/0E0FAD66FE81193A1C98AA1DBB21E490', 'Scholarly overview used to check major classical arguments, later developments, and the limits of reducing Chinese thought to a single doctrine or “harmony” formula.'),
  primary('chi-ctext', ['Chinese Text Project'], 'Classical Chinese philosophical texts', 'Chinese Text Project', 2026, 'https://ctext.org/', 'Searchable witnesses and translations for the Analects, Mencius, Xunzi, Mozi, Daodejing, Zhuangzi, and Han Feizi; cited by work and chapter, with transmission and authorship cautions retained.'),
];

const all = (...citations: CitationReference[]) => citations;

const profiles: Record<ReviewId, Profile> = {
  existentialism: {
    sources: existentialismSources,
    defaultCitations: all(c('exi-sep', 'section', '§§1–7'), c('exi-iep', 'section', '§§1–6')),
    sectionCitations: {
      overview: all(c('exi-sep', 'section', 'Introduction; §§1–5'), c('exi-iep', 'section', 'Introduction; §1')),
      development: all(c('exi-sep', 'section', '§§1–2, 4–7'), c('exi-iep', 'section', '§§1–3'), c('exi-camus', 'work', 'Whole work')),
      concepts: all(c('exi-sartre', 'book-chapter', 'Parts I, III, and IV'), c('exi-beauvoir', 'chapter', 'Parts I–III'), c('exi-camus', 'chapter', 'The Absurd Man and The Myth of Sisyphus')),
      'figures-works': all(c('exi-sep', 'section', '§§2–6'), c('exi-sartre', 'work', 'Whole work'), c('exi-beauvoir', 'work', 'Whole work'), c('exi-camus', 'work', 'Whole work')),
      debates: all(c('exi-sep', 'section', '§§5–7'), c('exi-iep', 'section', '§§3–6'), c('exi-beauvoir', 'chapter', 'Parts I–III')),
      'reading-path': all(c('exi-sep', 'section', 'Bibliography'), c('exi-iep', 'section', 'Primary Bibliography'), c('exi-sartre', 'work', 'Whole work'), c('exi-beauvoir', 'work', 'Whole work'), c('exi-camus', 'work', 'Whole work')),
    },
    patch: {
      category: 'Retrospective movement and family of projects',
      shortDefinition: 'A heterogeneous twentieth-century movement and wider family of projects that treats finite, situated existence, freedom, anxiety, responsibility, meaning, and relation to others as irreducible philosophical problems.',
      oneSentencePurpose: 'Asks how people can answer for commitments amid mortality, uncertainty, social constraint, and the absence of any single script that settles a life in advance.',
      beginnerExplanation: 'Existentialism asks how a person can live responsibly when no role, tradition, theory, or institution supplies a complete answer. Its thinkers disagree sharply about faith, value, freedom, oppression, and political action.',
      coreQuestions: ['How can finite, embodied people take responsibility for commitments whose outcome is uncertain?', 'What do freedom and authenticity mean within facticity, social power, and relations with others?', 'Can existential freedom support ethics, solidarity, and political criticism without a pre-given moral script?'],
      whyItMatters: 'It makes familiar stories about choice, identity, responsibility, anxiety, and meaning answerable to bodies, histories, institutions, unequal possibilities, and the claims of other people.',
      originPeriod: 'Nineteenth-century precursors and a named twentieth-century French movement',
      roughStartYear: 1943,
      historicalDevelopment: ['Kierkegaard and Nietzsche became decisive retrospective sources while differing radically about faith, value, history, and selfhood.', 'Husserlian and Heideggerian phenomenology supplied methods that Sartre, Beauvoir, Merleau-Ponty, and others transformed rather than merely applied.', 'The postwar French movement put freedom, responsibility, literature, ethics, political engagement, and social situation in public view.', 'Later existential and critical phenomenological work reworks these questions around racialization, colonialism, gender, disability, medicine, and collective crisis.'],
      keyConcepts: [
        concept('situated-freedom', 'Situated freedom', 'Agency exercised from within a body, history, social position, and field of possibilities one did not wholly choose.', 'Freedom is neither unlimited control nor a passive effect of circumstances. Existential thinkers disagree about the balance, but responsibility has to be read with facticity and power.', 'A worker can contest an unjust policy while recognizing that wages, disability, care obligations, and law constrain the available options.', ['facticity', 'authenticity']),
        concept('facticity', 'Facticity', 'The unchosen conditions—body, past, language, relationships, institutions, and situation—from which a person acts.', 'Facticity is not fate. It names the resistant conditions that make a project concrete and also prevent freedom from becoming an excuse to blame people for oppression.', 'An inherited language may enable communication while also carrying social categories one must critically negotiate.', ['situated-freedom', 'bad-faith']),
        concept('absurd', 'The absurd', 'Camus’s name for the confrontation between a demand for intelligibility and a world that supplies no final guarantee.', 'The absurd is a relation, not a property of the world alone and not a proof that nothing matters. Camus links lucidity to revolt and limits.', 'Continuing a shared project without treating success as cosmically guaranteed.', ['authenticity']),
      ],
      relatedBranchIds: ['phenomenology', 'continental-philosophy', 'ethics', 'philosophy-of-religion', 'feminist-philosophy'],
      commonMisunderstandings: ['Existentialism is not a single doctrine, an endorsement of despair, or the claim that nothing matters.', 'Freedom does not mean that bodies, histories, oppression, or institutions can be escaped by choosing hard enough.', 'Kierkegaard and Nietzsche are retrospective precursors; Camus rejected the existentialist label; Beauvoir is not merely Sartre’s follower.'],
      modernExamples: ['Taking responsibility inside a professional system without pretending its constraints remove all judgment.', 'Describing illness, disability, and climate anxiety without converting collective conditions into private tests of authenticity.', 'Testing whether political revolt can resist domination without treating any promised future as a license for violence.'],
      originStory: '“Existentialism” names an historically situated postwar movement and a broader retrospective family resemblance, not a doctrine with one founder. Its central figures use different genres and defend incompatible religious, metaphysical, political, and ethical commitments.',
      internalTensions: ['Religious existentialism and atheist or non-theistic accounts of meaning differ over transcendence, guilt, hope, and commitment.', 'Accounts of radical freedom must answer to facticity, oppression, embodiment, scarcity, and institutions.', 'Sartre’s conflictual account of others, Beauvoir’s reciprocity, and Levinas’s ethical priority of the other are not interchangeable.', 'Political engagement, Marxism, anticolonial struggle, and violence test whether existential categories can describe collective structures without romanticizing individual decision.'],
    },
    edits: {
      overview: {
        1: 'The label needs historical care. Kierkegaard and Nietzsche wrote before existentialism became a named twentieth-century movement and are better treated as decisive precursors or sources than as members of one later school. Heidegger’s analysis of existence deeply shaped the movement but he rejected Sartre’s humanist formulation. Sartre and Beauvoir worked within the French existentialist moment while developing distinct positions. Camus was closely associated with its questions and social world but rejected the existentialist label; his philosophy of absurdity and revolt should not be silently absorbed into Sartre’s project.',
      },
    },
  },
  phenomenology: {
    sources: phenomenologySources,
    defaultCitations: all(c('phe-sep', 'section', '§§1–7'), c('phe-iep', 'section', 'Introduction; §§1–4')),
    sectionCitations: {
      overview: all(c('phe-sep', 'section', '§§1–4'), c('phe-iep', 'section', 'Introduction; §1')),
      development: all(c('phe-sep', 'section', '§§3–5'), c('phe-iep', 'section', '§§1–4'), c('phe-husserl', 'standard-division', '§§27–65'), c('phe-merleau', 'work', 'Preface and Part I')),
      concepts: all(c('phe-husserl', 'standard-division', '§§27–65'), c('phe-sep', 'section', '§§1–2'), c('phe-merleau', 'work', 'Preface and Part I')),
      'figures-works': all(c('phe-sep', 'section', '§§3–5'), c('phe-iep', 'section', '§§1–4'), c('phe-husserl', 'work', 'Whole work'), c('phe-merleau', 'work', 'Whole work')),
      debates: all(c('phe-sep', 'section', '§§2, 4–7'), c('phe-iep', 'section', '§§2–4'), c('phe-husserl', 'standard-division', '§§27–65')),
      'reading-path': all(c('phe-sep', 'section', 'Bibliography'), c('phe-iep', 'section', 'References and Further Reading'), c('phe-husserl', 'standard-division', '§§27–65'), c('phe-merleau', 'work', 'Preface and Part I')),
    },
    patch: {
      category: 'Field and family of philosophical methods',
      shortDefinition: 'A family of methods and historical projects that investigates the structures through which objects, others, bodies, time, and worlds become meaningful in experience.',
      oneSentencePurpose: 'Describes and interrogates lived sense-making without reducing experience either to private feeling or to an explanatory inventory of external causes.',
      beginnerExplanation: 'Phenomenology asks how things appear as meaningful in experience: as tools, memories, threats, possibilities, other people, or parts of a shared world. It uses disciplined description, not a diary of feelings or a rejection of science.',
      coreQuestions: ['How are objects, others, time, body, and world given as meaningful in experience?', 'What does phenomenological reduction suspend, and does it support realism, transcendental idealism, or neither?', 'How do social power, history, embodiment, and interpretation shape what can appear or be described?'],
      whyItMatters: 'It exposes the background practices, bodily capacities, historical assumptions, and social orientations that make a world intelligible before formal theory or measurement begins.',
      originPeriod: 'Early twentieth-century movement, with earlier philosophical uses of “phenomenology”',
      roughStartYear: 1900,
      historicalDevelopment: ['Husserl’s Logical Investigations and later work make intentionality, evidence, reduction, constitution, intersubjectivity, and lifeworld central to a modern project.', 'Heidegger redirects phenomenology toward being-in-the-world, while Sartre, Beauvoir, and Merleau-Ponty transform it through freedom, situation, embodiment, and social relation.', 'Hermeneutic, ethical, and critical phenomenologies contest a neutral or self-enclosed starting point.', 'Medical, disability, race, feminist, technological, and environmental work develops different methods and standards rather than applying a single procedure to new topics.'],
      keyConcepts: [
        concept('intentionality', 'Intentionality', 'The directedness of consciousness or experience toward something.', 'Intentionality does not mean intending to act, and it does not guarantee that an intended object exists as it appears. It distinguishes perception, memory, imagination, desire, and hallucination.', 'A remembered room and a currently perceived room can concern the same room while presenting it in different modes.', ['lifeworld', 'epoché']),
        concept('epoché', 'Epoché and reduction', 'A suspension of the ordinary assumption that the world’s existence is simply settled, undertaken to study how claims and objects acquire sense.', 'Bracketing does not deny the world. Husserl’s reduction is contested because accounts of constitution can look idealist, realist, or methodologically prior to that opposition.', 'Instead of asking whether a chair exists, ask how a chair is experienced as a stable, revisitable object.', ['intentionality']),
        concept('lifeworld', 'Lifeworld', 'The meaningful, practical world already presupposed by scientific and theoretical abstraction.', 'The lifeworld is not an anti-scientific alternative. It marks the embodied, social, and historical field from which abstract measurement takes its sense.', 'A room first appears as navigable and familiar before it is represented as coordinates or physical quantities.', ['intentionality']),
      ],
      relatedBranchIds: ['existentialism', 'continental-philosophy', 'philosophy-of-mind', 'feminist-philosophy', 'ethics'],
      majorPhilosopherIds: ['husserl', 'heidegger', 'sartre', 'beauvoir', 'merleau-ponty', 'levinas'],
      commonMisunderstandings: ['Phenomenology is not unstructured introspection or a report of private feelings.', 'The epoché does not deny that the world exists.', 'Description of lived experience does not replace causal explanation or reject natural science.', 'Husserl, Heidegger, Beauvoir, Merleau-Ponty, and Levinas pursue distinct and sometimes critical projects.'],
      modernExamples: ['Clarifying how illness or disability changes time, space, dependence, and practical possibility.', 'Showing how interfaces and remote communication reorganize attention, memory, and presence.', 'Testing how racialization, gender, colonial history, and public space become lived orientations rather than merely external facts.'],
      originStory: 'Modern phenomenology was established through Husserl’s work but rapidly became a contested field. Later philosophers disagree over whether consciousness, being-in-the-world, embodiment, ethical relation, historical interpretation, or critical situation should be the methodological beginning.',
      internalTensions: ['Does reduction yield transcendental idealism, refined realism, or a method that precedes that choice?', 'Does phenomenology begin with consciousness, practical world-involvement, embodied skill, historical interpretation, or ethical alterity?', 'Can first-person description identify structural power without treating a local standpoint as universal?', 'How should phenomenological accounts and cognitive, neurological, or social-scientific explanations constrain one another?'],
    },
    edits: {
      overview: {
        1: 'Husserl’s work was foundational for the modern phenomenological movement, but later figures transformed its starting point and method. Heidegger shifted from an analysis centered on consciousness to being-in-the-world and the question of being. Sartre and Beauvoir used phenomenological description to study freedom, bad faith, otherness, and oppression. Merleau-Ponty made embodied perception central. Levinas inherited and criticized phenomenology by arguing that ethical responsibility to the other exceeds attempts to contain alterity within the knower’s horizons. Later phenomenologies extend these methods into medicine, technology, race, gender, disability, and environmental experience.',
      },
    },
  },
  pragmatism: {
    sources: pragmatismSources,
    defaultCitations: all(c('pra-sep', 'section', '§§1–5'), c('pra-iep', 'section', '§§1–3')),
    sectionCitations: {
      overview: all(c('pra-sep', 'section', 'Introduction; §§1–4'), c('pra-iep', 'section', 'Introduction; §1')),
      'historical-development': all(c('pra-sep', 'section', '§1'), c('pra-peirce', 'work', 'The Fixation of Belief and How to Make Our Ideas Clear'), c('pra-james', 'chapter', 'Lectures I–II and VI'), c('pra-dewey', 'work', 'Whole work')),
      'pragmatic-maxim': all(c('pra-peirce', 'work', 'How to Make Our Ideas Clear'), c('pra-sep', 'section', '§2.1')),
      james: all(c('pra-james', 'chapter', 'Lectures II and VI'), c('pra-sep', 'section', '§§2.2, 3.2, 4.3')),
      dewey: all(c('pra-dewey', 'chapter', 'Chapters I–IV'), c('pra-sep', 'section', '§§1.1, 4.2, 5.2–5.4')),
      concepts: all(c('pra-sep', 'section', '§§2–4'), c('pra-iep', 'section', '§§1–3'), c('pra-peirce', 'work', 'The Fixation of Belief')),
      'internal-debates': all(c('pra-sep', 'section', '§§2–5'), c('pra-iep', 'section', '§§2–3'), c('pra-james', 'chapter', 'Lectures VI–VII')),
      neighbors: all(c('pra-sep', 'section', '§§4–5'), c('pra-iep', 'section', '§§1–3'), c('pra-dewey', 'chapter', 'Chapters I–IV')),
      'reading-path': all(c('pra-peirce', 'work', 'The Fixation of Belief and How to Make Our Ideas Clear'), c('pra-james', 'work', 'Whole work'), c('pra-dewey', 'work', 'Whole work'), c('pra-sep', 'section', 'Bibliography')),
    },
    patch: {
      category: 'Tradition',
      shortDefinition: 'A plural philosophical tradition that treats knowing as inseparable from agency, inquiry, experience, signs, habits, consequences, and correction within a world that resists wishful belief.',
      oneSentencePurpose: 'Tests what concepts, beliefs, and methods mean by tracing their practical bearings while asking how inquiry can remain fallible, public, answerable to evidence, and ethically responsible.',
      beginnerExplanation: 'Pragmatism asks what difference an idea makes in inquiry and life. It does not say that a claim becomes true merely because it is profitable, comforting, popular, or useful for one person today.',
      coreQuestions: ['How do a concept’s conceivable practical bearings clarify its meaning?', 'How can fallible inquiry be publicly corrected without requiring infallible foundations?', 'What makes attention to consequences responsible experimentation rather than short-term expediency?', 'How do power and exclusion shape whose experience counts in communities of inquiry?'],
      whyItMatters: 'It connects meaning and truth to habits of inquiry, testing, social participation, and the consequences borne by affected people—questions that matter in science, education, democracy, technology, and ordinary judgment.',
      originPeriod: 'Late nineteenth-century United States, with later transnational transformations',
      roughStartYear: 1877,
      historicalDevelopment: ['Peirce connects doubt, belief, habit, signs, and scientific inquiry, then formulates the pragmatic maxim as a rule for clarifying intellectual concepts.', 'James popularizes pragmatism while developing pluralism, radical empiricism, psychology, religious inquiry, and a distinct, controversial account of truth.', 'Dewey, Addams, Mead, Du Bois, Locke, and related interlocutors extend experimental inquiry into education, democracy, social reform, race, art, and institutions.', 'Later reconstructions by Rorty, Putnam, Brandom, feminist, anti-racist, ecological, and democratic pragmatists preserve no single “neo-pragmatist” doctrine.'],
      keyConcepts: [
        concept('pragmatic-maxim', 'Pragmatic maxim', 'Peirce’s rule for clarifying a concept by tracing its conceivable practical bearings.', 'The maxim tests a concept’s inferential and experiential consequences. It is not a consumer test asking whether belief feels useful.', 'If two hypotheses imply no possible difference in observation, inference, or practice, ask whether their disagreement has clear content.', ['inquiry', 'fallibilism']),
        concept('fallibilism', 'Fallibilism', 'The view that well-supported conclusions can remain open to correction.', 'Fallibilism neither makes all beliefs equally doubtful nor requires inaction. It asks for methods that expose claims to evidence and criticism.', 'A public-health policy can be revised after new evidence without treating all prior evidence as worthless.', ['inquiry']),
        concept('inquiry', 'Inquiry', 'A disciplined response to a genuine problem through hypotheses, testing, consequences, and correction.', 'Peirce, James, and Dewey develop different accounts, but each rejects both private certainty and arbitrary decision as adequate models of knowledge.', 'A school revises an assessment practice after comparing outcomes, listening to affected students, and testing alternative designs.', ['pragmatic-maxim', 'fallibilism']),
      ],
      relatedBranchIds: ['epistemology', 'philosophy-of-science', 'ethics', 'political-philosophy', 'analytic-philosophy', 'feminist-philosophy'],
      commonMisunderstandings: ['Pragmatism is not “whatever works” for a person or institution in the short term.', 'It is not a single theory of truth, a rejection of logic, or an excuse to abandon principles.', 'Peirce, James, Dewey, and later pragmatists are not interchangeable.'],
      modernExamples: ['Designing public policies that expose their own assumptions to evidence, dissent, and revision rather than treating one metric as the whole public good.', 'Auditing automated classifications through affected experience, counterfactual testing, appeal, and institutional accountability.', 'Treating inquiry-based education as guided, sequenced reconstruction of experience rather than unguided activity.'],
      originStory: 'Pragmatism took recognizable form in late-nineteenth-century United States debates about logic, science, evolution, psychology, belief, and community. Peirce coined a clarifying maxim; James broadened its experiential range; Dewey and social pragmatists extended inquiry into education and democratic life.',
      internalTensions: ['Is the pragmatic maxim a logical rule for conceptual clarification or a wider way of evaluating philosophical options?', 'Do Peirce’s long-run inquiry, James’s verification, and Dewey’s warranted assertibility describe truth, entitlement, or related but distinct questions?', 'How can pragmatism preserve realism and objective constraint while rejecting a view from nowhere?', 'How can communities of inquiry correct themselves when power determines which harms, testimonies, and problems become visible?'],
    },
    edits: {
      'historical-development': {
        0: 'Pragmatism took recognizable form in 1870s discussions often associated with the Metaphysical Club in Cambridge, Massachusetts. Peirce’s essays “The Fixation of Belief” and “How to Make Our Ideas Clear” connect belief to habit, doubt to disrupted conduct, inquiry to the attempt to settle doubt, and conceptual clarity to conceivable practical bearings. His pragmatic maxim is first a rule for clarifying intellectual concepts, embedded in work on logic, signs, probability, and scientific method. Peirce later used “pragmaticism” to distinguish his position from looser appropriations. He emphasizes fallibilism, the public character of signs and reasons, and a community of inquiry whose investigations need not terminate in the opinions any person presently prefers.',
      },
    },
  },
  'analytic-philosophy': {
    sources: analyticSources,
    defaultCitations: all(c('ana-iep', 'section', 'Introduction; §§1–5'), c('ana-analysis-sep', 'section', '§§1, 6–7')),
    sectionCitations: {
      category: all(c('ana-iep', 'section', 'Introduction'), c('ana-analysis-sep', 'section', '§§1, 6–7')),
      contexts: all(c('ana-iep', 'section', '§§1–2'), c('ana-analysis-sep', 'section', '§6')),
      'early-analysis': all(c('ana-frege', 'work', 'Whole essay'), c('ana-iep', 'section', '§§1–2'), c('ana-analysis-sep', 'section', '§6')),
      'logical-empiricism': all(c('ana-iep', 'section', '§3'), c('ana-analysis-sep', 'section', '§6')),
      'ordinary-language': all(c('ana-wittgenstein', 'standard-division', '§§1–88, 138–242'), c('ana-iep', 'section', '§4')),
      'quine-and-after': all(c('ana-iep', 'section', '§5'), c('ana-analysis-sep', 'section', '§§6–7')),
      'modality-metaphysics': all(c('ana-iep', 'section', '§5.2'), c('ana-analysis-sep', 'section', '§6')),
      'normative-social': all(c('ana-iep', 'section', '§5'), c('ana-analysis-sep', 'section', '§7')),
      methods: all(c('ana-analysis-sep', 'section', '§§1, 6–7'), c('ana-iep', 'section', 'Introduction; §5')),
      boundaries: all(c('ana-iep', 'section', 'Introduction; §§1, 5'), c('ana-analysis-sep', 'section', '§§1, 7')),
      'institutions-future': all(c('ana-iep', 'section', '§5'), c('ana-analysis-sep', 'section', '§7')),
      reading: all(c('ana-frege', 'work', 'Whole essay'), c('ana-wittgenstein', 'standard-division', '§§1–88'), c('ana-iep', 'section', 'References and Further Reading'), c('ana-analysis-sep', 'section', 'Annotated Bibliography')),
    },
    patch: {
      category: 'Retrospective modern tradition of methods, institutions, and problems',
      shortDefinition: 'A contested family of twentieth- and twenty-first-century philosophical lineages whose methods often emphasize explicit argument, logical or conceptual analysis, linguistic attention, and interaction with formal or empirical inquiry.',
      oneSentencePurpose: 'Uses diverse forms of analysis to make philosophical commitments, inferences, language, evidence, and disagreement more explicit without assuming that one formal method or subject matter defines the whole tradition.',
      beginnerExplanation: 'Analytic philosophy is not one doctrine or simply “logic philosophy.” It names overlapping methods and institutions that have changed from Frege, Moore, and Russell through logical empiricism and ordinary language philosophy to contemporary work across nearly every field.',
      coreQuestions: ['What, if anything, unifies analytic philosophy beyond a changing family of methods and institutions?', 'What can logical, conceptual, linguistic, formal, experimental, and historical analysis each clarify?', 'How should precision, scope, empirical evidence, and ethical or political responsibility constrain philosophical argument?'],
      whyItMatters: 'Its methods help make assumptions and inferential commitments visible in debates about language, science, mind, ethics, law, politics, race, gender, and technology, while its history warns against mistaking one canon or style for philosophy as such.',
      originPeriod: 'Late nineteenth- and early twentieth-century origins; later global and interdisciplinary expansion',
      roughStartYear: 1892,
      historicalDevelopment: ['Frege’s logic and semantics, along with Moore and Russell’s break with British Idealism, are rival but overlapping origin stories rather than one founding event.', 'Logical atomism and logical empiricism rework analysis through formal language, science, verification, and the critique of traditional metaphysics.', 'Later Wittgenstein and ordinary-language philosophers make use, practice, rule-following, and everyday concepts central targets of philosophical clarification.', 'Post-1960s analytic work includes revived metaphysics, modal logic, mind, language, science, ethics, political philosophy, feminist and critical philosophy, formal methods, experimental work, and historical scholarship.'],
      keyConcepts: [
        concept('logical-analysis', 'Logical analysis', 'A method that reveals a claim’s logical form, sometimes by translating ordinary language into a formal framework.', 'Frege and Russell use logic to expose commitments obscured by grammar. This is one important analytic method, not the definition of everything later called analytic philosophy.', 'A theory of descriptions distinguishes the grammatical surface of “The present king of France is bald” from its quantificational commitments.', ['conceptual-analysis']),
        concept('conceptual-analysis', 'Conceptual analysis', 'Clarification of a concept through distinctions, cases, uses, implications, and competing formulations.', 'Conceptual analysis has many forms and has been criticized from within analytic philosophy. It should not be confused with a mechanical discovery of definitions from an armchair.', 'Compare competing senses of consent before deciding whether a policy standard is adequate.', ['logical-analysis']),
        concept('meaning-use', 'Meaning and use', 'The idea that many philosophical puzzles become clearer by examining how words operate in practices rather than hunting for hidden objects behind them.', 'Later Wittgenstein’s language-games do not deny truth or argument; they redirect attention to criteria, rules, forms of life, and the varied roles of words.', '“Promise” functions differently in legal agreement, friendship, ceremony, and fiction, though these uses can overlap.', ['conceptual-analysis']),
      ],
      relatedBranchIds: ['logic', 'philosophy-of-language', 'philosophy-of-science', 'epistemology', 'philosophy-of-mind', 'ethics', 'political-philosophy', 'pragmatism'],
      contrastingBranchIds: ['continental-philosophy'],
      commonMisunderstandings: ['Analytic philosophy is not only symbolic logic, conceptual analysis, or philosophy of language.', 'Clarity and rigor are contested achievements rather than guarantees of truth or political neutrality.', 'The analytic–continental contrast does not neatly sort geography, topics, rigor, politics, or individual philosophers.'],
      modernExamples: ['Clarifying competing standards of consent, responsibility, and explanation in law and policy.', 'Assessing claims about artificial intelligence with tools from logic, language, mind, epistemology, and ethics.', 'Testing how formal models, testimony, empirical research, and conceptual distinctions should inform public reasoning.'],
      originStory: 'The label gathers overlapping histories around logic, language, analysis, anti-idealism, scientific philosophy, university institutions, and professional styles. Frege, Moore, Russell, Wittgenstein, and the Vienna Circle belong to important narratives, but none provides a single doctrine, uncontested founder list, or universal starting date.',
      internalTensions: ['Should philosophy rely primarily on armchair conceptual work, formal systems, ordinary language, empirical science, experimental methods, or historically situated interpretation?', 'Can metaphysics be rehabilitated after positivist criticism, and what standards should govern it?', 'Are ordinary language and formal logic rival methods or complementary resources?', 'How should analytic institutions address a narrow historical canon and the exclusion of race, gender, colonialism, disability, and global traditions from inherited professional narratives?'],
    },
  },
  'continental-philosophy': {
    sources: continentalSources,
    defaultCitations: all(c('con-feminism-sep', 'section', 'Introduction; §§1–5'), c('con-companion', 'work', 'Introduction and selected movement chapters')),
    sectionCitations: {
      overview: all(c('con-feminism-sep', 'section', 'Introduction'), c('con-iep-category', 'work', 'Topic archive'), c('con-companion', 'work', 'Introduction')),
      'historical-development': all(c('con-companion', 'work', 'Movement chapters'), c('con-feminism-sep', 'section', '§§1–5')),
      'idealism-marx-genealogy': all(c('con-hegel', 'work', 'Introduction and selected consciousness chapters'), c('con-companion', 'work', 'Chapters on German Idealism, Marxism, and Nietzsche')),
      phenomenology: all(c('con-companion', 'work', 'Chapters on phenomenology and hermeneutics'), c('con-feminism-sep', 'section', '§§1–2')),
      existentialism: all(c('con-companion', 'work', 'Chapters on existentialism and phenomenology'), c('con-feminism-sep', 'section', '§§1–3')),
      hermeneutics: all(c('con-companion', 'work', 'Chapter on hermeneutics'), c('con-iep-category', 'work', 'Gadamer and phenomenology entries')),
      'structuralism-poststructuralism': all(c('con-companion', 'work', 'Chapters on structuralism, post-structuralism, and deconstruction'), c('con-iep-category', 'work', 'Deconstruction, Foucault, and postmodernism entries')),
      'critical-theory': all(c('con-companion', 'work', 'Chapter on critical theory'), c('con-iep-category', 'work', 'Frankfurt School and Critical Theory entry')),
      'key-concepts': all(c('con-feminism-sep', 'section', '§§1–5'), c('con-companion', 'work', 'Selected movement chapters')),
      'internal-debates': all(c('con-feminism-sep', 'section', '§§1–5'), c('con-companion', 'work', 'Introduction and selected movement chapters')),
      neighbors: all(c('con-feminism-sep', 'section', 'Introduction; §§1–5'), c('con-iep-category', 'work', 'Topic archive')),
      misconceptions: all(c('con-feminism-sep', 'section', 'Introduction; §§1–5'), c('con-companion', 'work', 'Introduction')),
      'modern-relevance': all(c('con-feminism-sep', 'section', '§§2–5'), c('con-companion', 'work', 'Critical theory, feminist, and post-structuralism chapters')),
      'reading-path': all(c('con-hegel', 'work', 'Introduction and selected consciousness chapters'), c('con-companion', 'work', 'Introduction and movement chapters'), c('con-feminism-sep', 'section', 'Bibliography')),
    },
    patch: {
      category: 'Retrospective, institutionally shaped umbrella',
      shortDefinition: 'A retrospective umbrella for several distinct European and transnational lineages—including phenomenology, existentialism, hermeneutics, Marxism, critical theory, structuralism, genealogy, post-structuralism, deconstruction, feminist, and decolonial critiques—rather than one doctrine or method.',
      oneSentencePurpose: 'Examines how history, embodiment, language, interpretation, production, power, institutions, and social struggle shape experience, knowledge, norms, and the possibilities of critique.',
      beginnerExplanation: '“Continental philosophy” is an imperfect label, used mainly in twentieth-century English-speaking academic contrasts with analytic philosophy. It groups approaches that often share historical sources while disagreeing about method, politics, truth, language, and emancipation.',
      coreQuestions: ['Does this umbrella name a philosophical family or mainly an institutional contrast produced by curricula, language, and professional networks?', 'How do history, embodiment, language, production, interpretation, and power shape what appears natural, rational, or possible?', 'How can critique expose domination without simply assuming the universal standards it is testing?'],
      whyItMatters: 'It provides vocabularies for connecting lived experience to historical institutions and power while forcing any account of reason, freedom, language, technology, gender, race, colonialism, or ecology to confront its exclusions.',
      originPeriod: 'Nineteenth-century sources and twentieth-century academic umbrella',
      roughStartYear: 1900,
      historicalDevelopment: ['German Idealism, Marx, and Nietzsche supply distinct arguments about history, freedom, labor, value, interpretation, and critique; none is simply a “continental” founder.', 'Phenomenology, existentialism, and hermeneutics transform questions about consciousness, world, embodiment, freedom, understanding, and tradition.', 'Frankfurt School critical theory combines philosophy and social research around capitalism, ideology, authoritarianism, culture, reason, and emancipation.', 'Structuralism, genealogy, post-structuralism, deconstruction, feminist, queer, critical race, and decolonial work rework language, discourse, norms, subject formation, difference, and power while challenging the inherited canon itself.'],
      keyConcepts: [
        concept('historicity', 'Historicity', 'The claim that concepts, subjects, institutions, and forms of understanding are shaped by temporal, social, and interpretive histories.', 'Historicity does not by itself discredit a claim. It asks which conditions made it intelligible, authoritative, or contestable and whether alternatives have been excluded.', 'A genealogy of “normality” asks how medical, legal, and educational institutions made the category consequential.', ['critique', 'power']),
        concept('critique', 'Critique', 'A range of practices for examining the conditions, limits, exclusions, and effects of claims, institutions, and forms of life.', 'Critique can be dialectical, phenomenological, hermeneutic, genealogical, Marxist, feminist, or deconstructive. These methods do not share one standard of evidence or one political conclusion.', 'A critique of a platform can connect interface design to labor, surveillance, interpretation, race, gender, and public power.', ['historicity', 'power']),
        concept('power', 'Power and subject formation', 'The ways institutions, practices, material relations, norms, and discourses organize conduct and make kinds of subjects possible.', 'Power is not a single thing held by one ruler, and it does not mean that resistance or truth claims are impossible. Different traditions explain it through production, ideology, recognition, discipline, colonialism, and normativity.', 'A school can make some forms of speech, diagnosis, success, or identity easier to inhabit than others.', ['historicity', 'critique']),
      ],
      relatedBranchIds: ['phenomenology', 'existentialism', 'feminist-philosophy', 'political-philosophy', 'philosophy-of-language', 'philosophy-of-mind', 'marxism', 'german-idealism'],
      contrastingBranchIds: ['analytic-philosophy'],
      majorPhilosopherIds: ['hegel', 'marx', 'nietzsche', 'husserl', 'heidegger', 'sartre', 'beauvoir', 'merleau-ponty', 'gadamer', 'fanon', 'foucault', 'derrida', 'judith-butler'],
      commonMisunderstandings: ['Continental philosophy is not one doctrine, political program, method, or self-chosen identity shared by all listed figures.', 'It is not simply whatever analytic philosophy is not, and geography cannot reliably sort the two.', 'Its thinkers do not uniformly reject logic, science, truth, argument, or clarity; they disagree about what rigor requires.', 'Marxism, critical theory, structuralism, genealogy, and deconstruction are not interchangeable names for social criticism.'],
      modernExamples: ['Analyzing how interface design and infrastructure shape embodiment, attention, labor, memory, and public life.', 'Testing how categories of normality, risk, intelligence, sexuality, citizenship, and health gain institutional authority.', 'Connecting environmental vulnerability to production, colonial history, lived place, and more-than-human relations without treating one theory as exhaustive.'],
      originStory: 'The contemporary label grew largely through twentieth-century Anglophone academic contrasts and collects movements whose figures often did not share an institutional, methodological, or self-descriptive identity. Its usefulness depends on preserving those disagreements and the criticisms that challenge its European canon.',
      internalTensions: ['Can the umbrella be philosophically useful without turning a heterogeneous set of traditions into a false unity?', 'Can historical narration avoid teleology, Eurocentrism, and retrospective necessity?', 'Do phenomenology, hermeneutics, Marxism, genealogy, deconstruction, feminist, and decolonial critique provide compatible standards for truth and normativity?', 'How do embodied agency, discourse, institutions, political economy, colonial history, and social struggle interact without one explanation swallowing the rest?'],
    },
  },
  'ancient-greek': {
    sources: ancientGreekSources,
    defaultCitations: all(c('grk-iep', 'section', 'Introduction; §§1–6'), c('grk-presocratics-sep', 'section', 'Introduction; §§1–4')),
    sectionCitations: {
      overview: all(c('grk-iep', 'section', 'Introduction'), c('grk-presocratics-sep', 'section', 'Introduction')),
      background: all(c('grk-iep', 'section', 'Introduction; §1'), c('grk-presocratics-sep', 'section', 'Introduction; §1')),
      milesians: all(c('grk-iep', 'section', '§1.a'), c('grk-presocratics-sep', 'section', '§§1–2')),
      'pythagorean-eleatic': all(c('grk-iep', 'section', '§§1.c–e'), c('grk-presocratics-sep', 'section', '§§2–3')),
      'pluralists-atomists': all(c('grk-iep', 'section', '§§1.f–g'), c('grk-presocratics-sep', 'section', '§§3–4')),
      sophists: all(c('grk-iep', 'section', '§1.h'), c('grk-plato', 'standard-division', 'Protagoras and Gorgias')),
      'socrates-plato': all(c('grk-iep', 'section', '§§2–3'), c('grk-plato', 'standard-division', 'Apology; Meno; Republic')),
      aristotle: all(c('grk-iep', 'section', '§4'), c('grk-aristotle', 'book-chapter', 'Metaphysics I and VII; Nicomachean Ethics I–II')),
      hellenistic: all(c('grk-iep', 'section', '§5'), c('grk-stoicism-sep', 'section', '§§1–6')),
      'roman-late-antique': all(c('grk-iep', 'section', '§6'), c('grk-stoicism-sep', 'section', '§7')),
      transmission: all(c('grk-iep', 'section', '§§1–6'), c('grk-presocratics-sep', 'section', 'Introduction')),
      tensions: all(c('grk-iep', 'section', '§§1–6'), c('grk-presocratics-sep', 'section', 'Introduction; §§1–4'), c('grk-stoicism-sep', 'section', '§§1–6')),
      reading: all(c('grk-plato', 'work', 'Selected Dialogues'), c('grk-aristotle', 'work', 'Selected Treatises'), c('grk-iep', 'section', 'References and Further Reading')),
    },
    patch: {
      category: 'Historical field and set of contested traditions',
      shortDefinition: 'A diverse body of Greek-language philosophical practices from early cosmological and ethical inquiry through Classical, Hellenistic, Roman, and late-antique schools, known largely through uneven textual transmission and later reception.',
      oneSentencePurpose: 'Follows competing arguments about nature, being, knowledge, soul, virtue, politics, language, causation, and ways of life while making source loss, genre, institutions, slavery, gender, and civic exclusion visible.',
      beginnerExplanation: 'Ancient Greek philosophy is not one doctrine or a clean march from myth to reason. It includes fragmentary early thinkers, dialogues, treatises, schools, letters, Roman adaptations, and late-antique commentaries that argue about what reason, nature, knowledge, and a good life require.',
      coreQuestions: ['What kinds of explanation can account for nature, change, cause, and being?', 'How should inquiry, argument, perception, and education guide claims to knowledge?', 'What makes a life, character, city, or political order good or just, and who was excluded from those questions?', 'How did later schools turn philosophical argument into practices of therapy, community, and way of life?'],
      whyItMatters: 'It supplies influential but disputed arguments and forms—dialogue, aporia, treatise, school curriculum, commentary, and philosophical exercise—while revealing how later histories have selected, translated, and sometimes idealized a deeply unequal ancient world.',
      originPeriod: 'Sixth century BCE through late antiquity; a retrospective historical field',
      roughStartYear: -600,
      historicalDevelopment: ['Early Greek thinkers investigate archai, change, number, being, motion, cosmology, and explanation through surviving fragments and later testimony.', 'Sophists, Socrates, Plato, and Aristotle contest rhetoric, definition, knowledge, virtue, politics, soul, causation, and the organization of inquiry.', 'Hellenistic schools—Academic Skepticism, Pyrrhonism, Stoicism, Epicureanism, Cynicism, and others—develop logic, physics, ethics, therapy, and philosophical ways of life.', 'Roman, Jewish, Christian, Arabic, Byzantine, and later Latin receptions preserve, criticize, translate, transform, and selectively canonize Greek materials; late antiquity is a transformation, not a mere epilogue.'],
      keyConcepts: [
        concept('logos', 'Logos and reason-giving', 'A cluster of Greek terms for account, speech, explanation, reason, and ordering principle.', 'Logos changes across authors and does not mark a simple secular break from myth or religion. Greek philosophers argue over which accounts are explanatory, persuasive, or true.', 'Socrates asks an interlocutor to give a logos of courage rather than merely list courageous acts.', ['physis', 'eudaimonia']),
        concept('physis', 'Physis and nature', 'A term concerning growth, constitution, origin, and the nature of things.', 'Questions about physis link cosmology, biology, change, and normative debate. It should not be equated without remainder to the modern natural sciences.', 'Atomists and Aristotle offer very different accounts of what it is for living things to have natures.', ['logos']),
        concept('eudaimonia', 'Eudaimonia', 'Flourishing or living well across a life, central to several ancient ethical projects.', 'Eudaimonia is not simply private happiness. Rival schools connect it to virtue, pleasure, tranquility, knowledge, nature, community, and political conditions in different ways.', 'Aristotle and the Stoics both make virtue important while disagreeing about external goods and the conditions of flourishing.', ['logos']),
      ],
      relatedBranchIds: ['ethics', 'metaphysics', 'epistemology', 'logic', 'political-philosophy', 'stoicism', 'platonism', 'aristotelianism'],
      majorPhilosopherIds: ['thales', 'anaximander', 'heraclitus', 'parmenides', 'democritus', 'socrates', 'plato', 'aristotle', 'epicurus', 'zeno', 'plotinus'],
      suggestedReadingPath: ['Presocratic fragments and testimony with a critical guide', 'Plato, Apology and Meno', 'Aristotle, Nicomachean Ethics, Books I–II', 'Epicurus, Letter to Menoeceus', 'Epictetus, Enchiridion or Discourses selections', 'Sextus Empiricus, Outlines of Pyrrhonism selections'],
      commonMisunderstandings: ['Ancient Greek philosophy is not a homogeneous “Western” origin story or a single march from myth to rationality.', 'Many early views survive only in later fragments, summaries, and hostile reports.', 'Plato’s dialogue speakers and Aristotle’s surviving treatises must not be read as transparent, context-free doctrine manuals.', 'The civic ideals in many texts coexist with exclusions involving slavery, women, foreigners, labor, and imperial power.'],
      modernExamples: ['Comparing competing accounts of what evidence, explanation, and disagreement can justify.', 'Testing whether a therapeutic philosophy of life can remain ethically and politically responsive.', 'Reading debates about citizenship, education, hierarchy, and law while confronting their historical exclusions rather than extracting neutral slogans.'],
      originStory: 'Later histories often begin with early Ionian natural inquiry, but “ancient Greek philosophy” is a retrospective field rather than one self-conscious movement. Its surviving evidence is uneven, and the familiar sequence from Presocratics to Plato and Aristotle to Hellenistic schools must not erase contemporaneity, cross-cultural exchange, or later transformations.',
      internalTensions: ['Does nature require material, formal, teleological, mathematical, skeptical, or plural explanatory models?', 'Can virtue secure flourishing independently of external goods, politics, and fortune?', 'What can perception, dialectic, logic, testimony, or suspension of judgment contribute to knowledge?', 'How should philosophical criticism of the city relate to civic obligation, education, rhetoric, slavery, gender hierarchy, and imperial power?'],
    },
  },
  'chinese-philosophy': {
    sources: chineseSources,
    defaultCitations: all(c('chi-lai', 'work', 'Chapters 1–10'), c('chi-metaphysics-sep', 'section', '§§1–8')),
    sectionCitations: {
      overview: all(c('chi-lai', 'work', 'Introduction and Chapters 1–10'), c('chi-han-sep', 'section', 'Introduction')),
      'warring-states': all(c('chi-lai', 'work', 'Chapters on Confucian, Mohist, Daoist, and Legalist thought'), c('chi-han-sep', 'section', 'Introduction; §1'), c('chi-ctext', 'work', 'Analects; Mencius; Xunzi; Mozi; Daodejing; Zhuangzi; Han Feizi')),
      'conceptual-vocabularies': all(c('chi-metaphysics-sep', 'section', '§§2–7'), c('chi-lai', 'work', 'Chapters 1–10'), c('chi-ctext', 'work', 'Classical textual witnesses')),
      'figures-texts': all(c('chi-lai', 'work', 'Chapters 1–10'), c('chi-han-sep', 'section', '§§1–6'), c('chi-ctext', 'work', 'Analects; Mencius; Xunzi; Mozi; Daodejing; Zhuangzi; Han Feizi')),
      'internal-debates': all(c('chi-lai', 'work', 'Chapters 1–10'), c('chi-metaphysics-sep', 'section', '§§2–7'), c('chi-ctext', 'work', 'Mencius; Xunzi; Mozi; Zhuangzi; Han Feizi')),
      'historical-transformations': all(c('chi-han-sep', 'section', '§§1–7'), c('chi-metaphysics-sep', 'section', '§§6–8'), c('chi-lai', 'work', 'Later Chinese and Buddhist philosophy chapters')),
      'neighbors-comparison': all(c('chi-metaphysics-sep', 'section', '§§1, 8'), c('chi-lai', 'work', 'Introduction and comparative cautions')),
      misunderstandings: all(c('chi-lai', 'work', 'Introduction and Chapters 1–10'), c('chi-han-sep', 'section', 'Introduction'), c('chi-metaphysics-sep', 'section', '§§1, 8')),
      'modern-relevance': all(c('chi-lai', 'work', 'Introduction and Chapters 1–10'), c('chi-metaphysics-sep', 'section', '§§1, 8')),
      'reading-path': all(c('chi-ctext', 'work', 'Analects; Mencius; Xunzi; Mozi; Daodejing; Zhuangzi; Han Feizi'), c('chi-lai', 'work', 'Chapters 1–10')),
    },
    patch: {
      category: 'Umbrella for historical, linguistic, and transregional traditions',
      shortDefinition: 'An umbrella for diverse philosophical traditions and debates that developed in Chinese historical and linguistic contexts, including but not limited to Confucian, Daoist, Mohist, Legalist, Buddhist, and Song-Ming Confucian projects.',
      oneSentencePurpose: 'Traces arguments about cultivation, relationship, governance, language, knowledge, change, value, pattern, and liberation without turning diverse texts or later institutions into one timeless “Chinese worldview.”',
      beginnerExplanation: 'Chinese philosophy is not a single school or a set of harmonious sayings. It contains sustained disagreements about how people learn, how rulers should govern, how words guide action, what Heaven and nature mean, and how inherited texts should be interpreted.',
      coreQuestions: ['How do learning, ritual, affect, family, role, and institutions shape ethical cultivation?', 'Should political order depend on exemplary character, impartial benefit, minimal interference, or public standards and administrative technique?', 'How do names, distinctions, heart-mind, dao, qi, pattern, change, and practice make knowledge and action possible?', 'How should later thinkers transform classical resources amid Buddhism, empire, scholarship, colonialism, science, revolution, and transregional exchange?'],
      whyItMatters: 'It broadens philosophy’s familiar categories by showing how ethics, politics, metaphysics, language, body, learning, ritual, and cultivation can be interwoven without losing argument, disagreement, or historical specificity.',
      originPeriod: 'Pre-Qin classical debates with imperial, Buddhist, Song-Ming, Qing, modern, and transregional transformations',
      roughStartYear: -500,
      historicalDevelopment: ['Warring States texts associated with Confucian, Mohist, Daoist, and statecraft traditions debate cultivation, war, language, benefit, governance, nature, and social order.', 'Han institutions and later commentators stabilize, revise, and sometimes create the school categories through which earlier texts are now read.', 'Buddhist translation and Chinese Buddhist traditions transform arguments about selfhood, emptiness, consciousness, practice, cosmology, and liberation.', 'Song-Ming Confucian thinkers such as Zhu Xi and Wang Yangming reorganize learning, pattern, qi, heart-mind, knowledge, and action across East Asia.', 'Qing evidential scholarship, nineteenth- and twentieth-century reform, revolution, diaspora, and contemporary Chinese-language philosophy create new problems rather than merely repeating antiquity.'],
      keyConcepts: [
        concept('dao', 'Dao', 'A way, path, teaching, course of conduct, or generative order whose meaning changes by text and historical context.', 'Confucian, Daoist, Mohist, Buddhist, and later writers use dao differently. Translating it simply as “the Way” can conceal whether a text means inherited practice, political order, method, or cosmological process.', 'A Confucian account may treat dao as a cultivated human inheritance; the Daodejing contests attempts to fix it exhaustively in language.', ['li-ritual', 'xin']),
        concept('li-ritual', 'Li: ritual and pattern', 'Two different Chinese terms often rendered li can concern ritual propriety or, in later contexts, pattern or coherence.', 'They should not be fused. Ritual li concerns cultivated, relational practice; later li as pattern belongs to different metaphysical and ethical debates.', 'A reader should ask which character and which historical context is in play before translating li as “principle.”', ['dao', 'xin']),
        concept('xin', 'Xin: heart-mind', 'A term that joins affect, attention, discernment, thought, and moral responsiveness in ways not captured by a simple modern mind/body split.', 'Translating xin as mind, heart, or heart-mind frames the argument differently. Its relations to body, feeling, knowledge, and action remain contested across traditions.', 'Wang Yangming’s discussion of innate knowing makes knowledge and action inseparable without reducing either to private feeling.', ['dao', 'li-ritual']),
      ],
      relatedBranchIds: ['confucianism', 'daoism', 'mohism', 'legalism', 'buddhist-philosophy', 'ethics', 'political-philosophy', 'metaphysics', 'philosophy-of-language'],
      majorPhilosopherIds: ['confucius', 'mencius', 'xunzi', 'mozi', 'laozi', 'zhuangzi', 'han-feizi', 'zhu-xi', 'wang-yangming'],
      suggestedReadingPath: ['Analects with annotations', 'Mencius and Xunzi in comparison', 'Mozi, selected chapters on concern, war, and standards', 'Daodejing in more than one translation', 'Zhuangzi, Inner Chapters', 'Han Feizi, selected chapters', 'Zhu Xi and Wang Yangming selections with historical guidance'],
      commonMisunderstandings: ['Chinese philosophy is not one harmonious worldview, and the categories Confucian, Daoist, Mohist, and Legalist are historically layered rather than timeless membership lists.', 'The Warring States period does not explain away imperial, Buddhist, Song-Ming, Qing, modern, or transregional developments.', 'Aphorism, anecdote, dialogue, canon, and commentary can carry rigorous argument; they are not merely mystical self-help.', 'Dao, qi, xin, li, tian, and other terms shift across context and should not be silently replaced by one English equivalent.'],
      modernExamples: ['Reconsidering education as the formation of attention, judgment, relation, and responsibility rather than mere information transfer.', 'Evaluating institutional incentives, war, administrative standards, and public benefit without reducing politics to either character or law alone.', 'Approaching ecology, medicine, artificial intelligence, and family care through relational accounts while testing hierarchy, exclusion, and state appropriation critically.'],
      originStory: '“Chinese philosophy” is a modern umbrella for heterogeneous textual, institutional, linguistic, religious, and transregional histories. Warring States debates are crucial, but later imperial commentaries, Buddhism, Song-Ming transformations, Qing scholarship, colonial pressure, migration, and contemporary philosophy continually redefine the field.',
      internalTensions: ['Do moral capacities grow from responsive beginnings, or are unruly desires transformed by deliberate learning, ritual, and standards?', 'Can ritual cultivate humane relation, or does it reinforce partiality, hierarchy, and waste?', 'Should governance rely on exemplary virtue, impartial benefit, non-forcing, public standards, administrative technique, or some unstable combination?', 'Do names and distinctions guide action or harden into social and intellectual domination?', 'How can inherited traditions respond to Buddhism, science, colonialism, democracy, feminism, nationalism, Marxism, and global exchange without a false choice between timeless tradition and monolithic modernity?'],
    },
    edits: {
      'warring-states': {
        1: 'The phrase “hundred schools” evokes argumentative abundance, but it should not suggest neatly bounded institutions with fixed memberships. Labels such as Confucian, Daoist, and Legalist were often imposed or stabilized later, and early texts share vocabulary while contesting its use. A ruler might be urged to govern through cultivated virtue, impartial benefit, minimal interference, public standards, or administrative control, yet authors borrow diagnostic tools across those lines. Nor should the Warring States become an origin myth that swallows everything later. Imperial institutions, Buddhist translation, changes in education and examination, printing, Mongol and Manchu rule, European contact, colonial pressure, and twentieth-century revolution each created new philosophical conditions rather than merely repeating ancient positions.',
      },
    },
  },
};

const serialize = (value: unknown): string => typeof value === 'string' ? value : JSON.stringify(value) ?? 'null';

type StructuredClaimKey =
  | 'classification' | 'chronology' | 'definition' | 'purpose' | 'beginnerExplanation'
  | 'central-questions' | 'significance' | 'origin-story' | 'history' | 'concepts'
  | 'relationships' | 'figures' | 'works' | 'debates' | 'misunderstandings'
  | 'relevance' | 'readings';

const structuredClaimSections: Record<ReviewId, Record<StructuredClaimKey, string>> = {
  existentialism: {classification: 'overview', chronology: 'development', definition: 'overview', purpose: 'overview', beginnerExplanation: 'overview', 'central-questions': 'concepts', significance: 'modern-relevance', 'origin-story': 'development', history: 'development', concepts: 'concepts', relationships: 'neighbors', figures: 'figures-works', works: 'figures-works', debates: 'debates', misunderstandings: 'misconceptions', relevance: 'modern-relevance', readings: 'reading-path'},
  phenomenology: {classification: 'overview', chronology: 'development', definition: 'overview', purpose: 'overview', beginnerExplanation: 'overview', 'central-questions': 'concepts', significance: 'modern-relevance', 'origin-story': 'development', history: 'development', concepts: 'concepts', relationships: 'neighbors', figures: 'figures-works', works: 'figures-works', debates: 'debates', misunderstandings: 'misconceptions', relevance: 'modern-relevance', readings: 'reading-path'},
  pragmatism: {classification: 'overview', chronology: 'historical-development', definition: 'overview', purpose: 'overview', beginnerExplanation: 'overview', 'central-questions': 'concepts', significance: 'modern-relevance', 'origin-story': 'historical-development', history: 'historical-development', concepts: 'concepts', relationships: 'neighbors', figures: 'historical-development', works: 'reading-path', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'reading-path'},
  'analytic-philosophy': {classification: 'category', chronology: 'contexts', definition: 'category', purpose: 'category', beginnerExplanation: 'category', 'central-questions': 'methods', significance: 'institutions-future', 'origin-story': 'contexts', history: 'contexts', concepts: 'methods', relationships: 'boundaries', figures: 'early-analysis', works: 'reading', debates: 'boundaries', misunderstandings: 'boundaries', relevance: 'normative-social', readings: 'reading'},
  'continental-philosophy': {classification: 'overview', chronology: 'historical-development', definition: 'overview', purpose: 'overview', beginnerExplanation: 'overview', 'central-questions': 'key-concepts', significance: 'modern-relevance', 'origin-story': 'historical-development', history: 'historical-development', concepts: 'key-concepts', relationships: 'neighbors', figures: 'idealism-marx-genealogy', works: 'reading-path', debates: 'internal-debates', misunderstandings: 'misconceptions', relevance: 'modern-relevance', readings: 'reading-path'},
  'ancient-greek': {classification: 'overview', chronology: 'background', definition: 'overview', purpose: 'overview', beginnerExplanation: 'overview', 'central-questions': 'tensions', significance: 'transmission', 'origin-story': 'background', history: 'transmission', concepts: 'tensions', relationships: 'tensions', figures: 'socrates-plato', works: 'reading', debates: 'tensions', misunderstandings: 'overview', relevance: 'transmission', readings: 'reading'},
  'chinese-philosophy': {classification: 'overview', chronology: 'warring-states', definition: 'overview', purpose: 'overview', beginnerExplanation: 'overview', 'central-questions': 'conceptual-vocabularies', significance: 'modern-relevance', 'origin-story': 'warring-states', history: 'historical-transformations', concepts: 'conceptual-vocabularies', relationships: 'neighbors-comparison', figures: 'figures-texts', works: 'figures-texts', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'reading-path'},
};

const structuredClaims = (record: Branch, id: ReviewId, profile: Profile) => {
  const evidence = (key: StructuredClaimKey) => profile.sectionCitations?.[structuredClaimSections[id][key]] ?? profile.defaultCitations;
  return ({
  classification: structuredClaim(`${record.category} · ${record.name}`, evidence('classification')),
  chronology: structuredClaim(serialize({originPeriod: record.originPeriod, roughStartYear: record.roughStartYear}), evidence('chronology')),
  definition: structuredClaim(record.shortDefinition, evidence('definition')),
  purpose: structuredClaim(record.oneSentencePurpose, evidence('purpose')),
  beginnerExplanation: structuredClaim(record.beginnerExplanation, evidence('beginnerExplanation')),
  'central-questions': structuredClaim(serialize(record.coreQuestions), evidence('central-questions')),
  significance: structuredClaim(record.whyItMatters, evidence('significance')),
  'origin-story': structuredClaim(record.originStory ?? '', evidence('origin-story')),
  history: structuredClaim(serialize({brief: record.historicalDevelopment, detailed: record.historicalDevelopmentDetailed}), evidence('history')),
  concepts: structuredClaim(serialize({core: record.keyConcepts, detailed: record.keyConceptsDetailed}), evidence('concepts')),
  relationships: structuredClaim(serialize({related: record.relatedBranchIds, contrasting: record.contrastingBranchIds, rivals: record.rivalPositions, subBranches: record.subBranches}), evidence('relationships')),
  figures: structuredClaim(serialize({major: record.majorPhilosopherIds, detailed: record.majorFigures}), evidence('figures')),
  works: structuredClaim(serialize(record.majorWorks), evidence('works')),
  debates: structuredClaim(serialize({internal: record.internalTensions, detailed: record.internalDebates, comparisons: record.comparisons}), evidence('debates')),
  misunderstandings: structuredClaim(serialize({brief: record.commonMisunderstandings, detailed: record.misconceptionsDetailed}), evidence('misunderstandings')),
  relevance: structuredClaim(serialize({brief: record.modernExamples, detailed: record.modernRelevanceDetailed}), evidence('relevance')),
  readings: structuredClaim(serialize({suggested: record.suggestedReadingPath, beginner: record.beginnerReadingPath, advanced: record.advancedReadingPath}), evidence('readings')),
  });
};

const reviewedSections = (record: Branch, profile: Profile): ArticleSection[] => (record.articleSections ?? []).map((section) => ({
  ...section,
  paragraphs: section.paragraphs.map((entry, index) => {
    const original = typeof entry === 'string' ? entry : entry.text;
    const text = profile.edits?.[section.id]?.[index] ?? original;
    const citations = profile.sectionCitations?.[section.id] ?? profile.defaultCitations;
    return paragraphClaim(`${record.id}-${section.id}-${index + 1}`, text, citations);
  }),
}));

/** Applies the integrated seven-article claim-review overlay. */
export const applyArticleClaimReviewBatchFieldsBEditorial = (record: Branch): Branch => {
  if (!reviewIds.includes(record.id as ReviewId)) return record;
  const id = record.id as ReviewId;
  const profile = profiles[id];
  const reviewed: Branch = {
    ...record,
    ...profile.patch,
    articleSections: reviewedSections(record, profile),
  };

  return {
    ...reviewed,
    editorial: {
      sources: profile.sources,
      structuredClaims: structuredClaims(reviewed, id, profile),
      review: {
        status: 'claim-reviewed',
        reviewedOn,
        method: 'Substantive branch-page claim review across article prose, structured facts, classification, chronology, terminology, source reliability, and interpretation. Every article paragraph and structured claim is citation-mapped to the registered primary texts where appropriate and to independent specialist sources. Historical labels, cross-cultural comparison, transmission, priority, and movement-boundary claims received a separate caution reread. Museum copy is outside this module’s formal boundary and requires Sol’s separate factual reconciliation.',
        reviewNotePath: `docs/editorial/reviews/${id}.md`,
        lock: reviewLocks[id],
        evidencePolicy: {
          minimumIndependentSecondarySources: 2,
          minimumIndependentSecondaryDomains: 2,
          requiredSourceTypes: ['primary-text'],
        },
      },
    },
  };
};
