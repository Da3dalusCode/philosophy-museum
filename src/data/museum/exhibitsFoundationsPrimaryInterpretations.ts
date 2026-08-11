import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';
import type {NavigableAppRoute} from '../../routing/routes';

/**
 * Final primary-exhibit reconciliation for eight current claim-reviewed fields.
 * The shared interpretation chain registers the enrichment map below; the
 * canonical plaque contract owns the wall invitations.
 */
const EXHIBIT_REVIEW_LOCKS_BY_NAME: Readonly<Record<string, `fnv1a64:${string}`>> = {
  'Ancient Greek Philosophy': 'fnv1a64:b7516aecfbc34823',
  Epicureanism: 'fnv1a64:add34acffe9cb2df',
  Cynicism: 'fnv1a64:8ee0db7e37203053',
  Skepticism: 'fnv1a64:494a82a2dcf728eb',
  'Chinese Philosophy': 'fnv1a64:1003a4ae4fbb61e6',
  Logic: 'fnv1a64:170bed48c75c386d',
  'Philosophy of Language': 'fnv1a64:19bf6f95547576e2',
  Aesthetics: 'fnv1a64:f8b84cc8919ce9aa',
};

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

export type FoundationsPrimaryExhibitEditorialRecord = {
  readonly canonicalTitle: string;
  readonly hallId: string;
  readonly gallery: string;
  readonly roomId: string;
  readonly roomTitle: string;
  readonly tier: 'anchor-exhibit' | 'supporting-exhibit';
  readonly plaqueInvitation: string;
  readonly principalAsset: PrincipalAssetReconciliation;
  readonly article: {
    readonly route: NavigableAppRoute;
    readonly href: string;
    readonly status: 'claim-reviewed';
    readonly reviewedOn: string;
    readonly articleLock: `fnv1a64:${string}`;
    readonly boundary: string;
  };
  readonly interpretation: MuseumPrimaryInterpretationEnrichment;
};

const objectLed = (
  name: string,
  paragraphs: readonly string[],
  orientation: readonly VisitorGuideSection[],
  assetId: MuseumAssetId,
  objectText: string,
  sources: NonNullable<MuseumPrimaryInterpretationEnrichment['sources']>,
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
  sources,
  review: {
    status: 'standard-compliant',
    reviewedOn: '2026-08-10',
    method: 'Reviewed against the current claim-reviewed article, its registered sources, and the registered principal-object record. The exhibit uses an object-led three-paragraph interpretation, an explained visitor guide, a full sourced-article action, preserved provenance and rights, and verified uncropped desktop and narrow-screen presentation.',
    lock: EXHIBIT_REVIEW_LOCKS_BY_NAME[name],
  },
});

/**
 * Exactly eight current claim-reviewed canonical branch exhibits. The runtime
 * title remains the canonical branch title; descriptive program headings stay
 * in the room and gallery records.
 */
export const EXHIBITS_FOUNDATIONS_PRIMARY_EXHIBIT_EDITORIAL:
Readonly<Record<string, FoundationsPrimaryExhibitEditorialRecord>> = {
  'ancient-greek': {
    canonicalTitle: 'Ancient Greek Philosophy',
    hallId: 'mediterranean-beginnings-classical',
    gallery: 'Mediterranean Beginnings & Classical Athens',
    roomId: 'med-orientation-nature',
    roomTitle: 'Orientation, Ionia, and natural explanation',
    tier: 'supporting-exhibit',
    plaqueInvitation: 'Trace debates from scattered evidence, civic argument, schools, and later reception. Ask how inquiry into nature, knowledge, virtue, and politics emerged across Mediterranean worlds—without treating this contested history as philosophy’s universal beginning.',
    principalAsset: {
      id: 'ancient-greek-colonization-map',
      title: 'Greek settlement and colonization in the Archaic period',
      caption: 'A modern overview of Greek settlement networks around the Mediterranean and Black Sea.',
      provenance: 'Dipa1965, 2017 historical map published through Wikimedia Commons; a modern schematic orientation image rather than an ancient object.',
      rights: 'CC BY-SA 4.0. Preserve the registered attribution, derivative notice (“Resized and converted to WebP by Philosophy Atlas”), license link, and Commons source record.',
      alt: 'Modern map marking Greek settlements and colonies around the Mediterranean and Black Sea during the Archaic period.',
      preview: 'Preserve the complete registered wide map without crop or distortion; scale it into the bounded preview so the Mediterranean and Black Sea remain together.',
      visualInspection: 'At desktop, keep place labels and the broad geographic field legible beside the opening prose. At narrow width, confirm the full map remains visible rather than becoming a decorative strip.',
    },
    article: {
      route: {kind: 'branch', branchId: 'ancient-greek'},
      href: '#/branches/ancient-greek',
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:9e7926250d960243',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and requires Sol’s computed exhibit lock and final shared presentation review at registration.',
    },
    interpretation: objectLed(
      'Ancient Greek Philosophy',
      [
        'Ancient Greek philosophy is a modern field name for overlapping arguments and practices around the Aegean and Mediterranean, not a single people discovering reason after an age without it. Much early evidence survives as fragments, quotations, paraphrases, and hostile reports, so reconstruction must remain proportionate to sources. Thinkers associated with Miletus, southern Italy, Elea, Abdera, Athens, and later Hellenistic and Roman cities posed different questions about nature, change, explanation, knowledge, language, virtue, political life, and the soul. Their disagreements mattered as much as their shared vocabulary. The familiar sequence from Presocratics to Socrates, Plato, and Aristotle is useful for orientation, but it can hide contemporaneity, lost alternatives, institutions, and wider ancient exchanges.',
        'Classical Athenian philosophy also cannot be separated from civic conflict. Dialogues, speeches, treatises, schools, and public performances examine education, law, rhetoric, justice, and authority under conditions shaped by war, democracy, oligarchy, slavery, gender hierarchy, labor, and empire. Plato’s dramatic speakers are not always a transparent doctrinal voice, and Aristotle’s surviving texts are a partial, editorially layered corpus. Hellenistic schools then made philosophy into rival practices of life: Epicureans, Stoics, Cynics, and skeptics argued over pleasure, virtue, nature, community, assent, and freedom. Later commentators, translators, religious thinkers, and universities repeatedly transformed these materials rather than merely preserving a finished Greek inheritance.',
        'Dipa1965’s modern map of Archaic Greek settlement and colonization gives visitors a geographic orientation to networks around the Mediterranean and Black Sea. It cannot show where philosophy began, identify the social character of every settlement, establish a direct route from travel to doctrine, or represent all peoples affected by expansion. Its borders, routes, and labels simplify changing encounters. Read it as a corrective to an isolated Athens: intellectual activity took shape amid mobility, trade, conflict, and contact. The map nevertheless remains a modern synthesis, so it should return visitors to contested texts, material evidence, and the unequal political worlds in which philosophical argument was made possible.',
      ],
      [
        {heading: 'Working with uneven evidence', items: [
          {label: 'Fragments and testimony', description: 'Many early claims survive only as quotations or reports by later writers, so a reconstructed view is not the same thing as a philosopher’s complete surviving book.'},
          {label: 'Dialogue and treatise', description: 'Plato’s staged conversations and Aristotle’s layered teaching materials invite different ways of reading authorship, argument, and development.'},
        ]},
        {heading: 'Shared questions, rival answers', items: [
          {label: 'Nature and explanation', description: 'Early thinkers disagreed about what change, order, and cause require; no one model represents the whole field.'},
          {label: 'Ethics and political life', description: 'Arguments about flourishing and justice were made within civic institutions that also depended on exclusion, hierarchy, and conflict.'},
        ]},
        {heading: 'A changing inheritance', items: [
          {label: 'Hellenistic schools', description: 'Epicurean, Stoic, Cynic, and skeptical communities developed incompatible practices of happiness, freedom, and inquiry after the classical period.'},
          {label: 'Translation and commentary', description: 'Later Greek, Syriac, Arabic, Jewish, Christian, and Latin readers reorganized ancient arguments through new languages, institutions, and questions.'},
        ]},
      ],
      'ancient-greek-colonization-map',
      'Dipa1965’s 2017 map is a modern schematic overview of Archaic Greek settlement and colonial networks around the Mediterranean and Black Sea. It can orient visitors geographically, but cannot establish a single philosophical origin, map every cultural encounter, or turn mobility into a direct explanation of doctrine.',
      [
        {label: 'Internet Encyclopedia of Philosophy — Ancient Greek Philosophy', url: 'https://iep.utm.edu/ancient-greek-philosophy/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Presocratic Philosophy', url: 'https://plato.stanford.edu/entries/presocratics/', kind: 'academic-reference'},
        {label: 'Plato — Selected Dialogues', url: 'https://www.perseus.tufts.edu/hopper/collection?collection=Perseus:collection:Greco-Roman', kind: 'primary-text'},
        {label: 'Aristotle — Selected Treatises', url: 'https://www.perseus.tufts.edu/hopper/collection?collection=Perseus:collection:Greco-Roman', kind: 'primary-text'},
        {label: 'Greek settlement and colonization — registered source record', url: 'https://commons.wikimedia.org/wiki/File:Greek_Colonization_Archaic_Period.svg', kind: 'collection-record'},
      ],
    ),
  },
  epicureanism: {
    canonicalTitle: 'Epicureanism',
    hallId: 'hellenistic-roman-ways',
    gallery: 'Hellenistic & Roman Ways of Life',
    roomId: 'hell-epicurean-garden',
    roomTitle: 'Epicurean Garden and Roman transmission',
    tier: 'anchor-exhibit',
    plaqueInvitation: 'Enter the Garden through a carbonized papyrus. Ask how atomism, mortality, desire, friendship, and prudence were joined into a therapy against fear—without mistaking measured pleasure for luxury, isolation, or careless, endless indulgence.',
    principalAsset: {
      id: 'epicurean-garden-herculaneum-papyrus',
      title: 'Herculaneum papyrus roll under imaging',
      caption: 'A carbonized Herculaneum papyrus under modern non-destructive imaging.',
      provenance: 'Unknown ancient copyist; roll carbonized in 79 CE; modern imaging by the E-RIHS.it MOLAB team. Biblioteca Nazionale di Napoli / E-RIHS.it.',
      rights: 'CC BY 4.0. Preserve the registered multi-person attribution, derivative notice, license link, and Commons source record.',
      alt: 'A blackened, tightly rolled Herculaneum papyrus rests beside modern imaging equipment.',
      preview: 'Preserve the full registered landscape image without crop or distortion so both the blackened roll and imaging apparatus remain visible.',
      visualInspection: 'At desktop, confirm the dark papyrus retains contrast in the upper-right object block. At narrow width, preserve the whole apparatus so the image does not read as an undifferentiated black object.',
    },
    article: {
      route: {kind: 'branch', branchId: 'epicureanism'},
      href: '#/branches/epicureanism',
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:c7ae51e8397f48e0',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and requires Sol’s computed exhibit lock and final shared presentation review at registration.',
    },
    interpretation: objectLed(
      'Epicureanism',
      [
        'Epicureanism joins an account of nature to a practical question: which fears and desires make a life unnecessarily insecure? Epicurus taught that bodies are composed of atoms moving in void, that the soul is mortal, and that gods—if they exist—do not administer rewards and punishments. These claims loosened fear of divine intervention, death, and cosmic purpose; physics was not detached. The good is pleasure, chiefly stable freedom from bodily pain and mental disturbance. Prudence compares consequences and recognizes limits; it does not command every available sensation. Because its corpus is partial, its system is reconstructed cautiously through letters, doctrines, later witnesses, and rivals.',
        'The Garden was a community of teaching, friendship, memory, and mutual security rather than a private refuge for isolated gratification. Friendship offered safety and shared joy. Epicureans distinguish natural and necessary desires from desires for unlimited wealth, prestige, or immortality, yet their recommendations do not reduce to asceticism. A simple meal can be enough because escalation often creates new dependence. The school’s account of justice is conventional and reciprocal: agreements not to harm or be harmed change with circumstances, leaving difficult questions about scope, stability, and those excluded from a community’s protection. Lucretius’ Latin poem and Philodemus’ writings extend rather than replace Epicurus’s lost larger output.',
        'This carbonized Herculaneum roll, photographed beside modern non-destructive imaging equipment, makes the material survival of an Epicurean library environment visible. It cannot establish that this particular roll was written by Epicurus, recover its contents by sight, or prove any doctrine about atoms, gods, death, or friendship. The eruption of 79 CE, later excavation, conservation, and imaging intervene between ancient writing and a visitor’s view. Its damaged surface is therefore part of the evidence: Epicureanism reaches us through incomplete archives and technical recovery as well as through philosophical argument. The object supports a question about transmission, not an archaeological shortcut past the fragile, contested work of reading.',
      ],
      [
        {heading: 'Therapy through understanding', items: [
          {label: 'Atoms and void', description: 'Epicurean natural philosophy explains bodies and change without a providential cosmic plan; it is part of the school’s attack on fear, not a modern physics textbook.'},
          {label: 'Mortality of the soul', description: 'The soul is bodily and does not survive death, a claim meant to undermine fear of postmortem punishment rather than dismiss grief or attachment.'},
        ]},
        {heading: 'Pleasure with limits', items: [
          {label: 'Ataraxia and aponia', description: 'Freedom from mental disturbance and bodily pain, respectively; these stable conditions explain why Epicurean pleasure is not unlimited stimulation.'},
          {label: 'Prudence', description: 'Practical comparison of choices and consequences, including refusing a pleasant option when it produces greater disturbance later.'},
        ]},
        {heading: 'Community and transmission', items: [
          {label: 'The Garden', description: 'Epicurus’s Athenian school, remembered as a community of teaching and friendship rather than a synonym for luxury or withdrawal.'},
          {label: 'Herculaneum papyri', description: 'Carbonized rolls from a Roman library whose damaged survival and modern recovery preserve Epicurean material unevenly.'},
        ]},
      ],
      'epicurean-garden-herculaneum-papyrus',
      'This ancient roll was carbonized at Herculaneum and is shown under modern non-destructive imaging. It establishes a material setting in which Epicurean texts survived, but it does not identify this roll’s author or contents, make an ancient doctrine visible, or replace the difficult work of reconstructing a damaged library.',
      [
        {label: 'Diogenes Laertius — Lives of Eminent Philosophers, Book X', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0130:book=10', kind: 'primary-text'},
        {label: 'Lucretius — On the Nature of Things', url: 'https://www.gutenberg.org/ebooks/785', kind: 'primary-text'},
        {label: 'Stanford Encyclopedia of Philosophy — Epicurus', url: 'https://plato.stanford.edu/entries/epicurus/', kind: 'academic-reference'},
        {label: 'Internet Encyclopedia of Philosophy — Epicurus', url: 'https://iep.utm.edu/epicur/', kind: 'academic-reference'},
        {label: 'Herculaneum papyrus under imaging — registered source record', url: 'https://commons.wikimedia.org/wiki/File:Herculaneum_papyri.jpg', kind: 'collection-record'},
      ],
    ),
  },
  cynicism: {
    canonicalTitle: 'Cynicism',
    hallId: 'hellenistic-roman-ways',
    gallery: 'Hellenistic & Roman Ways of Life',
    roomId: 'hell-cynic-way',
    roomTitle: 'Cynic challenge',
    tier: 'anchor-exhibit',
    plaqueInvitation: 'Confront a later scene of Diogenes and Alexander. Ask whether voluntary poverty, frank speech, bodily training, and cosmopolitan challenge can expose dependence on convention—while keeping disputed stories and radical ethics in view.',
    principalAsset: {
      id: 'cynicism-alexander-and-diogenes',
      title: 'Alexander and Diogenes',
      caption: 'Gaspar de Crayer, Alexander and Diogenes, 1625–1630. Wallraf–Richartz Museum, WRM 1413.',
      provenance: 'Gaspar de Crayer; 1625–1630 history painting; Wallraf–Richartz Museum, WRM 1413; museum reproduction registered through Wikimedia Commons.',
      rights: 'Public Domain Mark 1.0. Preserve the registered attribution, rights-status link, and Commons and museum object records.',
      alt: 'Diogenes reclines in sunlight as armored Alexander and his entourage stand over him.',
      preview: 'Preserve the full registered horizontal painting without crop or distortion; retain Diogenes, Alexander, and the surrounding entourage in one composition.',
      visualInspection: 'At desktop, check that the power contrast between reclining Diogenes and armored visitors remains legible. At narrow width, retain both figures rather than isolating a dramatic but misleading close crop.',
    },
    article: {
      route: {kind: 'branch', branchId: 'cynicism'},
      href: '#/branches/cynicism',
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:759d32368819f315',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and requires Sol’s computed exhibit lock and final shared presentation review at registration.',
    },
    interpretation: objectLed(
      'Cynicism',
      [
        'Ancient Cynicism made philosophy a public way of life. Its practitioners asked whether social goods free people or bind them to opinion and fortune. Askēsis—repeated ethical training—was meant to reduce artificial needs, cultivate endurance, and make virtue sufficient for a good life. Frank speech exposed conventions protecting privilege rather than reason. Diogenes of Sinope is central, but the evidence is difficult: no substantial early Cynic treatise survives, and sayings and anecdotes arrive through later literary, polemical, and philosophical sources. A memorable story can register a real ethical posture without being a literal event report.',
        'Cynicism was neither modern cynical distrust nor a celebration of contempt for others. Its attacks on convention raise questions about shame, dependency, hierarchy, and what human beings genuinely need. Crates carried a less aggressively theatrical version of the life into teaching; Hipparchia publicly crossed expected gender and household roles by joining the Cynic vocation. The ideal of cosmopolitanism—belonging to the world rather than merely one city—challenged inherited rank, yet it did not yield a complete institutional program for justice. Cynic self-sufficiency also differs from solitary self-enclosure: it is an attempt to make happiness less vulnerable to wealth and applause. Stoicism later borrowed and transformed this independence inside a much more systematic theory of nature and civic duty.',
        'Gaspar de Crayer’s seventeenth-century painting imagines the celebrated encounter between Diogenes and Alexander. A reclining figure in sunlight faces the armored ruler and entourage, making the contrast between political power and radical independence immediately visible. The work cannot verify that the meeting happened as painted, show Diogenes’s appearance, establish a Cynic doctrine, or resolve disputes about the tradition’s genealogy. It is reception history: a later artist makes an ancient ethical contrast into a courtly drama. Let the image introduce the question of what power cannot purchase, while the texts and their gaps keep visitors from mistaking a powerful scene for direct evidence about Cynic life.',
      ],
      [
        {heading: 'Practice as philosophical pressure', items: [
          {label: 'Askēsis', description: 'Repeated ethical training in endurance and simplicity, intended to reduce dependence on comfort, status, and circumstance rather than to glorify suffering for its own sake.'},
          {label: 'Frank speech', description: 'Deliberately candid public challenge that tests whether accepted norms serve virtue or merely protect reputation and power.'},
        ]},
        {heading: 'Figures and contested stories', items: [
          {label: 'Diogenes of Sinope', description: 'The best-known Cynic, preserved chiefly through later anecdotes whose ethical force does not guarantee their literal historical detail.'},
          {label: 'Hipparchia and Crates', description: 'Cynic partners remembered for public teaching and a life that challenged conventional household and gender expectations.'},
        ]},
        {heading: 'A difficult inheritance', items: [
          {label: 'Cosmopolitanism', description: 'The claim to be a citizen of the world, used to question local rank and exclusion without supplying a finished modern political program.'},
          {label: 'Stoic transformation', description: 'Later Stoics adapted Cynic independence while connecting it to a systematic account of reason, nature, and social duty.'},
        ]},
      ],
      'cynicism-alexander-and-diogenes',
      'Gaspar de Crayer’s 1625–1630 history painting imagines Diogenes confronting Alexander, with Diogenes in sunlight and the ruler’s entourage above him. It makes a later visual contrast between power and independence visible; it cannot document the encounter, authenticate either figure’s appearance, or establish a Cynic doctrine.',
      [
        {label: 'Diogenes Laertius — Lives of Eminent Philosophers, Book VI', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0130:book=6', kind: 'primary-text'},
        {label: 'Epictetus — Discourses', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0236', kind: 'primary-text'},
        {label: 'Internet Encyclopedia of Philosophy — Cynics', url: 'https://iep.utm.edu/cynics/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Ancient Ethical Theory', url: 'https://plato.stanford.edu/entries/ethics-ancient/', kind: 'academic-reference'},
        {label: 'Alexander and Diogenes — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Caspar_de_Crayer_Alexander_and_Diogenes.jpg', kind: 'collection-record'},
      ],
    ),
  },
  skepticism: {
    canonicalTitle: 'Skepticism',
    hallId: 'hellenistic-roman-ways',
    gallery: 'Hellenistic & Roman Ways of Life',
    roomId: 'hell-skeptical-lineages',
    roomTitle: 'Academic and Pyrrhonian skeptical lineages',
    tier: 'anchor-exhibit',
    plaqueInvitation: 'Open a Renaissance title page of Sextus Empiricus. Compare Academic and Pyrrhonian attempts to oppose arguments, withhold assent, and live amid uncertainty—without turning skepticism into dogmatic denial, passive indecision, or one uniform school.',
    principalAsset: {
      id: 'skepticism-adversus-mathematicos',
      title: 'Adversus mathematicos, title page',
      caption: 'Title page of a 1569 Latin Adversus mathematicos. BnF / Gallica.',
      provenance: 'Sextus Empiricus; a 1569 Latin edition associated with Gentian Hervet’s translation; scan from Gallica / Bibliothèque nationale de France.',
      rights: 'Public Domain Mark 1.0. Preserve the registered BnF / Gallica attribution, rights-status link, and Commons source record.',
      alt: 'Black-and-white title page from a 1569 Latin edition of Sextus Empiricus.',
      preview: 'Preserve the full portrait title page without crop or distortion; center it in the bounded preview so its margins and typographic hierarchy remain visible.',
      visualInspection: 'At desktop, the portrait page must remain a compact reference object rather than overpowering prose. At narrow width, preserve complete page edges and sufficient contrast for its transmission context to read.',
    },
    article: {
      route: {kind: 'branch', branchId: 'skepticism'},
      href: '#/branches/skepticism',
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:fe65280ad564667f',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and requires Sol’s computed exhibit lock and final shared presentation review at registration.',
    },
    interpretation: objectLed(
      'Skepticism',
      [
        'Ancient skepticism begins from inquiry rather than a doctrine that nothing is true or knowable. Skeptics noticed conflict between appearances, balanced arguments, and rival criteria. The response is to continue examining while withholding assent when the case does not justify a settled claim. This takes reasons seriously enough to resist premature closure. The term covers importantly different traditions. Academic skeptics used Plato’s Academy to test Stoic confidence in knowledge. Pyrrhonian skeptics associated their practice with opposing arguments and epochē, suspension of judgment, while reporting that tranquility may follow without being directly pursued.',
        'The difference between Academic and Pyrrhonian skepticism cannot be resolved by one slogan. Reports of Arcesilaus and Carneades are indirect, and scholars debate whether Academic practice involved any positive commitment about what can be known or merely a dialectical testing of dogmatists. Pyrrhonian accounts raise a related question: how can a skeptic live, speak, use arguments, and follow appearances without acquiring beliefs in the prohibited sense? Sextus Empiricus describes ordinary life continuing through skills, habits, laws, and bodily needs, but this does not turn suspension into passivity. Later readers remade these materials for early modern debates about certainty, science, religion, and mind; their uses should not be projected unchanged into ancient schools.',
        'The displayed title page belongs to a 1569 Latin edition of Sextus Empiricus’s Adversus mathematicos, associated with Gentian Hervet’s translation. It shows a Renaissance stage in the circulation of skeptical texts, not an authorial manuscript, an ancient copy, or a transparent window onto Sextus’s intentions. Nor can its typography decide whether skepticism is true, whether Academic and Pyrrhonian practices agree, or how suspension works. The page instead makes reception material: arguments survive through translation, printing, selection, and new readers. Its limits fit the exhibit’s lesson. Before making a book prove too much, ask what sort of object it is, who transmitted it, and which questions remain open beyond its visible title.',
      ],
      [
        {heading: 'Inquiry without a creed', items: [
          {label: 'Skepsis', description: 'Inquiry or examination; ancient skepticism is a practice of testing claims, not simply a negative answer to every question.'},
          {label: 'Epochē', description: 'Suspension of assent when opposed considerations remain unresolved, rather than a claim that the opposite conclusion has been proved.'},
        ]},
        {heading: 'Rival skeptical lineages', items: [
          {label: 'Academic skepticism', description: 'Skeptical argument developed inside Plato’s Academy, especially against Stoic certainty; the degree of its positive commitment remains debated.'},
          {label: 'Pyrrhonism', description: 'A later skeptical practice associated with Pyrrho and preserved most fully by Sextus Empiricus through oppositions, modes, and ordinary-life discussion.'},
        ]},
        {heading: 'Transmission and practice', items: [
          {label: 'Adversus mathematicos', description: 'A collection attributed to Sextus that criticizes dogmatic claims in several fields; its title does not mean an attack only on modern mathematics.'},
          {label: 'Following appearances', description: 'Pyrrhonian language for continuing ordinary activity through experience, skills, customs, and needs without a dogmatic theory of their ultimate truth.'},
        ]},
      ],
      'skepticism-adversus-mathematicos',
      'This is the title page of a 1569 Latin edition of Sextus Empiricus’s Adversus mathematicos, associated with Gentian Hervet’s translation. It records Renaissance transmission through print, not an ancient or authorial copy; it cannot settle skeptical arguments or identify one uniform ancient school.',
      [
        {label: 'Sextus Empiricus — Outlines of Pyrrhonism', url: 'https://www.gutenberg.org/ebooks/17556', kind: 'primary-text'},
        {label: 'Cicero — Academica', url: 'https://www.gutenberg.org/ebooks/14970', kind: 'primary-text'},
        {label: 'Stanford Encyclopedia of Philosophy — Ancient Skepticism', url: 'https://plato.stanford.edu/entries/skepticism-ancient/', kind: 'academic-reference'},
        {label: 'The Cambridge Companion to Ancient Scepticism', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-ancient-scepticism/4B6C2F726299788B5A866D2D358D840E', kind: 'academic-reference'},
        {label: 'Adversus mathematicos — registered source record', url: 'https://commons.wikimedia.org/wiki/File:Sexti_Empirici_Adversus_mathematicos.djvu', kind: 'collection-record'},
      ],
    ),
  },
  'chinese-philosophy': {
    canonicalTitle: 'Chinese Philosophy',
    hallId: 'classical-chinese-traditions',
    gallery: 'Warring States & Classical Chinese Traditions',
    roomId: 'china-many-ways',
    roomTitle: 'Many ways in early China',
    tier: 'supporting-exhibit',
    plaqueInvitation: 'Enter a Warring States bronze world. Compare claims about ritual, learning, language, order, and rule—without making one vessel voice a school, one age define Chinese philosophy, or rival traditions seem harmonious today.',
    principalAsset: {
      id: 'china-warring-states-bronze-vessel',
      title: 'Warring States bronze vessel',
      caption: 'A Warring States bronze vessel introduces a world of competing courts, inherited rites, and changing institutions.',
      provenance: 'Ancient Chinese metalworkers; Warring States period; National Museum of China; photograph by Gary Todd, 2013.',
      rights: 'CC0. Preserve the registered Gary Todd attribution, derivative notice, and Commons source record.',
      alt: 'Bronze ritual vessel with a rounded body, loop handles, and dense patterned decoration.',
      preview: 'Preserve the complete registered landscape photograph without crop or distortion so the vessel body, handles, and patterned surface remain visible.',
      visualInspection: 'At desktop, retain the vessel’s surface detail without allowing it to compete with the opening paragraph. At narrow width, confirm the object reads as material context rather than an emblem for a single school.',
    },
    article: {
      route: {kind: 'branch', branchId: 'chinese-philosophy'},
      href: '#/branches/chinese-philosophy',
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:013c04c2f91e12bc',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and requires Sol’s computed exhibit lock and final shared presentation review at registration.',
    },
    interpretation: objectLed(
      'Chinese Philosophy',
      [
        'Chinese philosophy is an umbrella for diverse textual, institutional, linguistic, religious, and transregional histories, not a single doctrine of harmony. Warring States debates are a crucial starting point, where texts associated with Confucian, Mohist, Daoist, and statecraft currents argued about cultivation, war, benefit, names, authority, nature, and social order. Familiar school labels are partly retrospective: they clarify patterns yet obscure shared vocabulary, porous boundaries, and later category-making. An introduction begins with plural arguments, not civilizational essence, and does not let early texts stand for all later Chinese-language philosophy.',
        'The field changed through imperial commentary and education, Buddhist translation and Chinese Buddhist traditions, Song-Ming Confucian debates, Qing scholarship, colonial pressure, revolution, migration, and contemporary inquiry. Terms such as dao, li, xin, qi, and tian carry different meanings across texts and eras; one English gloss cannot settle them. Confucian writers connect learning, ritual, role, and humaneness in different ways. Mohist arguments test benefit, standards, and aggressive war. Texts associated with Daoist traditions unsettle fixed distinctions and coercive action. Han Feizi and related statecraft arguments make law, technique, and power central. These are live disagreements about how human beings, institutions, language, and change should be understood, not interchangeable variants of one worldview.',
        'This Warring States bronze vessel supplies historical material context: a rounded ritual object with handles and dense decoration made in a world of courts, inherited rites, and changing institutions. It does not encode a Confucian, Mohist, Daoist, or Legalist doctrine; it cannot identify the user’s commitments, prove a text’s date, or make an abstract argument visible. The object is valuable precisely because it resists being turned into an illustration of one school. Its ritual and technical presence can prompt questions about material culture and political order, while the exhibit keeps the answer in texts, practices, and historical debate. A vessel is not a philosophy, but it helps situate philosophy among institutions and objects rather than treating it as disembodied sayings.',
      ],
      [
        {heading: 'Terms that shift with context', items: [
          {label: 'Dao', description: 'A way, path, teaching, or order whose role differs across texts; translating it simply as “the Way” can hide an argument’s specific use.'},
          {label: 'Xin', description: 'Often rendered heart-mind, a term that joins affect, attention, discernment, and thought without a simple modern mind/body division.'},
        ]},
        {heading: 'Rival early projects', items: [
          {label: 'Confucian cultivation', description: 'Arguments that connect learning, ritual, humaneness, roles, and political order while disagreeing internally about human nature and education.'},
          {label: 'Mohist and statecraft debates', description: 'Rival arguments about benefit, impartial concern, standards, war, law, administrative technique, and power rather than one shared political theory.'},
        ]},
        {heading: 'History beyond an origin story', items: [
          {label: 'Buddhist translation', description: 'The movement of Buddhist texts and practices into Chinese settings, creating new vocabulary, institutions, and philosophical disputes rather than a simple borrowing.'},
          {label: 'Song-Ming Confucianism', description: 'Later debates about pattern, qi, learning, heart-mind, and action that developed across East Asia and cannot be reduced to Warring States texts.'},
        ]},
      ],
      'china-warring-states-bronze-vessel',
      'This Warring States bronze vessel, photographed at the National Museum of China, gives material context for competing courts, rites, and institutions. It cannot identify a philosophical school, demonstrate a doctrine, date a particular text, or convert a ritual object into a timeless emblem of “Chinese thought.”',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Metaphysics in Chinese Philosophy', url: 'https://plato.stanford.edu/entries/chinese-metaphysics/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Philosophy in Han Dynasty China', url: 'https://plato.stanford.edu/entries/han-dynasty/', kind: 'academic-reference'},
        {label: 'Karyn Lai — An Introduction to Chinese Philosophy', url: 'https://www.cambridge.org/core/books/an-introduction-to-chinese-philosophy/0E0FAD66FE81193A1C98AA1DBB21E490', kind: 'academic-reference'},
        {label: 'Chinese Text Project — Classical Chinese philosophical texts', url: 'https://ctext.org/', kind: 'primary-text'},
        {label: 'Warring States bronze vessel — registered source record', url: 'https://commons.wikimedia.org/wiki/File:Warring_States_Bronze_Vessel_(9830858254).jpg', kind: 'collection-record'},
      ],
    ),
  },
  logic: {
    canonicalTitle: 'Logic',
    hallId: 'core-questions-forum',
    gallery: 'Core Questions Forum',
    roomId: 'core-logic-language',
    roomTitle: 'Logic & Language',
    tier: 'anchor-exhibit',
    plaqueInvitation: 'Study Hamilton’s Euler diagrams. Ask how validity, truth, proof, and systems guide reasoning—without making one 1874 page logic’s origin, proof of true premises, or a universal map for all forms of thought.',
    principalAsset: {
      id: 'logic-hamilton-euler-diagrams-1874',
      title: 'Euler diagrams in Hamilton’s Lectures on Logic',
      caption: 'Euler diagrams reproduced in William Hamilton’s Lectures on Logic, 1874 edition.',
      provenance: 'William Hamilton, Lectures on Logic, third edition, 1874, pp. 255–256; William Blackwood and Sons, Edinburgh and London.',
      rights: 'Public domain. Preserve the registered attribution, derivative notice, and Commons source record.',
      alt: 'A nineteenth-century printed page pairing circular Euler diagrams with a discussion of relations among logical classes.',
      preview: 'Preserve the full portrait page without crop or distortion; center it in the bounded preview so diagrams and surrounding explanation remain together.',
      visualInspection: 'At desktop, keep circles and printed labels sufficiently visible without treating the page as a universal visual for logic. At narrow width, retain its full page proportions and readable object caption.',
    },
    article: {
      route: {kind: 'branch', branchId: 'logic'},
      href: '#/branches/logic',
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:7500ea51a88e3072',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and requires Sol’s computed exhibit lock and final shared presentation review at registration.',
    },
    interpretation: objectLed(
      'Logic',
      [
        'Logic studies forms of reasoning, consequence, proof, and the difference between truth-preserving and merely persuasive arguments. Validity concerns the relation between premises and conclusion: if the premises were true, the conclusion could not be false. It does not guarantee true premises, adequate evidence, or usefulness in every setting. Soundness adds true premises to validity, while many real inquiries also require judgment about relevance, concepts, testimony, and uncertainty. Logic is therefore neither a device for winning every dispute nor a substitute for learning what a claim means. It supplies explicit constraints that make reasoning inspectable and corrigible.',
        'There is no single historical origin or final logical system. Aristotle’s syllogistic organized one influential analysis of deductive form; Stoic logicians developed a different account centered on propositions and inference. South Asian, Chinese, Arabic, Jewish, and Latin traditions cultivated their own practices of debate, proof, classification, language, and inference. Nineteenth- and twentieth-century formal developments expanded the treatment of relations, quantifiers, models, proofs, modality, and alternatives to classical logic. Questions remain: which inferences count as logical, whether one system governs every domain, how formal languages relate to ordinary speech, and when a revision changes logic rather than a theory framed in it. Formal precision is powerful, but its scope is always an argument.',
        'William Hamilton’s 1874 teaching page pairs Euler diagrams with a discussion of logical classes. The circles make inclusion and exclusion spatially legible for a particular nineteenth-century European pedagogical context. They cannot display every form of inference, prove a conclusion, establish that modern notation is timeless, or stand for logic in all traditions. The page also cannot show why a premise should be accepted. It is useful because it reveals a material practice of instruction: printed symbols and diagrams train readers to inspect relations rather than rely on verbal impression. Treat it as one historical tool for reasoning, then follow the Forum’s routes toward distinct histories of argument and proof.',
      ],
      [
        {heading: 'What logic evaluates', items: [
          {label: 'Validity', description: 'A conclusion follows necessarily from its premises in virtue of form; validity alone does not show that the premises are true.'},
          {label: 'Soundness', description: 'A valid argument with true premises; it adds a factual condition that formal validity by itself cannot supply.'},
        ]},
        {heading: 'Tools and systems', items: [
          {label: 'Formal language', description: 'A deliberately specified notation that can expose structure hidden by ordinary grammar, while leaving questions about interpretation and application open.'},
          {label: 'Proof and model', description: 'Two ways to study consequence: proof derives a result by rules, while a model tests what is true in a structured interpretation.'},
        ]},
        {heading: 'Plural histories', items: [
          {label: 'Aristotelian syllogistic', description: 'An ancient Greek analysis of categorical inference that remains historically important but is not identical with later quantificational logic.'},
          {label: 'Nonclassical logics', description: 'Systems that revise or restrict familiar principles for questions about modality, vagueness, inconsistency, constructivity, relevance, or other domains.'},
        ]},
      ],
      'logic-hamilton-euler-diagrams-1874',
      'William Hamilton’s 1874 page reproduces Euler diagrams beside a discussion of logical classes. It can show one nineteenth-century European teaching device for inclusion and exclusion; it cannot prove a conclusion, supply true premises, or serve as a universal origin image for logic or inference.',
      [
        {label: 'Aristotle — Prior Analytics', url: 'http://classics.mit.edu/Aristotle/prior.html', kind: 'primary-text'},
        {label: 'Gottlob Frege — Begriffsschrift', url: 'https://www.loc.gov/item/07017784/', kind: 'primary-text'},
        {label: 'Stanford Encyclopedia of Philosophy — Classical Logic', url: 'https://plato.stanford.edu/entries/logic-classical/', kind: 'academic-reference'},
        {label: 'Internet Encyclopedia of Philosophy — Validity and Soundness', url: 'https://iep.utm.edu/val-snd/', kind: 'academic-reference'},
        {label: 'Euler diagrams in Hamilton’s Lectures on Logic — registered source record', url: 'https://commons.wikimedia.org/wiki/File:Hamilton_Lectures_on_Logic_1874_Euler_Diagrams.png', kind: 'collection-record'},
      ],
    ),
  },
  'philosophy-of-language': {
    canonicalTitle: 'Philosophy of Language',
    hallId: 'core-questions-forum',
    gallery: 'Core Questions Forum',
    roomId: 'core-logic-language',
    roomTitle: 'Logic & Language',
    tier: 'anchor-exhibit',
    plaqueInvitation: 'Meet the Rosetta Stone as a material problem of translation. Ask how signs, reference, use, interpretation, and power make meaning contested—without treating one decree, one language, or one modern theory as language’s origin.',
    principalAsset: {
      id: 'language-rosetta-stone-1922',
      title: 'The Rosetta Stone as an object of translation',
      caption: 'The Rosetta Stone carries one decree in hieroglyphic, Demotic, and ancient Greek scripts.',
      provenance: 'Stone decree issued at Memphis in 196 BCE; photograph by Donald Macbeth, published in The Rosetta Stone (1922). The British Museum.',
      rights: 'Public domain. Preserve the registered Donald Macbeth attribution, derivative notice, and Commons source record.',
      alt: 'Tall monochrome photograph of the irregular dark Rosetta Stone covered by three bands of inscribed script.',
      preview: 'Preserve the complete portrait photograph without crop or distortion; center the stone so all three inscription bands remain visible.',
      visualInspection: 'At desktop, the vertical object should remain visibly complete beside the opening prose. At narrow width, retain the full stone and its caption’s colonial-context caution rather than cropping toward a single script band.',
    },
    article: {
      route: {kind: 'branch', branchId: 'philosophy-of-language'},
      href: '#/branches/philosophy-of-language',
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:3049645f3ca11034',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and requires Sol’s computed exhibit lock and final shared presentation review at registration.',
    },
    interpretation: objectLed(
      'Philosophy of Language',
      [
        'Philosophy of language asks how words and other signs can mean, refer, communicate, mislead, promise, command, interpret, and enter into reasoning. Meaning need not be a private image attached to a sound. A name may pick out an object in different ways; a sentence may be true or false under contested conditions; an utterance can apologize or order only within practices. These questions connect semantics, meaning; pragmatics, use in context; and metasemantics, the question of what fixes meanings at all. They also expose limits: speaking successfully does not guarantee knowledge, and formal clarity does not remove ambiguity, power, or historical change.',
        'Different approaches emphasize different explanatory resources. Frege’s distinction between sense and reference addresses how co-referring expressions can differ in cognitive significance. Later theories ask whether reference depends on descriptions, causal histories, social practices, speaker intentions, or combinations of these. Wittgenstein’s language-games direct attention to use, rule-following, and forms of life without providing one simple slogan that settles every semantic theory. Austin’s speech-act analysis shows that saying something can be doing something, but felicity depends on conventions and situations. Translation, interpretation, testimony, slurs, legal language, and digital communication all pressure the thought that meaning is exhausted by a dictionary entry or a speaker’s solitary intention.',
        'The Rosetta Stone preserves one decree in hieroglyphic, Demotic, and ancient Greek scripts; this 1922 photograph records it as an object of translation. The stone can prompt questions about signs, scripts, interpretation, institutions, and multilingual administration. It cannot supply an origin story for philosophy of language, prove that different inscriptions carry identical meanings in every respect, or settle a modern theory of reference. Its production in Ptolemaic Egypt and removal to Britain under colonial conditions also matter: translation is entangled with authority, custody, and access. The object is not a neutral key to all language. It makes material and political conditions of reading visible beside theories that ask how meaning works.',
      ],
      [
        {heading: 'Meaning and its components', items: [
          {label: 'Sense and reference', description: 'Frege’s distinction between a way of presenting an object and the object referred to, explaining why informative identities can matter.'},
          {label: 'Semantics and pragmatics', description: 'Semantics studies meaning and truth conditions; pragmatics studies how context, speaker, audience, and situation shape what is communicated.'},
        ]},
        {heading: 'Language in action', items: [
          {label: 'Speech act', description: 'An action performed in speaking, such as promising, warning, or ordering, whose success depends on conventions and circumstances.'},
          {label: 'Language-game', description: 'Wittgenstein’s term for rule-governed uses of words within forms of life, not a claim that every conversation is arbitrary play.'},
        ]},
        {heading: 'Meaning, history, and power', items: [
          {label: 'Translation', description: 'Interpretive work across languages and traditions that can reveal both shared concerns and terms that resist exact equivalence.'},
          {label: 'Rosetta Stone', description: 'A Ptolemaic Egyptian decree in three scripts whose later custody and global fame make access, colonial history, and interpretation part of its meaning.'},
        ]},
      ],
      'language-rosetta-stone-1922',
      'The Rosetta Stone records one Ptolemaic Egyptian decree in hieroglyphic, Demotic, and ancient Greek; this photograph was published in 1922. It can prompt questions about translation and institutional power, but cannot prove a universal theory of meaning or make its three inscriptions simply interchangeable.',
      [
        {label: 'Gottlob Frege — On Sense and Reference', url: 'https://en.wikisource.org/wiki/On_Sense_and_Reference', kind: 'primary-text'},
        {label: 'Ludwig Wittgenstein — Philosophical Investigations', url: 'https://www.gutenberg.org/ebooks/5740', kind: 'primary-text'},
        {label: 'J. L. Austin — How to Do Things with Words', url: 'https://archive.org/details/howtodothingswit00aust', kind: 'primary-text'},
        {label: 'Stanford Encyclopedia of Philosophy — Theories of Meaning', url: 'https://plato.stanford.edu/entries/meaning/', kind: 'academic-reference'},
        {label: 'The Rosetta Stone — registered source record', url: 'https://commons.wikimedia.org/wiki/File:The_Rosetta_Stone.jpg', kind: 'collection-record'},
      ],
    ),
  },
  aesthetics: {
    canonicalTitle: 'Aesthetics',
    hallId: 'core-questions-forum',
    gallery: 'Core Questions Forum',
    roomId: 'core-aesthetics',
    roomTitle: 'Aesthetics',
    tier: 'anchor-exhibit',
    plaqueInvitation: 'Look with Hokusai’s wave at form, danger, labor, distance, and reproduction. Ask how beauty, art, expression, and judgment invite reasons—without making one celebrated Japanese print a single universal definition of aesthetic value.',
    principalAsset: {
      id: 'aesthetics-hokusai-great-wave',
      title: 'Under the Wave off Kanagawa',
      caption: 'Hokusai organizes danger, scale, rhythm, labor, and distant stillness within a single woodblock print.',
      provenance: 'Katsushika Hokusai, Under the Wave off Kanagawa, c. 1830–1832; The Metropolitan Museum of Art.',
      rights: 'Public domain. Preserve the registered attribution, derivative notice, and Commons source record.',
      alt: 'Hokusai’s color woodblock print shows a towering claw-like wave above small boats with Mount Fuji distant beneath the crest.',
      preview: 'Preserve the complete wide print without crop or distortion; scale it so the crest, boats, and distant Mount Fuji remain in one composition.',
      visualInspection: 'At desktop, check that the image’s fine lines and small boats remain legible in the compact object block. At narrow width, retain the whole composition rather than cropping to a decorative wave crest.',
    },
    article: {
      route: {kind: 'branch', branchId: 'aesthetics'},
      href: '#/branches/aesthetics',
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:c366cb4e15edefa2',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately and requires Sol’s computed exhibit lock and final shared presentation review at registration.',
    },
    interpretation: objectLed(
      'Aesthetics',
      [
        'Aesthetics studies forms of valuing and experiencing that involve beauty, ugliness, sublimity, grace, humor, expressive force, perceptual interest, and many other qualities. It asks why works, environments, performances, and everyday objects command attention and whether criticism can exceed a report of liking. Philosophy of art overlaps with aesthetics but is not identical with it. Aesthetics reaches beyond artworks; philosophy of art also asks what an artwork is, how a performance persists, who authorizes an interpretation, and how institutions recognize or exclude art. Neither field is simply the study of prettiness, and value is not reducible to popularity, price, sincerity, technical difficulty, or private pleasure.',
        'Aesthetic judgment concerns reasons as well as responses. Hume asks how practice and freedom from prejudice might support standards of taste without mathematical proof. Kant analyzes a disinterested yet publicly claimable pleasure, while later thinkers question those models’ assumed spectators, bodies, traditions, and institutions. Formalist, expression, historical, institutional, phenomenological, pragmatist, feminist, environmental, and decolonial approaches disagree about what deserves attention and why. Expertise can disclose missed features or repeat inherited exclusions. The task rejects blind deference and the claim that every response is beyond discussion: critics can make reasons visible, and reasons remain answerable to context, history, and experience.',
        'Hokusai’s Under the Wave off Kanagawa arranges a towering wave, small boats, distant Mount Fuji, rhythm, danger, labor, and stillness within a color woodblock print. It offers a rich case for looking at form and reception, but it cannot define aesthetics, represent every Japanese artistic practice, or provide a universal model of beauty. Its global circulation is itself part of the object’s history, inviting questions about reproduction, canon formation, and cross-cultural attention. The print should not be used as a decorative proof that aesthetics is universal. Instead, it lets visitors test how visual structure and historical context support one another while keeping open the question of whose terms, practices, and values an aesthetic account makes audible.',
      ],
      [
        {heading: 'Beyond “is it pretty?”', items: [
          {label: 'Aesthetic value', description: 'Value connected with beauty, ugliness, sublimity, humor, expressive force, and perceptual interest, not a single measure of pleasant appearance.'},
          {label: 'Philosophy of art', description: 'Inquiry into artworks, authorship, interpretation, performance, institutions, and ontology that overlaps with but does not exhaust aesthetics.'},
        ]},
        {heading: 'Judgment and reasons', items: [
          {label: 'Standard of taste', description: 'Hume’s attempt to explain how experienced, careful judges can offer criticism without turning aesthetic response into a deductive proof.'},
          {label: 'Disinterested pleasure', description: 'Kant’s account of a pleasure not grounded in desire to possess an object, central but not decisive for later theories of judgment.'},
        ]},
        {heading: 'Objects, worlds, and criticism', items: [
          {label: 'Reception', description: 'The changing ways an artwork is reproduced, displayed, interpreted, canonized, contested, and valued by different audiences and institutions.'},
          {label: 'Environmental aesthetics', description: 'Inquiry into the aesthetic character of places, infrastructures, ecologies, and everyday environments, where appreciation can also have ethical and political stakes.'},
        ]},
      ],
      'aesthetics-hokusai-great-wave',
      'Katsushika Hokusai’s Under the Wave off Kanagawa, c. 1830–1832, is a color woodblock print of a wave, boats, and distant Mount Fuji. It can ground close looking at form, labor, reproduction, and reception; it cannot define aesthetic value or stand in for every Japanese or global artistic practice.',
      [
        {label: 'David Hume — Of the Standard of Taste', url: 'https://www.gutenberg.org/ebooks/4320', kind: 'primary-text'},
        {label: 'Immanuel Kant — Critique of the Power of Judgment', url: 'https://www.gutenberg.org/ebooks/48433', kind: 'primary-text'},
        {label: 'Stanford Encyclopedia of Philosophy — The Concept of the Aesthetic', url: 'https://plato.stanford.edu/entries/aesthetic-concept/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Aesthetic Judgment', url: 'https://plato.stanford.edu/entries/aesthetic-judgment/', kind: 'academic-reference'},
        {label: 'Under the Wave off Kanagawa — registered source record', url: 'https://commons.wikimedia.org/wiki/File:The_Great_Wave_off_Kanagawa.jpg', kind: 'collection-record'},
      ],
    ),
  },
};

/** Exact canonical titles and 32–35-word invitations for Sol’s plaque-map pass. */
export const EXHIBITS_FOUNDATIONS_PRIMARY_PLAQUE_INVITATIONS = Object.fromEntries(
  Object.entries(EXHIBITS_FOUNDATIONS_PRIMARY_EXHIBIT_EDITORIAL).map(([id, record]) => [id, record.plaqueInvitation]),
) as Readonly<Record<string, string>>;

/** The isolated enrichment map Sol can register after computing review locks. */
export const EXHIBITS_FOUNDATIONS_PRIMARY_INTERPRETATIONS = Object.fromEntries(
  Object.entries(EXHIBITS_FOUNDATIONS_PRIMARY_EXHIBIT_EDITORIAL).map(([id, record]) => [id, record.interpretation]),
) as Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>>;
