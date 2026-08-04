import type {MuseumZoneId} from '../museumCatalog';
import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {
  MuseumMediaMountDefinition,
  MuseumPoint,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';
import {CLASSICAL_SOUTH_ASIAN_WALL_FILL_EXHIBITS} from './classicalSouthAsianWallFillExhibits';

export const CLASSICAL_SOUTH_ASIAN_GALLERY_ID = 'classical-south-asian-worlds' as const;

export const CLASSICAL_SOUTH_ASIAN_PALETTE = Object.freeze({
  ink: '#211d1c',
  indigo: '#344a68',
  saffron: '#b47731',
  verdigris: '#39736d',
  madder: '#8b4638',
  paper: '#eadfc9',
});

export const CLASSICAL_SOUTH_ASIAN_ROOM_SIGN_COPY = {
  'south-orientation-many-schools': {
    kicker: 'Room 01 · Orient without flattening',
    title: 'Many schools, shared questions, unfinished routes',
    subtitle: 'Begin with plurality: this gallery stages selected debates and makes its omissions explicit.',
  },
  'south-jain-worlds': {
    kicker: 'Room 02 · Soul, karma, and nonviolence',
    title: 'Jain worlds and the discipline of many-sided knowing',
    subtitle: 'Follow liberation, ahiṃsā, karmic matter, and the limits of one-sided judgment.',
  },
  'south-categories-realism': {
    kicker: 'Room 03 · Classify and explain',
    title: 'Vaiśeṣika categories, atoms, and realist debate',
    subtitle: 'Ask how substances, qualities, motions, universals, and particulars compose an intelligible world.',
  },
  'south-yoga-mind-liberation': {
    kicker: 'Room 04 · Practice and discern',
    title: 'Patañjali, mind, discipline, and liberation',
    subtitle: 'Read Yoga as a philosophical-practical tradition, not a modern wellness shorthand.',
  },
  'south-vedanta-rival-readings': {
    kicker: 'Room 05 · Interpret and disagree',
    title: 'Vedānta: rival readings of self, world, and Brahman',
    subtitle: 'Compare Advaita, Viśiṣṭādvaita, and Dvaita without turning Vedānta into one doctrine.',
  },
} as const;

const volume = (
  id: string,
  center: MuseumSceneVolume['center'],
  size: MuseumSceneVolume['size'],
): MuseumSceneVolume => ({id, role: 'media', center, size});

const mediaMount = (
  id: MuseumSupplementalExhibitId,
  assetId: MuseumAssetId,
  width: number,
  height: number,
): MuseumMediaMountDefinition => {
  const y = 2.14;
  return {
    id: `${id}-hero-media`,
    assetId,
    kind: 'wall-frame',
    position: [0, y, -.39],
    rotation: [0, 0, 0],
    width,
    height,
    frameDepth: .1,
    supportHeight: 0,
    anchorId: `${id}-backing`,
    bounds: volume(`${id}-media-bounds`, {x: 0, y, z: -.39}, {width: width + .18, height: height + .18, depth: .2}),
    supportBounds: volume(`${id}-media-support`, {x: 0, y, z: -.55}, {width: width * .74, height: height * .74, depth: .18}),
  };
};

const cameraFor = (position: MuseumPoint, rotationY: number, distance = 2.92): MuseumPoint => ({
  x: position.x + Math.sin(rotationY) * distance,
  z: position.z + Math.cos(rotationY) * distance,
});

const layout = ({
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
}: {
  id: MuseumSupplementalExhibitId;
  parentExhibitId: 'indian-philosophy' | 'jainism' | 'mahavira' | 'kanada' | 'patanjali' | 'shankara' | 'madhva';
  zoneId: MuseumZoneId;
  position: MuseumPoint;
  rotationY: number;
  assetId: MuseumAssetId;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: MuseumSupplementalInstallationKind;
  accent: string;
}): MuseumSupplementalExhibitLayout => {
  const width = 4.35;
  return {
    id,
    parentExhibitId,
    zoneId,
    spatialCellId: zoneId,
    position,
    rotationY,
    interactionRadius: 3.65,
    collider: {id: `supplemental:${id}`, center: position, size: {width, depth: 1.05}, rotation: rotationY},
    viewpoint: {...cameraFor(position, rotationY), yaw: rotationY, pitch: -.055},
    assetId,
    mediaMount: mediaMount(id, assetId, mediaWidth, mediaHeight),
    label: {position: [0, 4.04, -.3], width: width - .36, height: .72},
    footprint: {width, height: 4.44, depth: 1.05},
    installationKind,
    accent,
  };
};

const presentation = (
  panelKicker: string,
  proximityKicker: string,
  factRows: readonly {label: string; value: string}[],
  articleActionLabel: string,
  entityKind: 'philosopher' | 'branch',
) => ({
  panelKicker,
  proximityKicker,
  factRows,
  articleActionLabel,
  entityKind,
  keyIdeasLabel: 'Interpretive anchors',
  cautionsLabel: 'Keep in view',
});

const exhibits = [
  {
    id: 'south-sarva-darsana-compendium',
    displayName: 'Indian Philosophy: A Compendium Is Not the Whole Field',
    shortTitle: 'Indian Philosophy: Compendium and Omission',
    workLabel: 'ORIENTATION · SARVA-DARŚANA-SAṂGRAHA',
    dateLabel: 'Medieval compendium · shown in a 1908 translation',
    question: 'What becomes visible—or disappears—when one text arranges rival schools?',
    frontSubtitle: 'A historically situated survey, not a neutral table of every tradition',
    lead: 'The Sarva-darśana-saṃgraha presents a sequence of philosophical positions from a particular medieval standpoint. It is valuable evidence for debate and classification, but its order, inclusions, and polemical framing are arguments of their own. The exhibit uses the compendium to teach a museum rule: no single source can stand for “Indian philosophy,” and this gallery’s Jain, Vaiśeṣika, Yoga, and Vedānta route remains selective.',
    keyIdeas: ['Compendia preserve arguments while also ranking and framing them.', 'A named school can contain centuries of disagreement and commentary.', 'Buddhist, materialist, devotional, regional, and vernacular traditions require routes beyond this hall.'],
    cautions: ['The text is not a neutral census of South Asian thought.', 'The plain modern cover documents transmission, not the appearance of a medieval manuscript.'],
    sections: [
      {heading: 'Ordering is interpretation', paragraphs: ['A survey decides where to begin, which opponents deserve chapters, and how one position leads to another. Those choices help readers navigate but can make one later perspective look like the natural map of the field.']},
      {heading: 'The gallery keeps an open edge', paragraphs: ['Gallery 04 does not attempt civilizational completeness. Its opening label sends visitors onward to dedicated Buddhist and future comparative halls, while the chosen cases remain historically and doctrinally specific.']},
      {heading: 'Absence is part of the label', paragraphs: ['Materialist, Buddhist, devotional, vernacular, and many regional arguments exceed this sequence. Naming those absences keeps selection from masquerading as completeness. It also turns the last word of the room into a route outward rather than a claim of closure.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — 1908 Sarva-darśana-saṃgraha scan', url: 'https://commons.wikimedia.org/wiki/File:The_Sarva-darsana-samgraha;_or,_Review_of_the_different_systems_of_Hindu_philosophy_(IA_sarvadarsanasamg00madhrich).pdf', kind: 'collection-record'},
      {label: 'Internet Encyclopedia of Philosophy — Indian Philosophy', url: 'https://iep.utm.edu/indian-philosophy/', kind: 'academic-reference'},
    ],
    assetId: 'south-sarva-darsana-1908', panelAssetId: 'south-sarva-darsana-1908',
    articleRoute: {kind: 'branch', branchId: 'indian-philosophy'},
    presentation: presentation('Gallery 07 orientation', 'Compendium and omission', [
      {label: 'Object', value: '1908 translation of a medieval survey'},
      {label: 'Use', value: 'Evidence for debate and classification'},
      {label: 'Caution', value: 'One standpoint, not a complete field'},
    ], 'Open Indian Philosophy in the Atlas', 'branch'),
  },
  {
    id: 'south-upanishad-manuscript-world',
    displayName: 'Indian Philosophy: Texts Live in Manuscript Worlds',
    shortTitle: 'Indian Philosophy: Manuscript Worlds',
    workLabel: 'ORIENTATION · TEXT, SCRIPT, AND TRANSMISSION',
    dateLabel: 'Sāma Veda manuscript with an Upaniṣad · c. 1800–1850',
    question: 'How do philosophical texts travel through scripts, institutions, and practices?',
    frontSubtitle: 'Palm leaf, commentary, recitation, copying, and regional transmission',
    lead: 'Philosophical works survive through material and social histories. This Malayalam-script manuscript carries Sanskrit material associated with the Sāma Veda and an Upaniṣad. Its nineteenth-century date is not the date of the text it transmits. The object instead makes visible copying, regional scripts, monastic collections, recitation, commentary, and the labor that separates an old composition from any surviving witness.',
    keyIdeas: ['Composition date and manuscript date are different claims.', 'Sanskrit texts circulated in multiple regional scripts.', 'Commentary and institutional practice help constitute a text’s philosophical afterlife.'],
    cautions: ['One manuscript cannot represent every Upaniṣad or every Vedānta school.', 'The object’s later date does not make the transmitted text nineteenth-century.'],
    sections: [
      {heading: 'A text is not disembodied', paragraphs: ['Palm-leaf format, script, copying conventions, preservation, and access all shape what later readers can study. The physical witness belongs to a history of institutions and skilled labor.']},
      {heading: 'Transmission enables disagreement', paragraphs: ['Vedānta philosophers later argued over how Upaniṣadic passages fit together and what their claims imply. Shared textual inheritance did not yield a single interpretation.']},
      {heading: 'Scripts mark routes, not languages', paragraphs: ['A Sanskrit work can be copied in Malayalam, Telugu, Devanagari, or other scripts. Script, language, place, and doctrine therefore require separate historical questions. Keeping those layers distinct prevents a regional writing system from being misread as a separate philosophical language.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Sāma Veda manuscript with Upaniṣad', url: 'https://commons.wikimedia.org/wiki/File:An_Upanishad_embedded_in_Sama_Veda,_Sanskrit_manuscript_in_Thrissur_Hindu_monastery,_Malayalam_script_-_1.jpg', kind: 'collection-record'},
      {label: 'Internet Encyclopedia of Philosophy — Indian Philosophy', url: 'https://iep.utm.edu/indian-philosophy/', kind: 'academic-reference'},
    ],
    assetId: 'south-upanishad-sama-veda-manuscript', panelAssetId: 'south-upanishad-sama-veda-manuscript',
    articleRoute: {kind: 'branch', branchId: 'indian-philosophy'},
    presentation: presentation('Gallery 07 orientation', 'Manuscript worlds', [
      {label: 'Witness', value: 'c. 1800–1850 palm-leaf manuscript'},
      {label: 'Language / script', value: 'Sanskrit / Malayalam script'},
      {label: 'Lesson', value: 'Text date ≠ surviving copy date'},
    ], 'Open Indian Philosophy in the Atlas', 'branch'),
  },
  {
    id: 'mahavira-kalpasutra-transmission',
    displayName: 'Mahāvīra: The Kalpa-sūtra Transmission',
    shortTitle: 'Mahāvīra: Kalpa-sūtra Transmission',
    workLabel: 'MAHĀVĪRA · LIFE, LINEAGE, AND MEMORY',
    dateLabel: 'Gujarat · early 16th-century manuscript page',
    question: 'How does a later manuscript shape the remembered life of a Jina?',
    frontSubtitle: 'Birth narrative, festival recitation, lineage, and visual memory',
    lead: 'This illuminated Kalpa-sūtra page belongs to a much later manuscript culture that narrated and ritually renewed Mahāvīra’s life. It shows how biography, lineage, image, and recitation became part of Jain communal memory. The object does not prove traditional dates or make Mahāvīra the inventor of Jainism: Jain traditions situate him as the twenty-fourth Tīrthaṅkara in an older lineage.',
    keyIdeas: ['Mahāvīra is situated within a prior Tīrthaṅkara lineage.', 'Biography is transmitted through ritual, text, image, and commentary.', 'Later manuscripts are evidence for reception, not eyewitness records.'],
    cautions: ['Traditional dates for Mahāvīra remain disputed in modern scholarship.', 'The image is a sixteenth-century representation, not a lifetime portrait.'],
    sections: [
      {heading: 'A reformer within a lineage', paragraphs: ['Accounts of Mahāvīra emphasize renunciation, discipline, omniscience, and liberation while locating him within an older succession of Jinas. Historical reconstruction must distinguish that traditional framework from claims a surviving object can independently establish.']},
      {heading: 'Why the manuscript matters', paragraphs: ['The page reveals how communities made a philosophical life visible and memorable centuries later. It belongs to the history of Jain teaching even when it cannot settle the earliest chronology.']},
      {heading: 'Philosophy and practice remain joined', paragraphs: ['Teachings about soul, karma, nonviolence, restraint, and knowledge were transmitted through ritual calendars and communities, not only through detachable propositions. The manuscript’s visual richness belongs to that lived work of memory and renewal.']},
    ],
    sources: [
      {label: 'Cleveland Museum of Art — The Birth of Mahāvīra', url: 'https://www.clevelandart.org/art/1925.1340', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Jain Philosophy', url: 'https://plato.stanford.edu/entries/jaina-philosophy/', kind: 'academic-reference'},
    ],
    assetId: 'mahavira-kalpasutra-birth', panelAssetId: 'mahavira-kalpasutra-birth',
    articleRoute: {kind: 'philosopher', philosopherId: 'mahavira'},
    presentation: presentation('Gallery 07 manuscript exhibit', 'Mahāvīra in transmission', [
      {label: 'Object', value: 'Kalpa-sūtra manuscript page'},
      {label: 'Place / date', value: 'Gujarat, early 16th century'},
      {label: 'Caution', value: 'Later memory, not eyewitness record'},
    ], 'Open Mahāvīra in the Atlas', 'philosopher'),
  },
  {
    id: 'kanada-atomism-dyads',
    displayName: 'Kaṇāda: Atoms, Dyads, and Composite Bodies',
    shortTitle: 'Kaṇāda: Atoms and Composites',
    workLabel: 'KAṆĀDA · VAIŚEṢIKA ATOMISM',
    dateLabel: 'Modern explanatory illustration · 2026',
    question: 'How can imperceptible atoms produce perceptible composite things?',
    frontSubtitle: 'Paramāṇu, combination, motion, difference, and material change',
    lead: 'Vaiśeṣika thinkers developed an atomist account in which eternal, imperceptible atoms combine into larger structures and help explain material change without turning every thing into one undifferentiated stuff. The contemporary illustration separates atom, dyad, and triad for orientation. It is not an ancient diagram and should not be mistaken for modern particle physics.',
    keyIdeas: ['Atoms are enduring and imperceptible; composites arise through combination.', 'Kinds of atom help explain qualitative differences among material elements.', 'Motion, conjunction, disjunction, and causation are part of the account—not decorative additions.'],
    cautions: ['The diagram modernizes and simplifies a long textual debate.', 'Vaiśeṣika atomism is not an early version of current atomic theory.'],
    sections: [
      {heading: 'Explaining change with enduring constituents', paragraphs: ['Atomism offers one way to reconcile material transformation with stable ultimate constituents. Composite objects can begin and cease while their atomic components persist.']},
      {heading: 'A system larger than atomism', paragraphs: ['Vaiśeṣika also classifies substances, qualities, motions, universals, particulars, inherence, and eventually absence. Atomism belongs inside that categorical and inferential architecture.']},
      {heading: 'Comparison has limits', paragraphs: ['The resemblance to other ancient atomisms is philosophically productive, but distinct categories, arguments, and textual histories prevent simple equivalence. Visitors should compare explanatory problems while preserving the terms, aims, and debates that make Vaiśeṣika its own tradition.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Vaiśeṣika atomic-theory illustration', url: 'https://commons.wikimedia.org/wiki/File:Illustration_of_the_atomic_theory_of_Acharya_Kanada_showing_Param%C4%81%E1%B9%87u,_Dvya%E1%B9%87uka,_and_Trya%E1%B9%87uka_concepts_from_the_Vaisheshika_philosophy..jpg', kind: 'collection-record'},
      {label: 'Internet Encyclopedia of Philosophy — Vaiśeṣika', url: 'https://iep.utm.edu/vaisesika/', kind: 'academic-reference'},
    ],
    assetId: 'kanada-atomic-theory-illustration', panelAssetId: 'kanada-atomic-theory-illustration',
    articleRoute: {kind: 'philosopher', philosopherId: 'kanada'},
    presentation: presentation('Gallery 07 concept exhibit', 'Kaṇāda and atomism', [
      {label: 'Tradition', value: 'Vaiśeṣika'},
      {label: 'Problem', value: 'Atoms, combination, and change'},
      {label: 'Visual', value: 'Modern explanatory diagram'},
    ], 'Open Kaṇāda in the Atlas', 'philosopher'),
  },
  {
    id: 'vaiseshika-pramana',
    displayName: 'Kaṇāda’s Tradition: Perception and Inference',
    shortTitle: 'Kaṇāda: Vaiśeṣika Means of Knowledge',
    workLabel: 'KAṆĀDA · VAIŚEṢIKA EPISTEMOLOGY',
    dateLabel: 'Modern comparative diagram · 2016',
    question: 'How can an atomist and realist system justify claims about what cannot be perceived?',
    frontSubtitle: 'Perception, inference, testimony, and changing school boundaries',
    lead: 'The diagram summarizes a common presentation of classical Vaiśeṣika as recognizing perception and inference as independent means of knowledge. Testimony can then be treated through inference, though later Nyāya-Vaiśeṣika syntheses complicate any fixed boundary. The exhibit pairs epistemology with atomism because unobservable entities require arguments about what counts as reliable cognition.',
    keyIdeas: ['Perception concerns direct cognition under specified conditions.', 'Inference extends knowledge beyond what is immediately perceived.', 'School lists of pramāṇas changed as traditions debated and merged.'],
    cautions: ['A two-item chart compresses historical development and disagreement.', 'The modern diagram is not evidence that every Vaiśeṣika author used one unchanged taxonomy.'],
    sections: [
      {heading: 'Knowledge supports ontology', paragraphs: ['A categorical account of universals, inherence, atoms, and absence must explain how knowers can be warranted in positing entities that are not all directly visible.']},
      {heading: 'Traditions interact', paragraphs: ['Vaiśeṣika increasingly developed alongside Nyāya. Later syntheses warn against treating a school label as an isolated, timeless package.']},
      {heading: 'Inference does real work', paragraphs: ['Causal patterns, reliable marks, and structured relations let thinkers argue from what is perceived toward entities or conditions that perception alone does not present. This is why the epistemology wall belongs beside categories and atoms rather than in an unrelated annex.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Two Pramāṇas in Vaiśeṣika', url: 'https://commons.wikimedia.org/wiki/File:2_Pramana_Epistemology_Vaisheshika_Hindu_school.svg', kind: 'collection-record'},
      {label: 'Internet Encyclopedia of Philosophy — Vaiśeṣika', url: 'https://iep.utm.edu/vaisesika/', kind: 'academic-reference'},
    ],
    assetId: 'vaiseshika-two-pramana', panelAssetId: 'vaiseshika-two-pramana',
    articleRoute: {kind: 'philosopher', philosopherId: 'kanada'},
    presentation: presentation('Gallery 07 concept exhibit', 'Vaiśeṣika pramāṇas', [
      {label: 'Means', value: 'Perception and inference'},
      {label: 'Issue', value: 'How unobservables become knowable'},
      {label: 'Caution', value: 'Lists change across textual history'},
    ], 'Open Kaṇāda in the Atlas', 'philosopher'),
  },
  {
    id: 'patanjali-yogasutra-manuscript',
    displayName: 'Patañjali: The Yoga Sūtra Manuscript Tradition',
    shortTitle: 'Patañjali: Yoga Sūtra Manuscript',
    workLabel: 'PATAÑJALI · YOGA SŪTRA TRANSMISSION',
    dateLabel: 'National Library of India, Th 217 · before 1900',
    question: 'What can a late manuscript witness tell us about a much older and disputed textual lineage?',
    frontSubtitle: 'Aphorism, commentary, copying, authorship, and uncertain chronology',
    lead: 'The Yoga Sūtras are traditionally attributed to Patañjali, but neither the author’s precise identity nor the text’s date is securely fixed. This pre-1900 manuscript is evidence for transmission, not an autograph. The work’s compressed aphorisms also became intelligible through commentary—especially the Yoga Bhāṣya—so “Patañjali” names a textual and interpretive tradition as much as a recoverable biography.',
    keyIdeas: ['The Yoga Sūtras organize practice, affliction, concentration, cognition, and liberation.', 'Aphoristic text and commentary are historically intertwined.', 'Recent integrated-text scholarship often places the Pātañjalayogaśāstra around the fourth century CE, while earlier proposals remain debated.'],
    cautions: ['Do not convert an uncertain textual chronology into exact birth and death dates.', 'The manuscript is late and cannot establish the appearance or biography of an author.'],
    sections: [
      {heading: 'A tradition under one name', paragraphs: ['Traditional attribution organizes a long history of recitation and commentary. Modern scholarship still debates composition, redaction, and the relationship between sūtra and bhāṣya.']},
      {heading: 'Yoga exceeds posture', paragraphs: ['The text treats ethical restraints, observances, concentration, meditative absorption, reliable cognition, affliction, karmic causation, and discriminative knowledge. Modern posture-centered meanings capture only part of that history.']},
      {heading: 'Chronology remains a textual horizon', paragraphs: ['The fourth-century placement is an approximate composition or redaction horizon, not a birth or death date. Earlier proposals remain in scholarship. The gallery therefore labels an active textual tradition before it pretends to narrate a secure biography.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Yoga Sūtras manuscript Th 217', url: 'https://commons.wikimedia.org/wiki/File:Patanjali_Yoga_Sutras_manuscript.jpg', kind: 'collection-record'},
      {label: 'Internet Encyclopedia of Philosophy — Yoga', url: 'https://iep.utm.edu/yoga/', kind: 'academic-reference'},
      {label: 'Philipp A. Maas — Samādhipāda critical edition', url: 'https://www.shaker.de/de/site/content/shop/index.asp?ID=8&ISBN=978-3-8322-4987-8&lang=de', kind: 'academic-reference'},
    ],
    assetId: 'patanjali-yoga-sutra-manuscript', panelAssetId: 'patanjali-yoga-sutra-manuscript',
    articleRoute: {kind: 'philosopher', philosopherId: 'patanjali'},
    presentation: presentation('Gallery 07 manuscript exhibit', 'Patañjali in transmission', [
      {label: 'Witness', value: 'National Library of India Th 217'},
      {label: 'Date', value: 'Before 1900; precise date unknown'},
      {label: 'Caution', value: 'Transmission, not autograph'},
    ], 'Open Patañjali in the Atlas', 'philosopher'),
  },
  {
    id: 'patanjali-samkhya-yoga-pramana',
    displayName: 'Patañjali’s Yoga: Three Means of Knowledge',
    shortTitle: 'Patañjali: Yoga Means of Knowledge',
    workLabel: 'PATAÑJALI · COGNITION AND ERROR',
    dateLabel: 'Modern comparative diagram · 2016/2020',
    question: 'How does Yoga distinguish reliable cognition from error and mental construction?',
    frontSubtitle: 'Perception, inference, testimony, and the disciplined analysis of mind',
    lead: 'Yoga classifies perception, inference, and reliable testimony as means of valid cognition while also analyzing error, conceptual construction, sleep, and memory as kinds of mental fluctuation. The point is not merely to collect true beliefs. Practice changes the mind’s activity so that discriminative insight and liberation become possible.',
    keyIdeas: ['Valid cognition is one category within a wider analysis of mental fluctuations.', 'Perception, inference, and reliable testimony have different warrants.', 'Yoga shares concepts with Sāṃkhya while developing a distinct practical and theological profile.'],
    cautions: ['The chart is a modern summary, not a manuscript page.', 'Calling Yoga “psychology” can hide its metaphysics, ethics, discipline, and liberative aim.'],
    sections: [
      {heading: 'Knowing and stilling are related', paragraphs: ['Yoga does not treat every mental event as error. It distinguishes reliable and unreliable cognition while asking how even ordinary cognitive activity fits within a path toward a different relation to mind.']},
      {heading: 'Comparison without collapse', paragraphs: ['Sāṃkhya and Yoga share a dualist framework in many presentations, yet their texts, practices, concepts of divine agency, and later receptions cannot simply be merged.']},
      {heading: 'Testimony is disciplined', paragraphs: ['Reliable verbal knowledge is not mere repetition. Its authority depends on conditions of trust, transmission, competence, and fit with the tradition’s wider account of cognition. Its inclusion also shows why Yoga cannot be reduced to private inward experience alone.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Three Pramāṇas in Sāṃkhya-Yoga', url: 'https://commons.wikimedia.org/wiki/File:3_Pramana_Epistemology_Samkhya_Yoga_Hindu_schools.svg', kind: 'collection-record'},
      {label: 'Internet Encyclopedia of Philosophy — Yoga', url: 'https://iep.utm.edu/yoga/', kind: 'academic-reference'},
    ],
    assetId: 'samkhya-yoga-three-pramana', panelAssetId: 'samkhya-yoga-three-pramana',
    articleRoute: {kind: 'philosopher', philosopherId: 'patanjali'},
    presentation: presentation('Gallery 07 concept exhibit', 'Yoga pramāṇas', [
      {label: 'Means', value: 'Perception, inference, testimony'},
      {label: 'Context', value: 'A wider analysis of mental activity'},
      {label: 'Aim', value: 'Discernment and liberation'},
    ], 'Open Patañjali in the Atlas', 'philosopher'),
  },
  {
    id: 'shankara-aitareya-bhasya',
    displayName: 'Śaṅkara: Commentary on the Aitareya Upaniṣad',
    shortTitle: 'Śaṅkara: Aitareya Upaniṣad Commentary',
    workLabel: 'ŚAṄKARA · BHĀṢYA AND INTERPRETATION',
    dateLabel: '1593 manuscript witness',
    question: 'How does commentary turn inherited sentences into a systematic nondual argument?',
    frontSubtitle: 'Textual reconciliation, self-knowledge, superimposition, and liberation',
    lead: 'Śaṅkara’s commentarial practice argues that the Upaniṣads teach nondual Brahman and that liberating knowledge concerns the deepest identity of self and reality. The 1593 manuscript is far later than Śaṅkara, yet it makes the medium of philosophy visible: line-by-line interpretation, reconciliation of passages, debate with rivals, and transmission through copied commentary.',
    keyIdeas: ['Bhāṣya is sustained philosophical argument, not a neutral paraphrase.', 'Advaita distinguishes ultimate reality from ordinary empirical experience.', 'Liberation depends on knowledge, while discipline and inquiry prepare the knower.'],
    cautions: ['The manuscript is not an autograph and cannot settle every question of textual history.', 'Advaita is one Vedānta interpretation, not the definition of Vedānta as a whole.'],
    sections: [
      {heading: 'Commentary builds a system', paragraphs: ['Śaṅkara reads passages together, establishes priorities, answers objections, and argues that plurality depends on misapprehension rather than limiting ultimate Brahman. The system emerges through interpretation.']},
      {heading: 'Rivals read the same inheritance differently', paragraphs: ['Rāmānuja and Madhva reject key Advaita conclusions while appealing to overlapping scriptural corpora. The disagreement concerns the reality of difference, the status of the world, divine attributes, and liberation.']},
      {heading: 'Levels of truth need care', paragraphs: ['Advaita’s distinction between ultimate and empirical standpoints does not make ordinary life simply nonexistent. It explains how lived plurality can function without limiting nondual reality. The rival installations ask whether that strategy preserves or diminishes the reality of difference.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — 1593 Aitareya Upaniṣad bhāṣya manuscript', url: 'https://commons.wikimedia.org/wiki/File:1593_CE,_Adi_Shankara_bhasya_Aitareya_Upanishad,_Varanasi_Jain_temple_bhandara,_Sanskrit,_Devanagari,_MS_Add.2092.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Śaṅkara', url: 'https://plato.stanford.edu/entries/shankara/', kind: 'academic-reference'},
    ],
    assetId: 'shankara-aitareya-bhasya-1593', panelAssetId: 'shankara-aitareya-bhasya-1593',
    articleRoute: {kind: 'philosopher', philosopherId: 'shankara'},
    presentation: presentation('Gallery 07 manuscript exhibit', 'Śaṅkara in commentary', [
      {label: 'Work', value: 'Aitareya Upaniṣad bhāṣya'},
      {label: 'Witness', value: '1593 Sanskrit manuscript'},
      {label: 'Argument', value: 'Nondual reading through commentary'},
    ], 'Open Śaṅkara in the Atlas', 'philosopher'),
  },
  {
    id: 'madhva-udupi-matha',
    displayName: 'Madhva: Udupi and the Institutional Life of Dvaita',
    shortTitle: 'Madhva: Udupi and Dvaita',
    workLabel: 'MADHVA · SCHOOL, PRACTICE, AND INSTITUTION',
    dateLabel: 'Śrī Kṛṣṇa Maṭha, Udupi · photographed 2008',
    question: 'How does a philosophical school persist through institutions, ritual, teaching, and succession?',
    frontSubtitle: 'Dvaita interpretation beyond a single author or proposition',
    lead: 'Madhva’s Dvaita Vedānta insists on real and enduring distinctions among God, individual selves, and material reality. The Udupi Kṛṣṇa Maṭha belongs to the tradition’s institutional afterlife: a place where commentary, worship, teaching, succession, and public identity sustain philosophical commitments. Architecture cannot prove a doctrine, but it prevents “school” from shrinking into one abstract thesis.',
    keyIdeas: ['Difference is real rather than a provisional appearance to be overcome.', 'Dependence on Viṣṇu does not erase the individuality of selves or the reality of the world.', 'Institutions carry arguments through teaching, ritual, authority, and debate.'],
    cautions: ['The photographed tower is later built fabric, not a thirteenth-century view.', 'A living religious institution should not be reduced to an illustration of one proposition.'],
    sections: [
      {heading: 'A rival reading of Vedānta', paragraphs: ['Madhva contests nondual interpretation and develops a hierarchy of dependent realities under an independent God. His commentaries and later Dvaita thinkers argue that difference is disclosed rather than canceled by correct understanding.']},
      {heading: 'Ideas acquire social form', paragraphs: ['Monastic institutions, lineages, liturgy, education, pilgrimage, and commentary help explain how Dvaita remained a living tradition rather than a closed medieval episode.']},
      {heading: 'Reception continues the argument', paragraphs: ['Later teachers interpret Madhva, defend lineages, answer rivals, and negotiate new settings. Institutional continuity is therefore active philosophical history, not passive preservation. The photograph marks a living site where textual, devotional, and pedagogical inheritances still meet.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Udupi Kṛṣṇa Maṭha', url: 'https://commons.wikimedia.org/wiki/File:Madhvacharya_Krishna_Matha_Udupi_Karnataka.jpg', kind: 'collection-record'},
      {label: 'Internet Encyclopedia of Philosophy — Madhva', url: 'https://iep.utm.edu/madhva/', kind: 'academic-reference'},
    ],
    assetId: 'madhva-udupi-krishna-matha', panelAssetId: 'madhva-udupi-krishna-matha',
    articleRoute: {kind: 'philosopher', philosopherId: 'madhva'},
    presentation: presentation('Gallery 07 context exhibit', 'Madhva and Udupi', [
      {label: 'Tradition', value: 'Dvaita Vedānta'},
      {label: 'Place', value: 'Śrī Kṛṣṇa Maṭha, Udupi'},
      {label: 'Focus', value: 'Institutional transmission'},
    ], 'Open Madhva in the Atlas', 'philosopher'),
  },
] as const satisfies readonly MuseumSupplementalExhibit[];

export const CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBITS = [
  ...exhibits,
  ...CLASSICAL_SOUTH_ASIAN_WALL_FILL_EXHIBITS,
] as const satisfies readonly MuseumSupplementalExhibit[];

export const CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'south-sarva-darsana-compendium', parentExhibitId: 'indian-philosophy', zoneId: 'south-orientation-many-schools', position: {x: 10.85, z: -22.4}, rotationY: -Math.PI / 2, assetId: 'south-sarva-darsana-1908', mediaWidth: 2.16, mediaHeight: 3.28, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'south-upanishad-manuscript-world', parentExhibitId: 'indian-philosophy', zoneId: 'south-orientation-many-schools', position: {x: -5.55, z: -17.92}, rotationY: Math.PI, assetId: 'south-upanishad-sama-veda-manuscript', mediaWidth: 3.58, mediaHeight: .85, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.verdigris}),
  layout({id: 'south-ibadat-khana-plurality', parentExhibitId: 'indian-philosophy', zoneId: 'south-orientation-many-schools', position: {x: -5.55, z: -27.38}, rotationY: 0, assetId: 'south-ibadat-khana-debate', mediaWidth: 1.82, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.madder}),
  layout({id: 'south-nalanda-learning-network', parentExhibitId: 'indian-philosophy', zoneId: 'south-orientation-many-schools', position: {x: 5.55, z: -27.38}, rotationY: 0, assetId: 'south-nalanda-learning-courtyard', mediaWidth: 3.48, mediaHeight: 2.61, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.verdigris}),
  layout({id: 'south-ashoka-public-dhamma', parentExhibitId: 'indian-philosophy', zoneId: 'south-orientation-many-schools', position: {x: 5.55, z: -17.92}, rotationY: Math.PI, assetId: 'south-ashoka-lion-capital', mediaWidth: 1.85, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'mahavira-kalpasutra-transmission', parentExhibitId: 'mahavira', zoneId: 'south-jain-worlds', position: {x: -5.55, z: -6.72}, rotationY: Math.PI, assetId: 'mahavira-kalpasutra-birth', mediaWidth: 2.46, mediaHeight: 3.14, installationKind: 'south-asian-work', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.madder}),
  layout({id: 'jain-jambudvipa-moral-geography', parentExhibitId: 'jainism', zoneId: 'south-jain-worlds', position: {x: -5.55, z: -15.68}, rotationY: 0, assetId: 'jain-jambudvipa-cosmological-map', mediaWidth: 3.48, mediaHeight: 3.24, installationKind: 'south-asian-concept', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'jain-samavasarana-open-assembly', parentExhibitId: 'jainism', zoneId: 'south-jain-worlds', position: {x: 5.55, z: -15.68}, rotationY: 0, assetId: 'jain-samavasarana-peaceful-assembly', mediaWidth: 3.25, mediaHeight: 3.3, installationKind: 'south-asian-concept', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.verdigris}),
  layout({id: 'jain-tirthankara-stillness', parentExhibitId: 'jainism', zoneId: 'south-jain-worlds', position: {x: 5.55, z: -6.72}, rotationY: Math.PI, assetId: 'jain-tirthankara-mathura-red-sandstone', mediaWidth: 2.2, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.indigo}),
  layout({id: 'kanada-atomism-dyads', parentExhibitId: 'kanada', zoneId: 'south-categories-realism', position: {x: -5.55, z: 4.48}, rotationY: Math.PI, assetId: 'kanada-atomic-theory-illustration', mediaWidth: 3.42, mediaHeight: 2, installationKind: 'south-asian-concept', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'vaiseshika-pramana', parentExhibitId: 'kanada', zoneId: 'south-categories-realism', position: {x: 10.85, z: 0}, rotationY: -Math.PI / 2, assetId: 'vaiseshika-two-pramana', mediaWidth: 1.92, mediaHeight: 3.06, installationKind: 'south-asian-concept', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.indigo}),
  layout({id: 'nyaya-argument-before-authority', parentExhibitId: 'kanada', zoneId: 'south-categories-realism', position: {x: -5.55, z: -4.48}, rotationY: 0, assetId: 'nyaya-two-scholars-quarreling', mediaWidth: 1.99, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.madder}),
  layout({id: 'nyaya-spitzer-philosophy-fragments', parentExhibitId: 'kanada', zoneId: 'south-categories-realism', position: {x: 5.55, z: -4.48}, rotationY: 0, assetId: 'nyaya-spitzer-philosophical-fragments', mediaWidth: 3.52, mediaHeight: 1.98, installationKind: 'south-asian-work', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.verdigris}),
  layout({id: 'nyaya-smoke-fire-inference', parentExhibitId: 'kanada', zoneId: 'south-categories-realism', position: {x: 5.55, z: 4.48}, rotationY: Math.PI, assetId: 'nyaya-smoke-fire-inference', mediaWidth: 3.48, mediaHeight: 2.74, installationKind: 'south-asian-concept', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'patanjali-yogasutra-manuscript', parentExhibitId: 'patanjali', zoneId: 'south-yoga-mind-liberation', position: {x: -5.55, z: 15.68}, rotationY: Math.PI, assetId: 'patanjali-yoga-sutra-manuscript', mediaWidth: 3.2, mediaHeight: 2.88, installationKind: 'south-asian-work', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.verdigris}),
  layout({id: 'patanjali-samkhya-yoga-pramana', parentExhibitId: 'patanjali', zoneId: 'south-yoga-mind-liberation', position: {x: 10.85, z: 11.2}, rotationY: -Math.PI / 2, assetId: 'samkhya-yoga-three-pramana', mediaWidth: 1.92, mediaHeight: 3.06, installationKind: 'south-asian-concept', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.indigo}),
  layout({id: 'yoga-six-yogis-banyan', parentExhibitId: 'patanjali', zoneId: 'south-yoga-mind-liberation', position: {x: -5.55, z: 6.72}, rotationY: 0, assetId: 'yoga-six-yogis-banyan', mediaWidth: 2.37, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'yoga-posture-inner-heat', parentExhibitId: 'patanjali', zoneId: 'south-yoga-mind-liberation', position: {x: 5.55, z: 6.72}, rotationY: 0, assetId: 'yoga-ascetic-shaiva-deity', mediaWidth: 2.18, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.madder}),
  layout({id: 'yoga-asavari-ascetic-princess', parentExhibitId: 'patanjali', zoneId: 'south-yoga-mind-liberation', position: {x: 5.55, z: 15.68}, rotationY: Math.PI, assetId: 'yoga-asavari-ascetic-princess', mediaWidth: 2.35, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.verdigris}),
  layout({id: 'shankara-aitareya-bhasya', parentExhibitId: 'shankara', zoneId: 'south-vedanta-rival-readings', position: {x: -5.55, z: 27.38}, rotationY: Math.PI, assetId: 'shankara-aitareya-bhasya-1593', mediaWidth: 3.44, mediaHeight: 1.39, installationKind: 'south-asian-work', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'madhva-udupi-matha', parentExhibitId: 'madhva', zoneId: 'south-vedanta-rival-readings', position: {x: 5.55, z: 27.38}, rotationY: Math.PI, assetId: 'madhva-udupi-krishna-matha', mediaWidth: 3.2, mediaHeight: 2.4, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.madder}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getClassicalSouthAsianSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 07 supplemental exhibit ${id} is missing.`);
  return record;
};
