import type {MuseumAssetRecord, MuseumAssetVariant} from './museumAssetTypes';

type ModernAssetInput = Omit<MuseumAssetRecord, 'entityKind' | 'variants'> & {
  hallFolder: 'renaissance-reason-revolution' | 'modernity-freedom-critique';
  scene: readonly [number, number];
  panel: readonly [number, number];
};

const variant = (folder: ModernAssetInput['hallFolder'], id: string, kind: 'scene' | 'panel', size: readonly [number, number]): MuseumAssetVariant => ({
  path: `assets/museum/${folder}/${id}-${kind}.webp`,
  width: size[0],
  height: size[1],
});

const modernAsset = ({hallFolder, scene, panel, ...record}: ModernAssetInput): MuseumAssetRecord => ({
  ...record,
  entityKind: 'philosopher',
  variants: {
    scene: variant(hallFolder, record.id, 'scene', scene),
    panel: variant(hallFolder, record.id, 'panel', panel),
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

const derivativeNotice = 'Cropped only where identified by the source; resized and converted to WebP by Philosophy Atlas.';

export const EARLY_MODERN_MUSEUM_ASSETS = [
  modernAsset({
    id: 'machiavelli-santi-di-tito', hallFolder: 'renaissance-reason-revolution', entityId: 'machiavelli', role: 'identity', mediaKind: 'painting',
    title: 'Portrait of Niccolò Machiavelli', creator: 'Santi di Tito', objectDate: 'c. 1550–1600', institution: 'Palazzo Vecchio, Florence',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Santi_di_Tito_-_Niccolo_Machiavelli%27s_portrait.jpg', ...publicDomain,
    attribution: 'Santi di Tito, Portrait of Niccolò Machiavelli. Public domain.', derivativeNotice,
    scene: [577, 640], panel: [1058, 1174], alt: 'Posthumous painted portrait of Machiavelli in a dark cap and robe, turned slightly toward the viewer.',
    caption: 'Santi di Tito, posthumous portrait of Niccolò Machiavelli, later sixteenth century.',
    historicalNote: 'Painted decades after Machiavelli’s death, this is an influential reception portrait rather than a likeness made from life.', likenessStatus: 'posthumous-portrait', focalPoint: {x: .5, y: .4},
  }),
  modernAsset({
    id: 'machiavelli-prince-1532', hallFolder: 'renaissance-reason-revolution', entityId: 'machiavelli', role: 'primary-source', mediaKind: 'book-page',
    title: 'Il principe, title page', creator: 'Niccolò Machiavelli; Antonio Blado, printer', objectDate: '1532', institution: 'Bavarian State Library digital collection',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Machiavelli_Il_principe_1532_title_page.jpg', objectPageUrl: 'https://mdz-nbn-resolving.de/urn:nbn:de:bvb:12-bsb10201716-7', ...publicDomain,
    attribution: 'Niccolò Machiavelli, Il principe, Antonio Blado, 1532. Bavarian State Library. Public domain.', derivativeNotice,
    scene: [411, 640], panel: [457, 712], alt: 'Black-and-red title page of the first printed edition of Machiavelli’s Il principe.',
    caption: 'First printed edition of Il principe, Rome, 1532.', historicalNote: 'The Prince circulated in manuscript after 1513 and appeared in print five years after Machiavelli’s death.', likenessStatus: 'not-applicable',
  }),
  modernAsset({
    id: 'descartes-hals-portrait', hallFolder: 'renaissance-reason-revolution', entityId: 'descartes', role: 'identity', mediaKind: 'painting',
    title: 'Portrait of René Descartes', creator: 'Frans Hals', objectDate: '1649', institution: 'Statens Museum for Kunst, Copenhagen',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Frans_Hals,_Portrait_of_Ren%C3%A9_Descartes.jpg', objectPageUrl: 'https://open.smk.dk/artwork/image/KMSsp407', ...publicDomain,
    attribution: 'Frans Hals, Portrait of René Descartes, 1649, Statens Museum for Kunst. Public domain.', derivativeNotice,
    scene: [471, 640], panel: [943, 1280], alt: 'Frans Hals portrait of Descartes in a black coat with long dark hair and a direct gaze.',
    caption: 'Frans Hals, Portrait of René Descartes, 1649.', historicalNote: 'Painted during Descartes’s lifetime, shortly before he left the Netherlands for Sweden.', likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .38},
  }),
  modernAsset({
    id: 'descartes-discourse-1637', hallFolder: 'renaissance-reason-revolution', entityId: 'descartes', role: 'primary-source', mediaKind: 'book-page',
    title: 'Discours de la méthode, title page', creator: 'René Descartes; Jan Maire, printer', objectDate: '1637', institution: 'Leeds University Library',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Descartes_Discours_de_la_Methode.jpg', ...publicDomain,
    attribution: 'René Descartes, Discours de la méthode, Jan Maire, 1637. Leeds University Library. Public domain.', derivativeNotice,
    scene: [429, 584], panel: [429, 584], alt: 'Title page of Descartes’s 1637 Discourse on Method in its original French edition.',
    caption: 'Discours de la méthode, Leiden, 1637.', historicalNote: 'The Discourse introduced three scientific essays and presented a public, vernacular account of Descartes’s method.', likenessStatus: 'not-applicable',
  }),
  modernAsset({
    id: 'hobbes-wright-portrait', hallFolder: 'renaissance-reason-revolution', entityId: 'hobbes', role: 'identity', mediaKind: 'painting',
    title: 'Portrait of Thomas Hobbes', creator: 'John Michael Wright', objectDate: 'c. 1669–1670', institution: 'National Portrait Gallery, London',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Thomas_Hobbes_by_John_Michael_Wright.jpg', objectPageUrl: 'https://www.npg.org.uk/collections/search/portrait/mw03139/Thomas-Hobbes', ...publicDomain,
    attribution: 'John Michael Wright, Portrait of Thomas Hobbes, c. 1669–1670. Public domain.', derivativeNotice,
    scene: [524, 640], panel: [1049, 1280], alt: 'Painted portrait of an elderly Thomas Hobbes in black robes with long white hair.',
    caption: 'John Michael Wright, Thomas Hobbes, c. 1669–1670.', historicalNote: 'A lifetime portrait made when Hobbes was in his eighties; the digital reproduction’s status can vary by jurisdiction.', likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .38},
  }),
  modernAsset({
    id: 'hobbes-leviathan-1651', hallFolder: 'renaissance-reason-revolution', entityId: 'hobbes', role: 'primary-source', mediaKind: 'engraving',
    title: 'Leviathan frontispiece', creator: 'Abraham Bosse, probably under Thomas Hobbes’s direction', objectDate: '1651', institution: 'British Library',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Leviathan_frontispiece_cropped_British_Library.jpg', ...cc0,
    attribution: 'Abraham Bosse, Leviathan frontispiece, 1651. British Library image, CC0.', derivativeNotice,
    scene: [401, 640], panel: [803, 1280], alt: 'Leviathan frontispiece showing a giant sovereign composed of many small human bodies above a city.',
    caption: 'Frontispiece to Hobbes’s Leviathan, 1651.', historicalNote: 'Its composite sovereign visualizes authorization and unity; it is not a simple claim that rulers possess unlimited personal whim.', likenessStatus: 'not-applicable',
  }),
  modernAsset({
    id: 'locke-kneller-portrait', hallFolder: 'renaissance-reason-revolution', entityId: 'locke', role: 'identity', mediaKind: 'painting',
    title: 'Portrait of John Locke', creator: 'Godfrey Kneller', objectDate: '1697', institution: 'State Hermitage Museum, Saint Petersburg',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Godfrey_Kneller_-_Portrait_of_John_Locke_(Hermitage).jpg', ...publicDomain,
    attribution: 'Godfrey Kneller, Portrait of John Locke, 1697, State Hermitage Museum. Public domain.', derivativeNotice,
    scene: [525, 640], panel: [1050, 1280], alt: 'Godfrey Kneller portrait of John Locke in a brown cloak with shoulder-length gray hair.',
    caption: 'Godfrey Kneller, Portrait of John Locke, 1697.', historicalNote: 'A lifetime portrait from Locke’s later years, after his major political and epistemological works had appeared.', likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .4},
  }),
  modernAsset({
    id: 'locke-two-treatises-1690', hallFolder: 'renaissance-reason-revolution', entityId: 'locke', role: 'primary-source', mediaKind: 'book-page',
    title: 'Two Treatises of Government, title page', creator: 'John Locke; Awnsham Churchill, printer', objectDate: '1690', institution: 'Library of Congress, LCCN 2002710224',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Title_page_of_John_Locke,_Two_Treatises_of_Government_(London,_1690)_LCCN2002710224.jpg', objectPageUrl: 'https://lccn.loc.gov/2002710224', ...publicDomain,
    attribution: 'John Locke, Two Treatises of Government, London, 1690. Library of Congress. Public domain.', derivativeNotice,
    scene: [464, 640], panel: [927, 1280], alt: 'Title page of the 1690 London edition of Locke’s Two Treatises of Government.',
    caption: 'Two Treatises of Government, London, 1690.', historicalNote: 'Published anonymously and dated 1690, the work was composed across political crises earlier than its title page suggests.', likenessStatus: 'not-applicable',
  }),
  modernAsset({
    id: 'spinoza-hab-portrait', hallFolder: 'renaissance-reason-revolution', entityId: 'spinoza', role: 'identity', mediaKind: 'engraving',
    title: 'Portrait of Benedictus de Spinoza', creator: 'Anonymous artist', objectDate: 'c. 1665', institution: 'Herzog August Bibliothek portrait collection',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Spinoza.jpg', ...publicDomain,
    attribution: 'Anonymous, traditional portrait of Benedictus de Spinoza, c. 1665. Public domain.', derivativeNotice,
    scene: [551, 640], panel: [1102, 1280], alt: 'Oval engraved portrait conventionally identified as Spinoza, with long dark hair and a broad white collar.',
    caption: 'Anonymous portrait traditionally identified as Spinoza, c. 1665.', historicalNote: 'The image belongs to Spinoza’s lifetime, but its authorship and precise evidentiary chain are uncertain; the identification should remain qualified.', likenessStatus: 'attributed', focalPoint: {x: .5, y: .43},
  }),
  modernAsset({
    id: 'spinoza-ethics-1677', hallFolder: 'renaissance-reason-revolution', entityId: 'spinoza', role: 'primary-source', mediaKind: 'book-page',
    title: 'Opera Posthuma, title page', creator: 'Baruch Spinoza; anonymous editors', objectDate: '1677', institution: 'Public-domain historical edition',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Spinoza_Opera_Posthuma.jpg', ...publicDomain,
    attribution: 'Baruch Spinoza, Opera Posthuma, 1677. Public domain.', derivativeNotice,
    scene: [435, 640], panel: [870, 1280], alt: 'Latin title page of Spinoza’s anonymously published Opera Posthuma from 1677.',
    caption: 'Spinoza, Opera Posthuma, 1677, containing the Ethics.', historicalNote: 'Friends prepared this posthumous volume in the year of Spinoza’s death; the geometric Ethics appears within it rather than as a separately signed publication.', likenessStatus: 'not-applicable',
  }),
  modernAsset({
    id: 'hume-ramsay-portrait', hallFolder: 'renaissance-reason-revolution', entityId: 'hume', role: 'identity', mediaKind: 'painting',
    title: 'Portrait of David Hume', creator: 'Allan Ramsay', objectDate: '1766', institution: 'Scottish National Portrait Gallery',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:David_Hume.jpg', ...publicDomain,
    attribution: 'Allan Ramsay, David Hume, 1766. Public domain.', derivativeNotice,
    scene: [528, 640], panel: [825, 1000], alt: 'Allan Ramsay portrait of David Hume in a red coat and gold-trimmed waistcoat.',
    caption: 'Allan Ramsay, David Hume, 1766.', historicalNote: 'A lifetime portrait from Hume’s final decade; it records social status and self-presentation, not the content of his philosophy.', likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .4},
  }),
  modernAsset({
    id: 'hume-treatise-1739', hallFolder: 'renaissance-reason-revolution', entityId: 'hume', role: 'primary-source', mediaKind: 'book-page',
    title: 'A Treatise of Human Nature, title page', creator: 'David Hume; John Noon, publisher', objectDate: '1739', institution: 'Historical edition reproduced via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:A_Treatise_of_Human_Nature_by_David_Hume.jpg', ...publicDomain,
    attribution: 'David Hume, A Treatise of Human Nature, vol. 1, 1739. Public domain.', derivativeNotice,
    scene: [362, 640], panel: [725, 1280], alt: 'Title page of the first volume of Hume’s A Treatise of Human Nature.',
    caption: 'A Treatise of Human Nature, volume one, 1739.', historicalNote: 'Published anonymously when Hume was in his twenties; later works restated several arguments without simply replacing the Treatise.', likenessStatus: 'not-applicable',
  }),
  modernAsset({
    id: 'rousseau-la-tour-portrait', hallFolder: 'renaissance-reason-revolution', entityId: 'rousseau', role: 'identity', mediaKind: 'painting',
    title: 'Portrait of Jean-Jacques Rousseau', creator: 'Maurice Quentin de La Tour', objectDate: '18th century', institution: 'Musée Antoine Lécuyer / Paris Musées reproduction',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Maurice_Quentin_de_La_Tour_-_Portrait_de_Jean-Jacques_Rousseau_(1712-1778),_%C3%A9crivain_et_philosophe_-_P210_-_Mus%C3%A9e_Carnavalet.jpg', ...publicDomain,
    attribution: 'Maurice Quentin de La Tour, Portrait of Jean-Jacques Rousseau. Public domain.', derivativeNotice,
    scene: [488, 640], panel: [976, 1280], alt: 'Pastel portrait of Rousseau wearing a fur cap and coat, looking directly outward.',
    caption: 'Maurice Quentin de La Tour, Jean-Jacques Rousseau, eighteenth century.', historicalNote: 'A lifetime image associated with Rousseau’s carefully managed public identity as both outsider and celebrated author.', likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .4},
  }),
  modernAsset({
    id: 'rousseau-social-contract-1762', hallFolder: 'renaissance-reason-revolution', entityId: 'rousseau', role: 'primary-source', mediaKind: 'book-page',
    title: 'Du contrat social, title page', creator: 'Jean-Jacques Rousseau; Marc-Michel Rey, publisher', objectDate: '1762', institution: 'Bibliothèque nationale de France / Gallica',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Du_contrat_social_Rousseau_Jean-Jacques.jpg', objectPageUrl: 'https://gallica.bnf.fr/ark:/12148/btv1b86157409/f5.item', ...publicDomain,
    attribution: 'Jean-Jacques Rousseau, Du contrat social, 1762. BnF / Gallica. Public domain.', derivativeNotice,
    scene: [409, 640], panel: [817, 1280], alt: 'French title page of Rousseau’s 1762 Du contrat social.',
    caption: 'Du contrat social, Amsterdam, 1762.', historicalNote: 'The book’s compact formulae about freedom and sovereignty sit inside a demanding theory of law, civic formation, and the general will.', likenessStatus: 'not-applicable',
  }),
  modernAsset({
    id: 'kant-raab-portrait', hallFolder: 'renaissance-reason-revolution', entityId: 'kant', role: 'identity', mediaKind: 'painting',
    title: 'Portrait of Immanuel Kant', creator: 'Johann Gottlieb Becker', objectDate: '1768', institution: 'Private historical portrait tradition; Wikimedia Commons reproduction',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Immanuel_Kant_-_Gemaelde_1.jpg', ...publicDomain,
    attribution: 'Johann Gottlieb Becker, Immanuel Kant, 1768. Public domain.', derivativeNotice,
    scene: [490, 640], panel: [981, 1280], alt: 'Painted half-length portrait of Immanuel Kant in a red coat and powdered wig.',
    caption: 'Johann Gottlieb Becker, Immanuel Kant, 1768.', historicalNote: 'A lifetime portrait from before the three Critiques; the image should not make Kant’s critical philosophy appear already complete.', likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .38},
  }),
  modernAsset({
    id: 'kant-critique-1781', hallFolder: 'renaissance-reason-revolution', entityId: 'kant', role: 'primary-source', mediaKind: 'book-page',
    title: 'Critique of Pure Reason, first-edition title page', creator: 'Immanuel Kant; Johann Friedrich Hartknoch, publisher', objectDate: '1781', imageCreator: 'H.-P. Haack', institution: 'H.-P. Haack collection, Leipzig',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Kritik_der_reinen_vernunft_erstausgabe.jpg', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', rightsKind: 'license',
    attribution: 'H.-P. Haack, photograph of Kant’s Kritik der reinen Vernunft first edition, CC BY-SA 3.0.', derivativeNotice,
    scene: [640, 542], panel: [1048, 887], alt: 'Photograph of the 1781 first-edition title page of Kant’s Critique of Pure Reason.',
    caption: 'Kritik der reinen Vernunft, first edition, Riga, 1781.', historicalNote: 'The heavily revised 1787 second edition makes “the Critique” a textual history rather than one fixed wording.', likenessStatus: 'not-applicable',
  }),
] as const satisfies readonly MuseumAssetRecord[];

export const MODERNITY_MUSEUM_ASSETS = [
  modernAsset({
    id: 'kierkegaard-royal-library-portrait', hallFolder: 'modernity-freedom-critique', entityId: 'kierkegaard', role: 'identity', mediaKind: 'drawing',
    title: 'Portrait of Søren Kierkegaard', creator: 'Niels Christian Kierkegaard', objectDate: 'c. 1840', institution: 'Royal Danish Library',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Kierkegaard.jpg', ...publicDomain,
    attribution: 'Niels Christian Kierkegaard, portrait of Søren Kierkegaard, c. 1840. Royal Danish Library. Public domain.', derivativeNotice,
    scene: [310, 459], panel: [310, 459], alt: 'Profile drawing of a young Søren Kierkegaard with swept hair and a high collar.',
    caption: 'Niels Christian Kierkegaard, Søren Kierkegaard, c. 1840.', historicalNote: 'A lifetime drawing by Kierkegaard’s cousin; like all portraits, it is evidence of appearance and reception rather than a key to the pseudonymous authors.', likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .4},
  }),
  modernAsset({
    id: 'kierkegaard-fragments-manuscript', hallFolder: 'modernity-freedom-critique', entityId: 'kierkegaard', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Philosophical Fragments manuscript', creator: 'Søren Kierkegaard', objectDate: '1844', institution: 'Royal Danish Library, Kierkegaard Manuscripts',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Manuscript_philosophical_fragments.png', ...publicDomain,
    attribution: 'Søren Kierkegaard, manuscript for Philosophical Fragments, 1844. Royal Danish Library. Public domain.', derivativeNotice,
    scene: [640, 449], panel: [643, 451], alt: 'Dense handwritten manuscript leaves from Kierkegaard’s Philosophical Fragments.',
    caption: 'Kierkegaard manuscript material for Philosophical Fragments, 1844.', historicalNote: 'The published work appeared under the pseudonym Johannes Climacus; the autograph does not erase the literary distance that pseudonym creates.', likenessStatus: 'not-applicable',
  }),
  modernAsset({
    id: 'marx-mayall-portrait', hallFolder: 'modernity-freedom-critique', entityId: 'marx', role: 'identity', mediaKind: 'photograph',
    title: 'Portrait of Karl Marx', creator: 'John Jabez Edwin Mayall', objectDate: '1875', institution: 'Städel Museum digital collection',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Karl_Marx_by_John_Jabez_Edwin_Mayall_1875_-_Restored.png', objectPageUrl: 'https://sammlung.staedelmuseum.de/de/werk/portraet-karl-marx', ...publicDomain,
    attribution: 'John Jabez Edwin Mayall, Karl Marx, 1875. Public domain.', derivativeNotice,
    scene: [433, 640], panel: [865, 1280], alt: 'Studio photograph of Karl Marx seated with a full white beard and dark coat.',
    caption: 'John Jabez Edwin Mayall, Karl Marx, 1875.', historicalNote: 'A lifetime studio portrait from the period of Marx’s work on the later volumes of Capital.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .4},
  }),
  modernAsset({
    id: 'marx-capital-1867', hallFolder: 'modernity-freedom-critique', entityId: 'marx', role: 'primary-source', mediaKind: 'book-page',
    title: 'Das Kapital, volume one, title page', creator: 'Karl Marx; Otto Meissner, publisher', objectDate: '1867', institution: 'Public-domain historical edition',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Kapital_titel_bd1.png', ...publicDomain,
    attribution: 'Karl Marx, Das Kapital, volume one, 1867. Public domain.', derivativeNotice,
    scene: [437, 640], panel: [874, 1280], alt: 'German title page of the 1867 first volume of Karl Marx’s Das Kapital.',
    caption: 'Das Kapital, volume one, Hamburg, 1867.', historicalNote: 'Only volume one appeared in Marx’s lifetime; Engels edited volumes two and three from Marx’s manuscripts after his death.', likenessStatus: 'not-applicable',
  }),
  modernAsset({
    id: 'nietzsche-schultze-1882', hallFolder: 'modernity-freedom-critique', entityId: 'nietzsche', role: 'identity', mediaKind: 'photograph',
    title: 'Portrait of Friedrich Nietzsche', creator: 'Gustav-Adolf Schultze', objectDate: 'September 1882', institution: 'Wikimedia Commons historical photograph',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Nietzsche1882.jpg', ...publicDomain,
    attribution: 'Gustav-Adolf Schultze, Friedrich Nietzsche, 1882. Public domain.', derivativeNotice,
    scene: [480, 640], panel: [959, 1280], alt: '1882 studio photograph of Nietzsche with a large moustache, turned slightly in profile.',
    caption: 'Gustav-Adolf Schultze, Friedrich Nietzsche, 1882.', historicalNote: 'A lifetime photograph made as Nietzsche entered the period of Zarathustra; it should not be treated as a visual shorthand for later appropriation.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .4},
  }),
  modernAsset({
    id: 'nietzsche-zarathustra-1883', hallFolder: 'modernity-freedom-critique', entityId: 'nietzsche', role: 'primary-source', mediaKind: 'book-page',
    title: 'Also sprach Zarathustra, first-part title page', creator: 'Friedrich Nietzsche; Ernst Schmeitzner, publisher', objectDate: '1883', institution: 'Public-domain historical edition',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Also_sprach_Zarathustra_(1883).png', ...publicDomain,
    attribution: 'Friedrich Nietzsche, Also sprach Zarathustra, 1883. Public domain.', derivativeNotice,
    scene: [297, 437], panel: [297, 437], alt: 'German title page of the 1883 first part of Nietzsche’s Thus Spoke Zarathustra.',
    caption: 'Also sprach Zarathustra, first part, 1883.', historicalNote: 'Zarathustra’s speeches are a staged literary experiment, not a transparent list of doctrines or a political manifesto.', likenessStatus: 'not-applicable',
  }),
  modernAsset({
    id: 'heidegger-wetterauer-portrait', hallFolder: 'modernity-freedom-critique', entityId: 'heidegger', role: 'identity', mediaKind: 'drawing',
    title: 'Martin Heidegger', creator: 'Herbert Wetterauer', objectDate: '2010', institution: 'Artist-contributed Wikimedia Commons portrait',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Martin_Heidegger_for_WP.jpg', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', rightsKind: 'license',
    attribution: 'Herbert Wetterauer, Martin Heidegger, 2010, CC BY-SA 3.0.', derivativeNotice,
    scene: [549, 640], panel: [680, 792], alt: 'Modern monochrome portrait drawing of Martin Heidegger in a dark jacket.',
    caption: 'Herbert Wetterauer, posthumous portrait of Martin Heidegger, 2010.', historicalNote: 'This is a later artistic portrait, included as reception material rather than documentary likeness evidence.', likenessStatus: 'posthumous-portrait', focalPoint: {x: .5, y: .4},
  }),
  modernAsset({
    id: 'heidegger-pragher-lecture-1954', hallFolder: 'modernity-freedom-critique', entityId: 'heidegger', role: 'context', mediaKind: 'photograph',
    title: 'Martin Heidegger lecturing in Freiburg-Zähringen', creator: 'Willy Pragher', objectDate: '5 September 1954', institution: 'Landesarchiv Baden-Württemberg, Staatsarchiv Freiburg, W 134 Nr. 023740b',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Freiburg,_Z%C3%A4hringen-_Jahnhalle,_Prof._Martin_Heidegger_w%C3%A4hrend_eines_Vortrags_-_LABW_-_Staatsarchiv_Freiburg_W_134_Nr._023740b.jpeg', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', rightsKind: 'license',
    attribution: 'Willy Pragher, Martin Heidegger lecturing, 1954. Landesarchiv Baden-Württemberg, CC BY 4.0.', derivativeNotice,
    scene: [640, 412], panel: [860, 554], alt: 'Black-and-white photograph of Heidegger speaking from a lectern to a crowded hall in 1954.',
    caption: 'Willy Pragher, Heidegger lecturing in Freiburg-Zähringen, 1954.', historicalNote: 'The postwar lecture scene belongs to the contested reception of a thinker whose Nazi Party membership, 1933 rectorship, and antisemitic notebook passages require direct acknowledgment.', likenessStatus: 'lifetime-photograph',
  }),
  modernAsset({
    id: 'sartre-anefo-1965', hallFolder: 'modernity-freedom-critique', entityId: 'sartre', role: 'identity', mediaKind: 'photograph',
    title: 'Jean-Paul Sartre', creator: 'Anefo / Dutch National Archives', objectDate: '12 July 1965', institution: 'Dutch National Archives, 2.24.01.05, 917-9600',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Jean_Paul_Sartre_(kop),_Bestanddeelnr_917-9600.jpg', objectPageUrl: 'https://hdl.handle.net/10648/aab3e3ba-d0b4-102d-bcf8-003048976d84', ...cc0,
    attribution: 'Anefo, Jean-Paul Sartre, 1965. Dutch National Archives, CC0.', derivativeNotice,
    scene: [505, 640], panel: [1010, 1280], alt: 'Close black-and-white press photograph of Jean-Paul Sartre wearing glasses and looking to one side.',
    caption: 'Anefo, Jean-Paul Sartre, 1965.', historicalNote: 'A lifetime press photograph from the year after Sartre refused the Nobel Prize in Literature.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .4},
  }),
  modernAsset({
    id: 'sartre-beauvoir-balzac', hallFolder: 'modernity-freedom-critique', entityId: 'sartre', role: 'context', mediaKind: 'photograph',
    title: 'Sartre and Beauvoir at the Balzac memorial', creator: 'Unknown photographer', objectDate: 'after 1939; exact date unknown', institution: 'Historical photograph formerly associated with Archives Gallimard',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Sartre_and_de_Beauvoir_at_Balzac_Memorial.jpg', ...publicDomain,
    attribution: 'Unknown photographer, Sartre and Beauvoir at the Balzac memorial. Public domain determination recorded by Wikimedia Commons.', derivativeNotice,
    scene: [408, 640], panel: [816, 1280], alt: 'Black-and-white photograph of Sartre and Beauvoir standing together near the Balzac monument in Paris.',
    caption: 'Sartre and Simone de Beauvoir at the Balzac memorial, date uncertain.', historicalNote: 'The photograph records a partnership of two independent authors; it should not reduce Beauvoir to Sartre’s companion or student.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .42},
  }),
  modernAsset({
    id: 'beauvoir-gpo-1967', hallFolder: 'modernity-freedom-critique', entityId: 'beauvoir', role: 'identity', mediaKind: 'photograph',
    title: 'Simone de Beauvoir in Israel', creator: 'Fritz Cohen', objectDate: '29 March 1967', institution: 'Israel Government Press Office, D804-102',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Simone_de_Beauvoir_1967_(cropped).jpg', ...publicDomain,
    attribution: 'Fritz Cohen, Simone de Beauvoir, 1967. Israel Government Press Office, public domain.', derivativeNotice,
    scene: [504, 640], panel: [735, 934], alt: 'Black-and-white press photograph of Simone de Beauvoir speaking in 1967.',
    caption: 'Fritz Cohen, Simone de Beauvoir, 1967.', historicalNote: 'A lifetime press photograph from Beauvoir’s period of sustained political and feminist engagement.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .4},
  }),
  modernAsset({
    id: 'beauvoir-suffrage-poster-1924', hallFolder: 'modernity-freedom-critique', entityId: 'beauvoir', role: 'context', mediaKind: 'document',
    title: 'French women’s suffrage poster', creator: 'Union française pour le suffrage des femmes', objectDate: '1924', institution: 'Archives nationales, France',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Affiche_de_l\'Union_fran%C3%A7aise_pour_le_suffrage_des_femmes.jpg', ...cc0,
    attribution: 'Union française pour le suffrage des femmes, suffrage poster, 1924. Archives nationales, CC0.', derivativeNotice,
    scene: [465, 640], panel: [930, 1280], alt: '1924 French poster advocating women’s suffrage with bold lettering and a woman casting a ballot.',
    caption: 'French Union for Women’s Suffrage poster, 1924.', historicalNote: 'This predates The Second Sex and provides political context rather than illustrating Beauvoir’s argument directly; French women gained national voting rights in 1944.', likenessStatus: 'not-applicable',
  }),
  modernAsset({
    id: 'camus-loc-1957', hallFolder: 'modernity-freedom-critique', entityId: 'camus', role: 'identity', mediaKind: 'photograph',
    title: 'Albert Camus after the Nobel Prize announcement', creator: 'United Press International', objectDate: '1957', institution: 'Library of Congress, Prints and Photographs Division, cph.3c08028',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Albert_Camus,_gagnant_de_prix_Nobel,_portrait_en_buste,_pos%C3%A9_au_bureau,_faisant_face_%C3%A0_gauche,_cigarette_de_tabagisme.jpg', objectPageUrl: 'https://www.loc.gov/pictures/item/2004671903/', ...publicDomain,
    attribution: 'United Press International, Albert Camus, 1957. Library of Congress, public domain in the United States.', derivativeNotice,
    scene: [533, 640], panel: [719, 863], alt: '1957 press photograph of Albert Camus seated at a desk with a cigarette.',
    caption: 'United Press International, Albert Camus, 1957.', historicalNote: 'A lifetime press portrait from the Nobel year; Camus’s public celebrity should not erase his explicit resistance to the existentialist label.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .42},
  }),
  modernAsset({
    id: 'camus-combat-1943', hallFolder: 'modernity-freedom-critique', entityId: 'camus', role: 'material-history', mediaKind: 'document',
    title: 'Combat resistance newspaper', creator: 'Combat editorial collective; photographer unknown', objectDate: '1 August 1943', institution: 'Musée de la Résistance Azuréenne',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Journal_Combat_1943.jpg', license: 'Public domain (anonymous work)', licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-anon-70-EU', rightsKind: 'rights-status',
    attribution: 'Combat, underground resistance newspaper, 1943. Anonymous work; public-domain determination recorded by Wikimedia Commons.', derivativeNotice,
    scene: [428, 640], panel: [857, 1280], alt: 'Front page of the clandestine French Resistance newspaper Combat from August 1943.',
    caption: 'Combat underground newspaper, 1 August 1943.', historicalNote: 'Camus joined Combat’s editorial work during the Occupation, but surviving issues are collective artifacts and should not all be assigned to him personally.', likenessStatus: 'not-applicable',
  }),
  modernAsset({
    id: 'foucault-portugal-1968', hallFolder: 'modernity-freedom-critique', entityId: 'foucault', role: 'identity', mediaKind: 'photograph',
    title: 'Michel Foucault in Portugal', creator: 'Unknown Diário de Lisboa photographer', objectDate: 'published 28 April 1968', institution: 'Diário de Lisboa digital newspaper archive',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Michel_Foucault_c._1968.jpg', license: 'Public domain (Portugal)', licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-Portugal-URAA', rightsKind: 'rights-status',
    attribution: 'Unknown photographer, Michel Foucault, published in Diário de Lisboa, 1968. Public-domain determination recorded by Wikimedia Commons.', derivativeNotice,
    scene: [361, 640], panel: [515, 912], alt: 'Black-and-white 1968 newspaper photograph of Michel Foucault in profile wearing a dark coat.',
    caption: 'Michel Foucault, Diário de Lisboa, 1968.', historicalNote: 'A lifetime news image from the period when Foucault’s archaeological method was changing; it should not freeze his work into a single doctrine.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .4},
  }),
  modernAsset({
    id: 'foucault-panopticon-plan', hallFolder: 'modernity-freedom-critique', entityId: 'foucault', role: 'context', mediaKind: 'architectural-plan',
    title: 'Panopticon plan', creator: 'Jeremy Bentham', objectDate: 'published 1843 from earlier designs', institution: 'The Works of Jeremy Bentham, volume IV',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Panopticon.jpg', ...publicDomain,
    attribution: 'Jeremy Bentham, Panopticon plan, published 1843. Public domain.', derivativeNotice,
    scene: [581, 640], panel: [1161, 1280], alt: 'Circular architectural plan for Bentham’s Panopticon with cells arranged around a central inspection point.',
    caption: 'Jeremy Bentham, Panopticon plan, published 1843.', historicalNote: 'Foucault uses the Panopticon as a diagram of disciplinary visibility, not as a claim that every modern institution literally has this architecture.', likenessStatus: 'not-applicable',
  }),
] as const satisfies readonly MuseumAssetRecord[];

export const MODERN_MUSEUM_ASSETS = [
  ...EARLY_MODERN_MUSEUM_ASSETS,
  ...MODERNITY_MUSEUM_ASSETS,
] as const satisfies readonly MuseumAssetRecord[];
