import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';

type OrientationItem = {readonly label: string; readonly value: string};
type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

const concise = (
  name: string,
  lead: string,
  paragraphs: readonly string[],
  orientation: readonly OrientationItem[],
  assetId: MuseumAssetId,
  objectText: string,
): MuseumPrimaryInterpretationEnrichment => ({
  lead,
  keyIdeas: [],
  keyWorks: [],
  sections: [{heading: '', paragraphs}],
  presentation: {
    mode: 'concise',
    orientation,
    articleActionLabel: `Read the full sourced ${name} article`,
    bodyLayout: 'prose',
    plaqueKicker: '',
    plaqueSubtitleLines: 4,
  },
  objectInterpretations: {[assetId]: objectText},
});

const objectLed = (
  name: string,
  paragraphs: readonly string[],
  orientation: readonly VisitorGuideSection[],
  assetId: MuseumAssetId,
  objectText: string,
  lock: string,
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

export const SOUTH_ASIAN_PRIMARY_INTERPRETATIONS:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  mahavira: objectLed(
    'Mahavira',
    [
      'Jain traditions remember Mahāvīra as the twenty-fourth tīrthaṅkara, or ford-maker, in the present cosmic cycle. He is therefore not a simple founder who invented a path from nothing: Pārśva and earlier Jinas locate him within a lineage whose earliest history cannot be recovered as ordinary biography. The familiar 599–527 BCE lifespan belongs to Śvetāmbara traditional chronology; alternative chronologies and modern reconstructions differ. Early Buddhist references support an important ascetic teacher and community, but they are rival accounts rather than neutral dossiers. Jain scriptures and later lives preserve richer sacred narratives, whose courtly scenes, miracles, and omniscience claims must retain their genre rather than become modern documentation.',
      'The teaching associated with Mahāvīra demands a disciplined account of harm. Living selves, jīvas, differ from nonliving realities and become bound by karma, understood as subtle matter attracted through action, passion, and carelessness. Restraint, austerity, attention, right understanding, and nonviolence work together to stop new bondage and shed accumulated karma. Ahiṃsā reaches thought, speech, and action in a densely living world. The five great vows organize the most demanding mendicant discipline, while lay communities take related but limited vows. This graded structure connects radical renunciation to difficult questions about food, work, possession, embodiment, and responsibility.',
      'The historical Mahāvīra cannot bear every later Jain formulation. Śvetāmbara communities transmit an Āgama canon redacted long after him, while Digambara accounts hold that the original canon was lost and preserve doctrine through other authorities. Later thinkers developed technical accounts of many-sided reality and qualified assertion; these illuminate Jain intellectual history without making every mature theory his direct speech. The Chandigarh bust is a later devotional or commemorative recognition, not a lifetime portrait or evidence for disputed dates. Ask what habits conceal injury, and how a liberation project changes when minute living beings, animals, and people all make claims on conduct. Its severity should not be softened into generic tolerance.',
    ],
    [
      {heading: 'A remembered teacher', items: [
        {label: 'Twenty-fourth ford-maker', description: 'Jain tradition places Mahāvīra within a much older lineage of teachers who show a path across rebirth; he is not simply its modern-style founder.'},
        {label: 'History and sacred life', description: 'Traditional dates and detailed biographies matter to communities, but they are not equally secure as contemporary historical evidence.'},
      ]},
      {heading: 'The path', items: [
        {label: 'Karma as bondage', description: 'Actions and passions draw subtle karmic matter to a living self, limiting its knowledge and freedom.'},
        {label: 'Nonviolence in practice', description: 'Care in action, speech, and thought is part of release; monastic and lay vows pursue it with different degrees of rigor.'},
      ]},
      {heading: 'What developed later', items: [
        {label: 'Different canons', description: 'Śvetāmbara and Digambara communities preserve different accounts of scripture and its loss, so no single text simply records the teacher unchanged.'},
        {label: 'Many-sided reasoning', description: 'Later Jain thinkers developed careful ways to state partial truths without treating every claim as equally correct.'},
      ]},
    ],
    'mahavira-chandigarh-bust',
    'This Chandigarh museum bust is identified as Mahāvīra, but its unrecorded sculpture date and the surviving evidence do not make it a lifetime portrait. It is a later devotional or commemorative recognition of a teacher remembered through textual and artistic traditions. The object makes reception visible while leaving traditional chronology, sacred biography, and the historical formation of Jain doctrine to the article and its sources.',
    'fnv1a64:9c0a3d5e0990e747',
  ),
  jainism: objectLed(
    'Jainism',
    [
      'Jainism is a long family of South Asian communities, texts, practices, and arguments, not one doctrine authored at a single founding moment. Its traditions remember twenty-four tīrthaṅkaras in the present cosmic cycle, with Pārśva and Mahāvīra central to recoverable early history. Those lineage narratives frame teaching as renewal and transmission, even when historical inquiry cannot treat each one as ordinary biography. Jain thought joins metaphysical analysis to the disciplines and institutions that give it purpose: mendicant lineages, household communities, ritual, pilgrimage, literature, art, debate, commerce, reform, and diaspora.',
      'Jain accounts distinguish living selves, jīvas, from nonliving realities and describe karma as subtle material bondage attracted through activity and passion. Right faith, knowledge, conduct, vows, austerity, and close attention work together to halt new influx and shed accumulated karma. Ahiṃsā, nonviolence, reaches thought, speech, and action because the cosmos is densely inhabited by life. It is neither effortless purity nor a rule that makes all choices easy. Monastic and lay disciplines are related but not identical, and communities have debated bodily practice, possession, food, ritual, gender, authority, and liberation. The resulting ethics asks what ordinary habits fail to notice.',
      'Many-sidedness, anekāntavāda, explains why a finite statement can capture an aspect of a complex reality without exhausting it. Standpoint analysis and qualified assertion are disciplined strategies, not permission to call contradictions equally correct or to suspend judgment. Jain thinkers used them in debates about persistence and change, substances and modes, knowledge, language, and rival positions. Śvetāmbara and Digambara traditions preserve different accounts of scripture and conduct. The later Lokapuruṣa diagram maps an inhabited cosmos through a stylized human form. It is a material witness to one cosmological imagination, not anatomy or a complete Jain system. Let it widen attention to lives ordinarily ignored without pretending that one image or description masters a many-sided tradition.',
    ],
    [
      {heading: 'Key ideas', items: [
        {label: 'Living selves and karma', description: 'Each living self is capable of knowledge and liberation, yet becomes entangled through karmic matter drawn by action and passion.'},
        {label: 'Many-sided reality', description: 'A claim may be partly right from one standpoint without giving a complete account of a complex thing.'},
      ]},
      {heading: 'Practice', items: [
        {label: 'Nonviolence', description: 'Ahiṃsā extends careful attention to thought, speech, and action because life is more widespread and vulnerable than ordinary habits suggest.'},
        {label: 'Graded vows', description: 'Mendicants take the most demanding restraints; householders adopt related commitments suited to another form of life.'},
      ]},
      {heading: 'Living traditions', items: [
        {label: 'Different communities', description: 'Śvetāmbara and Digambara traditions differ over scripture, practice, and history while sharing many long-standing concerns.'},
        {label: 'More than one inheritance', description: 'Temples, pilgrimage, trade, literature, art, reform, and diaspora show why Jainism cannot be reduced to a single abstract doctrine.'},
      ]},
    ],
    'jain-lokapurusha-cosmology',
    'This c. sixteenth-century Lokapuruṣa diagram maps the inhabited cosmos through a stylized human form. It is neither anatomy nor a complete statement of Jain philosophy. As one later manuscript image within a diverse cosmological tradition, it shows how location, embodiment, rebirth, and the conditions of bound and liberated life could be imagined materially without representing every Jain community, doctrine, or practice.',
    'fnv1a64:30a10a6f0509de6d',
  ),
  kanada: objectLed(
    'Kanada',
    [
      'Kaṇāda is the traditional sage associated with the Vaiśeṣika Sūtra, but neither a secure biography nor exact life dates can be recovered. Later stories about his names and habits belong to reception, not documentary evidence. Even the sūtra collection’s formation, date, and authorship are disputed. The responsible subject is therefore an attributed textual tradition: terse aphorisms transmitted, arranged, interpreted, and perhaps altered over time; later commentaries; and eventually a close exchange with Nyāya. A pre-Common-Era placement is an atlas orientation, not a dated lifetime.',
      'Vaiśeṣika asks what kinds of reality must be recognized if objects change, qualities belong to things, and knowledge can be warranted. Its padārthas are categories for disciplined discourse, not a cabinet of arbitrary labels. Substance, quality, motion, universal, particularity, and inherence explain how a quality or movement belongs to a thing, how individuals share a kind yet remain distinct, and why some connections are more intimate than ordinary contact. Absence enters later systematic accounts and should not be projected unchanged into every early passage. The tradition’s atomism likewise concerns eternal, imperceptible atoms, their combinations, and composite objects within a world that also includes time, space, selves, mind, and moral causation. It is not an early version of modern chemistry or particle physics.',
      'Later authors debated wholes, causal production, unseen conditions, divine governance, and the basis of inference; Vaiśeṣika and Nyāya increasingly shared a vocabulary without becoming one timeless system. The contemporary Shaheedi Park bas-relief imagines Kaṇāda beside stylized natural forms. It records modern public commemoration, not ancient appearance, textual authorship, dates, or proof that Vaiśeṣika anticipated particle physics. The article instead follows arguments through sūtra, commentary, and criticism. The enduring question is methodological: which relations must a theory treat as basic, how does an unseen entity earn explanatory work, and does a taxonomy discover the world or organize how people speak about it?',
    ],
    [
      {heading: 'Reading the tradition', items: [
        {label: 'An attributed author', description: 'Kaṇāda names the traditional authority of a layered sūtra and commentary tradition, not a securely documented individual biography.'},
        {label: 'A changing system', description: 'Later interpreters and Nyāya interlocutors reshaped the arguments, so later clarity is not automatically the earliest teaching.'},
      ]},
      {heading: 'Key ideas', items: [
        {label: 'Categories', description: 'The classic categories explain how things have qualities, move, share kinds, remain distinct, and stand in unusually close relations.'},
        {label: 'Atoms and more', description: 'Imperceptible atoms help explain material compounds, but the system also recognizes selves, mind, time, space, and moral causation.'},
      ]},
      {heading: 'A useful caution', items: [
        {label: 'Not modern physics', description: 'The questions overlap with explanation and matter, but Vaiśeṣika atomism uses a very different ontology and evidential setting.'},
      ]},
    ],
    'kanada-vaisesika-sutra-1793',
    'This modern metal bas-relief in Shaheedi Park, Delhi, imagines Kaṇāda as a seated sage beside stylized natural forms. It is a contemporary commemoration, not an ancient portrait, manuscript witness, or evidence for the Vaiśeṣika Sūtra’s date and authorship. The object makes later public memory visible while refusing the familiar claim that Vaiśeṣika atomism was modern particle physics in advance.',
    'fnv1a64:d63d73b6bc75d230',
  ),
  patanjali: objectLed(
    'Patanjali',
    [
      '“Patañjali” is more secure as the traditional name attached to the Yoga Sūtra than as a recoverable biography. The identification with a grammarian or medical authority is disputed, and proposed dates range across centuries. The sūtras are transmitted with the commentary attributed to Vyāsa, and scholars disagree whether the Pātañjalayogaśāstra is one authorial work, a sūtra-commentary unit, or a layered formation. A commonly argued fourth-century textual horizon is useful but not a biography. The exhibit therefore follows a tradition of reading, commentary, and practice instead of inventing birth and death facts for a single polymath.',
      'Classical Yoga defines its task as restraint of the fluctuations of citta: the changing field of thought, memory, feeling, and attention within material nature. Puruṣa is consciousness, not a modern Cartesian mind or ordinary personality. Afflictions, karma, dispositions, and misidentification sustain bondage; discriminative insight loosens the error by which consciousness seems entangled in what it illuminates. The eight limbs connect ethical restraints and observances with posture, breath regulation, withdrawal of the senses, concentration, meditation, and samādhi. Posture is one limb, not the whole system. The role of a special Lord, īśvara, remains contested within its Sāṃkhya-related metaphysics.',
      'Patañjala Yoga developed within a broad South Asian field of ascetic, contemplative, Buddhist, Jain, and Brahmanical arguments; it should not be reduced either to generic wellness or to a timeless meditation manual. Later Yoga traditions changed goals, bodies, techniques, theologies, institutions, and public meanings, while modern global postural yoga is neither simply identical with nor wholly disconnected from that history. The many-hooded statue presents a later tradition that identifies Patañjali with Śeṣa. With no recorded maker, date, or location, it cannot depict the historical author or settle the text’s formation. It shows devotional reception. The question it can stage is practical and philosophical: what must be trained before attention becomes reliable, and what assumptions enter when stillness is called freedom?',
    ],
    [
      {heading: 'Text and history', items: [
        {label: 'A disputed author', description: 'Patañjali is the traditional name of a Yoga textual tradition; the relation among its sūtras, commentary, and other same-named authors remains debated.'},
        {label: 'A living reception', description: 'Later commentaries and practices are evidence of transmission, not noise that can simply be removed to reach an uncontested original.'},
      ]},
      {heading: 'Central ideas', items: [
        {label: 'Still the changing mind', description: 'Yoga trains attention so consciousness is no longer confused with changing thoughts, memories, feelings, and habits.'},
        {label: 'Eight connected limbs', description: 'Ethics, posture, breath, concentration, meditation, and samādhi form an integrated discipline; posture alone is not the system.'},
      ]},
      {heading: 'Continuing questions', items: [
        {label: 'The role of īśvara', description: 'The text gives a special Lord a real place, yet interpreters disagree about how this fits its related metaphysics.'},
        {label: 'Classical and modern yoga', description: 'Modern postural practice has historical connections to the tradition but cannot be treated as an unchanged copy of it.'},
      ]},
    ],
    'patanjali-statue',
    'This traditional statue presents Patañjali through a later identification with Śeṣa. Its file record does not supply a sculptor, date, or location, and it is not a historical likeness of a securely documented author. The image shows how a disputed textual authority acquired sacred biography and recognizable iconography through reception, while leaving the formation, date, and authorship of the Yoga work to textual and historical evidence.',
    'fnv1a64:390be2c49b474051',
  ),
  vedanta: objectLed(
    'Vedanta',
    [
      'Vedānta is not one school founded by one teacher or a single doctrine concealed inside a fixed archive. The name gathers rival traditions organized especially around the Upaniṣads and, in influential later formulations, the Bhagavad Gītā and Brahma Sūtra. “The end of the Veda” can name both a textual location and an asserted culmination of Vedic teaching; neither sense supplies a founding event. Commentaries, independent treatises, institutions, devotional communities, languages, and regional histories made the disagreements durable. Interpretation is where competing accounts of self, world, divine reality, knowledge, action, and liberation answer to shared authorities.',
      'Advaita associated with Śaṅkara argues that liberating knowledge removes a mistake about nondual Brahman and the deepest self. Viśiṣṭādvaita associated with Rāmānuja holds that selves and world are real yet wholly dependent within a differentiated divine reality. Dvaita associated with Madhva defends enduring distinctions among God, souls, and matter. Bhedābheda and other Vedānta formations complicate any tidy three-school survey. These positions are not incomplete steps toward a winner. They disagree over whether plurality is appearance, a real qualification, a distinct dependent order, or something else; they also differ over what scripture, perception, inference, ritual, devotion, surrender, grace, meditation, and knowledge can accomplish. Shared Sanskrit words do not guarantee shared meanings.',
      'Buddhist, Jain, Mīmāṃsā, Nyāya, and Sāṃkhya interlocutors helped shape these arguments rather than standing outside a sealed Hindu tradition. The installed Sanskrit manuscript in Telugu script is a Sāmaveda witness, not a Vedānta work. It is retained as a boundary object because Vedānta’s name and authority are historically related to the Vedic archive, while that relationship never turns every Vedic manuscript into Vedānta evidence. Read the competing figures in this room not as a roster but as rival answers to a persistent problem: how can unity and plurality, dependence and reality, agency and grace, be related without merely relabeling one another?',
    ],
    [
      {heading: 'The shared archive', items: [
        {label: 'Texts under interpretation', description: 'The Upaniṣads, Bhagavad Gītā, and Brahma Sūtra are central authorities, but they differ in genre, date, and argument.'},
        {label: 'Commentary as philosophy', description: 'Reading scripture is where schools defend incompatible accounts of self, world, divine reality, and liberation.'},
      ]},
      {heading: 'Rival readings', items: [
        {label: 'Advaita', description: 'Śaṅkara’s influential tradition treats liberating knowledge as removing a mistaken sense of ultimate separateness.'},
        {label: 'Viśiṣṭādvaita and Dvaita', description: 'Rāmānuja and Madhva defend different accounts of real dependent selves and world rather than versions of one nondual view.'},
      ]},
      {heading: 'Why disagreement matters', items: [
        {label: 'More than metaphysics', description: 'The disputes also concern interpretation, practice, devotion, grace, action, institutional authority, and who may pursue liberation.'},
        {label: 'No single answer', description: 'Vedānta is not identical with Advaita, and later universal claims about one shared truth are contested receptions rather than a classical consensus.'},
      ]},
    ],
    'samaveda-telugu-manuscript',
    'The source record identifies this Sanskrit manuscript in Telugu script as Sāmaveda Prapāṭhaka 1–6, not a Vedānta work. It is installed as a boundary object for distinguishing the broader Vedic textual archive from the rival interpretive traditions called Vedānta. The record does not establish a copying date, holding institution, or connection to a particular Vedānta school, so the manuscript supplies context for the boundary and no direct evidence for a Vedānta doctrine.',
    'fnv1a64:0b73c2abe19f7a44',
  ),
  shankara: objectLed(
    'Adi Shankara',
    [
      'Śaṅkara is the most influential early systematizer of Advaita Vedānta, not Vedānta’s founder or a timeless “Hindu monism.” He is usually placed around the eighth century CE, but the 788–820 span is traditional rather than documentary. Later sacred biographies of travel, debate, monastery founding, and a short life shaped Advaita identity without providing a contemporary dossier. The strongest historical access comes through major commentaries and the Upadeśasāhasrī, while the attribution of many hymns and manuals remains disputed. His work enters an older contest over the Upaniṣads, Bhagavad Gītā, and Brahma Sūtra rather than presenting nonduality as a private mystical feeling.',
      'Advaita begins from superimposition: consciousness appears limited by body, mind, agency, ownership, and biography because self and not-self are confused. Upaniṣadic teaching removes this ignorance by disclosing that ātman, understood as self-revealing consciousness, is not other than Brahman. This does not say an individual ego secretly creates the world, nor that tables, grief, duty, worship, teachers, and ethical action are simply nothing. They remain effective within ordinary experience, even if they lack independent ultimate reality. Knowledge rather than ritual action directly removes ignorance, but preparation matters: ethical discipline, discrimination, renunciation, attention, and inquiry form a student capable of understanding. Language works through instruction, negation, and context; it does not describe Brahman as one more object among others.',
      'Śaṅkara’s arguments took shape through disagreement with Mīmāṃsā, Sāṃkhya, Nyāya-Vaiśeṣika, Buddhist philosophers, and other Vedāntins. He also discusses devotion and a Lord within empirical religious life, which makes the slogan “knowledge versus every practice” misleading. Raja Ravi Varma’s c. 1904 image of Śaṅkara teaching disciples is an influential modern devotional reception, made roughly a millennium later. It does not portray a historical event, journey, or face. It lets visitors see how a teacher and lineage were remembered before returning to the textual question: what kind of error can knowledge remove, and how can words correct it without making the nondual into another thing?',
    ],
    [
      {heading: 'Key ideas', items: [
        {label: 'Superimposition', description: 'We mistake changing body, mind, and social identity for the consciousness that makes experience possible.'},
        {label: 'Nondual Brahman', description: 'Liberating knowledge denies that the deepest self is ultimately separate from Brahman; it does not make the personal ego all-powerful.'},
      ]},
      {heading: 'How the teaching works', items: [
        {label: 'Commentary and reasoning', description: 'Śaṅkara argues through readings of shared texts, using reason to clarify how their words undo a mistake rather than name another object.'},
        {label: 'Preparation and practice', description: 'Ethics, attention, renunciation, and devotion prepare understanding even though knowledge is said to remove ignorance directly.'},
      ]},
      {heading: 'Historical cautions', items: [
        {label: 'A disputed corpus', description: 'Major commentaries and the Upadeśasāhasrī are stronger evidence than every hymn or manual later placed under Śaṅkara’s name.'},
        {label: 'Later sacred biography', description: 'Stories of travel, debates, and institutions show Advaita reception but do not supply a simple contemporary life record.'},
      ]},
    ],
    'shankara-ravi-varma',
    'Raja Ravi Varma’s c. 1904 image shows Śaṅkara teaching disciples roughly a millennium after the philosopher’s likely lifetime. It is an influential modern devotional reception image, not a historical likeness or evidence for a particular journey, debate, or institution. The work visualizes a remembered teacher and lineage while the exhibit grounds chronology, corpus, and philosophy in the registered textual and scholarly sources.',
    'fnv1a64:167dc6f072d59a83',
  ),
  ramanuja: objectLed(
    'Ramanuja',
    [
      'Rāmānuja is an eleventh- and twelfth-century South Indian philosopher and a principal teacher of the Śrī Vaiṣṇava tradition, conventionally dated 1017–1137. Detailed accounts of teachers, temple conflict, exile, conversion, and institutional reform were shaped by later community memory and cannot all be treated as contemporary records. The Śrī Bhāṣya, Vedārthasaṅgraha, and Gītā Bhāṣya provide firmer access to his philosophical and theological project. Sanskrit commentary, Tamil devotional poetry, temple practice, and teacher lineages are connected without forming a simple founder story. His work gave one powerful account of how a differentiated world belongs to divine reality.',
      'Viśiṣṭādvaita means qualified nonduality, not an average of nondualism and dualism. Brahman, identified with Nārāyaṇa and inseparable from Śrī, is one reality possessing limitless auspicious qualities. Individual selves and the material world are real and irreducible, yet wholly dependent on Brahman. The body–self analogy expresses this unity: the universe is Brahman’s body and Brahman its inner ruler. A body is not identical with its indwelling self in every respect, so the analogy does not absorb finite persons into God or treat the world as a deficiency that completes divinity. Difference remains real without making dependent beings self-sufficient. Scriptural interpretation should disclose this qualified whole rather than cancel its own distinctions.',
      'Knowledge of dependence supports loving contemplation and service; action, knowledge, bhakti, surrender, and divine grace receive different emphases across texts and later communities. Liberation preserves a self’s individuality and relation to God rather than dissolving it into featureless identity. Questions about access, duty, and social hierarchy should remain visible rather than being converted into an uncomplicated modern egalitarianism. The displayed traditional sculpture is a devotional representation with no recorded maker, date, or location, not a lifetime likeness. Let it pose the philosophical question: what does dependence mean when the dependent is fully real, and can unity become more intelligible when difference is a relation within a whole rather than an error to be removed?',
    ],
    [
      {heading: 'Core claim', items: [
        {label: 'Qualified nonduality', description: 'God, selves, and world belong to one differentiated reality: the finite is real and dependent, not an illusion or an independent rival.'},
        {label: 'The body–self analogy', description: 'The universe is related to Brahman as a body to its inner self, expressing dependence without saying that finite beings are identical with God.'},
      ]},
      {heading: 'A path of relation', items: [
        {label: 'Devotion and grace', description: 'Knowledge, service, bhakti, surrender, and divine grace help explain liberation, though their balance varies across texts and later communities.'},
        {label: 'Liberation', description: 'Freedom preserves the self’s distinct relation to Nārāyaṇa rather than eliminating individuality.'},
      ]},
      {heading: 'Works and community', items: [
        {label: 'Major commentaries', description: 'The Śrī Bhāṣya and Vedārthasaṅgraha argue through the shared Vedānta archive instead of simply announcing a doctrine.'},
        {label: 'Layered memory', description: 'Sanskrit scholarship, Tamil devotion, temple practice, and later biography are connected but must not be flattened into one historical voice.'},
      ]},
    ],
    'ramanuja-statue-cc0',
    'This traditional sculptural representation identifies Rāmānuja through devotional iconography, but its file page does not record a maker, date, or location. It cannot function as a lifetime portrait. The object shows a continuing presence in worship, lineage, and institutional memory beyond the arguments preserved in his works, while leaving biography, chronology, and the history of Viśiṣṭādvaita to the article and its registered sources.',
    'fnv1a64:91d8b2d04a0ce897',
  ),
  madhva: objectLed(
    'Madhva',
    [
      'Madhva, also known as Ānandatīrtha, worked in thirteenth-century coastal Karnataka and is conventionally dated around 1238–1317. Later biographies connect him to miracles, journeys, debates, and divine identity. These narratives shaped the Dvaita community, but his works provide firmer grounds for philosophical reconstruction. Udupi institutions preserve lineage without proving that every later doctrine was fixed in Madhva’s lifetime. Later figures including Jayatīrtha and Vyāsatīrtha systematized his corpus, so their technical refinements cannot simply be projected back onto a single author.',
      'Dvaita begins with one independent reality, Viṣṇu, and a world of dependent but real souls, matter, time, space, and other realities. “Dualism” is convenient but incomplete: Madhva is not simply proposing two substances. Difference is not ignorance waiting to disappear. Later summaries name five enduring differences among God, souls, matter, and individual things; this is a useful orientation when read through texts and school transmission rather than as an isolated slogan. Perception, inference, and scripture all matter to a realist account of knowledge. Liberation comes through correct awareness of dependence, devotion, divine grace, and a soul’s proper relation to Viṣṇu; it perfects rather than abolishes individuality. Madhva’s reading of shared Vedānta authorities therefore contests both Śaṅkara’s ultimate non-difference and Rāmānuja’s body–self unity.',
      'The tradition also develops a hierarchy among souls and difficult claims about differentiated destinies. Those positions should be stated rather than softened, because they raise persistent questions about justice, agency, grace, and exclusion. The image at Pajaka is a devotional object associated with Madhva’s remembered birthplace and institutional reception. It is not a documented likeness made from life, nor does it prove miraculous biography or settle how Dvaita developed. It makes sacred geography and lineage visible. Read it beside the arguments: can complete dependence coexist with irreducible difference, and what ethical pressure follows when a philosophy of devotion joins a hierarchy of souls to an account of divine governance? The answer cannot be supplied by a serene image alone.',
    ],
    [
      {heading: 'The Dvaita claim', items: [
        {label: 'One independent reality', description: 'Viṣṇu alone is independent; souls and the world are real but depend completely on divine reality.'},
        {label: 'Difference endures', description: 'God, souls, matter, and individual things remain distinct rather than becoming one at liberation.'},
      ]},
      {heading: 'Knowing and liberation', items: [
        {label: 'Reliable sources', description: 'Perception, inference, and scripture work together in a realist account of how people can know their dependence.'},
        {label: 'Devotion and grace', description: 'Liberation deepens a soul’s knowledge and relation to Viṣṇu without eliminating its individuality.'},
      ]},
      {heading: 'Continuing debates', items: [
        {label: 'A hierarchy of souls', description: 'The tradition’s claims about unequal capacities and destinies raise difficult questions about justice, responsibility, and grace.'},
        {label: 'Later development', description: 'Later thinkers sharpened Dvaita arguments, so their formulations cannot automatically be assigned to Madhva’s own corpus.'},
      ]},
    ],
    'madhva-pajaka-vigraha',
    'This traditional image at Pajaka connects Madhva to a remembered birthplace and continuing sacred geography. It is not a documented likeness made from life, and its institutional associations belong to later reception as well as historical lineage. The object makes a community’s devotional geography visible while leaving miraculous biography, exact chronology, and the development of Dvaita arguments open to the textual and scholarly evidence registered for the article.',
    'fnv1a64:54ca29e2e5cec7f5',
  ),
  vasubandhu: objectLed(
    'Vasubandhu',
    [
      'Vasubandhu is a major Indian Buddhist analyst of experience, yet fourth- to fifth-century chronology, biography, and corpus remain uncertain. Traditional stories of a career from Sarvāstivāda Abhidharma, through Sautrāntika criticism, to Yogācāra under Asaṅga are not a documented sequence. The one- or two-author debate likewise cannot turn every text into a single autobiography. The *Abhidharmakośabhāṣya* is both exposition and criticism of inherited positions; its reported, provisional, and argumentative voices must not be made into one fixed school identity. What endures across the uncertainty is a demanding inquiry into how persons, karma, and experience can be causally intelligible without a permanent owner behind them.',
      'That inquiry changes when works associated with Vasubandhu examine *vijñaptimātra*, variously rendered representation-only, cognition-only, or mere ideation. The *Twenty Verses* and *Thirty Verses* test how subject-object experience is constructed through causal patterns, habits, and conceptual projection. Dreams and shared karmic appearances make the issue harder than private fantasy: they are arguments about error and coordination, not proof that only one mind exists. The three natures distinguish projected duality, dependent causal flow, and that flow understood without the projection. Scholars still disagree over the idealist, phenomenalist, epistemic, and therapeutic stakes. In every reading, analysis serves liberation by challenging the grasping that treats self and object as independently given.',
      'Unkei’s wooden statue at Kōfuku-ji makes Vasubandhu visible through a Japanese devotional afterlife roughly eight centuries after his probable lifetime. Its individualized monk is neither a portrait from life nor evidence for a disputed biography, corpus, or philosophical affiliation. More securely, the image records a tradition that made a difficult textual authority present for later practice. Sanskrit materials survive unevenly, while Chinese and Tibetan translations, commentaries, and institutions have carried the arguments in different ways. Let the statue direct attention away from a settled face and toward a continuing question: how can causal continuity preserve responsibility and shared experience without reinstalling an unchanging self?',
    ],
    [
      {heading: 'Textual cautions', items: [
        {label: 'A complex corpus', description: 'Abhidharma and Yogācāra works are strongly linked to Vasubandhu, but authorship, chronology, and a neat career narrative remain contested.'},
        {label: 'Argumentative voices', description: 'The *Abhidharmakośabhāṣya* reports and criticizes positions, so it is not a neutral statement of one timeless doctrine.'},
      ]},
      {heading: 'Central problems', items: [
        {label: 'No permanent self', description: 'A person functions through changing aggregates and causal continuity without an independent, unchanging owner of experience.'},
        {label: 'Representation-only', description: '*Vijñaptimātra* investigates constructed subject-object experience; it is not the claim that one private mind invents everything.'},
      ]},
      {heading: 'Read across transmission', items: [
        {label: 'Three natures', description: 'A framework distinguishing projected duality, dependent causal processes, and their nondual understanding.'},
        {label: 'Chinese and Tibetan witnesses', description: 'Translations and commentaries are indispensable records of transmission, not transparent copies of a fixed original.'},
      ]},
    ],
    'vasubandhu-statue',
    'Unkei’s c. 1208 wooden Kōfuku-ji statue, photographed by Shihachi Fujimoto in 1952, is a later Japanese devotional representation roughly eight centuries after Vasubandhu. It is not a lifetime likeness and cannot settle his contested biography, corpus, or school affiliations. It documents a powerful reception history that made a textual authority visible for later Buddhist communities.',
    'fnv1a64:76bc566dec6793ef',
  ),
  'buddhist-epistemology': objectLed(
    'Buddhist Epistemology',
    [
      '“Buddhist epistemology” is a modern umbrella for varied South Asian and Tibetan pramāṇa traditions, not a timeless Buddhist consensus or a school invented on one date. Earlier Buddhist analysis, debate, and non-Buddhist argument supplied the setting in which Dignāga systematized a program and Dharmakīrti revised it. Their importance should not erase other Buddhist knowledge accounts. This is an Indian practice of public proof: thinkers ask what a reason must establish for another person, and how cognition, language, and liberation belong in the same inquiry. Later commentators disagree over the arguments, their metaphysical commitments, and their purposes.',
      'A characteristic account recognizes perception and inference as two reliable routes. Perception is nonconceptual in a technical sense and concerns particulars; inference works through signs, concepts, and relations that need discipline. *Apoha*, or exclusion, explains how words can guide thought without grasping an independently real universal: a term functions by excluding what is other than its target. That is not the slogan “not non-cow,” nor a claim that language is useless. Testimony, justification, reflexive awareness, and successful action remain distinct questions. Dharmakīrti’s link between reliability, causal efficacy, and practical success does not simply define truth as whatever works; an appropriate causal or inferential route is still at issue.',
      'The photograph records monastic debate at Sera Monastery in 2008, a Tibetan educational practice shaped through centuries of translation, commentary, and institutional change. Its raised hand is not evidence for an Indian classroom in Dignāga’s or Dharmakīrti’s lifetime, nor does it stand for every Buddhist intellectual tradition. It does show why these arguments were made public: a claim must survive reasons, objections, and shared examples. Sanskrit fragments, Tibetan translations, critics’ quotations, and divergent curricula give the tradition unequal textual routes. The object can prompt a careful exercise: distinguish what appears from what is inferred, ask what connects a sign to its conclusion, and notice how a theory of language risks importing fixed essences back into thought.',
    ],
    [
      {heading: 'Reliable cognition', items: [
        {label: 'Perception', description: 'A nonconceptual awareness of particulars, distinguished from the classificatory work of words and judgment.'},
        {label: 'Inference', description: 'Reasoning from a sign to a conclusion; its force depends on a disciplined relation, not merely persuasive speech.'},
      ]},
      {heading: 'Language and proof', items: [
        {label: 'Apoha', description: 'An exclusion account of concepts and words that avoids treating universals as independently real while preserving meaningful communication.'},
        {label: 'Public argument', description: 'Indian proof practices organize reasons, examples, and objections so another person can assess a conclusion.'},
      ]},
      {heading: 'A changing tradition', items: [
        {label: 'Dignāga and Dharmakīrti', description: 'A foundational systematizer and a major reviser, not two authors of one unchanged doctrine.'},
        {label: 'Tibetan reception', description: 'Translation and curricular traditions preserve major arguments while developing distinct later interpretations.'},
      ]},
    ],
    'buddhist-monastic-debate',
    'Antoine Taveneaux’s 2008 photograph shows monastic debate at Sera Monastery, Lhasa. It documents a later Tibetan scholastic practice shaped by translation and commentary, not Indian debate in Dignāga’s or Dharmakīrti’s lifetime. The object makes the continuing institutional life of reasons visible while its date and place keep historical transmission in view.',
    'fnv1a64:b88aedda6865aa2b',
  ),
  dignaga: objectLed(
    'Dignāga',
    [
      'Dignāga is conventionally placed around 480–540 CE, though secure dates and detailed biography are lacking. Later accounts associate him with teachers, monasteries, and travel, but they do not supply a modern itinerary. His achievement is better described as foundational systematization than as the invention of all Buddhist or Indian reasoning. In a field already shaped by Buddhist analysis and rival debate, he organized perception, inference, public proof, and language around two pramāṇas, or reliable routes of cognition. The retrospective label “Buddhist epistemological school” can help visitors locate a lineage, but it should not disguise later diversity as a secure ancient institution.',
      'The *Pramāṇasamuccaya* distinguishes nonconceptual perception of particulars from inference, which works through signs and conceptual generality. A sound reason must occur in the subject, occur in relevant similar cases, and be absent from relevant dissimilar cases. This threefold discipline makes proof answerable to another thinker rather than a private association. *Apoha* then asks how concepts and words can function if they do not grasp mind-independent universals: exclusion helps explain stable communication without making language empty. The full Sanskrit work is not extant as a single stable witness; fragments, Tibetan translations, quotations, and commentaries preserve different routes. That evidence means a later explanation can be vital without becoming Dignāga’s verbatim voice.',
      'The contemporary Buddhavanam relief depicts Dignāga as a teacher of logic, a public commemoration rather than a historical likeness, manuscript witness, or reconstruction of a particular debate. Its classroom scene belongs to twenty-first-century reception, while the philosopher’s arguments are traced through a fragmentary multilingual textual record. Dharmakīrti later transformed this inheritance rather than merely completing a system already fixed, and Indian and Tibetan readers produced competing Dignāgas. Use the relief to stage a live question: when a concept groups distinct particulars, what makes the grouping responsible, and what must a reason show before another person should accept its conclusion?',
    ],
    [
      {heading: 'Two reliable routes', items: [
        {label: 'Nonconceptual perception', description: 'Perception presents a particular before the naming and classification that make it available for ordinary thought and speech.'},
        {label: 'Inference', description: 'A conclusion is reached through a sign whose connection to the case must be disciplined and contestable.'},
      ]},
      {heading: 'Language and proof', items: [
        {label: 'Three characteristics', description: 'A good reason is present in the case, present in relevant similar cases, and absent in relevant dissimilar cases.'},
        {label: 'Apoha', description: 'Exclusion explains conceptual generality without a separately real universal; it is a contested theory, not a magic formula.'},
      ]},
      {heading: 'Read the witnesses', items: [
        {label: 'Pramāṇasamuccaya', description: 'The central synthesis survives through fragments, Tibetan translations, quotations, and commentary rather than one complete Sanskrit manuscript.'},
        {label: 'Dharmakīrti’s revision', description: 'The successor develops causal and justificatory arguments that should not be silently assigned to Dignāga.'},
      ]},
    ],
    'dignaga-teaching-logic-relief',
    'This contemporary Buddhavanam stupa-drum relief, photographed by Anandajoti Bhikkhu in 2024, identifies Dignāga through teaching Buddhist logic. It is a public commemorative monument, not a historical likeness, manuscript witness, or record of a particular debate. It offers an invitation to reasoning while the exhibit grounds his arguments in fragments, Tibetan translations, and later commentary.',
    'fnv1a64:bb483370b06ec29f',
  ),
  dharmakirti: objectLed(
    'Dharmakīrti',
    [
      'Dharmakīrti is often dated to the seventh century, but proposed dates, South Indian origin, teachers, and monastic career remain uncertain or rest on later tradition. His seven-work corpus, especially the *Pramāṇavārttika*, is firmer evidence, even though its transmission and order raise difficult scholarly questions. He is not merely Dignāga’s expositor. Dharmakīrti revises the pramāṇa project by connecting reliable cognition to appropriate causal and inferential routes, while retaining Buddhist commitments about impermanence, compassion, and liberation. His arguments make knowledge a practical and normative issue without making every successful action a measure of truth.',
      'Perception and inference remain distinct. Particulars have causal efficacy (*arthakriyā*), while concepts construct repeatable kinds through exclusion; reliable cognition is nondeceptive because of the right causal or inferential connection, not because a belief happens to be useful. Momentariness is a technical causal thesis, not the simple thought that things change. Arguments about pervasion, induction, reflexive awareness, other minds, scripture, rebirth, and the Buddha’s authority show that pramāṇa inquiry is not a religiously neutral appendix. The opening praise of the Buddha joins epistemic authority to compassion and cultivation, while interpreters continue to dispute how justification, extraordinary cognition, and conditional scriptural authority fit together.',
      'The Cleveland Museum of Art’s silver-copper portrait was made in Tibet around the fifteenth or sixteenth century, roughly eight centuries after Dharmakīrti. It is a later traditional representation, not a likeness from life or evidence for contested chronology. As a surviving reception object, it directs visitors to the Indian commentators, Tibetan translations, and scholastic lineages that preserved and reorganized the corpus. Its limit helps focus the real problem: can a causal account of nondeceptive cognition explain why a reason is normatively binding without reducing truth to usefulness, and how does a liberating aim change what counts as epistemic success?',
    ],
    [
      {heading: 'Reliable cognition', items: [
        {label: 'Causal efficacy', description: 'Particular things can make a difference; this causal capacity helps explain why cognition can be answerable to an object.'},
        {label: 'Nondeception', description: 'Successful action matters, but a cognition must also arise from an appropriate causal or inferential route.'},
      ]},
      {heading: 'Arguments under pressure', items: [
        {label: 'Momentariness', description: 'A technical claim about causal production and change, not the everyday observation that everything eventually alters.'},
        {label: 'Scripture and authority', description: 'Scriptural claims are conditional and fallible rather than an independent, infallible source of knowledge.'},
      ]},
      {heading: 'A received corpus', items: [
        {label: 'Pramāṇavārttika', description: 'The central work develops Dignāga’s framework through perception, inference, language, and Buddhist authority.'},
        {label: 'Tibetan lineages', description: 'Translations and later curricula preserve Dharmakīrti’s arguments while creating interpretations not identical with the Indian author.'},
      ]},
    ],
    'dharmakirti-cleveland-silver',
    'This Tibetan silver-copper portrait of Dharmakīrti, now at the Cleveland Museum of Art, dates to about the fifteenth or sixteenth century. Made roughly eight centuries after him, it is a later traditional representation rather than a lifetime likeness or proof of disputed chronology. It makes Tibetan reception materially present while the article follows texts, translations, and arguments.',
    'fnv1a64:ff59ae4506422148',
  ),
};
