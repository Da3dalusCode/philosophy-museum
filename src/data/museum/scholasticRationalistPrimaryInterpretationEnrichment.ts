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
    readonly orientation: readonly {readonly label: string; readonly value: string}[];
    readonly orientationException?: string;
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
        {label: 'Historical setting', value: 'Late Roman Italy · c. 475/480–525/526 CE; chronology uncertain'},
        {label: 'Logical project', value: 'Porphyry and Aristotle in Latin · larger plan unfinished'},
        {label: 'Prison dialogue', value: 'Fortune · happiness · providence · contingent choice'},
        {label: 'Corpus caution', value: 'Logical, theological, and literary works differ in form and attribution history'},
        {label: 'Later reception', value: 'Medieval copying · glossing · teaching · music curriculum'},
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
      method: 'Reconciled against the current claim-reviewed article and registered exhibit sources; presentation checked against the canonical primary-exhibit standard.',
      lock: 'fnv1a64:f0013e0acc006c73',
    },
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Anicius Manlius Severinus Boethius', url: 'https://plato.stanford.edu/entries/boethius/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Boethius', url: 'https://iep.utm.edu/boethius/', kind: 'academic-reference'},
      {label: 'Project Gutenberg — The Consolation of Philosophy', url: 'https://www.gutenberg.org/ebooks/14328', kind: 'primary-text'},
    ],
  },
  eriugena: {
    lead: 'Eriugena’s unusual access to Greek made translation itself a philosophical intervention at the court of Charles the Bald. He rendered Pseudo-Dionysius and works associated with Gregory of Nyssa and Maximus the Confessor into Latin, then composed the Periphyseon as a dialogue between teacher and student. Its “nature” includes what is and what is not, and its fourfold division maps procession from and return to God. That architecture must be read through Eriugena’s negative theology rather than flattened into a simple claim that God and the world are identical. Its later condemnations belong to reception history and do not remove the need to read its distinctions closely.',
    keyIdeas: [
      'Fourfold nature: the Periphyseon maps divine source, primordial causes, created effects, and the return of all things rather than four independent substances.',
      'Negative theology: affirmative names disclose divine manifestation, while negation denies that any created category defines God.',
      'Translation as argument: rendering Greek Christian texts into Latin changed the conceptual resources available to Carolingian readers.',
    ],
    keyWorks: ['Periphyseon (On the Division of Nature)', 'Translation of the Pseudo-Dionysian corpus', 'Homily on the Prologue to John'],
    sections: [
      {
        heading: 'Greek sources, negative language, and the Periphyseon',
        paragraphs: [
          'The Periphyseon joins Latin authorities, especially Augustine, to Greek Christian sources that were rare in the Carolingian learned world. Its four divisions of nature are not four independent things. They are a dialectical scheme for thinking divine causality, primordial causes, created effects, and the return in which every finite description fails before the divine source. Eriugena can therefore affirm manifestations of God in creatures while also denying that any created category defines what God is.',
          'This makes “pantheist” a poor shortcut. The language is deliberately daring, and later ecclesiastical condemnations belong to its reception, but the system repeatedly distinguishes creation from the divine essence and uses affirmative and negative predication in different ways. The gallery also separates Eriugena’s own writings from sources he translated: translation gave Latin readers new conceptual resources, while the synthesis and its tensions were his philosophical work.',
        ],
      },
    ],
    sectionCaution: 'Calling Eriugena simply a pantheist makes a disputed later category do the work of interpretation. The stained glass and later manuscript witnesses also document remembrance and transmission, not a contemporary portrait or an untouched authorial text.',
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — John Scottus Eriugena', url: 'https://plato.stanford.edu/entries/scottus-eriugena/', kind: 'academic-reference'},
      {label: 'Open Library — Periphyseon: The Division of Nature', url: 'https://openlibrary.org/books/OL2117452M/Periphyseon', kind: 'collection-record'},
      {label: 'University College Cork CELT — Eriugena bibliography', url: 'https://celt.ucc.ie/eriugenabibl.html', kind: 'collection-record'},
    ],
  },
  'medieval-scholasticism': {
    lead: '“Scholasticism” names a changing family of learned practices, not one medieval doctrine. Close reading, the posing of questions, distinctions among meanings, formal disputation, and written determinations organized inquiry across monasteries, cathedral schools, and universities. Latin scholars worked with Christian authorities and with philosophy transmitted from Greek and Arabic, including arguments developed in Islamic and Jewish intellectual worlds. The result was not automatic synthesis: shared texts and procedures created durable disagreements about universals, knowledge, creation, law, freedom, and the proper relation between philosophy and theology. The category is therefore institutional and methodological before it is a checklist of conclusions or one canonical method.',
    keyIdeas: [
      'Lectio and commentary: authoritative texts became objects of grammatical, logical, and philosophical reconstruction.',
      'Quaestio and disputation: objections and replies institutionalized disagreement instead of merely repeating inherited conclusions.',
      'Connected transmission: Greek, Arabic, Hebrew, and Latin textual histories shaped the curriculum without becoming one undifferentiated tradition.',
    ],
    keyWorks: ['Peter Lombard, Sentences', 'Peter Abelard, Sic et Non', 'Thomas Aquinas, Summa theologiae', 'University disputations and commentaries on Aristotle'],
    sections: [
      {
        heading: 'A practice, several institutions, many disagreements',
        paragraphs: [
          '“Scholasticism” is most useful here as a family of learned practices rather than a single creed. Lectio involved close reading of an authoritative text; a quaestio isolated a difficulty; disputation ordered objections, replies, and a master’s determination. Those forms could train agreement, but they also institutionalized conflict. Commentaries and sentence collections regularly became launch points for arguments their source authors had never posed.',
          'The practices developed across monastic and cathedral schools and then universities, and they were never exclusively philosophical or exclusively theological. Latin scholars worked with materials translated from Greek and Arabic and with arguments developed in Islamic and Jewish intellectual worlds. That connected history does not make every participant a “scholastic” in the same institutional sense. The label should reveal textual labor, pedagogy, and contest—not turn several languages and religious traditions into one European school.',
        ],
      },
    ],
    sectionCaution: 'This gallery follows Latin Christian institutions without treating them as the whole of medieval philosophy. Islamic and Jewish thinkers retain their own primary settings; translation and argument connect the rooms without retroactively enrolling every contributor in one European school.',
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Medieval Philosophy', url: 'https://plato.stanford.edu/entries/medieval-philosophy/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Literary Forms of Medieval Philosophy', url: 'https://plato.stanford.edu/entries/medieval-literary/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Argumentation in Medieval Traditions', url: 'https://plato.stanford.edu/entries/argument/supplement.html', kind: 'academic-reference'},
    ],
  },
  anselm: {
    lead: 'Anselm’s famous Proslogion reasoning belongs inside a larger monastic project rather than a free-standing modern proof exercise. Its address is prayerful, and its single-argument aspiration follows the Monologion’s more extended reasoning about the divine nature. Gaunilo’s contemporary reply and Anselm’s response show that the inference was disputed from the beginning. Works on truth, freedom of choice, the fall, and the harmony of foreknowledge and freedom reveal a philosopher of language and agency whose range is obscured when one chapter becomes the whole exhibit. His arguments were also written within Benedictine discipline and conflicts over ecclesiastical office, never outside institutional history.',
    keyIdeas: [
      'Faith seeking understanding: inquiry tests what follows from commitments rather than treating argument as decorative.',
      'That than which nothing greater can be thought: the Proslogion’s reasoning belongs to a prayerful sequence and was contested immediately.',
      'Freedom as rectitude: freedom concerns preserving rightness of will for its own sake, not merely unrestricted choice among alternatives.',
    ],
    keyWorks: ['Monologion', 'Proslogion and Reply to Gaunilo', 'De veritate', 'De libertate arbitrii', 'Cur Deus Homo'],
    sections: [
      {
        heading: 'Prayer, argument, freedom, and necessity',
        paragraphs: [
          '“Faith seeking understanding” does not mean that argument is decorative. Anselm asks what follows when a believer tries to understand what is affirmed, using careful distinctions to expose contradictions and clarify divine predicates. In the Proslogion, the phrase concerning that than which nothing greater can be thought operates inside this disciplined meditation. Calling it the “ontological argument” is later and useful, but it can hide the work’s devotional voice, its sequence, and the immediate exchange with Gaunilo.',
          'Anselm’s account of freedom is likewise broader than unrestricted choice between alternatives. Freedom concerns preserving rectitude of will for its own sake, while responsibility, grace, temptation, and foreknowledge require distinct analyses. Cur Deus Homo adds a dialogical inquiry into incarnation and satisfaction that has had enormous influence and substantial criticism. The gallery presents these works as arguments situated in Benedictine life and ecclesiastical conflict, not as one timeless theological formula.',
        ],
      },
    ],
    sectionCaution: '“Ontological argument” is a useful later label, not Anselm’s title for an isolated proof. Cur Deus Homo is likewise historically influential but contested; the exhibit presents its reasoning and reception without making its satisfaction account the only Christian view.',
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Anselm of Canterbury', url: 'https://plato.stanford.edu/entries/anselm/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Anselm', url: 'https://iep.utm.edu/anselm/', kind: 'academic-reference'},
      {label: 'Fordham Internet Medieval Sourcebook — Anselm, Proslogion', url: 'https://sourcebooks.web.fordham.edu/basis/anselm-proslogium.asp', kind: 'primary-text'},
    ],
  },
  abelard: {
    lead: 'Abelard’s method was not the mechanical celebration of contradiction. The Sic et Non arranges apparently conflicting authorities so that students must test wording, attribution, context, and distinctions before deciding whether a conflict is real. His logic treats universal terms without turning universals into shared things, while his ethics locates moral fault in consent and intention rather than in an external deed alone. Those positions remain debated, and neither Héloïse’s letters nor Abelard’s autobiographical Historia calamitatum should be reduced to background decoration for his philosophy. The exchange preserves more than a romance: Héloïse argues about intention, marriage, authority, and religious life.',
    keyIdeas: [
      'Dialectical reading: apparent contradictions require tests of wording, context, attribution, and conceptual distinction.',
      'Universals and signification: universal terms can signify many individuals without a shared universal thing existing outside the mind.',
      'Consent and moral fault: an act’s external description does not by itself settle the agent’s culpability.',
    ],
    keyWorks: ['Sic et Non', 'Logica Ingredientibus', 'Ethica (Scito te ipsum)', 'Historia calamitatum', 'Correspondence attributed to Abelard and Héloïse'],
    sections: [
      {
        heading: 'Dialectic, moral intention, and contested voices',
        paragraphs: [
          'Abelard’s semantic approach to universals rejects both a separately existing universal thing and the idea that universal words are empty noise. His analyses of words, concepts, inference, identity, and difference grew from the limited logical corpus then available in Latin, before the complete recovery of Aristotle’s logical works. That chronology matters: his achievements belong to an early twelfth-century setting rather than to a finished thirteenth-century university syllabus.',
          'In ethics, the act’s physical description does not by itself determine guilt; the agent’s consent to what is believed wrong is central. This does not make consequences irrelevant or supply a modern theory of private sincerity. The letters transmitted under Abelard’s and Héloïse’s names complicate the record further. Scholars continue to debate aspects of their textual history, while Héloïse’s arguments about intention, marriage, authority, and religious life demand interpretation as intellectual work in their own right.',
        ],
      },
    ],
    sectionCaution: 'The transmitted correspondence has a complex textual history, and its voices cannot be treated as stenographic records of private speech. Interpretive uncertainty does not license erasing Héloïse’s arguments or making her merely an episode in Abelard’s biography.',
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Peter Abelard', url: 'https://plato.stanford.edu/entries/abelard/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Peter Abelard', url: 'https://iep.utm.edu/abelard/', kind: 'academic-reference'},
      {label: 'Fordham Internet Medieval Sourcebook — Sic et Non, prologue', url: 'https://sourcebooks.web.fordham.edu/source/Abelard-SicetNon-Prologue.asp', kind: 'primary-text'},
    ],
  },
  'duns-scotus': {
    lead: 'Scotus’s univocity thesis does not claim that God and creatures possess being in the same finite mode. It argues that metaphysical reasoning needs a concept of being stable enough to function with the same meaning in premises about both, even though what falls under that concept differs infinitely. His account of individuation likewise makes haecceity a positive principle of being this individual, not a mysterious extra property pasted onto a generic nature. Formal distinction, cognition, natural theology, and a strongly self-determining will connect these positions across an unfinished and textually difficult corpus. The surviving record includes revisions, lecture reports, and later editorial decisions rather than one finished summa.',
    keyIdeas: [
      'Univocity of being: metaphysical inference requires a common concept even though infinite and finite beings differ radically in mode.',
      'Haecceity or thisness: individuality has a positive intrinsic principle and is not merely a bundle of noticeable traits.',
      'Formal distinction and freedom: inseparable realities can be formally distinct, while the will retains a strong power of self-determination.',
    ],
    keyWorks: ['Ordinatio', 'Lectura', 'Reportatio Parisiensis', 'Quaestiones quodlibetales'],
    sections: [
      {
        heading: 'Conceptual unity without metaphysical flattening',
        paragraphs: [
          'Univocal predication answers an argumentative problem: if a central term changes meaning completely between premises, no demonstration concerning God can proceed. Scotus therefore defends a common concept while preserving the radical difference between infinite and finite modes of being. The formal distinction gives him another tool for articulating aspects that are inseparable in a thing yet not identical merely because thought separates them.',
          'His theory of individuation distinguishes a shared common nature from the intrinsic principle by which Socrates is this individual. “Haecceity,” or thisness, should not be confused with a collection of noticeable traits. Scotus’s views survive through the Ordinatio, Lectura, reported Paris lectures, questions, and later editorial work whose chronology and authorship are not uniformly secure. Interpretation must track those textual layers instead of presenting every attributed formulation as one completed system.',
        ],
      },
    ],
    sectionCaution: '“Subtle Doctor” should not become an excuse to turn precise distinctions into obscurity for its own sake. Claims must be tied to a particular textual layer, because chronology, revision, reportatio, and disputed attribution affect how a Scotist position is reconstructed.',
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — John Duns Scotus', url: 'https://plato.stanford.edu/entries/duns-scotus/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — John Duns Scotus', url: 'https://iep.utm.edu/john-duns-scotus/', kind: 'academic-reference'},
      {label: 'Open Library — Duns Scotus, Quaestiones quodlibetales (1639 edition)', url: 'https://openlibrary.org/works/OL15847642W/Quaestiones_quodlibetales', kind: 'collection-record'},
    ],
  },
  ockham: {
    lead: 'Ockham’s philosophy cannot be reduced to the modern slogan called his razor. His demand for explanatory economy operates inside detailed accounts of mental language, concepts, supposition, cognition, consequence, and scientific knowledge. He denies that a universal is one shared thing outside the mind, yet general terms still signify many individuals and support universal claims. His later political writings emerged from the Franciscan poverty controversy and conflict with Pope John XXII, where questions about property, rights, scripture, councils, and coercive authority became inseparable from logic and theology. The logical and political corpora also answer different occasions and should not be collapsed into one principle.',
    keyIdeas: [
      'Nominalism: universality belongs to signs and concepts rather than to one common entity existing in many individuals.',
      'Mental language and supposition: logical analysis asks how terms signify and stand for things in propositions.',
      'Economy with necessity: explanatory entities should not be multiplied without reason; the simplest-sounding answer is not automatically true.',
      'Limits of office: political writings test papal and temporal authority through law, rights, councils, and the poverty controversy.',
    ],
    keyWorks: ['Summa logicae', 'Ordinatio', 'Quodlibetal Questions', 'Dialogus', 'Breviloquium de principatu tyrannico'],
    sections: [
      {
        heading: 'Economy is a rule of argument, not a slogan against complexity',
        paragraphs: [
          'Ockham’s name is attached to the maxim that entities should not be multiplied without necessity, but no single modern wording exhausts his practice. Economy works inside detailed theories of mental language, concepts, supposition, intuitive and abstractive cognition, and logical consequence. His nominalism denies a shared universal entity outside the mind; it does not deny that general terms signify many individuals or that science can make universal claims.',
          'His later political writings arose from the Franciscan poverty controversy and conflict with Pope John XXII. They ask how scripture, law, rights, councils, and coercive authority constrain officeholders. That history should not be compressed into a modern slogan about separating church and state. The logical and political corpora also have different genres and editorial histories, so the gallery treats “Ockham’s razor” as an invitation to examine explanatory work, not as permission to prefer whatever answer sounds simplest.',
        ],
      },
    ],
    sectionCaution: 'The familiar wording “entities must not be multiplied beyond necessity” is a later summary rather than a magic sentence that settles every problem. Economy constrains explanation only after the relevant evidence, distinctions, and explanatory tasks have been identified.',
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — William of Ockham', url: 'https://plato.stanford.edu/entries/ockham/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — William of Ockham', url: 'https://iep.utm.edu/ockham/', kind: 'academic-reference'},
      {label: 'British Academy — William of Ockham, Dialogus edition and translation', url: 'https://publications.thebritishacademy.ac.uk/pubs/dialogus/index.html', kind: 'primary-text'},
    ],
  },
  'meister-eckhart': {
    lead: 'Eckhart was a Dominican master trained in the university practices displayed elsewhere in this gallery, not an isolated voice outside scholasticism. His Latin questions and commentaries and his Middle High German sermons address overlapping problems through different genres and audiences. Detachment, the “birth” of the Word in the soul, intellect, divine unity, and the ground of the soul therefore require attention to argumentative and pastoral context. Modern selections often detach startling sentences from both, while the medieval proceedings against propositions from his work demand equally careful textual discrimination. His reputation as a timeless mystic can obscure the university arguments and pastoral responsibilities within which that language worked.',
    keyIdeas: [
      'Detachment: release from possessive willing enables just action rather than indifference to other people.',
      'Divine birth and the ground of the soul: preaching language explores how intellect and creaturely life relate to their source.',
      'Affirmation and unknowing: statements about being, intellect, and unity are pressed beyond ordinary creaturely predication.',
    ],
    keyWorks: ['Latin Questions and Commentaries', 'Middle High German sermons', 'Book of Divine Consolation', 'Talks of Instruction'],
    sections: [
      {
        heading: 'University master, vernacular preacher, censured propositions',
        paragraphs: [
          'Eckhart’s language presses distinctions to their limit: God can be discussed through being, intellect, unity, causation, and the soul’s relation to its source, yet the divine cannot be contained by a creaturely concept. Detachment is not apathy or flight from responsibility. It names a release from possessive willing that makes just action possible without treating God as an instrument for reward.',
          'The German sermons are neither simplified transcripts of the Latin works nor unrestricted access to private mystical experience. They are crafted preaching in a manuscript tradition with difficult questions of authenticity and wording. In 1329, after Eckhart’s death, the papal bull In agro dominico condemned some propositions and characterized others as suspect while noting that Eckhart had professed submission. The ruling is essential reception history, but it cannot substitute for identifying what a particular work argues in context.',
        ],
      },
    ],
    sectionCaution: 'The 1329 bull judged selected propositions after Eckhart’s death; it is not a neutral summary of his entire corpus. Nor do modern anthologies supply an unmediated private experience: genre, manuscript attribution, vernacular wording, and Latin parallels remain part of the evidence. The linked Claud Field selection is a c. 1909 popular translation based on an older, noncritical textual tradition and should not settle authenticity or exact wording.',
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Meister Eckhart', url: 'https://plato.stanford.edu/archives/fall2025/entries/meister-eckhart/', kind: 'academic-reference'},
      {label: 'Christian Classics Ethereal Library — Claud Field trans., Meister Eckhart’s Sermons (c. 1909 popular, noncritical selection)', url: 'https://ccel.org/ccel/eckhart/sermons.all.html', kind: 'primary-text'},
      {label: 'German National Library — Meister Eckhart authority record', url: 'https://d-nb.info/gnd/118529706', kind: 'collection-record'},
    ],
  },
  'marsilius-padua': {
    lead: 'Marsilius wrote the Defensor pacis amid conflict between imperial and papal claims, but its argument is broader than a partisan intervention. Peace requires a civic order in which coercive law derives from the human legislator—the citizens or their “weightier part”—and government executes rather than owns that authority. Divine law teaches what concerns salvation but does not authorize an independent clerical power of temporal punishment. These claims challenge papal plenitude of power without turning Marsilius into a modern secular democrat. Aristotelian civic analysis, scriptural interpretation, ecclesiology, and immediate polemic remain intertwined throughout the work and shape its account of civic peace.',
    keyIdeas: [
      'The human legislator: coercive civil law receives its authority from the body of citizens or its qualified “weightier part.”',
      'Peace and civic functions: differentiated offices serve a sufficient common life when no part usurps coercive jurisdiction.',
      'Divine and human law: spiritual teaching and temporal punishment belong to different kinds of authority.',
      'Against plenitude of power: clergy possess no independent coercive jurisdiction simply by virtue of ecclesiastical office.',
    ],
    keyWorks: ['Defensor pacis', 'Defensor minor', 'De translatione imperii'],
    sections: [
      {
        heading: 'The legislator, coercion, and the limits of papal power',
        paragraphs: [
          'The Defensor pacis begins from peace as a condition of a sufficient civic life and analyzes the community through differentiated functions. Its human legislator is the body of citizens, or its “weightier part,” as the primary source of coercive law. That qualification and Marsilius’s provisions for government prevent an easy equation with modern popular democracy, even while collective authorization and judgment are central to his argument.',
          'Marsilius distinguishes divine law’s teaching about salvation from human law backed by temporal punishment. On that basis he rejects papal plenitude of power and denies clergy an independent coercive jurisdiction. Yet the work combines Aristotelian political reasoning, scriptural interpretation, ecclesiology, and immediate imperial-papal conflict; it is not a secular constitution dropped into the fourteenth century. Its claims about councils, rulers, citizenship, and religious authority remain radical precisely within that setting.',
        ],
      },
    ],
    sectionCaution: 'The “weightier part” is contested and prevents a direct equation between Marsilius and universal modern democracy. His denial of clerical coercion is radical in context, but it does not by itself establish contemporary religious liberty or a secular constitutional state. The linked Latin Wikisource preserves Discourse III only and does not identify its edition or source.',
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
