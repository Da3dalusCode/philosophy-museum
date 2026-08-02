import type {CitationReference, EditorialSource, Philosopher, ReadingEntry} from '../../types/philosophy';
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
const sections = (...groups: Array<[string[], CitationReference[]]>): Record<string, CitationReference[]> =>
  Object.fromEntries(groups.flatMap(([ids, citations]) => ids.map((id) => [id, citations])));

const accessedOn = '2026-08-02';

const carnapSources: EditorialSource[] = [
  {id: 'carnap-sep', type: 'scholarly-reference', authors: ['André W. Carus'], title: 'Rudolf Carnap', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/carnap/', accessedOn, note: 'Specialist overview used for chronology, changing projects, tolerance, semantics, and disputes with Quine.'},
  {id: 'vienna-circle-sep', type: 'scholarly-reference', authors: ['Thomas Uebel'], title: 'Vienna Circle', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/vienna-circle/', accessedOn, note: 'Independent contextual account used to avoid treating Carnap as the Circle’s sole founder or spokesman.'},
  {id: 'carnap-syntax', type: 'primary-text', authors: ['Rudolf Carnap'], title: 'The Logical Syntax of Language', translator: 'Amethe Smeaton', publisher: 'Routledge', year: 1937, url: 'https://www.routledge.com/Logical-Syntax-of-Language/Carnap/p/book/9780415613798', accessedOn, note: 'Primary source for syntax, linguistic frameworks, and the principle of tolerance; locators use chapter or named principle rather than unverified page numbers.'},
  {id: 'carnap-eso', type: 'primary-text', authors: ['Rudolf Carnap'], title: 'Empiricism, Semantics, and Ontology', year: 1950, url: 'https://warwick.ac.uk/fac/soc/philosophy/intranets/undergraduate/modules/ph251/2014-15/carnap_-_empiricismsemanticsontology.pdf', accessedOn, note: 'Primary source for internal and external questions and the practical adoption of linguistic frameworks.'},
  {id: 'carnap-companion', type: 'scholarly-book', authors: ['Michael Friedman', 'Richard Creath'], editors: ['Michael Friedman', 'Richard Creath'], title: 'The Cambridge Companion to Carnap', publisher: 'Cambridge University Press', year: 2007, doi: '10.1017/CCOL9780521840156', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-carnap/8A99011C9879416D18C9F696F7949D19', accessedOn, note: 'Independent collection used for interpretive disputes over the Aufbau, explication, probability, values, and Carnap’s legacy.'},
];

const quineSources: EditorialSource[] = [
  {id: 'quine-sep', type: 'scholarly-reference', authors: ['Gary Kemp'], title: 'Willard Van Orman Quine', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/quine/', accessedOn, note: 'Specialist overview used for chronology, naturalism, ontology, translation, and interpretive qualifications.'},
  {id: 'quine-two-dogmas', type: 'primary-text', authors: ['W. V. Quine'], title: 'Two Dogmas of Empiricism', containerTitle: 'The Philosophical Review', year: 1951, url: 'https://www.jstor.org/stable/2181906', accessedOn, note: 'Primary article used for the critique of analyticity and reductionism and for the web-of-belief image.'},
  {id: 'quine-word-object', type: 'primary-text', authors: ['W. V. Quine'], title: 'Word and Object', publisher: 'The MIT Press', year: 1960, url: 'https://mitpress.mit.edu/9780262518314/word-and-object/', accessedOn, note: 'Primary source for radical translation, indeterminacy, observation sentences, reference, and ontological commitment.'},
  {id: 'quine-companion', type: 'scholarly-book', authors: ['Roger F. Gibson Jr.'], editors: ['Roger F. Gibson Jr.'], title: 'The Cambridge Companion to Quine', publisher: 'Cambridge University Press', year: 2004, doi: '10.1017/CCOL0521630568', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-quine/FA4739188328026D213379D81B674027', accessedOn, note: 'Independent collection used for contested readings of analyticity, underdetermination, normativity, and naturalized epistemology.'},
  {id: 'quine-bibliography', type: 'institutional-archive', authors: ['W. V. Quine'], title: 'Quine’s Philosophical Writings and Selected Bibliography', publisher: 'Brown University', url: 'https://wvh.brown.edu/quine.html', accessedOn, note: 'Institutional corpus guide used to check work chronology and distinguish book-level claims from later formulations.'},
];

const popperSources: EditorialSource[] = [
  {id: 'popper-sep', type: 'scholarly-reference', authors: ['Stephen Thornton'], title: 'Karl Popper', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/popper/', accessedOn, note: 'Specialist overview used for chronology, demarcation, falsification, critical rationalism, and political disputes.'},
  {id: 'popper-logic', type: 'primary-text', authors: ['Karl Popper'], title: 'The Logic of Scientific Discovery', publisher: 'Routledge', year: 1959, url: 'https://www.routledge.com/The-Logic-of-Scientific-Discovery/Popper/p/book/9780415278447', accessedOn, note: 'Primary source for demarcation, testing, basic statements, corroboration, and methodological decisions.'},
  {id: 'popper-conjectures', type: 'primary-text', authors: ['Karl Popper'], title: 'Conjectures and Refutations', publisher: 'Routledge', year: 1963, url: 'https://www.routledge.com/Conjectures-and-Refutations-The-Growth-of-Scientific-Knowledge/Popper/p/book/9780415285940', accessedOn, note: 'Primary source for critical rationalism and the conjecture-refutation model.'},
  {id: 'popper-open-society', type: 'primary-text', authors: ['Karl Popper'], title: 'The Open Society and Its Enemies', publisher: 'Routledge', year: 1945, url: 'https://www.routledge.com/The-Open-Society-and-Its-Enemies/Popper/p/book/9780415610216', accessedOn, note: 'Primary political text; cited with explicit notice that its readings of Plato, Hegel, and Marx remain contested.'},
  {id: 'popper-companion', type: 'scholarly-book', authors: ['Jeremy Shearmur', 'Geoffrey Stokes'], editors: ['Jeremy Shearmur', 'Geoffrey Stokes'], title: 'The Cambridge Companion to Popper', publisher: 'Cambridge University Press', year: 2016, doi: '10.1017/CCO9781139046503', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-popper/08735339964B1A12ED71BFF8799E16B4', accessedOn, note: 'Independent collection used for disputes about falsification, probability, metaphysics, and political interpretation.'},
  {id: 'popper-rep', type: 'scholarly-reference', authors: ['Ian Jarvie'], title: 'Popper, Karl Raimund (1902–94)', containerTitle: 'Routledge Encyclopedia of Philosophy', publisher: 'Taylor & Francis', year: 1998, doi: '10.4324/9780415249126-DD052-1', url: 'https://www.rep.routledge.com/articles/biographical/popper-karl-raimund-1902-94/v-1', accessedOn, note: 'Independent reference account used for biographical and reception cross-checking.'},
];

const kuhnSources: EditorialSource[] = [
  {id: 'kuhn-sep', type: 'scholarly-reference', authors: ['Alexander Bird'], title: 'Thomas Kuhn', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/thomas-kuhn/', accessedOn, note: 'Specialist overview used for chronology, mature terminology, incommensurability, values, and realism debates.'},
  {id: 'kuhn-structure', type: 'primary-text', authors: ['Thomas S. Kuhn'], title: 'The Structure of Scientific Revolutions', edition: '50th Anniversary Edition, fourth edition', publisher: 'University of Chicago Press', year: 2012, url: 'https://press.uchicago.edu/ucp/books/book/chicago/S/bo13179781.html', accessedOn, note: 'Primary source; section-number locators follow the book’s stable Roman-numbered divisions rather than edition-dependent pages.'},
  {id: 'kuhn-tension', type: 'primary-text', authors: ['Thomas S. Kuhn'], title: 'The Essential Tension: Selected Studies in Scientific Tradition and Change', publisher: 'University of Chicago Press', year: 1977, url: 'https://press.uchicago.edu/ucp/books/book/chicago/E/bo5970650.html', accessedOn, note: 'Primary essays used for paradigms, discovery, normal research, and theory-choice values.'},
  {id: 'kuhn-road', type: 'primary-text', authors: ['Thomas S. Kuhn'], title: 'The Road since Structure: Philosophical Essays, 1970–1993, with an Autobiographical Interview', publisher: 'University of Chicago Press', year: 2000, url: 'https://press.uchicago.edu/ucp/books/author/K/T/au5252573.html', accessedOn, note: 'Primary late essays and interview used for taxonomic incommensurability and Kuhn’s later qualifications.'},
  {id: 'kuhn-revisited', type: 'scholarly-book', authors: ['Vasso Kindi', 'Theodore Arabatzis'], editors: ['Vasso Kindi', 'Theodore Arabatzis'], title: 'Kuhn’s The Structure of Scientific Revolutions Revisited', publisher: 'Routledge', year: 2012, url: 'https://www.routledge.com/Kuhns-The-Structure-of-Scientific-Revolutions-Revisited/Kindi-Arabatzis/p/book/9781138910874', accessedOn, note: 'Independent collection used for disputes about exemplars, revolutions, conceptual change, rationality, and realism.'},
  {id: 'kuhn-rep', type: 'scholarly-reference', authors: ['Paul Hoyningen-Huene'], title: 'Kuhn, Thomas Samuel (1922–96)', containerTitle: 'Routledge Encyclopedia of Philosophy', publisher: 'Taylor & Francis', year: 1998, doi: '10.4324/9780415249126-Q055-1', url: 'https://www.rep.routledge.com/articles/biographical/kuhn-thomas-samuel-1922-96/v-1', accessedOn, note: 'Independent reference account used for biography, reception, and the development from Structure to later work.'},
  {id: 'kuhn-mit-archive', type: 'institutional-archive', authors: ['MIT Institute Archives and Special Collections'], title: 'Thomas S. Kuhn, MIT Institute Office and Biographical History', publisher: 'Massachusetts Institute of Technology Libraries', url: 'https://libraries.mit.edu/mithistory/institute/offices/office-of-the-president/thomas-s-kuhn/', accessedOn, note: 'Institutional record used only for career chronology and archival orientation.'},
];

const configs: Record<string, ModernClusterEditorialConfig> = {
  carnap: {
    sources: carnapSources,
    sectionCitations: sections(
      [['overview', 'conceptual-engineering', 'temperament', 'misunderstandings'], [q('carnap-sep', 'section', '1–3'), q('carnap-companion', 'book-chapter', 'Introduction and chapters on explication and legacy')]],
      [['vienna-circle'], [q('vienna-circle-sep', 'section', '2–4'), q('carnap-sep', 'section', '1. Life and work')]],
      [['aufbau'], [q('carnap-sep', 'section', '2. The Aufbau'), q('carnap-companion', 'book-chapter', 'Chapters on the Aufbau and construction theory')]],
      [['metaphysics-critique'], [q('carnap-sep', 'section', '3. Elimination of metaphysics'), q('carnap-companion', 'book-chapter', 'Chapters on metaphysics and philosophy')]],
      [['syntax', 'tolerance'], [q('carnap-syntax', 'chapter', 'I–V'), q('carnap-sep', 'section', '4. Logical syntax')]],
      [['semantics'], [q('carnap-eso', 'section', 'I–III'), q('carnap-sep', 'section', '5. Semantics')]],
      [['confirmation', 'science-unity'], [q('carnap-sep', 'section', '6–7'), q('carnap-companion', 'book-chapter', 'Chapters on probability and unity of science')]],
      [['quine-dispute'], [q('carnap-sep', 'section', '8. Quine and Carnap'), q('carnap-companion', 'book-chapter', 'Chapters on Carnap and Quine')]],
      [['reading-strategy'], [q('carnap-syntax', 'chapter', 'I'), q('carnap-eso', 'section', 'I–III'), q('carnap-companion', 'book-chapter', 'Introduction')]],
    ),
    evidence: {
      life: [q('carnap-sep', 'section', '1. Life and work'), q('vienna-circle-sep', 'section', '2. History')],
      ideas: [q('carnap-sep', 'section', '2–8'), q('carnap-companion', 'book-chapter', 'Introduction')],
      works: [q('carnap-syntax', 'chapter', 'I–V'), q('carnap-eso', 'section', 'I–III')],
      influence: [q('carnap-companion', 'book-chapter', 'Chapters on legacy and Quine'), q('carnap-sep', 'section', '8')],
      disputes: [q('carnap-companion', 'book-chapter', 'Chapters on the Aufbau, values, and Quine'), q('carnap-sep', 'section', '2–8')],
      reading: [q('carnap-syntax', 'chapter', 'I'), q('carnap-eso', 'section', 'I–III')],
    },
    patch: {
      lifeStory: 'Rudolf Carnap moved from German mathematics and philosophy into the Vienna Circle’s collaborative program, then rebuilt his work through syntax, semantics, probability, and explication after emigrating to the United States. He was a central participant rather than the Circle’s sole founder or leader, and his projects changed substantially over time.',
      historicalContext: 'Carnap worked amid disputes over neo-Kantianism, conventionalism, modern logic, relativity, empiricism, and the public role of scientific philosophy. National Socialism destroyed the Circle’s institutional setting and forced emigration; later American debates with Quine altered how Carnap’s framework proposals were read.',
      beginnerExplanation: 'Carnap asks how philosophical confusion can be reduced by designing clearer languages and concepts. His tolerance principle does not say that every framework is equally good: frameworks are assessed for the purposes they serve, while empirical questions are answered within them. Quine’s objections transformed this program but did not produce an uncontested one-step refutation.',
      dateDisplay: '1891–1970', dateConfidence: 'high', dateNote: 'Birth and death years are secure. The German Logical Syntax appeared in 1934; the revised English translation appeared in 1937.',
      keyWorks: ['The Logical Structure of the World', 'The Logical Syntax of Language', 'Meaning and Necessity', 'Empiricism, Semantics, and Ontology', 'Logical Foundations of Probability'],
      suggestedFirstReading: 'Empiricism, Semantics, and Ontology',
      beginnerReadingPath: [
        reading('Rudolf Carnap', 'Empiricism, Semantics, and Ontology', 'beginner', 'A concise route into internal questions, framework adoption, and Carnap’s mature practical stance.', 'essay'),
        reading('André W. Carus', 'Rudolf Carnap', 'beginner', 'Use the specialist overview to keep Carnap’s changing projects distinct.', 'article'),
        reading('Rudolf Carnap', 'The Logical Syntax of Language, Part I', 'intermediate', 'Introduces formal languages and the principle of tolerance without requiring the whole technical book.'),
      ],
      advancedReadingPath: [
        reading('Rudolf Carnap', 'The Logical Structure of the World', 'advanced', 'Read as a constructional project whose empiricist basis and ambitions remain disputed.'),
        reading('Michael Friedman and Richard Creath, eds.', 'The Cambridge Companion to Carnap', 'advanced', 'Compare rival accounts of explication, tolerance, probability, values, and Quine.'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/carnap.md', reviewLock: 'fnv1a64:3ab54d7ed36a2d74',
  },
  quine: {
    sources: quineSources,
    sectionCitations: sections(
      [['overview', 'background', 'influence', 'misunderstandings'], [q('quine-sep', 'section', '1–2 and 8–10'), q('quine-companion', 'book-chapter', 'Introduction and chapters on naturalism and legacy')]],
      [['two-dogmas', 'web-belief'], [q('quine-two-dogmas', 'section', 'Sections 1–6'), q('quine-companion', 'book-chapter', 'Chapters on analyticity and confirmation')]],
      [['ontology'], [q('quine-word-object', 'chapter', 'Chapters 1 and 7'), q('quine-sep', 'section', '6. Ontology')]],
      [['translation', 'reference', 'indeterminacy-underdetermination'], [q('quine-word-object', 'chapter', 'Chapter 2'), q('quine-sep', 'section', '4–5')]],
      [['naturalized-epistemology', 'logic-science'], [q('quine-sep', 'section', '7–9'), q('quine-companion', 'book-chapter', 'Chapters on naturalism and logic')]],
      [['carnap-relation'], [q('quine-two-dogmas', 'section', 'Sections 1–6'), q('quine-companion', 'book-chapter', 'Chapters on Carnap and analyticity')]],
      [['reading-strategy'], [q('quine-two-dogmas', 'section', 'Sections 1–6'), q('quine-word-object', 'chapter', 'Chapter 2'), q('quine-bibliography', 'work', 'Chronological bibliography')]],
    ),
    evidence: {
      life: [q('quine-sep', 'section', '1. Life'), q('quine-bibliography', 'work', 'Chronological bibliography')],
      ideas: [q('quine-sep', 'section', '2–9'), q('quine-companion', 'book-chapter', 'Introduction')],
      works: [q('quine-two-dogmas', 'section', 'Sections 1–6'), q('quine-word-object', 'chapter', 'Chapters 1–2 and 7')],
      influence: [q('quine-companion', 'book-chapter', 'Chapters on naturalism and legacy'), q('quine-sep', 'section', '10. Influence')],
      disputes: [q('quine-companion', 'book-chapter', 'Chapters on analyticity, translation, and normativity'), q('quine-sep', 'section', '3–9')],
      reading: [q('quine-two-dogmas', 'section', 'Sections 1–6'), q('quine-word-object', 'chapter', 'Chapter 2')],
    },
    patch: {
      lifeStory: 'W. V. Quine developed as a logician in dialogue with Carnap and European logical empiricism, then redirected analytic philosophy toward naturalism, holism, ontology, and the empirical study of language. His work is a connected program, but its theses about analyticity, translation, and epistemology are distinguishable and differently contested.',
      historicalContext: 'Quine wrote as logical empiricism moved into American universities and as formal logic, linguistics, psychology, and the natural sciences increasingly interacted. His objections to analyticity and reductionism reshaped that setting without demonstrating that no constrained analytic distinctions can ever be useful.',
      beginnerExplanation: 'Quine asks what remains of philosophy when inquiry is continuous with science. Beliefs face experience in interconnected groups, though not every belief is equally easy to revise. Radical translation motivates indeterminacy of translation; broader underdetermination is related but not identical, and naturalized epistemology’s treatment of normativity remains disputed.',
      dateDisplay: '1908–2000', dateConfidence: 'high', dateNote: 'Birth and death years are secure. Work dates follow the Brown institutional bibliography and publisher records.',
      keyWorks: ['From a Logical Point of View', 'Two Dogmas of Empiricism', 'Word and Object', 'Ontological Relativity and Other Essays', 'The Pursuit of Truth'],
      suggestedFirstReading: 'Two Dogmas of Empiricism',
      beginnerReadingPath: [
        reading('W. V. Quine', 'Two Dogmas of Empiricism', 'intermediate', 'Start with the paired criticisms of analyticity and reductionism, then test what the conclusion actually licenses.', 'essay'),
        reading('Gary Kemp', 'Willard Van Orman Quine', 'beginner', 'Keeps holism, ontology, translation, and naturalism analytically separate.', 'article'),
        reading('W. V. Quine', 'On What There Is', 'intermediate', 'A compact introduction to ontological commitment and bound variables.', 'essay'),
      ],
      advancedReadingPath: [
        reading('W. V. Quine', 'Word and Object', 'advanced', 'Read the radical-translation construction closely before drawing global skeptical conclusions.'),
        reading('Roger F. Gibson Jr., ed.', 'The Cambridge Companion to Quine', 'advanced', 'Compare disputes over analyticity, normativity, reference, and underdetermination.'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/quine.md', reviewLock: 'fnv1a64:ced8aaf11160702b',
  },
  popper: {
    sources: popperSources,
    sectionCitations: sections(
      [['overview', 'historical-context', 'misunderstandings-reading'], [q('popper-sep', 'section', '1–3'), q('popper-rep', 'section', 'Article summary and life')]],
      [['falsifiability', 'induction', 'corroboration', 'testing-decisions'], [q('popper-logic', 'chapter', 'Parts I–II'), q('popper-sep', 'section', '4–6'), q('popper-companion', 'book-chapter', 'Chapters on demarcation and probability')]],
      [['conjectures-refutations'], [q('popper-conjectures', 'chapter', 'Chapters 1 and 10'), q('popper-sep', 'section', '4. Critical rationalism')]],
      [['metaphysics-science'], [q('popper-logic', 'chapter', 'Part I'), q('popper-companion', 'book-chapter', 'Chapters on metaphysics and science')]],
      [['open-society', 'historicism'], [q('popper-open-society', 'work', 'Volumes I–II'), q('popper-sep', 'section', '8. Political philosophy'), q('popper-companion', 'book-chapter', 'Chapters on politics and historicism', 'Used to preserve disputes over Popper’s readings of Plato, Hegel, and Marx.')]],
      [['kuhn-lakatos', 'objective-knowledge'], [q('popper-sep', 'section', '7 and 9'), q('popper-companion', 'book-chapter', 'Chapters on scientific change and later Popper')]],
      [['reading-strategy'], [q('popper-logic', 'chapter', 'Part I'), q('popper-conjectures', 'chapter', 'Chapter 1'), q('popper-companion', 'book-chapter', 'Introduction')]],
    ),
    evidence: {
      life: [q('popper-sep', 'section', '1. Life'), q('popper-rep', 'section', 'Article summary')],
      ideas: [q('popper-sep', 'section', '3–9'), q('popper-companion', 'book-chapter', 'Introduction')],
      works: [q('popper-logic', 'chapter', 'Parts I–II'), q('popper-conjectures', 'chapter', 'Chapter 1'), q('popper-open-society', 'work', 'Volumes I–II')],
      influence: [q('popper-companion', 'book-chapter', 'Chapters on Kuhn, Lakatos, and politics'), q('popper-rep', 'section', 'Reception')],
      disputes: [q('popper-companion', 'book-chapter', 'Chapters on falsification, probability, and politics'), q('popper-sep', 'section', '5–9')],
      reading: [q('popper-logic', 'chapter', 'Part I'), q('popper-conjectures', 'chapter', 'Chapter 1')],
    },
    patch: {
      lifeStory: 'Karl Popper formed his philosophy in interwar Vienna but was not a member of the Vienna Circle. Exile from Austria and the political catastrophes of the twentieth century shaped both his account of fallible knowledge and his defense of institutions that permit criticism and peaceful correction.',
      historicalContext: 'Popper addressed induction, demarcation, probability, and scientific method while also attacking historicist predictions and totalitarian politics. Logik der Forschung appeared in German in 1934 with a 1935 imprint; the expanded English Logic of Scientific Discovery appeared in 1959.',
      beginnerExplanation: 'Popper treats science as bold conjecture exposed to severe criticism. A failed prediction does not mechanically kill a theory, because tests use auxiliary assumptions and accepted basic statements; falsifiability is a methodological demand for risky testing, not a guarantee of truth. His political readings of Plato, Hegel, and Marx remain vigorously disputed.',
      dateDisplay: '1902–1994', dateConfidence: 'high', dateNote: 'Birth and death years are secure. The publication dating of Logik der Forschung is conventionally given as 1934/1935 because printing and imprint differ.',
      keyWorks: ['The Logic of Scientific Discovery', 'The Open Society and Its Enemies', 'The Poverty of Historicism', 'Conjectures and Refutations', 'Objective Knowledge'],
      suggestedFirstReading: 'Conjectures and Refutations, chapter 1',
      beginnerReadingPath: [
        reading('Karl Popper', 'Conjectures and Refutations, chapter 1', 'beginner', 'A direct statement of critical rationalism and the contrast with verification.'),
        reading('Stephen Thornton', 'Karl Popper', 'beginner', 'Use the specialist overview to separate demarcation, falsification, corroboration, and politics.', 'article'),
        reading('Karl Popper', 'The Logic of Scientific Discovery, Part I', 'intermediate', 'Shows why testing depends on methodological decisions rather than one-counterexample slogans.'),
      ],
      advancedReadingPath: [
        reading('Karl Popper', 'The Open Society and Its Enemies', 'advanced', 'Read the political argument together with criticism of its interpretations of Plato, Hegel, and Marx.'),
        reading('Jeremy Shearmur and Geoffrey Stokes, eds.', 'The Cambridge Companion to Popper', 'advanced', 'Compare current disputes over science, probability, metaphysics, and politics.'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/popper.md', reviewLock: 'fnv1a64:56785e5146875d3f',
  },
  kuhn: {
    sources: kuhnSources,
    sectionCitations: sections(
      [['overview', 'historical-background', 'misunderstandings-reading'], [q('kuhn-sep', 'section', '1–3'), q('kuhn-rep', 'section', 'Article summary and survey')]],
      [['paradigm', 'normal-science'], [q('kuhn-structure', 'section', 'II–V and Postscript—1969'), q('kuhn-tension', 'chapter', 'Second Thoughts on Paradigms'), q('kuhn-revisited', 'book-chapter', 'Chapters 3, 5, and 6')]],
      [['anomaly-crisis', 'revolution'], [q('kuhn-structure', 'section', 'VI–IX'), q('kuhn-revisited', 'book-chapter', 'Chapters on revolution and conceptual change')]],
      [['incommensurability'], [q('kuhn-structure', 'section', 'X–XII and Postscript—1969'), q('kuhn-road', 'chapter', 'Essays on commensurability and lexical structure'), q('kuhn-revisited', 'book-chapter', 'Chapter 8')]],
      [['values-choice'], [q('kuhn-tension', 'chapter', 'Objectivity, Value Judgment, and Theory Choice'), q('kuhn-sep', 'section', '4. Scientific change')]],
      [['relativism-question', 'progress'], [q('kuhn-structure', 'section', 'XIII and Postscript—1969'), q('kuhn-road', 'chapter', 'Later essays on development and incommensurability'), q('kuhn-revisited', 'book-chapter', 'Chapters on rationality and realism')]],
      [['popper-and-after', 'textbooks-education'], [q('kuhn-tension', 'chapter', 'Logic of Discovery or Psychology of Research'), q('kuhn-rep', 'section', 'Reception'), q('kuhn-mit-archive', 'work', 'Biographical history')]],
      [['reading-strategy'], [q('kuhn-structure', 'section', 'II–V, VI–XIII, Postscript—1969'), q('kuhn-tension', 'chapter', 'Second Thoughts on Paradigms'), q('kuhn-revisited', 'book-chapter', 'Introduction')]],
    ),
    evidence: {
      life: [q('kuhn-mit-archive', 'work', 'Biographical history'), q('kuhn-rep', 'section', 'Article summary')],
      ideas: [q('kuhn-sep', 'section', '3–5'), q('kuhn-revisited', 'book-chapter', 'Introduction and key-concept chapters')],
      works: [q('kuhn-structure', 'section', 'II–XIII and Postscript—1969'), q('kuhn-tension', 'chapter', 'Metahistorical studies'), q('kuhn-road', 'chapter', 'Later philosophical essays')],
      influence: [q('kuhn-rep', 'section', 'Reception'), q('kuhn-revisited', 'book-chapter', 'Origins, reception, and implications')],
      disputes: [q('kuhn-sep', 'section', '4–6'), q('kuhn-revisited', 'book-chapter', 'Chapters on incommensurability, rationality, and realism')],
      reading: [q('kuhn-structure', 'section', 'II–XIII and Postscript—1969'), q('kuhn-tension', 'chapter', 'Second Thoughts on Paradigms')],
    },
    patch: {
      lifeStory: 'Thomas Kuhn trained in physics, turned to the history of science, and used historical cases to challenge cumulative textbook pictures of scientific development. His vocabulary changed after Structure: the broad word paradigm was clarified through exemplars and disciplinary matrices, while later work narrowed incommensurability toward taxonomic and lexical relations.',
      historicalContext: 'Kuhn wrote where logical empiricism, Popperian methodology, professional history of science, and postwar scientific institutions intersected. Structure’s reception in philosophy, sociology, and the humanities often extended its claims beyond Kuhn’s own later qualifications.',
      beginnerExplanation: 'Kuhn argues that mature sciences usually solve puzzles within inherited achievements until persistent difficulties and viable alternatives can reorganize a field. One anomaly does not automatically cause revolution; incommensurability is not total mutual unintelligibility; shared values guide but do not algorithmically determine theory choice; and Kuhn retained a non-cumulative account of scientific progress.',
      dateDisplay: '1922–1996', dateConfidence: 'high', dateNote: 'Birth and death years are secure. Structure first appeared in 1962; the cited fourth edition is the 2012 fiftieth-anniversary edition.',
      keyWorks: ['The Copernican Revolution', 'The Structure of Scientific Revolutions', 'The Essential Tension', 'Black-Body Theory and the Quantum Discontinuity', 'The Road since Structure'],
      suggestedFirstReading: 'The Structure of Scientific Revolutions, chapters II–V and Postscript—1969',
      beginnerReadingPath: [
        reading('Thomas S. Kuhn', 'The Structure of Scientific Revolutions, chapters II–V', 'beginner', 'Introduces paradigms, normal science, exemplars, and puzzle solving before the famous revolution chapters.'),
        reading('Alexander Bird', 'Thomas Kuhn', 'beginner', 'A specialist guide to changes in Kuhn’s terminology and the major disputes.', 'article'),
        reading('Thomas S. Kuhn', 'The Structure of Scientific Revolutions, Postscript—1969', 'intermediate', 'Kuhn’s own clarification of disciplinary matrices, exemplars, communities, and progress.'),
      ],
      advancedReadingPath: [
        reading('Thomas S. Kuhn', 'The Essential Tension', 'advanced', 'Read Second Thoughts on Paradigms and Objectivity, Value Judgment, and Theory Choice.'),
        reading('Vasso Kindi and Theodore Arabatzis, eds.', 'Kuhn’s The Structure of Scientific Revolutions Revisited', 'advanced', 'Compare current disputes over paradigms, rationality, conceptual change, and realism.'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/kuhn.md', reviewLock: 'fnv1a64:17bdb0880f1776a3',
  },
};

export const applyScienceDebatesEditorial = (record: Philosopher): Philosopher =>
  applyModernClusterEditorialConfig(record, configs[record.id]);
