import type {MuseumZoneId} from '../museumCatalog';
import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {
  MuseumMediaMountDefinition,
  MuseumPoint,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';
import {CLASSICAL_SOUTH_ASIAN_WALL_FILL_EXHIBITS} from './classicalSouthAsianWallFillExhibits';

export const CLASSICAL_SOUTH_ASIAN_GALLERY_ID = 'classical-south-asian-worlds' as const;

export const CLASSICAL_SOUTH_ASIAN_PALETTE = Object.freeze({
  ink: '#211d1c',
  indigo: '#344a68',
  saffron: '#b47731',
  verdigris: '#39736d',
  madder: '#8b4638',
  paper: '#eadfc9',
});

export const CLASSICAL_SOUTH_ASIAN_ROOM_SIGN_COPY = {
  'south-orientation-many-schools': {
    kicker: 'Room 01 · Orient without flattening',
    title: 'Many schools, shared questions, unfinished routes',
    subtitle: 'Begin with plurality: this gallery stages selected debates and makes its omissions explicit.',
  },
  'south-jain-worlds': {
    kicker: 'Room 02 · Soul, karma, and nonviolence',
    title: 'Jain worlds and the discipline of many-sided knowing',
    subtitle: 'Follow liberation, ahiṃsā, karmic matter, and the limits of one-sided judgment.',
  },
  'south-categories-realism': {
    kicker: 'Room 03 · Classify and explain',
    title: 'Vaiśeṣika categories, atoms, and realist debate',
    subtitle: 'Ask how substances, qualities, motions, universals, and particulars compose an intelligible world.',
  },
  'south-yoga-mind-liberation': {
    kicker: 'Room 04 · Practice and discern',
    title: 'Patañjali, mind, discipline, and liberation',
    subtitle: 'Read Yoga as a philosophical-practical tradition, not a modern wellness shorthand.',
  },
  'south-vedanta-rival-readings': {
    kicker: 'Room 05 · Interpret and disagree',
    title: 'Vedānta: rival readings of self, world, and Brahman',
    subtitle: 'Compare Advaita, Viśiṣṭādvaita, and Dvaita without turning Vedānta into one doctrine.',
  },
} as const;

const volume = (
  id: string,
  center: MuseumSceneVolume['center'],
  size: MuseumSceneVolume['size'],
): MuseumSceneVolume => ({id, role: 'media', center, size});

const mediaMount = (
  id: MuseumSupplementalExhibitId,
  assetId: MuseumAssetId,
  width: number,
  height: number,
): MuseumMediaMountDefinition => {
  const y = 2.14;
  return {
    id: `${id}-hero-media`,
    assetId,
    kind: 'wall-frame',
    position: [0, y, -.39],
    rotation: [0, 0, 0],
    width,
    height,
    frameDepth: .1,
    supportHeight: 0,
    anchorId: `${id}-backing`,
    bounds: volume(`${id}-media-bounds`, {x: 0, y, z: -.39}, {width: width + .18, height: height + .18, depth: .2}),
    supportBounds: volume(`${id}-media-support`, {x: 0, y, z: -.55}, {width: width * .74, height: height * .74, depth: .18}),
  };
};

const cameraFor = (position: MuseumPoint, rotationY: number, distance = 2.92): MuseumPoint => ({
  x: position.x + Math.sin(rotationY) * distance,
  z: position.z + Math.cos(rotationY) * distance,
});

const layout = ({
  id,
  parentExhibitId,
  zoneId,
  position,
  rotationY,
  assetId,
  mediaWidth,
  mediaHeight,
  installationKind,
  accent,
}: {
  id: MuseumSupplementalExhibitId;
  parentExhibitId: 'indian-philosophy' | 'jainism' | 'mahavira' | 'kanada' | 'patanjali' | 'shankara' | 'madhva';
  zoneId: MuseumZoneId;
  position: MuseumPoint;
  rotationY: number;
  assetId: MuseumAssetId;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: MuseumSupplementalInstallationKind;
  accent: string;
}): MuseumSupplementalExhibitLayout => {
  const width = 4.35;
  return {
    id,
    parentExhibitId,
    zoneId,
    spatialCellId: zoneId,
    position,
    rotationY,
    interactionRadius: 3.65,
    collider: {id: `supplemental:${id}`, center: position, size: {width, depth: 1.05}, rotation: rotationY},
    viewpoint: {...cameraFor(position, rotationY), yaw: rotationY, pitch: -.055},
    assetId,
    mediaMount: mediaMount(id, assetId, mediaWidth, mediaHeight),
    label: {position: [0, 4.04, -.3], width: width - .36, height: .72},
    footprint: {width, height: 4.44, depth: 1.05},
    installationKind,
    accent,
  };
};

const presentation = (
  panelKicker: string,
  proximityKicker: string,
  factRows: readonly {label: string; value: string}[],
  articleActionLabel: string,
  entityKind: 'philosopher' | 'branch',
) => ({
  panelKicker,
  proximityKicker,
  factRows,
  articleActionLabel,
  entityKind,
  keyIdeasLabel: 'Interpretive anchors',
  cautionsLabel: 'Keep in view',
});

type ReviewedSupplementalInput = Omit<MuseumSupplementalExhibit, 'sections' | 'visitorGuide' | 'review' | 'presentation'> & {
  sections: readonly {paragraph: string; sourceIds: readonly string[]}[];
  visitorGuide: NonNullable<MuseumSupplementalExhibit['visitorGuide']>;
  presentation: NonNullable<MuseumSupplementalExhibit['presentation']>;
  resolution: string;
  lock: string;
};

const reviewedExhibit = (input: ReviewedSupplementalInput): MuseumSupplementalExhibit => {
  const {resolution, lock, ...exhibit} = input;
  return {
    ...exhibit,
    sections: input.sections.map(({paragraph, sourceIds}) => ({heading: '', paragraphs: [paragraph], sourceIds})),
    presentation: {...input.presentation, exhibitLayout: 'object-led'},
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-12',
      method: 'Gallery 04 supplemental review: two non-overlapping Terra/High evidence scopes reconciled by the Sol parent across installed-object identity, attribution, dating, institution, source record, rights, claim mapping, accessibility, provenance, routes, and aspect-safe presentation.',
      resolution,
      lock,
      visualReview: {
        desktop: {
          reviewedOn: '2026-08-12',
          viewport: '1280×720',
          evidence: `Direct route inspected with the installed object, three-paragraph interpretation, subject-specific sidebar, article CTA, and no horizontal overflow. Evidence: docs/visual-validation/gallery-04-supplementals/desktop/${input.id}.png`,
        },
        mobile: {
          reviewedOn: '2026-08-12',
          viewport: '390×844',
          evidence: `Direct route inspected with wrapped copy, loaded object preview, scrollable interpretation, visible controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-04-supplementals/mobile/${input.id}.png`,
        },
        threeDimensional: {
          reviewedOn: '2026-08-12',
          viewport: '1280×720 fresh direct-route session',
          evidence: `Fresh-session authored viewpoint inspected with a live 3D canvas, closed detail panel, readable plaque, distinct installation, and the image mounted at its natural scene ratio. Evidence: docs/visual-validation/gallery-04-supplementals/staged-3d/${input.id}.png`,
        },
      },
    },
  };
};

const exhibits = [
  reviewedExhibit({
    id: 'south-sarva-darsana-compendium',
    displayName: 'Indian Philosophy: A Gathering and Its Limits',
    shortTitle: 'Indian Philosophy: A Gathering of Holy Men',
    workLabel: 'ORIENTATION · REPRESENTATION, PLURALITY, AND OMISSION',
    dateLabel: 'Mir Kalan Khan · Lucknow, c. 1770–75 · Metropolitan Museum of Art 2009.318',
    question: 'What does a later gathering reveal—and what cannot it stand for?',
    frontSubtitle: 'A courtly image of named holy men opens a field wider than any single painting, list, or classificatory scheme.',
    lead: 'Mir Kalan Khan’s painting gathers holy men of different faiths in an imagined social field. It is an early-modern work from Lucknow, not a picture of the classical philosophical schools and not a neutral map of South Asian thought.',
    keyIdeas: ['Later images organize traditions from a particular historical viewpoint.', 'Shared questions did not produce one harmonious or timeless doctrine.', 'What a representation excludes is part of how it should be interpreted.'],
    cautions: ['The painting does not depict the six classical darśanas or an ancient debate.', 'Its grouping of named holy men cannot represent every Indian philosophical, religious, regional, or vernacular tradition.'],
    sections: [
      {paragraph: 'The installed object is A Gathering of Holy Men of Different Faiths, painted by Mir Kalan Khan in Lucknow around 1770–75 and now held by the Metropolitan Museum of Art as accession 2009.318. The scene brings together named figures associated with devotional and ascetic communities, including Kabir, Ravidas, Namdev, and others. Its gold, patterned ground and compact arrangement make plurality visible as a composed gathering. This is not the 1908 Sarva-darśana-saṃgraha cover previously described by the exhibit, not an ancient philosophical assembly, and not evidence that the represented people actually met. It is a later artistic construction with its own early-modern setting and choices.', sourceIds: ['gathering-met', 'gathering-commons']},
      {paragraph: 'Indian philosophy is not one doctrine, scripture, school, language, or religious identity. Traditions disputed what exists, how knowledge is possible, whether a permanent self exists, how language works, what binds living beings, and what liberation could mean. Jain, Buddhist, Brahmanical, materialist, devotional, and other communities also changed through commentary, pedagogy, patronage, travel, translation, and argument. A painted gathering can prompt attention to encounter, but it cannot convert those differences into a timeless agreement. The figures shown here belong to particular histories, while many classical and vernacular debates fall outside the frame. Plurality is therefore the subject of inquiry, not a decorative claim that all positions say the same thing.', sourceIds: ['iep-hindu-philosophy', 'sep-indian-epistemology', 'gathering-met']},
      {paragraph: 'The object also teaches a curatorial rule: every atlas selects. Mir Kalan Khan chose who would share this painted space; a compendium chooses which positions deserve chapters and how one school follows another; this gallery chooses a limited route through Jainism, Vaiśeṣika, Yoga, and Vedānta. None of those arrangements is a complete census. Buddhist philosophy has its own gallery, and materialist, devotional, regional, linguistic, and other traditions require further routes. Reading the painting well means asking both what its gathering enables viewers to compare and what its frame leaves invisible. The exhibit begins Gallery 04 with that double task, using a verified later object as evidence for representation and reception rather than mislabeling it as the field itself.', sourceIds: ['gathering-met', 'gathering-commons', 'iep-hindu-philosophy']},
    ],
    visitorGuide: [
      {heading: 'Inside the painted gathering', items: [
        {label: 'Named holy men', description: 'The Met identifies a later Lucknow composition of devotional and ascetic figures, not representatives of the six classical schools.', sourceIds: ['gathering-met']},
        {label: 'Constructed encounter', description: 'The arrangement records Mir Kalan Khan’s early-modern act of representation, not a witnessed meeting of every person shown.', sourceIds: ['gathering-met', 'gathering-commons']},
      ]},
      {heading: 'Beyond the frame', items: [
        {label: 'Real disagreement', description: 'Indian traditions offered incompatible accounts of knowledge, self, reality, language, action, and liberation.', sourceIds: ['iep-hindu-philosophy', 'sep-indian-epistemology']},
        {label: 'Visible omissions', description: 'One gathering cannot contain the field’s Buddhist, materialist, regional, vernacular, devotional, and scholastic histories.', sourceIds: ['iep-hindu-philosophy']},
      ]},
    ],
    sources: [
      {id: 'gathering-met', label: 'Metropolitan Museum of Art: A Gathering of Holy Men of Different Faiths, 2009.318', url: 'https://www.metmuseum.org/art/collection/search/456967', kind: 'collection-record'},
      {id: 'gathering-commons', label: 'Wikimedia Commons: A Gathering of Holy Men of Different Faiths, installed CC0 image record', url: 'https://commons.wikimedia.org/wiki/File:A_Gathering_of_Holy_Men_of_Different_Faiths_MET_DP213133.jpg', kind: 'collection-record'},
      {id: 'iep-hindu-philosophy', label: 'Internet Encyclopedia of Philosophy: Hindu Philosophy', url: 'https://iep.utm.edu/hindu-ph/', kind: 'academic-reference'},
      {id: 'sep-indian-epistemology', label: 'Stanford Encyclopedia of Philosophy: Epistemology in Classical Indian Philosophy', url: 'https://plato.stanford.edu/entries/epistemology-india/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'Mir Kalan Khan’s c. 1770–75 Lucknow painting is evidence for a later representation of named holy men. It is not the previously described compendium, an ancient debate, or a comprehensive map of Indian philosophy.',
    assetId: 'south-sarva-darsana-1908', panelAssetId: 'south-sarva-darsana-1908',
    articleRoute: {kind: 'branch', branchId: 'indian-philosophy'},
    presentation: presentation('Gallery 04 supplemental exhibit', 'A gathering and its limits', [
      {label: 'Object', value: 'A Gathering of Holy Men of Different Faiths'},
      {label: 'Artist / date', value: 'Mir Kalan Khan · Lucknow, c. 1770–75'},
      {label: 'Holding', value: 'Metropolitan Museum of Art · 2009.318'},
    ], 'Read the full sourced Indian Philosophy article', 'branch'),
    wallPlaque: {type: 'reception-or-transmission-history', title: 'A Gathering of Holy Men of Different Faiths', invitation: 'Mir Kalan Khan’s later Lucknow painting gathers named holy men while asking what every representation of Indian traditions includes, arranges, and leaves beyond its frame.', canonicalContexts: [{kind: 'branch', id: 'indian-philosophy'}]},
    resolution: 'Resolved: reconciled the mount to the installed Met painting rather than the unrelated compendium scan, replaced its identity, rights, provenance, caption, alt text, and interpretation, and preserved the painting’s natural proportions.',
    lock: 'fnv1a64:c8dbf58cebae2983',
  }),
  reviewedExhibit({
    id: 'south-upanishad-manuscript-world',
    displayName: 'Indian Philosophy: Texts Live in Manuscript Worlds',
    shortTitle: 'Indian Philosophy: Sāmaveda Upaniṣad Manuscript',
    workLabel: 'ORIENTATION · TEXT, SCRIPT, AND TRANSMISSION',
    dateLabel: 'Sanskrit in Malayalam script · date not securely established by the image record',
    question: 'How do philosophical texts travel through scripts, institutions, and practices?',
    frontSubtitle: 'A photographed manuscript witness separates a text’s composition from its copying, script, custody, and continuing study.',
    lead: 'The source record describes this photographed palm-leaf witness as Sanskrit Sāmaveda and Upaniṣadic material written in Malayalam script at Vadakke Madham Brahmaswam in Thrissur. Its precise copying date remains unconfirmed.',
    keyIdeas: ['Composition date and manuscript date are different claims.', 'Sanskrit texts circulated in multiple regional scripts.', 'Commentary and institutional practice help constitute a text’s philosophical afterlife.'],
    cautions: ['The image has not been matched securely to a dated catalogue item, so the exhibit does not assign a precise copying date.', 'One witness cannot represent every Upaniṣad, recensional history, or Vedānta interpretation.'],
    sections: [
      {paragraph: 'The installed image shows a long palm-leaf manuscript photographed by Ms Sarah Welch. Its Commons source describes Sanskrit material associated with the Sāmaveda and an Upaniṣad, written in Malayalam script, and reports the original at Vadakke Madham Brahmaswam in Thrissur, Kerala. The British Library’s Endangered Archives Programme independently documents a manuscript collection at that institution, but the photograph has not been matched here to a shelfmark or dated folio. The previously asserted date of c. 1800–1850 is therefore withdrawn. The object can establish format, script, reported custody, and a modern photographic record; it cannot by itself establish the date of composition, an exact copying date, or a complete textual identity.', sourceIds: ['upanishad-commons', 'vadakke-eap']},
      {paragraph: 'A philosophical text reaches later readers through physical and social work. Palm leaves must be prepared, inscribed, ordered, protected, recopied, catalogued, and interpreted; recitation and teaching transmit material that no single surviving witness contains by itself. Sanskrit was written in several regional scripts, so language and script are separate historical facts. Malayalam letters do not turn the transmitted language into Malayalam, and a manuscript’s location does not automatically identify one doctrine or school. These distinctions matter because “the text” is never only an abstract sequence of propositions. What can be read depends on institutions, trained readers, preservation decisions, comparison among witnesses, and the histories through which a particular copy survived.', sourceIds: ['upanishad-commons', 'vadakke-eap', 'iep-hindu-philosophy']},
      {paragraph: 'Upaniṣadic materials became central to multiple philosophical and religious conversations, but shared inheritance did not yield a single interpretation. Later Vedānta authors disagreed about the self, Brahman, the world, liberation, and how apparently divergent passages should be read together. Other Indian traditions disputed the authority or conclusions of Vedic texts altogether. This manuscript therefore belongs to an important route of transmission without standing for every Upaniṣad or for Indian philosophy as a whole. Its strongest lesson is chronological and material: an old work may be known through a much later copy, and that copy has its own regional, institutional, and scribal history. Keeping those layers distinct lets the object support philosophical study without turning uncertain metadata into false precision.', sourceIds: ['iep-hindu-philosophy', 'upanishad-commons', 'vadakke-eap']},
    ],
    visitorGuide: [
      {heading: 'What the witness establishes', items: [
        {label: 'Language and script', description: 'The image record reports Sanskrit material written in Malayalam script; those are different descriptive layers.', sourceIds: ['upanishad-commons']},
        {label: 'Reported custody', description: 'Commons locates the original at Vadakke Madham Brahmaswam, whose manuscript collection is independently documented by the British Library.', sourceIds: ['upanishad-commons', 'vadakke-eap']},
      ]},
      {heading: 'What remains uncertain', items: [
        {label: 'Copying date', description: 'Without a secure match to a catalogued item or folio, the photograph does not justify a precise date.', sourceIds: ['upanishad-commons', 'vadakke-eap']},
        {label: 'Philosophical reach', description: 'One material witness cannot settle the composition history or rival interpretations of Upaniṣadic texts.', sourceIds: ['iep-hindu-philosophy']},
      ]},
    ],
    sources: [
      {id: 'upanishad-commons', label: 'Wikimedia Commons: photographed Sāmaveda/Upaniṣad manuscript source record', url: 'https://commons.wikimedia.org/wiki/File:An_Upanishad_embedded_in_Sama_Veda,_Sanskrit_manuscript_in_Thrissur_Hindu_monastery,_Malayalam_script_-_1.jpg', kind: 'collection-record'},
      {id: 'vadakke-eap', label: 'British Library Endangered Archives Programme: Vadakke Madham Brahmaswam collection, EAP1039/1', url: 'https://searcharchives.bl.uk/catalog/032-003481723', kind: 'collection-record'},
      {id: 'iep-hindu-philosophy', label: 'Internet Encyclopedia of Philosophy: Hindu Philosophy', url: 'https://iep.utm.edu/hindu-ph/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The photographed palm-leaf witness reports Sanskrit Sāmaveda and Upaniṣadic material in Malayalam script at Vadakke Madham Brahmaswam. Its precise shelfmark and copying date remain unconfirmed.',
    assetId: 'south-upanishad-sama-veda-manuscript', panelAssetId: 'south-upanishad-sama-veda-manuscript',
    articleRoute: {kind: 'branch', branchId: 'indian-philosophy'},
    presentation: presentation('Gallery 04 supplemental exhibit', 'Sāmaveda Upaniṣad manuscript', [
      {label: 'Witness', value: 'Palm-leaf Sāmaveda/Upaniṣad manuscript'},
      {label: 'Language / script', value: 'Sanskrit / Malayalam script'},
      {label: 'Holding / date', value: 'Vadakke Madham Brahmaswam, reported · copying date unconfirmed'},
    ], 'Read the full sourced Indian Philosophy article', 'branch'),
    wallPlaque: {type: 'object-manuscript-site-or-archaeological-context', title: 'Sāmaveda Upaniṣad Manuscript', invitation: 'A palm-leaf witness in Malayalam script makes the material labor of Sanskrit transmission visible while keeping its precise copying date and textual identity honestly bounded.', canonicalContexts: [{kind: 'branch', id: 'indian-philosophy'}]},
    resolution: 'Resolved: retained the installed manuscript, replaced the unsupported c. 1800–1850 date with explicit uncertainty, identified its reported Thrissur custody, added the British Library collection record, and restored natural derivative and mount proportions.',
    lock: 'fnv1a64:4717349b9c399cff',
  }),
  reviewedExhibit({
    id: 'mahavira-kalpasutra-transmission',
    displayName: 'Mahāvīra: The Kalpa-sūtra Transmission',
    shortTitle: 'Mahāvīra: Queen Triśalā Reclining',
    workLabel: 'MAHĀVĪRA · LIFE, LINEAGE, AND MEMORY',
    dateLabel: 'Western India, Gujarat · c. 1450–75 · Cleveland Museum of Art 1925.1340',
    question: 'How does a later manuscript shape the remembered life of a Jina?',
    frontSubtitle: 'Queen Triśalā’s pregnancy belongs to a later illustrated sacred biography, not an eyewitness scene of Mahāvīra’s birth.',
    lead: 'Cleveland Museum of Art 1925.1340 is a c. 1450–75 Kalpa-sūtra painting of Queen Triśalā reclining while pregnant with the Jina-to-be. It is not the birth scene previously named by the exhibit.',
    keyIdeas: ['Mahāvīra is situated within a prior Tīrthaṅkara lineage.', 'Biography is transmitted through ritual, text, image, and commentary.', 'Later manuscripts are evidence for reception, not eyewitness records.'],
    cautions: ['Traditional dates for Mahāvīra remain disputed in modern scholarship.', 'The fifteenth-century painting is neither a lifetime portrait nor independent evidence for the narrated event.'],
    sections: [
      {paragraph: 'The installed object is Painting from a Kalpa-sutra: Queen Trishala Reclining, made in western India, probably Gujarat, around 1450–75 and now Cleveland Museum of Art 1925.1340. Queen Triśalā lies on a bed within a red, blue, and gold manuscript composition; the museum identifies her as pregnant with the Jina-to-be. The gold-flecked border was added in the eighteenth century. The official record supersedes the older filename that calls the image an early-sixteenth-century Birth of Mahāvīra. This folio is therefore not a literal birth scene, a contemporary record, or an image of Mahāvīra’s historical appearance. It is a much later material witness to illustrated Kalpa-sūtra transmission.', sourceIds: ['kalpasutra-cma', 'kalpasutra-commons']},
      {paragraph: 'Jain traditions remember Vardhamāna Mahāvīra as the twenty-fourth Tīrthaṅkara of the present age, not as the inventor of a tradition without predecessors. Accounts of his life emphasize renunciation, ascetic discipline, omniscience, teaching, and liberation. They also locate him within a lineage of Jinas who rediscover and teach a path across vast cycles of time. Modern historical reconstruction does not treat every traditional date or narrative detail as independently verified. The painting can show how fifteenth-century Jain communities made one episode of sacred biography visible, but it cannot settle the chronology of Mahāvīra’s life or prove the narrated pregnancy scene as an observed event.', sourceIds: ['jain-philosophy-sep', 'mahavira-jainpedia', 'kalpasutra-cma']},
      {paragraph: 'The philosophical relationship lies in transmission rather than portrait likeness. Jain teachings about living souls, karmic bondage, nonviolence, restraint, knowledge, and liberation were sustained through texts, commentary, recitation, monastic and lay communities, ritual calendars, and images. A richly painted folio could help organize attention and memory while embedding biography in a material object designed for repeated communal use. Its later date is not a weakness to conceal; it identifies the history this object can genuinely illuminate. Read alongside philosophical sources, Queen Triśalā reclining marks an afterlife in which Mahāvīra’s remembered life, the older Tīrthaṅkara lineage, and ethical discipline remained joined. Read alone, it cannot establish an eyewitness biography or reduce Jainism to one manuscript tradition.', sourceIds: ['jain-philosophy-sep', 'mahavira-jainpedia', 'kalpasutra-cma']},
    ],
    visitorGuide: [
      {heading: 'The Cleveland folio', items: [
        {label: 'Correct scene', description: 'The museum identifies Queen Triśalā reclining while pregnant with the Jina-to-be, not Mahāvīra’s birth.', sourceIds: ['kalpasutra-cma']},
        {label: 'Layered object', description: 'The painting dates c. 1450–75; its gold-flecked border was added in the eighteenth century.', sourceIds: ['kalpasutra-cma']},
      ]},
      {heading: 'Biography and lineage', items: [
        {label: 'Twenty-fourth Jina', description: 'Jain traditions place Mahāvīra within an older Tīrthaṅkara succession rather than at the absolute beginning of Jainism.', sourceIds: ['mahavira-jainpedia', 'jain-philosophy-sep']},
        {label: 'Later witness', description: 'The folio documents sacred biography in transmission, not Mahāvīra’s appearance, lifetime, or independently verified chronology.', sourceIds: ['kalpasutra-cma', 'jain-philosophy-sep']},
      ]},
    ],
    sources: [
      {id: 'kalpasutra-cma', label: 'Cleveland Museum of Art: Painting from a Kalpa-sutra: Queen Trishala Reclining, 1925.1340', url: 'https://www.clevelandart.org/art/1925.1340', kind: 'collection-record'},
      {id: 'kalpasutra-commons', label: 'Wikimedia Commons: installed CC0 image record for Cleveland 1925.1340', url: 'https://commons.wikimedia.org/wiki/File:Jain,_Western_India,_Gujarat,_early_16th_century_-_Page_from_a_Kalpa-sutra-_The_Birth_of_Mahavira_-_1925.1340_-_Cleveland_Museum_of_Art.jpg', kind: 'collection-record'},
      {id: 'jain-philosophy-sep', label: 'Stanford Encyclopedia of Philosophy: Jaina Philosophy', url: 'https://plato.stanford.edu/entries/jaina-philosophy/', kind: 'academic-reference'},
      {id: 'mahavira-jainpedia', label: 'JAINpedia: Mahāvīra', url: 'https://jainpedia.org/article/themes/people/jina/mahavira/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'Cleveland 1925.1340 shows Queen Triśalā reclining while pregnant with the Jina-to-be. The c. 1450–75 painting is later sacred-biographical transmission, not a birth scene, lifetime portrait, or eyewitness record.',
    assetId: 'mahavira-kalpasutra-birth', panelAssetId: 'mahavira-kalpasutra-birth',
    articleRoute: {kind: 'philosopher', philosopherId: 'mahavira'},
    presentation: presentation('Gallery 04 supplemental exhibit', 'Mahāvīra in transmission', [
      {label: 'Object', value: 'Painting from a Kalpa-sūtra: Queen Triśalā Reclining'},
      {label: 'Place / date', value: 'Western India, Gujarat · c. 1450–75'},
      {label: 'Holding', value: 'Cleveland Museum of Art · 1925.1340'},
    ], 'Read the full sourced Mahāvīra article', 'philosopher'),
    wallPlaque: {type: 'reception-or-transmission-history', title: 'Queen Triśalā Reclining', invitation: 'A fifteenth-century Kalpa-sūtra painting remembers Mahāvīra before birth while revealing how later Jain communities carried sacred biography, lineage, and ethical teaching through image and manuscript.', canonicalContexts: [{kind: 'philosopher', id: 'mahavira'}]},
    resolution: 'Resolved: retained the installed Cleveland folio but corrected it from a birth scene to Queen Triśalā reclining, restored the museum’s c. 1450–75 date and object identity, and bounded the image as later sacred-biographical transmission.',
    lock: 'fnv1a64:80475e915e9952e0',
  }),
  reviewedExhibit({
    id: 'kanada-atomism-dyads',
    displayName: 'Kaṇāda: Atoms, Dyads, and Composite Bodies',
    shortTitle: 'Kaṇāda: Atoms and Composites',
    workLabel: 'KAṆĀDA · VAIŚEṢIKA ATOMISM',
    dateLabel: 'Modern explanatory illustration · 2026',
    question: 'How can imperceptible atoms produce perceptible composite things?',
    frontSubtitle: 'Paramāṇu, combination, motion, difference, and material change',
    lead: 'Vaiśeṣika thinkers developed an atomist account in which eternal, imperceptible atoms combine into larger structures and help explain material change without turning every thing into one undifferentiated stuff. The contemporary illustration separates atom, dyad, and triad for orientation. It is not an ancient diagram and should not be mistaken for modern particle physics.',
    keyIdeas: ['Atoms are enduring and imperceptible; composites arise through combination.', 'Kinds of atom help explain qualitative differences among material elements.', 'Motion, conjunction, disjunction, and causation are part of the account—not decorative additions.'],
    cautions: ['The diagram modernizes and simplifies a long textual debate.', 'Vaiśeṣika atomism is not an early version of current atomic theory.'],
    sections: [
      {paragraph: 'The installed image is Xaetherion’s 2026 educational illustration, not an ancient diagram or historical portrait. It separates paramāṇu, dyad, and triad beside an imagined seated Kaṇāda, while a printed “6th–2nd BCE” range belongs to the modern graphic rather than verified biography. The source file and installed derivatives are useful for orientation because they make scale and combination visible, but they cannot establish the chronology, wording, or authorship of the Vaiśeṣika Sūtra. The name Kaṇāda conventionally anchors a textual tradition whose received aphorisms and later commentaries developed across uncertain periods.', sourceIds: ['kanada-atomic-commons', 'kanada-naturalism-sep', 'kanada-sutra']},
      {paragraph: 'Vaiśeṣika atomism explains material change through enduring, imperceptible constituents and the production or dissolution of composites. Later accounts distinguish types of atom associated with material elements and analyze how motion, conjunction, disjunction, causation, wholes, and qualities belong to composite bodies. Atomism is therefore one part of a larger realist category project that also treats substances, qualities, motions, universals, particularizers, inherence, and, in later formulations, absence. The exhibit does not project every mature doctrine backward onto one founder or imply that a single early text already contained the later Nyāya–Vaiśeṣika synthesis.', sourceIds: ['kanada-naturalism-sep', 'kanada-sutra', 'kanada-iep']},
      {paragraph: 'Comparison with Greek atomism or modern physics can clarify a shared explanatory question—how imperceptible constituents relate to perceptible change—only when differences remain visible. Vaiśeṣika atoms participate in a metaphysical, epistemological, ethical, and liberative system rather than a modern experimental theory. Selves, mind, moral causation, universals, and liberation prevent the tradition from becoming simple materialism. The modern picture is thus a visitor aid whose labels require independent textual support. Its best use is to begin a historically responsible, source-aware inquiry into composition, while the sourced Kaṇāda article carries the uncertainties about recension, author figure, later systematization, and comparison.', sourceIds: ['kanada-naturalism-sep', 'kanada-iep', 'kanada-sutra']},
    ],
    visitorGuide: [
      {heading: 'From atom to composite', items: [
        {label: 'Paramāṇu', description: 'An imperceptible ultimate constituent in Vaiśeṣika accounts, not a particle defined by modern physics.', sourceIds: ['kanada-naturalism-sep', 'kanada-iep']},
        {label: 'Combination', description: 'Dyads and larger composites offer a later explanatory bridge between enduring atoms and visible bodies.', sourceIds: ['kanada-naturalism-sep', 'kanada-iep']},
      ]},
      {heading: 'Keep the history layered', items: [
        {label: 'Attributed author', description: 'Kaṇāda names the traditional author figure, but secure life dates and a recoverable biography are unavailable.', sourceIds: ['kanada-sutra', 'kanada-naturalism-sep']},
        {label: 'Modern visual', description: 'The 2026 image simplifies doctrine and includes an imagined portrait and unsupported printed chronology.', sourceIds: ['kanada-atomic-commons']},
      ]},
    ],
    sources: [
      {id: 'kanada-atomic-commons', label: 'Wikimedia Commons — Xaetherion’s 2026 Vaiśeṣika atomic-theory illustration and CC BY-SA record', url: 'https://commons.wikimedia.org/wiki/File:Illustration_of_the_atomic_theory_of_Acharya_Kanada_showing_Param%C4%81%E1%B9%87u,_Dvya%E1%B9%87uka,_and_Trya%E1%B9%87uka_concepts_from_the_Vaisheshika_philosophy..jpg', kind: 'collection-record'},
      {id: 'kanada-naturalism-sep', label: 'Stanford Encyclopedia of Philosophy — Naturalism in Classical Indian Philosophy', url: 'https://plato.stanford.edu/entries/naturalism-india/', kind: 'academic-reference'},
      {id: 'kanada-iep', label: 'Internet Encyclopedia of Philosophy — Vaiśeṣika', url: 'https://iep.utm.edu/vaisesika/', kind: 'academic-reference'},
      {id: 'kanada-sutra', label: 'Vaiśeṣika Sūtra with Upaskāra commentary, historical English translation', url: 'https://www.wisdomlib.org/hinduism/book/vaisheshika-sutra-commentary', kind: 'primary-text'},
    ],
    objectInterpretation: 'Xaetherion’s 2026 image is a modern teaching aid with an imagined Kaṇāda and simplified atoms, dyads, and triads; it is not an ancient diagram, portrait, verified chronology, or scientific model.',
    assetId: 'kanada-atomic-theory-illustration', panelAssetId: 'kanada-atomic-theory-illustration',
    articleRoute: {kind: 'philosopher', philosopherId: 'kanada'},
    presentation: presentation('Gallery 04 supplemental exhibit', 'Atoms and composites', [{label: 'Image', value: 'Xaetherion educational illustration'},{label: 'Date / rights', value: '2026 · CC BY-SA 4.0'},{label: 'Status', value: 'Modern simplification with imagined portrait'}], 'Read the full sourced Kaṇāda article', 'philosopher'),
    wallPlaque: {type: 'concept-argument-diagram-or-method', title: 'Atoms, Dyads, and Composite Bodies', invitation: 'A modern diagram introduces Vaiśeṣika combination while Kaṇāda’s uncertain textual tradition asks how imperceptible constituents can explain perceptible bodies without becoming modern physics.', canonicalContexts: [{kind: 'philosopher', id: 'kanada'}]},
    resolution: 'Resolved: verified the 2026 CC BY-SA teaching image, exposed its imagined portrait and unsupported printed chronology, separated textual evidence from illustration, and matched the mount to its natural ratio.',
    lock: 'fnv1a64:12864c54238295bd',
  }),
  reviewedExhibit({
    id: 'vaiseshika-pramana',
    displayName: 'Kaṇāda’s Tradition: Perception and Inference',
    shortTitle: 'Kaṇāda: Vaiśeṣika Means of Knowledge',
    workLabel: 'KAṆĀDA · VAIŚEṢIKA EPISTEMOLOGY',
    dateLabel: 'Modern comparative diagram · 2016',
    question: 'How can an atomist and realist system justify claims about what cannot be perceived?',
    frontSubtitle: 'Perception, inference, testimony, and changing school boundaries',
    lead: 'The diagram summarizes a common presentation of classical Vaiśeṣika as recognizing perception and inference as independent means of knowledge. Testimony can then be treated through inference, though later Nyāya-Vaiśeṣika syntheses complicate any fixed boundary. The exhibit pairs epistemology with atomism because unobservable entities require arguments about what counts as reliable cognition.',
    keyIdeas: ['Perception concerns direct cognition under specified conditions.', 'Inference extends knowledge beyond what is immediately perceived.', 'School lists of pramāṇas changed as traditions debated and merged.'],
    cautions: ['A two-item chart compresses historical development and disagreement.', 'The modern diagram is not evidence that every Vaiśeṣika author used one unchanged taxonomy.'],
    sections: [
      {paragraph: 'The installed object is Ms Sarah Welch’s self-published 2016 explanatory diagram. It connects perception and inference to knowledge and labels the scheme “Vaisheshika.” The file is CC BY-SA 4.0 and preserves its complete 512-by-817 composition in both Museum derivatives. It is not a manuscript, historical chart, or collection object. Its value lies in giving visitors a quick visual distinction between two pramāṇas commonly associated with early Vaiśeṣika, while its simplicity requires a warning: a modern two-item flowchart cannot establish what every author recognized across a long and changing tradition.', sourceIds: ['vaiseshika-pramana-commons', 'indian-epistemology-sep', 'kanada-iep']},
      {paragraph: 'A realist category system needs an account of how claims become warranted. Perception addresses cognition arising under appropriate sensory conditions; inference extends knowledge beyond what is immediately presented. That extension matters when a system argues for atoms, universals, inherence, selves, causal relations, or absence, none of which is exhausted by a single visible object. Classical discussions therefore analyze reasons, sign-target relations, error, testimony, and competing explanations rather than treating inference as a decorative arrow from sensation to certainty. The diagram opens this problem but does not supply the arguments that make an inference reliable.', sourceIds: ['indian-epistemology-sep', 'kanada-iep', 'kanada-sutra-pramana']},
      {paragraph: 'School boundaries also change. Vaiśeṣika developed in sustained conversation and later synthesis with Nyāya, whose epistemological lists and theories became more extensive. Treating “two pramāṇas” as an eternal badge would erase those interactions and project a neat chart across contested texts. The exhibit instead uses the image as a dated pedagogical artifact and returns historical claims to textual and scholarly sources. Beside the atomism display, it asks a focused historical question: what evidence licenses a move from perceived effects to unperceived entities? The answer belongs to a history of arguments, not to the diagram’s graphic confidence.', sourceIds: ['indian-epistemology-sep', 'kanada-iep', 'vaiseshika-pramana-commons']},
    ],
    visitorGuide: [{heading: 'Two routes to knowledge',items:[{label:'Perception',description:'Direct cognition requires appropriate objects, senses, and conditions; it is not whatever merely seems present.',sourceIds:['indian-epistemology-sep','kanada-iep']},{label:'Inference',description:'Reasoning moves beyond what is perceived only through a defensible relation between sign and target.',sourceIds:['indian-epistemology-sep','kanada-iep']}]},{heading:'Historical limits',items:[{label:'Modern diagram',description:'Welch created this explanatory SVG in 2016; it is not primary evidence for the school.',sourceIds:['vaiseshika-pramana-commons']},{label:'Changing synthesis',description:'Later Nyāya–Vaiśeṣika interaction prevents one two-item list from defining every period.',sourceIds:['indian-epistemology-sep','kanada-iep']}]}],
    sources: [
      {id:'vaiseshika-pramana-commons',label:'Wikimedia Commons — Ms Sarah Welch, Two Pramāṇas in Vaiśeṣika, 2016',url:'https://commons.wikimedia.org/wiki/File:2_Pramana_Epistemology_Vaisheshika_Hindu_school.svg',kind:'collection-record'},
      {id:'indian-epistemology-sep',label:'Stanford Encyclopedia of Philosophy — Epistemology in Classical Indian Philosophy',url:'https://plato.stanford.edu/entries/epistemology-india/',kind:'academic-reference'},
      {id:'kanada-iep',label:'Internet Encyclopedia of Philosophy — Vaiśeṣika',url:'https://iep.utm.edu/vaisesika/',kind:'academic-reference'},
      {id:'kanada-sutra-pramana',label:'Vaiśeṣika Sūtra with Upaskāra commentary, historical English translation',url:'https://www.wisdomlib.org/hinduism/book/vaisheshika-sutra-commentary',kind:'primary-text'},
    ],
    objectInterpretation:'Ms Sarah Welch’s 2016 diagram is a modern orientation aid, not historical evidence. Its two-pramāṇa summary must be read within changing Vaiśeṣika and Nyāya–Vaiśeṣika textual traditions.',
    assetId: 'vaiseshika-two-pramana', panelAssetId: 'vaiseshika-two-pramana',
    articleRoute: {kind: 'philosopher', philosopherId: 'kanada'},
    presentation:presentation('Gallery 04 supplemental exhibit','Vaiśeṣika pramāṇas',[{label:'Diagram',value:'Ms Sarah Welch · 2016'},{label:'Means shown',value:'Perception and inference'},{label:'Rights',value:'CC BY-SA 4.0'}],'Read the full sourced Kaṇāda article','philosopher'),
    wallPlaque:{type:'concept-argument-diagram-or-method',title:'Perception and Inference',invitation:'A modern Vaiśeṣika diagram distinguishes two means of knowledge while Kaṇāda’s realist tradition asks how perception and inference can justify claims about unobservable entities.',canonicalContexts:[{kind:'philosopher',id:'kanada'}]},
    resolution:'Resolved: verified Welch’s 2016 CC BY-SA diagram, separated its pedagogical simplification from historical evidence, mapped epistemological claims independently, and corrected the mount to its natural ratio.',lock:'fnv1a64:77f998b8895ddc0e',
  }),
  reviewedExhibit({
    id: 'patanjali-yogasutra-manuscript',
    displayName: 'Patañjali: The Yoga Sūtra Manuscript Tradition',
    shortTitle: 'Patañjali: Yoga Sūtra Manuscript',
    workLabel: 'PATAÑJALI · YOGA SŪTRA TRANSMISSION',
    dateLabel: 'National Library of India, Th 217 · before 1900',
    question: 'What can a late manuscript witness tell us about a much older and disputed textual lineage?',
    frontSubtitle: 'Aphorism, commentary, copying, authorship, and uncertain chronology',
    lead: 'The Yoga Sūtras are traditionally attributed to Patañjali, but neither the author’s precise identity nor the text’s date is securely fixed. This pre-1900 manuscript is evidence for transmission, not an autograph. The work’s compressed aphorisms also became intelligible through commentary—especially the Yoga Bhāṣya—so “Patañjali” names a textual and interpretive tradition as much as a recoverable biography.',
    keyIdeas: ['The Yoga Sūtras organize practice, affliction, concentration, cognition, and liberation.', 'Aphoristic text and commentary are historically intertwined.', 'Recent integrated-text scholarship often places the Pātañjalayogaśāstra around the fourth century CE, while earlier proposals remain debated.'],
    cautions: ['Do not convert an uncertain textual chronology into exact birth and death dates.', 'The manuscript is late and cannot establish the appearance or biography of an author.'],
    sections:[
      {paragraph:'The installed photograph shows a two-page Devanagari manuscript opening numbered 180 and 181. Wikimedia Commons reports it as a Yoga Sutras manuscript from the National Library of India Rare Books Division, shelfmark Th 217, made before 1900. That identification derives from a library social-media post rather than a stable public catalogue, so the holding, shelfmark, date, and Public Domain Mark are presented as source-record reports rather than independently verified institutional facts. The unknown copyist is not Patañjali, and this late witness is neither an autograph nor evidence for the author’s appearance or lifetime.',sourceIds:['patanjali-ms-commons','patanjali-iep','patanjali-maas']},
      {paragraph:'Patañjali is the traditional name attached to the Yoga Sūtra textual tradition, but secure biography and exact composition dates remain unavailable. Scholarship debates the relation between terse sūtras and the earliest bhāṣya, including arguments that they formed an integrated Pātañjalayogaśāstra around the fourth century CE. That horizon is an approximate textual placement, not a birth or death date. A manuscript copied many centuries later instead demonstrates continued transmission: readers, scribes, teachers, and commentators preserved an aphoristic work whose meaning has always depended on interpretive practice.',sourceIds:['patanjali-iep','patanjali-maas','patanjali-ms-commons']},
      {paragraph:'The transmitted work treats mental fluctuations, reliable and unreliable cognition, affliction, karma, ethical restraints, observances, posture, breath, concentration, meditation, absorption, and liberating discernment. Modern posture-centered meanings therefore capture only a small part of its philosophical-practical project. At the same time, the manuscript cannot prove that every later practice descends unchanged from one text. Copying is material evidence of later reception, not automatic proof of unchanged meaning, authorship, or practice. The exhibit keeps object and argument distinct: the photographed leaves evidence a reported modern-era manuscript witness, while primary-text scholarship and the full sourced Patañjali article address authorship, commentary, metaphysics, practice, and chronological uncertainty.',sourceIds:['patanjali-iep','patanjali-maas','patanjali-ms-commons']},
    ],
    visitorGuide:[{heading:'Reading the witness',items:[{label:'Reported shelfmark',description:'Commons identifies National Library of India Th 217, but no stable public catalogue record was available.',sourceIds:['patanjali-ms-commons']},{label:'Late copy',description:'The manuscript witnesses transmission before 1900, not an autograph or authorial biography.',sourceIds:['patanjali-ms-commons','patanjali-iep']}]},{heading:'Textual questions',items:[{label:'Sūtra and bhāṣya',description:'Their authorship and degree of unity remain central scholarly disputes.',sourceIds:['patanjali-maas','patanjali-iep']},{label:'Approximate horizon',description:'A fourth-century placement describes a textual hypothesis, never a precise lifespan.',sourceIds:['patanjali-maas','patanjali-iep']}]}],
    sources: [
      {id:'patanjali-ms-commons',label:'Wikimedia Commons — reported Yoga Sutras manuscript Th 217 and PDM record',url:'https://commons.wikimedia.org/wiki/File:Patanjali_Yoga_Sutras_manuscript.jpg',kind:'collection-record'},
      {id:'patanjali-iep',label:'Internet Encyclopedia of Philosophy — Yoga',url:'https://iep.utm.edu/yoga/',kind:'academic-reference'},
      {id:'patanjali-maas',label:'Philipp A. Maas — Samādhipāda critical edition',url:'https://www.shaker.de/de/site/content/shop/index.asp?ID=8&ISBN=978-3-8322-4987-8&lang=de',kind:'academic-reference'},
    ],
    objectInterpretation:'The two-page opening is reported as National Library of India Th 217. It evidences later transmission only; its shelfmark, pre-1900 date, and PDM status lack a stable institutional catalogue or rights record.',
    assetId: 'patanjali-yoga-sutra-manuscript', panelAssetId: 'patanjali-yoga-sutra-manuscript',
    articleRoute: {kind: 'philosopher', philosopherId: 'patanjali'},
    presentation:presentation('Gallery 04 supplemental exhibit','Patañjali in transmission',[{label:'Reported witness',value:'National Library of India Th 217'},{label:'Date',value:'Reported before 1900; exact date unknown'},{label:'Record limit',value:'No stable institutional catalogue located'}],'Read the full sourced Patañjali article','philosopher'),
    wallPlaque:{type:'object-manuscript-site-or-archaeological-context',title:'Yoga Sūtra Manuscript Opening',invitation:'A late manuscript reported as National Library of India Th 217 shows textual transmission while Patañjali’s authorship, chronology, and sūtra-commentary relationship remain disputed.',canonicalContexts:[{kind:'philosopher',id:'patanjali'}]},
    resolution:'Resolved: verified the installed two-page image, qualified its social-media-derived shelfmark, date, and rights record, corrected its description, separated transmission from authorship, and matched its natural ratio.',lock:'fnv1a64:43a29529cd13eadd',
  }),
  reviewedExhibit({
    id: 'patanjali-samkhya-yoga-pramana',
    displayName: 'Patañjali’s Yoga: Three Means of Knowledge',
    shortTitle: 'Patañjali: Yoga Means of Knowledge',
    workLabel: 'PATAÑJALI · COGNITION AND ERROR',
    dateLabel: 'Modern comparative diagram · 2016/2020',
    question: 'How does Yoga distinguish reliable cognition from error and mental construction?',
    frontSubtitle: 'Perception, inference, testimony, and the disciplined analysis of mind',
    lead: 'Yoga classifies perception, inference, and reliable testimony as means of valid cognition while also analyzing error, conceptual construction, sleep, and memory as kinds of mental fluctuation. The point is not merely to collect true beliefs. Practice changes the mind’s activity so that discriminative insight and liberation become possible.',
    keyIdeas: ['Valid cognition is one category within a wider analysis of mental fluctuations.', 'Perception, inference, and reliable testimony have different warrants.', 'Yoga shares concepts with Sāṃkhya while developing a distinct practical and theological profile.'],
    cautions: ['The chart is a modern summary, not a manuscript page.', 'Calling Yoga “psychology” can hide its metaphysics, ethics, discipline, and liberative aim.'],
    sections:[
      {paragraph:'The installed object is Ms Sarah Welch’s 2016 explanatory SVG, with translated versions added in 2020. It routes perception, inference, and “word/reliable source” toward knowledge under the modern label “Samkhya, Yoga.” The image is a CC BY-SA teaching aid hosted on Wikimedia Commons, not a manuscript or historical diagram. Its clean arrows make three terms easy to compare, but they do not establish that Sāṃkhya and Yoga were identical, that every author used one unchanged taxonomy, or that reliable cognition exhausts Yoga’s account of mental life.',sourceIds:['yoga-pramana-commons','yoga-sutra','patanjali-iep']},
      {paragraph:'Yoga Sūtra 1.7 names perception, inference, and authoritative verbal testimony as pramāṇas, while 1.6 places valid cognition within a wider analysis of mental fluctuations that also includes error, conceptual construction, sleep, and memory. Reliable cognition is therefore not the final goal by itself. Pātañjala practice asks how mental activity, affliction, karmic disposition, concentration, and discernment relate to liberation. Perception and inference require appropriate conditions and warrants; testimony is not mere repetition but depends on authority, competence, transmission, and interpretation. The chart points toward these distinctions without explaining them.',sourceIds:['yoga-sutra','patanjali-iep','patanjali-maas-pramana']},
      {paragraph:'Sāṃkhya and Yoga share important metaphysical vocabulary in many classical presentations, including distinctions between consciousness and material-mental processes. Yet their textual histories, practices, accounts of Īśvara, and later receptions resist collapse into one school. The exhibit consequently treats the combined label as the scope of a contemporary comparison, not as proof of historical sameness. Installed beside the manuscript witness, the diagram also shows why Yoga cannot be reduced to private inward experience: reasoning, teaching, interpretation, and transmitted words belong to its wider epistemic world. Historical claims therefore remain deliberately mapped to the relevant sūtra and scholarship rather than borrowed from the uploader’s graphic.',sourceIds:['patanjali-iep','patanjali-maas-pramana','yoga-pramana-commons']},
    ],
    visitorGuide:[{heading:'Yoga Sūtra 1.7',items:[{label:'Perception',description:'Direct cognition is one valid mode, not a guarantee that every appearance is true.',sourceIds:['yoga-sutra','patanjali-iep']},{label:'Inference',description:'Reasoning reaches beyond present perception through a warranted relation among signs and claims.',sourceIds:['yoga-sutra','patanjali-iep']}]},{heading:'Word and practice',items:[{label:'Reliable testimony',description:'Authoritative words require competence and transmission rather than blind repetition.',sourceIds:['yoga-sutra','patanjali-iep']},{label:'Modern comparison',description:'Welch’s combined Sāṃkhya-Yoga image is a teaching aid, not primary historical evidence.',sourceIds:['yoga-pramana-commons']}]}],
    sources: [
      {id:'yoga-pramana-commons',label:'Wikimedia Commons — Ms Sarah Welch, Three Pramāṇas in Sāṃkhya and Yoga',url:'https://commons.wikimedia.org/wiki/File:3_Pramana_Epistemology_Samkhya_Yoga_Hindu_schools.svg',kind:'collection-record'},
      {id:'patanjali-iep',label:'Internet Encyclopedia of Philosophy — Yoga',url:'https://iep.utm.edu/yoga/',kind:'academic-reference'},
      {id:'yoga-sutra',label:'Yoga Sūtra, especially 1.6–1.7, historical English translation',url:'https://sacred-texts.com/hin/yogasutr.htm',kind:'primary-text'},
      {id:'patanjali-maas-pramana',label:'Philipp A. Maas — Samādhipāda critical edition',url:'https://www.shaker.de/de/site/content/shop/index.asp?ID=8&ISBN=978-3-8322-4987-8&lang=de',kind:'academic-reference'},
    ],
    objectInterpretation:'Ms Sarah Welch’s diagram is a modern comparison of three pramāṇas, not a historical witness. Yoga Sūtra 1.7 and scholarship, rather than the graphic, support the philosophical claims.',
    assetId: 'samkhya-yoga-three-pramana', panelAssetId: 'samkhya-yoga-three-pramana',
    articleRoute: {kind: 'philosopher', philosopherId: 'patanjali'},
    presentation:presentation('Gallery 04 supplemental exhibit','Yoga pramāṇas',[{label:'Diagram',value:'Ms Sarah Welch · 2016/2020'},{label:'Means shown',value:'Perception, inference, reliable word'},{label:'Rights',value:'CC BY-SA 4.0'}],'Read the full sourced Patañjali article','philosopher'),
    wallPlaque:{type:'concept-argument-diagram-or-method',title:'Three Means of Knowledge',invitation:'A modern diagram introduces perception, inference, and reliable testimony while Patañjali’s Yoga places valid cognition within a wider discipline of mind and liberation.',canonicalContexts:[{kind:'philosopher',id:'patanjali'}]},
    resolution:'Resolved: verified Welch’s modern CC BY-SA diagram, grounded the three means in Yoga Sūtra 1.7, separated Sāṃkhya-Yoga comparison from identity, and corrected the mount ratio.',lock:'fnv1a64:70882493500a058e',
  }),
  reviewedExhibit({
    id: 'shankara-aitareya-bhasya',
    displayName: 'Śaṅkara: Teaching, Commentary, and Devotional Memory', shortTitle:'Śaṅkara with Disciples', workLabel:'ŚAṄKARA · TEACHING AND LATER DEVOTIONAL MEMORY', dateLabel:'Modern devotional sculpture · photographed in Warangal, 2016', question:'What can a modern teaching image reveal—and what can it not establish about Śaṅkara?', frontSubtitle:'A later imagined teacher-and-disciples group opens the history of commentary without pretending to be a manuscript or portrait.', lead:'The installed object is a modern devotional sculpture in Warangal, photographed by Shishirdasika in 2016. It imagines Śaṅkara teaching four disciples but supplies no historical likeness, manuscript evidence, or proof about one particular commentary.',
    keyIdeas: ['Bhāṣya is sustained philosophical argument, not a neutral paraphrase.', 'Advaita distinguishes ultimate reality from ordinary empirical experience.', 'Liberation depends on knowledge, while discipline and inquiry prepare the knower.'],
    cautions:['The sculpture is a modern imagined likeness with unknown sculptor and unverified holding institution.','It is not the 1593 Aitareya bhāṣya manuscript previously claimed by this exhibit.'],
    sections:[
      {paragraph:'The installed scene and panel reproduce a modern orange-painted sculpture group in Warangal, Telangana. Shishirdasika photographed it on 26 December 2016 and released the image under CC BY-SA 4.0. The sculptor, commission history, provenance, and formal holding institution are not established by the source record. Śaṅkara appears seated with four disciples, but the group is devotional imagination rather than a historical portrait. It is also not the 1593 Aitareya Upaniṣad bhāṣya manuscript previously described by this exhibit, so it cannot evidence that manuscript’s copying, script, repository, or exact commentary.',sourceIds:['shankara-sculpture-commons','shankara-sep']},
      {paragraph:'Used honestly, the group makes a later memory of teaching visible. Śaṅkara’s surviving works develop Advaita through commentary, objection, reply, textual reconciliation, and pedagogical strategies aimed at liberating knowledge. His secure corpus and historical life must be distinguished from much later biographies, institutions, devotional images, and lineages that claim or represent his authority. The sculpture shows how a community can picture an exemplary teacher surrounded by disciples; it does not establish the names of those figures, reproduce a documented episode, or reveal Śaṅkara’s appearance. Object evidence and philosophical evidence therefore remain separate.',sourceIds:['shankara-sep','shankara-hirst','shankara-sculpture-commons']},
      {paragraph:'Śaṅkara argues that nondual Brahman is ultimate while ordinary empirical life retains practical validity within its standpoint. Commentary is not neutral paraphrase: it orders passages, answers opponents, and forms a systematic philosophical teaching. Rāmānuja, Madhva, and other Vedāntins read overlapping textual inheritances differently, disputing the reality of difference, the world, divine attributes, and liberation. The modern group cannot decide those arguments, but it prompts a question about transmission: how do commentarial methods become embodied in teacher-disciple memory? The full sourced article answers with texts and scholarship; the installed sculpture contributes only a bounded history of later devotional representation.',sourceIds:['shankara-sep','shankara-hirst']},
    ],
    visitorGuide:[{heading:'What the image establishes',items:[{label:'Modern devotional group',description:'The 2016 photograph records an imagined Śaṅkara teaching four disciples in Warangal.',sourceIds:['shankara-sculpture-commons']},{label:'Unknown provenance',description:'The source does not verify the sculptor, commission, or holding institution.',sourceIds:['shankara-sculpture-commons']}]},{heading:'What commentary does',items:[{label:'Argument through reading',description:'Śaṅkara interprets inherited texts by ranking passages, answering objections, and guiding inquiry.',sourceIds:['shankara-sep','shankara-hirst']},{label:'Contested inheritance',description:'Other Vedāntins reject central Advaita conclusions rather than merely repeating one consensus.',sourceIds:['shankara-sep','shankara-hirst']}]}],
    sources: [
      {id:'shankara-sculpture-commons',label:'Wikimedia Commons — Ādi Śaṅkarācārya with Disciples, Warangal, 2016',url:'https://commons.wikimedia.org/wiki/File:Adi_Shankaracharya_with_Disciples.jpg',kind:'collection-record'},
      {id:'shankara-sep',label:'Stanford Encyclopedia of Philosophy — Śaṅkara',url:'https://plato.stanford.edu/entries/shankara/',kind:'academic-reference'},
      {id:'shankara-hirst',label:'Jacqueline Suthren Hirst — Śaṃkara’s Advaita Vedānta: A Way of Teaching',url:'https://www.routledge.com/Samkaras-Advaita-Vedanta-A-Way-of-Teaching/SuthrenHirst/p/book/9780415406017',kind:'academic-reference'},
    ],
    objectInterpretation:'The 2016 photograph records a modern imagined teacher-and-disciples group in Warangal. It is not a historical likeness, manuscript, documented episode, or evidence about the Aitareya commentary.',
    assetId: 'shankara-aitareya-bhasya-1593', panelAssetId: 'shankara-aitareya-bhasya-1593',
    articleRoute: {kind: 'philosopher', philosopherId: 'shankara'},
    presentation:presentation('Gallery 04 supplemental exhibit','Śaṅkara in later memory',[{label:'Object',value:'Ādi Śaṅkarācārya with Disciples'},{label:'Image',value:'Shishirdasika · Warangal · 2016'},{label:'Status',value:'Modern imagined likeness · CC BY-SA 4.0'}],'Read the full sourced Adi Shankara article','philosopher'),
    wallPlaque:{type:'reception-or-transmission-history',title:'Śaṅkara with Disciples',invitation:'A modern devotional group imagines Śaṅkara as a teacher while his sourced commentarial tradition—not this later sculpture—grounds claims about Advaita argument and transmission.',canonicalContexts:[{kind:'philosopher',id:'shankara'}]},
    resolution:'Resolved: reconciled the exhibit to the installed modern Warangal sculpture instead of the falsely claimed 1593 manuscript, corrected identity, rights, accessibility, interpretation, and exact 4:3 mount, and bounded the imagined likeness.',lock:'fnv1a64:39ee67ab7eac2505',
  }),
  reviewedExhibit({
    id: 'madhva-udupi-matha',
    displayName: 'Madhva: Udupi and the Institutional Life of Dvaita',
    shortTitle: 'Madhva: Udupi and Dvaita',
    workLabel: 'MADHVA · SCHOOL, PRACTICE, AND INSTITUTION',
    dateLabel: 'Śrī Kṛṣṇa Maṭha, Udupi · photographed 2008',
    question: 'How does a philosophical school persist through institutions, ritual, teaching, and succession?',
    frontSubtitle: 'Dvaita interpretation beyond a single author or proposition',
    lead: 'Madhva’s Dvaita Vedānta insists on real and enduring distinctions among God, individual selves, and material reality. The Udupi Kṛṣṇa Maṭha belongs to the tradition’s institutional afterlife: a place where commentary, worship, teaching, succession, and public identity sustain philosophical commitments. Architecture cannot prove a doctrine, but it prevents “school” from shrinking into one abstract thesis.',
    keyIdeas: ['Difference is real rather than a provisional appearance to be overcome.', 'Dependence on Viṣṇu does not erase the individuality of selves or the reality of the world.', 'Institutions carry arguments through teaching, ritual, authority, and debate.'],
    cautions: ['The photographed tower is later built fabric, not a thirteenth-century view.', 'A living religious institution should not be reduced to an illustration of one proposition.'],
    sections:[
      {paragraph:'The installed object is Syam’s photograph of the tower at the Udupi Śrī Kṛṣṇa Maṭha, taken on 21 August 2008 and first shared through Flickr before transfer to Wikimedia Commons. The file is licensed CC BY 2.0 and its complete four-to-three composition is preserved. This is a view of a living religious site in Udupi, not an object held by a museum. The visible tower is later built fabric: the photograph cannot establish a thirteenth-century appearance, date individual architectural phases, or document Madhva’s own activity. Its provenance is photographic and contemporary even when institutional tradition reaches further back.',sourceIds:['madhva-udupi-commons','madhva-matha-official','madhva-iep']},
      {paragraph:'Madhva’s Dvaita Vedānta argues for an independent Viṣṇu and real dependent selves and matter. Difference is not merely an appearance erased by correct knowledge. Yet a temple façade cannot prove that metaphysics. The site matters because philosophical traditions persist through commentaries, teaching, debate, ritual, succession, pilgrimage, patronage, and public identity. Institutional memory connects the Udupi maṭha with Madhva, while historical scholarship distinguishes a living lineage’s self-understanding from claims that every visible feature or practice descends unchanged from a founder. The photograph therefore anchors institutional reception rather than serving as a diagram of doctrine.',sourceIds:['madhva-iep','madhva-sarma','madhva-matha-official']},
      {paragraph:'Later Mādhva thinkers interpreted texts, defended lineage, answered Advaita and Viśiṣṭādvaita opponents, and reformulated realism in new settings. That continuing work prevents “school” from shrinking into one proposition or one medieval author. It also cautions against treating a living sacred institution as museum evidence detached from worshippers and present authority. Visitors can use the tower to ask where arguments are taught and remembered, then turn to the sourced Madhva article for the five differences, epistemology, divine independence, hierarchy, liberation, and disputes over historical development. Architecture supplies place and continuity; texts and scholarship supply the philosophical claims.',sourceIds:['madhva-iep','madhva-sarma','madhva-matha-official']},
    ],
    visitorGuide:[{heading:'Reading the site',items:[{label:'Living institution',description:'Udupi Kṛṣṇa Maṭha remains a religious and teaching center rather than a museum holding.',sourceIds:['madhva-matha-official']},{label:'Modern photograph',description:'Syam’s 2008 view does not date the visible tower or reconstruct Madhva’s Udupi.',sourceIds:['madhva-udupi-commons']}]},{heading:'Dvaita in transmission',items:[{label:'Real difference',description:'Madhva treats God, selves, and matter as genuinely distinct while all dependent reality relies on Viṣṇu.',sourceIds:['madhva-iep','madhva-sarma']},{label:'Institutional argument',description:'Lineage, teaching, commentary, ritual, and debate carry a school through changing historical settings.',sourceIds:['madhva-matha-official','madhva-sarma']}]}],
    sources: [
      {id:'madhva-udupi-commons',label:'Wikimedia Commons — Syam photograph of Udupi Kṛṣṇa Maṭha, 2008',url:'https://commons.wikimedia.org/wiki/File:Madhvacharya_Krishna_Matha_Udupi_Karnataka.jpg',kind:'collection-record'},
      {id:'madhva-matha-official',label:'Śrī Kṛṣṇa Maṭha — official institutional site',url:'https://shrikrishnamatha.org/',kind:'primary-text'},
      {id:'madhva-iep',label:'Internet Encyclopedia of Philosophy — Madhva',url:'https://iep.utm.edu/madhva/',kind:'academic-reference'},
      {id:'madhva-sarma',label:'Deepak Sarma — An Introduction to Madhva Vedanta',url:'https://www.routledge.com/An-Introduction-to-Madhva-Vedanta/Sarma/p/book/9780754606376',kind:'academic-reference'},
    ],
    objectInterpretation:'Syam’s 2008 photograph records later built fabric at a living Udupi institution associated with Madhva. It establishes neither the tower’s age nor Dvaita doctrine or a thirteenth-century view.',
    assetId: 'madhva-udupi-krishna-matha', panelAssetId: 'madhva-udupi-krishna-matha',
    articleRoute: {kind: 'philosopher', philosopherId: 'madhva'},
    presentation:presentation('Gallery 04 supplemental exhibit','Madhva and Udupi',[{label:'Site',value:'Śrī Kṛṣṇa Maṭha · Udupi'},{label:'Photograph',value:'Syam · 21 August 2008'},{label:'Rights',value:'CC BY 2.0'}],'Read the full sourced Madhva article','philosopher'),
    wallPlaque:{type:'object-manuscript-site-or-archaeological-context',title:'Śrī Kṛṣṇa Maṭha at Udupi',invitation:'A modern view of this living institution asks how Madhva’s Dvaita persists through teaching, ritual, succession, commentary, and debate beyond any single building.',canonicalContexts:[{kind:'philosopher',id:'madhva'}]},
    resolution:'Resolved: verified Syam’s 2008 CC BY photograph, treated Udupi as a living site rather than a holding institution, separated later built fabric from foundation memory, and retained the exact 4:3 mount.',lock:'fnv1a64:5ca42d93eb0517fb',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

export const CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBITS = [
  ...exhibits,
  ...CLASSICAL_SOUTH_ASIAN_WALL_FILL_EXHIBITS,
] as const satisfies readonly MuseumSupplementalExhibit[];

export const CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'south-sarva-darsana-compendium', parentExhibitId: 'indian-philosophy', zoneId: 'south-orientation-many-schools', position: {x: 10.85, z: -22.4}, rotationY: -Math.PI / 2, assetId: 'south-sarva-darsana-1908', mediaWidth: 2.49075, mediaHeight: 3.28, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'south-upanishad-manuscript-world', parentExhibitId: 'indian-philosophy', zoneId: 'south-orientation-many-schools', position: {x: -5.55, z: -17.92}, rotationY: Math.PI, assetId: 'south-upanishad-sama-veda-manuscript', mediaWidth: 3.58, mediaHeight: 1.006875, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.verdigris}),
  layout({id: 'south-ibadat-khana-plurality', parentExhibitId: 'indian-philosophy', zoneId: 'south-orientation-many-schools', position: {x: -5.55, z: -27.38}, rotationY: 0, assetId: 'south-ibadat-khana-debate', mediaWidth: 1.82015625, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.madder}),
  layout({id: 'south-nalanda-learning-network', parentExhibitId: 'indian-philosophy', zoneId: 'south-orientation-many-schools', position: {x: 5.55, z: -27.38}, rotationY: 0, assetId: 'south-nalanda-learning-courtyard', mediaWidth: 3.472765073, mediaHeight: 2.61, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.verdigris}),
  layout({id: 'south-ashoka-public-dhamma', parentExhibitId: 'indian-philosophy', zoneId: 'south-orientation-many-schools', position: {x: 5.55, z: -17.92}, rotationY: Math.PI, assetId: 'south-ashoka-lion-capital', mediaWidth: 1.85109375, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'mahavira-kalpasutra-transmission', parentExhibitId: 'mahavira', zoneId: 'south-jain-worlds', position: {x: -5.55, z: -6.72}, rotationY: Math.PI, assetId: 'mahavira-kalpasutra-birth', mediaWidth: 2.4629375, mediaHeight: 3.14, installationKind: 'south-asian-work', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.madder}),
  layout({id: 'jain-jambudvipa-moral-geography', parentExhibitId: 'jainism', zoneId: 'south-jain-worlds', position: {x: -5.55, z: -15.68}, rotationY: 0, assetId: 'jain-jambudvipa-cosmological-map', mediaWidth: 3.473366834, mediaHeight: 3.24, installationKind: 'south-asian-concept', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'jain-samavasarana-open-assembly', parentExhibitId: 'jainism', zoneId: 'south-jain-worlds', position: {x: 5.55, z: -15.68}, rotationY: 0, assetId: 'jain-samavasarana-peaceful-assembly', mediaWidth: 3.25359375, mediaHeight: 3.3, installationKind: 'south-asian-concept', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.verdigris}),
  layout({id: 'jain-tirthankara-stillness', parentExhibitId: 'jainism', zoneId: 'south-jain-worlds', position: {x: 5.55, z: -6.72}, rotationY: Math.PI, assetId: 'jain-tirthankara-mathura-red-sandstone', mediaWidth: 2.20171875, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.indigo}),
  layout({id: 'kanada-atomism-dyads', parentExhibitId: 'kanada', zoneId: 'south-categories-realism', position: {x: -5.55, z: 4.48}, rotationY: Math.PI, assetId: 'kanada-atomic-theory-illustration', mediaWidth: 3.413333333, mediaHeight: 2, installationKind: 'south-asian-concept', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'vaiseshika-pramana', parentExhibitId: 'kanada', zoneId: 'south-categories-realism', position: {x: 10.85, z: 0}, rotationY: -Math.PI / 2, assetId: 'vaiseshika-two-pramana', mediaWidth: 1.91728125, mediaHeight: 3.06, installationKind: 'south-asian-concept', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.indigo}),
  layout({id: 'nyaya-argument-before-authority', parentExhibitId: 'kanada', zoneId: 'south-categories-realism', position: {x: -5.55, z: -4.48}, rotationY: 0, assetId: 'nyaya-two-scholars-quarreling', mediaWidth: 1.9903125, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.madder}),
  layout({id: 'nyaya-spitzer-philosophy-fragments', parentExhibitId: 'kanada', zoneId: 'south-categories-realism', position: {x: 5.55, z: -4.48}, rotationY: 0, assetId: 'nyaya-spitzer-philosophical-fragments', mediaWidth: 3.559550562, mediaHeight: 1.98, installationKind: 'south-asian-work', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.verdigris}),
  layout({id: 'nyaya-smoke-fire-inference', parentExhibitId: 'kanada', zoneId: 'south-categories-realism', position: {x: 5.55, z: 4.48}, rotationY: Math.PI, assetId: 'nyaya-smoke-fire-inference', mediaWidth: 3.486282306, mediaHeight: 2.74, installationKind: 'south-asian-concept', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'patanjali-yogasutra-manuscript', parentExhibitId: 'patanjali', zoneId: 'south-yoga-mind-liberation', position: {x: -5.55, z: 15.68}, rotationY: Math.PI, assetId: 'patanjali-yoga-sutra-manuscript', mediaWidth: 3.194454073, mediaHeight: 2.88, installationKind: 'south-asian-work', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.verdigris}),
  layout({id: 'patanjali-samkhya-yoga-pramana', parentExhibitId: 'patanjali', zoneId: 'south-yoga-mind-liberation', position: {x: 10.85, z: 11.2}, rotationY: -Math.PI / 2, assetId: 'samkhya-yoga-three-pramana', mediaWidth: 1.91728125, mediaHeight: 3.06, installationKind: 'south-asian-concept', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.indigo}),
  layout({id: 'yoga-six-yogis-banyan', parentExhibitId: 'patanjali', zoneId: 'south-yoga-mind-liberation', position: {x: -5.55, z: 6.72}, rotationY: 0, assetId: 'yoga-six-yogis-banyan', mediaWidth: 2.36671875, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'yoga-posture-inner-heat', parentExhibitId: 'patanjali', zoneId: 'south-yoga-mind-liberation', position: {x: 5.55, z: 6.72}, rotationY: 0, assetId: 'yoga-ascetic-shaiva-deity', mediaWidth: 2.1759375, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.madder}),
  layout({id: 'yoga-asavari-ascetic-princess', parentExhibitId: 'patanjali', zoneId: 'south-yoga-mind-liberation', position: {x: 5.55, z: 15.68}, rotationY: Math.PI, assetId: 'yoga-asavari-ascetic-princess', mediaWidth: 2.34609375, mediaHeight: 3.3, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.verdigris}),
  layout({id: 'shankara-aitareya-bhasya', parentExhibitId: 'shankara', zoneId: 'south-vedanta-rival-readings', position: {x: -5.55, z: 27.38}, rotationY: Math.PI, assetId: 'shankara-aitareya-bhasya-1593', mediaWidth: 3.44, mediaHeight: 2.58, installationKind: 'south-asian-work', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.saffron}),
  layout({id: 'madhva-udupi-matha', parentExhibitId: 'madhva', zoneId: 'south-vedanta-rival-readings', position: {x: 5.55, z: 27.38}, rotationY: Math.PI, assetId: 'madhva-udupi-krishna-matha', mediaWidth: 3.2, mediaHeight: 2.4, installationKind: 'south-asian-context', accent: CLASSICAL_SOUTH_ASIAN_PALETTE.madder}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getClassicalSouthAsianSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 07 supplemental exhibit ${id} is missing.`);
  return record;
};
