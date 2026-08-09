import type {EditorialSource, Philosopher} from '../../types/philosophy';
import {citation as c} from './pilotHelpers';
import {applyModernClusterEditorialConfig, type ModernClusterEditorialConfig} from './modernClusterEditorialHelpers';

const sources: EditorialSource[] = [
  {id: 'sextus-primary', type: 'primary-text', authors: ['Sextus Empiricus'], title: 'Sextus Empiricus, Volumes I–IV', translator: 'R. G. Bury', publisher: 'Harvard University Press', year: 1933, url: 'https://archive.org/details/sextusempiricus0001sext', accessedOn: '2026-08-09', note: 'Four-volume Loeb edition, with the linked scan hosted by Internet Archive. Citations use the durable book-and-section divisions of Outlines of Pyrrhonism (PH) and Against the Mathematicians (M), not scan pages.'},
  {id: 'sextus-sep', type: 'scholarly-reference', authors: ['Benjamin Morison'], title: 'Sextus Empiricus', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Substantive revision, 12 March 2026', year: 2026, url: 'https://plato.stanford.edu/entries/sextus-empiricus/', accessedOn: '2026-08-09', note: 'Specialist synthesis used for chronology, corpus organization, Pyrrhonian method, belief and ordinary-life disputes, and the distinction between M I–VI and M VII–XI.'},
  {id: 'sextus-annas-barnes', type: 'scholarly-book', authors: ['Julia Annas', 'Jonathan Barnes'], title: 'The Modes of Scepticism: Ancient Texts and Modern Interpretations', publisher: 'Cambridge University Press', year: 1985, isbn: '9780521276443', doi: '10.1017/CBO9780511586187', url: 'https://www.cambridge.org/core/books/the-modes-of-scepticism/D82516C6783D9831B83B49B132080C37', accessedOn: '2026-08-09', note: 'Independent scholarly reconstruction used for the ten and five modes and their philosophical limits; it does not turn the modes into automatic proofs of global doubt.'},
  {id: 'sextus-floridi', type: 'scholarly-book', authors: ['Luciano Floridi'], title: 'Sextus Empiricus: The Transmission and Recovery of Pyrrhonism', publisher: 'Oxford University Press', year: 2002, isbn: '9780195146714', doi: '10.1093/oso/9780195146714.001.0001', url: 'https://academic.oup.com/book/47184', accessedOn: '2026-08-09', note: 'Independent history of manuscript transmission, Renaissance recovery, and later intellectual reception; it keeps reception claims separate from Sextus’ own ancient position.'},
  {id: 'sextus-popkin', type: 'scholarly-book', authors: ['Richard H. Popkin'], title: 'The History of Scepticism: From Savonarola to Bayle', publisher: 'Oxford University Press', year: 2003, url: 'https://academic.oup.com/book/50001', accessedOn: '2026-08-09', note: 'Independent study used for early-modern transformations of skeptical arguments; later authors are not presented as simply repeating Sextus.'},
];

const primary = (value: string) => c('sextus-primary', 'standard-division', value);
const sep = (value: string) => c('sextus-sep', 'section', value);
const evidence = {
  life: [sep('1. Life; 2. Works'), primary('PH I.236–241')],
  ideas: [primary('PH I.1–15, 21–30, 187–209'), sep('3.1–3.7 The nature of Sextus’ Pyrrhonism')],
  works: [c('sextus-primary', 'work', 'Outlines of Pyrrhonism; Against the Mathematicians I–XI'), sep('2.1 Surviving Works; 4. PH II and III; M VII–XI; 5. M I–VI')],
  influence: [c('sextus-floridi', 'chapter', 'Chapters 3–4'), c('sextus-popkin', 'chapter', 'Renaissance and early-modern skeptical reception')],
  disputes: [sep('3.3–3.7; 4.2 Negative dogmatism in M VII–XI'), c('sextus-annas-barnes', 'chapter', 'Chapters 3–13 and Appendix C')],
  reading: [primary('PH I.1–24; PH II–III; M I–VI'), sep('2.1; 3; 4; 5')],
};

const config: ModernClusterEditorialConfig = {
  sources,
  sectionCitations: {
    overview: [primary('PH I.1–15, 187–209'), sep('1. Life; 3.1–3.2; 3.6')],
    'life-medicine': [primary('PH I.236–241'), sep('1. Life; 3.7 Difference between Pyrrhonism and other schools')],
    outlines: [primary('PH I.1–24, 187–241; PH II.1–259; PH III.1–281'), sep('2.1.1 Outlines of Pyrrhonism; 3; 4. PH II and III; M VII–XI')],
    'against-learned': [primary('M I–VI; M VII–XI'), sep('2.1.2 Against the Mathematicians; 4; 5. M I–VI')],
    'equipollence-suspension': [primary('PH I.8–10, 196–205'), sep('3.2 What is the Skeptical ability or skill?; 3.6 The Skeptical Phrases')],
    modes: [primary('PH I.35–186'), c('sextus-annas-barnes', 'chapter', 'Chapters 3–13 and Appendix C'), sep('3.5 Modes')],
    'appearances-life': [primary('PH I.13, 21–24'), sep('3.4 Does the Skeptic have any beliefs?')],
    rivals: [primary('PH II–III; M VII–XI'), sep('4. PH II and III; M VII–XI')],
    'therapy-denialism': [primary('PH I.12, 25–30'), sep('3.3 Tranquillity')],
    'self-refutation': [primary('PH I.187–209'), sep('3.4 Does the Skeptic have any beliefs?; 3.6 The Skeptical Phrases')],
    revival: [c('sextus-floridi', 'chapter', 'Chapters 3–4'), c('sextus-popkin', 'chapter', 'Renaissance and early-modern skeptical reception'), sep('6. References for the later history of Sextus’ writings')],
    reading: [primary('PH I.1–24; PH II–III; M I–VI'), sep('2.1; 3; 4; 5')],
  },
  evidence,
  patch: {
    lifespan: 'late second–early third century CE; chronology uncertain', birthYear: 160, deathYear: 210,
    region: 'Roman Mediterranean; exact location uncertain', tradition: 'Pyrrhonian skepticism',
    primaryBranchIds: ['skepticism'], secondaryBranchIds: ['epistemology', 'logic', 'ethics'],
    contributionSummary: 'Preserved the fullest surviving account of Pyrrhonian practice: opposing arguments, withholding assent where neither side prevails, and continuing inquiry without a doctrine that truth is impossible.',
    mainIdeas: ['Skeptical ability', 'Equipollence', 'Suspension of judgment', 'Following appearances', 'Therapeutic inquiry'],
    keyWorks: ['Outlines of Pyrrhonism', 'Against the Mathematicians / Against the Learned', 'Against the Logicians, Physicists, and Ethicists'],
    lifeStory: 'Sextus Empiricus was a Pyrrhonian author active probably in the late second or early third century CE. His surviving works reveal much more about skeptical practice than about his biography; the medical label “Empiricus” and his remarks about medical schools require qualified interpretation.',
    historicalContext: 'Roman-imperial philosophical debate among Pyrrhonists, Academic skeptics, Stoics, Epicureans, Platonists, Aristotelians, medical schools, and specialized disciplines of learning.',
    beginnerExplanation: 'Sextus asks what to do when opposing arguments seem equally persuasive. Instead of declaring one side false or saying truth cannot be found, the Pyrrhonist keeps investigating, reports present appearances, and withholds theoretical assent where no case wins.',
    dateDisplay: 'late second–early third century CE; chronology uncertain', dateConfidence: 'low', dateNote: 'No secure birthplace, career chronology, or lifespan survives. The displayed 160–210 anchors are a visual orientation only, not documentary birth and death dates.',
    shortBio: 'The principal surviving author of Pyrrhonian skepticism, Sextus preserves a method of opposing arguments and suspending judgment while leaving his own biography unusually obscure.',
    extendedBio: ['His texts are indispensable evidence for ancient debates, but they are skeptical polemics rather than neutral transcripts of every opponent.', 'His medical identity, account of ordinary life, use of argument, and later reception continue to generate competing interpretations.'],
    centralQuestions: ['What justifies assent when opposed arguments seem equally persuasive?', 'Can inquiry continue without a theory that truth is impossible?', 'Can one follow appearances and ordinary practices without dogmatic claims about reality?', 'Do skeptical arguments depend on the logical standards they challenge?', 'How should a skeptical source be used as evidence for other ancient schools?'],
    majorIdeasDetailed: [
      {name: 'Skeptical ability', explanation: 'Pyrrhonism is presented as a skill of setting appearances and thoughts in opposition, not as a catalog of settled doctrines.', whyItMatters: 'It makes ongoing investigation, rather than a negative theory, central to skeptical practice.'},
      {name: 'Equipollence', explanation: 'Opposed considerations can appear comparably persuasive to an investigator without being declared objectively equal in every respect.', whyItMatters: 'It explains why suspension is a response to inquiry rather than an a priori command.'},
      {name: 'Suspension of judgment', explanation: 'Epochē is withholding theoretical assent when the investigated cases do not yield a decisive basis for preference.', whyItMatters: 'It is not the claim that every proposition is false, equally likely, or permanently unknowable.'},
      {name: 'Following appearances', explanation: 'The skeptic follows feelings, customs, practical arts, and what presently appears without presenting those practices as a final theory of underlying reality.', whyItMatters: 'It addresses the inactivity objection, though its coherence remains disputed.'},
      {name: 'Therapeutic inquiry', explanation: 'Counterarguments are compared to remedies that loosen disturbance caused by dogmatic conviction and can be discarded with what they treat.', whyItMatters: 'It distinguishes skeptical therapy from indifference to evidence or selective denialism.'},
    ],
    keyWorksDetailed: [
      {title: 'Outlines of Pyrrhonism', summary: 'Three books introducing skeptical practice, modes, phrases, ordinary life, and arguments about logic, physics, and ethics.', whyItMatters: 'It is the fullest surviving account of Pyrrhonian skepticism and the primary guide to Sextus’ self-description.'},
      {title: 'Against the Mathematicians / Against the Learned', summary: 'Six books against disciplines such as grammar, rhetoric, mathematics, astrology, and music, conventionally grouped with five further books against logic, physics, and ethics.', whyItMatters: 'The conventional eleven-book title joins two textual groupings whose relationship and order remain scholarly questions.'},
      {title: 'Against the Logicians, Physicists, and Ethicists', summary: 'The books conventionally numbered M VII–XI, parallel in topic to Outlines II–III and containing extensive skeptical counterarguments.', whyItMatters: 'They preserve arguments and reports from many ancient schools while requiring readers to distinguish dialectical use from endorsement.'},
    ],
    lifeEvents: [{approximateYear: 160, label: 'Conventional active-period anchor begins', description: 'A visual orientation within a much broader and uncertain scholarly chronology.'}, {approximateYear: 210, label: 'Conventional active-period anchor ends', description: 'A visual orientation, not a documented death date.'}],
    intellectualDevelopment: ['The surviving corpus cannot securely be ordered into a personal intellectual development.', 'Outlines presents an introductory architecture; the larger anti-dogmatic works extend argument across specialized fields.', 'The conventional grouping of M I–XI joins two textual units whose composition and relationship remain debated.'],
    influencesReceived: ['Pyrrhonian skeptical tradition associated with Pyrrho and Aenesidemus', 'Hellenistic disputes among Stoic, Epicurean, Academic, Peripatetic, and Platonic schools', 'Medical debates over experience, hidden causes, and method'],
    influenceOnLaterThought: ['Renaissance recovery of Greek skeptical texts and Latin translations', 'Montaigne and early-modern debates over custom, criteria, and religious disagreement', 'Descartes’ transformation of skeptical doubt into a search for certainty', 'Hume and later epistemological debates over causation, induction, perception, and justification'],
    influencedByIds: ['pyrrho'], influencedIds: [], disagreementIds: ['zeno', 'epicurus', 'plato', 'aristotle'],
    controversiesOrInterpretiveTensions: ['Precise dates, location, and medical-school affiliation remain uncertain.', 'Scholars disagree about whether the Pyrrhonist has ordinary beliefs, only non-dogmatic acceptance, or no beliefs at all.', 'The modes are diagnostic strategies, not a mechanical proof that every claim fails.', 'Skeptical writing appears to use language, memory, inference, and argumentative standards that it also puts under pressure.', 'Sextus is a crucial source for lost opponents but an interested skeptical author rather than a neutral historian.'],
    commonMisunderstandings: ['Pyrrhonism is not the doctrine that nothing is true or knowable.', 'Suspension is not passive indecision or a refusal to investigate.', '“Against the Mathematicians” does not target only modern mathematics or every practical skill.', 'Following appearances does not settle the scholarly dispute over skepticism and belief.', 'Later uses by Montaigne, Descartes, and Hume transform Sextus rather than simply reproduce his position.'],
    schoolMemberships: ['Pyrrhonian skeptic; the “Empiricus” label links him to ancient medicine, but the exact relation among Pyrrhonism, Empiricism, and Methodism is interpretively contested.'],
    branchContributions: [{branchId: 'skepticism', summary: 'Provides the fullest surviving presentation of Pyrrhonian inquiry, equipollence, suspension, modes, and ordinary-life practice.'}, {branchId: 'epistemology', summary: 'Tests criteria, signs, proof, causation, and the conditions under which assent is warranted.'}, {branchId: 'logic', summary: 'Uses and critiques arguments about proof, inference, definition, and paradox without establishing a rival logic.'}, {branchId: 'ethics', summary: 'Connects tranquility, ordinary practice, and the question whether skeptical restraint can guide a life.'}],
    branchMemberships: [{branchId: 'skepticism', status: 'central', note: 'Principal surviving author of Pyrrhonian skepticism, though his relation to earlier Pyrrhonists is reconstructed from a layered tradition.', confidence: 'high'}, {branchId: 'epistemology', status: 'major', note: 'His skeptical challenges to criteria, signs, proof, and assent are central to the corpus.', confidence: 'high'}, {branchId: 'logic', status: 'major', note: 'The corpus systematically tests logical criteria and arguments while refusing a dogmatic alternative.', confidence: 'high'}, {branchId: 'ethics', status: 'major', note: 'Tranquility and the possibility of ordinary action are essential, contested elements of Pyrrhonian practice.', confidence: 'high'}],
    suggestedFirstReading: 'Outlines of Pyrrhonism I.1–24',
    beginnerReadingPath: [{author: 'Sextus Empiricus', title: 'Outlines of Pyrrhonism I.1–24', difficulty: 'beginner', type: 'primary', whyRead: 'Meet investigation, skeptical ability, suspension, tranquility, and practical life before confronting later arguments.'}, {author: 'Benjamin Morison', title: 'Sextus Empiricus', difficulty: 'beginner', type: 'secondary', whyRead: 'Keep biography, corpus divisions, and interpretive disputes visible.', sourceUrl: 'https://plato.stanford.edu/entries/sextus-empiricus/'}, {author: 'Sextus Empiricus', title: 'Outlines of Pyrrhonism II–III, selections', difficulty: 'intermediate', type: 'primary', whyRead: 'See skeptical practice applied to criteria, signs, proof, nature, theology, and ethics.'}],
    advancedReadingPath: [{author: 'Sextus Empiricus', title: 'Against the Mathematicians / Against the Learned, selections', difficulty: 'advanced', type: 'primary', whyRead: 'Compare challenges to specialized disciplines with the separately organized books against logic, physics, and ethics.'}, {author: 'Julia Annas and Jonathan Barnes', title: 'The Modes of Scepticism', difficulty: 'advanced', type: 'secondary', whyRead: 'Study the modes with their ancient context and modern philosophical limitations.', sourceUrl: 'https://www.cambridge.org/core/books/the-modes-of-scepticism/D82516C6783D9831B83B49B132080C37'}, {author: 'Luciano Floridi', title: 'Sextus Empiricus: The Transmission and Recovery of Pyrrhonism', difficulty: 'advanced', type: 'secondary', whyRead: 'Trace how a difficult ancient corpus became a Renaissance and early-modern resource.', sourceUrl: 'https://academic.oup.com/book/47184'}],
  },
  reviewNotePath: 'docs/editorial/reviews/sextus-empiricus.md', reviewLock: 'fnv1a64:ce3af75496a88610', reviewedOn: '2026-08-09',
};

export const applySextusEditorial = (record: Philosopher): Philosopher => record.id === 'sextus-empiricus' ? applyModernClusterEditorialConfig(record, config) : record;
