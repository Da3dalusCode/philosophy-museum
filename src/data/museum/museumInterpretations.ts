import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumExhibitId, MuseumHallId} from '../museumCatalog';
import type {MuseumExhibitRef} from './museumWorldTypes';
import type {NavigableAppRoute} from '../../routing/routes';

export type MuseumInterpretationSource = {
  label: string;
  url: string;
  kind: 'academic-reference' | 'primary-text' | 'collection-record';
};

export type MuseumInterpretationSection = {
  heading: string;
  paragraphs: readonly string[];
  points?: readonly string[];
};

type MuseumInterpretationBase = {
  hallId: MuseumHallId;
  id: MuseumExhibitId;
  name: string;
  dateLabel: string;
  entityType: string;
  centralQuestion: string;
  lead: string;
  keyIdeas: readonly string[];
  keyWorks: readonly string[];
  sections: readonly MuseumInterpretationSection[];
  objectInterpretations: Readonly<Partial<Record<MuseumAssetId, string>>>;
  sources: readonly MuseumInterpretationSource[];
  relatedExhibits: readonly MuseumExhibitRef[];
  articleRoute: NavigableAppRoute;
};

export type MuseumPhilosopherInterpretation = MuseumInterpretationBase & {
  kind: 'philosopher';
  originalName?: string;
  biography: {
    born?: string;
    died?: string;
    associatedPlaces: readonly string[];
    era: string;
    affiliations: readonly string[];
    influencedBy: readonly string[];
    studentsOrFollowers: readonly string[];
    sourceSituation: string;
    knownFor: readonly string[];
  };
};

export type MuseumTraditionInterpretation = MuseumInterpretationBase & {
  kind: 'tradition';
  tradition: {
    origin: string;
    place: string;
    historicalPeriod: string;
    earlyFigures: readonly string[];
    majorRepresentatives: readonly string[];
    characteristicPractices: readonly string[];
    centralDoctrines: readonly string[];
    sourceTraditions: readonly string[];
    principalRivals: readonly string[];
    laterInfluence: readonly string[];
    commonMisconception: string;
    transmission: string;
  };
};

export type MuseumInterpretation = MuseumPhilosopherInterpretation | MuseumTraditionInterpretation;

const interpretations = {
  socrates: {
    hallId: 'ancient-greek', id: 'socrates', kind: 'philosopher', name: 'Socrates', originalName: 'Σωκράτης', dateLabel: '469–399 BCE', entityType: 'Athenian philosopher',
    centralQuestion: 'How should a person live, and how can claimed knowledge survive examination?',
    lead: 'Socrates changed philosophy without writing a book. In the streets, workshops, and gymnasia of democratic Athens, he asked people to explain ideas they confidently used—justice, courage, piety, friendship—and then tested whether their answers fit together. This questioning practice, later called the elenchus, often ended without a definition. Its value lay in exposing the distance between appearing wise and understanding how one ought to live. Socrates made care of the soul more important than wealth, reputation, or political success, and treated examination as a lifelong ethical obligation. That mission unfolded during Athens’ military defeat, oligarchic coups, and democratic restoration. Some associates became notorious political actors, while his unconventional religious language and public questioning made him vulnerable. In 399 BCE, an Athenian jury convicted him of impiety and corrupting the young. He accepted the sentence rather than abandon his practice. Yet the historical Socrates remains elusive: Plato, Xenophon, Aristophanes, and later Aristotle present significantly different figures.',
    biography: {
      born: '469 BCE, probably Athens', died: '399 BCE, Athens', associatedPlaces: ['Athens'], era: 'Classical Greece', affiliations: ['Socratic circles'],
      influencedBy: ['Athenian moral debate', 'Presocratic inquiry', 'Sophistic argument'], studentsOrFollowers: ['Plato', 'Xenophon', 'Antisthenes', 'Aristippus'],
      sourceSituation: 'Wrote nothing; reconstructed from conflicting literary witnesses.', knownFor: ['Elenchus', 'Professed ignorance', 'Care of the soul', 'Examined life'],
    },
    keyIdeas: ['Cross-examination tests whether beliefs cohere.', 'Wisdom begins by recognizing the limits of one’s knowledge.', 'Moral character matters more than wealth, reputation, or survival.'],
    keyWorks: ['Plato, Apology', 'Plato, Crito and Euthyphro', 'Xenophon, Memorabilia', 'Aristophanes, Clouds'],
    sections: [
      {heading: 'Athens under pressure', paragraphs: ['Socrates practiced during the Peloponnesian War, the rule of the Thirty, and the restored democracy. His trial cannot be separated from this civic trauma, even though the formal accusations concerned impiety and corrupting the young.']},
      {heading: 'A life known through other voices', paragraphs: ['Plato turns Socrates into a central dramatic speaker; Xenophon presents a more conventionally useful moral teacher; Aristophanes stages a comic intellectual. The “Socratic problem” is the difficulty of recovering one historical thinker from these divergent purposes.']},
      {heading: 'Influence and disagreement', paragraphs: ['Plato and the Socratic schools claimed different parts of his legacy. Cynics intensified his independence from convention, Stoics adopted the priority of virtue, and skeptics found a model of inquiry without easy dogma.']},
    ],
    objectInterpretations: {
      'socrates-louvre-head': 'This ancient Roman portrait gives Socrates a material presence, but it follows a posthumous type associated with Lysippos. It records how antiquity remembered him rather than how he certainly looked.',
      'socrates-death-of-socrates': 'David’s painting turns the trial into a modern image of intellectual conscience. It is reception history, not eyewitness evidence: Plato appears elderly and present although the Phaedo reports that he was absent.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Socrates', url: 'https://plato.stanford.edu/entries/socrates/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Socrates', url: 'https://iep.utm.edu/socrates/', kind: 'academic-reference'},
      {label: 'Perseus — Plato, Apology', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0170:text=Apol.', kind: 'primary-text'},
      {label: 'Louvre — Portrait of Socrates, Ma 59', url: 'https://collections.louvre.fr/ark:/53355/cl010278931', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'plato'}], articleRoute: {kind: 'philosopher', philosopherId: 'socrates'},
  },
  plato: {
    hallId: 'ancient-greek', id: 'plato', kind: 'philosopher', name: 'Plato', originalName: 'Πλάτων', dateLabel: 'c. 429/427–347 BCE', entityType: 'Athenian philosopher and dialogue author',
    centralQuestion: 'What is genuinely real, what can be known, and what makes a soul or city just?',
    lead: 'Plato turned Socratic conversation into a literary and philosophical world. His dialogues do not simply announce conclusions: they stage disagreements, failed definitions, myths, arguments, and changes of perspective. Across them, questions about justice, knowledge, love, education, language, and political power converge on a larger problem—whether a changing visible world can be understood through stable intelligible structures. Plato often explores that problem through Forms, realities such as Justice or Equality that particular things imperfectly exemplify. Yet the dialogues should not be treated as chapters of one finished textbook. The Republic links the just soul to the just city; the Symposium presents competing accounts of love; the Theaetetus tests definitions of knowledge without settling on one; and the Timaeus offers a cosmological construction whose status remains debated. After Socrates’ execution, Plato made philosophical education itself an institution through the Academy. His students included Aristotle, but his influence extends through ancient Platonism, Neoplatonism, medieval Jewish, Christian, and Islamic philosophy, and modern debates about knowledge and politics.',
    biography: {
      born: 'c. 429/427 BCE, Athens or Aegina', died: '347 BCE, Athens', associatedPlaces: ['Athens', 'Sicily'], era: 'Classical Greece', affiliations: ['Socratic circle', 'The Academy'],
      influencedBy: ['Socrates', 'Parmenidean traditions', 'Heraclitean traditions', 'Pythagorean currents'], studentsOrFollowers: ['Aristotle', 'Speusippus', 'Xenocrates', 'Ancient Platonists'],
      sourceSituation: 'Dialogues survive richly; chronology, authenticity of some letters, and the author’s own voice remain debated.', knownFor: ['Dialogues', 'Forms', 'Dialectic', 'The Academy', 'Political philosophy'],
    },
    keyIdeas: ['Knowledge and opinion answer to different kinds of object.', 'Dialectic tests assumptions and seeks intelligible structure.', 'Justice concerns the order of both soul and city.'],
    keyWorks: ['Republic', 'Symposium', 'Phaedo', 'Theaetetus', 'Timaeus', 'Laws'],
    sections: [
      {heading: 'Dialogue rather than doctrine sheet', paragraphs: ['Socrates is often the leading speaker, but no mechanical rule tells us when he represents the historical Socrates, Plato, or a dramatic position under examination. The diversity of speakers and endings is philosophically deliberate.']},
      {heading: 'Education after political failure', paragraphs: ['Athenian defeat, oligarchic violence, restored democracy, and Socrates’ execution shaped Plato’s concern with who should rule and how judgment can be educated. The Academy made sustained inquiry a civic institution outside ordinary officeholding.']},
      {heading: 'A contested inheritance', paragraphs: ['Aristotle criticized separate Forms while retaining Plato’s demand for explanation. Later Platonists systematized the dialogues in different ways; Neoplatonists treated Plato as the authority behind a layered metaphysical tradition.']},
    ],
    objectInterpretations: {
      'plato-capitoline-bust': 'The surviving marble is a Roman copy of a portrait type associated with Silanion. Its Greek model may date within Plato’s lifetime, but the face is later and probably idealized.',
      'plato-school-of-athens': 'Raphael imagines the ancient philosophical tradition for a Renaissance papal setting. Plato’s gesture and Timaeus make later interpretation visible; the assembled likenesses are not ancient documentation.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Plato', url: 'https://plato.stanford.edu/entries/plato/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Plato', url: 'https://iep.utm.edu/plato/', kind: 'academic-reference'},
      {label: 'Perseus — works of Plato', url: 'https://www.perseus.tufts.edu/hopper/searchresults?q=Plato', kind: 'primary-text'},
      {label: 'Vatican Museums — School of Athens', url: 'https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/stanze-di-raffaello/stanza-della-segnatura/scuola-di-atene.html', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'aristotle'}], articleRoute: {kind: 'philosopher', philosopherId: 'plato'},
  },
  aristotle: {
    hallId: 'ancient-greek', id: 'aristotle', kind: 'philosopher', name: 'Aristotle', originalName: 'Ἀριστοτέλης', dateLabel: '384–322 BCE', entityType: 'Greek philosopher and research organizer',
    centralQuestion: 'What kinds of causes and methods adequately explain beings, change, knowledge, and flourishing?',
    lead: 'Aristotle approached philosophy as a search for explanations adequate to the variety of the world. A student in Plato’s Academy for roughly twenty years, he resisted explaining individual things chiefly through separate Forms. He asked instead what a thing is made of, what structure makes it the kind of thing it is, what produces it, and what end its development serves—the framework later called the four causes. That explanatory ambition ranged from logic and metaphysics to ethics, politics, rhetoric, poetry, psychology, and empirical biology. Aristotle analyzed valid inference, distinguished potentiality from actuality, and understood living beings as organized unities of matter and form. In ethics, human flourishing is not a passing feeling but a whole life of rational activity shaped by practiced excellences, practical judgment, friendship, and political community. Aristotle founded the Lyceum and worked within a collaborative research culture that collected constitutions and observations. His surviving writings are only part of a much larger output: most polished dialogues are lost, while many extant texts resemble teaching materials assembled through later editorial transmission.',
    biography: {
      born: '384 BCE, Stagira', died: '322 BCE, Chalcis', associatedPlaces: ['Stagira', 'Athens', 'Assos', 'Lesbos', 'Macedonia', 'Chalcis'], era: 'Classical Greece', affiliations: ['Plato’s Academy', 'The Lyceum', 'Peripatetic school'],
      influencedBy: ['Plato', 'Earlier Greek natural philosophy', 'Medical and biological inquiry'], studentsOrFollowers: ['Theophrastus', 'Eudemus', 'Peripatetic researchers'],
      sourceSituation: 'About 31 treatises survive from a far larger corpus; several have layered editorial histories.', knownFor: ['Logic', 'Four causes', 'Hylomorphism', 'Virtue ethics', 'Biological research'],
    },
    keyIdeas: ['Explanation requires material, formal, efficient, and final causes.', 'Substances combine matter and organizing form.', 'Flourishing is rational activity across a complete life, supported by practiced virtue.'],
    keyWorks: ['Physics', 'Metaphysics', 'Nicomachean Ethics', 'Politics', 'De Anima', 'Prior and Posterior Analytics', 'Poetics'],
    sections: [
      {heading: 'A collaborative institution', paragraphs: ['The Lyceum joined teaching to collection and research across constitutions, animals, rhetoric, poetry, and earlier philosophy. Aristotle’s method varies by subject rather than forcing every inquiry into one proof form.']},
      {heading: 'Corpus and transmission', paragraphs: ['Ancient catalogues attribute many more works to Aristotle than survive. The compressed character of extant treatises and their later organization warn against treating every chapter as a polished publication.']},
      {heading: 'Two millennia of reuse', paragraphs: ['Greek commentators, Syriac and Arabic translators, Jewish and Christian thinkers, and Latin universities repeatedly reorganized Aristotle. His concepts endured because they generated arguments as often as agreement.']},
    ],
    objectInterpretations: {
      'aristotle-altemps-bust': 'This Roman copy sustains an ancient Greek portrait tradition, while the later mantle and copying history prevent it from functioning as an unmediated likeness.',
      'aristotle-athenian-constitution-papyrus': 'Papyrus 131 makes the corpus materially visible: copied centuries later on reused documents, it is a witness to loss, recovery, scribal labor, and the uncertain boundary between Aristotle and his school.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Aristotle', url: 'https://plato.stanford.edu/entries/aristotle/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Aristotle', url: 'https://iep.utm.edu/aristotle/', kind: 'academic-reference'},
      {label: 'Perseus — Nicomachean Ethics, Book I', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0054:book=1', kind: 'primary-text'},
      {label: 'British Library — Papyrus 131', url: 'https://searcharchives.bl.uk/catalog/040-002104511', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'epicureanism'}, {hallId: 'medieval-worlds', exhibitId: 'avicenna'}], articleRoute: {kind: 'philosopher', philosopherId: 'aristotle'},
  },
  cynicism: {
    hallId: 'ancient-greek', id: 'cynicism', kind: 'tradition', name: 'Cynicism', dateLabel: 'Late 5th century BCE–Late Antiquity', entityType: 'Philosophical movement and way of life',
    centralQuestion: 'How much convention and possession can be discarded before genuine freedom becomes possible?',
    lead: 'Ancient Cynicism made philosophy visible as a way of life. Its practitioners challenged the assumption that wealth, status, citizenship, decorum, or even theoretical learning were necessary for happiness. Freedom required reducing one’s dependence on fortune and convention through askēsis: repeated training in endurance, simplicity, self-command, and fearless speech. Diogenes of Sinope became the tradition’s defining figure. Stories place him living with few possessions, confronting rulers, mocking pretension, and using deliberately shocking acts to reveal how arbitrary respectable behavior could be. Crates carried the practice into a gentler pedagogical form, while Hipparchia publicly rejected expected gender and household roles to join the Cynic life. Their claim to be citizens of the world made local rank answerable to a wider human community. Cynicism is difficult to reconstruct because its actions survived better than its arguments. No substantial Cynic work remains, and later authors transformed its philosophers into memorable characters. Famous anecdotes may preserve a genuine ethical posture without recording literal events: poverty, humor, provocation, and bodily practice become arguments about which needs are natural and which are manufactured.',
    tradition: {
      origin: 'Socratic circles in the late fifth and fourth centuries BCE', place: 'Athens and the wider Greek world', historicalPeriod: 'Classical Greece through Late Antiquity',
      earlyFigures: ['Antisthenes (precursor or disputed founder)', 'Diogenes of Sinope'], majorRepresentatives: ['Diogenes', 'Crates', 'Hipparchia', 'Metrocles', 'Menippus'],
      characteristicPractices: ['Askēsis or ethical training', 'Voluntary simplicity', 'Frank speech', 'Public challenge to convention'], centralDoctrines: ['Virtue is sufficient for happiness', 'Live according to nature', 'Freedom requires self-sufficiency'],
      sourceTraditions: ['Diogenes Laertius, Lives VI', 'Anecdotes and sayings', 'Later Stoic and imperial witnesses'], principalRivals: ['Social convention', 'Courtly philosophy', 'Speculative systems detached from practice'],
      laterInfluence: ['Stoicism', 'Menippean satire', 'Roman moralists', 'Ascetic traditions'], commonMisconception: 'Ancient Cynicism is not modern cynical distrust or mere pessimism.',
      transmission: 'No substantial early Cynic text survives; lineage and anecdotes come largely through later authors.',
    },
    keyIdeas: ['Train needs downward until fortune has little leverage.', 'Use frank speech and public example to expose false values.', 'Cosmopolitan identity challenges inherited rank and citizenship.'],
    keyWorks: ['Diogenes Laertius, Lives VI', 'Epictetus, Discourses 3.22', 'Julian, Orations 6 and 7'],
    sections: [
      {heading: 'Practice as argument', paragraphs: ['Cynic poverty and shamelessness were not theatrical ends in themselves. They tested whether social rules served reason and virtue or merely protected status, luxury, and fear.']},
      {heading: 'A disputed lineage', paragraphs: ['Later sources draw a chain from Socrates through Antisthenes, Diogenes, Crates, and Zeno. Antisthenes’ place as the first Cynic and his personal teaching relation to Diogenes remain disputed.']},
      {heading: 'Influence without an institution', paragraphs: ['Unlike the Academy, Lyceum, Garden, or Stoa, Cynicism had no single meeting place or curriculum. Its portable ethical performance helped it survive as both philosophical vocation and literary character.']},
    ],
    objectInterpretations: {
      'cynicism-diogenes-walters': 'Gérôme combines the storage jar, lamp, and dogs into one nineteenth-century image. The installation’s pithos treats those symbols as reception history, not archaeological proof of a literal dwelling.',
      'cynicism-alexander-and-diogenes': 'The confrontation between ruler and philosopher makes political power and radical independence visible. Its historical precision is uncertain, but its ethical contrast became central to the Cynic tradition.',
    },
    sources: [
      {label: 'Internet Encyclopedia of Philosophy — Cynics', url: 'https://iep.utm.edu/cynics/', kind: 'academic-reference'},
      {label: 'Perseus — Diogenes Laertius, Lives VI', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0258:book=6', kind: 'primary-text'},
      {label: 'Internet Encyclopedia of Philosophy — Diogenes of Sinope', url: 'https://iep.utm.edu/diogenes-of-sinope/', kind: 'academic-reference'},
      {label: 'Walters Art Museum — Diogenes', url: 'https://art.thewalters.org/object/37.131/', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'stoicism'}], articleRoute: {kind: 'branch', branchId: 'cynicism'},
  },
  epicureanism: {
    hallId: 'ancient-greek', id: 'epicureanism', kind: 'tradition', name: 'Epicureanism', dateLabel: 'Founded c. 307/306 BCE', entityType: 'Hellenistic philosophical school',
    centralQuestion: 'How can understanding nature free a person from fear and unnecessary desire?',
    lead: 'Epicureanism begins from a therapeutic question: which beliefs and desires make life needlessly frightening? Epicurus answered with an interconnected account of nature, knowledge, and happiness. Everything bodily consists of atoms moving in void; the soul is bodily and does not survive death; and the gods exist but live blessed lives without punishing, rewarding, or governing humanity. Understanding nature is valuable because it dissolves fear of gods, death, and cosmic purpose. The ethical goal is pleasure, but not endless stimulation. Epicureans distinguish natural and necessary desires from empty pursuits of status, luxury, and immortality. The stable limit of pleasure is freedom from bodily pain and mental disturbance—aponia and ataraxia. Prudence helps compare consequences, while friendship gives security and shared delight. The Garden was therefore not a retreat into solitary indulgence but a durable philosophical community. Epicureanism became one of antiquity’s major schools and found its most powerful Latin voice in Lucretius’ De rerum natura. Its reputation was often distorted by opponents who equated pleasure with excess.',
    tradition: {
      origin: 'Epicurus’ schools at Mytilene and Lampsacus; the Garden at Athens c. 307/306 BCE', place: 'Athens, with communities across the Hellenistic and Roman worlds', historicalPeriod: 'Hellenistic and Roman antiquity',
      earlyFigures: ['Epicurus', 'Metrodorus', 'Hermarchus'], majorRepresentatives: ['Epicurus', 'Metrodorus', 'Philodemus', 'Lucretius'],
      characteristicPractices: ['Desire classification', 'Philosophical friendship', 'Study of nature', 'Remembered maxims'], centralDoctrines: ['Atoms and void', 'Pleasure as freedom from disturbance', 'Mortality of the soul', 'Conventional justice'],
      sourceTraditions: ['Epicurus’ three letters', 'Principal Doctrines', 'Vatican Sayings', 'Lucretius', 'Herculaneum papyri'], principalRivals: ['Stoicism', 'Academic and Pyrrhonian skepticism', 'Providential cosmology'],
      laterInfluence: ['Lucretius', 'Renaissance atomism', 'Early modern materialism'], commonMisconception: 'Epicurean pleasure is not luxury consumption or indiscriminate gratification.',
      transmission: 'Most of Epicurus’ large output is lost; later witnesses and damaged papyri preserve the school unevenly.',
    },
    keyIdeas: ['Natural explanation dissolves fear of divine punishment.', 'Simple stable pleasure is preferable to escalating desire.', 'Friendship is both security and a constitutive good.'],
    keyWorks: ['Letter to Herodotus', 'Letter to Menoeceus', 'Principal Doctrines', 'Lucretius, De rerum natura'],
    sections: [
      {heading: 'Physics serving ethics', paragraphs: ['Atoms and void are not a detached science exhibit. By explaining mind, death, weather, and celestial events without punitive providence, Epicurean physics removes sources of anxiety.']},
      {heading: 'The social Garden', paragraphs: ['The Garden formed a continuing community rather than a private technique. Surviving names and portraits show how friendship, teaching succession, and shared memory sustained the school.']},
      {heading: 'Fragments and opponents', paragraphs: ['Diogenes Laertius preserves crucial Epicurean texts centuries later. Lucretius is indispensable but writes poetry in Latin; Cicero and Plutarch preserve information while arguing against the school.']},
    ],
    objectInterpretations: {
      'epicureanism-double-herm': 'The joined portraits of Epicurus and Metrodorus materialize philosophical friendship and collective memory. The object is a restored Roman copy after a Greek model, not a surviving Garden original.',
      'epicureanism-lucretius-manuscript': 'This illuminated 1483 manuscript shows an ancient materialist poem crossing fifteen centuries of copying. It is evidence of Renaissance transmission, not an ancient witness.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Epicurus', url: 'https://plato.stanford.edu/entries/epicurus/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Epicurus', url: 'https://iep.utm.edu/epicur/', kind: 'academic-reference'},
      {label: 'Diogenes Laertius Book X — Epicurean texts', url: 'https://www.attalus.org/old/diogenes10c.html', kind: 'primary-text'},
      {label: 'Digital Vatican Library — Vat. lat. 1569', url: 'https://digi.vatlib.it/view/MSS_Vat.lat.1569', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'stoicism'}], articleRoute: {kind: 'branch', branchId: 'epicureanism'},
  },
  stoicism: {
    hallId: 'ancient-greek', id: 'stoicism', kind: 'tradition', name: 'Stoicism', dateLabel: 'Founded c. 300 BCE', entityType: 'Hellenistic and Roman philosophical system',
    centralQuestion: 'What constitutes rational agency and flourishing inside a causally ordered cosmos?',
    lead: 'Stoicism asks how a person can live freely in a world governed by causes beyond individual control. Founded by Zeno of Citium around 300 BCE, it joined logic, physics, and ethics into one system. The cosmos is an ordered, living whole structured by divine reason, or logos. Human beings participate in that reason, but their freedom lies not in escaping causation: it lies in examining impressions, withholding mistaken assent, and choosing in accordance with a rational understanding of nature. Virtue is the only unconditional good. Health, wealth, reputation, and even life are not worthless, but their value depends on how they are used. Stoic training therefore aims at sound judgment rather than emotional anesthesia. Passions such as destructive fear or anger involve mistaken evaluations; apatheia means freedom from those disordered judgments, not suppression of every feeling. The same rational nature grounds duties to family, city, and an expanding human community. The early school was shaped by Zeno, Cleanthes, and especially Chrysippus. Later Stoicism appears through Seneca, Musonius Rufus, Epictetus, and Marcus Aurelius.',
    tradition: {
      origin: 'Zeno’s teaching at the Painted Stoa around 300 BCE', place: 'Athens, later the wider Greek and Roman worlds', historicalPeriod: 'Hellenistic period through Roman imperial antiquity',
      earlyFigures: ['Zeno of Citium', 'Cleanthes', 'Chrysippus'], majorRepresentatives: ['Panaetius', 'Posidonius', 'Seneca', 'Musonius Rufus', 'Epictetus', 'Marcus Aurelius'],
      characteristicPractices: ['Examination of impressions', 'Premeditation and review', 'Role-based duties', 'Attention to assent'], centralDoctrines: ['Virtue as the only good', 'Logos and providential nature', 'Oikeiōsis', 'Passions as evaluative judgments'],
      sourceTraditions: ['Fragments of early Stoics', 'Cicero', 'Seneca', 'Epictetus through Arrian', 'Marcus Aurelius'], principalRivals: ['Epicureanism', 'Academic skepticism', 'Peripatetic ethics'],
      laterInfluence: ['Roman ethics', 'Christian moral vocabulary', 'Renaissance humanism', 'Modern virtue and emotion theory'], commonMisconception: 'Stoicism is not emotional concealment, passive resignation, or a single control slogan.',
      transmission: 'Almost all works by the founders are lost, so early doctrine is reconstructed through fragments and later witnesses.',
    },
    keyIdeas: ['Agency centers on assent and intention rather than guaranteed outcomes.', 'Virtue alone is unconditionally good; externals are preferred or dispreferred without determining character.', 'Reason situates duties within a shared human community.'],
    keyWorks: ['Cleanthes, Hymn to Zeus', 'Seneca, Moral Letters', 'Epictetus, Discourses and Handbook', 'Marcus Aurelius, Meditations'],
    sections: [
      {heading: 'One system, three fields', paragraphs: ['Stoic logic, physics, and ethics were mutually supporting. A theory of language and inference, a corporeal providential cosmos, and a disciplined account of judgment belong to the same project.']},
      {heading: 'Greek foundations, Roman witnesses', paragraphs: ['Roman works are exceptionally vivid but do not replace the early school. Chrysippus was the decisive systematizer, although his extensive writings survive only in fragments and reports.']},
      {heading: 'Practice without simplification', paragraphs: ['The familiar distinction between what is and is not “up to us” is one practice inside a larger account of nature, responsibility, emotion, social duty, and value.']},
    ],
    objectInterpretations: {
      'stoicism-zeno-naples': 'The bust gives the founder a focal presence while teaching how ancient portraits are attributed through comparison. No surviving inscription secures this identification.',
      'stoicism-marcus-aurelius-bust': 'An ancient imperial portrait demonstrates Stoicism’s movement into Roman political life. Marcus is an important practitioner, not a substitute for the entire system or an exemption from judging imperial power.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Stoicism', url: 'https://plato.stanford.edu/entries/stoicism/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Stoicism', url: 'https://iep.utm.edu/stoicism/', kind: 'academic-reference'},
      {label: 'Project Gutenberg — Epictetus selections', url: 'https://www.gutenberg.org/ebooks/10661', kind: 'primary-text'},
      {label: 'Louvre — Marcus Aurelius, Ma 1166', url: 'https://collections.louvre.fr/ark:/53355/cl010275331', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'skepticism'}], articleRoute: {kind: 'branch', branchId: 'stoicism'},
  },
  skepticism: {
    hallId: 'ancient-greek', id: 'skepticism', kind: 'tradition', name: 'Ancient Skepticism', dateLabel: '3rd century BCE–c. 3rd century CE', entityType: 'Academic and Pyrrhonian movements',
    centralQuestion: 'How should inquiry and action continue when no criterion decisively resolves disagreement?',
    lead: 'Ancient skepticism is not simply the claim that nothing can be known. Its name derives from skepsis, inquiry. Skeptics begin from persistent disagreement: equally persuasive arguments, conflicting appearances, and rival criteria for deciding which impressions are true. Rather than force a conclusion, they investigate what happens when judgment is suspended. Two major traditions developed. Academic skeptics such as Arcesilaus and Carneades used Plato’s Academy to challenge Stoic claims to knowledge and explored how action remains possible without certainty. Pyrrhonian skeptics associated themselves with Pyrrho, later systematized modes of opposition, and sought epochē—suspension of judgment—when competing accounts balanced one another. Sextus Empiricus reports that tranquility may then follow unexpectedly, while daily life continues through appearances, habits, skills, and ordinary needs. These traditions disagree, and their own positions remain contested. Was Academic argument purely dialectical, or did some Academics affirm that knowledge is impossible? Does a Pyrrhonist live without beliefs, or only without theoretical commitments? The exhibit presents skepticism as an active discipline of intellectual restraint: neither blanket denial nor indifference.',
    tradition: {
      origin: 'Pyrrho and the skeptical Academy developed distinct lineages from the late fourth and third centuries BCE', place: 'Elis, Athens, and later Mediterranean philosophical and medical contexts', historicalPeriod: 'Hellenistic and Roman antiquity',
      earlyFigures: ['Pyrrho', 'Timon', 'Arcesilaus'], majorRepresentatives: ['Carneades', 'Aenesidemus', 'Agrippa', 'Sextus Empiricus', 'Cicero'],
      characteristicPractices: ['Opposing arguments', 'Suspension of judgment', 'Following appearances in ordinary life', 'Continued investigation'], centralDoctrines: ['Equipollence', 'Epochē', 'Modes of skepticism', 'Practical criteria without dogmatic certainty'],
      sourceTraditions: ['Sextus Empiricus', 'Cicero, Academica', 'Diogenes Laertius IX', 'Fragments and later reports'], principalRivals: ['Stoic epistemology', 'Epicurean criteria', 'Dogmatic philosophical systems'],
      laterInfluence: ['Augustine’s anti-skeptical arguments', 'Renaissance recovery of Sextus', 'Early modern epistemology'], commonMisconception: 'Ancient skeptics do not merely doubt everything or dogmatically deny that truth can be found.',
      transmission: 'Most early Academic and Pyrrhonian writings are lost; Sextus and Cicero carry disproportionate evidential weight.',
    },
    keyIdeas: ['Inquiry can continue without forced assent.', 'Equipollent arguments motivate suspension rather than a new dogma.', 'Pyrrhonian practice follows appearances and ordinary capacities without theoretical commitment.'],
    keyWorks: ['Sextus Empiricus, Outlines of Pyrrhonism', 'Sextus, Adversus mathematicos', 'Cicero, Academica', 'Diogenes Laertius IX'],
    sections: [
      {heading: 'Two skeptical traditions', paragraphs: ['Academic skepticism developed within Plato’s school and often argued dialectically against Stoic certainty. Pyrrhonism formed another lineage, revived by Aenesidemus and known chiefly through Sextus.']},
      {heading: 'Action without certainty', paragraphs: ['Ancient critics asked whether suspension makes life impossible. Skeptical replies appeal to appearances, ordinary practices, skills, and persuasive impressions without converting them into claims of secure apprehension.']},
      {heading: 'Rediscovery', paragraphs: ['The Latin printing of Sextus helped early modern readers reopen problems about criteria, disagreement, and justification. The printed title page in this gallery belongs to that afterlife, not to Sextus’ own century.']},
    ],
    objectInterpretations: {
      'skepticism-sextus-riedel': 'No authenticated portrait of Sextus survives. Riedel’s engraving shows the later desire to give an elusive textual authority a face; its supposed medal source does not authenticate the likeness.',
      'skepticism-adversus-mathematicos': 'The 1569 title page records the Renaissance transmission of Sextus through Latin print. It is neither an authorial copy nor an ancient manuscript.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Ancient Skepticism', url: 'https://plato.stanford.edu/entries/skepticism-ancient/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Ancient Greek Skepticism', url: 'https://iep.utm.edu/ancient-greek-skepticism/', kind: 'academic-reference'},
      {label: 'Project Gutenberg — Sextus Empiricus and Greek Scepticism (1899)', url: 'https://www.gutenberg.org/ebooks/17556', kind: 'academic-reference'},
      {label: 'Wikimedia Commons — 1569 Adversus mathematicos', url: 'https://commons.wikimedia.org/wiki/File:Sexti_Empirici_Adversus_mathematicos.djvu', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'neoplatonism'}], articleRoute: {kind: 'branch', branchId: 'skepticism'},
  },
  neoplatonism: {
    hallId: 'ancient-greek', id: 'neoplatonism', kind: 'tradition', name: 'Neoplatonism', dateLabel: '3rd–6th centuries CE', entityType: 'Late-antique Platonic tradition',
    centralQuestion: 'How do multiplicity and embodied life depend on unity, and how can the soul return toward its source?',
    lead: 'Neoplatonism is a modern name for the dominant Platonic philosophy of Late Antiquity. Its thinkers called themselves Platonists and understood their work as interpretation rather than invention. Beginning with Plotinus in the third century CE, they developed a comprehensive account of how multiplicity depends on unity and how the soul can return intellectually and ethically toward its source. Plotinus places the One, or Good, beyond being and ordinary thought. Intellect proceeds from the One and contains the intelligible Forms; Soul proceeds from Intellect and gives order and life to the sensible cosmos. This procession is not a temporal act of creation from nothing. Reality remains dependent on higher principles while turning back toward them through contemplation, virtue, and self-knowledge. Later Platonists transformed the framework. Porphyry organized Plotinus’ writings; Iamblichus emphasized ritual theurgy; Proclus built a highly articulated metaphysical system; and commentators sought harmony between Plato and Aristotle. Their influence moved through Christian, Jewish, and Islamic thought and into Ficino’s Renaissance translations. The label can therefore mislead if it suggests one uniform school or a departure its members acknowledged.',
    tradition: {
      origin: 'Plotinus’ third-century Platonism and its late-antique successors', place: 'Rome, Syria, Athens, Alexandria, and connected intellectual centers', historicalPeriod: 'Mid-third through sixth centuries CE, with longer reception',
      earlyFigures: ['Plotinus', 'Porphyry'], majorRepresentatives: ['Iamblichus', 'Hypatia', 'Syrianus', 'Proclus', 'Damascius', 'Simplicius'],
      characteristicPractices: ['Commentary', 'Contemplation', 'Ethical purification', 'Theurgy in some later schools'], centralDoctrines: ['The One or Good', 'Intellect and Forms', 'Soul', 'Procession and return', 'Participation'],
      sourceTraditions: ['Plotinus, Enneads', 'Porphyry, Life of Plotinus', 'Iamblichus', 'Proclus', 'Late-antique commentaries'], principalRivals: ['Gnostic cosmologies', 'Competing Platonic interpretations', 'Some Aristotelian objections'],
      laterInfluence: ['Augustine', 'Pseudo-Dionysius', 'Islamic and Jewish philosophy', 'Byzantine philosophy', 'Ficino and Renaissance Platonism'], commonMisconception: 'Neoplatonists did not call themselves “new Platonists,” and procession is not simply creation from nothing.',
      transmission: 'Porphyry’s thematic edition preserves nearly all Plotinus; later translations sometimes circulated under misleading attributions.',
    },
    keyIdeas: ['Multiplicity depends on higher unity without exhausting it.', 'Intellect contains the Forms; Soul orders and animates the sensible cosmos.', 'Philosophical return combines understanding, virtue, and—in later schools—ritual practice.'],
    keyWorks: ['Plotinus, Enneads', 'Porphyry, Life of Plotinus and Isagoge', 'Iamblichus, On the Mysteries', 'Proclus, Elements of Theology'],
    sections: [
      {heading: 'A modern label', paragraphs: ['“Neoplatonism” is useful for historians but partial. Plotinus and his successors claimed to explain Plato, not to found a movement defined by novelty. Their disagreements show a tradition rather than one doctrine.']},
      {heading: 'Procession and return', paragraphs: ['The One is not one being among others. Intellect and Soul depend on it in an ordered procession, while contemplation and virtue describe a return toward intelligible unity rather than travel through physical space.']},
      {heading: 'Transmission across traditions', paragraphs: ['Porphyry’s Enneads shaped the Greek corpus; adapted Plotinian material entered Arabic under the title Theology of Aristotle; Ficino’s translation and notes renewed Plotinus for Renaissance Europe.']},
    ],
    objectInterpretations: {
      'neoplatonism-plotinus-ostia': 'The third-century Ostia head offers historical proximity but not certainty. Its identification as Plotinus is conventional and plausible rather than proven.',
      'neoplatonism-ficino-enneads': 'Ficino’s dense annotations make Renaissance interpretation visible. This working manuscript documents active transmission, not an ancient or authorial copy.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Neoplatonism', url: 'https://plato.stanford.edu/entries/neoplatonism/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Plotinus', url: 'https://plato.stanford.edu/entries/plotinus/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Neo-Platonism', url: 'https://iep.utm.edu/neoplato/', kind: 'academic-reference'},
      {label: 'BnF/Biblissima — Grec 1816', url: 'https://iiif.biblissima.fr/collections/manifest/9dfa82a5d723a64a9fc28429d3028c8d5a218598', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'plato'}, {hallId: 'medieval-worlds', exhibitId: 'augustine'}], articleRoute: {kind: 'branch', branchId: 'neoplatonism'},
  },
  augustine: {
    hallId: 'medieval-worlds', id: 'augustine', kind: 'philosopher', name: 'Augustine', originalName: 'Aurelius Augustinus', dateLabel: '354–430 CE', entityType: 'Roman North African Christian philosopher and bishop',
    centralQuestion: 'How do memory, time, will, evil, and grace reshape the inward life?',
    lead: 'Augustine carried late Roman philosophy into Christian argument without simply placing doctrine on top of a classical system. Born in Thagaste in Roman North Africa, he trained in rhetoric, joined the Manichaean religion, passed through Academic skepticism, and encountered Latin Platonist writings in Milan. His conversion and baptism did not end that intellectual history: they redirected it toward creation, incarnation, sin, grace, and scriptural interpretation. In Confessions, memory becomes an immense interior field and time a distension of a mind stretched among attention, recollection, and expectation. Evil is not a rival substance but a privation within created goods; human willing is real yet divided, dependent, and—in Augustine’s later works—unable to heal itself without grace. As bishop of Hippo Regius, he wrote amid controversy, pastoral administration, imperial coercion, and the political shock of Rome’s sack. His surviving books, sermons, and letters are unusually abundant, but Confessions remains a crafted theological narrative rather than transparent autobiography. Augustine’s arguments about coercion, sexuality, predestination, and political authority continue to generate moral and interpretive dispute alongside his enduring accounts of inwardness, love, memory, and time.',
    biography: {
      born: '354 CE, Thagaste in Roman North Africa', died: '430 CE, Hippo Regius', associatedPlaces: ['Thagaste', 'Carthage', 'Rome', 'Milan', 'Cassiciacum', 'Ostia', 'Hippo Regius'], era: 'Late Roman Empire and late-antique Christianity', affiliations: ['Latin rhetorical education', 'Christian church at Hippo', 'North African episcopal networks'],
      influencedBy: ['Cicero', 'Manichaeism and Academic skepticism as rejected positions', 'Latin Platonism', 'Ambrose', 'Paul and Christian scripture'], studentsOrFollowers: ['Latin medieval theologians', 'Anselm', 'Aquinas', 'Reformation readers'],
      sourceSituation: 'A large corpus of books, letters, and sermons survives; autobiographical passages are philosophically and theologically shaped.', knownFor: ['Memory and inwardness', 'Time as distension', 'Evil as privation', 'Divided will', 'Grace and ordered love'],
    },
    keyIdeas: ['Evil is a corruption or privation of good, not an independent substance.', 'The mind experiences time through attention, memory, and expectation.', 'Freedom, responsibility, habit, and grace meet in a will that can be divided against itself.'],
    keyWorks: ['Confessions', 'On Free Choice of the Will', 'On Christian Teaching', 'On the Trinity', 'City of God', 'Letters and sermons'],
    sections: [
      {heading: 'Platonism transformed', paragraphs: ['Augustine adapts immaterial truth and ascent while rejecting an eternal cosmos and placing creation, incarnation, sin, and grace at the center. The doorway from Neoplatonism therefore marks inheritance through disagreement, not simple school succession.']},
      {heading: 'A bishop in conflict', paragraphs: ['Donatist controversy, Pelagian debate, imperial law, and pastoral responsibility shaped Augustine’s arguments. His defense of coercion and increasingly strong account of predestination remain central interpretive and ethical tensions.']},
      {heading: 'The two cities', paragraphs: ['City of God does not map neatly onto church versus state. Its two cities are communities ordered by different loves, intermingled in history rather than identifiable with two institutions.']},
    ],
    objectInterpretations: {
      'augustine-lateran': 'This posthumous sixth-century image is historically early for Augustine’s portrait tradition but remains a traditional identification, not a likeness made from life.',
      'augustine-city-of-god': 'The late-medieval illumination places Augustine among philosophers. It records the work’s teaching and reception centuries after both author and ancient interlocutors.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Saint Augustine', url: 'https://plato.stanford.edu/entries/augustine/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Augustine’s political and social philosophy', url: 'https://iep.utm.edu/augustine-political-and-social-philosophy/', kind: 'academic-reference'},
      {label: 'Project Gutenberg — Confessions of Saint Augustine', url: 'https://www.gutenberg.org/ebooks/3296', kind: 'primary-text'},
      {label: 'Utrecht University Library — City of God manuscript image', url: 'https://commons.wikimedia.org/wiki/File:Civitate_Dei-UBU_Hs._42-f.001v-Augustinus_en_de_filosofen.jpg', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'neoplatonism'}, {hallId: 'medieval-worlds', exhibitId: 'boethius'}, {hallId: 'medieval-worlds', exhibitId: 'aquinas'}], articleRoute: {kind: 'philosopher', philosopherId: 'augustine'},
  },
  boethius: {
    hallId: 'medieval-worlds', id: 'boethius', kind: 'philosopher', name: 'Boethius', originalName: 'Anicius Manlius Severinus Boethius', dateLabel: 'c. 475/477–524/526 CE', entityType: 'Roman senator, logician, theologian, and author',
    centralQuestion: 'Can freedom and happiness survive fortune, imprisonment, and providence?',
    lead: 'Boethius stood inside several worlds that later histories too quickly divide. A Roman senator serving the Ostrogothic king Theoderic, he translated and commented on Greek logic, wrote on arithmetic and music, formulated influential Christian theological distinctions, and composed a prison dialogue in which Lady Philosophy—not an explicitly Christian speaker—treats grief, fortune, happiness, providence, and freedom. His larger plan to translate Plato and Aristotle was never completed, yet his Latin versions and explanations of Aristotle and Porphyry supplied much of the logical curriculum available to early medieval Latin readers. In Consolation of Philosophy, unstable Fortune exposes the fragility of status and possession while Philosophy relocates happiness in a good not subject to confiscation. The work’s famous account of divine eternity proposes that God knows temporal events from an eternal present without that knowledge making free events simply necessary. Boethius wrote the Consolation after arrest on disputed charges; the circumstances of his trial, imprisonment, and execution remain uncertain, as does the exact death year. Its classical dramatic form has supported Christian, philosophical, ironic, and dialogical readings. Calling him the last Roman or first scholastic can orient a visitor, but neither label captures the continuity and incompleteness of his late-antique project.',
    biography: {
      born: 'c. 475/477 CE, probably Rome', died: '524/526 CE, probably Pavia', associatedPlaces: ['Rome', 'Ravenna', 'Pavia'], era: 'Ostrogothic Italy and late-antique Latin culture', affiliations: ['Roman Senate', 'Theoderic’s court', 'Latin logical and Christian scholarly networks'],
      influencedBy: ['Aristotle', 'Porphyry', 'Cicero', 'Late-antique Neoplatonic curricula', 'Christian theological debate'], studentsOrFollowers: ['Cassiodorus', 'Early Latin logicians', 'Scholastic commentators', 'Chaucer and vernacular translators'],
      sourceSituation: 'Substantial logical, mathematical, theological, and literary works survive; the trial record and death chronology remain uncertain.', knownFor: ['Consolation and Fortune', 'Providence and freedom', 'Latin logical transmission', 'Person and nature', 'Quadrivial education'],
    },
    keyIdeas: ['Fortune reveals that external goods cannot secure stable happiness.', 'Divine eternity is an at-once mode of life, not merely endless time.', 'Logical translation and commentary are acts of intellectual reconstruction as well as preservation.'],
    keyWorks: ['Consolation of Philosophy', 'Commentaries on Porphyry’s Isagoge', 'Translations and commentaries on Aristotle’s logic', 'De institutione arithmetica', 'De institutione musica', 'Theological tractates'],
    sections: [
      {heading: 'A curriculum carried into Latin', paragraphs: ['Boethius’s categories, syllogisms, and discussion of universals became basic instruments for later Latin inquiry. What survived was consequential but smaller than his announced Greek-to-Latin program.']},
      {heading: 'Philosophy in prison', paragraphs: ['The Consolation stages a patient re-education rather than a simple list of answers. Poetry, dialogue, memory, and argument move the prisoner from resentment toward a larger view of order and responsibility.']},
      {heading: 'A debated religious voice', paragraphs: ['The relative silence of explicit Christianity in the Consolation is not evidence that can be resolved by assumption. Its relation to the theological tractates remains an interpretive problem, not a reason to deny either corpus.']},
    ],
    objectInterpretations: {
      'boethius-consolation-teaching': 'A fourteenth-century illumination imagines Boethius as a medieval teacher. Its classroom belongs to reception history, not sixth-century portrait evidence.',
      'boethius-arithmetic': 'This ninth-century copy shows Boethius’s mathematical curriculum at work in Carolingian manuscript culture; it is neither his hand nor a late-Roman original.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Anicius Manlius Severinus Boethius', url: 'https://plato.stanford.edu/entries/boethius/', kind: 'academic-reference'},
      {label: 'Project Gutenberg — Consolation of Philosophy', url: 'https://www.gutenberg.org/ebooks/14328', kind: 'primary-text'},
      {label: 'University of Glasgow — Boethius manuscript treasure', url: 'https://special.lib.gla.ac.uk/exhibns/treasures/boethius.html', kind: 'collection-record'},
      {label: 'Bamberg manuscript — De institutione arithmetica', url: 'https://commons.wikimedia.org/wiki/File:Boethius,_De_institutione_arithmetica,_Bamberg_Ms._Class._5.jpg', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'aristotle'}, {hallId: 'medieval-worlds', exhibitId: 'augustine'}, {hallId: 'medieval-worlds', exhibitId: 'aquinas'}, {hallId: 'medieval-worlds', exhibitId: 'ockham'}], articleRoute: {kind: 'philosopher', philosopherId: 'boethius'},
  },
  avicenna: {
    hallId: 'medieval-worlds', id: 'avicenna', kind: 'philosopher', name: 'Ibn Sina / Avicenna', originalName: 'أبو علي الحسين بن عبد الله بن سينا', dateLabel: 'c. 970s/980–1037', entityType: 'Persian polymath writing principally in Arabic',
    centralQuestion: 'What distinguishes what a thing is from the fact that it exists?',
    lead: 'Ibn Sina built one of the most ambitious philosophical systems of the medieval world. Raised near Bukhara and later moving among Persianate courts, he practiced medicine, advised rulers, administered, taught, and wrote principally in Arabic across logic, natural philosophy, psychology, metaphysics, medicine, and other sciences. The Cure is a philosophical and scientific encyclopedia, not a medical book; the Canon of Medicine is its famous medical counterpart. In metaphysics, Ibn Sina distinguishes essence—what something is—from existence—that it is. Everything merely possible in itself requires a cause, while the ordered dependence of possible beings points to the Necessary Existent, whose existence is not received from another. His psychology argues that the human soul is not reducible to body; the Flying Man thought experiment isolates self-awareness without serving as a simple proof of modern Cartesian dualism. His theories of intellect, prophecy, emanation, and divine knowledge transformed both philosophy and theology. A dictated autobiography, continued by his student al-Juzjani, offers rare testimony but is also crafted self-presentation. Ibn Sina should not appear as a courier carrying Aristotle westward: later Islamic thinkers argued inside an Avicennian conceptual world, while Jewish and Latin readers translated, criticized, and rebuilt it.',
    biography: {
      born: 'c. 970s/980, Afshana near Bukhara', died: '1037, Hamadan', associatedPlaces: ['Afshana', 'Bukhara', 'Gurganj', 'Jurjan', 'Rayy', 'Hamadan', 'Isfahan'], era: 'Persianate courts and Arabic-language intellectual culture', affiliations: ['Court medicine and administration', 'Philosophical teaching circles', 'Arabic scientific and logical traditions'],
      influencedBy: ['Aristotle', 'Al-Farabi', 'Late-antique commentators', 'Arabic logic, theology, and science'], studentsOrFollowers: ['Al-Juzjani', 'Post-Avicennian philosophers and theologians', 'Maimonides', 'Aquinas', 'Latin scholastics'],
      sourceSituation: 'A large corpus survives; the autobiography was dictated by Ibn Sina and continued by al-Juzjani, and the birth chronology remains debated.', knownFor: ['Essence and existence', 'Necessary Existent', 'Logic and demonstration', 'Soul and self-awareness', 'Canon of Medicine'],
    },
    keyIdeas: ['Possible beings receive existence through causes; the Necessary Existent does not.', 'Essence and existence are conceptually distinct in everything caused.', 'Self-awareness and the soul cannot be explained as only a report from the external senses.'],
    keyWorks: ['The Cure (al-Shifa)', 'Canon of Medicine', 'The Salvation', 'Book of Knowledge', 'Pointers and Reminders'],
    sections: [
      {heading: 'A system beyond Aristotle', paragraphs: ['Ibn Sina reorganized Aristotelian and late-antique materials into a new architecture. His logic and metaphysics became starting points that later theologians could criticize only by learning their tools.']},
      {heading: 'Medicine, court, and mobility', paragraphs: ['The moving sequence of courts, appointments, conflicts, and medical practice matters. Philosophy was produced through patronage, administration, travel, teaching, and scientific work rather than in one timeless schoolroom.']},
      {heading: 'Many receptions', paragraphs: ['Arabic, Persian, Hebrew, and Latin readers did not inherit one Avicenna. They translated different texts and disputed necessity, creation, soul, divine knowledge, and prophecy in their own institutional settings.']},
    ],
    objectInterpretations: {
      'avicenna-canon': 'The illuminated Canon anchors Ibn Sina in medical and manuscript history. It is a fifteenth-century Persian witness, not an authorial copy.',
      'avicenna-thevet-portrait': 'Thevet’s sixteenth-century woodcut supplied European readers with a face for Avicenna long after his death. It is explicitly reception art, not likeness evidence.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Ibn Sina', url: 'https://plato.stanford.edu/entries/ibn-sina/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Avicenna', url: 'https://iep.utm.edu/avicenna-ibn-sina/', kind: 'academic-reference'},
      {label: 'Open Library — Metaphysics of The Healing', url: 'https://openlibrary.org/books/OL17174000M/The_metaphysics_of_The_healing', kind: 'primary-text'},
      {label: 'National Library of Medicine — Canon manuscript image', url: 'https://commons.wikimedia.org/wiki/File:Qanun_Avicenna_NLM.jpg', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'aristotle'}, {hallId: 'medieval-worlds', exhibitId: 'al-ghazali'}, {hallId: 'medieval-worlds', exhibitId: 'averroes'}, {hallId: 'medieval-worlds', exhibitId: 'maimonides'}, {hallId: 'medieval-worlds', exhibitId: 'aquinas'}], articleRoute: {kind: 'philosopher', philosopherId: 'avicenna'},
  },
  'al-ghazali': {
    hallId: 'medieval-worlds', id: 'al-ghazali', kind: 'philosopher', name: 'al-Ghazali', originalName: 'أبو حامد محمد الغزالي', dateLabel: 'c. 1056/1058–1111', entityType: 'Persian theologian, jurist, philosopher, and Sufi author',
    centralQuestion: 'Where does philosophical demonstration succeed—and where does it overreach?',
    lead: 'Al-Ghazali did not end Islamic philosophy, reject logic, or replace inquiry with unreason. Educated in law and Asharite theology, he became a celebrated teacher at Baghdad’s Nizamiyya before leaving public office during a personal and religious crisis. His later account, Deliverance from Error, narrates a search among theologians, philosophers, authoritative teachers, and Sufis, but it is a constructed intellectual autobiography rather than a neutral diary. To criticize the philosophers, al-Ghazali first presented their program with formidable accuracy. In Incoherence of the Philosophers he attacks twenty theses associated especially with al-Farabi and Ibn Sina, judging three incompatible with Islam: the world’s eternity, a restriction of divine knowledge to universals, and denial of bodily resurrection. His discussion of causation questions whether observed conjunction demonstrates necessary power in created things; it does not simply claim that fire never burns or that causal language is useless. Logic and Avicennian distinctions subsequently entered theology through writers who contested philosophical conclusions. Al-Ghazali also joined jurisprudence, ethics, disciplined spiritual practice, and Sufi transformation in the Revival of the Religious Sciences. His work is therefore a critique from deep engagement, not a cultural shutter descending between Avicenna and Averroes.',
    biography: {
      born: 'c. 1056/1058, Tus', died: '1111, Tus', associatedPlaces: ['Tus', 'Nishapur', 'Baghdad', 'Damascus', 'Jerusalem', 'Hebron', 'Mecca'], era: 'Seljuk Sunni intellectual culture', affiliations: ['Asharite theology', 'Shafii law', 'Nizamiyya madrasa', 'Sufi practice'],
      influencedBy: ['Al-Juwayni', 'Ibn Sina and al-Farabi', 'Asharite kalam', 'Jurisprudence', 'Sufi traditions'], studentsOrFollowers: ['Later Sunni theologians', 'Sufi ethicists', 'Hebrew and Latin readers', 'Averroes as critic'],
      sourceSituation: 'Many works survive; autobiographical chronology and the traditional birth year require caution, and manuscript dates vary.', knownFor: ['Incoherence critique', 'Causation and divine freedom', 'Use of logic', 'Ethical purification', 'Theology and Sufism'],
    },
    keyIdeas: ['A conclusion is demonstrated only when its premises and necessity survive exact scrutiny.', 'Observed regularity does not by itself establish an independent necessary power in created causes.', 'Intellectual certainty and ethical transformation cannot be separated from disciplined formation.'],
    keyWorks: ['Incoherence of the Philosophers', 'Intentions of the Philosophers', 'Deliverance from Error', 'Revival of the Religious Sciences', 'Niche of Lights', 'Faysal al-tafriqa'],
    sections: [
      {heading: 'Critique by mastery', paragraphs: ['Al-Ghazali’s philosophical summaries helped transmit the very vocabulary he contested. The opposition between falsafa and kalam is real, but neither side remained conceptually untouched.']},
      {heading: 'Causation without caricature', paragraphs: ['His famous fire-and-cotton example tests claims of logical necessity and independent causal power. Interpretations range from occasionalism to accounts that allow stable created natures under divine agency.']},
      {heading: 'A plural intellectual life', paragraphs: ['Law, theology, logic, educational office, retreat, and Sufi practice belong together in his project. “Mystic versus rationalist” divides roles that he deliberately sought to discipline and integrate.']},
    ],
    objectInterpretations: {
      'al-ghazali-asas-al-qiyas': 'This undated manuscript page anchors al-Ghazali’s engagement with analogical reasoning. The digital upload date is not the object date, and the scribe is unknown.',
      'al-ghazali-faysal': 'The Faysal witness concerns the boundaries of doctrinal judgment. Its unknown date and scribe are left visible rather than converted into false precision.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — al-Ghazali', url: 'https://plato.stanford.edu/entries/al-ghazali/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — al-Ghazali', url: 'https://iep.utm.edu/al-ghazali/', kind: 'academic-reference'},
      {label: 'Library of Congress — Incoherence manuscript', url: 'https://www.loc.gov/resource/gdcwdl.wdl_07456/?st=list', kind: 'collection-record'},
      {label: 'Süleymaniye Library manuscript image — Asas al-qiyas', url: 'https://commons.wikimedia.org/wiki/File:Asas_alqiyas_manuscript.jpg', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'medieval-worlds', exhibitId: 'avicenna'}, {hallId: 'medieval-worlds', exhibitId: 'averroes'}], articleRoute: {kind: 'philosopher', philosopherId: 'al-ghazali'},
  },
  averroes: {
    hallId: 'medieval-worlds', id: 'averroes', kind: 'philosopher', name: 'Ibn Rushd / Averroes', originalName: 'أبو الوليد محمد بن أحمد بن رشد', dateLabel: '1126–1198', entityType: 'Andalusian jurist, physician, philosopher, and Aristotelian commentator',
    centralQuestion: 'How can demonstration, law, and scriptural interpretation belong to one intellectual life?',
    lead: 'Ibn Rushd worked simultaneously as a Maliki jurist, judge, physician, court intellectual, and philosophical commentator in the Almohad world. His short, middle, and long commentaries sought to reconstruct Aristotle’s arguments with unusual precision, but his project was neither antiquarian nor secular opposition to religion. The Decisive Treatise argues within Islamic law that demonstrative inquiry is an obligation for those qualified to practice it, because truthful interpretation cannot ultimately conflict with truth. Different audiences require different forms of discourse; when demonstration and a scripture’s apparent sense diverge, trained interpreters may read figuratively under disciplined rules. Against al-Ghazali, the Incoherence of the Incoherence defends philosophical reasoning while also revising Avicennian positions. Ibn Rushd’s mature theory of intellect, his account of the world’s eternal dependence, and the hierarchy of demonstrative, dialectical, and rhetorical methods remain difficult and contested. Many texts survive only in Hebrew or Latin, making translation part of the evidence itself. His temporary disgrace and exile are historical facts, but their causes are not secure enough for a simple tale of reason persecuted by faith. Latin “Averroism” and the slogan of double truth belong largely to later disputes; they should not be projected back as his own doctrine.',
    biography: {
      born: '1126, Córdoba', died: '1198, Marrakesh', associatedPlaces: ['Córdoba', 'Seville', 'Marrakesh', 'Lucena'], era: 'Al-Andalus and the Almohad caliphate', affiliations: ['Maliki law', 'Judicial office', 'Court medicine', 'Aristotelian commentary'],
      influencedBy: ['Aristotle', 'Al-Farabi', 'Ibn Bajja', 'Ibn Tufayl', 'Ibn Sina', 'Al-Ghazali'], studentsOrFollowers: ['Andalusian and Maghrebi readers', 'Hebrew translators and philosophers', 'Latin scholastics', 'Renaissance commentators'],
      sourceSituation: 'Arabic, Hebrew, and Latin witnesses preserve different parts of the corpus; the reasons for his disgrace and details of later biography are disputed.', knownFor: ['Aristotelian commentaries', 'Decisive Treatise', 'Law and philosophy', 'Theory of intellect', 'Critique of al-Ghazali'],
    },
    keyIdeas: ['Demonstration is a lawful vocation for appropriately trained inquirers.', 'Interpretation must respect both demonstrative truth and the pedagogical forms of scripture.', 'Commentary can reconstruct an argument while also becoming an original philosophical intervention.'],
    keyWorks: ['Long, middle, and short commentaries on Aristotle', 'Decisive Treatise', 'Incoherence of the Incoherence', 'Exposition of the Methods of Proof', 'Distinguished Jurist’s Primer', 'Colliget', 'Commentary on Plato’s Republic'],
    sections: [
      {heading: 'Commentary as research', paragraphs: ['Ibn Rushd compared texts, reordered arguments, and separated what he took to be Aristotle’s demonstrations from later accretions. The result influenced readers who often lacked the Arabic originals.']},
      {heading: 'No doctrine of double truth', paragraphs: ['Later Latin controversies described propositions as philosophically demonstrated yet theologically false. Ibn Rushd himself argues that truth cannot contradict truth, even when interpretation and audience differ.']},
      {heading: 'An uneven afterlife', paragraphs: ['His influence was substantial in Hebrew and Latin, but did not therefore disappear from Islamic contexts. Manuscript survival and institutional reception differ; neither a triumphalist West nor a story of total eastern silence is adequate.']},
    ],
    objectInterpretations: {
      'averroes-de-anima': 'The Latin De Anima commentary makes translation structurally visible. It is a thirteenth-century French witness to Michael Scot’s translation, not an Arabic autograph.',
      'averroes-lithograph': 'This nineteenth-century lithograph is a European traditional portrait with no claim to authentic likeness. Its medical collection context is itself part of Averroes’s reception.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Ibn Rushd', url: 'https://plato.stanford.edu/entries/ibn-rushd/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Averroes', url: 'https://iep.utm.edu/ibn-rushd-averroes/', kind: 'academic-reference'},
      {label: 'BnF — Latin commentary manuscript', url: 'http://classes.bnf.fr/idrisi/grand/5_01.htm', kind: 'collection-record'},
      {label: 'BIU Santé — Averrhoës lithograph', url: 'https://commons.wikimedia.org/wiki/File:Averrho%C3%ABs_CIPC0098.jpg', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'aristotle'}, {hallId: 'medieval-worlds', exhibitId: 'avicenna'}, {hallId: 'medieval-worlds', exhibitId: 'al-ghazali'}, {hallId: 'medieval-worlds', exhibitId: 'maimonides'}, {hallId: 'medieval-worlds', exhibitId: 'aquinas'}], articleRoute: {kind: 'philosopher', philosopherId: 'averroes'},
  },
  maimonides: {
    hallId: 'medieval-worlds', id: 'maimonides', kind: 'philosopher', name: 'Maimonides', originalName: 'משה בן מימון · Mūsā ibn Maymūn', dateLabel: '1138–1204', entityType: 'Jewish jurist, communal leader, physician, and philosopher',
    centralQuestion: 'How can language about God guide without pretending to comprehend God?',
    lead: 'Maimonides belongs to the Islamicate Mediterranean as well as to Jewish legal and philosophical history. Born in Córdoba, his family moved through periods of political pressure to Fez, Palestine, and finally Fustat near Cairo. There he practiced medicine, answered communities through letters and responsa, and created works of extraordinary legal and philosophical reach. The Mishneh Torah reorganizes rabbinic law into a systematic code; the Guide for the Perplexed, written in Judeo-Arabic, addresses educated readers troubled by apparent conflict between scripture and demonstration. Maimonides insists that positive descriptions cannot capture God’s essence: negative theology removes error and preserves divine simplicity rather than supplying a picture of what God is. His accounts of creation, prophecy, providence, law, and human perfection combine rigorous argument with deliberate literary difficulty. Contradictions in the Guide may mark pedagogy, esoteric strategy, or unresolved tension, and readers continue to disagree about how far his Aristotelian commitments extend. Rich manuscript and documentary evidence includes autograph pages, letters, and legal writings. Maimonides is not a Latin scholastic placed between two Christian thinkers; he is a Jewish author writing through Hebrew, Aramaic, and Arabic traditions whose works later crossed into Hebrew and Latin debates.',
    biography: {
      born: '1138, Córdoba', died: '1204, Fustat', associatedPlaces: ['Córdoba', 'Fez', 'Acre and Jerusalem', 'Fustat and Cairo'], era: 'Islamicate Mediterranean and medieval Jewish communities', affiliations: ['Rabbinic law', 'Jewish communal leadership', 'Court medicine', 'Judeo-Arabic philosophy'],
      influencedBy: ['Torah and Talmud', 'Aristotle', 'Al-Farabi', 'Ibn Sina', 'Kalam', 'Ibn Rushd’s commentaries'], studentsOrFollowers: ['Joseph ben Judah', 'Hebrew translators', 'Maimonidean and anti-Maimonidean readers', 'Aquinas', 'Early modern philosophers'],
      sourceSituation: 'Legal works, philosophical texts, responsa, letters, Geniza documents, and autograph manuscript pages survive; the Guide’s deliberate difficulty complicates interpretation.', knownFor: ['Negative theology', 'Guide for the Perplexed', 'Mishneh Torah', 'Law and formation', 'Prophecy and providence'],
    },
    keyIdeas: ['Negative predicates protect divine simplicity by removing creaturely error.', 'Law forms habits, communities, and understanding rather than serving only as command.', 'Scriptural interpretation and demonstration require disciplined attention to audience, language, and purpose.'],
    keyWorks: ['Guide for the Perplexed', 'Mishneh Torah', 'Commentary on the Mishnah', 'Treatise on Logic', 'Treatise on Resurrection', 'Letter on Astrology'],
    sections: [
      {heading: 'An autograph as identity', paragraphs: ['The manuscript anchor shows Maimonides’s own Judeo-Arabic handwriting and diagram. It resists the familiar modern portrait tradition by grounding identity in documented intellectual labor.']},
      {heading: 'Difficulty by design', paragraphs: ['The Guide warns that teaching about divine matters cannot proceed as a flat manual. Its arrangement, omissions, and apparent contradictions create divergent philosophical and theological readings.']},
      {heading: 'Law, reason, and community', paragraphs: ['The legal and philosophical corpora should not be separated into unrelated careers. Both ask how practices, institutions, and understanding orient human beings toward intellectual and ethical perfection.']},
    ],
    objectInterpretations: {
      'maimonides-mishnah-autograph': 'This folio carries Maimonides’s own handwriting and a Temple diagram. It is direct material evidence of authorship, though not a portrait.',
      'maimonides-mishneh-torah': 'The illuminated later copy shows how the legal code acquired prestige and visual form. It was produced centuries after the author and is not his working manuscript.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Maimonides', url: 'https://plato.stanford.edu/entries/maimonides/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Maimonides', url: 'https://iep.utm.edu/maimonid/', kind: 'academic-reference'},
      {label: 'Sefaria — Rambam texts', url: 'https://www.sefaria.org/topics/rambam?tab=popular-writing-of', kind: 'primary-text'},
      {label: 'Bodleian Libraries — Maimonides autograph image', url: 'https://commons.wikimedia.org/wiki/File:Maimonides_Commentary_on_the_Mishnah.jpg', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'medieval-worlds', exhibitId: 'avicenna'}, {hallId: 'medieval-worlds', exhibitId: 'averroes'}, {hallId: 'medieval-worlds', exhibitId: 'aquinas'}], articleRoute: {kind: 'philosopher', philosopherId: 'maimonides'},
  },
  aquinas: {
    hallId: 'medieval-worlds', id: 'aquinas', kind: 'philosopher', name: 'Thomas Aquinas', originalName: 'Thomas de Aquino', dateLabel: 'c. 1225–1274', entityType: 'Dominican theologian, philosopher, and university master',
    centralQuestion: 'How can created being, natural reason, and revealed theology form a disciplined synthesis?',
    lead: 'Thomas Aquinas worked in a thirteenth-century world transformed by new Latin translations of Aristotle and by Arabic and Jewish philosophical traditions. A Dominican educated at Naples, Paris, and Cologne, he taught, disputed, preached, commented on Aristotle, and wrote theological syntheses for distinct pedagogical purposes. His Summa Theologiae remains unfinished and is not simply a philosophy textbook: each article belongs to a theological ordering of objections, authorities, arguments, and replies. Aquinas uses Aristotelian act and potency, matter and form, causation, and virtue while also engaging Augustine, Pseudo-Dionysius, Ibn Sina, Ibn Rushd, Maimonides, and many others. Created things possess real natures and causal powers; their received acts of existence depend continually on God. Human reason can argue toward certain truths about God and morality, but revelation addresses truths and an ultimate end beyond unaided discovery. His views on analogy, natural law, soul, beatitude, and the virtues became enormously influential. Aquinas opposed a single separate intellect without reducing Ibn Rushd to caricature, and he held that reason alone could not prove the world had a temporal beginning. Posthumous condemnations, later Thomisms, and triumphal art should not be folded into one seamless “medieval synthesis.”',
    biography: {
      born: 'c. 1225, Roccasecca or the Aquino region', died: '1274, Fossanova', associatedPlaces: ['Roccasecca', 'Monte Cassino', 'Naples', 'Paris', 'Cologne', 'Orvieto', 'Rome', 'Fossanova'], era: 'Thirteenth-century Latin universities and mendicant orders', affiliations: ['Dominican Order', 'University of Paris', 'Papal and Dominican study houses'],
      influencedBy: ['Aristotle', 'Augustine', 'Albert the Great', 'Ibn Sina', 'Ibn Rushd', 'Maimonides', 'Pseudo-Dionysius'], studentsOrFollowers: ['Reginald of Piperno', 'Early Thomists', 'Catholic theological traditions', 'Natural-law theorists'],
      sourceSituation: 'A vast corpus survives, while reports of visions and the “straw” remark are later testimony requiring caution.', knownFor: ['Act and potency', 'Essence and existence', 'Analogy', 'Natural theology and law', 'Virtue and beatitude'],
    },
    keyIdeas: ['Created beings have received acts of existence and intelligible natures.', 'Reason and revelation are distinct but cannot finally contradict because truth is one.', 'Natural law names rational participation in practical order, not a list detached from virtue and community.'],
    keyWorks: ['Summa Theologiae', 'Summa contra Gentiles', 'On Being and Essence', 'Disputed Questions', 'Commentaries on Aristotle', 'On the Unity of the Intellect', 'On the Eternity of the World'],
    sections: [
      {heading: 'The scholastic article', paragraphs: ['Objections are not decorative straw figures. They place an issue inside live disputes before Aquinas offers a determination and returns to each challenge, making disagreement part of the method.']},
      {heading: 'Sources in conversation', paragraphs: ['Arabic and Jewish philosophers are not invisible suppliers of Aristotle. Aquinas cites, adapts, and opposes specific arguments about being, causation, intellect, creation, and divine language.']},
      {heading: 'A contested reception', paragraphs: ['The 1277 Paris condemnations touched positions associated with his environment, and later schools systematized him differently. Canonization and triumph images belong to reception, not proof that his synthesis ended debate.']},
    ],
    objectInterpretations: {
      'aquinas-summa': 'This fifteenth-century folio demonstrates the dense working format of scholastic study. It is a later copy, not Aquinas’s hand, and the Summa itself remained unfinished.',
      'aquinas-triumph': 'Gozzoli’s painting celebrates Dominican victory and places Averroes below Aquinas. The hierarchy is a polemical reception image, not a neutral map of transmission or an authentic portrait.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Thomas Aquinas', url: 'https://plato.stanford.edu/entries/aquinas/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Thomas Aquinas', url: 'https://iep.utm.edu/thomas-aquinas/', kind: 'academic-reference'},
      {label: 'Aquinas Institute — parallel Latin and English texts', url: 'https://aquinas.cc/la/en/~ST.I', kind: 'primary-text'},
      {label: 'e-codices — UB Basel A I 14', url: 'https://www.e-codices.unifr.ch/en/list/one/ubb/A-I-0014', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'aristotle'}, {hallId: 'medieval-worlds', exhibitId: 'augustine'}, {hallId: 'medieval-worlds', exhibitId: 'avicenna'}, {hallId: 'medieval-worlds', exhibitId: 'averroes'}, {hallId: 'medieval-worlds', exhibitId: 'maimonides'}, {hallId: 'medieval-worlds', exhibitId: 'ockham'}], articleRoute: {kind: 'philosopher', philosopherId: 'aquinas'},
  },
  ockham: {
    hallId: 'medieval-worlds', id: 'ockham', kind: 'philosopher', name: 'William of Ockham', originalName: 'Guillelmus de Ockham', dateLabel: 'c. 1287/1288–1347', entityType: 'English Franciscan logician, theologian, and political author',
    centralQuestion: 'What explanatory commitments can logic remove without losing the world?',
    lead: 'William of Ockham’s reputation is compressed into a razor he never stated in its most famous modern wording. His actual project joins sophisticated semantics, theology, natural philosophy, and political controversy. Trained in the Franciscan environment at Oxford, Ockham analyzed how spoken and written terms signify through a mental language and how supposition lets terms stand for things within propositions. Universals need not be additional common entities existing outside minds; concepts and signs can perform explanatory work while only individual substances and qualities exist extra-mentally. Parsimony therefore disciplines theories, but it does not guarantee that the shortest sentence is true or supply one automatic rule for every inquiry. Ockham also wrote on intuitive cognition, freedom, physics, Franciscan poverty, papal authority, and the limits of coercive jurisdiction. Summoned to Avignon for examination, he later fled with Franciscan dissidents during the poverty dispute and lived under imperial protection in Munich. Investigation of academic propositions should not be rewritten as a formal heresy conviction for nominalism. His unfinished Dialogue often stages arguments without clearly declaring the author’s final position. The near-contemporary manuscript sketch offers a rare labeled image, but even it cannot certify a portrait from life.',
    biography: {
      born: 'c. late 1287/early 1288, Ockham in Surrey', died: '9/10 April 1347, probably Munich', associatedPlaces: ['Ockham', 'London', 'Oxford', 'Avignon', 'Pisa', 'Munich'], era: 'Fourteenth-century Franciscan schools, papal court, and imperial politics', affiliations: ['Franciscan Order', 'Oxford theological study', 'Dissident Franciscan poverty party', 'Imperial court at Munich'],
      influencedBy: ['Aristotle', 'Porphyry', 'Peter Lombard', 'Duns Scotus', 'Walter Chatton', 'Franciscan poverty debates'], studentsOrFollowers: ['Adam Wodeham', 'Late medieval nominalists', 'Logicians and natural philosophers', 'Conciliar and political readers'],
      sourceSituation: 'Critical editions distinguish Ockham’s revised and reported works; the political Dialogue is unfinished and the famous razor wording is later.', knownFor: ['Mental language', 'Signification and supposition', 'Nominalism about universals', 'Parsimony', 'Papal fallibility and poverty debate'],
    },
    keyIdeas: ['Terms and concepts can explain predication without positing shared universal things.', 'Parsimony removes unsupported explanatory commitments; it does not make simplicity a substitute for evidence.', 'Political and ecclesial authority remains answerable to truth, rights, and the possibility of institutional error.'],
    keyWorks: ['Summa of Logic', 'Commentary on the Sentences', 'Quodlibetal Questions', 'Physics writings', 'Work of Ninety Days', 'Dialogue', 'Eight Questions on the Power of the Pope'],
    sections: [
      {heading: 'Logic before the razor', paragraphs: ['Supposition theory asks what a term stands for in a given proposition. Ockham’s nominalism belongs to this semantic program and to theological debates, not to a slogan applied after the fact.']},
      {heading: 'Avignon and exile', paragraphs: ['Academic scrutiny and the later poverty conflict are distinct episodes. Ockham’s unauthorized departure produced excommunication; it is inaccurate to say he was condemned as a heretic simply for denying universals.']},
      {heading: 'Economy with consequences', paragraphs: ['Explanatory economy could reshape accounts of categories, motion, cognition, and institutions. Later readers turned this broad practice into “Ockham’s razor,” often detaching it from his logical and theological setting.']},
    ],
    objectInterpretations: {
      'ockham-logica-sketch': 'The 1341 sketch is labeled “this is Brother Ockham,” making it unusually close in time and identification. It still does not prove observation from life.',
      'ockham-sentences': 'The Basel folio represents the shared manuscript environment of Sentences commentary. It is not Ockham’s hand and this exhibit does not claim that the pictured folio contains his particular section.',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — William of Ockham', url: 'https://plato.stanford.edu/entries/ockham/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — William of Ockham', url: 'https://iep.utm.edu/ockham/', kind: 'academic-reference'},
      {label: 'British Academy — Ockham’s Dialogus', url: 'https://publications.thebritishacademy.ac.uk/pubs/dialogus/wtc.html', kind: 'primary-text'},
      {label: 'e-codices — UB Basel A VI 22', url: 'https://www.e-codices.unifr.ch/en/list/one/ubb/A-VI-0022', kind: 'collection-record'},
    ],
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'aristotle'}, {hallId: 'medieval-worlds', exhibitId: 'boethius'}, {hallId: 'medieval-worlds', exhibitId: 'aquinas'}], articleRoute: {kind: 'philosopher', philosopherId: 'ockham'},
  },
} as const satisfies Record<MuseumExhibitId, MuseumInterpretation>;

export const MUSEUM_INTERPRETATIONS: readonly MuseumInterpretation[] = Object.values(interpretations);

export const getMuseumInterpretation = ({hallId, exhibitId}: MuseumExhibitRef): MuseumInterpretation => {
  const record = interpretations[exhibitId];
  if (record.hallId !== hallId) throw new Error(`Museum interpretation ${hallId}/${exhibitId} is missing.`);
  return record;
};

export type MuseumFact = {label: string; value: string};

export const museumInterpretationFacts = (record: MuseumInterpretation): MuseumFact[] => {
  if (record.kind === 'philosopher') {
    const biography = record.biography;
    return [
      record.originalName ? {label: 'Original name', value: record.originalName} : undefined,
      biography.born ? {label: 'Born', value: biography.born} : undefined,
      biography.died ? {label: 'Died', value: biography.died} : undefined,
      {label: 'Associated places', value: biography.associatedPlaces.join(' · ')},
      {label: 'Era', value: biography.era},
      {label: 'School / setting', value: biography.affiliations.join(' · ')},
      {label: 'Influenced by', value: biography.influencedBy.join(' · ')},
      {label: 'Students / followers', value: biography.studentsOrFollowers.join(' · ')},
      {label: 'Surviving evidence', value: biography.sourceSituation},
      {label: 'Known for', value: biography.knownFor.join(' · ')},
    ].filter((fact): fact is MuseumFact => Boolean(fact));
  }
  const tradition = record.tradition;
  return [
    {label: 'Origin', value: tradition.origin},
    {label: 'Place', value: tradition.place},
    {label: 'Historical period', value: tradition.historicalPeriod},
    {label: 'Early figures', value: tradition.earlyFigures.join(' · ')},
    {label: 'Major representatives', value: tradition.majorRepresentatives.join(' · ')},
    {label: 'Characteristic practices', value: tradition.characteristicPractices.join(' · ')},
    {label: 'Core doctrines', value: tradition.centralDoctrines.join(' · ')},
    {label: 'Source traditions', value: tradition.sourceTraditions.join(' · ')},
    {label: 'Principal rivals', value: tradition.principalRivals.join(' · ')},
    {label: 'Later influence', value: tradition.laterInfluence.join(' · ')},
    {label: 'Common misconception', value: tradition.commonMisconception},
    {label: 'Transmission', value: tradition.transmission},
  ];
};
