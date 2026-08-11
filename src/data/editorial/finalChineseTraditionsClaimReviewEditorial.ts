import type {
  ArticleSection,
  Branch,
  CitationLocatorKind,
  CitationReference,
  EditorialSource,
} from '../../types/philosophy';
import {citation as cite, paragraph as p, structuredClaim as claim} from './pilotHelpers';

/*
 * Isolated final Chinese-traditions claim-review overlay. Sol owns pipeline
 * registration, review notes, Museum reconciliation, the final deterministic
 * locks, and release integration. The placeholder locks below intentionally
 * make premature registration visible to the editorial audit.
 */
const accessedOn = '2026-08-10';
type TargetId = 'confucianism' | 'daoism' | 'mohism' | 'legalism';
const reviewLocks: Record<TargetId, string> = {
  confucianism: 'fnv1a64:4b67540c305c26e3',
  daoism: 'fnv1a64:464bf35a7bb9ff5b',
  mohism: 'fnv1a64:7d3ad7706d65b324',
  legalism: 'fnv1a64:a97f653ffd38efa7',
};

const c = (sourceId: string, kind: CitationLocatorKind, value: string, note?: string): CitationReference =>
  cite(sourceId, kind, value, note);

const source = (entry: Omit<EditorialSource, 'accessedOn'>): EditorialSource => ({...entry, accessedOn});

const sep = (
  id: string,
  authors: string[],
  title: string,
  url: string,
  note: string,
  year: number,
  edition?: string,
): EditorialSource => source({
  id,
  type: 'scholarly-reference',
  authors,
  title,
  containerTitle: 'The Stanford Encyclopedia of Philosophy',
  editors: ['Edward N. Zalta', 'Uri Nodelman'],
  publisher: 'Metaphysics Research Lab, Stanford University',
  year,
  ...(edition ? {edition} : {}),
  url,
  note,
});

const iep = (id: string, authors: string[], title: string, url: string, note: string): EditorialSource => source({
  id,
  type: 'scholarly-reference',
  authors,
  title,
  containerTitle: 'Internet Encyclopedia of Philosophy',
  publisher: 'University of Tennessee at Martin',
  url,
  note,
});

const primary = (
  id: string,
  authors: string[],
  title: string,
  url: string,
  note: string,
  publisher?: string,
  translator?: string,
  year?: number,
  isbn?: string,
): EditorialSource => source({
  id,
  type: 'primary-text',
  authors,
  title,
  ...(translator ? {translator} : {}),
  ...(publisher ? {publisher} : {}),
  ...(year ? {year} : {}),
  ...(isbn ? {isbn} : {}),
  url,
  note,
});

const book = (
  id: string,
  authors: string[],
  title: string,
  publisher: string,
  year: number,
  url: string,
  note: string,
  isbn?: string,
  doi?: string,
): EditorialSource => source({
  id,
  type: 'scholarly-book',
  authors,
  title,
  publisher,
  year,
  ...(isbn ? {isbn} : {}),
  ...(doi ? {doi} : {}),
  url,
  note,
});

const journal = (
  id: string,
  authors: string[],
  title: string,
  containerTitle: string,
  publisher: string,
  year: number,
  url: string,
  note: string,
  doi?: string,
): EditorialSource => source({
  id,
  type: 'journal-article',
  authors,
  title,
  containerTitle,
  publisher,
  year,
  ...(doi ? {doi} : {}),
  url,
  note,
});

const all = (...items: CitationReference[]) => items;

const confucianismSources: EditorialSource[] = [
  sep('conf-ethics-sep', ['David Wong'], 'Chinese Ethics', 'https://plato.stanford.edu/entries/ethics-chinese/', 'Comparative specialist account for Confucian ethical vocabulary, Mencius–Xunzi disagreement, family relations, gender, political authority, and the limits of modern comparison.', 2023, 'Substantive revision August 2023'),
  sep('confucius-sep', ['Mark Csikszentmihalyi'], 'Confucius', 'https://plato.stanford.edu/entries/confucius/', 'Specialist account for the traditional chronology, layered Analects, ritual, learning, government, transmission, and historical caution around the remembered teacher.', 2024),
  sep('mencius-sep', ['Kwong-loi Shun'], 'Mencius', 'https://plato.stanford.edu/entries/mencius/', 'Specialist account for the composite Mengzi, moral beginnings, cultivation, livelihood, humane government, and reception.', 2023, 'Fall 2023'),
  sep('xunzi-sep', ['Eric L. Hutton'], 'Xunzi', 'https://plato.stanford.edu/entries/xunzi/', 'Specialist account for the received collection, nature, deliberate effort, ritual, names, institutions, and the qualified relationship to later statecraft.', 2024, 'Fall 2024'),
  sep('zhu-xi-sep', ['Kirill Thompson'], 'Zhu Xi', 'https://plato.stanford.edu/entries/zhu-xi/', 'Specialist account for Song learning, the Four Books, li and qi, investigation, institutional reception, and the distinction between Zhu Xi and later orthodoxy.', 2025, 'Substantive revision January 2025'),
  sep('wang-sep', ['Bryan W. Van Norden'], 'Wang Yangming', 'https://plato.stanford.edu/entries/wang-yangming/', 'Specialist account for the retrospective map of later Confucian lineages, innate knowing, knowledge and action, and later influence.', 2024, 'Substantive revision September 2024'),
  primary('analects-ctext', ['Anonymous disciples and later compilers'], 'The Analects', 'https://ctext.org/analects', 'Received text with Chinese text and a historical Legge translation. Citations use book and passage divisions; no English wording is treated as translation-neutral.', 'Chinese Text Project', 'James Legge'),
  primary('mengzi-ctext', ['Mencius tradition and later compilers'], 'Mengzi', 'https://ctext.org/mengzi', 'Received dialogue and argument collection cited by standard book-part-passage divisions; it is not a verbatim itinerary.', 'Chinese Text Project', 'James Legge'),
  primary('xunzi-hutton', ['Xunzi tradition and later compilers'], 'Xunzi: The Complete Text', 'https://press.princeton.edu/books/paperback/9780691161044/xunzi', 'Complete scholarly translation used for chapter-level readings of learning, human nature, ritual, names, and political order; the received collection remains textually layered.', 'Princeton University Press', 'Eric L. Hutton', 2014, '9780691161044'),
  book('gardner-four-books', ['Daniel K. Gardner'], 'Zhu Xi’s Reading of the Analects: Canon, Commentary, and the Classical Tradition', 'Columbia University Press', 2003, 'https://cup.columbia.edu/book/zhu-xis-reading-of-the-analects/9780231502801/', 'Specialist monograph used for canon construction and commentary as a philosophical and pedagogical practice.', '9780231502801'),
];

const daoismSources: EditorialSource[] = [
  sep('daoism-sep', ['Chad Hansen'], 'Daoism', 'https://plato.stanford.edu/entries/daoism/', 'Specialist reconstruction of early dao discourse and Han classification. Its naturalist reconstruction is used as an interpretation, not as the settled meaning of every Daoist text.', 2025, 'First published April 2025'),
  sep('laozi-sep', ['Alan Chan'], 'Laozi', 'https://plato.stanford.edu/entries/laozi/', 'Specialist account for the attributed persona, manuscript witnesses, Daodejing formation, commentary, terms, and interpretive disagreement.', 2025, 'Substantive revision October 2025'),
  sep('zhuangzi-sep', ['Chad Hansen'], 'Zhuangzi', 'https://plato.stanford.edu/entries/zhuangzi/', 'Specialist account for the probable persona, evolving text theory, language, skeptical and perspectival readings, and the limits of any single reconstruction.', 2024, 'Substantive revision March 2024'),
  iep('zhuangzi-iep', ['Steve Coutinho'], 'Zhuangzi', 'https://iep.utm.edu/zhuangzi-chuang-tzu-chinese-philosopher/', 'Independent overview used to cross-check received-text structure, Inner Chapter themes, Warring States context, and later reception.'),
  primary('daodejing-ctext', ['Laozi tradition (attributed)'], 'Dao De Jing', 'https://ctext.org/dao-de-jing', 'Received eighty-one-chapter text with Chinese text and a historical translation. Citations use standard chapter divisions and article prose paraphrases rather than silently quoting one translation.', 'Chinese Text Project', 'James Legge'),
  primary('zhuangzi-ctext', ['Zhuangzi tradition'], 'Zhuangzi', 'https://ctext.org/zhuangzi', 'Received thirty-three-chapter text cited by chapter; the text contains multiple layers and source attribution is never automatically assigned to Zhuang Zhou.', 'Chinese Text Project', 'James Legge'),
  book('roberts-daodejing', ['Laozi tradition (attributed)', 'Moss Roberts'], 'Dao De Jing', 'University of California Press', 2019, 'https://www.ucpress.edu/book/9780520305571/dao-de-jing', 'Manuscript-aware translation and commentary used to check the received, Mawangdui, and Guodian witnesses and the risks of translation-dependent doctrine.', '9780520305571'),
  book('liu-zhuangzi', ['Liu Xiaogan'], 'Classifying the Zhuangzi Chapters', 'University of Michigan Center for Chinese Studies', 1994, 'https://doi.org/10.3998/mpub.19186', 'Open specialist monograph used for contested Inner, Outer, and Miscellaneous chapter classifications. Its proposed strata remain scholarly arguments, not a final author map.', '9780472901340', '10.3998/mpub.19186'),
];

const mohismSources: EditorialSource[] = [
  sep('mohism-sep', ['Chris Fraser'], 'Mohism', 'https://plato.stanford.edu/entries/mohism/', 'Principal specialist overview for the movement, uncertain biography, corpus layers, standards, benefit, inclusive care, religion, organization, and decline.', 2024, 'Substantive revision September 2024'),
  iep('mozi-iep', ['Hui-chieh Loy'], 'Mozi (Mo-tzu)', 'https://iep.utm.edu/mozi/', 'Independent overview used to cross-check the sparse life record, ten-thesis presentation, impartial concern, defensive practice, government, frugality, war, Heaven, and spirits.'),
  sep('mohist-canons-sep', ['Chris Fraser'], 'Mohist Canons', 'https://plato.stanford.edu/entries/mohist-canons/', 'Specialist account used to distinguish anonymous later materials on language, knowledge, argument, and technical inquiry from the doctrinal triads and from Mozi’s personal authorship.', 2020, 'Substantive revision November 2020'),
  sep('mohism-ethics-sep', ['David Wong'], 'Chinese Ethics', 'https://plato.stanford.edu/entries/ethics-chinese/', 'Comparative account used for Mohist consequence-based reasoning, inclusive care, differentiated relationships, and the limits of utilitarian labels.', 2023, 'Substantive revision August 2023'),
  primary('mozi-johnston', ['Anonymous Mohist authors'], 'The Mozi: A Complete Translation', 'https://cup.cuhk.edu.hk/The-Mozi-A-Complete-Translation', 'Complete scholarly translation cited by received chapter number and title. It attributes claims to the composite Mohist corpus, not automatically to Mo Di.', 'The Chinese University Press', 'Ian Johnston', 2010, '9789629962708'),
  journal('mohism-war-ghosts', ['Benjamin Wong', 'Hui-chieh Loy'], 'War and Ghosts in Mozi’s Political Philosophy', 'Philosophy East and West', 'University of Hawai‘i Press', 2004, 'https://doi.org/10.1353/pew.2004.0014', 'Focused analysis used for the relation among anti-aggression, political order, Heaven, ghosts, and coercive hierarchy.', '10.1353/pew.2004.0014'),
];

const legalismSources: EditorialSource[] = [
  sep('legalism-sep', ['Yuri Pines'], 'Legalism in Chinese Philosophy', 'https://plato.stanford.edu/entries/chinese-legalism/', 'Principal specialist overview for the misleading retrospective label, fa tradition, preserved texts, history, fa, shu, shi, authority, political psychology, and reception.', 2026, 'Spring 2026'),
  primary('lord-shang-pines', ['Shang Yang tradition'], 'The Book of Lord Shang: Apologetics of State Power in Early China', 'https://cup.columbia.edu/book/the-book-of-lord-shang/9780231179881/', 'Critical translation and study cited by received chapter and section. The fourth-to-third-century composite text is associated with Shang Yang’s reform legacy, not treated as his unedited autobiography.', 'Columbia University Press', 'Yuri Pines', 2017, '9780231179881'),
  primary('hanfeizi-watson', ['Anonymous and attributed authors of the Han Feizi'], 'Han Feizi: Basic Writings', 'https://cup.columbia.edu/book/han-feizi/9780231129690', 'Scholarly selected translation cited by received chapter. It is used with specialist work because the fifty-five-chapter collection has debated single authorship.', 'Columbia University Press', 'Burton Watson', 2003, '9780231129690'),
  primary('hanfeizi-liao', ['Anonymous and attributed authors of the Han Feizi'], 'The Complete Works of Han Fei Tzu', 'https://archive.org/details/in.ernet.dli.2015.189113', 'Historical complete translation used for chapter access and cross-checking, never as the sole authority for disputed terms or authorship.', 'Arthur Probsthain', 'W. K. Liao', 1939),
  book('hanfei-companion', ['Paul R. Goldin'], 'Dao Companion to the Philosophy of Han Fei', 'Springer', 2013, 'https://doi.org/10.1007/978-94-007-4318-2', 'Edited specialist collection used for authorship, Xunzi, Daoist chapters, the ruler’s predicament, and reception; chapter-specific claims remain qualified.', '9789400743175', '10.1007/978-94-007-4318-2'),
  book('pines-eternal-empire', ['Yuri Pines'], 'Envisioning Eternal Empire: Chinese Political Thought of the Warring States Era', 'University of Hawai‘i Press', 2009, 'https://doi.org/10.21313/hawaii/9780824832759.001.0001', 'Specialist historical study used for changing Warring States political arguments and the warning against reading later imperial endurance directly out of one early text.', '9780824832759', '10.21313/hawaii/9780824832759.001.0001'),
];

type Profile = {
  sources: EditorialSource[];
  citations: (sectionId: string) => CitationReference[];
  patch: Omit<Partial<Branch>, 'id' | 'articleSections' | 'editorial'>;
  edits?: Record<string, Record<number, string>>;
  reviewNotePath: string;
};

type ClaimEvidence = {
  classification: CitationReference[];
  chronology: CitationReference[];
  definition: CitationReference[];
  purpose: CitationReference[];
  'central-questions': CitationReference[];
  significance: CitationReference[];
  'origin-story': CitationReference[];
  history: CitationReference[];
  concepts: CitationReference[];
  relationships: CitationReference[];
  figures: CitationReference[];
  works: CitationReference[];
  debates: CitationReference[];
  misunderstandings: CitationReference[];
  relevance: CitationReference[];
  readings: CitationReference[];
};

const profiles: Record<TargetId, Profile> = {
  confucianism: {
    sources: confucianismSources,
    citations: (section) => {
      if (section === 'overview') return all(c('conf-ethics-sep', 'section', '§2.1–2.6; §2.9–2.11'), c('confucius-sep', 'section', '§§2–8'), c('analects-ctext', 'standard-division', 'Books I–XVII'));
      if (section === 'confucius-context') return all(c('confucius-sep', 'section', '§§1–7'), c('analects-ctext', 'standard-division', 'Books I–XVII'));
      if (section === 'ren-li-cultivation') return all(c('conf-ethics-sep', 'section', '§§2.1–2.4; 2.8; 2.10'), c('confucius-sep', 'section', '§§3–6'), c('analects-ctext', 'standard-division', '1.1; 4.15; 12.1–12.2; 13.18'));
      if (section === 'mencius-xunzi') return all(c('mencius-sep', 'section', '§§2–5; 7'), c('xunzi-sep', 'section', '§§2–6'), c('mengzi-ctext', 'standard-division', '2A6; 6A1–8; 1B1–8'), c('xunzi-hutton', 'chapter', 'Human Nature Is Bad; Ritual; Rectifying Names'));
      if (section === 'government-family') return all(c('conf-ethics-sep', 'section', '§§2.4–2.6; 2.10–2.11'), c('mencius-sep', 'section', '§§4–6'), c('xunzi-sep', 'section', '§§4–6'));
      if (section === 'neo-confucian-development') return all(c('zhu-xi-sep', 'section', '§§1–6'), c('wang-sep', 'section', '§§2–6'), c('gardner-four-books', 'work', 'Complete monograph'));
      if (section === 'internal-debates') return all(c('conf-ethics-sep', 'section', '§§2.5–2.11'), c('zhu-xi-sep', 'section', '§§2–6'), c('wang-sep', 'section', '§§2–6'));
      if (section === 'neighbors-rivals') return all(c('conf-ethics-sep', 'section', '§§2–6'), c('zhu-xi-sep', 'section', '§§2–3'), c('analects-ctext', 'standard-division', 'Books 3, 12–13'));
      if (section === 'misunderstandings') return all(c('conf-ethics-sep', 'section', '§§2.1–2.11'), c('confucius-sep', 'section', '§§2–8'), c('zhu-xi-sep', 'section', '§§1–6'));
      if (section === 'modern-relevance') return all(c('conf-ethics-sep', 'section', '§§2.8–2.11'), c('wang-sep', 'section', '§§3; 6'));
      if (section === 'reading-path') return all(c('analects-ctext', 'standard-division', 'Books I–XX'), c('mengzi-ctext', 'standard-division', 'Books 1–7'), c('xunzi-hutton', 'work', 'Complete translation'), c('gardner-four-books', 'work', 'Complete monograph'));
      return all(c('conf-ethics-sep', 'section', '§§2.1–2.11'), c('confucius-sep', 'section', '§§1–8'));
    },
    patch: {
      category: 'Historically layered tradition',
      shortDefinition: 'A historically layered family of Ru learning, classical commentary, cultivation, ritual, relationship, and political argument associated with Confucius but continually remade and disputed by later thinkers.',
      oneSentencePurpose: 'Asks how learning, humane responsiveness, ritual forms, family and civic responsibilities, and institutions can form people and make authority answerable to ethical purpose.',
      beginnerExplanation: 'Confucian traditions ask how people learn to act humanely in relationships. They connect character to ritual, education, family care, public office, and criticism of authority, while leaving serious disputes over hierarchy, gender, political power, and the best route to moral knowledge.',
      whyItMatters: 'It makes moral formation, inherited practices, material conditions, and institutions part of one argument while requiring readers to ask when relationships educate and when they conceal domination.',
      originPeriod: 'Classical Chinese Ru learning, conventionally anchored in the fifth century BCE; later East Asian transformations',
      roughStartYear: -500,
      originStory: '“Confucianism” is a later European umbrella for diverse lines of Ru learning, textual transmission, commentary, ritual practice, and political argument. Confucius is a central remembered teacher, but neither a finished denomination nor one unchanged doctrine begins with him.',
      historicalDevelopment: ['Sayings associated with Confucius circulated and were later gathered into the layered received Analects; the conventional 551–479 BCE dates remain orientation rather than a documentary biography.', 'Mencius and Xunzi made sharply different arguments about moral beginnings, desire, ritual, learning, names, material conditions, and government.', 'Han, Song, Yuan, Ming, Qing, and modern institutions repeatedly selected, criticized, and reconfigured classics and practices; state sponsorship was never the same thing as unanimous philosophical agreement.', 'Zhu Xi’s Four Books curriculum gained particular examination authority after his death, while Wang Yangming, evidential scholars, feminist critics, democratic theorists, and East Asian traditions developed distinct later arguments.'],
      commonMisunderstandings: ['Confucianism is not an unchanging creed founded by one author, nor is every later state policy a transparent application of the Analects.', 'Li includes embodied, institutional, and affective practices; it is neither mere etiquette nor a moral authorization for every inherited hierarchy.', 'Mencius’s claim that human nature is good and Xunzi’s claim that it is bad do not reduce to optimism versus pessimism or to an argument about fixed Western-style moral essences.', '“Neo-Confucianism” is a modern umbrella; Song and Ming projects, including Zhu Xi’s and Wang Yangming’s, must not be collapsed into one doctrine or an inevitable orthodoxy.'],
      sourceLinks: [],
    },
    edits: {
      overview: {
        0: 'Confucianism is a historically developing family of teachings about becoming humane within relationships, ritual practices, education, and political life. The European label is useful for orientation but does not name one ancient self-identified “ism.” Participants invoked the way of the sages, classical learning, Ru learning, particular lineages, or later programs associated with pattern and the heart-mind. Confucius is the tradition’s exemplary remembered teacher, not the sole author of everything that followed. Mencius, Xunzi, Zhu Xi, Wang Yangming, and many less canonical writers disagree about moral psychology, knowledge, cosmic order, and the best route to cultivation while sharing and contesting texts, practices, and questions.',
      },
      'confucius-context': {
        0: 'Confucius is conventionally dated 551–479 BCE, a traditional chronology transmitted through later historical sources rather than a modern documentary biography. He is associated with the late Spring and Autumn world, when Zhou ritual and political authority had fragmented among regional states. The Analects portrays a teacher who looked to earlier rites, music, poetry, and exemplary rulers while testing inherited forms against moral purpose. He did not present himself as the inventor of a new religion or the author of a closed philosophical system. His teaching proceeds through conversation, correction, memorable contrasts, and judgments fitted to particular students. The received work was compiled and layered by followers, so individual sayings need contextual reading rather than automatic attribution to one historical voice.',
      },
      'neo-confucian-development': {
        0: 'After centuries of imperial scholarship and sustained encounter with Buddhist and Daoist traditions, Song thinkers fashioned new syntheses now commonly gathered under the modern English label “Neo-Confucian.” Zhu Xi organized the Four Books as an educational curriculum and developed an account of li, patterned coherence, and qi, the vital material through which particular things exist. Cultivation joins reverent attentiveness, ethical practice, textual study, and the “investigation of things.” Zhu Xi was not merely restoring an unchanged ancient doctrine: he selected commentaries, ranked texts, and offered explanations that answered contemporary rivals. His Four Books commentaries gained especially durable examination authority after his death, beginning with their formal Yuan adoption in 1313; that institutional success amplified one contested interpretation rather than proving it was always the sole Confucian view.',
      },
      'neighbors-rivals': {
        1: 'Buddhist traditions in China introduced monastic institutions and analyses of suffering, no-self, emptiness, and liberation that unsettled Confucian assumptions about family continuity and worldly roles. Neo-Confucian responses transformed metaphysics and practice even when polemical texts deny the debt. Comparisons with Aristotelian virtue ethics can illuminate habituation and exemplars, but ren and li belong to different ritual, familial, and cosmological histories than eudaimonia and the Greek polis. Comparisons with care ethics reveal shared attention to dependence and relationship, yet contemporary care theory arises from feminist criticism and should not be collapsed into traditional role ethics. Good comparison identifies both a common question and the different social machinery through which each answer operates.',
      },
    },
    reviewNotePath: 'docs/editorial/reviews/confucianism.md',
  },
  daoism: {
    sources: daoismSources,
    citations: (section) => {
      if (section === 'overview') return all(c('daoism-sep', 'section', '§§1–2; 4–10'), c('laozi-sep', 'section', '§§1–6'), c('zhuangzi-sep', 'section', '§§2–4'));
      if (section === 'historical-development') return all(c('laozi-sep', 'section', '§§1–3'), c('roberts-daodejing', 'page', 'Introduction, pp. 3–14'), c('zhuangzi-sep', 'section', '§§1–3'), c('liu-zhuangzi', 'work', 'Complete monograph'));
      if (section === 'key-concepts') return all(c('daodejing-ctext', 'standard-division', 'Chapters 1–2, 11, 25, 32, 37–38, 40, 57, 78'), c('zhuangzi-ctext', 'standard-division', 'Chapters 2–4, 6, 17–19'), c('laozi-sep', 'section', '§§4–6'), c('zhuangzi-sep', 'section', '§§4.4–4.8'));
      if (section === 'thinkers-and-texts') return all(c('laozi-sep', 'section', '§§2–7'), c('zhuangzi-sep', 'section', '§§2–4'), c('zhuangzi-iep', 'section', 'Text; Philosophy; Influence'));
      if (section === 'internal-debates') return all(c('zhuangzi-sep', 'section', '§§3–4.8'), c('laozi-sep', 'section', '§§4–7'), c('daoism-sep', 'section', '§§4–10'));
      if (section === 'neighbors-and-relationships') return all(c('daoism-sep', 'section', '§§1–3; 7–10'), c('laozi-sep', 'section', '§§4–7'), c('zhuangzi-sep', 'section', '§§3–4.8'));
      if (section === 'misunderstandings') return all(c('laozi-sep', 'section', '§§1–7'), c('zhuangzi-sep', 'section', '§§2–4'), c('zhuangzi-iep', 'section', 'Introduction; Text; Philosophy'));
      if (section === 'modern-relevance') return all(c('daoism-sep', 'section', '§§8–10'), c('zhuangzi-sep', 'section', '§§4.5–4.8'));
      if (section === 'reading-path') return all(c('daodejing-ctext', 'standard-division', 'Chapters 1, 8, 11, 22, 25, 37–38, 57, 78, 80'), c('zhuangzi-ctext', 'standard-division', 'Chapters 1–7; 17–19'), c('roberts-daodejing', 'page', 'Introduction, pp. 3–14'), c('liu-zhuangzi', 'work', 'Complete monograph'));
      return all(c('daoism-sep', 'section', '§§1–10'), c('laozi-sep', 'section', '§§1–7'), c('zhuangzi-sep', 'section', '§§2–4'));
    },
    patch: {
      category: 'Retrospectively named, diverse tradition',
      shortDefinition: 'A diverse field of early texts, later commentaries, religious communities, and practices conventionally grouped as Daoist; the label and its philosophical–religious division are historical tools, not ancient borders.',
      oneSentencePurpose: 'Examines how dao, naming, non-forcing, spontaneity, skill, political restraint, transformation, and limits of control can redirect conduct without imposing another rigid scheme.',
      beginnerExplanation: 'Daoist texts ask how people can act responsively rather than forcing life through status, fear, or fixed classifications. Start with the Daodejing and Zhuangzi, but keep their composite textual histories and later religious, ritual, and commentarial lives in view.',
      whyItMatters: 'It makes action, language, expertise, political power, change, and death objects of practical reflection while challenging the fantasy that one vocabulary or technique masters every situation.',
      originPeriod: 'Classical Chinese texts of the fifth–third centuries BCE and later Daoist textual, ritual, and institutional histories',
      roughStartYear: -350,
      originStory: '“Daoism” retrospectively groups materials that later Han historians and subsequent communities linked around dao. The Daodejing and Zhuangzi are central but composite texts; neither supplies evidence for one documented founder or a uniform creed already containing every later Daoist teaching.',
      historicalDevelopment: ['The Daodejing and Zhuangzi emerged through layered Warring States-era textual formation; manuscript witnesses and later recensions make a single-act authorship story untenable.', 'Han categorization, Wei–Jin commentary, and later textual circulation brought Laozi and Zhuangzi into changing philosophical lineages rather than preserving an unchanged school identity.', 'Organized Daoist traditions developed scriptures, ritual, registers, meditation, alchemical practices, institutions, and diverse local lives that both use and exceed the two classical texts.', 'Buddhist, Confucian, literary, medical, political, and global receptions repeatedly transformed Daoist vocabularies; modern ecological, therapeutic, or managerial uses remain analogies, not ancient predictions.'],
      commonMisunderstandings: ['“Daoism” is a retrospective and diverse category; it is not a secure self-description shared by Laozi, Zhuangzi, and every later community.', 'The Daodejing and Zhuangzi are composite transmitted works, not transcripts of two fully documented individuals or uniform doctrines.', 'Wu wei is non-forcing or uncontrived responsiveness, not laziness, a ban on all action, or a guarantee that skilled action is morally sufficient.', 'Philosophical and religious Daoism identify different emphases and sources, not sealed traditions with unrelated histories.', 'Zhuangzian perspective-shifting does not entail that all beliefs, practices, or political outcomes are equally good.'],
      sourceLinks: [],
    },
    edits: {
      overview: {
        0: 'Daoism names a historically diverse field of texts, practices, communities, and interpretations concerned with dao, the “way” or course through which lives and worlds unfold. The label is a later classificatory tool, not evidence that its earliest texts announced one common school. Philosophical introductions often begin with the Daodejing and Zhuangzi because they question rigid distinctions, coercive action, possessive knowledge, and the fantasy of mastering change. Yet neither book is a single-author manifesto, and later readers used them in changing political, religious, literary, medical, and contemplative settings. The central challenge is to learn responsiveness without turning responsiveness into another inflexible rule.',
      },
      'historical-development': {
        0: 'The received Daodejing is traditionally associated with Laozi, but neither a securely recoverable biography nor a single date of composition can be assumed. Accounts of Laozi as an older contemporary of Confucius belong to influential tradition, while modern scholarship generally treats the text as layered and compiled over time. Guodian bamboo slips and the Mawangdui silk manuscripts show that wording, ordering, and even the architecture of the collection were not always identical to the later received eighty-one-chapter version. Caution about authorship does not diminish the work. It lets readers attend to plurality and transmission rather than converting an attributed sage into a fully documented founder.',
        2: 'Later Daoist histories include organized communities, revealed scriptures, ritual lineages, meditation, alchemical traditions, monastic institutions, popular practices, and ongoing philosophical commentary. “Philosophical Daoism” and “religious Daoism” can be useful introductory distinctions when they identify a specific source, question, or institution, but they mislead when treated as two sealed worlds or as pure philosophy versus superstition. Textual reflection, cultivation, ritual, cosmology, and community repeatedly interact, although no practice or doctrine belongs to every lineage. A branch article can focus on arguments while acknowledging that living Daoist histories exceed the modern academic category built around Laozi and Zhuangzi.',
      },
      'internal-debates': {
        2: 'Cultivation creates another tension. If spontaneity is valued, why train? Daoist materials respond by showing that ordinary desire and judgment are already shaped by social pressures and compulsive habits. The “fasting of the heart-mind” belongs to a particular Zhuangzi episode, while breathing, quieting, ritual, and alchemical disciplines have distinct later textual and institutional histories; none should be silently made a universal Daoist technique. Such practices can loosen fixed patterns, yet effort can become another form of forcing. The tension is not a logical embarrassment to remove; it identifies the practical challenge of preparing for uncontrived responsiveness without manufacturing it as a performance.',
      },
      'reading-path': {
        1: 'Next study commentary and reception. Read an overview of Wang Bi and Guo Xiang to see how editors and interpreters help constitute a classic, while remembering that their commentaries are later arguments rather than windows onto a fixed original meaning. Add scholarship on organized Daoist traditions so the philosophical category does not erase ritual, community, bodily cultivation, and later scripture. Compare a Confucian text on ritual or cultivated ease and a Mohist text on standards, asking where the disagreement concerns goals, where it concerns methods, and where apparently opposed traditions diagnose the same problem in different vocabularies.',
      },
    },
    reviewNotePath: 'docs/editorial/reviews/daoism.md',
  },
  mohism: {
    sources: mohismSources,
    citations: (section) => {
      if (section === 'overview') return all(c('mohism-sep', 'section', '§§1–3; 6–9'), c('mozi-iep', 'section', '§§1–3; 7; 9–13'), c('mozi-johnston', 'chapter', '8–19; 20–21; 31–32; 35–37'));
      if (section === 'historical-development') return all(c('mohism-sep', 'section', '§1; Supplement: Texts and Authorship; §9'), c('mohist-canons-sep', 'section', '§§1–2; 4–5; 7'), c('mozi-iep', 'section', '§§1–2; 9; 11; 13'));
      if (section === 'key-concepts') return all(c('mohism-sep', 'section', '§§3–4; 7–8'), c('mohism-ethics-sep', 'section', '§3.1–3.2'), c('mozi-johnston', 'chapter', '4; 14–16; 25–28; 35–37'));
      if (section === 'program-and-texts') return all(c('mohism-sep', 'section', '§2; Supplement: Significance and Chronology of the Triads; §§6–8'), c('mozi-johnston', 'chapter', '8–21; 25–32; 35–37; 52–71'));
      if (section === 'internal-debates') return all(c('mohism-sep', 'section', '§§3–4; 6–8'), c('mozi-iep', 'section', '§§7–9; 12'), c('mohism-ethics-sep', 'section', '§3.1–3.2'));
      if (section === 'logic-and-disputation') return all(c('mohist-canons-sep', 'section', '§§1–2; 4–5; 7'), c('mohism-sep', 'section', '§§4–5'), c('mozi-johnston', 'chapter', '40–45'));
      if (section === 'misunderstandings') return all(c('mohism-sep', 'section', '§§2–9'), c('mozi-iep', 'section', '§§7–12'), c('mohism-war-ghosts', 'page', '343–363'));
      if (section === 'modern-relevance') return all(c('mohism-ethics-sep', 'section', '§3.1–3.2'), c('mohism-sep', 'section', '§§3–7'), c('mohist-canons-sep', 'section', '§§4–5'));
      if (section === 'reading-path') return all(c('mozi-johnston', 'chapter', '8–19; 20–21; 25–28; 31–32; 35–37; 40–45'), c('mohism-sep', 'section', '§§1–9'), c('mohist-canons-sep', 'section', '§§1–7'));
      return all(c('mohism-sep', 'section', '§§1–9'), c('mozi-iep', 'section', '§§1–13'));
    },
    patch: {
      category: 'Warring States movement and layered corpus',
      shortDefinition: 'An influential Warring States philosophical, social, and religious movement associated with Mozi and a layered corpus that argues for inclusive concern, benefit, standards, worthy appointment, anti-aggression, and moral accountability.',
      oneSentencePurpose: 'Tests teachings and institutions by public standards, broad benefit, evidence, and their effects on conflict, livelihood, appointment, and harm while exposing the risks of authoritative uniformity.',
      beginnerExplanation: 'Mohist writers ask why family, rank, or state borders should make another person’s injury count for less. They join inclusive concern to public standards, benefit, anti-aggression, Heaven, spirits, hierarchy, and technical expertise, so they are not simply early utilitarians.',
      whyItMatters: 'It makes partiality, elite cost, war, evidence, standards, skill, moral motivation, and political coordination parts of one demanding reform program—and makes its own authoritarian tension available for criticism.',
      originPeriod: 'Early Warring States China, conventionally from the mid-to-late fifth century BCE; later Mohist corpus and reception',
      roughStartYear: -450,
      originStory: 'Mohism formed around teachings associated with Mozi, whose exact life, birthplace, and personal authorship remain uncertain. The received Mozi preserves layered doctrinal triads, dialogues, defensive writings, and later technical materials rather than one autograph book or one stable institutional program.',
      historicalDevelopment: ['Early Mohist writers developed overlapping arguments about inclusive concern, benefit, standards, worthy appointment, frugality, anti-fatalism, Heaven, spirits, and opposition to aggressive war.', 'Mohist networks combined moral argument with organized defensive expertise and court-facing political counsel; this does not make every preserved technical text the work of Mozi himself.', 'Anonymous later Mohists developed difficult materials on names, knowledge, analogy, argument, geometry, mechanics, and optics, usually dated later than the main doctrinal triads and dependent on contested reconstruction.', 'Mohism ceased to survive as an organized self-conscious movement after early imperial consolidation for multiple reasons, while texts and problems persisted in later intellectual histories and modern reassessment.'],
      commonMisunderstandings: ['Jian ai is inclusive or impartial concern, not a settled demand for identical emotion or identical treatment in every relationship.', 'Mohist benefit includes a plurality of social goods and a theological-political framework; it is not a modern maximizing calculus or simply utilitarianism in another language.', 'Opposition to aggressive war coexists with defense, punishment, hierarchy, and central coordination; “pacifist” needs qualification.', 'The Mozi is a layered collection, and later Canons must not be attributed directly to Mozi or converted wholesale into modern formal logic.', 'Merit and publicly stated standards can challenge hereditary privilege without producing democratic equality or reliable accountability from above.'],
      sourceLinks: [],
    },
    edits: {
      overview: {
        0: 'Mohism was an influential intellectual, social, and religious movement of the Warring States era associated with Mozi and the layered text bearing his name. What can be recovered of Mozi’s biography is sparse, and the surviving corpus does not let us treat every chapter as one teacher’s dated statement. Mohist writers asked how teachings and policies should be assessed when inherited prestige and refined performance can conceal harm. Their program joined inclusive concern, benefit to the population, worthy appointment, frugality, opposition to aggressive war, anti-fatalism, and explicit standards for judgment. They did not merely offer isolated maxims: evolving communities made argument and collective practice instruments for redirecting rulers, officials, and communities toward order, material sufficiency, and care beyond partial loyalties.',
      },
      'historical-development': {
        0: 'Mozi is conventionally placed after Confucius and before Mencius, but the biographical record is limited and the Mozi is not a book written at one moment by a single hand. Its chapters preserve doctrinal triads, dialogues, defensive techniques, and later discussions of names, knowledge, and disputation. Repeated versions of arguments suggest teaching and transmission within a movement, yet their exact sequence and factional relationships remain disputed. “Mohist” therefore refers not only to a reconstructed individual’s opinions but to communities that organized, debated, advised rulers, and preserved evolving bodies of material.',
        2: 'Later materials conventionally called the Mohist Canons and Explanations investigate distinctions, inference, naming, knowledge, geometry, optics, mechanics, and patterns of disputation. They are anonymous, usually dated later than the doctrinal triads, and textually difficult; scholars disagree about reconstruction and about how their technical analyses relate to earlier Mohist programs. They should not be advertised as a complete modern formal-logic or science textbook. They nevertheless demonstrate sustained analysis of how names apply, how reasons support claims, and how standards guide distinctions. Mohism ceased to survive as a self-conscious organized movement after early imperial consolidation, but its texts survived and became central to modern reassessments of early Chinese argument.',
      },
      'program-and-texts': {
        0: 'The best-known Mohist essays are organized around positions conventionally grouped as ten core theses, many preserved in parallel chapter sets. They advocate elevating the worthy and conforming upward, impartial concern, condemnation of aggressive war, moderation in expenditures and funerals, a critique of elaborate music, the intention of Heaven, elucidation of spirits, and rejection of fatalism. This grouping reveals a programmatic family, but surviving versions differ in emphasis, vocabulary, and argument, and some chapter sets are incomplete. Readers should compare passages rather than assume that a modern outline captures one perfectly unified doctrine or a complete original table of contents.',
      },
      'logic-and-disputation': {
        0: 'Anonymous later Mohist materials study how a name picks out a kind, how claims can be compared, and how reasons support conclusions. They distinguish forms of knowledge and analyze sameness, difference, possibility, and implication through compressed definitions and examples. These investigations connect intellectual rigor to the wider Mohist concern with standards: public decisions require more than inherited prestige. They also show that early Chinese philosophy contains explicit reflection on argument and language, contrary to stereotypes that oppose a rational West to an intuitive China. Their terse and damaged transmission, however, means that any reconstruction should name its textual and interpretive limits.',
      },
      'reading-path': {
        2: 'Advanced readers should approach the Canons and Explanations through specialist commentary that marks damaged passages and competing reconstructions. Focus on one cluster—knowledge, names, inference, geometry, or optics—and compare it carefully with another tradition without declaring equivalence. Study Mohism’s disappearance as an organized school through multiple causes rather than a simple story of Confucian victory or intellectual failure. A reader has reached a sound checkpoint when they can explain impartial concern without calling it simply utilitarianism, describe frugality without hostility to all culture, and connect Mohist logic to the movement’s larger demand for public standards.',
      },
    },
    reviewNotePath: 'docs/editorial/reviews/mohism.md',
  },
  legalism: {
    sources: legalismSources,
    citations: (section) => {
      if (section === 'overview') return all(c('legalism-sep', 'section', '§1; §§2.1–2.3; 4–5'), c('hanfeizi-watson', 'chapter', '5–8; 49'), c('lord-shang-pines', 'chapter', '1–3; 9; 20'));
      if (section === 'historical-development') return all(c('legalism-sep', 'section', '§§1–1.2; 3; 6–7'), c('lord-shang-pines', 'work', 'Complete critical translation and study'), c('pines-eternal-empire', 'work', 'Complete monograph'));
      if (section === 'key-concepts') return all(c('legalism-sep', 'section', '§§2.3; 4.1–4.2; 5.1–5.2'), c('hanfeizi-watson', 'chapter', '5–8; 43; 49'), c('hanfeizi-liao', 'chapter', '6; 40; 43; 48–49; 53'));
      if (section === 'thinkers-and-texts') return all(c('legalism-sep', 'section', '§§1.1–1.2; 3–5'), c('lord-shang-pines', 'chapter', '1–3; 9; 20'), c('hanfei-companion', 'work', 'Introduction and specialist chapters'));
      if (section === 'internal-debates') return all(c('legalism-sep', 'section', '§§2–5'), c('hanfei-companion', 'work', 'Introduction and specialist chapters'), c('pines-eternal-empire', 'work', 'Complete monograph'));
      if (section === 'neighbors-and-rivals') return all(c('legalism-sep', 'section', '§§2–5'), c('hanfei-companion', 'work', 'Introduction and specialist chapters'), c('hanfeizi-watson', 'chapter', '5–8; 43; 49'));
      if (section === 'misunderstandings') return all(c('legalism-sep', 'section', '§§1–7'), c('hanfei-companion', 'work', 'Introduction and specialist chapters'));
      if (section === 'modern-relevance') return all(c('legalism-sep', 'section', '§§4–5'), c('pines-eternal-empire', 'work', 'Complete monograph'));
      if (section === 'reading-path') return all(c('lord-shang-pines', 'work', 'Complete critical translation and study'), c('hanfeizi-watson', 'chapter', '5–8; 43; 49'), c('legalism-sep', 'section', '§§1–7'));
      return all(c('legalism-sep', 'section', '§§1–7'), c('hanfei-companion', 'work', 'Introduction and specialist chapters'));
    },
    patch: {
      category: 'Retrospective fa/statecraft grouping',
      shortDefinition: 'A retrospective grouping of Warring States fa and statecraft arguments about standards, administrative technique, positional power, incentives, state strength, and ruler-centered authority—not one self-identified “Legalist school.”',
      oneSentencePurpose: 'Asks how rulers can make offices, information, standards, rewards, punishments, and hierarchy serve coordinated state goals while exposing the accountability deficit of sovereign power.',
      beginnerExplanation: '“Legalism” is a later label for several early Chinese statecraft currents. Their texts analyze standards, offices, monitoring, incentives, and power attached to position, but do not supply a modern constitutional rule-of-law theory or a morally neutral management manual.',
      whyItMatters: 'It identifies enduring problems of favoritism, delegation, information asymmetry, incentives, and institutional power while making visible the coercion and unaccountable sovereignty its solutions can intensify.',
      originPeriod: 'Warring States fa/statecraft currents, especially the fourth–third centuries BCE; later Han classification and imperial reception',
      roughStartYear: -400,
      originStory: '“Legalism” and fajia are retrospective categories. Texts associated with Shang Yang, Shen Buhai, Shen Dao, and Han Feizi differ in chronology, survival, authorship, vocabulary, and political emphasis; a later category can illuminate family resemblances only if it does not erase those differences.',
      historicalDevelopment: ['Fourth- and third-century BCE reform and statecraft arguments addressed military competition, ranks, agriculture, taxation, offices, rewards, punishment, and the struggle to control officials.', 'The Book of Lord Shang and Han Feizi are composite transmitted collections; fragmentary evidence for Shen Buhai and Shen Dao makes neat textbook divisions among fa, shu, and shi provisional aids rather than complete personal systems.', 'Qin unification brought certain reforms and administrative methods to extraordinary scale, but neither Qin practice nor the dynasty’s rapid collapse should be equated simply with every fa text.', 'Han catalogues and later historians stabilized a family label while administrative techniques, laws, ritual claims, and moral rhetoric continued to interact; later reception is not a simple story of abolition or vindication.'],
      commonMisunderstandings: ['“Legalism” is a convenient but inaccurate retrospective category, not a self-identified school with one founder or one doctrine.', 'Fa can mean standards, models, methods, institutions, rules, and laws depending on context; it is not automatically modern constitutional rule of law.', 'Fa, shu, and shi are not a three-part doctrine mechanically taught in exactly the same way by Shang Yang, Shen Buhai, Shen Dao, and Han Fei.', 'Xunzi remains a Confucian thinker; later testimony and intellectual influence do not make him a Legalist or make Han Fei a simple restatement of Xunzi.', 'Administrative sophistication does not neutralize collective responsibility, punishment, censorship, mobilization, or sovereign unaccountability.'],
      sourceLinks: [],
    },
    edits: {
      overview: {
        0: '“Legalism” is a later and imperfect label for several early Chinese thinkers and texts concerned with state power, administrative standards, offices, incentives, and the control of officials. They did not necessarily identify themselves as members of one unified school, and their proposals differ in text, date, and aim. The grouping is useful only as a retrospective family resemblance, often better called fa or statecraft currents. Its central problem is how a ruler can govern a large, competitive state without depending on the private virtue, inherited status, or professed loyalty of ministers whose knowledge and interests the ruler cannot fully inspect.',
      },
      'historical-development': {
        0: 'Ideas retrospectively called Legalist arose across the Warring States period rather than through a single lineage. Shang Yang is associated with reforms in Qin that reorganized ranks, taxation, agriculture, military reward, household responsibility, and the application of standards. The Book of Lord Shang is a heterogeneous transmitted collection linked to his reform legacy, not a stenographic record of one author’s complete philosophy; some chapters may be later than Shang Yang. Its proposals prioritize state strength and agricultural-military mobilization, illustrating how institutional reform could break aristocratic privilege while imposing exacting new forms of control.',
        1: 'Shen Buhai is conventionally associated with administrative techniques, especially supervising ministers and matching claims or titles to performance. Shen Dao is conventionally linked with shi, the authority or strategic advantage of position. Surviving evidence for both is fragmentary and mediated by later sources, so neat textbook divisions among fa, shu, and shi should be presented as interpretive aids rather than perfectly bounded personal systems. These strands converge most famously in the received Han Feizi, a fifty-five-chapter composite collection that draws on multiple predecessors while crafting a distinctive diagnosis of rulership, human motivation, speech, and bureaucratic danger.',
      },
      'key-concepts': {
        0: 'Fa is often translated as law, but its range includes publicly available standards, models, measurements, methods, rules, and institutions. Its attraction lies in consistency: an office or action can be evaluated without relying solely on noble birth or a ruler’s momentary preference. Clear standards may restrain favoritism, yet they do not automatically constrain the sovereign who establishes and interprets them. Fa in these debates is therefore not equivalent to modern constitutionalism, equal rights, or rule of law. It can make administration predictable while remaining an instrument of asymmetrical state power.',
      },
      'thinkers-and-texts': {
        1: 'The received Han Feizi combines administrative theory, political psychology, historical argument, anecdotes, criticism of rival counselors, and commentaries on the Laozi. Because the collection is composite, it is safer to attribute a claim to a chapter or the received text than to assume that one historical author endorsed every line. Several chapters portray a ruler who must preserve authority while ministers pursue advantage; moral reputation and eloquence cannot be trusted without verified performance. Daoist vocabulary of stillness or emptiness is adapted to statecraft in some of these materials, but that political use should not make Daoism and fa thought the same. Concealing preferences to control ministers works differently from Zhuangzian freedom from fixed schemes or Daodejing criticism of excessive interference.',
      },
      'neighbors-and-rivals': {
        2: 'Some chapters of the received Han Feizi use themes associated with the Daodejing, including emptiness, stillness, and a ruler who does not expose personal preferences. Similar words perform different work. In Daoist texts, non-forcing can criticize aggressive government and loosen attachment to control; in ruler-centered statecraft, inconspicuousness can make ministers more legible and the sovereign less vulnerable. Neither tradition is wholly uniform, and influence can involve transformation rather than agreement. Calling Legalism “applied Daoism” or Daoism “anti-Legalism” erases the distinct political uses to which shared intellectual resources were put.',
      },
      'misunderstandings': {
        0: 'Legalism is not simply the ancient Chinese name for any tyrannical policy. It identifies a retrospectively grouped set of arguments about standards, administrative technique, positional power, institutional reform, and incentives. Calling every harsh ruler Legalist prevents analysis of what these texts actually propose, just as calling them one coherent school hides textual and historical differences. At the same time, sophistication does not excuse coercion. Collective responsibility, severe punishments, militarized mobilization, censorship, and unaccountable sovereignty warrant direct criticism. Precision makes that criticism stronger because it connects harms to the mechanisms and political goals that produce them.',
      },
    },
    reviewNotePath: 'docs/editorial/reviews/legalism.md',
  },
};

const serialize = (value: unknown): string => typeof value === 'string' ? value : JSON.stringify(value) ?? 'null';

const structuredEvidenceSections: Record<TargetId, Record<keyof ClaimEvidence, string>> = {
  confucianism: {classification: 'overview', chronology: 'confucius-context', definition: 'overview', purpose: 'ren-li-cultivation', 'central-questions': 'overview', significance: 'government-family', 'origin-story': 'overview', history: 'neo-confucian-development', concepts: 'ren-li-cultivation', relationships: 'neighbors-rivals', figures: 'mencius-xunzi', works: 'neo-confucian-development', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'reading-path'},
  daoism: {classification: 'overview', chronology: 'historical-development', definition: 'overview', purpose: 'key-concepts', 'central-questions': 'overview', significance: 'modern-relevance', 'origin-story': 'historical-development', history: 'historical-development', concepts: 'key-concepts', relationships: 'neighbors-and-relationships', figures: 'thinkers-and-texts', works: 'thinkers-and-texts', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'reading-path'},
  mohism: {classification: 'overview', chronology: 'historical-development', definition: 'overview', purpose: 'key-concepts', 'central-questions': 'overview', significance: 'program-and-texts', 'origin-story': 'historical-development', history: 'historical-development', concepts: 'key-concepts', relationships: 'internal-debates', figures: 'historical-development', works: 'program-and-texts', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'reading-path'},
  legalism: {classification: 'overview', chronology: 'historical-development', definition: 'overview', purpose: 'key-concepts', 'central-questions': 'overview', significance: 'internal-debates', 'origin-story': 'historical-development', history: 'historical-development', concepts: 'key-concepts', relationships: 'neighbors-and-rivals', figures: 'thinkers-and-texts', works: 'thinkers-and-texts', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'reading-path'},
};

const claimEvidence = (record: Branch, profile: Profile): ClaimEvidence => {
  const sections = structuredEvidenceSections[record.id as TargetId];
  return Object.fromEntries(Object.entries(sections).map(([key, section]) => [key, profile.citations(section)])) as ClaimEvidence;
};

const structuredClaims = (record: Branch, evidence: ClaimEvidence) => ({
  classification: claim(`${record.category} · ${record.name}`, evidence.classification),
  chronology: claim(serialize({originPeriod: record.originPeriod, roughStartYear: record.roughStartYear}), evidence.chronology),
  definition: claim(record.shortDefinition, evidence.definition),
  purpose: claim(record.oneSentencePurpose, evidence.purpose),
  'central-questions': claim(serialize(record.coreQuestions), evidence['central-questions']),
  significance: claim(record.whyItMatters, evidence.significance),
  'origin-story': claim(record.originStory ?? '', evidence['origin-story']),
  history: claim(serialize({brief: record.historicalDevelopment, detailed: record.historicalDevelopmentDetailed}), evidence.history),
  concepts: claim(serialize({core: record.keyConcepts, detailed: record.keyConceptsDetailed}), evidence.concepts),
  relationships: claim(serialize({related: record.relatedBranchIds, contrasting: record.contrastingBranchIds, rivals: record.rivalPositions, subBranches: record.subBranches}), evidence.relationships),
  figures: claim(serialize({major: record.majorPhilosopherIds, detailed: record.majorFigures}), evidence.figures),
  works: claim(serialize(record.majorWorks), evidence.works),
  debates: claim(serialize({internal: record.internalTensions, detailed: record.internalDebates, comparisons: record.comparisons}), evidence.debates),
  misunderstandings: claim(serialize({brief: record.commonMisunderstandings, detailed: record.misconceptionsDetailed}), evidence.misunderstandings),
  relevance: claim(serialize({brief: record.modernExamples, detailed: record.modernRelevanceDetailed}), evidence.relevance),
  readings: claim(serialize({suggested: record.suggestedReadingPath, beginner: record.beginnerReadingPath, advanced: record.advancedReadingPath}), evidence.readings),
});

const reviewedSections = (record: Branch, profile: Profile): ArticleSection[] => (record.articleSections ?? []).map((section) => ({
  ...section,
  paragraphs: section.paragraphs.map((paragraph, index) => {
    const original = typeof paragraph === 'string' ? paragraph : paragraph.text;
    const text = profile.edits?.[section.id]?.[index] ?? original;
    return p(`${record.id}-${section.id}-${index + 1}`, text, profile.citations(section.id));
  }),
}));

/** Applies only when Sol registers it last in the canonical branch pipeline and replaces every lock placeholder. */
export const applyFinalChineseTraditionsClaimReviewEditorial = (record: Branch): Branch => {
  if (!Object.prototype.hasOwnProperty.call(profiles, record.id)) return record;
  const targetId = record.id as TargetId;
  const profile = profiles[targetId];
  const reviewed: Branch = {
    ...record,
    ...profile.patch,
    articleSections: reviewedSections(record, profile),
  };
  const evidence = claimEvidence(reviewed, profile);

  return {
    ...reviewed,
    editorial: {
      sources: profile.sources,
      structuredClaims: structuredClaims(reviewed, evidence),
      review: {
        status: 'claim-reviewed',
        reviewedOn: accessedOn,
        method: 'Full substantive branch-page claim review. Every article paragraph and generated structured claim was checked against cited primary texts where applicable, independent specialist sources, textual-formation and transmission cautions, retrospective-label safeguards, and explicit limits on interpretive or modern-comparison claims. Sol must replace the integration placeholder lock only after the final canonical record and separately reconciled Museum facts have been checked.',
        reviewNotePath: profile.reviewNotePath,
        lock: reviewLocks[targetId],
        evidencePolicy: {
          minimumIndependentSecondarySources: 2,
          minimumIndependentSecondaryDomains: 2,
          requiredSourceTypes: ['primary-text'],
        },
      },
    },
  };
};
