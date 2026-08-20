import type {ComparisonCasefile, ComparisonEntityKind, ComparisonStatement} from '../types/philosophy';

/**
 * Accuracy-overhaul casefiles remain a non-canonical teaching surface.
 * Every statement resolves to a source registered on a reviewed canonical record.
 */
const sourceIds: Record<string, string> = {
  mencius: 'men-sep',
  xunzi: 'xz-sep',
  dignaga: 'dig-india-ep-sep',
  dharmakirti: 'dha-sep',
  spinoza: 'spi-sep',
  leibniz: 'lei-sep',
  confucianism: 'conf-ethics-sep',
  legalism: 'legalism-sep',
  logic: 'log-classical-sep',
  'buddhist-epistemology': 'dig-india-ep-sep',
  rationalism: 'rat-markie-sep',
  empiricism: 'emp-markie-sep',
};

const statement = (kind: ComparisonEntityKind, text: string, ...entityIds: string[]): ComparisonStatement => ({
  text,
  evidence: entityIds.map((entityId) => ({entityKind: kind, entityId, sourceId: sourceIds[entityId]})),
});
const philosopherStatement = (text: string, ...ids: string[]) => statement('philosopher', text, ...ids);
const branchStatement = (text: string, ...ids: string[]) => statement('branch', text, ...ids);
const philosopherCase = (participantIds: readonly [string, string], content: Omit<ComparisonCasefile, 'kind' | 'participantIds'>): ComparisonCasefile => ({kind: 'philosopher', participantIds, ...content});

export const accuracyOverhaulComparisonCasefiles: readonly ComparisonCasefile[] = [
  philosopherCase(['mencius', 'xunzi'], {
    sharedQuestion: philosopherStatement('How can ordinary human capacities and desires become ethical character, and what must cultivation, ritual, reflection, and political institutions contribute?', 'mencius', 'xunzi'),
    historicalRelationship: philosopherStatement('This compares two layered Warring States corpora later canonized as rival Confucian accounts: Xunzi’s “Human Nature Is Bad” contests a Mencian position, but no personal debate is documented and neither collection is a verbatim transcript.', 'mencius', 'xunzi'),
    sharedAssumptions: [philosopherStatement('Both make ethical order an achievement of cultivation rather than an automatic gift of status, impulse, or coercion, and both connect personal formation to material and political conditions.', 'mencius', 'xunzi')],
    axes: [
      {
        label: 'Human nature and cultivation',
        question: philosopherStatement('Does mature ethical order grow by extending moral beginnings, or must deliberate learning transform dispositions that do not yet constitute virtue?', 'mencius', 'xunzi'),
        positions: [
          {entityId: 'mencius', claim: philosopherStatement('Mencius treats affective-evaluative beginnings such as compassion as fragile developmental resources that require nourishment, reflection, extension, and humane conditions rather than as completed virtues.', 'mencius')},
          {entityId: 'xunzi', claim: philosopherStatement('Xunzi argues that spontaneous dispositions do not by themselves yield ethical order; teachers, ritual, public distinctions, and deliberate learned activity transform and coordinate them.', 'xunzi')},
        ],
        contrast: philosopherStatement('The dispute concerns what xing contributes and what cultivation adds, not optimism versus pessimism, innate perfection versus depravity, or feeling versus ritual.', 'mencius', 'xunzi'),
      },
      {
        label: 'Institutions of formation',
        question: philosopherStatement('Which social and political conditions make ethical development possible?', 'mencius', 'xunzi'),
        positions: [
          {entityId: 'mencius', claim: philosopherStatement('Mencius joins humane government and secure livelihood to the conditions under which moral beginnings can grow, while holding rulers answerable to the people’s welfare.', 'mencius')},
          {entityId: 'xunzi', claim: philosopherStatement('Xunzi emphasizes teachers, ritual, naming, offices, and institutions that give durable form to desire, roles, learning, and public coordination.', 'xunzi')},
        ],
        contrast: philosopherStatement('Neither offers merely private ethics: Mencius foregrounds developmental capacities and humane conditions, while Xunzi foregrounds achieved form and institutional coordination.', 'mencius', 'xunzi'),
      },
    ],
    terminology: [{
      topic: 'Nature and deliberate formation',
      positions: [
        {entityId: 'mencius', term: 'xin and the four beginnings', explanation: philosopherStatement('Heart-mind and the four beginnings name initial affective and evaluative capacities capable of growth, not virtues already complete at birth.', 'mencius')},
        {entityId: 'xunzi', term: 'xing and wei', explanation: philosopherStatement('Xing names spontaneous nature in the argument, while wei names deliberate learned activity through which ethical form is achieved; wei is not an unembodied will.', 'xunzi')},
      ],
      warning: philosopherStatement('The slogans “human nature is good” and “human nature is bad” conceal disputed Chinese terms, layered texts, shared commitments to cultivation, and later canonical framing.', 'mencius', 'xunzi'),
    }],
    arguments: [
      {entityId: 'mencius', title: 'Cultivation can extend beginnings already visible in concern', summary: philosopherStatement('Concrete responses such as compassion supply an educable starting point whose protection and extension can explain ethical development without making virtue automatic.', 'mencius'), pressure: philosopherStatement('The account must explain persistent cruelty, damaged conditions, failed extension, and the formative role of norms and ritual.', 'mencius')},
      {entityId: 'xunzi', title: 'Ethical order is a learned achievement', summary: philosopherStatement('Because spontaneous desires do not coordinate themselves into just relations, ritual, teachers, distinctions, and reflection can transform conflict-prone life into durable practice.', 'xunzi'), pressure: philosopherStatement('The account must explain why inherited convention and hierarchy remain criticizable rather than becoming authoritative merely because they organize conduct.', 'xunzi')},
    ],
    readings: [
      {entityId: 'mencius', title: 'Mengzi 2A6 and 6A1–8', author: 'Mencius tradition and later compilers', kind: 'primary', stage: 'Read beginnings and the nature debate', whyHere: philosopherStatement('Read the child-at-the-well passage beside Book 6A so developmental capacity is not reduced to a slogan about innate perfection.', 'mencius')},
      {entityId: 'xunzi', title: '“Encouraging Learning,” “Discourse on Ritual,” and “Human Nature Is Bad”', author: 'Xunzi tradition and later compilers', kind: 'primary', stage: 'Read transformation across several chapters', whyHere: philosopherStatement('Read learning, ritual, and the nature claim together before treating xing e as total depravity or desire suppression.', 'xunzi')},
    ],
    interpretiveLimits: [philosopherStatement('Both received collections have compositional histories, the precise target of Xunzi’s criticism remains debated, and later Mencian orthodoxy should not turn their disagreement into a complete map of Confucian philosophy.', 'mencius', 'xunzi')],
    followOns: [{kind: 'branch', participantIds: ['confucianism', 'legalism'], label: 'Confucianism and Legalism', reason: branchStatement('Test how ritual formation, humane rule, law, administrative technique, and state power diverge without turning Xunzi into a simple bridge between two fixed camps.', 'confucianism', 'legalism')}],
  }),

  philosopherCase(['dignaga', 'dharmakirti'], {
    sharedQuestion: philosopherStatement('How can perception and inference be reliable when concepts organize repeatable generality but ultimately real objects are treated as particular and causally effective?', 'dignaga', 'dharmakirti'),
    historicalRelationship: philosopherStatement('Dharmakīrti develops and revises a Dignāgan pramāṇa architecture in a later, contested reception; the textual inheritance is clearer than any reconstructed teacher–pupil encounter or single institutional school.', 'dignaga', 'dharmakirti'),
    sharedAssumptions: [philosopherStatement('Both distinguish perception from inference, analyze how reasons and concepts can succeed or fail, and work within Buddhist projects in which reliable cognition and liberation belong to the philosophical setting.', 'dignaga', 'dharmakirti')],
    axes: [
      {
        label: 'Reliable cognition',
        question: philosopherStatement('What does the two-pramāṇa architecture explain, and what additional burden does the later account assume?', 'dignaga', 'dharmakirti'),
        positions: [
          {entityId: 'dignaga', claim: philosopherStatement('Dignāga organizes reliable cognition around perception and inference, distinguishing nonconceptual awareness of particulars from conceptual construction and public forms of proof.', 'dignaga')},
          {entityId: 'dharmakirti', claim: philosopherStatement('Dharmakīrti reworks that architecture through causal efficacy, momentariness, justification, and Buddhist authority rather than merely repeating or completing Dignāga.', 'dharmakirti')},
        ],
        contrast: philosopherStatement('The inheritance is real, but Dharmakīrti changes the explanatory burden; his causal account should not be projected backward as Dignāga’s settled doctrine.', 'dignaga', 'dharmakirti'),
      },
      {
        label: 'Concepts, signs, and exclusion',
        question: philosopherStatement('How can conceptual inference guide thought if universals are not ultimately real objects?', 'dignaga', 'dharmakirti'),
        positions: [
          {entityId: 'dignaga', claim: philosopherStatement('Dignāga distinguishes inference for oneself from inference presented to others and develops criteria for a reason while separating conceptual thought from direct perception.', 'dignaga')},
          {entityId: 'dharmakirti', claim: philosopherStatement('Dharmakīrti refines accounts of reasons, causal efficacy, and apoha while interpreters dispute how exclusion connects language, concepts, proof, and particulars.', 'dharmakirti')},
        ],
        contrast: philosopherStatement('Neither apoha nor valid cognition has one uncontested translation, and their analyses cannot be collapsed into contemporary formal validity or justified true belief.', 'dignaga', 'dharmakirti'),
      },
    ],
    terminology: [{
      topic: 'Epistemic success and conceptual exclusion',
      positions: [
        {entityId: 'dignaga', term: 'pramāṇa', explanation: philosopherStatement('Pramāṇa is context-sensitive and can name a means, process, episode, or reliable cognition; it is not simply a modern source category.', 'dignaga')},
        {entityId: 'dharmakirti', term: 'arthakriyā and apoha', explanation: philosopherStatement('Causal efficacy and exclusion do different explanatory work in Dharmakīrti’s accounts of reality and conceptual thought; neither is a one-word substitute for truth or negative universals.', 'dharmakirti')},
      ],
      warning: philosopherStatement('The later label “Buddhist logic” can obscure questions about perception, language, debate, cognition, and liberation that are not organized as one modern formal discipline.', 'dignaga', 'dharmakirti'),
    }],
    arguments: [
      {entityId: 'dignaga', title: 'Separate direct awareness from conceptual construction', summary: philosopherStatement('Distinguishing perception and inference can explain how cognition contacts particulars while repeatable judgments and public arguments depend on conceptual organization.', 'dignaga'), pressure: philosopherStatement('The account must explain error, memory, reflexive awareness, and the practical authority of concepts without making universals ultimately real.', 'dignaga')},
      {entityId: 'dharmakirti', title: 'Test reality through causal efficacy', summary: philosopherStatement('Causal efficacy gives Dharmakīrti a way to privilege momentary particulars while explaining why reliable cognition matters for successful action and Buddhist inquiry.', 'dharmakirti'), pressure: philosopherStatement('The account must explain continuity, reference, intersubjective proof, and liberation without reintroducing enduring substances or fixed universals.', 'dharmakirti')},
    ],
    readings: [
      {entityId: 'dignaga', title: 'Pramāṇasamuccaya, Chapter 1: A Hypothetical Reconstruction of the Sanskrit Text', author: 'Dignāga; reconstructed by Ernst Steinkellner', kind: 'primary', stage: 'Begin with the reconstructed perception chapter', whyHere: philosopherStatement('The Sanskrit survives incompletely, so read this hypothetical reconstruction beside the multilingual and commentarial witnesses rather than as a stable autograph.', 'dignaga')},
      {entityId: 'dharmakirti', title: 'Pramāṇavārttika, Chapter IV, annotated selections', author: 'Dharmakīrti', kind: 'primary', stage: 'Trace a later transformation', whyHere: philosopherStatement('Use a located translation to follow proof and inference while keeping later reconstruction distinct from Dignāga’s own claims.', 'dharmakirti')},
    ],
    interpretiveLimits: [philosopherStatement('Neither author should be fixed as one uncontested Yogācāra or Sautrāntika doctrine; Indian, Tibetan, and modern reconstructions disagree over perception, apoha, reflexive awareness, causal efficacy, chronology, and textual witnesses.', 'dignaga', 'dharmakirti')],
    followOns: [{kind: 'branch', participantIds: ['logic', 'buddhist-epistemology'], label: 'Logic and Buddhist Epistemology', reason: branchStatement('Move from two authors to the asymmetric comparison between formal consequence and historically situated pramāṇa inquiry, preserving their different aims and vocabularies.', 'logic', 'buddhist-epistemology')}],
  }),

  philosopherCase(['spinoza', 'leibniz'], {
    sharedQuestion: philosopherStatement('How can substance, necessity, finite individuality, and human freedom be reconstructed after Descartes without leaving events or possibilities brute and unexplained?', 'spinoza', 'leibniz'),
    historicalRelationship: philosopherStatement('Spinoza and Leibniz met and corresponded in 1676, and Leibniz knew Spinoza’s work, but their surviving texts do not form one published debate; the “rationalist” pairing is retrospective and influence or opposition must remain work-specific.', 'spinoza', 'leibniz'),
    sharedAssumptions: [philosopherStatement('Both seek intelligible explanations and connect metaphysics to theology, mind, ethics, and flourishing, while disagreeing profoundly about substance, divine choice, contingency, and individuality.', 'spinoza', 'leibniz')],
    axes: [
      {
        label: 'The structure of reality',
        question: philosopherStatement('Is finite reality constituted by modes of one infinite substance or by a plurality of created simple substances?', 'spinoza', 'leibniz'),
        positions: [
          {entityId: 'spinoza', claim: philosopherStatement('Spinoza argues that there is one infinite substance, God or Nature; finite things are modes understood through its attributes and immanent causal order.', 'spinoza')},
          {entityId: 'leibniz', claim: philosopherStatement('Leibniz describes a plurality of simple, non-extended substances or monads whose perspectives are coordinated through God’s pre-established harmony rather than causal interaction among monads.', 'leibniz')},
        ],
        contrast: philosopherStatement('Spinoza explains finite individuals as modes of one substance; Leibniz explains a world of many created perspectives through monads and divine coordination, not material atoms.', 'spinoza', 'leibniz'),
      },
      {
        label: 'Necessity, contingency, and freedom',
        question: philosopherStatement('Can complete explanation preserve contingency and responsible freedom?', 'spinoza', 'leibniz'),
        positions: [
          {entityId: 'spinoza', claim: philosopherStatement('Spinoza rejects uncaused choice: freedom concerns acting from the necessity of one’s nature with more adequate understanding of the causes that determine affects and action.', 'spinoza')},
          {entityId: 'leibniz', claim: philosopherStatement('Leibniz uses sufficient reason and divine choice among compossible worlds to distinguish certainty and determination from the claim that every alternative is absolutely necessary.', 'leibniz')},
        ],
        contrast: philosopherStatement('Spinoza’s necessitarian order and Leibniz’s modal account of contingent divine choice are not two versions of one principle of sufficient reason, and Leibniz is not thereby a simple libertarian.', 'spinoza', 'leibniz'),
      },
    ],
    terminology: [{
      topic: 'Individuality and coordinated order',
      positions: [
        {entityId: 'spinoza', term: 'substance, mode, and conatus', explanation: philosopherStatement('Finite things are modes of the one substance, while conatus names each thing’s striving to persevere within an account of power, affects, and causal dependence.', 'spinoza')},
        {entityId: 'leibniz', term: 'monad and pre-established harmony', explanation: philosopherStatement('A monad is a simple non-extended substance with perception and appetite; harmony coordinates created perspectives without turning monads into tiny physical atoms.', 'leibniz')},
      ],
      warning: philosopherStatement('“God,” “freedom,” “necessity,” and “individual” change meaning across these systems; neither ordinary theism nor the retrospective label rationalism supplies a neutral translation.', 'spinoza', 'leibniz'),
    }],
    arguments: [
      {entityId: 'spinoza', title: 'Intelligibility excludes an exception outside nature', summary: philosopherStatement('A necessary immanent causal order can make understanding and active freedom possible without positing an uncaused will that interrupts nature.', 'spinoza'), pressure: philosopherStatement('Interpreters dispute whether this preserves responsibility, finite individuality, contingency in any useful sense, and the ethical transformation the later Ethics describes.', 'spinoza')},
      {entityId: 'leibniz', title: 'Sufficient explanation need not collapse possible alternatives', summary: philosopherStatement('A complete account can ask why this compossible world obtains while distinguishing other possible worlds and reasons for divine choice.', 'leibniz'), pressure: philosopherStatement('The account faces the problem of evil and disputed questions about alternatives, divine foreknowledge, created freedom, and whether contingency survives complete explanation.', 'leibniz')},
    ],
    readings: [
      {entityId: 'spinoza', title: 'Ethics, Part I, definitions 3–6 and propositions 11, 14–15, and 29', author: 'Baruch Spinoza', kind: 'primary', stage: 'Read substance and necessity in their demonstrative setting', whyHere: philosopherStatement('Track the definitions and proofs before treating God or Nature, modes, and necessity as detachable slogans.', 'spinoza')},
      {entityId: 'leibniz', title: 'Discourse on Metaphysics §§8–16 and Monadology §§1–36', author: 'Gottfried Wilhelm Leibniz', kind: 'primary', stage: 'Read plurality, sufficient reason, and coordination', whyHere: philosopherStatement('Use both texts to relate individual concepts and simple substances without pretending that one late summary exhausts Leibniz’s changing corpus.', 'leibniz')},
    ],
    interpretiveLimits: [philosopherStatement('Spinoza’s geometrical presentation and Leibniz’s drafts, correspondence, and late summaries make neither system reducible to a textbook formula; their 1676 contact does not turn every later contrast into a direct debate.', 'spinoza', 'leibniz')],
    followOns: [{kind: 'branch', participantIds: ['rationalism', 'empiricism'], label: 'Rationalism and Empiricism', reason: branchStatement('Return to the familiar retrospective labels after seeing how two very different post-Cartesian systems resist a single rationalist template.', 'rationalism', 'empiricism')}],
  }),
];
