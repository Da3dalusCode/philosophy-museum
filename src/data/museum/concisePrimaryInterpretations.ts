import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';

const objectInterpretation = (assetId: string, text: string): Readonly<Record<string, string>> => ({
  [assetId]: text,
});

/**
 * Bespoke, subject-led and object-aware interpretation for primary exhibits whose canonical
 * articles are intentionally much deeper than a visitor should encounter in a
 * spatial modal. The concise presentation keeps the article available as the
 * sourced reference without reproducing its catalogs or dispute inventory.
 */
export const CONCISE_PRIMARY_INTERPRETATIONS:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  heraclitus: {
    lead: 'Heraclitus was an early Greek thinker from Ephesus whose compressed sayings connect a common logos with measured change, opposition, fire, law, and the difficulty of understanding a shared world. His work survives only through fragments and later reports.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Heraclitus was active around 500 BCE, but no manuscript of his composition survives. Brief passages are quoted, paraphrased, or summarized by authors writing for their own purposes, from Plato and Aristotle to Stoic and Christian readers. Modern editions decide where a quotation begins, how reliable it is, and how fragments should be ordered. The resulting evidence has a recognizable center—logos, transformation, opposition, measure, soul, and law—without preserving a continuous treatise or one uncontested system.',
      'The common logos is an account or intelligible order that people repeatedly fail to grasp; translating it simply as “reason” can import later Stoic meanings. Rivers and fire make change vivid, but the slogan “everything flows” is not securely preserved as Heraclitus’s own wording and should not define him. Different waters sustain the same river, while fire transforms according to measures. Opposites may be connected by perspective, succession, dependence, or tension, as in a bow or lyre. These examples do not all assert that contradictions are identical, and conflict is not an unrestricted endorsement of violence.',
      'Heraclitus matters because he asks how a world of transformation can remain intelligible and how a person becomes capable of understanding it. Fire may be cosmic stuff, a model of process, an image of exchange, or some combination; the fragments do not settle the balance. Plato’s radical-flux portrait, Aristotle’s material-principle account, and Stoic uses of logos and fire are indispensable receptions rather than transparent summaries. The exhibit therefore holds order and change together while leaving the status of logos, fire, unity, and cosmic measure appropriately open.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Ephesus · fl. c. 500 BCE; exact dates unknown'},
      {label: 'Evidence', value: 'Fragments embedded in later authors · no surviving manuscript'},
      {label: 'Central problems', value: 'Logos · measured change · opposition · understanding'},
      {label: 'Interpretive cautions', value: '“Everything flows” · fire · unity of opposites remain disputed'},
      {label: 'Later reception', value: 'Plato · Aristotle · Stoics · modern process and dialectical readings'},
    ], articleActionLabel: 'Read the full sourced Heraclitus article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: objectInterpretation('heraclitus-va-bust', 'This eighteenth-century Venetian bust supplies a memorable face for Heraclitus, but it was made more than two millennia after his lifetime. It belongs to his later visual reception and cannot document his actual appearance, personality, or the setting in which the surviving sayings were composed.'),
  },
  empedocles: {
    lead: 'Empedocles was a fifth-century BCE thinker and poet from Akragas who joined cosmology, perception, living processes, and religious purification. His surviving verses are substantial but fragmentary, and their original arrangement remains disputed.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Empedocles explains change without allowing basic realities to come from nothing or disappear into nothing. Four enduring roots—later identified with earth, water, air, and fire—mix and separate under Love and Strife. The roots are not merely Aristotle’s later inert elements: the poetry presents them through divine names and active imagery. Love and Strife organize combination and separation, but their exact status and the stages of the cosmic cycle remain contested. Neither force maps neatly onto moral good or evil.',
      'The evidence is poetic and materially incomplete. Ancient readers commonly referred to On Nature and Purifications, yet scholars disagree whether those titles marked two poems, one larger project, or overlapping arrangements. The Strasbourg papyrus altered the sequence of known verses, while recently published Cairo material confirms that the textual record can still change. Surviving lines, papyrus groupings, ancient quotations, and modern diagrams must therefore remain distinct. One smooth cycle or certified one-poem/two-poem solution would claim more than the evidence permits.',
      'Empedocles also connects cosmology with bodies and ways of life. Perception is explained through material interaction, often summarized as like recognizing like, while accounts of breathing, reproduction, and the formation of living beings extend mixture into biology. Verses on daimonic exile, transmigration, sacrifice, diet, kinship, and purification give the religious dimension real weight, but they do not supply a complete mechanism linking daimones to compounds of roots. Empedocles matters because he makes physical explanation, embodied perception, and ethical transformation answer to one poetic project while preserving the seams that keep that project from becoming a modern textbook system.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Akragas, Sicily · 5th century BCE; chronology uncertain'},
      {label: 'Evidence', value: 'Surviving verses · papyri · quotations · later testimony'},
      {label: 'Cosmic account', value: 'Four roots · Love and Strife · mixture and separation'},
      {label: 'Human questions', value: 'Perception · embodiment · sacrifice · purification'},
      {label: 'Open disputes', value: 'One poem or two · cosmic phases · daimones and embodied life'},
    ], articleActionLabel: 'Read the full sourced Empedocles article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: objectInterpretation('empedocles-met-print', 'This mid-sixteenth-century print imagines Empedocles long after antiquity and reflects the dramatic biography built around him, including legends of extraordinary powers and death at Etna. It is evidence for later visual reception, not a reliable likeness or confirmation of the stories attached to his life.'),
  },
  anaxagoras: {
    lead: 'Anaxagoras was a fifth-century BCE thinker from Clazomenae who became prominent at Athens. He explained differentiated things through universal mixture and relative separation, with an unmixed, knowing Nous initiating cosmic rotation.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Anaxagoras argues that ordinary generation and destruction are really mixture and separation. Every portion contains all relevant ingredients, without a smallest part, while a thing receives its familiar name from what predominates in it. Modern reconstructions disagree about whether those ingredients are stuffs, qualities, opposites, or something else. Calling them atom-like “seeds” or treating Aristotle’s “homoeomeries” as Anaxagoras’s own settled technical term hides that dispute and makes the theory more definite than the fragments allow.',
      'Nous, or Mind, is exceptional: it is unmixed, knowing, autonomous, and powerful. It begins rotation in the original mixture, and the widening whirl brings dense and rare, cold and hot, dark and bright into relative separation. Ordinary ingredients never become completely isolated. The fragments support a cognitive cosmic cause more securely than a later creator deity or a fully purposive design. Plato’s disappointment that Anaxagoras did not explain everything through what is best and Aristotle’s claim that he used Nous only when needed are philosophically influential receptions, not neutral reports of a promise made in the lost book.',
      'Most direct-looking fragments survive through the late commentator Simplicius. Astronomy, biology, and perception depend more heavily on Aristotelian, Theophrastean, and later testimony, so the exhibit does not turn every report into one seamless scientific system. Anaxagoras’s Athenian career is similarly mediated. Later accounts connect him with Pericles, an impiety prosecution, and departure to Lampsacus, but they conflict about dates, accusers, charges, motives, and outcomes. His importance lies in making mixture, manifest difference, and a knowing mover part of one account while keeping the ontology of ingredients, the reach of Nous, and the biography visibly open.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Clazomenae, Athens, Lampsacus · 5th century BCE'},
      {label: 'Evidence', value: 'Fragments chiefly preserved by Simplicius · interested later testimony'},
      {label: 'Cosmic account', value: 'Universal mixture · infinite divisibility · predominance'},
      {label: 'Nous', value: 'Unmixed knower and mover · extent of purpose disputed'},
      {label: 'Biographical caution', value: 'Pericles, trial, and exile stories conflict'},
    ], articleActionLabel: 'Read the full sourced Anaxagoras article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: objectInterpretation('anaxagoras-ribera', 'Ribera’s seventeenth-century painting gives Anaxagoras the visual authority of an ancient sage, but it was created about two millennia after his lifetime. It is a work of later European reception, not a historical portrait or direct evidence for his Athenian trial, exile, or philosophical practice.'),
  },
  antisthenes: {
    lead: 'Antisthenes was a fourth-century BCE Socratic writer and teacher whose surviving evidence spans ethics, literature, language, and logic. His secure relationship to Socrates should be distinguished from the later story that made him an uncontested founder of Cynicism.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Antisthenes belonged to the diverse circle formed around Socrates and is represented at length by Xenophon. That portrait makes ethical endurance, self-command, independence from luxury, and practical virtue prominent, but Xenophon writes literary conversations rather than transcripts. Later biographies add dates, ancestry, teachers, places, and a succession from Socrates through Antisthenes to Diogenes. These reports help explain his reception while remaining much less secure than his broad Socratic identity.',
      'Only the declamations Ajax and Odysseus survive continuously under Antisthenes’s name. Diogenes Laertius preserves an extensive catalogue of attributed titles, which confirms the range of ancient interests but not the recoverable contents of lost works. Reports about virtue, predication, contradiction, names, Homeric interpretation, and education come through different witnesses and argumentative settings. They should not be fused automatically into one systematic Antisthenean philosophy. His engagement with heroic speech and language belongs beside ethical practice rather than beneath a single reconstructed doctrine.',
      'Ancient and modern accounts often call Antisthenes the founder or first teacher of Cynicism. That description is disputed. Later Cynic and Stoic succession stories had reasons to create an orderly lineage, while direct contact between Antisthenes and Diogenes is not securely established. Similarities—self-sufficiency, toughness, the sufficiency of virtue, and suspicion of convention—make Antisthenes an important precursor and contested ancestor. They do not make later Cynic performance his completed school program. The exhibit presents a significant Socratic author whose varied dossiers shaped later ethics and language debates without granting the tidy founder story more certainty than the evidence allows. That caution preserves his influence without manufacturing a secure succession.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Athens · 5th–4th centuries BCE; dates uncertain'},
      {label: 'Secure identity', value: 'Socratic writer and teacher represented by Xenophon'},
      {label: 'Surviving works', value: 'Ajax · Odysseus'},
      {label: 'Other evidence', value: 'Lost-work catalogue · Aristotelian reports · later biography'},
      {label: 'Cynic connection', value: 'Influential precursor or disputed ancestor, not uncontested founder'},
    ], articleActionLabel: 'Read the full sourced Antisthenes article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: objectInterpretation('antisthenes-british-museum-bust', 'This Roman bust follows an earlier Greek portrait type and is traditionally identified as Antisthenes. The later copy and inherited identification require caution: the sculpture can anchor his ancient reception, but it cannot prove his appearance or settle the disputed genealogy connecting him to Cynicism.'),
  },
  arcesilaus: {
    lead: 'Arcesilaus led Plato’s Academy in the third century BCE and redirected its public practice toward skeptical dialectic. He left no surviving philosophical writing, so his arguments and commitments must be reconstructed through later, often partisan witnesses.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Arcesilaus became head of the Academy and made opposition to confident knowledge claims central to its philosophical identity. He wrote no philosophical works that survive and may have written none. Cicero, Sextus Empiricus, Plutarch, and other later authors present him through debates about Stoicism, Academic identity, and Pyrrhonism. Their reports establish the skeptical turn and a sustained attack on the Stoic criterion of cognition more securely than they reveal a private body of doctrine.',
      'Stoics held that a cognitive impression could carry a truth-guaranteeing mark. Arcesilaus is reported to have pressed the possibility of false impressions indistinguishable from true ones. If the wise person must avoid opinion and no impression secures itself, suspension of assent follows. Yet the argument may work internally from Stoic premises rather than assert the personal doctrine that knowledge is impossible. Reports that reasonable action can guide the suspended skeptic are likewise contested: the proposal may be Arcesilaus’s own practical standard or a dialectical answer to the charge that skepticism makes action impossible.',
      'This uncertainty is not an obstacle added after the philosophy; it is part of understanding a thinker whose method resists easy doctrinal attribution. Arcesilaus could draw opposed conclusions, test an interlocutor’s premises, and revive Socratic perplexity within Plato’s institution without claiming that every conclusion he defended was his belief. Later Academic terminology and Carneadean developments can easily be read backward into him. The exhibit therefore emphasizes a disciplined practice: make every claimed criterion face its strongest counterargument, withhold assent when warrant fails, and distinguish philosophical criticism from the possession of a replacement system.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Head of Plato’s Academy · 3rd century BCE'},
      {label: 'Evidence', value: 'No surviving writings · later Academic, Pyrrhonian, and biographical reports'},
      {label: 'Main opponent', value: 'Stoic cognitive impressions and secure assent'},
      {label: 'Practice', value: 'Dialectical opposition · suspension · Socratic perplexity'},
      {label: 'Open dispute', value: 'Dialectical consequences or Arcesilaus’s own doctrines'},
    ], articleActionLabel: 'Read the full sourced Arcesilaus article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: objectInterpretation('arcesilaus-carneades-academica', 'This 1810 title-page image pairs imagined profiles of Arcesilaus and Carneades to visualize an Academic lineage. It is useful evidence for later reception and classification, not an ancient portrait, a record of direct personal contact, or proof that the two skeptics taught one unchanged doctrine.'),
  },
  carneades: {
    lead: 'Carneades led the skeptical Academy in the second century BCE and became renowned for testing rival systems across knowledge, ethics, theology, fate, and justice. He wrote nothing, and even his student Clitomachus’s reports survive only indirectly.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Carneades continued the Academy’s skeptical challenge to claims of secure cognition, but he left no writings. Clitomachus composed books about his teacher without claiming complete certainty about what Carneades believed, and those books are also lost. Cicero, Sextus Empiricus, and later witnesses preserve arguments through different Academic and Pyrrhonian agendas. Their evidence shows an exceptionally wide dialectical practice more clearly than a fixed set of personal doctrines.',
      'Carneades is associated with the persuasive or plausible impression, pithanon, as a fallible guide for inquiry and action. The term does not mean numerical probability. Reports describe increasing scrutiny of an appearance and its relations to other appearances, but interpreters disagreed even in antiquity about what practical approval involved. Clitomachus and Metrodorus appear to have differed over whether the skeptic can approve without assenting or may hold qualified opinions. The account can be read as Carneades’s own practical view or as a constructive answer showing that Stoic certainty is unnecessary for action.',
      'The same caution applies to arguments about gods, fate, ethics, and justice. Carneades could build powerful alternatives in order to expose the commitments of a dogmatic system without finally endorsing them. The famous 155 BCE embassy to Rome is historical, but reports that he defended justice one day and attacked it the next are later and cannot be treated as transcripts. “New” or “Third Academy” is also a variable taxonomy, not a new institution founded from nothing. Carneades matters because he shows how reasoning can remain active, discriminating, and practically serious when certainty is unavailable—and why defending a position skillfully is not the same as assenting to it.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Head of the skeptical Academy · 2nd century BCE'},
      {label: 'Evidence', value: 'No writings · Clitomachus lost · later Cicero and Sextus'},
      {label: 'Method', value: 'Constructive arguments on rival sides'},
      {label: 'Practical guide', value: 'Persuasive or plausible appearances · not numerical probability'},
      {label: 'Open dispute', value: 'Approval, assent, qualified opinion, and personal doctrine'},
    ], articleActionLabel: 'Read the full sourced Carneades article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: objectInterpretation('carneades-louvre-bust', 'This Roman copy of a Hellenistic portrait is traditionally identified as Carneades. The attribution gives his reception an ancient material anchor but is not certain. A sculpted likeness also cannot reveal which reported arguments were dialectical exercises and which, if any, expressed his personal commitment.'),
  },
  porphyry: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Porphyry made philosophy travel by editing, teaching, and interpreting as well as by arguing. After studying with Plotinus in Rome, he arranged fifty-four Plotinian treatises into the six Enneads and prefaced them with the Life of Plotinus. That firsthand account preserves a seminar world of reading and dispute, but it is also an exemplary biography and a deliberate editorial frame. The order, titles, and narrative teach later readers how to encounter Plotinus. The late-medieval illumination displayed here registers that influential pairing in later reception; it is not a likeness, eyewitness scene, or neutral record of either philosopher’s work.',
      'His own surviving writings range across logical preparation, ethics, literary interpretation, and religious inquiry. The Isagoge teaches genus, species, difference, property, and accident before explicitly postponing difficult questions about what universals are. Medieval debates made that postponement famous, but they are not Porphyry’s finished answer. On Abstinence connects attention, justice toward animals, appetite, sacrifice, and philosophical purification for a contemplative audience. Such works show a thinker for whom careful distinctions and daily discipline belonged together, without proving that every reader was bound to the same practice.',
      'The archive sets the limits of the portrait. Some works survive substantially; commentaries and theological writings are fragmentary, disputed, or lost. Against the Christians is known through hostile preservation and response, not a continuous Porphyrian book. Iamblichus’s reply to Porphyry’s lost Letter to Anebo likewise cannot simply disclose Porphyry’s own final position on ritual. He was neither a modern secular critic nor a spokesman for every traditional rite. Porphyry matters because selection, interpretation, and practical formation can be original philosophical acts—while the gaps in his corpus require us to keep direct texts, later reports, and reception distinct.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Key moves', items: [
        {label: 'Editorial philosophy', description: 'Arranging texts and writing a biography shaped how later readers understood Plotinus; preserving a work is never wholly neutral.'},
        {label: 'Five predicables', description: 'Genus, species, difference, property, and accident are tools for sorting claims before tackling harder metaphysical questions.'},
      ]},
      {heading: 'Works and practice', items: [
        {label: 'Life of Plotinus', description: 'A firsthand but admiring account of Plotinus’s circle and the Enneads’ editorial order.'},
        {label: 'On Abstinence', description: 'A sustained case linking diet, animal life, sacrifice, justice, and the discipline of desire.'},
      ]},
      {heading: 'Read with care', items: [
        {label: 'Uneven survival', description: 'Lost books, excerpts, and contested attributions cannot be combined into one fully recoverable system.'},
        {label: 'Ritual and polemic', description: 'His questions about rites and Christianity come from committed Platonist and Hellenic arguments, not modern neutrality.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Porphyry article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, its registered sources, and the verified principal-object record; the subject-specific guide and object-led presentation were reviewed against the locked exhibit standard.', lock: 'fnv1a64:68f6cde7345fc238'},
    objectInterpretations: objectInterpretation('porphyry-plotinus-medieval', 'This c. 1475–1480 illumination by Maître François imagines Porphyry and Plotinus debating beneath celestial signs. It is a late-medieval reception image, not an ancient portrait or eyewitness scene; it can illuminate the later pairing of teacher and editor, but cannot establish Porphyry’s appearance, their exact relationship, or his views on ritual.'),
  },
  iamblichus: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Iamblichus made philosophical formation wider than private contemplation. His Syrian school joined Platonic and Aristotelian commentary, mathematics, Pythagorean exemplary life, psychology, and ritual. The fourteenth-century page displayed here opens the Protrepticus, a work of exhortation within that educational program. It is a medieval witness, not an authorial copy, and it cannot recover his lost commentaries or show a rite in practice. But it makes a basic fact visible: Iamblichus’s philosophy survived through reading, copying, and a curriculum meant to reshape the learner’s life.',
      'His best-preserved ritual defense is a reply to Porphyry’s lost Letter to Anebo, voiced by the constructed Egyptian priest Abamon and conventionally called On the Mysteries. The adopted speaker and missing letter matter. The reply is not a neutral transcript of Porphyry’s questions or a simple autobiography. It argues that human knowledge does not initiate contact with gods: divine causes are prior to the embodied person who receives them. That claim supports theurgy, or divine work, while giving ethical study, discernment, and rational inquiry continuing roles.',
      'For Iamblichus, symbols, prayers, sacrifices, and material practices work only because higher causes establish their affinities; they do not let a clever operator coerce the divine. This is why “magic versus reason” is a poor summary. The question is whether an embodied, distracted soul can be transformed by practices whose source and efficacy exceed discursive thought alone. His Pythagorean books construct a late-antique program from earlier materials, and many technical doctrines survive only in excerpts or later reconstructions. Iamblichus therefore belongs neither to one uniform Neoplatonic institution nor to a ready-made system recoverable from later writers. His voice, missing interlocutor, and surviving Pythagorean books require historians to distinguish secure texts from inferential school history, then ask how later writers made a plural legacy appear systematic.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Central questions', items: [
        {label: 'Divine causation', description: 'If gods are higher causes, human thought cannot make them act; it must learn how to receive what precedes it.'},
        {label: 'Embodied ascent', description: 'Human distraction and change make ethical training, study, and material practice parts of transformation.'},
      ]},
      {heading: 'Texts and practices', items: [
        {label: 'Reply to Porphyry', description: 'A complete ritual defense spoken through Abamon, answering a letter that no longer survives.'},
        {label: 'Theurgy', description: 'Divinely grounded action using prayer, symbols, and rites—not a technique for controlling the gods.'},
      ]},
      {heading: 'Transmission', items: [
        {label: 'Pythagorean program', description: 'A late-antique educational construction that preserves and reshapes earlier Pythagorean materials.'},
        {label: 'Fragmentary system', description: 'Lost commentaries and later quotations guide reconstruction, but cannot simply be treated as Iamblichus’s own full voice.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Iamblichus article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, its registered sources, and the verified principal-object record; the subject-specific guide and object-led presentation were reviewed against the locked exhibit standard.', lock: 'fnv1a64:851756bb121fae8c'},
    objectInterpretations: objectInterpretation('iamblichus-protreptikos-manuscript', 'This fourteenth-century Greek manuscript is the oldest major witness to Iamblichus’s Protrepticus, held as Biblioteca Medicea Laurenziana Plut. 86.3, fol. 46v. It directly transmits a text from his educational project, but it was copied roughly a millennium later and cannot stand for his lost commentaries, his historical appearance, or the performance of theurgy.'),
  },
  proclus: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Proclus made late Platonism a demanding practice of proof, commentary, study, hymn, and prayer. He taught at fifth-century Athens in an institution claiming Platonic inheritance, not Plato’s original Academy continuing unchanged. The displayed marble head probably represents Plutarch of Athens, who revived the Athenian Platonist school and preceded Syrianus, Proclus’s teacher. It is neither Proclus’s portrait nor proof of an unchanged Academy. The object places him within an immediate intellectual lineage while its uncertain identification warns against turning institutional succession into a direct likeness of his thought, classroom, or religious practice.',
      'The Elements of Theology sets out 211 propositions, but its tight sequence is one genre within a larger corpus. Platonic Theology, commentaries on the Timaeus and Parmenides, mathematical work, hymns, and lost writings connect systematic distinctions to the work of reading and teaching. Remaining, procession, and return describe causal relations: effects stay grounded in a cause, unfold into distinction, and turn back toward their source. They are not three events in time. Participation and the ordered relations of unity and plurality explain how difference can depend on what exceeds it without simply vanishing into it.',
      'Prayer and theurgy belong inside this philosophical setting. Like Iamblichus, Proclus treats divine symbols and initiative as necessary to a unification that discursive reason cannot produce for itself; this does not make demonstration irrelevant. Marinus’s admiring Life of Proclus is useful but not neutral evidence for such a life. Later readers selectively transformed it: the Book of Causes adapted propositions for Arabic and Latin worlds, and Pseudo-Dionysius reshaped Proclean causal structures in Christian theology. These are historical transmissions, not unchanged copies. Reading Proclus well means keeping formal system, pedagogical setting, pagan religious practice, and later reception connected but distinct.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Causal vocabulary', items: [
        {label: 'Remaining, procession, return', description: 'Effects depend on their causes, become distinct, and are drawn back toward their sources; this is not a timeline of cosmic events.'},
        {label: 'Participation', description: 'A thing receives unity or goodness from what exceeds it without becoming identical with that source.'},
      ]},
      {heading: 'A philosophical life', items: [
        {label: 'Elements of Theology', description: 'A proposition-by-proposition account of causality and unity, central but not equivalent to the entire corpus.'},
        {label: 'Commentary and mathematics', description: 'Reading Plato and studying proof trained learners to move through plurality without losing intelligible order.'},
      ]},
      {heading: 'Afterlives', items: [
        {label: 'Book of Causes', description: 'An Arabic and then Latin reworking made selected Proclean propositions appear in a different philosophical setting.'},
        {label: 'Pseudo-Dionysius', description: 'A Christian author adapted Proclean structures while redirecting them through scripture, liturgy, and Trinitarian theology.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Proclus article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, its registered sources, and the verified principal-object record; the subject-specific guide and object-led presentation were reviewed against the locked exhibit standard.', lock: 'fnv1a64:a70964633c78ed50'},
    objectInterpretations: objectInterpretation('proclus-platonic-theology-manuscript', 'This early-fifth-century marble portrait probably depicts Plutarch of Athens, who preceded Syrianus and belongs to Proclus’s immediate Athenian lineage. The identification is uncertain, and the head is not Proclus. It provides school context but cannot represent Proclus’s appearance, commentaries, pedagogy, mathematics, prayer, or ritual practice.'),
  },
  origen: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Origen made scriptural interpretation a rigorous form of philosophical and spiritual inquiry. In Alexandria and later Caesarea, he taught, preached, compared texts, organized a large scholarly enterprise, and wrote across commentary, homily, apology, and theological argument. The manuscript miniature displayed here presents him as an author beside a decorated initial in a twelfth-century copy of homilies. It is a medieval imagined portrait, not a late-antique likeness. Its real value is material: it shows a later community receiving Origen through copying and reading, the very processes that also complicate access to his original wording.',
      'His Hexapla compared Hebrew and Greek scriptural versions; his commentaries, homilies, On First Principles, Against Celsus, and On Prayer join philology to moral formation. Layered reading was not permission to invent meanings at will. Wording, textual comparison, a rule of faith, philosophical coherence, and the reader’s transformation constrained it. But the corpus is uneven: some important works survive in Greek, much of On First Principles is known through Rufinus’s Latin translation alongside Greek fragments, and other material comes through excerpts or hostile reports. The channel of transmission changes what can responsibly be claimed.',
      'That caution is decisive for debates about preexistence, embodiment, resurrection, divine relations, and restoration. Origen rejects simple transmigration, does not make created embodiment identical with evil, and insists that rational creatures retain freedom within divine education. Yet no simple prehistoric fall-story or final doctrinal package can be read directly from every later witness. “Origenism,” sixth-century condemnatory material, and his surviving writings have intertwined but nonidentical histories. A far-reaching restorative hope is a serious trajectory in the evidence, while its scope, certainty, and the fate of the devil remain disputed. The exhibit follows an ambitious Christian philosopher without mistaking later controversy for transparent access to every lost Greek formulation.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Reading scripture', items: [
        {label: 'Layered interpretation', description: 'Scripture can address bodily, moral, and spiritual formation, but language, coherence, and communal rules still constrain the reading.'},
        {label: 'Hexapla', description: 'A vast comparison of Hebrew and Greek versions that makes textual differences part of theological study.'},
      ]},
      {heading: 'Major works', items: [
        {label: 'On First Principles', description: 'A wide-ranging theological argument preserved chiefly through a Latin translation and Greek witnesses that do not always agree.'},
        {label: 'Against Celsus', description: 'A substantially surviving Greek defense of Christianity written against a polemical critic.'},
      ]},
      {heading: 'Keep distinct', items: [
        {label: 'Transmission', description: 'Original Greek, Latin translations, fragments, and hostile dossiers have different evidential force.'},
        {label: 'Restoration', description: 'His account supports a powerful hope for divine healing, but its scope and certainty remain genuinely disputed.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Origen article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, its registered sources, and the verified principal-object record; the subject-specific guide and object-led presentation were reviewed against the locked exhibit standard.', lock: 'fnv1a64:ce997f84163d690f'},
    objectInterpretations: objectInterpretation('origen-schaftlarn-manuscript', 'This c. 1160 miniature in Bayerische Staatsbibliothek Clm 17092, folio 130v, presents Origen as an author in a manuscript of his homilies. It is a medieval imagined author portrait, not a late-antique likeness; it supports an account of his reception through copying but cannot settle the wording of lost Greek texts, the reach of his theology, or later Origenist controversies.'),
  },
  'gregory-nyssa': {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Gregory of Nyssa connects the infinity of God with a person’s capacity for unending transformation. In debates against Eunomius, divine names can truly indicate God without enclosing divine nature in a definition. The Life of Moses turns that limit into a path: movement into darkness is not ignorance as failure, but refusal to possess an infinite good as a finished object. The gold-ground mosaic shown here remembers Gregory as bishop and author in a later Byzantine devotional tradition. It cannot document his appearance or decide his philosophical arguments, but it does register the ecclesial afterlife in which his writings were received.',
      'Created mutability is therefore not only a weakness. It is the condition for freedom, conversion, moral danger, and ever-deeper participation in goodness. Gregory’s anthropology insists that this transformation is embodied. On the Making of Man and On the Soul and the Resurrection explore body and soul, sex, personal continuity, death, and resurrection through scripture and ancient physiology; their difficult formulations resist a simple story of escape from bodies. His spiritual ascent also returns to virtue, service, and community. His attacks on slavery and economic domination are unusually forceful for their setting, though they do not make him a ready-made modern political theorist.',
      'The hardest question concerns the end of correction. Several texts give strong support to a universal-restoration reading in which punishment heals rather than simply retaliates. Yet its scope, development, relation to freedom, and fit with less universal-sounding passages remain disputed. That open debate belongs to the exhibit. Gregory does not offer a static heaven of completed possession: a finite creature can continue to be drawn toward inexhaustible goodness. Divine incomprehensibility thus enlarges ethical life rather than canceling it. Embodied persons remain free, socially answerable, and capable of transformation without that transformation becoming a flight from created life.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Knowing and becoming', items: [
        {label: 'Divine incomprehensibility', description: 'Names can point to divine activity without defining an infinite divine essence.'},
        {label: 'Perpetual progress', description: 'Finite creatures can grow ever more deeply toward inexhaustible goodness rather than possess it once and for all.'},
      ]},
      {heading: 'Embodied questions', items: [
        {label: 'Human image', description: 'Human dignity, freedom, and relation to God are realized in embodied persons and a shared human nature.'},
        {label: 'Resurrection', description: 'Body, soul, sex, identity, and transformation remain difficult questions, not evidence for simple disembodied escape.'},
      ]},
      {heading: 'Texts and dispute', items: [
        {label: 'Life of Moses', description: 'A scriptural and spiritual account of virtue, darkness, and endless ascent.'},
        {label: 'Universal restoration', description: 'Purgative correction is strongly grounded in some texts, while its scope and relation to freedom remain contested.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Gregory of Nyssa article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, its registered sources, and the verified principal-object record; the subject-specific guide and object-led presentation were reviewed against the locked exhibit standard.', lock: 'fnv1a64:91a01952227ae151'},
    objectInterpretations: objectInterpretation('gregory-nyssa-mosaic', 'This later Byzantine gold-ground mosaic presents Gregory of Nyssa as a bearded bishop holding a book. It is devotional reception, not historical documentary portraiture: the image supports an account of his later ecclesial authority but cannot verify his appearance or resolve debates about embodied transformation, perpetual progress, slavery, or universal restoration.'),
  },
  'pseudo-dionysius': {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Pseudo-Dionysius is the modern name for an anonymous late-antique Christian author who wrote around 500 as Dionysius the Areopagite, the Athenian convert in Acts. Raphael’s early-sixteenth-century cartoon of Paul preaching at Athens visualizes the biblical setting from which that adopted identity draws authority. It is later Christian reception, not a portrait of the anonymous author or evidence for the corpus’s date and identity. Dependence on later Platonism, especially Proclus, and secure sixth-century reception rule out the first-century persona. “Pseudo-” names that problem without making the writings a mere fraud: the adopted voice is integral to the project and to the authority later readers granted it.',
      'The four treatises and ten letters join divine naming, apophatic unknowing, ritual, and ordered participation. Divine Names calls God Good, Being, Life, and Wisdom because creatures receive and disclose those perfections; no name captures the source as one being among others. Procession and return describe dependence, manifestation, desire, and response rather than a temporal journey away from God and back. Affirmation and negation work together: a name is true of the cause while inadequate to its transcendent mode. Mystical unknowing exceeds both, not because all theological language is meaningless but because no concept becomes possession of God.',
      'Hierarchy is not merely an angel chart or a private flight into darkness. Celestial Hierarchy treats symbols and names as ways embodied readers can be led beyond literal images; Ecclesiastical Hierarchy reads baptism, Eucharist, ministry, and burial as public forms of purification, illumination, and perfection. The account can describe receptive, generous mediation, yet it also sacralizes graded roles and can expose institutional and political risks. Byzantine scholia, Maximus, Eriugena’s translations, Latin scholasticism, and mystical traditions each transformed the corpus. A responsible view keeps the anonymous late-antique text, its Proclean dependence, and these many receptions from collapsing into one unchanged system.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'The corpus', items: [
        {label: 'Anonymous persona', description: 'A writer around 500 adopts the voice of Paul’s Athenian convert; the name shaped reception but does not reveal a biography.'},
        {label: 'Four treatises', description: 'Divine Names, Mystical Theology, Celestial Hierarchy, and Ecclesiastical Hierarchy make different contributions to one interrelated corpus.'},
      ]},
      {heading: 'A theological method', items: [
        {label: 'Divine names', description: 'Scriptural names are true through the gifts creatures receive, yet none defines God’s transcendent mode.'},
        {label: 'Apophasis', description: 'Negation prevents names from becoming idols; unknowing exceeds both assertion and denial without making speech useless.'},
      ]},
      {heading: 'Mediation and reception', items: [
        {label: 'Hierarchy', description: 'Purification, illumination, and perfection describe ordered participation through symbols, angels, and public liturgical practices.'},
        {label: 'Transformed afterlives', description: 'Greek commentary, Latin translation, scholastic theology, and mystical writing repeatedly refashioned the corpus.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Pseudo-Dionysius article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, its registered sources, and the verified principal-object record; the subject-specific guide and object-led presentation were reviewed against the locked exhibit standard.', lock: 'fnv1a64:0a668f1f02c27ae5'},
    objectInterpretations: objectInterpretation('pseudo-dionysius-opera-1556', 'Raphael’s c. 1515–1516 cartoon depicts Paul preaching at Athens, the biblical setting of Dionysius the Areopagite. It helps explain the apostolic identity adopted by the anonymous author, but it neither portrays that late-antique author nor records the corpus’s composition, philosophy, or sixth-century reception. Its relevance is iconographic and reception-historical, not documentary.'),
  },
  thales: {
    lead: 'Thales was an early Greek thinker from Miletus whom later authors associated with explaining the world through water and other natural principles. None of his writings survives, so the exhibit separates his historical importance from the much later testimony used to reconstruct it.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Thales was active in Miletus, probably in the early sixth century BCE, but almost everything said about him comes from authors writing generations or centuries later. Aristotle reports that Thales made water a basic principle and thought the earth rested on water. Other traditions credit him with claims about soul, magnets, divine presence, astronomy, geometry, political advice, and travel. These reports show what antiquity came to associate with his name; they do not preserve a Thalean book or let us recover his exact arguments.',
      'The water report matters because Aristotle presents it as an attempt to explain diverse things through a natural constituent rather than through a divine genealogy alone. Yet even that framing is Aristotle’s reconstruction of an earlier project. We cannot know whether Thales proposed one material source for everything, emphasized moisture in living processes, adapted older cosmological knowledge, or reasoned in some other way. The familiar story that he predicted the eclipse of 585 BCE is likewise possible but not securely documented as a scientific calculation.',
      'Thales matters less as the author of a recoverable doctrine than as a landmark in later histories of inquiry. Aristotle helped make him the starting point of a genealogy of natural philosophy, while modern accounts often promoted him to “the first philosopher.” That title depends on how philosophy is defined and can obscure older Egyptian, Mesopotamian, and Greek knowledge. No ancient source gives us a neutral view from which to settle that priority. A careful exhibit therefore presents a historically elusive Milesian whose reception helped define what later readers thought philosophical explanation should be.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Miletus · probably early 6th century BCE'},
      {label: 'Evidence', value: 'No surviving writings · later Greek and Roman testimony'},
      {label: 'Attributed proposal', value: 'Water as a basic principle · earth resting on water'},
      {label: 'Uncertain reports', value: 'Eclipse · geometry · travel · political advice'},
      {label: 'Why he matters', value: 'A retrospective landmark in histories of natural explanation'},
    ], articleActionLabel: 'Read the full sourced Thales article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 3},
    objectInterpretations: objectInterpretation('thales-promptuarii-portrait', 'Rouillé’s 1553 woodcut gives a face to a thinker for whom no authenticated likeness survives. Made roughly two millennia after Thales, it records Renaissance reception rather than his appearance or the historical setting of sixth-century Miletus.'),
  },
  anaximander: {
    lead: 'Anaximander was an early Greek thinker from Miletus who was later credited with explaining the cosmos from an indefinite or boundless source. One short fragment may preserve some of his wording; most details of his philosophy come through later reports and reconstruction.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Anaximander was active in Miletus in the sixth century BCE and is conventionally placed after Thales, although the familiar teacher-and-pupil sequence is later testimony. Ancient sources associate him with a prose work, cosmology, geography, weather, and accounts of living things. Only a brief sentence quoted by Simplicius may preserve his wording. Even there, Simplicius is transmitting a report derived from Theophrastus, so editors must distinguish the fragment from the language surrounding it.',
      'Aristotle and the doxographical tradition connect Anaximander with the apeiron: something indefinite or boundless from which worlds and opposites emerge. The proposal may have avoided making any familiar element—water, air, or fire—the source of its own contrary. But “infinite substance,” “spatially boundless,” and “qualitatively indefinite” are modern interpretive options, not interchangeable translations of a complete surviving theory. The fragment’s language of things paying penalty and reparation according to time suggests an ordered account of coming-to-be and passing-away without supplying a full mechanism.',
      'Later reports also describe a freely suspended earth, celestial rings, meteorological processes, and the emergence of human beings from aquatic creatures. These claims have different evidential histories and should not be merged into a modern scientific system. The earth’s lack of support is one especially important attributed innovation, but its argument is reconstructed rather than quoted in his words. Anaximander matters because his project presses beyond a familiar material source toward conditions that could explain opposition, balance, and cosmic order. The surviving record is philosophically fertile precisely because fragment, testimony, later organization, and modern reconstruction remain visibly distinct.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Miletus · 6th century BCE'},
      {label: 'Evidence', value: 'One narrow fragment · Theophrastean and later testimony'},
      {label: 'Attributed principle', value: 'Apeiron · the indefinite or boundless'},
      {label: 'Reported inquiries', value: 'Cosmos · earth · weather · life · geography'},
      {label: 'Interpretive limit', value: 'Later terminology is not Anaximander’s surviving prose'},
    ], articleActionLabel: 'Read the full sourced Anaximander article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 3},
    objectInterpretations: objectInterpretation('anaximander-world-map', 'This 2006 diagram is one modern reconstruction of a map that ancient reports associate with Anaximander. No original map survives, and the diagram’s coastlines, labels, and arrangement should not be mistaken for a copy of his work.'),
  },
  anaximenes: {
    lead: 'Anaximenes was an early Greek thinker from Miletus who was later credited with making air the underlying principle of the cosmos. Reports say that rarefaction and condensation explained how one underlying stuff could appear in many forms, but his own work is lost.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Anaximenes probably worked in sixth-century Miletus, but his dates and his place in a neat succession after Anaximander are reconstructed from later testimony. Ancient authors say that he wrote in prose, yet no continuous work survives. A few possible verbal echoes and many doxographical reports connect him with air, breath, weather, the earth, and the heavens. These witnesses preserve an outline, not a transcript of his reasoning.',
      'The central reported proposal is that air underlies things and changes through rarefaction and condensation. Rarer air becomes fire; denser air becomes wind, cloud, water, earth, and stone. This offers a mechanism linking differences of kind to changes in density while preserving an underlying continuity. Ancient examples involving breath, felt temperature, cloud, and precipitation may show how the view was explained, but their wording and arrangement belong to later reporters. The sequence should not be recast as a modern quantitative law or experimental theory.',
      'A reported comparison between air sustaining the cosmos and breath or soul sustaining us is especially uncertain because its wording and attribution are debated. Cosmological details about a flat earth, celestial bodies, and weather likewise arrive through multiple later layers. The model’s value is conceptual rather than a claim that it anticipated modern physics. Later Greek theories of material change inherited the demand for an intelligible process, not necessarily Anaximenes’ air. Anaximenes matters because the attributed account makes transformation itself explanatory: a single principle becomes useful only when a process shows how diversity arises. His exhibit therefore emphasizes that philosophical advance while keeping the sparse, mediated evidence in view.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Miletus · probably later 6th century BCE'},
      {label: 'Evidence', value: 'Lost prose work · later reports and possible echoes'},
      {label: 'Attributed principle', value: 'Air'},
      {label: 'Reported mechanism', value: 'Rarefaction and condensation'},
      {label: 'Interpretive limit', value: 'Not a recoverable modern quantitative theory'},
    ], articleActionLabel: 'Read the full sourced Anaximenes article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 3},
    objectInterpretations: objectInterpretation('anaximenes-bnf-portrait', 'This conventional print supplies no evidence for Anaximenes’ appearance. Its date is uncertain but it is far later than sixth-century Miletus, so it belongs to the philosopher’s visual reception rather than to his biography.'),
  },
  pythagoras: {
    lead: 'Pythagoras was an early Greek religious and philosophical teacher associated with a community at Croton in southern Italy. He wrote nothing that survives, and later Pythagorean mathematics and cosmology cannot automatically be assigned to the historical man.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Pythagoras probably came from Samos and established a community at Croton in the late sixth century BCE. Early evidence associates him with an unusual way of life, authority over followers, and beliefs about the soul’s passage through multiple lives. Later biographies add travels, miracles, ritual rules, political episodes, and a vast body of wisdom. Because those accounts were written long after his death and often served later Pythagorean communities, the historical teacher must be separated from the ideal sage they constructed.',
      'Number, harmony, and mathematical order became central to Pythagorean traditions, but the evidence does not justify giving the historical Pythagoras every later result. No surviving text shows him proving the theorem that bears his name, teaching that all things literally are numbers, or designing the cosmology associated with Philolaus. Early musical-ratio stories are also layered. A safer conclusion is that later Pythagoreans joined mathematics, cosmology, ritual discipline, and the care of the soul in changing ways, while the exact contribution of their founding figure remains difficult to isolate.',
      'Pythagoras matters because his name came to unite philosophy with communal practice and personal transformation. Pythagorean groups shaped debates about soul, number, harmony, political association, and the ordered cosmos, and later Platonists repeatedly reinterpreted that inheritance. Conflict around communities in southern Italy also belongs to this history, although its causes are difficult to recover. “Pythagoreanism” was never one timeless doctrine. The exhibit therefore introduces the historical teacher before the tradition built around him and treats famous claims as later school doctrine unless the evidence supports a narrower attribution.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Samos and Croton · late 6th century BCE'},
      {label: 'Evidence', value: 'No surviving writings · layered later biographies'},
      {label: 'Early associations', value: 'Community · way of life · transmigration of soul'},
      {label: 'Keep distinct', value: 'Historical Pythagoras · later Pythagorean doctrines'},
      {label: 'Why he matters', value: 'Philosophy joined to discipline, community, and cosmic order'},
    ], articleActionLabel: 'Read the full sourced Pythagoras article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 3},
    objectInterpretations: objectInterpretation('pythagoras-ratios-raphael', 'Raphael painted this imagined Pythagoras with a tablet of ratios around 1510. The scene visualizes Renaissance reception of Pythagorean mathematics; it is neither a likeness nor evidence that the historical Pythagoras taught the displayed numerical scheme.'),
  },
  philolaus: {
    lead: 'Philolaus was a fifth-century Pythagorean philosopher whose surviving fragments connect knowledge and cosmic order with limiters, unlimiteds, harmony, and number. Unlike Pythagoras, he is represented by substantial early material, although the authenticity and interpretation of particular fragments remain disputed.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Philolaus was active in the fifth century BCE and is associated with Croton, Thebes, and the Pythagorean tradition, but his exact chronology and biography are uncertain. Several fragments attributed to a book under his name are widely accepted as genuine, while others remain disputed. Plato’s Phaedo names Philolaus in connection with a prohibition on suicide, yet the dialogue does not make him the author of everything Socrates subsequently says about the soul.',
      'The best-attested fragments describe a cosmos composed from unlimited things and limiting things joined through harmony. Number makes their relations knowable: it gives order to plurality, proportion, and difference. This need not mean that physical objects simply are abstract numbers. Musical ratios provide an especially clear case in which a continuum becomes intelligible through measured divisions, but the fragments do not show how Philolaus applied the scheme to every domain. The surviving architecture explains ordered combination while leaving its full range uncertain. His account is powerful and incomplete rather than a universal formula preserved intact.',
      'Later testimony connects Philolaus with a central fire, a counter-earth, the motion of the earth, and differentiated bodily centers. These reports are important but do not have the same status as quoted fragments, and the central-fire system should not be called heliocentric. His ideas overlap with Aristotle’s account of “the Pythagoreans” and with Plato’s uses of limit, unlimited, and harmonic proportion, yet influence does not establish plagiarism or identity. Philolaus matters as a distinctive author who made a Pythagorean style of explanation philosophically legible, not merely as a mouthpiece for Pythagoras.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: '5th century BCE · Pythagorean contexts'},
      {label: 'Evidence', value: 'Accepted and disputed fragments · later testimony'},
      {label: 'Core structure', value: 'Limiters · unlimiteds · harmony'},
      {label: 'Knowledge', value: 'Number makes relations and order intelligible'},
      {label: 'Keep distinct', value: 'Philolaus · Pythagoras · Aristotle’s Pythagoreans'},
    ], articleActionLabel: 'Read the full sourced Philolaus article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 3},
    objectInterpretations: objectInterpretation('philolaus-musical-pipes', 'This 1492 woodcut imagines Pythagoras and Philolaus testing musical pipes. It is not an ancient scene or likeness. It visualizes a later tradition linking Pythagorean thought with musical ratio, a useful example whose historical details remain reconstructed.'),
  },
  parmenides: {
    lead: 'Parmenides was an early fifth-century philosopher-poet from Elea whose fragmentary poem asks what coherent inquiry can think and say about what-is. Its arguments transformed Greek accounts of being and change, but their subject, scope, and relation to the poem’s cosmology remain contested.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Parmenides composed a hexameter poem that combines a divine journey, rigorous argument, and a detailed account of the cosmos. About 160 lines survive, many because the late antique commentator Simplicius quoted them while discussing Aristotle. The title On Nature is conventional rather than securely authorial, and the poem’s original order is reconstructed. Even the familiar birth date near 515 BCE depends heavily on Plato’s fictional meeting between an elderly Parmenides and a young Socrates.',
      'The goddess in the poem distinguishes routes of inquiry and argues that sheer not-being cannot be known or indicated as though it were something. The route concerned with what-is then develops signs such as being ungenerated, imperishable, whole, and stable. These claims place severe pressure on ordinary accounts of coming-to-be, destruction, division, and change. They do not survive as the simple maxim “nothing changes,” nor do they say that imagining something makes it exist. Translation matters because Greek often leaves the subject of “is” unstated.',
      'Scholars disagree about whether the argument yields one being, stable predicational natures, necessary being, or another account. They also debate how the way of conviction relates to the goddess’s cosmology of mortal opinion: deception, a conditionally adequate account, and genuine cosmological knowledge are among the possibilities. The poem’s religious form and its demand for rational judgment belong together rather than canceling one another. Parmenides matters because later pluralists, atomists, Plato, and Aristotle had to explain how intelligible difference and change remain possible under this challenge. The exhibit preserves the poem’s force without pretending that one modern reconstruction has become its settled doctrine.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Elea · early 5th century BCE · chronology debated'},
      {label: 'Evidence', value: 'Fragmentary hexameter poem · late transmission'},
      {label: 'Central pressure', value: 'Inquiry cannot treat sheer not-being as an object'},
      {label: 'Major dispute', value: 'Monist · predicational · modal · other readings'},
      {label: 'Keep in view', value: 'Argument and mortal cosmology both belong to the poem'},
    ], articleActionLabel: 'Read the full sourced Parmenides article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 3},
    objectInterpretations: objectInterpretation('parmenides-raphael-traditional', 'This figure in Raphael’s School of Athens is only traditionally identified as Parmenides, and that identification is disputed. Painted around 1510, it is an imagined Renaissance reception image rather than an authenticated likeness of the philosopher.'),
  },
  'zeno-elea': {
    lead: 'Zeno of Elea was a fifth-century thinker associated with Parmenides who used paradoxical arguments to test assumptions about plurality, magnitude, motion, place, and time. His book is lost, and the familiar paradoxes survive through different later authors and reconstructions.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Zeno’s life and work are known chiefly through Plato, Aristotle, Simplicius, and later biographical tradition. Plato presents him as Parmenides’ close associate and describes a book of arguments against plurality; Aristotle preserves four arguments about motion along with puzzles about place and sound. Simplicius, writing roughly a millennium later, quotes lines he identifies as Zeno’s. These layers form an assembled dossier, not the recoverable sequence of one surviving book.',
      'The arguments typically accept familiar assumptions and draw consequences their defenders should reject. Accounts of plurality can make things both limited and unlimited, while accounts of magnitude can make components vanish in size or grow without bound. The Dichotomy, Achilles, Arrow, and Moving Rows pressure different assumptions about completing infinitely divisible intervals, motion at an instant, and relative movement. Zeno need not believe every absurd conclusion: the force lies in showing that an opponent’s starting points carry hidden debts.',
      'Modern mathematics can model convergent infinite series, dense orders, and instantaneous velocity, answering important reconstructed versions of the motion arguments. It does not recover Zeno’s exact wording or settle every question about physical parts, space, time, and motion. Different paradoxes require different reconstructions rather than one universal appeal to calculus. Aristotle’s replies are part of his own theory of continuity, not a neutral copy of Zeno. Scholars also dispute whether the arguments form one defense of Parmenides and which pluralist or quantitative theories they target. Zeno matters because his method forces explanations to state their assumptions precisely; the uncertainty belongs to the historical arguments, not to their continuing power.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Elea · mid-5th century BCE · chronology approximate'},
      {label: 'Evidence', value: 'Lost book · fragments and reports in later authors'},
      {label: 'Method', value: 'Dialectical challenge · reductio-like argument'},
      {label: 'Problem fields', value: 'Plurality · magnitude · motion · place · time'},
      {label: 'Interpretive limit', value: 'Modern solutions do not recover every ancient target'},
    ], articleActionLabel: 'Read the full sourced Zeno of Elea article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 3},
    objectInterpretations: objectInterpretation('zeno-elea-rijksmuseum-print', 'Bernard Picart made this imagined portrait in 1699, more than two millennia after Zeno. It records the philosopher’s later visual reception and supplies no evidence for his appearance, book, or fifth-century setting.'),
  },
  leucippus: {
    lead: 'Leucippus is the earliest named Greek atomist in the main ancient tradition, credited with explaining change through indivisible bodies moving in void. His biography, writings, and even the boundary between his thought and Democritus’ are exceptionally uncertain.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Ancient sources disagree about Leucippus’ origin, dates, teachers, and works, and one later report was read as denying that he existed. Aristotle and Theophrastus nevertheless treat him as a real predecessor of Democritus, which is the strongest basis for retaining him in the history of atomism. No book survives. A lone saying and reports about works such as the Great World System cannot be assembled into a securely recoverable Leucippan corpus.',
      'Aristotle presents early atomism as a response to Eleatic pressure on generation, plurality, and motion. Full, indivisible bodies move in void; compounds arise and dissolve as those bodies combine and separate, while the basic constituents neither come from nothing nor perish into nothing. Their shapes, arrangements, and positions help explain perceptible differences. Void makes separation and movement possible. These ideas belong to the shared early atomist dossier, but the surviving sources rarely allow a confident division of labor between Leucippus and Democritus.',
      'Reports also connect the early atomists with necessity and with worlds formed through vortical motion. The lone saying attributed to Leucippus links events with necessity or reason, but its wording cannot carry a complete determinist system. Their ancient atoms are not modern chemical atoms, and their method did not rest on modern experimental evidence. Attribution remains the exhibit’s central limit. Leucippus matters as the earliest named point in a tradition that offered a bold account of change without fundamental generation. The exhibit gives him that historical role while refusing to turn later summaries or Democritus’ better-attested breadth into a complete personal system.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: '5th century BCE · place and chronology uncertain'},
      {label: 'Evidence', value: 'Aristotle and Theophrastus · later reports · no surviving book'},
      {label: 'Attributed framework', value: 'Indivisible bodies · void · rearrangement'},
      {label: 'Central dispute', value: 'What belongs to Leucippus rather than Democritus'},
      {label: 'Interpretive limit', value: 'Ancient atoms are not modern chemical atoms'},
    ], articleActionLabel: 'Read the full sourced Leucippus article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 3},
    objectInterpretations: objectInterpretation('leucippus-giordano', 'Luca Giordano painted this philosopher around 1652–1653 as part of a much later series. The book and globe help imagine a learned ancient, but the portrait is not evidence for Leucippus’ appearance or writings.'),
  },
  democritus: {
    lead: 'Democritus of Abdera was a major early Greek atomist whose reported work ranged from nature and perception to mathematics, language, culture, and ethics. His large corpus is lost, and reconstruction depends on fragments, critics, excerptors, and doctrines often shared with Leucippus.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Democritus probably lived during the fifth and early fourth centuries BCE, but exact dates, travels, and the stories attached to his long life are uncertain. Ancient catalogues credit him with an exceptionally broad body of writing, none of which survives intact. Aristotle and Theophrastus preserve much of the physics; Sextus and later commentators transmit material on perception and knowledge; ethical maxims come largely through much later collections. These witnesses select and reshape what they preserve.',
      'The atomist system explains compounds through solid, ungenerated, indivisible bodies moving in void. Atoms differ in shape, size, arrangement, and position; visible generation and destruction are combinations and separations rather than the creation or annihilation of basic being. Reports about perception describe qualities such as color and taste as effects of atomic structures interacting with perceivers. But the physics is often attributed jointly to Leucippus and Democritus, and ancient atoms should not be equated with the divisible, experimentally studied atoms of modern chemistry.',
      'Democritus was also associated with reflection on the limits of the senses and with an ethics of measure, self-command, justice, and euthymiē—good spirits or steadiness. The authenticity of individual maxims and the relation between ethics and physics remain disputed. Later art turned him into the “laughing philosopher,” but stable judgment is not constant amusement. The ethical collections must be assessed saying by saying, not accepted as one intact work. Democritus matters because atomist explanation reaches beyond matter toward questions about knowledge, value, and life, while the surviving archive prevents those domains from becoming one seamless modern system.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Abdera · 5th to early 4th century BCE · dates approximate'},
      {label: 'Evidence', value: 'Lost corpus · fragments · critics · late excerpt collections'},
      {label: 'Physical framework', value: 'Atoms and void · compounds through rearrangement'},
      {label: 'Wider inquiries', value: 'Perception · knowledge · culture · ethics'},
      {label: 'Keep distinct', value: 'Shared early atomism · Democritus-specific testimony · later science'},
    ], articleActionLabel: 'Read the full sourced Democritus article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 3},
    objectInterpretations: objectInterpretation('democritus-velazquez', 'Velázquez’s painting of about 1630 belongs to the later “laughing philosopher” tradition. Its smile and globe interpret Democritus for a Baroque audience; they are not an ancient likeness or direct evidence for his ethics.'),
  },
  protagoras: {
    lead: 'Protagoras of Abdera was a prominent fifth-century teacher who examined judgment, language, education, and civic life. A few famous formulations survive through later authors, while Plato’s influential reconstructions must be kept distinct from Protagoras’ lost prose.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Protagoras came from Abdera and became celebrated for paid higher education, especially in Athens. His dates are approximate, and stories about exile, book burning, shipwreck, and death appear in late and conflicting sources. Almost none of his writing survives continuously. Short formulations, titles, and reports reach us through Plato, Aristotle, Sextus Empiricus, Diogenes Laertius, and others whose own philosophical purposes shape the evidence.',
      'The best-attested sentence makes a human being the measure of things that are and are not. It has been read in individual, civic, and broadly human terms. Plato’s Theaetetus develops an individual-relative account through differing perceptions, flux, and the truth of appearances, then constructs a defense in which experts improve judgments from worse to better. This is indispensable evidence for ancient interpretation, not a transcript of a lost Protagorean argument. The standard of “better” therefore remains a live interpretive problem. The bare measure sentence does not by itself establish that every belief is equally good or that “anything goes.”',
      'Plato’s Protagoras also presents a Great Speech about civic virtue and education, while later reports associate Protagoras with agnosticism about the gods, opposed arguments, correctness of language, and kinds of utterance. Each attribution requires its own caution; even the Great Speech is Plato’s dramatic presentation, not recovered Protagorean prose. Reports about making the weaker argument stronger are especially vulnerable to hostile framing. Protagoras matters because he makes situated judgment answerable to questions about improvement, expertise, and shared political life. His exhibit preserves that problem without turning one sentence or one Platonic dialogue into a complete doctrine.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Abdera and Athens · 5th century BCE · dates approximate'},
      {label: 'Evidence', value: 'Short formulations · later testimony · Platonic reconstructions'},
      {label: 'Famous problem', value: 'The human being as measure'},
      {label: 'Teaching context', value: 'Judgment · civic education · language · argument'},
      {label: 'Keep distinct', value: 'Protagorean wording · Plato’s developed theories'},
    ], articleActionLabel: 'Read the full sourced Protagoras article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 3},
    objectInterpretations: objectInterpretation('protagoras-ribera', 'Jusepe de Ribera painted this imagined Protagoras in 1637, roughly two millennia after the philosopher. The open book suits a learned portrait tradition but does not document Protagoras’ appearance or preserve one of his lost works.'),
  },
  prodicus: {
    lead: 'Prodicus of Ceos was a prominent fifth-century teacher remembered for fine distinctions between words and for an ethical performance about Heracles choosing a way of life. His works are lost, and both themes survive through other authors’ presentations.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Prodicus came from the island polis of Ceos and is represented as visiting Athens for public business as well as teaching there. Exact life dates are not documented; a late-fifth-century floruit is safer. Plato repeatedly stages him making careful verbal distinctions, often with comic exaggeration. Those scenes strongly attest a recognizable reputation, but they are philosophical drama rather than notes from a Prodican lesson. Reputation is firmer here than recoverable doctrine.',
      'In Xenophon’s Memorabilia, Socrates retells a performance attributed to Prodicus in which the young Heracles chooses between personified paths of Virtue and Vice. Xenophon explicitly presents an outline and says Prodicus expressed it more splendidly. The passage therefore preserves substantial evidence for a Prodican ethical performance while not preserving his exact words. Scholars disagree about how close Xenophon’s language stands to the original, and the later title Choice of Heracles is not a securely transmitted book title.',
      'Later sources also connect Prodicus with theories about the origins of divine names and with natural inquiry, but the testimony is too mediated to call him simply an atheist or the founder of a modern theory of religion. Nor was his attention to synonyms a complete science of semantics. Claims that he formally trained Socrates or founded later linguistic traditions also outrun the record. Prodicus matters because he made the practical force of verbal distinctions conspicuous: arguments about courage, pleasure, benefit, and responsibility can change when speakers clarify what their words evaluate. Precision serves inquiry here, but it cannot replace evidence or reasons.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Ceos and Athens · late 5th century BCE'},
      {label: 'Evidence', value: 'Plato · Xenophon · scattered later testimony'},
      {label: 'Known for', value: 'Verbal distinctions · education · ethical performance'},
      {label: 'Major witness', value: 'Xenophon’s adaptation of Heracles’ choice'},
      {label: 'Interpretive limit', value: 'Not a preserved semantics or theology system'},
    ], articleActionLabel: 'Read the full sourced Prodicus of Ceos article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 3},
    objectInterpretations: objectInterpretation('prodicus-choice-of-hercules', 'Thomas Sully’s 1819 painting visualizes the Choice of Heracles centuries after Xenophon adapted a performance attributed to Prodicus. It is later reception, not an ancient scene, a portrait of Prodicus, or a record of his exact wording.'),
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — The Sophists', url: 'https://plato.stanford.edu/archives/spr2025/entries/sophists/', kind: 'academic-reference'},
      {label: 'Xenophon, Memorabilia 2.1 — the Heracles adaptation', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Xen.+Mem.+2.1&fromdoc=Perseus%3Atext%3A1999.01.0208', kind: 'primary-text'},
      {label: 'Plato, Protagoras — dramatic evidence for Prodicus', url: 'https://atlas.perseus.tufts.edu/library/urn:cts:greekLit:tlg0059.tlg022/', kind: 'primary-text'},
    ],
  },
  gorgias: {
    lead: 'Gorgias of Leontini was a fifth-century Sicilian speaker and teacher whose surviving display speeches explore persuasion, responsibility, and the power of language. A separate work on not-being survives only in two later summaries, and Plato’s dramatic Gorgias is another distinct witness.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Gorgias came from Leontini in Sicily and is reported to have led an embassy to Athens in 427 BCE. He became famous for public performances and teaching, but claims that he invented rhetoric or trained a fixed list of students exceed the evidence. Two substantial speeches survive under his name, the Encomium of Helen and Defense of Palamedes, along with a funeral-speech fragment and shorter sayings. Their exact dates and occasions remain uncertain.',
      'Helen defends its notorious subject by testing several possible causes of her action. Its account of logos compares speech’s effects on the soul to drugs acting on the body: persuasion can shape belief and feeling where direct knowledge is unavailable. Palamedes stages a defense against an impossible accusation and exposes the fragility of inference from probability. These works demonstrate technique while also analyzing agency, evidence, and the ethical ambiguity of persuasive power. They should not be reduced to advertisements for manipulation.',
      'The work conventionally called On Not-Being reaches us through differing summaries in Sextus Empiricus and the anonymous MXG. Its arguments about being, knowledge, and communication may be serious philosophy, parody, demonstration, or some combination; they do not securely yield the slogan that nothing exists. The two epitomes should not be silently merged into one text. Plato’s Gorgias supplies an indispensable critique of rhetoric without knowledge of justice, but its character is Plato’s construction, not Gorgias’ surviving voice. Gorgias matters because he makes language an event with consequences while leaving truth, communication, and responsibility in productive tension.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {label: 'Historical setting', value: 'Leontini and Athens · 5th century BCE'},
      {label: 'Surviving works', value: 'Helen · Palamedes · funeral-speech fragment'},
      {label: 'Indirect work', value: 'On Not-Being through two later epitomes'},
      {label: 'Central problem', value: 'Speech, belief, evidence, persuasion, responsibility'},
      {label: 'Keep distinct', value: 'Gorgias’ texts · epitomes · Plato’s dramatic character'},
    ], articleActionLabel: 'Read the full sourced Gorgias article', bodyLayout: 'prose', plaqueKicker: '', plaqueSubtitleLines: 3},
    objectInterpretations: objectInterpretation('gorgias-ortolani', 'This imagined profile was published in an 1818 collection of notable Sicilians. It records later commemoration of Gorgias’ regional identity, not his historical appearance, an ancient portrait type, or evidence for his teaching.'),
  },
  nagarjuna: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Nāgārjuna is among the most influential Buddhist philosophers, yet little about his life can be established securely. Modern scholarship commonly places him around 150–250 CE and often associates him with southern India, while traditional biographies add journeys, royal ties, supernatural episodes, and long life spans. He worked within a varied Indian Buddhist environment shaped by early discourses, Abhidharma analysis, developing Mahāyāna literature, monastic institutions, and debate with Buddhist and non-Buddhist interlocutors. Those contexts must remain plural rather than becoming one position that Madhyamaka simply defeated.',
      'The Mūlamadhyamakakārikā examines conditions, motion, causation, self, time, nirvāṇa, views, and other categories to test whether anything possesses independent, invariant own-nature. If phenomena arise through causes, relations, designation, and practices, they are empty of that self-establishing essence. Emptiness therefore does not mean sheer nonexistence, and it cannot become an ultimate substance immune to its own analysis. Conventional truth still makes communication, inquiry, ethical action, and liberation possible. The difficult question is how conventions remain constrained without the intrinsic foundations Madhyamaka rejects; later interpreters answer it differently.',
      'The compact verses made commentary indispensable, and readers now meet them through Sanskrit witnesses, Tibetan and Chinese translations, Indian commentaries, and modern editions. The Mūlamadhyamakakārikā is the secure center of Nāgārjuna’s corpus; other attributed works carry different degrees of confidence. Buddhapālita, Bhāviveka, Candrakīrti, Tibetan scholastic traditions, Sanlun, and modern reconstructions developed distinct inheritances rather than one transparent system. The displayed Tibetan thangka belongs to that later reception and legendary biography. Its nāga imagery visualizes remembered transmission, not a lifetime likeness, an autograph, or proof that every later Madhyamaka classification was Nāgārjuna’s own.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Key ideas', items: [
        {label: 'Dependent arising', description: 'Things exist through causes, conditions, relationships, and the ways people identify them—not through a self-sufficient core.'},
        {label: 'Emptiness', description: 'To be empty is to lack that fixed core. It does not mean that nothing exists or that actions have no consequences.'},
      ]},
      {heading: 'Major work', items: [
        {label: 'Root Verses on the Middle Way', description: 'The Mūlamadhyamakakārikā uses compact arguments to test claims about causation, motion, self, time, truth, and liberation.'},
        {label: 'Other attributed texts', description: 'Several works circulate under Nāgārjuna’s name, but scholars do not assign all of them the same confidence.'},
      ]},
      {heading: 'Influence', items: [
        {label: 'Commentarial traditions', description: 'Indian commentators disagreed about how his arguments work; Tibetan schools developed those disagreements into distinct approaches.'},
        {label: 'East Asian readings', description: 'The Chinese Sanlun, or Three Treatise, tradition built a major interpretation around Nāgārjuna and related texts.'},
      ]},
      {heading: 'Continuing debate', items: [
        {label: 'Truth without fixed essences', description: 'Readers still debate how everyday claims can be reliable when nothing possesses an independent, unchanging nature.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Nāgārjuna article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-09',
      method: 'Reconciled against the current claim-reviewed article and registered exhibit sources; subject-specific visitor guide and retained object-led presentation reviewed against the corrected canonical standard.',
      lock: 'fnv1a64:319a16aef600fa0c',
    },
  },
  'sextus-empiricus': {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Sextus Empiricus is a surviving author of Pyrrhonian skepticism, but little about his life is secure. He probably wrote in the late second or early third century CE and was associated with medicine, although his medical affiliation remains disputed. His works describe a practice of opposing appearances and arguments, finding comparable persuasive force, and suspending judgment where inquiry does not justify assent. The skeptic continues investigating and follows ordinary life without converting present appearances into doctrines about reality or claiming that truth is impossible.',
      'The Outlines of Pyrrhonism distinguishes dogmatists, Academic skeptics as Sextus presents them, and Pyrrhonists who continue searching. It explains modes of argument, suspension, and tranquility before testing claims about criteria, signs, proof, causation, nature, theology, and ethics. Against the Mathematicians extends that practice to disciplines of learning, examining whether their theoretical defenders possess secure principles or objects. Sextus often borrows incompatible premises for dialectical use, so readers should not reconstruct every argument as part of his own settled theory. His reports are also interested witnesses to earlier positions now otherwise lost.',
      'A familiar objection asks whether skeptical argument refutes itself. Sustained writing appears to rely on stable meanings, inference, memory, and standards even while challenging theoretical certainty. Sextus answers by treating skeptical expressions as reports of how things presently appear and compares them to remedies that remove themselves with what they treat. The response remains contested, which is part of the exhibit’s point. The displayed 1801 engraving supplies an imagined face for a textual authority whose appearance is unknown. It records later reception, not an authenticated ancient portrait or independent evidence for Sextus’s biography.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Key ideas', items: [
        {label: 'Opposing arguments', description: 'Sextus places competing cases side by side to test whether either deserves assent.'},
        {label: 'Suspending judgment', description: 'When rival cases have comparable force, the skeptic says “not yet” rather than declaring either one true or false.'},
      ]},
      {heading: 'Major works', items: [
        {label: 'Outlines of Pyrrhonism', description: 'A practical introduction to skeptical inquiry, its recurring arguments, and its challenges to logic, nature, and ethics.'},
        {label: 'Against the Mathematicians', description: 'A longer set of critiques aimed at teachers who claim secure foundations for specialized disciplines.'},
      ]},
      {heading: 'Central questions', items: [
        {label: 'Inquiry without dogma', description: 'Can someone keep investigating and follow ordinary life without turning present appearances into a theory of reality?'},
        {label: 'The self-refutation problem', description: 'Can skeptical writing use language, memory, and inference consistently while questioning the standards behind them?'},
      ]},
      {heading: 'Influence', items: [
        {label: 'A record of lost debates', description: 'Sextus preserves arguments from earlier philosophers whose own writings no longer survive.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Sextus Empiricus article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-09',
      method: 'Reconciled against the current claim-reviewed article and registered exhibit sources; subject-specific visitor guide and retained object-led presentation reviewed against the locked canonical standard.',
      lock: 'fnv1a64:9565a6311d2d9b68',
    },
  },
  kantianism: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [
      {
        heading: '',
        paragraphs: [
          'Kantianism is the broad family of philosophies that begins from Immanuel Kant’s critical project. Kant argued that philosophy should examine what human reason can legitimately know, how experience becomes intelligible, and why reason must acknowledge limits when it moves beyond possible experience. He also treated persons as capable of moral self-government and asked how freedom, obligation, judgment, and public reasoning can be justified. Kantianism therefore names neither simple loyalty to Kant nor one fixed doctrine. It names continuing work on the questions and methods his philosophy made unavoidable.',
          'Its central concerns connect knowledge and freedom. Kantian thinkers investigate how the mind contributes to experience without merely inventing the world, how objective judgment is possible, and how moral requirements can bind agents who are nevertheless free. They also ask how aesthetic and political judgment can claim shared validity without becoming mechanical rules. This critical method changed later debates because it made the authority of reason itself a subject of inquiry: reason must establish its powers while also testing the boundaries and social conditions of their use.',
          'The tradition divided from its beginning. Reinhold, Maimon, Fichte, Schelling, and Hegel offered competing responses to perceived gaps in Kant’s system. Later neo-Kantians reconstructed critique around science, culture, and value, while phenomenology, analytic philosophy, critical theory, ethics, and democratic thought carried selected Kantian problems into new settings. Disputes continue over transcendental idealism, the relation between concepts and experience, whether autonomy depends on social institutions, and whether universal reason can confront racial, colonial, gendered, and ableist exclusions without repeating them.',
        ],
      },
    ],
    presentation: {
      mode: 'concise',
      orientation: [
        {heading: 'Key ideas', items: [
          {label: 'Critique', description: 'Kant’s method asks what human reason can justify and where its claims must stop.'},
          {label: 'Autonomy', description: 'Moral freedom means acting from principles a person can rationally accept, not merely from impulse or command.'},
        ]},
        {heading: 'Development', items: [
          {label: 'Reinhold', description: 'Karl Leonhard Reinhold made Kant’s difficult project accessible to new readers and argued that it needed a firmer starting point.'},
          {label: 'German Idealism', description: 'Fichte, Schelling, and Hegel built rival systems from problems they believed Kant had left unresolved.'},
          {label: 'Later revivals', description: 'Neo-Kantians renewed critique through science and culture; phenomenology studied experience, analytic philosophy tested concepts, and critical theory examined reason in society.'},
        ]},
        {heading: 'Continuing debates', items: [
          {label: 'Experience and objectivity', description: 'Can the mind help organize experience without making the world a human invention?'},
          {label: 'Reason and exclusion', description: 'Can universal claims confront the racial, colonial, gendered, and ableist exclusions within Kant’s legacy?'},
        ]},
      ],
      articleActionLabel: 'Read the full sourced Kantianism article',
      bodyLayout: 'prose',
      exhibitLayout: 'object-led',
      plaqueKicker: '',
      plaqueSubtitleLines: 3,
    },
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-09',
      method: 'Reconciled against the current claim-reviewed article and registered exhibit sources; subject-specific visitor guide and retained object-led presentation reviewed against the corrected canonical standard.',
      lock: 'fnv1a64:1be965190a9d96a3',
    },
    objectInterpretations: objectInterpretation(
      'german-idealism-reinhold-rijksmuseum-1795',
      'The 1795 engraving makes an early mediator visible at the point where reading Kant became a program of reconstruction. It does not portray the founder or sole voice of Kantianism, and a formal likeness cannot show the disagreements that soon divided the inheritance.',
    ),
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Immanuel Kant', url: 'https://plato.stanford.edu/archives/spr2024/entries/kant/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Karl Leonhard Reinhold', url: 'https://plato.stanford.edu/archives/sum2026/entries/karl-reinhold/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Neo-Kantianism', url: 'https://plato.stanford.edu/archives/sum2021/entries/neo-kantianism/', kind: 'academic-reference'},
    ],
  },
  marxism: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [
      {
        heading: '',
        paragraphs: [
          'Marxism is a family of theories and political traditions developed from Karl Marx’s critique of capitalism, much of it produced in sustained collaboration with Friedrich Engels. It examines how labor becomes organized through commodity production, wage relations, private control of productive resources, and class power. Marxists ask how these social relations shape institutions, ideas, and everyday life, why capitalism repeatedly changes and generates conflict, and whether people acting together can create less exploitative forms of social organization.',
          'Marxism is historically significant because it joins interpretation to practice. Its account of society is not only an explanation of economic structures; it is also an inquiry into how those structures might be transformed. That connection made Marxism influential in labor movements, socialist parties, anticolonial struggles, revolutions, scholarship, and debates about planning and democracy. It also generated persistent questions about who can act collectively, how class relates to race, gender, empire, and nation, and whether reform can overcome domination or merely reorganize it. Organization is therefore part of the philosophical problem, not merely an afterthought.',
          'No single doctrine or political history exhausts the tradition. Later thinkers selected, systematized, rejected, and extended different parts of Marx’s changing and partly unfinished work. Anticolonial Marxists revised European accounts of historical development; Black Marxism challenged theories that subordinated racial domination; feminist and social-reproduction approaches exposed unpaid care and gendered labor. Democratic, analytical, ecological, and critical reconstructions reopened questions about evidence, pluralism, planning, and freedom. Revolutionary governments also made Marxism inseparable from disputes over one-party rule, censorship, imprisonment, mass repression, and catastrophic policy.',
        ],
      },
    ],
    presentation: {
      mode: 'concise',
      orientation: [
        {heading: 'Key ideas', items: [
          {label: 'Capitalism', description: 'An economic order in which productive resources are largely privately controlled and most people must sell their labor for wages.'},
          {label: 'Class and exploitation', description: 'Marxists study how ownership and work divide social power, and how profit can depend on workers producing more value than they receive.'},
        ]},
        {heading: 'Development', items: [
          {label: 'From texts to movements', description: 'Marx’s collaborator Friedrich Engels helped edit and extend the work; unions, parties, councils, and states then interpreted it for competing political projects.'},
          {label: 'Global revisions', description: 'Anticolonial thinkers examined empire, Black Marxists centered racial domination, feminists analyzed unpaid care, and ecological Marxists studied capitalism’s environmental costs.'},
        ]},
        {heading: 'Continuing debates', items: [
          {label: 'Reform or revolution', description: 'Can democratic reforms overcome exploitation, or must ownership and political institutions be transformed more fundamentally?'},
          {label: 'Democracy and state power', description: 'How can collective planning avoid one-party rule, censorship, coercion, and the concentration of authority?'},
        ]},
      ],
      articleActionLabel: 'Read the full sourced Marxism article',
      bodyLayout: 'prose',
      exhibitLayout: 'object-led',
      plaqueKicker: '',
      plaqueSubtitleLines: 3,
    },
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-09',
      method: 'Reconciled against the current claim-reviewed article and registered exhibit sources; subject-specific visitor guide and retained object-led presentation reviewed against the corrected canonical standard.',
      lock: 'fnv1a64:022063bd9db84839',
    },
    objectInterpretations: objectInterpretation(
      'utility-marxism-zurich-congress-1893',
      'This gathering makes Marxism’s organizational life visible: theories became congresses, parties, alliances, and strategic disagreements. The photograph represents one European network after one congress, not the whole international tradition, a complete roster, or a single agreed program.',
    ),
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Socialism', url: 'https://plato.stanford.edu/archives/fall2025/entries/socialism/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Karl Marx', url: 'https://plato.stanford.edu/archives/sum2025/entries/marx/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Feminist Perspectives on Class and Work', url: 'https://plato.stanford.edu/archives/fall2024/entries/feminism-class/', kind: 'academic-reference'},
      {label: 'Library of Congress — Soviet Union: A Country Study', url: 'https://www.loc.gov/item/90025756/', kind: 'collection-record'},
    ],
  },
  'islamic-philosophy': {
    lead: 'Islamic Philosophy names multilingual, cross-confessional philosophical traditions formed through translation, falsafa, kalam, logic, medicine, natural philosophy, ethics, politics, illumination, commentary, and continuing debate across Islamic worlds. Its history is a changing argument across languages and institutions, not one doctrine, people, period, or route toward Europe.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'The title is practical rather than exhaustive. “Arabic philosophy” highlights a formative language and includes Muslim, Christian, Jewish, and other authors, while “Muslim philosophy” narrows the confessional field. “Islamic philosophy” can refer to philosophy by Muslims, philosophy shaped by Islamic questions, or philosophy in Islamicate societies. No label maps every language, institution, or participant without remainder. The exhibit therefore makes scope visible instead of turning one category into a timeless essence.',
      'Greek, Syriac, Persian, and Arabic materials were not merely preserved for later Europe. Translators, physicians, theologians, teachers, patrons, and philosophers created technical vocabularies and new arguments. Al-Kindi and Al-Farabi built programs; Avicenna transformed logic, psychology, nature, and metaphysics; critics and successors disputed demonstration, causation, prophecy, and interpretation. Jewish and Christian thinkers participated in Arabic networks while remaining members of distinct communities.',
      'The tradition did not end with Averroes. Ibn Tufayl tested philosophical education through narrative; Suhrawardi joined proof to knowledge by presence; post-Avicennian theologians and commentators reworked metaphysics; Mulla Sadra built a later synthesis. Persian, Ottoman, Maghrebi, and South Asian settings sustained logic, verification, commentary, and spiritual philosophy. Kalam, law, Sufism, medicine, science, and adab overlap locally without becoming one undifferentiated system.',
      'The wall’s people and objects therefore represent different kinds of participation. A translator’s vocabulary, a commentator’s objection, an astronomical instrument, a medical manuscript, and a metaphysical proof do not make the same claim. Seen together, they show philosophy as authored argument sustained by material practices and communities over many centuries rather than a procession of isolated geniuses.',
    ]}],
    presentation:{mode:'concise',orientation:[
      {label:'Chronological sweep',value:'8th century onward · no Averroes endpoint'},
      {label:'Languages',value:'Arabic · Persian · Syriac · Hebrew · Ottoman Turkish and others'},
      {label:'Communities',value:'Muslim · Christian · Jewish · cross-confessional scholarly networks'},
      {label:'Major methods',value:'Translation · demonstration · commentary · verification'},
      {label:'Live boundaries',value:'Falsafa · kalam · science · law · Sufism · adab'},
      {label:'Interpretive caution',value:'Not one doctrine · not merely Greece’s bridge to Europe'},
    ],articleActionLabel:'Read the full sourced Islamic Philosophy article',bodyLayout:'prose',plaqueKicker:'',plaqueSubtitleLines:4},
    objectInterpretations:objectInterpretation('islamic-scholarly-lecture-maqamat','This later manuscript scene makes collective scholarly labor visible—reading, teaching, discussion, books, and patronage. It does not portray a single historical philosophy lesson or represent every community, language, gender, region, or institution within Islamic philosophical worlds.'),
    sources:[{label:'The Cambridge Companion to Arabic Philosophy',url:'https://www.cambridge.org/core/books/cambridge-companion-to-arabic-philosophy/BB1B390ECB024E88FC807FF471EE80EB',kind:'academic-reference'},{label:'Classical Arabic Philosophy: An Anthology of Sources',url:'https://hackettpublishing.com/philosophy/asian-philosophy/classical-arabic-philosophy',kind:'primary-text'}],
  },
  'ibn-tufayl': {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Ibn Tufayl was an Andalusian physician, administrator, philosopher, and Almohad court intellectual whose surviving fame rests chiefly on Hayy ibn Yaqzan. The tale is a designed experiment, not a report of real child development or a transparent statement of everything its author believed. Hayy’s needs, imitation, experiments, and dissection of the gazelle who raised him turn grief and bodily observation into questions about life and cause. The story compresses an exceptional philosophical curriculum into one life, so its sequence should be read as deliberate narrative construction rather than evidence that an isolated person would naturally rediscover a complete system.',
      'Hayy moves from comparison and causal reasoning toward metaphysical demonstration, disciplined practice, and contemplation. These ways of knowing connect without becoming interchangeable: conceptual proof does not reproduce direct experience, and neither independently supplies every historical ritual or law. Meeting Absal gives Hayy language and access to revealed teaching; meeting Salaman’s community tests whether insight can be communicated responsibly. His mission fails, and he returns to solitude. The ending may expose his audience’s limits, but it also exposes a solitary teacher’s lack of shared institutions, history, and pedagogy. Ibn Tufayl therefore joins epistemology to a difficult political question: discovering truth is not the same achievement as teaching it in public.',
      'Reception must follow documented routes rather than tempting resemblance. Hayy circulated in Hebrew and received Moses Narboni’s commentary in 1349; a Latin translation appeared in 1671 and Simon Ockley’s English version in 1708. Availability does not by itself prove direct borrowing by Locke, Defoe, or later writers. The displayed page comes from A. S. Fulton’s 1929 revision of Ockley’s translation, held by the University of Toronto and digitized by Internet Archive. It is a material witness to one English-language afterlife, not an illustration of Hayy, a twelfth-century manuscript, or evidence of Ibn Tufayl’s appearance. Its library marks also preserve the modern custody of this particular copy rather than the tale’s original setting.',
    ]}],
    presentation:{mode:'concise',orientation:[
      {heading:'Ways of knowing',items:[
        {label:'Embodied inquiry',description:'Need, imitation, experiment, and the gazelle’s death move Hayy from practical experience toward questions about life and cause.'},
        {label:'Demonstration and contemplation',description:'Causal argument and disciplined direct experience disclose related truths without becoming one interchangeable method.'},
      ]},
      {heading:'Narrative and public problem',items:[
        {label:'Hayy, Absal, and Salaman',description:'The island learner, reflective religious practitioner, and public ruler are literary roles that test distinct forms of knowledge and community.'},
        {label:'Failed mission',description:'Hayy’s return to solitude tests both his audience’s preparation and his own ability to translate insight into shared teaching.'},
      ]},
      {heading:'Documented transmission',items:[
        {label:'Hebrew and Moses Narboni',description:'Hebrew circulation and Narboni’s 1349 commentary establish a specific medieval route of reception.'},
        {label:'Latin, English, and the 1929 reissue',description:'The 1671 Latin and 1708 English translations precede the displayed twentieth-century material witness; availability alone does not prove borrowing.'},
      ]},
    ],articleActionLabel:'Read the full sourced Ibn Tufayl article',bodyLayout:'prose',exhibitLayout:'object-led',plaqueKicker:'',plaqueSubtitleLines:4},
    objectInterpretations:objectInterpretation('ibn-tufayl-hayy-1929','This is the title page—not a frontispiece illustration—of A. S. Fulton’s 1929 revision of Simon Ockley’s English translation. Its imprint and library marks document one material route of reception and custody. They cannot depict Hayy’s island, recover Ibn Tufayl’s face, represent a twelfth-century Arabic manuscript, or prove later philosophical influence.'),
    sources:[{label:'Hayy ibn Yaqzan — complete Ockley translation',url:'https://www.gutenberg.org/cache/epub/16831/pg16831-images.html',kind:'primary-text'},{label:'Oxford Handbook — Ibn Tufayl’s Hayy ibn Yaqzan',url:'https://academic.oup.com/edited-volume/38657/chapter-abstract/335768370',kind:'academic-reference'},{label:'Internet Archive — University of Toronto copy of The History of Hayy Ibn Yaqzan (1929)',url:'https://archive.org/details/historyofhayyibn00ibnu',kind:'collection-record'}],
    review:{status:'standard-compliant',reviewedOn:'2026-08-10',method:'Reconciled against the current claim-reviewed article, registered interpretation sources, and the corrected 1929 principal-object record; caption, rights, alt text, full-composition preview, object-led presentation, and subject-specific visitor guide reviewed against the locked exhibit standard.',lock:'fnv1a64:bac4dc9724e19598'},
  },
  suhrawardi: {
    lead: 'Suhrawardi reworks post-Avicennian philosophy through technical logic, immediate self-awareness, knowledge by presence, and an ontology of lights. Demonstration remains necessary while trained vision tests what discursive representation can disclose. The authorial corpus and the later illuminationist school must remain historically distinct.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'The Philosophy of Illumination, completed in 1186, does not summarize the entire corpus. Suhrawardi also wrote works in more familiar Avicennian organization, Persian epitomes, prayers, and allegories; much of their chronology is uncertain. Logic is central rather than discarded. He examines signification, definitions, propositions, proof, and fallacy while asking whether an unknown essence can be reached through terms whose meanings already require knowledge.',
      'Knowledge by presence begins with a reality manifest without a mediating representation, as the self is present to itself. Light names manifestation, hierarchy, and dependence rather than merely physical brightness. His “world of images” gives nonmaterial form to dreams, visions, prophecy, and eschatology, but later commentators systematized this realm beyond what his own text supplies. Similarly, the later label “primacy of essence” simplifies a more difficult relation among existence, quiddity, light, and concrete reality.',
      'Suhrawardi became the eponymous architect of Illuminationism, not its complete history. Shahrazuri, Qutb al-Din al-Shirazi, Ibn Kammuna, Mulla Sadra, and readers across Persian, Ottoman, and South Asian settings selected and transformed his works. His ordered death in Aleppo occurred in late 1191 or possibly early 1192; charges, procedure, and manner remain disputed. The exhibit distinguishes this uncertain biography, the authorial corpus, and the later school.',
      'The two manuscript witnesses deepen that distinction. A copy produced within three decades of his death shows early annotation and argument; a richly illuminated 1477–78 copy shows continuing prestige and transformation. Neither object is an authorial manuscript, and decoration cannot by itself establish how any reader understood illumination, logic, or visionary knowledge.',
    ]}],
    presentation:{mode:'concise',orientation:[
      {label:'Historical setting',value:'Iran, Anatolia, and Aleppo · c. 1154–1191/92'},
      {label:'Landmark',value:'The Philosophy of Illumination completed in 1186'},
      {label:'Methods',value:'Logic · proof · trained vision · symbolic narrative'},
      {label:'Core problems',value:'Presence · self-awareness · light · world of images'},
      {label:'Later school',value:'Commentary and transformation, not one unchanged doctrine'},
      {label:'Interpretive cautions',value:'Not anti-logic · death and much corpus chronology uncertain'},
    ],articleActionLabel:'Read the full sourced Suhrawardi article',bodyLayout:'prose',plaqueKicker:'',plaqueSubtitleLines:4},
    objectInterpretations:objectInterpretation('suhrawardi-later-portrait','This later portrait belongs to Suhrawardi’s reception and cannot document his appearance or the circumstances of his death. Its visual radiance should not reduce “light” to decoration: light organizes a technical account of manifestation, cognition, and dependence.'),
    sources:[{label:'The Philosophy of Illumination — publisher record',url:'https://press.uchicago.edu/ucp/books/book/distributed/P/bo3641907.html',kind:'primary-text'},{label:'Stanford Encyclopedia of Philosophy — Suhrawardi',url:'https://plato.stanford.edu/entries/suhrawardi/',kind:'academic-reference'}],
  },
  levinas: {
    lead: 'Emmanuel Levinas redirects phenomenology toward an ethical demand that another person places upon me before I choose a rule. His “face” is not visual appearance, and responsibility is not ordinary blame for having caused an event.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Levinas’s path begins with early studies of escape, fatigue, insomnia, enjoyment, solitude, and the anonymous “there is.” These writings explain why his argument with Heidegger is more than a rejection of ontology: bodily need, birth, death, eros, and encounter disclose dimensions that the question of Being can subordinate. Ethics as “first philosophy” grows from this revision. It is not a moral rulebook or the claim that every ontological question is illegitimate.',
      'Totality and Infinity approaches transcendence through separation, dwelling, hospitality, discourse, infinity, and the face. Another person exceeds the roles and concepts through which I try to possess them. Otherwise than Being partly recasts the project through proximity, passivity, substitution, and the Saying/Said distinction. Substitution is not voluntary empathy. The Saying names exposure and address; the Said is the necessary thematization through which knowledge, law, and institutions operate, even as it risks concealing the encounter that makes them answerable.',
      'Responsibility cannot remain a sealed encounter between two people. The arrival of a third party requires comparison, judgment, equality, institutions, and justice. That move does not automatically solve every political question, and critics dispute asymmetry, gendered descriptions, and the reach of Levinas’s institutional analysis. His philosophical and Jewish writings also intersect without one simply decoding the other. The exhibit keeps those tensions visible while showing why alterity, hospitality, and justice became major later problems.',
      'The portrait is deliberately not used as an illustration of the face. A photograph can identify the historical thinker and situate a late moment in his life; it cannot display the ethical address Levinas describes or make visible another person’s irreducibility.',
    ]}],
    presentation:{mode:'concise',orientation:[
      {label:'Historical setting',value:'Lithuania and France · 1906–1995 · Holocaust and postwar thought'},
      {label:'Early trajectory',value:'Existence · escape · hypostasis · critique of Heidegger'},
      {label:'Totality and Infinity',value:'Separation · hospitality · discourse · face'},
      {label:'Otherwise than Being',value:'Proximity · substitution · Saying and Said'},
      {label:'Justice',value:'The third party · comparison · law · institutions'},
      {label:'Interpretive cautions',value:'Face is not physiognomy · responsibility is not causal blame'},
    ],articleActionLabel:'Read the full sourced Levinas article',bodyLayout:'prose',plaqueKicker:'',plaqueSubtitleLines:4},
    objectInterpretations:objectInterpretation('levinas-ettinger-portrait-1991','Bracha L. Ettinger’s 1991 photograph records Levinas late in life, but it cannot illustrate his philosophical “face.” The face names another person’s ethical exposure and address, not a sitter’s visible features, expression, identity, or character as captured by a portrait.'),
    sources:[
      {label:'Stanford Encyclopedia of Philosophy — Emmanuel Levinas',url:'https://plato.stanford.edu/entries/levinas/',kind:'academic-reference'},
      {label:'Totality and Infinity — edition record',url:'https://search.worldcat.org/en/title/110093',kind:'primary-text'},
    ],
  },
  gadamer: {
    lead: 'Hans-Georg Gadamer develops philosophical hermeneutics around historical belonging, dialogue, application, and language. Understanding begins from inherited prejudgments but can be revised when a text, person, or subject matter resists them.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Historically effected consciousness names more than knowledge of reception history. Past effects already shape what seems worth asking, what counts as evidence, and which possibilities can initially appear. Becoming aware of this condition increases responsibility without yielding a view from nowhere. Prejudice, or Vorurteil, means prior judgment; Gadamer does not vindicate every bias. Understanding tests inherited judgments by exposing them to something that may change the question.',
      'A fusion of horizons is neither automatic consensus nor assimilation. Conversation is oriented toward a subject matter—the Sache—rather than merely the speakers’ personalities. Questioning can widen a horizon while leaving disagreement intact. Application is not a later optional use of a completed interpretation: understanding a law, text, or tradition always brings it into relation with a present situation. Language is the medium of that encounter, not a sealed prison that makes truth relative to vocabulary.',
      'Gadamer does not reject scholarly methods; he argues that procedures cannot fully explain truth in art, history, and practical judgment. Habermas asks whether tradition-bound dialogue can expose ideology and distorted communication, while Gadamer replies that critique too is historically situated. His academic conduct during National Socialism also remains disputed: the evidence supports neither an uncomplicated ideologue label nor a resistance story. These controversies test whether hermeneutic openness supplies enough resources for criticism without erasing the finitude it describes.',
      'The late-life portrait anchors a person whose career crossed radically different political worlds, but no likeness can settle the historical judgment. The exhibit uses it as an object of biographical orientation while keeping interpretation focused on arguments, institutions, and documented choices.',
    ]}],
    presentation:{mode:'concise',orientation:[
      {label:'Historical setting',value:'Germany · 1900–2002 · career across four political regimes'},
      {label:'Starting condition',value:'Tradition · prejudgment · historically effected consciousness'},
      {label:'Hermeneutic movement',value:'Question · Sache · dialogue · fusion of horizons'},
      {label:'Truth and application',value:'Art · history · law · practical judgment'},
      {label:'Major disputes',value:'Habermas · Derrida · conduct under National Socialism'},
      {label:'Interpretive caution',value:'Not a method manual · not automatic agreement'},
    ],articleActionLabel:'Read the full sourced Gadamer article',bodyLayout:'prose',plaqueKicker:'',plaqueSubtitleLines:4},
    objectInterpretations:objectInterpretation('gadamer-ruuskanen-portrait-2000','Antti Ruuskanen’s 2000 photograph records Gadamer near the end of a century-long life. It anchors the philosopher historically but does not visualize a “fusion of horizons” or settle disputes about his conduct, his account of tradition, or the adequacy of hermeneutics for critique.'),
    sources:[
      {label:'Stanford Encyclopedia of Philosophy — Hans-Georg Gadamer',url:'https://plato.stanford.edu/archives/spr2022/entries/gadamer/',kind:'academic-reference'},
      {label:'Truth and Method — publisher record',url:'https://www.bloomsbury.com/us/truth-and-method-9781780936581/',kind:'primary-text'},
    ],
  },
};
