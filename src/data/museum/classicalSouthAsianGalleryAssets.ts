import type {MuseumAssetRecord, MuseumAssetVariant} from './museumAssetTypes';

type GalleryAssetInput = Omit<MuseumAssetRecord, 'variants'> & {
  scene: readonly [number, number];
  panel: readonly [number, number];
};

const folder = 'classical-south-asian-worlds';
const derivativeNotice = 'Original image retained uncropped; resized and converted to WebP by Philosophy Atlas.';
const originalNotice = 'Original Philosophy Atlas Museum illustration retained uncropped, resized, and converted to WebP.';
const generatedSource = (id: string) =>
  `https://github.com/Da3dalusCode/philosophy-museum/blob/main/public/assets/museum/${folder}/${id}-panel.webp`;

const variant = (id: string, kind: 'scene' | 'panel', size: readonly [number, number]): MuseumAssetVariant => ({
  path: `assets/museum/${folder}/${id}-${kind}.webp`,
  width: size[0],
  height: size[1],
});

const asset = ({scene, panel, ...record}: GalleryAssetInput): MuseumAssetRecord => ({
  ...record,
  variants: {scene: variant(record.id, 'scene', scene), panel: variant(record.id, 'panel', panel)},
});

const publicDomain = {
  license: 'Public Domain Mark 1.0',
  licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  rightsKind: 'rights-status' as const,
};
const cc0 = {
  license: 'CC0 1.0',
  licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
  rightsKind: 'dedication' as const,
};
const licensed = (license: string, licenseUrl: string) => ({
  license,
  licenseUrl,
  rightsKind: 'license' as const,
});

export const CLASSICAL_SOUTH_ASIAN_GALLERY_ASSETS = [
  asset({
    id: 'south-many-schools-interpretive', entityKind: 'branch', entityId: 'indian-philosophy', role: 'context', mediaKind: 'drawing',
    title: 'Many schools, shared questions, unfinished routes', creator: 'Philosophy Atlas Museum with OpenAI ImageGen', objectDate: '2026', institution: 'Philosophy Atlas Museum',
    sourcePageUrl: generatedSource('south-many-schools-interpretive'), license: 'Original Philosophy Atlas Museum interpretive illustration', rightsKind: 'rights-status',
    attribution: 'Original interpretive illustration created for Philosophy Atlas Museum with OpenAI ImageGen, 2026.', derivativeNotice: originalNotice,
    scene: [427, 640], panel: [853, 1280],
    alt: 'A dark museum collage of divergent pathways, manuscript leaves, debate circles, and one visibly unfinished route.',
    caption: 'An interpretive orientation image makes plurality—and the gallery’s omissions—visible.',
    historicalNote: 'A contemporary conceptual aid, not a map of South Asia, a sacred diagram, or a claim that distinct traditions form one system.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'jain-lokapurusha-cosmology', entityKind: 'branch', entityId: 'jainism', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Lokapuruṣa, the Jain cosmic person', creator: 'Unknown Jain artist', objectDate: 'c. 16th century', institution: 'Wikimedia Commons source record',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Lokapurusha_Cosmic_man.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Unknown Jain artist, Lokapuruṣa cosmic diagram, c. 16th century. Public domain.',
    scene: [284, 640], panel: [569, 1280],
    alt: 'Tall painted Jain cosmological diagram arranging realms of the universe within a stylized standing human form.',
    caption: 'A Jain Lokapuruṣa diagram visualizes the inhabited cosmos and the soul’s possible conditions.',
    historicalNote: 'A later manuscript diagram within a diverse cosmological tradition; it is not a portrait, anatomical chart, or complete statement of Jain philosophy.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'mahavira-chandigarh-bust', entityKind: 'philosopher', entityId: 'mahavira', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Bust identified as Mahāvīra', creator: 'Ancient sculptor unknown; photograph by Rahul123jain', objectDate: 'Sculpture date not recorded on the file page; photographed 2019', institution: 'Government Museum and Art Gallery, Chandigarh',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Bust_of_Mahavira.jpg', ...cc0, derivativeNotice,
    attribution: 'Rahul123jain, photograph of a bust identified as Mahāvīra, Government Museum and Art Gallery, Chandigarh, CC0.',
    scene: [427, 640], panel: [853, 1280],
    alt: 'Stone bust identified as Mahavira displayed frontally in a museum case.',
    caption: 'A museum sculpture identified as Mahāvīra, photographed in Chandigarh.',
    historicalNote: 'A devotional or commemorative representation rather than a documented likeness. Mahāvīra’s traditional dates and the sculpture’s date require separate treatment.',
    likenessStatus: 'later-traditional-representation',
  }),
  asset({
    id: 'kanada-vaisesika-sutra-1793', entityKind: 'philosopher', entityId: 'kanada', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Vaiśeṣika Sūtra manuscript attributed to Kaṇāda', creator: 'Unknown Devanagari copyist; text traditionally attributed to Kaṇāda', objectDate: '1793 manuscript', institution: 'Asiatic Society of Mumbai, MS 00001057',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:%E0%A4%B5%E0%A5%88%E0%A4%B6%E0%A5%87%E0%A4%B7%E0%A4%BF%E0%A4%95%E0%A4%B8%E0%A5%82%E0%A4%A4%E0%A5%8D%E0%A4%B0_of_%E0%A4%95%E0%A4%A3%E0%A4%BE%E0%A4%A6._(IA_dli.granth.17191).pdf', ...publicDomain, derivativeNotice,
    attribution: 'Asiatic Society of Mumbai, Vaiśeṣika Sūtra manuscript, 1793. Public domain.',
    scene: [640, 546], panel: [960, 819],
    alt: 'Horizontal manuscript folio densely written in Devanagari with a central binding space.',
    caption: 'A 1793 manuscript witness to the Vaiśeṣika Sūtra tradition attributed to Kaṇāda.',
    historicalNote: 'This late copy is neither an autograph nor evidence for Kaṇāda’s precise dates. The text is traditionally attributed to a figure whose chronology is highly uncertain.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'vedanta-telugu-manuscript', entityKind: 'branch', entityId: 'vedanta', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Vedānta manuscript in Telugu script', creator: 'Unknown South Indian copyist; photograph by Ms Sarah Welch', objectDate: '18th century', institution: 'Andhra Pradesh manuscript collection documented on Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:18th-century_Vedanta_manuscript,_Sanskrit,_Telugu_script,_Andhra_Pradesh.jpg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'), derivativeNotice,
    attribution: 'Ms Sarah Welch, photograph of an 18th-century Sanskrit Vedānta manuscript in Telugu script, CC BY-SA 4.0.',
    scene: [640, 180], panel: [1280, 354],
    alt: 'Long horizontal palm-leaf manuscript densely written in Telugu script.',
    caption: 'An 18th-century Sanskrit Vedānta manuscript written in Telugu script.',
    historicalNote: 'One material witness from a multilingual, multi-regional commentary tradition; it does not represent a single unified Vedānta doctrine.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'shankara-ravi-varma', entityKind: 'philosopher', entityId: 'shankara', role: 'identity', mediaKind: 'painting',
    title: 'Śaṅkara with disciples', creator: 'Raja Ravi Varma', objectDate: 'c. 1904', institution: 'Later oleograph reproduction',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Adi_shankaracharya.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Raja Ravi Varma, Śaṅkara with disciples, c. 1904. Public domain.',
    scene: [454, 640], panel: [907, 1280],
    alt: 'Raja Ravi Varma’s later painting of Shankara teaching several seated disciples beside water and trees.',
    caption: 'Raja Ravi Varma’s early twentieth-century reception image of Śaṅkara teaching.',
    historicalNote: 'Made roughly a millennium after Śaṅkara, this is an influential modern devotional image, not a historical likeness.',
    likenessStatus: 'later-traditional-representation',
  }),
  asset({
    id: 'ramanuja-statue-cc0', entityKind: 'philosopher', entityId: 'ramanuja', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Traditional image of Rāmānuja', creator: 'Sculptor unknown; photograph by Pakideadithya', objectDate: 'Photographed 2018; sculpture date not recorded', institution: 'Location not identified on the Commons file page',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Ramanuja.jpg', ...cc0, derivativeNotice,
    attribution: 'Pakideadithya, photograph of a traditional image of Rāmānuja, CC0.',
    scene: [613, 640], panel: [716, 747],
    alt: 'Black-and-white photograph of a seated traditional statue of Ramanuja with hands joined.',
    caption: 'A traditional sculptural representation of Rāmānuja.',
    historicalNote: 'A devotional representation, not a securely dated lifetime likeness; the file page does not document the sculpture’s maker, date, or location.',
    likenessStatus: 'later-traditional-representation',
  }),
  asset({
    id: 'madhva-pajaka-vigraha', entityKind: 'philosopher', entityId: 'madhva', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Madhvācārya image at Pajaka', creator: 'Traditional image associated with Vādirāja Tīrtha; photograph by AR767', objectDate: 'Historical sculpture; photographed 2023', institution: 'Pajaka Kṣetra, Udupi district',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Shri_Madhvacharya_Vigraha,_Pajaka,_Udupi.jpg', ...cc0, derivativeNotice,
    attribution: 'AR767, photograph of the Madhvācārya image at Pajaka, CC0.',
    scene: [497, 533], panel: [497, 533],
    alt: 'Dark stone devotional image of Madhva seated in a silver architectural shrine at Pajaka.',
    caption: 'A traditional image of Madhva at his associated birthplace, Pajaka.',
    historicalNote: 'A devotional object linked to Madhva’s institutional reception, not a documentary portrait or direct evidence for his appearance.',
    likenessStatus: 'later-traditional-representation',
  }),
  asset({
    id: 'south-sarva-darsana-1908', entityKind: 'branch', entityId: 'indian-philosophy', role: 'material-history', mediaKind: 'book-page',
    title: 'The Sarva-darśana-saṃgraha, English edition', creator: 'Attributed to Mādhava; translated by E. B. Cowell and A. E. Gough', objectDate: '1908 edition', institution: 'Internet Archive / California Digital Library scan',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:The_Sarva-darsana-samgraha;_or,_Review_of_the_different_systems_of_Hindu_philosophy_(IA_sarvadarsanasamg00madhrich).pdf', ...publicDomain, derivativeNotice,
    attribution: 'Mādhava, The Sarva-darśana-saṃgraha, Cowell and Gough translation, 1908 edition. Public domain.',
    scene: [419, 640], panel: [500, 763],
    alt: 'Plain brown cloth cover of a 1908 edition of The Sarva-darsana-samgraha.',
    caption: 'A 1908 translation of a medieval compendium that organizes rival philosophical systems.',
    historicalNote: 'The compendium is a historically situated and often polemical ordering of schools, not a neutral census of every South Asian tradition.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'south-upanishad-sama-veda-manuscript', entityKind: 'branch', entityId: 'indian-philosophy', role: 'material-history', mediaKind: 'manuscript',
    title: 'Upaniṣad embedded in a Sāma Veda manuscript', creator: 'Unknown copyist; photograph by Ms Sarah Welch', objectDate: 'c. 1800–1850 manuscript', institution: 'Hindu monastery collection, Thrissur, Kerala',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:An_Upanishad_embedded_in_Sama_Veda,_Sanskrit_manuscript_in_Thrissur_Hindu_monastery,_Malayalam_script_-_1.jpg', ...cc0, derivativeNotice,
    attribution: 'Ms Sarah Welch, photograph of a Sanskrit Sāma Veda manuscript with an Upaniṣad in Malayalam script, CC0.',
    scene: [640, 180], panel: [1280, 303],
    alt: 'Long palm-leaf manuscript strip written in Malayalam script with red guide marks.',
    caption: 'A nineteenth-century manuscript witness to an Upaniṣad embedded in Sāma Veda transmission.',
    historicalNote: 'The manuscript’s material history is much later than the text it transmits and should not be treated as an authorial original.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'mahavira-kalpasutra-birth', entityKind: 'philosopher', entityId: 'mahavira', role: 'material-history', mediaKind: 'manuscript',
    title: 'The birth of Mahāvīra, page from a Kalpa-sūtra', creator: 'Unknown Jain artist in Gujarat', objectDate: 'Early 16th century', institution: 'Cleveland Museum of Art, 1925.1340',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Jain,_Western_India,_Gujarat,_early_16th_century_-_Page_from_a_Kalpa-sutra-_The_Birth_of_Mahavira_-_1925.1340_-_Cleveland_Museum_of_Art.jpg',
    objectPageUrl: 'https://www.clevelandart.org/art/1925.1340', ...cc0, derivativeNotice,
    attribution: 'Cleveland Museum of Art, Page from a Kalpa-sūtra: The Birth of Mahāvīra, early 16th century, CC0.',
    scene: [502, 640], panel: [1004, 1280],
    alt: 'Illuminated Jain manuscript page with red, blue, gold, and dense text surrounding a birth scene.',
    caption: 'An early sixteenth-century Kalpa-sūtra page narrating the birth of Mahāvīra.',
    historicalNote: 'A richly developed later manuscript tradition, not a contemporary record of Mahāvīra’s life.',
    likenessStatus: 'later-traditional-representation',
  }),
  asset({
    id: 'kanada-atomic-theory-illustration', entityKind: 'philosopher', entityId: 'kanada', role: 'context', mediaKind: 'drawing',
    title: 'Modern illustration of Vaiśeṣika atomic combinations', creator: 'Xaetherion', objectDate: '2026', institution: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Illustration_of_the_atomic_theory_of_Acharya_Kanada_showing_Param%C4%81%E1%B9%87u,_Dvya%E1%B9%87uka,_and_Trya%E1%B9%87uka_concepts_from_the_Vaisheshika_philosophy..jpg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'), derivativeNotice,
    attribution: 'Xaetherion, illustration of Vaiśeṣika atomic combinations, 2026, CC BY-SA 4.0.',
    scene: [640, 375], panel: [1280, 749],
    alt: 'Contemporary postage-stamp-style illustration of Kaṇāda with labeled circles for atom, dyad, and triad.',
    caption: 'A contemporary educational graphic distinguishes atom, dyad, and triad concepts.',
    historicalNote: 'A modern explanatory illustration, not an ancient diagram, portrait, or literal scientific model.',
    likenessStatus: 'imagined',
  }),
  asset({
    id: 'vaiseshika-two-pramana', entityKind: 'philosopher', entityId: 'kanada', role: 'context', mediaKind: 'drawing',
    title: 'Two means of knowledge in Vaiśeṣika', creator: 'Ms Sarah Welch', objectDate: '2016', institution: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:2_Pramana_Epistemology_Vaisheshika_Hindu_school.svg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'), derivativeNotice,
    attribution: 'Ms Sarah Welch, Two Pramāṇas in Vaiśeṣika Epistemology, 2016, CC BY-SA 4.0.',
    scene: [401, 640], panel: [802, 1280],
    alt: 'Simple diagram linking perception and inference to knowledge in the Vaiśeṣika school.',
    caption: 'A modern diagram summarizes perception and inference as Vaiśeṣika means of knowledge.',
    historicalNote: 'A teaching aid that compresses contested historical developments; it should not replace primary texts or imply that every Vaiśeṣika author held an identical list.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'samkhya-yoga-three-pramana', entityKind: 'philosopher', entityId: 'patanjali', role: 'context', mediaKind: 'drawing',
    title: 'Three means of knowledge in Sāṃkhya and Yoga', creator: 'Ms Sarah Welch', objectDate: '2016; updated 2020', institution: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:3_Pramana_Epistemology_Samkhya_Yoga_Hindu_schools.svg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'), derivativeNotice,
    attribution: 'Ms Sarah Welch, Three Pramāṇas in Sāṃkhya and Yoga Epistemology, CC BY-SA 4.0.',
    scene: [401, 640], panel: [802, 1280],
    alt: 'Diagram linking perception, inference, and reliable testimony to knowledge in Sāṃkhya and Yoga.',
    caption: 'A modern diagram summarizes three recognized means of knowledge in Sāṃkhya-Yoga traditions.',
    historicalNote: 'A comparative teaching aid, not a historical manuscript; the visual similarity to the Vaiśeṣika diagram marks a shared modern explanatory series, not identical doctrines.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'shankara-aitareya-bhasya-1593', entityKind: 'philosopher', entityId: 'shankara', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Śaṅkara’s commentary on the Aitareya Upaniṣad', creator: 'Unknown Sanskrit copyist; photograph by Ms Sarah Welch', objectDate: '1593 manuscript', institution: 'Varanasi Jain temple bhandara, Cambridge University Library MS Add.2092',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:1593_CE,_Adi_Shankara_bhasya_Aitareya_Upanishad,_Varanasi_Jain_temple_bhandara,_Sanskrit,_Devanagari,_MS_Add.2092.jpg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'), derivativeNotice,
    attribution: 'Ms Sarah Welch, photograph of a 1593 manuscript of Śaṅkara’s Aitareya Upaniṣad bhāṣya, CC BY-SA 4.0.',
    scene: [640, 258], panel: [1280, 516],
    alt: 'Long cream manuscript leaf densely written in Devanagari with a blank central binding space.',
    caption: 'A 1593 manuscript transmitting Śaṅkara’s commentary on the Aitareya Upaniṣad.',
    historicalNote: 'A manuscript copied centuries after Śaṅkara; it transmits his commentary tradition but is not an autograph.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'madhva-udupi-krishna-matha', entityKind: 'philosopher', entityId: 'madhva', role: 'material-history', mediaKind: 'photograph',
    title: 'Śrī Kṛṣṇa Maṭha at Udupi', creator: 'Photograph by Syam', objectDate: 'Photographed 2008', institution: 'Udupi, Karnataka',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Madhvacharya_Krishna_Matha_Udupi_Karnataka.jpg', ...licensed('CC BY 2.0', 'https://creativecommons.org/licenses/by/2.0/'), derivativeNotice,
    attribution: 'Syam, Śrī Kṛṣṇa Maṭha at Udupi, 2008, CC BY 2.0.',
    scene: [640, 480], panel: [1280, 960],
    alt: 'Color photograph looking upward at the ornamented temple tower of the Krishna Matha in Udupi.',
    caption: 'The Udupi Kṛṣṇa Maṭha anchors the institutional afterlife of Madhva’s Dvaita tradition.',
    historicalNote: 'A photograph of a living religious institution and later built fabric, not a visual diagram of Dvaita or a surviving thirteenth-century view.',
    likenessStatus: 'not-applicable',
  }),
] as const satisfies readonly MuseumAssetRecord[];
