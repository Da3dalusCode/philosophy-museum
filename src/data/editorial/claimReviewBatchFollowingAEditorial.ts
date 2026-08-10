import type {
  ArticleSection,
  CitationLocatorKind,
  CitationReference,
  EditorialSource,
  Philosopher,
} from '../../types/philosophy';
import {citation as cite} from './pilotHelpers';
import {
  applyModernClusterEditorialConfig,
  type ModernClusterEditorialConfig,
  type ModernClusterEvidence,
} from './modernClusterEditorialHelpers';

/*
 * Isolated research-first material for the next canonical claim-review pass.
 * Sol owns registration in philosophers.ts, review-note creation, deterministic
 * lock generation, and the separate reconciliation of primary Museum copy.
 */
const reviewedOn = '2026-08-10';
const c = (sourceId: string, kind: CitationLocatorKind, value: string, note?: string) =>
  cite(sourceId, kind, value, note);
const source = (entry: Omit<EditorialSource, 'accessedOn'>): EditorialSource => ({...entry, accessedOn: reviewedOn});

type BatchConfig = Omit<ModernClusterEditorialConfig, 'articleSections' | 'sectionCitations' | 'reviewLock'> & {
  defaultCitations: CitationReference[];
  sectionCitations?: Record<string, CitationReference[]>;
};

type ArticleEdits = Record<string, Record<number, string>>;

const reviseSections = (record: Philosopher, edits: ArticleEdits | undefined): ArticleSection[] =>
  (record.articleSections ?? []).map((section) => ({
    ...section,
    paragraphs: section.paragraphs.map((paragraph, index) => {
      const text = edits?.[section.id]?.[index] ?? (typeof paragraph === 'string' ? paragraph : paragraph.text);
      return typeof paragraph === 'string' ? text : {...paragraph, text};
    }),
  }));

const citationsFor = (record: Philosopher, config: BatchConfig): Record<string, CitationReference[]> =>
  Object.fromEntries((record.articleSections ?? []).map((section) => [
    section.id,
    config.sectionCitations?.[section.id] ?? config.defaultCitations,
  ]));

const evidence = (
  life: CitationReference[],
  ideas: CitationReference[],
  works: CitationReference[],
  influence: CitationReference[],
  disputes: CitationReference[],
  reading: CitationReference[],
): ModernClusterEvidence => ({life, ideas, works, influence, disputes, reading});

const reviewLocks: Record<string, string> = {
  descartes: 'fnv1a64:7531593981fb764d',
  spinoza: 'fnv1a64:72c587f745f25eec',
  leibniz: 'fnv1a64:08ffabf758beddbc',
  locke: 'fnv1a64:6927a4284f8e1f12',
  hume: 'fnv1a64:7755834c4119085e',
  fichte: 'fnv1a64:8a2df537665f15b1',
  dostoevsky: 'fnv1a64:78e563610ae56cf0',
  nietzsche: 'fnv1a64:ed38af59efb98ce4',
};

const articleEdits: Record<string, ArticleEdits> = {
  descartes: {
    'life-context': {
      0: 'Descartes was born in 1596 at La Haye in Touraine and studied at the Jesuit college of La Flèche, where a demanding curriculum joined classical learning, mathematics, and scholastic philosophy. He later earned a law degree, traveled, and spent time in military settings without making warfare his profession. The celebrated story of a decisive 1619 breakthrough, reconstructed from later biographical testimony and scattered early materials, should not be treated as a fully documented instant at which an already complete method arrived. His intellectual biography shows a mobile learned European using schools, courts, correspondence, patronage, print, and private study while seeking enough independence to pursue an unusual scientific program.',
    },
    'elisabeth-union': {
      2: 'The exchange made Elisabeth’s challenge a crucial test case for Cartesian philosophy and belongs to the context in which Descartes developed his later account of passions and practical judgment. It should not, however, be turned into a simple story in which her letters alone caused his final book. Elisabeth must be read as a philosopher, not merely a helpful correspondent who improved a famous man’s system: the surviving letters pursue physics, freedom, illness, and ethical judgment as connected questions. Her objections expose a tension that later Cartesian schools could manage only by transforming causation, substance, or the role of God.',
    },
  },
  spinoza: {
    'historical-setting': {
      1: 'In 1656 Spinoza was placed under a communal herem, or ban, by Amsterdam’s Portuguese-Jewish congregation. The surviving text establishes the severity of the exclusion but does not by itself settle a single private cause; later views about God, miracles, scripture, and philosophy help explain why his thought could prove alarming without licensing a simple retrospective diagnosis. After the ban he lived modestly, worked with lenses, corresponded with learned Europeans, and published cautiously. His political and religious arguments were not academic abstractions. They responded to the real dangers of communities and states that use fear and authority to govern thought.',
    },
  },
  leibniz: {
    'life-context-projects': {
      1: 'Because much of Leibniz’s work remained unpublished or dispersed in correspondence, his philosophy can seem like a set of brilliant fragments. The Discourse on Metaphysics, New Essays on Human Understanding, Theodicy, Principles of Nature and Grace, and Monadology offer different gateways, not five interchangeable statements of one finished system: the New Essays was completed in 1704 but published posthumously, and the compact Monadology is a late presentation rather than a master key. Letters to Arnauld, De Volder, Clarke, and many others show him adjusting arguments for particular interlocutors. Reading Leibniz therefore requires attention to occasion, date, and genre as well as doctrine.',
    },
  },
  locke: {
    'property-labor-colonialism': {
      1: 'It is also one of the most contested parts of Locke. The labor theory can recognize the dignity of productive activity, but it can also rationalize enclosure and colonial appropriation by treating land not cultivated in European ways as underused. Locke’s documented work in colonial administration and evidence of financial connections to colonial and slave-trading enterprises make the historical setting material, though they do not by themselves prove that every line of the Two Treatises was written to justify a particular policy. Readers should not detach the theory from imperial history. The philosophical question is whether Locke’s principles of natural equality and consent can criticize colonial dispossession, or whether his account of improvement and property helped enable it.',
    },
  },
  hume: {
    race: {
      0: 'Hume’s essay “Of National Characters” often explains collective differences through political, social, historical, and economic circumstances rather than climate. Yet a notorious footnote, introduced in the 1753 edition and revised but retained in later editions, asserts a natural hierarchy in which white people are superior to other racialized groups. The assertion is not rescued by his warning elsewhere against indiscriminate national stereotypes. It offers sweeping, counterevidence-resistant generalization precisely where his method calls for cautious comparison and proportioning belief to evidence.',
    },
  },
  fichte: {
    'politics-nation': {
      1: 'The Addresses to the German Nation, delivered in French-occupied Berlin, call for national regeneration through education and a shared language. Their anti-Napoleonic setting matters, but it does not dissolve their exclusions or later nationalist uses. Fichte often frames Germanness as a cultural and linguistic task rather than in the later biological vocabulary of race; nevertheless, the rhetoric can rank peoples and support chauvinist narratives. A careful account neither makes him the direct author of twentieth-century racial nationalism nor sanitizes arguments that made exclusionary appropriation easier.',
    },
  },
  dostoevsky: {
    'life-and-context': {
      0: 'Dostoevsky was born in Moscow in 1821 and trained as a military engineer before turning to literature. His early novel Poor Folk brought rapid attention, but literary success did not stabilize his place in the volatile intellectual culture of imperial Russia. In 1849 he was arrested for participating in the Petrashevsky Circle, whose members discussed censored literature and proposals for social reform. After months in prison, he and fellow prisoners were led to what appeared to be an execution; the imperial state had already commuted the death sentences, and the staged reprieve ended in penal servitude in Siberia followed by compulsory military service. The episode is secure biographical context, but its dramatic form and later recollection do not make it a master explanation of every subsequent literary voice.',
    },
  },
  nietzsche: {
    'publication-history': {
      1: 'The Will to Power is not a book Nietzsche completed or authorized. Elisabeth Förster-Nietzsche, Heinrich Köselitz (Peter Gast), and other editors selected and rearranged notebook fragments for editions issued in 1901 and 1906, creating the appearance of a final systematic masterwork after Nietzsche had abandoned or transformed related plans. The component sentences are largely drawn from his papers, so “forgery” can also oversimplify; selection, ordering, transcription, and framing are the central problems. The Colli–Montinari critical editions and Nietzsche Source restore chronological and manuscript relationships, allowing readers to study the notes without treating the constructed volume as Nietzsche’s system.',
    },
  },
};

const configs: Record<string, BatchConfig> = {
  descartes: {
    sources: [
      source({id: 'des-meditations', type: 'primary-text', authors: ['René Descartes'], title: 'Descartes primary-text collection', publisher: 'Early Modern Texts', url: 'https://www.earlymoderntexts.com/authors/descartes', note: 'Modernized primary-text collection. Cite individual Meditations and Replies; it should not be used to erase the argumentative role of the original objections.'}),
      source({id: 'des-elisabeth', type: 'primary-text', authors: ['René Descartes', 'Princess Elisabeth of Bohemia'], title: 'The Correspondence between Princess Elisabeth of Bohemia and René Descartes', translator: 'Lisa Shapiro', publisher: 'University of Chicago Press', year: 2007, url: 'https://www.bibliovault.org/BV.landing.epl?ISBN=9780226204420', note: 'Correspondence used for Elisabeth’s independent challenge about interaction, union, and embodiment.'}),
      source({id: 'des-sep', type: 'scholarly-reference', authors: ['Gary Hatfield'], title: 'René Descartes', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Summer 2024', year: 2024, url: 'https://plato.stanford.edu/archives/sum2024/entries/descartes/', note: 'Stable specialist synthesis for biography, method, metaphysics, natural philosophy, sense, passions, and reception.'}),
      source({id: 'des-iep', type: 'scholarly-reference', authors: ['Justin Skirry'], title: 'René Descartes', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/rene-descartes/', note: 'Independent overview for dualism, certainty, mind, body, and the role of natural science.'}),
      source({id: 'des-cambridge', type: 'scholarly-book', authors: ['Janet Broughton', 'John Carriero'], editors: ['Janet Broughton', 'John Carriero'], title: 'A Companion to Descartes', publisher: 'Blackwell Publishing', year: 2008, isbn: '9781405134482', url: 'https://onlinelibrary.wiley.com/doi/book/10.1002/9780470996652', note: 'Specialist essays used for disputed arguments, science, passions, correspondence, and reception.'}),
    ],
    defaultCitations: [c('des-sep', 'section', '§§1–7'), c('des-iep', 'section', 'Descartes’s philosophy')],
    sectionCitations: {
      'life-context': [c('des-sep', 'section', '§1 Intellectual Biography'), c('des-cambridge', 'chapter', 'Biographical and intellectual context')],
      method: [c('des-meditations', 'work', 'Discourse, Parts II–VI'), c('des-sep', 'section', '§2 Philosophical Development')],
      doubt: [c('des-meditations', 'standard-division', 'Meditation I'), c('des-sep', 'section', '§3.1 How do our minds know?')],
      cogito: [c('des-meditations', 'standard-division', 'Meditation II'), c('des-iep', 'section', 'Cogito and mind')],
      ideas: [c('des-meditations', 'standard-division', 'Meditations III and VI'), c('des-sep', 'section', '§3.1 How do our minds know?')],
      'god-arguments': [c('des-meditations', 'standard-division', 'Meditations III and V'), c('des-sep', 'section', '§3.2 The mark of truth and the circle')],
      'truth-circle': [c('des-meditations', 'standard-division', 'Meditation IV; Fourth Replies'), c('des-cambridge', 'chapter', 'Cartesian certainty and the circle')],
      'error-freedom': [c('des-meditations', 'standard-division', 'Meditation IV'), c('des-sep', 'section', '§3.5 God and sensory error')],
      'world-senses': [c('des-meditations', 'standard-division', 'Meditation VI'), c('des-sep', 'section', '§5 Theory of Sense Perception')],
      dualism: [c('des-meditations', 'standard-division', 'Meditation VI'), c('des-iep', 'section', 'Mind-body dualism')],
      'elisabeth-union': [c('des-elisabeth', 'standard-division', '21 May and 20 June 1643'), c('des-sep', 'section', '§3.4 Mind–body relation')],
      physics: [c('des-meditations', 'work', 'Principles of Philosophy, Parts II–IV'), c('des-sep', 'section', '§4 The New Science')],
      'life-machines': [c('des-meditations', 'work', 'Treatise on Man; Discourse, Part V'), c('des-sep', 'section', '§4 The New Science')],
      passions: [c('des-meditations', 'work', 'Passions of the Soul, Parts I–III'), c('des-sep', 'section', '§6 Passions and Emotions')],
      ethics: [c('des-meditations', 'work', 'Discourse, Part III; Passions of the Soul'), c('des-cambridge', 'chapter', 'Ethics and passions')],
      reception: [c('des-sep', 'section', '§7 Reception and Legacy'), c('des-cambridge', 'chapter', 'Cartesian reception')],
      disputes: [c('des-sep', 'section', '§§3–6'), c('des-cambridge', 'chapter', 'Mind, body, science, and objections')],
      'reading-path': [c('des-meditations', 'work', 'Meditations I–VI and Objections'), c('des-cambridge', 'work', 'Whole volume')],
    },
    evidence: evidence(
      [c('des-sep', 'section', '§1 Intellectual Biography'), c('des-cambridge', 'chapter', 'Biographical and intellectual context')],
      [c('des-meditations', 'standard-division', 'Meditations I–VI'), c('des-sep', 'section', '§§2–6')],
      [c('des-meditations', 'work', 'Discourse; Meditations; Principles; Passions'), c('des-elisabeth', 'standard-division', '1643 correspondence')],
      [c('des-sep', 'section', '§7 Reception and Legacy'), c('des-iep', 'section', 'Legacy')],
      [c('des-cambridge', 'work', 'Whole volume'), c('des-elisabeth', 'standard-division', '21 May and 20 June 1643')],
      [c('des-meditations', 'work', 'Discourse and Meditations'), c('des-cambridge', 'work', 'Whole volume')],
    ),
    patch: {
      tradition: 'Early modern philosophy, mathematics, and natural science',
      contributionSummary: 'Joined a staged method of doubt and first-person certainty to arguments about ideas, God, judgment, embodied sensation, mechanism, passions, and practical agency; the project is larger and more contested than a slogan about the cogito.',
      historicalContext: 'Jesuit education, European war and travel, mathematical and optical research, the Dutch Republic’s print and correspondence networks, the Galileo controversy, and seventeenth-century disputes about theology, body, and natural explanation.',
      lifeStory: 'Born in 1596, Descartes studied at La Flèche, pursued mathematics and natural philosophy alongside travel and military service, published major works from the Dutch Republic, and died in Stockholm in 1650. His philosophical development took place through books, experiments, objections, and extensive correspondence rather than in isolation.',
      beginnerExplanation: 'Descartes asks what remains secure when ordinary beliefs can be doubted. His answer starts from thinking itself, but it then has to explain error, God, bodies, sensation, science, emotions, and the experienced union of mind and body.',
      mainIdeas: ['Methodic doubt as a temporary reconstruction', 'Cogito and the thinking subject', 'Ideas, clarity, and judgment', 'Mind-body distinction and experienced union', 'Mechanical natural philosophy', 'Passions, generosity, and practical agency'],
      keyWorks: ['Discourse on the Method', 'Meditations on First Philosophy with Objections and Replies', 'Principles of Philosophy', 'Passions of the Soul', 'Correspondence with Princess Elisabeth of Bohemia'],
      dateDisplay: '1596–1650', dateConfidence: 'high', dateNote: 'Birth and death dates are secure; claims about a single private “method” must be checked against changing publications, experiments, objections, and correspondence.',
      controversiesOrInterpretiveTensions: ['The cogito’s logical form and its scope are disputed.', 'God, clear and distinct perception, and the so-called Cartesian Circle remain contested.', 'Real distinction does not remove Descartes’s appeal to a primitive experienced union, which Elisabeth pressed him to clarify.', 'Mechanism, sense experience, animal life, and the passions cannot be reduced to a simple reason-versus-body story.'],
    },
    reviewNotePath: 'docs/editorial/reviews/descartes.md', reviewedOn,
  },

  spinoza: {
    sources: [
      source({id: 'spi-ethics', type: 'primary-text', authors: ['Baruch Spinoza'], title: 'Spinoza primary-text collection', publisher: 'Early Modern Texts', url: 'https://www.earlymoderntexts.com/authors/spinoza', note: 'Modernized primary-text collection; cite the Ethics by Part, proposition, scholium, appendix, and preface. The geometrical form contains definitions, axioms, demonstrations, scholia, and appendices with distinct argumentative roles.'}),
      source({id: 'spi-tpt', type: 'primary-text', authors: ['Baruch Spinoza'], title: 'Theological-Political Treatise', translator: 'Jonathan Israel', publisher: 'Cambridge University Press', year: 2007, url: 'https://www.cambridge.org/core/books/theologicalpolitical-treatise/2BB22F522F192AA0503DBD371AE8C31A', note: 'Primary political and scriptural-critical text; cite by chapter and keep its polemical and seventeenth-century context visible.'}),
      source({id: 'spi-sep', type: 'scholarly-reference', authors: ['Steven Nadler'], title: 'Baruch Spinoza', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2023, url: 'https://plato.stanford.edu/entries/spinoza/', note: 'Specialist overview used for life, the Ethics, scripture, political thought, affects, and debates over freedom.'}),
      source({id: 'spi-iep', type: 'scholarly-reference', authors: ['Blake D. Dutton'], title: 'Baruch Spinoza', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/spinoza/', note: 'Independent overview used for substance, attributes, modes, mind-body parallelism, knowledge, and ethical practice.'}),
      source({id: 'spi-cambridge', type: 'scholarly-book', authors: ['Don Garrett'], editors: ['Don Garrett'], title: 'The Cambridge Companion to Spinoza', publisher: 'Cambridge University Press', year: 1996, isbn: '9780521398657', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-spinoza/0B98B437263ABEBC15F0836F43BFCD07', note: 'Specialist essays used to distinguish competing readings of necessity, attributes, affects, scripture, politics, and the geometrical method.'}),
    ],
    defaultCitations: [c('spi-sep', 'section', '§§1–3'), c('spi-iep', 'section', 'Spinoza’s metaphysics and ethics')],
    sectionCitations: {
      'historical-setting': [c('spi-sep', 'section', '§1 Biography'), c('spi-cambridge', 'chapter', 'Spinoza’s life and context')],
      'cartesian-background': [c('spi-sep', 'section', '§2 Ethics'), c('spi-cambridge', 'chapter', 'Spinoza and Cartesianism')],
      'substance-attributes-modes': [c('spi-ethics', 'standard-division', 'I defs. 3–6; Ip11, Ip14–15'), c('spi-iep', 'section', 'Metaphysics')],
      'mind-body-parallelism': [c('spi-ethics', 'standard-division', 'IIp7 and scholium; IIp13'), c('spi-sep', 'section', '§2.2 The Human Being')],
      'knowledge-imagination-reason': [c('spi-ethics', 'standard-division', 'IIp40s2; Vp25–29'), c('spi-iep', 'section', 'Epistemology')],
      'conatus-affects': [c('spi-ethics', 'standard-division', 'IIIp6–9; III defs. of affects'), c('spi-sep', 'section', '§2.4 Passion and Action')],
      'freedom-necessity': [c('spi-ethics', 'standard-division', 'Ip29; IIp48–49; V preface'), c('spi-cambridge', 'chapter', 'Freedom and necessity')],
      'god-religion-scripture': [c('spi-tpt', 'book-chapter', 'chs. 6, 7, 14'), c('spi-sep', 'section', '§3.1 On Religion and Scripture')],
      'politics-democracy': [c('spi-tpt', 'book-chapter', 'chs. 16, 20'), c('spi-sep', 'section', '§3.2 The State')],
      'ethics-geometry-style': [c('spi-ethics', 'standard-division', 'I appendix; IV preface; V preface'), c('spi-cambridge', 'chapter', 'Geometrical method and its interpretation')],
      'reception-misunderstandings': [c('spi-sep', 'section', '§§2–3'), c('spi-cambridge', 'work', 'Whole volume')],
      'reading-strategy': [c('spi-ethics', 'work', 'Parts I–V'), c('spi-tpt', 'book-chapter', 'chs. 6, 7, 14, 16, 20')],
    },
    evidence: evidence(
      [c('spi-sep', 'section', '§1 Biography'), c('spi-cambridge', 'chapter', 'Spinoza’s life and context')],
      [c('spi-ethics', 'standard-division', 'I–V'), c('spi-sep', 'section', '§2 Ethics')],
      [c('spi-ethics', 'work', 'Ethics'), c('spi-tpt', 'work', 'Whole work')],
      [c('spi-tpt', 'book-chapter', 'chs. 16 and 20'), c('spi-sep', 'section', '§3.2 The State')],
      [c('spi-cambridge', 'work', 'Whole volume'), c('spi-iep', 'section', 'Freedom and ethics')],
      [c('spi-ethics', 'standard-division', 'I appendix; IV preface; V'), c('spi-cambridge', 'work', 'Whole volume')],
    ),
    patch: {
      region: 'Amsterdam / Rijnsburg / Voorburg / The Hague', tradition: 'Early modern Dutch philosophy', primaryBranchIds: ['rationalism', 'metaphysics', 'ethics'], secondaryBranchIds: ['political-philosophy', 'philosophy-of-religion'],
      contributionSummary: 'Constructed a naturalistic account of one infinite substance, finite modes, affects, adequate understanding, scripture, and political freedom, in which freedom means active understanding within necessity rather than an exemption from causation.',
      historicalContext: 'The Portuguese-Jewish community of Amsterdam, Dutch Republican print and religious conflict, Cartesian metaphysics, Hobbesian politics, biblical criticism, and the dangers of publishing heterodox views in the seventeenth century.',
      lifeStory: 'Spinoza was born in Amsterdam in 1632, was placed under herem by the Portuguese-Jewish congregation in 1656, lived and worked as a lens grinder and writer in several Dutch towns, published the Theological-Political Treatise anonymously in 1670, and died in The Hague in 1677. The Ethics appeared posthumously in the Opera Posthuma, not during his lifetime.',
      beginnerExplanation: 'Spinoza asks how people can become less ruled by fear, resentment, and fantasy if they are parts of nature. His answer is not that choices escape causes, but that understanding causes and forming more adequate relations can increase active power and shared freedom.',
      mainIdeas: ['God or Nature and one infinite substance', 'Attributes, modes, and mind-body parallelism', 'Imagination, reason, and intuitive knowledge', 'Conatus, affects, bondage, and active power', 'Freedom through necessity and adequate understanding', 'Scriptural criticism, toleration, and political freedom'],
      keyWorks: ['Ethics', 'Theological-Political Treatise', 'Political Treatise', 'Short Treatise on God, Man and His Well-Being', 'Correspondence'],
      dateDisplay: '1632–1677', dateConfidence: 'high', dateNote: 'The basic biography is secure, while interpretation must distinguish lifetime anonymous print, unpublished manuscripts, correspondence, and posthumous editions.',
      controversiesOrInterpretiveTensions: ['“God or Nature” does not settle whether Spinoza is best read as atheist, pantheist, or a distinctive naturalistic theist.', 'The status of attributes and the relation between mind and body remain disputed.', 'Freedom through necessity is not ordinary uncaused choice.', 'The geometrical order structures arguments but is not a guarantee that every proposition functions like a modern mathematical proof.', 'Spinoza’s arguments for toleration and freedom of thought coexist with non-democratic limits and a seventeenth-century political horizon.'],
    },
    reviewNotePath: 'docs/editorial/reviews/spinoza.md', reviewedOn,
  },

  leibniz: {
    sources: [
      source({id: 'lei-primary', type: 'primary-text', authors: ['Gottfried Wilhelm Leibniz'], title: 'Leibniz primary-text collection', publisher: 'Early Modern Texts', url: 'https://www.earlymoderntexts.com/authors/leibniz', note: 'Modernized primary-text portal for essays and late summaries. Cite individual works and sections; Leibniz’s drafts, publication dates, and audiences vary significantly.'}),
      source({id: 'lei-clarke', type: 'primary-text', authors: ['Gottfried Wilhelm Leibniz', 'Samuel Clarke'], title: 'Leibniz–Clarke correspondence', publisher: 'Early Modern Texts', url: 'https://www.earlymoderntexts.com/assets/pdfs/leibniz1715.pdf', note: 'Modernized primary correspondence used for space, time, force, sufficient reason, and the dispute with Newtonianism.'}),
      source({id: 'lei-sep', type: 'scholarly-reference', authors: ['Brandon C. Look'], title: 'Gottfried Wilhelm Leibniz', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Spring 2020', year: 2020, url: 'https://plato.stanford.edu/archives/spr2020/entries/leibniz/', note: 'Stable specialist overview used for life, the changing corpus, metaphysics, epistemology, and philosophical theology.'}),
      source({id: 'lei-iep', type: 'scholarly-reference', authors: ['Douglas Burnham'], title: 'Gottfried Leibniz: Metaphysics', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/leib-met/', note: 'Independent overview used for monads, complete concepts, harmony, contingency, and theodicy.'}),
      source({id: 'lei-cambridge', type: 'scholarly-book', authors: ['Nicholas Jolley'], editors: ['Nicholas Jolley'], title: 'The Cambridge Companion to Leibniz', publisher: 'Cambridge University Press', year: 1995, isbn: '9780521365888', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-leibniz/94FCB2BB7F276DDCBD6C80B2A907C20D', note: 'Specialist essays used for modal metaphysics, physics, theology, politics, and the development of the corpus.'}),
    ],
    defaultCitations: [c('lei-sep', 'section', '§§1–7'), c('lei-iep', 'section', 'Leibniz’s metaphysics')],
    sectionCitations: {
      'life-context-projects': [c('lei-sep', 'section', '§1 Life'), c('lei-cambridge', 'chapter', 'Leibniz’s life and writings')],
      'principles-reason': [c('lei-primary', 'standard-division', 'Monadology §§31–36; Principles of Nature and Grace §§7–8'), c('lei-sep', 'section', '§2 Overview')],
      'truth-concepts': [c('lei-primary', 'standard-division', 'Discourse on Metaphysics §§8–16'), c('lei-iep', 'section', 'Truth and complete concepts')],
      monads: [c('lei-primary', 'standard-division', 'Monadology §§1–30'), c('lei-sep', 'section', '§2 Overview')],
      'preestablished-harmony': [c('lei-primary', 'standard-division', 'Monadology §§78–81'), c('lei-iep', 'section', 'Pre-established harmony')],
      'best-world-theodicy': [c('lei-primary', 'standard-division', 'Theodicy §§8–21; Monadology §§53–60'), c('lei-cambridge', 'chapter', 'Theodicy and evil')],
      'freedom-grace': [c('lei-primary', 'standard-division', 'Discourse on Metaphysics §§13–16'), c('lei-sep', 'section', '§2 Overview')],
      'knowledge-innate-ideas': [c('lei-primary', 'book-chapter', 'New Essays, Preface and Book I'), c('lei-iep', 'section', 'Epistemology')],
      'science-force-space': [c('lei-clarke', 'standard-division', 'Third through Fifth Papers'), c('lei-sep', 'section', '§2 Overview')],
      'politics-ecumenism': [c('lei-sep', 'section', '§1 Life'), c('lei-cambridge', 'chapter', 'Law, politics, and ecumenism')],
      'influence-misunderstandings': [c('lei-sep', 'section', '§§1–2'), c('lei-cambridge', 'work', 'Whole volume')],
      'reading-strategy': [c('lei-primary', 'work', 'Discourse, New Essays, Theodicy, Monadology'), c('lei-clarke', 'work', 'Whole correspondence')],
    },
    evidence: evidence(
      [c('lei-sep', 'section', '§1 Life'), c('lei-cambridge', 'chapter', 'Leibniz’s life and writings')],
      [c('lei-primary', 'standard-division', 'Monadology §§1–90; Discourse §§8–16'), c('lei-iep', 'section', 'Leibniz’s metaphysics')],
      [c('lei-primary', 'work', 'Discourse; New Essays; Theodicy; Monadology'), c('lei-clarke', 'work', 'Whole correspondence')],
      [c('lei-sep', 'section', '§1 Life'), c('lei-cambridge', 'chapter', 'Reception and legacy')],
      [c('lei-cambridge', 'chapter', 'Theodicy and modal metaphysics'), c('lei-iep', 'section', 'Freedom and contingency')],
      [c('lei-primary', 'work', 'Discourse and Monadology'), c('lei-cambridge', 'work', 'Whole volume')],
    ),
    patch: {
      region: 'Leipzig / Mainz / Paris / Hanover / Berlin', tradition: 'Early modern philosophy, logic, and natural science', primaryBranchIds: ['rationalism', 'metaphysics', 'logic'], secondaryBranchIds: ['epistemology', 'philosophy-of-science', 'philosophy-of-religion'],
      contributionSummary: 'Developed plural metaphysical accounts of active simple substances, sufficient reason, complete concepts, harmony, contingency, and divine choice across a changing body of essays, drafts, scientific work, and correspondence rather than one final system.',
      historicalContext: 'Post–Thirty Years’ War German states, scholastic and humanist learning, Cartesian and Hobbesian debate, French and English scientific networks, dynastic service, religious reconciliation projects, and disputes with Newtonian physics.',
      lifeStory: 'Leibniz was born in Leipzig in 1646, studied law and philosophy, worked in diplomacy and administration, served the House of Brunswick-Lüneburg, and wrote across logic, mathematics, history, law, theology, natural philosophy, and political projects. Much of the corpus remained unpublished or appeared in forms later editors have had to date and arrange.',
      beginnerExplanation: 'Leibniz asks how a world of changing bodies can have genuine unity and explanation. His monads are not tiny physical particles: they are simple active centers of perception whose coordinated histories are meant to explain order without mind and body pushing one another like billiard balls.',
      mainIdeas: ['Principles of contradiction and sufficient reason', 'Necessary, contingent, and complete truths', 'Monads, perception, and appetite', 'Pre-established harmony', 'Possible worlds, theodicy, and contingency', 'Innate dispositions and the critique of the blank slate', 'Force, space, time, and Newtonian controversy'],
      keyWorks: ['Discourse on Metaphysics', 'New Essays on Human Understanding', 'Theodicy', 'Monadology', 'Leibniz–Clarke Correspondence'],
      dateDisplay: '1646–1716', dateConfidence: 'high', dateNote: 'Life dates are secure; work dates, titles, final textual form, and doctrinal development often require manuscript and publication-history caution.',
      controversiesOrInterpretiveTensions: ['Leibniz did not publish a single master work that straightforwardly settles all doctrines.', 'Monads are metaphysical simples, not material atoms.', 'Pre-established harmony rejects intersubstantial causal exchange but does not make bodies unreal or irrelevant.', '“Best possible world” names an optimal complete order under a theodicy, not a claim that every event is locally good or that suffering is unreal.', 'Complete concepts, sufficient reason, grace, and contingency generate live disputes about freedom and necessitarianism.'],
    },
    reviewNotePath: 'docs/editorial/reviews/leibniz.md', reviewedOn,
  },

  locke: {
    sources: [
      source({id: 'loc-essay', type: 'primary-text', authors: ['John Locke'], title: 'An Essay Concerning Human Understanding', publisher: 'Project Gutenberg', year: 1690, url: 'https://www.gutenberg.org/ebooks/10615', note: 'Primary text cited by Book, chapter, and section for innateness, ideas, qualities, knowledge, probability, freedom, and personal identity.'}),
      source({id: 'loc-treatises', type: 'primary-text', authors: ['John Locke'], title: 'Two Treatises of Government', publisher: 'Liberty Fund', year: 1689, url: 'https://oll.libertyfund.org/titles/locke-the-two-treatises-of-civil-government-hollis-ed', note: 'Primary political text cited by Treatise and section; publication after 1688 should not automatically determine the date or every motive of composition.'}),
      source({id: 'loc-sep', type: 'scholarly-reference', authors: ['William Uzgalis'], title: 'John Locke', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Winter 2024', year: 2024, url: 'https://plato.stanford.edu/archives/win2024/entries/locke/', note: 'Stable specialist overview used for biography, Essay, education, government, toleration, and the colonial-administrative context.'}),
      source({id: 'loc-iep', type: 'scholarly-reference', authors: ['Patrick J. Connolly'], title: 'John Locke', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/locke/', note: 'Independent overview used for experience, ideas, substance, knowledge, identity, freedom, and political theory.'}),
      source({id: 'loc-political', type: 'scholarly-reference', authors: ['Alex Tuckness'], title: 'Locke’s Political Philosophy', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2020, url: 'https://plato.stanford.edu/entries/locke-political/', note: 'Specialist treatment used for rights, property, slavery, consent, resistance, toleration, and disputed colonial implications.'}),
      source({id: 'loc-cambridge', type: 'scholarly-book', authors: ['Vere Chappell'], editors: ['Vere Chappell'], title: 'The Cambridge Companion to Locke', publisher: 'Cambridge University Press', year: 1994, isbn: '9780521383721', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-locke/CF56BCFEA9992A8D717905866D116513', note: 'Specialist essays used for interpretive disputes around ideas, qualities, persons, freedom, property, religion, and reception.'}),
    ],
    defaultCitations: [c('loc-sep', 'section', '§§1–5'), c('loc-iep', 'section', 'Locke')],
    sectionCitations: {
      'historical-setting': [c('loc-sep', 'section', '§1 Historical Background and Locke’s Life'), c('loc-political', 'section', '§1 Life and historical context')],
      'anti-innatism': [c('loc-essay', 'book-chapter', 'I.2–4'), c('loc-sep', 'section', '§2.1 Book I')],
      'ideas-simple-complex': [c('loc-essay', 'book-chapter', 'II.1–12'), c('loc-iep', 'section', 'Ideas and abstraction')],
      'qualities-substance': [c('loc-essay', 'book-chapter', 'II.8; II.23'), c('loc-cambridge', 'chapter', 'Qualities and substance')],
      'knowledge-probability': [c('loc-essay', 'book-chapter', 'IV.1–4; IV.14–16'), c('loc-sep', 'section', '§2.5 Knowledge and Probability')],
      'personal-identity': [c('loc-essay', 'book-chapter', 'II.27'), c('loc-iep', 'section', 'Personal identity')],
      'freedom-will': [c('loc-essay', 'book-chapter', 'II.21'), c('loc-sep', 'section', '§2.4 Book II')],
      'political-authority': [c('loc-treatises', 'standard-division', 'Second Treatise §§4–6, 87–89, 149–243'), c('loc-political', 'section', '§§2–5')],
      'property-labor-colonialism': [c('loc-treatises', 'standard-division', 'Second Treatise §§25–51'), c('loc-political', 'section', '§4 Property and colonialism')],
      'toleration-religion': [c('loc-treatises', 'work', 'A Letter Concerning Toleration'), c('loc-sep', 'section', '§5 Locke and Religious Toleration')],
      'education-character': [c('loc-sep', 'section', '§3 Locke’s Major Works on Education'), c('loc-cambridge', 'chapter', 'Education and character')],
      'influence-misunderstandings': [c('loc-sep', 'section', '§§2–5'), c('loc-cambridge', 'work', 'Whole volume')],
      'reading-strategy': [c('loc-essay', 'book-chapter', 'I–IV'), c('loc-treatises', 'standard-division', 'Second Treatise §§1–243')],
    },
    evidence: evidence(
      [c('loc-sep', 'section', '§1 Historical Background and Locke’s Life'), c('loc-political', 'section', '§1 Life and historical context')],
      [c('loc-essay', 'book-chapter', 'I.2–4; II.1–12; II.21; II.27; IV.1–16'), c('loc-iep', 'section', 'Locke')],
      [c('loc-essay', 'work', 'Books I–IV'), c('loc-treatises', 'work', 'Two Treatises and Letter on Toleration')],
      [c('loc-political', 'section', '§§2–5'), c('loc-cambridge', 'chapter', 'Locke’s reception')],
      [c('loc-cambridge', 'work', 'Whole volume'), c('loc-political', 'section', '§4 Property and colonialism')],
      [c('loc-essay', 'book-chapter', 'I.2–4; II.27; IV.1–16'), c('loc-cambridge', 'work', 'Whole volume')],
    ),
    patch: {
      region: 'England / France / Dutch Republic', tradition: 'Early modern English philosophy', primaryBranchIds: ['empiricism', 'epistemology', 'political-philosophy'], secondaryBranchIds: ['philosophy-of-mind', 'ethics', 'philosophy-of-religion'],
      contributionSummary: 'Investigated the origins and limits of human understanding while developing contested accounts of personhood, freedom, toleration, property, consent, resistance, and political authority within the entangled settings of science, commerce, colonization, and restoration politics.',
      historicalContext: 'English civil conflict and restoration, the Glorious Revolution, natural philosophy and medicine, Shaftesbury’s political networks, dissent and toleration controversies, Atlantic commerce, colonial administration, and disputes over property and sovereignty.',
      lifeStory: 'Locke was born in 1632, studied and worked at Oxford, trained in medicine, entered the political and administrative world of Anthony Ashley Cooper, spent periods in France and the Dutch Republic, and published the Essay, Two Treatises, and Letter on Toleration around the Revolution of 1688–89. His involvement with trade and colonial administration belongs in the history of his political thought, not merely in a biographical footnote.',
      beginnerExplanation: 'Locke asks what experience can give us without pretending that experience yields certainty about everything. He also asks when political power is legitimate. His answers connect knowledge, memory, education, property, consent, and resistance, but they do not make liberal freedom free of colonial or exclusionary history.',
      mainIdeas: ['Critique of innate principles and ideas', 'Sensation, reflection, simple and complex ideas', 'Primary and secondary qualities', 'Knowledge, probability, and reasonable judgment', 'Consciousness and personal identity', 'Freedom, uneasiness, and suspension of desire', 'Natural rights, consent, property, toleration, and resistance'],
      keyWorks: ['An Essay Concerning Human Understanding', 'Two Treatises of Government', 'A Letter Concerning Toleration', 'Some Thoughts Concerning Education', 'The Reasonableness of Christianity'],
      dateDisplay: '1632–1704', dateConfidence: 'high', dateNote: 'Life dates and major publication dates are secure. The political texts’ composition, publication, polemical aims, and relation to 1688 remain matters for contextual and manuscript-based interpretation.',
      controversiesOrInterpretiveTensions: ['The Essay’s attack on innateness does not reduce the mind to passive reception.', 'Primary qualities, substance, and abstraction remain philosophically contested.', 'Personal identity concerns continuity of consciousness rather than sameness of soul or body, but its forensic implications generate hard cases.', 'Locke’s view of freedom developed and should not be compressed into a doctrine of uncaused will.', 'Natural rights and consent coexist with property arguments, religious exclusions, slavery passages, and colonial-administrative entanglements that cannot be treated as irrelevant to the theory.'],
    },
    reviewNotePath: 'docs/editorial/reviews/locke.md', reviewedOn,
  },

  hume: {
    sources: [
      source({id: 'hum-treatise', type: 'primary-text', authors: ['David Hume'], title: 'A Treatise of Human Nature', publisher: 'Hume Texts Online', year: 1739, url: 'https://davidhume.org/texts/t/', note: 'Critical text portal. Cite book, part, section, and paragraph; the Treatise’s “moral subjects” includes the study of human nature more broadly than modern ethics.'}),
      source({id: 'hum-enquiries', type: 'primary-text', authors: ['David Hume'], title: 'Enquiries Concerning Human Understanding and Concerning the Principles of Morals', publisher: 'Hume Texts Online', year: 1748, url: 'https://davidhume.org/texts/e/', note: 'Critical text portal. Cite Enquiry section and paragraph and do not project every Treatise formulation unchanged onto revised works.'}),
      source({id: 'hum-sep', type: 'scholarly-reference', authors: ['Hsueh Qu', 'Elizabeth S. Radcliffe'], title: 'David Hume', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2026, url: 'https://plato.stanford.edu/entries/hume/', note: 'Current specialist overview used for life, texts, mind, epistemology, passions, ethics, and religion.'}),
      source({id: 'hum-iep', type: 'scholarly-reference', authors: ['James Fieser'], title: 'David Hume', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/hume/', note: 'Independent overview used for causation, skepticism, passions, morality, politics, and religion.'}),
      source({id: 'hum-cambridge', type: 'scholarly-book', authors: ['Peter Millican'], editors: ['Peter Millican'], title: 'The Cambridge Companion to Hume', publisher: 'Cambridge University Press', year: 2009, isbn: '9780521387101', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-hume/C962248CD8CD314F6F6AA39885062AF6', note: 'Specialist essays used for disagreements about skepticism, naturalism, causation, normativity, religion, history, economics, taste, and reception.'}),
      source({id: 'hum-race', type: 'scholarly-book', authors: ['Aaron Garrett', 'Silvia Sebastiani'], title: 'David Hume on Race', containerTitle: 'The Oxford Handbook of Philosophy and Race', editors: ['Naomi Zack'], publisher: 'Oxford University Press', year: 2017, isbn: '9780190236953', doi: '10.1093/oxfordhb/9780190236953.013.43', url: 'https://academic.oup.com/edited-volume/28299/chapter-abstract/214977924', note: 'Specialist chapter used to keep Hume’s racial hierarchy inside, rather than outside, his human science and eighteenth-century intellectual setting.'}),
    ],
    defaultCitations: [c('hum-sep', 'section', '§§1–5'), c('hum-iep', 'section', 'David Hume')],
    sectionCitations: {
      project: [c('hum-treatise', 'standard-division', 'Introduction'), c('hum-sep', 'section', '§1 Life and Works')],
      'life-career': [c('hum-sep', 'section', '§1 Life and Works'), c('hum-cambridge', 'chapter', 'Hume’s life and texts')],
      'texts-revisions': [c('hum-treatise', 'work', 'Whole work'), c('hum-enquiries', 'work', 'Both Enquiries'), c('hum-sep', 'section', '§1 Life and Works')],
      'perceptions-copy': [c('hum-treatise', 'standard-division', '1.1.1–2'), c('hum-enquiries', 'standard-division', '§2')],
      'association-belief': [c('hum-treatise', 'standard-division', '1.1.4; 1.3.7–10'), c('hum-sep', 'section', '§2 Philosophy of Mind, Metaphysics, and Epistemology')],
      causation: [c('hum-treatise', 'standard-division', '1.3.2, 1.3.14'), c('hum-enquiries', 'standard-division', '§7'), c('hum-iep', 'section', 'Causation')],
      'induction-skepticism': [c('hum-enquiries', 'standard-division', '§§4–5'), c('hum-sep', 'section', '§2.3 Epistemology')],
      'self-identity': [c('hum-treatise', 'standard-division', '1.4.6; Appendix'), c('hum-cambridge', 'chapter', 'Personal identity and the Appendix')],
      'passions-action': [c('hum-treatise', 'standard-division', '2.3.3'), c('hum-sep', 'section', '§3 The Passions')],
      morals: [c('hum-treatise', 'standard-division', '3.1.1'), c('hum-enquiries', 'standard-division', '§1'), c('hum-sep', 'section', '§4 Ethics')],
      'sympathy-justice': [c('hum-treatise', 'standard-division', '3.2.1–6'), c('hum-enquiries', 'standard-division', '§3'), c('hum-iep', 'section', 'Moral and political philosophy')],
      religion: [c('hum-enquiries', 'standard-division', '§10'), c('hum-sep', 'section', '§5 Religion')],
      politics: [c('hum-sep', 'section', '§4 Ethics'), c('hum-cambridge', 'chapter', 'Hume’s political thought')],
      history: [c('hum-sep', 'section', '§1 Life and Works'), c('hum-cambridge', 'chapter', 'Hume the historian')],
      economics: [c('hum-cambridge', 'chapter', 'Hume on commerce and political economy'), c('hum-iep', 'section', 'Political and economic thought')],
      taste: [c('hum-enquiries', 'work', 'Of the Standard of Taste'), c('hum-sep', 'section', '§4 Ethics')],
      race: [c('hum-race', 'chapter', 'David Hume on race'), c('hum-sep', 'section', '§1 Life and Works')],
      'disputes-influence': [c('hum-cambridge', 'work', 'Whole volume'), c('hum-sep', 'section', '§§2–5')],
      'reading-path': [c('hum-enquiries', 'standard-division', '§§2–5, 10–12'), c('hum-cambridge', 'work', 'Whole volume')],
    },
    evidence: evidence(
      [c('hum-sep', 'section', '§1 Life and Works'), c('hum-cambridge', 'chapter', 'Hume’s life and texts')],
      [c('hum-treatise', 'standard-division', '1.3.6; 1.4.6; 2.3.3; 3.1–2'), c('hum-enquiries', 'standard-division', '§§2–5, 10–12')],
      [c('hum-treatise', 'work', 'Books I–III'), c('hum-enquiries', 'work', 'Both Enquiries')],
      [c('hum-sep', 'section', '§§1–5'), c('hum-iep', 'section', 'David Hume')],
      [c('hum-cambridge', 'work', 'Whole volume'), c('hum-race', 'chapter', 'David Hume on race')],
      [c('hum-enquiries', 'standard-division', '§§2–5, 10–12'), c('hum-cambridge', 'work', 'Whole volume')],
    ),
    patch: {
      contributionSummary: 'Developed an experimental science of human nature in which custom, imagination, passion, sympathy, convention, and corrected sentiment explain belief, action, morality, institutions, taste, and religious belief after reason’s limits are exposed.',
      historicalContext: 'Scottish Enlightenment sociability, French and British publication, Newtonian and skeptical debate, moral-sense theory, commercial society, party conflict, imperial expansion, literary history, and eighteenth-century racial hierarchy.',
      lifeStory: 'Hume was born in Edinburgh in 1711, composed the Treatise while living in France, revised and recast portions of its project in the Enquiries and essays, served as librarian of the Faculty of Advocates and later as a diplomatic secretary, and became a celebrated historian and essayist before his death in 1776. Contemporary readers often valued his histories and essays more than his philosophical books.',
      beginnerExplanation: 'Hume asks what actually makes people expect effects from causes, act on reasons, approve character, form institutions, and believe religious claims. He finds that reasoning matters, but cannot by itself supply the habits, motives, and shared standards that make ordinary life possible.',
      mainIdeas: ['Impressions, ideas, and the copy principle', 'Association, imagination, belief, and probability', 'Causation and induction', 'Personal identity and the Appendix problem', 'Passions, liberty, and necessity', 'Moral sentiment, sympathy, justice, and convention', 'Religion, history, commerce, taste, and human science'],
      keyWorks: ['A Treatise of Human Nature', 'An Enquiry Concerning Human Understanding', 'An Enquiry Concerning the Principles of Morals', 'Dialogues Concerning Natural Religion', 'The History of England'],
      dateDisplay: '1711–1776', dateConfidence: 'high', dateNote: 'Life dates are secure; Hume repeatedly revised, republished, omitted, and reframed arguments, so the Treatise and later works should not be treated as identical statements.',
      controversiesOrInterpretiveTensions: ['Hume’s skeptical arguments coexist with a naturalistic account of unavoidable ordinary belief and inquiry.', 'Causation, induction, and personal identity support rival realist, projectivist, and skeptical readings.', 'Reason’s inability to motivate alone is not a claim that deliberation never matters for action.', 'Moral sentiment requires corrected shared perspectives, not arbitrary individual preference.', 'Hume’s racial hierarchy is a sustained failure within his public human science, not a detachable curiosity; subsequent textual revisions do not neutralize it.'],
    },
    reviewNotePath: 'docs/editorial/reviews/hume.md', reviewedOn,
  },

  fichte: {
    sources: [
      source({id: 'fic-foundation', type: 'primary-text', authors: ['Johann Gottlieb Fichte'], title: 'Fichte primary-text collection', publisher: 'Marxists Internet Archive', url: 'https://www.marxists.org/reference/subject/philosophy/works/ge/fichte.htm', note: 'Primary-text collection. Cite the 1794/95 Foundation by section and distinguish it from the varied later Wissenschaftslehre presentations.'}),
      source({id: 'fic-right', type: 'primary-text', authors: ['Johann Gottlieb Fichte'], title: 'Foundations of Natural Right', translator: 'Michael Baur', publisher: 'Cambridge University Press', year: 2000, isbn: '9780521576062', url: 'https://www.cambridge.org/core/books/foundations-of-natural-right/1D5B4CD5676E6A025F95EBF74B28F297', note: 'Primary text used for the summons, recognition, embodiment, reciprocal limitation, and right.'}),
      source({id: 'fic-sep', type: 'scholarly-reference', authors: ['Daniel Breazeale'], title: 'Johann Gottlieb Fichte', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2022, url: 'https://plato.stanford.edu/entries/johann-fichte/', note: 'Specialist overview used for biography, the changing Wissenschaftslehre, freedom, right, ethics, religion, and reception.'}),
      source({id: 'fic-iep', type: 'scholarly-reference', authors: ['Curtis Bowman'], title: 'Johann Gottlieb Fichte', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/fichtejg/', note: 'Independent overview used for transcendental idealism, self-positing, the Anstoss, ethics, politics, and German Idealism.'}),
      source({id: 'fic-cambridge', type: 'scholarly-book', authors: ['David James', 'Günter Zöller'], editors: ['David James', 'Günter Zöller'], title: 'The Cambridge Companion to Fichte', publisher: 'Cambridge University Press', year: 2016, isbn: '9780521476444', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-fichte/65170E208610353CC629D40FE6F26D4B', note: 'Specialist essays used for the system’s phases, deduction, intersubjectivity, politics, religion, nationalism, and later reception.'}),
    ],
    defaultCitations: [c('fic-sep', 'section', '§§1–5'), c('fic-iep', 'section', 'Johann Gottlieb Fichte')],
    sectionCitations: {
      setting: [c('fic-sep', 'section', '§1 Life and Work'), c('fic-cambridge', 'chapter', 'Fichte in the aftermath of Kant')],
      'life-development': [c('fic-sep', 'section', '§1 Life and Work'), c('fic-cambridge', 'chapter', 'Biography and development')],
      wissenschaftslehre: [c('fic-foundation', 'standard-division', 'Introduction and §§1–3'), c('fic-sep', 'section', '§§2–4')],
      'self-positing': [c('fic-foundation', 'standard-division', '§1'), c('fic-iep', 'section', 'The self-positing I')],
      'check-striving': [c('fic-foundation', 'standard-division', '§§2–3'), c('fic-sep', 'section', '§4.2 Philosophy of Nature')],
      'recognition-right': [c('fic-right', 'standard-division', '§§3–4'), c('fic-sep', 'section', '§4.4 Philosophy of Law (Recht)')],
      'ethics-vocation': [c('fic-sep', 'section', '§4.3 Ethics'), c('fic-cambridge', 'chapter', 'Fichte’s ethics and vocation')],
      'politics-nation': [c('fic-sep', 'section', '§§1, 4.4'), c('fic-cambridge', 'chapter', 'Fichte’s political thought and nationalism')],
      'religion-later': [c('fic-sep', 'section', '§§4.5, 5'), c('fic-iep', 'section', 'Later Fichte and religion')],
      'legacy-debates': [c('fic-cambridge', 'work', 'Whole volume'), c('fic-sep', 'section', '§5 The later Wissenschaftslehre and reception')],
      'reading-path': [c('fic-foundation', 'work', 'Foundations of the Entire Science of Knowledge'), c('fic-right', 'work', 'Foundations of Natural Right')],
    },
    evidence: evidence(
      [c('fic-sep', 'section', '§1 Life and Work'), c('fic-cambridge', 'chapter', 'Biography and development')],
      [c('fic-foundation', 'standard-division', '§§1–3'), c('fic-sep', 'section', '§§2–4')],
      [c('fic-foundation', 'work', 'Foundations of the Entire Science of Knowledge'), c('fic-right', 'standard-division', '§§3–4')],
      [c('fic-sep', 'section', '§5 The later Wissenschaftslehre and reception'), c('fic-cambridge', 'work', 'Whole volume')],
      [c('fic-cambridge', 'chapter', 'Politics, nationalism, and religion'), c('fic-iep', 'section', 'Johann Gottlieb Fichte')],
      [c('fic-foundation', 'standard-division', 'Introduction and §§1–3'), c('fic-cambridge', 'work', 'Whole volume')],
    ),
    patch: {
      region: 'Saxony / Jena / Berlin', tradition: 'German Idealism', primaryBranchIds: ['german-idealism', 'epistemology', 'ethics'], secondaryBranchIds: ['political-philosophy', 'philosophy-of-religion'],
      contributionSummary: 'Developed the Wissenschaftslehre as a changing transcendental project that explains self-consciousness, objectivity, finitude, right, ethical striving, and freedom through activity rather than a self-contained empirical ego.',
      historicalContext: 'Post-Kantian debates over things in themselves and freedom, the French Revolution, Jena intellectual life, the atheism controversy, Prussian reform, French occupation, educational projects, and contested German-national reception.',
      lifeStory: 'Fichte was born in Rammenau in 1762, rose from a poor family through patronage and education, became famous after the anonymously published Critique of All Revelation was initially attributed to Kant, taught at Jena and Berlin, repeatedly revised the Wissenschaftslehre, and died in 1814 after a wartime epidemic. His work ranges from highly technical transcendental deductions to popular lectures, law, ethics, politics, and religion.',
      beginnerExplanation: 'Fichte does not say that an individual mind invents mountains or other people. He asks what activity must already be at work for someone to experience a world, encounter resistance, recognize other persons, and hold themselves responsible for acting.',
      mainIdeas: ['Wissenschaftslehre as a changing Doctrine of Scientific Knowledge', 'Self-positing activity and transcendental reflection', 'The not-I, Anstoss, finitude, and striving', 'Recognition, embodiment, and reciprocal right', 'Conscience, vocation, and moral action', 'Education, economy, nation, and contested political reception', 'Later absolute life and religious philosophy'],
      keyWorks: ['Foundations of the Entire Wissenschaftslehre', 'Introductions to the Wissenschaftslehre', 'Foundations of Natural Right', 'The System of Ethics', 'The Vocation of Man', 'Addresses to the German Nation'],
      dateDisplay: '1762–1814', dateConfidence: 'high', dateNote: 'Life dates are secure. “The Wissenschaftslehre” names a repeatedly reformulated project rather than a single doctrinal textbook, and later versions cannot simply be reduced to the 1794/95 presentation.',
      controversiesOrInterpretiveTensions: ['The self-positing I is transcendental activity, not an empirical person who creates the world.', 'The Anstoss marks limitation within the deduction and should not be treated as a fully described thing in itself.', 'Fichte’s recognitive theory of right must be distinguished from Hegel’s later historical account of recognition.', 'His early republicanism, regulated economic proposals, later national-education rhetoric, and exclusionary reception resist a simple ideological label.', 'Scholars dispute continuity and transformation between the Jena project and later accounts of absolute life.'],
    },
    reviewNotePath: 'docs/editorial/reviews/fichte.md', reviewedOn,
  },

  dostoevsky: {
    sources: [
      source({id: 'dos-notes', type: 'primary-text', authors: ['Fyodor Dostoevsky'], title: 'Notes from Underground', translator: 'Constance Garnett', publisher: 'Project Gutenberg', year: 1864, url: 'https://www.gutenberg.org/ebooks/600', note: 'Public-domain translation used for plot and speaker-specific claims. It is not a substitute for the Russian text or a license to identify the Underground Man with Dostoevsky.'}),
      source({id: 'dos-crime', type: 'primary-text', authors: ['Fyodor Dostoevsky'], title: 'Crime and Punishment', translator: 'Constance Garnett', publisher: 'Project Gutenberg', year: 1866, url: 'https://www.gutenberg.org/ebooks/2554', note: 'Public-domain translation used by Part, chapter, and epilogue for Raskolnikov’s theory, motives, consequences, and relations.'}),
      source({id: 'dos-brothers', type: 'primary-text', authors: ['Fyodor Dostoevsky'], title: 'The Brothers Karamazov', translator: 'Constance Garnett', publisher: 'Project Gutenberg', year: 1880, url: 'https://www.gutenberg.org/ebooks/28054', note: 'Public-domain translation used by Book and chapter for Ivan, the Grand Inquisitor, Zosima, Alyosha, suffering, and active love.'}),
      source({id: 'dos-cambridge', type: 'scholarly-book', authors: ['William J. Leatherbarrow'], editors: ['William J. Leatherbarrow'], title: 'The Cambridge Companion to Dostoevskii', publisher: 'Cambridge University Press', year: 2002, isbn: '9780521652537', url: 'https://assets.cambridge.org/97805216/52537/frontmatter/9780521652537_frontmatter.pdf', note: 'Publisher-supplied front matter for the hardback edition; specialist essays used for Russian context, faith, politics, family, money, science, and literary form.'}),
      source({id: 'dos-bakhtin', type: 'scholarly-book', authors: ['Mikhail Bakhtin'], title: 'Problems of Dostoevsky’s Poetics', translator: 'Caryl Emerson', publisher: 'University of Minnesota Press', year: 1984, isbn: '9780816612284', url: 'https://www.upress.umn.edu/9780816612284/problems-of-dostoevskys-poetics/', note: 'Classic but contested account of polyphony; used as an interpretive framework rather than a final verdict on authorial intention.'}),
      source({id: 'dos-existentialism', type: 'scholarly-reference', authors: ['Kevin Aho'], title: 'Existentialism', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Spring 2025', year: 2025, url: 'https://plato.stanford.edu/archives/spr2025/entries/existentialism/', note: 'Used only to distinguish nineteenth-century precursor and influence relations from membership in the later organized movement.'}),
    ],
    defaultCitations: [c('dos-cambridge', 'work', 'Whole volume'), c('dos-bakhtin', 'chapter', 'Problems of Dostoevsky’s Poetics')],
    sectionCitations: {
      overview: [c('dos-bakhtin', 'chapter', 'Problems of Dostoevsky’s Poetics'), c('dos-existentialism', 'section', 'Historical precursors')],
      'life-and-context': [c('dos-cambridge', 'chapter', 'Life, Russian context, religion, and politics'), c('dos-bakhtin', 'work', 'Whole work')],
      underground: [c('dos-notes', 'book-chapter', 'Part I, chs. 7–11; Part II'), c('dos-cambridge', 'chapter', 'Science, freedom, and the novel')],
      raskolnikov: [c('dos-crime', 'book-chapter', 'Parts III, V–VI; Epilogue'), c('dos-cambridge', 'chapter', 'Crime, punishment, and responsibility')],
      demons: [c('dos-cambridge', 'chapter', 'Politics and Demons'), c('dos-bakhtin', 'chapter', 'Polyphony and ideology')],
      karamazov: [c('dos-brothers', 'book-chapter', 'Book V, chs. 3–5; Book VI; Epilogue'), c('dos-cambridge', 'chapter', 'Religion, family, and The Brothers Karamazov')],
      polyphony: [c('dos-bakhtin', 'chapter', 'The polyphonic novel'), c('dos-crime', 'book-chapter', 'Parts V–VI; Epilogue')],
      'legacy-reading': [c('dos-existentialism', 'section', 'Historical precursors'), c('dos-cambridge', 'work', 'Whole volume')],
    },
    evidence: evidence(
      [c('dos-cambridge', 'chapter', 'Life and Russian context'), c('dos-bakhtin', 'work', 'Whole work')],
      [c('dos-notes', 'book-chapter', 'Part I, chs. 7–11; Part II'), c('dos-crime', 'book-chapter', 'Parts III, V–VI; Epilogue'), c('dos-brothers', 'book-chapter', 'Book V, chs. 3–5; Book VI')],
      [c('dos-notes', 'work', 'Whole work'), c('dos-crime', 'work', 'Whole work'), c('dos-brothers', 'work', 'Whole work')],
      [c('dos-existentialism', 'section', 'Historical precursors'), c('dos-bakhtin', 'work', 'Whole work')],
      [c('dos-cambridge', 'chapter', 'Politics, religion, and Russian context'), c('dos-bakhtin', 'chapter', 'The polyphonic novel')],
      [c('dos-notes', 'work', 'Whole work'), c('dos-cambridge', 'work', 'Whole volume')],
    ),
    patch: {
      contributionSummary: 'Used philosophically independent dramatic voices to test freedom, rational determinism, guilt, self-deception, ideological possession, innocent suffering, responsibility, and active love without turning any single character into an uncomplicated authorial doctrine.',
      historicalContext: 'Imperial Russian censorship and reform, the Petrashevsky arrest, Siberian penal experience, Orthodox intellectual debate, arguments over socialism and Westernization, modern mass print, nationalism and empire, debt, illness, and family loss.',
      lifeStory: 'Dostoevsky was born in Moscow in 1821, trained as a military engineer, gained early literary recognition, was arrested in 1849 in connection with the Petrashevsky Circle, endured a staged execution and four years of penal labor followed by military service, and became a novelist, journalist, and public polemicist until his death in 1881. This catastrophic biography matters, but it is not a master key for every literary voice or philosophical claim.',
      beginnerExplanation: 'Dostoevsky makes ideas answer to the people who use them. A theory about freedom, crime, history, or faith can sound impressive until it becomes a way to justify cruelty, hide shame, evade responsibility, or meet another person who refuses to become an example in the theory.',
      mainIdeas: ['Freedom and revolt against rational determinism', 'Guilt, self-deception, and responsibility', 'Extraordinary permission and the irreducibility of persons', 'Ideological possession, groups, and violence', 'Innocent suffering, freedom, security, and theodicy', 'Polyphony and philosophically independent voices', 'Active love, relation, and contested religious response'],
      keyWorks: ['Notes from Underground', 'Crime and Punishment', 'Demons', 'The Brothers Karamazov', 'The House of the Dead', 'A Writer’s Diary'],
      dateDisplay: '1821–1881', dateConfidence: 'high', dateNote: 'Life dates and the penal episode are secure. Fictional speakers, serialized publication, translation, polemical journalism, and later existentialist reception require separate interpretive treatment.',
      controversiesOrInterpretiveTensions: ['Dostoevsky is a major precursor to existentialism, not a member of the later twentieth-century movement.', 'Polyphony means relatively autonomous and forceful voices, not absence of authorial commitments or equal plausibility of every position.', 'The Underground Man, Raskolnikov, Ivan, Zosima, Alyosha, and political caricatures cannot be treated as direct authorial mouthpieces.', 'The religious response to innocent suffering does not logically dissolve Ivan’s protest.', 'Dostoevsky’s nationalism, imperial commitments, and antisemitic stereotypes are part of his public thought and cannot be erased by the novels’ moral complexity.'],
    },
    reviewNotePath: 'docs/editorial/reviews/dostoevsky.md', reviewedOn,
  },

  nietzsche: {
    sources: [
      source({id: 'nie-source', type: 'primary-text', authors: ['Friedrich Nietzsche'], title: 'Nietzsche Source: Digital Critical Edition of the Works and Letters', editors: ['Paolo D’Iorio'], publisher: 'Nietzsche Source', url: 'https://doc.nietzschesource.org/en/ekgwb', note: 'Critical digital edition used for published works, correspondence, and notebooks. Published books and posthumous fragments are cited separately and do not have equal textual authority.'}),
      source({id: 'nie-genealogy', type: 'primary-text', authors: ['Friedrich Nietzsche'], title: 'On the Genealogy of Morality and Other Writings', translator: 'Carol Diethe', editors: ['Keith Ansell-Pearson'], publisher: 'Cambridge University Press', year: 2017, isbn: '9781107146656', url: 'https://www.cambridge.org/highereducation/books/nietzsche-on-the-genealogy-of-morality-and-other-writings/58F7463D69D77580CA8CB1BBBD1D6309', note: 'Primary published text used by essay and section for genealogy, ressentiment, guilt, ascetic ideals, and the authority of Nietzsche’s public corpus.'}),
      source({id: 'nie-sep', type: 'scholarly-reference', authors: ['R. Lanier Anderson'], title: 'Friedrich Nietzsche', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Spring 2024', year: 2024, url: 'https://plato.stanford.edu/archives/spr2024/entries/nietzsche/', note: 'Stable specialist overview used for development, morality, value creation, truth, self, writing, will to power, perspectivism, and recurrence.'}),
      source({id: 'nie-life', type: 'scholarly-reference', authors: ['Robert Wicks'], title: 'Nietzsche’s Life and Works', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Spring 2022', year: 2022, url: 'https://plato.stanford.edu/archives/spr2022/entries/nietzsche-life-works/', note: 'Stable specialist source used for biography, chronology, early-middle-late development, notebooks, breakdown, and reception.'}),
      source({id: 'nie-iep', type: 'scholarly-reference', authors: ['Dale Wilkerson'], title: 'Friedrich Nietzsche', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/nietzsch/', note: 'Independent overview used for naturalism, genealogy, perspectivism, morality, politics, and interpretive debates.'}),
      source({id: 'nie-cambridge', type: 'scholarly-book', authors: ['Tom Stern'], editors: ['Tom Stern'], title: 'The New Cambridge Companion to Nietzsche', publisher: 'Cambridge University Press', year: 2019, isbn: '9781107144478', url: 'https://www.cambridge.org/core/books/new-cambridge-companion-to-nietzsche/243EA42B967B985DDB5CF86935E04430', note: 'Specialist essays used for texts, history, science, value, truth, self, politics, gender, and contested reception.'}),
      source({id: 'nie-fascism', type: 'scholarly-book', authors: ['Jacob Golomb', 'Robert S. Wistrich'], editors: ['Jacob Golomb', 'Robert S. Wistrich'], title: 'Nietzsche, Godfather of Fascism? On the Uses and Abuses of a Philosophy', publisher: 'Princeton University Press', year: 2002, isbn: '9780691074450', url: 'https://www.degruyterbrill.com/document/doi/10.1515/9781400825332/html', note: 'Specialist collection used to distinguish selective fascist and Nazi appropriation from Nietzsche’s own hierarchy, anti-egalitarianism, and politically dangerous rhetoric.'}),
    ],
    defaultCitations: [c('nie-sep', 'section', '§§1–6'), c('nie-iep', 'section', 'Friedrich Nietzsche')],
    sectionCitations: {
      'life-context': [c('nie-life', 'section', '§1 Life: 1844–1900'), c('nie-sep', 'section', '§1 Life and Works')],
      'tragedy-wagner': [c('nie-source', 'standard-division', 'The Birth of Tragedy §§1–25; 1886 Self-Criticism'), c('nie-life', 'section', '§2 Early Writings: 1872–1876')],
      'free-spirit-period': [c('nie-source', 'standard-division', 'Human, All Too Human; Daybreak; The Gay Science'), c('nie-life', 'section', '§3 Middle-Period Writings: 1878–1882')],
      'truth-perspective': [c('nie-source', 'standard-division', 'Beyond Good and Evil §§1–23; Genealogy III.12'), c('nie-sep', 'section', '§§3.3, 6.2')],
      'body-drives': [c('nie-source', 'standard-division', 'Beyond Good and Evil §§12, 19, 36; Genealogy II'), c('nie-iep', 'section', 'Self and naturalism')],
      'genealogy-method': [c('nie-genealogy', 'standard-division', 'Preface §§1–9; I–III'), c('nie-sep', 'section', '§2 Critique of Religion and Morality')],
      'master-slave': [c('nie-genealogy', 'standard-division', 'I.2, I.7–11'), c('nie-cambridge', 'chapter', 'Genealogy and moral psychology')],
      'guilt-conscience': [c('nie-genealogy', 'standard-division', 'II.1–24'), c('nie-sep', 'section', '§4 The Self and Self-fashioning')],
      'ascetic-christianity': [c('nie-genealogy', 'standard-division', 'III.1–28'), c('nie-iep', 'section', 'Religion and morality')],
      'death-god-nihilism': [c('nie-source', 'standard-division', 'The Gay Science §125; Thus Spoke Zarathustra'), c('nie-sep', 'section', '§§2–3')],
      'will-power': [c('nie-source', 'standard-division', 'Beyond Good and Evil §36; Genealogy II.12; Nachlass separately'), c('nie-sep', 'section', '§6.1 The Will to Power')],
      recurrence: [c('nie-source', 'standard-division', 'The Gay Science §341; Thus Spoke Zarathustra III'), c('nie-sep', 'section', '§6.3 Eternal Recurrence')],
      'overhuman-overcoming': [c('nie-source', 'standard-division', 'Thus Spoke Zarathustra, Prologue and I'), c('nie-iep', 'section', 'Value creation')],
      politics: [c('nie-fascism', 'work', 'Whole volume'), c('nie-cambridge', 'chapter', 'Nietzsche, politics, race, and gender')],
      'publication-history': [c('nie-life', 'section', '§§5–7'), c('nie-source', 'work', 'Published works, correspondence, and posthumous fragments')],
      reception: [c('nie-life', 'section', '§7 Influence Upon 20th Century Thought'), c('nie-cambridge', 'work', 'Whole volume')],
      'disputes-reading': [c('nie-source', 'work', 'The Gay Science; Beyond Good and Evil; Genealogy; Zarathustra'), c('nie-cambridge', 'work', 'Whole volume')],
    },
    evidence: evidence(
      [c('nie-life', 'section', '§1 Life: 1844–1900'), c('nie-sep', 'section', '§1 Life and Works')],
      [c('nie-source', 'standard-division', 'Published works: Birth of Tragedy through 1888'), c('nie-genealogy', 'standard-division', 'Preface; I–III')],
      [c('nie-source', 'work', 'Published works and correspondence'), c('nie-life', 'section', '§§2–6')],
      [c('nie-life', 'section', '§7 Influence Upon 20th Century Thought'), c('nie-cambridge', 'work', 'Whole volume')],
      [c('nie-sep', 'section', '§§3–6'), c('nie-fascism', 'work', 'Whole volume')],
      [c('nie-source', 'standard-division', 'The Gay Science; Genealogy; Beyond Good and Evil'), c('nie-cambridge', 'work', 'Whole volume')],
    ),
    patch: {
      contributionSummary: 'Used philology, historical psychology, genealogy, aphorism, polemic, and literary experiment to criticize inherited moral and metaphysical authority while testing revaluation, affirmation, self-formation, and the costs of hierarchy.',
      historicalContext: 'Classical philology, German unification and nationalism, Schopenhauer and Wagner, nineteenth-century naturalism, cultural pessimism, university life at Basel, illness and itinerant writing, modern print, empire, racial science, and posthumous editorial appropriation.',
      lifeStory: 'Nietzsche was born in Röcken in 1844, trained as a classical philologist, became a Basel professor at twenty-four, resigned in 1879 amid recurring illness, and wrote his major philosophical books as an itinerant independent author until his collapse in Turin in January 1889. He could not resume independent authorship and was cared for by his mother and later his sister until his death in 1900; posthumous editing decisively shaped the archive and reception.',
      beginnerExplanation: 'Nietzsche asks where moral values came from, what kinds of life they reward, and whether people can create and test different ways of valuing once inherited religious and metaphysical guarantees lose authority. His provocations are arguments in changing literary forms, not a manual of slogans.',
      mainIdeas: ['Genealogy, historical meaning, and revaluation', 'Perspectivism and intellectual conscience', 'Drives, affects, embodiment, and self-formation', 'Master and slave moralities, ressentiment, guilt, and ascetic ideals', 'Death of God, nihilism, affirmation, and recurrence', 'Will to power and its disputed scope', 'Overhuman, hierarchy, politics, gender, and reception'],
      keyWorks: ['The Birth of Tragedy', 'Human, All Too Human', 'The Gay Science', 'Thus Spoke Zarathustra', 'Beyond Good and Evil', 'On the Genealogy of Morality'],
      dateDisplay: '1844–1900', dateConfidence: 'high', dateNote: 'Life dates and publication chronology are secure. Published books, correspondence, notebooks, posthumous arrangements, and archive-driven political reception carry different evidential authority.',
      controversiesOrInterpretiveTensions: ['Nietzsche’s early, middle, and later writings display development without yielding an uncontested final system.', 'Perspectivism is not the view that every opinion is equally good or that truth is irrelevant.', 'Will to power has psychological, evaluative, biological, and metaphysical readings; The Will to Power is a posthumous notebook arrangement, not an authorized book.', 'Eternal recurrence can be read as cosmological hypothesis, ethical test, literary image, or interconnected combination, but not automatically as one settled doctrine.', 'Rejecting fascist and Nazi appropriation does not erase Nietzsche’s hierarchy, anti-egalitarianism, misogyny, anti-Judaic generalizations, or rhetoric of breeding and domination.'],
    },
    reviewNotePath: 'docs/editorial/reviews/nietzsche.md', reviewedOn,
  },
};

/** Applies this sub-batch only when Sol registers it in the canonical editorial chain. */
export const applyClaimReviewBatchFollowingAEditorial = (record: Philosopher): Philosopher => {
  const config = configs[record.id];
  if (!config) return record;
  return applyModernClusterEditorialConfig(record, {
    ...config,
    articleSections: reviseSections(record, articleEdits[record.id]),
    sectionCitations: citationsFor(record, config),
    reviewLock: reviewLocks[record.id],
  });
};
