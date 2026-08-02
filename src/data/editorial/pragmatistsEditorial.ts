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

const peirceSources: EditorialSource[] = [
  {id: 'peirce-sep', type: 'scholarly-reference', authors: ['Robert Burch'], title: 'Charles Sanders Peirce', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/peirce/', accessedOn, note: 'Specialist overview used for chronology, pragmatism, inquiry, logic, categories, and reception.'},
  {id: 'peirce-signs-sep', type: 'scholarly-reference', authors: ['Albert Atkin'], title: 'Peirce’s Theory of Signs', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/peirce-semiotics/', accessedOn, note: 'Specialist account used for Peirce’s evolving sign classifications and for cautions against reducing them to one fixed triad.'},
  {id: 'peirce-writings-v3', type: 'primary-text', authors: ['Charles S. Peirce'], editors: ['Christian J. W. Kloesel'], title: 'Writings of Charles S. Peirce: A Chronological Edition, Volume 3, 1872–1878', publisher: 'Indiana University Press', url: 'https://iupress.org/9780253016652/writings-of-charles-s-peirce-a-chronological-edition-volume-3/', accessedOn, note: 'Critical chronological edition used for the 1877–1878 illustrations of inquiry and the pragmatic maxim.'},
  {id: 'peirce-essential', type: 'primary-text', authors: ['Charles S. Peirce'], editors: ['Nathan Houser', 'Christian Kloesel'], title: 'The Essential Peirce, Volume 1: Selected Philosophical Writings, 1867–1893', publisher: 'Indiana University Press', year: 1992, url: 'https://www.jstor.org/stable/j.ctvpwhg1z', accessedOn, note: 'Primary collection used for inquiry, abduction, fallibilism, realism, and continuity; locators use essay titles rather than edition-dependent pages.'},
  {id: 'peirce-edition-project', type: 'institutional-archive', authors: ['Peirce Edition Project'], title: 'Peirce Edition Project: Edition and Archive Guide', publisher: 'Indiana University Indianapolis', url: 'https://peirce.indianapolis.iu.edu/edition.html', accessedOn, note: 'Institutional guide used to explain the unfinished, posthumously edited corpus and to avoid treating one anthology as a final system.'},
  {id: 'peirce-companion', type: 'scholarly-book', authors: ['Cheryl Misak'], editors: ['Cheryl Misak'], title: 'The Cambridge Companion to Peirce', publisher: 'Cambridge University Press', year: 2004, doi: '10.1017/CCOL0521570069', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-peirce/51B1CEA3CF2B7E1E98FFCA125660E646', accessedOn, note: 'Independent collection used for interpretive disputes over truth, realism, logic, semiotics, and Peirce’s relations to later pragmatists.'},
];

const jamesSources: EditorialSource[] = [
  {id: 'james-sep', type: 'scholarly-reference', authors: ['Russell Goodman'], title: 'William James', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/james/', accessedOn, note: 'Specialist overview used for chronology, psychology, pragmatism, truth, religion, and radical empiricism.'},
  {id: 'james-pragmatism', type: 'primary-text', authors: ['William James'], title: 'Pragmatism: A New Name for Some Old Ways of Thinking', year: 1907, url: 'https://www.gutenberg.org/ebooks/5116', accessedOn, note: 'Primary source for the pragmatic method, pluralism, and the lectures on truth.'},
  {id: 'james-meaning-truth', type: 'primary-text', authors: ['William James'], title: 'The Meaning of Truth', year: 1909, url: 'https://www.gutenberg.org/ebooks/5117', accessedOn, note: 'Primary source for James’s replies to critics of his truth theory.'},
  {id: 'james-will-believe', type: 'primary-text', authors: ['William James'], title: 'The Will to Believe and Other Essays in Popular Philosophy', year: 1897, url: 'https://www.gutenberg.org/ebooks/26659', accessedOn, note: 'Primary source for the live, forced, and momentous option conditions and related moral essays.'},
  {id: 'james-varieties', type: 'primary-text', authors: ['William James'], title: 'The Varieties of Religious Experience', year: 1902, url: 'https://www.gutenberg.org/ebooks/621', accessedOn, note: 'Primary source for James’s descriptive study and evaluation of religious experience; not treated as proof of theological conclusions.'},
  {id: 'james-radical-empiricism', type: 'primary-text', authors: ['William James'], title: 'Essays in Radical Empiricism', year: 1912, url: 'https://www.gutenberg.org/ebooks/32547', accessedOn, note: 'Posthumous primary collection used for pure experience and relations within experience.'},
  {id: 'james-companion', type: 'scholarly-book', authors: ['Ruth Anna Putnam'], editors: ['Ruth Anna Putnam'], title: 'The Cambridge Companion to William James', publisher: 'Cambridge University Press', year: 1997, doi: '10.1017/CCOL0521452783', url: 'https://www.cambridge.org/core/books/the-cambridge-companion-to-william-james/9638642470D21E28CADBF6763D111B40', accessedOn, note: 'Independent collection used for disputes about psychology, truth, religion, politics, and James’s relation to Peirce, Royce, and Dewey.'},
  {id: 'james-harvard-race-science', type: 'institutional-archive', authors: ['Harvard University Presidential Committee on Harvard & the Legacy of Slavery'], title: 'Race Scientists: Louis Agassiz, John Collins Warren, and Jeffries Wyman', publisher: 'Harvard University', url: 'https://legacyofslaveryreport.harvard.edu/report/race-scientists-louis-agassiz-john-collins-warren-and-jeffries-wyman', accessedOn, note: 'Institutional context for Agassiz’s racial science; used cautiously to distinguish James’s expedition participation from evidence of agreement with all of Agassiz’s racial claims.'},
];

const deweySources: EditorialSource[] = [
  {id: 'dewey-sep', type: 'scholarly-reference', authors: ['David L. Hildebrand'], title: 'John Dewey', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/dewey/', accessedOn, note: 'Specialist overview used for chronology, naturalism, experience, inquiry, ethics, education, and aesthetics.'},
  {id: 'dewey-political-sep', type: 'scholarly-reference', authors: ['Matthew Festenstein'], title: 'Dewey’s Political Philosophy', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/dewey-political/', accessedOn, note: 'Independent specialist account used for democracy, publics, communication, reform, and political criticisms.'},
  {id: 'addams-sep', type: 'scholarly-reference', authors: ['Maurice Hamington'], title: 'Jane Addams', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/addams-jane/', accessedOn, note: 'Specialist account used to preserve Addams’s independent philosophy, mutual intellectual exchange with Dewey, and gendered patterns of canon formation.'},
  {id: 'dewey-democracy-education', type: 'primary-text', authors: ['John Dewey'], title: 'Democracy and Education', year: 1916, url: 'https://www.gutenberg.org/ebooks/852', accessedOn, note: 'Primary source for growth, education, occupations, communication, and democracy.'},
  {id: 'dewey-reconstruction', type: 'primary-text', authors: ['John Dewey'], title: 'Reconstruction in Philosophy', year: 1920, url: 'https://www.gutenberg.org/ebooks/40089', accessedOn, note: 'Primary source for experimental intelligence, philosophy’s social function, science, morals, and democracy.'},
  {id: 'dewey-human-nature', type: 'primary-text', authors: ['John Dewey'], title: 'Human Nature and Conduct', year: 1922, url: 'https://www.gutenberg.org/ebooks/41386', accessedOn, note: 'Primary source for habit, impulse, deliberation, growth, and social moral psychology.'},
  {id: 'dewey-public', type: 'primary-text', authors: ['John Dewey'], title: 'The Public and Its Problems', year: 1927, url: 'https://www.gutenberg.org/ebooks/71000', accessedOn, note: 'Primary source for publics, indirect consequences, communication, and democracy beyond electoral machinery.'},
  {id: 'dewey-companion', type: 'scholarly-book', authors: ['Molly Cochran'], editors: ['Molly Cochran'], title: 'The Cambridge Companion to Dewey', publisher: 'Cambridge University Press', year: 2010, doi: '10.1017/CCOL9780521874564', url: 'https://www.cambridge.org/core/books/the-cambridge-companion-to-dewey/715C7FAAE6E30D2A20F61DDE67041329', accessedOn, note: 'Independent collection used for intellectual development, inquiry, moral philosophy, education, aesthetics, democracy, and critical reception.'},
];

const configs: Record<string, ModernClusterEditorialConfig> = {
  peirce: {
    sources: peirceSources,
    sectionCitations: sections(
      [['overview', 'life-and-setting'], [q('peirce-sep', 'section', '1–2'), q('peirce-companion', 'book-chapter', 'Introduction and chapters on Peirce’s development')]],
      [['science-corpus'], [q('peirce-edition-project', 'work', 'Edition and archive guide'), q('peirce-writings-v3', 'work', 'Volume 3 editorial scope'), q('peirce-sep', 'section', '1. Life and works')]],
      [['pragmatic-maxim', 'belief-doubt-inquiry'], [q('peirce-writings-v3', 'work', 'The Fixation of Belief and How to Make Our Ideas Clear'), q('peirce-essential', 'work', 'The Fixation of Belief and How to Make Our Ideas Clear')]],
      [['fallibilism', 'abduction', 'probability-continuity'], [q('peirce-essential', 'work', 'Essays on inquiry, abduction, probability, and continuity'), q('peirce-sep', 'section', '3–6')]],
      [['signs-semiotic'], [q('peirce-signs-sep', 'section', '1–6'), q('peirce-essential', 'work', 'Essays on signs')]],
      [['realism-categories'], [q('peirce-sep', 'section', '4–6'), q('peirce-companion', 'book-chapter', 'Chapters on categories, realism, and metaphysics')]],
      [['science-community-truth', 'james-dewey-relations'], [q('peirce-essential', 'work', 'Essays on truth and inquiry'), q('peirce-companion', 'book-chapter', 'Chapters on truth and pragmatism')]],
      [['misunderstandings-reading'], [q('peirce-sep', 'section', '2–7'), q('peirce-signs-sep', 'section', '1–6'), q('peirce-edition-project', 'work', 'Edition and archive guide')]],
    ),
    evidence: {
      life: [q('peirce-sep', 'section', '1. Life and works'), q('peirce-edition-project', 'work', 'Edition and archive guide')],
      ideas: [q('peirce-sep', 'section', '2–7'), q('peirce-companion', 'book-chapter', 'Introduction')],
      works: [q('peirce-writings-v3', 'work', 'Volume 3'), q('peirce-essential', 'work', 'Selected Philosophical Writings, 1867–1893')],
      influence: [q('peirce-companion', 'book-chapter', 'Chapters on pragmatism and reception'), q('peirce-sep', 'section', '7. Legacy')],
      disputes: [q('peirce-signs-sep', 'section', '1–6'), q('peirce-companion', 'book-chapter', 'Chapters on truth, realism, and logic')],
      reading: [q('peirce-writings-v3', 'work', 'The Fixation of Belief and How to Make Our Ideas Clear'), q('peirce-essential', 'work', 'Selected essays')],
    },
    patch: {
      lifeStory: 'Charles Sanders Peirce worked as a scientist, logician, and philosopher, much of his career outside a stable university post. His enormous corpus was left partly unpublished and has been reconstructed through several editorial projects, so readers should track dates and editions rather than assume a single finished system.',
      historicalContext: 'Peirce wrote amid nineteenth-century advances in experimental science, probability, formal logic, evolutionary theory, and scientific institutions. He developed pragmatism collaboratively and contentiously; later pragmatists inherited parts of the program while changing its emphases.',
      beginnerExplanation: 'Peirce treats concepts as rules for conceivable practical bearings within inquiry, not as whatever happens to be expedient. Inquiry begins in genuine disruption of habit, moves through abduction, deduction, and induction, and remains fallible. His long-run language names an indefinitely self-correcting norm, not a guarantee that current consensus is true.',
      dateDisplay: '1839–1914', dateConfidence: 'high', dateNote: 'Birth and death years are secure. Dates for individual doctrines matter because Peirce repeatedly revised his classifications and vocabulary.',
      keyWorks: ['The Fixation of Belief', 'How to Make Our Ideas Clear', 'A Guess at the Riddle', 'The Architecture of Theories', 'Pragmatism as the Logic of Abduction'],
      suggestedFirstReading: 'The Fixation of Belief',
      beginnerReadingPath: [
        reading('Charles S. Peirce', 'The Fixation of Belief', 'beginner', 'Introduces doubt, belief, inquiry, and the social norm of scientific method.', 'essay'),
        reading('Charles S. Peirce', 'How to Make Our Ideas Clear', 'intermediate', 'Presents the pragmatic maxim in its original 1878 setting.', 'essay'),
        reading('Robert Burch', 'Charles Sanders Peirce', 'beginner', 'A guide to chronology and to the relations among logic, inquiry, signs, and metaphysics.', 'article'),
      ],
      advancedReadingPath: [
        reading('Charles S. Peirce', 'The Essential Peirce, volumes 1–2', 'advanced', 'Use chronological introductions to see doctrines change rather than forcing them into one snapshot.'),
        reading('Cheryl Misak, ed.', 'The Cambridge Companion to Peirce', 'advanced', 'Compare disputes over truth, realism, semiotics, logic, and pragmatism.'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/peirce.md', reviewLock: 'fnv1a64:701a4d5290768dfe',
  },
  'william-james': {
    sources: jamesSources,
    sectionCitations: sections(
      [['overview', 'psychology-context'], [q('james-sep', 'section', '1–3'), q('james-companion', 'book-chapter', 'Introduction and chapters 1–2')]],
      [['scientific-formation'], [q('james-sep', 'section', '1. Life and works'), q('james-companion', 'book-chapter', 'Chapters on psychology and politics'), q('james-harvard-race-science', 'section', 'Race Scientists', 'Used for Agassiz’s institutional context, not as evidence that James accepted every Agassiz claim.')]],
      [['stream-consciousness', 'habit-emotion-self'], [q('james-sep', 'section', '2. Psychology'), q('james-companion', 'book-chapter', 'Chapters 1–2')]],
      [['pragmatic-method', 'pluralism'], [q('james-pragmatism', 'chapter', 'Lectures I, II, IV, and VIII'), q('james-companion', 'book-chapter', 'Chapters on pragmatism and pluralism')]],
      [['truth'], [q('james-pragmatism', 'chapter', 'Lectures II and VI'), q('james-meaning-truth', 'work', 'Essays I–VIII'), q('james-companion', 'book-chapter', 'Chapter 9')]],
      [['radical-empiricism'], [q('james-radical-empiricism', 'work', 'A World of Pure Experience and Does Consciousness Exist?'), q('james-sep', 'section', '5. Radical empiricism')]],
      [['will-to-believe'], [q('james-will-believe', 'work', 'The Will to Believe'), q('james-companion', 'book-chapter', 'Chapters 4–5')]],
      [['religious-experience'], [q('james-varieties', 'chapter', 'Lectures II–III, IX–X, and XX'), q('james-sep', 'section', '4. Philosophy of religion')]],
      [['relations'], [q('james-companion', 'book-chapter', 'Chapters on Peirce, Royce, and Dewey'), q('james-sep', 'section', '6. Legacy')]],
      [['misunderstandings-reading'], [q('james-sep', 'section', '2–6'), q('james-pragmatism', 'chapter', 'Lectures II and VI'), q('james-will-believe', 'work', 'The Will to Believe')]],
    ),
    evidence: {
      life: [q('james-sep', 'section', '1. Life and works'), q('james-harvard-race-science', 'section', 'Race Scientists')],
      ideas: [q('james-sep', 'section', '2–6'), q('james-companion', 'book-chapter', 'Introduction')],
      works: [q('james-pragmatism', 'chapter', 'Lectures I–VIII'), q('james-meaning-truth', 'work', 'Essays I–VIII'), q('james-will-believe', 'work', 'The Will to Believe'), q('james-varieties', 'work', 'Gifford Lectures'), q('james-radical-empiricism', 'work', 'Collected essays')],
      influence: [q('james-companion', 'book-chapter', 'Chapters 3, 10, and 16–18'), q('james-sep', 'section', '6. Legacy')],
      disputes: [q('james-companion', 'book-chapter', 'Chapters on truth, religion, politics, and psychology'), q('james-sep', 'section', '2–6')],
      reading: [q('james-pragmatism', 'chapter', 'Lectures II and VI'), q('james-will-believe', 'work', 'The Will to Believe'), q('james-varieties', 'chapter', 'Lectures II–III and XX')],
    },
    patch: {
      lifeStory: 'William James moved from art and medical study into physiology, psychology, and philosophy at Harvard. His scientific formation included participation in Louis Agassiz’s Brazilian expedition; that fact places him within racialized nineteenth-century science but does not by itself establish assent to every racial doctrine Agassiz defended.',
      historicalContext: 'James wrote where experimental psychology, evolutionary theory, religious pluralism, psychical research, and debates over determinism met. He helped popularize pragmatism but revised Peirce’s emphasis, and his psychological and philosophical positions continued to develop rather than forming one static doctrine.',
      beginnerExplanation: 'James asks what practical difference a belief or concept makes in experience. Truth is not simply whatever feels useful: a belief must work through experience, remain answerable to other truths and realities, and survive correction. His defense of belief applies to live, forced, momentous options that evidence cannot settle in advance, not to wishful thinking generally.',
      dateDisplay: '1842–1910', dateConfidence: 'high', dateNote: 'Birth and death years are secure. Posthumous collections such as Essays in Radical Empiricism require distinguishing essay composition from book publication.',
      keyWorks: ['The Principles of Psychology', 'The Will to Believe', 'The Varieties of Religious Experience', 'Pragmatism', 'The Meaning of Truth', 'Essays in Radical Empiricism'],
      suggestedFirstReading: 'Pragmatism, lecture II',
      beginnerReadingPath: [
        reading('William James', 'Pragmatism, lecture II', 'beginner', 'Introduces the pragmatic method without reducing it to short-term utility.', 'lecture'),
        reading('William James', 'The Will to Believe', 'intermediate', 'Track the live, forced, and momentous conditions before judging the thesis.', 'essay'),
        reading('Russell Goodman', 'William James', 'beginner', 'A specialist map of psychology, pragmatism, religion, and radical empiricism.', 'article'),
      ],
      advancedReadingPath: [
        reading('William James', 'The Meaning of Truth', 'advanced', 'Read James’s replies to critics alongside Pragmatism’s truth lectures.'),
        reading('Ruth Anna Putnam, ed.', 'The Cambridge Companion to William James', 'advanced', 'Compare competing readings of truth, consciousness, religion, pluralism, and politics.'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/william-james.md', reviewLock: 'fnv1a64:9b7fa5665b7d3943',
  },
  dewey: {
    sources: deweySources,
    sectionCitations: sections(
      [['overview', 'historical-context'], [q('dewey-sep', 'section', '1–2'), q('dewey-companion', 'book-chapter', 'Introduction and chapter 1')]],
      [['experience-nature', 'instrumentalism'], [q('dewey-sep', 'section', '3–5'), q('dewey-reconstruction', 'chapter', 'Chapters III–VI'), q('dewey-companion', 'book-chapter', 'Chapters 2–7')]],
      [['problematic-situation'], [q('dewey-sep', 'section', '4. Inquiry'), q('dewey-companion', 'book-chapter', 'Chapter 4')]],
      [['education'], [q('dewey-democracy-education', 'chapter', 'Chapters I–VII and XXIV–XXVI'), q('dewey-sep', 'section', '7. Education')]],
      [['democracy-publics', 'communication-community'], [q('dewey-public', 'chapter', 'Chapters I, IV, V, and VI'), q('dewey-political-sep', 'section', '2–5')]],
      [['ethics-growth'], [q('dewey-human-nature', 'work', 'Introduction and Parts I–IV'), q('dewey-reconstruction', 'chapter', 'Chapter VII'), q('dewey-companion', 'book-chapter', 'Chapters 8–9')]],
      [['science-technology'], [q('dewey-reconstruction', 'chapter', 'Chapters III–VI'), q('dewey-sep', 'section', '4–6')]],
      [['art-aesthetic'], [q('dewey-sep', 'section', '8. Aesthetics'), q('dewey-companion', 'book-chapter', 'Chapter on Dewey’s aesthetics')]],
      [['democratic-limits'], [q('dewey-political-sep', 'section', '4–6'), q('dewey-companion', 'book-chapter', 'Chapters 1, 8–9, and political reception'), q('addams-sep', 'section', 'Overview and section 2', 'Used for Addams’s independent theorizing and reciprocal relationship with Dewey.')]],
      [['misunderstandings-reading'], [q('dewey-sep', 'section', '3–8'), q('dewey-political-sep', 'section', '2–6'), q('dewey-democracy-education', 'chapter', 'Chapters IV and VII')]],
    ),
    evidence: {
      life: [q('dewey-sep', 'section', '1. Life and works'), q('dewey-companion', 'book-chapter', 'Chapter 1')],
      ideas: [q('dewey-sep', 'section', '3–8'), q('dewey-companion', 'book-chapter', 'Chapters 2–13')],
      works: [q('dewey-democracy-education', 'chapter', 'Chapters I–VII'), q('dewey-reconstruction', 'chapter', 'Chapters III–VIII'), q('dewey-human-nature', 'work', 'Parts I–IV'), q('dewey-public', 'chapter', 'Chapters I–VI')],
      influence: [q('dewey-political-sep', 'section', '5–6'), q('dewey-companion', 'book-chapter', 'Introduction and reception chapters'), q('addams-sep', 'section', 'Overview and section 2')],
      disputes: [q('dewey-political-sep', 'section', '4–6'), q('dewey-companion', 'book-chapter', 'Chapters on ethics, democracy, education, and aesthetics'), q('addams-sep', 'section', 'Overview and section 2')],
      reading: [q('dewey-democracy-education', 'chapter', 'Chapters IV and VII'), q('dewey-public', 'chapter', 'Chapters I and IV'), q('dewey-reconstruction', 'chapter', 'Chapters III–IV')],
    },
    patch: {
      lifeStory: 'John Dewey moved from early idealism toward an experimental naturalism developed through psychology, education, ethics, politics, and aesthetics. The Chicago Laboratory School was collaborative work involving teachers, administrators, and Alice Chipman Dewey; its history should not be reduced to a lone-philosopher experiment.',
      historicalContext: 'Dewey worked amid industrialization, mass immigration, progressive reform, world war, expanding public education, labor conflict, and new sciences of life and mind. Jane Addams was an independent theorist and reformer in this shared milieu, not merely someone who applied Dewey’s ideas.',
      beginnerExplanation: 'Dewey treats thinking as experimental inquiry within situations, not as a rigid five-step recipe. Education is growth through intelligently organized experience, not unstructured learning by doing. Democracy names institutions and a communicative way of associated life, but Deweyan reform must still be tested against rights, unequal power, exclusions, and failures of participation.',
      dateDisplay: '1859–1952', dateConfidence: 'high', dateNote: 'Birth and death years are secure. Dewey’s long career includes substantial shifts from early idealism to mature experimental naturalism.',
      keyWorks: ['The School and Society', 'Democracy and Education', 'Reconstruction in Philosophy', 'Human Nature and Conduct', 'Experience and Nature', 'The Public and Its Problems', 'Art as Experience'],
      suggestedFirstReading: 'Democracy and Education, chapters IV and VII',
      beginnerReadingPath: [
        reading('John Dewey', 'Democracy and Education, chapters IV and VII', 'beginner', 'Introduces growth, experience, education, and democratic social aims without the learning-by-doing slogan.'),
        reading('David L. Hildebrand', 'John Dewey', 'beginner', 'A specialist map of inquiry, naturalism, ethics, education, and aesthetics.', 'article'),
        reading('John Dewey', 'The Public and Its Problems, chapters I and IV', 'intermediate', 'Explains publics through indirect consequences and democracy through communication.'),
      ],
      advancedReadingPath: [
        reading('John Dewey', 'Experience and Nature', 'advanced', 'A difficult statement of mature naturalism and the continuity of experience and nature.'),
        reading('Molly Cochran, ed.', 'The Cambridge Companion to Dewey', 'advanced', 'Compare interpretations of inquiry, action, ethics, politics, education, and aesthetics.'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/dewey.md', reviewLock: 'fnv1a64:ad8e1b8342de9556',
  },
};

export const applyPragmatistsEditorial = (record: Philosopher): Philosopher =>
  applyModernClusterEditorialConfig(record, configs[record.id]);
