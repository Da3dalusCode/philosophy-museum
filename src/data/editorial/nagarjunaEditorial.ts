import type {ArticleSection, CitationLocatorKind, EditorialSource, Philosopher} from '../../types/philosophy';
import {citation as rawCitation, paragraph as p, structuredClaim as claim} from './pilotHelpers';

const verifiedLocatorReplacements: Record<string, readonly [string, string][]> = {
  'nag-sep': [
    ['2. Svabhāva', '2. Emptiness and svabhāva'],
    ['3. The arguments against svabhāva', '3. Arguments against svabhāva'],
    ['4. Emptiness', '2. Emptiness and svabhāva; 3.5 Language and truth'],
    ['5. The nature of Madhyamaka', '3.4 Knowledge; 3.5 Language and truth; 4. Conclusion'],
    ['6. Influence', '4. Conclusion'],
    ['3–5', '3–4'],
    ['2–5', '2–4'],
    ['2–6', '2–4'],
    ['5–6', '4. Conclusion'],
    ['4–5', '4. Conclusion'],
  ],
  'nag-iep': [
    ['2. Sunyata and Svabhava', '2. Nagarjuna’s Skeptical Method and its Targets; 3. Against Worldly and Ultimate Substantialism'],
    ['3. The Perfection of Wisdom', '3. Against Worldly and Ultimate Substantialism; 5. The New Buddhist Space and Mission'],
    ['4. The Limits of Thought', '4. Against Proof'],
  ],
  'nag-madhyamaka-iep': [
    ['1. The Abhidharma Context', '1. Nāgārjuna and the Paradoxical “Perfection of Wisdom” Literature; 2.a. The “Two Truths” in Buddhist Abhidharma'],
    ['2. Nāgārjuna and the Middle Way', '2. The Basic Philosophical Impulse'],
    ['3. Two Truths', '2.a–2.c. The Basic Philosophical Impulse; 3. The Question of Self-contradiction'],
    ['4. Later Developments', '4–7. Historical Development and Reception'],
  ],
  'nag-two-truths-sep': [
    ['3. The Two Truths in Madhyamaka', '4. Madhyamaka'],
    ['3–4', '4. Madhyamaka'],
  ],
};

const c = (sourceId: string, kind?: CitationLocatorKind, value?: string, note?: string) => {
  const verifiedValue = value === undefined
    ? undefined
    : (verifiedLocatorReplacements[sourceId] ?? []).reduce(
      (current, [obsolete, verified]) => current.replaceAll(obsolete, verified),
      value,
    ).split('; ').filter((part, index, parts) => parts.indexOf(part) === index).join('; ');
  return rawCitation(sourceId, kind, verifiedValue, note);
};

const sources: EditorialSource[] = [
  {
    id: 'nag-sep',
    type: 'scholarly-reference',
    authors: ['Jan Christoph Westerhoff'],
    title: 'Nāgārjuna',
    containerTitle: 'The Stanford Encyclopedia of Philosophy',
    editors: ['Edward N. Zalta', 'Uri Nodelman'],
    publisher: 'Metaphysics Research Lab, Stanford University',
    edition: 'Summer 2026',
    year: 2026,
    url: 'https://plato.stanford.edu/archives/sum2026/entries/nagarjuna/',
    accessedOn: '2026-07-31',
    note: 'Specialist overview used for biography, attribution, arguments, interpretive disputes, and reception. Its systematic reconstruction is identified as an interpretation rather than consensus.',
  },
  {
    id: 'nag-iep',
    type: 'scholarly-reference',
    authors: ['Douglas Berger'],
    title: 'Nagarjuna',
    containerTitle: 'Internet Encyclopedia of Philosophy',
    publisher: 'University of Tennessee at Martin',
    url: 'https://iep.utm.edu/nagarjun/',
    accessedOn: '2026-07-31',
    note: 'Independent overview used selectively for philosophical orientation and comparison; its stronger biographical and sectarian formulations are not treated as settled.',
  },
  {
    id: 'nag-madhyamaka-iep',
    type: 'scholarly-reference',
    authors: ['Dan Arnold'],
    title: 'Madhyamaka Buddhist Philosophy',
    containerTitle: 'Internet Encyclopedia of Philosophy',
    publisher: 'University of Tennessee at Martin',
    url: 'https://iep.utm.edu/madhyamaka-buddhist-philosophy/',
    accessedOn: '2026-07-31',
    note: 'Specialist tradition-level account used for Abhidharma context, two truths, and Indian, Tibetan, and East Asian developments.',
  },
  {
    id: 'nag-middle-way-translation',
    type: 'primary-text',
    authors: ['Nāgārjuna'],
    title: 'Nāgārjuna’s Middle Way: Mūlamadhyamakakārikā',
    translator: 'Mark Siderits and Shōryū Katsura',
    publisher: 'Wisdom Publications',
    year: 2013,
    isbn: '9781614290506',
    url: 'https://wisdomexperience.org/wp-content/uploads/2018/07/Three-Turnings-Lesson-6-Reading.pdf',
    accessedOn: '2026-07-31',
    note: 'Recognized translation; the accessible publisher excerpt was checked for chapters 1 and 24. Primary-text citations on this page use chapter 1; specialist sources support discussion beyond the excerpted verses.',
  },
  {
    id: 'nag-two-truths-sep',
    type: 'scholarly-reference',
    authors: ['Sonam Thakchoe'],
    title: 'The Theory of Two Truths in India',
    containerTitle: 'The Stanford Encyclopedia of Philosophy',
    editors: ['Edward N. Zalta'],
    publisher: 'Metaphysics Research Lab, Stanford University',
    edition: 'Fall 2022',
    year: 2022,
    url: 'https://plato.stanford.edu/archives/fall2022/entries/twotruths-india/',
    accessedOn: '2026-07-31',
    note: 'Specialist account used for the two-truths verses and divergent later interpretations.',
  },
  {
    id: 'nag-sep-madhyamaka',
    type: 'scholarly-reference',
    authors: ['Richard Hayes'],
    title: 'Madhyamaka',
    containerTitle: 'The Stanford Encyclopedia of Philosophy',
    publisher: 'Metaphysics Research Lab, Stanford University',
    url: 'https://plato.stanford.edu/entries/madhyamaka/',
    accessedOn: '2026-07-31',
    note: 'Tradition-level orientation retained as further reading and not counted as evidence for reviewed claims.',
  },
];

const articleSections: ArticleSection[] = [
  {
    id: 'orientation',
    title: 'A philosopher behind layers of tradition',
    paragraphs: [
      p('nag-orientation-1', 'Nāgārjuna is among the most influential Buddhist philosophers, yet very little about his life can be established with confidence. Modern scholarship commonly places him around 150–250 CE and often associates him with southern India, but traditional biographies add journeys, royal relationships, supernatural episodes, long life spans, and encounters that cannot be combined into ordinary modern biography. This page uses the conventional chronology as a broad orientation and distinguishes historical probability from later religious memory.', [c('nag-sep', 'section', '1. Life and works'), c('nag-iep', 'section', '1. Life, Legend, and Works')]),
      p('nag-orientation-2', 'The name Nāgārjuna is also attached to works from different intellectual settings, including Buddhist philosophy, tantra, medicine, and alchemy. Scholars have therefore proposed more than one author with that name. The Mūlamadhyamakakārikā, or Root Verses on the Middle Way, is the central and least disputed philosophical attribution. Other works are accepted with varying confidence. A review must treat attribution work by work instead of converting a traditional collected corpus into a single secure bibliography.', [c('nag-sep', 'section', '1. Life and works'), c('nag-iep', 'section', '1. Life, Legend, and Works')]),
    ],
  },
  {
    id: 'historical-setting',
    title: 'Buddhist debate in ancient India',
    paragraphs: [
      p('nag-setting-1', 'Nāgārjuna wrote within a many-sided Indian Buddhist environment shaped by early discourses, Abhidharma analysis, developing Mahāyāna literature, monastic institutions, and debate with Buddhist and non-Buddhist interlocutors. Madhyamaka sources challenge the idea that analysis discovers ultimately self-established building blocks. The target is not “all earlier Buddhism” as one position: Abhidharma traditions differed, and modern labels can conceal disputes inside them.', [c('nag-madhyamaka-iep', 'section', '1. The Abhidharma Context'), c('nag-sep', 'section', '2. Svabhāva')]),
      p('nag-setting-2', 'Later tradition closely connects Nāgārjuna with Mahāyāna and especially Prajñāpāramitā, or Perfection of Wisdom, literature. That association is philosophically illuminating but does not supply a simple documentary biography of how particular sūtras reached him. His arguments belong to Buddhist soteriology: they are intended to loosen cognitive and affective attachment, not merely to construct an abstract metaphysical theory. Even so, scholars disagree about whether his procedure is best described as a view, an anti-theory, a semantic analysis, a therapeutic dialectic, or another philosophical project.', [c('nag-sep', 'section', '1–2'), c('nag-madhyamaka-iep', 'section', '2. Nāgārjuna and the Middle Way')]),
    ],
    relatedBranchIds: ['buddhist-philosophy', 'indian-philosophy'],
  },
  {
    id: 'works-attribution',
    title: 'Works and attribution cautions',
    paragraphs: [
      p('nag-works-1', 'The Mūlamadhyamakakārikā organizes short, compressed verses into chapters that examine conditions, motion, perception, causation, the self, time, nirvāṇa, views, and other contested categories. Its brevity and argumentative density made commentary indispensable. Later readers encounter Nāgārjuna through Sanskrit witnesses, Tibetan and Chinese translations, Indian commentaries, and modern editions. Differences among textual traditions and translations can affect philosophical vocabulary, so an English wording should always be tied to a named translation.', [c('nag-middle-way-translation', 'chapter', '1. An Analysis of Conditions'), c('nag-sep', 'section', '1. Life and works')]),
      p('nag-works-2', 'The Vigrahavyāvartanī and Yuktiṣaṣṭikā are often included among philosophically important works attributed to Nāgārjuna, while Ratnāvalī, Śūnyatāsaptati, Vaidalyaprakaraṇa, and others receive different assessments. The attribution problem is not a reason to ignore the wider corpus; it is a reason to state degrees of confidence. This pilot treats the Mūlamadhyamakakārikā as central and uses other attributions only with qualification rather than building a life story or a doctrinal chronology from uncertain titles.', [c('nag-sep', 'section', '1. Life and works'), c('nag-iep', 'section', '1. Life, Legend, and Works')]),
    ],
    relatedWorkTitles: ['Mūlamadhyamakakārikā', 'Vigrahavyāvartanī', 'Yuktiṣaṣṭikā'],
  },
  {
    id: 'svabhava',
    title: 'What emptiness denies',
    paragraphs: [
      p('nag-svabhava-1', 'Emptiness translates śūnyatā. In Nāgārjuna’s central arguments it is closely connected to the denial of svabhāva, a term whose translation and target are contested. Depending on context, translators use expressions such as intrinsic nature, own-being, or self-existence. The common thread is resistance to something’s being established through an independent, invariant nature that explains it from its own side. Because the technical target matters, “nothing exists” is not an adequate substitute.', [c('nag-sep', 'section', '2. Svabhāva'), c('nag-madhyamaka-iep', 'section', '2. Nāgārjuna and the Middle Way')]),
      p('nag-svabhava-2', 'To call a thing empty is not to say that it never appears, has no effects, or cannot be discussed. It is to deny the kind of independent foundation under examination. Persons, causes, motion, concepts, and nirvāṇa function through relations, conditions, practices, and designation rather than through isolated essence. Interpretations differ over how positive an account follows: some emphasize a conventional ontology, some a semantic or conceptual point, and some a dialectical refusal to replace rejected foundations with another ultimate thesis.', [c('nag-sep', 'section', '2–3'), c('nag-iep', 'section', '2. Sunyata and Svabhava')]),
    ],
    relatedBranchIds: ['metaphysics'],
  },
  {
    id: 'dependent-arising',
    title: 'Dependent arising and conditions',
    paragraphs: [
      p('nag-dependent-1', 'Dependent arising is the Buddhist principle that phenomena occur in dependence on causes and conditions. Madhyamaka arguments connect that dependence with emptiness: what depends cannot possess the independent nature being criticized. This connection is not the claim that dependence is a hidden substance underneath things. It redirects explanation from self-grounded entities toward networks of conditions while also examining how the terms “cause,” “effect,” and “condition” are themselves conceptually dependent.', [c('nag-sep', 'section', '3. The arguments against svabhāva'), c('nag-madhyamaka-iep', 'section', '2–3')]),
      p('nag-dependent-2', 'Chapter 1 of the Mūlamadhyamakakārikā examines proposed ways an effect might arise and tests the intelligibility of causal conditions. The verses do not merely announce that ordinary causation is unreal; they press theories that try to give cause and effect fixed intrinsic identities. Modern interpreters reconstruct the argument differently, and the publisher preview used here covers this chapter only. The pilot therefore cites it for the conditions analysis but does not pretend that the accessible preview verified wording in later chapters.', [c('nag-middle-way-translation', 'verse', 'MMK 1:1–14'), c('nag-sep', 'section', '3.1 Causation')]),
    ],
  },
  {
    id: 'two-truths',
    title: 'Conventional and ultimate truth',
    paragraphs: [
      p('nag-truths-1', 'The Mūlamadhyamakakārikā’s chapter 24 distinguishes conventional truth from truth in the ultimate sense and says that understanding the Buddha’s teaching depends on the distinction. Conventional truth is not simply a set of lies, nor is ultimate truth a second world of intrinsically real objects. Conventional practices, language, and causal explanations make teaching and action possible; ultimate analysis does not discover the independent nature that reifying thought expects.', [c('nag-two-truths-sep', 'section', '3. The Two Truths in Madhyamaka'), c('nag-madhyamaka-iep', 'section', '3. Two Truths')]),
      p('nag-truths-2', 'Later Indian, Tibetan, and East Asian traditions developed substantially different accounts of the two truths. Some readings treat the distinction as two perspectives on the same dependently arisen phenomena; others give more elaborate accounts of conventional validity, ultimate realization, or pedagogical stages. Terms such as Svātantrika and Prāsaṅgika belong to later doxographical histories and should not be presented as two positions explicitly established by Nāgārjuna himself.', [c('nag-two-truths-sep', 'section', '3–4'), c('nag-madhyamaka-iep', 'section', '4. Later Developments')]),
    ],
  },
  {
    id: 'nihilism',
    title: 'Why emptiness is not nihilism',
    paragraphs: [
      p('nag-nihilism-1', 'A recurring objection says that if everything is empty, then causation, ethical action, Buddhist teaching, and liberation collapse. Madhyamaka replies that this reverses the relation: phenomena can arise, change, and matter precisely because they are not fixed by independent natures. A world of immutable self-established things would make transformation difficult to explain. The reply does not make emptiness into a causal force; it shows why the denial of intrinsic nature need not deny conventional functioning.', [c('nag-sep', 'section', '4. Emptiness'), c('nag-madhyamaka-iep', 'section', '3. Two Truths')]),
      p('nag-nihilism-2', 'Nāgārjuna also warns that emptiness can be badly grasped. Treating “everything is empty” as a final metaphysical substance or a slogan that cancels ethical distinctions repeats the reifying move under a new name. Madhyamaka’s middle way refuses both fixed existence and sheer nonexistence as exhaustive options. Modern labels such as nihilism, anti-realism, skepticism, fictionalism, quietism, or conventionalism can illuminate parts of the debate, but none should be used without explaining the reconstruction and its limits.', [c('nag-sep', 'section', '4–5'), c('nag-iep', 'section', '3. The Perfection of Wisdom')]),
    ],
  },
  {
    id: 'method',
    title: 'Dialectic, consequence, and disputed commitments',
    paragraphs: [
      p('nag-method-1', 'Many Madhyamaka arguments test the consequences of an opponent’s assumptions rather than begin from an independent theory of ultimate entities. Later interpreters associated this strategy with reductio-style consequence, or prasaṅga. Debate persists over whether Nāgārjuna offers no philosophical theses, only no ultimate theses, or a positive account of conventional dependence and semantic practice. The difference matters: “he believed nothing” is not a neutral summary of an argument about levels of commitment.', [c('nag-sep', 'section', '5. The nature of Madhyamaka'), c('nag-madhyamaka-iep', 'section', '2–4')]),
      p('nag-method-2', 'The Vigrahavyāvartanī tradition sharpens a reflexive challenge: if all things are empty, what status do Madhyamaka arguments and means of knowledge have? Interpretations reconstruct the response as showing that reasoning need not possess the intrinsic foundation it criticizes; it can operate dependently within shared practices. That answer remains philosophically disputed. This page therefore attributes reconstructions and avoids presenting one contemporary analytic vocabulary as the uncontested meaning of the Sanskrit arguments.', [c('nag-sep', 'section', '5. The nature of Madhyamaka'), c('nag-iep', 'section', '4. The Limits of Thought')]),
    ],
  },
  {
    id: 'reception',
    title: 'Many Madhyamaka traditions',
    paragraphs: [
      p('nag-reception-1', 'Nāgārjuna’s works became foundational for Madhyamaka in India and for later Tibetan traditions, but reception was not a single line. Indian commentators including Buddhapālita, Bhāviveka, and Candrakīrti developed different argumentative and interpretive strategies. Tibetan scholastic systems classified and debated those inheritances in distinct ways. Calling one later framework “Nāgārjuna’s own complete system” erases the history by which the framework was produced.', [c('nag-madhyamaka-iep', 'section', '4. Later Developments'), c('nag-sep', 'section', '6. Influence')]),
      p('nag-reception-2', 'Chinese translations and commentaries shaped Sanlun, and Madhyamaka materials entered wider East Asian Buddhist debates in conversation with local textual and doctrinal histories. These receptions cannot be reduced to imperfect copies of an Indian original, nor can “Asian philosophy” be treated as a single cultural block. Modern comparative philosophy, religious studies, and analytic reconstruction have opened further conversations about dependence, grounding, language, and realism while also introducing categories that require explicit methodological caution.', [c('nag-madhyamaka-iep', 'section', '4. Later Developments'), c('nag-sep', 'section', '6. Influence')]),
    ],
    relatedBranchIds: ['buddhist-philosophy', 'indian-philosophy', 'metaphysics'],
  },
  {
    id: 'argument-forms',
    title: 'How the arguments unsettle fixed alternatives',
    paragraphs: [
      p('nag-arguments-1', 'Nāgārjuna repeatedly examines a category by laying out the ways it might be established and showing difficulties for each. A familiar pattern considers whether something arises from itself, from something other, from both, or without a cause. Such four-cornered analyses are sometimes called tetralemmas, but the label alone does not explain their force. Each alternative must be read with the assumptions it tests. The conclusion is not automatically a fifth theory hidden outside the list; it may be that the demand for intrinsically fixed relata made every offered alternative unstable.', [c('nag-middle-way-translation', 'verse', 'MMK 1:1'), c('nag-sep', 'section', '3. The arguments against svabhāva; 3.1 Causation'), c('nag-madhyamaka-iep', 'section', '2. Nāgārjuna and the Middle Way')]),
      p('nag-arguments-2', 'This strategy appears across analyses of motion, time, parts and wholes, agents and actions, and other apparently ordinary categories. The arguments do not require refusing ordinary sentences such as “the traveler moves” or “the event occurred earlier.” They question whether analysis can isolate a mover, motion, and path as independently established components whose identities require no relations. A Madhyamaka critique can therefore preserve practical discourse while resisting the metaphysical picture smuggled into one explanation of that discourse. Whether this is best described as metaphysics, semantics, or therapy remains disputed.', [c('nag-sep', 'section', '3. The arguments against svabhāva'), c('nag-iep', 'section', '2. Sunyata and Svabhava; 4. The Limits of Thought')]),
    ],
    relatedBranchIds: ['logic', 'metaphysics'],
  },
  {
    id: 'self-person',
    title: 'Persons, aggregates, and reduction',
    paragraphs: [
      p('nag-self-1', 'Buddhist debates about persons often begin from the five aggregates and the denial of a permanent, independent self. Nāgārjuna’s analysis presses further against treating either a person or the aggregates as possessing intrinsic nature. If the person were simply identical with the aggregates, important relations among possessor and possessed would collapse; if wholly different, the connection would become mysterious. Other alternatives concerning dependence, possession, and composition face related problems. The dialectic targets a self-established bearer, not the conventional person who suffers, acts, remembers, and enters relationships.', [c('nag-sep', 'section', '3. The arguments against svabhāva'), c('nag-madhyamaka-iep', 'section', '1. The Abhidharma Context; 2. Nāgārjuna and the Middle Way')]),
      p('nag-self-2', 'This matters for responsibility and compassion. If emptiness meant that there are literally no persons in any useful sense, Buddhist teaching about suffering and liberation would lose its audience. Madhyamaka instead analyzes personal identity as dependently designated through bodily, psychological, causal, social, and linguistic continuities. Different interpreters disagree over how reductive that account is and how it relates to other Buddhist models. A beginner should avoid turning “no-self” into either “you do not exist” or “the everyday ego exists unchanged but is spiritually unimportant.” Both formulations bypass the level distinction under debate.', [c('nag-sep', 'section', '3–4'), c('nag-madhyamaka-iep', 'section', '2–3'), c('nag-two-truths-sep', 'section', '3. The Two Truths in Madhyamaka')]),
    ],
    relatedBranchIds: ['buddhist-philosophy', 'philosophy-of-mind'],
  },
  {
    id: 'language-designation',
    title: 'Language, dependence, and designation',
    paragraphs: [
      p('nag-language-1', 'Madhyamaka discussions often speak of phenomena as dependently designated. A thing is identified through concepts, conventions, contrasts, purposes, and relations rather than encountered with a self-announcing essence. This does not mean an individual speaker can make any claim true by naming it. Conventions are constrained by causal interaction, shared practices, successful and failed action, and Buddhist ethical and soteriological purposes. The difficult question is how such constraints work without being grounded in the intrinsic natures that the analysis rejects, and later traditions answer it differently.', [c('nag-sep', 'section', '4. Emptiness; 5. The nature of Madhyamaka'), c('nag-two-truths-sep', 'section', '3–4'), c('nag-madhyamaka-iep', 'section', '3. Two Truths')]),
      p('nag-language-2', 'Conceptual dependence also makes philosophical language reflexive. If “emptiness” named an ultimate object immune to the analysis applied elsewhere, it would become another candidate for svabhāva. Madhyamaka authors therefore emphasize the emptiness of emptiness: the concept performs critical work but is not a final substance behind appearances. That formula can itself become a slogan, so its argumentative setting matters. It asks readers to release attachment to a corrective concept after it has exposed reification, not to abandon careful distinctions or declare every interpretation equivalent.', [c('nag-sep', 'section', '4. Emptiness; 5. The nature of Madhyamaka'), c('nag-iep', 'section', '3. The Perfection of Wisdom; 4. The Limits of Thought')]),
    ],
    relatedBranchIds: ['philosophy-of-language', 'epistemology'],
  },
  {
    id: 'samsara-nirvana',
    title: 'Saṃsāra, nirvāṇa, and the middle way',
    paragraphs: [
      p('nag-nirvana-1', 'Nāgārjuna’s treatment of nirvāṇa resists imagining liberation as an intrinsically existing realm placed beyond an intrinsically existing saṃsāra. If both are empty, the difference cannot be the distance between two self-contained worlds. This does not erase the practical distinction between bondage and liberation. It changes how that distinction is understood: ignorance and grasping organize experience one way, while insight into dependent arising transforms attachment. The famous proximity of saṃsāra and nirvāṇa is therefore not permission to romanticize suffering or claim that practice makes no difference.', [c('nag-sep', 'section', '4. Emptiness'), c('nag-madhyamaka-iep', 'section', '2–3'), c('nag-two-truths-sep', 'section', '3. The Two Truths in Madhyamaka')]),
      p('nag-nirvana-2', 'The “middle” in Madhyamaka is likewise not a compromise that assigns half the truth to eternal existence and half to annihilation. It avoids reifying either pole. Fixed existence cannot accommodate dependence and change; sheer nonexistence cannot account for appearance, causal efficacy, teaching, or liberation. The middle way works through dependent arising and the two truths rather than through a moderate quantity of being. Translating it as everyday balance may be pedagogically tempting, but it hides the precise ontological and soteriological alternatives the arguments address.', [c('nag-sep', 'section', '2. Svabhāva; 4. Emptiness'), c('nag-madhyamaka-iep', 'section', '2. Nāgārjuna and the Middle Way; 3. Two Truths')]),
    ],
    relatedBranchIds: ['buddhist-philosophy'],
  },
  {
    id: 'practice-ethics',
    title: 'Soteriological purpose and ethical consequence',
    paragraphs: [
      p('nag-practice-1', 'The Root Verses are highly technical, but their Buddhist purpose connects analysis with the cessation of suffering. Reification is not only an abstract error: taking persons, possessions, injuries, views, and identities as self-established can intensify attachment and aversion. Insight into dependence can loosen that grip. This does not turn logic into an instant meditation technique, nor does it prove that every reader who accepts an argument is liberated. It locates philosophical reasoning within a larger discipline of understanding, conduct, and transformation whose precise historical forms varied.', [c('nag-sep', 'section', '1–2; 4. Emptiness'), c('nag-madhyamaka-iep', 'section', '2. Nāgārjuna and the Middle Way')]),
      p('nag-practice-2', 'Emptiness is compatible with ethical distinctions because action and consequence operate conventionally. Indeed, denying fixed essences can help explain moral change: harmful habits are conditioned and can be altered, while no person is reducible to an immutable moral identity. Yet this inference must not be inflated into the claim that Nāgārjuna supplied a complete modern social ethic. Texts attributed to him beyond the Root Verses discuss practical and political counsel with varying attribution confidence. The reviewed claim is narrower: Madhyamaka’s conventional domain leaves room for reasons, consequences, compassion, and disciplined practice.', [c('nag-sep', 'section', '1. Life and works; 4. Emptiness'), c('nag-two-truths-sep', 'section', '3. The Two Truths in Madhyamaka'), c('nag-iep', 'section', '3. The Perfection of Wisdom')]),
    ],
    relatedBranchIds: ['ethics', 'buddhist-philosophy'],
  },
  {
    id: 'objections',
    title: 'Objections about self-refutation and explanation',
    paragraphs: [
      p('nag-objections-1', 'An opponent can ask whether the denial of intrinsic nature defeats itself. If the claim “all things are empty” is intrinsically true, it appears to violate its content; if it is empty, why accept it? Madhyamaka responses distinguish lacking intrinsic foundation from lacking every conventional warrant. An argument may depend on language, shared inferential practices, and an opponent’s commitments while still exposing a contradiction in a theory of self-established things. Whether that response is sufficient depends on a broader account of conventional truth, which is why the dispute continues rather than ending in a one-line paradox.', [c('nag-sep', 'section', '5. The nature of Madhyamaka'), c('nag-iep', 'section', '4. The Limits of Thought'), c('nag-two-truths-sep', 'section', '3–4')]),
      p('nag-objections-2', 'A second objection asks whether dependence explains anything if every condition is itself dependent. Foundationalists may see an endless regress or circularity where Madhyamaka sees the failure of a demand for an unconditioned explanatory terminus. This disagreement reaches beyond a list of entities to competing pictures of explanation. Some modern interpreters connect Nāgārjuna with anti-foundationalism or relational ontology; others warn that these labels import contemporary projects. The comparison becomes useful only when it identifies the argument being compared and the historical differences it cannot erase.', [c('nag-sep', 'section', '3–5'), c('nag-madhyamaka-iep', 'section', '2–4')]),
    ],
    relatedBranchIds: ['epistemology', 'metaphysics'],
  },
  {
    id: 'translation-comparison',
    title: 'Translation and comparative interpretation',
    paragraphs: [
      p('nag-translation-1', 'Key Sanskrit terms arrive in English already interpreted. Svabhāva may be rendered as intrinsic nature, own-being, inherent existence, or self-nature; prasaṅga may be described as consequence or reductio; saṃvṛti in “conventional truth” carries debates that the English adjective cannot settle. A translator chooses syntax and philosophical vocabulary while working from textual witnesses and commentaries. Readers should therefore cite a named translation, compare important terms, and avoid building an argument from a memorable English sentence detached from its chapter and interpretive apparatus.', [c('nag-middle-way-translation', 'chapter', '1. An Analysis of Conditions'), c('nag-sep', 'section', '2–5'), c('nag-two-truths-sep', 'section', '3–4')]),
      p('nag-translation-2', 'Comparisons with skepticism, Kant, Wittgenstein, Derrida, process philosophy, or contemporary metaphysics can illuminate questions about foundations, language, and dependence. They can also make Nāgārjuna look like an early version of whichever modern thinker is favored. Good comparison proceeds in two directions: it states a limited structural resemblance and then names differences in texts, aims, argumentative settings, and soteriology. It neither isolates Buddhist philosophy from cross-cultural inquiry nor treats historical distance as an obstacle that analogy can simply dissolve.', [c('nag-sep', 'section', '5–6'), c('nag-iep', 'section', '4–5'), c('nag-madhyamaka-iep', 'section', '4. Later Developments')]),
    ],
  },
  {
    id: 'explanation-knowledge',
    title: 'Explanation, change, and reliable reasoning',
    paragraphs: [
      p('nag-explanation-1', 'Causal analysis illustrates why Madhyamaka is not satisfied by attaching the word “dependent” to an otherwise unchanged metaphysics. If cause and effect have fixed identities before their relation, it becomes difficult to explain what productive work the relation performs; if the effect is wholly absent, production appears to connect unrelated terms; if already present in the cause, production risks redundancy. Indian theories formulated these alternatives with greater precision than this sketch. Nāgārjuna’s verses intervene in that debate by testing whether intrinsically established cause, effect, and condition can jointly make sense.', [c('nag-middle-way-translation', 'verse', 'MMK 1:1–14'), c('nag-sep', 'section', '3.1 Causation'), c('nag-madhyamaka-iep', 'section', '1–2')]),
      p('nag-explanation-2', 'The same pressure applies to change. A thing with an invariant own-nature could not genuinely become otherwise without ceasing to be what its definition fixes; yet a sequence with no conventionally identifiable continuities would not support intelligible transformation. Emptiness permits conditioned stability without absolute identity: patterns endure because supporting conditions continue and alter when those conditions change. This interpretation helps explain the frequent contemporary comparison with process or relational views, but it remains a reconstruction. The texts proceed through particular analyses rather than announcing one general process ontology.', [c('nag-sep', 'section', '2. Svabhāva; 3. The arguments against svabhāva'), c('nag-iep', 'section', '2. Sunyata and Svabhava')]),
      p('nag-explanation-3', 'Indian critics also challenged Madhyamaka through theories of reliable cognition. If perception and inference lack intrinsic nature, can they establish the conclusion that things are empty? The reply associated with Nāgārjuna’s dialectical strategy is not that evidence becomes irrelevant. Means of knowledge, objects known, and successful cognition function in dependence on one another and on practices of correction; none must be self-certifying from its own side. Later Buddhist epistemologists and Madhyamaka commentators developed different relations between conventional warrant and ultimate analysis, so no single settlement should be projected backward.', [c('nag-sep', 'section', '5. The nature of Madhyamaka'), c('nag-iep', 'section', '4. The Limits of Thought'), c('nag-madhyamaka-iep', 'section', '3–4')]),
      p('nag-explanation-4', 'This issue clarifies why “everything is relative” is a poor paraphrase. Relativity to causes, concepts, or practices does not make every judgment equally successful. Some conventional claims guide action, survive criticism, and reduce suffering better than alternatives. Madhyamaka denies that their success requires an intrinsic metaphysical seal; it does not deny contrast among a working medicine and a poison, a valid inference and a contradiction, or compassionate and harmful conduct. The difficult philosophical task is to account for those contrasts without quietly restoring the independent foundations that the analysis rejected.', [c('nag-two-truths-sep', 'section', '3–4'), c('nag-sep', 'section', '4–5'), c('nag-madhyamaka-iep', 'section', '3. Two Truths')]),
    ],
    relatedBranchIds: ['epistemology', 'philosophy-of-science', 'metaphysics'],
  },
  {
    id: 'reading',
    title: 'A careful reading path',
    paragraphs: [
      p('nag-reading-1', 'Begin with a specialist overview of the biography and attribution problem before treating the traditional corpus as one author’s secure output. Then read a named translation of the Mūlamadhyamakakārikā, keeping its chapter structure and commentary visible. Chapter 1 offers a demanding entry into conditions and causation; chapter 24 is central for the relation among emptiness, dependent arising, conventional practice, and the two truths. Do not mix memorable English lines from different translations without attribution.', [c('nag-sep', 'section', '1–4'), c('nag-middle-way-translation', 'chapter', '1. An Analysis of Conditions'), c('nag-two-truths-sep', 'section', '3. The Two Truths in Madhyamaka')]),
      p('nag-reading-2', 'Next compare at least two scholarly reconstructions and a tradition-level history. Ask what each author takes svabhāva to mean, whether Madhyamaka has theses, how conventional truth is validated, and which later commentary informs the reading. That comparison makes philosophical disagreement productive instead of hiding it. A beginner need not decide immediately whether Nāgārjuna is best described as an anti-foundationalist, semantic analyst, skeptic, mystic, or metaphysician; each label carries an argument that must be earned.', [c('nag-sep', 'section', '2–6'), c('nag-iep', 'section', '2–5'), c('nag-madhyamaka-iep', 'section', '1–4')]),
    ],
    relatedWorkTitles: ['Mūlamadhyamakakārikā'],
  },
];

export const applyNagarjunaEditorial = (record: Philosopher): Philosopher => {
  if (record.id !== 'nagarjuna') return record;
  return {
    ...record,
    name: 'Nāgārjuna',
    lifespan: 'c. 150–250 CE; chronology uncertain',
    birthYear: 150,
    deathYear: 250,
    region: 'South Asia, probably southern India',
    tradition: 'Buddhist / Madhyamaka',
    primaryBranchIds: ['buddhist-philosophy', 'indian-philosophy'],
    secondaryBranchIds: ['metaphysics'],
    mainIdeas: ['Emptiness', 'Dependent arising', 'Critique of svabhāva', 'Two truths', 'Middle way'],
    keyWorks: ['Mūlamadhyamakakārikā', 'Vigrahavyāvartanī (commonly attributed)', 'Yuktiṣaṣṭikā (commonly attributed)'],
    lifeStory: 'Nāgārjuna was an influential Buddhist philosopher whose historical biography is sparse and overlaid by multiple traditional lives. Modern scholarship commonly places him around 150–250 CE, probably in southern India.',
    contributionSummary: 'Developed Madhyamaka arguments that connect dependent arising with the emptiness of intrinsic nature while resisting both reified existence and nihilistic nonexistence.',
    beginnerExplanation: 'Nāgārjuna asks whether anything could exist through a completely independent nature. His arguments show how things work through conditions, relations, concepts, and practices without turning emptiness into another hidden substance.',
    influencedByIds: ['buddha'],
    influencedIds: [],
    disagreementIds: [],
    suggestedFirstReading: 'Mūlamadhyamakakārikā, chapter 1 in a named modern translation',
    historicalContext: 'Indian Buddhist debate shaped by early discourses, Abhidharma analysis, developing Mahāyāna literature, monastic scholarship, and arguments with Buddhist and non-Buddhist interlocutors.',
    dateDisplay: 'c. 150–250 CE; chronology uncertain',
    dateConfidence: 'low',
    dateNote: 'Very little secure biographical evidence survives. The displayed range is a common scholarly orientation, while traditional lives include material that cannot be treated as documentary chronology.',
    shortBio: 'An early Madhyamaka philosopher known primarily through a contested corpus and later traditions, Nāgārjuna is securely associated with the Mūlamadhyamakakārikā but not with every work transmitted under his name.',
    extendedBio: ['Traditional biographies preserve religious memory and claims about Nāgārjuna’s significance, but they cannot be combined into a modern documentary life.', 'His arguments became foundational across multiple Indian, Tibetan, Chinese, and wider East Asian Madhyamaka receptions that disagree about method and meaning.'],
    centralQuestions: ['How can dependently arisen phenomena function without possessing an independent intrinsic nature?', 'How do conventional and ultimate truth relate?', 'Can a critique of foundations avoid collapsing into nihilism or becoming another foundation?'],
    majorIdeasDetailed: [
      {name: 'Emptiness', explanation: 'Phenomena are empty of the independent intrinsic nature criticized as svabhāva.', whyItMatters: 'It blocks reification without denying ordinary dependence and transformation.'},
      {name: 'Dependent arising', explanation: 'Phenomena occur through causes, conditions, relations, designation, and practices.', whyItMatters: 'Dependence and emptiness are connected rather than competing descriptions.'},
      {name: 'Two truths', explanation: 'Conventional truth makes communication, inquiry, and practice possible; ultimate analysis does not uncover self-established entities.', whyItMatters: 'The distinction explains how critique can coexist with functioning practices.'},
      {name: 'Middle way', explanation: 'Madhyamaka resists treating fixed existence and sheer nonexistence as exhaustive alternatives.', whyItMatters: 'It prevents emptiness from becoming either substantialism or nihilism.'},
      {name: 'Critique of svabhāva', explanation: 'Arguments test whether phenomena can be established through independent, invariant own-nature.', whyItMatters: 'The technical target is more precise than the slogan that Nāgārjuna denied reality.'},
    ],
    keyWorksDetailed: [
      {title: 'Mūlamadhyamakakārikā', summary: 'Root verses examining causation, motion, persons, time, views, nirvāṇa, and other categories through Madhyamaka analysis.', whyItMatters: 'It is the central and least disputed work attributed to Nāgārjuna.'},
      {title: 'Vigrahavyāvartanī', summary: 'A work commonly attributed to Nāgārjuna that addresses objections about argument and means of knowledge.', whyItMatters: 'It sharpens the reflexive problem of how an emptiness critique can reason.'},
      {title: 'Yuktiṣaṣṭikā', summary: 'Sixty verses on reasoning, dependent arising, and release, commonly included in the philosophical corpus.', whyItMatters: 'It extends the connection between philosophical analysis and Buddhist practice.'},
    ],
    lifeEvents: [{approximateYear: 150, label: 'Conventional placement begins', description: 'A broad scholarly anchor, not a documented birth year.'}, {approximateYear: 250, label: 'Conventional placement ends', description: 'A broad scholarly anchor, not a documented death year.'}],
    intellectualDevelopment: ['No secure biographical chronology supports a staged intellectual development.', 'Work attribution must be assessed title by title.', 'Later commentaries and traditions develop distinct systematic readings.'],
    influencesReceived: ['Early Buddhist discourses and dependent arising', 'Abhidharma analyses and disputes', 'Developing Mahāyāna and Prajñāpāramitā traditions'],
    influenceOnLaterThought: ['Indian Madhyamaka commentarial traditions', 'Tibetan Madhyamaka systems and debates', 'Chinese Sanlun and wider East Asian Buddhist philosophy', 'Modern debates about dependence, foundations, language, and realism'],
    controversiesOrInterpretiveTensions: ['Historical biography versus later religious memory', 'Attribution of works beyond the Mūlamadhyamakakārikā', 'Whether Madhyamaka advances theses and what kind', 'How to understand conventional truth and svabhāva', 'How later classifications relate to Nāgārjuna’s own text'],
    commonMisunderstandings: ['Emptiness does not mean that nothing appears, functions, or matters.', 'Emptiness is not a hidden substance or absolute behind phenomena.', 'Later Prāsaṅgika/Svātantrika taxonomies are not simply Nāgārjuna’s own two named schools.', 'One modern philosophical reconstruction should not be presented as scholarly or Buddhist consensus.'],
    schoolMemberships: ['Madhyamaka; later lineages and classifications should not be projected backward without qualification.'],
    branchContributions: [
      {branchId: 'buddhist-philosophy', summary: 'Central source for Madhyamaka analyses of emptiness, dependent arising, and two truths.'},
      {branchId: 'indian-philosophy', summary: 'Major participant in classical Indian debates about causation, language, knowledge, and liberation.'},
      {branchId: 'metaphysics', summary: 'A comparative Atlas route for anti-foundational arguments; not a claim that Nāgārjuna practiced a modern Western discipline.'},
    ],
    branchMemberships: [
      {branchId: 'buddhist-philosophy', status: 'central', note: 'Foundational Madhyamaka philosopher within the diverse Buddhist philosophical field.', confidence: 'high'},
      {branchId: 'indian-philosophy', status: 'major', note: 'Major classical Indian Buddhist philosopher.', confidence: 'high'},
      {branchId: 'metaphysics', status: 'associated', note: 'Comparative route for arguments about intrinsic nature, dependence, and foundations; the category is retrospective.', confidence: 'high'},
    ],
    beginnerReadingPath: [
      {title: 'Nāgārjuna', author: 'Jan Christoph Westerhoff', year: 2026, type: 'secondary', difficulty: 'beginner', whyRead: 'Establish biography, attribution, vocabulary, and interpretive disputes before reading compressed verses.', sourceUrl: 'https://plato.stanford.edu/archives/sum2026/entries/nagarjuna/'},
      {title: 'Nāgārjuna’s Middle Way: Mūlamadhyamakakārikā, chapter 1', author: 'Nāgārjuna; translated by Mark Siderits and Shōryū Katsura', year: 2013, type: 'primary', difficulty: 'intermediate', whyRead: 'Read a named translation and commentary on conditions and causation.', sourceUrl: 'https://wisdomexperience.org/ebook/nagarjunas-middle-way/mulamadhyamakakarika-by-nagarjuna/1-an-analysis-of-conditions/'},
    ],
    advancedReadingPath: [
      {title: 'Madhyamaka Buddhist Philosophy', author: 'Dan Arnold', type: 'secondary', difficulty: 'advanced', whyRead: 'Place Nāgārjuna in Abhidharma debates and follow divergent later developments.', sourceUrl: 'https://iep.utm.edu/madhyamaka-buddhist-philosophy/'},
      {title: 'The Theory of Two Truths in India', author: 'Sonam Thakchoe', year: 2022, type: 'secondary', difficulty: 'advanced', whyRead: 'Compare major interpretations of conventional and ultimate truth.', sourceUrl: 'https://plato.stanford.edu/archives/fall2022/entries/twotruths-india/'},
    ],
    sourceLinks: [],
    articleSections,
    editorial: {
      sources,
      furtherReadingSourceIds: ['nag-sep-madhyamaka'],
      structuredClaims: {
        classification: claim('South Asia, probably southern India · Buddhist / Madhyamaka', [c('nag-sep', 'section', '1. Life and works')]),
        date: claim('c. 150–250 CE; chronology uncertain', [c('nag-sep', 'section', '1. Life and works'), c('nag-iep', 'section', '1. Life, Legend, and Works')]),
        'contribution-summary': claim('Connected dependent arising with emptiness of intrinsic nature while resisting fixed existence and nihilistic nonexistence.', [c('nag-sep', 'section', '2–5'), c('nag-madhyamaka-iep', 'section', '2–3')]),
        'short-biography': claim('Sparse biography, contested corpus, secure association with the Mūlamadhyamakakārikā.', [c('nag-sep', 'section', '1. Life and works')]),
        'historical-context': claim('Indian Buddhist debate among early discourse, Abhidharma, Mahāyāna, and multiple interlocutors.', [c('nag-madhyamaka-iep', 'section', '1. The Abhidharma Context')]),
        'central-problem': claim('How can dependently arisen phenomena function without independent intrinsic nature?', [c('nag-sep', 'section', '2–4')]),
        'dating-note': claim('The displayed dates are common broad anchors, not documentary biography.', [c('nag-sep', 'section', '1. Life and works')]),
      },
      review: {
        status: 'claim-reviewed',
        reviewedOn: '2026-07-31',
        method: 'Full visitor-page claim review with cross-tradition terminology safeguards, attribution review, translation checks, explicit interpretive disagreement, reuse reconciliation, and automated lock validation.',
        reviewNotePath: 'docs/editorial/reviews/nagarjuna.md',
        lock: 'fnv1a64:57b6a52d533c9f50',
        evidencePolicy: {requiredSourceTypes: ['primary-text']},
      },
    },
  };
};
