import type {
  MuseumSupplementalExhibit,
  MuseumSupplementalInterpretationSource,
  MuseumSupplementalVisitorGuideSection,
  MuseumSupplementalWallPlaque,
} from './platoSupplementalExhibits';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
  type SupplementalExhibitAuthoring,
} from './museumSupplementalAuthoring';
import {
  LATE_ANTIQUITY_GALLERY_ID,
  LATE_ANTIQUITY_ROOM_SIGN_COPY,
} from './lateAntiquityGalleryCuration';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from './museumWorldTypes';

export {LATE_ANTIQUITY_GALLERY_ID, LATE_ANTIQUITY_ROOM_SIGN_COPY};

export const LATE_ANTIQUITY_PALETTE = Object.freeze({
  ink: '#221d28',
  purple: '#6f587c',
  blue: '#496982',
  red: '#8b514e',
  gold: '#ae8745',
  olive: '#6d7655',
  parchment: '#e8dcc2',
});

type ReviewedSupplementalInput = Omit<SupplementalExhibitAuthoring, 'panelKicker' | 'sections' | 'sources'> & {
  sections: readonly {paragraph: string; sourceIds: readonly string[]}[];
  visitorGuide: readonly MuseumSupplementalVisitorGuideSection[];
  sources: readonly MuseumSupplementalInterpretationSource[];
  objectInterpretation: string;
  wallPlaque: MuseumSupplementalWallPlaque;
  resolution: string;
  lock: string;
};

const record = (input: ReviewedSupplementalInput): MuseumSupplementalExhibit => {
  const authored = authorSupplementalExhibit({
    ...input,
    sections: input.sections.map(({paragraph}) => ({heading: '', paragraph})),
    sources: input.sources,
    panelKicker: 'Gallery 03 supplemental exhibit',
  });
  return {
    ...authored,
    sections: input.sections.map(({paragraph, sourceIds}) => ({heading: '', paragraphs: [paragraph], sourceIds})),
    visitorGuide: input.visitorGuide,
    objectInterpretation: input.objectInterpretation,
    presentation: {...authored.presentation!, exhibitLayout: 'object-led'},
    wallPlaque: input.wallPlaque,
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-12',
      method: 'Gallery 03 supplemental review: two independent evidence scopes reconciled by the parent across object identity, claims, source mapping, rights, accessibility, provenance, structured interpretation, linking, and aspect-safe presentation.',
      resolution: input.resolution,
      lock: input.lock,
      visualReview: {
        desktop: {
          reviewedOn: '2026-08-12',
          viewport: '1280×720',
          evidence: `Direct route inspected with loaded principal preview, readable three-paragraph interpretation and structured sidebar, visible article CTA, and no horizontal overflow. Evidence: docs/visual-validation/gallery-03-supplementals/desktop/${input.id}.png`,
        },
        mobile: {
          reviewedOn: '2026-08-12',
          viewport: '390×844',
          evidence: `Direct route inspected with wrapped title, loaded object preview, scrollable interpretation, visible article and return controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-03-supplementals/mobile/${input.id}.png`,
        },
        threeDimensional: {
          reviewedOn: '2026-08-12',
          viewport: '1280×720 fresh direct-route session',
          evidence: `Fresh-session authored viewpoint inspected with a live 3D canvas, closed detail panel, distinct installation, readable plaque, and image mounted at its natural scene ratio. Evidence: docs/visual-validation/gallery-03-supplementals/staged-3d/${input.id}.png`,
        },
      },
    },
  };
};

export const LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBITS = [
  record({
    id: 'porphyrian-tree-classification', assetId: 'neoplatonic-porphyrian-tree',
    displayName: 'Porphyry’s Isagoge and the Tree That Came Later', shortTitle: 'The Porphyrian Tree',
    workLabel: 'PORPHYRY · ISAGOGE, PREDICABLES, AND RECEPTION', dateLabel: 'Isagoge c. 270 CE · displayed tree attributed and dated cautiously on its source record',
    question: 'How does a short introduction become a visual technology for classifying reality?',
    frontSubtitle: 'A later Arbor porphyrii makes the Isagoge’s distinctions visible while raising questions about attribution, transmission, and universals.',
    lead: 'This Latin Arbor porphyrii is reception evidence, not a drawing by Porphyry. Its branching form gave later readers a memorable way to arrange distinctions introduced in the Isagoge.',
    keyIdeas: ['Porphyry postpones rather than settles the metaphysics of universals.', 'A diagram makes ordered division spatial and memorable.', 'Boethian translation and commentary became a major Latin transmission channel.'],
    cautions: ['The source record attributes this tree to Boethius and calls it sixth-century, but supplies no holding institution; those claims remain qualified.', 'The displayed image is not Porphyry’s autograph or proof that he devised this exact diagram.'],
    sections: [
      {paragraph: 'The displayed Arbor porphyrii is a Latin classification diagram whose source record attributes it to Boethius and dates it to the sixth century, while giving no holding institution. Those particulars are reported rather than independently established here. The image branches downward from substance through increasingly determinate divisions, making relations among genus, species, and difference spatially legible. It is not an autograph, a surviving page from Porphyry’s workshop, or evidence that Porphyry drew this exact tree. Its historical value lies instead in reception: later teachers and readers turned a compact logical introduction into a durable visual instrument.', sourceIds: ['porphyry-tree-commons', 'porphyry-sep']},
      {paragraph: 'Porphyry wrote the Isagoge as an introduction to Aristotle’s Categories. It organizes five predicables—genus, species, difference, property, and accident—that describe ways a predicate can relate to a subject. At the opening, however, Porphyry explicitly postpones deeper questions: whether genera and species exist outside thought, whether they are corporeal or incorporeal, and whether they exist separately or in sensible things. The work therefore did not settle the later problem of universals. It furnished distinctions through which Greek, Arabic, Byzantine, and Latin readers could formulate that problem with increasing precision.', sourceIds: ['porphyry-sep', 'medieval-universals-sep']},
      {paragraph: 'Boethius translated and commented on the Isagoge, helping establish it at the beginning of Latin logical study for centuries. A branching image clarifies ordered division, but it also interprets: every fork selects which difference counts and can make a contested hierarchy appear inevitable. Reading the tree well means holding its utility and its limits together. It preserves the intellectual afterlife of Porphyry’s distinctions without erasing the choices made by later transmitters. The object thus joins two histories—the ancient curriculum that placed Porphyry before Aristotle and the later graphic culture that made classification visible, teachable, and open to renewed metaphysical dispute.', sourceIds: ['porphyry-sep', 'medieval-universals-sep', 'porphyry-tree-commons']},
    ],
    visitorGuide: [
      {heading: 'Five predicables', items: [
        {label: 'Kinds of predication', description: 'Genus, species, difference, property, and accident organize the Isagoge’s introduction to Aristotelian logic.', sourceIds: ['porphyry-sep']},
        {label: 'Questions postponed', description: 'Porphyry declines to decide whether genera and species exist, are bodies, or are separable from sensible particulars.', sourceIds: ['porphyry-sep', 'medieval-universals-sep']},
      ]},
      {heading: 'Boethian afterlife', items: [
        {label: 'Latin curriculum', description: 'Boethius’s translations and commentaries helped carry the Isagoge into long-lived Latin programs of logical study.', sourceIds: ['porphyry-sep']},
        {label: 'Diagram, not autograph', description: 'The displayed tree is a later classification image; its source record does not make it a drawing by Porphyry.', sourceIds: ['porphyry-tree-commons', 'porphyry-sep']},
      ]},
    ],
    sources: [
      {id: 'porphyry-tree-commons', label: 'Wikimedia Commons: Arbor porphyrii source record', url: "https://commons.wikimedia.org/wiki/File:Arbor_porphyrii_(probably_from_one_of_Boethius'_translations).png", kind: 'collection-record'},
      {id: 'porphyry-sep', label: 'Stanford Encyclopedia of Philosophy: Porphyry', url: 'https://plato.stanford.edu/entries/porphyry/', kind: 'academic-reference'},
      {id: 'medieval-universals-sep', label: 'Stanford Encyclopedia of Philosophy: The Medieval Problem of Universals', url: 'https://plato.stanford.edu/entries/universals-medieval/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The Latin tree is a later visualization of distinctions associated with Porphyry’s Isagoge. Its attribution and date are cautiously reported from the source record; it is not Porphyry’s drawing or an authorial manuscript.',
    articleRoute: {kind: 'philosopher', philosopherId: 'porphyry'}, entityKind: 'philosopher', articleActionLabel: 'Read the full sourced Porphyry article',
    wallPlaque: {type: 'concept-argument-diagram-or-method', title: 'The Porphyrian Tree', invitation: 'A later Latin tree makes genus, species, and difference visible while showing how Boethian transmission transformed Porphyry’s introductory distinctions into a durable instrument of classification.', canonicalContexts: [{kind: 'philosopher', id: 'porphyry'}]},
    resolution: 'Resolved: qualified the displayed tree’s source-record attribution and date, separated it from Porphyry’s authorship, expanded the claim-mapped interpretation, and preserved its natural proportions.',
    lock: 'fnv1a64:fa534cdb7da7f1af',
  }),
  record({
    id: 'augustine-confessions-memory-time', assetId: 'late-augustine-confessions-manuscript',
    displayName: 'Augustine’s Confessions: Memory, Time, and the Divided Will', shortTitle: 'Augustine: Confessions',
    workLabel: 'AUGUSTINE · CONFESSIONS', dateLabel: 'Composed c. 397–400 · copied by Henricus de Bocholdia in 1471',
    question: 'How can a life become intelligible when memory, desire, and time do not form a simple sequence?',
    frontSubtitle: 'A named fifteenth-century copy opens a work in which prayer, remembered life, divided willing, and temporal attention become philosophical inquiry.',
    lead: 'Basel A IV 4, folio 1r, opens Augustine’s Confessions in a copy made by Henricus de Bocholdia in 1471. The page is a late witness to a work composed more than a millennium earlier.',
    keyIdeas: ['The speaking self is formed through address, recollection, and interpretation.', 'Knowing the better does not guarantee willing it without conflict.', 'Time is measured through a present stretching toward memory and expectation.'],
    cautions: ['The work is a crafted prayerful and theological narrative, not a modern neutral autobiography.', 'The 1471 manuscript is evidence of transmission, not Augustine’s working copy or a contemporary portrait.'],
    sections: [
      {paragraph: 'The displayed page is folio 1r of Universitätsbibliothek Basel A IV 4, a manuscript copied in 1471 by Henricus de Bocholdia. Its decorated initial begins the Confessions, while the codex also preserves other Augustinian material. This object is a material witness to long transmission, not Augustine’s own book, a record of the text’s composition, or a portrait of its author. More than a thousand years separate the copyist from Augustine. Naming that distance clarifies what the page can prove: the work remained important enough to copy carefully, organize in a codex, and carry into a different institutional and devotional world.', sourceIds: ['augustine-commons', 'augustine-ecodices']},
      {paragraph: 'Augustine composed the Confessions around 397–400 as prayer, scriptural interpretation, remembered life, and philosophical argument. Its narrative does not simply inventory past events. Earlier loves, habits, friendships, and ambitions are reread from the speaking present, so memory becomes a practice of interpretation. Book VIII makes agency itself a problem: Augustine can judge one course better while willing and resisting it at once. The conflict is not merely missing information. Habit has acquired force, desire pulls in incompatible directions, and the self cannot become unified by issuing a simple command to itself. Conversion is therefore narrated as a transformation of love and action, not only a corrected conclusion.', sourceIds: ['augustine-sep', 'augustine-confessions']},
      {paragraph: 'Book XI turns from narrated history to creation and time. Past and future are not available as present objects, yet a person remembers what has passed and expects what is coming. Augustine describes a threefold present of memory, attention, and expectation, then tests the account through recitation: while a song or poem unfolds, attention transfers what was expected into what is remembered. The example joins measurement to a finite mind stretched across succession. This does not reduce cosmic time to private feeling; it asks how a created knower can measure change at all. The Basel manuscript consequently anchors two histories—the philosophical work’s account of temporal attention and the centuries of copying through which that account endured.', sourceIds: ['augustine-sep', 'augustine-confessions', 'augustine-ecodices']},
    ],
    visitorGuide: [
      {heading: 'Will and conversion', items: [
        {label: 'Competing willing', description: 'Book VIII presents judgment, habit, and desire pulling the agent in opposing directions immediately before conversion.', sourceIds: ['augustine-sep', 'augustine-confessions']},
        {label: 'Crafted address', description: 'The life story is addressed to God and shaped as theological interpretation, not offered as neutral modern autobiography.', sourceIds: ['augustine-sep', 'augustine-confessions']},
      ]},
      {heading: 'Time in Book XI', items: [
        {label: 'Threefold present', description: 'Memory, attention, and expectation explain how past and future bear on present temporal experience.', sourceIds: ['augustine-sep', 'augustine-confessions']},
        {label: 'Recitation test', description: 'The song or poem example tracks attention as anticipated syllables pass into memory.', sourceIds: ['augustine-sep', 'augustine-confessions']},
      ]},
    ],
    sources: [
      {id: 'augustine-commons', label: 'Wikimedia Commons: Basel A IV 4, fol. 1r', url: 'https://commons.wikimedia.org/wiki/File:Basel,_Universitätsbibliothek,_A_IV_4,_f._1r_–_Aurelius_Augustinus,_Confessiones.JPG', kind: 'collection-record'},
      {id: 'augustine-ecodices', label: 'e-codices: Universitätsbibliothek Basel A IV 4', url: 'https://www.e-codices.unifr.ch/en/list/one/ubb/A-IV-0004', kind: 'collection-record'},
      {id: 'augustine-sep', label: 'Stanford Encyclopedia of Philosophy: Saint Augustine', url: 'https://plato.stanford.edu/entries/augustine/', kind: 'academic-reference'},
      {id: 'augustine-confessions', label: 'Augustine, Confessions (Christian Classics Ethereal Library)', url: 'https://www.ccel.org/ccel/augustine/confessions.html', kind: 'primary-text'},
    ],
    objectInterpretation: 'Copied by Henricus de Bocholdia in 1471, Basel A IV 4 is a late material witness to the Confessions. It is not Augustine’s working manuscript or evidence for his appearance.',
    articleRoute: {kind: 'philosopher', philosopherId: 'augustine'}, entityKind: 'philosopher', articleActionLabel: 'Read the full sourced Augustine article',
    wallPlaque: {type: 'work-or-text', title: 'Augustine’s Confessions', invitation: 'A 1471 manuscript opens a work that turns remembered life, divided willing, and the passage from expectation through attention into memory into sustained philosophical inquiry.', canonicalContexts: [{kind: 'philosopher', id: 'augustine'}]},
    resolution: 'Resolved: named the 1471 copyist and exact codex, distinguished transmission from composition, expanded the divided-will and time interpretation, and added claim-mapped object and text sources.',
    lock: 'fnv1a64:dc301487af83d61f',
  }),
  record({
    id: 'pseudo-dionysius-celestial-hierarchy', assetId: 'late-celestial-hierarchy-manuscript',
    displayName: 'The Celestial Hierarchy: Names, Mediation, and Unknowing', shortTitle: 'Pseudo-Dionysius: Celestial Hierarchy',
    workLabel: 'PSEUDO-DIONYSIUS · CELESTIAL HIERARCHY AND RECEPTION', dateLabel: 'Corpus: late 5th or early 6th century · displayed illumination: Utrecht, 1400–1404',
    question: 'Can ordered symbols guide thought toward what ultimately exceeds every symbol and name?',
    frontSubtitle: 'Dirc van Delft’s nine angelic choirs show a medieval reception of ordered mediation, while the corpus resists reducing divine reality to any image or name.',
    lead: 'Dirc van Delft’s 1400–1404 illumination arranges nine angelic choirs in three tiers. It visualizes a later medieval reception of celestial order rather than preserving a page written by Pseudo-Dionysius.',
    keyIdeas: ['Hierarchy names ordered participation and transmission, not merely institutional rank.', 'Affirmative names can guide inquiry while remaining inadequate.', 'Pseudonymous apostolic identity profoundly affected reception.'],
    cautions: ['Modern scholarship does not identify the author with the first-century Dionysius of Acts.', 'The illumination’s tidy tiers are a later visualization and should not substitute for the corpus’s account of symbol, mediation, and unknowing.'],
    sections: [
      {paragraph: 'The installed object is Dirc van Delft’s The Nine Choirs of Angels, made in Utrecht between 1400 and 1404 and now Walters Art Museum W.171.6V. Within a large illuminated initial, three horizontal bands contain nine groups of angels. The image provides a compact medieval visualization of ranked celestial communities. It is not a manuscript of De coelesti hierarchia, not an author portrait, and not evidence for the corpus’s original late-antique setting. Its relevance is reception: centuries after Pseudo-Dionysius wrote, an artist could make angelic hierarchy visible through color, symmetry, and tiers for a Christian manuscript audience.', sourceIds: ['nine-choirs-commons', 'pseudo-dionysius-sep']},
      {paragraph: 'The Celestial Hierarchy interprets scriptural angelic names and arranges nine ranks in three triads. Yet hierarchy is more than a static ladder or ecclesiastical title. It names an ordered work of receiving, being transformed by, and transmitting illumination according to each participant’s capacity. The treatise also reflects on why scripture uses material and even deliberately unlike symbols for immaterial beings. Such images can teach without claiming literal resemblance; their strangeness may prevent a viewer from identifying divine reality with an attractive finite form. Van Delft’s tiers help one see the order, but the text asks how every visible ordering functions as mediated sign rather than transparent picture.', sourceIds: ['pseudo-dionysius-sep', 'celestial-hierarchy-primary']},
      {paragraph: 'Across the corpus, affirmative names are paired with negation and a movement beyond both. Calling the divine good, being, or unity can guide inquiry, but no finite predicate contains the source of all. The author’s chosen identity intensified the texts’ authority: he wrote as Dionysius the Areopagite, Paul’s Athenian convert, although modern scholarship dates the corpus to the late fifth or early sixth century. That pseudonymous persona shaped Greek, Syriac, and Latin receptions long before its chronology was recognized. The displayed illumination belongs to that afterlife. It records the visual power of celestial ranks while the text itself warns against mistaking any ranked image or name for adequate comprehension of the divine.', sourceIds: ['pseudo-dionysius-sep', 'celestial-hierarchy-primary', 'nine-choirs-commons']},
    ],
    visitorGuide: [
      {heading: 'Nine ranks, three triads', items: [
        {label: 'Scriptural orders', description: 'The treatise reads nine named angelic ranks as ordered forms of receiving and transmitting illumination.', sourceIds: ['pseudo-dionysius-sep', 'celestial-hierarchy-primary']},
        {label: 'Medieval visualization', description: 'Van Delft’s three painted bands render those nine choirs as later reception, not as a late-antique authorial diagram.', sourceIds: ['nine-choirs-commons']},
      ]},
      {heading: 'Symbol and unknowing', items: [
        {label: 'Unlike symbols', description: 'The Celestial Hierarchy treats incongruous scriptural images as a way to resist literal likeness.', sourceIds: ['celestial-hierarchy-primary', 'pseudo-dionysius-sep']},
        {label: 'Pseudonymous authority', description: 'The apostolic persona shaped reception even though scholarship dates the corpus to late antiquity.', sourceIds: ['pseudo-dionysius-sep']},
      ]},
    ],
    sources: [
      {id: 'nine-choirs-commons', label: 'Wikimedia Commons / Walters Art Museum: Dirc van Delft, The Nine Choirs of Angels', url: 'https://commons.wikimedia.org/wiki/File:Dirc_van_Delft_-_The_Nine_Choirs_of_Angels_-_Walters_W1716V_-_Full_Page.jpg', kind: 'collection-record'},
      {id: 'pseudo-dionysius-sep', label: 'Stanford Encyclopedia of Philosophy: Pseudo-Dionysius the Areopagite', url: 'https://plato.stanford.edu/entries/pseudo-dionysius-areopagite/', kind: 'academic-reference'},
      {id: 'celestial-hierarchy-primary', label: 'Pseudo-Dionysius, The Celestial Hierarchy (Christian Classics Ethereal Library)', url: 'https://ccel.org/ccel/dionysius/celestial.toc.html', kind: 'primary-text'},
    ],
    objectInterpretation: 'Van Delft’s 1400–1404 illumination visualizes the nine angelic choirs in medieval reception. It is not a manuscript of Pseudo-Dionysius or evidence for the corpus’s original setting.',
    articleRoute: {kind: 'philosopher', philosopherId: 'pseudo-dionysius'}, entityKind: 'philosopher', articleActionLabel: 'Read the full sourced Pseudo-Dionysius article',
    wallPlaque: {type: 'reception-or-transmission-history', title: 'The Celestial Hierarchy in Medieval Reception', invitation: 'Van Delft’s nine angelic choirs make ordered mediation visible, while Pseudo-Dionysius’s symbolic theology warns that no visible rank, image, or divine name is adequate to its source.', canonicalContexts: [{kind: 'philosopher', id: 'pseudo-dionysius'}]},
    resolution: 'Resolved: reconciled the record to the installed Walters illumination, separated medieval visualization from the late-antique corpus, and mapped the nine ranks, symbolic method, and pseudonymous reception to sources.',
    lock: 'fnv1a64:a02e79939b2f7c11',
  }),
  record({
    id: 'late-commentary-codex', assetId: 'late-greek-aristotle-codex',
    displayName: 'The Commentary Classroom: Reading Aristotle Line by Line', shortTitle: 'The Commentary Classroom',
    workLabel: 'COMMENTARY PRACTICE · TEXT, LEMMA, EXPLANATION', dateLabel: 'Late-antique teaching practice · displayed post-Byzantine Politics manuscript dated 1493',
    question: 'When does explaining a canonical text become a new philosophical work?',
    frontSubtitle: 'A precisely identified later Politics manuscript opens the material and institutional history of lemma, exposition, pupil transcription, and philosophical disagreement.',
    lead: 'This open Greek manuscript contains Aristotle’s Politics IV and is dated 1493. It is later evidence for the text’s transmission, not a surviving notebook from a late-antique commentary classroom.',
    keyIdeas: ['Commentary is an argumentative genre, not only paraphrase.', 'Teacher and student notes complicate individual authorship.', 'Textual correction and philosophical interpretation often occur together.'],
    cautions: ['The displayed manuscript is post-Byzantine material context, not a copy used by Ammonius, Simplicius, or another late-antique commentator.', 'Its reported Naples shelfmark and folio range are retained with the source record’s uncertainty.'],
    sections: [
      {paragraph: 'The displayed object is an open Greek minuscule manuscript of Aristotle’s Politics IV, dated 1493 and reported on its source record as Naples, Biblioteca Nazionale III.E.2, folios 157r–158?. A large ornamental initial and compact columns of Greek text are visible. The question mark attached to the folio identification is preserved because the source record does not warrant greater certainty. This post-Byzantine codex is not an autograph, a late-antique lecture transcript, or a book known to have belonged to Ammonius or Simplicius. It supplies later material context for the copying and continued reading of an Aristotelian text whose commentary tradition had already developed over many centuries.', sourceIds: ['commentary-codex-commons', 'commentators-sep']},
      {paragraph: 'Late-antique commentary was not simply a layer of definitions placed beneath an authoritative text. Commentators selected a lemma, explained vocabulary and syntax, posed difficulties, compared interpretations, and built arguments that could extend beyond the passage under discussion. The format made close reading a philosophical method: choosing where a lemma begins, which contradiction needs repair, and which premise links it to a wider curriculum already takes a position. Authorship could also be layered. Some surviving works present a teacher’s exposition as recorded by a pupil, and materials associated with Ammonius include commentaries produced in this lecture-room setting. A named text may therefore preserve teaching, transcription, revision, and later copying rather than one isolated act of composition.', sourceIds: ['commentators-sep']},
      {paragraph: 'The Alexandrian curriculum placed Aristotelian study within a larger Platonist education. Commentators often pursued concord between Plato and Aristotle, but harmony was an argued interpretive strategy, not a neutral historical fact. It could guide the order of reading and the resolution of apparent disagreement while still leaving room for substantial debate. The 1493 Politics manuscript cannot document those earlier classrooms directly, yet it helps separate intellectual practice from material survival. Late-antique teachers generated philosophical questions through line-by-line exposition; later copyists preserved the base texts through which those questions remained available. Commentary is therefore both an argumentative genre and a social history of teachers, pupils, libraries, corrections, and changing institutions of reading.', sourceIds: ['commentators-sep', 'commentary-codex-commons']},
    ],
    visitorGuide: [
      {heading: 'From lecture to commentary', items: [
        {label: 'Layered authorship', description: 'Some Alexandrian commentaries preserve teaching recorded by pupils rather than a single author’s finished book.', sourceIds: ['commentators-sep']},
        {label: 'Lemma and problem', description: 'Selecting a passage for exposition frames vocabulary, contradictions, and the larger curricular question to be solved.', sourceIds: ['commentators-sep']},
      ]},
      {heading: 'Concord as a strategy', items: [
        {label: 'Plato and Aristotle', description: 'Late commentators often argued for harmony between the two philosophers; the harmony was an interpretive achievement, not a given.', sourceIds: ['commentators-sep']},
        {label: 'Later material witness', description: 'The 1493 Politics codex shows continued Greek transmission, not the physical setting of a late-antique class.', sourceIds: ['commentary-codex-commons']},
      ]},
    ],
    sources: [
      {id: 'commentary-codex-commons', label: 'Wikimedia Commons: Greek minuscule manuscript of Aristotle’s Politics IV', url: 'https://commons.wikimedia.org/wiki/File:Greek_manuscript_minuscule_Aristotle.png', kind: 'collection-record'},
      {id: 'commentators-sep', label: 'Stanford Encyclopedia of Philosophy: Commentators on Aristotle', url: 'https://plato.stanford.edu/entries/aristotle-commentators/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The 1493 Greek Politics manuscript is a post-Byzantine material witness to Aristotelian transmission. It is not a surviving late-antique classroom copy or the work of a named commentator.',
    articleRoute: {kind: 'branch', branchId: 'neoplatonism'}, entityKind: 'branch', articleActionLabel: 'Read the full sourced Neoplatonism article',
    wallPlaque: {type: 'historical-event-or-institutional-context', title: 'The Commentary Classroom', invitation: 'A later Greek Politics manuscript anchors the material history of texts that late-antique teachers transformed through lemmas, pupil transcription, philosophical argument, and contested projects of Plato–Aristotle concord.', canonicalContexts: [{kind: 'branch', id: 'neoplatonism'}]},
    resolution: 'Resolved: identified the displayed 1493 Politics manuscript and qualified shelfmark, separated it from late-antique classroom evidence, and restored sourced interpretation of commentary authorship, method, and concord.',
    lock: 'fnv1a64:28f9c3a4838ea99c',
  }),
  record({
    id: 'boethius-philosophy-in-prison', assetId: 'late-boethius-consolation-manuscript',
    displayName: 'Boethius: Philosophy in Prison and Logic in Translation', shortTitle: 'Boethius: A Double Transmission',
    workLabel: 'BOETHIUS · CONSOLATION, LOGIC, AND LATIN AFTERLIFE', dateLabel: 'c. 475–526 · displayed Consolation manuscript made in Italy in 1385',
    question: 'How can one thinker transmit Greek logic and also stage Philosophy as a consoling interlocutor?',
    frontSubtitle: 'A medieval manuscript stages Boethius as teacher and prisoner, opening two distinct histories of consolation and Latin logical education.',
    lead: 'University of Glasgow MS Hunter 374, folio 4r, was made in Italy in 1385 by Gregorius of Genoa and Brother Amadeus. Its paired miniatures imagine Boethius teaching and imprisoned.',
    keyIdeas: ['The Consolation tests fortune, providence, foreknowledge, freedom, and the highest good.', 'Translations and commentaries create technical Latin vocabularies.', 'Personified Philosophy turns argument into a therapeutic dialogue.'],
    cautions: ['The 1385 miniatures are medieval reception images, not likenesses or records of Boethius’s prison.', 'Boethius transmitted and reshaped selected Greek logical works; he was not a neutral conduit for an entire ancient tradition.'],
    sections: [
      {paragraph: 'The displayed page is University of Glasgow Library MS Hunter 374 (V.1.11), folio 4r, an Italian manuscript of 1385 associated with Gregorius of Genoa and the scribe Brother Amadeus. Its upper miniature imagines Boethius teaching; below, he appears confined. These scenes give visual form to the work’s author and prison setting for a medieval audience, but they are not contemporary likenesses, architectural records, or eyewitness evidence. The manuscript is reception material made more than eight centuries after Boethius’s death. Its value is to show how later readers joined the authority of a teacher to the vulnerability of a condemned prisoner.', sourceIds: ['boethius-commons', 'boethius-sep']},
      {paragraph: 'The Consolation of Philosophy alternates prose and verse as personified Philosophy addresses a prisoner disoriented by lost status, fortune, and impending death. Argument is inseparable from therapy: the interlocutor must learn to see apparent goods, providence, freedom, foreknowledge, and the highest good in a different order. Poetry changes the pace and emotional orientation of that retraining rather than merely decorating the prose. The historical Boethius wrote while imprisoned after serving the Ostrogothic court, but the dialogue does not function as a modern courtroom memoir. It stages a philosophical examination in which the prisoner’s understanding and desire must be reformed together.', sourceIds: ['boethius-sep']},
      {paragraph: 'Boethius also created a second, institutional afterlife through Latin translations and commentaries on Aristotle and Porphyry. Rendering technical Greek distinctions into Latin required choices about vocabulary, explanatory structure, and curricular sequence. His versions of works including the Categories and On Interpretation, together with Porphyrian materials, became foundational for medieval Latin logical study; the Posterior Analytics did not survive in his translation program as the same standard channel. Consolation and logic therefore transmit in different modes. One makes philosophy an interlocutor who reorganizes a life under pressure; the other builds terminological and pedagogical tools for classrooms. The Glasgow manuscript unites those afterlives visually without making medieval imagery evidence for Boethius’s actual appearance or confinement.', sourceIds: ['boethius-sep', 'boethius-commons']},
    ],
    visitorGuide: [
      {heading: 'Prose, verse, and therapy', items: [
        {label: 'Prison dialogue', description: 'Personified Philosophy addresses a condemned prisoner through alternating argument and poetry.', sourceIds: ['boethius-sep']},
        {label: 'Fortune and freedom', description: 'The dialogue connects unstable goods to providence, divine foreknowledge, human freedom, and the highest good.', sourceIds: ['boethius-sep']},
      ]},
      {heading: 'The Latin logic channel', items: [
        {label: 'Technical vocabulary', description: 'Translation and commentary established Latin distinctions that structured later logical education.', sourceIds: ['boethius-sep']},
        {label: 'Uneven inheritance', description: 'Boethius’s Aristotle and Porphyry circulated widely, while his planned translation program remained incomplete.', sourceIds: ['boethius-sep']},
      ]},
    ],
    sources: [
      {id: 'boethius-commons', label: 'Wikimedia Commons / University of Glasgow: Consolation manuscript, MS Hunter 374, fol. 4r', url: 'https://commons.wikimedia.org/wiki/File:Consolation_of_philosophy_1385_boethius_images.jpg', kind: 'collection-record'},
      {id: 'boethius-sep', label: 'Stanford Encyclopedia of Philosophy: Anicius Manlius Severinus Boethius', url: 'https://plato.stanford.edu/entries/boethius/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The 1385 Glasgow manuscript imagines Boethius first teaching and then imprisoned. Its miniatures are medieval reception, not a likeness or record of his confinement.',
    articleRoute: {kind: 'branch', branchId: 'neoplatonism'}, entityKind: 'branch', articleActionLabel: 'Read the full sourced Neoplatonism article',
    wallPlaque: {type: 'reception-or-transmission-history', title: 'Boethius: Philosophy and Translation', invitation: 'A 1385 manuscript stages Boethius as teacher and prisoner, joining the Consolation’s philosophical therapy to the Latin translations and commentaries that shaped medieval logical study.', canonicalContexts: [{kind: 'branch', id: 'neoplatonism'}]},
    resolution: 'Resolved: verified the Glasgow manuscript, makers, date, and medieval reception status; corrected Boethius’s dates; and mapped the Consolation and Latin logic transmission without changing the canonical article.',
    lock: 'fnv1a64:a0705effaa123b59',
  }),
  record({
    id: 'hypatia-alexandrian-teaching', assetId: 'late-hypatia-reception',
    displayName: 'Hypatia: Alexandrian Teaching Between Evidence and Legend', shortTitle: 'Hypatia: Evidence and Legend',
    workLabel: 'HYPATIA · TEACHING, TESTIMONY, AND RECEPTION', dateLabel: 'c. 355–415 CE · displayed printed portrait invented by Jules Maurice Gaspard in 1908',
    question: 'How can a museum recover intellectual importance without filling archival gaps with legend?',
    frontSubtitle: 'A modern imagined portrait makes the gap between Hypatia’s documented teaching network and the symbols later built around her especially visible.',
    lead: 'Jules Maurice Gaspard created this profile of Hypatia for a 1908 printed publication. No authenticated portrait survives, so the image documents modern reception rather than her appearance.',
    keyIdeas: ['Teaching networks can be historically visible even when works do not survive intact.', 'Mathematical and philosophical study belonged to one Alexandrian curriculum.', 'A violent death can eclipse a life’s intellectual practice in later memory.'],
    cautions: ['No authenticated portrait or securely surviving work by Hypatia is known.', 'Later literary reports differ in date, purpose, and proximity; none supplies a complete neutral account of her teaching or murder.'],
    sections: [
      {paragraph: 'Jules Maurice Gaspard’s classicalizing profile appeared in 1908 as a printed insert in Elbert Hubbard’s Little Journeys to the Homes of Great Teachers, volume 23, number 4. It shows a young woman in an imagined antique mode, but no authenticated portrait of Hypatia survives. The image was produced almost fifteen centuries after her death and cannot establish her face, clothing, age, or teaching setting. It is valuable as reception evidence: modern publishers and artists wanted a recognizable Hypatia and supplied a visual identity where the ancient record did not. The object therefore makes historical absence visible rather than filling that absence with fact.', sourceIds: ['hypatia-commons', 'hypatia-iep']},
      {paragraph: 'Evidence closer to Hypatia’s lifetime presents an Alexandrian teacher of philosophy and mathematics with influential pupils. Synesius of Cyrene addresses her directly in surviving letters; Letter 15 shows the continuing authority of their intellectual relationship. Other later testimonia associate her with work on Diophantus, astronomical material, and Apollonius’s Conics, but the Suda’s attributions were compiled centuries afterward and do not license confident claims that particular surviving texts are hers. Responsible reconstruction keeps both points in view: her teaching network and scholarly standing are historically significant, while the exact contents of her writings and curriculum remain uncertain.', sourceIds: ['synesius-letter-15', 'hypatia-suda', 'hypatia-iep']},
      {paragraph: 'Socrates Scholasticus reports that a Christian crowd murdered Hypatia in 415 amid severe civic and ecclesiastical conflict in Alexandria. His account is indispensable but not a complete neutral explanation of every motive or participant. Later authors and modern retellings repeatedly made the killing symbolize a single conflict—science against religion, paganism against Christianity, reason against fanaticism, or political freedom against authority. Those frames can illuminate parts of reception while flattening a contested local history and eclipsing Hypatia’s intellectual life. Reading Gaspard’s portrait beside letters and narrative sources restores a necessary distinction: ancient evidence can support a teacher, network, and violent death, while the confident face and many totalizing meanings belong to later memory.', sourceIds: ['socrates-hypatia', 'hypatia-iep', 'hypatia-commons']},
    ],
    visitorGuide: [
      {heading: 'A teacher in surviving letters', items: [
        {label: 'Direct address', description: 'Synesius’s Letter 15 is extant contemporary correspondence addressed to Hypatia and witnesses her continuing authority.', sourceIds: ['synesius-letter-15']},
        {label: 'Work attributions', description: 'The Suda links Hypatia to mathematical and astronomical works, but its testimony is much later and requires qualification.', sourceIds: ['hypatia-suda', 'hypatia-iep']},
      ]},
      {heading: 'Murder and testimony', items: [
        {label: 'Socrates, Book VII', description: 'Socrates Scholasticus reports the 415 murder within Alexandrian civic and ecclesiastical conflict.', sourceIds: ['socrates-hypatia']},
        {label: 'Not a complete account', description: 'One narrative source cannot by itself resolve every political motive, responsibility, or later interpretation.', sourceIds: ['socrates-hypatia', 'hypatia-iep']},
      ]},
      {heading: 'The invented face', items: [
        {label: '1908 publication', description: 'Gaspard’s profile was printed in Little Journeys; it is not derived from an authenticated ancient likeness.', sourceIds: ['hypatia-commons']},
        {label: 'Reception evidence', description: 'The portrait shows modern demand for a recognizable Hypatia, not what the Alexandrian philosopher looked like.', sourceIds: ['hypatia-commons', 'hypatia-iep']},
      ]},
    ],
    sources: [
      {id: 'hypatia-commons', label: 'Wikimedia Commons: Jules Maurice Gaspard, Hypatia, 1908', url: 'https://commons.wikimedia.org/wiki/File:Hypatia.jpg', kind: 'collection-record'},
      {id: 'hypatia-iep', label: 'Internet Encyclopedia of Philosophy: Hypatia', url: 'https://iep.utm.edu/hypatia/', kind: 'academic-reference'},
      {id: 'synesius-letter-15', label: 'Synesius of Cyrene, Letter 15', url: 'https://romanletters.org/letters/synesius_cyrene/15/', kind: 'primary-text'},
      {id: 'socrates-hypatia', label: 'Socrates Scholasticus, Ecclesiastical History VII.15', url: 'https://en.wikisource.org/wiki/Nicene_and_Post-Nicene_Fathers:_Series_II/Volume_II/Socrates/Book_VII/Chapter_15', kind: 'primary-text'},
      {id: 'hypatia-suda', label: 'Suda testimony on Hypatia, translated by Diotíma', url: 'https://diotima-doctafemina.org/translations/anthologies/womens-life-in-greece-and-rome-selections/x-religion/451-the-martyrdom-of-the-pagan-philosopher-hypatia/', kind: 'primary-text'},
    ],
    objectInterpretation: 'Gaspard’s 1908 printed profile supplies an imagined modern face for Hypatia. It is evidence for her later reception, not her appearance, clothing, or Alexandrian teaching environment.',
    articleRoute: {kind: 'branch', branchId: 'neoplatonism'}, entityKind: 'branch', articleActionLabel: 'Read the full sourced Neoplatonism article',
    wallPlaque: {type: 'reception-or-transmission-history', title: 'Hypatia Between Evidence and Legend', invitation: 'A 1908 imagined portrait confronts the fragmentary record: letters establish a respected Alexandrian teacher, while later testimony and reception repeatedly reshape her works, murder, and symbolic meaning.', canonicalContexts: [{kind: 'branch', id: 'neoplatonism'}]},
    resolution: 'Resolved: identified the 1908 publication object, removed likeness implications, separated contemporary correspondence from later testimony, and mapped teaching, work attribution, murder, and modern reception claims.',
    lock: 'fnv1a64:7523ffc280a92f35',
  }),
  record({
    id: 'aristotle-across-languages', assetId: 'late-arabic-aristotle',
    displayName: 'Aristotle Across Greek, Syriac, and Arabic Worlds', shortTitle: 'Aristotle Across Languages',
    workLabel: 'TRANSLATION NETWORKS · GREEK, SYRIAC, AND ARABIC', dateLabel: 'Translation before and during Abbasid scholarship · displayed Arabic bestiary c. 1225',
    question: 'How does a philosophical text change when translators inherit both the text and centuries of commentary?',
    frontSubtitle: 'An Arabic bestiary imagines Aristotle teaching while a wider history of Syriac and Arabic scholarship replaces the myth of one simple translation relay.',
    lead: 'British Library Or. 2784, folios 95v–96r, is an Arabic bestiary made around 1225, probably in Baghdad. Its teaching image is later reception, not a record of an Abbasid translation workshop.',
    keyIdeas: ['Syriac scholars were authors, teachers, and terminologists—not invisible intermediaries.', 'Arabic translation often incorporated late-antique commentary traditions.', 'Translation choices can stabilize or reopen philosophical distinctions.'],
    cautions: ['Not every Greek work followed a single Greek-to-Syriac-to-Arabic path.', 'The displayed bestiary draws on an Aristotelian reception but does not document Aristotle, a translator, or a late-antique commentary session.'],
    sections: [
      {paragraph: 'The installed image shows British Library Or. 2784, folios 95v–96r, an open Arabic codex of Kitāb naʿt al-ḥayawān made around 1225, probably in Baghdad. A haloed, seated Aristotle-like figure instructs another figure beside written columns. The anonymous compiler describes a bestiary drawing on Aristotle and Ibn Bakhtīshūʿ. This is not an Arabic copy of an Aristotelian treatise and not evidence from the translation workshops of ninth-century Baghdad. It is a later reception object: by the thirteenth century, Aristotle could appear as an authoritative teacher within a composite Arabic work about animals and inherited knowledge.', sourceIds: ['arabic-aristotle-commons', 'arabic-aristotle-bl']},
      {paragraph: 'The movement of Greek philosophy into Arabic cannot be reduced to a relay in which one fixed text passed from Greek to Syriac and then to Arabic. Syriac Christian scholarly communities had translated and taught Aristotelian logic and Porphyry before Islam, developed technical vocabularies, and continued working alongside Arabic translation. Individual works followed different routes. They could be translated directly from Greek, mediated through Syriac, rendered more than once, checked against additional copies, summarized, revised, or embedded within commentary. Translators, physicians, patrons, libraries, religious communities, and multilingual families all shaped which materials became available and what new questions they could answer.', sourceIds: ['greek-arabic-sep']},
      {paragraph: 'Arabic philosophical corpora inherited not only Aristotelian sentences but late-antique explanations, curricular arrangements, and works transmitted under uncertain or pseudo-Aristotelian identities. Choosing a Syriac or Arabic equivalent for a technical term could stabilize one distinction while opening another association, so translation was philosophical labor as well as linguistic transfer. The bestiary image belongs downstream from that long history without illustrating it literally. It shows reception becoming newly productive: Aristotle’s authority is selected and combined with other knowledge in a different genre. Distinguishing the manuscript from an imagined workshop makes the larger achievement clearer—Greek, Syriac, and Arabic scholars did not passively carry one package; they repeatedly reconstructed texts, terminology, and intellectual lineages.', sourceIds: ['greek-arabic-sep', 'arabic-aristotle-bl', 'arabic-aristotle-commons']},
    ],
    visitorGuide: [
      {heading: 'Syriac scholarly worlds', items: [
        {label: 'Before Islam', description: 'Syriac Christian traditions translated and taught Aristotelian logic and Porphyry before the major Arabic translation movement.', sourceIds: ['greek-arabic-sep']},
        {label: 'Beside Arabic', description: 'Syriac translation and scholarship continued alongside Arabic work rather than disappearing after a single handoff.', sourceIds: ['greek-arabic-sep']},
      ]},
      {heading: 'The bestiary’s Aristotle', items: [
        {label: 'Composite source', description: 'The compiler of Kitāb naʿt al-ḥayawān names Aristotle and Ibn Bakhtīshūʿ among the work’s sources.', sourceIds: ['arabic-aristotle-bl']},
        {label: 'Later teaching image', description: 'The c. 1225 miniature imagines Aristotelian authority; it is not a documentary view of translation practice.', sourceIds: ['arabic-aristotle-commons', 'arabic-aristotle-bl']},
      ]},
    ],
    sources: [
      {id: 'arabic-aristotle-commons', label: 'Wikimedia Commons / British Library: Aristotle instructing a pupil in Kitāb naʿt al-ḥayawān', url: 'https://commons.wikimedia.org/wiki/File:Aristotle_instructs_a_pupil_in_the_%22Kitab_na%E2%80%98t_al-hayawan%22.jpg', kind: 'collection-record'},
      {id: 'arabic-aristotle-bl', label: 'British Library archives: Oriental Manuscripts related to Aristotle, including Or. 2784', url: 'https://searcharchives.bl.uk/?f%5Bcollection_area_ssi%5D%5B%5D=Oriental+Manuscripts&f%5Brelated_names_ssim%5D%5B%5D=Aristotle%2C+philosopher%2C+384+BC-322+BC&per_page=100&search_field=all_fields&sort=date', kind: 'collection-record'},
      {id: 'greek-arabic-sep', label: 'Stanford Encyclopedia of Philosophy: Greek Sources in Arabic and Islamic Philosophy', url: 'https://plato.stanford.edu/entries/arabic-islamic-greek/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The c. 1225 British Library bestiary imagines Aristotle teaching within a later Arabic compilation. It witnesses reception, not an Abbasid translation workshop or Aristotle’s historical classroom.',
    articleRoute: {kind: 'branch', branchId: 'neoplatonism'}, entityKind: 'branch', articleActionLabel: 'Read the full sourced Neoplatonism article',
    wallPlaque: {type: 'reception-or-transmission-history', title: 'Aristotle Across Languages', invitation: 'A thirteenth-century Arabic bestiary imagines Aristotle teaching after centuries in which Greek, Syriac, and Arabic scholars translated, revised, interpreted, and recombined philosophical materials.', canonicalContexts: [{kind: 'branch', id: 'neoplatonism'}]},
    resolution: 'Resolved: identified the c. 1225 bestiary and its composite source tradition, separated it from translation-workshop evidence, restored Syriac agency, and corrected the 4:3 image mount.',
    lock: 'fnv1a64:9ec36c67e9420382',
  }),
  record({
    id: 'proclus-elements-afterlife', assetId: 'late-proclus-elements-latin',
    displayName: 'Proclus’s Elements: Axiomatic Metaphysics and Its Afterlives', shortTitle: 'Proclus: Elements of Theology',
    workLabel: 'PROCLUS · ELEMENTS OF THEOLOGY AND RENAISSANCE RECEPTION', dateLabel: 'Elements: 5th century CE · displayed portrait of translator Francesco Patrizi: 1580',
    question: 'What happens when metaphysics is written as a chain of propositions and proofs?',
    frontSubtitle: 'A Renaissance portrait of Francesco Patrizi marks one route by which Proclus’s demonstrative metaphysics entered new languages, formats, and arguments.',
    lead: 'This 1580 engraving portrays the Renaissance philosopher Francesco Patrizi, not Proclus. Patrizi’s later Latin Proclus belongs to the Elements of Theology’s early-modern reception.',
    keyIdeas: ['The order of propositions is part of the philosophical argument.', 'Every effect remains in, proceeds from, and returns toward its cause in structured ways.', 'Translations sometimes circulated transformed Proclean material under other titles.'],
    cautions: ['The portrait is printed with Patrizi’s Discussiones peripateticae, not a portrait of Proclus or a title page from the Elements.', 'The demonstrative format does not make Proclus’s metaphysical premises neutral or his later receptions doctrinally identical.'],
    sections: [
      {paragraph: 'The installed object is an engraved oval portrait of Francesco Patrizi dated 1580 and published in the 1581 Basel edition of his Discussiones peripateticae. A Latin inscription identifies the bearded Renaissance philosopher in profile. The source record supplies no holding institution. This is not a portrait of Proclus, a late-antique artifact, or the title page of the Elements of Theology. Its relationship is historical reception: Patrizi published a Latin Proclus in 1583, and his work belongs to the Renaissance effort to recover, translate, and reorganize late-antique Platonism for new readers. The portrait makes the transmitter visible while requiring the ancient author and early-modern interpreter to remain distinct.', sourceIds: ['patrizi-portrait-commons', 'proclus-sep']},
      {paragraph: 'Proclus composed the Elements of Theology as a sequence of propositions with demonstrations. Its form is not ornamental. Later claims depend on distinctions established earlier, so metaphysical order is experienced as an argumentative chain that can be followed, tested, or contested step by step. Central sequences explain how effects depend on causes while remaining differentiated from them. Remaining, procession, and return name structural relations of causal dependence rather than three events occurring in time. The Elements thereby compresses a wide Neoplatonic system into a portable architecture of unity and plurality, participation, causation, intellect, soul, and the orders through which effects receive what their causes communicate.', sourceIds: ['proclus-sep', 'proclus-elements-primary']},
      {paragraph: 'Portability did not guarantee unchanged transmission. Proclean arguments entered Byzantine, Arabic, Georgian, Latin, Jewish, and Renaissance settings through translations, summaries, critiques, and transformed works. The Arabic Book of Causes adapted material from the Elements; in Latin it circulated as the Liber de causis under Aristotle’s name until comparison with a direct Latin Proclus enabled Thomas Aquinas to recognize the dependence. Patrizi represents a later recovery through print and translation, not the endpoint of one continuous doctrine. Across these routes, propositions could survive while vocabulary, authorship, theological setting, and philosophical purpose changed. The portrait therefore anchors an afterlife in which recognizing the transmitter is as important as tracing the text.', sourceIds: ['proclus-sep', 'patrizi-portrait-commons']},
    ],
    visitorGuide: [
      {heading: 'Demonstrative architecture', items: [
        {label: 'Ordered propositions', description: 'Each proof builds on earlier distinctions, making sequence part of the Elements’ philosophical argument.', sourceIds: ['proclus-sep', 'proclus-elements-primary']},
        {label: 'Causal triad', description: 'Remaining, procession, and return describe how effects depend on causes without becoming identical to them.', sourceIds: ['proclus-sep', 'proclus-elements-primary']},
      ]},
      {heading: 'Changed routes of reception', items: [
        {label: 'Book of Causes', description: 'A ninth-century Arabic adaptation carried Proclean material into Latin under Aristotle’s name.', sourceIds: ['proclus-sep']},
        {label: 'Patrizi, not Proclus', description: 'The 1580 engraving portrays a Renaissance translator and philosopher associated with Proclus’s later Latin reception.', sourceIds: ['patrizi-portrait-commons', 'proclus-sep']},
      ]},
    ],
    sources: [
      {id: 'patrizi-portrait-commons', label: 'Wikimedia Commons: portrait of Francesco Patrizi, 1580', url: 'https://commons.wikimedia.org/wiki/File:Francesco_Patrizi_1580.jpg', kind: 'collection-record'},
      {id: 'proclus-sep', label: 'Stanford Encyclopedia of Philosophy: Proclus', url: 'https://plato.stanford.edu/entries/proclus/', kind: 'academic-reference'},
      {id: 'proclus-elements-primary', label: 'Proclus, Elements of Theology (Internet Archive)', url: 'https://archive.org/details/proclus-the-elements-of-theology', kind: 'primary-text'},
    ],
    objectInterpretation: 'The 1580 engraving portrays Francesco Patrizi, whose Latin Proclus belongs to Renaissance reception. It is not Proclus’s likeness, an image of the Elements, or a late-antique artifact.',
    articleRoute: {kind: 'philosopher', philosopherId: 'proclus'}, entityKind: 'philosopher', articleActionLabel: 'Read the full sourced Proclus article',
    wallPlaque: {type: 'reception-or-transmission-history', title: 'Proclus’s Elements and Francesco Patrizi', invitation: 'A portrait of Renaissance translator Francesco Patrizi opens the Elements’ demonstrative metaphysics and its transformed passage through Arabic adaptation, Latin misattribution, recognition, and print.', canonicalContexts: [{kind: 'philosopher', id: 'proclus'}]},
    resolution: 'Resolved: reconciled the record to the installed Patrizi portrait, separated translator from ancient author, and mapped the Elements’ demonstrative form and transformed Arabic, Latin, and Renaissance receptions.',
    lock: 'fnv1a64:ae693c11fe818a46',
  }),
  record({
    id: 'ficino-late-antique-revival', assetId: 'late-ficino-iamblichus-manuscript',
    displayName: 'Ficino and the Renaissance Reconstruction of Late Antiquity', shortTitle: 'Ficino Reconstructs Late Antiquity',
    workLabel: 'RENAISSANCE RECEPTION · IAMBLICHUS, PLOTINUS, AND TRANSLATION', dateLabel: 'Ficino’s Iamblichus translation preface · BML Strozzi 97, fol. 1r · 1491',
    question: 'When a tradition is revived through new manuscripts and translations, what exactly returns?',
    frontSubtitle: 'An illuminated preface to Ficino’s Latin Iamblichus makes Renaissance recovery visible as translation, dedication, canon-building, and philosophical interpretation.',
    lead: 'Biblioteca Medicea Laurenziana Strozzi 97, folio 1r, opens Ficino’s 1491 preface to his Latin translation of Iamblichus and is dedicated to Cardinal Giovanni de’ Medici.',
    keyIdeas: ['Translation revives a text by placing it inside a new conceptual and institutional world.', 'Ficino’s Platonism is neither identical to Plotinus nor merely decorative humanism.', 'Patronage and manuscript access shape which antiquity becomes recoverable.'],
    cautions: ['The 1491 manuscript witnesses Renaissance reception, not Iamblichus’s original text, appearance, or ritual practice.', 'Ficino’s Christian and genealogical framing actively interprets the authors he translates.'],
    sections: [
      {paragraph: 'The displayed page is Biblioteca Medicea Laurenziana Strozzi 97, folio 1r, an illuminated 1491 manuscript containing Ficino’s introduction or preface to his Latin translation of Iamblichus’s De mysteriis Aegyptiorum. The manuscript is dedicated to Cardinal Giovanni de’ Medici. Its decorated border, opening text, and patronal setting make translation a material and institutional act. It is not an ancient Iamblichus manuscript, evidence for Iamblichus’s ritual practice, or a transparent view of the late-antique work. It witnesses a Renaissance moment when manuscripts, patronage, and Latin presentation made selected Platonist texts available within a newly organized intellectual project.', sourceIds: ['ficino-iamblichus-commons', 'ficino-sep']},
      {paragraph: 'Ficino’s translations and exegesis were forms of cultural and philosophical reconstruction. He produced the first complete Greek-to-Latin translation of Plotinus and accompanied it with commentary, making choices about vocabulary, sequence, interpretive lineage, and compatibility with Christian commitments. Prefaces told readers why a work mattered and how its author belonged within a larger history of ancient wisdom. Such framing did not merely transport stable content. It selected a canon and supplied relations among Plato, Plotinus, Iamblichus, Porphyry, Proclus, and other figures whose own positions were neither identical nor equally easy to reconcile with Ficino’s theology.', sourceIds: ['ficino-sep']},
      {paragraph: 'In 1497 Ficino published a collection of translated late-antique texts that included Iamblichus, Proclus, Porphyry, and related authors. The project expanded Latin access while changing the conditions under which those works were read. Ritual and theological tensions could be qualified, lineages reorganized, and older arguments placed within prisca theologia, Ficino’s account of an ancient theology compatible in important ways with Christianity. The Strozzi manuscript therefore documents revival as selective interpretation rather than simple return. Renaissance Platonism depends on genuine encounters with recovered Greek texts, but what “returns” is shaped by translators, patrons, prefaces, available codices, religious commitments, and decisions about which late-antique voices form one tradition.', sourceIds: ['ficino-sep', 'ficino-iamblichus-commons']},
    ],
    visitorGuide: [
      {heading: 'A translation for a patron', items: [
        {label: 'Strozzi 97', description: 'The 1491 manuscript preserves Ficino’s preface to his Latin Iamblichus and is dedicated to Cardinal Giovanni de’ Medici.', sourceIds: ['ficino-iamblichus-commons']},
        {label: 'Material reconstruction', description: 'Illumination, dedication, preface, and Latin vocabulary place the late-antique text in a Renaissance institutional world.', sourceIds: ['ficino-iamblichus-commons', 'ficino-sep']},
      ]},
      {heading: 'Ficino’s late-antique canon', items: [
        {label: 'Plotinus in Latin', description: 'Ficino produced a complete Latin Plotinus with commentary, joining translation to sustained exegesis.', sourceIds: ['ficino-sep']},
        {label: 'The 1497 collection', description: 'His later collection brought Iamblichus, Proclus, Porphyry, and other Platonist materials together for Latin readers.', sourceIds: ['ficino-sep']},
      ]},
    ],
    sources: [
      {id: 'ficino-iamblichus-commons', label: 'Wikimedia Commons / Biblioteca Medicea Laurenziana: Ficino, De mysteriis Aegyptiorum, Strozzi 97, fol. 1r', url: 'https://commons.wikimedia.org/wiki/File:Ficino,_De_mysteriis_Aegyptiorum.jpg', kind: 'collection-record'},
      {id: 'ficino-sep', label: 'Stanford Encyclopedia of Philosophy: Marsilio Ficino', url: 'https://plato.stanford.edu/entries/ficino/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The 1491 Strozzi manuscript is Ficino’s Renaissance preface to a Latin Iamblichus translation. It documents later reconstruction, not Iamblichus’s original manuscript or ritual setting.',
    articleRoute: {kind: 'branch', branchId: 'neoplatonism'}, entityKind: 'branch', articleActionLabel: 'Read the full sourced Neoplatonism article',
    wallPlaque: {type: 'reception-or-transmission-history', title: 'Ficino Reconstructs Late Antiquity', invitation: 'A 1491 illuminated preface shows Ficino’s recovery of Iamblichus as an active Renaissance project of translation, patronage, Christian interpretation, and construction of a late-antique Platonist canon.', canonicalContexts: [{kind: 'branch', id: 'neoplatonism'}]},
    resolution: 'Resolved: verified the 1491 Strozzi manuscript, dedication, and reception status; expanded Ficino’s translation project without projecting it onto Iamblichus; and added claim-mapped object and scholarship sources.',
    lock: 'fnv1a64:917a6ded7a3ee191',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

const supplementalLayout = (
  id: MuseumSupplementalExhibitId,
  parentExhibitId: 'neoplatonism' | 'porphyry' | 'augustine' | 'pseudo-dionysius' | 'proclus',
  zoneId: 'late-neoplatonic-systems' | 'late-christian-platonisms' | 'late-commentary-transmission',
  position: {x: number; z: number},
  rotationY: number,
  assetId: Parameters<typeof authorSupplementalLayout>[0]['assetId'],
  mediaWidth: number,
  mediaHeight: number,
  installationKind: 'late-antique-work' | 'late-antique-context' | 'late-antique-concept',
  accent: string,
) => authorSupplementalLayout({
  id,
  parentExhibitId,
  zoneId,
  position,
  rotationY,
  assetId,
  mediaWidth,
  mediaHeight,
  installationKind,
  accent,
});

export const LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  supplementalLayout('porphyrian-tree-classification', 'porphyry', 'late-neoplatonic-systems', {x: 5.55, z: -10.45}, Math.PI, 'neoplatonic-porphyrian-tree', 2.55234375, 2.7, 'late-antique-concept', LATE_ANTIQUITY_PALETTE.purple),
  supplementalLayout('augustine-confessions-memory-time', 'augustine', 'late-christian-platonisms', {x: -5.55, z: 8.22}, Math.PI, 'late-augustine-confessions-manuscript', 2.025, 2.7, 'late-antique-work', LATE_ANTIQUITY_PALETTE.red),
  supplementalLayout('pseudo-dionysius-celestial-hierarchy', 'pseudo-dionysius', 'late-christian-platonisms', {x: 5.55, z: 8.22}, Math.PI, 'late-celestial-hierarchy-manuscript', 2.44265625, 2.7, 'late-antique-work', LATE_ANTIQUITY_PALETTE.gold),
  supplementalLayout('late-commentary-codex', 'neoplatonism', 'late-commentary-transmission', {x: -10.85, z: 18.6667}, Math.PI / 2, 'late-greek-aristotle-codex', 3.0467321867, 2.49, 'late-antique-context', LATE_ANTIQUITY_PALETTE.blue),
  supplementalLayout('boethius-philosophy-in-prison', 'neoplatonism', 'late-commentary-transmission', {x: 10.85, z: 18.6667}, -Math.PI / 2, 'late-boethius-consolation-manuscript', 1.9490625, 2.7, 'late-antique-context', LATE_ANTIQUITY_PALETTE.red),
  supplementalLayout('hypatia-alexandrian-teaching', 'neoplatonism', 'late-commentary-transmission', {x: -5.55, z: 10.45}, 0, 'late-hypatia-reception', 2.5002147239, 2.69, 'late-antique-context', LATE_ANTIQUITY_PALETTE.purple),
  supplementalLayout('aristotle-across-languages', 'neoplatonism', 'late-commentary-transmission', {x: 5.55, z: 10.45}, 0, 'late-arabic-aristotle', 3.6, 2.7, 'late-antique-context', LATE_ANTIQUITY_PALETTE.olive),
  supplementalLayout('proclus-elements-afterlife', 'proclus', 'late-commentary-transmission', {x: -5.55, z: 26.88}, Math.PI, 'late-proclus-elements-latin', 2.12203125, 2.7, 'late-antique-work', LATE_ANTIQUITY_PALETTE.blue),
  supplementalLayout('ficino-late-antique-revival', 'neoplatonism', 'late-commentary-transmission', {x: 5.55, z: 26.88}, Math.PI, 'late-ficino-iamblichus-manuscript', 1.79296875, 2.7, 'late-antique-context', LATE_ANTIQUITY_PALETTE.gold),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getLateAntiquitySupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const recordValue = LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!recordValue) throw new Error(`Gallery 15 supplemental exhibit ${id} is missing.`);
  return recordValue;
};
