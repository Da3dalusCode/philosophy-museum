import type {
  ArticleSection,
  CitationReference,
  EditorialSource,
  Philosopher,
  ReadingEntry,
} from '../../types/philosophy';
import {germanIdealismCompletionPhilosopherArticles} from '../germanIdealismCompletionArticles';
import {postKantianNineteenthPhilosopherArticles} from '../postKantianNineteenthArticles';
import {citation as c} from './pilotHelpers';
import {
  applyModernClusterEditorialConfig,
  type ModernClusterEditorialConfig,
} from './modernClusterEditorialHelpers';

const q = (sourceId: string, kind: Parameters<typeof c>[1], value: string, note?: string) =>
  c(sourceId, kind, value, note);
const reading = (
  author: string,
  title: string,
  difficulty: ReadingEntry['difficulty'],
  whyRead: string,
  type: ReadingEntry['type'] = 'primary',
): ReadingEntry => ({author, title, difficulty, whyRead, type});
const section = (
  id: string,
  title: string,
  paragraphs: string[],
  relatedBranchIds?: string[],
  relatedPhilosopherIds?: string[],
  relatedWorkTitles?: string[],
): ArticleSection => ({id, title, paragraphs, relatedBranchIds, relatedPhilosopherIds, relatedWorkTitles});
const sections = (...groups: Array<[string[], CitationReference[]]>): Record<string, CitationReference[]> =>
  Object.fromEntries(groups.flatMap(([ids, citations]) => ids.map((id) => [id, citations])));
const insertBefore = (base: ArticleSection[], targetId: string, additions: ArticleSection[]): ArticleSection[] => {
  const index = base.findIndex((item) => item.id === targetId);
  return index < 0 ? [...base, ...additions] : [...base.slice(0, index), ...additions, ...base.slice(index)];
};

const accessedOn = '2026-08-03';

const schellingSources: EditorialSource[] = [
  {
    id: 'schelling-sep', type: 'scholarly-reference', authors: ['Andrew Bowie'],
    title: 'Friedrich Wilhelm Joseph von Schelling', containerTitle: 'The Stanford Encyclopedia of Philosophy',
    publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/schelling/', accessedOn,
    note: 'Specialist overview used for chronology, the changing systems, Naturphilosophie, identity, freedom, the Ages project, and positive philosophy.',
  },
  {
    id: 'schelling-companion', type: 'scholarly-book', authors: ['Karl Ameriks'], editors: ['Karl Ameriks'],
    title: 'The Cambridge Companion to German Idealism', publisher: 'Cambridge University Press', year: 2017,
    doi: '10.1017/9781316556511', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-german-idealism/57986CBC0292D0DA7FCD6B96D7D3B439', accessedOn,
    note: 'Independent collection used for early Schelling, natural science, organism, aesthetics, politics, and the non-teleological history of German Idealism.',
  },
  {
    id: 'schelling-nature', type: 'primary-text', authors: ['F. W. J. Schelling'], translator: 'Keith R. Peterson',
    title: 'First Outline of a System of the Philosophy of Nature', publisher: 'State University of New York Press', year: 2004,
    isbn: '9780791460047', url: 'https://sunypress.edu/Books/F/First-Outline-of-a-System-of-the-Philosophy-of-Nature', accessedOn,
    note: 'Translation of the 1799 outline, used for productivity, dynamic organization, forces, organism, and the relation to contemporary science.',
  },
  {
    id: 'schelling-system', type: 'primary-text', authors: ['F. W. J. Schelling'], translator: 'Peter Heath',
    title: 'System of Transcendental Idealism (1800)', publisher: 'University Press of Virginia', year: 1978,
    isbn: '0813907802', url: 'https://openlibrary.org/books/OL22273825M/System_of_transcendental_idealism_%281800%29', accessedOn,
    note: 'Primary source for the transcendental construction, history, and art as a unity of conscious and unconscious production.',
  },
  {
    id: 'schelling-freedom', type: 'primary-text', authors: ['F. W. J. Schelling'], translator: 'Jeff Love and Johannes Schmidt',
    title: 'Philosophical Investigations into the Essence of Human Freedom', publisher: 'State University of New York Press', year: 2006,
    isbn: '9780791468739', url: 'https://www.jstor.org/stable/jj.18253140', accessedOn,
    note: 'Primary source for ground and existence, personality, freedom for good and evil, and divine love.',
  },
  {
    id: 'schelling-ages', type: 'primary-text', authors: ['F. W. J. Schelling'], translator: 'Jason M. Wirth',
    title: 'The Ages of the World', publisher: 'State University of New York Press', year: 2000,
    url: 'https://openlibrary.org/books/OL5594900M/The_ages_of_the_world', accessedOn,
    note: 'Primary edition used as an explicitly unfinished and multiply drafted middle-period project on time, powers, becoming, and freedom.',
  },
  {
    id: 'schelling-positive', type: 'primary-text', authors: ['F. W. J. Schelling'], editors: ['Bruce Matthews'],
    title: 'The Grounding of Positive Philosophy: The Berlin Lectures', publisher: 'State University of New York Press', year: 2007,
    isbn: '9780791471296', url: 'https://sunypress.edu/Books/T/The-Grounding-of-Positive-Philosophy2', accessedOn,
    note: 'Posthumously edited lecture material used for the late distinction between negative and positive philosophy; not treated as a lifetime-published final system.',
  },
];

const schellingArticleSections = insertBefore(
  germanIdealismCompletionPhilosopherArticles.schelling,
  'phases',
  [section('corpus-and-publication', 'Published books, lecture courses, and an unfinished late corpus', [
    'Schelling’s bibliography is not a row of equivalent finished books. The early philosophy of nature, the 1800 System of Transcendental Idealism, the identity writings, and the 1809 Freedom Essay appeared during his lifetime in forms he authorized. By contrast, the Ages of the World survives through several abandoned drafts, and much of the philosophy of mythology, revelation, and positive philosophy comes from lecture manuscripts, auditors’ notes, and posthumous editions. A dated lecture course can document a position without becoming a single final book that Schelling completed for publication.',
    'This textual situation matters philosophically. It prevents the later thought from being treated either as empty silence after 1809 or as one seamless system reconstructed by editors. The Berlin lectures answer the Hegelian claim that conceptual necessity can comprehend actuality, but their historical and theological arguments develop across changing presentations. Responsible interpretation therefore identifies the work, year, genre, and editorial basis before attributing a doctrine. Schelling’s long career contains real continuities, yet those continuities are arguments renewed under pressure rather than proof that every formulation says the same thing.',
  ], ['german-idealism', 'metaphysics', 'philosophy-of-religion'], ['schelling', 'hegel'], ['The Ages of the World', 'The Grounding of Positive Philosophy'])],
);

const schellingConfig: ModernClusterEditorialConfig = {
  sources: schellingSources,
  articleSections: schellingArticleSections,
  sectionCitations: sections(
    [['overview', 'phases'], [q('schelling-sep', 'section', 'Overview and sections 2–5'), q('schelling-companion', 'book-chapter', 'Chapters 7, 12, 14, and 15')]],
    [['setting-life'], [q('schelling-sep', 'section', '1. Career'), q('schelling-companion', 'book-chapter', 'Chronology and chapters 7 and 14')]],
    [['corpus-and-publication'], [q('schelling-sep', 'section', '1, 4, and 5'), q('schelling-ages', 'work', 'Editor’s introduction and surviving draft'), q('schelling-positive', 'work', 'Editorial introduction and Berlin lectures')]],
    [['nature'], [q('schelling-nature', 'standard-division', 'Foreword, Outline of the Whole, and divisions I–III'), q('schelling-sep', 'section', '2. Transcendental Philosophy and Naturphilosophie'), q('schelling-companion', 'book-chapter', 'Chapters 8 and 12')]],
    [['transcendental-art'], [q('schelling-system', 'standard-division', 'Introduction, epochs I–IV, and conclusion on art'), q('schelling-companion', 'book-chapter', 'Chapters 7 and 15')]],
    [['identity'], [q('schelling-sep', 'section', '3. Identity Philosophy'), q('schelling-companion', 'book-chapter', 'Chapters 2 and 7')]],
    [['freedom-evil'], [q('schelling-freedom', 'work', 'Freedom Essay, especially the distinction of ground and existence and the account of evil'), q('schelling-sep', 'section', '4. The Ages of the World')]],
    [['world-ages'], [q('schelling-ages', 'work', 'Surviving draft and editor’s introduction'), q('schelling-sep', 'section', '4. The Ages of the World')]],
    [['myth-revelation'], [q('schelling-positive', 'standard-division', 'Berlin lectures on negative and positive philosophy'), q('schelling-sep', 'section', '5. Positive and Negative Philosophy')]],
    [['politics-reception'], [q('schelling-sep', 'section', '1 and 5'), q('schelling-companion', 'book-chapter', 'Chapters 14–16')]],
    [['debates-misreadings', 'reading-path'], [q('schelling-sep', 'section', '2–5'), q('schelling-companion', 'book-chapter', 'Chapters 7, 8, 12, and 15'), q('schelling-freedom', 'work', 'Freedom Essay'), q('schelling-positive', 'work', 'Berlin lectures')]],
  ),
  evidence: {
    life: [q('schelling-sep', 'section', '1. Career'), q('schelling-companion', 'book-chapter', 'Chronology')],
    ideas: [q('schelling-sep', 'section', '2–5'), q('schelling-companion', 'book-chapter', 'Chapters 7, 8, 12, and 15')],
    works: [q('schelling-nature', 'work', 'First Outline'), q('schelling-system', 'work', 'System of Transcendental Idealism'), q('schelling-freedom', 'work', 'Freedom Essay'), q('schelling-ages', 'work', 'Surviving draft'), q('schelling-positive', 'work', 'Berlin lectures')],
    influence: [q('schelling-sep', 'section', '5 and reception discussion'), q('schelling-companion', 'book-chapter', 'Chapters 15–16')],
    disputes: [q('schelling-sep', 'section', '2–5'), q('schelling-companion', 'book-chapter', 'Chapters 7, 8, 12, and 14')],
    reading: [q('schelling-freedom', 'work', 'Freedom Essay'), q('schelling-nature', 'work', 'First Outline'), q('schelling-system', 'standard-division', 'Conclusion on art'), q('schelling-positive', 'work', 'Berlin lectures')],
  },
  patch: {
    lifeStory: 'Friedrich Wilhelm Joseph Schelling entered the Tübingen seminary at fifteen, studied with Hegel and Hölderlin, became a celebrated young professor at Jena, and continued revising his philosophy through Würzburg, Munich, Erlangen, and late Berlin lectures. His career cannot be divided into a brilliant youth and empty silence: the long period after 1809 generated the unfinished Ages project and changing lectures on mythology, revelation, and positive philosophy.',
    historicalContext: 'Schelling wrote amid the French Revolution and Napoleonic aftermath, post-Kantian arguments over freedom and the thing in itself, Jena Romanticism, Spinoza’s contested revival, changing sciences of life and matter, and nineteenth-century disputes over Christianity and historical revelation.',
    contributionSummary: 'Developed changing systems of nature, transcendental idealism, identity, freedom, mythology, revelation, and positive philosophy that seek unity without reducing nature to inert matter or existence to conceptual necessity.',
    beginnerExplanation: 'Schelling asks how mind can arise within nature and still be free. His answer changes: early texts describe nature and consciousness as complementary forms of productivity; the Freedom Essay makes evil a real possibility; later lectures argue that logic cannot deduce that anything exists. Always date the claim before calling it “Schelling’s system.”',
    dateDisplay: '1775 CE–1854 CE', dateConfidence: 'high', dateNote: 'Birth and death dates are secure. Dates and genres of individual texts are essential because the positions change, the Ages project exists in several drafts, and major late materials derive from lectures published posthumously.',
    centralQuestions: [
      'How can nature generate self-conscious and free beings without becoming dead mechanism?',
      'How can identity preserve real difference, personality, and the possibility of evil?',
      'What can reason demonstrate, and what must philosophy learn from the actuality of history, mythology, and revelation?',
    ],
    mainIdeas: ['Nature as productivity', 'Transcendental and natural philosophy', 'Identity and difference', 'Freedom for good and evil', 'Negative and positive philosophy'],
    keyWorks: ['First Outline of a System of the Philosophy of Nature', 'System of Transcendental Idealism', 'Presentation of My System of Philosophy', 'Philosophical Investigations into the Essence of Human Freedom', 'The Ages of the World', 'The Grounding of Positive Philosophy'],
    keyWorksDetailed: [
      {title: 'First Outline of a System of the Philosophy of Nature', year: 1799, summary: 'Treats nature as dynamic productivity expressed in organized products and interacting powers.', whyItMatters: 'It states the Naturphilosophie in its most extensive early form while showing its engagement with, and speculative distance from, contemporary science.'},
      {title: 'System of Transcendental Idealism', year: 1800, summary: 'Reconstructs consciousness, action, history, and art from the standpoint of intelligent activity.', whyItMatters: 'It complements philosophy of nature and gives art a privileged role in presenting conscious and unconscious production together.'},
      {title: 'Presentation of My System of Philosophy', year: 1801, summary: 'Presents identity philosophy and the absolute unity of subjective and objective dimensions.', whyItMatters: 'It marks a distinct phase whose identity claims should not be read as the unchanged doctrine of the Freedom Essay or later positive philosophy.'},
      {title: 'Philosophical Investigations into the Essence of Human Freedom', year: 1809, summary: 'Explains personality, ground and existence, good and evil, and divine love through a dynamic metaphysics of freedom.', whyItMatters: 'It makes evil an active possibility and transforms rather than merely repeats the identity system.'},
      {title: 'The Ages of the World', approximateYear: 1815, summary: 'An unfinished, multiply drafted attempt to think time, powers, decision, and the emergence of a world.', whyItMatters: 'Its incompletion and editorial history are part of the evidence, not permission to construct a seamless final doctrine.'},
      {title: 'The Grounding of Positive Philosophy', approximateYear: 1842, summary: 'Berlin lecture material distinguishes rationally necessary negative philosophy from inquiry beginning with the fact of existence.', whyItMatters: 'It documents the late challenge to deriving actuality from logic while requiring caution about lecture and posthumous form.'},
    ],
    intellectualDevelopment: [
      'Early post-Fichtean writings and Naturphilosophie ask how objective nature and subjective activity can be intelligibly continuous.',
      'The transcendental and identity systems coordinate nature, consciousness, art, and the absolute without yet solving freedom and evil.',
      'The Freedom Essay and Ages drafts introduce ground, personality, time, conflict, and contingency into the structure of unity.',
      'Late lectures distinguish negative and positive philosophy and interpret mythology and revelation as historical processes rather than deductions from concepts.',
    ],
    influencesReceived: ['Kant and Fichte', 'Spinoza and the pantheism controversy', 'Hölderlin and Jena Romanticism', 'Goethe and changing natural sciences', 'Christian theology and mythology'],
    influenceOnLaterThought: ['Hegel through early collaboration and dispute', 'Kierkegaard and critiques of completed system', 'Romantic aesthetics and theories of the unconscious', 'Philosophies of life, existence, process, and nature', 'Twentieth-century theology and environmental philosophy'],
    controversiesOrInterpretiveTensions: [
      'Continuity across Schelling’s phases competes with readings emphasizing breaks or restarts.',
      'Naturphilosophie may illuminate organism and emergence without anticipating modern science or replacing empirical inquiry.',
      'The identity system’s account of determinate difference and the Freedom Essay’s relation between divine ground and evil remain disputed.',
      'The Ages drafts and late lecture courses are editorially complex and cannot be treated as finished lifetime publications.',
      'Later mythology and revelation contain theological and Eurocentric hierarchies even where they resist reducing myth to mere error.',
      '“Romantic,” “irrationalist,” and “mystical” are later classificatory shortcuts, not adequate summaries of the changing arguments.',
    ],
    commonMisunderstandings: [
      'Schelling is not merely a bridge from Fichte to Hegel.',
      'Nature as productivity is not the claim that obsolete speculation should replace experiment.',
      'Identity does not mean that every distinction is unreal.',
      'The Freedom Essay’s ground in God is not a second evil deity.',
      'Positive philosophy does not simply abandon reason for revelation.',
      'No one phase or later label supplies an unchanged Schellingian doctrine.',
    ],
    primaryBranchIds: ['german-idealism'],
    secondaryBranchIds: ['metaphysics', 'aesthetics', 'philosophy-of-religion', 'philosophy-of-science'],
    branchMemberships: [
      {branchId: 'german-idealism', status: 'central', note: 'A central but repeatedly self-revising German Idealist, not a transitional rung toward Hegel.', confidence: 'high'},
      {branchId: 'metaphysics', status: 'major', note: 'Nature, identity, freedom, ground, time, and existence organize the changing systems.', confidence: 'high'},
      {branchId: 'aesthetics', status: 'major', note: 'Art is philosophically central in the 1800 system and subsequent philosophy of art.', confidence: 'high'},
      {branchId: 'philosophy-of-religion', status: 'major', note: 'Freedom, mythology, revelation, and positive philosophy make religion central especially in middle and late work.', confidence: 'high'},
    ],
    branchContributions: [
      {branchId: 'german-idealism', summary: 'Made nature, art, freedom, evil, history, and existence tests of whether systematic reason can preserve real difference.'},
      {branchId: 'metaphysics', summary: 'Developed dynamic accounts of productivity, identity, ground, temporality, and actuality.'},
      {branchId: 'aesthetics', summary: 'Presented art as an enacted unity of conscious intention and unconscious productivity rather than decorative illustration.'},
      {branchId: 'philosophy-of-religion', summary: 'Treated mythology and revelation as historical modes whose actuality exceeds a priori deduction, within a contested Christian framework.'},
    ],
    suggestedFirstReading: 'Philosophical Investigations into the Essence of Human Freedom',
    beginnerReadingPath: [
      reading('F. W. J. Schelling', 'Philosophical Investigations into the Essence of Human Freedom', 'intermediate', 'A relatively bounded entry into freedom, evil, personality, ground, and love.'),
      reading('F. W. J. Schelling', 'First Outline of a System of the Philosophy of Nature, introduction and selected divisions', 'intermediate', 'Meet nature as productivity while keeping its historical science and speculative method visible.'),
      reading('Andrew Bowie', 'Friedrich Wilhelm Joseph von Schelling', 'beginner', 'A chronological specialist guide that keeps the phases and later critique of Hegel distinct.', 'article'),
    ],
    advancedReadingPath: [
      reading('F. W. J. Schelling', 'System of Transcendental Idealism', 'advanced', 'Follow the transcendental construction through history and its conclusion in art.'),
      reading('F. W. J. Schelling', 'The Ages of the World', 'advanced', 'Read one identified draft with its editorial introduction rather than as a finished book.'),
      reading('F. W. J. Schelling', 'The Grounding of Positive Philosophy', 'advanced', 'Study the late negative/positive distinction with explicit attention to its lecture and posthumous form.'),
    ],
  },
  reviewNotePath: 'docs/editorial/reviews/schelling.md',
  reviewLock: 'fnv1a64:6443b88ff19d4ab3',
};

const hegelSources: EditorialSource[] = [
  {
    id: 'hegel-sep', type: 'scholarly-reference', authors: ['Paul Redding'], title: 'Georg Wilhelm Friedrich Hegel',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University',
    url: 'https://plato.stanford.edu/entries/hegel/', accessedOn,
    note: 'Specialist overview used for biography, the mature system, metaphysics and logic disputes, social philosophy, and reception.',
  },
  {
    id: 'hegel-dialectics-sep', type: 'scholarly-reference', authors: ['Julie E. Maybee'], title: 'Hegel’s Dialectics',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University',
    url: 'https://plato.stanford.edu/entries/hegel-dialectics/', accessedOn,
    note: 'Focused source for dialectical method and for rejecting the universal thesis–antithesis–synthesis template.',
  },
  {
    id: 'hegel-companion', type: 'scholarly-book', authors: ['Frederick C. Beiser'], editors: ['Frederick C. Beiser'],
    title: 'The Cambridge Companion to Hegel and Nineteenth-Century Philosophy', publisher: 'Cambridge University Press', year: 2008,
    doi: '10.1017/CCOL9780521831673', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-hegel-and-nineteenthcentury-philosophy/1981E9E2E60B94152CCE8D990481C1FF', accessedOn,
    note: 'Independent collection used across life, Phenomenology, lordship and bondage, logic, idealism, nature, social philosophy, religion, and aesthetics.',
  },
  {
    id: 'hegel-colonialism', type: 'scholarly-book', authors: ['Daniel James', 'Franz Knappik'],
    title: 'Hegel and Colonialism', publisher: 'Cambridge University Press', year: 2025,
    doi: '10.1017/9781009587181', url: 'https://www.cambridge.org/core/elements/hegel-and-colonialism/32A9CF7B07E54820F56081540662CFAE', accessedOn,
    note: 'Focused recent reconstruction used for slavery, race, colonialism, civilizational hierarchy, and the relation of published right to lecture materials.',
  },
  {
    id: 'hegel-phenomenology', type: 'primary-text', authors: ['G. W. F. Hegel'], editors: ['Terry Pinkard', 'Michael Baur'],
    translator: 'Terry Pinkard', title: 'The Phenomenology of Spirit', publisher: 'Cambridge University Press', year: 2018,
    doi: '10.1017/9781139050494', url: 'https://www.cambridge.org/core/books/georg-wilhelm-friedrich-hegel-the-phenomenology-of-spirit/6FEDB42FDEF2E5FF97FEAE0EEEDABE8E', accessedOn,
    note: 'Primary source for the education of consciousness, self-consciousness, lordship and bondage, reason, spirit, religion, and absolute knowing.',
  },
  {
    id: 'hegel-logic', type: 'primary-text', authors: ['G. W. F. Hegel'], editors: ['George di Giovanni'],
    translator: 'George di Giovanni', title: 'The Science of Logic', publisher: 'Cambridge University Press', year: 2010,
    doi: '10.1017/9780511780240', url: 'https://www.cambridge.org/core/books/georg-wilhelm-friedrich-hegel-the-science-of-logic/AB2EA265308BAC6079C566893B1E0124', accessedOn,
    note: 'Primary source for being, essence, concept, contradiction, actuality, objectivity, life, and idea.',
  },
  {
    id: 'hegel-encyclopedia', type: 'primary-text', authors: ['G. W. F. Hegel'], editors: ['Klaus Brinkmann', 'Daniel O. Dahlstrom'],
    title: 'Encyclopedia of the Philosophical Sciences in Basic Outline, Part 1: Science of Logic', publisher: 'Cambridge University Press', year: 2010,
    url: 'https://www.cambridge.org/core/publications/collections/cambridge-editions/hegel-translations', accessedOn,
    note: 'The published Encyclopedia outline is used together with its paragraph numbers to map the system; lecture additions are not silently treated as Hegel-authored text.',
  },
  {
    id: 'hegel-right', type: 'primary-text', authors: ['G. W. F. Hegel'], editors: ['Allen W. Wood'], translator: 'H. B. Nisbet',
    title: 'Elements of the Philosophy of Right', publisher: 'Cambridge University Press', year: 1991,
    doi: '10.1017/CBO9780511808012', url: 'https://www.cambridge.org/highereducation/books/hegel-elements-of-the-philosophy-of-right/09AE6110FE96266A206924435BAF85C5', accessedOn,
    note: 'Primary source for abstract right, morality, ethical life, family, civil society, state, poverty, corporations, international right, and world history.',
  },
];

const hegelAdditions: ArticleSection[] = [
  section('corpus-publication', 'A system distributed across books, outlines, and lecture archives', [
    'Hegel’s corpus has several levels of textual authority. He published the Phenomenology of Spirit, the two-part Science of Logic, the Encyclopedia outline in three editions, and the Elements of the Philosophy of Right, along with earlier essays and books. These works are not interchangeable. The Phenomenology presents a path through shapes of consciousness toward the standpoint of science; the Logic investigates pure determinations of thought; the Encyclopedia compresses logic, nature, and spirit into a teaching outline; the Philosophy of Right develops objective spirit through right, morality, family, civil society, and state.',
    'Many familiar “books by Hegel” on history, art, religion, and the history of philosophy were assembled after his death from lecture manuscripts and students’ notes. They preserve indispensable evidence, often across multiple courses, but editorial compilations can blur differences among years and between Hegel’s wording and an auditor’s record. The additions once printed beneath Encyclopedia paragraphs raise a similar issue. A complete account uses the lectures while naming their status, compares courses when a claim changes, and does not grant a posthumous synthesis the same authority as a text Hegel prepared for publication.',
  ], ['german-idealism', 'metaphysics'], ['hegel'], ['Phenomenology of Spirit', 'Science of Logic', 'Encyclopedia of the Philosophical Sciences', 'Elements of the Philosophy of Right']),
  section('phenomenology-social-world', 'Consciousness learns through a social and historical world', [
    'The Phenomenology does not simply catalogue private mental states. Each shape of consciousness embodies standards for what counts as an object, a reason, or a successful life, and each discovers that its own practice commits it to more than it initially acknowledges. Sense-certainty claims direct access to a singular “this,” yet its language expresses repeatable universals. Perception locates unity in a thing with properties, then struggles with how one thing can sustain difference. Understanding seeks laws and forces, but the knowing activity increasingly finds itself implicated in the objectivity it explains.',
    'The path expands from consciousness to self-consciousness, reason, spirit, religion, and absolute knowing because knowing is socially formed. Greek ethical life, Roman legal personhood, Enlightenment critique, revolutionary freedom, conscience, forgiveness, and religious representation appear as historically shaped forms through which communities understand themselves. Hegel’s sequence is interpretive, selective, and Eurocentric rather than a neutral universal chronicle. Its philosophical claim is that a standpoint becomes intelligible by testing how it lives, speaks, acts, and fails—not that every society must repeat an invariant European itinerary.',
  ], ['german-idealism', 'epistemology', 'political-philosophy'], ['hegel'], ['Phenomenology of Spirit']),
  section('lordship-bondage-reception', 'Lordship and bondage, recognition, labor, and later traditions', [
    'In the Phenomenology’s self-consciousness chapter, a struggle for recognition issues in an unequal relation between lord and bondsman. The lord receives recognition from a dependent consciousness and therefore fails to obtain the fully adequate recognition sought. The bondsman, disciplined by fear and by labor on an independent object, acquires a mediated relation to self and world. Hegel’s German terms are commonly translated as lordship and bondage; “master–slave dialectic” is a powerful later label, but it can make a compact moment look like a self-contained doctrine or a complete social history.',
    'Later Hegelians, Marxists, existentialists, anticolonial thinkers, feminist theorists, and recognition theorists transformed this passage in different directions. Susan Buck-Morss’s proposal that reports of the Haitian Revolution form a concrete context for Hegel’s analysis generated an important debate. The revolutionary Atlantic and slavery belong in Hegel’s historical world, but direct textual dependence and its exact extent remain disputed. The passage should neither be insulated from slavery’s history nor presented as settled evidence that Hegel encoded Haiti. Its limitations also matter: reciprocal freedom cannot be secured merely by reversing domination, because recognition must become institutionally and socially adequate.',
  ], ['german-idealism', 'political-philosophy', 'continental-philosophy'], ['hegel', 'marx', 'fanon'], ['Phenomenology of Spirit']),
  section('logic-metaphysics-dispute', 'What kind of logic, and what kind of metaphysics?', [
    'The Science of Logic begins with the indeterminate thought of pure being, which proves indistinguishable from pure nothing; their truth is becoming. This opening is not an attempt to make a world from a word by magic. It introduces a method in which an apparently immediate determination is examined until its own content requires transition. Being, essence, and concept organize the work’s major divisions. Essence develops reflection, identity, difference, contradiction, ground, appearance, and actuality; the doctrine of the concept treats subjectivity, objectivity, life, cognition, and the idea.',
    'What the Logic claims remains deeply disputed. A traditional metaphysical reading sees it as articulating reality’s most basic intelligible structure. Non-metaphysical and post-Kantian readings emphasize categories required for self-critical thought and normative intelligibility. Other interpretations reject the choice, arguing that Hegel challenges the modern separation between schemes of thought and a wholly external world. The text itself links logic and metaphysics while also criticizing inherited metaphysics. A responsible article presents the dispute rather than announcing that Hegel proved one cosmic ontology or merely offered a theory of language.',
  ], ['logic', 'metaphysics', 'german-idealism'], ['hegel', 'kant'], ['Science of Logic']),
  section('nature-subjective-spirit', 'Nature, embodiment, mind, and the return to spirit', [
    'The Encyclopedia places philosophy of nature between logic and spirit. Nature is the idea in the form of externality: spatial, temporal, material, and dispersed into contingent particulars. Hegel tries to articulate conceptual relations among mechanics, physics, chemistry, geology, plant life, and animal organism. His project is not empirical science by deduction, although he sometimes criticizes scientists and offers claims that later science made untenable. Its defensible ambition is to ask what categories scientific explanations presuppose and why living organization cannot be understood simply as an aggregate of externally related parts.',
    'Subjective spirit follows nature through soul, consciousness, and psychology. Embodiment, habit, sensation, feeling, intelligence, memory, language, and will belong to the development of minded agency; spirit is not a ghost injected into matter. Habit, for example, can free attention by incorporating capacities into a lived body, yet it can also harden into lifeless repetition. Hegel’s accounts include speculative anthropology and racialized hierarchy that require direct criticism. The larger argument—that minded freedom is embodied, habituated, socially recognized, and institutionally sustained—should be preserved without defending obsolete natural science or degrading classifications.',
  ], ['philosophy-of-mind', 'philosophy-of-science', 'german-idealism'], ['hegel'], ['Encyclopedia of the Philosophical Sciences']),
  section('institutions-and-state', 'Freedom in family, civil society, law, and political institutions', [
    'The Philosophy of Right denies that freedom is complete as unimpeded preference. Abstract right secures persons and property; morality gives intention, welfare, responsibility, and conscience their due; ethical life asks how freedom is lived through durable institutions. The family organizes care and shared life, civil society organizes needs, labor, exchange, legal administration, police, and corporations, and the state is supposed to integrate particular and universal interests under constitutional law. Each sphere solves problems and generates new ones. Property enables personality but also contributes to a market society divided by wealth and dependence.',
    'Hegel is neither simply a worshiper of whatever state exists nor a contemporary progressive democrat. His rational state is a normative institutional structure, not an endorsement of every government; he criticizes despotism and insists on law, representation, public administration, and mediated participation. Yet he defends constitutional monarchy, estates, and a restricted public order rather than equal mass democracy. Civil society produces a “rabble” problem of entrenched poverty that his proposed institutions do not convincingly solve. Reading him politically means testing his account of social freedom without converting it into either Prussian apology or present-day democratic theory.',
  ], ['political-philosophy', 'ethics', 'german-idealism'], ['hegel', 'marx'], ['Elements of the Philosophy of Right']),
  section('gender-family-exclusion', 'Gender, family, and the contradiction inside universal freedom', [
    'Hegel’s account of the family rightly resists imagining citizens as self-made individuals who enter society with no relations of care or dependence. Love, marriage, common property, education of children, and the dissolution of the household into independent persons are institutional dimensions of freedom. But he assigns women primarily to family life and men to civil society and state, backing this division with essentializing claims about ethical disposition and intellectual capacity. The resulting hierarchy excludes women from the institutions through which Hegel says developed public freedom becomes actual.',
    'Interpreters disagree over whether the logical resources of recognition and social freedom can criticize this gender order more powerfully than Hegel did. That reconstructive possibility should not turn his explicit position into latent feminism. Similar caution applies to class: corporations and public authority may mitigate market dependence, but domestic labor, servants, colonial commerce, and those outside recognized citizenship remain unevenly visible. The productive approach is immanent criticism: ask why institutions necessary for freedom are organized through exclusions that contradict the universality they claim.',
  ], ['political-philosophy', 'feminist-philosophy', 'ethics'], ['hegel'], ['Elements of the Philosophy of Right']),
  section('history-race-colonialism', 'World history, freedom, race, and colonial domination', [
    'Hegel presents world history as progress in consciousness of freedom, organized through peoples and states that successively bear a world-historical role. This framework allows him to ask how freedom becomes institutionally intelligible rather than merely wished. It also orders human histories through a Eurocentric sequence culminating in the modern European state. Africa, Indigenous America, India, and China are treated through sweeping hierarchies; lecture materials contain racist characterizations, while the Philosophy of Right grants “civilized nations” a superior standing within world history and treats colonization as an outlet for civil society.',
    'These are not detachable insults with no bearing on the system. Recent scholarship argues that race and colonial domination intersect with Hegel’s accounts of personhood, slavery, civil society, and the “absolute right” of world-historical peoples. Disputes remain over textual layers, development, and whether universal freedom supplies resources against his conclusions. The safe synthesis is neither that Hegel’s philosophy is nothing but colonial ideology nor that racism is accidental biography. His historical philosophy exposes freedom as social achievement while unjustly restricting who can count as its agent; both facts belong in evaluating the system and its global receptions.',
  ], ['political-philosophy', 'german-idealism'], ['hegel', 'fanon'], ['Elements of the Philosophy of Right', 'Lectures on the Philosophy of World History']),
  section('art-religion-lecture-status', 'Art, religion, and philosophy without a simple “end of art”', [
    'In the mature system, art, revealed religion, and philosophy are forms of absolute spirit: ways a community relates to the most comprehensive truth about freedom and reality. Art gives that content sensible form, religion presents it through image, narrative, worship, and representation, and philosophy articulates it conceptually. This is a hierarchy of forms, but not the claim that artworks cease to be made or matter. The familiar “end of art” thesis is better understood as a contested claim that art no longer bears the highest vocation it held in some earlier cultures.',
    'Hegel’s symbolic, classical, and romantic forms of art and his developmental histories of religion organize enormous cultural archives through a Christian and European schema. Their readings can be illuminating about how form, material, social practice, and self-understanding interact, yet they also flatten traditions into stages. Because the aesthetics and religion volumes are posthumous lecture constructions, the course and edition must be identified when possible. Philosophy’s claimed conceptual priority should remain open to challenge from artworks and religious practices whose meanings resist being exhausted by Hegel’s system.',
  ], ['aesthetics', 'philosophy-of-religion', 'german-idealism'], ['hegel'], ['Lectures on Aesthetics', 'Lectures on the Philosophy of Religion']),
  section('reception-schools', 'Hegel’s afterlives are not Hegel’s own text', [
    'After 1831, Hegel’s students and critics divided over religion, politics, method, and the authority of the system. So-called Right, Center, and Left Hegelians were never simple boxes. Strauss and Feuerbach transformed religious criticism; Marx appropriated dialectical and historical structures while criticizing idealism and political reconciliation; Kierkegaard attacked the substitution of system for existing subjectivity. Later British and American idealists, existentialists, pragmatists, Marxists, critical theorists, theologians, anticolonial writers, feminists, and recognition theorists each selected and transformed different Hegelian resources.',
    'This reception history explains why “Hegelian” claims can conflict sharply. Marx’s materialist critique, Kojève’s anthropological reading of desire, Fanon’s colonial analysis of recognition, and contemporary social-freedom theory should not be projected unchanged into Hegel’s pages. Conversely, the fact that later thinkers transform him does not make the transformations arbitrary. Hegel’s accounts of mediation, labor, institution, negativity, and recognition create real lines of inheritance. Editorial clarity marks the source of a claim: Hegel’s published work, a lecture witness, a posthumous school, or a later critical appropriation.',
  ], ['continental-philosophy', 'german-idealism', 'political-philosophy'], ['hegel', 'marx', 'kierkegaard', 'fanon'], []),
  section('freedom-action-responsibility', 'Action, intention, conscience, and the actuality of freedom', [
    'Hegel’s account of action links inward intention with a deed’s public actuality. An agent may identify only one purpose as “mine,” yet action enters a world of other agents, institutions, foreseeable consequences, and descriptions. The Philosophy of Right distinguishes purpose, intention, welfare, good, and conscience so that responsibility is neither unlimited liability for everything that follows nor exemption whenever consequences were not privately desired. Moral subjectivity is an achievement because modern persons rightly demand to recognize the good for themselves. It also becomes one-sided when private conviction claims authority without reasons that others can share.',
    'Conscience therefore occupies an unstable place. Genuine conscience tries to unite knowledge of the good with particular judgment; “beautiful soul” and evil can arise when purity of inwardness refuses action or treats sincerity as sufficient warrant. The Phenomenology’s discussion of confession and forgiveness shows agents overcoming the posture in which one judges while denying one’s own finitude. Freedom becomes actual not by eliminating contingency but by learning to answer for action within shared norms. Critics still ask whether Hegel’s institutional reconciliation leaves enough space for principled dissent against norms that are themselves unjust.',
    'This practical dimension prevents the system from being only a story about large historical forces. Individuals deliberate, work, speak, recognize, misrecognize, forgive, and transform institutions, even though no individual controls the whole social meaning of a deed. Hegel rejects both atomism, which imagines agency complete before social relations, and fatalism, which dissolves persons into history. The balance remains difficult: if institutions form the capacities by which people judge them, critique must explain how immanent contradictions can become visible without assuming that every conflict will rationally resolve.',
  ], ['ethics', 'political-philosophy', 'german-idealism'], ['hegel'], ['Phenomenology of Spirit', 'Elements of the Philosophy of Right']),
  section('religion-theology-dispute', 'Christian form, philosophical concept, and the theology dispute', [
    'Religion is not a detachable appendix to Hegel’s system. In the Phenomenology and mature lectures, religious communities represent the absolute through ritual, narrative, image, and doctrine. Christianity receives the highest systematic role because incarnation, death, resurrection, and community are interpreted as representations of unity between divine and human, infinite and finite. Philosophy is then said to know conceptually what religion presents representationally. Whether this preserves Christian faith, translates it into speculative philosophy, or dissolves it has divided readers since Hegel’s lifetime.',
    'The dispute intensified after his death. Conservative readers emphasized doctrinal reconciliation; Strauss and Feuerbach used Hegelian history and mediation to criticize scripture and projection; later theologians alternately appropriated and rejected speculative claims about God. Hegel’s language about God, spirit, and the absolute cannot responsibly be replaced with a secular sociology alone, but neither does it map neatly onto church orthodoxy. Different lecture years also shift emphasis, so “Hegel’s philosophy of religion” names a developing archive rather than one posthumous volume whose editorial arrangement settles the matter.',
    'The global hierarchy of the religion lectures presents another limit. Traditions are arranged as developmental forms culminating in Christianity, often through sparse or distorted evidence. Even where Hegel treats religions as rational attempts at self-understanding rather than simple superstition, his scheme makes European Christianity the measure. Contemporary philosophical use must distinguish the insight that religious form shapes communal self-knowledge from the unjust claim that diverse traditions exist chiefly as incomplete stages toward one consummation.',
  ], ['philosophy-of-religion', 'german-idealism'], ['hegel'], ['Phenomenology of Spirit', 'Lectures on the Philosophy of Religion']),
];

const hegelArticleSections = insertBefore(
  postKantianNineteenthPhilosopherArticles.hegel,
  'reading-strategy',
  hegelAdditions,
);

const hegelConfig: ModernClusterEditorialConfig = {
  sources: hegelSources,
  articleSections: hegelArticleSections,
  sectionCitations: sections(
    [['overview', 'setting', 'life-works'], [q('hegel-sep', 'section', '1–2'), q('hegel-companion', 'book-chapter', 'Chapters 1–3')]],
    [['dialectic'], [q('hegel-dialectics-sep', 'section', '1–4'), q('hegel-logic', 'standard-division', 'Being, Essence, and Concept')]],
    [['phenomenology'], [q('hegel-phenomenology', 'standard-division', 'Preface, Introduction, Consciousness, Self-Consciousness, Reason, and Spirit'), q('hegel-companion', 'book-chapter', 'Chapters 3–4')]],
    [['recognition'], [q('hegel-phenomenology', 'standard-division', 'Self-Consciousness: Independence and Dependence of Self-Consciousness'), q('hegel-companion', 'book-chapter', 'Chapter 4')]],
    [['logic-metaphysics'], [q('hegel-logic', 'standard-division', 'Doctrine of Being, Doctrine of Essence, and Doctrine of the Concept'), q('hegel-sep', 'section', '2.1–2.3')]],
    [['ethical-life'], [q('hegel-right', 'standard-division', '§§34–360, especially §§142–360'), q('hegel-sep', 'section', '2.4')]],
    [['history-freedom'], [q('hegel-right', 'standard-division', '§§341–360'), q('hegel-colonialism', 'section', 'Sections 2–6')]],
    [['art-religion'], [q('hegel-companion', 'book-chapter', 'Chapters 9 and 14–15'), q('hegel-sep', 'section', '2.5')]],
    [['legacy'], [q('hegel-sep', 'section', '3. Hegel’s legacy'), q('hegel-companion', 'book-chapter', 'Introduction and chapters 3–10')]],
    [['corpus-publication'], [q('hegel-sep', 'section', '1. Life, work, and influence'), q('hegel-companion', 'book-chapter', 'Chapter 1 and frontmatter'), q('hegel-encyclopedia', 'work', 'Published Encyclopedia outline')]],
    [['phenomenology-social-world'], [q('hegel-phenomenology', 'standard-division', 'Consciousness through Absolute Knowing'), q('hegel-companion', 'book-chapter', 'Chapters 3–4')]],
    [['lordship-bondage-reception'], [q('hegel-phenomenology', 'standard-division', 'Self-Consciousness: Lordship and Bondage'), q('hegel-companion', 'book-chapter', 'Chapter 4'), q('hegel-colonialism', 'section', 'Sections 2–3', 'Used for the wider slavery and colonial context; it does not establish the disputed Haiti dependence as settled.')]],
    [['logic-metaphysics-dispute'], [q('hegel-logic', 'standard-division', 'Being, Essence, and Concept'), q('hegel-sep', 'section', '2.1–2.3'), q('hegel-companion', 'book-chapter', 'Chapters 5–6')]],
    [['nature-subjective-spirit'], [q('hegel-encyclopedia', 'standard-division', 'System outline and §§18–244'), q('hegel-companion', 'book-chapter', 'Chapters 11–13'), q('hegel-colonialism', 'section', 'Section 3', 'Used for the political stakes of racialized anthropology.')]],
    [['institutions-and-state'], [q('hegel-right', 'standard-division', '§§34–360, especially §§142–329'), q('hegel-sep', 'section', '2.4'), q('hegel-companion', 'book-chapter', 'Chapter 8')]],
    [['gender-family-exclusion'], [q('hegel-right', 'standard-division', '§§158–181 and related remarks'), q('hegel-companion', 'book-chapter', 'Chapter 8')]],
    [['history-race-colonialism'], [q('hegel-right', 'standard-division', '§§243–248 and §§341–360'), q('hegel-colonialism', 'section', 'Sections 2–6')]],
    [['art-religion-lecture-status'], [q('hegel-companion', 'book-chapter', 'Chapters 9, 14, and 15'), q('hegel-sep', 'section', '1 and 2.5')]],
    [['reception-schools'], [q('hegel-sep', 'section', '3. Hegel’s legacy'), q('hegel-companion', 'book-chapter', 'Introduction and reception discussions')]],
    [['freedom-action-responsibility'], [q('hegel-right', 'standard-division', '§§104–141'), q('hegel-phenomenology', 'standard-division', 'Spirit: Conscience, the Beautiful Soul, Evil and Its Forgiveness'), q('hegel-companion', 'book-chapter', 'Chapter 8')]],
    [['religion-theology-dispute'], [q('hegel-phenomenology', 'standard-division', 'Religion'), q('hegel-companion', 'book-chapter', 'Chapters 9–10'), q('hegel-sep', 'section', '2.5')]],
    [['reading-strategy'], [q('hegel-sep', 'section', '1–3'), q('hegel-dialectics-sep', 'section', '1–4'), q('hegel-companion', 'book-chapter', 'Chapters 3–8')]],
  ),
  evidence: {
    life: [q('hegel-sep', 'section', '1. Life, work, and influence'), q('hegel-companion', 'book-chapter', 'Chapter 1')],
    ideas: [q('hegel-sep', 'section', '2. Hegel’s philosophy'), q('hegel-dialectics-sep', 'section', '1–4'), q('hegel-companion', 'book-chapter', 'Chapters 3–15')],
    works: [q('hegel-phenomenology', 'work', 'Phenomenology of Spirit'), q('hegel-logic', 'work', 'Science of Logic'), q('hegel-encyclopedia', 'work', 'Encyclopedia outline'), q('hegel-right', 'work', 'Elements of the Philosophy of Right')],
    influence: [q('hegel-sep', 'section', '3. Hegel’s legacy'), q('hegel-companion', 'book-chapter', 'Introduction and reception discussions')],
    disputes: [q('hegel-sep', 'section', '2–3'), q('hegel-colonialism', 'section', 'Sections 2–6'), q('hegel-companion', 'book-chapter', 'Chapters 4–15')],
    reading: [q('hegel-phenomenology', 'standard-division', 'Preface, Introduction, and selected chapters'), q('hegel-right', 'standard-division', 'Preface, Introduction, and Ethical Life'), q('hegel-logic', 'standard-division', 'With What Must the Beginning of Science Be Made?')],
  },
  patch: {
    lifeStory: 'Georg Wilhelm Friedrich Hegel studied theology at Tübingen with Hölderlin and Schelling, worked as a tutor and Jena lecturer, edited a newspaper at Bamberg, directed a Nuremberg gymnasium, taught at Heidelberg, and became a prominent Berlin professor. Revolution, Napoleonic war, censorship, university institutions, and changing lecture audiences shaped a corpus divided between lifetime publications and posthumously reconstructed courses.',
    historicalContext: 'Hegel wrote after Kant’s critical philosophy and amid German Idealist and Romantic debates, the French and Haitian Revolutions, Napoleonic conquest, restoration politics, industrializing civil society, Christian theological controversy, European colonial expansion, and new historical and natural sciences.',
    contributionSummary: 'Developed a systematic account of logic, nature, consciousness, social life, history, art, religion, and philosophy in which freedom becomes concrete through self-critical concepts, mutual recognition, and institutions.',
    beginnerExplanation: 'Hegel tests a claim by asking whether its own practice supports what it says. When a view of freedom, knowledge, or society proves one-sided, its failure points toward a richer account. This is dialectical development, not a universal thesis–antithesis–synthesis recipe and not a promise that history automatically improves.',
    dateDisplay: '1770 CE–1831 CE', dateConfidence: 'high', dateNote: 'Birth and death dates are secure. Individual lecture claims require dates and edition notes because many familiar volumes on history, art, and religion were constructed posthumously from manuscripts and student transcripts.',
    centralQuestions: [
      'How can thought criticize its own categories without appealing to an external foundation?',
      'How do self-consciousness and freedom depend on recognition, labor, law, and social institutions?',
      'How can history be intelligible without declaring every event rational, necessary, or just?',
      'What relation joins logic, nature, finite spirit, art, religion, and philosophy in a system?',
    ],
    mainIdeas: ['Immanent dialectical development', 'Recognition and social freedom', 'Logic as self-critical metaphysics', 'Ethical life and institutions', 'History and absolute spirit'],
    keyWorks: ['Phenomenology of Spirit', 'Science of Logic', 'Encyclopedia of the Philosophical Sciences', 'Elements of the Philosophy of Right', 'Lectures on Aesthetics', 'Lectures on the Philosophy of Religion', 'Lectures on the Philosophy of World History'],
    keyWorksDetailed: [
      {title: 'Phenomenology of Spirit', year: 1807, summary: 'Traces shapes of consciousness, self-consciousness, reason, spirit, religion, and absolute knowing through their immanent failures.', whyItMatters: 'It connects epistemology to social and historical forms while containing the much-transformed lordship-and-bondage passage.'},
      {title: 'Science of Logic', approximateYear: 1816, summary: 'Develops the determinations of being, essence, and concept through self-critical transitions.', whyItMatters: 'It is central to disputes over whether Hegel offers metaphysics, category theory, post-Kantian logic, or a challenge to those separations.'},
      {title: 'Encyclopedia of the Philosophical Sciences', year: 1817, summary: 'A repeatedly revised teaching outline of logic, nature, and spirit.', whyItMatters: 'It presents the mature system’s architecture, but later editorial additions and lecture materials must be distinguished from Hegel’s published paragraphs.'},
      {title: 'Elements of the Philosophy of Right', year: 1821, summary: 'Develops abstract right, morality, family, civil society, state, international right, and world history.', whyItMatters: 'It gives Hegel’s fullest published account of social freedom and exposes major problems concerning poverty, monarchy, gender, colonialism, and political participation.'},
      {title: 'Lectures on Aesthetics', approximateYear: 1826, summary: 'Multiple lecture courses interpret art’s forms, media, histories, and relation to absolute spirit.', whyItMatters: 'They are indispensable but posthumously edited evidence, not one lifetime-published book or a simple declaration that art ended.'},
      {title: 'Lectures on the Philosophy of Religion', approximateYear: 1827, summary: 'Changing courses examine the concept, historical forms, and consummate religion.', whyItMatters: 'They illuminate Hegel’s Christian framework and disputes over whether the system is orthodox, heterodox, or philosophical transformation of theology.'},
      {title: 'Lectures on the Philosophy of World History', approximateYear: 1830, summary: 'Lecture materials organize history through the development of freedom among peoples and states.', whyItMatters: 'They make historical freedom central while carrying Eurocentric, racist, and colonial hierarchies that cannot be treated as neutral universal history.'},
    ],
    intellectualDevelopment: [
      'Early theological and political manuscripts examine love, religion, social division, and modern ethical life.',
      'Jena collaboration and dispute with Schelling lead to the Phenomenology’s path from consciousness through spirit.',
      'The Nuremberg Science of Logic develops the conceptual core of the mature system.',
      'Heidelberg and Berlin editions of the Encyclopedia and Philosophy of Right articulate logic, nature, subjective spirit, institutions, and absolute spirit.',
      'Repeated lecture courses revise histories of philosophy, art, religion, and world history without becoming one final posthumous text.',
    ],
    influencesReceived: ['Kant, Fichte, and Schelling', 'Ancient Greek philosophy and skepticism', 'Hölderlin, Christianity, and early Romanticism', 'French Revolution and Napoleonic Europe', 'Political economy, law, history, and natural science'],
    influenceOnLaterThought: ['Right, Center, and Left Hegelian disputes', 'Marx and Marxist traditions', 'Kierkegaard and existential reactions', 'British and American idealism and pragmatism', 'Critical theory and recognition theory', 'Anticolonial, feminist, theological, analytic, and continental appropriations'],
    controversiesOrInterpretiveTensions: [
      'Metaphysical, non-metaphysical, conceptual-realist, theological, and naturalist interpretations of the system compete.',
      'Dialectic cannot be reduced to a universal three-step formula, and the transitions’ necessity remains contested.',
      'The lordship-and-bondage passage differs from later “master–slave dialectic” traditions; its relation to Haiti is significant and disputed.',
      'Hegel’s state is neither any existing state nor a modern liberal democracy; monarchy, representation, poverty, and bureaucracy remain contested.',
      'Universal freedom coexists with explicit gender hierarchy, racialized anthropology, Eurocentric world history, and colonial claims.',
      'The system’s Christian content supports incompatible orthodox, heterodox, secular, and philosophical-theological readings.',
      'Lecture compilations and editorial additions cannot silently stand in for Hegel’s published words.',
    ],
    commonMisunderstandings: [
      'Dialectic is not a universal thesis–antithesis–synthesis formula.',
      '“The rational is actual” does not mean that whatever exists is morally good.',
      'Lordship and bondage is one passage, not Hegel’s complete theory of recognition or a settled coded history of Haiti.',
      'Hegel neither simply worships the state nor straightforwardly anticipates contemporary progressive democracy.',
      'World history is not an innocent story of automatic improvement and must be criticized for racial and colonial hierarchy.',
      'Later Hegelian, Marxist, existentialist, and recognition theories are receptions, not direct quotations of Hegel.',
    ],
    primaryBranchIds: ['german-idealism'],
    secondaryBranchIds: ['metaphysics', 'logic', 'political-philosophy', 'aesthetics', 'philosophy-of-religion', 'philosophy-of-mind', 'continental-philosophy'],
    branchMemberships: [
      {branchId: 'german-idealism', status: 'central', note: 'A central German Idealist whose system transforms but does not simply complete Kant, Fichte, and Schelling.', confidence: 'high'},
      {branchId: 'continental-philosophy', status: 'precursor', note: 'A decisive predecessor for later continental traditions; the twentieth-century institutional label is retrospective.', confidence: 'high'},
      {branchId: 'political-philosophy', status: 'major', note: 'Right, morality, ethical life, civil society, state, and world history form a major systematic contribution.', confidence: 'high'},
      {branchId: 'logic', status: 'major', note: 'The Science of Logic is a core work, though its relation to formal logic and metaphysics requires explanation.', confidence: 'high'},
    ],
    branchContributions: [
      {branchId: 'german-idealism', summary: 'Joined logic, nature, spirit, history, art, religion, and freedom in a self-critical system.'},
      {branchId: 'political-philosophy', summary: 'Explained freedom through right, recognition, family, civil society, and political institutions while leaving major exclusions and unresolved poverty.'},
      {branchId: 'logic', summary: 'Recast logical determinations as an immanent development through being, essence, and concept.'},
      {branchId: 'aesthetics', summary: 'Interpreted art as historically changing sensible self-understanding, not merely beauty or taste.'},
      {branchId: 'philosophy-of-religion', summary: 'Placed religion within absolute spirit while preserving disputed Christian and philosophical claims.'},
    ],
    suggestedFirstReading: 'Phenomenology of Spirit, Introduction',
    beginnerReadingPath: [
      reading('G. W. F. Hegel', 'Phenomenology of Spirit, Introduction and selected Consciousness chapters', 'intermediate', 'Enter through the method and a few worked transformations before approaching the whole book.'),
      reading('G. W. F. Hegel', 'Elements of the Philosophy of Right, Introduction and Ethical Life selections', 'intermediate', 'Connect the concept of free will to family, civil society, law, and state while tracking poverty and exclusion.'),
      reading('Paul Redding', 'Georg Wilhelm Friedrich Hegel', 'beginner', 'A specialist map of the corpus, system, major interpretive disputes, and reception.', 'article'),
    ],
    advancedReadingPath: [
      reading('G. W. F. Hegel', 'Phenomenology of Spirit', 'advanced', 'Read the full path with a guide and resist isolating lordship and bondage from the book’s larger movement.'),
      reading('G. W. F. Hegel', 'Science of Logic', 'advanced', 'Study a bounded sequence such as being–nothing–becoming or essence–appearance–actuality before attempting the whole.'),
      reading('G. W. F. Hegel', 'Encyclopedia of the Philosophical Sciences', 'advanced', 'Use the published paragraphs to understand system architecture and label later lecture additions separately.'),
      reading('Frederick C. Beiser, ed.', 'The Cambridge Companion to Hegel and Nineteenth-Century Philosophy', 'advanced', 'Compare interpretations across phenomenology, logic, nature, social philosophy, religion, and aesthetics.', 'secondary'),
      reading('Daniel James and Franz Knappik', 'Hegel and Colonialism', 'advanced', 'Test race, slavery, colonialism, and civilizational hierarchy against published and lecture evidence.', 'secondary'),
    ],
  },
  reviewNotePath: 'docs/editorial/reviews/hegel.md',
  reviewLock: 'fnv1a64:64440047f4813d8f',
};

const schopenhauerSources: EditorialSource[] = [
  {
    id: 'schopenhauer-sep', type: 'scholarly-reference', authors: ['Robert Wicks'], title: 'Arthur Schopenhauer',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University',
    url: 'https://plato.stanford.edu/entries/schopenhauer/', accessedOn,
    note: 'Specialist overview used for life, representation, will, aesthetics, ethics, religion, Indian reception, and influence.',
  },
  {
    id: 'schopenhauer-companion', type: 'scholarly-book', authors: ['Christopher Janaway'], editors: ['Christopher Janaway'],
    title: 'The Cambridge Companion to Schopenhauer', publisher: 'Cambridge University Press', year: 1999,
    doi: '10.1017/CCOL0521621062', url: 'https://doi.org/10.1017/CCOL0521621062', accessedOn,
    note: 'Independent collection used for the Fourfold Root, Kant, metaphysics, body, aesthetics, ethics, religion, and reception.',
  },
  {
    id: 'schopenhauer-fourfold', type: 'primary-text', authors: ['Arthur Schopenhauer'], editors: ['David E. Cartwright', 'Edward E. Erdmann', 'Christopher Janaway'],
    title: 'On the Fourfold Root of the Principle of Sufficient Reason and Other Writings', publisher: 'Cambridge University Press', year: 2012,
    url: 'https://www.cambridge.org/core/series/cambridge-edition-of-the-works-of-schopenhauer/B170AEEEFD3EDA48A6B95CA334C996D2', accessedOn,
    note: 'Primary source for the four classes of grounds and for tracking the substantial 1847 revision against the 1813 dissertation.',
  },
  {
    id: 'schopenhauer-wwr1', type: 'primary-text', authors: ['Arthur Schopenhauer'], editors: ['Judith Norman', 'Alistair Welchman', 'Christopher Janaway'],
    title: 'The World as Will and Representation, Volume 1', publisher: 'Cambridge University Press', year: 2010,
    url: 'https://www.cambridge.org/core/publications/collections/cambridge-editions/the-works-of-schopenhauer', accessedOn,
    note: 'Primary source for the four-book architecture of representation, will, aesthetics, and affirmation and denial of will.',
  },
  {
    id: 'schopenhauer-wwr2', type: 'primary-text', authors: ['Arthur Schopenhauer'], editors: ['Judith Norman', 'Alistair Welchman', 'Christopher Janaway'],
    title: 'The World as Will and Representation, Volume 2', publisher: 'Cambridge University Press', year: 2018,
    url: 'https://www.cambridge.org/core/publications/collections/cambridge-editions/the-works-of-schopenhauer', accessedOn,
    note: 'Primary source for the 1844 supplements, revised in 1859; indispensable later elaborations are not treated as part of the 1818 first edition.',
  },
  {
    id: 'schopenhauer-ethics', type: 'primary-text', authors: ['Arthur Schopenhauer'], editors: ['Christopher Janaway'],
    title: 'The Two Fundamental Problems of Ethics', publisher: 'Cambridge University Press', year: 2009,
    url: 'https://www.cambridge.org/core/publications/collections/cambridge-editions/the-works-of-schopenhauer', accessedOn,
    note: 'Primary source for empirical freedom, intelligible character, motives, egoism, malice, compassion, and moral worth.',
  },
  {
    id: 'schopenhauer-parerga', type: 'primary-text', authors: ['Arthur Schopenhauer'], editors: ['Adrian Del Caro', 'Christopher Janaway'],
    title: 'Parerga and Paralipomena, Volume 2', publisher: 'Cambridge University Press', year: 2015,
    doi: '10.1017/CBO9781139016889', url: 'https://doi.org/10.1017/CBO9781139016889', accessedOn,
    note: 'Primary source for later essays on suffering, religion, Sanskrit literature, politics, women, and racialized culture; degrading claims are reviewed as part of the corpus.',
  },
];

const schopenhauerAdditions: ArticleSection[] = [
  section('editions-and-system', 'The first edition, later supplements, and a revised foundation', [
    'The World as Will and Representation first appeared in late 1818 with an 1819 date. Its four books move from representation, through will, to aesthetics and the affirmation and denial of willing. The second edition of 1844 did not merely reprint that book: it added a second volume of supplements, and both volumes were revised again in 1859. The supplements contain some of Schopenhauer’s most developed discussions of intellect, unconscious motivation, sexuality, death, salvation, and Indian and Christian materials. They clarify and sometimes shift the emphasis of the early architecture.',
    'The dissertation On the Fourfold Root of the Principle of Sufficient Reason has a parallel history. Schopenhauer called it the system’s indispensable introduction, but the 1847 second edition substantially reworked the 1813 text. A claim located only in a late revision should not be projected without comment into his youthful formation. The same rule applies to Parerga and Paralipomena, whose accessible essays brought late recognition but do not replace the major work. Edition, volume, and genre are therefore evidence, not bibliographic decoration.',
  ], ['metaphysics', 'epistemology'], ['schopenhauer'], ['On the Fourfold Root of the Principle of Sufficient Reason', 'The World as Will and Representation']),
  section('causation-individuation', 'Grounds, causation, individuation, and the limits of explanation', [
    'Schopenhauer’s theory of representation depends on the principle of sufficient reason: objects appear within relations that make a “why” intelligible. He distinguishes grounds of becoming, knowing, being, and acting rather than treating every explanation as efficient causation. Causality organizes changes among empirical objects; logical grounds support judgments; space and time order mathematical relations; motives explain actions through an individual character. These forms govern the represented world and cannot by themselves explain why there is representation or what the world is in itself.',
    'Space and time are also the principium individuationis, the forms through which one underlying reality appears as countless separate beings. This claim prepares both metaphysics and ethics. The will is said to objectify itself in grades across nature, while individuals compete as though absolutely separate. Compassion becomes possible when that separation is penetrated in another’s suffering. The argument is powerful but contestable: moving from the subject’s embodied access to will toward a universal metaphysics exceeds ordinary causal inference, and Schopenhauer’s scientific examples cannot establish the identification by themselves.',
  ], ['metaphysics', 'epistemology', 'ethics'], ['schopenhauer'], ['On the Fourfold Root of the Principle of Sufficient Reason', 'The World as Will and Representation']),
  section('prejudice-corpus', 'Women, race, culture, and the ethical contradiction in the corpus', [
    'Schopenhauer’s compassion ethics extends moral standing beyond rational contract and gives animal suffering unusual prominence. That achievement coexists with degrading writing about women, racial hierarchy, Jews, and non-European peoples. The essay “On Women” essentializes women as childish and subordinate, while scattered cultural and racial claims rank peoples through nineteenth-century stereotypes. These are not corrected by pointing to women he admired or by saying that all writers shared his prejudice. Nor should their exposure replace explanation of representation, will, aesthetics, and ethics.',
    'The tension is philosophically serious. If individuation conceals a shared underlying reality and compassion recognizes another’s suffering as morally significant, then categorical hierarchy demands justification that Schopenhauer does not supply. His reception of Asian materials is similarly double: he treated the Upanishads and Buddhist reports as philosophically important, yet accessed them through Persian-to-Latin translation, European scholarship, selective categories, and racialized ideas of culture. Readers should neither claim direct mastery and doctrinal identity nor deny that this mediated encounter changed European philosophical discussion.',
  ], ['ethics', 'philosophy-of-religion', 'metaphysics'], ['schopenhauer'], ['Parerga and Paralipomena', 'The World as Will and Representation']),
];

const schopenhauerArticleSections = insertBefore(
  postKantianNineteenthPhilosopherArticles.schopenhauer,
  'misreadings-reading',
  schopenhauerAdditions,
);

const schopenhauerConfig: ModernClusterEditorialConfig = {
  sources: schopenhauerSources,
  articleSections: schopenhauerArticleSections,
  sectionCitations: sections(
    [['overview', 'life-context'], [q('schopenhauer-sep', 'section', '1–2'), q('schopenhauer-companion', 'book-chapter', 'Introduction and chapter 1')]],
    [['kantian-inheritance', 'representation'], [q('schopenhauer-wwr1', 'standard-division', 'Book I and Appendix'), q('schopenhauer-fourfold', 'standard-division', 'Introduction and chapters 4–8'), q('schopenhauer-companion', 'book-chapter', 'Chapters 2–4')]],
    [['will-body'], [q('schopenhauer-wwr1', 'standard-division', 'Book II, especially §§18–23'), q('schopenhauer-wwr2', 'standard-division', 'Supplements to Book II'), q('schopenhauer-sep', 'section', '3–4')]],
    [['suffering'], [q('schopenhauer-wwr1', 'standard-division', 'Book IV, especially §§56–59'), q('schopenhauer-wwr2', 'standard-division', 'Supplements to Book IV')]],
    [['aesthetics'], [q('schopenhauer-wwr1', 'standard-division', 'Book III'), q('schopenhauer-wwr2', 'standard-division', 'Supplements to Book III'), q('schopenhauer-companion', 'book-chapter', 'Chapter on aesthetics')]],
    [['compassion'], [q('schopenhauer-ethics', 'standard-division', 'On the Basis of Morals, parts II–IV'), q('schopenhauer-wwr1', 'standard-division', 'Book IV, §§61–68')]],
    [['asceticism'], [q('schopenhauer-wwr1', 'standard-division', 'Book IV, §§68–71'), q('schopenhauer-wwr2', 'standard-division', 'Supplements on denial, salvation, and death')]],
    [['religion-east-west'], [q('schopenhauer-wwr1', 'standard-division', 'Book IV and Appendix'), q('schopenhauer-wwr2', 'standard-division', 'Supplements on religion and denial'), q('schopenhauer-parerga', 'chapter', 'Chapters 15–16'), q('schopenhauer-sep', 'section', '1 and 6')]],
    [['influence'], [q('schopenhauer-sep', 'section', '7. Influence'), q('schopenhauer-companion', 'book-chapter', 'Chapters on reception and influence')]],
    [['editions-and-system'], [q('schopenhauer-fourfold', 'work', 'Editorial introduction and 1813/1847 texts'), q('schopenhauer-wwr1', 'work', 'Prefaces to the first, second, and third editions'), q('schopenhauer-wwr2', 'work', 'Volume 2 editorial introduction')]],
    [['causation-individuation'], [q('schopenhauer-fourfold', 'standard-division', 'Chapters 4–8'), q('schopenhauer-wwr1', 'standard-division', 'Books I–II and Book IV'), q('schopenhauer-ethics', 'standard-division', 'On the Basis of Morals, parts II–IV')]],
    [['prejudice-corpus'], [q('schopenhauer-parerga', 'chapter', 'Chapters 16 and 27'), q('schopenhauer-wwr2', 'standard-division', 'Supplements on sexual love, religion, and salvation'), q('schopenhauer-sep', 'section', '1 and 6')]],
    [['misreadings-reading'], [q('schopenhauer-sep', 'section', '2–7'), q('schopenhauer-companion', 'book-chapter', 'Chapters 2–10'), q('schopenhauer-wwr1', 'work', 'Books I–IV')]],
  ),
  evidence: {
    life: [q('schopenhauer-sep', 'section', '1. Life'), q('schopenhauer-companion', 'book-chapter', 'Introduction')],
    ideas: [q('schopenhauer-sep', 'section', '2–6'), q('schopenhauer-companion', 'book-chapter', 'Chapters 2–10')],
    works: [q('schopenhauer-fourfold', 'work', '1813 and 1847 editions'), q('schopenhauer-wwr1', 'work', 'Volume 1'), q('schopenhauer-wwr2', 'work', 'Volume 2 supplements'), q('schopenhauer-ethics', 'work', 'Two prize essays'), q('schopenhauer-parerga', 'work', 'Volume 2')],
    influence: [q('schopenhauer-sep', 'section', '7. Influence'), q('schopenhauer-companion', 'book-chapter', 'Reception discussions')],
    disputes: [q('schopenhauer-companion', 'book-chapter', 'Chapters on Kant, metaphysics, ethics, and religion'), q('schopenhauer-parerga', 'chapter', 'Chapters 16 and 27'), q('schopenhauer-sep', 'section', '2–7')],
    reading: [q('schopenhauer-wwr1', 'standard-division', 'Books I–IV'), q('schopenhauer-fourfold', 'work', 'Editorial introduction'), q('schopenhauer-ethics', 'standard-division', 'On the Basis of Morals')],
  },
  patch: {
    lifeStory: 'Arthur Schopenhauer grew up in a wealthy Danzig merchant family, traveled widely, studied medicine and philosophy, and built an independent career outside the professorial establishment he despised. The World as Will and Representation initially found few readers; Frankfurt residence, later essays, and the 1844 and 1859 editions preceded substantial late recognition.',
    historicalContext: 'Schopenhauer wrote after Kant and against post-Kantian idealist systems, amid Romantic aesthetics, nineteenth-century physiology and natural science, European Orientalist scholarship, new translations of South Asian texts, and a public culture increasingly receptive to pessimism and psychological accounts of unconscious motivation.',
    contributionSummary: 'Recast the experienced world as representation and its embodied inner aspect as will, then connected striving and suffering to aesthetics, compassion, and ascetic denial.',
    beginnerExplanation: 'The world you know is always presented to a subject through space, time, and causation. Your body is also lived from within as effort and desire; Schopenhauer generalizes this striving as will. Art can suspend wanting, compassion can cross apparent separateness, and asceticism seeks a deeper quieting—but every step of that system can be challenged.',
    dateDisplay: '1788 CE–1860 CE', dateConfidence: 'high', dateNote: 'Birth and death dates are secure. The major work appeared in late 1818 with an 1819 title-page date; its 1844 second edition added a full supplementary volume, and the Fourfold Root was substantially revised in 1847.',
    centralQuestions: [
      'How is the world structured as representation for a knowing subject?',
      'Does lived embodiment justify identifying reality in itself with blind striving will?',
      'Why does desire repeatedly produce suffering, and can art, compassion, or asceticism interrupt it?',
      'How should mediated European receptions of Indian traditions be interpreted without false equivalence?',
    ],
    mainIdeas: ['Principle of sufficient reason', 'World as representation', 'Embodied will', 'Pessimism and individuation', 'Aesthetic contemplation', 'Compassion and denial of will'],
    keyWorks: ['On the Fourfold Root of the Principle of Sufficient Reason', 'The World as Will and Representation, Volume 1', 'On the Will in Nature', 'The Two Fundamental Problems of Ethics', 'The World as Will and Representation, Volume 2', 'Parerga and Paralipomena'],
    keyWorksDetailed: [
      {title: 'On the Fourfold Root of the Principle of Sufficient Reason', year: 1813, summary: 'Distinguishes grounds of becoming, knowing, being, and acting; substantially revised in 1847.', whyItMatters: 'It supplies the epistemological framework Schopenhauer says the major work presupposes, while its editions must be distinguished.'},
      {title: 'The World as Will and Representation, Volume 1', approximateYear: 1819, summary: 'Builds the system through representation, will, aesthetics, and affirmation and denial of willing.', whyItMatters: 'It is the primary architecture of Schopenhauer’s philosophy rather than a collection of pessimistic sayings.'},
      {title: 'On the Will in Nature', year: 1836, summary: 'Interprets contemporary scientific reports as corroboration for manifestations of will in nature.', whyItMatters: 'It shows engagement with science but cannot convert empirical analogy into proof of the metaphysics.'},
      {title: 'The Two Fundamental Problems of Ethics', year: 1841, summary: 'Collects prize essays on freedom of will and the basis of morality.', whyItMatters: 'It develops character, motive, egoism, malice, and compassion more directly than the major work.'},
      {title: 'The World as Will and Representation, Volume 2', year: 1844, summary: 'Adds supplements to each book of the first volume, revised again in 1859.', whyItMatters: 'Its mature discussions are indispensable but should not be backdated into the 1818 text.'},
      {title: 'Parerga and Paralipomena', year: 1851, summary: 'Later essays range across philosophy, religion, suffering, culture, and public life.', whyItMatters: 'They brought wider recognition and also preserve explicit misogynistic and racialized claims that ethical interpretation must confront.'},
    ],
    intellectualDevelopment: [
      'The 1813 dissertation distinguishes kinds of sufficient reason within representation.',
      'The 1818/1819 major work joins Kantian representation to a metaphysics of embodied will, aesthetics, ethics, and asceticism.',
      'Scientific and ethical essays elaborate natural manifestations of will, character, motivation, and compassion.',
      'The 1844 supplement volume and 1859 revisions deepen psychology, sexuality, death, religion, and salvation without producing a wholly new system.',
      'Parerga broadens the public voice and includes both influential reflections and serious prejudicial writing.',
    ],
    influencesReceived: ['Kant’s transcendental idealism', 'Plato', 'Goethe and Romantic aesthetics', 'Nineteenth-century physiology and natural science', 'The Latin Oupnek’hat and mediated European reports of Hindu and Buddhist thought'],
    influenceOnLaterThought: ['Nietzsche and philosophies of life', 'Wagner and nineteenth-century music aesthetics', 'Literary modernism and psychological theories of unconscious motivation', 'Pessimism, animal ethics, compassion, and critiques of desire', 'European receptions of South Asian philosophy'],
    controversiesOrInterpretiveTensions: [
      'The move from embodied experience of willing to a universal metaphysics of will is speculative and contested.',
      'Will is not ordinary choice, and representation and will are not simply two separate worlds.',
      'First and later editions materially differ; supplements and revisions must not be backdated.',
      'Aesthetic release is temporary, while compassion and ascetic denial play different ethical and soteriological roles.',
      'Indian materials reached Schopenhauer through limited translations and Orientalist categories; comparison is not doctrinal identity or direct mastery.',
      'Misogynistic, racialized, antisemitic, and culturally hierarchical claims conflict with the reach of compassion ethics and remain part of the corpus.',
    ],
    commonMisunderstandings: [
      'Pessimism is a philosophical diagnosis of striving, not a mood or the claim that nothing matters.',
      'Will is blind striving, not merely conscious decision.',
      'Representation and will are two aspects of one world, not two independently existing universes.',
      'Art offers temporary respite; compassion grounds moral worth; asceticism proposes a more radical quieting.',
      'Schopenhauer did not directly master Sanskrit traditions or state doctrines simply equivalent to Buddhism or Vedānta.',
      'His prejudicial writings cannot be excused by biography or allowed to replace philosophical explanation.',
    ],
    primaryBranchIds: ['metaphysics'],
    secondaryBranchIds: ['epistemology', 'ethics', 'aesthetics', 'philosophy-of-religion', 'continental-philosophy', 'philosophy-of-mind'],
    branchMemberships: [
      {branchId: 'metaphysics', status: 'major', note: 'Representation and will form a systematic metaphysics grounded controversially in embodiment.', confidence: 'high'},
      {branchId: 'continental-philosophy', status: 'precursor', note: 'A major predecessor for later continental, existential, and psychological traditions; the institutional label is retrospective.', confidence: 'high'},
      {branchId: 'ethics', status: 'major', note: 'Compassion, character, animal suffering, egoism, and ascetic denial make ethics central.', confidence: 'high'},
      {branchId: 'aesthetics', status: 'major', note: 'Aesthetic contemplation and music occupy a structural place in the system.', confidence: 'high'},
    ],
    branchContributions: [
      {branchId: 'metaphysics', summary: 'Connected transcendental representation to a controversial double-aspect metaphysics of embodied will.'},
      {branchId: 'ethics', summary: 'Made compassion rather than rule or contract the basis of moral worth and extended concern to animal suffering.'},
      {branchId: 'aesthetics', summary: 'Explained aesthetic absorption as temporary freedom from interested striving and gave music exceptional metaphysical status.'},
      {branchId: 'philosophy-of-religion', summary: 'Compared Christian asceticism and mediated South Asian materials within a contested philosophical account of salvation.'},
    ],
    suggestedFirstReading: 'The World as Will and Representation, Volume 1, Book I',
    beginnerReadingPath: [
      reading('Arthur Schopenhauer', 'The World as Will and Representation, Volume 1, Books I–II', 'intermediate', 'Establish representation and the embodied argument for will before turning to pessimism.'),
      reading('Arthur Schopenhauer', 'On the Basis of Morals', 'intermediate', 'A direct route into egoism, malice, compassion, and moral worth.'),
      reading('Robert Wicks', 'Arthur Schopenhauer', 'beginner', 'A specialist overview of the system, chronology, Asian reception, and influence.', 'article'),
    ],
    advancedReadingPath: [
      reading('Arthur Schopenhauer', 'On the Fourfold Root of the Principle of Sufficient Reason', 'advanced', 'Compare the 1813 and 1847 forms when possible and track four distinct kinds of ground.'),
      reading('Arthur Schopenhauer', 'The World as Will and Representation, Volume 2', 'advanced', 'Read the supplements alongside the corresponding first-volume books rather than as an independent system.'),
      reading('Christopher Janaway, ed.', 'The Cambridge Companion to Schopenhauer', 'advanced', 'Test Kantian, metaphysical, aesthetic, ethical, and religious interpretations against one another.', 'secondary'),
    ],
  },
  reviewNotePath: 'docs/editorial/reviews/schopenhauer.md',
  reviewLock: 'fnv1a64:e6679c58d230f518',
};

const kierkegaardSources: EditorialSource[] = [
  {
    id: 'kierkegaard-sep', type: 'scholarly-reference', authors: ['John Lippitt'], title: 'Søren Kierkegaard',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University',
    url: 'https://plato.stanford.edu/entries/kierkegaard/', accessedOn,
    note: 'Specialist overview used for life, authorship strategy, existence spheres, ethics, religion, politics, and reception.',
  },
  {
    id: 'kierkegaard-companion', type: 'scholarly-book', authors: ['Alastair Hannay', 'Gordon D. Marino'], editors: ['Alastair Hannay', 'Gordon D. Marino'],
    title: 'The Cambridge Companion to Kierkegaard', publisher: 'Cambridge University Press', year: 1998,
    doi: '10.1017/CCOL0521471516', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-kierkegaard/D4587D6E17C3C6D721982B7A9303250F', accessedOn,
    note: 'Independent collection used for irony, aesthetics, ethics, psychology, theology, politics, knowledge, and indirect communication disputes.',
  },
  {
    id: 'kierkegaard-either-or', type: 'primary-text', authors: ['Søren Kierkegaard'], editors: ['Howard V. Hong', 'Edna H. Hong'],
    title: 'Either/Or, Parts I–II', publisher: 'Princeton University Press', year: 1987,
    url: 'https://teol.ku.dk/bibliotek/sk_princeton/', accessedOn,
    note: 'Pseudonymous and editorially staged primary text used for aesthetic and ethical voices; neither A nor Judge William is treated as Kierkegaard’s transparent mouthpiece.',
  },
  {
    id: 'kierkegaard-fear-repetition', type: 'primary-text', authors: ['Søren Kierkegaard'], editors: ['Howard V. Hong', 'Edna H. Hong'],
    title: 'Fear and Trembling / Repetition', publisher: 'Princeton University Press', year: 1983,
    url: 'https://teol.ku.dk/bibliotek/sk_princeton/', accessedOn,
    note: 'Two distinct pseudonymous works used for Johannes de Silentio’s Abraham and Constantin Constantius’s experiment with repetition.',
  },
  {
    id: 'kierkegaard-anxiety', type: 'primary-text', authors: ['Søren Kierkegaard'], editors: ['Reidar Thomte', 'Albert B. Anderson'],
    title: 'The Concept of Anxiety', publisher: 'Princeton University Press', year: 1980,
    url: 'https://teol.ku.dk/bibliotek/sk_princeton/', accessedOn,
    note: 'Vigilius Haufniensis’s pseudonymous psychological deliberation used for possibility, freedom, hereditary sin, and anxiety.',
  },
  {
    id: 'kierkegaard-works-love', type: 'primary-text', authors: ['Søren Kierkegaard'], editors: ['Howard V. Hong', 'Edna H. Hong'],
    title: 'Works of Love', publisher: 'Princeton University Press', year: 1995,
    url: 'https://www.jstor.org/stable/j.ctt24hpg2', accessedOn,
    note: 'Signed primary work used for commanded neighbor-love, equality before God, hidden moral work, and the critique of preferential self-love.',
  },
  {
    id: 'kierkegaard-sickness', type: 'primary-text', authors: ['Søren Kierkegaard'], editors: ['Howard V. Hong', 'Edna H. Hong'],
    title: 'The Sickness Unto Death', publisher: 'Princeton University Press', year: 1980,
    url: 'https://teol.ku.dk/bibliotek/sk_princeton/', accessedOn,
    note: 'Anti-Climacus’s pseudonymous Christian psychological exposition used for the relational self, forms of despair, sin, and grounding in God.',
  },
  {
    id: 'kierkegaard-late', type: 'primary-text', authors: ['Søren Kierkegaard'], editors: ['Howard V. Hong', 'Edna H. Hong'],
    title: 'The Moment and Late Writings', publisher: 'Princeton University Press', year: 1998,
    url: 'https://teol.ku.dk/bibliotek/sk_princeton/', accessedOn,
    note: 'Signed late polemics used for the attack on established Christendom; their direct confrontational mode is distinguished from earlier pseudonymous strategy.',
  },
];

const kierkegaardAdditions: ArticleSection[] = [
  section('genres-corpus', 'Signed works, pseudonyms, journals, discourses, and late polemic', [
    'Kierkegaard’s corpus asks readers to distinguish not only titles but voices and publication acts. Either/Or, Fear and Trembling, Repetition, The Concept of Anxiety, Philosophical Fragments, Concluding Unscientific Postscript, and The Sickness Unto Death use named pseudonyms with different competencies, passions, and limitations. Kierkegaard often identifies himself as editor, publisher, or responsible author while requesting that claims be attributed to the pseudonymous speaker. A pseudonym can say something Kierkegaard wants a reader to consider without becoming a cipher for his settled doctrine.',
    'Alongside these works he published signed upbuilding discourses, Works of Love, Christian Discourses, and other religious texts. Journals and notebooks preserve planning, self-interpretation, drafts, spiritual reflection, and retrospective narratives, but private notes are not automatically more truthful than crafted publications. The Point of View, written in 1848 and published posthumously, describes the authorship as religious from the beginning; scholars dispute whether that claim reports an original plan or a unity recognized and reshaped later. The final attack on Christendom abandons much earlier indirection for signed public confrontation.',
  ], ['existentialism', 'philosophy-of-religion', 'philosophy-of-language'], ['kierkegaard'], ['Either/Or', 'Works of Love', 'The Moment']),
  section('repetition-choice-ethics', 'Repetition, choice, ethical continuity, and love', [
    'Choice in Kierkegaard is not valuable merely because an individual makes it. Either/Or’s Judge William argues that choosing oneself ethically gives continuity to a life otherwise scattered among moods and interesting possibilities. Yet the judge’s confidence in marriage, vocation, and social ethics is itself staged and limited; the religious authorship tests whether ethical self-possession can acknowledge guilt and dependence. Repetition, presented by Constantin Constantius and the young man, asks whether a life can receive actuality again rather than only recollect a lost possibility. Its failed experiment is literary evidence, not a tidy doctrine.',
    'Works of Love shifts the center from dramatic decision to sustained moral vision and practice. Neighbor-love is commanded, equal before God, patient, and often hidden from public admiration. It does not abolish friendship or erotic love, but criticizes preference when it makes another person an extension of the self. This emphasis complicates the isolated “leap” image of Kierkegaard. Ethical and religious existence involve attention, promise, forgiveness, works, and repeated formation. Inwardness is tested by how one loves concrete others, not authenticated by intensity alone.',
  ], ['ethics', 'existentialism', 'philosophy-of-religion'], ['kierkegaard'], ['Either/Or', 'Repetition', 'Works of Love']),
  section('politics-hierarchy-gender', 'The single individual, politics, social hierarchy, and gender', [
    'Kierkegaard’s critique of “the public,” leveling, and established Christendom can expose anonymous conformity and institutions that let responsibility disappear. It does not amount to a democratic political program. He was suspicious of mass politics and 1848 liberal movements, often conservative about social order, and more concerned with the individual’s relation to God than with designing equal institutions. Readers disagree whether his account of neighbor-love and critique of status contain radical egalitarian resources or whether political withdrawal leaves hierarchy insufficiently challenged.',
    'Gender presents a related tension. The writings expose possessive romantic fantasy and demand that every neighbor count equally before God, yet pseudonymous texts use gendered stereotypes, and Kierkegaard’s own social assumptions often retain male authority and conventional roles. Regine Olsen’s life should not be reduced to a spiritual instrument in the story he told about their broken engagement. Later feminist and political appropriations can productively transform concepts of selfhood, dependence, love, and recognition, but they should identify the transformation rather than convert Kierkegaard into a contemporary egalitarian he was not.',
  ], ['political-philosophy', 'ethics', 'feminist-philosophy'], ['kierkegaard'], ['Works of Love', 'The Point of View for My Work as an Author']),
];

const kierkegaardArticleSections = insertBefore(
  postKantianNineteenthPhilosopherArticles.kierkegaard,
  'misreadings-reading',
  kierkegaardAdditions,
);

const kierkegaardConfig: ModernClusterEditorialConfig = {
  sources: kierkegaardSources,
  articleSections: kierkegaardArticleSections,
  sectionCitations: sections(
    [['overview', 'copenhagen'], [q('kierkegaard-sep', 'section', '1–2'), q('kierkegaard-companion', 'book-chapter', 'Introduction and chapters on life, theology, and politics')]],
    [['pseudonyms', 'authorship'], [q('kierkegaard-sep', 'section', '2. The authorship'), q('kierkegaard-companion', 'book-chapter', 'Chapters on irony and authorship'), q('kierkegaard-either-or', 'work', 'Preface, Diapsalmata, and the Judge’s letters')]],
    [['subjectivity'], [q('kierkegaard-sep', 'section', '3. Aesthetics and 4. Ethics'), q('kierkegaard-companion', 'book-chapter', 'Chapters on knowledge, virtue, and indirect communication')]],
    [['stages'], [q('kierkegaard-either-or', 'standard-division', 'Part I and Part II'), q('kierkegaard-sep', 'section', '3–5')]],
    [['anxiety-despair'], [q('kierkegaard-anxiety', 'standard-division', 'Introduction and chapters I–V'), q('kierkegaard-sickness', 'standard-division', 'Part One and Part Two'), q('kierkegaard-companion', 'book-chapter', 'Chapters on psychology and theology')]],
    [['faith-abraham'], [q('kierkegaard-fear-repetition', 'standard-division', 'Fear and Trembling: Exordium, Eulogy, Problema I–III, and Epilogue'), q('kierkegaard-sep', 'section', '5. Religion')]],
    [['love-and-neighbor'], [q('kierkegaard-works-love', 'standard-division', 'First Series and Second Series'), q('kierkegaard-sep', 'section', '4. Ethics')]],
    [['against-system'], [q('kierkegaard-sep', 'section', '2 and 6'), q('kierkegaard-companion', 'book-chapter', 'Chapters on Hegel, knowledge, and theology')]],
    [['legacy'], [q('kierkegaard-sep', 'section', '6. Kierkegaard’s influence'), q('kierkegaard-companion', 'book-chapter', 'Reception discussions')]],
    [['genres-corpus'], [q('kierkegaard-sep', 'section', '2. The authorship'), q('kierkegaard-companion', 'book-chapter', 'Chapters on irony, authorship, and theology'), q('kierkegaard-late', 'work', 'The Moment and late writings')]],
    [['repetition-choice-ethics'], [q('kierkegaard-either-or', 'standard-division', 'Part II: the Judge’s letters'), q('kierkegaard-fear-repetition', 'standard-division', 'Repetition'), q('kierkegaard-works-love', 'standard-division', 'First and Second Series')]],
    [['politics-hierarchy-gender'], [q('kierkegaard-sep', 'section', '4–6'), q('kierkegaard-companion', 'book-chapter', 'Chapters on ethics, politics, and theology'), q('kierkegaard-works-love', 'standard-division', 'Works of Love on the neighbor and equality'), q('kierkegaard-late', 'work', 'The Moment')]],
    [['misreadings-reading'], [q('kierkegaard-sep', 'section', '2–6'), q('kierkegaard-companion', 'book-chapter', 'Chapters on authorship, ethics, psychology, theology, and politics'), q('kierkegaard-fear-repetition', 'work', 'Fear and Trembling / Repetition'), q('kierkegaard-works-love', 'work', 'Works of Love')]],
  ),
  evidence: {
    life: [q('kierkegaard-sep', 'section', '1. Life'), q('kierkegaard-companion', 'book-chapter', 'Introduction')],
    ideas: [q('kierkegaard-sep', 'section', '2–6'), q('kierkegaard-companion', 'book-chapter', 'Chapters on ethics, psychology, knowledge, theology, and politics')],
    works: [q('kierkegaard-either-or', 'work', 'Either/Or I–II'), q('kierkegaard-fear-repetition', 'work', 'Fear and Trembling / Repetition'), q('kierkegaard-anxiety', 'work', 'The Concept of Anxiety'), q('kierkegaard-works-love', 'work', 'Works of Love'), q('kierkegaard-sickness', 'work', 'The Sickness Unto Death'), q('kierkegaard-late', 'work', 'The Moment and late writings')],
    influence: [q('kierkegaard-sep', 'section', '6. Kierkegaard’s influence'), q('kierkegaard-companion', 'book-chapter', 'Reception discussions')],
    disputes: [q('kierkegaard-sep', 'section', '2–6'), q('kierkegaard-companion', 'book-chapter', 'Chapters on irony, ethics, politics, and theology')],
    reading: [q('kierkegaard-either-or', 'standard-division', 'Selected Part I and Part II texts'), q('kierkegaard-fear-repetition', 'work', 'Fear and Trembling / Repetition'), q('kierkegaard-works-love', 'work', 'Works of Love'), q('kierkegaard-sickness', 'work', 'The Sickness Unto Death')],
  },
  patch: {
    lifeStory: 'Søren Kierkegaard lived and wrote in Copenhagen, studied theology, broke an engagement with Regine Olsen, published an extraordinary sequence of pseudonymous books and signed discourses, endured public caricature during the Corsair affair, and ended with a signed attack on established Danish Christendom. Biographical events inform the authorship but do not decode every fictional voice or concept.',
    historicalContext: 'Kierkegaard wrote within Lutheran Danish Christendom, Copenhagen press and theater culture, Golden Age theology and literature, post-Hegelian debate, 1848 political upheaval, and changing forms of publicity. His “single individual” addresses both speculative system and social evasion, not an abstract human isolated from every relation.',
    contributionSummary: 'Used pseudonymous and signed forms to investigate anxiety, despair, inwardness, choice, repetition, love, faith, and the task of becoming a self before God.',
    beginnerExplanation: 'Kierkegaard does not hand every conclusion to the reader in his own voice. Pseudonyms stage ways of living, signed discourses address religious formation, and late polemics confront Christendom directly. Ask who speaks, what evasion the text exposes, and how truth would have to be lived—not only whether a slogan sounds inspiring.',
    dateDisplay: '1813 CE–1855 CE', dateConfidence: 'high', dateNote: 'Birth and death dates are secure. Authorial attribution requires genre-level confidence: pseudonymous works, signed works, journals, posthumous texts, and late polemics have different evidential roles.',
    centralQuestions: [
      'How does an existing individual appropriate truth rather than merely possess correct propositions?',
      'How do anxiety, despair, choice, repetition, and love shape the task of becoming a self?',
      'What can faith mean when it cannot be reduced to social morality or institutional Christian membership?',
      'Why might indirect communication awaken responsibility more effectively than a direct doctrine?',
    ],
    mainIdeas: ['Indirect communication', 'Inwardness and subjective truth', 'Anxiety and possibility', 'Despair and the relational self', 'Choice and repetition', 'Faith and offense', 'Neighbor-love'],
    keyWorks: ['Either/Or', 'Fear and Trembling', 'Repetition', 'The Concept of Anxiety', 'Philosophical Fragments', 'Concluding Unscientific Postscript', 'Works of Love', 'The Sickness Unto Death', 'The Moment'],
    keyWorksDetailed: [
      {title: 'Either/Or', year: 1843, summary: 'An editor presents aesthetic papers and Judge William’s ethical letters through layered pseudonymous voices.', whyItMatters: 'It stages rather than simply endorses aesthetic and ethical possibilities, making attribution and form part of the philosophy.'},
      {title: 'Fear and Trembling', year: 1843, summary: 'Johannes de Silentio repeatedly approaches Abraham, resignation, faith, and the teleological suspension of the ethical.', whyItMatters: 'The pseudonym cannot understand faith, and the work is not a direct license for private violence or a complete doctrine of ethics.'},
      {title: 'Repetition', year: 1843, summary: 'Constantin Constantius narrates an experiment in whether actuality can be received again rather than merely recollected.', whyItMatters: 'Its literary failure complicates any formula equating repetition with habit or simple recurrence.'},
      {title: 'The Concept of Anxiety', year: 1844, summary: 'Vigilius Haufniensis examines anxiety, possibility, freedom, innocence, and hereditary sin.', whyItMatters: 'It is a pseudonymous psychological deliberation, not a modern clinical manual.'},
      {title: 'Concluding Unscientific Postscript', year: 1846, summary: 'Johannes Climacus investigates subjective truth, existence, Christianity, and the limits of speculative system.', whyItMatters: 'Its famous formulations belong to a pseudonym who explicitly says he is not a Christian.'},
      {title: 'Works of Love', year: 1847, summary: 'Signed deliberations develop commanded neighbor-love, equality before God, patience, hope, and hidden moral work.', whyItMatters: 'It corrects the picture of Kierkegaard as concerned only with solitary choice or dramatic faith.'},
      {title: 'The Sickness Unto Death', year: 1849, summary: 'Anti-Climacus analyzes the self as a relation, forms of despair, sin, and grounding in God.', whyItMatters: 'Its Christian ideal is intentionally elevated, and its pseudonymous authority differs from both Climacus and signed discourse.'},
      {title: 'The Moment', year: 1855, summary: 'Signed pamphlets attack the established church’s identification of social membership with Christianity.', whyItMatters: 'The direct late polemic marks a different communicative mode from the earlier pseudonymous authorship.'},
    ],
    intellectualDevelopment: [
      'Early irony and aesthetic writing culminate in the layered pseudonymous works and accompanying signed discourses of 1843–1846.',
      'Climacus texts sharpen the difference between objective inquiry and the existing individual’s appropriation of Christianity.',
      'Signed Works of Love and Christian discourses emphasize neighbor-love, practice, equality before God, and religious formation.',
      'Anti-Climacus texts present an intensified Christian account of despair, offense, imitation, and dependence.',
      'The final signed attack on Christendom turns indirect communication into open public confrontation.',
    ],
    influencesReceived: ['Socrates and ancient irony', 'Lutheran Christianity and Danish theology', 'German Romantic literature', 'Hegelian philosophy and Danish Hegelianism', 'Copenhagen theater, journalism, and public culture'],
    influenceOnLaterThought: ['Existential philosophy and theology', 'Phenomenology and accounts of anxiety and selfhood', 'Psychology and psychoanalytic thought', 'Literary modernism and indirect authorship', 'Critiques of mass society, publicity, and institutional religion'],
    controversiesOrInterpretiveTensions: [
      'Pseudonymous claims cannot automatically be attributed to Kierkegaard, yet pseudonyms are not unrelated fictional strangers.',
      'The Point of View’s retrospective claim of a unified religious authorship remains disputed.',
      'The aesthetic, ethical, and religious are spheres or possibilities, not a universal three-stage ladder.',
      'Fear and Trembling does not resolve whether religious faith can suspend ethics without licensing fanaticism.',
      'Subjective truth is not factual relativism, and “leap of faith” is an inadequate universal summary of the corpus.',
      'Neighbor-love supports equality before God while Kierkegaard’s politics, social hierarchy, and gender assumptions remain contested and often conservative.',
      'Journals illuminate composition and self-understanding but do not supply an unmediated final authorial voice.',
    ],
    commonMisunderstandings: [
      'Not every pseudonymous sentence states Kierkegaard’s own doctrine.',
      'The authorship is not reducible to three stages of life.',
      'Faith is not generic irrational belief or a license to obey any private command.',
      'Subjectivity does not make objective facts whatever one passionately wishes.',
      'Inwardness does not eliminate love, obligation, or relation to concrete neighbors.',
      'Kierkegaard is a precursor to existentialism, not a self-described member of a later movement.',
    ],
    primaryBranchIds: ['philosophy-of-religion'],
    secondaryBranchIds: ['existentialism', 'ethics', 'philosophy-of-mind', 'philosophy-of-language', 'political-philosophy'],
    branchMemberships: [
      {branchId: 'philosophy-of-religion', status: 'major', note: 'Christian existence, faith, offense, despair, love, and the critique of Christendom organize the authorship.', confidence: 'high'},
      {branchId: 'existentialism', status: 'precursor', note: 'A decisive precursor through existence, anxiety, choice, despair, and selfhood; he predates and did not use the later movement label.', confidence: 'high'},
      {branchId: 'ethics', status: 'major', note: 'Ethical choice, neighbor-love, responsibility, and the limits of universal ethics are central across signed and pseudonymous works.', confidence: 'high'},
    ],
    branchContributions: [
      {branchId: 'philosophy-of-religion', summary: 'Distinguished socially inherited Christendom from demanding Christian existence, faith, offense, and imitation.'},
      {branchId: 'existentialism', summary: 'Made anxiety, despair, choice, inwardness, and becoming a self decisive problems for later existential thought.'},
      {branchId: 'ethics', summary: 'Staged ethical continuity, responsibility, love, forgiveness, and the dangerous boundary between ethics and faith.'},
      {branchId: 'philosophy-of-language', summary: 'Made speaker, genre, irony, pseudonym, and indirect communication part of philosophical method.'},
    ],
    suggestedFirstReading: 'Works of Love, selected deliberations',
    beginnerReadingPath: [
      reading('Søren Kierkegaard', 'Works of Love, selected deliberations', 'intermediate', 'Begin with signed writing on neighbor-love and equality before approaching the most dramatic pseudonyms.'),
      reading('Søren Kierkegaard', 'Either/Or, selected aesthetic papers and Judge William’s letters', 'intermediate', 'Compare voices without assuming either side is Kierkegaard’s final doctrine.'),
      reading('John Lippitt', 'Søren Kierkegaard', 'beginner', 'A specialist guide to the life, authorship, ideas, and major disputes.', 'article'),
    ],
    advancedReadingPath: [
      reading('Søren Kierkegaard', 'Fear and Trembling / Repetition', 'advanced', 'Read the paired 1843 pseudonymous experiments while keeping Johannes de Silentio and Constantin Constantius distinct.'),
      reading('Søren Kierkegaard', 'The Concept of Anxiety / The Sickness Unto Death', 'advanced', 'Compare two pseudonymous Christian psychologies of possibility, freedom, selfhood, and despair.'),
      reading('Alastair Hannay and Gordon D. Marino, eds.', 'The Cambridge Companion to Kierkegaard', 'advanced', 'Compare disputes over irony, ethics, psychology, theology, politics, and indirect communication.', 'secondary'),
      reading('Søren Kierkegaard', 'The Moment and Late Writings', 'advanced', 'Conclude with the signed attack on Christendom and its shift in communicative strategy.'),
    ],
  },
  reviewNotePath: 'docs/editorial/reviews/kierkegaard.md',
  reviewLock: 'fnv1a64:d23d163a8cb1e6c8',
};

const configs: Record<string, ModernClusterEditorialConfig> = {
  schelling: schellingConfig,
  hegel: hegelConfig,
  schopenhauer: schopenhauerConfig,
  kierkegaard: kierkegaardConfig,
};

/** Proposed entity-complete editorial override. Registration belongs to the primary integrator. */
export const applyModernGermanIdealistReactionsEditorial = (record: Philosopher): Philosopher =>
  applyModernClusterEditorialConfig(record, configs[record.id]);

export const MODERN_GERMAN_IDEALIST_REACTIONS_EDITORIAL_TARGET_IDS = Object.freeze([
  'schelling',
  'hegel',
  'schopenhauer',
  'kierkegaard',
] as const);
