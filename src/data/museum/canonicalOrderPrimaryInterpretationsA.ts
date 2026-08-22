import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';

type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

const objectLed = (
  name: string,
  paragraphs: readonly string[],
  orientation: readonly VisitorGuideSection[],
  assetId: MuseumAssetId,
  objectText: string,
  lock: `fnv1a64:${string}`,
): MuseumPrimaryInterpretationEnrichment => ({
  lead: '',
  keyIdeas: [],
  keyWorks: [],
  sections: [{heading: '', paragraphs}],
  presentation: {
    mode: 'concise',
    orientation,
    articleActionLabel: `Read the full sourced ${name} article`,
    bodyLayout: 'prose',
    exhibitLayout: 'object-led',
    plaqueKicker: '',
    plaqueSubtitleLines: 4,
  },
  objectInterpretations: {[assetId]: objectText},
  review: {
    status: 'standard-compliant',
    reviewedOn: '2026-08-09',
    method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.',
    lock,
  },
});

/**
 * The first consecutive claim-reviewed group in canonical/ledger order after
 * the excluded unresolved-object records. These are bespoke primary Museum
 * readings, not abridgements of their full sourced canonical articles.
 */
export const CANONICAL_ORDER_PRIMARY_INTERPRETATIONS_A:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  'martha-nussbaum': objectLed(
    'Martha Nussbaum',
    [
      'Martha Nussbaum’s capabilities approach asks a political question that measures neither resources nor reported satisfaction alone: what is each person genuinely able to do and to be? A capability is a real opportunity; a functioning is an achieved activity or state. Two people can possess similar income, food, or formal rights yet have sharply different practical freedom because of bodily condition, care responsibilities, discrimination, violence, public infrastructure, or political exclusion. This distinction changes the point of comparison. The approach does not prescribe one admirable life. It asks whether social arrangements secure a threshold below which a life cannot count as fully humanly dignified.',
      'Nussbaum developed this project through work on ancient ethics, emotions, literature, feminism, disability, global justice, animals, education, and political liberalism. Her list of central capabilities—life, bodily health and integrity, senses and thought, emotions, practical reason, affiliation, relations with other species, play, and control over one’s environment—is offered as a revisable political proposal, not a psychological ranking of private worth. It differs from Amartya Sen’s more comparative use of capability: Nussbaum defends a specified threshold of constitutional concern, while Sen resists a fixed canonical list. That difference matters for the familiar question of who should decide which capabilities count and how they are made effective.',
      'The 2010 Law School portrait identifies Nussbaum in an institutional setting; it does not picture a capability, establish a list, or settle disputes over universalism and implementation. Those disputes remain consequential. Critics ask whether a universal threshold can accommodate cultural and democratic disagreement, whether a list can avoid paternalism, how collective and environmental conditions enter the account, and which indicators measure freedom without replacing it. Defenders reply that dignity needs public rather than merely aspirational guarantees. The object therefore grounds a living author without personalizing an argument that is tested in law, education, care, disability policy, gender justice, animal ethics, and material conditions of agency.',
    ],
    [
      {heading: 'The central distinction', items: [
        {label: 'Capabilities', description: 'Genuine opportunities to act or live in certain ways, not merely goods someone has been given or desires someone reports.'},
        {label: 'Functionings', description: 'The activities and states a person actually achieves; choosing not to exercise an opportunity is different from never having it.'},
      ]},
      {heading: 'A political threshold', items: [
        {label: 'Central capabilities', description: 'Nussbaum’s proposed list names areas a just political order must protect to a sufficient level, rather than one model life everyone must pursue.'},
        {label: 'Practical reason and affiliation', description: 'Reflecting on a life plan and living with others as equals are linked capabilities, not optional rewards after economic policy is finished.'},
      ]},
      {heading: 'Questions for judgment', items: [
        {label: 'Resources are not freedom', description: 'Income, rights, and services matter, but illness, violence, care, discrimination, and institutions can prevent their conversion into real opportunity.'},
        {label: 'Universalism and democracy', description: 'The approach is contested over who specifies the list and threshold, and how shared standards can respect democratic and cultural disagreement.'},
      ]},
    ],
    'martha-nussbaum-portrait-2010',
    'This is Sally Ryan’s licensed 24 August 2010 photograph of Martha Nussbaum standing in the Harold J. Green Law Lounge at the University of Chicago Law School. It identifies a living philosopher in an institutional setting, but it cannot depict capabilities, prove a threshold list, or decide disputes about universalism, disability, culture, measurement, and political implementation.',
    'fnv1a64:79ce931632e8e930',
  ),
  ontology: objectLed(
    'Ontology',
    [
      'Ontology asks what it is to be, what kinds of things there are, and how things are identical or dependent. Its questions include whether objects, properties, events, processes, relations, numbers, possibilities, absences, and social entities belong in an account of reality; what makes something persist through change; when parts compose a whole; and whether one fact is more fundamental than another. An inventory is not yet an ontology. A theory must also say how its categories connect, what commits us to them, and why its explanatory costs are worth accepting. Ontology overlaps with metaphysics, but philosophers disagree about whether it is a part of that field, its central inquiry, or a different practice.',
      'There is no single historical origin or universal vocabulary for these questions. Greek arguments about categories and being, South Asian disputes about substance, universals, absence, persons, and momentariness, Buddhist critiques of intrinsic nature, Chinese accounts of you, wu, qi, li, and dao, and Islamic, Jewish, Christian, African, and Indigenous traditions have different texts, languages, institutions, and practical aims. Comparison can reveal assumptions, but it cannot turn a shared English gloss into an equivalence or a line of transmission. A responsible route asks which problem a text addresses before treating it as an answer to a contemporary European category question.',
      'Contemporary debates range from Quine’s test for the commitments of a regimented theory to Carnap’s framework-relative questions, modal realism, grounding, process ontology, and social construction. Social entities such as money, race, disability classifications, groups, and institutions can depend on practices while remaining causally consequential; construction is not a synonym for unreality or endorsement. The illustration shows one vessel changing in material, condition, and diagrammatic relation. It is a prompt for identity and dependence, not evidence that a thing is fundamentally a substance, a process, or both. Ontology remains valuable because revising what a theory says exists can revise how people explain science, law, technology, responsibility, and ordinary life.',
    ],
    [
      {heading: 'What is being asked?', items: [
        {label: 'Categories and commitment', description: 'Ontology asks both what a theory says exists and what categories or relations make that commitment intelligible.'},
        {label: 'Identity through change', description: 'Persistence problems ask what, if anything, remains the same when an object changes material, parts, properties, location, or role.'},
      ]},
      {heading: 'Important distinctions', items: [
        {label: 'Existence and fundamentality', description: 'Something may exist without being fundamental; a theory can distinguish ordinary objects from what it treats as explanatory grounds.'},
        {label: 'Construction and unreality', description: 'A socially dependent category can shape institutions, opportunities, and harm even when it is not a natural kind independent of practices.'},
      ]},
      {heading: 'Reading across traditions', items: [
        {label: 'No single origin story', description: 'Questions about reality have many histories, so a modern field label should not make other traditions into an undeveloped European preface.'},
        {label: 'Metaontology', description: 'This asks whether an apparent ontological dispute concerns reality itself, the choice of a linguistic framework, or both.'},
      ]},
    ],
    'ontology-being-process-interpretive',
    'This 2026 Philosophy Atlas interpretive illustration centers one vessel as it shifts from intact ceramic through cracked, darkened, corroded, and disintegrating states, with diagrams and related forms around it. It is not a historical artifact or canonical ontology chart. The image invites questions about identity, change, parts, kinds, and relations without privileging substance over process or settling any ontology debate.',
    'fnv1a64:48043d72b23495ba',
  ),
  whitehead: objectLed(
    'Alfred North Whitehead',
    [
      'Alfred North Whitehead’s career joins mathematics, philosophy of nature, education, cosmology, and speculative metaphysics without collapsing them into a single doctrine. With Bertrand Russell, he co-authored Principia Mathematica, a monumental logical project whose type theory and philosophical stakes are shared rather than reducible to either author. In The Concept of Nature and Science and the Modern World, Whitehead challenged accounts that separate a colorless world described by science from a merely subjective world of experience. He sought concepts adequate to nature as disclosed through events, relations, measurement, and lived experience, while treating scientific abstraction as useful rather than simply false.',
      'Process and Reality gives the mature system its difficult vocabulary. Actual occasions are momentary units of becoming, not tiny persons or little conscious minds. Each comes to be through prehensions: relations that take up features of other occasions and transform them within a new unity, a process Whitehead calls concrescence. Eternal objects are repeatable possibilities for definiteness; societies are patterned continuities of occasions; creativity names the general advance into novelty. These terms form a speculative account of relation, value, time, and nature. They are not observational discoveries that modern physics has independently verified, and interpreters disagree over their coherence and scope.',
      'Whitehead’s later account of God is likewise part of the system, not an optional religious decoration or a conventional creator doctrine. It concerns possibilities, ordering, and the reception of the world, but it has generated sharply different theological and secular readings. The 1923 head-and-shoulders photograph establishes Whitehead’s presence during a period of public scientific writing; the unidentified photographer and publication image do not make process, creativity, prehension, or divine relation visible in his expression. The better question is conceptual: can a philosophy organized around events and relations explain endurance, causation, experience, and scientific abstraction more adequately than one organized chiefly around self-contained substances?',
    ],
    [
      {heading: 'Changing projects', items: [
        {label: 'Principia Mathematica', description: 'Whitehead and Russell’s joint logical work pursued a rigorous treatment of mathematics; it is not evidence that Whitehead’s later metaphysics follows automatically from logic.'},
        {label: 'Philosophy of nature', description: 'Whitehead challenged ways of dividing scientific description from the experienced world while preserving the importance of abstraction.'},
      ]},
      {heading: 'Process vocabulary', items: [
        {label: 'Actual occasions', description: 'Momentary acts of becoming that make up reality in the mature system, rather than enduring atoms with miniature private minds.'},
        {label: 'Prehension and concrescence', description: 'An occasion takes account of other realities and becomes a determinate unity; these are technical relations, not ordinary acts of conscious perception.'},
      ]},
      {heading: 'A live test', items: [
        {label: 'Creativity and societies', description: 'Novelty and patterned continuity help Whitehead explain a world of relations, but they raise hard questions about causation, order, and individuality.'},
        {label: 'God in process thought', description: 'Whitehead’s unusual account remains debated and should not be assumed to reproduce either traditional theism or a secular scientific theory.'},
      ]},
    ],
    'alfred-north-whitehead-portrait-1923',
    'This unidentified-photographer portrait of Alfred North Whitehead was published in Splendour of the Heavens in 1923. It is a lifetime publication image, not a diagram of process philosophy or evidence that Whitehead’s metaphysics follows from physics. The photograph identifies the author while leaving actual occasions, prehensions, creativity, and the disputed role of God to the texts and their interpreters.',
    'fnv1a64:fff47eda5b93a87f',
  ),
  'philosophy-of-mind': objectLed(
    'Philosophy of Mind',
    [
      'Philosophy of mind is not only the mind–body problem or only the study of consciousness. It joins questions about subjective experience, intentionality, perception, action, emotion, memory, agency, selfhood, cognition, and social understanding. Metaphysical theories ask what minds or mental states are and how they relate to bodies; epistemological questions concern first-person knowledge, testimony, perception, and other minds; phenomenology describes lived experience; cognitive science proposes mechanisms; ethical and political inquiry asks whose reports, agency, suffering, and cognitive difference receive recognition. These targets overlap but do not collapse. A theory of representation or behavior may still leave the felt character of experience unexplained.',
      'Dualisms, physicalisms, behaviorisms, identity theories, functionalism, representationalism, nonreductive views, eliminativist proposals, neutral monism, and emergence disagree about mental reality and explanation. Phenomenology, enactivism, and embodied or extended cognition redirect attention toward skilled bodies, tools, environments, and social practices. Each family faces questions about causal efficacy, error, unity, qualitative character, development, and evidence. Neural data and computational models constrain responsible theory, yet a correlation, successful prediction, or fluent performance does not by itself establish consciousness, understanding, or a unique metaphysical conclusion. Functionalism is not automatically computationalism, and physicalism is not simply the denial that psychology has work to do.',
      'The field also inherits several histories that should not be pressed into one vocabulary. Aristotle, South Asian and Buddhist accounts of self and cognition, Islamic philosophy, Chinese heart-mind traditions, early modern arguments, phenomenology, pragmatism, analytic philosophy, psychology, and neuroscience pursue differently shaped problems. Animal and artificial systems sharpen the distinctions among intelligence, language, sentience, agency, selfhood, and moral status. The Museum illustration pairs a luminous experiential field with an embodied, neural, and worldly network. It is not a map of a private inner theater, a proof of dualism, or a verdict for physicalism. Its value is to hold first-person experience and objective explanation in view without pretending they already fit together.',
    ],
    [
      {heading: 'Different targets', items: [
        {label: 'Consciousness', description: 'Subjective experience or what it is like for a subject, which is not identical with wakefulness, reportability, or intelligent behavior.'},
        {label: 'Intentionality', description: 'The aboutness or directedness of thought, perception, and language; it is not merely a conscious plan or intention to act.'},
      ]},
      {heading: 'Competing explanations', items: [
        {label: 'Functionalism', description: 'A mental state is characterized by its causal role, a proposal that supports multiple realization but does not settle whether computation is sufficient for mind.'},
        {label: 'Embodied and extended cognition', description: 'Related approaches that treat body, skill, tools, environment, and social practice as explanatory partners, while disagreeing over their boundaries.'},
      ]},
      {heading: 'Evidence and ethics', items: [
        {label: 'Several kinds of evidence', description: 'First-person report, behavior, neuroscience, computation, development, and social practice can constrain one another without any one automatically deciding the field.'},
        {label: 'Other minds', description: 'Questions about animals and artificial systems require separate judgments about consciousness, cognition, agency, vulnerability, and moral standing.'},
      ]},
    ],
    'philosophy-mind-subjective-objective-interpretive',
    'This 2026 Philosophy Atlas interpretive illustration shows a cutaway embodied head: a luminous experiential landscape occupies one side while anatomical and worldly networks spread across the other. It is a conceptual prompt, not neuroscience, a portrait of a mind, or proof of dualism, physicalism, idealism, or any single theory of consciousness and embodiment.',
    'fnv1a64:a5691b2cce19d22f',
  ),
  'thomas-nagel': objectLed(
    'Thomas Nagel',
    [
      'Thomas Nagel made the subjective character of consciousness impossible to ignore in philosophy of mind. “What Is It Like to Be a Bat?” argues that a conscious organism has a point of view: there is something it is like for that organism to be itself. The bat is not a mystical exception. It is a creature whose echolocation makes the gap between human imagination and another form of experience vivid. People can learn objective facts about a bat’s body, behavior, and sensory capacities while still failing to know that experience from within. The argument challenges reduction, but it does not by itself prove substance dualism or make empirical science irrelevant.',
      'In The View from Nowhere, Nagel broadens the tension between a personal standpoint and impersonal accounts of self and world. Objectivity is a powerful achievement, not an enemy; it lets people see themselves as part of a wider reality. Yet an abstract account can leave behind a particular lived perspective. Nagel carries this tension into questions about altruism, death, absurdity, moral luck, equality, war, partiality, legitimacy, and global justice. These topics do not make one theory of mind do all the work. They show how reasons can appear differently from within a life and from a standpoint that tries to treat persons impartially.',
      'Nagel’s later Mind and Cosmos criticizes materialist neo-Darwinian explanation and proposes a contested teleological possibility. It should be read as a disputed development, neither a retroactive key to the bat essay nor an established alternative to science. The 15 March 1978 black-and-white photographic print shows the philosopher in an indoor portrait, with visible crop marks and an unidentified institutional setting. It identifies Nagel at a moment in his career but cannot render another creature’s subjective character or decide reduction, physicalism, ethics, or teleology. The photograph instead makes the contrast vivid: even a plainly visible person is not thereby transparent from the first-person point of view.',
    ],
    [
      {heading: 'A point of view', items: [
        {label: 'What it is like', description: 'Nagel’s phrase marks the subjective character of a conscious organism’s experience, not a claim that its experience is wholly unknowable.'},
        {label: 'The bat case', description: 'Echolocation helps expose limits in human imaginative access; it is not an argument against studying bats scientifically or respectfully.'},
      ]},
      {heading: 'Two standpoints', items: [
        {label: 'Objectivity', description: 'Abstraction can reveal a wider world and correct private bias, even though it may omit how that world appears from a particular life.'},
        {label: 'Personal and impersonal reasons', description: 'Nagel explores how special commitments and impartial demands can both matter in ethics and political judgment without one simply erasing the other.'},
      ]},
      {heading: 'Reading with care', items: [
        {label: 'Mind and Cosmos', description: 'A later, strongly contested critique of materialist neo-Darwinian explanation; it is not consensus science or the whole of Nagel’s philosophy.'},
        {label: 'More than consciousness', description: 'Moral luck, death, absurdity, equality, war, and legitimacy are connected areas of Nagel’s work, not illustrations of one bat argument.'},
      ]},
    ],
    'thomas-nagel-portrait',
    'This is Nagelt’s 15 March 1978 black-and-white photographic portrait of Thomas Nagel, presented here with the print’s visible crop marks and indoor background. It identifies a living philosopher but does not picture a first-person point of view, demonstrate what bat experience is like, or settle reductionism, physicalism, ethics, or Nagel’s later teleological proposal.',
    'fnv1a64:dcac7bec3c607e0c',
  ),
  'philosophy-of-science': objectLed(
    'Philosophy of Science',
    [
      'Philosophy of science studies how inquiry earns claims: observation, experiment, measurement, modeling, explanation, confirmation, induction, causation, laws, classification, simulation, realism, and change. These are related, not stations in one universal method. An instrument can extend observation while requiring calibration and background assumptions. A model can explain by idealizing without being literal. Evidence can favor a claim without eliminating uncertainty, and successful prediction can support rival accounts. The field therefore asks what scientists do and what makes inference answerable to the world, criticism, and people affected.',
      'Science is organized work as well as reasoning. Laboratories, field sites, archives, standards, statistical conventions, journals, replication, peer criticism, funding, patents, states, firms, and public institutions shape which questions are feasible and which results travel. This social character need not make evidence arbitrary. Diverse criticism and accountable institutions can improve objectivity by exposing blind spots; secrecy, exclusion, hierarchy, conflicts of interest, and unequal access can damage it. Expertise is neither infallible authority nor just one preference among others. It depends on warranted competence, transparent limits, appropriate trust, and practices capable of correction. Ethical questions about animals, risk, environment, public health, and dual use belong to inquiry rather than arriving only after the facts are finished.',
      'Historical, feminist, social, and decolonial approaches examine values in problem choice, classification, measurement, risk, and application, including the colonial collection and extraction that helped build some disciplines. They do not imply that every result is merely political or that evidence can say anything a community wants. Nor should early modern Europe become an origin story for all systematic inquiry; particular Greek, Chinese, South Asian, Islamic, African, Indigenous, and other knowledge histories require their own terms. Wright’s candlelit air-pump scene makes experiment, spectatorship, apparatus, and distress visible. It is an eighteenth-century painting, not a record of one event or an image of all science. The threatened bird keeps a moral question inside a dramatic account of demonstration.',
    ],
    [
      {heading: 'Practices of inquiry', items: [
        {label: 'Models and idealization', description: 'A model deliberately simplifies or distorts in order to isolate a pattern, so usefulness does not require it to be a miniature copy of its target.'},
        {label: 'Measurement and calibration', description: 'Numbers depend on instruments, standards, error assessment, and background assumptions; precision is an achievement, not raw observation.'},
      ]},
      {heading: 'Arguments about success', items: [
        {label: 'Induction and confirmation', description: 'Past success does not deductively guarantee future regularity, so evidence, prior assumptions, and predictive support remain philosophically contested.'},
        {label: 'Realism and instrumentalism', description: 'These families disagree about whether successful science warrants belief in unobservables or chiefly reliable use of theories and models.'},
      ]},
      {heading: 'Science in public life', items: [
        {label: 'Criticism and expertise', description: 'Peer challenge, replication, transparency, and diverse competence can strengthen inquiry, while institutions can also transmit bias or unequal power.'},
        {label: 'Values and responsibility', description: 'Values can enter research priorities, classification, risk thresholds, and application without making evidence a matter of mere preference.'},
      ]},
    ],
    'science-air-pump-wright-1768',
    'Joseph Wright of Derby’s 1768 An Experiment on a Bird in the Air Pump is an oil painting in London’s National Gallery, NG725. It stages a candlelit vacuum-pump demonstration before adults and children, including a bird in the glass receiver. The painting makes instrument, spectacle, witness, and animal distress available for interpretation, but it does not document one experiment or define scientific method as a whole.',
    'fnv1a64:e8d238788c458c5a',
  ),
  carnap: objectLed(
    'Rudolf Carnap',
    [
      'Rudolf Carnap treated philosophical clarity as constructive work: make a framework’s vocabulary, rules, and inferential commitments explicit, then ask what that framework can accomplish. He was a major participant in the Vienna Circle, but not its sole founder or an uncontested leader. The Circle joined scientists, mathematicians, and philosophers with different projects and political situations; “logical positivism” can hide those disagreements. Carnap’s Aufbau explores whether knowledge can be systematically reconstructed through explicitly defined relations. It is not simply a recipe for translating every meaningful claim into private sensations, and its starting point and ambition remain matters of interpretation.',
      'Carnap later shifted from construction to the logical syntax of languages, then to semantics, modality, probability, confirmation, and explication. The principle of tolerance permits the design and comparison of different formal frameworks when their rules and purposes are open to view; it does not say every framework is equally fruitful, empirically adequate, or politically harmless. His distinction between internal questions asked within a framework and external practical questions about adopting one relocates some ontological arguments rather than making every external issue meaningless. Criticism of metaphysics is likewise a program of logical and linguistic diagnosis, not a decisive proof that all metaphysical reflection is nonsense.',
      'The argument with W. V. O. Quine over analyticity, framework choice, and ontology is a live philosophical dispute, not a one-essay defeat. Carnap’s work in confirmation theory also differs from Popper’s account of falsifiability and corroboration. The principal image is an 1895 studio photograph of Carnap as a child, from the University of Vienna’s logical-empiricism archive. It is a genuine lifetime image but cannot portray the adult thinker’s projects, the Vienna Circle’s collaboration, exile, or a formal language. Its chronological distance is useful: a recognizable biography must not substitute for the later argumentative work through which Carnap continually revised what philosophical clarification could be.',
    ],
    [
      {heading: 'Constructing clarity', items: [
        {label: 'The Aufbau', description: 'The Logical Structure of the World tests an ambitious reconstruction of knowledge through defined relations; scholars dispute how its basis and reductions should be read.'},
        {label: 'Logical syntax', description: 'Carnap studied formal language rules to show how philosophical claims can depend on a chosen system of expression and inference.'},
      ]},
      {heading: 'Frameworks and questions', items: [
        {label: 'Principle of tolerance', description: 'Different rule-governed languages may serve different purposes, but they remain open to evaluation for clarity, fruitfulness, simplicity, and fit with inquiry.'},
        {label: 'Internal and external questions', description: 'Some existence questions are asked within a framework, while adopting a framework involves practical and theoretical judgment rather than arbitrary taste.'},
      ]},
      {heading: 'Important cautions', items: [
        {label: 'Vienna Circle', description: 'A collaborative and internally diverse movement, not one doctrine authored by Carnap or a label that erases its historical and political setting.'},
        {label: 'Carnap and Quine', description: 'Their disagreement about analyticity, ontology, and linguistic rules reshaped analytic philosophy without supplying a simple winner-takes-all verdict.'},
      ]},
    ],
    'carnap-portrait',
    'This unknown-photographer studio portrait shows Rudolf Carnap as a child in 1895 and is held through the University of Vienna’s Virtual Archive of Logical Empiricism. It is a genuine lifetime photograph, but not an adult portrait, Vienna Circle document, Aufbau page, or diagram of a linguistic framework. The image gives chronological identity context while leaving Carnap’s mature constructive, syntactic, semantic, and inductive arguments to the sources.',
    'fnv1a64:207bafccf191e50b',
  ),
  popper: objectLed(
    'Karl Popper',
    [
      'Karl Popper made criticism, rather than verification, central to a picture of rational inquiry. Responding to the problem of induction and to Vienna debates about science, he argued that favorable instances cannot conclusively establish a universal theory. A theory can instead take empirical risks: it can forbid outcomes whose occurrence would count against it. Falsifiability is a demarcation proposal, not a definition of meaningfulness or guarantee of truth. Popper formed this view in Vienna but was not a Vienna Circle member, and later accounts should not simplify that setting.',
      'For Popper, good science advances conjectures and exposes them to severe tests. Corroboration records a theory’s survival under demanding testing; it is not a probability of truth or confirmation in Carnap’s sense. A recalcitrant result may implicate instruments, auxiliary hypotheses, experimental conditions, or the focal theory, so falsification is not a mechanical instruction to discard a theory after one awkward observation. Critical rationalism retains fallible judgments about which adjustments are independently motivated and which merely protect a view from risk. Metaphysical ideas can be meaningful and heuristically productive even when not currently testable, another reason demarcation should not be confused with a universal theory of sense.',
      'Popper extended a corrigibility ideal into political philosophy. His open society favors institutions that enable criticism, accountability, and peaceful correction over insulated authority and utopian redesign. That project does not reduce to a contemporary market slogan, and his readings of Plato, Hegel, and Marx remain politically and interpretively contested. DorianKBandy’s 1987 color portrait shows Popper late in life, smiling and looking left against a dark background. It identifies the philosopher but cannot turn a late image into the younger author of Logik der Forschung or prove that criticism alone resolves scientific and political disagreement. The image holds biography in view while the exhibit keeps the difficult practice of testing, revising, and institutional correction at its center.',
    ],
    [
      {heading: 'Testing ideas', items: [
        {label: 'Falsifiability', description: 'A theory is empirically vulnerable when it rules out possible observations; this is a demarcation proposal, not a shortcut from failed prediction to falsehood.'},
        {label: 'Severe tests and corroboration', description: 'A theory that survives demanding tests has performed well so far, but Popper denies that this survival becomes final verification or probability of truth.'},
      ]},
      {heading: 'Critical rationalism', items: [
        {label: 'Auxiliary assumptions', description: 'Tests depend on instruments, background claims, and experimental judgment, so deciding what a result challenges requires criticism rather than an automatic rule.'},
        {label: 'Conjectural knowledge', description: 'Knowledge grows by exposing proposals to possible error and revising them, not by accumulating an unassailable foundation.'},
      ]},
      {heading: 'Political stakes', items: [
        {label: 'Open society', description: 'Institutions should make rulers and policies answerable to peaceful criticism and correction, a political ideal distinct from any one contemporary party program.'},
        {label: 'Contested history', description: 'Popper’s attacks on historicism and his readings of Plato, Hegel, and Marx are influential arguments, not settled descriptions of those thinkers.'},
      ]},
    ],
    'popper-portrait-1987',
    'This is DorianKBandy’s 1987 color photograph of Karl Popper, a late-life portrait in which he smiles while looking left against a dark background. It identifies Popper during his long public career, but it is not a 1930s manuscript, an experiment, or evidence that one adverse result mechanically refutes a theory. The image cannot settle Popper’s debates about demarcation, corroboration, or open institutions.',
    'fnv1a64:40c78a7671a81973',
  ),
};
