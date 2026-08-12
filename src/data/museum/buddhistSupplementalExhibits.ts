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
import {BUDDHIST_WALL_FILL_EXHIBITS} from './buddhistWallFillExhibits';

export const BUDDHIST_GALLERY_ID = 'buddhist-philosophies' as const;

export const BUDDHIST_PALETTE = Object.freeze({
  ink: '#1c2220',
  saffron: '#c58a35',
  lotus: '#9c4f4f',
  lapis: '#355e7b',
  jade: '#3f7165',
  paper: '#e7dcc6',
});

export const BUDDHIST_ROOM_SIGN_COPY = {
  'buddhist-many-paths': {
    kicker: 'Room 01 · Begin with plurality',
    title: 'Many Buddhist paths and early discourses',
    subtitle: 'Suffering, no-self, discipline, meditation, and insight enter through layered communal transmission.',
  },
  'buddhist-madhyamaka': {
    kicker: 'Room 02 · Emptiness without nihilism',
    title: 'Madhyamaka: dependence, emptiness, and two truths',
    subtitle: 'Ask how dependent arising undercuts independent essence without making practice or suffering unreal.',
  },
  'buddhist-abhidharma-yogacara': {
    kicker: 'Room 03 · Analyze experience',
    title: 'Abhidharma to Yogācāra',
    subtitle: 'Follow Vasubandhu across classification, cognition, continuity, and contested accounts of representation.',
  },
  'buddhist-pramana': {
    kicker: 'Room 04 · Test cognition',
    title: 'Pramāṇa: perception, inference, and language',
    subtitle: 'Dignāga and Dharmakīrti make reliable cognition a precise philosophical problem.',
  },
  'buddhist-transmission-reserve': {
    kicker: 'Room 05 · Translation transforms',
    title: 'Texts move—and philosophical worlds change',
    subtitle: 'Chinese printing, Tibetan manuscripts, travel, commentary, and institutions carry arguments into new settings.',
  },
} as const;

const volume = (id: string, center: MuseumSceneVolume['center'], size: MuseumSceneVolume['size']): MuseumSceneVolume =>
  ({id, role: 'media', center, size});
const mediaMount = (id: MuseumSupplementalExhibitId, assetId: MuseumAssetId, width: number, height: number): MuseumMediaMountDefinition => {
  const y = 2.14;
  return {
    id: `${id}-hero-media`, assetId, kind: 'wall-frame', position: [0, y, -.39], rotation: [0, 0, 0],
    width, height, frameDepth: .1, supportHeight: 0, anchorId: `${id}-backing`,
    bounds: volume(`${id}-media-bounds`, {x: 0, y, z: -.39}, {width: width + .18, height: height + .18, depth: .2}),
    supportBounds: volume(`${id}-media-support`, {x: 0, y, z: -.55}, {width: width * .74, height: height * .74, depth: .18}),
  };
};
const cameraFor = (position: MuseumPoint, rotationY: number, distance = 2.92): MuseumPoint => ({
  x: position.x + Math.sin(rotationY) * distance, z: position.z + Math.cos(rotationY) * distance,
});
const layout = ({
  id, parentExhibitId, zoneId, position, rotationY, assetId, mediaWidth, mediaHeight, installationKind, accent,
}: {
  id: MuseumSupplementalExhibitId;
  parentExhibitId:
    | 'buddhist-philosophy'
    | 'buddha'
    | 'nagarjuna'
    | 'vasubandhu'
    | 'buddhist-epistemology'
    | 'dignaga'
    | 'dharmakirti';
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
    id, parentExhibitId, zoneId, spatialCellId: zoneId, position, rotationY, interactionRadius: 3.65,
    collider: {id: `supplemental:${id}`, center: position, size: {width, depth: 1.05}, rotation: rotationY},
    viewpoint: {...cameraFor(position, rotationY), yaw: rotationY, pitch: -.055},
    assetId, mediaMount: mediaMount(id, assetId, mediaWidth, mediaHeight),
    label: {position: [0, 4.04, -.3], width: width - .36, height: .72},
    footprint: {width, height: 4.44, depth: 1.05}, installationKind, accent,
  };
};
const presentation = (
  panelKicker: string,
  proximityKicker: string,
  factRows: readonly {label: string; value: string}[],
  articleActionLabel: string,
  entityKind: 'philosopher' | 'branch',
) => ({panelKicker, proximityKicker, factRows, articleActionLabel, entityKind, keyIdeasLabel: 'Interpretive anchors', cautionsLabel: 'Keep in view'});

type Gallery05ReviewEvidence = {
  plaqueTitle: string;
  invitation: string;
  objectInterpretation: string;
  detail: readonly [string, string, string];
  sources: MuseumSupplementalExhibit['sources'];
  sectionSourceIds: readonly [readonly string[], readonly string[], readonly string[]];
  visitorGuide: NonNullable<MuseumSupplementalExhibit['visitorGuide']>;
  articleTitle: string;
  canonicalContexts: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['canonicalContexts'];
  plaqueType: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['type'];
  resolution: string;
  lock: string;
  reviewMethod?: string;
};

const gallery05ReviewEvidence: Partial<Record<MuseumSupplementalExhibitId, Gallery05ReviewEvidence>> = {
  'buddhist-early-discourse-scrolls': {
    plaqueTitle: 'Gandhāran Birch-Bark Scroll Fragments',
    invitation: 'These first-century Gandhāran fragments preserve early Buddhist texts in a later material witness, making transmission—not the Buddha’s autograph—the historical question.',
    objectInterpretation: 'British Library Or. 14915 part 31 is a first-century birch-bark witness written in Kharoṣṭhī. It is evidence for early Gandhāran transmission, not the Buddha’s handwriting, a stenographic transcript, or one original canon.',
    detail: [
      'The installed CC0 image records fragments catalogued as British Library Or. 14915 part 31. Narrow Kharoṣṭhī lines cross damaged birch bark whose breaks, losses, and later preservation are part of the evidence. The precise manuscript record belongs to the British Library and the Commons file; philosophical claims require independent textual scholarship.',
      'The International Dunhuang Programme situates the wider Gandhāran finds across roughly the first century BCE to the third century CE and describes multiple scribes, texts, and storage histories. That plurality makes comparison possible while preventing one surviving fragment from becoming an imagined master copy behind every Pāli, Sanskrit, Gāndhārī, Chinese, or Tibetan collection.',
      'The Buddha article supplies the responsible historical frame: teachings were organized and transmitted within communities, and surviving textual layers require critical comparison. The object contributes material date, script, damage, and custody; it cannot establish the date of a teaching, the exact voice of a speaker, or uniform agreement among early communities.',
    ],
    sources: [
      {id: 'gandhara-scroll-commons', label: 'Wikimedia Commons — British Library Or. 14915 part 31', url: 'https://commons.wikimedia.org/wiki/File:Fragmentary_Buddhist_text_-_Gandhara_birchbark_scrolls_(1st_C),_part_31_-_BL_Or._14915.jpg', kind: 'collection-record'},
      {id: 'gandhara-scroll-idp', label: 'International Dunhuang Programme — Transmission of Buddhism collection items', url: 'https://idp.bl.uk/discover/learning/buddhism-on-the-silk-roads/collection-items/transmission-of-buddhism-collection-items/', kind: 'collection-record'},
      {id: 'buddha-sep', label: 'Stanford Encyclopedia of Philosophy — Buddha', url: 'https://plato.stanford.edu/entries/buddha/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['gandhara-scroll-commons', 'gandhara-scroll-idp'], ['gandhara-scroll-idp', 'buddha-sep'], ['buddha-sep', 'gandhara-scroll-commons']],
    visitorGuide: [
      {heading: 'Reading the fragments', items: [
        {label: 'Material witness', description: 'Birch bark, Kharoṣṭhī script, damage, and catalogued custody establish a first-century Gandhāran manuscript witness.', sourceIds: ['gandhara-scroll-commons', 'gandhara-scroll-idp']},
        {label: 'Not an autograph', description: 'The fragments postdate the Buddha and preserve communal transmission rather than handwriting or an eyewitness transcript.', sourceIds: ['buddha-sep', 'gandhara-scroll-idp']},
      ]},
      {heading: 'Comparing transmissions', items: [
        {label: 'Many textual histories', description: 'Related teachings survive through plural languages, collections, scribes, and institutions.', sourceIds: ['gandhara-scroll-idp', 'buddha-sep']},
        {label: 'Bounded inference', description: 'A manuscript date and script do not by themselves date the teaching copied upon it.', sourceIds: ['gandhara-scroll-commons', 'buddha-sep']},
      ]},
    ],
    articleTitle: 'Siddhartha Gautama / the Buddha', canonicalContexts: [{kind: 'philosopher', id: 'buddha'}], plaqueType: 'object-manuscript-site-or-archaeological-context',
    resolution: 'Resolved: retained the verified British Library fragment, added IDP manuscript context, separated object facts from transmission claims, preserved CC0 credit and natural proportions, and made the autograph and single-canon limits explicit.', lock: 'fnv1a64:0ecf948be28bba38',
  },
  'nagarjuna-prajnaparamita-witness': {
    plaqueTitle: 'Prajñāpāramitā Manuscript Leaf',
    invitation: 'This thirteenth-century Tibetan witness shows later devotional and textual transmission around the Perfection of Wisdom, a literature historically related to but not authored by Nāgārjuna.',
    objectInterpretation: 'Walters W.856.1 is a thirteenth-century Tibetan leaf with gold writing on blue-dyed paper and painted figures of Śākyamuni and Prajñāpāramitā. It witnesses later reception, not Nāgārjuna’s authorship, autograph, or lifetime setting.',
    detail: [
      'The Walters identifies this long leaf as W.856.1, a thirteenth-century Tibetan witness to the Aṣṭasāhasrikā Prajñāpāramitā. Gold writing crosses blue-dyed paper between painted figures of Śākyamuni and the personified Perfection of Wisdom. The public-domain image preserves the full horizontal form instead of treating its side figures as expendable decoration.',
      'Prajñāpāramitā literature repeatedly resists turning liberating categories into fixed essences, while Madhyamaka develops arguments against intrinsic nature. Historical relationship does not collapse the two corpora into one author or text. The leaf was produced roughly a millennium after Nāgārjuna and belongs to Tibetan devotional, scribal, scholastic, and collecting histories.',
      'The Nāgārjuna article supports the philosophical relationship through dependent arising, emptiness, and cautions against nihilism. The Walters record establishes the object, date, material, figures, and holding. Neither source licenses a claim that this leaf transmits Nāgārjuna’s own words or that one later manuscript settles how early Madhyamaka read every Perfection of Wisdom text.',
    ],
    sources: [
      {id: 'prajnaparamita-walters', label: 'Walters Art Museum — Buddha Śākyamuni and Prajñāpāramitā, W.856.1', url: 'https://art.thewalters.org/object/W.856.1/', kind: 'collection-record'},
      {id: 'prajnaparamita-commons', label: 'Wikimedia Commons — installed Walters W.856.1 image', url: 'https://commons.wikimedia.org/wiki/File:Tibetan_-_Buddha_Shakyamuni_and_Prajnaparamita_-_Walters_W8561_(2).jpg', kind: 'collection-record'},
      {id: 'nagarjuna-sep', label: 'Stanford Encyclopedia of Philosophy — Nāgārjuna', url: 'https://plato.stanford.edu/entries/nagarjuna/', kind: 'academic-reference'},
      {id: 'madhyamaka-iep', label: 'Internet Encyclopedia of Philosophy — Madhyamaka Buddhist Philosophy', url: 'https://iep.utm.edu/madhyamaka-buddhist-philosophy/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['prajnaparamita-walters', 'prajnaparamita-commons'], ['nagarjuna-sep', 'madhyamaka-iep'], ['prajnaparamita-walters', 'nagarjuna-sep']],
    visitorGuide: [
      {heading: 'Reading the manuscript leaf', items: [
        {label: 'Text and image', description: 'Gold writing, blue-dyed paper, and figures of Śākyamuni and Prajñāpāramitā join textual and devotional transmission.', sourceIds: ['prajnaparamita-walters']},
        {label: 'Later Tibetan witness', description: 'Its thirteenth-century date makes it reception evidence, not a Nāgārjuna autograph or lifetime object.', sourceIds: ['prajnaparamita-walters', 'nagarjuna-sep']},
      ]},
      {heading: 'Philosophical relationship', items: [
        {label: 'Related, not identical', description: 'Perfection of Wisdom literature and Madhyamaka are historically related without becoming one work or authorial corpus.', sourceIds: ['nagarjuna-sep', 'madhyamaka-iep']},
        {label: 'Emptiness without nihilism', description: 'Madhyamaka criticizes intrinsic nature while retaining conventional relations and practice.', sourceIds: ['nagarjuna-sep', 'madhyamaka-iep']},
      ]},
    ],
    articleTitle: 'Nāgārjuna', canonicalContexts: [{kind: 'philosopher', id: 'nagarjuna'}], plaqueType: 'reception-or-transmission-history',
    resolution: 'Resolved: verified Walters W.856.1 and its material description, added the institutional record, preserved public-domain credit and the full leaf, corrected the panel ratio, and bounded its relationship to Nāgārjuna as later reception.', lock: 'fnv1a64:701a0e8a7e833982',
  },
  'nagarjuna-dependent-arising': {
    plaqueTitle: 'Bhavacakra: Wheel of Cyclic Existence',
    invitation: 'This contemporary teaching panel visualizes Buddhist cyclical existence; Nāgārjuna’s article explains why Madhyamaka links dependent arising with emptiness without treating the image as his diagram.',
    objectInterpretation: 'Ms Sarah Welch’s 2019 photograph records a pale, sculptural-looking contemporary bhavacakra panel at Dhamma Nagajjuna. The maker and object date are unverified; the image is not Nāgārjuna’s diagram or evidence for Madhyamaka doctrine.',
    detail: [
      'The installed CC0 photograph was made by Ms Sarah Welch in 2019 at Dhamma Nagajjuna, Nagarjuna Sagar, Telangana. It shows a pale, densely figured bhavacakra panel rather than the colorful painted mural previously described. The source does not identify its maker or establish when the physical panel was produced, so those fields remain explicitly unknown.',
      'Bhavacakra iconography organizes cyclic existence, karmic conditioning, and possible release in a broader Buddhist teaching tradition. Nāgārjuna’s argument is different in form: whatever arises dependently lacks independent, self-grounding nature. The modern panel can orient attention toward dependence, but it cannot visualize the logical steps of Madhyamaka or authenticate a doctrine by resemblance.',
      'The Nāgārjuna article and specialist references support the distinction between emptiness and nonexistence, as well as the role of conventional truth. The photograph supports only object appearance, place, photographer, date of capture, and rights. Keeping these evidentiary roles separate prevents an attractive image from becoming a fictitious ancient diagram or a shortcut around philosophical argument.',
    ],
    sources: [
      {id: 'bhavacakra-commons', label: 'Wikimedia Commons — Bhavacakra at Dhamma Nagajjuna', url: 'https://commons.wikimedia.org/wiki/File:Bhavachakra_Samsara,_Buddhist_Wheel_of_Life,_Dhamma_Nagajjuna,_Nagarjuna_Sagar_Telangana,_India.jpg', kind: 'collection-record'},
      {id: 'nagarjuna-sep', label: 'Stanford Encyclopedia of Philosophy — Nāgārjuna', url: 'https://plato.stanford.edu/entries/nagarjuna/', kind: 'academic-reference'},
      {id: 'nagarjuna-iep', label: 'Internet Encyclopedia of Philosophy — Nāgārjuna', url: 'https://iep.utm.edu/nagarjun/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['bhavacakra-commons'], ['nagarjuna-sep', 'nagarjuna-iep'], ['bhavacakra-commons', 'nagarjuna-sep', 'nagarjuna-iep']],
    visitorGuide: [
      {heading: 'Reading the contemporary panel', items: [
        {label: 'What is verified', description: 'Welch photographed this bhavacakra at Dhamma Nagajjuna in 2019 and released the image as CC0.', sourceIds: ['bhavacakra-commons']},
        {label: 'What remains unknown', description: 'The source does not identify the maker or date the physical panel.', sourceIds: ['bhavacakra-commons']},
      ]},
      {heading: 'From image to argument', items: [
        {label: 'Dependent arising', description: 'For Madhyamaka, dependence undercuts independent essence rather than erasing causal or ethical life.', sourceIds: ['nagarjuna-sep', 'nagarjuna-iep']},
        {label: 'Not Nāgārjuna’s diagram', description: 'Bhavacakra iconography is a teaching context, not documentary evidence for his authorship or argument.', sourceIds: ['bhavacakra-commons', 'nagarjuna-sep']},
      ]},
    ],
    articleTitle: 'Nāgārjuna', canonicalContexts: [{kind: 'philosopher', id: 'nagarjuna'}], plaqueType: 'concept-argument-diagram-or-method',
    resolution: 'Resolved: corrected the installed image from a colorful mural to a pale contemporary bhavacakra panel, removed the unsupported painter claim, retained Welch’s CC0 credit, separated iconography from Madhyamaka argument, and matched its natural ratio.', lock: 'fnv1a64:300555f166d22c4f',
  },
  'buddhist-xuanzang-translation': {
    plaqueTitle: 'Bronze Statue of Xuanzang',
    invitation: 'This 2010 photograph records a modern Xi’an monument, while Xuanzang’s seventh-century collaborative translations and commentaries reshaped East Asian Buddhist philosophy.',
    objectInterpretation: 'David Castor’s 2010 public-domain photograph shows a modern bronze statue in the Tripitaka Master of Dharma Hall at the Giant Wild Goose Pagoda. It is a commemorative image, not a Tang portrait or direct record of Xuanzang’s workshop.',
    detail: [
      'The installed public-domain photograph was made by David Castor on 23 July 2010 in the Tripitaka Master of Dharma Hall at the Giant Wild Goose Pagoda, Xi’an. The bronze monument’s sculptor and installation date are not supplied by the source. Its robes and manuscript roll construct a modern memory of Xuanzang rather than preserving his appearance.',
      'Xuanzang returned to Chang’an in 645 and worked with a collaborative translation staff. Translation required choices about terminology, textual comparison, commentary, and institutional authority; those choices helped shape the East Asian Faxiang reception of Yogācāra. A monument can make that labor memorable, but intellectual history comes from textual and scholarly sources rather than the statue’s iconography.',
      'The broad Buddhist Philosophy article provides the canonical route, while the Xuanzang reference establishes the translator-specific history missing from a generic Yogācāra source. The exhibit therefore distinguishes modern commemoration, seventh-century activity, and later philosophical influence instead of compressing all three into one supposedly documentary portrait.',
    ],
    sources: [
      {id: 'xuanzang-commons', label: 'Wikimedia Commons — Xuanzang statue photograph', url: 'https://commons.wikimedia.org/wiki/File:Xuanzang.jpg', kind: 'collection-record'},
      {id: 'xuanzang-iep', label: 'Internet Encyclopedia of Philosophy — Xuanzang', url: 'https://iep.utm.edu/xuanzang/', kind: 'academic-reference'},
      {id: 'buddhist-philosophy-iep', label: 'Internet Encyclopedia of Philosophy — Buddhist Philosophy', url: 'https://iep.utm.edu/buddha/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['xuanzang-commons'], ['xuanzang-iep'], ['xuanzang-commons', 'xuanzang-iep', 'buddhist-philosophy-iep']],
    visitorGuide: [
      {heading: 'Reading the monument', items: [
        {label: 'Exact setting', description: 'Castor photographed the bronze inside the Tripitaka Master of Dharma Hall at Xi’an’s Giant Wild Goose Pagoda.', sourceIds: ['xuanzang-commons']},
        {label: 'Modern commemoration', description: 'The source supplies neither a Tang-period likeness nor the modern sculptor and installation date.', sourceIds: ['xuanzang-commons']},
      ]},
      {heading: 'Translation as philosophy', items: [
        {label: 'Collaborative practice', description: 'Xuanzang’s translations emerged through organized staff, terminology, commentary, and institutional support.', sourceIds: ['xuanzang-iep']},
        {label: 'East Asian development', description: 'Translation helped form later Faxiang interpretation rather than moving an untouched doctrine between languages.', sourceIds: ['xuanzang-iep', 'buddhist-philosophy-iep']},
      ]},
    ],
    articleTitle: 'Buddhist Philosophy', canonicalContexts: [{kind: 'branch', id: 'buddhist-philosophy'}], plaqueType: 'reception-or-transmission-history',
    resolution: 'Resolved: tightened the photographed statue’s exact hall and date, preserved unknown maker information and public-domain credit, added Xuanzang-specific scholarship, distinguished commemoration from translation history, and matched the natural portrait ratio.', lock: 'fnv1a64:b3fe2f2fa5ce0ad8',
  },
  'buddhist-tibetan-pecha': {
    plaqueTitle: 'Cover of a Buddhist Manuscript',
    invitation: 'This thirteenth-century Tibetan painted cover protected a manuscript and frames the material, devotional, and institutional practices through which Buddhist philosophy was received and debated.',
    objectInterpretation: 'Walters W.896 is a thirteenth-century Tibetan wooden manuscript cover with paint and gilding. Its central Śākyamuni, Avalokiteśvara, and Achala frame a manuscript materially; the cover does not expose or identify the protected text.',
    detail: [
      'The Walters identifies W.896 as a thirteenth-century Tibetan cover made of wood with paint and gilding. Śākyamuni occupies the center, with Avalokiteśvara at left and Achala at right. John and Berthe Ford gave the object to the museum in 2002. The installed cropped photograph is CC BY-SA 3.0 while the historical object is public domain.',
      'A pecha-style manuscript is handled as ordered leaves protected by covers rather than as a modern bound codex. Covers participate in preservation, patronage, ritual care, and visual framing. This object makes those material practices visible, but its source does not show the hidden leaves or establish which precise philosophical text the cover once protected.',
      'Tibetan Buddhist philosophy developed through translation, commentary, debate, teaching institutions, and changing lineages. The cover belongs to that reception history without representing one timeless Tibetan doctrine or every manuscript tradition. Correct attribution keeps the object’s figures, material, date, provenance, image license, and interpretive limit together.',
    ],
    sources: [
      {id: 'pecha-walters', label: 'Walters Art Museum — Cover of a Buddhist Manuscript, W.896', url: 'https://art.thewalters.org/object/W.896/', kind: 'collection-record'},
      {id: 'pecha-commons', label: 'Wikimedia Commons — installed cropped W.896 photograph', url: 'https://commons.wikimedia.org/wiki/File:Tibetan_-_Cover_of_a_Buddhist_Manuscript_-_Walters_W896_-_Top_(cropped).jpg', kind: 'collection-record'},
      {id: 'tibetan-epistemology-sep', label: 'Stanford Encyclopedia of Philosophy — Tibetan Epistemology and Philosophy of Language', url: 'https://plato.stanford.edu/entries/epistemology-language-tibetan/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['pecha-walters', 'pecha-commons'], ['pecha-walters'], ['tibetan-epistemology-sep', 'pecha-walters']],
    visitorGuide: [
      {heading: 'Reading the painted cover', items: [
        {label: 'Figures and material', description: 'Paint and gilding on wood frame Śākyamuni between Avalokiteśvara and Achala.', sourceIds: ['pecha-walters']},
        {label: 'Rights and provenance', description: 'The Fords gave W.896 to the Walters in 2002; the installed cropped photograph is CC BY-SA 3.0.', sourceIds: ['pecha-walters', 'pecha-commons']},
      ]},
      {heading: 'Material transmission', items: [
        {label: 'Protection, not displayed text', description: 'The cover evidences manuscript care but does not show or identify the leaves it protected.', sourceIds: ['pecha-walters']},
        {label: 'Changing traditions', description: 'Translation, commentary, debate, and institutions developed Tibetan philosophical vocabularies over time.', sourceIds: ['tibetan-epistemology-sep']},
      ]},
    ],
    articleTitle: 'Buddhist Philosophy', canonicalContexts: [{kind: 'branch', id: 'buddhist-philosophy'}], plaqueType: 'object-manuscript-site-or-archaeological-context',
    resolution: 'Resolved: corrected Walters W.896 to the thirteenth century, added material, figures, Ford gift provenance, official record and license distinction, removed the claim that unseen translated text is displayed, regenerated the panel derivative, and preserved the natural ratio.', lock: 'fnv1a64:1f2ebefae9943c4a',
  },
  'buddhist-diamond-sutra': {
    plaqueTitle: 'Diamond Sūtra',
    invitation: 'This dated Dunhuang woodblock print preserves a Chinese translation of the Diamond Sūtra and shows how patronage, printing, and circulation transformed Buddhist textual life in East Asia.',
    objectInterpretation: 'British Library Or. 8210/P.2 is a Chinese woodblock print dated 11 May 868, translated by Kumārajīva and recovered from Mogao Cave 17 at Dunhuang. Its colophon names Wang Jie as commissioner or dedicator, not securely as the printer.',
    detail: [
      'The International Dunhuang Programme identifies Or. 8210/P.2 as woodblock ink on paper in Chinese script, dated 11 May 868 and translating the Diamond Sūtra through Kumārajīva. Aurel Stein acquired it during the 1906–08 expedition after its recovery from Mogao Cave 17. The installed British Library image is CC0.',
      'The scroll’s frontispiece, vertical text, colophon, and dated production bring visual teaching, translation, patronage, merit, printing, and circulation into one surviving object. Wang Jie is the named commissioner or dedicator in the colophon; calling him the printer would claim a production role the record does not establish. Reproducibility can widen circulation without eliminating variants or interpretation.',
      'The object is often described as the earliest surviving complete dated printed book, a formulation tied to survival and dating rather than the invention of printing. It is one Chinese translation and one Dunhuang witness, not the beginning of Buddhist translation, the first printed image, or a complete account of East Asian canons and reading communities.',
    ],
    sources: [
      {id: 'diamond-idp', label: 'International Dunhuang Programme — Or. 8210/P.2', url: 'https://idp.bl.uk/collection/51FDAEAFB4A24E2E9981692A98130BC8/', kind: 'collection-record'},
      {id: 'diamond-commons', label: 'Wikimedia Commons — installed British Library Diamond Sūtra image', url: 'https://commons.wikimedia.org/wiki/File:Diamond_Sutra_of_868_AD_-_The_Diamond_Sutra_(868),_frontispiece_and_text_-_BL_Or._8210-P.2.jpg', kind: 'collection-record'},
      {id: 'diamond-idp-context', label: 'International Dunhuang Programme — The Diamond Sutra', url: 'https://idp.bl.uk/blog/the-diamond-sutra/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['diamond-idp', 'diamond-commons'], ['diamond-idp', 'diamond-idp-context'], ['diamond-idp', 'diamond-idp-context']],
    visitorGuide: [
      {heading: 'Reading the dated scroll', items: [
        {label: 'Object and date', description: 'Or. 8210/P.2 is a Chinese woodblock print on paper dated 11 May 868.', sourceIds: ['diamond-idp']},
        {label: 'Dunhuang provenance', description: 'The scroll came from Mogao Cave 17 and entered Stein’s 1906–08 expedition collection.', sourceIds: ['diamond-idp']},
      ]},
      {heading: 'Printing and interpretation', items: [
        {label: 'Named dedication', description: 'The colophon names Wang Jie as commissioner or dedicator, not securely as the printer.', sourceIds: ['diamond-idp', 'diamond-idp-context']},
        {label: 'A surviving milestone', description: 'Its dated survival does not make it the origin of printing, translation, or illustrated Buddhist books.', sourceIds: ['diamond-idp-context']},
      ]},
    ],
    articleTitle: 'Buddhist Philosophy', canonicalContexts: [{kind: 'branch', id: 'buddhist-philosophy'}], plaqueType: 'work-or-text',
    resolution: 'Resolved: adopted the work title Diamond Sūtra, added the IDP record and Dunhuang/Stein provenance, corrected Wang Jie from printer to commissioner or dedicator, preserved CC0 credit and natural proportions, and qualified the dated-print milestone.', lock: 'fnv1a64:489a8281f3856ccc',
  },
};

const gallery05CompletionMethod = 'Gallery 05 supplemental completion: two non-overlapping Terra/High read-only evidence scopes split six and five exhibits, reconciled by the Sol parent across installed-object identity, interpretation, attribution, dating, institution, provenance, rights, source mapping, accessibility, article relationship, routes, and aspect-safe presentation.';

const gallery05CompletionEvidence: Partial<Record<MuseumSupplementalExhibitId, Gallery05ReviewEvidence>> = {
  'vasubandhu-abhidharmakosa': {
    plaqueTitle: 'Meta-Discourse on the Teachings from the Treasury (Abhidharmakośa-bhāṣya)',
    invitation: 'This late-Heian handscroll transmits part of Xuanzang’s Chinese translation centuries after Vasubandhu; his article traces how the Treasury classifies and criticizes Abhidharma positions.',
    objectInterpretation: 'Cleveland Museum of Art 1916.1060 is part 17 of a thirty-part late-Heian Japanese handscroll, written in gold and silver on indigo paper. It is a later witness to Xuanzang’s Chinese translation, not a Nepalese manuscript, Indian original, or Vasubandhu autograph.',
    detail: [
      'The Cleveland Museum identifies the installed object as an anonymous Japanese handscroll from the 1100s, acquired from Kuroda Takuma through the Worcester R. Warner Collection in 1916. Gold and silver characters cross indigo-dyed paper. The museum record—not the unrelated Nepalese manuscript formerly cited—establishes title, date, material, accession, provenance, and public-domain image status.',
      'The Abhidharmakośa organizes inherited analyses of factors, causation, karma, cognition, meditation, and cosmology, while its bhāṣya stages objections and critiques positions associated with Sarvāstivāda. The surviving Japanese object displays the long material transmission of that discourse; it cannot determine which positions Vasubandhu finally endorsed or resolve disputes about his intellectual biography.',
      'Xuanzang’s Chinese translation and the later Japanese copy are themselves chapters of reception. The Vasubandhu article and Sanskrit witness support philosophical claims; the Cleveland record supports this object. Keeping those evidentiary roles distinct prevents a beautiful handscroll from becoming an imagined autograph while still showing how scholastic arguments remained available across languages and centuries.',
    ],
    sources: [
      {id: 'abhidharma-cleveland', label: 'Cleveland Museum of Art — Meta-Discourse on the Teachings from the Treasury, 1916.1060', url: 'https://www.clevelandart.org/art/1916.1060', kind: 'collection-record'},
      {id: 'abhidharma-commons', label: 'Wikimedia Commons — installed Cleveland handscroll image', url: 'https://commons.wikimedia.org/wiki/File:Japan,_late_Heian_period_-_Further_Discourses_on_the_Supreme_Truth_(Abidharmakosha-Bhashya)_-_1916.1060_-_Cleveland_Museum_of_Art.tif', kind: 'collection-record'},
      {id: 'vasubandhu-sep', label: 'Stanford Encyclopedia of Philosophy — Vasubandhu', url: 'https://plato.stanford.edu/entries/vasubandhu/', kind: 'academic-reference'},
      {id: 'abhidharma-gretil', label: 'GRETIL — Vasubandhu, Abhidharmakośabhāṣya', url: 'https://gretil.sub.uni-goettingen.de/gretil/corpustei/transformations/html/sa_vasubandhu-abhidharmakozabhASya.htm', kind: 'primary-text'},
    ],
    sectionSourceIds: [['abhidharma-cleveland', 'abhidharma-commons'], ['vasubandhu-sep', 'abhidharma-gretil'], ['abhidharma-cleveland', 'vasubandhu-sep']],
    visitorGuide: [
      {heading: 'Reading the late-Heian handscroll', items: [
        {label: 'Part 17 of 30', description: 'The museum identifies this as one section of Xuanzang’s Chinese translation copied in twelfth-century Japan.', sourceIds: ['abhidharma-cleveland']},
        {label: 'Known provenance', description: 'Kuroda Takuma, Worcester R. Warner, and the Cleveland Museum form the documented modern custody chain.', sourceIds: ['abhidharma-cleveland']},
      ]},
      {heading: 'Treasury and critique', items: [
        {label: 'Systematic analysis', description: 'The work classifies conditioned processes while preserving arguments among Buddhist scholastic positions.', sourceIds: ['vasubandhu-sep', 'abhidharma-gretil']},
        {label: 'Transmission, not autograph', description: 'A Japanese copy of a Chinese translation cannot establish Vasubandhu’s handwriting or original manuscript form.', sourceIds: ['abhidharma-cleveland', 'vasubandhu-sep']},
      ]},
    ],
    articleTitle: 'Vasubandhu', canonicalContexts: [{kind: 'philosopher', id: 'vasubandhu'}], plaqueType: 'work-or-text',
    resolution: 'Resolved: corrected a material Nepal/Cleveland mismatch, identified the late-Heian handscroll and its documented provenance, separated object from philosophical evidence, preserved CC0 rights, bounded the transmission claim, and matched the natural ratio.', lock: 'fnv1a64:5fd394ed25e9e8a7', reviewMethod: gallery05CompletionMethod,
  },
  'vasubandhu-mere-ideation': {
    plaqueTitle: 'The Completion of Mere Ideation (Cheng weishi lun)',
    invitation: 'This fourteenth-century Japanese Kasuga-edition print transmits Xuanzang’s synthesis around consciousness-only thought; Vasubandhu’s article restores the earlier texts and their contested interpretation.',
    objectInterpretation: 'The installed image is a fourteenth-century Japanese Kasuga edition from Kōfuku-ji, now in the National Diet Library. It transmits the Cheng weishi lun associated with Xuanzang’s synthesis of commentaries on Vasubandhu’s Thirty Verses; it is not a Tibetan xylograph or Vasubandhu’s original text.',
    detail: [
      'The Commons and World Digital Library description identifies a Japanese Kasuga edition printed at Kōfuku-ji during the fourteenth century and held by the National Diet Library. Its wide field of printed Chinese characters is therefore a later East Asian witness. The earlier label’s Tibetan, Library of Congress, and direct-author claims did not match the installed image and have been removed.',
      'The Cheng weishi lun is connected with Xuanzang’s translation and synthesis of commentarial traditions around Vasubandhu’s concise Thirty Verses. It should not be collapsed into those verses or treated as a transparent copy of an Indian original. The object helps visitors see how a corpus was organized and taught in Japan after multiple stages of translation, commentary, selection, and printing.',
      'Vasubandhu’s “mere representation” remains interpretively contested: realist critique, idealist readings, phenomenological description, causal dispositions, and soteriological transformation cannot be settled by a modern slogan. The article and specialist sources support those claims; the print supports its own date, format, Japanese institutional setting, custody, and public-domain image status.',
    ],
    sources: [
      {id: 'mere-ideation-commons', label: 'Wikimedia Commons — The Completion of Mere Ideation, WDL 11843', url: 'https://commons.wikimedia.org/wiki/File:The_Completion_of_Mere_Ideation_WDL11843.jpg', kind: 'collection-record'},
      {id: 'vasubandhu-sep', label: 'Stanford Encyclopedia of Philosophy — Vasubandhu', url: 'https://plato.stanford.edu/entries/vasubandhu/', kind: 'academic-reference'},
      {id: 'mind-indian-sep', label: 'Stanford Encyclopedia of Philosophy — Mind in Indian Buddhist Philosophy', url: 'https://plato.stanford.edu/entries/mind-indian-buddhism/', kind: 'academic-reference'},
      {id: 'consciousness-only-hawaii', label: 'University of Hawai‘i Press — Three Texts on Consciousness Only', url: 'https://uhpress.hawaii.edu/title/three-texts-on-consciousness-only/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['mere-ideation-commons', 'consciousness-only-hawaii'], ['vasubandhu-sep', 'mind-indian-sep'], ['mere-ideation-commons', 'vasubandhu-sep', 'consciousness-only-hawaii']],
    visitorGuide: [
      {heading: 'Reading the Kasuga edition', items: [
        {label: 'Japanese witness', description: 'The National Diet Library object was printed at Kōfuku-ji in fourteenth-century Japan.', sourceIds: ['mere-ideation-commons']},
        {label: 'A later synthesis', description: 'Cheng weishi lun belongs to Xuanzang-linked commentary and synthesis around the Thirty Verses, not to Vasubandhu’s pen as one unchanged text.', sourceIds: ['consciousness-only-hawaii', 'vasubandhu-sep']},
      ]},
      {heading: 'Interpreting representation', items: [
        {label: 'Beyond a slogan', description: 'Mere representation is debated across metaphysical, phenomenological, causal, and therapeutic readings.', sourceIds: ['vasubandhu-sep', 'mind-indian-sep']},
        {label: 'Shared conditions', description: 'Karmic dispositions and regularity complicate the caricature of a sovereign private mind inventing everything.', sourceIds: ['vasubandhu-sep', 'mind-indian-sep']},
      ]},
    ],
    articleTitle: 'Vasubandhu', canonicalContexts: [{kind: 'philosopher', id: 'vasubandhu'}], plaqueType: 'work-or-text',
    resolution: 'Resolved: corrected a material Tibetan/Japanese mismatch, identified the National Diet Library Kasuga edition and Xuanzang-linked synthesis, qualified authorship, preserved public-domain status, regenerated the natural-ratio panel, and retained the contested philosophical readings.', lock: 'fnv1a64:d0109db55c5ac279', reviewMethod: gallery05CompletionMethod,
  },
};

const reviewGallery05Exhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const evidence = gallery05CompletionEvidence[input.id] ?? gallery05ReviewEvidence[input.id];
  if (!evidence) return input;
  const basePresentation = input.presentation;
  if (!basePresentation) throw new Error(`Missing Gallery 05 presentation for ${input.id}.`);
  return {
    ...input,
    sections: [
      {heading: '', paragraphs: [`${input.lead} ${evidence.detail[0]} ${input.sections[0].paragraphs.join(' ')}`], sourceIds: evidence.sectionSourceIds[0]},
      {heading: '', paragraphs: [`${input.sections[1].paragraphs.join(' ')} ${evidence.detail[1]} ${input.keyIdeas.join(' ')}`], sourceIds: evidence.sectionSourceIds[1]},
      {heading: '', paragraphs: [`${input.sections[2].paragraphs.join(' ')} ${evidence.detail[2]} ${input.cautions.join(' ')}`], sourceIds: evidence.sectionSourceIds[2]},
    ],
    visitorGuide: evidence.visitorGuide,
    sources: evidence.sources,
    objectInterpretation: evidence.objectInterpretation,
    presentation: {
      ...basePresentation,
      panelKicker: 'Gallery 05 supplemental exhibit',
      articleActionLabel: `Read the full sourced ${evidence.articleTitle} article`,
      exhibitLayout: 'object-led',
    },
    wallPlaque: {type: evidence.plaqueType, title: evidence.plaqueTitle, invitation: evidence.invitation, canonicalContexts: evidence.canonicalContexts},
    review: {
      status: 'standard-compliant', reviewedOn: '2026-08-12',
      method: evidence.reviewMethod ?? 'Gallery 05 supplemental review: two non-overlapping Terra/High evidence scopes of six exhibits each reconciled by the Sol parent across installed-object identity, interpretation, attribution, dating, institution, provenance, rights, source mapping, accessibility, article relationship, routes, and aspect-safe presentation.',
      resolution: evidence.resolution, lock: evidence.lock,
      visualReview: {
        desktop: {reviewedOn: '2026-08-12', viewport: '1280×720', evidence: `Direct route inspected with the installed object, three-paragraph interpretation, subject-specific sidebar, article CTA, and no horizontal overflow. Evidence: docs/visual-validation/gallery-05-supplementals/desktop/${input.id}.png`},
        mobile: {reviewedOn: '2026-08-12', viewport: '390×844', evidence: `Direct route inspected with wrapped copy, loaded object preview, scrollable interpretation, visible controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-05-supplementals/mobile/${input.id}.png`},
        threeDimensional: {reviewedOn: '2026-08-12', viewport: '1280×720 fresh direct-route session', evidence: `Fresh-session authored viewpoint inspected with a live 3D canvas, closed detail panel, readable plaque, distinct installation, and the image mounted at its natural scene ratio. Evidence: docs/visual-validation/gallery-05-supplementals/staged-3d/${input.id}.png`},
      },
    },
  };
};

const rawExhibits = [
  {
    id: 'buddhist-early-discourse-scrolls',
    displayName: 'The Buddha’s Teachings: Early Discourses in Transmission',
    shortTitle: 'The Buddha: Early Discourses in Transmission',
    workLabel: 'EARLY BUDDHIST TEXTS · COMMUNAL MEMORY',
    dateLabel: 'Gandhāran birch-bark fragments · 1st century CE',
    question: 'How do teachings associated with an oral community become surviving texts?',
    frontSubtitle: 'Recitation, collection, variation, copying, and material fragility',
    lead: 'The Buddha left no autograph. Early discourses were recited, organized, debated, and transmitted by communities before the surviving Gandhāran fragments were written. These birch-bark pieces are extraordinarily early material witnesses, but they still belong to a history of preservation rather than a stenographic record of one speaker.',
    keyIdeas: ['Oral and textual transmission are historical processes.', 'Different canons preserve overlapping and divergent collections.', 'A surviving manuscript date is not the date of the teaching it carries.'],
    cautions: ['Do not label the fragments as the Buddha’s handwriting.', 'One fragment cannot stand for every Buddhist canon or school.'],
    sections: [
      {heading: 'A teaching becomes a collection', paragraphs: ['Communities recited teachings in patterned forms, grouped them, and preserved them across languages and institutions. Variation is evidence of transmission, not simply corruption.']},
      {heading: 'Material evidence changes the question', paragraphs: ['Birch bark, Kharoṣṭhī script, damage, and provenance tell a history of copying and survival. The object asks what can be inferred without pretending that every layer is equally old.']},
      {heading: 'Plural canons require careful comparison', paragraphs: ['Pāli, Sanskrit, Gāndhārī, Chinese, and Tibetan witnesses preserve related teachings through different textual histories. Comparison can reveal shared structures and meaningful variation without inventing a single recoverable transcript behind them all.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Gandhāran birch-bark fragments', url: 'https://commons.wikimedia.org/wiki/File:Fragmentary_Buddhist_text_-_Gandhara_birchbark_scrolls_(1st_C),_part_31_-_BL_Or._14915.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Buddha', url: 'https://plato.stanford.edu/entries/buddha/', kind: 'academic-reference'},
    ],
    assetId: 'buddhist-gandhara-birchbark', panelAssetId: 'buddhist-gandhara-birchbark',
    articleRoute: {kind: 'philosopher', philosopherId: 'buddha'},
    presentation: presentation('Gallery 08 textual history', 'Early discourses in transmission', [
      {label: 'Witness', value: 'Gandhāran birch bark'}, {label: 'Date', value: '1st century CE'}, {label: 'Caution', value: 'Transmission, not autograph'},
    ], 'Open the Buddha in the Atlas', 'philosopher'),
  },
  {
    id: 'nagarjuna-prajnaparamita-witness',
    displayName: 'Nāgārjuna’s Context: Prajñāpāramitā in Manuscript',
    shortTitle: 'Nāgārjuna: Prajñāpāramitā Transmission',
    workLabel: 'MADHYAMAKA CONTEXT · PERFECTION OF WISDOM',
    dateLabel: 'Tibetan manuscript leaf · 13th century',
    question: 'How did emptiness arguments develop alongside the Perfection of Wisdom literature?',
    frontSubtitle: 'Wisdom, non-grasping, bodhisattva practice, and later Tibetan transmission',
    lead: 'Prajñāpāramitā literature repeatedly unsettles attachment to fixed categories while situating wisdom within the bodhisattva path. Nāgārjuna’s Madhyamaka is historically distinct from any one sūtra, but later traditions read his arguments in close conversation with this literature. The leaf makes that interpretive afterlife visible.',
    keyIdeas: ['Emptiness is joined to practice rather than offered as a detached theory.', 'Madhyamaka and Prajñāpāramitā are related but not identical.', 'Later Tibetan manuscripts witness reception, not Nāgārjuna’s authorship.'],
    cautions: ['The leaf was copied about a millennium after Nāgārjuna.', 'Do not turn “emptiness” into a claim that nothing exists.'],
    sections: [
      {heading: 'Wisdom without a new essence', paragraphs: ['Perfection of Wisdom texts challenge the impulse to make even liberating categories into permanent things. Madhyamaka develops rigorous arguments against that reification.']},
      {heading: 'Traditions read texts together', paragraphs: ['Commentaries and institutions constructed relationships among sūtras, treatises, ritual practice, and philosophical debate. The manuscript belongs to that later history.']},
      {heading: 'The object stages a later encounter', paragraphs: ['Text, painted figures, format, and preservation show how philosophical argument entered devotional and scholastic settings far from its earliest composition. That encounter is evidence for reception, not proof of a simple authorial lineage. Its distance is historically meaningful.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Walters Prajñāpāramitā leaf', url: 'https://commons.wikimedia.org/wiki/File:Tibetan_-_Buddha_Shakyamuni_and_Prajnaparamita_-_Walters_W8561_(2).jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Nāgārjuna', url: 'https://plato.stanford.edu/entries/nagarjuna/', kind: 'academic-reference'},
    ],
    assetId: 'buddhist-prajnaparamita-walters', panelAssetId: 'buddhist-prajnaparamita-walters',
    articleRoute: {kind: 'philosopher', philosopherId: 'nagarjuna'},
    presentation: presentation('Gallery 08 manuscript exhibit', 'Prajñāpāramitā transmission', [
      {label: 'Object', value: '13th-century Tibetan leaf'}, {label: 'Context', value: 'Perfection of Wisdom'}, {label: 'Caution', value: 'Later reception'},
    ], 'Open Nāgārjuna in the Atlas', 'philosopher'),
  },
  {
    id: 'nagarjuna-dependent-arising',
    displayName: 'Nāgārjuna: Dependent Arising and Emptiness',
    shortTitle: 'Nāgārjuna: Dependent Arising',
    workLabel: 'NĀGĀRJUNA · DEPENDENCE WITHOUT ESSENCE',
    dateLabel: 'Modern bhavacakra mural · photographed 2019',
    question: 'Why does dependence undermine independent essence rather than ordinary causal life?',
    frontSubtitle: 'Conditioned arising, conventional truth, emptiness, and the rejection of nihilism',
    lead: 'Nāgārjuna argues that whatever arises through conditions cannot possess an independent, self-grounding essence. Emptiness names that absence of intrinsic nature; it does not erase causal practice, ethical consequence, or suffering. The modern wheel is a prompt for dependent arising, not a diagram of Madhyamaka’s full argument.',
    keyIdeas: ['Dependent things are empty of independent essence.', 'Conventional relations remain indispensable.', 'Emptiness itself must not be reified into a hidden substance.'],
    cautions: ['The mural is contemporary and not Nāgārjuna’s diagram.', 'Emptiness is not simple nonexistence.'],
    sections: [
      {heading: 'The argument turns on dependence', paragraphs: ['A thing that depends on causes, parts, concepts, and practices cannot be what it is entirely from its own side. This critique targets essence, not every form of existence.']},
      {heading: 'Two truths are not two worlds', paragraphs: ['Conventional truth concerns the working distinctions through which life and inquiry proceed. Ultimate analysis shows why those distinctions lack independent foundation; it does not reveal a separate metaphysical realm.']},
      {heading: 'Analysis returns to practice', paragraphs: ['Because persons and actions function conventionally, insight into emptiness does not cancel compassion, responsibility, or causal consequence. Madhyamaka instead asks practitioners to use distinctions without mistaking them for self-grounded realities.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Bhavacakra mural', url: 'https://commons.wikimedia.org/wiki/File:Bhavachakra_Samsara,_Buddhist_Wheel_of_Life,_Dhamma_Nagajjuna,_Nagarjuna_Sagar_Telangana,_India.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Nāgārjuna', url: 'https://plato.stanford.edu/entries/nagarjuna/', kind: 'academic-reference'},
    ],
    assetId: 'buddhist-dependent-arising-wheel', panelAssetId: 'buddhist-dependent-arising-wheel',
    articleRoute: {kind: 'philosopher', philosopherId: 'nagarjuna'},
    presentation: presentation('Gallery 08 concept exhibit', 'Dependent arising', [
      {label: 'Claim', value: 'Dependence excludes independent essence'}, {label: 'Method', value: 'Analyze relations and conditions'}, {label: 'Caution', value: 'Not nihilism'},
    ], 'Open Nāgārjuna in the Atlas', 'philosopher'),
  },
  {
    id: 'vasubandhu-abhidharmakosa',
    displayName: 'Vasubandhu’s Abhidharmakośa: Analysis and Critique',
    shortTitle: 'Vasubandhu: Abhidharmakośa',
    workLabel: 'VASUBANDHU · TREASURY OF ABHIDHARMA',
    dateLabel: 'Late-Heian Japanese handscroll · 1100s · Cleveland 1916.1060',
    question: 'How can experience be analyzed without positing a permanent self?',
    frontSubtitle: 'Dharmas, causation, cognition, karma, and Vasubandhu’s critical commentary',
    lead: 'The Abhidharmakośa organizes a vast field of scholastic analysis while its commentary also questions positions associated with Sarvāstivāda. Vasubandhu is therefore not a static label between “Abhidharma” and “Yogācāra,” but a thinker working across inherited systems, criticism, and later reinterpretation.',
    keyIdeas: ['Analysis breaks the person into conditioned processes without denying continuity.', 'The commentary records argument within Buddhist scholasticism.', 'Vasubandhu’s intellectual biography and affiliations remain debated.'],
    cautions: ['The manuscript is not an autograph.', 'Do not make every Abhidharma school say the same thing.'],
    sections: [
      {heading: 'A treasury can also criticize', paragraphs: ['Classification clarifies causal and cognitive relations, but Vasubandhu’s commentary frequently stages objections and rival positions. System and debate belong together.']},
      {heading: 'No-self does not mean no continuity', paragraphs: ['Buddhist analysis explains memory, responsibility, and rebirth through conditioned sequences rather than an unchanging owner. The explanatory details remain contested.']},
      {heading: 'A thinker crosses inherited boundaries', paragraphs: ['Later biographies and doxographies organize Vasubandhu into neat stages, yet the works themselves preserve complex engagements with multiple scholastic positions. The exhibit treats those affiliations as historical questions rather than a fixed conversion story. That uncertainty matters when relating one work to another.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Abhidharmakośa manuscript', url: 'https://commons.wikimedia.org/wiki/File:Abhidharmakosha_manuscript.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Vasubandhu', url: 'https://plato.stanford.edu/entries/vasubandhu/', kind: 'academic-reference'},
    ],
    assetId: 'vasubandhu-abhidharmakosha-manuscript', panelAssetId: 'vasubandhu-abhidharmakosha-manuscript',
    articleRoute: {kind: 'philosopher', philosopherId: 'vasubandhu'},
    presentation: presentation('Gallery 08 work exhibit', 'Abhidharmakośa', [
      {label: 'Work', value: 'Treasury of Abhidharma'}, {label: 'Method', value: 'Classification and critique'}, {label: 'Caution', value: 'Affiliations debated'},
    ], 'Open Vasubandhu in the Atlas', 'philosopher'),
  },
  {
    id: 'vasubandhu-mere-ideation',
    displayName: 'Vasubandhu’s Mere Ideation: Representation and Experience',
    shortTitle: 'Vasubandhu: Mere Ideation',
    workLabel: 'VASUBANDHU · VIJÑAPTIMĀTRATĀ',
    dateLabel: 'Japanese Kasuga edition · 14th century · National Diet Library',
    question: 'What changes when experience is analyzed through representation rather than external objects as ordinarily assumed?',
    frontSubtitle: 'Cognition, appearance, karmic continuity, and rival readings of Yogācāra',
    lead: 'Texts attributed to Vasubandhu use “mere ideation” to analyze how experience appears structured by cognition and karmic dispositions. Interpreters dispute whether this amounts to idealism, a phenomenological method, a soteriological strategy, or some combination. The exhibit keeps that tension visible instead of translating the doctrine into a slogan.',
    keyIdeas: ['Experience is examined through representational and causal processes.', 'The ordinary subject-object split is not taken for granted.', 'Modern labels such as “idealism” remain interpretive and contested.'],
    cautions: ['Do not reduce the argument to “nothing exists outside my mind.”', 'The Tibetan print is a later transmission witness.'],
    sections: [
      {heading: 'A diagnosis serves transformation', paragraphs: ['Yogācāra analysis is not only a theory of what exists. It asks how mistaken constructions arise and how transformed cognition could loosen suffering.']},
      {heading: 'The modern category remains contested', paragraphs: ['Calling Vasubandhu an idealist can clarify some arguments and conceal others. Responsible interpretation states the comparison without making it the ancient author’s own label.']},
      {heading: 'Representation has a causal history', paragraphs: ['Appearances are shaped by dispositions, previous acts, conceptual habits, and shared conditions rather than produced by a sovereign private mind. That causal account keeps ethical and soteriological questions joined to the analysis of cognition.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Completion of Mere Ideation', url: 'https://commons.wikimedia.org/wiki/File:The_Completion_of_Mere_Ideation_WDL11843.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Vasubandhu', url: 'https://plato.stanford.edu/entries/vasubandhu/', kind: 'academic-reference'},
    ],
    assetId: 'vasubandhu-mere-ideation', panelAssetId: 'vasubandhu-mere-ideation',
    articleRoute: {kind: 'philosopher', philosopherId: 'vasubandhu'},
    presentation: presentation('Gallery 08 work exhibit', 'Mere ideation', [
      {label: 'Focus', value: 'Representation and cognition'}, {label: 'Aim', value: 'Transform mistaken construction'}, {label: 'Debate', value: 'What kind of idealism?'},
    ], 'Open Vasubandhu in the Atlas', 'philosopher'),
  },
  {
    id: 'buddhist-xuanzang-translation',
    displayName: 'Xuanzang: Translation as Philosophical Labor',
    shortTitle: 'Xuanzang: Translation and Debate',
    workLabel: 'TRANSLATION · TRAVEL · TERMINOLOGY',
    dateLabel: 'Modern Xi’an monument · photographed 2010',
    question: 'What philosophical work occurs when texts cross languages and institutions?',
    frontSubtitle: 'Terminology, travel, commentary, institutions, and East Asian Yogācāra',
    lead: 'Xuanzang’s journeys, translations, and commentarial projects helped reshape Buddhist philosophy in East Asia. Translation required choices about terms, arguments, textual families, and authority. The modern statue commemorates that labor while reminding visitors that a tradition moves through people and institutions, not disembodied ideas alone.',
    keyIdeas: ['Translation selects philosophical equivalents and creates new vocabularies.', 'Travel and institutions affect which texts become authoritative.', 'East Asian Yogācāra develops rather than merely copies South Asian debates.'],
    cautions: ['The statue is modern and not a Tang portrait.', 'Translation is not a transparent transfer of identical meanings.'],
    sections: [
      {heading: 'Words carry arguments', paragraphs: ['Rendering technical terms demands decisions about similarity, ambiguity, and established usage. Those decisions become resources for later debates.']},
      {heading: 'Transmission transforms', paragraphs: ['Schools, catalogues, commentaries, and pedagogies reorganize imported materials. New settings do not simply preserve a frozen original.']},
      {heading: 'Institutions make translation possible', paragraphs: ['Patronage, teams of specialists, libraries, travel routes, and teaching communities supplied the labor behind translated canons. Xuanzang’s achievement therefore belongs to a network even while his choices decisively shaped that network’s vocabulary. Later commentators then debated those choices within new intellectual settings.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Xuanzang statue', url: 'https://commons.wikimedia.org/wiki/File:Xuanzang.jpg', kind: 'collection-record'},
      {label: 'Internet Encyclopedia of Philosophy — Yogācāra', url: 'https://iep.utm.edu/yogacara-buddhism/', kind: 'academic-reference'},
    ],
    assetId: 'buddhist-xuanzang-statue', panelAssetId: 'buddhist-xuanzang-statue',
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    presentation: presentation('Gallery 08 transmission', 'Translation as philosophy', [
      {label: 'Figure', value: 'Xuanzang'}, {label: 'Work', value: 'Travel, translation, commentary'}, {label: 'Result', value: 'New philosophical vocabularies'},
    ], 'Open Buddhist Philosophy in the Atlas', 'branch'),
  },
  {
    id: 'buddhist-tibetan-pecha',
    displayName: 'Tibetan Manuscript Worlds: Text, Image, and Institution',
    shortTitle: 'Tibetan Manuscript Worlds',
    workLabel: 'TRANSMISSION · MANUSCRIPT CULTURE',
    dateLabel: 'Painted manuscript cover · c. 13th–14th century',
    question: 'How do translated texts acquire material, ritual, and institutional lives?',
    frontSubtitle: 'Pecha format, painting, recitation, commentary, collection, and use',
    lead: 'A painted Tibetan manuscript cover protected and framed a text as a valued material object. Translation, copying, recitation, commentary, image, and institutional stewardship all contributed to a philosophical work’s life. The cover does not reveal one doctrine, but it makes the conditions of preservation and authority impossible to ignore.',
    keyIdeas: ['Texts persist through skilled material and institutional practices.', 'Image and ornament can mark value without summarizing doctrine.', 'Tibetan philosophical traditions developed extensive new debates and curricula.'],
    cautions: ['A manuscript cover is not a diagram of its text.', 'Tibetan Buddhism is internally diverse and cannot be represented by one object.'],
    sections: [
      {heading: 'A book has a social life', paragraphs: ['Commissioning, copying, housing, reading, reciting, and teaching determine which texts survive and how they are interpreted.']},
      {heading: 'Reception creates new arguments', paragraphs: ['Tibetan scholars did not merely preserve Indian works. They organized curricula, wrote commentaries, and developed competing interpretations across institutions and lineages.']},
      {heading: 'Material form directs attention', paragraphs: ['Long leaves, protective boards, pigments, and ordered bundles govern how a reader handles and encounters a text. The cover’s visual authority frames study while remaining distinct from the propositions found inside. Handling and display are part of transmission.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Walters manuscript cover W.896', url: 'https://commons.wikimedia.org/wiki/File:Tibetan_-_Cover_of_a_Buddhist_Manuscript_-_Walters_W896_-_Top_(cropped).jpg', kind: 'collection-record'},
      {label: 'Internet Encyclopedia of Philosophy — Buddhist Philosophy', url: 'https://iep.utm.edu/buddha/', kind: 'academic-reference'},
    ],
    assetId: 'buddhist-tibetan-pecha', panelAssetId: 'buddhist-tibetan-pecha',
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    presentation: presentation('Gallery 08 transmission', 'Tibetan manuscript worlds', [
      {label: 'Object', value: 'Painted manuscript cover'}, {label: 'Date', value: 'c. 13th–14th century'}, {label: 'Focus', value: 'Material and institutional life'},
    ], 'Open Buddhist Philosophy in the Atlas', 'branch'),
  },
  {
    id: 'buddhist-diamond-sutra',
    displayName: 'The Diamond Sūtra: Translation, Printing, and Circulation',
    shortTitle: 'Diamond Sūtra: Print and Circulation',
    workLabel: 'EAST ASIA · PRINT · PUBLIC TRANSMISSION',
    dateLabel: 'Dated Chinese woodblock print · 868 CE',
    question: 'How does printing change the scale and setting of Buddhist textual life?',
    frontSubtitle: 'Chinese translation, patronage, image, text, reproducibility, and Dunhuang',
    lead: 'The dated 868 Diamond Sūtra combines a teaching frontispiece, Chinese text, printing, and patronage. It is not the first Buddhist translation or printed image, but it is a remarkable surviving object in which philosophical language, ritual merit, technology, and circulation meet. It closes the hall by turning transmission into a visible historical process.',
    keyIdeas: ['Printing changes reproducibility without fixing interpretation.', 'Translation and patronage shape which texts circulate.', 'Material history belongs inside philosophical history.'],
    cautions: ['The object is one Chinese translation and not a complete East Asian canon.', 'Its survival should not be confused with being the first instance of every feature it displays.'],
    sections: [
      {heading: 'Reproduction creates new publics', paragraphs: ['Woodblock printing enabled repeated copies while preserving a designed relation between image and text. Distribution, merit-making, and study could now meet at a different scale.']},
      {heading: 'A route continues beyond the hall', paragraphs: ['The object points toward Chinese, Korean, Japanese, Tibetan, and other Buddhist histories that exceed this gallery’s South Asian primary roster. The wall marks transformation, not a final destination.']},
      {heading: 'A date anchors one surviving object', paragraphs: ['The colophon identifies a particular act of production and dedication in 868. It offers unusually precise evidence without establishing that printing, translation, or illustrated Buddhist books began with this copy.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Diamond Sūtra, British Library Or. 8210/P.2', url: 'https://commons.wikimedia.org/wiki/File:Diamond_Sutra_of_868_AD_-_The_Diamond_Sutra_(868),_frontispiece_and_text_-_BL_Or._8210-P.2.jpg', kind: 'collection-record'},
      {label: 'British Library — Diamond Sutra', url: 'https://www.bl.uk/collection-items/the-diamond-sutra', kind: 'collection-record'},
    ],
    assetId: 'buddhist-diamond-sutra-868', panelAssetId: 'buddhist-diamond-sutra-868',
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    presentation: presentation('Gallery 08 transmission', 'Print and circulation', [
      {label: 'Object', value: 'Dated woodblock print'}, {label: 'Date', value: '868 CE'}, {label: 'Place', value: 'China; found at Dunhuang'},
    ], 'Open Buddhist Philosophy in the Atlas', 'branch'),
  },
] as const satisfies readonly MuseumSupplementalExhibit[];

const exhibits = rawExhibits.map(reviewGallery05Exhibit);

export const BUDDHIST_SUPPLEMENTAL_EXHIBITS = [
  ...exhibits,
  ...BUDDHIST_WALL_FILL_EXHIBITS,
] as const satisfies readonly MuseumSupplementalExhibit[];
export const BUDDHIST_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'buddhist-early-discourse-scrolls', parentExhibitId: 'buddhist-philosophy', zoneId: 'buddhist-many-paths', position: {x: -5.55, z: -17.92}, rotationY: Math.PI, assetId: 'buddhist-gandhara-birchbark', mediaWidth: 3.48, mediaHeight: 2.3218125, installationKind: 'buddhist-work', accent: BUDDHIST_PALETTE.saffron}),
  layout({id: 'buddhist-first-sermon-four-truths', parentExhibitId: 'buddha', zoneId: 'buddhist-many-paths', position: {x: -5.55, z: -27.38}, rotationY: 0, assetId: 'buddhist-first-sermon-gandhara', mediaWidth: 3.48, mediaHeight: 2.3218125, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.lotus}),
  layout({id: 'ashoka-dhamma-public-ethics', parentExhibitId: 'buddhist-philosophy', zoneId: 'buddhist-many-paths', position: {x: 5.55, z: -27.38}, rotationY: 0, assetId: 'buddhist-ashoka-lion-capital', mediaWidth: 2.46, mediaHeight: 3.28, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.saffron}),
  layout({id: 'early-buddhist-stupa-community', parentExhibitId: 'buddhist-philosophy', zoneId: 'buddhist-many-paths', position: {x: 5.55, z: -17.92}, rotationY: Math.PI, assetId: 'buddhist-sanchi-great-stupa', mediaWidth: 3.4610722611, mediaHeight: 2.32, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.jade}),
  layout({id: 'nagarjuna-prajnaparamita-witness', parentExhibitId: 'nagarjuna', zoneId: 'buddhist-madhyamaka', position: {x: 10.85, z: -11.2}, rotationY: -Math.PI / 2, assetId: 'buddhist-prajnaparamita-walters', mediaWidth: 3.5827751196, mediaHeight: 1.17, installationKind: 'buddhist-work', accent: BUDDHIST_PALETTE.lapis}),
  layout({id: 'nagarjuna-dependent-arising', parentExhibitId: 'nagarjuna', zoneId: 'buddhist-madhyamaka', position: {x: -5.55, z: -6.72}, rotationY: Math.PI, assetId: 'buddhist-dependent-arising-wheel', mediaWidth: 2.782875, mediaHeight: 3.28, installationKind: 'buddhist-concept', accent: BUDDHIST_PALETTE.lotus}),
  layout({id: 'nagarjuna-root-verses-middle-way', parentExhibitId: 'nagarjuna', zoneId: 'buddhist-madhyamaka', position: {x: -5.55, z: -15.68}, rotationY: 0, assetId: 'nagarjuna-composes-madhyamaka-relief', mediaWidth: 3.48, mediaHeight: 2.5501875, installationKind: 'buddhist-work', accent: BUDDHIST_PALETTE.lotus}),
  layout({id: 'madhyamaka-lineage-aryadeva', parentExhibitId: 'nagarjuna', zoneId: 'buddhist-madhyamaka', position: {x: 5.55, z: -15.68}, rotationY: 0, assetId: 'nagarjuna-aryadeva-rubin-painting', mediaWidth: 2.289375, mediaHeight: 3.3, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.saffron}),
  layout({id: 'prajnaparamita-wisdom-embodied', parentExhibitId: 'nagarjuna', zoneId: 'buddhist-madhyamaka', position: {x: 5.55, z: -6.72}, rotationY: Math.PI, assetId: 'buddhist-prajnaparamita-pala-bronze', mediaWidth: 2.475, mediaHeight: 3.3, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.lapis}),
  layout({id: 'vasubandhu-abhidharmakosa', parentExhibitId: 'vasubandhu', zoneId: 'buddhist-abhidharma-yogacara', position: {x: -5.55, z: 4.48}, rotationY: Math.PI, assetId: 'vasubandhu-abhidharmakosha-manuscript', mediaWidth: 3.42, mediaHeight: 2.60775, installationKind: 'buddhist-work', accent: BUDDHIST_PALETTE.saffron}),
  layout({id: 'vasubandhu-mere-ideation', parentExhibitId: 'vasubandhu', zoneId: 'buddhist-abhidharma-yogacara', position: {x: 10.85, z: 0}, rotationY: -Math.PI / 2, assetId: 'vasubandhu-mere-ideation', mediaWidth: 3.58, mediaHeight: 1.006875, installationKind: 'buddhist-work', accent: BUDDHIST_PALETTE.jade}),
  layout({id: 'asanga-vasubandhu-yogacara-lineage', parentExhibitId: 'vasubandhu', zoneId: 'buddhist-abhidharma-yogacara', position: {x: -5.55, z: -4.48}, rotationY: 0, assetId: 'buddhist-asanga-vasubandhu-relief', mediaWidth: 3.48, mediaHeight: 2.6045625, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.lotus}),
  layout({id: 'abhidharma-cosmology-mount-meru', parentExhibitId: 'vasubandhu', zoneId: 'buddhist-abhidharma-yogacara', position: {x: 5.55, z: -4.48}, rotationY: 0, assetId: 'buddhist-mount-meru-met-tapestry', mediaWidth: 3.41, mediaHeight: 3.298109375, installationKind: 'buddhist-concept', accent: BUDDHIST_PALETTE.lapis}),
  layout({id: 'asanga-yogacara-transmission', parentExhibitId: 'vasubandhu', zoneId: 'buddhist-abhidharma-yogacara', position: {x: 5.55, z: 4.48}, rotationY: Math.PI, assetId: 'buddhist-asanga-kofukuji-statue', mediaWidth: 2.3925, mediaHeight: 3.3, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.saffron}),
  layout({id: 'buddhist-pramana-two-sources', parentExhibitId: 'buddhist-epistemology', zoneId: 'buddhist-pramana', position: {x: 5.55, z: 6.72}, rotationY: 0, assetId: 'buddhist-pramana-perception-inference-diagram', mediaWidth: 2.06765625, mediaHeight: 3.3, installationKind: 'buddhist-concept', accent: BUDDHIST_PALETTE.lapis}),
  layout({id: 'nalanda-scholastic-institution', parentExhibitId: 'dignaga', zoneId: 'buddhist-pramana', position: {x: -5.55, z: 15.68}, rotationY: Math.PI, assetId: 'buddhist-nalanda-scholastic-ruins', mediaWidth: 3.48, mediaHeight: 2.61, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.saffron}),
  layout({id: 'dharmakirti-pramanavarttika-reception', parentExhibitId: 'dharmakirti', zoneId: 'buddhist-pramana', position: {x: 5.55, z: 15.68}, rotationY: Math.PI, assetId: 'dharmakirti-tibetan-woodblock-portrait', mediaWidth: 3.17625, mediaHeight: 3.3, installationKind: 'buddhist-work', accent: BUDDHIST_PALETTE.lotus}),
  layout({id: 'buddhist-xuanzang-translation', parentExhibitId: 'buddhist-philosophy', zoneId: 'buddhist-transmission-reserve', position: {x: -10.85, z: 22.4}, rotationY: Math.PI / 2, assetId: 'buddhist-xuanzang-statue', mediaWidth: 2.221734375, mediaHeight: 3.33, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.saffron}),
  layout({id: 'buddhist-tibetan-pecha', parentExhibitId: 'buddhist-philosophy', zoneId: 'buddhist-transmission-reserve', position: {x: 10.85, z: 22.4}, rotationY: -Math.PI / 2, assetId: 'buddhist-tibetan-pecha', mediaWidth: 3.58, mediaHeight: 1.07959375, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.lapis}),
  layout({id: 'buddhist-diamond-sutra', parentExhibitId: 'buddhist-philosophy', zoneId: 'buddhist-transmission-reserve', position: {x: -5.55, z: 27.38}, rotationY: Math.PI, assetId: 'buddhist-diamond-sutra-868', mediaWidth: 3.32, mediaHeight: 1.9971875, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.lotus}),
  layout({id: 'kumarajiva-madhyamaka-translation', parentExhibitId: 'buddhist-philosophy', zoneId: 'buddhist-transmission-reserve', position: {x: -5.55, z: 17.92}, rotationY: 0, assetId: 'buddhist-kumarajiva-translation-relief', mediaWidth: 3.4797441365, mediaHeight: 2.55, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.lotus}),
  layout({id: 'tripitaka-koreana-printing-canon', parentExhibitId: 'buddhist-philosophy', zoneId: 'buddhist-transmission-reserve', position: {x: 5.55, z: 17.92}, rotationY: 0, assetId: 'buddhist-tripitaka-koreana-blocks', mediaWidth: 3.4739526412, mediaHeight: 2.98, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.saffron}),
  layout({id: 'pali-kammavaca-southeast-asia', parentExhibitId: 'buddhist-philosophy', zoneId: 'buddhist-transmission-reserve', position: {x: 5.55, z: 27.38}, rotationY: Math.PI, assetId: 'buddhist-burmese-kammavaca', mediaWidth: 3.4174757282, mediaHeight: 3.3, installationKind: 'buddhist-context', accent: BUDDHIST_PALETTE.jade}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getBuddhistSupplementalExhibit = (id: MuseumSupplementalExhibitId): MuseumSupplementalExhibit => {
  const record = BUDDHIST_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 08 supplemental exhibit ${id} is missing.`);
  return record;
};
