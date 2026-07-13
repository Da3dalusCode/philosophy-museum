import type {
  MuseumAssetId,
  MuseumAssetRecord,
  MuseumAssetVariant,
} from './museumAssetTypes';

const assetPath = (slug: string, variant: 'scene' | 'panel', width: number, height: number): MuseumAssetVariant => ({
  path: `assets/museum/ancient-greek/${slug}-${variant}.webp`,
  width,
  height,
});

export const MUSEUM_ASSETS = [
  {
    id: 'socrates-louvre-head', entityKind: 'philosopher', entityId: 'socrates', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Portrait head of Socrates', creator: 'Unknown Roman sculptor, after the Lysippos portrait type', objectDate: 'c. 75–125 CE',
    imageCreator: 'Eric Gaba (Wikimedia Commons user Sting)', institution: 'Musée du Louvre, Ma 59 / MR 652',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Socrates_Louvre.jpg', objectPageUrl: 'https://collections.louvre.fr/ark:/53355/cl010278931',
    license: 'CC BY-SA 2.5', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.5/', rightsKind: 'license', derivativeNotice: 'Resized and converted to WebP by Philosophy Atlas.', attribution: 'Eric Gaba (Wikimedia Commons user Sting), CC BY-SA 2.5.',
    variants: {scene: assetPath('socrates-louvre-head', 'scene', 480, 640), panel: assetPath('socrates-louvre-head', 'panel', 960, 1280)},
    alt: 'Marble portrait head of Socrates with a broad face, short curled beard, and receding hair.',
    caption: 'Roman portrait head, c. 75–125 CE, after the posthumous Lysippos type. Louvre Ma 59.',
    historicalNote: 'This is an ancient but posthumous Roman copy, not a portrait made from life.', likenessStatus: 'roman-copy', focalPoint: {x: .5, y: .42},
  },
  {
    id: 'socrates-death-of-socrates', entityKind: 'philosopher', entityId: 'socrates', role: 'context', mediaKind: 'painting',
    title: 'The Death of Socrates', creator: 'Jacques-Louis David', objectDate: '1787', imageCreator: 'Metropolitan Museum of Art open-access reproduction', institution: 'The Metropolitan Museum of Art, 31.45',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:David_-_The_Death_of_Socrates.jpg', objectPageUrl: 'https://www.metmuseum.org/art/collection/search/436105',
    license: 'Public Domain Mark 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/', rightsKind: 'rights-status', attribution: 'Jacques-Louis David, The Death of Socrates, The Metropolitan Museum of Art. Public domain.',
    variants: {scene: assetPath('socrates-death-of-socrates', 'scene', 640, 420), panel: assetPath('socrates-death-of-socrates', 'panel', 1280, 841)},
    alt: 'David’s painting of Socrates reaching for the hemlock while continuing to teach among grieving companions.',
    caption: 'Jacques-Louis David, The Death of Socrates, 1787. The Metropolitan Museum of Art.',
    historicalNote: 'Neoclassical reception art, not eyewitness documentation. David makes Plato elderly and present for dramatic purposes although Plato’s dialogue says he was absent.', likenessStatus: 'imagined',
  },
  {
    id: 'plato-capitoline-bust', entityKind: 'philosopher', entityId: 'plato', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Plato, after Silanion', creator: 'Unknown Roman sculptor, copying a portrait by Silanion', objectDate: '1st century CE; Greek model c. 370 BCE', imageCreator: 'Marie-Lan Nguyen', institution: 'Capitoline Museums / Centrale Montemartini, MC 1377',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Plato_Silanion_Musei_Capitolini_MC1377.jpg',
    license: 'CC BY 2.5', licenseUrl: 'https://creativecommons.org/licenses/by/2.5/', rightsKind: 'license', derivativeNotice: 'Resized and converted to WebP by Philosophy Atlas.', attribution: '© Marie-Lan Nguyen / Wikimedia Commons / CC BY 2.5.',
    variants: {scene: assetPath('plato-capitoline-bust', 'scene', 427, 640), panel: assetPath('plato-capitoline-bust', 'panel', 853, 1280)},
    alt: 'Marble bust of Plato with a full divided beard and heavy, thoughtful gaze.',
    caption: 'Roman marble copy of the portrait Silanion made for Plato’s Academy, first century CE. MC 1377.',
    historicalNote: 'This is a Roman copy of a Greek portrait type dated within Plato’s lifetime. The surviving marble is later and its physiognomy may be idealized; it is not a portrait made from life.', likenessStatus: 'roman-copy', focalPoint: {x: .5, y: .38},
  },
  {
    id: 'plato-school-of-athens', entityKind: 'philosopher', entityId: 'plato', role: 'context', mediaKind: 'painting',
    title: 'The School of Athens', creator: 'Raphael', objectDate: '1509–1511', institution: 'Vatican Museums, Room of the Segnatura',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Raphael_School_of_Athens.jpg', objectPageUrl: 'https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/stanze-di-raffaello/stanza-della-segnatura/scuola-di-atene.html',
    license: 'Public Domain Mark 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/', rightsKind: 'rights-status', attribution: 'Raphael, The School of Athens, Vatican Museums. Public domain.',
    variants: {scene: assetPath('plato-school-of-athens', 'scene', 640, 418), panel: assetPath('plato-school-of-athens', 'panel', 1280, 836)},
    alt: 'Raphael’s imagined assembly of ancient philosophers, with Plato and Aristotle walking at the center.',
    caption: 'Raphael, The School of Athens, 1509–1511. Vatican Museums.',
    historicalNote: 'Renaissance intellectual theater: its faces are imaginative or modeled on Renaissance contemporaries, not ancient documentary portraits.', likenessStatus: 'imagined',
  },
  {
    id: 'aristotle-altemps-bust', entityKind: 'philosopher', entityId: 'aristotle', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Bust of Aristotle', creator: 'Unknown Roman sculptor, after a bronze associated with Lysippos', objectDate: 'Roman copy; Greek model c. 330 BCE', imageCreator: 'Jastrow', institution: 'Museo Nazionale Romano, Palazzo Altemps, inv. 8575',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg',
    license: 'Public-domain dedication (PD-self)', licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-self', rightsKind: 'dedication', attribution: 'Jastrow, Bust of Aristotle, public-domain dedication.',
    variants: {scene: assetPath('aristotle-altemps-bust', 'scene', 478, 640), panel: assetPath('aristotle-altemps-bust', 'panel', 956, 1280)},
    alt: 'Marble portrait bust of Aristotle with short curled hair and closely trimmed beard.',
    caption: 'Roman marble copy after a Greek portrait of c. 330 BCE. Palazzo Altemps, inv. 8575.',
    historicalNote: 'The sculpture is a Roman copy rather than the Greek original; its alabaster mantle is a modern addition.', likenessStatus: 'roman-copy', focalPoint: {x: .5, y: .39},
  },
  {
    id: 'aristotle-athenian-constitution-papyrus', entityKind: 'philosopher', entityId: 'aristotle', role: 'primary-source', mediaKind: 'papyrus',
    title: 'Constitution of the Athenians, Papyrus 131', creator: 'Unknown ancient scribe; work attributed to Aristotle or his school', objectDate: 'Papyrus written c. late 1st century CE', imageCreator: 'British Library reproduction', institution: 'British Library, Papyrus 131 / P.Lond.Lit. 108',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Papyrus131(f.6v)-The-Aristotelian-Constitution-of-Athens.jpg', objectPageUrl: 'https://searcharchives.bl.uk/catalog/040-002104511',
    license: 'Public Domain Mark 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/', rightsKind: 'rights-status', attribution: 'British Library, Papyrus 131. Public domain.',
    variants: {scene: assetPath('aristotle-athenian-constitution-papyrus', 'scene', 640, 189), panel: assetPath('aristotle-athenian-constitution-papyrus', 'panel', 1280, 377)},
    alt: 'Long horizontal papyrus fragments carrying narrow columns of ancient Greek text.',
    caption: 'British Library Papyrus 131, a late first-century CE witness to the Constitution of the Athenians.',
    historicalNote: 'The date attached to the Commons reproduction is modern publication history, not the papyrus date; authorship by Aristotle personally or his school remains qualified.', likenessStatus: 'not-applicable',
  },
  {
    id: 'cynicism-diogenes-walters', entityKind: 'branch', entityId: 'cynicism', role: 'identity', mediaKind: 'painting',
    title: 'Diogenes', creator: 'Jean-Léon Gérôme', objectDate: '1860', imageCreator: 'Walters Art Museum digital reproduction', institution: 'Walters Art Museum, 37.131',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_Diogenes_-_Walters_37131.jpg', objectPageUrl: 'https://art.thewalters.org/object/37.131/',
    license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/', rightsKind: 'dedication', attribution: 'Jean-Léon Gérôme, Diogenes, Walters Art Museum, CC0.',
    variants: {scene: assetPath('cynicism-diogenes-walters', 'scene', 640, 470), panel: assetPath('cynicism-diogenes-walters', 'panel', 1280, 940)},
    alt: 'Gérôme’s painting of Diogenes beside his storage jar, lighting a lamp while dogs gather around him.',
    caption: 'Jean-Léon Gérôme, Diogenes, 1860. Walters Art Museum.',
    historicalNote: 'A nineteenth-century reception painting, not an ancient likeness. It stages several famous anecdotes together.', likenessStatus: 'imagined',
  },
  {
    id: 'cynicism-alexander-and-diogenes', entityKind: 'branch', entityId: 'cynicism', role: 'context', mediaKind: 'painting',
    title: 'Alexander and Diogenes', creator: 'Gaspar de Crayer', objectDate: '1625–1630', imageCreator: 'Wallraf–Richartz Museum reproduction', institution: 'Wallraf–Richartz Museum, WRM 1413',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Caspar_de_Crayer_Alexander_and_Diogenes.jpg', objectPageUrl: 'https://www.kulturelles-erbe-koeln.de/documents/obj/05011105',
    license: 'Public Domain Mark 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/', rightsKind: 'rights-status', attribution: 'Gaspar de Crayer, Alexander and Diogenes, Wallraf–Richartz Museum. Public domain.',
    variants: {scene: assetPath('cynicism-alexander-and-diogenes', 'scene', 640, 455), panel: assetPath('cynicism-alexander-and-diogenes', 'panel', 1280, 910)},
    alt: 'Diogenes reclines in sunlight as armored Alexander and his entourage stand over him.',
    caption: 'Gaspar de Crayer, Alexander and Diogenes, 1625–1630. WRM 1413.',
    historicalNote: 'Later history painting of the celebrated confrontation between political power and Cynic independence, not documentary portraiture.', likenessStatus: 'imagined',
  },
  {
    id: 'epicureanism-double-herm', entityKind: 'branch', entityId: 'epicureanism', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Double herm of Epicurus and Metrodorus', creator: 'Unknown Roman sculptor, after a Greek original', objectDate: 'c. 150–200 CE; Greek model c. 260 BCE', imageCreator: 'Eric Gaba (Wikimedia Commons user Sting)', institution: 'Musée du Louvre, Ma 88 / MR 478',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Epicurus_Louvre.jpg', objectPageUrl: 'https://collections.louvre.fr/ark:/53355/cl010279179',
    license: 'CC BY-SA 2.5', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.5/', rightsKind: 'license', derivativeNotice: 'Resized and converted to WebP by Philosophy Atlas.', attribution: 'Eric Gaba (Wikimedia Commons user Sting), CC BY-SA 2.5.',
    variants: {scene: assetPath('epicureanism-double-herm', 'scene', 480, 640), panel: assetPath('epicureanism-double-herm', 'panel', 960, 1280)},
    alt: 'Marble double herm joining the bearded heads of Epicurus and his friend Metrodorus back to back.',
    caption: 'Roman double herm of Epicurus and Metrodorus, c. 150–200 CE, after a Greek original.',
    historicalNote: 'A later Roman copy with substantial restorations. Historical labels once confused which side represented Epicurus and Metrodorus.', likenessStatus: 'roman-copy', focalPoint: {x: .5, y: .4},
  },
  {
    id: 'epicureanism-lucretius-manuscript', entityKind: 'branch', entityId: 'epicureanism', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Lucretius, De rerum natura', creator: 'Copied by Girolamo di Matteo de Tauris for Sixtus IV', objectDate: '1483', institution: 'Vatican Library, Vat. lat. 1569, fol. 1r',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Lucretius,_De_rerum_natura.jpg', objectPageUrl: 'https://digi.vatlib.it/view/MSS_Vat.lat.1569',
    license: 'Public Domain Mark 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/', rightsKind: 'rights-status', attribution: 'Vatican Library, Vat. lat. 1569, fol. 1r. Public domain.',
    variants: {scene: assetPath('epicureanism-lucretius-manuscript', 'scene', 423, 640), panel: assetPath('epicureanism-lucretius-manuscript', 'panel', 846, 1280)},
    alt: 'Illuminated opening page of Lucretius’s De rerum natura with dense Latin text and decorated initials.',
    caption: 'De rerum natura, copied in 1483 for Sixtus IV. Vatican Library, Vat. lat. 1569.',
    historicalNote: 'A Renaissance manuscript transmitting a first-century BCE Epicurean poem, not an ancient surviving copy.', likenessStatus: 'not-applicable',
  },
  {
    id: 'stoicism-zeno-naples', entityKind: 'branch', entityId: 'stoicism', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Bust identified as Zeno of Citium', creator: 'Unknown ancient sculptor', objectDate: 'Ancient Roman period; exact date not secured in the source record', imageCreator: 'Jeremy Weate', institution: 'National Archaeological Museum of Naples, inv. 6128',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Zeno_of_Citium_-_Museo_archeologico_nazionale_di_Napoli.jpg',
    license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', rightsKind: 'license', derivativeNotice: 'Resized and converted to WebP by Philosophy Atlas.', attribution: 'Jeremy Weate, CC BY 2.0.',
    variants: {scene: assetPath('stoicism-zeno-naples', 'scene', 427, 640), panel: assetPath('stoicism-zeno-naples', 'panel', 853, 1280)},
    alt: 'Ancient marble bust identified as Zeno, showing a lean face, furrowed brow, and close-cropped beard.',
    caption: 'Ancient bust identified as Zeno of Citium. National Archaeological Museum of Naples, inv. 6128.',
    historicalNote: 'The identification rests on comparison with a bronze portrait from the Villa of the Papyri; it is not secured by an inscription.', likenessStatus: 'attributed', focalPoint: {x: .5, y: .4},
  },
  {
    id: 'stoicism-marcus-aurelius-bust', entityKind: 'branch', entityId: 'stoicism', role: 'material-history', mediaKind: 'sculpture-photograph',
    title: 'Portrait bust of Marcus Aurelius', creator: 'Unknown Roman sculptor', objectDate: 'Antonine period, 161–169 CE', imageCreator: 'Wikimedia Commons user Steerpike', institution: 'Musée du Louvre, MR 561 / Ma 1166',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Marcus_Aurelius_Metropolitan_Museum.png', objectPageUrl: 'https://collections.louvre.fr/ark:/53355/cl010275331',
    license: 'Public-domain dedication (PD-self)', licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-self', rightsKind: 'dedication', attribution: 'Steerpike, public-domain dedication.',
    variants: {scene: assetPath('stoicism-marcus-aurelius-bust', 'scene', 517, 640), panel: assetPath('stoicism-marcus-aurelius-bust', 'panel', 561, 694)},
    alt: 'Marble portrait bust of Marcus Aurelius with tightly curled hair and full curled beard.',
    caption: 'Antonine portrait bust of Marcus Aurelius, 161–169 CE. Louvre MR 561 / Ma 1166.',
    historicalNote: 'An ancient imperial portrait, photographed while on loan to The Metropolitan Museum of Art in 2008–2010; the object belongs to the Louvre.', likenessStatus: 'ancient-portrait', focalPoint: {x: .5, y: .42},
  },
  {
    id: 'skepticism-sextus-riedel', entityKind: 'branch', entityId: 'skepticism', role: 'identity', mediaKind: 'engraving',
    title: 'Sextus Empyricus', creator: 'Gottlieb Friedrich Riedel', objectDate: '1801 reissue of an engraving first published 1781–1783', institution: 'Source collection not recorded on the Commons file page',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Sextus_Empiricus_-_engraving_by_G._F._Riedel_-_1801.jpg',
    license: 'Public Domain Mark 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/', rightsKind: 'rights-status', attribution: 'Gottlieb Friedrich Riedel, Sextus Empyricus, 1801. Public domain.',
    variants: {scene: assetPath('skepticism-sextus-riedel', 'scene', 463, 640), panel: assetPath('skepticism-sextus-riedel', 'panel', 674, 932)},
    alt: 'Oval engraved profile portrait traditionally labeled Sextus Empiricus.',
    caption: 'Gottlieb Friedrich Riedel, imagined portrait of Sextus Empiricus, 1801.',
    historicalNote: 'No surviving portrait of Sextus is known. The engraving’s supposed coin or medal source does not make it an authenticated likeness.', likenessStatus: 'later-traditional-representation', focalPoint: {x: .5, y: .45},
  },
  {
    id: 'skepticism-adversus-mathematicos', entityKind: 'branch', entityId: 'skepticism', role: 'primary-source', mediaKind: 'book-page',
    title: 'Adversus mathematicos, title page', creator: 'Sextus Empiricus; Latin edition associated with Gentian Hervet’s translation', objectDate: '1569 edition', imageCreator: 'Gallica / Bibliothèque nationale de France scan', institution: 'Bibliothèque nationale de France',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Sexti_Empirici_Adversus_mathematicos.djvu',
    license: 'Public Domain Mark 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/', rightsKind: 'rights-status', attribution: 'Bibliothèque nationale de France / Gallica. Public domain.',
    variants: {scene: assetPath('skepticism-adversus-mathematicos', 'scene', 415, 640), panel: assetPath('skepticism-adversus-mathematicos', 'panel', 829, 1280)},
    alt: 'Black-and-white title page from a 1569 Latin edition of Sextus Empiricus.',
    caption: 'Title page of a 1569 Latin Adversus mathematicos. BnF / Gallica.',
    historicalNote: 'This later printed edition is evidence of Sextus’s transmission, not an authorial or ancient copy.', likenessStatus: 'not-applicable',
  },
  {
    id: 'neoplatonism-plotinus-ostia', entityKind: 'branch', entityId: 'neoplatonism', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Head conventionally identified as Plotinus', creator: 'Unknown Roman sculptor', objectDate: 'Probably 3rd century CE', imageCreator: 'Sailko', institution: 'Museo Ostiense, Ostia Antica, inv. 1386',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Testa_di_plotino,_III_secolo,_dalla_domus_del_filosofo.JPG',
    license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/', rightsKind: 'license', derivativeNotice: 'Resized and converted to WebP by Philosophy Atlas.', attribution: 'Sailko, CC BY 3.0.',
    variants: {scene: assetPath('neoplatonism-plotinus-ostia', 'scene', 416, 640), panel: assetPath('neoplatonism-plotinus-ostia', 'panel', 831, 1280)},
    alt: 'Damaged ancient marble head conventionally identified as Plotinus, shown in three-quarter view.',
    caption: 'Third-century marble head conventionally identified as Plotinus. Museo Ostiense, inv. 1386.',
    historicalNote: 'The identification as Plotinus is plausible but unproven and should not be treated as certain.', likenessStatus: 'uncertain', focalPoint: {x: .5, y: .43},
  },
  {
    id: 'neoplatonism-ficino-enneads', entityKind: 'branch', entityId: 'neoplatonism', role: 'material-history', mediaKind: 'manuscript',
    title: 'Ficino-annotated manuscript of Plotinus’s Enneads', creator: 'Copied by Ioannes Scoutariotes; annotated by Marsilio Ficino', objectDate: 'c. 1460', institution: 'Bibliothèque nationale de France, Grec 1816',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Plotinus,_Enneads,_Paris,_B.N.,_Gr._1816.jpg',
    license: 'Public Domain Mark 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/', rightsKind: 'rights-status', attribution: 'Bibliothèque nationale de France, Grec 1816. Public domain.',
    variants: {scene: assetPath('neoplatonism-ficino-enneads', 'scene', 463, 640), panel: assetPath('neoplatonism-ficino-enneads', 'panel', 927, 1280)},
    alt: 'Greek manuscript page of Plotinus’s Enneads surrounded by Marsilio Ficino’s dense marginal notes.',
    caption: 'Plotinus, Enneads, copied c. 1460 and annotated by Marsilio Ficino. BnF Grec 1816.',
    historicalNote: 'This is Ficino’s Renaissance working copy, not an ancient manuscript; it documents Neoplatonism’s later transmission.', likenessStatus: 'not-applicable',
  },
] as const satisfies readonly MuseumAssetRecord[];

export const museumAssetById = new Map<MuseumAssetId, MuseumAssetRecord>(
  MUSEUM_ASSETS.map((asset) => [asset.id, asset]),
);

export const getMuseumAsset = (id: MuseumAssetId): MuseumAssetRecord => {
  const asset = museumAssetById.get(id);
  if (!asset) throw new Error(`Museum asset ${id} is missing.`);
  return asset;
};

export const museumAssetUrl = (variant: MuseumAssetVariant): string => {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}${variant.path.replace(/^\/+/, '')}`;
};
