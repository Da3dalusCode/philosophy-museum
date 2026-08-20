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
  panelKicker?: string;
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

const evidence: Record<string, ReviewEvidence> = {
  'islamic-ishaq-euclid-arabic': {
    plaqueTitle: 'Illustrated Opening of Ishaq ibn Hunayn’s Arabic Euclid',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'branch', id: 'islamic-philosophy'}],
    articleTitle: 'Islamic Philosophy',
    invitation: 'This probably 1270 Baghdad copy coordinates Arabic prose, geometric diagrams, and ornament, showing how proof survives through translation and copying while Islamic Philosophy supplies the wider history of demonstration.',
    objectInterpretation: 'Chester Beatty Library Ar 3035, folios 105b–106a, is an Arabic Euclid attributed to Ishaq ibn Hunayn and copied in Baghdad probably in AH 669/1270. It is a later transmission witness, not Ishaq’s autograph, and its opening cannot by itself reconstruct the ninth-century translation process.',
    paragraphs: [
      'The installed opening spreads Arabic text and geometric diagrams across two richly framed pages. Its collection record identifies Chester Beatty Library Ar 3035, folios 105b–106a, an Arabic Euclid attributed to Ishaq ibn Hunayn and probably copied in Baghdad in 1270. Blue, gold, and red ornament mark the manuscript’s prestige, but the figures and prose remain working parts of a proof. The object was made centuries after Ishaq and cannot establish his handwriting, the exact exemplar he translated, or every intervention between translation and this copy. It can establish that readers continued to coordinate verbal propositions with lettered figures in a later Arabic scholarly setting.',
      'Geometry matters philosophically because a demonstration must preserve more than a conclusion. Definitions, constructions, and inferential steps depend on the relation between words and a diagram; a copyist who displaces a label or line can change what a reader is able to prove. Arabic translators and mathematicians did not merely warehouse a Greek text. They compared versions, stabilized technical terms, commented on difficult steps, and used geometry within astronomy, optics, and debates about scientific knowledge. The manuscript opening makes that disciplined coordination visible without implying that every natural or metaphysical question could be proved in precisely the same way as a Euclidean proposition.',
      'The linked Islamic Philosophy article provides the broader account of translation, falsafa, classification, and demonstration that no single folio can carry. This object adds a bounded material question: what must remain stable when an argument crosses language, script, diagram, copy, and classroom? Its beauty should not be mistaken for evidence that the book was merely ceremonial, while signs of use should not become an invented biography of one owner. The source record leaves the copyist unnamed and does not recover every stage of provenance. Treating those limits openly preserves the difference between a securely identified later witness and an unsupported story about Ishaq’s workshop.',
    ],
    paragraphSourceIds: [['euclid-commons'], ['euclid-commons', 'greek-arabic-sep'], ['euclid-commons', 'greek-arabic-sep']],
    sources: [
      collection('euclid-commons', 'Wikimedia Commons / Chester Beatty Library — Arabic Euclid, Ar 3035, fols. 105b–106a', 'https://commons.wikimedia.org/wiki/File:Illustrated_Opening._Arabic_Translation_of_Euclid%27s_Elementa_(CBL_Ar_3035,_ff.105b-106a).jpg'),
      academic('greek-arabic-sep', 'Stanford Encyclopedia of Philosophy — Greek Sources in Arabic and Islamic Philosophy', 'https://plato.stanford.edu/entries/arabic-islamic-greek/'),
    ],
    visitorGuide: [
      {heading: 'Following words and figures', items: [
        {label: 'Two channels of proof', description: 'The prose and lettered diagram must remain coordinated; neither is merely decorative.', sourceIds: ['euclid-commons']},
        {label: 'A later copy', description: 'The probably 1270 manuscript is not Ishaq’s autograph or a direct record of ninth-century translation.', sourceIds: ['euclid-commons']},
      ]},
      {heading: 'Demonstration in context', items: [
        {label: 'Translated vocabulary', description: 'Arabic mathematical terminology supported new teaching, commentary, and applications rather than passive storage.', sourceIds: ['greek-arabic-sep']},
        {label: 'Qualified model', description: 'Geometric necessity influenced accounts of demonstration without making every science identical to geometry.', sourceIds: ['greek-arabic-sep']},
      ]},
    ],
    resolution: 'Resolved: verified the Chester Beatty shelfmark, folios, probable Baghdad date, public-domain source, and natural proportions; separated the later copy from Ishaq’s hand; mapped proof and transmission claims; and linked the current Islamic Philosophy article.',
    lock: 'fnv1a64:30f2ddb989b1bea1',
  },
  'avicenna-metaphysics-necessity': {
    plaqueTitle: 'Ḥikmat al-ʿAlāʾī Lithograph',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'avicenna'}],
    articleTitle: 'Ibn Sina / Avicenna',
    invitation: 'This 1891 Persian lithograph transmits selections from Avicenna’s Dānishnāma-yi ʿAlāʾī, while his article explains why essence, existence, possibility, and necessity form an interdependent metaphysical argument.',
    objectInterpretation: 'McGill’s catalogue identifies this Persian Ḥikmat al-ʿAlāʾī as an 1891 lithograph associated with Sayyid Asadullah and containing selections from Avicenna’s Dānishnāma-yi ʿAlāʾī. It is neither an undated manuscript nor an autograph, and the selected page cannot stand for the complete work.',
    overrides: {
      dateLabel: 'Avicennian Dānishnāma selections · Persian lithograph, 1891',
      workLabel: 'AVICENNA · METAPHYSICS AND PRINTED RECEPTION',
    },
    paragraphs: [
      'The installed page belongs to an 1891 Persian lithograph, not to an undated handwritten codex. McGill University Library catalogues Ḥikmat al-ʿAlāʾī in its Blacker-Wood collection under the name Sayyid Asadullah and describes it as selections from Avicenna’s Dānishnāma-yi ʿAlāʾī. Dense Persian text and the regularity of lithographic reproduction make a late material afterlife visible: Avicennian philosophy entered a nineteenth-century print economy while retaining a manuscript-like page. The object cannot recover Avicenna’s hand, prove how the selections were compiled, or show the whole Dānishnāma. Its secure date corrects the earlier, misleading label of a vaguely “later manuscript.”',
      'Avicenna distinguishes what a thing is from the fact that it exists. A horse, triangle, or human essence considered in itself does not include actuality; a possible existent therefore needs a cause when it is made actual. His modal analysis leads toward the Necessary Existent, which is not merely the first item in a temporal chain or another contingent being with an added property of existence. These distinctions operate within a larger system of logic, natural philosophy, psychology, and metaphysics. Later essence-existence vocabularies were profoundly shaped by Avicenna, but their terms and conclusions cannot simply be read back into his Persian or Arabic works without historical care.',
      'The linked Ibn Sina / Avicenna article supplies that systematic architecture and its interpretive tensions. The lithograph contributes a different philosophical lesson: selection and reproduction help determine which parts of a system later readers encounter together. It does not prove that its compiler endorsed every claim, that the page contains the decisive passage on necessity, or that nineteenth-century readers shared one interpretation. The catalogue leaves aspects of the edition’s production and use unresolved, so the exhibit names those limits instead of inventing provenance. Visitors can use the object to distinguish Avicenna’s argument from the later editorial and material forms through which it continued to circulate.',
    ],
    paragraphSourceIds: [['hikmat-mcgill'], ['avicenna-metaphysics-sep'], ['hikmat-mcgill', 'avicenna-metaphysics-sep']],
    sources: [
      collection('hikmat-mcgill', 'Internet Archive / McGill Library — Ḥikmat al-ʿAlāʾī, 1891', 'https://archive.org/details/McGillLibrary-rbsc_bw_asadullah_bwlw7-16937'),
      academic('avicenna-metaphysics-sep', 'Stanford Encyclopedia of Philosophy — Ibn Sina’s Metaphysics', 'https://plato.stanford.edu/entries/ibn-sina-metaphysics/'),
    ],
    visitorGuide: [
      {heading: 'Identifying the edition', items: [
        {label: 'Lithograph, 1891', description: 'McGill catalogues the object as a dated Persian lithograph rather than an undated manuscript.', sourceIds: ['hikmat-mcgill']},
        {label: 'Selections', description: 'Ḥikmat al-ʿAlāʾī contains selections from the Dānishnāma and cannot represent every part of Avicenna’s system.', sourceIds: ['hikmat-mcgill']},
      ]},
      {heading: 'Following the metaphysics', items: [
        {label: 'Essence and actuality', description: 'What a contingent thing is does not by itself explain that it actually exists.', sourceIds: ['avicenna-metaphysics-sep']},
        {label: 'Necessary Existent', description: 'The explanatory source is not another contingent member added to the series it explains.', sourceIds: ['avicenna-metaphysics-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the object from an undated manuscript to McGill’s 1891 Persian lithograph, named its compilation relationship and associated person, qualified its scope and provenance, mapped the modal-metaphysics claims, and preserved public-domain rights and natural proportions.',
    lock: 'fnv1a64:b48de1a9158be3bb',
  },
  'avicenna-floating-person': {
    plaqueTitle: 'Later Conventional Image of Avicenna',
    plaqueType: 'concept-argument-diagram-or-method',
    canonicalContexts: [{kind: 'philosopher', id: 'avicenna'}],
    articleTitle: 'Ibn Sina / Avicenna',
    invitation: 'This undated conventional image accompanies, but does not illustrate, Avicenna’s floating-person thought experiment, which tests immediate self-awareness without making embodied life philosophically irrelevant.',
    objectInterpretation: 'The Commons record supplies no secure artist, date, original manuscript, or holding institution for this conventional image. It is retained as an explicitly unresolved reception image, not a historical likeness of Avicenna, a diagram of the floating person, or evidence for the thought experiment’s original setting.',
    paragraphs: [
      'The installed miniature shows a robed scholar seated with writing materials, but the source record does not securely identify its artist, date, original manuscript, or holding institution. Commons labels it as Avicenna through later convention. That is not enough to treat the face as a likeness from life or the setting as his workplace. Nor does the image depict a newly created person suspended without sensation. Its evidentiary value is therefore deliberately narrow: it shows how a philosopher can acquire a retrospective visual identity while leaving the object’s original provenance unresolved. The full composition remains visible so visitors can inspect what the image actually contains rather than what its reused caption once suggested.',
      'Avicenna’s floating-person scenario subtracts sensory contact and awareness of bodily parts. He asks whether such a person would still affirm their own existence, using an imagined case to distinguish immediate self-awareness from an image or description of the body. The argument does not require the subject to know what kind of entity they are, possess anatomical concepts, or conclude that bodies never matter. Avicenna’s psychology also analyzes sensation, imagination, memory, appetite, and movement as embodied powers. The thought experiment isolates one question inside that larger system: what is present to a subject in self-awareness before reflective description and sensory identification?',
      'The linked Ibn Sina / Avicenna article places the scenario beside his accounts of soul, internal senses, embodiment, and metaphysics. The conventional miniature contributes no proof to those claims, and its uncertainty must not be filled with a fabricated collection history. Instead it exposes a visitor habit worth examining: a recognizable portrait can make an abstract experiment feel biographical even when the historical connection is absent. Reading image and argument separately preserves the real interpretive dispute over what the floating person establishes. It also prevents a vivid thought experiment from becoming the slogan that Avicenna viewed bodily life as irrelevant or that self-awareness alone settles the soul’s complete nature.',
    ],
    paragraphSourceIds: [['avicenna-miniature-commons'], ['avicenna-mind-sep'], ['avicenna-miniature-commons', 'avicenna-mind-sep']],
    sources: [
      collection('avicenna-miniature-commons', 'Wikimedia Commons — later conventional miniature of Avicenna', 'https://commons.wikimedia.org/wiki/File:Avicenna-miniatur.jpg'),
      academic('avicenna-mind-sep', 'Stanford Encyclopedia of Philosophy — Ibn Sina’s Psychology', 'https://plato.stanford.edu/entries/ibn-sina-mind/'),
    ],
    visitorGuide: [
      {heading: 'Reading the image limit', items: [
        {label: 'Unknown origin', description: 'The supplied record does not secure the artist, date, manuscript context, or original holding.', sourceIds: ['avicenna-miniature-commons']},
        {label: 'No diagram', description: 'The seated writer is not a visual rendering of the suspended, sensationless person.', sourceIds: ['avicenna-miniature-commons', 'avicenna-mind-sep']},
      ]},
      {heading: 'Testing self-awareness', items: [
        {label: 'Immediate affirmation', description: 'The scenario asks whether awareness of existing remains without sensory awareness of bodily parts.', sourceIds: ['avicenna-mind-sep']},
        {label: 'Embodiment returns', description: 'Avicenna’s broader psychology still gives sensation, imagination, appetite, and movement central explanatory roles.', sourceIds: ['avicenna-mind-sep']},
      ]},
    ],
    resolution: 'Resolved: retained the conventional image only with explicit unknown artist, date, manuscript, and holding limits; separated it from the thought experiment; mapped the psychology claims; preserved public-domain attribution and natural ratio; and linked the current Avicenna article.',
    lock: 'fnv1a64:7d7815efa427dc23',
  },
  'avicenna-pointers-commentary': {
    plaqueTitle: 'Maragheh Observatory and al-Tusi’s Avicennian World',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'avicenna'}],
    articleTitle: 'Ibn Sina / Avicenna',
    invitation: 'This modern photograph of Maragheh Observatory locates al-Tusi’s post-Avicennian scholarship institutionally, without pretending to show the Pointers commentary, its place of composition, or Avicenna’s own world.',
    objectInterpretation: 'Behrad09’s 2018 CC BY-SA photograph shows archaeological remains of Maragheh Observatory beneath a modern protective shelter. The site anchors Nasir al-Din al-Tusi’s organized scholarly context, but it is not the manuscript previously named by this slot and does not prove that his commentary on Avicenna was composed there.',
    overrides: {
      displayName: 'Maragheh Observatory and al-Tusi’s Avicennian Commentary',
      shortTitle: 'Maragheh Observatory and al-Tusi',
      workLabel: 'POST-AVICENNIAN COMMENTARY · INSTITUTIONAL CONTEXT',
      dateLabel: 'Thirteenth-century observatory site · photographed 2018 beneath a modern shelter',
      question: 'How do institutions and commentaries turn a compressed philosophical text into a continuing argument?',
    },
    paragraphs: [
      'The installed landscape photograph is not a page of Nasir al-Din al-Tusi’s commentary. Behrad09 photographed the archaeological remains of Maragheh Observatory in 2018 and released the image under CC BY-SA 4.0. Earth-colored foundations sit beneath a modern geodesic shelter, so the photograph records both a thirteenth-century institutional site and contemporary conservation. Maragheh is associated with al-Tusi’s organized scholarly work, but neither the image nor its collection record proves that he composed Ḥall mushkilāt al-Ishārāt wa-al-tanbīhāt at this spot. It cannot identify a particular room, recover an original observatory unchanged, or turn architecture into evidence for one interpretation of Avicenna.',
      'Avicenna’s Pointers and Reminders is compressed and deliberately demanding. Later readers reconstructed omitted steps, clarified terminology, raised objections, and argued over logic, metaphysics, psychology, and mystical passages. Al-Tusi’s sympathetic commentary became an intervention rather than a neutral repetition: choosing which difficulty needs resolution and which objection deserves an answer changes the debate’s shape. A separate McGill manuscript record documents a later copy of that commentary, while the installed photograph supplies institutional context. Keeping those objects distinct prevents an observatory photograph from masquerading as textual evidence and keeps post-Avicennian philosophy visible as both argumentative and socially organized work.',
      'The linked Ibn Sina / Avicenna article provides the canonical account of the Pointers within Avicenna’s system; this exhibit shows why an author’s system does not end at death. Commentators, patrons, collections, teachers, and scientific institutions created new settings in which difficult claims could be defended or transformed. Maragheh should not become a universal symbol for every post-Avicennian school, and al-Tusi’s defense should not automatically replace Avicenna’s own wording. The exact history of the visible remains and the commentary’s composition remain separate questions. That disclosed limit is philosophically useful: it makes visitors ask what a place can establish, what a manuscript can establish, and where interpretation must rely on sourced argument.',
    ],
    paragraphSourceIds: [['maragheh-commons'], ['tusi-commentary-mcgill', 'avicenna-sep'], ['maragheh-commons', 'tusi-commentary-mcgill', 'avicenna-sep']],
    sources: [
      collection('maragheh-commons', 'Wikimedia Commons — Maragheh Observatory photograph', 'https://commons.wikimedia.org/wiki/File:Rasadmaraqe1.jpg'),
      collection('tusi-commentary-mcgill', 'Internet Archive / McGill Library — al-Tusi, Ḥall mushkilāt al-Ishārāt wa-al-tanbīhāt', 'https://archive.org/details/McGillLibrary-rbsc_islam-ms-isl-0029-18293'),
      academic('avicenna-sep', 'Stanford Encyclopedia of Philosophy — Ibn Sina', 'https://plato.stanford.edu/entries/ibn-sina/'),
    ],
    visitorGuide: [
      {heading: 'Separating site and text', items: [
        {label: 'Modern photograph', description: 'The 2018 image shows protected archaeological remains, not a medieval scholarly session.', sourceIds: ['maragheh-commons']},
        {label: 'Separate manuscript witness', description: 'McGill’s record documents a later copy of al-Tusi’s commentary; it is not the installed image.', sourceIds: ['tusi-commentary-mcgill']},
      ]},
      {heading: 'Commentary as philosophy', items: [
        {label: 'Compressed source', description: 'Avicenna’s Pointers requires trained reconstruction across logic, metaphysics, and psychology.', sourceIds: ['avicenna-sep']},
        {label: 'Sympathetic intervention', description: 'A defense still reshapes a debate by choosing difficulties, objections, and proposed resolutions.', sourceIds: ['tusi-commentary-mcgill', 'avicenna-sep']},
      ]},
    ],
    resolution: 'Resolved: reconciled the slot to the installed 2018 Maragheh photograph, preserved its licensed provenance and modern shelter, separated site from commentary manuscript and place of composition, mapped post-Avicennian claims, and restored a factual plaque and canonical CTA.',
    lock: 'fnv1a64:527aad188ba9ae04',
  },
  'avicenna-medicine-heart': {
    plaqueTitle: 'Doctor Taking a Woman’s Pulse',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'avicenna'}],
    articleTitle: 'Ibn Sina / Avicenna',
    invitation: 'This lacquer painting from a 1632 Canon manuscript stages pulse-taking as embodied medical practice, while Avicenna’s article distinguishes that later scene from his psychology and Medicines of the Heart.',
    objectInterpretation: 'Wellcome Collection L0000009 is a lacquer-painted binding-board scene from Arabic MS 155, a 1632 manuscript of Avicenna’s Canon, showing a doctor taking a woman’s pulse. It is not a page of Rules about Medicines of the Heart, a portrait of Avicenna, or present medical guidance.',
    overrides: {
      displayName: 'Doctor Taking a Woman’s Pulse in a 1632 Canon Manuscript',
      shortTitle: 'Pulse-Taking in Avicenna’s Canon',
      workLabel: 'AVICENNA · CANON RECEPTION, MEDICINE, AND EMBODIED PSYCHOLOGY',
      dateLabel: 'Lacquer binding-board painting from a 1632 Canon manuscript',
    },
    paragraphs: [
      'A seated doctor reaches toward a woman’s wrist while attendants watch in this lacquer-painted scene. Wellcome identifies it as L0000009, from a binding board associated with Arabic MS 155, a 1632 manuscript of Avicenna’s Canon. The artist is unrecorded, and the image was made more than six centuries after Avicenna. It does not show his appearance, a patient he treated, or a page from Rules about Medicines of the Heart. The CC BY 4.0 object is valuable precisely as a later reception image: it gives bodily observation, gendered care, material luxury, and the social staging of medicine a visible form while remaining separate from authorial evidence.',
      'Avicenna’s medical and philosophical systems connect bodily signs with accounts of perception, appetite, imagination, motion, temperament, and affect. Pulse-taking can therefore open a historically bounded question about how embodied condition and psychic life were related, but the painted scene cannot demonstrate a diagnostic rule or map directly onto modern cardiology or psychiatry. The Canon and Medicines of the Heart are distinct works, and terms such as heart, spirit, faculty, and temperament belong to a historical explanatory vocabulary. Accurate comparison asks what those categories did within an ordered natural philosophy before deciding where they resemble or differ from current biomedical concepts.',
      'The linked Ibn Sina / Avicenna article supplies the broader psychology, natural philosophy, and metaphysics that the image cannot establish. This later painting matters because philosophy encounters vulnerable bodies through practices of observation and care, not only through abstract thought experiments. At the same time, it must not be offered as treatment advice or as proof that one pictured consultation was typical. The object record does not identify the painter or the exact relationship between this binding image and every text in the codex. Naming those limits preserves the real connection: Avicennian ideas continued to be copied, visualized, and situated in medical worlds long after their composition.',
    ],
    paragraphSourceIds: [['canon-pulse-wellcome', 'canon-pulse-commons'], ['avicenna-mind-sep', 'avicenna-natural-sep'], ['canon-pulse-wellcome', 'avicenna-mind-sep', 'avicenna-natural-sep']],
    sources: [
      collection('canon-pulse-wellcome', 'Wellcome Collection — Doctor taking a woman’s pulse, L0000009', 'https://wellcomecollection.org/works/mwhd97dv'),
      collection('canon-pulse-commons', 'Wikimedia Commons — Doctor taking a woman’s pulse from Avicenna’s Canon', 'https://commons.wikimedia.org/wiki/File:Doctor_taking_woman%27s_pulse._Avicenna%27s_Canon_manuscript_Wellcome_L0000009.jpg'),
      academic('avicenna-mind-sep', 'Stanford Encyclopedia of Philosophy — Ibn Sina’s Psychology', 'https://plato.stanford.edu/entries/ibn-sina-mind/'),
      academic('avicenna-natural-sep', 'Stanford Encyclopedia of Philosophy — Ibn Sina’s Natural Philosophy', 'https://plato.stanford.edu/entries/ibn-sina-natural/'),
    ],
    visitorGuide: [
      {heading: 'Reading the medical scene', items: [
        {label: 'Canon reception', description: 'The 1632 lacquer image belongs to a later Canon manuscript, not Medicines of the Heart.', sourceIds: ['canon-pulse-wellcome', 'canon-pulse-commons']},
        {label: 'No clinical record', description: 'The painting stages pulse-taking but does not document Avicenna, a named patient, or a modern treatment.', sourceIds: ['canon-pulse-wellcome']},
      ]},
      {heading: 'Embodied explanation', items: [
        {label: 'Psychic powers', description: 'Perception, imagination, appetite, and motion link the soul’s operations to embodied life.', sourceIds: ['avicenna-mind-sep']},
        {label: 'Historical categories', description: 'Heart, spirit, temperament, and faculty require explanation before comparison with present medicine.', sourceIds: ['avicenna-natural-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the object from a Medicines of the Heart manuscript page to Wellcome’s 1632 Canon binding image, verified its CC BY rights and object record, separated artwork from diagnosis and authorial evidence, mapped embodied-psychology claims, and preserved natural proportions.',
    lock: 'fnv1a64:3220d7be02c82668',
  },
  'avicenna-hebrew-canon-transmission': {
    plaqueTitle: 'Hebrew Manuscript of Avicenna’s Canon',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'avicenna'}],
    articleTitle: 'Ibn Sina / Avicenna',
    invitation: 'This 1276–1325 Hebrew witness makes the Canon’s Mediterranean afterlife visible, while Avicenna’s article keeps translation, authorship, medicine, and distinct scholarly communities from collapsing into one story.',
    objectInterpretation: 'Bodleian MS Canon. Or. 50, folio 9v, is a Hebrew witness to Books I and V of Avicenna’s Canon, catalogued to 1276–1325. It records later reception rather than Avicenna’s hand or Arabic wording; the available record does not securely name this leaf’s translator or copyist.',
    paragraphs: [
      'Dense Hebrew writing, red rubrication, and a compact diagram share the installed folio. The Oxford/Biblissima record identifies Bodleian MS Canon. Or. 50 as a Hebrew manuscript of Books I and V of Avicenna’s Canon, dated 1276–1325. It is a later material witness, not Avicenna’s autograph, original Arabic text, or an authorial diagram. The collection information does not securely identify this leaf’s translator or copyist. Its digitization also carries an institutional CC BY-NC statement that is more restrictive than the Commons upload label; the exhibit records that discrepancy rather than silently choosing the more permissive claim.',
      'Translation creates a technical reading world rather than substituting words mechanically. Medical terms, classifications, diagrams, and causal relations must be rendered for readers whose language and curricular setting differ from the Arabic original. The Hebrew Canon therefore shows interaction among Islamic and Jewish learned communities without making them interchangeable or treating one as a footnote to the other. Its circulation can also differ from that of Avicenna’s metaphysical works: an encyclopedia used in medical study follows institutions, practical needs, and commentarial habits of its own. The page is evidence that such transmission occurred, not proof that every concept or practice remained unchanged.',
      'The linked Ibn Sina / Avicenna article supplies the system of medicine, natural philosophy, psychology, and metaphysics against which this afterlife becomes meaningful. The object asks why translation can both extend a work and transform its available vocabulary. It cannot establish how every Hebrew reader interpreted the Canon, who drew the visible figure, or what institutional use this exact folio received. Those unresolved points belong in the label. By distinguishing author, translator, copyist, diagram, later owner, and digitizer, the exhibit makes reception intellectually specific and keeps cross-cultural exchange from becoming a vague story of frictionless influence.',
    ],
    paragraphSourceIds: [['canon-biblissima'], ['canon-biblissima', 'avicenna-sep'], ['canon-biblissima', 'avicenna-sep']],
    sources: [
      collection('canon-biblissima', 'Oxford / Biblissima — Bodleian MS Canon. Or. 50', 'https://iiif.biblissima.fr/collections/manifest/c31f0778c5cd75e63b1d7f5cd72221b8927eb9a5'),
      academic('avicenna-sep', 'Stanford Encyclopedia of Philosophy — Ibn Sina', 'https://plato.stanford.edu/entries/ibn-sina/'),
    ],
    visitorGuide: [
      {heading: 'What the folio establishes', items: [
        {label: 'Dated witness', description: 'The manuscript transmits Books I and V in Hebrew and is catalogued to 1276–1325.', sourceIds: ['canon-biblissima']},
        {label: 'Not an autograph', description: 'The page does not preserve Avicenna’s hand, original Arabic wording, or a securely named translator.', sourceIds: ['canon-biblissima']},
      ]},
      {heading: 'Translation as inquiry', items: [
        {label: 'Technical vocabulary', description: 'Translators make choices about terms, classifications, and relations for new readers.', sourceIds: ['canon-biblissima', 'avicenna-sep']},
        {label: 'Distinct communities', description: 'Shared circulation connects Islamic and Jewish learned worlds without erasing their differences.', sourceIds: ['canon-biblissima', 'avicenna-sep']},
      ]},
    ],
    resolution: 'Resolved: verified the Bodleian witness, books, dating, collection, and rights discrepancy; separated author, translator, copyist, and diagram; mapped transmission claims; preserved natural proportions; and added the exact Avicenna CTA.',
    lock: 'fnv1a64:f08d5d275ef08758',
  },
  'al-ghazali-incoherence-philosophers': {
    plaqueTitle: 'The Incoherence of the Philosophers',
    plaqueType: 'work-or-text',
    canonicalContexts: [{kind: 'philosopher', id: 'al-ghazali'}],
    articleTitle: 'Al-Ghazali',
    invitation: 'This 1884–85 printed edition frames al-Ghazali’s testing of philosophical demonstrations, especially claims about necessity, without turning selective critique into a rejection of reasoning itself.',
    objectInterpretation: 'The installed object is a digitized ninety-two-page printed edition dated 1884–85 and associated in its source metadata with Bibliotheca Alexandrina. It is not a medieval manuscript, al-Ghazali’s autograph, or direct evidence for an eleventh-century debate.',
    paragraphs: [
      'The displayed opening is not a medieval manuscript. Its Commons and World Digital Library metadata identify a ninety-two-page printed Arabic edition dated 1884–85 and associated with Bibliotheca Alexandrina. Red section markers, black prose, and dense notes give a later material form to al-Ghazali’s Tahāfut al-falāsifa. They cannot show his handwriting, establish an original reading, or transport visitors directly into an eleventh-century controversy. The object instead documents a printed afterlife: a disputed work continued to be edited, reproduced, catalogued, and read. Correctly dating it matters because a modern printed witness and a medieval manuscript imply different production, circulation, and evidentiary histories.',
      'In the Incoherence, al-Ghazali examines twenty positions associated especially with Avicenna and al-Farabi. He asks whether their conclusions follow with the necessity defenders claim and whether they conflict with theological commitments. The famous fire-and-cotton discussion tests what observation and demonstration establish about causal connection and divine action; it does not reduce neatly to the slogan that causes are unreal. The philosophical importance is methodological as well as theological: reconstruct an opponent accurately, distinguish compatibility from proof, and identify where a purported demonstration relies on assumptions it has not secured. Selective criticism of the falāsifa is not a blanket rejection of logic, mathematics, medicine, or rational inquiry.',
      'The linked Al-Ghazali article supplies the broader account of his theology, philosophical borrowing, ethics, and later reception. Averroes answered in the Incoherence of the Incoherence, while later theologians and philosophers continued to use and transform Avicennian tools. This printed edition cannot decide those disputes or measure one final “effect” on Islamic philosophy. It can prompt visitors to treat critique as a continuing argumentative practice rather than an ending. Its publisher and some details of production remain unidentified in the registered source, so the exhibit states that limit instead of inventing provenance. The work’s afterlife is real even when this particular object cannot recover its earliest form.',
    ],
    paragraphSourceIds: [['incoherence-commons'], ['ghazali-sep', 'causation-sep'], ['incoherence-commons', 'ghazali-sep', 'causation-sep']],
    sources: [
      collection('incoherence-commons', 'Wikimedia Commons / World Digital Library — 1884–85 Incoherence edition', 'https://commons.wikimedia.org/wiki/File:The_Incoherence_of_Philosophers_WDL7456.pdf'),
      academic('ghazali-sep', 'Stanford Encyclopedia of Philosophy — Al-Ghazali', 'https://plato.stanford.edu/entries/al-ghazali/'),
      academic('causation-sep', 'Stanford Encyclopedia of Philosophy — Causation in Arabic and Islamic Thought', 'https://plato.stanford.edu/entries/arabic-islamic-causation/'),
    ],
    visitorGuide: [
      {heading: 'Reading the edition', items: [
        {label: 'Printed, 1884–85', description: 'The digitized object is a later printed edition, not an autograph or medieval manuscript.', sourceIds: ['incoherence-commons']},
        {label: 'Twenty discussions', description: 'The work tests defined philosophical positions rather than rejecting every field of rational inquiry.', sourceIds: ['ghazali-sep']},
      ]},
      {heading: 'Causation under pressure', items: [
        {label: 'Necessary connection', description: 'The burning example asks what evidence and argument establish about causal necessity and divine action.', sourceIds: ['ghazali-sep', 'causation-sep']},
        {label: 'Continuing dispute', description: 'Averroes and later thinkers contested and transformed the debate rather than simply abandoning philosophy.', sourceIds: ['ghazali-sep', 'causation-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the object from manuscript to its documented 1884–85 printed edition, qualified its production history, replaced slogan-level causation claims with mapped interpretation, preserved public-domain provenance and natural ratio, and linked the current Al-Ghazali article.',
    lock: 'fnv1a64:4dec95306bda8f30',
  },
  'al-ghazali-revival-sciences': {
    plaqueTitle: 'Haruniyeh Mausoleum at Tus',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'al-ghazali'}],
    articleTitle: 'Al-Ghazali',
    invitation: 'This modern photograph locates al-Ghazali in Tus’s later memorial landscape, while the full article explains the Revival’s ethical program without making disputed architecture evidence for authorship or doctrine.',
    objectInterpretation: 'Ahmad Masoominezhad’s 2009 CC BY-SA photograph shows Haruniyeh Mausoleum at Tus, Iranian monument 173. Its original function and direct relation to al-Ghazali remain disputed; it is a later memorial setting, not a manuscript of the Revival, a classroom, or proof of where the work was composed.',
    overrides: {
      displayName: 'Haruniyeh at Tus and al-Ghazali’s Memorial Landscape',
      shortTitle: 'Haruniyeh at Tus',
      workLabel: 'AL-GHAZALI · MEMORIAL LANDSCAPE AND THE REVIVAL',
      dateLabel: 'Haruniyeh Mausoleum at Tus · photographed 2009; historical function disputed',
    },
    paragraphs: [
      'The installed photograph shows the monumental brick facade and recessed entrance of Haruniyeh at Tus. Ahmad Masoominezhad made the image on 17 April 2009 and released it under CC BY-SA 4.0; the site is registered as Iranian monument 173. It is not the manuscript formerly named by this slot. The building’s original function and its direct relationship to al-Ghazali are disputed, so it cannot establish a tomb, teaching room, place of composition, or untouched medieval fabric. Its responsible role is memorial geography: a later site near Tus through which visitors can encounter how al-Ghazali has been placed and remembered, while recognizing that architecture does not authenticate a text.',
      'The Revival of the Religious Sciences organizes forty books around ritual practices, social customs, destructive dispositions, and saving dispositions. Its ethical project joins knowledge to intention, habituation, character, worship, self-scrutiny, and responsibility before God. That structure makes formation more than the possession of correct information: learning must become effective in action and transform desire. The work is neither generic self-help detached from Islamic law and eschatology nor evidence that al-Ghazali abandoned argument after criticizing selected philosophical claims. Its philosophical force lies in asking what kind of person can make knowledge truthful in conduct and how social rewards can turn learning into vanity or display.',
      'The linked Al-Ghazali article supplies the theological, jurisprudential, Sufi, and philosophical setting that the photograph cannot show. Haruniyeh matters by directing attention to place, memory, and the institutions that preserve a thinker’s afterlife, not by proving a doctrine. Visitors should keep the Revival’s textual argument separate from claims about this building and from legends generated by later commemoration. The unresolved historical function is not a gap to be filled by atmosphere. It is part of the exhibit’s lesson: responsible interpretation distinguishes what an object shows, what scholarship supports, and what remains unknown while still asking how ethical practices and memorial landscapes shape the reception of philosophy.',
    ],
    paragraphSourceIds: [['haruniyeh-commons'], ['ghazali-sep', 'mysticism-sep'], ['haruniyeh-commons', 'ghazali-sep', 'mysticism-sep']],
    sources: [
      collection('haruniyeh-commons', 'Wikimedia Commons — Haruniyeh Mausoleum at Tus', 'https://commons.wikimedia.org/wiki/File:Harouniyeh.jpg'),
      academic('ghazali-sep', 'Stanford Encyclopedia of Philosophy — Al-Ghazali', 'https://plato.stanford.edu/entries/al-ghazali/'),
      academic('mysticism-sep', 'Stanford Encyclopedia of Philosophy — Mysticism in Arabic and Islamic Philosophy', 'https://plato.stanford.edu/entries/arabic-islamic-mysticism/'),
    ],
    visitorGuide: [
      {heading: 'Reading Haruniyeh', items: [
        {label: 'Modern photograph', description: 'The installed image records the Tus monument in 2009, not a medieval event or manuscript.', sourceIds: ['haruniyeh-commons']},
        {label: 'Disputed relation', description: 'The building’s original function and direct connection to al-Ghazali remain unresolved.', sourceIds: ['haruniyeh-commons']},
      ]},
      {heading: 'The Revival’s ethical project', items: [
        {label: 'Forty-book structure', description: 'Practices, customs, destructive traits, and saving traits organize an account of lived formation.', sourceIds: ['ghazali-sep']},
        {label: 'Knowledge in conduct', description: 'Learning is tested through intention, character, disciplined action, and devotional responsibility.', sourceIds: ['ghazali-sep', 'mysticism-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the slot from a supposed Revival manuscript to the installed 2009 Haruniyeh photograph, disclosed the site’s disputed function and relation, mapped the Revival’s ethical claims, preserved CC BY-SA rights and natural proportions, and linked Al-Ghazali.',
    lock: 'fnv1a64:b2c880e6989283ee',
  },
  'al-ghazali-aims-philosophers': {
    plaqueTitle: 'Hermes Debates with Seventy Greek Scholars',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'al-ghazali'}],
    articleTitle: 'Al-Ghazali',
    invitation: 'This 1517–18 Persian painting imagines Greek debate within a later Islamic literary world; al-Ghazali’s article explains the Aims’ reconstruction of philosophy without pretending the image depicts that work.',
    objectInterpretation: 'Walters Art Museum W.606.333B is Muhammad Musá al-Mudhahhib’s 1517–18 painting Hermes Debates with Seventy Greek Scholars. It is not a 1913 title page of al-Ghazali’s Aims, does not depict al-Ghazali, and offers contextual reception rather than documentary evidence for his reconstruction of the falāsifa.',
    overrides: {
      displayName: 'Hermes Debates with Seventy Greek Scholars',
      shortTitle: 'Hermes and Seventy Greek Scholars',
      workLabel: 'AL-GHAZALI · LATER RECEPTION CONTEXT FOR THE AIMS',
      dateLabel: 'Muhammad Musá al-Mudhahhib · 1517–18 · Walters W.606.333B',
      question: 'Why must criticism first reconstruct the disciplines and arguments it intends to judge?',
    },
    paragraphs: [
      'A haloed Hermes sits amid a broad semicircle of scholars in the installed Persian painting. The Walters Art Museum identifies W.606.333B as Muhammad Musá al-Mudhahhib’s 1517–18 work Hermes Debates with Seventy Greek Scholars, made with ink and pigments on paper. Henry Walters acquired the leaf and bequeathed it to the museum in 1931; the image is public domain. It is not the Aims of the Philosophers title page once named by this slot, a portrait of al-Ghazali, or an illustration of a recorded discussion. Its responsible use is later literary reception: Greek authority and disputation are imagined within an early-sixteenth-century Persian manuscript world.',
      'Al-Ghazali’s Aims of the Philosophers reconstructs logic, natural philosophy, and metaphysics associated with the falāsifa, drawing substantially on Avicennian materials. The work matters because criticism requires knowing what an opponent claims and how the parts of a system fit together. That does not make the Aims a neutral modern textbook or prove a simple chronology in which it was merely a first draft for the Incoherence. Readers must distinguish exposition, appropriation, and criticism, as well as the later Latin reception in which the work could circulate without the intended critical frame. The painting’s debate scene can prompt that methodological issue, but it cannot supply the Aims’ actual arguments.',
      'The linked Al-Ghazali article explains why his engagement with philosophy combines selective use, theological pressure, and ethical-religious aims. The Walters leaf contributes a separate question about how later cultures pictured the authority of Greek sages. It cannot prove that al-Ghazali endorsed a Hermetic genealogy, that the painted figures represent a historical event, or that sixteenth-century viewers read the Aims in one way. Its secure maker, date, museum, and provenance make the object strong; its indirect philosophical relation must remain equally explicit. Visitors can therefore compare an imagined community of debate with the disciplined work of reconstructing arguments before judging them.',
    ],
    paragraphSourceIds: [['hermes-walters'], ['ghazali-sep'], ['hermes-walters', 'ghazali-sep']],
    sources: [
      collection('hermes-walters', 'Walters Art Museum — Hermes Debates with Seventy Greek Scholars, W.606.333B', 'https://art.thewalters.org/object/W.606.333B/'),
      academic('ghazali-sep', 'Stanford Encyclopedia of Philosophy — Al-Ghazali', 'https://plato.stanford.edu/entries/al-ghazali/'),
    ],
    visitorGuide: [
      {heading: 'Reading the Walters painting', items: [
        {label: 'Later Persian image', description: 'Muhammad Musá al-Mudhahhib painted the scene in 1517–18, centuries after al-Ghazali.', sourceIds: ['hermes-walters']},
        {label: 'Not the Aims', description: 'The leaf neither reproduces the work nor documents a discussion attended by al-Ghazali.', sourceIds: ['hermes-walters']},
      ]},
      {heading: 'Reconstruction before critique', items: [
        {label: 'Systematic exposition', description: 'The Aims presents philosophical disciplines and arguments that al-Ghazali would later evaluate selectively.', sourceIds: ['ghazali-sep']},
        {label: 'Reception can reframe', description: 'A work of exposition can circulate in settings that detach it from an author’s intended critical sequence.', sourceIds: ['ghazali-sep']},
      ]},
    ],
    resolution: 'Resolved: reconciled the slot to Walters W.606.333B, verified maker, date, medium, museum, Henry Walters provenance, and public-domain rights; rejected the false Aims title-page identity; mapped its contextual relation to philosophical reconstruction; and preserved natural proportions.',
    lock: 'fnv1a64:49e4c8ac2aaeb5c5',
  },
  'al-ghazali-deliverance-error': {
    plaqueTitle: 'Courtyard of the Umayyad Mosque, Damascus',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'al-ghazali'}],
    articleTitle: 'Al-Ghazali',
    invitation: 'This 2008 courtyard photograph situates Damascus in al-Ghazali’s remembered withdrawal, while his article treats Deliverance from Error as a shaped retrospective account rather than a transparent clinical diary.',
    objectInterpretation: 'Vyacheslav Argenberg photographed the Umayyad Mosque courtyard in Damascus on 15 August 2008 and licensed the image CC BY 4.0. It shows restored architecture, not a last page of Deliverance from Error, al-Ghazali’s retreat room, or an untouched eleventh-century setting.',
    overrides: {
      displayName: 'Umayyad Mosque Courtyard and Al-Ghazali’s Damascus Withdrawal',
      shortTitle: 'Umayyad Mosque Courtyard',
      workLabel: 'AL-GHAZALI · DAMASCUS, MEMORY, AND DELIVERANCE FROM ERROR',
      dateLabel: 'Umayyad Mosque, Damascus · modern photograph, 2008',
    },
    paragraphs: [
      'The installed horizontal photograph opens across the stone courtyard and arcaded facade of the Umayyad Mosque in Damascus. Vyacheslav Argenberg made it on 15 August 2008 and released it under CC BY 4.0. It is neither a manuscript page nor an image of al-Ghazali’s eleventh-century withdrawal. Restoration, continued use, and the modern camera separate the visible fabric from any precise room or moment in his life. Damascus belongs to the geography of his retreat and later self-account, but the photograph cannot prove where he stayed, what he did on a particular day, or how a medieval space looked before centuries of change.',
      'Deliverance from Error presents al-Ghazali’s crisis of authority, withdrawal from public teaching, examination of intellectual groups, and turn toward disciplined religious practice. It is philosophically important because it asks what warrants knowledge when inherited prestige, imitation, and even one’s motives have become doubtful. Yet the text is retrospective and carefully shaped, not an unedited diary, medical case history, or direct transcript of private consciousness. Its narrative orders theology, philosophy, Ismaʿili teaching, and Sufi practice for an argumentative purpose. Reading it well means asking both what the account claims and how autobiographical form gives those claims persuasive sequence.',
      'The linked Al-Ghazali article supplies the documented biography, textual setting, and relation between critique, ethics, and practice. The mosque photograph gives that history a geographical threshold without filling gaps with architectural romance. It cannot establish that withdrawal alone caused an intellectual transformation or that al-Ghazali abandoned teaching, family, texts, and institutions for a completely isolated life. Nor should the emotional force of the narrative become a modern diagnosis. The object and article instead support a precise question: how does a philosopher make a life story into evidence about knowledge, sincerity, authority, and reform while remaining answerable to the limits of retrospective memory?',
    ],
    paragraphSourceIds: [['umayyad-commons'], ['ghazali-sep'], ['umayyad-commons', 'ghazali-sep']],
    sources: [
      collection('umayyad-commons', 'Wikimedia Commons — Umayyad Mosque courtyard, Damascus', 'https://commons.wikimedia.org/wiki/File:The_Umayyad_Mosque,_Courtyard,_Damascus,_Syria.jpg'),
      academic('ghazali-sep', 'Stanford Encyclopedia of Philosophy — Al-Ghazali', 'https://plato.stanford.edu/entries/al-ghazali/'),
    ],
    visitorGuide: [
      {heading: 'Reading the Damascus setting', items: [
        {label: 'Modern view', description: 'The 2008 photograph shows a living, restored monument rather than an eleventh-century retreat scene.', sourceIds: ['umayyad-commons']},
        {label: 'Geography, not proof', description: 'Damascus belongs to al-Ghazali’s withdrawal history, but the courtyard cannot identify his exact room or actions.', sourceIds: ['umayyad-commons', 'ghazali-sep']},
      ]},
      {heading: 'Reading Deliverance', items: [
        {label: 'Retrospective form', description: 'The narrative is shaped after the events and should not be treated as an unedited diary.', sourceIds: ['ghazali-sep']},
        {label: 'Authority and sincerity', description: 'The crisis tests imitation, proof, motive, practice, and the conditions under which knowledge becomes trustworthy.', sourceIds: ['ghazali-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the installed object from a supposed Deliverance page to Argenberg’s 2008 Umayyad Mosque photograph, verified CC BY rights, separated modern fabric from biographical proof, mapped the retrospective narrative’s claims, and preserved natural proportions.',
    lock: 'fnv1a64:1ef3a77f55285119',
  },
  'al-ghazali-foundations-analogy': {
    plaqueTitle: 'Abu Zayd Pleads Before the Qadi',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'al-ghazali'}],
    articleTitle: 'Al-Ghazali',
    invitation: 'This 1334 Maqamat illustration stages a fictional legal hearing, offering later institutional context for analogy and judgment without pretending to picture al-Ghazali’s Foundations of Analogical Reasoning.',
    objectInterpretation: 'The Austrian National Library image is a 1334 anonymous illustration of the eighth maqama in which Abu Zayd pleads before a qadi. It is a fictional court scene made about two centuries after al-Ghazali, not a manuscript of Asās al-qiyās, a recorded proceeding, or evidence for his exact legal method.',
    overrides: {
      displayName: 'Abu Zayd Before the Qadi: Analogy and Legal Judgment in Context',
      shortTitle: 'Abu Zayd Before the Qadi',
      workLabel: 'AL-GHAZALI · LATER LEGAL-REASONING CONTEXT',
      dateLabel: 'Eighth maqama illustration · anonymous Arab painter, 1334',
    },
    paragraphs: [
      'A seated qadi faces a pleading figure while witnesses and attendants fill the installed painted scene. The source identifies it as an anonymous Arab painter’s 1334 illustration of al-Hariri’s eighth maqama, with Abu Zayd pleading before the qadi of Maʿarrat al-Nuʿman, now in the Austrian National Library. It is a fictional literary image and is public domain. The leaf was produced roughly two centuries after al-Ghazali and does not reproduce Foundations of Analogical Reasoning, document an actual lawsuit, or show his students. Its value is contextual: adjudication, testimony, rhetoric, and institutional authority become visible without being mistaken for the evidence that grounds a specific theory of qiyās.',
      'Analogical reasoning in Islamic law asks how a ruling tied to one case may extend to another through a legally relevant feature. The difficulty is not merely spotting resemblance. A jurist must identify what warrants the original ruling, distinguish effective reason from accidental similarity, and explain why a proposed extension is responsible. Al-Ghazali’s work participates in a broader account of logic, legal theory, theology, and disciplined interpretation. A painted litigant cannot disclose those inferential steps, but the scene reminds visitors that reasoning operates within practices where claims affect people, evidence is contested, and judges act under institutional expectations rather than in a purely formal vacuum.',
      'The linked Al-Ghazali article supplies the intellectual architecture and the relation between law, philosophy, theology, and ethics. The Maqamat image introduces a later literary imagination of judgment, not proof that al-Ghazali endorsed the depicted procedure or that one court represents all legal institutions. It also cannot establish the content of a lost conversation or transform theatrical pleading into a diagram of analogy. Keeping those limits visible sharpens the philosophical question: when does extending a rule preserve principled reasoning, and when does an attractive resemblance conceal a change in the relevant cause? The object provides social stakes; registered scholarship provides the claims about al-Ghazali.',
    ],
    paragraphSourceIds: [['qadi-commons'], ['ghazali-sep'], ['qadi-commons', 'ghazali-sep']],
    sources: [
      collection('qadi-commons', 'Wikimedia Commons — Abu Zayd before a qadi, 1334', 'https://commons.wikimedia.org/wiki/File:Arabischer_Maler_um_1335_002.jpg'),
      academic('ghazali-sep', 'Stanford Encyclopedia of Philosophy — Al-Ghazali', 'https://plato.stanford.edu/entries/al-ghazali/'),
    ],
    visitorGuide: [
      {heading: 'Reading the court scene', items: [
        {label: 'Literary fiction', description: 'The image illustrates a Maqamat episode rather than a documented proceeding or al-Ghazali’s treatise.', sourceIds: ['qadi-commons']},
        {label: 'Later context', description: 'The 1334 leaf postdates al-Ghazali by about two centuries and cannot picture his legal method.', sourceIds: ['qadi-commons']},
      ]},
      {heading: 'Testing an analogy', items: [
        {label: 'Relevant reason', description: 'A legal extension needs a warranted feature, not any visible resemblance between cases.', sourceIds: ['ghazali-sep']},
        {label: 'Institutional stakes', description: 'Interpretation, evidence, authority, and consequences make reasoning more than a formal pattern.', sourceIds: ['qadi-commons', 'ghazali-sep']},
      ]},
    ],
    resolution: 'Resolved: reconciled the slot to the 1334 Maqamat court illustration, named its fictional subject, date, holding, and public-domain rights, rejected the false Asās manuscript identity, mapped its limited legal-reasoning relation, and restored a natural-ratio factual installation.',
    lock: 'fnv1a64:f137c56dd83072de',
  },
  'averroes-demonstration-posterior': {
    plaqueTitle: 'Longo’s Clear Exposition of Averroes’s Introduction',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'averroes'}],
    articleTitle: 'Ibn Rushd / Averroes',
    invitation: 'This 1551 Naples print comments on Averroes’s introduction to the Posterior Analytics tradition, making Latin reception visible while his article explains demonstration as explanatory knowledge.',
    objectInterpretation: 'The Library of Congress identifies the installed book as Giovanni Bernardino Longo’s Latin Dilucida expositio in Prologum Aver. in Post. Aristotelis, printed by Matteo Cancer in Naples in 1551 and preserved from Qatar National Library. It is not an Arabic manuscript by Averroes or his autograph.',
    overrides: {
      displayName: 'Longo’s 1551 Exposition of Averroes on the Posterior Analytics',
      shortTitle: 'Longo on Averroes, 1551',
      workLabel: 'AVERROES · LATIN PRINT RECEPTION OF DEMONSTRATION',
      dateLabel: 'Giovanni Bernardino Longo · Naples, 1551 · Qatar National Library',
    },
    paragraphs: [
      'The installed portrait page belongs to a printed Latin book, not to an Arabic manuscript by Averroes. The Library of Congress record identifies Giovanni Bernardino Longo’s Dilucida expositio in Prologum Aver. in Post. Aristotelis, printed in Naples by Matteo Cancer in 1551 and digitized from Qatar National Library. Longo explains Averroes’s introduction to commentary on Aristotle’s Posterior Analytics. Typography, initials, and page design therefore witness a sixteenth-century European print and teaching context. The object cannot show Averroes’s hand, original Arabic wording, or a twelfth-century commentary session; its evidentiary strength lies in a documented later reception that explicitly names him.',
      'Averroes’s engagement with the Posterior Analytics asks what makes an argument yield scientific knowledge rather than persuasion or valid form alone. Demonstration should explain why a conclusion holds through causes and principles appropriate to the discipline. Commentary is philosophical labor because wording, structure, purpose, and competing readings must be reconstructed. Longo’s later exposition adds another interpretive layer: a reader encounters Aristotle through Averroes and Averroes through a Latin printer-commentator. That chain can preserve distinctions and redirect them. It must not be collapsed into a single voice or used to claim that every discipline has identical first principles and methods.',
      'The linked Ibn Rushd / Averroes article supplies his logic, natural philosophy, psychology, law, medicine, and the controversies generated by later reception. This print makes one route of that afterlife visible without turning Europe into the only destination of Arabic philosophy. The catalogue does not make Longo an unmediated spokesman for Averroes, and the title page cannot decide whether a proposed interpretation is faithful. Visitors can instead ask how explanatory knowledge changes when a commentary’s prologue becomes the subject of another exposition. The exact creator, printer, place, date, original resource, and reuse statement are recorded so the object’s certainty and its interpretive limits remain equally clear.',
    ],
    paragraphSourceIds: [['longo-loc'], ['averroes-sep'], ['longo-loc', 'averroes-sep']],
    sources: [
      collection('longo-loc', 'Library of Congress / Qatar National Library — Longo, Dilucida expositio, 1551', 'https://www.loc.gov/item/2021666873/'),
      academic('averroes-sep', 'Stanford Encyclopedia of Philosophy — Ibn Rushd [Averroes]', 'https://plato.stanford.edu/entries/ibn-rushd/'),
    ],
    visitorGuide: [
      {heading: 'Identifying the printed book', items: [
        {label: 'Longo, not Averroes', description: 'Giovanni Bernardino Longo authored the 1551 Latin exposition; Averroes is the interpreted authority.', sourceIds: ['longo-loc']},
        {label: 'Naples imprint', description: 'Matteo Cancer printed the book in Naples; Qatar National Library preserves the digitized resource.', sourceIds: ['longo-loc']},
      ]},
      {heading: 'Demonstration and reception', items: [
        {label: 'Explanatory knowledge', description: 'Demonstration aims to disclose why a conclusion holds through suitable causes and principles.', sourceIds: ['averroes-sep']},
        {label: 'Layered commentary', description: 'Longo’s exposition adds a later interpretive layer and cannot be substituted for Averroes’s own position.', sourceIds: ['longo-loc', 'averroes-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the object from an Arabic Averroes manuscript to Longo’s 1551 Naples print, verified author, printer, place, Qatar National Library source, and reuse status, mapped demonstration and layered reception claims, and preserved natural proportions.',
    lock: 'fnv1a64:cb1c914f6b981098',
  },
  'averroes-intellect-de-anima': {
    plaqueTitle: 'Cerebral Ventricles, Sensory Pathways, and Faculties',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'averroes'}],
    articleTitle: 'Ibn Rushd / Averroes',
    invitation: 'This 1503 Latin woodcut maps sensory pathways and internal faculties, offering a later psychology context while Averroes’s article resists reducing intellect to the slogan of one mind shared by everyone.',
    objectInterpretation: 'Wellcome M0000436 is a 1503 woodcut, after Gregor Reisch, mapping cerebral ventricles, sensory channels, and faculties. It is not BnF Latin 16151, a page of Averroes’s Long Commentary, or a diagram made by him, and it does not coincide with every Averroist account of intellect.',
    overrides: {
      displayName: 'A 1503 Faculties Woodcut and Averroes on Intellect',
      shortTitle: 'Faculties Woodcut and Averroes',
      workLabel: 'AVERROES · LATER LATIN PSYCHOLOGY RECEPTION',
      dateLabel: 'Woodcut after Gregor Reisch · 1503 · Wellcome Collection',
    },
    paragraphs: [
      'The installed image shows a profile head connected by labeled channels to internal faculties and cerebral ventricles. Wellcome Collection catalogues M0000436 as a 1503 woodcut after Gregor Reisch; the artist is unrecorded and the digital image is CC BY 4.0. It is not the BnF manuscript formerly named by this slot, a page of Averroes’s Long Commentary on De anima, or a diagram drawn under his direction. The scheme belongs to later Latin pedagogical reception. Its labels make sensation, common sense, imagination, cogitation, and memory visually ordered, but the image cannot stand for every medieval psychology or settle the status of intellect in Averroes.',
      'Averroes’s mature account asks how embodied powers supply particular images while intellect grasps universal intelligibles. The Long Commentary generated disputes over material and agent intellect, individual acts of understanding, and survival. Reducing this history to “one intellect for everyone” erases both the theory’s development and the difference between a polemical Latin label and Averroes’s own project. The woodcut can help visitors see why medieval authors distinguished sensory and internal faculties, yet its ventricular layout is not a visual proof of the Long Commentary. Philosophical interpretation must come from texts and scholarship, with the later diagram treated as a related but independent object.',
      'The linked Ibn Rushd / Averroes article supplies the sourced account of intellect, embodiment, commentary, and reception. The woodcut adds a material question: what happens when a complex psychology becomes an image designed for memory and teaching? Diagrammatic clarity can reveal relations while hiding disagreement, chronology, and changes of vocabulary. The object does not prove direct influence from Averroes, identify a historical reader, or make a Latin 1503 scheme identical to twelfth-century Arabic philosophy. Disclosing those limits is more informative than replacing the installed diversity image with another page of text. Visitors encounter the visual reception object first, then use the article to test which connections are supported.',
    ],
    paragraphSourceIds: [['faculties-wellcome'], ['averroes-sep'], ['faculties-wellcome', 'averroes-sep']],
    sources: [
      collection('faculties-wellcome', 'Wikimedia Commons / Wellcome Collection — cerebral ventricles and faculties woodcut', 'https://commons.wikimedia.org/wiki/File:Woodcut_of_head_showing_Cerebral_ventricles._Wellcome_M0000436.jpg'),
      academic('averroes-sep', 'Stanford Encyclopedia of Philosophy — Ibn Rushd [Averroes]', 'https://plato.stanford.edu/entries/ibn-rushd/'),
    ],
    visitorGuide: [
      {heading: 'Reading the faculties woodcut', items: [
        {label: 'Later Latin diagram', description: 'The 1503 woodcut organizes faculties for a different teaching world; it is not an Averroes manuscript.', sourceIds: ['faculties-wellcome']},
        {label: 'Diagrammatic limits', description: 'A neat ventricular map cannot settle disputes about material intellect or individual understanding.', sourceIds: ['faculties-wellcome', 'averroes-sep']},
      ]},
      {heading: 'Following the intellect debate', items: [
        {label: 'Embodied preparation', description: 'Sensation and imagination supply particulars involved in human acts of understanding.', sourceIds: ['averroes-sep']},
        {label: 'No one-mind shortcut', description: 'The mature theory and its Latin controversies involve several distinct questions and developmental stages.', sourceIds: ['averroes-sep']},
      ]},
    ],
    resolution: 'Resolved: reconciled the slot to Wellcome’s 1503 faculties woodcut, verified CC BY attribution and natural ratio, rejected the false BnF manuscript identity, separated the reception diagram from Averroes’s intellect theory, and mapped every claim to current sources.',
    lock: 'fnv1a64:7cfa75bb5431bb68',
  },
  'averroes-colliget-medicine': {
    plaqueTitle: 'Two Doctors Preparing Medicine',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'philosopher', id: 'averroes'}],
    articleTitle: 'Ibn Rushd / Averroes',
    invitation: 'This 1224 Baghdad Dioscorides leaf makes medical practice and apparatus visible beside the Colliget’s general principles without pretending to depict Averroes, Córdoba, or his medical text.',
    objectInterpretation: 'Walters Art Museum W.675a is a 1224 Baghdad leaf copied by Abdallah ibn al-Fadl, with an unrecorded illuminator, showing two doctors preparing medicine. It comes from an Arabic Dioscorides, not the Colliget, Averroes’s Córdoba, or a 1482 Latin printing.',
    overrides: {
      displayName: 'Two Doctors Preparing Medicine: Context for the Colliget',
      shortTitle: 'Two Doctors Preparing Medicine',
      workLabel: 'AVERROES · NEAR-CONTEMPORARY MEDICAL PRACTICE CONTEXT',
      dateLabel: 'Arabic Dioscorides leaf · Baghdad, 1224 · Walters W.675a',
    },
    paragraphs: [
      'Two physicians work among jars and instruments in the installed Arabic manuscript painting. Walters Art Museum W.675a was copied in Baghdad in 1224 by Abdallah ibn al-Fadl; the illuminator is unrecorded, and the digital image is released CC0. The leaf comes from a Dioscorides manuscript, not Averroes’s Colliget, a Córdoba clinic, or the 1482 printed edition formerly associated with this asset ID. Its near-contemporary date gives medical practice a compelling visual context, but the scene cannot identify the substances, reconstruct a normal consultation, or prove how Averroes himself practiced medicine. Exact object identity prevents contextual proximity from becoming false attribution.',
      'The Colliget, Arabic al-Kulliyyāt, organizes general medical principles. It asks how anatomy, physiology, health, disease, and causes can be treated systematically while a practitioner still confronts variable individual cases. Generality and particular judgment perform different work: a universal account may explain capacities and conditions without determining every treatment. Averroes’s medicine also belongs beside his natural philosophy rather than outside his intellectual identity. The Walters scene visualizes craft and preparation, but it supplies no passage from the Colliget and should not be mined for present clinical advice. Historical categories of element, temperament, power, and cause require explanation before modern comparison.',
      'The linked Ibn Rushd / Averroes article provides the sourced relation among medicine, philosophy, law, and commentary. This object matters because it prevents the Colliget from becoming only a printed title or abstract taxonomy; medical knowledge also depends on materials, skilled hands, instruments, and decisions. Still, one Baghdad illustration cannot represent all thirteenth-century medicine, establish direct influence, or move Averroes from Córdoba into the pictured workshop. The distinction between object and work is stated on the plaque and in the guide. Visitors can then ask a genuine philosophical question: how should universal explanations guide action when every body and circumstance presents particulars that exceed the general rule?',
    ],
    paragraphSourceIds: [['doctors-walters'], ['averroes-sep'], ['doctors-walters', 'averroes-sep']],
    sources: [
      collection('doctors-walters', 'Wikimedia Commons / Walters Art Museum — Two doctors preparing medicine, W.675a', 'https://commons.wikimedia.org/wiki/File:Illuminated_single_leaf,_Two_doctors_preparing_medicine,_Walters_Art_Museum_Ms._W.675a.jpg'),
      academic('averroes-sep', 'Stanford Encyclopedia of Philosophy — Ibn Rushd [Averroes]', 'https://plato.stanford.edu/entries/ibn-rushd/'),
    ],
    visitorGuide: [
      {heading: 'Reading the medical leaf', items: [
        {label: 'Dioscorides, not Colliget', description: 'The 1224 Baghdad painting comes from a different medical manuscript and is used only as context.', sourceIds: ['doctors-walters']},
        {label: 'Named copyist', description: 'Abdallah ibn al-Fadl copied the manuscript; the illuminator remains unrecorded.', sourceIds: ['doctors-walters']},
      ]},
      {heading: 'Generalities and cases', items: [
        {label: 'Medical universals', description: 'The Colliget organizes general principles of bodies, health, disease, and causation.', sourceIds: ['averroes-sep']},
        {label: 'Practical judgment', description: 'General explanation does not determine every treatment for an individual body and circumstance.', sourceIds: ['averroes-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the slot to Walters W.675a, named its Baghdad date, copyist, unrecorded illuminator, Dioscorides source, and CC0 rights; rejected the false Colliget-print identity; mapped the contextual medical relation; and preserved its natural landscape ratio.',
    lock: 'fnv1a64:c4a7e9aa322f4a4f',
  },
  'andalusian-astrolabe-context': {
    plaqueTitle: 'Astrolabe by Muhammad ibn al-Saffar',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'branch', id: 'islamic-philosophy'}],
    articleTitle: 'Islamic Philosophy',
    invitation: 'This dated Andalusian astrolabe turns celestial geometry into a calibrated instrument, giving Islamic Philosophy precise regional context without claiming that Averroes or Ibn Tufayl owned or used it.',
    objectInterpretation: 'This brass astrolabe was made by Muhammad ibn al-Saffar in 420 AH/1029 and is held by the Staatsbibliothek zu Berlin as accession 2050. The collection photograph is CC0. The instrument predates the gallery’s Andalusian philosophers and supplies regional scientific context, not evidence of their ownership, use, or direct influence.',
    overrides: {
      displayName: 'Astrolabe by Muhammad ibn al-Saffar',
      shortTitle: 'Astrolabe by Ibn al-Saffar',
      dateLabel: 'Brass astrolabe · 420 AH / 1029 · Staatsbibliothek zu Berlin 2050',
    },
    paragraphs: [
      'A circular brass instrument hangs against a dark field, its engraved Arabic scales and openwork rete held by a central pin. The source identifies Muhammad ibn al-Saffar as maker, dates the astrolabe to 420 AH/1029, and locates it in the Staatsbibliothek zu Berlin under accession 2050; the photograph is CC0. Those details make it unusually precise regional evidence. The object predates Averroes and Ibn Tufayl by more than a century and is not known to have belonged to either. It also cannot represent every Andalusian instrument, user, or scientific institution. Its calibrated material specificity is more valuable than an invented story of famous ownership.',
      'An astrolabe embodies mathematical relations among observer, horizon, time, and sky. Plates, scales, and the rotating rete become useful only through trained procedures, so theory, diagram, craft, and interpretation operate together. Casting, engraving, calibration, maintenance, and reading are intellectual achievements as well as manual skills. This widens the gallery’s account of philosophy beyond authored prose without declaring astronomy, instrument making, medicine, law, and metaphysics one undivided discipline. The instrument can support questions about reliable observation and models; it cannot illustrate a particular argument by Averroes or make a broad “golden age” narrative substitute for local makers and dates.',
      'The linked Islamic Philosophy article supplies the history of translation, falsafa, theology, commentary, and scientific inquiry that situates this object. The astrolabe contributes a bounded philosophical problem: how does an abstract mathematical model become a portable practice that different users can check? Its survival and collection history do not reveal every original owner or occasion of use, and the photographic record cannot recover handling. The exhibit therefore names what is secure—maker, date, material, holding, accession, rights—and leaves ownership and influence open. That discipline lets the instrument anchor al-Andalus without forcing it into a biography it does not possess.',
    ],
    paragraphSourceIds: [['astrolabe-commons'], ['astrolabe-sciamvs', 'greek-arabic-sep'], ['astrolabe-commons', 'astrolabe-sciamvs', 'greek-arabic-sep']],
    sources: [
      collection('astrolabe-commons', 'Wikimedia Commons / Staatsbibliothek zu Berlin — Andalusian astrolabe, 420 AH', 'https://commons.wikimedia.org/wiki/File:Andalusian_astrolabe_420_AH.jpg'),
      academic('astrolabe-sciamvs', 'SCIAMVS — Early Andalusian astrolabes and numerical notation', 'https://sciamvs.org/files/SCIAMVS_19_167-200_Thomann.pdf'),
      academic('greek-arabic-sep', 'Stanford Encyclopedia of Philosophy — Greek Sources in Arabic and Islamic Philosophy', 'https://plato.stanford.edu/entries/arabic-islamic-greek/'),
    ],
    visitorGuide: [
      {heading: 'Reading the instrument', items: [
        {label: 'Named maker and date', description: 'Muhammad ibn al-Saffar made the brass astrolabe in 420 AH/1029.', sourceIds: ['astrolabe-commons', 'astrolabe-sciamvs']},
        {label: 'No famous owner', description: 'The object predates Averroes and Ibn Tufayl and is not documented as their possession.', sourceIds: ['astrolabe-commons']},
      ]},
      {heading: 'Mathematics in practice', items: [
        {label: 'Calibrated model', description: 'Plates, rete, scales, and procedures coordinate celestial geometry with a local horizon.', sourceIds: ['astrolabe-sciamvs']},
        {label: 'Craft and theory', description: 'Design, engraving, calibration, and use make practical skill part of the knowledge system.', sourceIds: ['astrolabe-sciamvs', 'greek-arabic-sep']},
      ]},
    ],
    resolution: 'Resolved: verified maker, 420 AH/1029 date, brass object, Berlin accession, CC0 photograph, and natural proportions; stated the ownership and influence limits; mapped mathematical-practice claims; and linked the current Islamic Philosophy article.',
    lock: 'fnv1a64:377f649da317f3e1',
  },
  'suhrawardi-ishraq-opening': {
    plaqueTitle: 'Opening Folio of Ḥikmat al-Ishrāq',
    plaqueType: 'work-or-text',
    canonicalContexts: [{kind: 'philosopher', id: 'suhrawardi'}],
    articleTitle: 'Suhrawardi',
    invitation: 'This Ottoman copy preserves Suhrawardi’s Philosophy of Illumination as a later courtly witness, while his article traces its arguments about light, self-awareness, and knowledge by presence.',
    objectInterpretation: 'The installed folio is the 1477–78 opening of Ḥikmat al-ishrāq, copied in taʿlīq by Sayyid Muhammad Munshi for Sultan Mehmed II’s library and now Topkapı Palace Library Ahmed III 3267, folio 1b. It is a later Ottoman courtly witness, not Suhrawardi’s hand or proof of one fixed interpretation.',
    paragraphs: [
      'Blue, red, gold, and floral illumination frame Arabic text on the installed opening folio. The Commons record identifies it as folio 1b of Topkapı Palace Library Ahmed III 3267, copied in Istanbul in 1477–78 by Sayyid Muhammad Munshi for Sultan Mehmed II’s library. The manuscript is a materially impressive witness to the work’s Ottoman reception, but it was made almost three centuries after Suhrawardi’s death in 1191 or early 1192. Its script, ornament, courtly patronage, and later location therefore establish a historical setting for transmission; they do not recover an autograph, an original reading community, or a settled philosophical doctrine.',
      'Suhrawardi’s Philosophy of Illumination does not make light a decorative synonym for private feeling. It develops a philosophical account of self-awareness and knowledge by presence while criticizing representational accounts of knowing inherited from Peripatetic debates. Scholarship treats self-awareness, presence, and a complex metaphysics of lights as central concerns, while distinguishing engagement with Avicennian problems from later reception. The work’s question is philosophical: what can be known through concepts, definitions, and argument, and what requires a more immediate relation of presence? A manuscript cannot decide that question, but its careful copying makes visible the public labor needed for the question to remain discussable.',
      'This object belongs beside the Suhrawardi article because a later manuscript shows that a demanding text acquired new readers, patrons, and visual authority. It does not prove that Mehmed II endorsed every illuminationist claim, that Ottoman readers agreed, or that ornament displays mystical experience. Nor should its beauty erase the work’s logical, psychological, and metaphysical arguments. The linked article supplies the sourced account of the Philosophy of Illumination, its relation to Avicenna, and its commentators; the folio supplies a bounded material encounter with one prestigious copy. Keeping those roles separate lets visitors ask why a philosophy of presence was also transmitted through writing, copying, and collection.',
    ],
    paragraphSourceIds: [['suhrawardi-1477-commons'], ['suhrawardi-sep'], ['suhrawardi-1477-commons', 'suhrawardi-sep']],
    sources: [
      collection('suhrawardi-1477-commons', 'Wikimedia Commons — opening of Ḥikmat al-ishrāq, Topkapı Ahmed III 3267 fol. 1b', 'https://commons.wikimedia.org/wiki/File:Opening_page_from_the_manuscript_of_%22Hikmat_al-%CA%BFIshraq%22_by_al-Suhrawardi.jpg'),
      academic('suhrawardi-sep', 'Stanford Encyclopedia of Philosophy — Suhrawardi', 'https://plato.stanford.edu/entries/suhrawardi/'),
    ],
    visitorGuide: [
      {heading: 'Copy and court', items: [
        {label: 'A later witness', description: 'The 1477–78 manuscript postdates Suhrawardi by nearly three centuries and is not an autograph.', sourceIds: ['suhrawardi-1477-commons']},
        {label: 'Courtly reception', description: 'Munshi copied the folio for Mehmed II’s library; patronage records reception, not philosophical agreement.', sourceIds: ['suhrawardi-1477-commons']},
      ]},
      {heading: 'The illuminationist question', items: [
        {label: 'Knowledge by presence', description: 'Suhrawardi uses presence and self-awareness to challenge accounts that make knowing only an internal representation.', sourceIds: ['suhrawardi-sep']},
        {label: 'Light', description: 'Light organizes a philosophical account of manifestation and intelligibility; it is not simply physical light or decoration.', sourceIds: ['suhrawardi-sep']},
      ]},
    ],
    resolution: 'Resolved: identified Topkapı Ahmed III 3267 folio 1b as Munshi’s 1477–78 Ottoman copy, separated courtly witness from Suhrawardi’s lifetime and doctrine, mapped every claim, preserved public-domain provenance and natural ratio, and supplied the exact article CTA.',
    lock: 'fnv1a64:a01e3a53c96fe23c',
  },
  'suhrawardi-ishraq-annotated': {
    plaqueTitle: 'Ḥikmat al-Ishrāq Manuscript, 1220',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'suhrawardi'}],
    articleTitle: 'Suhrawardi',
    invitation: 'Copied decades after Suhrawardi, this annotated manuscript records the early transmission of his Philosophy of Illumination while the full article distinguishes its arguments from later readers’ commentary.',
    objectInterpretation: 'The installed image shows a Ḥikmat al-ishrāq manuscript copied by Shams ibn Jamal al-Hatani in post-Seljuq Iran on 13 October 1220. The source describes 109 folios and copious later marginal commentary but does not securely identify a present holding; it is an early witness, not Suhrawardi’s autograph.',
    paragraphs: [
      'The installed opening shows a broad Arabic manuscript page with gold, blue, and red decoration, dense naskh text, and annotations clustered in its margins. The source record identifies a 109-folio paper manuscript of Ḥikmat al-ishrāq copied by Shams ibn Jamal al-Hatani in post-Seljuq Iran on Tuesday 13 October 1220. It notes copious later commentary, waterstaining, and wear. The date is historically close to Suhrawardi’s death, but closeness is not authorship: the copy was made by another scribe, depended on earlier exemplars, and carries later readers’ interventions. The available Commons and auction record does not establish a current collection or the dates and identities of every marginal annotator.',
      'Those limits make the manuscript more, not less, useful. Suhrawardi’s illuminationism asks how self-awareness and knowledge by presence relate to concepts, arguments, and an ontology of lights. A copied page cannot disclose an author’s private insight or settle whether every later commentator understood presence correctly. It can show that a difficult philosophical work entered practices of copying, marking, and commentarial reading. Scholarship documents illuminationism’s later reception through distinct authors and debates rather than one seamless school. Marginal writing is therefore evidence for continued interpretive labor, not a shortcut from an early manuscript to a single agreed tradition.',
      'The Suhrawardi article supplies the canonical account of the work’s arguments, its post-Avicennian setting, and tensions in later illuminationist history. This object gives that account a material threshold: philosophy endured because scribes, owners, teachers, and readers made texts usable under changing conditions. The early date does not make this folio transparent access to Suhrawardi, but later annotation does not make it corrupt noise. Copying and commentary are part of how claims are tested, reorganized, and inherited. The physical record supports that question while leaving authorial wording, every reader’s identity, the current holding, and each note’s date open.',
    ],
    paragraphSourceIds: [['suhrawardi-1220-commons'], ['suhrawardi-sep'], ['suhrawardi-1220-commons', 'suhrawardi-sep']],
    sources: [
      collection('suhrawardi-1220-commons', 'Wikimedia Commons / Christie’s — dated 1220 Ḥikmat al-ishrāq manuscript', 'https://commons.wikimedia.org/wiki/File:Shihab_al-Din_Abu_al-Futuh_Ahmad_bin_Habbash_(Ya%27ish)_bin_Amirak_al-Suhrawardi_al-Maqtuli_(d._1191-92)%3B_Hikmat_al-Ishraq,_copied_by_Shams_bin_Jamal_al-Hatani,_post-Seljuq_Iran,_dated_Tuesday_13_October_1220.jpg'),
      academic('suhrawardi-sep', 'Stanford Encyclopedia of Philosophy — Suhrawardi', 'https://plato.stanford.edu/entries/suhrawardi/'),
    ],
    visitorGuide: [
      {heading: 'Manuscript evidence', items: [
        {label: 'Dated copying', description: 'Shams ibn Jamal al-Hatani completed the copy in post-Seljuq Iran on 13 October 1220.', sourceIds: ['suhrawardi-1220-commons']},
        {label: 'Later margins', description: 'Copious commentary records later reading, but the supplied record does not date or name every annotator.', sourceIds: ['suhrawardi-1220-commons']},
      ]},
      {heading: 'Reading illuminationism', items: [
        {label: 'Presence is not a slogan', description: 'Knowledge by presence belongs to arguments about self-awareness, representation, and manifestation.', sourceIds: ['suhrawardi-sep']},
        {label: 'Reception is plural', description: 'Later readers developed different illuminationist projects rather than preserving one unanimous school.', sourceIds: ['suhrawardi-sep']},
      ]},
    ],
    resolution: 'Resolved: identified the 13 October 1220 manuscript, copyist, and later commentary; disclosed the unverified present holding and annotator dates; separated early transmission from autograph authority; mapped illuminationist claims; and preserved public-domain provenance and natural ratio.',
    lock: 'fnv1a64:89f2cd7512049ec5',
  },
  'mulla-sadra-kahak-withdrawal': {
    plaqueTitle: 'House Associated with Mulla Sadra at Kahak',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'mulla-sadra'}],
    articleTitle: 'Mulla Sadra',
    invitation: 'This modern photograph of a house associated with Mulla Sadra frames his remembered Kahak retreat, while the full article separates qualified biography from arguments about existence, motion, and knowledge.',
    objectInterpretation: 'Hojjat Ataei’s 29 June 2012 CC BY-SA 4.0 photograph records an interior of the Iranian monument identified as Mulla Sadra House at Kahak. Scholarship supports a probably five-year Kahak retreat, but neither source proves an unchanged seventeenth-century study or attaches a particular philosophical event to this room.',
    paragraphs: [
      'The installed portrait photograph shows a high brick arch, plastered walls, and a narrow shaft of daylight inside the building Commons identifies as Mulla Sadra House at Kahak, Iranian monument 1821. Hojjat Ataei made the photograph on 29 June 2012 and released it under CC BY-SA 4.0. The image is a modern record of a heritage site and contemporary attribution, not a seventeenth-century interior photograph. Its beams, brick, and enclosure orient a visitor to scale and material setting, but they cannot demonstrate where Sadra wrote, prayed, taught, or received visitors. The source does not establish untouched fabric, a room-by-room period history, or a specific event in the philosopher’s life.',
      'Scholarship reports that Mulla Sadra withdrew to Kahak after failing to find adequate patronage and facing opposition in Shiraz; the retreat probably lasted five years, and he initiated composition of major works, especially The Four Journeys. That account matters because Sadra’s philosophy of existence, motion, knowledge, and return developed amid institutions, correspondence, family life, and movement between places, not in an abstract vacuum. Yet a biographical retreat should not become a romance of solitary genius. Later teaching, correspondence, students, and an itinerant life remain part of the record. The photograph can frame conditions of study, but philosophical claims depend on texts and scholarship.',
      'The linked Mulla Sadra article explains why primacy and gradation of existence, substantial motion, and presential knowledge became influential and contested. This photo should not be made to prove those doctrines, and the building association cannot guarantee every anecdote attached to the retreat. Its strongest value is methodological: how should place enter an intellectual biography when evidence combines remembered sites, text, later attribution, and qualified chronology? A visitor can acknowledge Kahak’s role in Sadra’s remembered life while refusing to turn an atmospheric room into evidence of isolated revelation. The article supplies the arguments; this later photograph keeps their worldly conditions and evidence limits visible.',
    ],
    paragraphSourceIds: [['kahak-commons'], ['mulla-sadra-sep'], ['kahak-commons', 'mulla-sadra-sep']],
    sources: [
      collection('kahak-commons', 'Wikimedia Commons — Mulla Sadra House at Kahak photograph', 'https://commons.wikimedia.org/wiki/File:Untitled-8586_%D9%85%D9%84%D8%A7_%D8%B5%D8%AF%D8%B1%D8%A7.jpg'),
      academic('mulla-sadra-sep', 'Stanford Encyclopedia of Philosophy — Mulla Sadra', 'https://plato.stanford.edu/entries/mulla-sadra/'),
    ],
    visitorGuide: [
      {heading: 'Kahak and biography', items: [
        {label: 'Probable retreat', description: 'Sadra’s withdrawal probably lasted about five years and belongs to a qualified biographical reconstruction.', sourceIds: ['mulla-sadra-sep']},
        {label: 'Not a preserved study', description: 'The 2012 photograph cannot prove unchanged fabric or identify where a particular event occurred.', sourceIds: ['kahak-commons']},
      ]},
      {heading: 'Thought and setting', items: [
        {label: 'The Four Journeys', description: 'Sadra began major work during the retreat, but authorship cannot be assigned to the visible room.', sourceIds: ['mulla-sadra-sep']},
        {label: 'No doctrine from a room', description: 'Architecture can frame conditions of study without demonstrating primacy of existence or substantial motion.', sourceIds: ['kahak-commons', 'mulla-sadra-sep']},
      ]},
    ],
    resolution: 'Resolved: verified the 2012 Hojjat Ataei CC BY-SA photograph and heritage-site attribution, retained Kahak’s qualified biographical connection, rejected an unchanged study or documented room event, mapped the retreat and philosophical relationship, and preserved natural proportions.',
    lock: 'fnv1a64:e4a8a2718d55ae0f',
  },
};

const reviewMethod = 'Galleries 08–09 supplemental review: exactly eight non-overlapping GPT-5.6 Terra/High evidence scopes were reconciled by the Sol parent across installed-object identity, attribution, dating, institution, provenance, rights, claim-level sources, accessibility, article relationships, routes, review locks, and desktop, mobile, and staged-3D presentation.';

const visualReview = (id: string): NonNullable<NonNullable<MuseumSupplementalExhibit['review']>['visualReview']> => ({
  desktop: {
    reviewedOn: '2026-08-19',
    viewport: '1440×900',
    evidence: `Direct route inspected with the full uncropped object preview, three untitled sourced paragraphs, subject-specific guide, factual plaque relationship, complete article CTA, and no horizontal overflow. Evidence: docs/visual-validation/gallery-08-supplementals/desktop/${id}.png`,
  },
  mobile: {
    reviewedOn: '2026-08-19',
    viewport: '390×844',
    evidence: `Direct route inspected with wrapped factual title, full aspect-safe object preview, scrollable interpretation, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-08-supplementals/mobile/${id}.png`,
  },
  threeDimensional: {
    reviewedOn: '2026-08-19',
    viewport: '1280×720 fresh direct-route session',
    evidence: `Fresh direct-route session inspected after closing the detail view: authored viewpoint, factual two-level plaque, distinct installation, working visit controls, and natural-ratio media mount. Evidence: docs/visual-validation/gallery-08-supplementals/staged-3d/${id}.png`,
  },
});

export const reviewIslamicSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) {
    if (!input.review) throw new Error(`Missing Gallery 08 review evidence for ${input.id}.`);
    return {
      ...input,
      review: {...input.review, method: reviewMethod, visualReview: visualReview(input.id)},
    };
  }
  if (!input.presentation) throw new Error(`Missing Gallery 08 presentation for ${input.id}.`);
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
      panelKicker: reviewed.panelKicker ?? 'Gallery 08 supplemental exhibit',
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
      reviewedOn: '2026-08-19',
      method: reviewMethod,
      resolution: reviewed.resolution,
      lock: reviewed.lock,
      visualReview: visualReview(input.id),
    },
  };
};
