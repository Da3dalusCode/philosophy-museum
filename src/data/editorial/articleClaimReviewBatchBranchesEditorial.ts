import type {
  ArticleSection,
  Branch,
  CitationLocatorKind,
  CitationReference,
  EditorialSource,
} from '../../types/philosophy';
import {citation as cite, paragraph as p, structuredClaim as claim} from './pilotHelpers';

/*
 * Isolated branch/article claim-review overlay. Sol owns registration at the
 * end of the canonical branch pipeline, the final computed locks, review
 * notes, Museum-copy reconciliation, and release integration.
 */
const accessedOn = '2026-08-10';
const reviewLocks: Record<string, string> = {
  stoicism: 'fnv1a64:cc9492e922ea2a3b',
  platonism: 'fnv1a64:836c5c4e855b9cd9',
  aristotelianism: 'fnv1a64:0d5f84daf02b7dc2',
  neoplatonism: 'fnv1a64:0840c0a05f78d0b5',
  metaphysics: 'fnv1a64:227ed58347fa91ed',
  epistemology: 'fnv1a64:911bda38b070ba18',
  ethics: 'fnv1a64:801b31f29b16825f',
  'virtue-ethics': 'fnv1a64:6d609fb6327f80da',
};

const c = (sourceId: string, kind: CitationLocatorKind, value: string, note?: string): CitationReference =>
  cite(sourceId, kind, value, note);

const source = (entry: Omit<EditorialSource, 'accessedOn'>): EditorialSource => ({...entry, accessedOn});

const sep = (id: string, authors: string[], title: string, url: string, note: string, year?: number, edition?: string): EditorialSource => source({
  id,
  type: 'scholarly-reference',
  authors,
  title,
  containerTitle: 'The Stanford Encyclopedia of Philosophy',
  editors: ['Edward N. Zalta', 'Uri Nodelman'],
  publisher: 'Metaphysics Research Lab, Stanford University',
  ...(year ? {year} : {}),
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

const scholarlyBook = (id: string, authors: string[], title: string, publisher: string, year: number, url: string, note: string, edition?: string, isbn?: string): EditorialSource => source({
  id,
  type: 'scholarly-book',
  authors,
  title,
  publisher,
  year,
  ...(edition ? {edition} : {}),
  ...(isbn ? {isbn} : {}),
  url,
  note,
});

const primary = (id: string, author: string, title: string, url: string, note: string, year?: number): EditorialSource => source({
  id,
  type: 'primary-text',
  authors: [author],
  title,
  url,
  note,
  ...(year ? {year} : {}),
});

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

const stoicismSources = [
  sep('sto-sep', ['Marion Durand', 'Simon Shogry', 'Dirk Baltzly'], 'Stoicism', 'https://plato.stanford.edu/entries/stoicism/', 'Specialist overview for the school’s history, fragmentary sources, interlocking logic-physics-ethics, fate, emotion, value, and later reception.', 2023),
  iep('sto-iep', ['Massimo Pigliucci'], 'Stoicism', 'https://iep.utm.edu/stoicism/', 'Independent specialist overview used to check Hellenistic and Roman development, core concepts, and common modern simplifications.'),
  primary('sto-dl', 'Diogenes Laertius', 'Lives of Eminent Philosophers, Book VII', 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0258:book=7', 'Late source for Stoic founder and school testimony; cited by book-seven sections and not treated as transparent biography.'),
  primary('sto-epictetus', 'Epictetus', 'Discourses and Enchiridion', 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0236', 'Roman Stoic primary source cited by discourse and handbook section for assent, what depends on us, roles, and practice.'),
  primary('sto-seneca', 'Seneca', 'Moral Letters to Lucilius', 'https://en.wikisource.org/wiki/Moral_letters_to_Lucilius', 'Roman Stoic primary source cited by letter for progress, emotion, benefit, friendship, and public life.'),
];

const platonismSources = [
  sep('pla-plato-sep', ['Richard Kraut'], 'Plato', 'https://plato.stanford.edu/entries/plato/', 'Specialist overview for dialogue form, Academy, chronology, philosophical range, and later Platonist receptions.', 2026, 'Summer 2026'),
  iep('pla-iep', ['Thomas Brickhouse'], 'Plato', 'https://iep.utm.edu/plato/', 'Independent specialist overview used to cross-check Plato’s life, dialogue corpus, Academy, and philosophical range.'),
  sep('pla-middle-sep', ['Allan Silverman'], 'Plato’s Middle Period Metaphysics and Epistemology', 'https://plato.stanford.edu/entries/plato-metaphysics/', 'Specialist treatment of Forms, knowledge, participation, and the inseparability of Platonic ethical, epistemic, and metaphysical problems.', 2022),
  sep('pla-modern-sep', ['Mark Balaguer'], 'Platonism in Metaphysics', 'https://plato.stanford.edu/entries/platonism/', 'Source for the deliberately lower-case contemporary theory of abstract objects and its alternatives; it is not used to project a settled view onto Plato.', 2025),
  sep('pla-neoplatonism-sep', ['Christian Wildberg'], 'Neoplatonism', 'https://plato.stanford.edu/entries/neoplatonism/', 'Late-antique development, Plotinian and later variations, reception, and the historical caution around the modern label.', 2021),
  sep('pla-islamic-sep', ['Amos Bertolacci'], 'Arabic and Islamic Metaphysics', 'https://plato.stanford.edu/entries/arabic-islamic-metaphysics/', 'Arabic intellectual contexts, the Theology of Aristotle, Avicenna, and the transformation rather than mere custody of ancient materials.', 2025),
  primary('pla-dialogues', 'Plato', 'Selected Dialogues', 'https://www.perseus.tufts.edu/hopper/collection?collection=Perseus:collection:Greco-Roman', 'Primary texts cited by Stephanus divisions; dialogue speakers and dramatic settings are not automatically authorial declarations.'),
];

const aristotelianSources = [
  sep('ari-sep', ['Christopher Shields'], 'Aristotle', 'https://plato.stanford.edu/entries/aristotle/', 'Specialist overview for life, Lyceum, corpus, methods, nature, logic, ethics, politics, and transmission.', 2023),
  iep('ari-iep', ['Justin Humphreys'], 'Aristotle', 'https://iep.utm.edu/aristotle/', 'Independent specialist overview used to cross-check Aristotle’s life, school, corpus, core inquiries, and later reception.'),
  sep('ari-metaphysics-sep', ['S. Marc Cohen', 'C. D. C. Reeve'], 'Aristotle’s Metaphysics', 'https://plato.stanford.edu/entries/aristotle-metaphysics/', 'Treatise title, compilation history, being, substance, form, actuality, potentiality, and first philosophy.', 2025),
  sep('ari-ethics-sep', ['Richard Kraut'], 'Aristotle’s Ethics', 'https://plato.stanford.edu/entries/aristotle-ethics/', 'Flourishing, virtue, practical wisdom, emotions, friendship, methodology, and the importance of historical exclusions.', 2022),
  sep('ari-islamic-sep', ['Tony Street', 'Nadja Germann'], 'Arabic and Islamic Philosophy of Language and Logic', 'https://plato.stanford.edu/entries/arabic-islamic-language/', 'Arabic adaptation of Aristotelian logical materials and its own problems, terms, and institutions.', 2021),
  sep('ari-medieval-sep', ['John Marenbon'], 'Medieval Philosophy', 'https://plato.stanford.edu/entries/medieval-philosophy/', 'Latin, Jewish, Islamic, and Christian transformations of ancient learning and the limits of a one-way transmission narrative.', 2026, 'Summer 2026'),
  primary('ari-corpus', 'Aristotle', 'Selected Treatises', 'https://www.perseus.tufts.edu/hopper/collection?collection=Perseus:collection:Greco-Roman', 'Primary texts cited by Bekker divisions; the surviving corpus has layered editorial and pedagogical histories.'),
];

const neoplatonismSources = [
  sep('neo-sep', ['Christian Wildberg'], 'Neoplatonism', 'https://plato.stanford.edu/entries/neoplatonism/', 'Historical label, late-antique Platonist diversity, One, Intellect, Soul, participation, ethics, theurgy, and reception.', 2021),
  iep('neo-iep', ['Edward Moore'], 'Neo-Platonism', 'https://iep.utm.edu/neoplato/', 'Independent specialist overview used to cross-check the late-antique movement’s themes, figures, and reception.'),
  sep('neo-plotinus-sep', ['Paul Kalligas'], 'Plotinus', 'https://plato.stanford.edu/entries/plotinus/', 'Plotinus’s life and corpus, the Enneads, arguments, Gnostic controversy, and late-antique context.', 2024),
  sep('neo-iamblichus-sep', ['Riccardo Chiaradonna', 'Adrien Lecerf'], 'Iamblichus', 'https://plato.stanford.edu/entries/iamblichus/', 'Theurgy, embodied soul, late-antique curriculum, and the distinction between Iamblichean and Plotinian projects.', 2023),
  sep('neo-proclus-sep', ['Christoph Helmig', 'Carlos Steel'], 'Proclus', 'https://plato.stanford.edu/entries/proclus/', 'Proclean participation, remaining-procession-return, commentary, theology, and the textual and school contexts of the system.', 2025),
  sep('neo-islamic-sep', ['Amos Bertolacci'], 'Arabic and Islamic Metaphysics', 'https://plato.stanford.edu/entries/arabic-islamic-metaphysics/', 'Translation, pseudo-Aristotelian Plotinian and Proclean materials, and their independent Arabic transformations.', 2025),
  primary('neo-enneads', 'Plotinus', 'The Six Enneads', 'https://classics.mit.edu/Plotinus/enneads.html', 'Primary corpus cited by Ennead and treatise; Porphyry’s six-by-nine arrangement is an editorial order.'),
  primary('neo-porphyry', 'Porphyry', 'On the Life of Plotinus and the Arrangement of His Work', 'https://en.wikisource.org/wiki/Plotinus_(MacKenna)/Volume_1/Porphyry%27s_Life_of_Plotinus', 'Near-contemporary philosophical biography used critically for Plotinus’s school and the organization of the corpus.'),
];

const metaphysicsSources = [
  sep('met-sep', ['Peter van Inwagen', 'Meghan Sullivan', 'Sara Bernstein'], 'Metaphysics', 'https://plato.stanford.edu/entries/metaphysics/', 'Field history and shifting relations among first philosophy, ontology, modality, causation, science, and contemporary metaphysics.', 2026, 'Summer 2026'),
  scholarlyBook('met-loux-crisp', ['Michael J. Loux', 'Thomas M. Crisp'], 'Metaphysics: A Contemporary Introduction', 'Routledge', 2017, 'https://www.routledge.com/Metaphysics-A-Contemporary-Introduction-4th-Edition/Loux-Crisp/p/book/9781138639331', 'Independent specialist introduction used to cross-check the contemporary field’s standard problems of universals, objects, modality, identity, causation, time, parts, wholes, and anti-realism.', '4th edition', '9781138639331'),
  sep('met-grounding-sep', ['Ricki Bliss', 'Kelly Trogdon'], 'Metaphysical Grounding', 'https://plato.stanford.edu/entries/grounding/', 'Dependence, fundamentality, explanation, and objections to grounding as a single relation.', 2024),
  sep('met-indian-sep', ['Jonardon Ganeri'], 'Analytic Philosophy in Early Modern India', 'https://plato.stanford.edu/archives/win2023/entries/early-modern-india/', 'A specialist account of Navya-Nyāya and Vaiśeṣika categories, causation, absence, and ontology; it supports a plural genealogy without treating “metaphysics” as a universal master category.', 2023, 'Winter 2023'),
  sep('met-chinese-sep', ['Franklin Perkins'], 'Metaphysics in Chinese Philosophy', 'https://plato.stanford.edu/entries/chinese-metaphysics/', 'Chinese accounts of being, nonbeing, generation, pattern, and relation, with translation cautions.', 2023),
  sep('met-islamic-sep', ['Amos Bertolacci'], 'Arabic and Islamic Metaphysics', 'https://plato.stanford.edu/entries/arabic-islamic-metaphysics/', 'Arabic philosophical developments in essence, existence, necessity, causation, and reception.', 2025),
  primary('met-aristotle', 'Aristotle', 'Metaphysics', 'http://classics.mit.edu/Aristotle/metaphysics.html', 'Primary text cited by book and Bekker division for being, substance, causation, potentiality, and actuality; the familiar title is later editorial.'),
];

const epistemologySources = [
  sep('epi-sep', ['Matthias Steup', 'Ram Neta'], 'Epistemology', 'https://plato.stanford.edu/entries/epistemology/', 'Cognitive successes, knowledge, justification, sources, skepticism, testimony, and social dimensions of inquiry.', 2025),
  iep('epi-iep', ['David A. Truncellito'], 'Epistemology', 'https://iep.utm.edu/epistemo/', 'Independent specialist overview used to cross-check introductory distinctions among knowledge, truth, justification, belief, skepticism, and sources.'),
  sep('epi-analysis-sep', ['Jonathan Ichikawa', 'Matthias Steup'], 'The Analysis of Knowledge', 'https://plato.stanford.edu/entries/knowledge-analysis/', 'Justified true belief, Gettier problems, modal and reliabilist proposals, knowledge-first views, and contextualism.', 2026, 'Summer 2026'),
  sep('epi-testimony-sep', ['Nick Leonard'], 'Epistemological Problems of Testimony', 'https://plato.stanford.edu/entries/testimony-episprob/', 'Testimony’s status, reductionism and anti-reductionism, speaker-hearer relations, and social responsibility.', 2023),
  sep('epi-social-sep', ['Cailin O’Connor', 'Sanford Goldberg', 'Alvin Goldman'], 'Social Epistemology', 'https://plato.stanford.edu/entries/epistemology-social/', 'Disagreement, groups, expertise, formal models, institutions, misinformation, and socio-epistemic dysfunction.', 2026, 'Summer 2026'),
  sep('epi-india-sep', ['Stephen Phillips', 'Anand Vaidya'], 'Epistemology in Classical Indian Philosophy', 'https://plato.stanford.edu/entries/epistemology-india/', 'Pramāṇas, error, inference, testimony, cross-school debate, and the non-equivalence of technical vocabularies.', 2026, 'Summer 2026'),
  sep('epi-chinese-sep', ['Jana Rošker'], 'Epistemology in Chinese Philosophy', 'https://plato.stanford.edu/entries/chinese-epistemology/', 'Knowing, discernment, language, learning, action, and traditions that do not simply instantiate a European JTB problem.', 2025),
  sep('epi-feminist-sep', ['Elizabeth Anderson'], 'Feminist Epistemology and Philosophy of Science', 'https://plato.stanford.edu/entries/feminism-epistemology/', 'Situated inquiry, standpoint, objectivity, ignorance, and institutional power.', 2024),
  primary('epi-theaetetus', 'Plato', 'Theaetetus', 'https://classics.mit.edu/Plato/theatu.html', 'Primary dialogue cited by Stephanus division; it investigates candidate accounts rather than straightforwardly endorsing the later JTB formula.'),
  primary('epi-gettier', 'Edmund Gettier', 'Is Justified True Belief Knowledge?', 'https://fitelson.org/proseminar/gettier.pdf', 'The 1963 article’s short cases are used for epistemic luck, not as a definition of the entire field.', 1963),
  primary('epi-hume', 'David Hume', 'An Enquiry Concerning Human Understanding', 'https://www.gutenberg.org/ebooks/9662', 'Primary text cited by section for causation, induction, probability, testimony, and mitigated skepticism.', 1748),
];

const ethicsSources = [
  sep('eth-moral-sep', ['Julia Driver'], 'Moral Theory', 'https://plato.stanford.edu/entries/moral-theory/', 'What counts as moral theory, practical deliberation, theoretical virtues, and the limits of one decision procedure.', 2022),
  iep('eth-ancient-iep', ['Clerk Shaw'], 'Ancient Ethics', 'https://iep.utm.edu/a-ethics/', 'Independent specialist overview used to cross-check the field’s Greek and Hellenistic histories without treating them as the universal origin of ethics.'),
  sep('eth-meta-sep', ['Geoff Sayre-McCord'], 'Metaethics', 'https://plato.stanford.edu/entries/metaethics/', 'Moral semantics, metaphysics, epistemology, reasons, motivation, responsibility, realism, and anti-realism.', 2023),
  sep('eth-aristotle-sep', ['Richard Kraut'], 'Aristotle’s Ethics', 'https://plato.stanford.edu/entries/aristotle-ethics/', 'Greek eudaimonism, virtue, practical judgment, emotion, friendship, and political conditions.', 2022),
  sep('eth-feminist-sep', ['Kathryn Norlock', 'Jordan Pascoe'], 'Feminist Ethics', 'https://plato.stanford.edu/entries/feminism-ethics/', 'Care, dependency, gendered power, intersectional critique, and feminist disagreements in ethics.', 2025),
  sep('eth-chinese-sep', ['David Wong'], 'Chinese Ethics', 'https://plato.stanford.edu/entries/ethics-chinese/', 'Confucian, Mohist, Daoist, and other Chinese ethical discussions in their own concepts and histories.', 2024),
  sep('eth-buddhist-sep', ['Charles Goodman', 'Aaron Schultz'], 'Ethics in Indian Buddhism', 'https://plato.stanford.edu/entries/ethics-indian-buddhism/', 'Buddhist ethical arguments, intentions, virtues, vows, compassion, and diverse historical schools.', 2024),
  sep('eth-african-sep', ['Kwame Gyekye'], 'African Ethics', 'https://plato.stanford.edu/archives/fall2011/entries/african-ethics/', 'Specialist account used cautiously for African ethical traditions; it does not license a single communalist slogan for a continent’s diverse histories.', 2011, 'Fall 2011'),
  primary('eth-kant', 'Immanuel Kant', 'Groundwork of the Metaphysics of Morals', 'https://www.gutenberg.org/ebooks/5682', 'Primary text cited by section for moral worth, autonomy, universal law, humanity, and duty.', 1785),
  primary('eth-mill', 'John Stuart Mill', 'Utilitarianism', 'https://www.gutenberg.org/ebooks/11224', 'Primary text cited by chapter for utility, quality of pleasures, sanctions, proof, justice, and objections.', 1863),
];

const virtueSources = [
  sep('vir-sep', ['Rosalind Hursthouse', 'Glen Pettigrove'], 'Virtue Ethics', 'https://plato.stanford.edu/entries/ethics-virtue/', 'Contemporary forms, practical wisdom, eudaimonia, guidance objections, and the twentieth-century revival.', 2026, 'Summer 2026'),
  iep('vir-iep', ['Nafsika Athanassoulis'], 'Virtue Ethics', 'https://iep.utm.edu/virtue/', 'Independent specialist overview used to cross-check contemporary virtue-ethical forms, criticism, and relation to rival normative approaches.'),
  sep('vir-aristotle-sep', ['Richard Kraut'], 'Aristotle’s Ethics', 'https://plato.stanford.edu/entries/aristotle-ethics/', 'Aristotelian flourishing, habituation, mean, practical wisdom, friendship, politics, and luck.', 2022),
  sep('vir-chinese-sep', ['David Wong'], 'Chinese Ethics', 'https://plato.stanford.edu/entries/ethics-chinese/', 'Confucian cultivation, ren, li, yi, exemplarity, learning, and the caution required in cross-cultural comparison.', 2024),
  sep('vir-feminist-sep', ['Kathryn Norlock', 'Jordan Pascoe'], 'Feminist Ethics', 'https://plato.stanford.edu/entries/feminism-ethics/', 'Care, dependency, intersectional critique, structural conditions, and disagreements with and within virtue theory.', 2025),
  primary('vir-aristotle', 'Aristotle', 'Nicomachean Ethics', 'http://classics.mit.edu/Aristotle/nicomachaen.html', 'Primary text cited by book and chapter for flourishing, habituation, the mean, voluntary action, practical wisdom, friendship, pleasure, and politics.'),
  primary('vir-anscombe', 'G. E. M. Anscombe', 'Modern Moral Philosophy', 'https://doi.org/10.1017/S0031819100037946', 'Primary 1958 article used for its diagnostic critique of modern moral vocabulary; it is not treated as a complete virtue-ethical theory.', 1958),
];

const all = (...items: CitationReference[]) => items;

const profiles: Record<string, Profile> = {
  stoicism: {
    sources: stoicismSources,
    citations: (section) => {
      const overview = all(c('sto-sep', 'section', '§§1.1–1.3; 2–4'), c('sto-iep', 'section', 'Introduction; Logic, Physics, and Ethics'));
      if (['founding', 'early-school'].includes(section)) return all(c('sto-sep', 'section', '§1.1; §1.3'), c('sto-dl', 'book-chapter', 'Book VII, §§1–39; 160–163'));
      if (['one-system', 'nature-virtue', 'fate-responsibility'].includes(section)) return all(c('sto-sep', 'section', '§§2–4'), c('sto-iep', 'section', 'Logic, Physics, and Ethics'), c('sto-dl', 'book-chapter', 'Book VII, §§39–160'));
      if (['indifferents', 'emotion-assent', 'social-ethics'].includes(section)) return all(c('sto-sep', 'section', '§§4–6'), c('sto-epictetus', 'book-chapter', 'Discourses I.1; I.4; II.5; Handbook 1, 30'), c('sto-seneca', 'chapter', 'Letters 9, 41, 71, 95'));
      if (section === 'roman-stoicism') return all(c('sto-sep', 'section', '§1.2; §§5–6'), c('sto-epictetus', 'work', 'Discourses and Enchiridion'), c('sto-seneca', 'work', 'Moral Letters to Lucilius'));
      return overview;
    },
    patch: {
      category: 'Hellenistic and Roman philosophical system',
      shortDefinition: 'A Hellenistic and Roman system that joins logic, corporeal providential nature, and ethics of virtue, assent, value, and social roles; it cannot be reduced to a slogan about control.',
      oneSentencePurpose: 'Asks how rational judgment, virtuous action, and duties to others are possible in an ordered causal world whose outcomes no individual commands.',
      originPeriod: 'Hellenistic Athens, c. 300 BCE; later Roman and modern receptions',
      historicalDevelopment: ['Zeno taught at the Painted Stoa in Athens around 300 BCE; early evidence is fragmentary and later reports require critical use.', 'Cleanthes and especially Chrysippus developed the school’s interdependent logic, physics, and ethics.', 'Seneca, Musonius Rufus, Epictetus, and Marcus Aurelius preserve distinct Roman-period practices rather than a replacement for the early system.', 'Later Christian, humanist, therapeutic, and self-help receptions select and transform Stoic materials; resemblance to modern therapy is not proof of direct lineage.'],
      commonMisunderstandings: ['Stoicism is not emotional concealment, passive resignation, or an all-purpose “dichotomy of control.”', 'The familiar distinction concerns what depends on us—especially judgment, intention, and response—within a wider account of causation, value, and duty.', 'Apatheia concerns freedom from disordered passions, not the elimination of every feeling or relationship.'],
    },
    edits: {
      overview: {
        0: 'Stoicism is a Hellenistic philosophical system that joins an exacting ethics to accounts of logic, knowledge, nature, causation, psychology, and society. Its practical reputation is deserved but incomplete. The early school did not offer a self-help technique detached from theory: Stoic ethics depends on claims about a corporeal and ordered cosmos, the rational capacities of living beings, impressions and assent, and the status of value. Because most early Stoic writings survive only in fragments and later reports, the school must be reconstructed with care. Roman authors make its practices unusually vivid, but they do not simply preserve a finished third-century BCE textbook.',
      },
    },
    reviewNotePath: 'docs/editorial/reviews/stoicism.md',
  },
  platonism: {
    sources: platonismSources,
    citations: (section) => {
      if (['overview', 'academy-origins', 'forms-participation', 'education-politics', 'debates', 'old-academy-disputes', 'academic-skepticism'].includes(section)) return all(c('pla-plato-sep', 'section', '§§1–11'), c('pla-iep', 'section', 'Life; Works; Philosophy'), c('pla-middle-sep', 'section', '§§1–6'), c('pla-dialogues', 'standard-division', 'Apology 17a–42a; Meno 70a–100c; Republic I–X; Phaedo 57a–118a; Parmenides 126a–166c'));
      if (['universals-mathematics', 'contemporary-platonisms'].includes(section)) return all(c('pla-modern-sep', 'section', '§§1–5'), c('pla-middle-sep', 'section', '§§1–6'));
      if (['middle-neoplatonism', 'hierarchy-participation-return', 'practice-embodiment-evil', 'late-antique-transmission'].includes(section)) return all(c('pla-neoplatonism-sep', 'section', '§§1–8'), c('pla-plato-sep', 'section', '§§8–11'));
      if (['religious-reception', 'religious-plurality', 'medieval-modern'].includes(section)) return all(c('pla-neoplatonism-sep', 'section', '§8'), c('pla-islamic-sep', 'section', '§§1–5'), c('pla-plato-sep', 'section', '§§9–11'));
      return all(c('pla-plato-sep', 'section', '§§1–11'), c('pla-iep', 'section', 'Life; Works; Philosophy'), c('pla-middle-sep', 'section', '§§1–6'), c('pla-modern-sep', 'section', '§§1–5'));
    },
    patch: {
      category: 'Reception tradition and family of arguments',
      shortDefinition: 'A diverse reception tradition that repeatedly reconstructs Plato around intelligibility, dialectic, soul, value, education, and return; neither Plato’s dialogues nor later Platonisms form one timeless creed.',
      oneSentencePurpose: 'Tests whether truth, value, and changing experience require intelligible standards while asking how philosophers can know, interpret, and live in relation to them.',
      originPeriod: 'Plato’s Academy, founded in the fourth century BCE; many later Platonist receptions',
      originStory: 'The Atlas uses Plato’s Academy as an historical anchor, not as the birth of one settled “Platonist doctrine.” Plato’s dialogue form, the changing Academy, Middle and late-antique Platonisms, religious transformations, and modern lower-case platonism each reconstruct different problems and answers.',
      commonMisunderstandings: ['Platonism is not one doctrine transmitted unchanged from Plato.', 'Lower-case modern platonism about abstract objects is related to ancient Plato but should not be treated as a settled doctrine of the dialogues.', '“Participation,” “ascent,” and “Forms” name families of arguments whose meaning changes across Platonist texts and receptions.'],
    },
    edits: {
      overview: {
        0: 'Platonism is not one doctrine transmitted unchanged from Plato. It names a family of arguments and reception practices that repeatedly reconstruct Plato around intelligibility, dialectic, soul, value, education, and return. The historical starting point is unusually difficult: Plato writes dramatic dialogues rather than a creed in his own declarative voice, and the Academy developed through disputes rather than a fixed canon of propositions. Later readers may emphasize Forms, mathematics, spiritual ascent, political education, or metaphysical participation, but no one emphasis automatically defines the others. A responsible account begins by distinguishing Plato’s texts, ancient Platonist schools, religious appropriations, and the lower-case technical “platonism” of contemporary metaphysics.',
      },
    },
    reviewNotePath: 'docs/editorial/reviews/platonism.md',
  },
  aristotelianism: {
    sources: aristotelianSources,
    citations: (section) => {
      if (['overview', 'lyceum', 'logic-categories', 'substance', 'causes', 'nature-soul'].includes(section)) return all(c('ari-sep', 'section', '§§1–8'), c('ari-iep', 'section', 'Life; Works; Logic and Science; Metaphysics'), c('ari-metaphysics-sep', 'section', '§§1–9'), c('ari-corpus', 'standard-division', 'Categories 1a–15b; Physics I–II; Metaphysics Γ, Ζ, Θ, Λ'));
      if (section === 'practical-arts') return all(c('ari-ethics-sep', 'section', '§§1–13'), c('ari-corpus', 'standard-division', 'Nicomachean Ethics I–X; Politics I–VIII'));
      if (['islamic', 'jewish-christian', 'scholastic-method'].includes(section)) return all(c('ari-islamic-sep', 'section', '§§1–7'), c('ari-medieval-sep', 'section', '§§1–7'), c('ari-sep', 'section', '§§7–8'));
      return all(c('ari-sep', 'section', '§§1–8'), c('ari-iep', 'section', 'Life; Works; Logic and Science; Metaphysics'), c('ari-metaphysics-sep', 'section', '§§1–9'), c('ari-ethics-sep', 'section', '§§1–13'));
    },
    patch: {
      category: 'Reception tradition and family of inquiries',
      shortDefinition: 'A diverse tradition built through Aristotle’s layered corpus, later Peripatetic work, commentary, translation, criticism, and adaptation across logic, nature, metaphysics, ethics, and politics.',
      oneSentencePurpose: 'Develops inquiry through causes, categories, method, nature, virtue, and political life while testing which explanations fit distinct kinds of subject matter.',
      originPeriod: 'Fourth-century BCE Lyceum and later Peripatetic, Arabic, Jewish, Latin, Byzantine, and modern receptions',
      originStory: 'Aristotle’s Lyceum provides a historical anchor, but Aristotelianism is not a static school identity or an unedited set of doctrines. The surviving corpus is partial and textually layered; later commentators, translators, and philosophers made distinct Aristotelianisms in new institutions and languages.',
      commonMisunderstandings: ['Aristotelianism is not reducible to four causes, the mean, syllogisms, or a single medieval synthesis.', '“The Organon” and “Metaphysics” are later editorial titles; they are useful but should not make the corpus look like a set of finished modern textbooks.', 'Aristotle’s explanatory teleology and his defenses of hierarchy need neither dismissal as trivia nor uncritical revival.'],
    },
    edits: {
      overview: {
        0: 'Aristotelianism is the long, internally diverse tradition that develops from Aristotle’s works, methods, school, and questions. It cannot be reduced to agreeing with every surviving Aristotelian claim, nor to one institution that merely passed an intact doctrine forward. Aristotle’s corpus itself is partial, pedagogically shaped, and textually layered; major titles such as the Organon and Metaphysics are later editorial arrangements. Peripatetic successors, Greek commentators, Arabic philosophers, Jewish and Latin scholastics, Renaissance critics, and modern researchers inherited different materials and made them answer different problems. The tradition is therefore best followed through its arguments about explanation, form, change, inference, flourishing, and political life rather than as a timeless checklist.',
      },
    },
    reviewNotePath: 'docs/editorial/reviews/aristotelianism.md',
  },
  neoplatonism: {
    sources: neoplatonismSources,
    citations: (section) => {
      if (['overview', 'label-context', 'plotinus-enneads', 'architecture', 'participation', 'ascent'].includes(section)) return all(c('neo-sep', 'section', '§§1–6'), c('neo-iep', 'section', 'Introduction; The Historical Background; The Doctrine'), c('neo-plotinus-sep', 'section', '§§1–6'), c('neo-enneads', 'standard-division', 'I.6; I.8; IV.8; V.1; V.9; VI.9'));
      if (['later-school', 'theurgy', 'plato-aristotle'].includes(section)) return all(c('neo-iamblichus-sep', 'section', '§§1–6'), c('neo-proclus-sep', 'section', '§§1–5'), c('neo-sep', 'section', '§§6–7'));
      if (['christian', 'islamic-jewish', 'renaissance-modern'].includes(section)) return all(c('neo-sep', 'section', '§§7–8'), c('neo-islamic-sep', 'section', '§§1–5'), c('neo-porphyry', 'work', 'Life of Plotinus'));
      return all(c('neo-sep', 'section', '§§1–8'), c('neo-iep', 'section', 'Introduction; The Historical Background; The Doctrine'), c('neo-plotinus-sep', 'section', '§§1–7'));
    },
    patch: {
      category: 'Late-antique Platonist family of traditions',
      shortDefinition: 'A modern umbrella label for varied late-antique Platonist traditions that analyze unity, intellect, soul, participation, practice, and return without forming one self-named, uniform school.',
      oneSentencePurpose: 'Asks how plurality can depend on unity and how intellectual, ethical, and—in some schools—ritual practices relate an embodied soul to its sources.',
      originPeriod: 'Third through sixth centuries CE; “Neoplatonism” is a later historical label',
      originStory: 'The label helps historians identify major late-antique developments beginning with Plotinus and transformed by Porphyry, Iamblichus, Proclus, and others. These thinkers ordinarily presented themselves as Platonists interpreting Plato, not as founders of one new, homogeneous movement.',
      commonMisunderstandings: ['Neoplatonism is a later historical label, not Plotinus’s self-description.', 'Procession describes dependence and explanatory priority, not a temporal episode in which higher principles lose pieces of themselves.', 'Theurgy, contemplation, and ethics have different roles in different late-antique Platonist projects.'],
    },
    edits: {
      overview: {
        0: '“Neoplatonism” is a modern historical label for varied late-antique Platonist traditions whose members usually understood themselves as Platonists. It is useful when it marks real developments from Plotinus through Porphyry, Iamblichus, Proclus, and later commentators, but it becomes misleading when it turns those disagreements into one timeless doctrine. The traditions ask how plurality depends on unity, how intellect and soul relate to the sensible cosmos, and how an embodied person can return toward a source that is not one more object in the world. Their answers combine arguments, commentary, ethical formation, and—in some settings—theurgy; neither “mysticism” nor a diagram of emanation captures the whole historical practice.',
      },
    },
    reviewNotePath: 'docs/editorial/reviews/neoplatonism.md',
  },
  metaphysics: {
    sources: metaphysicsSources,
    citations: (section) => {
      if (['overview', 'historical-development', 'key-concepts', 'internal-debates', 'misunderstandings'].includes(section)) return all(c('met-sep', 'section', '§§1–4'), c('met-loux-crisp', 'chapter', 'Introduction; Chapters 1–11'), c('met-aristotle', 'standard-division', 'Metaphysics Γ, Ζ, Θ, Λ'));
      if (section === 'figures-works') return all(c('met-sep', 'section', '§§1–4'), c('met-islamic-sep', 'section', '§§1–5'), c('met-aristotle', 'standard-division', 'Metaphysics Γ, Ζ, Θ, Λ'));
      if (section === 'neighbors') return all(c('met-grounding-sep', 'section', '§§1–8'), c('met-sep', 'section', '§§2–4'), c('met-chinese-sep', 'section', '§§1–6'));
      if (section === 'modern-relevance') return all(c('met-grounding-sep', 'section', '§§1–8'), c('met-sep', 'section', '§§2–4'), c('met-indian-sep', 'section', '§§1–6'));
      return all(c('met-sep', 'section', '§§1–4'), c('met-loux-crisp', 'chapter', 'Introduction; Chapters 1–11'), c('met-grounding-sep', 'section', '§§1–8'));
    },
    patch: {
      category: 'Field of inquiry',
      shortDefinition: 'A contested field that asks about being, structure, identity, change, causation, possibility, dependence, and explanation; neither its boundary with ontology nor its historical genealogy is settled.',
      oneSentencePurpose: 'Makes rival pictures of reality and explanation explicit so that substance, process, possibility, identity, causation, and dependence can be compared rather than silently assumed.',
      originPeriod: 'Many philosophical genealogies; the title “metaphysics” is attached later to an Aristotelian compilation',
      originStory: 'Questions now grouped as metaphysical have many histories. The familiar title comes from the editorial placement of Aristotle’s treatises “after the Physics,” but neither Aristotle’s title nor a Greek origin exhausts inquiry into reality, change, causation, persons, possibility, and dependence.',
      commonMisunderstandings: ['Metaphysics is not synonymous with supernatural speculation or one inherited cosmic picture.', 'Ontology and metaphysics overlap without a universally settled boundary.', 'A comparison with South Asian, Chinese, Islamic, Jewish, African, or other philosophical traditions must begin from their questions and terms rather than assume a shared European field label.'],
    },
    edits: {
      overview: {
        0: 'Metaphysics asks what reality is fundamentally like and how its most general features fit together. It investigates substance and process, identity and change, possibility and necessity, causation, time, mind and body, parts and wholes, laws, explanation, and dependence. Those questions overlap but are not one method or one doctrine. Some metaphysicians begin by asking what exists; others ask what is fundamental, how one fact obtains in virtue of another, or what makes a counterfactual true. The field’s boundary with ontology remains contested. Even the familiar name is historically mediated: “Metaphysics” became the title of an edited Aristotelian collection, not the self-description of a single discipline with one universal origin.',
      },
    },
    reviewNotePath: 'docs/editorial/reviews/metaphysics.md',
  },
  epistemology: {
    sources: epistemologySources,
    citations: (section) => {
      if (['orientation', 'sources', 'structure', 'open-questions'].includes(section)) return all(c('epi-sep', 'section', '§§1–6'), c('epi-iep', 'section', 'Introduction; Knowledge; Justification; Skepticism'), c('epi-analysis-sep', 'section', '§§1–13'));
      if (section === 'histories') return all(c('epi-sep', 'section', '§1'), c('epi-india-sep', 'section', '§§1–8'), c('epi-chinese-sep', 'section', '§§1–6'), c('epi-theaetetus', 'standard-division', '151d–210d'));
      if (section === 'testimony') return all(c('epi-testimony-sep', 'section', '§§1–6'), c('epi-social-sep', 'section', '§3.1; §5'));
      if (section === 'skepticism') return all(c('epi-sep', 'section', '§6'), c('epi-hume', 'standard-division', 'Sections IV–V; XII'), c('epi-theaetetus', 'standard-division', '151d–210d'));
      if (section === 'knowledge-analysis') return all(c('epi-analysis-sep', 'section', '§§1–13'), c('epi-gettier', 'work', 'Complete article'), c('epi-theaetetus', 'standard-division', '201c–210d'));
      if (section === 'methods') return all(c('epi-social-sep', 'section', '§§3–5'), c('epi-sep', 'section', '§§1; 5–6'));
      if (section === 'power') return all(c('epi-feminist-sep', 'section', '§§1–9'), c('epi-social-sep', 'section', '§§3–5'));
      return all(c('epi-sep', 'section', '§§1–6'), c('epi-iep', 'section', 'Introduction; Knowledge; Justification; Skepticism'), c('epi-analysis-sep', 'section', '§§1–13'));
    },
    patch: {
      category: 'Field of inquiry',
      shortDefinition: 'A plural field that studies knowledge, understanding, rational belief, reliable cognition, error, inquiry, testimony, and the social conditions that make epistemic success possible or difficult.',
      oneSentencePurpose: 'Asks what cognitive success consists in, how evidence and methods support belief, and how people and institutions can inquire responsibly under uncertainty and disagreement.',
      originPeriod: 'Many philosophical histories; “epistemology” is a comparatively modern disciplinary term',
      originStory: 'The word “epistemology” is modern, but questions about knowing, perception, inference, testimony, error, doubt, and cultivated discernment have many histories. The field should connect rather than assimilate Greek, South Asian, Chinese, Islamic, Jewish, Christian, African, and other inquiries.',
      commonMisunderstandings: ['Justified true belief is neither an uncontested ancient definition nor the sole framework of epistemology.', 'Knowledge need not mean absolute certainty, and skepticism need not demand disbelief in everything.', 'Epistemology is social as well as individual: testimony, institutions, power, tools, and archives affect what can be responsibly known.'],
    },
    edits: {
      histories: {
        0: 'Questions now grouped under epistemology long predate the modern word. In classical Greek philosophy, Plato distinguishes knowledge from mere true judgment and tests what an account might add, while Aristotle connects demonstrative knowledge with explanatory causes. Hellenistic Epicureans, Stoics, Academic skeptics, and Pyrrhonists dispute perception, criteria of truth, signs, and responsible action under disagreement. Medieval Jewish, Christian, and Islamic philosophers develop arguments about demonstration, testimony, illumination, prophecy, sense perception, and intellectual knowledge within institutions of commentary, law, theology, and science. These are connected histories, not preliminary versions of one modern analytic definition.',
      },
    },
    reviewNotePath: 'docs/editorial/reviews/epistemology.md',
  },
  ethics: {
    sources: ethicsSources,
    citations: (section) => {
      if (['orientation', 'reasons-value', 'agency', 'method'].includes(section)) return all(c('eth-moral-sep', 'section', '§§1–4'), c('eth-ancient-iep', 'section', 'Introduction; Ancient Greek Ethics; Hellenistic Ethics'), c('eth-meta-sep', 'section', '§§1; 5–8'));
      if (section === 'histories') return all(c('eth-ancient-iep', 'section', 'Introduction; Ancient Greek Ethics; Hellenistic Ethics'), c('eth-aristotle-sep', 'section', '§§1–13'), c('eth-chinese-sep', 'section', '§§1–8'), c('eth-buddhist-sep', 'section', '§§1–8'), c('eth-african-sep', 'section', '§§1–6'));
      if (section === 'consequences') return all(c('eth-mill', 'chapter', 'Chapters II, IV–V'), c('eth-moral-sep', 'section', '§§3–4'));
      if (section === 'duties-agreement') return all(c('eth-kant', 'standard-division', 'Preface; Sections I–III'), c('eth-moral-sep', 'section', '§§3–4'));
      if (section === 'virtue-care') return all(c('eth-aristotle-sep', 'section', '§§1–13'), c('eth-feminist-sep', 'section', '§§1–7'));
      if (section === 'metaethics') return all(c('eth-meta-sep', 'section', '§§1–8'), c('eth-moral-sep', 'section', '§§1–3'));
      if (['institutions', 'applied'].includes(section)) return all(c('eth-feminist-sep', 'section', '§§2–7'), c('eth-moral-sep', 'section', '§§3–4'), c('eth-meta-sep', 'section', '§§6–8'));
      return all(c('eth-moral-sep', 'section', '§§1–4'), c('eth-ancient-iep', 'section', 'Introduction; Ancient Greek Ethics; Hellenistic Ethics'), c('eth-meta-sep', 'section', '§§1–8'));
    },
    patch: {
      category: 'Field of inquiry',
      shortDefinition: 'A plural field that studies reasons for action, values, character, relationships, obligations, consequences, moral psychology, and the institutions that shape shared life.',
      oneSentencePurpose: 'Compares competing ways of asking how to act, live, attend, care, resist, and design institutions without treating one tradition or decision procedure as the whole of ethics.',
      originPeriod: 'Many philosophical and practical histories; no single founder or universal moral vocabulary',
      originStory: 'Ethical inquiry has plural histories and contested boundaries. Traditions disagree not only about answers but about how action, cultivation, law, liberation, relationship, community, suffering, responsibility, and social power belong together.',
      commonMisunderstandings: ['Ethics is not reducible to personal taste, legal compliance, or a contest among three European theories.', 'Applied ethics remains connected to questions about value, responsibility, institutions, and moral knowledge.', 'Ethical pluralism does not make criticism optional; it requires clearer accounts of reasons, evidence, conflicts, and power.'],
    },
    edits: {
      histories: {
        0: 'Ethical inquiry has many histories rather than one neutral sequence that begins in Greece and acquires diversity later. Greek, Hellenistic, Chinese, South Asian, Buddhist, Jain, Jewish, Christian, Islamic, African, and other traditions connect ethical reflection to differently organized questions about flourishing, ritual, role, liberation, nonviolence, suffering, law, virtue, personhood, community, and responsibility. These traditions are internally diverse and their concepts are not interchangeable English labels. Comparison can expose shared problems, but it should not turn one canon into the measure of every ethical vocabulary.',
      },
    },
    reviewNotePath: 'docs/editorial/reviews/ethics.md',
  },
  'virtue-ethics': {
    sources: virtueSources,
    citations: (section) => {
      if (['overview', 'key-concepts', 'internal-debates', 'misunderstandings', 'modern-relevance', 'reading-path'].includes(section)) return all(c('vir-sep', 'section', '§§1–4'), c('vir-iep', 'section', 'Introduction; History; Contemporary Virtue Ethics; Objections'), c('vir-aristotle-sep', 'section', '§§1–13'), c('vir-aristotle', 'book-chapter', 'Books I–II, III, VI, VIII–X'));
      if (section === 'historical-development') return all(c('vir-aristotle-sep', 'section', '§§1–13'), c('vir-chinese-sep', 'section', '§§1–8'), c('vir-anscombe', 'work', 'Complete article'));
      if (section === 'figures-works') return all(c('vir-aristotle', 'book-chapter', 'Books I–II, III, VI, VIII–X'), c('vir-anscombe', 'work', 'Complete article'), c('vir-sep', 'section', '§§2–4'));
      if (section === 'neighbors') return all(c('vir-sep', 'section', '§§1–4'), c('vir-iep', 'section', 'Contemporary Virtue Ethics; Virtue in Deontology and Consequentialism'), c('vir-feminist-sep', 'section', '§§1–7'), c('vir-chinese-sep', 'section', '§§1–8'));
      return all(c('vir-sep', 'section', '§§1–4'), c('vir-iep', 'section', 'Introduction; History; Contemporary Virtue Ethics; Objections'), c('vir-aristotle-sep', 'section', '§§1–13'));
    },
    patch: {
      category: 'Family of ethical approaches',
      shortDefinition: 'A diverse family of approaches that gives character, practical wisdom, emotion, relationship, practice, and forms of flourishing explanatory importance in ethical life.',
      oneSentencePurpose: 'Asks what traits, practices, relationships, and judgments help people live and act well across changing situations while testing the social conditions that form or deform them.',
      originPeriod: 'Many cultivation traditions; ancient Greek and Chinese anchors, with modern revivals and transformations',
      originStory: '“Virtue ethics” is a useful modern comparative label, not the original self-description of every cultivation-centered tradition. Aristotle is a major Greek anchor; Confucian, Stoic, Buddhist, religious, feminist, care-oriented, and contemporary projects preserve real affinities while differing about persons, practices, values, and social worlds.',
      commonMisunderstandings: ['Virtue ethics is not advice to “be a good person” without accounts of reasons, emotion, practical wisdom, social practices, and human goods.', 'The mean is not a rule to compromise between any two options, and courage is not a midpoint between justice and injustice.', 'Ancient and modern virtue approaches do not excuse hierarchy, exclusion, coerced care, or institutional injustice.'],
    },
    edits: {
      'historical-development': {
        1: 'Cultivation-centered ethics also developed through traditions whose questions and vocabularies cannot simply be translated into Greek terms. Confucian texts connect excellent character to humaneness, ritual practice, family and civic relationships, learning, and exemplary conduct. Confucius presents moral growth through study and ritualized responsiveness; Mencius emphasizes cultivable beginnings or “sprouts” of virtue; Xunzi stresses deliberate practice, education, and ritual transformation. Calling these views virtue ethics can illuminate selected structural affinities, but it must not make Greek categories the standard by which Chinese thought is measured or imply a single common doctrine. Concepts such as ren, li, yi, and the exemplary person belong to distinctive arguments about relationship, social order, and cultivated responsiveness.',
      },
    },
    reviewNotePath: 'docs/editorial/reviews/virtue-ethics.md',
  },
};

const serialize = (value: unknown): string => typeof value === 'string' ? value : JSON.stringify(value) ?? 'null';

const structuredEvidenceSections: Record<string, Record<keyof ClaimEvidence, string>> = {
  stoicism: {classification: 'one-system', chronology: 'founding', definition: 'one-system', purpose: 'nature-virtue', 'central-questions': 'one-system', significance: 'social-ethics', 'origin-story': 'founding', history: 'roman-stoicism', concepts: 'one-system', relationships: 'social-ethics', figures: 'roman-stoicism', works: 'roman-stoicism', debates: 'fate-responsibility', misunderstandings: 'emotion-assent', relevance: 'roman-stoicism', readings: 'roman-stoicism'},
  platonism: {classification: 'academy-origins', chronology: 'academy-origins', definition: 'forms-participation', purpose: 'education-politics', 'central-questions': 'forms-participation', significance: 'education-politics', 'origin-story': 'academy-origins', history: 'middle-neoplatonism', concepts: 'forms-participation', relationships: 'middle-neoplatonism', figures: 'academy-origins', works: 'education-politics', debates: 'debates', misunderstandings: 'forms-participation', relevance: 'contemporary-platonisms', readings: 'overview'},
  aristotelianism: {classification: 'lyceum', chronology: 'lyceum', definition: 'overview', purpose: 'logic-categories', 'central-questions': 'logic-categories', significance: 'practical-arts', 'origin-story': 'lyceum', history: 'islamic', concepts: 'logic-categories', relationships: 'islamic', figures: 'lyceum', works: 'lyceum', debates: 'practical-arts', misunderstandings: 'overview', relevance: 'practical-arts', readings: 'overview'},
  neoplatonism: {classification: 'label-context', chronology: 'label-context', definition: 'architecture', purpose: 'ascent', 'central-questions': 'architecture', significance: 'ascent', 'origin-story': 'label-context', history: 'later-school', concepts: 'architecture', relationships: 'later-school', figures: 'plotinus-enneads', works: 'plotinus-enneads', debates: 'plato-aristotle', misunderstandings: 'label-context', relevance: 'renaissance-modern', readings: 'plotinus-enneads'},
  metaphysics: {classification: 'historical-development', chronology: 'historical-development', definition: 'overview', purpose: 'key-concepts', 'central-questions': 'key-concepts', significance: 'modern-relevance', 'origin-story': 'historical-development', history: 'historical-development', concepts: 'key-concepts', relationships: 'neighbors', figures: 'figures-works', works: 'figures-works', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'overview'},
  epistemology: {classification: 'histories', chronology: 'histories', definition: 'orientation', purpose: 'orientation', 'central-questions': 'sources', significance: 'methods', 'origin-story': 'histories', history: 'histories', concepts: 'structure', relationships: 'testimony', figures: 'histories', works: 'knowledge-analysis', debates: 'open-questions', misunderstandings: 'open-questions', relevance: 'power', readings: 'orientation'},
  ethics: {classification: 'histories', chronology: 'histories', definition: 'orientation', purpose: 'orientation', 'central-questions': 'reasons-value', significance: 'institutions', 'origin-story': 'histories', history: 'histories', concepts: 'reasons-value', relationships: 'institutions', figures: 'histories', works: 'histories', debates: 'metaethics', misunderstandings: 'orientation', relevance: 'applied', readings: 'orientation'},
  'virtue-ethics': {classification: 'historical-development', chronology: 'historical-development', definition: 'overview', purpose: 'key-concepts', 'central-questions': 'key-concepts', significance: 'modern-relevance', 'origin-story': 'historical-development', history: 'historical-development', concepts: 'key-concepts', relationships: 'neighbors', figures: 'figures-works', works: 'figures-works', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'reading-path'},
};

const claimEvidence = (record: Branch, profile: Profile): ClaimEvidence => {
  const sections = structuredEvidenceSections[record.id];
  if (!sections) throw new Error(`Missing structured-claim evidence map for ${record.id}`);
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

/** Applies only when Sol registers this overlay at the end of the branch pipeline. */
export const applyArticleClaimReviewBatchBranchesEditorial = (record: Branch): Branch => {
  const profile = profiles[record.id];
  if (!profile) return record;

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
        method: 'Full substantive branch-page claim review. Every article paragraph and generated structured claim was checked against cited primary texts where applicable, independent specialist references, historical-label and transmission safeguards, and explicit disagreement or reception context; high-risk chronology, priority, cross-cultural, and interpretive language received an editorial reread before the integration lock is generated.',
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
