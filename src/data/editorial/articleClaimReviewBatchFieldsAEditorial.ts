import type {
  ArticleSection,
  Branch,
  CitationLocatorKind,
  CitationReference,
  EditorialSource,
} from '../../types/philosophy';
import {citation as cite, paragraph as p, structuredClaim as claim} from './pilotHelpers';

/*
 * Isolated research-first material for eight canonical branch articles.
 *
 * Registered at the end of the branch pipeline after substantive review,
 * locator-level evidence routing, lock computation, and Museum reconciliation.
 */
const reviewedOn = '2026-08-10';
const reviewLocks: Record<string, string> = {
  epicureanism: 'fnv1a64:c7ae51e8397f48e0',
  cynicism: 'fnv1a64:759d32368819f315',
  skepticism: 'fnv1a64:fe65280ad564667f',
  deontology: 'fnv1a64:665610053c3c5992',
  utilitarianism: 'fnv1a64:87e051f44614feca',
  logic: 'fnv1a64:7500ea51a88e3072',
  'philosophy-of-language': 'fnv1a64:3049645f3ca11034',
  aesthetics: 'fnv1a64:c366cb4e15edefa2',
};

const c = (sourceId: string, kind: CitationLocatorKind, value: string, note?: string): CitationReference =>
  cite(sourceId, kind, value, note);
const source = (entry: Omit<EditorialSource, 'accessedOn'>): EditorialSource => ({...entry, accessedOn: reviewedOn});
const sep = (id: string, authors: string[], title: string, url: string, note: string): EditorialSource => source({
  id,
  type: 'scholarly-reference',
  authors,
  title,
  containerTitle: 'The Stanford Encyclopedia of Philosophy',
  editors: ['Edward N. Zalta', 'Uri Nodelman'],
  publisher: 'Metaphysics Research Lab, Stanford University',
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
const primary = (id: string, authors: string[], title: string, url: string, note: string, year?: number): EditorialSource => source({
  id,
  type: 'primary-text',
  authors,
  title,
  url,
  note,
  ...(year ? {year} : {}),
});
const scholarlyBook = (id: string, authors: string[], title: string, publisher: string, year: number, url: string, note: string): EditorialSource => source({
  id,
  type: 'scholarly-book',
  authors,
  title,
  publisher,
  year,
  url,
  note,
});

type ArticleEdits = Record<string, Record<number, string>>;
type Profile = {
  sources: EditorialSource[];
  citations: (sectionId: string) => CitationReference[];
  patch: Omit<Partial<Branch>, 'id' | 'articleSections' | 'editorial'>;
  edits: ArticleEdits;
  reviewNotePath: string;
};

type ClaimKey =
  | 'classification' | 'chronology' | 'definition' | 'purpose' | 'central-questions' | 'significance'
  | 'origin-story' | 'history' | 'concepts' | 'relationships' | 'figures' | 'works' | 'debates'
  | 'misunderstandings' | 'relevance' | 'readings';
type ClaimEvidence = Record<ClaimKey, CitationReference[]>;

const serialize = (value: unknown): string => typeof value === 'string' ? value : JSON.stringify(value) ?? 'null';
const all = (...citations: CitationReference[]) => citations;

const epicureanSources: EditorialSource[] = [
  primary('epi-dl', ['Diogenes Laertius'], 'Lives of Eminent Philosophers, Book X', 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0130:book=10', 'Principal surviving witness for the letters, doctrines, life notices, and testament; its late doxographical form is not treated as transparent biography.'),
  primary('epi-lucretius', ['Lucretius'], 'On the Nature of Things', 'https://www.gutenberg.org/ebooks/785', 'Roman poetic reception of Epicurean physics and therapy, cited by book and not substituted for the lost Greek corpus.', 55),
  sep('epi-sep', ['David Konstan'], 'Epicurus', 'https://plato.stanford.edu/entries/epicurus/', 'Specialist synthesis for the surviving sources, physics, epistemology, ethics, social thought, and interpretive disputes.'),
  iep('epi-iep', ["Tim O'Keefe"], 'Epicurus', 'https://iep.utm.edu/epicur/', 'Independent specialist overview for atomism, the criteria, pleasure, desire, friendship, and the anti-caricatured therapeutic project.'),
];

const cynicismSources: EditorialSource[] = [
  primary('cyn-dl', ['Diogenes Laertius'], 'Lives of Eminent Philosophers, Book VI', 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0130:book=6', 'Late source for Cynic anecdotes and succession stories; cited as testimony whose dramatic and polemical shaping needs caution.'),
  primary('cyn-epictetus', ['Epictetus'], 'Discourses', 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0236', 'Roman Stoic discussion of the ideal Cynic, used for later reception and not as unmediated evidence for fourth-century figures.'),
  iep('cyn-iep', ['Julie Piering'], 'Cynics', 'https://iep.utm.edu/cynics/', 'Specialist overview emphasizing Cynicism as a way of life, contested lineage, askesis, nature/convention, frank speech, cosmopolitanism, and legacy.'),
  sep('cyn-ancient-ethics', ['Richard Parry', 'Harald Thorsrud'], 'Ancient Ethical Theory', 'https://plato.stanford.edu/entries/ethics-ancient/', 'Independent account of the Cynics within ancient ethical debate, including the evidential problems surrounding their deeds and sayings.'),
];

const skepticismSources: EditorialSource[] = [
  primary('ske-sextus', ['Sextus Empiricus'], 'Outlines of Pyrrhonism', 'https://www.gutenberg.org/ebooks/17556', 'Primary source cited by book and section for Pyrrhonian inquiry, appearances, modes, suspension, and the practical life.'),
  primary('ske-cicero', ['Cicero'], 'Academica', 'https://www.gutenberg.org/ebooks/14970', 'Roman source for later Academic debate; cited with the reminder that it is an interlocutory and polemical witness rather than a transcript of the Academy.'),
  sep('ske-ancient-sep', ['Katja Vogt'], 'Ancient Skepticism', 'https://plato.stanford.edu/entries/skepticism-ancient/', 'Specialist source for the distinction and disputed relation between Academic and Pyrrhonian skepticism, their sources, and later reception.'),
  scholarlyBook('ske-cambridge', ['Richard Bett'], 'The Cambridge Companion to Ancient Scepticism', 'Cambridge University Press', 2010, 'https://www.cambridge.org/core/books/cambridge-companion-to-ancient-scepticism/4B6C2F726299788B5A866D2D358D840E', 'Independent scholarly collection used for source limitations, interpretive disputes, and the difference between ancient skeptical practices and modern epistemological reconstructions.'),
  sep('ske-modern-sep', ['Peter Klein'], 'Skepticism', 'https://plato.stanford.edu/entries/skepticism/', 'Specialist account of contemporary Humean, Cartesian, and Pyrrhonian skeptical arguments, used only where the article moves beyond ancient schools.'),
];

const deontologySources: EditorialSource[] = [
  primary('deo-kant', ['Immanuel Kant'], 'Groundwork of the Metaphysics of Morals', 'https://www.gutenberg.org/ebooks/5682', 'Primary text cited by the Preface and Sections I–III; the formulations of the categorical imperative are read in the argument rather than as detached decision rules.', 1785),
  primary('deo-ross', ['W. D. Ross'], 'The Right and the Good', 'https://global.oup.com/academic/product/the-right-and-the-good-9780198244912', 'Primary work for prima facie duties, actual duty, and the pluralist alternative to a single maximization principle.', 1930),
  sep('deo-sep', ['Larry Alexander', 'Michael Moore'], 'Deontological Ethics', 'https://plato.stanford.edu/entries/ethics-deontological/', 'Specialist survey of agent- and patient-centered theories, constraints, thresholds, contractualism, objections, and the relation to consequentialism.'),
  scholarlyBook('deo-oxford', ['Mark Timmons'], 'The Oxford Handbook of Deontological Ethics', 'Oxford University Press', 2013, 'https://doi.org/10.1093/oxfordhb/9780199671889.001.0001', 'Independent scholarly collection used for the plurality of contemporary deontological projects and their conflicts, not for the claim that all are Kantian.'),
];

const utilitarianSources: EditorialSource[] = [
  primary('uti-bentham', ['Jeremy Bentham'], 'An Introduction to the Principles of Morals and Legislation', 'https://www.gutenberg.org/ebooks/20084', 'Primary source for utility, felicific dimensions, legislative reform, and the classical hedonistic context.', 1789),
  primary('uti-mill', ['John Stuart Mill'], 'Utilitarianism', 'https://www.gutenberg.org/ebooks/11224', 'Primary source for the greatest-happiness principle, qualitative pleasures, sanctions, proof, justice, and the dispute over act and indirect readings.', 1863),
  sep('uti-history-sep', ['Julia Driver'], 'The History of Utilitarianism', 'https://plato.stanford.edu/entries/utilitarianism-history/', 'Specialist historical source for precursors, Bentham, Mill, Sidgwick, ideal and preference forms, and the limits of treating one version as the whole tradition.'),
  iep('uti-iep', ['Internet Encyclopedia of Philosophy'], 'History of Utilitarianism', 'https://iep.utm.edu/?p=36870', 'Independent historical overview used to cross-check the wider prehistory, Bentham’s canonical role, Mill’s revisions, and later variants.'),
  sep('uti-consequence-sep', ['Walter Sinnott-Armstrong'], 'Consequentialism', 'https://plato.stanford.edu/entries/consequentialism/', 'Conceptual source used to keep utilitarianism distinct from the broader family of consequentialist theories.'),
];

const logicSources: EditorialSource[] = [
  primary('log-aristotle', ['Aristotle'], 'Prior Analytics', 'http://classics.mit.edu/Aristotle/prior.html', 'Primary source for syllogistic and demonstration, cited by book and chapter without projecting modern truth-functional machinery back onto Aristotle.'),
  primary('log-frege', ['Gottlob Frege'], 'Begriffsschrift', 'https://www.loc.gov/item/07017784/', 'Primary landmark in the nineteenth-century formal turn; cited to distinguish its notation and quantificational analysis from an alleged invention of logic as such.', 1879),
  sep('log-classical-sep', ['Stewart Shapiro', 'Teresa Kouri Kissel'], 'Classical Logic', 'https://plato.stanford.edu/entries/logic-classical/', 'Specialist account of consequence, classical systems, alternative logics, model theory, proof theory, and disputes about logicality.'),
  iep('log-validity-iep', ['Internet Encyclopedia of Philosophy'], 'Validity and Soundness', 'https://iep.utm.edu/val-snd/', 'Independent account used for the crucial distinction between validity, soundness, true conclusions, and evidence for premises.'),
  sep('log-ontology-sep', ['Thomas Hofweber'], 'Logic and Ontology', 'https://plato.stanford.edu/entries/logic-ontology/', 'Specialist source for the plurality of logical projects and their relations to formal languages, natural language, and ontological commitment.'),
];

const languageSources: EditorialSource[] = [
  primary('lan-frege', ['Gottlob Frege'], 'On Sense and Reference', 'https://en.wikisource.org/wiki/On_Sense_and_Reference', 'Primary essay for the distinction between sense and reference; cited with its target in identity, cognitive significance, and indirect contexts.'),
  primary('lan-wittgenstein', ['Ludwig Wittgenstein'], 'Philosophical Investigations', 'https://www.gutenberg.org/ebooks/5740', 'Primary text for language-games, use, rules, and forms of life; it is not read as a one-sentence universal theory of meaning.', 1953),
  primary('lan-austin', ['J. L. Austin'], 'How to Do Things with Words', 'https://archive.org/details/howtodothingswit00aust', 'Primary lectures for speech acts, felicity, and the distinction between locutionary, illocutionary, and perlocutionary dimensions.', 1962),
  sep('lan-meaning-sep', ['Jeff Speaks'], 'Theories of Meaning', 'https://plato.stanford.edu/entries/meaning/', 'Specialist source distinguishing semantic theory from metasemantics and surveying reference, truth conditions, use, intention, convention, causal history, and charity.'),
  sep('lan-reference-sep', ['Eliot Michaelson'], 'Reference', 'https://plato.stanford.edu/entries/reference/', 'Independent specialist source for names, descriptions, indexicals, natural kinds, externalism, and contextual routes to reference.'),
  iep('lan-truth-iep', ['Internet Encyclopedia of Philosophy'], 'Semantic Theory of Truth', 'https://iep.utm.edu/s-truth/', 'Independent reference for truth-theoretic semantics and the relationship among formal languages, model theory, and philosophical interpretation.'),
];

const aestheticsSources: EditorialSource[] = [
  primary('aes-hume', ['David Hume'], 'Of the Standard of Taste', 'https://www.gutenberg.org/ebooks/4320', 'Primary essay for sentiment, the true judge, practice, comparison, prejudice, and the contested possibility of critical standards.'),
  primary('aes-kant', ['Immanuel Kant'], 'Critique of the Power of Judgment', 'https://www.gutenberg.org/ebooks/48433', 'Primary text for disinterested pleasure, reflective judgment, common validity, purposiveness, art, genius, and the sublime.', 1790),
  sep('aes-concept-sep', ['James Shelley'], 'The Concept of the Aesthetic', 'https://plato.stanford.edu/entries/aesthetic-concept/', 'Specialist source for the eighteenth-century disciplinary label and its later contested applications to objects, judgments, attitudes, experiences, and values.'),
  sep('aes-judgment-sep', ['Nick Zangwill'], 'Aesthetic Judgment', 'https://plato.stanford.edu/entries/aesthetic-judgment/', 'Specialist source for beauty, normativity, response, reasons, and debates over objectivity and testimony.'),
  iep('aes-iep', ['Barry Hartley Slater'], 'Aesthetics', 'https://iep.utm.edu/aesthetics/', 'Independent overview for art, beauty, expression, representation, interpretation, value, and the changing scope of the field.'),
];

const profiles: Record<string, Profile> = {
  epicureanism: {
    sources: epicureanSources,
    citations: (section) => {
      if (['overview', 'pleasure-desire', 'friendship-justice', 'gods-death', 'misunderstandings-reading'].includes(section)) return all(c('epi-dl', 'standard-division', 'Letter to Menoeceus §§121–135; Principal Doctrines I–V'), c('epi-sep', 'section', '§§4–6'));
      if (['garden', 'texts-practice', 'lucretius', 'hostility-revival'].includes(section)) return all(c('epi-dl', 'standard-division', 'Book X.1–21; Letters and Principal Doctrines'), c('epi-lucretius', 'book-chapter', 'Books I–VI'), c('epi-sep', 'section', '§§1–2; 6'));
      if (['atomism', 'knowledge'].includes(section)) return all(c('epi-dl', 'standard-division', 'Letter to Herodotus §§35–83; Letter to Pythocles §§85–116'), c('epi-sep', 'section', '§3'), c('epi-iep', 'section', 'Physics and epistemology'));
      if (section === 'rivals') return all(c('epi-sep', 'section', '§§3–5'), c('epi-iep', 'section', 'Ethics; social and political thought'));
      return all(c('epi-sep', 'section', '§§1–6'), c('epi-iep', 'section', 'Complete entry'));
    },
    patch: {
      category: 'Hellenistic school',
      shortDefinition: 'A Hellenistic school that joins atomist natural philosophy to a therapeutic ethics: pleasure is the good, chiefly as freedom from pain and disturbance, while friendship and limited desire support security.',
      oneSentencePurpose: 'Asks which fears and desires make a life needlessly dependent, and whether natural explanation, prudent choice, friendship, and recognized limits can make happiness more secure.',
      originPeriod: 'Hellenistic Greece; the Athenian Garden was established in 307/6 BCE',
      roughStartYear: -306,
      originStory: 'Epicurus taught at Mytilene and Lampsacus before establishing the Garden at Athens in 307/6 BCE. The school turned atomist explanation, criteria of inquiry, and an ethics of pleasure into a communal therapy against fear, rivalry, and unlimited desire.',
      historicalDevelopment: ['Epicurus established the Garden at Athens in 307/6 BCE after teaching in the eastern Greek world.', 'Later Epicurean communities, Philodemus’ Herculaneum writings, Diogenes of Oenoanda’s inscription, and Lucretius’ poem preserve and transform the school unevenly.', 'Early modern and later revivals draw on atomism, mortality, friendship, and the critique of luxury while often revising or omitting the ancient system.'],
      commonMisunderstandings: ['Epicurean pleasure is not a program of ever more intense consumption; it centrally names stable freedom from pain and disturbance.', 'Caution about public ambition is not isolation from others: friendship and communal practice are philosophically central.', 'Epicurean theology attacks fear-producing providence; it should not be reduced without argument to the simple claim that gods do not exist.'],
    },
    edits: {
      overview: {0: 'Epicureanism is a Hellenistic school organized around the claim that pleasure is the good and that the most reliable pleasure is freedom from bodily pain and mental disturbance. That claim belongs to a connected, though not fully preserved, system. Atomist physics loosens fear of providential intervention and postmortem punishment; an account of the criteria makes inquiry possible without treating every opinion as true; ethics classifies desires and choices; friendship supplies security; and communal practice makes simple living sustainable. The parts work together as therapy directed against anxiety, superstition, rivalry, and unlimited wanting.'},
      atomism: {1: 'The atomic “swerve,” especially prominent in Lucretius, names a minimal deviation in atomic motion. Its place in Epicurus’ own account of agency, and even its precise physical role, remains disputed. More securely, the school allows multiple natural explanations of distant celestial phenomena when available evidence cannot decide among them. The therapeutic aim is not a license for arbitrary belief but the removal of fear-producing supernatural explanations where decisive verification is unavailable. This differs from Stoic providence and Aristotelian teleology: nature has regular structures, but it is not organized as a rational plan aimed at human or cosmic purposes.'},
    },
    reviewNotePath: 'docs/editorial/reviews/epicureanism.md',
  },
  cynicism: {
    sources: cynicismSources,
    citations: (section) => {
      if (['overview', 'sources-origins', 'antisthenes', 'diogenes', 'crates-hipparchia'].includes(section)) return all(c('cyn-dl', 'standard-division', 'Book VI'), c('cyn-iep', 'section', '§§1–3'), c('cyn-ancient-ethics', 'section', '§5 Cynics'));
      if (['askesis', 'nature-convention', 'freedom-speech', 'cosmopolitanism', 'rival-paths'].includes(section)) return all(c('cyn-dl', 'standard-division', 'VI.20–72; VI.98–105'), c('cyn-iep', 'section', '§§3–4'));
      if (['reception-misreadings', 'reading'].includes(section)) return all(c('cyn-epictetus', 'standard-division', 'Discourses III.22'), c('cyn-iep', 'section', '§5'));
      return all(c('cyn-iep', 'section', '§§1–5'), c('cyn-ancient-ethics', 'section', '§5 Cynics'));
    },
    patch: {
      category: 'Ancient Greek way of life',
      shortDefinition: 'A contested ancient Greek ethical way of life that uses askesis, self-sufficiency, frank speech, and public reversal of convention to test whether status and artificial needs make people unfree.',
      oneSentencePurpose: 'Asks which needs, shames, and social honors are genuinely necessary for virtue and which instead make people dependent on opinion and power.',
      originPeriod: 'Fourth-century BCE Greek world; origins and succession stories are contested',
      roughStartYear: -400,
      originStory: 'Ancient stories connect Socrates, Antisthenes, Diogenes, Crates, and Zeno, but the evidence is late, anecdotal, and unable to settle a simple founder narrative. Diogenes becomes the defining figure of a recognizable repertoire of austere training, frank speech, nature-versus-convention critique, and cosmopolitan challenge.',
      historicalDevelopment: ['Fourth-century BCE figures associated with Cynicism are known chiefly through later anecdotes, sayings, and hostile or admiring reports.', 'Crates, Hipparchia, and Stoic reception helped transmit and recast Cynic themes of training, independence, frank speech, and cosmopolitanism.', 'Later ascetic, satirical, and popular uses often detach the school’s ethical discipline from its public critique; modern “cynicism” names something substantially different.'],
      commonMisunderstandings: ['Ancient Cynicism is not the modern disposition of assuming bad motives or expecting corruption.', 'Voluntary ascetic training is not a justification for deprivation imposed on others.', 'Shamelessness was a risky critical tactic against convention, not a warrant for cruelty, attention-seeking, or disregard for others.'],
    },
    edits: {
      'sources-origins': {0: 'Cynicism’s origins are difficult to reconstruct because the surviving sources are late, anecdotal, and often invested in producing neat philosophical successions. Antisthenes, a follower of Socrates, is often presented as a predecessor or founder, while Diogenes of Sinope becomes the tradition’s defining figure. Ancient chains connect Socrates to Antisthenes, Diogenes, Crates, and Zeno, giving Stoicism a Cynic ancestry. Historians cannot simply read that chain as a settled record of teacher-student relations, but it does register later arguments about what counted as Cynic inheritance.'},
      cosmopolitanism: {0: 'Diogenes is associated with calling himself a citizen of the world, a cosmopolitan, in a report preserved by Diogenes Laertius. The phrase challenges the idea that identity and obligation are exhausted by one city, legal status, or inherited community. For a figure represented as displaced from Sinope, it can also turn exclusion into a claim to broader belonging. Cynic cosmopolitanism is less a detailed program of global institutions than a refusal to let civic privilege define human worth.'},
    },
    reviewNotePath: 'docs/editorial/reviews/cynicism.md',
  },
  skepticism: {
    sources: skepticismSources,
    citations: (section) => {
      if (['overview', 'pyrrho', 'carneades', 'sextus', 'suspension', 'appearances-life', 'tranquility', 'dogmatism-rivals', 'misunderstandings-reading'].includes(section)) return all(c('ske-ancient-sep', 'section', '§§1–4'), c('ske-sextus', 'standard-division', 'Outlines I.1–30; I.164–209'), c('ske-cambridge', 'work', 'Selected chapters on Academic and Pyrrhonian skepticism'));
      if (section === 'academy') return all(c('ske-ancient-sep', 'section', '§3 Academic Skepticism'), c('ske-cicero', 'standard-division', 'Academica I–II'), c('ske-cambridge', 'chapter', 'Academic skepticism'));
      if (section === 'early-modern') return all(c('ske-ancient-sep', 'section', '§5'), c('ske-modern-sep', 'section', '§§1–6'));
      if (section === 'epistemology') return all(c('ske-modern-sep', 'section', '§§1–6'), c('ske-ancient-sep', 'section', '§1; §5'));
      return all(c('ske-ancient-sep', 'section', '§§1–5'), c('ske-cambridge', 'work', 'Whole volume'));
    },
    patch: {
      category: 'Family of skeptical practices and arguments',
      shortDefinition: 'A family of ancient and modern practices and arguments that test claims to knowledge or justified assent, distinguish forms of uncertainty, and sometimes recommend suspension of judgment rather than a settled negative doctrine.',
      oneSentencePurpose: 'Asks what licenses assent when appearances, arguments, testimony, or standards of proof conflict, and what responsible inquiry and action can look like when that license is unavailable.',
      originPeriod: 'Ancient Greek inquiry; Academic and Pyrrhonian movements emerge chiefly in the Hellenistic period',
      roughStartYear: -300,
      originStory: 'Ancient skepticism is not one doctrine founded at one date. Academic skepticism developed within Plato’s Academy, while Pyrrhonian practice retrospectively invokes Pyrrho and receives its fullest surviving articulation in Sextus Empiricus; their relation and respective commitments remain disputed.',
      historicalDevelopment: ['Academic and Pyrrhonian movements begin chiefly in the third century BCE and debate Stoic criteria, belief, appearance, action, and tranquility in different ways.', 'Sextus Empiricus’ late surviving works preserve the fullest Pyrrhonian argumentative repertoire, while evidence for earlier figures and the Academy is indirect and contested.', 'Montaigne, Descartes, Hume, and contemporary epistemology transform ancient skeptical materials into new problems about induction, the external world, closure, justification, and ordinary knowledge.'],
      commonMisunderstandings: ['Skepticism is not simply the thesis that nothing can be known; Pyrrhonists aim to avoid affirming even that conclusion.', 'Ancient skepticism is not modern cynicism, relativism, strategic denialism, or indiscriminate doubt.', 'Suspension of judgment concerns unresolved reasons; it does not forbid ordinary responsiveness, practical skill, or attention to strong evidence.'],
    },
    edits: {
      overview: {0: 'Philosophical skepticism is not simply the belief that nothing can be known. It is a family of practices and arguments that test claims to knowledge or assent, expose unresolved conflict, and ask what follows when inquiry does not justify a settled position. Ancient skeptical traditions differ sharply. Academic skeptics developed within Plato’s Academy and challenged Stoic claims to certainty, sometimes developing practical standards short of knowledge. Pyrrhonian skeptics avoid dogmatic conclusions in either direction and continue investigating while suspending judgment where opposing considerations remain balanced.'},
      academy: {2: 'Academic and Pyrrhonian skepticism should not be collapsed into one position. Sextus portrays Academics as making claims about the impossibility of knowledge while presenting Pyrrhonists as suspending even that conclusion; historians debate whether this contrast does justice to the Academy and its changing phases. The disagreement reveals a recurring skeptical danger: criticism of dogmatism can harden into a negative doctrine. Different skeptics therefore disagree about what, if anything, may be asserted after a criterion of truth has been challenged.'},
    },
    reviewNotePath: 'docs/editorial/reviews/skepticism.md',
  },
  deontology: {
    sources: deontologySources,
    citations: (section) => {
      if (['overview', 'key-concepts', 'internal-debates', 'neighbors', 'misunderstandings', 'modern-relevance'].includes(section)) return all(c('deo-sep', 'section', '§§1–5'), c('deo-oxford', 'work', 'Selected chapters on constraints, rights, pluralism, and thresholds'));
      if (['historical-development', 'figures-works', 'reading-path'].includes(section)) return all(c('deo-kant', 'standard-division', 'Preface; Sections I–III'), c('deo-ross', 'chapter', 'Chapters II–III'), c('deo-sep', 'section', '§2.4'));
      return all(c('deo-sep', 'section', '§§1–6'), c('deo-oxford', 'work', 'Whole volume'));
    },
    patch: {
      category: 'Family of normative ethical theories',
      shortDefinition: 'A family of normative theories that treats some actions as required, forbidden, or permitted for reasons not exhausted by producing the best aggregate outcome, including duties, rights, constraints, special obligations, and justifiability to persons.',
      oneSentencePurpose: 'Asks what agents owe particular people, what limits apply to using or harming them, and how duties, permissions, rights, and consequences should be justified when they conflict.',
      originPeriod: 'Duties have many histories; “deontology” is a modern label applied to diverse eighteenth-century and later theories',
      roughStartYear: 1785,
      originStory: 'Duties, prohibitions, roles, and obligations long predate the label “deontology.” Kant’s late-eighteenth-century account of autonomy is a central source for modern ethical theory, but rights theories, Rossian pluralism, contractualism, and agent-centered constraints are not reducible to one Kantian template.',
      historicalDevelopment: ['Ancient, religious, natural-law, and social traditions develop varied accounts of obligation, role, permission, and prohibition before the modern label.', 'Kant’s Groundwork (1785), later moral and legal writings, and nineteenth- and twentieth-century debates make autonomy, dignity, rights, constraints, and justification central reference points.', 'Rossian pluralism, rights theories, contractualism, feminist and care critiques, applied ethics, and political theory dispute which duties bind, how conflicts work, and how institutions should respect persons.'],
      commonMisunderstandings: ['Deontology is not equivalent to following a context-free rulebook; many deontologists recognize conflicts, permissions, defeasible duties, and thresholds.', 'Not every appeal to a right is deontological, and not every deontological theory is Kantian.', 'Respect for autonomy is not mere consumer choice or isolated self-sufficiency; agency can depend on care, education, material security, and freedom from domination.'],
    },
    edits: {
      'historical-development': {0: 'Duties long predate the modern label “deontology.” Ancient, religious, natural-law, and social traditions all distinguish obligations, permissions, roles, and prohibitions, though they ground them differently. Modern deontology becomes especially recognizable in Kant’s attempt to explain morality through rational autonomy rather than command, sentiment, or the pursuit of happiness. In the Groundwork, a good will acts from duty because it recognizes a law it can rationally will. Kant presents the universal-law, humanity, and realm-of-ends formulations as formulations of one categorical imperative, while scholars dispute how exactly their relations and applications should be understood. They should not be treated as unrelated rules or as a mechanically complete decision procedure.'},
      overview: {1: 'Kant is a central source for modern deontological ethics in this atlas, but deontology is broader than Kant and far broader than a list of rigid rules. Contemporary theories include agent-centered constraints, patient-centered rights, contractualist tests of justifiability, plural duties, special obligations, and threshold views that permit consequences to matter when stakes become extreme. These approaches disagree about why constraints bind, whether they are absolute, how duties conflict, and what separates doing harm from allowing it. Their shared question is not whether consequences matter. It is whether consequences are the only morally fundamental consideration, or whether respect, agency, relationship, and the form of action also have independent authority.'},
    },
    reviewNotePath: 'docs/editorial/reviews/deontology.md',
  },
  utilitarianism: {
    sources: utilitarianSources,
    citations: (section) => {
      if (['overview', 'key-concepts', 'internal-debates', 'neighbors', 'misunderstandings', 'modern-relevance'].includes(section)) return all(c('uti-history-sep', 'section', '§§1–5'), c('uti-consequence-sep', 'section', '§§1–5'));
      if (section === 'historical-development') return all(c('uti-bentham', 'chapter', 'Chapters I–IV'), c('uti-mill', 'chapter', 'Chapters II, IV–V'), c('uti-history-sep', 'section', '§§1–4'));
      if (['figures-works', 'reading-path'].includes(section)) return all(c('uti-bentham', 'work', 'Whole work'), c('uti-mill', 'work', 'Whole work'), c('uti-iep', 'section', 'Bentham, Mill, and later developments'));
      return all(c('uti-history-sep', 'section', '§§1–5'), c('uti-iep', 'section', 'Complete entry'));
    },
    patch: {
      category: 'Family of consequentialist ethical theories',
      shortDefinition: 'A family of consequentialist theories that evaluates options by their effects on welfare or another specified account of well-being, gives each affected interest impartial consideration, and normally directs agents or institutions to promote the best available outcome.',
      oneSentencePurpose: 'Asks how much preventable good and harm each alternative creates for everyone affected, while making the welfare measure, uncertainty, distribution, and institutional side effects open to criticism.',
      originPeriod: 'Eighteenth- and nineteenth-century British and European debates, with earlier antecedents and continuing global variants',
      roughStartYear: 1789,
      originStory: 'Ideas resembling utility-based moral assessment have earlier histories, but Bentham’s 1789 Introduction gives classical utilitarianism a systematic and explicitly reforming formulation. Mill, Sidgwick, ideal, preference, rule, indirect, and population-focused approaches then revise its account of value, decision, institutions, and justice.',
      historicalDevelopment: ['Earlier moralists and theological writers develop positions with affinities to utility, but Bentham provides the canonical systematic statement of classical utilitarianism in 1789.', 'Mill revises the classical tradition through qualitative pleasures, liberty, individuality, justice, and social reform; Sidgwick develops a more systematic nineteenth-century examination.', 'Twentieth- and twenty-first-century forms dispute acts and rules, hedonism and preference or objective-list value, expected outcomes, demandingness, rights, distribution, animals, future people, and population ethics.'],
      commonMisunderstandings: ['Utilitarianism is impartial rather than egoistic: the agent’s welfare has no automatic priority over comparable interests of others.', 'Consequentialism is broader than utilitarianism; a theory can evaluate consequences without making welfare the central value.', 'The theory is not a single arithmetic recipe: the account of welfare, decision procedure, uncertainty, distribution, and population can alter conclusions substantially.'],
    },
    edits: {
      'historical-development': {0: 'Utilitarian thought has pre-Bentham antecedents, including theological and moral-sentimental debates, but Bentham’s An Introduction to the Principles of Morals and Legislation (1789) supplies the canonical systematic statement of classical utilitarianism. It turns utility into a reforming standard for law and policy, identifies value with pleasure and pain, and asks legislators to compare foreseeable effects on all affected people. Bentham’s familiar “felicific calculus” identifies dimensions of pleasure and pain; it does not by itself solve the philosophical problems of interpersonal comparison, uncertainty, distribution, or institutional trust.'},
      overview: {0: 'Utilitarianism is a family of consequentialist theories organized around impartial concern for the well-being of those affected. Classical versions identify welfare with pleasure and absence of pain; later versions appeal to preferences, objective goods, or plural values. What makes a view utilitarian is not merely that it values good consequences. It normally combines an account of welfare with equal consideration and a requirement to promote the best available outcome, although theorists disagree about whether acts, rules, motives, institutions, or decision procedures bear that requirement most directly.'},
    },
    reviewNotePath: 'docs/editorial/reviews/utilitarianism.md',
  },
  logic: {
    sources: logicSources,
    citations: (section) => {
      if (['overview', 'key-concepts', 'misunderstandings', 'reading-path'].includes(section)) return all(c('log-classical-sep', 'section', '§§1–4'), c('log-validity-iep', 'section', 'Validity and soundness'));
      if (section === 'historical-development') return all(c('log-aristotle', 'book-chapter', 'Book I, chapters 1–7'), c('log-frege', 'work', 'Preface and Part I'), c('log-classical-sep', 'section', '§§1–2'));
      if (['figures-works', 'internal-debates', 'neighbors', 'modern-relevance'].includes(section)) return all(c('log-classical-sep', 'section', '§§2–5'), c('log-ontology-sep', 'section', '§2'));
      return all(c('log-classical-sep', 'section', '§§1–5'), c('log-validity-iep', 'section', 'Complete entry'));
    },
    patch: {
      category: 'Field and family of formal methods',
      shortDefinition: 'A field that studies consequence, validity, proof, consistency, formal languages, and related norms of inference, while disputing which structures are genuinely logical and whether one logic or many are correct for different purposes.',
      oneSentencePurpose: 'Asks when a conclusion follows from premises, how that relation can be represented or proved, what a formal system commits us to, and how logical tools aid rather than replace inquiry into true premises and apt concepts.',
      originPeriod: 'Multiple ancient and medieval traditions; modern symbolic logic develops chiefly in the nineteenth and twentieth centuries',
      roughStartYear: -350,
      originStory: 'Aristotle’s syllogistic is a major surviving Greek landmark, but logic has plural histories of argument, debate, grammar, proof, and inference. Nineteenth-century work by figures including Boole, Frege, Peano, and later logicians radically expanded formal notation, quantification, semantics, and metatheory without inventing reasoning itself.',
      historicalDevelopment: ['Ancient Greek, Indian, Chinese, and other traditions develop sophisticated practices of inference, debate, classification, and proof that should not be reduced to preliminary versions of one modern calculus.', 'Aristotelian and Stoic materials, late-antique and medieval Arabic, Latin, Jewish, and other logical traditions preserve and transform distinct questions about terms, propositions, consequence, modality, and demonstration.', 'Nineteenth- and twentieth-century symbolic logic develops quantification, set-theoretic and proof-theoretic methods, model theory, computability, modal and nonclassical systems, and philosophical disputes over logicality.'],
      commonMisunderstandings: ['Validity concerns the relation between premises and conclusion; a valid argument can have false premises, while a true conclusion can be reached by invalid reasoning.', 'Logic is not identical with psychology, rhetoric, programming, mathematics, or critical thinking, even though it overlaps with each.', 'Formal systems do not automatically decide which premises are true, which concepts are apt, or which practical ends should guide inquiry.'],
    },
    edits: {
      overview: {0: 'Logic studies consequence, proof, consistency, and the structures that make some inferences valid. At a basic deductive level, an argument is valid when its premises could not all be true while its conclusion is false; soundness adds the further requirement that the premises are true. Logic can therefore display what follows from assumptions without establishing those assumptions for us. Contemporary work also studies formal languages, semantics, proof systems, model theory, computability, modalities, and nonclassical alternatives. These projects overlap, but they are not one method or one settled theory of rational thought.'},
      'historical-development': {0: 'Histories of logic cannot begin and end with one European sequence. Aristotle’s syllogistic and Stoic propositional reasoning are major ancient Greek landmarks; Indian traditions develop sustained theories of inference and debate; Chinese texts develop distinctive accounts of names, distinctions, argument, and disputation; and Arabic, Latin, Jewish, Byzantine, and later European traditions preserve, translate, contest, and extend logical materials. Comparing these traditions can be illuminating only when it does not force every practice into the categories of modern formal logic or treat transmission as a one-way story.'},
    },
    reviewNotePath: 'docs/editorial/reviews/logic.md',
  },
  'philosophy-of-language': {
    sources: languageSources,
    citations: (section) => {
      if (['overview', 'internal-debates', 'neighbors', 'misunderstandings', 'modern-relevance', 'reading-path'].includes(section)) return all(c('lan-meaning-sep', 'section', '§§1–3'), c('lan-reference-sep', 'section', '§§1–7'));
      if (section === 'key-concepts') return all(c('lan-meaning-sep', 'section', '§§1–3'), c('lan-reference-sep', 'section', '§§1–7'), c('lan-truth-iep', 'section', '§§1–5'));
      if (section === 'historical-development') return all(c('lan-frege', 'work', 'Complete essay'), c('lan-wittgenstein', 'standard-division', '§§1–88; §§138–242'), c('lan-meaning-sep', 'section', '§§2–3'));
      if (section === 'figures-works') return all(c('lan-frege', 'work', 'Complete essay'), c('lan-wittgenstein', 'standard-division', '§§1–88; §§138–242'), c('lan-austin', 'work', 'Lectures I–XII'));
      return all(c('lan-meaning-sep', 'section', '§§1–3'), c('lan-truth-iep', 'section', '§§1–5'));
    },
    patch: {
      category: 'Field of inquiry',
      shortDefinition: 'A field that studies meaning, reference, truth, speech, interpretation, linguistic practice, and the social conditions under which words can represent, communicate, authorize, exclude, or mislead.',
      oneSentencePurpose: 'Asks how expressions acquire content and reference, how utterances do things beyond describing, how interpretation is constrained, and how language links thought, formal structure, shared practice, history, and power.',
      originPeriod: 'Ancient and medieval inquiries into names, signs, grammar, rhetoric, and interpretation; a modern field consolidates in the late nineteenth and twentieth centuries',
      roughStartYear: 1879,
      originStory: 'Questions about names, signs, truth, rhetoric, grammar, interpretation, and speech have many histories. Frege’s Begriffsschrift (1879) and “On Sense and Reference” are central to the modern analytic formation of the field, but later ordinary-language, pragmatic, hermeneutic, feminist, social, and decolonial work revises both its methods and its object.',
      historicalDevelopment: ['Ancient and medieval traditions ask how names signify, how statements can be true or false, how equivocation works, and how texts and speakers should be interpreted.', 'Frege, Russell, early Wittgenstein, and logical empiricism make logical form, reference, truth, and representation central to a modern analytic research program.', 'Later Wittgenstein, Austin, Grice, Davidson, Kripke, Quine, hermeneutics, deconstruction, feminist philosophy, and social epistemology widen the field toward use, action, context, history, uptake, injustice, and institutions.'],
      commonMisunderstandings: ['Language does more than label objects: it can quantify, imply, question, command, promise, authorize, and contest.', '“Meaning as use” is not a universal one-line definition or a license for words to mean anything a speaker chooses.', 'Interpretation is neither mechanical decoding nor unconstrained invention; convention, intention, context, history, evidence, and power can constrain it in different ways.'],
    },
    edits: {
      overview: {0: 'Philosophy of language asks how words and other signs mean, refer, represent, communicate, and act. It studies names, descriptions, indexicals, predicates, sentences, context, truth, assertion, presupposition, implicature, interpretation, and the social practices in which such distinctions work. The field is not limited to a theory of how labels attach to objects. It also asks how a speaker can make a promise, issue an order, slur, joke, testify, apologize, or alter institutional standing, and why a formally well-formed sentence can still mislead or fail to communicate.'},
      'historical-development': {0: 'Questions now grouped under philosophy of language have histories longer than the modern field name. Greek, Indian, Chinese, Arabic, Latin, Jewish, Christian, Islamic, and other traditions examine names, signs, grammar, rhetoric, interpretation, testimony, translation, and the relation between words, thought, and things through distinctive categories and aims. The modern analytic formation of philosophy of language is especially shaped by nineteenth- and early-twentieth-century work on logic, reference, and formal representation, but it should not be narrated as the first time philosophy noticed language.'},
    },
    reviewNotePath: 'docs/editorial/reviews/philosophy-of-language.md',
  },
  aesthetics: {
    sources: aestheticsSources,
    citations: (section) => {
      if (['overview', 'historical-setting', 'core-concepts', 'analytic-debates', 'internal-debates', 'misunderstandings', 'modern-relevance', 'reading-path'].includes(section)) return all(c('aes-concept-sep', 'section', '§§1–2'), c('aes-iep', 'section', 'Complete entry'));
      if (section === 'taste-and-judgment') return all(c('aes-hume', 'work', 'Complete essay'), c('aes-kant', 'standard-division', '§§1–22; §§39–60'), c('aes-judgment-sep', 'section', '§§1–4'));
      if (['nineteenth-century', 'phenomenology-pragmatism', 'feminist-social'].includes(section)) return all(c('aes-concept-sep', 'section', '§§1–2'), c('aes-judgment-sep', 'section', '§§1–4'), c('aes-iep', 'section', 'Art, expression, interpretation, and value'));
      return all(c('aes-concept-sep', 'section', '§§1–2'), c('aes-iep', 'section', 'Complete entry'));
    },
    patch: {
      category: 'Field of inquiry',
      shortDefinition: 'A field that studies beauty, art, taste, form, representation, expression, aesthetic experience, interpretation, and value, together with the social histories and institutions that shape what becomes perceptible or counts as excellent.',
      oneSentencePurpose: 'Asks how perceptual and imaginative responses can be assessed with reasons, what art and aesthetic experience are, and how form, context, history, power, and value interact without one universal test.',
      originPeriod: 'Questions about art, beauty, making, performance, and cultivated perception have many histories; “aesthetics” becomes a European disciplinary term in the eighteenth century',
      roughStartYear: 1735,
      originStory: 'Reflection on beauty, poetry, image, music, performance, craft, landscape, and sensory judgment predates the modern field by many centuries and takes diverse forms. Baumgarten’s eighteenth-century use of “aesthetics,” followed by theories of taste, disinterest, beauty, and sublimity, helps form a European discipline but is not the origin of all aesthetic thought.',
      historicalDevelopment: ['Ancient Greek and many other traditions connect beauty, making, sound, representation, ritual, education, nature, and cultivated perception without presupposing a separate modern fine-art field.', 'Eighteenth-century European theories of sensible cognition and taste help establish aesthetics as a named discipline focused on beauty, judgment, pleasure, disinterest, artistic genius, and the sublime.', 'Nineteenth- through twenty-first-century analytic, phenomenological, pragmatist, hermeneutic, feminist, disability, racial, environmental, everyday, digital, and decolonial work disputes definition, experience, interpretation, value, autonomy, institutions, and power.'],
      commonMisunderstandings: ['Aesthetics is not only about prettiness; it includes ugliness, sublimity, humor, horror, difficulty, form, sensory meaning, and the aesthetic dimensions of ordinary environments.', 'Aesthetics and philosophy of art overlap but are not identical: the former reaches beyond artworks, while the latter includes non-aesthetic questions about them.', 'Aesthetic and artistic value are not reducible to personal preference, popularity, price, technical difficulty, or artist sincerity.'],
    },
    edits: {
      overview: {0: 'Aesthetics studies beauty, art, taste, form, representation, expression, aesthetic experience, interpretation, and value. Its questions arise wherever people make and assess images, sounds, performances, objects, environments, rituals, and designed spaces, but the modern field’s vocabulary is historically situated. To ask whether something is beautiful, moving, expressive, artful, ugly, kitsch, sublime, or aesthetically valuable is not merely to report a private preference. Such judgments ordinarily point to features, comparisons, histories, practices, and standards, even though philosophers disagree about how those reasons secure authority.'},
      'historical-setting': {0: 'Questions about beauty, making, poetry, image, music, performance, and cultivated perception have many histories. Ancient Greek debates are one influential archive, but they should not become the default origin story for every aesthetic vocabulary. Premodern and non-European traditions develop distinctive accounts of sound, image, craft, ritual, landscape, embodiment, and perception whose concepts do not simply translate into modern Western “art” or “aesthetics.” The term aesthetics became a distinct European philosophical label in the eighteenth century, especially around sensible cognition and taste; that disciplinary history matters without deciding where serious reflection on art or beauty begins.'},
    },
    reviewNotePath: 'docs/editorial/reviews/aesthetics.md',
  },
};

const claimSections: Record<string, Record<ClaimKey, string>> = {
  epicureanism: {classification: 'overview', chronology: 'garden', definition: 'overview', purpose: 'overview', 'central-questions': 'overview', significance: 'pleasure-desire', 'origin-story': 'garden', history: 'hostility-revival', concepts: 'knowledge', relationships: 'rivals', figures: 'texts-practice', works: 'texts-practice', debates: 'atomism', misunderstandings: 'misunderstandings-reading', relevance: 'hostility-revival', readings: 'misunderstandings-reading'},
  cynicism: {classification: 'overview', chronology: 'sources-origins', definition: 'overview', purpose: 'overview', 'central-questions': 'nature-convention', significance: 'freedom-speech', 'origin-story': 'sources-origins', history: 'reception-misreadings', concepts: 'askesis', relationships: 'rival-paths', figures: 'crates-hipparchia', works: 'reading', debates: 'nature-convention', misunderstandings: 'reception-misreadings', relevance: 'freedom-speech', readings: 'reading'},
  skepticism: {classification: 'overview', chronology: 'overview', definition: 'overview', purpose: 'overview', 'central-questions': 'suspension', significance: 'epistemology', 'origin-story': 'pyrrho', history: 'early-modern', concepts: 'suspension', relationships: 'dogmatism-rivals', figures: 'academy', works: 'sextus', debates: 'appearances-life', misunderstandings: 'misunderstandings-reading', relevance: 'epistemology', readings: 'misunderstandings-reading'},
  deontology: {classification: 'overview', chronology: 'historical-development', definition: 'overview', purpose: 'overview', 'central-questions': 'key-concepts', significance: 'modern-relevance', 'origin-story': 'historical-development', history: 'historical-development', concepts: 'key-concepts', relationships: 'neighbors', figures: 'figures-works', works: 'figures-works', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'reading-path'},
  utilitarianism: {classification: 'overview', chronology: 'historical-development', definition: 'overview', purpose: 'overview', 'central-questions': 'key-concepts', significance: 'modern-relevance', 'origin-story': 'historical-development', history: 'historical-development', concepts: 'key-concepts', relationships: 'neighbors', figures: 'figures-works', works: 'figures-works', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'reading-path'},
  logic: {classification: 'overview', chronology: 'historical-development', definition: 'overview', purpose: 'overview', 'central-questions': 'key-concepts', significance: 'modern-relevance', 'origin-story': 'historical-development', history: 'historical-development', concepts: 'key-concepts', relationships: 'neighbors', figures: 'figures-works', works: 'figures-works', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'reading-path'},
  'philosophy-of-language': {classification: 'overview', chronology: 'historical-development', definition: 'overview', purpose: 'overview', 'central-questions': 'key-concepts', significance: 'modern-relevance', 'origin-story': 'historical-development', history: 'historical-development', concepts: 'key-concepts', relationships: 'neighbors', figures: 'figures-works', works: 'figures-works', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'reading-path'},
  aesthetics: {classification: 'overview', chronology: 'historical-setting', definition: 'overview', purpose: 'overview', 'central-questions': 'core-concepts', significance: 'modern-relevance', 'origin-story': 'historical-setting', history: 'historical-setting', concepts: 'core-concepts', relationships: 'internal-debates', figures: 'nineteenth-century', works: 'analytic-debates', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'reading-path'},
};

const reviseSections = (record: Branch, profile: Profile): ArticleSection[] => (record.articleSections ?? []).map((section) => ({
  ...section,
  paragraphs: section.paragraphs.map((paragraph, index) => {
    const original = typeof paragraph === 'string' ? paragraph : paragraph.text;
    return p(`${record.id}-${section.id}-${index + 1}`, profile.edits[section.id]?.[index] ?? original, profile.citations(section.id));
  }),
}));

const evidenceFor = (record: Branch, profile: Profile): ClaimEvidence => {
  const sections = claimSections[record.id];
  if (!sections) throw new Error(`Missing structured-claim evidence map for ${record.id}`);
  return Object.fromEntries(Object.entries(sections).map(([key, sectionId]) => [key, profile.citations(sectionId)])) as ClaimEvidence;
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

/** Applies the integrated eight-article claim-review overlay. */
export const applyArticleClaimReviewBatchFieldsAEditorial = (record: Branch): Branch => {
  const profile = profiles[record.id];
  if (!profile) return record;

  const reviewed: Branch = {...record, ...profile.patch, articleSections: reviseSections(record, profile)};
  const evidence = evidenceFor(reviewed, profile);
  return {
    ...reviewed,
    editorial: {
      sources: profile.sources,
      structuredClaims: structuredClaims(reviewed, evidence),
      review: {
        status: 'claim-reviewed',
        reviewedOn,
        method: 'Full substantive branch-page claim review. Every visitor-facing paragraph and structured claim was reread against cited primary texts where applicable, independent scholarly references, historical-label safeguards, and stated interpretive disagreements. High-risk origin, chronology, source-transmission, universalizing, and theory-family language received a separate editorial pass before the final integration lock is computed.',
        reviewNotePath: profile.reviewNotePath,
        lock: reviewLocks[record.id],
        evidencePolicy: {
          minimumIndependentSecondarySources: 2,
          minimumIndependentSecondaryDomains: 2,
          requiredSourceTypes: ['primary-text'],
        },
      },
    },
  };
};
