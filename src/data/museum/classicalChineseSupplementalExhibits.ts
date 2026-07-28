import type {MuseumAssetId} from './museumAssetTypes';
import {
  CLASSICAL_CHINESE_GALLERY_ID,
  CLASSICAL_CHINESE_ROOM_SIGN_COPY,
  getClassicalChineseInstallationSlot,
} from './classicalChineseGalleryCuration';
import {CLASSICAL_CHINESE_WALL_FILL_EXHIBITS} from './classicalChineseWallFillExhibits';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {
  MuseumMediaMountDefinition,
  MuseumPoint,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export {CLASSICAL_CHINESE_GALLERY_ID, CLASSICAL_CHINESE_ROOM_SIGN_COPY};

export const CLASSICAL_CHINESE_PALETTE = Object.freeze({
  ink: '#211d1b',
  lacquer: '#7a3028',
  jade: '#397167',
  bronze: '#9a7441',
  indigo: '#334f65',
  bamboo: '#bd9b61',
  paper: '#e7dcc5',
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
  const y = 1.9;
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

const cameraFor = (position: MuseumPoint, rotationY: number, distance: number): MuseumPoint => ({
  x: position.x + Math.sin(rotationY) * distance,
  z: position.z + Math.cos(rotationY) * distance,
});

const classicalChineseKind = (kind: 'context' | 'work' | 'concept') =>
  `classical-chinese-${kind}` as MuseumSupplementalInstallationKind;

const layout = ({
  id,
  parentExhibitId,
  slotId,
  assetId,
  mediaWidth,
  mediaHeight,
  installationKind,
  accent,
}: {
  id: string;
  parentExhibitId: 'chinese-philosophy' | 'confucius' | 'confucianism' | 'laozi' | 'zhuangzi' | 'mozi' | 'mohism';
  slotId: string;
  assetId: string;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: MuseumSupplementalInstallationKind;
  accent: string;
}): MuseumSupplementalExhibitLayout => {
  const authoredSlot = getClassicalChineseInstallationSlot(slotId);
  const idValue = id as MuseumSupplementalExhibitId;
  const assetIdValue = assetId as MuseumAssetId;
  const position = {x: authoredSlot.x, z: authoredSlot.z};
  const width = 3.58;
  const height = 3.71;
  return {
    id: idValue,
    parentExhibitId,
    zoneId: authoredSlot.spatialCellId,
    spatialCellId: authoredSlot.spatialCellId,
    position,
    rotationY: authoredSlot.rotationY,
    interactionRadius: 3.3,
    collider: {
      id: `supplemental:${id}`,
      center: position,
      size: {width, depth: .94},
      rotation: authoredSlot.rotationY,
    },
    viewpoint: {
      ...cameraFor(position, authoredSlot.rotationY, authoredSlot.supplementalViewpointDistance),
      yaw: authoredSlot.rotationY,
      pitch: -.055,
    },
    assetId: assetIdValue,
    mediaMount: mediaMount(idValue, assetIdValue, mediaWidth, mediaHeight),
    label: {position: [0, 3.34, -.3], width: width - .28, height: .63},
    footprint: {width, height, depth: .94},
    installationKind,
    accent,
  };
};

type SupplementalInput = Omit<
  MuseumSupplementalExhibit,
  'id' | 'assetId' | 'panelAssetId' | 'presentation'
> & {
  id: string;
  assetId: string;
  entityKind: 'philosopher' | 'branch';
  proximityKicker: string;
};

const supplemental = ({
  id,
  assetId,
  entityKind,
  proximityKicker,
  ...record
}: SupplementalInput): MuseumSupplementalExhibit => ({
  ...record,
  id: id as MuseumSupplementalExhibitId,
  assetId: assetId as MuseumAssetId,
  panelAssetId: assetId as MuseumAssetId,
  presentation: {
    panelKicker: 'Gallery 09 contextual exhibit',
    proximityKicker,
    factRows: [
      {label: 'Focus', value: record.shortTitle},
      {label: 'Historical setting', value: record.dateLabel},
      {label: 'Question', value: record.question},
    ],
    articleActionLabel: entityKind === 'philosopher' ? 'Open the thinker in the Atlas' : 'Open the tradition in the Atlas',
    entityKind,
    keyIdeasLabel: 'Interpretive anchors',
    cautionsLabel: 'Keep in view',
  },
});

const exhibits = [
  supplemental({
    id: 'china-warring-states-courts',
    assetId: 'china-warring-states-map-260-bce',
    displayName: 'Warring States: Courts, Conflict, and Traveling Persuaders',
    shortTitle: 'Courts and Traveling Persuaders',
    workLabel: 'WARRING STATES · POLITICAL AND INTELLECTUAL GEOGRAPHY',
    dateLabel: 'Modern reconstruction centered on c. 260 BCE',
    question: 'How does competition among states change what philosophers are asked to do?',
    frontSubtitle: 'Courts, war, office, patronage, persuasion, mobility, and practical advice',
    lead: 'The Warring States period was not simply a backdrop for timeless doctrines. Rival courts sought administrators, teachers, strategists, and persuaders while warfare and institutional change raised urgent questions about order. Thinkers traveled, advised rulers, criticized established practice, and wrote for audiences whose survival and authority were at stake. The map gives that contest a spatial form without turning shifting polities into fixed modern borders.',
    keyIdeas: [
      'Political fragmentation created both danger and opportunities for mobile specialists.',
      'Arguments about virtue, standards, names, and power addressed institutional choices.',
      'No single “Hundred Schools” chart captures the overlap and later classification of texts.',
    ],
    cautions: [
      'The map is a modern reconstruction with simplified boundaries and labels.',
      'Intellectual traditions cannot be assigned one-to-one to territorial states.',
    ],
    sections: [
      {heading: 'Courts demanded usable advice', paragraphs: ['Rulers faced war, taxation, appointment, ritual legitimacy, agriculture, and the coordination of larger bureaucracies. Philosophical proposals often answer that environment directly: whom should a ruler trust, what standard should guide policy, and how can order endure?']},
      {heading: 'Movement connected arguments', paragraphs: ['Teachers and persuaders could carry vocabularies and examples between courts. Patronage made sustained inquiry possible while also creating pressure to make an argument attractive to power. Mobility therefore encouraged comparison without producing one neutral marketplace of ideas.']},
      {heading: 'Later labels organize a messier field', paragraphs: ['Categories such as Confucian, Daoist, Mohist, or Legalist are useful routes through surviving texts, but their boundaries were not always the self-definitions of ancient participants. The gallery uses them as guides while keeping borrowing, polemic, and retrospective classification visible.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Map of the Warring States around 260 BCE', url: 'https://commons.wikimedia.org/wiki/File:EN-WarringStatesAll260BCE.jpg', kind: 'collection-record'},
      {label: 'Internet Encyclopedia of Philosophy — Chinese Philosophy', url: 'https://iep.utm.edu/chinese-philosophy-overview-of-topics/', kind: 'academic-reference'},
    ],
    articleRoute: {kind: 'branch', branchId: 'chinese-philosophy'},
    entityKind: 'branch',
    proximityKicker: 'Many ways in early China',
  }),
  supplemental({
    id: 'china-excavated-bamboo-texts',
    assetId: 'china-warring-states-bamboo-slips',
    displayName: 'Excavated Bamboo Texts: Philosophy Before Fixed Canons',
    shortTitle: 'Excavated Bamboo Texts',
    workLabel: 'MANUSCRIPT CULTURE · EXCAVATION AND TRANSMISSION',
    dateLabel: 'Warring States bamboo slips · exact text unidentified here',
    question: 'What changes when an excavated witness differs from the book later generations received?',
    frontSubtitle: 'Manuscript layers, sequence, lost texts, variant wording, and editorial caution',
    lead: 'Excavated bamboo manuscripts have transformed the study of early Chinese philosophy by preserving writings outside the received textual line. They may contain variant versions, unfamiliar arrangements, or works that later disappeared. Their importance does not license fantasy: provenance, conservation, paleography, physical joins, and comparison with transmitted texts all constrain what scholars can responsibly infer.',
    keyIdeas: [
      'A received canon is the result of transmission, selection, loss, and editing.',
      'Excavated manuscripts can reveal plurality without automatically replacing later texts.',
      'Physical sequence and archaeological context are part of philosophical evidence.',
    ],
    cautions: [
      'The photographed slips are not identified as Guodian or as one named philosophical work.',
      'A textual variant must be interpreted rather than assumed to be earlier or better.',
    ],
    sections: [
      {heading: 'A manuscript is more than wording', paragraphs: ['Slip length, cord marks, handwriting, damage, and placement in a tomb can help reconstruct a text’s history. Those clues belong beside vocabulary and argument because the order in which passages are read may depend on physical evidence.']},
      {heading: 'The received book has a history', paragraphs: ['Texts associated with Confucius, Laozi, Mozi, and others often reached later readers through compilation and commentary. Excavated witnesses make that process visible and challenge the image of an intact authorial book moving unchanged across centuries.']},
      {heading: 'Discovery expands uncertainty and knowledge', paragraphs: ['New evidence can clarify a phrase while unsettling an entire chronology or category. Responsible curation presents that double effect: manuscripts make early debates materially closer and at the same time expose how much reconstruction remains necessary.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Warring States Bamboo Slips', url: 'https://commons.wikimedia.org/wiki/File:Warring_States_Bamboo_Slips_(10185849733).jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Chinese Texts and Philosophical Contexts', url: 'https://plato.stanford.edu/entries/chinese-metaphysics/', kind: 'academic-reference'},
    ],
    articleRoute: {kind: 'branch', branchId: 'chinese-philosophy'},
    entityKind: 'branch',
    proximityKicker: 'Texts before fixed canons',
  }),
  supplemental({
    id: 'china-gongsun-long-white-horse',
    assetId: 'china-gongsun-long-yuan-portrait',
    displayName: 'Gongsun Long and the School of Names: Is a White Horse a Horse?',
    shortTitle: 'Gongsun Long: White Horse',
    workLabel: 'NAMES AND DISTINCTIONS · WHITE HORSE DIALOGUE',
    dateLabel: 'Warring States argument · portrait painted centuries later',
    question: 'When does a more specific name change what can be admitted or selected?',
    frontSubtitle: 'Names, kinds, qualification, reference, disputation, and translation',
    lead: 'The White Horse Dialogue is famous for the claim that a white horse is not a horse. Read as a cheap paradox, it seems merely perverse. Read as an argument about what names select, the role of qualification, and the difference between seeking a horse and seeking a white horse, it becomes a disciplined puzzle about language and classification whose exact force remains debated.',
    keyIdeas: [
      'A general term and a qualified term can guide different acts of selection.',
      'The dialogue tests how names relate to kinds, properties, and admissible objects.',
      'Its form stages disagreement rather than delivering an uncontested theory.',
    ],
    cautions: [
      'The later portrait is a traditional representation, not a lifetime likeness.',
      'Mapping the dialogue directly onto modern predicate logic can hide ancient linguistic questions.',
    ],
    sections: [
      {heading: 'Selection drives the puzzle', paragraphs: ['If someone asks for a horse, either a white or yellow horse may satisfy the request. If someone asks for a white horse, color now restricts what counts. The dialogue exploits that difference to press questions about how a name functions in practical discrimination.']},
      {heading: 'Translation makes a difference', paragraphs: ['English formulations encourage readers to hear a simple class-inclusion claim. Early Chinese terms, grammar, and practices of disputation may organize the issue differently. No translation eliminates the need to explain which use of “is” or “not” an interpretation assumes.']},
      {heading: 'A paradox can train attention', paragraphs: ['Even if a visitor rejects the conclusion, following the exchange reveals where an apparently obvious classification depends on context. The exercise belongs to a wider field of debates about names and realities, not an isolated joke detached from governance and communication.']},
    ],
    sources: [
      {label: 'National Palace Museum image on Wikimedia Commons — Gongsun Long', url: 'https://commons.wikimedia.org/wiki/File:%E8%87%B3%E8%81%96%E5%85%88%E8%B3%A2%E5%8D%8A%E8%BA%AB%E5%83%8F_%E5%86%8A-039-%E5%85%AC%E5%AD%AB%E9%BE%8D.jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — School of Names', url: 'https://plato.stanford.edu/entries/school-names/', kind: 'academic-reference'},
    ],
    articleRoute: {kind: 'branch', branchId: 'chinese-philosophy'},
    entityKind: 'branch',
    proximityKicker: 'Names and distinctions',
  }),
  supplemental({
    id: 'china-sunzi-strategic-reason',
    assetId: 'china-sunzi-art-of-war-slips',
    displayName: 'Sunzi and Strategic Reason: Calculation Under Conflict',
    shortTitle: 'Sunzi: Strategic Reason',
    workLabel: 'STRATEGY · INFORMATION, POSITION, AND COST',
    dateLabel: 'Art of War textual tradition · Han manuscript witness',
    question: 'What kind of reasoning is possible when information is partial and the other side adapts?',
    frontSubtitle: 'Assessment, deception, position, timing, intelligence, cost, and uncertainty',
    lead: 'The Art of War treats conflict as a changing field rather than a test of brute courage. Reliable assessment, intelligence, timing, position, and the avoidance of needless cost can matter more than dramatic battle. Its strategic intelligence is morally ambivalent: reducing harm may be prudent, while deception and instrumental control raise questions the text does not settle for modern readers.',
    keyIdeas: [
      'Good strategy responds to conditions instead of repeating a fixed recipe.',
      'Information and misdirection shape what each side believes is possible.',
      'Winning at lower cost can be strategically rational without being ethically sufficient.',
    ],
    cautions: [
      'The slips are a later manuscript witness and do not settle the text’s authorship.',
      'A strategic insight is not automatically an ethical endorsement of its use.',
    ],
    sections: [
      {heading: 'Assessment precedes action', paragraphs: ['Terrain, supply, morale, leadership, timing, and comparative capability form a field of constraints. Calculation does not promise certainty; it disciplines judgment by asking which differences are likely to matter before committing lives and resources.']},
      {heading: 'The opponent also interprets', paragraphs: ['Conflict is reflexive because each side responds to signals and expectations. Concealment, feints, and intelligence seek to shape that interpretation. Strategy therefore involves models of another agent rather than mechanical prediction of an inert object.']},
      {heading: 'Economy leaves an ethical question', paragraphs: ['Avoiding prolonged destruction can align prudence with reduced suffering, yet efficiency can also serve unjust aims. Placing Sunzi near Mohist anti-war arguments lets visitors distinguish intelligent means from a public justification of the end being pursued.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — inscribed bamboo slips of The Art of War', url: 'https://commons.wikimedia.org/wiki/File:Inscribed_bamboo-slips_of_Art_of_War.jpg', kind: 'collection-record'},
      {label: 'Internet Encyclopedia of Philosophy — Chinese Philosophy', url: 'https://iep.utm.edu/chinese-philosophy-overview-of-topics/', kind: 'academic-reference'},
    ],
    articleRoute: {kind: 'branch', branchId: 'chinese-philosophy'},
    entityKind: 'branch',
    proximityKicker: 'Strategy under uncertainty',
  }),
  supplemental({
    id: 'china-analects-layered-record',
    assetId: 'china-analects-stockholm',
    displayName: 'The Analects: A Layered Record of Teaching and Reception',
    shortTitle: 'The Analects',
    workLabel: 'CONFUCIUS · ANALECTS AND TRANSMISSION',
    dateLabel: 'Sayings compiled across generations · later printed witness',
    question: 'How can a layered collection preserve a teacher’s importance without becoming a transcript?',
    frontSubtitle: 'Sayings, disciples, compilation, ritual, humaneness, learning, and commentary',
    lead: 'The Analects presents brief sayings, conversations, judgments, and portraits associated with Confucius and his circle. It is not a diary or a verbatim transcript written by Confucius. Its layered form records communities remembering, arranging, and interpreting teaching. That history does not make the work philosophically weak; it changes how claims should be attributed and compared.',
    keyIdeas: [
      'The Analects joins moral cultivation to relationships, ritual practice, and learning.',
      'Its short units invite interpretation through placement, repetition, and commentary.',
      'Confucius’s voice reaches readers through compilation rather than direct authorship.',
    ],
    cautions: [
      'The photographed printed edition is far later than the text’s early formation.',
      '“Confucius says” can name a textual persona without proving verbatim historical speech.',
    ],
    sections: [
      {heading: 'A collection teaches through juxtaposition', paragraphs: ['One passage may praise learning, another ritual timing, another humaneness or exemplary rule. Their brevity makes context crucial. Readers build connections across recurring terms and situations rather than extracting a single systematic treatise.']},
      {heading: 'Cultivation happens with others', paragraphs: ['Teachers, friends, family roles, officials, and remembered exemplars populate the text. Ethical development is therefore relational and enacted: character appears in how a person responds, speaks, learns, mourns, and takes responsibility within shared forms.']},
      {heading: 'Transmission becomes philosophy', paragraphs: ['Compilers and commentators did more than preserve sentences. Their arrangements and explanations shaped what later communities understood as Confucian teaching. The book’s material afterlife belongs inside the history of its arguments and authority.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — historical printed edition of the Analects', url: 'https://commons.wikimedia.org/wiki/File:Analects.JPG', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Confucius', url: 'https://plato.stanford.edu/entries/confucius/', kind: 'academic-reference'},
      {label: 'Chinese Text Project — Analects', url: 'https://ctext.org/analects', kind: 'primary-text'},
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'confucius'},
    entityKind: 'philosopher',
    proximityKicker: 'A layered teaching record',
  }),
  supplemental({
    id: 'china-guodian-laozi',
    assetId: 'china-guodian-daoist-bamboo-slips',
    displayName: 'The Guodian Laozi: A Text Before a Fixed Daodejing',
    shortTitle: 'The Guodian Laozi',
    workLabel: 'DAODEJING · EARLY MANUSCRIPT PLURALITY',
    dateLabel: 'Warring States Laozi-related bamboo materials',
    question: 'What happens to authorship when early witnesses preserve only selected and differently ordered passages?',
    frontSubtitle: 'Textual strata, selection, sequence, titles, attribution, and the limits of a founder story',
    lead: 'Excavated Laozi-related bamboo texts preserve materials known from the received Daodejing alongside different ordering and selection. They show that the work’s early textual history was more plural than a single finished book dictated by one securely documented founder. The gallery therefore presents Laozi as an attributed textual persona while still treating the Daodejing as a powerful philosophical tradition.',
    keyIdeas: [
      'Early witnesses complicate the idea of one fixed Daodejing from the start.',
      'Attribution can organize a tradition even when a biography remains legendary or composite.',
      'Variant order changes how adjacent passages appear to support one another.',
    ],
    cautions: [
      'The source image is identified broadly as Warring States or Han Daoist slips; attribution must follow its record.',
      'Textual plurality does not prove that every passage has an unrelated origin.',
    ],
    sections: [
      {heading: 'A book can emerge over time', paragraphs: ['Passages may circulate in shorter groupings before editors assemble a received sequence. A title, chapter division, or authorial legend can stabilize later reading without describing the earliest material form of every sentence.']},
      {heading: 'Order creates arguments', paragraphs: ['When one saying follows another, readers infer development, contrast, or explanation. Different manuscript sequences can therefore reveal multiple ways of organizing themes such as non-forcing, naming, desire, governance, and the Way.']},
      {heading: 'Caution strengthens the exhibit', paragraphs: ['Calling Laozi an attributed persona does not dismiss the text. It prevents an attractive founder portrait from outranking manuscript evidence and lets visitors distinguish the Daodejing’s historical formation from the many later biographies, religious roles, and images attached to Laozi.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Warring States or Han bamboo slips of a Daoist text', url: 'https://commons.wikimedia.org/wiki/File:Warring_States_or_Han_Bamboo_Slips_of_Daoist_Text_(9974128735).jpg', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Laozi', url: 'https://plato.stanford.edu/entries/laozi/', kind: 'academic-reference'},
      {label: 'Chinese Text Project — Dao De Jing', url: 'https://ctext.org/dao-de-jing', kind: 'primary-text'},
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'laozi'},
    entityKind: 'philosopher',
    proximityKicker: 'Before a fixed Daodejing',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

export const CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBITS = [
  ...exhibits,
  ...CLASSICAL_CHINESE_WALL_FILL_EXHIBITS,
] as const satisfies readonly MuseumSupplementalExhibit[];

/**
 * Every layout consumes one of the curation contract's twelve non-primary
 * slots. No transform is duplicated here: the room/face geometry remains
 * authoritative in classicalChineseGalleryCuration.ts.
 */
export const CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'china-warring-states-courts', parentExhibitId: 'chinese-philosophy', slotId: 'china-many-ways:west-outer', assetId: 'china-warring-states-map-260-bce', mediaWidth: 2.65, mediaHeight: 2.44, installationKind: classicalChineseKind('context'), accent: CLASSICAL_CHINESE_PALETTE.bronze}),
  layout({id: 'china-excavated-bamboo-texts', parentExhibitId: 'chinese-philosophy', slotId: 'china-many-ways:east-room-face', assetId: 'china-warring-states-bamboo-slips', mediaWidth: 3.05, mediaHeight: 2.03, installationKind: classicalChineseKind('work'), accent: CLASSICAL_CHINESE_PALETTE.jade}),
  layout({id: 'china-writing-on-bamboo', parentExhibitId: 'chinese-philosophy', slotId: 'china-many-ways:east-cross-face', assetId: 'china-making-bamboo-slips', mediaWidth: 1.63, mediaHeight: 2.45, installationKind: classicalChineseKind('context'), accent: CLASSICAL_CHINESE_PALETTE.bamboo}),
  layout({id: 'china-gongsun-long-white-horse', parentExhibitId: 'chinese-philosophy', slotId: 'china-many-ways:south-room-face', assetId: 'china-gongsun-long-yuan-portrait', mediaWidth: 1.74, mediaHeight: 2.45, installationKind: classicalChineseKind('concept'), accent: CLASSICAL_CHINESE_PALETTE.indigo}),
  layout({id: 'china-sunzi-strategic-reason', parentExhibitId: 'chinese-philosophy', slotId: 'china-many-ways:south-cross-face', assetId: 'china-sunzi-art-of-war-slips', mediaWidth: 3.05, mediaHeight: 2.03, installationKind: classicalChineseKind('work'), accent: CLASSICAL_CHINESE_PALETTE.lacquer}),
  layout({id: 'china-analects-layered-record', parentExhibitId: 'confucius', slotId: 'china-confucian-cultivation:west-cross-face', assetId: 'china-analects-stockholm', mediaWidth: 3.05, mediaHeight: 2.03, installationKind: classicalChineseKind('work'), accent: CLASSICAL_CHINESE_PALETTE.lacquer}),
  layout({id: 'china-confucian-ritual-music', parentExhibitId: 'confucianism', slotId: 'china-confucian-cultivation:south-cross-face', assetId: 'china-eastern-zhou-stone-chimes', mediaWidth: 3.05, mediaHeight: 2.03, installationKind: classicalChineseKind('context'), accent: CLASSICAL_CHINESE_PALETTE.bronze}),
  layout({id: 'china-guodian-laozi', parentExhibitId: 'laozi', slotId: 'china-daoist-way:east-cross-face', assetId: 'china-guodian-daoist-bamboo-slips', mediaWidth: 1.63, mediaHeight: 2.45, installationKind: classicalChineseKind('work'), accent: CLASSICAL_CHINESE_PALETTE.jade}),
  layout({id: 'china-zhuangzi-butterfly-dream', parentExhibitId: 'zhuangzi', slotId: 'china-daoist-way:north-room-face', assetId: 'china-zhuangzi-butterfly-dream', mediaWidth: 2.42, mediaHeight: 2.45, installationKind: classicalChineseKind('concept'), accent: CLASSICAL_CHINESE_PALETTE.indigo}),
  layout({id: 'china-zhuangzi-cook-ding', parentExhibitId: 'zhuangzi', slotId: 'china-daoist-way:north-cross-face', assetId: 'china-zhuangzi-cook-ding', mediaWidth: 3, mediaHeight: 2.44, installationKind: classicalChineseKind('concept'), accent: CLASSICAL_CHINESE_PALETTE.bamboo}),
  layout({id: 'china-later-mohist-canons', parentExhibitId: 'mozi', slotId: 'china-mohist-fa:west-cross-face', assetId: 'china-mozi-volume-seven-page', mediaWidth: 1.55, mediaHeight: 2.05, installationKind: classicalChineseKind('work'), accent: CLASSICAL_CHINESE_PALETTE.jade}),
  layout({id: 'china-mohist-siege-defense', parentExhibitId: 'mohism', slotId: 'china-mohist-fa:north-cross-face', assetId: 'china-mozi-jiche-catapult', mediaWidth: 2.85, mediaHeight: 2.45, installationKind: classicalChineseKind('context'), accent: CLASSICAL_CHINESE_PALETTE.lacquer}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getClassicalChineseSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 09 supplemental exhibit ${id} is missing.`);
  return record;
};
