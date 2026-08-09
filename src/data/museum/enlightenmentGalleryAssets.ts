import type {
  MuseumAssetRecord,
  MuseumAssetVariant,
  MuseumVisualCharacter,
} from './museumAssetTypes';

export type EnlightenmentGalleryAssetId =
  | 'enlightenment-montesquieu-versailles-portrait'
  | 'enlightenment-rousseau-ramsay-portrait'
  | 'enlightenment-smith-wedgwood-medallion'
  | 'enlightenment-astell-serious-proposal-1694'
  | 'enlightenment-wollstonecraft-heath-engraving'
  | 'enlightenment-kant-doebler-portrait'
  | 'enlightenment-persian-envoy-coypel'
  | 'enlightenment-delisle-world-map-1720'
  | 'enlightenment-house-commons-walpole'
  | 'enlightenment-hogarth-bench-1758'
  | 'enlightenment-wedgwood-abolition-medallion'
  | 'enlightenment-geneva-gardelle-view'
  | 'enlightenment-fragonard-swing'
  | 'enlightenment-chardin-schoolmistress'
  | 'enlightenment-thevenin-federation'
  | 'enlightenment-rousseau-botanizing'
  | 'enlightenment-greuze-punished-son'
  | 'enlightenment-encyclopedie-pinmaking'
  | 'enlightenment-vernet-bordeaux-harbor'
  | 'enlightenment-luny-hindostan'
  | 'enlightenment-sandby-iron-forge'
  | 'enlightenment-hogarth-marriage-settlement'
  | 'enlightenment-samuel-nine-muses'
  | 'enlightenment-duchesse-du-maine-astronomy-lesson'
  | 'enlightenment-womens-march-versailles'
  | 'enlightenment-kant-sublime-monk-sea';

/**
 * Integration must apply these seven renames to the current provisional ID
 * union and canonical references. IDs not listed here already match.
 */
export const ENLIGHTENMENT_GALLERY_ASSET_ID_RENAMES = Object.freeze({
  'enlightenment-montesquieu-versailles': 'enlightenment-montesquieu-versailles-portrait',
  'enlightenment-astell-serious-proposal': 'enlightenment-astell-serious-proposal-1694',
  'enlightenment-delisle-world-map': 'enlightenment-delisle-world-map-1720',
  'enlightenment-hogarth-bench': 'enlightenment-hogarth-bench-1758',
  'enlightenment-geneva-gardelle': 'enlightenment-geneva-gardelle-view',
  'enlightenment-pin-factory': 'enlightenment-encyclopedie-pinmaking',
  'enlightenment-samuel-muses': 'enlightenment-samuel-nine-muses',
} as const);

export type EnlightenmentGalleryAssetRecord = Omit<
  MuseumAssetRecord,
  'id' | 'variants' | 'visualCharacter'
> & {
  id: EnlightenmentGalleryAssetId;
  visualCharacter: MuseumVisualCharacter;
  variants: MuseumAssetRecord['variants'];
};

type GalleryAssetInput = Omit<EnlightenmentGalleryAssetRecord, 'variants'> & {
  folder: 'enlightenment-revolution-kant';
  scene: readonly [number, number];
  panel: readonly [number, number];
};

const variant = (
  folder: GalleryAssetInput['folder'],
  id: EnlightenmentGalleryAssetId,
  kind: 'scene' | 'panel',
  size: readonly [number, number],
): MuseumAssetVariant => ({
  path: `assets/museum/${folder}/${id}-${kind}.webp`,
  width: size[0],
  height: size[1],
});

const asset = ({
  id,
  folder,
  scene,
  panel,
  ...record
}: GalleryAssetInput): EnlightenmentGalleryAssetRecord => ({
  ...record,
  id,
  variants: {
    scene: variant(folder, id, 'scene', scene),
    panel: variant(folder, id, 'panel', panel),
  },
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
const derivativeNotice =
  'Original image retained uncropped; resized and converted to WebP by Philosophy Atlas.';

/**
 * Dimensions reflect the selected Commons originals and the 640 px scene /
 * 1280 px panel derivative convention. The preparation script refreshes and
 * locks these values before integration if a Commons source has changed.
 */
export const ENLIGHTENMENT_GALLERY_ASSETS = [
  asset({
    id: 'enlightenment-montesquieu-versailles-portrait',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'montesquieu',
    role: 'identity',
    mediaKind: 'painting',
    visualCharacter: 'portrait-or-figure',
    title: 'Portrait of Montesquieu',
    creator: 'Anonymous French painter, after the portrait medal by Jacques-Antoine Dassier',
    objectDate: 'c. 1753–1794',
    institution: 'Palace of Versailles, MV 2976',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Montesquieu_-_Versailles_MV_2976.png',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Anonymous French painter after Jacques-Antoine Dassier, Portrait of Montesquieu, Palace of Versailles, MV 2976. Public Domain Mark 1.0.',
    scene: [534, 640],
    panel: [1067, 1280],
    alt: 'Montesquieu appears in a powdered wig and blue-gray coat against a plain dark background.',
    caption:
      'A Versailles portrait derived from Jacques-Antoine Dassier’s 1753 portrait medal of Montesquieu.',
    historicalNote:
      'The Commons record dates the painting broadly and connects it to Dassier’s medal. Because the canvas is not documented as an independent sitting from life, it is presented as an attributed derivative likeness rather than eyewitness portrait evidence.',
    likenessStatus: 'attributed',
    focalPoint: {x: .5, y: .35},
  }),
  asset({
    id: 'enlightenment-rousseau-ramsay-portrait',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'rousseau',
    role: 'identity',
    mediaKind: 'painting',
    visualCharacter: 'portrait-or-figure',
    title: 'Jean-Jacques Rousseau',
    creator: 'Allan Ramsay',
    objectDate: '1766',
    institution: 'Scottish National Gallery',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Allan_Ramsay_-_Jean-Jacques_Rousseau_(1712_-_1778)_-_Google_Art_Project.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Allan Ramsay, Jean-Jacques Rousseau, 1766, Scottish National Gallery. Public Domain Mark 1.0.',
    scene: [524, 640],
    panel: [1048, 1280],
    alt: 'Rousseau wears a dark fur-trimmed cap and coat and turns toward the viewer.',
    caption: 'Allan Ramsay painted Rousseau during the philosopher’s stay in Britain in 1766.',
    historicalNote:
      'This is a portrait made during Rousseau’s lifetime. It documents an artistic encounter and recognizable public likeness, not an unmediated record of his character or mental state.',
    likenessStatus: 'lifetime-portrait',
    focalPoint: {x: .5, y: .35},
  }),
  asset({
    id: 'enlightenment-smith-wedgwood-medallion',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'adam-smith',
    role: 'identity',
    mediaKind: 'sculpture-photograph',
    visualCharacter: 'material-object',
    title: 'Portrait medallion of Adam Smith',
    creator: 'Wedgwood manufactory',
    objectDate: '1787; photograph 2016',
    imageCreator: 'Daderot',
    institution: 'Wedgwood Museum, Barlaston',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Adam_Smith,_1787_-_Wedgwood_Museum_-_Barlaston,_Stoke-on-Trent,_England_-_DSC09700.jpg',
    ...cc0,
    derivativeNotice,
    attribution:
      'Wedgwood, portrait medallion of Adam Smith, 1787, Wedgwood Museum; photograph by Daderot, CC0 1.0.',
    scene: [518, 640],
    panel: [1036, 1280],
    alt: 'A pale ceramic relief presents Adam Smith in profile within a dark oval mount.',
    caption: 'A Wedgwood portrait medallion made during Adam Smith’s lifetime.',
    historicalNote:
      'The object is dated 1787, three years before Smith’s death. The Commons file identifies it as Wedgwood; no unsupported attribution to James Tassie is made here.',
    likenessStatus: 'lifetime-portrait',
    focalPoint: {x: .5, y: .5},
  }),
  asset({
    id: 'enlightenment-astell-serious-proposal-1694',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'mary-astell',
    role: 'primary-source',
    mediaKind: 'book-page',
    visualCharacter: 'text-dominant',
    title: 'Title page of A Serious Proposal to the Ladies',
    creator: 'Mary Astell; printed for R. Wilkin',
    objectDate: '1694',
    institution: 'Public-domain scan; holding institution not identified on the current Commons file page',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:AstellProposal.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Mary Astell, A Serious Proposal to the Ladies, title page, 1694. Public Domain Mark 1.0.',
    scene: [356, 640],
    panel: [570, 1025],
    alt: 'The 1694 title page of Mary Astell’s A Serious Proposal to the Ladies is printed in black type.',
    caption:
      'Mary Astell’s anonymous 1694 proposal for women’s education—the gallery’s only text-dominant image.',
    historicalNote:
      'No securely authenticated portrait of Mary Astell is known. A primary-text witness is therefore more honest than assigning her an invented face. The Commons page’s embedded external-source endpoint is stale, so no holding institution is claimed.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-wollstonecraft-heath-engraving',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'wollstonecraft',
    role: 'identity',
    mediaKind: 'engraving',
    visualCharacter: 'portrait-or-figure',
    title: 'Mary Wollstonecraft',
    creator: 'James Heath, after John Opie',
    objectDate: 'c. 1797; published 1798',
    institution: 'Frontispiece to William Godwin’s Memoirs of the Author of A Vindication of the Rights of Woman',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Heath_and_Opie_-_Mary_Wollstonecraft,_1797.png',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'James Heath after John Opie, Mary Wollstonecraft, c. 1797, published 1798. Public Domain Mark 1.0.',
    scene: [479, 640],
    panel: [788, 1052],
    alt: 'An oval engraved portrait shows Mary Wollstonecraft in profile with loosely dressed hair.',
    caption:
      'James Heath’s engraving after John Opie’s lifetime portrait of Mary Wollstonecraft.',
    historicalNote:
      'Heath’s print derives from Opie’s portrait and appeared after Wollstonecraft’s death. It preserves a lifetime likeness through a later reproductive medium and must not be described as a separate sitting.',
    likenessStatus: 'posthumous-portrait',
    focalPoint: {x: .5, y: .42},
  }),
  asset({
    id: 'enlightenment-kant-doebler-portrait',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'kant',
    role: 'identity',
    mediaKind: 'painting',
    visualCharacter: 'portrait-or-figure',
    title: 'Portrait of Immanuel Kant',
    creator: 'Traditionally attributed to Gottlieb Döbler',
    objectDate: '1791',
    institution: 'Ostpreußisches Landesmuseum',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Kant_gemaelde_1.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Portrait of Immanuel Kant, 1791, traditionally attributed to Gottlieb Döbler, Ostpreußisches Landesmuseum. Public Domain Mark 1.0.',
    scene: [544, 640],
    panel: [1087, 1280],
    alt: 'Kant appears in a powdered wig, dark coat, and white cravat against a brown ground.',
    caption: 'A 1791 portrait of Kant traditionally attributed to Gottlieb Döbler.',
    historicalNote:
      'The sitter and lifetime date are established in the Commons record, while the painter attribution is traditional rather than certain. The caption preserves that qualification.',
    likenessStatus: 'attributed',
    focalPoint: {x: .5, y: .35},
  }),
  asset({
    id: 'enlightenment-persian-envoy-coypel',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'montesquieu',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'portrait-or-figure',
    title: 'Mohammad Reza Beg, Persian ambassador to France',
    creator: 'Antoine Coypel',
    objectDate: '18th century',
    institution: 'Private collection; Commons source cites a Sotheby’s catalog record',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Mohammed_Reza_Bey,_Persian_Ambassador_to_France,_during_the_reign_of_Louis_XIV_by_Antoine_Coypel.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Antoine Coypel, Mohammad Reza Beg, Persian ambassador to France, 18th century. Public Domain Mark 1.0.',
    scene: [521, 640],
    panel: [1042, 1280],
    alt: 'The Safavid envoy Mohammad Reza Beg stands in a richly patterned robe and turban.',
    caption:
      'Antoine Coypel’s portrait of the real Safavid envoy Mohammad Reza Beg—not a character from Persian Letters.',
    historicalNote:
      'Mohammad Reza Beg was a historical diplomat received in France. He must not be identified with Usbek or Rica, the fictional Persian correspondents created by Montesquieu.',
    likenessStatus: 'lifetime-portrait',
    focalPoint: {x: .5, y: .35},
  }),
  asset({
    id: 'enlightenment-delisle-world-map-1720',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'montesquieu',
    role: 'context',
    mediaKind: 'engraving',
    visualCharacter: 'map-or-diagram',
    title: 'Mappemonde à l’usage du Roy',
    creator: 'Guillaume Delisle',
    objectDate: '1720',
    institution: 'Public-domain cartographic print',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:1720_map_of_the_world_-_Mappemonde_a_l%27usage_du_Roy.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Guillaume Delisle, Mappemonde à l’usage du Roy, 1720. Public Domain Mark 1.0.',
    scene: [640, 436],
    panel: [1280, 872],
    alt: 'A two-hemisphere world map surrounds the mapped continents with French labels and decorative cartouches.',
    caption:
      'Guillaume Delisle’s 1720 world map materializes comparison while retaining a royal European viewpoint.',
    historicalNote:
      'The map is used as an artifact of geographic knowledge and its political framing, not as a neutral or complete description of the world.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-house-commons-walpole',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'montesquieu',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'artwork-or-social-scene',
    title: 'The House of Commons during Sir Robert Walpole’s administration',
    creator: 'Unknown artist, after William Hogarth',
    objectDate: 'Depicted administration, 1722–1742; painting date not stated on Commons record',
    institution: 'UK Parliamentary Art Collection, WOA 3067',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:William_Hogarth_(1697-1764)_(after)_-_The_House_of_Commons,_Sir_Robert_Walpole%27s_Administration_(1722%E2%80%931742)_-_WOA_3067_-_Parliamentary_Art_Collection.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Unknown artist after William Hogarth, The House of Commons during Sir Robert Walpole’s administration, UK Parliamentary Art Collection. Public Domain Mark 1.0.',
    scene: [501, 640],
    panel: [939, 1200],
    alt: 'Members crowd the chamber of the old House of Commons around the central table and Speaker’s chair.',
    caption: 'An image of the Commons during Walpole’s administration, catalogued as after Hogarth.',
    historicalNote:
      'The Parliamentary Art Collection catalogs the work as “after” Hogarth. The depicted period is not asserted as the canvas’s exact execution date, and the scene should not be mistaken for a neutral transcript of parliamentary practice.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-hogarth-bench-1758',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'montesquieu',
    role: 'context',
    mediaKind: 'engraving',
    visualCharacter: 'artwork-or-social-scene',
    title: 'The Bench',
    creator: 'William Hogarth',
    objectDate: '1758',
    institution: 'National Gallery of Art, Washington, 30450',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:William_Hogarth,_The_Bench,_1758,_NGA_30450.jpg',
    ...cc0,
    derivativeNotice,
    attribution:
      'William Hogarth, The Bench, 1758, National Gallery of Art, Washington, CC0 1.0.',
    scene: [431, 640],
    panel: [862, 1280],
    alt: 'Four judges in wigs sit compressed along a bench in Hogarth’s satirical study.',
    caption: 'Hogarth’s 1758 study redirects constitutional thought toward the people administering law.',
    historicalNote:
      'Hogarth composed a satirical artistic argument. The print is useful for institutional culture but is not statistical evidence that all English judges behaved alike.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-wedgwood-abolition-medallion',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'montesquieu',
    role: 'material-history',
    mediaKind: 'sculpture-photograph',
    visualCharacter: 'material-object',
    title: '“Am I Not a Man and a Brother?” abolition medallion',
    creator: 'Modeled by William Hackwood; manufactured by Wedgwood',
    objectDate: 'c. 1786; modern photograph',
    imageCreator: 'Daderot',
    institution: 'Brooklyn Museum',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Am_I_not_a_Man_and_a_Brother,_medallion_modelled_by_William_H._Hackwood,_Wedgwood,_Etruria,_England,_c._1786,_tinted_stoneware_-_Brooklyn_Museum_-_DSC09289_(cropped).JPG',
    ...cc0,
    derivativeNotice,
    attribution:
      'William Hackwood and Wedgwood, “Am I Not a Man and a Brother?” medallion, c. 1786, Brooklyn Museum; photograph by Daderot, CC0 1.0.',
    scene: [589, 640],
    panel: [612, 665],
    alt: 'An oval ceramic medallion shows a chained Black man kneeling beneath an abolitionist question.',
    caption: 'A portable abolition emblem whose humanitarian appeal also encodes supplication.',
    historicalNote:
      'The medallion opposed Atlantic slavery and circulated widely. Interpretation must hold its political force together with the unequal viewer–subject relation created by the kneeling figure.',
    likenessStatus: 'not-applicable',
    focalPoint: {x: .5, y: .5},
  }),
  asset({
    id: 'enlightenment-geneva-gardelle-view',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'rousseau',
    role: 'context',
    mediaKind: 'engraving',
    visualCharacter: 'place-or-architecture',
    title: 'View of Geneva from the west',
    creator: 'Robert Gardelle',
    objectDate: 'c. 1720–1750',
    institution: 'Zentralbibliothek Zürich',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Zentralbibliothek_Z%C3%BCrich_-_Vue_de_Geneve_du_cot%C3%A9_du_Couchant_-_991081642359705501.jpg',
    ...publicDomain,
    derivativeNotice: 'Calibration target below the reproduction removed; the complete engraving and lettered key are retained, resized, and converted to WebP by Philosophy Atlas.',
    attribution:
      'Robert Gardelle, Vue de Genève du côté du Couchant, c. 1720–1750, Zentralbibliothek Zürich. Public Domain Mark 1.0.',
    scene: [640, 274],
    panel: [1280, 549],
    alt: 'A wide engraved prospect shows Geneva behind its walls with roads and figures in the foreground.',
    caption: 'The bounded city of Geneva gives Rousseau’s language of citizenship a material horizon.',
    historicalNote:
      'The view is a composed urban prospect. It can show walls, setting, and civic self-presentation but cannot reveal the different legal statuses of everyone living within and around the city.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-fragonard-swing',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'rousseau',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'artwork-or-social-scene',
    title: 'The Swing',
    creator: 'Jean-Honoré Fragonard',
    objectDate: 'c. 1767–1768',
    institution: 'Wallace Collection, London',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Fragonard,_The_Swing.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Jean-Honoré Fragonard, The Swing, c. 1767–1768, Wallace Collection. Public Domain Mark 1.0.',
    scene: [510, 640],
    panel: [1020, 1280],
    alt: 'A richly dressed woman swings through a luxuriant garden while two men watch from different positions.',
    caption: 'Fragonard’s elite spectacle supplies cultural context for recognition, luxury, and social appearance.',
    historicalNote:
      'The painting was not made to illustrate Rousseau and depicts no character from his work. Its use is comparative and contextual.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-chardin-schoolmistress',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'rousseau',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'artwork-or-social-scene',
    title: 'The Young Schoolmistress',
    creator: 'Jean Siméon Chardin',
    objectDate: 'c. 1736',
    institution: 'National Gallery, London',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Jean_Sim%C3%A9on_Chardin_-_The_Young_Schoolmistress_-_WGA04750FXD.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Jean Siméon Chardin, The Young Schoolmistress, c. 1736, National Gallery, London. Public Domain Mark 1.0.',
    scene: [640, 592],
    panel: [1280, 1184],
    alt: 'A young woman bends toward a child during a quiet domestic lesson.',
    caption: 'A domestic lesson offers period context for education without pretending to depict Émile or Sophie.',
    historicalNote:
      'The figures are unidentified and unrelated to Rousseau’s fictional pupils. The painting is used to situate education socially, not to document his pedagogical practice.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-thevenin-federation',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'rousseau',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'artwork-or-social-scene',
    title: 'The Fête de la Fédération, 14 July 1790',
    creator: 'Charles Thévenin',
    objectDate: '1792; depicts the event of 14 July 1790',
    institution: 'Musée Carnavalet, Paris',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Charles_Th%C3%A9venin_-_La_f%C3%AAte_de_la_F%C3%A9d%C3%A9ration,_le_14_juillet_1790,_au_Champ-de-Mars,_actuel_7%C3%A8me_arrondissement_-_La_F%C3%AAte_de_la_F%C3%A9d%C3%A9ration,_le_14_juillet_1790,_au_Champ-de-Mars_-_Mus%C3%A9e_Carnavalet_-_2.jpg',
    ...cc0,
    derivativeNotice,
    attribution:
      'Charles Thévenin, The Fête de la Fédération, 1792, Musée Carnavalet, CC0 1.0.',
    scene: [640, 433],
    panel: [1280, 865],
    alt: 'An immense crowd and ranks of participants gather around the central altar at the Champ-de-Mars.',
    caption: 'Thévenin’s later revolutionary spectacle stages national unity on a monumental scale.',
    historicalNote:
      'The painting was completed in 1792 and represents the 1790 festival, twelve years after Rousseau’s death. It belongs to later revolutionary reception and is not a scene he witnessed.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-rousseau-botanizing',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'rousseau',
    role: 'context',
    mediaKind: 'engraving',
    visualCharacter: 'portrait-or-figure',
    title: 'Jean-Jacques Rousseau botanizing at Ermenonville',
    creator: 'Jean-Michel Moreau le Jeune, after Mayer',
    objectDate: 'c. 1778; scene identified as June 1778',
    institution: 'Musée Carnavalet, Paris',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Jean-Jacques_Rousseau_herborisant_%C3%A0_Ermenonville_en_juin_1778,_G.21034(2).jpg',
    ...cc0,
    derivativeNotice,
    attribution:
      'Jean-Michel Moreau le Jeune after Mayer, Rousseau botanizing at Ermenonville, c. 1778, Musée Carnavalet, CC0 1.0.',
    scene: [483, 640],
    panel: [966, 1280],
    alt: 'Rousseau bends toward plants beside a path while carrying materials for collecting specimens.',
    caption: 'A commemorative image of Rousseau’s late botanical practice at Ermenonville.',
    historicalNote:
      'The print represents Rousseau near the end of his life but remains an authored commemorative scene, not mechanically recorded evidence of a particular excursion.',
    likenessStatus: 'attributed',
    focalPoint: {x: .5, y: .5},
  }),
  asset({
    id: 'enlightenment-greuze-punished-son',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'adam-smith',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'artwork-or-social-scene',
    title: 'The Punished Son',
    creator: 'Jean-Baptiste Greuze',
    objectDate: '1778',
    institution: 'Musée du Louvre, Paris',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Jean-Baptiste_Greuze_-_The_Punished_Son.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Jean-Baptiste Greuze, The Punished Son, 1778, Musée du Louvre. Public Domain Mark 1.0.',
    scene: [640, 512],
    panel: [1280, 1024],
    alt: 'A family crowds around a dying father as the returning son collapses in remorse.',
    caption: 'Greuze’s moral drama makes the spectator work through grief, blame, gesture, and circumstance.',
    historicalNote:
      'The painting postdates the first Theory of Moral Sentiments and was not commissioned to illustrate Smith. It functions as a contemporary culture of moral spectatorship, not direct philosophical evidence.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-encyclopedie-pinmaking',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'adam-smith',
    role: 'context',
    mediaKind: 'engraving',
    visualCharacter: 'map-or-diagram',
    title: 'Épinglier, plate II: pinmaking operations',
    creator: 'Encyclopédie workshop; individual engraver not identified on the Commons file page',
    objectDate: '1763',
    institution: 'Encyclopédie, volume of plates',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Encyclopedie_volume_3-057.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Épinglier, plate II, Encyclopédie, 1763. Public Domain Mark 1.0.',
    scene: [640, 436],
    panel: [1280, 872],
    alt: 'An engraved plate diagrams pinmaking tools, workshop stations, and successive manufacturing operations.',
    caption: 'An Encyclopédie plate visualizes the divided operations of an eighteenth-century pin trade.',
    historicalNote:
      'The plate is relevant period context, but there is no claim that Smith copied this exact image or based his pin-factory example on the depicted workshop.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-vernet-bordeaux-harbor',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'adam-smith',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'artwork-or-social-scene',
    title: 'View of the Port of Bordeaux',
    creator: 'Claude-Joseph Vernet',
    objectDate: '1758',
    institution: 'Musée national de la Marine, Paris',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Vernet-port-Bordeaux.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Claude-Joseph Vernet, View of the Port of Bordeaux, 1758, Musée national de la Marine. Public Domain Mark 1.0.',
    scene: [640, 398],
    panel: [1280, 797],
    alt: 'Workers, merchants, carts, small boats, and oceangoing ships animate the broad Bordeaux waterfront.',
    caption: 'Vernet’s harbor joins exchange to labor, infrastructure, law, and distant routes.',
    historicalNote:
      'Vernet constructed a polished official harbor view. The canvas makes many commercial activities visible while leaving colonial extraction and coercion largely beyond the frame.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-luny-hindostan',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'adam-smith',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'artwork-or-social-scene',
    title: 'The East Indiaman Hindostan and other vessels',
    creator: 'Thomas Luny',
    objectDate: '1792',
    institution: 'National Maritime Museum, Royal Museums Greenwich, BHC3403',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Thomas_Luny_(1759-1837)_-_The_East_Indiaman_%27Hindostan%27_(%27Hindustan%27)_and_Other_Vessels_-_BHC3403_-_Royal_Museums_Greenwich.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Thomas Luny, The East Indiaman Hindostan and Other Vessels, 1792, Royal Museums Greenwich. Public Domain Mark 1.0.',
    scene: [640, 399],
    panel: [1200, 749],
    alt: 'The large East Indiaman Hindostan sails among smaller vessels under a luminous sky.',
    caption: 'An East India Company ship makes visible the junction of trade, chartered privilege, and empire.',
    historicalNote:
      'Luny painted the work in 1792, two years after Smith died. It provides later visual context for the system Smith criticized and must not be presented as an image from his own viewing history.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-sandby-iron-forge',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'adam-smith',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'place-or-architecture',
    title: 'Iron Forge on the River Kent, Westmorland',
    creator: 'Paul Sandby',
    objectDate: 'Undated',
    institution: 'Yale Center for British Art',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Paul_Sandby_-_Iron_Forge_on_the_River_Kent,_Westmorland_-_Google_Art_Project.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Paul Sandby, Iron Forge on the River Kent, Westmorland, Yale Center for British Art. Public Domain Mark 1.0.',
    scene: [640, 503],
    panel: [1280, 1007],
    alt: 'Workers and animals occupy the dark interior and riverside yard of an iron forge.',
    caption: 'Sandby’s forge situates productive improvement inside a landscape of labor and machinery.',
    historicalNote:
      'The work is undated on the Commons record and is not tied to a workplace Smith visited. It is contextual evidence for industrial labor, not a documentary case study.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-hogarth-marriage-settlement',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'mary-astell',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'artwork-or-social-scene',
    title: 'Marriage A-la-Mode: The Marriage Settlement',
    creator: 'William Hogarth',
    objectDate: 'c. 1743',
    institution: 'National Gallery, London',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Marriage_A-la-Mode_1_The_Marriage_Settlement.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'William Hogarth, Marriage A-la-Mode: The Marriage Settlement, c. 1743, National Gallery, London. Public Domain Mark 1.0.',
    scene: [640, 487],
    panel: [1280, 973],
    alt: 'Two elite families negotiate a marriage contract while the prospective spouses sit disengaged beside them.',
    caption: 'Hogarth’s elite marriage contract exposes domestic union as legal, economic, and dynastic government.',
    historicalNote:
      'The satire concerns an aristocratic arranged marriage and cannot represent every household or woman. Its specificity is part of the interpretation, not a defect to conceal.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-samuel-nine-muses',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'mary-astell',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'artwork-or-social-scene',
    title: 'Portraits in the Characters of the Muses in the Temple of Apollo',
    creator: 'Richard Samuel',
    objectDate: '1778',
    institution: 'National Portrait Gallery, London',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Portraits_in_the_Characters_of_the_Muses_in_the_Temple_of_Apollo_by_Richard_Samuel.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Richard Samuel, Portraits in the Characters of the Muses in the Temple of Apollo, 1778, National Portrait Gallery, London. Public Domain Mark 1.0.',
    scene: [640, 538],
    panel: [1280, 1076],
    alt: 'Nine contemporary learned women pose together in classical dress as the Muses.',
    caption: 'A collective portrait celebrates nine learned women while framing achievement through elite allegory.',
    historicalNote:
      'The sitters are Barbauld, Carter, Griffith, Kauffman, Lennox, Macaulay, Montagu, More, and Sheridan. Mary Astell and Mary Wollstonecraft are not depicted.',
    likenessStatus: 'lifetime-portrait',
  }),
  asset({
    id: 'enlightenment-duchesse-du-maine-astronomy-lesson',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'wollstonecraft',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'artwork-or-social-scene',
    title: 'Astronomy Lesson of the Duchesse du Maine at the Château de Sceaux',
    creator: 'François de Troy',
    objectDate: 'c. 1705',
    institution: 'Musée du Domaine départemental de Sceaux, 88.24.1',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:La_Le%C3%A7on_d%E2%80%99astronomie_de_la_duchesse_du_Maine_-_Fran%C3%A7ois_de_Troy.jpg',
    objectPageUrl:
      'https://collections.domaine-de-sceaux.hauts-de-seine.fr/fr/notice/88-24-1-la-lecon-d-astronomie-de-la-duchesse-du-maine-au-chateau-de-sceaux-2910cf49-8353-4f59-8409-b8cbc8a87c34',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'François de Troy, Astronomy Lesson of the Duchesse du Maine at the Château de Sceaux, c. 1705, Musée du Domaine départemental de Sceaux, 88.24.1. Public Domain Mark 1.0.',
    scene: [640, 483],
    panel: [1280, 966],
    alt: 'The Duchesse du Maine studies astronomy in a richly furnished library with two male intellectuals, an armillary sphere, globes, diagrams, and books.',
    caption: 'A courtly astronomy lesson makes a woman’s learned attention visible while locating access inside rank, wealth, and private patronage.',
    historicalNote:
      'This is a courtly group portrait, not a generic classroom or proof of broad educational access. The museum identifies the sitters as Louise Bénédicte, Duchesse du Maine, Abbé Charles-Claude Genest, and Nicolas de Malézieu; the scene dates to about 1705.',
    likenessStatus: 'lifetime-portrait',
    focalPoint: {x: .52, y: .43},
  }),
  asset({
    id: 'enlightenment-womens-march-versailles',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'wollstonecraft',
    role: 'context',
    mediaKind: 'engraving',
    visualCharacter: 'artwork-or-social-scene',
    title: 'À Versailles, à Versailles, 5 octobre 1789',
    creator: 'Anonymous French printmaker',
    objectDate: '1789; restored digital reproduction',
    institution: 'Bibliothèque nationale de France, Gallica',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:A_Versailles,_%C3%A0_Versailles_5_octobre_1789_-_Restoration.jpg',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Anonymous, À Versailles, à Versailles, 5 octobre 1789, Bibliothèque nationale de France, Gallica. Public Domain Mark 1.0.',
    scene: [640, 449],
    panel: [1280, 897],
    alt: 'A large group of women and other marchers moves toward Versailles carrying staffs, tools, and banners.',
    caption: 'A contemporary print frames the Women’s March to Versailles as a mass political procession.',
    historicalNote:
      'The image is a designed contemporary print and later digital restoration, not a transparent eyewitness record. Its marchers must not be treated as portraits of Wollstonecraft or as one uniform political subject.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'enlightenment-kant-sublime-monk-sea',
    folder: 'enlightenment-revolution-kant',
    entityKind: 'philosopher',
    entityId: 'kant',
    role: 'context',
    mediaKind: 'painting',
    visualCharacter: 'artwork-or-social-scene',
    title: 'The Monk by the Sea',
    creator: 'Caspar David Friedrich',
    objectDate: '1808–1810',
    institution: 'Alte Nationalgalerie, Staatliche Museen zu Berlin, A I 516',
    sourcePageUrl:
      'https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Der_M%C3%B6nch_am_Meer_-_Google_Art_Project.jpg',
    objectPageUrl: 'https://id.smb.museum/object/965511/',
    ...publicDomain,
    derivativeNotice,
    attribution:
      'Caspar David Friedrich, The Monk by the Sea, 1808–1810, Alte Nationalgalerie, Staatliche Museen zu Berlin, A I 516. Public Domain Mark 1.0.',
    scene: [640, 407],
    panel: [1280, 814],
    alt: 'A tiny dark-robed monk stands before a vast, nearly empty sea and clouded sky.',
    caption: 'Friedrich’s later painting offers an interpretive companion for reflecting on overwhelming scale, the limits of imagination, and the judging subject.',
    historicalNote:
      'Friedrich painted this work roughly two decades after Kant’s Critique of the Power of Judgment. It was neither commissioned nor endorsed by Kant and is not presented as a historical illustration of his text.',
    likenessStatus: 'not-applicable',
    focalPoint: {x: .5, y: .53},
  }),
] as const satisfies readonly EnlightenmentGalleryAssetRecord[];
