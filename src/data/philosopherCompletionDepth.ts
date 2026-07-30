import type {Philosopher,ReadingEntry,SourceLink} from '../types/philosophy';

const reading=(author:string,title:string,difficulty:ReadingEntry['difficulty'],whyRead:string,type:ReadingEntry['type']='primary'):ReadingEntry=>({author,title,difficulty,type,whyRead});
const sep=(label:string,slug:string):SourceLink=>({label:`Stanford Encyclopedia: ${label}`,url:`https://plato.stanford.edu/entries/${slug}/`,type:'SEP'});

export const philosopherCompletionDetails:Record<string,Partial<Philosopher>>={
  prodicus:{
    beginnerReadingPath:[
      reading('Xenophon','Memorabilia 2.1.21–34','beginner','Read the surviving outline of the Choice of Heracles while noting Xenophon’s explicit warning that he is not preserving Prodicus word for word.','dialogue'),
      reading('Plato','Protagoras 337a–341e','intermediate','See Prodicus staged as a specialist in verbal distinctions inside Plato’s philosophically comic drama.','dialogue'),
      reading('Robert Mayhew','Prodicus the Sophist: Texts, Translations, and Commentary','intermediate','Use the collected evidence to separate later testimony, reconstruction, and responsible interpretation.','book')
    ],
    advancedReadingPath:[
      reading('Richard Bett','Prodicus on the Choice of Heracles, Language, and Religion','advanced','Study how the ethical allegory, linguistic method, and contested reports about religion can be interpreted together.','essay'),
      reading('David Sansone','Xenophon and Prodicus’s Choice of Heracles','advanced','Enter the scholarly dispute over how much Prodicean material survives in Xenophon’s adaptation.','article')
    ],
    sourceLinks:[
      {label:'Internet Encyclopedia of Philosophy: The Sophists',url:'https://iep.utm.edu/sophists/',type:'IEP'},
      {label:'Xenophon, Memorabilia 2.1 — Choice of Heracles',url:'https://www.perseus.tufts.edu/hopper/text?doc=Xen.+Mem.+2.1&fromdoc=Perseus%3Atext%3A1999.01.0208',type:'primary-text'},
      {label:'Plato, Protagoras 337a',url:'https://www.perseus.tufts.edu/hopper/text?doc=Plat.+Prot.+337a',type:'primary-text'}
    ]
  },
  'hippias-of-elis':{
    beginnerReadingPath:[
      reading('Plato','Hippias Minor 363c–368e','beginner','Meet the Olympic self-presentation and handmade equipment while treating Plato’s comic staging as a partisan witness.','dialogue'),
      reading('Plato','Protagoras 337c–d','beginner','Read the compact nature-and-convention speech that makes political borders answerable to a broader human kinship.','dialogue'),
      reading('Xenophon','Memorabilia 4.4','intermediate','Compare Xenophon’s later discussion of unwritten laws with Plato’s different literary portrait.','dialogue')
    ],
    advancedReadingPath:[
      reading('Plato or a disputed Platonic author','Hippias Major','advanced','Study education, beauty, fees, and diplomatic self-presentation while keeping the dialogue’s authorship question visible.','dialogue'),
      reading('Philostratus','Lives of the Sophists 1.11','advanced','Assess a much later synthesis of Hippias’s polymathy and public reputation against earlier evidence.','primary')
    ],
    sourceLinks:[
      sep('The Sophists','sophists'),
      {label:'Plato, Hippias Minor — Scaife/Perseus',url:'https://scaife.perseus.org/library/urn:cts:greekLit:tlg0059.tlg026.perseus-eng2/',type:'primary-text'},
      {label:'Xenophon, Memorabilia 4.4',url:'https://www.perseus.tufts.edu/hopper/text?doc=Xen.+Mem.+4.4',type:'primary-text'}
    ]
  },
  fichte:{
    beginnerReadingPath:[
      reading('Johann Gottlieb Fichte','The Vocation of Man','beginner','Enter Fichte through a literary presentation of doubt, knowledge, freedom, and practical faith.'),
      reading('Johann Gottlieb Fichte','First and Second Introductions to the Wissenschaftslehre','intermediate','See why transcendental philosophy begins from activity rather than a thing-like ego.'),
      reading('Johann Gottlieb Fichte','Foundations of Natural Right, selections','intermediate','Follow the argument from embodied agency and summons to reciprocal recognition and right.')
    ],
    advancedReadingPath:[
      reading('Johann Gottlieb Fichte','Foundation of the Entire Wissenschaftslehre','advanced','Study the difficult 1794–95 presentation of self-positing, opposition, limitation, and striving.'),
      reading('Johann Gottlieb Fichte','The System of Ethics','advanced','Connect the Wissenschaftslehre to freedom, duty, embodiment, and concrete moral agency.')
    ],
    sourceLinks:[
      sep('Johann Gottlieb Fichte','johann-fichte'),
      {label:'Internet Encyclopedia of Philosophy: Johann Gottlieb Fichte',url:'https://iep.utm.edu/fichtejg/',type:'IEP'}
    ]
  },
  schelling:{
    beginnerReadingPath:[
      reading('F. W. J. Schelling','Philosophical Investigations into the Essence of Human Freedom','intermediate','Begin with the mature problem of freedom, evil, personality, and the ground of existence.'),
      reading('F. W. J. Schelling','Ideas for a Philosophy of Nature, selections','intermediate','Encounter nature as productive and self-organizing rather than inert mechanism.'),
      reading('F. W. J. Schelling','System of Transcendental Idealism, art sections','intermediate','See why art becomes a privileged presentation of conscious and unconscious productivity.')
    ],
    advancedReadingPath:[
      reading('F. W. J. Schelling','The Ages of the World, selected draft','advanced','Approach the unfinished middle-period attempt to think time, freedom, and divine becoming.'),
      reading('F. W. J. Schelling','Philosophy of Revelation, selections','advanced','Study the later distinction between negative and positive philosophy.')
    ],
    sourceLinks:[
      sep('F. W. J. Schelling','schelling'),
      {label:'Internet Encyclopedia of Philosophy: F. W. J. von Schelling',url:'https://iep.utm.edu/schellin/',type:'IEP'}
    ]
  },
  hegel:{
    sourceLinks:[
      sep('Georg Wilhelm Friedrich Hegel','hegel'),
      {label:'Internet Encyclopedia of Philosophy: Hegel’s Social and Political Thought',url:'https://iep.utm.edu/hegelsoc/',type:'IEP'}
    ]
  },
  husserl:{
    beginnerReadingPath:[
      reading('Edmund Husserl','The Idea of Phenomenology','intermediate','Use five compact lectures to enter reduction, givenness, and phenomenological method.'),
      reading('Edmund Husserl','Cartesian Meditations, Meditations I–II','intermediate','Meet transcendental subjectivity and intentional analysis in a relatively concise presentation.'),
      reading('Edmund Husserl','The Crisis of European Sciences, selections','intermediate','Connect phenomenology to the lifeworld, history, and the crisis of scientific meaning.')
    ],
    advancedReadingPath:[
      reading('Edmund Husserl','Logical Investigations, selected investigations','advanced','Study the anti-psychologistic and descriptive beginnings of the project.'),
      reading('Edmund Husserl','Ideas I','advanced','Work through epoché, reduction, noesis, noema, and transcendental phenomenology.')
    ],
    sourceLinks:[sep('Edmund Husserl','husserl')]
  },
  sartre:{
    beginnerReadingPath:[
      reading('Jean-Paul Sartre','Existentialism Is a Humanism','beginner','Start with a lucid public defense of freedom and responsibility while remembering that it simplifies the larger philosophy.'),
      reading('Jean-Paul Sartre','No Exit','beginner','See conflict, self-deception, and dependence on others staged dramatically.'),
      reading('Jean-Paul Sartre','Anti-Semite and Jew, selections','intermediate','Connect bad faith and situation to a concrete political analysis of antisemitism.')
    ],
    advancedReadingPath:[
      reading('Jean-Paul Sartre','Being and Nothingness, selected parts','advanced','Study consciousness, nothingness, bad faith, embodiment, and relations with others in the systematic work.'),
      reading('Jean-Paul Sartre','Critique of Dialectical Reason, selections','advanced','Follow the later effort to place freedom within material scarcity, groups, and history.')
    ],
    sourceLinks:[sep('Jean-Paul Sartre','sartre')]
  },
  camus:{
    beginnerReadingPath:[
      reading('Albert Camus','The Myth of Sisyphus','beginner','Begin with the absurd, the question of suicide, lucid refusal, and life without appeal.'),
      reading('Albert Camus','The Plague','beginner','Encounter solidarity and responsibility through a novel of collective catastrophe.'),
      reading('Albert Camus','The Stranger','beginner','Read the novel beside, not as a simple illustration of, the philosophical essays.')
    ],
    advancedReadingPath:[
      reading('Albert Camus','The Rebel','advanced','Study revolt, limits, historical murder, revolution, and solidarity after the analysis of absurdity.'),
      reading('Albert Camus','Resistance, Rebellion, and Death','advanced','Trace Camus’s public arguments about resistance, punishment, Algeria, and political responsibility.')
    ],
    sourceLinks:[sep('Albert Camus','camus')]
  },
  'iris-murdoch':{
    shortBio:'Iris Murdoch recast moral life as a long discipline of attention: learning to see other people and the good without the consoling distortions of ego, fantasy, or a theory that reduces ethics to isolated choices.',
    lifeStory:'Born in Dublin and raised in London, Murdoch studied classics and philosophy at Somerville College, worked in wartime civil service and postwar relief, pursued graduate philosophy at Newnham College, and taught at St Anne’s College, Oxford, from 1948 to 1963. She developed philosophy and fiction side by side rather than treating one as a decorative illustration of the other.',
    historicalContext:'Postwar British moral philosophy, shaped by analytic and ordinary-language methods, existentialism, renewed arguments about virtue, and Murdoch’s selective modern Platonism',
    beginnerExplanation:'Murdoch asks us to notice the moral work that happens before a decision. Resentment, vanity, fear, and fantasy can organize what we see; patient attention can make another person’s reality visible enough for better action.',
    extendedBio:[
      'Murdoch’s philosophical formation crossed boundaries often treated as separate: Plato and Kant, Simone Weil, Wittgensteinian analysis, Sartrean existentialism, Christian and Buddhist materials, psychoanalysis, literature, and ordinary moral experience.',
      'Her novels and essays share an interest in self-deception and particular persons, but the fiction should not be decoded as a simple set of philosophical examples. Each genre tests attention in a different way.'
    ],
    centralQuestions:[
      'How can attention become a form of moral activity before any outward choice is made?',
      'What does it mean to see another person justly rather than through fantasy or self-protection?',
      'Can the good orient moral life without becoming a rule, preference, or supernatural object?'
    ],
    majorIdeasDetailed:[
      {name:'Attention',explanation:'A just and loving gaze is disciplined work that resists fantasy and responds to another person as an independent reality.',whyItMatters:'It moves ethics upstream from dramatic decisions to the habits of perception that make good or bad choices possible.'},
      {name:'The good',explanation:'The good is an indefinable but authoritative orientation beyond the ego, figured through a selective modern Platonism rather than a checklist of commands.',whyItMatters:'It lets moral judgment answer to reality without reducing value to preference or social approval.'},
      {name:'Unselfing',explanation:'Art, nature, study, love, and attentive practice can loosen the ego’s tendency to arrange the world around its own consolations.',whyItMatters:'Moral freedom becomes clearer vision and responsiveness, not merely an unconstrained moment of choice.'},
      {name:'Moral perception',explanation:'Descriptions, metaphors, emotions, and imagination shape what a situation can count as before explicit deliberation begins.',whyItMatters:'Two people can know the same public facts while inhabiting morally different pictures of another person.'}
    ],
    keyWorksDetailed:[
      {title:'The Sovereignty of Good',summary:'Three essays on moral vision, perfection, unselfing, and the authority of the good.',whyItMatters:'This is the clearest entry into Murdoch’s challenge to choice-centered moral psychology.'},
      {title:'Existentialists and Mystics',summary:'A collection of philosophical and literary essays spanning Sartre, morality, art, religion, and language.',whyItMatters:'It reveals the range and development hidden by reading only one famous essay.'},
      {title:'Metaphysics as a Guide to Morals',summary:'Murdoch’s late, expansive investigation of consciousness, value, art, religion, and moral orientation.',whyItMatters:'It shows both the ambition and the interpretive difficulty of her mature metaphysics.'},
      {title:'Sartre: Romantic Rationalist',summary:'An early critical study that helped introduce Sartre to an English-speaking readership.',whyItMatters:'It clarifies the existentialist picture of freedom against which Murdoch developed her own moral psychology.'}
    ],
    lifeEvents:[
      {year:1919,label:'Born',description:'Born 15 July 1919 in Dublin; raised primarily in London.'},
      {year:1948,label:'Oxford teaching begins',description:'Became a fellow and tutor in philosophy at St Anne’s College, Oxford.'},
      {year:1970,label:'The Sovereignty of Good',description:'Published the three-essay collection that became the central entry point into her moral philosophy.'},
      {year:1999,label:'Died',description:'Died 8 February 1999 in Oxford.'}
    ],
    intellectualDevelopment:[
      'Moved from critical engagement with Sartrean freedom and postwar analytic moral psychology toward an account of attention, inner change, and moral perception.',
      'Developed a selective Platonism in which the good orients ethical life while remaining resistant to formula and possession.',
      'Expanded the project through reflection on art, religion, literature, psychoanalysis, and the difficulty of recognizing other persons.'
    ],
    influencesReceived:['Plato and Kant','Simone Weil','Wittgenstein and postwar analytic philosophy','Sartre and existentialism','Literature and psychoanalytic moral psychology'],
    influenceOnLaterThought:['Contemporary moral perception and attention theory','The revival and revision of virtue ethics','Ethics and literature','Martha Nussbaum, Cora Diamond, Charles Taylor, and later Murdoch scholarship'],
    controversiesOrInterpretiveTensions:[
      'Murdoch’s language of the good can orient moral inquiry without yielding a decision procedure, and interpreters disagree over how metaphysically strong that commitment is.',
      'Her focus on attention and individual moral vision is powerful but requires supplementation when analyzing institutions, structural injustice, and urgent collective action.',
      'The philosophical writings and novels illuminate one another without supporting a one-to-one code in which fictional characters merely embody doctrines.'
    ],
    commonMisunderstandings:[
      'Murdoch does not replace action with private contemplation; she argues that action is already shaped by the quality of attention.',
      'Unselfing is not self-hatred or erasure of agency, and the good is not a vague instruction to feel benevolent.',
      'Calling Murdoch a virtue ethicist is useful only if her distinctive Platonism, moral psychology, and literary practice remain visible.'
    ],
    schoolMemberships:['Postwar British moral philosophy','Modern Platonism','Moral psychology and virtue-ethics debates'],
    branchContributions:[
      {branchId:'ethics',summary:'Reoriented ethics toward attention, moral perception, fantasy, and the inner work that precedes choice.'},
      {branchId:'virtue-ethics',summary:'Helped reopen questions about character and moral formation while resisting reduction to a standard Aristotelian virtue taxonomy.'}
    ],
    beginnerReadingPath:[
      reading('Iris Murdoch','The Sovereignty of Good','beginner','Begin with the mother-in-law example, attention, unselfing, and the image of the good before attempting the later metaphysics.'),
      reading('Iris Murdoch','Existentialists and Mystics, selected essays','intermediate','Place the famous moral essays beside Murdoch’s writing on Sartre, art, literature, religion, and language.')
    ],
    advancedReadingPath:[
      reading('Iris Murdoch','Metaphysics as a Guide to Morals','advanced','Follow the mature synthesis of moral psychology, art, consciousness, religion, and the good without forcing it into a conventional system.'),
      reading('Iris Murdoch','The Fire and the Sun','advanced','Study Murdoch’s philosophically creative reading of Plato on art and representation.')
    ],
    sourceLinks:[
      sep('Iris Murdoch','murdoch'),
      {label:'Somerville College, Oxford: Iris Murdoch',url:'https://www.some.ox.ac.uk/eminent/iris-murdoch/',type:'other'}
    ]
  },
  'philippa-foot':{
    shortBio:'Philippa Foot challenged the idea that moral judgments merely express attitudes, renewed attention to virtue and practical reason, and developed a naturalistic account of human goodness whose influence reaches far beyond the trolley case she introduced.',
    lifeStory:'Foot studied philosophy, politics, and economics at Somerville College during the Second World War, returned there as a philosophy tutor and fellow, and later taught extensively in the United States, including at UCLA. Her career moved from critiques of non-cognitivism and debates about moral reasons to the mature account of life-form evaluation in Natural Goodness.',
    historicalContext:'Twentieth-century analytic moral philosophy after emotivism and prescriptivism, the Oxford revival of virtue and action theory, and later debates over ethical naturalism',
    beginnerExplanation:'Foot asks how moral judgment can be answerable to reasons and facts without pretending that a rulebook is written into biology. Her mature proposal links virtue to what rational, dependent, social human beings characteristically need in order to live well.',
    extendedBio:[
      'Foot’s wartime Oxford cohort included G. E. M. Anscombe, Iris Murdoch, and Mary Midgley. Their projects differed, but each resisted an inherited picture that severed value, character, and human life too sharply.',
      'The runaway trolley first appeared within Foot’s argument about abortion and double effect. Later debate made the case famous, sometimes at the cost of obscuring her larger work on virtues, reasons, and natural goodness.'
    ],
    centralQuestions:[
      'Can moral judgments be objective because virtues and defects concern the needs and characteristic activities of human life?',
      'How do reasons for action connect with virtue without reducing morality to desire, command, or social approval?',
      'Why do intending harm, causing harm, and allowing harm sometimes carry different moral significance?'
    ],
    majorIdeasDetailed:[
      {name:'Virtue',explanation:'Virtues such as justice, courage, and charity are excellences that correct characteristic temptations and enable good practical reasoning.',whyItMatters:'Ethics concerns how agents see, feel, deliberate, and act across a life, not only isolated compliance with rules.'},
      {name:'Trolley problem',explanation:'Foot’s runaway-trolley comparison tests distinctions among direct harm, redirected threats, intention, and double effect rather than supplying an automatic verdict for every emergency.',whyItMatters:'It exposes where appealing moral principles diverge and why intuitive judgments need argument rather than polling.'},
      {name:'Natural goodness',explanation:'Evaluations of living things refer to their life forms; human evaluation is distinctive because language, dependence, institutions, and practical reason belong to our form of life.',whyItMatters:'This offers a route from facts about human life to truth-apt moral evaluation without equating goodness with whatever is statistically normal.'},
      {name:'Moral reasons',explanation:'Moral considerations can give agents reasons that are not merely reports of current desire or expressions of approval.',whyItMatters:'The claim challenges both non-cognitivism and pictures of rationality confined to instrumental self-interest.'}
    ],
    keyWorksDetailed:[
      {title:'Virtues and Vices',summary:'A collection of essays on virtue, moral arguments, hypothetical imperatives, abortion, and double effect.',whyItMatters:'It shows the range and development of Foot’s method before her mature monograph.'},
      {title:'Natural Goodness',summary:'Foot’s concise mature account of life-form evaluation, practical rationality, and human goodness.',whyItMatters:'It is the central statement of her ethical naturalism.'},
      {title:'Moral Beliefs',summary:'An early challenge to the sharp separation of moral judgment from facts and reasons.',whyItMatters:'It locates Foot within the postwar dispute over whether ethics can be objective.'},
      {title:'The Problem of Abortion and the Doctrine of the Double Effect',summary:'The essay that introduces the runaway-trolley comparison within a broader examination of intended and foreseen harm.',whyItMatters:'Reading the full argument prevents the trolley from becoming a context-free puzzle or a substitute for Foot’s philosophy.'}
    ],
    lifeEvents:[
      {year:1920,label:'Born',description:'Born 3 October 1920 in Owston Ferry, Lincolnshire.'},
      {year:1950,label:'Somerville fellowship',description:'Became a fellow and tutor in philosophy at Somerville College, Oxford.'},
      {year:1976,label:'UCLA appointment',description:'Took a permanent philosophy position at UCLA after years of visiting appointments.'},
      {year:2001,label:'Natural Goodness',description:'Published the monograph that presents her mature ethical naturalism.'},
      {year:2010,label:'Died',description:'Died 3 October 2010 in Oxford, on her ninetieth birthday.'}
    ],
    intellectualDevelopment:[
      'Began by challenging emotivist and prescriptivist accounts that made moral judgment too independent of facts and reasons.',
      'Developed accounts of virtues, moral motivation, and practical rationality while revising some earlier positions.',
      'Formulated natural goodness through life-form judgments without treating statistical normality or biological success as a moral code.'
    ],
    influencesReceived:['Aristotle and Aquinas','G. E. M. Anscombe and Wittgensteinian analytic philosophy','Postwar debates over non-cognitivism and moral reasons'],
    influenceOnLaterThought:['Contemporary virtue ethics and ethical naturalism','Rosalind Hursthouse and later neo-Aristotelian ethics','Trolley-problem, double-effect, and doing-versus-allowing debates'],
    controversiesOrInterpretiveTensions:[
      'Foot changed her position on whether moral judgments necessarily give every rational agent reasons, so early and late arguments should not be flattened into one unchanging doctrine.',
      'Life-form evaluation must distinguish moral goodness from statistical normality, evolutionary success, medical typicality, or inherited social hierarchy.',
      'The trolley problem is influential but can distort Foot’s legacy when detached from her broader concern with virtue, intention, and practical reason.'
    ],
    commonMisunderstandings:[
      'Natural goodness does not infer moral rules from whatever occurs in nature and does not rank persons by conformity to a statistical norm.',
      'Foot helped revive virtue ethics, but her arguments cannot be reduced to the slogan that character matters more than rules or consequences.',
      'The trolley case is a diagnostic comparison, not a moral algorithm and not the whole of Foot’s work.'
    ],
    schoolMemberships:['Analytic moral philosophy','Virtue-ethics revival','Ethical naturalism'],
    branchContributions:[
      {branchId:'virtue-ethics',summary:'Rebuilt virtue around reasons, human life, and practical rationality rather than a list of admirable traits.'},
      {branchId:'ethics',summary:'Connected moral objectivity, intention, harm, and ethical naturalism across early essays and mature work.'}
    ],
    beginnerReadingPath:[
      reading('Philippa Foot','Virtues and Vices, selected essays','beginner','Start with the essays on virtues, moral arguments, and hypothetical imperatives before approaching the mature naturalism.'),
      reading('Philippa Foot','The Problem of Abortion and the Doctrine of the Double Effect','intermediate','Read the original context of the trolley comparison and track the distinctions among intention, redirection, doing, and allowing.')
    ],
    advancedReadingPath:[
      reading('Philippa Foot','Natural Goodness','advanced','Work carefully through life-form judgments, practical rationality, and the transition from natural defect to human moral evaluation.'),
      reading('Philippa Foot','Moral Beliefs','advanced','Place the mature view against Foot’s early critique of non-cognitivist moral theory.')
    ],
    sourceLinks:[
      sep('Philippa Foot','philippa-foot'),
      {label:'Somerville College Library: Philippa Foot Collection',url:'https://library.some.ox.ac.uk/2026/01/16/philippa-foot-collection/',type:'other'}
    ]
  },
  'judith-thomson':{
    shortBio:'Judith Jarvis Thomson used unusually exact cases to analyze rights, claims, bodily authority, killing, letting die, self-defense, and moral permission while repeatedly warning that a memorable intuition is only the beginning of an argument.',
    lifeStory:'After studying at Barnard College and Newnham College, Cambridge, Thomson completed her doctorate at Columbia and joined MIT in 1964, becoming a central teacher and scholar in moral theory and metaphysics. Across essays and books she developed rights-based arguments through cases designed to isolate one morally relevant feature at a time.',
    historicalContext:'Late twentieth-century analytic ethics and metaphysics, shaped by ordinary-language philosophy, renewed normative theory, and debates in law, medicine, rights, and moral psychology',
    beginnerExplanation:'Thomson’s thought experiments are precision tools. The violinist and trolley cases ask which rights people possess, what those rights require of others, and why saving more lives does not automatically settle whether a particular act is permissible.',
    extendedBio:[
      'Thomson entered a profession whose institutions placed substantial barriers before women and became a defining figure in MIT philosophy, known for exacting argument and close graduate teaching.',
      'Her work ranges beyond two famous cases to property, self-defense, causation, action, goodness, advice, and the metaphysics of rights and claims.'
    ],
    centralQuestions:[
      'What does a right protect, and which duties does it impose on particular people?',
      'Why can redirecting a threat, using a person as a means, killing, and letting die have different moral structures?',
      'How should bodily authority and another person’s claim to life be related without treating either as absolute?'
    ],
    majorIdeasDetailed:[
      {name:'Rights',explanation:'Rights generate structured claims and constraints between persons; possessing a right does not automatically include every means needed to secure its object.',whyItMatters:'The view explains why aggregate benefit alone may not determine what one person may do to another.'},
      {name:'Trolley problem',explanation:'Contrasting switch, driver, and footbridge cases tests whether redirection, agency, intention, and using a person explain divergent judgments.',whyItMatters:'The cases reveal a hard explanatory problem rather than certifying intuition as proof.'},
      {name:'The violinist argument',explanation:'A Defense of Abortion asks whether a right to life always includes a right to continued use of another person’s body.',whyItMatters:'It separates moral personhood from the further question of what one person may demand from another.'},
      {name:'Doing and allowing',explanation:'Thomson analyzes how an agent’s relation to a threat can distinguish causing harm, permitting harm, and redirecting an already existing danger.',whyItMatters:'These distinctions organize debates over self-defense, medical choice, rescue, and liability.'}
    ],
    keyWorksDetailed:[
      {title:'A Defense of Abortion',summary:'The 1971 essay uses the violinist and related cases to distinguish a right to life from an unrestricted claim over another person’s body.',whyItMatters:'It remains a foundational rights-based argument whose scope and analogies require careful debate.'},
      {title:'Killing, Letting Die, and the Trolley Problem',summary:'A 1976 essay that names and develops the trolley problem from Foot’s earlier comparison.',whyItMatters:'It makes the doing-versus-allowing structure explicit and opens a large subsequent literature.'},
      {title:'The Trolley Problem',summary:'Thomson’s 1985 reformulation introduces the bystander switch and footbridge comparison.',whyItMatters:'It sharpens the contrast between redirecting a threat and using a person as the means of stopping it.'},
      {title:'The Realm of Rights',summary:'A book-length account of rights, claims, actions, and interpersonal moral structure.',whyItMatters:'It places the famous cases within Thomson’s broader moral theory.'},
      {title:'Normativity',summary:'A late study of good, reasons, correctness, and the structure of normative judgment.',whyItMatters:'It shows that Thomson’s project extended well beyond applied dilemmas.'}
    ],
    lifeEvents:[
      {year:1929,label:'Born',description:'Born 4 October 1929 in New York City.'},
      {year:1959,label:'Doctorate',description:'Completed a PhD in philosophy at Columbia University.'},
      {year:1964,label:'MIT',description:'Joined MIT, where she taught generations of philosophers and helped shape the department.'},
      {year:1971,label:'A Defense of Abortion',description:'Published the violinist argument in Philosophy & Public Affairs.'},
      {year:2020,label:'Died',description:'Died 20 November 2020 in Cambridge, Massachusetts.'}
    ],
    intellectualDevelopment:[
      'Carried the clarity of ordinary-language and analytic philosophy into substantive problems about action, causation, rights, and bodily authority.',
      'Refined trolley cases across multiple essays rather than treating one intuitive response as final.',
      'Expanded from applied cases to systematic accounts of rights, goodness, advice, and normativity.'
    ],
    influencesReceived:['Ordinary-language philosophy and John Wisdom','Philippa Foot’s distinctions among intention, double effect, and the runaway trolley case','Mid-century analytic metaphysics and moral theory'],
    influenceOnLaterThought:['Rights-based moral and legal philosophy','Abortion ethics and bodily-autonomy debates','Trolleyology, moral psychology, and experimental philosophy','Self-defense, doing-versus-allowing, and liability theory'],
    controversiesOrInterpretiveTensions:[
      'The violinist case isolates bodily use under coercive circumstances, and critics dispute how closely that structure maps onto pregnancy, responsibility, dependency, and social inequality.',
      'Trolley intuitions vary with framing and context; Thomson’s cases require principles and cannot be treated as self-validating polls.',
      'A rights-based constraint can resist aggregate benefit without making rights absolute or eliminating conflicts among claims.'
    ],
    commonMisunderstandings:[
      'Thomson does not argue that personhood is irrelevant; the violinist argument deliberately grants a strong right-to-life premise and asks what follows from it.',
      'She did not invent the runaway trolley case alone: Foot introduced the comparison, and Thomson named and substantially transformed the problem.',
      'The switch-versus-footbridge contrast is a problem to explain, not a universal rule that one may always pull a lever and never act directly.'
    ],
    schoolMemberships:['Analytic moral philosophy','Rights theory','Analytic metaphysics'],
    branchContributions:[
      {branchId:'ethics',summary:'Made rights, bodily authority, permission, doing and allowing, and self-defense central through tightly controlled cases.'}
    ],
    beginnerReadingPath:[
      reading('Judith Jarvis Thomson','A Defense of Abortion','beginner','Read the full sequence of cases and distinguish granting a right to life from granting a right to another person’s bodily support.'),
      reading('Judith Jarvis Thomson','Killing, Letting Die, and the Trolley Problem','intermediate','Follow how Thomson develops Foot’s comparison and tests doing, allowing, and redirected threats.')
    ],
    advancedReadingPath:[
      reading('Judith Jarvis Thomson','The Trolley Problem','advanced','Compare the bystander switch and footbridge cases while resisting the temptation to treat intuition as a completed theory.'),
      reading('Judith Jarvis Thomson','The Realm of Rights','advanced','Place the famous cases inside Thomson’s systematic account of claims, rights, and permissible action.'),
      reading('Judith Jarvis Thomson','Normativity','advanced','Study the later account of goodness, reasons, and normative structure.')
    ],
    sourceLinks:[
      {label:'MIT Philosophy: Judith Jarvis Thomson',url:'https://philosophy.mit.edu/people/faculty/thomson/',type:'other'},
      {label:'MIT News: Judith Jarvis Thomson memorial',url:'https://news.mit.edu/2020/professor-emerita-judith-jarvis-thomson-influential-philosopher-dies-1204',type:'other'}
    ]
  }
};
