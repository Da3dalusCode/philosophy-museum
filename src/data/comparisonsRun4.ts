import type {ComparisonCasefile, ComparisonEntityKind, ComparisonStatement} from '../types/philosophy';

/**
 * Content-expansion run 4 casefiles remain a non-canonical teaching surface.
 * Every statement points to a directly reviewed source on a locked canonical record.
 */
const sourceIds: Record<string, string> = {
  logic: 'log-classical-sep',
  'philosophy-of-language': 'lan-meaning-sep',
  'buddhist-epistemology': 'dig-india-ep-sep',
  'political-philosophy': 'pol-legitimacy-sep',
  'feminist-philosophy': 'fem-overview-sep',
  ethics: 'eth-moral-sep',
  confucianism: 'conf-ethics-sep',
  mohism: 'mohism-sep',
  legalism: 'legalism-sep',
  'philosophy-of-mind': 'mind-consciousness-sep',
  'buddhist-philosophy': 'bud-mind-sep',
  stoicism: 'sto-sep',
  marxism: 'mxm-marx-sep',
  existentialism: 'exi-sep',
  hobbes: 'hobbes-moral-sep',
  rousseau: 'rousseau-sep',
  bentham: 'bentham-sep',
  mill: 'mill-sep',
  rawls: 'raw-sep',
  nozick: 'noz-sep',
  beauvoir: 'bdv-sep',
  'judith-butler': 'but-gender-sep',
  marx: 'marx-sep',
  fanon: 'fan-sep',
};

const statement = (kind: ComparisonEntityKind, text: string, ...entityIds: string[]): ComparisonStatement => ({
  text,
  evidence: entityIds.map((entityId) => ({entityKind: kind, entityId, sourceId: sourceIds[entityId]})),
});
const branchStatement = (text: string, ...ids: string[]) => statement('branch', text, ...ids);
const philosopherStatement = (text: string, ...ids: string[]) => statement('philosopher', text, ...ids);
const branchCase = (participantIds: readonly [string, string], content: Omit<ComparisonCasefile, 'kind' | 'participantIds'>): ComparisonCasefile => ({kind: 'branch', participantIds, ...content});
const philosopherCase = (participantIds: readonly [string, string], content: Omit<ComparisonCasefile, 'kind' | 'participantIds'>): ComparisonCasefile => ({kind: 'philosopher', participantIds, ...content});

export const expansionRun4ComparisonCasefiles: readonly ComparisonCasefile[] = [
  branchCase(['logic', 'buddhist-epistemology'], {
    sharedQuestion: branchStatement('What makes an inference answerable to a standard, and what kind of knowledge or conclusion does that standard secure?', 'logic', 'buddhist-epistemology'),
    historicalRelationship: branchStatement('This is an asymmetric retrospective comparison between several logical traditions and the Buddhist pramāṇa lineages associated especially with Dignāga and Dharmakīrti, not a claim that Indian debate reproduced modern symbolic logic.', 'logic', 'buddhist-epistemology'),
    sharedAssumptions: [branchStatement('Both distinguish successful from defective reasoning and make the connection between reasons, signs, and conclusions a subject of disciplined analysis.', 'logic', 'buddhist-epistemology')],
    axes: [
      {label: 'Object of assessment', question: branchStatement('Is the primary target consequence in a formal system or a reliable episode of cognition?', 'logic', 'buddhist-epistemology'), positions: [
        {entityId: 'logic', claim: branchStatement('Logic studies consequence, validity, proof, and models across systems that specify languages, interpretations, and rules.', 'logic')},
        {entityId: 'buddhist-epistemology', claim: branchStatement('Buddhist epistemologists analyze pramāṇas, especially perception and inference, as reliable cognition within wider projects of debate, action, and liberation.', 'buddhist-epistemology')},
      ], contrast: branchStatement('Formal validity asks whether a conclusion follows under a system; pramāṇa theory asks how cognition succeeds, so neither question simply translates into the other.', 'logic', 'buddhist-epistemology')},
      {label: 'Inference and communication', question: branchStatement('How is an inferential connection established for oneself and presented to another?', 'logic', 'buddhist-epistemology'), positions: [
        {entityId: 'logic', claim: branchStatement('Proof-theoretic and model-theoretic approaches articulate inferential relations through rules, derivations, structures, and truth across interpretations.', 'logic')},
        {entityId: 'buddhist-epistemology', claim: branchStatement('Dignāga–Dharmakīrti traditions distinguish inference for oneself from proof for others and analyze signs, pervasion, and exclusion in public argument.', 'buddhist-epistemology')},
      ], contrast: branchStatement('Both seek accountable transitions, but their languages, epistemic aims, and institutions of reasoning remain historically distinct.', 'logic', 'buddhist-epistemology')},
    ],
    terminology: [{topic: 'A warranted transition', positions: [
      {entityId: 'logic', term: 'logical consequence', explanation: branchStatement('A conclusion is a logical consequence when the relevant system allows no interpretation in which the premises are true and the conclusion false.', 'logic')},
      {entityId: 'buddhist-epistemology', term: 'pramāṇa and inference', explanation: branchStatement('Pramāṇa names reliable cognition, while Buddhist theories of inference examine how a sign warrants cognition of what is not presently perceived.', 'buddhist-epistemology')},
    ], warning: branchStatement('Pramāṇa should not be translated as formal validity, and Buddhist epistemology should not be redescribed as one Indian version of contemporary logic.', 'logic', 'buddhist-epistemology')}],
    arguments: [
      {entityId: 'logic', title: 'Make consequence explicit', summary: branchStatement('Formalization can expose whether a claimed transition depends on structure rather than persuasive wording or an accidental feature of one example.', 'logic'), pressure: branchStatement('A formal account must still explain why its abstraction illuminates the reasoning practice from which it selects features.', 'logic')},
      {entityId: 'buddhist-epistemology', title: 'Connect cognition to a reliable sign', summary: branchStatement('Inference can extend knowledge when the reason is appropriately related to what it establishes and survives disciplined challenge.', 'buddhist-epistemology'), pressure: branchStatement('The account must explain how conceptual inference relates to nonconceptual perception and to its soteriological and debating contexts.', 'buddhist-epistemology')},
    ],
    readings: [
      {entityId: 'logic', title: 'Prior Analytics, Book I.1–7', author: 'Aristotle', kind: 'primary', stage: 'Begin with a theory of deduction', whyHere: branchStatement('The chapters introduce terms, propositions, and syllogistic consequence without making Aristotelian logic stand for every logical system.', 'logic')},
      {entityId: 'buddhist-epistemology', title: 'Pramāṇasamuccaya, Chapter 1 selections', author: 'Dignāga', kind: 'primary', stage: 'Reorient the comparison around cognition', whyHere: branchStatement('The selections make perception and inference part of a Buddhist epistemic project rather than a loose analogue of syllogistic form.', 'buddhist-epistemology')},
    ],
    interpretiveLimits: [branchStatement('Buddhist pramāṇa authors disagree across texts and later commentaries, while logic contains classical and nonclassical systems; comparison must name the system and lineage in view.', 'logic', 'buddhist-epistemology')],
    followOns: [{kind: 'branch', participantIds: ['logic', 'philosophy-of-language'], label: 'Logic and Philosophy of Language', reason: branchStatement('Return to the relation among formal consequence, semantics, meaning, and interpretation in an already authored casefile.', 'logic', 'philosophy-of-language')}],
  }),

  branchCase(['political-philosophy', 'feminist-philosophy'], {
    sharedQuestion: branchStatement('How should authority, justice, membership, and power be assessed when households, bodies, labor, knowledge, and political institutions are structured together?', 'political-philosophy', 'feminist-philosophy'),
    historicalRelationship: branchStatement('Feminist philosophers have criticized and reconstructed political philosophy from within many traditions while also creating problems and methods that inherited public–private and universal-subject frameworks obscured.', 'political-philosophy', 'feminist-philosophy'),
    sharedAssumptions: [branchStatement('Both ask which institutions and relations can be justified to those who live under them and how domination, exclusion, and collective action should be understood.', 'political-philosophy', 'feminist-philosophy')],
    axes: [
      {label: 'Where power operates', question: branchStatement('Can legitimacy and coercion be assessed without analyzing the supposedly private organization of life?', 'political-philosophy', 'feminist-philosophy'), positions: [
        {entityId: 'political-philosophy', claim: branchStatement('Political philosophy examines authority, legitimacy, rights, justice, law, citizenship, and the design of institutions that exercise coercive power.', 'political-philosophy')},
        {entityId: 'feminist-philosophy', claim: branchStatement('Feminist political work shows how family, care, sexuality, embodiment, labor, violence, and knowledge can organize domination even when classified as private.', 'feminist-philosophy')},
      ], contrast: branchStatement('The feminist challenge does not abandon legitimacy; it tests whether the domain whose legitimacy is assessed was drawn around gendered exclusions.', 'political-philosophy', 'feminist-philosophy')},
      {label: 'The political subject', question: branchStatement('Whose standpoint and dependency are represented when institutions claim to address free and equal citizens?', 'political-philosophy', 'feminist-philosophy'), positions: [
        {entityId: 'political-philosophy', claim: branchStatement('Theories often model citizens, peoples, officials, classes, or groups to identify public reasons and fair terms of cooperation.', 'political-philosophy')},
        {entityId: 'feminist-philosophy', claim: branchStatement('Feminist approaches test abstractions against intersecting relations of gender, race, class, sexuality, disability, nationality, and coloniality.', 'feminist-philosophy')},
      ], contrast: branchStatement('Abstraction can clarify a principle, but it becomes distorting when the lives it omits are the mechanism by which the institution operates.', 'political-philosophy', 'feminist-philosophy')},
    ],
    terminology: [{topic: 'Power requiring justification', positions: [
      {entityId: 'political-philosophy', term: 'political legitimacy', explanation: branchStatement('Legitimacy concerns the conditions under which political authority and coercive institutions may permissibly rule.', 'political-philosophy')},
      {entityId: 'feminist-philosophy', term: 'interlocking or intersecting domination', explanation: branchStatement('The terms direct attention to structures that are not understood by adding isolated gender, race, or class disadvantages after the fact.', 'feminist-philosophy')},
    ], warning: branchStatement('Feminist philosophy is a plural field, not one corrective theory or an account of a universal and internally uniform category of woman.', 'political-philosophy', 'feminist-philosophy')}],
    arguments: [
      {entityId: 'political-philosophy', title: 'Demand public justification', summary: branchStatement('Institutions that impose law and distribute standing owe reasons to the people subject to their decisions and procedures.', 'political-philosophy'), pressure: branchStatement('Public justification can reproduce domination if the public, the relevant interests, or the terms of participation are already exclusionary.', 'political-philosophy')},
      {entityId: 'feminist-philosophy', title: 'Redraw the map of the political', summary: branchStatement('Power in care, reproduction, violence, work, and knowledge must become visible before freedom and equality can be assessed.', 'feminist-philosophy'), pressure: branchStatement('Feminist approaches disagree about rights, states, markets, abolition, identity, coalition, and transnational solidarity rather than supplying one remedy.', 'feminist-philosophy')},
    ],
    readings: [
      {entityId: 'political-philosophy', title: 'The Subjection of Women, Chapters I–IV', author: 'John Stuart Mill', kind: 'primary', stage: 'Test a liberal argument against gender hierarchy', whyHere: branchStatement('Mill connects legal equality, education, marriage, individuality, and social progress while leaving historical and imperial tensions open to criticism.', 'political-philosophy')},
      {entityId: 'feminist-philosophy', title: 'The Combahee River Collective Statement', author: 'Combahee River Collective', kind: 'primary', stage: 'Change the structure of the problem', whyHere: branchStatement('The statement makes interlocking oppression, Black feminist organizing, coalition, and collective liberation central to political analysis.', 'feminist-philosophy')},
    ],
    interpretiveLimits: [branchStatement('Neither field has a single method, and feminist contributions should not be reduced to adding gender examples to theories whose concepts and boundaries remain untouched.', 'political-philosophy', 'feminist-philosophy')],
    followOns: [{kind: 'branch', participantIds: ['feminist-philosophy', 'ethics'], label: 'Feminist Philosophy and Ethics', reason: branchStatement('Follow how power, dependency, care, agency, and structural harm transform moral questions and methods.', 'feminist-philosophy', 'ethics')}],
  }),

  branchCase(['feminist-philosophy', 'ethics'], {
    sharedQuestion: branchStatement('How should moral inquiry change when power, dependency, race, class, gender, sexuality, disability, and social reproduction shape agency and harm?', 'feminist-philosophy', 'ethics'),
    historicalRelationship: branchStatement('Feminist ethics works within and against deontological, consequentialist, virtue, care, pragmatist, phenomenological, and nonideal approaches rather than replacing ethics with one gendered doctrine.', 'feminist-philosophy', 'ethics'),
    sharedAssumptions: [branchStatement('Both assess reasons, responsibilities, relationships, character, action, and institutions while asking which harms and forms of flourishing deserve moral attention.', 'feminist-philosophy', 'ethics')],
    axes: [
      {label: 'Method and starting point', question: branchStatement('Should moral theory begin from a general procedure or from relations and exclusions that shape who can act?', 'feminist-philosophy', 'ethics'), positions: [
        {entityId: 'feminist-philosophy', claim: branchStatement('Feminist ethics examines how a supposedly neutral subject, case, or division of public and private can encode privileged experience.', 'feminist-philosophy')},
        {entityId: 'ethics', claim: branchStatement('Ethical theories compare duties, consequences, virtues, values, reasons, and forms of relationship through competing methods of justification.', 'ethics')},
      ], contrast: branchStatement('Feminist critique can revise what counts as a moral problem, while general theory can still supply resources that feminist philosophers reconstruct rather than discard.', 'feminist-philosophy', 'ethics')},
      {label: 'Agency and dependency', question: branchStatement('Is dependency an exception to normal agency or a basic condition of moral life?', 'feminist-philosophy', 'ethics'), positions: [
        {entityId: 'feminist-philosophy', claim: branchStatement('Feminist approaches analyze relational autonomy, care, vulnerability, social reproduction, violence, and resistance within unequal institutions.', 'feminist-philosophy')},
        {entityId: 'ethics', claim: branchStatement('Ethics asks how responsibility and the good apply to agents across changing capacities, relationships, roles, and collective practices.', 'ethics')},
      ], contrast: branchStatement('Recognizing dependency does not make agency disappear; it changes which relationships and material supports an account of responsibility must include.', 'feminist-philosophy', 'ethics')},
    ],
    terminology: [{topic: 'The moral subject', positions: [
      {entityId: 'feminist-philosophy', term: 'relational autonomy and care', explanation: branchStatement('Relational accounts ask how social conditions enable or damage agency, while care theories analyze attentive responsibilities without defining all feminist ethics.', 'feminist-philosophy')},
      {entityId: 'ethics', term: 'moral agent', explanation: branchStatement('A moral agent can answer to reasons and responsibilities, but traditions disagree about whether agency is grounded in rational choice, character, relation, or practice.', 'ethics')},
    ], warning: branchStatement('Feminist ethics is not synonymous with care ethics, and care can reproduce unequal burdens unless power, redistribution, and resistance remain visible.', 'feminist-philosophy', 'ethics')}],
    arguments: [
      {entityId: 'feminist-philosophy', title: 'Interrogate the supposedly universal case', summary: branchStatement('A moral framework may conceal its limits when the exemplary agent is independent only because another person’s care and labor are excluded from view.', 'feminist-philosophy'), pressure: branchStatement('Situated critique must still explain how claims travel across difference without making identity an automatic guarantee of truth.', 'feminist-philosophy')},
      {entityId: 'ethics', title: 'Make reasons assessable beyond one perspective', summary: branchStatement('Moral inquiry seeks reasons by which actions, character, relationships, and institutions can be criticized rather than merely described.', 'ethics'), pressure: branchStatement('Generality becomes false neutrality when the procedures and concepts ignore patterned vulnerability or unequal standing.', 'ethics')},
    ],
    readings: [
      {entityId: 'feminist-philosophy', title: 'The Combahee River Collective Statement', author: 'Combahee River Collective', kind: 'primary', stage: 'Begin from interlocking structures and coalition', whyHere: branchStatement('The statement changes the unit of moral and political analysis by connecting lived position, collective struggle, and structural liberation.', 'feminist-philosophy')},
      {entityId: 'ethics', title: 'Feminist Ethics', author: 'Kathryn Norlock and Jordan Pascoe', kind: 'secondary', stage: 'Map the field beyond care alone', whyHere: branchStatement('The survey follows dependency, power, care, intersectional criticism, and feminist disagreements across several ethical traditions.', 'ethics')},
    ],
    interpretiveLimits: [branchStatement('Black feminist, intersectional, trans, disability, decolonial, and transnational work changes ethical concepts and methods; it is not a final checklist of perspectives after the theory is complete.', 'feminist-philosophy', 'ethics')],
    followOns: [{kind: 'branch', participantIds: ['political-philosophy', 'ethics'], label: 'Political Philosophy and Ethics', reason: branchStatement('Return to the relation between moral reasons, public authority, coercion, and institutional design in an authored dossier.', 'political-philosophy', 'ethics')}],
  }),

  branchCase(['confucianism', 'legalism'], {
    sharedQuestion: branchStatement('How should rulers, officials, and subjects create durable order amid conflict, partiality, and uncertain conduct?', 'confucianism', 'legalism'),
    historicalRelationship: branchStatement('Confucian texts and diverse Warring States projects later grouped as “Legalism” developed in overlapping argumentative worlds, but “Legalism” is a retrospective and contested label rather than a unified self-described school.', 'confucianism', 'legalism'),
    sharedAssumptions: [branchStatement('Both make political order depend on cultivated or managed patterns of conduct rather than assuming that good intentions alone can stabilize a state.', 'confucianism', 'legalism')],
    axes: [
      {label: 'Instrument of order', question: branchStatement('Should order be led by ritual and cultivated example or by public standards, administrative techniques, and positional authority?', 'confucianism', 'legalism'), positions: [
        {entityId: 'confucianism', claim: branchStatement('Confucian traditions emphasize learning, ritual, humaneness, role, remonstrance, and exemplary conduct while disagreeing about human tendencies and institutions.', 'confucianism')},
        {entityId: 'legalism', claim: branchStatement('Texts later grouped as Legalist analyze fa, administrative technique, positional power, incentives, and the ruler’s problem of controlling information and officials.', 'legalism')},
      ], contrast: branchStatement('The contrast is not virtue versus law in a modern sense: ritual has institutional force, and fa is broader and less equivalent to modern rule of law than a one-word translation suggests.', 'confucianism', 'legalism')},
      {label: 'View of political agents', question: branchStatement('How much should government depend on the moral quality of rulers and officials?', 'confucianism', 'legalism'), positions: [
        {entityId: 'confucianism', claim: branchStatement('Confucian approaches cultivate judgment and character so role-bearers can respond appropriately rather than merely comply with incentives.', 'confucianism')},
        {entityId: 'legalism', claim: branchStatement('Legalist statecraft often distrusts reliance on exceptional virtue and designs offices and standards around predictable interests and administrative control.', 'legalism')},
      ], contrast: branchStatement('Confucian formation faces problems of hypocrisy and inherited hierarchy; Legalist technique faces problems of concentrated power, fear, and the ruler’s isolation.', 'confucianism', 'legalism')},
    ],
    terminology: [{topic: 'Ordering conduct', positions: [
      {entityId: 'confucianism', term: 'li and ren', explanation: branchStatement('Ritual and humaneness connect patterned roles with cultivated responsiveness, learning, and judgment rather than etiquette alone.', 'confucianism')},
      {entityId: 'legalism', term: 'fa, shu, and shi', explanation: branchStatement('Standards, administrative techniques, and positional power name distinguishable resources in texts later assembled under the Legalist label.', 'legalism')},
    ], warning: branchStatement('“Legalism” should be read as a qualified historiographic convenience, not as a synonym for authoritarianism, Qin rule, or one coherent doctrine.', 'confucianism', 'legalism')}],
    arguments: [
      {entityId: 'confucianism', title: 'Order begins with formed judgment', summary: branchStatement('Rules cannot anticipate every relation, so learning and ritual cultivate agents able to perceive what a role and situation require.', 'confucianism'), pressure: branchStatement('The approach must confront hierarchy, exclusion, family partiality, and the possibility that ritual preserves domination.', 'confucianism')},
      {entityId: 'legalism', title: 'Design for ordinary interests and hidden information', summary: branchStatement('A state that depends on sages is fragile, so offices, standards, rewards, and penalties should make conduct legible and controllable.', 'legalism'), pressure: branchStatement('Centralized surveillance and incentives can distort information, weaken trust, and leave the ruler unable to check the power built around the office.', 'legalism')},
    ],
    readings: [
      {entityId: 'confucianism', title: 'Analects, Books 2, 12, and 13', author: 'Confucius and early transmitters', kind: 'primary', stage: 'Compare rule, ritual, and exemplary government', whyHere: branchStatement('These books connect cultivation and public order while preserving the text’s dialogical and layered character.', 'confucianism')},
      {entityId: 'legalism', title: 'Han Feizi: “The Two Handles” and “The Five Vermin”', author: 'Han Fei', kind: 'primary', stage: 'Study standards and statecraft directly', whyHere: branchStatement('The chapters expose concerns about office, incentive, expertise, and control without making one text identical with every so-called Legalist project.', 'legalism')},
    ],
    interpretiveLimits: [branchStatement('Confucianism and the texts grouped as Legalist each contain internal disagreements, later receptions, and changing relations to imperial institutions; neither is a timeless Chinese essence.', 'confucianism', 'legalism')],
    followOns: [{kind: 'branch', participantIds: ['confucianism', 'mohism'], label: 'Confucianism and Mohism', reason: branchStatement('Compare differentiated care, impartial concern, ritual, standards, and benefit within another authored Warring States dossier.', 'confucianism', 'mohism')}],
  }),

  branchCase(['philosophy-of-mind', 'buddhist-philosophy'], {
    sharedQuestion: branchStatement('What must an account of mind, consciousness, personhood, and transformation explain?', 'philosophy-of-mind', 'buddhist-philosophy'),
    historicalRelationship: branchStatement('This conceptual comparison brings a modern field into contact with several Buddhist debates; it does not treat Buddhism as one philosophy of mind or claim an uncomplicated historical lineage into contemporary theories.', 'philosophy-of-mind', 'buddhist-philosophy'),
    sharedAssumptions: [branchStatement('Both examine experience, cognition, continuity, agency, and the relation between first-person life and explanatory analysis.', 'philosophy-of-mind', 'buddhist-philosophy')],
    axes: [
      {label: 'Explanatory project', question: branchStatement('Is the goal to explain minded states or to diagnose and transform the conditions of suffering?', 'philosophy-of-mind', 'buddhist-philosophy'), positions: [
        {entityId: 'philosophy-of-mind', claim: branchStatement('Philosophy of mind compares theories of consciousness, intentionality, representation, embodiment, causation, self, and other minds.', 'philosophy-of-mind')},
        {entityId: 'buddhist-philosophy', claim: branchStatement('Buddhist traditions analyze aggregates, consciousness, perception, craving, karma, and dependent conditions within paths of ethical and liberating transformation.', 'buddhist-philosophy')},
      ], contrast: branchStatement('A Buddhist analysis can illuminate cognition while remaining soteriological, and a theory of consciousness can explain a state without prescribing liberation.', 'philosophy-of-mind', 'buddhist-philosophy')},
      {label: 'Self and continuity', question: branchStatement('What persists through changing experiences, and what kind of subject owns them?', 'philosophy-of-mind', 'buddhist-philosophy'), positions: [
        {entityId: 'philosophy-of-mind', claim: branchStatement('Accounts of self range across substance, psychological continuity, embodiment, narrative, minimal subjectivity, and eliminative proposals.', 'philosophy-of-mind')},
        {entityId: 'buddhist-philosophy', claim: branchStatement('Non-self arguments reject a permanent independent self while allowing traditions to debate conventional persons, mind-streams, karma, and responsibility.', 'buddhist-philosophy')},
      ], contrast: branchStatement('Non-self is not the claim that no conventional person acts or suffers, and “the self” in philosophy of mind is not one agreed metaphysical object.', 'philosophy-of-mind', 'buddhist-philosophy')},
    ],
    terminology: [{topic: 'What a person is', positions: [
      {entityId: 'philosophy-of-mind', term: 'conscious subject', explanation: branchStatement('The term can mark the bearer or point of view of experience while theories dispute whether it requires substance, representation, embodiment, or continuity.', 'philosophy-of-mind')},
      {entityId: 'buddhist-philosophy', term: 'aggregates and non-self', explanation: branchStatement('Analysis through changing aggregates undermines appropriation as a permanent self without denying causal continuity or conventional agency.', 'buddhist-philosophy')},
    ], warning: branchStatement('Early Buddhist, Abhidharma, Madhyamaka, Yogācāra, and pramāṇa traditions disagree about mind and reality and cannot be fused into one Buddhist answer.', 'philosophy-of-mind', 'buddhist-philosophy')}],
    arguments: [
      {entityId: 'philosophy-of-mind', title: 'Explain subjective character and causal place', summary: branchStatement('A theory of mind must relate what experience is like to cognition, behavior, embodiment, representation, and the physical world.', 'philosophy-of-mind'), pressure: branchStatement('No single consciousness problem or contemporary physicalist debate exhausts the field’s explanatory targets.', 'philosophy-of-mind')},
      {entityId: 'buddhist-philosophy', title: 'Do not mistake the changing series for an owner', summary: branchStatement('If body, feeling, perception, formations, and consciousness are impermanent and conditioned, none warrants appropriation as an independent enduring self.', 'buddhist-philosophy'), pressure: branchStatement('Traditions must explain continuity, karma, responsibility, and awakening without silently restoring the self the analysis rejects.', 'buddhist-philosophy')},
    ],
    readings: [
      {entityId: 'philosophy-of-mind', title: 'What Is It Like to Be a Bat?', author: 'Thomas Nagel', kind: 'primary', stage: 'Isolate subjective character', whyHere: branchStatement('Nagel makes first-person character an explanatory demand without defining the whole field through one antireductionist argument.', 'philosophy-of-mind')},
      {entityId: 'buddhist-philosophy', title: 'Milindapañha, Book II: the chariot dialogue', author: 'Nāgasena tradition', kind: 'primary', stage: 'Test personhood without a permanent core', whyHere: branchStatement('The dialogue examines conventional designation and component analysis while requiring caution about its composite textual history.', 'buddhist-philosophy')},
    ],
    interpretiveLimits: [branchStatement('Resemblance between a Buddhist analysis and a contemporary theory does not prove equivalence, direct influence, or compatibility with physicalism.', 'philosophy-of-mind', 'buddhist-philosophy')],
    followOns: [{kind: 'branch', participantIds: ['stoicism', 'buddhist-philosophy'], label: 'Stoicism and Buddhist Philosophy', reason: branchStatement('Compare disciplined responses to suffering while preserving different accounts of self, agency, nature, and liberation.', 'stoicism', 'buddhist-philosophy')}],
  }),

  branchCase(['political-philosophy', 'marxism'], {
    sharedQuestion: branchStatement('How should power and collective life be understood when political institutions are entangled with property, production, class, and ideology?', 'political-philosophy', 'marxism'),
    historicalRelationship: branchStatement('Marx and later Marxist traditions transform inherited political questions by analyzing the state and rights within capitalist social relations, while political philosophy contains Marxist and non-Marxist approaches rather than one external rival.', 'political-philosophy', 'marxism'),
    sharedAssumptions: [branchStatement('Both examine authority, freedom, equality, collective action, institutions, and the conditions under which an existing order can be criticized or transformed.', 'political-philosophy', 'marxism')],
    axes: [
      {label: 'Primary object of critique', question: branchStatement('Should inquiry begin with legitimate institutions or with the social relations that produce and constrain them?', 'political-philosophy', 'marxism'), positions: [
        {entityId: 'political-philosophy', claim: branchStatement('Political theories assess legitimacy, authority, rights, justice, democracy, membership, and institutional design through competing normative frameworks.', 'political-philosophy')},
        {entityId: 'marxism', claim: branchStatement('Marxist traditions analyze capitalism, class, labor, property, exploitation, ideology, crisis, and state power as historically changing relations.', 'marxism')},
      ], contrast: branchStatement('A legitimate procedure can leave underlying domination untouched, while structural critique must still explain which institutions and norms should replace the order it criticizes.', 'political-philosophy', 'marxism')},
      {label: 'Agent of transformation', question: branchStatement('Who can change political life, and through which forms of organization?', 'political-philosophy', 'marxism'), positions: [
        {entityId: 'political-philosophy', claim: branchStatement('Political philosophy models citizens, officials, peoples, movements, and publics who justify, reform, resist, or found institutions.', 'political-philosophy')},
        {entityId: 'marxism', claim: branchStatement('Marxist projects emphasize class formation, collective practice, labor organization, parties, movements, and struggles whose forms remain deeply contested.', 'marxism')},
      ], contrast: branchStatement('Neither public reason nor class struggle names a self-executing mechanism; both require accounts of organization, exclusion, coercion, and democratic agency.', 'political-philosophy', 'marxism')},
    ],
    terminology: [{topic: 'How an order sustains itself', positions: [
      {entityId: 'political-philosophy', term: 'legitimacy', explanation: branchStatement('Legitimacy asks whether political power and coercive institutions possess a right or justification to rule.', 'political-philosophy')},
      {entityId: 'marxism', term: 'ideology', explanation: branchStatement('Marxist accounts variously analyze how social relations, practices, institutions, and representations conceal, naturalize, or organize domination.', 'marxism')},
    ], warning: branchStatement('Marxism contains several accounts of ideology; it should not be reduced to false beliefs imposed by a state or ruling class.', 'political-philosophy', 'marxism')}],
    arguments: [
      {entityId: 'political-philosophy', title: 'Specify justified authority', summary: branchStatement('Critique must state who may decide, which rights constrain power, and how those subject to institutions can contest them.', 'political-philosophy'), pressure: branchStatement('A focus on public rules may idealize away workplace domination, unpaid labor, inherited property, race, or colonial extraction.', 'political-philosophy')},
      {entityId: 'marxism', title: 'Expose the social relation beneath the legal form', summary: branchStatement('Formal freedom and equality can coexist with dependence when control over production organizes the real choices available to workers.', 'marxism'), pressure: branchStatement('Structural analysis must avoid economic reductionism and explain political freedom, race, gender, colonialism, ecology, and institutional alternatives.', 'marxism')},
    ],
    readings: [
      {entityId: 'political-philosophy', title: 'On the Jewish Question', author: 'Karl Marx', kind: 'primary', stage: 'Test political emancipation against social emancipation', whyHere: branchStatement('The essay stages a difficult relation among rights, the state, religion, and social power that later political theory continues to dispute.', 'political-philosophy')},
      {entityId: 'marxism', title: 'Capital, Volume I, Chapters 1 and 10', author: 'Karl Marx', kind: 'primary', stage: 'Move from legal exchange to production', whyHere: branchStatement('Commodity form and the working day show how equal exchange, coercion, class struggle, and material production interlock.', 'marxism')},
    ],
    interpretiveLimits: [branchStatement('Marxism includes rival theories and political movements; later parties, states, and outcomes cannot be treated as automatic implications of Marx’s texts or one unified doctrine.', 'political-philosophy', 'marxism')],
    followOns: [{kind: 'branch', participantIds: ['existentialism', 'marxism'], label: 'Existentialism and Marxism', reason: branchStatement('Ask how situated freedom and responsibility relate to class, alienation, ideology, and collective transformation.', 'existentialism', 'marxism')}],
  }),

  branchCase(['existentialism', 'marxism'], {
    sharedQuestion: branchStatement('How do freedom, responsibility, and transformation occur under historically formed material and social conditions?', 'existentialism', 'marxism'),
    historicalRelationship: branchStatement('Twentieth-century thinkers including Sartre and Beauvoir brought existential and Marxist problems into sustained contact, but neither existentialism nor Marxism is a single position and their attempted syntheses remain contested.', 'existentialism', 'marxism'),
    sharedAssumptions: [branchStatement('Both reject a timeless isolated subject and analyze agency through situations, conflicts, practices, and conditions that people inherit without simply choosing.', 'existentialism', 'marxism')],
    axes: [
      {label: 'Situation and structure', question: branchStatement('How should inherited conditions shape an account of freedom?', 'existentialism', 'marxism'), positions: [
        {entityId: 'existentialism', claim: branchStatement('Existential projects analyze facticity, situation, ambiguity, authenticity, embodiment, and responsibility without making freedom unlimited choice.', 'existentialism')},
        {entityId: 'marxism', claim: branchStatement('Marxist projects analyze modes of production, class relations, labor, alienation, ideology, institutions, and collective historical practice.', 'marxism')},
      ], contrast: branchStatement('Situated freedom resists structural fatalism, while material analysis resists treating every constraint as a personal attitude or decision.', 'existentialism', 'marxism')},
      {label: 'Scale of transformation', question: branchStatement('Does liberation turn chiefly on lived commitment or on collective institutional change?', 'existentialism', 'marxism'), positions: [
        {entityId: 'existentialism', claim: branchStatement('Existential ethics asks how a person assumes freedom and responsibility amid ambiguity, oppression, bad faith, and relations with others.', 'existentialism')},
        {entityId: 'marxism', claim: branchStatement('Marxist politics asks how organized struggle can transform production, property, state power, and the collective capacities shaped by them.', 'marxism')},
      ], contrast: branchStatement('The useful dispute is not individualism versus collectivism: Beauvoir’s existential ethics analyzes oppression, and Marxist practice still depends on agents who interpret and organize.', 'existentialism', 'marxism')},
    ],
    terminology: [{topic: 'Inherited conditions', positions: [
      {entityId: 'existentialism', term: 'situation and facticity', explanation: branchStatement('Situation names freedom as exercised through bodily, historical, social, and material conditions that are neither self-created nor simply destiny.', 'existentialism')},
      {entityId: 'marxism', term: 'alienation and mode of production', explanation: branchStatement('These concepts analyze how labor and historically specific social relations organize powers, needs, dependence, and separation.', 'marxism')},
    ], warning: branchStatement('Existentialism includes theistic, atheistic, phenomenological, literary, feminist, and anticolonial projects; Marxism likewise contains rival accounts of history, ideology, organization, and emancipation.', 'existentialism', 'marxism')}],
    arguments: [
      {entityId: 'existentialism', title: 'Conditions do not decide the response in advance', summary: branchStatement('Oppression can narrow possibilities without turning people into things wholly deprived of interpretation, action, or solidarity.', 'existentialism'), pressure: branchStatement('An ethics of freedom must explain material power and collective institutions rather than celebrating heroic choice under preventable domination.', 'existentialism')},
      {entityId: 'marxism', title: 'Freedom requires transformed social powers', summary: branchStatement('People cannot realize capacities abstractly when property and production organize their dependence, labor, time, and access to collective goods.', 'marxism'), pressure: branchStatement('Structural explanation must preserve contingency, political judgment, cultural difference, and forms of domination not reducible to class.', 'marxism')},
    ],
    readings: [
      {entityId: 'existentialism', title: 'The Ethics of Ambiguity, Parts I–III', author: 'Simone de Beauvoir', kind: 'primary', stage: 'Begin with situated freedom and oppression', whyHere: branchStatement('Beauvoir connects ambiguity, responsibility, violence, and liberation without reducing existentialism to solitary authenticity.', 'existentialism')},
      {entityId: 'marxism', title: 'Economic and Philosophic Manuscripts: “Alienated Labour”', author: 'Karl Marx', kind: 'primary', stage: 'Analyze freedom within labor', whyHere: branchStatement('The manuscript links estranged work, human powers, property, and social relations while requiring comparison with Marx’s later economic critique.', 'marxism')},
    ],
    interpretiveLimits: [branchStatement('No linear story runs from Marx to existentialism, and later existential Marxism should not erase feminist, anticolonial, religious, or non-European transformations of either field.', 'existentialism', 'marxism')],
    followOns: [{kind: 'branch', participantIds: ['political-philosophy', 'marxism'], label: 'Political Philosophy and Marxism', reason: branchStatement('Return to legitimacy, rights, state power, class, ideology, and institutional transformation in an authored casefile.', 'political-philosophy', 'marxism')}],
  }),

  philosopherCase(['hobbes', 'rousseau'], {
    sharedQuestion: philosopherStatement('What makes political association legitimate when insecurity, dependence, coercion, and freedom are at stake?', 'hobbes', 'rousseau'),
    historicalRelationship: philosopherStatement('Rousseau inherits a contract vocabulary while criticizing Hobbes’s picture of natural conflict and redefining sovereignty as collective self-legislation rather than authorization of a separate sovereign.', 'hobbes', 'rousseau'),
    sharedAssumptions: [philosopherStatement('Both use a state-of-nature construction to expose the conditions and obligations of political society rather than simply report prehistoric events.', 'hobbes', 'rousseau')],
    axes: [
      {label: 'Problem that creates politics', question: philosopherStatement('Does political order chiefly answer insecurity or socially produced dependence and inequality?', 'hobbes', 'rousseau'), positions: [
        {entityId: 'hobbes', claim: philosopherStatement('Hobbes models agents vulnerable to conflict under uncertain enforcement and argues that authorization of an undivided sovereign secures peace.', 'hobbes')},
        {entityId: 'rousseau', claim: philosopherStatement('Rousseau presents inequality, property, comparison, and amour-propre as developmental sources of dependence that existing societies can intensify.', 'rousseau')},
      ], contrast: philosopherStatement('Hobbes’s construction explains why common power is necessary; Rousseau’s genealogy asks how social relations themselves produce the dependence that a legitimate pact must overcome.', 'hobbes', 'rousseau')},
      {label: 'Sovereignty and freedom', question: philosopherStatement('How can obedience to law remain compatible with freedom?', 'hobbes', 'rousseau'), positions: [
        {entityId: 'hobbes', claim: philosopherStatement('Subjects authorize a sovereign whose effective and undivided authority establishes law and peace while leaving specified liberties and the drive to self-preservation.', 'hobbes')},
        {entityId: 'rousseau', claim: philosopherStatement('Citizens remain free when they collectively constitute the sovereign and obey laws expressing the general will rather than another person’s private command.', 'rousseau')},
      ], contrast: philosopherStatement('Authorization and collective self-legislation are not interchangeable versions of consent: they locate sovereignty and continuing political agency differently.', 'hobbes', 'rousseau')},
    ],
    terminology: [{topic: 'How a multitude becomes political', positions: [
      {entityId: 'hobbes', term: 'authorization', explanation: philosopherStatement('Individuals authorize the sovereign to act in their name, producing a political person capable of judgment and enforcement.', 'hobbes')},
      {entityId: 'rousseau', term: 'general will', explanation: philosopherStatement('The general will concerns the common terms citizens legislate as equals and is not identical with every majority preference or a ruler’s declaration.', 'rousseau')},
    ], warning: philosopherStatement('Calling both thinkers contract theorists can hide Hobbesian authorization, Rousseauian popular sovereignty, and their different constructions of freedom and dependence.', 'hobbes', 'rousseau')}],
    arguments: [
      {entityId: 'hobbes', title: 'Security requires a final public authority', summary: philosopherStatement('Without an effective common power, even reasonable agents face uncertainty about others’ compliance and incentives to preempt or defect.', 'hobbes'), pressure: philosopherStatement('The account must explain the limits of obedience, retained liberties, moral obligation, and the risks of concentrated sovereign power.', 'hobbes')},
      {entityId: 'rousseau', title: 'Legitimate law must express collective freedom', summary: philosopherStatement('A people is politically free only when no citizen is simply subject to another’s private will and all share authorship of common law.', 'rousseau'), pressure: philosopherStatement('The account must address dissent, exclusion, scale, coercion, and Rousseau’s gendered limits on citizenship and education.', 'rousseau')},
    ],
    readings: [
      {entityId: 'hobbes', title: 'Leviathan, Chapters XIII–XVIII', author: 'Thomas Hobbes', kind: 'primary', stage: 'Build the case from insecurity to sovereignty', whyHere: philosopherStatement('The sequence develops the state of nature, laws of nature, covenant, authorization, and the institution of sovereign power.', 'hobbes')},
      {entityId: 'rousseau', title: 'On the Social Contract, Books I.1–8 and II.1–4', author: 'Jean-Jacques Rousseau', kind: 'primary', stage: 'Reconstruct pact and popular sovereignty', whyHere: philosopherStatement('The selections connect freedom, association, sovereign people, law, and the general will without treating Rousseau as a democratic Hobbes.', 'rousseau')},
    ],
    interpretiveLimits: [philosopherStatement('Hobbes’s moral foundations remain disputed, and Rousseau’s political freedom must be read beside his exclusions and the tension among his political, educational, and genealogical works.', 'hobbes', 'rousseau')],
    followOns: [{kind: 'philosopher', participantIds: ['rawls', 'nozick'], label: 'John Rawls and Robert Nozick', reason: philosopherStatement('Move from contract and sovereignty to rival accounts of justice, rights, distribution, and the basic structure.', 'rawls', 'nozick')}],
  }),

  philosopherCase(['bentham', 'mill'], {
    sharedQuestion: philosopherStatement('Can utility justify morality, law, liberty, and reform, and if so how should pleasures, rights, and social power be assessed?', 'bentham', 'mill'),
    historicalRelationship: philosopherStatement('Mill was formed within Benthamite reform and remained a utilitarian while revising its psychology, account of value, moral sanctions, liberty, individuality, and democratic politics.', 'bentham', 'mill'),
    sharedAssumptions: [philosopherStatement('Both judge institutions and conduct by their effects on human well-being and reject inherited authority as a sufficient justification for law or morality.', 'bentham', 'mill')],
    axes: [
      {label: 'Pleasure and value', question: philosopherStatement('How should utility compare different forms of enjoyment and suffering?', 'bentham', 'mill'), positions: [
        {entityId: 'bentham', claim: philosopherStatement('Bentham analyzes pleasure and pain through dimensions relevant to legislation and impartial aggregation rather than appealing to intrinsic qualitative ranks.', 'bentham')},
        {entityId: 'mill', claim: philosopherStatement('Mill distinguishes higher and lower pleasures through the informed preferences of competent judges while retaining happiness as the utilitarian end.', 'mill')},
      ], contrast: philosopherStatement('Mill’s quality distinction revises rather than abandons consequentialism, and Bentham’s felicific analysis is not a crude instruction to calculate every act mechanically.', 'bentham', 'mill')},
      {label: 'Law, liberty, and reform', question: philosopherStatement('How should utility constrain social and political coercion?', 'bentham', 'mill'), positions: [
        {entityId: 'bentham', claim: philosopherStatement('Bentham connects utility to codification, punishment, evidence, administration, constitutional reform, and criticism of legal fictions.', 'bentham')},
        {entityId: 'mill', claim: philosopherStatement('Mill defends individuality, experiments in living, liberty of discussion, equality, and representative government against social as well as legal coercion.', 'mill')},
      ], contrast: philosopherStatement('Both are reformers, but Mill gives individuality and anti-majoritarian protections a developmental role not captured by direct legislative calculation.', 'bentham', 'mill')},
    ],
    terminology: [{topic: 'The utilitarian standard', positions: [
      {entityId: 'bentham', term: 'principle of utility', explanation: philosopherStatement('The principle approves actions and institutions according to their tendency to increase happiness or reduce suffering among those affected.', 'bentham')},
      {entityId: 'mill', term: 'quality of pleasure and individuality', explanation: philosopherStatement('Mill argues that developed human capacities and chosen ways of life matter within happiness, not as external exceptions to utility.', 'mill')},
    ], warning: philosopherStatement('The contrast is not quantity against non-utilitarian quality: both remain consequentialists, and each has a changing corpus with political tensions.', 'bentham', 'mill')}],
    arguments: [
      {entityId: 'bentham', title: 'Make law answer to experienced consequences', summary: philosopherStatement('Punishment and legal burdens require justification through the harms they prevent and benefits they produce rather than tradition or natural-rights rhetoric alone.', 'bentham'), pressure: philosopherStatement('Aggregation must address distribution, security, rights-like expectations, minority burdens, and the information available to legislators.', 'bentham')},
      {entityId: 'mill', title: 'Protect individuality as part of well-being', summary: philosopherStatement('Liberty permits experiments in living and development of faculties whose value can be damaged by custom and majority opinion.', 'mill'), pressure: philosopherStatement('The harm principle, utility, empire, gender equality, democracy, and paternalism do not combine without interpretive and political tension.', 'mill')},
    ],
    readings: [
      {entityId: 'bentham', title: 'An Introduction to the Principles of Morals and Legislation, Chapters I–IV', author: 'Jeremy Bentham', kind: 'primary', stage: 'Establish utility and its dimensions', whyHere: philosopherStatement('The chapters introduce the standard, the sources and measures of pleasure and pain, and their legislative purpose.', 'bentham')},
      {entityId: 'mill', title: 'Utilitarianism, Chapters II and IV–V; On Liberty, Chapter III', author: 'John Stuart Mill', kind: 'primary', stage: 'Test quality, justice, and individuality', whyHere: philosopherStatement('The selections reveal how Mill connects happiness to qualitative judgment, justice, sanctions, liberty, and character.', 'mill')},
    ],
    interpretiveLimits: [philosopherStatement('Bentham and Mill address democracy, empire, punishment, gender, political economy, and religion across changing works; neither should be reduced to one slogan about pleasure.', 'bentham', 'mill')],
    followOns: [{kind: 'philosopher', participantIds: ['rawls', 'nozick'], label: 'John Rawls and Robert Nozick', reason: philosopherStatement('Test how later rights and justice theories challenge aggregation, patterned distribution, and state power.', 'rawls', 'nozick')}],
  }),

  philosopherCase(['rawls', 'nozick'], {
    sharedQuestion: philosopherStatement('What, if anything, justifies coercive redistribution and the institutions that shape citizens’ opportunities, holdings, and rights?', 'rawls', 'nozick'),
    historicalRelationship: philosopherStatement('Nozick’s Anarchy, State, and Utopia directly challenges Rawls’s A Theory of Justice, but each develops a wider project that cannot be reduced to a familiar redistribution debate.', 'rawls', 'nozick'),
    sharedAssumptions: [philosopherStatement('Both give individual freedom and moral equality a central role and ask how a state can justify coercion to people with separate lives and purposes.', 'rawls', 'nozick')],
    axes: [
      {label: 'Structure of justification', question: philosopherStatement('Should justice regulate the basic structure through fair principles or protect historical entitlements through side constraints?', 'rawls', 'nozick'), positions: [
        {entityId: 'rawls', claim: philosopherStatement('Rawls uses the original position to model fair agreement on equal liberties, fair opportunity, and inequalities arranged to benefit the least advantaged.', 'rawls')},
        {entityId: 'nozick', claim: philosopherStatement('Nozick defends rights as side constraints and an entitlement theory based on just acquisition, voluntary transfer, and rectification of injustice.', 'nozick')},
      ], contrast: philosopherStatement('Rawls evaluates the ongoing institutional structure; Nozick rejects patterned end-state principles when maintaining them requires interference with holdings justly acquired and transferred.', 'rawls', 'nozick')},
      {label: 'History and distribution', question: philosopherStatement('Can a distribution be judged apart from how it arose?', 'rawls', 'nozick'), positions: [
        {entityId: 'rawls', claim: philosopherStatement('Rawls treats social and economic prospects as shaped by a cooperative basic structure whose rules require public justification across time.', 'rawls')},
        {entityId: 'nozick', claim: philosopherStatement('Nozick makes the history of acquisition and transfer decisive and recognizes rectification where that history contains injustice.', 'nozick')},
      ], contrast: philosopherStatement('Nozick’s view is historical rather than a claim that merit determines holdings, while Rawls’s principles are not a schedule for equalizing every outcome.', 'rawls', 'nozick')},
    ],
    terminology: [{topic: 'Justice in holdings and institutions', positions: [
      {entityId: 'rawls', term: 'justice as fairness', explanation: philosopherStatement('Fair terms are represented through an original position that prevents parties from tailoring principles to their social advantages.', 'rawls')},
      {entityId: 'nozick', term: 'entitlement and side constraints', explanation: philosopherStatement('A holding is just when it arises through just acquisition and transfer, subject to rectification, while rights limit how people may be used for others’ ends.', 'nozick')},
    ], warning: philosopherStatement('Entitlement is not a theory of desert, and justice as fairness changes between A Theory of Justice and Rawls’s later account of political liberalism.', 'rawls', 'nozick')}],
    arguments: [
      {entityId: 'rawls', title: 'Neutralize arbitrary bargaining advantage', summary: philosopherStatement('Principles chosen without knowledge of one’s social position represent reciprocity among citizens who could occupy very different places in the basic structure.', 'rawls'), pressure: philosopherStatement('The model faces criticism about idealization, race, gender, disability, colonial history, the family, global justice, and the metric of advantage.', 'rawls')},
      {entityId: 'nozick', title: 'Do not use persons as distributive resources', summary: philosopherStatement('Strong rights constrain redistribution because individuals are separate persons whose lives and holdings cannot simply be pooled for a social pattern.', 'nozick'), pressure: philosopherStatement('The theory must specify original acquisition and rectification under histories marked by conquest, enslavement, dispossession, discrimination, and unequal bargaining power.', 'nozick')},
    ],
    readings: [
      {entityId: 'rawls', title: 'A Theory of Justice, §§11–17 and 46–49', author: 'John Rawls', kind: 'primary', stage: 'Construct justice as fairness', whyHere: philosopherStatement('The sections introduce the original position, principles, priority, and distributive institutions before later revisions are considered.', 'rawls')},
      {entityId: 'nozick', title: 'Anarchy, State, and Utopia, Part II, Chapter 7', author: 'Robert Nozick', kind: 'primary', stage: 'Read the entitlement challenge', whyHere: philosopherStatement('The chapter develops historical principles, entitlement, the Wilt Chamberlain example, and objections to patterned distribution.', 'nozick')},
    ],
    interpretiveLimits: [philosopherStatement('The canonical debate should not displace critiques from race, gender, disability, colonialism, Indigenous dispossession, or global justice, and neither thinker speaks for every liberal or libertarian view.', 'rawls', 'nozick')],
    followOns: [{kind: 'branch', participantIds: ['political-philosophy', 'marxism'], label: 'Political Philosophy and Marxism', reason: philosopherStatement('Widen the dispute from distributive principles to property, production, class, ideology, and state power.', 'rawls', 'nozick')}],
  }),

  philosopherCase(['beauvoir', 'judith-butler'], {
    sharedQuestion: philosopherStatement('How do social norms make gendered subjects and lives possible, constrained, recognizable, and contestable?', 'beauvoir', 'judith-butler'),
    historicalRelationship: philosopherStatement('Butler critically rereads Beauvoir among several feminist and continental inheritances, but should not be described as merely updating a finished Beauvoirian theory of gender.', 'beauvoir', 'judith-butler'),
    sharedAssumptions: [philosopherStatement('Both reject anatomy as a sufficient destiny and analyze how social meanings, repeated practices, embodiment, and relations with others shape gendered agency.', 'beauvoir', 'judith-butler')],
    axes: [
      {label: 'Becoming a subject', question: philosopherStatement('How do situation and norms form gendered lives without eliminating agency?', 'beauvoir', 'judith-butler'), positions: [
        {entityId: 'beauvoir', claim: philosopherStatement('Beauvoir analyzes becoming woman through situation, embodiment, myth, labor, sexuality, socialization, and the position of the Other.', 'beauvoir')},
        {entityId: 'judith-butler', claim: philosopherStatement('Butler analyzes performativity as reiteration of norms that materialize sexed and gendered subjects while remaining vulnerable to failure and resignification.', 'judith-butler')},
      ], contrast: philosopherStatement('Situated becoming and performative materialization overlap without being equivalents: they use different methods and assign different roles to existential freedom, discourse, and normativity.', 'beauvoir', 'judith-butler')},
      {label: 'Ethics and politics', question: philosopherStatement('How does critique move from subject formation to responsibility and collective change?', 'beauvoir', 'judith-butler'), positions: [
        {entityId: 'beauvoir', claim: philosopherStatement('Beauvoir’s ethics links one person’s freedom to the freedom of others and analyzes oppression as the organized foreclosure of possibilities.', 'beauvoir')},
        {entityId: 'judith-butler', claim: philosopherStatement('Butler’s later work develops opacity, recognizability, precarity, grievability, assembly, interdependency, and nonviolence beyond the vocabulary of Gender Trouble.', 'judith-butler')},
      ], contrast: philosopherStatement('Neither project ends with personal identity: both connect subject formation to conditions for livable agency, though their ethical vocabularies and political emphases change.', 'beauvoir', 'judith-butler')},
    ],
    terminology: [{topic: 'Gender as socially formed', positions: [
      {entityId: 'beauvoir', term: 'situation and becoming', explanation: philosopherStatement('Becoming occurs through embodied and historical conditions that constrain projects without turning biology or social role into unalterable fate.', 'beauvoir')},
      {entityId: 'judith-butler', term: 'performativity and recognizability', explanation: philosopherStatement('Performativity concerns reiterative norm-governed acts, not freely chosen theater, while recognizability names conditions under which a life becomes socially intelligible.', 'judith-butler')},
    ], warning: philosopherStatement('Neither account warrants a universal transhistorical definition of woman; politically useful categories remain contested, situated, and answerable to those they exclude.', 'beauvoir', 'judith-butler')}],
    arguments: [
      {entityId: 'beauvoir', title: 'Expose destiny as a produced situation', summary: philosopherStatement('The social meanings attached to bodies, work, desire, motherhood, and dependence help produce the possibilities available to women.', 'beauvoir'), pressure: philosopherStatement('Beauvoir’s generalizations, examples, racial and colonial blind spots, and treatment of sexual difference require critical contextual reading.', 'beauvoir')},
      {entityId: 'judith-butler', title: 'Norms persist through repetition and can fail', summary: philosopherStatement('Gendered coherence is produced through repeated norms rather than expressing a prior stable identity, making variation and contest possible within constraint.', 'judith-butler'), pressure: philosopherStatement('The account must clarify materiality, agency, institutional power, and how contested categories can still organize political struggle.', 'judith-butler')},
    ],
    readings: [
      {entityId: 'beauvoir', title: 'The Second Sex, Introduction and selected Book II chapters', author: 'Simone de Beauvoir', kind: 'primary', stage: 'Analyze situation and becoming', whyHere: philosopherStatement('Read the claims about myth, embodiment, and lived situation alongside the work’s historical generalizations and exclusions.', 'beauvoir')},
      {entityId: 'judith-butler', title: 'Gender Trouble, Preface and Chapter 1; Giving an Account of Oneself, Chapter 1', author: 'Judith Butler', kind: 'primary', stage: 'Follow the corpus beyond performativity', whyHere: philosopherStatement('The pairing connects category and norm critique to Butler’s later account of opacity, recognition, address, and responsibility.', 'judith-butler')},
    ],
    interpretiveLimits: [philosopherStatement('Beauvoir and Butler have changing, internally disputed corpora; trans feminist, Black feminist, materialist, disability, psychoanalytic, and transnational critiques cannot be collapsed into their two-person exchange.', 'beauvoir', 'judith-butler')],
    followOns: [{kind: 'branch', participantIds: ['feminist-philosophy', 'ethics'], label: 'Feminist Philosophy and Ethics', reason: philosopherStatement('Widen the route to care, dependency, relational agency, intersectional method, responsibility, and structural harm.', 'beauvoir', 'judith-butler')}],
  }),

  philosopherCase(['marx', 'fanon'], {
    sharedQuestion: philosopherStatement('How do alienation, racialization, colonial domination, violence, and liberation reorganize social critique?', 'marx', 'fanon'),
    historicalRelationship: philosopherStatement('Fanon transforms Marxist, phenomenological, existential, psychiatric, and Black Atlantic resources under colonial conditions; he neither simply applies Marx to colonies nor merely adds race to a completed class analysis.', 'marx', 'fanon'),
    sharedAssumptions: [philosopherStatement('Both analyze domination as historically produced through social relations and practical institutions rather than as a permanent defect of human nature.', 'marx', 'fanon')],
    axes: [
      {label: 'Structure of domination', question: philosopherStatement('Which relations organize alienated life and make domination appear normal?', 'marx', 'fanon'), positions: [
        {entityId: 'marx', claim: philosopherStatement('Marx analyzes commodity production, wage labor, exploitation, class, alienation, fetishism, and political forms within capitalist development.', 'marx')},
        {entityId: 'fanon', claim: philosopherStatement('Fanon analyzes colonial partition, racializing perception, language, psychiatry, violence, land, culture, and national consciousness as a distinct field of domination.', 'fanon')},
      ], contrast: philosopherStatement('Colonial racialization is not a secondary cultural effect added to class, and capitalist relations do not disappear from Fanon’s account of empire and national bourgeois power.', 'marx', 'fanon')},
      {label: 'Liberation and political danger', question: philosopherStatement('How can collective struggle transform social relations without reproducing domination?', 'marx', 'fanon'), positions: [
        {entityId: 'marx', claim: philosopherStatement('Marx connects emancipation to collective transformation of production, property, class power, and the social capacities alienated under capitalism.', 'marx')},
        {entityId: 'fanon', claim: philosopherStatement('Fanon connects decolonization to organized struggle, political education, culture, and new institutions while warning against national-bourgeois capture after independence.', 'fanon')},
      ], contrast: philosopherStatement('Liberation is neither automatic historical progress nor a purifying event; both projects require attention to organization, new institutions, and the dangers within transition.', 'marx', 'fanon')},
    ],
    terminology: [{topic: 'A social power turned against people', positions: [
      {entityId: 'marx', term: 'alienation and fetishism', explanation: philosopherStatement('Human powers and social relations confront people as external forces through estranged labor and the commodity form.', 'marx')},
      {entityId: 'fanon', term: 'colonial racialization and decolonization', explanation: philosopherStatement('Colonial institutions organize embodied inferiority, spatial division, and political violence, while decolonization contests the whole imposed order.', 'fanon')},
    ], warning: philosopherStatement('Fanon’s account of violence is diagnostic, political, and strategic rather than an unconditional celebration, and Marx’s critique is not one complete theory of race or colonialism.', 'marx', 'fanon')}],
    arguments: [
      {entityId: 'marx', title: 'Expose the social relation hidden by the commodity', summary: philosopherStatement('Apparently independent things and equal exchanges can conceal relations among workers, owners, production, and accumulated social power.', 'marx'), pressure: philosopherStatement('The critique must be extended without reducing race, colonialism, gender, ecology, and political institutions to simple expressions of class.', 'marx')},
      {entityId: 'fanon', title: 'Decolonization must remake the world of the colonized', summary: philosopherStatement('Colonial domination works through force, space, language, embodiment, medicine, economy, and recognition, so liberation cannot be only a legal transfer of office.', 'fanon'), pressure: philosopherStatement('Revolutionary violence, organization, nationalism, culture, internationalism, and postcolonial institution-building remain in unresolved tension.', 'fanon')},
    ],
    readings: [
      {entityId: 'marx', title: 'Capital, Volume I, Chapter 1', author: 'Karl Marx', kind: 'primary', stage: 'Learn the commodity critique', whyHere: philosopherStatement('The chapter develops value, commodity form, and fetishism as a basis for comparing Fanon without making Marx the universal starting point.', 'marx')},
      {entityId: 'fanon', title: 'Black Skin, White Masks, Chapter 5; The Wretched of the Earth, “On Violence” and “The Pitfalls of National Consciousness”', author: 'Frantz Fanon', kind: 'primary', stage: 'Center racialized embodiment and decolonization', whyHere: philosopherStatement('The selections connect lived racialization, colonial force, organized resistance, and the danger of postcolonial elite capture.', 'fanon')},
    ],
    interpretiveLimits: [philosopherStatement('A Europe-to-colony sequence misstates the comparison: Fanon’s Martinican, French, psychiatric, and Algerian contexts make colonialism constitutive of his critique, not an applied afterthought.', 'marx', 'fanon')],
    followOns: [{kind: 'branch', participantIds: ['political-philosophy', 'marxism'], label: 'Political Philosophy and Marxism', reason: philosopherStatement('Continue through rights, legitimacy, state power, class, ideology, and competing institutions of transformation.', 'marx', 'fanon')}],
  }),
];
