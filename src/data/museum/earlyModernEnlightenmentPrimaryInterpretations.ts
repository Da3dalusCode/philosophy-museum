import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';
import type {MuseumExhibitReview} from '../../editorial/exhibitReview';

type OrientationItem = {readonly label: string; readonly value: string};
type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};
type ConciseOptions = {
  readonly objectLed?: boolean;
  readonly review?: MuseumExhibitReview;
};

const standardReview = (lock: string): MuseumExhibitReview => ({
  status: 'standard-compliant',
  reviewedOn: '2026-08-09',
  method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.',
  lock,
});

const concise = (
  name: string,
  lead: string,
  paragraphs: readonly string[],
  orientation: readonly OrientationItem[] | readonly VisitorGuideSection[],
  assetId: MuseumAssetId,
  objectText: string,
  options: ConciseOptions = {},
): MuseumPrimaryInterpretationEnrichment => ({
  lead: options.objectLed ? '' : lead,
  keyIdeas: [],
  keyWorks: [],
  sections: [{heading: '', paragraphs}],
  presentation: {
    mode: 'concise',
    orientation,
    articleActionLabel: `Read the full sourced ${name} article`,
    bodyLayout: 'prose',
    ...(options.objectLed ? {exhibitLayout: 'object-led' as const} : {}),
    plaqueKicker: '',
    plaqueSubtitleLines: 4,
  },
  objectInterpretations: {[assetId]: objectText},
  ...(options.review ? {review: options.review} : {}),
});

export const EARLY_MODERN_ENLIGHTENMENT_PRIMARY_INTERPRETATIONS:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  ficino: concise(
    'Marsilio Ficino',
    'Enter Ficino’s workshop of translation: a place where Plato, Plotinus, Christian theology, medicine, music, astrology, friendship, and patronage become one ambitious—and contested—Renaissance practice.',
    [
      'Marsilio Ficino did not recover a forgotten Plato by himself or preside over a modern-style Florentine Academy. Greek and Byzantine transmission, Italian humanism, manuscript collecting, printers, readers, and Medici support made his work possible. What he did was still extraordinary: he translated the Platonic corpus and Plotinus into Latin, surrounded those texts with introductions and commentaries, and made translation an act of philosophy. His choices let many readers encounter ancient works while guiding them toward a Christian Platonist account of providence, soul, love, and cosmic order.',
      'In the Platonic Theology, soul mediates between intelligible and bodily levels of reality and is defended as personally immortal. In the Symposium commentary, love can rise from visible beauty toward intelligible and divine goods; “Platonic love” here is not merely sexless affection. Ficino’s prisca theologia arranged figures such as Hermes, Orpheus, Pythagoras, and Plato into a providential history of ancient wisdom. That history depended on chronologies now known to be wrong, so it belongs to Ficino’s interpretive construction rather than to a verified ancient lineage.',
      'Three Books on Life joins scholarly health, melancholy, diet, music, spiritus, astrology, and natural magic. Ficino tried to distinguish lawful natural attractions from demonic invocation, but contemporaries disputed that boundary and modern readers should not sanitize the causal claims into metaphor. His cosmos is living and sympathetic in ways later mechanical science rejects. The same range that made him influential also makes simple labels—translator, priest, physician, magician, founder—inadequate on their own.',
      'Follow the exhibit by asking what changes whenever a text crosses languages, institutions, and religious commitments. Ficino’s legacy is not a neutral delivery of antiquity but a powerful authored reception. Direct influence must be traced case by case, and the Greek, Arabic, Jewish, Byzantine, and Latin routes behind Renaissance learning must remain visible beside the scale of his achievement.',
    ],
    [
      {label: 'Historical role', value: 'Translator · commentator · priest · philosopher'},
      {label: 'Core works', value: 'Latin Plato · Platonic Theology · De amore · Three Books on Life'},
      {label: 'Key problems', value: 'Soul · love · ancient theology · astrology · natural magic'},
      {label: 'Institutional caution', value: 'Patronage and networks · not a modern chartered Academy'},
      {label: 'Transmission', value: 'Recovery always includes interpretation and material labor'},
    ],
    'ficino-nga-medal-1499',
    'This c. 1499 medal, made in the style of Niccolò Fiorentino, is a near-contemporary commemorative portrait rather than a transparent record of Ficino’s appearance. Its learned profile identifies a Renaissance humanist through period conventions; it does not prove the later legend of a formally organized Platonic Academy.',
  ),
  machiavelli: concise(
    'Niccolò Machiavelli',
    'Read The Prince beside the Discourses and meet a thinker of emergency, republican liberty, civic conflict, military dependence, corruption, virtù, and fortune—not a mascot for cynical manipulation.',
    [
      'Niccolò Machiavelli served the Florentine republic as a chancery official and diplomat during invasion, alliance shifts, papal politics, and internal conflict. The Medici restoration in 1512 cost him office and brought imprisonment and torture. His later writing draws on that defeat, classical history, diplomatic observation, and the weakness of divided Italian states. The Prince examines new principalities, founding, arms, reputation, and political necessity; the Discourses on Livy studies republican liberty, popular and elite conflict, citizen arms, corruption, law, and institutional renewal.',
      'Virtù is not conventional moral virtue or brute force. It names political capacity: judgment, energy, adaptability, organization, and readiness to seize an occasion. Fortuna names contingency and the pressures no actor fully masters. Political action therefore cannot be reduced to a timeless recipe. A tactic suited to one circumstance may fail in another, while a leader’s fixed temperament can become dangerous when the world changes. Machiavelli’s historical examples teach diagnosis and timing more than universal tricks.',
      'His willingness to discuss deception, fear, and controlled violence creates a real moral problem, but he never wrote that “the ends justify the means.” He distinguishes severity that establishes order from cruelty that breeds hatred and instability, and he repeatedly condemns reliance on mercenaries. Analysis is not the same as endorsement, yet analysis is not ethically innocent either. The claim of necessity can expose tragic responsibility or become a tyrant’s excuse; Machiavelli offers no comforting formula that removes the danger.',
      'The republican writings make the popular caricature especially inadequate. Conflict can protect liberty when institutions give it a lawful public form, because elites often seek command while ordinary people seek not to be dominated. This is not modern universal democracy: exclusion, expansion, and civic militarism remain. Walk away with the tension intact—a writer who makes power less mysterious while forcing every reader to ask who decides when extraordinary measures are necessary.',
    ],
    [
      {label: 'Historical setting', value: 'Florentine republic · Italian Wars · Medici restoration'},
      {label: 'Read together', value: 'The Prince · Discourses on Livy · The Art of War'},
      {label: 'Core vocabulary', value: 'Virtù · fortuna · necessity · corruption · liberty'},
      {label: 'Institutional focus', value: 'Citizen arms · law · conflict · founding · renewal'},
      {label: 'Misquotation warning', value: '“The ends justify the means” is not his sentence'},
    ],
    'machiavelli-santi-di-tito',
    'Santi di Tito painted this influential image decades after Machiavelli died. It is a posthumous civic memory, not a verified likeness from life. The portrait helps identify a later public Machiavelli while the manuscripts, printed works, dispatches, histories, and letters supply the evidence for his political arguments.',
  ),
  bacon: concise(
    'Francis Bacon',
    'Enter Bacon’s unfinished reform of knowledge, where idols, natural histories, experiments, instruments, institutions, and useful works matter more than the myth of one inventor delivering a universal scientific recipe.',
    [
      'Francis Bacon was a lawyer, parliamentarian, royal officer, essayist, historian, and philosopher whose political ascent ended after a 1621 bribery conviction. His philosophical project, the Great Instauration, was larger than any one completed book. He wanted inquiry to become cumulative, cooperative, and practically fruitful. Existing learning, he argued, often raced from a few observations to sweeping systems or defended inherited authorities through verbal disputation. Reform required new records, tasks, institutions, and habits of mind, not merely a clever rule followed by a solitary genius.',
      'The idols of tribe, cave, marketplace, and theater diagnose recurring distortions arising from shared human tendencies, individual formation, unstable language, and received systems. They are not four errors removed once and forever. Novum Organum proposes tables of presence, absence, and degree, tests candidate explanations through exclusion, and moves toward provisional axioms. Baconian induction is therefore more structured than collecting facts and generalizing, but it is not a complete description of modern science. Mathematics, theory, models, and hypotheses often guide inquiry in ways his program did not fully capture.',
      'Natural history and experiment belong together. Investigators should collect ordinary and unusual phenomena, vary conditions, use instruments, and seek “light-bearing” experiments that disclose causes as well as “fruit-bearing” works that improve life. New Atlantis imagines Salomon’s House as an institution dividing intellectual labor across observation, experiment, travel, storage, interpretation, and application. The fiction is not a blueprint for a modern laboratory, yet it makes governance, patronage, secrecy, coordination, and technological power part of philosophy of science.',
      'Bacon’s promise to relieve the human estate also uses language of dominion, extraction, and conquest that deserves scrutiny within England’s expanding commercial and colonial world. Knowledge can heal and provision; it can also concentrate power. His enduring achievement is not the invention of “the scientific method” but a demanding question: which social arrangements make error corrigible and discovery public, and who controls the powers that organized inquiry creates?',
    ],
    [
      {label: 'Project', value: 'The unfinished Great Instauration'},
      {label: 'Method', value: 'Natural history · experiment · exclusion · provisional axioms'},
      {label: 'Error', value: 'Idols of tribe · cave · marketplace · theater'},
      {label: 'Institution', value: 'Cooperative and cumulative inquiry across generations'},
      {label: 'Critical question', value: 'Useful knowledge, dominion, extraction, and public power'},
    ],
    'francis-bacon-portrait-1617',
    'Paul van Somer I’s 1617 portrait is a formally staged lifetime image of Bacon at political prominence, not a visualization of induction or experiment. The courtly presentation helps locate the reformer inside systems of office and patronage whose ambitions, resources, and failures also shaped his account of organized knowledge.',
  ),
  galileo: concise(
    'Galileo Galilei',
    'Look through Galileo’s problem rather than through a perfect telescope: how can mathematics, crafted instruments, experiment, publication, theology, and institutions together make unfamiliar evidence authoritative?',
    [
      'Galileo Galilei worked inside late Renaissance mathematics and natural philosophy, not outside tradition as the first modern scientist. Trained at Pisa and active at Padua and Florence, he drew on Archimedean analysis, instrument craft, astronomy, engineering problems, court patronage, and university debate. His telescopes revealed mountains and shadows on the Moon, previously unseen stars, satellites around Jupiter, and the phases of Venus. None of these observations interpreted itself. Lens quality, repeated viewing, drawing, geometry, naming, demonstration, and print helped convert narrow and unstable images into public claims.',
      'Astronomy and mechanics were related but distinct achievements. Telescopic evidence weakened inherited pictures of a perfectly smooth and unchanging heaven and created severe problems for Ptolemaic arrangements, though it did not by itself prove every feature of Copernican cosmology. In studies of falling bodies and projectiles, Galileo used measurement, idealization, geometrical relations, experiments, and thought experiments to reform accounts of motion. The famous leaning-tower story is uncertain and should not replace the documented arguments, inclined-plane work, correspondence, and Two New Sciences.',
      'The 1633 trial cannot be explained as a single duel between science and religion. Technical evidence, scriptural interpretation, papal politics, censorship, patronage, institutional authority, Galileo’s rhetoric, and the legal status of Copernican claims all mattered. In 1616 he was warned against holding or defending heliocentrism; after the 1632 Dialogue he was tried by the Roman Inquisition, compelled to abjure, and sentenced to house arrest. The whispered “and yet it moves” story is later legend, not secure trial evidence.',
      'Galileo’s importance lies in the combined practice: crafted access, mathematical structure, controlled comparison, persuasive writing, and public dispute. Instrument-mediated evidence is not automatically weak because it is mediated; reliability grows when mediation can be understood and tested. The exhibit asks who gets to see, reproduce, interpret, and authorize a result—and why later heroic mythology can conceal the communities and institutions that made discovery possible.',
    ],
    [
      {label: 'Practice', value: 'Mathematics · instruments · observation · experiment · argument'},
      {label: 'Astronomy', value: 'Moon · stars · Jupiter’s satellites · phases of Venus'},
      {label: 'Mechanics', value: 'Falling bodies · projectiles · idealization · Two New Sciences'},
      {label: 'Trial', value: 'Evidence · interpretation · patronage · censorship · authority'},
      {label: 'Legend caution', value: '“And yet it moves” is not secure contemporary testimony'},
    ],
    'galileo-sustermans-portrait-1636',
    'Justus Sustermans’ 1636–40 lifetime portrait presents the elderly Galileo after the 1633 trial. It is a formal likeness, not evidence of a whispered courtroom defiance or a diagram of his discoveries. The adjacent instruments, observations, writings, and legal record carry those different evidentiary burdens.',
  ),
  hobbes: concise(
    'Thomas Hobbes',
    'Begin with bodies, words, fear, and reasoning before reaching the sovereign: Hobbes builds political obligation inside a larger materialist philosophy of motion, language, persons, religion, and authorization.',
    [
      'Thomas Hobbes lived through European scientific debate, English civil war, exile, restoration, and intense conflict over church and state. Leviathan is not only a social-contract book. Its first part moves from sense and imagination through language, reason, passions, and persons before the political argument begins. Hobbes’s materialism treats mental life as bodily processes, yet his explanatory ambition cannot be reduced to borrowing a finished mechanical science. Mathematics, optics, motion, rhetoric, and disputes with contemporaries all shape a system whose own standards of demonstration remain contested.',
      'The state of nature tests what relations among roughly equal and vulnerable people become when no common authority can settle disputes. It is not a claim that every society literally passed through one universal prehistoric stage. Competition, distrust, glory, uncertainty, and anticipatory violence can make even peace-seeking people unsafe. Laws of nature direct them toward peace, but agreements lack security without an effective power able to judge and enforce. Fear does not cancel reasoning; fear of violent death helps make the requirements of peace practically urgent.',
      'Individuals covenant with one another to authorize a person or assembly whose public acts count as theirs. The sovereign is not simply a stronger private individual and is not a party to the founding covenant in Hobbes’s construction. Authorization explains unity and political obligation, while protection supplies an important limit: subjects retain liberty to resist direct threats to self-preservation. Hobbes nevertheless rejects divided sovereignty and leaves subjects with little institutional control, so modern democratic ideas should not be projected backward.',
      'Religion is part of the political problem because rival claims to prophecy, scripture, church authority, and conscience can divide public judgment. Hobbes’s extensive biblical argument seeks to subordinate public religious authority to civil peace without making private belief irrelevant. His severe answer remains philosophically live: how much common power does security require, when does protection fail, and can a state suppress dangerous rivalry without turning its own judgment into an unchecked danger?',
    ],
    [
      {label: 'System', value: 'Body · sense · language · passion · person · commonwealth'},
      {label: 'Political model', value: 'State of nature as argument · not universal prehistory'},
      {label: 'Authority', value: 'Covenant · authorization · sovereignty · protection'},
      {label: 'Religion', value: 'Scripture and church power within the problem of divided judgment'},
      {label: 'Open tension', value: 'Peace and protection versus concentrated authority'},
    ],
    'hobbes-wright-portrait',
    'John Michael Wright’s c. 1669–70 painting is a lifetime portrait of Hobbes in his eighties. Its authority is biographical and representational, not constitutional: the philosopher’s image does not show the artificial person created by authorization. The Leviathan frontispiece carries that distinct visual argument.',
  ),
  berkeley: concise(
    'George Berkeley',
    '',
    [
      'George Berkeley argues that sensible objects are collections of ideas perceived by minds, while spirits are active perceivers and agents rather than ideas among ideas. His principle that to be is to be perceived does not mean a chair vanishes when one observer leaves. Its order, availability, and continuity depend on God; other finite spirits are known through their signs and effects. Berkeley presents immaterialism as a defense of sensible reality against an unknowable material substratum, even though critics find that defense more revisionary than his appeal to common sense suggests.',
      'A New Theory of Vision separates what sight immediately presents from distance and spatial relations learned through touch and movement. The Principles attacks an impossible picture of abstract ideas while preserving general thought through signs. Language can guide action without copying a hidden essence. Science therefore still discovers regularities, laws, and useful mathematical relations, but it does not need material causes behind experience. Berkeley’s religious aim is structural, not an optional ornament: disputes remain over causation, other minds, divine perception, and how far this reconstruction can count as common sense.',
      'The portrait also places the philosopher in institutions of power. Berkeley sought support for a Bermuda college intended to educate colonial settlers and convert Indigenous Americans; his Atlantic project, Rhode Island household, and slaveholding make improvement and personhood questions historically concrete. These facts neither deductively refute immaterialism nor belong in a detached footnote. They test how an account of orderly experience inhabits colonial and enslaving worlds. That connection matters because philosophy’s concepts of order and improvement acquire their reach through material arrangements, not only abstract philosophical premises. Smibert’s image identifies Berkeley as a cleric and public planner, not a visual proof of either his metaphysics or its moral adequacy.',
    ],
    [
      {heading: 'Key ideas', items: [
        {label: 'Ideas and spirits', description: 'Ideas are the contents of experience; spirits are active perceivers and agents, so Berkeley does not treat persons as one more passive idea.'},
        {label: 'Immaterialism', description: 'Ordinary things remain real and orderly, but Berkeley denies that an unknowable material substance is needed to explain them.'},
      ]},
      {heading: 'Works and method', items: [
        {label: 'A New Theory of Vision', description: 'This work argues that distance and spatial depth are learned through recurring links among sight, touch, and movement.'},
        {label: 'Principles of Human Knowledge', description: 'Berkeley’s central philosophical work challenges material substance while explaining general signs, science, and divine order.'},
      ]},
      {heading: 'Historical pressure', items: [
        {label: 'Bermuda college project', description: 'Berkeley’s proposed missionary college joined education to colonial settlement rather than offering a politically neutral ideal of improvement.'},
        {label: 'Whitehall household', description: 'The documented enslaving household connected with Berkeley’s Rhode Island residence makes the limits of his public ideals impossible to ignore.'},
      ]},
    ],
    'empiricism-berkeley-smibert-portrait',
    'John Smibert’s 1730 lifetime portrait identifies Berkeley’s Anglican office and Atlantic educational ambitions. Its clerical dress, chair, and landscape do not demonstrate immaterialism or make his arguments merely apologetic; neither can the image neutralize the colonial and enslaving institutions entangled with his Bermuda project.',
    {objectLed: true, review: standardReview('fnv1a64:70c26d6311e33fb3')},
  ),
  'anne-conway': concise(
    'Anne Conway',
    'Enter Conway’s living creation, where spirit and body are degrees within transformable creatures, evil cannot be an eternal substance, and theology makes metaphysics answerable to suffering and restoration.',
    [
      'Anne Conway developed her philosophy through reading, correspondence, conversation, chronic illness, and an intellectual network largely outside university office. Henry More taught and corresponded with her; Franciscus Mercurius van Helmont later brought Quaker and kabbalistic materials into her circle. Her one surviving treatise was found among papers after her death, transcribed from difficult notes, translated into Latin, published anonymously in 1690, and translated into English in 1692. That chain makes the text inseparable from posthumous editorial mediation, even though its arguments are recognizably coherent and distinctive.',
      'Conway distinguishes immutable God, Christ as mediator, and created beings. Creation is neither inert Cartesian extension nor Spinoza’s one divine substance. Creatures are living, perceptive, active, and capable of change while remaining dependent on God. Spirit and body name degrees or states within created substance: embodiment can become more refined or more gross, so interaction does not require a bridge between two wholly alien kinds. Her hierarchy preserves real difference between creator, mediator, and creation rather than collapsing everything into one level.',
      'This metaphysics gives evil a history and limit. Because created beings can change, moral degradation can make them more bodily and confused, while improvement can restore greater spirituality and harmony. Evil is not a positive eternal principle rivaling divine goodness. Conway’s commitment to restoration and perfectibility addresses the problem of suffering, though readers may question whether cosmic development adequately answers concrete pain—especially given her own lifelong illness. Religious vocabulary is structural here, not a detachable decoration on a secular vitalism.',
      'Later comparisons with Leibniz are illuminating but easily overstated. Van Helmont knew both thinkers, Leibniz read Conway’s book, and both reject dead matter in favor of living unities. Yet Conway’s Christology, transformable creatures, restoration, and relational embodiment differ from Leibnizian monads. Treat her as a philosopher in her own text and network before making her a missing step toward someone else. The exhibit invites a live question: can continuity across bodily and spiritual change preserve identity without fixed inert substance?',
    ],
    [
      {label: 'Textual status', value: 'One posthumous, anonymous, translated, editorially mediated treatise'},
      {label: 'Metaphysical orders', value: 'God · Christ · living and changeable creation'},
      {label: 'Core claim', value: 'Spirit and body as degrees within created substance'},
      {label: 'Ethical problem', value: 'Evil · suffering · perfectibility · restoration'},
      {label: 'Reception caution', value: 'Compare with Leibniz without making Conway his precursor only'},
    ],
    'rationalism-conway-portrait',
    'The Mauritshuis identifies this c. 1670 work as Perspective View with a Woman Reading a Letter. The unnamed woman has been proposed, but not established, as Anne Conway; no authenticated likeness is known. The installation therefore treats the painting as contextual evidence of learned domestic space, not biographical proof.',
  ),
  'mary-astell': concise(
    'Mary Astell',
    'Follow Astell from the rational soul to the classroom and household: denied education manufactures dependence, yet her challenge to arbitrary marital power coexists with Anglican, royalist, and hierarchical commitments.',
    [
      'Mary Astell wrote from a world that excluded women from universities, professions, and much public authority while still teaching that rational souls were capable of truth and virtue. A Serious Proposal to the Ladies argues that ignorance produced by poor education cannot demonstrate natural incapacity. Its proposed women’s community joins study, friendship, religious retreat, and moral discipline rather than simply anticipating a modern secular college. Part II offers a method of definition, analysis, attention, and ordered reasoning so women can govern their own understanding instead of depending on fashion or flattery.',
      'Her rationalism is practical and theological. Clear judgment should direct desire and will toward genuine good, while self-knowledge exposes habits encouraged by a culture of display. Astell drew on Cartesian methods and exchanged arguments with John Norris about divine love, but she was not merely applying a borrowed system. She connects intellectual formation to institutions: time, books, conversation, economic independence, and a protected setting make agency possible. Blaming people for traits cultivated by deprivation confuses a social result with a natural fact.',
      'Some Reflections upon Marriage applies the language of arbitrary sovereignty to domestic rule. If political absolutism is objectionable, why should a husband’s absolute authority appear natural? Marriage distributes property, legal status, labor, vulnerability, and opportunities, so consent cannot be evaluated apart from women’s education and alternatives. Yet Astell often counsels prudence and duty within existing marriage rather than proposing equal citizenship or a comprehensive transformation of law. The critique is forceful precisely because it grows inside commitments that also limit it.',
      'Calling Astell an early feminist can orient readers if it marks a later genealogy rather than her self-description or a complete modern platform. She was a High Church Anglican, royalist, critic of Locke, defender of social hierarchy, and opponent of broad toleration. Those positions do not cancel her arguments about women’s reason, education, and arbitrary power; they prevent admiration from becoming anachronism. Ask which freedoms she makes thinkable, which authorities she preserves, and how reform can expose contradictions without escaping its own historical world.',
    ],
    [
      {label: 'Core problem', value: 'Rational equality under unequal education and marriage'},
      {label: 'Method', value: 'Attention · definition · analysis · self-government'},
      {label: 'Major works', value: 'A Serious Proposal · Reflections upon Marriage · Christian Religion'},
      {label: 'Political tension', value: 'Critic of domestic absolutism · royalist and hierarchical'},
      {label: 'Category caution', value: '“Early feminist” is a useful later genealogy, not her platform'},
    ],
    'enlightenment-astell-serious-proposal-1694',
    'No securely authenticated portrait of Astell is known. This anonymous 1694 title page—“By a Lover of Her Sex”—is therefore an honest primary-text witness rather than an invented face. Its current Commons record does not identify the holding institution, a limitation the Atlas preserves rather than silently filling.',
  ),
  rousseau: concise(
    'Jean-Jacques Rousseau',
    '',
    [
      'Jean-Jacques Rousseau made freedom a problem created by social relations rather than merely by bad rulers. The Discourse on Inequality gives a conjectural history, not archaeology: property, labor, esteem, and institutions make relatively independent beings dependent on comparison. Amour de soi is basic self-concern; amour-propre is the comparative concern for standing that can produce vanity, shame, resentment, and domination. “Nature” is therefore a critical contrast with corrupt social arrangements, never a simple instruction to abandon society or return to an imagined prehistoric condition.',
      'The Social Contract asks how people can remain free under law by becoming members of a sovereign people. The general will concerns common conditions; it is not private preference added up, an automatic majority, or a leader’s claim to know the people’s true interest. Government administers but does not own sovereignty. That distinction supports republican and democratic readings while leaving severe questions about scale, dissent, civil religion, censorship, exclusion, and the claim that a dissenter may be “forced to be free.” Neither democratic hero nor totalitarian ancestor captures the argument by itself.',
      'Émile stages education as a way to delay social vanity and cultivate judgment through managed experience, but its tutor’s concealed control and Sophie’s gendered formation expose the limits of its autonomy. The Confessions, Dialogues, and Reveries make a crafted self under suspicion; Rousseau’s abandonment of his children cannot automatically refute his educational argument, but it bears on that self-presentation. Allan Ramsay’s 1766 portrait records an artistic encounter during Rousseau’s British exile and his managed public visibility, not a natural self or a picture of the sovereign people. His contradictory corpus requires interpretation, not one verdict.',
      'Revolutionary, Romantic, educational, and authoritarian readers have accordingly selected different Rousseaus rather than inherited one settled political program; no later reception resolves those tensions for us.',
    ],
    [
      {heading: 'Key ideas', items: [
        {label: 'Amour de soi and amour-propre', description: 'Basic self-concern differs from socially comparative concern for status, which can turn recognition into dependence and rivalry.'},
        {label: 'General will', description: 'The people’s concern with shared conditions, not a ruler’s command or a simple total of private preferences.'},
      ]},
      {heading: 'Major works', items: [
        {label: 'Discourse on Inequality', description: 'A conjectural account of how property, comparison, and dependence can reshape human relations.'},
        {label: 'The Social Contract', description: 'An inquiry into legitimate law, popular sovereignty, government, and civic freedom.'},
        {label: 'Émile', description: 'A staged educational narrative whose techniques of formation and gender roles complicate its appeal to freedom.'},
      ]},
      {heading: 'Continuing pressure', items: [
        {label: 'Dissent and civic unity', description: 'Rousseau’s ideal of a common good raises the question of how political unity can avoid silencing plurality.'},
      ]},
    ],
    'enlightenment-rousseau-ramsay-portrait',
    'Allan Ramsay’s 1766 lifetime portrait records Rousseau in Armenian-style dress during his British exile. The costume participates in a public presentation of simplicity and difference; it cannot disclose an unmediated natural self or diagram the sovereign people of The Social Contract.',
    {objectLed: true, review: standardReview('fnv1a64:f76d711a49b2feff')},
  ),
  montesquieu: concise(
    'Montesquieu',
    '',
    [
      'Charles-Louis de Secondat, baron de Montesquieu, wrote as a magistrate, landowner, traveler, historian, satirist, and member of elite institutions in ancien-régime France. Persian Letters uses fictional foreign observers and the enclosed seraglio to make familiar authority strange; its voices cannot all be treated as direct authorial statements. Considerations on the Romans follows how expansion, discipline, conflict, wealth, command, and civic motive can alter one another. Political causes are relational and historical, not ingredients that can be lifted unchanged from one society to another. His comparisons also test how scale and temporal change transform political arrangements.',
      'The Spirit of the Laws asks how political form, history, economy, religion, manners, terrain, population, and climate condition laws. Climate has real explanatory work in the book, but it is not an irresistible single cause; its environmental generalizations often carry stereotypes and weak evidence. Comparison makes institutions visible as arrangements embedded in social worlds, yet the method also depends on reports, classifications, and an imperial archive whose limitations must remain visible. Explaining why a practice persists is not the same as demonstrating that it is justified.',
      'Political liberty is security under moderate government, not unrestricted choice. Montesquieu’s English model distributes functions so power checks power, but it is not a universal three-branch diagram: social estates, intermediary bodies, law, procedure, commerce, and a wider balance matter. His slavery analysis compounds the problem. Ironic defenses expose greed and racism, while other passages allow conditional concessions under despotism or extreme climate. The point is neither a final label nor a pardon: institutional diagnosis must ask whom a law renders vulnerable, dependent, or disposable. This derivative Versailles likeness can identify a later public Montesquieu, but it cannot validate his comparative method, settle the contradiction, or turn him into an uncomplicated abolitionist.',
    ],
    [
      {heading: 'Method and liberty', items: [
        {label: 'Comparative inquiry', description: 'Laws must be read alongside a society’s history, institutions, customs, economy, and scale rather than copied as detachable rules.'},
        {label: 'Moderation', description: 'Political liberty is security under arrangements that prevent one power from becoming arbitrary.'},
      ]},
      {heading: 'Major works', items: [
        {label: 'Persian Letters', description: 'A satirical novel whose fictional foreign observers make French authority and social practice unfamiliar.'},
        {label: 'The Spirit of the Laws', description: 'Montesquieu’s wide comparative study of law, government, society, commerce, climate, and political restraint.'},
      ]},
      {heading: 'Necessary cautions', items: [
        {label: 'England and separated powers', description: 'His admired constitutional model includes more than three sealed branches and is an interpretation of eighteenth-century Britain, not a neutral transcript.'},
        {label: 'Slavery and empire', description: 'His forceful irony against slavery coexists with conditional concessions, so neither a simple abolitionist nor defender label is adequate.'},
      ]},
    ],
    'enlightenment-montesquieu-versailles-portrait',
    'This Versailles portrait derives from Jacques-Antoine Dassier’s medal through an anonymous French painter. As a derivative commemorative likeness, it identifies a later public Montesquieu; it is neither an independent documented sitting nor visual evidence for his constitutional or comparative arguments.',
    {objectLed: true, review: standardReview('fnv1a64:9479aa56453f4ae9')},
  ),
  'adam-smith': concise(
    'Adam Smith',
    '',
    [
      'Adam Smith taught moral philosophy at Glasgow and wrote across ethics, jurisprudence, rhetoric, history, and political economy. The Theory of Moral Sentiments explains sympathy as imaginative fellow-feeling with another’s situation, not automatic benevolence or agreement. Agent and spectator adjust toward one another; the impartial spectator is a disciplined standpoint for testing conduct beyond immediate applause. Moral judgment is socially formed yet can criticize actual audiences, although rank, proximity, custom, and shared prejudice may still distort what spectators are able to imagine.',
      'Justice differs from beneficence because injury arouses resentment and warrants coercive restraint; society cannot survive without security from harm. The Wealth of Nations studies division of labor, bargaining, prices, wages, profits, rents, capital, and law. Self-interest matters especially in exchange, but it is never Smith’s whole psychology. Sympathy, prudence, vanity, resentment, public spirit, and the desire for approval do other work. Splitting moral philosophy from political economy into two incompatible Smiths obscures how institutions channel mixed motives and distribute dependence.',
      'Specialization increases output but can narrow workers’ powers of reasoning and citizenship, making public education part of political economy. Smith attacks mercantilist privilege, collusion, monopoly, and chartered companies exercising sovereign power. His “invisible hand” is not a theorem that greed automatically benefits everyone; markets depend on justice, infrastructure, security, information, and rules that merchants can bend. The sovereign retains duties of defense, justice, public works, education, and revenue, all vulnerable to capture and complacency. This makes political economy a field of institutional judgment rather than a license to ignore democratic power. The 1787 Wedgwood medallion is a lifetime manufactured likeness, fitting evidence of commercial production without reducing Smith’s philosophy to commodity advocacy. His critique of empire and the East India Company also stops short of a modern decolonial or abolitionist program.',
    ],
    [
      {heading: 'Read together', items: [
        {label: 'The Theory of Moral Sentiments', description: 'Smith’s account of sympathy, judgment, self-command, and the social formation of moral approval.'},
        {label: 'The Wealth of Nations', description: 'His study of labor, exchange, prices, class, law, public functions, and the conditions of commercial prosperity.'},
      ]},
      {heading: 'Key concepts', items: [
        {label: 'Impartial spectator', description: 'A disciplined standpoint for assessing conduct beyond immediate praise, not an infallible private oracle or public opinion poll.'},
        {label: 'Natural liberty', description: 'An institutional argument against particular privileges, not a demand to abolish government or public responsibility.'},
      ]},
      {heading: 'Political pressure', items: [
        {label: 'Division of labor', description: 'Specialization can raise productivity while damaging workers’ capacities, which is why Smith defends public education.'},
        {label: 'Chartered empire', description: 'Smith criticized monopoly and East India Company rule, but his own proposed reforms do not amount to a complete modern anti-imperial program.'},
      ]},
    ],
    'enlightenment-smith-wedgwood-medallion',
    'The Wedgwood manufactory produced this portrait medallion in 1787 during Smith’s lifetime; the installation displays a 2016 photograph of the object. Its industrial manufacture makes commercial production visible, but the likeness cannot reduce Smith’s moral philosophy to commodity production or market advocacy.',
    {objectLed: true, review: standardReview('fnv1a64:076bcb97355edc60')},
  ),
  wollstonecraft: concise(
    'Mary Wollstonecraft',
    '',
    [
      'Mary Wollstonecraft worked as a companion, teacher, school founder, governess, translator, reviewer, novelist, travel writer, and political polemicist before those roles were joined into one canonical philosophical biography. A Vindication of the Rights of Men answers Burke’s attack on the French Revolution by criticizing inherited rank and ornamental inequality. A Vindication of the Rights of Woman then turns universal reason and virtue against an education that trains women for pleasing dependence and mistakes the result for natural inferiority.',
      'Her standard is not that women should imitate every existing male privilege. Virtue needs reason, responsibility, and relative independence rather than sex-specific accomplishment. Equal, coeducational public schooling would prepare women for friendship in marriage, parenthood, useful work, and citizenship. Her critique of excessive sensibility is not contempt for feeling; it targets a commercial and literary culture that rewards theatrical delicacy while withholding the economic and intellectual conditions for responsible emotion and judgment. Education is therefore a political condition, not a detached reform of manners.',
      'Marriage and family are political institutions because property, law, labor, sexual power, and dependency shape apparent consent. Maria; or, The Wrongs of Woman uses fiction to show those constraints, while the Scandinavian Letters joins travel, commerce, landscape, loss, and reflective judgment. These genres show rights taking shape amid war, subsistence crisis, intimate vulnerability, commercial change, and contested public action rather than in an orderly theory divorced from circumstance. They make political philosophy responsive to lived conditions and literary form. Wollstonecraft also retains limits: she privileges middle-class domestic independence and uses civilizational and imperial language later readers must criticize. Heath’s 1798 engraving reproduces Opie’s lifetime likeness through a posthumous medium; it cannot stand in for her varied corpus or for the contested afterlife of “feminist” as a later genealogy.',
    ],
    [
      {heading: 'Central claim', items: [
        {label: 'Manufactured dependence', description: 'Traits used to justify women’s subordination are produced by denied education, economic vulnerability, and social reward.'},
        {label: 'Independent virtue', description: 'Reason, responsibility, and relative independence are conditions of moral development for women and men alike.'},
      ]},
      {heading: 'Works and genres', items: [
        {label: 'A Vindication of the Rights of Woman', description: 'The 1792 argument joins education, work, marriage, citizenship, and universal standards of virtue.'},
        {label: 'Maria; or, The Wrongs of Woman', description: 'An unfinished posthumous novel that makes marriage law, class, sexuality, and confinement politically legible.'},
      ]},
      {heading: 'Tensions and influence', items: [
        {label: 'Rousseau', description: 'Wollstonecraft challenges his gendered education while sharing the larger Enlightenment concern with character, freedom, and civic formation.'},
        {label: 'Class and empire', description: 'Her critique of domination supplies later feminist resources, yet her middling-class ideals and civilizational language require criticism rather than celebration alone.'},
      ]},
    ],
    'enlightenment-wollstonecraft-heath-engraving',
    'James Heath’s 1798 engraving reproduces John Opie’s lifetime portrait for Godwin’s posthumous Memoirs. It preserves a likeness through a later reproductive medium rather than a separate sitting; the Memoirs’ influential reception cannot substitute for Wollstonecraft’s own varied corpus.',
    {objectLed: true, review: standardReview('fnv1a64:28e27a6a8ef5bb80')},
  ),
  kant: concise(
    'Immanuel Kant',
    '',
    [
      'Kant’s critical philosophy asks what must be true for experience and knowledge to be possible before settling metaphysical claims. In the Critique of Pure Reason, forms of intuition and categories of understanding organize experience of appearances; they do not let the mind invent a world at will. We can know objects as they can be given under those conditions, not things as they may be independently of any possible experience. Critique therefore limits speculative metaphysics while defending objective natural knowledge. Whether this transcendental idealism requires one world understood under two aspects or two kinds of object remains disputed.',
      'Those limits do not make reason passive. Kant’s practical philosophy asks how freedom and obligation can belong together when action is not merely impulse or external command. Autonomy means giving oneself a rationally defensible law, and the categorical imperative tests whether a maxim can be willed universally and whether persons are treated as ends. Kant’s moral thought also includes duties of right and virtue, cultivated feeling, and disputed postulates of practical reason. The Critique of the Power of Judgment extends critical inquiry to beauty, the sublime, teleology, and reflective judgment rather than supplying one master formula for every domain.',
      'Kant’s universal language does not exempt his own claims from criticism. His racial hierarchy, gendered exclusions, colonial assumptions, and rational-capacity language create material questions about who can count as an equal moral subject. Scholars disagree over the reach of later revisions; neither a simple conversion story nor a timeless condemnation replaces the evidence. Critical problems also inform later accounts of science, law, politics, and culture without dictating them. This 1791 portrait provides a late likeness of Kant during the critical period, but its traditional attribution to Gottlieb Döbler is uncertain and its formal pose cannot prove critical philosophy, moral autonomy, or the adequacy of his universalism.',
    ],
    [
      {heading: 'The critical project', items: [
        {label: 'Transcendental idealism', description: 'Experience has conditions supplied by human cognition, so knowledge reaches appearances without becoming a private invention of reality.'},
        {label: 'Critique', description: 'A method that tests what reason can legitimately claim and where speculation must stop.'},
      ]},
      {heading: 'Three Critiques', items: [
        {label: 'Critique of Pure Reason', description: 'Examines the possibility and limits of knowledge, especially claims that reach beyond possible experience.'},
        {label: 'Critique of Practical Reason', description: 'Investigates freedom, moral law, responsibility, and the practical commitments reason can justify.'},
        {label: 'Critique of the Power of Judgment', description: 'Studies beauty, the sublime, purposiveness, art, and judgment where no fixed rule settles every case.'},
      ]},
      {heading: 'Continuing questions', items: [
        {label: 'Autonomy', description: 'Moral self-government is not doing whatever one wants but acting from principles one can rationally defend.'},
        {label: 'Universalism and exclusion', description: 'Kant’s commitment to equal dignity remains entangled with racial, gendered, colonial, and disability-related limits that later readers contest.'},
      ]},
    ],
    'enlightenment-kant-doebler-portrait',
    'This 1791 portrait is traditionally attributed to Gottlieb Döbler, though the attribution remains uncertain. It provides a late likeness of Kant during the critical period; its formal pose cannot establish the arguments of the Critiques or resolve the exclusions that test their universal claims.',
    {objectLed: true, review: standardReview('fnv1a64:f4daf735f2ee8e43')},
  ),
};
