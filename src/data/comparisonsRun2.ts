import type {
  ComparisonCasefile,
  ComparisonStatement,
} from '../types/philosophy';

/**
 * Content-expansion run 2 casefiles use the reviewed source registers on the
 * canonical branch articles. They remain a non-canonical teaching surface.
 */
const sourceIds: Record<string, string> = {
  platonism: 'pla-middle-sep',
  neoplatonism: 'neo-sep',
  aristotelianism: 'ari-metaphysics-sep',
  stoicism: 'sto-sep',
  cynicism: 'cyn-iep',
  epicureanism: 'epi-sep',
  skepticism: 'ske-ancient-sep',
  kantianism: 'kantianism-kant',
  'german-idealism': 'ide-german-iep',
  marxism: 'mxm-marx-sep',
  epistemology: 'epi-sep',
  'philosophy-of-science': 'sci-method-sep',
  'philosophy-of-mind': 'mind-consciousness-sep',
  phenomenology: 'phe-sep',
  'feminist-philosophy': 'fem-overview-sep',
  existentialism: 'exi-sep',
  pragmatism: 'pra-sep',
};

const statement = (text: string, ...entityIds: string[]): ComparisonStatement => ({
  text,
  evidence: entityIds.map((entityId) => ({entityKind: 'branch', entityId, sourceId: sourceIds[entityId]})),
});

const branchCase = (
  participantIds: readonly [string, string],
  content: Omit<ComparisonCasefile, 'kind' | 'participantIds'>,
): ComparisonCasefile => ({kind: 'branch', participantIds, ...content});

export const expansionRun2ComparisonCasefiles: readonly ComparisonCasefile[] = [
  branchCase(['platonism', 'neoplatonism'], {
    sharedQuestion: statement('How can changing and multiple things depend on intelligible realities, and how should a philosophical life return toward what is most fundamental?', 'platonism', 'neoplatonism'),
    historicalRelationship: statement('Neoplatonism is a modern label for late-antique Platonist traditions that reread Plato through centuries of commentary, debate, and new systematic problems; it is neither Plato’s unchanged doctrine nor a clean break from Platonism.', 'platonism', 'neoplatonism'),
    sharedAssumptions: [statement('Both connect metaphysics, knowledge, ethics, and formation, treating intelligibility and the good as practical concerns rather than as an isolated inventory of entities.', 'platonism', 'neoplatonism')],
    axes: [
      {label: 'First principle', question: statement('What kind of source makes an intelligible order possible?', 'platonism', 'neoplatonism'), positions: [
        {entityId: 'platonism', claim: statement('Platonist traditions reconstruct different dialogues around Forms, soul, dialectic, and the Good without yielding one uncontested hierarchy of all reality.', 'platonism')},
        {entityId: 'neoplatonism', claim: statement('Plotinian and later systems articulate ordered dependence through the One, Intellect, Soul, and further levels, while disagreeing about how that order and its first principle should be understood.', 'neoplatonism')},
      ], contrast: statement('Neoplatonic hierarchy systematizes problems inherited from Plato, but the dialogue corpus does not simply contain the later architecture in finished form.', 'platonism', 'neoplatonism')},
      {label: 'Return and practice', question: statement('How does a soul become capable of truth and likeness to the good?', 'platonism', 'neoplatonism'), positions: [
        {entityId: 'platonism', claim: statement('Platonic formation proceeds through dialogue, recollection, dialectic, mathematical and ethical education, and contested political or communal practices.', 'platonism')},
        {entityId: 'neoplatonism', claim: statement('Late Platonists connect purification and contemplation to more explicit accounts of procession and return; Iamblichus and successors also give ritual and theurgy roles Plotinus does not formulate in the same way.', 'neoplatonism')},
      ], contrast: statement('Both make philosophy transformative, but late-antique schools multiply the metaphysical, pedagogical, and sometimes ritual means by which return is pursued.', 'platonism', 'neoplatonism')},
    ],
    terminology: [{topic: 'Dependence on intelligible reality', positions: [
      {entityId: 'platonism', term: 'participation', explanation: statement('Participation names a family of difficult relations by which particulars are what they are through Forms; the dialogues leave major questions and criticisms open.', 'platonism')},
      {entityId: 'neoplatonism', term: 'procession and return', explanation: statement('Procession and return organize how plurality depends on higher principles without describing a temporal event in which the first principle loses parts of itself.', 'neoplatonism')},
    ], warning: statement('Participation, emanation, and procession are not interchangeable metaphors, and none should be read as a simple physical flow from a spatial source.', 'platonism', 'neoplatonism')}],
    arguments: [
      {entityId: 'platonism', title: 'Make stable knowledge answer to stable objects', summary: statement('Platonic arguments press the thought that definition, explanation, and evaluative judgment require intelligible standards not exhausted by changing instances.', 'platonism'), pressure: statement('The tradition must explain participation and difference without multiplying Forms mechanically or severing intelligibility from the sensible world.', 'platonism')},
      {entityId: 'neoplatonism', title: 'Explain plurality without abandoning unity', summary: statement('Neoplatonic systems ask how derivative levels can remain genuinely many while depending on sources whose power is not diminished by what proceeds from them.', 'neoplatonism'), pressure: statement('The ordered hierarchy must explain embodiment, evil, and difference without making finite life a mere error or rendering the first principle explanatorily empty.', 'neoplatonism')},
    ],
    readings: [
      {entityId: 'platonism', title: 'Republic, Books VI–VII', author: 'Plato', kind: 'primary', stage: 'Begin with education and the Good', whyHere: statement('The divided line, cave, and Good connect knowledge, formation, and political responsibility without supplying a later Neoplatonic system.', 'platonism')},
      {entityId: 'neoplatonism', title: 'Ennead V.1, On the Three Primary Hypostases', author: 'Plotinus', kind: 'primary', stage: 'Read a late-antique reconstruction', whyHere: statement('The treatise offers a compact route into One, Intellect, and Soul while inviting comparison with the Platonic texts it interprets.', 'neoplatonism')},
    ],
    interpretiveLimits: [statement('“Platonism” spans ancient, medieval, religious, Renaissance, and contemporary uses, while “Neoplatonism” groups disagreeing late-antique projects under a modern name; neither participant is one doctrine.', 'platonism', 'neoplatonism')],
    followOns: [{kind: 'branch', participantIds: ['neoplatonism', 'aristotelianism'], label: 'Neoplatonism and Aristotelianism', reason: statement('Follow how late Platonists appropriated Aristotle while disputing substance, causation, intellect, and the architecture of first principles.', 'neoplatonism', 'aristotelianism')}],
  }),
  branchCase(['neoplatonism', 'aristotelianism'], {
    sharedQuestion: statement('How should form, causation, intellect, and the highest principle explain an ordered world of changing substances?', 'neoplatonism', 'aristotelianism'),
    historicalRelationship: statement('Late Platonists studied and commented on Aristotle as part of philosophical education, often seeking concord while also subordinating, revising, or contesting Aristotelian claims; later Aristotelian traditions in turn absorbed Neoplatonic materials.', 'neoplatonism', 'aristotelianism'),
    sharedAssumptions: [statement('Both traditions treat logic, natural philosophy, psychology, ethics, and first philosophy as connected inquiries and develop through commentary in Greek, Arabic, Jewish, Christian, and later settings.', 'neoplatonism', 'aristotelianism')],
    axes: [
      {label: 'Primary being and dependence', question: statement('Does explanation begin from substance or from ordered dependence on principles beyond ordinary being?', 'neoplatonism', 'aristotelianism'), positions: [
        {entityId: 'neoplatonism', claim: statement('Neoplatonic systems describe reality through hierarchical dependence culminating in a first principle beyond the differentiated being found in Intellect.', 'neoplatonism')},
        {entityId: 'aristotelianism', claim: statement('Aristotelian inquiry gives primary explanatory weight to substance, form, actuality, and causes, while later interpreters disagree about the status of the unmoved mover and separate substances.', 'aristotelianism')},
      ], contrast: statement('The traditions share causal and formal vocabulary but order it differently: hierarchy and participation do not reduce to a substance-first analysis.', 'neoplatonism', 'aristotelianism')},
      {label: 'Soul and intellect', question: statement('How is embodied cognition related to intellect that grasps universals?', 'neoplatonism', 'aristotelianism'), positions: [
        {entityId: 'neoplatonism', claim: statement('Plotinus and later Platonists distinguish levels of soul and intellect, then debate how far the soul descends and what practices restore intellectual orientation.', 'neoplatonism')},
        {entityId: 'aristotelianism', claim: statement('Aristotelian psychology begins from the soul as the form of a living body, while the brief account of active intellect generates sharply different later interpretations.', 'aristotelianism')},
      ], contrast: statement('Both refuse a simple mind-as-object picture, but they distribute embodiment, individual soul, and separate intellect through different explanatory structures.', 'neoplatonism', 'aristotelianism')},
    ],
    terminology: [{topic: 'Explanatory priority', positions: [
      {entityId: 'neoplatonism', term: 'hypostasis', explanation: statement('A hypostasis is a fundamental level or reality in an ordered metaphysical structure, not merely a mental abstraction or a separate object in space.', 'neoplatonism')},
      {entityId: 'aristotelianism', term: 'substance', explanation: statement('Substance names a contested primary mode of being and subject of predication, developed through form, matter, actuality, potentiality, and essence.', 'aristotelianism')},
    ], warning: statement('Hypostasis and substance can overlap in later commentary, but treating them as direct equivalents erases how each system organizes priority and causation.', 'neoplatonism', 'aristotelianism')}],
    arguments: [
      {entityId: 'neoplatonism', title: 'Order many causes through higher unity', summary: statement('A hierarchy of principles aims to explain why intelligible order, life, and multiplicity remain connected without making the first source one item among others.', 'neoplatonism'), pressure: statement('The view must show how lower realities possess genuine agency and difference rather than functioning as faded copies of higher levels.', 'neoplatonism')},
      {entityId: 'aristotelianism', title: 'Explain beings through their own forms and causes', summary: statement('Aristotelian analysis asks what a changing thing is, what it is made from, what brings change, and what completion organizes its capacities.', 'aristotelianism'), pressure: statement('The framework must address disputed separate intellects and first causes without letting teleology become an unsupported purpose imposed on nature.', 'aristotelianism')},
    ],
    readings: [
      {entityId: 'neoplatonism', title: 'Elements of Theology, propositions 1–39', author: 'Proclus', kind: 'primary', stage: 'Trace systematic dependence', whyHere: statement('The propositions make unity, causation, participation, and return unusually explicit for comparison with Aristotelian explanation.', 'neoplatonism')},
      {entityId: 'aristotelianism', title: 'Metaphysics, Books Ζ–Θ', author: 'Aristotle', kind: 'primary', stage: 'Work through substance and actuality', whyHere: statement('These books expose why form, matter, essence, potentiality, and actuality cannot be reduced to a list of four causes.', 'aristotelianism')},
    ],
    interpretiveLimits: [statement('Late-antique harmonizing projects, Arabic adaptations, Latin scholastic syntheses, and Renaissance disputes use both traditions differently; no single “Plato versus Aristotle” verdict governs their reception.', 'neoplatonism', 'aristotelianism')],
    followOns: [{kind: 'branch', participantIds: ['platonism', 'aristotelianism'], label: 'Platonism and Aristotelianism', reason: statement('Return to the wider reception traditions and compare form, substance, causation, and education without assuming that late-antique synthesis settled their differences.', 'platonism', 'aristotelianism')}],
  }),
  branchCase(['stoicism', 'cynicism'], {
    sharedQuestion: statement('What must a person train, refuse, or reinterpret in order to live freely and virtuously amid corrupt conventions and unstable fortune?', 'stoicism', 'cynicism'),
    historicalRelationship: statement('Cynic practice formed part of Stoicism’s Socratic inheritance, and ancient sources connect Zeno with Crates, but the evidence is late and literary; Stoicism develops a systematic logic and physics that Cynic life does not require.', 'stoicism', 'cynicism'),
    sharedAssumptions: [statement('Both associate virtue with living according to nature, criticize dependence on wealth and reputation, value training, and connect freedom to judgment rather than political status alone.', 'stoicism', 'cynicism')],
    axes: [
      {label: 'Convention and social role', question: statement('Should inherited roles be reformed from within or exposed through radical refusal?', 'stoicism', 'cynicism'), positions: [
        {entityId: 'stoicism', claim: statement('Stoics distinguish moral value from externals while assigning duties to relationships and civic roles within a cosmopolitan account of rational beings.', 'stoicism')},
        {entityId: 'cynicism', claim: statement('Cynic performance tests convention through poverty, shamelessness, self-sufficiency, and risky frank speech that refuses ordinary status and decorum.', 'cynicism')},
      ], contrast: statement('Stoic role ethics can inhabit institutions critically; Cynic provocation makes visible the compromises and artificial needs that institutional participation may conceal.', 'stoicism', 'cynicism')},
      {label: 'Theory and practice', question: statement('How much philosophical system is needed for a transformed life?', 'stoicism', 'cynicism'), positions: [
        {entityId: 'stoicism', claim: statement('Stoicism links ethical training to accounts of impressions, assent, logic, causation, fate, and an ordered corporeal cosmos.', 'stoicism')},
        {entityId: 'cynicism', claim: statement('Cynicism communicates largely through enacted example, anecdote, askēsis, and critique of theory judged useless for freedom.', 'cynicism')},
      ], contrast: statement('Both make philosophy a way of life, but Stoicism argues that practice belongs inside a system while Cynicism tests whether system-building itself becomes another dependency.', 'stoicism', 'cynicism')},
    ],
    terminology: [{topic: 'Freedom through training', positions: [
      {entityId: 'stoicism', term: 'assent', explanation: statement('Assent is the rational uptake or refusal of an impression, locating responsibility in judgment without promising control over external results.', 'stoicism')},
      {entityId: 'cynicism', term: 'askēsis and parrhēsia', explanation: statement('Askēsis trains independence from artificial needs, while parrhēsia is frank truth-telling whose freedom is inseparable from social risk.', 'cynicism')},
    ], warning: statement('Neither Stoic discipline nor Cynic toughness should be romanticized as immunity to material vulnerability, coercion, disability, or unequal exposure to punishment.', 'stoicism', 'cynicism')}],
    arguments: [
      {entityId: 'stoicism', title: 'Place freedom in rational agency', summary: statement('If fortune can remove possessions, office, health, and reputation, stable moral worth must depend on how impressions are judged and duties pursued.', 'stoicism'), pressure: statement('The view must preserve grief, care, and reasons to change unjust conditions while maintaining that externals are not goods in the strict sense.', 'stoicism')},
      {entityId: 'cynicism', title: 'Expose false needs by living otherwise', summary: statement('Public refusal shows that customs treated as necessary often serve status, fear, and domination rather than nature or virtue.', 'cynicism'), pressure: statement('A life staged through hardship and shock must explain who can safely perform it, what constructive relations it sustains, and when provocation merely wounds.', 'cynicism')},
    ],
    readings: [
      {entityId: 'stoicism', title: 'Discourses III.22', author: 'Epictetus', kind: 'primary', stage: 'Read a Stoic portrait of the Cynic vocation', whyHere: statement('The chapter shows both the Stoic admiration for Cynic freedom and the demanding role-based framework through which Epictetus reinterprets it.', 'stoicism')},
      {entityId: 'cynicism', title: 'Lives of Eminent Philosophers, Book VI', author: 'Diogenes Laertius', kind: 'primary', stage: 'Read testimony critically', whyHere: statement('The anecdotes preserve Cynic performance while requiring caution about literary shaping, lineage, and historical attribution.', 'cynicism')},
    ],
    interpretiveLimits: [statement('The historical Cynics are known through fragmentary and stylized reports, while Roman Stoic praise of Cynicism is already reception; neither source gives transparent access to one original doctrine.', 'stoicism', 'cynicism')],
    followOns: [{kind: 'branch', participantIds: ['stoicism', 'epicureanism'], label: 'Stoicism and Epicureanism', reason: statement('Compare two more systematic Hellenistic therapies after seeing how Cynic practice pressures the Stoic relation between virtue, nature, and externals.', 'stoicism', 'epicureanism')}],
  }),
  branchCase(['epicureanism', 'skepticism'], {
    sharedQuestion: statement('How should inquiry respond when fear and disturbance are intensified by claims that outrun what experience and argument can establish?', 'epicureanism', 'skepticism'),
    historicalRelationship: statement('Epicurean and skeptical traditions developed in the Hellenistic and Roman worlds as rival ways of reasoning and living, but Academic and Pyrrhonian skepticism differ, and polemical sources do not record one continuous two-school debate.', 'epicureanism', 'skepticism'),
    sharedAssumptions: [statement('Both connect epistemic discipline with freedom from disturbance, criticize empty dogmatism, and ask how ordinary action can continue without guarantees unavailable to human inquirers.', 'epicureanism', 'skepticism')],
    axes: [
      {label: 'Criteria and commitment', question: statement('Does responsible inquiry require positive criteria or suspension between opposed claims?', 'epicureanism', 'skepticism'), positions: [
        {entityId: 'epicureanism', claim: statement('Epicureans defend sensations, preconceptions, and feelings as criteria while locating error in added judgments and using natural explanations to remove fear.', 'epicureanism')},
        {entityId: 'skepticism', claim: statement('Pyrrhonian practice sets opposed appearances and arguments against one another and suspends judgment when they remain equipollent; Academic approaches develop distinct skeptical strategies.', 'skepticism')},
      ], contrast: statement('Epicurean inquiry needs warranted positive commitments for its physics and therapy, whereas Pyrrhonian inquiry treats suspension as the fitting response where reasons remain balanced.', 'epicureanism', 'skepticism')},
      {label: 'Tranquility', question: statement('Is tranquility achieved through correct explanation or through releasing the demand to settle disputed questions?', 'epicureanism', 'skepticism'), positions: [
        {entityId: 'epicureanism', claim: statement('Epicurean tranquility depends on removing fears of divine intervention and death through atomist explanation, limited desire, friendship, and prudent choice.', 'epicureanism')},
        {entityId: 'skepticism', claim: statement('Sextus reports tranquility as following suspension unexpectedly, while skeptical life continues through appearances, customs, skills, and ordinary needs without dogmatic endorsement.', 'skepticism')},
      ], contrast: statement('Both resist anxiety-producing belief, but Epicurean therapy secures a substantive worldview while Pyrrhonian therapy questions the compulsion to secure one.', 'epicureanism', 'skepticism')},
    ],
    terminology: [{topic: 'Freedom from disturbance', positions: [
      {entityId: 'epicureanism', term: 'ataraxia', explanation: statement('Ataraxia is mental freedom from disturbance within an ethical program of pleasure, natural explanation, friendship, and measured desire.', 'epicureanism')},
      {entityId: 'skepticism', term: 'epochē', explanation: statement('Epochē is suspension of judgment when opposed considerations cannot be responsibly resolved, not a declaration that nothing can ever be known.', 'skepticism')},
    ], warning: statement('A shared concern with tranquility does not make the traditions anti-intellectual: each prescribes demanding practices of argument, attention, and correction.', 'epicureanism', 'skepticism')}],
    arguments: [
      {entityId: 'epicureanism', title: 'Replace supernatural fear with natural causes', summary: statement('If death ends sensation and natural processes do not answer to punitive providence, central sources of unnecessary anxiety can be dismantled.', 'epicureanism'), pressure: statement('The school must justify its confidence in criteria and atomist explanations while allowing multiple hypotheses where evidence underdetermines distant phenomena.', 'epicureanism')},
      {entityId: 'skepticism', title: 'Do not outrun balanced reasons', summary: statement('When dogmatic arguments meet comparably forceful counterarguments, suspension avoids pretending that inquiry has achieved what it has not.', 'skepticism'), pressure: statement('Skeptics must explain how inquiry, teaching, and deliberate action remain possible without covertly converting appearances or practical standards into beliefs.', 'skepticism')},
    ],
    readings: [
      {entityId: 'epicureanism', title: 'Letter to Herodotus and Letter to Menoeceus', author: 'Epicurus', kind: 'primary', stage: 'Join physics to therapy', whyHere: statement('The letters show why Epicurean confidence about nature and measured desire belongs to one practical system.', 'epicureanism')},
      {entityId: 'skepticism', title: 'Outlines of Pyrrhonism, Book I', author: 'Sextus Empiricus', kind: 'primary', stage: 'Learn suspension in practice', whyHere: statement('Book I distinguishes skeptical inquiry, equipollence, suspension, tranquility, and the nondogmatic conduct of ordinary life.', 'skepticism')},
    ],
    interpretiveLimits: [statement('Academic skepticism, Pyrrhonism, Epicurus’s own writings, and later Epicurean or skeptical receptions cannot be collapsed into two synchronized doctrines with identical therapeutic aims.', 'epicureanism', 'skepticism')],
    followOns: [{kind: 'branch', participantIds: ['epistemology', 'skepticism'], label: 'Epistemology and Skepticism', reason: statement('Move from ancient therapies to the broader dispute over knowledge, justification, fallibility, and the proper role of skeptical pressure.', 'epistemology', 'skepticism')}],
  }),
  branchCase(['kantianism', 'german-idealism'], {
    sharedQuestion: statement('Can the conditions and limits of finite cognition be stated without leaving reason, freedom, nature, and systematic unity divided from one another?', 'kantianism', 'german-idealism'),
    historicalRelationship: statement('German Idealism grows from contested receptions of Kant involving Reinhold, Jacobi, Schulze, Maimon, Fichte, Schelling, Hegel, and others, while Kantianism also includes Neo-Kantian, analytic, phenomenological, political, and critical inheritances not reducible to that movement.', 'kantianism', 'german-idealism'),
    sharedAssumptions: [statement('Both make a priori conditions, self-consciousness, freedom, and the authority of reason central while rejecting the claim that knowledge is a passive copy of independently structured objects.', 'kantianism', 'german-idealism')],
    axes: [
      {label: 'Critical limit or systematic completion', question: statement('Should philosophy preserve a boundary around things in themselves or derive a more unified account of subject and object?', 'kantianism', 'german-idealism'), positions: [
        {entityId: 'kantianism', claim: statement('Kantian projects distinguish appearances from things as they are independently of our cognition in order to defend objective experience while limiting speculative knowledge.', 'kantianism')},
        {entityId: 'german-idealism', claim: statement('Post-Kantian idealists differently challenge residual dualisms and seek systematic accounts of self-activity, nature, reason, and spirit without treating the thing in itself as an unexplained remainder.', 'german-idealism')},
      ], contrast: statement('The disagreement concerns whether critique succeeds through a durable limit or whether that limit generates contradictions philosophy must overcome.', 'kantianism', 'german-idealism')},
      {label: 'Freedom and social actuality', question: statement('How does rational freedom become effective in a natural and social world?', 'kantianism', 'german-idealism'), positions: [
        {entityId: 'kantianism', claim: statement('Kantian traditions develop autonomy, moral law, right, judgment, and constructivist or critical successors while disputing formalism and historical exclusion.', 'kantianism')},
        {entityId: 'german-idealism', claim: statement('Fichte, Schelling, and Hegel connect freedom to striving, recognition, nature, institutions, and historical development in sharply different systems.', 'german-idealism')},
      ], contrast: statement('Both resist reducing freedom to preference, but German Idealist accounts more explicitly make social and institutional mediation part of freedom’s realization.', 'kantianism', 'german-idealism')},
    ],
    terminology: [{topic: 'Idealism', positions: [
      {entityId: 'kantianism', term: 'transcendental idealism', explanation: statement('Transcendental idealism concerns the conditions under which objects can be experienced by finite knowers while retaining their empirical reality.', 'kantianism')},
      {entityId: 'german-idealism', term: 'absolute or post-Kantian idealism', explanation: statement('Post-Kantian idealisms seek different unities of being and thinking and should not be reduced to the claim that an individual mind invents the world.', 'german-idealism')},
    ], warning: statement('Kant’s position, Fichte’s successive Wissenschaftslehren, Schelling’s changing projects, and Hegel’s system are not stages of one inevitable doctrine.', 'kantianism', 'german-idealism')}],
    arguments: [
      {entityId: 'kantianism', title: 'Secure objectivity by limiting claims', summary: statement('By identifying forms and concepts that make experience possible, critique aims to explain objective cognition without pretending to know things beyond those conditions.', 'kantianism'), pressure: statement('The boundary must explain affection, things in themselves, freedom, and systematic unity without reintroducing the very dogmatism or skepticism it was meant to avoid.', 'kantianism')},
      {entityId: 'german-idealism', title: 'Do not leave the source of unity outside the system', summary: statement('Post-Kantian systems argue that an unexplained divide between subject and object prevents reason from accounting for its own conditions and freedom.', 'german-idealism'), pressure: statement('Systematic ambition must preserve finitude, natural difference, plurality, and political criticism rather than declaring every conflict already reconciled.', 'german-idealism')},
    ],
    readings: [
      {entityId: 'kantianism', title: 'Critique of Pure Reason, Prefaces and Introduction', author: 'Immanuel Kant', kind: 'primary', stage: 'State the critical project', whyHere: statement('The framing of synthetic a priori cognition and metaphysical limits establishes the problem later Kantians and idealists inherit.', 'kantianism')},
      {entityId: 'german-idealism', title: 'First and Second Introductions to the Wissenschaftslehre', author: 'Johann Gottlieb Fichte', kind: 'primary', stage: 'Watch critique become system', whyHere: statement('The introductions present self-activity and the philosophical standpoint without making one early formula stand for all German Idealism.', 'german-idealism')},
    ],
    interpretiveLimits: [statement('Kantianism extends before, alongside, and after German Idealism, and the post-Kantian movement contains direct disagreements; a teacher-to-successor ladder cannot represent those plural receptions.', 'kantianism', 'german-idealism')],
    followOns: [{kind: 'branch', participantIds: ['german-idealism', 'marxism'], label: 'German Idealism and Marxism', reason: statement('Follow the transformation of dialectic, alienation, history, labor, and social freedom into a material critique of capitalist relations.', 'german-idealism', 'marxism')}],
  }),
  branchCase(['german-idealism', 'marxism'], {
    sharedQuestion: statement('How do human powers become objective social forms, and under what conditions can historical agents transform institutions that constrain their freedom?', 'german-idealism', 'marxism'),
    historicalRelationship: statement('Marx formed his work through critical engagement with Hegel and the Young Hegelians, political economy, socialism, and revolutionary politics; later Marxisms variously retain, reject, or reconstruct German Idealist concepts rather than merely turning Hegel “upside down.”', 'german-idealism', 'marxism'),
    sharedAssumptions: [statement('Major German Idealist and Marxist projects treat agency, reason, and freedom as historically or socially mediated, while disagreeing sharply about nature, subjectivity, institutions, and the material organization of life.', 'german-idealism', 'marxism')],
    axes: [
      {label: 'Motor of development', question: statement('What makes historical forms unstable and capable of transformation?', 'german-idealism', 'marxism'), positions: [
        {entityId: 'german-idealism', claim: statement('Fichte, Schelling, and Hegel develop different accounts of self-activity, nature, recognition, institutions, and historical development; “German Idealism” does not identify one motor of change.', 'german-idealism')},
        {entityId: 'marxism', claim: statement('Marxist traditions analyze changing modes of production, class relations, labor, political organization, crisis, and struggle while disputing determinism, agency, and the reach of class explanation.', 'marxism')},
      ], contrast: statement('Marxist critique relocates dialectical pressure within material production and social power, but it does not simply replace ideas with inert economic causes.', 'german-idealism', 'marxism')},
      {label: 'Alienation and freedom', question: statement('Is freedom achieved through rational reconciliation or transformation of material social relations?', 'german-idealism', 'marxism'), positions: [
        {entityId: 'german-idealism', claim: statement('Hegelian freedom is socially actual through recognition, right, civil society, and ethical institutions rather than an inward absence of constraint.', 'german-idealism')},
        {entityId: 'marxism', claim: statement('Marxist critique asks how wage labor, property, commodity exchange, exploitation, and state power estrange social capacities and how collective action could reorganize them.', 'marxism')},
      ], contrast: statement('Both make institutions constitutive of freedom, but Marxism tests whether formally rational institutions reproduce domination through their material relations.', 'german-idealism', 'marxism')},
    ],
    terminology: [{topic: 'Dialectical development', positions: [
      {entityId: 'german-idealism', term: 'dialectic', explanation: statement('Dialectic names determinate development through tensions within forms of thought and life, not a universal three-word sequence mechanically applied from outside.', 'german-idealism')},
      {entityId: 'marxism', term: 'historical materialism', explanation: statement('Historical materialism is a contested family of explanations linking production, social relations, institutions, struggle, and change, not a prediction that technology automatically determines history.', 'marxism')},
    ], warning: statement('“Idealism versus materialism” is useful only if it does not turn complex systems into ideas floating above history and matter operating without interpretation or agency.', 'german-idealism', 'marxism')}],
    arguments: [
      {entityId: 'german-idealism', title: 'Freedom needs intelligible social institutions', summary: statement('An agent becomes free through forms of recognition and shared practice that make reasons, rights, and responsibilities actual rather than merely private.', 'german-idealism'), pressure: statement('The account must show how institutions remain open to criticism from those they exclude, exploit, racialize, colonize, or misrecognize.', 'german-idealism')},
      {entityId: 'marxism', title: 'Critique the social relations behind appearances', summary: statement('Commodity and wage relations can present historically specific powers as natural necessities, so critique reconstructs the labor, law, and domination that sustain them.', 'marxism'), pressure: statement('Material critique must avoid economism and explain race, gender, empire, ecology, culture, political organization, and normative judgment without treating them as secondary decorations.', 'marxism')},
    ],
    readings: [
      {entityId: 'german-idealism', title: 'Elements of the Philosophy of Right, civil society selections', author: 'G. W. F. Hegel', kind: 'primary', stage: 'Study social freedom before the critique', whyHere: statement('The text makes property, labor, need, corporations, poverty, and institutions part of freedom’s social conditions.', 'german-idealism')},
      {entityId: 'marxism', title: 'Capital, Volume I, chapters 1 and 6–10', author: 'Karl Marx', kind: 'primary', stage: 'Reconstruct the capitalist relation', whyHere: statement('Commodity form, labor power, the working day, and exploitation display how Marx transforms inherited dialectical questions through political economy.', 'marxism')},
    ],
    interpretiveLimits: [statement('Marx’s changing corpus, Engels’s interventions, social democracy, communisms, Western Marxisms, anticolonial Marxisms, feminist Marxisms, and later critical theory do not form one settled materialist system.', 'german-idealism', 'marxism')],
    followOns: [{kind: 'branch', participantIds: ['feminist-philosophy', 'marxism'], label: 'Feminist Philosophy and Marxism', reason: statement('Test how gender, social reproduction, race, sexuality, household labor, and standpoint transform structural accounts of class and production.', 'feminist-philosophy', 'marxism')}],
  }),
  branchCase(['epistemology', 'philosophy-of-science'], {
    sharedQuestion: statement('What makes inquiry reliable when evidence, concepts, methods, testimony, and institutional practices all shape what can responsibly be claimed?', 'epistemology', 'philosophy-of-science'),
    historicalRelationship: statement('Philosophy of science develops within and alongside epistemology, logic, metaphysics, history, and the sciences, but it studies domain-specific practices that cannot be settled by importing a general theory of knowledge unchanged.', 'epistemology', 'philosophy-of-science'),
    sharedAssumptions: [statement('Both distinguish belief from warrant, treat error and correction as central, and analyze how evidence supports claims without assuming that observation is theory-free or that social dependence destroys objectivity.', 'epistemology', 'philosophy-of-science')],
    axes: [
      {label: 'Unit of evaluation', question: statement('Should inquiry begin from a knower’s belief or from scientific practices, models, experiments, and communities?', 'epistemology', 'philosophy-of-science'), positions: [
        {entityId: 'epistemology', claim: statement('Epistemology evaluates knowledge, justification, evidence, testimony, understanding, and cognitive success at individual and social levels across many domains.', 'epistemology')},
        {entityId: 'philosophy-of-science', claim: statement('Philosophy of science studies observation, experiment, measurement, modeling, explanation, confirmation, change, values, and institutions as they operate in varied sciences.', 'philosophy-of-science')},
      ], contrast: statement('General epistemic concepts remain useful, but scientific reliability often belongs to distributed procedures and instruments no single believer can reproduce.', 'epistemology', 'philosophy-of-science')},
      {label: 'Success and reality', question: statement('Does successful inquiry require truth about unobservable reality or only empirically adequate, reliable practice?', 'epistemology', 'philosophy-of-science'), positions: [
        {entityId: 'epistemology', claim: statement('Epistemological theories dispute whether knowledge depends on reasons, reliability, abilities, safety, social position, or knowledge-first relations to truth.', 'epistemology')},
        {entityId: 'philosophy-of-science', claim: statement('Scientific realism and antirealism dispute what successful theories license about unobservables, while models and idealizations can work without literally mirroring every feature of a target.', 'philosophy-of-science')},
      ], contrast: statement('The philosophy-of-science dispute ties epistemic success to historically changing theories, instruments, and representations whose usefulness can exceed literal description.', 'epistemology', 'philosophy-of-science')},
    ],
    terminology: [{topic: 'Evidence', positions: [
      {entityId: 'epistemology', term: 'justification or warrant', explanation: statement('Justification and warrant name families of conditions under which belief is epistemically responsible or knowledge-producing, with internalist, externalist, virtue, and social alternatives.', 'epistemology')},
      {entityId: 'philosophy-of-science', term: 'confirmation', explanation: statement('Confirmation studies how data support hypotheses through qualitative, probabilistic, comparative, and model-dependent relations rather than one universal inductive rule.', 'philosophy-of-science')},
    ], warning: statement('Evidence is neither a private feeling of confidence nor uninterpreted data; its force depends on questions, alternatives, methods, and the reliability of collection and transmission.', 'epistemology', 'philosophy-of-science')}],
    arguments: [
      {entityId: 'epistemology', title: 'Ask what turns cognition into knowledge', summary: statement('A true belief can still be lucky, irresponsibly formed, or dependent on defective testimony, so inquiry needs an account of epistemic success and failure.', 'epistemology'), pressure: statement('A general account must accommodate embodied skills, collective knowledge, marginalized knowers, disagreement, and domain-specific standards without becoming empty.', 'epistemology')},
      {entityId: 'philosophy-of-science', title: 'Evaluate inquiry where it is practiced', summary: statement('Scientific claims gain credibility through interacting experiments, instruments, models, criticism, replication or triangulation, and organized divisions of labor.', 'philosophy-of-science'), pressure: statement('Practice-sensitive accounts must still distinguish robust inquiry from consensus manufactured by prestige, funding, exclusion, secrecy, or politically desired outcomes.', 'philosophy-of-science')},
    ],
    readings: [
      {entityId: 'epistemology', title: 'Is Justified True Belief Knowledge?', author: 'Edmund Gettier', kind: 'primary', stage: 'See why a general analysis is difficult', whyHere: statement('The short cases expose epistemic luck without defining every later epistemological project.', 'epistemology')},
      {entityId: 'philosophy-of-science', title: 'The Structure of Scientific Revolutions', author: 'Thomas S. Kuhn', kind: 'primary', stage: 'Add history and communities', whyHere: statement('Kuhn makes exemplars, normal science, crisis, and change central while leaving disputes about progress, rationality, and realism open.', 'philosophy-of-science')},
    ],
    interpretiveLimits: [statement('Neither field has a single method or border: formal epistemology, social epistemology, history of science, philosophy of particular sciences, and scientific practice overlap without becoming interchangeable.', 'epistemology', 'philosophy-of-science')],
    followOns: [{kind: 'branch', participantIds: ['pragmatism', 'philosophy-of-science'], label: 'Pragmatism and Philosophy of Science', reason: statement('Continue from warranted belief to inquiry as experimental, fallible, communal action embedded in changing problems and consequences.', 'pragmatism', 'philosophy-of-science')}],
  }),
  branchCase(['philosophy-of-mind', 'phenomenology'], {
    sharedQuestion: statement('How should philosophy describe and explain consciousness, intentionality, embodiment, selfhood, and a subject’s meaningful openness to a world?', 'philosophy-of-mind', 'phenomenology'),
    historicalRelationship: statement('Phenomenology and philosophy of mind share problems and have repeatedly exchanged concepts, but their institutional histories and methods only partly overlap; neither is a synonym for first-person study or cognitive science.', 'philosophy-of-mind', 'phenomenology'),
    sharedAssumptions: [statement('Both reject the idea that consciousness is adequately captured by a featureless inner object and distinguish among experience, content, subjectivity, bodily capacities, and relations to an environment.', 'philosophy-of-mind', 'phenomenology')],
    axes: [
      {label: 'Description and explanation', question: statement('Should inquiry first clarify structures of appearing or explain mental capacities through functional, physical, representational, and causal theories?', 'philosophy-of-mind', 'phenomenology'), positions: [
        {entityId: 'philosophy-of-mind', claim: statement('Philosophy of mind compares theories of consciousness, content, cognition, mental causation, self, and embodiment while engaging psychology, neuroscience, linguistics, and artificial intelligence.', 'philosophy-of-mind')},
        {entityId: 'phenomenology', claim: statement('Phenomenology studies intentional experience through descriptive, transcendental, hermeneutic, genetic, and embodied methods before reducing its structures to a preferred causal theory.', 'phenomenology')},
      ], contrast: statement('Phenomenology guards the explanandum against premature reduction, while philosophy of mind asks which metaphysical and scientific explanations can account for the clarified phenomena.', 'philosophy-of-mind', 'phenomenology')},
      {label: 'Point of view', question: statement('How should first-person evidence relate to third-person observation and theory?', 'philosophy-of-mind', 'phenomenology'), positions: [
        {entityId: 'philosophy-of-mind', claim: statement('Contemporary work combines first-person reports, behavioral and neural evidence, conceptual analysis, and models while disputing what each source can establish.', 'philosophy-of-mind')},
        {entityId: 'phenomenology', claim: statement('Phenomenological reflection treats first-person givenness as disciplined evidence while emphasizing embodiment, temporality, intersubjectivity, and a shared world rather than private introspection.', 'phenomenology')},
      ], contrast: statement('The difference concerns evidential organization rather than a choice between subjective anecdotes and objective facts; both sides can require multiple perspectives.', 'philosophy-of-mind', 'phenomenology')},
    ],
    terminology: [{topic: 'Aboutness and world-relation', positions: [
      {entityId: 'philosophy-of-mind', term: 'mental content', explanation: statement('Mental content concerns what thoughts and perceptions represent and the conditions under which those representations are correct or mistaken.', 'philosophy-of-mind')},
      {entityId: 'phenomenology', term: 'intentionality', explanation: statement('Intentionality names the directedness through which experience is of or about something within horizons of meaning, not a plan to act.', 'phenomenology')},
    ], warning: statement('Content and intentionality overlap, but neither term by itself decides whether meaning is internal, environmental, embodied, social, or transcendental.', 'philosophy-of-mind', 'phenomenology')}],
    arguments: [
      {entityId: 'philosophy-of-mind', title: 'Connect mental life to explanatory theory', summary: statement('Accounts of function, representation, realization, causation, embodiment, and neural organization test how mental capacities fit within nature and support action.', 'philosophy-of-mind'), pressure: statement('Third-person success must not erase subjective character, lived meaning, normativity, or the conceptual assumptions built into experiments and models.', 'philosophy-of-mind')},
      {entityId: 'phenomenology', title: 'Describe what a theory must explain', summary: statement('Attending to lived body, temporal flow, perspective, horizon, and intersubjectivity reveals organization hidden by a picture of isolated inner states.', 'phenomenology'), pressure: statement('First-person description must handle disagreement, unconscious and social formation, empirical correction, and the risk that a trained vocabulary directs what it claims merely to find.', 'phenomenology')},
    ],
    readings: [
      {entityId: 'philosophy-of-mind', title: 'What Is It Like to Be a Bat?', author: 'Thomas Nagel', kind: 'primary', stage: 'Fix the problem of subjective character', whyHere: statement('The essay asks what objective explanation may leave out without proving that consciousness is nonphysical.', 'philosophy-of-mind')},
      {entityId: 'phenomenology', title: 'Phenomenology of Perception, Preface', author: 'Maurice Merleau-Ponty', kind: 'primary', stage: 'Begin from embodied perception', whyHere: statement('The preface connects phenomenological method to bodily orientation and a world already meaningful before reflective theory.', 'phenomenology')},
    ],
    interpretiveLimits: [statement('Analytic phenomenology, cognitive phenomenology, neurophenomenology, enactivism, and historical phenomenological schools cross the boundary differently; the comparison is not a geographic or stylistic divide.', 'philosophy-of-mind', 'phenomenology')],
    followOns: [{kind: 'branch', participantIds: ['phenomenology', 'existentialism'], label: 'Phenomenology and Existentialism', reason: statement('Follow one historical transformation of phenomenological method into questions of freedom, finitude, oppression, and situated projects.', 'phenomenology', 'existentialism')}],
  }),
  branchCase(['feminist-philosophy', 'existentialism'], {
    sharedQuestion: statement('How do embodied and socially situated persons become responsible agents when inherited meanings, institutions, and power shape the projects undertaken within conditions they did not choose?', 'feminist-philosophy', 'existentialism'),
    historicalRelationship: statement('Beauvoir and later feminist thinkers transform existential and phenomenological concepts, while other feminisms draw on analytic, Marxist, pragmatist, Black, decolonial, Indigenous, trans, and additional traditions; existentialism is one interlocutor, not feminism’s origin.', 'feminist-philosophy', 'existentialism'),
    sharedAssumptions: [statement('Both challenge fixed essences that dictate a person’s destiny and analyze agency as embodied, temporal, relational, and answerable within a world already shaped by others.', 'feminist-philosophy', 'existentialism')],
    axes: [
      {label: 'Freedom and power', question: statement('How far can situated agency transform conditions that constrain available projects?', 'feminist-philosophy', 'existentialism'), positions: [
        {entityId: 'feminist-philosophy', claim: statement('Feminist approaches analyze how gender intersects with race, class, sexuality, disability, coloniality, nationality, and institutions that distribute dependency, credibility, violence, and opportunity.', 'feminist-philosophy')},
        {entityId: 'existentialism', claim: statement('Existential traditions stress that finite agents interpret facticity through choices and projects, while Beauvoir and other situated accounts make oppression and reciprocity central.', 'existentialism')},
      ], contrast: statement('Existential freedom names unavoidable agency within limits; feminist critique asks how power structures those limits and why liberation must be collective and material as well as personal.', 'feminist-philosophy', 'existentialism')},
      {label: 'Self and social category', question: statement('How should a person resist objectification without erasing shared identities needed for political action?', 'feminist-philosophy', 'existentialism'), positions: [
        {entityId: 'feminist-philosophy', claim: statement('Feminist debates examine social construction, intersectional group formation, standpoint, coalition, and first-person authority without treating any category as internally uniform.', 'feminist-philosophy')},
        {entityId: 'existentialism', claim: statement('Existential analysis exposes bad faith and objectifying relations while asking how selfhood emerges through embodied action, recognition, conflict, and responsibility.', 'existentialism')},
      ], contrast: statement('Anti-essentialism can expose imposed identities, but feminist politics also needs accounts of patterned group harms that cannot be dissolved into individual self-definition.', 'feminist-philosophy', 'existentialism')},
    ],
    terminology: [{topic: 'Given conditions and agency', positions: [
      {entityId: 'feminist-philosophy', term: 'social construction', explanation: statement('Social construction analyzes how categories and possibilities are made through practices, institutions, norms, and material relations; it does not imply that bodies or harms are imaginary.', 'feminist-philosophy')},
      {entityId: 'existentialism', term: 'facticity and transcendence', explanation: statement('Facticity names given conditions and histories, while transcendence names the projective activity through which agents take them up without becoming unconditioned creators.', 'existentialism')},
    ], warning: statement('Neither social construction nor existential freedom means that a person voluntarily chooses oppression, embodiment, identity, or every meaning imposed on a life.', 'feminist-philosophy', 'existentialism')}],
    arguments: [
      {entityId: 'feminist-philosophy', title: 'Make the conditions of agency politically visible', summary: statement('A theory of freedom is incomplete if it ignores care, dependency, violence, labor, credibility, law, and institutions that enable some projects while blocking others.', 'feminist-philosophy'), pressure: statement('Structural analysis must preserve disagreement, individual variation, trans and nonbinary lives, cultural specificity, and agency without appointing one standpoint infallible.', 'feminist-philosophy')},
      {entityId: 'existentialism', title: 'Responsibility persists without pure beginnings', summary: statement('Because no rule or inherited identity can live a life in one’s place, situated persons remain answerable for how they take up ambiguous conditions and relations with others.', 'existentialism'), pressure: statement('Universal language about choice and authenticity can conceal unequal risks and turn a historically specific ideal of self-making into a demand imposed on oppressed people.', 'existentialism')},
    ],
    readings: [
      {entityId: 'feminist-philosophy', title: 'Ain’t I a Woman: Black Women and Feminism', author: 'bell hooks', kind: 'primary', stage: 'Center intersecting structures and movement critique', whyHere: statement('The work challenges histories of racism and sexism that make either gender or race a complete explanatory axis.', 'feminist-philosophy')},
      {entityId: 'existentialism', title: 'The Ethics of Ambiguity', author: 'Simone de Beauvoir', kind: 'primary', stage: 'Read situated freedom relationally', whyHere: statement('Beauvoir connects freedom, oppression, reciprocity, and collective conditions without reducing ethics to arbitrary choice.', 'existentialism')},
    ],
    interpretiveLimits: [statement('Feminist philosophy is not a feminist correction appended to a male existential canon, and existentialism includes religious, phenomenological, literary, anticolonial, and other projects that do not share one account of freedom.', 'feminist-philosophy', 'existentialism')],
    followOns: [{kind: 'branch', participantIds: ['feminist-philosophy', 'marxism'], label: 'Feminist Philosophy and Marxism', reason: statement('Extend situated freedom into disputes over class, labor, social reproduction, ideology, collective organization, race, and gender.', 'feminist-philosophy', 'marxism')}],
  }),
  branchCase(['epistemology', 'skepticism'], {
    sharedQuestion: statement('How much confidence can inquiry responsibly claim when error, disagreement, luck, and undefeated alternatives remain possible?', 'epistemology', 'skepticism'),
    historicalRelationship: statement('Skeptical arguments repeatedly shape epistemology, but ancient Academic and Pyrrhonian practices do not map directly onto modern skeptical scenarios, and epistemology is not only an attempt to defeat skepticism.', 'epistemology', 'skepticism'),
    sharedAssumptions: [statement('Both examine standards for assent, the force of reasons, sources of error, and the difference between responsible inquiry and merely feeling certain.', 'epistemology', 'skepticism')],
    axes: [
      {label: 'Aim of inquiry', question: statement('Should inquiry seek knowledge conditions or remain open through suspension?', 'epistemology', 'skepticism'), positions: [
        {entityId: 'epistemology', claim: statement('Epistemology develops competing accounts of knowledge, justification, evidence, understanding, testimony, ability, and reliable cognitive success.', 'epistemology')},
        {entityId: 'skepticism', claim: statement('Ancient skeptical practices test claims by opposing arguments and, in Pyrrhonian forms, suspend judgment where considerations remain balanced.', 'skepticism')},
      ], contrast: statement('Epistemological theories typically seek positive conditions for success, while skeptical practice can treat the refusal of premature settlement as inquiry’s achievement.', 'epistemology', 'skepticism')},
      {label: 'Action under uncertainty', question: statement('Can a person deliberate and act without knowledge or settled belief?', 'epistemology', 'skepticism'), positions: [
        {entityId: 'epistemology', claim: statement('Fallibilist and social approaches explain action through graded evidence, testimony, competence, risk, and context without requiring certainty.', 'epistemology')},
        {entityId: 'skepticism', claim: statement('Academic skeptics debate reasonable or persuasive appearances, while Pyrrhonians report following appearances, customs, skills, and ordinary needs without dogmatic commitment.', 'skepticism')},
      ], contrast: statement('Both allow life below certainty, but they disagree over whether practical standards amount to warranted belief or can guide without doctrinal assent.', 'epistemology', 'skepticism')},
    ],
    terminology: [{topic: 'Defeasibility', positions: [
      {entityId: 'epistemology', term: 'fallibilism', explanation: statement('Fallibilism allows knowledge or justified belief without excluding every logical possibility of error, provided the belief meets appropriate standards.', 'epistemology')},
      {entityId: 'skepticism', term: 'equipollence and suspension', explanation: statement('Equipollence is the experienced balance of opposed considerations that leads the Pyrrhonist to suspend judgment rather than assert their universal equality as a doctrine.', 'skepticism')},
    ], warning: statement('Fallibilism is not casual uncertainty, and suspension is not the claim that all views are equally true or that inquiry should stop.', 'epistemology', 'skepticism')}],
    arguments: [
      {entityId: 'epistemology', title: 'Identify success without demanding infallibility', summary: statement('Knowledge can remain vulnerable to some error while being nonaccidental, responsibly grounded, competently formed, or reliably connected to truth.', 'epistemology'), pressure: statement('Any account must avoid declaring favored social or cognitive procedures reliable without examining exclusion, luck, misleading environments, and disagreement.', 'epistemology')},
      {entityId: 'skepticism', title: 'Keep reasons answerable to counterreasons', summary: statement('Systematically opposing appearances and arguments reveals when confidence depends on unexamined assumptions or a demand for resolution the evidence cannot meet.', 'skepticism'), pressure: statement('The skeptic must explain the status of the method, its reports, and its practical guidance without silently asserting the conclusions it refuses to endorse.', 'skepticism')},
    ],
    readings: [
      {entityId: 'epistemology', title: 'Theaetetus', author: 'Plato', kind: 'primary', stage: 'Watch accounts of knowledge fail productively', whyHere: statement('The dialogue tests perception, true judgment, and accounts without handing later epistemology a finished justified-true-belief definition.', 'epistemology')},
      {entityId: 'skepticism', title: 'Outlines of Pyrrhonism, Book I', author: 'Sextus Empiricus', kind: 'primary', stage: 'Practice skeptical distinctions', whyHere: statement('The text distinguishes inquiry, suspension, tranquility, and ordinary conduct while displaying the problem of describing skepticism nondogmatically.', 'skepticism')},
    ],
    interpretiveLimits: [statement('Cartesian skepticism, closure arguments, contextualism, Academic skepticism, and Pyrrhonian practice pose different problems; “the skeptic” is not one timeless opponent.', 'epistemology', 'skepticism')],
    followOns: [{kind: 'branch', participantIds: ['rationalism', 'empiricism'], label: 'Rationalism and Empiricism', reason: statement('Apply skeptical pressure to a historically bounded dispute over reason, experience, innateness, and the sources and limits of knowledge.', 'epistemology', 'skepticism')}],
  }),
  branchCase(['pragmatism', 'philosophy-of-science'], {
    sharedQuestion: statement('How should inquiry revise concepts and practices through experience while remaining answerable to evidence, consequences, and a world that can resist expectation?', 'pragmatism', 'philosophy-of-science'),
    historicalRelationship: statement('Classical pragmatism developed amid evolutionary theory, psychology, logic, statistics, education, and experimental inquiry, while philosophy of science contains realist, empiricist, historical, social, and practice-centered approaches not all derived from pragmatism.', 'pragmatism', 'philosophy-of-science'),
    sharedAssumptions: [statement('Both treat inquiry as fallible and corrigible, reject a fantasy of theory-free observation, and examine how hypotheses gain meaning and support through practices of testing and criticism.', 'pragmatism', 'philosophy-of-science')],
    axes: [
      {label: 'Meaning and method', question: statement('Are concepts clarified by practical consequences or by their roles in particular scientific methods and models?', 'pragmatism', 'philosophy-of-science'), positions: [
        {entityId: 'pragmatism', claim: statement('Peircean pragmatism clarifies a conception by tracing conceivable practical bearings, while James, Dewey, and later pragmatists disagree about truth, experience, and inquiry.', 'pragmatism')},
        {entityId: 'philosophy-of-science', claim: statement('Philosophy of science finds no single scientific method: experiments, field observations, measurements, models, simulations, explanations, and historical sciences impose different demands.', 'philosophy-of-science')},
      ], contrast: statement('Pragmatism offers a philosophical orientation to meaning and inquiry; philosophy of science tests such orientations against heterogeneous domain-specific practices.', 'pragmatism', 'philosophy-of-science')},
      {label: 'Truth and usefulness', question: statement('Can practical success explain truth and objectivity without reducing them to whatever currently works?', 'pragmatism', 'philosophy-of-science'), positions: [
        {entityId: 'pragmatism', claim: statement('Pragmatists dispute convergence, pluralism, warranted assertibility, realism, and the relation between truth and successful inquiry rather than sharing the slogan that truth is usefulness.', 'pragmatism')},
        {entityId: 'philosophy-of-science', claim: statement('Scientific realists and antirealists debate whether predictive and explanatory success warrants belief in unobservables or only confidence in empirical adequacy and reliable practice.', 'philosophy-of-science')},
      ], contrast: statement('Both use success as evidence, but neither can identify truth with short-term utility without explaining correction, novel prediction, recalcitrant results, and changing aims.', 'pragmatism', 'philosophy-of-science')},
    ],
    terminology: [{topic: 'Inquiry through consequences', positions: [
      {entityId: 'pragmatism', term: 'pragmatic maxim', explanation: statement('The pragmatic maxim clarifies hypotheses through conceivable experiential and practical differences; it is not a rule that morally desirable beliefs become true.', 'pragmatism')},
      {entityId: 'philosophy-of-science', term: 'testability', explanation: statement('Testability concerns how hypotheses expose themselves to evidence through observations, experiments, models, and auxiliary assumptions, not one timeless falsification recipe.', 'philosophy-of-science')},
    ], warning: statement('“What works” must specify for whom, toward which aim, across what time, under which evidence, and with what opportunities for criticism and correction.', 'pragmatism', 'philosophy-of-science')}],
    arguments: [
      {entityId: 'pragmatism', title: 'Treat knowing as responsible action in a world', summary: statement('Beliefs and concepts show their content through habits of expectation, inference, and action that experience and a community of inquiry can correct.', 'pragmatism'), pressure: statement('Communal correction can fail when inquiry excludes participants, fixes its aims unjustly, or calls mere adaptation to power a successful consequence.', 'pragmatism')},
      {entityId: 'philosophy-of-science', title: 'Let practices constrain philosophies of method', summary: statement('The diversity of scientific work warns against prescribing one abstract sequence before examining how evidence, explanation, measurement, and models function in a domain.', 'philosophy-of-science'), pressure: statement('Local practice must still answer normative questions about objectivity, values, institutional incentives, cross-domain learning, and why some methods deserve trust.', 'philosophy-of-science')},
    ],
    readings: [
      {entityId: 'pragmatism', title: 'The Fixation of Belief and How to Make Our Ideas Clear', author: 'Charles S. Peirce', kind: 'primary', stage: 'Begin with inquiry and clarification', whyHere: statement('The essays connect doubt, belief, community, consequences, reality, and experimental testing while leaving later pragmatist disputes open.', 'pragmatism')},
      {entityId: 'philosophy-of-science', title: 'The Logic of Scientific Discovery', author: 'Karl Popper', kind: 'primary', stage: 'Test a strong philosophy of method', whyHere: statement('Popper’s account of demarcation and severe testing provides a precise proposal to compare with historical and practice-centered objections.', 'philosophy-of-science')},
    ],
    interpretiveLimits: [statement('Peirce, James, Dewey, Addams, later pragmatists, scientific realists, historians of science, and social epistemologists disagree internally; shared attention to practice does not erase those conflicts.', 'pragmatism', 'philosophy-of-science')],
    followOns: [{kind: 'branch', participantIds: ['epistemology', 'philosophy-of-science'], label: 'Epistemology and Philosophy of Science', reason: statement('Return from inquiry and consequences to the broader relation among knowledge, justification, testimony, scientific practice, and objectivity.', 'epistemology', 'philosophy-of-science')}],
  }),
  branchCase(['feminist-philosophy', 'marxism'], {
    sharedQuestion: statement('How do material relations, social identities, labor, institutions, and organized power reproduce domination, and what collective practices could transform them?', 'feminist-philosophy', 'marxism'),
    historicalRelationship: statement('Socialist and Marxist feminisms develop through critical engagement with Marx, Engels, labor movements, anticolonial struggle, Black feminism, social-reproduction theory, and other feminisms; neither feminist philosophy nor Marxism is one unified partner in the exchange.', 'feminist-philosophy', 'marxism'),
    sharedAssumptions: [statement('Both challenge explanations that isolate private choice from social structure and treat supposedly natural arrangements of work, family, property, authority, and knowledge as historically contestable.', 'feminist-philosophy', 'marxism')],
    axes: [
      {label: 'Primary structures', question: statement('How should class, gender, race, sexuality, coloniality, and disability be related without making one merely derivative?', 'feminist-philosophy', 'marxism'), positions: [
        {entityId: 'feminist-philosophy', claim: statement('Feminist philosophies use intersectional, materialist, standpoint, care, decolonial, trans, analytic, phenomenological, and other approaches to analyze interacting structures and lived differences.', 'feminist-philosophy')},
        {entityId: 'marxism', claim: statement('Marxist traditions center production, class, exploitation, property, ideology, and collective organization while feminist, anticolonial, ecological, and racial critiques dispute how broadly those categories explain.', 'marxism')},
      ], contrast: statement('The dispute is not gender versus class: it concerns how structures are co-constituted, which abstractions clarify them, and what political strategies follow.', 'feminist-philosophy', 'marxism')},
      {label: 'Work and reproduction', question: statement('Which activities and dependencies reproduce a social order beyond the wage relation?', 'feminist-philosophy', 'marxism'), positions: [
        {entityId: 'feminist-philosophy', claim: statement('Feminist analysis makes care, household labor, pregnancy, sexuality, violence, dependency, and the production of knowers central to political economy and agency.', 'feminist-philosophy')},
        {entityId: 'marxism', claim: statement('Marxist analysis reconstructs how labor power, commodities, profit, property, and class relations reproduce capital, while later Marxisms extend and contest the boundaries of production.', 'marxism')},
      ], contrast: statement('Many social-reproduction approaches argue that capitalist production depends on activities that reproduce people and capacities for work; whether those activities are paid or unpaid, publicly supported or privatized, and organized through gendered or racialized divisions varies by historical setting and must be analyzed rather than presumed.', 'feminist-philosophy', 'marxism')},
    ],
    terminology: [{topic: 'Social position and distorted appearance', positions: [
      {entityId: 'feminist-philosophy', term: 'standpoint and intersectionality', explanation: statement('Standpoint theories study socially situated knowledge without granting automatic insight, while intersectionality analyzes structures whose interaction is obscured by single-axis categories.', 'feminist-philosophy')},
      {entityId: 'marxism', term: 'ideology and commodity fetishism', explanation: statement('Ideology and fetishism analyze how social relations can appear natural, independent, or thing-like, though Marxist traditions dispute their mechanisms and scope.', 'marxism')},
    ], warning: statement('Situated knowledge is not identity-based infallibility, and ideology critique does not authorize a theorist to dismiss disagreement as mere false consciousness.', 'feminist-philosophy', 'marxism')}],
    arguments: [
      {entityId: 'feminist-philosophy', title: 'Begin where abstract universals exclude', summary: statement('Concepts of worker, citizen, family, reason, and freedom can hide whose labor, body, safety, and testimony make institutions possible and whose experience they marginalize.', 'feminist-philosophy'), pressure: statement('Coalitional analysis must avoid speaking for differently situated people, flattening culture, or treating every disparity as evidence for one prior theory.', 'feminist-philosophy')},
      {entityId: 'marxism', title: 'Explain domination through reproducible social relations', summary: statement('Capital is not only greed or unequal income but a patterned relation organized through property, labor power, competition, accumulation, law, and class struggle.', 'marxism'), pressure: statement('A class-centered explanation must show how gender, race, empire, ecology, household power, state violence, and noneconomic meanings enter the relation rather than waiting outside it.', 'marxism')},
    ],
    readings: [
      {entityId: 'feminist-philosophy', title: 'Women, Race & Class', author: 'Angela Davis', kind: 'primary', stage: 'Read labor and liberation through connected histories', whyHere: statement('The work connects enslavement, wage labor, domestic work, racism, and feminist movements while resisting a single-axis history.', 'feminist-philosophy')},
      {entityId: 'marxism', title: 'Capital, Volume I, chapters 6–10 and 23–25', author: 'Karl Marx', kind: 'primary', stage: 'Study labor power and accumulation', whyHere: statement('The route establishes exploitation, the working day, reproduction, accumulation, and dispossession before later feminist revisions are assessed.', 'marxism')},
    ],
    interpretiveLimits: [statement('Liberal, radical, Black, Indigenous, decolonial, trans, socialist, and Marxist feminisms disagree, as do revolutionary, reformist, humanist, structuralist, anticolonial, ecological, and other Marxisms.', 'feminist-philosophy', 'marxism')],
    followOns: [{kind: 'branch', participantIds: ['german-idealism', 'marxism'], label: 'German Idealism and Marxism', reason: statement('Trace one conceptual genealogy of dialectic, history, alienation, and social freedom before returning to feminist transformations of material critique.', 'german-idealism', 'marxism')}],
  }),
];
