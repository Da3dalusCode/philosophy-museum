import type {MuseumAssetId} from './museumAssetTypes';
import type {AncientGreekExhibitId, MuseumExhibitId, MuseumHallId} from '../museumCatalog';
import type {MuseumExhibitRef} from './museumWorldTypes';
import type {NavigableAppRoute} from '../../routing/routes';
import {EARLY_MODERN_MUSEUM_INTERPRETATIONS} from './renaissanceReasonRevolutionInterpretations';
import {MODERNITY_MUSEUM_INTERPRETATIONS} from './modernityFreedomCritiqueInterpretations';
import {MUSEUM_EXPANSION_INTERPRETATIONS} from './museumExpansionInterpretations';

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

const ANCIENT_MUSEUM_INTERPRETATIONS = {
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
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'epicureanism'}, {hallId: 'renaissance-reason-revolution', exhibitId: 'hume'}], articleRoute: {kind: 'philosopher', philosopherId: 'aristotle'},
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
    relatedExhibits: [{hallId: 'ancient-greek', exhibitId: 'plato'}, {hallId: 'renaissance-reason-revolution', exhibitId: 'spinoza'}], articleRoute: {kind: 'branch', branchId: 'neoplatonism'},
  },
} as const satisfies Record<AncientGreekExhibitId, MuseumInterpretation>;

export const MUSEUM_INTERPRETATIONS: readonly MuseumInterpretation[] = [
  ...Object.values(ANCIENT_MUSEUM_INTERPRETATIONS),
  ...EARLY_MODERN_MUSEUM_INTERPRETATIONS,
  ...MODERNITY_MUSEUM_INTERPRETATIONS,
  ...MUSEUM_EXPANSION_INTERPRETATIONS,
];

const activeInterpretationById = new Map(MUSEUM_INTERPRETATIONS.map((record) => [record.id, record]));

export const getMuseumInterpretation = ({hallId, exhibitId}: MuseumExhibitRef): MuseumInterpretation => {
  const record = activeInterpretationById.get(exhibitId);
  if (!record || record.hallId !== hallId) throw new Error(`Museum interpretation ${hallId}/${exhibitId} is missing.`);
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
