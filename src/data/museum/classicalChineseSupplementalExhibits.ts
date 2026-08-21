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
  authoredViewpointTarget,
}: {
  id: string;
  parentExhibitId: 'chinese-philosophy' | 'confucius' | 'confucianism' | 'laozi' | 'zhuangzi' | 'mozi' | 'mohism';
  slotId: string;
  assetId: string;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: MuseumSupplementalInstallationKind;
  accent: string;
  authoredViewpointTarget?: true;
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
    ...(authoredViewpointTarget ? {authoredViewpointTarget: true} : {}),
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
    panelKicker: 'Gallery 06 supplemental exhibit',
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
      'The installed photograph identifies Guodian Laozi A, but an early manuscript witness does not establish an autograph, sole authorship, or a fixed founder biography.',
      'Textual plurality does not prove that every passage has an unrelated origin.',
    ],
    sections: [
      {heading: 'A book can emerge over time', paragraphs: ['Passages may circulate in shorter groupings before editors assemble a received sequence. A title, chapter division, or authorial legend can stabilize later reading without describing the earliest material form of every sentence.']},
      {heading: 'Order creates arguments', paragraphs: ['When one saying follows another, readers infer development, contrast, or explanation. Different manuscript sequences can therefore reveal multiple ways of organizing themes such as non-forcing, naming, desire, governance, and the Way.']},
      {heading: 'Caution strengthens the exhibit', paragraphs: ['Calling Laozi an attributed persona does not dismiss the text. It prevents an attractive founder portrait from outranking manuscript evidence and lets visitors distinguish the Daodejing’s historical formation from the many later biographies, religious roles, and images attached to Laozi.']},
    ],
    sources: [
      {label: 'Wikimedia Commons — Guodian Laozi A bamboo slips', url: 'https://commons.wikimedia.org/wiki/File:%E9%83%AD%E5%BA%97%E6%A5%9A%E7%AE%80%E3%80%8A%E8%80%81%E5%AD%90%E7%94%B2%E3%80%8B.jpg', kind: 'collection-record'},
      {label: 'Hubei Provincial Museum — Guodian Laozi bamboo-slip record', url: 'https://www.hbww.org.cn/bambooslips/p/11903.html', kind: 'collection-record'},
      {label: 'Stanford Encyclopedia of Philosophy — Laozi', url: 'https://plato.stanford.edu/entries/laozi/', kind: 'academic-reference'},
      {label: 'Chinese Text Project — Dao De Jing', url: 'https://ctext.org/dao-de-jing', kind: 'primary-text'},
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'laozi'},
    entityKind: 'philosopher',
    proximityKicker: 'Before a fixed Daodejing',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

type Gallery06ReviewEvidence = {
  plaqueTitle: string;
  invitation: string;
  objectInterpretation: string;
  detail: readonly [string, string, string];
  sources: MuseumSupplementalExhibit['sources'];
  sectionSourceIds: readonly [readonly string[], readonly string[], readonly string[]];
  visitorGuide: NonNullable<MuseumSupplementalExhibit['visitorGuide']>;
  articleTitle: string;
  canonicalContexts: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['canonicalContexts'];
  plaqueType: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['type'];
  resolution: string;
  lock: string;
};

const gallery06ReviewMethod = 'Gallery 06 supplemental review: two non-overlapping Terra/High read-only evidence scopes of six exhibits each were reconciled by the Sol parent across installed-object identity, interpretation, claim-level sourcing, attribution, date, institution, provenance, rights, accessibility, article relationship, routes, review locks, and desktop, mobile, and staged-3D presentation.';

const gallery06ReviewEvidence: Record<string, Gallery06ReviewEvidence> = {
  'china-warring-states-courts': {
    plaqueTitle: 'Warring States Courts',
    invitation: 'This modern map locates rival courts where mobile teachers and persuaders offered competing programs, while its fixed borders remain only a simplified reconstruction of a changing political field.',
    objectInterpretation: 'Philg88 created this English historical map in 2010 to represent the major states around 260 BCE. It is a modern, CC BY-SA reconstruction for orientation, not an ancient map or evidence that philosophical traditions belonged neatly to territorial states.',
    detail: [
      'The installed full-composition map labels Qin, Chu, Qi, Yan, Han, Zhao, Wei, and neighboring regions at one late-Warring-States moment. Its exact source record establishes the maker, 2010 date, license, and intended circa-260-BCE scope; it does not establish every frontier, population, travel route, or court affiliation shown or omitted.',
      'Court competition made administration, appointment, persuasion, military security, agriculture, ritual legitimacy, and public order urgent practical questions. Mobile specialists could seek patronage and compare proposals across states, but movement did not create a neutral academy: access to rulers, political danger, and institutional demand shaped which arguments could be heard and preserved.',
      'The Chinese Philosophy article supplies the wider caution that familiar labels such as Confucian, Mohist, Daoist, and Legalist partly reflect later classification. The map can situate debate without turning those labels into bounded parties, assigning one doctrine to each color, or allowing a single political snapshot to define all Chinese philosophy.',
    ],
    sources: [
      {id: 'warring-map-commons', label: 'Wikimedia Commons — political map of the Warring States around 260 BCE', url: 'https://commons.wikimedia.org/wiki/File:EN-WarringStatesAll260BCE.jpg', kind: 'collection-record'},
      {id: 'chinese-philosophy-iep', label: 'Internet Encyclopedia of Philosophy — Chinese Philosophy', url: 'https://iep.utm.edu/chinese-philosophy-overview-of-topics/', kind: 'academic-reference'},
      {id: 'ancient-chinese-political-sep', label: 'Stanford Encyclopedia of Philosophy — Social and Political Thought in Chinese Philosophy', url: 'https://plato.stanford.edu/entries/chinese-social-political/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['warring-map-commons', 'chinese-philosophy-iep'], ['chinese-philosophy-iep', 'ancient-chinese-political-sep'], ['warring-map-commons', 'chinese-philosophy-iep']],
    visitorGuide: [
      {heading: 'Reading a political reconstruction', items: [
        {label: 'One dated snapshot', description: 'The colors orient visitors around circa 260 BCE rather than fixing borders for the whole Warring States period.', sourceIds: ['warring-map-commons']},
        {label: 'Mobility, not ownership', description: 'Teachers and persuaders moved among courts; no state color owns one philosophical tradition.', sourceIds: ['chinese-philosophy-iep', 'ancient-chinese-political-sep']},
      ]},
      {heading: 'From courts to arguments', items: [
        {label: 'Practical stakes', description: 'War, office, taxation, ritual, agriculture, and appointment made philosophical advice institutionally consequential.', sourceIds: ['ancient-chinese-political-sep']},
        {label: 'Later school labels', description: 'Useful classifications can conceal borrowing, overlap, and retrospective grouping in the surviving texts.', sourceIds: ['chinese-philosophy-iep']},
      ]},
    ],
    articleTitle: 'Chinese Philosophy', canonicalContexts: [{kind: 'branch', id: 'chinese-philosophy'}], plaqueType: 'historical-event-or-institutional-context',
    resolution: 'Resolved: retained the verified 2010 map and CC BY-SA credit, separated its reconstructed geography from intellectual affiliation, mapped the court and classification claims, preserved natural proportions, and linked the current Chinese Philosophy article.', lock: 'fnv1a64:26ac19f636fecd00',
  },
  'china-excavated-bamboo-texts': {
    plaqueTitle: 'Excavated Bamboo Texts',
    invitation: 'These unidentified Warring States slips show why material sequence, excavation history, and variant wording matter when scholars reconstruct early philosophical texts before later received canons.',
    objectInterpretation: 'Gary Todd photographed these Warring States bamboo slips at the Chinese Writing Museum in Anyang on 13 December 2011 and released the image under CC0. The source does not identify a named work, tomb, owner, or philosophical school.',
    detail: [
      'Rows of dark, narrow slips carry vertical writing whose material arrangement immediately distinguishes this object from a bound modern book. The Commons record verifies the museum setting, photographer, 2011 capture date, and CC0 dedication. It does not license calling the slips Guodian, assigning them to Laozi, or inventing an archaeological provenance absent from the record.',
      'Excavated manuscripts can preserve unknown works, alternate passage orders, variant graphs, and versions outside received textual lines. Slip length, handwriting, cord traces, damage, joins, and find context can constrain reconstruction. Those features increase knowledge while also exposing uncertainty: an earlier witness is not automatically more original, complete, or philosophically authoritative.',
      'The Chinese Philosophy article treats early works as layered textual traditions rather than transparent single-author books. The object makes that principle tangible but cannot prove a claim about Confucius, Laozi, Mozi, or any other named corpus. Responsible comparison keeps object identity, archaeological context, paleographic reconstruction, and philosophical interpretation as related but distinct evidentiary tasks.',
    ],
    sources: [
      {id: 'generic-slips-commons', label: 'Wikimedia Commons — Warring States bamboo slips at the Chinese Writing Museum', url: 'https://commons.wikimedia.org/wiki/File:Warring_States_Bamboo_Slips_(10185849733).jpg', kind: 'collection-record'},
      {id: 'manuscripts-early-china', label: 'Early China — authentication and study of excavated and purchased bamboo manuscripts', url: 'https://www.cambridge.org/core/journals/early-china/article/introduction-to-the-peking-university-han-bamboo-strips-on-the-authentication-and-study-of-purchased-manuscripts/0CFFFE9DCB366886481848438E895431', kind: 'academic-reference'},
      {id: 'chinese-philosophy-iep', label: 'Internet Encyclopedia of Philosophy — Chinese Philosophy', url: 'https://iep.utm.edu/chinese-philosophy-overview-of-topics/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['generic-slips-commons', 'manuscripts-early-china'], ['manuscripts-early-china'], ['generic-slips-commons', 'chinese-philosophy-iep']],
    visitorGuide: [
      {heading: 'Evidence on the slips', items: [
        {label: 'Physical sequence', description: 'Cord traces, length, damage, handwriting, and joins can constrain how passages are ordered.', sourceIds: ['manuscripts-early-china']},
        {label: 'Unidentified text', description: 'This source record names Warring States slips but no work, tomb, author, or school.', sourceIds: ['generic-slips-commons']},
      ]},
      {heading: 'Comparing textual witnesses', items: [
        {label: 'Variants need argument', description: 'An earlier or excavated wording must be interpreted rather than automatically preferred.', sourceIds: ['manuscripts-early-china']},
        {label: 'Canons have histories', description: 'Copying, compilation, loss, and commentary shaped the books later readers received.', sourceIds: ['chinese-philosophy-iep']},
      ]},
    ],
    articleTitle: 'Chinese Philosophy', canonicalContexts: [{kind: 'branch', id: 'chinese-philosophy'}], plaqueType: 'object-manuscript-site-or-archaeological-context',
    resolution: 'Resolved: corrected the photograph date to 2011, retained the unidentified-slip limitation, added manuscript-method evidence, mapped every claim, preserved CC0 credit and natural proportions, and linked the current Chinese Philosophy article.', lock: 'fnv1a64:d5a2a672e38316e8',
  },
  'china-gongsun-long-white-horse': {
    plaqueTitle: 'White Horse Dialogue',
    invitation: 'A much later portrait introduces the White Horse Dialogue, whose disputed reasoning tests how general and qualified names guide selection without becoming a simple modern logic puzzle.',
    objectInterpretation: 'This anonymous Yuan-dynasty album leaf in the National Palace Museum is a traditional representation of Gongsun Long made roughly fifteen centuries after his conventional Warring States setting. It records later commemoration, not his appearance or the dialogue’s original performance.',
    detail: [
      'The portrait presents a formally robed scholar identified by tradition as Gongsun Long. The collection record supports its anonymous Yuan attribution, National Palace Museum holding, and public-domain status. Nothing in the image demonstrates the White Horse argument, verifies a biography, or makes the later category School of Names a self-declared ancient institution.',
      'The dialogue contrasts seeking a horse with seeking a white horse: qualification changes which candidates satisfy a request. Its exchange has generated semantic, pragmatic, metaphysical, and dialectical readings. Translating its pivotal terms into English copula constructions can make one modern class-inclusion problem appear obvious while concealing how names operated in ancient disputation and practical discrimination.',
      'Following the reasoning remains useful even when a visitor rejects its conclusion. The exchange trains attention to shifts between general and qualified terms, to the task a name performs, and to the difference between reconstructing an argument and endorsing it. The Chinese Philosophy article provides the wider argumentative field without pretending that one paradox defines Chinese views of language.',
    ],
    sources: [
      {id: 'gongsun-portrait-commons', label: 'Wikimedia Commons — Yuan-dynasty traditional portrait of Gongsun Long', url: 'https://commons.wikimedia.org/wiki/File:%E8%87%B3%E8%81%96%E5%85%88%E8%B3%A2%E5%8D%8A%E8%BA%AB%E5%83%8F_%E5%86%8A-039-%E5%85%AC%E5%AD%AB%E9%BE%8D.jpg', kind: 'collection-record'},
      {id: 'school-names-sep', label: 'Stanford Encyclopedia of Philosophy — School of Names', url: 'https://plato.stanford.edu/entries/school-names/', kind: 'academic-reference'},
      {id: 'gongsun-ctext', label: 'Chinese Text Project — Gongsun Longzi', url: 'https://ctext.org/gongsunlongzi', kind: 'primary-text'},
    ],
    sectionSourceIds: [['gongsun-portrait-commons', 'school-names-sep'], ['school-names-sep', 'gongsun-ctext'], ['school-names-sep', 'gongsun-ctext']],
    visitorGuide: [
      {heading: 'Following the dialogue', items: [
        {label: 'Qualification', description: 'Adding “white” changes which horses can satisfy the request under discussion.', sourceIds: ['school-names-sep', 'gongsun-ctext']},
        {label: 'Disputed force', description: 'Semantic, pragmatic, and metaphysical reconstructions remain debated rather than settled by one translation.', sourceIds: ['school-names-sep']},
      ]},
      {heading: 'Keeping categories historical', items: [
        {label: 'Later school label', description: '“School of Names” is a retrospective organizing category, not a securely documented membership list.', sourceIds: ['school-names-sep']},
        {label: 'Commemorative portrait', description: 'The Yuan album leaf is later reception, not a lifetime likeness or argument diagram.', sourceIds: ['gongsun-portrait-commons']},
      ]},
    ],
    articleTitle: 'Chinese Philosophy', canonicalContexts: [{kind: 'branch', id: 'chinese-philosophy'}], plaqueType: 'work-or-text',
    resolution: 'Resolved: retained the verified Yuan portrait and public-domain credit, replaced the author-plus-thesis plaque with the factual dialogue title, mapped contested interpretations and taxonomy cautions, preserved natural proportions, and linked Chinese Philosophy.', lock: 'fnv1a64:fa1e1366aace7ca2',
  },
  'china-sunzi-strategic-reason': {
    plaqueTitle: 'The Art of War',
    invitation: 'These Western Han slips witness the Art of War tradition, where assessment, position, intelligence, deception, and cost organize strategic judgment without by themselves supplying an ethical justification.',
    objectInterpretation: 'The installed photograph shows second-century-BCE bamboo slips excavated at Yinqueshan in Linyi in 1972 and now in the Shandong Museum. AlexHe34’s image is licensed CC BY-SA 3.0; the witness is not an autograph and does not settle the work’s authorship.',
    detail: [
      'Parallel slips densely inscribed in vertical columns make a Han manuscript witness materially visible. The source and collection evidence support the Yinqueshan find, second-century-BCE dating, Shandong Museum holding, photographer, and license. A manuscript copied centuries after the text’s conventional setting can illuminate transmission without proving that one historical Sunzi composed every received line.',
      'The text repeatedly asks commanders to compare conditions before committing force: leadership, organization, terrain, supply, morale, timing, and information matter together. Because an opponent interprets signals and adapts, deception and intelligence operate in a reflexive field rather than a mechanical prediction problem. Flexible response is disciplined judgment, not the absence of planning or constraint.',
      'Avoiding prolonged war or winning without destructive battle can reduce cost, yet strategic economy does not decide whether the political end is just. The Chinese Philosophy article situates Sunzi among Warring States and early imperial statecraft debates, while the neighboring Mohist exhibits sharpen a distinct ethical question: whose benefit and suffering count when expertise makes coercion more effective?',
    ],
    sources: [
      {id: 'sunzi-slips-commons', label: 'Wikimedia Commons — Yinqueshan Art of War bamboo slips', url: 'https://commons.wikimedia.org/wiki/File:Inscribed_bamboo-slips_of_Art_of_War.jpg', kind: 'collection-record'},
      {id: 'sunzi-shandong', label: 'Shandong Museum collection report — Yinqueshan bamboo slips', url: 'https://govt.chinadaily.com.cn/s/202206/14/WS62a82e87498ea2749279aae8/bamboo-slips-chronicle-chinas-ancient-military-philosophy_1.html', kind: 'collection-record'},
      {id: 'sunzi-ctext', label: 'Chinese Text Project — The Art of War', url: 'https://ctext.org/art-of-war', kind: 'primary-text'},
      {id: 'chinese-philosophy-iep', label: 'Internet Encyclopedia of Philosophy — Chinese Philosophy', url: 'https://iep.utm.edu/chinese-philosophy-overview-of-topics/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['sunzi-slips-commons', 'sunzi-shandong'], ['sunzi-ctext'], ['sunzi-ctext', 'chinese-philosophy-iep']],
    visitorGuide: [
      {heading: 'Strategic judgment', items: [
        {label: 'Comparative assessment', description: 'Planning compares interacting conditions rather than promising certainty from one fixed recipe.', sourceIds: ['sunzi-ctext']},
        {label: 'Adaptive opponents', description: 'Intelligence, concealment, and feints matter because each side interprets the other’s conduct.', sourceIds: ['sunzi-ctext']},
      ]},
      {heading: 'Reading the manuscript witness', items: [
        {label: 'Western Han copy', description: 'The Yinqueshan slips are an early witness, not Sunzi’s autograph or proof of sole authorship.', sourceIds: ['sunzi-slips-commons', 'sunzi-shandong']},
        {label: 'Ethical remainder', description: 'Efficiency may limit destruction, but it cannot by itself justify the end being pursued.', sourceIds: ['chinese-philosophy-iep', 'sunzi-ctext']},
      ]},
    ],
    articleTitle: 'Chinese Philosophy', canonicalContexts: [{kind: 'branch', id: 'chinese-philosophy'}], plaqueType: 'work-or-text',
    resolution: 'Resolved: specified the Western Han date and Shandong Museum holding, retained CC BY-SA credit and authorship caution, replaced the curatorial plaque with the work title, mapped strategic and ethical claims, preserved natural proportions, and linked Chinese Philosophy.', lock: 'fnv1a64:4a126007c3ffa231',
  },
  'china-writing-on-bamboo': {
    plaqueTitle: 'Writing on Bamboo',
    invitation: 'This modern museum demonstration reveals the labor of preparing, inscribing, binding, ordering, and repairing bamboo texts while remaining a reconstruction rather than an ancient workshop.',
    objectInterpretation: 'Gary Todd photographed this modern bamboo-slip making and writing display at the Hubei Provincial Museum on 3 December 2010 and released the image under CC0. The exhibit makers and construction date are not identified by the source.',
    detail: [
      'The display arranges bamboo strips, tools, and successive working stages on a dark surface. Its exact record supports the location, photographer, capture date, and CC0 rights, while the reconstructed setting makes no claim to preserve an untouched Warring States workshop. The image can show a process model without proving that every historical workshop used one identical sequence.',
      'Preparing a text required material choices: bamboo was cut and smoothed, characters were written vertically, and slips were connected into an ordered bundle. Cords could break; slips could move or disappear; copying could introduce variants. Physical traces therefore constrain textual reconstruction while making clear that order and continuity were achieved practices rather than invisible givens.',
      'This material history changes how authorship and compilation are imagined. A received book may preserve strata, repeated units, editorial joins, and communities of transmission without becoming arbitrary or unknowable. The Chinese Philosophy article supplies the broader textual context; the demonstration contributes a bounded account of labor, handling, and vulnerability rather than authority over any named doctrine.',
    ],
    sources: [
      {id: 'bamboo-making-commons', label: 'Wikimedia Commons — making and writing bamboo slips at Hubei Provincial Museum', url: 'https://commons.wikimedia.org/wiki/File:The_Making_of_Bamboo_Slips_and_Writing_(10160906513).jpg', kind: 'collection-record'},
      {id: 'hubei-writing-materials', label: 'Hubei Provincial Museum — bamboo and wooden writing materials', url: 'https://m-www.hbkgy.com/p/5196.html', kind: 'collection-record'},
      {id: 'chinese-philosophy-iep', label: 'Internet Encyclopedia of Philosophy — Chinese Philosophy', url: 'https://iep.utm.edu/chinese-philosophy-overview-of-topics/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['bamboo-making-commons', 'hubei-writing-materials'], ['hubei-writing-materials'], ['bamboo-making-commons', 'chinese-philosophy-iep']],
    visitorGuide: [
      {heading: 'Making a slip text', items: [
        {label: 'Prepared surface', description: 'Cutting and smoothing bamboo precede inscription; a text depends on skilled material labor.', sourceIds: ['bamboo-making-commons', 'hubei-writing-materials']},
        {label: 'Bound sequence', description: 'Cords organize separate slips, so order is physical as well as conceptual.', sourceIds: ['hubei-writing-materials']},
      ]},
      {heading: 'From damage to interpretation', items: [
        {label: 'Traces and limits', description: 'Breaks, displaced slips, and variants supply evidence but do not authorize any desired reordering.', sourceIds: ['hubei-writing-materials']},
        {label: 'Modern reconstruction', description: 'The photographed display models a process and is not an excavated workshop.', sourceIds: ['bamboo-making-commons']},
      ]},
    ],
    articleTitle: 'Chinese Philosophy', canonicalContexts: [{kind: 'branch', id: 'chinese-philosophy'}], plaqueType: 'object-manuscript-site-or-archaeological-context',
    resolution: 'Resolved: corrected the photograph date to 2010, removed the stale Gallery 09 presentation, retained the reconstruction limitation, mapped material-history claims, preserved CC0 credit and natural proportions, and linked Chinese Philosophy.', lock: 'fnv1a64:a6c49911246c6b07',
  },
  'china-confucian-ritual-music': {
    plaqueTitle: 'Ritual and Music',
    invitation: 'Eastern Zhou stone chimes give period context for Confucian arguments that coordinated practice can form emotion and judgment, without proving one unified theory or making hierarchy ethically innocent.',
    objectInterpretation: 'Gary Todd photographed these Eastern Zhou stone chimes at the Eastern Zhou Chariot Burial Museum in Luoyang on 11 June 2011 and released the image under CC0. They provide period context, not instruments known to Confucius or proof of one Confucian doctrine.',
    detail: [
      'Several carved stone chimes hang from a reconstructed wooden frame, making tuned material, bodily performance, and coordinated timing visible. The source record establishes the Luoyang museum setting, photographer, 2011 capture date, and CC0 dedication. It does not identify performers, a Confucian owner, an exact archaeological date, or a philosophical meaning built into the stones.',
      'Confucian texts join ritual and music to learning because ethical formation requires more than knowing a proposition. Greetings, mourning, patterned movement, listening, and ensemble performance can educate attention and feeling within relationships. Musical harmony coordinates differentiated parts rather than making every sound identical, yet the analogy leaves open who assigns roles and whose voice defines order.',
      'Performance can fail through extravagance, empty display, or technically correct action without humaneness. Mohist criticism of lavish music and funerals presses the costs and hierarchy of elite practice, while Confucian defenses ask what cultivated form contributes to shared life. The Confucianism article preserves that disagreement instead of letting an attractive instrument settle it.',
    ],
    sources: [
      {id: 'stone-chimes-commons', label: 'Wikimedia Commons — Eastern Zhou stone musical chimes in Luoyang', url: 'https://commons.wikimedia.org/wiki/File:Eastern_Zhou_Stone_Musical_Chimes_(Bianqing).jpg', kind: 'collection-record'},
      {id: 'confucius-sep', label: 'Stanford Encyclopedia of Philosophy — Confucius', url: 'https://plato.stanford.edu/entries/confucius/', kind: 'academic-reference'},
      {id: 'analects-ctext', label: 'Chinese Text Project — Analects', url: 'https://ctext.org/analects', kind: 'primary-text'},
      {id: 'mohism-sep', label: 'Stanford Encyclopedia of Philosophy — Mohism', url: 'https://plato.stanford.edu/entries/mohism/', kind: 'academic-reference'},
    ],
    sectionSourceIds: [['stone-chimes-commons', 'confucius-sep'], ['confucius-sep', 'analects-ctext'], ['confucius-sep', 'mohism-sep']],
    visitorGuide: [
      {heading: 'Formation through performance', items: [
        {label: 'Embodied learning', description: 'Ritual trains timing, attention, response, and feeling through repeated social practice.', sourceIds: ['confucius-sep', 'analects-ctext']},
        {label: 'Coordinated difference', description: 'Musical harmony relates distinct tones; it does not require every part to become identical.', sourceIds: ['confucius-sep']},
      ]},
      {heading: 'Testing ritual authority', items: [
        {label: 'Empty form', description: 'Correct performance without humaneness can betray the ethical purpose claimed for ritual.', sourceIds: ['confucius-sep', 'analects-ctext']},
        {label: 'Mohist challenge', description: 'Criticism of expense and hierarchy asks who benefits from cultivated ceremonial forms.', sourceIds: ['mohism-sep']},
      ]},
    ],
    articleTitle: 'Confucianism', canonicalContexts: [{kind: 'branch', id: 'confucianism'}], plaqueType: 'concept-argument-diagram-or-method',
    resolution: 'Resolved: corrected the photograph date and Luoyang institution wording, kept the chimes as contextual rather than doctrinal evidence, mapped Confucian and Mohist claims, preserved CC0 credit and natural proportions, and linked Confucianism.', lock: 'fnv1a64:b69e26975c241798',
  },
  'china-analects-layered-record': {
    plaqueTitle: 'The Analects',
    invitation: 'This later printed edition makes the Analects visible as a layered collection shaped by disciples, compilers, editors, and commentators rather than a verbatim book authored by Confucius.',
    objectInterpretation: 'Bjoertvedt photographed this historical printed Analects edition at Stockholm’s Museum of Far Eastern Antiquities in 2010 and released the image under CC BY-SA 3.0. Its edition and print date remain unidentified, and it is not an early manuscript or Confucius’s autograph.',
    detail: [
      'The open volume displays dense vertical columns around a narrow fold, making a later material stage of the received text visible. Its exact source supports the photographer, museum location, 2010 capture date, and license, but supplies no catalogue number, printer, publication date, or claim that this particular copy preserves the earliest wording.',
      'Brief sayings, exchanges, judgments, and portraits acquire meaning through repetition, juxtaposition, and commentary. The collection joins learning, ritual, humaneness, family and political roles, and exemplary conduct without presenting a modern systematic treatise. Its layered formation means that “Confucius says” identifies a received textual voice rather than proving verbatim historical speech.',
      'Compilers, editors, and commentators did not merely carry inert sentences forward; their arrangements and explanations shaped later Confucian education. The Confucius article preserves that history while treating the Analects as philosophically consequential. The printed object witnesses reception and use, not the exact date of a saying, one final authorial intention, or uniform interpretation across traditions.',
    ],
    sources: [
      {id: 'analects-book-commons', label: 'Wikimedia Commons — printed Analects edition in Stockholm', url: 'https://commons.wikimedia.org/wiki/File:Analects.JPG', kind: 'collection-record'},
      {id: 'confucius-sep', label: 'Stanford Encyclopedia of Philosophy — Confucius', url: 'https://plato.stanford.edu/entries/confucius/', kind: 'academic-reference'},
      {id: 'analects-ctext', label: 'Chinese Text Project — Analects', url: 'https://ctext.org/analects', kind: 'primary-text'},
    ],
    sectionSourceIds: [['analects-book-commons', 'confucius-sep'], ['confucius-sep', 'analects-ctext'], ['analects-book-commons', 'confucius-sep']],
    visitorGuide: [
      {heading: 'Reading a layered collection', items: [
        {label: 'Short textual units', description: 'Sayings and encounters gain force through placement, recurrence, and comparison across the collection.', sourceIds: ['confucius-sep', 'analects-ctext']},
        {label: 'Received voice', description: 'Attribution to Confucius does not turn the collection into a stenographic transcript or autograph.', sourceIds: ['confucius-sep']},
      ]},
      {heading: 'Transmission and authority', items: [
        {label: 'Commentarial afterlife', description: 'Editors and commentators helped determine how later readers connected ritual, learning, and humaneness.', sourceIds: ['confucius-sep']},
        {label: 'Later printed witness', description: 'The Stockholm volume demonstrates material reception but lacks an identified print date or edition.', sourceIds: ['analects-book-commons']},
      ]},
    ],
    articleTitle: 'Confucius', canonicalContexts: [{kind: 'philosopher', id: 'confucius'}], plaqueType: 'work-or-text',
    resolution: 'Resolved: retained the later Stockholm printed witness with its unidentified-edition limitation, mapped compilation and interpretation claims, preserved CC BY-SA credit and natural proportions, and linked the current Confucius article.', lock: 'fnv1a64:c5d47186f4f40ee0',
  },
  'china-guodian-laozi': {
    plaqueTitle: 'Guodian Laozi A',
    invitation: 'These Warring States slips from Guodian Tomb M1 preserve selected Laozi-related passages before the received chapter order, complicating both a single finished book and a secure founder biography.',
    objectInterpretation: 'Cangminzho’s 2017 CC BY-SA 4.0 photograph shows the twenty-nine slips identified as Guodian Laozi A in the Jingmen Museum collection. They were unearthed in 1993 from Guodian Tomb M1; the image is material evidence for an early witness, not Laozi’s autograph.',
    detail: [
      'Twenty-nine long slips bearing 1,086 characters are arranged in parallel on a dark display surface. The installed Commons record identifies Laozi A and its Jingmen Museum collection context; the Hubei Provincial Museum’s record for Laozi B independently confirms the Guodian Tomb M1 excavation, Warring States date, three-version find, and original Jingmen custody.',
      'The Guodian groups overlap with passages in the received Daodejing while differing in selection and order. That evidence makes early textual plurality unavoidable but does not prove that every passage had an unrelated origin or that one excavated witness is the sole ancestor of every later edition. Sequence matters because adjacency invites readers to infer contrast, development, or explanation.',
      'No secure numerical lifespan or continuous biography can be recovered for Laozi. Treating Laozi as an attributed textual persona preserves the tradition’s organizing name without converting later legends into contemporary documentation. The Laozi article distinguishes manuscript formation, received philosophical arguments, and later religious identities while the object anchors only one early material stage in that longer history.',
    ],
    sources: [
      {id: 'guodian-a-commons', label: 'Wikimedia Commons — Guodian Laozi A bamboo slips', url: 'https://commons.wikimedia.org/wiki/File:%E9%83%AD%E5%BA%97%E6%A5%9A%E7%AE%80%E3%80%8A%E8%80%81%E5%AD%90%E7%94%B2%E3%80%8B.jpg', kind: 'collection-record'},
      {id: 'guodian-b-hubei', label: 'Hubei Provincial Museum — Laozi B, Guodian Chu manuscripts', url: 'https://www.hbww.org.cn/bambooslips/p/11903.html', kind: 'collection-record'},
      {id: 'laozi-sep', label: 'Stanford Encyclopedia of Philosophy — Laozi', url: 'https://plato.stanford.edu/entries/laozi/', kind: 'academic-reference'},
      {id: 'daodejing-ctext', label: 'Chinese Text Project — Dao De Jing', url: 'https://ctext.org/dao-de-jing', kind: 'primary-text'},
    ],
    sectionSourceIds: [['guodian-a-commons', 'guodian-b-hubei'], ['laozi-sep', 'daodejing-ctext'], ['guodian-a-commons', 'laozi-sep']],
    visitorGuide: [
      {heading: 'What the Guodian slips establish', items: [
        {label: 'Excavated witness', description: 'The slips come from Guodian Tomb M1 and preserve Laozi-related material from the Warring States period.', sourceIds: ['guodian-a-commons', 'guodian-b-hubei']},
        {label: 'Selection and order', description: 'The Guodian groups do not reproduce the received eighty-one-chapter sequence.', sourceIds: ['laozi-sep', 'daodejing-ctext']},
      ]},
      {heading: 'Text and attributed persona', items: [
        {label: 'Not an autograph', description: 'An early manuscript witness does not establish handwriting, sole authorship, or a secure founder biography.', sourceIds: ['laozi-sep', 'guodian-a-commons']},
        {label: 'Plurality with limits', description: 'Variant grouping complicates a single-origin story without making every reconstruction equally plausible.', sourceIds: ['laozi-sep']},
      ]},
    ],
    articleTitle: 'Laozi', canonicalContexts: [{kind: 'philosopher', id: 'laozi'}], plaqueType: 'work-or-text',
    resolution: 'Resolved: replaced unrelated Anhui Daoist slips with the identified Guodian Laozi A witness, added the Hubei excavation record, corrected identity, custody, date, rights, caption, and alt text, mapped textual claims, preserved natural proportions, and linked Laozi.', lock: 'fnv1a64:02589570c47b5be7',
  },
  'china-zhuangzi-butterfly-dream': {
    plaqueTitle: 'The Butterfly Dream',
    invitation: 'Lu Zhi’s later painting receives the Butterfly Dream as a question about waking, identity, and transformation without reducing the passage to the slogan that nothing is real.',
    objectInterpretation: 'Lu Zhi painted Zhuangzi Dreaming of a Butterfly in ink on silk in the mid-sixteenth century. The public-domain image records Ming reception many centuries after the text; its present holding institution is not established by the source record.',
    detail: [
      'A resting scholar appears beneath foliage while a butterfly hovers nearby. The exact Commons page supports Lu Zhi’s attribution, mid-sixteenth-century date, medium, dimensions, and public-domain status, but its exhibition-history reference does not establish current ownership. The painting is a reception image rather than an illustration commissioned for an ancient manuscript.',
      'The passage first inhabits the butterfly’s experience, then waking reflection, then renewed uncertainty about who dreamed whom. It destabilizes confidence that one standpoint automatically supplies the final measure of another. That movement need not erase practical differences between dreaming and waking or make Zhuang Zhou and butterfly simply interchangeable.',
      'The Zhuangzi article situates the episode within transformation, perspective, language, and the limits of certainty. Lu Zhi’s painting necessarily fixes one contemplative scene while the prose moves among states and voices. Keeping that medium difference visible prevents a memorable image from hardening a philosophical performance into one timeless doctrine of illusion.',
    ],
    sources: [
      {id: 'butterfly-commons', label: 'Wikimedia Commons — Lu Zhi, Zhuangzi Dreaming of a Butterfly', url: 'https://commons.wikimedia.org/wiki/File:Dschuang-Dsi-Schmetterlingstraum-Zhuangzi-Butterfly-Dream.jpg', kind: 'collection-record'},
      {id: 'zhuangzi-sep', label: 'Stanford Encyclopedia of Philosophy — Zhuangzi', url: 'https://plato.stanford.edu/entries/zhuangzi/', kind: 'academic-reference'},
      {id: 'zhuangzi-ctext', label: 'Chinese Text Project — Zhuangzi, Discussion on Making All Things Equal', url: 'https://ctext.org/zhuangzi/adjustment-of-controversies', kind: 'primary-text'},
    ],
    sectionSourceIds: [['butterfly-commons', 'zhuangzi-sep'], ['zhuangzi-sep', 'zhuangzi-ctext'], ['butterfly-commons', 'zhuangzi-sep']],
    visitorGuide: [
      {heading: 'Moving between perspectives', items: [
        {label: 'Dream and waking', description: 'Each standpoint interrupts confidence that the other alone defines what the experience means.', sourceIds: ['zhuangzi-sep', 'zhuangzi-ctext']},
        {label: 'Transformation with difference', description: 'Questioning rigid identity does not require every distinction to disappear.', sourceIds: ['zhuangzi-sep', 'zhuangzi-ctext']},
      ]},
      {heading: 'Reading the Ming painting', items: [
        {label: 'Later reception', description: 'Lu Zhi’s work was made many centuries after the ancient textual layers.', sourceIds: ['butterfly-commons']},
        {label: 'Unknown current holder', description: 'The source documents the work but does not securely identify its present holding institution.', sourceIds: ['butterfly-commons']},
      ]},
    ],
    articleTitle: 'Zhuangzi', canonicalContexts: [{kind: 'philosopher', id: 'zhuangzi'}], plaqueType: 'work-or-text',
    resolution: 'Resolved: retained Lu Zhi’s public-domain reception painting, made the undocumented current holder explicit, mapped the passage and interpretive limits, preserved natural proportions, and linked the current Zhuangzi article.', lock: 'fnv1a64:96da15e7eb2624a5',
  },
  'china-zhuangzi-cook-ding': {
    plaqueTitle: 'Cook Ding',
    invitation: 'This later, weakly provenanced illustration receives Cook Ding’s trained responsiveness, including the pauses and caution that disappear when the story becomes a slogan about effortless mastery.',
    objectInterpretation: 'The Commons source labels this low-resolution image a Han-dynasty illustration uploaded from a 1925/Baidu record, but supplies no excavated object, collection, maker, or holding institution. It is retained only as an unverified later reproduction, not documentary Han evidence.',
    detail: [
      'The compact line image shows a cook working around an ox while another figure watches. Its 636-by-518-pixel original is preserved at native detail and public-domain status. Because the source’s Han attribution cannot be independently tied to an institution or object record, the exhibit does not repeat that attribution as established fact or invent a provenance.',
      'Cook Ding describes a transformation in perception through long practice: the undivided ox gives way to joints, spaces, and pathways. Responsive movement follows structure rather than imposing brute force. Yet the cook also becomes alert, slows down, and handles difficult places carefully, so celebrated ease depends on training and recognition of resistance rather than obstacles magically vanishing.',
      'The ruler hears the performance as instruction in nourishing life, extending practical expertise into an analogy for conduct. The Zhuangzi article preserves that philosophical invitation while keeping its limits open: butchery is not ethically neutral, labor is not effortless, and skill does not guarantee a universal method for every political or personal problem.',
    ],
    sources: [
      {id: 'cook-image-commons', label: 'Wikimedia Commons — Cook Ding cutting an ox reproduction', url: 'https://commons.wikimedia.org/wiki/File:Cook_Ding_is_cutting_up_an_ox_-_A_Han_dynasty_illustration_to_the_Zhuang_Zi.jpg', kind: 'collection-record'},
      {id: 'zhuangzi-sep', label: 'Stanford Encyclopedia of Philosophy — Zhuangzi', url: 'https://plato.stanford.edu/entries/zhuangzi/', kind: 'academic-reference'},
      {id: 'cook-ding-ctext', label: 'Chinese Text Project — Zhuangzi, Nourishing the Lord of Life', url: 'https://ctext.org/zhuangzi/nourishing-the-lord-of-life', kind: 'primary-text'},
    ],
    sectionSourceIds: [['cook-image-commons', 'zhuangzi-sep'], ['zhuangzi-sep', 'cook-ding-ctext'], ['zhuangzi-sep', 'cook-ding-ctext']],
    visitorGuide: [
      {heading: 'Anatomy of skilled response', items: [
        {label: 'Perception through practice', description: 'Years of engagement reorganize what the cook notices and how he moves.', sourceIds: ['zhuangzi-sep', 'cook-ding-ctext']},
        {label: 'Difficulty remains', description: 'At complicated places he grows cautious, slows, and acts with precision.', sourceIds: ['cook-ding-ctext']},
      ]},
      {heading: 'Limits of the illustration', items: [
        {label: 'Unverified attribution', description: 'No collection record supports treating the image as a documented Han object.', sourceIds: ['cook-image-commons']},
        {label: 'Analogy, not recipe', description: 'The story invites reflection on conduct without making every task equivalent to butchery.', sourceIds: ['zhuangzi-sep', 'cook-ding-ctext']},
      ]},
    ],
    articleTitle: 'Zhuangzi', canonicalContexts: [{kind: 'philosopher', id: 'zhuangzi'}], plaqueType: 'work-or-text',
    resolution: 'Resolved: retained the native-scale public-domain reproduction only with its unverified attribution and unknown holder explicit, mapped the skill interpretation to the text and scholarship, preserved natural proportions, and linked Zhuangzi.', lock: 'fnv1a64:0a50a8c71ecb4da2',
  },
  'china-mohist-siege-defense': {
    plaqueTitle: 'Mohist Siege Defense',
    invitation: 'This modern reconstruction makes defensive engineering visible beside Mohist opposition to aggressive war, while keeping technical effectiveness answerable to ends, institutions, risks, and public benefit.',
    objectInterpretation: 'Sindala created this 2014 CC0 diagram as a modern reconstruction of a traction trebuchet based on Mozi 52.26 and later scholarship. It is not a surviving Mohist drawing, ancient blueprint, or excavated machine.',
    detail: [
      'The diagram labels a reconstructed machine against a plain field, offering a readable model rather than archaeological documentation. Its exact Commons record supports Sindala’s authorship, 2014 date, CC0 dedication, and stated textual basis. It cannot verify one original design, prove that Mohists built this precise form, or convert an interpretive reconstruction into a period object.',
      'Mohist arguments condemn aggressive war by comparing its deaths, deprivation, labor, and disorder with the gains rulers celebrate. Defensive chapters nevertheless preserve fortification, signals, machines, supplies, and coordinated expertise. The pairing distinguishes protection from conquest without treating technical knowledge as morally pure or separating engineering from institutions that command and use it.',
      'Calling an intervention defensive does not settle who defines the threat, who bears risk, or whether expertise prevents harm or extends conflict. The Mohism article connects impartial concern and public benefit to these questions. The object can prompt evaluation of means and consequences, but ethical justification must come from arguments and accountable social purposes rather than mechanical ingenuity.',
    ],
    sources: [
      {id: 'jiche-commons', label: 'Wikimedia Commons — Jiche traction-trebuchet reconstruction', url: 'https://commons.wikimedia.org/wiki/File:Jiche_Catapult.PNG', kind: 'collection-record'},
      {id: 'mohism-sep', label: 'Stanford Encyclopedia of Philosophy — Mohism', url: 'https://plato.stanford.edu/entries/mohism/', kind: 'academic-reference'},
      {id: 'mozi-ctext', label: 'Chinese Text Project — Mozi', url: 'https://ctext.org/mozi', kind: 'primary-text'},
    ],
    sectionSourceIds: [['jiche-commons', 'mozi-ctext'], ['mohism-sep', 'mozi-ctext'], ['jiche-commons', 'mohism-sep']],
    visitorGuide: [
      {heading: 'Aggression and protection', items: [
        {label: 'Comparative harm', description: 'Mohist anti-war arguments test conquest by deaths, deprivation, labor, disorder, and benefit.', sourceIds: ['mohism-sep', 'mozi-ctext']},
        {label: 'Organized defense', description: 'Fortifications and machines require specialists, supplies, signals, and institutional coordination.', sourceIds: ['mohism-sep', 'mozi-ctext']},
      ]},
      {heading: 'Reading the reconstruction', items: [
        {label: 'Modern diagram', description: 'Sindala’s image interprets a textual passage; it is not a surviving Mohist blueprint.', sourceIds: ['jiche-commons']},
        {label: 'Ends remain public', description: 'Technical success does not remove questions about authority, risk, and whose benefit counts.', sourceIds: ['mohism-sep']},
      ]},
    ],
    articleTitle: 'Mohism', canonicalContexts: [{kind: 'branch', id: 'mohism'}], plaqueType: 'concept-argument-diagram-or-method',
    resolution: 'Resolved: retained the verified CC0 modern reconstruction, made its non-ancient status explicit, mapped defensive technique and anti-aggression claims, preserved natural proportions, and linked the current Mohism article.', lock: 'fnv1a64:880d7729a86f2842',
  },
  'china-later-mohist-canons': {
    plaqueTitle: 'The Later Mohist Canons',
    invitation: 'This undated printed Mozi page introduces later Mohist work on names, models, knowledge, and inference while preserving damaged transmission and refusing to assign the Canons directly to Mozi.',
    objectInterpretation: 'The low-resolution public-domain source identifies this as a printed page from volume seven of the Mozi but gives no printer, date, edition, catalogue, or holding institution. The page is a later textual witness and is not proven to contain the Canons themselves.',
    detail: [
      'The page’s dense vertical columns and marginal structure make later print transmission visible at only 268 by 355 pixels. The source supports the broad volume-seven identification and public-domain marking, while its missing institution and edition history remain explicit. The exhibit therefore does not infer a precise date, claim an ancient autograph, or use the page layout as a technical diagram.',
      'Books 40–45 of the received Mozi preserve compressed canons and explanations concerned with names, kinds, knowledge, sameness and difference, causes, models, and forms of inference. Their difficult wording and textual damage have produced rival reconstructions. Comparison with modern logic can clarify a question, but it can also impose categories that obscure ancient vocabulary and practical argumentative settings.',
      'Later Mohist inquiry extends the movement’s demand for publicly inspectable standards without becoming a transcript of the remembered founder Mozi. The Mozi article separates founder, organized communities, layered anthology, defensive books, and later Canons. That distinction keeps textual reconstruction visible and prevents a late printed witness from falsely collapsing authorship, composition, and reception into one moment.',
    ],
    sources: [
      {id: 'mozi-page-commons', label: 'Wikimedia Commons — printed page from Mozi, volume seven', url: 'https://commons.wikimedia.org/wiki/File:Mozi.jpg', kind: 'collection-record'},
      {id: 'mohist-canons-sep', label: 'Stanford Encyclopedia of Philosophy — Mohist Canons', url: 'https://plato.stanford.edu/entries/mohist-canons/', kind: 'academic-reference'},
      {id: 'mozi-ctext', label: 'Chinese Text Project — Mozi', url: 'https://ctext.org/mozi', kind: 'primary-text'},
    ],
    sectionSourceIds: [['mozi-page-commons', 'mohist-canons-sep'], ['mohist-canons-sep', 'mozi-ctext'], ['mozi-page-commons', 'mohist-canons-sep']],
    visitorGuide: [
      {heading: 'Reconstructing the Canons', items: [
        {label: 'Compressed text', description: 'Brief canons and explanations survive with damage and disputed readings.', sourceIds: ['mohist-canons-sep', 'mozi-ctext']},
        {label: 'Names and models', description: 'Mohist inquiry connects distinctions and standards to practical, contestable reasoning.', sourceIds: ['mohist-canons-sep']},
      ]},
      {heading: 'Keeping authorship distinct', items: [
        {label: 'Later Mohist stratum', description: 'The Canons belong to later Mohist communities rather than direct sayings securely attributable to Mozi.', sourceIds: ['mohist-canons-sep']},
        {label: 'Unidentified edition', description: 'The installed page has no verified printer, date, catalogue, holder, or demonstrated Canon passage.', sourceIds: ['mozi-page-commons']},
      ]},
    ],
    articleTitle: 'Mozi', canonicalContexts: [{kind: 'philosopher', id: 'mozi'}], plaqueType: 'work-or-text',
    resolution: 'Resolved: retained the native-scale public-domain page only as an undated, holder-unidentified printed witness, mapped Canon claims to specialist and primary sources, separated later Mohists from Mozi, preserved natural proportions, and linked Mozi.', lock: 'fnv1a64:67e7f49f104f539f',
  },
};

const reviewGallery06Exhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const evidence = gallery06ReviewEvidence[input.id];
  if (!evidence) throw new Error(`Missing Gallery 06 review evidence for ${input.id}.`);
  const basePresentation = input.presentation;
  if (!basePresentation) throw new Error(`Missing Gallery 06 presentation for ${input.id}.`);
  return {
    ...input,
    sections: [
      {heading: '', paragraphs: [`${input.lead} ${evidence.detail[0]} ${input.sections[0].paragraphs.join(' ')}`], sourceIds: evidence.sectionSourceIds[0]},
      {heading: '', paragraphs: [`${input.sections[1].paragraphs.join(' ')} ${evidence.detail[1]} ${input.keyIdeas.join(' ')}`], sourceIds: evidence.sectionSourceIds[1]},
      {heading: '', paragraphs: [`${input.sections[2].paragraphs.join(' ')} ${evidence.detail[2]} ${input.cautions.join(' ')}`], sourceIds: evidence.sectionSourceIds[2]},
    ],
    visitorGuide: evidence.visitorGuide,
    sources: evidence.sources,
    objectInterpretation: evidence.objectInterpretation,
    presentation: {
      ...basePresentation,
      panelKicker: 'Gallery 06 supplemental exhibit',
      articleActionLabel: `Read the full sourced ${evidence.articleTitle} article`,
      exhibitLayout: 'object-led',
    },
    wallPlaque: {type: evidence.plaqueType, title: evidence.plaqueTitle, invitation: evidence.invitation, canonicalContexts: evidence.canonicalContexts},
    review: {
      status: 'standard-compliant', reviewedOn: '2026-08-12', method: gallery06ReviewMethod,
      resolution: evidence.resolution, lock: evidence.lock,
      visualReview: {
        desktop: {reviewedOn: '2026-08-12', viewport: '1440×900', evidence: `Direct route inspected with the installed object, three-paragraph interpretation, subject-specific sidebar, article CTA, and no horizontal overflow. Evidence: docs/visual-validation/gallery-06-supplementals/desktop/${input.id}.png`},
        mobile: {reviewedOn: '2026-08-12', viewport: '390×844', evidence: `Direct route inspected with wrapped copy, loaded full-composition object preview, scrollable interpretation, visible controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-06-supplementals/mobile/${input.id}.png`},
        threeDimensional: {reviewedOn: '2026-08-12', viewport: '1280×720 fresh direct-route session', evidence: `Fresh-session authored viewpoint inspected with a live 3D canvas, closed detail panel, readable factual plaque, distinct installation, and image mounted at its natural scene ratio. Evidence: docs/visual-validation/gallery-06-supplementals/staged-3d/${input.id}.png`},
      },
    },
  };
};

export const CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBITS = [
  ...exhibits,
  ...CLASSICAL_CHINESE_WALL_FILL_EXHIBITS,
].map(reviewGallery06Exhibit) as readonly MuseumSupplementalExhibit[];

/**
 * Every layout consumes one of the curation contract's twelve non-primary
 * slots. No transform is duplicated here: the room/face geometry remains
 * authoritative in classicalChineseGalleryCuration.ts.
 */
export const CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'china-warring-states-courts', parentExhibitId: 'chinese-philosophy', slotId: 'china-many-ways:west-outer', assetId: 'china-warring-states-map-260-bce', mediaWidth: 2.65, mediaHeight: 2.438828125, installationKind: classicalChineseKind('context'), accent: CLASSICAL_CHINESE_PALETTE.bronze}),
  layout({id: 'china-excavated-bamboo-texts', parentExhibitId: 'chinese-philosophy', slotId: 'china-many-ways:east-room-face', assetId: 'china-warring-states-bamboo-slips', mediaWidth: 3.05, mediaHeight: 2.034921875, installationKind: classicalChineseKind('work'), accent: CLASSICAL_CHINESE_PALETTE.jade, authoredViewpointTarget: true}),
  layout({id: 'china-writing-on-bamboo', parentExhibitId: 'chinese-philosophy', slotId: 'china-many-ways:east-cross-face', assetId: 'china-making-bamboo-slips', mediaWidth: 1.634609375, mediaHeight: 2.45, installationKind: classicalChineseKind('context'), accent: CLASSICAL_CHINESE_PALETTE.bamboo}),
  layout({id: 'china-gongsun-long-white-horse', parentExhibitId: 'chinese-philosophy', slotId: 'china-many-ways:south-room-face', assetId: 'china-gongsun-long-yuan-portrait', mediaWidth: 1.741796875, mediaHeight: 2.45, installationKind: classicalChineseKind('concept'), accent: CLASSICAL_CHINESE_PALETTE.indigo, authoredViewpointTarget: true}),
  layout({id: 'china-sunzi-strategic-reason', parentExhibitId: 'chinese-philosophy', slotId: 'china-many-ways:south-cross-face', assetId: 'china-sunzi-art-of-war-slips', mediaWidth: 3.05, mediaHeight: 2.034921875, installationKind: classicalChineseKind('work'), accent: CLASSICAL_CHINESE_PALETTE.lacquer}),
  layout({id: 'china-analects-layered-record', parentExhibitId: 'confucius', slotId: 'china-confucian-cultivation:west-cross-face', assetId: 'china-analects-stockholm', mediaWidth: 3.05, mediaHeight: 2.034921875, installationKind: classicalChineseKind('work'), accent: CLASSICAL_CHINESE_PALETTE.lacquer}),
  layout({id: 'china-confucian-ritual-music', parentExhibitId: 'confucianism', slotId: 'china-confucian-cultivation:south-cross-face', assetId: 'china-eastern-zhou-stone-chimes', mediaWidth: 3.05, mediaHeight: 2.034921875, installationKind: classicalChineseKind('context'), accent: CLASSICAL_CHINESE_PALETTE.bronze}),
  layout({id: 'china-guodian-laozi', parentExhibitId: 'laozi', slotId: 'china-daoist-way:east-cross-face', assetId: 'china-guodian-daoist-bamboo-slips', mediaWidth: 3.05, mediaHeight: 2.18265625, installationKind: classicalChineseKind('work'), accent: CLASSICAL_CHINESE_PALETTE.jade}),
  layout({id: 'china-zhuangzi-butterfly-dream', parentExhibitId: 'zhuangzi', slotId: 'china-daoist-way:north-room-face', assetId: 'china-zhuangzi-butterfly-dream', mediaWidth: 2.415546875, mediaHeight: 2.45, installationKind: classicalChineseKind('concept'), accent: CLASSICAL_CHINESE_PALETTE.indigo, authoredViewpointTarget: true}),
  layout({id: 'china-zhuangzi-cook-ding', parentExhibitId: 'zhuangzi', slotId: 'china-daoist-way:north-cross-face', assetId: 'china-zhuangzi-cook-ding', mediaWidth: 3, mediaHeight: 2.443396226415094, installationKind: classicalChineseKind('concept'), accent: CLASSICAL_CHINESE_PALETTE.bamboo}),
  layout({id: 'china-later-mohist-canons', parentExhibitId: 'mozi', slotId: 'china-mohist-fa:west-cross-face', assetId: 'china-mozi-volume-seven-page', mediaWidth: 1.55, mediaHeight: 2.053171641791045, installationKind: classicalChineseKind('work'), accent: CLASSICAL_CHINESE_PALETTE.jade}),
  layout({id: 'china-mohist-siege-defense', parentExhibitId: 'mohism', slotId: 'china-mohist-fa:north-cross-face', assetId: 'china-mozi-jiche-catapult', mediaWidth: 2.85, mediaHeight: 2.444765625, installationKind: classicalChineseKind('context'), accent: CLASSICAL_CHINESE_PALETTE.lacquer}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getClassicalChineseSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 06 supplemental exhibit ${id} is missing.`);
  return record;
};
