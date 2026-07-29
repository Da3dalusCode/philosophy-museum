import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
  type SupplementalExhibitAuthoring,
} from './museumSupplementalAuthoring';
import {
  RATIONALISM_GALLERY_ID,
  RATIONALISM_ROOM_SIGN_COPY,
} from './rationalismGalleryCuration';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from './museumWorldTypes';

export {RATIONALISM_GALLERY_ID, RATIONALISM_ROOM_SIGN_COPY};

export const RATIONALISM_PALETTE = Object.freeze({
  ink: '#1f2730',
  blue: '#4d6f8d',
  indigo: '#5d5f87',
  red: '#96594f',
  green: '#627966',
  gold: '#aa8246',
  parchment: '#e8dcc4',
});

const image = (label: string, url: string) => ({label, url, kind: 'collection-record' as const});
const academic = (label: string, url: string) => ({label, url, kind: 'academic-reference' as const});
const record = (input: Omit<SupplementalExhibitAuthoring, 'panelKicker'>): MuseumSupplementalExhibit =>
  authorSupplementalExhibit({...input, panelKicker: 'Gallery 16 work and context exhibit'});

export const RATIONALISM_SUPPLEMENTAL_EXHIBITS = [
  record({
    id: 'descartes-discourse-method',
    assetId: 'rationalism-discourse-first-edition',
    displayName: 'Discourse on Method: Rules, Essays, and a New Scientific Voice',
    shortTitle: 'Descartes: Discourse on Method',
    workLabel: 'DESCARTES · DISCOURSE ON METHOD AND SCIENTIFIC ESSAYS',
    dateLabel: 'Published anonymously in French, Leiden, 1637',
    question: 'Can a portable method guide inquiry without replacing judgment, experiment, and revision?',
    frontSubtitle: 'Method, analytic order, vernacular argument, geometry, optics, meteorology, and experiment',
    lead: 'The Discourse presents an intellectual itinerary and four rules for directing inquiry, but it first appeared as a preface to essays on optics, meteorology, and geometry. Method therefore belongs to Descartes’s practice of mathematical natural philosophy rather than to an abstract recipe detached from scientific work.',
    keyIdeas: [
      'Methodical order moves from manageable questions toward more complex conclusions.',
      'The accompanying essays demonstrate method through optics, meteorology, and analytic geometry.',
      'Writing in French broadened the imagined audience beyond the Latin university.',
    ],
    cautions: [
      'The four rules are not an infallible algorithm that mechanically produces truth.',
      'Descartes used observation, instruments, models, and reported experience even while giving reason a foundational role.',
    ],
    sections: [
      {
        heading: 'An autobiography stages a method',
        paragraph: 'Descartes narrates dissatisfaction with inherited learning, travel, mathematical discovery, and a decision to rebuild his opinions. That first-person form does not simply report a life: it invites readers to test a disciplined way of ordering assent while withholding claims that outrun their reasons.',
      },
      {
        heading: 'The essays are part of the argument',
        paragraph: 'La Dioptrique, Les Météores, and La Géométrie show reasoning applied to refraction, rainbows, lenses, curves, and equations. Their mixture of deduction, hypothesis, construction, and observation complicates the familiar picture of rationalism as thought conducted without experience.',
      },
      {
        heading: 'Method has limits',
        paragraph: 'Breaking problems into parts and proceeding in order can expose dependencies, but the procedure still requires judgment about where to begin, which simplifications are legitimate, and whether a proposed mechanism fits phenomena. The work is best read as a program under demonstration, not a universal four-step machine.',
      },
    ],
    sources: [
      image('Bibliothèque nationale de France / Wikimedia Commons — first-edition Discourse title page, 1637', 'https://commons.wikimedia.org/wiki/File:Page_de_titre_de_la_premi%C3%A8re_%C3%A9dition_du_discours_de_la_m%C3%A9thode.jpg'),
      academic('Stanford Encyclopedia of Philosophy — René Descartes', 'https://plato.stanford.edu/entries/descartes/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'descartes'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'descartes-meditations-foundation',
    assetId: 'rationalism-meditations-1641',
    displayName: 'Meditations: Doubt, the Cogito, and the Burden of Recovery',
    shortTitle: 'Descartes: Meditations',
    workLabel: 'DESCARTES · MEDITATIONS ON FIRST PHILOSOPHY',
    dateLabel: 'First Latin edition, Paris, 1641 · expanded edition, 1642',
    question: 'What remains certain when sensory belief, waking experience, mathematics, and even reasoning are placed under methodical doubt?',
    frontSubtitle: 'Dreaming, deception, cogito, ideas, God, external world, mind, body, objections, and replies',
    lead: 'The Meditations does not end with doubt. It uses increasingly radical skeptical scenarios to locate the certainty of thinking, then attempts to recover a trustworthy order of knowledge, an external world, and embodied life. The published objections and replies make disagreement part of the work’s original architecture.',
    keyIdeas: [
      'The cogito is encountered in the act of thinking rather than inferred from a general syllogism.',
      'Clear and distinct perception carries epistemic force only within Descartes’s larger argument about a non-deceiving God.',
      'Real distinction between mind and body does not eliminate their experienced union.',
    ],
    cautions: [
      'Methodical doubt is a temporary instrument of inquiry, not Descartes’s settled skepticism.',
      'The alleged “Cartesian circle” remains a live interpretive dispute; the text should not be presented as resolving every objection by consensus.',
    ],
    sections: [
      {
        heading: 'Doubt is deliberately intensified',
        paragraph: 'Ordinary sensory error gives way to the dream problem and then to the possibility of a powerful deceiver. The sequence tests not whether every belief is actually false, but whether a belief can serve as an unshakable foundation while a reason for doubt remains conceivable.',
      },
      {
        heading: 'Thinking discloses a thinker',
        paragraph: 'Whenever deception or doubt occurs, thinking is occurring; in that performance, existence cannot be denied. Descartes then asks what this “I” is and gives priority to thinking before claiming secure knowledge of body, creating the asymmetry that later arguments must address.',
      },
      {
        heading: 'Recovery creates new burdens',
        paragraph: 'Arguments concerning God, error, material things, and mind–body distinction are meant to move from first certainty back to a world. Critics immediately challenged the proofs, the rule of clear and distinct perception, and the relation between distinction and union. The objections and replies display foundationalism as contested practice rather than solitary triumph.',
      },
    ],
    sources: [
      image('Bibliothèque nationale de France / Wikimedia Commons — 1641 Meditationes title page', 'https://commons.wikimedia.org/wiki/File:Meditationes_de_prima_philosophia_1641.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Descartes’ Epistemology', 'https://plato.stanford.edu/entries/descartes-epistemology/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'descartes'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'elisabeth-descartes-union',
    assetId: 'rationalism-elisabeth-portrait',
    displayName: 'Princess Elisabeth: The Mind–Body Union Put to the Test',
    shortTitle: 'Elisabeth Challenges Descartes',
    workLabel: 'ELISABETH OF BOHEMIA · CORRESPONDENCE, CAUSATION, AND EMBODIMENT',
    dateLabel: 'Correspondence with Descartes, 1643–1649 · displayed portrait c. 1640s',
    question: 'How can an unextended thinking substance determine the motion of an extended body?',
    frontSubtitle: 'Causal interaction, embodiment, passions, virtue, freedom, medicine, and political judgment',
    lead: 'Elisabeth’s question of May 1643 identifies a structural pressure in Cartesian dualism: ordinary explanations of motion appeal to contact, shape, or extension, none of which belongs to an immaterial mind. Her sustained correspondence with Descartes develops an original inquiry into embodiment, the passions, freedom, health, and the conditions of a good life.',
    keyIdeas: [
      'A demand for an intelligible causal account exposes tension between real distinction and lived union.',
      'Elisabeth tests metaphysics against illness, emotion, agency, and practical judgment.',
      'The letters form philosophical work even though they were not composed as a conventional treatise.',
    ],
    cautions: [
      'Elisabeth is a philosopher and interlocutor, not merely the person who prompted a better-known man to clarify his views.',
      'Do not confuse Elisabeth of Bohemia (1618–1680) with medieval figures who share the same name or title.',
    ],
    sections: [
      {
        heading: 'A precise question changes the debate',
        paragraph: 'Elisabeth asks Descartes to explain how the soul moves the body given his own account of physical determination. His appeal to the primitive notion of mind–body union does not fully satisfy her request for intelligibility, and the exchange keeps pressure on the gap between metaphysical categories and causal explanation.',
      },
      {
        heading: 'Embodiment reaches ethics',
        paragraph: 'Their letters turn from causation toward passions, melancholy, health, generosity, and freedom. Elisabeth resists advice that treats bodily and political circumstances as easily governed by thought, insisting that ethical agency is exercised within conditions that can constrain attention and action.',
      },
      {
        heading: 'Correspondence is a philosophical form',
        paragraph: 'The dialogical setting permits objections, revisions, examples, and shifts between metaphysics and practice. Reading only Descartes’s replies obscures the conceptual direction supplied by Elisabeth’s questions and the independent standards by which she evaluates his answers.',
      },
    ],
    sources: [
      image('Rijksmuseum / Wikimedia Commons — Alexander Cooper, Elisabeth of the Palatinate', 'https://commons.wikimedia.org/wiki/File:Elizabeth_(1618-80)_van_de_Paltz,_dochter_van_Frederik_V,_koning_van_Bohemen,_bijgenaamd_de_%27Winterkoning%27_Rijksmuseum_SK-A-4314.jpeg'),
      academic('Stanford Encyclopedia of Philosophy — Elisabeth, Princess of Bohemia', 'https://plato.stanford.edu/entries/elisabeth-bohemia/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'descartes'},
    entityKind: 'philosopher',
    articleActionLabel: 'Open Descartes and the Cartesian debate',
  }),
  record({
    id: 'descartes-treatise-man-embodiment',
    assetId: 'rationalism-descartes-pineal',
    displayName: 'Treatise on Man: Mechanical Physiology and the Lived Union',
    shortTitle: 'Descartes: The Mechanical Body',
    workLabel: 'DESCARTES · TREATISE ON MAN AND THE PASSIONS',
    dateLabel: 'Drafted c. 1632–1633 · published posthumously in the 1660s',
    question: 'Can bodily perception and action be modeled mechanically while human experience remains a genuine union of mind and body?',
    frontSubtitle: 'Animal spirits, nerves, reflex-like motion, pineal gland, sensation, passion, and historical model',
    lead: 'Descartes imagines a body whose nerves, animal spirits, organs, and brain can account for complex behavior through mechanical processes. He assigns the pineal gland a coordinating role in human sensation and action, but his later language of mind–body union shows that physiology does not exhaust embodied experience.',
    keyIdeas: [
      'Mechanical explanation extends far beyond simple locomotion to sensation and organized response.',
      'The pineal gland serves a coordinating role in Descartes’s model, not a modern scientific discovery about consciousness.',
      'The Passions of the Soul links bodily mechanisms to felt emotion and practical self-government.',
    ],
    cautions: [
      'The displayed diagram is seventeenth-century speculative physiology, not an accurate map of the nervous system.',
      'Calling every described response a modern “reflex” can project later terminology and theory backward.',
    ],
    sections: [
      {
        heading: 'A machine can imitate life',
        paragraph: 'The hypothetical human machine receives motions at the senses, transmits them through nerves, redistributes animal spirits, and produces bodily responses. By explaining much behavior without invoking thought, Descartes redraws the boundary between bodily organization and rational mind.',
      },
      {
        heading: 'The pineal gland coordinates a model',
        paragraph: 'Because many sensory organs are paired while conscious perception seems unified, Descartes locates a special coordinating function in the unpaired pineal gland. The proposal responds to a philosophical problem using the anatomy available to him; it should be interpreted historically rather than celebrated as neuroscience.',
      },
      {
        heading: 'Union resists reduction to a diagram',
        paragraph: 'Hunger, pain, emotion, and voluntary action are experienced as belonging to an embodied person, not as messages observed by a detached pilot. Descartes’s insistence on this “substantial union” complicates the simple museum caricature in which Cartesian human beings are ghosts merely lodged inside machines.',
      },
    ],
    sources: [
      image('Wikimedia Commons — diagram from Descartes’s Treatise on Man', 'https://commons.wikimedia.org/wiki/File:Descartes_diagram.png'),
      academic('Stanford Encyclopedia of Philosophy — Descartes and the Pineal Gland', 'https://plato.stanford.edu/archives/sum2026/entries/pineal-gland/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'descartes'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'spinoza-ethics-geometrical-order',
    assetId: 'rationalism-ethics-propositions',
    displayName: 'Ethics in Geometrical Order: From Substance to Freedom',
    shortTitle: 'Spinoza: Ethics',
    workLabel: 'SPINOZA · ETHICS, DEMONSTRATED IN GEOMETRICAL ORDER',
    dateLabel: 'Published posthumously in Opera Posthuma, 1677',
    question: 'What does a geometrical sequence of definitions, propositions, proofs, and scholia contribute to an ethics of human freedom?',
    frontSubtitle: 'Substance, attributes, modes, necessity, mind, affects, bondage, reason, and blessedness',
    lead: 'Spinoza’s Ethics moves from the nature of God to the human mind, affects, bondage, and freedom through a deliberately ordered form. Its demonstrations seek systematic dependence, while prefaces, appendices, and scholia expose prejudice, emotion, politics, scripture, and the practical stakes of understanding.',
    keyIdeas: [
      'The order of the work links metaphysics, psychology, and ethics rather than treating them as separate subjects.',
      'Definitions and propositions coexist with polemical and experiential prose in scholia and appendices.',
      'Freedom grows through adequate understanding and active affects within nature’s necessity.',
    ],
    cautions: [
      '“Geometrical order” does not mean that Spinoza considered human life emotionless or reducible to diagrams.',
      'The posthumous volume concealed author and publisher information because publication carried real religious and political danger.',
    ],
    sections: [
      {
        heading: 'Metaphysics bears ethical weight',
        paragraph: 'If everything follows from the necessity of one infinite substance, human beings are not independent kingdoms inside nature. This reorientation changes how responsibility, emotion, and liberation are framed: the task becomes understanding causes and increasing activity rather than escaping causal order.',
      },
      {
        heading: 'The form disciplines transitions',
        paragraph: 'A proposition cites prior definitions, axioms, and results, making dependencies inspectable. Yet Spinoza repeatedly shifts registers to diagnose imagination, final causes, superstition, and ordinary experience. The geometrical presentation organizes a philosophical therapy without replacing rhetoric or interpretation.',
      },
      {
        heading: 'Freedom is achieved by degrees',
        paragraph: 'Bondage names domination by passive affects and inadequate ideas, not the mere fact of causation. Reason, common notions, and intuitive knowledge can reorganize affects into more active forms, culminating in an intellectual love of God or Nature whose meaning remains philosophically and religiously disputed.',
      },
    ],
    sources: [
      image('Wikimedia Commons — opening propositions of Spinoza’s Ethics, Opera Posthuma, 1677', 'https://commons.wikimedia.org/wiki/File:Spinoza_Ethica_Pars1_Prop1.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Baruch Spinoza', 'https://plato.stanford.edu/entries/spinoza/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'spinoza'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'spinoza-scripture-freedom',
    assetId: 'rationalism-tractatus-manuscript-note',
    displayName: 'Theological-Political Treatise: Scripture, Authority, and Freedom',
    shortTitle: 'Spinoza: Scripture and Freedom',
    workLabel: 'SPINOZA · TRACTATUS THEOLOGICO-POLITICUS',
    dateLabel: 'Published anonymously, Amsterdam, 1670, under a false Hamburg imprint',
    question: 'Can freedom of philosophizing strengthen civic peace while scripture is read through its languages, histories, and purposes?',
    frontSubtitle: 'Scriptural interpretation, prophecy, miracles, natural law, sovereignty, toleration, and speech',
    lead: 'The Theological-Political Treatise joins historical criticism of scripture to an argument about political authority and the freedom to philosophize. Spinoza distinguishes philosophy’s pursuit of truth from scripture’s practical aim of obedience and justice, while locating prophecy and miracles within nature rather than outside it.',
    keyIdeas: [
      'Scripture should be interpreted through language, context, compilation, audience, and internal comparison.',
      'A miracle is not a breach in nature’s order but an event whose natural causes are unknown to observers.',
      'Political stability can depend on permitting judgment and expression rather than policing every belief.',
    ],
    cautions: [
      'Spinoza does not simply dismiss scripture; he argues for its moral and political efficacy while denying it philosophical authority over nature.',
      'His defense of freedom is historically bounded and should not be equated without qualification with a complete modern theory of liberal rights.',
    ],
    sections: [
      {
        heading: 'A text has a history',
        paragraph: 'Spinoza asks readers to infer meaning from Hebrew usage, literary setting, transmission, and the aims of speakers rather than from a prior theological system. Questions about authorship and compilation make the Bible a historical collection without making its ethical teaching worthless.',
      },
      {
        heading: 'Nature admits no exceptions',
        paragraph: 'Because divine power and natural order are not competing agencies, an event cannot become more divine by violating nature. Reports of miracles instead disclose human interpretation, limited causal knowledge, and the rhetorical needs of particular audiences.',
      },
      {
        heading: 'Freedom becomes a political problem',
        paragraph: 'The closing chapters ask how sovereign power, religious authority, public worship, and individual judgment can coexist. Spinoza argues that attempts to command inward belief are ineffective and destabilizing, while the freedom to reason and speak can be compatible with obedience to public law.',
      },
    ],
    sources: [
      image('Wikimedia Commons — a manuscript annotation to chapter IX of the Tractatus', 'https://commons.wikimedia.org/wiki/File:Benedictus_de_Spinoza_-_Manuscript_notes_with_Tractatus_theologico-politicus_IX_Adnotatio_14.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Spinoza’s Political Philosophy', 'https://plato.stanford.edu/entries/spinoza-political/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'spinoza'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'conway-principles-vital-creation',
    assetId: 'rationalism-conway-principia',
    displayName: 'Anne Conway’s Principles: A Living and Transformable Creation',
    shortTitle: 'Conway: The Principles',
    workLabel: 'ANNE CONWAY · PRINCIPLES OF THE MOST ANCIENT AND MODERN PHILOSOPHY',
    dateLabel: 'Anonymous Latin edition, 1690 · English edition, 1692 · both posthumous',
    question: 'What if created reality is living, perceptive, and capable of transformation rather than divided into dead matter and immaterial mind?',
    frontSubtitle: 'God, Christ, creatures, living substance, spirit and body, change, justice, and restoration',
    lead: 'Conway distinguishes immutable God, Christ as mediator, and a created order whose members are living, perceptive, and changeable. Spirit and body mark degrees or states within created substance rather than two incompatible Cartesian kinds, allowing moral and bodily transformation to belong to one metaphysical world.',
    keyIdeas: [
      'Created beings share a living substantial order while remaining distinct from God.',
      'Body is not absolutely dead matter but a comparatively condensed or obscured mode of creaturely life.',
      'Divine goodness and justice support creaturely perfectibility and restoration rather than eternal metaphysical stasis.',
    ],
    cautions: [
      'Conway’s system is explicitly theological; removing God, Christ, and restoration produces a misleading secular vitalism.',
      'The surviving work was found after her death, transcribed from difficult notes, translated into Latin, published anonymously, and then translated into English; every edition is mediated.',
    ],
    sections: [
      {
        heading: 'Dualism gives way to gradation',
        paragraph: 'Conway rejects an absolute gulf between thinking spirit and extended matter. Created beings can become more spiritual or bodily while retaining continuity through change, offering a metaphysical framework for interaction that does not require two wholly alien created substances.',
      },
      {
        heading: 'Creator and creation remain distinct',
        paragraph: 'Her criticism of Cartesianism does not collapse all things into one divine substance. God is immutable and incapable of creaturely change; Christ mediates between God and creatures; creation forms a third order marked by mutability, multiplicity, and moral development.',
      },
      {
        heading: 'Publication changes the evidence',
        paragraph: 'Conway published nothing in her lifetime. The Principles emerged from notes that others transcribed and translated, and the printed title page did not name her. Responsible reading separates her arguments from editorial additions while acknowledging that no untouched authorial manuscript survives for comparison.',
      },
    ],
    sources: [
      image('Google Books / Austrian National Library — 1690 Principia scan', 'https://play.google.com/store/books/details/Franciscus_Mercurius_van_Helmont_Principia_philoso?id=y6hbDBQqTiQC'),
      academic('Cambridge Platonism Sourcebook — Conway’s 1692 Principles', 'https://www.cambridge-platonism.divinity.cam.ac.uk/view/texts/diplomatic/Conway1692'),
      academic('Stanford Encyclopedia of Philosophy — Lady Anne Conway', 'https://plato.stanford.edu/entries/conway/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'anne-conway'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'conway-intellectual-network',
    assetId: 'rationalism-henry-more-portrait',
    displayName: 'Conway’s Intellectual Network: Correspondence Beyond the University',
    shortTitle: 'Conway’s Philosophical Network',
    workLabel: 'CONWAY, HENRY MORE, VAN HELMONT, AND CORRESPONDENCE',
    dateLabel: 'Correspondence and household study, chiefly 1650s–1670s',
    question: 'How does philosophy develop when access to education, books, interlocutors, and publication depends on private networks rather than a university post?',
    frontSubtitle: 'Henry More, van Helmont, Cartesian study, Platonism, Kabbalah, Quakers, gender, illness, and access',
    lead: 'Barred by gender from university education, Conway pursued philosophy through tutors, correspondence, family connections, and the intellectual household at Ragley. Henry More first guided her study of Descartes; Franciscus Mercurius van Helmont later brought additional medical, Kabbalistic, and religious materials into a network in which Conway argued rather than merely received.',
    keyIdeas: [
      'Correspondence enabled sustained philosophical testing outside formal academic institutions.',
      'Conway moved from serious Cartesian study to criticisms of dualism, materialism, and Spinozism.',
      'Networks shaped which manuscripts survived, how the Principles was edited, and how it reached readers including Leibniz.',
    ],
    cautions: [
      'Do not reduce Conway to a pupil of Henry More or a conduit between male thinkers.',
      'Her chronic illness affected daily conditions and philosophical interests, but it does not provide a reductive cause of her metaphysics.',
    ],
    sections: [
      {
        heading: 'Education travels through letters',
        paragraph: 'More translated, explained, and debated philosophy for Conway while taking her objections seriously. Letters could carry arguments across distances and around institutional exclusions, though access still depended on wealth, family position, literacy, and cooperative correspondents.',
      },
      {
        heading: 'A network contains disagreements',
        paragraph: 'Cambridge Platonism, Cartesian mechanism, Quaker practice, medicine, and Christian Kabbalah did not blend into one doctrine. Conway selected, criticized, and reorganized claims from several sources, including More’s own views, in constructing her account of living creation.',
      },
      {
        heading: 'Transmission leaves unequal traces',
        paragraph: 'Others handled Conway’s notes after her death, translated the work, and helped circulate it. Those acts preserved a philosophy that might otherwise have disappeared, but anonymity and editorial mediation also delayed attribution. The network is therefore both an enabling institution and part of the problem of recovering her authorship.',
      },
    ],
    sources: [
      image('Rijksmuseum / Wikimedia Commons — Henry More engraving, RP-P-OB-46.333', 'https://commons.wikimedia.org/wiki/File:Portret_van_Henry_More,_RP-P-OB-46.333.jpg'),
      academic('Project Vox — Anne Conway', 'https://projectvox.org/conway-1631-1679/'),
      academic('Stanford Encyclopedia of Philosophy — Lady Anne Conway', 'https://plato.stanford.edu/entries/conway/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'anne-conway'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'leibniz-monadology-perception',
    assetId: 'rationalism-leibniz-monadology',
    displayName: 'Monadology: Simple Substances, Perception, and Change',
    shortTitle: 'Leibniz: Monadology',
    workLabel: 'LEIBNIZ · MONADOLOGY',
    dateLabel: 'Composed in French, 1714 · unpublished in Leibniz’s lifetime',
    question: 'How can nonextended simple substances ground unity and change in a world that appears bodily, composite, and interactive?',
    frontSubtitle: 'Monads, simplicity, perception, appetite, petites perceptions, body, expression, and hierarchy',
    lead: 'The Monadology condenses Leibniz’s mature metaphysics into numbered paragraphs. Monads are simple, nonextended substances whose changing perceptions express the universe from distinct points of view. Bodily things are grounded in organized composites and phenomena, not assembled from monads as though monads were tiny pieces of matter.',
    keyIdeas: [
      'A genuine unity cannot be produced merely by collecting extended parts.',
      'Perception represents multiplicity within unity, while appetition names the internal principle of transition.',
      'Degrees of clarity distinguish bare perception, sensation, memory, and rational apperception.',
    ],
    cautions: [
      'Monads are not physical atoms located as minute objects inside space.',
      '“Windowless” means that no created substance directly inserts a state into another; it does not mean that monads represent nothing beyond themselves.',
    ],
    sections: [
      {
        heading: 'Unity is metaphysical, not miniature',
        paragraph: 'Whatever is extended can be divided conceptually into parts, so extension by itself does not explain a true individual. Leibniz posits simple substances as principles of unity while treating bodies as organized composites whose reality and persistence require further analysis.',
      },
      {
        heading: 'Change comes from within',
        paragraph: 'Each monad passes from perception to perception according to its own law. Appetition is not necessarily conscious desire; it names the internal tendency by which one representational state develops into another, preserving activity without physical parts.',
      },
      {
        heading: 'Every viewpoint is partial',
        paragraph: 'Monads express one universe with different degrees of clarity. Human consciousness occupies only a small region within continuous perception, while innumerable petites perceptions help explain background awareness, temporal continuity, and how apparently sudden conscious states arise from less distinct processes.',
      },
    ],
    sources: [
      image('Gottfried Wilhelm Leibniz / Wikimedia Commons — Monadology manuscript', 'https://commons.wikimedia.org/wiki/File:Leibniz_Monadology_2.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Gottfried Wilhelm Leibniz', 'https://plato.stanford.edu/entries/leibniz/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'leibniz'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'leibniz-preestablished-harmony',
    assetId: 'rationalism-leibniz-correspondence',
    displayName: 'Pre-Established Harmony: Coordination Without Transfer',
    shortTitle: 'Leibniz: Pre-Established Harmony',
    workLabel: 'LEIBNIZ · CAUSATION, EXPRESSION, AND MIND–BODY AGREEMENT',
    dateLabel: 'Developed across writings and correspondence, especially from the 1690s',
    question: 'How can mind and body agree at every moment if neither directly transmits a state to the other?',
    frontSubtitle: 'Internal law, expression, mind and body, causation, occasionalism, clocks, and correspondence',
    lead: 'Leibniz argues that each substance unfolds according to an internal law while expressing the same ordered universe. Mental and bodily series correspond because God chose a world whose complete histories agree, not because mind pushes matter, matter produces thought, or God performs a new intervention at each event.',
    keyIdeas: [
      'Created substances possess their own principles of change.',
      'Mind and organic body express one world at different explanatory levels.',
      'Harmony competes with Cartesian interaction and occasionalist divine intervention.',
    ],
    cautions: [
      'The synchronized-clock image is an analogy for coordination, not a claim that minds or bodies contain literal clockwork programs.',
      'Leibniz still uses causal language in several senses; “no interaction” should not erase his accounts of activity, passivity, expression, and well-founded phenomena.',
    ],
    sections: [
      {
        heading: 'Agreement needs an explanation',
        paragraph: 'A decision is followed by bodily motion, and bodily injury is followed by pain, yet Leibniz denies that one created substance transfers a state into another. The problem is not ignored: correspondence must instead follow from the complete law and world-order through which each substance was created.',
      },
      {
        heading: 'Expression is perspectival',
        paragraph: 'Mental and bodily descriptions do not duplicate identical properties. They express the same universe according to different structures and degrees of clarity, allowing Leibniz to preserve explanatory plurality while denying a Cartesian collision between heterogeneous substances.',
      },
      {
        heading: 'Alternatives sharpen the system',
        paragraph: 'Descartes leaves interaction difficult to render intelligible; occasionalists assign apparent created causation to repeated divine action; Spinoza identifies mind and body as one mode under different attributes. Leibniz’s harmony preserves plural substances and continuous divine conservation, but raises its own questions about agency and responsibility.',
      },
    ],
    sources: [
      image('Gottfried Wilhelm Leibniz / Wikimedia Commons — correspondence, papers, and notes', 'https://commons.wikimedia.org/wiki/File:Korespondencja_Gottfrieda_Leibniza.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Leibniz on Causation', 'https://plato.stanford.edu/entries/leibniz-causation/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'leibniz'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'leibniz-new-essays-innateness',
    assetId: 'rationalism-leibniz-new-essays',
    displayName: 'New Essays: Innate Dispositions and the Work of Experience',
    shortTitle: 'Leibniz Replies to Locke',
    workLabel: 'LEIBNIZ · NEW ESSAYS ON HUMAN UNDERSTANDING',
    dateLabel: 'Written chiefly in 1703–1704 · withheld after Locke’s death · published in 1765',
    question: 'Can necessary truths arise through experience unless the mind already contains capacities and structures for recognizing them?',
    frontSubtitle: 'Locke, dialogue, innate dispositions, veined marble, necessary truths, reflection, and petites perceptions',
    lead: 'Leibniz answers Locke chapter by chapter through a dialogue between Philalethes and Theophilus. He accepts that experience occasions human knowledge while arguing that sensation alone cannot explain necessity, universality, identity, or the mind’s active organization of what it encounters.',
    keyIdeas: [
      'Innateness is usually a disposition or structured capacity, not a stock of fully conscious propositions.',
      'The veined-marble image describes tendencies that guide possible development without eliminating work or experience.',
      'Petites perceptions challenge any equation of mental reality with present conscious awareness.',
    ],
    cautions: [
      'Leibniz does not claim that experience is unnecessary or that infants consciously know metaphysical axioms.',
      'Because the manuscript was withheld and published only in 1765, it did not participate directly in the original public Locke debate as a contemporary printed reply.',
    ],
    sections: [
      {
        heading: 'A dialogue preserves disagreement',
        paragraph: 'Philalethes voices positions drawn from Locke while Theophilus responds for Leibniz. The format makes points of convergence visible alongside dispute and prevents “rationalism versus empiricism” from becoming a pair of isolated slogans.',
      },
      {
        heading: 'The marble has veins',
        paragraph: 'A block’s structure makes some figures easier to carve than others without containing a finished statue. Likewise, innate dispositions orient thought toward concepts and necessary relations, but education, attention, language, and experience remain conditions of their explicit development.',
      },
      {
        heading: 'Consciousness has a background',
        paragraph: 'Minute perceptions that are not individually noticed can combine into an audible wave, a mood, or a conscious discrimination. Leibniz uses them to explain continuity and to resist the idea that a perception exists only when reflective consciousness isolates it.',
      },
    ],
    sources: [
      image('University of Toronto / Wikimedia Commons — public-domain New Essays edition', 'https://commons.wikimedia.org/wiki/File:Leibniz_-_Nouveaux_Essais_sur_l%E2%80%99entendement_humain,_1921.djvu'),
      academic('Stanford Encyclopedia of Philosophy — Leibniz’s Philosophy of Mind', 'https://plato.stanford.edu/entries/leibniz-mind/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'leibniz'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'leibniz-clarke-space-time',
    assetId: 'rationalism-leibniz-clarke',
    displayName: 'Leibniz and Clarke: Is Space a Container or an Order?',
    shortTitle: 'The Leibniz–Clarke Correspondence',
    workLabel: 'LEIBNIZ AND SAMUEL CLARKE · SPACE, TIME, GOD, AND NATURE',
    dateLabel: 'Letters exchanged 1715–1716 · first collected edition, 1717',
    question: 'Could two universes differ only by an undetectable shift through absolute space, and would God have a sufficient reason to choose between them?',
    frontSubtitle: 'Relational and absolute space, time, sufficient reason, indiscernibles, Newtonian physics, and providence',
    lead: 'Leibniz’s final major correspondence confronts Samuel Clarke, a philosopher and theologian defending positions associated with Newton. Their exchange links the ontology of space and time to sufficient reason, divine choice, miracles, force, matter, and the adequacy of mechanical explanation.',
    keyIdeas: [
      'Leibniz treats space as an order of coexistences and time as an order of successions.',
      'Absolute shifts or reversals with no relational difference challenge sufficient reason and the identity of indiscernibles.',
      'Clarke defends real space and time while resisting claims that make God’s freedom depend on determining reasons.',
    ],
    cautions: [
      'Clarke was an accomplished interlocutor, not merely a stenographic mouthpiece for Newton.',
      'The dispute is not exhausted by “relativity versus Newton”; neither side is presenting Einsteinian spacetime.',
    ],
    sections: [
      {
        heading: 'An empty shift creates a dilemma',
        paragraph: 'If the entire material universe could occupy a different absolute location while every internal relation remained unchanged, Leibniz asks what reason God could have for choosing one placement. Without a difference that can ground choice, the two descriptions may not represent two possible worlds at all.',
      },
      {
        heading: 'Metaphysics enters physics',
        paragraph: 'Questions about void, atoms, force, motion, and conservation depend on what counts as a real entity and an adequate explanation. Leibniz’s relational order and Clarke’s defense of absolutes therefore carry theological and methodological commitments rather than functioning as neutral coordinate systems.',
      },
      {
        heading: 'Correspondence makes a public controversy',
        paragraph: 'The letters alternate claims, objections, and replies across national and intellectual networks near the end of Leibniz’s life. Their publication preserves genuine disagreement: neither sufficient reason nor divine freedom receives a formulation acceptable to both parties.',
      },
    ],
    sources: [
      image('Wellcome Collection / Internet Archive / Wikimedia Commons — 1717 collection of papers', 'https://commons.wikimedia.org/wiki/File:A_collection_of_papers_which_passed_between_the_late_learned_Mr._Leibnitz_and_Dr._Clarke_in_the_years_1715_and_1716_relating_to_the_principles_of_natural_philosophy_and_religion_(IA_b30520022).pdf'),
      academic('Stanford Encyclopedia of Philosophy — Leibniz’s Philosophy of Physics', 'https://plato.stanford.edu/entries/leibniz-physics/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'leibniz'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'leibniz-binary-symbolic-reason',
    assetId: 'rationalism-leibniz-binary',
    displayName: 'Binary Arithmetic: Symbolic Economy and Cross-Cultural Interpretation',
    shortTitle: 'Leibniz: Binary Arithmetic',
    workLabel: 'LEIBNIZ · EXPLICATION DE L’ARITHMÉTIQUE BINAIRE',
    dateLabel: 'Published in the Paris Academy’s Mémoires, 1703',
    question: 'What becomes visible when every whole number is represented using only zero and one?',
    frontSubtitle: 'Binary notation, calculation, symbolic economy, machines, Fu Xi diagrams, encounter, and anachronism',
    lead: 'Leibniz’s binary arithmetic represents numbers through combinations of zero and one and belongs to his broader search for notations that reduce complex reasoning to inspectable operations. He also interpreted diagrams associated with Fu Xi through correspondence about the Yijing, creating a revealing but asymmetrical cross-cultural episode.',
    keyIdeas: [
      'A sparse notation can expose regularities that ordinary decimal representation leaves less visible.',
      'Binary arithmetic belongs to Leibniz’s larger interest in symbolic calculation and reasoning instruments.',
      'The Fu Xi comparison emerged through Jesuit correspondence and Leibniz’s own interpretive framework.',
    ],
    cautions: [
      'Leibniz did not invent the modern electronic computer, and a binary table is not a computer architecture.',
      'Do not present the Yijing diagrams as simply “ancient Chinese binary code” or treat Chinese thought as raw confirmation for a European system.',
    ],
    sections: [
      {
        heading: 'Notation reorganizes a problem',
        paragraph: 'Writing integers with only zero and one lengthens some numerals while revealing powers, repetitions, and operational patterns. For Leibniz, the value of a notation lies not only in abbreviation but in whether its rules make relations easier to calculate and verify.',
      },
      {
        heading: 'Symbols connect to instruments',
        paragraph: 'Leibniz designed calculating machines and imagined more general calculi for disciplined reasoning. Binary arithmetic participates in that ambition, but the distance between a numerical notation, a mechanical calculator, and programmable digital computation must remain visible.',
      },
      {
        heading: 'Comparison is historically situated',
        paragraph: 'Joachim Bouvet sent Leibniz an arrangement of hexagrams attributed to Fu Xi, which Leibniz interpreted through binary arithmetic and his own theological interests. The encounter is evidence of global intellectual circulation and selective reading, not proof that either tradition secretly contained the other’s complete project.',
      },
    ],
    sources: [
      image('Gottfried Wilhelm Leibniz / Wikimedia Commons — binary table published in 1703', 'https://commons.wikimedia.org/wiki/File:Leibniz_binary_system_1703.png'),
      academic('Science in Context — the Fu Xi diagram and its analogy with Leibnizian binary arithmetic', 'https://www.cambridge.org/core/journals/science-in-context/article/abs/is-the-fuxi-liushisi-gua-fangwei-diagram-attributed-to-shao-yong-binary-clarifying-a-consequence-of-its-analogy-with-the-binary-arithmetic-of-leibniz/9BA1DB9CFF13D5BEADCAF8FF954108AC'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'leibniz'},
    entityKind: 'philosopher',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

const supplementalLayout = (
  id: MuseumSupplementalExhibitId,
  parentExhibitId: 'rationalism' | 'descartes' | 'spinoza' | 'anne-conway' | 'leibniz',
  guidedAfterExhibitId: 'rationalism' | 'descartes' | 'spinoza' | 'anne-conway' | 'leibniz',
  zoneId:
    | 'rationalism-cartesian-foundations'
    | 'rationalism-spinoza-conway'
    | 'rationalism-leibniz-system',
  position: {x: number; z: number},
  rotationY: number,
  assetId: Parameters<typeof authorSupplementalLayout>[0]['assetId'],
  mediaWidth: number,
  mediaHeight: number,
  installationKind: 'rationalism-work' | 'rationalism-context' | 'rationalism-concept',
  accent: string,
) => authorSupplementalLayout({
  id,
  parentExhibitId,
  guidedAfterExhibitId,
  zoneId,
  position,
  rotationY,
  assetId,
  mediaWidth,
  mediaHeight,
  installationKind,
  accent,
});

export const RATIONALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  supplementalLayout('descartes-discourse-method', 'descartes', 'rationalism', 'rationalism-cartesian-foundations', {x: -5.55, z: -26.88}, 0, 'rationalism-discourse-first-edition', 1.91, 2.7, 'rationalism-work', RATIONALISM_PALETTE.blue),
  supplementalLayout('descartes-meditations-foundation', 'descartes', 'descartes', 'rationalism-cartesian-foundations', {x: -5.55, z: -10.45}, Math.PI, 'rationalism-meditations-1641', 1.88, 2.7, 'rationalism-work', RATIONALISM_PALETTE.indigo),
  supplementalLayout('elisabeth-descartes-union', 'descartes', 'descartes', 'rationalism-cartesian-foundations', {x: 5.55, z: -26.88}, 0, 'rationalism-elisabeth-portrait', 1.82, 2.7, 'rationalism-context', RATIONALISM_PALETTE.gold),
  supplementalLayout('descartes-treatise-man-embodiment', 'descartes', 'descartes', 'rationalism-cartesian-foundations', {x: 5.55, z: -10.45}, Math.PI, 'rationalism-descartes-pineal', 2.95, 2.3, 'rationalism-concept', RATIONALISM_PALETTE.red),
  supplementalLayout('spinoza-ethics-geometrical-order', 'spinoza', 'spinoza', 'rationalism-spinoza-conway', {x: -5.55, z: -8.22}, 0, 'rationalism-ethics-propositions', 1.91, 2.7, 'rationalism-work', RATIONALISM_PALETTE.red),
  supplementalLayout('spinoza-scripture-freedom', 'spinoza', 'spinoza', 'rationalism-spinoza-conway', {x: -5.55, z: 8.22}, Math.PI, 'rationalism-tractatus-manuscript-note', 1.91, 2.7, 'rationalism-work', RATIONALISM_PALETTE.green),
  supplementalLayout('conway-principles-vital-creation', 'anne-conway', 'anne-conway', 'rationalism-spinoza-conway', {x: 5.55, z: -8.22}, 0, 'rationalism-conway-principia', 1.89, 2.7, 'rationalism-work', RATIONALISM_PALETTE.indigo),
  supplementalLayout('conway-intellectual-network', 'anne-conway', 'anne-conway', 'rationalism-spinoza-conway', {x: 5.55, z: 8.22}, Math.PI, 'rationalism-henry-more-portrait', 1.78, 2.7, 'rationalism-context', RATIONALISM_PALETTE.gold),
  supplementalLayout('leibniz-monadology-perception', 'leibniz', 'leibniz', 'rationalism-leibniz-system', {x: -5.55, z: 10.45}, 0, 'rationalism-leibniz-monadology', 1.96, 2.7, 'rationalism-work', RATIONALISM_PALETTE.indigo),
  supplementalLayout('leibniz-preestablished-harmony', 'leibniz', 'leibniz', 'rationalism-leibniz-system', {x: -5.55, z: 26.88}, Math.PI, 'rationalism-leibniz-correspondence', 3.02, 2.12, 'rationalism-concept', RATIONALISM_PALETTE.blue),
  supplementalLayout('leibniz-new-essays-innateness', 'leibniz', 'leibniz', 'rationalism-leibniz-system', {x: 5.55, z: 10.45}, 0, 'rationalism-leibniz-new-essays', 1.91, 2.7, 'rationalism-work', RATIONALISM_PALETTE.green),
  supplementalLayout('leibniz-clarke-space-time', 'leibniz', 'leibniz', 'rationalism-leibniz-system', {x: 10.85, z: 18.6667}, -Math.PI / 2, 'rationalism-leibniz-clarke', 1.89, 2.7, 'rationalism-context', RATIONALISM_PALETTE.red),
  supplementalLayout('leibniz-binary-symbolic-reason', 'leibniz', 'leibniz', 'rationalism-leibniz-system', {x: 5.55, z: 26.88}, Math.PI, 'rationalism-leibniz-binary', 2.65, 2.7, 'rationalism-concept', RATIONALISM_PALETTE.gold),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getRationalismSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const recordValue = RATIONALISM_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!recordValue) throw new Error(`Gallery 16 supplemental exhibit ${id} is missing.`);
  return recordValue;
};
