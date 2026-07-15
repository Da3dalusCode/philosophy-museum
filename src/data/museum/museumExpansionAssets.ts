import type {MuseumAssetId, MuseumAssetRecord, MuseumAssetVariant} from './museumAssetTypes';

type ExpansionHallFolder =
  | 'logic-language-science'
  | 'ethics-justice-political-life'
  | 'mind-consciousness-self';

const dimensions = {
  'peirce-sarony-portrait': {scene: [469, 640], panel: [937, 1280]},
  'peirce-existential-graphs': {scene: [483, 640], panel: [967, 1280]},
  'frege-portrait': {scene: [458, 619], panel: [458, 619]},
  'frege-begriffsschrift-1879': {scene: [401, 640], panel: [801, 1280]},
  'russell-portrait-1894': {scene: [395, 640], panel: [790, 1280]},
  'russell-on-denoting-1905': {scene: [360, 640], panel: [720, 1280]},
  'dewey-portrait-1902': {scene: [489, 640], panel: [979, 1280]},
  'dewey-democracy-education-1916': {scene: [398, 640], panel: [796, 1280]},
  'carnap-portrait': {scene: [427, 640], panel: [853, 1280]},
  'carnap-reichenbach-collection': {scene: [368, 640], panel: [735, 1280]},
  'popper-portrait-1987': {scene: [416, 640], panel: [574, 883]},
  'popper-alien-registration': {scene: [640, 335], panel: [1280, 670]},
  'quine-portrait': {scene: [501, 640], panel: [649, 829]},
  'quine-qualitative-sphere': {scene: [640, 612], panel: [1280, 1223]},
  'kuhn-portrait-1977': {scene: [640, 434], panel: [1280, 868]},
  'kuhn-structure-1962': {scene: [480, 640], panel: [867, 1156]},
  'bentham-pickering-portrait': {scene: [433, 640], panel: [866, 1280]},
  'bentham-principles-1823': {scene: [408, 640], panel: [500, 785]},
  'wollstonecraft-opie-portrait': {scene: [531, 640], panel: [1062, 1280]},
  'wollstonecraft-vindication-1792': {scene: [343, 640], panel: [686, 1280]},
  'mill-stereoscopic-portrait': {scene: [510, 640], panel: [1019, 1280]},
  'mill-on-liberty-1859': {scene: [386, 640], panel: [771, 1280]},
  'arendt-portrait-1933': {scene: [517, 640], panel: [1035, 1280]},
  'arendt-grave-bard': {scene: [640, 470], panel: [1280, 939]},
  'fanon-portrait': {scene: [461, 640], panel: [921, 1280]},
  'fanon-paris-plaque': {scene: [640, 480], panel: [1280, 960]},
  'rawls-portrait': {scene: [457, 640], panel: [914, 1280]},
  'rawls-theory-justice-1971': {scene: [429, 640], panel: [478, 713]},
  'nozick-portrait': {scene: [637, 640], panel: [1268, 1273]},
  'nozick-anarchy-state-utopia-1974': {scene: [432, 640], panel: [644, 954]},
  'habermas-portrait': {scene: [640, 427], panel: [1280, 853]},
  'habermas-lecture-2011': {scene: [640, 618], panel: [1280, 1235]},
  'patanjali-statue': {scene: [457, 640], panel: [476, 666]},
  'patanjali-yoga-sutra-manuscript': {scene: [640, 577], panel: [1029, 928]},
  'vasubandhu-statue': {scene: [465, 640], panel: [740, 1018]},
  'vasubandhu-abhidharmakosha-manuscript': {scene: [640, 488], panel: [1280, 975]},
  'william-james-portrait': {scene: [480, 640], panel: [960, 1280]},
  'william-james-principles-1890': {scene: [391, 640], panel: [782, 1280]},
  'husserl-portrait': {scene: [446, 640], panel: [893, 1280]},
  'husserl-goettingen-plaque': {scene: [640, 480], panel: [1280, 960]},
  'merleau-ponty-portrait': {scene: [454, 640], panel: [463, 652]},
  'merleau-ponty-grave': {scene: [482, 640], panel: [964, 1280]},
  'anscombe-portrait': {scene: [640, 640], panel: [1280, 1279]},
  'anscombe-philosophical-investigations-1953': {scene: [423, 640], panel: [574, 868]},
  'thomas-nagel-portrait': {scene: [640, 495], panel: [1280, 989]},
  'thomas-nagel-teaching': {scene: [576, 432], panel: [576, 432]},
  'derek-parfit-portrait': {scene: [640, 427], panel: [1280, 853]},
  'derek-parfit-repugnant-conclusion': {scene: [640, 256], panel: [1280, 512]},
} as const;

type ExpansionAssetId = keyof typeof dimensions;
type ExpansionAssetInput = Omit<MuseumAssetRecord, 'id' | 'entityKind' | 'variants'> & {
  id: ExpansionAssetId;
  hallFolder: ExpansionHallFolder;
};

const derivativeNotice = 'Resized without upscaling and converted to WebP by Philosophy Atlas.';
const publicDomainMark = {
  license: 'Public Domain Mark 1.0',
  licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  rightsKind: 'rights-status' as const,
  derivativeNotice,
};
const cc0 = {
  license: 'CC0 1.0',
  licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
  rightsKind: 'dedication' as const,
  derivativeNotice,
};
const licensed = (license: string, licenseUrl: string) => ({
  license, licenseUrl, rightsKind: 'license' as const, derivativeNotice,
});
const publicDomain = (license: string, licenseUrl: string) => ({
  license, licenseUrl, rightsKind: 'rights-status' as const, derivativeNotice,
});
const publicDomainDedication = (license: string, licenseUrl: string) => ({
  license, licenseUrl, rightsKind: 'dedication' as const, derivativeNotice,
});

const variant = (
  folder: ExpansionHallFolder,
  id: ExpansionAssetId,
  kind: 'scene' | 'panel',
): MuseumAssetVariant => {
  const [width, height] = dimensions[id][kind];
  return {path: `assets/museum/${folder}/${id}-${kind}.webp`, width, height};
};

const expansionAsset = ({hallFolder, ...record}: ExpansionAssetInput): MuseumAssetRecord => ({
  ...record,
  entityKind: 'philosopher',
  variants: {
    scene: variant(hallFolder, record.id, 'scene'),
    panel: variant(hallFolder, record.id, 'panel'),
  },
});

export const MUSEUM_EXPANSION_ASSETS = [
  expansionAsset({
    id: 'peirce-sarony-portrait', hallFolder: 'logic-language-science', entityId: 'peirce', role: 'identity', mediaKind: 'photograph',
    title: 'Charles Sanders Peirce', creator: 'Napoleon Sarony', objectDate: '1891', institution: 'New York Public Library digital collection',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Charles_Sanders_Peirce.jpg', ...publicDomainMark,
    attribution: 'Napoleon Sarony, photograph of Charles Sanders Peirce, 1891. Public domain.', alt: 'Black-and-white studio portrait of Charles Sanders Peirce with a full beard and dark coat.',
    caption: 'Napoleon Sarony’s 1891 studio portrait of Charles Sanders Peirce.', historicalNote: 'A photograph made during Peirce’s lifetime; the surviving Commons reproduction is held through the New York Public Library digital collection.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .4},
  }),
  expansionAsset({
    id: 'peirce-existential-graphs', hallFolder: 'logic-language-science', entityId: 'peirce', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Peirce manuscript MS 145, page 20', creator: 'Charles Sanders Peirce', imageCreator: 'David (Flickr user “I M A U-M-N-B-N!”)', objectDate: 'Late 19th or early 20th century; exact date not supplied on the source page', institution: 'Charles Sanders Peirce papers, Houghton Library, Harvard University',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:CS_Peirce_MS_145-_p_20.jpg', ...licensed('CC BY-SA 2.0', 'https://creativecommons.org/licenses/by-sa/2.0/'),
    attribution: 'David (Flickr user “I M A U-M-N-B-N!”), photograph of Peirce MS 145 p. 20, CC BY-SA 2.0.', alt: 'A handwritten Peirce manuscript page with prose, symbolic marks, and existential-graph diagrams.',
    caption: 'Page 20 of Peirce MS 145, discussing existential graphs.', historicalNote: 'This is a photograph of a working manuscript page, not a typeset or separately published diagram; the Commons record does not secure an exact manuscript date.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'frege-portrait', hallFolder: 'logic-language-science', entityId: 'frege', role: 'identity', mediaKind: 'photograph',
    title: 'Young Gottlob Frege', creator: 'Unknown photographer', objectDate: 'c. 1879 (approximate)', institution: 'Original source not recorded on the Commons file page',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Young_frege.jpg', ...publicDomain('Public domain (author unknown; term assumed expired)', 'https://commons.wikimedia.org/wiki/Template:PD-old-assumed'),
    attribution: 'Unknown photographer, young Gottlob Frege, c. 1879. Public domain status asserted by Wikimedia Commons.', alt: 'Small black-and-white portrait of a young Gottlob Frege with a moustache and formal jacket.',
    caption: 'Young Gottlob Frege, conventionally dated to about 1879.', historicalNote: 'The Commons file has weak provenance: its photographer and original source are not identified, and the date should remain approximate.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .4},
  }),
  expansionAsset({
    id: 'frege-begriffsschrift-1879', hallFolder: 'logic-language-science', entityId: 'frege', role: 'primary-source', mediaKind: 'book-page',
    title: 'Begriffsschrift, title page', creator: 'Gottlob Frege; Louis Nebert, publisher', objectDate: '1879', institution: 'Bibliothèque nationale de France / Gallica',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Begriffsschrift.djvu', ...publicDomainMark,
    attribution: 'Gottlob Frege, Begriffsschrift, Halle: Louis Nebert, 1879. BnF / Gallica. Public domain.', alt: 'Monochrome title page of Frege’s 1879 Begriffsschrift in German Fraktur type.',
    caption: 'Title page of Frege’s Begriffsschrift, 1879.', historicalNote: 'The local image is a raster preview of page one from the 101-page Commons DjVu, not a copy of the raw DjVu container.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'russell-portrait-1894', hallFolder: 'logic-language-science', entityId: 'russell', role: 'identity', mediaKind: 'photograph',
    title: 'Bertrand Russell', creator: 'Unknown photographer', objectDate: '1894', institution: 'Bertrand Russell Archives, McMaster University Library',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Bertrand_Russell,_1894.jpg', ...publicDomain('Public domain (author unknown; term assumed expired)', 'https://commons.wikimedia.org/wiki/Template:PD-old-assumed'),
    attribution: 'Unknown photographer, Bertrand Russell, 1894. McMaster University Library; public-domain status asserted by Wikimedia Commons.', alt: 'Young Bertrand Russell seated in profile in an 1894 black-and-white studio photograph.',
    caption: 'Bertrand Russell in 1894, early in his philosophical career.', historicalNote: 'The photograph is from Russell’s lifetime, but the photographer is unidentified and Commons relies on an assumed-expiry public-domain determination.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .38},
  }),
  expansionAsset({
    id: 'russell-on-denoting-1905', hallFolder: 'logic-language-science', entityId: 'russell', role: 'primary-source', mediaKind: 'document',
    title: '“On Denoting,” first page', creator: 'Bertrand Russell', imageCreator: 'Tom Morris', objectDate: '1905 paper; photograph published 2011', institution: 'Senate House Library, University of London',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:On_Denoting.jpg', ...licensed('CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'),
    attribution: 'Tom Morris, photograph of the first page of Bertrand Russell’s “On Denoting,” CC BY-SA 3.0.', alt: 'First printed page of Russell’s On Denoting, with a library identification strip visible at the edge.',
    caption: 'First page of Russell’s “On Denoting,” published in Mind in 1905.', historicalNote: 'The object is a photographed journal page held by Senate House Library; the CC license applies to Tom Morris’s 2011 image.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'dewey-portrait-1902', hallFolder: 'logic-language-science', entityId: 'dewey', role: 'identity', mediaKind: 'photograph',
    title: 'John Dewey', creator: 'Eva Watson-Schütze', objectDate: '1902', institution: 'Special Collections Research Center, Southern Illinois University Carbondale',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:John_Dewey_in_1902.jpg', ...publicDomainMark,
    attribution: 'Eva Watson-Schütze, John Dewey, 1902. Public domain.', alt: 'Soft-focus 1902 portrait of John Dewey in profile with a moustache and wire-rim glasses.',
    caption: 'Eva Watson-Schütze’s 1902 portrait of John Dewey.', historicalNote: 'A documented photograph made during Dewey’s lifetime and preserved through Southern Illinois University special collections.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .4},
  }),
  expansionAsset({
    id: 'dewey-democracy-education-1916', hallFolder: 'logic-language-science', entityId: 'dewey', role: 'primary-source', mediaKind: 'book-page',
    title: 'Democracy and Education, title page', creator: 'John Dewey; Macmillan, publisher', objectDate: '1916', institution: 'HathiTrust digital scan',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Democracy_and_Education_title_page.jpg', ...publicDomainMark,
    attribution: 'John Dewey, Democracy and Education, Macmillan, 1916. HathiTrust scan; public domain.', alt: 'Title page of John Dewey’s Democracy and Education, naming the author and Macmillan as publisher.',
    caption: 'Title page of Democracy and Education, 1916.', historicalNote: 'This is a title-page scan, not an image license for later editions; the 1916 text is public domain in the United States and Dewey’s 1952 death also places it beyond life-plus-70 terms.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'carnap-portrait', hallFolder: 'logic-language-science', entityId: 'carnap', role: 'identity', mediaKind: 'photograph',
    title: 'Rudolf Carnap as a child', creator: 'Unknown photographer', objectDate: '1895', institution: 'Virtual Archive of Logical Empiricism, University of Vienna',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Rudolf_Carnap_1895.jpeg', ...publicDomain('Public domain (author unknown; term assumed expired)', 'https://commons.wikimedia.org/wiki/Template:PD-old-assumed'),
    attribution: 'Unknown photographer, Rudolf Carnap as a child, 1895. University of Vienna archive; public-domain status asserted by Wikimedia Commons.', alt: 'Full-length black-and-white childhood portrait of Rudolf Carnap in formal clothing.',
    caption: 'Rudolf Carnap as a child in 1895.', historicalNote: 'This is a genuine lifetime photograph but a childhood image, not a portrait of the adult philosopher; the photographer is unknown and the public-domain determination is assumed.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .3},
  }),
  expansionAsset({
    id: 'carnap-reichenbach-collection', hallFolder: 'logic-language-science', entityId: 'carnap', role: 'context', mediaKind: 'photograph',
    title: 'Carnap and Reichenbach archival collection', creator: 'Barbara (WVS)', objectDate: '2016', institution: 'Archives of Scientific Philosophy, University of Pittsburgh',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Carnap_and_Reichenback_collection.jpg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'),
    attribution: 'Barbara (WVS), Carnap and Reichenbach archival collection, 2016, CC BY-SA 4.0.', alt: 'Archive shelves and boxes holding the Rudolf Carnap and Hans Reichenbach collections at the University of Pittsburgh.',
    caption: 'The Carnap and Reichenbach papers in Pittsburgh’s Archives of Scientific Philosophy.', historicalNote: 'A contemporary photograph of an archival collection, not a Carnap-authored primary source or an image of the philosophers themselves; the Commons filename misspells Reichenbach as “Reichenback.”', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'popper-portrait-1987', hallFolder: 'logic-language-science', entityId: 'popper', role: 'identity', mediaKind: 'photograph',
    title: 'Karl Popper', creator: 'DorianKBandy', objectDate: '1987', institution: 'Contributor’s private photograph; Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Photo_of_Karl_Popper.jpg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'),
    attribution: 'DorianKBandy, photograph of Karl Popper, 1987, CC BY-SA 4.0.', alt: 'Late-life color portrait of Karl Popper seated indoors and facing the camera.',
    caption: 'Karl Popper in 1987.', historicalNote: 'A contributor-supplied photograph made during Popper’s lifetime; Commons records the photographer under the username DorianKBandy.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .38},
  }),
  expansionAsset({
    id: 'popper-alien-registration', hallFolder: 'logic-language-science', entityId: 'popper', role: 'material-history', mediaKind: 'document',
    title: 'Karl Raimund Popper alien registration file', creator: 'New Zealand government registration authorities', imageCreator: 'Archives New Zealand', objectDate: 'Registration system 1939–1949; Popper file associated with his New Zealand exile', institution: 'Archives New Zealand, AAAC 489 Box 192 / AL 17276',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Karl_Raimund_Popper-_Alien_Registration_File_(27420130910).jpg', ...licensed('CC BY-SA 2.0', 'https://creativecommons.org/licenses/by-sa/2.0/'),
    attribution: 'Archives New Zealand, Karl Raimund Popper alien registration file, CC BY-SA 2.0.', alt: 'Wide archival image of Karl Popper’s New Zealand alien registration file with typed and handwritten fields.',
    caption: 'Popper’s alien registration record from his years in New Zealand.', historicalNote: 'A state record documenting exile and migration, not a philosophical manuscript; the digitized image was published by Archives New Zealand in 2016.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'quine-portrait', hallFolder: 'logic-language-science', entityId: 'quine', role: 'identity', mediaKind: 'photograph',
    title: 'W. V. O. Quine aboard Bluenose II', creator: 'Maryclaire Quine', objectDate: '1980', institution: 'Quine family photograph; Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Willard_Van_Orman_Quine_on_Bluenose_II_in_Halifax_NS_harbor_1980.jpg', ...licensed('CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/'),
    attribution: 'Maryclaire Quine, W. V. O. Quine aboard Bluenose II, Halifax, 1980, CC BY 4.0.', alt: 'W. V. O. Quine standing on the deck of Bluenose II in Halifax Harbour in 1980.',
    caption: 'W. V. O. Quine aboard Bluenose II in Halifax Harbour, 1980.', historicalNote: 'A family photograph made during Quine’s lifetime; the Commons derivative notes color and level adjustments to the scan.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .48, y: .38},
  }),
  expansionAsset({
    id: 'quine-qualitative-sphere', hallFolder: 'logic-language-science', entityId: 'quine', role: 'context', mediaKind: 'drawing',
    title: 'Quine’s qualitative sphere', creator: 'Jochen Burghardt', objectDate: '2014', institution: 'Wikimedia Commons contributor diagram',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Quine%27s_qualitative_sphere.pdf', ...licensed('CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'),
    attribution: 'Jochen Burghardt, Quine’s qualitative sphere, 2014, CC BY-SA 3.0.', alt: 'A circular conceptual diagram grouping colored examples to explain Quine’s qualitative-similarity sphere.',
    caption: 'A 2014 explanatory diagram of the qualitative sphere discussed in Quine’s “Natural Kinds.”', historicalNote: 'This is a later interpretive diagram following Quine’s 1970 discussion, not a diagram drawn or published by Quine; the local image is a raster preview of the Commons PDF.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'kuhn-portrait-1977', hallFolder: 'logic-language-science', entityId: 'kuhn', role: 'identity', mediaKind: 'photograph',
    title: 'Thomas Kuhn at a blackboard', creator: 'Bob Bielk', objectDate: '1977', institution: 'Princeton Weekly Bulletin, Princeton University',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Thomas_Kuhn_(1977).jpg', ...publicDomain('Public domain in the United States (published without copyright notice)', 'https://commons.wikimedia.org/wiki/Template:PD-US-no_notice'),
    attribution: 'Bob Bielk, Thomas Kuhn at a blackboard, Princeton Weekly Bulletin, 1977. Public domain in the United States.', alt: 'Thomas Kuhn standing beside a chalkboard covered with notes in a 1977 Princeton photograph.',
    caption: 'Thomas Kuhn at Princeton in 1977.', historicalNote: 'A lifetime photograph whose Commons public-domain determination relies on United States publication formalities; reuse in jurisdictions that do not follow that determination may require separate review.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .45, y: .42},
  }),
  expansionAsset({
    id: 'kuhn-structure-1962', hallFolder: 'logic-language-science', entityId: 'kuhn', role: 'material-history', mediaKind: 'book-page',
    title: 'The Structure of Scientific Revolutions, second-edition cover', creator: 'University of Chicago Press', objectDate: '1970 second edition', institution: 'Source copy described by a rare-book listing on the Commons file page',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:The_Structure_of_Scientific_Revolutions_2nd_edition_Thomas_Kuhn.jpg', ...publicDomain('Public domain (simple typographic design ineligible for copyright)', 'https://commons.wikimedia.org/wiki/Template:PD-ineligible'),
    attribution: 'University of Chicago Press, simple typographic cover of The Structure of Scientific Revolutions, second edition, 1970. Cover image treated as copyright-ineligible by Wikimedia Commons.', alt: 'Plain typographic cover of the second edition of Thomas Kuhn’s The Structure of Scientific Revolutions.',
    caption: 'Cover of the 1970 second edition of The Structure of Scientific Revolutions.', historicalNote: 'This is the second-edition cover, not the 1962 first edition. Commons treats the simple cover design as ineligible for copyright; that status does not place Kuhn’s book text in the public domain.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'bentham-pickering-portrait', hallFolder: 'ethics-justice-political-life', entityId: 'bentham', role: 'identity', mediaKind: 'painting',
    title: 'Jeremy Bentham', creator: 'Henry William Pickersgill', objectDate: '1829', institution: 'National Portrait Gallery, London, NPG 413',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Jeremy_Bentham_by_Henry_William_Pickersgill.jpg', objectPageUrl: 'https://www.npg.org.uk/collections/search/portrait/mw00542/Jeremy-Bentham', ...publicDomainMark,
    attribution: 'Henry William Pickersgill, Jeremy Bentham, exhibited 1829, National Portrait Gallery. Public domain.', alt: 'Pickersgill’s seated lifetime portrait of Jeremy Bentham in a dark coat with books beside him.',
    caption: 'Henry William Pickersgill, Jeremy Bentham, exhibited 1829.', historicalNote: 'A portrait exhibited during Bentham’s lifetime. Commons treats the old painting and faithful reproduction as public domain, despite third-party image-licensing claims sometimes attached to National Portrait Gallery reproductions.', likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .38},
  }),
  expansionAsset({
    id: 'bentham-principles-1823', hallFolder: 'ethics-justice-political-life', entityId: 'bentham', role: 'primary-source', mediaKind: 'book-page',
    title: 'An Introduction to the Principles of Morals and Legislation, title page', creator: 'Jeremy Bentham; William Pickering, publisher', objectDate: '1823 edition', institution: 'Internet Archive / University of California Libraries',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:An_introduction_to_the_principles_of_morals_and_legislation_(IA_introductiontopr01bent).pdf', ...publicDomainMark,
    attribution: 'Jeremy Bentham, An Introduction to the Principles of Morals and Legislation, London: William Pickering, 1823. Internet Archive scan; public domain.', alt: 'Title page of the 1823 edition of Bentham’s Introduction to the Principles of Morals and Legislation.',
    caption: 'Title page of the 1823 Pickering edition of Bentham’s Principles.', historicalNote: 'The work first appeared in 1789; this image is page one of an 1823 edition. The local derivative is a raster preview of the 324-page Commons PDF.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'wollstonecraft-opie-portrait', hallFolder: 'ethics-justice-political-life', entityId: 'wollstonecraft', role: 'identity', mediaKind: 'painting',
    title: 'Mary Wollstonecraft', creator: 'John Opie', objectDate: '1797', institution: 'National Portrait Gallery, London; reproduction supplied through the Museum of the American Revolution',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Mary_Wollstonecraft_Portrait.jpg', ...publicDomainMark,
    attribution: 'John Opie, Mary Wollstonecraft, 1797. Public domain.', alt: 'John Opie’s close lifetime portrait of Mary Wollstonecraft in a white headscarf.',
    caption: 'John Opie’s 1797 portrait of Mary Wollstonecraft.', historicalNote: 'Painted in the year of Wollstonecraft’s death, this is a lifetime portrait. The Commons reproduction was supplied through the Museum of the American Revolution while the painting is associated with the National Portrait Gallery.', likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .4},
  }),
  expansionAsset({
    id: 'wollstonecraft-vindication-1792', hallFolder: 'ethics-justice-political-life', entityId: 'wollstonecraft', role: 'primary-source', mediaKind: 'book-page',
    title: 'A Vindication of the Rights of Woman, title page', creator: 'Mary Wollstonecraft; J. Johnson, publisher', objectDate: '1792', institution: 'New York Public Library',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:A_Vindication_of_the_Rights_of_Woman_title_page.jpg', ...publicDomainMark,
    attribution: 'Mary Wollstonecraft, A Vindication of the Rights of Woman, London: J. Johnson, 1792. New York Public Library; public domain.', alt: 'Title page of the 1792 first edition of A Vindication of the Rights of Woman.',
    caption: 'Title page of the first edition of A Vindication of the Rights of Woman, 1792.', historicalNote: 'A scan of the first-edition title page, not a modern reprint. Wollstonecraft died in 1797, so the work is unambiguously beyond life-plus-70 terms even where Commons foregrounds United States status.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'mill-stereoscopic-portrait', hallFolder: 'ethics-justice-political-life', entityId: 'mill', role: 'identity', mediaKind: 'photograph',
    title: 'John Stuart Mill', creator: 'London Stereoscopic Company', objectDate: 'c. 1870', institution: 'Hulton Archive reproduction',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:John_Stuart_Mill_by_London_Stereoscopic_Company,_c1870.jpg', ...publicDomainMark,
    attribution: 'London Stereoscopic Company, John Stuart Mill, c. 1870. Public domain.', alt: 'Formal late-life studio photograph of John Stuart Mill seated with one hand resting on a book.',
    caption: 'John Stuart Mill, photographed by the London Stereoscopic Company about 1870.', historicalNote: 'A lifetime photograph. Commons treats the nineteenth-century image as public domain; the immediate metadata source is the commercial Hulton Archive rather than a public collection record.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .36},
  }),
  expansionAsset({
    id: 'mill-on-liberty-1859', hallFolder: 'ethics-justice-political-life', entityId: 'mill', role: 'primary-source', mediaKind: 'book-page',
    title: 'On Liberty, first-edition title page', creator: 'John Stuart Mill; John W. Parker and Son, publisher', objectDate: '1859 page reproduced through a 1974 facsimile', institution: 'Internet Archive facsimile scan',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:On_Liberty_(first_edition_title_page_via_facsimile).jpg', ...publicDomainMark,
    attribution: 'John Stuart Mill, On Liberty, 1859 title page, reproduced through an Internet Archive facsimile. Public domain.', alt: 'Title page of John Stuart Mill’s On Liberty, identifying the 1859 London first edition.',
    caption: 'The 1859 title page of On Liberty, shown through a later facsimile scan.', historicalNote: 'The page represents the first edition, but the digital source is a 1974 Xerox microfilm facsimile; that transmission history should not be mistaken for an original-book photograph.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'arendt-portrait-1933', hallFolder: 'ethics-justice-political-life', entityId: 'arendt', role: 'identity', mediaKind: 'photograph',
    title: 'Hannah Arendt', creator: 'Unknown photographer', objectDate: '1933', institution: 'Reproduced in Elisabeth Young-Bruehl’s Hannah Arendt biography; original repository not identified on Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Hannah_Arendt_1933.jpg', ...publicDomain('Public domain (anonymous work and U.S. no-notice determination)', 'https://commons.wikimedia.org/wiki/Template:PD-anon-70-EU'),
    attribution: 'Unknown photographer, Hannah Arendt, 1933. Public-domain status asserted by Wikimedia Commons for an anonymous work and U.S. publication circumstances.', alt: 'Black-and-white 1933 portrait of a young Hannah Arendt looking directly toward the camera.',
    caption: 'Hannah Arendt in 1933, the year she fled Nazi Germany.', historicalNote: 'The photographer and original repository are unidentified. Commons relies on anonymous-work and United States publication assumptions, so jurisdictional reuse deserves separate review.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .4},
  }),
  expansionAsset({
    id: 'arendt-grave-bard', hallFolder: 'ethics-justice-political-life', entityId: 'arendt', role: 'material-history', mediaKind: 'photograph',
    title: 'Hannah Arendt’s grave at Bard College', creator: 'Loslazos', objectDate: '2015', institution: 'Bard College Cemetery, Annandale-on-Hudson, New York',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:HannahArendtGrave-BardCollege.jpg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'),
    attribution: 'Loslazos, Hannah Arendt’s grave at Bard College, 2015, CC BY-SA 4.0.', alt: 'Hannah Arendt’s simple grave marker among grass and trees at Bard College Cemetery.',
    caption: 'Hannah Arendt’s grave at Bard College, photographed in 2015.', historicalNote: 'A material site of memory, not a primary source or portrait. It helps locate Arendt’s later American institutional life without substituting commemoration for her texts.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'fanon-portrait', hallFolder: 'ethics-justice-political-life', entityId: 'fanon', role: 'identity', mediaKind: 'photograph',
    title: 'Frantz Fanon', creator: 'Unknown photographer', objectDate: 'Photographed before 1961; reproduced on a 1967 U.S. dust jacket', institution: 'Grove Press dust jacket for Black Skin, White Masks; source copy not identified',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Photograph_of_Frantz_Fanon_from_Black_Skin_White_Masks_(1967)_dust_jacket.webp', ...publicDomain('Public domain in the United States (dust jacket published without notice)', 'https://commons.wikimedia.org/wiki/Template:PD-US-no_notice'),
    attribution: 'Unknown photographer, Frantz Fanon, reproduced on the 1967 Grove Press dust jacket of Black Skin, White Masks. Public domain in the United States per Wikimedia Commons.', alt: 'Black-and-white head-and-shoulders portrait of Frantz Fanon reproduced from a 1967 book jacket.',
    caption: 'Frantz Fanon, from the 1967 U.S. dust jacket of Black Skin, White Masks.', historicalNote: 'The 1967 date belongs to the dust jacket, not the capture: Fanon died in 1961. The photographer is unknown, and Commons’ no-notice determination is U.S.-specific rather than a globally certain rights conclusion.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .4},
  }),
  expansionAsset({
    id: 'fanon-paris-plaque', hallFolder: 'ethics-justice-political-life', entityId: 'fanon', role: 'context', mediaKind: 'photograph',
    title: 'Rue Frantz-Fanon plaque, Paris', creator: 'Chabe01', objectDate: '2024', institution: 'Rue Frantz-Fanon, 20th arrondissement, Paris',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Plaque_Rue_Frantz_Fanon_-_Paris_XX_(FR75)_-_2024-11-23_-_4.jpg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'),
    attribution: 'Chabe01, Rue Frantz-Fanon plaque, Paris, 2024, CC BY-SA 4.0.', alt: 'Paris street plaque reading Rue Frantz Fanon mounted on a building wall.',
    caption: 'A Paris street named for Frantz Fanon, photographed in 2024.', historicalNote: 'A contemporary reception and commemoration object, not a primary source, portrait, or record of Fanon’s own years in France.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'rawls-portrait', hallFolder: 'ethics-justice-political-life', entityId: 'rawls', role: 'identity', mediaKind: 'photograph',
    title: 'John Rawls', creator: 'Alec Rawls', objectDate: '1971', institution: 'First U.S. hardcover dust jacket of A Theory of Justice',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:John_Rawls_(1971_photo_portrait).jpg', ...publicDomain('Public domain in the United States (dust jacket published without notice)', 'https://commons.wikimedia.org/wiki/Template:PD-US-no_notice'),
    attribution: 'Alec Rawls, portrait of John Rawls from the 1971 U.S. dust jacket of A Theory of Justice. Public domain in the United States per Wikimedia Commons.', alt: 'Black-and-white 1971 portrait of John Rawls in a suit and tie.',
    caption: 'Alec Rawls’s 1971 portrait of John Rawls.', historicalNote: 'A lifetime portrait extracted from the first U.S. hardcover dust jacket. Commons’ public-domain finding depends on U.S. publication formalities and may not settle rights in every jurisdiction.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .4},
  }),
  expansionAsset({
    id: 'rawls-theory-justice-1971', hallFolder: 'ethics-justice-political-life', entityId: 'rawls', role: 'material-history', mediaKind: 'book-page',
    title: 'A Theory of Justice, first American hardcover', creator: 'Harvard University Press', objectDate: '1971', institution: 'Source copy described by Raptis Rare Books on the Commons file page',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:A_Theory_of_Justice_-_first_American_hardcover_edition.jpg', ...publicDomain('Public domain (simple typographic design ineligible for copyright)', 'https://commons.wikimedia.org/wiki/Template:PD-ineligible'),
    attribution: 'Harvard University Press, simple typographic cover of A Theory of Justice, 1971. Cover image treated as copyright-ineligible by Wikimedia Commons.', alt: 'Plain green first-edition cover of John Rawls’s A Theory of Justice with simple white lettering.',
    caption: 'The first American hardcover of A Theory of Justice, 1971.', historicalNote: 'A material witness to the book’s publication, not an illustration of the original position. Commons’ treatment of the simple cover does not place Rawls’s copyrighted text in the public domain.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'nozick-portrait', hallFolder: 'ethics-justice-political-life', entityId: 'nozick', role: 'identity', mediaKind: 'photograph',
    title: 'Robert Nozick', creator: 'Unknown photographer', objectDate: '1977', institution: 'Libertarian Review, December 1977 cover',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Robert_Nozick_1977_Libertarian_Review_cover.jpg', ...publicDomain('Public domain in the United States (defective or absent notice)', 'https://commons.wikimedia.org/wiki/Template:PD-US-no_notice'),
    attribution: 'Unknown photographer, Robert Nozick, extracted and retouched from the December 1977 Libertarian Review cover. Public domain in the United States per Wikimedia Commons.', alt: 'Close black-and-white portrait of Robert Nozick extracted from a 1977 magazine cover.',
    caption: 'Robert Nozick on the December 1977 cover of Libertarian Review.', historicalNote: 'The portrait has been extracted and retouched, its photographer is unknown, and Commons’ public-domain determination rests on U.S. notice formalities; global reuse is less certain.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .43},
  }),
  expansionAsset({
    id: 'nozick-anarchy-state-utopia-1974', hallFolder: 'ethics-justice-political-life', entityId: 'nozick', role: 'material-history', mediaKind: 'book-page',
    title: 'Anarchy, State, and Utopia, cover', creator: 'Basic Books', objectDate: 'Date uncertain in the Commons record: filename claims first edition, description says 1979', institution: 'Source copy not identified on the Commons file page',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Anarchy,_State,_and_Utopia_(first_edition).JPG', ...publicDomain('Public domain (simple typographic design ineligible for copyright)', 'https://commons.wikimedia.org/wiki/Template:PD-ineligible'),
    attribution: 'Basic Books, simple typographic cover of Anarchy, State, and Utopia. Cover image treated as copyright-ineligible by Wikimedia Commons.', alt: 'Simple red-and-black typographic cover of Robert Nozick’s Anarchy, State, and Utopia.',
    caption: 'A typographic cover of Anarchy, State, and Utopia; edition date unresolved in the source metadata.', historicalNote: 'The Commons filename calls this a first edition, but its description supplies 1979, while the book first appeared in 1974. The exhibit therefore does not assert a specific edition; the underlying book text remains copyrighted.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'habermas-portrait', hallFolder: 'ethics-justice-political-life', entityId: 'habermas', role: 'identity', mediaKind: 'photograph',
    title: 'Jürgen Habermas in discussion', creator: 'Wolfram Huke', objectDate: '2008', institution: 'Munich School of Philosophy',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:JuergenHabermas.jpg', ...licensed('CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'),
    attribution: 'Wolfram Huke, Jürgen Habermas at the Munich School of Philosophy, 2008, CC BY-SA 3.0.', alt: 'Jürgen Habermas speaking during a seated public discussion in Munich in 2008.',
    caption: 'Jürgen Habermas in discussion at the Munich School of Philosophy, 2008.', historicalNote: 'A lifetime event photograph rather than a studio portrait; it shows the public, dialogical setting central to Habermas’s intellectual role without serving as evidence for any specific doctrine.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .55, y: .38},
  }),
  expansionAsset({
    id: 'habermas-lecture-2011', hallFolder: 'ethics-justice-political-life', entityId: 'habermas', role: 'context', mediaKind: 'photograph',
    title: 'Jürgen Habermas lecturing on the European crisis', creator: 'Nikolas Becker', objectDate: '2011', institution: 'Humboldt University of Berlin',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Juergen_Habermas_2011_3-Bildausschnitt.jpg', ...licensed('CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'),
    attribution: 'Nikolas Becker, Jürgen Habermas lecturing at Humboldt University, 2011, CC BY-SA 3.0.', alt: 'Jürgen Habermas speaking at a lectern during a 2011 Humboldt University lecture.',
    caption: 'Habermas lecturing on the European Union crisis at Humboldt University, 2011.', historicalNote: 'A contextual photograph of a later public lecture, not a visual primary source for The Structural Transformation of the Public Sphere or a diagram of communicative action.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .38},
  }),
  expansionAsset({
    id: 'patanjali-statue', hallFolder: 'mind-consciousness-self', entityId: 'patanjali', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Traditional statue of Patañjali as an incarnation of Shesha', creator: 'Sculptor and location not recorded; photograph by Wikimedia contributor Rpba', objectDate: 'Photographed 2006; statue date not recorded', institution: 'Location not identified on the Commons file page',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Patanjali.jpg', ...licensed('CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'),
    attribution: 'Rpba, traditional statue of Patañjali as an incarnation of Shesha, CC BY-SA 3.0 (migrated license).', alt: 'Color photograph of a traditional many-hooded serpent form of Patañjali seated in devotional posture.',
    caption: 'A modern traditional representation of Patañjali as an incarnation of Shesha.', historicalNote: 'This is not a historical likeness. The file summary says PD-self, but its operative Commons licensing section is the migrated CC BY-SA 3.0/GFDL grant; the sculpture’s maker, date, and location are not supplied.', likenessStatus: 'later-traditional-representation', focalPoint: {x: .5, y: .42},
  }),
  expansionAsset({
    id: 'patanjali-yoga-sutra-manuscript', hallFolder: 'mind-consciousness-self', entityId: 'patanjali', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Yoga Sutras manuscript, Th 217', creator: 'Unknown copyist; text traditionally attributed to Patañjali', objectDate: 'Before 1900; exact date unknown', institution: 'National Library of India, Rare Books Division, Th 217',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Patanjali_Yoga_Sutras_manuscript.jpg', ...publicDomainMark,
    attribution: 'National Library of India, Rare Books Division, Yoga Sutras manuscript Th 217. Public domain.', alt: 'Open manuscript leaves densely written in an Indic script with red ruling and marginal marks.',
    caption: 'A pre-1900 manuscript witness to the Yoga Sutras, National Library of India Th 217.', historicalNote: 'Neither an autograph nor a securely dated early copy: the copyist and precise date are unknown, and authorship of the Yoga Sutras is traditionally rather than documentarily assigned to Patañjali. Commons’ immediate source was a National Library of India social-media post.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'vasubandhu-statue', hallFolder: 'mind-consciousness-self', entityId: 'vasubandhu', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Vasubandhu at Kōfuku-ji', creator: 'Unkei, sculptor; Shihachi Fujimoto, photographer', objectDate: 'Sculpture c. 1208; photograph published 1952', institution: 'Northern Octagonal Hall, Kōfuku-ji, Nara',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Seshin_Vasubandhu_Kofukuji.jpg', ...publicDomain('Public domain in Japan and the United States (old photograph)', 'https://commons.wikimedia.org/wiki/Template:PD-Japan-oldphoto'),
    attribution: 'Unkei, Vasubandhu, c. 1208; photograph by Shihachi Fujimoto, published 1952. Public domain in Japan and the United States per Wikimedia Commons.', alt: 'Wooden Japanese statue of Vasubandhu as an elderly monk, photographed frontally in black and white.',
    caption: 'Unkei’s c. 1208 Kōfuku-ji statue of Vasubandhu, photographed by Shihachi Fujimoto.', historicalNote: 'Made roughly eight centuries after Vasubandhu, this is a later Japanese devotional representation, not a likeness. Commons bases the photograph’s status on pre-1957 Japanese publication and non-restoration in the United States, with a caveat for possible near-simultaneous U.S. publication.', likenessStatus: 'later-traditional-representation', focalPoint: {x: .5, y: .38},
  }),
  expansionAsset({
    id: 'vasubandhu-abhidharmakosha-manuscript', hallFolder: 'mind-consciousness-self', entityId: 'vasubandhu', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Meta-Discourse on the Teachings from the Treasury (Abhidharmakośa-bhāṣya)', creator: 'Anonymous Japanese calligrapher; text transmitted through Xuanzang’s Chinese translation of Vasubandhu', objectDate: '1100s, late Heian period', institution: 'Cleveland Museum of Art, 1916.1060',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Japan,_late_Heian_period_-_Further_Discourses_on_the_Supreme_Truth_(Abidharmakosha-Bhashya)_-_1916.1060_-_Cleveland_Museum_of_Art.tif', objectPageUrl: 'https://www.clevelandart.org/art/1916.1060', ...cc0,
    attribution: 'Cleveland Museum of Art, Meta-Discourse on the Teachings from the Treasury, 1100s, accession 1916.1060, CC0.', alt: 'Horizontal indigo handscroll with columns of gold and silver Buddhist text and a faded illustrated frontispiece.',
    caption: 'Late-Heian handscroll transmitting Vasubandhu’s Abhidharmakośa-bhāṣya through Xuanzang’s Chinese translation.', historicalNote: 'This is part 17 of a thirty-part translated transmission made in Japan centuries after Vasubandhu, not an autograph or an original Indian manuscript. The local image is a raster preview of the museum’s 64.6 MB TIFF.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'william-james-portrait', hallFolder: 'mind-consciousness-self', entityId: 'william-james', role: 'identity', mediaKind: 'photograph',
    title: 'William James', creator: 'Notman Studios', objectDate: '1903', institution: 'Houghton Library, Harvard University, William James papers',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:William_James_b1842c.jpg', ...publicDomainMark,
    attribution: 'Notman Studios, William James, 1903. Houghton Library, Harvard University; public domain.', alt: 'Formal 1903 studio portrait of William James seated and holding papers.',
    caption: 'William James photographed by Notman Studios in 1903.', historicalNote: 'A documented lifetime photograph preserved with the William James papers at Harvard’s Houghton Library.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .36},
  }),
  expansionAsset({
    id: 'william-james-principles-1890', hallFolder: 'mind-consciousness-self', entityId: 'william-james', role: 'primary-source', mediaKind: 'book-page',
    title: 'The Principles of Psychology, volume I title page', creator: 'William James; Henry Holt and Company, publisher', objectDate: '1890', institution: 'Internet Archive scan',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Principles_of_Psychology_(James)_v1_pi.jpg', ...publicDomainMark,
    attribution: 'William James, The Principles of Psychology, volume I, New York: Henry Holt, 1890. Internet Archive scan; public domain.', alt: 'Title page of volume one of William James’s 1890 Principles of Psychology.',
    caption: 'Title page of the first edition of The Principles of Psychology, 1890.', historicalNote: 'A page from the first edition’s first volume, digitized through Internet Archive; it is a printed witness rather than an authorial manuscript.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'husserl-portrait', hallFolder: 'mind-consciousness-self', entityId: 'husserl', role: 'identity', mediaKind: 'photograph',
    title: 'Edmund Husserl', creator: 'Unknown photographer; associated with Mondadori Publishers', objectDate: '1910s', institution: 'Mondadori image reproduced through Getty Images',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Edmund_Husserl_1910s.jpg', ...publicDomain('Public domain in Italy as a simple photograph; anonymous-work status also asserted', 'https://commons.wikimedia.org/wiki/Template:PD-Italy'),
    attribution: 'Unknown photographer, Edmund Husserl, 1910s, Mondadori. Public-domain status in Italy and for an anonymous work asserted by Wikimedia Commons.', alt: 'Black-and-white bust-length portrait of Edmund Husserl in the 1910s wearing round glasses.',
    caption: 'Edmund Husserl in the 1910s.', historicalNote: 'The immediate source is a Getty/Mondadori reproduction and the photographer is unknown. Commons relies on Italy’s simple-photograph term and anonymous-work rules, while warning that countries without the rule of the shorter term—including some U.S. cases—may differ.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .39},
  }),
  expansionAsset({
    id: 'husserl-goettingen-plaque', hallFolder: 'mind-consciousness-self', entityId: 'husserl', role: 'context', mediaKind: 'photograph',
    title: 'Edmund Husserl commemorative plaque in Göttingen', creator: 'GeorgDerReisende', objectDate: '2022', institution: 'Hermann-Föge-Weg 7, Göttingen',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:G%C3%B6ttinger_Gedenktafel,_Husserl,_Edmund,_1,_Hermann-F%C3%B6ge-Weg_7,_Oststadt,_G%C3%B6ttingen,_Landkreis_G%C3%B6ttingen.jpg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'),
    attribution: 'GeorgDerReisende, Edmund Husserl commemorative plaque in Göttingen, 2022, CC BY-SA 4.0.', alt: 'Stone commemorative plaque for Edmund Husserl mounted on a brick house in Göttingen.',
    caption: 'The Göttingen plaque marking a house associated with Edmund Husserl.', historicalNote: 'A modern commemorative marker with secure reuse terms, not a manuscript, portrait, or philosophical primary source; its role is to anchor Husserl’s institutional geography.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'merleau-ponty-portrait', hallFolder: 'mind-consciousness-self', entityId: 'merleau-ponty', role: 'identity', mediaKind: 'photograph',
    title: 'Maurice Merleau-Ponty', creator: 'Perig Gouanvic / philosophical-investigations.org, as credited by Commons', objectDate: 'Capture date unknown; uploaded to Commons in 2010', institution: 'Source website philosophical-investigations.org; original repository not identified',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Maurice_Merleau-Ponty.jpg', ...licensed('CC BY 3.0', 'https://creativecommons.org/licenses/by/3.0/'),
    attribution: 'Perig Gouanvic / philosophical-investigations.org, photograph of Maurice Merleau-Ponty, CC BY 3.0.', alt: 'Black-and-white portrait of Maurice Merleau-Ponty resting his face against one hand.',
    caption: 'Maurice Merleau-Ponty in an undated lifetime photograph.', historicalNote: 'Commons lists 2010, but that is the upload/source date and cannot be the capture date because Merleau-Ponty died in 1961. The underlying photographer and original chain of authority are unclear despite the Commons CC BY 3.0 listing.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .42},
  }),
  expansionAsset({
    id: 'merleau-ponty-grave', hallFolder: 'mind-consciousness-self', entityId: 'merleau-ponty', role: 'material-history', mediaKind: 'photograph',
    title: 'Maurice Merleau-Ponty’s grave', creator: 'ManoSolo13241324', objectDate: '2024', institution: 'Père-Lachaise Cemetery, Paris, division 52',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Maurice_Merleau-Ponty_tombe.jpg', ...cc0,
    attribution: 'ManoSolo13241324, Maurice Merleau-Ponty’s grave at Père-Lachaise, 2024, CC0.', alt: 'Stone grave of Maurice Merleau-Ponty and Suzanne Merleau-Ponty at Père-Lachaise Cemetery.',
    caption: 'Maurice Merleau-Ponty’s grave at Père-Lachaise, photographed in 2024.', historicalNote: 'A material site of remembrance, not a primary source or likeness. The photographer dedicated the image to the public domain with CC0.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'anscombe-portrait', hallFolder: 'mind-consciousness-self', entityId: 'anscombe', role: 'identity', mediaKind: 'drawing',
    title: 'Digital portrait of G. E. M. Anscombe', creator: 'Albarluque', objectDate: '2014', institution: 'Llotja / Amical Wikimedia illustration collaboration',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Elisabeth_Anscombe.jpg', ...licensed('CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'),
    attribution: 'Albarluque, digital portrait of G. E. M. Anscombe, 2014, CC BY-SA 3.0.', alt: 'Square digital illustrated portrait of G. E. M. Anscombe against a dark background.',
    caption: 'A 2014 digital interpretation of G. E. M. Anscombe.', historicalNote: 'Created thirteen years after Anscombe’s death, this is a posthumous interpretive drawing rather than a documentary photograph or independently authenticated likeness.', likenessStatus: 'posthumous-portrait', focalPoint: {x: .5, y: .42},
  }),
  expansionAsset({
    id: 'anscombe-philosophical-investigations-1953', hallFolder: 'mind-consciousness-self', entityId: 'anscombe', role: 'context', mediaKind: 'book-page',
    title: 'Philosophical Investigations, first-edition cover', creator: 'Basil Blackwell, publisher; G. E. M. Anscombe, translator', objectDate: '1953', institution: 'Source copy described by Left Bank Books on the Commons file page',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Ludwig_Wittgenstein_-_Philosophical_Investigations,_1953.jpg', ...publicDomain('Public domain (simple typographic design ineligible for copyright)', 'https://commons.wikimedia.org/wiki/Template:PD-ineligible'),
    attribution: 'Basil Blackwell, simple typographic first-edition cover of Wittgenstein’s Philosophical Investigations, translated by G. E. M. Anscombe, 1953. Cover image treated as copyright-ineligible by Wikimedia Commons.', alt: 'Blue cloth and simple printed dust jacket of the 1953 bilingual first edition of Philosophical Investigations.',
    caption: 'The 1953 first edition of Philosophical Investigations, translated by G. E. M. Anscombe.', historicalNote: 'This object documents Anscombe’s translation and editorial role, not her own book Intention. Commons’ treatment of the simple jacket does not make Wittgenstein’s or Anscombe’s copyrighted text public domain.', likenessStatus: 'not-applicable',
  }),
  expansionAsset({
    id: 'thomas-nagel-portrait', hallFolder: 'mind-consciousness-self', entityId: 'thomas-nagel', role: 'identity', mediaKind: 'photograph',
    title: 'Thomas Nagel', creator: 'Wikimedia Commons user Nagelt', objectDate: '1978', institution: 'Contributor’s private photograph; Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Thomas_Nagel.jpg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'),
    attribution: 'Nagelt, photograph of Thomas Nagel, 1978, CC BY-SA 4.0.', alt: 'Color photograph of a young Thomas Nagel seated outdoors in 1978.',
    caption: 'Thomas Nagel in 1978.', historicalNote: 'A contributor-claimed own-work photograph made during Nagel’s lifetime; Commons does not identify a separate institutional repository.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .42},
  }),
  expansionAsset({
    id: 'thomas-nagel-teaching', hallFolder: 'mind-consciousness-self', entityId: 'thomas-nagel', role: 'context', mediaKind: 'photograph',
    title: 'Thomas Nagel teaching ethics', creator: 'Jmd442', objectDate: '2008', institution: 'New York University',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Thomas_Nagel_teaching_Ethics.JPG', ...licensed('CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'),
    attribution: 'Jmd442, Thomas Nagel teaching undergraduate ethics at New York University, 2008, CC BY-SA 3.0.', alt: 'Thomas Nagel standing at the front of an NYU classroom while teaching ethics in 2008.',
    caption: 'Thomas Nagel teaching undergraduate ethics at NYU, 2008.', historicalNote: 'A contextual classroom photograph, not a source specifically tied to “What Is It Like to Be a Bat?” or a diagram of Nagel’s account of consciousness.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .52, y: .42},
  }),
  expansionAsset({
    id: 'derek-parfit-portrait', hallFolder: 'mind-consciousness-self', entityId: 'derek-parfit', role: 'identity', mediaKind: 'photograph',
    title: 'Derek Parfit at Harvard', creator: 'Anna Riedl', objectDate: '2015', institution: 'Harvard University event photograph',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Derek_Parfit_at_Harvard-April_21,_2015-Effective_Altruism.jpg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'),
    attribution: 'Anna Riedl, Derek Parfit at Harvard, 2015, CC BY-SA 4.0.', alt: 'Derek Parfit speaking at a Harvard event in 2015 with a projection screen behind him.',
    caption: 'Derek Parfit at a Harvard effective-altruism event in 2015.', historicalNote: 'A lifetime event photograph rather than a studio portrait; it records Parfit’s later public teaching and discussion context.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .42, y: .4},
  }),
  expansionAsset({
    id: 'derek-parfit-repugnant-conclusion', hallFolder: 'mind-consciousness-self', entityId: 'derek-parfit', role: 'context', mediaKind: 'drawing',
    title: 'Repugnant Conclusion diagram', creator: 'Wikimedia Commons user Fool~commonswiki', objectDate: '2008', institution: 'Wikimedia Commons contributor diagram',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:RepugnantConclusion.svg', ...publicDomainDedication('Public-domain dedication (PD-self)', 'https://commons.wikimedia.org/wiki/Template:PD-self'),
    attribution: 'Fool~commonswiki, Repugnant Conclusion diagram, 2008, public-domain dedication.', alt: 'Horizontal bar diagram comparing populations A through Z by welfare level and population size.',
    caption: 'A later diagram of the sequence leading to Parfit’s Repugnant Conclusion.', historicalNote: 'Created in 2008 following Reasons and Persons, chapter 17, this is not a diagram authored by Parfit. The local derivative uses a 1280-pixel PNG raster preview of the Commons SVG.', likenessStatus: 'not-applicable',
  }),
] as const satisfies readonly MuseumAssetRecord[];

export const museumExpansionAssetIds = MUSEUM_EXPANSION_ASSETS.map(({id}) => id) as MuseumAssetId[];
