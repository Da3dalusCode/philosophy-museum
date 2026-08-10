import type {
  MuseumAssetId,
  MuseumAssetRecord,
  MuseumAssetVariant,
} from './museumAssetTypes';

/**
 * Gallery 17 intentionally introduces several source-specific IDs that supersede
 * inaccurate provisional IDs. The shared MuseumAssetId union is updated only by
 * the integration change; this isolated bundle keeps the intended IDs explicit.
 */
export type EmpiricismGalleryAssetId =
  | 'empiricism-hooke-micrographia-flea'
  | 'empiricism-orrery-lecture-1766'
  | 'locke-molyneux-ribera-touch'
  | 'locke-cobbler-workshop-1671'
  | 'empiricism-locke-greenhill-portrait'
  | 'empiricism-locke-carolina-map'
  | 'berkeley-perspective-instrument-1604'
  | 'empiricism-berkeley-smibert-portrait'
  | 'empiricism-berkeley-optical-illusion'
  | 'empiricism-berkeley-bermuda-scheme'
  | 'empiricism-camera-obscura'
  | 'berkeley-scots-pine-botanical-plate'
  | 'empiricism-hume-billiards'
  | 'hume-ramsay-portrait-1754'
  | 'hume-theatre-interior-c1740'
  | 'hume-greuze-village-bride-1761'
  | 'empiricism-hume-backgammon'
  | 'empiricism-hume-edinburgh';

type Gallery17AssetInput = Omit<MuseumAssetRecord, 'id' | 'variants'> & {
  id: EmpiricismGalleryAssetId;
  scene: readonly [number, number];
  panel: readonly [number, number];
};

const folder = 'empiricism-science-political-order';

const variant = (
  id: EmpiricismGalleryAssetId,
  kind: 'scene' | 'panel',
  size: readonly [number, number],
): MuseumAssetVariant => ({
  path: `assets/museum/${folder}/${id}-${kind}.webp`,
  width: size[0],
  height: size[1],
});

const asset = ({id, scene, panel, ...record}: Gallery17AssetInput): MuseumAssetRecord => ({
  ...record,
  id: id as MuseumAssetId,
  variants: {
    scene: variant(id, 'scene', scene),
    panel: variant(id, 'panel', panel),
  },
});

const publicDomain = {
  license: 'Public Domain Mark 1.0',
  licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
  rightsKind: 'rights-status' as const,
};

const ccBy4 = {
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  rightsKind: 'license' as const,
};

const ccBySa3 = {
  license: 'CC BY-SA 3.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  rightsKind: 'license' as const,
};

const derivativeNotice = 'Original image retained uncropped; resized and converted to WebP by Philosophy Atlas.';

export const EMPIRICISM_GALLERY_ASSETS = [
  asset({
    id: 'empiricism-hooke-micrographia-flea', entityKind: 'branch', entityId: 'empiricism', role: 'material-history', mediaKind: 'engraving', visualCharacter: 'map-or-diagram',
    title: 'A flea observed through the microscope in Micrographia', creator: 'Robert Hooke; unidentified engraver', objectDate: 'Published 1665', institution: 'Wellcome Collection, image L0043503', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Robert_Hooke,_Micrographia,_flea_Wellcome_L0043503.jpg', ...ccBy4, derivativeNotice,
    attribution: 'Robert Hooke, microscopic study of a flea from Micrographia, 1665; Wellcome Collection, CC BY 4.0.', scene: [640, 383], panel: [1280, 767],
    alt: 'A highly detailed engraved flea fills the frame, its jointed legs, bristles, plates, and claws enlarged far beyond ordinary sight.',
    caption: 'Hooke’s observed flea makes an instrument-mediated world shareable through drawing, engraving, and print.',
    historicalNote: 'The plate is an engraving based on microscope observations, not a photograph or an unmediated view. Its evidential chain includes specimen preparation, lenses, repeated looking, drawing, engraving, publication, and reader judgment.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'empiricism-orrery-lecture-1766', entityKind: 'branch', entityId: 'empiricism', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'A Philosopher Lecturing on the Orrery', creator: 'Joseph Wright of Derby', objectDate: 'c. 1766', institution: 'Derby Museum and Art Gallery', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Wright_of_Derby,_The_Orrery.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Joseph Wright of Derby, A Philosopher Lecturing on the Orrery, c. 1766, Derby Museum and Art Gallery. Public Domain Mark 1.0.', scene: [640, 449], panel: [1280, 899],
    alt: 'A lecturer and a mixed-age audience gather around a lamp-lit mechanical model of the solar system in a dark room.',
    caption: 'Wright’s orrery lecture stages observation as instrument, model, explanation, attention, and social trust.',
    historicalNote: 'Painted in 1766, the scene neither depicts the birth of empiricism nor shows Locke, Berkeley, or Hume. It is interpretive context for organized public observation, not evidence that British experimental science exhausted the empiricist family.',
    likenessStatus: 'not-applicable', focalPoint: {x: .51, y: .49},
  }),
  asset({
    id: 'locke-molyneux-ribera-touch', entityKind: 'philosopher', entityId: 'locke', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The Sense of Touch', creator: 'Jusepe de Ribera', objectDate: 'c. 1615–1616', institution: 'Norton Simon Museum, F.1965.1.052.P', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Jos%C3%A9_de_Ribera_018.jpg', objectPageUrl: 'https://www.nortonsimon.org/art/detail/F.1965.1.052.P/', ...publicDomain, derivativeNotice,
    attribution: 'Jusepe de Ribera, The Sense of Touch, c. 1615–1616, Norton Simon Museum. Public Domain Mark 1.0 reproduction via Wikimedia Commons.', scene: [480, 640], panel: [960, 1280],
    alt: 'A blind man thoughtfully explores a sculpted head with both hands while a painted portrait rests unseen beside him.',
    caption: 'Ribera’s tactile encounter separates recognizing form by touch from recognizing a painted appearance by sight.',
    historicalNote: 'Painted before Molyneux posed his question, the work is a period visual companion rather than an illustration of Locke, Molyneux, Cheselden, or a restored-vision experiment. Ribera’s comparison of sculpture and painting makes the distinction between tactile and visual access materially legible.',
    likenessStatus: 'not-applicable', focalPoint: {x: .5, y: .48},
  }),
  asset({
    id: 'locke-cobbler-workshop-1671', entityKind: 'philosopher', entityId: 'locke', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'A Cobbler in His Workshop', creator: 'David Teniers the Younger', objectDate: '1671', institution: 'Private collection; Wikimedia Commons reproduction', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:David_Teniers_(II)_-_A_cobbler_in_his_workshop.jpg', ...publicDomain, derivativeNotice,
    attribution: 'David Teniers the Younger, A Cobbler in His Workshop, 1671. Public Domain Mark 1.0.', scene: [460, 640], panel: [787, 1094],
    alt: 'A cobbler sits amid shoes, leather, tools, baskets, and household goods in a narrow seventeenth-century workshop.',
    caption: 'A period workshop supplies material and social context for Locke’s prince-and-cobbler thought experiment.',
    historicalNote: 'Teniers did not paint Locke’s example. The scene is contextual evidence for skilled labor and social rank, not a literal transfer of princely consciousness or a portrait of Locke’s imagined cobbler.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'empiricism-locke-greenhill-portrait', entityKind: 'philosopher', entityId: 'locke', role: 'identity', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'Portrait of John Locke', creator: 'John Greenhill', objectDate: '1672', institution: 'National Portrait Gallery, London, NPG 3912', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:John_Locke_by_John_Greenhill.jpg', objectPageUrl: 'https://www.npg.org.uk/collections/search/portrait/mw03962', ...publicDomain, derivativeNotice,
    attribution: 'John Greenhill, John Locke, 1672, National Portrait Gallery, London, NPG 3912. Public Domain Mark 1.0 via Wikimedia Commons.', scene: [526, 640], panel: [1053, 1280],
    alt: 'A young John Locke turns toward the viewer in an oval oil portrait, with long dark curled hair, a dark draped garment, and a deep brown ground.',
    caption: 'John Greenhill’s 1672 oil portrait of John Locke, National Portrait Gallery, London, NPG 3912.',
    historicalNote: 'The 1672 painting is public domain and the displayed Commons reproduction is marked PD-Art. The National Portrait Gallery states separate terms for its own current digitization, which is not the displayed file. A staged portrait establishes historical presence, not the consistency of Locke’s political commitments.',
    likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .37},
  }),
  asset({
    id: 'empiricism-locke-carolina-map', entityKind: 'philosopher', entityId: 'locke', role: 'context', mediaKind: 'engraving', visualCharacter: 'map-or-diagram',
    title: 'A New Description of Carolina', creator: 'John Ogilby; engraved by Francis Lamb', objectDate: 'c. 1680', institution: 'University of North Carolina, North Carolina Maps collection', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:A_New_Description_of_Carolina.jpg', objectPageUrl: 'https://dc.lib.unc.edu/cdm/ref/collection/ncmaps/id/498', ...publicDomain, derivativeNotice,
    attribution: 'John Ogilby and Francis Lamb, A New Description of Carolina, c. 1680; UNC North Carolina Maps. Public Domain Mark 1.0.', scene: [640, 490], panel: [1280, 979],
    alt: 'An ornate colonial map traces Carolina’s coast, rivers, settlements, neighboring territories, and a large decorative title cartouche.',
    caption: 'A near-contemporary map locates Locke’s language of property and government within colonial land administration.',
    historicalNote: 'No claim is made that Locke owned, commissioned, or used this sheet. It is near-contemporary geographic context for his colonial offices and for disputed relations among political theory, mapped land, dispossession, and slavery.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'berkeley-perspective-instrument-1604', entityKind: 'philosopher', entityId: 'berkeley', role: 'material-history', mediaKind: 'photograph', visualCharacter: 'material-object',
    title: 'Instrument for perspective drawing', creator: 'Jobst Bürgi', imageCreator: 'Wolfgang Sauber (Commons user Xenophon)', objectDate: 'Kassel, 1604; photograph made 2010', institution: 'Kunsthistorisches Museum Vienna, Kunstkammer, KK 788', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Perspektive_Zeichenger%C3%A4t.jpg', ...ccBySa3, derivativeNotice,
    attribution: 'Jobst Bürgi, perspective-drawing instrument, 1604, Kunsthistorisches Museum Vienna; photograph by Wolfgang Sauber, CC BY-SA 3.0.', scene: [640, 480], panel: [1280, 960],
    alt: 'A brass sighting and drawing instrument stands on a museum plinth, with articulated arms, sights, and a flat drawing surface.',
    caption: 'A surviving perspective device helps separate geometric projection from Berkeley’s learned perception of distance.',
    historicalNote: 'The instrument predates Berkeley by more than eighty years and is not known to have been used by him. It provides material context for controlled projection and drawing, not direct evidence for his New Theory of Vision.',
    likenessStatus: 'not-applicable', focalPoint: {x: .52, y: .55},
  }),
  asset({
    id: 'empiricism-berkeley-smibert-portrait', entityKind: 'philosopher', entityId: 'berkeley', role: 'identity', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'Portrait of George Berkeley', creator: 'John Smibert', objectDate: '1730', institution: 'National Portrait Gallery, London', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:George_Berkeley_by_John_Smibert.jpg', ...publicDomain, derivativeNotice,
    attribution: 'John Smibert, Portrait of George Berkeley, 1730, National Portrait Gallery, London. Public Domain Mark 1.0.', scene: [472, 640], panel: [943, 1280],
    alt: 'George Berkeley appears in clerical robes and a white neckcloth, facing the viewer with one hand lifted near his chest.',
    caption: 'Smibert’s 1730 lifetime portrait presents Berkeley during the period of his Atlantic educational project.',
    historicalNote: 'The portrait identifies a philosopher, Anglican cleric, traveler, and educational planner. Episcopal presentation does not prove that Berkeley’s arguments reduce to apologetics, and the image itself does not visualize immaterialism.',
    likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .34},
  }),
  asset({
    id: 'empiricism-berkeley-optical-illusion', entityKind: 'philosopher', entityId: 'berkeley', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'Trompe l’oeil: The Reverse of a Framed Painting', creator: 'Cornelis Norbertus Gijsbrechts', objectDate: 'c. 1668–1672', institution: 'Statens Museum for Kunst, Copenhagen, KMS1989', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Cornelius_Norbertus_Gijsbrechts_-_Trompe_l%27oeil._The_Reverse_of_a_Framed_Painting_-_Google_Art_Project.jpg', objectPageUrl: 'https://collection.smk.dk/#/en/detail/KMS1989', ...publicDomain, derivativeNotice,
    attribution: 'Cornelis Norbertus Gijsbrechts, The Reverse of a Framed Painting, c. 1668–1672, Statens Museum for Kunst. Public Domain Mark 1.0.', scene: [640, 493], panel: [1280, 987],
    alt: 'A painting meticulously imitates the wooden stretcher, tacks, shadows, canvas edges, and inventory label on the back of another painting.',
    caption: 'Gijsbrechts makes a painted surface present itself as the reverse of a framed object, testing perception and inference.',
    historicalNote: 'This trompe-l’œil predates Berkeley’s major works and was not his example. It is a controlled perceptual provocation, not proof that ordinary objects are illusions or that each observer invents a private world.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'empiricism-berkeley-bermuda-scheme', entityKind: 'philosopher', entityId: 'berkeley', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The Bermuda Group (Dean Berkeley and His Entourage)', creator: 'John Smibert', objectDate: 'c. 1728–1739', institution: 'Yale University Art Gallery, 1808.1', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:John_Smibert_-_The_Bermuda_Group_(Dean_Berkeley_and_His_Entourage)_-_1808.1_-_Yale_University_Art_Gallery.jpg', objectPageUrl: 'https://artgallery.yale.edu/collections/objects/21', ...publicDomain, derivativeNotice,
    attribution: 'John Smibert, The Bermuda Group, c. 1728–1739, Yale University Art Gallery. Public Domain Mark 1.0.', scene: [640, 478], panel: [1280, 955],
    alt: 'Berkeley, Smibert, and members of their households and entourage gather in a large Atlantic-era group portrait.',
    caption: 'Smibert’s group portrait preserves the people and patronage network surrounding Berkeley’s unbuilt Bermuda college.',
    historicalNote: 'The planned college was never built. The painting should not romanticize Berkeley’s Rhode Island interval or make Atlantic education appear outside imperial power; claims about Berkeley’s slaveholding require specialist sources beyond this image.',
    likenessStatus: 'not-applicable', focalPoint: {x: .51, y: .42},
  }),
  asset({
    id: 'empiricism-camera-obscura', entityKind: 'philosopher', entityId: 'berkeley', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The Camera Obscura', creator: 'Charles-Amédée-Philippe van Loo', objectDate: '1764', institution: 'National Gallery of Art, Washington, 1942.9.37', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Van_Loo_The_Camera_Obscura_1764.jpg', objectPageUrl: 'https://www.nga.gov/collection/art-object-page.32578.html', ...publicDomain, derivativeNotice,
    attribution: 'Charles-Amédée-Philippe van Loo, The Camera Obscura, 1764, National Gallery of Art. Public Domain Mark 1.0.', scene: [638, 640], panel: [1276, 1280],
    alt: 'An animated group crowds around a box-like camera obscura while a child and dog enliven the carefully staged interior.',
    caption: 'A camera-obscura demonstration distinguishes an ordered image, its causal conditions, and the expectations it supports.',
    historicalNote: 'Painted after Berkeley’s major works, this is not his own model. A material optical apparatus cannot establish immaterialism; the scene instead helps visitors think about caused, constrained, socially interpreted appearances.',
    likenessStatus: 'not-applicable', focalPoint: {x: .5, y: .47},
  }),
  asset({
    id: 'berkeley-scots-pine-botanical-plate', entityKind: 'philosopher', entityId: 'berkeley', role: 'material-history', mediaKind: 'drawing', visualCharacter: 'map-or-diagram',
    title: 'Scots pine botanical plate', creator: 'Otto Wilhelm Thomé', objectDate: 'Published 1885', institution: 'Flora von Deutschland, Österreich und der Schweiz; public-domain scan', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Illustration_Pinus_sylvestris0.jpg', ...publicDomain, derivativeNotice,
    attribution: 'Otto Wilhelm Thomé, Pinus sylvestris, 1885, public-domain botanical plate.', scene: [396, 640], panel: [792, 1280],
    alt: 'A botanical plate arranges a Scots pine branch, paired needles, cones, seed scales, roots, and reproductive details.',
    caption: 'A later botanical plate marks the vegetal threshold from which Berkeley’s Siris ascends toward medicine and metaphysics.',
    historicalNote: 'Made in 1885, the plate is not an ingredient record for Berkeley’s tar-water preparation. It visualizes pine morphology while the exhibit explicitly rejects using historical medical claims as present-day treatment advice.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'empiricism-hume-billiards', entityKind: 'philosopher', entityId: 'hume', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'La Partie de billard', creator: 'Jean-Baptiste-Siméon Chardin', objectDate: 'c. 1720', institution: 'Musée Carnavalet / Paris Musées, P2081', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Chardin_-_La_Partie_de_billard,_Vers_1720,_P2081.jpg', objectPageUrl: 'https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/la-partie-de-billard', ...publicDomain, derivativeNotice,
    attribution: 'Jean-Baptiste-Siméon Chardin, La Partie de billard, c. 1720, Musée Carnavalet / Paris Musées. Public Domain Mark 1.0; Paris Musées source released CC0.', scene: [640, 423], panel: [1280, 846],
    alt: 'Players and spectators gather around a long billiard table in an elegant room as a cue approaches the balls.',
    caption: 'A period billiards scene makes collision, sequence, expectation, and the missing impression of necessity visible.',
    historicalNote: 'Chardin’s painting is a social scene, not Hume’s diagram. It does not imply that Hume denies events, regularities, mechanisms, or ordinary causal reasoning.',
    likenessStatus: 'not-applicable', focalPoint: {x: .5, y: .53},
  }),
  asset({
    id: 'hume-ramsay-portrait-1754', entityKind: 'philosopher', entityId: 'hume', role: 'identity', mediaKind: 'painting', visualCharacter: 'portrait-or-figure',
    title: 'Portrait of David Hume', creator: 'Allan Ramsay', objectDate: '1754', institution: 'National Galleries of Scotland, PG 3521', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Painting_of_David_Hume.jpg', objectPageUrl: 'https://www.nationalgalleries.org/art-and-artists/60610', ...publicDomain, derivativeNotice,
    attribution: 'Allan Ramsay, David Hume, 1754, National Galleries of Scotland, PG 3521. Public Domain Mark 1.0 via Wikimedia Commons.', scene: [522, 640], panel: [1044, 1280],
    alt: 'David Hume appears in an oval portrait with a reddish turban, brown coat, and an embroidered gold-and-floral waistcoat against a warm brown ground.',
    caption: 'Allan Ramsay, David Hume, 1754, oil on canvas, National Galleries of Scotland, PG 3521.',
    historicalNote: 'The 1754 painting is public domain and the displayed Commons reproduction is marked as a public-domain reproduction. The National Galleries of Scotland states personal-use terms for its own current digital image, which is not the displayed file. The portrait’s polished public persona neither visualizes skeptical doubt nor excuses Hume’s racist claims and exclusions.',
    likenessStatus: 'lifetime-portrait', focalPoint: {x: .5, y: .35},
  }),
  asset({
    id: 'hume-theatre-interior-c1740', entityKind: 'philosopher', entityId: 'hume', role: 'context', mediaKind: 'engraving', visualCharacter: 'artwork-or-social-scene',
    title: 'Theater Interior with Performance Taking Place', creator: 'Unknown artist', objectDate: 'c. 1740–1760', institution: 'Cooper Hewitt, Smithsonian Design Museum, 18348639', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Print,_Theater_Interior_with_Performance_Taking_Place,_ca._1740%E2%80%9360_(CH_18348639).jpg', ...publicDomain, derivativeNotice,
    attribution: 'Unknown artist, Theater Interior with Performance Taking Place, c. 1740–1760, Cooper Hewitt, Smithsonian Design Museum. Public Domain Mark 1.0.', scene: [640, 434], panel: [1280, 867],
    alt: 'A crowded eighteenth-century theatre watches actors and demons perform an infernal scene beneath chandeliers and packed boxes.',
    caption: 'A period theatre sharpens Hume’s analogy—and his warning that there is no separately perceived inner stage or spectator.',
    historicalNote: 'The print is theatre culture from Hume’s period, not his own illustration. The exhibit must remove rather than preserve the tempting image of a tiny observer seated inside the mind.',
    likenessStatus: 'not-applicable',
  }),
  asset({
    id: 'hume-greuze-village-bride-1761', entityKind: 'philosopher', entityId: 'hume', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'The Village Bride', creator: 'Jean-Baptiste Greuze', objectDate: '1761', institution: 'Louvre Museum, INV 5037 / MR 1774', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Jean-Baptiste_Greuze_-_L%27Accord%C3%A9e_de_Village_-_WGA10655.jpg', objectPageUrl: 'https://collections.louvre.fr/ark:/53355/cl010062574', ...publicDomain, derivativeNotice,
    attribution: 'Jean-Baptiste Greuze, The Village Bride, 1761, Louvre Museum. Public Domain Mark 1.0.', scene: [640, 497], panel: [1099, 854],
    alt: 'An emotionally charged family group surrounds a young couple as money, gesture, rank, affection, and expectation converge.',
    caption: 'Greuze’s directed moral scene lets visitors inspect sympathy, standpoint, convention, and the shaping of approval.',
    historicalNote: 'This French genre painting is not Hume’s illustration and cannot prove the response it solicits. Emotional immediacy may correct distance or reproduce hierarchy; Hume’s own racist judgments show that a theory of corrected sentiment does not guarantee impartial practice.',
    likenessStatus: 'not-applicable', focalPoint: {x: .51, y: .47},
  }),
  asset({
    id: 'empiricism-hume-backgammon', entityKind: 'philosopher', entityId: 'hume', role: 'context', mediaKind: 'painting', visualCharacter: 'artwork-or-social-scene',
    title: 'Three Backgammon Players', creator: 'Circle of Hendrick ter Brugghen', objectDate: 'c. 1625', institution: 'Centraal Museum, Utrecht, 6144', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Three_Backgammon_Players_from_the_circle_of_Hendrick_ter_Brugghen_Centraal_Museum_6144.jpg', objectPageUrl: 'https://www.centraalmuseum.nl/nl/collectie/6144-drie-triktrakspelers-hendrick-ter-brugghen', ...publicDomain, derivativeNotice,
    attribution: 'Circle of Hendrick ter Brugghen, Three Backgammon Players, c. 1625, Centraal Museum. Public Domain Mark 1.0.', scene: [640, 477], panel: [1280, 954],
    alt: 'Three animated players lean over a backgammon board, gesturing and arguing amid counters, dice, and rich fabrics.',
    caption: 'A social game gives Hume’s return from skeptical crisis a material setting without pretending to depict his own evening.',
    historicalNote: 'The painting predates Hume and is neither his board nor his tavern. Backgammon does not logically refute skepticism or solve induction; it reveals ordinary practice, sociability, and attention restoring belief before proof arrives.',
    likenessStatus: 'not-applicable', focalPoint: {x: .5, y: .47},
  }),
  asset({
    id: 'empiricism-hume-edinburgh', entityKind: 'philosopher', entityId: 'hume', role: 'context', mediaKind: 'engraving', visualCharacter: 'place-or-architecture',
    title: 'The Heart of Midlothian, High Street, Edinburgh', creator: 'W. & A. K. Johnston', objectDate: '1852 reconstruction of the eighteenth-century street', institution: 'Reproduced in M. McLaren, The Capital of Scotland', sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:The_%27Heart_of_Midlothian%27,_High_Street,_Edinburgh.jpg', ...publicDomain, derivativeNotice,
    attribution: 'W. & A. K. Johnston, The Heart of Midlothian, High Street, Edinburgh, 1852. Public Domain Mark 1.0.', scene: [640, 461], panel: [1280, 923],
    alt: 'A busy reconstructed Edinburgh High Street contains the old tolbooth, guards, workers, traders, water carriers, gentlemen, children, and animals.',
    caption: 'A later reconstruction places “human nature” amid courts, labor, rank, policing, commerce, and exclusion.',
    historicalNote: 'Published in 1852, the lithograph retrospectively stages eighteenth-century Edinburgh and is not eyewitness documentation of Hume’s daily route. Its value is social and institutional context, not proof that every depicted figure or place directly shaped him.',
    likenessStatus: 'not-applicable',
  }),
] as const satisfies readonly MuseumAssetRecord[];
