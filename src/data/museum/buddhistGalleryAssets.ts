import type {MuseumAssetRecord, MuseumAssetVariant} from './museumAssetTypes';

type GalleryAssetInput = Omit<MuseumAssetRecord, 'variants'> & {
  scene: readonly [number, number];
  panel: readonly [number, number];
};

const folder = 'buddhist-philosophies';
const derivativeNotice = 'Original image retained uncropped; resized and converted to WebP by Philosophy Atlas.';
const variant = (id: string, kind: 'scene' | 'panel', size: readonly [number, number]): MuseumAssetVariant => ({
  path: `assets/museum/${folder}/${id}-${kind}.webp`, width: size[0], height: size[1],
});
const asset = ({scene, panel, ...record}: GalleryAssetInput): MuseumAssetRecord => ({
  ...record, variants: {scene: variant(record.id, 'scene', scene), panel: variant(record.id, 'panel', panel)},
});
const publicDomain = {license: 'Public Domain Mark 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/', rightsKind: 'rights-status' as const};
const cc0 = {license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/', rightsKind: 'dedication' as const};
const licensed = (license: string, licenseUrl: string) => ({license, licenseUrl, rightsKind: 'license' as const});

export const BUDDHIST_GALLERY_ASSETS = [
  asset({
    id: 'buddhist-wheel-life-dazu', entityKind: 'branch', entityId: 'buddhist-philosophy', role: 'context', mediaKind: 'photograph',
    title: 'Buddhist Wheel of Life at Baodingshan', creator: 'Historic carvers unknown; photograph by Laurent Bélanger', objectDate: 'Southern Song dynasty, 1174–1252; photographed 2010', institution: 'Dazu Rock Carvings, Chongqing',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Buddhist_Wheel_of_Life.jpg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'), derivativeNotice,
    attribution: 'Laurent Bélanger, photograph of the Buddhist Wheel of Life at Baodingshan, 2010, CC BY-SA 4.0.', scene: [640, 480], panel: [1280, 960],
    alt: 'A large stone Wheel of Life held by a fierce figure at the Dazu rock-carving complex.', caption: 'The Baodingshan Wheel of Life gives visual form to impermanence, karma, realms of rebirth, and release.',
    historicalNote: 'A Southern Song Chinese Buddhist monument made many centuries after the Buddha; it represents one influential visual tradition rather than all Buddhist philosophy.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'buddha-gandhara-meditating', entityKind: 'philosopher', entityId: 'buddha', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Meditating Buddha from Gandhara', creator: 'Ancient sculptor unknown; photograph by Ethan Doyle White', objectDate: 'Kushan period, c. 200–400 CE; photographed 2017', institution: 'Victoria and Albert Museum, IS.108-2001',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Meditating_Buddha_Statue_from_Gandhara.JPG', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'), derivativeNotice,
    attribution: 'Ethan Doyle White, photograph of a Gandharan meditating Buddha, Victoria and Albert Museum, CC BY-SA 4.0.', scene: [421, 640], panel: [843, 1280],
    alt: 'A gray Gandharan stone Buddha sits in meditation with hands folded and a halo behind the head.', caption: 'A Gandharan Buddha image from the Kushan period, created centuries after the historical teacher.',
    historicalNote: 'A later devotional representation, not a portrait from life. The Buddha’s chronology is disputed and should not be inferred from this object.', likenessStatus: 'later-traditional-representation',
  }),
  asset({
    id: 'nagarjuna-sichuan-thangka', entityKind: 'philosopher', entityId: 'nagarjuna', role: 'identity', mediaKind: 'painting',
    title: 'Tibetan thangka of Nāgārjuna', creator: 'Tibetan artist unknown; photograph by Daderot', objectDate: '1644–1911; photographed 2015', institution: 'Sichuan Museum, Chengdu',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Nagarjuna,_Tibet,_1644-1911_AD_-_Sichuan_Provincial_Museum_-_Chengdu,_China_-_DSC04486.jpg', ...cc0, derivativeNotice,
    attribution: 'Daderot, photograph of a Tibetan thangka of Nāgārjuna in the Sichuan Museum, CC0.', scene: [467, 640], panel: [935, 1280],
    alt: 'A richly colored Tibetan thangka shows Nagarjuna seated above water, protected by serpents and receiving sutras from nagas.', caption: 'A much later Tibetan image of Nāgārjuna surrounded by nāga imagery and manuscript transmission.',
    historicalNote: 'The thangka belongs to Nāgārjuna’s later Tibetan reception and legendary biography; it is not a lifetime likeness.', likenessStatus: 'later-traditional-representation',
  }),
  asset({
    id: 'buddhist-monastic-debate', entityKind: 'branch', entityId: 'buddhist-epistemology', role: 'context', mediaKind: 'photograph',
    title: 'Monastic debate at Sera Monastery', creator: 'Antoine Taveneaux', objectDate: '3 August 2008', institution: 'Sera Monastery, Lhasa',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Tibetan_buddhist_monk_during_monastic_debate_making_hand_gesture_at_Sera_Monastery,_Lhasa,_Tibet_on_3_August_2008_(cropped).jpg', ...licensed('CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'), derivativeNotice,
    attribution: 'Antoine Taveneaux, Tibetan Buddhist monk during monastic debate at Sera Monastery, 3 August 2008, CC BY-SA 3.0.', scene: [640, 577], panel: [1280, 1154],
    alt: 'A Tibetan Buddhist monk makes the emphatic hand gesture used during monastic debate at Sera Monastery.', caption: 'Monastic debate turns claims, reasons, and objections into a disciplined public practice.',
    historicalNote: 'The photograph documents a later Tibetan scholastic practice rather than the Indian setting of Dignāga or Dharmakīrti; it visualizes the continuing institutional life of Buddhist reasoning.', likenessStatus: 'not-applicable', focalPoint: {x: .52, y: .43},
  }),
  asset({
    id: 'dignaga-teaching-logic-relief', entityKind: 'philosopher', entityId: 'dignaga', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Dignāga teaching Buddhist logic', creator: 'Contemporary relief artist unknown; photograph by Anandajoti Bhikkhu', objectDate: 'Modern relief; photographed 2024', institution: 'Buddhavanam stupa drum, Telangana',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:218_Dignaga_Teaching_Buddhist_Logic.jpg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'), derivativeNotice,
    attribution: 'Anandajoti Bhikkhu, photograph of the Buddhavanam relief Dignāga Teaching Buddhist Logic, 2024, CC BY-SA 4.0.', scene: [640, 451], panel: [1280, 902],
    alt: 'A pale stone relief presents Dignaga seated in a teaching scene with attendants.', caption: 'A contemporary commemorative relief identifies Dignāga through the act of teaching logic.',
    historicalNote: 'A modern public monument, not a historical likeness or evidence for Dignāga’s physical appearance.', likenessStatus: 'later-traditional-representation',
  }),
  asset({
    id: 'dharmakirti-cleveland-silver', entityKind: 'philosopher', entityId: 'dharmakirti', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Portrait of Dharmakīrti', creator: 'Tibetan artist unknown; Cleveland Museum of Art open-access image', objectDate: 'c. 15th–16th century', institution: 'Cleveland Museum of Art, 2010.474',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Tibet,_c._15th-16th_century_-_Portrait_of_Dharmakirti_-_2010.474_-_Cleveland_Museum_of_Art.tif', objectPageUrl: 'https://www.clevelandart.org/art/2010.474', ...cc0, derivativeNotice,
    attribution: 'Cleveland Museum of Art, Portrait of Dharmakīrti, Tibet, c. 15th–16th century, CC0.', scene: [562, 640], panel: [1125, 1280],
    alt: 'A small silver-copper Tibetan sculpture portrays Dharmakirti seated on a lotus pedestal.', caption: 'A Tibetan silver portrait of Dharmakīrti made roughly eight centuries after his lifetime.',
    historicalNote: 'A later traditional representation, not a documentary portrait; its date belongs to Tibetan reception rather than Dharmakīrti’s chronology.', likenessStatus: 'later-traditional-representation',
  }),
  asset({
    id: 'buddhist-gandhara-birchbark', entityKind: 'branch', entityId: 'buddhist-philosophy', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Gandhāran Buddhist birch-bark scroll fragments', creator: 'Ancient Kharoṣṭhī copyists unknown; British Library digitization', objectDate: 'First half of the 1st century CE', institution: 'British Library, Or. 14915, part 31',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Fragmentary_Buddhist_text_-_Gandhara_birchbark_scrolls_(1st_C),_part_31_-_BL_Or._14915.jpg', ...cc0, derivativeNotice,
    attribution: 'British Library, Gandhāran Buddhist birch-bark scroll fragments, Or. 14915 part 31, CC0.', scene: [640, 427], panel: [1280, 853],
    alt: 'Dark, fragile birch-bark manuscript fragments covered with narrow lines of Kharoṣṭhī writing.', caption: 'First-century Gandhāran scroll fragments make the material fragility of early Buddhist textual transmission visible.',
    historicalNote: 'A fragmentary textual witness, not an autograph of the Buddha or proof of one original canon; early discourses survive through layered communal transmission.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'buddhist-prajnaparamita-walters', entityKind: 'philosopher', entityId: 'nagarjuna', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Buddha Śākyamuni and Prajñāpāramitā manuscript leaf', creator: 'Tibetan artist and copyist unknown', objectDate: '13th century', institution: 'Walters Art Museum, W.856.1',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Tibetan_-_Buddha_Shakyamuni_and_Prajnaparamita_-_Walters_W8561_(2).jpg', ...publicDomain, derivativeNotice,
    attribution: 'Walters Art Museum, Buddha Śākyamuni and Prajñāpāramitā manuscript leaf, 13th century. Public domain.', scene: [640, 209], panel: [1280, 417],
    alt: 'A long Tibetan manuscript leaf combines dense writing with painted figures of Shakyamuni and Prajnaparamita.', caption: 'A thirteenth-century Tibetan Prajñāpāramitā leaf joins philosophical text, devotion, and image.',
    historicalNote: 'The manuscript postdates Nāgārjuna by about a millennium and witnesses later transmission; it is not his work or autograph.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'buddhist-dependent-arising-wheel', entityKind: 'philosopher', entityId: 'nagarjuna', role: 'context', mediaKind: 'photograph',
    title: 'Bhavacakra and the links of dependent arising', creator: 'Contemporary painters unknown; photograph by Ms Sarah Welch', objectDate: 'Modern educational mural; photographed 2019', institution: 'Dhamma Nagajjuna, Nagarjuna Sagar, Telangana',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Bhavachakra_Samsara,_Buddhist_Wheel_of_Life,_Dhamma_Nagajjuna,_Nagarjuna_Sagar_Telangana,_India.jpg', ...cc0, derivativeNotice,
    attribution: 'Ms Sarah Welch, photograph of a bhavacakra mural at Dhamma Nagajjuna, 2019, CC0.', scene: [543, 640], panel: [1085, 1280],
    alt: 'A colorful circular Buddhist mural layers realms, figures, and episodes around a central wheel.', caption: 'A modern bhavacakra mural visualizes dependent origination, karma, rebirth, and release.',
    historicalNote: 'A contemporary teaching image, not Nāgārjuna’s own diagram; Madhyamaka’s philosophical use of dependent arising cannot be reduced to this iconography.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'vasubandhu-mere-ideation', entityKind: 'philosopher', entityId: 'vasubandhu', role: 'primary-source', mediaKind: 'manuscript',
    title: 'The Completion of Mere Ideation', creator: 'Text attributed to Vasubandhu; Tibetan printers unknown', objectDate: 'Tibetan xylograph edition; date not stated on the Commons record', institution: 'World Digital Library / Library of Congress',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:The_Completion_of_Mere_Ideation_WDL11843.jpg', ...publicDomain, derivativeNotice,
    attribution: 'World Digital Library, Tibetan xylograph of Vasubandhu’s Completion of Mere Ideation. Public domain.', scene: [640, 180], panel: [1280, 299],
    alt: 'A long horizontal Tibetan printed leaf with dense black text and a red title block.', caption: 'A Tibetan xylograph witnesses the long transmission of a text attributed to Vasubandhu.',
    historicalNote: 'A later printed witness, not Vasubandhu’s autograph; “mere ideation” should not be treated as a simple claim that nothing exists.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'buddhist-xuanzang-statue', entityKind: 'branch', entityId: 'buddhist-philosophy', role: 'material-history', mediaKind: 'sculpture-photograph',
    title: 'Modern bronze statue of Xuanzang', creator: 'Modern sculptor unknown; photograph by David Castor', objectDate: 'Modern statue; photographed 2010', institution: 'Giant Wild Goose Pagoda, Xi’an',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Xuanzang.jpg', ...publicDomain, derivativeNotice,
    attribution: 'David Castor, photograph of the Xuanzang statue at the Giant Wild Goose Pagoda, released to the public domain.', scene: [427, 640], panel: [853, 1280],
    alt: 'A bronze statue of Xuanzang stands indoors in monastic robes holding a manuscript roll.', caption: 'A modern monument to Xuanzang foregrounds translation, travel, and the institutional movement of Buddhist texts.',
    historicalNote: 'A modern commemorative statue, not a Tang-period portrait. Xuanzang is presented here as a translator and transmitter, not as a primary philosopher in the gallery roster.', likenessStatus: 'later-traditional-representation',
  }),
  asset({
    id: 'buddhist-tibetan-pecha', entityKind: 'branch', entityId: 'buddhist-philosophy', role: 'material-history', mediaKind: 'manuscript',
    title: 'Tibetan Buddhist manuscript cover', creator: 'Tibetan artist unknown; Walters Art Museum photograph', objectDate: 'c. 13th–14th century', institution: 'Walters Art Museum, W.896',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Tibetan_-_Cover_of_a_Buddhist_Manuscript_-_Walters_W896_-_Top_(cropped).jpg', ...licensed('CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'), derivativeNotice,
    attribution: 'Walters Art Museum, Tibetan Buddhist manuscript cover, W.896, photograph CC BY-SA 3.0; object public domain.', scene: [640, 193], panel: [1280, 385],
    alt: 'A long painted Tibetan manuscript cover frames a central Buddha with attendants in red, blue, gold, and green.', caption: 'A Tibetan manuscript cover shows how translated texts acquired new material, ritual, and artistic lives.',
    historicalNote: 'A cover from a later Tibetan manuscript tradition; it represents transmission and use rather than one universal Buddhist canon.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'buddhist-diamond-sutra-868', entityKind: 'branch', entityId: 'buddhist-philosophy', role: 'material-history', mediaKind: 'book-page',
    title: 'Diamond Sūtra frontispiece and text', creator: 'Printed for Wang Jie; workshop otherwise unknown', objectDate: '11 May 868 CE', institution: 'British Library, Or. 8210/P.2',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Diamond_Sutra_of_868_AD_-_The_Diamond_Sutra_(868),_frontispiece_and_text_-_BL_Or._8210-P.2.jpg', ...cc0, derivativeNotice,
    attribution: 'British Library, Diamond Sūtra frontispiece and text, Or. 8210/P.2, dated 868 CE, CC0.', scene: [640, 385], panel: [1280, 770],
    alt: 'A dated Chinese woodblock print combines a teaching scene with vertical columns of text.', caption: 'The 868 Diamond Sūtra makes translation, printing, patronage, and public circulation visible in one surviving object.',
    historicalNote: 'A Chinese printed translation from Dunhuang, not an Indian original or a complete map of East Asian Buddhist traditions.', likenessStatus: 'not-applicable',
  }),
] as const satisfies readonly MuseumAssetRecord[];
