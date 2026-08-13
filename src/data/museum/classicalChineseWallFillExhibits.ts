import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {MuseumSupplementalExhibitId} from './museumWorldTypes';

type WallFillInput = {
  id: string;
  assetId: string;
  displayName: string;
  shortTitle: string;
  workLabel: string;
  dateLabel: string;
  question: string;
  frontSubtitle: string;
  lead: string;
  keyIdeas: readonly string[];
  cautions: readonly string[];
  sections: MuseumSupplementalExhibit['sections'];
  imageSource: {label: string; url: string};
  reference: {label: string; url: string};
  articleRoute: MuseumSupplementalExhibit['articleRoute'];
  entityKind: 'philosopher' | 'branch';
};

const wallFill = (input: WallFillInput): MuseumSupplementalExhibit => ({
  id: input.id as MuseumSupplementalExhibitId,
  assetId: input.assetId as MuseumAssetId,
  panelAssetId: input.assetId as MuseumAssetId,
  displayName: input.displayName,
  shortTitle: input.shortTitle,
  workLabel: input.workLabel,
  dateLabel: input.dateLabel,
  question: input.question,
  frontSubtitle: input.frontSubtitle,
  lead: input.lead,
  keyIdeas: input.keyIdeas,
  cautions: input.cautions,
  sections: input.sections,
  sources: [
    {...input.imageSource, kind: 'collection-record'},
    {...input.reference, kind: 'academic-reference'},
  ],
  articleRoute: input.articleRoute,
  presentation: {
    panelKicker: 'Gallery 06 supplemental exhibit',
    proximityKicker: input.workLabel,
    factRows: [
      {label: 'Focus', value: input.shortTitle},
      {label: 'Question', value: input.question},
      {label: 'Method', value: 'Object, text, and historical context'},
    ],
    articleActionLabel: input.entityKind === 'philosopher' ? 'Open the thinker in the Atlas' : 'Open the tradition in the Atlas',
    entityKind: input.entityKind,
  },
});

const chineseReference = {
  label: 'Internet Encyclopedia of Philosophy — Chinese Philosophy',
  url: 'https://iep.utm.edu/chinese-philosophy-overview-of-topics/',
};
const confucianReference = {
  label: 'Stanford Encyclopedia of Philosophy — Confucius',
  url: 'https://plato.stanford.edu/entries/confucius/',
};
const zhuangziReference = {
  label: 'Stanford Encyclopedia of Philosophy — Zhuangzi',
  url: 'https://plato.stanford.edu/entries/zhuangzi/',
};
const mohismReference = {
  label: 'Stanford Encyclopedia of Philosophy — Mohism',
  url: 'https://plato.stanford.edu/entries/mohism/',
};

/**
 * Six secondary installations that complete otherwise usable Gallery 06 wall
 * faces. Each remains a substantial, interactive exhibit rather than décor.
 */
export const CLASSICAL_CHINESE_WALL_FILL_EXHIBITS = [
  wallFill({
    id: 'china-writing-on-bamboo',
    assetId: 'china-making-bamboo-slips',
    displayName: 'Writing on Bamboo: Argument as Material Practice',
    shortTitle: 'Writing on Bamboo',
    workLabel: 'TEXTUAL CULTURE · BAMBOO, INK, AND ORDER',
    dateLabel: 'Modern museum reconstruction of an early writing process',
    question: 'How does a philosophical argument depend on the material form that carries it?',
    frontSubtitle: 'Cutting, smoothing, binding, inscribing, reordering, and preserving a text',
    lead: 'A philosophical text did not arrive as a modern bound book. Bamboo had to be prepared, inscribed, tied into sequences, carried, copied, and repaired. A broken cord could change order; damaged slips could erase transitions; later editors could join materials in new ways. The museum reconstruction makes those conditions visible without pretending to be an untouched ancient workshop.',
    keyIdeas: [
      'Textual order was a material achievement rather than an invisible given.',
      'Copying and compilation help explain why early works can contain layers and tensions.',
      'Excavated witnesses can challenge assumptions created by later received editions.',
    ],
    cautions: [
      'The photographed display is a modern reconstruction, not a Warring States workshop.',
      'Material instability does not mean that every proposed reordering is equally plausible.',
    ],
    sections: [
      {heading: 'A sequence had to be built', paragraphs: ['Individual slips were cut to size, written vertically, and connected by cords. A reader handled an ordered physical bundle, not an abstract stream of words. The form shaped storage, transport, correction, and the amount of text that could remain together.']},
      {heading: 'Damage becomes evidence', paragraphs: ['Missing ties, displaced slips, variant graphs, and repeated passages give scholars clues about copying and compilation. They also set limits: reconstruction must distinguish the marks on an object from a modern editor’s proposed sequence.']},
      {heading: 'Philosophical authorship looks different', paragraphs: ['Many early Chinese works are best approached as textual traditions with multiple strata, voices, and communities of transmission. Seeing the labor behind the object helps visitors resist imagining every received book as one person’s finished manuscript.']},
    ],
    imageSource: {label: 'Wikimedia Commons — The Making of Bamboo Slips and Writing', url: 'https://commons.wikimedia.org/wiki/File:The_Making_of_Bamboo_Slips_and_Writing_(10160906513).jpg'},
    reference: chineseReference,
    articleRoute: {kind: 'branch', branchId: 'chinese-philosophy'},
    entityKind: 'branch',
  }),
  wallFill({
    id: 'china-confucian-ritual-music',
    assetId: 'china-eastern-zhou-stone-chimes',
    displayName: 'Confucian Ritual and Music: Formation Through Coordinated Practice',
    shortTitle: 'Ritual and Music',
    workLabel: 'CONFUCIAN TRADITIONS · RITUAL AND MUSIC',
    dateLabel: 'Eastern Zhou stone chimes · exact date uncertain',
    question: 'How can patterned performance cultivate judgment, feeling, and relationship?',
    frontSubtitle: 'Timing, attention, role, emotion, coordination, and political order',
    lead: 'Stone chimes make ethical formation audible and bodily. In Confucian traditions, ritual and music are not ornamental additions to rules. Repeated, coordinated practices can train attention, shape emotion, clarify roles, and make regard for others habitual. Yet the same forms can harden hierarchy or become empty performance, a danger early texts recognize rather than ignore.',
    keyIdeas: [
      'Ritual cultivation works through embodied repetition, timing, and social coordination.',
      'Music can order emotion without treating feeling as an enemy of reason.',
      'Good form requires humane purpose; performance alone does not guarantee virtue.',
    ],
    cautions: [
      'The chimes provide period context but do not prove one unified Confucian theory of music.',
      'Cultivation through roles can sustain care and also reproduce unjust hierarchy.',
    ],
    sections: [
      {heading: 'Formation exceeds instruction', paragraphs: ['A person may know a rule while lacking the perception, timing, and disposition needed to act well. Ritual practice trains those capacities through greetings, mourning, deference, music, and shared attention to circumstance.']},
      {heading: 'Harmony is coordinated difference', paragraphs: ['An ensemble does not become harmonious by making every sound identical. Confucian uses of musical analogy often link order with differentiated parts responding appropriately to one another, while leaving open who defines the roles and whose voices are heard.']},
      {heading: 'The performance can fail', paragraphs: ['Early Confucian arguments distinguish living ritual from hollow display. Costly ceremony, rigid status, or technically correct action without humaneness can betray the practice’s ethical aim. Mohist criticism in the adjoining room presses that challenge further.']},
    ],
    imageSource: {label: 'Wikimedia Commons — Eastern Zhou Stone Musical Chimes', url: 'https://commons.wikimedia.org/wiki/File:Eastern_Zhou_Stone_Musical_Chimes_(Bianqing).jpg'},
    reference: confucianReference,
    articleRoute: {kind: 'branch', branchId: 'confucianism'},
    entityKind: 'branch',
  }),
  wallFill({
    id: 'china-zhuangzi-butterfly-dream',
    assetId: 'china-zhuangzi-butterfly-dream',
    displayName: 'Zhuangzi’s Butterfly Dream: Perspective and Transformation',
    shortTitle: 'The Butterfly Dream',
    workLabel: 'ZHUANGZI · DREAM, WAKING, AND TRANSFORMATION',
    dateLabel: 'Ming reception painting by Lu Zhi · mid-16th century',
    question: 'What makes one perspective the final measure of another?',
    frontSubtitle: 'Dreaming, waking, identity, transformation, and the limits of certainty',
    lead: 'The brief butterfly dream is memorable because it does not simply announce that waking life is unreal. It destabilizes an easy hierarchy between two experienced perspectives: Zhuang Zhou dreaming he is a butterfly and Zhuang Zhou awake, wondering about the dream. The later painting slows that movement into a scene while the text keeps identity and transformation unsettled.',
    keyIdeas: [
      'The passage questions confidence in a single fixed standpoint.',
      'Transformation need not erase the practical differences between dream and waking.',
      'The story performs philosophical uncertainty rather than replacing it with a doctrine.',
    ],
    cautions: [
      'The painting was made many centuries after the text and is a reception image.',
      'The episode should not be reduced to the slogan that nothing is real.',
    ],
    sections: [
      {heading: 'Two perspectives interrupt each other', paragraphs: ['Within the dream, the butterfly’s life is complete and untroubled by being Zhuang Zhou. On waking, the remembered dream becomes an object of reflection. The story then turns again: which standpoint has authority to define the other?']},
      {heading: 'Difference remains', paragraphs: ['The text can question rigid identity without claiming that every distinction disappears. Dreaming and waking function differently; Zhuang Zhou and butterfly are not simply interchangeable. Their difference belongs to the very process called the transformation of things.']},
      {heading: 'An image fixes what the story moves', paragraphs: ['Lu Zhi’s painting offers a resting figure and visible butterfly, allowing contemplation of the episode. The museum keeps the medium’s limit explicit: the ancient prose pivots among voices and states more quickly than one later scene can show.']},
    ],
    imageSource: {label: 'Wikimedia Commons — Zhuangzi Butterfly Dream by Lu Zhi', url: 'https://commons.wikimedia.org/wiki/File:Dschuang-Dsi-Schmetterlingstraum-Zhuangzi-Butterfly-Dream.jpg'},
    reference: zhuangziReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'zhuangzi'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'china-zhuangzi-cook-ding',
    assetId: 'china-zhuangzi-cook-ding',
    displayName: 'Cook Ding: Skill Without Forced Control',
    shortTitle: 'Cook Ding',
    workLabel: 'ZHUANGZI · SKILL AND NOURISHING LIFE',
    dateLabel: 'Later historical illustration of an ancient textual episode',
    question: 'What kind of knowledge becomes possible when trained responsiveness replaces force?',
    frontSubtitle: 'Practice, perception, timing, resistance, and the danger of romanticizing mastery',
    lead: 'Cook Ding’s blade moves through the spaces within an ox because years of practice have transformed how he perceives the task. He no longer confronts the animal as an undivided obstacle to overpower. The story links skill with responsive attention, but it also shows pauses, difficulty, and care—features often lost when the episode becomes a slogan about effortless performance.',
    keyIdeas: [
      'Expertise changes perception, not only speed or muscular control.',
      'Non-forcing responds to the grain and structure of a situation.',
      'Mastery still includes caution when the situation becomes difficult.',
    ],
    cautions: [
      'The later illustration is not a Han-period documentary image.',
      'The story should not excuse violence, erase labor, or promise effortless success without training.',
    ],
    sections: [
      {heading: 'Practice reorganizes attention', paragraphs: ['At first the cook saw the whole ox; later he encountered joints, spaces, and pathways. The contrast suggests that skilled perception is learned through repeated engagement rather than delivered by detached theory alone.']},
      {heading: 'Ease includes stopping', paragraphs: ['When Cook Ding reaches a complicated place, he becomes alert, slows down, and moves with precision. The story’s celebrated ease therefore depends on recognizing resistance rather than pretending that obstacles have vanished.']},
      {heading: 'The ruler asks how to live', paragraphs: ['The episode is framed as instruction in nourishing life, not merely praise of butchery. Its analogy remains provocative: practical skill can model adaptive conduct, yet visitors should still ask where the analogy breaks and whose labor the elegant performance conceals.']},
    ],
    imageSource: {label: 'Wikimedia Commons — Cook Ding cutting up an ox', url: 'https://commons.wikimedia.org/wiki/File:Cook_Ding_is_cutting_up_an_ox_-_A_Han_dynasty_illustration_to_the_Zhuang_Zi.jpg'},
    reference: zhuangziReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'zhuangzi'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'china-later-mohist-canons',
    assetId: 'china-mozi-volume-seven-page',
    displayName: 'Later Mohist Canons: Names, Models, and Argument',
    shortTitle: 'The Later Mohist Canons',
    workLabel: 'MOHIST TEXTS · NAMES, MODELS, AND REASONS',
    dateLabel: 'Historical printed witness to a layered text',
    question: 'How can distinctions and models make public reasoning more reliable?',
    frontSubtitle: 'Definitions, names, comparison, standards, inference, and difficult transmission',
    lead: 'The compact and difficult chapters called the Later Mohist Canons examine names, kinds, models, causes, knowledge, and forms of reasoning. They belong to a later stratum of the Mozi rather than a transcript of one founder’s teaching. Their survival invites reconstruction while warning against forcing early Chinese argument into a ready-made modern system of logic.',
    keyIdeas: [
      'Public standards require careful attention to names, kinds, and relevant similarities.',
      'The canons connect reasoning with practical judgment rather than isolating formal symbols.',
      'Textual damage and compression make interpretation unusually dependent on reconstruction.',
    ],
    cautions: [
      '“Logic” can be a useful comparison but is not a neutral translation of every Mohist category.',
      'The printed page is a later witness, not an ancient autograph or optical diagram.',
    ],
    sections: [
      {heading: 'Names can guide and mislead', paragraphs: ['Mohist discussions ask how a name picks out a kind and when two cases count as relevantly alike. These questions matter because argument, administration, and ethical recommendation all depend on distinctions that others can inspect and contest.']},
      {heading: 'Models are practical standards', paragraphs: ['A model or standard can coordinate judgment without making every situation identical. The hard question is why a proposed model should govern a case and whether its application actually produces the public benefit its defender promises.']},
      {heading: 'The text resists easy system building', paragraphs: ['Brief formulations, damaged transmission, and ancient commentarial layers generate rival readings. The exhibit treats that difficulty as part of the evidence, distinguishing the text’s surviving words from modern efforts to map them onto formal logic, science, or semantics.']},
    ],
    imageSource: {label: 'Wikimedia Commons — historical printed page from Mozi, volume 7', url: 'https://commons.wikimedia.org/wiki/File:Mozi.jpg'},
    reference: mohismReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'mozi'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'china-mohist-siege-defense',
    assetId: 'china-mozi-jiche-catapult',
    displayName: 'Siege Defense and the Ethics of Consequences',
    shortTitle: 'Mohist Siege Defense',
    workLabel: 'MOHISM · DEFENSE, EXPERTISE, AND BENEFIT',
    dateLabel: 'Modern reconstruction diagram based on a passage in the Mozi',
    question: 'Can technical expertise oppose aggressive war without becoming morally neutral?',
    frontSubtitle: 'Fortification, counter-siege knowledge, impartial concern, and political consequence',
    lead: 'The Mozi condemns aggressive war yet preserves extensive discussions of defensive technique. That pairing is philosophically demanding: technical knowledge can protect vulnerable communities, but the same knowledge belongs to a world of organized violence. The modern catapult diagram is therefore a prompt for examining how consequences, expertise, and responsibility interact—not an ancient blueprint.',
    keyIdeas: [
      'Mohist opposition to aggression coexists with practical preparation for defense.',
      'Expert knowledge acquires ethical meaning through ends, institutions, and consequences.',
      'Public benefit must include those outside a ruler’s immediate circle.',
    ],
    cautions: [
      'The diagram is a modern reconstruction and not a surviving Mohist illustration.',
      'Defensive purpose does not automatically remove every moral cost of military technology.',
    ],
    sections: [
      {heading: 'Anti-war reasoning is comparative', paragraphs: ['Mohist texts compare the deaths, deprivation, labor, and disorder caused by attack with the prestige or territory claimed by rulers. The mismatch exposes aggression as a failure of the same benefit standard used to judge ordinary theft and harm.']},
      {heading: 'Defense needs organized knowledge', paragraphs: ['Fortifications, signals, machines, supplies, and disciplined coordination require specialists and institutions. The texts therefore place philosophy beside engineering and administration, asking how practical competence can serve an ethical argument.']},
      {heading: 'Means remain answerable to ends', paragraphs: ['Calling an intervention defensive does not settle every case. Visitors can ask who defines the threat, who bears risk, and whether expertise prevents harm or extends conflict. Mohist impartial concern makes those consequences public questions rather than a ruler’s private calculation.']},
    ],
    imageSource: {label: 'Wikimedia Commons — Jiche Catapult reconstruction', url: 'https://commons.wikimedia.org/wiki/File:Jiche_Catapult.PNG'},
    reference: mohismReference,
    articleRoute: {kind: 'branch', branchId: 'mohism'},
    entityKind: 'branch',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];
