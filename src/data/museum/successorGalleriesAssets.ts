import type {MuseumAssetId, MuseumAssetRecord, MuseumAssetVariant} from './museumAssetTypes';

type GalleryAssetInput = Omit<MuseumAssetRecord, 'id' | 'variants'> & {
  id: MuseumAssetId;
  folder: 'hellenistic-roman-ways' | 'late-antiquity-inheritance';
  scene: readonly [number, number];
  panel: readonly [number, number];
};

const variant = (
  folder: GalleryAssetInput['folder'],
  id: MuseumAssetId,
  kind: 'scene' | 'panel',
  size: readonly [number, number],
): MuseumAssetVariant => ({
  path: `assets/museum/${folder}/${id}-${kind}.webp`,
  width: size[0],
  height: size[1],
});

const asset = ({id, folder, scene, panel, ...record}: GalleryAssetInput): MuseumAssetRecord => ({
  ...record,
  id,
  variants: {
    scene: variant(folder, id, 'scene', scene),
    panel: variant(folder, id, 'panel', panel),
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
const pdSelf = {
  license: 'Public-domain dedication (PD-self)',
  licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-self',
  rightsKind: 'dedication' as const,
};
const ccBy4 = {
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  rightsKind: 'license' as const,
};
const ccBySa4 = {
  license: 'CC BY-SA 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  rightsKind: 'license' as const,
};
const derivativeNotice = 'Original image retained uncropped; resized and converted to WebP by Philosophy Atlas.';

export const SUCCESSOR_GALLERIES_ASSETS = [
  asset({
    id: 'antisthenes-british-museum-bust', folder: 'hellenistic-roman-ways', entityKind: 'philosopher', entityId: 'antisthenes', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Portrait bust identified as Antisthenes', creator: 'Unknown Roman sculptor after a Hellenistic portrait type', objectDate: 'Roman copy, probably after a late 3rd- or 2nd-century BCE model', imageCreator: 'Marie-Lan Nguyen', institution: 'British Museum, 1838,1124.2', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Antisthenes_BM_1838.jpg', ...publicDomain, derivativeNotice,
    attribution: 'British Museum portrait bust identified as Antisthenes; photograph by Marie-Lan Nguyen. Public domain.', scene: [427, 640], panel: [853, 1280],
    alt: 'Marble herm bust with a weathered face and full beard, traditionally identified as Antisthenes.', caption: 'Roman portrait bust identified as Antisthenes, after an earlier Greek type. British Museum.', historicalNote: 'The sculpture is a later copy and the identification is traditional; it cannot settle the disputed genealogy of Cynicism.', likenessStatus: 'attributed', focalPoint: {x: .5, y: .39},
  }),
  asset({
    id: 'epicurean-garden-herculaneum-papyrus', folder: 'hellenistic-roman-ways', entityKind: 'branch', entityId: 'epicureanism', role: 'material-history', mediaKind: 'papyrus',
    title: 'Herculaneum papyrus roll under imaging', creator: 'Unknown ancient copyist; modern imaging by the E-RIHS.it MOLAB team', objectDate: 'Ancient roll carbonized in 79 CE; modern photograph', institution: 'Biblioteca Nazionale di Napoli / E-RIHS.it', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Herculaneum_papyri.jpg', ...ccBy4, derivativeNotice,
    attribution: 'Sara Stabile, Francesca Palermo, Inna Bukreeva, Daniela Mele, Vincenzo Formoso, Roberto Bartolino, and Alessia Cedola, CC BY 4.0.', scene: [640, 555], panel: [1280, 1110],
    alt: 'A blackened, tightly rolled Herculaneum papyrus rests beside modern imaging equipment.', caption: 'A carbonized Herculaneum papyrus under modern non-destructive imaging.', historicalNote: 'The image establishes the material survival of an Epicurean library environment; it is not evidence that this particular roll is by Epicurus.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'stoicism-stoa-attalos', folder: 'hellenistic-roman-ways', entityKind: 'branch', entityId: 'stoicism', role: 'context', mediaKind: 'photograph',
    title: 'Reconstructed Stoa of Attalos in the Athenian Agora', creator: 'Julian Lupyan', objectDate: 'Modern photograph of the 1950s reconstruction of a 2nd-century BCE stoa', institution: 'Ancient Agora of Athens', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Stoa_of_Attalos,_Athens,_Greece.jpg', ...cc0, derivativeNotice,
    attribution: 'Julian Lupyan, Stoa of Attalos, CC0 1.0.', scene: [640, 549], panel: [1280, 1098],
    alt: 'A long colonnaded stoa opens toward the Athenian Agora beneath a blue sky.', caption: 'The reconstructed Stoa of Attalos evokes the public colonnaded setting named by Stoicism.', historicalNote: 'Zeno taught at the Painted Stoa, not the Stoa of Attalos. This later stoa is architectural context, not a reconstruction of Zeno’s classroom.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'cleanthes-olgiati-portrait', folder: 'hellenistic-roman-ways', entityKind: 'philosopher', entityId: 'cleanthes', role: 'identity', mediaKind: 'engraving',
    title: 'Cleanthes Assius', creator: 'Girolamo Olgiati', objectDate: '1580; reprinted 1583', institution: 'Illustrium philosophorum et sapientum effigies (Venice, 1580; reprinted 1583)', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Cleanthes_Assius_-_Illustrium_philosophorum_et_sapientum_effigies_ab_eorum_numistatibus_extractae.png', ...publicDomain,
    attribution: 'Girolamo Olgiati, Cleanthes Assius, first published 1580 and reprinted 1583. Public domain.', scene: [451, 640], panel: [670, 950],
    alt: 'A rectangular sixteenth-century engraving presents Cleanthes in profile above a Latin name cartouche.', caption: 'Girolamo Olgiati’s retrospective profile of Cleanthes, first published in 1580 and reprinted in 1583.', historicalNote: 'This is a Renaissance imagined portrait, not an ancient or authenticated likeness. It documents early modern reception rather than Cleanthes’s appearance.', likenessStatus: 'later-traditional-representation', focalPoint: {x: .5, y: .4},
  }),
  asset({
    id: 'chrysippus-portrait-bust', folder: 'hellenistic-roman-ways', entityKind: 'philosopher', entityId: 'chrysippus', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Bronze portrait bust identified as Chrysippus', creator: 'Unknown Roman bronze worker', objectDate: 'Flavian period, c. 75 CE', imageCreator: 'Szilas', institution: 'Museo dei Fori Imperiali, Rome, FN 5', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Portrait-bust_of_Chrysippus.jpg', ...pdSelf, derivativeNotice,
    attribution: 'Bronze portrait bust identified as Chrysippus, Museo dei Fori Imperiali, FN 5; photograph by Szilas, public-domain dedication.', scene: [393, 640], panel: [787, 1280],
    alt: 'A small green-patinated bronze bust shows an elderly, bearded philosopher with a furrowed brow.', caption: 'Flavian bronze portrait bust identified as Chrysippus, c. 75 CE. Museo dei Fori Imperiali, Rome.', historicalNote: 'Excavated in the Templum Pacis in 1998–2000, the bust is a Roman reception object. Its identification as Chrysippus is scholarly rather than secured by an inscription on the bronze.', likenessStatus: 'attributed', focalPoint: {x: .5, y: .4},
  }),
  asset({
    id: 'epictetus-enchiridion-frontispiece', folder: 'hellenistic-roman-ways', entityKind: 'philosopher', entityId: 'epictetus', role: 'primary-source', mediaKind: 'engraving',
    title: 'Frontispiece to Epicteti Enchiridion Latinis versibus adumbratum', creator: 'Engraved by Michael Burghers, probably after William Sonmans', objectDate: 'Oxford, 1715', institution: 'John Adams Library, Boston Public Library; Edward Ivie, Epicteti Enchiridion Latinis versibus adumbratum (Oxford, 1715)', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Epicteti_Enchiridion_Latinis_versibus_adumbratum_(Oxford_1715)_frontispiece.jpg', ...publicDomain,
    attribution: 'Michael Burghers, probably after William Sonmans, Enchiridion frontispiece, Oxford, 1715; John Adams Library, Boston Public Library scan. Public domain.', scene: [362, 640], panel: [724, 1280],
    alt: 'A 1715 frontispiece imagines Epictetus seated with a crutch and open book beneath a Greek epigram.', caption: 'Frontispiece to Edward Ivie’s 1715 Latin verse adaptation of the Enchiridion.', historicalNote: 'The disability, clothing, and scholarly setting are early modern visualizations, not documentary evidence. The print records reception of Epictetus through a Latin adaptation, not his appearance or an ancient textual witness.', likenessStatus: 'imagined', focalPoint: {x: .5, y: .38},
  }),
  asset({
    id: 'seneca-pseudo-seneca-bm', folder: 'hellenistic-roman-ways', entityKind: 'philosopher', entityId: 'seneca', role: 'identity', mediaKind: 'sculpture-photograph',
    title: 'Pseudo-Seneca portrait head', creator: 'Unknown Roman sculptor after a lost Hellenistic original', objectDate: 'Roman marble copy after a 2nd-century BCE Hellenistic original', imageCreator: 'Marie-Lan Nguyen', institution: 'British Museum, GR 1962.8-24.1', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Pseudo-Seneca_BM_GR1962.8-24.1.jpg', ...pdSelf, derivativeNotice,
    attribution: 'British Museum Pseudo-Seneca marble head, GR 1962.8-24.1; photograph by Marie-Lan Nguyen, public-domain dedication.', scene: [427, 640], panel: [853, 1280],
    alt: 'A white marble portrait head shows an older bearded man with forward-combed locks and a deeply lined face.', caption: 'Roman marble copy of the so-called Pseudo-Seneca type, after a 2nd-century BCE Hellenistic original.', historicalNote: 'The type was rejected as a portrait of Seneca after an inscribed portrait was found in 1813 and has also been proposed as Hesiod. The displayed head documents the history of a mistaken identification, not Seneca’s appearance.', likenessStatus: 'not-applicable', focalPoint: {x: .5, y: .4},
  }),
  asset({
    id: 'pyrrho-stanley-portrait', folder: 'hellenistic-roman-ways', entityKind: 'philosopher', entityId: 'pyrrho', role: 'identity', mediaKind: 'engraving',
    title: 'Pyrrho in The History of Philosophy', creator: 'Unknown engraver for Thomas Stanley', objectDate: 'c. 1655', institution: 'Thomas Stanley, The History of Philosophy (London, 1655)', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Pyrrho_in_Thomas_Stanley_History_of_Philosophy.jpg', ...publicDomain,
    attribution: 'Unknown engraver, Pyrrho in Thomas Stanley’s History of Philosophy, c. 1655. Public domain.', scene: [417, 640], panel: [835, 1280],
    alt: 'A seventeenth-century engraving imagines a full-length bearded Pyrrho standing in a landscape above his printed name.', caption: 'An imagined Pyrrho from Thomas Stanley’s History of Philosophy, c. 1655.', historicalNote: 'No reliable portrait of Pyrrho survives. This full-length figure belongs to early modern reception and is not ancient biographical or physiognomic evidence.', likenessStatus: 'imagined', focalPoint: {x: .5, y: .41},
  }),
  asset({
    id: 'arcesilaus-carneades-academica', folder: 'hellenistic-roman-ways', entityKind: 'philosopher', entityId: 'arcesilaus', role: 'material-history', mediaKind: 'engraving',
    title: 'Arcesilaus and Carneades on an Academica title page', creator: 'Published with Johann August Goerenz’s edition of Cicero', objectDate: '1810', institution: 'Cicero, Academica, Leipzig edition', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Arcesilaus_and_Carneades.jpg', ...publicDomain,
    attribution: 'Arcesilaus and Carneades, from Goerenz’s 1810 edition of Cicero’s Academica. Public domain.', scene: [640, 640], panel: [720, 720],
    alt: 'Two overlapping imagined profile medallions appear above the names Arcesilaus and Carneades.', caption: 'Arcesilaus and Carneades paired in an 1810 Academica title page.', historicalNote: 'The paired profiles are retrospective inventions. Their value is reception and lineage, not physiognomic evidence.', likenessStatus: 'imagined',
  }),
  asset({
    id: 'carneades-louvre-bust', folder: 'hellenistic-roman-ways', entityKind: 'philosopher', entityId: 'carneades', role: 'context', mediaKind: 'sculpture-photograph',
    title: 'Roman portrait head in a modern bust with a spurious Carneades inscription', creator: 'Unknown Roman sculptor; modern restorer unknown', objectDate: '2nd century CE head; heavily restored and mounted in a modern bust', imageCreator: 'Marie-Lan Nguyen', institution: 'Musée du Louvre, Ma 72', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Carneades_Campana_Louvre_Ma72.jpg', ...ccBy4, derivativeNotice,
    attribution: 'Unknown Roman sculptor, 2nd-century CE portrait head, heavily restored and inserted into a modern bust with a spurious Carneades inscription; photograph by Marie-Lan Nguyen, CC BY 4.0.', scene: [427, 640], panel: [853, 1280],
    alt: 'Marble portrait head of a bearded man set into a modern bust bearing a Greek inscription that falsely names Carneades.', caption: 'A 2nd-century Roman portrait head, heavily restored and mounted in a modern bust with a spurious Carneades inscription. Louvre Ma 72.', historicalNote: 'The source identifies the head as a distant variant of Polyeuctos’s Demosthenes portrait, not Carneades. The object documents later attribution and misidentification; it cannot establish Carneades’s appearance.', likenessStatus: 'not-applicable', focalPoint: {x: .5, y: .4},
  }),
  asset({
    id: 'cynic-diogenes-honest-man', folder: 'hellenistic-roman-ways', entityKind: 'philosopher', entityId: 'diogenes', role: 'context', mediaKind: 'painting',
    title: 'Diogenes with His Lantern Looking for an Honest Man', creator: 'Pieter van Mol', objectDate: 'c. 1620–1650', institution: 'Private collection; documented by Sotheby’s', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Pieter_van_Mol_-_Diogenes_with_his_lantern_looking_for_an_honest_man.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Pieter van Mol, Diogenes with His Lantern Looking for an Honest Man, c. 1620–1650. Public domain.', scene: [640, 494], panel: [1280, 988],
    alt: 'In a dark painting, an elderly white-bearded Diogenes holds a lit lantern toward four clustered figures while a child looks up from the lower left.', caption: 'Pieter van Mol turns the lamp anecdote into a seventeenth-century dramatic encounter.', historicalNote: 'This early-modern reception painting visualizes an anecdote reported centuries after Diogenes. It is neither a record of the event nor a reliable likeness.', likenessStatus: 'imagined',
  }),
  asset({
    id: 'cynic-hipparchia-crates-print', folder: 'hellenistic-roman-ways', entityKind: 'branch', entityId: 'cynicism', role: 'context', mediaKind: 'engraving',
    title: 'Hipparchia and Crates', creator: 'Crispijn van den Queborn, after Jacob Gerritsz. Cuyp', objectDate: '1643', institution: 'Rijksmuseum, RP-P-1938-2026', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Hipparchia_en_Krates,_RP-P-1938-2026.jpg', ...cc0, derivativeNotice,
    attribution: 'Crispijn van den Queborn, after Jacob Gerritsz. Cuyp, Hipparchia and Crates, 1643. Rijksmuseum RP-P-1938-2026, CC0 1.0.', scene: [384, 640], panel: [768, 1280],
    alt: 'A 1643 Dutch book page shows Hipparchia seated at a table with books as Crates stands before her; printed verse fills the space above and below.', caption: 'A 1643 book illustration imagines Crates proposing marriage to the seated Hipparchia.', historicalNote: 'The print was made almost two millennia after its subjects. It visualizes a later literary account rather than documenting their appearance or meeting.', likenessStatus: 'imagined',
  }),
  asset({
    id: 'cynic-philosophers-constellation', folder: 'hellenistic-roman-ways', entityKind: 'branch', entityId: 'cynicism', role: 'context', mediaKind: 'engraving',
    title: 'Philosophers: Twenty Portraits of Ancient Thinkers', creator: 'John William Cook', objectDate: '1825', institution: 'Wellcome Collection, 546725i', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Philosophers;_twenty_portraits_of_classical_thinkers._Engrav_Wellcome_V0006810.jpg', ...ccBy4, derivativeNotice,
    attribution: 'John William Cook, Philosophers: Twenty Portraits of Ancient Thinkers, 1825. Wellcome Collection 546725i, CC BY 4.0.', scene: [464, 640], panel: [927, 1280],
    alt: 'Twenty engraved imagined philosopher busts appear in five rows under the heading Ancient Philosophers; labels include Antisthenes and Diogenes.', caption: 'Cook’s 1825 portrait grid places Antisthenes and Diogenes within a later printed canon of ancient philosophy.', historicalNote: 'The print is a nineteenth-century classification device, not an ancient Cynic genealogy. Its faces are imagined rather than reliable likenesses.', likenessStatus: 'imagined',
  }),
  asset({
    id: 'epicurean-tetrapharmakos', folder: 'hellenistic-roman-ways', entityKind: 'branch', entityId: 'epicureanism', role: 'primary-source', mediaKind: 'photograph',
    title: 'Fragment of Diogenes of Oinoanda’s Epicurean Inscription', creator: 'Ancient cutter unrecorded; photographed by Procopius', objectDate: 'Second century CE; photographed 2010', institution: 'Oinoanda inscription fragment; holding location unrecorded', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:OinoandaInscription.JPG', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', rightsKind: 'license', derivativeNotice,
    attribution: 'Procopius, fragment of Diogenes of Oinoanda’s Epicurean inscription, 2010, CC BY-SA 3.0.', scene: [480, 640], panel: [960, 1280],
    alt: 'A weathered stone fragment carved with lines from the monumental Epicurean inscription at Oinoanda lies among ruins.', caption: 'Fragment of Diogenes of Oinoanda’s monumental Epicurean inscription.', historicalNote: 'The public stone inscription presents Epicurean teaching to a broad audience. This photographed fragment does not contain the fourfold-remedy wording.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'epicurean-philodemus-subscription', folder: 'hellenistic-roman-ways', entityKind: 'branch', entityId: 'epicureanism', role: 'context', mediaKind: 'sculpture-photograph',
    title: 'Athena Promachos from the Villa of the Papyri', creator: 'Roman sculptor unrecorded; photographed by Carole Raddato', objectDate: 'Roman period; photographed 2014', institution: 'National Archaeological Museum, Naples', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:From_the_Villa_of_the_Papyri_in_Herculaneum,_Naples_National_Archaeological_Museum_(49439110928).jpg', license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/', rightsKind: 'license', derivativeNotice,
    attribution: 'Carole Raddato, Athena Promachos from the Villa of the Papyri, 2014, CC BY-SA 2.0.', scene: [424, 640], panel: [848, 1280],
    alt: 'A marble statue of helmeted Athena raises one arm and extends her aegis while standing in a modern museum gallery.', caption: 'Athena Promachos from the Villa of the Papyri, National Archaeological Museum, Naples.', historicalNote: 'The statue anchors the elite Roman villa and library environment in which many Philodemus rolls survived. It is not Philodemus and is not evidence of an Epicurean cult image.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'epicurean-herculaneum-papyrus', folder: 'hellenistic-roman-ways', entityKind: 'branch', entityId: 'epicureanism', role: 'material-history', mediaKind: 'engraving',
    title: 'Antonio Piaggio’s Machine for Unrolling Herculaneum Papyri', creator: 'Giacomo Castrucci', objectDate: '1858, depicting an eighteenth-century device', institution: 'Tesoro letterario di Ercolano / Internet Archive scan', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Abbot_Piaggios_machine_Device-to-unroll-papyri_1756_Vatican.jpg', ...publicDomain,
    attribution: 'Giacomo Castrucci, Piaggio’s machine for unrolling papyri, 1858. Public domain.', scene: [414, 640], panel: [663, 1024],
    alt: 'A nineteenth-century engraved schematic labels the rollers, threads, frame, and papyrus roll of Antonio Piaggio’s unrolling machine.', caption: 'Castrucci’s 1858 diagram of Antonio Piaggio’s mechanism for opening Herculaneum scrolls.', historicalNote: 'The device belongs to the conservation afterlife of the Villa’s library. Mechanical unrolling exposed texts but could damage the fragile rolls before modern noninvasive imaging.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'skeptical-sextus-adversus-edition', folder: 'hellenistic-roman-ways', entityKind: 'philosopher', entityId: 'sextus-empiricus', role: 'context', mediaKind: 'drawing',
    title: 'Pyrrho of Elis in a Storm', creator: 'Master of Petrarch, attribution uncertain', objectDate: 'First quarter of the sixteenth century', institution: 'Bavarian State Painting Collections, accession 3688', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Petrarca-Meister_001.jpg', ...publicDomain,
    attribution: 'Master of Petrarch, Pyrrho of Elis in a Storm, early sixteenth century. Bavarian State Painting Collections. Public domain.', scene: [640, 468], panel: [1280, 936],
    alt: 'In an early-sixteenth-century drawing, sailors struggle in a storm while Pyrrho points toward a calm pig eating aboard ship.', caption: 'An early-sixteenth-century reception image turns the storm anecdote about Pyrrho into a lesson in tranquility.', historicalNote: 'The scene visualizes an anecdote preserved by Diogenes Laertius 9.68. It is a much later imagined episode, not an ancient portrait or proof that the event occurred.', likenessStatus: 'imagined',
  }),
  asset({
    id: 'porphyry-plotinus-medieval', folder: 'late-antiquity-inheritance', entityKind: 'philosopher', entityId: 'porphyry', role: 'context', mediaKind: 'manuscript',
    title: 'Porphyry and Plotinus in a medieval illumination', creator: 'Maître François', objectDate: 'c. 1475–1480', institution: 'Medieval illuminated manuscript documented through Europeana', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Porphyry_and_Plotinus.jpg', ...publicDomain,
    attribution: 'Maître François, Porphyry and Plotinus, c. 1475–1480. Public domain.', scene: [420, 640], panel: [750, 1142],
    alt: 'A medieval illumination imagines Porphyry and Plotinus debating beneath celestial signs.', caption: 'A late medieval reception image pairs Porphyry and Plotinus.', historicalNote: 'The illumination is more than a millennium later than its subjects and includes later theurgical and astrological framing.', likenessStatus: 'imagined',
  }),
  asset({
    id: 'iamblichus-protreptikos-manuscript', folder: 'late-antiquity-inheritance', entityKind: 'philosopher', entityId: 'iamblichus', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Beginning of Iamblichus’s Protrepticus', creator: 'Iamblichus; anonymous Byzantine copyist', objectDate: '14th century', institution: 'Biblioteca Medicea Laurenziana, Plut. 86.3, fol. 46v', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Iamblichos,_Protreptikos.jpg', ...publicDomain,
    attribution: 'Iamblichus, Protrepticus, Biblioteca Medicea Laurenziana Plut. 86.3. Public domain.', scene: [427, 640], panel: [724, 1084],
    alt: 'A Greek manuscript page opens Iamblichus’s Protrepticus with rubricated lines.', caption: 'The oldest major manuscript witness to Iamblichus’s Protrepticus.', historicalNote: 'The manuscript is medieval, not an authorial copy, but it is direct evidence for the text’s transmission.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'proclus-platonic-theology-manuscript', folder: 'late-antiquity-inheritance', entityKind: 'philosopher', entityId: 'proclus', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Proclus, Platonic Theology', creator: 'Proclus; anonymous copyist', objectDate: 'Medieval Greek manuscript', institution: 'Biblioteca Nazionale Marciana, Gr. 547, fol. 1r', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Proclus,_Venice,_Gr._547,_fol._1r.jpg', ...publicDomain,
    attribution: 'Proclus, Platonic Theology, Venice, Biblioteca Marciana Gr. 547. Public domain.', scene: [456, 640], panel: [911, 1280],
    alt: 'A manuscript opening of Proclus’s Platonic Theology surrounds Greek text with decorated initials.', caption: 'A later Greek manuscript witness to Proclus’s Platonic Theology.', historicalNote: 'The manuscript transmits Proclus’s work but was copied long after his lifetime.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'augustine-lateran-fresco', folder: 'late-antiquity-inheritance', entityKind: 'philosopher', entityId: 'augustine', role: 'identity', mediaKind: 'painting',
    title: 'Lateran portrait of Augustine', creator: 'Unknown artist', objectDate: '6th century', institution: 'Lateran, Rome', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:AugustineLateran.jpg', ...publicDomain,
    attribution: 'Unknown artist, Lateran portrait of Augustine, sixth century. Public domain.', scene: [375, 640], panel: [422, 720],
    alt: 'A weathered early fresco depicts Augustine with a narrow face, short beard, and book.', caption: 'A sixth-century Lateran image, among the earliest surviving portraits associated with Augustine.', historicalNote: 'Created after Augustine’s death, the fresco is early reception rather than a portrait made from life.', likenessStatus: 'posthumous-portrait', focalPoint: {x: .5, y: .36},
  }),
  asset({
    id: 'origen-schaftlarn-manuscript', folder: 'late-antiquity-inheritance', entityKind: 'philosopher', entityId: 'origen', role: 'material-history', mediaKind: 'manuscript',
    title: 'Origen as author in a Schäftlarn manuscript', creator: 'Anonymous medieval illuminator', objectDate: 'c. 1160', institution: 'Bayerische Staatsbibliothek, Clm 17092, fol. 130v', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Origen3.jpg', ...publicDomain,
    attribution: 'Origen in Bayerische Staatsbibliothek Clm 17092, c. 1160. Public domain.', scene: [220, 343], panel: [220, 343],
    alt: 'A medieval manuscript miniature presents Origen writing beside a decorated initial.', caption: 'A twelfth-century author portrait of Origen in a manuscript of his homilies.', historicalNote: 'The miniature is a medieval imagined author portrait, not a late-antique likeness.', likenessStatus: 'imagined',
  }),
  asset({
    id: 'gregory-nyssa-mosaic', folder: 'late-antiquity-inheritance', entityKind: 'philosopher', entityId: 'gregory-nyssa', role: 'material-history', mediaKind: 'painting',
    title: 'Mosaic of Gregory of Nyssa', creator: 'Unknown Byzantine mosaicist', objectDate: 'Byzantine period', institution: 'Later Byzantine church context', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:St._Gregory_of_Nyssa.jpg', ...publicDomain,
    attribution: 'Byzantine mosaic of Gregory of Nyssa. Public domain.', scene: [331, 450], panel: [331, 450],
    alt: 'A gold-ground mosaic presents Gregory of Nyssa as a bearded bishop holding a book.', caption: 'A later Byzantine mosaic remembers Gregory of Nyssa as bishop and author.', historicalNote: 'The image is devotional reception created long after Gregory’s lifetime, not documentary portraiture.', likenessStatus: 'later-traditional-representation', focalPoint: {x: .5, y: .38},
  }),
  asset({
    id: 'pseudo-dionysius-opera-1556', folder: 'late-antiquity-inheritance', entityKind: 'philosopher', entityId: 'pseudo-dionysius', role: 'material-history', mediaKind: 'book-page',
    title: 'Pseudo-Dionysius, Opera title page', creator: 'Anonymous Cologne printer', objectDate: '1556', institution: 'University of Glasgow Special Collections', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Pseudo-Dionysius.jpg', ...publicDomain,
    attribution: 'Pseudo-Dionysius, Opera, Cologne, 1556. University of Glasgow. Public domain.', scene: [379, 640], panel: [591, 997],
    alt: 'An ornate sixteenth-century title page presents the collected works attributed to Dionysius.', caption: 'A 1556 Opera records the corpus’s early modern authority and circulation.', historicalNote: 'The author used the name of the biblical Dionysius; modern scholarship distinguishes the late-fifth- or early-sixth-century writer as Pseudo-Dionysius.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'neoplatonic-porphyrian-tree', folder: 'late-antiquity-inheritance', entityKind: 'philosopher', entityId: 'porphyry', role: 'context', mediaKind: 'drawing',
    title: 'Arbor porphyrii', creator: 'Attributed on the source record to Boethius', objectDate: 'Sixth century (source-record attribution; uncertain)', institution: 'No holding institution supplied; Wikimedia Commons reproduction', sourcePageUrl: "https://commons.wikimedia.org/wiki/File:Arbor_porphyrii_(probably_from_one_of_Boethius'_translations).png", ...publicDomain,
    attribution: 'Arbor porphyrii, attributed to Boethius and dated to the sixth century on the source record. Public domain.', scene: [605, 640], panel: [1211, 1280],
    alt: 'A branching Latin diagram divides substance through successive genera and differences.', caption: 'The Porphyrian tree turns a short logical introduction into a durable visual classifier.', historicalNote: 'The tree’s familiar graphic form is a later reception device; Porphyry did not leave this exact diagram.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'late-augustine-confessions-manuscript', folder: 'late-antiquity-inheritance', entityKind: 'philosopher', entityId: 'augustine', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Augustine, Confessiones', creator: 'Augustine; copied by Henricus de Bocholdia', objectDate: '1471', institution: 'Universitätsbibliothek Basel, A IV 4, fol. 1r', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Basel,_Universitätsbibliothek,_A_IV_4,_f._1r_–_Aurelius_Augustinus,_Confessiones.JPG', ...publicDomain,
    attribution: 'Augustine, Confessiones, Universitätsbibliothek Basel A IV 4, fol. 1r. Public domain.', scene: [480, 640], panel: [960, 1280],
    alt: 'A fifteenth-century manuscript opening of Augustine’s Confessions begins with a decorated initial.', caption: 'A 1471 manuscript witnesses the long material afterlife of the Confessions.', historicalNote: 'The manuscript is more than a thousand years later than Augustine and should not be mistaken for his working copy.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'late-celestial-hierarchy-manuscript', folder: 'late-antiquity-inheritance', entityKind: 'philosopher', entityId: 'pseudo-dionysius', role: 'context', mediaKind: 'manuscript',
    title: 'The Nine Choirs of Angels', creator: 'Dirc van Delft', objectDate: '1400–1404', institution: 'Walters Art Museum, W.171.6V', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Dirc_van_Delft_-_The_Nine_Choirs_of_Angels_-_Walters_W1716V_-_Full_Page.jpg', ...publicDomain,
    attribution: 'Dirc van Delft, The Nine Choirs of Angels, Walters Art Museum W.171.6V, 1400–1404. Public domain.', scene: [579, 640], panel: [648, 716],
    alt: 'A medieval illuminated initial arranges nine groups of angels in three horizontal tiers against gold and blue grounds.', caption: 'Dirc van Delft’s 1400–1404 illumination visualizes the nine angelic choirs in a later medieval reception.', historicalNote: 'The illumination is a medieval visualization of angelic ranks, not a manuscript of Pseudo-Dionysius, an authorial image, or evidence for the corpus’s original setting.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'late-greek-aristotle-codex', folder: 'late-antiquity-inheritance', entityKind: 'branch', entityId: 'neoplatonism', role: 'material-history', mediaKind: 'manuscript',
    title: 'Aristotle, Politics IV, in Greek minuscule', creator: 'Anonymous post-Byzantine copyist', objectDate: '1493', institution: 'Reported as Biblioteca Nazionale di Napoli, III.E.2, fols. 157r–158? (source record)', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Greek_manuscript_minuscule_Aristotle.png', ...publicDomain,
    attribution: 'Aristotle, Politics IV, post-Byzantine Greek manuscript dated 1493, reported as Naples, Biblioteca Nazionale III.E.2. Public domain.', scene: [498, 407], panel: [498, 407],
    alt: 'An open Greek minuscule manuscript of Aristotle’s Politics has dense text and a large ornamental initial.', caption: 'A 1493 Greek Politics manuscript provides later material context for the commentary tradition.', historicalNote: 'The page is a post-Byzantine witness, not an autograph or a surviving late-antique classroom copy; the reported shelfmark and folio range remain qualified to the source record.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'late-boethius-consolation-manuscript', folder: 'late-antiquity-inheritance', entityKind: 'branch', entityId: 'neoplatonism', role: 'context', mediaKind: 'manuscript',
    title: 'Boethius teaching and imprisoned', creator: 'Gregorius of Genoa and the scribe Brother Amadeus', objectDate: 'Italy, 1385', institution: 'University of Glasgow Library, MS Hunter 374, fol. 4r', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Consolation_of_philosophy_1385_boethius_images.jpg', ...publicDomain,
    attribution: 'Boethius, Consolation of Philosophy, MS Hunter 374, fol. 4r. Public domain.', scene: [462, 640], panel: [924, 1280],
    alt: 'A manuscript page shows Boethius teaching above and imprisoned below.', caption: 'A 1385 Consolation manuscript stages Boethius as teacher and prisoner.', historicalNote: 'The miniatures are medieval reception images, but the work marks a consequential late-antique channel into Latin intellectual worlds.', likenessStatus: 'imagined',
  }),
  asset({
    id: 'late-hypatia-reception', folder: 'late-antiquity-inheritance', entityKind: 'branch', entityId: 'neoplatonism', role: 'context', mediaKind: 'drawing',
    title: 'Hypatia of Alexandria', creator: 'Jules Maurice Gaspard', objectDate: '1908', institution: 'Printed insert in Elbert Hubbard, Little Journeys to the Homes of Great Teachers, vol. 23, no. 4', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Hypatia.jpg', ...publicDomain,
    attribution: 'Jules Maurice Gaspard, Hypatia, 1908. Public domain.', scene: [303, 326], panel: [303, 326],
    alt: 'A 1908 classicalizing profile illustration imagines Hypatia as a young woman.', caption: 'Gaspard’s 1908 printed portrait is an imagined Hypatia, not a historical likeness.', historicalNote: 'No authenticated portrait of Hypatia survives. The image is explicitly modern reception and must not be read as her likeness.', likenessStatus: 'imagined', focalPoint: {x: .5, y: .45},
  }),
  asset({
    id: 'late-arabic-aristotle', folder: 'late-antiquity-inheritance', entityKind: 'branch', entityId: 'neoplatonism', role: 'context', mediaKind: 'manuscript',
    title: 'Aristotle instructing a pupil in Kitāb naʿt al-ḥayawān', creator: 'Unknown manuscript artist; modern photograph by British Library staff', objectDate: 'c. 1225, probably Baghdad; modern photograph', institution: 'British Library, Or. 2784, fols. 95v–96r', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Aristotle_instructs_a_pupil_in_the_%22Kitab_na%E2%80%98t_al-hayawan%22.jpg', ...cc0,
    attribution: 'Aristotle instructing a pupil, British Library Or. 2784, fols. 95v–96r. CC0 1.0.', scene: [640, 480], panel: [1280, 960],
    alt: 'An open Arabic manuscript depicts a haloed, seated Aristotle-like figure instructing another figure beside columns of text.', caption: 'A c. 1225 Arabic bestiary imagines Aristotle teaching and witnesses his later reception.', historicalNote: 'The miniature belongs to a later bestiary whose compiler drew on Aristotle and Ibn Bakhtīshūʿ; it is not a record of the Abbasid translation movement, Aristotle’s classroom, or a late-antique commentary session.', likenessStatus: 'imagined',
  }),
  asset({
    id: 'late-proclus-elements-latin', folder: 'late-antiquity-inheritance', entityKind: 'philosopher', entityId: 'proclus', role: 'material-history', mediaKind: 'engraving',
    title: 'Portrait of Francesco Patrizi', creator: 'Unidentified engraver; published with Francesco Patrizi’s work', objectDate: '1580 portrait; published in the 1581 Basel edition of Discussiones peripateticae', institution: 'Source record supplies no holding institution', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Francesco_Patrizi_1580.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Portrait of Francesco Patrizi, 1580, published in the 1581 Basel Discussiones peripateticae. Public domain.', scene: [503, 640], panel: [1005, 1280],
    alt: 'A sixteenth-century engraved oval portrait shows Francesco Patrizi in profile within a Latin inscription and ornamental border.', caption: 'A 1580 portrait identifies Patrizi, whose Latin Proclus belongs to the Elements’ Renaissance reception.', historicalNote: 'The print portrays the Renaissance translator and philosopher Francesco Patrizi, not Proclus, and is evidence of early-modern reception rather than the fifth-century work.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'late-ficino-iamblichus-manuscript', folder: 'late-antiquity-inheritance', entityKind: 'branch', entityId: 'neoplatonism', role: 'material-history', mediaKind: 'manuscript',
    title: 'Ficino’s preface to a Latin translation of Iamblichus', creator: 'Marsilio Ficino; anonymous copyist and illuminator', objectDate: '1491', institution: 'Biblioteca Medicea Laurenziana, Strozzi 97, fol. 1r', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Ficino,_De_mysteriis_Aegyptiorum.jpg', ...publicDomain,
    attribution: 'Marsilio Ficino, De mysteriis Aegyptiorum preface, BML Strozzi 97. Public domain.', scene: [425, 640], panel: [850, 1280],
    alt: 'An illuminated manuscript page opens Ficino’s Latin translation of Iamblichus’s On the Mysteries.', caption: 'Ficino’s 1491 Iamblichus translation shows late-antique Platonism reconstructed for Renaissance readers.', historicalNote: 'This is Renaissance transmission, not evidence for Iamblichus’s original manuscript or ritual practice.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'late-neoplatonic-reader-sarcophagus', folder: 'late-antiquity-inheritance', entityKind: 'branch', entityId: 'neoplatonism', role: 'context', mediaKind: 'sculpture-photograph',
    title: 'Roman sarcophagus relief of a public reader', creator: 'Unknown Roman sculptor; photographer unknown', objectDate: 'Roman imperial period; modern photograph', institution: 'Museo Gregoriano Profano, Vatican Museums', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Roman_sarcophagus_of_a_reader_identified_to_Plotinus_and_disciples.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Roman sarcophagus relief of a philosopher reading in public, Vatican Museums. Public domain.', scene: [573, 400], panel: [573, 400],
    alt: 'A Roman sarcophagus relief shows a seated reader holding an open scroll before a gathered group.', caption: 'A Roman sarcophagus relief stages philosophy as reading and teaching in public.', historicalNote: 'The relief has been identified as Plotinus with disciples, but Commons flags that attribution as speculative. The gallery uses it only as material context for late-antique philosophical teaching, not as a likeness or proof of a specific school.', likenessStatus: 'not-applicable',
  }),
] as const satisfies readonly MuseumAssetRecord[];
