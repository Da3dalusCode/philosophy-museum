import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';
import type {MuseumExhibitReview} from '../../editorial/exhibitReview';

type OrientationSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

const standardReview = (lock: string): MuseumExhibitReview => ({
  status: 'standard-compliant',
  reviewedOn: '2026-08-09',
  method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.',
  lock,
});

const STANDARD_REVIEW_BY_NAME: Readonly<Record<string, MuseumExhibitReview>> = {
  Thales: standardReview('fnv1a64:a7d227dbcc01fbb0'),
  Anaximander: standardReview('fnv1a64:0d4c3891c26d5b02'),
  Anaximenes: standardReview('fnv1a64:d78abdaf8014e796'),
  Pythagoras: standardReview('fnv1a64:dd22810670d2d668'),
  Philolaus: standardReview('fnv1a64:a89d81871adf4a49'),
  Parmenides: standardReview('fnv1a64:786e5aaae9456869'),
  'Zeno of Elea': standardReview('fnv1a64:89fe7e6fe7992b03'),
  Leucippus: standardReview('fnv1a64:06f236b1cfa0d820'),
};

const standard = (
  name: string,
  paragraphs: readonly string[],
  orientation: readonly OrientationSection[],
  assetId: MuseumAssetId,
  objectText: string,
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
  review: STANDARD_REVIEW_BY_NAME[name],
});

/**
 * Object-led primary interpretations for the early Mediterranean galleries.
 * Review state and deterministic locks are applied by the integrating batch.
 */
export const MEDITERRANEAN_EARLY_PRIMARY_INTERPRETATIONS:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  thales: standard(
    'Thales',
    [
      'Thales of Miletus is conventionally placed in the early sixth century BCE, but the familiar founding-philosopher picture needs care. No writing by him survives. Aristotle, other ancient writers, and much later biographical traditions report water, an earth supported by water, soul, magnets, astronomy, geometry, travel, and civic advice. These reports differ in date, purpose, and authority. The famous eclipse prediction and stories of Egyptian learning may preserve memory, literary pattern, or retrospective credit; they cannot turn an elusive figure into a documented modern scientist. “First philosopher” is likewise a later honor whose meaning depends on what counts as philosophy and which evidence is allowed.',
      'The most consequential report makes water an originating principle. It asks whether the world’s diversity can be understood through a common source rather than a genealogy of gods alone. That is a daring explanatory move, but not a surviving theory of matter. Aristotle frames the proposal in his history of causes, and later testimony adds details. Reports that the world is full of gods, or that magnets have soul, are scattered attributions, not a single recoverable doctrine. The point is not to discard them but to ask what each witness licenses about an argument whose own wording is lost.',
      'Rouillé’s circular 1553 woodcut makes the problem visible. Its labeled bearded profile gives Renaissance readers a memorable sage but no evidence for Thales’s face, clothing, or Miletus. The print records a later practice of giving antiquity a visual cast; read it beside uneven testimony, not as an eyewitness portrait. Thales matters because later Greeks used his name to mark a shift toward asking what the world is made of and how it holds together. The exhibit keeps that importance while leaving a sharper question: when does a common principle explain diversity, and when does it merely rename the mystery?',
    ],
    [
      {heading: 'Evidence and setting', items: [
        {label: 'Miletus', description: 'An Ionian city on the west coast of Anatolia, conventionally associated with Thales and early Greek inquiry.'},
        {label: 'Later testimony', description: 'Ancient and later writers preserve reports about Thales, but no surviving text lets us hear a continuous argument in his own words.'},
      ]},
      {heading: 'Central pressure', items: [
        {label: 'Water as principle', description: 'An attributed attempt to explain many visible things through one originating source, not a recovered modern theory of matter.'},
        {label: '“First philosopher”', description: 'A retrospective honorific whose meaning changes with the criteria used to define philosophy and its beginnings.'},
      ]},
      {heading: 'Reading the object', items: [
        {label: 'Renaissance reception', description: 'The 1553 print shows how a later publisher imagined and memorialized a famous ancient thinker, not what Thales looked like.'},
      ]},
    ],
    'thales-promptuarii-portrait',
    'Guillaume Rouillé’s 1553 circular woodcut labels an imagined bearded Thales. Produced roughly two millennia after his conventional lifetime, it records Renaissance reception rather than his appearance, clothing, or the setting of sixth-century Miletus. Its confident profile makes later commemoration visible while the mediated ancient testimony remains the evidence for his attributed views.',
  ),
  anaximander: standard(
    'Anaximander',
    [
      'Anaximander worked in sixth-century BCE Miletus and is conventionally placed after Thales, though the neat teacher-and-pupil sequence is later testimony, not a classroom record. Ancient reports connect him with prose, geography, astronomy, weather, earth, and life. Only a short passage preserved by Simplicius may preserve some wording, and it reaches us through Theophrastus and later commentary. Evidence thus comes in layers: a narrow fragment, ancient summaries, doxographical organization, and modern reconstruction. Keeping them distinct is necessary if we are to see how a few difficult words yield a large later image of a Milesian cosmologist.',
      'Central is apeiron, often “the indefinite” or “the boundless.” Aristotle and later writers connect it with the source from which opposites and worlds emerge. Anaximander may therefore have declined to make a familiar element, such as water, source of its contrary, but no surviving account settles whether the term primarily concerns extent, indeterminacy, or something else. The fragment’s language of things giving reparation according to time suggests an ordered cycle of coming-to-be and passing-away. It is neither ready-made cosmic justice nor a finished physical mechanism. Its force is to make conflict, balance, and change philosophical problems rather than items in a story.',
      'Bibi Saint-Pol’s displayed 2006 circular diagram proposes a world map ancient reports associate with Anaximander. Its labeled continents, rivers, and encircling ocean are modern choices, not portions of an original: no map survives. It helps visitors imagine why mapping and cosmology belonged together, but cannot establish what he drew or knew. Reports of a freely suspended earth, celestial rings, and life from moisture need their own caution. Anaximander matters because he sought conditions for opposition and order. The diagram prompts the question every reconstruction raises: what does it clarify, and what absence does it fill?',
    ],
    [
      {heading: 'Evidence', items: [
        {label: 'A mediated fragment', description: 'A short passage preserved by Simplicius may retain Anaximander’s wording, but it arrives through Theophrastus and later commentary.'},
        {label: 'Reconstruction', description: 'Later reports and modern scholarship organize scattered evidence; that work is useful but is not identical with the lost prose.'},
      ]},
      {heading: 'Key idea', items: [
        {label: 'Apeiron', description: 'The attributed indefinite or boundless source from which opposites and worlds emerge; its exact sense remains disputed.'},
        {label: 'Coming-to-be and passing-away', description: 'The fragment links cosmic order to temporal change without supplying a complete scientific mechanism.'},
      ]},
      {heading: 'Reading the map', items: [
        {label: 'A modern proposal', description: 'The labeled circle is a 2006 reconstruction of a lost map, not a copy of Anaximander’s drawing.'},
      ]},
    ],
    'anaximander-world-map',
    'Bibi Saint-Pol’s 2006 diagram proposes one circular reconstruction of the lost world map ancient reports associate with Anaximander. Its labeled continents, rivers, seas, and encircling ocean make a hypothesis legible, not an ancient object recoverable. It supports orientation and comparison while leaving the original map, its scale, and its exact arrangement unknown.',
  ),
  anaximenes: standard(
    'Anaximenes',
    [
      'Anaximenes is conventionally a later sixth-century BCE thinker from Miletus, but his dates and place in a tidy Milesian succession are reconstructed from later sources. Ancient authors say he wrote prose; no continuous work survives. Possible verbal echoes and much doxographical reporting connect him with air, breath, weather, earth, and heavenly bodies. This material preserves an outline of inquiry, not a transcript or secure list of claims. The engraved head is therefore misleading if treated as a personal record: the historical print is labeled for Anaximenes, yet is a later convention with no authenticated ancient likeness behind it.',
      'The central reported proposal makes air the underlying source and explains difference through rarefaction and condensation. In the usual later sequence, rarefied air becomes fire; denser air becomes wind, cloud, water, earth, and stone. This is philosophically significant because it offers a process through which one underlying stuff could account for diverse appearances. It is not a quantitative law, experiment, or precursor of atmospheric science. Reports about breath and soul, temperature, clouds, and rain may show how the doctrine was remembered, yet their wording and arrangement belong to later transmitters. A source principle gains explanatory force only when it can show how change occurs.',
      'The BnF print shows a laureled bearded profile above a Latin identification. Its unknown date and conventional features cannot establish Anaximenes’s appearance, status, or argumentative method. Nor can its portrait form settle how air related to life, weather, or cosmos. Details about a flat earth and heavenly bodies arrive in different later layers and should not become one modern system. Anaximenes matters because the reports make transformation explanatory: continuity is insufficient unless a process connects it to variety. The exhibit asks visitors to distinguish that powerful move from the thinner evidence for the historical author.',
    ],
    [
      {heading: 'Evidence and setting', items: [
        {label: 'Miletus', description: 'An Ionian city conventionally linked to Anaximenes and to several early accounts of nature.'},
        {label: 'Doxography', description: 'Later summaries of earlier views; they are indispensable evidence but do not preserve a continuous work by Anaximenes.'},
      ]},
      {heading: 'Key idea', items: [
        {label: 'Air', description: 'The reported underlying source of things, not a recoverable modern chemical or atmospheric theory.'},
        {label: 'Rarefaction and condensation', description: 'Changes in thinness and density that later reports use to explain a sequence from fire through wind and cloud to earth and stone.'},
      ]},
      {heading: 'Reading the object', items: [
        {label: 'Conventional portrait', description: 'The BnF print identifies a later visual memory of Anaximenes; it supplies no evidence for his actual face or life.'},
      ]},
    ],
    'anaximenes-bnf-portrait',
    'This historical BnF print presents a laureled, bearded profile above a Latin identification of Anaximenes. Its date is unknown and no authenticated likeness survives. The image documents a later convention for representing an ancient philosopher, not his appearance, dress, or intellectual setting in sixth-century Miletus.',
  ),
  pythagoras: standard(
    'Pythagoras',
    [
      'Pythagoras is associated with Samos and with a community at Croton in southern Italy in the late sixth century BCE. He wrote nothing that survives, and stories about him are late, varied, and often shaped by communities claiming his authority. Early evidence supports association with an unusual way of life, followers, and beliefs about the soul’s movement through more than one life; it does not yield an autobiography. Travels, miracles, political activity, dietary rules, and secret teachings are pieces of developing Pythagorean memory, not one factual portrait. The historical teacher and the powerful tradition bearing his name cannot simply be merged.',
      'Number, musical ratio, harmony, and cosmic order became central to Pythagorean traditions, but later prominence does not assign every result to Pythagoras. No surviving writing shows that he proved the theorem named for him, taught that physical things literally are numbers, or devised the cosmology later associated with Philolaus. The musical stories are also layered. A safer reading notices changing practices in which mathematics, ritual discipline, political association, cosmology, and care of the soul could be joined differently. That restraint is philosophically productive: it asks whether number describes an already ordered world, trains a way of life, or makes relations intelligible.',
      'Raphael’s painted figure bends over a book as a nearby tablet displays numerical and musical ratios. This Renaissance School of Athens detail is not a likeness, ancient classroom scene, or proof that the historical Pythagoras taught the scheme. It records how a later culture made him an emblem of mathematical harmony. That reception matters, but the tablet must not overwrite sparse earlier evidence. Pythagoras matters because his name became a meeting point for inquiry, discipline, community, and an ordered cosmos. The image asks how a compelling symbol of number preserves and simplifies a tradition whose doctrines and historical founder remain difficult to separate.',
    ],
    [
      {heading: 'Evidence and history', items: [
        {label: 'A layered tradition', description: 'No surviving writing by Pythagoras allows later stories, school teachings, and the historical teacher to be simply identified.'},
        {label: 'Croton', description: 'The southern Italian city conventionally associated with his community and its contested political history.'},
      ]},
      {heading: 'Ideas to keep distinct', items: [
        {label: 'Transmigration', description: 'The early association that a soul passes through more than one life, reported through ancient evidence of differing dates and purposes.'},
        {label: 'Number and harmony', description: 'Powerful later Pythagorean themes that should not automatically be credited in their mature form to the historical founder.'},
      ]},
      {heading: 'Reading the painting', items: [
        {label: 'Raphael’s ratio tablet', description: 'A Renaissance visualization of Pythagorean mathematical reception, not evidence for an ancient theorem lesson or personal likeness.'},
      ]},
    ],
    'pythagoras-ratios-raphael',
    'Raphael’s 1509–1511 School of Athens detail shows an imagined Pythagoras studying a book beside a tablet of musical and numerical ratios. It visualizes Renaissance reception of Pythagorean harmony, not an ancient classroom, an authenticated likeness, or evidence that the historical teacher taught this particular scheme.',
  ),
  philolaus: standard(
    'Philolaus',
    [
      'Philolaus was a fifth-century BCE Pythagorean associated by later evidence with Croton, Thebes, and other settings, though his chronology and biography remain uncertain. Unlike Pythagoras, he is represented by substantial early material: several fragments attributed to a book under his name are widely accepted, while others are disputed. This does not make the dossier a complete system. Plato’s Phaedo names Philolaus in connection with a prohibition on suicide, but that dramatic reference does not make him responsible for every doctrine later voiced in the dialogue. His fragments are important and demanding, not a transparent voice for all Pythagoreanism.',
      'The best-attested materials describe a cosmos composed from unlimited and limiting things joined through harmony. Number makes relations within that plurality knowable: it can articulate proportion, differentiation, and order. This is not the slogan that physical things simply are abstract numbers. Musical intervals vividly show measured relations becoming intelligible, but the fragments do not offer one numerical recipe for every domain. Philolaus’s framework asks how indeterminate factors can become a determinate ordered whole. The relation between the terms, the status of the fragments, and the reach of the account remain live interpretive questions.',
      'The 1492 woodcut labels imagined “Pythagoras” and “Philolaus” comparing musical pipes. Published in Gaffurio’s Theorica musicae, it stages a Renaissance story about Pythagorean musical proportion, not an ancient experiment or likeness. It can illuminate music as an example of ratio, while warning against turning later visual pedagogy into biography. Reports of a central fire, counter-earth, and bodily centers have different authority from quoted fragments, and the central-fire account is not heliocentrism. Philolaus matters because he gives a distinctive Pythagorean form of explanation a recoverable but partial philosophical voice. Follow its relations without mistaking harmony for a finished universal answer.',
    ],
    [
      {heading: 'Evidence', items: [
        {label: 'Fragments', description: 'Short passages attributed to Philolaus; some are widely accepted while the authenticity and meaning of others remain contested.'},
        {label: 'Not simply Pythagoras', description: 'Philolaus has a distinct, partial dossier and should not be reduced to a spokesman for an earlier founder.'},
      ]},
      {heading: 'Key structure', items: [
        {label: 'Limiters and unlimiteds', description: 'The two kinds of factors that the best-attested fragments say must be joined for an ordered cosmos.'},
        {label: 'Harmony and number', description: 'Relations that make plurality proportioned and knowable, not a claim that every physical object is an abstract number.'},
      ]},
      {heading: 'Reading the object', items: [
        {label: 'Musical pipes', description: 'The 1492 woodcut is a Renaissance visualization of a later Pythagorean musical story, not evidence of an ancient demonstration.'},
      ]},
    ],
    'philolaus-musical-pipes',
    'Published in Franchino Gaffurio’s 1492 Theorica musicae, this woodcut labels imagined Pythagoras and Philolaus as they compare musical pipes. It visualizes Renaissance reception of Pythagorean ratio, not an ancient experiment, a likeness, or direct evidence for the historical details of Philolaus’s philosophical work.',
  ),
  parmenides: standard(
    'Parmenides',
    [
      'Parmenides was an early fifth-century BCE philosopher-poet from Elea whose poem is preserved only in fragments. About 160 lines survive, many because the late antique commentator Simplicius quoted them while discussing Aristotle. The conventional title On Nature is not securely authorial, the poem’s original sequence is reconstructed, and the familiar date around 515 BCE leans heavily on Plato’s fictional encounter between an elderly Parmenides and young Socrates. These limits tell us why interpretation must attend to genre and transmission: a divine journey, rigorous argument, and cosmology arrive together, not as chapters of a modern metaphysics textbook.',
      'In the poem, a goddess distinguishes routes of inquiry and argues that sheer not-being cannot be known or indicated as though it were something. The route concerned with what-is develops signs such as being ungenerated, imperishable, whole, and stable. This pressures ordinary explanations of coming-to-be, destruction, plurality, and change. It is not “nothing changes,” nor does it say that whatever anyone imagines must exist. Greek leaves the subject of “is” unstated in important places, so translation and interpretation cannot be separated. Readers disagree whether the argument concerns one being, stable predicational natures, necessary being, or another account of intelligibility.',
      'The seated reader in Raphael’s School of Athens is traditionally, but not securely, called Parmenides. Its book and absorbed pose offer a Renaissance emblem of philosophical reading, yet the disputed identification and much later date prevent it from documenting his appearance or poem. It is reception, not a witness to Elea. The poem’s cosmology of mortal opinion presents a further problem: scholars debate whether it is deception, a conditionally adequate account, or genuine cosmological knowledge. Later pluralists, atomists, Plato, and Aristotle addressed the pressure it created. Parmenides matters because he asks what thought and speech commit us to before we explain the changing world; the exhibit leaves that question open rather than settling it with one modern label.',
    ],
    [
      {heading: 'Text and transmission', items: [
        {label: 'Fragmentary poem', description: 'A hexameter work preserved largely through later quotation; its original title and order are not securely recoverable.'},
        {label: 'The goddess’s journey', description: 'The poem’s divine setting frames an argument about inquiry and cannot simply be discarded as decorative mythology.'},
      ]},
      {heading: 'Central pressure', items: [
        {label: 'What-is and not-being', description: 'The argument denies that sheer not-being can be treated as an object of thought or speech, challenging ordinary accounts of change.'},
        {label: 'Competing readings', description: 'Monist, predicational, modal, and other interpretations disagree about what the “is” claim requires.'},
      ]},
      {heading: 'Reading the object', items: [
        {label: 'A traditional identification', description: 'Raphael’s painted reader is conventionally called Parmenides, but the identification is disputed and is not an ancient likeness.'},
      ]},
    ],
    'parmenides-raphael-traditional',
    'This 1509–1511 figure from Raphael’s School of Athens is traditionally, but not securely, identified as Parmenides. The imagined seated reader records Renaissance reception and a disputed naming convention. It cannot establish the philosopher’s appearance, life in Elea, or the original form and argument of his fragmentary poem.',
  ),
  'zeno-elea': standard(
    'Zeno of Elea',
    [
      'Zeno of Elea is known above all through arguments challenging plurality and motion, not a surviving book. Plato presents him in the dramatic Parmenides; Aristotle formulates several paradoxes in Physics 6; Simplicius preserves later reports and objections. These witnesses are indispensable but not interchangeable. Plato’s scene is not neutral biography, Aristotle’s formulations may select targets for his own purposes, and reconstructions supply steps no text gives whole. Zeno is conventionally linked to Parmenides and early fifth-century Elea, yet the relation and chronology remain less secure than a textbook image suggests. His achievement is dialectical pressure, not a recoverable theory of space.',
      'The familiar motion arguments ask how a runner can traverse infinitely many intervals, how an arrow can move if it occupies an equal space at each instant, and how unequal runners can pass in contradictory times. The plurality arguments press different problems about finite and infinite size or number. They do not simply say motion is impossible. They expose tensions among divisibility, magnitude, place, time, and completed traversal. Modern mathematics models convergent series, and physics formulates instantaneous velocity, but neither achievement by itself recovers every ancient target or settles every metaphysical issue. The arguments force precise questions about what ordinary descriptions silently assume.',
      'Bernard Picart’s 1699 print presents an imagined downcast bearded head as “Zeno of Elea,” possibly after Rembrandt. More than two millennia late, it offers visual commemoration but no evidence for Zeno’s face, lost book, or original demonstrations. The print’s authority should not replace the mediated textual dossier. Nor should the paradoxes become a contest in which one clever modern solution defeats an ancient fool. Zeno matters because later philosophers, mathematicians, and scientists returned to problems about continuity and division. The exhibit asks visitors to slow down: when a path looks continuous, what must be true of its parts, and what would count as crossing them?',
    ],
    [
      {heading: 'Sources and setting', items: [
        {label: 'A lost book', description: 'Zeno’s own work does not survive; Plato, Aristotle, Simplicius, and later reconstruction preserve different evidence layers.'},
        {label: 'Eleatic connection', description: 'Zeno is linked by ancient tradition to Parmenides and Elea, but that link does not supply a complete shared doctrine.'},
      ]},
      {heading: 'The paradoxes', items: [
        {label: 'Motion', description: 'Arguments about traversing intervals, the arrow, and racing bodies test assumptions about time, division, and completed movement.'},
        {label: 'Plurality', description: 'Separate arguments press whether many things must be both finite and infinite, or possess impossible magnitudes.'},
      ]},
      {heading: 'Continuing question', items: [
        {label: 'Modern mathematics', description: 'Convergent series answer some formal problems but do not automatically identify or exhaust Zeno’s physical and metaphysical targets.'},
      ]},
    ],
    'zeno-elea-rijksmuseum-print',
    'Bernard Picart’s 1699 Rijksmuseum engraving, possibly after Rembrandt, imagines a bearded Zeno of Elea in a contemplative profile. Made more than two millennia after Zeno’s conventional lifetime, it is a reception portrait. It cannot establish his appearance, the contents of his lost book, or the original wording of the paradoxes.',
  ),
  leucippus: standard(
    'Leucippus',
    [
      'Leucippus is the earliest named atomist in the main ancient tradition, yet almost every biographical question about him is uncertain. Ancient sources disagree about his origin, dates, teachers, and works, while one later report was read as denying that he existed. Aristotle and Theophrastus nevertheless treat him as Democritus’s predecessor, the strongest reason to retain him in atomism’s history. No book survives. A lone attributed saying and titles such as Great World System cannot form a secure personal corpus. The exhibit presents a consequential name whose evidence requires special restraint, not an author from whom a full system can be recovered.',
      'Aristotle describes early atomism as responding to Eleatic problems about generation, plurality, and motion. Full indivisible bodies move in void; compounds arise and perish as those bodies combine and separate, while the basic constituents neither arise from nothing nor vanish into nothing. Shape, arrangement, and position help explain perceptible difference, and void makes separation and movement possible. This is a bold account of change without fundamental generation. Yet it belongs to a shared early atomist dossier: sources rarely divide the labor securely between Leucippus and Democritus. Ancient atoms are not modern chemical atoms, and the explanation did not rest on modern experimental methods. Attribution is central, not a footnote.',
      'Luca Giordano’s 1652–1653 painted philosopher holds a paper and is titled Leucippus. It makes a seventeenth-century visual tradition tangible, but cannot verify his appearance, whether every report belongs to him, or settle the old dispute about his existence. Its composed sage risks promising the personal certainty the evidence cannot give. Reports also connect early atomists with necessity and worlds formed through vortical motion, yet the lone saying cannot carry a complete determinist doctrine. Leucippus matters as the earliest named point in an argument that change needs bodies and empty space. The exhibit preserves that breakthrough without turning later summaries or Democritus’s broader record into a fictional biography.',
    ],
    [
      {heading: 'Evidence and attribution', items: [
        {label: 'An uncertain author', description: 'Ancient reports disagree about Leucippus’s life and even his existence, while Aristotle and Theophrastus treat him as Democritus’s predecessor.'},
        {label: 'Shared dossier', description: 'Most evidence presents early atomism jointly, so claims cannot routinely be assigned to Leucippus rather than Democritus.'},
      ]},
      {heading: 'Atomist framework', items: [
        {label: 'Atoms and void', description: 'Indivisible bodies move through empty space, allowing compounds to form and dissolve without basic constituents beginning or ending.'},
        {label: 'Arrangement', description: 'Differences of shape, position, and ordering are used to explain why compounds appear different.'},
      ]},
      {heading: 'Reading the painting', items: [
        {label: 'Giordano’s philosopher', description: 'The seventeenth-century painted figure records later reception, not evidence for Leucippus’s appearance, writings, or historical certainty.'},
      ]},
    ],
    'leucippus-giordano',
    'Luca Giordano’s 1652–1653 painting titled Leucippus shows an imagined elderly philosopher holding a paper. It belongs to a seventeenth-century philosopher series, not antiquity. The dignified figure records later reception while supplying no evidence for Leucippus’s face, writings, or disputed historical existence.',
  ),
};
