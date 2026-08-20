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
  'forum-mulla-sadra-existence': {
    plaqueTitle: 'Mulla Sadra’s Miscellany',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'philosopher', id: 'mulla-sadra'}],
    articleTitle: 'Mulla Sadra',
    invitation: 'This 1595 autograph miscellany offers a material entry into Mulla Sadra’s Safavid world; his article explains the primacy and gradation of existence and substantial motion.',
    objectInterpretation: 'The World Digital Library record describes a 394-page miscellany dated 1595 and written principally in Mulla Sadra’s own hand, with a short item by his teacher Mīr Dāmād, now in Iran’s National Library and Archives. The installed preview is a material witness to this composite volume, not a portrait, a diagram of ontology, or proof that every visible line is Sadra’s hand.',
    overrides: {
      displayName: 'Mulla Sadra’s Miscellany',
      shortTitle: 'The 1595 Miscellany',
      workLabel: 'AUTOGRAPH MISCELLANY · SAFAVID PHILOSOPHICAL PRACTICE',
      dateLabel: '1595 · National Library and Archives of Iran · World Digital Library 10609',
      question: 'What can a composite manuscript reveal about philosophical work without turning one page into a diagram of an entire metaphysics?',
      frontSubtitle: 'An autograph volume beside the primacy, gradation, and motion of existence',
      lead: 'Mulla Sadra’s miscellany preserves literary and philosophical writing in his hand alongside an item by Mīr Dāmād. It materializes a learned practice while leaving the system to sourced textual interpretation.',
    },
    paragraphs: [
      'Dense Persian and Arabic writing fills the installed page from a miscellany dated 1595. The World Digital Library description, preserved through the Library of Congress and Commons, identifies a 394-page volume principally in Mulla Sadra’s own hand and notes a brief item in the hand of his teacher Mīr Dāmād; the National Library and Archives of Iran holds it. “Autograph miscellany” does not make every visible line independently attributable without folio-level study, and the preview does not identify which work or argument appears on this page. It securely establishes a composite material practice of writing and collection, not a portrait or visual summary of Sadra’s system.',
      'Mulla Sadra gives existence priority over essence: essences mark conceptual determinations, while actuality is explained through existence. He also describes existence as graded or modulated rather than one flat genus shared identically by all beings. These claims emerge within a Safavid Islamic setting shaped by Avicennian philosophy, Illuminationist thought, theology, Shi‘i traditions, and mystical interpretation. Calling the result a “synthesis” should not imply a frictionless blend or erase disputes among its sources. The handwritten page cannot prove these theses. They must be reconstructed across works and terminology, with attention to how later readers interpret the unity and differentiation of existence.',
      'Substantial motion extends change into the being of material substances rather than restricting it to accidental features such as location, quantity, or quality. It does not mean ordinary movement through space, and it belongs to a wider account of time, nature, soul, and return. The linked Mulla Sadra article supplies the canonical explanation and its interpretive tensions. The miscellany adds another kind of evidence: philosophical systems survive through particular acts of drafting, compilation, preservation, and institutional custody. Visitors can compare the fluidity of a working volume with claims about dynamic being, but the analogy remains curatorial rather than proof. The source record does not provide a complete folio-by-folio provenance, so that limit stays visible.',
    ],
    paragraphSourceIds: [['sadra-miscellany'], ['sadra-sep'], ['sadra-sep', 'sadra-miscellany']],
    sources: [
      collection('sadra-miscellany', 'Library of Congress / World Digital Library — Mulla Sadra’s Miscellany, WDL 10609', 'https://hdl.loc.gov/loc.wdl/wdl.10609'),
      academic('sadra-sep', 'Stanford Encyclopedia of Philosophy archive — Mulla Sadra, ontology and motion sections', 'https://plato.stanford.edu/archives/spr2019/entries/mulla-sadra/'),
    ],
    visitorGuide: [
      {heading: 'Reading the manuscript record', items: [
        {label: 'A composite autograph', description: 'The volume is principally in Sadra’s hand and also includes an item written by Mīr Dāmād.', sourceIds: ['sadra-miscellany']},
        {label: 'A bounded preview', description: 'One page cannot identify every included text, hand, or stage in the volume’s later history.', sourceIds: ['sadra-miscellany']},
      ]},
      {heading: 'Following Sadra’s ontology', items: [
        {label: 'Primacy and gradation', description: 'Existence is primary and admits differentiated intensity rather than functioning as one flat shared category.', sourceIds: ['sadra-sep']},
        {label: 'Substantial motion', description: 'Material change reaches a substance’s mode of being and is not merely locomotion or surface alteration.', sourceIds: ['sadra-sep']},
      ]},
    ],
    resolution: 'Resolved: verified the 1595 WDL miscellany, its composite hands, holding, page count, public-domain record, and evidentiary boundary; mapped ontology and motion claims, added factual plaque and exact article CTA, and specified a current review with natural portrait mounting.',
    lock: 'fnv1a64:f8a50fe6728d1318',
  },
  'forum-dignaga-pramana': {
    plaqueTitle: 'Modern Commemorative Portrait of Dignāga',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'dignaga'}],
    articleTitle: 'Dignāga',
    invitation: 'This 2011 photograph documents an unidentified modern portrait labeled Dignagacharyudu, prompting a sourced comparison of perception, inference, and exclusion without pretending to recover Dignāga’s appearance.',
    objectInterpretation: 'The Commons record credits the 2011 photograph to రహ్మానుద్దీన్ (Rahmanuddin) under CC BY-SA 3.0 but does not name the painted portrait’s artist, date, holding location, or commissioning history. It is an imagined commemoration, not a historical likeness, an independent biographical source, or a diagram of Buddhist epistemology.',
    overrides: {
      displayName: 'Modern Commemorative Portrait of Dignāga',
      shortTitle: 'A Modern Image of Dignāga',
      workLabel: 'MODERN COMMEMORATION · BUDDHIST EPISTEMOLOGY',
      dateLabel: 'Unknown portrait artist · photographed by Rahmanuddin, 13 August 2011 · holding unstated',
      question: 'How can an imagined portrait orient a visitor while remaining separate from evidence for Dignāga’s life and arguments?',
      frontSubtitle: 'A modern identification image beside perception, inference, and exclusion',
      lead: 'A modern portrait uses Buddhist visual conventions to identify Dignāga. The source secures the photograph and license but leaves the artwork’s maker, place, and history unresolved.',
    },
    paragraphs: [
      'A brightly colored figure in orange robes raises one hand in a teaching gesture in this modern commemorative portrait. Wikimedia Commons records a photograph made by రహ్మానుద్దీన్ (Rahmanuddin) on 13 August 2011 and released under CC BY-SA 3.0. It does not name the painter, date the underlying artwork, identify a holding institution, or supply a provenance chain. The image therefore establishes a recent act of visual commemoration labeled “Dignagacharyudu,” not Dignāga’s face, dress, or historical setting. Its conventional signs can orient the Forum lens, but the biography and philosophical claims must come from textual witnesses and specialist scholarship.',
      'Dignāga’s epistemological tradition distinguishes perception and inference as sources of knowledge. Perception is treated as nonconceptual engagement with particulars, while inference depends on a reason or sign and on relations that make a conclusion warranted. These compact formulations sit inside difficult debates about error, conceptual construction, objects of cognition, and the structure of proof. They should not be converted into a timeless two-box chart labeled “experience” and “reason.” Dignāga’s works survive through complex Sanskrit, Tibetan, and Chinese transmission, and later Buddhist thinkers—especially Dharmakīrti—refined, defended, and revised the program rather than simply repeating one finished system.',
      'The theory of exclusion, apoha, addresses how words and concepts function without requiring real universals corresponding to every general term. A concept identifies by excluding what is other, but the doctrine and its later elaborations require more care than the slogan “meaning by negation.” The linked Dignāga article provides the canonical account and separates his formulations from later developments. The portrait contributes no philosophical proof. It instead makes an evidence problem visible: a confident modern face can seem more immediate than fragmentary and translated texts. By disclosing the unknown artist and holding, the exhibit prevents visual familiarity from becoming false historical certainty while still offering a clear route into pramāṇa analysis.',
    ],
    paragraphSourceIds: [['dignaga-portrait'], ['india-epistemology-sep'], ['india-perception-sep', 'dharmakirti-sep']],
    sources: [
      collection('dignaga-portrait', 'Wikimedia Commons — photograph of a modern portrait labeled Dignagacharyudu', 'https://commons.wikimedia.org/wiki/File:Portrait_of_Dignagacharyudu.JPG'),
      academic('india-epistemology-sep', 'Stanford Encyclopedia of Philosophy — Epistemology in Classical Indian Philosophy', 'https://plato.stanford.edu/entries/epistemology-india/'),
      academic('india-perception-sep', 'Stanford Encyclopedia of Philosophy — Perceptual Experience and Concepts in Classical Indian Philosophy, §4', 'https://plato.stanford.edu/entries/perception-india/'),
      academic('dharmakirti-sep', 'Stanford Encyclopedia of Philosophy — Dharmakīrti, §2.2', 'https://plato.stanford.edu/entries/dharmakiirti/'),
    ],
    visitorGuide: [
      {heading: 'Distinguishing the two pramāṇas', items: [
        {label: 'Perception', description: 'Nonconceptual awareness of particulars is analyzed separately from the classifications imposed in thought and language.', sourceIds: ['india-epistemology-sep', 'india-perception-sep']},
        {label: 'Inference', description: 'A reason or sign supports a conclusion only through disciplined relations, not through resemblance alone.', sourceIds: ['india-epistemology-sep']},
      ]},
      {heading: 'Concepts and commemoration', items: [
        {label: 'Exclusion', description: 'Apoha explains general thought through excluding what is other, with important later developments and disputes.', sourceIds: ['india-perception-sep', 'dharmakirti-sep']},
        {label: 'Unknown portrait history', description: 'The 2011 upload secures a photograph and license, not the painter, place, date, or historical likeness.', sourceIds: ['dignaga-portrait']},
      ]},
    ],
    resolution: 'Resolved: retained the installed modern portrait only with its artist, date, holding, and provenance limits explicit; verified the photographer and license, mapped pramāṇa and apoha claims without folding later Dharmakīrti into Dignāga, and added factual plaque, CTA, current review placeholder, and natural ratio.',
    lock: 'fnv1a64:2d005d238c67476b',
  },
  'forum-mozi-standards': {
    plaqueTitle: 'Modern Portrait of Mozi',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'mozi'}],
    articleTitle: 'Mozi',
    invitation: 'This 2021 imagined portrait identifies Mozi through modern convention; his article traces Mohist models, public standards, and later Canons without assigning every later technical doctrine to Mozi himself.',
    objectInterpretation: 'Vjacheslav Rublevskiy created this square conventional portrait in 2021 and dedicated it under CC0. It is a modern imaginative image with no holding collection, not a likeness from the Warring States period or evidence for Mozi’s biography, clothing, or authorship of the later Mohist Canons.',
    overrides: {
      displayName: 'Modern Portrait of Mozi',
      shortTitle: 'A Modern Image of Mozi',
      workLabel: 'MODERN COMMEMORATION · MOHIST STANDARDS AND ARGUMENT',
      dateLabel: 'Vjacheslav Rublevskiy · 2021 · CC0 digital work with no holding collection',
      question: 'How can a modern identifying image accompany Mohist argument without making later technical texts Mozi’s own speech?',
      frontSubtitle: 'An imagined portrait beside models, standards, and the later Mohist Canons',
      lead: 'A twenty-first-century artist imagines Mozi using conventional signs of an early Chinese thinker. The image aids orientation but supplies no evidence for his appearance or the layered Mohist corpus.',
    },
    paragraphs: [
      'A bearded figure in dark traditional robes appears against a muted green ground in Vjacheslav Rublevskiy’s square digital portrait, created in 2021 and dedicated under CC0. The Commons record supplies the maker and reuse status but no physical holding because this is a modern digital work. Its visual conventions identify Mozi for contemporary viewers; they do not preserve a Warring States likeness, clothing record, or witnessed scene. The portrait cannot decide which passages in the layered Mozi reflect an early teacher, later communities, editorial strata, or technical Mohist developments. It is a signpost into the argument, not evidence for biography or authorship.',
      'Mohist texts appeal to fa—models, standards, or exemplars—that can guide assessment in publicly usable ways. Comparison with established measures, practical results, and shared criteria supports an argumentative culture that asks why a judgment should be accepted. Yet “standard” does not name one modern scientific method, and Mohist positions cannot be detached from their ethical and political commitments, including impartial concern, benefit, merit, and opposition to aggressive war. Different chapters and layers require historical care. A model can discipline judgment while still raising questions about who selects it, which similarities matter, and how competing consequences are weighed.',
      'The later Mohist Canons and Explanations develop technical work on names, kinds, inference, knowledge, and disputation. They belong to the Mohist tradition but are not a transparent transcript of Mozi’s own voice, and calling them “logic” should not erase their distinctive vocabulary by forcing it into a ready-made Greek or modern system. The linked Mozi article provides the canonical account of the figure, textual layers, core teachings, and afterlives. The modern portrait contributes only contemporary commemoration. Its evidentiary weakness becomes a useful comparative lesson: recognizable faces travel easily, whereas responsible genealogy must distinguish an attributed founder, a developing school, and later texts that redirected the tradition’s tools.',
    ],
    paragraphSourceIds: [['mozi-portrait'], ['mohism-sep', 'mozi-primary'], ['mohism-sep', 'mozi-primary']],
    sources: [
      collection('mozi-portrait', 'Wikimedia Commons — Vjacheslav Rublevskiy, modern portrait of Mozi', 'https://commons.wikimedia.org/wiki/File:%D0%A4%D0%B8%D0%BB%D0%BE%D1%81%D0%BE%D1%84_%D0%9C%D0%BE-%D0%A6%D0%B7%D1%8B.jpg'),
      academic('mohism-sep', 'Stanford Encyclopedia of Philosophy — Mohism, §§1 and 3–5', 'https://plato.stanford.edu/entries/mohism/'),
      primary('mozi-primary', 'Chinese Text Project — Mozi', 'https://ctext.org/mozi'),
    ],
    visitorGuide: [
      {heading: 'Standards in Mohist argument', items: [
        {label: 'Fa', description: 'Models or standards offer publicly usable points of comparison rather than relying only on private preference.', sourceIds: ['mohism-sep', 'mozi-primary']},
        {label: 'Practical assessment', description: 'Mohist arguments connect standards with benefit, order, evidence, and consequences inside a wider ethical program.', sourceIds: ['mohism-sep', 'mozi-primary']},
      ]},
      {heading: 'Keeping the layers distinct', items: [
        {label: 'Later Mohist Canons', description: 'Technical texts on names and reasoning belong to later Mohist development, not automatically to Mozi’s own speech.', sourceIds: ['mohism-sep']},
        {label: 'A modern face', description: 'Rublevskiy’s 2021 image is imaginative commemoration and cannot document a Warring States appearance.', sourceIds: ['mozi-portrait']},
      ]},
    ],
    resolution: 'Resolved: verified the installed 2021 CC0 portrait and limited it to modern commemoration, separated Mozi from the later Canons, mapped fa and argument claims, and supplied factual plaque, exact canonical CTA, current review placeholder, and square natural mount.',
    lock: 'fnv1a64:7e4f3b9d05489733',
  },
  'forum-avicenna-demonstration': {
    plaqueTitle: 'Illuminated Opening of the Canon of Medicine',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'philosopher', id: 'avicenna'}],
    articleTitle: 'Ibn Sina / Avicenna',
    invitation: 'This 1597–98 illuminated Canon opening preserves a later medical witness; Avicenna’s article distinguishes the Canon, logic as an instrument, and explanatory demonstration across his wider system.',
    objectInterpretation: 'The installed object is the decorated opening of Yale’s Cushing Arabic MS 5, a copy of Avicenna’s Canon of Medicine dated 1006 AH / 1597–98 CE. The copyist and illuminator are not named in the supplied record. It is not an autograph, a page of Avicenna’s Logic, or a visual proof of demonstrative method.',
    overrides: {
      displayName: 'Illuminated Opening of the Canon of Medicine',
      shortTitle: 'A Later Canon Opening',
      workLabel: 'MANUSCRIPT RECEPTION · MEDICINE, LOGIC, AND DEMONSTRATION',
      dateLabel: 'Cushing Arabic MS 5 · copied 1006 AH / 1597–1598 CE · Yale Medical Historical Library',
      question: 'What can a later medical manuscript establish about Avicenna’s practice, and where must the account of demonstration come from other texts?',
      frontSubtitle: 'A decorated Canon witness beside logic, causes, and natural inquiry',
      lead: 'A later illuminated copy transmits Avicenna’s Canon of Medicine. Its opening makes medical reception material while leaving his broader logic and theory of demonstration to textual evidence.',
    },
    paragraphs: [
      'Red, blue, gold, and black ornament frames Arabic text in the decorated opening of Cushing Arabic MS 5. Yale’s Medical Historical Library holds the manuscript, and the source record dates the copy to 1006 AH, corresponding to 1597–98 CE. It does not name the copyist or illuminator or identify the visible opening as an autograph; Avicenna had died more than five centuries earlier. The object securely demonstrates later copying, adornment, and preservation of the Canon of Medicine. It does not show Avicenna’s hand, give the complete Canon, or visually represent the logical conditions of scientific demonstration.',
      'Avicenna treats logic as an instrument used across disciplined inquiries. Demonstration aims at explanatory knowledge: a conclusion is understood through premises and causes appropriate to a science, not merely accepted because an argument happens to be valid. Medicine relates bodily signs, causes, conditions, and treatment within its own subject matter, while natural philosophy investigates more general principles of change and embodied nature. The Canon is therefore relevant material evidence for Avicennian inquiry but cannot stand for his logic, metaphysics, psychology, or complete classification of sciences. The decorated invocation on one opening is especially unsuited to carrying every methodological claim.',
      'The linked Ibn Sina / Avicenna article places demonstration within that broader system and follows later Arabic, Hebrew, and Latin receptions. The manuscript’s late date is not a defect to hide: it shows continuing authority and the material choices through which readers met a medical work. At the same time, ornament should not be mistaken for proof that the codex was merely ceremonial, and visible script cannot identify how a particular owner interpreted it. Place of copying and intervening provenance remain unresolved in the supplied record. Visitors can use the object to ask how a demonstrative ideal travels through a practical science while keeping the manuscript witness, the Canon’s arguments, and Avicenna’s general logic distinct.',
    ],
    paragraphSourceIds: [['avicenna-canon-yale'], ['avicenna-natural-sep', 'avicenna-logic-sep'], ['avicenna-canon-yale', 'avicenna-natural-sep', 'avicenna-logic-sep']],
    sources: [
      collection('avicenna-canon-yale', 'Wikimedia Commons / Yale Medical Historical Library — Cushing Arabic MS 5', 'https://commons.wikimedia.org/wiki/File:Avicenna_canon_1597.jpg'),
      academic('avicenna-natural-sep', 'Stanford Encyclopedia of Philosophy — Ibn Sina’s Natural Philosophy', 'https://plato.stanford.edu/entries/ibn-sina-natural/'),
      academic('avicenna-logic-sep', 'Stanford Encyclopedia of Philosophy — Ibn Sina’s Logic', 'https://plato.stanford.edu/entries/ibn-sina-logic/'),
    ],
    visitorGuide: [
      {heading: 'Reading the manuscript witness', items: [
        {label: 'A later Canon copy', description: 'The 1597–98 manuscript records transmission of Avicenna’s medical work, not his handwriting or complete system.', sourceIds: ['avicenna-canon-yale']},
        {label: 'Unknown makers', description: 'The supplied record does not name the copyist, illuminator, or place of production.', sourceIds: ['avicenna-canon-yale']},
      ]},
      {heading: 'Following scientific explanation', items: [
        {label: 'Logic as instrument', description: 'Logical analysis serves multiple sciences rather than belonging only to one medical book.', sourceIds: ['avicenna-logic-sep']},
        {label: 'Demonstration', description: 'Explanatory knowledge depends on appropriate causes and premises, not validity detached from a science’s subject.', sourceIds: ['avicenna-natural-sep', 'avicenna-logic-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Yale Cushing Arabic MS 5 and its 1597–98 copy date, kept copyist, illuminator, place, and provenance limits visible, distinguished the Canon from Avicenna’s general logic, mapped the claims, and added factual plaque, exact CTA, current review placeholder, and natural portrait ratio.',
    lock: 'fnv1a64:c6d76aa937c734a0',
  },
  'forum-confucius-cultivation': {
    plaqueTitle: 'Confucius and Disciples Examining a Qiqi',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'confucius'}],
    articleTitle: 'Confucius',
    invitation: 'This Ming teaching image stages Confucius and disciples before tilting vessels; his article asks how ritual, learning, and humane responsiveness form judgment without treating the scene as biography.',
    objectInterpretation: 'The installed Ming-dynasty silk painting, held by the Confucius Museum in Qufu, depicts Confucius and disciples examining qiqi or tilting vessels. The supplied record does not name an artist, accession, or complete provenance. It is a later traditional teaching image, not a lifetime portrait, documentary event, or proof that Confucius handled these objects.',
    overrides: {
      displayName: 'Confucius and Disciples Examining a Qiqi',
      shortTitle: 'Confucius and the Tilting Vessels',
      workLabel: 'MING RECEPTION · RITUAL, LEARNING, AND FITTING MEASURE',
      dateLabel: 'Unknown Ming-dynasty artist · Confucius Museum, Qufu · accession not supplied',
      question: 'How can a later balance story illuminate cultivation without becoming documentary biography or a mechanical rule for conduct?',
      frontSubtitle: 'A traditional teaching scene beside ritual, humaneness, and responsive judgment',
      lead: 'A Ming artist stages Confucius and disciples around tilting vessels associated with balance. The scene belongs to later reception, while his ethics must be reconstructed from layered texts and traditions.',
    },
    paragraphs: [
      'Text occupies the upper portion of a tall silk painting, with three suspended vessels and a seated Confucius among attendants below. The Commons record identifies an unknown Ming-dynasty artist and the Confucius Museum in Qufu but supplies no accession number or full provenance. The work stages a traditional story about qiqi—vessels whose changing balance could prompt reflection on fullness and measure. It was made long after the historical figure and cannot document his face, disciples, room, or encounter with a particular object. Its evidentiary value is later visual pedagogy: a Confucius tradition turned balance into a scene of observation, conversation, and teaching.',
      'The Analects presents cultivation through learning, patterned practice, relationship, and humane responsiveness rather than one abstract decision procedure. Li, often translated as ritual propriety, includes embodied and linguistic forms that coordinate social life and educate attention. Ren, humaneness, is expressed through the quality of relationships and action, not held as an isolated inner possession. Ritual can become empty performance, so fitting response and cultivated judgment matter. The qiqi image can suggest measure, but it should not convert Confucian ethics into a rule that moderation always means choosing the numerical middle or that inherited forms deserve obedience without moral scrutiny.',
      'The linked Confucius article separates sparse historical anchors, the layered formation of the Analects, and later exemplary biography. That evidence boundary is essential here. The painting shows what a Ming viewer could present as Confucian teaching, not what occurred in the sixth or fifth century BCE. It also cannot speak for all later Confucian disagreements about ritual, spontaneity, family, government, and reform. Visitors can inspect the visual relation among teacher, disciples, text, and vessel, then move to the article for the sourced philosophical record. The unresolved maker and accession remain disclosed, allowing the image to function as reception without acquiring a fabricated collection history or lifetime authority.',
    ],
    paragraphSourceIds: [['confucius-qiqi'], ['confucius-sep', 'analects-primary'], ['confucius-sep', 'confucius-qiqi']],
    sources: [
      collection('confucius-qiqi', 'Wikimedia Commons / Confucius Museum — Confucius and disciples examining qiqi', 'https://commons.wikimedia.org/wiki/File:Confucius_qiqi.jpg'),
      academic('confucius-sep', 'Stanford Encyclopedia of Philosophy — Confucius', 'https://plato.stanford.edu/entries/confucius/'),
      primary('analects-primary', 'Chinese Text Project — Analects', 'https://ctext.org/analects'),
    ],
    visitorGuide: [
      {heading: 'Cultivation in relationship', items: [
        {label: 'Li', description: 'Ritual forms can train attention and conduct when enacted with understanding rather than mechanically.', sourceIds: ['confucius-sep', 'analects-primary']},
        {label: 'Ren', description: 'Humaneness appears through responsive relations and action, not as an isolated possession detached from practice.', sourceIds: ['confucius-sep', 'analects-primary']},
      ]},
      {heading: 'Reading the balance image', items: [
        {label: 'Qiqi', description: 'Tilting vessels support a later teaching story about fullness and measure rather than a universal numerical rule.', sourceIds: ['confucius-qiqi', 'confucius-sep']},
        {label: 'Ming reception', description: 'The painting is a later traditional scene, not eyewitness biography or a portrait made from life.', sourceIds: ['confucius-qiqi']},
      ]},
    ],
    resolution: 'Resolved: verified the installed Ming qiqi scene while disclosing its unknown artist, accession, and provenance; separated reception from biography, mapped ritual and humaneness claims, and added factual plaque, exact Confucius CTA, current review placeholder, and natural portrait ratio.',
    lock: 'fnv1a64:098be420ce0ae756',
  },
  'forum-mencius-humane-rule': {
    plaqueTitle: 'Mencius’s Mother Chooses a Place for Learning',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'mencius'}],
    articleTitle: 'Mencius',
    invitation: 'Use this later illustration of the “three moves” story to ask how surroundings can foster moral growth; Mencius’s article distinguishes that reception from his arguments about sprouts and humane rule.',
    objectInterpretation: 'The installed print illustrates San Qian Ze Li, the later story that Mencius’s mother moved home to find a fitting educational environment. Its image derives from Hu Wenhuan’s Ming Wanli-era illustrated tradition and circulated in a later Qing publication; the supplied record does not identify the surviving impression’s holding institution or full provenance. It documents reception, not an event witnessed during Mencius’s life or a diagram of the four sprouts.',
    overrides: {
      displayName: 'Mencius’s Mother Chooses a Place for Learning',
      shortTitle: 'The “Three Moves” Illustration',
      workLabel: 'LATER RECEPTION · ENVIRONMENT, CULTIVATION, AND HUMANE RULE',
      dateLabel: 'Ming Wanli-era image · later Qing publication · holding institution not stated',
      question: 'How do moral beginnings grow, and what responsibilities do homes, teachers, and governments bear for the conditions of cultivation?',
      frontSubtitle: 'A later educational legend beside moral sprouts, material conditions, and humane government',
      lead: 'A later illustration turns Mencius’s mother into an exemplar of environmental care. Mencius’s own arguments connect incipient moral responses to cultivation and the material conditions sustained or damaged by political rule.',
    },
    paragraphs: [
      'Figures, buildings, and landscape organize the installed illustration of San Qian Ze Li, the story that Mencius’s mother moved three times before finding surroundings suited to her son’s education. The Commons record associates the image with Hu Wenhuan’s Ming Wanli-period Illustrations of Mencius and with a later Qing publication, but it does not supply a holding institution, accession, or complete chain of custody for this impression. The picture belongs to exemplary reception: it made maternal judgment and educational setting visible to later readers. It does not document an episode from Mencius’s lifetime, establish his mother’s appearance, or picture the philosophical “sprouts” described in the received text.',
      'Mencius identifies incipient responses associated with compassion, shame, deference, and judgments of right and wrong. Calling them sprouts emphasizes both an orientation and an incompleteness: they can be extended through reflection and practice, or injured through neglect and hostile conditions. The view is therefore neither the claim that people are born with finished virtues nor the claim that education writes morality onto wholly indifferent material. Agricultural language joins capacity, attention, environment, and effort. Later Confucians contested how to interpret human nature and cultivation, so “Mencian optimism” is an inadequate substitute for the text’s arguments and the pressures they place on moral development.',
      'Those pressures reach politics. Mencius repeatedly links humane government to reliable livelihood, restrained taxation and labor demands, care for the vulnerable, and a ruler’s responsiveness to the people. Material insecurity can deform conduct without erasing responsibility, while authority loses moral standing when it treats subjects as expendable. The “three moves” illustration offers a later domestic analogy for the importance of surroundings, but it cannot by itself prove a political program or collapse family authority into government. The linked Mencius article follows the textual debates about sprouts, cultivation, rulership, remonstrance, and legitimacy. The unidentified present holding and layered publication history remain disclosed rather than converted into a false object provenance.',
    ],
    paragraphSourceIds: [['mencius-three-moves'], ['mencius-sep', 'mencius-primary'], ['mencius-sep', 'mencius-primary', 'mencius-three-moves']],
    sources: [
      collection('mencius-three-moves', 'Wikimedia Commons — San Qian Ze Li, Illustrations of Mencius', 'https://commons.wikimedia.org/wiki/File:San_Qian_Ze_Li,_Illustrations_of_Mencius.jpg'),
      academic('mencius-sep', 'Stanford Encyclopedia of Philosophy — Mencius', 'https://plato.stanford.edu/entries/mencius/'),
      primary('mencius-primary', 'Chinese Text Project — Mengzi', 'https://ctext.org/mengzi'),
    ],
    visitorGuide: [
      {heading: 'From beginnings to virtue', items: [
        {label: 'Four sprouts', description: 'Compassion, shame, deference, and discriminating judgment are beginnings that require extension rather than completed virtues.', sourceIds: ['mencius-sep', 'mencius-primary']},
        {label: 'Cultivating conditions', description: 'Practice and surroundings can nourish or damage moral growth without mechanically determining a person’s actions.', sourceIds: ['mencius-sep', 'mencius-primary']},
      ]},
      {heading: 'Testing political authority', items: [
        {label: 'Humane rule', description: 'Rulers are judged by whether institutions and livelihoods allow people to live and cultivate themselves.', sourceIds: ['mencius-sep', 'mencius-primary']},
        {label: 'A later family exemplar', description: 'The three-moves print visualizes later reception of Mencius’s mother, not eyewitness biography or a political blueprint.', sourceIds: ['mencius-three-moves']},
      ]},
    ],
    resolution: 'Resolved: identified the installed three-moves illustration as later reception, disclosed its layered date and unresolved holding provenance, separated the legend from the four sprouts, sourced humane-rule claims, and added the factual plaque, exact Mencius CTA, current review placeholder, and natural portrait mounting.',
    lock: 'fnv1a64:1780922324ac8ca1',
  },
  'forum-al-farabi-virtuous-city': {
    plaqueTitle: 'The Round City in the Time of al-Mansur',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'al-farabi'}],
    articleTitle: 'Al-Farabi',
    invitation: 'Compare Guy Le Strange’s 1900 reconstruction of eighth-century Baghdad with al-Farabi’s normative virtuous city, keeping historical map and philosophical model distinct.',
    objectInterpretation: 'The installed plan is Guy Le Strange’s 1900 Map II, a modern reconstruction of Baghdad’s Round City in the time of the eighth-century caliph al-Mansur. It is neither an Abbasid-period survey nor al-Farabi’s diagram of a virtuous city. Al-Farabi lived later and worked in several intellectual centers; the plan supplies a retrospective image of an earlier Abbasid capital, not the architecture of his political ideal.',
    overrides: {
      displayName: 'The Round City in the Time of al-Mansur',
      shortTitle: 'Le Strange’s Round City Plan',
      workLabel: '1900 HISTORICAL RECONSTRUCTION · ABBASID BAGHDAD',
      dateLabel: 'Guy Le Strange · Map II · 1900 · reconstruction of an eighth-century city',
      question: 'What changes when a reconstructed historical capital is compared with, but not mistaken for, a philosophical account of virtuous association?',
      frontSubtitle: 'A modern Baghdad plan beside knowledge, leadership, civic cooperation, and flourishing',
      lead: 'Le Strange reconstructs the Round City founded under al-Mansur. Al-Farabi’s virtuous city is instead a normative account of coordinated human capacities, knowledge, and ends.',
    },
    paragraphs: [
      'Concentric walls, gates, roads, and a central precinct make Guy Le Strange’s plan of the Round City immediately legible. Published as Map II in Baghdad During the Abbasid Caliphate in 1900, it reconstructs the city in the time of al-Mansur from historical and topographical evidence available to a modern scholar. The image is therefore twice removed from al-Farabi’s political writing: it is not an eighth-century survey, and the city it reconstructs predates the philosopher’s later life. It can orient visitors to the continuing prestige of Abbasid Baghdad and to modern historical imagination, but it cannot show where al-Farabi studied on a given date or serve as his plan for ideal government.',
      'Al-Farabi’s virtuous city is a normative association ordered toward genuine human flourishing. Its members contribute differentiated capacities, while leadership must unite theoretical understanding, practical judgment, persuasion, law, and education. The model depends on his accounts of knowledge, psychology, religion, and human perfection; it is not just an urban design or an endorsement of an existing caliphate. Comparisons between ruler and bodily organs can illuminate functional coordination, yet they also require scrutiny because hierarchy and unity do not answer every question about consent, succession, or coercion. His classifications of non-virtuous cities further show that political failure can arise from shared misunderstandings of the good, not merely poor administration.',
      'The linked article situates these arguments within Arabic falsafa and al-Farabi’s transformative engagements with Plato and Aristotle. Greek inheritances were translated, reorganized, and debated in Islamic intellectual settings; “transmission” should not imply passive copying. Le Strange’s map can make one historical center imaginable while the sources prevent a false equation among the Round City, Abbasid political reality, and the virtuous city. Al-Farabi’s movements and the chronology of his intellectual formation also resist treating one city as a complete biographical container. Visitors can use the plan to ask how spatial order represents authority, then turn to the text-based account of knowledge and civic ends. The map’s modern, reconstructive status remains part of the interpretation rather than disappearing behind its precision.',
    ],
    paragraphSourceIds: [['round-city-map', 'round-city-book'], ['alfarabi-sep'], ['alfarabi-sep', 'round-city-book']],
    sources: [
      collection('round-city-map', 'Wikimedia Commons — Guy Le Strange, Round City in the Time of Mansur', 'https://commons.wikimedia.org/wiki/File:Round_City_in_the_Time_of_Mansur_(Le_Strange).png'),
      primary('round-city-book', 'Internet Archive — Guy Le Strange, Baghdad During the Abbasid Caliphate (1900)', 'https://archive.org/details/baghdadduringabb00lest'),
      academic('alfarabi-sep', 'Stanford Encyclopedia of Philosophy — Al-Farabi', 'https://plato.stanford.edu/entries/al-farabi/'),
    ],
    visitorGuide: [
      {heading: 'Do not merge two cities', items: [
        {label: 'Round City', description: 'Le Strange’s 1900 plan reconstructs al-Mansur’s earlier Baghdad; it is a historical argument, not an Abbasid survey.', sourceIds: ['round-city-map', 'round-city-book']},
        {label: 'Virtuous city', description: 'Al-Farabi’s city is a normative association ordered to human perfection, not a street plan.', sourceIds: ['alfarabi-sep']},
      ]},
      {heading: 'Political coordination', items: [
        {label: 'Knowledge and leadership', description: 'The ruler’s role joins theoretical understanding, practical judgment, education, law, and persuasion.', sourceIds: ['alfarabi-sep']},
        {label: 'Shared ends', description: 'Political association is assessed by the conception of flourishing toward which its differentiated members cooperate.', sourceIds: ['alfarabi-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the installed object to Le Strange’s 1900 Round City reconstruction, removed the false equation with al-Farabi’s city or biography, mapped political claims, and added factual plaque, exact Al-Farabi CTA, current review placeholder, and natural landscape mounting.',
    lock: 'fnv1a64:5f59843751fdaa5c',
  },
  'forum-maimonides-law': {
    plaqueTitle: 'Illuminated Mishneh Torah, Books 7–14',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'philosopher', id: 'maimonides'}],
    articleTitle: 'Maimonides',
    invitation: 'Read this later illuminated codex as evidence of the Mishneh Torah’s reception, then follow Maimonides’s article through codification, law, philosophy, and their contested relationship.',
    objectInterpretation: 'This northern Italian manuscript of Books 7–14 of the Mishneh Torah was made around 1457–1465 and is now Israel Museum object 322896, centuries after Maimonides composed the code. The image record has a material rights conflict: Commons applies a public-domain artwork rationale, while imported Google Art metadata credits the photograph © Israel Museum, photographed by Ardon Bar Hama. The Atlas therefore does not assert an unqualified public-domain status for the installed reproduction.',
    overrides: {
      displayName: 'Illuminated Mishneh Torah, Books 7–14',
      shortTitle: 'The Later Mishneh Torah Codex',
      workLabel: 'ILLUMINATED LEGAL MANUSCRIPT · RECEPTION AND CODIFICATION',
      dateLabel: 'Northern Italy · c. 1457–1465 · Israel Museum 322896 · reproduction rights unresolved',
      question: 'How does the material organization of a legal code shape study and practice, and how should it be related to philosophy without collapsing genres?',
      frontSubtitle: 'A later illuminated codex beside law, authority, education, and interpretation',
      lead: 'A lavish later manuscript shows the Mishneh Torah’s continuing reception. Maimonides’s systematic code reorganizes inherited law, while its relationship to his philosophical writing remains a question of genre, audience, and purpose.',
    },
    paragraphs: [
      'A gold architectural frame, Hebrew text, and richly colored marginal decoration fill the installed opening from Books 7–14 of the Mishneh Torah. The Israel Museum identifies the codex as northern Italian work made about 1457–1465, long after Maimonides’s death. Its decoration establishes later prestige and reception, not the appearance of a twelfth-century authorial copy. The digital reproduction also carries unresolved rights evidence: Commons invokes a public-domain-art rationale, while metadata imported from Google Art credits the Israel Museum photograph to Ardon Bar Hama. Those statements are not silently harmonized. The object record and caption identify the manuscript securely, while the Atlas discloses that the photograph’s reuse status requires further institutional clarification.',
      'Maimonides organized the Mishneh Torah as a comprehensive fourteen-book code, ordering legal materials by subject and presenting rulings without reproducing every preceding debate. That form is itself an intellectual intervention: sequence, classification, scope, and accessibility change how a reader encounters tradition. Codification does not end interpretation. Readers contested sources, methods, decisions, and the code’s authority, and manuscript study remained one practice among commentary, adjudication, teaching, and communal observance. The illuminated opening cannot demonstrate these arguments by appearance, but its carefully articulated page invites attention to how material and conceptual structures guide reading. Neither “rational system” nor “authoritarian code” captures the work without attention to its stated purposes and reception.',
      'Maimonides also wrote the Guide of the Perplexed in a different genre, language, and rhetorical situation. Law can shape action, habits, institutions, and collective order, while philosophical inquiry addresses demonstration, interpretation, divine language, nature, and human perfection. Scholars disagree about how fully the legal and philosophical projects disclose one coherent position, so the exhibit does not treat the code as a disguised summary of the Guide or the Guide as a detachable modern philosophy. The linked article traces Maimonides within Jewish legal life and the Arabic-speaking philosophical world. Visitors can inspect the codex as evidence of later transmission while preserving differences among object, code, commentary, and philosophical work. The unresolved photographic rights record is a limit on the reproduction, not a license to invent certainty.',
    ],
    paragraphSourceIds: [['maimonides-codex'], ['maimonides-sep', 'mishneh-primary'], ['maimonides-sep', 'maimonides-codex']],
    sources: [
      collection('maimonides-codex', 'Wikimedia Commons / Israel Museum — Mishneh Torah, Books 7–14, object 322896', 'https://commons.wikimedia.org/wiki/File:Mishneh_Torah_(Books_7_to_14)_by_Maimonides_-_Google_Art_Project.jpg'),
      academic('maimonides-sep', 'Stanford Encyclopedia of Philosophy — Maimonides', 'https://plato.stanford.edu/entries/maimonides/'),
      primary('mishneh-primary', 'Sefaria — Mishneh Torah', 'https://www.sefaria.org/texts/Halakhah/Mishneh%20Torah'),
    ],
    visitorGuide: [
      {heading: 'Reading a code', items: [
        {label: 'Fourteen-book architecture', description: 'The Mishneh Torah reorganizes a large legal tradition by subject and ruling, making arrangement part of its intervention.', sourceIds: ['maimonides-sep', 'mishneh-primary']},
        {label: 'Continuing interpretation', description: 'Codification shaped study and practice but did not eliminate disputes over sources, rulings, authority, or application.', sourceIds: ['maimonides-sep']},
      ]},
      {heading: 'Keeping genres visible', items: [
        {label: 'Code and Guide', description: 'The legal code and philosophical Guide differ in genre and audience; their relationship remains interpretively contested.', sourceIds: ['maimonides-sep']},
        {label: 'Later reception object', description: 'This fifteenth-century illuminated codex witnesses transmission, not Maimonides’s workshop or original manuscript.', sourceIds: ['maimonides-codex']},
      ]},
    ],
    resolution: 'Resolved with a disclosed evidence limit: verified the later Israel Museum codex and its reception role, recorded the Commons/photograph rights conflict instead of claiming certainty, mapped code-and-Guide claims, and added factual plaque, exact Maimonides CTA, current review placeholder, and natural landscape mounting.',
    lock: 'fnv1a64:a79cd0c5617ee712',
  },
  'forum-confucian-music': {
    plaqueTitle: 'Set-Bells from the Tomb of Marquis Yi of Zeng',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'philosopher', id: 'confucius'}],
    articleTitle: 'Confucius',
    invitation: 'Examine an ancient tuned bell set as material context for ritual music, then use Confucius’s article to ask how patterned sound can cultivate feeling and coordinated conduct.',
    objectInterpretation: 'Gary Todd’s 2010 photograph documents the fifth-century BCE set-bells excavated from the tomb of Marquis Yi of Zeng and displayed at the Hubei Provincial Museum. The photograph is CC0; the ancient objects and modern photograph have distinct dates. These bells are Warring States material context, not instruments documented as Confucius’s possessions or direct evidence for every Confucian claim about music.',
    overrides: {
      displayName: 'Set-Bells from the Tomb of Marquis Yi of Zeng',
      shortTitle: 'The Marquis Yi Set-Bells',
      workLabel: 'RITUAL INSTRUMENTS · SOUND, CEREMONY, AND SOCIAL FORM',
      dateLabel: 'Bells c. 433 BCE · photographed 2010 · Hubei Provincial Museum',
      question: 'How can organized sound form emotion and shared action, and where can musical harmony conceal hierarchy or exclusion?',
      frontSubtitle: 'A Warring States bell set beside ritual, cultivation, coordination, and political order',
      lead: 'The Marquis Yi bells materialize extraordinary musical and ceremonial organization. They contextualize, but do not directly illustrate, Confucian arguments that ritual and music help form responsive persons and communities.',
    },
    paragraphs: [
      'Ranks of bronze bells hang in a monumental wooden frame in Gary Todd’s 2010 photograph at the Hubei Provincial Museum. Excavated from the tomb of Marquis Yi of Zeng, sealed around 433 BCE, the set preserves inscriptions and a sophisticated tuning system in which bells can sound distinct tones depending on where they are struck. UNESCO’s Memory of the World record emphasizes the set’s musical and documentary importance. The ancient instruments, their archaeological context, and the modern CC0 photograph are different layers of evidence. The bells belong to a Warring States elite court and are not known instruments of Confucius; they cannot alone establish how a particular philosophical passage was performed or heard.',
      'In Confucian traditions, music and ritual are often formative practices rather than autonomous arts detached from ethics. Rhythm, pitch, movement, timing, text, role, and ceremony coordinate bodies and educate attention and feeling. The Analects associates cultivated musical judgment with broader learning and conduct, while later Confucian texts develop the political effects of ordered and disordered sound in divergent ways. Harmony here need not mean sameness: an ensemble coordinates differentiated tones. Yet the analogy between musical and social order can naturalize rank, suppress discord, or hide who controls the pattern. Object-led interpretation therefore holds together technical accomplishment, ceremonial hierarchy, aesthetic response, and critical questions about power.',
      'The bell set postdates Confucius by decades and belongs to a specific regional polity, so it provides context rather than proof of his practice. Its survival radically deepens knowledge of ancient Chinese sound worlds, but it does not authorize a single timeless category called “Confucian music.” The linked Confucius article follows ritual, learning, humaneness, and exemplary judgment through the layered textual record. Visitors can study the physical scale and ordered difference of the bells, then test the metaphor of harmony against philosophical claims and social consequences. A complete history would also require archaeological publications, performance reconstruction, inscriptions, and traditions beyond Confucius; this focused exhibit states that boundary instead of making one spectacular ensemble stand for all early Chinese music.',
    ],
    paragraphSourceIds: [['marquis-bells', 'marquis-unesco'], ['confucius-sep', 'analects-music'], ['marquis-unesco', 'confucius-sep']],
    sources: [
      collection('marquis-bells', 'Wikimedia Commons — Gary Todd, Two-Tone Set-Bells of Marquis Yi of Zeng', 'https://commons.wikimedia.org/wiki/File:Two_Tone_Set-bells_of_Marquis_Yi_of_Zeng_(10166271244).jpg'),
      collection('marquis-unesco', 'UNESCO Memory of the World — Suizhou Bianzhong of Marquis Yi of Zeng', 'https://www.unesco.org/en/memory-world/suizhou-bianzhong-marquis-yi-zeng?hub=1081'),
      academic('confucius-sep', 'Stanford Encyclopedia of Philosophy — Confucius', 'https://plato.stanford.edu/entries/confucius/'),
      primary('analects-music', 'Chinese Text Project — Analects', 'https://ctext.org/analects'),
    ],
    visitorGuide: [
      {heading: 'Listen through the object', items: [
        {label: 'Two-tone bells', description: 'The bell set preserves an inscription-rich tuning system in which individual bells can produce distinct tones.', sourceIds: ['marquis-unesco']},
        {label: 'Ritual scale', description: 'Instrument, frame, performers, tomb context, and courtly resources tie musical accomplishment to social organization.', sourceIds: ['marquis-bells', 'marquis-unesco']},
      ]},
      {heading: 'Test the harmony analogy', items: [
        {label: 'Cultivated feeling', description: 'Confucian reflection links musical practice to trained attention, affect, ritual conduct, and relationship.', sourceIds: ['confucius-sep', 'analects-music']},
        {label: 'Structured difference', description: 'Harmony can coordinate distinct tones, but political analogies still require questions about rank, control, and exclusion.', sourceIds: ['confucius-sep']},
      ]},
    ],
    resolution: 'Resolved: separated the ancient bells from Todd’s 2010 CC0 photograph, verified the Hubei/UNESCO record and contextual rather than direct relation to Confucius, mapped music-and-ritual claims, and added factual plaque, exact Confucius CTA, current review placeholder, and natural landscape mounting.',
    lock: 'fnv1a64:0cee16cf927946a9',
  },
  'forum-al-ghazali-causation': {
    plaqueTitle: 'Opening of a Manuscript of Faysal al-Tafriqa',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'philosopher', id: 'al-ghazali'}],
    articleTitle: 'Al-Ghazali',
    invitation: 'Begin with this undated Faysal manuscript opening on interpretation and unbelief, then follow al-Ghazali’s article to his distinct critique of causal necessity in the Incoherence.',
    objectInterpretation: 'The installed image shows a two-page opening of Faysal al-Tafriqa, catalogued by Umm al-Qura University as manuscript 16167-2. The Commons record supplies no date, named scribe, production place, or provenance, and its public-domain assertion rests on the upload’s Saudi legal rationale rather than a linked institutional rights statement. Faysal concerns interpretation and boundaries of unbelief; it is not a manuscript of the causal discussion in the Incoherence of the Philosophers.',
    overrides: {
      displayName: 'Opening of a Manuscript of Faysal al-Tafriqa',
      shortTitle: 'The Faysal Manuscript Opening',
      workLabel: 'UNDATED MANUSCRIPT WITNESS · INTERPRETATION AND BELIEF',
      dateLabel: 'Umm al-Qura University 16167-2 · date, scribe, place, and provenance not supplied',
      question: 'How can al-Ghazali criticize claims of causal necessity while retaining rigorous reasoning across philosophy, theology, law, and interpretation?',
      frontSubtitle: 'An undated Faysal witness beside interpretation, philosophical critique, and divine action',
      lead: 'This Faysal opening witnesses a work about interpretation and the boundaries of unbelief, not the Incoherence’s causal discussion. Together the distinct texts resist reducing al-Ghazali to a simple enemy of reason.',
    },
    paragraphs: [
      'Two facing manuscript pages with framed Arabic text form the installed opening of Faysal al-Tafriqa. The Commons record links it to Umm al-Qura University manuscript 16167-2 but gives no production date, named scribe, place, or chain of provenance. It also labels the image public domain through an uploader-supplied Saudi legal rationale rather than a linked institutional reuse statement. The manuscript is a witness to Faysal, a work concerned with interpretation and the dangerous expansion of charges of unbelief. It is not a page from the Incoherence of the Philosophers and cannot visually prove al-Ghazali’s account of causation. Those object, textual, and rights limits remain explicit.',
      'In the Incoherence, al-Ghazali targets the philosophers’ claim that what is called a cause necessitates its effect through the natures of created things. Repeated conjunction—fire with burning cotton, for example—does not by observation alone disclose an independently necessary connection. The argument makes room for divine agency, but its precise account of regularity, created powers, and occasionalism remains debated. It is therefore misleading to say simply that “fire does not burn” or that al-Ghazali rejected science and logic. He studied and used demonstrative methods, appropriated Avicennian concepts in other writings, and criticized specified doctrines. Reason operates within a varied theological, legal, ethical, and spiritual project rather than standing outside revelation as its undifferentiated opposite.',
      'Faysal adds a different problem: how to distinguish legitimate figurative interpretation, doctrinal error, and unbelief while limiting reckless condemnation. Placing its manuscript beside causation can illuminate the breadth of al-Ghazali’s inquiry only if the works are not collapsed. The linked article traces philosophy, kalām, interpretation, ethics, and spiritual practice across their distinct settings. Visitors can inspect the copied opening as evidence of later textual transmission, then follow claim-level sources for causal necessity and interpretive judgment. A date or provenance for this manuscript could sharpen its reception history, but the present record does not supply one. The exhibit accordingly discloses the missing evidence rather than calling it merely a “later copy” or inventing a scribe, workshop, or institutional license.',
    ],
    paragraphSourceIds: [['faysal-manuscript'], ['ghazali-sep'], ['ghazali-sep', 'faysal-manuscript']],
    sources: [
      collection('faysal-manuscript', 'Wikimedia Commons / Umm al-Qura University — Faysal manuscript 16167-2', 'https://commons.wikimedia.org/wiki/File:Faysal_manuscript.jpg'),
      academic('ghazali-sep', 'Stanford Encyclopedia of Philosophy — Al-Ghazali', 'https://plato.stanford.edu/entries/al-ghazali/'),
    ],
    visitorGuide: [
      {heading: 'Keep the textual problems distinct', items: [
        {label: 'Faysal al-Tafriqa', description: 'This work examines interpretation and the boundary between error and unbelief; the installed opening witnesses its transmission.', sourceIds: ['faysal-manuscript', 'ghazali-sep']},
        {label: 'The Incoherence', description: 'The famous causal argument occurs in a different work and challenges claims of necessary connection.', sourceIds: ['ghazali-sep']},
      ]},
      {heading: 'Read beyond slogans', items: [
        {label: 'Observed conjunction', description: 'Regular succession does not by itself demonstrate an independently necessary causal power.', sourceIds: ['ghazali-sep']},
        {label: 'Reasoned critique', description: 'Al-Ghazali uses logic and philosophical concepts while contesting particular doctrines; critique is not wholesale rejection.', sourceIds: ['ghazali-sep']},
      ]},
    ],
    resolution: 'Resolved with evidence limits: corrected the installed image to an undated two-page Faysal opening, disclosed its missing production/provenance and uploader-based rights rationale, separated Faysal from the Incoherence’s causal argument, and added factual plaque, exact Al-Ghazali CTA, current review placeholder, and natural landscape mounting.',
    lock: 'fnv1a64:28bc7c774450a9ae',
  },
};

const reviewMethod = 'Galleries 10–11 supplemental review: exactly three concurrent GPT-5.6 Terra/High read-only evidence scopes of eight exhibits each were reconciled by the Sol parent across installed-object identity, attribution, dating, institution, provenance, rights, captions, alt text, claim-level sources, factual plaques, canonical relationships, routes, review locks, natural-ratio mounting, and desktop, mobile, and staged-3D presentation.';

const visualReview = (id: string): NonNullable<NonNullable<MuseumSupplementalExhibit['review']>['visualReview']> => ({
  desktop: {
    reviewedOn: '2026-08-20',
    viewport: '1440×900',
    evidence: `Direct route inspected with the full uncropped object preview, three untitled sourced paragraphs, subject-specific guide, factual plaque relationship, complete article CTA, and no horizontal overflow. Evidence: docs/visual-validation/gallery-11-supplementals/desktop/${id}.png`,
  },
  mobile: {
    reviewedOn: '2026-08-20',
    viewport: '390×844',
    evidence: `Direct route inspected with wrapped factual title, full aspect-safe object preview, scrollable interpretation, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-11-supplementals/mobile/${id}.png`,
  },
  threeDimensional: {
    reviewedOn: '2026-08-20',
    viewport: '1280×720 fresh direct-route session',
    evidence: `Fresh direct-route session inspected after closing the detail view: authored viewpoint, factual two-level plaque, distinct installation, working visit controls, and natural-ratio media mount. Evidence: docs/visual-validation/gallery-11-supplementals/staged-3d/${id}.png`,
  },
});

export const reviewCoreQuestionsForumSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery 11 review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery 11 presentation for ${input.id}.`);
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
      panelKicker: 'Gallery 11 supplemental exhibit',
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
