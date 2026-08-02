import type {EditorialSource, Philosopher, ReadingEntry} from '../../types/philosophy';
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

const fregeSources: EditorialSource[] = [
  {id: 'frege-sep', type: 'scholarly-reference', authors: ['Edward N. Zalta'], title: 'Gottlob Frege', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/frege/', accessedOn: '2026-08-02', note: 'Specialist overview used for chronology, logicism, language, reception, and interpretive cautions.'},
  {id: 'frege-logic-sep', type: 'scholarly-reference', authors: ['Edward N. Zalta'], title: 'Frege’s Logic', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/frege-logic/', accessedOn: '2026-08-02', note: 'Technical reconstruction used for quantification, functions, Basic Law V, and the limits of Frege’s formal system.'},
  {id: 'frege-foundations', type: 'primary-text', authors: ['Gottlob Frege'], title: 'Die Grundlagen der Arithmetik', publisher: 'Project Gutenberg', year: 1884, url: 'https://www.gutenberg.org/ebooks/48312', accessedOn: '2026-08-02', note: 'Inspectable German primary text; citations use Frege’s durable section numbers rather than invented pages.'},
  {id: 'frege-basic-laws', type: 'primary-text', authors: ['Gottlob Frege'], title: 'Basic Laws of Arithmetic, volumes I–II', publisher: 'Frege.info scholarly translation project', url: 'https://frege.info/basiclaws/index.html', accessedOn: '2026-08-02', note: 'Inspectible translation used for the mature logicist system, Basic Law V, and the volume II afterword.'},
  {id: 'frege-russell-paradox-sep', type: 'scholarly-reference', authors: ['Andrew David Irvine', 'Harry Deutsch'], title: 'Russell’s Paradox', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/russell-paradox/', accessedOn: '2026-08-02', note: 'Independent specialist account of the contradiction and its foundational consequences.'},
  {id: 'frege-cambridge', type: 'scholarly-book', authors: ['Tom Ricketts', 'Michael Potter'], editors: ['Tom Ricketts', 'Michael Potter'], title: 'The Cambridge Companion to Frege', publisher: 'Cambridge University Press', year: 2010, doi: '10.1017/CCOL9780521624282', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-frege/22CE23E3C68A4F032688F71C54AF7F3A', accessedOn: '2026-08-02', note: 'Independent specialist collection used through named chapter topics and opened publisher summaries.'},
];

const russellSources: EditorialSource[] = [
  {id: 'russell-sep', type: 'scholarly-reference', authors: ['Andrew David Irvine'], title: 'Bertrand Russell', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/russell/', accessedOn: '2026-08-02', note: 'Specialist overview used for chronology, changing doctrines, logic, epistemology, and public life.'},
  {id: 'russell-on-denoting', type: 'primary-text', authors: ['Bertrand Russell'], title: 'On Denoting', containerTitle: 'Mind', year: 1905, doi: '10.1093/mind/XIV.4.479', url: 'https://doi.org/10.1093/mind/XIV.4.479', accessedOn: '2026-08-02', note: 'Primary article; the publication range 479–493 is used only as a whole-article locator.'},
  {id: 'russell-principia-sep', type: 'scholarly-reference', authors: ['Bernard Linsky'], title: 'Principia Mathematica', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/principia-mathematica/', accessedOn: '2026-08-02', note: 'Specialist account of logicism, ramified type theory, and the axiom of reducibility.'},
  {id: 'russell-descriptions-sep', type: 'scholarly-reference', authors: ['Peter Ludlow'], title: 'Descriptions', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/descriptions/', accessedOn: '2026-08-02', note: 'Specialist treatment of existence, uniqueness, scope, and later description theories.'},
  {id: 'russell-problems', type: 'primary-text', authors: ['Bertrand Russell'], title: 'The Problems of Philosophy', publisher: 'Project Gutenberg', year: 1912, url: 'https://www.gutenberg.org/ebooks/5827', accessedOn: '2026-08-02', note: 'Primary text used for acquaintance, description, universals, and the beginner reading route.'},
  {id: 'russell-nobel', type: 'institutional-archive', authors: ['Nobel Prize Outreach'], title: 'Bertrand Russell – Biographical', publisher: 'Nobel Foundation', year: 1950, url: 'https://www.nobelprize.org/prizes/literature/1950/russell/biographical/', accessedOn: '2026-08-02', note: 'Official prize biography used only for documented public chronology and the Literature prize, not technical philosophy.'},
  {id: 'russell-cambridge', type: 'scholarly-book', authors: ['Nicholas Griffin'], editors: ['Nicholas Griffin'], title: 'The Cambridge Companion to Bertrand Russell', publisher: 'Cambridge University Press', year: 2003, doi: '10.1017/CCOL0521631785', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-bertrand-russell/BF803D4DD1E7B9A185620EED19F8ABEA', accessedOn: '2026-08-02', note: 'Independent specialist collection used for development, logicism, descriptions, analysis, epistemology, and moral philosophy.'},
];

const mooreSources: EditorialSource[] = [
  {id: 'moore-sep', type: 'scholarly-reference', authors: ['Thomas Baldwin'], title: 'George Edward Moore', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/moore/', accessedOn: '2026-08-02', note: 'Specialist overview used for chronology, method, idealism, common sense, and external-world arguments.'},
  {id: 'moore-moral-sep', type: 'scholarly-reference', authors: ['Thomas Hurka'], title: 'Moore’s Moral Philosophy', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/moore-moral/', accessedOn: '2026-08-02', note: 'Specialist account of non-naturalism, the open question, organic unities, ideal consequentialism, and influence.'},
  {id: 'moore-principia', type: 'primary-text', authors: ['G. E. Moore'], title: 'Principia Ethica', publisher: 'Project Gutenberg', year: 1903, url: 'https://www.gutenberg.org/ebooks/53430', accessedOn: '2026-08-02', note: 'Inspectable primary text; citations use Moore’s numbered sections.'},
  {id: 'moore-refutation', type: 'primary-text', authors: ['G. E. Moore'], title: 'The Refutation of Idealism', containerTitle: 'Mind', year: 1903, doi: '10.1093/mind/XII.4.433', url: 'https://doi.org/10.1093/mind/XII.4.433', accessedOn: '2026-08-02', note: 'Primary article used at whole-work scope; no unseen page-specific claim is made.'},
  {id: 'moore-proof', type: 'primary-text', authors: ['G. E. Moore'], title: 'Proof of an External World', containerTitle: 'Proceedings of the British Academy', year: 1939, url: 'https://home.csulb.edu/~cwallis/382/readings/382/Moore_Proof.html', accessedOn: '2026-08-02', note: 'University-hosted transcription of the primary lecture, originally volume 25, pages 273–300; cited at whole-work scope without direct quotation.'},
  {id: 'moore-broad', type: 'journal-article', authors: ['C. D. Broad'], title: 'Moore’s Defence of Common Sense: A Reappraisal', containerTitle: 'Philosophy', year: 1979, doi: '10.1017/S0031819100019343', url: 'https://doi.org/10.1017/S0031819100019343', accessedOn: '2026-08-02', note: 'Independent scholarly reassessment of Moore’s common-sense method.'},
];

const whiteheadSources: EditorialSource[] = [
  {id: 'whitehead-sep', type: 'scholarly-reference', authors: ['Andrew David Irvine'], title: 'Alfred North Whitehead', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/whitehead/', accessedOn: '2026-08-02', note: 'Specialist overview used for biography, periodization, mathematics, nature, metaphysics, God, and reception.'},
  {id: 'whitehead-principia-sep', type: 'scholarly-reference', authors: ['Bernard Linsky'], title: 'Principia Mathematica', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/principia-mathematica/', accessedOn: '2026-08-02', note: 'Specialist account of the joint logicist project and its limitations.'},
  {id: 'whitehead-science-modern', type: 'primary-text', authors: ['Alfred North Whitehead'], title: 'Science and the Modern World', publisher: 'Project Gutenberg', year: 1925, url: 'https://www.gutenberg.org/ebooks/68611', accessedOn: '2026-08-02', note: 'Primary text used for simple location, abstraction, and misplaced concreteness.'},
  {id: 'whitehead-concept-nature', type: 'primary-text', authors: ['Alfred North Whitehead'], title: 'The Concept of Nature', publisher: 'Project Gutenberg', year: 1920, url: 'https://www.gutenberg.org/ebooks/18835', accessedOn: '2026-08-02', note: 'Primary text used for nature, events, and the critique of bifurcation.'},
  {id: 'whitehead-material-world', type: 'primary-text', authors: ['Alfred North Whitehead'], title: 'On Mathematical Concepts of the Material World', containerTitle: 'Philosophical Transactions of the Royal Society A', year: 1906, doi: '10.1098/rsta.1906.0014', url: 'https://doi.org/10.1098/rsta.1906.0014', accessedOn: '2026-08-02', note: 'Primary article used to document continuity between mathematical and later relational concerns.'},
  {id: 'whitehead-rep', type: 'scholarly-reference', authors: ['James Bradley'], title: 'Whitehead, Alfred North (1861–1947)', containerTitle: 'Routledge Encyclopedia of Philosophy', publisher: 'Taylor & Francis', year: 1998, doi: '10.4324/9780415249126-DD071-1', url: 'https://www.rep.routledge.com/articles/biographical/whitehead-alfred-north-1861-1947/v-1', accessedOn: '2026-08-02', note: 'Independent scholarly reference used for mathematical, scientific, and metaphysical development.'},
];

const configs: Record<string, ModernClusterEditorialConfig> = {
  frege: {
    sources: fregeSources,
    sectionCitations: {
      overview: [q('frege-sep', 'section', 'Introduction; §§1–3'), q('frege-cambridge', 'chapter', 'Introduction; chapters 2–3')],
      'nineteenth-century-context': [q('frege-sep', 'section', '§§1–2'), q('frege-cambridge', 'chapter', 'Chapter 10 — Frege’s mathematical setting')],
      'anti-psychologism': [q('frege-foundations', 'standard-division', 'Introduction and §§26–27'), q('frege-sep', 'section', '§2.7')],
      'concept-script': [q('frege-logic-sep', 'section', '§§1–3'), q('frege-cambridge', 'chapter', 'Chapter 3 — Frege’s conception of logic')],
      logicism: [q('frege-foundations', 'standard-division', '§§1–17 and §§55–69'), q('frege-basic-laws', 'work', 'Volume I, introduction and formal system'), q('frege-sep', 'section', '§2')],
      'context-principle': [q('frege-foundations', 'standard-division', '§§45–69, especially §§60 and 62'), q('frege-cambridge', 'chapter', 'Chapter 6 — Concepts, objects and the Context Principle')],
      'sense-reference': [q('frege-sep', 'section', '§§3.1–3.2'), q('frege-cambridge', 'chapter', 'Chapters 7–9 — sense, reference, and semantics')],
      'concept-object': [q('frege-logic-sep', 'section', '§§2–4'), q('frege-cambridge', 'chapter', 'Chapters 5–6 — predicates, concepts, and objects')],
      'thought-truth': [q('frege-sep', 'section', '§§3.1–3.3'), q('frege-cambridge', 'chapter', 'Chapters 7–9')],
      'paradox-crisis': [q('frege-basic-laws', 'work', 'Volume II, afterword'), q('frege-russell-paradox-sep', 'section', '§2'), q('frege-cambridge', 'chapter', 'Chapter 12 — Basic Law V')],
      'logicism-after-failure': [q('frege-logic-sep', 'section', '§5'), q('frege-russell-paradox-sep', 'section', '§§2–3'), q('frege-cambridge', 'chapter', 'Chapters 2–3 and 12')],
      influence: [q('frege-sep', 'section', '§4'), q('frege-cambridge', 'chapter', 'Chapters 13–14 — Russell and Wittgenstein reception')],
      'reading-strategy': [q('frege-foundations', 'work', 'Whole work'), q('frege-basic-laws', 'work', 'Volume I introduction; volume II afterword'), q('frege-cambridge', 'chapter', 'Contents and bibliography')],
    },
    evidence: {
      life: [q('frege-sep', 'section', '§1'), q('frege-cambridge', 'chapter', 'Introduction')],
      ideas: [q('frege-sep', 'section', '§§2–3'), q('frege-logic-sep', 'section', '§§1–5')],
      works: [q('frege-foundations', 'work', 'Whole work'), q('frege-basic-laws', 'work', 'Volumes I–II'), q('frege-cambridge', 'chapter', 'Contents and bibliography')],
      influence: [q('frege-sep', 'section', '§4'), q('frege-cambridge', 'chapter', 'Chapters 13–14')],
      disputes: [q('frege-russell-paradox-sep', 'section', '§§2–3'), q('frege-cambridge', 'chapter', 'Chapters 6–9 and 12')],
      reading: [q('frege-foundations', 'standard-division', 'Introduction; §§1–17 and 45–69'), q('frege-cambridge', 'chapter', 'Contents and bibliography')],
    },
    patch: {
      lifeStory: 'Gottlob Frege was born in Wismar in 1848, studied mathematics and science at Jena and Göttingen, and spent his academic career at Jena. His initially narrow reception widened through Russell, Wittgenstein, and later work in logic and philosophy of language.',
      historicalContext: 'Nineteenth-century projects of mathematical rigor, rival accounts of number, emerging formal logic, and disputes over whether logic and meaning could be reduced to psychology',
      beginnerExplanation: 'Frege asks how arithmetic, inference, and shared thought can be objective. His answer joins a new quantificational logic to analyses of number and meaning, but his original logicist foundation fails at Basic Law V; the failure and the surviving tools must be kept distinct.',
      dateDisplay: '1848–1925', dateConfidence: 'high', dateNote: 'Birth and death years are secure. Work dates distinguish the 1879 Begriffsschrift, the 1884 Foundations, the 1893/1903 Basic Laws volumes, and later essays rather than treating Frege’s system as one simultaneous doctrine.',
      keyWorks: ['Begriffsschrift', 'The Foundations of Arithmetic', 'Basic Laws of Arithmetic', 'On Sense and Reference', 'The Thought'],
      suggestedFirstReading: 'The Foundations of Arithmetic',
      beginnerReadingPath: [
        reading('Gottlob Frege', 'The Foundations of Arithmetic, Introduction and §§1–17, 45–69', 'intermediate', 'The clearest argumentative entry to anti-psychologism, number, and the context principle.'),
        reading('Gottlob Frege', 'On Sense and Reference', 'intermediate', 'Introduces the identity puzzle and the contested distinction between sense and reference.', 'essay'),
        reading('Edward N. Zalta', 'Gottlob Frege', 'beginner', 'Use the specialist overview to place the formal and semantic projects in chronology.', 'article'),
      ],
      advancedReadingPath: [
        reading('Gottlob Frege', 'Begriffsschrift, selected propositions', 'advanced', 'See what the new logical language was designed to express without treating its notation as the enduring result.'),
        reading('Gottlob Frege', 'Basic Laws of Arithmetic, volume I introduction and volume II afterword', 'advanced', 'Study the mature logicist program and Frege’s response to Russell’s contradiction.'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/frege.md', reviewLock: 'fnv1a64:a9ff1f96d5fcb9f1',
  },
  russell: {
    sources: russellSources,
    sectionCitations: {
      overview: [q('russell-sep', 'section', '§§1–4'), q('russell-cambridge', 'chapter', 'Introduction')],
      'cambridge-revolt': [q('russell-sep', 'section', '§2'), q('russell-cambridge', 'chapter', 'Chapters 2–3')],
      logicism: [q('russell-principia-sep', 'section', '§§1–2'), q('russell-cambridge', 'chapter', 'Chapters 1 and 5')],
      'paradox-type-theory': [q('russell-sep', 'section', '§3'), q('russell-principia-sep', 'section', 'Overview; §§1–2'), q('russell-cambridge', 'chapter', 'Chapter 8 — theory of types')],
      descriptions: [q('russell-on-denoting', 'page', '479–493', 'Whole primary article; no narrower page claim is made.'), q('russell-descriptions-sep', 'section', '§§1–2'), q('russell-cambridge', 'chapter', 'Chapter 6 — theory of descriptions')],
      acquaintance: [q('russell-problems', 'chapter', 'Chapters 4–5'), q('russell-sep', 'section', '§4')],
      'logical-atomism': [q('russell-sep', 'section', '§4'), q('russell-cambridge', 'chapter', 'Chapter 11 — logical atomism', 'A dated phase, not a lifelong doctrine.')],
      'external-world': [q('russell-problems', 'chapter', 'Chapters 1–5'), q('russell-cambridge', 'chapter', 'Chapters 13–14')],
      'ethics-public-life': [q('russell-sep', 'section', '§1'), q('russell-nobel', 'work', 'Official biographical page'), q('russell-cambridge', 'chapter', 'Chapter 15 — moral philosophy')],
      relations: [q('russell-sep', 'section', '§§2–4'), q('russell-cambridge', 'chapter', 'Chapters 3–4 and 11')],
      tensions: [q('russell-sep', 'section', '§§3–5'), q('russell-cambridge', 'chapter', 'Chapters 9–14')],
      'changing-philosophy': [q('russell-on-denoting', 'page', '479–493'), q('russell-principia-sep', 'section', '§§1–2'), q('russell-sep', 'section', '§§1 and 4')],
      'reading-strategy': [q('russell-problems', 'work', 'Whole work'), q('russell-on-denoting', 'page', '479–493'), q('russell-cambridge', 'chapter', 'Contents and bibliography')],
    },
    evidence: {
      life: [q('russell-sep', 'section', '§1'), q('russell-nobel', 'work', 'Official biographical page')],
      ideas: [q('russell-sep', 'section', '§§2–5'), q('russell-cambridge', 'chapter', 'Chapters 5–14')],
      works: [q('russell-on-denoting', 'page', '479–493'), q('russell-principia-sep', 'section', '§§1–2'), q('russell-problems', 'work', 'Whole work')],
      influence: [q('russell-sep', 'section', '§5'), q('russell-cambridge', 'chapter', 'Introduction')],
      disputes: [q('russell-cambridge', 'chapter', 'Chapters 5–14'), q('russell-descriptions-sep', 'section', '§§1–3')],
      reading: [q('russell-problems', 'work', 'Whole work'), q('russell-cambridge', 'chapter', 'Contents and bibliography')],
    },
    patch: {
      lifeStory: 'Bertrand Russell was born in 1872, studied mathematics and philosophy at Cambridge, collaborated with Alfred North Whitehead on Principia Mathematica, and pursued a long career that joined changing technical philosophies with public writing and political activism.',
      historicalContext: 'The Cambridge revolt against British idealism, new mathematical logic, foundational paradoxes, two world wars, antiwar activism, and the institutional growth of analytic philosophy',
      beginnerExplanation: 'Russell asks what grammar hides. Logical analysis can reveal existence, uniqueness, scope, and relation beneath ordinary sentences, but his answers about mathematics, knowledge, and reality changed repeatedly; no single phase should stand for his whole career.',
      dateDisplay: '1872–1970', dateConfidence: 'high', dateNote: 'Birth and death years are secure. The profile dates doctrines to relevant phases and distinguishes the 1950 Nobel Prize in Literature from Russell’s work in logic.',
      keyWorks: ['The Principles of Mathematics', 'On Denoting', 'Principia Mathematica', 'The Problems of Philosophy', 'The Philosophy of Logical Atomism'],
      suggestedFirstReading: 'The Problems of Philosophy',
      beginnerReadingPath: [
        reading('Bertrand Russell', 'The Problems of Philosophy', 'beginner', 'Accessible entry to appearance, acquaintance, universals, and knowledge.'),
        reading('Bertrand Russell', 'On Denoting', 'intermediate', 'Short, dense demonstration of analysis through existence, uniqueness, and scope.', 'essay'),
        reading('Andrew David Irvine', 'Bertrand Russell', 'beginner', 'A chronological guide that prevents one Russellian phase from becoming a lifelong doctrine.', 'article'),
      ],
      advancedReadingPath: [
        reading('Bertrand Russell and Alfred North Whitehead', 'Principia Mathematica, introductory selections', 'advanced', 'Study ramified types and the logicist architecture with specialist guidance.'),
        reading('Bertrand Russell', 'The Philosophy of Logical Atomism', 'advanced', 'Read as a historically situated metaphysical program rather than Russell’s final view.', 'lecture'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/russell.md', reviewLock: 'fnv1a64:f78956a7f35ed079',
  },
  'g-e-moore': {
    sources: mooreSources,
    sectionCitations: {
      overview: [q('moore-sep', 'section', '§1'), q('moore-moral-sep', 'section', 'Introduction')],
      'against-idealism': [q('moore-refutation', 'work', 'Whole article'), q('moore-sep', 'section', '§2')],
      method: [q('moore-sep', 'section', '§§1–4'), q('moore-broad', 'work', 'Whole article')],
      'principia-ethica': [q('moore-principia', 'standard-division', '§§1–22 and final chapter'), q('moore-moral-sep', 'section', '§§1–4')],
      'open-question': [q('moore-principia', 'standard-division', '§§10–14'), q('moore-moral-sep', 'section', '§1')],
      'organic-unities': [q('moore-principia', 'standard-division', '§§18–22'), q('moore-moral-sep', 'section', '§§3–4')],
      'ideal-consequentialism': [q('moore-principia', 'standard-division', '§§18–22 and chapter VI'), q('moore-moral-sep', 'section', '§§3–4')],
      'common-sense': [q('moore-sep', 'section', '§4'), q('moore-broad', 'work', 'Whole article')],
      'external-world': [q('moore-proof', 'work', 'Whole article'), q('moore-sep', 'section', '§4')],
      'russell-wittgenstein': [q('moore-sep', 'section', '§§1 and 4'), q('moore-broad', 'work', 'Whole article')],
      'ethics-influence': [q('moore-moral-sep', 'section', '§5'), q('moore-principia', 'work', 'Whole work')],
      misunderstandings: [q('moore-sep', 'section', '§§2–4'), q('moore-moral-sep', 'section', '§§1–5'), q('moore-broad', 'work', 'Whole article')],
      'reading-strategy': [q('moore-refutation', 'work', 'Whole article'), q('moore-principia', 'standard-division', '§§1–22 and chapter VI'), q('moore-proof', 'work', 'Whole article')],
    },
    evidence: {
      life: [q('moore-sep', 'section', '§1'), q('moore-broad', 'work', 'Whole article')],
      ideas: [q('moore-sep', 'section', '§§2–4'), q('moore-moral-sep', 'section', '§§1–5')],
      works: [q('moore-refutation', 'work', 'Whole article'), q('moore-principia', 'work', 'Whole work'), q('moore-proof', 'work', 'Whole article')],
      influence: [q('moore-sep', 'section', '§§1 and 4'), q('moore-moral-sep', 'section', '§5')],
      disputes: [q('moore-moral-sep', 'section', '§§1–5'), q('moore-broad', 'work', 'Whole article')],
      reading: [q('moore-principia', 'standard-division', '§§1–22 and chapter VI'), q('moore-sep', 'section', 'Bibliography')],
    },
    patch: {
      lifeStory: 'George Edward Moore was born in 1873, studied and taught at Cambridge, and became a central early analytic philosopher and long-serving editor of Mind. His deliberately plain style reshaped ethics, realism, and debates about skepticism.',
      historicalContext: 'The Cambridge revolt against British idealism, early analytic realism, the emergence of metaethics, and twentieth-century disputes over common sense and skepticism',
      beginnerExplanation: 'Moore asks when a philosophical theory has premises strong enough to overturn an ordinary judgment. In ethics he argues that good cannot simply be identified with another property, but the open-question argument, non-naturalism, and his ideal consequentialism remain disputed.',
      dateDisplay: '1873–1958', dateConfidence: 'high', dateNote: 'Birth and death years and major publication dates are secure. Claims of priority for non-naturalism are avoided because Moore had important predecessors.',
      keyWorks: ['The Refutation of Idealism', 'Principia Ethica', 'A Defence of Common Sense', 'Proof of an External World'],
      suggestedFirstReading: 'Principia Ethica, §§1–14',
      beginnerReadingPath: [
        reading('G. E. Moore', 'Principia Ethica, §§1–14', 'intermediate', 'Introduces indefinability, the open question, and Moore’s historically specific naturalistic-fallacy charge.'),
        reading('G. E. Moore', 'A Defence of Common Sense', 'intermediate', 'Distinguish claims Moore says he knows from an appeal to majority opinion.', 'essay'),
        reading('Thomas Hurka', 'Moore’s Moral Philosophy', 'beginner', 'A specialist map of non-naturalism, organic unities, consequentialism, and objections.', 'article'),
      ],
      advancedReadingPath: [
        reading('G. E. Moore', 'The Refutation of Idealism', 'advanced', 'Track the distinction between an experience and its object.', 'essay'),
        reading('G. E. Moore', 'Proof of an External World', 'advanced', 'Evaluate validity separately from the disputed premise that Moore knows he has hands.', 'lecture'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/g-e-moore.md', reviewLock: 'fnv1a64:8f3fe6dc386bf917',
  },
  whitehead: {
    sources: whiteheadSources,
    sectionCitations: {
      overview: [q('whitehead-sep', 'section', '§§1–8'), q('whitehead-rep', 'section', 'Article summary')],
      'mathematical-background': [q('whitehead-sep', 'section', '§2'), q('whitehead-principia-sep', 'section', 'Overview; §§1–2'), q('whitehead-material-world', 'page', '465–525', 'Whole primary article.')],
      'career-continuity': [q('whitehead-sep', 'section', '§§1–4 and 6'), q('whitehead-material-world', 'page', '465–525'), q('whitehead-concept-nature', 'chapter', 'Chapters I–II'), q('whitehead-science-modern', 'chapter', 'Chapters IV and X'), q('whitehead-rep', 'section', 'Article summary')],
      'science-modern-world': [q('whitehead-science-modern', 'chapter', 'Chapters IV and X'), q('whitehead-concept-nature', 'chapter', 'Chapters I–II'), q('whitehead-sep', 'section', '§§3–4')],
      'actual-occasions': [q('whitehead-sep', 'section', '§6'), q('whitehead-rep', 'section', 'Metaphysics overview', 'Detailed terminology is qualified because Process and Reality is not among the directly inspected primary-text sources.')],
      prehension: [q('whitehead-sep', 'section', '§6'), q('whitehead-rep', 'section', 'Metaphysics overview')],
      'organism-creativity': [q('whitehead-sep', 'section', '§6'), q('whitehead-science-modern', 'chapter', 'Chapters V–VI')],
      'god-possibility': [q('whitehead-sep', 'section', '§7'), q('whitehead-rep', 'section', 'Metaphysics overview', 'Theological interpretations remain disputed.')],
      'time-nature': [q('whitehead-concept-nature', 'chapter', 'Chapters I–IV'), q('whitehead-sep', 'section', '§§3–6')],
      'pragmatism-relations': [q('whitehead-sep', 'section', '§8'), q('whitehead-rep', 'section', 'Reception overview')],
      'eternal-objects': [q('whitehead-sep', 'section', '§§6–7'), q('whitehead-rep', 'section', 'Metaphysics overview')],
      influence: [q('whitehead-sep', 'section', '§8'), q('whitehead-rep', 'section', 'Reception overview')],
      'misunderstandings-reading': [q('whitehead-science-modern', 'chapter', 'Chapters IV and X'), q('whitehead-concept-nature', 'chapter', 'Chapters I–II'), q('whitehead-sep', 'section', '§§1–8')],
    },
    evidence: {
      life: [q('whitehead-sep', 'section', '§1'), q('whitehead-rep', 'section', 'Biography')],
      ideas: [q('whitehead-sep', 'section', '§§3–7'), q('whitehead-rep', 'section', 'Philosophy overview')],
      works: [q('whitehead-principia-sep', 'section', 'Overview'), q('whitehead-science-modern', 'work', 'Whole work'), q('whitehead-concept-nature', 'work', 'Whole work'), q('whitehead-material-world', 'page', '465–525')],
      influence: [q('whitehead-sep', 'section', '§8'), q('whitehead-rep', 'section', 'Reception overview')],
      disputes: [q('whitehead-sep', 'section', '§§6–8'), q('whitehead-rep', 'section', 'Metaphysics overview')],
      reading: [q('whitehead-science-modern', 'chapter', 'Chapters IV and X'), q('whitehead-concept-nature', 'chapter', 'Chapters I–II'), q('whitehead-sep', 'section', 'Bibliography')],
    },
    patch: {
      lifeStory: 'Alfred North Whitehead was born in England in 1861, worked first in mathematics and logic at Cambridge and London, and moved to Harvard in 1924, where his mature philosophy of organism and process took shape. The familiar three-period division is useful but preserves important continuities.',
      historicalContext: 'Modern mathematical logic, relativity and the philosophy of nature, criticism of scientific materialism, and the twentieth-century revival of systematic process metaphysics',
      beginnerExplanation: 'Whitehead asks whether a world understood through scientific abstraction can also contain experience, value, organism, and becoming. His answer treats events and relations as basic, but terms such as actual occasion, prehension, eternal object, and God belong to a contested speculative system, not conclusions established by modern physics.',
      dateDisplay: '1861–1947', dateConfidence: 'high', dateNote: 'Birth and death years are secure. The division into mathematical, philosophy-of-nature, and metaphysical periods is a scholarly heuristic rather than three disconnected careers.',
      keyWorks: ['Principia Mathematica', 'The Concept of Nature', 'Science and the Modern World', 'Process and Reality', 'Adventures of Ideas'],
      suggestedFirstReading: 'Science and the Modern World',
      beginnerReadingPath: [
        reading('Alfred North Whitehead', 'Science and the Modern World', 'intermediate', 'The best entry to abstraction, simple location, and the modern scientific world picture.'),
        reading('Alfred North Whitehead', 'The Concept of Nature, chapters I–II', 'intermediate', 'Introduces events and the critique of bifurcating nature.'),
        reading('Andrew David Irvine', 'Alfred North Whitehead', 'beginner', 'Establish chronology and vocabulary before approaching the mature system.', 'article'),
      ],
      advancedReadingPath: [
        reading('Alfred North Whitehead', 'Process and Reality', 'advanced', 'Use a verified edition and track actual entity, prehension, concrescence, society, creativity, and eternal object.'),
        reading('Alfred North Whitehead', 'Adventures of Ideas', 'advanced', 'A broader application of process thought to civilization, order, and value.'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/whitehead.md', reviewLock: 'fnv1a64:72ebd22cc3629142',
  },
};

export const applyAnalysisFoundersEditorial = (record: Philosopher): Philosopher =>
  applyModernClusterEditorialConfig(record, configs[record.id]);
