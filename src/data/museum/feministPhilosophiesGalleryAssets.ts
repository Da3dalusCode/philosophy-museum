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
  | 'feminist-de-gouges-presumed-portrait'
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
  'Original Commons image retained uncropped; resized and converted to WebP by Philosophy Atlas.';
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
    scene: [640, 326], panel: [1280, 653], alt: 'A historic red-brick school building stands behind trees and a low fence.',
    caption: 'Anna Julia Cooper led M Street High School, linking classical education, Black women’s intellectual authority, and public institution-building.',
    historicalNote: 'This 2008 architectural photograph does not show Cooper, her students, or the school during her principalship; it preserves the institutional site only.',
  }),
  asset({
    id: 'feminist-truth-self-representation', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'primary-source', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Sojourner Truth carte-de-visite', creator: 'Unknown photographer',
    objectDate: '1864', institution: 'National Gallery of Art, Washington',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:American_19th_Century,_Sojourner_Truth,_1864,_NGA_164108.jpg',
    rights: cc0, attribution: 'Unknown American photographer, Sojourner Truth, 1864, National Gallery of Art. CC0.',
    scene: [383, 640], panel: [766, 1280], alt: 'Sojourner Truth sits with knitting in her lap beside a small table bearing flowers.',
    caption: 'Truth sold photographic cards bearing her chosen presentation, turning an image into income and a claim to authorship.',
    historicalNote: 'This is a lifetime portrait deliberately circulated by Truth. It should not be reduced to an illustration of one disputed speech transcript.',
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
    title: 'Human computers at the NACA Aircraft Engine Research Laboratory', creator: 'National Advisory Committee for Aeronautics',
    objectDate: '1949', institution: 'NASA Glenn Research Center',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Human_computers_-_Dryden.jpg',
    rights: publicDomainUSGov, attribution: 'NACA, human computers at the Aircraft Engine Research Laboratory, 1949. NASA; U.S. public domain.',
    scene: [640, 501], panel: [1150, 900], alt: 'Women seated at desks work with calculating machines in a shared laboratory office.',
    caption: 'Scientific knowledge appears as trained, distributed labor—an institutional setting for feminist arguments about standpoint and situated objectivity.',
    historicalNote: 'The photograph records one NACA workplace, not a demonstration that women share one standpoint or that institutional location automatically produces truer knowledge.',
  }),
  asset({
    id: 'feminist-care-laundry-child', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'A woman holding a baby while doing laundry', creator: 'U.S. Women’s Bureau photographer',
    objectDate: 'Circa 1893–1945; catalog range', institution: 'U.S. National Archives, Women’s Bureau records',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Photograph_of_a_Woman_Holding_a_Baby_while_Doing_Laundry_-_NARA_-_30805869.jpg',
    rights: publicDomainUSGov, attribution: 'U.S. Women’s Bureau, woman holding a baby while doing laundry, undated catalog range 1893–1945. NARA; U.S. public domain.',
    scene: [640, 489], panel: [1280, 979], alt: 'A woman holds an infant while bending over a wash basin in a domestic workspace.',
    caption: 'Care, dependency, and maintenance labor become central philosophical evidence rather than an invisible background to autonomy.',
    historicalNote: 'The woman is unidentified and the date is broad. The image cannot stand for all domestic labor or reveal the subject’s own interpretation of her circumstances.',
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
    objectDate: 'Circa 1797', institution: 'National Portrait Gallery, London',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Mary_Wollstonecraft_by_John_Opie_from_the_National_Portrait_Gallery.jpg',
    rights: publicDomain, attribution: 'John Opie, Mary Wollstonecraft, circa 1797, National Portrait Gallery, London. Public domain.',
    scene: [530, 640], panel: [1060, 1280], alt: 'Mary Wollstonecraft faces the viewer in a dark dress and white head covering.',
    caption: 'Opie’s lifetime portrait accompanies Wollstonecraft’s case that apparent female weakness is socially trained, not natural proof of incapacity.',
    historicalNote: 'This is a lifetime painted portrait, not a transparent record of character or an illustration of A Vindication of the Rights of Woman.',
    likenessStatus: 'lifetime-portrait',
  }),
  asset({
    id: 'feminist-de-gouges-presumed-portrait', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'identity', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'Presumed portrait of Olympe de Gouges', creator: 'Unknown artist',
    objectDate: '1784', institution: 'Musée Carnavalet attribution record via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Portrait_pr%C3%A9sum%C3%A9_de_Marie-Olympe_Aubry_de_Gouges.jpg',
    rights: publicDomain, attribution: 'Unknown artist, presumed portrait of Olympe de Gouges, 1784. Public domain.',
    scene: [569, 640], panel: [960, 1080], alt: 'A woman in an elaborate late-eighteenth-century dress sits beside a writing table.',
    caption: 'A contested likeness introduces de Gouges’s demand that revolutionary citizenship include women.',
    historicalNote: 'The sitter’s identification as Olympe de Gouges is presumed, not secure. The installation labels the uncertainty rather than presenting the image as verified.',
    likenessStatus: 'uncertain',
  }),
  asset({
    id: 'feminist-bluestocking-muses', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'context', mediaKind: 'engraving', visualCharacter: 'artwork-or-social-scene',
    title: 'The Nine Living Muses of Great Britain', creator: 'After Richard Samuel',
    objectDate: '1778', institution: 'National Portrait Gallery record via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Nine_Living_Muses_of_Great_Britain.jpg',
    rights: publicDomain, attribution: 'After Richard Samuel, The Nine Living Muses of Great Britain, 1778. Public domain.',
    scene: [640, 499], panel: [988, 771], alt: 'Nine women writers and artists gather as muses in an imagined classical interior.',
    caption: 'The group portrait makes women’s intellectual public visible while also exposing the social selectivity of eighteenth-century recognition.',
    historicalNote: 'This is an allegorical group construction, not a documentary meeting. Its celebrated circle cannot represent working-class, Black, colonial, or dissenting women excluded from such recognition.',
    likenessStatus: 'imagined',
  }),
  asset({
    id: 'feminist-education-domestic-science', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Domestic science class at Ohio State Normal College', creator: 'Frank R. Snyder',
    objectDate: '1913', institution: 'Miami University Libraries',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Ohio_State_Normal_College_domestic_science_class_in_cooking_classroom_1913_(3200527454).jpg',
    rights: publicDomain, attribution: 'Frank R. Snyder, domestic science class at Ohio State Normal College, 1913, Miami University Libraries. Public domain.',
    scene: [640, 515], panel: [1280, 1030], alt: 'Women students work at individual stations in a college cooking classroom.',
    caption: 'Education could open professional routes while also channeling women toward domestic expertise; institutional access never arrived without classification.',
    historicalNote: 'The photograph records one U.S. college classroom. It does not establish the students’ aspirations or reduce domestic science to either liberation or social control.',
  }),
  asset({
    id: 'feminist-abolition-convention', entityKind: 'branch', entityId: 'feminist-philosophy',
    role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The Anti-Slavery Society Convention, 1840', creator: 'Benjamin Robert Haydon',
    objectDate: '1841', institution: 'National Portrait Gallery, London',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:The_Anti-Slavery_Society_Convention,_1840_by_Benjamin_Robert_Haydon.jpg',
    rights: publicDomain, attribution: 'Benjamin Robert Haydon, The Anti-Slavery Society Convention, 1840, painted 1841, National Portrait Gallery. Public domain.',
    scene: [640, 497], panel: [1280, 995], alt: 'A large abolition convention fills a hall while women observers sit together at one side.',
    caption: 'Women’s exclusion from delegate status at the 1840 convention reveals how reform movements could reproduce political hierarchy inside emancipatory claims.',
    historicalNote: 'Haydon composed a commemorative painting rather than a neutral photograph. It selects and arranges figures, and the convention did not contain every abolitionist position.',
  }),
  asset({
    id: 'feminist-beauvoir-portrait', entityKind: 'philosopher', entityId: 'beauvoir',
    role: 'identity', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Simone de Beauvoir in Beijing', creator: 'Liu Dong’ao, Xinhua',
    objectDate: '1955', institution: 'Xinhua photograph via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Simone_de_Beauvoir_1955.jpg',
    rights: publicDomain, attribution: 'Liu Dong’ao, Simone de Beauvoir in Beijing, 1955, Xinhua. Public-domain source record via Wikimedia Commons.',
    scene: [400, 500], panel: [400, 500], alt: 'Simone de Beauvoir looks toward the camera in a close outdoor portrait.',
    caption: 'A lifetime photograph anchors Beauvoir’s account of freedom as embodied, social, historically situated, and never completed alone.',
    historicalNote: 'The photograph was made during Beauvoir’s 1955 visit to China. It should not be used as visual proof of her later published interpretation of that visit.',
    likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'feminist-labor-washerwoman', entityKind: 'philosopher', entityId: 'beauvoir',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Laundry worker', creator: 'Anonymous photographer',
    objectDate: 'Between 1880 and 1914', institution: 'Historical photograph via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:A_washer_woman_-_laundry_worker.jpg',
    rights: publicDomain, attribution: 'Anonymous photographer, laundry worker, circa 1880–1914. Public domain.',
    scene: [472, 640], panel: [756, 1024], alt: 'A laundry worker stands beside a large basin and piled linens.',
    caption: 'Repetitive maintenance labor gives material weight to Beauvoir’s contrast between projects that open futures and work confined to recurrence.',
    historicalNote: 'The worker is unidentified and predates The Second Sex. Her life cannot be recovered from Beauvoir’s categories, and paid laundry work is not identical to unpaid housework.',
  }),
  asset({
    id: 'feminist-situation-paris-street', entityKind: 'philosopher', entityId: 'beauvoir',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'place-or-architecture',
    title: 'Rue Bonaparte before the later Sartre–Beauvoir place-name', creator: 'Léon Auguste',
    objectDate: '20 July 1914', institution: 'Albert Kahn, Archives of the Planet',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:La_rue_Bonaparte_%C3%A0_l%27angle_des_rues_Guillaume-Apollinaire_et_de_l%27Abbaye_vue_de_l%27actuelle_place_Jean-Paul_Sartre_et_Simone_de_Beauvoir_-_A7569.jpg',
    rights: cc0, attribution: 'Léon Auguste, rue Bonaparte, Paris, 20 July 1914, Albert Kahn collection. CC0.',
    scene: [640, 475], panel: [1280, 949], alt: 'Pedestrians move through a Paris street intersection lined with shopfronts.',
    caption: 'A place later named for Sartre and Beauvoir becomes a caution: “situation” is a social and historical condition, not celebrity geography.',
    historicalNote: 'The photograph predates Beauvoir’s public career and does not depict her. The present place-name supplies reception history only.',
  }),
  asset({
    id: 'feminist-womens-day-petrograd', entityKind: 'philosopher', entityId: 'beauvoir',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'International Women’s Day demonstration in Petrograd', creator: 'Unknown photographer',
    objectDate: '8 March 1917', institution: 'State Museum of Political History of Russia record via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:1917_International_Women%27s_Day_-_Petrograd.jpg',
    rights: publicDomain, attribution: 'Unknown photographer, International Women’s Day demonstration in Petrograd, 8 March 1917. Public domain.',
    scene: [640, 493], panel: [1280, 986], alt: 'A dense women’s demonstration fills a Petrograd street in 1917.',
    caption: 'Collective political action tests any reading of emancipation that remains at the level of individual attitude.',
    historicalNote: 'This demonstration predates Beauvoir and belongs to a distinct revolutionary history. It supplies comparison, not a causal prehistory of The Second Sex.',
  }),
  asset({
    id: 'feminist-aging-portrait', entityKind: 'philosopher', entityId: 'beauvoir',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Portrait of an unidentified elderly woman', creator: 'Unknown photographer',
    objectDate: 'Circa 1910', institution: 'Florida Memory, State Library and Archives of Florida',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Portrait_of_an_elderly_woman.jpg',
    rights: noKnownRestrictions, attribution: 'Unknown photographer, portrait of an unidentified elderly woman, circa 1910, Florida Memory. No known copyright restrictions.',
    scene: [498, 640], panel: [600, 771], alt: 'An elderly woman sits for a formal studio portrait in a dark dress.',
    caption: 'An unidentified sitter resists the abstraction of “the aged” and opens Beauvoir’s inquiry into how societies make old age into otherness.',
    historicalNote: 'The subject is not Beauvoir and her own account is not preserved here. The portrait cannot disclose health, class, family relations, or self-understanding.',
    likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'feminist-boupacha-solidarity', entityKind: 'philosopher', entityId: 'beauvoir',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Djamila Boupacha after her release', creator: 'Kaye',
    objectDate: '14 March 1963', institution: 'Historical press photograph via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Djamila_Boupacha_1963.jpg',
    rights: publicDomain, attribution: 'Kaye, Djamila Boupacha, 14 March 1963. Public-domain source record via Wikimedia Commons.',
    scene: [630, 640], panel: [1261, 1280], alt: 'Djamila Boupacha faces the camera in a close portrait made after the Algerian War.',
    caption: 'Boupacha’s case connects Beauvoir’s public advocacy with torture, colonial war, feminist solidarity, and the danger of making one advocate the story’s center.',
    historicalNote: 'The photograph dates from 1963, after the torture and trial campaign. Source details are limited, and Boupacha’s history must not be absorbed into Beauvoir’s biography.',
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
    objectDate: '21 May 1999; Commons description date', institution: 'National Institutes of Health History Office',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:ACT_UP_Demonstration_at_NIH_(14336262776).jpg',
    rights: publicDomainUSGov, attribution: 'NIH History Office, ACT UP demonstration at the NIH, source date 21 May 1999. U.S. public domain.',
    scene: [640, 447], panel: [1024, 715], alt: 'ACT UP demonstrators gather with banners outside a federal health institution.',
    caption: 'Collective action makes bodies publicly legible while contesting which lives institutions protect, study, or abandon.',
    historicalNote: 'The demonstration was not organized to illustrate Butler’s theory. ACT UP’s own strategies and AIDS activism require histories not reducible to performativity.',
  }),
  asset({
    id: 'feminist-trans-visibility-march', entityKind: 'philosopher', entityId: 'judith-butler',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'National Trans Visibility March', creator: 'Avery Jensen',
    objectDate: '29 September 2019', institution: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:National_Trans_Visibility_March_1773.jpg',
    rights: ccBySa4, attribution: 'Avery Jensen, National Trans Visibility March, 29 September 2019. CC BY-SA 4.0.',
    scene: [640, 427], panel: [1280, 853], alt: 'Marchers carry trans pride colors and signs through a city street.',
    caption: 'Trans political life tests whether recognition expands livability or makes people visible to new forms of surveillance and violence.',
    historicalNote: 'One U.S. march cannot represent trans communities globally, and trans philosophy should not be treated as a derivative application of Butler.',
  }),
  asset({
    id: 'feminist-disability-access-protest', entityKind: 'philosopher', entityId: 'judith-butler',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Demonstration against inaccessible buses in Manchester', creator: 'CityTony',
    objectDate: '8 September 1991', institution: 'Greater Manchester disability-rights history via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:8_Sept_1991_-_Inaccessible_buses_demo,_Wilmslow_Road,_Manchester_outside_Owens_Park.jpg',
    rights: ccBySa4, attribution: 'CityTony, inaccessible-buses demonstration, Wilmslow Road, Manchester, 8 September 1991. CC BY-SA 4.0.',
    scene: [450, 640], panel: [899, 1280], alt: 'Disabled protesters demonstrate beside a city bus on Wilmslow Road.',
    caption: 'Access activism turns dependency from a private deficit into a political relation among bodies, infrastructure, care, and public obligation.',
    historicalNote: 'The protest has its own disability-rights genealogy and should not be framed as an illustration of Butler alone. The event date is 1991 despite later upload metadata.',
  }),
  asset({
    id: 'feminist-queer-coalition-krakow', entityKind: 'philosopher', entityId: 'judith-butler',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Equality March and Women’s Strike contingent in Kraków', creator: 'Tomasz Molina',
    objectDate: '21 May 2022', institution: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Equality_March_2022_in_Krak%C3%B3w_-_Strajk_Kobiet.jpg',
    rights: ccBySa4, attribution: 'Tomasz Molina, Equality March 2022 in Kraków—Women’s Strike, 21 May 2022. CC BY-SA 4.0.',
    scene: [479, 640], panel: [957, 1280], alt: 'Marchers carry rainbow and women’s-strike symbols through Kraków.',
    caption: 'A coalition appears as an active alignment across differences, not a final identity that erases disagreement.',
    historicalNote: 'The photograph records one Polish march in 2022. Its visible symbols do not establish every participant’s position or the durability of coalition.',
  }),
  asset({
    id: 'feminist-public-assembly-ithaca', entityKind: 'philosopher', entityId: 'judith-butler',
    role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Women’s March in Ithaca, New York', creator: 'Random Tree',
    objectDate: '21 January 2017', institution: 'Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Women%27s_March_in_Ithaca,_New_York.jpg',
    rights: cc0, attribution: 'Random Tree, Women’s March in Ithaca, New York, 21 January 2017. CC0.',
    scene: [640, 229], panel: [1280, 457], alt: 'A panoramic view shows a large public march filling an Ithaca street.',
    caption: 'Assembly makes a claim through bodies acting together, even when participants do not share one identity, demand, or account of the public.',
    historicalNote: 'The march is not evidence of consensus and did not arise from Butler’s theory. It supplies a concrete public against which claims about assembly can be tested.',
  }),
] as const satisfies readonly MuseumAssetRecord[];
