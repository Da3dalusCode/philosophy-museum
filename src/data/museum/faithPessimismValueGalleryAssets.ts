import type {
  MuseumAssetId,
  MuseumAssetRecord,
  MuseumAssetVariant,
  MuseumLikenessStatus,
  MuseumMediaKind,
  MuseumVisualCharacter,
} from './museumAssetTypes';

export type FaithPessimismValueGalleryAssetId =
  | 'value-schopenhauer-schaefer-portrait'
  | 'value-kant-hagemann-bust'
  | 'value-schopenhauer-house-1861'
  | 'value-wagner-met-portrait'
  | 'value-anquetil-duperron-medallion'
  | 'value-schopenhauer-monument-frankfurt'
  | 'value-kierkegaard-copenhagen-portrait'
  | 'value-church-our-lady-copenhagen'
  | 'value-caravaggio-sacrifice-isaac'
  | 'value-kierkegaard-corsar-cartoon'
  | 'value-regine-olsen-1870'
  | 'value-kierkegaard-copenhagen-salon'
  | 'value-nietzsche-1869-siebe-portrait'
  | 'value-greek-tragedy-mask-taranto'
  | 'value-lou-andreas-salome-elvira-1897'
  | 'value-nietzsche-writing-ball'
  | 'value-nietzsche-stone-surlej'
  | 'value-villa-silberblick-archive';

type Rights = Pick<MuseumAssetRecord, 'license' | 'licenseUrl' | 'rightsKind'>;
type AssetInput = {
  id: FaithPessimismValueGalleryAssetId;
  entityId: 'schopenhauer' | 'kierkegaard' | 'nietzsche';
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

const folder = 'faith-pessimism-life-value';
const derivativeNotice = 'Original image retained uncropped; resized and converted to WebP by Philosophy Atlas.';
const publicDomain: Rights = {license: 'Public Domain Mark 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/', rightsKind: 'rights-status'};
const cc0: Rights = {license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/', rightsKind: 'dedication'};
const ccBySa3: Rights = {license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', rightsKind: 'license'};
const ccBySa4: Rights = {license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', rightsKind: 'license'};

const variant = (
  id: FaithPessimismValueGalleryAssetId,
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

export const FAITH_PESSIMISM_VALUE_GALLERY_ASSETS = [
  asset({
    id: 'value-schopenhauer-schaefer-portrait', entityId: 'schopenhauer', role: 'identity', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Arthur Schopenhauer', creator: 'J. Schäfer', objectDate: 'March 1859', institution: 'Frankfurt am Main University Library', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Arthur_Schopenhauer_by_J_Sch%C3%A4fer,_1859.jpg', rights: publicDomain,
    attribution: 'J. Schäfer, Arthur Schopenhauer, March 1859, Frankfurt am Main University Library. Public domain.', scene: [489, 640], panel: [978, 1280],
    alt: 'An elderly Arthur Schopenhauer sits facing the camera, holding a cane and wearing a dark coat.', caption: 'A late lifetime photograph anchors Schopenhauer’s belated public recognition in Frankfurt.', historicalNote: 'Commons identifies the photographer only as “Schäfer, J.”; the first name should not be expanded without evidence.', likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'value-kant-hagemann-bust', entityId: 'schopenhauer', role: 'material-history', mediaKind: 'sculpture-photograph', visualCharacter: 'material-object',
    title: 'Bust of Immanuel Kant', creator: 'Friedrich Hagemann; photograph by Emmanuel Fromm', objectDate: 'Bust 1801; photographed 2015', institution: 'Hamburger Kunsthalle', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Bust_of_Emmanuel_Kant.jpg', rights: cc0,
    attribution: 'Friedrich Hagemann, bust of Immanuel Kant, 1801; photograph by Emmanuel Fromm, 2015. CC0.', scene: [478, 640], panel: [955, 1280],
    alt: 'A white marble bust of Immanuel Kant stands against a dark museum wall.', caption: 'Kant’s distinction between appearances and things in themselves becomes the boundary Schopenhauer both inherits and radically redraws.', historicalNote: 'Schopenhauer’s world as representation and his account of will are revisions of Kantian problems, not doctrines Kant himself held.',
  }),
  asset({
    id: 'value-schopenhauer-house-1861', entityId: 'schopenhauer', role: 'context', mediaKind: 'photograph', visualCharacter: 'place-or-architecture',
    title: 'The Schopenhauer house in Frankfurt', creator: 'Carl Friedrich Mylius', objectDate: '1861', institution: 'Historisches Museum Frankfurt, Ph 2572', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Frankfurt_Am_Main-Schopenhauerhaus-Carl_Friedrich_Mylius-1861.jpg', rights: publicDomain,
    attribution: 'Carl Friedrich Mylius, Schopenhauerhaus in Frankfurt, 1861, Historisches Museum Frankfurt. Public domain.', scene: [640, 497], panel: [1280, 994],
    alt: 'A long pale apartment building rises behind trees beside a reflective pond in Frankfurt.', caption: 'The house marks Schopenhauer’s Frankfurt years, expanded system, later essays, and the fame that arrived near the end of his life.', historicalNote: 'Mylius photographed the building in 1861, one year after Schopenhauer’s death. Schopenhauer drafted his first major work chiefly in Dresden, not here.',
  }),
  asset({
    id: 'value-wagner-met-portrait', entityId: 'schopenhauer', role: 'context', mediaKind: 'engraving', visualCharacter: 'portrait-or-figure',
    title: 'Richard Wagner', creator: 'Unidentified lithographer after a photograph by Pierre Petit', objectDate: '19th century', institution: 'Metropolitan Museum of Art, 01.2.141', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Richard_Wagner_MET_DP807085.jpg', rights: cc0,
    attribution: 'Portrait of Richard Wagner after Pierre Petit, nineteenth century, Metropolitan Museum of Art. CC0.', scene: [438, 640], panel: [877, 1280],
    alt: 'Richard Wagner appears in a formal bust-length lithographic portrait.', caption: 'Wagner’s reception of Schopenhauer shows how metaphysics of will and music entered nineteenth-century artistic argument.', historicalNote: 'Wagner’s enthusiasm does not show that Schopenhauer endorsed Wagner’s later art, politics, or uses of the philosophy.', likenessStatus: 'lifetime-portrait',
  }),
  asset({
    id: 'value-anquetil-duperron-medallion', entityId: 'schopenhauer', role: 'material-history', mediaKind: 'sculpture-photograph', visualCharacter: 'material-object',
    title: 'Anquetil-Duperron medallion', creator: 'David d’Angers', objectDate: '19th century', institution: 'Musée Carnavalet, S629', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:David_d%27Angers_-_Portrait_d%27Abraham-Hyacinthe_Anquetil-Duperron_(1731-1805),_orientaliste.jpg', rights: cc0,
    attribution: 'David d’Angers, medallion of Abraham-Hyacinthe Anquetil-Duperron, Musée Carnavalet. CC0.', scene: [637, 640], panel: [1273, 1280],
    alt: 'A circular bronze medallion shows Anquetil-Duperron in profile.', caption: 'Anquetil-Duperron’s Persian-to-Latin Oupnek’hat was the mediated route through which Schopenhauer encountered the Upanishads.', historicalNote: 'Schopenhauer did not read Sanskrit originals. His selective European reception should not be equated with Vedānta or Buddhism as a whole.',
  }),
  asset({
    id: 'value-schopenhauer-monument-frankfurt', entityId: 'schopenhauer', role: 'context', mediaKind: 'sculpture-photograph', visualCharacter: 'place-or-architecture',
    title: 'Schopenhauer monument in Frankfurt', creator: 'Friedrich Schierholz; photograph by Frank Behnsen', objectDate: 'Monument 1895; photographed 26 August 2010', institution: 'Frankfurt Wallanlagen', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:FFM_Wallanlagen_Schopenhauer-Denkmal.jpg', rights: ccBySa3,
    attribution: 'Friedrich Schierholz, Schopenhauer monument, 1895; photograph by Frank Behnsen, 2010. CC BY-SA 3.0.', scene: [480, 640], panel: [960, 1280],
    alt: 'A bronze bust of Schopenhauer rises on a tall stone pedestal in a green Frankfurt park.', caption: 'The monument makes pessimism’s later public canonization visible after decades of limited readership.', historicalNote: 'Schopenhauer’s pessimism diagnoses recurrent striving but also includes compassion, aesthetic respite, and ascetic quieting; it is not merely a gloomy temperament.',
  }),
  asset({
    id: 'value-kierkegaard-copenhagen-portrait', entityId: 'kierkegaard', role: 'identity', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'Søren Kierkegaard at his writing desk', creator: 'Luplau Janssen', objectDate: 'c. 1902', institution: 'Museum of National History, Frederiksborg Castle', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Kierkegaard_portrait.jpg', rights: publicDomain,
    attribution: 'Luplau Janssen, posthumous portrait of Søren Kierkegaard, c. 1902. Public domain.', scene: [436, 640], panel: [872, 1280],
    alt: 'Søren Kierkegaard stands at a high writing desk, reading papers beside a window.', caption: 'Janssen’s posthumous portrait foregrounds the writer whose pseudonyms turn reading into an existential task.', historicalNote: 'Painted nearly five decades after Kierkegaard’s death, this is a posthumous reconstruction and must not be labeled a lifetime likeness.', likenessStatus: 'posthumous-portrait',
  }),
  asset({
    id: 'value-church-our-lady-copenhagen', entityId: 'kierkegaard', role: 'context', mediaKind: 'photograph', visualCharacter: 'place-or-architecture',
    title: 'Interior of the Church of Our Lady, Copenhagen', creator: 'Unidentified photographer; published by Vilhelm Trydes', objectDate: '1880–1910', institution: 'Rijksmuseum, RP-F-F18138', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Interieur_van_de_Vor_Frue_Kirke_in_Kopenhagen,_RP-F-F18138.jpg', rights: cc0,
    attribution: 'Interior of the Church of Our Lady, Copenhagen, 1880–1910, Rijksmuseum. CC0.', scene: [495, 640], panel: [989, 1280],
    alt: 'A long neoclassical church nave leads between statues and columns toward the altar.', caption: 'Copenhagen’s established church gives architectural form to the Christendom Kierkegaard attacked from within Christian commitment.', historicalNote: 'The later photograph contextualizes the institution; it is not a scene of Kierkegaard composing his polemic.',
  }),
  asset({
    id: 'value-caravaggio-sacrifice-isaac', entityId: 'kierkegaard', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The Sacrifice of Isaac', creator: 'Caravaggio', objectDate: 'c. 1603', institution: 'Uffizi Gallery, 4659', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Sacrifice_of_Isaac-Caravaggio_(Uffizi).jpg', rights: publicDomain,
    attribution: 'Caravaggio, The Sacrifice of Isaac, c. 1603, Uffizi Gallery. Public domain.', scene: [640, 493], panel: [1280, 986],
    alt: 'An angel seizes Abraham’s arm as he presses a terrified Isaac toward the knife.', caption: 'The violent scene makes the incompatible ethical and religious readings staged by Fear and Trembling impossible to soften.', historicalNote: 'The 1843 book is voiced by Johannes de Silentio. Its “teleological suspension” is not a general institutional permission to override ethics.',
  }),
  asset({
    id: 'value-kierkegaard-corsar-cartoon', entityId: 'kierkegaard', role: 'context', mediaKind: 'drawing', visualCharacter: 'artwork-or-social-scene',
    title: 'Kierkegaard caricatured in Corsaren', creator: 'Unidentified cartoonist', objectDate: '1847', institution: 'Royal Danish Library context; Wikimedia Commons reproduction', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Kierkegaard_im_%27Corsar.jpg', rights: publicDomain,
    attribution: 'Unidentified cartoonist, Kierkegaard in Corsaren, 1847. Public domain.', scene: [611, 640], panel: [1222, 1280],
    alt: 'A tiny Kierkegaard stands at the center of a circular field of mocking objects, faces, and symbols.', caption: 'Corsaren’s ridicule turned the philosopher into a public spectacle and sharpened his analysis of the crowd and “the public.”', historicalNote: 'One cartoon cannot explain Kierkegaard’s philosophy; it documents a sustained episode of public mockery and social exposure.',
  }),
  asset({
    id: 'value-regine-olsen-1870', entityId: 'kierkegaard', role: 'context', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Regine Olsen', creator: 'Unidentified photographer', objectDate: '1870', institution: 'Royal Danish Library', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Regine_Olsen_(1870).jpg', rights: publicDomain,
    attribution: 'Unidentified photographer, Regine Olsen, 1870, Royal Danish Library. Public domain.', scene: [413, 640], panel: [702, 1088],
    alt: 'Regine Olsen faces the camera in a patterned dark dress with a white collar.', caption: 'Olsen appears as a historical person with an independent later life, not a code for decoding all of Kierkegaard’s writing.', historicalNote: 'The photograph was made fifteen years after Kierkegaard’s death. Their broken engagement matters, but biographical legend cannot substitute for reading the pseudonymous works.', likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'value-kierkegaard-copenhagen-salon', entityId: 'kierkegaard', role: 'context', mediaKind: 'drawing', visualCharacter: 'artwork-or-social-scene',
    title: 'Kierkegaard in a Copenhagen salon', creator: 'Peter Christian Klæstrup', objectDate: '19th century', institution: 'Wikimedia Commons reproduction', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Peter_Christian_Kl%C3%A6strup_-_S%C3%B8ren_Kierkegaard_i_en_salon_i_K%C3%B8benhavn.png', rights: publicDomain,
    attribution: 'Peter Christian Klæstrup, Søren Kierkegaard in a Copenhagen salon, nineteenth century. Public domain.', scene: [640, 479], panel: [1280, 957],
    alt: 'Kierkegaard stands among several people in a bright Copenhagen drawing room.', caption: 'The social scene frames indirect communication: a single individual speaks and reads within roles, expectations, irony, and public observation.', historicalNote: 'Kierkegaard’s pseudonyms are philosophical instruments. Johannes de Silentio, Climacus, and Anti-Climacus should not be flattened into direct authorial assertions.',
  }),
  asset({
    id: 'value-nietzsche-1869-siebe-portrait', entityId: 'nietzsche', role: 'identity', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Friedrich Nietzsche in Leipzig', creator: 'Unidentified photographer, Gebrüder Siebe studio', objectDate: '25 August 1869', institution: 'Goethe- und Schiller-Archiv copy', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Nietzsche187c.jpg', rights: publicDomain,
    attribution: 'Unidentified photographer, Gebrüder Siebe studio, Friedrich Nietzsche, 25 August 1869. Public domain.', scene: [426, 640], panel: [852, 1280],
    alt: 'A young Friedrich Nietzsche faces the camera in spectacles, formal jacket, and broad mustache.', caption: 'The 1869 studio portrait anchors Nietzsche at the threshold of his Basel philology and early work on tragedy.', historicalNote: 'The studio is documented, but Commons does not identify the photographer; the image should not be misdated 1875.', likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'value-greek-tragedy-mask-taranto', entityId: 'nietzsche', role: 'material-history', mediaKind: 'sculpture-photograph', visualCharacter: 'material-object',
    title: 'Ancient Greek terracotta theatrical mask', creator: 'Unidentified ancient maker; photograph by Livioandronico2013', objectDate: 'Ancient object; photographed 2015', institution: 'National Archaeological Museum of Taranto', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Greek_mask_in_terracotta_in_Museo_archeologico_nazionale_(Taranto).jpg', rights: ccBySa4,
    attribution: 'Ancient Greek terracotta theatrical mask in Taranto; photograph by Livioandronico2013, 2015. CC BY-SA 4.0.', scene: [640, 426], panel: [1280, 851],
    alt: 'A painted terracotta theater mask with open mouth and eye holes rests in a museum display.', caption: 'The material mask returns Nietzsche’s Apollonian and Dionysian opposition to the theatrical practice his modern interpretation reworked.', historicalNote: 'The opposition is Nietzsche’s interpretation, not an uncontested ancient Greek doctrine; he later criticized the book’s Wagnerian framing.',
  }),
  asset({
    id: 'value-lou-andreas-salome-elvira-1897', entityId: 'nietzsche', role: 'context', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Lou Andreas-Salomé', creator: 'Atelier Elvira, Munich', objectDate: 'c. 1897', institution: 'Wikimedia Commons reproduction', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Lou_Andreas-Salom%C3%A9_-_Foto_Atelier_Elvira.jpg', rights: publicDomain,
    attribution: 'Atelier Elvira, Lou Andreas-Salomé, c. 1897. Public domain.', scene: [439, 640], panel: [879, 1280],
    alt: 'Lou Andreas-Salomé looks to one side in a fur-trimmed garment in a carefully lit studio portrait.', caption: 'Andreas-Salomé enters as an independent philosopher, novelist, and later psychoanalytic writer—not as an episode in Nietzsche’s biography.', historicalNote: 'This strong lifetime portrait was made about fifteen years after the 1882 Nietzsche–Rée relationship; it is not an image of that encounter.', likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'value-nietzsche-writing-ball', entityId: 'nietzsche', role: 'material-history', mediaKind: 'photograph', visualCharacter: 'material-object',
    title: 'Nietzsche’s Malling-Hansen writing ball', creator: 'Malling-Hansen; photograph by B.-Christoph Streckhardt', objectDate: 'Used by Nietzsche in 1882; photographed 2011', institution: 'Goethe- und Schiller-Archiv context', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Nietzsches_Schreibkugel_%22Malling_Hansen%22.jpg', rights: ccBySa4,
    attribution: 'Nietzsche’s Malling-Hansen writing ball; photograph by B.-Christoph Streckhardt, 2011. CC BY-SA 4.0.', scene: [640, 413], panel: [1280, 826],
    alt: 'A compact brass writing machine bristles with keys arranged over a hemispherical mechanism.', caption: 'The writing ball records a material experiment in composition during severe eyesight and health problems.', historicalNote: 'The machine did not simply cause Nietzsche’s aphoristic style; it belongs to a wider history of body, medium, revision, and constraint.',
  }),
  asset({
    id: 'value-nietzsche-stone-surlej', entityId: 'nietzsche', role: 'context', mediaKind: 'photograph', visualCharacter: 'place-or-architecture',
    title: 'The Nietzsche Stone near Surlej', creator: 'Armin Kübelbeck', objectDate: 'Photographed 2009', institution: 'Lake Silvaplana, Graubünden', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Nietzsche-Stein_01.jpg', rights: ccBySa3,
    attribution: 'Armin Kübelbeck, Nietzsche Stone near Surlej and Lake Silvaplana, 2009. CC BY-SA 3.0.', scene: [640, 480], panel: [1280, 960],
    alt: 'A large pyramidal boulder stands beside an alpine lake and mountains with a small memorial plaque.', caption: 'Nietzsche later located the recurrence thought beside a pyramidal rock near Lake Silvaplana; the place now bears its commemorative name.', historicalNote: 'The stone is near Surlej, not Sils Maria proper. Eternal recurrence should be presented as a severe test of affirmation and an interpretive problem, not automatically a settled physical cosmology.',
  }),
  asset({
    id: 'value-villa-silberblick-archive', entityId: 'nietzsche', role: 'context', mediaKind: 'photograph', visualCharacter: 'place-or-architecture',
    title: 'Villa Silberblick and the Nietzsche Archive', creator: 'Carl Novator', objectDate: 'Photographed 2021', institution: 'Weimar', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Villa_Silberblick.jpg', rights: ccBySa4,
    attribution: 'Carl Novator, Villa Silberblick, Weimar, 2021. CC BY-SA 4.0.', scene: [480, 640], panel: [960, 1280],
    alt: 'A narrow ochre-and-white villa stands behind a low fence on a Weimar street.', caption: 'Villa Silberblick makes the posthumous Nietzsche Archive—and the power of editors, family, institutions, and reception—architecturally visible.', historicalNote: 'Elisabeth Förster-Nietzsche shaped a selective archive; The Will to Power is not a completed book authorized by Nietzsche. Later Nazi appropriation must be distinguished from, but not used to erase, Nietzsche’s own hierarchical and anti-egalitarian claims.',
  }),
] as const satisfies readonly MuseumAssetRecord[];
