import type {
  MuseumAssetId,
  MuseumAssetRecord,
  MuseumAssetVariant,
  MuseumLikenessStatus,
  MuseumMediaKind,
  MuseumVisualCharacter,
} from './museumAssetTypes';

export type UtilityLibertyCapitalGalleryAssetId =
  | 'utility-marxism-zurich-congress-1893'
  | 'utility-bentham-frye-youth'
  | 'utility-mill-watts-portrait'
  | 'utility-bentham-auto-icon'
  | 'utility-millbank-penitentiary-1829'
  | 'utility-hogarth-first-cruelty'
  | 'utility-old-bailey-1808'
  | 'liberty-harriet-taylor-npg'
  | 'liberty-suffrage-petition-newcombe'
  | 'liberty-hyde-park-railings-1866'
  | 'liberty-rochdale-pioneers-shop'
  | 'liberty-wordsworth-helvellyn'
  | 'liberty-east-india-company-coins'
  | 'utility-marx-1861-beard-portrait'
  | 'utility-feuerbach-weger-engraving'
  | 'utility-menzel-iron-rolling-mill'
  | 'utility-crystal-palace-interior'
  | 'utility-jacquard-loom'
  | 'utility-meissonier-barricade'
  | 'utility-ricardo-phillips-portrait'
  | 'utility-manchester-kersal-moor'
  | 'utility-degas-cotton-office'
  | 'utility-redgrave-sempstress'
  | 'utility-chartist-kennington-common'
  | 'utility-minard-cotton-flows-1866';

type Rights = Pick<MuseumAssetRecord, 'license' | 'licenseUrl' | 'rightsKind'>;
type AssetInput = {
  id: UtilityLibertyCapitalGalleryAssetId;
  entityKind?: MuseumAssetRecord['entityKind'];
  entityId: 'bentham' | 'mill' | 'marx' | 'marxism';
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

const folder = 'utility-liberty-history-capital';
const derivativeNotice = 'Original image retained uncropped; resized and converted to WebP by Philosophy Atlas.';
const publicDomain: Rights = {license: 'Public Domain Mark 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/', rightsKind: 'rights-status'};
const cc0: Rights = {license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/', rightsKind: 'dedication'};
const ccBy2: Rights = {license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', rightsKind: 'license'};
const anonymousUkPublicDomain: Rights = {
  license: 'Public domain (anonymous UK work; U.S. term expired)',
  licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-UK-unknown',
  rightsKind: 'rights-status',
};
const photographerDedication: Rights = {
  license: 'Public-domain dedication by the photographer',
  licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-self',
  rightsKind: 'dedication',
};

const variant = (
  id: UtilityLibertyCapitalGalleryAssetId,
  kind: 'scene' | 'panel',
  size: readonly [number, number],
): MuseumAssetVariant => ({
  path: `assets/museum/${folder}/${id}-${kind}.webp`,
  width: size[0],
  height: size[1],
});

const asset = ({id, rights, scene, panel, entityKind = 'philosopher', likenessStatus = 'not-applicable', ...input}: AssetInput): MuseumAssetRecord => ({
  ...input,
  ...rights,
  id: id as MuseumAssetId,
  entityKind,
  derivativeNotice,
  variants: {scene: variant(id, 'scene', scene), panel: variant(id, 'panel', panel)},
  likenessStatus,
});

export const UTILITY_LIBERTY_CAPITAL_GALLERY_ASSETS = [
  asset({
    id: 'utility-marxism-zurich-congress-1893', entityKind: 'branch', entityId: 'marxism', role: 'identity', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'International Socialist Workers’ Congress participants in Zürich', creator: 'Herman Greulich', objectDate: '13 August 1893', institution: 'Wikimedia Commons reproduction', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Zetkin_Engels_Bebel_at_International_Socialist_Workers_Congress_1893.png', rights: publicDomain,
    attribution: 'Herman Greulich, participants associated with the 1893 Zürich International Socialist Workers’ Congress. Public domain.', scene: [640, 384], panel: [1280, 768],
    alt: 'Clara Zetkin, Friedrich Engels, Julie and August Bebel, Eduard Bernstein, and companions pose outdoors after the 1893 Zürich congress.', caption: 'The group joins organizers and theorists whose shared Marxian inheritance already contained disputes over party, class, gender, strategy, and revision.', historicalNote: 'The photograph was taken the day after the congress closed and is not a complete delegate portrait. It visualizes one European socialist network, not Marxism’s full global history or a single agreed doctrine.', likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'utility-bentham-frye-youth', entityId: 'bentham', role: 'context', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'Jeremy Bentham, aged thirteen', creator: 'Studio of Thomas Frye', objectDate: '1760', institution: 'National Portrait Gallery, London, NPG 196', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Jeremy_Bentham_by_Thomas_Frye.jpg', objectPageUrl: 'https://www.npg.org.uk/collections/search/portrait/mw00517/Jeremy-Bentham', rights: publicDomain,
    attribution: 'Studio of Thomas Frye, Jeremy Bentham, aged thirteen, 1760, National Portrait Gallery NPG 196. Underlying painting public domain; current NPG digital-image terms are separate.', scene: [425, 640], panel: [850, 1280],
    alt: 'Thirteen-year-old Jeremy Bentham stands formally beside books and a carved table in an oil portrait.', caption: 'Frye’s studio presents Bentham’s elite classical education before his mature system of legal and administrative reform.', historicalNote: 'NPG provenance runs from Bentham’s father to Lord Lansdowne, Bowring’s later recovery from a pawnbroker, and Bowring’s 1865 gift. The portrait does not reveal Bentham’s mature doctrine.', likenessStatus: 'lifetime-portrait',
  }),
  asset({
    id: 'utility-mill-watts-portrait', entityId: 'mill', role: 'identity', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'John Stuart Mill', creator: 'George Frederic Watts', objectDate: '1873', institution: 'Watts Gallery, COMWG 86', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:George_Frederic_Watts_(1817-1904)_-_John_Stuart_Mill_(1806%E2%80%931873)_-_COMWG_86_-_Watts_Gallery.jpg', rights: publicDomain,
    attribution: 'George Frederic Watts, John Stuart Mill, 1873, Watts Gallery. Public domain.', scene: [511, 640], panel: [958, 1200],
    alt: 'An elderly John Stuart Mill faces the viewer against a dark ground.', caption: 'Watts’s late-life portrait anchors Mill’s revisions of utility through liberty, character, and equality.', historicalNote: 'Painted in the year of Mill’s death, this is a lifetime likeness rather than evidence for any single doctrine.', likenessStatus: 'lifetime-portrait',
  }),
  asset({
    id: 'utility-bentham-auto-icon', entityId: 'bentham', role: 'identity', mediaKind: 'sculpture-photograph', visualCharacter: 'material-object',
    title: 'Jeremy Bentham’s auto-icon', creator: 'Ben Paulos', objectDate: 'Photographed 3 July 2014', institution: 'University College London', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:2014-07-03_The_auto-icon_of_Jeremy_Bentham.jpg', rights: ccBy2,
    attribution: 'Ben Paulos, Jeremy Bentham’s auto-icon at UCL, 2014. CC BY 2.0.', scene: [480, 640], panel: [960, 1280],
    alt: 'Bentham’s clothed preserved skeleton sits upright in a glass display case beneath a broad hat.', caption: 'The auto-icon makes Bentham’s carefully arranged posthumous public presence part of his material afterlife.', historicalNote: 'The display contains Bentham’s skeleton and clothes with a wax replacement head. Bentham did not found UCL, and the object is not a lifetime likeness.',
  }),
  asset({
    id: 'utility-millbank-penitentiary-1829', entityId: 'bentham', role: 'context', mediaKind: 'engraving', visualCharacter: 'place-or-architecture',
    title: 'Penitentiary, Millbank, Westminster', creator: 'Thomas Hosmer Shepherd, drawn; James Tingle, engraved', objectDate: '1829', institution: 'Source record references the British Museum; exact physical copy and accession unverified', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Millbank_Penitentiary_1829.jpg', rights: publicDomain,
    attribution: 'Thomas Hosmer Shepherd and James Tingle, Millbank Penitentiary, 1829. Public domain.', scene: [640, 444], panel: [1280, 888],
    alt: 'A large radial penitentiary complex rises behind walls as carts and laborers cross the foreground.', caption: 'Millbank stages punishment as architecture, administration, surveillance, cost, and lived confinement.', historicalNote: 'Millbank was not Bentham’s Panopticon and does not document adoption of his exact plan; it contextualizes the wider rationalization of penal institutions.',
  }),
  asset({
    id: 'utility-hogarth-first-cruelty', entityId: 'bentham', role: 'context', mediaKind: 'engraving', visualCharacter: 'artwork-or-social-scene',
    title: 'The First Stage of Cruelty', creator: 'William Hogarth', objectDate: '1751', institution: 'Yale Center for British Art, B1981.25.1440', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_First_Stage_of_Cruelty,_First,_Children_Torturing_Animals_-_B1981.25.1440_-_Yale_Center_for_British_Art.jpg', rights: cc0,
    attribution: 'William Hogarth, The First Stage of Cruelty, 1751, Yale Center for British Art. CC0.', scene: [525, 640], panel: [1050, 1280],
    alt: 'A crowded London street teems with children abusing animals while adults pass through the scene.', caption: 'Hogarth makes animal suffering and habituated cruelty visible before Bentham’s famous sentience question.', historicalNote: 'The print predates Bentham and is moral satire, not an illustration he commissioned or proof of direct influence.',
  }),
  asset({
    id: 'utility-old-bailey-1808', entityId: 'bentham', role: 'context', mediaKind: 'engraving', visualCharacter: 'artwork-or-social-scene',
    title: 'The Old Bailey, plate 58 from Microcosm of London', creator: 'Thomas Rowlandson and Augustus Charles Pugin; published by Rudolph Ackermann', objectDate: '1808 design; installed scan from a 1904 edition', institution: 'Exact physical source copy and holding unverified', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Microcosm_of_London_Plate_058_-_Old_Bailey_edited.jpg', rights: publicDomain,
    attribution: 'Rowlandson and Pugin, The Old Bailey, Microcosm of London, plate 58, 1808; installed scan from a 1904 edition. Public domain.', scene: [640, 484], panel: [828, 626],
    alt: 'Judges, lawyers, defendants, spectators, and officials occupy a busy Georgian criminal courtroom in a colored print.', caption: 'Plate 58 turns Bentham’s demand for intelligible law toward evidence, procedure, publicity, and codification.', historicalNote: 'The installed Commons image is a later-edition scan, and no British Museum accession establishes the exact copy. This is authored social representation rather than neutral trial reportage.',
  }),
  asset({
    id: 'liberty-harriet-taylor-npg', entityId: 'mill', role: 'context', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'Harriet Mill (née Hardy)', creator: 'Unidentified artist', objectDate: 'c. 1834', institution: 'National Portrait Gallery, London, NPG 5489; given by F. A. von Hayek, 1982', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Harriet_Mill_from_NPG.jpg', objectPageUrl: 'https://www.npg.org.uk/collections/search/portrait?mkey=mw07681', rights: anonymousUkPublicDomain,
    attribution: 'Unidentified artist, Harriet Mill (née Hardy), oil on canvas laid on board, c. 1834, National Portrait Gallery NPG 5489. Underlying anonymous work treated as public domain; Commons records a reproduction-rights caveat.', scene: [523, 640], panel: [1046, 1280],
    alt: 'Harriet Taylor Mill wears a yellow dress and white wrap against a landscape background in a c. 1834 oil portrait.', caption: 'The c. 1834 portrait introduces Taylor Mill as an author and sustained interlocutor while the image alone reveals nothing about collaboration.', historicalNote: 'The NPG identifies the sitter, approximate date, medium, accession, and Hayek gift but not the artist. The Commons digital image carries a separate PD-Art caveat; no sentence-level authorship follows from the likeness.', likenessStatus: 'uncertain',
  }),
  asset({
    id: 'liberty-suffrage-petition-newcombe', entityId: 'mill', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'Emily Davies and Elizabeth Garrett presenting the 1866 petition to John Stuart Mill', creator: 'Bertha Newcombe', objectDate: '1910, commemorating 7 June 1866', institution: 'The Women’s Library at LSE, TWL.1998.60', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:First_women%27s_suffrage_petition_hidden_under_an_apple_stall_(26510794911).jpg', objectPageUrl: 'https://www.lse.ac.uk/library/collection-highlights/the-womens-library', rights: publicDomain,
    attribution: 'Bertha Newcombe, Emily Davies and Elizabeth Garrett presenting the 1866 women’s suffrage petition to John Stuart Mill, 1910, The Women’s Library at LSE, TWL.1998.60. Public domain.', scene: [640, 574], panel: [1280, 1149],
    alt: 'In a 1910 oil painting, Emily Davies and Elizabeth Garrett stand by an apple stall and hand a rolled petition to John Stuart Mill in Westminster Hall.', caption: 'Newcombe’s 1910 movement commemoration reconstructs the 1866 petition handover rather than reporting it as an eyewitness.', historicalNote: 'The named participants and apple-stall setting belong to a retrospective suffrage image made forty-four years later. Avoid claims about which surviving physical petition copy each person carried.',
  }),
  asset({
    id: 'liberty-hyde-park-railings-1866', entityId: 'mill', role: 'context', mediaKind: 'engraving', visualCharacter: 'artwork-or-social-scene',
    title: 'To the Memory of Hyde Park Railings, that fell July 23, 1866', creator: 'Signed “Pasquin” (probably pseudonymous); published by F. Farrah, 282 Strand', objectDate: '1866', institution: 'People’s History Museum source record', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:In_Memory_of_the_Hyde_Park_Railings,_1866.jpg', rights: anonymousUkPublicDomain,
    attribution: '“Pasquin” (probably pseudonymous), To the Memory of Hyde Park Railings, published by F. Farrah, 1866. Public domain.', scene: [640, 468], panel: [1280, 936],
    alt: 'Two policemen stand beside a mock funeral monument to railings broken during a reform demonstration.', caption: 'Contemporary satire turns the Hyde Park confrontation into a question about public assembly and political voice.', historicalNote: 'The image is satire, not documentary reportage. The Reform League campaign concerned expanded manhood suffrage rather than universal suffrage.',
  }),
  asset({
    id: 'liberty-rochdale-pioneers-shop', entityId: 'mill', role: 'context', mediaKind: 'photograph', visualCharacter: 'place-or-architecture',
    title: 'Undated historic image of the Rochdale Pioneers’ shop at Toad Lane', creator: 'The Co-op Group, digital photograph/reproduction; original image maker unidentified', objectDate: 'Digital derivative captured 14 October 2015; source image undated', institution: 'Original image holding and provenance unresolved; historic site now Rochdale Pioneers Museum', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Toad_Lane,_Rochdale,_Lancashire_(27380261546).jpg', rights: ccBy2,
    attribution: 'The Co-op Group, 2015 digital photograph/reproduction of an undated historic image of the Rochdale Pioneers’ shop. CC BY 2.0; original maker and repository unresolved.', scene: [640, 440], panel: [1280, 881],
    alt: 'A 2015 digital reproduction shows an undated black-and-white image of the small brick Rochdale Pioneers’ shop on Toad Lane.', caption: 'The installed derivative anchors the 1844 cooperative site while preserving uncertainty about the older image’s maker, date, medium, and custody.', historicalNote: 'The modern file date does not date the nested historic image, and the present museum site does not prove that it holds that source image. Rochdale contextualizes but did not simply implement Mill’s program.',
  }),
  asset({
    id: 'liberty-wordsworth-helvellyn', entityId: 'mill', role: 'context', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'William Wordsworth on Helvellyn', creator: 'Benjamin Robert Haydon', objectDate: '1842', institution: 'National Portrait Gallery, London, NPG 1857', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Wordsworth_on_Helvellyn_by_Benjamin_Robert_Haydon.jpg', rights: publicDomain,
    attribution: 'Benjamin Robert Haydon, William Wordsworth on Helvellyn, 1842, National Portrait Gallery. Public domain.', scene: [522, 640], panel: [1044, 1280],
    alt: 'William Wordsworth stands with folded arms against a dramatic Helvellyn landscape that Haydon painted from memory.', caption: 'Haydon’s poetical portrait accompanies Mill’s account of Wordsworth, feeling, and cultivated individuality without depicting Mill’s recovery.', historicalNote: 'Wordsworth sat in London in June 1842 while Haydon supplied the mountain background from memory. This is not a scene from Mill’s life or evidence of a meeting between them.', likenessStatus: 'lifetime-portrait',
  }),
  asset({
    id: 'liberty-east-india-company-coins', entityId: 'mill', role: 'material-history', mediaKind: 'photograph', visualCharacter: 'material-object',
    title: 'East India Company coins, museum display', creator: 'Daderot', objectDate: 'Assorted objects of unresolved individual dates; photographed 2010', institution: 'National Museum, New Delhi', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:East_India_Company_coins_-_National_Museum,_New_Delhi_-_IMG_2224.jpg', rights: photographerDedication,
    attribution: 'Daderot, East India Company coins at the National Museum, New Delhi, 2010. Public-domain dedication.', scene: [640, 480], panel: [1280, 960],
    alt: 'Rows of assorted coins sit beneath an “East India Company” heading and regional labels in a museum display case.', caption: 'Daderot’s 2010 display photograph materializes Company coinage without identifying every object’s date, maker, accession, or provenance.', historicalNote: 'The public-domain dedication covers the photograph, not a complete history of each displayed coin. The objects do not summarize Mill’s views or every region under Company rule.',
  }),
  asset({
    id: 'utility-marx-1861-beard-portrait', entityId: 'marx', role: 'identity', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Karl Marx in London', creator: 'Richard Beard', objectDate: 'May 1861', institution: 'Wikimedia Commons reproduction', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Karl_Marx,_May_1861.jpg', rights: publicDomain,
    attribution: 'Richard Beard, Karl Marx, London, May 1861. Public domain.', scene: [399, 640], panel: [798, 1280],
    alt: 'Karl Marx stands beside a chair in a dark suit, one hand resting on its back.', caption: 'Beard’s May 1861 photograph anchors Marx during the long research and political labor behind Capital.', historicalNote: 'This is the May 1861 Beard portrait, not the better-known 1875 Mayall photograph.', likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'utility-feuerbach-weger-engraving', entityId: 'marx', role: 'context', mediaKind: 'engraving', visualCharacter: 'portrait-or-figure',
    title: 'Ludwig Feuerbach', creator: 'August Weger', objectDate: '19th century', institution: 'Wikimedia Commons reproduction', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Feuerbach_Ludwig.jpg', rights: publicDomain,
    attribution: 'August Weger, Ludwig Feuerbach, nineteenth-century engraving. Public domain.', scene: [492, 640], panel: [504, 656],
    alt: 'An engraved portrait shows bearded Ludwig Feuerbach seated with his arms folded.', caption: 'Weger’s portrait introduces Feuerbach while the exact print date, physical impression, holding, and provenance remain unresolved.', historicalNote: 'The engraving is a likeness, not evidence for doctrine. Marx’s mature critique cannot be reduced to Feuerbach, and Feuerbach should not be reduced to proto-Marx.', likenessStatus: 'attributed',
  }),
  asset({
    id: 'utility-menzel-iron-rolling-mill', entityId: 'marx', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The Iron Rolling Mill (Modern Cyclopes)', creator: 'Adolph von Menzel', objectDate: '1872–1875', institution: 'Alte Nationalgalerie, Berlin, A I 201', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg', objectPageUrl: 'https://visit.smb.museum/object/obj-958605', rights: publicDomain,
    attribution: 'Adolph von Menzel, The Iron Rolling Mill (Modern Cyclopes), 1872–1875, Alte Nationalgalerie A I 201. Public domain.', scene: [640, 397], panel: [1280, 794],
    alt: 'In a large oil painting, workers strain around glowing furnaces, rollers, wheels, and belts inside an ironworks.', caption: 'Menzel’s study-based industrial composition makes labor, heat, coordination, machinery, rest, danger, and command occupy one field.', historicalNote: 'Developed from 1872 to 1875 through studies in Berlin metal factories, the painting is not a neutral single-site photograph or direct illustration of Marx’s manuscripts.',
  }),
  asset({
    id: 'utility-crystal-palace-interior', entityId: 'marx', role: 'context', mediaKind: 'engraving', visualCharacter: 'place-or-architecture',
    title: 'The Foreign Department in the Crystal Palace', creator: 'J. McNeven', objectDate: '1851', institution: 'Victoria and Albert Museum', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Crystal_Palace_-_interior.jpg', rights: publicDomain,
    attribution: 'J. McNeven, Crystal Palace interior, 1851, Victoria and Albert Museum. Public domain.', scene: [640, 402], panel: [1280, 805],
    alt: 'Goods, statues, displays, flags, and visitors fill the immense glass-and-iron Crystal Palace.', caption: 'The Great Exhibition stages commodities and world trade as a dazzling public order whose social relations recede from view.', historicalNote: 'The scene contextualizes commodity spectacle and the world market; it does not itself demonstrate Marx’s theory of commodity fetishism.',
  }),
  asset({
    id: 'utility-jacquard-loom', entityId: 'marx', role: 'material-history', mediaKind: 'photograph', visualCharacter: 'material-object',
    title: 'Scottish handloom with Jacquard attachment', creator: 'Object probably made by Joseph Hood; photograph by Alf van Beem', objectDate: 'Nineteenth-century object; photographed 18 February 2020', institution: 'National Museums Scotland, T.1934.241', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Jacquard_loom,_photo_1.JPG', objectPageUrl: 'https://www.nms.ac.uk/discover-catalogue/the-jacquard-loom-innovation-in-textiles-and-computing', rights: cc0,
    attribution: 'Alf van Beem, 2020 photograph of a nineteenth-century Scottish handloom with Jacquard attachment, National Museums Scotland T.1934.241. CC0.', scene: [640, 480], panel: [1280, 960],
    alt: 'A wooden handloom with card chain and Jacquard attachment stands beside a partly woven textile in a museum gallery.', caption: 'The specific Scottish loom materializes stored pattern information alongside continuing preparation, maintenance, weaving skill, investment, and control.', historicalNote: 'NMS records use by Robert and James Hamilton of Stonehouse and probable manufacture by Joseph Hood of Newmilns. Punched cards did not by themselves cause exploitation or create computing.',
  }),
  asset({
    id: 'utility-meissonier-barricade', entityId: 'marx', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'La Barricade, rue de la Mortellerie, June 1848', creator: 'Jean-Louis-Ernest Meissonier', objectDate: 'c. 1850–1851, recalling June 1848', institution: 'Musée du Louvre, RF 1942-31', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Meissonier_Barricade.jpg', objectPageUrl: 'https://collections.louvre.fr/en/ark%3A/53355/cl010064313', rights: publicDomain,
    attribution: 'Jean-Louis-Ernest Meissonier, La Barricade, rue de la Mortellerie, June 1848, oil on canvas, c. 1850–1851, Musée du Louvre RF 1942-31. Public domain.', scene: [473, 640], panel: [945, 1280],
    alt: 'An oil painting shows bodies, blood, and broken barricade stones filling a narrow Paris street after the June Days fighting.', caption: 'Meissonier’s c. 1850–1851 oil confronts the June Days aftermath through a later artistic composition.', historicalNote: 'This is Louvre oil RF 1942-31, not the distinct 1848 watercolor RF 51769. It is not “Marx’s revolution,” and the June events followed the Communist Manifesto.',
  }),
  asset({
    id: 'utility-ricardo-phillips-portrait', entityId: 'marx', role: 'context', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'David Ricardo', creator: 'Thomas Phillips', objectDate: 'c. 1821', institution: 'National Portrait Gallery record NPG L241; current ownership and display to confirm', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Portrait_of_David_Ricardo_by_Thomas_Phillips.jpg', rights: publicDomain,
    attribution: 'Thomas Phillips, David Ricardo, c. 1821, National Portrait Gallery. Public domain.', scene: [496, 640], panel: [620, 800],
    alt: 'David Ricardo sits in a dark coat beside papers, turned toward the viewer.', caption: 'Ricardo made distribution among wages, profit, and rent central to classical political economy—the field Marx both learned from and transformed.', historicalNote: 'Ricardo is not a proto-Marxist; shared questions about value and distribution conceal major differences in method, politics, and historical explanation.', likenessStatus: 'lifetime-portrait',
  }),
  asset({
    id: 'utility-manchester-kersal-moor', entityId: 'marx', role: 'context', mediaKind: 'painting', visualCharacter: 'place-or-architecture',
    title: 'Manchester from Kersal Moor', creator: 'William Wyld', objectDate: '1852', institution: 'Royal Collection, RCIN 920223', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Wyld,_William_-_Manchester_from_Kersal_Moor,_with_rustic_figures_and_goats_-_Google_Art_Project.jpg', objectPageUrl: 'https://www.rct.uk/collection/publications/victoria-albert-our-lives-in-watercolour/manchester-from-kersal-moor', rights: publicDomain,
    attribution: 'William Wyld, Manchester from Kersal Moor, watercolor, 1852, Royal Collection RCIN 920223. Public domain.', scene: [640, 410], panel: [1280, 821],
    alt: 'Rustic figures and goats occupy a pastoral moor while factories and smoke spread across distant Manchester.', caption: 'Wyld’s royal-commissioned panorama makes industrial scale visible through a deliberately romantic pastoral contrast.', historicalNote: 'Commissioned after Victoria and Albert’s 1851 visit for a souvenir album, the watercolor mediates smoke, distance, and scale; it is not neutral urban data or a complete account of working-class life.',
  }),
  asset({
    id: 'utility-degas-cotton-office', entityId: 'marx', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'A Cotton Office in New Orleans', creator: 'Edgar Degas', objectDate: '1873', institution: 'Musée des Beaux-Arts de Pau, 878.1.2; acquired 1878', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Edgar_Germain_Hilaire_Degas_016.jpg', objectPageUrl: 'https://pop.culture.gouv.fr/notice/joconde/00980000397', rights: publicDomain,
    attribution: 'Edgar Degas, A Cotton Office in New Orleans, 1873, Musée des Beaux-Arts de Pau. Public domain.', scene: [640, 505], panel: [1280, 1010],
    alt: 'Merchants and relatives inspect loose cotton, read papers and a newspaper, converse, and keep accounts inside a New Orleans office.', caption: 'Cotton samples and merchants connect fiber to grading, credit, information, and a post-emancipation market while field and mill labor remain absent.', historicalNote: 'The painting depicts one merchant and family network in 1873, with plantation, dock, and mill labor absent. It does not prove the full cotton economy or make Reconstruction either unchanged slavery or completed liberation.',
  }),
  asset({
    id: 'utility-redgrave-sempstress', entityId: 'marx', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The Sempstress', creator: 'Richard Redgrave', objectDate: '1846', institution: 'Tate, T14166', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Richard_Redgrave_-_The_Sempstress.jpg', rights: publicDomain,
    attribution: 'Richard Redgrave, The Sempstress, 1846, Tate. Public domain.', scene: [640, 535], panel: [1000, 836],
    alt: 'A lone seamstress sews by a dim window in a sparse room with a clock, candle, and domestic objects.', caption: 'Redgrave’s 1846 version turns precarious, gendered, home-based labor into a subject of public moral and political concern.', historicalNote: 'Tate identifies this as the only known version of the lost original exhibited at the Royal Academy in 1844 with lines from Hood’s Song of the Shirt. It is sentimental reform painting, not statistical evidence.',
  }),
  asset({
    id: 'utility-chartist-kennington-common', entityId: 'marx', role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Chartist meeting on Kennington Common', creator: 'William Edward Kilburn; restoration by Bammesk', objectDate: '10 April 1848', institution: 'Royal Collection, RCIN 2932484', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Chartist_meeting_on_Kennington_Common_by_William_Edward_Kilburn_1848_-_restoration1.png', rights: publicDomain,
    attribution: 'William Edward Kilburn, Chartist meeting on Kennington Common, 10 April 1848; restored by Bammesk. Public domain.', scene: [640, 455], panel: [1280, 911],
    alt: 'A restored daguerreotype shows a vast crowd, platform, flags, buildings, and factory chimney on Kennington Common, with limited individual detail.', caption: 'Kilburn’s specific viewpoint makes Chartist organization visible while distance and restoration limit identification and crowd-census claims.', historicalNote: 'This restored derivative records one 10 April 1848 assembly. The Charter demanded universal male rather than universal suffrage, and the image does not represent every Chartist position.',
  }),
  asset({
    id: 'utility-minard-cotton-flows-1866', entityId: 'marx', role: 'context', mediaKind: 'drawing', visualCharacter: 'map-or-diagram',
    title: 'Carte figurative et approximative des quantités de coton brut importées en Europe en 1858, en 1864 et en 1865', creator: 'Charles Joseph Minard; Regnier et Dourdet (firm), Paris', objectDate: '1866', institution: 'Library of Congress Geography and Map Division, LCCN 99463789; G3201.J82 1865 .M5', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Carte_figurative_et_approximative_des_quantit%C3%A9s_de_coton_brut_import%C3%A9es_en_Europe_en_1858%2C_en_1864_et_en_1865_LOC_99463789.jpg', objectPageUrl: 'https://www.loc.gov/item/99463789/', rights: publicDomain,
    attribution: 'Charles Joseph Minard with Regnier et Dourdet, European raw-cotton imports in 1858, 1864, and 1865, lithographed and hand-colored, 1866, Library of Congress LCCN 99463789. Free to use and reuse.', scene: [640, 408], panel: [1280, 816],
    alt: 'Three adjacent proportional-flow maps in French compare bands of raw cotton from the United States, India, Egypt, Brazil, and elsewhere into Europe in 1858, 1864, and 1865.', caption: 'Minard’s three-panel sheet makes wartime rupture and rerouting legible while leaving labor regimes, ecology, and political coercion outside the bands.', historicalNote: 'The Library of Congress record describes three maps on one sheet and notes a sectioned, mounted copy with losses. The flows are approximate aggregate trade data, not a map of labor conditions or a complete account of emancipation.',
  }),
] as const satisfies readonly MuseumAssetRecord[];
