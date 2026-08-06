import type {CitationReference, EditorialSource, Philosopher} from '../../types/philosophy';
import {
  applyConnectedWorldsPhilosopherConfig,
  type ConnectedWorldsEvidence,
  type ConnectedWorldsPhilosopherConfig,
} from './medievalConnectedWorldsEditorialHelpers';

const reviewedOn = '2026-08-05';

const cite = (
  sourceId: string,
  kind: CitationReference['locator'] extends infer L ? L extends {kind: infer K} ? K : never : never,
  value: string,
  note?: string,
): CitationReference => ({sourceId, locator: {kind, value}, note});

const sep = (id: string, authors: string[], title: string, url: string): EditorialSource => ({
  id,
  type: 'scholarly-reference',
  authors,
  title,
  containerTitle: 'Stanford Encyclopedia of Philosophy',
  publisher: 'Metaphysics Research Lab, Stanford University',
  url,
  accessedOn: reviewedOn,
});

const primary = (
  id: string,
  authors: string[],
  title: string,
  url: string,
  translator?: string,
  publisher?: string,
  year?: number,
): EditorialSource => ({id, type: 'primary-text', authors, title, translator, publisher, year, url, accessedOn: reviewedOn});

const book = (
  id: string,
  authors: string[],
  title: string,
  publisher: string,
  year: number,
  url: string,
  doi?: string,
): EditorialSource => ({id, type: 'scholarly-book', authors, title, publisher, year, url, doi, accessedOn: reviewedOn});

const journal = (
  id: string,
  authors: string[],
  title: string,
  containerTitle: string,
  year: number,
  url: string,
  doi?: string,
): EditorialSource => ({id, type: 'journal-article', authors, title, containerTitle, year, url, doi, accessedOn: reviewedOn});

const sectionMap = (
  groups: Array<[string[], CitationReference[]]>,
): Record<string, CitationReference[]> => Object.fromEntries(
  groups.flatMap(([ids, citations]) => ids.map((id) => [id, citations])),
);

const evidence = (
  classification: CitationReference[],
  chronology: CitationReference[],
  concepts: CitationReference[],
  works: CitationReference[],
  relationships: CitationReference[],
  disputes: CitationReference[],
  reading: CitationReference[],
): ConnectedWorldsEvidence => ({classification, chronology, concepts, works, relationships, disputes, reading});

const configs: Record<string, ConnectedWorldsPhilosopherConfig> = {
  'al-kindi': {
    reviewedOn,
    reviewLock: 'fnv1a64:a943fadde7f5abe1',
    reviewNotePath: 'docs/editorial/reviews/al-kindi.md',
    sources: [
      primary('kindi-works', ['Al-Kindi'], 'The Philosophical Works of al-Kindi', 'https://research.manchester.ac.uk/en/publications/the-philosophical-works-of-al-kindi-studies-in-islamic-philosophy/', 'Peter Adamson and Peter E. Pormann', 'Oxford University Press', 2012),
      sep('kindi-sep', ['Peter Adamson'], 'Al-Kindi', 'https://plato.stanford.edu/entries/al-kindi/'),
      sep('kindi-greek-arabic-sep', ["Cristina D'Ancona"], 'Greek Sources in Arabic and Islamic Philosophy', 'https://plato.stanford.edu/entries/arabic-islamic-greek/'),
      book('kindi-adamson', ['Peter Adamson'], 'Al-Kindi', 'Oxford University Press', 2006, 'https://academic.oup.com/book/9539', '10.1093/acprof:oso/9780195181425.001.0001'),
      journal('kindi-cryptanalysis', ['Lyle D. Broemeling'], 'An Account of Early Statistical Inference in Arab Cryptology', 'The American Statistician', 2011, 'https://www.tandfonline.com/doi/abs/10.1198/tas.2011.10191', '10.1198/tas.2011.10191'),
    ],
    sectionCitations: sectionMap([
      [['overview', 'abbasid-context', 'translation-method'], [cite('kindi-sep', 'section', '§§1–2 and 6'), cite('kindi-greek-arabic-sep', 'section', '§§2–4'), cite('kindi-adamson', 'chapter', 'Chs. 1 and 7')]],
      [['philosophy-defense', 'metaphysics-god', 'negative-language', 'revelation-and-reason'], [cite('kindi-works', 'standard-division', 'On First Philosophy, surviving Part I §§1–4'), cite('kindi-sep', 'section', '§3.1'), cite('kindi-adamson', 'chapter', 'Chs. 2–3')]],
      [['soul-intellect'], [cite('kindi-works', 'work', 'On the Intellect'), cite('kindi-sep', 'section', '§4'), cite('kindi-adamson', 'chapter', 'Ch. 4')]],
      [['mathematics-science'], [cite('kindi-sep', 'section', '§§2 and 5'), cite('kindi-adamson', 'chapter', 'Ch. 6'), cite('kindi-cryptanalysis', 'page', 'pp. 255–257')]],
      [['ethics-therapy'], [cite('kindi-works', 'work', 'On Dispelling Sorrows'), cite('kindi-sep', 'section', '§5'), cite('kindi-adamson', 'chapter', 'Ch. 5')]],
      [['relation-greeks', 'influence-reception', 'tensions-misunderstandings'], [cite('kindi-sep', 'section', '§§1–6'), cite('kindi-greek-arabic-sep', 'section', '§§2–4'), cite('kindi-adamson', 'chapter', 'Chs. 1 and 7')]],
      [['reading-strategy'], [cite('kindi-works', 'standard-division', 'On First Philosophy; On the Intellect; On Dispelling Sorrows'), cite('kindi-sep', 'section', 'Bibliography')]],
    ]),
    evidence: evidence(
      [cite('kindi-sep', 'section', '§§1 and 6')],
      [cite('kindi-sep', 'section', '§1'), cite('kindi-adamson', 'chapter', 'Ch. 1')],
      [cite('kindi-works', 'standard-division', 'On First Philosophy, surviving Part I §§1–4'), cite('kindi-sep', 'section', '§§3–5')],
      [cite('kindi-works', 'standard-division', 'On First Philosophy; On the Intellect; On Dispelling Sorrows'), cite('kindi-sep', 'section', '§2')],
      [cite('kindi-sep', 'section', '§6'), cite('kindi-adamson', 'chapter', 'Ch. 7')],
      [cite('kindi-sep', 'section', '§§1–6'), cite('kindi-greek-arabic-sep', 'section', '§§2–4')],
      [cite('kindi-works', 'standard-division', 'On First Philosophy; On the Intellect; On Dispelling Sorrows')],
    ),
    patch: {
      lifespan: 'c. 800–after 866 (probably early 870s)',
      dateDisplay: 'c. 800–after 866 CE; death probably in the early 870s',
      dateConfidence: 'low',
      dateNote: 'Al-Kindi’s birth is approximate, and his death is only securely later than the last datable evidence in 866; the familiar 801–873 span is conventional.',
      contributionSummary: 'Established a major early Arabic philosophical program across metaphysics, psychology, mathematics, and the sciences while working within the translation network conventionally called the al-Kindi circle.',
      mainIdeas: ['First philosophy and divine unity', 'Intellect and the soul', 'Mathematical sciences', 'Philosophical therapy'],
      keyWorks: ['On First Philosophy (incomplete)', 'On the Intellect', 'On Dispelling Sorrows'],
      branchMemberships: [
        {branchId: 'islamic-philosophy', status: 'major', note: 'A formative early Arabic philosopher whose corpus and translation milieu helped establish falsafa without beginning speculative thought in Arabic.', confidence: 'high'},
        {branchId: 'metaphysics', status: 'major', note: 'Argues about first cause, finite creation, unity, and negative predication in an Aristotelian and Neoplatonic inheritance.', confidence: 'high'},
        {branchId: 'philosophy-of-religion', status: 'associated', note: 'Defends philosophical inquiry and divine unity without fitting neatly into a later school boundary.', confidence: 'medium'},
      ],
      controversiesOrInterpretiveTensions: ['His chronology and much of the attributed corpus remain uncertain or lost.', 'The “first philosopher of the Arabs” epithet must not imply that Arabic speculative reasoning began with him.', 'The division of labor and patronage inside the so-called al-Kindi circle is reconstructed rather than fully documented.'],
      commonMisunderstandings: ['Al-Kindi did not merely preserve Greek learning; translation, terminology, and argument transformed it.', 'His intellect theory should not be replaced by the more elaborate systems of al-Farabi, Avicenna, or Averroes.'],
    },
    paragraphTextPatches: {
      overview: {
        0: 'Al-Kindi is often called “the philosopher of the Arabs,” an epithet connected both with his Kindah lineage and his role as the first known thinker in Arabic to identify his enterprise explicitly as philosophy. It does not mean that no one before him reasoned speculatively in Arabic. Working amid the early Abbasid translation movement, he joined metaphysics, mathematics, medicine, optics, music, and theology while helping an Arabic philosophical vocabulary take shape.',
        1: 'His importance is doctrinal and infrastructural, but the lines of reception must remain specific. His circle and corpus helped establish Arabic philosophical terminology and problems; later Arabic readers engaged that inheritance, while particular works on optics, intellect, astrology, and the sciences traveled through separate Latin routes. This is stronger history than a single direct chain from al-Kindi through every later Islamic, Jewish, and Latin thinker.',
      },
      'soul-intellect': {
        0: 'Al-Kindi wrote on soul and intellect in a setting where Aristotle, Plato, and late-antique commentators were read together. In On the Intellect he distinguishes an external first intellect from intellect in potentiality, intellect brought into actuality, and intellect manifest or acquired in use. These compact distinctions made important vocabulary available to Arabic and Latin readers, but they are not yet the same theory later developed by al-Farabi, Avicenna, or Averroes.',
      },
      'influence-reception': {
        1: 'Some works associated with al-Kindi reached Latin readers in optics, intellect, astrology, and other sciences, often indirectly or fragmentarily and sometimes under difficult attributions. The secure conclusion is therefore work-specific: his Arabic philosophical vocabulary and translation milieu became formative, while particular texts acquired distinct afterlives. He should not be used as the first link in an undocumented personal chain ending with Aquinas.',
      },
    },
  },

  'al-farabi': {
    reviewedOn,
    reviewLock: 'fnv1a64:c31dc45bb86bdc6f',
    reviewNotePath: 'docs/editorial/reviews/al-farabi.md',
    sources: [
      primary('farabi-political-writings', ['Al-Farabi'], 'The Political Writings: Selected Aphorisms and Other Texts', 'https://catalogue.bnf.fr/ark:/12148/cb377345920', 'Charles E. Butterworth', 'Cornell University Press', 2001),
      primary('farabi-political-writings-ii', ['Al-Farabi'], 'The Political Writings, Volume II: Political Regime and Summary of Plato’s Laws', 'https://www.degruyter.com/document/doi/10.7591/9781501700323/html', 'Charles E. Butterworth', 'Cornell University Press', 2015),
      sep('farabi-sep', ['David C. Reisman'], 'Al-Farabi', 'https://plato.stanford.edu/entries/al-farabi/'),
      sep('farabi-logic-sep', ['Therese-Anne Druart'], 'Al-Farabi’s Philosophy of Logic and Language', 'https://plato.stanford.edu/entries/al-farabi-logic/'),
      sep('farabi-metaphysics-sep', ['Damien Janos'], 'Al-Farabi’s Metaphysics', 'https://plato.stanford.edu/entries/al-farabi-metaphysics/'),
      journal('farabi-reisman-cambridge', ['David C. Reisman'], 'Al-Farabi and the Philosophical Curriculum', 'The Cambridge Companion to Arabic Philosophy', 2005, 'https://doi.org/10.1017/CCOL0521817439.004', '10.1017/CCOL0521817439.004'),
    ],
    sectionCitations: sectionMap([
      [['overview', 'context', 'influence-later'], [cite('farabi-sep', 'section', '§§1–8'), cite('farabi-reisman-cambridge', 'page', 'pp. 52–71')]],
      [['logic-method', 'classification-sciences', 'music-language'], [cite('farabi-political-writings', 'standard-division', 'Enumeration of the Sciences, ch. 5'), cite('farabi-logic-sep', 'section', '§§1–5'), cite('farabi-sep', 'section', '§§2–3')]],
      [['metaphysics-being', 'intellect-prophecy'], [cite('farabi-metaphysics-sep', 'section', '§§1–5'), cite('farabi-sep', 'section', '§§4–7')]],
      [['virtuous-city', 'imperfect-cities'], [cite('farabi-political-writings-ii', 'work', 'Political Regime'), cite('farabi-sep', 'section', '§7')]],
      [['religion-philosophy'], [cite('farabi-political-writings', 'work', 'Book of Religion'), cite('farabi-sep', 'section', '§§7–8'), cite('farabi-metaphysics-sep', 'section', '§5')]],
      [['plato-aristotle'], [cite('farabi-sep', 'section', '§§2, 4, and 7'), cite('farabi-reisman-cambridge', 'page', 'pp. 52–71')]],
      [['happiness-perfection'], [cite('farabi-political-writings-ii', 'work', 'Political Regime'), cite('farabi-sep', 'section', '§7')]],
      [['misunderstandings-reading'], [cite('farabi-sep', 'section', '§§1–8 and Bibliography'), cite('farabi-reisman-cambridge', 'page', 'pp. 52–71')]],
    ]),
    evidence: evidence(
      [cite('farabi-sep', 'section', '§§1–8')],
      [cite('farabi-sep', 'section', '§1'), cite('farabi-reisman-cambridge', 'page', 'pp. 52–71')],
      [cite('farabi-logic-sep', 'section', '§§1–5'), cite('farabi-metaphysics-sep', 'section', '§§1–5'), cite('farabi-political-writings-ii', 'work', 'Political Regime')],
      [cite('farabi-political-writings', 'standard-division', 'Selected Aphorisms; Enumeration ch. 5; Book of Religion'), cite('farabi-political-writings-ii', 'standard-division', 'Political Regime; Summary of Plato’s Laws')],
      [cite('farabi-sep', 'section', '§8'), cite('farabi-reisman-cambridge', 'page', 'pp. 52–71')],
      [cite('farabi-sep', 'section', '§§1–8'), cite('farabi-metaphysics-sep', 'section', '§§1–5')],
      [cite('farabi-political-writings', 'standard-division', 'Enumeration ch. 5; Book of Religion'), cite('farabi-political-writings-ii', 'work', 'Political Regime')],
    ),
    patch: {
      lifespan: 'c. 870–950/51',
      dateDisplay: 'c. 870–950/51 CE',
      dateConfidence: 'low',
      dateNote: 'Al-Farabi’s birth, ethnic origin, early education, and much of his itinerary are uncertain; his death in Damascus is placed in December 950 or January 951.',
      region: 'Probably Central Asia; Baghdad and Syria',
      contributionSummary: 'Connected logic, language, the sciences, metaphysics, prophecy, religion, and political order in a program directed toward human happiness.',
      mainIdeas: ['Logic and the five argumentative arts', 'Classification of the sciences', 'Intellect and prophecy', 'Virtuous and imperfect cities', 'Religion and political representation'],
      keyWorks: ['Enumeration of the Sciences', 'Book of Religion', 'The Principles of the Opinions of the Inhabitants of the Virtuous City', 'Political Regime'],
      controversiesOrInterpretiveTensions: ['His biography and the chronology of many works remain sparse or disputed.', 'The Harmonization of the Opinions of Plato and Aristotle is of disputed attribution and cannot securely define his program.', 'His political typology is a normative account of happiness and education, not a historical description or a ready-made authoritarian blueprint.'],
      commonMisunderstandings: ['“Second Teacher” is a reception title, not an uncontested contemporary rank.', 'His account of religion is not the claim that every religion is merely decorative imagery for one philosophy.'],
    },
    paragraphTextPatches: {
      overview: {
        1: 'His thought joins technical logic to human happiness. Demonstration, language, religion, political leadership, and imagination matter because people require different forms of education and assent. In works such as the Book of Religion and the political writings, a virtuous religion can represent or imitate truths for a community through laws, images, and practices. That normative account permits more than one good representation and should not be reduced to the blanket slogan that religion is merely symbolic philosophy.',
      },
      'metaphysics-being': {
        0: 'Al-Farabi’s metaphysical discussions of being, first cause, intellect, and cosmic order vary with work, genre, chronology, and disputed attribution. Aristotelian causal questions and Neoplatonic structures are important, but the surviving corpus does not present one frictionless system or Avicenna’s later textbook distinction between essence and existence. The political and cosmological works instead organize different routes from first cause to intelligible order.',
      },
      'religion-philosophy': {
        0: 'In the Book of Religion and related political works, al-Farabi treats religion as opinions and actions prescribed for a community by a ruler or lawgiver. A virtuous religion represents or imitates truths in forms suited to civic education and can differ from another virtuous representation. The account is normative and differentiates audiences and regimes; it does not make all historical religion a worthless copy of philosophy.',
      },
      'plato-aristotle': {
        0: 'Al-Farabi organizes Plato and Aristotle within one philosophical curriculum, but the work traditionally called Harmonization of the Opinions of the Two Sages is of seriously disputed attribution and cannot by itself establish his authorial program. His knowledge of Plato was also mediated and incomplete. Secure works nevertheless show him using Aristotelian logic and science alongside Platonic political problems for distinct purposes.',
        1: 'Harmony is therefore best treated as an interpretive and curricular strategy rather than a settled claim that the historical Plato and Aristotle agreed on everything. Al-Farabi’s Philosophy of Plato and Philosophy of Aristotle reconstruct different routes toward philosophy and happiness. The authenticity and genre of each text must govern what can be attributed to him.',
      },
      'misunderstandings-reading': {
        1: 'Begin with the translated fifth chapter of Enumeration of the Sciences, not with the assumption that Butterworth’s volume contains the whole work. Then compare logical selections, the Book of Religion, the Political Regime, and the Virtuous City. Read the attributed Harmonization only with its authenticity dispute visible, and keep asking how genre and audience change the relation among demonstration, persuasion, religion, and political education.',
      },
    },
  },

  avicenna: {
    reviewedOn,
    reviewLock: 'fnv1a64:e7109ece03440d5e',
    reviewNotePath: 'docs/editorial/reviews/avicenna.md',
    sources: [
      primary('avicenna-metaphysics', ['Avicenna'], 'The Metaphysics of The Healing', 'https://press.uchicago.edu/ucp/books/book/distributed/M/bo3622795.html', 'Michael E. Marmura', 'Brigham Young University Press', 2005),
      primary('avicenna-physics', ['Avicenna'], 'The Physics of The Healing', 'https://press.uchicago.edu/ucp/books/book/distributed/P/bo10581412.html', 'Jon McGinnis', 'Brigham Young University Press', 2009),
      sep('avicenna-sep', ['Dimitri Gutas'], 'Ibn Sina [Avicenna]', 'https://plato.stanford.edu/entries/ibn-sina/'),
      sep('avicenna-metaphysics-sep', ['Amos Bertolacci', 'Dag Nikolaus Hasse'], 'Ibn Sina’s Metaphysics', 'https://plato.stanford.edu/entries/ibn-sina-metaphysics/'),
      sep('avicenna-mind-sep', ['Deborah L. Black'], 'Ibn Sina’s Philosophy of Mind', 'https://plato.stanford.edu/entries/ibn-sina-mind/'),
      journal('avicenna-alpina', ['Tommaso Alpina'], 'The Soul, the Soul in Itself, and the Flying Man Experiment', 'Arabic Sciences and Philosophy', 2018, 'https://www.cambridge.org/core/journals/arabic-sciences-and-philosophy/article/abs/soul-of-the-soul-in-itself-and-the-flying-man-experiment/732C47E11C91B5E61A8C07EDCB605EC6', '10.1017/S0957423918000024'),
      journal('avicenna-adamson-benevich', ['Peter Adamson', 'Fedor Benevich'], 'The Thought Experimental Method: Avicenna’s Flying Man Argument', 'Journal of the American Philosophical Association', 2018, 'https://www.cambridge.org/core/journals/journal-of-the-american-philosophical-association/article/abs/thought-experimental-method-avicennas-flying-man-argument/19FFB52F1C61C24FCAA3CE4BEBFCDBC4', '10.1017/apa.2018.2'),
    ],
    sectionCitations: sectionMap([
      [['overview', 'context', 'influence-misunderstandings'], [cite('avicenna-sep', 'section', '§§1–10'), cite('avicenna-metaphysics-sep', 'section', '§§1–4'), cite('avicenna-mind-sep', 'work', 'Whole entry')]],
      [['aristotle-neoplatonism'], [cite('avicenna-sep', 'section', '§§2–7'), cite('avicenna-metaphysics-sep', 'section', '§§1–4')]],
      [['logic-science-medicine', 'works-canon-cure'], [cite('avicenna-physics', 'standard-division', 'Books I–IV'), cite('avicenna-sep', 'section', '§§3 and 8')]],
      [['essence-existence', 'modality-contingency'], [cite('avicenna-metaphysics', 'standard-division', 'Ilāhiyyāt I.1–5, VI, VIII.1–4'), cite('avicenna-metaphysics-sep', 'section', '§§1–3')]],
      [['necessary-existent', 'emanation-cosmology', 'divine-knowledge'], [cite('avicenna-metaphysics', 'standard-division', 'Ilāhiyyāt VIII.1–7 and IX.1–4'), cite('avicenna-metaphysics-sep', 'section', '§§3–4')]],
      [['soul-flying-man'], [cite('avicenna-mind-sep', 'section', 'Flying Man and self-awareness sections'), cite('avicenna-alpina', 'page', 'pp. 187–224'), cite('avicenna-adamson-benevich', 'page', 'pp. 147–164')]],
      [['prophecy-religion'], [cite('avicenna-metaphysics', 'standard-division', 'Ilāhiyyāt X'), cite('avicenna-sep', 'section', '§§7–8'), cite('avicenna-mind-sep', 'work', 'Prophecy and imagination discussion')]],
      [['reading-strategy'], [cite('avicenna-sep', 'section', 'Bibliography'), cite('avicenna-metaphysics', 'standard-division', 'Selected Ilāhiyyāt books'), cite('avicenna-physics', 'standard-division', 'Selected Physics books')]],
    ]),
    evidence: evidence(
      [cite('avicenna-sep', 'section', '§§1–10')],
      [cite('avicenna-sep', 'section', '§1')],
      [cite('avicenna-metaphysics', 'standard-division', 'Ilāhiyyāt I, VI, VIII–X'), cite('avicenna-mind-sep', 'work', 'Whole entry')],
      [cite('avicenna-metaphysics', 'standard-division', 'Ilāhiyyāt I–X'), cite('avicenna-physics', 'standard-division', 'Books I–IV')],
      [cite('avicenna-sep', 'section', '§§9–10')],
      [cite('avicenna-metaphysics-sep', 'section', '§§1–4'), cite('avicenna-alpina', 'page', 'pp. 187–224')],
      [cite('avicenna-sep', 'section', 'Bibliography')],
    ),
    patch: {
      dateDisplay: '980–1037 CE',
      dateConfidence: 'high',
      dateNote: 'The conventional dates are well established, but the autobiography completed by al-Juzjani is a shaped biographical source rather than neutral modern reportage.',
      region: 'Bukhara region and eastern Iranian courts',
      contributionSummary: 'Built an integrated system of logic, natural philosophy, psychology, medicine, and metaphysics whose accounts of quiddity, modality, causality, and soul reshaped later Islamic, Jewish, and Latin debates.',
      mainIdeas: ['Quiddity, existence, and modality', 'The Necessary Existent', 'Logic and demonstration', 'Soul and immediate self-awareness', 'Internal senses and prophecy'],
      keyWorks: ['The Healing', 'The Canon of Medicine', 'Pointers and Reminders', 'The Salvation', 'The Book of Knowledge for Ala al-Dawla'],
      controversiesOrInterpretiveTensions: ['The exact analysis of Avicenna’s distinction between quiddity and existence remains disputed.', 'The Flying Man secures immediate self-awareness more directly than it proves every thesis about immateriality.', 'Divine knowledge of particulars and the relation between philosophy and revelation generated sustained disagreement.'],
      commonMisunderstandings: ['Avicenna’s Necessary Existent argument is about modal and causal dependence, not merely a first event in time.', 'Later Latin textbook formulas should not be read back into Avicenna without qualification.'],
    },
    paragraphTextPatches: {
      'essence-existence': {
        0: 'Avicenna distinguishes the question of a thing’s quiddity—what it is—from whether it exists. A quiddity such as horseness can be considered without thereby asserting an extra-mental horse, while an existing contingent substance depends on causes. “Existence is added to essence” is therefore a risky shortcut: interpreters disagree about how the distinction operates mentally and metaphysically, and Aquinas’s later formulation should not be projected backward as Avicenna’s settled doctrine.',
      },
      'necessary-existent': {
        0: 'Avicenna divides existents into what is necessary in itself and what is possible in itself but necessary through another. Possible beings require causes not because they began at one temporal moment, but because their own quiddities do not explain their existence. His argument considers the causal dependence of possibles and their totality in order to reach a Necessary Existent, not simply a first link at the beginning of a temporal chain.',
      },
      'soul-flying-man': {
        0: 'The so-called Flying Man asks a newly created person, suspended without sensation or bodily contact, whether self-awareness would remain. Avicenna uses the scenario to isolate immediate awareness of self and to begin inquiry into the soul considered in itself. The experiment is not empirical, and the further inference from self-awareness to an immaterial, separable soul is philosophically contested.',
      },
      'divine-knowledge': {
        0: 'Avicenna denies that God learns particulars from changing effects or undergoes temporal alteration. His account is often summarized by saying that God knows particulars “in a universal way,” but that phrase can mislead if it suggests ignorance of individuals. The proposal instead derives knowledge from God’s causal self-knowledge and remains disputed over whether it preserves genuinely particular knowledge.',
      },
    },
  },

  'al-ghazali': {
    reviewedOn,
    reviewLock: 'fnv1a64:61106882bf9e164b',
    reviewNotePath: 'docs/editorial/reviews/al-ghazali.md',
    sources: [
      primary('ghazali-incoherence', ['Al-Ghazali'], 'The Incoherence of the Philosophers', 'https://press.uchicago.edu/ucp/books/author/A/Other/au5458274.html', 'Michael E. Marmura', 'Brigham Young University Press', 2000),
      primary('ghazali-deliverance', ['Al-Ghazali'], 'Deliverance from Error', 'https://search.worldcat.org/title/45002198', 'R. J. McCarthy', 'Fons Vitae', 2000),
      primary('ghazali-niche', ['Al-Ghazali'], 'The Niche of Lights', 'https://press.uchicago.edu/ucp/books/author/A/Other/au5458274.html', 'David Buchman', 'Brigham Young University Press', 1998),
      sep('ghazali-sep', ['Frank Griffel'], 'Al-Ghazali', 'https://plato.stanford.edu/entries/al-ghazali/'),
      book('ghazali-theology', ['Frank Griffel'], 'Al-Ghazali’s Philosophical Theology', 'Oxford University Press', 2009, 'https://academic.oup.com/book/27461', '10.1093/acprof:oso/9780195331622.001.0001'),
      journal('ghazali-incoherence-handbook', ['Frank Griffel'], 'Al-Ghazali’s Incoherence of the Philosophers', 'The Oxford Handbook of Islamic Philosophy', 2016, 'https://academic.oup.com/edited-volume/38657/chapter-abstract/335768202', '10.1093/oxfordhb/9780199917389.013.8'),
      book('ghazali-postclassical', ['Frank Griffel'], 'The Formation of Post-Classical Philosophy in Islam', 'Oxford University Press', 2021, 'https://academic.oup.com/book/40019'),
    ],
    sectionCitations: sectionMap([
      [['overview', 'misunderstandings'], [cite('ghazali-sep', 'section', '§§1–7'), cite('ghazali-theology', 'chapter', 'Introduction and chs. 1–4'), cite('ghazali-postclassical', 'chapter', 'Introduction and post-Ghazalian chapters')]],
      [['life-crisis', 'knowledge-skepticism'], [cite('ghazali-deliverance', 'work', 'Whole work'), cite('ghazali-sep', 'section', '§§1 and 5'), cite('ghazali-theology', 'chapter', 'Ch. 1')]],
      [['philosophical-training', 'relation-avicenna', 'logic-theology'], [cite('ghazali-sep', 'section', '§§2–4'), cite('ghazali-theology', 'chapter', 'Chs. 3–4'), cite('ghazali-incoherence-handbook', 'work', 'Whole chapter')]],
      [['incoherence', 'divine-knowledge', 'averroes-response'], [cite('ghazali-incoherence', 'standard-division', 'Discussions 1–20 and conclusion'), cite('ghazali-sep', 'section', '§2'), cite('ghazali-incoherence-handbook', 'work', 'Whole chapter')]],
      [['causality'], [cite('ghazali-incoherence', 'standard-division', 'Discussion 17'), cite('ghazali-sep', 'section', '§§3–4'), cite('ghazali-theology', 'chapter', 'Chs. 6–9')]],
      [['sufism-ethics'], [cite('ghazali-deliverance', 'work', 'Sufi path and return sections'), cite('ghazali-sep', 'section', '§§5–6'), cite('ghazali-theology', 'chapter', 'Chs. 1 and 9')]],
      [['niche-of-lights'], [cite('ghazali-niche', 'standard-division', 'Parts I–III'), cite('ghazali-sep', 'section', '§§4–6')]],
      [['reading-strategy'], [cite('ghazali-incoherence', 'standard-division', 'Discussions 1–20'), cite('ghazali-deliverance', 'work', 'Whole work'), cite('ghazali-sep', 'section', 'Bibliography')]],
    ]),
    evidence: evidence(
      [cite('ghazali-sep', 'section', '§§1–7')],
      [cite('ghazali-sep', 'section', '§1'), cite('ghazali-theology', 'chapter', 'Ch. 1')],
      [cite('ghazali-incoherence', 'standard-division', 'Discussions 1–20'), cite('ghazali-sep', 'section', '§§2–6')],
      [cite('ghazali-incoherence', 'standard-division', 'Discussions 1–20 and conclusion'), cite('ghazali-deliverance', 'work', 'Whole work'), cite('ghazali-niche', 'standard-division', 'Parts I–III')],
      [cite('ghazali-incoherence-handbook', 'work', 'Whole chapter'), cite('ghazali-postclassical', 'chapter', 'Post-Ghazalian falsafa and kalam chapters')],
      [cite('ghazali-sep', 'section', '§§1–7'), cite('ghazali-theology', 'chapter', 'Chs. 3–9')],
      [cite('ghazali-incoherence', 'standard-division', 'Discussion 17 and conclusion'), cite('ghazali-deliverance', 'work', 'Whole work')],
    ),
    patch: {
      lifespan: 'c. 1055/56–1111',
      dateDisplay: 'c. 1055/56–1111 CE',
      dateConfidence: 'medium',
      dateNote: 'Al-Ghazali’s letters and autobiographical chronology support c. 1055/56, while later biographical tradition often gives 1058/59.',
      region: 'Tus, Baghdad, Syria, and Khurasan',
      tradition: 'Ashari theologian, jurist, and Sufi-oriented Muslim thinker',
      contributionSummary: 'Used logic and philosophical analysis to test selected Avicennian demonstrations while integrating law, theology, ethics, and Sufi practice into a program of disciplined knowledge and transformation.',
      mainIdeas: ['Critique of claimed demonstration', 'Causation and divine agency', 'Logic in theology and law', 'Knowledge and spiritual discipline', 'Ethical purification'],
      keyWorks: ['The Incoherence of the Philosophers', 'Deliverance from Error', 'The Revival of the Religious Sciences', 'The Niche of Lights', 'The Aims of the Philosophers'],
      controversiesOrInterpretiveTensions: ['His birth chronology, autobiographical narrative, and motives for leaving Baghdad require source-sensitive treatment.', 'The Aims is an adaptation of Avicennian material whose date and relation to the Incoherence are disputed.', 'Discussion 17 permits competing readings of direct divine creation and secondary causes within a stable order.'],
      commonMisunderstandings: ['Al-Ghazali did not reject logic, mathematics, medicine, or reason as such.', 'His criticism did not end philosophy in Islamic intellectual worlds.'],
    },
    paragraphTextPatches: {
      'philosophical-training': {
        0: 'Al-Ghazali’s engagement with philosophy included an Arabic adaptation of Avicenna’s Persian Book of Knowledge, now known as The Aims of the Philosophers. Older accounts treated it as a neutral synopsis written simply to prepare the Incoherence, but its date, framing, and relation to that polemic are looser and disputed. It nevertheless shows that responsible criticism required close command of the philosophical materials at issue.',
      },
      incoherence: {
        0: 'The Incoherence examines twenty selected theses associated especially with al-Farabi and Avicenna. Its conclusion differentiates the judgments: three positions—the world’s pre-eternity, denial that God knows particulars in the relevant sense, and denial of bodily resurrection—are treated as unbelief, while other errors receive different classifications. This is not a blanket condemnation of logic, medicine, mathematics, or philosophy.',
      },
      causality: {
        0: 'In Discussion 17, al-Ghazali denies that the observed conjunction between what is habitually called cause and effect is necessary in itself. Fire and cotton do not disclose, by observation alone, an independently necessary tie. The argument protects divine agency and the possibility of miracles while challenging the philosophers’ claim to demonstration.',
        1: 'Calling this position simply “occasionalism” can conceal a live interpretive dispute. Some passages support direct divine creation of each event; others allow created secondary causes operating within a stable order that depends on God. The secure conclusion is the denial of an intrinsic necessary connection, not one uncontested mechanism across every work.',
      },
      'reading-strategy': {
        0: 'Begin with Deliverance from Error as a crafted retrospective account of disciplines, crisis, and spiritual practice rather than a transparent diary. Read selected discussions of the Incoherence next, especially Discussion 17 and the conclusion. Approach The Aims as an adaptation of Avicennian material with disputed chronology and framing, not automatically as the neutral first half of one two-book plan.',
      },
    },
  },

  averroes: {
    reviewedOn,
    reviewLock: 'fnv1a64:7343a524467c1ca6',
    reviewNotePath: 'docs/editorial/reviews/averroes.md',
    sources: [
      primary('averroes-decisive', ['Averroes'], 'Decisive Treatise and Epistle Dedicatory', 'https://iberian-connections.yale.edu/wp-content/uploads/2019/08/Averroes-DecisiveTreatise.pdf', 'Charles E. Butterworth', 'Brigham Young University Press', 2001),
      primary('averroes-de-anima', ['Averroes'], 'Long Commentary on the De Anima of Aristotle', 'https://yalebooks.yale.edu/book/9780300178296/long-commentary-on-the-de-anima-of-aristotle/', 'Richard C. Taylor', 'Yale University Press', 2009),
      primary('averroes-incoherence', ['Averroes'], 'The Incoherence of the Incoherence', 'https://archive.org/details/incoherenceofinc0000aver', 'Simon van den Bergh', 'Luzac', 1954),
      sep('averroes-sep', ['Peter Adamson', 'Richard C. Taylor'], 'Ibn Rushd [Averroes]', 'https://plato.stanford.edu/entries/ibn-rushd/'),
      journal('averroes-taylor-cambridge', ['Richard C. Taylor'], 'Averroes: Religious Dialectic and Aristotelian Philosophical Thought', 'The Cambridge Companion to Arabic Philosophy', 2005, 'https://www.cambridge.org/core/books/cambridge-companion-to-arabic-philosophy/averroes/97FF8D153EB19CB6F9D54B57B15437D0'),
      journal('averroes-butterworth', ['Charles E. Butterworth'], 'The Source that Nourishes: Averroes’s Decisive Determination', 'Arabic Sciences and Philosophy', 2008, 'https://www.cambridge.org/core/journals/arabic-sciences-and-philosophy/article/abs/source-that-nourishes-averroess-decisive-determination/C226C857A52B86F88091CFE33C14BFB4'),
    ],
    sectionCitations: sectionMap([
      [['overview', 'andalus-context', 'medicine-science'], [cite('averroes-sep', 'section', '§§1 and 8'), cite('averroes-taylor-cambridge', 'page', 'pp. 180–200')]],
      [['commentary-project', 'metaphysics-cosmos'], [cite('averroes-sep', 'section', '§§1–5'), cite('averroes-taylor-cambridge', 'page', 'pp. 180–200')]],
      [['decisive-treatise', 'demonstration-audience', 'scripture-interpretation'], [cite('averroes-decisive', 'standard-division', '§§1–3, 14–16, 20–30, 38–51'), cite('averroes-butterworth', 'standard-division', 'Discussion of §§15–16, 29, 48, and 51')]],
      [['ghazali-response'], [cite('averroes-incoherence', 'work', 'Responses to al-Ghazali’s twenty discussions'), cite('averroes-sep', 'section', '§§5–6')]],
      [['intellect'], [cite('averroes-de-anima', 'standard-division', 'Book III, commentaries 5 and 17–18'), cite('averroes-sep', 'section', '§4'), cite('averroes-taylor-cambridge', 'page', 'pp. 180–200')]],
      [['law-politics'], [cite('averroes-decisive', 'standard-division', '§§1–16 and 38–51'), cite('averroes-sep', 'section', '§§6–7')]],
      [['latin-legacy'], [cite('averroes-sep', 'section', '§9'), cite('averroes-taylor-cambridge', 'page', 'pp. 194–200')]],
      [['misunderstandings', 'reading-strategy'], [cite('averroes-decisive', 'standard-division', '§§1–51'), cite('averroes-de-anima', 'standard-division', 'Book III'), cite('averroes-sep', 'section', '§§1–9')]],
    ]),
    evidence: evidence(
      [cite('averroes-sep', 'section', '§§1–9')],
      [cite('averroes-sep', 'section', '§1')],
      [cite('averroes-decisive', 'standard-division', '§§1–51'), cite('averroes-de-anima', 'standard-division', 'Book III')],
      [cite('averroes-decisive', 'standard-division', '§§1–51'), cite('averroes-de-anima', 'standard-division', 'Book III, commentaries 5 and 17–18'), cite('averroes-incoherence', 'work', 'Whole work')],
      [cite('averroes-sep', 'section', '§9'), cite('averroes-taylor-cambridge', 'page', 'pp. 194–200')],
      [cite('averroes-sep', 'section', '§§1–9'), cite('averroes-butterworth', 'standard-division', 'Discussion of §§15–16, 29, 48, and 51')],
      [cite('averroes-decisive', 'standard-division', '§§1–51'), cite('averroes-de-anima', 'standard-division', 'Book III')],
    ),
    patch: {
      dateDisplay: '1126–1198 CE',
      dateConfidence: 'high',
      dateNote: 'The conventional lifespan is secure; the identities of some teachers, the motive for his temporary exile, and the chronology of revised commentaries remain uncertain.',
      region: 'Cordoba, Seville, and Marrakesh',
      contributionSummary: 'Joined jurisprudence, medicine, and philosophical commentary while defending demonstrative inquiry under revealed law and generating distinct Arabic, Hebrew, and Latin receptions.',
      mainIdeas: ['Demonstration and revealed law', 'Interpretation and audience', 'Aristotelian commentary', 'Material and agent intellect', 'Causality and natural philosophy'],
      keyWorks: ['Decisive Treatise', 'Long Commentary on Aristotle’s De Anima', 'Incoherence of the Incoherence', 'Kulliyyat in Medicine', 'Commentary or Paraphrase on Plato’s Republic'],
      controversiesOrInterpretiveTensions: ['The short/middle/long commentary taxonomy is a useful modern orientation but does not exhaust a revised and varied corpus.', 'His mature intellect theory differs from earlier stages and should not be reduced to “one shared mind.”', '“Latin Averroism” and double-truth accusations belong to contested reception rather than transparently naming Ibn Rushd’s doctrine.'],
      commonMisunderstandings: ['Averroes does not defend two contradictory truths; the Decisive Treatise says truth does not oppose truth.', 'His criticism of Avicenna does not make his philosophy wholly independent of Avicennian problems.'],
    },
    paragraphTextPatches: {
      'commentary-project': {
        0: 'Modern scholars often orient Averroes’s Aristotelian corpus through short, middle, and long commentaries, but that threefold taxonomy is not a universal authorial scheme. Compendia, questions, independent treatises, revisions, and difficult chronological relations complicate it. The labels remain useful only when they identify a specific work and stage rather than one fixed method applied uniformly.',
      },
      intellect: {
        0: 'Averroes’s account of intellect developed across several engagements with Aristotle’s De Anima. In the mature Long Commentary, the material intellect and agent intellect are separate and one for humankind, while individual embodied people contribute changing images and dispositions to acts of understanding. Earlier short and middle treatments differ, so “everyone shares one mind” is an inadequate summary.',
        1: 'Latin critics including Aquinas treated the mature position as a threat to individual intellectual agency and personal immortality, but later “Averroism” was never a transparent copy of Ibn Rushd. The philosophical problem is how universal intelligibles can be known through particular embodied imaginations; the historical problem is how changing Arabic works were translated, selected, and reorganized in Hebrew and Latin debates.',
      },
      'scripture-interpretation': {
        1: 'This position is not a doctrine of “double truth.” The Decisive Treatise insists that truth does not oppose truth: a sound demonstration and revealed Law cannot ultimately contradict. Apparent conflict calls for disciplined interpretation by qualified readers, while later Latin controversies and condemnations created reception categories that must not be projected backward as Ibn Rushd’s own theory.',
      },
    },
  },

  'mulla-sadra': {
    reviewedOn,
    reviewLock: 'fnv1a64:1f4696bc4533b7c7',
    reviewNotePath: 'docs/editorial/reviews/mulla-sadra.md',
    sources: [
      primary('sadra-penetrations', ['Mulla Sadra'], 'Metaphysical Penetrations: A Parallel English-Arabic Text', 'https://press.uchicago.edu/ucp/books/book/distributed/M/bo16881535.html', 'Seyyed Hossein Nasr', 'Brigham Young University Press', 2014),
      primary('sadra-throne', ['Mulla Sadra'], 'The Wisdom of the Throne', 'https://search.worldcat.org/title/7276852', 'James W. Morris', 'Princeton University Press', 1981),
      sep('sadra-sep', ['Sajjad H. Rizvi'], 'Mulla Sadra', 'https://plato.stanford.edu/entries/mulla-sadra/'),
      book('sadra-kalin', ['Ibrahim Kalin'], 'Mulla Sadra', 'Oxford University Press', 2014, 'https://academic.oup.com/book/4081', '10.1093/acprof:oso/9780199451173.001.0001'),
      book('sadra-rizvi-metaphysics', ['Sajjad H. Rizvi'], 'Mulla Sadra and Metaphysics: Modulation of Being', 'Routledge', 2009, 'https://www.routledge.com/Mulla-Sadra-and-Metaphysics-Modulation-of-Being/Rizvi/p/book/9780415490733'),
      journal('sadra-rizvi-cambridge', ['Sajjad H. Rizvi'], 'Mysticism and Philosophy: Ibn Arabi and Mulla Sadra', 'The Cambridge Companion to Arabic Philosophy', 2005, 'https://www.cambridge.org/core/books/cambridge-companion-to-arabic-philosophy/BB1B390ECB024E88FC807FF471EE80EB'),
    ],
    sectionCitations: sectionMap([
      [['overview', 'synthesis-method'], [cite('sadra-penetrations', 'standard-division', 'Opening and Penetrations 1–8'), cite('sadra-sep', 'section', '§§2–5'), cite('sadra-rizvi-cambridge', 'page', 'pp. 224–246')]],
      [['safavid-setting', 'reception-controversy'], [cite('sadra-sep', 'section', '§§1 and 6'), cite('sadra-kalin', 'chapter', 'Chs. 1–2'), cite('sadra-rizvi-metaphysics', 'chapter', 'Chs. 1–2')]],
      [['works-development'], [cite('sadra-sep', 'section', '§1.2'), cite('sadra-penetrations', 'standard-division', 'Opening and Penetrations 1–8'), cite('sadra-throne', 'standard-division', 'First–Third Orients')]],
      [['primacy-existence', 'gradation-unity', 'divine-causality'], [cite('sadra-penetrations', 'standard-division', 'Penetrations 1–8'), cite('sadra-sep', 'section', '§§3.1–3.4'), cite('sadra-rizvi-metaphysics', 'chapter', 'Chs. 3–6')]],
      [['substantial-motion', 'soul-development'], [cite('sadra-sep', 'section', '§§3–4'), cite('sadra-kalin', 'chapter', 'Chs. 3–5')]],
      [['knowledge-presence'], [cite('sadra-sep', 'section', '§§4.3–4.5'), cite('sadra-rizvi-cambridge', 'page', 'pp. 224–246')]],
      [['imagination-resurrection'], [cite('sadra-throne', 'standard-division', 'Second–Third Orients'), cite('sadra-sep', 'section', '§§5.1–5.2'), cite('sadra-kalin', 'chapter', 'Chs. 4–5')]],
      [['misunderstandings-reading'], [cite('sadra-penetrations', 'standard-division', 'Opening and Penetrations 1–8'), cite('sadra-sep', 'section', '§§1–6'), cite('sadra-kalin', 'chapter', 'Chs. 1–5')]],
    ]),
    evidence: evidence(
      [cite('sadra-sep', 'section', '§§1–6')],
      [cite('sadra-sep', 'section', '§1.1')],
      [cite('sadra-penetrations', 'standard-division', 'Penetrations 1–8'), cite('sadra-sep', 'section', '§§3–5')],
      [cite('sadra-penetrations', 'standard-division', 'Opening and Penetrations 1–8'), cite('sadra-throne', 'standard-division', 'First–Third Orients')],
      [cite('sadra-sep', 'section', '§6'), cite('sadra-rizvi-metaphysics', 'chapter', 'Chs. 1–2')],
      [cite('sadra-sep', 'section', '§§1–6'), cite('sadra-rizvi-metaphysics', 'chapter', 'Chs. 3–6')],
      [cite('sadra-penetrations', 'standard-division', 'Opening and Penetrations 1–8'), cite('sadra-throne', 'standard-division', 'First–Third Orients')],
    ),
    patch: {
      lifespan: 'c. 1571/72–1635/36 (traditional 1640/41)',
      dateDisplay: 'c. 1571/72–1635/36 CE; traditional death date 1640/41',
      dateConfidence: 'low',
      dateNote: 'Mulla Sadra’s birth is approximate. His grandson and two paratexts support 1635/36, while 1640/41 remains the traditional death date without equally clear evidence.',
      region: 'Safavid Iran',
      tradition: 'Twelver Shii and post-Avicennian Islamic philosophy',
      contributionSummary: 'Transformed Avicennian, Illuminationist, mystical, theological, and scriptural arguments around the primacy and gradation of existence, substantial motion, knowledge, soul, and return.',
      mainIdeas: ['Primacy of existence', 'Gradation or modulation of being', 'Substantial motion', 'Knowledge by presence', 'Soul as bodily in origination and spiritual in survival', 'Imaginal bodily resurrection'],
      keyWorks: ['The Four Journeys', 'Metaphysical Penetrations', 'The Wisdom of the Throne', 'Commentary on the Principles of al-Kafi'],
      controversiesOrInterpretiveTensions: ['His death date, Kahak withdrawal, and teacher relationships require qualified evidence.', 'The later “School of Isfahan” label should not be treated as his self-declared institution.', 'Unity and plurality of being, the scope of substantial motion, and the adequacy of imaginal bodily resurrection remain disputed.'],
      commonMisunderstandings: ['His synthesis transforms its sources and does not harmonize them without remainder.', 'Substantial motion concerns material substance in his natural philosophy, not modern particle motion or the slogan that everything is vaguely unstable.'],
    },
    paragraphTextPatches: {
      'safavid-setting': {
        0: 'Mulla Sadra studied and taught in Safavid philosophical networks later grouped under the historiographic label “School of Isfahan”; it was not a self-declared institution. Evidence connects him with Mir Damad and Shaykh Baha’i, although no formal teaching authorization survives. His remembered withdrawal at Kahak was probably real, but persecution, voluntary discipline, patronage disappointment, and later conversion-style narrative cannot be cleanly separated.',
      },
      'primacy-existence': {
        0: 'Mulla Sadra makes existence primary in metaphysical analysis, while quiddities mark determinate ways in which reality is understood. This should not be told as a simple reversal in which Suhrawardi and every earlier philosopher uniformly taught “primacy of essence.” The historiography is schematic, and Sadra’s own development and use of Avicennian and Illuminationist vocabulary must be followed work by work.',
      },
      'reception-controversy': {
        0: 'Sadrian philosophy became especially prominent in parts of Shi‘i seminary education from the early nineteenth century and also traveled through South Asian intellectual networks. That reception was neither immediate nor universal. Later commentators selected, systematized, defended, and criticized different aspects of his work rather than inheriting one uncontested synthesis.',
      },
    },
  },
};

export const applyMedievalConnectedWorldsIslamicEditorial = (record: Philosopher): Philosopher =>
  applyConnectedWorldsPhilosopherConfig(record, configs[record.id]);
