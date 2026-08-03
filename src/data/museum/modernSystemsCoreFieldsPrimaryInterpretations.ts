import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';

const presentation = (
  articleLabel: string,
  orientation: readonly {label: string; value: string}[],
): NonNullable<MuseumPrimaryInterpretationEnrichment['presentation']> => ({
  mode: 'concise',
  orientation,
  articleActionLabel: `Read the full sourced ${articleLabel} article`,
  bodyLayout: 'prose',
  plaqueKicker: '',
  plaqueSubtitleLines: 4,
});

/**
 * Concise, entity-complete interpretation for the modern-systems and core-fields
 * editorial cluster. These records keep the comprehensive reviewed article as
 * the reference layer while giving each physical installation its own connected,
 * object-aware Museum argument.
 */
export const MODERN_SYSTEMS_CORE_FIELDS_PRIMARY_INTERPRETATIONS:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  schelling: {
    lead: 'Joseph Karl Stieler’s 1835 portrait fixes Schelling in one late moment, but his philosophy repeatedly changed its route. This exhibit follows those changes—from nature and transcendental idealism through identity, freedom, the unfinished Ages of the World, and the later distinction between negative and positive philosophy—without forcing them into one timeless doctrine.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Schelling’s philosophy of nature treats nature as productive and self-organizing rather than as inert material waiting for a mind to impose form. His System of Transcendental Idealism approaches the same problem from self-conscious activity and gives art an exceptional role in exhibiting conscious and unconscious production together. The subsequent identity philosophy argues that subject and object must belong to a deeper unity, yet this is a new configuration of the problem, not an unchanged thesis carried through every period.',
      'The 1809 Freedom essay shifts the center toward personality, evil, and a freedom that includes a real capacity for disorder. Evil is not merely ignorance or a necessary rung in automatic progress; it concerns how powers within a person can be inverted. The unfinished Ages of the World drafts then experiment with a temporal account of divine and cosmic becoming. Their multiple versions matter: editors reconstruct a project Schelling repeatedly rewrote rather than a completed book whose final system can simply be quoted.',
      'Later lectures on mythology, revelation, and positive philosophy distinguish the rational articulation of what could be from knowledge of existence and history that cannot be deduced from concepts alone. These texts survive partly through lectures and posthumous editorial construction, so their status differs from published works. Schelling’s influence on Romanticism, existential and religious thought, psychoanalytic themes, and environmental philosophy is substantial but indirect and contested. “Irrationalist” and “Romantic” can name receptions; neither replaces the arguments or the chronology. The shifts themselves are part of the philosophical evidence here.',
    ]}],
    presentation: presentation('Schelling', [
      {label: 'Historical setting', value: 'German lands · 1775–1854'},
      {label: 'Changing projects', value: 'Nature · transcendental idealism · identity · freedom'},
      {label: 'Later work', value: 'Ages of the World · mythology · revelation · positive philosophy'},
      {label: 'Textual caution', value: 'Published books, changing drafts, lectures, and posthumous editions differ'},
      {label: 'Live disputes', value: 'System and history · freedom and evil · reason and existence'},
    ]),
  },
  hegel: {
    lead: 'Jakob Schlesinger’s 1831 portrait presents Hegel at the end of his career; the system around it was written, taught, revised, and later reconstructed from notes. The exhibit joins logic, experience, nature, social life, art, religion, and history while refusing the familiar thesis–antithesis–synthesis shortcut.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'The Phenomenology of Spirit follows forms of consciousness that discover tensions within their own standards and are driven toward more adequate ones. Its lordship–bondage passage analyzes dependence, recognition, fear, labor, and self-consciousness; the later “master–slave dialectic” tradition is a consequential reception, not the passage’s complete title or meaning. The Science of Logic pursues a different task: categories such as being, essence, actuality, and concept develop through determinate problems. Dialectic is this immanent testing and transformation, not a three-step formula applied from outside to every topic.',
      'Hegel’s Encyclopedia organizes logic, nature, and spirit, while the Philosophy of Right asks how freedom becomes actual through rights, morality, family, civil society, and the state. “Ethical life” names institutions and practices in which agents recognize norms as their own; it does not make whatever state exists morally final. His account of recognition and social freedom illuminates dependency and institutional life, yet disputes remain over constitutional monarchy, poverty, policing, corporations, war, and the standing of dissent. Hegel is neither simply a worshipper of the state nor straightforwardly a contemporary progressive democrat.',
      'Lectures on art, religion, history, and the history of philosophy were edited after Hegel’s death from manuscripts and student notes, so they require source-sensitive reading. They enlarge the system’s reach while exposing serious hierarchies and exclusions concerning Africa, Asia, colonialism, race, gender, religion, and historical agency. Interpreters disagree about whether Hegel’s logic is metaphysical, semantic, or both; whether history has a closed endpoint; and whether his institutions secure or constrain freedom. Later Hegelians, Marxists, existentialists, pragmatists, and critical theorists transform these questions rather than merely repeating Hegel.',
    ]}],
    presentation: presentation('Hegel', [
      {label: 'Historical setting', value: 'Stuttgart, Jena, Nuremberg, Heidelberg, Berlin · 1770–1831'},
      {label: 'Major architecture', value: 'Phenomenology · Logic · nature · subjective, objective, and absolute spirit'},
      {label: 'Freedom', value: 'Recognition · right · morality · family · civil society · state'},
      {label: 'Textual caution', value: 'Authored books and posthumously edited lecture cycles differ'},
      {label: 'Open disputes', value: 'Metaphysics · politics · religion · history · race · gender · colonialism'},
    ]),
  },
  kierkegaard: {
    lead: 'Luplau Janssen painted Kierkegaard at his desk around 1902, decades after his death. The posthumous image makes authorship visible but cannot merge the signed works, pseudonyms, journals, discourses, and late polemics into one voice. This exhibit asks how those forms make the reader responsible for interpretation.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Kierkegaard’s pseudonyms stage limited standpoints rather than serving as transparent masks for his own doctrine. The aesthetes, Judge William, Johannes de silentio, Johannes Climacus, and Anti-Climacus differ in genre, vocabulary, authority, and relation to Christianity. Their disputes illuminate choice, repetition, anxiety, inwardness, despair, faith, and the ethical, but no convenient ladder of “three stages” captures the whole authorship. Signed upbuilding discourses and works on love address readers differently, while journals supply evidence without functioning as a final master key.',
      'Anxiety names freedom’s vertigo before possibility; despair analyzes ways a self can fail to relate truthfully to itself and to the power that grounds it. Repetition tests whether life can be renewed rather than merely recollected, and Works of Love joins neighbor-love to demanding practices of equality and responsibility. Fear and Trembling’s Johannes de silentio cannot understand Abraham through universal ethical categories, but the paradox is not a general license for private violence. “Leap of faith” is a later shorthand that can obscure Kierkegaard’s careful questions about authority, passion, risk, and self-deception.',
      'The final attack on Christendom uses a more direct voice against the Danish established church, inherited membership, and comfortable admiration without imitation. It belongs with, but does not retroactively erase, the earlier indirect authorship. Kierkegaard’s social criticism can expose crowds, press anonymity, and institutional complacency, yet his politics, hierarchy, gender, and Christian exclusivity remain contested. The broken engagement to Regine Olsen and the Corsair affair shaped his life and writing, but biography cannot turn another person into a symbol or decode every literary figure. Later existentialism is reception, not his self-declared school.',
    ]}],
    presentation: presentation('Kierkegaard', [
      {label: 'Historical setting', value: 'Copenhagen and Danish Christendom · 1813–1855'},
      {label: 'Voices', value: 'Pseudonyms · signed works · discourses · journals · late polemics'},
      {label: 'Problems', value: 'Choice · anxiety · despair · repetition · love · faith'},
      {label: 'Reading caution', value: 'A pseudonym’s claim is not automatically Kierkegaard’s direct doctrine'},
      {label: 'Open disputes', value: 'Indirect communication · politics · hierarchy · gender · Christian existence'},
    ]),
  },
  'iris-murdoch': {
    lead: 'The photograph of Murdoch’s Oxford home places philosophy inside a life of teaching, reading, friendship, and fiction rather than illustrating a private moral essence. This exhibit treats her as a major philosopher of attention, vision, freedom, art, love, and goodness whose novels and philosophical essays test one another without becoming interchangeable.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Murdoch challenges pictures of moral agency centered on a sovereign will choosing among clearly described options. Before choice, people already see through fantasy, resentment, convention, love, and habits of attention. Moral change can therefore occur in the patient redescription of another person, including inward activity that produces no dramatic public act. Attention is a disciplined effort to see a reality independent of the ego’s consoling stories. “Unselfing” names a loosening of self-absorption, not self-erasure, passive obedience, or surrender of legitimate needs.',
      'Her Good is transcendent in the sense that it exceeds private preference and cannot be possessed, yet it is not a personal God issuing commands. Plato, Simone Weil, Freud, Christianity, art, and ordinary moral life supply resources for this secular or religiously haunted moral realism. Beauty can interrupt self-concern, but art also reveals contingency, opacity, and other people’s independence. Murdoch’s novels explore moral vision through characters and form; they are neither disguised treatises nor irrelevant to a philosopher who thought literature could resist theory’s simplifying pressure.',
      'Murdoch’s criticism of postwar existentialism and choice-centered analytic ethics restores inner life, love, and moral psychology, while raising questions about how an objective Good is known and how attention avoids paternalism. Critics also ask whether solitary vision underdescribes institutions, ideology, race, class, gender, disability, and political action that shape what can be seen. Her Platonism, moral realism, use of psychology, and relation to religion remain contested. Reading the philosophy and fiction together should preserve genre, disagreement, and the limits of detached contemplation. That tension matters.',
    ]}],
    presentation: presentation('Iris Murdoch', [
      {label: 'Historical setting', value: 'Postwar British philosophy and literature · 1919–1999'},
      {label: 'Moral psychology', value: 'Attention · fantasy · unselfing · love · freedom'},
      {label: 'The Good', value: 'Transcendent value without a straightforward personal deity'},
      {label: 'Art and literature', value: 'Distinct genres that test vision, contingency, and otherness'},
      {label: 'Open disputes', value: 'Realism · psychology · politics · gender · limits of contemplation'},
    ]),
  },
  ontology: {
    lead: 'The vessel-like interpretive image was made for this exhibit and does not decide whether reality is fundamentally substance, process, relation, event, or practice. It invites visitors to compare how different ontologies classify what there is, explain dependence, and dispute whether one inventory can govern every domain.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Ontology asks about being, existence, and the most general kinds and structures of reality. It investigates objects and properties, universals and particulars, identity through change, events and processes, modality, composition, dependence, grounding, and the status of social entities. An inventory alone is insufficient: a theory must explain its categories, relations, and criteria of commitment. Ontology and metaphysics overlap, but no universally accepted boundary separates them. Some reserve ontology for what exists and metaphysics for how it is; others treat ontology as a part, method, or contested name within metaphysics.',
      'The field has no single origin. Greek questions about being and categories, South Asian debates over substance, universals, absence, dependence, momentariness, and persons, Buddhist critiques of intrinsic nature, Chinese accounts of process and relation, and Islamic, Jewish, Christian, African, Indigenous, and other traditions arise from different languages, genres, institutions, and practical aims. Comparison can expose assumptions, but shared English words such as “substance,” “emptiness,” “being,” or “relation” do not prove direct equivalence or transmission. Responsible routes name the specific text, problem, and historical connection.',
      'Modern and contemporary ontology ranges from phenomenological inquiries into modes of being to quantificational commitment, modal realism, grounding, process ontology, social construction, and metaontology about whether disputes are substantive or framework-dependent. Social ontology studies institutions, money, race, gender, groups, disability, and collective agency without assuming that dependence on practices makes them unreal. Scientific classifications and digital systems also carry ontological commitments. The open question is not only what exists, but which distinctions explain well, whose practices stabilize them, and how revision changes knowledge and life.',
    ]}],
    presentation: presentation('Ontology', [
      {label: 'Core questions', value: 'Being · existence · categories · identity · modality · dependence'},
      {label: 'Candidate kinds', value: 'Objects · properties · events · processes · relations · social entities'},
      {label: 'Boundary caution', value: 'Ontology and metaphysics overlap without one universally accepted division'},
      {label: 'Comparative caution', value: 'Similar vocabulary can conceal different histories, aims, and arguments'},
      {label: 'Current debates', value: 'Grounding · social ontology · naturalism · pluralism · metaontology'},
    ]),
  },
  'political-philosophy': {
    lead: 'Ambrogio Lorenzetti’s civic fresco gives political order a powerful visual grammar, but no artwork supplies a neutral definition of good government. The exhibit uses it to ask who exercises power, who counts as a citizen, how institutions claim legitimacy, and what forms of exclusion or resistance the image leaves outside.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Political philosophy examines authority, legitimacy, obligation, liberty, equality, justice, law, rights, property, citizenship, democracy, power, violence, and resistance. These are distinct questions: an institution can exercise effective power without a justified right to rule, a legal order can be stable while unjust, and formal liberty can coexist with material dependence. Political argument moves among moral principles, historical interpretation, institutional design, empirical assumptions, and activist theory. Keeping those modes distinct helps visitors ask whether a claim explains, justifies, criticizes, or proposes an arrangement.',
      'The field cannot be organized responsibly as a march from a few European social-contract thinkers toward liberal democracy. Confucian, Mohist, Legalist, Islamic, Jewish, Christian, South Asian, African, Indigenous, republican, socialist, anarchist, feminist, Black, anticolonial, decolonial, disability, queer, and other traditions frame rule, obligation, land, kinship, community, sovereignty, and resistance through different histories. Comparison requires named texts and institutions rather than treating every account as an early version of the state, rights, or citizenship. Major traditions also contain internal disagreements and exclusions.',
      'Contemporary disputes concern distribution and recognition, capitalism and class, race and empire, gender and social reproduction, disability and dependency, policing and punishment, migration and borders, war, climate, technology, global justice, and the standing of noncitizens and future people. Ideal theory tests principles under simplifying assumptions; nonideal theory examines injustice, history, compliance, feasibility, and transition. Neither automatically answers the other. The field does not converge on one regime: democratic, liberal, socialist, republican, anarchist, communitarian, conservative, and radical positions disagree over both ends and agents of change. Those disagreements remain active.',
    ]}],
    presentation: presentation('Political Philosophy', [
      {label: 'Core questions', value: 'Power · authority · legitimacy · obligation · justice · resistance'},
      {label: 'Institutions', value: 'Law · property · democracy · citizenship · punishment · borders'},
      {label: 'Structures', value: 'Empire · race · gender · class · disability · global inequality'},
      {label: 'Methods', value: 'Conceptual analysis · history · activist theory · institutional design'},
      {label: 'No fixed endpoint', value: 'The field does not converge on liberal democracy or one theory of justice'},
    ]),
  },
  'philosophy-of-mind': {
    lead: 'The paired subjective–objective image is an interpretive aid, not a map proving that mind divides into an inner theater and an external brain. This exhibit instead asks how consciousness, intentionality, perception, embodiment, action, emotion, memory, selfhood, cognition, and social life constrain any account of minded beings.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Philosophy of mind contains several connected problems. Metaphysics asks what minds and mental states are and how they relate to bodies; epistemology asks how first-person knowledge, perception, memory, testimony, and knowledge of other minds work; phenomenology describes lived experience; cognitive science models mechanisms; ethics and politics ask whose mindedness, agency, testimony, and suffering receive recognition. Consciousness, intentionality, perception, action, emotion, memory, agency, personal identity, and cognition must not be bundled into one capacity. A theory may explain representation or behavioral control while leaving subjective experience open.',
      'Substance and property dualisms, behaviorism, identity theory, functionalism, representationalism, nonreductive physicalism, eliminativism, neutral monism, and emergence propose different mind–body relations. Phenomenology, enactivism, embodied cognition, and extended-mind approaches emphasize lived bodies, skills, tools, environments, and social practices. Taxonomy is only a beginning: each view must explain causal efficacy, error, unity, qualitative character, development, and evidence. Neural correlates and computational models are indispensable constraints, but correlation, prediction, or task success does not by itself settle what consciousness or understanding is.',
      'Historical routes through Aristotle, South Asian and Buddhist analyses of cognition and self, Islamic philosophy, early modern debates, phenomenology, pragmatism, analytic philosophy, psychology, and neuroscience pursue different aims. Comparison should not turn no-self, intellect, soul, or consciousness into direct equivalents. Animal and artificial systems intensify the need for caution: intelligence, language, agency, sentience, selfhood, and moral status are separate dimensions. Social power also shapes self-description, emotion, attention, disability, psychiatric classification, and who is believed. Consciousness and intentionality remain open because no framework yet commands agreement across all explanatory targets and evidence.',
    ]}],
    presentation: presentation('Philosophy of Mind', [
      {label: 'Phenomena', value: 'Consciousness · intentionality · perception · emotion · memory · self'},
      {label: 'Agency and cognition', value: 'Action · practical knowledge · reasoning · embodiment · social mind'},
      {label: 'Major families', value: 'Dualisms · physicalisms · functionalism · phenomenology · enactivism'},
      {label: 'Evidence', value: 'First-person report · behavior · neuroscience · computation · social practice'},
      {label: 'Caution', value: 'Intelligence, language, consciousness, agency, and moral status are distinct'},
    ]),
  },
  'philosophy-of-science': {
    lead: 'Joseph Wright’s air-pump scene makes experiment look like a single dramatic revelation, yet the event depends on an instrument, demonstrator, witnesses, learned expectations, and unequal access. The exhibit begins there to replace the myth of one universal scientific method with an inquiry into evidence, models, institutions, and criticism.',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Philosophy of science examines explanation, confirmation, induction, causation, laws, models, measurement, experimentation, observation, realism, reduction, emergence, and scientific change. These problems cross but do not collapse. A model can explain through idealization without being a literal miniature; an instrument can extend observation while requiring calibration and background theory; evidence can confirm one claim more than another without eliminating uncertainty. Realists and instrumentalists disagree about what success warrants, while pluralists ask whether different sciences need different explanatory forms.',
      'Science is organized work as well as reasoning. Laboratories, field sites, classifications, standards, journals, peer criticism, replication, funding, patents, states, firms, and public institutions shape which questions can be asked and which results travel. Community standards can make inquiry more objective by exposing claims to diverse criticism, but communities can also reproduce exclusion, secrecy, hierarchy, and conflicts of interest. Expertise is therefore neither infallible authority nor merely one opinion. Public trust depends on warranted competence, transparent limits, accountable institutions, and the capacity to correct error.',
      'Historical, feminist, social, and decolonial philosophies of science are not external attacks on otherwise pure method. They examine how values enter problem choice, measurement, classification, risk, and application; how colonial collection and extraction built fields; and how situated knowers can reveal neglected evidence. These critiques do not imply that evidence is arbitrary or every claim political in the same way. Popper, Kuhn, and their debate form one route among many, not the whole field. Responsible philosophy asks which values and institutions improve inquiry, how disagreement should be managed, and when scientific success supports realism, reduction, or humility.',
    ]}],
    presentation: presentation('Philosophy of Science', [
      {label: 'Reasoning', value: 'Explanation · confirmation · induction · causation · laws'},
      {label: 'Practice', value: 'Models · measurement · instruments · experiment · observation'},
      {label: 'Change', value: 'Realism · reduction · emergence · revolutions · pluralism'},
      {label: 'Institutions', value: 'Funding · standards · expertise · criticism · public trust'},
      {label: 'Critical routes', value: 'Historical · feminist · social · decolonial philosophies of science'},
    ]),
  },
};
