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
  >>;
};

const collection = (id: string, label: string, url: string) => ({id, label, url, kind: 'collection-record' as const});
const academic = (id: string, label: string, url: string) => ({id, label, url, kind: 'academic-reference' as const});
const primary = (id: string, label: string, url: string) => ({id, label, url, kind: 'primary-text' as const});

const evidence: Record<string, ReviewEvidence> = {
  'renaissance-texts-in-transit': {
    plaqueTitle: 'World Map from Ptolemy’s Geography',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'ficino'}],
    articleTitle: 'Marsilio Ficino',
    invitation: 'This 1482 Ulm woodcut shows how ancient texts reached Renaissance readers through copying, translation, cartographic revision, skilled production, and print rather than simple rediscovery.',
    objectInterpretation: 'The installed image is a woodcut world map in the 1482 Ulm Latin edition of Ptolemy’s Geography, associated with Nicolaus Germanus’s cartographic recension and Johannes Schnitzer’s woodcut. The derivative’s source record does not identify one unique physical copy. It maps Ptolemaic geography, not manuscript routes, and it was never Ficino’s personal object.',
    overrides: {
      displayName: 'World Map from Ptolemy’s Geography',
      shortTitle: 'The 1482 Ulm Ptolemy',
      workLabel: 'PRINTED MAP · PTOLEMAIC TRANSMISSION',
      dateLabel: 'Ulm Latin edition · 1482 · exact photographed copy unrecorded',
      frontSubtitle: 'A printed map shaped by translation, revision, craft, and circulation',
    },
    paragraphs: [
      'Named winds encircle Europe, Africa, and Asia in the installed world map, which comes from the Ulm Latin Ptolemy of 1482. Bibliographic records connect the edition with Lienhart Holle’s press, Nicolaus Germanus’s cartographic work, and a woodcut signed by Johannes Schnitzer. The Atlas derivatives preserve the complete rectangular composition at its natural landscape ratio. They do not, however, identify the particular surviving copy from which the Commons file was made. The image therefore establishes a printed edition and a recognizable Ptolemaic projection, not a unique object provenance, a diagram of textual travel, or a transparent picture of the world known to every Renaissance reader.',
      'The edition materializes several kinds of intellectual labor. Ptolemy’s Greek geographical text reached Latin readers through manuscript transmission and the translation associated with Jacobus Angelus; editors and mapmakers then selected coordinates, names, projections, and visual conventions for print. Woodblock cutting, paper, type, workshop practice, finance, and distribution made those choices portable without making them final. Printing increased the number and reach of copies, but it did not eliminate variant readings, inherited errors, or fresh interpretation. “Recovery” is therefore too simple if it suggests that an intact ancient object merely waited for western Europe to uncover it. Reception changes a text while enabling it to endure.',
      'Marsilio Ficino belongs to this broader Renaissance ecology as a reader, translator, commentator, and organizer of Platonic materials, not as the map’s owner or maker. His work depended on manuscripts, Greek expertise, patrons, scribes, printers, and debates about how ancient vocabularies should be rendered in Latin. The map offers a parallel material case: knowledge travels through people and institutions that both preserve and reshape it. It cannot by itself prove every Greek, Byzantine, Arabic, Jewish, or Latin connection named in a general history. The linked Ficino article supplies the canonical account, while this object keeps the practical conditions and selective character of transmission visible.',
    ],
    paragraphSourceIds: [['ptolemy-commons', 'ptolemy-nypl'], ['ptolemy-bell', 'renaissance-sep'], ['ficino-sep', 'renaissance-sep']],
    sources: [
      collection('ptolemy-commons', 'Wikimedia Commons — world map in the 1482 Ulm Ptolemy', 'https://commons.wikimedia.org/wiki/File:World_of_Ptolemy_as_shown_by_Johannes_de_Armsshein_-_Ulm_1482.png'),
      collection('ptolemy-nypl', 'New York Public Library — 1482 Ulm Ptolemy map record', 'https://digitalcollections.nypl.org/items/af820f35-9862-a52b-e040-e00a180644a5'),
      academic('ptolemy-bell', 'James Ford Bell Library — the 1482 Ulm Ptolemy', 'https://apps.lib.umn.edu/bell/map/PTO/TOUR/1482u.html'),
      academic('renaissance-sep', 'Stanford Encyclopedia of Philosophy — Renaissance Philosophy', 'https://plato.stanford.edu/entries/renaissance/'),
      academic('ficino-sep', 'Stanford Encyclopedia of Philosophy — Marsilio Ficino', 'https://plato.stanford.edu/entries/ficino/'),
    ],
    visitorGuide: [
      {heading: 'Reading the printed map', items: [
        {label: 'Ptolemaic projection', description: 'The map renders an inherited geographical system; it is not a measured survey of the fifteenth-century world.', sourceIds: ['ptolemy-nypl', 'ptolemy-bell']},
        {label: 'A bounded derivative', description: 'The digital source identifies the 1482 edition but not one uniquely provenanced surviving copy.', sourceIds: ['ptolemy-commons']},
      ]},
      {heading: 'Following transmission', items: [
        {label: 'Translation and revision', description: 'Latin wording, edited coordinates, labels, and woodcut design made the ancient text usable in a new setting.', sourceIds: ['ptolemy-bell', 'renaissance-sep']},
        {label: 'Ficino’s parallel labor', description: 'Ficino’s Platonic project likewise joined reading and translation to patrons, manuscripts, commentary, and print.', sourceIds: ['ficino-sep']},
      ]},
    ],
    resolution: 'Resolved: identified the installed 1482 Ulm map, bounded its copy-level provenance, replaced a heroic rediscovery narrative with sourced transmission and transformation, preserved public-domain attribution and natural proportions, and linked the current Marsilio Ficino article.',
    lock: 'fnv1a64:fbe485f7ef32450c',
  },
  'machiavelli-prince': {
    plaqueTitle: 'Portrait of a Gentleman',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'machiavelli'}],
    articleTitle: 'Niccolò Machiavelli',
    invitation: 'Traditionally but disputably identified as Cesare Borgia, this Renaissance portrait introduces Machiavelli’s contested case study of political capacity, force, dependence, and fortune.',
    objectInterpretation: 'The installed object is Altobello Melone’s c. 1515–1520 Portrait of a Gentleman in the Accademia Carrara, not a title page of The Prince. The sitter’s traditional identification as Cesare Borgia is disputed, and the supplied source has no linked institutional object record. The painting is neither a secure likeness nor evidence for Machiavelli’s text.',
    overrides: {
      displayName: 'Portrait of a Gentleman',
      shortTitle: 'The Disputed Borgia Portrait',
      workLabel: 'RENAISSANCE PORTRAIT · DISPUTED SITTER',
      dateLabel: 'Altobello Melone · c. 1515–1520 · Accademia Carrara',
      frontSubtitle: 'A disputed face beside Machiavelli’s difficult political example',
      lead: 'A portrait traditionally identified as Cesare Borgia provides a cautious object-led entry into The Prince. The attribution is uncertain, while Machiavelli’s uses of Borgia are textual, selective, and critical as well as admiring.',
    },
    paragraphs: [
      'A richly dressed young man turns toward the viewer in Altobello Melone’s Portrait of a Gentleman, painted around 1515–1520 and held by the Accademia Carrara in Bergamo. The installed files match the Commons acquisition record and preserve the portrait’s natural proportions. The sitter has traditionally been called Cesare Borgia, but that identification is disputed; the source supplied to the Atlas does not link a collection page that resolves it. This is therefore an uncertain association made through later identification, not a secure portrait from life. It is also not the 1532 title page still suggested by the legacy asset ID, and it cannot authenticate any passage of The Prince.',
      'Cesare Borgia matters because Machiavelli repeatedly tests political judgment through his rise and fall. Borgia acts decisively, uses force, reorganizes Romagna, and tries to reduce dependence on unstable allies, yet Machiavelli also criticizes his final calculation after Pope Alexander VI’s death. The case clarifies virtù as adaptive capacity rather than ordinary moral virtue or sheer violence. It also shows fortuna as contingency that preparation can meet but never abolish. Machiavelli’s examples do not operate as saints’ lives or simple instructions. He selects and arranges them to ask how a new ruler secures arms, institutions, reputation, and support under dangerous conditions.',
      'The Prince makes ethical danger explicit. It examines cruelty, deception, fear, promises, appearance, and the counsel to learn how not to be good when necessity seems to demand it. Yet the work also warns against hatred, repeated injury, confiscation, weak military dependence, and policies that destroy a state’s foundations. Readers continue to dispute whether its rhetoric teaches autonomous political technique, serves republican purposes, exposes princely vulnerability, or stages conflicts that admit no clean moral resolution. The portrait contributes no answer to those disputes. Its uncertain identification instead models a discipline the text also requires: admired examples must be examined for dependence, failure, and the difference between a powerful image and a warranted conclusion.',
    ],
    paragraphSourceIds: [['borgia-portrait'], ['machiavelli-sep', 'prince-primary'], ['machiavelli-sep', 'prince-primary']],
    sources: [
      collection('borgia-portrait', 'Wikimedia Commons — Altobello Melone, Portrait of a Gentleman traditionally identified as Cesare Borgia', 'https://commons.wikimedia.org/wiki/File:Cesareborgia.jpg'),
      primary('prince-primary', 'Niccolò Machiavelli — The Prince, Project Gutenberg', 'https://www.gutenberg.org/ebooks/1232'),
      academic('machiavelli-sep', 'Stanford Encyclopedia of Philosophy archive — Niccolò Machiavelli', 'https://plato.stanford.edu/archives/spr2025/entries/machiavelli/'),
    ],
    visitorGuide: [
      {heading: 'Testing the Borgia example', items: [
        {label: 'Virtù', description: 'Adaptive political capacity includes judgment, force, preparation, and the ability to change with circumstances.', sourceIds: ['machiavelli-sep', 'prince-primary']},
        {label: 'Fortuna', description: 'Contingency can frustrate capable actors; Borgia is both a model of preparation and a case of exposed dependence.', sourceIds: ['machiavelli-sep', 'prince-primary']},
      ]},
      {heading: 'Separating image from evidence', items: [
        {label: 'Disputed sitter', description: 'The traditional Borgia identification remains uncertain and must not become a secure likeness claim.', sourceIds: ['borgia-portrait']},
        {label: 'A textual case', description: 'Machiavelli’s political analysis comes from the work and its examples, not from the painted face.', sourceIds: ['prince-primary', 'machiavelli-sep']},
      ]},
    ],
    resolution: 'Resolved: followed the installed Melone portrait rather than the obsolete title-page identifier, made the Borgia attribution uncertainty explicit, mapped the political claims to the primary work and current scholarship, corrected the object-led title and mount, and linked the current Niccolò Machiavelli article.',
    lock: 'fnv1a64:219e2f5d9f81f99d',
  },
  'machiavelli-discourses': {
    plaqueTitle: 'The Lictors Bring to Brutus the Bodies of His Sons',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'machiavelli'}],
    articleTitle: 'Niccolò Machiavelli',
    invitation: 'David’s 1789 reception painting stages a Roman conflict between civic judgment and family loyalty that Machiavelli reworks in the Discourses; it is not Renaissance documentation.',
    objectInterpretation: 'The installed landscape is Jacques-Louis David’s 1789 Brutus painting in the Musée du Louvre, not the 1540 title page named by its legacy ID. David stages a Livian republican story for a late-eighteenth-century audience. The painting is neither evidence for ancient Rome nor an illustration commissioned for Machiavelli’s Discourses.',
    overrides: {
      displayName: 'The Lictors Bring to Brutus the Bodies of His Sons',
      shortTitle: 'David’s Brutus',
      workLabel: 'RECEPTION PAINTING · ROMAN REPUBLICAN MEMORY',
      dateLabel: 'Jacques-Louis David · 1789 · Musée du Louvre, INV 3693',
      frontSubtitle: 'A Revolutionary-era Roman scene beside Machiavelli’s republican analysis',
      lead: 'David’s Brutus stages the collision of public judgment and domestic grief. It offers later reception of the Roman archive that Machiavelli read, not a portrait of his work or evidence for the ancient event.',
    },
    paragraphs: [
      'Brutus sits in shadow while lictors return the bodies of his condemned sons and women recoil in grief across Jacques-Louis David’s monumental 1789 painting. The Louvre identifies the work as Brutus, First Consul, Returning Home after Condemning His Two Sons, inventory 3693; the familiar English title describes the same scene. The installed derivatives match that landscape object and its acquisition record, not the Aldine title page implied by the old asset name. David painted a Roman republican story for the Salon on the eve of the French Revolution. His carefully staged contrast is reception art, not eyewitness history, Renaissance documentation, or a neutral illustration of Machiavelli.',
      'The Discourses on Livy uses Roman history to investigate how republics begin, preserve liberty, channel conflict, arm citizens, confront corruption, and renew institutions. Machiavelli argues provocatively that contention between elites and people can produce laws that protect freedom when offices and procedures give conflict political form. He does not praise every faction or episode, and he does not treat Rome as a flawless model. Founding violence, expansion, religion, emergency authority, inequality, and decay complicate the account. Livy supplies a historical archive that Machiavelli questions and rearranges, so a dramatic Roman scene should prompt analysis rather than stand as an uncomplicated emblem of civic virtue.',
      'David’s Brutus sharpens one tension without resolving it: public commitment can demand actions that devastate households and make political virtue appear inhuman. The Discourses likewise refuses to make republican endurance morally comfortable, but its argument ranges far beyond one exemplary founder. It asks how durable laws and collective capacities can prevent liberty from depending only on a heroic individual. Read beside The Prince, the work changes the scale from a ruler’s judgment to a people’s institutions while leaving interpretive disagreements about the unity of Machiavelli’s corpus. The painting belongs to the afterlife of Rome’s political imagery; the linked article and sources establish Machiavelli’s arguments and their continuing risks.',
    ],
    paragraphSourceIds: [['brutus-louvre', 'brutus-commons'], ['discourses-primary', 'machiavelli-sep'], ['brutus-louvre', 'discourses-primary', 'machiavelli-sep']],
    sources: [
      collection('brutus-commons', 'Wikimedia Commons — Jacques-Louis David, Brutus', 'https://commons.wikimedia.org/wiki/File:David_Brutus.jpg'),
      collection('brutus-louvre', 'Musée du Louvre — Brutus, INV 3693', 'https://collections.louvre.fr/en/ark:/53355/cl010062238'),
      primary('discourses-primary', 'Niccolò Machiavelli — Discourses on Livy, Project Gutenberg', 'https://www.gutenberg.org/ebooks/10827'),
      academic('machiavelli-sep', 'Stanford Encyclopedia of Philosophy archive — Niccolò Machiavelli', 'https://plato.stanford.edu/archives/spr2025/entries/machiavelli/'),
    ],
    visitorGuide: [
      {heading: 'Reading David’s Roman scene', items: [
        {label: 'Public and domestic space', description: 'Brutus is isolated in shadow while the returning bodies and grieving household make the human cost visible.', sourceIds: ['brutus-louvre']},
        {label: 'Later reception', description: 'The 1789 painting reimagines Livian Rome for a modern audience and cannot document Machiavelli or antiquity.', sourceIds: ['brutus-louvre', 'brutus-commons']},
      ]},
      {heading: 'Following the Discourses', items: [
        {label: 'Tumults and liberty', description: 'Institutionally expressed conflict between elites and people can generate safeguards rather than mere disorder.', sourceIds: ['discourses-primary', 'machiavelli-sep']},
        {label: 'Corruption and renewal', description: 'Laws depend on civic capacities that can decay, making reform difficult and sometimes dangerous.', sourceIds: ['discourses-primary', 'machiavelli-sep']},
      ]},
    ],
    resolution: 'Resolved: replaced the false 1540 title-page interpretation with the installed Louvre Brutus painting, added its official object record and reception boundary, mapped republican claims to the Discourses and current scholarship, restored the natural landscape mount, and linked the current Niccolò Machiavelli article.',
    lock: 'fnv1a64:f92fe0ababb845b7',
  },
  'ficino-enneads': {
    plaqueTitle: 'Ficino-Annotated Manuscript of Plotinus’s Enneads',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'philosopher', id: 'ficino'}],
    articleTitle: 'Marsilio Ficino',
    invitation: 'Ficino’s working Greek manuscript makes the reading, annotation, translation, and reinterpretation behind Renaissance Platonism visible without pretending to preserve an ancient original.',
    objectInterpretation: 'BnF Grec 1816 is a Renaissance Greek manuscript of Plotinus copied by Ioannes Scoutariotes and densely annotated by Marsilio Ficino. Sources date the copy approximately rather than uniformly, so the Atlas retains c. 1460 and discloses that limit. It is Ficino’s working witness, not Plotinus’s autograph or proof of a formal Florentine academy.',
    overrides: {
      displayName: 'Ficino-Annotated Manuscript of Plotinus’s Enneads',
      shortTitle: 'Ficino’s Working Enneads',
      workLabel: 'ANNOTATED GREEK MANUSCRIPT · RENAISSANCE PLATONISM',
      dateLabel: 'BnF Grec 1816 · copied c. 1460 · annotated by Marsilio Ficino',
      frontSubtitle: 'Reading marks at the material center of translation and commentary',
    },
    paragraphs: [
      'Greek text occupies the center of this manuscript page while dense notes press into its margins. Bibliothèque nationale de France Grec 1816 was copied by Ioannes Scoutariotes and annotated extensively by Marsilio Ficino as he worked with Plotinus. The Atlas source and BnF-associated scholarship agree on the manuscript’s identity and working use but do not yield one perfectly reconciled copy date: c. 1460 remains an appropriately approximate catalog label, while related scholarship sometimes gives a later year. The page is a Renaissance object, not an ancient witness from Plotinus’s lifetime. Its handwriting and marginal density establish sustained reading, but no single photographed folio can summarize every note or stage of translation.',
      'Ficino’s Latin Plotinus emerged from comparison, lexical choice, philosophical interpretation, and repeated revision rather than direct transfer between equivalent words. Plotinus’s difficult accounts of the One, Intellect, Soul, procession, return, contemplation, and embodied life presented conceptual as well as linguistic problems. Ficino read those problems through his own Christian Platonism and through other ancient and late-antique authors, so his translation also became an argument about how the tradition should be ordered. The annotations make that intellectual labor visible. They do not show that Ficino simply restored an unchanged system, and they cannot prove that every later doctrine called “Neoplatonic” was present in one stable source.',
      'The manuscript also corrects the familiar story of a solitary Renaissance genius. Its production and survival involved a Greek copyist, collections, teachers, patrons, libraries, and later custodians as well as Ficino’s own expertise. Ficino’s translations and commentaries widened Latin access to Plato and Platonists while transforming their reception in theology, natural philosophy, theories of love, and accounts of the soul. Claims about a “Platonic Academy” in Florence remain historically contested and should not be inferred from the page. The linked Ficino article supplies the canonical intellectual biography. Grec 1816 contributes a narrower but unusually direct object lesson: philosophical afterlives are made in the marks of readers who preserve by interpreting.',
    ],
    paragraphSourceIds: [['ficino-manuscript', 'ficino-bnf'], ['ficino-bnf', 'ficino-sep'], ['ficino-bnf', 'ficino-sep']],
    sources: [
      collection('ficino-manuscript', 'Wikimedia Commons — BnF Grec 1816, Plotinus annotated by Ficino', 'https://commons.wikimedia.org/wiki/File:Plotinus,_Enneads,_Paris,_B.N.,_Gr._1816.jpg'),
      academic('ficino-bnf', 'Bibliothèque nationale de France research blog — Ficino’s annotated Plotinus manuscript', 'https://bnf.hypotheses.org/78'),
      collection('ficino-biblissima', 'Biblissima IIIF — BnF Grec 1816 manifest', 'https://iiif.biblissima.fr/collections/manifest/9dfa82a5d723a64a9fc28429d3028c8d5a218598'),
      academic('ficino-sep', 'Stanford Encyclopedia of Philosophy — Marsilio Ficino', 'https://plato.stanford.edu/entries/ficino/'),
    ],
    visitorGuide: [
      {heading: 'What the page establishes', items: [
        {label: 'A working manuscript', description: 'Scoutariotes copied the Greek text, and Ficino’s dense annotations record sustained Renaissance engagement.', sourceIds: ['ficino-manuscript', 'ficino-bnf']},
        {label: 'Approximate dating', description: 'Catalog and scholarly descriptions do not support pretending that one exact copy year is fully settled.', sourceIds: ['ficino-bnf', 'ficino-biblissima']},
      ]},
      {heading: 'How translation transforms', items: [
        {label: 'Conceptual choices', description: 'Rendering Plotinus in Latin required decisions about vocabulary, argument, and the relation among Platonist texts.', sourceIds: ['ficino-bnf', 'ficino-sep']},
        {label: 'Christian Platonism', description: 'Ficino’s reception joined ancient sources to his own theological and philosophical commitments.', sourceIds: ['ficino-sep']},
      ]},
    ],
    resolution: 'Resolved: verified BnF Grec 1816 as Ficino’s annotated Renaissance working manuscript, preserved the copy-date limit, rejected ancient-original and formal-Academy inferences, added claim-level sources and a factual plaque, registered the installed derivatives, restored the natural ratio, and linked the current Marsilio Ficino article.',
    lock: 'fnv1a64:22b84d34d27c54d8',
  },
  'bacon-great-instauration': {
    plaqueTitle: 'Frontispiece to Instauratio magna',
    plaqueType: 'work-or-text',
    canonicalContexts: [{kind: 'philosopher', id: 'bacon'}],
    articleTitle: 'Francis Bacon',
    invitation: 'Simon Pass’s 1620 frontispiece casts Bacon’s planned reform of inquiry as a voyage beyond inherited limits while leaving the program’s incompleteness and ambitions open to judgment.',
    objectInterpretation: 'The installed engraving is the frontispiece to the 1620 London Instauratio magna. Its lower edge bears Simon Pass’s engraved signature; a ship sails between the Pillars of Hercules. The source scan is not itself the Bodleian exemplar used to corroborate the signature, and the image is a programmatic emblem rather than a neutral diagram of one modern scientific method.',
    overrides: {
      displayName: 'Frontispiece to Instauratio magna',
      shortTitle: 'The Great Instauration Frontispiece',
      workLabel: 'PROGRAMMATIC ENGRAVING · REFORM OF INQUIRY',
      dateLabel: 'Simon Pass, engraver · London, 1620 · source copy at Oklahoma',
      frontSubtitle: 'A voyage emblem for an unfinished reorganization of knowledge',
    },
    paragraphs: [
      'A ship moves into open water between two monumental columns on the frontispiece to Francis Bacon’s Instauratio magna, printed in London in 1620. The engraving carries the signature of Simon Pass, whose role is corroborated by a Bodleian copy record; the installed reproduction comes through a different source scan, so the Atlas does not merge the two exemplars’ provenance. The Pillars of Hercules conventionally marked a limit at the entrance to the Atlantic, and the ship turns that boundary into an image of attempted passage. This is an edition frontispiece and public program statement, not a laboratory scene, a diagram of induction, or proof that knowledge advances automatically by exploration.',
      'The Great Instauration proposed a large, unfinished reform rather than one completed book or recipe. Bacon planned a survey of existing learning, a new instrument for interpreting nature, organized natural and experimental histories, examples of inquiry in action, provisional results, and a philosophy still to be achieved. Novum Organum supplied the most famous methodological part, including the four “idols” that name recurrent sources of error in human thinking and language. Bacon’s natural histories were meant to order observations and experiments so that investigators could move cautiously toward axioms. The program depends on selection, comparison, exclusion, instruments, skilled labor, and cooperation; it is not a command to collect facts without concepts.',
      'The voyage image has real rhetorical force, but it should not become a triumphalist logo for “the scientific method.” Bacon criticized inherited systems while drawing on existing crafts, texts, institutions, and imperial ambitions. He joined knowledge to practical power and relief of the human condition, language that later readers have assessed both as productive and as entangled with mastery, extraction, and control. The frontispiece alone cannot settle those interpretations or turn every later science into Bacon’s achievement. It makes a narrower claim visible: inherited boundaries may be crossed through disciplined collective work. The linked Francis Bacon article explains the program, its theological and political setting, its unfinished state, and the disputes that a heroic ship can otherwise conceal.',
    ],
    paragraphSourceIds: [['instauration-commons', 'instauration-bodleian'], ['bacon-sep', 'instauration-primary'], ['instauration-bodleian', 'bacon-sep']],
    sources: [
      collection('instauration-commons', 'Wikimedia Commons — Instauratio magna frontispiece, 1620', 'https://commons.wikimedia.org/wiki/File:Bacon_Great_Instauration_frontispiece.jpg'),
      collection('instauration-bodleian', 'Bodleian Cabinet — title page and frontispiece of Bacon’s Instauratio magna', 'https://www.cabinet.ox.ac.uk/title-page-francis-bacons-instauratio-magna-1620'),
      primary('instauration-primary', 'Biodiversity Heritage Library — Francis Bacon, Instauratio magna, 1620', 'https://www.biodiversitylibrary.org/item/86613'),
      academic('bacon-sep', 'Stanford Encyclopedia of Philosophy — Francis Bacon', 'https://plato.stanford.edu/entries/francis-bacon/'),
    ],
    visitorGuide: [
      {heading: 'Reading the planned reform', items: [
        {label: 'Six-part design', description: 'Bacon outlined a sequence from surveying knowledge through histories and method toward a philosophy never completed.', sourceIds: ['bacon-sep', 'instauration-primary']},
        {label: 'The idols', description: 'Recurring errors arise from human nature, individual formation, language, and inherited systems or performances.', sourceIds: ['bacon-sep', 'instauration-primary']},
      ]},
      {heading: 'Keeping the emblem bounded', items: [
        {label: 'Pillars and passage', description: 'The ship turns a conventional geographical limit into a claim about extending inquiry.', sourceIds: ['instauration-bodleian']},
        {label: 'No single method', description: 'A programmatic frontispiece cannot stand for every practice, institution, or result of modern science.', sourceIds: ['bacon-sep']},
      ]},
    ],
    resolution: 'Resolved: identified the installed 1620 frontispiece and Simon Pass signature, kept exemplar provenance separate, mapped the unfinished six-part program and its contested ambitions, replaced a generic science emblem with a factual plaque, preserved natural proportions, and linked the current Francis Bacon article.',
    lock: 'fnv1a64:effcb6449d0c1c19',
  },
  'bacon-novum-organum': {
    plaqueTitle: 'Novum Organum Scientiarum, Leiden 1645',
    plaqueType: 'work-or-text',
    canonicalContexts: [{kind: 'philosopher', id: 'bacon'}],
    articleTitle: 'Francis Bacon',
    invitation: 'This posthumous Leiden edition preserves Bacon’s method book within the wider Great Instauration, joining a critique of intellectual idols to organized comparison, exclusion, and provisional ascent.',
    objectInterpretation: 'Houghton Library’s *EC.B1328.620ib is a 1645 Leiden edition of Novum Organum Scientiarum, published after Bacon’s death. The installed title page shows dense type and a ship emblem, but it is not the 1620 first printing. It witnesses the work’s continued publication, not the completion of the Great Instauration or one universal scientific procedure.',
    overrides: {
      displayName: 'Novum Organum Scientiarum, Leiden 1645',
      shortTitle: 'The 1645 Novum Organum',
      workLabel: 'POSTHUMOUS EDITION · BACONIAN METHOD',
      dateLabel: 'Leiden, 1645 · Houghton Library, *EC.B1328.620ib',
      frontSubtitle: 'A later title page for the methodological center of an unfinished program',
    },
    paragraphs: [
      'Black type fills the installed title page of Novum Organum Scientiarum, with a small ship between columns beneath the text. Houghton Library identifies the volume as a Leiden edition of 1645, shelfmark *EC.B1328.620ib. It appeared nineteen years after Bacon’s death and should not be confused with the 1620 first printing issued within Instauratio magna. The Atlas derivatives preserve the page’s natural portrait ratio and the Commons and Harvard records preserve its institutional and reuse trail. The object securely establishes a posthumous edition and the printed title. It cannot establish that Bacon approved this setting, that the entire Great Instauration was finished, or that one page pictures the method it names.',
      'Novum Organum diagnoses obstacles before prescribing inquiry. Idols of the tribe arise from shared human tendencies; idols of the cave from individual formation; idols of the marketplace from language; and idols of the theatre from received systems presented as authoritative worlds. The categories do not promise a mind emptied of assumptions. They ask investigators to expose how expectation, words, favored examples, and premature theories shape what counts as evidence. Bacon then organizes instances in tables of presence, absence, and degree and uses exclusion to narrow possible explanations. His induction is constructive and iterative, not simple enumeration, and its terminology belongs to an early modern project rather than a completed manual for contemporary experimental science.',
      'The work seeks a cautious ascent from ordered experience toward increasingly general axioms, with new experiments testing and extending the results. Negative and unusual instances can be especially valuable because they interrupt easy generalization. Even so, Bacon’s examples, natural histories, instruments, institutions, and ambitions remain historically situated, and later scientific practices did not simply execute his plan. The 1645 page’s returning ship links the book visually to the larger Instauration while also documenting an afterlife beyond its original publication. The linked Francis Bacon article supplies the canonical account of the idols, induction, natural history, collaboration, practical power, and enduring criticism. This edition adds evidence of transmission without pretending that print converted a disputed project into settled method.',
    ],
    paragraphSourceIds: [['novum-commons', 'novum-harvard'], ['novum-primary', 'bacon-sep'], ['novum-primary', 'bacon-sep', 'novum-harvard']],
    sources: [
      collection('novum-commons', 'Wikimedia Commons — Houghton Library 1645 Novum Organum title page', 'https://commons.wikimedia.org/wiki/File:Houghton_EC.B1328.620ib_-_Novum_organum_scientiarum.jpg'),
      collection('novum-harvard', 'Harvard Library — Novum Organum Scientiarum, *EC.B1328.620ib', 'https://id.lib.harvard.edu/aleph/004174768/catalog'),
      primary('novum-primary', 'Francis Bacon — Novum Organum, Wikisource', 'https://en.wikisource.org/wiki/Novum_Organum'),
      academic('bacon-sep', 'Stanford Encyclopedia of Philosophy — Francis Bacon', 'https://plato.stanford.edu/entries/francis-bacon/'),
    ],
    visitorGuide: [
      {heading: 'Before induction begins', items: [
        {label: 'Four idols', description: 'Bacon distinguishes shared tendencies, personal formation, misleading language, and inherited systems as recurrent risks.', sourceIds: ['novum-primary', 'bacon-sep']},
        {label: 'Not a blank mind', description: 'The discipline identifies and tests expectations; it does not claim investigators can observe without concepts.', sourceIds: ['bacon-sep']},
      ]},
      {heading: 'Building and testing axioms', items: [
        {label: 'Organized instances', description: 'Presence, absence, degree, and strategically chosen cases help compare possible explanations.', sourceIds: ['novum-primary', 'bacon-sep']},
        {label: 'Provisional ascent', description: 'Axioms guide further inquiry and remain answerable to new experiments rather than ending investigation.', sourceIds: ['novum-primary', 'bacon-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Houghton’s posthumous 1645 Leiden edition, separated it from the 1620 first printing and larger Instauration, mapped the idols and inductive procedure to primary and specialist sources, corrected the factual plaque and mount, and linked the current Francis Bacon article.',
    lock: 'fnv1a64:b060583acb22615c',
  },
  'galileo-moon': {
    plaqueTitle: 'Lunar Illustrations from Sidereus Nuncius',
    plaqueType: 'work-or-text',
    canonicalContexts: [{kind: 'philosopher', id: 'galileo'}],
    articleTitle: 'Galileo Galilei',
    invitation: 'Galileo used printed lunar views to argue that telescopic light and shadow disclosed an uneven Moon, making instrument, drawing, geometry, and interpretation work together as evidence.',
    objectInterpretation: 'The installed sequence reproduces printed lunar illustrations published in Sidereus Nuncius in March 1610. They render observations through drawing and print rather than preserving camera-like images or autonomous original watercolors. The supplied record does not establish the hand responsible for every engraved line, so authorship of the reproduction remains bounded.',
    overrides: {
      displayName: 'Lunar Illustrations from Sidereus Nuncius',
      shortTitle: 'Galileo’s Printed Moon',
      workLabel: 'PRINTED OBSERVATION · TELESCOPIC ASTRONOMY',
      dateLabel: 'Sidereus Nuncius · Venice, March 1610',
      frontSubtitle: 'Five printed views joining telescopic appearance to geometrical inference',
    },
    paragraphs: [
      'Five round lunar views occupy the installed page, their light and dark fields changing from image to image. They are printed illustrations associated with Galileo’s Sidereus Nuncius, published in Venice in March 1610, not photographs of the Moon or free-standing modern diagrams. The Smithsonian and digitized-book records support their relation to the 1610 publication, while the Commons derivative supplies the public-domain reuse record. Calling them “sketches” is common and defensible when it describes Galileo’s observational representations, but the displayed forms reached readers through a printed edition and workshop process. The source does not identify the maker of every reproduced line or equate these prints with any surviving original drawing.',
      'Galileo focused on the changing boundary between lunar day and night, now called the terminator. Isolated bright points in the dark region and pockets of darkness in the illuminated region suggested peaks and hollows catching or losing sunlight at different times. Geometry helped turn those appearances into estimates and arguments about relief. The conclusion challenged accounts of a perfectly smooth heavenly sphere, but it did not follow from one unmediated glance. The telescope limited field and clarity; the observer had to aim, refocus, compare phases, translate fleeting views into stable marks, and persuade readers who might distrust the device. Observation, instrument, drawing, and inference formed one evidential practice.',
      'The printed sequence therefore makes mediation visible rather than weakening the observation. Repeatable patterns across nights and observers could discipline interpretation, while publication allowed claims to travel far beyond a single eyepiece. Yet drawings also select contrast, scale, and emphasis, and the page cannot show exactly what any observer saw at a particular moment. Galileo’s lunar argument belongs beside his observations of Jupiter’s moons, the Milky Way, and later solar phenomena, as well as disputes about instruments and physical explanation. The linked Galileo article supplies that broader context and the controversies surrounding his natural philosophy. This object contributes a precise lesson: new evidence becomes persuasive through trained representation and public testing, not because a device eliminates judgment.',
    ],
    paragraphSourceIds: [['moon-commons', 'moon-smithsonian', 'sidereus-primary'], ['sidereus-primary', 'galileo-sep'], ['moon-smithsonian', 'galileo-sep']],
    sources: [
      collection('moon-commons', 'Wikimedia Commons — Galileo lunar illustrations', 'https://commons.wikimedia.org/wiki/File:Galileo%27s_sketches_of_the_moon.png'),
      collection('moon-smithsonian', 'Smithsonian National Air and Space Museum — Galileo’s sketches of the Moon', 'https://airandspace.si.edu/multimedia-gallery/image/galileossketchesofthemoonpng'),
      primary('sidereus-primary', 'Smithsonian Libraries — Sidereus Nuncius, 1610', 'https://library.si.edu/digital-library/book/sidereusnuncius00gali'),
      academic('galileo-sep', 'Stanford Encyclopedia of Philosophy — Galileo Galilei', 'https://plato.stanford.edu/entries/galileo/'),
    ],
    visitorGuide: [
      {heading: 'From light to relief', items: [
        {label: 'The terminator', description: 'An irregular boundary between light and darkness helps reveal changing shadows near possible peaks and hollows.', sourceIds: ['sidereus-primary', 'galileo-sep']},
        {label: 'Geometrical inference', description: 'Observed illumination becomes an argument about surface relief through comparison, geometry, and assumptions about sunlight.', sourceIds: ['sidereus-primary', 'galileo-sep']},
      ]},
      {heading: 'How the evidence travels', items: [
        {label: 'Instrumental seeing', description: 'A narrow, imperfect telescope required trained aiming, focusing, repetition, and comparison.', sourceIds: ['galileo-sep']},
        {label: 'Printed mediation', description: 'The published views stabilize appearances for readers but do not reproduce an observer’s sight without selection.', sourceIds: ['moon-smithsonian', 'sidereus-primary']},
      ]},
    ],
    resolution: 'Resolved: identified the installed images as printed lunar illustrations in the 1610 Sidereus Nuncius, bounded hand and reproduction claims, mapped relief inference and instrumental mediation, preserved public-domain attribution and natural proportions, and linked the current Galileo Galilei article.',
    lock: 'fnv1a64:44ec26ed65760a7b',
  },
  'galileo-telescopes': {
    plaqueTitle: 'Galileo’s Telescopes, Inv. 2427 and 2428',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'philosopher', id: 'galileo'}],
    articleTitle: 'Galileo Galilei',
    invitation: 'These surviving instruments show the crafted materials and optical limits that made Galileo’s observations possible while reminding us that neither tube remains an untouched window onto 1610.',
    objectInterpretation: 'Zde’s 2022 photograph shows Galileo’s surviving telescopes, Museo Galileo inv. 2427 and 2428. The two instruments differ in date and construction, and catalog records note later changes, including a lost and replaced eyepiece. The photograph is licensed CC BY-SA 4.0; it does not show every optical component in original condition.',
    overrides: {
      displayName: 'Galileo’s Telescopes, Inv. 2427 and 2428',
      shortTitle: 'The Surviving Telescopes',
      workLabel: 'SCIENTIFIC INSTRUMENTS · CRAFTED OBSERVATION',
      dateLabel: 'Late 1609–c. 1610 · Museo Galileo, Florence · photograph 2022',
      frontSubtitle: 'Two material instruments whose limits shaped what observers could see',
    },
    paragraphs: [
      'Two long tubes lie horizontally in Zde’s 2022 photograph of Museo Galileo inventory numbers 2427 and 2428. Catalog records date one to about 1610 and the other to late 1609 or early 1610, while distinguishing constructions that use wood, paper, leather, and copper in different combinations. The instruments are associated with Galileo as maker and designer, but they have histories after their first use. The museum notes, for example, that the eyepiece of inv. 2428 was lost and replaced. The photograph carries a CC BY-SA 4.0 license and the installed files preserve its wide composition. It documents surviving instruments, not untouched optical systems frozen at a single night of observation.',
      'Galileo did not invent the telescope. Reports and examples of a Dutch device reached Italy in 1609, and he rapidly improved designs, demonstrated them, and turned them toward the sky. Magnification and resolution expanded what could be examined, but early lenses also produced narrow fields, dim images, distortion, and demanding alignment. Observations of the Moon, Jupiter’s satellites, and the Milky Way depended on making the instrument work reliably enough to distinguish recurring appearances from defects. Craft knowledge therefore entered philosophical argument. A claim about the heavens was also a claim that a tube, its lenses, the observer’s practice, and repeated comparisons deserved trust.',
      'Trust developed socially as well as optically. Galileo supplied instruments, invited observers, published images and tables, and argued against critics who attributed unexpected appearances to illusion. Agreement was neither immediate nor automatic, and present museum objects cannot reproduce exactly what every seventeenth-century observer saw. They instead reveal the material scale of the problem: knowledge emerged through fragile devices that could be inspected, improved, imitated, and disputed. The linked Galileo article situates this work within mathematical natural philosophy, patronage, publication, and later conflict over cosmology. The telescopes add an object-led caution to that account. Extending perception never removes interpretation; it creates new responsibilities for calibration, disclosure, repetition, and the handling of instrument-specific error.',
    ],
    paragraphSourceIds: [['telescopes-commons', 'telescope-museo', 'telescope-gallery'], ['telescope-gallery', 'galileo-sep'], ['telescope-museo', 'galileo-sep']],
    sources: [
      collection('telescopes-commons', 'Wikimedia Commons — Zde photograph of Galileo’s telescopes', 'https://commons.wikimedia.org/wiki/File:Galilei_telescopes%2C_Museo_Galileo%2C_Florence%2C_Inv._242%2C_2428%2C_224088.jpg'),
      collection('telescope-museo', 'Museo Galileo — Galileo telescope, inv. 2428', 'https://catalogo.museogalileo.it/oggetto/CannocchialeGalileo_n01.html'),
      collection('telescope-gallery', 'Museo Galileo — Telescope: Observing and Measuring Celestial Phenomena', 'https://catalogo.museogalileo.it/sezione/TelescopioOsservareMisurareFenomeniCelesti.html'),
      academic('galileo-sep', 'Stanford Encyclopedia of Philosophy — Galileo Galilei', 'https://plato.stanford.edu/entries/galileo/'),
    ],
    visitorGuide: [
      {heading: 'Inspecting the instruments', items: [
        {label: 'Different constructions', description: 'The two catalogued tubes use different combinations of wood, paper, leather, and copper.', sourceIds: ['telescope-museo', 'telescope-gallery']},
        {label: 'Altered components', description: 'Survival does not mean untouched condition; inv. 2428 has lost and replaced optical parts.', sourceIds: ['telescope-museo']},
      ]},
      {heading: 'Making sight credible', items: [
        {label: 'Optical limits', description: 'Magnification arrived with restricted field, dimness, distortion, and the need for practiced alignment.', sourceIds: ['telescope-gallery', 'galileo-sep']},
        {label: 'Public testing', description: 'Instruments, published observations, demonstrations, and repetition helped contested appearances become shared evidence.', sourceIds: ['galileo-sep']},
      ]},
    ],
    resolution: 'Resolved: verified the installed 2022 photograph and both Museo Galileo instruments, corrected the inventory wording, distinguished construction and later alteration, mapped instrumental trust without an invention myth, preserved CC BY-SA attribution and natural proportions, and linked the current Galileo Galilei article.',
    lock: 'fnv1a64:43ac0a6086639ec3',
  },
  'putney-debates': {
    plaqueTitle: 'Foundations of Freedom; or, An Agreement of the People',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'hobbes'}],
    articleTitle: 'Thomas Hobbes',
    invitation: 'This 1648 Agreement preserves one constitutional path associated with arguments around Putney, offering a careful comparison with Hobbes’s rival account of authorization and undivided sovereignty.',
    objectInterpretation: 'The installed title page reads Foundations of Freedom; or, An Agreement of the People and belongs to a 1648 printed edition. It is not a transcript, image, or artifact of the October 1647 meetings at Putney. Its anonymous Leveller-associated authorship and exact copy history remain bounded by the supplied Internet Archive and Commons record.',
    overrides: {
      displayName: 'Foundations of Freedom; or, An Agreement of the People',
      shortTitle: 'The 1648 Agreement of the People',
      workLabel: 'PRINTED CONSTITUTIONAL PROPOSAL · PUTNEY AFTERLIFE',
      dateLabel: 'Printed 1648 · Internet Archive agreement1648 · exact copy provenance limited',
      frontSubtitle: 'A later proposal beside competing claims about consent, property, and public authority',
    },
    paragraphs: [
      'The installed page announces Foundations of Freedom; or, An Agreement of the People and addresses a proposed settlement to the English nation. Its source record dates the printed edition to 1648, after the Army Council discussions held at Putney in October 1647. The University of Missouri–Columbia digitization mark visible in the derivative helps trace the scan, but the supplied catalog does not give a complete physical-copy provenance or named author. The document belongs to Leveller-associated constitutional argument while remaining an anonymous publication in this record. It is not the surviving report of the Putney Debates, a photograph of the meetings, or proof that every participant endorsed one Agreement.',
      'At Putney, New Model Army officers and elected soldier representatives argued over political authority after civil war. Speakers associated with Leveller positions pressed consent and a wider franchise; Henry Ireton and others defended stronger ties between political voice, property, and an established social order. The surviving record preserves unusually extended disagreement but is itself reported and transmitted rather than a neutral recording. “The people” did not have one uncontested definition, and neither the soldiers nor the Levellers spoke with one voice. Later versions of the Agreement developed proposals for representative government, legal equality, religious liberty, and limits on public power while changing across drafts and political circumstances.',
      'Thomas Hobbes did not participate at Putney, so the exhibit presents comparison rather than direct influence. Hobbes also begins from conflict, equality of vulnerability, and the need to authorize a public power, but he argues that divided final authority threatens the peace a commonwealth must secure. An Agreement instead makes constitutional limits and representative settlement central. The contrast clarifies questions both positions must answer: who authorizes, which people count, what rights survive agreement, and how can a settlement bind dissenters without returning to war? The 1648 title page cannot resolve those questions or stand for modern democracy. It gives one material route through a crowded revolutionary debate beside the linked Hobbes article’s account of covenant, authorization, sovereignty, protection, and resistance.',
    ],
    paragraphSourceIds: [['agreement-commons'], ['putney-archives', 'putney-primary'], ['hobbes-moral-sep', 'agreement-commons', 'putney-archives']],
    sources: [
      collection('agreement-commons', 'Wikimedia Commons — Foundations of Freedom; or, An Agreement of the People, 1648', 'https://commons.wikimedia.org/wiki/File:Agreement_of_the_people_(1648_edition)_(IA_agreement1648).djvu'),
      primary('putney-primary', 'Wikisource — The Putney Debates', 'https://en.wikisource.org/wiki/The_Putney_Debates'),
      academic('putney-archives', 'The National Archives — The Putney Debates', 'https://www.nationalarchives.gov.uk/explore-the-collection/on-the-record-podcast/on-the-record-the-putney-debates/'),
      academic('hobbes-moral-sep', 'Stanford Encyclopedia of Philosophy — Hobbes’s Moral and Political Philosophy', 'https://plato.stanford.edu/entries/hobbes-moral/'),
    ],
    visitorGuide: [
      {heading: 'Separating meeting and document', items: [
        {label: 'Putney, 1647', description: 'Army officers and representatives disputed consent, franchise, property, and the shape of a postwar settlement.', sourceIds: ['putney-primary', 'putney-archives']},
        {label: 'Agreement, 1648', description: 'The installed later publication develops one constitutional line and is not the meeting transcript.', sourceIds: ['agreement-commons']},
      ]},
      {heading: 'Comparing authorization', items: [
        {label: 'Representative limits', description: 'Agreement proposals place settlement, elections, and reserved protections at the center of public authority.', sourceIds: ['agreement-commons', 'putney-primary']},
        {label: 'Hobbesian sovereignty', description: 'Hobbes asks how authorization can create one final public judgment capable of securing protection.', sourceIds: ['hobbes-moral-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the installed plural title and 1648 object identity, separated the Agreement from the Putney report and its internal disagreements, mapped the Hobbes comparison without inventing participation or influence, preserved public-domain attribution and natural proportions, and linked the current Thomas Hobbes article.',
    lock: 'fnv1a64:b2c652eda0401ade',
  },
  'hobbes-leviathan': {
    plaqueTitle: 'Leviathan',
    plaqueType: 'work-or-text',
    canonicalContexts: [{kind: 'philosopher', id: 'hobbes'}],
    articleTitle: 'Thomas Hobbes',
    invitation: 'The 1651 frontispiece makes Hobbes’s artificial commonwealth visible as one public person composed through authorization, while leaving plural subjects, protection, and coercive power in view.',
    objectInterpretation: 'The installed 1651 frontispiece is commonly attributed to Abraham Bosse, working with input from Hobbes. A giant sovereign composed of many people rises above a city and holds sword and crozier. The Commons record derives from a British Library image but supplies no complete institutional catalog entry; the engraving interprets the argument rather than proving unlimited rule.',
    overrides: {
      displayName: 'Leviathan Frontispiece',
      shortTitle: 'The Composite Sovereign',
      workLabel: 'POLITICAL ENGRAVING · AUTHORIZATION AND UNITY',
      dateLabel: 'Abraham Bosse, with Hobbes’s input · London, 1651 · British Library-derived image',
      frontSubtitle: 'Many persons pictured as one artificial commonwealth',
    },
    paragraphs: [
      'A crowned giant rises above a walled city in the 1651 frontispiece to Leviathan. His torso and arms are composed of many small human figures turned toward his head, while a sword and crozier divide temporal and ecclesiastical signs. The design is commonly credited to Abraham Bosse with input from Thomas Hobbes, wording that preserves collaboration rather than assigning every line securely to one maker. The installed files match a Commons record derived from a British Library image and preserve the engraving’s natural portrait ratio, but the supplied page is not a full object catalog with copy-level provenance. The frontispiece is a sophisticated interpretation of the book, not a literal constitutional diagram.',
      'Hobbes describes a commonwealth as an artificial person created when individuals authorize one actor or assembly to speak and act in their name. The image’s many bodies and single head make that construction memorable: unity is political and representational, not a biological fusion in which subjects cease to exist. Authorization answers the problem of competing private judgments about danger, justice, and enforcement. Hobbes argues that a final public authority must be undivided enough to secure peace, and he treats religious jurisdiction as a central source of destabilizing rivalry. This is stronger than ordinary limited-government theory, but it does not make every private wish of a ruler identical with the office of sovereign representation.',
      'Protection supplies a crucial boundary. Subjects covenant with one another to authorize a sovereign, yet each retains the inalienable effort to preserve life, and an authority unable to protect may lose the practical claim to obedience in the relevant case. How far that limit extends, whether authorization genuinely grounds obligation, and whether the theory licenses oppressive power remain major disputes. The frontispiece can obscure those questions if its giant is read only as a celebration of domination. It can also sharpen them: the small figures remain visible within the person who acts for them. The linked Thomas Hobbes article follows state of nature, covenant, representation, sovereignty, religion, protection, and resistance across the full argument rather than letting one famous image settle the case.',
    ],
    paragraphSourceIds: [['leviathan-commons'], ['leviathan-primary', 'hobbes-moral-sep'], ['leviathan-primary', 'hobbes-moral-sep']],
    sources: [
      collection('leviathan-commons', 'Wikimedia Commons — Leviathan frontispiece, British Library-derived image', 'https://commons.wikimedia.org/wiki/File:Leviathan_frontispiece_cropped_British_Library.jpg'),
      primary('leviathan-primary', 'Thomas Hobbes — Leviathan, Project Gutenberg', 'https://www.gutenberg.org/ebooks/3207'),
      academic('hobbes-moral-sep', 'Stanford Encyclopedia of Philosophy — Hobbes’s Moral and Political Philosophy', 'https://plato.stanford.edu/entries/hobbes-moral/'),
    ],
    visitorGuide: [
      {heading: 'Constructing the commonwealth', items: [
        {label: 'Authorization', description: 'Individuals make another actor’s public acts count as theirs, creating political representation.', sourceIds: ['leviathan-primary', 'hobbes-moral-sep']},
        {label: 'Artificial person', description: 'The commonwealth acts as one person without literally erasing the many people who compose it.', sourceIds: ['leviathan-primary', 'hobbes-moral-sep']},
      ]},
      {heading: 'Testing sovereign power', items: [
        {label: 'Undivided judgment', description: 'Hobbes resists rival final authorities that could return public disputes to coercive conflict.', sourceIds: ['leviathan-primary', 'hobbes-moral-sep']},
        {label: 'Protection and resistance', description: 'Self-preservation cannot be wholly surrendered, and failed protection complicates obedience.', sourceIds: ['leviathan-primary', 'hobbes-moral-sep']},
      ]},
    ],
    resolution: 'Resolved: verified the installed 1651 frontispiece, qualified Bosse and Hobbes’s collaborative role and the copy-level provenance limit, mapped artificial personhood, authorization, sovereignty, and protection, restored the natural mount and factual plaque, and linked the current Thomas Hobbes article.',
    lock: 'fnv1a64:d3dd397768340bdf',
  },
  'hobbes-de-cive': {
    plaqueTitle: 'De Cive',
    plaqueType: 'work-or-text',
    canonicalContexts: [{kind: 'philosopher', id: 'hobbes'}],
    articleTitle: 'Thomas Hobbes',
    invitation: 'Jean Matheus’s 1642 frontispiece compresses liberty, civil dominion, and religion into allegory beside Hobbes’s early argument from vulnerability and covenant to a common public judge.',
    objectInterpretation: 'The installed engraving is Jean Matheus’s frontispiece to the 1642 Paris De Cive, Houghton Library *EC65 H6525 642e. Its figures allegorize liberty, dominion, and religion rather than depicting real societies. The page materially precedes Leviathan and witnesses an earlier formulation, but it cannot prove that Hobbes’s political theory never developed.',
    overrides: {
      displayName: 'De Cive Frontispiece',
      shortTitle: 'The 1642 De Cive',
      workLabel: 'POLITICAL ENGRAVING · LIBERTY, DOMINION, RELIGION',
      dateLabel: 'Thomas Hobbes and Jean Matheus · Paris, 1642 · Houghton Library',
      frontSubtitle: 'An early civil philosophy arranged through contested allegorical oppositions',
    },
    paragraphs: [
      'Jean Matheus’s engraved frontispiece organizes figures, emblems, and the title Elementorum philosophiae sectio tertia de cive into a compact vertical program. Houghton Library identifies the Paris 1642 volume as *EC65 H6525 642e and records Thomas Hobbes as author. The Atlas derivatives match the Houghton image and public-domain acquisition manifest, with only minor rounding between scene and panel proportions. The figures marked by liberty, civil power, and religion are allegorical constructions. They should not be treated as ethnographic depictions of peoples living inside and outside commonwealths, or as a neutral snapshot of political order. The engraving presents problems that the text argues through in an early public form.',
      'De Cive begins from natural equality understood partly as comparable vulnerability: even the strong can be threatened by combination, strategy, or surprise. Competition, insecurity, disputed judgment, and the absence of an enforceable common rule make peace precarious. Covenant can create obligations, but stable civil life requires a power able to interpret and enforce public rules. Hobbes’s “liberty” in the natural condition is therefore not an ideal of flourishing independence. It comes with exposure to others’ judgment and force. Civil obligation restricts action while making durable cooperation possible. The argument remains controversial because fear, consent, authorization, and genuine freedom do not fit together without difficult questions about coercion and alternatives.',
      'Published nearly a decade before Leviathan, De Cive is neither a disposable draft nor an identical duplicate of the later work. Hobbes revises presentation, develops representation and authorization more fully, and responds to changing controversies, while retaining strong commitments to final public authority and control of rival religious jurisdiction. The frontispiece’s vertical oppositions help readers see why religion belongs inside the civil argument rather than in a separate private compartment. They can also oversimplify: neither “liberty” nor “empire” names one uncontested lived condition. The linked Thomas Hobbes article follows continuities and changes across the corpus. This object anchors the 1642 publication and its visual rhetoric without freezing Hobbes’s political philosophy at the moment of one engraved page.',
    ],
    paragraphSourceIds: [['decive-commons', 'decive-harvard'], ['decive-primary', 'hobbes-moral-sep'], ['decive-primary', 'hobbes-moral-sep', 'decive-harvard']],
    sources: [
      collection('decive-commons', 'Wikimedia Commons — Houghton Library De Cive frontispiece, 1642', 'https://commons.wikimedia.org/wiki/File:Houghton_EC65_H6525_642e_-_Hobbes,_1642.jpg'),
      collection('decive-harvard', 'Harvard Library — De Cive, *EC65 H6525 642e', 'https://id.lib.harvard.edu/alma/990067818970203941/catalog'),
      primary('decive-primary', 'Thomas Hobbes — De Cive, Wikisource', 'https://en.wikisource.org/wiki/De_Cive'),
      academic('hobbes-moral-sep', 'Stanford Encyclopedia of Philosophy — Hobbes’s Moral and Political Philosophy', 'https://plato.stanford.edu/entries/hobbes-moral/'),
    ],
    visitorGuide: [
      {heading: 'From vulnerability to covenant', items: [
        {label: 'Natural equality', description: 'Comparable vulnerability means no person is secure enough to ignore the possible power of others.', sourceIds: ['decive-primary', 'hobbes-moral-sep']},
        {label: 'A common judge', description: 'Covenants need enforceable public interpretation if disagreement is not to return to private force.', sourceIds: ['decive-primary', 'hobbes-moral-sep']},
      ]},
      {heading: 'Reading an early formulation', items: [
        {label: 'Before Leviathan', description: 'De Cive states a mature civil argument while later works expand representation and rearrange its presentation.', sourceIds: ['decive-primary', 'hobbes-moral-sep']},
        {label: 'Religious jurisdiction', description: 'Competing claims to final spiritual and civil command form one political problem for Hobbes.', sourceIds: ['decive-primary', 'hobbes-moral-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Houghton’s 1642 De Cive and Jean Matheus’s allegorical frontispiece, prevented documentary readings of its figures, mapped vulnerability, covenant, authority, and corpus development, preserved public-domain attribution and natural proportions, and linked the current Thomas Hobbes article.',
    lock: 'fnv1a64:366ff6b3ff58af69',
  },
  'english-civil-war': {
    plaqueTitle: 'Parliamentary Pamphlet on the Royal Standard',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'hobbes'}],
    articleTitle: 'Thomas Hobbes',
    invitation: 'This partisan 1642 pamphlet depicts Charles I raising his standard at Nottingham, materializing the conflict of public authorities that Hobbes sought to answer without serving as neutral reportage.',
    objectInterpretation: 'The installed page is an anonymous parliamentary pamphlet depicting Charles I raising the royal standard at Nottingham on 22 August 1642. The Commons record derives from Nottinghamshire Heritage Gateway but supplies no stable holding identifier or full bibliography. It is contemporary partisan print, not a photograph, verified eyewitness report, or single cause of Hobbes’s theory.',
    overrides: {
      displayName: 'Parliamentary Pamphlet on the Royal Standard',
      shortTitle: 'The Royal Standard at Nottingham',
      workLabel: 'PARTISAN PRINT · CIVIL WAR AND RIVAL AUTHORITY',
      dateLabel: 'Anonymous parliamentary pamphlet · 22 August 1642 · holding unrecorded',
      frontSubtitle: 'A contemporary printed intervention in the breakdown of public judgment',
    },
    paragraphs: [
      'A woodcut shows Charles I and attendants raising the royal standard above a page of polemical print. The Commons record identifies the object as a parliamentary pamphlet concerning the Nottingham event of 22 August 1642 and derives the image from Nottinghamshire Heritage Gateway. It does not name the pamphleteer or woodcut artist, provide a shelfmark, identify a present holding institution, or establish that the image was made from direct observation. The Atlas therefore retains the approximate object description and public-domain status while keeping provenance limits explicit. Produced during the conflict, the page is evidence of partisan representation and circulation, not a neutral picture of how the event looked or what every reader believed.',
      'Raising the standard conventionally marked the opening of armed conflict between royal and parliamentary forces, but the English Civil Wars grew from accumulated disputes over taxation, religion, militia, law, representation, and the location of final authority. Neither crown nor Parliament formed an internally uniform camp, and the conflict changed across kingdoms, armies, localities, and years. Print helped competing parties frame legitimacy, danger, and blame. The pamphlet’s value lies partly in that active intervention: political crisis was argued through words and images while institutions and armed forces contested who could command. It cannot compress the wars into one royal gesture or make a partisan account synonymous with an agreed public record.',
      'Hobbes’s political thought responds to the danger of rival final judgments, but it should not be reduced to a trauma mechanically caused by one event. He had developed elements of his civil philosophy before open war and continued to revise them across De Cive and Leviathan. Civil conflict supplied urgent evidence for his claim that divided authority can make law and obligation practically indeterminate, while his solution—authorization of a sufficiently undivided sovereign—remains contestable in its own right. The pamphlet makes the historical problem visible without proving Hobbes’s answer. The linked article follows his accounts of fear, covenant, representation, religion, protection, and resistance, allowing visitors to distinguish a partisan artifact of breakdown from a philosophical argument about how public authority might be constituted.',
    ],
    paragraphSourceIds: [['civilwar-commons'], ['parliament-civilwar'], ['hobbes-sep', 'hobbes-moral-sep', 'parliament-civilwar']],
    sources: [
      collection('civilwar-commons', 'Wikimedia Commons — English Civil War parliamentary pamphlet, 1642', 'https://commons.wikimedia.org/wiki/File:English_Civil_War_parliamentary_pamphlet,_1642.jpg'),
      academic('parliament-civilwar', 'UK Parliament — the Civil War and parliamentary authority', 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/parliamentaryauthority/civilwar/'),
      academic('hobbes-sep', 'Stanford Encyclopedia of Philosophy — Thomas Hobbes', 'https://plato.stanford.edu/entries/hobbes/'),
      academic('hobbes-moral-sep', 'Stanford Encyclopedia of Philosophy — Hobbes’s Moral and Political Philosophy', 'https://plato.stanford.edu/entries/hobbes-moral/'),
    ],
    visitorGuide: [
      {heading: 'Reading a partisan page', items: [
        {label: 'Depiction, not photograph', description: 'The woodcut presents a political event through an anonymous parliamentary publication and an unverified viewpoint.', sourceIds: ['civilwar-commons']},
        {label: 'Incomplete provenance', description: 'The supplied record gives neither a current shelfmark nor a complete history of the photographed copy.', sourceIds: ['civilwar-commons']},
      ]},
      {heading: 'Connecting crisis and theory', items: [
        {label: 'Rival authority', description: 'Crown, Parliament, armies, churches, and local powers disputed who could issue binding public judgment.', sourceIds: ['parliament-civilwar']},
        {label: 'A philosophical response', description: 'Hobbes treats divided final authority as a danger, but the war does not by itself prove his sovereign solution.', sourceIds: ['hobbes-sep', 'hobbes-moral-sep']},
      ]},
    ],
    resolution: 'Resolved: retained the installed anonymous 1642 pamphlet only as partisan print with holder and eyewitness limits explicit, mapped civil-war context separately from Hobbes’s argument, added a factual plaque and exact article action, preserved public-domain attribution and natural proportions, and linked the current Thomas Hobbes article.',
    lock: 'fnv1a64:5a6a743d819198bd',
  },
  'hobbes-materialism-motion': {
    plaqueTitle: 'Document Displayed at Chatsworth House',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'philosopher', id: 'hobbes'}],
    articleTitle: 'Thomas Hobbes',
    invitation: 'Daderot’s 2016 photograph preserves an uncertain displayed document near Hobbes’s material world; the supplied record cannot verify its author, date, shelfmark, or direct relation to Galileo.',
    objectInterpretation: 'The installed image is Daderot’s 2016 CC0 photograph of a handwritten document displayed in Chatsworth House’s Oak Room. The Commons filename associates it with Hobbes and Galileo’s theory of motion, but the page supplies no catalog record, shelfmark, author verification, or object date. It is an evidentiary limit, not a secure Hobbes autograph.',
    overrides: {
      displayName: 'Document Displayed at Chatsworth House',
      shortTitle: 'An Unverified Motion Document',
      workLabel: 'DISPLAY PHOTOGRAPH · AUTHORSHIP AND DATE UNVERIFIED',
      dateLabel: 'Object metadata unverified · photographed by Daderot in 2016 · Chatsworth House',
      frontSubtitle: 'A material threshold whose missing provenance must remain visible',
      lead: 'A photographed document displayed at Chatsworth offers only a limited route into Hobbes’s accounts of body and motion. Its supplied record does not establish an autograph, date, or direct Galilean connection.',
    },
    paragraphs: [
      'Handwritten lines, calculations, and a small geometrical figure appear on a sheet photographed by Daderot in the Oak Room at Chatsworth House in 2016. The photographer dedicated the image under CC0, and the installed wide derivatives match the acquisition manifest. Beyond that, the available evidence is thin. The Commons filename calls the display “Notes on Galileo’s theory of motion, by Thomas Hobbes, 1600s,” but no linked Chatsworth catalog, shelfmark, author analysis, object date, or provenance chain supports those details. The Atlas therefore identifies what can be established—a photographed displayed document—and records the filename association only as unresolved context. It does not call the page a Hobbes autograph or seventeenth-century manuscript.',
      'Hobbes’s philosophy nevertheless gives body and motion fundamental explanatory roles. Sensation begins when external motion affects the sense organs and continues inward; imagination is decaying sense, and appetites and aversions name motions oriented toward or away from objects. Mental life is not an immaterial exception added to a mechanical universe. Hobbes also develops accounts of geometry, causation, optics, and method across different works and periods. “Materialism” is a useful label when it marks his rejection of incorporeal created substances, but it should not flatten every level of explanation into crude impact mechanics. Theories of speech, deliberation, representation, and social convention do philosophical work that a photographed calculation cannot display.',
      'Hobbes connects human motion and passion to politics without deriving sovereignty from physics in one deductive leap. Fear, desire, competition, reasoning, language, covenant, and authorization help explain why people can create a common power; normative questions about obligation and protection remain contested. Galileo belongs to Hobbes’s intellectual world, but the direction and extent of particular influences require source-specific study, not inference from a display label. The uncertain Chatsworth object is valuable precisely because it prevents a seamless origin story. The linked Thomas Hobbes article supplies the claim-reviewed account of science, mind, language, and commonwealth. The photograph contributes a disciplined reminder that material traces become historical evidence only when identity, custody, date, and relation have actually been established.',
    ],
    paragraphSourceIds: [['motion-document'], ['hobbes-science-sep', 'hobbes-sep'], ['hobbes-sep', 'hobbes-moral-sep', 'motion-document']],
    sources: [
      collection('motion-document', 'Wikimedia Commons — Daderot photograph of a document displayed at Chatsworth House', 'https://commons.wikimedia.org/wiki/File:Notes_on_Galileo%27s_theory_of_motion,_by_Thomas_Hobbes,_1600s_-_Oak_Room,_Chatsworth_House_-_Derbyshire,_England_-_DSC03056.jpg'),
      academic('hobbes-science-sep', 'Stanford Encyclopedia of Philosophy — Hobbes’s Philosophy of Science', 'https://plato.stanford.edu/entries/hobbes-science/'),
      academic('hobbes-sep', 'Stanford Encyclopedia of Philosophy — Thomas Hobbes', 'https://plato.stanford.edu/entries/hobbes/'),
      academic('hobbes-moral-sep', 'Stanford Encyclopedia of Philosophy — Hobbes’s Moral and Political Philosophy', 'https://plato.stanford.edu/entries/hobbes-moral/'),
    ],
    visitorGuide: [
      {heading: 'What the photograph cannot settle', items: [
        {label: 'No verified autograph', description: 'A filename and display context do not establish Hobbes’s hand, the object’s date, or a shelfmark.', sourceIds: ['motion-document']},
        {label: 'No direct influence proof', description: 'The photographed page cannot demonstrate a one-way line from Galileo’s mechanics to Hobbes’s system.', sourceIds: ['motion-document', 'hobbes-science-sep']},
      ]},
      {heading: 'Following Hobbes’s materialism', items: [
        {label: 'Sensation and motion', description: 'Hobbes explains sensation through bodily motion while distinguishing stages of perception and imagination.', sourceIds: ['hobbes-science-sep', 'hobbes-sep']},
        {label: 'Politics needs more', description: 'Language, covenant, authorization, obligation, and protection cannot be replaced by a mechanical diagram.', sourceIds: ['hobbes-sep', 'hobbes-moral-sep']},
      ]},
    ],
    resolution: 'Resolved: downgraded the filename’s unsupported autograph, date, and Galileo claims to an explicit evidence limit, corrected the asset-facing title and accessibility interpretation, mapped Hobbes’s science and politics without reductive derivation, preserved Daderot’s CC0 credit and natural ratio, and linked the current Thomas Hobbes article.',
    lock: 'fnv1a64:085d1e7c12cf1ddd',
  },
};

const reviewMethod = 'Galleries 12–13 supplemental review: exactly three concurrent GPT-5.6 Terra/High read-only evidence scopes of nine, nine, and eight non-overlapping exhibits were reconciled by the Sol parent across installed-object identity, attribution, dating, institution, provenance, rights, captions, alt text, claim-level sources, factual plaques, canonical relationships, exact article actions, current review locks, natural-ratio mounting, and desktop, mobile, and staged-3D presentation.';

const visualReview = (id: string): NonNullable<NonNullable<MuseumSupplementalExhibit['review']>['visualReview']> => ({
  desktop: {
    reviewedOn: '2026-08-20',
    viewport: '1440×900',
    evidence: `Direct route inspected with the full uncropped object preview, three untitled sourced paragraphs, subject-specific guide, factual plaque relationship, complete article action, and no horizontal overflow. Evidence: docs/visual-validation/gallery-12-13-supplementals/desktop/${id}.png`,
  },
  mobile: {
    reviewedOn: '2026-08-20',
    viewport: '390×844',
    evidence: `Direct route inspected with a wrapped factual title, full aspect-safe object preview, scrollable interpretation, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-12-13-supplementals/mobile/${id}.png`,
  },
  threeDimensional: {
    reviewedOn: '2026-08-20',
    viewport: '1280×720 fresh direct-route session',
    evidence: `Fresh direct-route session inspected after closing the detail view: authored viewpoint, factual two-level plaque, distinct installation, working visit controls, and natural-ratio media mount. Evidence: docs/visual-validation/gallery-12-13-supplementals/staged-3d/${id}.png`,
  },
});

export const reviewRenaissanceSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery 12 review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery 12 presentation for ${input.id}.`);
  const evidenceLabel = reviewed.overrides?.dateLabel ?? input.dateLabel;
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
      panelKicker: 'Gallery 12 supplemental exhibit',
      proximityKicker: reviewed.plaqueTitle,
      factRows: [
        {label: 'Object', value: reviewed.plaqueTitle},
        {label: 'Evidence', value: evidenceLabel},
        {label: 'Atlas route', value: reviewed.articleTitle},
      ],
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
