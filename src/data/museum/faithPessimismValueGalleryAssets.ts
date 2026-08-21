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
  | 'value-dostoevsky-perov-1872'
  | 'value-brothers-karamazov-contemplator'
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
  entityId: 'schopenhauer' | 'kierkegaard' | 'dostoevsky' | 'nietzsche';
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
    id: 'value-dostoevsky-perov-1872', entityId: 'dostoevsky', role: 'identity', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'Portrait of Fyodor Dostoevsky', creator: 'Vasily Perov', objectDate: '1872', institution: 'State Tretyakov Gallery, Moscow, inv. 386', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B9_(%D0%9F%D0%B5%D1%80%D0%BE%D0%B2,_1872)_-_%D0%A2%D1%80%D0%B5%D1%82%D1%8C%D1%8F%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F.jpg', rights: publicDomain,
    attribution: 'Vasily Perov, Portrait of Fyodor Dostoevsky, 1872, State Tretyakov Gallery, inv. 386. Public domain.', scene: [512, 640], panel: [1024, 1280],
    alt: 'Fyodor Dostoevsky sits against a dark ground with clasped hands, a brown coat, and an intent downward gaze.', caption: 'Perov’s 1872 lifetime portrait anchors a writer who tests freedom and responsibility through conflicting voices.', historicalNote: 'Perov painted Dostoevsky during the composition period of Demons. The concentrated pose is a constructed portrait, not transparent evidence of the sitter’s inner state.', likenessStatus: 'lifetime-portrait',
  }),
  asset({
    id: 'value-brothers-karamazov-contemplator', entityId: 'dostoevsky', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The Contemplator', creator: 'Ivan Kramskoi', objectDate: '1876', institution: 'Kyiv National Art Gallery', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Kramskoi_Meditator_1876.jpg', rights: publicDomain,
    attribution: 'Ivan Kramskoi, The Contemplator, 1876, Kyiv National Art Gallery. Public domain.', scene: [428, 640], panel: [802, 1200],
    alt: 'A solitary peasant in worn winter clothes stands in deep snow, motionless and absorbed in thought.', caption: 'Kramskoi’s “contemplator,” a type Dostoevsky evokes in The Brothers Karamazov, holds thought, passivity, and possible violence in unresolved tension.', historicalNote: 'The painting was not commissioned as a novel illustration. Dostoevsky refers to Kramskoi’s contemplative peasant type when characterizing Smerdyakov, so the work is used as a documented interpretive companion rather than as a portrait of the fictional character.',
  }),
  asset({
    id: 'value-kierkegaard-copenhagen-salon', entityId: 'kierkegaard', role: 'context', mediaKind: 'drawing', visualCharacter: 'artwork-or-social-scene',
    title: 'Søren Kierkegaard entering a salon in Copenhagen', creator: 'Peter Christian Klæstrup', objectDate: 'Between 1838 and 1882', institution: 'Current custody not established; sold at Bruun Rasmussen in 2005', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Peter_Christian_Kl%C3%A6strup_-_S%C3%B8ren_Kierkegaard_i_en_salon_i_K%C3%B8benhavn.png', rights: publicDomain,
    attribution: 'Peter Christian Klæstrup, Søren Kierkegaard entering a salon in Copenhagen, between 1838 and 1882; current custody not established. Public-domain work.', scene: [640, 479], panel: [1280, 957],
    alt: 'Watercolor drawing of Kierkegaard entering a salon while other figures sit and stand in the room.', caption: 'Klæstrup’s historical social scene is not an illustration of any one pseudonymous work; its present custody remains unverified.', historicalNote: 'The source records a Bruun Rasmussen sale on 19 April 2005 but no current holding institution. Wikimedia Commons distributes a reproduction and is not the object’s custodian. Kierkegaard’s pseudonyms should not be flattened into direct authorial assertions.',
  }),
  asset({
    id: 'value-nietzsche-1869-siebe-portrait', entityId: 'nietzsche', role: 'identity', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Friedrich Nietzsche in Leipzig', creator: 'Unidentified photographer, Gebrüder Siebe studio', objectDate: '25 August 1869', institution: 'Goethe- und Schiller-Archiv, Weimar, GSA 101/11 (copy)', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Nietzsche187c.jpg', rights: publicDomain,
    attribution: 'Unidentified photographer, Gebrüder Siebe studio, Friedrich Nietzsche, 25 August 1869; Goethe- und Schiller-Archiv copy, GSA 101/11. Public domain.', scene: [426, 640], panel: [852, 1280],
    alt: 'A young Friedrich Nietzsche faces the camera in spectacles, bow tie, formal jacket, and broad mustache.', caption: 'Studio portrait of Friedrich Nietzsche, Gebrüder Siebe, Leipzig, 25 August 1869; a copy is held by the Goethe- und Schiller-Archiv, GSA 101/11.', historicalNote: 'The Gebrüder Siebe studio and date are documented, but the photographer is unidentified. The archive holds a copy as GSA 101/11, and the image should not be misdated 1875 or read backward as a portrait of Nietzsche’s later doctrines.', likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'value-greek-tragedy-mask-taranto', entityId: 'nietzsche', role: 'material-history', mediaKind: 'sculpture-photograph', visualCharacter: 'material-object',
    title: 'Ancient Greek terracotta theatrical mask', creator: 'Unidentified ancient maker; photograph by Livioandronico2013', objectDate: 'Ancient object; photographed 2015', institution: 'National Archaeological Museum of Taranto', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Greek_mask_in_terracotta_in_Museo_archeologico_nazionale_(Taranto).jpg', rights: ccBySa4,
    attribution: 'Ancient Greek terracotta theatrical mask in Taranto; photograph by Livioandronico2013, 2015. CC BY-SA 4.0.', scene: [640, 426], panel: [1280, 851],
    alt: 'A painted terracotta theater mask with open mouth and eye holes rests in a museum display.', caption: 'The material mask returns Nietzsche’s Apollonian and Dionysian opposition to the theatrical practice his modern interpretation reworked.', historicalNote: 'The opposition is Nietzsche’s interpretation, not an uncontested ancient Greek doctrine; he later criticized the book’s Wagnerian framing.',
  }),
  asset({
    id: 'value-lou-andreas-salome-elvira-1897', entityId: 'nietzsche', role: 'context', mediaKind: 'photograph', visualCharacter: 'portrait-or-figure',
    title: 'Lou Andreas-Salomé', creator: 'Attributed to Atelier Elvira, Munich', objectDate: 'c. 1897', institution: 'Original print custody not verified; source is a later magazine reproduction', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Lou_Andreas-Salom%C3%A9_-_Foto_Atelier_Elvira.jpg', rights: publicDomain,
    attribution: 'Lou Andreas-Salomé, portrait attributed to Atelier Elvira, c. 1897; original print custody unverified. Commons reports a public-domain reproduction basis.', scene: [439, 640], panel: [879, 1280],
    alt: 'Lou Andreas-Salomé turns slightly to one side in a softly lit studio portrait, wearing a fur-trimmed garment.', caption: 'This later portrait introduces Andreas-Salomé as an independent author while leaving the original print’s custody and source chain unresolved.', historicalNote: 'The accessible source is a magazine reproduction rather than a collection record. The image was made about fifteen years after the 1882 Nietzsche–Rée episode and cannot document that encounter or explain Nietzsche’s philosophy.', likenessStatus: 'lifetime-photograph',
  }),
  asset({
    id: 'value-nietzsche-writing-ball', entityId: 'nietzsche', role: 'material-history', mediaKind: 'photograph', visualCharacter: 'material-object',
    title: 'Nietzsche’s Malling-Hansen writing ball', creator: 'Rasmus Malling-Hansen; photograph by B.-Christoph Streckhardt', objectDate: 'After 1878; used by Nietzsche in 1882; photographed 2011', institution: 'Klassik Stiftung Weimar, art-and-crafts collection / Nietzsche-Archiv, NKg/00329', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Nietzsches_Schreibkugel_%22Malling_Hansen%22.jpg', rights: ccBySa4,
    attribution: 'Rasmus Malling-Hansen, writing ball from Nietzsche’s estate, after 1878, serial no. 125, Klassik Stiftung Weimar NKg/00329; photograph by B.-Christoph Streckhardt, 2011. CC BY-SA 4.0.', scene: [640, 413], panel: [1280, 826],
    alt: 'Brass and steel writing ball with keys arranged around a rounded metal mechanism.', caption: 'The Klassik Stiftung Weimar preserves Nietzsche’s serial no. 125 writing ball; the Goethe- und Schiller-Archiv separately holds related typescripts.', historicalNote: 'The machine measures 22 × 25.3 × 20.8 cm and belongs to the Klassik Stiftung’s art-and-crafts collection. It did not simply cause Nietzsche’s aphoristic style; its brief use belongs to a wider history of body, medium, revision, and constraint.',
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
    alt: 'A narrow ochre-and-white villa stands behind a low fence on a Weimar street.', caption: 'Villa Silberblick housed the Nietzsche Archive after its 1897 move; the building was converted for archive use in 1900–03.', historicalNote: 'The exterior is later reception evidence, not manuscript custody made visible. Elisabeth Förster-Nietzsche shaped a selective archive; The Will to Power is not a completed book authorized by Nietzsche. Later Nazi appropriation must be distinguished from, but not used to erase, Nietzsche’s own hierarchical and anti-egalitarian claims.',
  }),
] as const satisfies readonly MuseumAssetRecord[];
