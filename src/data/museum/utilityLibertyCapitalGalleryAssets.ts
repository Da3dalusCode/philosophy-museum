import type {
  MuseumAssetId,
  MuseumAssetRecord,
  MuseumAssetVariant,
  MuseumLikenessStatus,
  MuseumMediaKind,
  MuseumVisualCharacter,
} from './museumAssetTypes';

export type UtilityLibertyCapitalGalleryAssetId =
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
  entityId: 'bentham' | 'mill' | 'marx';
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

const asset = ({id, rights, scene, panel, likenessStatus = 'not-applicable', ...input}: AssetInput): MuseumAssetRecord => ({
  ...input,
  ...rights,
  id: id as MuseumAssetId,
  entityKind: 'philosopher',
  derivativeNotice,
  variants: {scene: variant(id, 'scene', scene), panel: variant(id, 'panel', panel)},
  likenessStatus,
});

export const UTILITY_LIBERTY_CAPITAL_GALLERY_ASSETS = [
  asset({
    id: 'utility-bentham-frye-youth', entityId: 'bentham', role: 'context', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'Jeremy Bentham as a young prodigy', creator: 'Thomas Frye', objectDate: 'c. 1760–1762', institution: 'National Portrait Gallery, London, NPG 196', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Jeremy_Bentham_by_Thomas_Frye.jpg', rights: publicDomain,
    attribution: 'Thomas Frye, Jeremy Bentham, c. 1760–1762, National Portrait Gallery, London. Public domain.', scene: [425, 640], panel: [850, 1280],
    alt: 'A formally dressed adolescent Jeremy Bentham stands beside books and a carved table.', caption: 'Frye portrays Bentham before his mature system, already marked by an unusually intense education.', historicalNote: 'The sitter is about twelve to fourteen. The portrait supplies biographical context and should not be read as an image of Bentham’s mature reform program.', likenessStatus: 'lifetime-portrait',
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
    title: 'Millbank Penitentiary', creator: 'Thomas Hosmer Shepherd; engraved by James Tingle', objectDate: '1829', institution: 'British Museum', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Millbank_Penitentiary_1829.jpg', rights: publicDomain,
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
    title: 'The Old Bailey courtroom', creator: 'Thomas Rowlandson and Augustus Charles Pugin; published by Rudolph Ackermann', objectDate: '1808', institution: 'British Museum', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Microcosm_of_London_Plate_058_-_Old_Bailey_edited.jpg', rights: publicDomain,
    attribution: 'Rowlandson and Pugin, The Old Bailey, Microcosm of London, 1808. Public domain.', scene: [640, 484], panel: [828, 626],
    alt: 'Judges, lawyers, defendants, spectators, and officials occupy a busy Georgian criminal courtroom.', caption: 'The courtroom turns Bentham’s demand for intelligible law toward evidence, procedure, publicity, and codification.', historicalNote: 'This authored interior is a social representation rather than neutral documentary reportage.',
  }),
  asset({
    id: 'liberty-harriet-taylor-npg', entityId: 'mill', role: 'context', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'Harriet Taylor Mill', creator: 'Unidentified artist', objectDate: 'Date unknown', institution: 'National Portrait Gallery, London, NPG 5489', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Harriet_Mill_from_NPG.jpg', rights: anonymousUkPublicDomain,
    attribution: 'Unidentified artist, Harriet Taylor Mill, National Portrait Gallery, London. Public domain.', scene: [523, 640], panel: [1046, 1280],
    alt: 'Harriet Taylor Mill wears a yellow dress and white wrap against a landscape background.', caption: 'Harriet Taylor Mill appears as an intellectual interlocutor and author, not a decorative influence behind Mill.', historicalNote: 'The National Portrait Gallery identifies the sitter, but the artist and date are unknown; the image should not be given invented lifetime metadata.', likenessStatus: 'uncertain',
  }),
  asset({
    id: 'liberty-suffrage-petition-newcombe', entityId: 'mill', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The first women’s suffrage petition reaches Westminster', creator: 'Bertha Newcombe', objectDate: '1910, reconstructing 1866', institution: 'LSE Library', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:First_women%27s_suffrage_petition_hidden_under_an_apple_stall_(26510794911).jpg', rights: publicDomain,
    attribution: 'Bertha Newcombe, reconstruction of the 1866 suffrage-petition delivery, 1910, LSE Library. Public domain.', scene: [640, 574], panel: [1280, 1149],
    alt: 'Women gather near an apple stall while a formally dressed man receives their petition in Westminster Hall.', caption: 'Newcombe reconstructs the moment Mill collected the 1866 petition that he would present in Parliament.', historicalNote: 'Painted in 1910, the scene is commemorative reconstruction, not eyewitness evidence from 1866.',
  }),
  asset({
    id: 'liberty-hyde-park-railings-1866', entityId: 'mill', role: 'context', mediaKind: 'engraving', visualCharacter: 'artwork-or-social-scene',
    title: 'In Memory of the Hyde Park Railings', creator: 'Unidentified satirical printmaker', objectDate: '1866', institution: 'People’s History Museum', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:In_Memory_of_the_Hyde_Park_Railings,_1866.jpg', rights: anonymousUkPublicDomain,
    attribution: 'Unidentified artist, In Memory of the Hyde Park Railings, 1866. Public domain.', scene: [640, 468], panel: [1280, 936],
    alt: 'Two policemen stand beside a mock funeral monument to railings broken during a reform demonstration.', caption: 'Contemporary satire turns the Hyde Park confrontation into a question about public assembly and political voice.', historicalNote: 'The image is satire, not documentary reportage. The Reform League campaign concerned expanded manhood suffrage rather than universal suffrage.',
  }),
  asset({
    id: 'liberty-rochdale-pioneers-shop', entityId: 'mill', role: 'context', mediaKind: 'photograph', visualCharacter: 'place-or-architecture',
    title: 'The Rochdale Pioneers’ shop at Toad Lane', creator: 'Unidentified historic photographer; reproduction by The Co-op Group', objectDate: 'Historic photograph, date unknown', institution: 'Rochdale Pioneers Museum', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Toad_Lane,_Rochdale,_Lancashire_(27380261546).jpg', rights: ccBy2,
    attribution: 'Historic view of the Rochdale Pioneers’ shop, reproduced by The Co-op Group. CC BY 2.0.', scene: [640, 440], panel: [1280, 881],
    alt: 'A small brick cooperative shop fronts a narrow street with goods visible in its windows.', caption: 'The surviving shop anchors cooperative association as a built experiment beyond ordinary wage dependence.', historicalNote: 'The photograph’s original date is unknown. Rochdale supplies context for cooperative practice; it did not simply implement Mill’s program.',
  }),
  asset({
    id: 'liberty-wordsworth-helvellyn', entityId: 'mill', role: 'context', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'William Wordsworth on Helvellyn', creator: 'Benjamin Robert Haydon', objectDate: '1842', institution: 'National Portrait Gallery, London, NPG 1857', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Wordsworth_on_Helvellyn_by_Benjamin_Robert_Haydon.jpg', rights: publicDomain,
    attribution: 'Benjamin Robert Haydon, William Wordsworth on Helvellyn, 1842, National Portrait Gallery. Public domain.', scene: [522, 640], panel: [1044, 1280],
    alt: 'William Wordsworth stands with folded arms on a mountain ridge beneath a dramatic sky.', caption: 'Wordsworth’s poetry helped Mill recover feeling and rethink cultivated individuality after his mental crisis.', historicalNote: 'This is a portrait of Wordsworth, not a scene from Mill’s life or evidence of a meeting between them.', likenessStatus: 'lifetime-portrait',
  }),
  asset({
    id: 'liberty-east-india-company-coins', entityId: 'mill', role: 'material-history', mediaKind: 'photograph', visualCharacter: 'material-object',
    title: 'East India Company coins', creator: 'Daderot', objectDate: 'Objects from Company rule; photographed 2010', institution: 'National Museum, New Delhi', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:East_India_Company_coins_-_National_Museum,_New_Delhi_-_IMG_2224.jpg', rights: photographerDedication,
    attribution: 'Daderot, East India Company coins at the National Museum, New Delhi, 2010. Public-domain dedication.', scene: [640, 480], panel: [1280, 960],
    alt: 'Rows of differently sized East India Company coins are arranged in a museum display case.', caption: 'Company coinage materializes the fusion of commerce, fiscal authority, sovereignty, and empire within Mill’s institutional world.', historicalNote: 'The coins do not summarize Mill’s views or every region under Company rule. They make corporate government tangible without excusing its violence.',
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
    alt: 'Ludwig Feuerbach appears bearded and seated with his arms folded.', caption: 'Feuerbach’s inversion of speculative theology helped redirect the young Marx toward material and social life.', historicalNote: 'Marx’s mature critique cannot be reduced to Feuerbach: Marx faults contemplative materialism for failing to grasp social practice and historical transformation.', likenessStatus: 'lifetime-portrait',
  }),
  asset({
    id: 'utility-menzel-iron-rolling-mill', entityId: 'marx', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The Iron Rolling Mill', creator: 'Adolph von Menzel', objectDate: '1875', institution: 'Alte Nationalgalerie, Berlin', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg', rights: publicDomain,
    attribution: 'Adolph von Menzel, The Iron Rolling Mill, 1875, Alte Nationalgalerie. Public domain.', scene: [640, 397], panel: [1280, 795],
    alt: 'Workers strain around glowing furnaces, rollers, wheels, and belts inside a vast ironworks.', caption: 'Menzel’s factory interior makes labor, heat, coordination, machinery, danger, and command occupy one field.', historicalNote: 'The painting is a mediated representation from 1875, not a factory photograph or direct illustration of Marx’s manuscripts.',
  }),
  asset({
    id: 'utility-crystal-palace-interior', entityId: 'marx', role: 'context', mediaKind: 'engraving', visualCharacter: 'place-or-architecture',
    title: 'The Foreign Department in the Crystal Palace', creator: 'J. McNeven', objectDate: '1851', institution: 'Victoria and Albert Museum', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Crystal_Palace_-_interior.jpg', rights: publicDomain,
    attribution: 'J. McNeven, Crystal Palace interior, 1851, Victoria and Albert Museum. Public domain.', scene: [640, 402], panel: [1280, 805],
    alt: 'Goods, statues, displays, flags, and visitors fill the immense glass-and-iron Crystal Palace.', caption: 'The Great Exhibition stages commodities and world trade as a dazzling public order whose social relations recede from view.', historicalNote: 'The scene contextualizes commodity spectacle and the world market; it does not itself demonstrate Marx’s theory of commodity fetishism.',
  }),
  asset({
    id: 'utility-jacquard-loom', entityId: 'marx', role: 'material-history', mediaKind: 'photograph', visualCharacter: 'material-object',
    title: 'Jacquard loom', creator: 'Alf van Beem', objectDate: 'Photographed 18 February 2020', institution: 'National Museum of Scotland', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Jacquard_loom,_photo_1.JPG', rights: cc0,
    attribution: 'Alf van Beem, Jacquard loom at the National Museum of Scotland, 2020. CC0.', scene: [640, 480], panel: [1280, 960],
    alt: 'A large wooden Jacquard loom stands in a museum gallery with its card mechanism above the weaving frame.', caption: 'The loom materializes machinery as stored knowledge, reorganized skill, investment, and workplace control.', historicalNote: 'Punched cards did not by themselves cause exploitation or computing; the object belongs inside a wider history of labor, ownership, and technical organization.',
  }),
  asset({
    id: 'utility-meissonier-barricade', entityId: 'marx', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The Barricade, rue de la Mortellerie', creator: 'Jean-Louis-Ernest Meissonier', objectDate: 'c. 1850, recalling June 1848', institution: 'Musée du Louvre, RF 1942-31', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Meissonier_Barricade.jpg', rights: publicDomain,
    attribution: 'Jean-Louis-Ernest Meissonier, The Barricade, c. 1850, Musée du Louvre. Public domain.', scene: [473, 640], panel: [945, 1280],
    alt: 'Bodies and broken barricade stones fill a narrow Paris street after the June Days fighting.', caption: 'Meissonier confronts the lethal aftermath of 1848, when revolutionary hopes split across class and political lines.', historicalNote: 'The graphic painting depicts the June Days aftermath. It is not “Marx’s revolution,” and those events followed publication of the Communist Manifesto.',
  }),
  asset({
    id: 'utility-ricardo-phillips-portrait', entityId: 'marx', role: 'context', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'David Ricardo', creator: 'Thomas Phillips', objectDate: 'c. 1821', institution: 'National Portrait Gallery, London, NPG L241', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Portrait_of_David_Ricardo_by_Thomas_Phillips.jpg', rights: publicDomain,
    attribution: 'Thomas Phillips, David Ricardo, c. 1821, National Portrait Gallery. Public domain.', scene: [496, 640], panel: [620, 800],
    alt: 'David Ricardo sits in a dark coat beside papers, turned toward the viewer.', caption: 'Ricardo made distribution among wages, profit, and rent central to classical political economy—the field Marx both learned from and transformed.', historicalNote: 'Ricardo is not a proto-Marxist; shared questions about value and distribution conceal major differences in method, politics, and historical explanation.', likenessStatus: 'lifetime-portrait',
  }),
  asset({
    id: 'utility-manchester-kersal-moor', entityId: 'marx', role: 'context', mediaKind: 'painting', visualCharacter: 'place-or-architecture',
    title: 'Manchester from Kersal Moor', creator: 'William Wyld', objectDate: '1852', institution: 'Royal Collection', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Wyld,_William_-_Manchester_from_Kersal_Moor,_with_rustic_figures_and_goats_-_Google_Art_Project.jpg', rights: publicDomain,
    attribution: 'William Wyld, Manchester from Kersal Moor, 1852, Royal Collection. Public domain.', scene: [640, 410], panel: [1280, 821],
    alt: 'A pastoral foreground gives way to a vast smoke-filled industrial Manchester on the horizon.', caption: 'Wyld’s panorama makes industrial urban scale visible while staging a contrast between countryside and Cottonopolis.', historicalNote: 'The painted view mediates smoke, distance, and scale; it is not neutral urban data or a complete account of working-class life.',
  }),
  asset({
    id: 'utility-degas-cotton-office', entityId: 'marx', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'A Cotton Office in New Orleans', creator: 'Edgar Degas', objectDate: '1873', institution: 'Musée des Beaux-Arts de Pau, 878.1.2', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Edgar_Germain_Hilaire_Degas_016.jpg', rights: publicDomain,
    attribution: 'Edgar Degas, A Cotton Office in New Orleans, 1873, Musée des Beaux-Arts de Pau. Public domain.', scene: [640, 505], panel: [1280, 1010],
    alt: 'Merchants inspect loose cotton, read, converse, and keep accounts inside a crowded New Orleans office.', caption: 'Cotton samples and merchants connect the commodity’s material fibers to finance, information, and a global market after emancipation.', historicalNote: 'The painting depicts merchants in 1873; it does not itself depict enslaved labor or prove the full history behind the commodity chain.',
  }),
  asset({
    id: 'utility-redgrave-sempstress', entityId: 'marx', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The Sempstress', creator: 'Richard Redgrave', objectDate: '1846', institution: 'Tate, T14166', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Richard_Redgrave_-_The_Sempstress.jpg', rights: publicDomain,
    attribution: 'Richard Redgrave, The Sempstress, 1846, Tate. Public domain.', scene: [640, 535], panel: [1000, 836],
    alt: 'A seamstress works alone by a dim window late at night in a sparse attic room.', caption: 'The image turns precarious, gendered, home-based labor into a subject of public moral and political concern.', historicalNote: 'This is sentimental reform painting shaped by a middle-class gaze, not transparent statistical evidence about every seamstress.',
  }),
  asset({
    id: 'utility-chartist-kennington-common', entityId: 'marx', role: 'context', mediaKind: 'photograph', visualCharacter: 'artwork-or-social-scene',
    title: 'Chartist meeting on Kennington Common', creator: 'William Edward Kilburn; restoration by Bammesk', objectDate: '10 April 1848', institution: 'Royal Collection, RCIN 2932484', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Chartist_meeting_on_Kennington_Common_by_William_Edward_Kilburn_1848_-_restoration1.png', rights: publicDomain,
    attribution: 'William Edward Kilburn, Chartist meeting on Kennington Common, 10 April 1848; restored by Bammesk. Public domain.', scene: [640, 455], panel: [1280, 911],
    alt: 'A huge crowd gathers across Kennington Common with buildings and a factory chimney beyond.', caption: 'The daguerreotype makes mass working-class organization visible before broad democratic inclusion was secured.', historicalNote: 'This restored derivative records a specific Chartist assembly; it should not be made to stand for every nineteenth-century worker or political demand.',
  }),
  asset({
    id: 'utility-minard-cotton-flows-1866', entityId: 'marx', role: 'context', mediaKind: 'drawing', visualCharacter: 'map-or-diagram',
    title: 'Cotton flows into Europe before and after the American Civil War', creator: 'Charles Joseph Minard', objectDate: '1866', institution: 'Library of Congress, Geography and Map Division, 99463789', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Carte_figurative_et_approximative_des_quantit%C3%A9s_de_coton_brut_import%C3%A9es_en_Europe_en_1858%2C_en_1864_et_en_1865_LOC_99463789.jpg', rights: publicDomain,
    attribution: 'Charles Joseph Minard, comparative cotton-flow map, 1866, Library of Congress. Public domain.', scene: [640, 408], panel: [1280, 816],
    alt: 'Three proportional-flow maps compare cotton imports into Europe in 1858, 1864, and 1865.', caption: 'Minard makes the wartime rupture in U.S. cotton and the redirection toward India, Egypt, and Brazil spatially legible.', historicalNote: 'The flows are approximate aggregate trade data, not a map of labor conditions or a complete account of slavery, emancipation, or imperial coercion.',
  }),
] as const satisfies readonly MuseumAssetRecord[];
