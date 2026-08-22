import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';

/*
 * Final primary-exhibit reconciliation for the eight branch articles reviewed
 * on 2026-08-10. The shared Museum interpretation chain registers the derived
 * enrichment map below; the canonical plaque contract owns wall invitations.
 */

type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

type PrincipalAssetReconciliation = {
  readonly id: MuseumAssetId;
  readonly title: string;
  readonly caption: string;
  readonly provenance: string;
  readonly rights: string;
  readonly alt: string;
  readonly preview: string;
  readonly visualInspection: string;
};

export type BranchExhibitEditorialRecord = {
  readonly canonicalTitle: string;
  readonly hallId: string;
  readonly gallery: string;
  readonly roomId: string;
  readonly roomTitle: string;
  readonly plaqueInvitation: string;
  readonly principalAsset: PrincipalAssetReconciliation;
  readonly articleReview: {
    readonly status: 'claim-reviewed';
    readonly reviewedOn: string;
    readonly articleLock: `fnv1a64:${string}`;
    readonly boundary: string;
  };
  readonly interpretation: MuseumPrimaryInterpretationEnrichment;
};

const EXHIBIT_REVIEW_LOCKS_BY_NAME: Readonly<Record<string, `fnv1a64:${string}`>> = {
  Stoicism: 'fnv1a64:11a7b036a02b6e88',
  Platonism: 'fnv1a64:ae11105db913cbf8',
  Aristotelianism: 'fnv1a64:e1f77dc0897f94e9',
  Neoplatonism: 'fnv1a64:67eeadfc7e3faa36',
  Metaphysics: 'fnv1a64:3be2e884fae16037',
  Epistemology: 'fnv1a64:5cdb15c44546c125',
  Ethics: 'fnv1a64:13e705a7850ec695',
  'Virtue Ethics': 'fnv1a64:698db723f7a5d2e1',
};

const objectLed = (
  name: string,
  paragraphs: readonly string[],
  orientation: readonly VisitorGuideSection[],
  assetId: MuseumAssetId,
  objectText: string,
  sources: NonNullable<MuseumPrimaryInterpretationEnrichment['sources']>,
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
  sources,
  review: {
    status: 'standard-compliant',
    reviewedOn: '2026-08-10',
    method: 'Reconciled separately against the current claim-reviewed article, its registered sources, and the registered principal-object provenance; object-led presentation, visitor guide, full-article action, evidence limits, and responsive presentation received final editorial and visual review against the locked exhibit standard.',
    lock: EXHIBIT_REVIEW_LOCKS_BY_NAME[name],
  },
});

/**
 * These records preserve the registered principal assets. Their `interpretation`
 * values feed the canonical enrichment chain, and `plaqueInvitation` mirrors
 * the production plaque contract without changing the canonical title.
 */
export const ARTICLE_CLAIM_REVIEW_BATCH_BRANCH_EXHIBIT_EDITORIAL:
Readonly<Record<string, BranchExhibitEditorialRecord>> = {
  stoicism: {
    canonicalTitle: 'Stoicism',
    hallId: 'hellenistic-roman-ways',
    gallery: 'Hellenistic & Roman Ways of Life',
    roomId: 'hell-stoic-stoa',
    roomTitle: 'Early system and Roman Stoa',
    plaqueInvitation: 'Enter Stoicism through a modern reconstruction of an Athenian stoa. Ask how logic, nature, assent, emotion, virtue, fate, and social duty form one system rather than a slogan about suppressing feeling or controlling outcomes.',
    principalAsset: {
      id: 'stoicism-stoa-attalos',
      title: 'Reconstructed Stoa of Attalos in the Athenian Agora',
      caption: 'The reconstructed Stoa of Attalos evokes the public colonnaded setting named by Stoicism.',
      provenance: 'Julian Lupyan, modern photograph of the 1950s reconstruction of a 2nd-century BCE stoa; Ancient Agora of Athens; Commons source record retained.',
      rights: 'CC0 1.0 dedication; attribution retained as “Julian Lupyan, Stoa of Attalos, CC0 1.0.” Original image is retained uncropped and converted to WebP.',
      alt: 'A long colonnaded stoa opens toward the Athenian Agora beneath a blue sky.',
      preview: 'Preserve the registered full panel composition without crop or distortion; scale it within the bounded preview and retain the wide colonnade as a context image.',
      visualInspection: 'Check desktop and narrow previews for full-column visibility and for a readable object block beside the opening prose.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:cc9492e922ea2a3b',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and must receive its final exhibit lock during integration.',
    },
    interpretation: objectLed(
      'Stoicism',
      [
        'Stoicism began with Zeno’s teaching at Athens around 300 BCE and developed through an early school whose books survive mostly in fragments. It was not simply advice to stay calm. Stoics linked logic, an account of nature, and ethics: how one assents to an impression, understands one’s place in a causally ordered cosmos, and acts with justice are connected questions. To live according to nature meant neither obeying every impulse nor treating the world as morally convenient. It meant bringing judgment and action into line with reason, virtue, and human sociability. The school’s system changed through Cleanthes, Chrysippus, and later Roman writers, so no single maxim can stand in for its arguments.',
        'The familiar distinction between what depends on us and what does not is a discipline of judgment, purpose, and response, not a promise that hardship is unreal or that other people’s harm is irrelevant. Stoic accounts of emotion likewise do not command blankness. They analyze passions as bound up with evaluative judgments while allowing for appropriate concern and the work of correcting one’s outlook. Fate and responsibility remain a central tension: Stoics defended causal order while arguing that deliberation and character are themselves active parts of that order. Their cosmopolitan language and accounts of justice make private resilience an incomplete reading of a philosophy that also asks what we owe fellow human beings.',
        'The reconstructed Stoa of Attalos provides architectural context for a school named after a stoa, but Zeno taught at the Painted Stoa, not here. The photograph therefore cannot restore a classroom, prove an original doctrine, or show how Roman Stoicism developed. It is most useful as a reminder that philosophy was practiced in public settings while texts, debates, education, slavery, empire, and unequal status shaped who could participate. Modern comparisons with therapeutic practice or Buddhist disciplines can illuminate selected exercises, but they do not establish shared metaphysics, views of self, or aims of liberation.',
      ],
      [
        {heading: 'A linked system', items: [
          {label: 'Assent', description: 'The judgment by which a person accepts, rejects, or withholds endorsement from an impression; Stoic training examines this moment rather than denying that impressions occur.'},
          {label: 'Living according to nature', description: 'Aligning judgment and action with reason, virtue, and human sociability, not following every desire or treating whatever happens as automatically good.'},
        ]},
        {heading: 'Freedom and responsibility', items: [
          {label: 'What depends on us', description: 'For Epictetus, our judgments, aims, and choices are ours in a way external outcomes are not; the distinction does not cancel care, preparation, or social duty.'},
          {label: 'Fate', description: 'A causally ordered world in which Stoics still locate deliberation and character as contributing causes, leaving a difficult debate about responsibility.'},
        ]},
        {heading: 'Texts and afterlives', items: [
          {label: 'Chrysippus', description: 'An early system-builder whose lost writings are reconstructed only through selective ancient witnesses.'},
          {label: 'Epictetus and Seneca', description: 'Roman Stoic writers who turn shared doctrines toward practical exercises, roles, progress, emotion, friendship, and public life rather than one identical handbook.'},
        ]},
      ],
      'stoicism-stoa-attalos',
      'The displayed Stoa of Attalos is a 1950s reconstruction of a different Athenian colonnade from the Painted Stoa where Zeno taught. Julian Lupyan’s CC0 photograph provides public architectural context, not Zeno’s classroom, a Stoic portrait, or visual proof of any doctrine.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Stoicism', url: 'https://plato.stanford.edu/entries/stoicism/', kind: 'academic-reference'},
        {label: 'Internet Encyclopedia of Philosophy — Stoicism', url: 'https://iep.utm.edu/stoicism/', kind: 'academic-reference'},
        {label: 'Epictetus — Discourses and Enchiridion', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0236', kind: 'primary-text'},
        {label: 'Stoa of Attalos, Athens — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Stoa_of_Attalos,_Athens,_Greece.jpg', kind: 'collection-record'},
      ],
    ),
  },
  platonism: {
    canonicalTitle: 'Platonism',
    hallId: 'mediterranean-beginnings-classical',
    gallery: 'Mediterranean Beginnings & Classical Athens',
    roomId: 'med-plato-aristotle',
    roomTitle: 'Plato, Aristotle, Academy, and Lyceum',
    plaqueInvitation: 'Study a Roman mosaic conventionally called Plato’s Academy. Ask how dialogues, schools, Forms, participation, education, and later receptions created changing Platonisms—while this scene, made centuries later, cannot document Plato’s classroom or settled doctrine.',
    principalAsset: {
      id: 'platonism-academy-mosaic',
      title: 'Mosaic conventionally called Plato’s Academy',
      caption: 'A Roman mosaic from Pompeii conventionally interpreted as Plato’s Academy, now in Naples.',
      provenance: 'Unknown Roman mosaicist; 1st century BCE–1st century CE; National Archaeological Museum of Naples, inv. 124545; modern photograph by Jebulon.',
      rights: 'Jebulon’s photograph is CC0 1.0; the registered CC0 attribution and Commons source record must remain visible with the object record.',
      alt: 'Roman mosaic showing seven seated figures gathered outdoors beneath columns and a tree around a central sphere.',
      preview: 'Preserve the registered square panel composition in full, scaling rather than cropping and keeping the central sphere and surrounding figures legible.',
      visualInspection: 'Check the dense figure group at desktop and narrow widths; its conventional identification must remain available with the provenance record.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:836c5c4e855b9cd9',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and must receive its final exhibit lock during integration.',
    },
    interpretation: objectLed(
      'Platonism',
      [
        'Platonism names a changing family of readings, arguments, institutions, and later appropriations rather than a single doctrine Plato deposited in the Academy. Plato’s dialogues stage questions through dramatic speakers, often without offering a final manual. Their concerns include knowledge, justice, desire, mathematics, politics, and the relation between changing appearances and intelligible standards. Forms and participation are important terms in some dialogues and later interpretations, but their exact status is disputed: they have been read as separate realities, intelligible structures, hypotheses, or problems to be tested. Dialectic therefore matters as a practice of examining assumptions, not only as a ladder toward a completed metaphysical picture.',
        'The Academy itself changed. Early successors developed Plato’s problems in different directions; Arcesilaus and Carneades made skeptical dialectic central; Middle Platonists and late-antique Platonists constructed more systematic accounts. Plotinus, Porphyry, Iamblichus, and Proclus did not simply repeat the dialogues, and their disagreements over the One, intellect, soul, ritual, and return are part of Platonism’s history. Christian, Jewish, and Islamic philosophers also transformed Platonist materials through questions about creation, revelation, law, prophecy, and divine freedom. Those connected receptions identify translation and argument, not a one-way inheritance or a claim that distinct traditions are versions of the same philosophy.',
        'This Roman mosaic from Pompeii is conventionally interpreted as Plato’s Academy, yet it was made centuries after Plato and cannot document the Academy, identify every figure with certainty, or settle a theory of Forms. It is a reception image: a later material attempt to imagine philosophy as a shared scene of study. Its central sphere and gathered figures invite questions about mathematics, teaching, and intellectual authority without answering them. Modern lower-case platonism about abstract objects is likewise related to ancient materials but narrower than historical Platonism. The object encourages a careful double movement: see why Plato’s texts and Academy became durable reference points, then resist making one later image, one doctrine, or one cultural route their final meaning.',
      ],
      [
        {heading: 'Questions in the dialogues', items: [
          {label: 'Forms', description: 'Intelligible standards invoked to explain knowledge and evaluation of changing things; their status and scope remain disputed across Plato’s texts and later readings.'},
          {label: 'Participation', description: 'A name for the difficult relation between particular things and intelligible structures, not a settled mechanism that every Platonist explains alike.'},
          {label: 'Dialectic', description: 'Disciplined questioning that tests assumptions and seeks better principles; it makes Platonism a practice of inquiry as well as a set of claims.'},
        ]},
        {heading: 'A changing inheritance', items: [
          {label: 'The skeptical Academy', description: 'The Academy’s Arcesilaus and Carneades used argumentative testing and suspension rather than simply preserving a fixed positive doctrine.'},
          {label: 'Late-antique Platonists', description: 'Thinkers such as Plotinus, Iamblichus, and Proclus developed distinct systematic readings that cannot be collapsed into Plato’s own voice.'},
        ]},
        {heading: 'Read with care', items: [
          {label: 'Republic', description: 'A dialogue whose discussions of justice, education, and the Good are central to later Platonism but must be read through its dramatic and political form.'},
          {label: 'Modern platonism', description: 'A lower-case contemporary position about abstract objects; it is historically related to Plato but not a complete definition of ancient or late-antique Platonism.'},
        ]},
      ],
      'platonism-academy-mosaic',
      'This Roman mosaic from Pompeii is conventionally called Plato’s Academy and survives in Naples. Made centuries after Plato, it is a later reception image whose figure identifications are not secure; it cannot document the Academy or prove a Platonic doctrine.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Plato', url: 'https://plato.stanford.edu/entries/plato/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Plato’s Middle Period Metaphysics and Epistemology', url: 'https://plato.stanford.edu/entries/plato-metaphysics/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Neoplatonism', url: 'https://plato.stanford.edu/entries/neoplatonism/', kind: 'academic-reference'},
        {label: 'Plato — Selected Dialogues', url: 'https://www.perseus.tufts.edu/hopper/collection?collection=Perseus:collection:Greco-Roman', kind: 'primary-text'},
        {label: 'Mosaic conventionally called Plato’s Academy — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:MANNapoli_124545_plato%27s_academy_mosaic.jpg', kind: 'collection-record'},
      ],
    ),
  },
  aristotelianism: {
    canonicalTitle: 'Aristotelianism',
    hallId: 'mediterranean-beginnings-classical',
    gallery: 'Mediterranean Beginnings & Classical Athens',
    roomId: 'med-plato-aristotle',
    roomTitle: 'Plato, Aristotle, Academy, and Lyceum',
    plaqueInvitation: 'Enter Aristotelianism through a Persianate manuscript image of Aristotle teaching. Ask how logic, causes, nature, virtue, commentary, translation, and criticism formed many receptions—while this repainted miniature cannot record his classroom or appearance.',
    principalAsset: {
      id: 'aristotelianism-walters-teaching',
      title: 'Aristotle Teaching his Students',
      caption: 'Aristotle Teaching his Students, a Persian manuscript image in the Walters Art Museum.',
      provenance: 'Yadkar al-Katib (scribe), painter unknown; manuscript copied 1528–1529, miniature repainted in the 18th–early 19th century; Walters Art Museum, W.607, fol. 268b.',
      rights: 'CC0 1.0 dedication; retain the Walters Art Museum CC0 attribution and the registered Commons source record.',
      alt: 'Persian manuscript page showing an imagined Aristotle seated with students beneath a pavilion, surrounded by text.',
      preview: 'Preserve the full portrait manuscript page without crop or distortion; center it in the bounded preview so text margins, pavilion, and student group remain visible.',
      visualInspection: 'Requires special desktop and narrow inspection because the portrait manuscript page can become visually cramped or lose its Persianate context if cropped.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:0d5f84daf02b7dc2',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and must receive its final exhibit lock during integration.',
    },
    interpretation: objectLed(
      'Aristotelianism',
      [
        'Aristotelianism begins with Aristotle’s fourth-century BCE Lyceum but is better understood as a succession of Aristotelianisms than as one unchanged school. The surviving corpus is partial, textually layered, and organized through later editorial and pedagogical histories. Its treatises develop different methods for different subjects: logic examines valid forms of argument; natural inquiry studies change and living things; metaphysics investigates being, substance, causes, actuality, and potentiality; ethics and politics ask how habits, institutions, friendship, and deliberation bear on flourishing. Aristotle’s explanatory vocabulary is therefore not one universal machine. It repeatedly asks what sort of thing is being studied and what kind of account would fit it.',
        'Form and matter, the four causes, categories, potentiality, and actuality have traveled widely, but their meanings are debated and their use changes by context. Teleology in Aristotle does not license reading every natural process as a conscious plan, nor does it turn ancient biology into modern science. His ethics gives practical wisdom, emotion, friendship, and political conditions real importance while carrying exclusions from a hierarchical society that cannot be treated as incidental. Later readers selectively translated, criticized, taught, and transformed these materials. Arabic philosophers and logicians made Aristotelian resources answer their own questions; Jewish and Latin Christian thinkers developed further arguments about creation, intellect, law, language, and theology. This is transmission through active interpretation, not passive custody.',
        'The Persian manuscript image makes that reception visible. It imagines Aristotle teaching, but it was copied in 1528–1529 and its miniature was repainted centuries later; it is neither an ancient classroom record nor a likeness. The image should not make Persianate intellectual work look like a decorative afterlife of Greece. Instead, it points to a multilingual history in which manuscripts, translators, commentators, schools, and patrons helped make Aristotle authoritative and contestable. Visitors can use it to ask why the same corpus became a resource in distinct intellectual worlds—and why no single later doctrine owns its legacy.',
      ],
      [
        {heading: 'How Aristotle inquires', items: [
          {label: 'Four causes', description: 'Different explanatory roles—what something is made from, its structure, its source of change, and what it is for—rather than four events that must always occur in sequence.'},
          {label: 'Form and matter', description: 'A way of analyzing many concrete things as organized material; it is not a simple contrast between spiritual shapes and inert stuff.'},
          {label: 'Potentiality and actuality', description: 'Terms for capacities and their fulfillment that help explain change without making every possible outcome already actual.'},
        ]},
        {heading: 'Practical inquiry', items: [
          {label: 'Practical wisdom', description: 'Context-sensitive judgment about how to act well in variable human affairs, not a formula that removes the need for experience and deliberation.'},
          {label: 'Teleology', description: 'Explanation through ends or functions in Aristotle’s natural and practical inquiry; it should not be confused with modern scientific prediction or a universal proof of design.'},
        ]},
        {heading: 'Many Aristotelianisms', items: [
          {label: 'Arabic logical traditions', description: 'Translations and arguments in Arabic that adapted Aristotelian materials within their own technical vocabularies, institutions, and philosophical disputes.'},
          {label: 'The surviving corpus', description: 'Treatises with layered editorial and teaching histories, so no one book or later commentary provides an unfiltered voice of Aristotle.'},
        ]},
      ],
      'aristotelianism-walters-teaching',
      'This Persianate manuscript page imagines Aristotle teaching. Copied in 1528–1529 and later repainted, it witnesses a long reception history at the Walters Art Museum, not Aristotle’s appearance, classroom, or an unchanged doctrine moving unchanged across cultures.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Aristotle', url: 'https://plato.stanford.edu/entries/aristotle/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Aristotle’s Metaphysics', url: 'https://plato.stanford.edu/entries/aristotle-metaphysics/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Aristotle’s Ethics', url: 'https://plato.stanford.edu/entries/aristotle-ethics/', kind: 'academic-reference'},
        {label: 'Aristotle — Selected Treatises', url: 'https://www.perseus.tufts.edu/hopper/collection?collection=Perseus:collection:Greco-Roman', kind: 'primary-text'},
        {label: 'Walters Art Museum W.607, fol. 268b — registered collection record', url: 'https://art.thewalters.org/detail/24045/aristotle-teaching-his-students/', kind: 'collection-record'},
      ],
    ),
  },
  neoplatonism: {
    canonicalTitle: 'Neoplatonism',
    hallId: 'late-antiquity-inheritance',
    gallery: 'Late Antiquity & Neoplatonic Inheritance',
    roomId: 'late-neoplatonic-systems',
    roomTitle: 'Plotinus and later pagan Platonisms',
    plaqueInvitation: 'See a late-antique relief of a public reader, not a proven Plotinus. Ask how unity, intellect, soul, procession, return, commentary, and ritual vary across traditions now grouped under the imperfect name Neoplatonism.',
    principalAsset: {
      id: 'late-neoplatonic-reader-sarcophagus',
      title: 'Roman sarcophagus relief of a public reader',
      caption: 'A Roman sarcophagus relief stages philosophy as reading and teaching in public.',
      provenance: 'Unknown Roman sculptor and photographer; Roman imperial period; Museo Gregoriano Profano, Vatican Museums; registered Commons source record.',
      rights: 'Public Domain Mark 1.0 rights-status; retain the registered Vatican Museums attribution, source, and uncropped WebP derivative notice.',
      alt: 'A Roman sarcophagus relief shows a seated reader holding an open scroll before a gathered group.',
      preview: 'Preserve the full landscape relief without crop or distortion; scale it to fit so the reader, scroll, and gathered figures remain together.',
      visualInspection: 'Check wide desktop and narrow preview framing: the low landscape panel must not become a clipped portrait image or invite a false identification with Plotinus.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:0840c0a05f78d0b5',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and must receive its final exhibit lock during integration.',
    },
    interpretation: objectLed(
      'Neoplatonism',
      [
        '“Neoplatonism” is a modern label for influential late-antique Platonist projects whose practitioners generally understood themselves as interpreters of Plato. Beginning with Plotinus in the third century CE, these thinkers asked how the many things we encounter can depend on an ultimate unity without making that unity one ordinary object among others. Plotinus distinguishes the One or Good, Intellect, and Soul. Intellect contains intelligible forms; Soul orders and animates the sensible cosmos. Procession names ordered dependence, not a temporal creation event in which a maker first exists alone and then produces a separate world. Return names intellectual and ethical reorientation toward higher principles, not escape by travelling away from embodied life.',
        'The tradition was not uniform. Porphyry edited Plotinus’s writings into the Enneads, a durable arrangement that is not simply Plotinus’s own final architecture. Iamblichus gave theurgy and embodied ritual a different weight; Proclus developed highly articulated accounts of participation, remaining, procession, and return; late-antique commentators also pursued disputed harmonies between Plato and Aristotle. Arguments against Gnostic rivals, varying views of the soul, and changing curricular practices make a single “Neoplatonic system” misleading. Later Arabic materials sometimes circulated Plotinian and Proclean arguments under Aristotelian titles, while Christian, Jewish, Islamic, Byzantine, and Renaissance thinkers transformed what they received. These are histories of translation and new argument, not proof of a homogeneous perennial doctrine.',
        'The Roman sarcophagus relief shows a public reader with a scroll and listeners. It has been identified as Plotinus with disciples, but that attribution is speculative; the work can neither authenticate a philosopher nor establish school membership. Its safer value is material context for learned reading, teaching, memory, and public status in the Roman world. Keeping that uncertainty visible prevents a conventional association becoming evidence. The relief connects social practice to metaphysical arguments preserved through edited texts, commentaries, translations, and contested receptions.',
      ],
      [
        {heading: 'A vocabulary of dependence', items: [
          {label: 'The One or Good', description: 'The highest principle in Plotinus, beyond ordinary being and thought; it is not one very large object or a straightforward personal creator.'},
          {label: 'Intellect and Soul', description: 'Interdependent levels in which intelligible forms and the ordering of embodied life are explained; their relation is philosophical argument, not a spatial map.'},
          {label: 'Procession and return', description: 'Ordered dependence on higher principles and a movement of ethical-intellectual reorientation, not creation in time or physical flight from the world.'},
        ]},
        {heading: 'Differences within the label', items: [
          {label: 'Porphyry’s Enneads', description: 'The six-by-nine editorial arrangement that preserves Plotinus’s writings while shaping how later readers encounter the corpus.'},
          {label: 'Theurgy', description: 'Ritual practice given a significant role by some later Platonists, especially Iamblichus; it cannot be treated as a decorative or universally accepted add-on.'},
          {label: 'Proclus', description: 'A late-antique thinker whose systematic account of participation and remaining-procession-return differs in scale and method from Plotinus.'},
        ]},
        {heading: 'Transmission with caution', items: [
          {label: 'Theology of Aristotle', description: 'A work containing adapted Plotinian material that circulated under an Aristotelian title, showing how attribution and translation can redirect philosophical reception.'},
        ]},
      ],
      'late-neoplatonic-reader-sarcophagus',
      'This Roman imperial sarcophagus relief shows a public reader with a scroll. A proposed identification with Plotinus and disciples is explicitly speculative; the Vatican Museums object gives material context for learned reading and teaching, not a likeness or proof of Neoplatonic affiliation.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Neoplatonism', url: 'https://plato.stanford.edu/entries/neoplatonism/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Plotinus', url: 'https://plato.stanford.edu/entries/plotinus/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Iamblichus', url: 'https://plato.stanford.edu/entries/iamblichus/', kind: 'academic-reference'},
        {label: 'Plotinus — The Six Enneads', url: 'https://classics.mit.edu/Plotinus/enneads.html', kind: 'primary-text'},
        {label: 'Roman sarcophagus relief of a public reader — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Roman_sarcophagus_of_a_reader_identified_to_Plotinus_and_disciples.jpg', kind: 'collection-record'},
      ],
    ),
  },
  metaphysics: {
    canonicalTitle: 'Metaphysics',
    hallId: 'core-questions-forum',
    gallery: 'Core Questions Forum',
    roomId: 'core-reality-being',
    roomTitle: 'Reality & Being',
    plaqueInvitation: 'Use a new collage to compare substance, process, identity, chance, cause, time, and dependence. Ask what reality permits without treating this image—or the field’s modern name—as one shared fixed ladder of being.',
    principalAsset: {
      id: 'metaphysics-reality-layers-interpretive',
      title: 'Layers of reality and explanation',
      caption: 'An interpretive stack moves from ordinary objects through structures, processes, possibilities, and cosmic scale.',
      provenance: 'Repository-pinned Philosophy Atlas Museum interpretive derivative; generation details unavailable; held by Philosophy Atlas Museum with the registered repository source path.',
      rights: 'Original Philosophy Atlas Museum interpretive illustration; retain the existing rights-status attribution and uncropped WebP derivative notice.',
      alt: 'Archival-modernist collage layering an ordinary bowl and stone beneath networks, material strata, clouds, planets, and a luminous cosmos.',
      preview: 'Preserve the registered full portrait composition without crop or distortion; the bounded preview must show its ordinary-object and cosmic ends together.',
      visualInspection: 'Requires special desktop and narrow inspection because a conceptual collage can be misread as a universal hierarchy if cropped or visually overemphasized.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:227ed58347fa91ed',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and must receive its final exhibit lock during integration.',
    },
    interpretation: objectLed(
      'Metaphysics',
      [
        'Metaphysics asks broad and recurrent questions about reality: what exists, what kinds of things there are, what makes something the thing it is, how causes and dependencies work, and whether possibilities, time, parts, or relations belong to the world’s basic structure. The word has a particular Greek and later disciplinary history, but the questions it gathers do not have one origin or one universally shared vocabulary. Aristotle’s familiar title is itself editorially inherited. Later scholastic, early modern, and contemporary projects have repeatedly redefined the field’s scope. Metaphysics is therefore not a claim that every tradition has been asking one unchanged question called “being.” It is a site for careful comparison among differently organized inquiries.',
        'Some metaphysicians investigate substance, universals, identity, causation, modality, time, or the relation between parts and wholes. Others ask whether scientific explanation eliminates, revises, or depends on everyday objects and categories. Grounding is a contemporary term for a relation of metaphysical dependence or explanation, but philosophers disagree about whether it names one coherent relation and how it connects to causation. These disputes are not merely verbal. A decision about what is fundamental can change how one understands persons, laws, social kinds, material objects, possibility, and explanation. Yet no single inventory settles the questions: realism, nominalism, process views, idealisms, and anti-realist approaches make rival proposals and often disagree about appropriate method.',
        'The displayed illustration layers a bowl and stone with networks, material strata, weather, planets, and a luminous cosmos. It is an original interpretive prompt, not evidence that metaphysics has one staircase of reality, that large-scale entities are more real than ordinary ones, or that every inquiry should seek a lowest layer. The collage asks which explanatory scale is relevant and what has been left out. Related questions in Chinese, South Asian, Arabic and Islamic, and other histories require comparison without assuming equivalent categories. The image should open that work rather than close it.',
      ],
      [
        {heading: 'Core questions', items: [
          {label: 'Ontology', description: 'Inquiry into what exists or what it is to be; it overlaps with metaphysics but does not exhaust questions about explanation, change, identity, or possibility.'},
          {label: 'Universals', description: 'A problem about how different things can share a feature such as redness or humanity, and whether common features are real entities, names, or something else.'},
          {label: 'Modality', description: 'Questions about possibility, necessity, and what could have been otherwise, rather than a prediction about what will happen.'},
        ]},
        {heading: 'Explanation under dispute', items: [
          {label: 'Grounding', description: 'A proposed relation of metaphysical dependence or explanation—often framed as what is more fundamental—whose unity and usefulness remain contested.'},
          {label: 'Causation', description: 'Relations of production, dependence, or explanation that metaphysicians analyze in different ways; it is not automatically identical with grounding.'},
        ]},
        {heading: 'Comparison without reduction', items: [
          {label: 'Field label', description: '“Metaphysics” is historically specific; it can connect questions across traditions only when differences in concepts, genres, languages, and aims remain visible.'},
        ]},
      ],
      'metaphysics-reality-layers-interpretive',
      'This Philosophy Atlas Museum illustration of unknown generation date layers ordinary objects, structures, processes, and cosmic scale as a conceptual prompt. It does not establish one hierarchy of reality, choose a fundamental level, or show that every tradition practices metaphysics through the same categories.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Metaphysics', url: 'https://plato.stanford.edu/entries/metaphysics/', kind: 'academic-reference'},
        {label: 'Metaphysics: A Contemporary Introduction — Loux and Crisp', url: 'https://www.routledge.com/Metaphysics-A-Contemporary-Introduction-4th-Edition/Loux-Crisp/p/book/9781138639331', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Metaphysical Grounding', url: 'https://plato.stanford.edu/entries/grounding/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Metaphysics in Chinese Philosophy', url: 'https://plato.stanford.edu/entries/chinese-metaphysics/', kind: 'academic-reference'},
        {label: 'Aristotle — Metaphysics', url: 'http://classics.mit.edu/Aristotle/metaphysics.html', kind: 'primary-text'},
      ],
    ),
  },
  epistemology: {
    canonicalTitle: 'Epistemology',
    hallId: 'core-questions-forum',
    gallery: 'Core Questions Forum',
    roomId: 'core-knowledge',
    roomTitle: 'Knowledge',
    plaqueInvitation: 'Use a new optical illustration to ask how perception, inference, testimony, evidence, institutions, and power shape knowledge. The image proposes no single method, and epistemology is wider than certainty or one justified-true-belief formula.',
    principalAsset: {
      id: 'epistemology-evidence-lens-interpretive',
      title: 'Evidence through perception, testimony, and inference',
      caption: 'Several routes of evidence pass through a fallible interpretive instrument rather than arriving as unfiltered certainty.',
      provenance: 'Repository-pinned Philosophy Atlas Museum interpretive derivative; generation details unavailable; held by Philosophy Atlas Museum with the registered repository source path.',
      rights: 'Original Philosophy Atlas Museum interpretive illustration; retain the existing rights-status attribution and uncropped WebP derivative notice.',
      alt: 'A faceted optical apparatus receives streams from sight, hearing, observation, and drawing, then refracts them toward a provisional illuminated form.',
      preview: 'Preserve the full portrait illustration without crop or distortion so the incoming routes and provisional refracted form remain legible together.',
      visualInspection: 'Requires special desktop and narrow inspection: the source streams and central instrument must remain readable without suggesting that a lens supplies a neutral theory of knowledge.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:911bda38b070ba18',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and must receive its final exhibit lock during integration.',
    },
    interpretation: objectLed(
      'Epistemology',
      [
        'Epistemology studies knowledge, understanding, rational belief, reliable cognition, error, inquiry, testimony, and the conditions under which people can responsibly rely on one another. Its modern disciplinary name should not turn older and non-European inquiries into unfinished versions of a single contemporary puzzle. Greek discussions of knowledge and demonstration, South Asian debates about pramāṇas or reliable means of knowing, Chinese discussions of learning and discernment, and medieval Jewish, Christian, and Islamic arguments about testimony, prophecy, perception, and intellect have their own concepts and histories. Comparison is useful when it specifies an issue; it becomes distorting when it assumes that every vocabulary asks whether belief meets one standard formula.',
        'The familiar analysis of knowledge as justified true belief is a major modern reference point, but it is neither an uncontested ancient definition nor an adequate account of the whole field. Gettier cases show how a belief can be true and apparently well-supported through luck, prompting proposals involving reliability, safety, sensitivity, virtue, or knowledge-first approaches. Skepticism tests the scope and sources of claims rather than simply requiring disbelief in everything. Testimony, memory, perception, inference, instruments, archives, and group practices raise different questions about evidence and responsibility. Inquiry is social: expertise, disagreement, misinformation, trust, exclusion, and institutional design affect what evidence is available and whose contributions are treated as credible.',
        'The displayed lens is an original conceptual image. Its incoming streams and refracted form suggest that observation, hearing, drawing, inference, and testimony are mediated and revisable, but it does not prove a theory of perception, make every source equally reliable, or imply that consensus ends inquiry. A single optical device cannot capture embodied practices, learned techniques, institutions, and power. The image works if it directs visitors toward a harder question: what has to happen between a claim and responsible trust? It should not lead them to imagine knowledge arriving through one private instrument or reduce distinct traditions to one finished problem.',
      ],
      [
        {heading: 'What is being assessed?', items: [
          {label: 'Justification', description: 'Reasons, evidence, or methods that support belief; philosophers disagree about its form and whether it alone matters for knowledge.'},
          {label: 'Epistemic luck', description: 'A case in which a belief happens to be true despite apparently good support, made vivid by Gettier’s challenge to justified true belief.'},
          {label: 'Skepticism', description: 'Arguments that test whether particular kinds of knowledge are possible or justified, not a simple instruction to reject every belief.'},
        ]},
        {heading: 'Sources and practices', items: [
          {label: 'Testimony', description: 'Learning from other people’s reports; it raises questions about trust, speaker responsibility, evidence, and dependence on social networks.'},
          {label: 'Pramāṇas', description: 'Technical South Asian categories for reliable means of knowing; they should be studied in their own debates rather than translated without remainder into one Western taxonomy.'},
          {label: 'Social epistemology', description: 'Inquiry into how groups, institutions, expertise, disagreement, misinformation, and power shape what can responsibly be known.'},
        ]},
        {heading: 'Primary test case', items: [
          {label: 'Theaetetus', description: 'Plato’s dialogue tests candidate accounts of knowledge; it investigates rather than straightforwardly endorsing the later justified-true-belief formula.'},
        ]},
      ],
      'epistemology-evidence-lens-interpretive',
      'This Philosophy Atlas Museum illustration of unknown generation date stages perception, testimony, observation, and inference through a fallible instrument. It is an interpretive prompt, not a proof that knowledge is sensory data, a settled model of justification, or a neutral view from outside institutions and power.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Epistemology', url: 'https://plato.stanford.edu/entries/epistemology/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — The Analysis of Knowledge', url: 'https://plato.stanford.edu/entries/knowledge-analysis/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Epistemological Problems of Testimony', url: 'https://plato.stanford.edu/entries/testimony-episprob/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Epistemology in Classical Indian Philosophy', url: 'https://plato.stanford.edu/entries/epistemology-india/', kind: 'academic-reference'},
        {label: 'Plato — Theaetetus', url: 'https://classics.mit.edu/Plato/theatu.html', kind: 'primary-text'},
      ],
    ),
  },
  ethics: {
    canonicalTitle: 'Ethics',
    hallId: 'moral-life-practical-reason',
    gallery: 'Moral Life & Practical Reason',
    roomId: 'moral-ethics-orientation',
    roomTitle: 'Ethics: reasons, relationships, practices, and ways of living',
    plaqueInvitation: 'Enter ethics through Caravaggio’s Catholic Seven Works of Mercy. Ask how character, duty, consequence, relationship, care, liberation, and institutions guide action without treating one religious scene or modern three-theory map as universal.',
    principalAsset: {
      id: 'moral-ethics-seven-works-mercy',
      title: 'The Seven Works of Mercy',
      caption: 'Caravaggio compresses multiple acts of mercy into one difficult field of bodies, need, danger, and response.',
      provenance: 'Caravaggio, 1606–1607; Pio Monte della Misericordia, Naples; registered Commons source record.',
      rights: 'Public Domain Mark 1.0 rights-status; retain the existing Caravaggio/Pio Monte attribution, source, and uncropped WebP derivative notice.',
      alt: 'A crowded nocturnal street scene interweaves feeding, shelter, burial, visitation, and care beneath angels in flight.',
      preview: 'Preserve the full portrait canvas without crop or distortion; scale it to fit so the crowded acts of mercy remain connected rather than privileging one episode.',
      visualInspection: 'Check desktop and narrow previews for legibility of the dense dark scene and ensure the Catholic framing is not visually presented as a universal moral taxonomy.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:801b31f29b16825f',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and must receive its final exhibit lock during integration.',
    },
    interpretation: objectLed(
      'Ethics',
      [
        'Ethics is a plural field of inquiry into reasons for action, values, character, relationships, suffering, obligation, consequences, moral psychology, and the institutions through which people live together. It does not begin from one founder or a neutral sequence in which Greek theory supplies the standard and other traditions arrive later as examples. Greek and Hellenistic, Chinese, South Asian, Buddhist, Jain, Jewish, Christian, Islamic, African, feminist, and other ethical traditions organize questions differently around flourishing, ritual, liberation, nonviolence, care, law, community, responsibility, and power. Their concepts are neither interchangeable English labels nor evidence that disagreement is impossible. Comparison must preserve those differences.',
        'Some approaches foreground consequences, others duties and rights, character and practical wisdom, care and dependency, relations of power, or practices of collective repair. They are not private calculators. They include rival pictures of agency, value, emotion, personhood, social roles, and institutions. Metaethical arguments raise further questions: are moral claims true or false, do reasons depend on attitudes or practices, how are they known, and why should they move us? Applied questions about medicine, work, violence, climate, technology, family, law, and political membership test these theories under unequal power and conflict. Plurality does not make criticism optional; it requires clearer accounts of evidence, harms, responsibility, and who bears the costs of a decision.',
        'Caravaggio’s Seven Works of Mercy gathers feeding, shelter, burial, visitation, and care into a Catholic altarpiece made for a Neapolitan confraternity. It makes concrete need and response visible, but it is not a neutral diagram of every ethical tradition, a universal list of duties, or proof that moral life is charity from the powerful to the vulnerable. The crowded scene can prompt questions about dependency and institutions. Its religious vocabulary remains particular. Visitors should let it open inquiry into how ethical practice is pictured, organized, and criticized—then return to the larger field without allowing one Christian work of art to stand for its many histories.',
      ],
      [
        {heading: 'Different starting points', items: [
          {label: 'Consequences', description: 'Approaches that assess actions partly by their effects on welfare, harm, or value; they still must explain whose effects count and how consequences are known.'},
          {label: 'Duty and rights', description: 'Approaches that ask what obligations, respect, or constraints persons owe one another, rather than treating good outcomes as the only moral consideration.'},
          {label: 'Character and care', description: 'Approaches that attend to cultivated dispositions, moral perception, dependency, relationships, and practices of response, not only isolated choices.'},
        ]},
        {heading: 'Questions behind a verdict', items: [
          {label: 'Metaethics', description: 'Inquiry into the meaning, truth, authority, motivation, and knowledge of moral claims; it asks what a moral reason is, not merely which action wins.'},
          {label: 'Institutions', description: 'Laws, workplaces, families, states, and other arrangements that shape options, dependence, authority, and the distribution of harm and responsibility.'},
        ]},
        {heading: 'Keep traditions distinct', items: [
          {label: 'Ethical pluralism', description: 'Recognition that moral inquiry has many histories and rival vocabularies; it does not mean every practice is beyond criticism or every concept means the same thing.'},
        ]},
      ],
      'moral-ethics-seven-works-mercy',
      'Caravaggio’s 1606–1607 Catholic altarpiece gathers acts of mercy in a Neapolitan confraternal setting. It gives concrete practices of care and need a vivid form, but it is not a neutral map of ethics, a universal duty list, or visual proof of one moral theory.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Moral Theory', url: 'https://plato.stanford.edu/entries/moral-theory/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Metaethics', url: 'https://plato.stanford.edu/entries/metaethics/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Feminist Ethics', url: 'https://plato.stanford.edu/entries/feminism-ethics/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Chinese Ethics', url: 'https://plato.stanford.edu/entries/ethics-chinese/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Ethics in Indian Buddhism', url: 'https://plato.stanford.edu/entries/ethics-indian-buddhism/', kind: 'academic-reference'},
        {label: 'The Seven Works of Mercy — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Caravaggio_-_The_Seven_Works_of_Mercy_-_Google_Art_Project.jpg', kind: 'collection-record'},
      ],
    ),
  },
  'virtue-ethics': {
    canonicalTitle: 'Virtue Ethics',
    hallId: 'moral-life-practical-reason',
    gallery: 'Moral Life & Practical Reason',
    roomId: 'moral-character-virtue',
    roomTitle: 'Character, flourishing, attention, and virtue revival',
    plaqueInvitation: 'Study Rembrandt’s imagined Aristotle beside Homer. Ask how character, practical wisdom, emotion, relationship, practice, and flourishing guide action—while one later European painting cannot define every cultivation tradition or excuse hierarchy and exclusion.',
    principalAsset: {
      id: 'moral-virtue-aristotle-homer',
      title: 'Aristotle with a Bust of Homer',
      caption: 'Rembrandt imagines Aristotle weighing poetic inheritance, worldly recognition, and the quality of a life.',
      provenance: 'Rembrandt van Rijn, 1653; The Metropolitan Museum of Art, 61.198; registered Commons source record.',
      rights: 'CC0 1.0 dedication; retain the registered Metropolitan Museum attribution, source, and uncropped WebP derivative notice.',
      alt: 'An imagined Aristotle in dark robes rests one hand on a sculpted head of Homer while touching a gold chain at his chest.',
      preview: 'Preserve the full near-square painting composition without crop or distortion; scale it to fit so Aristotle, Homer’s bust, and the gold chain remain visible.',
      visualInspection: 'Check desktop and narrow previews for facial recognition and the complete painted scene; do not let an attractive later image silently become historical evidence.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:6d609fb6327f80da',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and must receive its final exhibit lock during integration.',
    },
    interpretation: objectLed(
      'Virtue Ethics',
      [
        'Virtue ethics is a modern comparative label for a diverse family of approaches that gives character, emotion, practical judgment, relationships, practice, and forms of flourishing explanatory importance in moral life. It is neither a slogan nor Aristotle’s ethics made universal. Aristotle is a major Greek anchor: he connects flourishing across a whole life with habituation, friendship, political conditions, and practical wisdom. But Stoic, Confucian, Buddhist, religious, feminist, care-oriented, and contemporary projects can share selected concerns while differing about persons, social roles, goods, freedom, suffering, and the conditions of moral formation. Comparison must keep those disagreements in view.',
        'A virtue is more than reliable outward behavior. It concerns how someone perceives a situation, feels and desires, deliberates, and acts for intelligible reasons. Aristotle’s doctrine of the mean is not advice to compromise between any two options; it concerns fitting response to particular circumstances as practical wisdom judges them, and some actions are not made right by moderation. Confucian cultivation connects learning, ritual, humane relationship, and exemplary conduct through concepts such as ren and li, which should not be silently converted into Greek terms. Modern revivalists also disagree: Anscombe criticized a dominant moral-obligation vocabulary; Foot developed arguments about reasons and natural goodness; Murdoch made attention and unselfing central; feminist critics test how dependency, labor, power, and exclusion shape ideals of character.',
        'Rembrandt’s Aristotle with a Bust of Homer is a seventeenth-century imagined scene, not a portrait or a record of Aristotle’s school. It invites questions about inheritance and honor. It cannot settle virtue ethics. It should return visitors to the limits of classical texts: Aristotle wrote within hierarchy, and cultivation can conceal coercion when inherited roles become natural. Virtue ethics remains alive where admiration, practice, and social formation can be revised.',
      ],
      [
        {heading: 'Formation and judgment', items: [
          {label: 'Flourishing', description: 'Living and acting well across a life, not merely feeling pleased or receiving whatever one wants; rival theories explain its content differently.'},
          {label: 'Practical wisdom', description: 'Context-sensitive judgment about what matters and how goods relate in a situation, rather than a mechanical decision procedure or bare intuition.'},
          {label: 'Habituation', description: 'Formation through repeated practice, education, relationships, and institutions; it can cultivate excellence or reproduce harmful norms.'},
        ]},
        {heading: 'Related but nonidentical traditions', items: [
          {label: 'Ren and li', description: 'Confucian terms often translated as humaneness and ritual propriety; they belong to distinctive arguments about relationship, learning, and social responsiveness, not a simple copy of Aristotelian virtue.'},
          {label: 'Moral attention', description: 'Murdoch’s language for learning to see another person and a situation justly rather than through fantasy, prejudice, or self-absorption.'},
        ]},
        {heading: 'Modern arguments and criticism', items: [
          {label: 'Modern Moral Philosophy', description: 'Anscombe’s 1958 diagnostic critique of modern moral vocabulary, influential for revival but not itself a complete virtue-ethical theory.'},
          {label: 'Guidance objection', description: 'The challenge that virtue ethics may describe admirable people without telling a beginner what to do; responses disagree about rules, exemplars, and practical wisdom.'},
          {label: 'Social power', description: 'A critical question about whether admired traits, roles, and ideals have been shaped by hierarchy, exclusion, coerced care, or injustice.'},
        ]},
      ],
      'moral-virtue-aristotle-homer',
      'Rembrandt’s 1653 Aristotle with a Bust of Homer is an imagined philosophical scene, painted nearly two millennia after Aristotle. The Metropolitan Museum work can prompt reflection on inheritance, honor, and judgment; it cannot establish Aristotle’s appearance, school, or a complete account of virtue.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Virtue Ethics', url: 'https://plato.stanford.edu/entries/ethics-virtue/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Aristotle’s Ethics', url: 'https://plato.stanford.edu/entries/aristotle-ethics/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Chinese Ethics', url: 'https://plato.stanford.edu/entries/ethics-chinese/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Feminist Ethics', url: 'https://plato.stanford.edu/entries/feminism-ethics/', kind: 'academic-reference'},
        {label: 'Aristotle — Nicomachean Ethics', url: 'http://classics.mit.edu/Aristotle/nicomachaen.html', kind: 'primary-text'},
        {label: 'Aristotle with a Bust of Homer — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Aristotle_with_a_Bust_of_Homer_MET_DP319026.jpg', kind: 'collection-record'},
      ],
    ),
  },
};

/** Exact canonical titles and reviewed 32–35-word invitations for the plaque-contract integration. */
export const ARTICLE_CLAIM_REVIEW_BATCH_BRANCH_PLAQUE_INVITATIONS = Object.fromEntries(
  Object.entries(ARTICLE_CLAIM_REVIEW_BATCH_BRANCH_EXHIBIT_EDITORIAL).map(([id, record]) => [id, record.plaqueInvitation]),
) as Readonly<Record<string, string>>;

export const ARTICLE_CLAIM_REVIEW_BATCH_BRANCH_PRIMARY_INTERPRETATIONS = Object.fromEntries(
  Object.entries(ARTICLE_CLAIM_REVIEW_BATCH_BRANCH_EXHIBIT_EDITORIAL).map(([id, record]) => [id, record.interpretation]),
) as Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>>;
