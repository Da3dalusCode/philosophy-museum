import type {MuseumZoneId} from '../museumCatalog';
import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {
  MuseumMediaMountDefinition,
  MuseumPoint,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from './museumWorldTypes';

export const CORE_QUESTIONS_FORUM_GALLERY_ID = 'core-questions-forum' as const;

export const CORE_QUESTIONS_FORUM_PHYSICAL_LENS_IDS = [
  'forum-mulla-sadra-existence',
  'forum-dignaga-pramana',
  'forum-mozi-standards',
  'forum-avicenna-demonstration',
  'forum-confucius-cultivation',
  'forum-mencius-humane-rule',
  'forum-al-farabi-virtuous-city',
  'forum-maimonides-law',
  'forum-confucian-music',
  'forum-al-ghazali-causation',
] as const satisfies readonly MuseumSupplementalExhibitId[];

const FORUM_PALETTE = Object.freeze({
  bronze: '#9b7646',
  saffron: '#b6803c',
  indigo: '#586a87',
  cinnabar: '#9b5144',
  jade: '#4d766c',
});

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
  const y = height > 2.6 ? 1.52 : 1.66;
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
    bounds: volume(
      `${id}-media-bounds`,
      {x: 0, y, z: -.39},
      {width: width + .18, height: height + .18, depth: .2},
    ),
    supportBounds: volume(
      `${id}-media-support`,
      {x: 0, y, z: -.55},
      {width: width * .74, height: height * .74, depth: .18},
    ),
  };
};

const cameraFor = (position: MuseumPoint, rotationY: number, distance = 2.9): MuseumPoint => ({
  x: position.x + Math.sin(rotationY) * distance,
  z: position.z + Math.cos(rotationY) * distance,
});

const layout = ({
  id,
  parentExhibitId,
  guidedAfterExhibitId,
  zoneId,
  position,
  rotationY,
  assetId,
  mediaWidth,
  mediaHeight,
  accent,
  footprintWidth = 3.42,
}: {
  id: MuseumSupplementalExhibitId;
  parentExhibitId: MuseumSupplementalExhibitLayout['parentExhibitId'];
  guidedAfterExhibitId?: MuseumSupplementalExhibitLayout['guidedAfterExhibitId'];
  zoneId: MuseumZoneId;
  position: MuseumPoint;
  rotationY: number;
  assetId: MuseumAssetId;
  mediaWidth: number;
  mediaHeight: number;
  accent: string;
  footprintWidth?: number;
}): MuseumSupplementalExhibitLayout => {
  const width = footprintWidth;
  const height = 3.58;
  return {
    id,
    parentExhibitId,
    ...(guidedAfterExhibitId ? {guidedAfterExhibitId} : {}),
    zoneId,
    spatialCellId: zoneId,
    position,
    rotationY,
    interactionRadius: 3.25,
    collider: {
      id: `supplemental:${id}`,
      center: position,
      size: {width, depth: .96},
      rotation: rotationY,
    },
    viewpoint: {...cameraFor(position, rotationY), yaw: rotationY, pitch: -.045},
    assetId,
    mediaMount: mediaMount(id, assetId, mediaWidth, mediaHeight),
    label: {position: [0, 3.25, -.3], width: 3.12, height: .62},
    footprint: {width, height, depth: .96},
    installationKind: 'forum-comparative-lens',
    accent,
  };
};

const presentation = (
  proximityKicker: string,
  factRows: readonly {label: string; value: string}[],
  articleActionLabel: string,
) => ({
  panelKicker: 'Core Questions Forum · comparative lens',
  proximityKicker,
  factRows,
  articleActionLabel,
  entityKind: 'philosopher' as const,
  keyIdeasLabel: 'Comparative anchors',
  cautionsLabel: 'Keep the route honest',
});

export const CORE_QUESTIONS_FORUM_SUPPLEMENTAL_EXHIBITS = [
  {
    id: 'forum-mulla-sadra-existence',
    displayName: 'Mulla Sadra: Existence and Substantial Motion',
    shortTitle: 'Mulla Sadra: Existence and Change',
    workLabel: 'REALITY · SAFAVID ISLAMIC PHILOSOPHY',
    dateLabel: 'Mulla Sadra’s handwritten miscellany · 1595',
    question: 'What if existence is primary and substances themselves undergo real transformation?',
    frontSubtitle: 'Primacy of existence, gradation, motion, and post-Avicennian debate',
    lead: 'Mulla Sadra’s metaphysics gives priority to existence over fixed essences and treats change as reaching into a thing’s substantial being. This Forum lens routes a modern question about reality into a Safavid Islamic synthesis of Avicennian, Illuminationist, theological, and mystical debates.',
    keyIdeas: [
      'Existence is primary while essences mark conceptual determinations.',
      'Existence admits degrees rather than forming one flat category.',
      'Substantial motion makes transformation internal to material being.',
    ],
    cautions: [
      'Do not detach the view from its post-Avicennian Islamic setting.',
      'The manuscript page is a material witness, not a diagram of the system.',
    ],
    sections: [
      {
        heading: 'A route beyond static substance',
        paragraphs: ['Mulla Sadra argues that change can concern what a thing is becoming, not only its accidental features. His account joins ontology, cosmology, psychology, and a theory of the soul’s development.'],
      },
      {
        heading: 'Synthesis does not erase disagreement',
        paragraphs: ['His project transforms inherited materials rather than merely combining them. Avicennian distinctions, Illuminationist themes, Qurʾanic interpretation, and mystical philosophy remain active points of argument.'],
      },
    ],
    sources: [
      {label: 'Wikimedia Commons — Mulla Sadra’s Miscellany', url: 'https://commons.wikimedia.org/wiki/File:Molla_Sadra%E2%80%99s_Miscellany_WDL10609.pdf', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Mulla Sadra', url: 'https://plato.stanford.edu/entries/mulla-sadra/', kind: 'academic-reference'},
    ],
    assetId: 'forum-mulla-sadra-miscellany',
    panelAssetId: 'forum-mulla-sadra-miscellany',
    articleRoute: {kind: 'philosopher', philosopherId: 'mulla-sadra'},
    presentation: presentation('Reality through a Safavid Islamic lens', [
      {label: 'Figure', value: 'Mulla Sadra'},
      {label: 'Setting', value: 'Safavid Islamic philosophy'},
      {label: 'Route', value: 'Existence and substantial motion'},
    ], 'Open Mulla Sadra in the Atlas'),
  },
  {
    id: 'forum-dignaga-pramana',
    displayName: 'Dignāga: Perception, Inference, and Pramāṇa',
    shortTitle: 'Dignāga: Reliable Cognition',
    workLabel: 'KNOWLEDGE · BUDDHIST PRAMĀṆA',
    dateLabel: 'Modern commemorative portrait · photographed 2011',
    question: 'Which forms of cognition can count as reliable, and what does each disclose?',
    frontSubtitle: 'Perception, inference, conceptual exclusion, and disciplined debate',
    lead: 'Dignāga helped reorganize Buddhist inquiry around perception and inference as two sources of knowledge. His account links epistemology, logic, and language within arguments directed toward both Buddhist and non-Buddhist interlocutors.',
    keyIdeas: [
      'Perception and inference have different objects and cognitive roles.',
      'Inference depends on disciplined relations among reasons and conclusions.',
      'Conceptual meaning is analyzed through exclusion rather than fixed universals.',
    ],
    cautions: [
      'Pramāṇa is not simply a Buddhist copy of modern Western epistemology.',
      'The image is a modern imagined portrait, not a historical likeness.',
    ],
    sections: [
      {
        heading: 'Two sources, two tasks',
        paragraphs: ['Perception presents particulars without the same conceptual structure used by inference. Inference works through signs, reasons, and generalization, making the boundary between the two a central philosophical problem.'],
      },
      {
        heading: 'Knowledge within a debate tradition',
        paragraphs: ['Dignāga’s project belongs to South Asian inter-school argument and Buddhist soteriological aims. Its techniques can travel comparatively without losing that historical setting.'],
      },
    ],
    sources: [
      {label: 'Wikimedia Commons — modern Dignāga portrait', url: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Dignagacharyudu.JPG', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Epistemology in Classical Indian Philosophy', url: 'https://plato.stanford.edu/entries/epistemology-india/', kind: 'academic-reference'},
    ],
    assetId: 'forum-dignaga-commemorative-portrait',
    panelAssetId: 'forum-dignaga-commemorative-portrait',
    articleRoute: {kind: 'philosopher', philosopherId: 'dignaga'},
    presentation: presentation('Knowledge through Buddhist pramāṇa', [
      {label: 'Figure', value: 'Dignāga'},
      {label: 'Sources', value: 'Perception and inference'},
      {label: 'Context', value: 'South Asian Buddhist debate'},
    ], 'Open Dignāga in the Atlas'),
  },
  {
    id: 'forum-mozi-standards',
    displayName: 'Mozi and Mohist Standards of Argument',
    shortTitle: 'Mozi: Standards and Distinctions',
    workLabel: 'LOGIC & LANGUAGE · MOHIST ARGUMENT',
    dateLabel: 'Modern conventional portrait · 2021',
    question: 'How do standards, distinctions, and practical consequences guide good argument?',
    frontSubtitle: 'Models, names, distinctions, public reasons, and later Mohist analysis',
    lead: 'Texts associated with Mozi and later Mohists investigate how names, distinctions, standards, and consequences can discipline argument and action. This Chinese route resists treating logic as cultureless or as the property of one historical lineage.',
    keyIdeas: [
      'Public standards help compare claims and practices.',
      'Names and distinctions must answer to how things are sorted and used.',
      'Later Mohist Canons develop technical analyses beyond Mozi’s own core writings.',
    ],
    cautions: [
      'Do not attribute every later Mohist technical doctrine directly to Mozi.',
      'The portrait is a twenty-first-century imagined likeness.',
    ],
    sections: [
      {
        heading: 'Standards connect words and action',
        paragraphs: ['Mohist argument often tests proposals by precedents, evidence available to ordinary people, and consequences for social order. Reasoning is therefore joined to administration, ethics, and opposition to partial privilege.'],
      },
      {
        heading: 'A wider history of logic',
        paragraphs: ['Later Mohist texts analyze names, kinds, sameness, difference, and valid reasons in a distinctive vocabulary. Comparison can reveal shared problems without forcing that vocabulary into Greek or modern logical categories.'],
      },
    ],
    sources: [
      {label: 'Wikimedia Commons — modern conventional portrait of Mozi', url: 'https://commons.wikimedia.org/wiki/File:%D0%A4%D0%B8%D0%BB%D0%BE%D1%81%D0%BE%D1%84_%D0%9C%D0%BE-%D0%A6%D0%B7%D1%8B.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Mohism', url: 'https://plato.stanford.edu/entries/mohism/', kind: 'academic-reference'},
    ],
    assetId: 'forum-mozi-conventional-portrait',
    panelAssetId: 'forum-mozi-conventional-portrait',
    articleRoute: {kind: 'philosopher', philosopherId: 'mozi'},
    presentation: presentation('Logic through a Mohist lens', [
      {label: 'Figure', value: 'Mozi and later Mohists'},
      {label: 'Tools', value: 'Standards, names, distinctions'},
      {label: 'Setting', value: 'Warring States China'},
    ], 'Open Mozi in the Atlas'),
  },
  {
    id: 'forum-avicenna-demonstration',
    displayName: 'Avicenna: Demonstration and Natural Inquiry',
    shortTitle: 'Avicenna: Demonstration and Science',
    workLabel: 'SCIENCE · AVICENNIAN METHOD',
    dateLabel: 'Canon of Medicine manuscript · copied 1597–1598',
    question: 'How should demonstration organize knowledge of causes, nature, and medicine?',
    frontSubtitle: 'Logic, proof, natural philosophy, medicine, and classified sciences',
    lead: 'Avicenna treats logic as an instrument for demonstrative knowledge while developing natural philosophy and medicine within a systematic account of the sciences. The illuminated Canon makes one influential strand visible without reducing his philosophical method to medical practice alone.',
    keyIdeas: [
      'Demonstration aims at explained knowledge, not mere successful prediction.',
      'Logic orders concepts, propositions, and proofs across sciences.',
      'Medicine and natural philosophy are connected but distinct inquiries.',
    ],
    cautions: [
      'The manuscript was copied centuries after Avicenna and is not an autograph.',
      'Do not collapse medieval natural philosophy into modern experimental science.',
    ],
    sections: [
      {
        heading: 'Why causes matter',
        paragraphs: ['For Avicenna, a demonstration can show not only that something is so but why it is so when its premises capture the relevant cause. That ideal shapes his organization of scientific knowledge.'],
      },
      {
        heading: 'A system crosses disciplines',
        paragraphs: ['Avicennian logic, psychology, medicine, and natural philosophy form related projects without becoming one undifferentiated science. Their later Arabic, Hebrew, and Latin receptions transformed the system further.'],
      },
    ],
    sources: [
      {label: 'Wikimedia Commons — Avicenna’s Canon, 1597–1598 copy', url: 'https://commons.wikimedia.org/wiki/File:Avicenna_canon_1597.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Ibn Sina’s Natural Philosophy', url: 'https://plato.stanford.edu/entries/ibn-sina-natural/', kind: 'academic-reference'},
    ],
    assetId: 'forum-avicenna-canon-1597',
    panelAssetId: 'forum-avicenna-canon-1597',
    articleRoute: {kind: 'philosopher', philosopherId: 'avicenna'},
    presentation: presentation('Science through an Avicennian lens', [
      {label: 'Figure', value: 'Ibn Sina / Avicenna'},
      {label: 'Method', value: 'Logic and demonstration'},
      {label: 'Setting', value: 'Arabic and Islamic philosophy'},
    ], 'Open Avicenna in the Atlas'),
  },
  {
    id: 'forum-confucius-cultivation',
    displayName: 'Confucius: Ritual, Humaneness, and Cultivation',
    shortTitle: 'Confucius: Ethical Cultivation',
    workLabel: 'ETHICS · CLASSICAL CONFUCIAN TRADITIONS',
    dateLabel: 'Ming-dynasty teaching image · later reception',
    question: 'How can ritual practice form judgment, relationship, and humane conduct?',
    frontSubtitle: 'Ritual, humaneness, learning, relationship, and responsive balance',
    lead: 'The Analects presents ethical life through learning, ritual practice, relationship, and humaneness rather than a single abstract decision procedure. A later image of the tilting vessel turns balance into a teaching scene while remaining evidence of reception, not biography.',
    keyIdeas: [
      'Cultivation joins repeated practice to increasingly responsive judgment.',
      'Humaneness is expressed within concrete relationships.',
      'Ritual can educate feeling and attention, not only enforce conformity.',
    ],
    cautions: [
      'Do not translate Confucian cultivation into one modern ethical theory.',
      'The Ming image is not a lifetime portrait or documentary scene.',
    ],
    sections: [
      {
        heading: 'Character grows through practice',
        paragraphs: ['Ritual forms posture, speech, attention, and expectations within social life. Its ethical value depends on humane responsiveness rather than mechanical performance alone.'],
      },
      {
        heading: 'Balance is relational',
        paragraphs: ['The tilting-vessel story stages a lesson about excess, deficiency, and fitting measure. Later tradition uses the object to visualize an ethical pedagogy grounded in observation and dialogue.'],
      },
    ],
    sources: [
      {label: 'Wikimedia Commons — Confucius Watching the Tilting Containers', url: 'https://commons.wikimedia.org/wiki/File:Confucius_qiqi.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Confucius', url: 'https://plato.stanford.edu/entries/confucius/', kind: 'academic-reference'},
    ],
    assetId: 'forum-confucius-tilting-vessel',
    panelAssetId: 'forum-confucius-tilting-vessel',
    articleRoute: {kind: 'philosopher', philosopherId: 'confucius'},
    presentation: presentation('Ethics through a Confucian lens', [
      {label: 'Figure', value: 'Confucius'},
      {label: 'Practice', value: 'Ritual and learning'},
      {label: 'Aim', value: 'Humane responsiveness'},
    ], 'Open Confucius in the Atlas'),
  },
  {
    id: 'forum-mencius-humane-rule',
    displayName: 'Mencius: Moral Sprouts and Humane Rule',
    shortTitle: 'Mencius: Cultivation and Humane Rule',
    workLabel: 'ETHICS · HUMAN NATURE AND POLITICS',
    dateLabel: 'Later illustrated Mencius tradition · 16th–17th century image',
    question: 'How do nascent moral capacities become character and responsible government?',
    frontSubtitle: 'Moral sprouts, environment, education, compassion, and political duty',
    lead: 'Mencius argues that human beings have incipient moral responses that can grow through attention, education, and supportive conditions. He joins this account of cultivation to a political demand: rulers who destroy the people’s livelihood also damage the conditions for ethical life.',
    keyIdeas: [
      'Moral sprouts are beginnings that require cultivation, not finished virtues.',
      'Environment and material security affect ethical development.',
      'Humane rule is judged by how political power sustains the people.',
    ],
    cautions: [
      'The “three moves” image illustrates a later educational legend.',
      'Mencius’s claim about human nature is contested within Confucian traditions.',
    ],
    sections: [
      {
        heading: 'Potential is not completion',
        paragraphs: ['Compassion, shame, deference, and judgment can begin as fragile responses. Cultivation extends them rather than replacing them with rules imposed from outside.'],
      },
      {
        heading: 'Ethics reaches government',
        paragraphs: ['Mencian political argument connects stable livelihood, humane institutions, and moral agency. A ruler’s legitimacy is therefore answerable to the lived conditions of the population.'],
      },
    ],
    sources: [
      {label: 'Wikimedia Commons — Illustrations of Mencius', url: 'https://commons.wikimedia.org/wiki/File:San_Qian_Ze_Li,_Illustrations_of_Mencius.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Mencius', url: 'https://plato.stanford.edu/entries/mencius/', kind: 'academic-reference'},
    ],
    assetId: 'forum-mencius-three-moves',
    panelAssetId: 'forum-mencius-three-moves',
    articleRoute: {kind: 'philosopher', philosopherId: 'mencius'},
    presentation: presentation('Ethics through a Mencian lens', [
      {label: 'Figure', value: 'Mencius'},
      {label: 'Claim', value: 'Moral beginnings need cultivation'},
      {label: 'Political test', value: 'Humane rule'},
    ], 'Open Mencius in the Atlas'),
  },
  {
    id: 'forum-al-farabi-virtuous-city',
    displayName: 'Al-Farabi: Knowledge and the Virtuous City',
    shortTitle: 'Al-Farabi: The Virtuous City',
    workLabel: 'POLITICAL LIFE · ISLAMIC FALSAFA',
    dateLabel: 'Historical reconstruction of Abbasid Baghdad · 1900',
    question: 'What knowledge and cooperation would orient a city toward genuine flourishing?',
    frontSubtitle: 'Civic order, leadership, education, shared ends, and human perfection',
    lead: 'Al-Farabi connects political order to a larger account of knowledge, human capacities, and flourishing. His virtuous city is not the Round City of Baghdad, but Baghdad’s reconstructed plan supplies material context for the intellectual world in which he studied and wrote.',
    keyIdeas: [
      'Political association coordinates different capacities toward shared ends.',
      'Education and leadership shape what a community understands as good.',
      'The virtuous city belongs to an Islamic transformation of Greek inheritances.',
    ],
    cautions: [
      'The 1900 plan is not al-Farabi’s diagram of the virtuous city.',
      'Do not reduce his political philosophy to a blueprint for one regime.',
    ],
    sections: [
      {
        heading: 'A city has an intellectual purpose',
        paragraphs: ['Al-Farabi asks how forms of knowledge, persuasion, law, and leadership can orient diverse citizens toward flourishing. Political philosophy therefore reaches into psychology, epistemology, and religion.'],
      },
      {
        heading: 'Inheritance becomes reconstruction',
        paragraphs: ['His engagement with Plato and Aristotle occurs in Arabic and Islamic intellectual institutions with their own disputes and aims. The result is neither a copy of the polis nor a simple description of Abbasid rule.'],
      },
    ],
    sources: [
      {label: 'Wikimedia Commons — Round City of Baghdad reconstruction', url: 'https://commons.wikimedia.org/wiki/File:Round_City_in_the_Time_of_Mansur_(Le_Strange).png', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Al-Farabi', url: 'https://plato.stanford.edu/entries/al-farabi/', kind: 'academic-reference'},
    ],
    assetId: 'forum-al-farabi-round-city',
    panelAssetId: 'forum-al-farabi-round-city',
    articleRoute: {kind: 'philosopher', philosopherId: 'al-farabi'},
    presentation: presentation('Political life through Islamic falsafa', [
      {label: 'Figure', value: 'Al-Farabi'},
      {label: 'Question', value: 'What makes a city virtuous?'},
      {label: 'Context', value: 'Abbasid intellectual worlds'},
    ], 'Open Al-Farabi in the Atlas'),
  },
  {
    id: 'forum-maimonides-law',
    displayName: 'Maimonides: Law, Authority, and Interpretation',
    shortTitle: 'Maimonides: Law and Interpretation',
    workLabel: 'POLITICAL LIFE · MEDIEVAL JEWISH PHILOSOPHY',
    dateLabel: 'Illuminated Mishneh Torah · c. 1457–1465',
    question: 'How can law organize communal life while remaining a field of reasoning and interpretation?',
    frontSubtitle: 'Codification, practice, authority, interpretation, and intellectual formation',
    lead: 'Maimonides’s Mishneh Torah systematically organizes Jewish law for study and practice. Read alongside his philosophical works, the code opens questions about authority, education, communal order, and the relation between law’s public form and intellectual perfection.',
    keyIdeas: [
      'Codification reorganizes inherited legal discussion into an accessible system.',
      'Law shapes practices, institutions, and habits as well as judgments.',
      'Maimonides writes within Jewish life and an Arabic-speaking philosophical world.',
    ],
    cautions: [
      'The illuminated manuscript was produced centuries after Maimonides.',
      'His legal and philosophical works should be related without collapsing their genres.',
    ],
    sections: [
      {
        heading: 'System is itself an intervention',
        paragraphs: ['The Mishneh Torah’s structure changes how a reader encounters a large legal tradition. Organization, clarity, and scope are intellectual and political choices, not neutral containers.'],
      },
      {
        heading: 'Authority remains interpretive',
        paragraphs: ['A code can guide communal practice while generating disputes about sources, method, and jurisdiction. Maimonides’s project belongs to that continuing legal conversation.'],
      },
    ],
    sources: [
      {label: 'Wikimedia Commons — illuminated Mishneh Torah', url: 'https://commons.wikimedia.org/wiki/File:Mishneh_Torah_(Books_7_to_14)_by_Maimonides_-_Google_Art_Project.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Maimonides', url: 'https://plato.stanford.edu/entries/maimonides/', kind: 'academic-reference'},
    ],
    assetId: 'forum-maimonides-mishneh-torah',
    panelAssetId: 'forum-maimonides-mishneh-torah',
    articleRoute: {kind: 'philosopher', philosopherId: 'maimonides'},
    presentation: presentation('Political life through medieval Jewish philosophy', [
      {label: 'Figure', value: 'Maimonides'},
      {label: 'Work', value: 'Mishneh Torah'},
      {label: 'Route', value: 'Law, authority, interpretation'},
    ], 'Open Maimonides in the Atlas'),
  },
  {
    id: 'forum-confucian-music',
    displayName: 'Confucian Music: Ritual Sound and Cultivation',
    shortTitle: 'Confucian Music and Cultivation',
    workLabel: 'AESTHETICS · RITUAL AND MUSIC',
    dateLabel: 'Bells from the tomb of Marquis Yi of Zeng · 5th century BCE',
    question: 'How can patterned sound educate emotion, conduct, and shared life?',
    frontSubtitle: 'Rhythm, ceremony, trained feeling, coordinated action, and political order',
    lead: 'Classical Confucian traditions often join music to ritual as a formative practice rather than treating it as autonomous art. The bells of Marquis Yi make tuned sound, coordinated performance, rank, and ceremony materially visible within the wider world of Warring States China.',
    keyIdeas: [
      'Music can train emotion and attention through embodied repetition.',
      'Ritual and music coordinate persons without making them identical.',
      'Aesthetic form can have ethical and political consequences.',
    ],
    cautions: [
      'These bells are contextual objects, not instruments known to Confucius.',
      'Confucian traditions disagree about music, ritual, spontaneity, and control.',
    ],
    sections: [
      {
        heading: 'Beauty is not isolated from practice',
        paragraphs: ['Sound unfolds through bodies, timing, instruments, spaces, and social roles. Confucian reflection can therefore treat musical order as both an aesthetic achievement and a mode of cultivation.'],
      },
      {
        heading: 'Harmony is structured difference',
        paragraphs: ['An ensemble coordinates distinct tones rather than erasing them. The comparison between musical and social harmony is powerful, but it also raises questions about hierarchy, conformity, and whose voices set the pattern.'],
      },
    ],
    sources: [
      {label: 'Wikimedia Commons — set-bells of Marquis Yi of Zeng', url: 'https://commons.wikimedia.org/wiki/File:Two_Tone_Set-bells_of_Marquis_Yi_of_Zeng_(10166271244).jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Confucius', url: 'https://plato.stanford.edu/entries/confucius/', kind: 'academic-reference'},
    ],
    assetId: 'forum-confucian-marquis-yi-bells',
    panelAssetId: 'forum-confucian-marquis-yi-bells',
    articleRoute: {kind: 'philosopher', philosopherId: 'confucius'},
    presentation: presentation('Aesthetics through Confucian cultivation', [
      {label: 'Material lens', value: 'Set-bells of Marquis Yi'},
      {label: 'Practice', value: 'Ritual and music'},
      {label: 'Question', value: 'How does form cultivate?'},
    ], 'Open Confucius in the Atlas'),
  },
  {
    id: 'forum-al-ghazali-causation',
    displayName: 'Al-Ghazali: Causation, Reason, and Revelation',
    shortTitle: 'Al-Ghazali: Causation and Critique',
    workLabel: 'RELIGION · KALĀM AND PHILOSOPHICAL RECEPTION',
    dateLabel: 'Faysal al-Tafriqa manuscript · later copy',
    question: 'What can reason establish about causal order, and where must philosophical claims be criticized?',
    frontSubtitle: 'Causal necessity, divine action, interpretation, critique, and appropriation',
    lead: 'Al-Ghazali mastered the philosophers’ methods before criticizing selected metaphysical claims, including accounts of causal necessity. His work brought Avicennian concepts into kalām even as it contested their limits, making the relation between reason and revelation one of appropriation as well as critique.',
    keyIdeas: [
      'Regular succession does not by itself prove necessary causal connection.',
      'Divine agency and created order can be described in more than one way.',
      'Critique of particular doctrines is not a rejection of all logic or philosophy.',
    ],
    cautions: [
      'Do not reduce al-Ghazali to the slogan that fire never burns cotton.',
      'The Faysal manuscript concerns interpretation and belief, not only causation.',
    ],
    sections: [
      {
        heading: 'Necessity is the target',
        paragraphs: ['Al-Ghazali challenges the claim that observed causes produce their effects through an independently necessary power. The critique leaves open difficult interpretations of created regularity, divine action, and secondary causation.'],
      },
      {
        heading: 'Reason works inside religious inquiry',
        paragraphs: ['His legal, theological, ethical, and spiritual writings use argument for different purposes. Faysal al-Tafriqa shows that interpretation and the boundaries of judgment are as important to his project as refuting the philosophers.'],
      },
    ],
    sources: [
      {label: 'Wikimedia Commons — Faysal al-Tafriqa manuscript', url: 'https://commons.wikimedia.org/wiki/File:Faysal_manuscript.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Al-Ghazali', url: 'https://plato.stanford.edu/entries/al-ghazali/', kind: 'academic-reference'},
    ],
    assetId: 'forum-al-ghazali-faysal-manuscript',
    panelAssetId: 'forum-al-ghazali-faysal-manuscript',
    articleRoute: {kind: 'philosopher', philosopherId: 'al-ghazali'},
    presentation: presentation('Religion through Islamic kalām', [
      {label: 'Figure', value: 'Al-Ghazali'},
      {label: 'Problem', value: 'Causal necessity'},
      {label: 'Route', value: 'Reason, revelation, critique'},
    ], 'Open Al-Ghazali in the Atlas'),
  },
] as const satisfies readonly MuseumSupplementalExhibit[];

export const CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS = [
  layout({
    id: 'forum-mulla-sadra-existence',
    parentExhibitId: 'metaphysics',
    zoneId: 'core-reality-being',
    position: {x: -11.33, z: -5.82},
    rotationY: Math.PI,
    assetId: 'forum-mulla-sadra-miscellany',
    mediaWidth: 1.71,
    mediaHeight: 2.88,
    accent: FORUM_PALETTE.saffron,
  }),
  layout({
    id: 'forum-dignaga-pramana',
    parentExhibitId: 'epistemology',
    zoneId: 'core-knowledge',
    position: {x: 3.853, z: -11.33},
    rotationY: -Math.PI / 2,
    assetId: 'forum-dignaga-commemorative-portrait',
    mediaWidth: 2.16,
    mediaHeight: 2.88,
    accent: FORUM_PALETTE.indigo,
  }),
  layout({
    id: 'forum-mozi-standards',
    parentExhibitId: 'logic',
    zoneId: 'core-logic-language',
    position: {x: -7, z: 2},
    rotationY: Math.PI,
    assetId: 'forum-mozi-conventional-portrait',
    mediaWidth: 2.88,
    mediaHeight: 2.88,
    accent: FORUM_PALETTE.jade,
  }),
  layout({
    id: 'forum-avicenna-demonstration',
    parentExhibitId: 'philosophy-of-science',
    zoneId: 'core-science',
    position: {x: 8.095, z: 1.12},
    rotationY: Math.PI,
    assetId: 'forum-avicenna-canon-1597',
    mediaWidth: 2.03,
    mediaHeight: 2.88,
    accent: FORUM_PALETTE.saffron,
    footprintWidth: 3.24,
  }),
  layout({
    id: 'forum-confucius-cultivation',
    parentExhibitId: 'political-philosophy',
    guidedAfterExhibitId: 'kuhn',
    zoneId: 'core-ethics-portal',
    position: {x: -11.33, z: 5.82},
    rotationY: 0,
    assetId: 'forum-confucius-tilting-vessel',
    mediaWidth: 1.7,
    mediaHeight: 2.88,
    accent: FORUM_PALETTE.cinnabar,
  }),
  layout({
    id: 'forum-mencius-humane-rule',
    parentExhibitId: 'political-philosophy',
    guidedAfterExhibitId: 'kuhn',
    zoneId: 'core-ethics-portal',
    position: {x: -12.8, z: 10.3},
    rotationY: Math.PI / 2,
    assetId: 'forum-mencius-three-moves',
    mediaWidth: 1.82,
    mediaHeight: 2.88,
    accent: FORUM_PALETTE.cinnabar,
  }),
  layout({
    id: 'forum-al-farabi-virtuous-city',
    parentExhibitId: 'political-philosophy',
    guidedAfterExhibitId: 'kuhn',
    zoneId: 'core-political-portal',
    position: {x: -3.853, z: 11.33},
    rotationY: Math.PI / 2,
    assetId: 'forum-al-farabi-round-city',
    mediaWidth: 3.18,
    mediaHeight: 2.17,
    accent: FORUM_PALETTE.bronze,
  }),
  layout({
    id: 'forum-maimonides-law',
    parentExhibitId: 'political-philosophy',
    guidedAfterExhibitId: 'kuhn',
    zoneId: 'core-political-portal',
    position: {x: 3.853, z: 11.33},
    rotationY: -Math.PI / 2,
    assetId: 'forum-maimonides-mishneh-torah',
    mediaWidth: 3.18,
    mediaHeight: 1.95,
    accent: FORUM_PALETTE.indigo,
  }),
  layout({
    id: 'forum-confucian-music',
    parentExhibitId: 'aesthetics',
    zoneId: 'core-aesthetics',
    position: {x: 2.45, z: 2.55},
    rotationY: Math.PI,
    assetId: 'forum-confucian-marquis-yi-bells',
    mediaWidth: 3.18,
    mediaHeight: 2.12,
    accent: FORUM_PALETTE.jade,
  }),
  layout({
    id: 'forum-al-ghazali-causation',
    parentExhibitId: 'philosophy-of-religion',
    zoneId: 'core-religion',
    position: {x: 9.33, z: 12.85},
    rotationY: Math.PI,
    assetId: 'forum-al-ghazali-faysal-manuscript',
    mediaWidth: 3.18,
    mediaHeight: 2.2,
    accent: FORUM_PALETTE.saffron,
  }),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];
