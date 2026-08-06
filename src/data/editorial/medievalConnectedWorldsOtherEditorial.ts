import type {Branch, CitationReference, EditorialSource, Philosopher} from '../../types/philosophy';
import {
  applyConnectedWorldsBranchConfig,
  applyConnectedWorldsPhilosopherConfig,
  type ConnectedWorldsBranchConfig,
  type ConnectedWorldsEvidence,
  type ConnectedWorldsPhilosopherConfig,
} from './medievalConnectedWorldsEditorialHelpers';

const reviewedOn = '2026-08-05';
const reviewLocks: Record<string, string> = {
  'saadia-gaon': 'fnv1a64:1471b3f908bb1d59',
  'judah-halevi': 'fnv1a64:806cc9a455c9fd18',
  maimonides: 'fnv1a64:e979683d643ff242',
  augustine: 'fnv1a64:f30de6a64c90d6a5',
  boethius: 'fnv1a64:bc73e56af6834d5e',
  anselm: 'fnv1a64:1fcc4f8a06f9e92c',
  aquinas: 'fnv1a64:474f45751f61787c',
  'duns-scotus': 'fnv1a64:3239e7033c4924a6',
  ockham: 'fnv1a64:f40b27f0dfeef82a',
  'medieval-scholasticism': 'fnv1a64:b9c8c0af2cc205ee',
  'philosophy-of-religion': 'fnv1a64:7ea729df6133439e',
};
const ref = (sourceId: string, value: string): CitationReference => ({sourceId, locator: {kind: 'work', value}});
const primary = (id: string, authors: string[], title: string, url: string): EditorialSource => ({id, type: 'primary-text', authors, title, url, accessedOn: reviewedOn});
const reference = (id: string, authors: string[], title: string, containerTitle: string, publisher: string, url: string): EditorialSource => ({id, type: 'scholarly-reference', authors, title, containerTitle, publisher, url, accessedOn: reviewedOn});
const book = (id: string, authors: string[], title: string, publisher: string, year: number, url: string, doi?: string): EditorialSource => ({id, type: 'scholarly-book', authors, title, publisher, year, url, doi, accessedOn: reviewedOn});
const evidence = (citations: CitationReference[]): ConnectedWorldsEvidence => ({classification: citations, chronology: citations, concepts: citations, works: citations, relationships: citations, disputes: citations, reading: citations});
const profile = (
  id: string,
  sources: EditorialSource[],
  citations: CitationReference[],
  patch: ConnectedWorldsPhilosopherConfig['patch'] = {},
  paragraphTextPatches: ConnectedWorldsPhilosopherConfig['paragraphTextPatches'] = {},
): ConnectedWorldsPhilosopherConfig => ({sources, sectionCitations: {'*': citations}, evidence: evidence(citations), reviewNotePath: `docs/editorial/reviews/${id}.md`, reviewLock: reviewLocks[id], patch, paragraphTextPatches});
const branch = (
  id: string,
  sources: EditorialSource[],
  citations: CitationReference[],
  patch: ConnectedWorldsBranchConfig['patch'] = {},
  paragraphTextPatches: ConnectedWorldsBranchConfig['paragraphTextPatches'] = {},
): ConnectedWorldsBranchConfig => ({sources, sectionCitations: {'*': citations}, evidence: evidence(citations), reviewNotePath: `docs/editorial/reviews/${id}.md`, reviewLock: reviewLocks[id], patch, paragraphTextPatches});

const philosopherConfigs: Record<string, ConnectedWorldsPhilosopherConfig> = {
  'saadia-gaon': profile('saadia-gaon', [
    primary('saa-primary', ['Saadia Gaon'], 'The Book of Beliefs and Opinions', 'https://archive.org/details/kitbalamnt00saaduoft'),
    reference('saa-sep', ['Robert Brody', 'Sarah Stroumsa'], 'Saadya [Saadiah]', 'Stanford Encyclopedia of Philosophy', 'Metaphysics Research Lab, Stanford University', 'https://plato.stanford.edu/entries/saadya/'),
    book('saa-cambridge', ['Robert Brody'], 'Saʿadyah the Philosopher', 'Cambridge University Press', 2013, 'https://www.cambridge.org/core/books/abs/saadyah-gaon/saadyah-the-philosopher/3E5B663BE33867BCDE964BF74C8B7DB6'),
  ], [ref('saa-primary', 'Introduction; treatises I–III and VI–IX'), ref('saa-sep', 'sections 1–9'), ref('saa-cambridge', 'chapter 3')], {
    contributionSummary: 'A Gaon, exegete, translator, and kalām theologian who organized sense, reason, inference, and reliable tradition within a Jewish account of creation, law, and redemption.',
  }, {
    'ways-of-knowing': {0: 'Saadia distinguishes four connected sources of knowledge: sense perception, necessary or first rational knowledge, inferential knowledge, and reliable report or tradition. Report is not sheer deference in this account: its warrant is connected with public signs, transmission, and coherence with the other sources.'},
    'law-and-commandment': {0: 'Saadia distinguishes rational commandments, whose goodness or badness reason can apprehend, from “heard” or revealed commandments, whose specific form is known through revelation. Both are divine gifts connected with action, discipline, and reward; proposed utilities for particular rituals should be attributed rather than universalized.'},
    'soul-and-afterlife': {0: 'Saadia describes one created soul with distinguishable appetitive, spirited, and rational functions, joined to the body for embodied moral action and ultimately reunited with it at resurrection. His account also uses an obsolete cosmology and physiology that should be presented historically, not naturalized.'},
  }),
  'judah-halevi': profile('judah-halevi', [
    primary('hal-primary', ['Judah Halevi'], 'The Kuzari', 'https://archive.org/details/judahhalleviskit00judauoft'),
    reference('hal-sep', ['Ehud Krinis'], 'Judah Halevi', 'Stanford Encyclopedia of Philosophy', 'Metaphysics Research Lab, Stanford University', 'https://plato.stanford.edu/entries/halevi/'),
    book('hal-cambridge', ['Barry S. Kogan'], 'Judah Halevi and his use of philosophy in the Kuzari', 'Cambridge University Press', 2003, 'https://doi.org/10.1017/CCOL0521652073.006', '10.1017/CCOL0521652073.006'),
  ], [ref('hal-primary', 'I.1–25, 67, 89, 95; II.9–80; IV.3–16; V.12–28'), ref('hal-sep', 'sections 1–8, revised 2026-07-30'), ref('hal-cambridge', 'chapter 6')], {
    dateDisplay: 'born probably in the 1070s or 1080s; died 1141',
    dateConfidence: 'low',
    dateNote: 'Documents show Halevi sailing from Alexandria in May 1141. Current scholarship infers arrival and death in the Land of Israel that summer, but direct documentation of arrival is absent and the Jerusalem-gate legend is unsupported.',
    contributionSummary: 'A Hebrew poet, physician, and Judeo-Arabic thinker who used dialogue and selective skepticism to defend prophecy, concurrent tradition, and commanded practice against philosophical overreach.',
  }, {
    'history-testimony': {0: 'Halevi appeals to concurrent or mass-transmitted tradition—Arabic tawātur—rather than to an undifferentiated collective memory. In the Kuzari, public national revelation and convergent transmission are offered as warrants; the force of that argument remains contestable.'},
    'reason-science-influence': {0: 'Halevi is philosophically learned and uses skeptical arguments selectively. Reason remains valid in demonstrable domains and useful in testing pretensions, but the distinctive certainty of revelation and commandments rests for him on sensory signs, concurrent tradition, and prophecy rather than philosophical demonstration.'},
    'divine-thing-prophecy': {0: 'The Arabic al-amr al-ilāhī has no single uncontested modern equivalent. It can name divine presence, influence or efficacy, and a supra-human prophetic aptitude; the text’s hierarchical and quasi-biological imagery should be retained and ethically interrogated rather than sanitized.'},
  }),
  maimonides: profile('maimonides', [
    primary('mai-primary', ['Moses Maimonides'], 'The Guide for the Perplexed', 'https://archive.org/details/guideforperplexe00maimiala'),
    reference('mai-sep', ['Kenneth Seeskin'], 'Maimonides', 'Stanford Encyclopedia of Philosophy', 'Metaphysics Research Lab, Stanford University', 'https://plato.stanford.edu/entries/maimonides/'),
    book('mai-htr', ['Roslyn Weiss'], 'Maimonides on Perfecting Perfection', 'Cambridge University Press', 2017, 'https://doi.org/10.1017/S0017816017000141', '10.1017/S0017816017000141'),
  ], [ref('mai-primary', 'Introduction; I.50–60; II.13–48; III.17–54'), ref('mai-sep', 'sections 1–8'), ref('mai-htr', 'Guide III.51–54 discussion')], {
    contributionSummary: 'Reworked Jewish law and scriptural interpretation through Aristotelian and Arabic philosophical traditions while preserving limits, tensions, and pedagogical concealment rather than producing a frictionless reconciliation.',
  }, {
    overview: {0: 'Maimonides reworked Jewish law and scriptural interpretation through Aristotelian and Arabic philosophical traditions while preserving limits, tensions, and pedagogical concealment rather than producing a frictionless reconciliation.'},
    prophecy: {0: 'In Guide II.32 Maimonides surveys three views of prophecy. His own account links prophecy to intellectual perfection, imaginative perfection, moral preparation, and divine will; it neither reduces prophecy to an automatic natural achievement nor makes preparation irrelevant.'},
  }),
  augustine: profile('augustine', [
    primary('aug-primary', ['Augustine of Hippo'], 'Confessions', 'https://www.gutenberg.org/ebooks/3296'),
    reference('aug-sep', ['Christian Tornau'], 'Saint Augustine', 'Stanford Encyclopedia of Philosophy', 'Metaphysics Research Lab, Stanford University', 'https://plato.stanford.edu/entries/augustine/'),
    book('aug-oup', ['Peter Brown'], 'Augustine of Hippo: A Biography', 'University of California Press', 2000, 'https://www.ucpress.edu/book/9780520227576/augustine-of-hippo'),
  ], [ref('aug-primary', 'Confessions II, VII–VIII, X–XI; City of God XIV and XIX'), ref('aug-sep', 'sections 1–10'), ref('aug-oup', 'revised edition')], {
    contributionSummary: 'Reworked Christian doctrine through sustained arguments about will, memory, time, signs, evil, grace, and political community.',
  }, {
    'intellectual-journey': {1: 'Augustine describes stealing pears without need or gain, but distributes the motive among delight in transgression, distorted imitation of freedom, and the social pull of companionship. The episode is an inquiry, not a one-line diagnosis.'},
    'will-grace-freedom': {1: 'Augustine’s account developed: early anti-Manichaean works defend voluntary responsibility, while later anti-Pelagian works increasingly stress prevenient and healing grace. Scholars dispute how continuous that development is.'},
    'scripture-philosophy': {1: 'The “books of the Platonists” were likely Latin translations associated with Marius Victorinus, probably including Plotinus and possibly Porphyry; the exact corpus remains uncertain. Augustine transforms this inheritance inside a Christian scriptural and theological project.'},
  }),
  boethius: profile('boethius', [
    primary('boe-primary', ['Anicius Manlius Severinus Boethius'], 'The Consolation of Philosophy', 'https://www.gutenberg.org/ebooks/14328'),
    reference('boe-sep', ['John Marenbon'], 'Anicius Manlius Severinus Boethius', 'Stanford Encyclopedia of Philosophy', 'Metaphysics Research Lab, Stanford University', 'https://plato.stanford.edu/entries/boethius/'),
    book('boe-cambridge', ['John Marenbon'], 'The Cambridge Companion to Boethius', 'Cambridge University Press', 2009, 'https://www.cambridge.org/core/books/cambridge-companion-to-boethius/3D3CB22C66D6F34C0FDBA685BE05133B'),
  ], [ref('boe-primary', 'books I–V'), ref('boe-sep', 'sections 1–6'), ref('boe-cambridge', 'life, logic, theology, music, and reception chapters')], {
    dateDisplay: 'c. 475/480–525/526 CE', dateConfidence: 'medium', dateNote: 'The birth and execution years remain uncertain; numeric plotting is approximate.',
    contributionSummary: 'A late Roman logician and theologian whose translations, commentaries, and Consolation profoundly shaped medieval Latin philosophy.',
  }, {
    overview: {0: 'Boethius was a late Roman logician, theologian, statesman, and author of the Consolation. The retrospective phrase “last Roman and first scholastic” describes a reception bridge, not membership in a later Scholastic school.'},
    'historical-context': {0: 'After accusations that included conspiracy or treason in the hostile political setting of Theoderic’s court, Boethius was imprisoned and executed, probably in 525 or 526. He presents the Consolation as written in confinement; details and chronology are imperfectly recoverable.'},
    'fortune-happiness': {0: 'Wealth, office, fame, and pleasure are unstable and cannot constitute the highest good. That does not make every external or relational good worthless: some retain genuine but non-final value.'},
  }),
  anselm: profile('anselm', [
    primary('ans-primary', ['Anselm of Canterbury'], 'Proslogion and Monologion', 'https://sourcebooks.fordham.edu/basis/anselm-proslogium.asp'),
    reference('ans-sep', ['Thomas Williams'], 'Saint Anselm', 'Stanford Encyclopedia of Philosophy', 'Metaphysics Research Lab, Stanford University', 'https://plato.stanford.edu/entries/anselm/'),
    book('ans-cambridge', ['Brian Davies', 'Brian Leftow'], 'The Cambridge Companion to Anselm', 'Cambridge University Press', 2004, 'https://www.cambridge.org/core/books/cambridge-companion-to-anselm/90D93CB2E8DF06160BF45FA030935B16'),
  ], [ref('ans-primary', 'Monologion Prologue and 1–4; Proslogion Proemium and 2–3'), ref('ans-sep', 'sections 1–5'), ref('ans-cambridge', 'reason, freedom, and atonement chapters')], {
    contributionSummary: 'A monastic theologian who joined prayerful faith with reasoned inquiry into God, truth, freedom, foreknowledge, and redemption.',
  }, {
    'faith-reason': {0: 'Anselm does not suspend faith to reason from a neutral standpoint: inquiry is an activity of believing love. Yet the Monologion deliberately seeks reason-alone arguments that a nonbeliever could assess, so the project is neither mere confession nor restricted to insiders.'},
    'proslogion-argument': {0: 'The Proslogion argument—a later tradition calls it the ontological argument—concerns “that than which nothing greater can be thought.” Chapter 2’s move from understanding to reality must be distinguished from chapter 3’s claim that divine nonexistence cannot be thought.'},
    'gaunilo-reply': {0: 'Gaunilo’s parody invokes a lost island alleged to be more excellent and abundant than all others; it does not use the later stock phrase “greatest conceivable island.” Anselm replies that his reasoning uniquely concerns the being whose nonexistence cannot be thought, but the reply’s success remains disputed.'},
    'cur-deus-homo': {1: 'Cur Deus Homo uses honor, debt, satisfaction, order, and fittingness within scriptural, patristic, penitential, monastic, legal, and contemporary social vocabularies. Scholarship disputes reduction to feudalism, and Anselm should not be made to teach later penal-substitution theories.'},
  }),
  aquinas: profile('aquinas', [
    primary('aquinas-primary', ['Thomas Aquinas'], 'Summa theologiae', 'https://www.newadvent.org/summa/'),
    reference('aquinas-sep', ['John Finnis'], 'Aquinas', 'Stanford Encyclopedia of Philosophy', 'Metaphysics Research Lab, Stanford University', 'https://plato.stanford.edu/archives/fall2024/entries/aquinas/'),
    reference('aquinas-iep', ['Shawn Floyd'], 'Thomas Aquinas', 'Internet Encyclopedia of Philosophy', 'Internet Encyclopedia of Philosophy', 'https://iep.utm.edu/thomas-aquinas/'),
  ], [ref('aquinas-primary', 'ST I qq. 1–2, 13, 75, 84; I–II qq. 94, 96'), ref('aquinas-sep', 'all sections'), ref('aquinas-iep', 'life, metaphysics, natural theology, ethics, and politics')], {
    dateDisplay: '1224/25–1274', dateConfidence: 'medium', dateNote: 'The birth year is conventionally given as 1224 or 1225; death in 1274 is secure.',
    contributionSummary: 'A Dominican theologian and philosopher who transformed Aristotelian, Christian, Islamic, and Jewish inheritances in contested accounts of being, knowledge, God, action, law, and beatitude.',
  }, {
    'being-metaphysics': {0: 'In On Being and Essence and related works, Aquinas asks how a created substance’s essence—what it is—relates to its act of being. Created substances do not exist through their essences alone: their being is received and limited according to what they are. God, by contrast, is not one participant in being but subsistent being itself. Interpreters disagree over how best to describe the essence–existence composition and over how uniformly it applies across Aquinas’s corpus.'},
    'five-ways': {
      0: 'The Five Ways occupy one article near the beginning of the Summa theologiae’s treatment of God. Aquinas first argues that God’s existence is not self-evident to us but may be demonstrated from effects better known to us. The five compressed routes begin from change, ordered efficient causation, possibility and necessity, gradations of being and goodness, and goal-directed natural activity; they are neither experiments in physics nor appeals to gaps in science.',
      1: 'The Ways do not by themselves establish every attribute of the Christian God. Aquinas’s subsequent questions argue from a first source to divine predicates. The first two especially concern causal series whose present derivative activity requires a first cause, not merely a first event in a distant temporal sequence. The Third and Fourth remain especially disputed, and the Fifth concerns regular end-directed natural activity rather than biological complexity alone.'},
    'ethics-law-politics': {0: 'Aquinas’s ethics joins action toward perceived goods, habits and virtues, law, grace, and beatitude. Natural law is the rational creature’s participation in eternal law, and its first practical principle directs agents to pursue good and avoid evil. Further precepts are ordered through characteristic inclinations, not a modern checklist of self-evident policies; practical reasoning and virtue remain indispensable.'},
    'analogy-divine-language': {0: 'Aquinas approaches divine language through connected distinctions rather than one detachable formula. Human names arise from knowledge of creatures and do not express God’s essence as it is in itself. Yet names such as good and wise can signify perfections substantially of God: they are neither predicated in exactly the same mode nor wholly equivocal.'},
  }),
  'duns-scotus': profile('duns-scotus', [
    primary('scotus-primary', ['John Duns Scotus'], 'Ordinatio translation index', 'https://www.aristotelophile.com/current.htm'),
    reference('scotus-sep', ['Thomas Williams'], 'John Duns Scotus', 'Stanford Encyclopedia of Philosophy', 'Metaphysics Research Lab, Stanford University', 'https://plato.stanford.edu/entries/duns-scotus/'),
    book('scotus-cambridge', ['Stephen D. Dumont'], 'John Duns Scotus’s Life in Context', 'Cambridge University Press', 2018, 'https://www.cambridge.org/core/books/abs/interpreting-duns-scotus/john-duns-scotuss-life-in-context/0A1DA9B237464A8A33DF613C220CA316', '10.1017/9781108328975.002'),
  ], [ref('scotus-primary', 'Ordinatio I d. 3; II dd. 1–3'), ref('scotus-sep', 'sections 1–6'), ref('scotus-cambridge', 'chapter 1')], {
    dateDisplay: 'c. 1263/64–1308', dateConfidence: 'medium', dateNote: 'Recent chronology favors a birth around 1263/64; 1265/66 remains common in older reference works.',
  }, {
    univocity: {0: 'Scotus argues that a concept of being must be univocal enough to serve valid inference about God and creatures. Being is not thereby a genus containing God and creatures; infinite and finite are intrinsic modes, not species arranged on one scale.'},
    'will-freedom': {0: 'Scotus gives the will a rational power for opposite acts and distinguishes affection for advantage from affection for justice. This does not make free choice arbitrary: intellect, reasons, ends, and moral law remain relevant even where they do not necessitate the will.'},
  }),
  ockham: profile('ockham', [
    primary('ock-primary', ['William of Ockham'], 'Summa logicae I.64', 'https://www.logicmuseum.com/wiki/Authors/Ockham/Summa_Logicae/Book_I/Chapter_64'),
    reference('ock-sep', ['Paul Vincent Spade', 'Claude Panaccio'], 'William of Ockham', 'Stanford Encyclopedia of Philosophy', 'Metaphysics Research Lab, Stanford University', 'https://plato.stanford.edu/entries/ockham/'),
    reference('ock-iep', ['Alfred J. Freddoso'], 'William of Ockham', 'Internet Encyclopedia of Philosophy', 'Internet Encyclopedia of Philosophy', 'https://iep.utm.edu/ockham/'),
  ], [ref('ock-primary', 'Summa logicae I.64 and related semantic divisions'), ref('ock-sep', 'sections 1–9'), ref('ock-iep', 'logic, metaphysics, epistemology, and politics')], {}, {
    overview: {0: 'William of Ockham wrote across logic, metaphysics, natural philosophy, theology, ethics, and politics. The later slogan of “Ockham’s razor” is one doorway into this work, but it should not replace the specific semantic, ontological, cognitive, theological, and political arguments.'},
    razor: {0: 'The famous maxim “entities must not be multiplied beyond necessity” is not found in that wording in Ockham. His economy principles operate with grounds that include self-evident premises, experience, and infallible Scripture; he does not reject universals simply by invoking a razor.'},
    nominalism: {0: 'Ockham’s nominalism needs scope: created reality is analyzed through singular substances and qualities, while universal concepts are singular mental acts or qualities predicable of many. Real similarity does not require a common extra-mental universal thing.'},
    'knowledge-intuition': {0: 'Intuitive cognition enables evident existential judgments in normal conditions; abstractive cognition abstracts from whether an object exists or does not exist, not merely from particulars to universals. Ockham’s extraordinary divine-power cases do not amount to global skepticism.'},
  }),
};

const branchConfigs: Record<string, ConnectedWorldsBranchConfig> = {
  'medieval-scholasticism': branch('medieval-scholasticism', [
    primary('sch-primary', ['Peter Abelard'], 'Sic et Non, Prologue', 'https://sourcebooks.fordham.edu/source/1120abelard.asp'),
    reference('sch-sep', ['John Marenbon'], 'Medieval Philosophy', 'Stanford Encyclopedia of Philosophy', 'Metaphysics Research Lab, Stanford University', 'https://plato.stanford.edu/entries/medieval-philosophy/'),
    book('sch-cambridge', ['Gad Freudenthal'], 'Science in Medieval Jewish Cultures', 'Cambridge University Press', 2011, 'https://www.cambridge.org/core/books/science-in-medieval-jewish-cultures/9869D8BEDFECF0360EBC99DF29175B1D'),
  ], [ref('sch-primary', 'Prologue'), ref('sch-sep', 'institutional, textual, and doctrinal sections'), ref('sch-cambridge', 'translation and connected-tradition chapters')], {
    shortDefinition: 'A plural family of medieval teaching, commentary, question, and disputation practices centered especially in Latin schools and universities, connected to but not identical with Islamic, Jewish, and Byzantine philosophical traditions.',
    oneSentencePurpose: 'Tests inherited authorities and new arguments through commentary, questions, objections, replies, and determinations across several medieval institutions and disciplines.',
  }, {
    overview: {0: 'Medieval Scholasticism names a plural family of teaching, commentary, question, and disputation practices, not a single doctrine or universal method. Its primary institutional scope is Latin schools, universities, and religious studia, while its arguments developed through uneven connections with Islamic, Jewish, and Byzantine authors and translators.'},
    'historical-development': {0: 'Late-antique, monastic, and cathedral-school practices were precursors to the university forms that emerged from the twelfth century. Translation from Greek and Arabic through several Mediterranean centers supplied texts that Latin scholars selected, transformed, and contested rather than passively “recovering.”'},
    'figures-works': {0: 'Scholastic philosophy does not form one Aquinas-centered procession. Abelard, Peter Lombard, Albert, Bonaventure, Aquinas, Henry of Ghent, Scotus, Ockham, Buridan, and later authors pursued rival projects; Avicenna, Averroes, Maimonides, Byzantine interlocutors, and translators were intellectual agents rather than anonymous source reservoirs.'},
  }),
  'philosophy-of-religion': branch('philosophy-of-religion', [
    primary('por-primary', ['David Hume'], 'Dialogues Concerning Natural Religion', 'https://www.gutenberg.org/ebooks/4583'),
    reference('por-sep', ['Charles Taliaferro'], 'Philosophy of Religion', 'Stanford Encyclopedia of Philosophy', 'Metaphysics Research Lab, Stanford University', 'https://plato.stanford.edu/archives/spr2025/entries/philosophy-religion/'),
    reference('por-iep', ['James Fieser'], 'Philosophy of Religion', 'Internet Encyclopedia of Philosophy', 'Internet Encyclopedia of Philosophy', 'https://iep.utm.edu/religion/'),
  ], [ref('por-primary', 'parts II, V, X–XI'), ref('por-sep', 'all sections'), ref('por-iep', 'arguments, experience, evil, and religious language')], {
    shortDefinition: 'Examines contested claims, practices, experiences, and categories concerning gods, ultimacy, liberation, revelation, suffering, and religious life across multiple traditions.',
    oneSentencePurpose: 'Tests how religious claims and practices can be interpreted, justified, criticized, compared, or transformed without treating one tradition’s categories as universal.',
  }, {
    overview: {0: 'Philosophy of religion examines a contested family of claims, practices, experiences, and categories concerning gods, ultimacy, liberation, revelation, suffering, and religious life. Its methods include argument, interpretation, phenomenology, genealogy, and comparison; no single definition of religion or the sacred is neutral.'},
    'historical-development': {2: 'Modern academic philosophy of religion often narrowed around Christian theism and its critics. Efforts to broaden its canons, methods, and categories are active disciplinary proposals rather than an already completed consensus.'},
    'key-concepts': {0: 'Classical theism is one family of views. Divinity, gods, ultimacy, liberation, emptiness, ritual, and ancestral or cosmic order should not be forced into one universal typology before comparison begins.'},
    'internal-debates': {1: 'Evidentialism, properly basic belief, testimony and tradition, fideist or existential critiques, and religious disagreement frame different epistemic questions. Ways of individuating traditions and disagreements are contested and theory-laden.'},
  }),
};

export const applyMedievalConnectedWorldsOtherPhilosopherEditorial = (record: Philosopher): Philosopher =>
  applyConnectedWorldsPhilosopherConfig(record, philosopherConfigs[record.id]);

export const applyMedievalConnectedWorldsBranchEditorial = (record: Branch): Branch =>
  applyConnectedWorldsBranchConfig(record, branchConfigs[record.id]);
