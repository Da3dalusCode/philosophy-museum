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
 * Isolated next-batch editorial material. Sol owns registration, lock generation,
 * review notes, and the separate Museum primary-copy reconciliation.
 */
const accessedOn = '2026-08-10';
const c = (sourceId: string, kind: CitationLocatorKind, value: string, note?: string) =>
  cite(sourceId, kind, value, note);

type ArticleEdits = Record<string, Record<number, string>>;
type BatchConfig = Omit<ModernClusterEditorialConfig, 'articleSections' | 'sectionCitations'> & {
  defaultCitations: CitationReference[];
  sectionCitations?: Record<string, CitationReference[]>;
};

const source = (entry: Omit<EditorialSource, 'accessedOn'>): EditorialSource => ({...entry, accessedOn});

const reviseSections = (
  record: Philosopher,
  edits: ArticleEdits | undefined,
): ArticleSection[] => (record.articleSections ?? []).map((section) => ({
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

const articleEdits: Record<string, ArticleEdits> = {
  'hippias-of-elis': {
    'craft-autarkeia': {
      1: 'Later readers can use self-sufficiency to name the attraction of this scene, but Plato’s comic inventory does not give us a Hippian doctrine of autarkeia. It shows a performer displaying clothes and objects he says he made himself, and it lets Socrates test the prestige attached to that display. The passage is valuable evidence for a public ideal of versatile competence; it is not a surviving treatise that licenses a complete ethical program. The distinction matters because later Cynic self-sufficiency and Hippias’ competitive display can overlap in vocabulary while serving very different philosophical projects.',
    },
    'works-mathematics': {
      1: 'Reports attach technical and mathematical interests to Hippias, including the curve later called the quadratrix. The surviving evidence does not preserve a Hippian technical treatise, and later mathematical attribution should not be turned into a secure reconstruction of his method. What can be said with confidence is narrower and still important: Hippias was remembered as making learning, calculation, memory, language, and public demonstration parts of one ambitious educational performance.',
    },
  },
  lucretius: {
    'biography-context': {
      0: 'Reliable biography is exceptionally thin. Cicero’s letter of February 54 BCE is the only contemporary external reference normally connected with Lucretius, and the familiar lifespan from the mid-90s to the mid-50s BCE is reconstructed rather than documented year by year. A much later story that he was driven mad by a love potion and died by suicide is not sound evidence for his life. The poem, not a recoverable personal narrative, is the secure center of interpretation.',
    },
    plague: {
      0: 'The surviving poem ends with the Athenian plague, and the abruptness of that ending has generated long debate. It is safer to say that the six-book design is complete while the text may not have received a final authorial revision than to announce either a wholly unfinished poem or a deliberately closed one. The final scene can be read as a test of Epicurean explanation under catastrophe, but the evidence does not decide a single intended emotional effect.',
    },
  },
  pyrrho: {
    overview: {
      0: 'Pyrrho of Elis is a crucial but unusually difficult source for ancient skepticism. He wrote nothing that survives, and later witnesses describe a life, an attitude, and a philosophical lineage through materials with different dates and purposes. The later Pyrrhonian tradition draws authority from his name, but its elaborate practice of balancing arguments and suspending judgment cannot simply be read back as a recoverable doctrine of Pyrrho himself. His importance lies partly in that productive uncertainty: reports of his stance against settled claims became a point of departure for later therapeutic skepticism.',
    },
  },
  aristotle: {
    'logic-science': {
      0: 'Aristotle developed the earliest surviving systematic account of categorical syllogistic and made demonstration central to an account of scientific understanding. Calling the later collection of logical treatises the Organon is convenient, but the title is not Aristotle’s own, and it should not make his logic look like a separately finished modern formal system. His achievement is better seen in the connection he draws among valid inference, explanatory premises, definition, and inquiry into causes. It is a major Greek logical tradition, not a reason to erase other independent histories of logic.',
    },
  },
  diogenes: {
    sources: {
      0: 'No securely surviving work by Diogenes allows a direct reconstruction of his arguments. The richest continuous ancient dossier is Diogenes Laertius, writing centuries later, alongside scattered notices with varied literary and polemical purposes. The reports disagree about biography, exile from Sinope, works attributed to him, and especially the direct teacher-student relation often drawn from Antisthenes through Diogenes to Crates and Zeno. Their polished scenes are not transparent transcripts of events.',
    },
  },
  epicurus: {
    'gods-death': {
      0: 'Epicurus does not simply announce that gods do not exist. The surviving texts speak of blessed and imperishable gods while rejecting divine providence, punishment, anger, and cosmic administration. Whether the gods are interpreted as real beings, ideal constructions, or objects of a distinctive kind of thought remains disputed; what is clear is that fear of divine management has no place in Epicurean therapy. A blessed being would not be burdened by rule or retaliation, so popular images of jealous divine governors misdescribe both gods and nature.',
    },
  },
  zeno: {
    fragments: {
      0: 'Almost everything assigned to Zeno reaches us through later reports, quotations, hostile summaries, and fragments. This makes it unsafe to treat every doctrine standard in Roman Stoicism as Zeno’s own finished position. The evidence supports a founder who joined ethical independence to a public school and whose successors developed logic, physics, and ethics in sustained debate; it does not supply a complete Zeno textbook. Responsible reconstruction distinguishes early testimony from later systematization and keeps the witness’s purpose visible.',
    },
    republic: {
      0: 'Zeno’s Republic survives only in fragments and later descriptions, often preserved because rivals found its proposals striking or objectionable. It is therefore better evidence for a radical early Stoic challenge to inherited status, convention, and civic institutions than for a recoverable constitutional blueprint. Claims about its cosmopolitan implications should be framed as interpretations of fragmentary testimony, not as a full political program written in Zeno’s own continuous voice.',
    },
  },
};

const configs: Record<string, BatchConfig> = {
  'hippias-of-elis': {
    sources: [
      source({id: 'hip-sep', type: 'scholarly-reference', authors: ['C. C. W. Taylor', 'Mi-Kyoung Lee'], title: 'The Sophists', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Spring 2025', year: 2025, url: 'https://plato.stanford.edu/archives/spr2025/entries/sophists/'}),
      source({id: 'hip-iep', type: 'scholarly-reference', authors: ['George Duke'], title: 'Sophists', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/sophists/'}),
      source({id: 'hip-minor', type: 'primary-text', authors: ['Plato'], title: 'Lesser Hippias', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://atlas.perseus.tufts.edu/library/urn:cts:greekLit:tlg0059.tlg026/', note: 'Use Stephanus divisions; the dialogue is a dramatic and polemical witness, not a neutral biography.'}),
      source({id: 'hip-protagoras', type: 'primary-text', authors: ['Plato'], title: 'Protagoras', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://atlas.perseus.tufts.edu/library/urn:cts:greekLit:tlg0059.tlg022/', note: 'Use Stephanus divisions.'}),
      source({id: 'hip-major', type: 'primary-text', authors: ['Plato'], title: 'Greater Hippias', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://atlas.perseus.tufts.edu/library/urn:cts:greekLit:tlg0059.tlg025/', note: 'The dialogue’s authenticity is disputed; it is used here as a witness to a literary Hippias, not as independent biography.'}),
    ],
    defaultCitations: [c('hip-sep', 'section', '§§2–3'), c('hip-iep', 'section', 'Hippias of Elis')],
    sectionCitations: {
      sources: [c('hip-sep', 'section', '§2'), c('hip-iep', 'section', 'Hippias of Elis'), c('hip-minor', 'standard-division', '363a–369b')],
      'craft-autarkeia': [c('hip-minor', 'standard-division', '368b–e'), c('hip-sep', 'section', '§2')],
      'nature-convention': [c('hip-protagoras', 'standard-division', '337c–d'), c('hip-sep', 'section', '§3')],
      'works-mathematics': [c('hip-iep', 'section', 'Hippias of Elis'), c('hip-major', 'standard-division', '281a–304e', 'Use cautiously because authenticity remains disputed.')],
    },
    evidence: evidence(
      [c('hip-sep', 'section', '§2'), c('hip-minor', 'standard-division', '363a–369b')],
      [c('hip-iep', 'section', 'Hippias of Elis'), c('hip-minor', 'standard-division', '368b–e')],
      [c('hip-minor', 'standard-division', '363a–369b'), c('hip-major', 'standard-division', '281a–304e')],
      [c('hip-sep', 'section', '§3'), c('hip-protagoras', 'standard-division', '337c–d')],
      [c('hip-sep', 'section', '§2'), c('hip-major', 'standard-division', '281a–304e')],
      [c('hip-iep', 'section', 'Hippias of Elis'), c('hip-minor', 'standard-division', '363a–369b')],
    ),
    patch: {
      contributionSummary: 'Presented polymathy, memory, craft, and public performance as an ambitious Sophistic program, known chiefly through hostile or dramatic witnesses.',
      dateDisplay: 'c. 460–after 399 BCE; dates uncertain',
      dateConfidence: 'low',
      dateNote: 'Hippias was active in the last third of the fifth century and appears in a dramatic setting dated to 399 BCE; exact birth and death years are unknown.',
      historicalContext: 'A fifth-century itinerant Sophist working across Greek civic settings, remembered through Plato and later testimony rather than surviving treatises.',
      lifeStory: 'Hippias of Elis travelled as a professional teacher and performer. The evidence preserves a public reputation for wide learning more securely than a continuous biography or a fixed doctrine.',
      beginnerExplanation: 'Hippias makes knowledge look like a public craft: can a person learn widely, remember effectively, and answer under pressure without confusing display with wisdom?',
      mainIdeas: ['Polymathy and versatile education', 'Memory and public performance', 'Nature and convention as a Sophistic question', 'Caution about literary and hostile evidence'],
      keyWorks: ['Plato, Lesser Hippias (dramatic witness)', 'Plato, Protagoras (dramatic witness)', 'Fragments and later testimonia'],
      controversiesOrInterpretiveTensions: ['The evidence is predominantly literary and hostile.', 'The authenticity of Greater Hippias is disputed.', 'Self-sufficiency is a later interpretive label, not a secure Hippian doctrine.'],
    },
    reviewNotePath: 'docs/editorial/reviews/hippias-of-elis.md', reviewLock: 'fnv1a64:37606b487272955e', reviewedOn: accessedOn,
  },
  lucretius: {
    sources: [
      source({id: 'luc-sep', type: 'scholarly-reference', authors: ['Simon Trépanier'], title: 'Lucretius', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2023, url: 'https://plato.stanford.edu/entries/lucretius/'}),
      source({id: 'luc-iep', type: 'scholarly-reference', authors: ['David Simpson'], title: 'Lucretius', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/lucretiu/'}),
      source({id: 'luc-dnr', type: 'primary-text', authors: ['Lucretius'], title: 'De Rerum Natura', translator: 'William Ellery Leonard', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0130', note: 'Cite by book and line.'}),
      source({id: 'luc-cicero', type: 'primary-text', authors: ['Marcus Tullius Cicero'], title: 'Letters to Quintus', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://www.perseus.tufts.edu/hopper/searchresults?q=Cicero%20Letters%20to%20Quintus', note: 'The February 54 BCE letter (2.10.3) is the contemporary external reference normally associated with Lucretius.'}),
    ],
    defaultCitations: [c('luc-sep', 'section', '§§1–7'), c('luc-iep', 'section', 'Life and Works')],
    sectionCitations: {
      'biography-context': [c('luc-sep', 'section', '§1 Life'), c('luc-cicero', 'book-chapter', '2.10.3'), c('luc-iep', 'section', 'Life and Works')],
      'atoms-void': [c('luc-dnr', 'line', '1.146–482; 2.80–141'), c('luc-sep', 'section', '§§2–3')],
      swerve: [c('luc-dnr', 'line', '2.216–293'), c('luc-sep', 'section', '§4')],
      'death-superstition': [c('luc-dnr', 'line', '3.830–1094; 6.1–95'), c('luc-sep', 'section', '§5')],
      plague: [c('luc-dnr', 'line', '6.1138–1286'), c('luc-sep', 'section', '§1')],
    },
    evidence: evidence(
      [c('luc-sep', 'section', '§1 Life'), c('luc-cicero', 'book-chapter', '2.10.3')],
      [c('luc-dnr', 'line', '1.146–482; 2.216–293'), c('luc-sep', 'section', '§§2–5')],
      [c('luc-dnr', 'line', '1.1–148; 6.1138–1286'), c('luc-iep', 'section', 'The Poem')],
      [c('luc-sep', 'section', '§7 Reception'), c('luc-iep', 'section', 'Influence')],
      [c('luc-sep', 'section', '§1'), c('luc-iep', 'section', 'Life and Works')],
      [c('luc-dnr', 'line', '1.1–148'), c('luc-sep', 'section', '§§2–5')],
    ),
    patch: {
      lifespan: 'mid-90s–mid-50s BCE; chronology reconstructed', birthYear: -95, deathYear: -55,
      dateDisplay: 'mid-90s–mid-50s BCE; chronology reconstructed', dateConfidence: 'low',
      dateNote: 'The customary chronology is reconstructed from sparse evidence; Cicero’s February 54 BCE letter is the only contemporary external reference normally connected with Lucretius.',
      contributionSummary: 'Rendered Epicurean atomism and therapy in a six-book Latin poem, while leaving an exceptionally thin recoverable biography.',
      historicalContext: 'A late Republican Roman poet-philosopher presenting Greek Epicurean naturalism to a Latin readership amid political competition and religious anxiety.',
      lifeStory: 'Lucretius is known securely through De Rerum Natura and a single contemporary Ciceronian reference. Later sensational biographies are not reliable evidence.',
      beginnerExplanation: 'Lucretius uses poetry to ask whether fear of gods, death, and unlimited desire can be weakened by understanding a natural world of atoms and void.',
      mainIdeas: ['Atoms and void', 'The swerve and contested agency', 'Mortality and freedom from fear', 'Poetry as Epicurean therapy'],
      controversiesOrInterpretiveTensions: ['Biography and dates are sparse.', 'The poem’s final state is disputed.', 'The swerve’s role in agency remains contested.'],
    },
    reviewNotePath: 'docs/editorial/reviews/lucretius.md', reviewLock: 'fnv1a64:95a6afb8d7a062b1', reviewedOn: accessedOn,
  },
  pyrrho: {
    sources: [
      source({id: 'pyr-sep', type: 'scholarly-reference', authors: ['Richard Bett'], title: 'Pyrrho', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Spring 2024 archive', year: 2022, url: 'https://plato.stanford.edu/archives/spr2024/entries/pyrrho/'}),
      source({id: 'pyr-iep', type: 'scholarly-reference', authors: ['Harald Thorsrud'], title: 'Ancient Greek Skepticism', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/ancient-greek-skepticism/'}),
      source({id: 'pyr-dl', type: 'primary-text', authors: ['Diogenes Laertius'], title: 'Lives of Eminent Philosophers, Book IX', translator: 'R. D. Hicks', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0258%3Abook%3D9%3Achapter%3D11', note: 'Use chapter 11 sections; a late biographical witness.'}),
      source({id: 'pyr-eusebius', type: 'primary-text', authors: ['Eusebius of Caesarea'], title: 'Preparation for the Gospel, Book XIV', containerTitle: 'Early Christian Writings', url: 'https://www.tertullian.org/fathers/eusebius_pe_14_book14.htm', note: 'Preserves Aristocles’ report of Timon; use as a layered witness rather than direct Pyrrhonian text.'}),
    ],
    defaultCitations: [c('pyr-sep', 'section', '§§1–5'), c('pyr-iep', 'section', 'Pyrrho')],
    sectionCitations: {
      overview: [c('pyr-sep', 'section', '§§1–2'), c('pyr-dl', 'standard-division', '9.61–69')],
      'source-problem': [c('pyr-sep', 'section', '§1'), c('pyr-iep', 'section', 'Pyrrho'), c('pyr-dl', 'standard-division', '9.61–69')],
      timon: [c('pyr-eusebius', 'book-chapter', '14.18.1–5'), c('pyr-sep', 'section', '§2')],
      'aristocles-passage': [c('pyr-eusebius', 'book-chapter', '14.18.1–5'), c('pyr-sep', 'section', '§§2–3')],
      'later-pyrrhonism': [c('pyr-sep', 'section', '§4'), c('pyr-iep', 'section', 'Pyrrhonism')],
    },
    evidence: evidence(
      [c('pyr-sep', 'section', '§1'), c('pyr-dl', 'standard-division', '9.61–69')],
      [c('pyr-eusebius', 'book-chapter', '14.18.1–5'), c('pyr-sep', 'section', '§§2–4')],
      [c('pyr-dl', 'standard-division', '9.61–69; 9.106–108'), c('pyr-iep', 'section', 'Pyrrho')],
      [c('pyr-sep', 'section', '§4'), c('pyr-iep', 'section', 'Pyrrhonism')],
      [c('pyr-sep', 'section', '§§1–4'), c('pyr-eusebius', 'book-chapter', '14.18.1–5')],
      [c('pyr-dl', 'standard-division', '9.61–69'), c('pyr-sep', 'section', '§5')],
    ),
    patch: {
      lifespan: 'c. 365/360–c. 275/270 BCE; chronology approximate', birthYear: -365, deathYear: -270,
      dateDisplay: 'c. 365/360–c. 275/270 BCE; chronology approximate', dateConfidence: 'low',
      dateNote: 'Pyrrho’s conventional dates and life are reconstructed from much later evidence; no work by him survives.',
      contributionSummary: 'Provided a contested point of departure for later Pyrrhonian skepticism; the relation between his own stance and later suspension of judgment remains disputed.',
      historicalContext: 'A Hellenistic-era figure from Elis whose reputation was shaped by Timon, later biographical anecdotes, and subsequent skeptical traditions.',
      lifeStory: 'Pyrrho left no surviving writings. Ancient reports portray an unusual life and a skeptical attitude, but their evidential layers must not be collapsed into a direct biography.',
      beginnerExplanation: 'Pyrrho matters because he makes confidence itself a question: when rival claims cannot be settled, can withholding commitment reduce disturbance without secretly becoming another dogma?',
      mainIdeas: ['Uncertainty about how things are', 'Suspension and tranquility in later Pyrrhonism', 'Therapeutic skepticism', 'Source-critical reading of anecdotes'],
      controversiesOrInterpretiveTensions: ['Whether Pyrrho held doctrines or a practical attitude.', 'How far later Pyrrhonian procedure can be attributed to him.', 'The reliability of the India and indifference traditions.'],
    },
    reviewNotePath: 'docs/editorial/reviews/pyrrho.md', reviewLock: 'fnv1a64:428ae4cb6a14cd76', reviewedOn: accessedOn,
  },
  plato: {
    sources: [
      source({id: 'pla-sep', type: 'scholarly-reference', authors: ['Richard Kraut'], title: 'Plato', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2026, url: 'https://plato.stanford.edu/entries/plato/'}),
      source({id: 'pla-iep', type: 'scholarly-reference', authors: ['Thomas Brickhouse', 'Nicholas D. Smith'], title: 'Plato', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/plato/'}),
      source({id: 'pla-republic', type: 'primary-text', authors: ['Plato'], title: 'Republic', translator: 'Paul Shorey', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0168%3Abook%3D4', note: 'Use Stephanus divisions.'}),
      source({id: 'pla-dialogues', type: 'primary-text', authors: ['Plato'], title: 'Meno, Phaedo, Parmenides, Theaetetus, and Laws', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://www.perseus.tufts.edu/hopper/searchresults?q=Plato', note: 'Use dialogue title and Stephanus divisions; dialogues must not be treated as a uniform authorial creed.'}),
    ],
    defaultCitations: [c('pla-sep', 'section', '§§1–12'), c('pla-iep', 'section', 'Plato')],
    sectionCitations: {
      'historical-setting': [c('pla-sep', 'section', '§1'), c('pla-iep', 'section', 'Life')],
      'knowledge-forms': [c('pla-republic', 'standard-division', '5.476a–480a; 6.484a–509c'), c('pla-dialogues', 'standard-division', 'Meno 97a–98c; Phaedo 74a–80b')],
      'soul-education': [c('pla-republic', 'standard-division', '4.435b–444e; 7.514a–521b'), c('pla-sep', 'section', '§6')],
      'major-works-system-late': [c('pla-republic', 'standard-division', '4.435b–444e; 5.476a–480a; 6.484a–509c; 7.514a–521b'), c('pla-sep', 'section', '§§6–8')],
      'corpus-chronology-authorship': [c('pla-sep', 'section', '§2'), c('pla-iep', 'section', 'Works')],
      'late-dialogues': [c('pla-dialogues', 'standard-division', 'Parmenides 130a–135d; Theaetetus 151d–186e; Laws 7.803c–804a'), c('pla-sep', 'section', '§§9–11')],
      'major-works-early-middle': [c('pla-dialogues', 'standard-division', 'Meno 97a–98c; Phaedo 74a–80b'), c('pla-sep', 'section', '§§3–5')],
      'politics-gender-power': [c('pla-republic', 'standard-division', '5.449a–471c'), c('pla-dialogues', 'standard-division', 'Laws 7.803c–804a')],
    },
    evidence: evidence(
      [c('pla-sep', 'section', '§1'), c('pla-iep', 'section', 'Life')],
      [c('pla-republic', 'standard-division', '4.435b–444e; 5.476a–480a; 6.484a–509c'), c('pla-sep', 'section', '§§5–8')],
      [c('pla-dialogues', 'standard-division', 'Meno 97a–98c; Phaedo 74a–80b; Parmenides 130a–135d'), c('pla-sep', 'section', '§2')],
      [c('pla-sep', 'section', '§12'), c('pla-iep', 'section', 'Influence')],
      [c('pla-sep', 'section', '§§2, 5, 9–11'), c('pla-dialogues', 'standard-division', 'Parmenides 130a–135d; Theaetetus 151d–186e')],
      [c('pla-republic', 'standard-division', '7.514a–521b'), c('pla-dialogues', 'standard-division', 'Meno 97a–98c')],
    ),
    patch: {
      contributionSummary: 'Turned Socratic inquiry into dramatic philosophical writing that connects knowledge, reality, desire, education, and political judgment without yielding a single dialogue-independent creed.',
      historicalContext: 'An Athenian dialogue author of the fourth century BCE, formed by Socratic controversy and the political shocks of the late classical polis, who founded the Academy.',
      lifeStory: 'Plato’s death in 347 BCE is better anchored than his birth and many biographical episodes. The dialogues, rather than later biography, are the principal evidence for his philosophy.',
      beginnerExplanation: 'Plato asks why people disagree about justice and knowledge, then uses dramatic conversations to test whether appearances, definitions, education, and desire can be brought into better order.',
      mainIdeas: ['Dialectic and dramatic inquiry', 'Forms and intelligibility', 'Knowledge, true belief, and education', 'Justice in soul and city', 'Interpretive caution about dialogue voices'],
      controversiesOrInterpretiveTensions: ['A character’s speech is not automatically Plato’s final doctrine.', 'The chronology and development of the dialogues remain contested.', 'Forms, political proposals, and the relation of early to late dialogues admit competing readings.'],
    },
    reviewNotePath: 'docs/editorial/reviews/plato.md', reviewLock: 'fnv1a64:ee72a7f671b028fd', reviewedOn: accessedOn,
  },
  aristotle: {
    sources: [
      source({id: 'ari-sep', type: 'scholarly-reference', authors: ['Christopher Shields'], title: 'Aristotle', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2020, url: 'https://plato.stanford.edu/entries/aristotle/'}),
      source({id: 'ari-iep', type: 'scholarly-reference', authors: ['Justin Humphreys'], title: 'Aristotle', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/aristotle/'}),
      source({id: 'ari-ne', type: 'primary-text', authors: ['Aristotle'], title: 'Nicomachean Ethics', translator: 'H. Rackham', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0054%3Abook%3D1', note: 'Use book and chapter.'}),
      source({id: 'ari-met', type: 'primary-text', authors: ['Aristotle'], title: 'Metaphysics', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Aabo%3Atlg%2C0086%2C025%3A1', note: 'Use book and chapter.'}),
      source({id: 'ari-politics', type: 'primary-text', authors: ['Aristotle'], title: 'Politics', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://www.perseus.tufts.edu/hopper/searchresults?q=Aristotle%20Politics', note: 'Use book and chapter.'}),
    ],
    defaultCitations: [c('ari-sep', 'section', '§§1–13'), c('ari-iep', 'section', 'Aristotle')],
    sectionCitations: {
      'life-academy': [c('ari-sep', 'section', '§1'), c('ari-iep', 'section', 'Life')],
      'logic-science': [c('ari-sep', 'section', '§2'), c('ari-iep', 'section', 'Logic and Science')],
      substance: [c('ari-met', 'book-chapter', 'Z.1–17'), c('ari-sep', 'section', '§4')],
      'change-causes': [c('ari-met', 'book-chapter', 'A.1–10; Λ.6–10'), c('ari-sep', 'section', '§§3–4')],
      ethics: [c('ari-ne', 'book-chapter', '1.1–13; 2.1–6; 6.1–13'), c('ari-sep', 'section', '§8')],
      politics: [c('ari-politics', 'book-chapter', '1.1–13; 3.1–13'), c('ari-sep', 'section', '§10')],
      'transmission': [c('ari-sep', 'section', '§1'), c('ari-iep', 'section', 'Works')],
    },
    evidence: evidence(
      [c('ari-sep', 'section', '§1'), c('ari-iep', 'section', 'Life')],
      [c('ari-ne', 'book-chapter', '1.1–13; 2.1–6'), c('ari-met', 'book-chapter', 'Z.1–17')],
      [c('ari-ne', 'book-chapter', '1.1–13; 6.1–13'), c('ari-met', 'book-chapter', 'A.1–10')],
      [c('ari-sep', 'section', '§§12–13'), c('ari-iep', 'section', 'Influence')],
      [c('ari-sep', 'section', '§§1–4, 8, 10'), c('ari-politics', 'book-chapter', '1.1–13; 3.1–13')],
      [c('ari-ne', 'book-chapter', '1.1–13'), c('ari-iep', 'section', 'Recommended Reading')],
    ),
    patch: {
      contributionSummary: 'Developed systematic tools for logic, explanation, ethics, nature, and political life while criticizing Plato’s separate Forms; later corpus labels should not be mistaken for his own titles.',
      historicalContext: 'A fourth-century BCE thinker from Stagira who studied in Plato’s Academy, worked in the Aegean and Macedon, and founded the Lyceum at Athens.',
      lifeStory: 'Aristotle spent roughly two decades in Plato’s Academy before later research and teaching in Assos, Lesbos, Macedon, and Athens. Much of the surviving corpus is school material transmitted and edited after his death.',
      beginnerExplanation: 'Aristotle asks what makes something the kind of thing it is, how change can be explained, what counts as a good human life, and how careful inquiry moves from appearances to causes.',
      mainIdeas: ['Explanation through causes', 'Substance, potentiality, and actuality', 'Syllogistic and demonstrative inquiry', 'Virtue as habituated practical judgment', 'Nature, ethics, and politics as connected inquiries'],
      controversiesOrInterpretiveTensions: ['The surviving corpus has a complex transmission history.', '“Metaphysics” and “Organon” are later titles.', 'Teleology, slavery, women, and political hierarchy require critical historical reading rather than modern endorsement.'],
    },
    reviewNotePath: 'docs/editorial/reviews/aristotle.md', reviewLock: 'fnv1a64:1f09a940a610d621', reviewedOn: accessedOn,
  },
  diogenes: {
    sources: [
      source({id: 'dio-sep', type: 'scholarly-reference', authors: ['William Desmond'], title: 'Cynics', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/cynics/'}),
      source({id: 'dio-iep', type: 'scholarly-reference', authors: ['Julie Piering'], title: 'Diogenes of Sinope', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/diogenes-of-sinope/'}),
      source({id: 'dio-dl', type: 'primary-text', authors: ['Diogenes Laertius'], title: 'Lives of Eminent Philosophers, Book VI', translator: 'R. D. Hicks', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0258%3Abook%3D6', note: 'Use section divisions; an anecdotal late witness.'}),
      source({id: 'dio-epictetus', type: 'primary-text', authors: ['Epictetus'], title: 'Discourses', translator: 'George Long', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0236%3Atext%3Ddisc%3Abook%3D3%3Achapter%3D22', note: 'A later Stoic construction of the Cynic vocation, not direct biography.'}),
    ],
    defaultCitations: [c('dio-sep', 'section', '§§1–5'), c('dio-iep', 'section', 'Diogenes of Sinope')],
    sectionCitations: {
      sources: [c('dio-dl', 'standard-division', '6.20–81'), c('dio-sep', 'section', '§1'), c('dio-iep', 'section', 'Sources')],
      'socratic-inheritance': [c('dio-sep', 'section', '§2'), c('dio-iep', 'section', 'Antisthenes and Diogenes')],
      alexander: [c('dio-dl', 'standard-division', '6.38'), c('dio-iep', 'section', 'Anecdotes')],
      cosmopolitan: [c('dio-dl', 'standard-division', '6.63'), c('dio-sep', 'section', '§4')],
      'stoic-route': [c('dio-epictetus', 'book-chapter', '3.22'), c('dio-sep', 'section', '§5')],
    },
    evidence: evidence(
      [c('dio-sep', 'section', '§1'), c('dio-dl', 'standard-division', '6.20–81')],
      [c('dio-dl', 'standard-division', '6.38; 6.41; 6.63; 6.70–71'), c('dio-iep', 'section', 'Philosophy')],
      [c('dio-dl', 'standard-division', '6.20–81'), c('dio-iep', 'section', 'Sources')],
      [c('dio-sep', 'section', '§§4–5'), c('dio-epictetus', 'book-chapter', '3.22')],
      [c('dio-sep', 'section', '§§1–2'), c('dio-iep', 'section', 'Antisthenes and Diogenes')],
      [c('dio-dl', 'standard-division', '6.20–81'), c('dio-sep', 'section', '§5')],
    ),
    patch: {
      lifespan: 'c. 412/404–323 BCE; chronology uncertain', dateDisplay: 'c. 412/404–323 BCE; chronology uncertain', dateConfidence: 'low',
      dateNote: 'The conventional dates are reconstructed from late anecdotal sources; the direct relation to Antisthenes and details of exile remain disputed.',
      contributionSummary: 'A paradigmatic Cynic who used austere, public performance to expose artificial need and dependence on convention; anecdotes are evidence for reception as well as uncertain biography.',
      historicalContext: 'A fourth-century BCE Greek figure associated with the Cynic challenge to wealth, rank, shame, and local citizenship, known through later literary reports.',
      lifeStory: 'Diogenes is remembered through anecdotes rather than a securely surviving work. Their historical details vary, but their repeated practices—training, frank speech, reduced need, and reversal of shame—made him the emblematic Cynic.',
      beginnerExplanation: 'Diogenes asks which needs are real and which make us easy to control. His provocative life is an argument only if it reveals a dependence rather than merely winning attention.',
      mainIdeas: ['Askesis and reduced need', 'Frank speech before power', 'Nature and convention', 'Cosmopolitan provocation', 'Anecdotes as philosophically shaped evidence'],
      controversiesOrInterpretiveTensions: ['The Antisthenes-to-Diogenes succession is disputed.', 'Anecdotes cannot be read as transparent fact.', 'Provocation can reveal arbitrary convention or disregard the dignity of others.'],
    },
    reviewNotePath: 'docs/editorial/reviews/diogenes.md', reviewLock: 'fnv1a64:e4430d0a0a11a6e4', reviewedOn: accessedOn,
  },
  epicurus: {
    sources: [
      source({id: 'epi-sep', type: 'scholarly-reference', authors: ['David Konstan'], title: 'Epicurus', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2022, url: 'https://plato.stanford.edu/entries/epicurus/'}),
      source({id: 'epi-iep', type: 'scholarly-reference', authors: ['Tim O’Keefe'], title: 'Epicurus', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/epicur/'}),
      source({id: 'epi-dl', type: 'primary-text', authors: ['Diogenes Laertius'], title: 'Lives of Eminent Philosophers, Book X', translator: 'R. D. Hicks', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0258%3Abook%3D10%3Achapter%3D1', note: 'Preserves the letters and Principal Doctrines; cite by section.'}),
      source({id: 'epi-lucretius', type: 'primary-text', authors: ['Lucretius'], title: 'De Rerum Natura', translator: 'William Ellery Leonard', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0130', note: 'Later Latin Epicurean presentation; cite by book and line.'}),
    ],
    defaultCitations: [c('epi-sep', 'section', '§§1–8'), c('epi-iep', 'section', 'Epicurus')],
    sectionCitations: {
      'hellenistic-world': [c('epi-sep', 'section', '§1'), c('epi-iep', 'section', 'Life')],
      pleasure: [c('epi-dl', 'standard-division', '10.127–132'), c('epi-sep', 'section', '§3')],
      desires: [c('epi-dl', 'standard-division', '10.127–130'), c('epi-iep', 'section', 'Desires')],
      physics: [c('epi-dl', 'standard-division', '10.34–83'), c('epi-sep', 'section', '§4')],
      knowledge: [c('epi-dl', 'standard-division', '10.31–34; 10.124–127'), c('epi-sep', 'section', '§5')],
      'gods-death': [c('epi-dl', 'standard-division', '10.123–126'), c('epi-sep', 'section', '§6')],
      'surviving-works': [c('epi-dl', 'standard-division', '10.27–154'), c('epi-lucretius', 'line', '1.1–148')],
    },
    evidence: evidence(
      [c('epi-sep', 'section', '§1'), c('epi-dl', 'standard-division', '10.1–21')],
      [c('epi-dl', 'standard-division', '10.127–135; 10.139–154'), c('epi-sep', 'section', '§§3–6')],
      [c('epi-dl', 'standard-division', '10.27–154'), c('epi-lucretius', 'line', '1.1–148')],
      [c('epi-sep', 'section', '§8'), c('epi-iep', 'section', 'Influence')],
      [c('epi-sep', 'section', '§§3, 6–7'), c('epi-iep', 'section', 'Gods and Death')],
      [c('epi-dl', 'standard-division', '10.122–135; 10.139–154'), c('epi-iep', 'section', 'Recommended Reading')],
    ),
    patch: {
      contributionSummary: 'Explained how limited desire, friendship, natural explanation, and freedom from needless fear can support tranquility; he is not accurately summarized as an advocate of luxury or simple atheism.',
      historicalContext: 'A Hellenistic teacher who founded the Garden at Athens around 306 BCE and made a non-providential atomism answer practical fears about gods, death, desire, and security.',
      lifeStory: 'Born on Samos in 341 BCE, Epicurus taught in several cities before establishing the Garden at Athens. His principal surviving teachings come through letters and doctrines preserved in Diogenes Laertius.',
      beginnerExplanation: 'Epicurus asks what would be enough for a pleasant life. His answer combines modest bodily needs, friendship, careful choices, and arguments that remove fear of divine punishment and being dead.',
      mainIdeas: ['Pleasure as stable freedom from pain and disturbance', 'Natural and empty desires', 'Atoms and void without providence', 'Criteria of sensation, preconception, and feeling', 'Friendship and shared philosophical practice'],
      controversiesOrInterpretiveTensions: ['The status of Epicurean gods is disputed, but providence is rejected.', '“Live unnoticed” is not a simple command for isolation.', 'The role of the swerve in freedom remains contested.'],
    },
    reviewNotePath: 'docs/editorial/reviews/epicurus.md', reviewLock: 'fnv1a64:a376e5530fce554c', reviewedOn: accessedOn,
  },
  zeno: {
    sources: [
      source({id: 'zen-sep', type: 'scholarly-reference', authors: ['Marion Durand', 'Simon Shogry', 'Dirk Baltzly'], title: 'Stoicism', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', year: 2023, url: 'https://plato.stanford.edu/entries/stoicism/'}),
      source({id: 'zen-iep', type: 'scholarly-reference', authors: ['Massimo Pigliucci'], title: 'Stoicism', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/stoicism/'}),
      source({id: 'zen-dl', type: 'primary-text', authors: ['Diogenes Laertius'], title: 'Lives of Eminent Philosophers, Book VII', translator: 'R. D. Hicks', containerTitle: 'Perseus Digital Library', publisher: 'Tufts University', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0258%3Abook%3D7', note: 'A later source for Zeno’s life and early Stoic reports; cite by section.'}),
      source({id: 'zen-cicero', type: 'primary-text', authors: ['Marcus Tullius Cicero'], title: 'On Ends, Book III', translator: 'H. Rackham', containerTitle: 'LacusCurtius', publisher: 'University of Chicago', url: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cicero/de_Finibus/3%2A.html', note: 'A later Roman presentation of Stoic ethical distinctions, not a direct Zeno text.'}),
    ],
    defaultCitations: [c('zen-sep', 'section', '§§1–8'), c('zen-iep', 'section', 'Stoicism')],
    sectionCitations: {
      'hellenistic-athens': [c('zen-sep', 'section', '§1'), c('zen-iep', 'section', 'History')],
      'citium-arrival': [c('zen-dl', 'standard-division', '7.1–5'), c('zen-sep', 'section', '§1')],
      'crates-cynicism': [c('zen-dl', 'standard-division', '7.2–3'), c('zen-sep', 'section', '§1')],
      'painted-porch': [c('zen-dl', 'standard-division', '7.5'), c('zen-iep', 'section', 'History')],
      'three-parts': [c('zen-sep', 'section', '§2'), c('zen-iep', 'section', 'Logic, Physics, and Ethics')],
      'nature-good-life': [c('zen-cicero', 'book-chapter', '3.20–73'), c('zen-sep', 'section', '§§3–5')],
      republic: [c('zen-dl', 'standard-division', '7.32–34'), c('zen-sep', 'section', '§1')],
      fragments: [c('zen-sep', 'section', '§1'), c('zen-dl', 'standard-division', '7.1–34')],
    },
    evidence: evidence(
      [c('zen-dl', 'standard-division', '7.1–5'), c('zen-sep', 'section', '§1')],
      [c('zen-sep', 'section', '§§2–5'), c('zen-cicero', 'book-chapter', '3.20–73')],
      [c('zen-dl', 'standard-division', '7.1–34'), c('zen-sep', 'section', '§1')],
      [c('zen-sep', 'section', '§§7–8'), c('zen-iep', 'section', 'Influence')],
      [c('zen-sep', 'section', '§1'), c('zen-dl', 'standard-division', '7.1–34')],
      [c('zen-iep', 'section', 'Further Reading'), c('zen-cicero', 'book-chapter', '3.20–73')],
    ),
    patch: {
      lifespan: 'c. 334/332–262 BCE; chronology approximate', birthYear: -334, deathYear: -262,
      dateDisplay: 'c. 334/332–262 BCE; chronology approximate', dateConfidence: 'low',
      dateNote: 'Zeno’s dates and biography are reconstructed from later sources; his own writings survive only in fragments and reports.',
      contributionSummary: 'Founded the Stoic school at Athens and set its ethical direction, while later successors supplied much of the systematic logic, physics, and ethics conventionally called Stoicism.',
      historicalContext: 'A Cypriot-born teacher active in Hellenistic Athens around 300 BCE, who taught at the Painted Stoa after association with Cynic and other teachers.',
      lifeStory: 'Zeno came from Citium to Athens and established the school later called Stoic from its public meeting place. His works are lost, so biography and doctrine are reconstructed through later witnesses.',
      beginnerExplanation: 'Zeno begins a school that asks how a person can live well in a changing world. The durable Stoic answer links virtue, rational judgment, nature, and social concern—but much of its later technical system is not directly his text.',
      mainIdeas: ['Living in accordance with nature', 'Virtue and ethical independence', 'Cynic inheritance and Stoic transformation', 'Logic, physics, and ethics as later school architecture', 'Fragmentary evidence and cautious attribution'],
      controversiesOrInterpretiveTensions: ['Zeno’s own texts are lost.', 'The Republic is fragmentary and later testimony cannot yield a complete political blueprint.', 'Later Stoic systematization must not be projected wholesale onto the founder.'],
    },
    reviewNotePath: 'docs/editorial/reviews/zeno.md', reviewLock: 'fnv1a64:d66e40aa9d98ec8a', reviewedOn: accessedOn,
  },
};

/** Applies this sub-batch only when Sol registers it in the canonical editorial chain. */
export const applyClaimReviewBatchNextAEditorial = (record: Philosopher): Philosopher => {
  const config = configs[record.id];
  if (!config) return record;
  return applyModernClusterEditorialConfig(record, {
    ...config,
    articleSections: reviseSections(record, articleEdits[record.id]),
    sectionCitations: citationsFor(record, config),
  });
};
