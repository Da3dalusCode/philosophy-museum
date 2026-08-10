import type {MuseumAssetId, MuseumAssetRecord, MuseumAssetVariant} from './museumAssetTypes';

type GalleryAssetInput = Omit<MuseumAssetRecord, 'id' | 'variants'> & {
  id: MuseumAssetId;
  folder: 'latin-christian-scholastic' | 'rationalism-mind-nature-system';
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
const ccBy3 = {
  license: 'CC BY 3.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
  rightsKind: 'license' as const,
};
const ccBySa3 = {
  license: 'CC BY-SA 3.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  rightsKind: 'license' as const,
};
const ccBySa4 = {
  license: 'CC BY-SA 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  rightsKind: 'license' as const,
};
const derivativeNotice = 'Original image retained uncropped; resized and converted to WebP by Philosophy Atlas.';

export const SCHOLASTIC_RATIONALIST_GALLERY_ASSETS = [
  asset({
    id: 'scholastic-eriugena-stained-glass', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'eriugena', role: 'identity', mediaKind: 'painting',
    title: 'John Scotus Eriugena in stained glass', creator: 'Heaton, Butler & Bayne; design probably by Clement John Heaton the younger', objectDate: '1884', institution: 'Chapel of Emmanuel College, Cambridge', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:John-Scotus-Eriugena.png', ...ccBySa4, derivativeNotice,
    attribution: 'John Scotus Eriugena stained-glass window, executed by Heaton, Butler & Bayne, probably designed by Clement John Heaton the younger, Emmanuel College chapel, 1884, CC BY-SA 4.0.', scene: [235, 640], panel: [366, 998],
    alt: 'A nineteenth-century stained-glass window imagines Eriugena as a monk holding a book beneath a Celtic cross and tower.', caption: 'An 1884 Emmanuel College window, executed by Heaton, Butler & Bayne and probably designed by Clement John Heaton the younger, imagines John Scotus Eriugena.', historicalNote: 'Emmanuel College identifies the executing firm and treats the designer as probable rather than certain. Made roughly a millennium after Eriugena, this is institutional reception rather than evidence for his appearance, clothing, or surroundings.', likenessStatus: 'imagined', focalPoint: {x: .5, y: .39},
  }),
  asset({
    id: 'scholastic-university-lecture', folder: 'latin-christian-scholastic', entityKind: 'branch', entityId: 'medieval-scholasticism', role: 'context', mediaKind: 'manuscript',
    title: 'Aristotle lecturing to students', creator: 'Laurentius de Voltolina', objectDate: 'Second half of the 14th century', imageCreator: 'Jörg P. Anders', institution: 'Kupferstichkabinett Berlin, Min. 1233', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Laurentius_de_Voltolina_Vorlesung_vor_Studenten_-_Min_1233_-_Kupferstichkabinett_Berlin.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Laurentius de Voltolina, Aristotle lecturing to students, Kupferstichkabinett Berlin, Public Domain Mark 1.0.', scene: [640, 524], panel: [1280, 1049],
    alt: 'A medieval miniature shows a teacher at a raised desk before rows of students reading, listening, and talking.', caption: 'A fourteenth-century Bologna miniature stages a university lecture.', historicalNote: 'This is a later idealized image of Aristotle teaching in a medieval setting, useful for the social form of the lecture but not a documentary view of one specific class.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-anselm-cur-deus-homo', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'anselm', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Beginning of the preface to Anselm’s Cur Deus Homo', creator: 'Anselm of Canterbury; unknown copyist', objectDate: '12th century', institution: 'Lambeth Palace Library, MS 224', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Ms_224_anselm.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Anselm, Cur Deus Homo, Lambeth Palace Library MS 224. Public Domain Mark 1.0.', scene: [400, 365], panel: [400, 365],
    alt: 'A manuscript opening presents compact Latin text from the preface to Anselm’s Cur Deus Homo.', caption: 'A twelfth-century witness to the preface of Cur Deus Homo.', historicalNote: 'The page is a medieval copy, not Anselm’s autograph. Its proximity in date does not establish that he supervised this particular manuscript.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-abelard-heloise-manuscript', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'abelard', role: 'context', mediaKind: 'manuscript',
    title: 'Abelard and Heloise in a Roman de la Rose manuscript', creator: 'Anonymous Parisian illuminator', objectDate: 'c. 1345–1365 (pictured leaf also catalogued c. 1370)', institution: 'Musée Condé, MS 482, fol. 60v', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Abelardo_ed_Eloisa.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Abelard and Heloise, Roman de la Rose, Musée Condé MS 482, fol. 60v. Public Domain Mark 1.0.', scene: [324, 428], panel: [324, 428],
    alt: 'A fourteenth-century illumination imagines Abelard and Heloise seated together beneath an architectural canopy.', caption: 'A fourteenth-century Roman de la Rose illumination imagines Abelard and Heloise.', historicalNote: 'The manuscript is dated 1345–1365 by Biblissima/IRHT, while the pictured leaf has also been catalogued c. 1370. Painted about two centuries after their lives, the scene belongs to their literary reception and is not a portrait or eyewitness record of their relationship.', likenessStatus: 'imagined',
  }),
  asset({
    id: 'scholastic-aquinas-crivelli', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'aquinas', role: 'identity', mediaKind: 'painting',
    title: 'Saint Thomas Aquinas', creator: 'Carlo Crivelli', objectDate: '1476', institution: 'National Gallery, London, NG788.9', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:St-thomas-aquinas.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Carlo Crivelli, Saint Thomas Aquinas, 1476, National Gallery, London. Public Domain Mark 1.0.', scene: [427, 640], panel: [854, 1280],
    alt: 'A gold-ground altarpiece panel depicts Thomas Aquinas in a Dominican habit holding a church and an open book.', caption: 'Carlo Crivelli’s devotional Thomas Aquinas, painted in 1476.', historicalNote: 'Crivelli painted this image two centuries after Aquinas’s death. It is a devotional and institutional representation, not an authenticated likeness.', likenessStatus: 'later-traditional-representation', focalPoint: {x: .5, y: .36},
  }),
  asset({
    id: 'scholastic-scotus-urbino', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'duns-scotus', role: 'identity', mediaKind: 'painting',
    title: 'John Duns Scotus in the Urbino uomini illustri series', creator: 'Justus van Gent and Pedro Berruguete', objectDate: 'c. 1473–1476; modern photograph', imageCreator: 'Fabrizio Garrisi', institution: 'Galleria Nazionale delle Marche, Urbino, inv. 1990 D 54', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Duns_Scotus_Painting_(cropped).jpg', ...ccBySa4, derivativeNotice,
    attribution: 'Justus van Gent and Pedro Berruguete, John Duns Scotus; photograph by Fabrizio Garrisi, CC BY-SA 4.0.', scene: [457, 640], panel: [914, 1280],
    alt: 'A Renaissance portrait panel shows Duns Scotus in a dark cap and robe reading from an open book.', caption: 'A late-fifteenth-century Urbino portrait of Duns Scotus.', historicalNote: 'The painting postdates Scotus by well over a century and belongs to a Renaissance gallery of illustrious men; it is not an authenticated likeness.', likenessStatus: 'later-traditional-representation', focalPoint: {x: .5, y: .4},
  }),
  asset({
    id: 'scholastic-ockham-logica', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'ockham', role: 'identity', mediaKind: 'manuscript',
    title: 'Sketch labelled “frater Occham iste”', creator: 'Unknown copyist or annotator in a manuscript of Ockham’s Summa logicae', objectDate: '1341', institution: 'Gonville and Caius College, Cambridge, MS 464/571, fol. 69r', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:William_of_Ockham_-_Logica_1341.jpg', ...publicDomain, derivativeNotice,
    attribution: 'William of Ockham, Summa logicae manuscript sketch, 1341, Gonville and Caius College. Public Domain Mark 1.0.', scene: [400, 373], panel: [400, 373],
    alt: 'A small ink sketch beside manuscript text depicts a tonsured friar and labels him as Ockham.', caption: 'A 1341 Summa logicae manuscript labels a sketch “this is Brother Ockham.”', historicalNote: 'The label makes the identification unusually direct, but the sketch’s maker and relationship to Ockham are unknown; it should not be treated as a verified portrait from life.', likenessStatus: 'attributed', focalPoint: {x: .32, y: .44},
  }),
  asset({
    id: 'scholastic-eckhart-fragment', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'meister-eckhart', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Early fragment of Meister Eckhart’s sermon 5b', creator: 'Unknown medieval copyist', objectDate: 'Medieval text witness; photograph released 2010', imageCreator: 'Georg-August-Universität Göttingen', institution: 'Georg-August-Universität Göttingen', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Meister_Eckhart_Fragment_1003.jpg', ...ccBy3, derivativeNotice,
    attribution: 'Early witness to Meister Eckhart’s sermon 5b, photograph by Georg-August-Universität Göttingen, CC BY 3.0.', scene: [404, 640], panel: [808, 1280],
    alt: 'A narrow, worn manuscript fragment preserves lines of a German sermon in dark ink.', caption: 'One of the oldest known witnesses to Meister Eckhart’s sermon 5b.', historicalNote: 'The photograph documents a transmitted sermon fragment, not an autograph. Dating and textual relation must be established through manuscript study rather than inferred from the modern file date.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-marsilius-defensor', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'marsilius-padua', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Defensor pacis manuscript page', creator: 'Marsilius of Padua; unknown copyist', objectDate: 'First half of the 14th century', institution: 'Arxiu Capitular de la Catedral de Tortosa, MS 141, fol. 2r', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Marsilius,_Defensor_pacis,_Tortosa.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Marsilius of Padua, Defensor pacis, Tortosa Cathedral Archive MS 141, fol. 2r. Public Domain Mark 1.0.', scene: [495, 640], panel: [989, 1280],
    alt: 'A densely written medieval manuscript page opens the Defensor pacis with a decorated initial.', caption: 'A fourteenth-century manuscript witness to Marsilius’s Defensor pacis.', historicalNote: 'The folio transmits the work but is not presented as Marsilius’s autograph; its value is material evidence for the text’s early circulation.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-boethius-topics', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'boethius', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Boethius’s Latin translation of Aristotle’s Topics', creator: 'Boethius; unknown medieval copyist', objectDate: 'Medieval manuscript', institution: 'Bibliothèque nationale de France, MS Latin 1338, fol. 221bis-v', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:BnF_lat._1338,_f._221bis-v.JPEG', ...publicDomain, derivativeNotice,
    attribution: 'Boethius’s translation of Aristotle’s Topics, BnF MS Latin 1338, fol. 221bis-v. Public Domain Mark 1.0.', scene: [370, 640], panel: [740, 1280],
    alt: 'A manuscript leaf combines a chronicle on its outside with Boethius’s Latin Aristotle text on the inside.', caption: 'A medieval codex preserves Boethius’s Latin translation of Aristotle’s Topics.', historicalNote: 'This is a later copy of Boethius’s translation, not his autograph, and the composite folio also preserves an unrelated chronicle text.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-consolation-wheel', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'boethius', role: 'context', mediaKind: 'manuscript',
    title: 'Wheel of Fortune in the Carmina Burana manuscript', creator: 'Unknown illuminator', objectDate: 'c. 1220', institution: 'Bayerische Staatsbibliothek, Codex Buranus', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Wheel-of-fortune-carmina-burana.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Wheel of Fortune, Carmina Burana manuscript, c. 1220. Public Domain Mark 1.0.', scene: [429, 640], panel: [859, 1280],
    alt: 'A medieval illumination shows Fortune turning a wheel that raises and casts down crowned figures.', caption: 'The Carmina Burana Wheel of Fortune visualizes mutability in later medieval culture.', historicalNote: 'This image is not from a Consolation manuscript and was made centuries after Boethius. It is displayed as reception context for the wheel motif, not as an illustration he commissioned.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-caroline-minuscule', folder: 'latin-christian-scholastic', entityKind: 'branch', entityId: 'medieval-scholasticism', role: 'material-history', mediaKind: 'manuscript',
    title: 'Vita Sancti Martini in Caroline minuscule', creator: 'Unknown monastic copyist', objectDate: '8th century', institution: 'Bibliothèque nationale de France', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Caroline_2.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Vita Sancti Martini manuscript page in Caroline minuscule, Bibliothèque nationale de France. Public Domain Mark 1.0.', scene: [524, 462], panel: [524, 462],
    alt: 'A parchment leaf displays evenly spaced Latin writing in an early Caroline minuscule hand.', caption: 'An early Caroline-minuscule page makes a new, highly legible bookhand visible.', historicalNote: 'The leaf preserves Sulpicius Severus’s Vita Sancti Martini, not a philosophical work; it is material context for the script and copying practices that supported later transmission.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-eriugena-periphyseon', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'eriugena', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Eriugena’s Periphyseon, Reims MS 875', creator: 'John Scotus Eriugena and associated ninth-century hands', objectDate: '9th century', institution: 'Bibliothèque municipale de Reims, MS 875, fol. 15v', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Eriugena,_Periphyseon,_Reims,_875.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Eriugena, Periphyseon, Reims Bibliothèque municipale MS 875, fol. 15v. Public Domain Mark 1.0.', scene: [591, 640], panel: [1182, 1280],
    alt: 'A ninth-century Latin manuscript page contains dense text, corrections, and marginal additions from several hands.', caption: 'Reims MS 875 is believed to preserve Eriugena’s own hand in part.', historicalNote: 'Scholarship has identified portions as probably autograph, but that does not mean every word or intervention on this displayed folio is securely in Eriugena’s hand.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-abelard-apologia-manuscript', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'abelard', role: 'material-history', mediaKind: 'manuscript',
    title: 'A twelfth-century manuscript of Abelard’s Apologia contra Bernardum', creator: 'Peter Abelard; unknown copyist', objectDate: '12th century', institution: 'Bayerische Staatsbibliothek, Clm 28363', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Abaelard.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Peter Abelard, Apologia contra Bernardum, Bayerische Staatsbibliothek Clm 28363. Public Domain Mark 1.0.', scene: [374, 540], panel: [374, 540],
    alt: 'A twelfth-century Latin manuscript page opens a work by Peter Abelard with a large decorated initial.', caption: 'A twelfth-century Abelard manuscript provides material context for his contested writings.', historicalNote: 'The photographed work is Apologia contra Bernardum, not Sic et Non. It supports the exhibit as an early Abelard manuscript but must not be mislabeled as a witness to the displayed work.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-heloise-letters', folder: 'latin-christian-scholastic', entityKind: 'branch', entityId: 'medieval-scholasticism', role: 'material-history', mediaKind: 'book-page',
    title: 'Upper cover of Lettres et épîtres amoureuses d’Héloïse et d’Abélard', creator: 'Boutigny of Paris, binder', objectDate: 'Text published 1839; binding from the second quarter of the 19th century', institution: 'British Library, shelfmark c155f8', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Lettres_et_epitres_amoureuses_d%27Heloise_et_d%27Abeilard._-_Upper_cover_(c155f8).jpg', ...cc0, derivativeNotice,
    attribution: 'Boutigny of Paris, binding for Lettres et épîtres amoureuses d’Héloïse et d’Abélard, British Library, CC0 1.0.', scene: [472, 640], panel: [944, 1280],
    alt: 'A purple nineteenth-century goatskin book cover is richly stamped in gold around its title.', caption: 'A nineteenth-century binding shows the long, ornate reception of the Heloise–Abelard letters.', historicalNote: 'Neither the 1839 text nor its binding is a medieval witness. The object is used to expose later romantic framing, not to authenticate the correspondence or picture Heloise’s own book.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-sorbonne-theology', folder: 'latin-christian-scholastic', entityKind: 'branch', entityId: 'medieval-scholasticism', role: 'context', mediaKind: 'manuscript',
    title: 'Theology lesson at the Sorbonne', creator: 'Unknown illuminator', objectDate: 'Late 15th century', institution: 'Médiathèque Jacques Chirac, Troyes', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Cours_de_th%C3%A9ologie_%C3%A0_la_Sorbonne_-_Biblioth%C3%A8que_de_Troyes.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Theology lesson at the Sorbonne, late-fifteenth-century illumination, Troyes. Public Domain Mark 1.0.', scene: [640, 417], panel: [1278, 832],
    alt: 'A late medieval illumination shows a theology master teaching from a lectern to seated scholars.', caption: 'A late-fifteenth-century illumination represents theology teaching at the Sorbonne.', historicalNote: 'The image is a later representation of university teaching and cannot document one particular thirteenth-century disputation or classroom arrangement.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-aquinas-summa-basel', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'aquinas', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Thomas Aquinas, Summa theologiae, prima pars', creator: 'Thomas Aquinas; unknown fifteenth-century copyist', objectDate: '15th century', institution: 'Universitätsbibliothek Basel, A I 14, fol. 69v', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Basel,_Universit%C3%A4tsbibliothek,_A_I_14,_f._69v_%E2%80%93_Thomas_Aquinas,_Summa_theologiae_(prima_pars.JPG', ...publicDomain, derivativeNotice,
    attribution: 'Thomas Aquinas, Summa theologiae, Universitätsbibliothek Basel A I 14, fol. 69v. Public Domain Mark 1.0.', scene: [480, 640], panel: [960, 1280],
    alt: 'A carefully written fifteenth-century manuscript page arranges Aquinas’s text with colored initials and marginal structure.', caption: 'A Basel manuscript makes the Summa’s organized question tradition materially visible.', historicalNote: 'Copied long after Aquinas, the manuscript is a transmission witness rather than an authorial page. Its visual divisions should not be mistaken for a complete diagram of the work’s argument.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-aquinas-summa-1482', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'aquinas', role: 'material-history', mediaKind: 'book-page',
    title: 'Thomas Aquinas, Summa theologiae', creator: 'Thomas Aquinas; printed by Antonius de Strata de Cremona', objectDate: 'Venice, 1482', institution: 'Public-domain early printed edition', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Thomas_Aquinas_Summa_theologiae_1482.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Thomas Aquinas, Summa theologiae, Venice: Antonius de Strata de Cremona, 1482. Public Domain Mark 1.0.', scene: [469, 640], panel: [640, 874],
    alt: 'An early printed Summa page surrounds two columns of type with rubrication and handwritten annotation.', caption: 'A 1482 Venetian edition carries the Summa into print.', historicalNote: 'This incunable was printed two centuries after Aquinas and does not preserve his own page layout. It documents print-era reception and study.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-aquinas-summa-1477', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'aquinas', role: 'material-history', mediaKind: 'book-page',
    title: 'Thomas Aquinas, Summa theologiae, Pars prima', creator: 'Thomas Aquinas; printed by Nicolaus Jenson; edited by Franciscus de Neritono, Petrus Cantianus, and Joannes Franciscus', objectDate: 'Venice, 1477; modern photograph', imageCreator: 'Codex', institution: 'Queen’s University collection', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Summa_theologica_1477.jpg', ...ccBySa3, derivativeNotice,
    attribution: 'Thomas Aquinas, Summa theologiae, Pars prima, printed by Nicolaus Jenson, Venice, 1477; photograph by Codex, CC BY-SA 3.0.', scene: [403, 640], panel: [806, 1280],
    alt: 'A photographed 1477 printed Summa page displays dense black-letter type, colored initials, and annotations.', caption: 'A page from Nicolaus Jenson’s 1477 Venetian edition records the Summa’s early print history and continued reading.', historicalNote: 'The incunable was edited by Franciscus de Neritono, Petrus Cantianus, and Joannes Franciscus. It is not Aquinas’s manuscript, and its modern photograph documents one surviving copy rather than the entire early print history.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-condemnation-1277', folder: 'latin-christian-scholastic', entityKind: 'branch', entityId: 'medieval-scholasticism', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Articles of the condemnation of 1277', creator: 'Associated with Bishop Étienne Tempier; unknown manuscript copyist', objectDate: '1277 document in a later manuscript witness', institution: 'Bibliothèque nationale de France / Gallica', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:1277_condemn_70.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Articles of the condemnation of 1277, Bibliothèque nationale de France / Gallica. Public Domain Mark 1.0.', scene: [640, 442], panel: [1280, 883],
    alt: 'A wide manuscript opening contains compact Latin articles associated with the Paris condemnation of 1277.', caption: 'A manuscript witness preserves articles condemned at Paris in 1277.', historicalNote: 'The list records prohibited propositions but does not by itself identify every author, context, or target. The image should not be used as proof that all articles were taught by one thinker.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-eckhart-recantation', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'meister-eckhart', role: 'primary-source', mediaKind: 'document',
    title: 'Notarial instrument concerning Meister Eckhart’s public declaration', creator: 'Wolter von Kettwig, notary', objectDate: '13 February 1327', institution: 'Vatican Apostolic Archive, Archivum Arcis, Arm. C, 1123', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Meister_Eckhart,_recantation,_1327.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Wolter von Kettwig, notarial instrument concerning Meister Eckhart, 1327, Vatican Apostolic Archive. Public Domain Mark 1.0.', scene: [482, 640], panel: [964, 1280],
    alt: 'A tall notarial document records a Latin declaration in dense lines beneath a large opening initial.', caption: 'A 1327 notarial instrument records Eckhart’s conditional public declaration during proceedings at Cologne.', historicalNote: 'Calling this simply a recantation can obscure its conditional language and procedural setting: Eckhart disavowed error while maintaining he had not knowingly taught it.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-boethius-miniature', folder: 'latin-christian-scholastic', entityKind: 'philosopher', entityId: 'boethius', role: 'identity', mediaKind: 'manuscript',
    title: 'Boethius with a monochord', creator: 'Unknown manuscript illuminator', objectDate: 'Early 12th century', institution: 'Cambridge University Library, MS Ii.3.12, fol. 61v', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Boethius.jpeg', ...publicDomain, derivativeNotice,
    attribution: 'Boethius with a monochord, early-twelfth-century manuscript illumination, Cambridge University Library MS Ii.3.12, fol. 61v. Public Domain Mark 1.0.', scene: [453, 640], panel: [499, 705],
    alt: 'An early-twelfth-century illumination imagines a crowned Boethius seated with a red-stringed monochord across his lap.', caption: 'A medieval De institutione musica manuscript imagines Boethius demonstrating a monochord.', historicalNote: 'The miniature was made roughly six centuries after Boethius’s death. It is valuable evidence for his medieval reception and musical authority, not for his appearance or late-antique surroundings.', likenessStatus: 'imagined', focalPoint: {x: .5, y: .35},
  }),
  asset({
    id: 'scholastic-aristotle-latin-physics', folder: 'latin-christian-scholastic', entityKind: 'branch', entityId: 'medieval-scholasticism', role: 'material-history', mediaKind: 'manuscript',
    title: 'Aristotle’s Physics in William of Moerbeke’s Latin translation', creator: 'Aristotle; translated by William of Moerbeke; later marginalia associated with Giannozzo Manetti', objectDate: 'Italy, 14th century; Greek and Latin marginalia added in the 15th century', institution: 'Biblioteca Apostolica Vaticana, Pal. lat. 1033, fol. 1r', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Aristotle_latin_manuscript.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Aristotle, Physics, William of Moerbeke’s Latin translation, Italy, 14th century; later marginalia associated with Giannozzo Manetti. BAV Pal. lat. 1033, fol. 1r. Public Domain Mark 1.0.', scene: [464, 640], panel: [929, 1280],
    alt: 'A heavily annotated manuscript page presents Aristotle’s Physics in two Latin columns, with Greek and Latin additions crowding the margins.', caption: 'A fourteenth-century copy of Moerbeke’s Greek-to-Latin Physics translation bears later humanist Greek and Latin annotation.', historicalNote: 'This folio documents direct Greek–Latin translation and fifteenth-century humanist study; it is not material evidence for Arabic or Hebrew mediation. It appears in the connected-reading-worlds installation as a contrasting transmission path within a broader history that also includes independent Islamic and Jewish philosophical projects.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'scholastic-porphyrian-tree-fresco', folder: 'latin-christian-scholastic', entityKind: 'branch', entityId: 'medieval-scholasticism', role: 'material-history', mediaKind: 'painting',
    title: 'The Tree of Porphyry', creator: 'Franz Georg Hermann', imageCreator: 'Andreas Praefcke', objectDate: '18th-century fresco; photographed 2011', institution: 'Schussenried Monastery library hall, Bad Schussenried', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Schussenried_Kloster_Bibliothekssaal_Gew%C3%B6lbefresko_Baum_des_Porphyrius.jpg', license: 'Public-domain dedication by the photographer', licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-self', rightsKind: 'dedication', derivativeNotice,
    attribution: 'Franz Georg Hermann, Tree of Porphyry ceiling fresco; photograph by Andreas Praefcke, public-domain dedication.', scene: [384, 640], panel: [768, 1280],
    alt: 'A richly colored monastery-library ceiling fresco turns the Porphyrian hierarchy into a monumental tree rising through painted figures and clouds.', caption: 'An eighteenth-century library fresco monumentalizes the Porphyrian tree long after its medieval classroom use.', historicalNote: 'The fresco postdates medieval scholasticism and Porphyry by centuries. It is evidence for the diagram’s durable reception, not Porphyry’s own image and not a neutral settlement of debates about universals.', likenessStatus: 'not-applicable',
  }),

  asset({
    id: 'rationalism-cartesian-vortices', folder: 'rationalism-mind-nature-system', entityKind: 'branch', entityId: 'rationalism', role: 'context', mediaKind: 'engraving',
    title: 'Descartes’s mechanical universe of plenum and vortices', creator: 'Illustration published in René Descartes’s Principia philosophiae', objectDate: '1644', institution: 'Library of Congress, cph.3b46131', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Illustration_showing_Descartes%27_mechanical_view_of_a_universe_filled_with_plenum_and_a_system_of_vortexes_that_carries_planets_around_the_sun_LCCN92518505.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Descartes, Principia philosophiae vortex illustration, 1644, Library of Congress. Public Domain Mark 1.0.', scene: [414, 640], panel: [828, 1280],
    alt: 'A seventeenth-century diagram fills the cosmos with nested swirling vortices carrying celestial bodies.', caption: 'A 1644 illustration visualizes Descartes’s plenum and vortex cosmology.', historicalNote: 'The sheet documents one Cartesian natural-philosophical model. “Rationalism” is a later historiographic grouping, not a unified seventeenth-century club or a doctrine exhausted by this cosmology.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'rationalism-conway-portrait', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'anne-conway', role: 'context', mediaKind: 'painting',
    title: 'Perspective View with a Woman Reading a Letter', creator: 'Samuel van Hoogstraten', objectDate: 'c. 1670', institution: 'Mauritshuis, The Hague, no. 66', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Samuel_van_Hoogstraten_-_Perspective_View_with_a_Woman_Reading_a_Letter_-_66_-_Mauritshuis.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Samuel van Hoogstraten, Perspective View with a Woman Reading a Letter, c. 1670, Mauritshuis. Public Domain Mark 1.0.', scene: [471, 640], panel: [941, 1280],
    alt: 'An elaborate perspective interior opens through doorways toward a woman reading a letter beside a window.', caption: 'Van Hoogstraten’s interior has been proposed, but not established, as depicting Anne Conway.', historicalNote: 'The Mauritshuis titles this architectural painting Perspective View with a Woman Reading a Letter. Identifying its unnamed woman as Anne Conway is disputed; no authenticated likeness of Conway is known, so this image must remain contextual rather than biographical proof.', likenessStatus: 'uncertain',
  }),
  asset({
    id: 'rationalism-leibniz-francke', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'leibniz', role: 'identity', mediaKind: 'painting',
    title: 'Portrait of Gottfried Wilhelm Leibniz', creator: 'Christoph Bernhard Francke', objectDate: '1695', institution: 'Herzog Anton Ulrich-Museum, Braunschweig, GG 558', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Christoph_Bernhard_Francke_-_Bildnis_des_Philosophen_Leibniz_(ca._1695).jpg', ...publicDomain, derivativeNotice,
    attribution: 'Christoph Bernhard Francke, Portrait of Gottfried Wilhelm Leibniz, 1695, Herzog Anton Ulrich-Museum. Public Domain Mark 1.0.', scene: [518, 640], panel: [1037, 1280],
    alt: 'A formal lifetime portrait shows Leibniz in a long curled wig, dark coat, and white cravat.', caption: 'Francke’s 1695 lifetime portrait of Gottfried Wilhelm Leibniz.', historicalNote: 'Painted during Leibniz’s lifetime, this is stronger likeness evidence than a later imagined portrait, though it remains a formally staged courtly image.', likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .38},
  }),
  asset({
    id: 'rationalism-meditations-1641', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'descartes', role: 'primary-source', mediaKind: 'book-page',
    title: 'Meditationes de prima philosophia title page', creator: 'René Descartes; printed by Michel Soly', objectDate: 'Paris, 1641', institution: 'Bibliothèque nationale de France / Gallica', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Meditationes_de_prima_philosophia_1641.jpg', ...publicDomain, derivativeNotice,
    attribution: 'René Descartes, Meditationes de prima philosophia, first Latin edition, 1641, BnF. Public Domain Mark 1.0.', scene: [395, 640], panel: [790, 1280],
    alt: 'The Latin title page of Descartes’s 1641 Meditations is printed in black and red type within a simple border.', caption: 'The first Latin edition of Descartes’s Meditations, Paris, 1641.', historicalNote: 'The title page anchors the first edition, including the work’s public setting among objections and replies; it is not Descartes’s manuscript draft.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'rationalism-elisabeth-portrait', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'elisabeth-palatinate', role: 'identity', mediaKind: 'painting',
    title: 'Portrait miniature of Elisabeth of the Palatinate', creator: 'Alexander Cooper, after Gerrit van Honthorst', objectDate: 'c. 1640–1650', institution: 'Rijksmuseum, Amsterdam, SK-A-4314', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Elizabeth_(1618-80)_van_de_Paltz,_dochter_van_Frederik_V,_koning_van_Bohemen,_bijgenaamd_de_%27Winterkoning%27_Rijksmuseum_SK-A-4314.jpeg', ...cc0, derivativeNotice,
    attribution: 'Alexander Cooper, Elisabeth of the Palatinate, c. 1640–1650, Rijksmuseum, CC0 1.0.', scene: [459, 640], panel: [917, 1280],
    alt: 'A small oval miniature shows Elisabeth of the Palatinate in profile with dark hair, pearls, and a pale dress.', caption: 'A contemporary portrait miniature of Princess Elisabeth, after a Honthorst portrait.', historicalNote: 'The Rijksmuseum notes that the miniature was formerly misidentified as Henrietta Maria Stuart. Its corrected identification and derivative relation to Honthorst should remain visible.', likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .38},
  }),
  asset({
    id: 'rationalism-descartes-pineal', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'descartes', role: 'material-history', mediaKind: 'drawing',
    title: 'Physiological diagram published with Descartes’s Treatise of Man', creator: 'Illustrator not established by this reproduction', objectDate: 'Posthumous seventeenth-century publication illustration; exact edition not established', institution: 'Wikimedia Commons reproduction after a modern Cambridge edition', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Descartes_diagram.png', ...publicDomain, derivativeNotice,
    attribution: 'Unidentified illustrator, posthumous publication diagram associated with Descartes’s Treatise of Man. Public Domain Mark 1.0.', scene: [520, 640], panel: [836, 1029],
    alt: 'A historical anatomical diagram traces sensory pathways through a head toward structures within the brain.', caption: 'A posthumously published Treatise of Man diagram models sensation, nerves, brain, and pineal mediation.', historicalNote: 'The Treatise was illustrated for posthumous Latin and French editions by people other than Descartes; this reproduction does not establish its exact plate, designer, or edition. It visualizes seventeenth-century mechanical physiology, not a modern neuroscientific map or a securely dated authorial drawing.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'rationalism-conway-principia', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'anne-conway', role: 'primary-source', mediaKind: 'book-page',
    title: 'Principia philosophiae antiquissimae et recentissimae', creator: 'Anne Conway; Latin translation and posthumous publication associated with Franciscus Mercurius van Helmont', objectDate: 'Amsterdam, 1690', institution: 'Google Books public-domain scan', sourcePageUrl: 'https://books.google.com/books?id=y6hbDBQqTiQC', ...publicDomain, derivativeNotice,
    attribution: 'Anne Conway, Principia philosophiae antiquissimae et recentissimae, 1690, Google Books public-domain scan.', scene: [300, 509], panel: [300, 509],
    alt: 'The aged title page of the anonymous 1690 Latin Principia is framed by darkened paper edges.', caption: 'The anonymous, posthumous 1690 Latin edition through which Conway’s surviving philosophy first appeared.', historicalNote: 'Conway left difficult notes rather than a publication-ready autograph. Others transcribed, translated, titled, annotated, and published the work after her death; attribution is secure, but exact wording and editorial structure are mediated.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'rationalism-henry-more-portrait', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'anne-conway', role: 'context', mediaKind: 'engraving',
    title: 'Portrait of Henry More', creator: 'David Loggan', objectDate: '1679–1692', institution: 'Rijksmuseum, RP-P-OB-46.333', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Portret_van_Henry_More,_RP-P-OB-46.333.jpg', ...cc0, derivativeNotice,
    attribution: 'David Loggan, Portrait of Henry More, 1679–1692, Rijksmuseum, CC0 1.0.', scene: [422, 640], panel: [844, 1280],
    alt: 'An engraved oval portrait shows Henry More in clerical dress above his family coat of arms.', caption: 'David Loggan’s engraving of Henry More, dated broadly to 1679–1692.', historicalNote: 'The Rijksmuseum date range spans More’s death in 1687, so the print cannot be classified securely as lifetime or posthumous. More was an important teacher and correspondent in Conway’s network, but the portrait must not make him the author or sole source of her philosophy.', likenessStatus: 'uncertain', focalPoint: {x: .5, y: .38},
  }),
  asset({
    id: 'rationalism-leibniz-monadology', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'leibniz', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Reproduction identified as a Monadology manuscript page', creator: 'Attributed to Gottfried Wilhelm Leibniz', objectDate: 'Text composed in 1714; reproduction provenance incomplete', institution: 'Wikimedia Commons; repository and shelfmark not supplied', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Leibniz_Monadology_2.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Reproduction identified on Wikimedia Commons as a Leibniz Monadology manuscript page; repository and shelfmark not supplied. Public Domain Mark 1.0.', scene: [420, 594], panel: [420, 594],
    alt: 'A handwritten French manuscript page contains tightly spaced lines, corrections, and numbered propositions.', caption: 'A reproduction identified as a manuscript page from Leibniz’s 1714 Monadology.', historicalNote: 'The Commons record traces the image only to an archived teaching page and supplies no repository or shelfmark. The Monadology was not published in Leibniz’s lifetime, and this reproduction cannot establish that its later title, editions, or standard paragraphing were fixed by an original public edition.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'rationalism-leibniz-correspondence', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'leibniz', role: 'material-history', mediaKind: 'manuscript',
    title: 'Leibniz correspondence, papers, and notes', creator: 'Gottfried Wilhelm Leibniz and correspondents', objectDate: '1669–1704', institution: 'National Library of Poland, Rps III 4879', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Korespondencja_Gottfrieda_Leibniza.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Leibniz correspondence, papers, and notes, 1669–1704, National Library of Poland. Public Domain Mark 1.0.', scene: [640, 533], panel: [713, 594],
    alt: 'Several handwritten leaves from Leibniz’s papers overlap in a display of Latin, French, and German correspondence.', caption: 'Leibniz’s surviving papers make metaphysics visible as a networked, multilingual practice.', historicalNote: 'The image shows a 414-leaf collection with many subjects and hands, not one letter about pre-established harmony. It is material context for a philosophy developed across texts and correspondence.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'rationalism-leibniz-new-essays', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'leibniz', role: 'material-history', mediaKind: 'book-page',
    title: 'Nouveaux Essais sur l’entendement humain', creator: 'Gottfried Wilhelm Leibniz; Ernest Flammarion edition', objectDate: 'Paris, 1921', institution: 'University of Toronto / Internet Archive', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Leibniz_-_Nouveaux_Essais_sur_l%E2%80%99entendement_humain,_1921.djvu', ...publicDomain, derivativeNotice,
    attribution: 'Gottfried Wilhelm Leibniz, Nouveaux Essais sur l’entendement humain, Ernest Flammarion, 1921. Public Domain Mark 1.0.', scene: [381, 640], panel: [762, 1280],
    alt: 'The opening foreword page of a 1921 French edition introduces Leibniz’s response to Locke in dense printed text.', caption: 'A 1921 edition opens by situating Leibniz’s New Essays as a sustained answer to Locke.', historicalNote: 'Leibniz drafted the New Essays in 1703–1704 but withheld them after Locke’s death; they first appeared in 1765. This later editorial foreword documents the work’s reception, not Leibniz’s manuscript or its first publication.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'rationalism-leibniz-clarke', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'leibniz', role: 'context', mediaKind: 'engraving',
    title: 'Samuel Clarke D.D.', creator: 'George Vertue', objectDate: '1738', institution: 'National Library of Wales, Welsh Portrait Collection', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Samuel_Clarke_D._D_(4671390).jpg', ...publicDomain, derivativeNotice,
    attribution: 'George Vertue, Samuel Clarke D.D., 1738, National Library of Wales. Public Domain Mark 1.0.', scene: [391, 640], panel: [782, 1280],
    alt: 'A posthumous engraved portrait shows Samuel Clarke in a clerical wig, gown, and bands.', caption: 'George Vertue’s 1738 portrait print of Samuel Clarke.', historicalNote: 'Published after Clarke’s death, the engraving is reception portraiture. Clarke was an accomplished philosopher and theologian, not merely a mouthpiece for Newton in the correspondence with Leibniz.', likenessStatus: 'posthumous-portrait', focalPoint: {x: .5, y: .39},
  }),
  asset({
    id: 'rationalism-leibniz-binary', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'leibniz', role: 'primary-source', mediaKind: 'book-page',
    title: 'Table of the numbers 0 to 32 in binary figures', creator: 'Gottfried Wilhelm Leibniz', objectDate: '1703', institution: 'Académie des sciences de Paris / Gallica', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Leibniz_binary_system_1703.png', ...publicDomain, derivativeNotice,
    attribution: 'Gottfried Wilhelm Leibniz, binary table from Explication de l’arithmétique binaire, 1703. Public Domain Mark 1.0.', scene: [475, 640], panel: [727, 979],
    alt: 'A printed page aligns decimal numbers with long columns of zeros and ones and related explanatory figures.', caption: 'Leibniz’s 1703 binary table represents the integers from zero through thirty-two.', historicalNote: 'The table is historically important notation, not a computer architecture and not proof that Leibniz invented modern electronic computing. Its comparison with Fu Xi diagrams also requires attention to Jesuit mediation and selective interpretation.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'rationalism-descartes-weenix', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'descartes', role: 'identity', mediaKind: 'painting',
    title: 'Portrait of René Descartes', creator: 'Jan Baptist Weenix', objectDate: 'c. 1647–1649', institution: 'Centraal Museum, Utrecht, accession 7386', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Utrecht_Weenix_Descartes.JPG', ...publicDomain, derivativeNotice,
    attribution: 'Jan Baptist Weenix, Portrait of René Descartes, c. 1647–1649, Centraal Museum, Utrecht. Public Domain Mark 1.0.', scene: [484, 640], panel: [967, 1280],
    alt: 'A dark lifetime portrait shows René Descartes holding an open book inscribed Mundus est fabula.', caption: 'Weenix’s lifetime portrait presents Descartes with the enigmatic phrase “Mundus est fabula”—the world is a fable.', historicalNote: 'Painted while Descartes was alive, the work is strong likeness evidence but remains a deliberately staged portrait. The book and inscription invite interpretation; they do not by themselves summarize his epistemology.', likenessStatus: 'lifetime-portrait', focalPoint: {x: .38, y: .38},
  }),
  asset({
    id: 'rationalism-spinoza-engraving', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'spinoza', role: 'identity', mediaKind: 'engraving',
    title: 'Benedictus de Spinoza', creator: 'Unknown engraver', objectDate: 'Amsterdam, 1677', institution: 'Print published with Nagelate Schriften van B.d.S., Amsterdam; current holding not identified', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Engraving_of_Spinoza,_Nagelate_Schriften_van_B.d.S._Amsterdam_1677.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Unknown engraver, Benedictus de Spinoza, published with Nagelate Schriften van B.d.S., Amsterdam, 1677. Public Domain Mark 1.0.', scene: [491, 640], panel: [982, 1280],
    alt: 'A posthumous oval engraving depicts Spinoza with shoulder-length curls above a six-line Dutch memorial poem.', caption: 'The 1677 Nagelate Schriften frontispiece pairs an oval posthumous portrait of Spinoza with a six-line Dutch memorial poem.', historicalNote: 'Published in the year of Spinoza’s death, this is early posthumous reception rather than a documented portrait sitting. The current holding and engraver are unidentified; the displayed Commons reproduction cites Henri Krop’s 2014 Spinoza: A Political Biography, page 71, as its immediate print source.', likenessStatus: 'posthumous-portrait', focalPoint: {x: .5, y: .3},
  }),
  asset({
    id: 'rationalism-discourse-first-edition', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'descartes', role: 'primary-source', mediaKind: 'book-page',
    title: 'Discours de la méthode first-edition title page', creator: 'René Descartes; published by Jan Maire', objectDate: 'Leiden, 1637', institution: 'Bibliothèque nationale de France / Gallica', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Page_de_titre_de_la_premi%C3%A8re_%C3%A9dition_du_discours_de_la_m%C3%A9thode.jpg', ...publicDomain, derivativeNotice,
    attribution: 'René Descartes, Discours de la méthode first-edition title page, Leiden: Jan Maire, 1637, BnF / Gallica. Public Domain Mark 1.0.', scene: [474, 640], panel: [948, 1280],
    alt: 'The 1637 French title page lists the Discourse on Method and its essays on optics, meteorology, and geometry without naming Descartes.', caption: 'The anonymous 1637 title page binds Descartes’s method to three concrete scientific essays.', historicalNote: 'The Discourse first appeared as a preface to the Dioptrics, Meteors, and Geometry, and Descartes withheld his name from the title page. Treating it as an isolated manifesto obscures that experimental and mathematical setting.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'rationalism-ethics-propositions', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'spinoza', role: 'primary-source', mediaKind: 'book-page',
    title: 'Ethica, Part I: axioms and propositions I–IV', creator: 'Benedictus de Spinoza', objectDate: '1677, Opera posthuma', institution: 'Public-domain reproduction of the first posthumous edition', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Spinoza_Ethica_Pars1_Prop1.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Benedictus de Spinoza, Ethica, Part I, axioms and propositions I–IV, Opera posthuma, 1677. Public Domain Mark 1.0.', scene: [640, 479], panel: [949, 711],
    alt: 'A wide Latin page from the 1677 Ethics sets numbered axioms, propositions, proofs, and references in compact type.', caption: 'The opening propositions of Part I put Spinoza’s geometric method on the printed page.', historicalNote: 'The Ethics was published only after Spinoza’s death. This typeset page faithfully witnesses its geometric organization but is not an autograph, and the format should not be mistaken for proof that philosophical conclusions follow as uncontested mathematics.', likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'rationalism-tractatus-manuscript-note', folder: 'rationalism-mind-nature-system', entityKind: 'philosopher', entityId: 'spinoza', role: 'primary-source', mediaKind: 'manuscript',
    title: 'Reproduction identified as annotation 14 to Tractatus theologico-politicus IX', creator: 'Attributed to Benedictus de Spinoza in the reproduction record', objectDate: 'c. 1670–1677; reproduction published in 1946', institution: '1946 Dutch encyclopedia reproduction; original repository not supplied', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Benedictus_de_Spinoza_-_Manuscript_notes_with_Tractatus_theologico-politicus_IX_Adnotatio_14.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Reproduction identified as Spinoza’s annotation 14 to chapter IX of the Tractatus theologico-politicus; original repository not supplied. Public Domain Mark 1.0.', scene: [375, 640], panel: [750, 1280],
    alt: 'A tall manuscript page preserves a dense Latin annotation associated with chapter nine of Spinoza’s Theological-Political Treatise.', caption: 'A reproduced manuscript annotation makes a close chronological argument about scripture materially visible.', historicalNote: 'The Commons file was scanned from a 1946 Dutch encyclopedia and does not identify the original repository or codex. It is therefore displayed as a witness to the Tractatus annotation tradition, not as an unqualified autograph claim; the text’s engagement with biblical chronology remains the interpretive focus.', likenessStatus: 'not-applicable',
  }),
] as const satisfies readonly MuseumAssetRecord[];
