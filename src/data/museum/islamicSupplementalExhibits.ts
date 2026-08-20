import type {MuseumExhibitId, MuseumZoneId} from '../museumCatalog';
import type {MuseumAssetId} from './museumAssetTypes';
import type {
  MuseumSupplementalExhibit,
  MuseumSupplementalInterpretationSource,
  MuseumSupplementalVisitorGuideSection,
  MuseumSupplementalWallPlaque,
} from './platoSupplementalExhibits';
import type {
  MuseumMediaMountDefinition,
  MuseumPoint,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';
import {ISLAMIC_WALL_FILL_EXHIBITS} from './islamicWallFillExhibits';
import {reviewIslamicSupplementalExhibit} from './islamicSupplementalReview';

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
  sections: readonly {heading: string; paragraph: string; sourceIds?: readonly string[]}[];
  imageSource: {label: string; url: string};
  reference: {label: string; url: string};
  sources?: readonly MuseumSupplementalInterpretationSource[];
  visitorGuide?: readonly MuseumSupplementalVisitorGuideSection[];
  objectInterpretation?: string;
  wallPlaque?: MuseumSupplementalWallPlaque;
  review?: MuseumSupplementalExhibit['review'];
  articleActionLabel?: string;
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
  sections: input.sections.map(({heading, paragraph, sourceIds}) => ({
    heading,
    paragraphs: [paragraph],
    ...(sourceIds ? {sourceIds} : {}),
  })),
  sources: input.sources ?? [
    {label: input.imageSource.label, url: input.imageSource.url, kind: 'collection-record'},
    {label: input.reference.label, url: input.reference.url, kind: 'academic-reference'},
  ],
  assetId: asAssetId(input.assetId),
  panelAssetId: asAssetId(input.assetId),
  articleRoute: input.articleRoute,
  ...(input.visitorGuide ? {visitorGuide: input.visitorGuide} : {}),
  ...(input.objectInterpretation ? {objectInterpretation: input.objectInterpretation} : {}),
  ...(input.wallPlaque ? {wallPlaque: input.wallPlaque} : {}),
  ...(input.review ? {review: input.review} : {}),
  presentation: {
    panelKicker: 'Gallery 10 work and context exhibit',
    proximityKicker: input.shortTitle,
    factRows: [
      {label: 'Focus', value: input.workLabel},
      {label: 'Question', value: input.question},
      {label: 'Evidence', value: input.dateLabel},
    ],
    articleActionLabel: input.articleActionLabel ?? (input.entityKind === 'philosopher'
      ? 'Open the philosopher in the Atlas'
      : 'Open Islamic Philosophy in the Atlas'),
    entityKind: input.entityKind,
    keyIdeasLabel: 'Interpretive anchors',
    cautionsLabel: 'Keep in view',
    ...(input.review ? {exhibitLayout: 'object-led' as const} : {}),
  },
});

const islamicReference = {
  label: 'The Cambridge Companion to Arabic Philosophy',
  url: 'https://www.cambridge.org/core/books/cambridge-companion-to-arabic-philosophy/BB1B390ECB024E88FC807FF471EE80EB',
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

type Gallery08ReviewEvidence = {
  plaqueTitle: string;
  invitation: string;
  objectInterpretation: string;
  detail: readonly [string, string, string];
  sources: MuseumSupplementalExhibit['sources'];
  sectionSourceIds: readonly [readonly string[], readonly string[], readonly string[]];
  visitorGuide: NonNullable<MuseumSupplementalExhibit['visitorGuide']>;
  resolution: string;
  lock: string;
};

const gallery08ReviewMethod = 'Gallery 08 supplemental review: non-overlapping evidence scope reconciled by the Sol parent across installed-object identity, interpretation, claim-level sourcing, attribution, dating, institution, provenance, rights, accessibility, article relationship, routes, review locks, and aspect-safe presentation.';

const gallery08ReviewEvidence: Partial<Record<string, Gallery08ReviewEvidence>> = {
  'islamic-hunayn-translation-method': {
    plaqueTitle: 'Hunayn’s Isagoge in the Articella',
    invitation: 'This thirteenth-century English manuscript preserves a Latin teaching afterlife of Hunayn ibn Ishaq’s medical introduction, showing how translation, curriculum, and copying carried Islamic philosophical work into new scholarly settings.',
    objectInterpretation: 'The U.S. National Library of Medicine identifies this Oxford thirteenth-century English Articella as MS E 78, a manuscript containing Hunayn’s Latin Isagoge and other medical texts. Its miniature and Latin page are evidence for a later curriculum, not for Hunayn’s appearance, Baghdad workshop, or an unchanged Arabic original.',
    detail: [
      'The installed page shows a large illuminated initial with a teacher and two students beside dense Latin writing and later-looking marginal notes. The National Library of Medicine identifies it as an Oxford thirteenth-century English manuscript, MS E 78, and describes it as a model Articella. That evidence securely identifies a medieval Latin teaching object; it does not turn the pictured master into Hunayn or make the page a document from Abbasid Baghdad.',
      'Hunayn ibn Ishaq worked with associates, including his son Ishaq, in medical and scientific translation. The surviving record attributes to that milieu Syriac and Arabic work on Galen and a wide range of Greek philosophical authors. Translation here was not a conveyor belt: choices among versions, technical vocabularies, and commentary shaped which questions could be pursued in Arabic and later intellectual communities.',
      'The Articella gives the Islamic Philosophy article a material afterlife rather than a substitute for its argument. Its curriculum joined a Latin rendition of Hunayn’s medical introduction to other texts in medieval European study. Visitors should therefore follow a chain of translation, selection, copying, and teaching, while leaving open what this one manuscript cannot establish about every Arabic source, Latin classroom, or translator’s exact method.',
    ],
    sources: [
      {id: 'hunayn-articella-commons', label: 'Wikimedia Commons — Hunayn, Articella manuscript page', url: 'https://commons.wikimedia.org/wiki/File:Hunayn_-_Articella.jpg', kind: 'collection-record'},
      {id: 'hunayn-nlm-medieval', label: 'U.S. National Library of Medicine — Medieval Manuscripts, MS E 78', url: 'https://www.nlm.nih.gov/hmd/topics/medieval/index_alla.html', kind: 'collection-record'},
      {id: 'greek-arabic-sep', label: 'Stanford Encyclopedia of Philosophy — Greek Sources in Arabic and Islamic Philosophy', url: 'https://plato.stanford.edu/entries/arabic-islamic-greek/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['hunayn-articella-commons', 'hunayn-nlm-medieval'], ['greek-arabic-sep'], ['hunayn-nlm-medieval', 'greek-arabic-sep']],
    visitorGuide: [
      {heading: 'Reading a later witness', items: [
        {label: 'Latin afterlife', description: 'MS E 78 is a thirteenth-century English teaching manuscript, not an Arabic original or Hunayn’s autograph.', sourceIds: ['hunayn-nlm-medieval', 'hunayn-articella-commons']},
        {label: 'Articella', description: 'The Articella gathered medical primers into a curriculum, giving the Isagoge a new institutional setting.', sourceIds: ['hunayn-nlm-medieval']},
      ]},
      {heading: 'Translation as inquiry', items: [
        {label: 'Multilingual labor', description: 'Hunayn’s circle worked across Syriac and Arabic as it made medical and philosophical texts available.', sourceIds: ['greek-arabic-sep']},
        {label: 'No pictured workshop', description: 'The miniature cannot document Hunayn’s face, studio, or a specific ninth-century translation practice.', sourceIds: ['hunayn-articella-commons', 'hunayn-nlm-medieval']},
      ]},
    ],
    resolution: 'Resolved: identified the installed object as NLM MS E 78, distinguished its thirteenth-century Latin curriculum from Hunayn’s Baghdad milieu, mapped translation-history claims to SEP, retained public-domain provenance and natural ratio, and linked the current Islamic Philosophy article.',
    lock: 'fnv1a64:33532cf0f5208969',
  },
  'islamic-aristotle-arabic-reception': {
    plaqueTitle: 'Aristotle and a Pupil in the Kitāb naʿt al-ḥayawān',
    invitation: 'This thirteenth-century Arabic bestiary receives Aristotle as an authoritative teacher, revealing a later cultural afterlife while Islamic Philosophy’s arguments about translation, commentary, and criticism remain distinct from this image.',
    objectInterpretation: 'The installed miniature is British Library Or. 2784, folio 96r, within the thirteenth-century Kitāb naʿt al-ḥayawān. The collection record identifies the codex as an Arabic illustrated book on animals in the Ibn Bakhtīshūʿ tradition. It is a reception image, not an Arabic Aristotelian treatise, portrait from antiquity, or documentary translation scene.',
    detail: [
      'A haloed seated figure identified in the image record as Aristotle gestures toward a smaller pupil on a worn Arabic manuscript page. The precise source is folio 96r of British Library Or. 2784, the Kitāb naʿt al-ḥayawān. Qatar Digital Library describes the codex as a thirteenth-century Arabic manuscript on animals with damaged leaves, later annotations, and a history of ownership and acquisition; the miniature therefore belongs to a composite book, not to a surviving copy of Aristotle’s corpus.',
      'Arabic readers did encounter Aristotle through translations, revisions, paraphrases, and commentaries, often alongside late-antique interpreters and writings later recognized as pseudo-Aristotelian. Hunayn, Ishaq, and other translators participated in that long, differentiated work. Questions about logical order, demonstrative knowledge, nature, and metaphysics were consequently argued in Arabic scholarly settings rather than merely carried intact from Greek into another language.',
      'This miniature matters because it shows a later authorizing image, not because it pictures the entire reception. The Islamic Philosophy article connects translation to al-Kindi, al-Farabi, Avicenna, al-Ghazali, and Averroes, whose projects disagree sharply. Keeping the bestiary’s genre visible protects that account from two errors: treating the image as direct proof of a ninth-century workshop, or treating Arabic philosophy as a passive bridge to a later Latin Europe.',
    ],
    sources: [
      {id: 'arabic-aristotle-commons', label: 'Wikimedia Commons — Aristotle teaching, British Library Or. 2784, fol. 96r', url: 'https://commons.wikimedia.org/wiki/File:Arabic_aristotle.jpg', kind: 'collection-record'},
      {id: 'arabic-aristotle-qdl', label: 'Qatar Digital Library — Kitāb naʿt al-ḥayawān, British Library Or. 2784', url: 'https://www.qdl.qa/en/archive/81055/vdc_100023556967.0x000001', kind: 'collection-record'},
      {id: 'greek-arabic-sep', label: 'Stanford Encyclopedia of Philosophy — Greek Sources in Arabic and Islamic Philosophy', url: 'https://plato.stanford.edu/entries/arabic-islamic-greek/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['arabic-aristotle-commons', 'arabic-aristotle-qdl'], ['greek-arabic-sep'], ['arabic-aristotle-commons', 'arabic-aristotle-qdl', 'greek-arabic-sep']],
    visitorGuide: [
      {heading: 'Identifying the manuscript', items: [
        {label: 'Bestiary, not treatise', description: 'The folio belongs to an illustrated Arabic book on animals in the Ibn Bakhtīshūʿ tradition.', sourceIds: ['arabic-aristotle-commons', 'arabic-aristotle-qdl']},
        {label: 'Later witness', description: 'The source identifies a thirteenth-century manuscript, not antiquity or a ninth-century translation workshop.', sourceIds: ['arabic-aristotle-commons', 'arabic-aristotle-qdl']},
      ]},
      {heading: 'Receiving Aristotle', items: [
        {label: 'Layered corpus', description: 'Arabic scholarship worked with translations, commentaries, revisions, and uncertain attributions.', sourceIds: ['greek-arabic-sep']},
        {label: 'Arguments change', description: 'Translation helped create new conditions for disagreement about logic, science, and metaphysics.', sourceIds: ['greek-arabic-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the object from an implied Aristotelian manuscript to the British Library bestiary folio, mapped its later reception role and Arabic translation claims to collection and SEP records, preserved public-domain provenance and natural ratio, and linked the current Islamic Philosophy article.',
    lock: 'fnv1a64:164780cd4c0b8919',
  },
};

const reviewGallery08FirstBucket = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewId = input.id as string;
  const evidence = gallery08ReviewEvidence[reviewId];
  if (!evidence) return input;
  const presentation = input.presentation;
  if (!presentation) throw new Error(`Missing Gallery 08 presentation for ${input.id}.`);
  return {
    ...input,
    sections: [
      {heading: '', paragraphs: [`${evidence.detail[0]} ${input.lead}`], sourceIds: evidence.sectionSourceIds[0]},
      {heading: '', paragraphs: [`${evidence.detail[1]} ${input.sections[0].paragraphs.join(' ')} ${input.keyIdeas.join(' ')}`], sourceIds: evidence.sectionSourceIds[1]},
      {heading: '', paragraphs: [`${evidence.detail[2]} ${input.sections[1].paragraphs.join(' ')} ${input.sections[2].paragraphs.join(' ')} ${input.cautions.join(' ')}`], sourceIds: evidence.sectionSourceIds[2]},
    ],
    sources: evidence.sources,
    visitorGuide: evidence.visitorGuide,
    objectInterpretation: evidence.objectInterpretation,
    presentation: {
      ...presentation,
      panelKicker: 'Gallery 08 supplemental exhibit',
      articleActionLabel: 'Read the full sourced Islamic Philosophy article',
      exhibitLayout: 'object-led',
    },
    wallPlaque: {
      type: reviewId === 'islamic-hunayn-translation-method' ? 'reception-or-transmission-history' : 'object-manuscript-site-or-archaeological-context',
      title: evidence.plaqueTitle,
      invitation: evidence.invitation,
      canonicalContexts: [{kind: 'branch', id: 'islamic-philosophy'}],
    },
    review: {
      status: 'standard-compliant', reviewedOn: '2026-08-19', method: gallery08ReviewMethod,
      resolution: evidence.resolution, lock: evidence.lock,
    },
  };
};
const avicennaMedicineSources = [
  {id: 'wellcome-medicines-heart', label: 'Wellcome Collection: Rules about Medicines of the Heart', url: 'https://wellcomecollection.org/works/vcjm2j7z', kind: 'collection-record' as const},
  {id: 'avicenna-psychology-sep', label: 'Stanford Encyclopedia of Philosophy: Ibn Sina’s Psychology', url: 'https://plato.stanford.edu/entries/ibn-sina-mind/', kind: 'academic-reference' as const},
  {id: 'avicenna-natural-sep', label: 'Stanford Encyclopedia of Philosophy: Ibn Sina’s Natural Philosophy', url: 'https://plato.stanford.edu/entries/ibn-sina-natural/', kind: 'academic-reference' as const},
] as const;
const avicennaHebrewCanonSources = [
  {id: 'bodleian-canon-or-50', label: 'Digital Bodleian / Biblissima: MS. Canon. Or. 50', url: 'https://iiif.biblissima.fr/collections/manifest/c31f0778c5cd75e63b1d7f5cd72221b8927eb9a5', kind: 'collection-record' as const},
  {id: 'avicenna-sep', label: 'Stanford Encyclopedia of Philosophy: Ibn Sina', url: 'https://plato.stanford.edu/entries/ibn-sina/', kind: 'academic-reference' as const},
] as const;
const ghazaliIncoherenceSources = [
  {id: 'ghazali-incoherence-commons', label: 'Wikimedia Commons: digitized 1884–85 edition of The Incoherence of the Philosophers', url: 'https://commons.wikimedia.org/wiki/File:The_Incoherence_of_Philosophers_WDL7456.pdf', kind: 'collection-record' as const},
  {id: 'ghazali-sep', label: 'Stanford Encyclopedia of Philosophy: Al-Ghazali', url: 'https://plato.stanford.edu/entries/al-ghazali/', kind: 'academic-reference' as const},
  {id: 'arabic-causation-sep', label: 'Stanford Encyclopedia of Philosophy: Causation in Arabic and Islamic Thought', url: 'https://plato.stanford.edu/entries/arabic-islamic-causation/', kind: 'academic-reference' as const},
] as const;
const ghazaliRevivalSources = [
  {id: 'ghazali-revival-commons', label: 'Wikimedia Commons: manuscript image of The Revival of the Religious Sciences', url: 'https://commons.wikimedia.org/wiki/File:Al-Ihya.jpg', kind: 'collection-record' as const},
  {id: 'ghazali-sep', label: 'Stanford Encyclopedia of Philosophy: Al-Ghazali', url: 'https://plato.stanford.edu/entries/al-ghazali/', kind: 'academic-reference' as const},
  {id: 'arabic-mysticism-sep', label: 'Stanford Encyclopedia of Philosophy: Mysticism in Arabic and Islamic Philosophy', url: 'https://plato.stanford.edu/entries/arabic-islamic-mysticism/', kind: 'academic-reference' as const},
] as const;

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
      {heading: '', paragraph: 'The open manuscript is a later witness to Avicenna’s Rules about Medicines of the Heart, held by Wellcome as MS Or. 73. It does not show Avicenna’s hand, a clinical encounter, or a route to present-day treatment. Its ruled Arabic text, headings, stains, and repairs instead make a learned medical work visible as a copied object: something preserved, handled, and read after its author’s lifetime. The title can mislead modern viewers. “Heart” belongs here to a historical medical vocabulary that links bodily organs, temperament, powers, passions, and regimen; it is not simply the anatomical organ isolated by modern cardiology. The object therefore gives the exhibit a material limit as well as a point of entry.', sourceIds: ['wellcome-medicines-heart', 'avicenna-psychology-sep']},
      {heading: '', paragraph: 'Avicenna’s philosophy matters because it asks how a human being can be intelligible as an integrated natural and psychic life. He distinguishes the soul from the body in metaphysical argument, yet his accounts of perception, imagination, appetite, and motion do not treat ordinary experience as disembodied. Medical inquiry consequently belongs beside psychology and natural philosophy: bodily dispositions and powers help explain how people feel, perceive, act, and can be helped. That systematic ambition is the connection to the Avicenna article. The manuscript does not prove every doctrine in that system, but it prevents the visitor from reducing Avicenna to the familiar Floating Person thought experiment or to a modernized image of a physician.', sourceIds: ['avicenna-psychology-sep', 'avicenna-natural-sep']},
      {heading: '', paragraph: 'The exhibit should not claim that medieval medicine anticipated contemporary psychiatry, nor dismiss it as mere error because its causal vocabulary differs from ours. A treatment framed through qualities, temperaments, organs, and faculties makes claims within a different account of nature and personhood. What remains philosophically instructive is the refusal to separate emotion, bodily condition, practical care, and explanation into sealed domains. The manuscript invites a question rather than advice: what is gained or lost when a culture explains affect only in mental, only in physiological, or in deliberately integrated terms? Read with the full article, it shows an Avicennian system tested where abstract distinctions meet vulnerable embodied life.', sourceIds: ['wellcome-medicines-heart', 'avicenna-psychology-sep', 'avicenna-natural-sep']},
    ],
    imageSource: {label: 'Wikimedia Commons — Avicenna, Rules About Medicines of the Heart', url: 'https://commons.wikimedia.org/wiki/File:Ibn_Sina_(Avicenna),_Rules_about_medicines_of_the_heart._Wellcome_L0016607.jpg'},
    reference: avicennaReference,
    sources: avicennaMedicineSources,
    visitorGuide: [
      {heading: 'Reading the manuscript', items: [
        {label: 'Later witness', description: 'Wellcome MS Or. 73 transmits the work after Avicenna; it is not an autograph or medical observation.', sourceIds: ['wellcome-medicines-heart']},
        {label: 'Historical heart', description: 'The title uses a medical vocabulary of organs, powers, and passions, not a modern diagnosis.', sourceIds: ['wellcome-medicines-heart', 'avicenna-psychology-sep']},
      ]},
      {heading: 'Why it matters', items: [
        {label: 'Embodied powers', description: 'Perception, appetite, imagination, and movement connect psychic life to bodily conditions in Avicenna’s natural philosophy.', sourceIds: ['avicenna-psychology-sep', 'avicenna-natural-sep']},
        {label: 'Care without anachronism', description: 'The work prompts comparison with modern medicine without licensing treatment advice or collapsing distinct explanatory frameworks.', sourceIds: ['wellcome-medicines-heart', 'avicenna-natural-sep']},
      ]},
    ],
    objectInterpretation: 'Wellcome MS Or. 73 is a later manuscript witness to Avicenna’s Rules about Medicines of the Heart. It does not establish Avicenna’s handwriting, a particular patient, modern clinical guidance, or a one-to-one translation of its historical medical vocabulary.',
    wallPlaque: {type: 'work-or-text', title: 'Rules about Medicines of the Heart', invitation: 'A later manuscript witness introduces Avicenna’s attempt to connect bodily condition, passion, and the powers of the soul without turning a historical medical vocabulary into modern advice.', canonicalContexts: [{kind: 'philosopher', id: 'avicenna'}]},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-19', method: 'Gallery 08 supplemental review: object identity, claims, source mapping, rights, accessibility, provenance, subject-specific interpretation, article relationship, CTA, and aspect-safe object-led presentation reconciled.', resolution: 'Resolved: replaced a generic medical summary with claim-mapped object-led interpretation; identified the Wellcome manuscript as MS Or. 73; qualified its evidentiary scope; and restored a factual plaque, specific guide, and canonical article CTA.', lock: 'pending'},
    articleActionLabel: 'Read the full sourced Ibn Sina / Avicenna article',
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
      {heading: '', paragraph: 'This leaf belongs to Bodleian MS. Canon. Or. 50, a Hebrew manuscript of Books I and V of Avicenna’s Canon of Medicine dated by its collection record to 1276–1325. Red rubrication, dense Hebrew writing, and a compact diagram show a material witness shaped for readers other than Avicenna’s original Arabic audience. The record attributes the work to Avicenna but does not securely identify the translator or copyist of this page. It is therefore evidence for medieval Hebrew transmission, not for Avicenna’s language, handwriting, or a direct encounter between one author and one later reader. Its mixed visual and textual character makes translation tangible without pretending to reconstruct every route it took.', sourceIds: ['bodleian-canon-or-50']},
      {heading: '', paragraph: 'A translation is not a transparent container for a finished system. Technical terms must be selected, copied, glossed, taught, and sometimes rearranged for new readers. That labor matters philosophically because terms for body, disease, cause, and faculty help make certain questions available and make other distinctions harder to preserve. The Canon’s reach should not be confused with uniform agreement about Avicenna’s philosophy: a medical encyclopedia can travel through scholarly settings differently from his metaphysical and logical writings. Still, the leaf connects directly to the canonical Avicenna article because it records the afterlife of an author whose work sought systematic relations among medicine, natural inquiry, psychology, and metaphysics.', sourceIds: ['bodleian-canon-or-50', 'avicenna-sep']},
      {heading: '', paragraph: 'The exhibit also corrects a tempting geographical story. Arabic- and Hebrew-reading scholars participated in intersecting Mediterranean intellectual histories, but shared circulation does not erase distinct languages, institutions, religious commitments, or genres of reading. The manuscript is not a token proving that one tradition simply carried another onward; it is a particular Hebrew witness with its own uncertain personnel and localized history. Visitors can use it to ask how a work changes when its authority survives through translation and copying, then continue to the Jewish Philosophy gallery for its own arguments and objects. The photograph supplies no secure evidence for the translator’s intentions, the diagram’s function, or every community that used the manuscript.', sourceIds: ['bodleian-canon-or-50', 'avicenna-sep']},
    ],
    imageSource: {label: 'Wikimedia Commons — Hebrew Canon, Bodleian MS Canon. Or. 50', url: 'https://commons.wikimedia.org/wiki/File:Avicenna_Canon_Bodleian_Library_9v.jpg'},
    reference: avicennaReference,
    sources: avicennaHebrewCanonSources,
    visitorGuide: [
      {heading: 'What this leaf establishes', items: [
        {label: 'Dated witness', description: 'MS. Canon. Or. 50 is catalogued as a Hebrew manuscript of Books I and V, dated 1276–1325.', sourceIds: ['bodleian-canon-or-50']},
        {label: 'Not an autograph', description: 'The page documents later transmission, not Avicenna’s handwriting, original Arabic wording, or authorial diagram.', sourceIds: ['bodleian-canon-or-50']},
      ]},
      {heading: 'Transmission as inquiry', items: [
        {label: 'Technical vocabulary', description: 'Translation makes medical concepts legible to new readers while requiring choices about terms and relations.', sourceIds: ['avicenna-sep']},
        {label: 'Distinct histories', description: 'Shared circulation joins traditions without making Hebrew scholarship a derivative footnote to Arabic philosophy.', sourceIds: ['bodleian-canon-or-50', 'avicenna-sep']},
      ]},
    ],
    objectInterpretation: 'Bodleian MS. Canon. Or. 50 is a Hebrew witness to Books I and V of Avicenna’s Canon, catalogued to 1276–1325. It evidences later transmission, not Avicenna’s language or hand; the available collection record does not securely identify this page’s translator or copyist.',
    wallPlaque: {type: 'reception-or-transmission-history', title: 'Hebrew Manuscript of Avicenna’s Canon', invitation: 'This 1276–1325 Hebrew witness makes Avicenna’s medical afterlife visible while preserving the distinct translators, readers, and scholarly settings that reshaped a work in circulation.', canonicalContexts: [{kind: 'philosopher', id: 'avicenna'}]},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-19', method: 'Gallery 08 supplemental review: object identity, claims, source mapping, rights, accessibility, provenance, subject-specific interpretation, article relationship, CTA, and aspect-safe object-led presentation reconciled.', resolution: 'Resolved: replaced generalized transmission claims with a catalogued Hebrew witness; differentiated author, translator, copyist, and reception; corrected its rights record to the institutional restriction; and added claim-mapped interpretation, factual plaque, guide, and CTA.', lock: 'pending'},
    articleActionLabel: 'Read the full sourced Ibn Sina / Avicenna article',
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
      {heading: '', paragraph: 'The displayed opening is not a medieval manuscript. The digitized object is a ninety-two-page printed edition dated 1884–85 in its Commons/World Digital Library metadata and associated there with Bibliotheca Alexandrina. It gives a later material form to al-Ghazali’s Tahāfut al-falāsifa, not a page he wrote or a transparent witness to the eleventh-century text. Red markers and Arabic prose can still orient a visitor to a work whose title is often flattened into “a rejection of reason.” The object’s value lies in reception and preservation: it shows that a disputation continued to be copied, printed, catalogued, and made newly available long after its original controversy.', sourceIds: ['ghazali-incoherence-commons']},
      {heading: '', paragraph: 'In the Incoherence, al-Ghazali examines twenty positions associated with the falāsifa, especially Avicenna and al-Farabi. His method works from their arguments rather than merely denouncing a foreign label: he asks whether a conclusion follows with the necessity its defenders claim and whether it conflicts with theological commitments. Causation is one famous test. The burning example questions whether observation establishes a necessary connection between fire and cotton, but it does not settle every issue by saying that causes are unreal. The philosophical importance is epistemic and theological: what kind of demonstration can justify claims about nature, divine action, and necessity?', sourceIds: ['ghazali-sep', 'arabic-causation-sep']},
      {heading: '', paragraph: 'That pressure on demonstration reorganized rather than ended philosophical argument. Averroes answered in the Incoherence of the Incoherence and disputed al-Ghazali’s portrayal of the philosophers’ account of causal necessity; later theologians also continued to use and transform Avicennian logical and metaphysical tools. The linked al-Ghazali article supplies the broader account of this selective appropriation. This exhibit asks visitors to read critique as an intellectual practice: accurately reconstruct an opponent, distinguish a possibility from a proof, and identify the commitments an argument cannot simply leave behind. The printed edition cannot decide those interpretive disputes, and it should not be used to make an unsupported claim about a single, final “effect” of al-Ghazali on Islamic philosophy.', sourceIds: ['ghazali-sep', 'arabic-causation-sep', 'ghazali-incoherence-commons']},
    ],
    imageSource: {label: 'Wikimedia Commons — Incoherence of the Philosophers, WDL 7456', url: 'https://commons.wikimedia.org/wiki/File:The_Incoherence_of_Philosophers_WDL7456.pdf'},
    reference: ghazaliReference,
    sources: ghazaliIncoherenceSources,
    visitorGuide: [
      {heading: 'Reading the object', items: [
        {label: 'Printed edition', description: 'The displayed ninety-two-page digitization is dated 1884–85; it is not al-Ghazali’s autograph or a medieval manuscript.', sourceIds: ['ghazali-incoherence-commons']},
        {label: 'Twenty discussions', description: 'The work targets defined philosophical positions rather than every use of logic, mathematics, medicine, or inquiry.', sourceIds: ['ghazali-sep', 'ghazali-incoherence-commons']},
      ]},
      {heading: 'Causation under pressure', items: [
        {label: 'Necessary connection', description: 'The fire-and-cotton discussion tests what observation and argument establish about causal necessity and divine action.', sourceIds: ['ghazali-sep', 'arabic-causation-sep']},
        {label: 'Continuing dispute', description: 'Averroes contested al-Ghazali’s portrayal of the philosophers; later debates did not simply stop with the Tahāfut.', sourceIds: ['arabic-causation-sep', 'ghazali-sep']},
      ]},
    ],
    objectInterpretation: 'This is a digitized 1884–85 printed edition of al-Ghazali’s Tahāfut al-falāsifa, associated in the source metadata with Bibliotheca Alexandrina. It is not a medieval manuscript, autograph, or direct record of the original debate.',
    wallPlaque: {type: 'work-or-text', title: 'The Incoherence of the Philosophers', invitation: 'A later printed edition frames al-Ghazali’s testing of philosophical demonstrations, especially claims about necessity, while keeping the work’s argument and long afterlife open to careful dispute.', canonicalContexts: [{kind: 'philosopher', id: 'al-ghazali'}]},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-19', method: 'Gallery 08 supplemental review: object identity, claims, source mapping, rights, accessibility, provenance, subject-specific interpretation, article relationship, CTA, and aspect-safe object-led presentation reconciled.', resolution: 'Resolved: corrected the installed object from a supposed manuscript to its documented 1884–85 printed edition; qualified the evidence; replaced a slogan-level causation summary with claim-mapped interpretation; and added a factual plaque, guide, and CTA.', lock: 'pending'},
    articleActionLabel: 'Read the full sourced Al-Ghazali article',
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
  ...exhibits.map(reviewGallery08FirstBucket),
  ...ISLAMIC_WALL_FILL_EXHIBITS,
].map(reviewIslamicSupplementalExhibit) as readonly MuseumSupplementalExhibit[];

/**
 * Five rooms × six wall faces = thirty installations.
 * Nine canonical primaries occupy the placements in islamicGalleryCuration;
 * these twenty-one layouts fill every remaining wall exactly once.
 */
export const ISLAMIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  // Room 01: three primaries + three secondaries.
  layout({id: 'islamic-hunayn-translation-method', parentExhibitId: 'islamic-philosophy', zoneId: 'islamic-translation-falsafa', position: {x: -5.55, z: -17.92}, rotationY: Math.PI, assetId: 'hunayn-articella-manuscript', mediaWidth: 2.31515625, mediaHeight: 3.3, installationKind: 'islamic-context', accent: ISLAMIC_PALETTE.brass}),
  layout({id: 'islamic-aristotle-arabic-reception', parentExhibitId: 'islamic-philosophy', zoneId: 'islamic-translation-falsafa', position: {x: 5.55, z: -27.38}, rotationY: 0, assetId: 'islamic-arabic-aristotle', mediaWidth: 2.248125, mediaHeight: 3.3, installationKind: 'islamic-context', accent: ISLAMIC_PALETTE.cinnabar}),
  layout({id: 'islamic-ishaq-euclid-arabic', parentExhibitId: 'al-kindi', zoneId: 'islamic-translation-falsafa', position: {x: 5.55, z: -17.92}, rotationY: Math.PI, assetId: 'ishaq-euclid-arabic-opening', mediaWidth: 3.48, mediaHeight: 2.4305625, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.lapis}),

  // Room 02: Avicenna primary + five distinct work/context exhibits.
  layout({id: 'avicenna-metaphysics-necessity', parentExhibitId: 'avicenna', zoneId: 'islamic-avicennan-system', position: {x: 10.85, z: -11.2}, rotationY: -Math.PI / 2, assetId: 'avicenna-hikmat-al-alai', mediaWidth: 2.19140625, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.lapis}),
  layout({id: 'avicenna-floating-person', parentExhibitId: 'avicenna', zoneId: 'islamic-avicennan-system', position: {x: -5.55, z: -15.68}, rotationY: 0, assetId: 'avicenna-later-miniature', mediaWidth: 2.1140625, mediaHeight: 3.3, installationKind: 'islamic-concept', accent: ISLAMIC_PALETTE.cinnabar}),
  layout({id: 'avicenna-pointers-commentary', parentExhibitId: 'avicenna', zoneId: 'islamic-avicennan-system', position: {x: 5.55, z: -15.68}, rotationY: 0, assetId: 'avicenna-pointers-tusi-commentary', mediaWidth: 3.48, mediaHeight: 2.3218125, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.brass}),
  layout({id: 'avicenna-medicine-heart', parentExhibitId: 'avicenna', zoneId: 'islamic-avicennan-system', position: {x: -5.55, z: -6.72}, rotationY: Math.PI, assetId: 'avicenna-medicines-heart', mediaWidth: 2.23265625, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.malachite}),
  layout({id: 'avicenna-hebrew-canon-transmission', parentExhibitId: 'avicenna', zoneId: 'islamic-avicennan-system', position: {x: 5.55, z: -6.72}, rotationY: Math.PI, assetId: 'avicenna-hebrew-canon', mediaWidth: 2.6090625, mediaHeight: 3.3, installationKind: 'islamic-context', accent: ISLAMIC_PALETTE.lapis}),

  // Room 03: Al-Ghazali primary + five works.
  layout({id: 'al-ghazali-incoherence-philosophers', parentExhibitId: 'al-ghazali', zoneId: 'islamic-kalam-critique', position: {x: 10.85, z: 0}, rotationY: -Math.PI / 2, assetId: 'al-ghazali-incoherence-wdl', mediaWidth: 2.041875, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.cinnabar}),
  layout({id: 'al-ghazali-revival-sciences', parentExhibitId: 'al-ghazali', zoneId: 'islamic-kalam-critique', position: {x: -5.55, z: -4.48}, rotationY: 0, assetId: 'al-ghazali-ihya-manuscript', mediaWidth: 3.48, mediaHeight: 2.61, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.malachite}),
  layout({id: 'al-ghazali-aims-philosophers', parentExhibitId: 'al-ghazali', zoneId: 'islamic-kalam-critique', position: {x: 5.55, z: -4.48}, rotationY: 0, assetId: 'al-ghazali-maqasid-1913', mediaWidth: 1.77375, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.brass}),
  layout({id: 'al-ghazali-deliverance-error', parentExhibitId: 'al-ghazali', zoneId: 'islamic-kalam-critique', position: {x: -5.55, z: 4.48}, rotationY: Math.PI, assetId: 'al-ghazali-munqidh-last-page', mediaWidth: 3.48, mediaHeight: 2.61, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.lapis}),
  layout({id: 'al-ghazali-foundations-analogy', parentExhibitId: 'al-ghazali', zoneId: 'islamic-kalam-critique', position: {x: 5.55, z: 4.48}, rotationY: Math.PI, assetId: 'al-ghazali-asas-qiyas', mediaWidth: 3.48, mediaHeight: 2.968875, installationKind: 'islamic-concept', accent: ISLAMIC_PALETTE.cinnabar}),

  // Room 04: Averroes + Ibn Tufayl primaries; four return-wall exhibits.
  layout({id: 'averroes-demonstration-posterior', parentExhibitId: 'averroes', zoneId: 'islamic-andalusian-worlds', position: {x: -5.55, z: 6.72}, rotationY: 0, assetId: 'averroes-posterior-analytics-wdl', mediaWidth: 2.34609375, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.lapis}),
  layout({id: 'averroes-intellect-de-anima', parentExhibitId: 'averroes', zoneId: 'islamic-andalusian-worlds', position: {x: 5.55, z: 6.72}, rotationY: 0, assetId: 'averroes-de-anima-bnf', mediaWidth: 2.289375, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.brass}),
  layout({id: 'averroes-colliget-medicine', parentExhibitId: 'averroes', zoneId: 'islamic-andalusian-worlds', position: {x: -5.55, z: 15.68}, rotationY: Math.PI, assetId: 'averroes-colliget', mediaWidth: 3.48, mediaHeight: 2.098875, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.malachite}),
  layout({id: 'andalusian-astrolabe-context', parentExhibitId: 'ibn-tufayl', zoneId: 'islamic-andalusian-worlds', position: {x: 5.55, z: 15.68}, rotationY: Math.PI, assetId: 'andalusian-astrolabe-1029', mediaWidth: 3.48, mediaHeight: 2.9145, installationKind: 'islamic-context', accent: ISLAMIC_PALETTE.cinnabar}),

  // Room 05: Suhrawardi + Mulla Sadra primaries; four return-wall exhibits.
  layout({id: 'suhrawardi-ishraq-opening', parentExhibitId: 'suhrawardi', zoneId: 'islamic-post-avicennian', position: {x: -5.55, z: 17.92}, rotationY: 0, assetId: 'suhrawardi-ishraq-1477', mediaWidth: 1.9078125, mediaHeight: 3.3, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.brass}),
  layout({id: 'suhrawardi-ishraq-annotated', parentExhibitId: 'suhrawardi', zoneId: 'islamic-post-avicennian', position: {x: 5.55, z: 17.92}, rotationY: 0, assetId: 'suhrawardi-ishraq-1220', mediaWidth: 3.479035250463822, mediaHeight: 2.93, installationKind: 'islamic-work', accent: ISLAMIC_PALETTE.lapis}),
  layout({id: 'mulla-sadra-kahak-withdrawal', parentExhibitId: 'mulla-sadra', zoneId: 'islamic-post-avicennian', position: {x: -5.55, z: 27.38}, rotationY: Math.PI, assetId: 'mulla-sadra-kahak-house', mediaWidth: 2.20171875, mediaHeight: 3.3, installationKind: 'islamic-context', accent: ISLAMIC_PALETTE.cinnabar}),
  layout({id: 'safavid-chahar-bagh-continuity', parentExhibitId: 'islamic-philosophy', zoneId: 'islamic-post-avicennian', position: {x: 5.55, z: 27.38}, rotationY: Math.PI, assetId: 'safavid-chahar-bagh-school', mediaWidth: 3.48, mediaHeight: 2.3218125, installationKind: 'islamic-context', accent: ISLAMIC_PALETTE.malachite}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getIslamicSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = ISLAMIC_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 10 supplemental exhibit ${id} is missing.`);
  return record;
};
