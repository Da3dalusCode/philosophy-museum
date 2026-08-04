import type {MuseumAssetId} from './museumAssetTypes';
import {
  getMoralLifePracticalReasonInstallationSlot,
  MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID,
  MORAL_LIFE_PRACTICAL_REASON_ROOM_SIGN_COPY,
} from './moralLifePracticalReasonGalleryCuration';
import type {MoralLifePracticalReasonGalleryAssetId} from './moralLifePracticalReasonGalleryAssets';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
} from './museumSupplementalAuthoring';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export {
  MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID,
  MORAL_LIFE_PRACTICAL_REASON_ROOM_SIGN_COPY,
};

export const MORAL_LIFE_PRACTICAL_REASON_PALETTE = Object.freeze({
  ink: '#27242a',
  practice: '#8a6846',
  virtue: '#55745f',
  duty: '#536a83',
  utility: '#8a7041',
  rights: '#7b586a',
  future: '#496f75',
  parchment: '#e9dfcd',
});

export type MoralLifePracticalReasonSupplementalExhibitId =
  | 'ethics-confucian-ritual-practice'
  | 'ethics-jain-nonviolence-practice'
  | 'ethics-buddhist-discipline-compassion'
  | 'ethics-care-attention-practice'
  | 'ethics-labor-social-position'
  | 'virtue-practice-habituation'
  | 'murdoch-kestrel-unselfing'
  | 'foot-natural-goodness'
  | 'duty-kant-autonomy'
  | 'utility-bentham-reform'
  | 'utility-equality-inclusion'
  | 'utility-public-health-welfare'
  | 'thomson-violinist-bodily-rights'
  | 'thomson-bodily-autonomy-context'
  | 'parfit-psychological-continuity'
  | 'parfit-future-generations';

type MoralParent =
  | 'ethics'
  | 'virtue-ethics'
  | 'iris-murdoch'
  | 'philippa-foot'
  | 'deontology'
  | 'utilitarianism'
  | 'judith-thomson'
  | 'derek-parfit';

type CuratedInput = {
  id: MoralLifePracticalReasonSupplementalExhibitId;
  assetId: MoralLifePracticalReasonGalleryAssetId;
  parent: MoralParent;
  entityKind: 'branch' | 'philosopher';
  displayName: string;
  shortTitle: string;
  focus: string;
  dateLabel: string;
  question: string;
  lead: string;
  ideas: readonly [string, string, string];
  cautions: readonly [string, string];
  imageSource: string;
  academicLabel: string;
  academicUrl: string;
};

const image = (url: string) => ({
  label: 'Wikimedia Commons — displayed object or image record',
  url,
  kind: 'collection-record' as const,
});
const academic = (label: string, url: string) => ({
  label,
  url,
  kind: 'academic-reference' as const,
});

const curated = (input: CuratedInput): MuseumSupplementalExhibit =>
  authorSupplementalExhibit({
    id: input.id as MuseumSupplementalExhibitId,
    assetId: input.assetId as MuseumAssetId,
    displayName: input.displayName,
    shortTitle: input.shortTitle,
    workLabel: input.focus,
    dateLabel: input.dateLabel,
    question: input.question,
    frontSubtitle: input.question,
    lead: input.lead,
    keyIdeas: input.ideas,
    cautions: input.cautions,
    sections: [
      {heading: 'Look closely', paragraph: input.ideas[0]},
      {heading: 'Historical argument', paragraph: input.ideas[1]},
      {heading: 'What remains at stake', paragraph: input.ideas[2]},
    ],
    sources: [
      image(input.imageSource),
      academic(input.academicLabel, input.academicUrl),
    ],
    articleRoute: input.entityKind === 'philosopher'
      ? {kind: 'philosopher', philosopherId: input.parent}
      : {kind: 'branch', branchId: input.parent},
    entityKind: input.entityKind,
    panelKicker: 'Gallery 24 work and context exhibit',
  });

export const MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBITS = [
  curated({
    id: 'ethics-confucian-ritual-practice',
    assetId: 'moral-ethics-confucian-apricot-platform',
    parent: 'ethics',
    entityKind: 'branch',
    displayName: 'Ritual as Moral Formation',
    shortTitle: 'Confucian Ritual Practice',
    focus: 'CONFUCIAN ETHICS · RITUAL, ROLE, CULTIVATION, AND RELATION',
    dateLabel: 'Confucian traditions from ancient China · displayed memorial site photographed 2005',
    question: 'Can repeated forms of conduct educate perception and feeling rather than merely enforce conformity?',
    lead: 'Confucian moral thought begins from relationships, learned forms, and the cultivation of responsive judgment. Ritual, or li, includes ceremonies but also greeting, mourning, deference, music, family conduct, and civic practice. The Apricot Platform at Qufu is a later commemorative teaching site: useful for thinking about embodied transmission, but not evidence that one timeless “Confucian ethic” has passed unchanged from Confucius to the present.',
    ideas: [
      'The pavilion, platform, gates, and path make moral learning spatial. A learner enters practices already shaped by predecessors, roles, and expectations. Proper form can discipline attention to others, but its ethical value depends on humane responsiveness rather than exact performance alone.',
      'Classical texts connect ritual with ren, often translated as humaneness, and with the difficult work of becoming reliable in relation. Confucius, Mencius, Xunzi, and later traditions disagree about human tendencies, education, government, and metaphysics. Treating them as one voice would erase the argument internal to the tradition.',
      'Ritual can sustain trust and shared memory, yet inherited roles can also preserve hierarchy. The live question is how practice becomes corrigible: whether cultivated judgment can expose deference that humiliates, family obligation that silences, or civic order that excludes while retaining the insight that character is socially formed.',
    ],
    cautions: [
      'The photographed pavilion is a later memorial site, not a surviving classroom from Confucius’s lifetime.',
      'Do not reduce Confucian ethics to obedience, etiquette, or one fixed hierarchy.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Confuciustempleapricotplatform.jpg',
    academicLabel: 'Stanford Encyclopedia of Philosophy — Confucius',
    academicUrl: 'https://plato.stanford.edu/entries/confucius/',
  }),
  curated({
    id: 'ethics-jain-nonviolence-practice',
    assetId: 'moral-ethics-jain-bird-hospital',
    parent: 'ethics',
    entityKind: 'branch',
    displayName: 'Nonviolence Organized as Care',
    shortTitle: 'Jain Nonviolence in Practice',
    focus: 'JAIN ETHICS · AHIMSA, VULNERABILITY, DISCIPLINE, AND INSTITUTION',
    dateLabel: 'Ancient Jain commitment with many historical forms · Delhi hospital photographed 2018',
    question: 'What changes when avoiding harm becomes a demanding discipline directed toward even small and nonhuman lives?',
    lead: 'Ahimsa, non-harm or nonviolence, is central to Jain ethics and is developed through vows, diet, attention to movement, truthfulness, possession, and care for living beings. A Jain bird hospital in Delhi shows one modern institutional expression. Its cages, labor, food, treatment, and triage make compassion materially costly instead of leaving it as a private sentiment.',
    ideas: [
      'The hospital makes vulnerability visible through infrastructure: injured animals require knowledge, space, routine, and people willing to accept continuing obligations. Moral seriousness appears as organized maintenance rather than one dramatic rescue.',
      'Jain traditions distinguish the stricter vows of mendicants from the limited vows of householders and connect ethics with karma and liberation. Digambara and Svetambara communities, texts, and practices differ. The exhibit therefore uses one institution as a case, not as a photograph of Jainism in its entirety.',
      'Avoiding one harm can create another: confinement may protect or distress, treatment may injure while healing, and feeding practices enter ecological systems. Ahimsa does not remove practical conflict. It intensifies attention to causal entanglement and asks how humility should accompany unavoidable harm.',
    ],
    cautions: [
      'One Delhi institution cannot stand for every Jain community or settle the ethics of animal rehabilitation.',
      'Nonviolence is not mere passivity; it involves disciplined restraint, care, and difficult judgments about consequence.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Bird_hospital,_Chandni_Chowk.jpg',
    academicLabel: 'Internet Encyclopedia of Philosophy — Jain Philosophy',
    academicUrl: 'https://iep.utm.edu/jain/',
  }),
  curated({
    id: 'ethics-buddhist-discipline-compassion',
    assetId: 'moral-ethics-sanchi-dharmachakra',
    parent: 'ethics',
    entityKind: 'branch',
    displayName: 'A Path of Conduct, Attention, and Compassion',
    shortTitle: 'Buddhist Ethical Discipline',
    focus: 'BUDDHIST ETHICS · SUFFERING, INTENTION, PRECEPT, PATH, AND COMPASSION',
    dateLabel: 'Ancient Sanchi relief · photograph made 2017',
    question: 'How can ethical discipline transform the causes of suffering without assuming a permanent, independent self?',
    lead: 'Buddhist ethical traditions connect conduct to suffering, intention, mental formation, wisdom, and liberation. The dharmachakra, or wheel of teaching, at Sanchi offers a material threshold into that path. It does not encode one complete theory, and Buddhist communities across South, Central, East, and Southeast Asia have developed diverse accounts of precepts, compassion, merit, monastic discipline, and lay life.',
    ideas: [
      'The carved wheel directs attention away from a single heroic lawgiver and toward teaching enacted through a path. Right speech, action, livelihood, effort, mindfulness, and concentration are mutually conditioning rather than isolated boxes on a modern decision chart.',
      'Intention matters because actions cultivate dispositions and causal consequences. Yet Buddhist ethics cannot be compressed into “good intentions”: ignorance, attachment, institutional practice, vow, result, and the welfare of sentient beings all enter different traditions’ reasoning.',
      'No-self teachings do not imply that suffering people are unreal or that responsibility disappears. They challenge possessive pictures of agency while supporting attention to interdependence. Comparison with Western consequentialism or virtue ethics can illuminate features only if it does not declare the traditions equivalent.',
    ],
    cautions: [
      'The Sanchi relief is a symbolic archaeological object, not a portrait of the Buddha or a complete ethical manual.',
      'Do not treat Buddhism as one doctrine or translate karma into a simple ledger of reward and punishment.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Sanchi_Stupa_2_elephants_and_Dharmachakra.jpg',
    academicLabel: 'Stanford Encyclopedia of Philosophy — Ethics in Indian and Tibetan Buddhism',
    academicUrl: 'https://plato.stanford.edu/entries/ethics-indian-buddhism/',
  }),
  curated({
    id: 'ethics-care-attention-practice',
    assetId: 'moral-ethics-cassatt-child-bath',
    parent: 'ethics',
    entityKind: 'branch',
    displayName: 'Care Before the Exceptional Decision',
    shortTitle: 'Care, Dependency, and Attention',
    focus: 'CARE ETHICS · DEPENDENCY, RELATION, LABOR, POWER, AND RESPONSE',
    dateLabel: 'Cassatt painting completed 1893 · care-ethics debates developed chiefly from the late 20th century',
    question: 'What does moral theory miss when it pictures agents as independent choosers before recognizing dependency and care?',
    lead: 'Cassatt’s bath scene slows ethics to touch, balance, repetition, and vulnerability. Care ethics later challenged theories that begin from abstract, independent individuals and attend mainly to rules or isolated choices. It asks how needs are perceived, how trust is sustained, who performs necessary labor, and how unequal power can hide inside relationships praised as loving.',
    ideas: [
      'The adult’s arm steadies the child while hands and gazes coordinate around a small task. Moral competence here includes noticing discomfort, adapting pressure, anticipating movement, and accepting responsibility that cannot be discharged by one maxim.',
      'Care ethics includes distinct feminist approaches rather than one doctrine. Writers disagree about emotion, virtue, practice, dependency, justice, institutions, and whether care supplies a complete moral theory. Its development also responds to the devaluation and unequal assignment of domestic and reproductive labor.',
      'Relationships can nourish and dominate. A demand to “care more” may burden those already assigned unpaid work or silence a dependent person’s agency. Adequate care therefore needs boundaries, resources, public institutions, and justice—not only benevolent feeling between two people.',
    ],
    cautions: [
      'The painting must not naturalize caregiving as women’s work or romanticize dependency.',
      'Care ethics is not the claim that affection always overrides rights, fairness, or accountability.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Mary_Cassatt_-_The_Child%27s_Bath_-_Google_Art_Project.jpg',
    academicLabel: 'Internet Encyclopedia of Philosophy — Care Ethics',
    academicUrl: 'https://iep.utm.edu/care-ethics/',
  }),
  curated({
    id: 'ethics-labor-social-position',
    assetId: 'moral-ethics-millet-gleaners',
    parent: 'ethics',
    entityKind: 'branch',
    displayName: 'The Moral View from Material Conditions',
    shortTitle: 'Labor, Property, and Position',
    focus: 'SOCIAL ETHICS · LABOR, SCARCITY, PROPERTY, CLASS, AND VOICE',
    dateLabel: 'Millet painting shown in 1857 · gleaning regulated through long social and legal histories',
    question: 'Can a theory of right action remain adequate if it abstracts away from who owns, who labors, and who bears scarcity?',
    lead: 'The Gleaners places three bent bodies before a distant economy of harvest, ownership, supervision, and surplus. Moral choices never begin on a level field: time, health, property, law, gender, class, and inherited power shape which options exist. The scene therefore closes the orientation room by forcing abstract ethical questions back into social position.',
    ideas: [
      'Foreground repetition contrasts with distant abundance. Gleaning could offer subsistence under customary or legal permission, yet the right to collect leftovers also marks dependence on an order in which others control land and harvest. Charity and structure occupy the same field.',
      'Ethics has long examined distributive justice, exploitation, property, poverty, and recognition, but standard thought experiments can erase those conditions by stipulation. Reintroducing history may change not only the answer but the description of the act, the relevant agents, and what counts as avoidable harm.',
      'No painting gives unmediated access to workers’ voices. Millet monumentalizes labor through choices of scale and composition that viewers interpreted politically. Responsible use asks what the image reveals, what it aestheticizes, and which testimony or data would be needed before making policy claims.',
    ],
    cautions: [
      'The painting is authored representation, not statistical evidence about every nineteenth-century rural worker.',
      'Do not reduce structural injustice to individual charity or assume structural explanation eliminates personal responsibility.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project.jpg',
    academicLabel: 'Stanford Encyclopedia of Philosophy — Distributive Justice',
    academicUrl: 'https://plato.stanford.edu/entries/justice-distributive/',
  }),
  curated({
    id: 'virtue-practice-habituation',
    assetId: 'moral-virtue-panathenaic-runners',
    parent: 'virtue-ethics',
    entityKind: 'branch',
    displayName: 'Practice, Habituation, and Practical Wisdom',
    shortTitle: 'Training Character',
    focus: 'VIRTUE ETHICS · HABIT, EMOTION, JUDGMENT, EXCELLENCE, AND COMMUNITY',
    dateLabel: 'Panathenaic amphora c. 530–520 BCE · Aristotle wrote in the 4th century BCE',
    question: 'How can repeated action shape reliable character without turning virtue into mechanical habit?',
    lead: 'The runners on a Panathenaic prize amphora make training and public excellence visible, but moral virtue is not an athletic score. Aristotelian habituation concerns learning to perceive, feel, choose, and act well in variable circumstances. Repetition matters because it forms capacities; practical wisdom matters because no routine can specify the fitting response in every case.',
    ideas: [
      'Four bodies circle one vessel in a repeated visual rhythm. Training changes what an agent can do readily and what effort feels like. Virtuous action likewise involves educated desire, but moral excellence cannot be measured by speed, victory, physique, or public honor.',
      'Aristotle connects virtues with a flourishing human life, deliberate choice, emotion, social practice, and phronesis. Contemporary virtue ethics revives and revises this framework through eudaimonist, agent-based, feminist, exemplarist, and pluralist approaches rather than simply restoring one ancient system.',
      'Habituation raises political questions: who designs practices, which exemplars receive honor, and whose traits a community calls deficient. A practice may normalize courage or cruelty. Critical reflection, testimony, and institutional change are therefore part of moral formation, not external corrections applied after character is complete.',
    ],
    cautions: [
      'Athletic training is a visual analogy, not Aristotle’s model or evidence that competition produces virtue.',
      'Ancient ideals of citizenship and excellence were exclusionary and cannot be imported without criticism.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Panathenaic_amphora_BM_B137.jpg',
    academicLabel: 'Stanford Encyclopedia of Philosophy — Virtue Ethics',
    academicUrl: 'https://plato.stanford.edu/entries/ethics-virtue/',
  }),
  curated({
    id: 'murdoch-kestrel-unselfing',
    assetId: 'moral-murdoch-kestrel',
    parent: 'iris-murdoch',
    entityKind: 'philosopher',
    displayName: 'A Kestrel and the Work of Unselfing',
    shortTitle: 'Murdoch’s Kestrel',
    focus: 'MURDOCH · ATTENTION, FANTASY, UNSELFING, REALITY, AND THE GOOD',
    dateLabel: 'The Sovereignty of Good essays collected 1970 · displayed kestrel photographed 2022',
    question: 'Can a moment of just attention loosen the fantasies through which the self makes everything about itself?',
    lead: 'Murdoch describes looking from self-absorbed resentment toward a hovering kestrel and finding the cramped drama of the ego displaced by something real and independent. The example is brief but programmatic. Moral change can occur before a public choice, in the slow or sudden reeducation of attention through which another person, artwork, animal, or world becomes less available for fantasy.',
    ideas: [
      'The flying bird does not face the camera or perform a moral lesson. Its independent direction helps visualize Murdoch’s point: attention is not projection, possession, or the search for a symbol that flatters the observer. It is an effort to see what resists the self’s preferred story.',
      'Murdoch draws on Plato, Simone Weil, Freud, literature, and religious traditions while criticizing pictures of the sovereign choosing will. Her moral psychology treats inner activity—imagining, redescribing, attending, and resisting fantasy—as ethically consequential even when no dramatic decision follows.',
      '“Unselfing” can be misunderstood as erasing legitimate needs or accepting oppression. Murdoch’s account also attracts criticism for underdeveloping social structures that shape perception. Attention must therefore include institutions, ideology, and the authority of another person’s testimony, not only solitary contemplation of beauty.',
    ],
    cautions: [
      'The photograph does not show Murdoch’s kestrel and should not turn one anecdote into her whole philosophy.',
      'Unselfing is not self-annihilation, political passivity, or a demand that vulnerable people ignore their own claims.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:078_Wild_Common_kestrel_in_flight_at_Pfyn-Finges_Photo_by_Giles_Laurent.jpg',
    academicLabel: 'Stanford Encyclopedia of Philosophy — Iris Murdoch',
    academicUrl: 'https://plato.stanford.edu/entries/murdoch/',
  }),
  curated({
    id: 'foot-natural-goodness',
    assetId: 'moral-foot-oak-acorns',
    parent: 'philippa-foot',
    entityKind: 'philosopher',
    displayName: 'Natural Goodness',
    shortTitle: 'Natural Goodness',
    focus: 'FOOT · LIFE-FORM, NEED, VIRTUE, REASON, AND HUMAN GOOD',
    dateLabel: 'Natural Goodness published 2001 · botanical watercolor date unknown',
    question: 'Foot’s 2001 book asks whether life-form judgments can ground evaluations of virtue and practical reason while distinguishing human goodness from statistical normality, evolutionary success, or a biological moral code.',
    lead: 'Foot argues that evaluations of human action belong to a broader grammar of natural-historical judgment. Deep roots are good in an oak because of the life of that kind of plant; dependable action, justice, and practical rationality matter within human life. The analogy aims to resist a sharp gulf between fact and value, not to claim that biology dictates a moral code.',
    ideas: [
      'Leaves, branch, and acorns appear as an organized living form rather than a pile of traits. We can ask whether a feature contributes to characteristic nourishment, reproduction, or persistence. Foot extends this structure cautiously toward human beings, whose form of life includes language, reason, dependence, institutions, and chosen ends.',
      'Her project develops across critiques of non-cognitivism, essays on virtues and reasons, and the later account of natural goodness. It belongs to the revival of virtue ethics but is not simply Aristotle repeated. Foot seeks standards that make moral judgment truth-apt while preserving the practical role of reasons.',
      'Human variation, disability, culture, and oppressive uses of “nature” make this approach demanding. Statistical normality is not moral goodness, and characteristic function cannot license ranking people by conformity. The view succeeds only if human dependency and rational agency are described without turning exclusion into nature.',
    ],
    cautions: [
      'The oak is an analogy for evaluative grammar, not a blueprint from which human duties can be read.',
      'Natural goodness must not be confused with what is common, evolutionarily successful, medically typical, or socially approved.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Japanese_oak_(Quercus_mongolica)%3B_tree_branch_with_acorns._Wellcome_V0043799.jpg',
    academicLabel: 'Stanford Encyclopedia of Philosophy — Moral Naturalism',
    academicUrl: 'https://plato.stanford.edu/entries/naturalism-moral/',
  }),
  curated({
    id: 'duty-kant-autonomy',
    assetId: 'moral-duty-kant-monument',
    parent: 'deontology',
    entityKind: 'branch',
    displayName: 'Autonomy Is Not Doing Whatever One Wants',
    shortTitle: 'Kantian Autonomy',
    focus: 'DEONTOLOGY · AUTONOMY, MAXIM, UNIVERSAL LAW, DIGNITY, AND DUTY',
    dateLabel: 'Groundwork published 1785 · Rauch monument 1857, reconstructed 1992',
    question: 'What makes a will free if freedom consists in acting under a law one can rationally share?',
    lead: 'Kantian autonomy is often flattened into personal preference or independence from interference. For Kant, an autonomous will gives law to itself through reason rather than receiving its principle from appetite, authority, reward, or fear. The categorical imperative tests maxims through universal law, humanity as an end, and a possible kingdom of ends. A reconstructed civic monument makes reception visible while refusing to turn a bronze figure into the doctrine.',
    ideas: [
      'The standing monument projects independence and authority, but the relevant authority is not Kant’s personality. A maxim must be assessable from the standpoint of agents who share rational status. Duty therefore binds through the form and object of willing, not through admiration for a philosopher.',
      'Kant distinguishes acting in conformity with duty from acting from duty and connects moral worth with the principle of action. Later deontologies develop plural duties, rights, contractualism, constraints, and agent-relative reasons. The room preserves that wider field instead of making all non-consequentialist ethics Kantian.',
      'Universalism can expose privilege disguised as exception, yet abstract formulations may conceal unequal circumstances and histories of domination. Kant’s own writings also include racist hierarchy and exclusions that conflict with contemporary claims to equal dignity. Reception must not hide those tensions behind commemoration.',
    ],
    cautions: [
      'Autonomy does not mean preference satisfaction, isolation, or freedom from every obligation.',
      'Kant is foundational for modern deontology but neither exhaustive of it nor exempt from criticism of exclusionary writings.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:%D0%9F%D0%B0%D0%BC%D1%8F%D1%82%D0%BD%D0%B8%D0%BA_%D0%98_%D0%9A%D0%B0%D0%BD%D1%82%D1%83.jpg',
    academicLabel: 'Stanford Encyclopedia of Philosophy — Kant’s Moral Philosophy',
    academicUrl: 'https://plato.stanford.edu/entries/kant-moral/',
  }),
  curated({
    id: 'utility-bentham-reform',
    assetId: 'moral-utility-bentham-inspection-house',
    parent: 'utilitarianism',
    entityKind: 'branch',
    displayName: 'When Calculation Becomes an Institution',
    shortTitle: 'Bentham’s Inspection House',
    focus: 'UTILITARIAN REFORM · WELFARE, EVIDENCE, ADMINISTRATION, COERCION, AND POWER',
    dateLabel: 'Reveley plan c. 1791 · Bentham’s Panopticon proposals developed from the 1780s',
    question: 'Can a reform justified by welfare remain acceptable when its mechanism concentrates observation and control?',
    lead: 'Willey Reveley’s elevation turns Bentham’s inspection principle into rooms, sightlines, stairs, labor, and a central tower. Bentham proposed the Panopticon within a wider program of legal, penal, administrative, and social reform. The plan makes a central lesson of applied utilitarianism unavoidable: consequences occur through institutions whose power, error, incentives, and treatment of persons must themselves be counted.',
    ideas: [
      'The sectional drawing promises legibility. One observer might monitor many confined people, reducing cost while producing uncertain visibility. Yet the asymmetry also changes behavior and concentrates authority. Efficiency cannot be evaluated apart from what is made efficient and who controls the measure.',
      'Bentham criticized inherited legal fictions and urged public justification through effects on pleasure and pain. His projects included codification, punishment, poor relief, education, and democratic reforms. None makes him a simple advocate of one prison building, but the Panopticon reveals how benevolent calculation can authorize coercive design.',
      'Consequences exceed intended outcomes. Fear, humiliation, resistance, administrative drift, biased classification, and the opportunity for abuse belong in the evaluation. The case therefore challenges simplistic cost-benefit arithmetic while preserving the utilitarian demand that institutions answer for experienced harms.',
    ],
    cautions: [
      'The drawing is a proposal, not proof that Bentham’s exact Panopticon was built or achieved its aims.',
      'Utilitarianism is not synonymous with surveillance; the case tests rather than defines the tradition.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Reveley_Plan_of_Houses_of_Inspection_c._1791.png',
    academicLabel: 'Stanford Encyclopedia of Philosophy — Jeremy Bentham',
    academicUrl: 'https://plato.stanford.edu/entries/bentham/',
  }),
  curated({
    id: 'utility-equality-inclusion',
    assetId: 'moral-utility-equal-pay-act',
    parent: 'utilitarianism',
    entityKind: 'branch',
    displayName: 'Whose Welfare Enters the Comparison?',
    shortTitle: 'Equality Inside the Calculus',
    focus: 'UTILITY AND EQUALITY · COUNTING, DISTRIBUTION, OPPORTUNITY, VOICE, AND LAW',
    dateLabel: 'United States Equal Pay Act signed 10 June 1963',
    question: 'Is increasing total welfare enough when benefits, burdens, voice, and opportunity remain unequally distributed?',
    lead: 'The signing of the Equal Pay Act gathers advocates, legislators, officials, and a legal text around one desk. Utilitarian reasoning insists that each affected welfare count, but aggregate improvement can hide distribution. A policy can raise a total while leaving the worst-off exposed, reproducing unequal bargaining power, or treating exclusion as an inexpensive preference to satisfy.',
    ideas: [
      'The crowded frame resists the myth that reform is one decision by one official. Research, organizing, testimony, drafting, coalition, enforcement, and later litigation shape what a statute can do. Consequential assessment must follow that chain rather than stop at ceremonial passage.',
      'Classical and contemporary utilitarians disagree about equality, diminishing marginal utility, rights, rules, motives, opportunities, and what counts as welfare. Mill’s arguments for women’s equality and liberty complicate any picture of utility as a bare sum, though they do not resolve every tension between aggregation and justice.',
      'The act addressed sex-based wage discrimination within defined employment relationships but did not eliminate wage gaps or every exclusion. Race, occupation, care responsibilities, disability, migration status, and enforcement capacity affect outcomes. Counting everyone requires institutions that can hear and correct what an aggregate statistic misses.',
    ],
    cautions: [
      'The 1963 U.S. statute was consequential but limited; the signing photograph is not evidence of complete pay equality.',
      'Do not assume either that utility ignores distribution by definition or that equal treatment automatically maximizes welfare.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:President_John_F._Kennedy_Signs_the_Equal_Pay_Act_-_DPLA_-_083c441f6899162229a11a295e0b8139.jpg',
    academicLabel: 'Stanford Encyclopedia of Philosophy — Equality',
    academicUrl: 'https://plato.stanford.edu/entries/equality/',
  }),
  curated({
    id: 'utility-public-health-welfare',
    assetId: 'moral-utility-jenner-vaccination',
    parent: 'utilitarianism',
    entityKind: 'branch',
    displayName: 'Public Health Beyond a Simple Sum',
    shortTitle: 'Vaccination and Welfare',
    focus: 'PUBLIC HEALTH · BENEFIT, RISK, CONSENT, EVIDENCE, TRUST, AND DISTRIBUTION',
    dateLabel: 'Hillemacher painting made 1884, retrospectively imagining early vaccination',
    question: 'How should population benefit be weighed when risk, trust, access, and authority are unevenly distributed?',
    lead: 'Vaccination is often used as a straightforward example of producing more benefit than harm. Hillemacher’s retrospective domestic scene makes the case less abstract: a child’s body, a practitioner’s authority, worried observers, uncertain evidence, and a public history enter the room. Ethical evaluation must address expected outcomes without treating consent, trust, or distribution as decorative additions.',
    ideas: [
      'The image centers an intervention on one arm while surrounding it with relationships. Public benefit emerges through many such encounters, but the risks and burdens remain particular. Reliable evidence, transparent uncertainty, compensation, access, and respectful communication affect both welfare and legitimacy.',
      'Nineteenth-century memory turned Jenner into a heroic origin figure, while vaccination history also includes prior practices, global knowledge routes, coercive campaigns, opposition, and unequal health systems. The painting’s late date warns against reading commemoration as eyewitness documentation.',
      'Policy must compare action with realistic alternatives, not with a world containing no disease or mistrust. It must also ask who cannot access protection, who bears side effects, and whose testimony institutions discount. Consequential reasoning becomes stronger—not weaker—when rights and justice reveal outcomes that crude totals omit.',
    ],
    cautions: [
      'The 1884 painting is retrospective reception, not evidence for the details of an early vaccination encounter.',
      'The exhibit neither reduces public health to utility nor treats consent and rights as costs to be casually traded away.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Edward_Jenner_vaccinating_a_boy._Oil_painting_by_E.-E._Hille_Wellcome_L0029093.jpg',
    academicLabel: 'Stanford Encyclopedia of Philosophy — Public Health Ethics',
    academicUrl: 'https://plato.stanford.edu/entries/publichealth-ethics/',
  }),
  curated({
    id: 'thomson-violinist-bodily-rights',
    assetId: 'moral-thomson-violinist',
    parent: 'judith-thomson',
    entityKind: 'philosopher',
    displayName: 'The Violinist',
    shortTitle: 'The Violinist',
    focus: 'THOMSON · BODILY RIGHTS, PERMISSION, DEPENDENCE, RESPONSIBILITY, AND ABORTION',
    dateLabel: '“A Defense of Abortion” published 1971 · displayed portrait painted 1773',
    question: 'Thomson’s 1971 conditional argument asks whether a right to life includes a claim to another person’s bodily support, while leaving consent, responsibility, decency, and the analogy to pregnancy open to dispute.',
    lead: 'Thomson asks readers to imagine waking involuntarily connected to an unconscious famous violinist who needs use of their kidneys for nine months. The case grants, for argument, a strong claim about the dependent being’s moral status and tests whether a right to life includes a right to another person’s body. The displayed portrait is only a visual threshold; it does not depict the coercive hospital scenario.',
    ideas: [
      'Vallayer-Coster’s violinist is composed, awake, and self-possessed—the opposite of Thomson’s invented patient. That mismatch matters. A thought experiment selectively stipulates facts to isolate a principle, while any image adds gender, posture, class, history, and emotion that may pull judgment in unargued directions.',
      'Thomson distinguishes what it would be kind or generous to permit from what another has a right to demand. Her argument does not claim that every abortion is admirable or that dependency is morally irrelevant. It contests an inference from a right to life to an unlimited enforceable claim over another body.',
      'Critics challenge the analogy through responsibility, parenthood, ordinary versus extraordinary aid, killing versus letting die, and the social conditions of pregnancy. Those objections must be stated rather than replaced by intuition polling. Cases clarify structure only when their disanalogies remain visible.',
    ],
    cautions: [
      'The 1773 sitter is not Thomson’s imagined violinist and has no connection to the 1971 essay.',
      'The thought experiment tests one rights inference; it is not Thomson’s entire view of abortion, pregnancy, or care.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Anne_Vallayer-Coster,_Portrait_of_a_Violinist.jpg',
    academicLabel: 'Stanford Encyclopedia of Philosophy — The Ethics of Abortion',
    academicUrl: 'https://plato.stanford.edu/entries/abortion/',
  }),
  curated({
    id: 'thomson-bodily-autonomy-context',
    assetId: 'moral-thomson-womens-strike-1970',
    parent: 'judith-thomson',
    entityKind: 'philosopher',
    displayName: 'Women’s Strike for Equality, 1970',
    shortTitle: 'Women’s Strike for Equality, 1970',
    focus: 'RIGHTS IN CONTEXT · BODY, LAW, GENDER, MOVEMENT, ACCESS, AND POWER',
    dateLabel: 'Women’s Strike for Equality, 26 August 1970 · Thomson essay published 1971',
    question: 'This 1970 Washington march supplies political context—not causal proof—for Thomson’s later abortion argument, showing how law, work, medicine, access, and unequal power shape the exercise of bodily rights.',
    lead: 'Leffler’s photograph records a women’s liberation march in Washington one year before Thomson’s “A Defense of Abortion.” The proximity supplies historical context, not causal proof. Thomson’s analytic cases and feminist movements are distinct forms of argument, yet both confront institutions that allocate authority over bodies, work, reproduction, and public voice.',
    ideas: [
      'A moving crowd replaces the lone agent of a thought experiment. Placards, streets, organizations, labor, and law show that bodily authority is exercised within collective conditions. Formal permission matters differently when care, income, medical access, stigma, or safety are distributed unequally.',
      'Thomson’s work is sometimes classified as feminist because of its influence on abortion ethics, but her philosophical method and the movement’s demands should not be collapsed. Participants disagreed about sexuality, race, class, motherhood, employment, war, and legal strategy; one photograph cannot speak for all of them.',
      'Abstract cases can expose hidden rights while social history reveals which cases institutions repeatedly impose. The productive relation is reciprocal: conceptual distinctions prevent slogans from doing all the work, and movement testimony tests whether supposedly neutral descriptions conceal patterned coercion.',
    ],
    cautions: [
      'The march did not illustrate or cause Thomson’s paper, and its participants did not share one philosophical theory.',
      'Context should deepen case analysis, not replace careful distinctions with assumptions about political identity.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Leffler_-_WomensLib1970_WashingtonDC.jpg',
    academicLabel: 'Stanford Encyclopedia of Philosophy — Rights',
    academicUrl: 'https://plato.stanford.edu/entries/rights/',
  }),
  curated({
    id: 'parfit-psychological-continuity',
    assetId: 'moral-parfit-marey-motion',
    parent: 'derek-parfit',
    entityKind: 'philosopher',
    displayName: 'Psychological Continuity and Relation R',
    shortTitle: 'Psychological Continuity and Relation R',
    focus: 'PARFIT · IDENTITY, CONNECTEDNESS, CONTINUITY, BRANCHING, AND SURVIVAL',
    dateLabel: 'Reasons and Persons published 1984 · Marey motion study c. 1885–1895',
    question: 'If psychological continuity branches or weakens, must survival depend on one further all-or-nothing fact?',
    lead: 'Marey places successive stages of one vault in a single field. Parfit’s cases ask whether a life can be understood through overlapping psychological connections—memory, intention, belief, desire, and character—without positing a separately existing ego. The analogy breaks at the point that makes the philosophy difficult: psychological continuity can branch, while numerical identity cannot be one-to-two.',
    ideas: [
      'The motion study gives continuity a visible direction while preserving gaps between exposures. Ordinary lives also contain changing degrees of connectedness. Parfit distinguishes direct psychological connections from continuity secured by overlapping chains and asks whether these relations, with the right kind of cause, matter more than identity itself.',
      'Teletransportation, brain division, and duplication strip away familiar bodily cues. They do not prove that persons are unreal. Parfit’s reductionism says that facts about persons consist in more particular physical and psychological facts without a further Cartesian ego-fact. Responsibility, promise, grief, and anticipation still require argument.',
      'Branching cases pressure prudence and moral concern: if identity is less deep, concern for future selves and other people may be less sharply divided. Yet the conclusion does not follow mechanically, and embodied, relational, narrative, and animalist accounts challenge Parfit’s emphasis. The exhibit keeps metaphysics connected to practice.',
    ],
    cautions: [
      'Marey’s bodily sequence is a visual analogy, not Parfit’s diagram and not proof of psychological reductionism.',
      'Parfit does not claim that persons, death, relationships, or responsibility simply cease to matter.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:%C3%89tienne-Jules_Marey_-_Movements_in_Pole_Vaulting_-_Google_Art_Project.jpg',
    academicLabel: 'Stanford Encyclopedia of Philosophy — Personal Identity and Ethics',
    academicUrl: 'https://plato.stanford.edu/entries/identity-ethics/',
  }),
  curated({
    id: 'parfit-future-generations',
    assetId: 'moral-parfit-svalbard-seed-vault',
    parent: 'derek-parfit',
    entityKind: 'philosopher',
    displayName: 'The Non-Identity Problem and Future Generations',
    shortTitle: 'The Non-Identity Problem and Future Generations',
    focus: 'PARFIT · NON-IDENTITY, POPULATION, RISK, AGGREGATION, AND THE FUTURE',
    dateLabel: 'Reasons and Persons published 1984 · Svalbard photograph made 2015',
    question: 'How can a choice wrong future people when that same choice helps determine which people will ever exist?',
    lead: 'The Svalbard Global Seed Vault gives intergenerational concern a physical form: present institutions spend resources to preserve crop diversity for uncertain users under future conditions. Parfit’s non-identity problem shows why ordinary person-affecting language can fail. A policy may make future lives worse than an alternative while leaving no individual worse off than they otherwise would have been, because different people would have existed.',
    ideas: [
      'The entrance projects from rock and snow, but preservation depends on governance, deposits, refrigeration, maintenance, duplication, and access. Long-term benefit is not one heroic object. It is a chain of current obligations whose failure modes and distribution must be anticipated.',
      'Parfit’s population ethics compares outcomes in which both the number and identity of people vary. The non-identity problem, mere-addition paradox, and repugnant conclusion expose tensions among total welfare, average welfare, equality, person-affecting claims, and the intuition that creating a worthwhile life need not benefit someone.',
      'Future-oriented institutions can protect while reproducing present power. Which crops are stored, whose knowledge governs access, and who remains exposed to climate or conflict are ethical questions now. Uncertainty does not cancel responsibility; it changes what precaution, resilience, and fair representation require.',
    ],
    cautions: [
      'The seed vault is a case of institutional foresight, not a solution to population ethics or global food security.',
      'Do not treat the repugnant conclusion as Parfit’s recommendation; it is a pressure generated by plausible-looking principles.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Svalbard_seed_vault.jpg',
    academicLabel: 'Stanford Encyclopedia of Philosophy — Intergenerational Justice',
    academicUrl: 'https://plato.stanford.edu/entries/justice-intergenerational/',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

type MoralInstallationKind = 'moral-work' | 'moral-context' | 'moral-concept';

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
  id: MoralLifePracticalReasonSupplementalExhibitId;
  parentExhibitId: MoralParent;
  slotId: string;
  assetId: MoralLifePracticalReasonGalleryAssetId;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: MoralInstallationKind;
  accent: string;
}): MuseumSupplementalExhibitLayout => {
  const authoredSlot = getMoralLifePracticalReasonInstallationSlot(slotId);
  const position = {x: authoredSlot.x, z: authoredSlot.z};
  const authored = authorSupplementalLayout({
    id: id as MuseumSupplementalExhibitId,
    parentExhibitId,
    guidedAfterExhibitId: parentExhibitId,
    zoneId: authoredSlot.spatialCellId,
    position,
    rotationY: authoredSlot.rotationY,
    assetId: assetId as MuseumAssetId,
    mediaWidth,
    mediaHeight,
    installationKind: installationKind as MuseumSupplementalInstallationKind,
    accent,
    width: 3.58,
  });
  return {
    ...authored,
    interactionRadius: 3.3,
    viewpoint: {
      x: position.x + Math.sin(authoredSlot.rotationY) * authoredSlot.supplementalViewpointDistance,
      z: position.z + Math.cos(authoredSlot.rotationY) * authoredSlot.supplementalViewpointDistance,
      yaw: authoredSlot.rotationY,
      pitch: -.055,
    },
  };
};

export const MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'ethics-confucian-ritual-practice', parentExhibitId: 'ethics', slotId: 'moral-ethics-orientation:west-outer', assetId: 'moral-ethics-confucian-apricot-platform', mediaWidth: 2.02, mediaHeight: 2.7, installationKind: 'moral-context', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.practice}),
  layout({id: 'ethics-jain-nonviolence-practice', parentExhibitId: 'ethics', slotId: 'moral-ethics-orientation:east-room-face', assetId: 'moral-ethics-jain-bird-hospital', mediaWidth: 2.02, mediaHeight: 2.7, installationKind: 'moral-context', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.virtue}),
  layout({id: 'ethics-buddhist-discipline-compassion', parentExhibitId: 'ethics', slotId: 'moral-ethics-orientation:east-cross-face', assetId: 'moral-ethics-sanchi-dharmachakra', mediaWidth: 1.31, mediaHeight: 2.7, installationKind: 'moral-context', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.future}),
  layout({id: 'ethics-care-attention-practice', parentExhibitId: 'ethics', slotId: 'moral-ethics-orientation:south-room-face', assetId: 'moral-ethics-cassatt-child-bath', mediaWidth: 1.77, mediaHeight: 2.7, installationKind: 'moral-concept', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.rights}),
  layout({id: 'ethics-labor-social-position', parentExhibitId: 'ethics', slotId: 'moral-ethics-orientation:south-cross-face', assetId: 'moral-ethics-millet-gleaners', mediaWidth: 3.18, mediaHeight: 2.38, installationKind: 'moral-context', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.utility}),

  layout({id: 'virtue-practice-habituation', parentExhibitId: 'virtue-ethics', slotId: 'moral-character-virtue:west-cross-face', assetId: 'moral-virtue-panathenaic-runners', mediaWidth: 1.79, mediaHeight: 2.7, installationKind: 'moral-concept', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.virtue}),
  layout({id: 'murdoch-kestrel-unselfing', parentExhibitId: 'iris-murdoch', slotId: 'moral-character-virtue:south-room-face', assetId: 'moral-murdoch-kestrel', mediaWidth: 3.18, mediaHeight: 2.12, installationKind: 'moral-concept', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.future}),
  layout({id: 'foot-natural-goodness', parentExhibitId: 'philippa-foot', slotId: 'moral-character-virtue:south-cross-face', assetId: 'moral-foot-oak-acorns', mediaWidth: 3.02, mediaHeight: 2.67, installationKind: 'moral-concept', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.virtue}),

  layout({id: 'duty-kant-autonomy', parentExhibitId: 'deontology', slotId: 'moral-duty-consequence:west-room-face', assetId: 'moral-duty-kant-monument', mediaWidth: 2.02, mediaHeight: 2.7, installationKind: 'moral-concept', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.duty}),
  layout({id: 'utility-bentham-reform', parentExhibitId: 'utilitarianism', slotId: 'moral-duty-consequence:west-cross-face', assetId: 'moral-utility-bentham-inspection-house', mediaWidth: 1.72, mediaHeight: 2.7, installationKind: 'moral-work', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.ink}),
  layout({id: 'utility-equality-inclusion', parentExhibitId: 'utilitarianism', slotId: 'moral-duty-consequence:north-room-face', assetId: 'moral-utility-equal-pay-act', mediaWidth: 2.7, mediaHeight: 2.69, installationKind: 'moral-context', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.rights}),
  layout({id: 'utility-public-health-welfare', parentExhibitId: 'utilitarianism', slotId: 'moral-duty-consequence:north-cross-face', assetId: 'moral-utility-jenner-vaccination', mediaWidth: 3.18, mediaHeight: 2.47, installationKind: 'moral-context', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.utility}),

  layout({id: 'thomson-violinist-bodily-rights', parentExhibitId: 'judith-thomson', slotId: 'moral-rights-persons-futures:east-room-face', assetId: 'moral-thomson-violinist', mediaWidth: 2.06, mediaHeight: 2.7, installationKind: 'moral-concept', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.rights}),
  layout({id: 'thomson-bodily-autonomy-context', parentExhibitId: 'judith-thomson', slotId: 'moral-rights-persons-futures:east-cross-face', assetId: 'moral-thomson-womens-strike-1970', mediaWidth: 3.18, mediaHeight: 2.11, installationKind: 'moral-context', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.rights}),
  layout({id: 'parfit-psychological-continuity', parentExhibitId: 'derek-parfit', slotId: 'moral-rights-persons-futures:north-room-face', assetId: 'moral-parfit-marey-motion', mediaWidth: 3.18, mediaHeight: 1.28, installationKind: 'moral-concept', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.future}),
  layout({id: 'parfit-future-generations', parentExhibitId: 'derek-parfit', slotId: 'moral-rights-persons-futures:north-cross-face', assetId: 'moral-parfit-svalbard-seed-vault', mediaWidth: 3.18, mediaHeight: 2.13, installationKind: 'moral-context', accent: MORAL_LIFE_PRACTICAL_REASON_PALETTE.future}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getMoralLifePracticalReasonSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const recordValue = MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBITS.find(
    (item) => item.id === id,
  );
  if (!recordValue) throw new Error(`Gallery 24 supplemental exhibit ${id} is missing.`);
  return recordValue;
};
