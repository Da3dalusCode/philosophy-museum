import type {ArticleSection, CitationLocatorKind, EditorialSource, Philosopher} from '../../types/philosophy';
import {citation as rawCitation, paragraph as p, structuredClaim as claim} from './pilotHelpers';

const verifiedLocatorReplacements: Record<string, readonly [string, string][]> = {
  'soc-sep': [
    ['1. The Socratic problem', '2. The Socratic problem: Who was Socrates really?'],
    ['2. The historical Socrates', '3. A Chronology of the historical Socrates'],
    ['2.2 Biography and trial', '3. A Chronology of the historical Socrates'],
    ['1.1 Aristophanes', '2.1 Three primary sources: Aristophanes, Xenophon, and Plato'],
    ['1.2 Xenophon; 1.3 Plato; 1.4 Aristotle', '2.1 Three primary sources: Aristophanes, Xenophon, and Plato; 2.3 Implications for the philosophy of Socrates'],
    ['2.1 Life; 2.2 Sources for Socrates', '1. Socrates’s strangeness; 2.1 Three primary sources: Aristophanes, Xenophon, and Plato'],
    ['3. Socrates in Plato', '2.2 Contemporary interpretative strategies'],
    ['3.1 Socratic ignorance', '1. Socrates’s strangeness; 2.3 Implications for the philosophy of Socrates'],
    ['4. Socratic ethics', '1. Socrates’s strangeness; 2.3 Implications for the philosophy of Socrates'],
    ['5. Legacy', '4. Socrates outside philosophy'],
    ['4–5', '2.3 Implications for the philosophy of Socrates; 4. Socrates outside philosophy'],
  ],
  'soc-iep': [
    ['1. The Historical Socrates', '1.a. The Historical Socrates'],
    ['2. Life and Trial', '1.a.ii. Later Life and Trial'],
    ['3.1 Socratic Ignorance', '2.b.i. Socratic Ignorance'],
    ['3.2 Socratic Method', '3. Method: How Did Socrates Do Philosophy?'],
    ['3.3 Care of the Soul', '2.b.ii. Priority of the Care of the Soul'],
    ['3.4 Virtue and Knowledge', '2.c.i. Unity of Virtue; All Virtue is Knowledge'],
    ['4. Socratic Influence', '4. Legacy: How Have Other Philosophers Understood Socrates?'],
  ],
};

const c = (sourceId: string, kind?: CitationLocatorKind, value?: string, note?: string) => {
  const verifiedValue = value === undefined
    ? undefined
    : (verifiedLocatorReplacements[sourceId] ?? []).reduce(
      (current, [obsolete, verified]) => current.replaceAll(obsolete, verified),
      value,
    ).split('; ').filter((part, index, parts) => parts.indexOf(part) === index).join('; ');
  return rawCitation(sourceId, kind, verifiedValue, note);
};

const sources: EditorialSource[] = [
  {
    id: 'soc-sep',
    type: 'scholarly-reference',
    authors: ['Debra Nails', 'S. Sara Monoson'],
    title: 'Socrates',
    containerTitle: 'The Stanford Encyclopedia of Philosophy',
    editors: ['Edward N. Zalta', 'Uri Nodelman'],
    publisher: 'Metaphysics Research Lab, Stanford University',
    edition: 'Fall 2025',
    year: 2025,
    url: 'https://plato.stanford.edu/archives/fall2025/entries/socrates/',
    accessedOn: '2026-07-31',
    note: 'Specialist overview used for chronology, source criticism, trial context, and reception.',
  },
  {
    id: 'soc-iep',
    type: 'scholarly-reference',
    authors: ['James M. Ambury'],
    title: 'Socrates',
    containerTitle: 'Internet Encyclopedia of Philosophy',
    publisher: 'University of Tennessee at Martin',
    url: 'https://iep.utm.edu/socrates/',
    accessedOn: '2026-07-31',
    note: 'Independent specialist overview used for the source problem, inquiry, ethics, and later influence.',
  },
  {
    id: 'soc-plato-apology',
    type: 'primary-text',
    authors: ['Plato'],
    title: 'Apology',
    translator: 'Benjamin Jowett',
    containerTitle: 'The Internet Classics Archive',
    publisher: 'Massachusetts Institute of Technology',
    url: 'https://classics.mit.edu/Plato/apology.html',
    accessedOn: '2026-07-31',
    note: 'Cited by standard Stephanus divisions. A dramatic and philosophical defense speech, not a transcript.',
  },
  {
    id: 'soc-xenophon-memorabilia',
    type: 'primary-text',
    authors: ['Xenophon'],
    title: 'Memorabilia, Book 1',
    editors: ['E. C. Marchant'],
    containerTitle: 'Perseus Digital Library',
    publisher: 'Tufts University',
    year: 1923,
    url: 'https://www.perseus.tufts.edu/hopper/text?doc=Xen.+Mem.+1&lang=original',
    accessedOn: '2026-07-31',
    note: 'Cited by book, chapter, and section; Xenophon writes a defense with his own literary and ethical aims.',
  },
  {
    id: 'soc-aristophanes-clouds',
    type: 'primary-text',
    authors: ['Aristophanes'],
    title: 'Clouds',
    containerTitle: 'The Internet Classics Archive',
    publisher: 'Massachusetts Institute of Technology',
    url: 'https://classics.mit.edu/Aristophanes/clouds.html',
    accessedOn: '2026-07-31',
    note: 'Comic drama used as evidence for a public caricature, not as straightforward biography.',
  },
  {
    id: 'soc-xenophon-gutenberg',
    type: 'primary-text',
    authors: ['Xenophon'],
    title: 'The Memorabilia',
    translator: 'H. G. Dakyns',
    publisher: 'Project Gutenberg',
    url: 'https://www.gutenberg.org/ebooks/1177',
    accessedOn: '2026-07-31',
    note: 'Public-domain reading copy listed for further reading; it is not used as the reviewed edition above.',
  },
];

const articleSections: ArticleSection[] = [
  {
    id: 'orientation',
    title: 'Why Socrates is difficult to recover',
    paragraphs: [
      p('soc-orientation-1', 'Socrates left no writings. Nearly every substantial claim about him reaches us through authors who selected, dramatized, defended, mocked, or philosophically redeployed him. Plato made Socrates a speaker in dialogues written across a long career; Xenophon presented a morally useful and law-abiding teacher; Aristophanes turned a recognizable public intellectual into comic theater. Later testimony adds information but also inherits earlier disputes. A responsible profile therefore begins with the evidence problem rather than with a seamless modern biography.', [c('soc-sep', 'section', '1. The Socratic problem'), c('soc-iep', 'section', '1. The Historical Socrates')]),
      p('soc-orientation-2', 'The phrase “Socratic problem” names the attempt to reason from these unlike witnesses without assuming that one of them simply records the historical person. The witnesses overlap on some broad features: an Athenian associated with public conversation, an unconventional manner of inquiry, followers, enemies, a civic trial, and execution in 399 BCE. They diverge over his interests, teaching, character, and doctrines. This page consequently distinguishes secure orientation, source-specific portrayal, and interpretive reconstruction instead of merging them into one voice.', [c('soc-sep', 'section', '1. The Socratic problem'), c('soc-iep', 'section', '1. The Historical Socrates')]),
    ],
    relatedPhilosopherIds: ['plato', 'antisthenes'],
  },
  {
    id: 'chronology-setting',
    title: 'Athens, war, and an approximate life',
    paragraphs: [
      p('soc-setting-1', 'Socrates is conventionally dated to about 470 or 469 BCE and died in 399 BCE. The death date is secure within the ancient chronology of the trial; the birth year is an approximation inferred from later reports about his age. He spent his adult life in fifth-century Athens, a democracy sustained by empire and repeatedly strained by the Peloponnesian War, military defeat, oligarchic coups, the rule of the Thirty, and democratic restoration. Those events form a civic setting, not a one-cause explanation of his philosophy or conviction.', [c('soc-sep', 'section', '2.2 Biography and trial'), c('soc-iep', 'section', '2. Life and Trial')]),
      p('soc-setting-2', 'Ancient accounts associate Socrates with military service and with moments of civic resistance, but the meaning of those episodes is contested. Plato depicts him refusing an unlawful collective trial under the democracy and later refusing an order from the Thirty; Xenophon emphasizes obedience to law and service to the city. These portrayals complicate any attempt to enlist him as a simple partisan of democracy or oligarchy. His associates included politically compromised men, yet association alone does not establish shared policy or responsibility.', [c('soc-plato-apology', 'standard-division', '32a–e'), c('soc-xenophon-memorabilia', 'book-chapter', '1.1–1.2'), c('soc-sep', 'section', '2.2 Biography and trial')]),
    ],
  },
  {
    id: 'witnesses',
    title: 'Four witness traditions',
    paragraphs: [
      p('soc-witnesses-1', 'Aristophanes’ Clouds, first produced in 423 BCE and later revised, presents a comic Socrates who presides over a “Thinkery,” speculates about nature, and teaches verbal tricks. The character combines traits associated with natural philosophers, sophists, and Socrates. The play is valuable evidence that a caricature could be intelligible to an Athenian audience; it is poor evidence that the historical Socrates operated the institution or taught the doctrines assigned to the stage character. Comedy exaggerates by design.', [c('soc-aristophanes-clouds', 'line', '94–260'), c('soc-sep', 'section', '1.1 Aristophanes')]),
      p('soc-witnesses-2', 'Plato’s dialogues provide the richest philosophical Socrates but change in form and apparent purpose. Xenophon’s Socratic works offer an independent literary project, often stressing practical virtue, self-control, piety, and benefit. Aristotle writes later and sometimes separates Socratic from Platonic contributions, but he did not know Socrates as an adult witness. No mechanical rule converts these sources into a verbatim historical record. Their agreements, differences, genres, and dates must be considered claim by claim.', [c('soc-sep', 'section', '1.2 Xenophon; 1.3 Plato; 1.4 Aristotle'), c('soc-iep', 'section', '1. The Historical Socrates')]),
    ],
  },
  {
    id: 'inquiry',
    title: 'Questioning without one uniform method',
    paragraphs: [
      p('soc-inquiry-1', 'Modern summaries often call Socratic inquiry “the Socratic method,” as though it were a fixed classroom procedure. The dialogues show a family of practices instead: asking for an account of a virtue, testing implications, drawing out contradiction, using analogy, professing uncertainty, exhorting an interlocutor, and sometimes offering constructive arguments. The later label elenchus is useful for some refutational exchanges, but scholars disagree about whether those exchanges only expose inconsistency or also support positive ethical conclusions.', [c('soc-iep', 'section', '3.2 Socratic Method'), c('soc-sep', 'section', '3. Socrates in Plato')]),
      p('soc-inquiry-2', 'In Plato’s Apology, Socrates interprets the Delphic oracle through examinations of people reputed to be wise. His comparative advantage is not possession of a secret doctrine; it is refusing to mistake unsupported confidence for knowledge. This is more precise than the popular sentence “I know that I know nothing,” which is not a verbatim line in the Apology. The speech presents a limited recognition of ignorance alongside firm commitments about inquiry, justice, and care of one’s character.', [c('soc-plato-apology', 'standard-division', '20c–23b'), c('soc-sep', 'section', '3.1 Socratic ignorance')]),
    ],
  },
  {
    id: 'ethics',
    title: 'Virtue, knowledge, and care of the soul',
    paragraphs: [
      p('soc-ethics-1', 'The Platonic Socrates repeatedly redirects attention from wealth, reputation, and victory toward the condition of the person who chooses and acts. In the Apology he describes his activity as urging Athenians to care first for wisdom, truth, and the best possible state of the soul. “Soul” here should not be reduced to a later theological picture. In this ethical setting it names the person as an agent whose judgments, desires, and character can be improved or damaged by how one lives.', [c('soc-plato-apology', 'standard-division', '29d–30b'), c('soc-iep', 'section', '3.3 Care of the Soul')]),
      p('soc-ethics-2', 'Several dialogues associate virtue closely with knowledge and wrongdoing with ignorance, creating the family of positions often called Socratic intellectualism. The exact doctrine remains disputed: different dialogues ask whether virtue is one, whether it can be taught, and whether knowing the good is sufficient for right action. It is safer to say that Socratic inquiry makes practical understanding central to character than to assign a complete theory to the historical Socrates. Xenophon likewise links knowledge, self-command, and usefulness, but in a distinct practical register.', [c('soc-iep', 'section', '3.4 Virtue and Knowledge'), c('soc-xenophon-memorabilia', 'book-chapter', '1.2; 1.5'), c('soc-sep', 'section', '4. Socratic ethics')]),
    ],
    relatedBranchIds: ['ethics', 'virtue-ethics'],
  },
  {
    id: 'doctrine-drama',
    title: 'Historical doctrine and Platonic drama',
    paragraphs: [
      p('soc-drama-1', 'Plato’s use of Socrates creates a persistent attribution problem. Some dialogues end without a settled definition; others give Socrates extended arguments about metaphysics, psychology, politics, or education. Developmental readings often distinguish earlier, more recognizably Socratic dialogues from later Platonic constructions, while unitary and literary readings resist a simple chronology. The existence of this debate means that an Atlas profile should not transfer every statement by Plato’s character into a list of the historical Socrates’ doctrines.', [c('soc-sep', 'section', '3. Socrates in Plato'), c('soc-iep', 'section', '1. The Historical Socrates')]),
      p('soc-drama-2', 'The dialogues are philosophical works whose speakers, settings, ironies, and failures matter. Socrates may refute an interlocutor without giving a replacement theory; a confident speech may be tested by its dramatic consequences; and a position voiced in one dialogue may be complicated elsewhere. Reading Socrates well therefore requires two questions at once: what argument is being made, and what does this particular literary presentation ask the reader to notice? That discipline prevents the character from becoming a quotation machine detached from context.', [c('soc-sep', 'section', '3. Socrates in Plato'), c('soc-iep', 'section', '3.2 Socratic Method')]),
    ],
  },
  {
    id: 'trial',
    title: 'Charges, defense, and civic context',
    paragraphs: [
      p('soc-trial-1', 'In 399 BCE Meletus, Anytus, and Lycon prosecuted Socrates. Plato’s Apology formulates the accusation as not recognizing the gods recognized by the city, introducing other divine things, and corrupting the young. Socrates also answers older prejudice associated with natural speculation, sophistic argument, and teaching for pay. These are related contexts but not identical charges. Because Plato’s work is a crafted defense and Xenophon also writes apologetically, neither should be treated as a court transcript.', [c('soc-plato-apology', 'standard-division', '18a–19d; 24b–c'), c('soc-xenophon-memorabilia', 'book-chapter', '1.1.1–1.1.2'), c('soc-sep', 'section', '2.2 Biography and trial')]),
      p('soc-trial-2', 'Political trauma mattered without providing a complete explanation. Athens had recently endured defeat and oligarchic violence, and some notorious oligarchs had belonged to Socrates’ circle. Anytus was connected with democratic restoration. Yet the formal case was religious and educational, and evidence does not justify replacing it with a hidden single political charge. A jury convicted Socrates; after competing penalty proposals, it sentenced him to death. The philosophical sources interpret his refusal to abandon inquiry as a test of integrity under civic authority.', [c('soc-sep', 'section', '2.2 Biography and trial'), c('soc-plato-apology', 'standard-division', '28b–31c; 35e–38b')]),
    ],
    relatedBranchIds: ['political-philosophy', 'philosophy-of-religion'],
  },
  {
    id: 'death',
    title: 'Death, law, and philosophical integrity',
    paragraphs: [
      p('soc-death-1', 'Plato’s Apology presents Socrates as unwilling to stop philosophizing in exchange for acquittal and as more concerned with acting unjustly than with avoiding death. That stance does not settle every question about obedience to law. The Crito stages a different argument about escape, agreement, and the laws of Athens, while the Phaedo gives the death scene a developed metaphysical setting. These works should be read together without assuming that all three preserve a single historical speech.', [c('soc-plato-apology', 'standard-division', '28b–32e; 37e–38a'), c('soc-sep', 'section', '2.2 Biography and trial')]),
      p('soc-death-2', 'Socrates’ execution helped make philosophy’s public responsibility a durable problem: when should inquiry challenge a community, what does a citizen owe its institutions, and can integrity require accepting severe consequences? Later traditions have answered differently. The historical event is not a ready-made argument for civil disobedience, legal submission, martyrdom, or anti-democratic politics. Its force lies partly in the unresolved relation among personal conscience, shared law, public persuasion, and the fallibility of judgment.', [c('soc-sep', 'section', '5. Legacy'), c('soc-iep', 'section', '4. Socratic Influence')]),
    ],
  },
  {
    id: 'influence',
    title: 'Socratic schools and later inheritances',
    paragraphs: [
      p('soc-influence-1', 'Plato became the most influential Socratic writer, but he was not the only claimant to Socrates’ legacy. Xenophon, Antisthenes, Aristippus, Euclides of Megara, and others developed different portraits and practices; only fragments or later reports survive for several Socratic circles. Cynic traditions emphasized independence from convention, while later Stoics treated Socratic virtue and endurance as exemplary. These are inheritances and transformations, not evidence that Socrates founded every later school that admired him.', [c('soc-sep', 'section', '5. Legacy'), c('soc-iep', 'section', '4. Socratic Influence')]),
      p('soc-influence-2', 'Academic skeptics also found resources in Socratic professions of ignorance and practices of argument, whereas other readers treated him as a moral teacher with strong positive commitments. Christian, Islamic, early modern, and modern authors repeatedly remade Socrates as sage, skeptic, martyr, rationalist, dissenter, or educator. The diversity of these receptions is itself evidence against a slogan-sized essence. What persists is a model of philosophy enacted through questioning, accountability, and a life exposed to public examination.', [c('soc-sep', 'section', '5. Legacy'), c('soc-iep', 'section', '4. Socratic Influence')]),
    ],
    relatedBranchIds: ['cynicism', 'stoicism', 'skepticism'],
    relatedPhilosopherIds: ['plato', 'antisthenes', 'arcesilaus'],
  },
  {
    id: 'evidence-discipline',
    title: 'What the evidence can and cannot support',
    paragraphs: [
      p('soc-evidence-1', 'Source criticism does not leave us with nothing. The convergence of independent or differently motivated witnesses supports a cautious core: Socrates was a conspicuous Athenian conversational figure, attracted associates, acquired a public reputation for unsettling inquiry, was prosecuted in 399 BCE, and was executed after conviction. Particular scenes, exact words, systematic doctrines, domestic details, and motives carry different evidential weights. Historical confidence therefore comes in degrees; a claim need not be either indisputable fact or useless legend.', [c('soc-sep', 'section', '1. The Socratic problem; 2. The historical Socrates'), c('soc-iep', 'section', '1. The Historical Socrates; 2. Life and Trial')]),
      p('soc-evidence-2', 'The ancient authors also answer one another. Xenophon explicitly defends Socrates against accusations resembling the formal charge, while Plato’s Apology has its speaker confront both the indictment and the older image made familiar by comedy. Similarity may therefore reflect a shared historical situation, literary response, or both. Responsible reconstruction compares genre, date, authorial purpose, and possible dependence before counting “three sources” as three confirmations. That practice is slower than harmonizing every report, but it makes disagreements visible and prevents later reception from masquerading as eyewitness evidence.', [c('soc-plato-apology', 'standard-division', '18a–24b'), c('soc-xenophon-memorabilia', 'book-chapter', '1.1–1.2'), c('soc-sep', 'section', '1. The Socratic problem')]),
    ],
  },
  {
    id: 'conversation-teaching',
    title: 'Conversation, teaching, and the sophists',
    paragraphs: [
      p('soc-conversation-1', 'Plato’s Apology denies that Socrates was a professional teacher who charged a fee and says that he conversed with anyone willing to listen. This separates his self-presentation from prominent itinerant educators who advertised instruction, but it does not prove that every contrast between “Socrates” and “the sophists” was absolute. Fifth-century intellectual life included overlapping interests in argument, virtue, education, language, and civic success. Aristophanes could fuse these roles precisely because an audience recognized both proximity and difference among public intellectual types.', [c('soc-plato-apology', 'standard-division', '19d–20c; 33a–b'), c('soc-aristophanes-clouds', 'line', '94–260'), c('soc-sep', 'section', '2.1 Life; 2.2 Sources for Socrates')]),
      p('soc-conversation-2', 'Calling the people around Socrates “students” can therefore mislead if it suggests a school with enrollment, curriculum, fees, and certified doctrine. Plato and Xenophon portray recurring associates as well as incidental interlocutors; some admired him, some imitated a manner of questioning, and some later wrote competing Socratic works. The relation could be educational without becoming a profession. This ambiguity also mattered at trial: Socrates denied responsibility for teaching corruption, while accusers could point to younger companions and their conduct as evidence of influence.', [c('soc-plato-apology', 'standard-division', '19d–20c; 25a–26a; 33a–b'), c('soc-xenophon-memorabilia', 'book-chapter', '1.2'), c('soc-iep', 'section', '2. Life and Trial')]),
    ],
  },
  {
    id: 'irony-aporia',
    title: 'Irony, definition, and productive perplexity',
    paragraphs: [
      p('soc-irony-1', 'Socratic irony is more than sarcasm. In many Platonic encounters Socrates presents himself as needing instruction, praises an interlocutor’s expertise, and asks apparently modest questions that expose how difficult the claimed expertise is to state consistently. Readers dispute when this profession of ignorance is sincere, strategic, playful, or several things at once. Treating every disclaimer as a wink makes Socrates secretly omniscient; treating every compliment literally ignores dramatic context. The philosophically important point is that authority is made answerable to reasons rather than accepted through status alone.', [c('soc-iep', 'section', '3.1 Socratic Ignorance; 3.2 Socratic Method'), c('soc-sep', 'section', '3. Socrates in Plato')]),
      p('soc-irony-2', 'Many definitional conversations end in aporia, a state of perplexity in which a proposed account has failed and no final replacement has been secured. Such endings are not automatically empty. They can uncover hidden assumptions, separate examples from definitions, reveal conflicts among commitments, and teach readers how easily confidence outruns understanding. Yet aporia does not prove that no answer exists or that Socrates endorses permanent suspension on every subject. The dialogues often combine unresolved inquiry with demands to continue examining how one lives.', [c('soc-iep', 'section', '3.2 Socratic Method; 3.3 Care of the Soul'), c('soc-sep', 'section', '3. Socrates in Plato; 4. Socratic ethics')]),
    ],
    relatedBranchIds: ['epistemology', 'logic'],
  },
  {
    id: 'religion-sign',
    title: 'Piety, oracle, and the divine sign',
    paragraphs: [
      p('soc-religion-1', 'Religion is not incidental to the surviving trial narratives. In Plato’s defense speech, Socrates interprets the Delphic oracle as imposing a mission of examination and describes a divine sign that restrains him from certain actions. Xenophon likewise defends his customary religious practice and reports divination. These portrayals complicate the modern image of a purely secular rationalist. They also do not settle the historical meaning of his piety, because both authors are answering an accusation involving the city’s gods and “new divine things.”', [c('soc-plato-apology', 'standard-division', '20e–23c; 27c–31d'), c('soc-xenophon-memorabilia', 'book-chapter', '1.1.1–1.1.20'), c('soc-sep', 'section', '2.2 Biography and trial')]),
      p('soc-religion-2', 'The daimonion is often sensationalized as a voice supplying doctrines or predictions. Plato’s Apology describes it more narrowly as a familiar oppositional sign and uses it again when Socrates reflects on the absence of a warning during the trial. What ontological interpretation Socrates gave the experience remains uncertain. For historical exposition, the safest language reports how each source represents the sign and how it functions in an argument. Translating that representation directly into psychiatric diagnosis, supernatural proof, or modern private conscience would add a framework the evidence does not itself establish.', [c('soc-plato-apology', 'standard-division', '31c–d; 40a–c'), c('soc-sep', 'section', '2.2 Biography and trial'), c('soc-iep', 'section', '2. Life and Trial')]),
    ],
    relatedBranchIds: ['philosophy-of-religion'],
  },
  {
    id: 'knowledge-action',
    title: 'Knowledge, desire, and moral failure',
    paragraphs: [
      p('soc-action-1', 'The claim that no one does wrong willingly is one of the most challenging positions associated with the Platonic Socrates. It does not mean harmful action is harmless or that offenders lack responsibility. It suggests that action follows what appears good to the agent, so wrongdoing involves ignorance, mismeasurement, or a disordered understanding of benefit. Different dialogues develop this family of arguments differently, and scholars dispute whether the historical Socrates held a single intellectualist psychology. The position should therefore be presented as a recurring Socratic problem, not a simple empirical slogan.', [c('soc-iep', 'section', '3.4 Virtue and Knowledge'), c('soc-sep', 'section', '4. Socratic ethics')]),
      p('soc-action-2', 'This intellectualism explains why examination is ethically urgent: if people mistake reputation, domination, wealth, or immediate gratification for genuine benefit, improved reasoning can change desire and conduct. It also attracts a durable objection. People seem able to judge one course better while choosing another, and emotion, habit, coercion, addiction, and self-deception complicate the equation of knowledge with virtue. Plato’s later psychological constructions can be read partly against that problem, but attributing those constructions back to the historical Socrates would collapse the distinction this page preserves.', [c('soc-iep', 'section', '3.4 Virtue and Knowledge'), c('soc-sep', 'section', '3. Socrates in Plato; 4. Socratic ethics')]),
    ],
    relatedBranchIds: ['ethics', 'philosophy-of-mind'],
  },
  {
    id: 'education-politics',
    title: 'Education, democracy, and political judgment',
    paragraphs: [
      p('soc-politics-1', 'Socratic questioning could have political effects even when a conversation concerned courage, piety, or self-control. Claims to civic expertise were being tested, prominent people could be embarrassed before listeners, and younger associates could learn to challenge inherited authority. Plato’s Apology compares Socrates’ activity to a gadfly awakening a large horse, a deliberately provocative image of public benefit. The speech also says he avoided ordinary political office because a person who genuinely opposes injustice would not survive long. That is a literary self-defense, not a neutral constitutional theory.', [c('soc-plato-apology', 'standard-division', '29d–31c'), c('soc-sep', 'section', '2.2 Biography and trial; 4. Socratic ethics')]),
      p('soc-politics-2', 'The record resists assigning Socrates a modern political label. He served the city and, in Plato’s account, resisted unlawful action under both democratic and oligarchic authorities. At the same time, several associates became enemies of the restored democracy, and Platonic dialogues often criticize mass judgment and unexamined rhetoric. These facts support inquiry into education and political competence; they do not prove that the historical Socrates designed Plato’s ideal state, endorsed the Thirty, or opposed every democratic institution. Association, dramatic argument, and historical doctrine must remain distinct.', [c('soc-plato-apology', 'standard-division', '31c–32e'), c('soc-xenophon-memorabilia', 'book-chapter', '1.2'), c('soc-sep', 'section', '2.2 Biography and trial')]),
    ],
    relatedBranchIds: ['political-philosophy'],
  },
  {
    id: 'apology-arguments',
    title: 'Four arguments in the Apology',
    paragraphs: [
      p('soc-apology-arguments-1', 'The oracle story is an inquiry into comparative wisdom, not a revelation that Socrates is omniscient. Plato’s speaker tests politicians, poets, and craftspeople and concludes that expertise in one domain can be accompanied by unjustified confidence elsewhere. Craftspeople genuinely know things he does not, so the lesson is not contempt for skill. The failure occurs when limited competence expands into an unsupported claim to wisdom about the most important matters. Socratic ignorance is therefore diagnostic and domain-sensitive rather than a theatrical denial that any knowledge is possible.', [c('soc-plato-apology', 'standard-division', '20c–23c'), c('soc-iep', 'section', '3.1 Socratic Ignorance'), c('soc-sep', 'section', '3.1 Socratic ignorance')]),
      p('soc-apology-arguments-2', 'When Meletus alleges corruption, Socrates asks who improves the young and whether he corrupts intentionally. The exchange is rhetorically forceful but not a complete modern philosophy of education. Its claim that no one would knowingly make close associates worse rests on the expectation that bad companions would harm the corrupter in return; an accuser could challenge that psychology or argue that influence works indirectly. Reading the cross-examination as an argument with contestable premises is more instructive than celebrating it as an effortless logical knockout.', [c('soc-plato-apology', 'standard-division', '24c–26a'), c('soc-iep', 'section', '2. Life and Trial; 3.2 Socratic Method')]),
      p('soc-apology-arguments-3', 'The speech also attacks fear of death as a pretense to knowledge. Death might be dreamless absence or a migration where conversation continues; claiming confidently that it is the greatest evil exceeds the available knowledge. Socrates does not infer that death is certainly good, and the two possibilities belong to Plato’s dramatic defense rather than a verified report about an afterlife. The practical conclusion is asymmetrical: uncertainty about death should not license conduct one has reason to judge unjust.', [c('soc-plato-apology', 'standard-division', '29a–b; 40c–41c'), c('soc-sep', 'section', '2.2 Biography and trial; 4. Socratic ethics')]),
      p('soc-apology-arguments-4', 'A final strand connects personal integrity with public benefit. Socrates claims that a good person should consider whether an action is just rather than calculate survival alone, and he presents examination as service to the city. That combination prevents two opposite simplifications. He is not merely an individualist protecting private authenticity, because his activity addresses fellow citizens and the quality of civic life. Nor is he a servant of whatever the city commands, because he describes refusing unlawful or unjust orders. The unresolved relation is exactly what gives the speech continuing political force.', [c('soc-plato-apology', 'standard-division', '28b–32e; 36b–d'), c('soc-sep', 'section', '2.2 Biography and trial; 4–5'), c('soc-iep', 'section', '2. Life and Trial; 4. Socratic Influence')]),
    ],
    relatedBranchIds: ['ethics', 'political-philosophy', 'epistemology'],
  },
  {
    id: 'reading',
    title: 'How to read Socrates responsibly',
    paragraphs: [
      p('soc-reading-1', 'Begin with Plato’s Apology, marking separately the formal accusations, the older public image, the oracle story, and Socrates’ account of his activity. Then read a short refutational dialogue and compare its procedure with the speech. Add Xenophon’s opening defense in Memorabilia and selected scenes from Aristophanes’ Clouds. The goal is not to vote for a favorite witness but to see how genre, purpose, and chronology shape each available Socrates.', [c('soc-plato-apology', 'standard-division', '17a–42a'), c('soc-xenophon-memorabilia', 'book-chapter', '1.1–1.2'), c('soc-aristophanes-clouds', 'work', 'Clouds')]),
      p('soc-reading-2', 'Use modern reference works after encountering the ancient evidence. They can clarify the Socratic problem, competing models of elenchus, and the difference between historical and Platonic attribution. Keep quotations attached to a named work and standard locator. In particular, replace the familiar “I know that I know nothing” slogan with the more careful Apology argument: Socrates claims an advantage only where he does not think he knows what he does not know, while maintaining substantive ethical commitments.', [c('soc-sep', 'section', '1–4'), c('soc-iep', 'section', '1–4'), c('soc-plato-apology', 'standard-division', '21b–23b')]),
      p('soc-reading-3', 'Translation and selection shape a beginner’s Socrates. Standard Stephanus divisions let readers compare editions of Plato even when English wording differs, while Xenophon is cited by book, chapter, and section. A quotation found without those coordinates should be traced before it is used as evidence. Read introductions critically as interpretations, especially when they divide dialogues into fixed periods or claim to have solved the historical problem. Finally, keep a claim ledger: mark which statements belong to Plato’s character, Xenophon’s defense, comic caricature, later testimony, or modern reconstruction. That simple habit preserves the plurality of the evidence while allowing a reasoned portrait to emerge.', [c('soc-sep', 'section', '1. The Socratic problem; 3. Socrates in Plato'), c('soc-iep', 'section', '1. The Historical Socrates'), c('soc-plato-apology', 'work', 'Apology'), c('soc-xenophon-memorabilia', 'book-chapter', 'Book 1')]),
    ],
    relatedWorkTitles: ['Apology', 'Memorabilia', 'Clouds'],
  },
];

export const applySocratesEditorial = (record: Philosopher): Philosopher => {
  if (record.id !== 'socrates') return record;
  return {
    ...record,
    name: 'Socrates',
    lifespan: 'c. 470/469–399 BCE',
    birthYear: -470,
    deathYear: -399,
    region: 'Athens',
    tradition: 'Classical Greek / Socratic',
    primaryBranchIds: ['ancient-greek', 'ethics'],
    secondaryBranchIds: ['epistemology', 'political-philosophy'],
    mainIdeas: ['Examined life', 'Recognized ignorance', 'Dialogical testing', 'Care of the soul', 'Virtue and practical understanding'],
    keyWorks: ['No writings survive; evidence comes from Plato, Xenophon, Aristophanes, Aristotle, and later testimony'],
    lifeStory: 'Socrates was an Athenian philosopher active in the fifth century BCE whose life must be reconstructed from divergent literary witnesses. He was tried and executed in 399 BCE.',
    contributionSummary: 'Made public questioning and ethical self-examination a defining model of philosophy without leaving a written doctrine.',
    beginnerExplanation: 'Socrates asks people to explain the values they rely on, then tests whether those explanations fit their other commitments. The aim is ethical accountability, not a trick for winning arguments.',
    influencedByIds: [],
    influencedIds: ['plato', 'antisthenes', 'arcesilaus'],
    disagreementIds: [],
    suggestedFirstReading: 'Plato, Apology',
    historicalContext: 'Fifth-century Athens during empire, the Peloponnesian War, oligarchic coups, democratic restoration, and renewed anxiety about education and civic loyalty.',
    dateDisplay: 'c. 470/469–399 BCE',
    dateConfidence: 'low',
    dateNote: 'The execution in 399 BCE is historically secure; the commonly reported birth year is an approximate inference from later testimony about Socrates’ age.',
    shortBio: 'An Athenian philosopher known only through other writers, Socrates practiced public conversation, challenged claims to wisdom, attracted varied associates, and was executed after a civic trial.',
    extendedBio: [
      'No autobiography, treatise, or transcript supplies a direct historical voice. Plato, Xenophon, Aristophanes, Aristotle, and later authors preserve unlike Socrateses shaped by philosophy, defense, comedy, and retrospective classification.',
      'His trial followed decades of war and political upheaval. Some associates were politically notorious, but the formal accusations concerned impiety and corruption of the young; the relation between civic trauma and conviction remains interpretively contested.',
    ],
    centralQuestions: ['How should a person examine claims to wisdom and care for the character from which actions arise?', 'Can exposing inconsistency improve ethical understanding?', 'What does integrity require when individual judgment and civic authority conflict?'],
    majorIdeasDetailed: [
      {name: 'Recognized ignorance', explanation: 'Socratic inquiry begins by not confusing reputation or confidence with knowledge.', whyItMatters: 'It makes intellectual humility an active discipline of testing reasons.'},
      {name: 'Dialogical examination', explanation: 'Questions, definitions, implications, analogies, and refutations test an interlocutor’s commitments.', whyItMatters: 'The practice makes philosophy accountable to reasons exchanged with other people.'},
      {name: 'Care of the soul', explanation: 'Ethical attention is directed toward judgment and character before wealth, status, or mere survival.', whyItMatters: 'It links philosophical inquiry to the kind of person one becomes.'},
      {name: 'Virtue and understanding', explanation: 'Socratic sources connect good action closely with practical knowledge, although the precise doctrine is disputed.', whyItMatters: 'It asks whether moral failure is partly a failure to understand what genuinely benefits a person.'},
    ],
    keyWorksDetailed: [
      {title: 'Plato, Apology', approximateYear: -399, summary: 'A literary defense speech portraying Socrates’ mission, trial, ethical commitments, and response to death.', whyItMatters: 'It is the clearest starting point but not a verbatim transcript.'},
      {title: 'Xenophon, Memorabilia', summary: 'A defense and recollection presenting Socrates as pious, self-controlled, useful, and practically ethical.', whyItMatters: 'It provides an independent Socratic project that both overlaps with and differs from Plato.'},
      {title: 'Aristophanes, Clouds', approximateYear: -423, summary: 'A comedy that fuses Socrates with natural philosophy and sophistic education.', whyItMatters: 'It witnesses public caricature while warning against reading comedy as biography.'},
    ],
    lifeEvents: [
      {approximateYear: -470, label: 'Approximate birth', description: 'Born in or near Athens; the precise year is not securely documented.'},
      {year: -423, label: 'Clouds produced', description: 'Aristophanes stages a comic Socrates for an Athenian audience.'},
      {year: -399, label: 'Trial and execution', description: 'Convicted on charges concerning the gods and corruption of the young, then executed.'},
    ],
    intellectualDevelopment: ['No securely recoverable sequence of Socrates’ own doctrinal development survives.', 'Platonic, Xenophontic, comic, and later portrayals must be evaluated as distinct witnesses.', 'Later Socratic schools and traditions selected different aspects of the remembered figure.'],
    influencesReceived: ['Athenian civic, poetic, religious, scientific, and sophistic debates form the setting; direct intellectual dependence is difficult to establish.'],
    influenceOnLaterThought: ['Plato and multiple Socratic circles', 'Cynic and Stoic models of virtue and independence', 'Academic skeptical inquiry', 'Later ideals of philosophy as an examined way of life'],
    controversiesOrInterpretiveTensions: ['The historical Socrates cannot be cleanly separated from literary portrayals.', 'Scholars disagree about whether refutation supports positive doctrine.', 'Political context matters to the trial, but it does not justify replacing the formal charges with a single hidden cause.'],
    commonMisunderstandings: ['“I know that I know nothing” is not a verbatim sentence in Plato’s Apology.', 'There is no single uniform procedure called the Socratic method across every dialogue.', 'Not every doctrine spoken by Plato’s character can be assigned to the historical Socrates.', 'Socrates did not found every later school that claimed his example.'],
    schoolMemberships: ['Socratic circles are later classifications around a person who left no institution or written corpus.'],
    branchContributions: [
      {branchId: 'ancient-greek', summary: 'Made dialogical ethical examination a defining model of classical Greek philosophy.'},
      {branchId: 'ethics', summary: 'Placed the condition of character, practical understanding, and responsibility at the center of inquiry.'},
      {branchId: 'epistemology', summary: 'Made awareness of one’s epistemic limits a practical starting point for examination.'},
      {branchId: 'political-philosophy', summary: 'Became a contested case about conscience, law, civic education, and public philosophy.'},
    ],
    branchMemberships: [
      {branchId: 'ancient-greek', status: 'central', note: 'A central classical Athenian figure reconstructed through divergent sources.', confidence: 'high'},
      {branchId: 'ethics', status: 'central', note: 'Central to later accounts of virtue, care of character, and ethical examination.', confidence: 'high'},
      {branchId: 'epistemology', status: 'major', note: 'Important for disciplined recognition of ignorance and testing claims to knowledge.', confidence: 'medium'},
      {branchId: 'political-philosophy', status: 'associated', note: 'His trial and literary afterlife frame disputes about philosophy and civic authority.', confidence: 'medium'},
    ],
    beginnerReadingPath: [
      {title: 'Apology', author: 'Plato', approximateYear: -399, type: 'dialogue', difficulty: 'beginner', whyRead: 'Begin with the oracle story, the charges, and the ethical account of Socrates’ activity.', publicDomainUrl: 'https://classics.mit.edu/Plato/apology.html', notes: 'Use Stephanus divisions; read as a Platonic work, not a transcript.'},
      {title: 'Memorabilia, Book 1', author: 'Xenophon', type: 'primary', difficulty: 'intermediate', whyRead: 'Compare an independent apologetic and practical portrayal.', sourceUrl: 'https://www.perseus.tufts.edu/hopper/text?doc=Xen.+Mem.+1&lang=original'},
    ],
    advancedReadingPath: [
      {title: 'Clouds', author: 'Aristophanes', approximateYear: -423, type: 'primary', difficulty: 'intermediate', whyRead: 'Study a comic public image without treating it as transparent biography.', sourceUrl: 'https://classics.mit.edu/Aristophanes/clouds.html'},
      {title: 'Socrates', author: 'Debra Nails and S. Sara Monoson', year: 2025, type: 'secondary', difficulty: 'advanced', whyRead: 'Trace the source problem, chronology, politics, philosophy, and reception in a specialist overview.', sourceUrl: 'https://plato.stanford.edu/archives/fall2025/entries/socrates/'},
    ],
    sourceLinks: [],
    articleSections,
    editorial: {
      sources,
      furtherReadingSourceIds: ['soc-xenophon-gutenberg'],
      structuredClaims: {
        classification: claim('Athens · Classical Greek / Socratic', [c('soc-sep', 'section', '2.2 Biography and trial')]),
        date: claim('c. 470/469–399 BCE', [c('soc-sep', 'section', '2.2 Biography and trial'), c('soc-iep', 'section', '2. Life and Trial')]),
        'contribution-summary': claim('Made public questioning and ethical self-examination a defining model of philosophy without leaving a written doctrine.', [c('soc-sep', 'section', '1. The Socratic problem; 5. Legacy'), c('soc-iep', 'section', '3–4')]),
        'short-biography': claim('An Athenian philosopher known only through other writers, Socrates practiced public conversation, challenged claims to wisdom, attracted varied associates, and was executed after a civic trial.', [c('soc-sep', 'section', '1–2')]),
        'historical-context': claim('Fifth-century Athens during empire, war, coups, restoration, and civic anxiety.', [c('soc-sep', 'section', '2.2 Biography and trial')]),
        'central-problem': claim('How should a person examine claims to wisdom and care for the character from which actions arise?', [c('soc-plato-apology', 'standard-division', '20c–23b; 29d–30b')]),
        'dating-note': claim('Execution date secure; birth year approximate.', [c('soc-sep', 'section', '2.2 Biography and trial')]),
      },
      review: {
        status: 'claim-reviewed',
        reviewedOn: '2026-07-31',
        method: 'Full visitor-page claim review with source comparison, structured-fact review, quote check, reuse reconciliation, and automated lock validation.',
        reviewNotePath: 'docs/editorial/reviews/socrates.md',
        lock: 'fnv1a64:6e6aff134ff8e585',
        evidencePolicy: {requiredSourceTypes: ['primary-text']},
      },
    },
  };
};
