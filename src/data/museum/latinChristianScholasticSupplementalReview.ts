import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';

type ReviewEvidence = {
  plaqueTitle: string;
  invitation: string;
  plaqueType: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['type'];
  canonicalContexts: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['canonicalContexts'];
  articleTitle: string;
  objectInterpretation: string;
  paragraphs: readonly [string, string, string];
  paragraphSourceIds: readonly [readonly string[], readonly string[], readonly string[]];
  sources: MuseumSupplementalExhibit['sources'];
  visitorGuide: NonNullable<MuseumSupplementalExhibit['visitorGuide']>;
  resolution: string;
  lock: string;
  overrides?: Partial<Pick<MuseumSupplementalExhibit,
    | 'displayName'
    | 'shortTitle'
    | 'workLabel'
    | 'dateLabel'
    | 'question'
    | 'frontSubtitle'
    | 'lead'
    | 'keyIdeas'
    | 'cautions'
    | 'articleRoute'
  >>;
};

const collection = (id: string, label: string, url: string) => ({id, label, url, kind: 'collection-record' as const});
const academic = (id: string, label: string, url: string) => ({id, label, url, kind: 'academic-reference' as const});
const primary = (id: string, label: string, url: string) => ({id, label, url, kind: 'primary-text' as const});

const evidence: Record<string, ReviewEvidence> = {
  'latin-boethian-logic-curriculum': {
    plaqueTitle: 'Philosophy Presents the Liberal Arts to Boethius',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'boethius'}],
    articleTitle: 'Boethius',
    invitation: 'This c. 1460–70 illumination imagines Philosophy introducing the liberal arts to Boethius; his article explains how translation, commentary, and curriculum carried Greek logic into learned Latin.',
    objectInterpretation: 'The installed object is a c. 1460–70 illumination attributed to the Coëtivy Master, possibly Henri de Vulcop, and held by the J. Paul Getty Museum. It is a late medieval reception image, not the manuscript of Aristotle’s Topics suggested by this legacy asset ID, a portrait from life, or evidence for Boethius’s sixth-century surroundings.',
    overrides: {
      displayName: 'Philosophy Presents the Liberal Arts to Boethius',
      shortTitle: 'The Liberal Arts Presented to Boethius',
      workLabel: 'LATE MEDIEVAL RECEPTION · BOETHIUS AND THE LIBERAL ARTS',
      dateLabel: 'Coëtivy Master, possibly Henri de Vulcop · c. 1460–1470 · J. Paul Getty Museum',
      question: 'How did later readers picture Boethius as an organizer of learning, and what did his actual translations and commentaries contribute?',
      frontSubtitle: 'A later curriculum image beside the history of Latin logic',
      lead: 'A fifteenth-century illumination personifies Philosophy and the seven liberal arts before Boethius. It visualizes his later curricular authority, while the textual history must be reconstructed from his translations, commentaries, and their medieval use.',
    },
    paragraphs: [
      'Philosophy stands before Boethius and introduces personifications of grammar, rhetoric, logic, arithmetic, geometry, music, and astronomy in this wide late-medieval illumination. The Commons and Getty-derived record attributes the work to the Coëtivy Master, possibly Henri de Vulcop, and dates it about 1460–70—roughly nine centuries after Boethius. The installed pixels therefore document a later image of curricular authority, not Boethius’s appearance, study, or sixth-century library. They also do not show the BnF Topics folio named by the inherited asset ID. Reading the object accurately begins by separating its fifteenth-century allegory from the textual witnesses through which Boethius’s logic survives.',
      'Boethius translated and commented on works by Porphyry and Aristotle, producing Latin resources for categories, propositions, syllogistic reasoning, and related questions. He announced a larger plan to translate Plato and Aristotle and explore their agreement, but the surviving achievement is not that complete program. Commentary mattered as much as lexical substitution: divisions, examples, alternative readings, and stable technical terms helped Latin readers turn difficult Greek materials into teachable problems. Porphyry’s postponed questions about genera and species, carried through Boethian commentary, became one opening for later arguments about universals. None of that history can be inferred from the painted figures alone; it depends on the textual record and its reception.',
      'The illumination is nevertheless philosophically useful because it shows how posterity placed Boethius inside an ordered field of learning. The seven arts became a framework within which logic could function as training for further inquiry, even though institutions, available texts, and curricula changed across time and place. Boethius was not merely a transparent conduit: selection, translation, and explanation shape what later readers can ask. Nor did his Latin corpus preserve all Greek philosophy. The linked Boethius article supplies the full sourced account of his logic, theology, Consolation, and contested legacy; this object contributes a bounded view of how a later courtly manuscript transformed that legacy into an image of intellectual order.',
    ],
    paragraphSourceIds: [['boethius-liberal-arts'], ['boethius-sep', 'medieval-logic-sep'], ['boethius-liberal-arts', 'boethius-sep']],
    sources: [
      collection('boethius-liberal-arts', 'Wikimedia Commons / J. Paul Getty Museum — Philosophy Presenting the Seven Liberal Arts to Boethius', 'https://commons.wikimedia.org/wiki/File:Co%C3%ABtivy_Master_(Henri_de_Vulcop%3F)_(French,_active_about_1450_-_1485)_-_Philosophy_Presenting_the_Seven_Liberal_Arts_to_Boethius_-_Google_Art_Project.jpg'),
      academic('boethius-sep', 'Stanford Encyclopedia of Philosophy — Anicius Manlius Severinus Boethius, §§2–6', 'https://plato.stanford.edu/entries/boethius/'),
      academic('medieval-logic-sep', 'Stanford Encyclopedia of Philosophy — Medieval Logic', 'https://plato.stanford.edu/entries/logic-medieval/'),
    ],
    visitorGuide: [
      {heading: 'Reading the later image', items: [
        {label: 'Reception, not portraiture', description: 'The fifteenth-century scene imagines Boethius and cannot document his face, clothing, or working environment.', sourceIds: ['boethius-liberal-arts']},
        {label: 'Seven liberal arts', description: 'The personified curriculum visualizes a later ordering of learning rather than a complete inventory of Boethius’s writings.', sourceIds: ['boethius-liberal-arts', 'boethius-sep']},
      ]},
      {heading: 'Following the logical inheritance', items: [
        {label: 'Translation and commentary', description: 'Boethius established Latin terminology while interpreting, dividing, and teaching selected Greek logical works.', sourceIds: ['boethius-sep', 'medieval-logic-sep']},
        {label: 'An unfinished program', description: 'His announced Plato-and-Aristotle project exceeded the translations and commentaries that actually survive.', sourceIds: ['boethius-sep']},
      ]},
    ],
    resolution: 'Resolved: followed the installed, hash-locked illumination rather than the obsolete Topics asset name; identified its later Getty reception context, qualified its evidence, mapped the curricular and logical claims, restored a factual plaque and canonical article action, and specified its natural landscape ratio.',
    lock: 'fnv1a64:ef6f10f32f3dc940',
  },
  'latin-consolation-fortune-providence': {
    plaqueTitle: 'The Wheel of Fortune in the Codex Buranus',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'boethius'}],
    articleTitle: 'Boethius',
    invitation: 'This early-thirteenth-century Wheel of Fortune gives visual form to mutability in later medieval culture, while Boethius’s article develops the Consolation’s arguments about happiness, providence, and freedom.',
    objectInterpretation: 'The illumination appears on folio 1r of the Codex Buranus, Bayerische Staatsbibliothek Clm 4660, and is dated broadly to the early thirteenth century. It is not from a manuscript of the Consolation, an authorial illustration, or direct evidence for Boethius’s prison; it records a later visual afterlife of Fortune’s wheel.',
    overrides: {
      displayName: 'The Wheel of Fortune in the Codex Buranus',
      shortTitle: 'The Codex Buranus Wheel of Fortune',
      workLabel: 'MEDIEVAL RECEPTION · FORTUNE’S WHEEL',
      dateLabel: 'Codex Buranus, Clm 4660, fol. 1r · early 13th century · Bayerische Staatsbibliothek',
      question: 'What can a later image of reversal illuminate about the Consolation without becoming an illustration Boethius knew?',
      frontSubtitle: 'A reception image beside arguments about unstable goods, providence, and freedom',
    },
    paragraphs: [
      'Fortuna occupies the hub of a wheel while crowned figures rise, reign, fall, and lose their place around its rim. The installed illumination belongs to the early-thirteenth-century Codex Buranus, Bayerische Staatsbibliothek Clm 4660, folio 1r. It was made many centuries after Boethius and does not come from a copy of the Consolation of Philosophy. It cannot show his prison, Lady Philosophy, or the visual program of an authorial manuscript. Its value is reception evidence: a later medieval book gives material and pictorial form to the mutability associated with Fortune, allowing visitors to inspect how ascent and loss became a repeated cultural image.',
      'In the Consolation, Lady Philosophy answers the imprisoned narrator by challenging his attachment to wealth, office, fame, bodily pleasure, and power. Fortune is not accused of betraying a promise of permanence; instability is precisely her rule. The dialogue’s prose and verse work together as philosophical therapy, redirecting desire toward a good that cannot be divided or seized by reversal. This argument should not be reduced to passive acceptance of suffering. The narrator is trained to reconsider what happiness requires, how apparent disorder relates to providence and fate, and why external success cannot provide the self-sufficiency it seems to offer.',
      'Book V sharpens the problem by asking whether divine foreknowledge leaves room for contingent action and responsibility. Boethius distinguishes the timeless mode of divine knowing from a temporal prediction that would force a later event, yet the argument and the work’s relationship to Christian theology remain subjects of interpretation. The wheel does not solve those questions; it dramatizes only one strand of a larger inquiry. The linked Boethius article follows the complete movement from loss through providence and freedom and explains the work’s reception. The object keeps one limitation visible: a powerful later image can show how readers remembered Fortune without proving how Boethius himself pictured or resolved the problem.',
    ],
    paragraphSourceIds: [['codex-buranus-wheel'], ['boethius-sep'], ['boethius-sep', 'providence-sep']],
    sources: [
      collection('codex-buranus-wheel', 'Wikimedia Commons / Bayerische Staatsbibliothek — Wheel of Fortune, Codex Buranus, fol. 1r', 'https://commons.wikimedia.org/wiki/File:Wheel-of-fortune-carmina-burana.jpg'),
      academic('boethius-sep', 'Stanford Encyclopedia of Philosophy — Anicius Manlius Severinus Boethius, §§4–6', 'https://plato.stanford.edu/entries/boethius/'),
      academic('providence-sep', 'Stanford Encyclopedia of Philosophy — Divine Providence, §5', 'https://plato.stanford.edu/entries/providence-divine/'),
    ],
    visitorGuide: [
      {heading: 'Fortune and consolation', items: [
        {label: 'Fortune’s rule', description: 'External goods are unstable by their nature, so their loss exposes rather than violates Fortune’s terms.', sourceIds: ['boethius-sep']},
        {label: 'Philosophical therapy', description: 'Dialogue, argument, and verse retrain the narrator’s judgment and desire instead of offering a single slogan.', sourceIds: ['boethius-sep']},
      ]},
      {heading: 'Keeping the reception distinct', items: [
        {label: 'A later manuscript', description: 'The Codex Buranus wheel is not a Consolation witness or an image commissioned by Boethius.', sourceIds: ['codex-buranus-wheel']},
        {label: 'Foreknowledge and freedom', description: 'The final problem turns on different modes of knowing, not simply on whether a future event is seen early.', sourceIds: ['boethius-sep', 'providence-sep']},
      ]},
    ],
    resolution: 'Resolved: verified the Codex Buranus reception image, broadened its date where catalog descriptions vary, separated it from a Consolation manuscript, mapped the philosophical claims and limits, and supplied factual plaque, guide, CTA, current review record, and natural portrait ratio.',
    lock: 'fnv1a64:60327eb7bda710ef',
  },
  'latin-carolingian-copying-script': {
    plaqueTitle: 'A Vita Sancti Martini in Caroline Minuscule',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'branch', id: 'medieval-scholasticism'}],
    articleTitle: 'Medieval Scholasticism',
    invitation: 'This eighth-century Vita Sancti Martini page makes a Caroline-minuscule hand visible, opening the material history of copying, correction, and libraries that supported later scholastic study.',
    objectInterpretation: 'The Commons record identifies an eighth-century BnF page of Sulpicius Severus’s Vita Sancti Martini written in Caroline minuscule, but supplies no shelfmark or complete collection history. It is hagiography rather than philosophy, and the page alone cannot establish a uniform reform, a particular scriptorium, or the survival of any one philosophical argument.',
    overrides: {
      displayName: 'A Vita Sancti Martini in Caroline Minuscule',
      shortTitle: 'Caroline Minuscule on the Page',
      workLabel: 'MATERIAL HISTORY · SCRIPT, COPYING, AND CORRECTION',
      dateLabel: 'Eighth-century Vita Sancti Martini page · Bibliothèque nationale de France · shelfmark not supplied',
      question: 'How can a bookhand alter the conditions under which texts are copied, compared, corrected, and taught?',
      frontSubtitle: 'A legible page inside selective networks of preservation',
    },
    paragraphs: [
      'Broad, separated Latin lines in dark and reddish ink fill this parchment page from Sulpicius Severus’s Vita Sancti Martini. The Commons record assigns it to the eighth century, identifies the Bibliothèque nationale de France, and describes the hand as Caroline minuscule, but it does not provide a shelfmark or a complete catalogue link. Those limits matter. The leaf is a hagiographic text, not a philosophical treatise, and its regular writing does not by itself name a scriptorium, prove a single empire-wide reform, or show how one reader used it. What the installed object securely offers is a visible example of a bookhand associated with changed practices of Latin copying.',
      'More regular letterforms, word separation, punctuation, headings, and page organization can reduce some obstacles to reading and comparison. Carolingian book production also depended on people and institutions: patrons requested texts, scribes selected exemplars, correctors compared copies, and libraries lent or retained books. No script preserved an argument automatically. A clear copy could still reproduce a corrupt reading, omit a rival work, or reorganize material for a new purpose. Describing this history as a network keeps the labor of copying and correction in view and avoids turning the “Carolingian Renaissance” into a uniform event experienced everywhere at the same time.',
      'These material practices precede the high medieval universities often associated with scholasticism, yet they helped make later study possible by sustaining Latin archives and habits of organized reading. The relationship is enabling rather than deterministic: one manuscript page did not create scholastic method, and Caroline minuscule did not decide which philosophical positions prevailed. The linked Medieval Scholasticism article follows the later institutions, texts, disputes, and pedagogies at canonical scale. This object contributes a more basic question—what has to happen to a physical text before an argument can be recovered, compared, taught, and criticized? Its missing shelfmark remains disclosed rather than replaced with a guessed provenance.',
    ],
    paragraphSourceIds: [['caroline-vita'], ['caroline-production'], ['caroline-production', 'medieval-philosophy-sep']],
    sources: [
      collection('caroline-vita', 'Wikimedia Commons / Bibliothèque nationale de France — Vita Sancti Martini page in Caroline minuscule', 'https://commons.wikimedia.org/wiki/File:Caroline_2.jpg'),
      academic('caroline-production', 'David Ganz — Book Production in the Carolingian Empire and the Spread of Caroline Minuscule', 'https://www.cambridge.org/core/books/abs/new-cambridge-medieval-history/book-production-in-the-carolingian-empire-and-the-spread-of-caroline-minuscule/C4E2F06EF2D0E739B46A66B6CA814E97'),
      academic('medieval-philosophy-sep', 'Stanford Encyclopedia of Philosophy — Medieval Philosophy', 'https://plato.stanford.edu/entries/medieval-philosophy/'),
    ],
    visitorGuide: [
      {heading: 'Reading the page materially', items: [
        {label: 'Bookhand', description: 'Caroline minuscule regularizes written forms, but this page does not establish one uniform imperial script practice.', sourceIds: ['caroline-vita', 'caroline-production']},
        {label: 'A hagiographic witness', description: 'The visible text is the Vita Sancti Martini, so it supplies material context rather than a philosophical argument.', sourceIds: ['caroline-vita']},
      ]},
      {heading: 'Tracing the copying network', items: [
        {label: 'Correction and comparison', description: 'Readable books still required exemplars, human correction, institutional exchange, and decisions about what to preserve.', sourceIds: ['caroline-production']},
        {label: 'Enabling, not causing', description: 'Carolingian copying supported later learned traditions without mechanically producing scholasticism or its doctrines.', sourceIds: ['caroline-production', 'medieval-philosophy-sep']},
      ]},
    ],
    resolution: 'Resolved: retained the installed BnF Vita page with its missing shelfmark disclosed, separated material book history from a philosophical witness, mapped the script and network claims, and added factual plaque, article relation, subject guide, current lock placeholder, and exact landscape mount ratio.',
    lock: 'fnv1a64:5f82df117656a062',
  },
  'latin-eriugena-greek-christian-sources': {
    plaqueTitle: 'Charles the Bald and His Court in the Vivian Bible',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'eriugena'}],
    articleTitle: 'John Scotus Eriugena',
    invitation: 'This 851 Vivian Bible dedication image locates royal patronage around Charles the Bald, while Eriugena’s article follows how Greek Christian sources were translated and transformed in Latin.',
    objectInterpretation: 'The installed bytes show Charles the Bald enthroned among courtiers in the Vivian Bible, BnF Latin 1, dated 851. They do not show the Periphyseon folio named by the legacy asset ID, John Scotus Eriugena, or the place where he translated and wrote. The illumination is courtly and institutional context, not textual evidence for his metaphysics.',
    overrides: {
      displayName: 'Charles the Bald and His Court in the Vivian Bible',
      shortTitle: 'The Court of Charles the Bald',
      workLabel: 'CAROLINGIAN CONTEXT · COURT, PATRONAGE, AND TRANSLATION',
      dateLabel: 'Vivian Bible · 851 · Bibliothèque nationale de France, Latin 1',
      question: 'What can a royal dedication image establish about Eriugena’s setting, and where must the philosophical evidence come from texts instead?',
      frontSubtitle: 'Courtly context beside a translated and reconstructed philosophical archive',
      lead: 'The Vivian Bible imagines Charles the Bald within a Carolingian courtly order. It provides period context for patronage, but not a portrait of Eriugena or a page of the Periphyseon.',
    },
    paragraphs: [
      'Charles the Bald sits beneath an architectural canopy while attendants gather around him in this dedication image from the Vivian Bible, completed in 851 and now BnF Latin 1. The installed file and acquisition record identify that courtly object, despite a legacy asset ID that still names Eriugena’s Periphyseon. The illumination does not depict John Scotus Eriugena, show a translation session, or record where he composed his dialogue. It does establish a visual language of Carolingian kingship, gift, and learned patronage close to his historical period. That bounded institutional context is useful only when it remains distinct from evidence for Eriugena’s actual arguments.',
      'Eriugena worked in the world of Charles the Bald and translated Greek Christian authors including Pseudo-Dionysius and Maximus the Confessor. Translation demanded a Latin vocabulary for participation, causation, theophany, negation, procession, and return. He then used those resources in the Periphyseon rather than merely repeating them. Its unusually broad use of “nature” includes what is and what is not, while several senses of nonbeing mark what exceeds understanding, has not appeared, or lacks fuller actuality. The famous four divisions describe conceptual aspects of origin, creation, and return; they are not four independent regions arranged like territories in the Vivian Bible’s courtly space.',
      'The image also guards against a solitary-genius story. Philosophical work depended on patrons, manuscripts, language skills, theological controversy, and readers, yet the presence of a royal court does not tell us that power dictated each conclusion or that Charles endorsed the later reception of the Periphyseon. The linked John Scotus Eriugena article reconstructs the translations, dialogue, negative theology, and contested interpretations from sources suited to those claims. The Vivian Bible contributes a material reminder that intellectual projects take place within institutions. Its limits are equally instructive: no crowned figure or sumptuous page can substitute for the textual evidence required to understand Eriugena’s account of the divine source and the return of all things.',
    ],
    paragraphSourceIds: [['vivian-bible-court'], ['eriugena-sep', 'dionysius-sep'], ['vivian-bible-court', 'eriugena-sep']],
    sources: [
      collection('vivian-bible-court', 'Wikimedia Commons / Bibliothèque nationale de France — Charles the Bald in the Vivian Bible', 'https://commons.wikimedia.org/wiki/File:CharlestheBald_Vivian_Bible.png'),
      academic('eriugena-sep', 'Stanford Encyclopedia of Philosophy — John Scottus Eriugena, §§2–4', 'https://plato.stanford.edu/entries/scottus-eriugena/'),
      academic('dionysius-sep', 'Stanford Encyclopedia of Philosophy — Pseudo-Dionysius the Areopagite', 'https://plato.stanford.edu/entries/pseudo-dionysius-areopagite/'),
    ],
    visitorGuide: [
      {heading: 'Separating court and text', items: [
        {label: 'Vivian Bible', description: 'The 851 dedication image presents Charles the Bald and courtly patronage, not Eriugena or the Periphyseon.', sourceIds: ['vivian-bible-court']},
        {label: 'Institutional setting', description: 'Patronage and manuscript culture enabled learned work without proving royal authorship of its philosophical claims.', sourceIds: ['vivian-bible-court', 'eriugena-sep']},
      ]},
      {heading: 'Following Eriugena’s transformations', items: [
        {label: 'Negative theology', description: 'Denial marks the inadequacy of finite predicates when applied to the divine source.', sourceIds: ['eriugena-sep', 'dionysius-sep']},
        {label: 'Procession and return', description: 'The fourfold account traces dependence and return rather than dividing reality into four self-contained worlds.', sourceIds: ['eriugena-sep']},
      ]},
    ],
    resolution: 'Resolved: followed the installed Vivian Bible court image instead of the obsolete Periphyseon identifier; corrected the visitor-facing object, bounded its patronage evidence, mapped Eriugena’s translated concepts, and restored factual plaque, canonical route, current review metadata, and natural portrait mounting.',
    lock: 'fnv1a64:d50907b62384145e',
  },
  'latin-lectio-quaestio-disputatio': {
    plaqueTitle: 'A Theology Lesson at the Sorbonne',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'branch', id: 'medieval-scholasticism'}],
    articleTitle: 'Medieval Scholasticism',
    invitation: 'This late-fifteenth-century lesson scene invites visitors to distinguish lectio, quaestio, disputatio, and determination as organized practices that exposed disagreement without making every classroom socially equal.',
    objectInterpretation: 'The Commons record describes an anonymous late-fifteenth-century illumination associated with a theology lesson at the Sorbonne and held in Troyes, but provides no shelfmark or full catalogue history. It is a later staged representation, not documentary evidence for one thirteenth-century class or a universal floor plan for scholastic teaching.',
    overrides: {
      displayName: 'A Theology Lesson at the Sorbonne',
      shortTitle: 'A Later Medieval Theology Lesson',
      workLabel: 'INSTITUTIONAL PRACTICE · READING, QUESTION, AND DISPUTATION',
      dateLabel: 'Anonymous illumination · late 15th century · Médiathèque Jacques Chirac, Troyes',
      question: 'How did organized reading and objection make disagreement teachable while leaving authority and determination structured?',
      frontSubtitle: 'A later classroom image beside several scholastic literary and oral forms',
    },
    paragraphs: [
      'A master reads from a central lectern while students sit at angled benches, some attentive to open books and others turned toward their neighbors. The source describes this anonymous illumination as a late-fifteenth-century theology lesson at the Sorbonne and locates it in a Troyes collection, but gives no manuscript shelfmark or detailed provenance. The scene was made after the formative thirteenth-century growth of university practices and cannot document a particular lecture, attendance list, or room arrangement. It is best read as a later representation of learned hierarchy and collective study: books, voice, posture, and institutional roles organize who speaks and how others participate.',
      'Lectio commonly began from an authoritative text, establishing wording, divisions, and exposition. A quaestio could isolate a difficulty, and disputation gave objections and replies a formal setting; the master’s determination then retained a distinct authority. These names did not describe one rigid procedure used identically in every monastery, cathedral school, faculty, or century. Written forms also changed the event: reports, disputed questions, and summae reorganized oral exchange for new readers. Making objections visible was intellectually important, but it did not make the classroom democratic in a modern sense. Access, office, curriculum, and the power to determine remained institutionally ordered.',
      'The linked Medieval Scholasticism article places these practices within a longer history of commentary, translation, universities, religious orders, and conflicts over authority. The illumination adds a material prompt: philosophical method is performed by bodies with books inside institutions, not only stored as abstract propositions. Its later date also warns against projecting one image backward as a complete picture of earlier teaching. Visitors can compare the fixed central lectern with the argumentative movement of question and response, while remembering that the source record leaves the precise manuscript context unresolved. The exhibit treats that limit as evidence discipline rather than filling it with an invented class, master, or occasion.',
    ],
    paragraphSourceIds: [['sorbonne-lesson'], ['medieval-literary-sep'], ['medieval-literary-sep', 'medieval-philosophy-sep']],
    sources: [
      collection('sorbonne-lesson', 'Wikimedia Commons / Troyes — late-fifteenth-century theology lesson', 'https://commons.wikimedia.org/wiki/File:Cours_de_th%C3%A9ologie_%C3%A0_la_Sorbonne_-_Biblioth%C3%A8que_de_Troyes.jpg'),
      academic('medieval-literary-sep', 'Stanford Encyclopedia of Philosophy — Literary Forms of Medieval Philosophy', 'https://plato.stanford.edu/entries/medieval-literary/'),
      academic('medieval-philosophy-sep', 'Stanford Encyclopedia of Philosophy — Medieval Philosophy', 'https://plato.stanford.edu/entries/medieval-philosophy/'),
    ],
    visitorGuide: [
      {heading: 'Practices of organized inquiry', items: [
        {label: 'Lectio', description: 'Reading and exposition establish a text, its divisions, vocabulary, and initial problems.', sourceIds: ['medieval-literary-sep']},
        {label: 'Quaestio', description: 'A focused question draws tension or uncertainty out of the inherited material.', sourceIds: ['medieval-literary-sep']},
      ]},
      {heading: 'Argument and authority', items: [
        {label: 'Disputatio', description: 'Objections and replies receive an organized hearing rather than remaining hidden disagreements.', sourceIds: ['medieval-literary-sep']},
        {label: 'Determinatio', description: 'The master’s resolution structures the outcome, so formal debate does not erase institutional hierarchy.', sourceIds: ['medieval-literary-sep', 'medieval-philosophy-sep']},
      ]},
    ],
    resolution: 'Resolved: verified the installed late lesson scene within its limited Commons record, removed documentary overreach, distinguished the principal scholastic practices and their hierarchy, and added factual plaque, sourced object-led interpretation, guide, exact CTA, review placeholder, and natural landscape ratio.',
    lock: 'fnv1a64:a5cb21620aa6a5e3',
  },
  'latin-sic-et-non-dialectic': {
    plaqueTitle: 'Héloïse and Abelard: The Astronomy Lesson',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'abelard'}],
    articleTitle: 'Peter Abelard',
    invitation: 'Durupt’s c. 1837 romantic lesson scene is later reception, not a Sic et Non manuscript; Abelard’s article explains how apparent contradictions became exercises in careful reading.',
    objectInterpretation: 'The installed image is Charles Durupt’s c. 1837 painting Héloïse and Abelard: The Astronomy Lesson, known through a Galerie Michel Descours digital source and a CC BY-SA Commons record. Its present physical collection is unrecorded. It depicts neither Sic et Non nor medieval documentary evidence and risks reducing Héloïse to a romantic pupil.',
    overrides: {
      displayName: 'Héloïse and Abelard: The Astronomy Lesson',
      shortTitle: 'Durupt’s Héloïse and Abelard',
      workLabel: 'ROMANTIC RECEPTION · ABELARD, HÉLOÏSE, AND LEARNING',
      dateLabel: 'Charles Durupt · c. 1837 · present physical collection unrecorded',
      question: 'How should a later romantic image be kept separate from Abelard’s textual method and Héloïse’s own intellectual voice?',
      frontSubtitle: 'A reception painting beside Sic et Non’s discipline of source criticism',
      lead: 'Durupt’s nineteenth-century painting imagines Héloïse and Abelard studying astronomy. It belongs to their romantic afterlife rather than the manuscript transmission or argument of Sic et Non.',
    },
    paragraphs: [
      'Charles Durupt places Héloïse and Abelard beside an astronomical globe in a richly staged interior. The Commons record dates the painting about 1837, credits a Galerie Michel Descours digital source, and licenses the photograph under CC BY-SA 4.0, while the present physical collection remains unrecorded. The installed bytes are therefore not the twelfth-century Apologia manuscript once attached to this legacy asset ID and not a witness to Sic et Non. The scene records Romantic-era imagination: intimacy, instruction, and learning are reconstructed centuries later. It cannot establish either thinker’s appearance, the setting of their lessons, or the authorship and transmission of their correspondence.',
      'Sic et Non performs a different kind of intellectual staging. Abelard assembles apparently opposed authoritative statements under questions and prefaces them with guidance about responsible interpretation. Readers must test whether words carry the same sense, whether speakers and circumstances differ, whether a passage is authentic or corrupt, and whether an author later revised a position. The collection does not simply declare that authorities contradict one another and therefore deserve rejection. Its unresolved form makes comparison, attribution, and semantic discrimination part of study. Dialectic begins with historical and linguistic care before it becomes a contest of conclusions.',
      'The painting’s unequal lesson can also distort the wider history if Héloïse appears only as Abelard’s passive student. Her writing and institutional leadership require separate attention, while this exhibit’s canonical route remains Peter Abelard because Sic et Non is the central argument under review. The linked article reconstructs his logic, ethics, theology, controversies, and sources; the reception image supplies no shortcut to that record. Visitors should hold three layers apart: a nineteenth-century painting, the medieval text Sic et Non, and the complex lives and writings later memory joined into one romance. The object’s unresolved holding is disclosed rather than converted into a false provenance chain.',
    ],
    paragraphSourceIds: [['durupt-astronomy'], ['abelard-sep', 'sic-et-non-primary'], ['durupt-astronomy', 'abelard-sep']],
    sources: [
      collection('durupt-astronomy', 'Wikimedia Commons / Galerie Michel Descours — Charles Durupt, Héloïse and Abelard: The Astronomy Lesson', 'https://commons.wikimedia.org/wiki/File:DURUPT_H%C3%A9lo%C3%AFse_et_Ab%C3%A9lard_(la_le%C3%A7on_d%27astronomie).jpg'),
      academic('abelard-sep', 'Stanford Encyclopedia of Philosophy — Peter Abelard, §2', 'https://plato.stanford.edu/entries/abelard/'),
      primary('sic-et-non-primary', 'Latin Wikisource — Sic et Non; edition and source not identified on the page', 'https://la.wikisource.org/wiki/Sic_et_non'),
    ],
    visitorGuide: [
      {heading: 'Testing an apparent contradiction', items: [
        {label: 'Sense and context', description: 'A shared word may change meaning with speaker, audience, genre, or circumstance.', sourceIds: ['abelard-sep']},
        {label: 'Textual status', description: 'Attribution, corruption, quotation, and later correction must be examined before two claims are judged incompatible.', sourceIds: ['abelard-sep', 'sic-et-non-primary']},
      ]},
      {heading: 'Reading the reception painting', items: [
        {label: 'Nineteenth-century reconstruction', description: 'The astronomy lesson is a much later imaginative scene, not a medieval classroom record.', sourceIds: ['durupt-astronomy']},
        {label: 'Héloïse is not scenery', description: 'The painting’s pupil-teacher arrangement cannot replace evidence for Héloïse’s writing, judgment, and leadership.', sourceIds: ['durupt-astronomy', 'abelard-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the installed object from an Abelard manuscript to Durupt’s c. 1837 reception painting, disclosed the missing holding, separated it from Sic et Non and Héloïse’s voice, mapped Abelard’s interpretive method, and restored factual plaque, canonical CTA, current lock placeholder, and portrait ratio.',
    lock: 'fnv1a64:631fddb298176925',
  },
  'latin-heloise-love-intention-rule': {
    plaqueTitle: 'View of the Abbey of the Paraclete',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'branch', id: 'medieval-scholasticism'}],
    articleTitle: 'Medieval Scholasticism',
    invitation: 'This later engraved view of the Paraclete opens Héloïse’s institutional world as abbess while keeping her governance and argument distinct from romantic memory and reconstructed architecture.',
    objectInterpretation: 'The installed object is Michel Picquenot’s engraved view of the Abbey of the Paraclete after Lazare Bruandet, dated broadly to the late eighteenth or early nineteenth century and catalogued by the Rijksmuseum as RP-P-OB-72.305. It is a later view of a rebuilt site, not twelfth-century fabric, a medieval letter, or evidence for Héloïse’s appearance.',
    overrides: {
      displayName: 'View of the Abbey of the Paraclete',
      shortTitle: 'The Abbey of the Paraclete',
      workLabel: 'INSTITUTIONAL RECEPTION · HÉLOÏSE AS ABBESS',
      dateLabel: 'Michel Picquenot after Lazare Bruandet · late 18th–early 19th century · Rijksmuseum RP-P-OB-72.305',
      question: 'How does beginning from Héloïse’s community and governance change a story often reduced to romance?',
      frontSubtitle: 'A later landscape beside letters about intention, observance, and communal rule',
      lead: 'A later engraving remembers the Paraclete as the institution Héloïse governed. Its landscape is reception evidence, while her arguments must be read in the correspondence and its disputed transmission.',
    },
    paragraphs: [
      'A cart and small figures move along a country road toward the low buildings of the Paraclete in Michel Picquenot’s engraving after Lazare Bruandet. Rijksmuseum catalogues the print as RP-P-OB-72.305, while related records place its making broadly in the late eighteenth or early nineteenth century. The view postdates Héloïse by more than six centuries and shows a rebuilt landscape rather than securely surviving twelfth-century fabric. It cannot illustrate the original abbey, authenticate the correspondence, or picture her daily governance. Its long caption and picturesque setting instead reveal how later viewers turned the Paraclete into a site of historical and romantic memory.',
      'Starting from the institution changes the philosophical emphasis. As abbess, Héloïse had responsibility for a women’s community, its observance, labor, health, worship, and relations with patrons. In the request conventionally called Letter 6, she presses Abelard for a rule fitted to women rather than an unexamined transfer of customs written for men. Across the correspondence, outward action, inward intention, love, conscience, reputation, and reward become difficult measures of moral life. These claims should not be detached from genre or treated as an unmediated private transcript; the letters have a complex textual history and continuing authorship and interpretation debates.',
      'The linked Medieval Scholasticism article is the truthful canonical route because the Atlas has no separate Héloïse article. That relationship should not make her merely supporting context for Abelard. The exhibit uses a broader article to connect her institutional and ethical questions to medieval practices of learning, rule, and argument, while naming the limits of that route openly. The engraving supplies a place remembered later, not proof of her doctrines. Visitors can compare the quiet landscape with the practical pressure of governing a community and ask how reception has privileged tragic love over learned leadership. Neither the object’s late date nor the correspondence’s disputes erase Héloïse’s philosophical voice; both require more exact reading.',
    ],
    paragraphSourceIds: [['paraclete-print'], ['heloise-letter-six', 'mews-heloise'], ['paraclete-print', 'mews-heloise', 'medieval-philosophy-sep']],
    sources: [
      collection('paraclete-print', 'Wikimedia Commons / Rijksmuseum — View of the Abbey of the Paraclete, RP-P-OB-72.305', 'https://commons.wikimedia.org/wiki/File:Abdij_van_Paraclet,_RP-P-OB-72.305.jpg'),
      primary('heloise-letter-six', 'Epistolae — Héloïse to Abelard, Letter 6', 'https://epistolae.ctl.columbia.edu/letter/902.html'),
      academic('mews-heloise', 'Constant J. Mews — Imagining Héloïse as Abbess of the Paraclete', 'https://doi.org/10.1111/1467-9809.12692'),
      academic('medieval-philosophy-sep', 'Stanford Encyclopedia of Philosophy — Medieval Philosophy', 'https://plato.stanford.edu/entries/medieval-philosophy/'),
    ],
    visitorGuide: [
      {heading: 'Héloïse’s institutional questions', items: [
        {label: 'The Paraclete', description: 'Héloïse governed a women’s religious community rather than existing only inside Abelard’s biography.', sourceIds: ['heloise-letter-six', 'mews-heloise']},
        {label: 'A fitting rule', description: 'Her request tests whether inherited observance suits women’s bodies, labor, circumstances, and communal responsibilities.', sourceIds: ['heloise-letter-six']},
      ]},
      {heading: 'Reading memory and evidence', items: [
        {label: 'A later landscape', description: 'The engraving records reception of the Paraclete, not its twelfth-century fabric or Héloïse’s daily life.', sourceIds: ['paraclete-print']},
        {label: 'Contested transmission', description: 'The correspondence is philosophically rich, but its genre, authorship, and textual history require continued scrutiny.', sourceIds: ['mews-heloise']},
      ]},
    ],
    resolution: 'Resolved: followed the installed Picquenot/Bruandet Paraclete engraving instead of the obsolete book-cover record, bounded the site evidence, centered Héloïse’s governance without inventing a canonical article, and added sourced interpretation, factual plaque, explicit branch CTA, review placeholder, and exact landscape mounting.',
    lock: 'fnv1a64:c98078217eabb83a',
  },
  'latin-arabic-latin-crosscurrents': {
    plaqueTitle: 'The Triumph of Saint Thomas Aquinas',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'branch', id: 'medieval-scholasticism'}],
    articleTitle: 'Medieval Scholasticism',
    invitation: 'Gozzoli’s later triumph image places Aquinas between Greek authorities and above a defeated Averroes, exposing how Latin reception could appropriate, argue with, and subordinate Arabic philosophy.',
    objectInterpretation: 'The installed object is Benozzo Gozzoli’s Triumph of Saint Thomas Aquinas, made about 1450–75 for Pisa Cathedral and now Louvre INV 104. The exact Commons photograph is CC BY 3.0. This polemical reception image is not the Vatican Latin Physics manuscript named by the legacy asset ID, a neutral map of transmission, or evidence that Averroes accepted the hierarchy it constructs.',
    overrides: {
      displayName: 'The Triumph of Saint Thomas Aquinas',
      shortTitle: 'Gozzoli’s Triumph of Aquinas',
      workLabel: 'LATIN CHRISTIAN RECEPTION · AQUINAS, GREEK AUTHORITIES, AND AVERROES',
      dateLabel: 'Benozzo Gozzoli · c. 1450–1475 · Musée du Louvre, INV 104',
      question: 'What does a triumph image reveal about reception when it turns intellectual engagement into a hierarchy of victory and defeat?',
      frontSubtitle: 'A polemical Latin genealogy beside multilingual philosophical exchange',
      lead: 'Gozzoli places Aquinas between Aristotle and Plato while Averroes lies below. The image belongs to later Latin Christian self-presentation, not to a neutral history of Arabic, Hebrew, Greek, and Latin thought.',
    },
    paragraphs: [
      'Christ appears above a radiant Thomas Aquinas, who holds an open book between Aristotle and Plato; Averroes lies below, and a learned assembly fills the lower register. The Louvre identifies the panel as Benozzo Gozzoli’s Triumph of Saint Thomas Aquinas, made about 1450–75 for Pisa Cathedral. The installed photograph derives from the exact Commons source recorded in the acquisition manifest. This is not the Greek-to-Latin Physics manuscript suggested by the inherited asset ID. Its hierarchy is visual argument: it honors Aquinas by claiming authorities for him and staging Averroes as defeated. The composition documents later Latin Christian reception, not a fair summary of any depicted thinker’s position.',
      'Philosophy moved among Greek, Syriac, Arabic, Hebrew, and Latin readers through many acts of translation, commentary, teaching, and dispute. That history was not one relay in which an intact Greek inheritance passed through Arabic hands toward a Latin destination. Thinkers writing in Arabic developed independent projects, and Jewish philosophers participated in overlapping but distinct intellectual and communal worlds. Latin readers encountered Aristotle alongside interpretations by Avicenna, Averroes, and others, sometimes through translations and sometimes through polemical report. Each language introduced technical choices and new questions. “Influence” is therefore too vague unless a text, translator, institution, argument, or identifiable reception can be named.',
      'Aquinas engaged Arabic philosophical positions selectively and critically; Gozzoli’s triumph converts that complicated encounter into a devotional victory scene. The prone Averroes exposes the politics of reception rather than proving that his work was simply overcome. Likewise, placing Plato and Aristotle beside Aquinas does not establish direct agreement among them. The linked Medieval Scholasticism article gives the canonical account of Latin institutions and arguments, while this object invites visitors to scrutinize how a later tradition pictured its ancestry. The exhibit does not use Arabic or Jewish philosophy as bridges whose importance ends in Latin Europe. It treats the image as evidence for one reception that borrowed, disputed, and subordinated the very interlocutors on whom it depended.',
    ],
    paragraphSourceIds: [['gozzoli-commons', 'gozzoli-louvre'], ['arabic-latin-sep', 'arabic-judaic-sep'], ['gozzoli-louvre', 'arabic-latin-sep']],
    sources: [
      collection('gozzoli-commons', 'Wikimedia Commons — installed photograph of Gozzoli’s Triumph of Saint Thomas Aquinas', 'https://commons.wikimedia.org/wiki/File:Benozzo_gozzoli,_trionfo_di_san_tommaso_d%27aquino,_da_duomo_di_pisa,_1470-75_ca._01.JPG'),
      collection('gozzoli-louvre', 'Musée du Louvre — Benozzo Gozzoli, Triumph of Saint Thomas Aquinas, INV 104', 'https://collections.louvre.fr/en/ark:/53355/cl010064458'),
      academic('arabic-latin-sep', 'Stanford Encyclopedia of Philosophy — Influence of Arabic and Islamic Philosophy on the Latin West, §§1, 5–6', 'https://plato.stanford.edu/entries/arabic-islamic-influence/'),
      academic('arabic-judaic-sep', 'Stanford Encyclopedia of Philosophy — Influence of Arabic and Islamic Philosophy on Judaic Thought', 'https://plato.stanford.edu/entries/arabic-islamic-judaic/'),
    ],
    visitorGuide: [
      {heading: 'Reading the painted hierarchy', items: [
        {label: 'A reception argument', description: 'The triumph composition makes a later Latin Christian claim about authority rather than neutrally recording intellectual relations.', sourceIds: ['gozzoli-commons', 'gozzoli-louvre']},
        {label: 'Averroes below', description: 'His defeated placement reveals visual polemic; it does not summarize or refute his philosophy.', sourceIds: ['gozzoli-louvre', 'arabic-latin-sep']},
      ]},
      {heading: 'Tracing connected reading worlds', items: [
        {label: 'More than a relay', description: 'Arabic, Hebrew, and Latin traditions transformed arguments for their own questions rather than passing one unchanged deposit.', sourceIds: ['arabic-latin-sep', 'arabic-judaic-sep']},
        {label: 'Name the connection', description: 'Responsible comparison identifies texts, translators, institutions, or specific arguments instead of asserting vague influence.', sourceIds: ['arabic-latin-sep', 'arabic-judaic-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the installed object from a Vatican Physics manuscript to Gozzoli’s Louvre triumph panel, verified the exact photographed source and rights, treated its subordination of Averroes as polemical reception, mapped cross-language claims, and restored factual plaque, canonical branch CTA, current review placeholder, and portrait ratio.',
    lock: 'fnv1a64:ffdc4c45aa337166',
  },
  'latin-summa-question-architecture': {
    plaqueTitle: 'Aquinas in Disputation',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'aquinas'}],
    articleTitle: 'Thomas Aquinas',
    invitation: 'Bartolomeo degli Erri’s later disputation scene makes public argument visible, while Aquinas’s article explains the Summa’s written sequence of objections, counter-authority, response, and replies.',
    objectInterpretation: 'The installed object is Bartolomeo degli Erri’s c. 1470 Scene from the Life of Saint Thomas Aquinas: The Debate with the Heretic, Fine Arts Museums of San Francisco 61.44.10, photographed by Sailko under CC BY-SA 3.0. It is not the Basel Summa manuscript named by the legacy asset ID, a transcript of a debate, or a neutral likeness of Aquinas’s opponent.',
    overrides: {
      displayName: 'Aquinas in Disputation',
      shortTitle: 'A Later Disputation Scene',
      workLabel: 'LATER RECEPTION · DISPUTATION AND THE SUMMA’S ARTICLE FORM',
      dateLabel: 'Bartolomeo degli Erri · c. 1470 · Fine Arts Museums of San Francisco, 61.44.10',
      question: 'How does a painted public debate differ from the carefully written objections and replies of a Summa article?',
      frontSubtitle: 'A hagiographic scene beside an architecture of argumentative difficulty',
      lead: 'A later panel imagines Aquinas debating an opponent before a crowd. It visualizes reception of his argumentative authority, not a manuscript page or transcript of the Summa.',
    },
    paragraphs: [
      'Aquinas addresses a seated opponent while witnesses crowd an architectural setting in Bartolomeo degli Erri’s panel, painted about 1470 and now Fine Arts Museums of San Francisco 61.44.10. The Kress record identifies the work and its collection history; the installed photograph is credited to Sailko under CC BY-SA 3.0. The image was made roughly two centuries after Aquinas’s death. Its hagiographic title calls the opponent a “heretic,” a historically loaded label the exhibit does not endorse. It records later visual reception of Aquinas as a triumphant disputant, not the Basel Summa folio implied by the asset ID, a portrait from life, or evidence for one actual exchange.',
      'A Summa theologiae article stages difficulty in writing. It normally names a question, presents objections, introduces an authoritative consideration, gives Aquinas’s central response, and returns to the objections one by one. The form does not merely decorate a settled answer. Objections establish why a problem is difficult, while the replies show which distinctions the response must preserve. A representative article such as Summa I, question 2, article 3 makes this sequence visible in a proof of God’s existence, but no single example exhausts the work. The Summa is a pedagogical construction, not a stenographic record of the crowded scene in the painting.',
      'The form can make disagreement legible while remaining hierarchical: Aquinas decides which distinctions resolve the problem and how authorities are interpreted. The unfinished state of the Summa also matters; its architecture should not be mistaken for a mechanically complete system without historical development or disputed readings. The linked Thomas Aquinas article locates the method inside his metaphysics, theology, ethics, natural philosophy, and institutional world. The painting contributes a different question about afterlife—why did later viewers picture intellectual authority as public victory? Keeping object and text separate lets visitors appreciate both the social ideal of disputation and the slower written work of answering an objection without turning an imagined opponent into a caricature.',
    ],
    paragraphSourceIds: [['aquinas-dispute-commons', 'aquinas-dispute-kress'], ['summa-i-2-3', 'medieval-literary-sep'], ['aquinas-sep', 'aquinas-dispute-kress']],
    sources: [
      collection('aquinas-dispute-commons', 'Wikimedia Commons — installed photograph of Bartolomeo degli Erri’s Aquinas disputation panel', 'https://commons.wikimedia.org/wiki/File:Bartolomeo_degli_erri,_san_tommaso_d%27aquino_dibatte_con_gli_eretici,_1465_ca..JPG'),
      collection('aquinas-dispute-kress', 'Samuel H. Kress Foundation — Scene from the Life of Saint Thomas Aquinas: The Debate with the Heretic', 'https://www.kressfoundation.org/kress-collection/artwork/3ba6a299210418b724e4ed71a15a11ff9d04532d53f94de2f23b9525ac0dd059'),
      primary('summa-i-2-3', 'Thomas Aquinas — Summa theologiae I, q. 2, a. 3', 'https://www.newadvent.org/summa/1002.htm#article3'),
      academic('medieval-literary-sep', 'Stanford Encyclopedia of Philosophy — Literary Forms of Medieval Philosophy', 'https://plato.stanford.edu/entries/medieval-literary/'),
      academic('aquinas-sep', 'Stanford Encyclopedia of Philosophy — Saint Thomas Aquinas', 'https://plato.stanford.edu/entries/aquinas/'),
    ],
    visitorGuide: [
      {heading: 'Following a Summa article', items: [
        {label: 'Objections first', description: 'The form begins by presenting reasons the eventual answer must confront rather than hiding the difficulty.', sourceIds: ['summa-i-2-3', 'medieval-literary-sep']},
        {label: 'Response and replies', description: 'A central determination is tested by returning to each objection with a distinction or correction.', sourceIds: ['summa-i-2-3', 'medieval-literary-sep']},
      ]},
      {heading: 'Reading the later panel', items: [
        {label: 'Hagiographic reception', description: 'The c. 1470 work imagines Aquinas’s authority and does not record a witnessed debate.', sourceIds: ['aquinas-dispute-kress']},
        {label: 'Loaded opponent', description: 'The catalogue title’s “heretic” belongs to the scene’s polemical framing, not to a neutral description adopted here.', sourceIds: ['aquinas-dispute-kress']},
      ]},
    ],
    resolution: 'Resolved: followed the installed Erri painting rather than the obsolete Basel manuscript ID, verified collection and reuse records, separated later hagiographic disputation from the Summa’s literary form, mapped each claim, and added factual plaque, Aquinas CTA, current review placeholder, and natural portrait mount.',
    lock: 'fnv1a64:602c3b3ed18fa592',
  },
  'latin-essence-existence-analogy': {
    plaqueTitle: 'Aquinas Presents His Work to the Crucified Christ',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'aquinas'}],
    articleTitle: 'Thomas Aquinas',
    invitation: 'Santi di Tito’s c. 1593 drawing places Aquinas’s work before a devotional horizon; his article distinguishes created essence and existence and explains analogical language about God.',
    objectInterpretation: 'The installed object is Santi di Tito’s c. 1593 drawing Saint Thomas Aquinas Presenting His Work to the Crucified Christ, Metropolitan Museum of Art 1984.237, released through the Met’s Open Access program under CC0. It is not the 1482 printed Summa named by the legacy asset ID and cannot illustrate or prove the distinctions of essence, existence, participation, or analogy.',
    overrides: {
      displayName: 'Aquinas Presents His Work to the Crucified Christ',
      shortTitle: 'Santi di Tito’s Aquinas Drawing',
      workLabel: 'DEVOTIONAL RECEPTION · AQUINAS, ESSENCE, EXISTENCE, AND ANALOGY',
      dateLabel: 'Santi di Tito · c. 1593 · The Metropolitan Museum of Art, 1984.237',
      question: 'How can a devotional reception image orient inquiry without becoming visual proof of Aquinas’s metaphysical distinctions?',
      frontSubtitle: 'A later drawing beside created being and analogical naming',
      lead: 'Santi di Tito imagines Aquinas kneeling with his book before the crucified Christ. The drawing interprets the theological horizon of his intellectual labor, not the content of a particular metaphysical argument.',
    },
    paragraphs: [
      'Aquinas kneels with an open book before the crucified Christ in Santi di Tito’s brown-ink and wash drawing, made about 1593 and now Metropolitan Museum of Art 1984.237. The Met records the medium and releases its image through Open Access under CC0. The work postdates Aquinas by more than three centuries and belongs to devotional reception. It is not a 1482 Summa page, despite the legacy asset ID, and the book’s painted presence does not identify a passage. The drawing can show how a later artist placed intellectual labor before a theological horizon; it cannot visually prove essence-existence composition, participation, divine simplicity, or analogical predication.',
      'In De ente et essentia and related mature works, Aquinas distinguishes what a created thing is from the act by which it exists. A human, horse, or triangle can be understood in terms of an essence without that understanding explaining why an individual is actual. Created beings receive existence and are not necessary in the same uncomposed way Aquinas attributes to God. The vocabulary is easy to flatten: esse is not merely a modern event added to an already complete object, and the distinction does not make essence and existence two ordinary detachable parts. Its role must be followed through Aquinas’s accounts of causation, participation, and divine simplicity.',
      'Analogical naming addresses a related pressure. Terms such as “good” or “wise” cannot be applied to God and creatures with exactly the same finite mode, yet complete equivocation would destroy meaningful predication. Summa I, question 13, article 5 develops an analogical relation grounded in causal dependence, while interpreters dispute how Aquinas’s several discussions fit together. The drawing neither resolves that dispute nor tells us what Aquinas meant simply because it shows Christ. The linked Thomas Aquinas article supplies the broader sourced system and its tensions. The object adds a reception question: how did later devotion frame the relation between disciplined writing and the divine subject it sought to understand?',
    ],
    paragraphSourceIds: [['santi-aquinas-met'], ['de-ente-primary', 'aquinas-sep'], ['summa-i-13-5', 'aquinas-sep']],
    sources: [
      collection('santi-aquinas-met', 'The Metropolitan Museum of Art — Saint Thomas Aquinas Presenting His Work to the Crucified Christ, 1984.237', 'https://www.metmuseum.org/art/collection/search/341164'),
      primary('de-ente-primary', 'Thomas Aquinas — De ente et essentia, chapter 4', 'https://isidore.co/aquinas/english/DeEnte%26Essentia.htm'),
      primary('summa-i-13-5', 'Thomas Aquinas — Summa theologiae I, q. 13, a. 5', 'https://www.newadvent.org/summa/1013.htm#article5'),
      academic('aquinas-sep', 'Stanford Encyclopedia of Philosophy — Saint Thomas Aquinas', 'https://plato.stanford.edu/entries/aquinas/'),
    ],
    visitorGuide: [
      {heading: 'Following created being', items: [
        {label: 'Essence', description: 'What a created thing is does not by itself explain that an individual of that kind actually exists.', sourceIds: ['de-ente-primary', 'aquinas-sep']},
        {label: 'Received existence', description: 'Created actuality depends on a cause and is not composed or necessary in the way Aquinas attributes to God.', sourceIds: ['de-ente-primary', 'aquinas-sep']},
      ]},
      {heading: 'Naming without flattening', items: [
        {label: 'Analogy', description: 'A term can apply truly to God and creatures without carrying one identical finite mode in both cases.', sourceIds: ['summa-i-13-5']},
        {label: 'A devotional afterlife', description: 'Santi’s later drawing frames Aquinas’s labor but supplies no diagram or proof of these distinctions.', sourceIds: ['santi-aquinas-met']},
      ]},
    ],
    resolution: 'Resolved: corrected the installed object from a 1482 Summa page to Santi di Tito’s Met drawing, verified its medium, accession, and CC0 record, limited its devotional evidence, mapped the metaphysical claims to primary texts and scholarship, and restored factual plaque, CTA, current review placeholder, and natural portrait ratio.',
    lock: 'fnv1a64:b62763a80e4f44da',
  },
  'latin-natural-law-virtue': {
    plaqueTitle: 'Cardinal and Theological Virtues and the Law',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'aquinas'}],
    articleTitle: 'Thomas Aquinas',
    invitation: 'Raphael’s 1511 fresco joins virtues and law in a later papal program, opening Aquinas’s account of practical reason, character, common good, and judgment in particular cases.',
    objectInterpretation: 'The installed wide image shows Raphael’s Cardinal and Theological Virtues and the Law, completed in 1511 in the Vatican’s Stanza della Segnatura. It is a later fresco program, not the 1477 Summa page named by the legacy asset ID, an illustration commissioned by Aquinas, or direct evidence for his definition of natural law.',
    overrides: {
      displayName: 'Cardinal and Theological Virtues and the Law',
      shortTitle: 'Raphael’s Virtues and Law',
      workLabel: 'RENAISSANCE RECEPTION · VIRTUE, PRACTICAL REASON, AND LAW',
      dateLabel: 'Raphael · 1511 · Stanza della Segnatura, Vatican Museums',
      question: 'How can a later architecture of virtues and law prompt inquiry without collapsing Aquinas’s ethics into one painted scheme?',
      frontSubtitle: 'A Renaissance fresco beside natural law, prudence, and common good',
      lead: 'Raphael’s wide lunette combines personified virtues with a larger room program on law and the good. It gives later visual form to an ethical architecture rather than illustrating Aquinas’s own text.',
    },
    paragraphs: [
      'Personified virtues occupy a wide architectural lunette in Raphael’s 1511 fresco, part of the Stanza della Segnatura program in the Vatican Museums. The official room description joins cardinal and theological virtues with law as an image of the good. The installed derivative preserves that unusually horizontal composition, which the previous tall mount severely compressed. It is not a photograph of a 1477 Summa page, despite the inherited asset ID, and it was made centuries after Aquinas. The fresco documents a Renaissance papal and humanist reception of ethical order; its figures do not prove Aquinas’s classifications or show how a particular moral decision should be made.',
      'Aquinas describes natural law as the rational creature’s participation in eternal law. In Summa I–II, question 94, article 2, practical reason begins from the good as what is to be pursued and evil avoided, then recognizes precepts connected to natural inclinations. This is not an exhaustive statute book from which every answer can be read without judgment. Human law further specifies common principles for particular communities, and Aquinas defines law through reason, common good, responsible authority, and promulgation. Those commitments make coercive rules answerable to an account of their purpose, while leaving difficult questions about derivation, determination, changing conditions, and unjust laws.',
      'Virtue keeps this theory from becoming rule application alone. Prudence concerns truthful practical reasoning about what is to be done here and now; stable dispositions shape perception, desire, and action within a life directed toward goods. The fresco’s balanced figures can prompt that relationship, but visual harmony must not conceal conflict about whose account of common good governs or how general principles reach singular cases. The linked Thomas Aquinas article places law within his broader ethics, politics, psychology, and theology. The object adds a reception history of synthesis, not a final diagram. Visitors should use it to ask how practical reason, character, institutions, and particular judgment cooperate—and where they can fail.',
    ],
    paragraphSourceIds: [['raphael-virtues-commons', 'segnatura-vatican'], ['summa-natural-law', 'summa-law-definition', 'aquinas-moral-sep'], ['aquinas-moral-sep', 'segnatura-vatican']],
    sources: [
      collection('raphael-virtues-commons', 'Wikimedia Commons — installed image of Raphael’s virtues fresco', 'https://commons.wikimedia.org/wiki/File:Raffael_054.jpg'),
      collection('segnatura-vatican', 'Vatican Museums — Stanza della Segnatura and its virtues-and-law program', 'https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/stanze-di-raffaello/stanza-della-segnatura/stanza-della-segnatura.html'),
      primary('summa-natural-law', 'Thomas Aquinas — Summa theologiae I–II, q. 94, a. 2', 'https://www.newadvent.org/summa/2094.htm#article2'),
      primary('summa-law-definition', 'Thomas Aquinas — Summa theologiae I–II, q. 90, a. 4', 'https://www.newadvent.org/summa/2090.htm#article4'),
      academic('aquinas-moral-sep', 'Stanford Encyclopedia of Philosophy — Aquinas’s Moral, Political, and Legal Philosophy', 'https://plato.stanford.edu/entries/aquinas-moral-political/'),
    ],
    visitorGuide: [
      {heading: 'Reason, law, and specification', items: [
        {label: 'Natural-law precepts', description: 'Practical reason begins from goods and inclinations; it does not supply a complete code for every circumstance.', sourceIds: ['summa-natural-law', 'aquinas-moral-sep']},
        {label: 'Law and common good', description: 'Law is an ordinance of reason for common good, made by responsible authority and promulgated.', sourceIds: ['summa-law-definition']},
      ]},
      {heading: 'Character in action', items: [
        {label: 'Prudence', description: 'Practical wisdom judges what fitting action requires in a concrete case rather than merely reciting a rule.', sourceIds: ['aquinas-moral-sep']},
        {label: 'A later synthesis', description: 'Raphael’s fresco joins virtues and law visually but cannot settle Aquinas’s theory or later disputes about it.', sourceIds: ['segnatura-vatican']},
      ]},
    ],
    resolution: 'Resolved: identified the installed ultrawide image as Raphael’s virtues-and-law fresco rather than a 1477 Summa page, corrected its title and scope, mapped law and virtue claims to primary texts, and supplied factual plaque, exact CTA, current review placeholder, and undistorted panoramic mounting.',
    lock: 'fnv1a64:370948486028ab5c',
  },
  'latin-paris-1277-contestation': {
    plaqueTitle: 'The Condemnation of 1277',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'branch', id: 'medieval-scholasticism'}],
    articleTitle: 'Medieval Scholasticism',
    invitation: 'This later manuscript witness preserves prohibited propositions issued at Paris in 1277, recording institutional limits while leaving authorship, precise targets, enforcement, and long-term effects open to inquiry.',
    objectInterpretation: 'The installed manuscript opening is associated through Commons and Gallica with the Paris condemnation issued by Bishop Étienne Tempier on 7 March 1277; a Biblissima manifest identifies BnF Latin 4391 as a witness. It is not an autograph of the decree, and the list alone cannot securely assign every proposition to an author or establish one causal effect on later philosophy.',
    overrides: {
      displayName: 'The Condemnation of 1277',
      shortTitle: 'Paris, 1277',
      workLabel: 'INSTITUTIONAL CENSURE · PROPOSITIONS, JURISDICTION, AND CONTESTED EFFECTS',
      dateLabel: 'Act issued 7 March 1277 · displayed later manuscript witness · BnF Latin 4391',
      question: 'What can a list of condemned propositions establish about institutional boundaries, and what historical work remains?',
      frontSubtitle: 'A manuscript witness whose authors, targets, enforcement, and consequences require reconstruction',
    },
    paragraphs: [
      'Compact Latin propositions fill the installed manuscript opening associated with the Paris condemnation of 1277. Bishop Étienne Tempier issued an act on 7 March condemning 219 propositions under a penalty of excommunication, while the displayed BnF witness is later material transmission rather than an authorial original. The Commons and Biblissima records support the object relationship but do not identify a copyist or precise production date for the visible opening. A list of prohibited statements records a boundary asserted by institutional authority. It does not automatically reveal who taught each article, whether wording is verbatim, how often a position circulated, or how uniformly the prohibition was enforced.',
      'The propositions range across creation, divine power, causal necessity, intellect, human freedom, happiness, and relations between philosophical and theological inquiry. Scholarship has associated some with texts and debates in the Paris arts faculty, but many attributions remain tentative or unidentified. Aquinas had died in 1274, so describing the act simply as “the Church banning Aquinas” replaces a difficult record with a slogan. A proposition might compress an inference, teaching formula, rumor, or composite of positions. Responsible interpretation compares the wording with particular works, authors, courses, and institutional contexts instead of treating the manuscript as a transparent map of individual belief.',
      'The effects are equally contested. Later thinkers could avoid a formulation, distinguish terms more carefully, defend alternatives, or proceed without a direct response; no single intellectual future follows from censure. Claims that 1277 destroyed free inquiry or created modern science give one decree more explanatory power than the evidence bears. The linked Medieval Scholasticism article places the act among universities, translated Aristotelian materials, theological jurisdictions, and changing debates. The object contributes a durable material fact—a prohibition was copied and preserved—while withholding easy causal stories. Visitors can ask which arguments changed after 1277, but an answer requires named authors, texts, dates, and settings beyond the list on display.',
    ],
    paragraphSourceIds: [['condemnation-commons', 'condemnation-biblissima'], ['condemnation-sep'], ['condemnation-sep', 'condemnation-biblissima']],
    sources: [
      collection('condemnation-commons', 'Wikimedia Commons / Bibliothèque nationale de France — manuscript witness to the 1277 condemnation', 'https://commons.wikimedia.org/wiki/File:1277_condemn_70.jpg'),
      collection('condemnation-biblissima', 'Biblissima — BnF Latin 4391, manuscript witness to the 1277 act', 'https://iiif.biblissima.fr/collections/manifest/0d9f5220bcdb35d184dfd4d6768c87a6f97bac54'),
      academic('condemnation-sep', 'Stanford Encyclopedia of Philosophy archive — Condemnation of 1277, §§1–2 and 5', 'https://plato.stanford.edu/archives/fall2019/entries/condemnation/'),
    ],
    visitorGuide: [
      {heading: 'What the act establishes', items: [
        {label: 'A dated censure', description: 'Tempier’s 7 March 1277 act condemned 219 propositions under an institutional penalty.', sourceIds: ['condemnation-sep']},
        {label: 'A later witness', description: 'The displayed manuscript preserves the act but is not presented as the issuing document or an autograph.', sourceIds: ['condemnation-commons', 'condemnation-biblissima']},
      ]},
      {heading: 'Questions the list cannot settle', items: [
        {label: 'Authorship and target', description: 'Many propositions cannot be securely assigned to one thinker, source, or classroom utterance.', sourceIds: ['condemnation-sep']},
        {label: 'Contested effects', description: 'Later consequences must be traced through particular texts and decisions rather than inferred from censure alone.', sourceIds: ['condemnation-sep']},
      ]},
    ],
    resolution: 'Resolved: verified the installed BnF/Biblissima manuscript relationship while withholding an unsupported copy date, mapped the issued act and attribution limits, rejected deterministic effect claims, and added factual plaque, branch CTA, current review placeholder, and natural landscape ratio.',
    lock: 'fnv1a64:ba2cc44e319982f1',
  },
  'latin-universals-signs-individuals': {
    plaqueTitle: 'The Porphyrian Tree',
    plaqueType: 'concept-argument-diagram-or-method',
    canonicalContexts: [{kind: 'philosopher', id: 'duns-scotus'}, {kind: 'branch', id: 'medieval-scholasticism'}],
    articleTitle: 'Duns Scotus',
    invitation: 'This 1757 library fresco monumentalizes the Porphyrian tree, opening sharply different medieval accounts of common natures, individuation, concepts, and the signs that can apply to many things.',
    objectInterpretation: 'Franz Georg Hermann painted this Tree of Porphyry on the Schussenried Monastery library ceiling in 1757; Andreas Praefcke’s photograph is dedicated to the public domain. The fresco postdates Porphyry and the medieval debates by centuries. It is reception evidence, not Porphyry’s own diagram, a medieval classroom chart, or a neutral settlement of universals.',
    overrides: {
      displayName: 'The Porphyrian Tree',
      shortTitle: 'The Porphyrian Tree at Schussenried',
      workLabel: 'DIAGRAM RECEPTION · PREDICATION, COMMON NATURE, AND INDIVIDUATION',
      dateLabel: 'Franz Georg Hermann · 1757 · Schussenried Monastery library hall',
      question: 'How did a classificatory tree become an enduring prompt for different questions about language, thought, commonality, and individuals?',
      frontSubtitle: 'A Rococo reception image beside Scotus, Ockham, and the medieval problem of universals',
    },
    paragraphs: [
      'A tree rises through figures and clouds across the ceiling of the Schussenried Monastery library hall. Franz Georg Hermann completed the fresco in 1757, and Andreas Praefcke released the installed photograph through a public-domain dedication. Its monumental setting is far removed from Porphyry’s late-antique Isagoge and the medieval classrooms that later used branching diagrams. The object shows the long reception of a classificatory image, not a drawing by Porphyry, an original medieval chart, or an answer to the ontological problem of universals. The ceiling’s hierarchy can organize genera and species visually while leaving unresolved what, if anything, corresponds to those branches outside thought and language.',
      'Porphyry famously postpones questions about whether genera and species subsist, whether they are bodily or incorporeal, and whether they exist separately or in sensible things. Medieval readers inherited those questions through translation and commentary, but their disputes concern several levels at once: what makes shared predication true, what cognition represents, what commonality exists in things, and how one individual differs from another. A tree can display inclusion relations without deciding those problems. Calling the entire history “realism versus nominalism” conceals distinct theories and changes in vocabulary, evidence, and explanatory aim.',
      'Duns Scotus treats a common nature as genuinely grounding similarity without making it, by itself, a separately existing universal; individuation involves an intrinsic principle associated with haecceity or “thisness.” Ockham rejects a shared extra-mental universal entity and locates universality primarily in signs, especially concepts capable of signifying many. These are not two labels pasted onto the same diagram. The linked John Duns Scotus article gives the canonical route for the exhibit’s strongest relationship while the guide identifies Ockham as a contrasting later position. The fresco contributes reception history and visual classification. It cannot collapse ontology, semantics, and cognition into one tree or decide between thinkers who asked differently structured questions.',
    ],
    paragraphSourceIds: [['porphyry-tree-commons', 'schussenried-official'], ['universals-sep'], ['scotus-sep', 'ockham-sep', 'universals-sep']],
    sources: [
      collection('porphyry-tree-commons', 'Wikimedia Commons — Hermann’s Tree of Porphyry fresco; photograph by Andreas Praefcke', 'https://commons.wikimedia.org/wiki/File:Schussenried_Kloster_Bibliothekssaal_Gew%C3%B6lbefresko_Baum_des_Porphyrius.jpg'),
      collection('schussenried-official', 'Schussenried Monastery — library hall and Hermann’s 1757 fresco program', 'https://www.kloster-schussenried.de/en/monastery/'),
      academic('universals-sep', 'Stanford Encyclopedia of Philosophy — The Medieval Problem of Universals, §§7–9', 'https://plato.stanford.edu/entries/universals-medieval/'),
      academic('scotus-sep', 'Stanford Encyclopedia of Philosophy — John Duns Scotus, §3.3', 'https://plato.stanford.edu/entries/duns-scotus/'),
      academic('ockham-sep', 'Stanford Encyclopedia of Philosophy — William of Ockham', 'https://plato.stanford.edu/entries/ockham/'),
    ],
    visitorGuide: [
      {heading: 'What the tree can organize', items: [
        {label: 'Genus and species', description: 'Branches display relations of classification without deciding what common terms correspond to in reality.', sourceIds: ['porphyry-tree-commons', 'universals-sep']},
        {label: 'A later monument', description: 'The 1757 fresco records reception long after Porphyry and the medieval classroom debates.', sourceIds: ['schussenried-official', 'porphyry-tree-commons']},
      ]},
      {heading: 'Two different medieval strategies', items: [
        {label: 'Scotus on thisness', description: 'A common nature grounds similarity, while an intrinsic principle accounts for this individual’s singularity.', sourceIds: ['scotus-sep', 'universals-sep']},
        {label: 'Ockham on signs', description: 'Universality belongs to concepts and terms able to signify many, not to one shared thing outside the mind.', sourceIds: ['ockham-sep', 'universals-sep']},
      ]},
    ],
    resolution: 'Resolved: dated the installed Schussenried fresco to 1757, separated its Rococo reception from Porphyry and medieval diagrams, distinguished Scotus and Ockham at claim level, and added factual plaque, canonical Scotus CTA, current review placeholder, and natural portrait mount.',
    lock: 'fnv1a64:139cc81778c26bd2',
  },
  'latin-poverty-censure-political-authority': {
    plaqueTitle: 'Portrait of Pope John XXII',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'meister-eckhart'}],
    articleTitle: 'Meister Eckhart',
    invitation: 'This retrospective 1613 portrait of John XXII orients three distinct conflicts involving Eckhart, Franciscan poverty, and coercive authority without turning the pope’s image into evidence for their arguments.',
    objectInterpretation: 'The installed object is Giuseppe Franchi’s 1613 retrospective Portrait of Pope John XXII, Pinacoteca Ambrosiana inv. 1426, reproduced as public-domain art. It is not Meister Eckhart’s 1327 notarial instrument named by the legacy asset ID, a likeness from life, or evidence for the wording of papal, Franciscan, or political documents.',
    overrides: {
      displayName: 'Portrait of Pope John XXII',
      shortTitle: 'A Later Portrait of John XXII',
      workLabel: 'RETROSPECTIVE PORTRAIT · CENSURE, POVERTY, AND JURISDICTION',
      dateLabel: 'Giuseppe Franchi · 1613 · Pinacoteca Ambrosiana, inv. 1426',
      question: 'How can one later portrait orient connected institutional conflicts without making them one dispute or replacing their documents?',
      frontSubtitle: 'A papal reception image beside distinct arguments over error, property, office, and coercion',
      lead: 'Franchi’s later portrait provides a face for Pope John XXII, whose pontificate intersects several fourteenth-century conflicts. The painting cannot document their proceedings or make Eckhart, Ockham, and Marsilius one movement.',
    },
    paragraphs: [
      'Giuseppe Franchi painted this portrait of Pope John XXII in 1613, nearly three centuries after the pope’s death; it is now Pinacoteca Ambrosiana inv. 1426. The installed pixels show white papal vestments and a jeweled tiara in a retrospective image, not a likeness from life. They also do not show Meister Eckhart’s 1327 declaration, despite the inherited asset ID, or any document from the Franciscan poverty controversy and Marsilius’s political writing. The portrait can orient a pontificate that intersects these histories. It cannot establish what a proposition said, how a hearing proceeded, or why different critics challenged papal claims.',
      'Eckhart’s Cologne proceedings must be reconstructed from their records. His public declaration of February 1327 conditionally disavowed error while maintaining that he had not knowingly taught it; the papal bull In agro dominico evaluated propositions after his death. That sequence resists the simple label “recantation.” The Franciscan poverty dispute raised other questions: whether Christ and the apostles owned goods, how use differs from ownership, whether earlier papal declarations could be reversed, and what resistance to an erring pope might mean. William of Ockham’s interventions emerged from that controversy, not from Eckhart’s mystical theology, even though John XXII belongs to both institutional settings.',
      'Marsilius of Padua’s Defensor pacis develops a further argument about civic peace, legislation, and coercive jurisdiction. His restriction of papal coercive power should not be translated directly into modern secular liberalism, and it is not interchangeable with Ockham’s positions. The linked Meister Eckhart article is the exact canonical route because the exhibit’s censure relationship begins there; the subject guide names the other conflicts without pretending that one article covers them fully. Franchi’s portrait makes papal office visible as later memory. The sourced texts and scholarship must do the argumentative work. Keeping those layers apart prevents a compelling face from turning three disagreements into one drama of “reason versus religion.”',
    ],
    paragraphSourceIds: [['john-xxii-portrait'], ['eckhart-sep', 'ockham-sep'], ['medieval-political-sep', 'eckhart-sep']],
    sources: [
      collection('john-xxii-portrait', 'Wikimedia Commons / Pinacoteca Ambrosiana — Giuseppe Franchi, Portrait of Pope John XXII', 'https://commons.wikimedia.org/wiki/File:Portrait_of_Pope_John_XXII_Dueze_(by_Giuseppe_Franchi)_%E2%80%93_Pinacoteca_Ambrosiana.jpg'),
      academic('eckhart-sep', 'Stanford Encyclopedia of Philosophy — Meister Eckhart', 'https://plato.stanford.edu/entries/meister-eckhart/'),
      academic('ockham-sep', 'Stanford Encyclopedia of Philosophy — William of Ockham, §8', 'https://plato.stanford.edu/entries/ockham/'),
      academic('medieval-political-sep', 'Stanford Encyclopedia of Philosophy archive — Medieval Political Philosophy, §§12–13', 'https://plato.stanford.edu/archives/spr2018/entries/medieval-political/'),
    ],
    visitorGuide: [
      {heading: 'Three conflicts, not one movement', items: [
        {label: 'Eckhart’s proceedings', description: 'His conditional disavowal and the later papal bull must be distinguished from a simple confession of error.', sourceIds: ['eckhart-sep']},
        {label: 'Franciscan poverty', description: 'The controversy concerned ownership, use, papal authority, heresy, and resistance rather than Eckhart’s mystical teaching.', sourceIds: ['ockham-sep']},
      ]},
      {heading: 'Office and coercion', items: [
        {label: 'Marsilius on civic peace', description: 'Defensor pacis relocates coercive legislation toward the political community within a still-Christian framework.', sourceIds: ['medieval-political-sep']},
        {label: 'A retrospective pope', description: 'Franchi’s 1613 portrait identifies later reception of John XXII, not the content of any contested document.', sourceIds: ['john-xxii-portrait']},
      ]},
    ],
    resolution: 'Resolved: corrected the installed object from Eckhart’s notarial instrument to Franchi’s 1613 pope portrait, separated three fourteenth-century conflicts, disclosed the portrait’s retrospective limits, mapped the claims, and restored factual plaque, exact Eckhart CTA, current review placeholder, and natural portrait ratio.',
    lock: 'fnv1a64:5119a953e527a38f',
  },
};

const reviewMethod = 'Galleries 10–11 supplemental review: exactly three concurrent GPT-5.6 Terra/High read-only evidence scopes of eight exhibits each were reconciled by the Sol parent across installed-object identity, attribution, dating, institution, provenance, rights, captions, alt text, claim-level sources, factual plaques, canonical relationships, routes, review locks, natural-ratio mounting, and desktop, mobile, and staged-3D presentation.';

const visualReview = (id: string): NonNullable<NonNullable<MuseumSupplementalExhibit['review']>['visualReview']> => ({
  desktop: {
    reviewedOn: '2026-08-20',
    viewport: '1440×900',
    evidence: `Direct route inspected with the full uncropped object preview, three untitled sourced paragraphs, subject-specific guide, factual plaque relationship, complete article CTA, and no horizontal overflow. Evidence: docs/visual-validation/gallery-10-supplementals/desktop/${id}.png`,
  },
  mobile: {
    reviewedOn: '2026-08-20',
    viewport: '390×844',
    evidence: `Direct route inspected with wrapped factual title, full aspect-safe object preview, scrollable interpretation, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-10-supplementals/mobile/${id}.png`,
  },
  threeDimensional: {
    reviewedOn: '2026-08-20',
    viewport: '1280×720 fresh direct-route session',
    evidence: `Fresh direct-route session inspected after closing the detail view: authored viewpoint, factual two-level plaque, distinct installation, working visit controls, and natural-ratio media mount. Evidence: docs/visual-validation/gallery-10-supplementals/staged-3d/${id}.png`,
  },
});

export const reviewLatinScholasticSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery 10 review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery 10 presentation for ${input.id}.`);
  return {
    ...input,
    ...reviewed.overrides,
    sections: reviewed.paragraphs.map((paragraph, index) => ({
      heading: '',
      paragraphs: [paragraph],
      sourceIds: reviewed.paragraphSourceIds[index],
    })),
    sources: reviewed.sources,
    visitorGuide: reviewed.visitorGuide,
    objectInterpretation: reviewed.objectInterpretation,
    presentation: {
      ...input.presentation,
      panelKicker: 'Gallery 10 supplemental exhibit',
      proximityKicker: reviewed.plaqueTitle,
      articleActionLabel: `Read the full sourced ${reviewed.articleTitle} article`,
      exhibitLayout: 'object-led',
    },
    wallPlaque: {
      type: reviewed.plaqueType,
      title: reviewed.plaqueTitle,
      invitation: reviewed.invitation,
      canonicalContexts: reviewed.canonicalContexts,
    },
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-20',
      method: reviewMethod,
      resolution: reviewed.resolution,
      lock: reviewed.lock,
      visualReview: visualReview(input.id),
    },
  };
};
