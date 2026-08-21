import type {
  MuseumAssetId,
  MuseumAssetRecord,
  MuseumAssetVariant,
  MuseumLikenessStatus,
  MuseumMediaKind,
  MuseumVisualCharacter,
} from './museumAssetTypes';

export type FeministPhilosophiesGalleryAssetId =
  | 'feminist-philosophy-procession'
  | 'feminist-cooper-m-street-school'
  | 'feminist-truth-self-representation'
  | 'feminist-crenshaw-intersectionality'
  | 'feminist-situated-knowledge-computers'
  | 'feminist-care-laundry-child'
  | 'feminist-astell-learned-woman'
  | 'feminist-wollstonecraft-portrait'
  | 'feminist-de-gouges-patriotic-tax-print'
  | 'feminist-bluestocking-muses'
  | 'feminist-education-domestic-science'
  | 'feminist-abolition-convention'
  | 'feminist-beauvoir-portrait'
  | 'feminist-labor-washerwoman'
  | 'feminist-situation-paris-street'
  | 'feminist-womens-day-petrograd'
  | 'feminist-aging-portrait'
  | 'feminist-boupacha-solidarity'
  | 'feminist-butler-portrait'
  | 'feminist-act-up-assembly'
  | 'feminist-trans-visibility-march'
  | 'feminist-disability-access-protest'
  | 'feminist-queer-coalition-krakow'
  | 'feminist-public-assembly-ithaca';

type Rights = Pick<MuseumAssetRecord, 'license' | 'licenseUrl' | 'rightsKind'>;
type AssetInput = {
  id: FeministPhilosophiesGalleryAssetId;
  entityKind: 'philosopher' | 'branch';
  entityId: 'feminist-philosophy' | 'beauvoir' | 'judith-butler';
  role: MuseumAssetRecord['role'];
  mediaKind: MuseumMediaKind;
  visualCharacter: MuseumVisualCharacter;
  title: string;
  creator: string;
  objectDate: string;
  institution: string;
  sourcePageUrl: string;
  objectPageUrl?: string;
  rights: Rights;
  attribution: string;
  scene: readonly [number, number];
  panel: readonly [number, number];
  alt: string;
  caption: string;
  historicalNote: string;
  likenessStatus?: MuseumLikenessStatus;
};

const folder = 'feminist-philosophies';
const derivativeNotice =
  'Original source image retained uncropped; resized and converted to WebP by Philosophy Atlas.';
const publicDomain: Rights = {
  license: 'Public Domain Mark 1.0',
  licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  rightsKind: 'rights-status',
};
const publicDomainUSGov: Rights = {
  license: 'Public domain in the United States (federal government work)',
  licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-USGov',
  rightsKind: 'rights-status',
};
const noKnownRestrictions: Rights = {
  license: 'No known copyright restrictions',
  licenseUrl: 'https://rightsstatements.org/page/NKC/1.0/',
  rightsKind: 'rights-status',
};
const cc0: Rights = {
  license: 'CC0 1.0',
  licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
  rightsKind: 'dedication',
};
const ccBy2: Rights = {
  license: 'CC BY 2.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
  rightsKind: 'license',
};
const ccBySa3: Rights = {
  license: 'CC BY-SA 3.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  rightsKind: 'license',
};
const ccBySa4: Rights = {
  license: 'CC BY-SA 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  rightsKind: 'license',
};

const variant = (
  id: FeministPhilosophiesGalleryAssetId,
  kind: 'scene' | 'panel',
  size: readonly [number, number],
): MuseumAssetVariant => ({
  path: `assets/museum/${folder}/${id}-${kind}.webp`,
  width: size[0],
  height: size[1],
});

const asset = ({
  id,
  rights,
  scene,
  panel,
  likenessStatus = 'not-applicable',
  ...input
}: AssetInput): MuseumAssetRecord => ({
  ...input,
  ...rights,
  id: id as MuseumAssetId,
  derivativeNotice,
  variants: {scene: variant(id, 'scene', scene), panel: variant(id, 'panel', panel)},
  likenessStatus,
});

export const FEMINIST_PHILOSOPHIES_GALLERY_ASSETS = [
  asset({
    id: 'feminist-philosophy-procession', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Opening of the Woman Suffrage Procession in Washington, D.C.', creator: 'Unknown photographer; U.S. Information Agency record',
    objectDate: '3 March 1913', institution: 'U.S. National Archives via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Woman_Suffrage_Procession_1913_opening.jpg',
    rights: publicDomainUSGov, attribution: 'Unknown photographer, opening of the Woman Suffrage Procession, Washington, D.C., 3 March 1913. U.S. National Archives; U.S. public domain.',
    scene: [640, 289], panel: [1280, 578], alt: 'Women dressed in white march beside a horse-drawn banner cart during the 1913 suffrage procession in Washington.',
    caption: 'Collective action opens the gallery, while the route immediately asks whose histories older suffrage narratives foregrounded or excluded.',
    historicalNote: 'The procession was internally diverse but did not represent every feminist tradition or woman. Racial exclusion and segregation within the event remain essential to interpreting it.',
  }),
  asset({
    id: 'feminist-cooper-m-street-school', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'place-or-architecture',
    title: 'M Street High School in Washington, D.C.', creator: 'AgnosticPreachersKid',
    objectDate: 'Photographed 2008; building completed 1891', institution: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:M_Street_High_School.jpg',
    rights: ccBySa3, attribution: 'AgnosticPreachersKid, M Street High School, Washington, D.C., 2008. CC BY-SA 3.0.',
    scene: [639, 326], panel: [1278, 652], alt: 'A historic red-brick school building stands behind trees and a low fence.',
    caption: 'Anna Julia Cooper led M Street High School, linking classical education, Black women’s intellectual authority, and public institution-building.',
    historicalNote: 'This 2008 architectural photograph does not show Cooper, her students, or the school during her principalship; it preserves the institutional site only.',
  }),
  asset({
    id: 'feminist-truth-self-representation', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'primary-source', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Sojourner Truth carte-de-visite', creator: 'Unknown photographer',
    objectDate: '1864', institution: 'National Gallery of Art, Washington',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:American_19th_Century,_Sojourner_Truth,_1864,_NGA_164108.jpg',
    objectPageUrl: 'https://www.nga.gov/artworks/164108-sojourner-truth',
    rights: cc0, attribution: 'Unknown American photographer, Sojourner Truth, 1864, National Gallery of Art, accession 2014.19.1. CC0.',
    scene: [383, 640], panel: [766, 1280], alt: 'Sojourner Truth sits with knitting in her lap beside a small table bearing flowers.',
    caption: 'Sojourner Truth’s 1864 carte-de-visite, National Gallery of Art 2014.19.1, carries her sales motto about supporting the substance through the shadow.',
    historicalNote: 'This is a lifetime portrait deliberately circulated and sold by Truth. The inscription reads “I Sell the Shadow to Support the Substance”; the object should not be reduced to an illustration of one disputed speech transcript.',
    likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'feminist-crenshaw-intersectionality', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'identity', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Kimberlé Crenshaw at a public event', creator: 'Heinrich-Böll-Stiftung',
    objectDate: '2018', institution: 'Heinrich Böll Foundation via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Kimberl%C3%A9_Crenshaw_(47078270414).jpg',
    rights: ccBySa4, attribution: 'Heinrich-Böll-Stiftung, Kimberlé Crenshaw, 2018. CC BY-SA 4.0.',
    scene: [640, 418], panel: [1280, 836], alt: 'Kimberlé Crenshaw speaks into a microphone during a public event.',
    caption: 'Crenshaw’s legal scholarship gives the gallery a precise route into structural intersectionality rather than an additive identity checklist.',
    historicalNote: 'A lifetime event photograph establishes identity and public work; it does not by itself explain the legal cases or arguments in Crenshaw’s scholarship.',
    likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'feminist-situated-knowledge-computers', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Women of the Computer Department at the NACA High-Speed Flight Research Station', creator: 'National Advisory Committee for Aeronautics',
    objectDate: '1949', institution: 'NASA Armstrong Flight Research Center historical collection',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Human_computers_-_Dryden.jpg',
    objectPageUrl: 'https://www.nasa.gov/image-article/dryden-people-12/',
    rights: publicDomainUSGov, attribution: 'NACA, women of the Computer Department at the High-Speed Flight Research Station, 1949. NASA; U.S. public domain.',
    scene: [640, 501], panel: [1150, 900], alt: 'Women seated at desks work with calculating machines in a shared laboratory office.',
    caption: 'Women of NACA’s Computer Department work at the High-Speed Flight Research Station in 1949.',
    historicalNote: 'NASA identifies this as the High-Speed Flight Research Station, not the Aircraft Engine Research Laboratory or NASA Glenn. The photograph records one NACA workplace, not a demonstration that women share one standpoint or that institutional location automatically produces truer knowledge.',
  }),
  asset({
    id: 'feminist-care-laundry-child', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'A woman holding a baby while doing laundry', creator: 'U.S. Women’s Bureau photographer',
    objectDate: 'Circa 1893–1945; catalog range', institution: 'U.S. National Archives, Women’s Bureau records',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Photograph_of_a_Woman_Holding_a_Baby_while_Doing_Laundry_-_NARA_-_30805869.jpg',
    rights: {license: 'Commons identifies a U.S. Women’s Bureau/NARA record; direct federal-work and item-rights confirmation remains unavailable', licenseUrl: 'https://commons.wikimedia.org/wiki/File:Photograph_of_a_Woman_Holding_a_Baby_while_Doing_Laundry_-_NARA_-_30805869.jpg', rightsKind: 'rights-status'},
    attribution: 'U.S. Women’s Bureau attribution, woman holding an infant while doing laundry, undated catalog range 1893–1945. Direct NARA item and rights record not located.',
    scene: [640, 489], panel: [1280, 979], alt: 'A woman holds an infant while bending over a wash basin in a domestic workspace.',
    caption: 'Care, dependency, and maintenance labor become central philosophical evidence rather than an invisible background to autonomy.',
    historicalNote: 'The woman, infant, place, and exact date are unidentified, and the installed record reaches NARA only through Commons. The image cannot establish kinship, paid or unpaid status, consent, or the subject’s interpretation of her circumstances.',
  }),
  asset({
    id: 'feminist-astell-learned-woman', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'material-history', mediaKind: 'engraving', visualCharacter: 'material-object',
    title: 'Frontispiece to Jacques du Bosc’s The Excellent Woman', creator: 'Unknown engraver',
    objectDate: '1692 English edition', institution: 'Digitized historical print via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Frontispiece-from-Jacques-du-Boscs-The-Excellent-Woman-1.png',
    rights: ccBySa4, attribution: 'Unknown engraver, frontispiece to Jacques du Bosc’s The Excellent Woman, 1692 edition. Digital file CC BY-SA 4.0.',
    scene: [387, 640], panel: [774, 1280], alt: 'An engraved learned woman sits among books and instruments within an architectural frame.',
    caption: 'A period image of learned womanhood frames Mary Astell’s challenge to denied education and arbitrary authority.',
    historicalNote: 'This is not a portrait of Mary Astell. Scholar Ruth Perry has discussed it as a period example; the gallery keeps that distinction explicit.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'feminist-wollstonecraft-portrait', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'identity', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'Mary Wollstonecraft', creator: 'John Opie',
    objectDate: 'Circa 1797', institution: 'National Portrait Gallery, London, NPG 1237',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Mary_Wollstonecraft_by_John_Opie_from_the_National_Portrait_Gallery.jpg',
    objectPageUrl: 'https://www.npg.org.uk/collections/search/portrait/mw02603/Mary-Wollstonecraft',
    rights: {license: 'Underlying 1797 painting is public domain; the installed NPG-derived digital reproduction has source-specific reuse terms', licenseUrl: 'https://commons.wikimedia.org/wiki/File:Mary_Wollstonecraft_by_John_Opie_from_the_National_Portrait_Gallery.jpg', rightsKind: 'rights-status'},
    attribution: 'John Opie, Mary Wollstonecraft, circa 1797, oil on canvas, National Portrait Gallery, NPG 1237; bequeathed by Jane, Lady Shelley, 1899. Underlying work public domain; reproduction terms are source-specific.',
    scene: [530, 640], panel: [1060, 1280], alt: 'Mary Wollstonecraft sits turned slightly left in a pale dress and dark head covering against a plain background.',
    caption: 'John Opie, Mary Wollstonecraft, circa 1797, oil on canvas, National Portrait Gallery NPG 1237; bequeathed by Jane, Lady Shelley, 1899.',
    historicalNote: 'This verified lifetime portrait does not illustrate a passage of A Vindication of the Rights of Woman or reveal character. The underlying painting and the installed NPG-derived digital reproduction have distinct rights histories.',
    likenessStatus: 'lifetime-portrait',
  }),
  asset({
    id: 'feminist-de-gouges-patriotic-tax-print', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'primary-source', mediaKind: 'engraving', visualCharacter: 'artwork-or-social-scene',
    title: 'Projet de l’impôt patriotique donné par Madame de Gouges', creator: 'C. Frussotte after Claude-Louis Desrais',
    objectDate: '1788', institution: 'Bibliothèque nationale de France, Collection Michel Hennin, Hennin 10181',
    sourcePageUrl: 'https://gallica.bnf.fr/ark:/12148/btv1b8410577m',
    objectPageUrl: 'https://catalogue.bnf.fr/ark:/12148/cb40257593r',
    rights: publicDomain, attribution: 'C. Frussotte after Claude-Louis Desrais, Projet de l’impôt patriotique donné par Madame de Gouges, 1788, etching, BnF Collection Michel Hennin, Hennin 10181. Public domain.',
    scene: [374, 640], panel: [749, 1280], alt: 'An eighteenth-century allegorical print places a woman beside a patriotic contribution scene, with symbolic figures and an inscribed title below.',
    caption: 'C. Frussotte after Claude-Louis Desrais, allegorical print for de Gouges’s September 1788 patriotic-tax proposal, BnF Hennin 10181.',
    historicalNote: 'This period print is evidence of the public circulation of a political proposal associated with de Gouges, not a portrait or authenticated likeness. It replaces the former Carnavalet drawing whose de Gouges identification is now obsolete.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'feminist-bluestocking-muses', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'context', mediaKind: 'engraving', visualCharacter: 'artwork-or-social-scene',
    title: 'The Nine Living Muses of Great Britain, print after Richard Samuel', creator: 'Printmaker unverified; after Richard Samuel',
    objectDate: 'Related print published 1778; exact impression unverified', institution: 'Installed print distributed through Wikimedia Commons; exact holding not identified',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Nine_Living_Muses_of_Great_Britain.jpg',
    rights: {license: 'Underlying eighteenth-century design is public domain; exact print and digital-file provenance remain unresolved', licenseUrl: 'https://commons.wikimedia.org/wiki/File:Nine_Living_Muses_of_Great_Britain.jpg', rightsKind: 'rights-status'},
    attribution: 'Unverified printmaker after Richard Samuel, The Nine Living Muses of Great Britain, related print published 1778. Exact impression and holding unresolved; underlying design public domain.',
    scene: [640, 499], panel: [988, 771], alt: 'Nine idealized women are arranged as classical muses in an allegorical interior.',
    caption: 'A derivative print after Richard Samuel presents nine selected women as classical muses; its exact printmaker, impression date, and holding remain unverified.',
    historicalNote: 'The installed derivative is not straightforwardly Samuel’s 1778 National Portrait Gallery oil, Portraits in the Characters of the Muses in the Temple of Apollo, NPG 4905. Neither image records a meeting, and the selective circle cannot represent all women’s intellectual history.',
    likenessStatus: 'imagined',
  }),
  asset({
    id: 'feminist-education-domestic-science', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Domestic science class at Ohio State Normal College', creator: 'Frank R. Snyder',
    objectDate: '1913', institution: 'Miami University Libraries',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Ohio_State_Normal_College_domestic_science_class_in_cooking_classroom_1913_(3200527454).jpg',
    objectPageUrl: 'https://www.flickr.com/photos/muohio_digital_collections/3200527454',
    rights: noKnownRestrictions, attribution: 'Frank R. Snyder, Ohio State Normal College domestic science class, 1913, Miami University Libraries Snyder collection, item 4143. No known copyright restrictions.',
    scene: [640, 515], panel: [1280, 1030], alt: 'Women students work at individual stations in a college cooking classroom.',
    caption: 'Frank R. Snyder, Ohio State Normal College domestic science class in a cooking classroom, 1913, Miami University Libraries, item 4143.',
    historicalNote: 'The rights record says “no known copyright restrictions,” not a universal public-domain license. The photograph records one classroom and cannot establish the students’ motives or make domestic science simply liberating or controlling.',
  }),
  asset({
    id: 'feminist-abolition-convention', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The Anti-Slavery Society Convention, 1840', creator: 'Benjamin Robert Haydon',
    objectDate: '1841', institution: 'National Portrait Gallery, London, NPG 599',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:The_Anti-Slavery_Society_Convention,_1840_by_Benjamin_Robert_Haydon.jpg',
    objectPageUrl: 'https://www.npg.org.uk/collections/search/portrait/mw00028/The-Anti-Slavery-Society-Convention-1840',
    rights: {license: 'Underlying 1841 painting is public domain; the installed NPG-derived digital reproduction has source-specific reuse terms', licenseUrl: 'https://commons.wikimedia.org/wiki/File:The_Anti-Slavery_Society_Convention,_1840_by_Benjamin_Robert_Haydon.jpg', rightsKind: 'rights-status'},
    attribution: 'Benjamin Robert Haydon, The Anti-Slavery Society Convention, 1840, painted 1841, National Portrait Gallery NPG 599; given by the British and Foreign Anti-Slavery Society, 1880. Underlying work public domain; reproduction terms are source-specific.',
    scene: [640, 497], panel: [1280, 995], alt: 'A large abolition convention fills a hall while women observers sit together at one side.',
    caption: 'Haydon’s commissioned 1841 convention painting, National Portrait Gallery NPG 599; given by the British and Foreign Anti-Slavery Society in 1880.',
    historicalNote: 'Women attended the 1840 convention but were not permitted to participate. Haydon’s commissioned commemorative painting selects and arranges figures rather than neutrally documenting every delegate, belief, or abolitionist position.',
  }),
  asset({
    id: 'feminist-beauvoir-portrait', entityKind: 'philosopher', entityId: 'beauvoir',
    role: 'identity', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Simone de Beauvoir at the sixth anniversary ceremony of the founding of the People’s Republic of China', creator: 'Liu Dong’ao, Xinhua News Agency',
    objectDate: '1 October 1955', institution: 'Xinhua News Agency; image via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Simone_de_Beauvoir_1955.jpg',
    rights: {license: 'Public domain in China according to the Wikimedia Commons source; U.S. and other-jurisdiction status is not established by the file page', licenseUrl: 'https://commons.wikimedia.org/wiki/File:Simone_de_Beauvoir_1955.jpg', rightsKind: 'rights-status'}, attribution: 'Liu Dong’ao / Xinhua News Agency, Simone de Beauvoir at Tiananmen Square, Beijing, 1 October 1955. Rights status qualified by the Wikimedia Commons source.',
    scene: [400, 500], panel: [400, 500], alt: 'Black-and-white photograph of Simone de Beauvoir in a light coat among attendees at a Beijing anniversary ceremony, with a uniformed man and crowd behind her.',
    caption: 'Liu Dong’ao’s 1 October 1955 photograph of Simone de Beauvoir at a Beijing anniversary ceremony.',
    historicalNote: 'This is a crop from a photograph that also includes Sartre. It documents Beauvoir’s attendance during her 1955 China visit but cannot prove the two philosophers’ intellectual relation or the meaning of her later published account.',
    likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'feminist-labor-washerwoman', entityKind: 'philosopher', entityId: 'beauvoir',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Laundry worker', creator: 'Anonymous photographer',
    objectDate: 'Circa 1880–1914 according to the Commons record', institution: 'Original holding and accession not identified; distributed through Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:A_washer_woman_-_laundry_worker.jpg',
    rights: {license: 'Public-domain assertion on the Commons file; original holding and source-specific rights record not identified', licenseUrl: 'https://commons.wikimedia.org/wiki/File:A_washer_woman_-_laundry_worker.jpg', rightsKind: 'rights-status'},
    attribution: 'Anonymous photographer, unidentified laundry worker, circa 1880–1914 according to the Commons record. Original holding, accession, place, and direct rights record not identified.',
    scene: [472, 640], panel: [756, 1024], alt: 'A laundry worker stands beside a large basin and piled linens.',
    caption: 'An unidentified laundry worker beside a basin and linens, circa 1880–1914 according to the Commons record; original collection and place are unknown.',
    historicalNote: 'The photograph is comparative context, not an image of Beauvoir or The Second Sex. The worker’s life cannot be recovered through Beauvoir’s categories, and paid laundry work is not identical to unpaid household work.',
  }),
  asset({
    id: 'feminist-situation-paris-street', entityKind: 'philosopher', entityId: 'beauvoir',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'place-or-architecture',
    title: 'Rue Bonaparte at rue Guillaume-Apollinaire and rue de l’Abbaye', creator: 'Léon Auguste',
    objectDate: '20 July 1914', institution: 'Albert Kahn, Archives of the Planet',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:La_rue_Bonaparte_%C3%A0_l%27angle_des_rues_Guillaume-Apollinaire_et_de_l%27Abbaye_vue_de_l%27actuelle_place_Jean-Paul_Sartre_et_Simone_de_Beauvoir_-_A7569.jpg',
    rights: cc0, attribution: 'Léon Auguste, rue Bonaparte, Paris, 20 July 1914, Albert Kahn collection. CC0.',
    scene: [640, 475], panel: [1280, 949], alt: 'Pedestrians move through a Paris street intersection lined with shopfronts.',
    caption: 'Léon Auguste’s 20 July 1914 view of rue Bonaparte at rue Guillaume-Apollinaire and rue de l’Abbaye, from the later Sartre–Beauvoir square.',
    historicalNote: 'The archive’s street view predates Beauvoir’s public career and does not depict her. The later place-name belongs to reception history only and cannot substitute celebrity geography for Beauvoir’s account of social, bodily, and historical situation.',
  }),
  asset({
    id: 'feminist-womens-day-petrograd', entityKind: 'philosopher', entityId: 'beauvoir',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'International Women’s Day demonstration in Petrograd', creator: 'Unknown photographer',
    objectDate: '8 March 1917', institution: 'State Museum of Political History of Russia record via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:1917_International_Women%27s_Day_-_Petrograd.jpg',
    rights: {license: 'Public-domain assertion on the Commons file; direct museum provenance and rights record not located', licenseUrl: 'https://commons.wikimedia.org/wiki/File:1917_International_Women%27s_Day_-_Petrograd.jpg', rightsKind: 'rights-status'},
    attribution: 'Unknown photographer, International Women’s Day demonstration in Petrograd, 8 March 1917, attributed through a State Museum record on Commons; direct provenance and rights record not located.',
    scene: [640, 493], panel: [1280, 986], alt: 'A dense women’s demonstration fills a Petrograd street in 1917.',
    caption: 'Women demonstrate in Petrograd on 8 March 1917; the photograph supplies comparative movement history, not a scene from Beauvoir’s life.',
    historicalNote: 'This demonstration predates The Second Sex and belongs to a distinct revolutionary history. Direct collection provenance and rights remain unverified, and the image cannot establish participant identities, motives, or a causal prehistory of Beauvoir’s work.',
  }),
  asset({
    id: 'feminist-aging-portrait', entityKind: 'philosopher', entityId: 'beauvoir',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Portrait of an unidentified elderly woman', creator: 'Unknown photographer',
    objectDate: 'Circa 1900', institution: 'Florida Memory, State Library and Archives of Florida, Connell collection CC564',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Portrait_of_an_elderly_woman.jpg',
    objectPageUrl: 'https://www.floridamemory.com/items/show/90246',
    rights: noKnownRestrictions, attribution: 'Unknown photographer, unidentified older woman, circa 1900, Volusia County, Florida Memory Connell collection CC564. No known copyright restrictions.',
    scene: [498, 640], panel: [600, 771], alt: 'An unidentified older woman in a dark dress and hood sits for a formal studio portrait.',
    caption: 'Unidentified older woman, circa 1900, Volusia County, 8 × 5 inch photoprint, Florida Memory Connell collection CC564.',
    historicalNote: '“No known copyright restrictions” is a rights statement, not a license. The sitter is not Beauvoir, and the record does not preserve her name or disclose health, class, family relations, consent, or self-understanding.',
    likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'feminist-boupacha-solidarity', entityKind: 'philosopher', entityId: 'beauvoir',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Djamila Boupacha', creator: 'BRAHIM DJELLOUL Mustapha',
    objectDate: '12 June 2017', institution: 'No holding institution; creator-uploaded through Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Djamila_BOUPACHA.jpg',
    rights: ccBySa4, attribution: 'BRAHIM DJELLOUL Mustapha, Djamila Boupacha, 12 June 2017. CC BY-SA 4.0.',
    scene: [581, 640], panel: [1161, 1280], alt: 'Djamila Boupacha faces the camera in a color portrait made in 2017.',
    caption: 'BRAHIM DJELLOUL Mustapha’s creator-licensed 2017 portrait of Djamila Boupacha.',
    historicalNote: 'This later lifetime portrait replaces an unlicensed Getty/Hulton press image. It does not depict Boupacha’s 1960 arrest, torture, testimony, trial, release, or the 1960–62 advocacy campaign, which require independent primary and scholarly evidence.',
    likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'feminist-butler-portrait', entityKind: 'philosopher', entityId: 'judith-butler',
    role: 'identity', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Judith Butler speaking in 2011', creator: 'Andrew Rusk',
    objectDate: '9 March 2011', institution: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Judith_Butler_(2011).jpg',
    rights: ccBy2, attribution: 'Andrew Rusk, Judith Butler speaking, 9 March 2011. CC BY 2.0.',
    scene: [640, 427], panel: [1280, 853], alt: 'Judith Butler speaks during a public lecture.',
    caption: 'Butler’s primary installation begins with gendered recognition and follows the argument toward livability, precarity, and assembly.',
    historicalNote: 'A lifetime lecture photograph establishes identity but cannot represent every phase of Butler’s changing work or settle disputes about it.',
    likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'feminist-act-up-assembly', entityKind: 'philosopher', entityId: 'judith-butler',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'ACT UP demonstration at the National Institutes of Health', creator: 'NIH History Office',
    objectDate: '21 May 1990 event date; exact image capture metadata not separately cataloged', institution: 'National Institutes of Health History Office',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:ACT_UP_Demonstration_at_NIH_(14336262776).jpg',
    objectPageUrl: 'https://www.nlm.nih.gov/exhibition/surviving-and-thriving/index.html',
    rights: publicDomainUSGov, attribution: 'NIH History Office, ACT UP demonstration at NIH; the NIH Record dates the “Storm the NIH” action to 21 May 1990. U.S. federal work.',
    scene: [640, 447], panel: [1024, 715], alt: 'ACT UP demonstrators gather with banners outside a federal health institution.',
    caption: 'ACT UP demonstrates at NIH; the institution’s contemporary record dates “Storm the NIH” to 21 May 1990, correcting the former 1999 label.',
    historicalNote: 'The exact image creator and capture metadata are not separately cataloged in the installed record. The demonstration was not organized to illustrate Butler, and ACT UP’s AIDS activism has an autonomous history not reducible to performativity.',
  }),
  asset({
    id: 'feminist-trans-visibility-march', entityKind: 'philosopher', entityId: 'judith-butler',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'National Trans Visibility March', creator: 'Avery Jensen',
    objectDate: '28 September 2019 event date; capture date inferred from the depicted march', institution: 'No holding institution; creator-uploaded through Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:National_Trans_Visibility_March_1773.jpg',
    rights: ccBySa4, attribution: 'Avery Jensen, National Trans Visibility March in Washington, D.C.; organizers date the event to 28 September 2019. CC BY-SA 4.0.',
    scene: [640, 427], panel: [1280, 853], alt: 'Marchers carry trans pride colors and signs through a city street.',
    caption: 'Avery Jensen’s creator-licensed photograph of the National Trans Visibility March held in Washington, D.C., on 28 September 2019.',
    historicalNote: 'The photograph documents one contingent U.S. public action, not trans life, safety, health care, or progress as such. One march cannot represent trans communities globally, and trans philosophy is not a derivative application of Butler.',
  }),
  asset({
    id: 'feminist-disability-access-protest', entityKind: 'philosopher', entityId: 'judith-butler',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Demonstration against inaccessible buses in Manchester', creator: 'CityTony',
    objectDate: '8 September 1991', institution: 'No holding institution identified; later creator upload through Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:8_Sept_1991_-_Inaccessible_buses_demo,_Wilmslow_Road,_Manchester_outside_Owens_Park.jpg',
    rights: ccBySa4, attribution: 'CityTony, inaccessible-buses demonstration, Wilmslow Road, Manchester, 8 September 1991. CC BY-SA 4.0.',
    scene: [450, 640], panel: [899, 1280], alt: 'Disabled protesters demonstrate beside a city bus on Wilmslow Road.',
    caption: 'Disabled protesters demonstrate against inaccessible buses on Wilmslow Road, Manchester, 8 September 1991.',
    historicalNote: 'The later upload records a targeted access protest but supplies no direct organizer or local-archive record. The protest has its own disability-rights genealogy and cannot reduce disability to a metaphor for generalized dependency or an illustration of Butler.',
  }),
  asset({
    id: 'feminist-queer-coalition-krakow', entityKind: 'philosopher', entityId: 'judith-butler',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Equality March and Women’s Strike contingent in Kraków', creator: 'Tomasz Molina',
    objectDate: '21 May 2022', institution: 'No holding institution; creator-uploaded through Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Equality_March_2022_in_Krak%C3%B3w_-_Strajk_Kobiet.jpg',
    rights: ccBySa4, attribution: 'Tomasz Molina, Equality March 2022 in Kraków—Women’s Strike, 21 May 2022. CC BY-SA 4.0.',
    scene: [479, 640], panel: [957, 1280], alt: 'Marchers carry rainbow and women’s-strike symbols through Kraków.',
    caption: 'Tomasz Molina’s creator-licensed photograph of an Equality March and Women’s Strike contingent in Kraków, 21 May 2022.',
    historicalNote: 'The visible rainbow flags and Women’s Strike symbols establish proximity in one 2022 action, not organizational membership, consensus, equal risk, a shared agenda, or durable coalition.',
  }),
  asset({
    id: 'feminist-public-assembly-ithaca', entityKind: 'philosopher', entityId: 'judith-butler',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Women’s March in Ithaca, New York', creator: 'Random Tree',
    objectDate: '21 January 2017', institution: 'No holding institution; creator-uploaded through Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Women%27s_March_in_Ithaca,_New_York.jpg',
    rights: cc0, attribution: 'Random Tree, Women’s March in Ithaca, New York, 21 January 2017. CC0.',
    scene: [638, 228], panel: [1276, 456], alt: 'A panoramic view shows a large public march filling an Ithaca street.',
    caption: 'A panoramic view of the Women’s March in Ithaca, New York, 21 January 2017; it records scale, not shared motive.',
    historicalNote: 'The photograph documents one local gathering and cannot establish organizer, attendance, demands, consensus, or Butler’s influence. It supplies later comparative imagery, not evidence that a crowd is unified or emancipatory.',
  }),
] as const satisfies readonly MuseumAssetRecord[];
