import type {MuseumAssetId, MuseumAssetRecord, MuseumAssetVariant} from './museumAssetTypes';

type GalleryAssetInput = Omit<MuseumAssetRecord, 'id' | 'variants'> & {
  id: MuseumAssetId;
  scene: readonly [number, number];
  panel: readonly [number, number];
};

const folder = 'jewish-philosophy';
const derivativeNotice = 'Original image retained uncropped; resized and converted to WebP by Philosophy Atlas.';
const variant = (id: MuseumAssetId, kind: 'scene' | 'panel', size: readonly [number, number]): MuseumAssetVariant => ({
  path: `assets/museum/${folder}/${id}-${kind}.webp`,
  width: size[0],
  height: size[1],
});
const asset = ({id, scene, panel, ...record}: GalleryAssetInput): MuseumAssetRecord => ({
  ...record,
  id,
  variants: {scene: variant(id, 'scene', scene), panel: variant(id, 'panel', panel)},
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

/**
 * Twelve distinct sources for twelve physical installations. Manuscript,
 * documentary, print, and portrait evidence replaces invented likenesses and
 * keeps Jewish intellectual history distinct within Arabic-speaking worlds.
 */
export const JEWISH_GALLERY_ASSETS = [
  asset({
    id: 'saadia-baqashah-geniza', entityKind: 'philosopher', entityId: 'saadia-gaon', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Baqashah of Saadia ben Joseph', creator: 'Text by Saadia Gaon; copyist unknown', objectDate: '12th–14th century?', institution: 'Penn Libraries Cairo Genizah Collection, Halper 221',
    sourcePageUrl: 'https://openn.library.upenn.edu/Data/0002/html/h221.html', ...publicDomain,
    attribution: 'Penn Libraries, Halper 221, Baqashah of Saadia ben Joseph. Public Domain Mark 1.0.',
    scene: [485, 640], panel: [971, 1280],
    alt: 'A narrow, damaged Cairo Geniza paper fragment carries faded lines of Hebrew liturgical text associated with Saadia.',
    caption: 'A later Geniza witness to a liturgical composition by Saadia Gaon, grounding his legacy in Jewish textual practice.',
    historicalNote: 'Copied centuries after Saadia and badly damaged, the fragment is neither an autograph nor a visual likeness of the philosopher.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'saadia-beliefs-landauer', entityKind: 'philosopher', entityId: 'saadia-gaon', role: 'primary-source', mediaKind: 'book-page',
    title: 'Kitāb al-Amānāt wa-l-Iʿtiqādāt, Landauer edition', creator: 'Saadia Gaon; edited by Samuel Landauer', objectDate: 'Leiden, 1880', institution: 'Robarts Library, University of Toronto / Internet Archive',
    sourcePageUrl: 'https://archive.org/details/kitbalamnt00saaduoft',
    objectPageUrl: 'https://archive.org/details/kitbalamnt00saaduoft',
    license: 'Public domain in the United States', licenseUrl: 'https://rightsstatements.org/page/NoC-US/1.0/', rightsKind: 'rights-status',
    attribution: 'Saadia Gaon, Kitāb al-Amānāt wa-l-Iʿtiqādāt, Samuel Landauer edition, E. J. Brill, 1880. Public domain.',
    scene: [386, 640], panel: [772, 1280],
    alt: 'A nineteenth-century scholarly edition page presents Saadia’s Arabic text in clear lines of printed type.',
    caption: 'Samuel Landauer’s 1880 Arabic edition of Saadia’s Book of Beliefs and Opinions.',
    historicalNote: 'This modern printed edition is used for legible access to the text and should not be mistaken for a medieval manuscript witness.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'cairo-geniza-legal-document', entityKind: 'philosopher', entityId: 'saadia-gaon', role: 'context', mediaKind: 'document',
    title: 'Cairo Geniza legal document', creator: 'Scribe Ḥalfon b. Manasseh', objectDate: '1135', institution: 'Cambridge University Library, Taylor-Schechter Genizah Collection',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Fragment_of_the_Cairo_Genizah_-_Legal_document.jpg', ...publicDomain,
    attribution: 'Ḥalfon b. Manasseh, legal document, 1135, Cambridge University Library Genizah Collection. Public domain.',
    scene: [480, 640], panel: [959, 1280],
    alt: 'An irregular tan paper fragment bears multiple lines of closely written Judeo-Arabic legal text.',
    caption: 'A dated Geniza legal document anchors philosophy in courts, contracts, language, and communal life.',
    historicalNote: 'The fragment documents one transaction and one scribal setting; it cannot represent every Geniza text or Jewish community.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'judah-halevi-letter-geniza', entityKind: 'philosopher', entityId: 'judah-halevi', role: 'primary-source', mediaKind: 'document',
    title: 'Letter by Judah Halevi concerning a prisoner’s ransom', creator: 'Judah Halevi', objectDate: '12th century', institution: 'Cambridge University Library, T-S 8J18.5',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Letter_(T-S_8J18.5).jpg', ...publicDomain,
    attribution: 'Judah Halevi, Judeo-Arabic letter, Cambridge University Library T-S 8J18.5. Public domain.',
    scene: [640, 630], panel: [1280, 1259],
    alt: 'A worn rectangular Geniza letter carries Judah Halevi’s dark Judeo-Arabic handwriting across both sides of a fold.',
    caption: 'An authentic letter by Judah Halevi concerning the ransom of a female prisoner in Toledo.',
    historicalNote: 'The letter is primary documentary evidence for Halevi’s communal life and writing, not a portrait or evidence for later death legends.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'judah-halevi-kuzari-1796', entityKind: 'philosopher', entityId: 'judah-halevi', role: 'primary-source', mediaKind: 'book-page',
    title: 'Sefer ha-Kuzari, Vienna edition', creator: 'Judah Halevi; translated by Judah ibn Tibbon; commentary by Israel Zamosz', objectDate: 'Vienna, 1796', institution: 'National Library of Israel / HebrewBooks',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Sefer_ha-Kuzari_(23855).pdf', ...publicDomain,
    attribution: 'Judah Halevi, Sefer ha-Kuzari, Vienna, Joseph Hraschanzky, 1796. Public domain.',
    scene: [507, 640], panel: [960, 1211],
    alt: 'The title opening of a Hebrew Kuzari edition arranges bold headings and dense commentary within a printed page.',
    caption: 'A 1796 Hebrew edition from the Kuzari’s long translation and commentary afterlife.',
    historicalNote: 'Published more than six centuries after Halevi, the edition is not the Judeo-Arabic original or a transcript of a historical Khazar debate.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'judah-halevi-divan-geniza', entityKind: 'philosopher', entityId: 'judah-halevi', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Part of Judah Halevi’s Divan', creator: 'Poems by Judah Halevi; copyist unknown', objectDate: '12th–13th century?', institution: 'Penn Libraries Cairo Genizah Collection, Halper 314',
    sourcePageUrl: 'https://openn.library.upenn.edu/Data/0002/html/h314.html', ...publicDomain,
    attribution: 'Penn Libraries, Halper 314, part of Judah Halevi’s Divan. Public Domain Mark 1.0.',
    scene: [468, 640], panel: [936, 1280],
    alt: 'A small Geniza paper leaf carries compact lines of Hebrew poetry in dark, slightly uneven script.',
    caption: 'A Cairo Geniza witness to the poetry of Judah Halevi and its material circulation.',
    historicalNote: 'The fragment is a later copy with uncertain dating, not Halevi’s autograph and not evidence for the exact performance of a poem.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'maimonides-mishnah-autograph', entityKind: 'philosopher', entityId: 'maimonides', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Maimonides’s autograph Commentary on the Mishnah', creator: 'Maimonides', objectDate: 'Egypt, about 1167–1168', institution: 'Bodleian Libraries, MS Pococke 295, fol. 295a',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Maimonides_Commentary_on_the_Mishnah.jpg', ...publicDomain,
    attribution: 'Maimonides, autograph Commentary on the Mishnah, Bodleian MS Pococke 295. Public domain.',
    scene: [473, 640], panel: [946, 1280],
    alt: 'An autograph Judeo-Arabic manuscript page by Maimonides combines dense revisions with a carefully drawn diagram.',
    caption: 'Maimonides’s own revised page makes law, argument, diagram, and Judeo-Arabic writing materially present.',
    historicalNote: 'The manuscript is authentic autograph evidence; unrelated descriptive text on the Commons page should not be imported into its identification.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'maimonides-mishneh-torah', entityKind: 'philosopher', entityId: 'maimonides', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Illuminated Mishneh Torah', creator: 'Maimonides; anonymous Spanish Jewish copyist; illumination possibly from Mateo de Ser Cambio’s workshop', objectDate: 'Copied c. 1300–1350; illuminated c. 1400', institution: 'National Library of Israel / World Digital Library',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Mishneh_Torah_WDL3962.pdf', objectPageUrl: 'https://www.loc.gov/item/2021667526/', ...publicDomain,
    attribution: 'Maimonides, Mishneh Torah, later Spanish-Italian illuminated manuscript, National Library of Israel. Public domain.',
    scene: [640, 500], panel: [1280, 1000],
    alt: 'An open Hebrew manuscript displays Maimonides’s legal text among vivid red, blue, and gold floral illuminations.',
    caption: 'A later illuminated copy witnesses the prestige and reception of Maimonides’s systematic legal code.',
    historicalNote: 'The manuscript was copied and illuminated generations after Maimonides, so it records reception rather than his working environment.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'maimonides-guide-negative-theology', entityKind: 'philosopher', entityId: 'maimonides', role: 'primary-source', mediaKind: 'manuscript',
    title: 'The Copenhagen Maimonides: Guide for the Perplexed illumination', creator: 'Levi ben Isaac ben Caro, scribe; principal illumination attributed to Ferrer Bassa', objectDate: 'Barcelona, 1347–1348', institution: 'Royal Danish Library, Cod. Heb. 37',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:14c_ed_of_the_Guide_for_the_Perplexed_by_Maimonides.jpg', objectPageUrl: 'https://www.kb.dk/en/find-materials/collections/judaica-collection/guide-perplexed', ...publicDomain,
    attribution: 'Levi ben Isaac ben Caro; principal illumination attributed to Ferrer Bassa, The Copenhagen Maimonides, Cod. Heb. 37, Barcelona, 1347–1348, Royal Danish Library. Public domain.',
    scene: [455, 640], panel: [910, 1280],
    alt: 'A fourteenth-century illuminated Hebrew page shows a seated teacher and students above decorated text panels.',
    caption: 'A 1348 reception image within a Hebrew manuscript of Maimonides’s Guide for the Perplexed.',
    historicalNote: 'The central figure is only thought to be Aristotle; the image is not a portrait of Maimonides or documentary evidence for his classroom.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'maimonides-guide-arabic', entityKind: 'philosopher', entityId: 'maimonides', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Judeo-Arabic manuscript of the Guide to the Perplexed', creator: 'Maimonides; copyist unknown', objectDate: '1200–1400; place unknown', institution: 'National Library of Israel; digitized through the Library of Congress',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:The_Guide_to_the_Perplexed_WDL3963.pdf', objectPageUrl: 'https://www.loc.gov/item/2021667527/', ...publicDomain,
    attribution: 'Maimonides, Guide to the Perplexed in Judeo-Arabic, 1200–1400, National Library of Israel / Library of Congress. Public domain.',
    scene: [432, 640], panel: [500, 741],
    alt: 'A manuscript opening carries Judeo-Arabic text in Hebrew script with rubrication and marginal marks.',
    caption: 'A later Judeo-Arabic manuscript witnesses the Guide before and alongside its Hebrew and Latin afterlives.',
    historicalNote: 'The copyist, place, and exact date are unknown; the broad 1200–1400 catalogue range should not be narrowed or treated as Maimonides’s autograph.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'moses-mendelssohn-rijksmuseum', entityKind: 'philosopher', entityId: 'maimonides', role: 'context', mediaKind: 'engraving',
    title: 'Portrait of Moses Mendelssohn', creator: 'Johann Gotthard Müller', objectDate: '1770–1775', institution: 'Rijksmuseum, RP-P-1907-2896',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Portret_van_Moses_Mendelssohn,_RP-P-1907-2896.jpg', objectPageUrl: 'https://www.rijksmuseum.nl/en/collection/object/Portret-van-Moses-Mendelssohn--d521a2916d242c43ccda9308123c7a75', ...cc0,
    derivativeNotice,
    attribution: 'Johann Gotthard Müller, Portrait of Moses Mendelssohn, 1770–1775, engraving, Rijksmuseum RP-P-1907-2896, CC0.',
    scene: [460, 640], panel: [919, 1280],
    alt: 'An eighteenth-century engraved bust portrait presents Moses Mendelssohn in profile within an oval frame.',
    caption: 'Moses Mendelssohn marks one early-modern continuation within a much larger later Jewish philosophical history.',
    historicalNote: 'The portrait is a contextual threshold and does not make Mendelssohn a canonical primary or a stand-in for all later Jewish philosophy.',
    likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .38},
  }),
  asset({
    id: 'spinoza-tractatus-1670', entityKind: 'philosopher', entityId: 'spinoza', role: 'primary-source', mediaKind: 'book-page',
    title: 'Tractatus Theologico-Politicus title page', creator: 'Benedictus de Spinoza; printed by Jan Rieuwertsz', objectDate: 'Amsterdam, 1670, under a false Hamburg imprint', institution: 'Poppelbauer Bibliothek / documented through Christie’s',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Benedictus_de_Spinoza_-_Tractatus_theologico-politicus_continens_dissertationes_aliquot,_Hamburg,_Henricus_K%C3%BCnrath,_1670.jpg', ...publicDomain,
    attribution: 'Spinoza, Tractatus Theologico-Politicus, Amsterdam, Jan Rieuwertsz, 1670. Public domain.',
    scene: [503, 640], panel: [1006, 1280],
    alt: 'The austere Latin title page of Spinoza’s 1670 Treatise gives a false Hamburg publisher and place.',
    caption: 'The anonymously issued Theological-Political Treatise marks a secondary formation-and-rupture threshold.',
    historicalNote: 'The Hamburg and Henricus Künrath imprint is false; the book was printed in Amsterdam and remains secondary in this gallery.',
    likenessStatus: 'not-applicable',
  }),
] as const satisfies readonly MuseumAssetRecord[];
