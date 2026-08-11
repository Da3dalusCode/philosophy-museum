import type {ComparisonCasefile, ComparisonEntityKind, ComparisonStatement} from '../types/philosophy';

/**
 * Content-expansion run 3 casefiles remain a non-canonical teaching surface.
 * Every statement points to a directly reviewed source on a locked canonical record.
 */
const sourceIds: Record<string, string> = {
  logic: 'log-classical-sep',
  'philosophy-of-language': 'lan-meaning-sep',
  aesthetics: 'aes-concept-sep',
  'philosophy-of-mind': 'mind-consciousness-sep',
  ethics: 'eth-moral-sep',
  'political-philosophy': 'pol-legitimacy-sep',
  'feminist-philosophy': 'fem-epistemology-sep',
  epistemology: 'epi-sep',
  'philosophy-of-religion': 'por-sep',
  metaphysics: 'met-sep',
  'buddhist-epistemology': 'dig-india-ep-sep',
  peirce: 'peirce-sep',
  'william-james': 'james-sep',
  dewey: 'dewey-sep',
  kant: 'kant-sep',
  hegel: 'hegel-sep',
  husserl: 'hss-sep',
  heidegger: 'hdg-sep',
};

const statement = (kind: ComparisonEntityKind, text: string, ...entityIds: string[]): ComparisonStatement => ({
  text,
  evidence: entityIds.map((entityId) => ({entityKind: kind, entityId, sourceId: sourceIds[entityId]})),
});
const branchStatement = (text: string, ...ids: string[]) => statement('branch', text, ...ids);
const philosopherStatement = (text: string, ...ids: string[]) => statement('philosopher', text, ...ids);
const branchCase = (participantIds: readonly [string, string], content: Omit<ComparisonCasefile, 'kind' | 'participantIds'>): ComparisonCasefile => ({kind: 'branch', participantIds, ...content});
const philosopherCase = (participantIds: readonly [string, string], content: Omit<ComparisonCasefile, 'kind' | 'participantIds'>): ComparisonCasefile => ({kind: 'philosopher', participantIds, ...content});

export const expansionRun3ComparisonCasefiles: readonly ComparisonCasefile[] = [
  branchCase(['logic', 'philosophy-of-language'], {
    sharedQuestion: branchStatement('How do form, meaning, and interpretation make reasoning understandable and assessable?', 'logic', 'philosophy-of-language'),
    historicalRelationship: branchStatement('The fields overlap wherever formal languages receive semantics or natural-language arguments are regimented, but neither field is simply a subdivision of the other.', 'logic', 'philosophy-of-language'),
    sharedAssumptions: [branchStatement('Both require distinctions among expressions, what they contribute, and the relations that make conclusions or interpretations answerable to standards.', 'logic', 'philosophy-of-language')],
    axes: [
      {label: 'Primary task', question: branchStatement('Is the central task to identify consequence or to explain linguistic meaning?', 'logic', 'philosophy-of-language'), positions: [
        {entityId: 'logic', claim: branchStatement('Logic studies consequence through deductive systems, models, and standards such as validity, soundness, and completeness.', 'logic')},
        {entityId: 'philosophy-of-language', claim: branchStatement('Philosophy of language studies meaning, reference, truth conditions, use, and the relation between semantic content and speakers.', 'philosophy-of-language')},
      ], contrast: branchStatement('A semantics can belong to a logic while leaving wider questions about reference, use, communication, and metasemantics unresolved.', 'logic', 'philosophy-of-language')},
      {label: 'Formalization', question: branchStatement('What is gained and lost when ordinary reasoning is represented in a formal language?', 'logic', 'philosophy-of-language'), positions: [
        {entityId: 'logic', claim: branchStatement('Formal systems make inferential structure explicit and allow precise comparison between derivability and model-theoretic validity.', 'logic')},
        {entityId: 'philosophy-of-language', claim: branchStatement('Theories of meaning ask how structured expressions acquire content and whether formal representation captures what speakers say and do.', 'philosophy-of-language')},
      ], contrast: branchStatement('Formalization can clarify selected structure without proving that natural language is defective or that meaning is exhausted by logical form.', 'logic', 'philosophy-of-language')},
    ],
    terminology: [{topic: 'What carries the standard?', positions: [
      {entityId: 'logic', term: 'logical consequence', explanation: branchStatement('A conclusion is a consequence when no interpretation allowed by the system makes its premises true and the conclusion false.', 'logic')},
      {entityId: 'philosophy-of-language', term: 'semantic content', explanation: branchStatement('Semantic content concerns what expressions mean or contribute to larger expressions, distinct from the further question of how that content is fixed.', 'philosophy-of-language')},
    ], warning: branchStatement('Consequence and content interact, but a theory of one does not automatically supply a complete theory of the other.', 'logic', 'philosophy-of-language')}],
    arguments: [
      {entityId: 'logic', title: 'Make truth-preservation explicit', summary: branchStatement('A formal account can test whether a conclusion follows across interpretations rather than relying on the surface grammar of one sentence.', 'logic'), pressure: branchStatement('The account must explain why its formal model illuminates the reasoning practices it abstracts from.', 'logic')},
      {entityId: 'philosophy-of-language', title: 'Explain how expressions mean', summary: branchStatement('A theory of meaning connects parts, wholes, reference, truth, and use so that linguistic understanding is more than symbol manipulation.', 'philosophy-of-language'), pressure: branchStatement('The theory must relate abstract content to ambiguity, context, speakers, and learnable linguistic practice.', 'philosophy-of-language')},
    ],
    readings: [
      {entityId: 'logic', title: 'Begriffsschrift, selections', author: 'Gottlob Frege', kind: 'primary', stage: 'See a formal language being built', whyHere: branchStatement('Frege makes logical form visible through a purpose-built notation whose philosophical ambitions exceed a classroom truth table.', 'logic')},
      {entityId: 'philosophy-of-language', title: 'On Sense and Reference', author: 'Gottlob Frege', kind: 'primary', stage: 'Ask what the notation must mean', whyHere: branchStatement('The essay distinguishes sense and reference while showing why co-reference does not settle cognitive significance.', 'philosophy-of-language')},
    ],
    interpretiveLimits: [branchStatement('Logic is not mere syntax, and philosophy of language is not informal commentary: formal semantics, inferentialism, and theories of truth cross the boundary.', 'logic', 'philosophy-of-language')],
    followOns: [{kind: 'branch', participantIds: ['logic', 'buddhist-epistemology'], label: 'Logic and Buddhist Epistemology', reason: branchStatement('Compare precise accounts of inference while preserving different languages, aims, and historical institutions.', 'logic', 'buddhist-epistemology')}],
  }),

  branchCase(['aesthetics', 'philosophy-of-mind'], {
    sharedQuestion: branchStatement('How should philosophy describe and explain experiences whose felt character matters to what they are?', 'aesthetics', 'philosophy-of-mind'),
    historicalRelationship: branchStatement('Aesthetic theories draw on perception, emotion, imagination, attention, and consciousness, while philosophies of mind use aesthetic cases without settling their value.', 'aesthetics', 'philosophy-of-mind'),
    sharedAssumptions: [branchStatement('Both reject the thought that a complete account can ignore how an experience appears to a subject and what it represents or discloses.', 'aesthetics', 'philosophy-of-mind')],
    axes: [
      {label: 'Explanatory target', question: branchStatement('Is the target a kind of minded state or a normatively assessable mode of attention and response?', 'aesthetics', 'philosophy-of-mind'), positions: [
        {entityId: 'aesthetics', claim: branchStatement('Aesthetics asks what makes attention, experience, judgment, or value aesthetic and whether the relevant features belong to responses, objects, or relations.', 'aesthetics')},
        {entityId: 'philosophy-of-mind', claim: branchStatement('Philosophy of mind asks how consciousness, intentionality, representation, embodiment, and causal organization characterize minded beings.', 'philosophy-of-mind')},
      ], contrast: branchStatement('Explaining how a response occurs does not by itself establish whether it is perceptive, fitting, or aesthetically valuable.', 'aesthetics', 'philosophy-of-mind')},
      {label: 'First-person character', question: branchStatement('What authority belongs to how an experience feels from within?', 'aesthetics', 'philosophy-of-mind'), positions: [
        {entityId: 'aesthetics', claim: branchStatement('Aesthetic experience can involve pleasure, displeasure, absorption, imagination, form, and evaluative attention without being reducible to one sensation.', 'aesthetics')},
        {entityId: 'philosophy-of-mind', claim: branchStatement('Accounts of phenomenal consciousness examine subjective character while disputing its relation to representation, access, and physical explanation.', 'philosophy-of-mind')},
      ], contrast: branchStatement('Both preserve experience, but aesthetics asks what warrants appreciation or criticism while philosophy of mind asks what consciousness is and how it fits into nature.', 'aesthetics', 'philosophy-of-mind')},
    ],
    terminology: [{topic: 'Experience from within', positions: [
      {entityId: 'aesthetics', term: 'aesthetic experience', explanation: branchStatement('The term marks disputed forms of attention and response associated with aesthetic properties or value, not one agreed mental kind.', 'aesthetics')},
      {entityId: 'philosophy-of-mind', term: 'phenomenal consciousness', explanation: branchStatement('The term concerns what an experience is like for its subject, while theories disagree about how that character is explained.', 'philosophy-of-mind')},
    ], warning: branchStatement('An experience can be conscious without being aesthetic, and calling it aesthetic adds questions of attention, fit, interpretation, and value.', 'aesthetics', 'philosophy-of-mind')}],
    arguments: [
      {entityId: 'aesthetics', title: 'Reasons can educate response', summary: branchStatement('Aesthetic criticism can direct attention to form, context, and comparison, allowing a response to be revised without replacing experience with a rule.', 'aesthetics'), pressure: branchStatement('The view must explain critical authority without treating culturally dominant taste as neutral.', 'aesthetics')},
      {entityId: 'philosophy-of-mind', title: 'Subjective character demands explanation', summary: branchStatement('A theory of mind must say how first-person character relates to intentional content, cognition, behavior, and physical processes.', 'philosophy-of-mind'), pressure: branchStatement('A causal or functional account must show whether it captures experience rather than only its reports and effects.', 'philosophy-of-mind')},
    ],
    readings: [
      {entityId: 'aesthetics', title: 'Critique of the Power of Judgment, guided selections', author: 'Immanuel Kant', kind: 'primary', stage: 'Analyze aesthetic judgment', whyHere: branchStatement('The selections connect pleasure, judgment, imagination, and claims to shared validity without defining aesthetics as beauty alone.', 'aesthetics')},
      {entityId: 'philosophy-of-mind', title: 'What Is It Like to Be a Bat?', author: 'Thomas Nagel', kind: 'primary', stage: 'Press the explanatory gap', whyHere: branchStatement('Nagel isolates subjective character and tests whether an objective account can capture what experience is like.', 'philosophy-of-mind')},
    ],
    interpretiveLimits: [branchStatement('Aesthetics includes art, nature, ugliness, sublimity, and everyday life; philosophy of mind includes much more than consciousness.', 'aesthetics', 'philosophy-of-mind')],
    followOns: [{kind: 'branch', participantIds: ['aesthetics', 'ethics'], label: 'Aesthetics and Ethics', reason: branchStatement('Move from the structure of experience to conflicts among aesthetic, artistic, and moral evaluation.', 'aesthetics', 'ethics')}],
  }),

  branchCase(['aesthetics', 'ethics'], {
    sharedQuestion: branchStatement('How can felt response, reasons, and criticism support judgments of value without reducing them to preference?', 'aesthetics', 'ethics'),
    historicalRelationship: branchStatement('Aesthetic and moral evaluation intersect in representation, character, emotion, institutions, and the effects of works, yet their standards can diverge.', 'aesthetics', 'ethics'),
    sharedAssumptions: [branchStatement('Both examine judgments that guide attention and conduct, can be disputed with reasons, and are not measured by popularity alone.', 'aesthetics', 'ethics')],
    axes: [
      {label: 'Object of assessment', question: branchStatement('What is being judged, and what kind of value is at stake?', 'aesthetics', 'ethics'), positions: [
        {entityId: 'aesthetics', claim: branchStatement('Aesthetic inquiry assesses experiences, properties, interpretations, performances, environments, and works in relation to aesthetic or artistic value.', 'aesthetics')},
        {entityId: 'ethics', claim: branchStatement('Ethical inquiry assesses actions, character, duties, consequences, relationships, practices, and institutions in relation to living and acting well.', 'ethics')},
      ], contrast: branchStatement('A work can be formally accomplished yet morally troubling, so identifying one value does not automatically determine the other.', 'aesthetics', 'ethics')},
      {label: 'Conflict of values', question: branchStatement('When should a moral defect change an aesthetic or artistic verdict?', 'aesthetics', 'ethics'), positions: [
        {entityId: 'aesthetics', claim: branchStatement('Aesthetics asks whether a defect in perspective, representation, or response can also impair understanding, expression, or artistic achievement.', 'aesthetics')},
        {entityId: 'ethics', claim: branchStatement('Ethics asks what harms, exclusions, responsibilities, and forms of character remain morally significant even when a work rewards attention.', 'ethics')},
      ], contrast: branchStatement('Neither automatic moralism nor complete separation should be assumed before the relation between the defect and the achievement is argued.', 'aesthetics', 'ethics')},
    ],
    terminology: [{topic: 'Normative judgment', positions: [
      {entityId: 'aesthetics', term: 'aesthetic judgment', explanation: branchStatement('An aesthetic judgment expresses an assessable response to perceived or interpreted features and may claim more than private liking.', 'aesthetics')},
      {entityId: 'ethics', term: 'moral judgment', explanation: branchStatement('A moral judgment assesses what agents, relationships, or institutions ought to do or be under reasons that concern those affected.', 'ethics')},
    ], warning: branchStatement('Calling both judgments normative does not make beauty goodness or moral rightness an aesthetic property.', 'aesthetics', 'ethics')}],
    arguments: [
      {entityId: 'aesthetics', title: 'Attend before issuing the verdict', summary: branchStatement('Aesthetic reasons often show where and how to perceive, compare, or interpret rather than deducing a response from a universal rule.', 'aesthetics'), pressure: branchStatement('Critical attention can still inherit exclusions about whose practices and responses count as refined.', 'aesthetics')},
      {entityId: 'ethics', title: 'Achievement does not erase responsibility', summary: branchStatement('Moral assessment keeps harms, agency, relationships, and institutional consequences visible when admiration might otherwise silence them.', 'ethics'), pressure: branchStatement('Ethical criticism must still explain when a moral feature changes artistic value rather than merely accompanying it.', 'ethics')},
    ],
    readings: [
      {entityId: 'aesthetics', title: 'Of the Standard of Taste', author: 'David Hume', kind: 'primary', stage: 'Study cultivated disagreement', whyHere: branchStatement('Hume connects sentiment to practice, comparison, perceptual delicacy, understanding, and the problem of prejudice.', 'aesthetics')},
      {entityId: 'ethics', title: 'Groundwork of the Metaphysics of Morals', author: 'Immanuel Kant', kind: 'primary', stage: 'Contrast moral justification', whyHere: branchStatement('The Groundwork makes moral worth and obligation answer to a distinct account of practical reason.', 'ethics')},
    ],
    interpretiveLimits: [branchStatement('Aesthetics contains rival moralist, autonomist, contextualist, feminist, and pragmatist approaches; ethics likewise supplies no single mechanical verdict on art.', 'aesthetics', 'ethics')],
    followOns: [{kind: 'branch', participantIds: ['aesthetics', 'philosophy-of-mind'], label: 'Aesthetics and Philosophy of Mind', reason: branchStatement('Ask how emotion, imagination, and first-person character contribute before judging their value.', 'aesthetics', 'philosophy-of-mind')}],
  }),

  branchCase(['political-philosophy', 'ethics'], {
    sharedQuestion: branchStatement('Which reasons can justify how people live together, exercise power, and distribute benefits and burdens?', 'political-philosophy', 'ethics'),
    historicalRelationship: branchStatement('Political philosophy belongs to practical philosophy and remains morally answerable, but coercive law and public institutions create problems not captured by private conduct alone.', 'political-philosophy', 'ethics'),
    sharedAssumptions: [branchStatement('Both ask what people owe one another and require reasons that can assess action, character, relationships, practices, or institutions.', 'political-philosophy', 'ethics')],
    axes: [
      {label: 'Authority and coercion', question: branchStatement('What changes when a norm is enforced through political power?', 'political-philosophy', 'ethics'), positions: [
        {entityId: 'political-philosophy', claim: branchStatement('Political philosophy asks when institutions possess legitimate authority and when coercive laws can create obligations.', 'political-philosophy')},
        {entityId: 'ethics', claim: branchStatement('Ethics examines obligation and good conduct across personal, professional, communal, and institutional relationships, including relations without state coercion.', 'ethics')},
      ], contrast: branchStatement('A morally attractive aim does not by itself justify who may impose it, by which procedure, or under what limits.', 'political-philosophy', 'ethics')},
      {label: 'Site of evaluation', question: branchStatement('Should judgment focus on agents or on the basic terms of collective life?', 'political-philosophy', 'ethics'), positions: [
        {entityId: 'political-philosophy', claim: branchStatement('Political theories assess constitutions, rights, authority, democracy, distribution, membership, and the standing of those subject to rule.', 'political-philosophy')},
        {entityId: 'ethics', claim: branchStatement('Ethical theories compare character, duty, consequence, care, relationship, and the reasons that guide particular and shared action.', 'ethics')},
      ], contrast: branchStatement('Just people can act within unjust structures, while just institutional rules still depend on agents who interpret and enact them.', 'political-philosophy', 'ethics')},
    ],
    terminology: [{topic: 'What makes a demand binding?', positions: [
      {entityId: 'political-philosophy', term: 'political legitimacy', explanation: branchStatement('Legitimacy concerns the justification of political authority and coercive power to those over whom it is exercised.', 'political-philosophy')},
      {entityId: 'ethics', term: 'moral justification', explanation: branchStatement('Moral justification asks whether reasons for action or evaluation withstand scrutiny from relevant duties, goods, relations, and consequences.', 'ethics')},
    ], warning: branchStatement('Legal validity, political legitimacy, and moral rightness can coincide, but none is simply another name for the others.', 'political-philosophy', 'ethics')}],
    arguments: [
      {entityId: 'political-philosophy', title: 'Power needs a public justification', summary: branchStatement('Because political decisions claim authority and can be coercive, their authors must explain who may rule, through which institutions, and on what terms.', 'political-philosophy'), pressure: branchStatement('Theories of legitimacy must address exclusion, colonial histories, unequal power, and people who reasonably reject the offered terms.', 'political-philosophy')},
      {entityId: 'ethics', title: 'Institutions do not replace moral agency', summary: branchStatement('Rules and offices still leave agents responsible for judgment, foreseeable harm, relationships, and the cultivation of trustworthy practices.', 'ethics'), pressure: branchStatement('Agent-centered ethics must avoid treating structural injustice as only a collection of private failures.', 'ethics')},
    ],
    readings: [
      {entityId: 'political-philosophy', title: 'Leviathan, chapters 13–18 and 21', author: 'Thomas Hobbes', kind: 'primary', stage: 'Confront authorization and security', whyHere: branchStatement('Hobbes makes the generation and limits of sovereign authority a problem distinct from advising one private person.', 'political-philosophy')},
      {entityId: 'ethics', title: 'Groundwork, Sections I–II', author: 'Immanuel Kant', kind: 'primary', stage: 'Clarify moral obligation', whyHere: branchStatement('Kant tests maxims and practical justification before later political questions of right and public law.', 'ethics')},
    ],
    interpretiveLimits: [branchStatement('Political philosophy is not merely applied individual ethics, yet institutional analysis cannot make coercion or distribution morally self-justifying.', 'political-philosophy', 'ethics')],
    followOns: [{kind: 'branch', participantIds: ['political-philosophy', 'feminist-philosophy'], label: 'Political Philosophy and Feminist Philosophy', reason: branchStatement('Test authority and justice against gendered power, dependency, exclusion, and the public-private boundary.', 'political-philosophy', 'feminist-philosophy')}],
  }),

  branchCase(['feminist-philosophy', 'epistemology'], {
    sharedQuestion: branchStatement('How do social position, authority, and practices of inquiry affect who can know and whose claims receive uptake?', 'feminist-philosophy', 'epistemology'),
    historicalRelationship: branchStatement('Feminist epistemology is a substantive intersection: feminist philosophy is wider than epistemology, while epistemology includes many projects not organized by feminist questions.', 'feminist-philosophy', 'epistemology'),
    sharedAssumptions: [branchStatement('Both assess knowledge, justification, testimony, objectivity, and inquiry rather than assuming that belief becomes warranted merely because it is sincerely held.', 'feminist-philosophy', 'epistemology')],
    axes: [
      {label: 'Situated knowers', question: branchStatement('How does a knower’s social position bear on access, salience, and objectivity?', 'feminist-philosophy', 'epistemology'), positions: [
        {entityId: 'feminist-philosophy', claim: branchStatement('Feminist epistemologies study how gender and intersecting power relations shape access to evidence, conceptual resources, authority, and the organization of inquiry.', 'feminist-philosophy')},
        {entityId: 'epistemology', claim: branchStatement('Epistemology asks what makes cognition successful through knowledge, justification, evidence, understanding, testimony, and responsible inquiry.', 'epistemology')},
      ], contrast: branchStatement('Situatedness can reveal epistemic resources and distortions without making social identity an automatic guarantee of truth.', 'feminist-philosophy', 'epistemology')},
      {label: 'Authority and ignorance', question: branchStatement('When do social relations improve or damage epistemic practice?', 'feminist-philosophy', 'epistemology'), positions: [
        {entityId: 'feminist-philosophy', claim: branchStatement('Feminist work examines exclusion from inquiry, denied credibility, structured ignorance, value-laden methods, and reforms of epistemic authority.', 'feminist-philosophy')},
        {entityId: 'epistemology', claim: branchStatement('Social epistemology examines testimony, disagreement, groups, institutions, and norms governing the production and transmission of belief.', 'epistemology')},
      ], contrast: branchStatement('The intersection changes epistemology’s questions and institutions; it does not simply add women as examples to an otherwise untouched theory.', 'feminist-philosophy', 'epistemology')},
    ],
    terminology: [{topic: 'Perspective and warrant', positions: [
      {entityId: 'feminist-philosophy', term: 'standpoint', explanation: branchStatement('A standpoint is an achieved critical perspective whose claimed epistemic advantage must specify its scope, access, and grounds.', 'feminist-philosophy')},
      {entityId: 'epistemology', term: 'justification', explanation: branchStatement('Justification concerns what makes a belief epistemically supported or responsibly held, under theories that disagree about access and reliability.', 'epistemology')},
    ], warning: branchStatement('A standpoint is not an infallible viewpoint, and justification is not automatically neutral about the social conditions under which evidence is produced.', 'feminist-philosophy', 'epistemology')}],
    arguments: [
      {entityId: 'feminist-philosophy', title: 'Power can organize ignorance', summary: branchStatement('Exclusion and unequal credibility can hide questions, experiences, and counterevidence even when an inquiry advertises formally neutral procedures.', 'feminist-philosophy'), pressure: branchStatement('Critique must explain how situated claims are checked, revised, and made answerable beyond one group.', 'feminist-philosophy')},
      {entityId: 'epistemology', title: 'Warrant requires discriminating standards', summary: branchStatement('Epistemology distinguishes knowledge from luck, confidence, or accidental truth by testing sources, reasons, defeaters, and inquiry.', 'epistemology'), pressure: branchStatement('An abstract account must show how its standards operate in real testimonial and institutional environments.', 'epistemology')},
    ],
    readings: [
      {entityId: 'feminist-philosophy', title: 'Feminist Epistemology and Philosophy of Science', author: 'Elizabeth Anderson', kind: 'secondary', stage: 'Map the intersection', whyHere: branchStatement('The specialist survey distinguishes situated knowledge, standpoint, empiricism, objectivity, authority, and epistemologies of ignorance.', 'feminist-philosophy')},
      {entityId: 'epistemology', title: 'Theaetetus, selections', author: 'Plato', kind: 'primary', stage: 'Return to a broad knowledge problem', whyHere: branchStatement('The dialogue tests proposed accounts of knowledge without pretending that its ancient setting supplies a complete social epistemology.', 'epistemology')},
    ],
    interpretiveLimits: [branchStatement('The comparison is asymmetrical and nested: neither feminist philosophy nor epistemology is one doctrine, and feminist epistemology belongs to both.', 'feminist-philosophy', 'epistemology')],
    followOns: [{kind: 'branch', participantIds: ['feminist-philosophy', 'ethics'], label: 'Feminist Philosophy and Ethics', reason: branchStatement('Follow how dependency, care, power, and exclusion reshape ethical subjects and methods.', 'feminist-philosophy', 'ethics')}],
  }),

  branchCase(['philosophy-of-religion', 'metaphysics'], {
    sharedQuestion: branchStatement('What, if anything, is ultimate, necessary, or fundamental, and how could claims about it be justified?', 'philosophy-of-religion', 'metaphysics'),
    historicalRelationship: branchStatement('The fields overlap in arguments about divine reality, causation, modality, persons, and cosmology, but each also contains large territories the other does not.', 'philosophy-of-religion', 'metaphysics'),
    sharedAssumptions: [branchStatement('Both test accounts of reality and dependence rather than treating inherited vocabulary or intuitive possibility as sufficient evidence.', 'philosophy-of-religion', 'metaphysics')],
    axes: [
      {label: 'Scope of ultimacy', question: branchStatement('Does inquiry begin from religious ultimacy or from structures of reality in general?', 'philosophy-of-religion', 'metaphysics'), positions: [
        {entityId: 'philosophy-of-religion', claim: branchStatement('Philosophy of religion studies diverse concepts of ultimacy, divinity, religious practice, experience, language, authority, evil, and secular alternatives.', 'philosophy-of-religion')},
        {entityId: 'metaphysics', claim: branchStatement('Metaphysics studies being, substance, modality, causation, time, identity, grounding, mind, and social reality whether or not a religious claim is involved.', 'metaphysics')},
      ], contrast: branchStatement('A theory of God may carry metaphysical commitments, but metaphysical fundamentality is not automatically divine or religious.', 'philosophy-of-religion', 'metaphysics')},
      {label: 'Forms of inquiry', question: branchStatement('What kinds of practice or argument bear on claims about reality?', 'philosophy-of-religion', 'metaphysics'), positions: [
        {entityId: 'philosophy-of-religion', claim: branchStatement('The field assesses arguments alongside testimony, experience, ritual, tradition, trust, hope, disagreement, and forms of life.', 'philosophy-of-religion')},
        {entityId: 'metaphysics', claim: branchStatement('Metaphysical inquiry uses conceptual analysis, explanatory comparison, science, logic, and cross-traditional argument about what exists and depends on what.', 'metaphysics')},
      ], contrast: branchStatement('Religious participation and metaphysical theorizing can inform one another without making faith a proof or abstract ontology a complete account of religion.', 'philosophy-of-religion', 'metaphysics')},
    ],
    terminology: [{topic: 'What is most basic?', positions: [
      {entityId: 'philosophy-of-religion', term: 'ultimate reality', explanation: branchStatement('The expression can name different divine, non-theistic, personal, impersonal, or tradition-specific accounts and must not be equated with one God-concept.', 'philosophy-of-religion')},
      {entityId: 'metaphysics', term: 'fundamentality and necessity', explanation: branchStatement('These terms distinguish what is basic or could not be otherwise from what is derivative or contingent within a metaphysical theory.', 'metaphysics')},
    ], warning: branchStatement('Ultimate, fundamental, and necessary are not interchangeable until their explanatory roles are stated.', 'philosophy-of-religion', 'metaphysics')}],
    arguments: [
      {entityId: 'philosophy-of-religion', title: 'Ultimacy changes a life as well as a theory', summary: branchStatement('Religious claims often organize practice, trust, value, community, and response to suffering, so their philosophical assessment exceeds an inventory of entities.', 'philosophy-of-religion'), pressure: branchStatement('The field must compare traditions without treating theism as the universal template or insulating commitment from criticism.', 'philosophy-of-religion')},
      {entityId: 'metaphysics', title: 'A complete inventory still needs structure', summary: branchStatement('Metaphysics asks not only what exists but which relations of dependence, modality, identity, or causation make the inventory intelligible.', 'metaphysics'), pressure: branchStatement('The inquiry must show when its distinctions explain reality rather than merely redescribing a preferred vocabulary.', 'metaphysics')},
    ],
    readings: [
      {entityId: 'philosophy-of-religion', title: 'Dialogues Concerning Natural Religion', author: 'David Hume', kind: 'primary', stage: 'Test natural theology', whyHere: branchStatement('The dialogue form makes competing inferences about order, cause, analogy, and divine attributes answer objections from within the debate.', 'philosophy-of-religion')},
      {entityId: 'metaphysics', title: 'Metaphysics, Books I and IV with a guide', author: 'Aristotle', kind: 'primary', stage: 'Ask what first philosophy studies', whyHere: branchStatement('The selections introduce being, causes, and first principles without making the later field identical with Aristotle’s project.', 'metaphysics')},
    ],
    interpretiveLimits: [branchStatement('Philosophy of religion is not exhausted by theism, and metaphysics is neither inherently religious nor automatically hostile to religion.', 'philosophy-of-religion', 'metaphysics')],
    followOns: [{kind: 'branch', participantIds: ['philosophy-of-religion', 'epistemology'], label: 'Philosophy of Religion and Epistemology', reason: branchStatement('Shift from what is ultimate to evidence, testimony, experience, disagreement, and the ethics of belief.', 'philosophy-of-religion', 'epistemology')}],
  }),

  branchCase(['philosophy-of-religion', 'epistemology'], {
    sharedQuestion: branchStatement('When is commitment intellectually responsible amid evidence, experience, testimony, trust, and disagreement?', 'philosophy-of-religion', 'epistemology'),
    historicalRelationship: branchStatement('Religious epistemology is an intersection, while philosophy of religion also studies reality, value, language, and practice and epistemology studies cognition far beyond religion.', 'philosophy-of-religion', 'epistemology'),
    sharedAssumptions: [branchStatement('Both ask how belief and inquiry should respond to reasons, counterevidence, other knowers, and the possibility of error.', 'philosophy-of-religion', 'epistemology')],
    axes: [
      {label: 'Evidence and testimony', question: branchStatement('How should experience and testimony contribute to responsible belief?', 'philosophy-of-religion', 'epistemology'), positions: [
        {entityId: 'philosophy-of-religion', claim: branchStatement('Religious epistemology examines revelation, testimony, experience, disagreement, evidentialism, and the ethics of belief within diverse traditions.', 'philosophy-of-religion')},
        {entityId: 'epistemology', claim: branchStatement('Epistemology assesses perception, memory, inference, testimony, evidence, defeaters, and social practices across domains.', 'epistemology')},
      ], contrast: branchStatement('Religious testimony is neither exempt from general epistemic questions nor simply interchangeable with every ordinary report.', 'philosophy-of-religion', 'epistemology')},
      {label: 'Belief and faith', question: branchStatement('Is faith only a belief held with a distinctive quantity of evidence?', 'philosophy-of-religion', 'epistemology'), positions: [
        {entityId: 'philosophy-of-religion', claim: branchStatement('Philosophers of religion analyze faith as belief, trust, hope, allegiance, action, or combinations whose relations to evidence remain contested.', 'philosophy-of-religion')},
        {entityId: 'epistemology', claim: branchStatement('Epistemology distinguishes knowledge, justified belief, understanding, rational confidence, and responsible inquiry without treating them as one success state.', 'epistemology')},
      ], contrast: branchStatement('Practical reasons can explain commitment without automatically proving its object true, while propositional analysis may omit trust and practice.', 'philosophy-of-religion', 'epistemology')},
    ],
    terminology: [{topic: 'Responsible commitment', positions: [
      {entityId: 'philosophy-of-religion', term: 'faith', explanation: branchStatement('Faith can include cognitive, affective, practical, and relational elements, so its epistemic appraisal depends on the account under discussion.', 'philosophy-of-religion')},
      {entityId: 'epistemology', term: 'epistemic justification', explanation: branchStatement('Justification concerns the support or responsibility that makes belief epistemically better than guessing, under several rival theories.', 'epistemology')},
    ], warning: branchStatement('Faith should not be reduced to belief without evidence, and justification should not be assumed to require one universal evidential formula.', 'philosophy-of-religion', 'epistemology')}],
    arguments: [
      {entityId: 'philosophy-of-religion', title: 'Commitment has more than one dimension', summary: branchStatement('Trust, practice, hope, and allegiance can make religious commitment intelligible even while its truth claims remain open to evidential criticism.', 'philosophy-of-religion'), pressure: branchStatement('A multidimensional account must not use practical importance to evade disagreement, harm, or counterevidence.', 'philosophy-of-religion')},
      {entityId: 'epistemology', title: 'Belief must answer to its source', summary: branchStatement('Epistemic evaluation asks whether perception, testimony, inference, or memory is reliable and whether available defeaters have been addressed.', 'epistemology'), pressure: branchStatement('General standards must remain sensitive to communal practices, unequal authority, and the interpretation of experience.', 'epistemology')},
    ],
    readings: [
      {entityId: 'philosophy-of-religion', title: 'Dialogues Concerning Natural Religion', author: 'David Hume', kind: 'primary', stage: 'Examine inference and disagreement', whyHere: branchStatement('The speakers test what observed order can warrant and how analogy, skepticism, and religious commitment interact.', 'philosophy-of-religion')},
      {entityId: 'epistemology', title: 'Theaetetus, selections', author: 'Plato', kind: 'primary', stage: 'Broaden the knowledge question', whyHere: branchStatement('The dialogue separates knowledge from several tempting substitutes without turning religious belief into the field’s default case.', 'epistemology')},
    ],
    interpretiveLimits: [branchStatement('Neither field is one position, and neither religious life nor epistemic success is exhausted by assent to isolated propositions.', 'philosophy-of-religion', 'epistemology')],
    followOns: [{kind: 'branch', participantIds: ['philosophy-of-religion', 'metaphysics'], label: 'Philosophy of Religion and Metaphysics', reason: branchStatement('Return from responsible commitment to claims about ultimacy, necessity, causation, and fundamentality.', 'philosophy-of-religion', 'metaphysics')}],
  }),

  branchCase(['buddhist-epistemology', 'epistemology'], {
    sharedQuestion: branchStatement('Which cognitive episodes count as reliable or knowledge-producing, and how should perception and inference be distinguished?', 'buddhist-epistemology', 'epistemology'),
    historicalRelationship: branchStatement('Buddhist epistemology names historically situated pramāṇa traditions within the wider comparative field of epistemology, not an equal-sized rival doctrine.', 'buddhist-epistemology', 'epistemology'),
    sharedAssumptions: [branchStatement('Both distinguish successful cognition from error and examine the sources, structure, and assessment of belief or awareness.', 'buddhist-epistemology', 'epistemology')],
    axes: [
      {label: 'Epistemic success', question: branchStatement('Should inquiry begin from pramāṇa, knowledge, justification, understanding, or another success concept?', 'buddhist-epistemology', 'epistemology'), positions: [
        {entityId: 'buddhist-epistemology', claim: branchStatement('Dignāga and Dharmakīrti systematize accounts of reliable cognition around perception and inference within Buddhist debates about language, mind, and liberation.', 'buddhist-epistemology')},
        {entityId: 'epistemology', claim: branchStatement('Epistemology compares knowledge, justification, understanding, evidence, rationality, testimony, and other cognitive successes across many traditions.', 'epistemology')},
      ], contrast: branchStatement('Pramāṇa should not be treated as a Sanskrit label for justified true belief; the terms organize different problem histories.', 'buddhist-epistemology', 'epistemology')},
      {label: 'Perception and concepts', question: branchStatement('How are nonconceptual awareness, conceptual construction, and inference related?', 'buddhist-epistemology', 'epistemology'), positions: [
        {entityId: 'buddhist-epistemology', claim: branchStatement('Influential Buddhist pramāṇa theories distinguish nonconceptual perception of particulars from conceptual inference and analyze exclusion in linguistic thought.', 'buddhist-epistemology')},
        {entityId: 'epistemology', claim: branchStatement('Broader epistemology disputes whether perception is concept-laden, how inference transmits warrant, and how testimony and memory extend cognition.', 'epistemology')},
      ], contrast: branchStatement('A shared word such as perception does not erase disputes over objects, conceptuality, reflexive awareness, language, and epistemic aims.', 'buddhist-epistemology', 'epistemology')},
    ],
    terminology: [{topic: 'A cognition that succeeds', positions: [
      {entityId: 'buddhist-epistemology', term: 'pramāṇa', explanation: branchStatement('Pramāṇa can name a reliable cognition or its knowledge-producing source within Indian debates whose translations and criteria are contested.', 'buddhist-epistemology')},
      {entityId: 'epistemology', term: 'epistemic justification', explanation: branchStatement('Justification identifies support or responsibility for belief, while internalist, externalist, virtue, and social accounts disagree about its basis.', 'epistemology')},
    ], warning: branchStatement('Translation is part of the philosophy: mapping pramāṇa directly onto justification can hide differences in subject, object, and success.', 'buddhist-epistemology', 'epistemology')}],
    arguments: [
      {entityId: 'buddhist-epistemology', title: 'Separate direct awareness from construction', summary: branchStatement('The perception-inference distinction explains how cognition can contact particulars while concepts and language organize repeatable judgment.', 'buddhist-epistemology'), pressure: branchStatement('The account must explain error, reflexive awareness, universals, and the practical role of conceptual thought.', 'buddhist-epistemology')},
      {entityId: 'epistemology', title: 'Do not let one analysis define every success', summary: branchStatement('The broader field distinguishes knowledge from understanding, rationality, or justified belief and compares several sources of cognition.', 'epistemology'), pressure: branchStatement('A general framework must avoid treating its modern European vocabulary as culturally neutral.', 'epistemology')},
    ],
    readings: [
      {entityId: 'buddhist-epistemology', title: 'Pramāṇasamuccaya, Chapter 1', author: 'Dignāga', kind: 'primary', stage: 'Enter the pramāṇa framework', whyHere: branchStatement('The chapter introduces perception and the architecture of a tradition that requires specialist textual and historical guidance.', 'buddhist-epistemology')},
      {entityId: 'epistemology', title: 'Is Justified True Belief Knowledge?', author: 'Edmund Gettier', kind: 'primary', stage: 'Test a modern analysis', whyHere: branchStatement('The brief cases expose luck in one influential analysis without turning that analysis into epistemology’s universal starting point.', 'epistemology')},
    ],
    interpretiveLimits: [branchStatement('Dignāga, Dharmakīrti, their Buddhist critics, and later Tibetan interpreters disagree; Buddhist epistemology does not speak for all Buddhism or Indian philosophy.', 'buddhist-epistemology', 'epistemology')],
    followOns: [{kind: 'branch', participantIds: ['buddhist-epistemology', 'logic'], label: 'Buddhist Epistemology and Logic', reason: branchStatement('Focus next on inference-for-oneself, argument for others, and the risks of translating Indian debate into modern formal categories.', 'buddhist-epistemology', 'logic')}],
  }),

  philosopherCase(['peirce', 'william-james'], {
    sharedQuestion: philosopherStatement('How should consequences, experience, and inquiry clarify meaning and constrain responsible belief?', 'peirce', 'william-james'),
    historicalRelationship: philosopherStatement('Peirce and James were friends and Metaphysical Club colleagues, not teacher and student; Peirce later used “pragmaticism” to distinguish his project from other pragmatisms.', 'peirce', 'william-james'),
    sharedAssumptions: [philosopherStatement('Both reject inert abstractions and ask what difference a claim makes in possible experience, inquiry, judgment, and action.', 'peirce', 'william-james')],
    axes: [
      {label: 'The pragmatic method', question: philosopherStatement('Which consequences clarify a concept or resolve a dispute?', 'peirce', 'william-james'), positions: [
        {entityId: 'peirce', claim: philosopherStatement('Peirce’s maxim clarifies concepts through their conceivable practical bearings within logic, signs, experiment, and fallible scientific inquiry.', 'peirce')},
        {entityId: 'william-james', claim: philosopherStatement('James asks what concrete experiential difference rival claims make for a person navigating a plural and unfinished world.', 'william-james')},
      ], contrast: philosopherStatement('Peirce emphasizes a rule of clarification and long-run correction; James broadens the method toward lived options, pluralism, and individual experience.', 'peirce', 'william-james')},
      {label: 'Truth and constraint', question: philosopherStatement('How do beliefs become dependable without making truth immediate usefulness?', 'peirce', 'william-james'), positions: [
        {entityId: 'peirce', claim: philosopherStatement('Peirce connects truth to inquiry that can correct present investigators through public testing, abduction, deduction, and induction.', 'peirce')},
        {entityId: 'william-james', claim: philosopherStatement('James describes truth through verification and guidance while retaining constraints from experience, prior truths, coherence, and resistant reality.', 'william-james')},
      ], contrast: philosopherStatement('Neither view licenses believing whatever pays today, but they differ over how individual validation and an indefinitely extended community bear on truth.', 'peirce', 'william-james')},
    ],
    terminology: [{topic: 'Practical bearing', positions: [
      {entityId: 'peirce', term: 'pragmatic maxim', explanation: philosopherStatement('The maxim asks for the conceivable experiential and practical effects by which a concept could be clarified.', 'peirce')},
      {entityId: 'william-james', term: 'cash value', explanation: philosopherStatement('James uses the metaphor for concrete experiential difference and guidance, not for monetary profit or whatever is convenient now.', 'william-james')},
    ], warning: philosopherStatement('The shared language of consequences hides real disagreements about method, truth, reality, religion, and the scale of inquiry.', 'peirce', 'william-james')}],
    arguments: [
      {entityId: 'peirce', title: 'Inquiry must remain corrigible', summary: philosopherStatement('Belief should emerge from methods that expose hypotheses to shared observation and continuing correction rather than tenacity or authority.', 'peirce'), pressure: philosopherStatement('The regulative ideal of an inquiry community must address actual exclusion and the possibility of enduring error.', 'peirce')},
      {entityId: 'william-james', title: 'Truth must matter in experience', summary: philosopherStatement('A purported distinction with no possible experiential difference cannot guide inquiry, while verified beliefs must fit a world not invented at will.', 'william-james'), pressure: philosopherStatement('James’s language of making truth must resist subjectivist and short-term instrumental readings.', 'william-james')},
    ],
    readings: [
      {entityId: 'peirce', title: 'The Fixation of Belief and How to Make Our Ideas Clear', author: 'Charles Sanders Peirce', kind: 'primary', stage: 'Begin with inquiry and clarification', whyHere: philosopherStatement('The paired essays connect methods of settling belief to the maxim’s test of meaningful consequences.', 'peirce')},
      {entityId: 'william-james', title: 'Pragmatism, Lectures II and VI', author: 'William James', kind: 'primary', stage: 'Read the wider pragmatism', whyHere: philosopherStatement('The lectures introduce the method and truth while making their controversial differences from Peirce visible.', 'william-james')},
    ],
    interpretiveLimits: [philosopherStatement('Both projects changed over time; Peirce is not only an austere methodologist, and James is not a defender of wishful thinking.', 'peirce', 'william-james')],
    followOns: [{kind: 'philosopher', participantIds: ['william-james', 'dewey'], label: 'William James and John Dewey', reason: philosopherStatement('Follow how experience and inquiry are reconstructed through habit, environment, education, and democratic publics.', 'william-james', 'dewey')}],
  }),

  philosopherCase(['william-james', 'dewey'], {
    sharedQuestion: philosopherStatement('How can experience become intelligent inquiry rather than a stream of impressions or a fixed method?', 'william-james', 'dewey'),
    historicalRelationship: philosopherStatement('Dewey drew on James’s psychology, then revised questions of habit, emotion, experience, and inquiry within his own naturalism and democratic philosophy.', 'william-james', 'dewey'),
    sharedAssumptions: [philosopherStatement('Both oppose spectator models of mind and treat cognition as active, selective, embodied, temporal, and answerable to consequences.', 'william-james', 'dewey')],
    axes: [
      {label: 'Shape of experience', question: philosopherStatement('How should continuity, relation, habit, and environment be described?', 'william-james', 'dewey'), positions: [
        {entityId: 'william-james', claim: philosopherStatement('James describes a stream of consciousness with relations and fringes, then develops radical empiricism and pluralism around experienced connections.', 'william-james')},
        {entityId: 'dewey', claim: philosopherStatement('Dewey analyzes organism-environment transactions, habits, situations, and inquiry without dividing experience into an isolated subject and external object.', 'dewey')},
      ], contrast: philosopherStatement('Dewey inherits an anti-dualist impulse while giving problematic situations, habit, and reconstruction a more institutional and experimental role.', 'william-james', 'dewey')},
      {label: 'Individual and public', question: philosopherStatement('At what scale are beliefs and problems tested?', 'william-james', 'dewey'), positions: [
        {entityId: 'william-james', claim: philosopherStatement('James attends to lived options, religious experience, temperament, plural goods, and the ways truth guides an individual through experience.', 'william-james')},
        {entityId: 'dewey', claim: philosopherStatement('Dewey connects inquiry to education, communication, institutions, and publics formed around indirect consequences that require collective response.', 'dewey')},
      ], contrast: philosopherStatement('Dewey does not merely add society to a finished Jamesian theory; he reconstructs the unit and setting of inquiry.', 'william-james', 'dewey')},
    ],
    terminology: [{topic: 'Experience in motion', positions: [
      {entityId: 'william-james', term: 'stream and pure experience', explanation: philosopherStatement('James emphasizes continuity, transition, and experienced relations before a rigid division between subject and object.', 'william-james')},
      {entityId: 'dewey', term: 'inquiry into a problematic situation', explanation: philosopherStatement('Dewey begins inquiry when a situation becomes indeterminate and is transformed through observation, hypotheses, reasoning, and tests.', 'dewey')},
    ], warning: philosopherStatement('Both reject atomized experience, but Jamesian radical empiricism and Deweyan transactional naturalism are not interchangeable.', 'william-james', 'dewey')}],
    arguments: [
      {entityId: 'william-james', title: 'Relations belong to experience', summary: philosopherStatement('Continuity and transition need not be supplied by a separate intellect if relations can themselves be experienced.', 'william-james'), pressure: philosopherStatement('The account must distinguish a plural world from a sequence governed only by personal temperament.', 'william-james')},
      {entityId: 'dewey', title: 'Inquiry transforms its situation', summary: philosopherStatement('Thinking formulates a problem, develops possible solutions, and tests consequences within the environment that made the problem real.', 'dewey'), pressure: philosopherStatement('Resolution must remain answerable to evidence, exclusion, power, and consequences displaced onto others.', 'dewey')},
    ],
    readings: [
      {entityId: 'william-james', title: 'Pragmatism', author: 'William James', kind: 'primary', stage: 'Meet plural experiential difference', whyHere: philosopherStatement('The lectures connect method and truth to experience while preserving the tensions Dewey later reworks.', 'william-james')},
      {entityId: 'dewey', title: 'Reconstruction in Philosophy', author: 'John Dewey', kind: 'primary', stage: 'Move to experimental reconstruction', whyHere: philosopherStatement('Dewey recasts philosophy around changing problems, sciences, practices, and institutions rather than fixed spectator knowledge.', 'dewey')},
    ],
    interpretiveLimits: [philosopherStatement('James and Dewey each changed across psychology, metaphysics, ethics, religion, politics, and education; influence does not imply one school doctrine.', 'william-james', 'dewey')],
    followOns: [{kind: 'philosopher', participantIds: ['peirce', 'william-james'], label: 'Charles Sanders Peirce and William James', reason: philosopherStatement('Return to the earlier divergence over clarification, truth, and the community of inquiry.', 'peirce', 'william-james')}],
  }),

  philosopherCase(['kant', 'hegel'], {
    sharedQuestion: philosopherStatement('How can reason justify knowledge and freedom without appealing to a structure it has failed to examine?', 'kant', 'hegel'),
    historicalRelationship: philosopherStatement('Hegel develops a post-Kantian project through sustained criticism and appropriation; he is neither simply anti-Kant nor an uncontested completion of Kant.', 'kant', 'hegel'),
    sharedAssumptions: [philosopherStatement('Both reject pre-critical dogmatism and make the activity of reason central to objectivity, normativity, freedom, and philosophical system.', 'kant', 'hegel')],
    axes: [
      {label: 'Categories and limits', question: philosopherStatement('Are the conditions of experience fixed by critique or transformed through dialectical development?', 'kant', 'hegel'), positions: [
        {entityId: 'kant', claim: philosopherStatement('Kant argues that forms of intuition and categories supplied by cognition structure possible experience while knowledge remains limited to appearances.', 'kant')},
        {entityId: 'hegel', claim: philosopherStatement('Hegel’s logic examines categories through tensions and transitions that challenge a fixed separation between thought and being.', 'hegel')},
      ], contrast: philosopherStatement('Kant secures objectivity by articulating conditions and boundaries; Hegel asks whether those boundaries and categories can justify themselves without further development.', 'kant', 'hegel')},
      {label: 'Freedom', question: philosopherStatement('Is freedom primarily rational self-legislation or an achievement within social institutions and recognition?', 'kant', 'hegel'), positions: [
        {entityId: 'kant', claim: philosopherStatement('Kant grounds moral freedom in autonomy, where rational agents give themselves a universally valid moral law.', 'kant')},
        {entityId: 'hegel', claim: philosopherStatement('Hegel develops freedom through recognition, ethical life, law, family, civil society, and the state, not isolated choice alone.', 'hegel')},
      ], contrast: philosopherStatement('Hegel socializes and historicizes freedom, but he does not simply discard Kantian autonomy or reduce right to existing institutions.', 'kant', 'hegel')},
    ],
    terminology: [{topic: 'Reason examining itself', positions: [
      {entityId: 'kant', term: 'transcendental critique', explanation: philosopherStatement('Critique investigates the a priori conditions, scope, and limits that make experience, knowledge, and autonomy possible.', 'kant')},
      {entityId: 'hegel', term: 'dialectic', explanation: philosopherStatement('Dialectic follows tensions and determinate transitions within concepts or forms of consciousness rather than applying a three-step recipe.', 'hegel')},
    ], warning: philosopherStatement('Hegelian dialectic should not be reduced to “thesis–antithesis–synthesis,” and Kantian critique is not merely cautious skepticism.', 'kant', 'hegel')}],
    arguments: [
      {entityId: 'kant', title: 'Conditions make objectivity possible', summary: philosopherStatement('Experience can be objectively ordered because sensibility and understanding contribute forms and concepts to which objects of experience conform.', 'kant'), pressure: philosopherStatement('The account must explain things in themselves, affection, freedom, and the unity of theoretical and practical reason.', 'kant')},
      {entityId: 'hegel', title: 'A limit must justify its own standpoint', summary: philosopherStatement('Hegel presses whether critique can mark a boundary between thought and reality without already claiming knowledge of both sides.', 'hegel'), pressure: philosopherStatement('Dialectical system must preserve difference, contingency, and criticism without treating history as automatic progress.', 'hegel')},
    ],
    readings: [
      {entityId: 'kant', title: 'Critique of Pure Reason, Prefaces and selected Analytic', author: 'Immanuel Kant', kind: 'primary', stage: 'Establish the critical turn', whyHere: philosopherStatement('The selections frame a priori conditions, objectivity, and limits before Hegel’s post-Kantian challenge.', 'kant')},
      {entityId: 'hegel', title: 'Phenomenology of Spirit, Introduction and selected Consciousness chapters', author: 'G. W. F. Hegel', kind: 'primary', stage: 'Follow immanent testing', whyHere: philosopherStatement('The text lets forms of consciousness test their own claims instead of applying an external triadic formula.', 'hegel')},
    ],
    interpretiveLimits: [philosopherStatement('Kant and Hegel have rival metaphysical and non-metaphysical readings, and “completion of Kant” is an interpretation rather than a neutral historical fact.', 'kant', 'hegel')],
    followOns: [{kind: 'branch', participantIds: ['kantianism', 'german-idealism'], label: 'Kantianism and German Idealism', reason: branchStatement('Widen the comparison to Reinhold, Fichte, Schelling, and the disputed formation of a post-Kantian movement.', 'kantianism', 'german-idealism')}],
  }),

  philosopherCase(['husserl', 'heidegger'], {
    sharedQuestion: philosopherStatement('How should phenomenology disclose the structures through which beings appear as meaningful?', 'husserl', 'heidegger'),
    historicalRelationship: philosopherStatement('Heidegger served as Husserl’s assistant and successor and dedicated Being and Time to him, but their philosophical and personal relationship later became deeply strained.', 'husserl', 'heidegger'),
    sharedAssumptions: [philosopherStatement('Both reject a purely external inventory of mental events and investigate intentionality, world, time, embodiment, and meaning as structures of experience.', 'husserl', 'heidegger')],
    axes: [
      {label: 'Phenomenological access', question: philosopherStatement('Should inquiry begin by bracketing naïve validity or by interpreting being-in-the-world?', 'husserl', 'heidegger'), positions: [
        {entityId: 'husserl', claim: philosopherStatement('Husserl’s epoché suspends naïve commitments so intentional acts, meanings, objects, and their modes of givenness can be examined.', 'husserl')},
        {entityId: 'heidegger', claim: philosopherStatement('Heidegger begins from Dasein’s practical being-in-the-world, where understanding and interpretation precede a detached subject confronting objects.', 'heidegger')},
      ], contrast: philosopherStatement('The reduction reorganizes how validity is investigated; fundamental ontology interprets the being of the inquirer already involved in a world.', 'husserl', 'heidegger')},
      {label: 'Objectivity and world', question: philosopherStatement('How do shared objects and meanings arise without isolating a private consciousness?', 'husserl', 'heidegger'), positions: [
        {entityId: 'husserl', claim: philosopherStatement('Husserl analyzes constitution through embodiment, temporality, intersubjectivity, horizon, and lifeworld rather than private introspection alone.', 'husserl')},
        {entityId: 'heidegger', claim: philosopherStatement('Heidegger describes equipment, concern, mood, discourse, shared norms, and temporality as structures of meaningful worldly involvement.', 'heidegger')},
      ], contrast: philosopherStatement('Both reject a sealed inner subject, but they assign different roles to transcendental subjectivity and the question of being.', 'husserl', 'heidegger')},
    ],
    terminology: [{topic: 'Reorienting inquiry', positions: [
      {entityId: 'husserl', term: 'epoché and reduction', explanation: philosopherStatement('Epoché brackets the naïve validity of the natural attitude so phenomenological analysis can study intentional correlation and constitution.', 'husserl')},
      {entityId: 'heidegger', term: 'fundamental ontology', explanation: philosopherStatement('Fundamental ontology analyzes Dasein because an understanding of being already operates in its practical and temporal existence.', 'heidegger')},
    ], warning: philosopherStatement('Epoché does not deny reality, and fundamental ontology is not merely a psychology of human attitudes.', 'husserl', 'heidegger')}],
    arguments: [
      {entityId: 'husserl', title: 'Describe modes of givenness', summary: philosopherStatement('Objects can be the same while appearing through changing profiles, horizons, memories, anticipations, and intersubjective confirmations.', 'husserl'), pressure: philosopherStatement('Transcendental analysis must explain embodiment, history, and other subjects without returning to a solitary Cartesian ego.', 'husserl')},
      {entityId: 'heidegger', title: 'Practical involvement is more basic than detached inspection', summary: philosopherStatement('Things first show up within projects, skills, equipment, concern, and a shared world before they become neutral objects of theory.', 'heidegger'), pressure: philosopherStatement('The ontological analysis must address ethics, politics, and Heidegger’s own historical commitments rather than treating them as external biography.', 'heidegger')},
    ],
    readings: [
      {entityId: 'husserl', title: 'Ideas I', author: 'Edmund Husserl', kind: 'primary', stage: 'Learn the reduction carefully', whyHere: philosopherStatement('The text distinguishes the natural attitude, epoché, intentionality, and transcendental analysis before later lifeworld developments.', 'husserl')},
      {entityId: 'heidegger', title: 'Being and Time, Introduction and §§12–18', author: 'Martin Heidegger', kind: 'primary', stage: 'Move to being-in-the-world', whyHere: philosopherStatement('The selections develop worldhood and practical involvement while making the transformation of phenomenology visible.', 'heidegger')},
    ],
    interpretiveLimits: [philosopherStatement('Husserl is not reducible to Cartesian introspection, and Heidegger is not simply Husserl plus existential themes; each project changes over time.', 'husserl', 'heidegger')],
    followOns: [{kind: 'branch', participantIds: ['phenomenology', 'existentialism'], label: 'Phenomenology and Existentialism', reason: branchStatement('Broaden the historical transformation through embodiment, freedom, situation, and later existential appropriations.', 'phenomenology', 'existentialism')}],
  }),
];
