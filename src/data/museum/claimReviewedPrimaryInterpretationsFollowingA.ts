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
  plaqueSubtitleLines: 1 | 2 | 3 | 4 = 4,
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
    plaqueSubtitleLines,
  },
  objectInterpretations: {[assetId]: objectText},
  review: {
    status: 'standard-compliant',
    reviewedOn: '2026-08-10',
    method: 'Reconciled separately against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.',
    lock,
  },
});

/**
 * Eight title-local primary readings integrated after their article claim
 * reviews and the accompanying asset and plaque reconciliation.
 */
export const CLAIM_REVIEWED_PRIMARY_INTERPRETATIONS_FOLLOWING_A:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  descartes: objectLed(
    'René Descartes',
    [
      'René Descartes uses methodic doubt as a temporary discipline: if a belief can be doubted, it is withheld while inquiry looks for a firmer starting point. The cogito—thinking cannot occur without a thinker—does not by itself yield a complete world, a permanent private self, or an excuse to ignore experience. Descartes then argues that clear and distinct perception can support knowledge, through a controversial account of God and error. The argument is powerful precisely because its guarantee is disputed. It asks what could make inquiry answerable to truth when senses, dreams, inherited authority, and rapid inference can mislead.',
      'Mind and body make that demand harder rather than simpler. Descartes distinguishes thinking from extended matter and develops a mechanical account of nature, yet he also writes about sensation, imagination, passions, medicine, and the practical union of a living person with a body. Princess Elisabeth pressed the central difficulty: how can an unextended mind move or be affected by an extended body? Her questions are not a footnote to a finished dualism; they show a philosopher revising explanation under pressure. Descartes’s method, metaphysics, natural philosophy, and moral advice belong to a changing body of work, not one slogan about certainty.',
      'Jan Baptist Weenix’s c. 1647–49 oil portrait gives Descartes a composed, book-bearing public presence. The opened volume bears the staged phrase mundus est fabula, “the world is a fable,” which can invite questions about appearance, representation, and learned display. The painting can establish neither the cogito nor the truth of dualism; it cannot show how doubt proceeded, settle Elisabeth’s objection, or turn a painted inscription into a doctrine. It can show how a living thinker was presented in a Dutch artistic setting. Let the object hold two things together: philosophical writing reaches for certainty, while its author remains historically situated, interpreted, and pictured by others.'
    ],
    [
      {heading: 'A method under pressure', items: [
        {label: 'Methodic doubt', description: 'A temporary withholding of beliefs open to doubt, meant to test foundations; it is not a recommendation to remain skeptical about everything forever.'},
        {label: 'Cogito', description: 'Descartes’s claim that thinking establishes the thinker’s existence in the act of doubt, not a full theory of personality, memory, or the external world.'},
      ]},
      {heading: 'The disputed guarantee', items: [
        {label: 'Clear and distinct perception', description: 'A mode of apprehension Descartes treats as a mark of truth, whose relation to his argument about God remains a major interpretive problem.'},
        {label: 'Mind and body', description: 'Thinking and extension are distinguished, yet human experience requires explaining sensation, action, passion, and the lived union of both.'},
      ]},
      {heading: 'A necessary interlocutor', items: [
        {label: 'Princess Elisabeth', description: 'Elisabeth of Bohemia challenged Descartes to explain mind–body interaction and developed her own philosophical correspondence, rather than serving as a passive recipient.'},
      ]},
    ],
    'rationalism-descartes-weenix',
    'Jan Baptist Weenix painted this c. 1647–49 oil portrait of René Descartes, now in the Centraal Museum Utrecht (7386). The opened book bears the staged phrase mundus est fabula. It can document a lifetime public image and a painted learned setting; it cannot establish Descartes’s arguments, prove a reading of the inscription, show his private working method, or settle the problem of mind–body interaction.',
    'fnv1a64:2d159420e2d07c51',
  ),
  spinoza: objectLed(
    'Baruch Spinoza',
    [
      'Baruch Spinoza asks readers to understand human beings as part of nature rather than as a separate kingdom within it. In the Ethics, God or Nature names a single, infinite reality expressed through attributes; minds and bodies are not two substances pushing one another, but different expressions of one order. This does not make every event easily intelligible or turn people into inert things. Spinoza’s difficult vocabulary—substance, attribute, mode, conatus, and adequate idea—builds an account of dependence, power, and understanding. His geometric form signals an ambition for demonstration, while the argument’s steps remain open to disagreement about what exactly has been shown.',
      'Freedom in this setting is not exemption from causation. It is an increase in active understanding: seeing how one’s affects arise, forming more adequate ideas, and participating in relations that enlarge one’s power to act. That distinction blocks both fatalism and a fantasy of unconstrained choice. Spinoza’s political and religious criticism likewise needs context. The Theological-Political Treatise challenges superstition and argues for freedom to philosophize, but it does not reduce religion to one motive or provide a ready modern program. The 1656 Amsterdam herem marks a severe communal break whose causes remain disputed; it should not become a single-cause story of heroic persecution.',
      'This 1677 posthumous engraving pairs an oval portrait of Spinoza with a Dutch memorial poem in the Nagelate Schriften. The sheet makes reception and publication visible: a thinker whose Ethics appeared after his death is framed by a printer’s image and commemorative words. It cannot verify his appearance without mediation, establish why the herem occurred, or decide whether the poem captures his philosophy. Nor can an engraved face demonstrate substance monism or freedom. What it can establish is the early circulation of a public Spinoza. Read its portrait and poem as a carefully made threshold to contested texts, not as a transparent witness to the man.'
    ],
    [
      {heading: 'One order, many expressions', items: [
        {label: 'God or Nature', description: 'Spinoza’s name for one infinite reality, not a simple equation of a personal ruler with the natural world.'},
        {label: 'Mind and body', description: 'Two attributes through which the same order is expressed; this rejects causal interaction between separate mental and material substances.'},
      ]},
      {heading: 'Freedom without exemption', items: [
        {label: 'Conatus', description: 'The striving by which each thing persists in being, a key to Spinoza’s account of affects, power, and human life.'},
        {label: 'Adequate ideas', description: 'Understanding causes in ways that make a person more active; this is not a promise of total knowledge or control.'},
      ]},
      {heading: 'History needs restraint', items: [
        {label: 'Herem', description: 'The Amsterdam Jewish community’s 1656 ban; its precise causes are not settled by one surviving explanation.'},
        {label: 'Theological-Political Treatise', description: 'Spinoza’s argument about scripture, superstition, civil order, and freedom to philosophize, written for a volatile political and religious world.'},
      ]},
    ],
    'rationalism-spinoza-engraving',
    'This 1677 engraved frontispiece in the posthumous Nagelate Schriften presents an oval portrait of Spinoza above a six-line Dutch memorial poem. It can establish an early printed act of commemoration and publication after his death; it cannot supply an unmediated likeness, explain the 1656 herem, prove the engraver or poem’s philosophical judgment, or demonstrate Spinoza’s account of substance, affects, and freedom.',
    'fnv1a64:ca4c56cc2c8a26b1',
  ),
  leibniz: objectLed(
    'Gottfried Wilhelm Leibniz',
    [
      'Gottfried Wilhelm Leibniz develops philosophy across published essays, unfinished drafts, correspondence, scientific work, diplomacy, legal history, and controversy. The familiar system of monads, sufficient reason, pre-established harmony, and possible worlds is therefore a route through a changing corpus, not a single book finished for one audience. Monads are simple centers of perception rather than tiny physical atoms; their coordination is explained by harmony rather than direct causal exchange. The principle of sufficient reason asks why there is something rather than nothing and why this order obtains, while the identity of indiscernibles challenges the thought that two wholly alike things could still differ merely by place.',
      'Leibniz’s language of the best possible world is often reduced to cheerfulness about suffering. It is instead part of a theodicy that attempts to connect divine wisdom, freedom, contingency, evil, and the richness of creation—an attempt that has provoked durable objection. A possible world is not a parallel universe waiting somewhere else, and a sufficient reason is not always a reason humans can discover. His exchange with Samuel Clarke makes space, time, divine action, and natural order philosophically public. It also reminds visitors that Leibniz’s positions developed through debate, letter writing, and problems shared with opponents rather than through an isolated system-builder’s pronouncements.',
      'Christoph Bernhard Francke’s 1695 oil portrait places Leibniz in the formal dress and composure of a courtly learned official. It identifies a historical subject in a lifetime artistic setting and gives texture to a career that moved among courts, academies, correspondence, and archives. The canvas cannot picture a monad, confirm pre-established harmony, decide the theodicy, or prove that a sitter accepted every later formulation attached to his name. It can caution against that false transparency. Leibniz’s most abstract claims reached readers through institutions, patrons, letters, disputes, and visual conventions whose authority differs from philosophical argument.'
    ],
    [
      {heading: 'A changing corpus', items: [
        {label: 'Published works, drafts, and letters', description: 'Leibniz’s ideas appear in different genres and dates; a compact system must not erase development, audience, and unfinished work.'},
        {label: 'Monads', description: 'Simple, nonphysical centers of perception and activity, not material particles or miniature minds located inside bodies.'},
      ]},
      {heading: 'Why this order?', items: [
        {label: 'Sufficient reason', description: 'The demand that facts have an explanation or ground; it does not mean every explanation is immediately available to human inquiry.'},
        {label: 'Pre-established harmony', description: 'Leibniz’s account of coordinated mental and bodily events without direct causal exchange between separate substances.'},
      ]},
      {heading: 'Contested consequences', items: [
        {label: 'Possible worlds', description: 'Complete ways reality might have been, considered in Leibniz’s account of divine choice, contingency, and the actual world.'},
        {label: 'Theodicy', description: 'An attempt to reconcile God, freedom, and evil that remains a source of serious criticism rather than a dismissal of suffering.'},
      ]},
    ],
    'rationalism-leibniz-francke',
    'Christoph Bernhard Francke’s 1695 oil portrait of Gottfried Wilhelm Leibniz is held by the Herzog Anton Ulrich Museum, Braunschweig (GG 558). It establishes a lifetime courtly portrait tradition and the sitter’s learned public presentation. It cannot make monads visible, prove the principle of sufficient reason, decide the theodicy, or show whether any particular draft, letter, or published formulation captures Leibniz’s final view.',
    'fnv1a64:ba6b4fc434d6cef0',
  ),
  locke: objectLed(
    'John Locke',
    [
      'John Locke begins with a practical question about the limits and sources of human understanding. The Essay rejects innate ideas in favor of experience: sensation gives materials from the world, reflection attends to the mind’s own operations, and complex ideas are formed through comparison, abstraction, and language. This does not make a mind a blank passive container, nor does it make every experience equally trustworthy. Locke examines probability, testimony, identity, education, religion, and the limits of knowledge alongside sensation. His account presses a lasting problem: how can fallible people reason responsibly when certainty is scarce but action cannot wait?',
      'Locke’s political writing links natural rights, consent, law, property, trust, and resistance to arbitrary power. Government is legitimate only under conditions it can betray, so people may have a right to resist rulers who dissolve that trust. Yet property is not merely an innocent celebration of work: Locke’s arguments about appropriation, improvement, money, and territory have been read alongside colonial administration, dispossession, and enslavement. His own administrative and financial entanglements matter without licensing unsupported claims about direct intention in every policy. A responsible reading preserves both the force of consent against arbitrary rule and the exclusions that helped make liberal political language historically consequential.',
      'John Greenhill’s 1672 oval portrait shows a young Locke before the Essay and Two Treatises were published. Its long curled hair, draped dark clothing, and composed gaze make a period public image, not a visual summary of empiricism or liberalism. The canvas cannot establish the source of ideas, prove consent, demonstrate a right of resistance, or reveal a sitter’s intentions about colonial policy. It can establish that Locke was represented in a particular seventeenth-century artistic idiom. The object therefore directs visitors back to arguments and archival context, where an account of experience and a politics of rights must each be tested rather than read from a face.'
    ],
    [
      {heading: 'Experience and inquiry', items: [
        {label: 'Sensation and reflection', description: 'The two sources Locke uses to explain simple ideas: experience of the world and attention to the mind’s own operations.'},
        {label: 'Probability', description: 'Reasoned judgment short of certainty, essential for action where demonstration is unavailable and testimony must be weighed.'},
      ]},
      {heading: 'A conditional politics', items: [
        {label: 'Consent and trust', description: 'Political authority must answer to those governed and can forfeit legitimacy when it violates the ends for which it was entrusted.'},
        {label: 'Resistance', description: 'A right to oppose arbitrary rule under specified conditions, not a general license for private preference or violence.'},
      ]},
      {heading: 'Property’s pressure', items: [
        {label: 'Appropriation and improvement', description: 'Locke’s account of labor, land, money, and property, which requires historical reading beside colonial administration and dispossession.'},
        {label: 'Colonial entanglement', description: 'Locke held administrative and financial connections to colonial projects; this matters without turning disputed causal claims into settled intent.'},
      ]},
    ],
    'empiricism-locke-greenhill-portrait',
    'John Greenhill painted this oval oil portrait of John Locke in 1672; it is held by the National Portrait Gallery, London (NPG 3912). It can identify a lifetime image and seventeenth-century portrait convention. It cannot establish the Essay’s theory of ideas, demonstrate political consent or resistance, reveal Locke’s intent in colonial administration, or settle later disputes about property, rights, and exclusion.',
    'fnv1a64:ca39bd21999a6b5b',
  ),
  hume: objectLed(
    'David Hume',
    [
      'David Hume makes a science of human nature begin with experience, habit, feeling, and the limits of reason. In the Treatise, ideas derive from impressions, but ordinary life also depends on imaginative association and custom. Causal belief is not a rational glimpse of a necessary connection hidden in events: repeated conjunction trains expectation. That skeptical diagnosis does not say that science, memory, or daily action are pointless. It asks what licenses them and finds that human practices continue before proof can be complete. Hume’s later Enquiries revise presentation and emphasis; neither book should be silently treated as a transparent duplicate of the other.',
      'Hume gives passion and sentiment a central role in morality, action, taste, religion, and social life. “Reason” does not simply disappear; it informs means, evidence, and consequences, but it does not by itself move a person or generate every evaluative commitment. Sympathy helps explain moral responsiveness without guaranteeing universal inclusion. The famous problem of induction and the question of the self remain active because Hume’s skeptical arguments resist easy modern labels. His record also includes grave failure: a racist footnote first added in 1753 and retained in revised editions asserts a hierarchy of peoples. It must be named, not softened by influence or separated from the author’s public philosophical work.',
      'Allan Ramsay’s 1754 oil portrait presents Hume in an oval frame, wearing a reddish turban and richly embroidered waistcoat. It belongs to the social world of eighteenth-century Edinburgh and the Select Society, but visual character is not philosophical evidence. The painting cannot show that custom grounds causal belief, disclose Hume’s temperament, prove skepticism, or tell visitors how to weigh the racist hierarchy in his writing. It can establish a dated lifetime representation and a setting of sociability around a writer whose inquiries moved between study, publication, conversation, and public controversy. Let its polish make the interpretive distance visible, rather than making a portrait authorize an easy Hume.'
    ],
    [
      {heading: 'How belief works', items: [
        {label: 'Impressions and ideas', description: 'Hume distinguishes vivid experience from its less vivid ideas, then studies how imagination and association connect those materials.'},
        {label: 'Custom', description: 'Repeated experience creates expectation, explaining causal belief without claiming that reason directly perceives necessary connection.'},
      ]},
      {heading: 'Reason, passion, sentiment', items: [
        {label: 'Moral sentiment', description: 'Feeling and sympathy help explain approval and disapproval; this is not a claim that every existing sentiment is just.'},
        {label: 'The self', description: 'Hume’s examination of a changing bundle of perceptions challenges a simple permanent-self picture without ending questions about persons and responsibility.'},
      ]},
      {heading: 'Read the whole record', items: [
        {label: 'Treatise and Enquiries', description: 'Related but differently framed works; revisions matter when tracing the development and public presentation of Hume’s arguments.'},
        {label: 'Racist footnote', description: 'A hierarchy of peoples added in 1753 and retained in later revisions, a grave claim that must remain visible in interpreting Hume’s corpus.'},
      ]},
    ],
    'hume-ramsay-portrait-1754',
    'Allan Ramsay painted this 1754 oil portrait of David Hume, held by the National Galleries of Scotland (PG 3521). It can establish a lifetime social portrait made in Edinburgh, not a visual diagnosis of Hume’s character or doctrine. It cannot demonstrate his account of custom, settle skepticism, show the relation of reason and passion, or excuse, explain away, or establish the meaning of the racist hierarchy in his published writing.',
    'fnv1a64:339fe69a984f5cd9',
  ),
  fichte: objectLed(
    'Johann Gottlieb Fichte',
    [
      'Johann Gottlieb Fichte asks what must be in play when a finite person experiences a world, recognizes another person, and takes responsibility for action. The Wissenschaftslehre does not say that an individual ego invents mountains or other people. It examines self-activity and the resistance or “check” through which finite agency encounters limits, objects, and demands it has not simply chosen. Fichte’s language of the I and not-I is difficult because it concerns conditions of experience and norm-governed activity, not an invitation to private wishful thinking. His project inherits Kant while changing the relation among freedom, knowledge, practical striving, and philosophical system.',
      'Right and ethics make the account public. Persons must recognize one another as free agents, and institutions address embodiment, property, coercion, labor, education, and social dependence. Fichte’s work changed across early, middle, and later formulations, so “the Fichtean self” cannot bear every later claim unchanged. His political speeches and national rhetoric demand direct critical attention. Cultural and linguistic forms of nationhood do not make later racialized or exclusionary appropriations identical to his position, but neither do they make his rhetoric harmless. The exhibit should preserve those historical openings, pressures, and uses rather than grant a philosophy of freedom an automatic innocence.',
      'Friedrich Bury’s 1801 drawing presents Fichte in a dark high-collared coat, facing right. An official Jena record identifies the original charcoal drawing, held by Friedrich Schiller University Jena, as the model for a related engraving; the displayed reproduction also has an immediate 1995 print-source chain that should be disclosed. The image cannot depict self-positing, show a deduction in the Wissenschaftslehre, prove a theory of recognition, or decide the politics of the Addresses to the German Nation. It can make the evidentiary question visible: portraits carry their own chains of reproduction, attribution, and collection history. It is a cautious threshold to Fichte’s texts, not a secure warrant for the exhibit’s claims about him.'
    ],
    [
      {heading: 'Activity and resistance', items: [
        {label: 'The I and not-I', description: 'Fichte’s terms for self-activity and the experienced limitation or resistance through which finite agency becomes intelligible.'},
        {label: 'Wissenschaftslehre', description: 'Fichte’s changing account of the foundations of knowledge, action, and self-consciousness; it is not a claim that a private mind creates the world.'},
      ]},
      {heading: 'Freedom with others', items: [
        {label: 'Recognition', description: 'Persons must acknowledge one another as free agents, making right and responsibility social rather than merely inward achievements.'},
        {label: 'Right', description: 'Fichte’s political and legal thought about institutions, property, coercion, and relations among embodied, dependent persons.'},
      ]},
      {heading: 'A changing public legacy', items: [
        {label: 'Addresses to the German Nation', description: 'Speeches from the Napoleonic era that link education and national renewal, requiring attention to both their context and exclusionary political afterlives.'},
        {label: 'Portrait provenance', description: 'The original charcoal drawing is documented at Friedrich Schiller University Jena; the displayed reproduction also has a 1995 print-source chain that should be named.'},
      ]},
    ],
    'german-idealism-fichte-bury-1801',
    'This 1801 drawing of Johann Gottlieb Fichte by Friedrich Bury is documented by a Stadtmuseum Jena object record as an original charcoal drawing held by Friedrich Schiller University Jena and used as the model for a related engraving. The displayed reproduction also has a 1995 print-source chain. It can support a cautious period likeness; it cannot visualize the Wissenschaftslehre, prove self-activity or recognition, establish the politics of national rhetoric, or make a portrait an argument.',
    'fnv1a64:835e7087530ed29a',
    3,
  ),
  dostoevsky: objectLed(
    'Fyodor Dostoevsky',
    [
      'Fyodor Dostoevsky turns fiction into a testing ground where philosophical positions speak through characters who can resist, wound, and exceed one another. Notes from Underground does not simply announce an existentialist doctrine; its narrator makes freedom into spiteful refusal, exposing how a person can cling to agency by damaging relationship and self-understanding. Crime and Punishment asks whether an exceptional theory may excuse violence, then lets guilt, confession, poverty, chance, care, and competing voices unsettle that theory. The Brothers Karamazov intensifies questions about faith, suffering, responsibility, and freedom without reducing Ivan, Alyosha, Dmitri, or the narrator to detachable authorial answers.',
      'This form matters historically. Dostoevsky survived a staged execution reprieve, Siberian imprisonment, military service, debt, illness, and political pressure; those experiences inform the stakes of his work without mechanically explaining every fictional scene. Bakhtin’s “polyphony” names the unusual autonomy and clash of voices in the novels, not a refusal to judge or a guarantee that every voice is equally endorsed. Dostoevsky is a major predecessor for later existentialist readers, but he did not found a finished existentialist school. His Orthodoxy, Russian nationalism, imperial commitments, and antisemitic statements are part of the record. An exhibit about moral depth must not turn suffering into a screen that hides those harms.',
      'Vasily Perov’s 1872 portrait shows Dostoevsky seated with clasped hands and a downward, absorbed gaze. Painted from life and held by the State Tretyakov Gallery, it gives a precise visual encounter with a writer who was already publicly known. It cannot disclose what a fictional character “really” believes, diagnose illness or guilt from posture, prove that suffering ennobles, or resolve how autobiography enters a novel. The painting can establish a portrait tradition and invite attention to the labor of reading. Its restraint is useful: instead of turning an inward-looking image into psychological certainty, return to the novels’ conflicting voices, historical conditions, and difficult political record.'
    ],
    [
      {heading: 'Novels as testing grounds', items: [
        {label: 'Underground freedom', description: 'The narrator’s spiteful resistance to calculation shows how freedom can become self-defeating rather than simply heroic or rational.'},
        {label: 'Exceptional-person theory', description: 'Raskolnikov’s attempt to justify violence in Crime and Punishment, tested by consequences, other people, and his own fractured responses.'},
      ]},
      {heading: 'Voices and questions', items: [
        {label: 'Polyphony', description: 'Bakhtin’s term for the novels’ interacting consciousnesses, which are not safely collapsed into one authorial mouthpiece.'},
        {label: 'Ivan’s protest', description: 'The Brothers Karamazov’s devastating challenge about innocent suffering, which the novel stages without offering a painless resolution.'},
      ]},
      {heading: 'The historical writer', items: [
        {label: 'Staged reprieve and Siberia', description: 'Dostoevsky’s 1849 near-execution, imprisonment, and exile shape historical context but do not translate each novel into autobiography.'},
        {label: 'Political harms', description: 'Nationalism, imperial commitments, and antisemitic statements require critical attention alongside the novels’ moral and religious power.'},
      ]},
    ],
    'value-dostoevsky-perov-1872',
    'Vasily Perov painted this 1872 portrait of Fyodor Dostoevsky from life; it is held by the State Tretyakov Gallery, Moscow (386). It can establish a lifetime portrait and an important reception object. It cannot reveal a character’s voice, diagnose Dostoevsky’s inner state from expression, prove the autobiographical meaning of a novel, justify redemptive readings of suffering, or erase the writer’s nationalism, imperial commitments, and antisemitic statements.',
    'fnv1a64:35aaf501ca314c4b',
  ),
  nietzsche: objectLed(
    'Friedrich Nietzsche',
    [
      'Friedrich Nietzsche writes across philology, aphorism, polemic, genealogy, poetry, and experiment rather than a finished philosophical system. His early work on tragedy, middle-period critique of metaphysics and morality, and later attacks on ascetic ideals, herd valuations, and nihilism change the questions as much as the answers. Perspectivism does not say that every opinion is equally good or that evidence disappears. It challenges the fantasy of a view from nowhere while demanding interpretation, comparison, and discipline. “Will to power” names an important and contested thread in the published work, but it does not license a simple psychology of domination or an all-purpose explanation of nature.',
      'Genealogy asks how values acquire authority through history, practices, conflicts, bodies, and institutions. That can unsettle inherited moral certainty without automatically yielding a politics of liberation. Nietzsche’s writing contains misogyny, anti-egalitarianism, racialized language, and other hierarchies that require direct scrutiny. His break with German nationalism and antisemitism does not cleanse those claims, and later fascist appropriation does not make him a straightforward fascist author. The posthumous Will to Power is especially important here: it was assembled from notebooks after his collapse and is not an authorized book. Visitors need published texts, notebook history, and reception history kept distinct in order to read both influence and abuse responsibly.',
      'This studio portrait was made in Leipzig on 25 August 1869, shortly before Nietzsche began his Basel professorship; a copy is held by the Goethe- und Schiller-Archiv. Spectacles, bow tie, and formal coat locate a young classical philologist in a photographic convention, not a prophet of later doctrines. The photograph cannot verify a genealogy, establish perspectivism, reveal the meaning of nihilism, or confirm the authority of posthumous notebook arrangements. It can establish a dated image with a specific archival afterlife. That modest evidence matters: Nietzsche’s changing writing and contested reception must be followed through texts and transmission, not read backward from a youthful face.'
    ],
    [
      {heading: 'A changing practice of writing', items: [
        {label: 'Perspectivism', description: 'A challenge to view-from-nowhere certainty that still requires disciplined interpretation, evidence, comparison, and criticism.'},
        {label: 'Genealogy', description: 'An inquiry into how values acquire authority through contingent histories, practices, conflicts, bodies, and institutions.'},
      ]},
      {heading: 'Pressure without innocence', items: [
        {label: 'Nihilism', description: 'A crisis in which inherited values lose binding force, not simply a celebration of despair or a completed doctrine with one remedy.'},
        {label: 'Hierarchy and exclusion', description: 'Misogyny, anti-egalitarianism, racialized language, and related claims in Nietzsche’s work that must remain visible in interpretation.'},
      ]},
      {heading: 'Read the archive carefully', items: [
        {label: 'The Will to Power', description: 'A posthumous arrangement of notebooks, not an authorized book; it cannot replace the chronology and wording of published works.'},
        {label: 'Fascist appropriation', description: 'A later political use of Nietzsche that neither exhausts his thought nor removes responsibility for the dangerous materials in his writings.'},
      ]},
    ],
    'value-nietzsche-1869-siebe-portrait',
    'This Leipzig studio photograph of Friedrich Nietzsche is dated 25 August 1869; the photographer is unidentified, and a copy is held by the Goethe- und Schiller-Archiv (GSA 101/11). It can establish a dated early image and its archival transmission. It cannot predict Nietzsche’s later philosophy, prove perspectivism or genealogy, authorize the posthumous Will to Power, or determine how his writings relate to hierarchy, exclusion, and later fascist appropriation.',
    'fnv1a64:428b5655780304c0',
    3,
  ),
};
