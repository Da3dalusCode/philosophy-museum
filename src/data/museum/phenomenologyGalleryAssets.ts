import type {MuseumAssetRecord, MuseumAssetVariant} from './museumAssetTypes';

type PhenomenologyAssetInput = Omit<MuseumAssetRecord, 'variants'> & {
  scene: readonly [number, number];
  panel: readonly [number, number];
};

const variant = (
  id: string,
  kind: 'scene' | 'panel',
  size: readonly [number, number],
): MuseumAssetVariant => ({
  path: `assets/museum/phenomenology-existence-embodiment/${id}-${kind}.webp`,
  width: size[0],
  height: size[1],
});

const galleryAsset = ({scene, panel, ...record}: PhenomenologyAssetInput): MuseumAssetRecord => ({
  ...record,
  variants: {
    scene: variant(record.id, 'scene', scene),
    panel: variant(record.id, 'panel', panel),
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

const licensed = (license: string, licenseUrl: string) => ({
  license,
  licenseUrl,
  rightsKind: 'license' as const,
});

const derivativeNotice = 'Resized and converted to WebP by Philosophy Atlas.';
const originalNotice = 'Original image retained uncropped; resized and converted to WebP by Philosophy Atlas.';
const generatedSource = (id: string) =>
  `https://github.com/Da3dalusCode/philosophy-museum/blob/main/public/assets/museum/phenomenology-existence-embodiment/${id}-panel.webp`;

export const PHENOMENOLOGY_GALLERY_ASSETS = [
  galleryAsset({
    id: 'phenomenology-cezanne-still-life', entityKind: 'branch', entityId: 'phenomenology', role: 'context', mediaKind: 'painting',
    title: 'Still Life with Apples and a Pot of Primroses', creator: 'Paul Cézanne', objectDate: 'c. 1890', institution: 'The Metropolitan Museum of Art, 51.112.1',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Still_Life_with_Apples_and_a_Pot_of_Primroses_MET_DT47.jpg', objectPageUrl: 'https://www.metmuseum.org/art/collection/search/435882', ...cc0,
    attribution: 'Paul Cézanne, Still Life with Apples and a Pot of Primroses, c. 1890, The Metropolitan Museum of Art, 51.112.1. CC0 1.0.', derivativeNotice: originalNotice,
    scene: [640, 508], panel: [1280, 1016], alt: 'A potted primrose, apples, folded cloth, and vessels share a table whose edges and objects shift subtly across viewpoints.',
    caption: 'Cézanne’s still life lets one scene appear through tensions among profile, depth, color, and point of view.',
    historicalNote: 'The painting predates phenomenology as a named movement and was not made to illustrate Husserl. It is presented as a visual companion for sustained attention to how one world is given through partial and sometimes discordant appearances.', likenessStatus: 'not-applicable', focalPoint: {x: .5, y: .48},
  }),
  galleryAsset({
    id: 'phenomenology-intentionality-interpretive', entityKind: 'branch', entityId: 'phenomenology', role: 'context', mediaKind: 'drawing',
    title: 'Intentionality: object, profile, and horizon', creator: 'Philosophy Atlas Museum with OpenAI ImageGen', objectDate: '2026', institution: 'Philosophy Atlas Museum',
    sourcePageUrl: generatedSource('phenomenology-intentionality-interpretive'), license: 'Original Philosophy Atlas Museum interpretive illustration', rightsKind: 'rights-status',
    attribution: 'Original interpretive illustration created for Philosophy Atlas Museum with OpenAI ImageGen, 2026.', derivativeNotice: originalNotice,
    scene: [512, 640], panel: [1024, 1280], alt: 'Archival-modernist collage of a cup and table seen through overlapping geometric profiles and horizons.',
    caption: 'A contemporary interpretive study of an ordinary object appearing through partial profiles.',
    historicalNote: 'Created for this exhibit as a conceptual aid. It is not a historical document, a diagram by Husserl, or evidence from his archive.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'husserl-lifeworld-atget-pavers', entityKind: 'philosopher', entityId: 'husserl', role: 'context', mediaKind: 'photograph',
    title: 'Street Paver', creator: 'Eugène Atget', objectDate: '1899–1900; printed 1956', institution: 'The Metropolitan Museum of Art',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Atget,_Street_Paver,_1899%E2%80%931900_-_Metropolitan_Museum_of_Art.jpg', ...cc0,
    attribution: 'Eugène Atget, Street Paver, 1899–1900, printed 1956. The Metropolitan Museum of Art, CC0.', derivativeNotice,
    scene: [475, 640], panel: [950, 1280], alt: 'Atget photograph of men paving a Paris street amid tools, stones, buildings, and passersby.',
    caption: 'Eugène Atget, Street Paver, 1899–1900: an ordinary world of work, tools, bodies, and inherited practices.',
    historicalNote: 'A period photograph chosen as a conceptual companion to the lifeworld. It is not an illustration commissioned by Husserl or evidence from the Crisis manuscript.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'heidegger-being-time-interpretive', entityKind: 'philosopher', entityId: 'heidegger', role: 'context', mediaKind: 'drawing',
    title: 'Equipment, breakdown, and being-in-the-world', creator: 'Philosophy Atlas Museum with OpenAI ImageGen', objectDate: '2026', institution: 'Philosophy Atlas Museum',
    sourcePageUrl: generatedSource('heidegger-being-time-interpretive'), license: 'Original Philosophy Atlas Museum interpretive illustration', rightsKind: 'rights-status',
    attribution: 'Original interpretive illustration created for Philosophy Atlas Museum with OpenAI ImageGen, 2026.', derivativeNotice: originalNotice,
    scene: [409, 640], panel: [819, 1280], alt: 'Archival-modernist workshop collage with a hammer, workbench, timber, and an opening onto a forest path.',
    caption: 'A contemporary interpretive study of equipment, breakdown, and practical involvement.',
    historicalNote: 'Created for this exhibit as a conceptual aid. It is not artwork by Heidegger, a historical workshop, or evidence that the hammer example exhausts Being and Time.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'merleau-perception-interpretive', entityKind: 'philosopher', entityId: 'merleau-ponty', role: 'context', mediaKind: 'drawing',
    title: 'The body opens a field of perception', creator: 'Philosophy Atlas Museum with OpenAI ImageGen', objectDate: '2026', institution: 'Philosophy Atlas Museum',
    sourcePageUrl: generatedSource('merleau-perception-interpretive'), license: 'Original Philosophy Atlas Museum interpretive illustration', rightsKind: 'rights-status',
    attribution: 'Original interpretive illustration created for Philosophy Atlas Museum with OpenAI ImageGen, 2026.', derivativeNotice: originalNotice,
    scene: [384, 640], panel: [768, 1280], alt: 'Archival-modernist collage of a walking figure whose movement organizes layered stairs, doors, streets, and sight lines.',
    caption: 'A contemporary interpretive study of bodily movement opening a meaningful spatial field.',
    historicalNote: 'Created for this exhibit as a conceptual aid. It is not a diagram by Merleau-Ponty or a clinical image from Phenomenology of Perception.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'existentialism-munch-karl-johan', entityKind: 'branch', entityId: 'existentialism', role: 'context', mediaKind: 'painting',
    title: 'Evening on Karl Johan Street', creator: 'Edvard Munch', objectDate: '1892', institution: 'KODE Art Museums and Composer Homes, Bergen',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Evening_on_Karl_Johan_Street_(1892).jpg', ...publicDomain,
    attribution: 'Edvard Munch, Evening on Karl Johan Street, 1892. KODE Art Museums and Composer Homes, Bergen. Public domain.', derivativeNotice,
    scene: [640, 445], panel: [1280, 889], alt: 'Edvard Munch painting of an evening crowd advancing along Karl Johan Street while one dark figure walks apart.',
    caption: 'Edvard Munch, Evening on Karl Johan Street, 1892: crowd, isolation, and an unsettled public world.',
    historicalNote: 'The painting predates existentialism as a named twentieth-century movement. It is presented as a visual companion to themes of anxiety, estrangement, and public existence, not as an illustration or definition of the school.', likenessStatus: 'not-applicable', focalPoint: {x: .5, y: .48},
  }),
  galleryAsset({
    id: 'existentialism-kierkegaard-copenhagen-street', entityKind: 'philosopher', entityId: 'kierkegaard', role: 'context', mediaKind: 'painting',
    title: 'View of a Street in Østerbro outside Copenhagen. Morning Light', creator: 'Christen Købke', objectDate: '1836', institution: 'Statens Museum for Kunst, Copenhagen (KMS844)',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Christen_K%C3%B8bke_-_View_of_a_Street_in_%C3%98sterbro_outside_Copenhagen._Morning_Light_-_Google_Art_Project.jpg', objectPageUrl: 'https://www.smk.dk/en/highlight/morning-view-of-oesterbro-1836/', ...publicDomain,
    attribution: 'Christen Købke, View of a Street in Østerbro outside Copenhagen. Morning Light, 1836. Statens Museum for Kunst, KMS844. Public Domain Mark 1.0.', derivativeNotice: originalNotice,
    scene: [640, 421], panel: [1280, 841], alt: 'Morning light falls across a quiet street in Østerbro outside Copenhagen, with modest houses, trees, and a few people receding into the distance.',
    caption: 'Købke’s 1836 Copenhagen street supplies the lived urban world in which Kierkegaard’s questions of choice, inwardness, and public judgment took shape.',
    historicalNote: 'Købke’s painting is contemporary Copenhagen context, not a portrait of Kierkegaard or an illustration of The Concept of Anxiety. It locates the philosophical precursor within a particular social and urban world without collapsing later existentialisms into his project.', likenessStatus: 'not-applicable', focalPoint: {x: .52, y: .52},
  }),
  galleryAsset({
    id: 'sartre-ens-portrait-1924', entityKind: 'philosopher', entityId: 'sartre', role: 'identity', mediaKind: 'photograph',
    title: 'Jean-Paul Sartre as a student at the École normale supérieure', creator: 'Unknown photographer', objectDate: 'c. 1924', institution: 'École normale supérieure, PHO D/2/1924/1',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Jean-Paul_Sartre_1924.jpg', ...cc0,
    attribution: 'Unknown photographer, Jean-Paul Sartre as an École normale supérieure student, c. 1924. École normale supérieure, PHO D/2/1924/1, CC0.', derivativeNotice,
    scene: [450, 513], panel: [450, 513], alt: 'Black-and-white student identity portrait of a young Jean-Paul Sartre wearing a dark jacket and tie.',
    caption: 'Jean-Paul Sartre as an École normale supérieure student, c. 1924.',
    historicalNote: 'This student portrait predates Sartre’s 1945 public lecture and its 1946 publication. It identifies the philosopher but does not illustrate or prove the argument of Existentialism Is a Humanism.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .38},
  }),
  galleryAsset({
    id: 'existentialism-situated-freedom-interpretive', entityKind: 'branch', entityId: 'existentialism', role: 'context', mediaKind: 'drawing',
    title: 'Situated freedom at a threshold', creator: 'Philosophy Atlas Museum with OpenAI ImageGen', objectDate: '2026', institution: 'Philosophy Atlas Museum',
    sourcePageUrl: generatedSource('existentialism-situated-freedom-interpretive'), license: 'Original Philosophy Atlas Museum interpretive illustration', rightsKind: 'rights-status',
    attribution: 'Original interpretive illustration created for Philosophy Atlas Museum with OpenAI ImageGen, 2026.', derivativeNotice: originalNotice,
    scene: [512, 640], panel: [1024, 1280], alt: 'Archival-modernist collage of a person at a doorway facing several roads through a severe landscape.',
    caption: 'A contemporary interpretive study of choice among possibilities within a given situation.',
    historicalNote: 'Created for this exhibit as a conceptual aid. It is not a historical scene or a claim that existential freedom is limitless choice.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'sartre-bad-faith-look-interpretive', entityKind: 'philosopher', entityId: 'sartre', role: 'context', mediaKind: 'drawing',
    title: 'Role, performance, and the look', creator: 'Philosophy Atlas Museum with OpenAI ImageGen', objectDate: '2026', institution: 'Philosophy Atlas Museum',
    sourcePageUrl: generatedSource('sartre-bad-faith-look-interpretive'), license: 'Original Philosophy Atlas Museum interpretive illustration', rightsKind: 'rights-status',
    attribution: 'Original interpretive illustration created for Philosophy Atlas Museum with OpenAI ImageGen, 2026.', derivativeNotice: originalNotice,
    scene: [512, 640], panel: [1024, 1280], alt: 'Archival-modernist café collage with a waiter, mirrored viewpoints, tables, and intersecting gazes.',
    caption: 'A contemporary interpretive study of social role, self-presentation, and being seen by another.',
    historicalNote: 'Created for this exhibit as a conceptual aid. It is not a portrait of Sartre, a photograph of his café example, or a judgment about service work.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'husserl-grossmann-seated-1920s', entityKind: 'philosopher', entityId: 'husserl', role: 'identity', mediaKind: 'drawing',
    title: 'Two Seated Men (Edmund Husserl at right)', creator: 'Rudolf Großmann', objectDate: '1920s', imageCreator: 'Axel Killian', institution: 'Museum für Neue Kunst Freiburg, NK 2019/018',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Zwei_sitzende_M%C3%A4nner_(rechts_Edmund_Husserl)_-_Rudolf_Gro%C3%9Fmann_-_NK_2019_018_M_f_Neue_Kunst_Freiburg.png', objectPageUrl: 'https://onlinesammlung.freiburg.de/en/object/6A714CC7941F4574BD994CEE843D0DE1', ...licensed('CC BY 4.0', 'https://creativecommons.org/licenses/by/4.0/'),
    attribution: 'Rudolf Großmann, Two Seated Men (Edmund Husserl at right), 1920s. Photograph by Axel Killian, Museum für Neue Kunst Freiburg, CC BY 4.0.', derivativeNotice,
    scene: [464, 640], panel: [929, 1280], alt: 'Loose black-line drawing of two seated men, with Edmund Husserl shown upright at the right.',
    caption: 'Rudolf Großmann, Two Seated Men, 1920s, with Edmund Husserl at right.',
    historicalNote: 'A lifetime drawing held by the Museum für Neue Kunst Freiburg; it offers identity and period context rather than illustrating a philosophical doctrine.', likenessStatus: 'lifetime-portrait',
  }),
  galleryAsset({
    id: 'heidegger-pragher-portrait-1960', entityKind: 'philosopher', entityId: 'heidegger', role: 'identity', mediaKind: 'photograph',
    title: 'Martin Heidegger', creator: 'Willy Pragher', objectDate: '10 May 1960', institution: 'Landesarchiv Baden-Württemberg, W 134 Nr. 060678b',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Heidegger_2_(1960).jpg', objectPageUrl: 'https://www.landesarchiv-bw.de/plink/?f=5-226344', ...licensed('CC BY-SA 3.0', 'https://creativecommons.org/licenses/by-sa/3.0/'),
    attribution: 'Willy Pragher, Martin Heidegger, 1960. Landesarchiv Baden-Württemberg, CC BY-SA 3.0.', derivativeNotice,
    scene: [356, 502], panel: [356, 502], alt: 'Black-and-white cropped group photograph of Martin Heidegger seated in a suit among attendees at a 1960 Hausen ceremony, looking left.',
    caption: 'Willy Pragher’s cropped detail from a 10 May 1960 Hausen ceremonial group photograph, showing Martin Heidegger.',
    historicalNote: 'This is a crop from a public ceremony photograph, not a studio portrait or evidence for doctrine, disposition, or repentance. Heidegger’s influence must remain legible beside his Nazi Party membership, 1933–34 rectorship, and the antisemitic passages in the Black Notebooks.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .43, y: .4},
  }),
  galleryAsset({
    id: 'merleau-marey-motion-study', entityKind: 'philosopher', entityId: 'merleau-ponty', role: 'context', mediaKind: 'document',
    title: 'Man in a chronophotographic suit', creator: 'Étienne-Jules Marey', objectDate: '1891', institution: 'Revue générale des sciences pures et appliquées',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Homme_en_combinaison_de_chronophotographie.pdf', ...publicDomain,
    attribution: 'Étienne-Jules Marey, man in a chronophotographic suit, 1891. Public domain.', derivativeNotice,
    scene: [377, 640], panel: [754, 1280], alt: 'Historical printed figure of a man in a black suit marked with white joint and limb lines for movement analysis.',
    caption: 'Étienne-Jules Marey’s 1891 method for making bodily movement graphically visible.',
    historicalNote: 'This motion study predates Merleau-Ponty and is contextual rather than phenomenological evidence. It also shows the distance between measuring a body and describing the lived body.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'levinas-ettinger-portrait-1991', entityKind: 'philosopher', entityId: 'levinas', role: 'identity', mediaKind: 'photograph',
    title: 'Emmanuel Levinas', creator: 'Bracha L. Ettinger', objectDate: '1991', institution: 'Artist-contributed Wikimedia Commons photograph',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Emmanuel_Levinas.jpg', ...licensed('CC BY-SA 2.5', 'https://creativecommons.org/licenses/by-sa/2.5/'),
    attribution: 'Bracha L. Ettinger, Emmanuel Levinas, 1991, CC BY-SA 2.5.', derivativeNotice,
    scene: [446, 640], panel: [892, 1280], alt: 'Black-and-white portrait of Emmanuel Levinas seated indoors, holding his hands together while speaking.',
    caption: 'Bracha L. Ettinger, Emmanuel Levinas, 1991.',
    historicalNote: 'A late lifetime portrait by artist and philosopher Bracha L. Ettinger. Levinas’s account of the face cannot be reduced to visible facial features or physiognomy.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .51, y: .43},
  }),
  galleryAsset({
    id: 'gadamer-ruuskanen-portrait-2000', entityKind: 'philosopher', entityId: 'gadamer', role: 'identity', mediaKind: 'photograph',
    title: 'Hans-Georg Gadamer', creator: 'Leena Ruuskanen', objectDate: 'c. 2000', institution: 'Photographer-contributed Wikimedia Commons photograph',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Hans-Georg_Gadamer.jpg', ...licensed('CC BY 3.0', 'https://creativecommons.org/licenses/by/3.0/'),
    attribution: 'Leena Ruuskanen, Hans-Georg Gadamer, c. 2000, CC BY 3.0.', derivativeNotice,
    scene: [495, 640], panel: [990, 1280], alt: 'Color portrait of an elderly Hans-Georg Gadamer seated outdoors with an open book.',
    caption: 'Leena Ruuskanen, Hans-Georg Gadamer, c. 2000.',
    historicalNote: 'A late lifetime portrait showing Gadamer with a book; the photograph supplies identity context rather than demonstrating hermeneutical understanding.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .55, y: .39},
  }),
  galleryAsset({
    id: 'husserl-epoche-portrait-1900', entityKind: 'philosopher', entityId: 'husserl', role: 'identity', mediaKind: 'photograph',
    title: 'Edmund Husserl', creator: 'Unknown photographer', objectDate: 'c. 1900', institution: 'Historical photograph; original repository not identified',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Edmund_Husserl_1900.jpg', ...publicDomain,
    attribution: 'Unknown photographer, Edmund Husserl, c. 1900. Public domain.', derivativeNotice,
    scene: [419, 550], panel: [419, 550], alt: 'Black-and-white half-length portrait of Edmund Husserl around 1900 with a full beard and formal coat.',
    caption: 'Edmund Husserl around 1900, near the publication of Logical Investigations.',
    historicalNote: 'A lifetime portrait with an unidentified photographer and incomplete repository chain. It identifies the philosopher but does not diagram the epoché or reduction.', likenessStatus: 'lifetime-photograph', focalPoint: {x: .5, y: .39},
  }),
  galleryAsset({
    id: 'husserl-time-beethoven-op101', entityKind: 'philosopher', entityId: 'husserl', role: 'context', mediaKind: 'manuscript',
    title: 'Piano Sonata in A Major, op. 101: manuscript sketch', creator: 'Ludwig van Beethoven', objectDate: '1816', institution: 'Library of Congress, Digital ID molden-0508',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Beethoven_opus_101_manuscript.jpg', objectPageUrl: 'https://hdl.loc.gov/loc.music/molden.0508', ...publicDomain,
    attribution: 'Ludwig van Beethoven, manuscript sketch for Piano Sonata op. 101, 1816. Library of Congress. Public domain.', derivativeNotice,
    scene: [413, 640], panel: [826, 1280], alt: 'Beethoven manuscript page densely filled with handwritten musical notation, revisions, and cross-outs.',
    caption: 'Beethoven’s 1816 sketch for Piano Sonata op. 101: a visual companion to hearing a phrase unfold through time.',
    historicalNote: 'The manuscript predates Husserl and was not used in his lectures. It is a material prompt for the melody example, not evidence about retention or protention by itself.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'heidegger-being-with-crowd-1923', entityKind: 'philosopher', entityId: 'heidegger', role: 'context', mediaKind: 'photograph',
    title: 'Street scene, crowd walking', creator: 'Harris & Ewing', objectDate: '1923', institution: 'Library of Congress, LCCN 2016892098',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Street_scene,_crowd_walking_LCCN2016892098.jpg', objectPageUrl: 'https://www.loc.gov/pictures/item/2016892098/', ...publicDomain,
    attribution: 'Harris & Ewing, Street scene, crowd walking, 1923. Library of Congress. Public domain.', derivativeNotice,
    scene: [640, 496], panel: [1280, 991], alt: 'Black-and-white 1923 photograph of a large crowd walking along a tree-lined public street.',
    caption: 'Harris & Ewing, Street scene, crowd walking, 1923: a public world of shared routes and ordinary expectations.',
    historicalNote: 'A period street photograph selected as contextual material. It does not depict Heidegger’s “they,” prove anonymity, or excuse his politics.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'merleau-flesh-rodin-cathedral', entityKind: 'philosopher', entityId: 'merleau-ponty', role: 'context', mediaKind: 'sculpture-photograph',
    title: 'The Cathedral', creator: 'Auguste Rodin; cast by Alexis Rudier', objectDate: 'Modeled 1908; cast 1925', imageCreator: 'Regan Vercruysse', institution: 'Philadelphia Museum of Art, F1929-7-40',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:The_Cathedral_Rodin_Museum_Philadelphia(04)_(15542151779).jpg', objectPageUrl: 'https://www.philamuseum.org/objects/103413', ...licensed('CC BY 2.0', 'https://creativecommons.org/licenses/by/2.0/'),
    attribution: 'Auguste Rodin, The Cathedral, modeled 1908; cast by Alexis Rudier in 1925. Philadelphia Museum of Art, Bequest of Jules E. Mastbaum, F1929-7-40. Photograph by Regan Vercruysse, CC BY 2.0.', derivativeNotice,
    scene: [505, 640], panel: [1011, 1280], alt: 'Rodin sculpture of two right hands rising toward one another, their palms and fingers nearly touching.',
    caption: 'Rodin, The Cathedral: two right hands make touching and being touched visible without collapsing their difference.',
    historicalNote: 'Rodin’s sculpture predates Merleau-Ponty and is a conceptual companion, not an illustration authorized by him. Its two right hands make the relation deliberately non-mirrored.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'camus-absurd-sisyphus-stuck', entityKind: 'philosopher', entityId: 'camus', role: 'context', mediaKind: 'painting',
    title: 'Sisyphus', creator: 'Franz von Stuck', objectDate: '1920', institution: 'Historical painting; source reproduction via Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Sisyphus_by_von_Stuck.jpg', ...publicDomain,
    attribution: 'Franz von Stuck, Sisyphus, 1920. Public domain.', derivativeNotice,
    scene: [554, 640], panel: [1108, 1280], alt: 'Dark, muscular figure of Sisyphus straining beneath a boulder against a red-black background.',
    caption: 'Franz von Stuck, Sisyphus, 1920—a mythic image that predates Camus’s 1942 essay.',
    historicalNote: 'The painting is part of Sisyphus’s earlier visual reception, not an illustration made for Camus. Camus’s absurd cannot be inferred from the painting alone.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'camus-plague-oran-port-1943', entityKind: 'philosopher', entityId: 'camus', role: 'context', mediaKind: 'photograph',
    title: 'Oran harbour', creator: 'Photographer unrecorded; book source annotates U.S. Army Signal Corps archives', objectDate: 'April 1943', institution: 'Original repository and accession unverified; reproduced from a 2002 book through Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Oran-port-1943.jpg', ...publicDomain,
    attribution: 'Oran harbour, April 1943. Photographer unrecorded; the cited book annotates a U.S. Army Signal Corps archive source. Commons applies a U.S.-Army public-domain status.', derivativeNotice,
    scene: [640, 347], panel: [1280, 694], alt: 'Wide black-and-white wartime view across the port, warehouses, tanks, ships, and city of Oran, Algeria.',
    caption: 'Oran harbour in April 1943, the city Camus transformed into the setting of The Plague.',
    historicalNote: 'A wartime documentary view of the real city, not the fictional epidemic or its characters. The accessible record does not independently establish the photographer, original repository, or accession; the novel’s Oran is also inseparable from French colonial Algeria.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'levinas-totality-infinity-2002', entityKind: 'philosopher', entityId: 'levinas', role: 'primary-source', mediaKind: 'document',
    title: 'Totality and Infinity, German study edition', creator: 'Emmanuel Levinas; cover designer unrecorded', objectDate: '2002 edition', institution: 'Verlag Karl Alber',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Emmanuel_Levinas,_Totalit%C3%A4t_und_Unendlichkeit_2002.jpg', ...publicDomain,
    attribution: 'Emmanuel Levinas, Totalität und Unendlichkeit, 2002 study-edition cover. Public-domain status recorded by Wikimedia Commons.', derivativeNotice,
    scene: [416, 640], panel: [650, 1000], alt: 'Red German study-edition cover of Levinas’s Totality and Infinity with white typography.',
    caption: 'A German study edition of Levinas’s Totality and Infinity, the major work behind this exhibit.',
    historicalNote: 'This is a later German edition, not the 1961 French first edition. Commons records the simple cover image as public domain but does not identify its designer.', likenessStatus: 'not-applicable', focalPoint: {x: .5, y: 0},
  }),
  galleryAsset({
    id: 'levinas-signature-1983', entityKind: 'philosopher', entityId: 'levinas', role: 'material-history', mediaKind: 'document',
    title: 'Levinas dedication and signature', creator: 'Emmanuel Levinas', objectDate: '15 June 1983', institution: 'Privately held copy reproduced through Wikimedia Commons',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Levinas_Signatur_1983.jpg', ...cc0,
    attribution: 'Emmanuel Levinas, handwritten dedication and signature, 15 June 1983. Reproduction dedicated to the public domain under CC0.', derivativeNotice,
    scene: [637, 640], panel: [1273, 1280], alt: 'Handwritten 1983 dedication and signature by Emmanuel Levinas on a white book page.',
    caption: 'Levinas’s handwritten dedication in a copy of Die Spur des Anderen, 1983.',
    historicalNote: 'A material trace of address and inscription, not proof of the philosophical distinction between saying and said. The dedication’s recipient is identified on the source page.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'gadamer-letter-pawliszyn', entityKind: 'philosopher', entityId: 'gadamer', role: 'material-history', mediaKind: 'document',
    title: 'Photograph reported as a letter from Hans-Georg Gadamer to Aleksandra Pawliszyn', creator: 'Original letter authorship unverified by the source record', objectDate: 'Letter date unresolved; photographed 24 August 2018', imageCreator: 'Robert Dolewski', institution: 'Original letter custody and provenance unverified',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:List_od_Hansa-Georga_Gadamera_do_Aleksandry_Pawliszyn.jpg', ...licensed('CC BY-SA 4.0', 'https://creativecommons.org/licenses/by-sa/4.0/'),
    attribution: 'Robert Dolewski, 24 August 2018 photograph reported as a letter from Hans-Georg Gadamer to Aleksandra Pawliszyn, CC BY-SA 4.0. Original authorship, date, custody, and underlying letter rights remain unverified.', derivativeNotice,
    scene: [447, 640], panel: [894, 1280], alt: 'Typed German letter on Heidelberg stationery signed by Hans-Georg Gadamer.',
    caption: 'A 2018 photograph reported as Gadamer–Pawliszyn correspondence concerning hermeneutics and psychoanalysis.',
    historicalNote: 'The Commons description supplies the reported correspondence context, photographer, upload date, and CC BY-SA license for the photograph. It does not independently verify the letter’s authorship, date, custody, provenance, or underlying rights.', likenessStatus: 'not-applicable',
  }),
  galleryAsset({
    id: 'gadamer-lepanto-conversation', entityKind: 'philosopher', entityId: 'gadamer', role: 'context', mediaKind: 'photograph',
    title: 'Wassili Lepanto and Hans-Georg Gadamer in conversation', creator: 'Leena Ruuskanen', objectDate: 'c. 2000', institution: 'Photographer-contributed Wikimedia Commons photograph',
    sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Wassili_Lepanto_(links)_und_Hans-Georg_Gadamer_im_Gespr%C3%A4ch_-_DC260-mh15922.jpg', ...licensed('CC BY 3.0', 'https://creativecommons.org/licenses/by/3.0/'),
    attribution: 'Leena Ruuskanen, Wassili Lepanto and Hans-Georg Gadamer in conversation, c. 2000, CC BY 3.0.', derivativeNotice,
    scene: [640, 323], panel: [1280, 646], alt: 'Artist Wassili Lepanto and philosopher Hans-Georg Gadamer seated outdoors in conversation over tea.',
    caption: 'Artist Wassili Lepanto and Gadamer in conversation, c. 2000.',
    historicalNote: 'A late lifetime photograph of conversation between an artist and a philosopher. It does not stage or prove Gadamer’s theory of play, but it materially links art, dialogue, and interpretation.', likenessStatus: 'lifetime-photograph',
  }),
] as const satisfies readonly MuseumAssetRecord[];
