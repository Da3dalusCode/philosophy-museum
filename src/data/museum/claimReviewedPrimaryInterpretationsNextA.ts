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
    reviewedOn: '2026-08-10',
    method: 'Reconciled separately against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.',
    lock,
  },
});

/**
 * Eight title-local primary readings reconciled after their article claim reviews.
 */
export const CLAIM_REVIEWED_PRIMARY_INTERPRETATIONS_NEXT_A:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  'hippias-of-elis': objectLed(
    'Hippias of Elis',
    [
      'Hippias of Elis is best approached as a celebrated fifth-century Sophist whose public range survives more clearly than a settled doctrine. Plato makes him a conspicuous performer of expertise, displaying learning across poetry, genealogy, calculation, memory, language, and craft. That abundance poses a serious educational question: does wide competence make a person independent and wise, or can command of many skills conceal an inability to give an account of what matters? Plato’s scenes are indispensable evidence, but not neutral reportage. They make Hippias an interlocutor in a philosophical contest, so their display cannot become a continuous biography or finished Hippian theory.',
      'The self-made outfit in Lesser Hippias shows a public ideal of versatile competence and the prestige attached to making one’s own equipment, but it does not secure a doctrine of autarkeia later associated with Cynicism. Nor do reports of mathematics, memory, technical learning, or the curve later called the quadratrix preserve a Hippian treatise or recoverable method. In Protagoras, Hippias also appears in questions about nature and convention, yet dramatic setting does not settle a personal political program. The record remains rich because it makes skill, education, authority, and evidence visible without pretending that every admired accomplishment forms one system.',
      'The bronze strigil is a Greek bodily-care tool used with oil, and its period overlaps Hippias’s world. It gives material scale to an object class named in Plato’s comic inventory: a shaped implement, not a symbol of self-sufficiency. It cannot be Hippias’s own strigil, prove he made one, identify an Olympic appearance, or verify the staging. The Metropolitan Museum object sharpens a necessary distinction. Material skill and athletic culture were recognizable expertise, while the historical Hippias remains accessible chiefly through literary and later witnesses. Let it prompt a question rather than manufacture evidence: when learning becomes performance, what would show that it is wisdom?'
    ],
    [
      {heading: 'Evidence before doctrine', items: [
        {label: 'A staged Sophist', description: 'Plato’s dialogues are crucial, philosophically interested portrayals of Hippias; their comic details do not yield a neutral biography or an automatic statement of his beliefs.'},
        {label: 'Polymathy', description: 'Hippias is remembered for versatile learning, memory, language, calculation, and performance, which make the authority of expertise itself a philosophical problem.'},
      ]},
      {heading: 'Questions in the display', items: [
        {label: 'Skill and wisdom', description: 'Being able to make, remember, or recite many things may show valuable competence, yet Plato asks whether that competence explains what is good or just.'},
        {label: 'Nature and convention', description: 'A Sophistic question about whether standards arise from nature, custom, law, or civic agreement; Hippias’s exact position remains difficult to recover.'},
      ]},
      {heading: 'Read cautiously', items: [
        {label: 'Self-sufficiency', description: 'A useful modern comparison, not a securely surviving Hippian ethical doctrine; it should not be silently equated with later Cynic practice.'},
        {label: 'Quadratrix reports', description: 'Later mathematical attribution preserves an association with technical learning, not a surviving Hippian proof, treatise, or fully recoverable method.'},
      ]},
    ],
    'hippias-greek-strigil',
    'This Metropolitan Museum photograph shows a Greek bronze strigil, a curved scraper used with oil in bodily care and athletics, dated to the fifth or fourth century BCE. It is a period object of the class named in Plato’s portrayal of Hippias, not Hippias’s possession, handiwork, portrait, or evidence for a complete doctrine of self-sufficiency. It can make public material skill visible; Platonic drama and later testimony remain the mediated evidence for the thinker.',
    'fnv1a64:de6f5306745be6f2',
  ),
  lucretius: objectLed(
    'Lucretius',
    [
      'Lucretius makes Epicurean philosophy a six-book Latin poem whose argument is inseparable from address, image, rhythm, and urgency. De Rerum Natura asks readers to exchange fearful stories of divine punishment, death, and cosmic purpose for an account of atoms and void. That account is not modern science, and it is therapeutic as well as explanatory. If bodies and souls are mortal configurations, death is not an experience awaiting a survivor; if events have natural causes, they need not announce a ruler’s anger. Poetic power is therefore not packaging around doctrine. It seeks to reshape attention, feeling, and desire while arguing about nature.',
      'The swerve is a tiny deviation in atomic motion, but its relation to agency remains disputed; it is not a ready-made proof of modern free will. Criticism of superstition is not a license to label every ancient religious practice irrational, and Epicurean pleasure is not luxury. Lucretius is also hard to recover historically. Cicero’s letter is the sole contemporary external reference normally connected with him; familiar dates are reconstructed and the later madness, love-potion, and suicide story is unreliable. The poem is the secure center. Its Athenian plague ending may test natural understanding amid catastrophe, but scholars do not agree whether it is deliberately closed or lacks final revision.',
      'This 1483 opening page of Vat. lat. 1569 was copied for Sixtus IV more than fifteen centuries after Lucretius wrote. Dense Latin lines, painted architecture, figures, landscape, and papal arms make Renaissance preservation visible. The manuscript shows the poem circulating in a new curial and humanist setting; it cannot be an ancient copy, a picture of the poet, or evidence that its illuminator understood atomism as Lucretius did. It alters the exhibit’s time scale. A poem arguing against fear and providential explanation gained another life through copying, patronage, reading, and decoration. Transmission is not agreement, but it lets an ancient philosophical voice become available for new disagreement.'
    ],
    [
      {heading: 'Poetry as philosophy', items: [
        {label: 'Atoms and void', description: 'Lucretius presents bodies as made from moving atoms in empty space, an Epicurean explanatory framework rather than a version of contemporary physics.'},
        {label: 'Therapy against fear', description: 'Natural explanation is meant to weaken fear of gods, death, and limitless desire by changing the stories readers tell about themselves and the world.'},
      ]},
      {heading: 'The poem’s pressure points', items: [
        {label: 'The swerve', description: 'A minimal atomic deviation whose role in causation and agency is contested; it should not be turned into a simple ancient solution to free will.'},
        {label: 'The plague ending', description: 'The final Athenian plague scene is complete within the six-book design, yet its abruptness leaves final authorial revision and intended effect open.'},
      ]},
      {heading: 'A sparse life, a long afterlife', items: [
        {label: 'Cicero’s reference', description: 'A February 54 BCE letter is the only contemporary external notice normally associated with Lucretius, so conventional biography must remain unusually restrained.'},
        {label: 'Renaissance copying', description: 'The 1483 manuscript is evidence for later transmission and patronage, not an ancient textual witness or a guarantee of one unchanged Epicurean reception.'},
      ]},
    ],
    'epicureanism-lucretius-manuscript',
    'Vat. lat. 1569, folio 1r, is an illuminated 1483 copy of Lucretius’s De Rerum Natura made by Girolamo di Matteo de Tauris for Sixtus IV. Its decorated first page, figures, landscape, and papal arms document Renaissance copying and patronage of an ancient poem. It is not an ancient manuscript, Lucretius’s handwriting, or proof that its patron, scribe, or illuminator accepted the poem’s atomism, theology, or therapeutic claims.',
    'fnv1a64:929fb3c6b294c7e2',
  ),
  pyrrho: objectLed(
    'Pyrrho',
    [
      'Pyrrho of Elis is a founder-name for skepticism and a difficult philosopher to reconstruct. No writing by him survives. What remains comes through later anecdotes, verses attributed to his follower Timon, and a still more layered passage in which Eusebius preserves Aristocles’ account of Timon. These witnesses make evidence part of the philosophy. Pyrrho’s reported stance toward things, appearances, and tranquility may be important without forming a continuous doctrine. The later practice of balancing arguments and suspending judgment belongs above all to a tradition shaped after him. A responsible exhibit begins with what the record permits, not a polished list of skeptical theses.',
      'The Aristocles passage has competing readings. Its language about things being undifferentiated, unstable, or indeterminate may point toward radical metaphysics, a practical refusal of determinate claims, or layers that cannot be separated. The reported outcome, tranquility, is not emotional numbness or a promise that doubt cures every disturbance. Stories of Pyrrho’s Indian journey, indifference to danger, and dependence on friends are later and philosophically shaped; they invite questions about action, care, and detachment rather than supplying transparent scenes. Pyrrho matters because skepticism must explain how one lives without forced judgment, not because he authorizes passivity or a slogan that nothing can be known.',
      'The displayed engraving comes from Thomas Stanley’s 1655 History of Philosophy. It shows a full-length, robed, barefoot figure labeled “PYRRHO” before a landscape: a seventeenth-century learned imagination, not a likeness or ancient testimony. Its certainty of pose contrasts with the historical record. The print documents an early modern effort to give a skeptical ancestor a body and public identity; it cannot show what Pyrrho believed, whether a story happened, or how later techniques began. Read it as reception evidence. The exhibit’s real object is the chain of reports that made a remembered life capable of generating a discipline while never fully yielding its origin.'
    ],
    [
      {heading: 'Start with the evidence', items: [
        {label: 'No surviving Pyrrho text', description: 'Pyrrho’s philosophy is reconstructed from witnesses with different dates, aims, and argumentative interests, not from a treatise written in his own voice.'},
        {label: 'Layered testimony', description: 'Diogenes Laertius, Timon, Aristocles, and Eusebius preserve different kinds of material; agreement and disagreement must be assessed rather than fused.'},
      ]},
      {heading: 'Do not read later practice backward', items: [
        {label: 'Pyrrhonism', description: 'A later skeptical tradition associated with Pyrrho that develops argument balancing, suspension, continued inquiry, and a hoped-for tranquility.'},
        {label: 'Suspension', description: 'Withholding assent where inquiry has not earned it; its later technical forms are not automatically recoverable as Pyrrho’s own vocabulary or method.'},
      ]},
      {heading: 'A living difficulty', items: [
        {label: 'Tranquility', description: 'The reported freedom from disturbance is an outcome associated with skepticism, not emotional anesthesia or a guarantee that ordinary care and action disappear.'},
        {label: 'The India stories', description: 'Ancient reports connect Pyrrho’s travels to Alexander’s campaign, but their philosophical shaping blocks easy claims about direct intellectual borrowing.'},
      ]},
    ],
    'pyrrho-stanley-portrait',
    'This full-length engraving labeled “PYRRHO” appears in Thomas Stanley’s 1655 History of Philosophy. It is an imagined early modern presentation of an ancient philosopher, not an oval portrait, an ancient likeness, or evidence for Pyrrho’s appearance, life, travel, or doctrine. The print documents reception: it shows how a much later history gave a figure with no surviving writings a legible philosophical ancestor’s body and name.',
    'fnv1a64:0bd8c39685674d1e',
  ),
  plato: objectLed(
    'Plato',
    [
      'Plato writes philosophy as dialogue: speakers ask, define, resist, revise, tell myths, make images, and sometimes leave readers in perplexity. This makes possessing a proposition different from giving an account of it. Socrates often leads questioning, but no rule turns every Socratic sentence into Plato’s final view. Across a changing corpus, Plato asks how judgment can answer to more than appetite, reputation, or civic convention. Forms offer one account of intelligible standards such as justice or equality; Republic connects knowledge and education to a divided soul and ordered city; other dialogues test definitions, love, language, being, and political expertise. The questions converge without becoming a handbook of settled answers.',
      'Political setting remains integral. Plato experienced war, defeat, oligarchic violence, restored democracy, and Socrates’ execution; the dialogues examine courts, assemblies, teachers, households, and cultural formation. Republic’s philosopher-rulers cannot be detached from its educational argument, yet neither can hierarchy, censorship, and political severity be softened into harmless metaphor. Plato did not offer one unchanging blueprint: Statesman and Laws pursue different problems about expertise, law, institutions, and imperfect citizens. Forms, recollection, soul, myth, and political construction admit rival readings. Developmental groupings help orient readers but do not supply a secure authorial timeline or replace attention to dramatic context.',
      'The Capitoline marble head is a first-century CE Roman copy of a Greek portrait type associated with Silanion and dated around 370 BCE. It carries an ancient tradition of remembering Plato, but it is later than him and may idealize his features. A face cannot identify historical Socrates beneath a literary character, pronounce on dialogue chronology, or show what a Form is. It is nevertheless reception evidence: an Academy-associated portrait type became a durable image of philosophical authority. The exhibit asks visitors to make that authority answerable to dialogue again—by following arguments, speakers, exclusions, and unresolved pressure rather than treating a revered head as a conclusion.'
    ],
    [
      {heading: 'Read the form as philosophy', items: [
        {label: 'Dialogue', description: 'A composed encounter whose speakers, setting, irony, argument, and outcome all shape what can responsibly be attributed to Plato.'},
        {label: 'Dialectic', description: 'A practice of testing assumptions and pursuing better accounts, not a guarantee that any famous slogan or image has already solved the question.'},
      ]},
      {heading: 'Persistent problems', items: [
        {label: 'Forms', description: 'Intelligible standards or realities used to explain knowledge and value; the dialogues develop and criticize their relation to changing particulars.'},
        {label: 'Justice and education', description: 'Plato connects a soul’s order with civic formation, making institutions, culture, desire, expertise, and political power inseparable questions.'},
      ]},
      {heading: 'Keep tensions visible', items: [
        {label: 'Socrates and Plato', description: 'The historical Socrates and Plato’s dramatic character overlap without being identical; literary evidence prevents a mechanical separation in every dialogue.'},
        {label: 'Political severity', description: 'The Republic’s hierarchy and censorship are genuine pressures on its project, not details erased by calling the city merely symbolic or educational.'},
      ]},
    ],
    'plato-capitoline-bust',
    'This first-century CE Roman marble copy preserves a Greek portrait type associated with Silanion, made around 370 BCE and connected in later tradition with Plato’s Academy. The surviving head is later than Plato and may idealize his features. It establishes an ancient reception tradition, not a portrait made from life, an image of dialogue or Forms, or evidence that any one speaker, myth, political proposal, or chronology states Plato’s final doctrine.',
    'fnv1a64:af9100c7b91cbba5',
  ),
  aristotle: objectLed(
    'Aristotle',
    [
      'Aristotle pursues explanations adequate to changing individuals, living beings, practices, and institutions. After studying in Plato’s Academy, he challenged the priority of separate Forms and asked what a thing is made from, what structure makes it the thing it is, what produces it, and what end organizes development. These later-called four causes are not one checklist; their relevance changes with the subject. Aristotle writes across logic, nature, metaphysics, psychology, biology, rhetoric, poetry, ethics, and politics. Categorical syllogistic and demonstration connect valid inference to explanatory knowledge, while potentiality and actuality describe capacities and fulfillment. His range rejects the idea that every question requires one modern scientific procedure.',
      'Ethics and politics make this breadth consequential. Eudaimonia is a life of activity shaped by virtue, habituation, practical judgment, friendship, resources, and political community, not a passing feeling. That account cannot be separated from arguments for natural slavery, gender hierarchy, citizenship, and leisure. Teleology and biology need critical historical reading, not dismissal or endorsement. The corpus also demands care. Ancient catalogues attribute more works than remain; many treatises have the compressed character of teaching and research material, while “Organon” and “Metaphysics” are later organizing titles. Aristotle’s collaborative Lyceum and its afterlives are part of the record, not scenery around a solitary system-builder.',
      'The Palazzo Altemps portrait is a Roman marble copy after a Greek bronze type associated with Lysippos around 330 BCE. Its alabaster mantle is visibly modern, making restoration history part of what visitors see. The object gives an ancient representing tradition a material anchor; it cannot settle corpus authorship, show four causes or syllogistic in action, or make later Arabic, Jewish, Christian, and Latin uses direct repetitions of Aristotle’s intent. The face should not stand in for a universal “father of science.” It points back to a practice of explanation whose texts, institutions, political limits, and transformations remain open to judgment.'
    ],
    [
      {heading: 'How explanation works', items: [
        {label: 'Causes', description: 'Material, formal, efficient, and final causes answer different explanatory questions about what something is, how it changes, and what organizes it.'},
        {label: 'Potentiality and actuality', description: 'A distinction between what a being can become and the activity or fulfillment of that capacity, central to accounts of change and life.'},
      ]},
      {heading: 'Inquiry and flourishing', items: [
        {label: 'Demonstration', description: 'Scientific understanding links valid inference with explanatory premises and causes; it is not identical with all formal logic or one modern method.'},
        {label: 'Practical wisdom', description: 'Judgment about how to act well in variable circumstances, developed through habit and experience rather than by applying a universal rule mechanically.'},
      ]},
      {heading: 'Read critically', items: [
        {label: 'A mediated corpus', description: 'Much surviving Aristotelian writing bears layered teaching and editorial histories, so later titles and arrangements must not be mistaken for one finished publication plan.'},
        {label: 'Hierarchy and exclusion', description: 'Arguments about slavery, women, citizenship, and leisure are integral historical limits that must be examined rather than excused by later influence.'},
      ]},
    ],
    'aristotle-altemps-bust',
    'This Roman marble portrait at Palazzo Altemps copies a Greek bronze type associated with Lysippos around 330 BCE; the contrasting alabaster mantle is a modern addition. It preserves an ancient portrait tradition, not an unmediated likeness, a document of Aristotle’s teaching, or proof of the exact boundaries and authorship of his surviving corpus. The bust cannot demonstrate his logic, biology, ethics, teleology, or later reception; those claims require texts and their historical contexts.',
    'fnv1a64:eabf7cc0aa847832',
  ),
  diogenes: objectLed(
    'Diogenes',
    [
      'Diogenes of Sinope becomes the defining Cynic through stories of public training, reduced need, sharp speech, and reversals of shame. They turn a life into an argument: wealth, status, citizenship, decorum, and approval can make people dependent on what fortune or a crowd can remove. Askēsis is training that tests whether a claimed necessity is natural or manufactured; parrhesia—frank speech—addresses power and self-deception in public. Yet no securely surviving work gives Diogenes an unmediated voice. The richest dossier is Diogenes Laertius, writing centuries later, alongside scattered witnesses with different purposes. A memorable scene is evidence for Cynic reception before it is evidence for a literal event.',
      'That source situation prevents two mistakes. Diogenes is not modern cynicism, a distrust that gives up on value; he treats virtue and freedom as demanding achievements. Nor is provocation automatically liberating. A shocking act can expose arbitrary hierarchy or disregard another person’s dignity and vulnerability. The popular succession from Antisthenes through Diogenes to Crates and Zeno is disputed, while later Stoic sources reshape the Cynic vocation for their own program. Cosmopolitan language challenges local rank but does not supply a completed modern politics. The continuing difficulty is practical: how can radical independence remain responsive to others rather than stage contempt for them?',
      'Jean-Léon Gérôme’s 1860 painting gathers several anecdotes into one theatrical image: Diogenes sits in a large earthenware jar, lights a lamp in daylight, and is surrounded by dogs. These symbols are immediately legible, but they do not verify a dwelling, lamp search, exact location, or the philosopher’s appearance. The Walters object is reception history, not archaeological reportage. Its value is to show how a later painter can turn scattered stories into one iconic character, while the exhibit returns visitors to fragile witnesses and the harder question of which dependencies a public practice can reveal.'
    ],
    [
      {heading: 'A practice, not a mascot', items: [
        {label: 'Askēsis', description: 'Repeated training in endurance, simplicity, and self-command meant to reduce dependence on possessions, praise, and fortune.'},
        {label: 'Parrhesia', description: 'Frank speech that risks offending power or public opinion in order to expose false values; it is not permission for cruelty or mere insult.'},
      ]},
      {heading: 'Evidence and reception', items: [
        {label: 'Anecdotal dossier', description: 'Later stories preserve a philosophical persona and possible historical traces, but their polished scenes cannot be treated as transparent transcripts.'},
        {label: 'Antisthenes and Stoicism', description: 'Both the direct teacher-student link to Antisthenes and later Stoic idealization remain contested interpretive routes, not simple biographical facts.'},
      ]},
      {heading: 'A demanding question', items: [
        {label: 'Nature and convention', description: 'Cynic practice tests whether habits and institutions serve virtue or secure hierarchy, fear, luxury, and dependence without reflection.'},
        {label: 'Cosmopolitanism', description: 'The claim to belong to the world challenges inherited civic rank, yet it does not by itself settle the positive duties owed across political boundaries.'},
      ]},
    ],
    'cynicism-diogenes-walters',
    'Jean-Léon Gérôme’s 1860 Diogenes, held by the Walters Art Museum, is a nineteenth-century history painting. It combines the earthenware jar, daylight lamp, and dogs associated with later Diogenes anecdotes into a staged scene. The canvas cannot document his appearance, residence, exact actions, or a recoverable Cynic doctrine. It can show how later visual culture made austerity, animal emblems, and provocative public independence into one immediately recognizable philosophical character.',
    'fnv1a64:8d364b94ced26820',
  ),
  epicurus: objectLed(
    'Epicurus',
    [
      'Epicurus asks what is sufficient for a pleasant and undisturbed life. His answer joins ethics to nature: bodies consist of atoms and void; soul is bodily and mortal; natural events do not display a providential ruler’s anger. This framework aims to loosen fear. Pleasure names the good, but its stable form is freedom from bodily pain and mental disturbance, not endless stimulation or consumption. Epicurus distinguishes natural and necessary needs from empty demands for status, limitless wealth, and immortality. Prudence weighs consequences across a life, while friendship gives security and shared joy. The Garden was a teaching community, so tranquility is not merely private.',
      'The surviving texts require precision. Epicurus speaks of blessed, imperishable gods while rejecting providence, punishment, and cosmic administration. Whether those gods are real beings, ideal constructions, or objects of distinctive thought remains disputed; rejecting divine management is clearer than a modern atheist label. Justice concerns agreements not to harm or be harmed under particular conditions, making it neither an eternal legal code nor permission to ignore consequences. Most of Epicurus’s output is lost. Letters, Principal Doctrines, Vatican Sayings, later opponents, Lucretius, and damaged Herculaneum papyri preserve an uneven archive that must inform reconstruction without replacing the founder’s voice.',
      'The Louvre object is a restored Roman imperial double herm, probably from the later second century CE, after a Greek original of the early third century BCE. Its joined heads identify Epicurus and Metrodorus, making friendship and school memory materially vivid. The sculpture cannot show the Garden, prove every relationship within it, resolve the gods, or make pleasure a doctrine of luxury. It offers a more exact lesson: a philosophy of shared life was remembered through later images, restoration, collection history, and scholarly identification as well as through fragile texts.'
    ],
    [
      {heading: 'Enough for a good life', items: [
        {label: 'Stable pleasure', description: 'Freedom from bodily pain and mental disturbance, not a command to intensify consumption or chase every passing satisfaction.'},
        {label: 'Natural and empty desires', description: 'A practical distinction that asks which needs are necessary, which are natural but optional, and which are inflated by status or fear.'},
      ]},
      {heading: 'Nature as therapy', items: [
        {label: 'Atoms and void', description: 'An ancient materialist account intended to explain bodies, soul, death, and natural events without punitive cosmic management.'},
        {label: 'Gods and providence', description: 'Epicurus rejects divine governance and punishment while the precise status of blessed, imperishable gods remains an interpretive dispute.'},
      ]},
      {heading: 'The Garden’s record', items: [
        {label: 'Friendship', description: 'A source of security and shared delight within philosophical community, not a decorative addition to an otherwise solitary pursuit of pleasure.'},
        {label: 'A partial archive', description: 'Letters, maxims, later witnesses, poetry, and damaged papyri preserve different layers of Epicurean thought and do not have equal authority.'},
      ]},
    ],
    'epicureanism-double-herm',
    'This Louvre double herm is a restored Roman imperial sculpture, probably from the later second century CE, after a Greek original dated around 260 BCE. Its joined heads identify Epicurus and Metrodorus and record later school memory, but the object has been broken and restored. It is not a Garden original, a photograph of philosophical friendship, or evidence that Epicurus’s theology, ethics, or community can be reduced to the appearance of two portraits.',
    'fnv1a64:533523fb1a5edce4',
  ),
  zeno: objectLed(
    'Zeno of Citium',
    [
      'Zeno of Citium founded a school in Athens around 300 BCE whose later name came from the Painted Stoa where he taught. Its durable question is practical: how can a person live freely and well inside a changing, causally ordered world? Early Stoicism connects virtue, judgment, nature, and social belonging, but Zeno’s writings are lost. Later Stoic logic, physics, and ethics should not be poured wholesale into the founder’s biography. The evidence supports a public teacher shaped by Cynic challenges and Socratic questions about virtue; Cleanthes and Chrysippus developed the school through debate. Zeno marks a philosophical project entering institutional life while remaining fragmentary.',
      '“Living in accordance with nature” does not mean obeying every impulse or accepting every social arrangement. In the Stoic tradition, nature is intelligible and normative, and virtue concerns sound judgment about what is genuinely good rather than control over outcomes. The tradition also widens concern from oneself through family and city toward a shared human community. Yet cosmopolitan language and reports of Zeno’s Republic do not yield a complete modern politics. The lost work survives through interested witnesses struck by its challenges to convention and civic institutions. It is safer to read it as radical pressure on status and custom than as a recoverable constitutional plan.',
      'The Naples marble is an ancient Roman bust identified as Zeno of Citium through comparison with a bronze portrait from the Villa of the Papyri at Herculaneum. Its exact ancient date is not secured in the registered source. The face supplies a later portrait tradition, not a lifetime image or visual proof of doctrine. It cannot tell us what Zeno wrote in the Republic, establish which later Stoic theories he held, or settle the school’s cosmology, logic, passions, and duties. The object’s strongest lesson concerns transmission: comparison, copied portraits, lost books, and later systems cooperate uneasily to make a founder visible.'
    ],
    [
      {heading: 'Founder and school', items: [
        {label: 'The Stoa', description: 'Zeno taught in Athens at the Painted Stoa; the place gave the movement its later name but does not preserve a complete original curriculum.'},
        {label: 'Lost writings', description: 'Zeno’s works survive only in fragments and reports, requiring visitors to distinguish founder evidence from later Stoic systematization.'},
      ]},
      {heading: 'A way of life', items: [
        {label: 'Virtue and nature', description: 'The Stoic ideal links flourishing to rationally judging what is good and living within an intelligible natural order, not passive resignation.'},
        {label: 'Cosmopolitan concern', description: 'Stoic affiliation with a wider human community challenges local rank, while leaving difficult questions about institutions, obligation, and exclusion.'},
      ]},
      {heading: 'A fragmentary politics', items: [
        {label: 'Zeno’s Republic', description: 'A lost work known through later descriptions, useful for studying radical pressure on convention but inadequate as a complete constitutional blueprint.'},
        {label: 'Later Stoicism', description: 'Cleanthes, Chrysippus, Roman writers, and modern interpreters transformed the tradition; their systems must not become direct quotations from the founder.'},
      ]},
    ],
    'stoicism-zeno-naples',
    'This National Archaeological Museum of Naples marble bust, inv. 6128, is an ancient Roman portrait identified as Zeno of Citium through comparison with a bronze bust from the Villa of the Papyri at Herculaneum. Its exact ancient date is not secured by the registered source. It is not a lifetime likeness or a visual record of Zeno’s lost books. The sculpture anchors a later tradition of identification; texts and their layered witnesses establish the philosophy.',
    'fnv1a64:34d10703b50a0440',
  ),
};
