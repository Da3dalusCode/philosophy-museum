import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
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

const image = (label: string, url: string) => ({label, url, kind: 'collection-record' as const});
const academic = (label: string, url: string) => ({label, url, kind: 'academic-reference' as const});
const record = (input: Omit<SupplementalExhibitAuthoring, 'panelKicker'>): MuseumSupplementalExhibit =>
  authorSupplementalExhibit({...input, panelKicker: 'Gallery 15 work and transmission exhibit'});

export const LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBITS = [
  record({
    id: 'porphyrian-tree-classification', assetId: 'neoplatonic-porphyrian-tree',
    displayName: 'Porphyry’s Isagoge and the Tree That Came Later', shortTitle: 'The Porphyrian Tree',
    workLabel: 'LOGIC AND RECEPTION · GENUS, SPECIES, DIFFERENCE', dateLabel: 'Isagoge c. 270 CE · familiar tree diagrams are later',
    question: 'How does a short introduction become a visual technology for classifying reality?',
    frontSubtitle: 'Predicables, genus, species, difference, Boethius, diagrams, and later logic',
    lead: 'Porphyry’s Isagoge introduces questions about genus, species, difference, property, and accident while famously setting aside deeper disputes about universals. Later readers—especially through Boethius—turned its divisions into branching trees with a long scholastic afterlife.',
    keyIdeas: ['Porphyry postpones rather than settles the metaphysics of universals.', 'A diagram makes ordered division spatial and memorable.', 'Boethian translation and commentary became a major Latin transmission channel.'],
    cautions: ['Porphyry did not draw the familiar medieval tree displayed here.', 'A taxonomic diagram can hide contested assumptions about essence and hierarchy.'],
    sections: [
      {heading: 'An introduction creates a curriculum', paragraph: 'The Isagoge prepares readers for Aristotle’s Categories by teaching controlled distinctions. Its restraint also leaves a problem that later logicians and metaphysicians repeatedly reopen.'},
      {heading: 'The tree is an interpretation', paragraph: 'Branching from substance through corporeal, living, sensitive, and rational divisions makes one path seem inevitable. The graphic form clarifies inference while embedding choices about which differences count.'},
      {heading: 'Translation builds institutions', paragraph: 'Boethius’s Latin work helped place Porphyry at the beginning of medieval logical education. Transmission here is not a passive bridge but a reorganization of questions for new classrooms. The diagram’s endurance reflects teaching routines, manuscript design, and examination practices as well as abstract logical usefulness.'},
    ],
    sources: [
      image('Wikimedia Commons — later Arbor porphyrii diagram', "https://commons.wikimedia.org/wiki/File:Arbor_porphyrii_(probably_from_one_of_Boethius'_translations).png"),
      academic('Stanford Encyclopedia of Philosophy — Porphyry', 'https://plato.stanford.edu/entries/porphyry/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'porphyry'}, entityKind: 'philosopher',
  }),
  record({
    id: 'augustine-confessions-memory-time', assetId: 'late-augustine-confessions-manuscript',
    displayName: 'Augustine’s Confessions: Memory, Time, and the Divided Will', shortTitle: 'Augustine: Confessions',
    workLabel: 'AUGUSTINE · CONFESSIONS', dateLabel: 'Composed c. 397–400 · displayed manuscript dated 1471',
    question: 'How can a life become intelligible when memory, desire, and time do not form a simple sequence?',
    frontSubtitle: 'Memory, inwardness, will, conversion, creation, time, address, and narrative',
    lead: 'The Confessions joins autobiographical narrative, prayer, scriptural interpretation, psychology, and metaphysics. Augustine does not merely report a completed conversion: he examines how desire divides agency, how memory gathers a self, and how time is experienced by a creature.',
    keyIdeas: ['The speaking self is formed through address, recollection, and interpretation.', 'Knowing the better does not guarantee willing it without conflict.', 'Time is measured through a present stretching toward memory and expectation.'],
    cautions: ['The work is a crafted theological narrative, not a modern neutral autobiography.', 'Inwardness has ancient precedents; Augustine transforms rather than invents it from nothing.'],
    sections: [
      {heading: 'Narrative is a philosophical method', paragraph: 'Episodes are selected and reread to show how habits, loves, friendships, education, and grace shape agency. The narrated past changes meaning from the standpoint of the speaking present.'},
      {heading: 'The will can be divided', paragraph: 'Augustine describes wanting and resisting at once. This is not simply lack of information: habit and desire make a person unable to become immediately what judgment approves.'},
      {heading: 'Time belongs to creaturely attention', paragraph: 'Past and future are not present as external objects. Memory, attention, and expectation allow a finite mind to measure change while exposing its dependence on a created order. Augustine tests this account through speech and song, where a whole is held together while its sounds successively pass.'},
    ],
    sources: [
      image('Universitätsbibliothek Basel / Wikimedia Commons — Confessiones manuscript', 'https://commons.wikimedia.org/wiki/File:Basel,_Universitätsbibliothek,_A_IV_4,_f._1r_–_Aurelius_Augustinus,_Confessiones.JPG'),
      academic('Stanford Encyclopedia of Philosophy — Augustine', 'https://plato.stanford.edu/entries/augustine/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'augustine'}, entityKind: 'philosopher',
  }),
  record({
    id: 'pseudo-dionysius-celestial-hierarchy', assetId: 'late-celestial-hierarchy-manuscript',
    displayName: 'The Celestial Hierarchy: Names, Mediation, and Unknowing', shortTitle: 'Pseudo-Dionysius: Celestial Hierarchy',
    workLabel: 'PSEUDO-DIONYSIUS · CELESTIAL HIERARCHY', dateLabel: 'Late 5th or early 6th century · displayed 15th-century Latin translation',
    question: 'Can ordered symbols guide thought toward what ultimately exceeds every symbol and name?',
    frontSubtitle: 'Hierarchy, participation, divine names, negative theology, symbol, translation, and pseudonymity',
    lead: 'The Pseudo-Dionysian corpus combines hierarchical mediation with a radical insistence that the divine exceeds every affirmation and negation. Writing under the name of Paul’s Athenian convert gave the works an authority that shaped Greek, Syriac, Latin, and other receptions.',
    keyIdeas: ['Hierarchy names ordered participation and transmission, not merely institutional rank.', 'Affirmative names can guide inquiry while remaining inadequate.', 'Pseudonymous apostolic identity profoundly affected reception.'],
    cautions: ['The author is not the first-century Dionysius of Acts.', 'Later readers developed divergent meanings of hierarchy and apophatic theology.'],
    sections: [
      {heading: 'Symbols both reveal and conceal', paragraph: 'Material and scriptural images can direct a finite mind without resembling the divine literally. Their strangeness may interrupt the temptation to turn God into one being among others.'},
      {heading: 'Negation is not simple silence', paragraph: 'Denying names does not cancel every prior affirmation; it disciplines them by refusing to identify the source of all with any finite predicate.'},
      {heading: 'A name changes a corpus’s authority', paragraph: 'Attribution to the Areopagite placed the works near apostolic origins. Later detection of the pseudonym changes historical dating but does not erase the texts’ philosophical influence. It instead asks readers to separate the corpus’s constructed persona from the arguments and institutions that carried it.'},
    ],
    sources: [
      image('Vatican Library / Wikimedia Commons — Celestial Hierarchy in Latin', 'https://commons.wikimedia.org/wiki/File:Dionysius_Areopagita,_De_coelesti_hierarchia_(Latin).jpg'),
      academic('Stanford Encyclopedia of Philosophy — Pseudo-Dionysius', 'https://plato.stanford.edu/entries/pseudo-dionysius-areopagite/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'pseudo-dionysius'}, entityKind: 'philosopher',
  }),
  record({
    id: 'late-commentary-codex', assetId: 'late-greek-aristotle-codex',
    displayName: 'The Commentary Classroom: Reading Aristotle Line by Line', shortTitle: 'The Commentary Classroom',
    workLabel: 'COMMENTARY PRACTICE · TEXT, LEMMA, EXPLANATION', dateLabel: 'Late-antique teaching practice · displayed medieval Greek codex',
    question: 'When does explaining a canonical text become a new philosophical work?',
    frontSubtitle: 'Lemmas, marginalia, lectures, students, harmonization, disagreement, and textual repair',
    lead: 'Late-antique Platonists and Aristotelians taught through commentaries that separated a source text into lemmas, posed problems, compared readings, and supplied arguments. The form could preserve earlier material while generating positions not found in the commented author.',
    keyIdeas: ['Commentary is an argumentative genre, not only paraphrase.', 'Teacher and student notes complicate individual authorship.', 'Textual correction and philosophical interpretation often occur together.'],
    cautions: ['The displayed codex is later material context, not a known classroom copy from Ammonius or Simplicius.', 'Claims of harmony between Plato and Aristotle were debated strategies.'],
    sections: [
      {heading: 'A lemma sets the problem', paragraph: 'Quoting a small passage lets a commentator define vocabulary, test apparent contradictions, and connect one line to a larger curriculum. Selection already interprets what needs explanation.'},
      {heading: 'Authorship can be layered', paragraph: 'Some commentaries were written by teachers, others recorded by students from lectures, and still others revised across transmission. A named work may therefore preserve several intellectual moments.'},
      {heading: 'Institutions shape philosophy', paragraph: 'Schools in Athens and Alexandria organized sequences of texts, prerequisites, and disputes. Those pedagogical decisions helped determine which problems later readers inherited as central. Commentary therefore records a social practice of reading, including authority, rivalry, memory, and the training of successors.'},
    ],
    sources: [
      image('Wikimedia Commons — Greek minuscule Aristotle manuscript', 'https://commons.wikimedia.org/wiki/File:Greek_manuscript_minuscule_Aristotle.png'),
      academic('Stanford Encyclopedia of Philosophy — Ancient Commentators on Aristotle', 'https://plato.stanford.edu/entries/aristotle-commentators/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'neoplatonism'}, entityKind: 'branch',
  }),
  record({
    id: 'boethius-philosophy-in-prison', assetId: 'late-boethius-consolation-manuscript',
    displayName: 'Boethius: Philosophy in Prison and Logic in Translation', shortTitle: 'Boethius: A Double Transmission',
    workLabel: 'BOETHIUS · CONSOLATION, LOGIC, AND LATIN AFTERLIFE', dateLabel: 'c. 480–524/525 · displayed Consolation manuscript dated 1385',
    question: 'How can one thinker transmit Greek logic and also stage Philosophy as a consoling interlocutor?',
    frontSubtitle: 'Consolation, fortune, providence, freedom, translation, logic, and Latin curricula',
    lead: 'Boethius stands at several thresholds: translator and commentator on Greek logic, author of theological treatises, and condemned official composing the Consolation of Philosophy. His afterlife carried late-antique problems into medieval Latin schools without reducing him to a neutral conduit.',
    keyIdeas: ['The Consolation tests fortune, providence, foreknowledge, freedom, and the highest good.', 'Translations and commentaries create technical Latin vocabularies.', 'Personified Philosophy turns argument into a therapeutic dialogue.'],
    cautions: ['“Last Roman, first scholastic” is a memorable simplification, not a complete identity.', 'The 1385 miniatures are imagined reception images, not Boethius’s prison.'],
    sections: [
      {heading: 'Consolation changes genres', paragraph: 'Prose argument alternates with poetry as Philosophy retrains a prisoner’s attention. The form makes emotional orientation part of understanding providence and fortune.'},
      {heading: 'Translation is conceptual engineering', paragraph: 'Rendering Greek logical terms into Latin requires stable distinctions and explanatory choices. Those choices helped structure centuries of teaching and dispute.'},
      {heading: 'A threshold has multiple exits', paragraph: 'Boethius influenced logical education, debates on universals, music theory, theology, and vernacular literature. No single inheritance exhausts the late-antique source. His works also arrived unevenly, so different periods encountered different portions of the intellectual project under changing political conditions.'},
    ],
    sources: [
      image('Glasgow University Library / Wikimedia Commons — Consolation manuscript', 'https://commons.wikimedia.org/wiki/File:Consolation_of_philosophy_1385_boethius_images.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Anicius Manlius Severinus Boethius', 'https://plato.stanford.edu/entries/boethius/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'neoplatonism'}, entityKind: 'branch',
  }),
  record({
    id: 'hypatia-alexandrian-teaching', assetId: 'late-hypatia-reception',
    displayName: 'Hypatia: Alexandrian Teaching Between Evidence and Legend', shortTitle: 'Hypatia: Evidence and Legend',
    workLabel: 'ALEXANDRIA · MATHEMATICS, COMMENTARY, AND PUBLIC TEACHING', dateLabel: 'c. 355–415 CE · displayed portrait invented in 1908',
    question: 'How can a museum recover intellectual importance without filling archival gaps with legend?',
    frontSubtitle: 'Hypatia, Alexandria, mathematics, commentary, students, civic conflict, murder, and reception',
    lead: 'Hypatia taught mathematics and philosophy in Alexandria and led a circle of students that included Synesius. Surviving evidence is limited, while later retellings turned her death into competing symbols. The exhibit separates what sources support from what reception invented.',
    keyIdeas: ['Teaching networks can be historically visible even when works do not survive intact.', 'Mathematical and philosophical study belonged to one Alexandrian curriculum.', 'A violent death can eclipse a life’s intellectual practice in later memory.'],
    cautions: ['No authenticated portrait of Hypatia survives.', 'Her murder involved civic and ecclesiastical conflict that should not be flattened into one timeless slogan.'],
    sections: [
      {heading: 'Students preserve a teacher’s world', paragraph: 'Synesius’s letters provide evidence for intellectual friendship, instruments, questions, and authority. They reveal a network without giving a complete syllabus or biography.'},
      {heading: 'Commentary can be collaborative scholarship', paragraph: 'Hypatia is associated with mathematical editorial and commentary traditions, though attribution details remain contested. Caution is more accurate than either denial or invented certainty.'},
      {heading: 'Reception makes symbols', paragraph: 'Modern writers and artists reconstructed Hypatia as martyr to science, paganism, philosophy, or political freedom. Those afterlives are historically important but must not be projected backward as documentary fact. Comparing the legends with surviving letters teaches how evidential restraint can recover agency more responsibly than confident invention.'},
    ],
    sources: [
      image('Wikimedia Commons — Jules Maurice Gaspard’s imagined Hypatia', 'https://commons.wikimedia.org/wiki/File:Hypatia.jpg'),
      academic('Internet Encyclopedia of Philosophy — Hypatia', 'https://iep.utm.edu/hypatia/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'neoplatonism'}, entityKind: 'branch',
  }),
  record({
    id: 'aristotle-across-languages', assetId: 'late-arabic-aristotle',
    displayName: 'Aristotle Across Greek, Syriac, and Arabic Worlds', shortTitle: 'Aristotle Across Languages',
    workLabel: 'TRANSLATION NETWORKS · GREEK, SYRIAC, AND ARABIC', dateLabel: 'Late-antique commentary into Abbasid translation and later study',
    question: 'How does a philosophical text change when translators inherit both the text and centuries of commentary?',
    frontSubtitle: 'Greek codices, Syriac mediation, Arabic translation, terminology, commentary, and institutions',
    lead: 'Many Aristotelian works and late-antique commentaries moved through Greek, Syriac, and Arabic scholarly networks. Translators did not move bare sentences between languages: they inherited variant texts, explanatory traditions, technical vocabularies, patrons, and new research questions.',
    keyIdeas: ['Syriac scholars were authors, teachers, and terminologists—not invisible intermediaries.', 'Arabic translation often incorporated late-antique commentary traditions.', 'Translation choices can stabilize or reopen philosophical distinctions.'],
    cautions: ['Not every Greek work followed one Greek→Syriac→Arabic route.', 'The displayed c. 1225 Arabic manuscript image is later reception, not a translation workshop record.'],
    sections: [
      {heading: 'A network replaces a relay race', paragraph: 'Texts could be translated more than once, checked against other copies, revised, summarized, or commented upon. Patrons, libraries, physicians, Christians, Muslims, and multilingual families shaped the work.'},
      {heading: 'Terminology carries arguments', paragraph: 'Choosing an Arabic or Syriac equivalent can clarify one distinction while introducing another association. Glossaries and revisions therefore belong to philosophy, not only philology.'},
      {heading: 'The next galleries are inheritances, not endpoints', paragraph: 'Islamic philosophical worlds, Jewish philosophy, and Latin scholastic traditions engage late-antique materials through distinct institutions and commitments. Gallery 15 points toward those rooms without treating any as a passive recipient. Each community selected, criticized, combined, and extended sources according to questions generated in its own intellectual setting.'},
    ],
    sources: [
      image('British Library / Wikimedia Commons — Aristotle instructing a pupil', 'https://commons.wikimedia.org/wiki/File:Aristotle_instructs_a_pupil_in_the_%22Kitab_na%E2%80%98t_al-hayawan%22.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Greek Sources in Arabic and Islamic Philosophy', 'https://plato.stanford.edu/entries/arabic-islamic-greek/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'neoplatonism'}, entityKind: 'branch',
  }),
  record({
    id: 'proclus-elements-afterlife', assetId: 'late-proclus-elements-latin',
    displayName: 'Proclus’s Elements: Axiomatic Metaphysics and Its Afterlives', shortTitle: 'Proclus: Elements of Theology',
    workLabel: 'PROCLUS · ELEMENTS OF THEOLOGY', dateLabel: '5th century CE · displayed Latin edition published 1583',
    question: 'What happens when metaphysics is written as a chain of propositions and proofs?',
    frontSubtitle: 'Axiomatic form, unity, causation, participation, procession, return, and translation',
    lead: 'The Elements of Theology arranges Neoplatonic metaphysics into propositions with demonstrations. Its form made causal dependence, participation, procession, and return unusually portable, influencing Byzantine, Arabic, Georgian, Latin, Jewish, and Renaissance receptions through direct and transformed routes.',
    keyIdeas: ['The order of propositions is part of the philosophical argument.', 'Every effect remains in, proceeds from, and returns toward its cause in structured ways.', 'Translations sometimes circulated transformed Proclean material under other titles.'],
    cautions: ['Axiomatic appearance does not make the premises religiously or metaphysically neutral.', 'Influence can pass through adaptations such as the Arabic Book of Causes, not only direct quotation.'],
    sections: [
      {heading: 'Form promises dependence', paragraph: 'Each proposition relies on earlier distinctions, so the reader experiences metaphysical order as a demonstrative sequence. Criticism can target both a claim and the chain that supports it.'},
      {heading: 'Participation preserves difference', paragraph: 'Effects depend on causes without simply becoming identical to them. Proclus uses layered causal orders to explain how plurality can remain structured by unity.'},
      {heading: 'Afterlives transform authorship', paragraph: 'Proclean arguments reappear through translations, epitomes, polemics, and misattributions. Tracing those paths requires distinguishing textual descent from doctrinal sameness. A proposition may survive while its theological setting, vocabulary, or stated author changes, producing a genuinely new intervention.'},
    ],
    sources: [
      image('Wikimedia Commons — Patrizi’s 1583 Latin Proclus', 'https://commons.wikimedia.org/wiki/File:Proclus_Elements_of_Theology_and_Elements_of_Physics_Latin_translation_by_Patricius_1583.png'),
      academic('Stanford Encyclopedia of Philosophy — Proclus', 'https://plato.stanford.edu/entries/proclus/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'proclus'}, entityKind: 'philosopher',
  }),
  record({
    id: 'ficino-late-antique-revival', assetId: 'late-ficino-iamblichus-manuscript',
    displayName: 'Ficino and the Renaissance Reconstruction of Late Antiquity', shortTitle: 'Ficino Reconstructs Late Antiquity',
    workLabel: 'RENAISSANCE RECEPTION · IAMBLICHUS, PLOTINUS, AND TRANSLATION', dateLabel: 'Displayed Iamblichus translation manuscript, 1491',
    question: 'When a tradition is revived through new manuscripts and translations, what exactly returns?',
    frontSubtitle: 'Ficino, Greek manuscripts, Latin translation, Platonism, Christianity, patronage, and selective revival',
    lead: 'Marsilio Ficino translated Plotinus and other late-antique Platonists into Latin while interpreting them within a Renaissance Christian project. His manuscripts and annotations show recovery as active reconstruction: selecting texts, building vocabulary, arranging lineages, and negotiating ritual or theological difficulty.',
    keyIdeas: ['Translation revives a text by placing it inside a new conceptual and institutional world.', 'Ficino’s Platonism is neither identical to Plotinus nor merely decorative humanism.', 'Patronage and manuscript access shape which antiquity becomes recoverable.'],
    cautions: ['Renaissance “Neoplatonism” is not a transparent continuation of one ancient school.', 'Ficino’s framing should not replace Iamblichus’s own late-antique setting.'],
    sections: [
      {heading: 'A translator chooses a tradition', paragraph: 'Vocabulary, prefaces, ordering, and commentary tell readers how texts belong together. Translation therefore makes a canon while making individual works newly legible.'},
      {heading: 'Compatibility is argued', paragraph: 'Ficino sought relations among Platonism, Christianity, and prisca theologia while also negotiating texts that resisted easy harmonization. Revival depends on selective agreement and correction.'},
      {heading: 'The route returns to Gallery 02', paragraph: 'The installation closes a long loop to the Renaissance gallery. Physical adjacency is unnecessary because the museum map and related routes make reception across centuries navigable. That return also reveals Renaissance humanism as a selective encounter with late antiquity, not an unmediated recovery of classical Greece.'},
    ],
    sources: [
      image('Biblioteca Medicea Laurenziana / Wikimedia Commons — Ficino, De mysteriis Aegyptiorum', 'https://commons.wikimedia.org/wiki/File:Ficino,_De_mysteriis_Aegyptiorum.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Marsilio Ficino', 'https://plato.stanford.edu/entries/ficino/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'neoplatonism'}, entityKind: 'branch',
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
  supplementalLayout('porphyrian-tree-classification', 'porphyry', 'late-neoplatonic-systems', {x: 5.55, z: -10.45}, Math.PI, 'neoplatonic-porphyrian-tree', 2.55, 2.7, 'late-antique-concept', LATE_ANTIQUITY_PALETTE.purple),
  supplementalLayout('augustine-confessions-memory-time', 'augustine', 'late-christian-platonisms', {x: -5.55, z: 8.22}, Math.PI, 'late-augustine-confessions-manuscript', 2.03, 2.7, 'late-antique-work', LATE_ANTIQUITY_PALETTE.red),
  supplementalLayout('pseudo-dionysius-celestial-hierarchy', 'pseudo-dionysius', 'late-christian-platonisms', {x: 5.55, z: 8.22}, Math.PI, 'late-celestial-hierarchy-manuscript', 1.8, 2.7, 'late-antique-work', LATE_ANTIQUITY_PALETTE.gold),
  supplementalLayout('late-commentary-codex', 'neoplatonism', 'late-commentary-transmission', {x: -10.85, z: 18.6667}, Math.PI / 2, 'late-greek-aristotle-codex', 3.05, 2.49, 'late-antique-context', LATE_ANTIQUITY_PALETTE.blue),
  supplementalLayout('boethius-philosophy-in-prison', 'neoplatonism', 'late-commentary-transmission', {x: 10.85, z: 18.6667}, -Math.PI / 2, 'late-boethius-consolation-manuscript', 1.95, 2.7, 'late-antique-context', LATE_ANTIQUITY_PALETTE.red),
  supplementalLayout('hypatia-alexandrian-teaching', 'neoplatonism', 'late-commentary-transmission', {x: -5.55, z: 10.45}, 0, 'late-hypatia-reception', 2.5, 2.69, 'late-antique-context', LATE_ANTIQUITY_PALETTE.purple),
  supplementalLayout('aristotle-across-languages', 'neoplatonism', 'late-commentary-transmission', {x: 5.55, z: 10.45}, 0, 'late-arabic-aristotle', 1.84, 2.7, 'late-antique-context', LATE_ANTIQUITY_PALETTE.olive),
  supplementalLayout('proclus-elements-afterlife', 'proclus', 'late-commentary-transmission', {x: -5.55, z: 26.88}, Math.PI, 'late-proclus-elements-latin', 1.99, 2.7, 'late-antique-work', LATE_ANTIQUITY_PALETTE.blue),
  supplementalLayout('ficino-late-antique-revival', 'neoplatonism', 'late-commentary-transmission', {x: 5.55, z: 26.88}, Math.PI, 'late-ficino-iamblichus-manuscript', 1.79, 2.7, 'late-antique-context', LATE_ANTIQUITY_PALETTE.gold),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getLateAntiquitySupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const recordValue = LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!recordValue) throw new Error(`Gallery 15 supplemental exhibit ${id} is missing.`);
  return recordValue;
};
