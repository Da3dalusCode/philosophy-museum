import type {ArticleSection, CitationLocatorKind, EditorialSource, Philosopher} from '../../types/philosophy';
import {applyModernClusterEditorialConfig, type ModernClusterEditorialConfig} from './modernClusterEditorialHelpers';
import {citation as rawCitation} from './pilotHelpers';

const c = (sourceId: string, kind?: CitationLocatorKind, value?: string, note?: string) =>
  rawCitation(sourceId, kind, value, note);

const section = (
  id: string,
  title: string,
  paragraphs: string[],
  relatedPhilosopherIds?: string[],
  relatedWorkTitles?: string[],
): ArticleSection => ({id, title, paragraphs, relatedPhilosopherIds, relatedWorkTitles});

const thalesSources: EditorialSource[] = [
  {
    id: 'tha-aristotle-met', type: 'primary-text', authors: ['Aristotle'], title: 'Metaphysics, Book 1',
    translator: 'Hugh Tredennick', publisher: 'Perseus Digital Library / Harvard University Press', year: 1933,
    url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0052%3Abook%3D1%3Asection%3D983b', accessedOn: '2026-08-02',
    note: 'Later philosophical testimony, cited by Bekker numbers; Aristotle reconstructs Thales within his own inquiry into causes.',
  },
  {
    id: 'tha-sep', type: 'scholarly-reference', authors: ['Patricia Curd'], title: 'Presocratic Philosophy',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Fall 2019', year: 2019,
    url: 'https://plato.stanford.edu/archives/fall2019/entries/presocratics/', accessedOn: '2026-08-02',
    note: 'Specialist account used for the Milesians, evidence limits, cosmology, and the risks of reading Aristotle anachronistically.',
  },
  {
    id: 'tha-iep', type: 'scholarly-reference', authors: ['Patricia O’Grady'], title: 'Thales of Miletus',
    containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin',
    url: 'https://iep.utm.edu/thales/', accessedOn: '2026-08-02',
    note: 'Independent specialist overview consulted critically where its reconstructions extend beyond secure ancient testimony.',
  },
  {
    id: 'tha-first', type: 'journal-article', authors: ['Peter S. Fosl'], title: 'Thales – the “first philosopher”? A troubled chapter in the historiography of philosophy',
    containerTitle: 'British Journal for the History of Philosophy', year: 2022, doi: '10.1080/09608788.2022.2029347',
    url: 'https://doi.org/10.1080/09608788.2022.2029347', accessedOn: '2026-08-02',
    note: 'Peer-reviewed study used to qualify the modern formula that Thales was simply and universally regarded as the first philosopher.',
  },
];

const thalesSections: ArticleSection[] = [
  section('orientation', 'A beginning remembered through later witnesses', [
    'Thales of Miletus belongs near the beginning of Greek philosophy, but “the first philosopher” is a retrospective title rather than a fact recorded by his contemporaries. Aristotle calls him the leader of a kind of inquiry that sought principles in material terms; later histories then made him an origin point for philosophy. Yet earlier Greek wisdom included poets, lawgivers, craftspeople, healers, and non-Greek traditions, while ancient authors did not unanimously crown one inventor of philosophy. Thales is best introduced as the earliest named Milesian whom later evidence associates with a general account of nature—not as a solitary creator who caused rational thought to appear from nowhere.',
    'Almost everything said about him must carry a source label. No securely identifiable sentence written by Thales survives, and it is uncertain whether he composed a treatise at all. Aristotle wrote roughly two centuries later. Herodotus, Plato, and later biographical and doxographical writers preserve claims with different genres and purposes: philosophical reconstruction, history, comedy, sage legend, or technical genealogy. A responsible portrait therefore asks what a witness reports, how late it is, and why the report mattered. The result is less tidy than the familiar schoolbook biography, but more revealing: Thales became important both for views possibly his own and for the uses later Greeks made of an exemplary beginning.',
  ], ['anaximander', 'anaximenes', 'aristotle'], ['Metaphysics', 'Early Greek Philosophy']),
  section('miletus-dates', 'Miletus and a chronology that will not become a lifespan', [
    'Thales is securely associated with Miletus, an Ionian Greek city on the western coast of Anatolia. Conventional dates such as about 624–546 BCE combine late biographical calculations with the eclipse story and should not be displayed as if they came from civic records. It is safer to place him in the late seventh and early sixth centuries BCE, probably active around the opening decades of the sixth. Even the report that he advised Ionians during political danger belongs to a remembered sage biography, not a modern archive. Dates orient the visitor; they do not turn a sparse dossier into a continuous life story.',
    'Miletus participated in maritime trade, colonization, political conflict, and exchange across the eastern Mediterranean and Near East. Egyptian and Babylonian mathematics and astronomy long preceded the Milesians, so claims that Greeks invented inquiry unaided are untenable. At the same time, the surviving evidence rarely permits a precise route by which a particular technique reached Thales. The historically useful point is modest: Ionian inquiry developed in a connected world of navigation, calendars, land measurement, civic deliberation, poetry, and cult. These activities made patterns of sky, season, distance, and material change practically consequential before later writers separated philosophy, science, engineering, and religion into distinct fields.',
  ], ['anaximander', 'anaximenes'], []),
  section('water', 'What Aristotle’s water report does—and does not—establish', [
    'The most important doctrinal testimony occurs in Aristotle’s Metaphysics. While reviewing predecessors who sought causes and principles, Aristotle says that Thales made water the principle and connected this with the earth’s resting on water. Aristotle then offers possible motivations: nourishment is moist, heat lives through moisture, and seeds have a moist nature. His grammar makes some of this reasoning conjectural. The passage securely shows what Aristotle took Thales to have maintained; it does not supply Thales’ own surviving argument. Nor does it settle whether water was an original state, a continuing constituent of everything, a life condition, or several of these at once.',
    'Calling water an archē can also mislead if the mature Aristotelian notion of material cause is projected backward. Thales may not have possessed a technical vocabulary distinguishing matter, form, mover, and end. Nevertheless, the report attributes an ambitious explanatory compression: the many features of the world are related to one fundamental source. Water is mobile, life-sustaining, present in weather and bodies, and capable of visible changes, so it is not an arbitrary answer within an archaic environment. The educational value lies neither in praising Thales as secretly modern nor dismissing him for bad chemistry. It lies in seeing how a proposed unity generates new demands about origin, persistence, and transformation.',
  ], ['aristotle', 'anaximander', 'anaximenes'], ['Metaphysics']),
  section('earth-cosmos', 'Earth on water and the scale of cosmological explanation', [
    'Aristotle also reports that Thales explained the earth’s support by saying it rests or floats on water, comparing it to something buoyed by a surrounding medium. Aristotle objects that the account merely postpones the question: why should the water remain supported? That criticism is valuable evidence for reception, but it should not be converted into a complete Thalean cosmology. Other reports about earth shape, stars, earthquakes, and celestial measurement are late or conflicting. The safest conclusion is that Thales was remembered as extending water beyond a remark about living things into an account of the world’s stability.',
    'The conceptual step is still large. Instead of assigning the earth’s place solely to the will of a divine agent, the water report offers a regular physical analogy that opponents can examine. Yet “natural” should not be used as a synonym for secular or disenchanted. Early Greek accounts could treat nature as divine, alive, or internally powerful. What changes is not the automatic disappearance of gods but the explanatory role given to stable features and recurring processes. This is why a Milesian inquiry can be continuous with older cosmological imagination and still become a distinctive object of later philosophical history.',
  ], ['aristotle', 'anaximander'], ['On the Heavens', 'Early Greek Philosophy']),
  section('soul-divinity', 'Magnets, soul, and a world full of divine power', [
    'Aristotle’s On the Soul reports that, judging from what was remembered, Thales attributed soul to the lodestone because it moves iron. Another Aristotelian passage associates him with the saying that all things are full of gods. These are later testimonia, not surviving Thalean fragments, and their relation is uncertain. They may suggest that motion revealed an internal animating power, or they may preserve separate anecdotes later combined into a doctrine. They do not justify calling Thales a panpsychist in the precise modern sense, because that classification carries debates and distinctions the evidence never supplies.',
    'The testimonia do, however, prevent a crude story in which matter replaces religion overnight. Water, soul, motion, and divine presence may have belonged to a picture in which nature bears power within itself. The lodestone is philosophically interesting because an ordinary stone apparently initiates motion at a distance; describing it as ensouled registers that explanatory surprise. A visitor should therefore resist two opposite simplifications: Thales was neither merely a mythmaker repeating divine stories nor a laboratory materialist who expelled divinity. His remembered views occupy an earlier conceptual landscape in which natural agency, life, and sacred power were not cleanly separated.',
  ], ['aristotle'], ['On the Soul']),
  section('eclipse-geometry', 'Eclipse, geometry, and the manufacture of a scientific hero', [
    'Herodotus says Thales foretold the year in which an eclipse interrupted a battle between Medes and Lydians; modern chronologies often identify the event with 585 BCE. That does not show a precise prediction of the modern kind. Scholars dispute whether the historical eclipse and reported battle align as later tradition claimed, and no surviving evidence gives Thales a method capable of predicting its path and exact time. A general expectation, retrospective synchronization, or legendary enhancement is possible. Because the report became central to dating Thales, the apparent precision of his biography partly rests on the very anecdote whose historical interpretation is contested.',
    'Later traditions also credit Thales with geometrical propositions, pyramid measurement, navigation by stars, engineering feats, and the transfer of Egyptian knowledge. Some attributions may preserve practical expertise; none should be presented as a securely documented list of discoveries. Theorems now carrying a person’s name often acquired that label long after the proof tradition developed. What the cluster of stories securely reveals is an ancient image of Thales as a measurer: someone who connected general patterns with concrete problems. That reception matters, but it differs from demonstrating that Thales personally proved every proposition or founded Greek mathematics.',
  ], ['pythagoras'], ['Early Greek Philosophy']),
  section('milesian-comparison', 'A Milesian family resemblance, not a certified school roster', [
    'Thales, Anaximander, and Anaximenes are conventionally grouped as Milesians because later testimony assigns them the same city and related explanatory concerns. The familiar teacher-to-pupil succession may be true, but it is not securely documented enough to carry a detailed institutional story. “Milesian school” is therefore a useful modern and ancient historiographical grouping, not evidence of classrooms, membership rules, or an agreed curriculum. Their family resemblance lies in asking how a world of diverse phenomena can arise and remain ordered through principles and processes internal to nature.',
    'Reading them as a sequence clarifies both continuity and reconstruction. Thales is associated with water; Anaximander with the indefinite or boundless and with opposites ordered in time; Anaximenes with air and density change. It is tempting to narrate each answer as a direct criticism of the preceding one, but the arguments linking them are largely supplied by later interpretation. We can responsibly say that their reported accounts form an intelligible debate. We cannot quote an exchange that did not survive or assume that Anaximander explicitly refuted water in the precise terms a modern textbook gives him.',
  ], ['anaximander', 'anaximenes'], ['Early Greek Philosophy']),
  section('influence-priority', 'How a later genealogy made Thales foundational', [
    'Thales’ widest influence comes through philosophical genealogy rather than a traceable text or continuous institution. Aristotle places him at the head of an inquiry into material principles. Hellenistic and later writers classify him among sages, natural philosophers, astronomers, and geometers. Modern histories inherited and amplified those arrangements. The claim that Thales influenced every later metaphysician directly would exceed the evidence; the claim that his remembered water doctrine became a standard starting point for histories of nature and causation is secure. Reception constructed a durable Thales even where the historical individual remains faint.',
    'Priority language should therefore be attached to a criterion and a witness. He may be called Aristotle’s leading early example of a thinker who sought a natural material principle. That is different from the first human to reason, the first scientist, the first Greek thinker, or the universally recognized founder of philosophy. Naming the criterion makes the story better rather than less dramatic. It lets visitors examine how disciplines create origin figures and how a sparse ancient report can organize thousands of years of retrospection.',
  ], ['aristotle'], ['Metaphysics']),
  section('modern-meaning', 'Unity, explanation, and the danger of easy ancestry', [
    'Thales remains philosophically useful because the water report poses a durable problem: how can plurality be explained through unity without erasing difference? Later Greek thinkers supply very different answers—indefinite source, air, elements, atoms, forms, substances—but the evidence does not make them members of a single line directly descending from Thales. His role is best understood as an early case later philosophers could recruit when asking what persists through change and what counts as an explanatory principle.',
    'Modern science does not vindicate Thales simply because water is essential to life, nor does modern chemistry refute the historical significance of his proposal. Such comparisons confuse a current result with an archaic question framed through different concepts and evidence. A better exercise asks what observations would make water explanatory, which claims are Aristotle’s reconstruction, and what further mechanism the view needs. That practice teaches the visitor how to learn from an answer without pretending it anticipated the present.',
  ], ['anaximander', 'anaximenes', 'aristotle'], []),
  section('origins-context', 'Greek beginnings in a world with older knowledge', [
    'Calling Thales an early Greek natural philosopher need not make Greek philosophy a miracle without ancestors or neighbors. Mesopotamian observers kept long astronomical records; Egyptian practitioners developed geometrical and surveying techniques; Levantine and Anatolian cultures exchanged cosmologies, calendars, technologies, and cult practices across routes in which Miletus participated. The evidence for this broader world is far stronger than the evidence for any detailed apprenticeship attributed to Thales. Responsible context therefore holds two conclusions together: Greek authors developed distinctive argumentative and explanatory forms, and they did so within exchanges that make claims of isolated invention historically implausible.',
    'The same caution applies to the familiar phrase “from myth to reason.” Archaic poetry could organize nature, genealogy, justice, and causation with intellectual sophistication, while Milesian natural accounts could retain divine and animate powers. The historical shift is not a light switch from irrational story to pure logic. It is a reorganization of explanatory emphasis: named materials, spatial arrangements, recurrent processes, and claims that later investigators could oppose. Thales matters within that plural history because water became a discussable principle in a remembered sequence, not because every earlier culture lacked explanation or every later Greek abandoned myth.',
  ], ['anaximander', 'anaximenes'], []),
  section('reading', 'A source-critical route through Thales', [
    'Begin with Aristotle’s Metaphysics 1.3 at 983b6–984a3, marking separately the report about water, Aristotle’s suggested reasons, and his own causal framework. Then compare the specialist Milesian discussion in the Stanford Encyclopedia, the independent IEP entry, and a current critical fragment-and-testimonia collection. This order keeps the ancient testimony visible while showing that even responsible modern interpreters disagree over how much can be reconstructed from it.',
    'While reading, keep four columns: ancient witness, approximate date of witness, claim preserved, and confidence. Put eclipse prediction, geometrical discoveries, political advice, water, earth-support, magnet, and gods on separate lines. Do not let repeated anecdotes masquerade as independent confirmation when later authors share a doxographical source. The goal is not to reduce Thales to “nothing can be known.” It is to reach graduated conclusions: some reports are central but mediated, some are possible, some mainly document reception, and none supplies a verbatim philosophical work by Thales.',
  ], ['anaximander', 'anaximenes', 'aristotle'], ['Metaphysics', 'Early Greek Philosophy']),
];

const thalesConfig: ModernClusterEditorialConfig = {
  sources: thalesSources,
  articleSections: thalesSections,
  sectionCitations: {
    orientation: [c('tha-sep', 'section', '1. Who Were the Presocratic Philosophers?; 2. The Milesians'), c('tha-first', 'page', '1–22')],
    'miletus-dates': [c('tha-sep', 'section', '2. The Milesians')],
    water: [c('tha-aristotle-met', 'standard-division', '1.3, 983b6–984a3'), c('tha-sep', 'section', '2. The Milesians')],
    'earth-cosmos': [c('tha-sep', 'section', '2. The Milesians')],
    'soul-divinity': [c('tha-iep', 'section', '7. All Things are Full of God')],
    'eclipse-geometry': [c('tha-sep', 'section', '2. The Milesians')],
    'milesian-comparison': [c('tha-sep', 'section', '2. The Milesians')],
    'influence-priority': [c('tha-aristotle-met', 'standard-division', '1.3, 983b6–984a3'), c('tha-first', 'page', '1–22')],
    'modern-meaning': [c('tha-sep', 'section', '2. The Milesians'), c('tha-iep', 'section', '4. Water as the First Principle')],
    'origins-context': [c('tha-sep', 'section', '1. Who Were the Presocratic Philosophers?; 2. The Milesians')],
    reading: [c('tha-aristotle-met', 'standard-division', '1.3, 983b6–984a3'), c('tha-sep', 'section', '2. The Milesians')],
  },
  evidence: {
    life: [c('tha-sep', 'section', '2. The Milesians')],
    ideas: [c('tha-aristotle-met', 'standard-division', '1.3, 983b6–984a3'), c('tha-sep', 'section', '2. The Milesians')],
    works: [c('tha-sep', 'section', '2. The Milesians')],
    influence: [c('tha-first', 'page', '1–22'), c('tha-aristotle-met', 'standard-division', '1.3, 983b6–984a3')],
    disputes: [c('tha-sep', 'section', '2. The Milesians'), c('tha-first', 'page', '1–22'), c('tha-iep', 'section', '1–12')],
    reading: [c('tha-aristotle-met', 'standard-division', '1.3, 983b6–984a3')],
  },
  patch: {
    lifespan: 'late 7th–early 6th century BCE; conventional dates uncertain', birthYear: -624, deathYear: -546,
    region: 'Miletus, Ionia', tradition: 'Milesian / early Greek inquiry',
    primaryBranchIds: ['ancient-greek', 'metaphysics'], secondaryBranchIds: ['philosophy-of-science', 'philosophy-of-religion'],
    mainIdeas: ['Water as a reported first principle', 'Natural order', 'Unity beneath plurality', 'Internal powers of nature'],
    keyWorks: ['No securely surviving writing; fragments and testimonia only'],
    lifeStory: 'Thales was an early sixth-century Milesian sage and investigator known entirely through later reports. Conventional numerical dates and most biographical episodes are reconstructions.',
    contributionSummary: 'Became the earliest named Milesian in Aristotle’s genealogy of inquiry into natural principles, especially through the mediated report that water was fundamental.',
    beginnerExplanation: 'Later writers say Thales tried to explain the diverse world through water. The philosophical advance is the search for a general natural account, but his own wording and reasoning do not survive.',
    influencedByIds: [], influencedIds: ['anaximander', 'anaximenes'], disagreementIds: [],
    suggestedFirstReading: 'Aristotle, Metaphysics 1.3 (with a modern source-critical guide)',
    historicalContext: 'Archaic Miletus in a connected eastern Mediterranean world of maritime exchange, civic conflict, practical measurement, and older Egyptian and Babylonian knowledge traditions.',
    dateDisplay: 'late 7th–early 6th century BCE; conventional c. 624–c. 546 dates uncertain', dateConfidence: 'low',
    dateNote: 'No securely documented lifespan survives. The common years are later chronological constructions, partly tied to a disputed interpretation of the eclipse story.',
    shortBio: 'An early Milesian known through later testimony as a sage, measurer, and investigator of nature, especially for the report that water was a fundamental principle.',
    extendedBio: ['No writing securely attributable to Thales survives, and ancient witnesses combine philosophical reconstruction with sage biography.', 'Miletus placed him in a networked Ionian setting, but particular claims of Egyptian or Babylonian borrowing usually outrun traceable evidence.'],
    centralQuestions: ['Can the many changing things be explained through one natural principle?', 'What kind of evidence survives for a thinker without an extant text?', 'How should philosophy use retrospective founder stories?'],
    majorIdeasDetailed: [
      {name: 'Water as principle', explanation: 'Aristotle reports water as Thales’ archē but offers possible reasoning in his own voice.', whyItMatters: 'It makes unity and material explanation central while leaving the exact ancient claim open.'},
      {name: 'Earth supported by water', explanation: 'Later testimony links the earth’s stability to flotation on water.', whyItMatters: 'It is an early physical analogy open to criticism rather than a complete surviving cosmology.'},
      {name: 'Animating natural power', explanation: 'Reports about a magnetic stone and a world full of gods suggest internal powers without yielding a settled modern doctrine.', whyItMatters: 'They complicate any simple opposition between natural inquiry and divinity.'},
    ],
    keyWorksDetailed: [{title: 'Fragments and testimonia concerning Thales', summary: 'Later reports collected in critical editions; no verbatim Thalean fragment is secure.', whyItMatters: 'The collection teaches source criticism as well as early cosmology.'}],
    lifeEvents: [{approximateYear: -600, label: 'Approximate floruit', description: 'Active in or associated with early sixth-century Miletus; exact dates cannot be recovered.'}],
    intellectualDevelopment: ['No sequence of Thales’ intellectual development can be reconstructed.', 'Later traditions expanded a sparse philosophical dossier into sage, scientific, and founder legends.'],
    influencesReceived: ['Ionian and wider eastern Mediterranean traditions of cosmology, measurement, navigation, and wisdom; specific lines of borrowing remain uncertain.'],
    influenceOnLaterThought: ['Anaximander and Anaximenes in a reconstructed Milesian sequence', 'Aristotle’s history of material principles', 'Later histories of philosophy and science'],
    controversiesOrInterpretiveTensions: ['Whether Thales wrote anything', 'What water was claimed to explain', 'What sort of eclipse prediction, if any, occurred', 'Whether “first philosopher” illuminates or distorts the evidence'],
    commonMisunderstandings: ['No sentence written by Thales securely survives.', 'Water should not be treated as either modern chemistry or a childish guess.', 'The eclipse and theorem stories do not establish modern-style prediction or proof.', 'Natural explanation did not necessarily exclude divinity.'],
    schoolMemberships: ['“Milesian” names a useful geographical and explanatory grouping; a formal school and teacher-pupil succession are not securely documented.'],
    branchContributions: [{branchId: 'ancient-greek', summary: 'Early named case in later Greek histories of inquiry into nature.'}, {branchId: 'metaphysics', summary: 'Raises the problem of explaining plurality through one principle.'}, {branchId: 'philosophy-of-science', summary: 'Represents later memory of measurement and regular natural explanation.'}, {branchId: 'philosophy-of-religion', summary: 'Complicates a simple separation of natural power, soul, and divinity.'}],
    branchMemberships: [{branchId: 'ancient-greek', status: 'precursor', note: 'An early Milesian made foundational by later historiography; not the uncontested inventor of philosophy.', confidence: 'high'}, {branchId: 'metaphysics', status: 'precursor', note: 'Associated with water as a unifying first principle.', confidence: 'medium'}, {branchId: 'philosophy-of-science', status: 'precursor', note: 'Later reports connect him with measurement and natural explanation, though individual achievements are uncertain.', confidence: 'medium'}, {branchId: 'philosophy-of-religion', status: 'associated', note: 'Testimonia about gods and ensouled motion resist a clean secular reading.', confidence: 'low'}],
    beginnerReadingPath: [{title: 'Metaphysics, Book 1.3', author: 'Aristotle', approximateYear: -350, type: 'primary', difficulty: 'intermediate', whyRead: 'Read the central water testimony while separating Aristotle’s report, conjecture, and causal framework.', sourceUrl: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0052%3Abook%3D1%3Asection%3D983b'}],
    advancedReadingPath: [{title: 'Early Greek Philosophy, Volume II', author: 'André Laks and Glenn W. Most', year: 2016, type: 'book', difficulty: 'advanced', whyRead: 'Compare the full person, doctrine, and reception dossier in a current critical edition.', sourceUrl: 'https://www.hup.harvard.edu/books/9780674996892'}, {title: 'Presocratic Philosophy', author: 'Patricia Curd', year: 2019, type: 'secondary', difficulty: 'advanced', whyRead: 'Place the evidence within a specialist account of Milesian explanation and its interpretive limits.', sourceUrl: 'https://plato.stanford.edu/archives/fall2019/entries/presocratics/'}],
  },
  reviewNotePath: 'docs/editorial/reviews/thales.md', reviewLock: 'fnv1a64:3f46b8dc03c830b7',
};

const anaximanderSources: EditorialSource[] = [
  {
    id: 'ana-sep', type: 'scholarly-reference', authors: ['Patricia Curd'], title: 'Presocratic Philosophy',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Fall 2019', year: 2019,
    url: 'https://plato.stanford.edu/archives/fall2019/entries/presocratics/', accessedOn: '2026-08-02',
    note: 'Specialist overview used for the Milesians, the apeiron, the opposites, and the source layers surrounding the one secure fragment.',
  },
  {
    id: 'ana-iep', type: 'scholarly-reference', authors: ['Dirk L. Couprie'], title: 'Anaximander',
    containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin',
    url: 'https://iep.utm.edu/anaximander/', accessedOn: '2026-08-02',
    note: 'Independent overview used for the witness chain, fragment boundary, astronomical reconstruction, and the need to qualify its own priority language.',
  },
  {
    id: 'ana-aristotle', type: 'primary-text', authors: ['Aristotle'], title: 'Physics, Book 3',
    translator: 'R. P. Hardie and R. K. Gaye', publisher: 'The Internet Classics Archive, Massachusetts Institute of Technology',
    url: 'https://classics.mit.edu/Aristotle/physics.3.iii.html', accessedOn: '2026-08-02',
    note: 'Later philosophical testimony for the unlimited, cited by Bekker divisions; Aristotle’s terminology is not treated as Anaximander’s verbatim wording.',
  },
  {
    id: 'ana-kahn', type: 'scholarly-book', authors: ['Charles H. Kahn'], title: 'Anaximander and the Origins of Greek Cosmology',
    publisher: 'Columbia University Press', year: 1960, url: 'https://archive.org/details/anaximanderorigi0000kahn', accessedOn: '2026-08-02',
    note: 'Major university-press reconstruction consulted for language, cosmology, and doxography; later scholarship revises parts of its reconstruction.',
  },
  {
    id: 'ana-couprie', type: 'scholarly-book', authors: ['Dirk L. Couprie'], title: 'Heaven and Earth in Ancient Greek Cosmology: From Thales to Heraclides Ponticus',
    publisher: 'Springer', year: 2011, doi: '10.1007/978-1-4419-8116-5', url: 'https://doi.org/10.1007/978-1-4419-8116-5', accessedOn: '2026-08-02',
    note: 'Specialist study used for Anaximander’s earth, celestial rings, observational setting, and competing reconstructions.',
  },
];

const anaximanderSections: ArticleSection[] = [
  section('orientation', 'The boundless as an invitation to careful reconstruction', [
    'Anaximander of Miletus is associated with one of early Greek philosophy’s boldest explanatory terms: to apeiron, commonly rendered “the boundless,” “the unlimited,” or “the indefinite.” Each translation highlights something and risks deciding too much. The term can concern lack of boundary, lack of determination, inexhaustibility, or a combination that later sources no longer let us recover cleanly. Anaximander’s importance is not that he named a mysterious object behind the world. It is that the surviving dossier attributes to him an origin not identical with any familiar element and an ordered account of how opposed powers emerge, prevail, and pass away.',
    'Unlike Thales, Anaximander is connected with a short stretch of language widely treated as genuinely early, preserved by the sixth-century CE commentator Simplicius. Yet even here the quotation’s boundaries are disputed: Simplicius may quote a compact Anaximandrian sentence while surrounding it with Theophrastean interpretation. Modern editions punctuate and divide the passage differently. This page therefore avoids presenting one English translation as direct, self-evident access to Anaximander. The source is precious precisely because it makes philology visible: a few words about necessity, justice, reparation, and time support several responsible but competing philosophical readings.',
  ], ['thales', 'anaximenes'], ['Early Greek Philosophy']),
  section('life-setting', 'A sixth-century Milesian without a modern biography', [
    'Ancient tradition places Anaximander in sixth-century Miletus and calls him a companion, successor, or pupil of Thales. A later chronological report says he was sixty-four in the second year of the fifty-eighth Olympiad, conventionally converted to about 547/546 BCE, which produces the familiar birth date around 610. Such arithmetic is useful for approximate placement, not proof of a documented birthday. There is no continuous life narrative. We should say that he flourished around the middle of the sixth century, while treating exact years and a formal master-pupil relationship as later testimony.',
    'Reports connect him with a map of the inhabited world, a celestial model, a gnomon, colonizing activity, and public display of geographical or astronomical knowledge. The priority wording in these reports is late, and a gnomon was known outside Greece long before him. Still, the cluster fits a Milesian practice of orientation: mapping land and sea, measuring shadow and season, and explaining the sky spatially. The philosophical profile should not divide those activities into a modern theorist on one side and technician on the other. His cosmology belongs to the same effort to locate human observers within a larger ordered whole.',
  ], ['thales', 'anaximenes'], []),
  section('source-layers', 'Fragment, Theophrastean report, and later doxography', [
    'Simplicius reports Anaximander while commenting on Aristotle’s Physics, and his account is usually understood to depend substantially on Theophrastus, Aristotle’s successor. That chain creates layers: possible Anaximandrian wording, Theophrastus’ historical organization, Simplicius’ quotation and commentary, manuscript transmission, and modern editorial reconstruction. The traditional Diels–Kranz label DK 12 B1 remains common, while newer editions use different concordances. Numbering systems are locators, not verdicts about authenticity or the exact length of a quotation.',
    'Other details come from Aristotle, pseudo-Plutarch, Hippolytus, Aëtius, Diogenes Laertius, and additional witnesses, many dependent on lost doxographical compilations. Repetition across late reports may therefore reflect a shared source rather than several independent confirmations. The distinction between fragment and testimonium must stay visible: justice and time may preserve Anaximander’s diction, whereas a schematic sequence of cosmic stages may be a later paraphrase. This does not make the latter useless. It changes what kind of claim it can support and how confidently we should reproduce technical vocabulary.',
  ], ['aristotle'], ['Physics', 'Early Greek Philosophy']),
  section('apeiron', 'What the apeiron is allowed to mean', [
    'Later testimony calls the apeiron a principle and says that the heavens and worlds arise from an indefinite nature. Aristotle discusses Anaximander among thinkers who posited an unlimited source, sometimes explaining why an origin must be inexhaustible if generation never stops. Whether Anaximander himself used archē as a technical noun is disputed, and the claim that he was first to do so comes from later historiography. The safer formulation is that he associated the origin of the ordered world with the apeiron; Aristotle and Theophrastus then classified that origin in the language of principles and elements.',
    'The apeiron should not be equated without argument with infinite space, featureless matter, a mathematical infinity, or a divine personal creator. Some evidence describes it as ageless, deathless, or encompassing and governing all things, language that can sound divine. Some interpretations treat it as a spatially unlimited body; others emphasize qualitative indeterminacy or an inexhaustible source beyond the opposed stuffs. The surviving evidence underdetermines the choice. For beginners, its conceptual role is clearer than its composition: because the origin is not simply hot, cold, wet, or dry, it can stand prior to the conflicts that structure the experienced world.',
  ], ['thales', 'anaximenes', 'aristotle'], ['Physics']),
  section('justice-time', 'Justice, reparation, and the order of time', [
    'The famous sentence says, in edition-dependent wording, that the things from which beings arise are also those into which they perish according to necessity, for they give justice or penalty and recompense to one another for injustice according to time’s ordering. Simplicius remarks on its poetic language. The grammar may point not to things repaying the apeiron but to opposed powers paying one another: heat dominates in summer, cold in winter, yet neither holds forever. On this reading, cosmic justice is an immanent balance across temporal succession rather than a judge imposing morality on matter.',
    'Other interpretations read the sentence more broadly as generation itself incurring a debt repaid in destruction, or as plural things returning to their source. The fragment is too compressed to eliminate all alternatives. It is also risky to call it a scientific law in the modern quantitative sense or an ecological ethic projected back into archaic Greek. What is secure is the joining of natural process with normative-political vocabulary. Anaximander makes regularity intelligible through a language familiar from civic order: encroachment is limited, and time provides the arrangement by which opposed powers yield in turn.',
  ], ['heraclitus'], ['Early Greek Philosophy']),
  section('cosmogony', 'Opposites and the formation of an ordered world', [
    'Doxographical reports describe a generative source from which a productive something separates, giving rise to hot and cold. A fiery sphere grows around air surrounding the earth, then breaks into rings whose visible openings are the sun, moon, and stars. Translators and scholars reconstruct this sequence differently because the witnesses are compressed and late. It is better to present it as a reported cosmogony than as a verbatim blueprint. Its governing ambition is clearer: the ordered heavens develop through differentiation and separation rather than being assembled as a finished structure by an external craftsman.',
    'The reports sometimes speak of plural heavens or worlds, but whether Anaximander proposed innumerable simultaneous worlds, a succession of worlds, or regions within one cosmic order remains disputed. Greek kosmos terminology itself was still developing. The page should therefore resist spectacular claims about the first multiverse. What matters is that a world can have a history. The present arrangement is neither obvious nor eternal in its current form; it emerges from processes that also contain the conditions of its dissolution. That temporality connects the cosmogony to the fragment’s necessity and repayment.',
  ], ['anaximenes'], ['Early Greek Philosophy']),
  section('earth-heavens', 'A suspended earth and mechanical celestial rings', [
    'Anaximander’s earth is reported as cylindrical or drum-shaped, with humans living on one flat face. More philosophically striking is the explanation of its stability: it remains at the center because it is equally related to the surrounding extremes and has no reason to move in one direction rather than another. Aristotle preserves and criticizes this kind of symmetry reasoning. Unlike Thales’ alleged flotation model or Anaximenes’ support by air, equilibrium does not require another body directly underneath. The account uses spatial relations to explain rest and became a notable early case of sufficient-reason style argument.',
    'Celestial bodies were reportedly fire enclosed in air and visible through vents in wheels or rings. Eclipses could then be explained by blockage of an opening rather than by a divine decision. The numerical sizes assigned to rings vary among reports and should not be harmonized into false precision. Nor should a diagram drawn from them be mistaken for an archaeological object. Even so, the model shows three-dimensional ingenuity: the visible sun is only an aperture into a larger unseen structure, and apparent motion belongs to a rotating cosmic mechanism. Anaximander tries to explain appearances by a theoretical arrangement not itself simply visible.',
  ], ['thales', 'anaximenes', 'aristotle'], []),
  section('weather-life', 'Meteorology, living beings, and cautious natural history', [
    'Later reports attribute thunder, lightning, wind, rain, and other weather to separations and motions of air, vapor, or wind rather than episodic divine action. Details vary, and some may reflect doxographical schematization. They nonetheless fit the project of applying a limited set of physical processes across different phenomena. The explanatory gain is not modern correctness but unification: earth and sky belong to the same changing order. A mechanism can be criticized, compared, and revised without requiring a new divine biography for each storm.',
    'Anaximander is also said to have held that living beings first arose in moisture and that early humans developed inside fishlike creatures because helpless human infants could not initially have survived on their own. These testimonia are late and do not justify calling him the inventor of evolutionary theory. There is no surviving population mechanism, heredity theory, or text giving his reasoning in full. The responsible claim is narrower and still remarkable: ancient witnesses attributed to him a natural account of human origins that used comparative facts about development and care rather than placing humans outside the history of living nature.',
  ], ['anaximenes'], ['Early Greek Philosophy']),
  section('milesian-reception', 'Between Thales, Anaximenes, and later metaphysics', [
    'Modern narratives often say Anaximander rejected Thales because no familiar element can generate its opposite without injustice. That is a philosophically compelling reconstruction, but no surviving Anaximander sentence names Thales or states the argument. We may compare water and apeiron and observe how the latter avoids privileging wet over dry; we should not stage a dialogue the sources do not preserve. Anaximenes’ return to a determinate source, air, likewise can be read as retaining indefiniteness while adding a mechanism, but the explicit reasoning comes mostly through later interpretation.',
    'Anaximander’s longer influence is difficult to trace person by person. His remembered themes—an indefinite source, opposites, temporal justice, equilibrium, and a generated cosmos—became part of the evidence through which Aristotle, Theophrastus, commentators, and modern historians constructed early Greek philosophy. Later thinkers did not merely inherit a doctrine intact. They reframed it within accounts of elements, causes, infinity, being, and scientific explanation. His historical importance consequently includes both an archaic project and the powerful afterlife of a few mediated formulations.',
  ], ['thales', 'anaximenes', 'aristotle', 'heraclitus'], []),
  section('models-knowledge', 'Models, inference, and what cannot be seen directly', [
    'Several Anaximandrian reports share an epistemically ambitious pattern: the visible world is explained by structures that ordinary sight does not reveal. A stationary earth needs no column because symmetry accounts for its position; the sun can be an opening into a larger fiery ring; the present arrangement can be one phase of a cosmogonic separation. These are theoretical models in a broad sense, but the word should not imply measured modern simulations. Their value lies in using a coherent spatial or developmental proposal to connect observations while accepting entities and processes inferred beyond immediate appearance.',
    'That pattern also clarifies why map, gnomon, and celestial-model traditions belong in the intellectual portrait even when their priority is insecure. Each device coordinates many local appearances within an ordered representation: places on a surface, seasons through shadow, heavenly motion through a constructed geometry. A map is not the territory, and a ring reconstruction is not the sky; both can make relations available to scrutiny. Anaximander’s legacy includes this confidence that an explanatory arrangement may be judged by how well it organizes phenomena rather than by whether every component can be pointed to directly.',
    'A surviving model also has to be distinguished from a modern reconstruction. No Anaximandrian map, celestial sphere, or drawing of cosmic rings remains. Contemporary diagrams choose an orientation, spacing, and scale from incomplete verbal testimony, and different choices can make the theory look more or less coherent. Such images are useful when their hypothetical status is explicit. They become misleading when visual precision conceals textual uncertainty or when a later schematic report is presented as though it were an artifact made by Anaximander.',
  ], ['thales', 'anaximenes'], []),
  section('reading', 'How to read one fragment without making it say everything', [
    'Begin with the traditional DK 12 B1 dossier, but cite the transmitting passage—Simplicius, In Physics 24.13–25—alongside any modern numbering system. Compare more than one translation and mark which words the editor treats as quotation. Then read the SEP and IEP entries, Kahn’s major reconstruction, and Couprie’s cosmological analysis. Disagreement about boundaries is part of the evidence, not noise to be deleted.',
    'Next reconstruct each domain separately: apeiron, opposites, justice and time, earth’s equilibrium, rings, weather, and life. Ask which witness supplies each detail and whether it is a fragment, a named paraphrase, or anonymous doxography. Only then combine them into a tentative picture. This method prevents the single famous sentence from being made to prove the entire cosmology and prevents late schemata from borrowing the fragment’s authority. Anaximander rewards disciplined imagination: his project is expansive, but the surviving text is narrow.',
  ], ['thales', 'anaximenes', 'aristotle'], ['Physics', 'Early Greek Philosophy']),
];

const anaximanderConfig: ModernClusterEditorialConfig = {
  sources: anaximanderSources, articleSections: anaximanderSections,
  sectionCitations: {
    orientation: [c('ana-sep', 'section', '2. The Milesians'), c('ana-iep', 'section', '1. Life and Sources; 4. The Fragment')],
    'life-setting': [c('ana-sep', 'section', '2. The Milesians'), c('ana-couprie', 'chapter', 'Anaximander')],
    'source-layers': [c('ana-kahn', 'chapter', 'I. The Documentary Evidence')],
    apeiron: [c('ana-sep', 'section', '2. The Milesians'), c('ana-kahn', 'chapter', 'The Boundless'), c('ana-aristotle', 'standard-division', 'Physics 3.4–5, 203b6–204b29')],
    'justice-time': [c('ana-kahn', 'chapter', 'The Fragment')],
    cosmogony: [c('ana-sep', 'section', '2. The Milesians'), c('ana-kahn', 'chapter', 'Cosmogony')],
    'earth-heavens': [c('ana-couprie', 'chapter', 'Anaximander'), c('ana-sep', 'section', '2. The Milesians')],
    'weather-life': [c('ana-sep', 'section', '2. The Milesians'), c('ana-couprie', 'chapter', 'Anaximander')],
    'milesian-reception': [c('ana-sep', 'section', '2. The Milesians'), c('ana-kahn', 'chapter', 'The Milesian Tradition')],
    'models-knowledge': [c('ana-couprie', 'chapter', 'Anaximander'), c('ana-kahn', 'chapter', 'The Earth; The Heavenly Bodies'), c('ana-sep', 'section', '2. The Milesians')],
    reading: [c('ana-kahn', 'chapter', 'I. The Documentary Evidence')],
  },
  evidence: {
    life: [c('ana-sep', 'section', '2. The Milesians')],
    ideas: [c('ana-sep', 'section', '2. The Milesians'), c('ana-kahn', 'chapter', 'The Boundless; The Fragment')],
    works: [c('ana-kahn', 'chapter', 'I. The Documentary Evidence')],
    influence: [c('ana-sep', 'section', '2. The Milesians'), c('ana-kahn', 'chapter', 'The Milesian Tradition')],
    disputes: [c('ana-couprie', 'chapter', 'Anaximander'), c('ana-kahn', 'chapter', 'I. The Documentary Evidence')],
    reading: [c('ana-sep', 'section', '2. The Milesians')],
  },
  patch: {
    lifespan: 'fl. mid-6th century BCE; conventional c. 610–c. 546 dates uncertain', birthYear: -610, deathYear: -546,
    region: 'Miletus, Ionia', tradition: 'Milesian / early Greek inquiry',
    primaryBranchIds: ['ancient-greek', 'metaphysics'], secondaryBranchIds: ['philosophy-of-science'],
    mainIdeas: ['The apeiron (boundless/indefinite)', 'Opposites ordered in time', 'Cosmic justice', 'Earth’s equilibrium', 'A generated cosmos'],
    keyWorks: ['One short disputed-boundary fragment and later testimonia; a lost prose work is reported'],
    lifeStory: 'Anaximander was a sixth-century Milesian associated by later sources with cosmology, mapping, timekeeping, and one short surviving stretch of early philosophical language.',
    contributionSummary: 'Associated cosmic origins with the apeiron and explained an ordered world through differentiation, opposed powers, temporal balance, and spatial structure.',
    beginnerExplanation: 'Anaximander proposed that the world comes from an origin not identical with any familiar element. Opposed powers gain and lose dominance according to an order in time.',
    influencedByIds: ['thales'], influencedIds: ['anaximenes'], disagreementIds: [],
    suggestedFirstReading: 'The Anaximander dossier in Kahn alongside the SEP and IEP source discussions',
    historicalContext: 'Mid-sixth-century Miletus, where maritime geography, shadow measurement, colonization, and eastern Mediterranean knowledge exchange accompanied broad inquiry into earth and sky.',
    dateDisplay: 'fl. mid-6th century BCE; conventional c. 610–c. 546 dates uncertain', dateConfidence: 'low',
    dateNote: 'The familiar years depend on later Olympiad chronology and should be treated as approximate anchors rather than a documented lifespan.',
    shortBio: 'A Milesian cosmologist known through one short disputed-boundary fragment and later testimony about the apeiron, opposites, earth, heavens, weather, and living origins.',
    extendedBio: ['A later succession tradition makes him Thales’ associate or pupil, but no secure institutional biography survives.', 'Reports of a map, gnomon, and celestial model are historically suggestive while their priority claims remain uncertain.'],
    centralQuestions: ['What kind of origin can generate opposed qualities without being one of them?', 'How can time and balance make natural order intelligible?', 'How can a stable earth be explained by spatial symmetry?'],
    majorIdeasDetailed: [
      {name: 'Apeiron', explanation: 'A boundless, unlimited, or indefinite origin prior to the familiar opposites; its precise physical and divine status is disputed.', whyItMatters: 'It raises the abstraction level of early cosmological explanation.'},
      {name: 'Justice in time', explanation: 'A fragment uses the language of justice and recompense for the temporal ordering of opposed processes.', whyItMatters: 'It makes regularity internal to becoming while leaving the exact metaphor contested.'},
      {name: 'Earth’s equilibrium', explanation: 'The earth rests because of equal relations to the surrounding extremes, not because a body supports it below.', whyItMatters: 'It is an early symmetry-based physical explanation.'},
      {name: 'Generated cosmos', explanation: 'Later testimony describes hot and cold, rings, and a temporally formed world.', whyItMatters: 'The current world becomes one stage in an explanatory natural history.'},
    ],
    keyWorksDetailed: [{title: 'Lost work conventionally called On Nature', summary: 'A prose work is reported, but its original title and extent are uncertain; only a short passage survives through Simplicius.', whyItMatters: 'Its transmission exemplifies the distinction between fragment, paraphrase, and later reconstruction.'}],
    lifeEvents: [{approximateYear: -546, label: 'Reported floruit marker', description: 'Later Olympiad chronology places him at age sixty-four around 547/546 BCE; the report is not a contemporary record.'}],
    intellectualDevelopment: ['No secure sequence of personal development survives.', 'Ancient doxography systematized disparate cosmological reports around the apeiron.'],
    influencesReceived: ['Milesian inquiry associated with Thales', 'Archaic cosmology, mapping, measurement, and civic language'],
    influenceOnLaterThought: ['Anaximenes and the reconstructed Milesian debate', 'Aristotelian discussions of infinity and causes', 'Modern histories of cosmology and natural explanation'],
    controversiesOrInterpretiveTensions: ['The exact quotation boundary of the surviving sentence', 'Whether apeiron is spatially unlimited, qualitatively indefinite, divine, or some combination', 'Whether worlds are simultaneous or successive', 'How literally to reconstruct celestial rings and life origins'],
    commonMisunderstandings: ['Apeiron is not automatically modern infinite space.', 'The justice language does not securely establish a moral or ecological doctrine.', 'Late reports about human origins are not Darwinian evolution.', 'Map and gnomon priority claims are testimonia, not documented inventions.'],
    schoolMemberships: ['Milesian is a geographical and explanatory classification; the formal pupil succession is later testimony.'],
    branchContributions: [{branchId: 'ancient-greek', summary: 'Preserves one of the earliest substantial stretches of Greek philosophical language.'}, {branchId: 'metaphysics', summary: 'Introduces an origin beyond familiar opposed stuffs and links becoming to temporal order.'}, {branchId: 'philosophy-of-science', summary: 'Uses symmetry and theoretical structure in reported accounts of earth and heavens.'}],
    branchMemberships: [{branchId: 'ancient-greek', status: 'precursor', note: 'A foundational Milesian known through fragmentary and doxographical evidence.', confidence: 'high'}, {branchId: 'metaphysics', status: 'precursor', note: 'The apeiron and ordered opposites became central to later histories of first principles.', confidence: 'high'}, {branchId: 'philosophy-of-science', status: 'precursor', note: 'Reported spatial and developmental models are early cases of natural explanation.', confidence: 'medium'}],
    beginnerReadingPath: [{title: 'Anaximander evidence in Early Greek Philosophy, Volume II', author: 'André Laks and Glenn W. Most', year: 2016, type: 'primary', difficulty: 'intermediate', whyRead: 'Read fragment and testimonia with current labels and source apparatus rather than as one continuous text.', sourceUrl: 'https://www.hup.harvard.edu/books/9780674996892'}],
    advancedReadingPath: [{title: 'Anaximander and the Origins of Greek Cosmology', author: 'Charles H. Kahn', year: 1960, type: 'book', difficulty: 'advanced', whyRead: 'Study a major reconstruction while comparing its conclusions with newer editorial work.', sourceUrl: 'https://archive.org/details/anaximanderorigi0000kahn'}, {title: 'Heaven and Earth in Ancient Greek Cosmology', author: 'Dirk L. Couprie', year: 2011, type: 'book', difficulty: 'advanced', whyRead: 'Examine spatial and astronomical reconstructions and their evidential limits.', sourceUrl: 'https://doi.org/10.1007/978-1-4419-8116-5'}],
  },
  reviewNotePath: 'docs/editorial/reviews/anaximander.md', reviewLock: 'fnv1a64:e0b2f2e477c1e962',
};

const anaximenesSources: EditorialSource[] = [
  {
    id: 'anx-aristotle', type: 'primary-text', authors: ['Aristotle'], title: 'Metaphysics, Book 1',
    translator: 'Hugh Tredennick', publisher: 'Perseus Digital Library / Harvard University Press', year: 1933,
    url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0052%3Abook%3D1%3Asection%3D984a', accessedOn: '2026-08-02',
    note: 'Later testimony associating Anaximenes with air, cited by Bekker division; it does not preserve his own wording.',
  },
  {
    id: 'anx-sep', type: 'scholarly-reference', authors: ['Patricia Curd'], title: 'Presocratic Philosophy',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Fall 2019', year: 2019,
    url: 'https://plato.stanford.edu/archives/fall2019/entries/presocratics/', accessedOn: '2026-08-02',
    note: 'Specialist overview used for Milesian continuity, air, rarefaction and condensation, and the problems of Aristotelian reconstruction.',
  },
  {
    id: 'anx-iep', type: 'scholarly-reference', authors: ['Daniel W. Graham'], title: 'Anaximenes',
    containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin',
    url: 'https://iep.utm.edu/anaximenes/', accessedOn: '2026-08-02',
    note: 'Independent specialist account used for air, density change, cosmogony, meteorology, and later reception; priority claims are independently qualified.',
  },
  {
    id: 'anx-graham', type: 'scholarly-book', authors: ['Daniel W. Graham'], title: 'The Texts of Early Greek Philosophy: The Complete Fragments and Selected Testimonies of the Major Presocratics',
    publisher: 'Cambridge University Press', year: 2010, isbn: '978-0-521-84591-2',
    url: 'https://www.cambridge.org/core/books/texts-of-early-greek-philosophy/1D619753DA9D178EA10F166DB0E46D7A', accessedOn: '2026-08-02',
    note: 'Scholarly edition, translation, and commentary used as an independent check on the Anaximenes testimonia and traditional numbering.',
  },
  {
    id: 'anx-mckirahan', type: 'scholarly-book', authors: ['Richard D. McKirahan'], title: 'Philosophy Before Socrates: An Introduction with Texts and Commentary',
    publisher: 'Hackett Publishing Company', edition: '2nd edition', year: 2010, isbn: '978-1-60384-182-5',
    url: 'https://hackettpublishing.com/philosophy-before-socrates-2nd-edition', accessedOn: '2026-08-02',
    note: 'University-level sourcebook and commentary used for the logic of the Milesian sequence and density mechanism.',
  },
];

const anaximenesSections: ArticleSection[] = [
  section('orientation', 'Air and the problem of explaining transformation', [
    'Anaximenes of Miletus is often treated as the least adventurous of the three Milesians because he replaces Anaximander’s apeiron with a familiar stuff: air. That judgment misses the strongest feature of the surviving account. Anaximenes does not merely name an origin; later testimony attributes to him a process by which one underlying stuff becomes fire, wind, cloud, water, earth, and stone through rarefaction and condensation. The explanation connects differences in kind with differences in density. Even if the ancient mechanism is physically inadequate, it addresses the difficult question left open by any one-principle view: how does the many arise from the one?',
    'No continuous work by Anaximenes survives. A brief soul-air comparison may preserve something close to his wording, but most doctrines come through Theophrastus as quoted or paraphrased by later authors such as Simplicius, and through the broader doxographical tradition. The page must therefore distinguish a reported system from an extant treatise. “Air,” “rarefaction,” and “condensation” are well supported within that testimony; the precise arguments, sequence, and terminology are reconstructed. The explanatory coherence is real, yet it belongs to a dossier assembled from fragments and testimonia rather than chapters Anaximenes left for modern readers.',
  ], ['thales', 'anaximander'], ['Early Greek Philosophy']),
  section('life-chronology', 'A mid-sixth-century Milesian with incompatible dates', [
    'Anaximenes is securely associated with Miletus and conventionally placed after Anaximander in the middle or later sixth century BCE. Ancient chronological reports conflict, producing lifespans such as about 586–526 or a floruit around the Persian capture of Sardis. These numbers are not equally secure data points waiting to be averaged. The responsible display is a mid-sixth-century floruit with uncertain birth and death dates. A later report calls him Anaximander’s associate or pupil, but it cannot establish the routines of a formal school.',
    'His setting overlaps the Ionian world described for Thales and Anaximander: maritime exchange, civic instability, observation of weather and sky, craft processes, and contact with older eastern Mediterranean traditions. Claims that he lived through the Persian destruction of Miletus in 494 BCE are difficult to reconcile with standard chronology and should not organize his biography. What matters historically is not a dramatic final scene but participation in a Milesian explanatory project before the end of archaic Ionian autonomy.',
  ], ['thales', 'anaximander'], []),
  section('sources', 'A reported prose style and a largely doxographical philosophy', [
    'Diogenes Laertius says Anaximenes wrote in a simple, unaffected Ionic style, but the lost book’s original title, layout, and wording cannot be recovered. Later antiquity conventionally gave early works the title On Nature, which need not have been their author’s title. A sentence comparing the soul that holds us together with air or breath encompassing the cosmos is traditionally labeled DK 13 B2, although its wording and relation to the surrounding report require caution. Other famous statements, including the density sequence, are testimonia rather than direct fragments.',
    'The main historical line runs from Theophrastus’ lost account of physical opinions into Simplicius and doxographical summaries. Theophrastus organized predecessors using a conceptual vocabulary already influenced by Aristotle, so terms such as substrate, element, and infinite may sharpen or reshape the archaic view. Modern editions help by separating evidence about the person, doctrines, and reception. Their labels differ: a DK number and an LM number may identify the same transmitted passage while grouping it differently. Citation should name both the ancient witness and the edition when a disputed attribution is at stake.',
  ], ['aristotle'], ['Early Greek Philosophy']),
  section('air', 'Why air can be definite and still indeterminate to perception', [
    'Theophrastean testimony says Anaximenes made the underlying nature one and unlimited but not indefinite: he called it air. Air offers an intermediate conceptual advantage. It is a determinate kind of stuff, unlike an origin defined only as apeiron, yet ordinary air is often invisible and apparently without fixed shape, color, taste, or boundary. It can surround and penetrate, appear as breath and wind, and vary in motion and density. These properties make it plausible as a source capable of assuming diverse forms without ceasing to provide continuity.',
    '“Unlimited” here should not automatically mean a completed mathematical infinity. It may describe spatial extent or inexhaustible supply. Nor should air be equated straightforwardly with the modern mixture of gases studied by chemistry. Greek aēr could denote misty lower atmosphere as well as air, while breath and vapor supplied analogies. The historical question is what explanatory work the term performs: it names something perceptually accessible in effects yet flexible enough to underlie transformations. Anaximenes restores a tangible source while retaining part of the apeiron’s lack of visible determination.',
  ], ['anaximander'], []),
  section('density', 'Rarefaction and condensation as a mechanism', [
    'The reported sequence runs from rarified air to fire and from increasingly condensed air to wind, cloud, water, earth, and stone, with other things arising from these. This is not a periodic table or a quantitative phase diagram. It is a directional mechanism joining extent, density, temperature, and sensible quality. Rarefaction makes air finer and hotter; condensation makes it thicker and colder. Instead of positing unrelated births of different stuffs, Anaximenes explains them as states along a continuous transformation. The model thus offers a reason why one source can present radically different appearances.',
    'The philosophical achievement is sometimes overstated as the first scientific theory testable by experiment. There is no surviving record of controlled trials, numerical measurement, or a prediction program. Yet the account is more than an unsupported list because it draws on repeatable experience and craft analogy. Compression, felting, evaporation, cloud formation, and the feel of breath could make density change intelligible. It is safest to call this an observation-guided mechanism: a general explanatory proposal grounded in familiar processes, open to later criticism without being modern experimental science.',
  ], ['anaximander', 'heraclitus'], []),
  section('breath-soul', 'The breath example and the soul analogy', [
    'Plutarch preserves a disputed example: breath from pursed lips feels cool, whereas air released from an open mouth feels warm. The report connects the contrast to condensation and rarefaction, but modern physics explains the sensations differently, and scholars debate how closely the example reflects Anaximenes. It should not be quoted as a successful experiment proving the theory. Its historical value is that an ordinary bodily action becomes evidence or illustration for a cosmic mechanism. The body and world are interpreted through related processes.',
    'A separate sentence says, in translation-dependent form, that just as our soul, being air, holds us together, breath and air encompass the whole cosmos. The transmitted wording is close enough to merit special attention but not enough to erase its later frame. It may argue by analogy from living cohesion to cosmic enclosure, joining air, breath, and soul. It does not establish every later doctrine of a world soul. The comparison shows how a single principle could explain both physical structure and life without the modern boundary between material and mental categories.',
  ], [], ['Early Greek Philosophy']),
  section('cosmogony', 'Earth, sun, stars, and a cosmos carried by air', [
    'Later reports say that compressed air first produces a broad flat earth, which rides on air because of its flatness, like a lid or leaf supported by a medium. The sun, moon, and stars are fiery bodies arising from terrestrial moisture or exhalation and also carried on air. This differs from Anaximander’s equilibrium model: support returns, but the supporting material is the same fundamental air used elsewhere. The consistency is philosophically notable even though the geometry is wrong. Air is both origin and ongoing condition of cosmic stability.',
    'Reports disagree about whether stars are fixed like nails in a crystalline surface or move like fiery leaves and about how celestial bodies circle the earth. Night may occur because the sun travels behind higher northern regions rather than underneath a flat earth. These pictures should not be fused into one confident diagram. They may derive from different witnesses, interpretive stages, or doxographical compression. The secure lesson is methodological: Anaximenes’ source and transformation process are extended into a spatial account of the visible sky, not confined to an abstract claim about substance.',
  ], ['anaximander'], []),
  section('weather-earth', 'One process across weather and terrestrial change', [
    'Doxography attributes to Anaximenes accounts of cloud, rain, hail, snow, wind, thunder, lightning, rainbows, and earthquakes. Clouds arise through thickening; rain follows further condensation; freezing supplies snow or hail. Wind is air in motion or compression, while thunder and lightning result from wind acting on clouds. Details and terminology vary among witnesses, and no single report proves a fully integrated meteorological treatise. Still, the explanatory pattern is recognizable: the states and motions of air connect ordinary weather with cosmology.',
    'Earthquakes are explained in terms of earth becoming cracked when dry or collapsing when soaked, rather than by a deity shaking the ground. The mechanisms are not correct modern geology, but they seek regular material conditions. A visitor should neither celebrate a simplistic “myth to science” victory nor ignore the change in explanatory form. Gods need not be denied for a particular event to receive a physical account. The significant practice is to relate the event to processes that occur elsewhere and can be discussed without narrating a unique divine intention.',
  ], ['thales', 'anaximander'], []),
  section('reception', 'From Milesian sequence to later theories of change', [
    'Anaximenes is often described as synthesizing his predecessors: a determinate source like Thales’ water, unlimited extent like Anaximander’s apeiron, and an explicit transformation process. This is a useful comparison, not a surviving statement of intent. There is no text in which he announces a correction to both men. The sequence gains coherence through Theophrastus, Aristotle, and modern historians, whose arrangement helps interpretation while risking a falsely neat ladder of progress.',
    'Later Greek thinkers continued to use air, breath, density, condensation, and rarefaction in cosmology, medicine, and theories of matter. Diogenes of Apollonia made air central in a different, more explicitly intelligent monism; atomists and Aristotle developed other explanations of qualitative change. Direct lines of personal influence are often impossible to establish. Anaximenes’ durable legacy is a problem-form: if reality has one underlying basis, transformation needs a regular account connecting quantitative variation with qualitative difference.',
  ], ['thales', 'anaximander', 'heraclitus', 'aristotle'], []),
  section('change-problem', 'What the density model explains and leaves unexplained', [
    'The density mechanism has a clear explanatory strength: it supplies an ordered route between states instead of placing water, earth, cloud, and fire beside one another without connection. It also treats difference as scalar. More and less compact air yield a sequence, so apparently categorical changes depend on variation along a common dimension. This is why the theory attracts comparison with later reduction: a visible quality may depend on an underlying quantity. But no surviving evidence gives a numerical density scale, conservation rule, or exact threshold at which one stuff becomes another. The mechanism is qualitative even when its organizing contrast is quantitative.',
    'The model also faces a question about identity. If condensed air becomes water, is the result still air under a new appearance, or has air genuinely changed into another stuff? Aristotle and later historians often read the Milesians as material monists for whom an underlying substrate persists. Anaximenes’ own prose does not survive well enough to settle that mature formulation. Calling him a monist is useful if it means one originating and underlying nature; it becomes anachronistic if it silently imports a complete Aristotelian theory of substance, matter, and accidental quality.',
    'Temperature creates a further difficulty. The tradition connects rarity with heat and density with cold, and the breath illustration appears to support the correlation. Yet fire is not simply ordinary air with more empty space in any measured ancient account, and compressed air does not universally become cold. The theory selects familiar cases that make a general relation plausible without controlling counterexamples. Recognizing that limitation helps visitors distinguish explanatory mechanism from successful physical law. Anaximenes advances the question of transformation even where his proposed correlation fails.',
    'Comparison with Anaximander sharpens the tradeoff. The apeiron avoids making one familiar opposite the source of its rival, but its lack of sensible character makes the production of determinate stuffs hard to picture. Air is easier to observe through wind, breath, cloud, and vapor, and density supplies a route from source to world. It may, however, reintroduce the question of how one determinate stuff can genuinely become its opposites. Anaximenes gains mechanical clarity while accepting a heavier burden about transformation.',
  ], ['anaximander', 'aristotle'], []),
  section('reading', 'How to reconstruct Anaximenes without inventing a book', [
    'Begin with Graham’s Anaximenes evidence, preserving its separation of fragment, testimony, and commentary, then read the Milesian section of the SEP, the IEP entry, and McKirahan’s account. For every proposition, name the transmitter: Simplicius for the Theophrastean density account, Plutarch for the breath example, later doxography for weather and astronomy. Avoid citing “Anaximenes, On Nature” as though a page or chapter survived. The work-title is conventional and the original prose is lost.',
    'A useful reading exercise diagrams claims by confidence. Put air and rarefaction-condensation near the center; the exact soul sentence and density sequence require textual notes; detailed celestial machinery and meteorology belong to later report; exact dates belong at the lowest confidence. Then compare Anaximander’s equilibrium with Anaximenes’ air support and compare apeiron with invisible but determinate air. This makes the Milesian debate visible without turning testimonia into transcript. The resulting Anaximenes is neither a minor return to Thales nor a modern scientist in disguise, but a serious theorist of explanatory mechanism.',
  ], ['thales', 'anaximander'], ['Early Greek Philosophy']),
];

const anaximenesConfig: ModernClusterEditorialConfig = {
  sources: anaximenesSources, articleSections: anaximenesSections,
  sectionCitations: {
    orientation: [c('anx-sep', 'section', '2. The Milesians'), c('anx-mckirahan', 'chapter', 'The Milesians')],
    'life-chronology': [c('anx-sep', 'section', '2. The Milesians'), c('anx-iep', 'section', 'Introduction')],
    sources: [c('anx-graham', 'chapter', 'Anaximenes'), c('anx-sep', 'section', '2. The Milesians')],
    air: [c('anx-sep', 'section', '2. The Milesians'), c('anx-mckirahan', 'chapter', 'The Milesians'), c('anx-aristotle', 'standard-division', 'Metaphysics 1.3, 984a5–7')],
    density: [c('anx-sep', 'section', '2. The Milesians'), c('anx-iep', 'section', '2. Doctrine of Change')],
    'breath-soul': [c('anx-iep', 'section', '1. Doctrine of Air; 2. Doctrine of Change'), c('anx-graham', 'chapter', 'Anaximenes')],
    cosmogony: [c('anx-iep', 'section', '3. Origin of the Cosmos'), c('anx-sep', 'section', '2. The Milesians')],
    'weather-earth': [c('anx-iep', 'section', '3. Origin of the Cosmos'), c('anx-graham', 'chapter', 'Anaximenes')],
    reception: [c('anx-iep', 'section', '4. Influence on Later Philosophy'), c('anx-sep', 'section', '2. The Milesians'), c('anx-mckirahan', 'chapter', 'The Milesians')],
    'change-problem': [c('anx-sep', 'section', '2. The Milesians'), c('anx-mckirahan', 'chapter', 'The Milesians'), c('anx-graham', 'chapter', 'Anaximenes')],
    reading: [c('anx-graham', 'chapter', 'Anaximenes'), c('anx-sep', 'section', '2. The Milesians')],
  },
  evidence: {
    life: [c('anx-sep', 'section', '2. The Milesians')],
    ideas: [c('anx-sep', 'section', '2. The Milesians'), c('anx-iep', 'section', '1–3')],
    works: [c('anx-graham', 'chapter', 'Anaximenes')],
    influence: [c('anx-iep', 'section', '4. Influence on Later Philosophy'), c('anx-mckirahan', 'chapter', 'The Milesians')],
    disputes: [c('anx-sep', 'section', '2. The Milesians'), c('anx-graham', 'chapter', 'Anaximenes')],
    reading: [c('anx-graham', 'chapter', 'Anaximenes')],
  },
  patch: {
    lifespan: 'fl. mid-6th century BCE; birth and death dates uncertain', birthYear: -586, deathYear: -526,
    region: 'Miletus, Ionia', tradition: 'Milesian / early Greek inquiry',
    primaryBranchIds: ['ancient-greek', 'metaphysics'], secondaryBranchIds: ['philosophy-of-science', 'philosophy-of-mind'],
    mainIdeas: ['Air as underlying nature', 'Rarefaction and condensation', 'Density and qualitative change', 'Breath-soul analogy', 'Air-supported cosmos'],
    keyWorks: ['Lost prose work conventionally called On Nature; fragments and testimonia only'],
    lifeStory: 'Anaximenes was a mid-sixth-century Milesian known almost entirely through Theophrastean and later testimony about air, density change, cosmology, and weather.',
    contributionSummary: 'Explained diverse stuffs as transformations of air through rarefaction and condensation, giving Milesian unity a reported physical mechanism.',
    beginnerExplanation: 'Anaximenes says one underlying stuff, air, becomes different things as it spreads out or compacts. The idea links qualitative difference to changes in density.',
    influencedByIds: ['anaximander', 'thales'], influencedIds: ['heraclitus'], disagreementIds: [],
    suggestedFirstReading: 'Graham’s Anaximenes dossier with the SEP and IEP Milesian discussions',
    historicalContext: 'Archaic Miletus amid maritime exchange, craft processes, weather observation, civic instability, and the earlier Milesian search for natural principles.',
    dateDisplay: 'fl. mid-6th century BCE; dates uncertain', dateConfidence: 'low',
    dateNote: 'Ancient chronological reports conflict. The conventional c. 586–c. 526 BCE span is an orientation device, not a documented lifespan.',
    shortBio: 'A Milesian natural philosopher who made air the underlying nature and used rarefaction and condensation to explain the formation of different stuffs.',
    extendedBio: ['A later succession tradition associates him with Anaximander, but no secure school biography survives.', 'His lost prose is mediated primarily through Theophrastus and later doxographers.'],
    centralQuestions: ['How can one underlying stuff become many qualitatively different things?', 'Can ordinary processes support a general cosmology?', 'How are breath, life, and cosmic structure related?'],
    majorIdeasDetailed: [
      {name: 'Air', explanation: 'A determinate but often invisible and apparently unbounded underlying nature.', whyItMatters: 'It mediates between a familiar element and an origin capable of many forms.'},
      {name: 'Rarefaction and condensation', explanation: 'Air becomes fire as it rarefies and progressively wind, cloud, water, earth, and stone as it condenses.', whyItMatters: 'It offers a regular mechanism for plurality from unity.'},
      {name: 'Breath and soul', explanation: 'A transmitted comparison relates soul-air holding the body together to air encompassing the cosmos.', whyItMatters: 'It links living cohesion and cosmology while resisting modern mind-matter categories.'},
      {name: 'Air-supported cosmos', explanation: 'Flat earth and celestial bodies are reported as carried by air.', whyItMatters: 'The underlying principle also performs continuing structural work.'},
    ],
    keyWorksDetailed: [{title: 'Lost work conventionally called On Nature', summary: 'Later sources report Ionic prose, but no continuous text or secure original title survives.', whyItMatters: 'Its remains require separating near-fragmentary wording from Theophrastean and later testimony.'}],
    lifeEvents: [{approximateYear: -550, label: 'Approximate floruit', description: 'Active in mid-sixth-century Miletus; exact birth and death dates are not recoverable.'}],
    intellectualDevelopment: ['No personal developmental sequence survives.', 'Later historians read air and density change as a response within the Milesian sequence.'],
    influencesReceived: ['The reconstructed Milesian problems associated with Thales and Anaximander', 'Observation and craft analogies involving air, cloud, breath, and compression'],
    influenceOnLaterThought: ['Later air theories, especially Diogenes of Apollonia', 'Debates over monism and qualitative change', 'Histories of observation-guided natural explanation'],
    controversiesOrInterpretiveTensions: ['Conflicting chronology', 'Status of the soul-air sentence', 'Whether the breath example is Anaximenes’ own', 'How much systematic unity late doxography imposes'],
    commonMisunderstandings: ['Air is not identical with the modern chemical atmosphere.', 'The breath example is not a successful modern experiment.', 'Detailed sky models are late reports, not surviving diagrams.', 'Anaximenes did more than replace one proposed element with another.'],
    schoolMemberships: ['Milesian is a useful historical grouping, not securely documented institutional membership.'],
    branchContributions: [{branchId: 'ancient-greek', summary: 'Develops the Milesian search for an internally ordered natural account.'}, {branchId: 'metaphysics', summary: 'Connects unity and plurality through density-based transformation.'}, {branchId: 'philosophy-of-science', summary: 'Uses familiar observable and craft processes as models for a general mechanism.'}, {branchId: 'philosophy-of-mind', summary: 'The soul-air analogy is an early, mediated reflection on life and cohesion.'}],
    branchMemberships: [{branchId: 'ancient-greek', status: 'precursor', note: 'A central Milesian figure known through later evidence.', confidence: 'high'}, {branchId: 'metaphysics', status: 'precursor', note: 'Air and density change address the one-many problem.', confidence: 'high'}, {branchId: 'philosophy-of-science', status: 'precursor', note: 'Reported mechanisms appeal to recurring processes, without modern experimental procedure.', confidence: 'medium'}, {branchId: 'philosophy-of-mind', status: 'associated', note: 'A disputed transmitted analogy connects soul and air.', confidence: 'low'}],
    beginnerReadingPath: [{title: 'Anaximenes evidence in Early Greek Philosophy, Volume II', author: 'André Laks and Glenn W. Most', year: 2016, type: 'primary', difficulty: 'intermediate', whyRead: 'Read the fragmentary and testimonial evidence with a current critical apparatus.', sourceUrl: 'https://www.hup.harvard.edu/books/9780674996892'}],
    advancedReadingPath: [{title: 'The Texts of Early Greek Philosophy', author: 'Daniel W. Graham', year: 2010, type: 'book', difficulty: 'advanced', whyRead: 'Compare translation, testimony selection, and commentary independently.', sourceUrl: 'https://www.cambridge.org/core/books/texts-of-early-greek-philosophy/1D619753DA9D178EA10F166DB0E46D7A'}, {title: 'Philosophy Before Socrates', author: 'Richard D. McKirahan', year: 2010, type: 'book', difficulty: 'advanced', whyRead: 'Follow the explanatory logic of the Milesian sequence without erasing source uncertainty.', sourceUrl: 'https://hackettpublishing.com/philosophy-before-socrates-2nd-edition'}],
  },
  reviewNotePath: 'docs/editorial/reviews/anaximenes.md', reviewLock: 'fnv1a64:c2b251244091abd7',
};

const pythagorasSources: EditorialSource[] = [
  {
    id: 'pyt-sep', type: 'scholarly-reference', authors: ['Carl A. Huffman'], title: 'Pythagoras',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Fall 2020', year: 2020,
    url: 'https://plato.stanford.edu/archives/fall2020/entries/pythagoras/', accessedOn: '2026-08-02',
    note: 'Specialist source-critical reconstruction used for life, early witnesses, soul, way of life, mathematics, and cosmology.',
  },
  {
    id: 'pyt-pythagoreanism', type: 'scholarly-reference', authors: ['Carl A. Huffman'], title: 'Pythagoreanism',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Fall 2022', year: 2022,
    url: 'https://plato.stanford.edu/archives/fall2022/entries/pythagoreanism/', accessedOn: '2026-08-02',
    note: 'Used to separate Pythagoras, fifth-century Pythagoreans, Philolaus and Archytas, later pseudepigrapha, and disputed influence on Plato.',
  },
  {
    id: 'pyt-diogenes', type: 'primary-text', authors: ['Diogenes Laertius'], title: 'Lives of Eminent Philosophers, Book 8: Pythagoras and Pythagoreans',
    editors: ['James Miller'], translator: 'Stephen White', publisher: 'Cambridge University Press', year: 2021, doi: '10.1017/9781139047111.010',
    url: 'https://doi.org/10.1017/9781139047111.010', accessedOn: '2026-08-02',
    note: 'Third-century CE compilation preserving earlier material and contradictions; used as later testimony, never transparent contemporary biography.',
  },
  {
    id: 'pyt-burkert', type: 'scholarly-book', authors: ['Walter Burkert'], title: 'Lore and Science in Ancient Pythagoreanism',
    translator: 'Edwin L. Minar Jr.', publisher: 'Harvard University Press', year: 1972, isbn: '978-0-674-53918-1',
    url: 'https://www.hup.harvard.edu/books/9780674539181', accessedOn: '2026-08-02',
    note: 'Foundational source-critical study used for the historical Pythagoras, later legend, ritual, mathematics, and the limits of attribution.',
  },
  {
    id: 'pyt-zhmud', type: 'scholarly-book', authors: ['Leonid Zhmud'], title: 'Pythagoras and the Early Pythagoreans',
    translator: 'Kevin Windle', publisher: 'Oxford University Press', year: 2012, isbn: '978-0-19-928931-8',
    url: 'https://global.oup.com/academic/product/pythagoras-and-the-early-pythagoreans-9780199289318', accessedOn: '2026-08-02',
    note: 'Major revisionist university-press study consulted where it challenges influential reconstructions of early community, religion, science, and politics.',
  },
];

const pythagorasSections: ArticleSection[] = [
  section('orientation', 'A famous name behind an unusually difficult source problem', [
    'Pythagoras is famous as mathematician, mystic, community founder, moral teacher, and discoverer, yet the historical person is difficult to recover. He left no authenticated writing, and no contemporary supplied a detailed biography. The earliest evidence is scattered among brief references, while intact lives by Diogenes Laertius, Porphyry, and Iamblichus were written many centuries later, after Pythagoras had become a near-divine source of accumulated wisdom. A responsible page begins with this “Pythagorean question”: which claims belong to early evidence, which describe fifth-century Pythagoreans, and which arise from later idealization or pseudonymous literature?',
    'The distinction changes the profile’s center. Early evidence supports Pythagoras’ renown for teachings about the soul, ritual expertise, extraordinary memory or powers, and a disciplined way of life. It does not securely support the popular picture of one man proving the theorem named after him, discovering musical ratios in a blacksmith’s shop, and authoring a complete numerical metaphysics. Mathematics and cosmology become increasingly important in later Pythagorean traditions, especially with figures such as Philolaus and Archytas. That tradition is genuinely Pythagorean without every achievement being Pythagoras’ personal doctrine.',
  ], ['philolaus', 'plato', 'aristotle'], ['Early Greek Philosophy']),
  section('life-migration', 'Samos, Croton, and an approximate life', [
    'Pythagoras is conventionally dated about 570–490 BCE, born on Samos and active chiefly at Croton in southern Italy. The dates are approximate syntheses of later reports, not a recorded lifespan. The move west is plausible and central to every major tradition, but the often repeated claim that he left Samos at exactly forty comes from late biography. Stories of study in Egypt, Babylonia, Phoenicia, or elsewhere may encode recognition of older non-Greek wisdom and actual Mediterranean mobility; they do not provide an itinerary that can be verified stop by stop.',
    'Croton was a wealthy Greek city with athletic, medical, religious, and political cultures. Pythagoras reportedly attracted followers and helped shape a distinctive way of life. Later traditions describe influence across southern Italian cities, factional conflict, burning meeting houses, exile, and death at Metapontum. The chronology and causes of anti-Pythagorean violence are contested, and some stories combine events from different generations. We can responsibly locate the movement in civic life without claiming that Pythagoras personally ruled Croton or that one political program explains every later attack.',
  ], ['philolaus'], []),
  section('evidence', 'Early witnesses and the gravitational pull of late biography', [
    'The earliest witnesses do not agree in tone. Xenophanes mocks a man who recognized a dead friend’s soul in a beaten puppy, commonly taken as Pythagoras; Heraclitus criticizes Pythagoras’ extensive learning; Herodotus compares certain Greek practices with Egyptian ones and reports a Thracian figure whose teaching resembles Greek ideas about postmortem life. Ion of Chios links Pythagoras with writings under another name. These references are brief, hostile, allusive, or indirect, yet their closeness gives them special weight. Together they suggest fame for learning, soul teaching, and a life practice, not a textbook mathematical system.',
    'Fourth-century evidence remains selective. Plato mentions Pythagoras once as someone whose followers valued a distinctive way of life. Aristotle wrote works on the Pythagoreans now lost; surviving references distinguish Pythagoras from “the so-called Pythagoreans” whose numerical principles he discusses. Post-Aristotelian writers such as Aristoxenus and Dicaearchus had access to traditions now lost, but only fragments remain. Late biographers preserve some of this earlier material alongside miracle, moral exemplum, Neoplatonic system, and forgery. Their detail cannot be treated as increasing certainty simply because it is vivid.',
  ], ['plato', 'aristotle'], ['Republic', 'Metaphysics']),
  section('soul', 'Transmigration, identity, and a morally ordered cosmos', [
    'The strongest early association is transmigration or metempsychosis: a soul survives death and enters another living body. Xenophanes’ puppy story is satirical, so it does not give a systematic doctrine, but the joke depends on an audience recognizing a claim about the same soul across species. Later reports add remembered previous lives, judgment after death, purification, and cosmic destinations. These details vary in date and reliability. Pythagoras can be presented as a prominent early Greek teacher of transmigration without being declared its inventor or assigned every Orphic, Bacchic, or Platonic teaching about the soul.',
    'Transmigration changes ethical perspective. If a soul can inhabit different human and animal lives, identity exceeds one body and conduct participates in a longer order. Dietary restrictions and ritual practices may relate to kinship among living beings, purity, sacrifice, or several concerns, but the evidence does not yield one secure vegetarian code. The soul doctrine also resists a neat modern separation of religion and philosophy. It proposes what a person is, how actions matter, and how the cosmos is morally structured; those are metaphysical and ethical claims expressed through ritualized life rather than a surviving argument treatise.',
  ], ['empedocles', 'plato'], []),
  section('way-of-life', 'Discipline, community, and rules that changed in transmission', [
    'Plato’s Republic says followers regarded Pythagoras as the founder of a way of life, and Aristotle likewise distinguishes his personal fame from later cosmological system. Early Pythagorean life probably included ritual observance, dietary choices, memory practices, music, self-examination, friendship, and authoritative teaching. Late sources multiply rules: abstain from beans, do not stir fire with a knife, put on the right shoe first, maintain silence, hold property in common. Some may preserve old practices; others are symbolic maxims, jokes, later systematization, or attempts to explain an admired community.',
    'The movement should not be reduced to either a modern religious sect or a research institute. “Community” may cover households, political friendships, ritual associations, listeners, and later intellectual networks. Ancient sources distinguish groups of followers in inconsistent ways, and the famous contrast between mathematical learners and hearers may reflect later classification. Women appear by name in Pythagorean tradition, but many texts attributed to early Pythagorean women are Hellenistic or later pseudepigrapha. Inclusion in later memory matters while authorship and early social structure remain contested.',
  ], ['philolaus'], []),
  section('number-music', 'Number and harmony without giving one man a later system', [
    'Pythagoras was eventually credited with discovering numerical ratios underlying musical concords. The story of hammers at a forge is physically implausible in its familiar form and late in transmission. Experiments with string lengths or other sounding bodies belong more plausibly to early Greek harmonic inquiry, but the evidence does not securely identify Pythagoras as the experimenter. Fifth-century Pythagoreans, especially Philolaus’ tradition, clearly connect number, ratio, limit, and harmony. The safe historical formulation is that numerical-musical thought became central to Pythagoreanism, not that every ratio originated in Pythagoras’ workshop.',
    'This caution preserves a major philosophical insight. Musical concord offered a striking case in which qualitative experience depends on relations expressible through small whole numbers. Later Pythagoreans could extend that model to cosmic and bodily order. But a doctrine that all things are numbers is chiefly known through Aristotle’s account of “so-called Pythagoreans” and is debated even for Philolaus. Pythagoras himself may have valued special number relationships within a morally meaningful cosmos; the evidence does not authorize a complete ontological arithmetic under his name.',
  ], ['philolaus', 'archytas', 'aristotle'], ['Metaphysics']),
  section('theorem', 'The theorem and the hazards of eponymous discovery', [
    'The relation now called the Pythagorean theorem was known in practical or numerical forms in Babylonian mathematics long before Pythagoras, and ancient Indian mathematical traditions also developed relevant constructions. The earliest Greek evidence for a proof does not name Pythagoras. Later writers credit him with a theorem, sometimes accompanied by a sacrifice story that conflicts with his reputed sacrificial restrictions. Eudemus’ history, as reported by Proclus, assigns propositions to Pythagoreans collectively rather than securely to Pythagoras. An eponym is not a historical certificate of first discovery.',
    'It remains possible that Pythagoras or early followers contributed to Greek deductive mathematics, but possibility must not become a museum fact. The most useful lesson is historiographical. Mathematical results can emerge in several cultures, shift from practical procedure to proof, and receive a famous name long afterward. Treating the theorem as collective and transmitted achievement does not diminish Greek mathematics. It distinguishes the history of a proposition from the later prestige of its label and prevents Pythagoras from absorbing the work of unnamed communities.',
  ], ['philolaus', 'archytas'], []),
  section('politics-violence', 'Civic influence and anti-Pythagorean conflict', [
    'Pythagorean groups became politically significant in several southern Italian cities, but surviving narratives are late and partisan. Some portray disciplined aristocratic clubs; others emphasize ethical reform, civic order, or rivalry among elites. The evidence does not support mapping a single constitutional ideology onto Pythagoras. Personal authority and tight friendship networks could have political consequences without constituting a written party platform. Describing the movement as simply democratic or oligarchic would flatten different cities and generations.',
    'Accounts of meeting-house burnings and persecution also vary. One attack may belong within Pythagoras’ lifetime, while a wider mid-fifth-century crisis affected later Pythagoreans; ancient authors rearrange participants and survivors. Philolaus is sometimes inserted into a burning story only in a later version. The violence nevertheless shows that Pythagorean life was not private spirituality detached from the polis. Communal discipline, elite networks, and claims to authority could generate intense opposition. Exact perpetrators, dates, and causal narratives remain unresolved.',
  ], ['philolaus'], []),
  section('plato-reception', 'Plato, later Pythagoreanism, and inflated ancestry', [
    'Pythagorean influence on Plato is real but narrower and more mediated than older histories often claimed. Plato mentions Pythagoras only once and Pythagoreans once. His Philebus clearly engages limit and unlimited, a framework close to Philolaus and Aristotle’s fifth-century Pythagoreans; mathematical music informs parts of the Timaeus. Yet not every Platonic use of mathematics, immortality, or myth derives from Pythagoras. Plato drew on many mathematical, Eleatic, Socratic, mystery, and poetic traditions. Specific comparison is stronger than the blanket label “Pythagorean Plato.”',
    'From the early Academy onward, texts and doctrines were increasingly assigned to Pythagoras and named followers. By the Hellenistic and Roman periods, pseudonymous treatises presented later Platonic and Aristotelian ideas as ancient Pythagorean originals. Neopythagorean and Neoplatonic biographies made Pythagoras a divinely authorized master of philosophy. These works are important evidence for reception, not a hidden archive of sixth-century teaching. The historical Pythagoras and the tradition-making Pythagoras should both appear, but their claims cannot share one confidence level.',
  ], ['plato', 'philolaus', 'iamblichus'], ['Philebus', 'Timaeus']),
  section('authority-memory', 'Founder authority, secrecy, and collective memory', [
    'Pythagorean tradition repeatedly presents teaching through authority: later sayings are introduced with “he himself said,” rules are tied to the founder, and anonymity can protect communal rather than individual ownership. Yet the evidence for a uniform early oath-bound secrecy system is weaker than popular accounts suggest. Esoteric practice, oral transmission, and reverence for Pythagoras are plausible; a policy that explains every missing text is not. The absence of Pythagoras’ writing should be treated as an evidential condition, not proof that a complete secret doctrine existed and was perfectly concealed.',
    'Founder authority also changes how innovations are remembered. A community may attribute a discovery to the source of its way of life, use his name to guarantee teaching, or interpret new results as unfolding inherited principles. Modern history asks a different question: which person or generation does the earliest evidence support? The two practices need not yield the same answer. Separating them explains how genuine Pythagorean mathematics and cosmology could acquire Pythagoras’ name even if Philolaus, Archytas, or unnamed investigators supplied the surviving intellectual substance.',
    'This distinction makes room for collective memory without treating it as fraud. Some later attributions are deliberate pseudepigraphy; others may express school identity, reverence, or an ancient conception of authorship unlike the modern research credit system. Each text still needs dating and linguistic analysis. Respect for a tradition’s self-understanding does not require accepting its priority claims literally, while source criticism need not portray every later Pythagorean as a deceiver. The historical task is to explain how authority moved through names, practices, and texts.',
    'It also explains why doctrinal consistency is a poor authenticity test by itself. A late author can imitate an early rule, and an early community can disagree or develop. Conversely, a report that conflicts with a familiar “Pythagorean” idea may preserve a different period rather than an error. Chronology, vocabulary, transmitter, and independent attestation matter more than whether a claim fits the legend of one unified system. The Pythagorean question is solved claim by claim, not by selecting one portrait and making every witness conform.',
    'This method leaves a historical Pythagoras who is less encyclopedic but more credible: a renowned teacher of soul and life whose authority generated communities capable of change. It also gives later Pythagoreans their own history. Philolaus’ principles and Archytas’ mathematics become achievements to study in context rather than footnotes to a founder who supposedly knew everything in advance.',
  ], ['philolaus', 'archytas', 'iamblichus'], []),
  section('reading', 'A layered path through the Pythagorean question', [
    'Start with the chronological source chart and argument in Huffman’s SEP Pythagoras article, then read the earliest witnesses before the intact late lives. Mark date, genre, and polemical interest for Xenophanes, Heraclitus, Herodotus, Plato, Aristotle, Aristoxenus, Diogenes, Porphyry, and Iamblichus. Reading late biography last does not make it worthless; it prevents its narrative fullness from drowning the earlier evidence. Diogenes Book 8 is especially useful when its contradictions and source citations remain visible.',
    'Next separate columns for the historical individual, early way of life, fifth-century Pythagoreans, Philolaus, Archytas, later pseudepigrapha, and reception. Place each claim—transmigration, diet, common property, silence, musical ratios, theorem, limit and unlimited, cosmic harmony—in the narrowest supported column. Compare Burkert’s influential source-critical reconstruction with Zhmud’s revisionist challenges rather than treating one monograph as a final verdict. The exercise yields a more durable portrait: uncertainty is organized, not erased, and collective achievement is not reassigned to a legendary founder.',
  ], ['philolaus', 'archytas', 'plato', 'aristotle', 'iamblichus'], ['Early Greek Philosophy', 'Lives of Eminent Philosophers']),
];

const pythagorasConfig: ModernClusterEditorialConfig = {
  sources: pythagorasSources, articleSections: pythagorasSections,
  sectionCitations: {
    orientation: [c('pyt-sep', 'section', '1. The Pythagorean Question; 2. Sources'), c('pyt-burkert', 'chapter', 'I. Pythagoras Himself')],
    'life-migration': [c('pyt-sep', 'section', '3. Life and Works'), c('pyt-zhmud', 'chapter', 'Pythagoras’ Life and the Pythagorean Society')],
    evidence: [c('pyt-sep', 'section', '2. Sources; 2.1–2.3'), c('pyt-diogenes', 'book-chapter', '8.1–50')],
    soul: [c('pyt-sep', 'section', '4.1 The Fate of the Soul—Metempsychosis'), c('pyt-burkert', 'chapter', 'II. Pythagorean Religion')],
    'way-of-life': [c('pyt-sep', 'section', '4.3 The Pythagorean Way of Life'), c('pyt-pythagoreanism', 'section', '1. The Pythagorean Way of Life'), c('pyt-diogenes', 'book-chapter', '8.10–23')],
    'number-music': [c('pyt-sep', 'section', '5. Was Pythagoras a Mathematician or Cosmologist?'), c('pyt-pythagoreanism', 'section', '2. Fifth-Century Pythagoreanism'), c('pyt-burkert', 'chapter', 'III. Pythagorean Science')],
    theorem: [c('pyt-sep', 'section', '5. Was Pythagoras a Mathematician or Cosmologist?'), c('pyt-burkert', 'chapter', 'III. Pythagorean Science'), c('pyt-zhmud', 'chapter', 'Pythagorean Science')],
    'politics-violence': [c('pyt-pythagoreanism', 'section', '1. The Pythagorean Way of Life; 2. Fifth-Century Pythagoreanism'), c('pyt-zhmud', 'chapter', 'The Pythagorean Society')],
    'plato-reception': [c('pyt-pythagoreanism', 'section', '5. Plato and Pythagoreanism; 6. Later Pythagoreanism'), c('pyt-sep', 'section', '2.3 Plato and Aristotle as Sources'), c('pyt-burkert', 'chapter', 'IV. Plato and Pythagoreanism')],
    'authority-memory': [c('pyt-sep', 'section', '1. The Pythagorean Question; 2. Sources'), c('pyt-pythagoreanism', 'section', '1. The Pythagorean Way of Life; 6. Later Pythagoreanism'), c('pyt-burkert', 'chapter', 'I. Pythagoras Himself')],
    reading: [c('pyt-sep', 'section', '1–5'), c('pyt-burkert', 'chapter', 'I–III'), c('pyt-zhmud', 'chapter', 'Pythagoras and the Early Pythagoreans')],
  },
  evidence: {
    life: [c('pyt-sep', 'section', '2–3')],
    ideas: [c('pyt-sep', 'section', '4. The Philosophy of Pythagoras'), c('pyt-burkert', 'chapter', 'I–II')],
    works: [c('pyt-sep', 'section', '1–3')],
    influence: [c('pyt-pythagoreanism', 'section', '2–6'), c('pyt-sep', 'section', '5. Was Pythagoras a Mathematician or Cosmologist?')],
    disputes: [c('pyt-sep', 'section', '1–5'), c('pyt-burkert', 'chapter', 'I–III'), c('pyt-zhmud', 'chapter', 'Pythagoras’ Life; Pythagorean Science')],
    reading: [c('pyt-sep', 'section', '2. Sources')],
  },
  patch: {
    lifespan: 'c. 570–c. 490 BCE; chronology disputed', birthYear: -570, deathYear: -490,
    region: 'Samos and Croton', tradition: 'Early Pythagorean way of life',
    primaryBranchIds: ['ancient-greek', 'philosophy-of-religion'], secondaryBranchIds: ['ethics', 'metaphysics'],
    mainIdeas: ['Transmigration of souls', 'Ritual and disciplined life', 'Moral cosmic order', 'Community and friendship', 'Later numerical-harmonic tradition'],
    keyWorks: ['No authenticated writings; early references and later testimonia'],
    lifeStory: 'Pythagoras was an archaic Samian who became active at Croton and inspired a disciplined way of life. His biography and doctrines were extensively enlarged by later Pythagorean and Neoplatonic tradition.',
    contributionSummary: 'Founded or inspired a durable way of life centered on the soul, ritual discipline, and community; later Pythagoreans developed the mathematical cosmology popularly assigned to him.',
    beginnerExplanation: 'The historical Pythagoras is best known for teachings about the soul and a disciplined communal life. The theorem and a complete “all is number” system cannot securely be assigned to him.',
    influencedByIds: [], influencedIds: ['philolaus', 'plato'], disagreementIds: [],
    suggestedFirstReading: 'Huffman, “Pythagoras,” sections 1–5, followed by the earliest named witnesses',
    historicalContext: 'Late archaic Samos and southern Italy, amid Mediterranean mobility, ritual associations, civic faction, mathematics, music, medicine, and competing wisdom traditions.',
    dateDisplay: 'c. 570–c. 490 BCE; chronology disputed', dateConfidence: 'low',
    dateNote: 'The conventional dates synthesize later reports. Exact age, migration year, political career, and circumstances of death are not securely recoverable.',
    shortBio: 'A Samian teacher active at Croton, remembered early for soul teaching, ritual expertise, extraordinary wisdom, and a disciplined way of life, then transformed into a universal sage by later tradition.',
    extendedBio: ['No authenticated writing or contemporary biography survives; the earliest testimony is brief and sometimes hostile.', 'Later Pythagorean mathematical and cosmological achievements must not automatically be reassigned to the founder.'],
    centralQuestions: ['What survives of personal identity through death and rebirth?', 'How can a disciplined way of life order desire, community, and cosmic belonging?', 'Which later Pythagorean doctrines can be assigned to Pythagoras?'],
    majorIdeasDetailed: [
      {name: 'Transmigration', explanation: 'The soul survives death and can enter other living bodies; early evidence supports the association but not a complete system.', whyItMatters: 'It links identity, ethics, ritual, and relations among living beings.'},
      {name: 'Pythagorean way of life', explanation: 'Ritual, diet, discipline, memory, friendship, and teaching formed a communal practice whose exact rules changed in transmission.', whyItMatters: 'Philosophy appears as organized living, not only written doctrine.'},
      {name: 'Number and harmony', explanation: 'Central to later Pythagoreans, with only limited and disputed evidence for Pythagoras’ own mathematical cosmology.', whyItMatters: 'It reveals how qualitative order can be related to ratio while requiring careful attribution.'},
    ],
    keyWorksDetailed: [{title: 'Early testimonia concerning Pythagoras', summary: 'Brief references by Xenophanes, Heraclitus, Herodotus, Ion, Plato, Aristotle, and later witnesses; no authored work survives.', whyItMatters: 'Chronological layering is the basis for any responsible reconstruction.'}],
    lifeEvents: [{approximateYear: -570, label: 'Approximate birth on Samos', description: 'Conventional later chronology, not a contemporary record.'}, {approximateYear: -530, label: 'Migration to Croton', description: 'A widely reported move whose exact year and motives are uncertain.'}, {approximateYear: -490, label: 'Approximate death', description: 'Traditions differ on place and circumstances.'}],
    intellectualDevelopment: ['No secure sequence of Pythagoras’ personal doctrine survives.', 'Fifth-century Pythagoreans developed mathematical, harmonic, and cosmological systems.', 'Hellenistic and late antique pseudepigrapha projected later systems back onto the founder.'],
    influencesReceived: ['Archaic Greek ritual and wisdom traditions', 'Eastern Mediterranean and possibly Egyptian or Near Eastern knowledge contacts; detailed travel itineraries are legendary'],
    influenceOnLaterThought: ['Pythagorean communities and way of life', 'Philolaus and Archytas', 'Specific aspects of Platonic philosophy', 'Neopythagorean and Neoplatonic reception'],
    controversiesOrInterpretiveTensions: ['Mathematical and scientific attribution', 'Political structure of early communities', 'Historic core of dietary and ritual rules', 'Relation to Orphic and other mystery traditions', 'Extent of influence on Plato'],
    commonMisunderstandings: ['The theorem’s name does not prove Pythagoras discovered or proved it.', '“All things are number” belongs chiefly to later testimony about Pythagoreans.', 'Late biographies are not contemporary eyewitness records.', 'Pythagoreanism is not one unchanged doctrine spoken by its founder.'],
    schoolMemberships: ['Founder or inspiration of a way of life; later Pythagorean philosophical schools and pseudonymous corpora are distinct stages.'],
    branchContributions: [{branchId: 'ancient-greek', summary: 'Established a durable model of philosophy as authoritative, disciplined communal life.'}, {branchId: 'philosophy-of-religion', summary: 'Made the soul’s fate, ritual purity, and cosmic moral order central.'}, {branchId: 'ethics', summary: 'Connected conduct with discipline, friendship, and a life extending beyond one embodiment.'}, {branchId: 'metaphysics', summary: 'Later Pythagorean numerical metaphysics developed under his name but cannot be wholly assigned to him.'}],
    branchMemberships: [{branchId: 'ancient-greek', status: 'precursor', note: 'Foundational early figure whose historical profile must be separated from later Pythagorean systems.', confidence: 'high'}, {branchId: 'philosophy-of-religion', status: 'major', note: 'Early evidence strongly associates him with the soul’s fate and ritual expertise.', confidence: 'high'}, {branchId: 'ethics', status: 'associated', note: 'A disciplined way of life is secure in broad outline; exact rules are uncertain.', confidence: 'medium'}, {branchId: 'metaphysics', status: 'influence', note: 'Later Pythagorean metaphysics operated under his authority, with weak evidence for his own system.', confidence: 'low'}],
    beginnerReadingPath: [{title: 'Pythagoras', author: 'Carl A. Huffman', year: 2020, type: 'article', difficulty: 'beginner', whyRead: 'Begin with the source problem and a chronological reconstruction before reading late biography.', sourceUrl: 'https://plato.stanford.edu/archives/fall2020/entries/pythagoras/'}],
    advancedReadingPath: [{title: 'Early Greek Philosophy, Volume IV', author: 'André Laks and Glenn W. Most', year: 2016, type: 'primary', difficulty: 'advanced', whyRead: 'Compare the full ancient evidence with source and reception categories.', sourceUrl: 'https://www.hup.harvard.edu/books/9780674996922'}, {title: 'Lore and Science in Ancient Pythagoreanism', author: 'Walter Burkert', year: 1972, type: 'book', difficulty: 'advanced', whyRead: 'Study the foundational modern source-critical reconstruction.', sourceUrl: 'https://www.hup.harvard.edu/books/9780674539181'}, {title: 'Pythagoras and the Early Pythagoreans', author: 'Leonid Zhmud', year: 2012, type: 'book', difficulty: 'advanced', whyRead: 'Test that reconstruction against a major revisionist account.', sourceUrl: 'https://global.oup.com/academic/product/pythagoras-and-the-early-pythagoreans-9780199289318'}],
  },
  reviewNotePath: 'docs/editorial/reviews/pythagoras.md', reviewLock: 'fnv1a64:3e81058ae7d9bb93',
};

const philolausSources: EditorialSource[] = [
  {
    id: 'phi-sep', type: 'scholarly-reference', authors: ['Carl A. Huffman'], title: 'Philolaus',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Spring 2017', year: 2017,
    url: 'https://plato.stanford.edu/archives/spr2017/entries/philolaus/', accessedOn: '2026-08-02',
    note: 'Specialist account used for biography, fragment authenticity, limiters and unlimiteds, number, harmony, cosmology, soul, and reception.',
  },
  {
    id: 'phi-huffman', type: 'scholarly-book', authors: ['Carl A. Huffman'], title: 'Philolaus of Croton: Pythagorean and Presocratic',
    publisher: 'Cambridge University Press', year: 1993, isbn: '978-0-521-41525-5',
    url: 'https://www.cambridge.org/core/books/philolaus-of-croton/33B926B5D0D763DFD0F26AAB1DF77963', accessedOn: '2026-08-02',
    note: 'Full critical study, text, translation, and commentary; its influential authenticity and reconstruction arguments are identified as scholarly judgments, not manuscript facts.',
  },
  {
    id: 'phi-plato', type: 'primary-text', authors: ['Plato'], title: 'Phaedo', translator: 'Harold North Fowler',
    publisher: 'Perseus Digital Library / Harvard University Press', year: 1914,
    url: 'https://scaife-reader.perseus.tufts.edu/reader/urn%3Acts%3AgreekLit%3Atlg0059.tlg004.perseus-eng2%3A61/', accessedOn: '2026-08-02',
    note: 'Cited by Stephanus division. Plato’s dramatic reference to hearing Philolaus in Thebes is evidence for reception and approximate chronology, not a transcript of Philolaus’ book.',
  },
  {
    id: 'phi-pythagoreanism', type: 'scholarly-reference', authors: ['Carl A. Huffman'], title: 'Pythagoreanism',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Fall 2022', year: 2022,
    url: 'https://plato.stanford.edu/archives/fall2022/entries/pythagoreanism/', accessedOn: '2026-08-02',
    note: 'Used to distinguish Philolaus’ fragments from Pythagoras, Aristotle’s so-called Pythagoreans, and later pseudonymous Pythagorean literature.',
  },
  {
    id: 'phi-aristotle', type: 'primary-text', authors: ['Aristotle'], title: 'Metaphysics, Book 1', translator: 'Hugh Tredennick',
    publisher: 'Perseus Digital Library / Harvard University Press', year: 1933,
    url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0052%3Abook%3D1%3Asection%3D985b', accessedOn: '2026-08-02',
    note: 'Later philosophical testimony on unnamed “so-called Pythagoreans”; resemblance to Philolaus is significant but does not make every Aristotelian statement a quotation from him.',
  },
];

const philolausSections: ArticleSection[] = [
  section('orientation', 'A Pythagorean philosopher with fragments of his own', [
    'Philolaus is crucial because the early Pythagorean tradition becomes more textually accessible with him. Unlike Pythagoras, to whom no authenticated writing can be assigned, Philolaus is associated with a prose work and a set of fragments, several of which are widely accepted as genuine. They present a cosmos constituted through limiters, unlimiteds, and harmony; insist that number is necessary for knowledge; and describe an unusual astronomical system organized around a central fire. This evidence makes Philolaus a philosopher in his own right, not merely a reporter of a founder’s secret teaching.',
    'That accessibility remains qualified. More than twenty fragments circulated under his name, but modern scholars usually accept only a core group—often eleven—as deriving from the authentic work. Other pieces probably belong to later pseudonymous texts. Authenticity judgments depend on language, doctrine, citation history, and fit with early witnesses; they are not unanimous or mechanically guaranteed by a DK “B” label. Modern editions organize and number the material differently. Every quoted or paraphrased fragment should therefore be attached to an edition and standard identifier rather than presented as a page from an intact book.',
  ], ['pythagoras', 'plato', 'aristotle'], ['Early Greek Philosophy']),
  section('life-dates', 'Croton, Thebes, and an approximate fifth-century life', [
    'Philolaus is conventionally dated about 470–385 BCE, but these figures are reconstructed. Plato’s Phaedo presents Simmias and Cebes as having heard him in Thebes before the dialogue’s dramatic date in 399, giving the strongest chronological anchor. Later reports connect him with Croton or Tarentum and with a final generation of Pythagoreans. A plausible life begins around 470 and extends into the early fourth century, yet an exact birth, death, and sequence of residence cannot be documented.',
    'The story that Philolaus escaped a burning Pythagorean meeting house at Metapontum appears in a later form that adds him to an earlier version without his name. It should not be used as a fixed life event. Nor can he have studied directly under Pythagoras if the conventional chronologies are even approximately right: Pythagoras died before Philolaus was born. Philolaus belongs to later Pythagorean development after political disruption, interacting with broader fifth-century natural philosophy, medicine, mathematics, and Eleatic problems.',
  ], ['pythagoras', 'plato'], ['Phaedo']),
  section('book-authenticity', 'One book, purchase legends, and forged doubles', [
    'Ancient reports often call Philolaus’ work On Nature, a conventional title for early cosmological prose. Some later stories say he wrote three books or that Plato bought Pythagorean books from Philolaus or his relatives and used them for the Timaeus. These purchase narratives vary in price, intermediary, and number of books, and they serve an ancestry story in which Plato acquires hidden wisdom. They do not establish three authentic volumes or plagiarism. The strongest evidence points to one work from which genuine fragments on principles, knowledge, harmony, cosmology, and living beings were excerpted.',
    'Forgery complicates the dossier because later authors produced Doric Pythagorean treatises under authoritative early names. Some Philolaic fragments reflect later Platonist or Aristotelian vocabulary and are rejected; others have been defended. Huffman’s critical study helped establish the current core, but “generally accepted” is not the same as beyond dispute. Responsible prose names the core without treating authenticity count as immutable. It also distinguishes a fragment directly quoted by a transmitter from a testimonium that summarizes a doctrine and from Aristotle’s unnamed account of Pythagoreans that happens to resemble Philolaus.',
  ], ['plato', 'aristotle'], ['Timaeus', 'Early Greek Philosophy']),
  section('limit-unlimited', 'Limiters, unlimiteds, and the conditions of a cosmos', [
    'The opening genuine fragment says nature in the cosmos was fitted together from unlimiteds and limiters, both the cosmos as a whole and everything in it. These are plural kinds, not simply Anaximander’s singular apeiron paired with a single boundary. Unlimiteds can include continua such as breath, space, time, or material stuffs that do not determine their own measure; limiters provide structure, number, boundary, or pattern. Particular things arise when these heterogeneous factors are fitted together. The interpretation is reconstructive because Philolaus gives examples only indirectly and the Greek terms permit several renderings.',
    'Limit and unlimited should not be reduced to good form imposed on bad matter. Both are necessary; neither alone yields the ordered thing. This makes Philolaus’ metaphysics relational and constructive. A pitch continuum becomes a scale through measured divisions, a temporal continuum becomes rhythm through counted intervals, and bodily materials become organized living structures. Such examples illuminate the principle without proving that Philolaus listed them all in surviving text. The central claim is that intelligibility and existence in the cosmos require unlike factors to be coordinated rather than one swallowing the other.',
  ], ['anaximander', 'plato', 'aristotle'], ['Philebus']),
  section('harmony', 'Harmony as fitting together by ratio', [
    'Harmony, harmonia, is the fitting together that joins limiters and unlimiteds despite their unlike natures. It is not merely pleasant sound and not a vague slogan that everything is connected. Fragment 6 argues that because the underlying kinds are unlike, they require harmony to enter a cosmos. Fragment 6a then presents numerical relations associated with the diatonic scale. The text and reconstruction of its intervals are technical, and English note names can hide differences between ancient and modern tuning concepts. The durable point is that ratio makes a structured unity from a continuum.',
    'Musical evidence gives Philolaus a model for explanation. Hearing encounters qualitative consonance, while calculation exposes relations among lengths or pitches. Harmony is therefore both ontological and epistemic: it helps constitute an ordered thing and makes its organization knowable. It would still be too strong to claim that every cosmic object literally produces audible music or that Philolaus authored the later “harmony of the spheres.” His surviving material supports mathematical harmony as a structural principle; the grand celestial music tradition combines multiple Pythagorean and later sources.',
  ], ['pythagoras', 'archytas'], []),
  section('number-knowledge', 'Why number belongs to knowledge', [
    'A genuine fragment says everything known has number, since without number nothing could be thought or known. This does not necessarily mean that physical things are identical with abstract numbers. Number may be the condition under which limit, proportion, plurality, and relation become intelligible. Another fragment contrasts the nature of number with falsehood and associates it with truth, while distinguishing odd, even, and odd-even. Translators and scholars debate how far the ethical vocabulary is literal and how these classifications connect with Aristotle’s account of Pythagorean number.',
    'Aristotle says the so-called Pythagoreans treated numbers as principles and saw resemblances between numerical properties and things. His account overlaps with Philolaus’ limiters, unlimiteds, harmony, and number but does not name Philolaus in these passages. Some scholars read Aristotle as systematizing or even distorting the earlier view into “things are numbers.” A careful profile lets the sources remain adjacent without collapsing them. Philolaus securely makes numerical structure necessary for knowledge; whether he identifies objects with numbers in Aristotle’s stronger sense is disputed.',
  ], ['aristotle'], ['Metaphysics']),
  section('cosmos-central-fire', 'Central fire, counter-earth, and a moving earth', [
    'Philolaus’ reported cosmos places a central fire at the middle, called the hearth or watchtower of Zeus, around which earth, counter-earth, sun, moon, planets, and fixed stars revolve. The earth is therefore not stationary at the center. This is a major conceptual departure, but it is not heliocentrism: the sun also circles the central fire and may transmit or reflect its light. The unseen counter-earth helps complete a numerical order and may explain why the central fire is hidden, though ancient testimony and modern reconstructions differ on its precise function.',
    'Calling Philolaus the first to move the earth again requires a named criterion and cautious source handling. Earlier cosmologies can involve generated or unsupported earths, while the Philolaic report is the earliest clear Greek system known to place earth in regular orbital motion around a distinct center. It did not arise from modern observational astronomy and should not be praised as a near miss at Copernicus. Its logic is Pythagorean: cosmic bodies receive ordered places within a numerically meaningful structure, and the central fire has religious as well as physical names.',
  ], ['pythagoras'], []),
  section('cosmology-life', 'Fire, breath, body, and the limits of reconstruction', [
    'Other evidence describes an outer fire surrounding the cosmos and a process by which the cosmos draws in breath from an unlimited exterior. The central fire and surrounding fire delimit an ordered interior. Reports connect Philolaus with accounts of sun, moon, eclipses, and the inhabited earth, but their compatibility and authenticity vary. A modern diagram can clarify one reconstruction while concealing uncertainty, so it should always be labeled as a model based on testimony rather than Philolaus’ own surviving image.',
    'Fragments and reports also address living bodies: generation from the warm, breathing after birth, and bodily centers associated with seed, soul, rooting, and reason. A fourfold scheme locates reason in the head, soul and sensation in the heart, rooting and growth at the navel, and generation in the genitals. The fragment’s authenticity is generally defended, but its terminology does not map cleanly onto modern neuroscience or one unified “soul.” Philolaus treats life through differentiated bodily functions within a cosmic framework of heat, breath, limit, and organization.',
  ], [], ['Early Greek Philosophy']),
  section('soul-ethics', 'Embodiment, suicide, and what Plato’s Phaedo can show', [
    'In Plato’s Phaedo, Cebes says he heard from Philolaus that suicide is not permitted, although he never received a clear account. Socrates then develops the thought that humans are in a kind of guard-post and belong to the gods. The dialogue is strong evidence that Philolaus was associated with a prohibition and was heard in Thebes; it does not let every subsequent Socratic argument be assigned to him. The wording often translated “body is a prison” does not occur as a direct Philolaic quotation in this passage.',
    'Later testimony says Pythagoreans understood the soul as a harmony, a view attacked in the Phaedo, but whether Philolaus held that doctrine is disputed. His surviving harmony metaphysics makes the association tempting, while other evidence about bodily centers and immortality complicates it. We should not turn an interlocutor’s theory into Philolaus’ signed position. His ethical profile is consequently thinner than his cosmology: a reported restriction on self-killing, Pythagorean context, and possible views of soul, not a complete surviving ethics of purification.',
  ], ['pythagoras', 'plato'], ['Phaedo']),
  section('influence', 'From Philolaus to Plato without a plagiarism legend', [
    'Plato names Philolaus in the Phaedo, and the Philebus’ contrast between limit and unlimited strongly resembles the Philolaic scheme, although Plato adapts it for his own argument. Harmonic ratios also matter in the Timaeus. These connections support specific influence or shared intellectual context. They do not validate late stories that Plato purchased a secret Philolaic book and copied the Timaeus. Plato transforms many mathematical, medical, Eleatic, and Pythagorean resources; influence is not identity or theft.',
    'Aristotle’s so-called Pythagoreans provide another important comparison. Their limit/unlimited pair, numerical principles, cosmic order, and unusual astronomy overlap substantially with Philolaus, making him a leading candidate for the system Aristotle describes. Yet Aristotle may combine several thinkers or organize them through his own causal history. Later Pythagoreanism, meanwhile, produced doctrines and pseudonymous works beyond Philolaus. His best historical role is neither mouthpiece for Pythagoras nor sole inventor of everything Pythagorean, but a major fifth-century author who made the tradition philosophically legible.',
  ], ['plato', 'aristotle', 'pythagoras'], ['Philebus', 'Timaeus', 'Metaphysics']),
  section('method', 'From musical case to philosophical architecture', [
    'Philolaus’ strongest explanatory strategy moves from an intelligible case to a general architecture. Musical pitch supplies a continuum; measured divisions and ratios make a scale; harmony names the successful fit. The metaphysical fragments then claim that the cosmos and its contents also require unlimiteds and limiters to be fitted together. The inference is not a modern induction from laboratory data, and the surviving book may have developed it differently. Still, it shows how a technical domain can furnish concepts for ontology without being reduced to decorative metaphor.',
    'The same strategy creates a risk for interpreters. Once limit, number, and harmony become general, almost any ordered thing can be redescribed in those terms, making the view appear explanatory without specifying the relevant unlimited, limiter, and ratio. The fragments are too few to show how Philolaus answered that challenge across every domain. Visitors should test the scheme on the best-attested cases—musical intervals, counted plurality, bodily organization, and cosmic arrangement—then distinguish direct textual support from a modern extrapolation. The result is a powerful framework whose scope remains partly unknown.',
  ], ['pythagoras', 'plato', 'aristotle'], []),
  section('reading', 'Reading fragments, testimonia, and cosmic reconstructions', [
    'Begin with fragments 1–7 in a critical edition, checking its concordance with traditional DK 44 B numbering. Mark which ancient author transmits each passage and whether the edition accepts it as genuine. Read the SEP article alongside Huffman’s full commentary for arguments about vocabulary, context, and authenticity. Then add testimonia on the central fire and counter-earth, keeping them visually separate from direct fragments. This sequence prevents a striking astronomical report from borrowing the textual status of a quoted metaphysical sentence.',
    'Read Plato’s Phaedo 61d–62c next, dividing the reference to Philolaus from Socrates’ development. Compare Philebus 16c–17a and Aristotle Metaphysics 1.5 only after the Philolaic core is clear. Finally, test the purchase and plagiarism stories against their late, contradictory forms. A good notebook uses four labels—genuine fragment, disputed fragment, named testimony, later reception—and records edition numbers explicitly. Philolaus then emerges with both greater substance and sharper limits: enough text for argument, not enough for an uncontested system in every detail.',
  ], ['plato', 'aristotle', 'pythagoras'], ['Phaedo', 'Philebus', 'Metaphysics', 'Early Greek Philosophy']),
];

const philolausConfig: ModernClusterEditorialConfig = {
  sources: philolausSources, articleSections: philolausSections,
  sectionCitations: {
    orientation: [c('phi-sep', 'section', 'Introduction; 1. Life and Works'), c('phi-huffman', 'chapter', 'Introduction; The Fragments')],
    'life-dates': [c('phi-sep', 'section', '1. Life and Works'), c('phi-plato', 'standard-division', '61d–e'), c('phi-huffman', 'chapter', '1. Life')],
    'book-authenticity': [c('phi-sep', 'section', '1. Life and Works; 1.2 The Writings of Philolaus'), c('phi-huffman', 'chapter', 'The Authenticity of the Fragments')],
    'limit-unlimited': [c('phi-sep', 'section', '2.1 Limiters and Unlimiteds'), c('phi-huffman', 'chapter', 'Fragments 1–2')],
    harmony: [c('phi-sep', 'section', '2.2 Harmonia'), c('phi-huffman', 'chapter', 'Fragment 6')],
    'number-knowledge': [c('phi-sep', 'section', '2.3 Number'), c('phi-aristotle', 'standard-division', '1.5, 985b23–986a21')],
    'cosmos-central-fire': [c('phi-sep', 'section', '3. Cosmology'), c('phi-huffman', 'chapter', 'Cosmogony and Astronomy')],
    'cosmology-life': [c('phi-sep', 'section', '3. Cosmology; 4. Psychology and Medicine'), c('phi-huffman', 'chapter', 'Cosmology; Embryology and Psychology')],
    'soul-ethics': [c('phi-plato', 'standard-division', '61d–62c; 85e–86d'), c('phi-sep', 'section', '4. Psychology and Medicine'), c('phi-huffman', 'chapter', 'Soul')],
    influence: [c('phi-pythagoreanism', 'section', '2. Fifth-Century Pythagoreanism; 5. Plato and Pythagoreanism'), c('phi-sep', 'section', '5. Influence'), c('phi-aristotle', 'standard-division', '1.5, 985b23–986a21')],
    method: [c('phi-sep', 'section', '2. Principles; 2.2 Harmonia'), c('phi-huffman', 'chapter', 'Fragments 1–7')],
    reading: [c('phi-sep', 'section', '1–5'), c('phi-huffman', 'chapter', 'Fragments and Testimonia'), c('phi-plato', 'standard-division', '61d–62c')],
  },
  evidence: {
    life: [c('phi-sep', 'section', '1. Life and Works'), c('phi-plato', 'standard-division', '61d–e')],
    ideas: [c('phi-sep', 'section', '2–4'), c('phi-huffman', 'chapter', 'Fragments 1–7')],
    works: [c('phi-huffman', 'chapter', 'The Authenticity of the Fragments')],
    influence: [c('phi-pythagoreanism', 'section', '2; 5'), c('phi-sep', 'section', '5. Influence'), c('phi-aristotle', 'standard-division', '1.5, 985b23–986a21')],
    disputes: [c('phi-huffman', 'chapter', 'The Authenticity of the Fragments; Cosmology'), c('phi-sep', 'section', '1–5')],
    reading: [c('phi-plato', 'standard-division', '61d–62c')],
  },
  patch: {
    lifespan: 'fl. late 5th century BCE; conventional c. 470–c. 385 dates uncertain', birthYear: -470, deathYear: -385,
    region: 'Southern Italy and Thebes', tradition: 'Fifth-century Pythagorean / Presocratic',
    primaryBranchIds: ['ancient-greek', 'metaphysics'], secondaryBranchIds: ['philosophy-of-science', 'philosophy-of-mind'],
    mainIdeas: ['Limiters and unlimiteds', 'Harmony by ratio', 'Number and knowledge', 'Central fire and moving earth', 'Differentiated bodily centers'],
    keyWorks: ['One lost prose work, conventionally On Nature; a core of approximately eleven genuine fragments'],
    lifeStory: 'Philolaus was a fifth-century Greek philosopher associated with Croton, Tarentum, and Thebes. Plato’s Phaedo anchors his activity before 399 BCE, while most other biography is late and uncertain.',
    contributionSummary: 'Developed a Pythagorean-Presocratic system in which limiters and unlimiteds form knowable things through numerical harmony, and proposed a cosmos centered on fire rather than earth.',
    beginnerExplanation: 'Philolaus argues that indefinite materials or continua become ordered things only when limits and numerical relations fit them together. Harmony is the structured fitting, not merely pleasant sound.',
    influencedByIds: ['pythagoras', 'parmenides'], influencedIds: ['plato'], disagreementIds: [],
    suggestedFirstReading: 'Philolaus fragments 1–7 in Huffman, with authenticity notes and concordances',
    historicalContext: 'Fifth-century southern Italy and Thebes after early Pythagorean political crises, amid Presocratic cosmology, medicine, harmonics, mathematics, and Eleatic challenges.',
    dateDisplay: 'fl. late 5th century BCE; conventional c. 470–c. 385 dates uncertain', dateConfidence: 'low',
    dateNote: 'Plato’s Phaedo places Philolaus in Thebes before 399 BCE. Birth and death years, cities of residence, teachers, and political episodes are later reconstructions.',
    shortBio: 'A major fifth-century Pythagorean-Presocratic author whose surviving core fragments develop limiters, unlimiteds, harmony, number, and cosmic order.',
    extendedBio: ['Philolaus could not have been a direct student of Pythagoras on the conventional chronologies and should not be read as the founder’s transcript.', 'A core of fragments is widely accepted, while other Philolaic texts are disputed or pseudonymous.'],
    centralQuestions: ['How can unlike and indefinite factors form an ordered, knowable thing?', 'Why is number necessary for knowledge?', 'How should cosmic bodies be arranged if earth is not central?'],
    majorIdeasDetailed: [
      {name: 'Limiters and unlimiteds', explanation: 'Plural limiting and unlimited factors are fitted together in everything within the cosmos.', whyItMatters: 'Order arises through structured relation rather than one basic stuff alone.'},
      {name: 'Harmony', explanation: 'Numerical ratio fits unlike factors into a unity, exemplified especially in musical structure.', whyItMatters: 'It connects ontology, explanation, and knowledge.'},
      {name: 'Number and knowledge', explanation: 'Number makes plurality, measure, and relation intelligible; identity between things and numbers remains disputed.', whyItMatters: 'It states a powerful mathematical condition on what can be known.'},
      {name: 'Central-fire cosmos', explanation: 'Earth and other bodies revolve around a central fire, with a counter-earth also reported.', whyItMatters: 'It displaces earth without anticipating heliocentrism.'},
    ],
    keyWorksDetailed: [{title: 'Lost work conventionally called On Nature', summary: 'A prose work represented by a generally accepted core of about eleven fragments plus testimonia; later forgeries circulated under Philolaus’ name.', whyItMatters: 'It supplies the strongest direct textual basis for fifth-century Pythagorean philosophy.'}],
    lifeEvents: [{approximateYear: -430, label: 'Approximate mature activity', description: 'Philolaus likely taught and wrote in the later fifth century; exact sequence is unknown.'}, {year: -399, label: 'Terminus from Plato’s dramatic setting', description: 'Phaedo 61d–e says Simmias and Cebes had heard Philolaus in Thebes before Socrates’ death.'}],
    intellectualDevelopment: ['No secure sequence within the lost book survives.', 'His fragments combine Pythagorean harmonic and numerical concerns with wider Presocratic cosmology.', 'Later pseudonymous works expanded or altered Philolaic doctrine.'],
    influencesReceived: ['Earlier Pythagorean practice and harmonics', 'Anaximander, Parmenides, and fifth-century natural philosophy', 'Contemporary mathematics and Crotoniate medicine'],
    influenceOnLaterThought: ['Plato’s engagement with limit, unlimited, and harmonic structure', 'Aristotle’s account of so-called Pythagoreans', 'Later Pythagorean and histories of non-geocentric cosmology'],
    controversiesOrInterpretiveTensions: ['Authenticity of individual fragments', 'Relation to Aristotle’s unnamed Pythagoreans', 'Whether things are numbers or numerically knowable', 'Function of counter-earth', 'Views of soul and embodiment'],
    commonMisunderstandings: ['Philolaus is not a direct transcript of Pythagoras.', 'The central-fire model is not heliocentric.', 'A DK fragment label does not settle authenticity.', 'Plato’s book-purchase story does not prove plagiarism.'],
    schoolMemberships: ['A major Pythagorean-tradition figure and independent Presocratic author; Plato and some early witnesses do not explicitly label him Pythagorean.'],
    branchContributions: [{branchId: 'ancient-greek', summary: 'Provides unusually direct textual evidence for fifth-century Pythagorean-Presocratic philosophy.'}, {branchId: 'metaphysics', summary: 'Explains ordered beings through limiters, unlimiteds, harmony, and number.'}, {branchId: 'philosophy-of-science', summary: 'Develops mathematical harmonics and a non-geocentric cosmic model.'}, {branchId: 'philosophy-of-mind', summary: 'Differentiates bodily centers and participates in disputed accounts of soul and harmony.'}],
    branchMemberships: [{branchId: 'ancient-greek', status: 'major', note: 'A major fifth-century author whose own philosophical fragments substantially survive.', confidence: 'high'}, {branchId: 'metaphysics', status: 'major', note: 'Limiters, unlimiteds, harmony, and number form a distinctive metaphysical scheme.', confidence: 'high'}, {branchId: 'philosophy-of-science', status: 'precursor', note: 'Harmonics and cosmic ordering use mathematical relations without modern scientific method.', confidence: 'high'}, {branchId: 'philosophy-of-mind', status: 'associated', note: 'Fragments on bodily centers are genuine in influential editions; soul-harmony attribution is disputed.', confidence: 'medium'}],
    beginnerReadingPath: [{title: 'Philolaus', author: 'Carl A. Huffman', year: 2017, type: 'article', difficulty: 'beginner', whyRead: 'Orient fragment authenticity, principles, cosmology, and major disputes before reading technical texts.', sourceUrl: 'https://plato.stanford.edu/archives/spr2017/entries/philolaus/'}],
    advancedReadingPath: [{title: 'Early Greek Philosophy, Volume IV', author: 'André Laks and Glenn W. Most', year: 2016, type: 'primary', difficulty: 'advanced', whyRead: 'Read fragments and testimonia in a current critical collection with edition-dependent numbering visible.', sourceUrl: 'https://www.hup.harvard.edu/books/9780674996922'}, {title: 'Philolaus of Croton: Pythagorean and Presocratic', author: 'Carl A. Huffman', year: 1993, type: 'book', difficulty: 'advanced', whyRead: 'Study the Greek text, translation, authenticity arguments, and full commentary.', sourceUrl: 'https://www.cambridge.org/core/books/philolaus-of-croton/33B926B5D0D763DFD0F26AAB1DF77963'}, {title: 'Phaedo 61d–62c', author: 'Plato', approximateYear: -380, type: 'dialogue', difficulty: 'intermediate', whyRead: 'Separate Plato’s explicit Philolaus reference from Socrates’ ensuing argument.', sourceUrl: 'https://scaife-reader.perseus.tufts.edu/reader/urn%3Acts%3AgreekLit%3Atlg0059.tlg004.perseus-eng2%3A61/'}],
  },
  reviewNotePath: 'docs/editorial/reviews/philolaus.md', reviewLock: 'fnv1a64:bc282ae84f573722',
};

const configs: Partial<Record<Philosopher['id'], ModernClusterEditorialConfig>> = {
  thales: thalesConfig,
  anaximander: anaximanderConfig,
  anaximenes: anaximenesConfig,
  pythagoras: pythagorasConfig,
  philolaus: philolausConfig,
};

export const applyEarlyGreekMilesianPythagoreanEditorial = (record: Philosopher): Philosopher =>
  applyModernClusterEditorialConfig(record, configs[record.id]);
