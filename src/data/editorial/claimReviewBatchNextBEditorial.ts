import type {
  ArticleSection,
  CitationReference,
  EditorialSource,
  Philosopher,
} from '../../types/philosophy';
import {citation as c} from './pilotHelpers';
import {
  applyModernClusterEditorialConfig,
  type ModernClusterEditorialConfig,
} from './modernClusterEditorialHelpers';

// This is an intentionally isolated review module. The batch integrator owns its
// registration, generated review notes, and replacement of the literal lock values.
const q = (sourceId: string, kind: Parameters<typeof c>[1], value: string, note?: string) =>
  c(sourceId, kind, value, note);
const reviewedOn = '2026-08-10';
const all = (ids: string[], citations: CitationReference[]): Record<string, CitationReference[]> =>
  Object.fromEntries(ids.map((id) => [id, citations]));

const cleanthesSources: EditorialSource[] = [
  {id: 'cln-hymn', type: 'primary-text', authors: ['Cleanthes'], title: 'The Hymn of Cleanthes', translator: 'E. H. Blakeney', publisher: 'Society for Promoting Christian Knowledge', year: 1921, url: 'https://en.wikisource.org/wiki/The_Hymn_of_Cleanthes', accessedOn: reviewedOn, note: 'The sole substantial continuous work attributed to Cleanthes; cited by line range and not treated as a complete Stoic system.'},
  {id: 'cln-dl', type: 'primary-text', authors: ['Diogenes Laertius'], title: 'Lives of Eminent Philosophers, Book VII', translator: 'R. D. Hicks', publisher: 'Perseus Digital Library', year: 1925, url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0132', accessedOn: reviewedOn, note: 'Late biographical and doxographical source; its Cleanthes dossier is cited as evidence about later reports, not transparent modern biography.'},
  {id: 'cln-sep', type: 'scholarly-reference', authors: ['Marion Durand', 'Simon Shogry', 'Dirk Baltzly'], title: 'Stoicism', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2023, url: 'https://plato.stanford.edu/entries/stoicism/', accessedOn: reviewedOn, note: 'Current rewritten entry used for the school’s early development, doctrine, terminology, and explicit attention to source loss.'},
  {id: 'cln-iep', type: 'scholarly-reference', authors: ['Massimo Pigliucci'], title: 'Stoicism', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/stoicism/', accessedOn: reviewedOn, note: 'Independent overview used for the early Stoa, Cleanthes–Chrysippus disagreements, and Stoic physics and ethics.'},
  {id: 'cln-cambridge', type: 'scholarly-book', authors: ['Brad Inwood'], title: 'The Cambridge Companion to the Stoics', publisher: 'Cambridge University Press', year: 2003, doi: '10.1017/CCOL052177005X', isbn: '9780521779852', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-the-stoics/01BCAA241D1D6569C70230A7CA5944E2', accessedOn: reviewedOn, note: 'Specialist collection used for the school history and the evidential constraints on early Stoicism.'},
];

const chrysippusSources: EditorialSource[] = [
  {id: 'chr-dl', type: 'primary-text', authors: ['Diogenes Laertius'], title: 'Lives of Eminent Philosophers, Book VII: Chrysippus', translator: 'R. D. Hicks', publisher: 'Perseus Digital Library', year: 1925, url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0132', accessedOn: reviewedOn, note: 'Late source for the catalogue, school succession, anecdotes, and fragments; cited by its numbered Chrysippus dossier.'},
  {id: 'chr-cicero', type: 'primary-text', authors: ['Cicero'], title: 'De Fato', publisher: 'Wikisource', url: 'https://la.wikisource.org/wiki/De_fato_(Marcus_Tullius_Cicero)', accessedOn: reviewedOn, note: 'Latin text of Cicero’s hostile and reconstructive Roman witness for Chrysippus on fate and responsibility, cited by section.'},
  {id: 'chr-sep', type: 'scholarly-reference', authors: ['Marion Durand', 'Simon Shogry', 'Dirk Baltzly'], title: 'Stoicism', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2023, url: 'https://plato.stanford.edu/entries/stoicism/', accessedOn: reviewedOn, note: 'Current rewritten entry used for the Stoic system, logic, metaphysics, determinism, emotion, ethics, and reception.'},
  {id: 'chr-iep', type: 'scholarly-reference', authors: ['Jeremy Kirby'], title: 'Chrysippus', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/chrysippus/', accessedOn: reviewedOn, note: 'Specialist overview used for the fragmented corpus, propositions, assent, materialism, psychology, and freedom.'},
  {id: 'chr-cambridge', type: 'scholarly-book', authors: ['R. J. Hankinson'], title: 'Stoic Epistemology', containerTitle: 'The Cambridge Companion to the Stoics', editors: ['Brad Inwood'], publisher: 'Cambridge University Press', year: 2003, doi: '10.1017/CCOL052177005X.004', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-the-stoics/stoic-epistemology/9010153C98089793AC7952EF3F8E2D7D', accessedOn: reviewedOn, note: 'Specialist treatment used for the relation of Stoic epistemology, progress, and ethical ideals.'},
];

const epictetusSources: EditorialSource[] = [
  {id: 'epi-discourses', type: 'primary-text', authors: ['Epictetus', 'Arrian of Nicomedia'], title: 'Discourses and Encheiridion', translator: 'George Long', publisher: 'Internet Classics Archive', year: 1877, url: 'https://classics.mit.edu/Epictetus/discourses.html', accessedOn: reviewedOn, note: 'The four extant books are Arrian’s representation of Epictetus’s teaching; cited by book and chapter. The Encheiridion is a shorter Arrianic selection.'},
  {id: 'epi-sep', type: 'scholarly-reference', authors: ['Margaret Graver'], title: 'Epictetus', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2025, url: 'https://plato.stanford.edu/entries/epictetus/', accessedOn: reviewedOn, note: 'Specialist synthesis used for the uncertain biography, Arrianic textual mediation, prohairesis, ethics, teaching, and interpretive cautions.'},
  {id: 'epi-iep', type: 'scholarly-reference', authors: ['Keith H. Seddon'], title: 'Epictetus', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/epictetu/', accessedOn: reviewedOn, note: 'Independent overview used for the Discourses, Handbook, Stoic inheritance, and practical method.'},
  {id: 'epi-cambridge', type: 'scholarly-book', authors: ['Malcolm Schofield'], title: 'Stoic Ethics', containerTitle: 'The Cambridge Companion to the Stoics', editors: ['Brad Inwood'], publisher: 'Cambridge University Press', year: 2003, doi: '10.1017/CCOL052177005X.010', url: 'https://www.cambridge.org/core/books/abs/cambridge-companion-to-the-stoics/stoic-ethics/0F2687C60013B8F509F541A165F9E17B', accessedOn: reviewedOn, note: 'Specialist context for Roman Stoicism, ethical pedagogy, and the danger of treating exemplars as simple historical authorities.'},
];

const senecaSources: EditorialSource[] = [
  {id: 'sen-letters', type: 'primary-text', authors: ['Seneca'], title: 'Epistulae Morales ad Lucilium (Moral Letters)', publisher: 'The Latin Library', url: 'https://www.thelatinlibrary.com/seneca.html', accessedOn: reviewedOn, note: 'The Latin text is cited by letter number; the letters are literary, exhortatory, and self-presenting works, not unmediated autobiography.'},
  {id: 'sen-dialogues', type: 'primary-text', authors: ['Seneca'], title: 'Dialogi, De Clementia, and De Beneficiis', publisher: 'The Latin Library', url: 'https://www.thelatinlibrary.com/seneca.html', accessedOn: reviewedOn, note: 'The Latin texts include On Anger, On the Shortness of Life, On Benefits, and On Clemency; cited by work, book, and chapter.'},
  {id: 'sen-sep', type: 'scholarly-reference', authors: ['Katja Vogt'], title: 'Seneca', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2024, url: 'https://plato.stanford.edu/entries/seneca/', accessedOn: reviewedOn, note: 'Used for biography, literary form, Stoic theory, political context, tragedies, and reception.'},
  {id: 'sen-iep', type: 'scholarly-reference', authors: ['Robert Wagoner'], title: 'Lucius Annaeus Seneca', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/seneca/', accessedOn: reviewedOn, note: 'Independent overview used for chronological uncertainty, philosophy, rhetoric, politics, and the limits of a hypocrisy narrative.'},
  {id: 'sen-cambridge', type: 'scholarly-book', authors: ['Shadi Bartsch', 'Alessandro Schiesaro'], title: 'The Cambridge Companion to Seneca', publisher: 'Cambridge University Press', year: 2015, isbn: '9781107035058', url: 'https://www.cambridge.org/core/books/the-cambridge-companion-to-seneca/3F5C66FCAA02DC522DD6AD9B75BCD827', accessedOn: reviewedOn, note: 'Specialist collection used for the complete Senecan corpus, literary form, Neronian politics, and contested reception.'},
];

const marcusSources: EditorialSource[] = [
  {id: 'mar-meditations', type: 'primary-text', authors: ['Marcus Aurelius'], title: 'Meditations', translator: 'George Long', publisher: 'Internet Classics Archive', year: 1862, url: 'https://classics.mit.edu/Antoninus/meditations.html', accessedOn: reviewedOn, note: 'Personal Greek notes, not a designed public treatise or a transparent day-by-day diary; cited by book and section.'},
  {id: 'mar-sep', type: 'scholarly-reference', authors: ['Rachana Kamtekar'], title: 'Marcus Aurelius', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2025, url: 'https://plato.stanford.edu/entries/marcus-aurelius/', accessedOn: reviewedOn, note: 'Specialist account used for life, text, Stoic exercise, justice, indifferents, deliberative limits, and political interpretation.'},
  {id: 'mar-iep', type: 'scholarly-reference', authors: ['John Sellars'], title: 'Marcus Aurelius', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/marcus-aurelius/', accessedOn: reviewedOn, note: 'Independent overview used for chronology, the Meditations, Epictetus, three topoi, and philosophy as a way of life.'},
  {id: 'mar-cambridge', type: 'scholarly-book', authors: ['Brad Inwood'], title: 'The Cambridge Companion to the Stoics', publisher: 'Cambridge University Press', year: 2003, doi: '10.1017/CCOL052177005X', isbn: '9780521779852', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-the-stoics/01BCAA241D1D6569C70230A7CA5944E2', accessedOn: reviewedOn, note: 'Specialist context for Roman Stoicism and the historical transformation of the school’s inherited materials.'},
];

const plotinusSources: EditorialSource[] = [
  {id: 'plo-enneads', type: 'primary-text', authors: ['Plotinus'], title: 'The Six Enneads', translator: 'Stephen MacKenna and B. S. Page', publisher: 'Internet Classics Archive', url: 'https://classics.mit.edu/Plotinus/enneads.html', accessedOn: reviewedOn, note: 'Plotinus’s treatises, cited by Ennead, treatise, and chapter; Porphyry’s later thematic order is not a chronology of composition.'},
  {id: 'plo-life', type: 'primary-text', authors: ['Porphyry'], title: 'The Life of Plotinus and the Arrangement of His Work', translator: 'Stephen MacKenna', publisher: 'Wikimedia Commons', year: 1910, url: 'https://commons.wikimedia.org/wiki/File:Life_of_plotinus_by_porphyry.pdf', accessedOn: reviewedOn, note: 'Near-contemporary pupil testimony used critically for Plotinus’s life, school, composition, and Porphyry’s editorial arrangement.'},
  {id: 'plo-sep', type: 'scholarly-reference', authors: ['Paul Kalligas'], title: 'Plotinus', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2024, url: 'https://plato.stanford.edu/entries/plotinus/', accessedOn: reviewedOn, note: 'Specialist synthesis used for biography, Platonist self-understanding, arguments on first principles, soul, ethics, and reception.'},
  {id: 'plo-iep', type: 'scholarly-reference', authors: ['Edward Moore'], title: 'Plotinus', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/plotinus/', accessedOn: reviewedOn, note: 'Independent overview used for the Enneads, the One–Intellect–Soul framework, perception, ethics, and late-antique context.'},
];

const buddhaSources: EditorialSource[] = [
  {id: 'bud-suttas', type: 'primary-text', authors: ['Early Buddhist traditions'], title: 'Early Buddhist Discourses', translator: 'Bhikkhu Sujato and collaborators', publisher: 'SuttaCentral', url: 'https://suttacentral.net/', accessedOn: reviewedOn, note: 'Translations and parallels of early discourses; cited by collection and sutta number. They are transmitted texts, not audio transcripts of a securely recoverable historical speaker.'},
  {id: 'bud-sep', type: 'scholarly-reference', authors: ['Mark Siderits'], title: 'Buddha', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2023, url: 'https://plato.stanford.edu/entries/buddha/', accessedOn: reviewedOn, note: 'Specialist philosophical account used for the historical individual, source limits, suffering, dependent arising, not-self, karma, nirvāṇa, and disputes.'},
  {id: 'bud-iep', type: 'scholarly-reference', authors: ['Abraham Vélez de Cea'], title: 'Buddha', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/buddha/', accessedOn: reviewedOn, note: 'Independent overview used for early Buddhist philosophy, ethics, authority, and cautions against reductive modern portraits.'},
  {id: 'bud-cambridge', type: 'scholarly-book', authors: ['Rupert Gethin'], title: 'The Foundations of Buddhism', publisher: 'Oxford University Press', year: 1998, isbn: '9780192892232', url: 'https://global.oup.com/academic/product/the-foundations-of-buddhism-9780192892232', accessedOn: reviewedOn, note: 'Specialist historical introduction used for textual layers, early Buddhist doctrine and practice, community, and later Buddhist development.'},
  {id: 'bud-anayalo', type: 'scholarly-book', authors: ['Bhikkhu Anālayo'], title: 'Rebirth in Early Buddhism and Current Research', publisher: 'Wisdom Publications', year: 2018, isbn: '9781614294467', url: 'https://wisdomexperience.org/product/rebirth-early-buddhism-and-current-research/', accessedOn: reviewedOn, note: 'Specialist study used for careful treatment of rebirth and the relation between early Buddhist sources and contemporary evaluation.'},
];

const sectionPatches: Record<string, Record<string, string[]>> = {
  cleanthes: {
    overview: [
      'Cleanthes of Assos succeeded Zeno as head of the Stoic school and led it until his death in the later third century BCE. A familiar succession story makes him a dutiful bridge between Zeno and Chrysippus, the school’s great systematizer. That image is too thin. Later evidence credits Cleanthes with maintaining the young school, writing across physics, ethics, dialectic, and theology, and making its providential picture of the cosmos memorable in the Hymn to Zeus. But almost all of those writings are lost. The surviving record supports a distinctive philosophical profile without allowing a complete reconstruction of one personal system.',
      'The Hymn to Zeus is exceptional: it is a substantial continuous poem, whereas the rest of the dossier consists mostly of titles, reports, and fragments filtered through later authors. It presents divine reason, human error, common law, and praise in one frame; it does not by itself establish every proposition later called Stoic. Cleanthes is therefore best approached as an early Stoic whose preserved voice gives theology and ethical alignment unusual force, while the exact boundary between his positions, Zeno’s, and Chrysippus’s remains partly uncertain.'
    ],
    fragments: [
      'The evidence for Cleanthes is uneven in a precise way. Diogenes Laertius preserves biographical anecdotes and a work list; other authors preserve small reports or quotations; the Hymn to Zeus alone survives as an extended continuous work. A catalogue can show that titles circulated under his name, and a hostile report can preserve an argument worth testing, but neither is a lost treatise. Responsible reconstruction asks what each witness can establish and does not turn the hymn’s religious language into a complete substitute for the missing writings.',
      'The fragments do show an early school in development. Cleanthes and Chrysippus were later remembered as disagreeing on some questions in physics, psychology, and the articulation of ethics, even while sharing a Stoic commitment to a rational and providential cosmos. It is safer to describe these as reported intra-Stoic debates than to narrate a clean replacement of one master’s doctrine by another. The source problem is not merely an obstacle: it explains why Roman Stoic exercises cannot simply be read back as Cleanthes’s own technical vocabulary.'
    ],
  },
  chrysippus: {
    overview: [
      'Chrysippus of Soli was the third head of the Stoa and its most consequential early systematizer. The ancient saying that there would have been no Stoa without Chrysippus is praise for the scale of his defense and development, not a claim that he founded the school. Zeno set its direction and Cleanthes led it after him. Chrysippus worked across logic, language, epistemology, physics, psychology, ethics, theology, and the arguments of rival schools, making Stoic commitments mutually answerable rather than leaving them as a collection of ethical maxims.',
      'No book by Chrysippus survives complete. Diogenes Laertius’s later catalogue lists hundreds of titles, while Cicero, Plutarch, Galen, Sextus Empiricus, and others preserve selected arguments for their own purposes. The result is a substantial but mediated dossier. It supports claims about the importance of propositions, assent, passion, causal explanation, and responsibility; it does not warrant treating Chrysippus as the identifiable author of every later Stoic formula or filling every gap with a single seamless textbook.'
    ],
    sources: [
      'The loss of Chrysippus’s corpus sets the method for reading him. Ancient witnesses praise his productivity, preserve a large catalogue, quote arguments, and sometimes mock his style. Their testimony is indispensable but not neutral: Cicero reworks Stoic positions for Roman debate, Plutarch attacks Stoic inconsistency, Galen contests Stoic psychology, and Sextus organizes arguments for skeptical purposes. A fragment may retain a key distinction while omitting the surrounding argument that made it defensible.',
      'For that reason, a reconstruction should distinguish a direct quotation, an opponent’s summary, a later Stoic formulation, and a modern inference from the system. It is justified to call Chrysippus a major developer of propositional logic, Stoic epistemology, causal determinism, and the judgment theory of passion. It is not justified to present every technical interpretation as settled, or to mistake the famous ancient slogan about the Stoa for evidence of a personal cult or an intact body of works.'
    ],
  },
  epictetus: {
    overview: [
      'Epictetus was a Greek-speaking Stoic teacher of the first and early second centuries CE whose surviving teaching centers on freedom, judgment, desire, action, and integrity. He spent part of his life enslaved in Rome, studied with Musonius Rufus, later taught at Nicopolis, and died around the middle of the second century; many details of that outline remain uncertain. His philosophy is not a promise to control events. It is a discipline for examining how one uses impressions, where one locates one’s commitments, and how one acts within roles and circumstances that cannot be chosen at will.',
      'The Discourses are not a work that Epictetus is known to have authored. They present teaching recorded or composed by his student Arrian, and only four books of a larger collection survive. The Encheiridion is a shorter selection also associated with Arrian. Their distinctive voice and Stoic terminology provide strong reasons to treat them as evidence for Epictetus’s thought, but the literary mediation matters: the reader encounters a classroom philosopher through a student’s representation, not a verbatim transcript or a modern self-help manual.',
      'That boundary also changes how biography is used. Ancient testimony connects Epictetus with enslavement, manumission, a disability, expulsion from Rome, and teaching at Nicopolis, but it does not document every familiar detail with equal security. The article therefore treats social position and bodily vulnerability as historically important without turning uncertain anecdotes into a psychological key for every doctrine. His arguments must be read in Arrian’s texts and in their Stoic setting, not reverse-engineered from a modern inspirational life story.'
    ],
    'up-to-us': [
      'The opening distinction of the Encheiridion concerns what is "up to us" and what is not. Epictetus places judgment, impulse, desire, aversion, and the use of impressions on the first side; body, property, reputation, office, and the actions of others on the second. The point is not that bodily condition or political action is unimportant. It is that treating external outcomes as the good makes one vulnerable to frustration, fear, and manipulation, whereas one’s evaluative response remains the proper site of ethical work.',
      'Modern language of "control" can blur this point. Epictetus is not offering a casual division between things one can influence and things one cannot. He is identifying a normative responsibility for assent and volition, while repeatedly requiring appropriate action toward family, civic roles, and other people. The distinction challenges a person to act energetically without staking moral worth on success, not to withdraw from duties or deny material injustice.'
    ],
  },
  seneca: {
    overview: [
      'Lucius Annaeus Seneca was a Roman Stoic writer, public figure, and tragedian who wrote in Latin about moral progress under conditions of wealth, grief, anger, illness, dependency, and political danger. Born at Corduba, probably around 4 BCE, he was educated in Rome, exiled to Corsica in 41 CE, recalled to tutor the young Nero, and later compelled to die after implication in the Pisonian conspiracy in 65. The outline is comparatively well attested, but its details are filtered through Seneca’s self-presentation and sources with sharply different political investments.',
      'Seneca’s philosophical writings do not hide the problem of imperfect progress; they stage it. In letters and dialogues he speaks as an exhorter and participant in moral training, not as an untroubled sage reporting from a finished life. His career near Nero makes that stance ethically difficult rather than merely hypocritical. The productive question is how his accounts of anger, clemency, wealth, time, friendship, and death address complicity, aspiration, and self-deception—and where they fail to resolve them.',
      'Genre is part of that judgment. The Moral Letters address Lucilius, but their polished sequences teach a wider readership and cannot be mined as a dated diary of Seneca’s final years. The works conventionally called dialogues also include consolations and essay-like treatments whose speaking situations do philosophical work. Reading them as crafted interventions does not make them insincere; it prevents a rhetorical persona, a reported event, and an independently established biographical fact from being treated as the same kind of evidence.'
    ],
    'wealth-fortune': [
      'Seneca’s wealth and proximity to power invite an obvious charge: how can a Stoic who calls virtue the only good possess immense resources and advise an emperor? His texts answer neither by denying the tension nor by treating poverty as automatically virtuous. Wealth is a preferred indifferent—normally worth selecting when obtained and used without injustice, but not a constituent of happiness. The test is whether possession governs judgment, excuses harm, or prevents a person from acting when duty requires loss.',
      'That doctrine does not settle the historical case. Ancient reports about Seneca’s fortune and influence are politically charged, and a philosophical defense of wealth can easily become a rationalization for privilege. The article therefore does not use Stoic terminology to acquit him. It asks readers to hold textual ideals, material dependence, imperial service, and the unequal costs of "indifference" together. Seneca remains valuable because his writing makes moral improvement legible inside compromise, not because it proves that compromise is harmless.'
    ],
  },
  'marcus-aurelius': {
    overview: [
      'Marcus Aurelius was Roman emperor from 161 to 180 CE and the author of the Greek notes conventionally called the Meditations. He ruled first with Lucius Verus and later alone amid frontier war, epidemic, fiscal strain, administration, and succession anxiety. The notes repeatedly return to Stoic distinctions among judgment, action, desire, mortality, and the common good. They show an emperor practicing philosophical reminders under pressure; they do not supply a completed public theory of government or a reliable private diary in the modern sense.',
      'Marcus had serious Stoic formation and records gratitude to teachers including Rusticus, Apollonius, and Sextus; he also read Epictetus and knew a wider Greek and Roman tradition. The Meditations is distinctive less for new technical doctrine than for its exercise of inherited claims. Its recurring imperatives—test impressions, accept mortality, act justly, remember human kinship, and resist vanity—are attempts to reshape attention. Their philosophical value depends on that practical form as well as on the propositions they repeat.',
      'The text’s later title and twelve-book division should not be mistaken for an authorial publication plan. Short entries repeat, revise, and recombine exercises for immediate use, sometimes addressing the writer as if another voice were correcting him. That form explains both the work’s accessibility and a common misuse: isolated maxims can sound like universal commands after the local exercise and Stoic argument have been removed. The reviewed article therefore reads memorable lines within recurring disciplines of judgment, action, and concern for the human community.'
    ],
    'imperial-crisis': [
      'Marcus’s reign was not a serene illustration of Stoic calm. It included war on several frontiers, the Antonine plague, pressures on finance and administration, and conflicts over succession. He spent substantial time on campaign, but this should not be made into a simple story that the Meditations was written entirely in military isolation: the manuscript offers no dated diary sequence, and its precise occasions cannot normally be recovered. Its language of mortality and instability gains force from imperial conditions without functioning as a chronicle of them.',
      'The contrast between Stoic humility and imperial power is likewise real rather than automatically redemptive. Marcus reminds himself not to be "Caesarified" and treats justice and service as obligations, yet he remained head of an empire structured by hierarchy, conquest, and coercion. A responsible reading neither converts private exercises into proof of exemplary rule nor dismisses their ethical questions because the author was emperor. It asks what self-criticism can accomplish inside power and what institutional questions the Meditations leaves unresolved.'
    ],
  },
  plotinus: {
    overview: [
      'Plotinus was a third-century philosopher whose treatises became the central texts of what modern historians call Neoplatonism. He and his immediate successors described themselves as Platonists, interpreting Plato in a late-antique field that also included Aristotelian argument, Stoic vocabulary, and controversies with Gnostic rivals. The later label is useful for tracking a tradition, but it can mislead when it makes Plotinus appear to have announced a new school under that name or when it collapses later figures into one doctrine.',
      'The Enneads present demanding arguments about the One or Good, Intellect, Soul, bodies, matter, beauty, evil, ethical purification, and intellectual return. They do not offer a temporal story in which a first being manufactures a world from nothing. Plotinus analyzes how the many depend on more unified principles while those principles remain what they are. His philosophical importance lies in the precision and pressure of those accounts, not in a vague image of reality "flowing" from an ultimate unity.'
    ],
    porphyry: [
      'Porphyry’s Life of Plotinus is our principal near-contemporary source for Plotinus’s career, school, and writings. It says that Plotinus studied with Ammonius Saccas in Alexandria, joined Gordian III’s eastern expedition, established himself in Rome after its failure, and taught there until his death in 270. Porphyry had personal knowledge of the school, but the Life is also a crafted philosophical biography that presents its teacher as exemplary. Its eyewitness value and its literary purpose must be kept together.',
      'Porphyry also arranged the fifty-four surviving treatises into six sets of nine and prefaced them with a chronological list. The resulting Enneads are an extraordinary preservation, but their thematic order is not the original order of composition or a transparent map of Plotinus’s development. The essays arose from and for a teaching community. Reading them by Porphyry’s sequence can be illuminating, provided the editorial design is not mistaken for Plotinus’s own final system outline.'
    ],
  },
  buddha: {
    'encountering-the-buddha': [
      'Siddhartha Gautama, conventionally called the Buddha, is approached through layered early Buddhist textual traditions, later biographies, monastic memory, material evidence, and living communities. Modern scholars broadly place the historical teacher in north India around the fifth century BCE, but proposed dates differ substantially and no contemporary biography survives. The article therefore uses the name "the Buddha" for the historical figure as reconstructed with caution and distinguishes that reconstruction from the many authoritative Buddhas of Buddhist traditions.',
      'The early discourses preserve a powerful philosophical and practical architecture: suffering has conditions; craving, ignorance, and clinging can be weakened; ethical conduct, meditation, and understanding belong together; and a permanent, independently governing self is subjected to critique. They were transmitted and organized communally over generations. That does not make them worthless evidence, but it means they should not be treated as stenographic transcripts, nor should later Madhyamaka, Yogācāra, tantric, devotional, or secular doctrines be attributed to one recoverable speaker without argument.'
    ],
    'sources-and-method': [
      'The most important source boundary is between early Buddhist textual traditions and a modern historical individual. Collections such as the Pāli Nikāyas preserve discourses attributed to the Buddha alongside parallel materials in other languages and can be compared for recurrent teaching patterns. Their transmission, compilation, redaction, and translation are themselves historical facts. Comparison can support cautious claims about early Buddhist teaching; it cannot provide a recording of a single voice or settle every chronological layer.',
      'This article therefore gives special weight to claims that recur in early materials while marking disputed biography, textual formation, and interpretation. It also distinguishes a source’s role. A sutta can show how a received tradition frames the four truths, not-self, or dependent arising; scholarship can compare that source with parallels and historical context; neither automatically decides whether a modern philosophical reconstruction is the only possible one. Source-conscious reading is not a refusal to learn from the texts. It is the condition for learning from them without erasing their plurality.'
    ],
  },
};

const configs: Record<string, ModernClusterEditorialConfig> = {
  cleanthes: {
    sources: cleanthesSources,
    sectionCitations: {
      ...all(['overview', 'fragments', 'stoa-institution', 'succession'], [q('cln-dl', 'standard-division', '7.168–176'), q('cln-cambridge', 'chapter', 'Chapter 1: The School, from Zeno to Arius Didymus')]),
      ...all(['hymn', 'logos-providence', 'nature-ethics', 'reception', 'reading'], [q('cln-hymn', 'line', '1–39'), q('cln-sep', 'section', '§§1–4'), q('cln-iep', 'section', 'Historical Background; Physics; Ethics')]),
      ...all(['life-labor', 'discipline'], [q('cln-dl', 'standard-division', '7.168–172'), q('cln-iep', 'section', 'Historical Background')]),
    },
    evidence: {
      life: [q('cln-dl', 'standard-division', '7.168–176'), q('cln-iep', 'section', 'Historical Background')],
      ideas: [q('cln-hymn', 'line', '1–39'), q('cln-sep', 'section', '§§3–4')],
      works: [q('cln-hymn', 'line', '1–39'), q('cln-dl', 'standard-division', '7.174–176')],
      influence: [q('cln-cambridge', 'chapter', 'Chapter 1: The School, from Zeno to Arius Didymus'), q('cln-sep', 'section', '§5')],
      disputes: [q('cln-iep', 'section', 'Historical Background'), q('cln-cambridge', 'chapter', 'Chapter 6: Stoic Theology')],
      reading: [q('cln-hymn', 'line', '1–39'), q('cln-sep', 'section', '§1')],
    },
    patch: {
      lifespan: 'c. 330–c. 230 BCE', birthYear: -330, deathYear: -230, region: 'Assos / Athens', tradition: 'Early Stoic scholarch', primaryBranchIds: ['stoicism'], secondaryBranchIds: ['ethics', 'philosophy-of-religion', 'metaphysics'],
      contributionSummary: 'Led the early Stoa after Zeno and gave Stoic providence, divine reason, and agreement with nature a distinctive poetic expression in the Hymn to Zeus.',
      mainIdeas: ['Providential logos', 'Agreement with nature', 'Cosmic rational order', 'Ethical endurance', 'Philosophical theology'], keyWorks: ['Hymn to Zeus', 'Fragments and reports'],
      lifeStory: 'Cleanthes of Assos became Zeno’s successor in Athens and led the Stoic school until the later third century BCE. Later biography emphasizes poverty and endurance, but its anecdotes are not modern documentation.',
      historicalContext: 'The early Hellenistic Stoa in Athens, where a new school had to defend an integrated logic–physics–ethics program against Academic, Peripatetic, Epicurean, and Cynic rivals while most early writings were later lost.',
      beginnerExplanation: 'Cleanthes asks what it would mean to live responsibly inside a rationally ordered whole. His hymn links understanding, ethical agreement, and praise, but it does not promise that every painful event is good from a human point of view.',
      dateDisplay: 'c. 330–c. 230 BCE; dates conventional', dateConfidence: 'low', dateNote: 'The dates are conventional placement anchors derived from late evidence, not securely documented modern birth and death dates.',
      shortBio: 'Second head of the Stoic school, known through a fragmentary dossier and the surviving Hymn to Zeus for joining early Stoic theology, cosmic order, and ethical formation.',
      extendedBio: ['Diogenes Laertius preserves late biographical anecdotes and a work list; most treatises are lost.', 'The Hymn to Zeus is the main continuous witness and should not be inflated into a complete account of his thought.'],
      centralQuestions: ['How can human reason agree with a providential cosmos?', 'What does the Hymn to Zeus establish, and what remains uncertain because the prose works are lost?', 'How should endurance differ from glorifying suffering?', 'How did Cleanthes’s leadership shape the early Stoic school?'],
      controversiesOrInterpretiveTensions: ['Most of the corpus is lost.', 'Later biography is ethically shaped and historically uneven.', 'The boundary between Cleanthes’s own views and broader early Stoicism is often uncertain.', 'Reported differences with Chrysippus should not be converted into a simple replacement narrative.'],
      commonMisunderstandings: ['Cleanthes was not merely a passive caretaker between Zeno and Chrysippus.', 'The Hymn does not make Stoic providence identical to a transcendent creator God.', 'Stoic endurance is not approval of preventable suffering.', 'Living according to nature is not copying whatever happens in nonhuman nature.'],
      influencesReceived: ['Zeno and the early Stoic school', 'Cynic and Socratic ethical independence', 'Hellenistic debates over nature, fate, theology, and happiness'],
      influenceOnLaterThought: ['Chrysippus and the systematization of the Stoa', 'Roman Stoic providence and exercises of assent', 'Later reception of the Hymn to Zeus as philosophical poetry'],
    },
    reviewNotePath: 'docs/editorial/reviews/cleanthes.md', reviewLock: 'fnv1a64:593bf56283c1e1a3', reviewedOn,
  },
  chrysippus: {
    sources: chrysippusSources,
    sectionCitations: {
      ...all(['overview', 'sources', 'school-system', 'roman-legacy', 'importance', 'reading'], [q('chr-dl', 'standard-division', '7.179–202'), q('chr-iep', 'section', 'Life and Times; References and Further Reading')]),
      ...all(['propositional-logic', 'language'], [q('chr-sep', 'section', '§2.4 Logic'), q('chr-iep', 'section', 'Logic')]),
      ...all(['impressions-assent', 'academic-rivalry'], [q('chr-iep', 'section', 'Epistemology'), q('chr-cambridge', 'chapter', 'Stoic Epistemology')]),
      ...all(['fate', 'passions', 'ethics'], [q('chr-cicero', 'chapter', '39–45'), q('chr-sep', 'section', '§§3–4')]),
    },
    evidence: {
      life: [q('chr-dl', 'standard-division', '7.179–202'), q('chr-iep', 'section', 'Life and Times')],
      ideas: [q('chr-iep', 'section', 'Logic; Epistemology; Fate and Free Will'), q('chr-sep', 'section', '§§2–4')],
      works: [q('chr-dl', 'standard-division', '7.180–202'), q('chr-iep', 'section', 'Life and Times')],
      influence: [q('chr-sep', 'section', '§5'), q('chr-cambridge', 'chapter', 'The School, from Zeno to Arius Didymus')],
      disputes: [q('chr-cicero', 'chapter', '39–45'), q('chr-iep', 'section', 'Fate and Free Will')],
      reading: [q('chr-dl', 'standard-division', '7.179–202'), q('chr-sep', 'section', '§2')],
    },
    patch: {
      lifespan: 'c. 279–c. 206 BCE', birthYear: -279, deathYear: -206, region: 'Soli / Athens', tradition: 'Early Stoic scholarch', primaryBranchIds: ['stoicism', 'logic'], secondaryBranchIds: ['epistemology', 'ethics', 'philosophy-of-mind', 'metaphysics'],
      contributionSummary: 'Third head of the Stoa and its major early systematizer, who developed interconnected arguments in logic, epistemology, psychology, fate, ethics, and theology from a corpus now surviving only in fragments and reports.',
      mainIdeas: ['Propositional logic', 'Assent and impressions', 'Causal fate and responsibility', 'Passions as judgments', 'Virtue and preferred indifferents'], keyWorks: ['Lost treatises and fragments', 'Arguments preserved by Diogenes Laertius, Cicero, Plutarch, Galen, Sextus Empiricus, and others'],
      lifeStory: 'Chrysippus of Soli studied in Athens, succeeded Cleanthes as head of the Stoa, and produced a vast corpus that is now lost except in quotations, reports, and a late work catalogue.',
      historicalContext: 'Hellenistic disputes among Stoics, Academic skeptics, Epicureans, and Peripatetics over knowledge, language, fate, emotion, nature, and the good life.',
      beginnerExplanation: 'Chrysippus tried to show how Stoic claims hang together. If events have causes, how can we still be responsible? His answer focuses on the rational responses—especially assent—through which a person participates in action.',
      dateDisplay: 'c. 279–c. 206 BCE; dates conventional', dateConfidence: 'low', dateNote: 'The conventional chronology comes from late ancient testimony; the surviving corpus does not provide modern biographical precision.',
      shortBio: 'Third Stoic scholarch and the school’s most important early systematizer, recoverable through an extensive but partisan and fragmentary later dossier.',
      extendedBio: ['Diogenes Laertius lists hundreds of works, but no Chrysippean treatise survives complete.', 'The surviving witnesses preserve arguments selectively and often polemically, making reconstruction an exercise in source criticism.'],
      centralQuestions: ['How do propositions and conditionals structure valid reasoning?', 'How can assent make responsibility intelligible in a causally ordered cosmos?', 'Are passions irrational forces or evaluative judgments?', 'How can virtue be the only good while health and wealth remain rationally selectable?'],
      controversiesOrInterpretiveTensions: ['No complete work survives.', 'Ancient witnesses are often hostile or selective.', 'The exact status of Stoic compatibilism and modality remains disputed.', 'Later Roman Stoicism may presuppose rather than reproduce Chrysippus’s technical arguments.'],
      commonMisunderstandings: ['Chrysippus did not found Stoicism.', 'The famous saying about the Stoa is praise, not evidence that his books survive intact.', 'Determinism does not by itself show that he denied responsibility.', 'Stoic logic is not simply Aristotle’s syllogistic in different vocabulary.'],
      influencesReceived: ['Zeno and Cleanthes', 'Academic skeptical challenges', 'Hellenistic debate over dialectic, physics, and ethics'],
      influenceOnLaterThought: ['Roman Stoic ethics and psychology', 'Ancient propositional logic and grammar', 'Debates about determinism, freedom, emotions, and rational responsibility'],
    },
    reviewNotePath: 'docs/editorial/reviews/chrysippus.md', reviewLock: 'fnv1a64:bee7c3d17f769acf', reviewedOn,
  },
  epictetus: {
    sources: epictetusSources,
    sectionCitations: {
      ...all(['overview', 'slavery-context', 'teacher-arrian', 'earlier-stoics', 'legacy-reading'], [q('epi-sep', 'section', '§§1–3'), q('epi-iep', 'section', 'Life and Works; Epictetus’ Stoicism')]),
      ...all(['up-to-us', 'prohairesis', 'impressions-assent', 'nature-roles', 'passivity'], [q('epi-discourses', 'book-chapter', 'Discourses 1.1; 1.6; 1.28; 2.5; Encheiridion 1, 17, 29'), q('epi-sep', 'section', '§4')]),
      ...all(['exercises'], [q('epi-discourses', 'book-chapter', 'Discourses 3.2; 3.10; 3.12'), q('epi-sep', 'section', '§5')]),
    },
    evidence: {
      life: [q('epi-sep', 'section', '§1'), q('epi-iep', 'section', 'Life and Works')],
      ideas: [q('epi-discourses', 'book-chapter', 'Discourses 1.1; 1.6; 1.28; 2.5; Encheiridion 1'), q('epi-sep', 'section', '§4')],
      works: [q('epi-sep', 'section', '§1'), q('epi-iep', 'section', 'The Handbook')],
      influence: [q('epi-sep', 'section', '§§2, 5'), q('epi-cambridge', 'chapter', 'Stoic Ethics')],
      disputes: [q('epi-sep', 'section', '§§1, 3–5'), q('epi-iep', 'section', 'Epictetus’ Stoicism')],
      reading: [q('epi-discourses', 'book-chapter', 'Discourses 1.1; 2.5; 3.2; Encheiridion 1'), q('epi-sep', 'section', '§1')],
    },
    patch: {
      lifespan: 'c. 50–c. 135 CE', birthYear: 50, deathYear: 135, region: 'Hierapolis / Rome / Nicopolis', tradition: 'Roman Stoic teacher', primaryBranchIds: ['stoicism'], secondaryBranchIds: ['ethics', 'epistemology', 'political-philosophy', 'philosophy-of-mind'],
      contributionSummary: 'A Stoic teacher whose Arrianic Discourses train students to examine impressions, locate moral responsibility in prohairesis, discipline desire, and fulfill social roles without making external success the good.',
      mainIdeas: ['What is up to us', 'Prohairesis or volition', 'Use of impressions', 'Desire and aversion', 'Roles and social concern', 'Philosophy as training'], keyWorks: ['Discourses (reported by Arrian)', 'Encheiridion / Handbook (Arrian’s selection)', 'Fragments'],
      lifeStory: 'Epictetus was born in Hierapolis, spent part of his life enslaved in Rome, studied under Musonius Rufus, and later taught at Nicopolis. The chronology and circumstances are partly uncertain; his teaching reaches us through Arrian.',
      historicalContext: 'Roman imperial Stoicism, slavery and manumission, elite education, philosophical exile under Domitian, and a classroom culture that inherited early Stoic logic, physics, and ethics.',
      beginnerExplanation: 'Epictetus is not saying that the world is under your control. He asks you to take responsibility for how you judge, choose, and respond, then to act properly toward other people even when outcomes escape you.',
      dateDisplay: 'c. 50–c. 135 CE; dates approximate', dateConfidence: 'low', dateNote: 'The broad sequence—Hierapolis, enslavement in Rome, teaching at Nicopolis—is better supported than exact dates and personal details.',
      shortBio: 'A formerly enslaved Roman-era Stoic teacher whose thought is preserved through Arrian’s Discourses and Handbook rather than through authorial works of his own.',
      extendedBio: ['Arrian represents Epictetus as a demanding teacher whose oral encounters aim at ethical transformation rather than detached theory.', 'Only four books of the Discourses survive; their authorship, selection, and literary shaping must remain part of interpretation.'],
      centralQuestions: ['What belongs to an agent’s volition rather than to external outcome?', 'How should impressions be tested before assent?', 'How can detachment from outcome coexist with duties to family, city, and other people?', 'What kind of repeated practice turns Stoic doctrine into character?'],
      controversiesOrInterpretiveTensions: ['The surviving Discourses are mediated by Arrian and incomplete.', 'The precise scope and antecedents of prohairesis remain debated.', 'The "up to us" distinction is often flattened into modern control language.', 'The relation between Epictetus’s Stoic providence and his practical teaching requires interpretation.'],
      commonMisunderstandings: ['Epictetus does not advise passivity.', 'The Handbook is not a complete substitute for the Discourses.', 'Stoic indifference does not mean that bodies, poverty, enslavement, or other people do not matter.', 'Self-command is not permission to abandon role-based responsibility.'],
      influencesReceived: ['Musonius Rufus', 'Zeno, Cleanthes, Chrysippus, and later Stoic curricula', 'Socratic and Cynic models of examination and moral training'],
      influenceOnLaterThought: ['Marcus Aurelius', 'Late antique and Christian moral pedagogy', 'Renaissance and early modern neo-Stoicism', 'Contemporary debates about agency, resilience, and cognitive practice'],
    },
    reviewNotePath: 'docs/editorial/reviews/epictetus.md', reviewLock: 'fnv1a64:ccff788e09f81107', reviewedOn,
  },
  seneca: {
    sources: senecaSources,
    sectionCitations: {
      ...all(['overview', 'imperial-context', 'near-nero', 'reception-reading'], [q('sen-sep', 'section', '§1'), q('sen-iep', 'section', 'Life, Political Career, and Death')]),
      ...all(['letters', 'time-death', 'benefits-friendship', 'wealth-fortune', 'stoic-inheritance'], [q('sen-letters', 'standard-division', 'Letters 1, 9, 47, 71, 85, 90, 120'), q('sen-sep', 'section', '§§3–4')]),
      ...all(['anger', 'tragedies'], [q('sen-dialogues', 'book-chapter', 'On Anger 1.1–1.9; On Clemency 1.1–1.4'), q('sen-sep', 'section', '§§4, 6')]),
    },
    evidence: {
      life: [q('sen-sep', 'section', '§1'), q('sen-iep', 'section', 'Life, Political Career, and Death')],
      ideas: [q('sen-letters', 'standard-division', 'Letters 1, 47, 71, 85, 90'), q('sen-dialogues', 'book-chapter', 'On Anger 1.1–1.9')],
      works: [q('sen-sep', 'section', '§§2–6'), q('sen-cambridge', 'chapter', 'Introduction and contents')],
      influence: [q('sen-sep', 'section', '§7'), q('sen-cambridge', 'chapter', 'Introduction and contents')],
      disputes: [q('sen-sep', 'section', '§§1, 6–7'), q('sen-iep', 'section', 'Criticism and Influence')],
      reading: [q('sen-letters', 'standard-division', 'Letters 1, 47, 71, 85, 90'), q('sen-dialogues', 'book-chapter', 'On Anger 1.1–1.9; On the Shortness of Life 1.1–1.4')],
    },
    patch: {
      lifespan: 'c. 4 BCE–65 CE', birthYear: -4, deathYear: 65, region: 'Corduba / Rome / Corsica', tradition: 'Roman Stoic writer and statesman', primaryBranchIds: ['stoicism'], secondaryBranchIds: ['ethics', 'political-philosophy', 'aesthetics', 'philosophy-of-religion'],
      contributionSummary: 'A Roman Stoic writer who used letters, dialogues, and tragedies to examine moral progress, anger, grief, time, wealth, dependency, and political compromise under imperial rule.',
      mainIdeas: ['Moral progress', 'Anger as evaluative error', 'Time and mortality', 'Wealth as a preferred indifferent', 'Benefits and social obligation', 'Philosophical therapy'], keyWorks: ['Moral Letters to Lucilius', 'On Anger', 'On the Shortness of Life', 'On Benefits', 'On Clemency', 'Natural Questions', 'Tragedies'],
      lifeStory: 'Seneca was born at Corduba, educated in Rome, exiled to Corsica in 41 CE, recalled to tutor Nero, and later forced to die after implication in the Pisonian conspiracy. Sources for his career and wealth require political and rhetorical caution.',
      historicalContext: 'The Julio-Claudian empire, elite Roman education and patronage, the court of Nero, Stoic moral literature in Latin, and contested relations between philosophical ideals and imperial power.',
      beginnerExplanation: 'Seneca does not offer a clean moral brand. He asks how a person who is angry, privileged, grieving, ambitious, or compromised can begin again to train judgment—and he makes readers test whether that practice can avoid excusing its own advantages.',
      dateDisplay: 'c. 4 BCE–65 CE; birth year approximate', dateConfidence: 'medium', dateNote: '65 CE is secure; the traditional birth year of 4 BCE is a plausible convention within a wider scholarly range.',
      shortBio: 'A Stoic writer, court figure, and tragedian whose morally difficult career frames his literary investigations of progress, emotion, wealth, time, and power.',
      extendedBio: ['The philosophical works are literary and exhortatory, so they cannot simply be treated as reports of Seneca’s private life.', 'His proximity to Nero makes a simplistic contrast between doctrine and biography inadequate but does not dissolve the ethical tension.'],
      centralQuestions: ['Can moral progress occur without pretending to be a sage?', 'Why does anger mislead even when injustice is real?', 'How should wealth be used without becoming the measure of happiness?', 'What does philosophy demand of someone near political power?'],
      controversiesOrInterpretiveTensions: ['Biography, wealth, and court influence are reconstructed from uneven and politically charged sources.', 'The letters’ addressee, sequence, and self-presentation are literary as well as ethical questions.', 'The philosophical role of the tragedies remains disputed.', 'Seneca’s advice about power can be read as resistance, accommodation, or both.'],
      commonMisunderstandings: ['Seneca does not claim to be a Stoic sage.', 'Stoic criticism of anger is not indifference to injustice or harm.', 'Calling wealth "indifferent" does not make exploitation morally indifferent.', 'His use of Epicurus’s sayings does not make him an Epicurean.'],
      influencesReceived: ['Earlier Stoic ethics and psychology', 'Roman rhetorical, legal, and political culture', 'Epicurean and Cynic material used critically in moral exhortation'],
      influenceOnLaterThought: ['Montaigne and the moral essay', 'Christian moral reflection and neo-Stoicism', 'Modern work on anger, grief, time, self-formation, and ethics under power'],
    },
    reviewNotePath: 'docs/editorial/reviews/seneca.md', reviewLock: 'fnv1a64:721a24d6643f8676', reviewedOn,
  },
  'marcus-aurelius': {
    sources: marcusSources,
    sectionCitations: {
      ...all(['overview', 'imperial-crisis', 'formation', 'private-notes', 'legacy-reading'], [q('mar-sep', 'section', '§§1–3'), q('mar-iep', 'section', 'Life; The Meditations')]),
      ...all(['epictetus', 'three-disciplines', 'impermanence-death', 'social-nature', 'power-humility', 'misreadings'], [q('mar-meditations', 'book-chapter', '1.7–1.9; 2.1; 4.3; 5.16; 6.30; 8.59; 10.11'), q('mar-sep', 'section', '§§3–5')]),
    },
    evidence: {
      life: [q('mar-sep', 'section', '§1'), q('mar-iep', 'section', 'Life')],
      ideas: [q('mar-meditations', 'book-chapter', '2.1; 4.3; 5.16; 6.30; 8.59; 10.11'), q('mar-sep', 'section', '§§3–5')],
      works: [q('mar-meditations', 'book-chapter', '1.1–17'), q('mar-iep', 'section', 'The Meditations')],
      influence: [q('mar-sep', 'section', '§§2–3'), q('mar-cambridge', 'chapter', 'The School in the Roman Imperial Period')],
      disputes: [q('mar-sep', 'section', '§§4–5'), q('mar-iep', 'section', 'Philosophy')],
      reading: [q('mar-meditations', 'book-chapter', '1.1–17; 2.1; 4.3; 6.30'), q('mar-sep', 'section', '§3')],
    },
    patch: {
      lifespan: '121–180 CE', birthYear: 121, deathYear: 180, region: 'Rome / imperial frontiers', tradition: 'Roman emperor and Stoic practitioner', primaryBranchIds: ['stoicism'], secondaryBranchIds: ['ethics', 'political-philosophy', 'epistemology'],
      contributionSummary: 'A Roman emperor whose Meditations use Stoic exercises to train judgment, action, desire, attention to mortality, and concern for a common human community under the pressures of rule.',
      mainIdeas: ['Testing impressions', 'Justice and social nature', 'Mortality and impermanence', 'Discipline of desire', 'Appropriate action', 'Humility under power'], keyWorks: ['Meditations', 'Correspondence with Fronto'],
      lifeStory: 'Marcus Aurelius was adopted into the imperial succession, became emperor in 161 CE, and spent much of his reign addressing war, epidemic, and administration. His Meditations are undated Greek exercises rather than a completed public treatise.',
      historicalContext: 'The Antonine empire, shared and later sole rule, frontier war, plague, Roman hierarchy, Stoic pedagogy, and Greek philosophical culture in imperial institutions.',
      beginnerExplanation: 'Marcus writes reminders to himself: pause before accepting an impression, do the next just action, accept that fame and life end, and treat other people as fellow participants in a shared rational world. The reminders are practice, not proof that power has been made harmless.',
      dateDisplay: '121–180 CE', dateConfidence: 'high', dateNote: 'The lifespan and imperial chronology are securely documented; the exact occasions and sequence of the Meditations are not.',
      shortBio: 'Roman emperor and Stoic practitioner whose Meditations reveal repeated philosophical exercises rather than a finished theory or an uncomplicated model of political virtue.',
      extendedBio: ['Book 1 acknowledges teachers and models, while later books repeatedly rehearse Stoic tests of judgment, action, and desire.', 'The text’s manuscript and compositional history make it unsafe to read it as a dated diary or a transparent explanation of imperial policy.'],
      centralQuestions: ['How can one test an impression before acting?', 'What does justice require when one has responsibilities to others?', 'How should awareness of death alter ambition and resentment?', 'What can private philosophical exercise accomplish within imperial power?'],
      controversiesOrInterpretiveTensions: ['The Meditations’ genre, order, and intended privacy remain debated.', 'Stoic ethical exercises do not determine the detailed content of justice in every case.', 'The relationship between Marcus’s ideals and imperial institutions is ethically difficult.', 'Epictetus is central but not the only source of influence.'],
      commonMisunderstandings: ['The Meditations is not a book written to manage other people.', 'Stoicism does not mean suppressing concern for others.', 'The text does not make Marcus a modern democrat or prove his reign morally exemplary.', 'A quotation about acceptance does not license passivity toward injustice.'],
      influencesReceived: ['Rusticus, Apollonius, Sextus, and other teachers named in Meditations 1', 'Epictetus and earlier Stoic authors', 'Greek and Roman moral, literary, and political traditions'],
      influenceOnLaterThought: ['Late antique and Christian exercises of self-examination', 'Renaissance and modern Stoic reception', 'Debates about leadership, mortality, attention, cosmopolitanism, and ethics under power'],
    },
    reviewNotePath: 'docs/editorial/reviews/marcus-aurelius.md', reviewLock: 'fnv1a64:954a66201e75f91c', reviewedOn,
  },
  plotinus: {
    sources: plotinusSources,
    sectionCitations: {
      ...all(['overview', 'context', 'life-school', 'porphyry', 'reception', 'reading'], [q('plo-life', 'chapter', '3–6, 13–26'), q('plo-sep', 'section', '§1')]),
      ...all(['one', 'intellect', 'soul', 'procession-return', 'evil-matter', 'beauty', 'practice', 'against-materialism'], [q('plo-enneads', 'standard-division', 'I.6; I.8; I.2; I.6; III.2–3; IV.8; V.1–5; VI.9'), q('plo-sep', 'section', '§§2–8')]),
    },
    evidence: {
      life: [q('plo-life', 'chapter', '3–6'), q('plo-sep', 'section', '§1')],
      ideas: [q('plo-enneads', 'standard-division', 'I.2; I.6; I.8; III.2–3; IV.8; V.1–5; VI.9'), q('plo-sep', 'section', '§§2–8')],
      works: [q('plo-life', 'chapter', '24–26'), q('plo-iep', 'section', 'Life and Work')],
      influence: [q('plo-sep', 'section', '§9'), q('plo-iep', 'section', 'Life and Work')],
      disputes: [q('plo-enneads', 'standard-division', 'II.9; III.2–3; VI.8–9'), q('plo-sep', 'section', '§§7–9')],
      reading: [q('plo-enneads', 'standard-division', 'I.6; I.8; I.2; IV.8; V.1; VI.9'), q('plo-iep', 'section', 'Life and Work')],
    },
    patch: {
      lifespan: 'c. 204/5–270 CE', birthYear: 204, deathYear: 270, region: 'Egypt / Alexandria / Rome', tradition: 'Late antique Platonist', primaryBranchIds: ['neoplatonism', 'metaphysics'], secondaryBranchIds: ['platonism', 'ethics', 'philosophy-of-mind', 'aesthetics'],
      contributionSummary: 'A late-antique Platonist whose Enneads argue that the many depend on the One or Good, through Intellect and Soul, while ethical and intellectual return reorients the soul without treating the cosmos as a rival evil principle.',
      mainIdeas: ['The One or Good', 'Intellect and Forms', 'Soul and participation', 'Procession and return', 'Matter and evil', 'Beauty and intelligible form', 'Contemplative practice'], keyWorks: ['Enneads', 'Porphyry, Life of Plotinus and Order of His Books'],
      lifeStory: 'Plotinus studied in Alexandria, joined Gordian III’s unsuccessful eastern expedition, taught in Rome from the mid-240s CE, and died in 270. Porphyry’s admiring near-contemporary Life is indispensable but not neutral.',
      historicalContext: 'Third-century Roman intellectual life, late-antique Platonist interpretation, Aristotelian argument, polemic with Gnostic contemporaries, and a teaching community whose essays Porphyry later edited as the Enneads.',
      beginnerExplanation: 'Plotinus asks how many changing things can depend on a source that is simpler than they are. His answer is not a physical cascade or a creator making matter from nothing: the One, Intellect, and Soul mark explanatory relations, while philosophy trains the soul’s attention and action.',
      dateDisplay: 'c. 204/5–270 CE; birth year inferred', dateConfidence: 'medium', dateNote: '270 CE is secure in Porphyry’s chronology; the commonly used birth year is inferred from Porphyry’s report of age.',
      shortBio: 'A third-century Platonist known through his Enneads and Porphyry’s Life, conventionally called the founder of Neoplatonism though he understood his project as philosophical interpretation of Plato.',
      extendedBio: ['Porphyry’s account supplies the main evidence for Plotinus’s life, teaching, composition, and editorial afterlife.', 'The Enneads preserve fifty-four essays in Porphyry’s thematic arrangement, which must not be mistaken for composition order.'],
      centralQuestions: ['Why must a first explanatory principle be utterly simple?', 'How do Intellect and Soul depend on the One without temporal creation?', 'How can evil be addressed without positing a rival ultimate principle?', 'What does philosophical return require of attention, virtue, and contemplation?'],
      controversiesOrInterpretiveTensions: ['"Neoplatonism" is a later label, not Plotinus’s self-description.', 'Porphyry’s Life is eyewitness testimony and philosophical encomium.', 'The relations among One, Intellect, Soul, and matter are often rendered misleadingly as spatial or temporal emanation.', 'The role of ritual, embodiment, and political life in Plotinian practice remains debated.'],
      commonMisunderstandings: ['The One is not one being among other beings.', 'Procession is not a temporal creation story.', 'Plotinus does not simply despise the sensible cosmos.', 'Mystical language does not remove the need to follow the arguments.', 'Later Neoplatonists do not all repeat Plotinus unchanged.'],
      influencesReceived: ['Plato and the Platonist tradition', 'Ammonius Saccas', 'Aristotelian argument and late-antique philosophical debate'],
      influenceOnLaterThought: ['Porphyry, Iamblichus, Proclus, and later Platonisms', 'Christian, Jewish, and Islamic philosophical transformations', 'Renaissance Platonism and modern discussions of unity, mind, beauty, and transcendence'],
    },
    reviewNotePath: 'docs/editorial/reviews/plotinus.md', reviewLock: 'fnv1a64:0b4e1c300572dafb', reviewedOn,
  },
  buddha: {
    sources: buddhaSources,
    sectionCitations: {
      ...all(['encountering-the-buddha', 'chronology-and-setting', 'sources-and-method', 'noble-search', 'awakening-community-death', 'what-is-early', 'modern-buddhas', 'discipline-gender-power', 'legacy-reading'], [q('bud-sep', 'section', '§§1–2'), q('bud-iep', 'section', 'Introduction; Historical Background'), q('bud-cambridge', 'work', 'The Foundations of Buddhism')]),
      ...all(['middle-way', 'four-truths', 'dukkha-craving-cessation', 'dependent-arising', 'impermanence-aggregates', 'not-self', 'nirvana'], [q('bud-suttas', 'standard-division', 'SN 56.11; SN 12.1–2; SN 22.59; MN 63'), q('bud-sep', 'section', '§§3–6')]),
      ...all(['karma-rebirth', 'ethics-community', 'meditation-inquiry', 'teaching-strategy', 'reason-authority', 'comparative-guardrails'], [q('bud-suttas', 'standard-division', 'AN 6.63; MN 60; MN 95; MN 63; DN 16'), q('bud-iep', 'section', 'Ethics; Epistemology'), q('bud-anayalo', 'work', 'Rebirth in Early Buddhism and Current Research')]),
    },
    evidence: {
      life: [q('bud-sep', 'section', '§§1–2'), q('bud-cambridge', 'work', 'The Foundations of Buddhism')],
      ideas: [q('bud-suttas', 'standard-division', 'SN 56.11; SN 12.1–2; SN 22.59; MN 63'), q('bud-sep', 'section', '§§3–6')],
      works: [q('bud-suttas', 'standard-division', 'SN 56.11; SN 22.59; MN 26; DN 16'), q('bud-sep', 'section', '§2')],
      influence: [q('bud-cambridge', 'work', 'The Foundations of Buddhism'), q('bud-iep', 'section', 'Historical Background')],
      disputes: [q('bud-sep', 'section', '§§1–7'), q('bud-anayalo', 'work', 'Rebirth in Early Buddhism and Current Research')],
      reading: [q('bud-suttas', 'standard-division', 'SN 56.11; SN 22.59; MN 26; DN 16'), q('bud-cambridge', 'work', 'The Foundations of Buddhism')],
    },
    patch: {
      lifespan: 'c. fifth century BCE; chronology disputed', birthYear: -480, deathYear: -400, region: 'North India', tradition: 'Early Buddhist teacher in received traditions', primaryBranchIds: ['buddhist-philosophy', 'indian-philosophy'], secondaryBranchIds: ['ethics', 'epistemology', 'philosophy-of-mind', 'philosophy-of-religion'],
      contributionSummary: 'The foundational teacher represented in early Buddhist textual traditions, whose remembered path joins ethical conduct, meditation, and understanding to the diagnosis and cessation of dukkha while later Buddhist traditions develop that inheritance in divergent ways.',
      mainIdeas: ['Four truths as tasks', 'Dependent arising', 'Impermanence and aggregates', 'Not-self', 'Intentional karma and rebirth', 'Eightfold path', 'Nirvāṇa'], keyWorks: ['Early Buddhist discourses: SN 56.11', 'Early Buddhist discourses: SN 22.59', 'Early Buddhist discourses: MN 26', 'Early Buddhist discourses: DN 16'],
      lifeStory: 'The historical Gautama is reconstructed from much later transmitted sources rather than contemporary biography. Scholarship broadly places him in fifth-century BCE north India, while the exact chronology, sequence, and historical form of particular narratives remain disputed.',
      historicalContext: 'North Indian kingdoms, towns, trade routes, household and sacrificial practices, and competing renunciant movements debating karma, rebirth, self, knowledge, discipline, liberation, and authority; surviving teachings were preserved through communal transmission.',
      beginnerExplanation: 'The Buddha’s early received teaching is not simply that life is miserable. It diagnoses why changing life becomes bound up with dukkha, identifies conditions such as craving and ignorance, and develops a path that coordinates conduct, attention, concentration, and understanding.',
      dateDisplay: 'c. fifth century BCE; dates disputed', dateConfidence: 'low', dateNote: 'Numeric placement anchors are conventional. The historical Buddha’s exact birth, death, and chronology are disputed across scholarly and traditional reconstructions.',
      shortBio: 'A historically difficult north Indian teacher whose early received discourses organize liberation around dukkha, dependent arising, impermanence, not-self, ethical discipline, meditation, and nirvāṇa.',
      extendedBio: ['Early discourses are indispensable evidence but were transmitted and organized by communities over generations.', 'A cautious account separates early recurrent teaching patterns from later Buddhist philosophical developments and from modern secular reconstruction.'],
      centralQuestions: ['Why does conditioned life become vulnerable to dukkha, and how can its conditions cease?', 'How can continuity, intention, and responsibility be explained without a permanent self?', 'How do ethical conduct, meditation, and understanding support one another?', 'What can textual tradition, reasoning, teachers, communal testing, and cultivated experience contribute to liberation?'],
      controversiesOrInterpretiveTensions: ['The historical chronology and the formation of early textual collections are disputed.', 'Early discourses are not stenographic transcripts.', 'Not-self and nirvāṇa receive competing philosophical interpretations.', 'Rebirth is integral to early Buddhist soteriology but contested in modern interpretation.', 'Later Buddhist doctrines cannot automatically be attributed to the historical Buddha.'],
      commonMisunderstandings: ['The four truths do not say that every moment is miserable.', 'Craving is not identical with every desire or aspiration.', 'Not-self does not erase conventional persons, pain, agency, or responsibility.', 'Mindfulness is one component of an ethical and intellectual path.', 'The historical Buddha did not simply teach all later Madhyamaka, Yogācāra, tantric, devotional, or secular Buddhist doctrine.'],
      influencesReceived: ['North Indian renunciant and Brahmanical debates about karma, rebirth, liberation, and knowledge', 'The social and institutional worlds represented in early Buddhist texts', 'Historical influences remain partly reconstructive rather than directly documented'],
      influenceOnLaterThought: ['Buddhist monastic, scholastic, contemplative, devotional, and ritual traditions', 'Nāgārjuna, Vasubandhu, Dignāga, Dharmakīrti, and other later Buddhist philosophers', 'Modern Buddhist reform, global reception, comparative philosophy, and debates over secularization'],
    },
    reviewNotePath: 'docs/editorial/reviews/buddha.md', reviewLock: 'fnv1a64:746b790a0ea8a873', reviewedOn,
  },
};

const revisedSections = (record: Philosopher): ArticleSection[] | undefined => {
  const changes = sectionPatches[record.id];
  if (!changes || !record.articleSections) return undefined;
  return record.articleSections.map((section) =>
    changes[section.id] ? {...section, paragraphs: changes[section.id]} : section,
  );
};

export const applyClaimReviewBatchNextBEditorial = (record: Philosopher): Philosopher => {
  const config = configs[record.id];
  if (!config) return record;
  return applyModernClusterEditorialConfig(record, {
    ...config,
    articleSections: revisedSections(record),
  });
};
