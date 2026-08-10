import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';
import type {MuseumExhibitReview} from '../../editorial/exhibitReview';

type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

const standardReview = (lock: string): MuseumExhibitReview => ({
  status: 'standard-compliant',
  reviewedOn: '2026-08-09',
  method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.',
  lock,
});

const STANDARD_REVIEW_BY_NAME: Readonly<Record<string, MuseumExhibitReview>> = {
  Democritus: standardReview('fnv1a64:4e6dfef9ff6faa26'),
  Heraclitus: standardReview('fnv1a64:9a49925b3fb16d45'),
  Empedocles: standardReview('fnv1a64:b8cddd6a506ca3b9'),
  Anaxagoras: standardReview('fnv1a64:61c3ebbbe3373c4f'),
  Protagoras: standardReview('fnv1a64:3f1badd09a7f0e3b'),
  'Prodicus of Ceos': standardReview('fnv1a64:76daff72bf909c9c'),
  Gorgias: standardReview('fnv1a64:e914e66c93204160'),
};

const primary = (
  name: string,
  paragraphs: readonly string[],
  orientation: readonly VisitorGuideSection[],
  assetId: MuseumAssetId,
  objectText: string,
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
  review: STANDARD_REVIEW_BY_NAME[name],
});

/**
 * Object-led primary interpretation for the later Presocratic and Sophistic
 * installations. Article claim review remains separate from this authored
 * Museum surface; integration owns review metadata and locks.
 */
export const MEDITERRANEAN_LATER_PRIMARY_INTERPRETATIONS:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  democritus: primary(
    'Democritus',
    [
      'Democritus is one of the best known early atomists, yet the surviving record makes a finished personal system impossible to recover. Ancient catalogues credit him with an unusually broad corpus on nature, mathematics, perception, language, culture, and ethics; none survives intact. Aristotle and Theophrastus preserve much of the physical theory, while Sextus and later commentators transmit material about knowledge. Ethical sayings often arrive through much later anthologies. These witnesses select, paraphrase, and sometimes combine material shared with Leucippus. The exhibit therefore begins with an archive rather than a portrait of one author speaking continuously.',
      'Atomism explains visible change through solid, ungenerated, indivisible bodies moving in void. Compounds come to be and pass away as those bodies combine and separate; basic being is neither created from nothing nor destroyed. Atoms differ in shape, arrangement, and position, and reports connect sensible qualities such as color and taste to interactions between atomic structures and perceivers. That is not modern chemistry: ancient atoms are not experimentally studied elements, and the physical framework is often reported jointly for Leucippus and Democritus. The theory is a response to problems of change and plurality, not a prediction of a later laboratory science.',
      'Democritus also appears in testimony about the limits of the senses and an ethics of measure, justice, self-command, and euthymiē, a steadiness or good spirits. Individual maxims and the relation of ethics to physics remain disputed, so a cheerful anecdote cannot settle the meaning of a life. Velázquez’s smiling figure with globe belongs to the Baroque “laughing philosopher” tradition. It makes a later reader’s Democritus memorable, but neither the grin nor the globe is ancient evidence for his character, cosmology, or ethical teaching. The image is a reception object; the fragmentary dossier bears the philosophical weight.',
    ],
    [
      {heading: 'Evidence and attribution', items: [
        {label: 'Lost corpus', description: 'Democritus is credited with many writings, but modern readers reconstruct them from fragments, critics, excerptors, and later collections.'},
        {label: 'Leucippus', description: 'The early atomist framework is often attributed to both thinkers, so later sources do not always reveal who contributed which claim.'},
      ]},
      {heading: 'Physical inquiry', items: [
        {label: 'Atoms and void', description: 'Ungenerated bodies move through empty space; changing things are their temporary combinations rather than new basic substances.'},
        {label: 'Sensible qualities', description: 'Reports connect color, taste, and other appearances to interactions with perceivers, raising questions about what sense experience can establish.'},
      ]},
      {heading: 'Ethical question', items: [
        {label: 'Euthymiē', description: 'A term associated with good spirits or steadiness, not simple cheerfulness and not securely explained by every saying later attributed to Democritus.'},
      ]},
    ],
    'democritus-velazquez',
    'Velázquez’s c. 1628–30 smiling figure and globe belong to the later “laughing philosopher” tradition. They stage a Baroque Democritus rather than an ancient likeness, and cannot establish his character, atomism, or ethical teaching.',
  ),
  heraclitus: primary(
    'Heraclitus',
    [
      'Heraclitus survives through brief passages quoted, paraphrased, or summarized by later writers, not through a manuscript of his own composition. Plato, Aristotle, Stoics, Christian authors, and modern editors each arrange the material with their own questions in view. The fragments have a recognizable cluster—logos, change, opposition, fire, measure, soul, and law—but not the continuity of a recoverable treatise. Even a familiar translation can hide decisions about wording, punctuation, sequence, and authenticity. Reading Heraclitus begins by asking who preserves a sentence and what that witness needed it to show. That discipline prevents memorable reception slogans from becoming recoverable Heraclitean doctrine.',
      'The logos names a common account or intelligible order that people repeatedly fail to grasp; translating it simply as later Stoic “Reason” is too quick. Rivers and fire make transformation vivid, yet “everything flows” is not a secure Heraclitean sentence or a sufficient doctrine. Fire may be cosmic stuff, a model of process, an image of exchange, or a combination of these readings. Opposites can be linked by perspective, succession, dependence, or tension, as with a bow or lyre. Such connections do not make every contradiction identical or turn conflict into an unrestricted endorsement of violence.',
      'Heraclitus makes a durable problem visible: how can a changing world remain intelligible, and how can humans learn to attend to a shared order? Plato’s radical-flux portrait, Aristotle’s material-principle account, and Stoic treatments of logos and fire are important receptions rather than transparent summaries. The eighteenth-century Venetian bust gives a later tradition a striking, sorrowful face. It is neither an ancient portrait nor evidence for Heraclitus’s personality, civic life, or sayings. Its emotional expression should not decide whether his fragments teach melancholy, unity, flux, or cosmic law; the interpretive work remains with the difficult evidence.',
    ],
    [
      {heading: 'How to read the record', items: [
        {label: 'Fragments and witnesses', description: 'Most surviving sentences appear inside later authors, so their context and purpose matter before a phrase is assigned to Heraclitus.'},
        {label: 'Logos', description: 'A shared account or order that people fail to understand; its exact metaphysical status and translation remain disputed.'},
      ]},
      {heading: 'Recurring images', items: [
        {label: 'River', description: 'A way of testing continuity through changing waters, not secure proof that Heraclitus taught only universal flux.'},
        {label: 'Fire', description: 'An image or principle of measured transformation whose physical and symbolic roles cannot be settled by one fragment.'},
      ]},
      {heading: 'Later reception', items: [
        {label: 'Plato and the Stoics', description: 'Later thinkers used Heraclitus to develop their own accounts of change, reason, and cosmos rather than preserving one uncontested original system.'},
      ]},
    ],
    'heraclitus-va-bust',
    'This eighteenth-century Venetian marble bust, photographed at the Victoria and Albert Museum, is a later traditional representation of Heraclitus. Its dramatic expression supplies visual reception, not his appearance, temperament, or a key to the surviving fragments.',
  ),
  empedocles: primary(
    'Empedocles',
    [
      'Empedocles explains visible generation and destruction without allowing basic realities to arise from nothing or vanish into nothing. Four enduring roots—later associated with earth, water, air, and fire—mix and separate under Love and Strife. The poetry gives the roots divine names and active imagery, so they should not be silently converted into Aristotle’s later inert elements. Love and Strife organize combination and separation, but neither maps neatly onto moral good and evil. Their precise status, and the sequence of cosmic phases in which they operate, remain among the central disputes of the surviving evidence.',
      'That evidence is substantial but fragmented. Ancient readers referred to On Nature and Purifications, yet scholars still debate whether these are two poems, one larger project, or overlapping arrangements created by ancient and modern transmission. The Strasbourg papyrus changed the sequence of known verses, and recently published Cairo material demonstrates that the record can still expand without supplying a complete new system. Verse, papyrus grouping, ancient quotation, and modern reconstruction must be kept distinct. A smooth diagram of one cosmic cycle, or a confident biography of a miraculous sage, would conceal the seams that make Empedocles philosophically difficult. The evidence offers alternatives, not one recovered order.',
      'Cosmology joins embodied life and religious practice. Reports about perception, breathing, reproduction, and living formation extend mixture into biology; verses on daimonic exile, transmigration, sacrifice, diet, kinship, and purification give the religious dimension genuine weight. They do not, however, yield a full mechanism connecting daimones to root-compounds. Boyvin’s sixteenth-century engraving shows an imagined Empedocles before a flame associated with Etna. It visualizes a later legend of the philosopher, not an ancient likeness or proof of his death. The print can introduce the afterlife of the story while the verse keeps cosmic, bodily, and ethical questions open.',
    ],
    [
      {heading: 'Cosmic account', items: [
        {label: 'Four roots', description: 'Enduring constituents that mix and separate; later elemental labels are useful orientation but do not exhaust their poetic and divine presentation.'},
        {label: 'Love and Strife', description: 'Forces or principles of combination and separation whose exact cosmic and ethical roles remain disputed.'},
      ]},
      {heading: 'Textual caution', items: [
        {label: 'On Nature and Purifications', description: 'Conventional titles that may mark two poems, one project, or overlapping ancient arrangements rather than a settled authorial architecture.'},
        {label: 'Strasbourg and Cairo material', description: 'Manuscript evidence that changes what can be reconstructed without authorizing a final diagram of the cosmos.'},
      ]},
      {heading: 'Human stakes', items: [
        {label: 'Purification', description: 'Verses on exile, sacrifice, diet, kinship, and transmigration make ethical and religious transformation part of the inquiry, not a detachable myth.'},
      ]},
    ],
    'empedocles-met-print',
    'René Boyvin’s mid-sixteenth-century engraving after Rosso Fiorentino shows an imagined Empedocles beside a flame associated with Etna. It witnesses the later volcanic-death legend, not an ancient portrait or evidence that the story occurred.',
  ),
  anaxagoras: primary(
    'Anaxagoras',
    [
      'Anaxagoras replaces ordinary coming-to-be and perishing with mixture and separation. Every portion contains all relevant ingredients, and a familiar thing is named for what predominates within it; no smallest atom-like particle escapes division. The fragments do not settle whether these ingredients are stuffs, qualities, opposites, or something else. “Seeds” and Aristotle’s term homoeomeries can help orient a visitor only if they do not harden a disputed reconstruction into Anaxagoras’s own final technical vocabulary. His account asks how a world of visible differences can emerge without complete separation of what it contains.',
      'Nous, or Mind, is exceptional: it is unmixed, knowing, autonomous, and powerful. It initiates rotation in the original mixture, and the expanding motion produces relative separations such as dense and rare, cold and hot, dark and bright. The evidence supports a cognitive cosmic mover more securely than a creator deity or a fully purposive designer. Plato’s complaint that Anaxagoras did not explain everything by what is best, and Aristotle’s complaint that Nous appears only when needed, are indispensable philosophical receptions. They are not neutral reports of a promise made in the lost book, nor do they settle how far Nous continues to govern.',
      'Most direct-looking fragments survive through the late commentator Simplicius; astronomy, biology, perception, and biography depend more heavily on later testimony. Stories about Pericles, an impiety prosecution, and departure to Lampsacus conflict about dates, charges, motives, and outcomes. Ribera’s 1636 reader holding a manuscript similarly gives an imagined ancient sage the authority of a scholar. The painting is not a likeness, a surviving book, or evidence for the prosecution story. It helps make reception visible while Anaxagoras’s real contribution remains an unfinished question about mixture, predominance, and an unmixed source of cosmic motion. This restraint preserves inquiry rather than retrofitting a modern scientific answer.',
    ],
    [
      {heading: 'Mixture and difference', items: [
        {label: 'Universal mixture', description: 'Everything contains all relevant ingredients, so ordinary change is reorganization rather than creation from nothing.'},
        {label: 'Predominance', description: 'A thing receives its familiar name from the ingredient that is most manifest in it, not from complete isolation of one substance.'},
      ]},
      {heading: 'Nous', items: [
        {label: 'Unmixed Mind', description: 'A knowing and autonomous source of rotation, distinct from ordinary mixture; the scope of its continuing governance is contested.'},
        {label: 'Plato and Aristotle', description: 'Later philosophers criticize Anaxagoras’s use of Nous, but their objections are interpretive receptions rather than direct access to the lost book.'},
      ]},
      {heading: 'Evidence limit', items: [
        {label: 'Simplicius and biography', description: 'Late quotation preserves crucial fragments, while accounts of Pericles, trial, and departure remain conflicting later traditions.'},
      ]},
    ],
    'anaxagoras-ribera',
    'Jusepe de Ribera’s 1636 Anaxagoras presents a seventeenth-century imagined sage studying manuscripts. The painting cannot supply a likeness, restore the lost book, or confirm the conflicting traditions about his Athenian career.',
  ),
  protagoras: primary(
    'Protagoras',
    [
      'Protagoras made judgment, language, education, and civic competence central problems, but almost none of his prose survives continuously. Short formulations, titles, and reports reach us through Plato, Aristotle, Sextus Empiricus, Diogenes Laertius, and others who write for their own philosophical purposes. His dates are approximate, and colorful stories of exile, book burning, shipwreck, and death come from late or conflicting sources. The record is strongest where it preserves a problem and weakest where it tempts us to turn a famous teacher into a full biography or an inventor of every later relativism.',
      'The best-attested sentence makes a human being the measure of things that are and are not. It can be read in individual, civic, or broader human terms. Plato’s Theaetetus develops an account of differing perceptions and constructs a defense in which expertise improves judgments from worse to better. That extended defense is essential evidence for ancient interpretation, but it is Plato’s construction rather than recovered Protagorean prose. The measure sentence does not by itself prove that every belief is equally good, that truth is impossible, or that “anything goes.” The continuing question is how situated judgment can still be assessed, improved, and shared.',
      'Plato’s Protagoras also gives the sophist a Great Speech about civic virtue and education. Later reports associate him with agnosticism about the gods, opposed arguments, and distinctions in speech, each with a different degree of support. Ribera’s 1637 figure holding an open book gives a Baroque artist’s imagined Protagoras the posture of a learned author. It cannot preserve a lost work, a lifetime likeness, or a solution to the human-measure problem. The portrait is most useful when it sharpens the difference between the authority an image supplies and the precarious testimony through which a teacher’s arguments reach us.',
    ],
    [
      {heading: 'Core problem', items: [
        {label: 'Human measure', description: 'A surviving formulation about human beings and what is or is not; its individual, civic, and broader readings remain open.'},
        {label: 'Better judgment', description: 'The question of how expertise can improve a judgment without replacing every person’s experience with one unquestionable authority.'},
      ]},
      {heading: 'Teaching and evidence', items: [
        {label: 'Civic education', description: 'Protagoras was famous for paid higher education concerned with judgment, speech, and competence in public life.'},
        {label: 'Plato’s reconstructions', description: 'Theaetetus and Protagoras provide indispensable but dramatic and argumentative presentations, not transcripts of lost prose.'},
      ]},
      {heading: 'Cautions', items: [
        {label: 'Agnosticism and opposed arguments', description: 'Later reports need separate assessment and do not by themselves establish a complete skeptical or relativist doctrine.'},
      ]},
    ],
    'protagoras-ribera',
    'Jusepe de Ribera’s 1637 imagined Protagoras holds an open book in a Baroque learned-portrait tradition. Made roughly two millennia later, it cannot show his appearance, preserve one of his lost works, or settle the meaning of human measure.',
  ),
  prodicus: primary(
    'Prodicus of Ceos',
    [
      'Prodicus of Ceos is remembered as a fifth-century teacher with a reputation for careful verbal distinctions, but the evidence is made by other people. Plato repeatedly stages him distinguishing near-synonyms, sometimes with comic exaggeration. These scenes establish a recognizable public reputation more firmly than they preserve a classroom method. Exact dates are undocumented, and reports that he formally trained Socrates or founded a later science of language outrun the record. The productive starting point is not a lost system called “semantics,” but a teacher who made speakers notice that an argument changes when its evaluative words are clarified.',
      'Xenophon’s Memorabilia gives the fullest evidence for the ethical performance later called the Choice of Heracles. Socrates retells a speech attributed to Prodicus in which the young Heracles encounters personified Virtue and Vice; Xenophon explicitly offers an outline and says Prodicus expressed it more splendidly. The passage preserves substantial evidence for a Prodican performance without preserving its exact wording or a securely transmitted book title. It asks how an audience learns to evaluate courage, pleasure, effort, benefit, and responsibility through a vivid choice, rather than through a bare definition alone.',
      'Later testimonies connect Prodicus with accounts of divine names and natural inquiry, but they are too mediated to identify him simply as an atheist or a founder of modern religion theory. Nor do verbal distinctions substitute for evidence and reasons. Sully’s 1819 Choice of Hercules makes the ethical allegory visible through a much later American painting, with two women presenting rival paths to the young hero. It is not an ancient scene, a portrait of Prodicus, or Xenophon’s text. Its value lies in showing how a performed choice became a powerful reception image while the historical teacher remains difficult to reconstruct. Its limits make the performance no less philosophically instructive.',
    ],
    [
      {heading: 'What the witnesses show', items: [
        {label: 'Verbal distinctions', description: 'Plato’s dramatic scenes attest Prodicus’s reputation for differentiating close terms, though they do not reproduce a complete theory of language.'},
        {label: 'Sophistic teaching', description: 'A public educational practice concerned with speech, judgment, and ethical evaluation rather than a modern academic discipline.'},
      ]},
      {heading: 'Heracles’ choice', items: [
        {label: 'Xenophon’s outline', description: 'A retelling that preserves an ethical performance attributed to Prodicus while expressly withholding its original splendid wording.'},
        {label: 'Virtue and Vice', description: 'Personified alternatives through which the narrative tests what a life of effort, pleasure, responsibility, and benefit should mean.'},
      ]},
      {heading: 'Interpretive limit', items: [
        {label: 'Religion and semantics', description: 'Later reports support questions about divine names and language, not a secure claim that Prodicus founded atheism or modern semantics.'},
      ]},
    ],
    'prodicus-choice-of-hercules',
    'Thomas Sully’s 1819 Choice of Hercules depicts a later reception of the ethical allegory attributed to Prodicus. Its personified women and young hero cannot be treated as an ancient event, a portrait of Prodicus, or a record of his exact performance.',
  ),
  gorgias: primary(
    'Gorgias',
    [
      'Gorgias of Leontini was a Sicilian speaker and teacher known for public performance, but claims that he invented rhetoric or trained a fixed roster of later figures exceed the evidence. Two substantial display speeches survive under his name, the Encomium of Helen and Defense of Palamedes, alongside a funeral-speech fragment and shorter sayings. Their exact dates and occasions remain uncertain. The surviving works make rhetoric philosophically interesting because they do not merely decorate a position: they test how speech moves belief, feeling, inference, and responsibility where direct knowledge is unavailable.',
      'Helen defends its controversial subject by considering several possible causes of her action. Its comparison of logos with drugs acting on the body explores how words can affect a soul. Palamedes builds a defense against an accusation that cannot be supported, exposing the fragility of inference from probability. These speeches display technique while asking how persuasion changes agency and what an audience may reasonably infer. They are not advertisements for manipulation, nor do they guarantee that eloquence produces knowledge or justice. The challenge is to assess speech’s force without denying its ethical consequences.',
      'The work conventionally called On Not-Being survives only through different summaries in Sextus Empiricus and the anonymous MXG. Its arguments about being, knowledge, and communication may be serious philosophy, parody, demonstration, or a mixture; they do not securely yield the slogan that nothing exists. Plato’s Gorgias is likewise a distinct dramatic critique of rhetoric without justice, not Gorgias’s own voice. The 1818 Sicilian profile engraving commemorates regional identity long after antiquity. It is an imagined portrait, not evidence of appearance, teaching, or an ancient portrait type. The exhibit keeps speech, truth, and responsibility together without collapsing the evidence. Uncertainty requires historical care, not an invitation to nihilism.',
    ],
    [
      {heading: 'Surviving voices', items: [
        {label: 'Encomium of Helen', description: 'A display speech that tests possible causes of Helen’s action and analyzes how logos can affect belief and feeling.'},
        {label: 'Defense of Palamedes', description: 'A staged defense that exposes the weakness of accusing someone from probability when decisive evidence is absent.'},
      ]},
      {heading: 'Language and responsibility', items: [
        {label: 'Logos', description: 'Speech or discourse understood as an event with powerful effects, not a magic force that eliminates ethical responsibility.'},
        {label: 'Persuasion', description: 'The formation of belief and feeling where knowledge is limited, raising questions about evidence, agency, and accountability.'},
      ]},
      {heading: 'Indirect evidence', items: [
        {label: 'On Not-Being', description: 'A conventionally titled work preserved in two later epitomes whose relationship and philosophical purpose remain disputed.'},
        {label: 'Plato’s Gorgias', description: 'A major dramatic critique of rhetoric, indispensable for reception but not a transparent record of the historical Gorgias.'},
      ]},
    ],
    'gorgias-ortolani',
    'This 1818 profile engraving by Ortolani and Biondi is an imagined Sicilian commemoration of Gorgias. Its labeled face records later regional reception, not his historical appearance, an ancient portrait type, or evidence for his teaching.',
  ),
};
