import type {MuseumExhibitId, MuseumZoneId} from '../museumCatalog';
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
import {ISLAMIC_WALL_FILL_EXHIBITS} from './islamicWallFillExhibits';

export const ISLAMIC_GALLERY_ID = 'islamic-philosophical-worlds' as const;

export const ISLAMIC_PALETTE = Object.freeze({
  ink: '#1d211f',
  brass: '#b98a42',
  lapis: '#315f78',
  cinnabar: '#934d43',
  malachite: '#3f7464',
  parchment: '#e5d8bc',
});

export const ISLAMIC_ROOM_SIGN_COPY = {
  'islamic-translation-falsafa': {
    kicker: 'Room 01 · Translation creates arguments',
    title: 'Translation-era falsafa and the classification of knowledge',
    subtitle: 'Arabic philosophy grows through multilingual scholarship, scientific practice, reconstruction, and dispute.',
  },
  'islamic-avicennan-system': {
    kicker: 'Room 02 · Build a system',
    title: 'Avicennian being, soul, logic, and science',
    subtitle: 'Essence and existence join demonstration, self-awareness, medicine, and a far-reaching manuscript afterlife.',
  },
  'islamic-kalam-critique': {
    kicker: 'Room 03 · Critique through appropriation',
    title: 'Kalām, critique, and philosophical method',
    subtitle: 'Al-Ghazali reconstructs, tests, adopts, and redirects the philosophers rather than merely rejecting reason.',
  },
  'islamic-andalusian-worlds': {
    kicker: 'Room 04 · Al-Andalus',
    title: 'Philosophy, law, medicine, and commentary',
    subtitle: 'Averroes and Ibn Tufayl stage different relations among demonstration, nature, civic life, and revelation.',
  },
  'islamic-post-avicennian': {
    kicker: 'Room 05 · The history continues',
    title: 'Illumination and post-Avicennian Safavid worlds',
    subtitle: 'Suhrawardi and Mulla Sadra transform Avicennian problems through presence, light, existence, and motion.',
  },
} as const;

const asSupplementalId = (id: string) => id as MuseumSupplementalExhibitId;
const asAssetId = (id: string) => id as MuseumAssetId;
const asInstallationKind = (kind: string) => kind as MuseumSupplementalInstallationKind;

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
  id: string;
  parentExhibitId: MuseumExhibitId;
  zoneId: MuseumZoneId;
  position: MuseumPoint;
  rotationY: number;
  assetId: string;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: string;
  accent: string;
}): MuseumSupplementalExhibitLayout => {
  const supplementalId = asSupplementalId(id);
  const museumAssetId = asAssetId(assetId);
  const width = 4.35;
  return {
    id: supplementalId,
    parentExhibitId,
    zoneId,
    spatialCellId: zoneId,
    position,
    rotationY,
    interactionRadius: 3.65,
    collider: {id: `supplemental:${id}`, center: position, size: {width, depth: 1.05}, rotation: rotationY},
    viewpoint: {...cameraFor(position, rotationY), yaw: rotationY, pitch: -.055},
    assetId: museumAssetId,
    mediaMount: mediaMount(supplementalId, museumAssetId, mediaWidth, mediaHeight),
    label: {position: [0, 4.04, -.3], width: width - .36, height: .72},
    footprint: {width, height: 4.44, depth: 1.05},
    installationKind: asInstallationKind(installationKind),
    accent,
  };
};

type MainExhibitInput = {
  id: string;
  assetId: string;
  displayName: string;
  shortTitle: string;
  workLabel: string;
  dateLabel: string;
  question: string;
  frontSubtitle: string;
  lead: string;
  keyIdeas: readonly string[];
  cautions: readonly string[];
  sections: readonly {heading: string; paragraph: string}[];
  imageSource: {label: string; url: string};
  reference: {label: string; url: string};
  articleRoute: MuseumSupplementalExhibit['articleRoute'];
  entityKind: 'philosopher' | 'branch';
};

const exhibit = (input: MainExhibitInput): MuseumSupplementalExhibit => ({
  id: asSupplementalId(input.id),
  displayName: input.displayName,
  shortTitle: input.shortTitle,
  workLabel: input.workLabel,
  dateLabel: input.dateLabel,
  question: input.question,
  frontSubtitle: input.frontSubtitle,
  lead: input.lead,
  keyIdeas: input.keyIdeas,
  cautions: input.cautions,
  sections: input.sections.map(({heading, paragraph}) => ({heading, paragraphs: [paragraph]})),
  sources: [
    {label: input.imageSource.label, url: input.imageSource.url, kind: 'collection-record'},
    {label: input.reference.label, url: input.reference.url, kind: 'academic-reference'},
  ],
  assetId: asAssetId(input.assetId),
  panelAssetId: asAssetId(input.assetId),
  articleRoute: input.articleRoute,
  presentation: {
    panelKicker: 'Gallery 10 work and context exhibit',
    proximityKicker: input.shortTitle,
    factRows: [
      {label: 'Focus', value: input.workLabel},
      {label: 'Question', value: input.question},
      {label: 'Evidence', value: input.dateLabel},
    ],
    articleActionLabel: input.entityKind === 'philosopher'
      ? 'Open the philosopher in the Atlas'
      : 'Open Islamic Philosophy in the Atlas',
    entityKind: input.entityKind,
    keyIdeasLabel: 'Interpretive anchors',
    cautionsLabel: 'Keep in view',
  },
});

const islamicReference = {
  label: 'Stanford Encyclopedia of Philosophy — Arabic and Islamic Philosophy',
  url: 'https://plato.stanford.edu/entries/arabic-islamic-phil/',
} as const;
const greekArabicReference = {
  label: 'Stanford Encyclopedia of Philosophy — Greek Sources in Arabic and Islamic Philosophy',
  url: 'https://plato.stanford.edu/entries/arabic-islamic-greek/',
} as const;
const avicennaReference = {
  label: 'Stanford Encyclopedia of Philosophy — Ibn Sina',
  url: 'https://plato.stanford.edu/entries/ibn-sina/',
} as const;
const avicennaMetaphysicsReference = {
  label: 'Stanford Encyclopedia of Philosophy — Ibn Sina’s Metaphysics',
  url: 'https://plato.stanford.edu/entries/ibn-sina-metaphysics/',
} as const;
const avicennaMindReference = {
  label: 'Stanford Encyclopedia of Philosophy — Ibn Sina’s Psychology',
  url: 'https://plato.stanford.edu/entries/ibn-sina-mind/',
} as const;
const ghazaliReference = {
  label: 'Stanford Encyclopedia of Philosophy — Al-Ghazali',
  url: 'https://plato.stanford.edu/entries/al-ghazali/',
} as const;

const exhibits = [
  exhibit({
    id: 'islamic-hunayn-translation-method',
    assetId: 'hunayn-articella-manuscript',
    displayName: 'Hunayn ibn Ishaq: Translation as Scholarly Method',
    shortTitle: 'Hunayn ibn Ishaq: Translation Method',
    workLabel: 'TRANSLATION MOVEMENT · MEDICINE AND LANGUAGE',
    dateLabel: 'Ninth-century translation practice · thirteenth-century Latin witness',
    question: 'How does a translator rebuild a technical argument across languages?',
    frontSubtitle: 'Manuscript comparison, terminology, revision, medicine, Greek, Syriac, Arabic, and Latin afterlives',
    lead: 'Hunayn ibn Ishaq and his circle treated translation as disciplined scholarship. Reports associated with Hunayn describe seeking multiple exemplars, comparing damaged texts, revising earlier versions, and choosing terminology suited to a new learned language. The displayed Articella is a much later Latin witness to that afterlife, not an image of his Baghdad workshop.',
    keyIdeas: [
      'Translation is interpretation constrained by texts, concepts, and specialist practice.',
      'Greek, Syriac, Arabic, and later Latin histories form a chain with revisions and losses.',
      'Translators and copyists are intellectual agents rather than invisible carriers.',
    ],
    cautions: [
      'The English Articella manuscript was made centuries after Hunayn.',
      'Do not call the miniature a portrait of Hunayn or a depiction of the Abbasid translation movement.',
    ],
    sections: [
      {heading: 'Comparison precedes wording', paragraph: 'A translator working from divergent manuscripts must first decide what text is being translated. Collation, correction, and technical expertise are therefore part of the philosophical history of a work before any new sentence is written.'},
      {heading: 'Terms create possibilities', paragraph: 'Choosing Arabic vocabulary for logic, medicine, nature, and metaphysics made inherited problems available for new arguments. The result was not a passive replica of Greek; it became part of Arabic intellectual life.'},
      {heading: 'The Latin object marks a later route', paragraph: 'The Articella page combines a Latin text, teaching image, and European manuscript format. Its historical distance makes transmission visible while preventing the museum from collapsing several centuries and languages into one scene.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Hunayn / Joannitius in a thirteenth-century Articella', url: 'https://commons.wikimedia.org/wiki/File:Hunayn_-_Articella.jpg'},
    reference: greekArabicReference,
    articleRoute: {kind: 'branch', branchId: 'islamic-philosophy'},
    entityKind: 'branch',
  }),
  exhibit({
    id: 'islamic-aristotle-arabic-reception',
    assetId: 'islamic-arabic-aristotle',
    displayName: 'Aristotle in Arabic: Reception, Reconstruction, and New Questions',
    shortTitle: 'Islamic Philosophy: Aristotle in Arabic',
    workLabel: 'FALSAFA · ARISTOTELIAN RECEPTION',
    dateLabel: 'Translation and commentary from the ninth century onward · image c. 1220',
    question: 'When does receiving an inherited philosophy become creating a new one?',
    frontSubtitle: 'Translation, paraphrase, commentary, curriculum, harmonization, criticism, and transformation',
    lead: 'Arabic readers encountered Aristotle through translations, summaries, commentaries, disputed attributions, and late antique interpretive traditions. They classified his sciences, reconciled or separated him from Plato, tested demonstrations, and built new systems. “Reception” therefore names active philosophical reconstruction rather than the storage of a European inheritance.',
    keyIdeas: [
      'Arabic Aristotelianism arrived through layered Greek and late antique traditions.',
      'False or uncertain attributions could still become philosophically productive.',
      'Al-Kindi, al-Farabi, Avicenna, Averroes, and their critics did not share one unchanged Aristotle.',
    ],
    cautions: [
      'The c. 1220 manuscript image is a later conventional representation.',
      'Do not frame Arabic philosophy as a bridge whose only purpose was transmission to Latin Europe.',
    ],
    sections: [
      {heading: 'A corpus must be organized', paragraph: 'Readers decide how logic relates to physics, metaphysics, ethics, and politics; which text belongs where; and which apparent contradictions require resolution. Classification itself carries philosophical commitments.'},
      {heading: 'Misattribution can redirect thought', paragraph: 'Works transmitted under names such as Aristotle could contain Neoplatonic material. Their authority and vocabulary helped produce new syntheses even when later scholarship reassigned authorship.'},
      {heading: 'Transformation continues in disagreement', paragraph: 'Al-Ghazali’s critique, Avicenna’s system, and Averroes’s commentaries respond differently to the inherited corpus. Arabic Aristotelianism is therefore a field of competing projects, not a single school.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Aristotle teaching in Arabic manuscript Or. 2784', url: 'https://commons.wikimedia.org/wiki/File:Arabic_aristotle.jpg'},
    reference: greekArabicReference,
    articleRoute: {kind: 'branch', branchId: 'islamic-philosophy'},
    entityKind: 'branch',
  }),
  exhibit({
    id: 'islamic-ishaq-euclid-arabic',
    assetId: 'ishaq-euclid-arabic-opening',
    displayName: 'Ishaq ibn Hunayn’s Euclid: Proof in Arabic',
    shortTitle: 'Islamic Philosophy: Euclid in Arabic',
    workLabel: 'TRANSLATION MOVEMENT · MATHEMATICAL PROOF',
    dateLabel: 'Translation attributed to Ishaq ibn Hunayn · Baghdad copy, probably 1270',
    question: 'What survives when a geometrical proof crosses language, diagram, and manuscript?',
    frontSubtitle: 'Definitions, diagrams, proof, revision, technical vocabulary, copying, and mathematical practice',
    lead: 'An Arabic Euclid carries reasoning through both verbal sequence and diagram. The translation attributed to Ishaq ibn Hunayn participated in a wider mathematical culture that revised texts, compared versions, and used geometry in astronomy, optics, and philosophical accounts of demonstration. The ornate 1270 copy is later than the translator but unusually strong evidence for continued study.',
    keyIdeas: [
      'A proof depends on the coordinated transmission of words and figures.',
      'Translation can stabilize technical vocabulary while opening new applications.',
      'Mathematics helped philosophers test what demonstrative certainty might mean.',
    ],
    cautions: [
      'The Chester Beatty manuscript is not Ishaq ibn Hunayn’s autograph.',
      'The illuminated opening should not obscure the mathematical work carried by the text and diagrams.',
    ],
    sections: [
      {heading: 'A diagram is part of the argument', paragraph: 'Geometrical letters, lines, and relations must stay synchronized with the prose. A copyist’s error in either channel can change what a proof appears to establish, making material transmission intellectually consequential.'},
      {heading: 'Proof travels into philosophy', paragraph: 'Mathematical necessity provided an influential model for demonstration, but thinkers disputed how far that model extended into natural philosophy and metaphysics, whose objects and first principles differ.'},
      {heading: 'Beauty and use coexist', paragraph: 'Gold and blue framing mark prestige, while worn pages and explanatory diagrams belong to reading and instruction. The object is both crafted artifact and working intellectual technology.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Chester Beatty Arabic Euclid, Ar 3035', url: 'https://commons.wikimedia.org/wiki/File:Illustrated_Opening._Arabic_Translation_of_Euclid%27s_Elementa_(CBL_Ar_3035,_ff.105b-106a).jpg'},
    reference: islamicReference,
    articleRoute: {kind: 'branch', branchId: 'islamic-philosophy'},
    entityKind: 'branch',
  }),
  exhibit({
    id: 'avicenna-metaphysics-necessity',
    assetId: 'avicenna-hikmat-al-alai',
    displayName: 'Avicenna’s Metaphysics: Essence, Existence, and Necessity',
    shortTitle: 'Avicenna: Essence and Existence',
    workLabel: 'AVICENNA · METAPHYSICS',
    dateLabel: 'Dānishnāma selections · later Ḥikmat al-ʿAlāʾī manuscript',
    question: 'What explains that a thing exists rather than merely what it would be?',
    frontSubtitle: 'Essence, existence, possibility, necessity, causation, and the Necessary Existent',
    lead: 'Avicenna distinguishes the question of what a thing is from whether it exists. Considered in itself, the essence of a horse, triangle, or human does not include actual existence. Contingent existents therefore require causes, while the explanatory sequence points toward a Necessary Existent whose existence is not received from another.',
    keyIdeas: [
      'Essence answers what a thing is; existence answers whether it is actual.',
      'Possible existents require causes when they become actual.',
      'The Necessary Existent is not one contingent member added to the universe.',
    ],
    cautions: [
      'Later Latin “essence/existence” debates should not be read back as if every term were unchanged.',
      'The displayed compilation is a later manuscript witness rather than Avicenna’s autograph.',
    ],
    sections: [
      {heading: 'Possibility is explanatory', paragraph: 'A contingent thing is neither impossible nor necessary through itself. Its actuality calls for an explanation that determines one possibility rather than another, connecting modal analysis with causation.'},
      {heading: 'Necessity changes at the source', paragraph: 'The Necessary Existent does not receive existence after having an independently complete essence. Avicenna’s argument attempts to explain contingency without making the first cause another item of the same kind.'},
      {heading: 'The distinction acquires afterlives', paragraph: 'Islamic, Jewish, and Latin readers adopt, criticize, and redescribe Avicennian modal metaphysics. Those later vocabularies reveal influence but should not replace the architecture of Avicenna’s own system.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Ḥikmat al-ʿAlāʾī manuscript', url: 'https://commons.wikimedia.org/wiki/File:%E1%B8%A4ikmat_al-%27Al%C4%81%27%C4%AB_(IA_McGillLibrary-rbsc_bw_asadullah_bwlw7-16937).pdf'},
    reference: avicennaMetaphysicsReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'avicenna'},
    entityKind: 'philosopher',
  }),
  exhibit({
    id: 'avicenna-floating-person',
    assetId: 'avicenna-later-miniature',
    displayName: 'Avicenna’s Floating Person: Soul and Self-Awareness',
    shortTitle: 'Avicenna: The Floating Person',
    workLabel: 'AVICENNA · PSYCHOLOGY AND SELF-AWARENESS',
    dateLabel: 'Thought experiment in works including The Healing · later conventional image',
    question: 'Would a person deprived of sensation still affirm that they exist?',
    frontSubtitle: 'Immediate self-awareness, body, sensation, soul, thought experiment, and interpretive limits',
    lead: 'Avicenna asks readers to imagine a newly created person suspended without sensory contact, limbs separated and no perception of the body. The person would still affirm their own existence. The experiment isolates immediate self-awareness, but interpreters debate what follows about the soul’s nature and relation to the body.',
    keyIdeas: [
      'Self-awareness need not begin with an image of one’s body.',
      'The thought experiment distinguishes awareness of self from awareness of bodily parts.',
      'Its conclusion and metaphysical reach remain interpretively contested.',
    ],
    cautions: [
      'The later miniature is not a diagram of the floating-person scenario.',
      'Do not turn the thought experiment into the crude claim that bodies are irrelevant.',
    ],
    sections: [
      {heading: 'Imagination removes familiar evidence', paragraph: 'The scenario subtracts sensation and bodily contact to ask what remains indubitable. It is not an empirical experiment but a controlled intellectual device for separating different objects of awareness.'},
      {heading: 'Affirmation is not description', paragraph: 'The floating person need not know what sort of entity they are or possess a concept of anatomy. The claim concerns immediate self-affirmation, which makes the exact philosophical conclusion more limited and more interesting.'},
      {heading: 'Embodiment returns to the system', paragraph: 'Avicenna’s psychology also analyzes perception, internal senses, imagination, movement, and medicine. A striking thought experiment belongs inside that larger account rather than replacing it.'},
    ],
    imageSource: {label: 'Wikimedia Commons — later conventional miniature of Avicenna', url: 'https://commons.wikimedia.org/wiki/File:Avicenna-miniatur.jpg'},
    reference: avicennaMindReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'avicenna'},
    entityKind: 'philosopher',
  }),
  exhibit({
    id: 'avicenna-pointers-commentary',
    assetId: 'avicenna-pointers-tusi-commentary',
    displayName: 'Avicenna’s Pointers in Commentary: Logic as a Living Argument',
    shortTitle: 'Avicenna: Pointers in Commentary',
    workLabel: 'AVICENNA · AL-ISHĀRĀT WA-AL-TANBĪHĀT',
    dateLabel: 'Avicenna’s late summa · al-Tusi’s later commentary manuscript',
    question: 'How does a compressed philosophical text become a centuries-long debate?',
    frontSubtitle: 'Logic, demonstration, metaphysics, commentary, objections, resolution, and post-Avicennian study',
    lead: 'Avicenna’s Pointers and Reminders presents difficult arguments in a compressed form that invited intensive commentary. The displayed manuscript is Nasir al-Din al-Tusi’s attempt to resolve problems in the text, not a page by Avicenna. It makes post-Avicennian philosophy visible as interpretation, defense, criticism, and reconstruction.',
    keyIdeas: [
      'Compression can create a text designed for expert unpacking.',
      'Commentators defend Avicenna while also changing how his problems are framed.',
      'Logic remains connected to metaphysics, psychology, and the discipline of inquiry.',
    ],
    cautions: [
      'The manuscript records al-Tusi’s commentary, not Avicenna’s own hand.',
      'A later defense should not be substituted automatically for Avicenna’s position.',
    ],
    sections: [
      {heading: 'A pointer requires a trained reader', paragraph: 'Brief formulations omit steps that students and commentators must reconstruct. The format creates an intellectual practice in which understanding is demonstrated through exposition and objection.'},
      {heading: 'Commentary is not repetition', paragraph: 'Al-Tusi clarifies terms, answers critics, and rearranges argumentative pressure. Even a sympathetic commentary becomes a new philosophical intervention because it selects which problems matter and what counts as a solution.'},
      {heading: 'A system outlives its author', paragraph: 'Later debates over Avicenna are not an appendix to his philosophy. They form the post-Avicennian worlds that lead toward Suhrawardi, Mulla Sadra, and many other thinkers beyond this gallery’s primary roster.'},
    ],
    imageSource: {label: 'Wikimedia Commons — al-Tusi on Avicenna’s Pointers, McGill MS 29', url: 'https://commons.wikimedia.org/wiki/File:%E1%B8%A4all_mushkil%C4%81t_al-Ish%C4%81r%C4%81t_wa-al-tanb%C4%ABh%C4%81t_(IA_McGillLibrary-rbsc_islam-ms-isl-0029-18293).pdf'},
    reference: avicennaReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'avicenna'},
    entityKind: 'philosopher',
  }),
  exhibit({
    id: 'avicenna-medicine-heart',
    assetId: 'avicenna-medicines-heart',
    displayName: 'Avicenna’s Medicines of the Heart: Embodied Emotion',
    shortTitle: 'Avicenna: Medicines of the Heart',
    workLabel: 'AVICENNA · MEDICINE, SOUL, AND EMOTION',
    dateLabel: 'Al-Adwiya al-qalbiyya · later Wellcome manuscript',
    question: 'How can bodily treatment and the powers of the soul belong to one inquiry?',
    frontSubtitle: 'Heart, temperament, emotion, faculties, pharmacology, body-soul relation, and medical context',
    lead: 'Avicenna’s medical writing on medicines of the heart situates affective life within an embodied account of powers and temperaments. The work does not map neatly onto modern cardiology or psychology. Its importance lies in showing medicine, natural philosophy, and the study of the soul operating within one ordered system.',
    keyIdeas: [
      'Emotions are studied through bodily and psychic powers rather than isolated as “merely mental.”',
      'Therapeutic reasoning connects general causal accounts to individual conditions.',
      'Historical categories deserve explanation before comparison with modern ones.',
    ],
    cautions: [
      'The manuscript supplies historical evidence, not medical advice.',
      'Do not translate “heart,” “spirit,” temperament, or faculty directly into one modern organ or diagnosis.',
    ],
    sections: [
      {heading: 'A person is an embodied unity', paragraph: 'Appetite, emotion, perception, imagination, and bodily change interact. Avicenna can distinguish soul from body metaphysically while still giving embodiment a central explanatory role in ordinary human life.'},
      {heading: 'Medicine uses ordered causes', paragraph: 'A treatment makes sense within accounts of qualities, temperaments, organs, and powers. Those categories are historically specific, but the effort to connect theory, observation, and intervention is intellectually significant.'},
      {heading: 'Comparison requires two vocabularies', paragraph: 'Modern readers may recognize questions about psychosomatic interaction while rejecting historical physiology. Responsible comparison states both resemblance and difference instead of treating the manuscript as either timeless wisdom or primitive error.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Avicenna, Rules About Medicines of the Heart', url: 'https://commons.wikimedia.org/wiki/File:Ibn_Sina_(Avicenna),_Rules_about_medicines_of_the_heart._Wellcome_L0016607.jpg'},
    reference: avicennaReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'avicenna'},
    entityKind: 'philosopher',
  }),
  exhibit({
    id: 'avicenna-hebrew-canon-transmission',
    assetId: 'avicenna-hebrew-canon',
    displayName: 'Avicenna in Hebrew: The Canon’s Mediterranean Transmission',
    shortTitle: 'Avicenna: The Hebrew Canon',
    workLabel: 'AVICENNA · TRANSLATION AND MEDICAL AFTERLIFE',
    dateLabel: 'Hebrew manuscript · 1276–1325',
    question: 'How does a systematic work change when it enters a new language and scholarly community?',
    frontSubtitle: 'Arabic source, Hebrew translation, medicine, diagrams, Jewish scholarship, and Mediterranean circulation',
    lead: 'A Hebrew manuscript of the Canon of Medicine materializes Avicenna’s reach across linguistic and religious communities. Translation made the work available within new curricula and practical settings, where terminology, commentary, and diagrams could acquire different emphases. The object is an afterlife, not evidence that Avicenna wrote in Hebrew.',
    keyIdeas: [
      'Translation produces new technical vocabularies and reading communities.',
      'A medical encyclopedia can circulate differently from its author’s metaphysical works.',
      'Islamic and Jewish philosophical worlds interact without becoming interchangeable.',
    ],
    cautions: [
      'The manuscript postdates Avicenna and is not in his language or hand.',
      'Cross-cultural transmission should not erase the distinct institutions and commitments of its readers.',
    ],
    sections: [
      {heading: 'A canon becomes many objects', paragraph: 'Arabic copies, Hebrew translations, and Latin editions differ in format, selection, glossing, and use. The title may persist while the material and pedagogical life of the work changes.'},
      {heading: 'Technical language must be rebuilt', paragraph: 'Translators negotiate terms for anatomy, disease, causes, and powers. Their decisions shape what later readers can ask and which conceptual relations appear obvious or strange.'},
      {heading: 'Connection is not collapse', paragraph: 'The manuscript belongs to a shared Mediterranean history and to a specifically Jewish textual setting. The gallery uses the object as a route toward the separate Jewish Philosophy hall rather than treating one tradition as a footnote to another.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Hebrew Canon, Bodleian MS Canon. Or. 50', url: 'https://commons.wikimedia.org/wiki/File:Avicenna_Canon_Bodleian_Library_9v.jpg'},
    reference: avicennaReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'avicenna'},
    entityKind: 'philosopher',
  }),
  exhibit({
    id: 'al-ghazali-incoherence-philosophers',
    assetId: 'al-ghazali-incoherence-wdl',
    displayName: 'Al-Ghazali’s Incoherence: Testing the Philosophers',
    shortTitle: 'Al-Ghazali: Incoherence of the Philosophers',
    workLabel: 'AL-GHAZALI · TAHĀFUT AL-FALĀSIFA',
    dateLabel: 'Completed around 1095 · later manuscript witness',
    question: 'Which philosophical claims have actually been demonstrated, and which exceed their proof?',
    frontSubtitle: 'Twenty discussions, causation, eternity, divine knowledge, resurrection, demonstration, and critique',
    lead: 'The Incoherence examines a defined set of positions associated especially with Avicenna and al-Farabi. Al-Ghazali challenges the strength of particular demonstrations and the theological consequences of certain conclusions. He does not argue that logic, mathematics, medicine, or every philosophical method should be abandoned.',
    keyIdeas: [
      'The critique targets selected theses and alleged demonstrations.',
      'Logical competence enables the objections rather than standing outside them.',
      'Causation, divine knowledge, eternity, and resurrection require different argumentative treatment.',
    ],
    cautions: [
      'Do not summarize the work as “al-Ghazali ended Islamic philosophy.”',
      'The manuscript is a later copy and the debates continued vigorously after him.',
    ],
    sections: [
      {heading: 'A claim can outrun its proof', paragraph: 'Al-Ghazali often asks whether a conclusion is necessary or merely compatible with the premises. By exposing alternative possibilities, he challenges demonstrative certainty without rejecting rational argument as such.'},
      {heading: 'Causation becomes a test case', paragraph: 'The famous discussion of burning asks what observation establishes about necessary connection and divine action. Its target, implications, and relation to occasionalism remain more complex than the slogan that causes do not exist.'},
      {heading: 'Critique produces another history', paragraph: 'Averroes responds in the Incoherence of the Incoherence, while later theologians and philosophers continue to use Avicennian tools. The work reorganizes debate; it does not close the gallery’s timeline.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Incoherence of the Philosophers, WDL 7456', url: 'https://commons.wikimedia.org/wiki/File:The_Incoherence_of_Philosophers_WDL7456.pdf'},
    reference: ghazaliReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'al-ghazali'},
    entityKind: 'philosopher',
  }),
  exhibit({
    id: 'al-ghazali-revival-sciences',
    assetId: 'al-ghazali-ihya-manuscript',
    displayName: 'Al-Ghazali’s Revival: Knowledge as Ethical Practice',
    shortTitle: 'Al-Ghazali: Revival of the Religious Sciences',
    workLabel: 'AL-GHAZALI · IḤYĀʾ ʿULŪM AL-DĪN',
    dateLabel: 'Major ethical and spiritual synthesis · later manuscript witness',
    question: 'What must happen to a knower for knowledge to become wisdom?',
    frontSubtitle: 'Intention, habit, virtue, worship, social life, self-examination, and spiritual discipline',
    lead: 'The Revival of the Religious Sciences organizes knowledge around transformed practice. Learning can fail when it becomes status, argument for display, or information detached from intention. Al-Ghazali analyzes habits, virtues, social relations, worship, and self-examination to ask how a person becomes capable of living what they claim to know.',
    keyIdeas: [
      'Knowledge is evaluated through intention, action, and formation of character.',
      'Ethics joins outward practice with inward attention.',
      'Critique of scholars is directed toward misuse of learning, not learning itself.',
    ],
    cautions: [
      'The work is large and internally structured; no single page represents its whole program.',
      'The manuscript date and copyist are not established on the Commons record.',
    ],
    sections: [
      {heading: 'Knowing can become a vice', paragraph: 'Expertise may serve vanity, rivalry, or political advantage. The Revival asks how institutions and habits reward such distortions and what disciplines can redirect learning toward truthful action.'},
      {heading: 'Practice trains perception', paragraph: 'Repeated actions, attention to motives, and correction of habits change what a person notices and desires. Ethical knowledge is therefore not only assent to propositions but formation of a reliable agent.'},
      {heading: 'A synthesis crosses modern categories', paragraph: 'Law, ethics, psychology, devotion, and social criticism appear together. Separating them into modern academic departments can clarify some questions while concealing the integrated purpose of the work.'},
    ],
    imageSource: {label: 'Wikimedia Commons — manuscript of the Iḥyāʾ', url: 'https://commons.wikimedia.org/wiki/File:Al-Ihya.jpg'},
    reference: ghazaliReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'al-ghazali'},
    entityKind: 'philosopher',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

export const ISLAMIC_SUPPLEMENTAL_EXHIBITS = [
  ...exhibits,
  ...ISLAMIC_WALL_FILL_EXHIBITS,
] as const satisfies readonly MuseumSupplementalExhibit[];

/**
 * Five rooms × six wall faces = thirty installations.
 * Nine canonical primaries occupy the placements in islamicGalleryCuration;
 * these twenty-one layouts fill every remaining wall exactly once.
 */
export const ISLAMIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  // Room 01: three primaries + three secondaries.
  layout({id: 'islamic-hunayn-translation-method', parentExhibitId: 'islamic-philosophy', zoneId: 'islamic-translation-falsafa', position: {x: -5.55, z: -17.92}, rotationY: Math.PI, assetId: 'hunayn-articella-manuscript', mediaWidth: 2.33, mediaHeight: 3.32, installationKind: 'islamic-context', accent: ISLAMIC_PALETTE.brass}),
  layout({id: 'islamic-aristotle-arabic-reception', parentExhibitId: 'islamic-philosophy', zoneId: 'islamic-translation-falsafa', position: {x: 5.55, z: -27.38}, rotationY: 0, assetId: 'islamic-arabic-aristotle', mediaWidth: 3.48, mediaHeight: 2.64, installationKind: 'islamic-context', accent: ISLAMIC_PALETTE.cinnabar}),
  layout({id: 'islamic-ishaq-euclid-arabic', parentExhibitId: 'al-kindi', zoneId: 'islamic-translation-falsafa', position: {x: 5.55, z: -17.92}, rotationY: Math.PI, assetId: 'ishaq-euclid-arabic-opening', mediaWidth: 3.48, mediaHeight: 2.43, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.lapis}),

  // Room 02: Avicenna primary + five distinct work/context exhibits.
  layout({id: 'avicenna-metaphysics-necessity', parentExhibitId: 'avicenna', zoneId: 'islamic-avicennan-system', position: {x: 10.85, z: -11.2}, rotationY: -Math.PI / 2, assetId: 'avicenna-hikmat-al-alai', mediaWidth: 2.48, mediaHeight: 3.27, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.lapis}),
  layout({id: 'avicenna-floating-person', parentExhibitId: 'avicenna', zoneId: 'islamic-avicennan-system', position: {x: -5.55, z: -15.68}, rotationY: 0, assetId: 'avicenna-later-miniature', mediaWidth: 2.12, mediaHeight: 3.3, installationKind: 'islamic-concept', accent: ISLAMIC_PALETTE.cinnabar}),
  layout({id: 'avicenna-pointers-commentary', parentExhibitId: 'avicenna', zoneId: 'islamic-avicennan-system', position: {x: 5.55, z: -15.68}, rotationY: 0, assetId: 'avicenna-pointers-tusi-commentary', mediaWidth: 2.52, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.brass}),
  layout({id: 'avicenna-medicine-heart', parentExhibitId: 'avicenna', zoneId: 'islamic-avicennan-system', position: {x: -5.55, z: -6.72}, rotationY: Math.PI, assetId: 'avicenna-medicines-heart', mediaWidth: 3.48, mediaHeight: 2.95, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.malachite}),
  layout({id: 'avicenna-hebrew-canon-transmission', parentExhibitId: 'avicenna', zoneId: 'islamic-avicennan-system', position: {x: 5.55, z: -6.72}, rotationY: Math.PI, assetId: 'avicenna-hebrew-canon', mediaWidth: 2.42, mediaHeight: 3.3, installationKind: 'islamic-context', accent: ISLAMIC_PALETTE.lapis}),

  // Room 03: Al-Ghazali primary + five works.
  layout({id: 'al-ghazali-incoherence-philosophers', parentExhibitId: 'al-ghazali', zoneId: 'islamic-kalam-critique', position: {x: 10.85, z: 0}, rotationY: -Math.PI / 2, assetId: 'al-ghazali-incoherence-wdl', mediaWidth: 2.46, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.cinnabar}),
  layout({id: 'al-ghazali-revival-sciences', parentExhibitId: 'al-ghazali', zoneId: 'islamic-kalam-critique', position: {x: -5.55, z: -4.48}, rotationY: 0, assetId: 'al-ghazali-ihya-manuscript', mediaWidth: 2.43, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.malachite}),
  layout({id: 'al-ghazali-aims-philosophers', parentExhibitId: 'al-ghazali', zoneId: 'islamic-kalam-critique', position: {x: 5.55, z: -4.48}, rotationY: 0, assetId: 'al-ghazali-maqasid-1913', mediaWidth: 2.18, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.brass}),
  layout({id: 'al-ghazali-deliverance-error', parentExhibitId: 'al-ghazali', zoneId: 'islamic-kalam-critique', position: {x: -5.55, z: 4.48}, rotationY: Math.PI, assetId: 'al-ghazali-munqidh-last-page', mediaWidth: 2.35, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.lapis}),
  layout({id: 'al-ghazali-foundations-analogy', parentExhibitId: 'al-ghazali', zoneId: 'islamic-kalam-critique', position: {x: 5.55, z: 4.48}, rotationY: Math.PI, assetId: 'al-ghazali-asas-qiyas', mediaWidth: 2.47, mediaHeight: 3.3, installationKind: 'islamic-concept', accent: ISLAMIC_PALETTE.cinnabar}),

  // Room 04: Averroes + Ibn Tufayl primaries; four return-wall exhibits.
  layout({id: 'averroes-demonstration-posterior', parentExhibitId: 'averroes', zoneId: 'islamic-andalusian-worlds', position: {x: -5.55, z: 6.72}, rotationY: 0, assetId: 'averroes-posterior-analytics-wdl', mediaWidth: 2.48, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.lapis}),
  layout({id: 'averroes-intellect-de-anima', parentExhibitId: 'averroes', zoneId: 'islamic-andalusian-worlds', position: {x: 5.55, z: 6.72}, rotationY: 0, assetId: 'averroes-de-anima-bnf', mediaWidth: 2.85, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.brass}),
  layout({id: 'averroes-colliget-medicine', parentExhibitId: 'averroes', zoneId: 'islamic-andalusian-worlds', position: {x: -5.55, z: 15.68}, rotationY: Math.PI, assetId: 'averroes-colliget', mediaWidth: 2.46, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.malachite}),
  layout({id: 'andalusian-astrolabe-context', parentExhibitId: 'ibn-tufayl', zoneId: 'islamic-andalusian-worlds', position: {x: 5.55, z: 15.68}, rotationY: Math.PI, assetId: 'andalusian-astrolabe-1029', mediaWidth: 3.48, mediaHeight: 2.92, installationKind: 'islamic-context', accent: ISLAMIC_PALETTE.cinnabar}),

  // Room 05: Suhrawardi + Mulla Sadra primaries; four return-wall exhibits.
  layout({id: 'suhrawardi-ishraq-opening', parentExhibitId: 'suhrawardi', zoneId: 'islamic-post-avicennian', position: {x: -5.55, z: 17.92}, rotationY: 0, assetId: 'suhrawardi-ishraq-1477', mediaWidth: 1.91, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.brass}),
  layout({id: 'suhrawardi-ishraq-annotated', parentExhibitId: 'suhrawardi', zoneId: 'islamic-post-avicennian', position: {x: 5.55, z: 17.92}, rotationY: 0, assetId: 'suhrawardi-ishraq-1220', mediaWidth: 3.48, mediaHeight: 2.93, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.lapis}),
  layout({id: 'mulla-sadra-kahak-withdrawal', parentExhibitId: 'mulla-sadra', zoneId: 'islamic-post-avicennian', position: {x: -5.55, z: 27.38}, rotationY: Math.PI, assetId: 'mulla-sadra-kahak-house', mediaWidth: 2.2, mediaHeight: 3.3, installationKind: 'islamic-context', accent: ISLAMIC_PALETTE.cinnabar}),
  layout({id: 'safavid-chahar-bagh-continuity', parentExhibitId: 'islamic-philosophy', zoneId: 'islamic-post-avicennian', position: {x: 5.55, z: 27.38}, rotationY: Math.PI, assetId: 'safavid-chahar-bagh-school', mediaWidth: 3.48, mediaHeight: 2.32, installationKind: 'islamic-context', accent: ISLAMIC_PALETTE.malachite}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getIslamicSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = ISLAMIC_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 10 supplemental exhibit ${id} is missing.`);
  return record;
};
