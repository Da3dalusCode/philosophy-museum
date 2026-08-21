import type {MuseumAssetId} from './museumAssetTypes';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
  type SupplementalExhibitAuthoring,
} from './museumSupplementalAuthoring';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import {
  EMPIRICISM_GALLERY_ID,
  EMPIRICISM_ROOM_SIGN_COPY,
} from './empiricismGalleryCuration';
import type {EmpiricismGalleryAssetId} from './empiricismGalleryAssets';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';
import {reviewEmpiricismSupplementalExhibit} from './empiricismSupplementalReview';

export {EMPIRICISM_GALLERY_ID, EMPIRICISM_ROOM_SIGN_COPY};

export const EMPIRICISM_PALETTE = Object.freeze({
  ink: '#20292b',
  blue: '#4f7383',
  indigo: '#656389',
  red: '#925b50',
  green: '#607a68',
  gold: '#a77d43',
  parchment: '#e7dcc6',
});

export type EmpiricismSupplementalExhibitId =
  | 'empiricism-micrographia-enlarged-sight'
  | 'locke-molyneux-crossmodal-vision'
  | 'locke-consciousness-prince-cobbler'
  | 'locke-rights-property-carolina'
  | 'berkeley-vision-learned-distance'
  | 'berkeley-perception-and-object'
  | 'berkeley-bermuda-college-project'
  | 'berkeley-camera-obscura-signs'
  | 'berkeley-siris-tar-water-chain'
  | 'hume-causation-billiard-table'
  | 'hume-self-theatre-without-spectator'
  | 'hume-sentiment-and-social-judgment'
  | 'hume-skepticism-backgammon-return'
  | 'hume-edinburgh-public-world';

type EmpiricismAuthoring = Omit<
  SupplementalExhibitAuthoring,
  'id' | 'assetId' | 'panelKicker'
> & {
  id: EmpiricismSupplementalExhibitId;
  assetId: EmpiricismGalleryAssetId;
};

const image = (label: string, url: string) => ({label, url, kind: 'collection-record' as const});
const academic = (label: string, url: string) => ({label, url, kind: 'academic-reference' as const});
const primary = (label: string, url: string) => ({label, url, kind: 'primary-text' as const});

const record = (input: EmpiricismAuthoring): MuseumSupplementalExhibit =>
  authorSupplementalExhibit({
    ...input,
    id: input.id as MuseumSupplementalExhibitId,
    assetId: input.assetId as MuseumAssetId,
    panelKicker: 'Gallery 17 work and context exhibit',
  });

export const EMPIRICISM_SUPPLEMENTAL_EXHIBITS = [
  record({
    id: 'empiricism-micrographia-enlarged-sight',
    assetId: 'empiricism-hooke-micrographia-flea',
    displayName: 'Micrographia: When an Instrument Changes What Counts as Seen',
    shortTitle: 'Hooke: Enlarged Sight',
    workLabel: 'ROBERT HOOKE · MICROGRAPHIA, INSTRUMENT, AND PUBLIC EVIDENCE',
    dateLabel: 'Microscopic observations published in London, 1665',
    question: 'Does magnification simply reveal a ready-made fact, or does reliable seeing also require construction, comparison, drawing, testimony, and trained judgment?',
    frontSubtitle: 'Microscope, specimen, scale, drawing, engraving, repeatability, testimony, and learned observation',
    lead: 'Hooke’s flea is spectacular because it turns an ordinary irritation into an unfamiliar articulated body. The microscope extends sensation, but the printed image also reminds us that evidence does not travel by unaided sight alone. Specimen preparation, lens quality, repeated observation, drawing, engraving, publication, and criticism mediate what readers can inspect. This is empirical inquiry as a public practice, not a passive mind receiving a perfect copy.',
    keyIdeas: [
      'Instruments extend sense while introducing conditions that observers must identify and control.',
      'Representations allow private observations to become shared, criticizable evidence.',
      'Authority depends on repeatable practice and an inspectable chain, not visual drama alone.',
    ],
    cautions: [
      'The engraving is neither a photograph nor an unmediated view through Hooke’s microscope.',
      'Hooke should not be collapsed into Locke’s theory of ideas or used to prove one uniform British empiricist method.',
    ],
    sections: [
      {heading: 'An altered scale disrupts habit', paragraph: 'Familiar categories become unstable when a surface, edge, or insect appears at a new scale. Inquiry begins by learning which visible features belong to the object, the preparation, or the instrument.'},
      {heading: 'Observation becomes a chain', paragraph: 'Hooke moved between specimen, lens, hand, sketch, engraver, page, and reader. Each link could preserve, emphasize, or distort, so empirical responsibility includes documenting how an image was made.'},
      {heading: 'Public seeing is learned', paragraph: 'A reader who never used Hooke’s microscope could nevertheless question his account through a detailed plate and stated procedure. Testimony and representation are not enemies of experience; they are conditions of most shared knowledge.'},
    ],
    sources: [
      image('Wellcome Collection / Wikimedia Commons — Hooke’s flea from Micrographia', 'https://commons.wikimedia.org/wiki/File:Robert_Hooke,_Micrographia,_flea_Wellcome_L0043503.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Experiment in Physics', 'https://plato.stanford.edu/entries/physics-experiment/'),
      primary('Project Gutenberg — Micrographia', 'https://www.gutenberg.org/ebooks/15491'),
    ],
    articleRoute: {kind: 'branch', branchId: 'empiricism'},
    entityKind: 'branch',
  }),
  record({
    id: 'locke-molyneux-crossmodal-vision',
    assetId: 'locke-molyneux-ribera-touch',
    displayName: 'Molyneux’s Question: Can Touch Be Recognized at First Sight?',
    shortTitle: 'Locke and Molyneux',
    workLabel: 'MOLYNEUX’S QUESTION · TOUCH, SIGHT, AND LEARNED COORDINATION',
    dateLabel: 'Posed to Locke in 1688 · printed in the Essay from 1694',
    question: 'If a person born blind learned a cube and sphere by touch, would restored vision identify them before touch connected the senses?',
    frontSubtitle: 'Cross-modal recognition, concepts, visual learning, touch, sight, and experimental design',
    lead: 'William Molyneux posed the problem to Locke, who printed it in later editions of the Essay. Its force lies in separating possession of a concept from the sensory route by which an object is presented. Ribera’s earlier painting of a blind man identifying sculptural form by touch while a painted face remains unavailable to him offers a historically appropriate visual companion. Berkeley, Leibniz, and later researchers gave competing answers; no single operation or study simply reproduces the stipulated case.',
    keyIdeas: [
      'Cross-modal recognition may depend on learned coordination rather than identical visual and tactile ideas.',
      'The phrase “at first sight” distinguishes immediate recognition from rapid learning.',
      'Restored-vision cases and psychology alter the question as well as supplying evidence about it.',
    ],
    cautions: [
      'Ribera’s painting predates Molyneux’s question and is a visual companion, not evidence for an answer.',
      'Restored vision is not a clean philosophical switch, and patients receiving care are not instruments for solving a puzzle.',
    ],
    sections: [
      {heading: 'A cube is not one sensation', paragraph: 'Tactile edges, visual contours, movement, and naming can converge on one object without presenting identical ideas. The problem asks what makes that convergence possible.'},
      {heading: 'Answers divide the early moderns', paragraph: 'Locke and Berkeley lean toward learned coordination, while Leibniz allows a greater role for rationally grasped structure. Their disagreement prevents “empiricism” from becoming one automatic answer.'},
      {heading: 'Experiment changes the burden', paragraph: 'Surgical and contemporary studies bring evidence, but congenital history, postoperative acuity, time to learn, and task design complicate interpretation. The responsible result is constrained inquiry, not a triumphal yes or no.'},
    ],
    sources: [
      image('Norton Simon Museum / Wikimedia Commons — Jusepe de Ribera, The Sense of Touch', 'https://commons.wikimedia.org/wiki/File:Jos%C3%A9_de_Ribera_018.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Molyneux’s Problem', 'https://plato.stanford.edu/entries/molyneux-problem/'),
      primary('Project Gutenberg — Locke, Essay Concerning Human Understanding', 'https://www.gutenberg.org/ebooks/10615'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'locke'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'locke-consciousness-prince-cobbler',
    assetId: 'locke-cobbler-workshop-1671',
    displayName: 'The Prince and the Cobbler: Consciousness, Person, and Accountability',
    shortTitle: 'Locke: Prince and Cobbler',
    workLabel: 'LOCKE · PERSONAL IDENTITY, CONSCIOUSNESS, AND FORENSIC PERSONHOOD',
    dateLabel: 'Essay II.xxvii added to the second edition, 1694',
    question: 'If the consciousness of a prince appeared in a cobbler’s body, which human being would be the same person?',
    frontSubtitle: 'Human animal, substance, consciousness, memory, appropriation, responsibility, punishment, and social recognition',
    lead: 'Locke distinguishes the identity of a person from the persistence of one substance or organism. In the prince-and-cobbler case, continuity of consciousness seems to carry the person—and responsibility—across a bodily exchange. The proposal opened a durable debate about memory, circularity, gaps in awareness, resurrection, and whether first-person continuity can ground public judgments about praise and punishment.',
    keyIdeas: [
      '“Human animal,” “substance,” and “person” answer different identity questions.',
      'Person is a forensic concept tied to accountability rather than a simple synonym for soul.',
      'Consciousness reaches backward by appropriating past actions as one’s own.',
    ],
    cautions: [
      'Locke’s person is not merely a soul that migrates between bodies.',
      'The seventeenth-century workshop supplies social texture but was not painted to illustrate Locke’s example.',
    ],
    sections: [
      {heading: 'One word hides several criteria', paragraph: 'The same living organism may persist through cellular and mental change; the same material mass may not; the same person tracks actions a subject can own as theirs. Locke asks readers not to slide among these questions.'},
      {heading: 'Responsibility raises the stakes', paragraph: 'Punishment and reward should follow the agent who consciously performed an act. Amnesia, false memory, interrupted awareness, and public evidence expose the difficulty of applying that rule.'},
      {heading: 'Social rank is deliberately displaced', paragraph: 'Prince and cobbler make identity cross a hierarchy that bodies, clothing, labor, and law usually stabilize. The thought experiment reveals how metaphysical and socially recognized identity can come apart.'},
    ],
    sources: [
      image('Wikimedia Commons — David Teniers, A Cobbler in His Workshop, 1671', 'https://commons.wikimedia.org/wiki/File:David_Teniers_(II)_-_A_cobbler_in_his_workshop.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Locke on Personal Identity', 'https://plato.stanford.edu/entries/locke-personal-identity/'),
      primary('Project Gutenberg — Locke, Essay Concerning Human Understanding', 'https://www.gutenberg.org/ebooks/10615'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'locke'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'locke-rights-property-carolina',
    assetId: 'empiricism-locke-carolina-map',
    displayName: 'Rights, Property, and Carolina: Liberty Beside Colonial Power',
    shortTitle: 'Locke and Colonial Carolina',
    workLabel: 'LOCKE · NATURAL RIGHTS, PROPERTY, GOVERNMENT, COLONY, AND SLAVERY',
    dateLabel: 'Colonial service from the 1660s · displayed Carolina map c. 1680',
    question: 'How should a theory of natural freedom be read beside the offices, maps, land regimes, and slavery disputes of English colonization?',
    frontSubtitle: 'Natural equality, political trust, labor, appropriation, resistance, mapped land, dispossession, empire, and slavery',
    lead: 'Locke argues that people are naturally free and equal, that government is a conditional trust, and that rulers who destroy rights may be resisted. He also served as secretary to the Lords Proprietors of Carolina and the Board of Trade and Plantations, and scholarship disputes the exact reach of his authorship and intentions in the colony’s constitutional record. A near-contemporary map makes the contradiction impossible to leave abstract: theories of labor and property entered a world of surveyed land, Indigenous dispossession, imperial commerce, and racial slavery.',
    keyIdeas: [
      'Political power is fiduciary rather than absolute and can be forfeited.',
      'Labor, spoilage, sufficiency, money, inheritance, and improvement complicate appropriation.',
      'Locke’s colonial offices are established even where authorship and theoretical intent remain disputed.',
    ],
    cautions: [
      'Do not claim that Locke drew, owned, commissioned, or consulted this particular map.',
      'Do not say either that his theory straightforwardly caused colonial slavery or that anti-absolutism makes his entanglement irrelevant.',
    ],
    sections: [
      {heading: 'Trust can be forfeited', paragraph: 'Legislative power exists for public good and cannot legitimately reduce subjects to arbitrary domination. Dissolution and resistance follow when government attacks the ends for which it was formed.'},
      {heading: 'Property is not a limitless slogan', paragraph: 'Labor begins the argument, but waste, enough-and-as-good, money, inherited inequality, and the relation between improvement and land seizure remain contested.'},
      {heading: 'The map changes the reading situation', paragraph: 'Coastlines, rivers, settlements, and claims make political theory spatial. The panel preserves both the critical resources in Locke’s account and the institutions that exposed its boundaries.'},
    ],
    sources: [
      image('UNC North Carolina Maps / Wikimedia Commons — A New Description of Carolina', 'https://commons.wikimedia.org/wiki/File:A_New_Description_of_Carolina.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Locke’s Political Philosophy', 'https://plato.stanford.edu/entries/locke-political/'),
      academic('Stanford Encyclopedia of Philosophy — John Locke', 'https://plato.stanford.edu/entries/locke/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'locke'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'berkeley-vision-learned-distance',
    assetId: 'berkeley-perspective-instrument-1604',
    displayName: 'A New Theory of Vision: Distance Is Learned, Not Simply Seen',
    shortTitle: 'Berkeley: Learned Distance',
    workLabel: 'BERKELEY · A NEW THEORY OF VISION',
    dateLabel: 'First published in Dublin, 1709 · displayed instrument made 1604',
    question: 'Which features of spatial experience are immediately visible, and which are judgments learned through touch, movement, and repeated correlation?',
    frontSubtitle: 'Visible and tactile ideas, distance, size, bodily movement, perspective, learned signs, and practical action',
    lead: 'Berkeley argues that distance is not directly presented as a visual magnitude. Retinal and visible ideas function as signs whose practical meaning is learned through correlations with touch and bodily movement. A perspective instrument helps expose the difference between a geometrically projected image and an embodied perceiver who has learned what changes in size, clarity, convergence, and motion are likely to mean.',
    keyIdeas: [
      'Visual and tactile ideas are distinct rather than copies in two sensory channels.',
      'Distance perception is practical, developmental, and learned through successful action.',
      'Visible signs can guide behavior without resembling what they signify.',
    ],
    cautions: [
      'Bürgi’s 1604 device predates Berkeley and was not his apparatus.',
      'Optical geometry is not Berkeley’s complete account, and ordinary perception is not conscious calculation.',
    ],
    sections: [
      {heading: 'Projection is not yet depth', paragraph: 'A device can construct lines and viewpoints, but the perceiver must connect a changing visible field with reaching, walking, resistance, and successful action.'},
      {heading: 'Signs need not resemble', paragraph: 'A word can signify an object without looking like it. Berkeley extends this model to vision: visible ideas reliably indicate tactile possibilities through learned order.'},
      {heading: 'The insight outlives the metaphysics', paragraph: 'Readers can reject immaterialism while retaining Berkeley’s claim that perception has a developmental, cross-modal, and action-guiding history.'},
    ],
    sources: [
      image('Kunsthistorisches Museum / Wikimedia Commons — Jobst Bürgi perspective instrument', 'https://commons.wikimedia.org/wiki/File:Perspektive_Zeichenger%C3%A4t.jpg'),
      academic('Stanford Encyclopedia of Philosophy — George Berkeley', 'https://plato.stanford.edu/entries/berkeley/'),
      primary('Project Gutenberg — Berkeley, An Essay Towards a New Theory of Vision', 'https://www.gutenberg.org/ebooks/4722'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'berkeley'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'berkeley-perception-and-object',
    assetId: 'empiricism-berkeley-optical-illusion',
    displayName: 'The Reverse of a Painting: What Is Given, and What Is Inferred?',
    shortTitle: 'Berkeley: Perception and Object',
    workLabel: 'BERKELEY · IDEAS, OBJECTS, AND THE MATERIAL SUBSTRATUM',
    dateLabel: 'Principles published 1710 · Three Dialogues published 1713',
    question: 'When perception presents a coherent object, what licenses a further claim about an unknowable material support behind every sensible quality?',
    frontSubtitle: 'Ideas, sensible qualities, objects, abstraction, substratum, ordinary realism, spirit, and ordered experience',
    lead: 'Gijsbrechts paints the back of a framed canvas on the front of a canvas, making visual success depend on a mistaken inference. Berkeley likewise asks readers to separate the ideas actually perceived—color, shape, texture, sound, resistance—from “material substance” imagined as an unperceived support. His conclusion is not that ordinary things are unreal, but that their reality should not be placed in an abstraction that can never itself be perceived.',
    keyIdeas: [
      'Sensible objects are ordered collections of ideas rather than private fantasies.',
      'Material substratum is challenged as unintelligible, not merely hidden from current instruments.',
      'Ordinary realism and philosophical materialism are not identical claims.',
    ],
    cautions: [
      'The trompe-l’œil is a comparison, not Berkeley’s illustration or evidence for immaterialism.',
      'Optical deception does not prove that reality is private, voluntary, or unreal.',
    ],
    sections: [
      {heading: 'A successful appearance can mislead', paragraph: 'Viewers see a painted surface yet organize it as stretcher, canvas, tags, and shadows. Perception includes patterned presentation and interpretive expectation.'},
      {heading: 'Berkeley removes the hidden bearer', paragraph: 'If every sensible quality is an idea and an entirely quality-less support cannot be imagined, he asks what explanatory work the word “matter” performs.'},
      {heading: 'The public world remains', paragraph: 'Sensory ideas arrive involuntarily, in stable sequences shared among finite perceivers. Berkeley explains that order through God; critics ask whether divine coordination solves or relocates the explanatory problem.'},
    ],
    sources: [
      image('Statens Museum for Kunst / Wikimedia Commons — Gijsbrechts, Reverse of a Framed Painting', 'https://commons.wikimedia.org/wiki/File:Cornelius_Norbertus_Gijsbrechts_-_Trompe_l%27oeil._The_Reverse_of_a_Framed_Painting_-_Google_Art_Project.jpg'),
      academic('Stanford Encyclopedia of Philosophy — George Berkeley', 'https://plato.stanford.edu/entries/berkeley/'),
      primary('Project Gutenberg — Berkeley, Three Dialogues', 'https://www.gutenberg.org/ebooks/4724'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'berkeley'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'berkeley-bermuda-college-project',
    assetId: 'empiricism-berkeley-bermuda-scheme',
    displayName: 'The Bermuda Project: Education, Mission, and an Atlantic Detour',
    shortTitle: 'Berkeley’s Bermuda Project',
    workLabel: 'BERKELEY · COLLEGE SCHEME, NEWPORT, RELIGION, AND EMPIRE',
    dateLabel: 'Charter secured 1725 · Rhode Island residence, 1729–1731',
    question: 'What does Berkeley’s failed college scheme reveal about the institutional, religious, and imperial settings of a philosopher often reduced to one metaphysical slogan?',
    frontSubtitle: 'Education, mission, patronage, household, money, migration, Rhode Island, Bermuda, colonial hierarchy, and failure',
    lead: 'Berkeley secured a charter and expected parliamentary funding for a college intended to educate clergy and support missionary work connected with the Americas. He traveled with family and associates to Newport, Rhode Island, and waited from 1729 to 1731, but political support and funding collapsed. Smibert’s group portrait preserves that collective venture. It also requires critical framing: education and benevolence were imagined inside British Atlantic structures, while records connect Berkeley’s Whitehall household to the ownership of enslaved people.',
    keyIdeas: [
      'Philosophy travels through patrons, households, churches, money, and institutions.',
      'The project connects Berkeley’s theology and reform ambitions to Atlantic geography.',
      'Failure redirected people, artworks, books, land, and donations.',
    ],
    cautions: [
      'The college was planned for Bermuda but never built.',
      'Do not romanticize the Rhode Island interval or let the portrait erase the project’s missionary colonial hierarchy or the documented slaveholding in Berkeley’s Whitehall household.',
    ],
    sections: [
      {heading: 'A system sought an institution', paragraph: 'Berkeley’s concern with religion, education, and social reform extended beyond the Principles. The college scheme aimed to reproduce teachers and clergy, not merely to house abstract debate.'},
      {heading: 'Waiting became an intellectual episode', paragraph: 'Newport provided time for writing, conversation, and collecting while the promised grant receded. The venture’s material dependence contrasts with the apparent self-sufficiency of philosophical argument.'},
      {heading: 'Atlantic movement carries power', paragraph: 'People, portraits, libraries, land, missionary plans, and coerced labor moved within empire. Naming Berkeley’s slaveholding and the project’s plan to educate and convert Indigenous students does not refute immaterialism by association; it restores the institutions of power in which his reform ideals operated.'},
    ],
    sources: [
      image('Yale University Art Gallery / Wikimedia Commons — Smibert, The Bermuda Group', 'https://commons.wikimedia.org/wiki/File:John_Smibert_-_The_Bermuda_Group_(Dean_Berkeley_and_His_Entourage)_-_1808.1_-_Yale_University_Art_Gallery.jpg'),
      academic('Stanford Encyclopedia of Philosophy — George Berkeley', 'https://plato.stanford.edu/entries/berkeley/'),
      academic('Yale University Art Gallery — The Bermuda Group, accession 1808.1', 'https://artgallery.yale.edu/collections/objects/21'),
      academic('Trinity College Dublin — George Berkeley and Slavery: Reviewing the Evidence', 'https://www.tcd.ie/seniordean/legacies/berkeleyTLRWGworkingpaper.pdf'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'berkeley'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'berkeley-camera-obscura-signs',
    assetId: 'empiricism-camera-obscura',
    displayName: 'The Camera Obscura: Image, Cause, and the Language of Nature',
    shortTitle: 'Berkeley: Nature as Signs',
    workLabel: 'BERKELEY · SENSORY ORDER, NATURAL SIGNS, AND SCIENTIFIC USE',
    dateLabel: 'Major works 1709–1721 · displayed painting made 1764',
    question: 'Can a projected image help explain how ordered sensations guide action without becoming a miniature material world copied into the mind?',
    frontSubtitle: 'Image, cause, involuntariness, natural signs, law, prediction, imagination, public order, and instrumentalism',
    lead: 'Van Loo turns a camera-obscura demonstration into a social scene: bodies crowd around an apparatus that redirects light and produces an image under controlled conditions. Berkeley treats sensory order as a language whose signs are vivid, involuntary, and law-governed. The comparison helps visitors distinguish an image, its causal conditions, and the expectations it supports—while resisting the false claim that Berkeley thinks each observer invents a private world.',
    keyIdeas: [
      'Ideas of sense differ from imagination through force, order, and involuntariness.',
      'Natural regularities organize expectation and practical coordination.',
      'Science may describe predictive relations without positing unknowable material substance.',
    ],
    cautions: [
      'The 1764 painting postdates Berkeley’s major works and is not his model.',
      'A camera obscura is a material optical instrument and cannot by itself establish immaterialism.',
    ],
    sections: [
      {heading: 'An image arrives under constraints', paragraph: 'Participants cannot freely choose every projected contour. That difference between voluntary fancy and ordered appearance is central to Berkeley’s defense of a public world.'},
      {heading: 'Nature can function as signs', paragraph: 'Repeated sensory sequences teach agents what to expect and how to act. Explanation need not require that an idea resemble a hidden cause in every respect.'},
      {heading: 'Use and metaphysics can separate', paragraph: 'Berkeley’s De Motu permits mathematical mechanics to predict motion while rejecting force as an occult quality imagined behind phenomena. Critics question whether this instrumentalism explains enough.'},
    ],
    sources: [
      image('National Gallery of Art / Wikimedia Commons — Van Loo, The Camera Obscura', 'https://commons.wikimedia.org/wiki/File:Van_Loo_The_Camera_Obscura_1764.jpg'),
      academic('Stanford Encyclopedia of Philosophy — George Berkeley', 'https://plato.stanford.edu/entries/berkeley/'),
      primary('Project Gutenberg — Berkeley, Principles of Human Knowledge', 'https://www.gutenberg.org/ebooks/4723'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'berkeley'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'berkeley-siris-tar-water-chain',
    assetId: 'berkeley-scots-pine-botanical-plate',
    displayName: 'Siris: From Tar-Water to a Chain of Being',
    shortTitle: 'Berkeley: Siris',
    workLabel: 'BERKELEY · SIRIS, TAR-WATER, NATURAL PHILOSOPHY, AND METAPHYSICS',
    dateLabel: 'First published 1744 · displayed botanical plate published 1885',
    question: 'How does a practical medical enthusiasm become the opening of a late metaphysical work?',
    frontSubtitle: 'Pine tar, remedy, testimony, chemistry, active principles, fire, spirit, ancient sources, causation, and God',
    lead: 'Berkeley’s Siris begins by recommending tar-water, a preparation made by steeping pine tar in water, and then climbs through chemistry, spirit, ancient philosophy, causation, and God. The botanical plate foregrounds the material origin of that chain without pretending that a later illustration documents Berkeley’s recipe. The work shows an older Berkeley joining speculative natural philosophy to a remedy whose medical claims should not be repeated as current advice.',
    keyIdeas: [
      'The work’s “chain” is both literary form and philosophical ascent.',
      'Berkeley’s later thought cannot be reduced to the slogan esse est percipi.',
      'Medical observation and metaphysical interpretation require different kinds of warrant.',
    ],
    cautions: [
      'The 1885 Scots-pine plate is later botanical context, not an ingredient record for Berkeley.',
      'Tar-water is not evidence-based contemporary treatment; this exhibit does not recommend making or ingesting it.',
    ],
    sections: [
      {heading: 'A remedy opens the argument', paragraph: 'Berkeley reports observations and testimonies about tar-water before asking what active principles could explain its effects. The transition reveals how readily practical success can invite speculative causation.'},
      {heading: 'The chain changes altitude', paragraph: 'Each section links to the next, moving from vegetal materials to fire, spirit, intellect, and theological order. Readers dispute whether the ascent is systematic, exploratory, or deliberately associative.'},
      {heading: 'Historical medicine needs a boundary', paragraph: 'The exhibit interprets why the remedy seemed plausible and popular without validating its broad claims. Intellectual history is not medical instruction.'},
    ],
    sources: [
      image('Wikimedia Commons — Otto Wilhelm Thomé, Scots pine botanical plate', 'https://commons.wikimedia.org/wiki/File:Illustration_Pinus_sylvestris0.jpg'),
      academic('Stanford Encyclopedia of Philosophy — George Berkeley', 'https://plato.stanford.edu/entries/berkeley/'),
      primary('Internet Archive — Berkeley, Siris', 'https://archive.org/details/sirischainofphil00berk'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'berkeley'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'hume-causation-billiard-table',
    assetId: 'empiricism-hume-billiards',
    displayName: 'Billiard Balls and Necessary Connection',
    shortTitle: 'Hume: Billiard Balls',
    workLabel: 'HUME · CAUSATION, CONSTANT CONJUNCTION, HABIT, AND INDUCTION',
    dateLabel: 'Treatise published 1739–1740 · first Enquiry published 1748',
    question: 'When one moving ball strikes another, what is actually perceived beyond sequence, contact, and the expectation formed by repetition?',
    frontSubtitle: 'Priority, contiguity, constant conjunction, necessary connection, habit, expectation, induction, probability, and mechanism',
    lead: 'Billiard-ball collision became a compact way to stage Hume’s analysis of cause. A first event is followed by a second; repeated pairings establish constant conjunction; the mind develops an expectation that one event will follow the other. Hume argues that no sensory impression displays a further necessary bond tying cause to effect. The felt determination of thought supplies the source of the idea of necessity without turning prediction into deductive proof.',
    keyIdeas: [
      'Contiguity, temporal priority, and constant conjunction structure causal experience.',
      'Habit produces expectation without converting probability into demonstrative certainty.',
      'Causal reasoning remains indispensable even when necessity is not observed in objects.',
    ],
    cautions: [
      'Chardin’s painting is a social billiards scene, not Hume’s diagram.',
      'Hume does not deny events, regularities, everyday causal reasoning, or investigation of mechanisms.',
    ],
    sections: [
      {heading: 'One collision underdetermines a rule', paragraph: 'Watching one impact cannot reveal every future outcome. Previous experience supplies the pattern against which the event becomes intelligible.'},
      {heading: 'Reason cannot bootstrap uniformity', paragraph: 'A deductive proof that the future will resemble the past would assume the very principle at issue. A probabilistic appeal to past success likewise depends on extending past patterns.'},
      {heading: 'Nature carries inquiry forward', paragraph: 'Human expectation forms before a philosophical proof arrives. Hume’s naturalism explains why belief persists while leaving its ultimate rational foundation more limited than philosophers often desire.'},
    ],
    sources: [
      image('Musée Carnavalet / Wikimedia Commons — Chardin, La Partie de billard', 'https://commons.wikimedia.org/wiki/File:Chardin_-_La_Partie_de_billard,_Vers_1720,_P2081.jpg'),
      academic('Stanford Encyclopedia of Philosophy — David Hume', 'https://plato.stanford.edu/entries/hume/'),
      primary('Project Gutenberg — Enquiry Concerning Human Understanding', 'https://www.gutenberg.org/ebooks/9662'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'hume'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'hume-self-theatre-without-spectator',
    assetId: 'hume-theatre-interior-c1740',
    displayName: 'The Theatre of the Mind—Then Remove the Theatre',
    shortTitle: 'Hume: The Self as Bundle',
    workLabel: 'HUME · PERSONAL IDENTITY, PERCEPTIONS, MEMORY, AND IMAGINATION',
    dateLabel: 'Treatise I.iv.6 and Appendix, 1739–1740',
    question: 'If introspection finds only changing perceptions, what licenses belief in a simple, continuously identical self that owns them?',
    frontSubtitle: 'Impressions, ideas, succession, resemblance, causation, memory, imagination, bundle, identity, and self-criticism',
    lead: 'Hume compares the mind to a theatre in which perceptions appear, pass, return, and combine—then immediately warns that the comparison goes too far. There is no separately perceived stage on which perceptions occur and no inner spectator discovered behind them. Memory and imagination establish relations across change, helping generate the attribution of identity without revealing a simple substance.',
    keyIdeas: [
      'Introspection encounters particular perceptions, not a separately perceived simple owner.',
      'Resemblance and causation help imagination compose continuity across change.',
      'The bundle account pressures substance theories without reducing mental life to meaningless chaos.',
    ],
    cautions: [
      'The engraving is period theatre culture, not Hume’s own image.',
      'Hume did not regard the account as finished; his Appendix acknowledges unresolved difficulty.',
    ],
    sections: [
      {heading: 'The stage is tempting', paragraph: 'Successive scenes make change intelligible while preserving a location. Hume’s warning removes that unobserved support: perceptions are not actors standing on an independently given mental substance.'},
      {heading: 'Memory connects without creating everything', paragraph: 'Remembered sequences disclose relations and strengthen identity attribution, but memory itself changes, omits, and depends on causal organization.'},
      {heading: 'A problem remains in the Appendix', paragraph: 'Hume recognized tension in explaining the principles that unite perceptions. The exhibit preserves that self-criticism rather than marketing “bundle theory” as a finished formula.'},
    ],
    sources: [
      image('Cooper Hewitt / Wikimedia Commons — eighteenth-century theatre interior', 'https://commons.wikimedia.org/wiki/File:Print,_Theater_Interior_with_Performance_Taking_Place,_ca._1740%E2%80%9360_(CH_18348639).jpg'),
      academic('Stanford Encyclopedia of Philosophy — David Hume', 'https://plato.stanford.edu/entries/hume/'),
      primary('Project Gutenberg — A Treatise of Human Nature', 'https://www.gutenberg.org/ebooks/4705'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'hume'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'hume-sentiment-and-social-judgment',
    assetId: 'hume-greuze-village-bride-1761',
    displayName: 'Moral Sentiment: Feeling from a General Point of View',
    shortTitle: 'Hume: Moral Sentiment',
    workLabel: 'HUME · SYMPATHY, GENERAL STANDPOINT, CONVENTION, AND JUSTICE',
    dateLabel: 'Moral theory developed 1739–1751 · displayed painting made 1761',
    question: 'How can approval arise from sentiment without reducing morality to whatever one observer happens to like?',
    frontSubtitle: 'Reason, motivation, sympathy, correction, standpoint, utility, character, convention, justice, hierarchy, and exclusion',
    lead: 'Hume denies that reason alone motivates moral action, but his sentimentalism is not a license for arbitrary preference. Sympathy communicates others’ pleasures and pains; correction for distance, partiality, and circumstance moves judgment toward a shared or “general” standpoint. Greuze’s village scene directs viewers toward tenderness, contract, family hierarchy, money, and expectation, making it useful for inspecting how an artwork solicits moral response rather than proving what that response should be.',
    keyIdeas: [
      'Sentiment supplies motivation and moral approval while reason supplies relevant relations and facts.',
      'Sympathy expands concern but remains partial, unstable, and open to correction.',
      'Conventions and generalized standpoints help stabilize judgment and cooperation.',
    ],
    cautions: [
      'The painting is French moral genre art, not Hume’s illustration or proof.',
      'Emotional intensity can reproduce hierarchy and stereotype; Hume’s racist judgments expose failures of corrected sympathy.',
    ],
    sections: [
      {heading: 'Reason informs; sentiment moves', paragraph: 'Facts about intention, consequence, and circumstance matter, but approval and blame involve affective response rather than demonstration alone.'},
      {heading: 'Standpoint is an achievement', paragraph: 'Immediate proximity and private interest distort reaction. Moral conversation asks observers to correct for those variations and consider traits across a wider social field.'},
      {heading: 'Conventions answer conditions', paragraph: 'Justice is valuable under scarcity and limited generosity because stable rules of possession and promise make cooperation possible. Its artificiality means socially constructed, not fake or dispensable.'},
    ],
    sources: [
      image('Louvre / Wikimedia Commons — Greuze, The Village Bride', 'https://commons.wikimedia.org/wiki/File:Jean-Baptiste_Greuze_-_L%27Accord%C3%A9e_de_Village_-_WGA10655.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Hume’s Moral Philosophy', 'https://plato.stanford.edu/entries/hume-moral/'),
      primary('Project Gutenberg — Enquiry Concerning the Principles of Morals', 'https://www.gutenberg.org/ebooks/4320'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'hume'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'hume-skepticism-backgammon-return',
    assetId: 'empiricism-hume-backgammon',
    displayName: 'Backgammon After Skepticism: Nature Restores the World',
    shortTitle: 'Hume: Backgammon Return',
    workLabel: 'HUME · SKEPTICAL CRISIS, COMMON LIFE, AND MITIGATED INQUIRY',
    dateLabel: 'Treatise I.iv.7, published 1739',
    question: 'What happens when radical reflection loses its grip and ordinary life resumes before theory has supplied a final foundation?',
    frontSubtitle: 'Skeptical crisis, nature, body, dining, conversation, play, belief, curiosity, probability, and mitigated skepticism',
    lead: 'At the end of a skeptical crisis in the Treatise, Hume describes dining, conversation, and a game of backgammon dissolving the intensity of abstract doubt. The episode does not refute skepticism by logic. It shows that human nature, sociability, pleasure, and practical involvement restore ordinary belief. Philosophy can return later in a more modest form, aware that its reasoning depends on habits it cannot completely vindicate from outside.',
    keyIdeas: [
      'Mitigated skepticism limits pretensions rather than ending inquiry.',
      'Practical belief survives philosophical doubt without receiving a new deductive foundation.',
      'Sociability is epistemically relevant, not merely a distraction from serious thought.',
    ],
    cautions: [
      'The c. 1625 painting predates Hume and was not his board, companions, or tavern.',
      'Do not turn play into an anti-intellectual punch line or claim that amusement solves induction.',
    ],
    sections: [
      {heading: 'Crisis has a bodily duration', paragraph: 'Solitary reasoning can make the world appear unstable, but hunger, movement, companionship, and play redirect attention before a proof intervenes.'},
      {heading: 'Return is not surrender', paragraph: 'Hume resumes philosophy because curiosity and ambition are also natural passions. The difference is reduced confidence about what unaided reason can establish.'},
      {heading: 'Mitigation becomes method', paragraph: 'Good inquiry proportions belief to evidence, tests testimony, and distrusts systems that outrun experience while accepting probability as the medium of finite life.'},
    ],
    sources: [
      image('Centraal Museum / Wikimedia Commons — Three Backgammon Players', 'https://commons.wikimedia.org/wiki/File:Three_Backgammon_Players_from_the_circle_of_Hendrick_ter_Brugghen_Centraal_Museum_6144.jpg'),
      academic('Stanford Encyclopedia of Philosophy — David Hume', 'https://plato.stanford.edu/entries/hume/'),
      primary('Project Gutenberg — A Treatise of Human Nature', 'https://www.gutenberg.org/ebooks/4705'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'hume'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'hume-edinburgh-public-world',
    assetId: 'empiricism-hume-edinburgh',
    displayName: 'Edinburgh’s Public World: Clubs, Courts, Commerce, and Exclusion',
    shortTitle: 'Hume’s Public Edinburgh',
    workLabel: 'HUME · HUMAN NATURE IN A CITY OF INSTITUTIONS AND INEQUALITY',
    dateLabel: 'Hume’s Edinburgh, 1711–1776 · displayed reconstruction published 1852',
    question: 'What changes when a proposed “science of human nature” is placed back inside the city, institutions, class relations, and imperial networks that shaped its observer?',
    frontSubtitle: 'City, law, labor, rank, print, clubs, commerce, government service, empire, racism, standpoint, and accountability',
    lead: 'Hume wrote as a Scottish philosopher, historian, essayist, librarian, and public figure moving through Edinburgh, London, Paris, and government service. The Johnston lithograph is a later reconstruction of eighteenth-century High Street life, not documentary eyewitness evidence, yet its courts, guards, workers, water carriers, gentlemen, and street economy make social differentiation visible. Hume analyzed convention and commerce powerfully while also publishing racist claims and participating in imperial worlds that exposed the selectivity of his comparative judgment.',
    keyIdeas: [
      '“Human nature” is studied from historically situated institutions, not from nowhere.',
      'Manners and conventions coordinate societies whose benefits and burdens remain unequal.',
      'Hume’s intellectual achievements and racist claims belong to one accountable biography.',
    ],
    cautions: [
      'The 1852 lithograph retrospectively stages the earlier city and must be labeled as reconstruction.',
      'Do not claim that every depicted person directly affected Hume or soften his racist footnote into a vague “product of his time.”',
    ],
    sections: [
      {heading: 'The city supplies evidence and categories', paragraph: 'Law, labor, rank, religion, sociability, and print shape which regularities become visible and which voices count as testimony.'},
      {heading: 'Commerce can refine and dominate', paragraph: 'Hume links exchange and social development to changing manners, but commercial and imperial expansion cannot be treated as neutral circulation detached from coercion.'},
      {heading: 'Skepticism needs self-application', paragraph: 'A method that interrogates unsupported necessity should also question inherited hierarchies. Hume’s failure to do so consistently is an interpretive fact, not an optional biographical aside.'},
    ],
    sources: [
      image('Wikimedia Commons — W. & A. K. Johnston, Heart of Midlothian reconstruction', 'https://commons.wikimedia.org/wiki/File:The_%27Heart_of_Midlothian%27,_High_Street,_Edinburgh.jpg'),
      academic('Stanford Encyclopedia of Philosophy — David Hume', 'https://plato.stanford.edu/entries/hume/'),
      academic('Stanford Encyclopedia of Philosophy — Race', 'https://plato.stanford.edu/entries/race/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'hume'},
    entityKind: 'philosopher',
  }),
].map(reviewEmpiricismSupplementalExhibit) as readonly MuseumSupplementalExhibit[];

type EmpiricismInstallationKind =
  | 'empiricism-work'
  | 'empiricism-context'
  | 'empiricism-concept';

const supplementalLayout = (
  id: EmpiricismSupplementalExhibitId,
  parentExhibitId: 'empiricism' | 'locke' | 'berkeley' | 'hume',
  guidedAfterExhibitId: 'empiricism' | 'locke' | 'berkeley' | 'hume',
  zoneId:
    | 'empiricism-locke-ideas-rights'
    | 'empiricism-berkeley-perception'
    | 'empiricism-hume-skepticism',
  position: {x: number; z: number},
  rotationY: number,
  assetId: EmpiricismGalleryAssetId,
  mediaWidth: number,
  mediaHeight: number,
  installationKind: EmpiricismInstallationKind,
  accent: string,
) => authorSupplementalLayout({
  id: id as MuseumSupplementalExhibitId,
  parentExhibitId,
  guidedAfterExhibitId,
  zoneId,
  position,
  rotationY,
  assetId: assetId as MuseumAssetId,
  mediaWidth,
  mediaHeight,
  installationKind: installationKind as MuseumSupplementalInstallationKind,
  accent,
  interactionRadius: 5.1,
});

/**
 * Four canonical primaries occupy the outer-west walls in all rooms plus the
 * Locke room's outer-east wall. These fourteen layouts fill every other face.
 */
export const EMPIRICISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  supplementalLayout('empiricism-micrographia-enlarged-sight', 'empiricism', 'empiricism', 'empiricism-locke-ideas-rights', {x: -5.55, z: -26.88}, 0, 'empiricism-hooke-micrographia-flea', 3.16, 3.16 * 383 / 640, 'empiricism-context', EMPIRICISM_PALETTE.blue),
  supplementalLayout('locke-molyneux-crossmodal-vision', 'locke', 'empiricism', 'empiricism-locke-ideas-rights', {x: -5.55, z: -10.45}, Math.PI, 'locke-molyneux-ribera-touch', 2.4, 2.4 * 640 / 480, 'empiricism-concept', EMPIRICISM_PALETTE.indigo),
  supplementalLayout('locke-consciousness-prince-cobbler', 'locke', 'locke', 'empiricism-locke-ideas-rights', {x: 5.55, z: -26.88}, 0, 'locke-cobbler-workshop-1671', 2.7 * 460 / 640, 2.7, 'empiricism-concept', EMPIRICISM_PALETTE.gold),
  supplementalLayout('locke-rights-property-carolina', 'locke', 'locke', 'empiricism-locke-ideas-rights', {x: 5.55, z: -10.45}, Math.PI, 'empiricism-locke-carolina-map', 3.08, 3.08 * 490 / 640, 'empiricism-context', EMPIRICISM_PALETTE.red),
  supplementalLayout('berkeley-vision-learned-distance', 'berkeley', 'berkeley', 'empiricism-berkeley-perception', {x: -5.55, z: -8.22}, 0, 'berkeley-perspective-instrument-1604', 2.96, 2.96 * 480 / 640, 'empiricism-concept', EMPIRICISM_PALETTE.blue),
  supplementalLayout('berkeley-perception-and-object', 'berkeley', 'berkeley', 'empiricism-berkeley-perception', {x: -5.55, z: 8.22}, Math.PI, 'empiricism-berkeley-optical-illusion', 3.08, 3.08 * 493 / 640, 'empiricism-concept', EMPIRICISM_PALETTE.indigo),
  supplementalLayout('berkeley-bermuda-college-project', 'berkeley', 'berkeley', 'empiricism-berkeley-perception', {x: 5.55, z: -8.22}, 0, 'empiricism-berkeley-bermuda-scheme', 3.14, 3.14 * 478 / 640, 'empiricism-context', EMPIRICISM_PALETTE.red),
  supplementalLayout('berkeley-camera-obscura-signs', 'berkeley', 'berkeley', 'empiricism-berkeley-perception', {x: 10.85, z: 0}, -Math.PI / 2, 'empiricism-camera-obscura', 2.56 * 638 / 640, 2.56, 'empiricism-concept', EMPIRICISM_PALETTE.gold),
  supplementalLayout('berkeley-siris-tar-water-chain', 'berkeley', 'berkeley', 'empiricism-berkeley-perception', {x: 5.55, z: 8.22}, Math.PI, 'berkeley-scots-pine-botanical-plate', 2.7 * 396 / 640, 2.7, 'empiricism-work', EMPIRICISM_PALETTE.green),
  supplementalLayout('hume-causation-billiard-table', 'hume', 'hume', 'empiricism-hume-skepticism', {x: -5.55, z: 10.45}, 0, 'empiricism-hume-billiards', 3.2, 3.2 * 423 / 640, 'empiricism-concept', EMPIRICISM_PALETTE.blue),
  supplementalLayout('hume-self-theatre-without-spectator', 'hume', 'hume', 'empiricism-hume-skepticism', {x: -5.55, z: 26.88}, Math.PI, 'hume-theatre-interior-c1740', 3.2, 3.2 * 434 / 640, 'empiricism-concept', EMPIRICISM_PALETTE.indigo),
  supplementalLayout('hume-sentiment-and-social-judgment', 'hume', 'hume', 'empiricism-hume-skepticism', {x: 5.55, z: 10.45}, 0, 'hume-greuze-village-bride-1761', 3.05, 3.05 * 497 / 640, 'empiricism-concept', EMPIRICISM_PALETTE.red),
  supplementalLayout('hume-skepticism-backgammon-return', 'hume', 'hume', 'empiricism-hume-skepticism', {x: 10.85, z: 18.6667}, -Math.PI / 2, 'empiricism-hume-backgammon', 3.14, 3.14 * 477 / 640, 'empiricism-context', EMPIRICISM_PALETTE.gold),
  supplementalLayout('hume-edinburgh-public-world', 'hume', 'hume', 'empiricism-hume-skepticism', {x: 5.55, z: 26.88}, Math.PI, 'empiricism-hume-edinburgh', 3.14, 3.14 * 461 / 640, 'empiricism-context', EMPIRICISM_PALETTE.green),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getEmpiricismSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const recordValue = EMPIRICISM_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!recordValue) throw new Error(`Gallery 17 supplemental exhibit ${id} is missing.`);
  return recordValue;
};
