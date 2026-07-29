import type {MuseumAssetId} from './museumAssetTypes';
import {
  getHellenisticRomanInstallationSlot,
  HELLENISTIC_ROMAN_GALLERY_ID,
  HELLENISTIC_ROMAN_ROOM_SIGN_COPY,
} from './hellenisticRomanGalleryCuration';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
  type SupplementalExhibitAuthoring,
} from './museumSupplementalAuthoring';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export {HELLENISTIC_ROMAN_GALLERY_ID, HELLENISTIC_ROMAN_ROOM_SIGN_COPY};

export const HELLENISTIC_ROMAN_PALETTE = Object.freeze({
  ink: '#211d1b',
  cynic: '#a0693f',
  garden: '#70805d',
  stoic: '#4d677d',
  skeptic: '#74627d',
  bronze: '#a7854a',
  parchment: '#e8ddc6',
});

const image = (label: string, url: string) => ({label, url, kind: 'collection-record' as const});
const academic = (label: string, url: string) => ({label, url, kind: 'academic-reference' as const});

const record = (input: Omit<SupplementalExhibitAuthoring, 'panelKicker'>): MuseumSupplementalExhibit =>
  authorSupplementalExhibit({...input, panelKicker: 'Gallery 14 work and context exhibit'});

export const HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBITS = [
  record({
    id: 'cynic-frank-speech-in-public', assetId: 'cynic-diogenes-honest-man',
    displayName: 'Diogenes in Public: Frank Speech, Anecdote, and Performance', shortTitle: 'Diogenes in Public',
    workLabel: 'CYNIC PRACTICE · PARRHĒSIA AND PUBLIC ANECDOTE', dateLabel: 'Ancient anecdotal tradition · displayed painting c. 1620–1650',
    question: 'Can a performed refusal expose assumptions that an argument leaves untouched?',
    frontSubtitle: 'Frank speech, shamelessness, poverty, public testing, later anecdote, and reception',
    lead: 'Stories of Diogenes stage philosophy as visible provocation: speaking frankly to power, refusing status, and turning ordinary conduct into a test of convention. Their theatrical force is real even when the surviving reports are late and shaped by retelling.',
    keyIdeas: ['Cynic practice makes bodily conduct part of philosophical argument.', 'Parrhēsia risks offense because it addresses power and shared pretense directly.', 'Anecdotes preserve reception as well as possible historical memory.'],
    cautions: ['The lantern story is a later literary tradition, not an eyewitness report.', 'The seventeenth-century painting is imagined reception, not Diogenes’s likeness.'],
    sections: [
      {heading: 'Conduct can function as a claim', paragraph: 'A public act can reveal the cost of possessions, reputation, etiquette, or dependency more immediately than a detached proposition. Cynic performance asks whether a life displays what it says.'},
      {heading: 'Frank speech is relational', paragraph: 'Parrhēsia is not license to insult without purpose. It matters because a speaker accepts risk while confronting an audience, patron, ruler, or city with a judgment it may resist.'},
      {heading: 'Retelling constructs Diogenes', paragraph: 'Later authors collected memorable scenes into a portable philosophical persona. Reading them critically preserves their pedagogical power without pretending that each anecdote is secure biography.'},
    ],
    sources: [
      image('Wikimedia Commons — Pieter van Mol, Diogenes with his lantern', 'https://commons.wikimedia.org/wiki/File:Pieter_van_Mol_-_Diogenes_with_his_lantern_looking_for_an_honest_man.jpg'),
      academic('Internet Encyclopedia of Philosophy — Cynics', 'https://iep.utm.edu/cynics/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'diogenes'}, entityKind: 'philosopher',
  }),
  record({
    id: 'cynic-hipparchia-crates', assetId: 'cynic-hipparchia-crates-print',
    displayName: 'Hipparchia and Crates: Partnership Against Convention', shortTitle: 'Hipparchia and Crates',
    workLabel: 'CYNIC LIVES · GENDER, PARTNERSHIP, AND CONVENTION', dateLabel: '4th–3rd centuries BCE · displayed print made many centuries later',
    question: 'What changes when a philosophical life rejects the gendered script assigned to it?',
    frontSubtitle: 'Hipparchia, Crates, partnership, public life, gender norms, testimony, and reception',
    lead: 'Hipparchia of Maroneia appears in later sources as choosing Cynic practice and partnership with Crates against elite expectations. The sparse evidence demands caution, but it also prevents the gallery from reducing Cynicism to a chain of solitary men.',
    keyIdeas: ['Philosophical practice can contest domestic and civic role expectations.', 'Partnership may be a shared experiment rather than private background.', 'Sparse testimony requires calibrated claims rather than erasure.'],
    cautions: ['Most narrative detail comes through later male-authored sources.', 'The Rijksmuseum print imagines an ancient scene through early modern conventions.'],
    sections: [
      {heading: 'A life can contest classification', paragraph: 'Accounts emphasize that Hipparchia refused wealth and a conventional marriage to share Cynic practice. Whether embellished or not, the story tests who is permitted to appear publicly as a philosopher.'},
      {heading: 'The household becomes philosophical terrain', paragraph: 'Cynic independence does not always mean isolation. Hipparchia and Crates invite questions about shared poverty, care, sexuality, and the relation between private commitments and public example.'},
      {heading: 'Absence is not proof of insignificance', paragraph: 'The fragmentary record is a feature of ancient transmission and social power. Responsible curation marks uncertainty while still showing how later communities remembered a woman as a practicing Cynic.'},
    ],
    sources: [
      image('Rijksmuseum / Wikimedia Commons — Hipparchia and Crates', 'https://commons.wikimedia.org/wiki/File:Hipparchia_en_Krates,_RP-P-1938-2026.jpg'),
      academic('Internet Encyclopedia of Philosophy — Hipparchia', 'https://iep.utm.edu/hipparch/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'cynicism'}, entityKind: 'branch',
  }),
  record({
    id: 'cynic-cosmopolitan-constellation', assetId: 'cynic-philosophers-constellation',
    displayName: 'From Socratic Lineage to Cosmopolitan Claim', shortTitle: 'Cynic Lineages and “Citizen of the World”',
    workLabel: 'LINEAGE AND CONCEPT · KOSMOPOLITĒS', dateLabel: 'Hellenistic traditions · displayed portrait constellation published 1825',
    question: 'What kind of belonging remains when status in one city is refused?',
    frontSubtitle: 'Socratic inheritance, disputed founders, cosmopolitanism, exile, mobility, and later taxonomies',
    lead: 'Later sources connect Antisthenes, Diogenes, Crates, Hipparchia, and others into a Cynic lineage while attributing to Diogenes the phrase “citizen of the world.” The claim can challenge civic privilege without yet supplying a modern theory of equal global citizenship.',
    keyIdeas: ['Cynic genealogy is reconstructed and contested, not a clean institutional succession.', 'Cosmopolitan language loosens identity from one polis and inherited rank.', 'Later portrait grids make classification visible but can harden uncertainty into a canon.'],
    cautions: ['Do not treat Antisthenes as an undisputed formal founder.', 'Ancient cosmopolitanism should not be silently equated with modern international law.'],
    sections: [
      {heading: 'A lineage is an argument', paragraph: 'Linking Cynicism to Socrates gives ascetic self-sufficiency and frank speech a prestigious origin. Competing reconstructions show that succession stories organize identity as much as they report it.'},
      {heading: 'World citizenship begins as refusal', paragraph: 'The famous answer rejects the demand to define oneself only through one city. Its positive institutional content remains open, but the refusal destabilizes naturalized hierarchies of birthplace and status.'},
      {heading: 'Print culture builds a canon', paragraph: 'The 1825 constellation places ancient thinkers in a labeled visual order. It helps visitors see reception at work while its imagined faces warn against mistaking taxonomy for evidence.'},
    ],
    sources: [
      image('Wellcome Collection / Wikimedia Commons — twenty classical thinkers', 'https://commons.wikimedia.org/wiki/File:Philosophers;_twenty_portraits_of_classical_thinkers._Engrav_Wellcome_V0006810.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Cosmopolitanism', 'https://plato.stanford.edu/entries/cosmopolitanism/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'cynicism'}, entityKind: 'branch',
  }),
  record({
    id: 'epicurean-fourfold-remedy', assetId: 'epicurean-tetrapharmakos',
    displayName: 'The Fourfold Remedy: Philosophy as Compressed Therapy', shortTitle: 'The Fourfold Remedy',
    workLabel: 'EPICUREAN THERAPY · TETRAPHARMAKOS', dateLabel: 'Preserved through Philodemus, P.Herc. 1005 · displayed apograph made 1803–1806',
    question: 'Can a compact set of reminders retrain fear, desire, and attention?',
    frontSubtitle: 'Gods, death, the good, pain, memorization, practice, and papyrus recovery',
    lead: 'The tetrapharmakos compresses recurring Epicurean guidance into four memorable claims concerning gods, death, attainable goods, and endurable suffering. It is a practice aid, not a substitute for the school’s physics, psychology, ethics, and arguments.',
    keyIdeas: ['Memorable formulations can support repeated ethical exercise.', 'Fear of death depends on imagining experience where no subject remains.', 'Simple, necessary goods are easier to secure than limitless desires.'],
    cautions: ['The formula survives through later Epicurean transmission, not an autograph of Epicurus.', 'Severe and chronic suffering cannot be reduced to a slogan.'],
    sections: [
      {heading: 'Therapy depends on explanation', paragraph: 'Each line presupposes arguments about material nature, sensation, desire, and mortality. The summary works because a learner has practiced the reasoning that makes it credible. Repetition is meant to stabilize judgment when anxiety makes the longer argument difficult to recall.'},
      {heading: 'Desire becomes classifiable', paragraph: 'Epicureans distinguish natural and necessary desires from natural but unnecessary desires and socially manufactured pursuits. The distinction aims at agency, not joyless deprivation.'},
      {heading: 'A papyrus has two histories', paragraph: 'The ancient roll was carbonized at Herculaneum, then copied by modern technicians and scholars. The displayed apograph makes recovery visible while keeping it distinct from the original artifact.'},
    ],
    sources: [
      image('Wikimedia Commons — Tetrapharmakos in P.Herc. 1005', 'https://commons.wikimedia.org/wiki/File:Tetrapharmakos_PHerc_1005_col_5.png'),
      academic('Stanford Encyclopedia of Philosophy — Epicurus', 'https://plato.stanford.edu/entries/epicurus/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'epicureanism'}, entityKind: 'branch',
  }),
  record({
    id: 'epicurean-philodemus-library', assetId: 'epicurean-philodemus-subscription',
    displayName: 'Philodemus at Herculaneum: A Roman Epicurean Library', shortTitle: 'Philodemus and the Villa Library',
    workLabel: 'PHILODEMUS · ON RHETORIC AND LIBRARY PRACTICE', dateLabel: '1st century BCE rolls · displayed transcription published 1824',
    question: 'How does a philosophy change when it becomes a working library in another language and political world?',
    frontSubtitle: 'Philodemus, rhetoric, poetry, ethics, Roman patrons, copying, and damaged evidence',
    lead: 'The Villa of the Papyri preserved a remarkable concentration of Greek philosophical rolls, many connected with Philodemus. Their arguments about rhetoric, poetry, ethics, music, and school history show Epicureanism adapting within a Roman elite environment.',
    keyIdeas: ['Epicurean practice extended beyond a single founder’s surviving letters.', 'A library records study, copying, controversy, and patronage.', 'Subscriptions can identify a work when opening pages are lost.'],
    cautions: ['The villa’s ownership and every roll’s use cannot be reconstructed with certainty.', 'Philodemus’s engagement with Roman elites complicates any simple retreat-from-politics story.'],
    sections: [
      {heading: 'A school has archives', paragraph: 'Philodemus wrote histories of philosophical communities and arguments on arts as well as ethics. The collection exposes ongoing debate rather than a frozen Garden doctrine. It also shows teachers defining Epicurean identity by recording rivals, predecessors, and disagreements within their own community.'},
      {heading: 'Material damage shapes interpretation', paragraph: 'Carbonization preserved the rolls while making them exceptionally difficult to open and read. Reconstructions depend on fragments, drawings, multispectral imaging, and revisable editorial work.'},
      {heading: 'Roman transmission is transformation', paragraph: 'Greek texts circulated among Roman patrons and writers, and Lucretius developed Epicurean physics in Latin verse. Transmission creates new genres, audiences, and tensions.'},
    ],
    sources: [
      image('Wikimedia Commons — Philodemus, On Rhetoric subscription', 'https://commons.wikimedia.org/wiki/File:Philedemus_Herculaneum_subscription_enhance.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Philodemus', 'https://plato.stanford.edu/entries/philodemus/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'epicureanism'}, entityKind: 'branch',
  }),
  record({
    id: 'epicurean-herculaneum-afterlife', assetId: 'epicurean-herculaneum-papyrus',
    displayName: 'Carbonized, Copied, Imaged: The Afterlife of an Epicurean Archive', shortTitle: 'Recovering Herculaneum',
    workLabel: 'MATERIAL HISTORY · SCROLL, ERUPTION, AND RECOVERY', dateLabel: 'Rolls buried in 79 CE · recovery and imaging continue',
    question: 'What can responsible interpretation claim when the evidence is physically damaged and technologically mediated?',
    frontSubtitle: 'Carbonization, unrolling, apographs, imaging, fragments, uncertainty, and scholarly revision',
    lead: 'Herculaneum’s papyri survived because the eruption that destroyed their setting carbonized the rolls. Attempts to unroll them caused further loss; drawings and modern imaging now recover different layers of evidence. The archive makes intellectual history inseparable from conservation history.',
    keyIdeas: ['Preservation and destruction can occur through the same event.', 'A transcription is evidence with its own date, maker, and possible errors.', 'New imaging can revise readings without magically removing uncertainty.'],
    cautions: ['Do not describe every Herculaneum roll as Epicurean or by Philodemus.', 'Digital enhancement remains interpretation, not transparent access to a pristine text.'],
    sections: [
      {heading: 'The artifact sets limits', paragraph: 'Charred layers, displaced fragments, and invisible ink constrain what can be read. Scholarship begins by respecting those material conditions rather than treating a text as disembodied wording. Even the sequence of fragments can remain an argued reconstruction rather than a settled fact.'},
      {heading: 'Copies preserve lost states', paragraph: 'Early drawings sometimes record letters on layers later damaged or discarded. Their value depends on reconstructing who copied what and how accurately.'},
      {heading: 'Technology changes the question', paragraph: 'Non-destructive imaging can reveal hidden traces and virtual structure. It also produces new datasets and interpretive choices that must remain documented and contestable.'},
    ],
    sources: [
      image('Wikimedia Commons — Herculaneum Papyrus 1425', 'https://commons.wikimedia.org/wiki/File:Herculaneum_papyrus_1425.png'),
      academic('Vesuvius Challenge — Herculaneum papyri research', 'https://scrollprize.org/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'epicureanism'}, entityKind: 'branch',
  }),
  record({
    id: 'skeptical-arguments-preserved', assetId: 'skeptical-sextus-adversus-edition',
    displayName: 'Sextus Preserved: Modes, Opposed Arguments, and Modern Readers', shortTitle: 'Sextus Preserved',
    workLabel: 'PYRRHONIAN TEXTUAL AFTERLIFE · STUDY AND TRANSLATION', dateLabel: 'Ancient writings · displayed 1899 study',
    question: 'How can a text transmit a practice of suspension without becoming a new dogmatic authority?',
    frontSubtitle: 'Modes, equipollence, suspension, tranquility, translation, and modern scholarship',
    lead: 'Sextus preserves arguments, modes, and descriptions central to later knowledge of Pyrrhonism. Print, translation, and modern scholarship repeatedly reframed those materials, reshaping debates about criterion, method, religion, and certainty.',
    keyIdeas: ['Pyrrhonian argument opposes appearances and claims without installing a final counter-theory.', 'Suspension follows perceived balance rather than a command to believe nothing.', 'Printed transmission relocates ancient practice inside new controversies.'],
    cautions: ['Academic skepticism and Pyrrhonism are related but not interchangeable.', 'Sextus reports multiple skeptical resources; not every argument is his invention or final commitment.'],
    sections: [
      {heading: 'The practice is recursive', paragraph: 'A Pyrrhonist can also apply skeptical scrutiny to skeptical formulations. This prevents “nothing can be known” from hardening into the very dogma under examination.'},
      {heading: 'Action remains possible', paragraph: 'Sextus describes living through appearances, ordinary practices, skills, and laws while withholding assent from contested theoretical claims. Critics continue to dispute whether this is coherent.'},
      {heading: 'Reception creates a new intervention', paragraph: 'Printed editions, translations, and studies entered arguments far removed from Sextus’s setting. Each revival made skeptical tools newly legible while changing their targets and stakes. Early modern readers could recruit the same repertoire for religious controversy, scientific method, or attacks on reason itself.'},
    ],
    sources: [
      image('Wikimedia Commons — Mary Mills Patrick, Sextus Empiricus and Greek Scepticism', 'https://commons.wikimedia.org/wiki/File:Sextus_Empiricus_and_Greek_scepticism_.._(IA_sextusempiricusg00patrrich).pdf'),
      academic('Stanford Encyclopedia of Philosophy — Ancient Skepticism', 'https://plato.stanford.edu/entries/skepticism-ancient/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'sextus-empiricus'}, entityKind: 'philosopher',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

const layout = ({
  id,
  parentExhibitId,
  slotId,
  assetId,
  mediaWidth,
  mediaHeight,
  installationKind,
  accent,
}: {
  id: MuseumSupplementalExhibitId;
  parentExhibitId: 'cynicism' | 'diogenes' | 'epicureanism' | 'sextus-empiricus';
  slotId: string;
  assetId: MuseumAssetId;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: MuseumSupplementalInstallationKind;
  accent: string;
}): MuseumSupplementalExhibitLayout => {
  const authoredSlot = getHellenisticRomanInstallationSlot(slotId);
  const position = {x: authoredSlot.x, z: authoredSlot.z};
  const authored = authorSupplementalLayout({
    id,
    parentExhibitId,
    zoneId: authoredSlot.spatialCellId,
    position,
    rotationY: authoredSlot.rotationY,
    assetId,
    mediaWidth,
    mediaHeight,
    installationKind,
    accent,
    width: 3.58,
  });
  return {
    ...authored,
    interactionRadius: 3.3,
    viewpoint: {
      x: position.x + Math.sin(authoredSlot.rotationY) * authoredSlot.supplementalViewpointDistance,
      z: position.z + Math.cos(authoredSlot.rotationY) * authoredSlot.supplementalViewpointDistance,
      yaw: authoredSlot.rotationY,
      pitch: -.055,
    },
  };
};

export const HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'cynic-frank-speech-in-public', parentExhibitId: 'diogenes', slotId: 'hell-cynic-way:east-cross-face', assetId: 'cynic-diogenes-honest-man', mediaWidth: 3.02, mediaHeight: 2.34, installationKind: 'hellenistic-concept', accent: HELLENISTIC_ROMAN_PALETTE.cynic}),
  layout({id: 'cynic-hipparchia-crates', parentExhibitId: 'cynicism', slotId: 'hell-cynic-way:south-room-face', assetId: 'cynic-hipparchia-crates-print', mediaWidth: 1.62, mediaHeight: 2.7, installationKind: 'hellenistic-context', accent: HELLENISTIC_ROMAN_PALETTE.bronze}),
  layout({id: 'cynic-cosmopolitan-constellation', parentExhibitId: 'cynicism', slotId: 'hell-cynic-way:south-cross-face', assetId: 'cynic-philosophers-constellation', mediaWidth: 1.96, mediaHeight: 2.7, installationKind: 'hellenistic-context', accent: HELLENISTIC_ROMAN_PALETTE.cynic}),
  layout({id: 'epicurean-fourfold-remedy', parentExhibitId: 'epicureanism', slotId: 'hell-epicurean-garden:west-cross-face', assetId: 'epicurean-tetrapharmakos', mediaWidth: 3.05, mediaHeight: 1.17, installationKind: 'hellenistic-concept', accent: HELLENISTIC_ROMAN_PALETTE.garden}),
  layout({id: 'epicurean-philodemus-library', parentExhibitId: 'epicureanism', slotId: 'hell-epicurean-garden:south-room-face', assetId: 'epicurean-philodemus-subscription', mediaWidth: 1.56, mediaHeight: 2.7, installationKind: 'hellenistic-work', accent: HELLENISTIC_ROMAN_PALETTE.bronze}),
  layout({id: 'epicurean-herculaneum-afterlife', parentExhibitId: 'epicureanism', slotId: 'hell-epicurean-garden:south-cross-face', assetId: 'epicurean-herculaneum-papyrus', mediaWidth: 1.82, mediaHeight: 2.7, installationKind: 'hellenistic-context', accent: HELLENISTIC_ROMAN_PALETTE.garden}),
  layout({id: 'skeptical-arguments-preserved', parentExhibitId: 'sextus-empiricus', slotId: 'hell-skeptical-lineages:north-cross-face', assetId: 'skeptical-sextus-adversus-edition', mediaWidth: 1.75, mediaHeight: 2.7, installationKind: 'hellenistic-work', accent: HELLENISTIC_ROMAN_PALETTE.skeptic}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getHellenisticRomanSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const recordValue = HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!recordValue) throw new Error(`Gallery 14 supplemental exhibit ${id} is missing.`);
  return recordValue;
};
