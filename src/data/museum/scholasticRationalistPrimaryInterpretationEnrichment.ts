import type {MuseumExhibitReview} from '../../editorial/exhibitReview';
import type {MuseumAssetId} from './museumAssetTypes';

type PrimaryInterpretationSource = {
  readonly label: string;
  readonly url: string;
  readonly kind: 'academic-reference' | 'primary-text' | 'collection-record';
};

type PrimaryInterpretationSection = {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly points?: readonly string[];
};

export type MuseumPrimaryInterpretationEnrichment = {
  readonly lead?: string;
  readonly keyIdeas?: readonly string[];
  readonly keyWorks?: readonly string[];
  readonly sections?: readonly PrimaryInterpretationSection[];
  readonly sectionCaution?: string;
  readonly sources?: readonly PrimaryInterpretationSource[];
  readonly objectInterpretations?: Readonly<Partial<Record<MuseumAssetId, string>>>;
  readonly review?: MuseumExhibitReview;
  readonly presentation?: {
    readonly mode: 'concise';
    readonly orientation:
      | readonly {readonly label: string; readonly value: string}[]
      | readonly {
        readonly heading: string;
        readonly items: readonly {readonly label: string; readonly description: string}[];
      }[];
    readonly articleActionLabel: string;
    readonly bodyLayout: 'prose';
    readonly exhibitLayout?: 'object-led';
    readonly plaqueKicker?: string;
    readonly plaqueSubtitleLines?: 1 | 2 | 3 | 4;
  };
};

export type ScholasticRationalistPrimaryInterpretationEnrichment =
  MuseumPrimaryInterpretationEnrichment;

/**
 * Focused depth and evidence for the canonical primary installations in
 * Galleries 13 and 16. These records are applied after the generic and legacy
 * interpretation paths so a moved exhibit keeps its established scholarship
 * while receiving the object reading and source layer authored for its new
 * installation.
 */
export const SCHOLASTIC_RATIONALIST_PRIMARY_INTERPRETATION_ENRICHMENT:
Readonly<Record<string, ScholasticRationalistPrimaryInterpretationEnrichment>> = {
  boethius: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [
      {
        heading: '',
        paragraphs: [
          'Boethius was a late Roman logician, theologian, statesman, and author whose two inheritances should be read together without being collapsed. His translations, commentaries, and textbooks organized Latin vocabulary and argumentative techniques for reading Porphyry and Aristotle. He planned a wider translation and commentary project embracing Plato and Aristotle, but did not complete it. Medieval classrooms later made “Boethius” into a curriculum through selective copying, excerpting, glossing, and teaching. That transmission was an institutional reconstruction across centuries, not a finished ancient system passed forward unchanged.',
          'The Consolation of Philosophy is instead a prison dialogue alternating prose and verse. Lady Philosophy diagnoses the prisoner’s dependence on office, reputation, wealth, and fortune, then redirects inquiry toward happiness and the highest good. External goods are unstable and cannot constitute that highest good, though they need not all be worthless. Book V’s account of divine eternity attempts to hold providential knowledge together with genuinely contingent choice. The argument remains contested, and the work’s silence about explicitly Christian consolation has generated interpretation rather than proving either the presence or absence of Boethius’s commitments.',
          'The work emerged from the violent politics of Theoderic’s Ostrogothic court. After accusations that included conspiracy or treason, Boethius was imprisoned and executed, probably in 525 or 526; the precise charges and chronology are imperfectly recoverable. His theological tractates also differ in genre and attribution history, so they should not be treated as one uniform corpus. The displayed musical miniature was produced roughly six centuries later. It witnesses Boethius’s medieval authority in music and learning, not his appearance, prison surroundings, or membership in the later Scholastic institutions that inherited his work.',
        ],
      },
    ],
    presentation: {
      mode: 'concise',
      orientation: [
        {heading: 'Major works', items: [
          {label: 'The logical project', description: 'Boethius translated and explained Greek logic for Latin readers, especially works by Aristotle and his interpreter Porphyry; his larger plan remained unfinished.'},
          {label: 'The Consolation of Philosophy', description: 'Written in prison, this dialogue uses prose and poetry to ask what happiness can survive the reversals of fortune.'},
        ]},
        {heading: 'Central questions', items: [
          {label: 'Fortune and happiness', description: 'Can wealth, office, reputation, or pleasure provide a stable good when each can be lost?'},
          {label: 'Providence and freedom', description: 'If divine knowledge sees every event, can human choices still be genuinely open and responsible?'},
        ]},
        {heading: 'Influence', items: [
          {label: 'Medieval classrooms', description: 'Teachers preserved, excerpted, glossed, and reorganized Boethius’s works, making him a foundation of Latin education centuries after his death.'},
          {label: 'More than one legacy', description: 'His logic, theology, prison dialogue, and writing on music entered different courses of study rather than one unchanged philosophical system.'},
        ]},
        {heading: 'Continuing debate', items: [
          {label: 'Faith in the prison dialogue', description: 'Readers still disagree about why the Consolation relies on Lady Philosophy without offering explicitly Christian consolation.'},
        ]},
      ],
      articleActionLabel: 'Read the full sourced Boethius article',
      bodyLayout: 'prose',
      exhibitLayout: 'object-led',
      plaqueKicker: '',
      plaqueSubtitleLines: 4,
    },
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-09',
      method: 'Reconciled against the current claim-reviewed article and registered exhibit sources; subject-specific visitor guide and retained object-led presentation reviewed against the corrected canonical standard.',
      lock: 'fnv1a64:60404728d57bb3d6',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Anicius Manlius Severinus Boethius', url: 'https://plato.stanford.edu/entries/boethius/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Boethius', url: 'https://iep.utm.edu/boethius/', kind: 'academic-reference'},
      {label: 'Project Gutenberg — The Consolation of Philosophy', url: 'https://www.gutenberg.org/ebooks/14328', kind: 'primary-text'},
    ],
  },
  eriugena: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'John Scotus Eriugena made translation into philosophical work at the Carolingian court of Charles the Bald. He rendered Greek Christian writings associated with Pseudo-Dionysius, Gregory of Nyssa, and Maximus the Confessor into Latin, then used those resources in the Periphyseon, a dialogue between teacher and student. Its unusually broad word “nature” includes both what is and what is not. The work’s four divisions trace a movement from divine source through primordial causes and created effects toward return, but they are not four independent kinds of thing. They provide a way of asking how creatures can manifest their source while no created category contains or defines God.',
      'That tension explains Eriugena’s negative theology. Affirmative names such as goodness or being can say something true about divine manifestation; negative language denies that the divine is one more instance of any familiar category. Calling this simply pantheism skips the distinctions the dialogue keeps making between creation and divine essence. It also obscures the difference between sources Eriugena translated and the synthesis he composed. His access to Greek changed what Latin readers could ask, but translation was not passive transmission: choices of vocabulary, arrangement, and argument made a new Carolingian philosophical project.',
      'The 1884 stained-glass figure is a useful warning about reception. It gives a nineteenth-century college chapel an imagined learned monk holding a book, not a contemporary likeness or a view of Eriugena’s court. Later condemnations also belong to the story, but they do not settle the argument in the Periphyseon by themselves. Reading it responsibly means holding together its daring language, its repeated refusals to define God through creaturely terms, and its later institutional afterlife. Eriugena matters because translation, metaphysics, and theological discipline become one inquiry without becoming one simple doctrine. Its difficulty is inseparable from its historical importance.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Key ideas', items: [
        {label: 'Fourfold nature', description: 'A map of divine source, primordial causes, created effects, and return—not four separate substances.'},
        {label: 'Negative theology', description: 'Language can point toward God while also denying that any created category captures the divine.'},
      ]},
      {heading: 'Major work', items: [
        {label: 'Periphyseon', description: 'A teacher-and-student dialogue that joins Latin and newly available Greek Christian sources.'},
      ]},
      {heading: 'Continuing debate', items: [
        {label: '“Pantheism”', description: 'A later label that can hide Eriugena’s careful distinction between creatures and the divine essence.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Eriugena article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: {
      'scholastic-eriugena-stained-glass': 'This 1884 chapel window imagines Eriugena as a learned medieval monk with a book. It records a much later institutional memory of a translator and teacher, not his appearance, clothing, courtly setting, or a direct picture of the Periphyseon’s argument.',
    },
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:062a2ed4a687815a'},
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — John Scottus Eriugena', url: 'https://plato.stanford.edu/entries/scottus-eriugena/', kind: 'academic-reference'},
      {label: 'Open Library — Periphyseon: The Division of Nature', url: 'https://openlibrary.org/books/OL2117452M/Periphyseon', kind: 'collection-record'},
      {label: 'University College Cork CELT — Eriugena bibliography', url: 'https://celt.ucc.ie/eriugenabibl.html', kind: 'collection-record'},
    ],
  },
  'medieval-scholasticism': {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Scholasticism is best understood as a changing family of learned practices, not a single medieval doctrine. In monasteries, cathedral schools, and later universities, readers worked slowly through authoritative texts, posed problems within them, distinguished several possible meanings, and tested objections in ordered argument. Lectio was close reading; a quaestio isolated a difficulty; a disputation arranged objections, replies, and a determination. These procedures did not merely repeat inherited conclusions. They made disagreement teachable. A commentary or collection of sentences could become the starting point for questions its source author had never considered.',
      'The practices moved across institutions and depended on connected textual histories. Latin Christian scholars read patristic authorities and Aristotle while engaging materials translated from Greek and Arabic, as well as arguments developed in Islamic and Jewish intellectual worlds. That connection does not make every contributor a scholastic in the same institutional sense, or turn different languages and religious traditions into one European school. It identifies routes of translation, pedagogy, and dispute. Shared methods generated durable conflicts over universals, knowledge, creation, freedom, law, and the relation between philosophy and theology rather than an automatic synthesis.',
      'The Bologna miniature stages an idealized university lecture, with a master raised above students who read, listen, and talk among themselves. It can make the social form of learned study visible, but it cannot document a particular class or show how every medieval school worked. Nor can a classroom image settle arguments that ran through many genres and places. Scholasticism matters because it names a way of making inherited texts answer new questions in public, with procedures that could discipline authority and intensify disagreement at the same time. Its procedures gave criticism a recognizable place within institutional life. They also gave students ways to expose ambiguity without ending disagreement.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'How it worked', items: [
        {label: 'Close reading', description: 'Teachers and students treated authoritative texts as problems to interpret, not scripts to repeat.'},
        {label: 'Disputation', description: 'A formal exchange of objections and replies that made disagreement part of learned practice.'},
      ]},
      {heading: 'Connected worlds', items: [
        {label: 'Translation', description: 'Greek, Arabic, Hebrew, and Latin textual histories supplied different resources without becoming one tradition.'},
      ]},
      {heading: 'Central questions', items: [
        {label: 'Authority and argument', description: 'How can inherited texts guide inquiry while remaining open to new distinctions and objections?'},
      ]},
    ], articleActionLabel: 'Read the full sourced Scholasticism article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: {
      'scholastic-university-lecture': 'This fourteenth-century Bologna miniature stages a university lecture with a conspicuous master and varied students. It is strong material context for the social form of learned study, but not a documentary record of one class, one discipline, or every medieval institution.',
    },
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:ba95c47004fb990e'},
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Medieval Philosophy', url: 'https://plato.stanford.edu/entries/medieval-philosophy/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Literary Forms of Medieval Philosophy', url: 'https://plato.stanford.edu/entries/medieval-literary/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Argumentation in Medieval Traditions', url: 'https://plato.stanford.edu/entries/argument/supplement.html', kind: 'academic-reference'},
    ],
  },
  anselm: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Anselm’s famous Proslogion reasoning belongs to a wider monastic project, not to a free-standing modern proof exercise. “Faith seeking understanding” names disciplined inquiry into what a believer affirms; it does not make argument decorative. The Proslogion is addressed as prayer and follows the more extended Monologion. Its phrase about that than which nothing greater can be thought has often been extracted as the “ontological argument,” a later useful label that can hide its devotional sequence. Gaunilo’s contemporary reply and Anselm’s response show that the reasoning was disputed from the beginning rather than quietly accepted as a settled demonstration.',
      'Anselm also writes about truth, freedom, the fall, and divine foreknowledge. For him freedom is not simply unrestricted choice between alternatives. It concerns preserving rectitude—rightness—of will for its own sake, while responsibility, grace, temptation, and knowledge of the future require different analyses. Cur Deus Homo asks, in dialogue form, how incarnation and satisfaction should be understood. It has been enormously influential and deeply criticized. These works share careful conceptual work, but they do not form one detached formula; their questions arose within Benedictine discipline and Anselm’s conflicts over ecclesiastical office.',
      'The displayed twelfth-century page is a witness to the preface of Cur Deus Homo, not Anselm’s autograph. Its closeness in date cannot show that he supervised this particular copy, yet it makes manuscript transmission part of the exhibit rather than an invisible background. The page also resists reducing Anselm to one chapter of the Proslogion. His arguments travelled through copying, monastic reading, controversy, and later reception. The central invitation is to read prayer, logical precision, accounts of agency, and theological argument together without treating any one of them as the whole thinker. Their differences prevent the exhibit from turning inquiry into a slogan.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Central questions', items: [
        {label: 'Faith seeking understanding', description: 'A believer uses argument to clarify commitments and test what follows from them.'},
        {label: 'Freedom', description: 'Freedom is preserving rightness of will for its own sake, not merely having many options.'},
      ]},
      {heading: 'Major works', items: [
        {label: 'Proslogion', description: 'A prayerful meditation containing the reasoning later called the ontological argument.'},
        {label: 'Cur Deus Homo', description: 'A dialogue about incarnation and satisfaction with a long, contested reception.'},
      ]},
      {heading: 'Continuing debate', items: [
        {label: 'Gaunilo’s reply', description: 'A contemporary challenge that shows the Proslogion argument was controversial from the start.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Anselm article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: {
      'scholastic-anselm-cur-deus-homo': 'This twelfth-century manuscript witnesses the preface to Cur Deus Homo, giving the work a material afterlife close to Anselm’s period. It remains a copy rather than his autograph, so it cannot establish his exact hand, final wording, or supervision of this manuscript.',
    },
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:ea0b38058f30c0c2'},
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Anselm of Canterbury', url: 'https://plato.stanford.edu/entries/anselm/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Anselm', url: 'https://iep.utm.edu/anselm/', kind: 'academic-reference'},
      {label: 'Fordham Internet Medieval Sourcebook — Anselm, Proslogion', url: 'https://sourcebooks.web.fordham.edu/basis/anselm-proslogium.asp', kind: 'primary-text'},
    ],
  },
  abelard: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Peter Abelard’s method was not a mechanical celebration of contradiction. Sic et Non places apparently conflicting authorities together so students must test wording, attribution, context, and conceptual distinctions before deciding whether a conflict is real. That discipline turns inherited texts into arguments rather than untouchable answers. Abelard’s logic likewise asks how words, concepts, identity, and inference work. His account of universal terms rejects both a separately existing universal thing and the thought that general words are mere noise. The chronology matters: this was early twelfth-century work with a limited Latin logical corpus, not a finished thirteenth-century university syllabus.',
      'In ethics Abelard gives central weight to consent: the physical description of an act alone does not settle moral fault when an agent’s intention and belief matter. This does not make consequences irrelevant or produce a modern theory of private sincerity. The letters transmitted under Abelard’s and Héloïse’s names bring further questions about intention, marriage, authority, and religious life into view. Their textual history is complex, but uncertainty about transmission is not a reason to make Héloïse a mere romantic episode in Abelard’s biography. Her arguments require interpretation as intellectual work in their own right.',
      'The displayed Roman de la Rose illumination was painted about two centuries after Abelard and Héloïse lived. It imagines them together as part of their literary reception, not as an eyewitness scene or a reliable portrait. That gap is instructive: later memory can preserve a compelling story while changing what readers notice. Abelard’s work asks visitors to slow down before choosing between authorities, before treating a universal as a thing, and before confusing an outward deed with the moral work of consent. The image reminds us that the familiar couple and the difficult corpus are related, but not interchangeable.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Key ideas', items: [
        {label: 'Dialectical reading', description: 'Apparent contradictions are tested through wording, context, attribution, and careful distinctions.'},
        {label: 'Consent', description: 'Moral fault depends importantly on willing what one believes wrong, not on an act’s outward description alone.'},
      ]},
      {heading: 'Major work', items: [
        {label: 'Sic et Non', description: 'A collection of conflicting authorities designed to train disciplined interpretation rather than easy agreement.'},
      ]},
      {heading: 'Héloïse and reception', items: [
        {label: 'Transmitted letters', description: 'Their textual history is debated, while Héloïse’s arguments about marriage and authority remain philosophically important.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Abelard article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: {
      'scholastic-abelard-heloise-manuscript': 'This fourteenth-century Roman de la Rose illumination imagines Abelard and Héloïse long after their lives. It records their literary reception, not a portrait, eyewitness encounter, or evidence that the manuscript correspondence gives transparent access to private speech.',
    },
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:7628adb3233f47ff'},
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Peter Abelard', url: 'https://plato.stanford.edu/entries/abelard/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Peter Abelard', url: 'https://iep.utm.edu/abelard/', kind: 'academic-reference'},
      {label: 'Fordham Internet Medieval Sourcebook — Sic et Non, prologue', url: 'https://sourcebooks.web.fordham.edu/source/Abelard-SicetNon-Prologue.asp', kind: 'primary-text'},
    ],
  },
  'duns-scotus': {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'John Duns Scotus asks how reasoning can use a common concept without flattening the difference between God and creatures. His thesis of univocity says that “being” must retain a stable enough meaning in an argument for premises about God and finite things to connect. It does not say that God and creatures exist in the same finite way. Their modes of being remain radically different. A related tool, the formal distinction, lets Scotus describe aspects that are inseparable in one thing yet not simply identical because the mind can distinguish them. These are technical answers to problems of argument and description, not invitations to make metaphysics mysterious.',
      'His account of individuation asks what makes Socrates this individual rather than merely a member of a shared kind. Haecceity, often translated “thisness,” is an intrinsic principle of being this one, not a bundle of visible traits pasted onto a generic nature. Scotus also gives the will a strong power of self-determination and develops accounts of cognition and natural theology. But the corpus is not one completed summa. The Ordinatio, Lectura, reported Paris lectures, questions, revisions, and later editorial decisions preserve different textual layers whose chronology and authorship are not always secure.',
      'The late-fifteenth-century Urbino panel places Scotus among illustrious men more than a century after his death. It shows Renaissance esteem for a reader in a learned gallery, not an authenticated likeness or a direct guide to every position called Scotist. The painting therefore helps separate reception from evidence. Scotus’s importance lies in the pressure he puts on familiar words—being, individual, freedom, distinction—to do precise work without losing their limits. Visitors can follow that pressure only by asking which text and which argumentative problem a claimed view belongs to. That vigilance keeps precision from becoming a performance of obscurity.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Key ideas', items: [
        {label: 'Univocity of being', description: '“Being” needs a common meaning for an argument, while God and creatures still differ infinitely in mode.'},
        {label: 'Thisness', description: 'The intrinsic principle that makes an individual this one, not a list of noticeable traits.'},
      ]},
      {heading: 'Reading the corpus', items: [
        {label: 'Several textual layers', description: 'Lecture reports, revisions, questions, and editions make it risky to treat every formulation as one finished system.'},
      ]},
      {heading: 'Central question', items: [
        {label: 'Unity and difference', description: 'How can common concepts support reasoning while preserving what is irreducibly individual or divine?'},
      ]},
    ], articleActionLabel: 'Read the full sourced Duns Scotus article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: {
      'scholastic-scotus-urbino': 'This late-fifteenth-century Urbino panel places Duns Scotus in a Renaissance gallery of illustrious readers. It records later esteem and learned identity, not an authenticated likeness, a scene from his life, or a visual summary of the arguments preserved in his difficult corpus.',
    },
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:0fc343fd4c9eef58'},
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — John Duns Scotus', url: 'https://plato.stanford.edu/entries/duns-scotus/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — John Duns Scotus', url: 'https://iep.utm.edu/john-duns-scotus/', kind: 'academic-reference'},
      {label: 'Open Library — Duns Scotus, Quaestiones quodlibetales (1639 edition)', url: 'https://openlibrary.org/works/OL15847642W/Quaestiones_quodlibetales', kind: 'collection-record'},
    ],
  },
  ockham: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'William of Ockham cannot be reduced to the modern slogan called his razor. Explanatory economy works inside detailed accounts of mental language, concepts, supposition, cognition, logical consequence, and scientific knowledge. Supposition asks how a term stands for things in a proposition; mental language names the structured concepts through which thought can be analyzed. Ockham denies that a universal is one shared thing existing outside the mind, yet general terms still signify many individuals and support universal claims. Economy is therefore not a rule to prefer whatever sounds simple. It asks whether an explanation has earned the entities it introduces.',
      'Ockham’s later political writing grew from the Franciscan poverty controversy and conflict with Pope John XXII. Questions about property, rights, scripture, councils, and coercive authority became inseparable from logic and theology. These works test how officeholders are constrained; they do not simply announce a modern separation of church and state. The logical and political corpora also answer different occasions and have different genres and editorial histories. Connecting them requires more than applying one razor-shaped slogan to every question, because a careful explanation can still be complex when the evidence and distinctions demand it.',
      'A 1341 manuscript of the Summa logicae labels a small sketch “this is Brother Ockham.” The label makes the identification unusually direct, but the sketch’s maker and relation to Ockham remain unknown; it is not a verified portrait from life. The object instead points to the material circulation of logical writing and to the way an author’s name gathered around a text. Ockham’s lasting challenge is practical as well as technical: before multiplying causes, abstractions, or authorities, ask what explanatory task they perform and whether the evidence requires them. That discipline makes simplicity a result, never a substitute for inquiry.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Key ideas', items: [
        {label: 'Explanatory economy', description: 'Do not add entities without need—but only after identifying the evidence and the work an explanation must do.'},
        {label: 'Nominalism', description: 'General terms can refer to many individuals without a single universal thing existing outside the mind.'},
      ]},
      {heading: 'How logic works', items: [
        {label: 'Supposition', description: 'An analysis of how a term stands for things when it appears in a proposition.'},
      ]},
      {heading: 'Political writing', items: [
        {label: 'Poverty controversy', description: 'Later works examine property, office, councils, and coercive authority amid conflict with Pope John XXII.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Ockham article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: {
      'scholastic-ockham-logica': 'The 1341 Summa logicae manuscript identifies a small sketch as Brother Ockham, making the link unusually direct. Its unknown maker and uncertain relation to Ockham still prevent it from serving as a verified portrait; it better witnesses the circulation and named reception of logical work.',
    },
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:4a81d0d54ab33468'},
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — William of Ockham', url: 'https://plato.stanford.edu/entries/ockham/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — William of Ockham', url: 'https://iep.utm.edu/ockham/', kind: 'academic-reference'},
      {label: 'British Academy — William of Ockham, Dialogus edition and translation', url: 'https://publications.thebritishacademy.ac.uk/pubs/dialogus/index.html', kind: 'primary-text'},
    ],
  },
  'meister-eckhart': {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Meister Eckhart was a Dominican master trained in university practice, not an isolated voice outside scholasticism. His Latin questions and commentaries and his Middle High German sermons address related problems through different genres and audiences. He presses language about being, intellect, unity, causation, and the soul’s relation to its source toward its limits, while denying that the divine can be contained by a creaturely concept. Detachment is not apathy or a flight from responsibility. It names release from possessive willing so that action need not treat God, other people, or the self as instruments of reward.',
      'The “birth” of the Word in the soul and talk of the soul’s ground belong to this demanding conceptual and pastoral setting. German sermons are not simplified transcripts of the Latin works or an unfiltered record of private mystical experience. They are crafted preaching transmitted through manuscripts with difficult questions of wording and authenticity. In 1329, after Eckhart’s death, the bull In agro dominico condemned some propositions and called others suspect, while noting his profession of submission. The ruling is essential reception history, but it cannot replace the work of identifying what a particular text says in context.',
      'The worn sermon fragment is an early witness to sermon 5b, not an autograph. Its survival makes a vernacular preaching tradition materially present, while the manuscript itself cannot settle dating, authorship, or the relation of every version to Eckhart. This distinction matters because modern anthologies often detach striking lines from their genre, and the condemnation is often treated as a summary of an entire corpus. Eckhart’s importance lies in the difficult meeting of scholastic argument, preaching, detachment, and divine language—one that requires readers to keep textual transmission and later judgment visible. That care keeps difficulty from becoming a timeless, placeless mysticism.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Key ideas', items: [
        {label: 'Detachment', description: 'Release from possessive willing, not indifference to other people or refusal of responsibility.'},
        {label: 'Divine language', description: 'Words about being and intellect must be stretched and qualified because God is not one creaturely object.'},
      ]},
      {heading: 'Two kinds of writing', items: [
        {label: 'Latin and German works', description: 'University arguments and vernacular sermons overlap, but their genres and audiences are not identical.'},
      ]},
      {heading: 'Continuing debate', items: [
        {label: 'The 1329 condemnation', description: 'A later judgment of selected propositions, not a neutral summary of every work attributed to Eckhart.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Meister Eckhart article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: {
      'scholastic-eckhart-fragment': 'This early witness to Eckhart’s sermon 5b makes a vernacular preaching tradition tangible. It is not an autograph, and neither its modern photograph nor the fragment alone can settle the sermon’s dating, wording, authorship, or relation to the larger Latin and German corpus.',
    },
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:efd1156f2cc24e66'},
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Meister Eckhart', url: 'https://plato.stanford.edu/archives/fall2025/entries/meister-eckhart/', kind: 'academic-reference'},
      {label: 'Christian Classics Ethereal Library — Claud Field trans., Meister Eckhart’s Sermons (c. 1909 popular, noncritical selection)', url: 'https://ccel.org/ccel/eckhart/sermons.all.html', kind: 'primary-text'},
      {label: 'German National Library — Meister Eckhart authority record', url: 'https://d-nb.info/gnd/118529706', kind: 'collection-record'},
    ],
  },
  'marsilius-padua': {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Marsilius of Padua wrote Defensor pacis amid conflict between imperial and papal claims, but its argument reaches beyond a partisan intervention. Peace is the condition of a sufficient civic life, and the work analyzes a community through differentiated functions. Coercive human law derives from the human legislator: the body of citizens, or its qualified “weightier part.” Government executes that authority rather than owning it. The qualification matters. It prevents a quick equation with modern universal democracy even though collective authorization and public judgment are central to Marsilius’s account of civic order.',
      'Marsilius distinguishes divine law, which teaches what concerns salvation, from human law backed by temporal punishment. On this basis he rejects papal plenitude of power and denies that clergy possess an independent coercive jurisdiction simply through ecclesiastical office. These claims were radical in their setting, but the Defensor is not a modern secular constitution dropped into the fourteenth century. Aristotelian civic analysis, scriptural interpretation, ecclesiology, and immediate imperial-papal conflict remain intertwined. Its arguments about councils, rulers, citizenship, and religious authority must be read with those limits in view.',
      'The Tortosa manuscript page is an early witness to Defensor pacis, not Marsilius’s autograph. It gives material evidence for the work’s circulation while leaving its particular copyist, textual history, and authorial wording open to manuscript study. The page cannot tell us by itself how “weightier part” should be defined or whether Marsilius anticipates present-day religious liberty. Its value is to keep a political argument connected to the fragile transmission of a text whose challenge was made in a specific conflict, yet whose questions about law and coercion still demand careful comparison. That survival also makes loss, copying, and editorial choice part of political history. It makes civic peace an argument, not merely a medieval slogan.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Central questions', items: [
        {label: 'Who legislates?', description: 'Coercive human law originates with citizens or their qualified “weightier part,” not simply with rulers.'},
        {label: 'What may clergy coerce?', description: 'Marsilius denies an independent clerical power of temporal punishment.'},
      ]},
      {heading: 'Major work', items: [
        {label: 'Defensor pacis', description: 'A political argument linking civic peace, law, government, councils, and criticism of papal plenitude of power.'},
      ]},
      {heading: 'Interpretive limit', items: [
        {label: 'Not a modern democracy', description: 'The contested “weightier part” and fourteenth-century setting block a simple modern identification.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Marsilius of Padua article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: {
      'scholastic-marsilius-defensor': 'This early-fourteenth-century manuscript witnesses the circulation of Defensor pacis. It is not presented as Marsilius’s autograph, so it cannot by itself decide the work’s wording, define its “weightier part,” or turn a specific medieval political argument into a modern constitution.',
    },
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:b614139e0339cad0'},
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Marsilius of Padua', url: 'https://plato.stanford.edu/entries/marsilius-padua/', kind: 'academic-reference'},
      {label: 'Fordham Internet Medieval Sourcebook — Marsilius, Defensor pacis selections', url: 'https://sourcebooks.web.fordham.edu/source/marsiglio3.asp', kind: 'primary-text'},
      {label: 'Latin Wikisource — Defensor pacis, Discourse III only; edition and source unidentified', url: 'https://la.wikisource.org/wiki/Defensor_pacis', kind: 'primary-text'},
    ],
  },
  rationalism: {
    lead: '“Rationalism” is a later historiographic label, not the name of a society or a program that Descartes, Spinoza, Leibniz, and Conway jointly announced. It can still be useful when it directs attention to specific questions: whether some concepts or principles are innate, how necessity can be known, what counts as an adequate explanation, and whether nature has an intelligible order accessible to finite minds. Those questions produced incompatible answers. Descartes distinguishes thinking from extended created substance; Spinoza argues for one substance; Leibniz proposes a plurality of simple substances; Conway makes created spirit and body differ by degree within a living nature. None of these projects simply discards experience. Their systems developed through observation, objections, correspondence, translation, and publication networks whose surviving record also reveals how education and access shaped the later canon.',
    keyIdeas: [
      'A retrospective family name: “rationalism” is a historian’s comparative tool, not a seventeenth-century party membership.',
      'Reason with experience: claims to innate structure, necessary truth, or a priori warrant do not imply that observation and experiment contribute nothing.',
      'Rival architectures of reality: dualism, monism, monads, and Conway’s vital continuum offer incompatible accounts of substance, mind, body, causation, and nature.',
      'Arguments in circulation: objections, replies, correspondence, translation, and uneven access to education shaped both the philosophies and the canon later built from them.',
    ],
    keyWorks: [
      'Descartes, Meditations on First Philosophy, with the Objections and Replies',
      'Spinoza, Ethics and Theological-Political Treatise',
      'Anne Conway, Principles of the Most Ancient and Modern Philosophy and surviving correspondence',
      'Leibniz, New Essays on Human Understanding and the Leibniz–Clarke correspondence',
    ],
    sections: [
      {
        heading: 'A useful lens, not a seventeenth-century party',
        paragraphs: [
          'The familiar rationalism–empiricism divide organizes a real cluster of epistemological problems, but it also simplifies the period after the fact. Descartes, Spinoza, and Leibniz each give reason, certainty, or intelligible order an ambitious role, yet they disagree over ideas, substance, freedom, God, body, and the standards of explanation. Authors commonly called empiricists also reason beyond immediate sensation, while the so-called rationalists appeal to experience in natural philosophy and ordinary knowledge. The label earns its place only when it sharpens a comparison rather than deciding the result in advance.',
          'The historical unit is often an exchange rather than an isolated system. The objections printed with Descartes’s Meditations expose disagreement at the point of publication; Spinoza’s works emerged through correspondence and carefully managed print and manuscript circulation; Leibniz developed positions across drafts and exchanges rather than one final summa. Conway studied through correspondence with Henry More because universities were closed to her, and her sole treatise survives through posthumous translation and editing. Recovering her work—and the arguments of other excluded figures—changes the questions used to define the category, but does not make every participant part of one coherent school.',
        ],
      },
    ],
    sectionCaution: 'The gallery groups these works for comparison; it does not claim that their authors called themselves rationalists or formed a unified succession. Conway’s inclusion recovers a substantive critic of Cartesianism, not a missing member of an official circle, and the familiar “continental” versus “British” geography obscures correspondence, travel, translation, and disagreement across those borders.',
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Early Modern Rationalism', url: 'https://plato.stanford.edu/entries/rationalism-early-modern/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Rationalism vs. Empiricism', url: 'https://plato.stanford.edu/entries/rationalism-empiricism/', kind: 'academic-reference'},
      {label: 'Library of Congress — Descartes’s mechanical philosophy and 1644 vortex diagram', url: 'https://www.loc.gov/exhibits/world/heavens.html#obj73', kind: 'collection-record'},
      {label: 'Cambridge Platonism Project — Conway’s Principles, diplomatic text', url: 'https://www.cambridge-platonism.divinity.cam.ac.uk/view/texts/diplomatic/Conway1692', kind: 'primary-text'},
    ],
    objectInterpretations: {
      'rationalism-cartesian-vortices': 'This 1644 illustration from Descartes’s Principles pictures a universe without empty space, where matter moving in vortices carries planets around their suns. Its visual order makes one Cartesian ambition tangible: connect claims about matter and motion to a mechanical account of astronomical appearances. It is not an emblem produced by a unified “rationalist school.” Spinoza, Leibniz, and Conway developed incompatible accounts of substance, body, causation, and nature, while the vortex model itself became an object of later physical criticism. Read the sheet as a test case in system building: reason organizes experience here, but observation still constrains what the system is meant to explain.',
    },
  },
  descartes: {
    objectInterpretations: {
      'rationalism-descartes-weenix': 'Jan Baptist Weenix painted this portrait while Descartes was alive, making it unusually close likeness evidence. The open book bears “Mundus est fabula”—“the world is a fable”—but the staged inscription does not decode the sitter’s philosophy by itself. Book, clothing, gaze, and dark setting construct a learned public identity; they should be compared with Descartes’s texts on doubt, method, experiment, and nature rather than treated as an illustrated cogito.',
    },
  },
  spinoza: {
    objectInterpretations: {
      'rationalism-spinoza-engraving': 'This engraving accompanied the Dutch Nagelate Schriften in 1677, the year Spinoza died, and helped establish the face through which later readers encountered him. Its unidentified engraver and posthumous publication make it early reception evidence, not a documented portrait sitting. The memorial framing belongs to the editorial presentation of a controversial author whose Ethics and other works appeared after his death; resemblance, reputation, and doctrine must therefore remain separate questions.',
    },
  },
  'anne-conway': {
    lead: 'Conway’s Principles begins from divine goodness and sharply separates the immutable creator, the mediating Christ, and mutable creatures. Within creation, however, spirit and body differ by degree rather than by belonging to two alien substances; matter is living and capable of transformation. This is a direct alternative to Cartesian dualism and to other seventeenth-century accounts of substance, not a footnote to Leibniz. Because her treatise was published anonymously and posthumously—first in Latin in 1690, then in English in 1692—editors, translators, and Francis Mercury van Helmont are part of its surviving textual history. Her authorship is secure even though the precise surviving wording is mediated.',
    keyIdeas: [
      'Living created substance: created reality is active and vital rather than inert matter divided absolutely from spirit.',
      'Difference by degree: body and spirit mark degrees within mutable creation, while God remains ontologically distinct and immutable.',
      'Moral transformation: creatures can change toward greater or lesser perfection without crossing the creator–creature distinction.',
      'Mediated authorship: the surviving Latin and English editions reflect posthumous translation and editorial intervention.',
    ],
    keyWorks: ['The Principles of the Most Ancient and Modern Philosophy', 'Correspondence with Henry More'],
    sections: [
      {
        heading: 'Vital creation, perfectibility, and a mediated text',
        paragraphs: [
          'Conway argues that created beings are mutable and can change toward greater or lesser perfection, while none can cross the ontological distinction separating creatures from God. Body and spirit are therefore not absolutely different created substances: they name degrees within living created reality. Her account uses pain, moral agency, divine justice, and Christ’s mediating role to explain transformation, making it more than a general claim that “everything is alive.”',
          'Her philosophical formation came through correspondence with Henry More because university education was closed to her, and her household later became a site of exchange involving van Helmont, Quakers, medicine, and Christian Kabbalah. The sole treatise’s editorial path is unusually important: the lost English manuscript was rendered into Latin, published after her death, and translated back into English. Claims about exact wording, annotations, and editorial contribution must acknowledge that mediation.',
        ],
      },
    ],
    sectionCaution: 'No authenticated portrait of Conway is known. The displayed Van Hoogstraten interior is a disputed identification and remains contextual, while the posthumous editions require equal caution about transcription, translation, titles, annotations, and editorial arrangement.',
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Lady Anne Conway', url: 'https://plato.stanford.edu/entries/conway/', kind: 'academic-reference'},
      {label: 'University of Pennsylvania — The Principles of the Most Ancient and Modern Philosophy (1692)', url: 'https://digital.library.upenn.edu/women/conway/principles/principles.html', kind: 'primary-text'},
      {label: 'Cambridge Platonism Project — Conway’s Principles, diplomatic text', url: 'https://www.cambridge-platonism.divinity.cam.ac.uk/view/texts/diplomatic/Conway1692', kind: 'primary-text'},
    ],
  },
  leibniz: {
    lead: 'Leibniz did not publish one definitive systematic book from which every doctrine can be read without remainder. His metaphysics emerges across essays, drafts, notes, and an immense multilingual correspondence, and its terminology changes over time. Mature monads are simple, active, perceiving substances whose states unfold internally; pre-established harmony coordinates their perspectives without intersubstantial causal exchange. The principle of sufficient reason and the distinction between necessary and contingent truth frame his account of divine choice, but “best possible world” means an optimally ordered whole under his criteria—not that each event is good or suffering unreal. Compact late summaries must therefore be read beside the wider archive.',
    keyIdeas: [
      'Monads and perception: simple active substances express the world from distinct perspectives, often below conscious awareness.',
      'Pre-established harmony: created substances do not exchange states causally; their internally unfolding series correspond by divine order.',
      'Sufficient reason: truths and events require an explanation, even when the analysis of contingent truths is indefinitely complex.',
      'Possible worlds: divine choice concerns an optimally ordered complete world, not the claim that every local event is good.',
    ],
    keyWorks: ['Discourse on Metaphysics', 'New Essays on Human Understanding', 'Theodicy', 'Monadology', 'Leibniz–Clarke Correspondence'],
    sections: [
      {
        heading: 'Unity, perspective, explanation, and unfinished system',
        paragraphs: [
          'Leibniz argues that an aggregate cannot acquire genuine unity merely by collecting more parts, so the grounds of bodies must be simple unities with internal principles of change. Perception here is not always conscious: petites perceptions and differences in clarity produce a graded field extending far beyond reflective human thought. Bodies retain explanatory reality as organized phenomena, which makes “everything is only in the mind” an inadequate summary.',
          'Necessary truths rest on contradiction, while contingent truths require sufficient reasons that may lead through an indefinitely complex analysis. God’s choice among possible worlds is meant to preserve contingency even though every complete individual concept includes all its predicates. The tensions are real and have generated rival interpretations. The Monadology is a compact late summary, not a self-sufficient master key; the Discourse on Metaphysics, New Essays, Theodicy, scientific papers, and correspondence are needed to see the system develop.',
        ],
      },
    ],
    sectionCaution: 'Binary arithmetic is historically important but is not a modern computer architecture, and the Fu Xi comparison was mediated by Joachim Bouvet and Leibniz’s theological interests. Likewise, the Monadology’s later title and publication history should not make it a single authorized master key.',
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Gottfried Wilhelm Leibniz', url: 'https://plato.stanford.edu/entries/leibniz/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Leibniz’s Metaphysics', url: 'https://iep.utm.edu/leib-met/', kind: 'academic-reference'},
      {label: 'Project Gutenberg — Leibniz, La monadologie', url: 'https://www.gutenberg.org/ebooks/17641', kind: 'primary-text'},
    ],
  },
};
