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
 * Exhibit-review conversions for seven consecutive claim-reviewed canonical
 * primaries. These concise Museum readings remain distinct from their complete
 * sourced canonical articles.
 */
export const CLAIM_REVIEWED_PRIMARY_INTERPRETATIONS_NEXT_B:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  cleanthes: objectLed(
    'Cleanthes',
    [
      'Cleanthes of Assos led the Stoa after Zeno and before Chrysippus, but he should not be reduced to a dutiful link between more familiar names. Later evidence credits him with work on physics, ethics, dialectic, and theology, and with sustaining the young school through a formative period. Almost all of that writing is lost. The substantial exception, the Hymn to Zeus, addresses a divine rational order, human error, shared law, and willing alignment with what is. It gives an unusually sustained early Stoic voice, but it cannot serve as a complete textbook of Cleanthes’s positions or of Stoicism as a whole.',
      'The poem’s providence is not a promise that pain, injustice, or preventable harm is good from a human standpoint. Its challenge is ethical and epistemic: people mistake partial goods for the whole good, then resist the order they cannot command. To agree with nature means training judgment and action within a causally ordered cosmos, not approving whatever happens or withdrawing from responsibility. Reports of disagreements among Zeno, Cleanthes, and Chrysippus in physics, psychology, and ethics show an early school still being worked out. Because the prose corpus is missing, the boundary between a reported Cleanthes doctrine and a broader Stoic reconstruction must remain visible.',
      'Olgiati’s engraving is a Renaissance invention of Cleanthes, made many centuries after his death and labelled with his name. It records a later reader’s wish to give an almost lost philosopher a recognizable face; it cannot establish his appearance, prove the hymn’s authorship, or visualize logos and providence. That limitation is useful. The exhibit asks visitors to read the surviving poem beside the gaps around it: a leader remembered through later anecdotes, a work list, fragments, and one continuous hymn. Cleanthes matters not as a silent placeholder, but as a thinker whose incomplete preservation makes responsible historical interpretation part of the philosophical encounter.',
    ],
    [
      {heading: 'What survives', items: [
        {label: 'Hymn to Zeus', description: 'The sole substantial continuous work attributed to Cleanthes joins praise, cosmic reason, human error, and ethical alignment without preserving an entire system.'},
        {label: 'Lost corpus', description: 'Titles, fragments, and later reports indicate wider work, but they cannot be read as if they supplied the missing arguments in full.'},
      ]},
      {heading: 'The Stoic demand', items: [
        {label: 'Logos', description: 'Rational order in the cosmos; it is not simply a transcendent creator standing outside the world.'},
        {label: 'Agreement with nature', description: 'Training judgment and action to respond responsibly within conditions one did not choose, not praising suffering or whatever happens.'},
      ]},
      {heading: 'Read the evidence carefully', items: [
        {label: 'School development', description: 'Reported differences among Zeno, Cleanthes, and Chrysippus show shared commitments under debate, not a simple sequence of replacements.'},
        {label: 'Later biography', description: 'Stories of endurance and poverty can preserve an ethical image while remaining uneven evidence for a historical life.'},
      ]},
    ],
    'cleanthes-olgiati-portrait',
    'Girolamo Olgiati’s 1580 imaginary engraving, reprinted in 1583, presents a labelled profile of Cleanthes of Assos. It documents Renaissance reception of an ancient philosopher whose writings are largely lost, not an authenticated likeness, a witness to the Hymn to Zeus, or evidence for a complete Stoic system. The name beneath the image records later commemoration; the surviving poem and mediated reports bear the philosophical claims.',
    'fnv1a64:6517adb6fee956ae',
  ),
  chrysippus: objectLed(
    'Chrysippus',
    [
      'Chrysippus of Soli was the third head of the Stoa and its great early systematizer. The ancient praise that there would have been no Stoa without Chrysippus celebrates the scale of his defense and development; it does not make him Stoicism’s founder or preserve his books for us. He connected logic, language, knowledge, physics, psychology, ethics, theology, and disputes with rival schools. Stoic claims about virtue, a causal cosmos, emotion, and social obligation were meant to answer to one another. This breadth helps explain his influence, but it also makes a tidy portrait of one finished personal doctrine hazardous when none of his works survives complete.',
      'The surviving dossier is rich but mediated. Diogenes Laertius lists hundreds of titles; Cicero, Plutarch, Galen, Sextus Empiricus, and other ancient authors quote or summarize selected arguments, often while adapting or attacking them. It is therefore reasonable to treat Chrysippus as central to Stoic propositional logic, theories of assent, causal determinism, responsibility, and the judgment account of passion. It is not reasonable to convert every later Stoic maxim into his wording, or to treat a hostile reconstruction as a lost chapter. His account of fate challenges the thought that caused events automatically cancel agency: rational assent belongs to how an agent participates in action, even though the precise interpretation remains disputed.',
      'This Flavian bronze bust, found in the Templum of Peace and dated about 75 CE, is a Roman object long after Chrysippus’s lifetime. It can show that a portrait type associated with Chrysippus circulated in imperial memory; it cannot restore lost treatises, settle the identity of replicas, or make an argument visible in a furrowed face. Its damaged, corroded surface turns attention toward survival of a reputation. The exhibit’s question is not whether the image supplies a philosopher’s personality, but how a system can remain influential when its arguments must be reconstructed from later witnesses, rival contexts, and fragmentary textual traces.',
    ],
    [
      {heading: 'A system under pressure', items: [
        {label: 'Propositional logic', description: 'Chrysippus developed arguments about whole statements and conditionals, a Stoic logical tradition distinct from simply repeating Aristotle’s syllogistic.'},
        {label: 'Assent', description: 'A rational agent’s endorsement of an impression; this provides a focal point for Stoic responsibility and the analysis of passion.'},
      ]},
      {heading: 'Fate and agency', items: [
        {label: 'Causal order', description: 'Stoics hold that events occur within an ordered causal nexus, a claim that creates rather than removes the question of responsibility.'},
        {label: 'Passion as judgment', description: 'Passions involve evaluative error, not merely irrational forces that strike a wholly passive mind.'},
      ]},
      {heading: 'What the sources permit', items: [
        {label: 'No complete books', description: 'A huge catalogue and many fragments show extraordinary range, but no intact Chrysippean treatise supplies a seamless system.'},
        {label: 'Partisan witnesses', description: 'Cicero, Plutarch, Galen, and Sextus preserve indispensable material while writing for their own Roman, medical, or skeptical arguments.'},
      ]},
    ],
    'chrysippus-portrait-bust',
    'This bronze portrait bust identified as Chrysippus was made in the Flavian period, about 75 CE, and found in Rome’s Templum of Peace; it is now in the Museo dei Fori Imperiali, inv. FN 5. It is a later Roman image, not a lifetime likeness or a text witness. Its identification and material afterlife can support questions about commemoration and reception, but not reconstruct the lost Stoic corpus or settle its doctrines.',
    'fnv1a64:0cb7a5ae390c0fe9',
  ),
  epictetus: objectLed(
    'Epictetus',
    [
      'Epictetus teaches Stoicism as training in freedom under conditions a person does not control. A Greek-speaking teacher who had been enslaved in Rome and later taught at Nicopolis, he repeatedly asks students where they locate the good, what they treat as theirs, and how they use the impressions that arrive. The familiar distinction is not a promise to manage events: body, property, reputation, office, other people’s actions, and outcomes remain exposed to fortune and power. What matters ethically is the use one makes of impressions, desire, aversion, impulse, and choice. That demanding claim is meant to reduce fear and manipulation without making vulnerability unreal.',
      'The Discourses and Encheiridion reach us through Arrian, Epictetus’s student. Four books of a larger collection of Discourses survive, and the Handbook is a shorter Arrianic selection. These texts are strong evidence for a distinctive classroom voice and method, but they are not verbatim recordings or books Epictetus is known to have authored. Their literary mediation matters alongside the uncertain ancient testimony about enslavement, disability, manumission, exile, and teaching. Reading Epictetus well means neither turning biography into a universal key nor treating the texts as a portable collection of reassuring quotations detached from Stoic physics, ethics, and social roles.',
      'The 1715 frontispiece depicts an imagined Epictetus at a book with a crutch, made for Edward Ivie’s Latin verse adaptation of the Encheiridion. It records early modern reception and a visual choice about bodily difference, learning, and Stoic authority; it cannot show what Epictetus looked like, verify a biographical anecdote, or preserve an ancient text. The image’s force lies in that distance. A visitor can notice how later readers pictured a teacher of resilience, then return to the harder practice in Arrian’s texts: test an impression, distinguish moral commitment from outcome, fulfill relationships and roles, and refuse to make external success the measure of a life.',
    ],
    [
      {heading: 'The central distinction', items: [
        {label: 'What is up to us', description: 'Epictetus locates responsibility in judgment, impulse, desire, aversion, and the use of impressions—not in command over every external result.'},
        {label: 'Impressions', description: 'Appearances that invite assent; training pauses before treating an initial appearance as a reliable account of what is good or terrible.'},
      ]},
      {heading: 'Freedom with duties', items: [
        {label: 'Prohairesis', description: 'Often translated as moral purpose or volition, it names the agency through which a person uses impressions and commits to action.'},
        {label: 'Roles', description: 'Family, civic, and human relationships still call for appropriate action, so detachment from outcome is not permission for withdrawal.'},
      ]},
      {heading: 'Read through Arrian', items: [
        {label: 'Discourses', description: 'A student’s surviving representation of classroom teaching, not an authorial transcript preserved directly from Epictetus.'},
        {label: 'Handbook', description: 'A compact Arrianic selection that supports practice but can distort the wider teaching when treated as a modern self-help slogan.'},
      ]},
    ],
    'epictetus-enchiridion-frontispiece',
    'This 1715 engraved frontispiece to Edward Ivie’s Latin verse adaptation of the Encheiridion imagines Epictetus seated with a book and crutch. Drawn probably by William Sonmans and engraved by Michael Burghers, it is early modern reception, not a lifetime portrait or ancient manuscript witness. It can show how later readers pictured Stoic teaching and bodily difference; it cannot verify biography, reproduce Arrian’s classroom, or establish the doctrine’s meaning by image alone.',
    'fnv1a64:09d32b49d951b5d8',
  ),
  seneca: objectLed(
    'Seneca',
    [
      'Lucius Annaeus Seneca writes Stoicism from inside moral incompletion. His Latin dialogues and Moral Letters examine anger, grief, illness, time, friendship, wealth, death, and the possibility of progress without claiming that their author has become a sage. This is why the work retains its pressure. Seneca asks readers to rehearse better judgments while showing how readily fear, ambition, resentment, and self-excusing stories return. His use of vivid scenes and direct address is philosophical craft, not a transparent diary. The polished letters to Lucilius and the works conventionally called dialogues stage a voice for moral training and a wider readership; their speakers, occasions, and chronology must not automatically be treated as independently established biography.',
      'Seneca’s proximity to Nero makes that distinction ethically urgent. He held wealth and influence, advised the young emperor, was exiled and recalled, and was forced to die after implication in the Pisonian conspiracy. A Stoic account of wealth as a preferred indifferent says that money is normally worth selecting without constituting happiness; it does not prove that its holder used it justly or erase unequal dependence. Likewise, On Clemency can be read as an attempt to restrain imperial violence, accommodation to monarchy, or both. The strongest encounter holds philosophical ideals, rhetorical self-presentation, imperial service, and the costs borne by others together instead of treating either hypocrisy or Stoic vocabulary as a complete verdict.',
      'The displayed marble is the Pseudo-Seneca type: a Roman copy of a lost Hellenistic portrait identified with Seneca and rejected after discovery of an inscribed portrait. It may represent Hesiod; it cannot identify Seneca’s face, office, wealth, or character. Its mistaken name shows how an image can make a philosopher seem more securely known than the evidence permits. The object opens a question for Seneca’s writing: what happens when a persuasive appearance gains authority? Test this portrait against the literary voice—attentive to its effects, history, and what it cannot excuse.',
    ],
    [
      {heading: 'Moral progress', items: [
        {label: 'The proficiens', description: 'A person making progress rather than a Stoic sage; Seneca writes as someone practicing correction amid recurring failure and pressure.'},
        {label: 'Anger', description: 'A destructive evaluative response for Seneca, not a claim that injustice, injury, grief, or political wrong should be ignored.'},
      ]},
      {heading: 'Goods under pressure', items: [
        {label: 'Preferred indifferents', description: 'Health, wealth, and reputation may rationally be selected, but they do not constitute happiness or morally excuse their acquisition and use.'},
        {label: 'Clemency', description: 'An imperial virtue intended to restrain punishment; it also raises the question why the ruler holds such discretionary power at all.'},
      ]},
      {heading: 'A contested life and corpus', items: [
        {label: 'Literary persona', description: 'Letters and dialogues are crafted exhortation, so their self-presentation cannot simply be read as a dated record of private life.'},
        {label: 'Nero and power', description: 'Seneca’s court career is neither canceled by Stoic ideals nor settled by a simple charge of hypocrisy; the tension remains ethical evidence.'},
      ]},
    ],
    'seneca-pseudo-seneca-bm',
    'This marble “Pseudo-Seneca” head in the British Museum, GR 1962,0824.1, is a Roman copy of a lost Hellenistic portrait type long mistaken for Seneca and now often associated instead with Hesiod. It cannot show Seneca’s appearance, prove a personal trait, or authenticate his writings. The object preserves a history of misidentification and reception, making it evidence for how authority attaches to images rather than a likeness of the Roman Stoic author.',
    'fnv1a64:6328322dd736d7c2',
  ),
  'marcus-aurelius': objectLed(
    'Marcus Aurelius',
    [
      'Marcus Aurelius’s Meditations are not a finished public treatise or a diary that plainly explains an emperor’s policy. They are Greek exercises: reminders, self-addresses, quotations, and tests designed to redirect attention. Marcus returns to familiar Stoic practices—pause before assenting to an impression, distinguish what depends on one’s judgment from what does not, accept mortality, do the next just action, and remember participation in a larger human community. Their importance lies in use as much as in proposition. The text repeatedly attempts to reform an ambitious, anxious, or resentful self; it does not offer a technique for controlling other people or turning public authority into private serenity.',
      'That form makes the political question unavoidable. Marcus ruled an empire shaped by hierarchy, enslavement, military force, punitive law, and frontier war. His Stoic language of justice, social nature, and common kinship does not make him a modern democrat or settle the relation between moral aspiration and imperial institutions. Book 1 records debts to teachers including Rusticus, Apollonius, and Sextus, while Epictetus’s influence is particularly clear; yet the Meditations adapts inherited practices to one person’s circumstances rather than simply restating a school manual. Its title, book divisions, composition sequence, and exact settings remain uncertain, so maxim-by-maxim reading should not overstate what we know.',
      'This Roman marble bust of Marcus, made in Rome between 161 and 169 CE, presents an imperial ruler in cuirass and cloak. It is an ancient portrait with extraordinary historical proximity, but it is still an official visual form: expression, beard, drapery, and military costume cannot reveal private exercises, prove justice, or decide the moral meaning of a reign. The object’s public authority sharpens the exhibit’s contrast with a private text. Visitors can ask what a ruler’s self-scrutiny does and does not accomplish when the institutions and violence of rule persist beyond a reflective individual’s intentions, as well as how later readers have made a philosopher-emperor into a consoling emblem.',
    ],
    [
      {heading: 'Exercises, not slogans', items: [
        {label: 'Test impressions', description: 'Pause before taking an appearance as a fact about good, harm, status, or another person; the exercise disciplines evaluative response.'},
        {label: 'Mortality', description: 'Remembering death reduces vanity and resentment, but it is not a command to treat another person’s loss or political harm as insignificant.'},
      ]},
      {heading: 'Stoic formation', items: [
        {label: 'Justice and kinship', description: 'Marcus repeatedly treats human beings as participants in a shared rational and social world, a claim whose institutional implications remain contested.'},
        {label: 'Teachers', description: 'Rusticus, Apollonius, Sextus, and other figures named in Book 1 locate the exercises within learned Stoic and wider moral traditions.'},
      ]},
      {heading: 'Keep the imperial problem visible', items: [
        {label: 'Private notes', description: 'The Meditations is not a designed program for governing others, and its exact arrangement, dates, and intended privacy are unresolved.'},
        {label: 'Power and coercion', description: 'Self-scrutiny does not automatically resolve the realities of war, hierarchy, conquest, law, and administration carried by Roman imperial rule.'},
      ]},
    ],
    'stoicism-marcus-aurelius-bust',
    'This Roman marble bust of Marcus Aurelius, made in Rome between 161 and 169 CE and held by the Louvre as MR 561 / Ma 1166, shows the emperor in cuirass and paludamentum. It is an ancient imperial portrait, not an illustration of the Meditations or proof of Marcus’s justice. The image can establish an official public representation of a ruler; the private exercises, historical record, and ethical disputes require separate interpretation.',
    'fnv1a64:b426f308152d7280',
  ),
  plotinus: objectLed(
    'Plotinus',
    [
      'Plotinus asks how the many changing things can depend on a principle that is simpler than any of them. His answer is not a story in which a first being makes a world from nothing at a moment in time. The One, or Good, is beyond ordinary being and thought; Intellect contains intelligible forms; Soul relates intelligible life to the sensible cosmos. “Procession” and “return” name relations of dependence and reorientation, not movement through space. The One does not become depleted by what depends on it, and the world is not simply a rival evil realm. These difficult claims make Plotinus a late-antique Platonist whose arguments need slow reading rather than a vague image of mystical flow.',
      'The Enneads preserve fifty-four treatises, but their familiar order is Porphyry’s editorial design. Porphyry’s near-contemporary Life records Plotinus’s Alexandria, abortive eastern expedition, Roman teaching community, writings, and death in 270; it is also a crafted philosophical biography of an exemplary teacher. Its witness is indispensable without being transparent. Plotinus and his immediate successors understood their work as Platonist interpretation; “Neoplatonism” is a useful later historical label, not his announced school name. His essays engage beauty, virtue, matter, evil, embodiment, and criticism of Gnostic rivals, so return cannot be reduced to private escape or a rejection of the visible world.',
      'The displayed marble head is one of four replicas found at Ostia and plausibly identified as Plotinus, though no inscription proves that identification. Its broken neck, damaged nose, and missing ear make the conditions of survival visible. It is neither a secure lifetime likeness nor a diagram of the One, and it cannot authenticate Porphyry’s arrangement of the Enneads. The object instead stages restraint. A visitor encounters a face close to Plotinus’s period but must keep the chain of identification in view, then return to the texts to ask how unity, intellect, soul, beauty, evil, and philosophical practice are related.',
    ],
    [
      {heading: 'The metaphysical relation', items: [
        {label: 'The One or Good', description: 'The source beyond ordinary being and thought on which all else depends; it is not one very large being among other beings.'},
        {label: 'Intellect and Soul', description: 'Interdependent explanatory levels: Intellect contains intelligible forms, while Soul relates intelligible life to the changing sensible world.'},
      ]},
      {heading: 'Procession and return', items: [
        {label: 'Procession', description: 'Dependence of the many on greater unity, not a temporal event, spatial cascade, or a creator’s fabrication of matter from nothing.'},
        {label: 'Return', description: 'Ethical, intellectual, and contemplative reorientation toward intelligible unity, not a simple flight from embodiment or the cosmos.'},
      ]},
      {heading: 'Text and reception', items: [
        {label: 'Porphyry’s Enneads', description: 'The editor arranged surviving essays into six sets of nine; that thematic order should not be mistaken for Plotinus’s order of composition.'},
        {label: '“Neoplatonism”', description: 'A later label useful for a tradition that included Porphyry, Iamblichus, Proclus, and many transformations rather than one unchanged doctrine.'},
      ]},
    ],
    'neoplatonism-plotinus-ostia',
    'This ancient Roman marble head in the Museo Ostiense, Ostia Antica, inv. 1386, is one of four replicas found at Ostia and is conventionally identified as Plotinus. The neck is broken at the beard, with damage to the nose and ear; the identification is plausible but unproven. It can provide a materially close ancient portrait tradition, not a certain likeness, a proof of doctrine, or evidence for the Enneads’ order and interpretation.',
    'fnv1a64:1bb458f93c58bb9c',
  ),
  buddha: objectLed(
    'Siddhartha Gautama / the Buddha',
    [
      'The historical Siddhartha Gautama is approached through layered evidence: early Buddhist discourses, later biographies, monastic memory, material remains, and living traditions. Scholars broadly place the teacher in north India in the fifth century BCE, but exact dates and the historical sequence of his life remain disputed. The early collections preserve recurrent teaching patterns through communal oral and textual transmission; they are indispensable without being stenographic reports of one voice. This boundary matters because “the Buddha” can name a cautiously reconstructed teacher, revered figures in many Buddhist traditions, and a modern symbol. A responsible encounter keeps those uses distinct while taking each seriously in its own setting.',
      'Early discourses organize practice around dukkha, its arising, its cessation, and a path of cultivation. Dukkha does not mean every moment is merely miserable; it diagnoses the vulnerability of conditioned life and the ways craving, ignorance, and clinging intensify it. Impermanence, dependent arising, aggregates, not-self, intentional karma, rebirth, and nirvāṇa belong to this field of inquiry. Not-self does not make pain, agency, convention, or responsibility vanish, and craving is not every purposeful desire. Ethical conduct, attention, concentration, and understanding are mutually supporting forms of training. Later Abhidharma, Madhyamaka, Yogācāra, tantric, devotional, and regional traditions develop this inheritance in distinct arguments that should not automatically be placed in the historical teacher’s mouth.',
      'The seated Gandharan Buddha at the Victoria and Albert Museum was made in the Kushan period, roughly 200–400 CE, centuries after the historical teacher’s conventional lifetime. Its halo, robe, meditative pose, and narrative relief give material form to a later visual and devotional tradition. It cannot be a portrait from life, a record of the earliest community, or proof that one meditative technique contains the whole teaching. The sculpture is reception evidence: it shows how Buddhist communities made teaching, authority, presence, and awakening visible. Hold that image alongside early texts without collapsing artistic memory, historical reconstruction, and later philosophical traditions.',
    ],
    [
      {heading: 'The diagnostic path', items: [
        {label: 'Four truths as tasks', description: 'Dukkha is to be understood, its arising abandoned, cessation realized, and the path cultivated—not simply accepted as a verdict that life is misery.'},
        {label: 'Dependent arising', description: 'Events arise in dependence on conditions, guiding inquiry toward how suffering is sustained and how conditions can be transformed.'},
      ]},
      {heading: 'Persons and practice', items: [
        {label: 'Not-self', description: 'A challenge to identifying a permanent self in changing aggregates; it does not deny conventional persons, pain, agency, or responsibility.'},
        {label: 'Eightfold path', description: 'A coordinated discipline of understanding, intention, speech, action, livelihood, effort, mindfulness, and concentration rather than mindfulness alone.'},
      ]},
      {heading: 'Historical and living plurality', items: [
        {label: 'Transmitted discourses', description: 'Pāli and parallel collections preserve related teachings through communal histories, allowing cautious comparison rather than a verbatim recovery of one speaker.'},
        {label: 'Later Buddhist traditions', description: 'Madhyamaka, Yogācāra, tantra, devotional forms, and regional schools inherit, contest, and transform early materials instead of repeating one timeless doctrine.'},
      ]},
    ],
    'buddha-gandhara-meditating',
    'This gray stone seated Buddha from Gandhara, now in the Victoria and Albert Museum as IS.108-2001, is dated on its image record to the Kushan period, about 200–400 CE. With a halo, draped robe, meditative pose, and a narrative relief at its base, it is a later devotional representation—not a historical portrait or transcript of an early discourse. It can illuminate Gandharan Buddhist visual culture, not settle chronology or define all Buddhist philosophy.',
    'fnv1a64:292b28a72b2b0fe2',
  ),
};
