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
  presentationEntityKind?: 'philosopher' | 'branch';
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
  'saadia-beliefs-opinions': {
    plaqueTitle: 'Planispheric Astrolabe Inscribed in Judaeo-Arabic',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'philosopher', id: 'saadia-gaon'}],
    articleTitle: 'Saadia Gaon',
    invitation: 'This c. 1300 astrolabe reveals later Judeo-Arabic scientific practice, while the full Saadia Gaon article explains the earlier Book of Beliefs and Opinions it cannot itself witness.',
    objectInterpretation: 'The installed asset is Khalili Collections SCI 158, a brass planispheric astrolabe probably made in Spain around 1300 for an Arabic-speaking Jewish community. Its maker is unrecorded and the photograph is CC BY-SA 3.0 IGO. It is not Landauer’s 1880 edition, a manuscript of Saadia’s work, or his possession.',
    overrides: {
      displayName: 'Planispheric Astrolabe Inscribed in Judaeo-Arabic',
      shortTitle: 'Judaeo-Arabic Planispheric Astrolabe',
      workLabel: 'KHALILI COLLECTIONS SCI 158 · JUDAEO-ARABIC SCIENTIFIC INSTRUMENT',
      dateLabel: 'Probably Spain, c. 1300 · modern object photograph',
      question: 'How can a scientific instrument illuminate a Judeo-Arabic intellectual world without becoming evidence for Saadia’s book?',
      frontSubtitle: 'Arabic language, Hebrew script, calculation, craft, community, historical distance, and cautious connection',
      lead: 'This brass astrolabe is a c. 1300 object of an Arabic-speaking Jewish community, not a copy of Saadia’s Book of Beliefs and Opinions. Its Judaeo-Arabic inscriptions make language, script, scientific practice, and community visible while the Saadia article explains the tenth-century epistemological arguments to which it is only a later context.',
      keyIdeas: [
        'Judaeo-Arabic identifies Arabic written in Hebrew script within Jewish communities.',
        'An astrolabe joins calculation, craft, and use; it is not a theological treatise.',
        'Historical proximity and direct influence must not be inferred from a shared language.',
      ],
      cautions: [
        'SCI 158 was made centuries after Saadia and was not his possession.',
        'The object cannot prove the content, readership, or authority of Book of Beliefs and Opinions.',
      ],
    },
    paragraphs: [
      'The installed image is not the nineteenth-century Landauer edition named by its legacy asset ID. It shows SCI 158, the Khalili Collections’ brass planispheric astrolabe inscribed in Judaeo-Arabic, probably made in Spain around 1300. The collection describes cast and sheet brass, engraved scales, and a rete with some missing silver studs. It calls the instrument exceptional: unlike the few other known astrolabes with Hebrew script that resemble Latin-inscribed European forms, this one appears to have been made within an Arabic-speaking Jewish community. The record identifies a long Judaeo-Arabic rim inscription but also says its unusual language is difficult to interpret. The object is a scientific instrument and material linguistic witness, not a theology book.',
      'Saadia’s Book of Beliefs and Opinions belongs to a much earlier tenth-century Judeo-Arabic world. Scholarship presents its epistemological project through four modes of proper knowing: sense perception, reason, inference, and tradition. That shared language environment gives the astrolabe a carefully limited relation to the article. It helps visitors see that Jewish communities could use Arabic in Hebrew script across intellectual and practical media, but it does not supply Saadia’s arguments or prove that his book shaped this instrument. The chronological gap is decisive: Saadia died in 942, while SCI 158 is dated around 1300. Shared script and language show a connected historical field, not ownership, readership, or direct transmission.',
      'The astrolabe matters philosophically when it is not overburdened. Its engravings and movable astronomical components invite questions about observation, calculation, trained use, and the social conditions under which knowledge becomes reliable. The object itself cannot establish the book’s doctrine of revelation, the authority of rabbinic tradition, or a harmonious relation between reason and faith. Those claims require Saadia’s text and scholarship. The linked Saadia Gaon article provides that canonical argument; SCI 158 provides a later material context that makes multilingual intellectual practice visible. The corrected exhibit lets visitors see the instrument actually installed and understand why it is a contextual bridge rather than a replacement for Book of Beliefs and Opinions.',
    ],
    paragraphSourceIds: [['khalili-sci-158'], ['saadia-sep'], ['khalili-sci-158', 'saadia-sep']],
    sources: [
      collection('khalili-sci-158', 'Khalili Collections — Planispheric Astrolabe Inscribed in Judaeo-Arabic, SCI 158', 'https://khalilicollections.org/collections/islamic-art/khalili-collection-islamic-art-planispheric-astrolabe-inscribed-in-judaeo-arabic-sci158/'),
      academic('saadia-sep', 'Stanford Encyclopedia of Philosophy — Saadya [Saadiah]', 'https://plato.stanford.edu/entries/saadya/'),
    ],
    visitorGuide: [
      {heading: 'Reading SCI 158', items: [
        {label: 'Judaeo-Arabic', description: 'The rim inscription uses Arabic written in Hebrew script; its unusual form is difficult to interpret securely.', sourceIds: ['khalili-sci-158']},
        {label: 'Scientific instrument', description: 'Brass plates, scales, and a rotating rete support astronomical calculation and trained use, not theological exposition.', sourceIds: ['khalili-sci-158']},
      ]},
      {heading: 'Saadia’s relationship', items: [
        {label: 'Four modes of knowing', description: 'Saadia discusses sense perception, reason, inference, and tradition in Book of Beliefs and Opinions.', sourceIds: ['saadia-sep']},
        {label: 'A later context', description: 'SCI 158 dates around 1300, centuries after Saadia; shared Judeo-Arabic culture does not prove direct influence.', sourceIds: ['khalili-sci-158', 'saadia-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the exhibit from a legacy Landauer-edition description to the installed Khalili SCI 158 astrolabe, verified its c. 1300 Judaeo-Arabic provenance and CC BY-SA 3.0 IGO photograph, separated the instrument from Saadia and his book, mapped every claim, and preserved natural proportions.',
    lock: 'fnv1a64:8eb83642cc002194',
  },
  'judeo-arabic-geniza-law': {
    plaqueTitle: 'Solomon Schechter Studying Cairo Geniza Fragments',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'saadia-gaon'}],
    articleTitle: 'Saadia Gaon',
    presentationEntityKind: 'philosopher',
    invitation: 'Schechter’s c. 1898 archive photograph makes the Geniza’s modern recovery visible; Saadia’s article supplies earlier Judeo-Arabic questions about law, reason, report, and communal interpretation.',
    objectInterpretation: 'This c. 1898 photograph shows Solomon Schechter studying Cairo Geniza fragments. The Commons record identifies an unknown photographer and a Smarthistory source; it records modern recovery and study, not a medieval court, contract, or the handwriting of Saadia Gaon.',
    overrides: {
      displayName: 'Solomon Schechter Studying Cairo Geniza Fragments',
      shortTitle: 'Schechter and the Cairo Geniza',
      workLabel: 'JUDEO-ARABIC ARCHIVE · MODERN RECOVERY AND INTERPRETATION',
      dateLabel: 'Unknown photographer · c. 1898 · Cambridge Geniza context',
      articleRoute: {kind: 'philosopher', philosopherId: 'saadia-gaon'},
    },
    paragraphs: [
      'Piles of fragments surround Solomon Schechter at a table, making an archive rather than one exemplary document the visible subject. The Commons record dates the photograph about 1898 and identifies its photographer as unknown; it does not identify every fragment, date a specific legal text, or establish a medieval social scene. The image therefore directs attention to the modern recovery, sorting, and interpretation through which documentary evidence becomes legible. Those practices matter because fragments preserve ordinary letters, accounts, petitions, and legal materials alongside literary and religious texts, but this photograph alone cannot quantify the archive or represent every Jewish community that contributed to it.',
      'Saadia’s canonical article gives the linked philosophical frame. In a Judeo-Arabic intellectual world, questions about reliable report, rational inquiry, law, and interpretation were not detachable from communal institutions and textual transmission. Documentary traces can show that people made agreements, wrote across distance, and relied on scribal and legal procedures; they do not by themselves prove a theological doctrine or turn every archive record into philosophy. The object asks a methodological question: how should an interpreter move from many partial records to claims about a community without mistaking preservation, cataloguing, or modern scholarly selection for medieval unanimity?',
      'The relationship is deliberately contextual rather than biographical. Schechter lived centuries after Saadia, and the photograph is neither a portrait of the Gaon nor evidence for a particular work. It helps visitors see why a full sourced Saadia article must distinguish Arabic language from religious identity, text from later copy or archive, and argument from the social conditions that transmit it. The Cambridge Genizah collection and the photograph also leave important limits: one image cannot prove the precise provenance, contents, or legal force of unseen fragments, and no single figure can stand for the many custodians, communities, collectors, and scholars involved.',
    ],
    paragraphSourceIds: [['schechter-commons', 'cambridge-genizah'], ['saadia-sep', 'cambridge-genizah'], ['schechter-commons', 'saadia-sep', 'cambridge-genizah']],
    sources: [
      collection('schechter-commons', 'Wikimedia Commons — Solomon Schechter studying Cairo Geniza fragments', 'https://commons.wikimedia.org/wiki/File:Solomon_Schechter_studying_the_fragments_of_the_Cairo_Genizah,_c._1898.jpg'),
      collection('cambridge-genizah', 'Cambridge University Library — Taylor-Schechter Genizah Research Unit', 'https://www.lib.cam.ac.uk/collections/departments/taylor-schechter-genizah-research-unit'),
      academic('saadia-sep', 'Stanford Encyclopedia of Philosophy — Saadya [Saadiah]', 'https://plato.stanford.edu/entries/saadya/'),
    ],
    visitorGuide: [
      {heading: 'Reading an archive photograph', items: [
        {label: 'Modern recovery', description: 'The photograph records Schechter studying fragments around 1898, not a medieval court or particular legal transaction.', sourceIds: ['schechter-commons']},
        {label: 'Fragments need context', description: 'Cataloguing, material description, language, date, and documentary genre constrain what a fragment can support.', sourceIds: ['cambridge-genizah']},
      ]},
      {heading: 'From records to philosophy', items: [
        {label: 'Judeo-Arabic setting', description: 'Arabic written in Hebrew script locates Jewish authors within Arabic-speaking intellectual worlds without erasing communal difference.', sourceIds: ['saadia-sep']},
        {label: 'Reliable report', description: 'Saadia distinguishes testimony and tradition from inference while asking how each earns warrant.', sourceIds: ['saadia-sep']},
      ]},
    ],
    resolution: 'Resolved: reconciled the slot to the c. 1898 Schechter archive photograph, mapped modern recovery and Judeo-Arabic context, established a carefully limited Saadia reception route, preserved public-domain rights and natural proportions, and disclosed the unseen fragments’ provenance limits.',
    lock: 'fnv1a64:d923d489e7188fdd',
  },
  'judah-halevi-kuzari': {
    plaqueTitle: 'Excavations at the Khazar Fortress of Sarkel',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'judah-halevi'}],
    articleTitle: 'Judah Halevi',
    invitation: 'This 1930s aerial excavation photograph gives the Khazar setting material scale while Halevi’s Kuzari tests testimony, prophecy, and practice through a literary dialogue rather than an excavated transcript.',
    objectInterpretation: 'The installed image is an aerial photograph of 1930s excavations at Sarkel, a Khazar fortress, from M. I. Artamonov’s expedition. Its unidentified photographer and public-domain status are recorded on Commons; the site does not prove that the Kuzari reports an actual conversion dialogue or that Halevi visited Sarkel.',
    overrides: {
      displayName: 'Sarkel Excavations and the Kuzari’s Khazar Frame',
      shortTitle: 'Sarkel and the Kuzari',
      workLabel: 'JUDAH HALEVI · ARCHAEOLOGICAL CONTEXT FOR A LITERARY DIALOGUE',
      dateLabel: 'Sarkel excavation aerial photograph · 1930s',
    },
    paragraphs: [
      'The aerial view shows excavated walls and rooms at Sarkel, a Khazar fortress, as revealed by M. I. Artamonov’s 1930s expedition. The Commons record identifies the site, expedition, approximate decade, unknown photographer, and public-domain status. It does not establish who occupied every visible space, reconstruct an eighth-century courtly conversation, or connect the excavation to Halevi personally. Archaeology makes a historical frame material, but a photograph of excavated architecture is not a manuscript of the Kuzari or a direct witness to its argument. The previous 1796 title-page description was therefore replaced with the object that visitors actually encounter.',
      'Halevi’s dialogue uses the Khazar king’s conversion tradition as a literary frame for an engagement with the intellectual culture of his own period. The article and primary text distinguish his selective, moderate fideism from simple anti-rationalism: rational inquiry has achievements in demonstrable fields, while prophecy and concurrent tradition carry a different kind of authority in the book’s religious argument. His appeal to tawātur concerns multiply transmitted reports, not a generic appeal to whatever a community remembers. The physical site can prompt a question about history and authority, but it cannot settle the philosophical force or historical truth of the dialogue.',
      'The full sourced Judah Halevi article supplies the needed relation among literary form, reception, contemporary Islamicate philosophy, revelation, and practice. Sarkel cautions against the opposite error of treating a literary setting as placeless fantasy. Yet its excavation history is also later than Halevi and mediated by modern archaeological work. Visitors should hold three layers apart: the Khazar past evoked by the text, Halevi’s twelfth-century philosophical intervention, and a twentieth-century aerial record of a site. None collapses into the others. The installed object matters because those layers can be compared carefully, not because stone walls certify a dialogue.',
    ],
    paragraphSourceIds: [['sarkel-commons'], ['halevi-kuzari-primary', 'halevi-sep'], ['sarkel-commons', 'halevi-sep']],
    sources: [
      collection('sarkel-commons', 'Wikimedia Commons — Sarkel excavation aerial photograph', 'https://commons.wikimedia.org/wiki/File:Sarkel.jpg'),
      primary('halevi-kuzari-primary', 'Judah Halevi — The Kuzari, public-domain translation', 'https://archive.org/details/judahhalleviskit00judauoft'),
      academic('halevi-sep', 'Stanford Encyclopedia of Philosophy — Judah Halevi', 'https://plato.stanford.edu/entries/halevi/'),
    ],
    visitorGuide: [
      {heading: 'Reading Sarkel carefully', items: [
        {label: 'Excavated site', description: 'The image records 1930s excavation at Sarkel, not an eighth-century courtroom or Halevi’s travel.', sourceIds: ['sarkel-commons']},
        {label: 'Literary frame', description: 'A Khazar setting can organize a philosophical dialogue without functioning as a transcript of an event.', sourceIds: ['halevi-sep', 'halevi-kuzari-primary']},
      ]},
      {heading: 'What the dialogue tests', items: [
        {label: 'Concurrent tradition', description: 'Halevi’s tawātur argument concerns multiply transmitted public report, whose force remains contestable.', sourceIds: ['halevi-sep', 'halevi-kuzari-primary']},
        {label: 'Selective fideism', description: 'The Kuzari credits rational inquiry in some domains while denying it the final authority sought for revelation.', sourceIds: ['halevi-sep', 'halevi-kuzari-primary']},
      ]},
    ],
    resolution: 'Resolved: corrected the object from a Kuzari edition to the 1930s Sarkel excavation photograph, verified its expedition context and public-domain status, separated archaeological site from literary dialogue and historical claim, mapped every source, and preserved natural proportions.',
    lock: 'fnv1a64:dd69bf4339b93ae5',
  },
  'judah-halevi-divan': {
    plaqueTitle: 'Memorial Sculpture of Judah Halevi',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'judah-halevi'}],
    articleTitle: 'Judah Halevi',
    invitation: 'This 2009 memorial sculpture photograph recalls Halevi as poet and thinker, while the Divan’s voice, form, and longing must be read in transmitted texts rather than from an imagined likeness.',
    objectInterpretation: 'Raananms photographed this modern sculpture of Judah Halevi at Ralli Museum 2 in Caesarea on 7 August 2009 and released the photograph into the public domain. The sculpture’s maker and date are not established by the source; no secure historical likeness is known, and the monument cannot evidence the Divan or Halevi’s final journey.',
    overrides: {
      displayName: 'Memorial Sculpture of Judah Halevi',
      shortTitle: 'Judah Halevi Memorial',
      workLabel: 'JUDAH HALEVI · MODERN POETIC RECEPTION',
      dateLabel: 'Modern memorial · photographed by Raananms in 2009',
    },
    paragraphs: [
      'A standing, robed figure with a manuscript roll presents a modern public memory of Judah Halevi as poet and intellectual. The Commons file identifies the image as Raananms’s own 2009 photograph and gives its public-domain dedication; it names the sculpture but does not identify the sculptor or date the monument. The installation therefore displays a commemoration, not a likeness made from life. Its clarity is interpretively useful: later communities often need an image of a writer, while responsible history must acknowledge that the visible face and costume are idealized rather than documentary. The previous Geniza-leaf identity did not match the installed object and has been removed.',
      'The Divan makes thought through voice, address, rhythm, inherited forms, worship, friendship, exile, and longing. Poetry does not merely decorate the arguments of the Kuzari: it shapes what commitment and absence feel like, and it can hold tension without resolving it into a thesis. Halevi’s article situates this work beside Arabic and Hebrew literary cultures, medical and communal life, and philosophical questions of prophecy and presence. A statue holding a roll can signal authorship, but it cannot identify a particular poem, reproduce a performance, or prove that poetic language delivers one stable doctrine. The separate OPenn witness provides a material route to transmitted poetry.',
      'The article relationship prevents the memorial from becoming a shortcut through uncertainty. Documentary evidence shows Halevi sailing from Alexandria in May 1141; current scholarship infers his arrival and death in the Land of Israel that summer, while direct documentation of arrival is absent and the Jerusalem-gate legend is unsupported. The contemporary sculpture cannot fill that gap. Read beside the full sourced article and the Divan’s transmitted poems, it raises a productive question: how do memorial images turn a complex poet, physician, and philosopher into a single recognizable figure, and what is lost or gained in that translation? The unknown sculptor and monument date remain disclosed limits.',
    ],
    paragraphSourceIds: [['halevi-memorial-commons'], ['halevi-divan-penn', 'halevi-sep'], ['halevi-memorial-commons', 'halevi-sep']],
    sources: [
      collection('halevi-memorial-commons', 'Wikimedia Commons — Judah Halevi memorial sculpture photograph', 'https://commons.wikimedia.org/wiki/File:%D7%A8%D7%99%D7%94%D7%9C_%D7%A8%D7%90%D7%9C%D7%99.jpg'),
      collection('halevi-divan-penn', 'Penn Libraries OPenn — Halper 314, part of Judah Halevi’s Divan', 'https://openn.library.upenn.edu/Data/0002/html/h314.html'),
      academic('halevi-sep', 'Stanford Encyclopedia of Philosophy — Judah Halevi', 'https://plato.stanford.edu/entries/halevi/'),
    ],
    visitorGuide: [
      {heading: 'Reading the memorial', items: [
        {label: 'Modern commemoration', description: 'The installed photograph is from 2009 and preserves an idealized sculpture, not Halevi’s appearance.', sourceIds: ['halevi-memorial-commons']},
        {label: 'Unidentified maker', description: 'The source identifies the photographer but does not establish the sculpture’s maker or construction date.', sourceIds: ['halevi-memorial-commons']},
      ]},
      {heading: 'Reading the Divan', items: [
        {label: 'Poetic thought', description: 'Voice, meter, address, and imagery pursue questions about exile, worship, attachment, and communal memory.', sourceIds: ['halevi-sep', 'halevi-divan-penn']},
        {label: 'Journey limits', description: 'Sailing from Alexandria is documented; later arrival, death, and Jerusalem stories require different caution.', sourceIds: ['halevi-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the object from a Geniza Divan witness to the installed 2009 memorial photograph, recorded the unidentified sculptor and date, separated commemoration from likeness and journey evidence, mapped the Divan relationship, and preserved public-domain rights and natural proportions.',
    lock: 'fnv1a64:cf2ba73bc9bec46f',
  },
  'maimonides-mishneh-torah': {
    plaqueTitle: 'Illuminated Mishneh Torah',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'maimonides'}],
    articleTitle: 'Maimonides',
    invitation: 'This later illuminated manuscript witnesses the Mishneh Torah’s reception, while Maimonides’s code organizes law, ethical formation, knowledge, and authority without ending argument about its sources or scope.',
    objectInterpretation: 'The installed image shows a later illuminated manuscript of Maimonides’s Mishneh Torah, copied around 1300–1350 and illuminated around 1400. The Library of Congress record identifies the National Library of Israel item; it is a reception witness, not Maimonides’s desk copy or proof that its decoration reflects twelfth-century practice.',
    paragraphs: [
      'The open Hebrew manuscript pairs legal writing with red, blue, and gold illumination. The Library of Congress catalogue identifies a Mishneh Torah manuscript from the National Library of Israel, copied in the early fourteenth century and illuminated around 1400. These material facts establish later production and reception; they do not turn an anonymous copyist or illuminator into Maimonides, reveal his working environment, or show which legal discussion a visitor sees on the displayed page. The rich survival history makes the code’s prestige tangible while keeping the object’s later date in the foreground. Its public-domain digitization and object record provide secure attribution without making illumination evidence for doctrine.',
      'Maimonides’s Mishneh Torah organizes Jewish law into a comprehensive code. Its arrangement joins knowledge of God, ethical dispositions, worship, social relations, institutions, and messianic expectation; classification itself proposes relations among forms of life. The code’s accessibility also provoked an authority question: a work that gives conclusions without reproducing all Talmudic debate may help readers act, yet critics could ask whether it displaced the argumentative paths warranting those conclusions. The philosophical significance lies neither in mere bureaucracy nor in a frictionless synthesis, but in how ordered practice, explanation, interpretation, and communal authority are made to answer one another.',
      'The full sourced Maimonides article locates this legal project beside Arabic and Aristotelian inheritances, negative theology, prophecy, and ethical-political questions. The manuscript is not visual evidence for every one of those claims; it is evidence for the work’s later material reception. Keeping those roles distinct preserves a limit in the object record: decoration and an attractive page cannot decide how every community received the code or resolve enduring disagreement about law, sources, rational purpose, and authority. The visitor should move from this witness to the article and text rather than infer doctrine from illumination alone. Reception preserves a work while also giving it new material and institutional meanings.',
    ],
    paragraphSourceIds: [['mishneh-loc', 'mishneh-commons'], ['maimonides-sep'], ['mishneh-loc', 'maimonides-sep']],
    sources: [
      collection('mishneh-loc', 'Library of Congress — Mishneh Torah manuscript, 2021667526', 'https://www.loc.gov/item/2021667526/'),
      collection('mishneh-commons', 'Wikimedia Commons — installed Mishneh Torah manuscript image', 'https://commons.wikimedia.org/wiki/File:Mishneh_Torah_WDL3962.pdf'),
      academic('maimonides-sep', 'Stanford Encyclopedia of Philosophy — Maimonides', 'https://plato.stanford.edu/entries/maimonides/'),
    ],
    visitorGuide: [
      {heading: 'Reading the manuscript', items: [
        {label: 'Later witness', description: 'The manuscript was copied generations after Maimonides and illuminated later still; it records reception, not authorship.', sourceIds: ['mishneh-loc', 'mishneh-commons']},
        {label: 'Full composition', description: 'Illumination and text belong to the object’s later history and should not become decorative proof of doctrine.', sourceIds: ['mishneh-loc']},
      ]},
      {heading: 'Reading the code', items: [
        {label: 'Law as formation', description: 'The Mishneh Torah orders knowledge, traits, practice, institutions, and future hope into communal life.', sourceIds: ['maimonides-sep']},
        {label: 'Authority remains contested', description: 'Systematic conclusions aid access while raising questions about sources, deliberation, and Talmudic debate.', sourceIds: ['maimonides-sep']},
      ]},
    ],
    resolution: 'Resolved: verified the later Mishneh Torah manuscript’s holding, dating, production layers, public-domain record, and natural ratio; separated copy and illumination from authorship; mapped legal-order and authority claims; and linked the current Maimonides article.',
    lock: 'fnv1a64:04969b30c584c0e0',
  },
  'maimonides-guide-negative-theology': {
    plaqueTitle: 'The Copenhagen Guide for the Perplexed',
    plaqueType: 'work-or-text',
    canonicalContexts: [{kind: 'philosopher', id: 'maimonides'}],
    articleTitle: 'Maimonides',
    invitation: 'This 1347–48 Barcelona copy makes the Guide’s Hebrew afterlife visible, while Maimonides asks how divine unity, scriptural language, and demonstrative reasoning can be held together without humanizing God.',
    objectInterpretation: 'The Royal Danish Library identifies Cod. Heb. 37 as a Barcelona manuscript written in 1347–48 by Levi ben Isaac ben Caro for Menachem Bezalel; its principal illuminator is attributed by current consensus to Ferrer Bassa. It is a later Hebrew reception image, not a portrait of Maimonides, proof of a classroom, or a transparent picture of Aristotle.',
    paragraphs: [
      'A richly illuminated Hebrew page shows a seated figure and attendants above decorated text panels. The Royal Danish Library identifies the Copenhagen Maimonides, Cod. Heb. 37, as a Barcelona manuscript copied in 1347–48 by Levi ben Isaac ben Caro for Menachem Bezalel. Current scholarly consensus attributes its principal illumination to Ferrer Bassa. Those facts establish maker roles, patron, place, date, and holding, but they do not turn the central figure into a secure portrait of Aristotle or Maimonides, prove a classroom scene, or recover the author’s working copy. The public-domain image documents a Catalan Hebrew afterlife roughly 150 years after the Guide’s completion.',
      'Maimonides wrote the Guide about 1190 in Judeo-Arabic for an advanced reader troubled by apparent conflict between religious language and philosophy. Negative attributes protect divine unity by denying creaturely limitations and refusing to treat wisdom, power, or life as added human-like parts of God. This does not make religious language or practice meaningless. The method also asks what has genuinely been demonstrated and when figurative scriptural interpretation is required. Intellectual discipline limits both careless literalism and philosophical overconfidence. The manuscript cannot prove these arguments, but its later Hebrew setting shows that interpretation required translation, study, and readers capable of navigating a deliberately demanding text.',
      'Samuel ibn Tibbon’s Hebrew translation, introduction, and glossary gave the Guide new technical vocabulary and a new material life; Cod. Heb. 37 includes that reception apparatus. Translation does more than carry a settled message: it selects terms, guides attention, and opens later controversy. The linked Maimonides article supplies the claim-reviewed account of negative theology and Aristotelian argument. This object asks why arguments also need copyists, patrons, translators, illuminators, and readers. It cannot prove that later communities agreed with every claim or settle the pictured figure’s identity. Its secure institutional record and disclosed uncertainties keep material reception from becoming invented authorial evidence.',
    ],
    paragraphSourceIds: [['copenhagen-guide-kb', 'copenhagen-guide-commons'], ['maimonides-sep'], ['copenhagen-guide-kb', 'maimonides-sep']],
    sources: [
      collection('copenhagen-guide-kb', 'Royal Danish Library — The Copenhagen Maimonides, Cod. Heb. 37', 'https://www.kb.dk/en/find-materials/collections/judaica-collection/guide-perplexed'),
      collection('copenhagen-guide-commons', 'Wikimedia Commons — 1348 Guide for the Perplexed manuscript', 'https://commons.wikimedia.org/wiki/File:14c_ed_of_the_Guide_for_the_Perplexed_by_Maimonides.jpg'),
      academic('maimonides-sep', 'Stanford Encyclopedia of Philosophy — Maimonides', 'https://plato.stanford.edu/entries/maimonides/'),
    ],
    visitorGuide: [
      {heading: 'Reading the Copenhagen Guide', items: [
        {label: 'A later Hebrew witness', description: 'Cod. Heb. 37 was copied in Barcelona in 1347–48 and records transmission rather than Maimonides’s working copy.', sourceIds: ['copenhagen-guide-kb']},
        {label: 'Illumination and patronage', description: 'Levi ben Isaac ben Caro copied the manuscript for Menachem Bezalel; its principal illumination is attributed to Ferrer Bassa.', sourceIds: ['copenhagen-guide-kb']},
      ]},
      {heading: 'The philosophical problem', items: [
        {label: 'Negative attributes', description: 'They deny creaturely limitations or composite qualities in God; they do not make religious language pointless.', sourceIds: ['maimonides-sep']},
        {label: 'Translation as interpretation', description: 'Ibn Tibbon’s Hebrew version and glossary made philosophical Arabic terms available for commentary and dispute.', sourceIds: ['copenhagen-guide-kb', 'maimonides-sep']},
      ]},
    ],
    resolution: 'Resolved: verified the Copenhagen manuscript’s copyist, patron, date, holding, and qualified illuminator attribution; distinguished this Hebrew reception image from Maimonides and Aristotle; mapped negative-theology and translation claims; retained public-domain use and natural proportions; and linked Maimonides.',
    lock: 'fnv1a64:681b0a5e65ca10ac',
  },
  'maimonides-guide-translation-reception': {
    plaqueTitle: 'The Guide in Judeo-Arabic',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'maimonides'}],
    articleTitle: 'Maimonides',
    invitation: 'This later Judeo-Arabic copy shows the Guide before and alongside Hebrew and Latin afterlives, where translation remade philosophical vocabulary, readership, disagreement, and authority.',
    objectInterpretation: 'Library of Congress record 2021667527 identifies the displayed 1200–1400 National Library of Israel manuscript as a witness in Judeo-Yemeni Arabic; it gives neither a named copyist nor a secure place of production. It is not Maimonides’s autograph, a Hebrew translation, or proof that every rendering preserved one technical vocabulary.',
    overrides: {
      displayName: 'Maimonides’s Guide in Judeo-Arabic and Translation',
      shortTitle: 'The Guide in Judeo-Arabic',
      workLabel: 'MAIMONIDES · JUDEO-ARABIC MANUSCRIPT AND TRANSLATION RECEPTION',
      dateLabel: 'National Library of Israel witness · 1200–1400 · place and copyist unknown',
    },
    paragraphs: [
      'The installed manuscript opening carries Arabic language in Hebrew characters, with dark text, rubrication, and marginal marks. Library of Congress record 2021667527 identifies it as a National Library of Israel witness in Judeo-Yemeni Arabic and dates it broadly to 1200–1400. The catalogue does not securely name a copyist or place of production. It is not Maimonides’s autograph, a Hebrew translation, or a page that permits false precision about date and origin. The object makes the Guide’s first linguistic world visible while its wide catalogue range and unknown maker preserve important limits. Calling it simply Arabic once obscured the specifically Jewish script and reception context.',
      'Maimonides composed the Guide in Judeo-Arabic about 1190. The work joins Aristotelian philosophical resources to Jewish questions about God, scripture, creation, prophecy, and law. Samuel ibn Tibbon completed a Hebrew translation in 1204, and technical terms required choices, glosses, and explanation rather than mechanical substitution. His work helped the Guide enter new Jewish settings where it could be copied, taught, criticized, and used for positions Maimonides had not pre-programmed. Translation therefore creates readers and controversies as well as vocabulary. The installed later copy cannot establish every wording of the original or prove that one reception line preserved a single interpretation.',
      'Later Latin contact is an additional afterlife, not a reason to turn the Guide into a bridge whose destination was Christian philosophy. The linked Maimonides article remains the canonical account of the work’s argument and deliberate pedagogy; the object supplies bounded evidence for transmission. Its pages cannot settle every translation controversy, recover the author’s hand, or identify an original place from the broad catalogue record. Visitors should hold composition, later copying, Hebrew translation, and Latin reception apart while asking how each new language reorganizes authority and access. The disclosed uncertainty makes the transmission history more accurate, not less meaningful.',
    ],
    paragraphSourceIds: [['guide-loc-3963'], ['guide-loc-3963', 'ibn-tibbon-sep', 'maimonides-sep'], ['guide-loc-3963', 'ibn-tibbon-sep', 'maimonides-sep']],
    sources: [
      collection('guide-loc-3963', 'Library of Congress / National Library of Israel — The Guide to the Perplexed, 2021667527', 'https://www.loc.gov/item/2021667527/'),
      academic('ibn-tibbon-sep', 'Stanford Encyclopedia of Philosophy — Samuel Ibn Tibbon', 'https://plato.stanford.edu/archives/fall2021/entries/tibbon/'),
      academic('maimonides-sep', 'Stanford Encyclopedia of Philosophy — Maimonides', 'https://plato.stanford.edu/entries/maimonides/'),
    ],
    visitorGuide: [
      {heading: 'Following the languages', items: [
        {label: 'Judeo-Arabic', description: 'The Guide was composed in Arabic written in Hebrew characters within Arabic-speaking Jewish intellectual life.', sourceIds: ['guide-loc-3963', 'maimonides-sep']},
        {label: 'Ibn Tibbon’s Hebrew', description: 'The 1204 translation carried the work into a different learned vocabulary and readership.', sourceIds: ['guide-loc-3963', 'ibn-tibbon-sep']},
      ]},
      {heading: 'Reading a manuscript witness', items: [
        {label: 'A later copy', description: 'The catalogue dates the manuscript only to 1200–1400 and does not securely name a copyist or place.', sourceIds: ['guide-loc-3963']},
        {label: 'Reception is plural', description: 'Hebrew and later Latin readers made divergent uses of the Guide rather than following one frictionless flow.', sourceIds: ['ibn-tibbon-sep', 'maimonides-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the installed object from generically Arabic and Egyptian to a broad-dated Judeo-Arabic manuscript witness, separated composition, copy, and translation dates, mapped the transmission claims, preserved public-domain use and natural proportions, and linked Maimonides.',
    lock: 'fnv1a64:333fe34b288d589e',
  },
  'jewish-philosophy-after-maimonides': {
    plaqueTitle: 'Portrait of Moses Mendelssohn',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'maimonides'}],
    articleTitle: 'Maimonides',
    invitation: 'Moses Mendelssohn’s engraved portrait opens a later history in which readers inherited, revised, and contested Maimonides’s questions about reason, interpretation, law, and communal life.',
    objectInterpretation: 'Rijksmuseum catalogues RP-P-1907-2896 as a 1770–75 engraving by Johann Gotthard Müller. It is a portrait of one Enlightenment-era philosopher, not a group portrait, evidence of Maimonides’s direct influence on him, or a visual summary of every medieval and modern Jewish philosophical tradition.',
    overrides: {
      articleRoute: {kind: 'philosopher', philosopherId: 'maimonides'},
      dateLabel: 'Johann Gotthard Müller engraving · 1770–1775 · Rijksmuseum RP-P-1907-2896',
    },
    paragraphs: [
      'An oval profile portrait presents Moses Mendelssohn in the visual language of an eighteenth-century learned public. Rijksmuseum catalogues RP-P-1907-2896 as a 1770–75 engraving by Johann Gotthard Müller and records the print at 290 by 219 millimetres. Its CC0 institutional record secures maker, medium, date, dimensions, and holding without inventing a longer provenance chain. The object shows one philosopher remembered in print, not a group portrait or a summary of everyone who wrote after Maimonides. Nor does the portrait prove direct influence, agreement, or a continuous teacher-student lineage. It functions as a threshold into a plural history.',
      'After Maimonides names debate rather than a single succession. Hebrew philosophical work flourished in Christian Europe after Arabic-language Jewish philosophy declined, and later readers disputed how reason, Torah, interpretation, and Aristotelian inheritance should relate. Gersonides pursued a highly rationalist project, while Hasdai Crescas opposed central commitments on questions including divine prescience. Mendelssohn worked in a much later public shaped by German-language philosophy, aesthetics, religious debate, civil status, and Jewish emancipation. His image interrupts the false impression that Jewish philosophy ended in a medieval manuscript world, but it cannot compress Gersonides, Crescas, Cohen, Rosenzweig, Buber, Levinas, or other divergent projects into one line.',
      'The canonical Maimonides article is the honest closest route because this exhibit stages reception and contest around questions strongly associated with the Guide, not a fictional umbrella article. The portrait establishes a later object and philosophical figure; it does not establish a uniform Jewish philosophy or complete the print’s ownership history. Visitors can use it to ask how inheritance produces critique, translation, rejection, and transformation rather than merely loyalty. The article provides the Maimonidean claims that later thinkers could receive or oppose, while the Mendelssohn record anchors one Enlightenment setting. Keeping the relationship explicit prevents both a dead-end CTA and an invented canonical category.',
    ],
    paragraphSourceIds: [['mendelssohn-rijksmuseum'], ['medieval-philosophy-sep', 'mendelssohn-sep'], ['mendelssohn-rijksmuseum', 'medieval-philosophy-sep', 'maimonides-sep']],
    sources: [
      collection('mendelssohn-rijksmuseum', 'Rijksmuseum — Portrait of Moses Mendelssohn, RP-P-1907-2896', 'https://www.rijksmuseum.nl/en/collection/object/Portret-van-Moses-Mendelssohn--d521a2916d242c43ccda9308123c7a75'),
      academic('medieval-philosophy-sep', 'Stanford Encyclopedia of Philosophy — Medieval Philosophy', 'https://plato.stanford.edu/entries/medieval-philosophy/'),
      academic('mendelssohn-sep', 'Stanford Encyclopedia of Philosophy — Moses Mendelssohn', 'https://plato.stanford.edu/entries/mendelssohn/'),
      academic('maimonides-sep', 'Stanford Encyclopedia of Philosophy — Maimonides', 'https://plato.stanford.edu/entries/maimonides/'),
    ],
    visitorGuide: [
      {heading: 'Debating after Maimonides', items: [
        {label: 'Gersonides and Crescas', description: 'Both inherit medieval questions, yet Crescas opposed central elements of Gersonides’s account of divine prescience.', sourceIds: ['medieval-philosophy-sep']},
        {label: 'Reception, not succession', description: 'Later use of Maimonidean questions can include critique, revision, translation, and rejection.', sourceIds: ['medieval-philosophy-sep', 'maimonides-sep']},
      ]},
      {heading: 'Reading Mendelssohn’s portrait', items: [
        {label: 'An eighteenth-century engraving', description: 'Rijksmuseum identifies the 1770–75 print by Johann Gotthard Müller, not a medieval witness.', sourceIds: ['mendelssohn-rijksmuseum']},
        {label: 'One modern voice', description: 'Mendelssohn matters in his Enlightenment setting; no portrait can stand for the field’s later plurality.', sourceIds: ['mendelssohn-sep']},
      ]},
    ],
    resolution: 'Resolved: verified the Rijksmuseum accession, maker, medium, date, dimensions, and CC0 use; rejected the unsupported all-field stand-in claim; mapped medieval debate and Mendelssohn’s later setting; used Maimonides as the unambiguous canonical reception route; and preserved natural proportions.',
    lock: 'fnv1a64:ff600e7400d38e64',
  },
  'spinoza-formation-rupture-threshold': {
    plaqueTitle: 'Excommunicated Spinoza',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'spinoza'}],
    articleTitle: 'Spinoza',
    invitation: 'Hirszenberg’s 1907 imagined scene remembers Spinoza’s exclusion centuries later, inviting scrutiny of the Dutch Jewish setting, biblical criticism, political freedom, and the risks of turning rupture into legend.',
    objectInterpretation: 'Samuel Hirszenberg painted Excommunicated Spinoza in 1907, more than 250 years after the Amsterdam herem. The public-domain digital image is supplied via the Herbert D. Katz Center and Commons; it is not eyewitness evidence, a portrait from life, or an image of the 1670 Theological-Political Treatise. Its physical holding and ownership remain unconfirmed by the supplied source.',
    overrides: {
      displayName: 'Hirszenberg’s Excommunicated Spinoza: Formation and Rupture',
      shortTitle: 'Excommunicated Spinoza',
      workLabel: 'SPINOZA · LATER RECEPTION OF FORMATION AND RUPTURE',
      dateLabel: 'Samuel Hirszenberg · 1907 · physical holding unresolved',
    },
    paragraphs: [
      'A dark foreground isolates Spinoza while a synagogue congregation gathers behind him in Samuel Hirszenberg’s Excommunicated Spinoza. The painting dates to 1907, more than 250 years after Amsterdam’s Portuguese Jewish community placed Spinoza under herem in 1656. Commons supplies a public-domain digital reproduction through the Herbert D. Katz Center, but it does not establish the painting’s current physical holding or ownership; conflicting secondary claims are not promoted into provenance. The work is a retrospective historical imagination, not eyewitness evidence, a portrait from life, or the 1670 Treatise title page once named by this slot. Its emotional staging belongs to reception history.',
      'Spinoza’s Amsterdam formation supplied languages, texts, institutions, commercial networks, and disputes, but it neither exhausts nor predetermines his later philosophy. The painting’s solitary figure and collective response cannot establish the exact motives, circumstances, or visual details of the ban. The Theological-Political Treatise, published anonymously in 1670, treats scripture historically and argues for freedom of philosophizing within a stable political order. Those claims must be read in the text and current scholarship, not inferred from a book held by Hirszenberg’s imagined figure. Formation makes rupture historically intelligible without turning exclusion into a romantic source of philosophical truth.',
      'The 1907 image matters because a later Polish-Jewish artist made a seventeenth-century break emotionally legible to new viewers. It should not make Spinoza representative of Jewish philosophy as a whole, erase the harm and institutional stakes of exclusion, or convert a retrospective scene into primary evidence. Gallery 09 uses it to hold formation and disagreement in view, while the linked Spinoza article develops his metaphysics, freedom, biblical criticism, and political thought at canonical scale. The unresolved holding remains visible rather than invented. Visitors can therefore compare a powerful memory image with the documented history and arguments it interprets, asking how later art turns conflict into philosophical legend.',
    ],
    paragraphSourceIds: [['hirszenberg-commons'], ['spinoza-sep'], ['hirszenberg-commons', 'hirszenberg-porta', 'spinoza-sep']],
    sources: [
      collection('hirszenberg-commons', 'Wikimedia Commons — Samuel Hirszenberg, Excommunicated Spinoza, 1907', 'https://commons.wikimedia.org/wiki/File:Hirszenberg,_Spinoza_wykl%C3%AAty_(Excommunicated_Spinoza),_1907.jpg'),
      academic('spinoza-sep', 'Stanford Encyclopedia of Philosophy — Baruch Spinoza', 'https://plato.stanford.edu/entries/spinoza/'),
      academic('hirszenberg-porta', 'Porta Polonica — Samuel Hirszenberg and Excommunicated Spinoza', 'https://www.porta-polonica.de/en/node/613?page=2'),
    ],
    visitorGuide: [
      {heading: 'Formation and rupture', items: [
        {label: 'The 1656 herem', description: 'The Amsterdam community excommunicated Spinoza; the painting is not documentary evidence for its disputed grounds.', sourceIds: ['spinoza-sep', 'hirszenberg-commons']},
        {label: 'A later reception image', description: 'Hirszenberg’s 1907 work translates exclusion into a retrospective scene rather than recovering a witnessed event.', sourceIds: ['hirszenberg-commons', 'hirszenberg-porta']},
      ]},
      {heading: 'Reading the Treatise carefully', items: [
        {label: 'Anonymous 1670 publication', description: 'The Treatise’s biblical criticism and political argument require textual evidence, not inference from the painting.', sourceIds: ['spinoza-sep']},
        {label: 'No representative shortcut', description: 'Spinoza’s formation does not make him a stand-in for Jewish philosophy, and rupture does not erase that setting.', sourceIds: ['spinoza-sep']},
      ]},
    ],
    resolution: 'Resolved: replaced the obsolete Treatise title-page identification with the installed 1907 Hirszenberg reception painting, corrected its object record and unresolved holding, mapped the herem, Treatise, and reception claims, preserved public-domain use and natural proportions, and linked Spinoza.',
    lock: 'fnv1a64:2e1603688ff1d5ad',
  },
};

const reviewMethod = 'Galleries 08–09 supplemental review: exactly eight non-overlapping GPT-5.6 Terra/High evidence scopes were reconciled by the Sol parent across installed-object identity, attribution, dating, institution, provenance, rights, claim-level sources, accessibility, article relationships, routes, review locks, and desktop, mobile, and staged-3D presentation.';

const visualReview = (id: string): NonNullable<NonNullable<MuseumSupplementalExhibit['review']>['visualReview']> => ({
  desktop: {
    reviewedOn: '2026-08-19',
    viewport: '1440×900',
    evidence: `Direct route inspected with the full uncropped object preview, three untitled sourced paragraphs, subject-specific guide, factual plaque relationship, complete article CTA, and no horizontal overflow. Evidence: docs/visual-validation/gallery-09-supplementals/desktop/${id}.png`,
  },
  mobile: {
    reviewedOn: '2026-08-19',
    viewport: '390×844',
    evidence: `Direct route inspected with wrapped factual title, full aspect-safe object preview, scrollable interpretation, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-09-supplementals/mobile/${id}.png`,
  },
  threeDimensional: {
    reviewedOn: '2026-08-19',
    viewport: '1280×720 fresh direct-route session',
    evidence: `Fresh direct-route session inspected after closing the detail view: authored viewpoint, factual two-level plaque, distinct installation, working visit controls, and natural-ratio media mount. Evidence: docs/visual-validation/gallery-09-supplementals/staged-3d/${id}.png`,
  },
});

export const reviewJewishSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery 09 review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery 09 presentation for ${input.id}.`);
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
      panelKicker: 'Gallery 09 supplemental exhibit',
      proximityKicker: reviewed.plaqueTitle,
      articleActionLabel: `Read the full sourced ${reviewed.articleTitle} article`,
      entityKind: reviewed.presentationEntityKind ?? input.presentation.entityKind,
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
