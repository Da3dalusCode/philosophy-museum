import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {MuseumSupplementalExhibitId} from './museumWorldTypes';

type WallFillInput = {
  id: string;
  assetId: string;
  displayName: string;
  shortTitle: string;
  workLabel: string;
  dateLabel: string;
  question: string;
  frontSubtitle: string;
  lead: string;
  keyIdeas: readonly [string, string, string];
  cautions: readonly [string, string];
  sections: readonly [
    {heading: string; paragraph: string},
    {heading: string; paragraph: string},
    {heading: string; paragraph: string},
  ];
  imageSource: {label: string; url: string};
  reference: {label: string; url: string};
  articleRoute: MuseumSupplementalExhibit['articleRoute'];
  entityKind: 'philosopher' | 'branch';
};

const wallFill = (input: WallFillInput): MuseumSupplementalExhibit => ({
  id: input.id as MuseumSupplementalExhibitId,
  displayName: input.displayName,
  shortTitle: input.shortTitle,
  workLabel: input.workLabel,
  dateLabel: input.dateLabel,
  question: input.question,
  frontSubtitle: input.frontSubtitle,
  lead: input.lead,
  keyIdeas: input.keyIdeas,
  cautions: input.cautions,
  sections: input.sections.map(({heading, paragraph}) => ({heading, paragraphs: [paragraph]})),
  sources: [
    {label: input.imageSource.label, url: input.imageSource.url, kind: 'collection-record'},
    {label: input.reference.label, url: input.reference.url, kind: 'academic-reference'},
  ],
  assetId: input.assetId as MuseumAssetId,
  panelAssetId: input.assetId as MuseumAssetId,
  articleRoute: input.articleRoute,
  presentation: {
    panelKicker: 'Gallery 10 supporting exhibit',
    proximityKicker: input.shortTitle,
    factRows: [
      {label: 'Focus', value: input.workLabel},
      {label: 'Question', value: input.question},
      {label: 'Reading rule', value: 'Object, date, and interpretive limits remain visible'},
    ],
    articleActionLabel: input.entityKind === 'philosopher'
      ? 'Open the philosopher in the Atlas'
      : 'Open Islamic Philosophy in the Atlas',
    entityKind: input.entityKind,
    keyIdeasLabel: 'Interpretive anchors',
    cautionsLabel: 'Keep in view',
  },
});

const islamicReference = {
  label: 'Stanford Encyclopedia of Philosophy — Greek Sources in Arabic and Islamic Philosophy',
  url: 'https://plato.stanford.edu/entries/arabic-islamic-greek/',
} as const;
const ghazaliReference = {
  label: 'Stanford Encyclopedia of Philosophy — Al-Ghazali',
  url: 'https://plato.stanford.edu/entries/al-ghazali/',
} as const;
const averroesReference = {
  label: 'Stanford Encyclopedia of Philosophy — Ibn Rushd',
  url: 'https://plato.stanford.edu/entries/ibn-rushd/',
} as const;
const suhrawardiReference = {
  label: 'Stanford Encyclopedia of Philosophy — Suhrawardi',
  url: 'https://plato.stanford.edu/entries/suhrawardi/',
} as const;
const sadraReference = {
  label: 'Stanford Encyclopedia of Philosophy — Mulla Sadra',
  url: 'https://plato.stanford.edu/entries/mulla-sadra/',
} as const;

export const ISLAMIC_WALL_FILL_EXHIBITS = [
  wallFill({
    id: 'al-ghazali-aims-philosophers',
    assetId: 'al-ghazali-maqasid-1913',
    displayName: 'Al-Ghazali’s Aims of the Philosophers: Understanding Before Critique',
    shortTitle: 'Al-Ghazali: Aims of the Philosophers',
    workLabel: 'AL-GHAZALI · MAQĀṢID AL-FALĀSIFA',
    dateLabel: 'Work composed before the Incoherence · Cairo edition, 1913',
    question: 'Why reconstruct a position carefully before challenging it?',
    frontSubtitle: 'Logic, natural philosophy, metaphysics, exposition, and the ethics of disagreement',
    lead: 'The Aims of the Philosophers presents positions associated with the falāsifa in a deliberately organized form. Read beside the Incoherence, it prevents al-Ghazali from appearing as an outsider who rejected a subject he did not understand. His critique depends upon substantial philosophical appropriation, even where he later draws sharp theological limits.',
    keyIdeas: [
      'Accurate exposition is a precondition for serious criticism.',
      'Al-Ghazali adopts philosophical tools while contesting selected conclusions.',
      'A paired reading of Aims and Incoherence reveals argument rather than a slogan about faith versus reason.',
    ],
    cautions: [
      'The 1913 title page is a modern edition, not a medieval manuscript.',
      'Do not assume that exposition means endorsement of every position described.',
    ],
    sections: [
      {heading: 'Critique begins with reconstruction', paragraph: 'A critic must know which premises, distinctions, and demonstrations an opponent actually uses. The Aims maps logic, physics, and metaphysics so that later objections can engage structured claims rather than caricatures.'},
      {heading: 'Appropriation complicates opposition', paragraph: 'Al-Ghazali’s writings make extensive use of logical vocabulary and argumentative technique. The relation between kalām and falsafa is therefore one of selective adoption, redirection, and dispute—not a clean border between reason and its refusal.'},
      {heading: 'The edition has its own history', paragraph: 'The Cairo title page belongs to a modern print culture that made the work available to new readers. It witnesses transmission while remaining far removed from al-Ghazali’s own manuscript setting.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Maqāṣid al-falāsifa, Cairo 1913', url: 'https://commons.wikimedia.org/wiki/File:Maqasid_al-falasifah.JPG'},
    reference: ghazaliReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'al-ghazali'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'al-ghazali-deliverance-error',
    assetId: 'al-ghazali-munqidh-last-page',
    displayName: 'Al-Ghazali’s Deliverance from Error: Doubt, Authority, and Transformation',
    shortTitle: 'Al-Ghazali: Deliverance from Error',
    workLabel: 'AL-GHAZALI · AL-MUNQIDH MIN AL-ḌALĀL',
    dateLabel: 'Autobiographical intellectual account · later manuscript witness',
    question: 'What kind of certainty can survive a crisis of inherited authority?',
    frontSubtitle: 'Doubt, disciplines, testimony, philosophical inquiry, Sufi practice, and retrospective narration',
    lead: 'Deliverance from Error tells a carefully shaped story of intellectual crisis and recovery. Al-Ghazali surveys theologians, philosophers, authoritative teachers, and Sufis while asking how certainty is attained and transformed. The text is philosophically revealing, but its first-person voice remains literary and retrospective rather than a transparent diary.',
    keyIdeas: [
      'Inherited belief can become an object of disciplined examination.',
      'Al-Ghazali distinguishes demonstrative success from the wider formation of a trustworthy life.',
      'Autobiographical narration constructs an argument as well as reporting experience.',
    ],
    cautions: [
      'Do not read the work as an unedited clinical record of a private crisis.',
      'The displayed final page has limited provenance and is not an autograph.',
    ],
    sections: [
      {heading: 'Doubt tests sources of authority', paragraph: 'The narrative asks what perception, reason, instruction, and spiritual practice can each establish. Doubt is not celebrated indefinitely; it exposes the need to distinguish kinds of warrant and the formation of the knower.'},
      {heading: 'Disciplines receive differentiated judgments', paragraph: 'Logic, mathematics, natural philosophy, metaphysics, theology, and Sufi practice are not dismissed as one block. Al-Ghazali separates useful methods, dangerous inferences, disputed conclusions, and transformative disciplines.'},
      {heading: 'A final page cannot settle a life', paragraph: 'The manuscript image gives a material ending to one textual witness. Its unknown copying context and retrospective narrative form remind visitors that authorship, memory, and surviving object are different historical layers.'},
    ],
    imageSource: {label: 'Wikimedia Commons — al-Munqidh min al-ḍalāl, last page', url: 'https://commons.wikimedia.org/wiki/File:Munqidh_min_al-dalal_(last_page).jpg'},
    reference: ghazaliReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'al-ghazali'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'al-ghazali-foundations-analogy',
    assetId: 'al-ghazali-asas-qiyas',
    displayName: 'Al-Ghazali’s Foundations of Analogy: Logic Inside Legal Reasoning',
    shortTitle: 'Al-Ghazali: Foundations of Analogy',
    workLabel: 'AL-GHAZALI · ASĀS AL-QIYĀS',
    dateLabel: 'Logic, analogy, and jurisprudence · later Süleymaniye manuscript',
    question: 'How can a disputed case be related to an established judgment without guessing?',
    frontSubtitle: 'Terms, causes, comparison, valid extension, legal interpretation, and disciplined limits',
    lead: 'Foundations of Analogy examines how reasoning moves from established cases toward new judgments. The work belongs to jurisprudence as well as logic: comparison requires a defensible shared feature, attention to language, and rules that constrain arbitrary extension. It makes al-Ghazali’s philosophical appropriation visible inside a practical interpretive discipline.',
    keyIdeas: [
      'Analogy requires an argued connection, not mere resemblance.',
      'Logical distinctions can serve legal and theological inquiry without making those practices identical to falsafa.',
      'Cases, terms, causes, and purposes all affect whether an extension is warranted.',
    ],
    cautions: [
      'The opening manuscript page does not by itself display the argument’s full structure.',
      '“Analogy” should not be collapsed into a single modern logical operation across every legal school.',
    ],
    sections: [
      {heading: 'Similarity is not enough', paragraph: 'Two cases may resemble each other in many ways while differing in the feature relevant to a rule. Al-Ghazali’s analysis asks how the effective ground of a judgment is identified and tested rather than assumed.'},
      {heading: 'Borrowed tools enter a new practice', paragraph: 'Logical classification and inference become resources within jurisprudence, but legal reasoning also depends on language, authoritative texts, purposes, and institutional traditions. Appropriation changes what a tool is used to do.'},
      {heading: 'The manuscript holds a working argument', paragraph: 'Ruled text, rubrication, and later copying situate the treatise within study and transmission. The museum does not present a beautiful opening as a substitute for reading the reasoning it preserves.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Asās al-qiyās manuscript', url: 'https://commons.wikimedia.org/wiki/File:Asas_alqiyas_manuscript.jpg'},
    reference: ghazaliReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'al-ghazali'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'averroes-demonstration-posterior',
    assetId: 'averroes-posterior-analytics-wdl',
    displayName: 'Averroes on Demonstration: Reading the Posterior Analytics',
    shortTitle: 'Averroes: Demonstration',
    workLabel: 'AVERROES · POSTERIOR ANALYTICS',
    dateLabel: 'Arabic commentary tradition · later manuscript witness',
    question: 'What makes an argument produce knowledge rather than persuasion alone?',
    frontSubtitle: 'First principles, causes, necessity, scientific order, commentary, and trained inquiry',
    lead: 'Averroes’s engagement with Aristotle’s Posterior Analytics asks how demonstrations begin, how causes explain, and how disciplines achieve ordered knowledge. Commentary is active philosophical work: difficult texts are reconstructed, competing readings tested, and the relation among language, concept, and proof repeatedly clarified.',
    keyIdeas: [
      'Demonstration aims at explanatory knowledge grounded in appropriate principles.',
      'A commentary can transform a problem while claiming fidelity to its source.',
      'Different disciplines require principles suited to their subject matter.',
    ],
    cautions: [
      'The manuscript is a later witness, not Averroes’s autograph.',
      'Do not treat “demonstration” as a guarantee that every conclusion he defended was uncontested.',
    ],
    sections: [
      {heading: 'Knowledge asks why', paragraph: 'A demonstration does more than show that a conclusion follows. It aims to reveal why the fact holds through causes and principles that are prior in the relevant explanatory order.'},
      {heading: 'Commentary reconstructs an argument', paragraph: 'Averroes compares wording, logical structure, and the purpose of a passage. This work can expose tensions and propose solutions even when the declared task is to explain Aristotle faithfully.'},
      {heading: 'Transmission multiplies contexts', paragraph: 'Arabic manuscripts and later Hebrew and Latin translations placed these analyses inside new curricula and disputes. The object is one material stop in that longer history, not a transparent window onto composition.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Averroes on the Posterior Analytics, WDL 10684', url: 'https://commons.wikimedia.org/wiki/File:A_Clear_Explanation_of_Averroes%E2%80%99_Introduction_to_the_Commentary_on_Aristotle%E2%80%99s_%E2%80%9CAnalytica_Posterior%E2%80%9D_WDL10684.pdf'},
    reference: averroesReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'averroes'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'averroes-intellect-de-anima',
    assetId: 'averroes-de-anima-bnf',
    displayName: 'Averroes on Intellect: The Long Commentary on De anima',
    shortTitle: 'Averroes: Intellect and De anima',
    workLabel: 'AVERROES · SOUL AND INTELLECT',
    dateLabel: 'Thirteenth-century Latin manuscript reception',
    question: 'How can thinking be universal while individual human lives remain embodied?',
    frontSubtitle: 'Soul, imagination, material intellect, shared intelligibles, individuality, and controversy',
    lead: 'Averroes’s Long Commentary on Aristotle’s De anima became a major site of dispute about sensation, imagination, and intellect. His analysis distinguishes embodied cognitive powers from the conditions of universal thinking. Later Latin readers turned those distinctions into controversies over whether a shared intellect threatened personal knowledge and responsibility.',
    keyIdeas: [
      'Human knowing involves bodily powers as well as intelligible forms.',
      'Averroes’s account of material intellect generated divergent interpretations.',
      'The Latin “Averroist” controversy is an afterlife, not a complete description of Averroes’s own project.',
    ],
    cautions: [
      'The displayed text is a Latin reception witness rather than the original Arabic work.',
      'Avoid reducing a complex psychology to the slogan “one intellect for everyone.”',
    ],
    sections: [
      {heading: 'Embodied powers prepare thought', paragraph: 'Sensation, memory, and imagination provide forms tied to individual lives. The philosophical difficulty is to explain how intellect can grasp universal content without severing thinking from those embodied operations.'},
      {heading: 'One controversy contains several questions', paragraph: 'Debates concern the status of material intellect, the agent intellect, individual acts of understanding, and survival. Different interpreters combine these claims differently, so one polemical label cannot settle the theory.'},
      {heading: 'The manuscript records transformation', paragraph: 'The Latin page surrounds text with layers of commentary and belongs to a new institutional world. It reveals the scale of Averroes’s impact while preserving the distance between Arabic composition and European reception.'},
    ],
    imageSource: {label: 'Wikimedia Commons — BnF Latin 16151, fol. 22', url: 'https://commons.wikimedia.org/wiki/File:Bnf_lat16151_f22.jpg'},
    reference: averroesReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'averroes'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'averroes-colliget-medicine',
    assetId: 'averroes-colliget',
    displayName: 'Averroes’s Colliget: Medicine and Natural Philosophy',
    shortTitle: 'Averroes: The Colliget',
    workLabel: 'AVERROES · AL-KULLIYYĀT FĪ AL-ṬIBB',
    dateLabel: 'Medical work · later Latin printed edition',
    question: 'How does a general science of medicine relate causes to individual treatment?',
    frontSubtitle: 'Anatomy, physiology, health, disease, general principles, and clinical particularity',
    lead: 'The Colliget—Arabic al-Kulliyyāt, “generalities”—organizes general medical principles while leaving particular treatments to more specialized practice. Averroes’s medical writing belongs beside his logic and natural philosophy: bodies have ordered capacities and causes, yet the physician must still judge variable individual conditions.',
    keyIdeas: [
      'General principles and particular cases perform different medical work.',
      'Medicine connects bodily observation with causal accounts of health and disease.',
      'Averroes’s intellectual identity cannot be confined to commentary on Aristotle.',
    ],
    cautions: [
      'The Latin printed page witnesses reception rather than the Arabic original.',
      'Historical medicine should be studied accurately without being offered as present clinical advice.',
    ],
    sections: [
      {heading: 'Generality needs application', paragraph: 'A systematic account can classify organs, functions, health, and disease while remaining too general to determine every treatment. Practical judgment relates that structure to a particular body and circumstance.'},
      {heading: 'Natural philosophy enters medicine', paragraph: 'Accounts of elements, temperament, causation, and living powers organize medical explanation. The relation is productive but also historically specific; it should not be translated uncritically into modern biomedical categories.'},
      {heading: 'Print extends a medical afterlife', paragraph: 'The later Latin edition shows the Colliget moving through European medical teaching and print. Typography and translation belong to that reception history, not to Averroes’s twelfth-century writing desk.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Colliget, Yale Medical Library scan', url: 'https://commons.wikimedia.org/wiki/File:Colliget_(IA_4022010.med.yale.edu).pdf'},
    reference: averroesReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'averroes'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'andalusian-astrolabe-context',
    assetId: 'andalusian-astrolabe-1029',
    displayName: 'Al-Andalus in Practice: Ibn al-Saffar’s Dated Astrolabe',
    shortTitle: 'Al-Andalus: A 1029 Astrolabe',
    workLabel: 'AL-ANDALUS · MATHEMATICS AND INSTRUMENT',
    dateLabel: 'Made by Muhammad ibn al-Saffar · 420 AH / 1029–1030 CE',
    question: 'What happens when mathematical models become portable instruments?',
    frontSubtitle: 'Geometry, observation, calculation, craft, teaching, timekeeping, and regional knowledge',
    lead: 'Muhammad ibn al-Saffar’s dated astrolabe turns mathematical relations among observer, horizon, and sky into a portable brass instrument. It gives the room a concrete scientific world without falsely attaching the object to Averroes or Ibn Tufayl. Philosophy, astronomy, medicine, law, and instrument making overlapped through institutions and learned practices without becoming one discipline.',
    keyIdeas: [
      'An instrument embodies mathematical assumptions and skilled procedures.',
      'Craft knowledge and theoretical knowledge interact rather than occupy isolated worlds.',
      'Regional context matters without assigning every surviving object to a famous philosopher.',
    ],
    cautions: [
      'The astrolabe was made before Averroes and Ibn Tufayl and is not known to have belonged to either.',
      'It does not represent all Andalusian science or one undivided “golden age.”',
    ],
    sections: [
      {heading: 'A model becomes manipulable', paragraph: 'Engraved plates and a rotating rete allow users to relate celestial coordinates to a local horizon. The instrument works only through trained interpretation, so object, diagram, and practice form one epistemic system.'},
      {heading: 'Knowledge requires makers', paragraph: 'Design, engraving, metallurgy, calibration, and repair are intellectual achievements as well as manual skills. The named maker interrupts a gallery habit that credits only authors of texts.'},
      {heading: 'Context remains precise', paragraph: 'The dated object anchors an Andalusian scientific setting around a century before the room’s two primary philosophers. Its relevance comes from that documented context, not a fabricated story of ownership or influence.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Andalusian astrolabe dated 420 AH', url: 'https://commons.wikimedia.org/wiki/File:Andalusian_astrolabe_420_AH.jpg'},
    reference: islamicReference,
    articleRoute: {kind: 'branch', branchId: 'islamic-philosophy'},
    entityKind: 'branch',
  }),
  wallFill({
    id: 'suhrawardi-ishraq-opening',
    assetId: 'suhrawardi-ishraq-1477',
    displayName: 'Suhrawardi’s Philosophy of Illumination: Demonstration and Presence',
    shortTitle: 'Suhrawardi: Philosophy of Illumination',
    workLabel: 'SUHRAWARDI · ḤIKMAT AL-ISHRĀQ',
    dateLabel: 'Work completed in 1186 · illuminated copy of 1477–1478',
    question: 'Can rigorous demonstration prepare a knowledge that is also directly present?',
    frontSubtitle: 'Light, self-awareness, knowledge by presence, hierarchy, demonstration, and visionary disclosure',
    lead: 'The Philosophy of Illumination combines criticism of Peripatetic categories with a philosophy of light, self-awareness, and knowledge by presence. Suhrawardi does not simply replace argument with vision. He expects intellectual preparation and demonstration while claiming that some realities must also become directly manifest to the knower.',
    keyIdeas: [
      'Light functions as a language of manifestation rather than a material substance alone.',
      'Knowledge by presence differs from knowing through a representation or definition.',
      'Illuminationist practice and demonstrative argument are joined, not merely opposed.',
    ],
    cautions: [
      'The ornate copy was made for Mehmed II nearly three centuries after Suhrawardi.',
      'Do not reduce illumination to decorative mysticism or a diagram of physical light.',
    ],
    sections: [
      {heading: 'Presence begins with self-awareness', paragraph: 'A knower’s awareness of itself is not first assembled from an external image. Suhrawardi uses this immediacy to rethink how certain realities are known and how representational accounts reach their limits.'},
      {heading: 'Light names degrees of manifestation', paragraph: 'Illuminationist metaphysics orders realities through relations of light and darkness, independence and dependence, presence and concealment. The vocabulary is conceptual as well as symbolic.'},
      {heading: 'A courtly manuscript changes the work’s setting', paragraph: 'Blue, gold, and floral illumination place the text inside an Ottoman collection made for a ruler. The object witnesses prestigious reception while remaining distinct from Suhrawardi’s own life and early readers.'},
    ],
    imageSource: {label: 'Wikimedia Commons — 1477–1478 opening of Ḥikmat al-ishrāq', url: 'https://commons.wikimedia.org/wiki/File:Opening_page_from_the_manuscript_of_%22Hikmat_al-%CA%BFIshraq%22_by_al-Suhrawardi.jpg'},
    reference: suhrawardiReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'suhrawardi'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'suhrawardi-ishraq-annotated',
    assetId: 'suhrawardi-ishraq-1220',
    displayName: 'Suhrawardi in the Margins: An Annotated 1220 Illuminationist Manuscript',
    shortTitle: 'Suhrawardi: A 1220 Annotated Copy',
    workLabel: 'ILLUMINATIONISM · EARLY RECEPTION',
    dateLabel: 'Copied 13 October 1220 · post-Seljuq Iran',
    question: 'How quickly can a difficult philosophy become a shared object of commentary?',
    frontSubtitle: 'Copying, marginalia, correction, disagreement, teaching, and early posthumous reception',
    lead: 'This copy of the Philosophy of Illumination was completed within decades of Suhrawardi’s death. Dense notes and corrections make reception visible as work: readers did not merely preserve the text but questioned, explained, and reorganized it. The folios give early material evidence for an illuminationist conversation without identifying every annotator or settling every layer’s date.',
    keyIdeas: [
      'Marginalia records reading as an active philosophical practice.',
      'An early copy can still differ from an authorial text.',
      'Reception begins through correction, teaching, and dispute—not only through later schools.',
    ],
    cautions: [
      'The copy is not Suhrawardi’s autograph.',
      'Not every note necessarily belongs to the original 1220 copying campaign.',
    ],
    sections: [
      {heading: 'A margin becomes a classroom', paragraph: 'Glosses clarify terms, cross-reference passages, and mark disagreement. Even when a reader’s identity is unknown, the physical page preserves evidence that interpretation was social and cumulative.'},
      {heading: 'Early does not mean transparent', paragraph: 'The manuscript is close to Suhrawardi in time but still depends on exemplars, copyists, corrections, and later handling. Textual proximity increases its importance without erasing mediation.'},
      {heading: 'Illumination becomes a tradition', paragraph: 'A philosophy centered on presence and disclosure also survives through material copying and discursive commentary. The tension is productive: direct knowledge does not eliminate the need for public language and patient interpretation.'},
    ],
    imageSource: {label: 'Wikimedia Commons — 1220 annotated copy of Ḥikmat al-ishrāq', url: 'https://commons.wikimedia.org/wiki/File:Shihab_al-Din_Abu_al-Futuh_Ahmad_bin_Habbash_(Ya%27ish)_bin_Amirak_al-Suhrawardi_al-Maqtuli_(d._1191-92)%3B_Hikmat_al-Ishraq,_copied_by_Shams_bin_Jamal_al-Hatani,_post-Seljuq_Iran,_dated_Tuesday_13_October_1220.jpg'},
    reference: suhrawardiReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'suhrawardi'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'mulla-sadra-kahak-withdrawal',
    assetId: 'mulla-sadra-kahak-house',
    displayName: 'Mulla Sadra at Kahak: Withdrawal, Study, and a Difficult Biography',
    shortTitle: 'Mulla Sadra: The Kahak Years',
    workLabel: 'MULLA SADRA · LIFE AND INTELLECTUAL FORMATION',
    dateLabel: 'Safavid-era house association · modern photograph',
    question: 'How should a place enter a philosopher’s life story without becoming legend?',
    frontSubtitle: 'Withdrawal, study, devotion, controversy, memory, architecture, and cautious biography',
    lead: 'A house at Kahak is associated with Mulla Sadra’s period of withdrawal from Isfahan. Later narratives connect the years to study, devotion, opposition, and intellectual transformation. The place grounds biography in a material setting while the exhibit resists the tempting fiction that one room can prove exactly what happened or preserve an untouched workspace.',
    keyIdeas: [
      'Philosophical formation takes place within political, institutional, and devotional pressures.',
      'Biographical traditions can preserve memory while also shaping exemplary stories.',
      'A historic association is evidence of reception and place, not automatic proof of every narrated event.',
    ],
    cautions: [
      'The building should not be labeled an unchanged seventeenth-century study.',
      'Withdrawal did not mean complete isolation from texts, teachers, institutions, or religious practice.',
    ],
    sections: [
      {heading: 'Retreat is not absence from history', paragraph: 'Even away from a major courtly center, study depends on manuscripts, networks, inherited debates, and forms of devotion. Solitude can reorganize intellectual life without making it socially unconditioned.'},
      {heading: 'Biography gives thought a plot', paragraph: 'Accounts of controversy, exile, insight, and return make a life intelligible to later communities. Historians can use them while separating corroborated events, disputed chronology, and exemplary narration.'},
      {heading: 'Architecture disciplines imagination', paragraph: 'Brick, plaster, light, and enclosure help visitors imagine the scale of a setting, but the photograph cannot recover a particular day or doctrine. The label keeps that evidential boundary visible.'},
    ],
    imageSource: {label: 'Wikimedia Commons — house associated with Mulla Sadra at Kahak', url: 'https://commons.wikimedia.org/wiki/File:Untitled-8586_%D9%85%D9%84%D8%A7_%D8%B5%D8%AF%D8%B1%D8%A7.jpg'},
    reference: sadraReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'mulla-sadra'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'safavid-chahar-bagh-continuity',
    assetId: 'safavid-chahar-bagh-school',
    displayName: 'After Mulla Sadra: Safavid Learning and the Chahar Bagh School',
    shortTitle: 'Safavid Afterlives: Chahar Bagh',
    workLabel: 'POST-AVICENNIAN PHILOSOPHY · INSTITUTIONAL CONTINUITY',
    dateLabel: 'Chahar Bagh School built 1704–1714 · after Mulla Sadra',
    question: 'How does a philosophical tradition continue when its institutions and curricula change?',
    frontSubtitle: 'Teaching, commentary, architecture, patronage, later Sadrian reception, and historical distance',
    lead: 'The Chahar Bagh School postdates Mulla Sadra, yet its Safavid architecture provides a fitting endpoint for a hall that refuses to let Islamic philosophy vanish after Averroes. Post-Avicennian inquiry continued through teaching, commentary, theology, law, and changing institutional networks. The school represents that later world, not Mulla Sadra’s personal classroom.',
    keyIdeas: [
      'Islamic philosophical activity continues well beyond the period often called medieval.',
      'Institutions shape which texts, methods, and lineages become durable.',
      'Later Sadrian influence is a history of interpretation, not simple repetition of one master.',
    ],
    cautions: [
      'Chahar Bagh was built decades after Mulla Sadra’s death.',
      'Its beauty should not stand in for evidence about every curriculum or student.',
    ],
    sections: [
      {heading: 'The timeline stays open', paragraph: 'Suhrawardi and Mulla Sadra belong to post-Avicennian transformations that cross conventional European period labels. Ending the hall in a later Safavid setting makes continuity and change visible rather than presenting Averroes as a final chapter.'},
      {heading: 'Institutions organize survival', paragraph: 'Patronage, appointments, copying, libraries, and teaching practices determine which works remain available and how they are read. Architecture is part of that system but cannot reveal a curriculum by itself.'},
      {heading: 'Reception remakes a philosophy', paragraph: 'Later interpreters combine Sadrian claims with theology, jurisprudence, mysticism, and new debates. A lineage persists because it is reargued under new conditions, not because every generation says the same thing.'},
    ],
    imageSource: {label: 'Wikimedia Commons — interior of Chahar Bagh School', url: 'https://commons.wikimedia.org/wiki/File:Chahar_Bagh_School_%D9%85%D8%AF%D8%B1%D8%B3%D9%87_%D8%B9%D9%84%D9%88%D9%85_%D8%AF%DB%8C%D9%86%DB%8C_%DA%86%D9%87%D8%A7%D8%B1%D8%A8%D8%A7%D8%BA_%D8%A7%D8%B5%D9%81%D9%87%D8%A7%D9%86_03.jpg'},
    reference: islamicReference,
    articleRoute: {kind: 'branch', branchId: 'islamic-philosophy'},
    entityKind: 'branch',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];
