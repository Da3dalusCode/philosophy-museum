import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';

type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

const objectLed = (
  name: string,
  paragraphs: readonly string[],
  orientation: readonly VisitorGuideSection[],
  assetId: MuseumAssetId,
  objectText: string,
  lock: `fnv1a64:${string}`,
): MuseumPrimaryInterpretationEnrichment => ({
  lead: '',
  keyIdeas: [],
  keyWorks: [],
  sections: [{heading: '', paragraphs}],
  presentation: {
    mode: 'concise',
    orientation,
    articleActionLabel: `Read the full sourced ${name} article`,
    bodyLayout: 'prose',
    exhibitLayout: 'object-led',
    plaqueKicker: '',
    plaqueSubtitleLines: 4,
  },
  objectInterpretations: {[assetId]: objectText},
  review: {
    status: 'standard-compliant',
    reviewedOn: '2026-08-09',
    method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.',
    lock,
  },
});

export const CANONICAL_ORDER_PRIMARY_INTERPRETATIONS_B:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  kuhn: objectLed(
    'Thomas Kuhn',
    [
      'Thomas Kuhn changed how many readers picture scientific change by insisting that research is usually organized before it is revolutionary. In normal science, a community works with exemplary achievements, shared standards, instruments, problems, and expectations. Researchers do not merely repeat an inherited theory: they extend its reach by solving puzzles whose form the tradition makes intelligible. This account challenges the fantasy that inquiry begins afresh with bare observations, but it does not make science a closed club or deny that experiments can resist expectation. The history, training, material practices, and problem-solving of a field matter to what investigators can notice and credibly claim.',
      'An anomaly is not automatically a crisis, and a crisis is not automatically a revolution. A persistent difficulty must become important within a community, while a viable alternative must offer a new way to organize work. Kuhn used “paradigm” broadly in early discussion, then clarified disciplinary matrices and exemplars: shared commitments and learned problem-solutions rather than one slogan or rulebook. Incommensurability marks a change in conceptual organization, standards, and taxonomies; it is not total mutual unintelligibility. Scientists can still argue, translate imperfectly, compare results, and learn from predecessors, even when they disagree about what counts as the same problem or a satisfactory answer.',
      'The 1977 photograph shows Kuhn at a Princeton blackboard, not the composition or first reception of his 1962 Structure of Scientific Revolutions. It makes a late teaching moment visible: a historian of science explaining before a marked surface, not a theory of revolutions in pictorial form. The photograph cannot prove that science is irrational, that facts are invented by communities, or that theory choice has no reasons. Kuhn instead prompts a harder question: how do evidence, inherited exemplars, professional judgment, and shared values interact when a field changes? His answer remains disputed, especially where non-cumulative change, progress, realism, and rationality meet.',
    ],
    [
      {heading: 'How change works', items: [
        {label: 'Normal science', description: 'Research works within inherited achievements, extending and testing the problems a trained community recognizes as worth solving.'},
        {label: 'Crisis and revolution', description: 'Persistent trouble and a credible alternative can reorganize a field, but neither follows mechanically from one surprising result.'},
      ]},
      {heading: 'Key distinctions', items: [
        {label: 'Paradigm', description: 'Kuhn’s early flexible term was later clarified through shared commitments and exemplary problem-solutions, not one simple rule.'},
        {label: 'Incommensurability', description: 'A shift can alter concepts and standards without making communication, comparison, or historical learning impossible.'},
      ]},
      {heading: 'Keep asking', items: [
        {label: 'Theory choice', description: 'Values such as accuracy, scope, simplicity, and fruitfulness guide judgment, but they do not operate as an automatic decision formula.'},
        {label: 'Progress', description: 'Kuhn disputes a simple cumulative story while leaving live arguments about rational improvement and realism.'},
      ]},
    ],
    'kuhn-portrait-1977',
    'This 1977 Princeton photograph shows Thomas Kuhn pointing at a blackboard. It is a lifetime image from well after the 1962 first edition of The Structure of Scientific Revolutions, so it records a later teaching setting rather than the book’s composition or initial controversy. Blackboard, gesture, and portraiture make academic practice visible; they cannot settle Kuhn’s disputed claims about progress, realism, rationality, or scientific communities.',
    'fnv1a64:c19d2c6c9a41ecc2',
  ),
  'philosophy-of-religion': objectLed(
    'Philosophy of Religion',
    [
      'Philosophy of Religion investigates questions that people identify, often contestably, with religion, divinity, ultimacy, liberation, sacred order, and their critique. It includes arguments about God and natural theology, but it is not exhausted by a courtroom for theism. Philosophers also examine experience, ritual, texts, institutions, testimony, language, authority, embodiment, suffering, and the categories used to group these matters. Some work from within a tradition; some compares traditions; some defends naturalism, suspends judgment, or criticizes religious and secular power. The field must distinguish assessing a claim from asking how the category “religion” itself organizes a comparison.',
      'Questions of warrant do not reduce to one contest between faith and reason. Faith may name trust, loyalty, hope, practical orientation, testimony, or assent; reasoning may include demonstration, interpretation, probabilistic inference, or cultivated judgment. Arguments from dependence, order, value, experience, evil, and hiddenness invite different standards and objections. Testimony, training, and inherited concepts can enable inquiry while also raising worries about circularity, exclusion, and harmful authority. Religious disagreement similarly calls for more than polite relativism: exclusivist, inclusivist, pluralist, skeptical, and revisionary responses disagree, and even the boundaries of a tradition or a supposedly shared proposition can be theory-laden.',
      'The displayed 2026 Museum illustration depicts an imagined open forum: reading, conversation, meditation, gathering, natural awe, doubt, and converging or diverging paths surround a luminous center. It is a curatorial prompt, not a document from any community, a survey of world religions, or evidence that traditions share one hidden destination. Its deliberately plural scenes make a useful warning visible. Comparison needs bounded texts, practices, languages, and histories; it cannot turn Nāgārjuna’s liberative argument, Ru ritual cultivation, Humean critique, Christian theology, or any other case into a decorative version of a single model. The exhibit asks what a philosophical inquiry can clarify while preserving the differences that give its questions force.',
    ],
    [
      {heading: 'What the field studies', items: [
        {label: 'Claims and practices', description: 'Arguments, experience, ritual, texts, institutions, authority, and critique can all be philosophical material when their roles are made explicit.'},
        {label: 'A contested category', description: '“Religion” is not a neutral container, so the way traditions and questions are grouped must itself be examined.'},
      ]},
      {heading: 'Questions of warrant', items: [
        {label: 'Testimony and experience', description: 'Reports, formation, and lived experience may matter to inquiry without automatically settling whether a claim is true.'},
        {label: 'Evil and hiddenness', description: 'Suffering and apparent divine absence challenge accounts of ultimate order while also demanding ethical, not merely theoretical, attention.'},
      ]},
      {heading: 'Compare carefully', items: [
        {label: 'Disagreement', description: 'Diversity does not prove sameness or error; competing responses need arguments about reasons, authority, and practice.'},
        {label: 'Bounded examples', description: 'A comparison should name particular texts and histories rather than treating traditions as interchangeable specimens.'},
      ]},
    ],
    'philosophy-religion-plural-inquiry-interpretive',
    'This original 2026 Philosophy Atlas Museum illustration stages an imagined plural forum with readers, conversation, contemplation, gathering, doubt, natural awe, and paths approaching or leaving an open center. It is not an artifact from a religious tradition, a neutral map of religions, or evidence that their claims converge. The image is a conceptual prompt for careful comparison: it can foreground multiple modes of inquiry while leaving the histories, commitments, and disagreements of particular communities to the article and its sources.',
    'fnv1a64:08ea95587048a2ba',
  ),
  antisthenes: objectLed(
    'Antisthenes',
    [
      'Antisthenes is best approached first as a Socratic writer and teacher whose evidence is varied and incomplete. Xenophon gives him a prominent place in literary conversations that emphasize endurance, self-command, practical virtue, and independence from luxury. Those works are neither transcripts nor a complete biographical dossier, but they establish a Socratic identity more securely than later stories of ancestry, dates, teachers, and succession. His philosophical importance therefore does not depend on turning an uneven archive into a single austere doctrine. The questions he raises join how one lives to how one speaks, teaches, interprets poetry, and distinguishes what a person genuinely needs from what convention displays as necessary.',
      'Only Ajax and Odysseus survive continuously under Antisthenes’s name. Their competing heroic speeches show that rhetoric, ethical character, and Homeric interpretation belong beside later Cynicism. Diogenes Laertius’s catalogue of attributed titles indicates a much broader ancient reputation, yet it cannot recover the contents of lost books. Reports about predication, contradiction, names, education, and virtue arrive through different authors and disputes. They may preserve real points of pressure, but they should not be welded into a tidy system or used to make Antisthenes a precursor of a modern theory of language. Reading the surviving and reported materials means keeping genre, witness, and claim separate.',
      'Later tradition often supplies the simple story: Socrates taught Antisthenes, Antisthenes taught Diogenes, and Cynicism followed. Similarities in self-sufficiency, toughness, and suspicion of convention make the connection important, but direct instruction and a single founder role remain disputed. The marble herm displayed here is a Roman copy of an earlier Greek portrait type traditionally identified as Antisthenes. It gives later readers an ancient material focus, yet its inherited identification and copy status cannot prove his appearance or adjudicate Cynic genealogy. Let the bust sharpen a methodological lesson: a respected likeness and a memorable lineage can preserve reception without settling authorship, doctrine, or succession.',
    ],
    [
      {heading: 'Read the evidence', items: [
        {label: 'Socratic writer', description: 'Xenophon’s literary portraits make Antisthenes’s Socratic setting important, while still requiring caution about direct speech and biography.'},
        {label: 'Uneven survival', description: 'Two declamations survive; lost titles and later reports expand the dossier without restoring a complete authored corpus.'},
      ]},
      {heading: 'Questions he opens', items: [
        {label: 'Virtue and self-sufficiency', description: 'Ethical independence tests whether wealth, status, and comfort are supports for a good life or distractions from it.'},
        {label: 'Words and education', description: 'Reports on names, argument, and Homeric reading show that ethical formation was connected to interpretation and speech.'},
      ]},
      {heading: 'A contested inheritance', items: [
        {label: 'Cynic connection', description: 'Antisthenes is an influential precursor or disputed ancestor, not an uncontested founder whose program simply became Cynicism.'},
        {label: 'Reception is evidence', description: 'Later succession stories explain how he was remembered, but they do not automatically document direct personal contact.'},
      ]},
    ],
    'antisthenes-british-museum-bust',
    'This British Museum marble herm is a Roman copy, probably after a Hellenistic portrait type, traditionally identified as Antisthenes. It is an ancient-looking object with an inherited identification, not a verified likeness or a biographical document. The bust can show how Antisthenes acquired material presence in later Greek and Roman reception; it cannot establish his features, recover lost works, or prove the disputed line of succession from Socrates through Antisthenes to Diogenes.',
    'fnv1a64:81fe5c8d450d5458',
  ),
  arcesilaus: objectLed(
    'Arcesilaus',
    [
      'Arcesilaus led Plato’s Academy in the third century BCE and made skeptical dialectic central to its identity. He left no surviving philosophical writings, so the evidence comes through later authors with different interests: Cicero’s Roman Academic debates, Sextus Empiricus’s skeptical classifications, and Plutarch’s defense against charges of inaction. These witnesses support a challenge to Stoic certainty and a revived Socratic practice of perplexity. They do not uncover a handbook of doctrines. That limit is not a defect to erase; it is the condition for reading arguments whose point may have been to test an opponent’s commitments rather than announce a replacement creed.',
      'Stoics claimed that a cognitive impression bears a mark that guarantees its truth. Arcesilaus is reported to have asked how a true impression could be recognized as unlike every false one. If the wise person must avoid opinion and no impression can certify itself, suspension of assent appears to follow. But the conclusion may be dialectical: an argument built from Stoic premises rather than a personal declaration that knowledge is impossible. Reports of reasonable action likewise require care. They may offer Arcesilaus’s own practical response to the charge that skepticism paralyzes life, or they may turn the Stoic’s expectations against Stoicism. Later Carneadean accounts of persuasive appearances should not be read back as his settled theory.',
      'The principal object is an 1810 title-page engraving for an edition of Cicero’s Academica. It pairs labeled, imagined profiles of Arcesilaus and Carneades, even though it records neither a verified ancient likeness nor a meeting between the two men. Its value lies in reception: an editor presented them as a skeptical Academic lineage centuries later. The print cannot tell us which conclusions Arcesilaus personally endorsed. It can make one interpretive pressure vivid: skeptical philosophy repeatedly outlives its speakers through adversaries, students, editors, and classifications. Ask not only whether a criterion succeeds, but whether defending a conclusion proves that a dialectician believes it.',
    ],
    [
      {heading: 'The source problem', items: [
        {label: 'No surviving writings', description: 'Later Academic, Pyrrhonian, and biographical witnesses preserve the skeptical turn while mediating its arguments and commitments.'},
        {label: 'Dialectical method', description: 'An argument can expose the cost of an opponent’s premises without committing its speaker to every conclusion it reaches.'},
      ]},
      {heading: 'The Stoic challenge', items: [
        {label: 'Cognitive impression', description: 'Stoics sought an appearance whose truth could be securely recognized; Arcesilaus presses the possibility of indistinguishable error.'},
        {label: 'Suspension of assent', description: 'Withholding assent is not declaring that every impression is false; it is refusing a truth-commitment when warrant fails.'},
      ]},
      {heading: 'Living without certainty', items: [
        {label: 'Reasonable action', description: 'Reported practical guidance addresses the inactivity objection, but scholars dispute whether it was a personal doctrine or a dialectical reply.'},
        {label: 'Do not back-project', description: 'Carneades’s later persuasive-impression account belongs to a related Academic development, not automatically to Arcesilaus.'},
      ]},
    ],
    'arcesilaus-carneades-academica',
    'This 1810 engraving from Johann August Goerenz’s edition of Cicero’s Academica pairs two labeled profile portraits, Arcesilaus and Carneades. The profiles are retrospective inventions on a title page, not ancient likenesses, a contemporaneous scene, or evidence that the philosophers taught one unchanged doctrine. The object documents a later editor’s presentation of an Academic skeptical lineage while leaving Arcesilaus’s oral arguments, personal commitments, and relation to later Carneadean developments dependent on textual witnesses.',
    'fnv1a64:e616af43589d218b',
  ),
  carneades: objectLed(
    'Carneades',
    [
      'Carneades led the skeptical Academy in the second century BCE and tested rival positions across knowledge, ethics, theology, fate, and justice. He wrote nothing. His student Clitomachus composed books about him but did not claim complete certainty about his teacher’s beliefs, and those intermediary books are also lost. Cicero, Sextus Empiricus, Diogenes Laertius, and later witnesses preserve arguments through their own Academic, Pyrrhonian, biographical, and rhetorical settings. The result is not an excuse to say nothing; it is a reason to distinguish a powerful documented practice of dialectic from a secure private doctrine. Carneades could develop a position with unusual force without thereby signing it as his own.',
      'His most influential practical resource is the persuasive or plausible appearance, pithanon. It does not mean numerical probability or an impression guaranteed true. Reports describe appearances that may be checked against related appearances and examined more thoroughly when stakes warrant it. Such graduated scrutiny allows inquiry and action to remain serious without the Stoic criterion of cognitive certainty. Yet the status of practical approval is disputed. Clitomachus distinguished following an appearance from truth-committing assent, while another tradition allowed qualified opinion. The difference matters because it asks whether action, acceptance, and belief can come apart rather than treating skepticism as either total paralysis or disguised dogmatism.',
      'The marble object shown here is a heavily restored second-century portrait inserted into a modern bust whose Greek label spuriously identifies it as Carneades. The Commons source instead describes it as a far variant of Polyeuctos’s portrait of Demosthenes. Its inscribed name documents a false modern identification, not an ancient attribution. The sculpture cannot reveal which arguments Carneades endorsed, settle the student debates, or authenticate stories of the 155 BCE Roman embassy. It can, however, make a discipline of this exhibit palpable: distinguish the strength of an argument from certainty about its author, and distinguish a workable guide for action from a claim to final knowledge.',
    ],
    [
      {heading: 'An oral philosopher', items: [
        {label: 'Lost intermediaries', description: 'Carneades and Clitomachus left no surviving authored account, so later evidence must be read for its source layers and purposes.'},
        {label: 'Arguments on both sides', description: 'Defending an alternative can expose a rival theory’s assumptions without showing that the speaker privately accepts the alternative.'},
      ]},
      {heading: 'Guidance without certainty', items: [
        {label: 'Persuasive appearance', description: 'Pithanon names an appearance fit to guide fallible inquiry, not a mathematically probable result or a self-certifying truth.'},
        {label: 'Graded scrutiny', description: 'Related appearances and conditions can be checked more carefully when time, evidence, and practical stakes make that appropriate.'},
      ]},
      {heading: 'Open disputes', items: [
        {label: 'Approval and assent', description: 'Ancient Academic interpreters disagreed over whether following the persuasive amounts to belief, qualified opinion, or neither.'},
        {label: 'Third Academy', description: '“New” or “Third” Academy is a variable later classification, not the name of a new institution founded from nothing.'},
      ]},
    ],
    'carneades-louvre-bust',
    'This Louvre object, Ma 72, is a heavily restored second-century portrait inserted into a modern bust bearing a spurious Greek identification as Carneades. The Commons source describes it instead as a far variant of Polyeuctos’s Demosthenes portrait. It is not a Carneades likeness. The carved name documents a false modern identification, not the sitter’s identity, an ancient argument, or Carneades’s personal commitments. It supports a display about reception and attribution precisely because the expanded record and caption name that mismatch plainly.',
    'fnv1a64:4820d2082dc9db8b',
  ),
  'anne-conway': objectLed(
    'Anne Conway',
    [
      'Anne Conway’s Principles offers an alternative to the division of inert matter and immaterial spirit associated with Cartesian dualism. For Conway, God is immutable and distinct from creatures, Christ or middle nature mediates, and created beings are mutable. Within created reality, body and spirit differ by degree rather than belonging to two wholly alien substances. Matter is therefore living, active, and capable of transformation; it is not an illusion, nor does this make all beings one undifferentiated cosmic mind. Her metaphysics binds questions about substance to moral change, pain, justice, agency, and the possibility of becoming more or less perfect.',
      'That position grows from a seventeenth-century network rather than a solitary anticipation of later philosophy. Conway’s correspondence with Henry More, the presence of Francis Mercury van Helmont, Platonist, Origenist, Kabbalistic, medical, and Quaker contexts matter, but none is a master key. Her critique of dualism preserves creaturely plurality and difference within creation while refusing to treat material bodies as dead stuff. Evil is not a substance in its own right but creaturely deterioration, and suffering receives a purgative role within her theodicy. This account is ambitious and ethically difficult; its promise of eventual transformation should not make suffering harmless or silence questions about divine justice.',
      'The displayed painting is Samuel van Hoogstraten’s c. 1670 Perspective View with a Woman Reading a Letter, an interior with a woman, dog, statues, columns, and receding rooms. A proposed depiction of Conway is not established; no authenticated portrait of her is known. The image can therefore stage learned domestic space and the desire to see a woman philosopher, but cannot identify its reader as Conway, document her household, or illustrate the Principles. Her treatise has a mediation: it appeared anonymously and posthumously in Latin in 1690, then in English in 1692, after the English manuscript was lost. Read exact wording and intellectual biography through those limits, not through an inviting portrait claim.',
    ],
    [
      {heading: 'Living creation', items: [
        {label: 'Difference by degree', description: 'Within mutable creation, body and spirit are grades of living substance rather than two utterly foreign kinds of created thing.'},
        {label: 'Creator and creatures', description: 'God remains immutable and ontologically distinct; created beings can transform without crossing into the divine species.'},
      ]},
      {heading: 'A moral metaphysics', items: [
        {label: 'Perfectibility', description: 'Creatures can move toward greater or lesser perfection, making agency, pain, responsibility, and justice central to her account.'},
        {label: 'The problem of evil', description: 'Evil is creaturely deterioration, while Conway’s purgative account of suffering remains ethically and theologically contested.'},
      ]},
      {heading: 'Read the archive carefully', items: [
        {label: 'Mediated text', description: 'Posthumous Latin publication and English retranslation preserve Conway’s authorship while limiting claims about exact lost wording.'},
        {label: 'No authenticated likeness', description: 'The displayed unnamed woman is contextual; a proposed identification with Conway is not established evidence.'},
      ]},
    ],
    'rationalism-conway-portrait',
    'Samuel van Hoogstraten’s c. 1670 Perspective View with a Woman Reading a Letter shows an elaborate interior, a standing reader, a dog, classical statuary, and deep architectural recession. The Mauritshuis does not identify the woman as Anne Conway, and the proposed identification remains disputed; no authenticated Conway portrait survives. This is therefore a contextual painting, not biography or evidence for her appearance, household, authorship, or doctrine. It can focus attention on reception and the wish to visualize an underrepresented philosopher while the Principles and its mediated publication history supply the evidence.',
    'fnv1a64:5eb6189310495e25',
  ),
  schelling: objectLed(
    'Schelling',
    [
      'Friedrich Wilhelm Joseph Schelling revised one difficult problem: how can nature and freedom, necessity and creativity, finite things and their ultimate ground belong together without one side being reduced to the other? He is not merely a bridge from Fichte to Hegel. Early nature philosophy treats nature as productive rather than inert material. His transcendental philosophy approaches from self-conscious activity, and the two routes are meant to meet without allowing mind to absorb nature or nature to make mind an accidental exception. In the 1800 System, art matters because artistic making joins conscious intention with a productivity the artist does not wholly command.',
      'Identity philosophy explores how subject and object, ideal and real, can express unity without rendering difference unreal. Its critics asked whether the system merely assumed the distinctions it promised to explain. The 1809 Freedom Essay changes the architecture again by treating freedom as a real capacity for good and evil. Ground and existence in God are distinguished so that personality, differentiation, and disorder are not simply erased by a featureless absolute; this does not introduce a second evil deity, and it leaves questions about divine goodness. The unfinished, multiply drafted Ages of the World experiments with temporality and emergence instead of presenting a completed final book.',
      'Later Schelling distinguishes negative philosophy, which traces necessary relations, from positive philosophy, which begins with historical actuality. This is not a surrender of reason to mystical authority. Mythology and revelation are treated through historical processes, though their Christian hierarchy and Eurocentric assumptions require criticism. Stieler’s 1835 lifetime portrait shows a late-career Schelling in a formal pose. It is stronger likeness evidence than a retrospective invention, but it cannot make the long corpus a single doctrine, decide whether there is one continuous project, or illustrate a particular philosophical phase. The picture should prompt a chronological question: which text, genre, and problem are we calling “Schelling” at this moment?',
    ],
    [
      {heading: 'Changing projects', items: [
        {label: 'Productive nature', description: 'Nature is an active, self-organizing process in Schelling’s early philosophy, not inert matter waiting for an external mind.'},
        {label: 'Two routes', description: 'Philosophy of nature and transcendental idealism begin from objective productivity and subjective activity, seeking a meeting neither can monopolize.'},
      ]},
      {heading: 'Freedom and existence', items: [
        {label: 'Ground and evil', description: 'The Freedom Essay makes evil a real possibility within personality while distinguishing ground from fully actual divine existence.'},
        {label: 'Positive philosophy', description: 'Conceptual necessity cannot deduce that the world exists; history, mythology, and revelation address actuality in a different register.'},
      ]},
      {heading: 'Read by phase', items: [
        {label: 'Unfinished texts', description: 'The Ages of the World survives in drafts, and later lectures often reached readers through posthumous editions.'},
        {label: 'No timeless slogan', description: 'Nature, art, identity, freedom, and revelation recur, but their role changes as Schelling rebuilds his systems.'},
      ]},
    ],
    'german-idealism-schelling-stieler-1835',
    'Joseph Karl Stieler’s 1835 painting is a lifetime portrait of Friedrich Wilhelm Joseph Schelling in late career, held by the Neue Pinakothek. It is reliable evidence that a formal portrait was made of him, though the composed pose remains an artistic presentation rather than a transparent record of intellectual life. The image cannot illustrate one doctrine, determine the relation among his changing phases, or authenticate later posthumously edited lectures. It anchors a historical thinker while the dated texts and their editions must do the philosophical work.',
    'fnv1a64:cc0883cb716c1213',
  ),
};
