import type {
  ArticleSection,
  Branch,
  CitationLocatorKind,
  CitationReference,
  EditorialSource,
} from '../../types/philosophy';
import {citation as cite, paragraph as p, structuredClaim as claim} from './pilotHelpers';

/*
 * Final isolated branch-article review material. Sol alone owns registration in
 * branches.ts, shared review notes, literal lock computation, Museum-copy
 * reconciliation, and release integration. These locks are deliberately not
 * review artifacts: replace them only after this overlay is registered and the
 * integrated claim snapshot has been generated.
 */
const reviewedOn = '2026-08-10';
const reviewLocks: Record<string, string> = {
  'indian-philosophy': 'fnv1a64:8fc473b6667e909b',
  'buddhist-philosophy': 'fnv1a64:f2495c0bdc6b50e3',
  rationalism: 'fnv1a64:e7d944b8a514c111',
  empiricism: 'fnv1a64:1a050bd1282cdcd7',
  'german-idealism': 'fnv1a64:89b46fe0dec01330',
};

const c = (sourceId: string, kind: CitationLocatorKind, value: string, note?: string): CitationReference =>
  cite(sourceId, kind, value, note);
const source = (entry: Omit<EditorialSource, 'accessedOn'>): EditorialSource => ({...entry, accessedOn: reviewedOn});
const sep = (id: string, authors: string[], title: string, url: string, note: string, year?: number, edition?: string): EditorialSource => source({
  id, type: 'scholarly-reference', authors, title, url, note,
  containerTitle: 'The Stanford Encyclopedia of Philosophy',
  editors: ['Edward N. Zalta', 'Uri Nodelman'],
  publisher: 'Metaphysics Research Lab, Stanford University',
  ...(year ? {year} : {}), ...(edition ? {edition} : {}),
});
const iep = (id: string, authors: string[], title: string, url: string, note: string): EditorialSource => source({
  id, type: 'scholarly-reference', authors, title, url, note,
  containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin',
});
const primary = (id: string, authors: string[], title: string, url: string, note: string, year?: number): EditorialSource => source({
  id, type: 'primary-text', authors, title, url, note, ...(year ? {year} : {}),
});
const book = (id: string, authors: string[], title: string, publisher: string, year: number, url: string, note: string): EditorialSource => source({
  id, type: 'scholarly-book', authors, title, publisher, year, url, note,
});
const all = (...items: CitationReference[]) => items;
const serialize = (value: unknown): string => typeof value === 'string' ? value : JSON.stringify(value) ?? 'null';

type ArticleEdits = Record<string, Record<number, string>>;
type ClaimKey =
  | 'classification' | 'chronology' | 'definition' | 'purpose' | 'central-questions' | 'significance'
  | 'origin-story' | 'history' | 'concepts' | 'relationships' | 'figures' | 'works' | 'debates'
  | 'misunderstandings' | 'relevance' | 'readings';
type ClaimEvidence = Record<ClaimKey, CitationReference[]>;
type Profile = {
  sources: EditorialSource[];
  citations: (sectionId: string) => CitationReference[];
  patch: Omit<Partial<Branch>, 'id' | 'articleSections' | 'editorial'>;
  edits?: ArticleEdits;
  reviewNotePath: string;
};

const indianSources: EditorialSource[] = [
  sep('ind-epistemology-sep', ['Stephen H. Phillips', 'Anand Jayprakash Vaidya'], 'Epistemology in Classical Indian Philosophy', 'https://plato.stanford.edu/entries/epistemology-india/', 'Specialist guide to pramāṇa debates, perception, inference, testimony, error, and the differences among classical South Asian schools.', 2026, 'Summer 2026'),
  sep('ind-language-sep', ['Madhav M. Deshpande'], 'Language and Testimony in Classical Indian Philosophy', 'https://plato.stanford.edu/entries/language-india/', 'Specialist guide to grammar, sentence meaning, testimony, Mīmāṃsā, Nyāya, Buddhist critique, and historical chronology; it is used to avoid treating Indian argument as one “spiritual” method.', 2022, 'Summer 2022'),
  iep('ind-hindu-iep', ['Shyam Ranganathan'], 'Hindu Philosophy', 'https://iep.utm.edu/hindu-ph/', 'Independent overview used cautiously for the plurality of Veda-connected traditions and the limits of treating “Hindu philosophy” as one doctrine.'),
  book('ind-ganeri', ['Jonardon Ganeri'], 'Philosophy in Classical India: The Proper Work of Reason', 'Routledge', 2001, 'https://www.routledge.com/Philosophy-in-Classical-India-The-Proper-Work-of-Reason/Ganeri/p/book/9780415224052', 'Specialist monograph for methods, debate, schools, and the need to read classical Indian philosophy as argument in historical institutions rather than as a timeless essence.'),
  primary('ind-upanishads', ['Various authors; translated by Patrick Olivelle'], 'The Early Upaniṣads: Annotated Text and Translation', 'https://global.oup.com/academic/product/the-early-upanisads-9780195124354', 'Primary-text translation cited as a layered archive of diverse teachings, not as a single Vedānta creed.', 1998),
  primary('ind-nyaya', ['Gautama (traditional attribution); translated by Ganganatha Jha'], 'Nyāya Sūtras of Gautama', 'https://archive.org/details/nyayasutrasofgautama00gautuoft', 'Primary source for the received Nyāya framework of cognition and debate; its received form and traditional attribution are not treated as a secure modern biography.', 1939),
];

const buddhistSources: EditorialSource[] = [
  sep('bud-buddha-sep', ['Mark Siderits'], 'Buddha', 'https://plato.stanford.edu/entries/buddha/', 'Specialist source for the historical Buddha, the Nikāya/Āgama record, textual transmission cautions, no-self, karma, and philosophical interpretation.', 2026, 'Summer 2026'),
  sep('bud-mind-sep', ['Christian Coseru'], 'Mind in Indian Buddhist Philosophy', 'https://plato.stanford.edu/entries/mind-indian-buddhism/', 'Specialist guide to aggregates, no-self, Abhidharma, Yogācāra, mind-stream accounts, perception, and continuing interpretive disagreement.', 2012),
  iep('bud-madhyamaka-iep', ['Internet Encyclopedia of Philosophy'], 'Madhyamaka Buddhist Philosophy', 'https://iep.utm.edu/madhyamaka-buddhist-philosophy/', 'Independent specialist overview for Nāgārjuna, emptiness, two truths, Indian commentarial diversity, and the distinct Tibetan and East Asian receptions.'),
  book('bud-harvey', ['Peter Harvey'], 'An Introduction to Buddhism: Teachings, History and Practices', 'Cambridge University Press', 2013, 'https://www.cambridge.org/highereducation/books/an-introduction-to-buddhism/9CA7B749D45ABAAB372422AEEE863A97', 'Historical and doctrinal introduction used to cross-check regional, institutional, ethical, ritual, and modern transformations without making one school representative of all Buddhism.'),
  primary('bud-suttacentral', ['Traditionally attributed to the Buddha'], 'Early Buddhist Discourses (Nikāyas and Āgamas)', 'https://suttacentral.net/', 'Primary-text collection cited by discourse; translations are witnesses to transmitted canons, not stenographic records of a securely recoverable voice.'),
  primary('bud-nagarjuna', ['Nāgārjuna (traditional attribution)'], 'Root Verses on the Middle Way', 'https://read.84000.co/translation/toh3824.html', 'Primary Madhyamaka source cited by chapter with the warning that translation, commentary, authorship, and school reception remain part of interpretation.'),
];

const rationalismSources: EditorialSource[] = [
  sep('rat-markie-sep', ['Peter Markie'], 'Rationalism vs. Empiricism', 'https://plato.stanford.edu/archives/spr2006/entries/rationalism-empiricism/', 'Foundational specialist analysis of subject-relative rationalist and empiricist theses and the risks of the familiar early-modern triads.', 2006, 'Spring 2006 archive'),
  sep('rat-innate-sep', ['Paul E. Griffiths', 'Stefan Linquist'], 'The Distinction Between Innate and Acquired Characteristics', 'https://plato.stanford.edu/entries/innate-acquired/', 'Specialist source used to separate early-modern innateness from later biological and cognitive-scientific hypotheses.', 2022, 'Summer 2022 archive'),
  book('rat-cambridge', ['Daniel Garber', 'Michael Ayers'], 'The Cambridge History of Seventeenth-Century Philosophy', 'Cambridge University Press', 1998, 'https://search.worldcat.org/title/40445614', 'Two-volume specialist history used to check the institutional, scientific, theological, and political contexts that the later rationalist label can hide.'),
  primary('rat-descartes', ['René Descartes'], 'Meditations on First Philosophy', 'https://hackettpublishing.com/meditations-on-first-philosophy', 'Primary work cited by meditation for doubt, cogito, clear and distinct perception, God, mind–body distinction, and the limits of Cartesian certainty.', 1641),
  primary('rat-spinoza', ['Baruch Spinoza'], 'Ethics', 'https://www.gutenberg.org/ebooks/3800', 'Primary work cited by part and proposition for substance, attributes, adequate ideas, affects, necessity, and freedom; geometrical form is not treated as a proof by typography.', 1677),
  primary('rat-leibniz', ['G. W. Leibniz'], 'New Essays on Human Understanding and Monadology', 'https://www.gutenberg.org/ebooks/17147', 'Primary sources cited by book/chapter or numbered section for dispositions, experience, necessity, sufficient reason, monads, contingency, and freedom.', 1765),
];

const empiricismSources: EditorialSource[] = [
  sep('emp-ancient-sep', ['Gregory W. Dawes'], 'Ancient and Medieval Empiricism', 'https://plato.stanford.edu/entries/empiricism-ancient-medieval/', 'Specialist history for the plurality of explanatory, genetic, and justificatory empiricisms, late-medieval antecedents, and warnings against a perennial school.', 2023),
  sep('emp-markie-sep', ['Peter Markie'], 'Rationalism vs. Empiricism', 'https://plato.stanford.edu/archives/spr2006/entries/rationalism-empiricism/', 'Specialist source for the domain-relative theses and the historiographic caution surrounding the classic early-modern opposition.', 2006, 'Spring 2006 archive'),
  book('emp-van-fraassen', ['Bas C. van Fraassen'], 'The Empirical Stance', 'Yale University Press', 2002, 'https://yalebooks.yale.edu/book/9780300093129/the-empirical-stance/', 'Specialist philosophical account of empiricism as a stance, used to avoid identifying all empiricism with one theory of ideas, verification, or science.'),
  primary('emp-bacon', ['Francis Bacon'], 'Novum Organum', 'https://www.gutenberg.org/ebooks/45988', 'Primary work cited by book and aphorism for idols, instances, induction, and experiment; it does not authorize a fantasy of theory-free fact collection.', 1620),
  primary('emp-locke', ['John Locke'], 'An Essay Concerning Human Understanding', 'https://www.gutenberg.org/ebooks/10615', 'Primary work cited by book/chapter for ideas, sensation, reflection, innateness, knowledge, probability, and the limits of assent.', 1690),
  primary('emp-hume', ['David Hume'], 'An Enquiry Concerning Human Understanding', 'https://www.gutenberg.org/ebooks/9662', 'Primary work cited by section for impressions, ideas, causation, induction, probability, testimony, miracles, and mitigated skepticism.', 1748),
];

const idealismSources: EditorialSource[] = [
  iep('ide-german-iep', ['Internet Encyclopedia of Philosophy'], 'German Idealism', 'https://iep.utm.edu/germidea/', 'Specialist overview for the 1780s–1840s movement label, Kant’s different critical position, the rival systems of Fichte, Schelling, and Hegel, and their reception.'),
  sep('ide-idealism-sep', ['Paul Guyer', 'Rolf-Peter Horstmann'], 'Idealism', 'https://plato.stanford.edu/entries/idealism/', 'Specialist source for the difference between epistemological and metaphysical idealism and the distinctive character of German idealist projects.', 2026, 'Summer 2026'),
  book('ide-beiser', ['Frederick C. Beiser'], 'German Idealism: The Struggle against Subjectivism, 1781–1801', 'Harvard University Press', 2002, 'https://www.hup.harvard.edu/books/9780674007691', 'Specialist history used to test the movement’s contingent formation, post-Kantian disagreements, nature, subjectivity, and the limits of a four-man succession story.'),
  primary('ide-kant', ['Immanuel Kant'], 'Critique of Pure Reason', 'https://www.gutenberg.org/ebooks/4280', 'Primary source cited by A/B pagination for transcendental idealism, possible experience, appearances, limits, and the critical problems that later thinkers inherit and contest.', 1781),
  primary('ide-fichte', ['Johann Gottlieb Fichte'], 'Introductions to the Wissenschaftslehre', 'https://www.marxists.org/reference/archive/fichte/works/science-knowledge.htm', 'Primary texts cited by introduction for self-activity, philosophy’s starting point, finite agency, and the repeatedly revised Wissenschaftslehre.', 1797),
  primary('ide-hegel', ['G. W. F. Hegel'], 'Phenomenology of Spirit and Elements of the Philosophy of Right', 'https://www.marxists.org/reference/archive/hegel/', 'Primary works cited by preface, chapter, or paragraph for consciousness, recognition, ethical life, institutions, actuality, and freedom; neither is collapsed into a three-step formula.', 1807),
];

const profiles: Record<string, Profile> = {
  'indian-philosophy': {
    sources: indianSources,
    citations: (section) => {
      if (section === 'language-and-reasoning') return all(c('ind-language-sep', 'section', '§§1–6'), c('ind-nyaya', 'standard-division', 'Books 1–5'), c('ind-ganeri', 'chapter', 'chapters 3–5'));
      if (section === 'methods-and-concepts') return all(c('ind-epistemology-sep', 'section', '§§1–6'), c('ind-language-sep', 'section', '§§3–6'));
      if (section === 'historical-development' || section === 'figures-and-texts') return all(c('ind-ganeri', 'chapter', 'chapters 1–5'), c('ind-hindu-iep', 'section', 'Introduction; Classical Hindu Philosophy in the Context of Indian Philosophy'), c('ind-upanishads', 'work', 'Introduction and selected texts'));
      if (section === 'self-and-reality' || section === 'internal-debates') return all(c('ind-ganeri', 'chapter', 'chapters 2–6'), c('ind-epistemology-sep', 'section', '§§1–6'), c('ind-hindu-iep', 'section', 'Nyāya, Vaiśeṣika, Sāṅkhya, Yoga, Mīmāṃsā, and Vedānta'));
      if (section === 'modern-relevance' || section === 'misunderstandings') return all(c('ind-ganeri', 'work', 'Complete monograph'), c('ind-hindu-iep', 'section', 'Introduction; Neo-Hinduism'), c('ind-language-sep', 'section', 'Introduction and chronology supplement'));
      return all(c('ind-ganeri', 'work', 'Complete monograph'), c('ind-epistemology-sep', 'section', '§§1–6'), c('ind-hindu-iep', 'section', 'Introduction'));
    },
    patch: {
      category: 'Retrospective South Asian umbrella',
      shortDefinition: 'A retrospective umbrella for multilingual philosophical traditions produced in and across South Asia—including Brahmanical, Buddhist, Jain, materialist, skeptical, devotional, and scholastic debates—rather than one religion, school, or national essence.',
      oneSentencePurpose: 'Maps shared arguments about knowledge, language, action, selfhood, reality, authority, and liberation while keeping rival methods, institutions, and practical goals visible.',
      beginnerExplanation: '“Indian philosophy” is a map label, not one teaching. It groups traditions that argued intensely about what is real, how knowledge works, whether there is a self, how action matters, and what release from suffering or bondage could mean.',
      coreQuestions: ['What makes cognition reliable, and which sources of knowledge can warrant it?', 'How do rival accounts of persons, causation, language, action, and reality shape ethical and liberative practice?', 'How should a retrospective umbrella preserve disagreement among South Asian traditions rather than substitute one slogan for them?'],
      whyItMatters: 'The field contains sustained arguments in epistemology, logic, language, metaphysics, ethics, political thought, and philosophy of practice, while showing why a shared region or textual archive does not amount to a single worldview.',
      originPeriod: 'Layered Vedic, śramaṇa, and other South Asian intellectual histories; roughly the first millennium BCE onward, with no single founding event',
      roughStartYear: -800,
      originStory: 'The Atlas uses a broad early South Asian horizon, not a founding date, for a field made through layered Vedic and Upaniṣadic materials, śramaṇa movements, debate, commentary, court, monastic, temple, household, and later vernacular and transregional institutions. “Indian philosophy” is a modern organizing label whose usefulness depends on preserving those changing and conflicting lineages.',
      historicalDevelopment: ['Vedic and Upaniṣadic materials develop ritual, cosmological, linguistic, ethical, and self-oriented questions across multiple voices and centuries.', 'Buddhist, Jain, Brahmanical, materialist, skeptical, and other teachers dispute karma, selfhood, authority, discipline, and liberation in first-millennium BCE and later South Asian settings.', 'Nyāya, Vaiśeṣika, Sāṃkhya, Yoga, Mīmāṃsā, Vedānta, Buddhist, Jain, grammatical, and other traditions develop through layered texts, commentary, and interschool debate; the familiar “six schools” is a later organizing schema, not six synchronized institutions.', 'Vernacular, devotional, Islamic, colonial, reform, anticolonial, diasporic, and academic settings repeatedly reshape the field and its modern classifications.'],
      commonMisunderstandings: ['Indian philosophy is an umbrella for competing traditions, not a doctrine with one founder, language, scripture, or spiritual message.', 'Not all South Asian philosophy is Veda-connected, not all Veda-connected philosophy is Vedānta, and Vedānta is not identical with Advaita.', 'Āstika and nāstika have context-specific classificatory uses, often concerning Vedic authority; they do not map neatly onto theism, atheism, orthodoxy, or ethical worth.', 'Mokṣa, nirvāṇa, and kaivalya are not interchangeable names for one universal experience.'],
    },
    edits: {
      'historical-development': {1: 'The best-known classical schools were not born fully formed at one date, and the later “six-system” arrangement should not be mistaken for a census of six fixed institutions. Nyāya, Vaiśeṣika, Sāṃkhya, Yoga, Mīmāṃsā, and Vedānta develop through layered texts, commentary, and later systematization; Buddhist and Jain philosophers participate in many of the same argumentative worlds while refusing some Brahmanical authorities. Authors debate perception, inference, testimony, absence, universals, causation, language, and liberation. Work moves through Sanskrit, Pāli, Prakrits, Tamil, Persian, and many vernaculars, as well as devotional movements, Islamic intellectual cultures, colonial education, reform, and anticolonial politics. Modern labels such as “Hinduism” and “Indian philosophy” can orient a visitor, but they remain retrospective classifications and must not erase regional, sectarian, linguistic, and institutional change.'},
      'figures-and-texts': {0: 'No short list can stand for the whole field, but representative texts make arguments visible. The Upaniṣads and Bhagavad Gītā become major archives for Vedānta and other Veda-connected reflection, while the Brahma Sūtra generates competing commentarial traditions. The received Nyāya Sūtra organizes inquiry, inference, debate, and sources of knowledge. The Vaiśeṣika Sūtra, traditionally associated with Kaṇāda, develops categories and a realist natural philosophy. The Yoga Sūtra/Pātañjalayogaśāstra systematizes disciplined attention within a Sāṃkhya-related framework, though its composition, commentary, date, and author figure require care. These works are layered and historically difficult to date; attached names do not always identify a secure modern-style single author.'},
    },
    reviewNotePath: 'docs/editorial/reviews/indian-philosophy.md',
  },
  'buddhist-philosophy': {
    sources: buddhistSources,
    citations: (section) => {
      if (section === 'overview' || section === 'development') return all(c('bud-buddha-sep', 'section', '§§1–5'), c('bud-harvey', 'chapter', 'chapters 1–4; 8–12'), c('bud-suttacentral', 'work', 'Nikāya and Āgama collections'));
      if (section === 'concepts' || section === 'mind-knowledge') return all(c('bud-mind-sep', 'section', '§§1–7'), c('bud-buddha-sep', 'section', '§§2–5'), c('bud-suttacentral', 'standard-division', 'SN 22; SN 12; MN 38'));
      if (section === 'figures-texts' || section === 'debates') return all(c('bud-madhyamaka-iep', 'section', '§§1–5'), c('bud-mind-sep', 'section', '§§3–7'), c('bud-nagarjuna', 'chapter', 'chapters 1, 18, and 24'));
      if (section === 'ethics') return all(c('bud-harvey', 'chapter', 'chapters 4–6'), c('bud-buddha-sep', 'section', '§§2–4'), c('bud-suttacentral', 'standard-division', 'DN 31; MN 21; SN 56.11'));
      if (section === 'neighbors' || section === 'misunderstandings' || section === 'relevance-reading') return all(c('bud-harvey', 'chapter', 'chapters 8–16'), c('bud-madhyamaka-iep', 'section', '§§4–7'), c('bud-buddha-sep', 'section', '§§1–5'));
      return all(c('bud-harvey', 'work', 'Complete introduction'), c('bud-buddha-sep', 'section', '§§1–5'), c('bud-mind-sep', 'section', '§§1–7'));
    },
    patch: {
      category: 'Plural transregional philosophical tradition',
      shortDefinition: 'A transregional family of Buddhist philosophical traditions that develops teachings attributed to the Buddha through contested canons, monastic and lay institutions, commentary, debate, translation, ritual, meditation, and ethical practice.',
      oneSentencePurpose: 'Explains how suffering, impermanence, no-self, dependence, ethical discipline, compassion, liberation, language, logic, and cognition become differently argued across Buddhist traditions.',
      beginnerExplanation: 'Buddhist philosophy is not one meditation technique or one claim that nothing is real. Its traditions ask how changing and conditioned lives suffer, how mistaken ways of grasping persons and things intensify that suffering, and how conduct, attention, argument, and insight might transform it.',
      coreQuestions: ['How do suffering, craving, ignorance, action, and conditioned arising relate?', 'What does no-self deny, and how can responsibility, memory, continuity, and liberation still be understood?', 'How do different Buddhist traditions assess scripture, reasoning, meditation, ritual, compassion, and institutional authority?'],
      whyItMatters: 'Buddhist philosophy joins exacting arguments about persons, causation, perception, language, truth, ethics, and liberation to living practices and institutions, while making a single serene or purely rational “Buddhism” historically indefensible.',
      originPeriod: 'Teachings attributed to the historical Buddha (fl. c. 450 BCE) and later Buddhist communities; textual and institutional histories remain layered',
      roughStartYear: -450,
      originStory: 'Buddhist philosophy grows from communities that preserve, interpret, contest, and extend teachings attributed to the Buddha. The earliest available Nikāya and Āgama collections have long oral, sectarian, and textual histories; later Abhidharma, Mahāyāna, Madhyamaka, Yogācāra, epistemological, tantric, and regional traditions form no single linear system.',
      historicalDevelopment: ['Early Buddhist collections organize paths around suffering, ethical formation, attention, impermanence, no-self, dependent arising, and liberation, while their textual transmission remains historically layered.', 'Abhidharma traditions develop detailed analyses of factors, causation, persons, and what exists; they disagree with one another and become targets of later Buddhist critique.', 'Mahāyāna scriptures, bodhisattva ideals, Madhyamaka, Yogācāra, pramāṇa traditions, tantra, and regional schools develop through multiple overlapping movements rather than one uniform successor church.', 'Translation, pilgrimage, trade, monasteries, courts, lay communities, ritual, print, colonialism, reform, migration, and global Buddhist modernisms transform arguments across South, Central, East, and Southeast Asia and beyond.'],
      commonMisunderstandings: ['Buddhist philosophy is not only mindfulness, meditation, or stress reduction; ethics, ritual, law, metaphysics, epistemology, logic, narrative, and institutional disagreement matter.', 'No-self rejects particular reifications of a permanent independent self; it does not erase conventional persons, suffering, responsibility, or the need to explain continuity.', 'Emptiness is neither nihilism nor a hidden substance, and Madhyamaka vocabulary is not the only Buddhist conceptual framework.', 'Buddhist traditions are not uniformly pacifist, secular, anti-rational, or opposed to all desire.'],
    },
    edits: {
      development: {0: 'The earliest recoverable teachings survive in several collections transmitted after the Buddha’s death. They organize inquiry around suffering, the path, dependent arising, impermanence, and analysis of persons into changing processes. Because extant canons were compiled through long oral, communal, and sectarian histories, traditional attribution is not equivalent to modern documentary dating. Early communities developed disciplinary and doctrinal differences. Abhidharma traditions later classified phenomena and debated what exists, persists, or functions. Mahāyāna scriptures and bodhisattva ideals emerged through multiple movements and textual lineages rather than a single institution that simply replaced earlier Buddhism. This does not make their philosophical questions secondary; it makes canon, authority, and reception themselves part of the history.'},
      'figures-texts': {0: 'The Buddha is the foundational teacher represented by early discourses, not a securely dated author of modern transcripts. Those materials present arguments, similes, ethical instruction, and practical tests concerning causation, identity, conduct, knowledge, and liberation, but their transmission and relation to later interpretation remain contested. Nāgārjuna’s Root Verses analyzes causation, motion, self, time, and nirvāṇa; calling it nihilism ignores its arguments connecting emptiness and dependent arising. Vasubandhu’s Abhidharmakośabhāṣya maps and criticizes Abhidharma, while the Twenty Verses develops Yogācāra-associated arguments about experience and representation without fitting neatly into a modern “idealism” label.'},
    },
    reviewNotePath: 'docs/editorial/reviews/buddhist-philosophy.md',
  },
  rationalism: {
    sources: rationalismSources,
    citations: (section) => {
      if (['category', 'historiography', 'family', 'empiricism', 'misunderstandings', 'disputes', 'beginner', 'reading-path'].includes(section)) return all(c('rat-markie-sep', 'section', '§§1–4'), c('rat-cambridge', 'chapter', 'Introduction and early-modern context chapters'));
      if (section === 'descartes') return all(c('rat-descartes', 'standard-division', 'Meditations I–VI'), c('rat-markie-sep', 'section', '§§2–4'));
      if (section === 'spinoza') return all(c('rat-spinoza', 'standard-division', 'Parts I–V'), c('rat-cambridge', 'chapter', 'Spinoza chapters'));
      if (section === 'leibniz' || section === 'necessity') return all(c('rat-leibniz', 'book-chapter', 'New Essays, Preface and Books I–IV; Monadology §§1–90'), c('rat-markie-sep', 'section', '§§2–4'));
      if (section === 'innateness' || section === 'contemporary') return all(c('rat-innate-sep', 'section', '§§1–4'), c('rat-leibniz', 'book-chapter', 'New Essays, Preface and Book I'), c('rat-markie-sep', 'section', '§3'));
      if (['contexts', 'expanded-canon', 'experience', 'kant', 'later', 'politics-ethics'].includes(section)) return all(c('rat-cambridge', 'chapter', 'Relevant seventeenth-century context chapters'), c('rat-markie-sep', 'section', '§§1–4'));
      if (['mathematics', 'metaphysics', 'science-ai'].includes(section)) return all(c('rat-descartes', 'work', 'Complete work'), c('rat-spinoza', 'work', 'Complete work'), c('rat-leibniz', 'work', 'New Essays and Monadology'));
      return all(c('rat-markie-sep', 'section', '§§1–4'), c('rat-cambridge', 'work', 'Complete collection'));
    },
    patch: {
      category: 'Retrospective early-modern knowledge family',
      shortDefinition: 'A contested retrospective label for arguments about a priori warrant, innateness, necessity, explanation, and the intelligibility of reality; it neither names a self-declared seventeenth-century party nor rejects experience.',
      oneSentencePurpose: 'Separates questions about intuition, deduction, innate structure, necessity, mathematics, metaphysical explanation, and empirical inquiry instead of treating “reason” as one faculty opposed to all experience.',
      beginnerExplanation: 'Rationalism is not the claim that you can learn everything by thinking in an armchair. It is a later name for stronger arguments that some concepts, principles, or kinds of knowledge cannot be supplied by particular sensory encounters alone.',
      whyItMatters: 'The category helps reveal continuing disagreements about a priori knowledge, cognitive structure, mathematical necessity, explanation, and the role of experience, provided its retrospective textbook triads do not replace the real differences among the philosophers.',
      originPeriod: 'Seventeenth-century European debates; “rationalism” becomes a standard retrospective teaching category later',
      roughStartYear: 1641,
      originStory: 'The Atlas uses “rationalism” as an explicit later organizing label for some seventeenth-century and later arguments, not as a period party founded in 1640. Descartes, Spinoza, Leibniz, Conway, Cavendish, Amo, Elisabeth, Du Châtelet, and others work through overlapping but often incompatible metaphysical, theological, scientific, and political problems.',
      historicalDevelopment: ['Seventeenth-century philosophers rework scholastic, mathematical, theological, mechanical, medical, and experimental inheritances while disagreeing about mind, nature, God, causation, freedom, and certainty.', 'Later historians stabilize the “continental rationalist” triad and oppose it to a “British empiricist” triad; the device illuminates some epistemic arguments but can turn geography into doctrine and erase networks, genres, and disagreement.', 'Kant transforms questions about experience and a priori knowledge; post-Kantian idealisms, mathematical logic, critical rationalism, cognitive science, and contemporary epistemology preserve selected problems without one continuous rationalist doctrine.'],
      commonMisunderstandings: ['Rationalism is not a self-declared continental party, a natural kind, or a rejection of observation, experiment, testimony, and the contingent facts experience supplies.', 'A priori knowledge, innateness, intellectual intuition, deductive form, sufficient reason, and metaphysical necessity are distinct commitments that can come apart.', 'Descartes, Spinoza, and Leibniz do not share one theory of substance, God, mind, freedom, causation, or method.', 'Modern nativist or cognitive-scientific hypotheses are not simply Cartesian innate ideas in new vocabulary.'],
    },
    reviewNotePath: 'docs/editorial/reviews/rationalism.md',
  },
  empiricism: {
    sources: empiricismSources,
    citations: (section) => {
      if (['category', 'historiography', 'ancient-medieval', 'rationalism', 'misunderstandings', 'live-disputes', 'reading-path'].includes(section)) return all(c('emp-ancient-sep', 'section', '§§1–5'), c('emp-markie-sep', 'section', '§§1–4'), c('emp-van-fraassen', 'chapter', 'chapters 1–3'));
      if (section === 'bacon' || section === 'scientific-practice') return all(c('emp-bacon', 'standard-division', 'Book I, aphorisms 1–130; Book II, selected aphorisms'), c('emp-ancient-sep', 'section', '§§2–5'));
      if (section === 'locke') return all(c('emp-locke', 'book-chapter', 'Books I–IV'), c('emp-markie-sep', 'section', '§§1–4'));
      if (section === 'hume' || section === 'objections') return all(c('emp-hume', 'section', '§§2–12'), c('emp-ancient-sep', 'section', '§§1–2'));
      if (['berkeley', 'kant', 'nineteenth-century', 'logical-empiricism', 'quine-naturalism'].includes(section)) return all(c('emp-markie-sep', 'section', '§§1–4'), c('emp-van-fraassen', 'chapter', 'chapters 1–5'));
      if (['perception-concepts', 'measurement-models', 'social-evidence', 'modern-practice'].includes(section)) return all(c('emp-van-fraassen', 'chapter', 'chapters 4–8'), c('emp-ancient-sep', 'section', '§§1–2'));
      if (section === 'non-european') return all(c('emp-ancient-sep', 'section', '§§1–2'), c('emp-markie-sep', 'section', '§§1–4'));
      return all(c('emp-ancient-sep', 'section', '§§1–5'), c('emp-van-fraassen', 'work', 'Complete monograph'));
    },
    patch: {
      category: 'Retrospective epistemic and methodological family',
      shortDefinition: 'A varied family of genetic, justificatory, explanatory, and methodological positions that make claims answerable to experience, observation, experiment, evidence, and correction; it is not one sensory doctrine or the opposite of all reasoning.',
      oneSentencePurpose: 'Asks how experience can constrain belief when perception, instruments, models, testimony, concepts, institutions, and values all help make evidence available.',
      beginnerExplanation: 'Empiricism says that claims about the world should remain vulnerable to experience. That does not mean trusting only your own eyes or collecting raw facts without ideas: science and ordinary knowledge rely on instruments, concepts, testimony, comparison, and methods for detecting error.',
      whyItMatters: 'The label keeps attention on how inquiry becomes answerable to a resistant world, while its internal disagreements expose why experience alone cannot name one method, one source of justification, or one politics.',
      originPeriod: 'Ancient and medieval antecedents; influential early-modern and later European uses of “empiricism” are historically varied and partly retrospective',
      roughStartYear: 1620,
      originStory: 'Empiricism has older antecedents and several meanings. The Atlas uses 1620 as a navigation anchor for Bacon’s early-modern experimental reform, not as a founding date for one school. Locke, Berkeley, Hume, Mill, pragmatists, logical empiricists, Quine, and contemporary empiricists develop incompatible accounts of ideas, science, evidence, normativity, and reality.',
      historicalDevelopment: ['Ancient and medieval arguments about perception, medicine, experience, intellect, and demonstration provide antecedents but not a single continuous empiricist school.', 'Bacon, Locke, Berkeley, and Hume develop distinctive early-modern programs involving experiment, ideas, perception, causation, probability, religion, and skepticism; the “British empiricist” sequence is a later teaching device, not one research team.', 'Nineteenth- and twentieth-century positivism, pragmatism, logical empiricism, naturalism, and philosophy of science revise empiricist commitments through logic, language, models, social inquiry, and institutional practice.', 'Contemporary forms include constructive empiricism, experimental philosophy, naturalized epistemology, evidentialism, and empirically informed accounts of mind and science, which disagree about realism, normativity, and a priori knowledge.'],
      commonMisunderstandings: ['Empiricism does not restrict knowledge to private observation or exclude memory, testimony, instruments, models, mathematics, inference, and institutions.', 'It does not entail materialism, atheism, political liberalism, skepticism, positivism, or one “blank slate” thesis.', 'Theory-ladenness does not make evidence arbitrary, and fallibility does not make all claims equally weak.', '“Empiricism” is a changing, domain-sensitive category, not an all-purpose grid for translating non-European epistemologies into British history.'],
    },
    edits: {
      historiography: {0: 'The familiar early-modern story pairs a “British empiricism” of Locke, Berkeley, and Hume against continental rationalists, then lets Kant resolve the conflict. This map catches real arguments about innateness, sensation, causation, and the limits of knowledge, but it is a later historiographic arrangement rather than a contemporary alliance. It can make geography explain doctrine, turn three very different writers into a planned sequence, and obscure their theology, politics, science, and changing relation to skepticism. Empiricism is more responsible as a teaching label when it specifies its target: the origin of ideas, the warrant for factual belief, explanation of knowledge, a scientific method, or an attitude of corrigibility.'},
      'non-european': {0: 'Comparisons with non-European traditions can illuminate questions about perception and evidence, but “empiricism” is a historically changing European category rather than a universal master grid. Classical Indian epistemologies organize debate around pramāṇas—sources or instruments of knowledge such as perception, inference, and testimony—while disagreeing over their number, operation, and authority. Cārvāka/Lokāyata is often described as privileging perception and challenging inferences to unobservables, yet its evidence is fragmentary and frequently transmitted by opponents. It should not be turned into a missing branch of British empiricism. Comparison is strongest when it identifies a restricted shared problem and preserves the aims, taxonomies, and textual conditions of each tradition.'},
    },
    reviewNotePath: 'docs/editorial/reviews/empiricism.md',
  },
  'german-idealism': {
    sources: idealismSources,
    citations: (section) => {
      if (section === 'overview' || section === 'development') return all(c('ide-german-iep', 'section', 'Introduction; Historical Background'), c('ide-kant', 'standard-division', 'A/B Prefaces; Transcendental Aesthetic and Analytic'), c('ide-beiser', 'chapter', 'Introduction and chapters 1–4'));
      if (section === 'concepts' || section === 'debates') return all(c('ide-idealism-sep', 'section', '§§1–6'), c('ide-german-iep', 'section', 'Logic; Metaphysics and Epistemology; Moral and Political Philosophy'), c('ide-fichte', 'work', 'Introductions to the Wissenschaftslehre'));
      if (section === 'figures-works') return all(c('ide-kant', 'standard-division', 'A/B Prefaces; Transcendental Aesthetic and Analytic'), c('ide-fichte', 'work', 'Introductions to the Wissenschaftslehre'), c('ide-hegel', 'book-chapter', 'Phenomenology, Preface and Introduction; Philosophy of Right, Preface and §§1–33'));
      if (section === 'neighbors' || section === 'misconceptions' || section === 'modern-relevance' || section === 'reading-path') return all(c('ide-german-iep', 'section', 'Reception and Influence'), c('ide-idealism-sep', 'section', '§§5–8'), c('ide-beiser', 'work', 'Complete monograph'));
      return all(c('ide-german-iep', 'section', 'Complete entry'), c('ide-idealism-sep', 'section', '§§1–8'), c('ide-beiser', 'work', 'Complete monograph'));
    },
    patch: {
      category: 'Retrospective movement of post-Kantian systems',
      shortDefinition: 'A retrospective movement label for rival late eighteenth- and early nineteenth-century German projects that inherit Kant’s critical problems and attempt new accounts of objectivity, self-activity, nature, freedom, history, art, and systematic reason.',
      oneSentencePurpose: 'Shows why Kant’s limits on knowledge and divisions between receptivity and spontaneity, nature and freedom, appearance and thing in itself provoked incompatible post-Kantian attempts at systematic reconstruction.',
      beginnerExplanation: 'German Idealism does not say an individual mind invents the world. Its thinkers ask how an objective world can be knowable only through finite human capacities, how freedom belongs within nature and history, and whether those divisions need a deeper explanation.',
      coreQuestions: ['How can finite knowers be answerable to an objective world while knowing it through conceptual, practical, and social capacities?', 'Are Kant’s distinctions between appearances and things in themselves, nature and freedom, or receptivity and spontaneity stable limits or problems needing reconstruction?', 'How can reason, recognition, institutions, art, nature, contingency, evil, and freedom belong to a system without being reduced to one another?'],
      whyItMatters: 'The movement shaped debates about objectivity, agency, recognition, nature, history, art, political freedom, critique, and systematic philosophy, while its exclusions and totalizing ambitions remain targets of essential criticism.',
      originPeriod: 'Kant’s critical philosophy and post-Kantian formations from the 1780s into the 1840s; the roster and boundaries remain historiographically contested',
      roughStartYear: 1781,
      originStory: 'The Atlas keeps 1781 as a navigation anchor for Kant’s first Critique, not as the date a finished “German Idealism” began. Kant is the critical source whose restrictions on speculative knowledge motivate post-Kantian disagreement; Fichte, Schelling, Hegel, Reinhold, Hölderlin, Jacobi, and others form overlapping and often rival projects, while later critics and receptions help stabilize the movement label.',
      historicalDevelopment: ['Kant’s three Critiques recast experience, a priori knowledge, freedom, judgment, nature, and teleology while preserving critical limits that successors variously defend, revise, or reject.', 'Fichte, Schelling, and Hegel produce changing and rival post-Kantian systems concerning self-activity, nature, art, history, logic, social life, and freedom; they are not successive drafts of one doctrine.', 'Romantic, religious, materialist, existential, neo-Kantian, phenomenological, pragmatist, analytic, and critical receptions transform or oppose selected idealist problems.', 'The later decline of the movement has multiple causes—including changing sciences, historical methods, institutions, and new philosophical programs—and is not adequately explained as one thinker finally refuting another.'],
      commonMisunderstandings: ['German Idealism does not claim that a private mind invents physical reality, and it is not Berkeleyan immaterialism in German dress.', 'Kant is the critical source and contested precursor, not simply a system-builder interchangeable with Fichte, Schelling, and Hegel.', 'Hegelian dialectic is not a universal thesis–antithesis–synthesis machine, and “the rational is actual” does not make every existing institution morally good.', 'The movement is a retrospective family of rival projects whose canonical roster, exclusions, and endpoint remain historically contestable.'],
    },
    edits: {
      development: {2: 'Hegel’s Phenomenology of Spirit of 1807 follows forms of consciousness through tensions that expose more adequate standards of knowledge and freedom. His later Science of Logic, Encyclopedia, and Philosophy of Right present a systematic architecture of logic, nature, spirit, and institutions. The movement cannot simply be said to end when Hegel dies: Schopenhauer, Kierkegaard, Marx, neo-Kantians, phenomenologists, pragmatists, critical theorists, and many later readers define projects through selective inheritance and opposition. Its eclipse also reflects changing scientific, historical, institutional, and philosophical methods, not a single decisive refutation. German Idealism is therefore a branching reception history rather than a straight ascent to a final system.'},
      misconceptions: {2: 'Finally, German Idealism is not one continuous system authored by four men. Kant remains a critical precursor whose limits motivate the movement; Fichte’s practical idealisms, Schelling’s changing philosophies of nature and freedom, and Hegel’s historical systematic project cannot be substituted for one another. Reinhold, Jacobi, Hölderlin, women excluded from the canonical institutions, translators, editors, and later interpreters also matter to the history. Teaching its internal sequence is valuable only when it is presented as a contested conversation with later critics rather than an inevitable culmination of modern philosophy.'},
    },
    reviewNotePath: 'docs/editorial/reviews/german-idealism.md',
  },
};

const claimSections: Record<string, Record<ClaimKey, string>> = {
  'indian-philosophy': {classification: 'overview', chronology: 'historical-development', definition: 'overview', purpose: 'overview', 'central-questions': 'methods-and-concepts', significance: 'modern-relevance', 'origin-story': 'historical-development', history: 'historical-development', concepts: 'methods-and-concepts', relationships: 'internal-debates', figures: 'figures-and-texts', works: 'figures-and-texts', debates: 'internal-debates', misunderstandings: 'misunderstandings', relevance: 'modern-relevance', readings: 'reading-path'},
  'buddhist-philosophy': {classification: 'overview', chronology: 'development', definition: 'overview', purpose: 'overview', 'central-questions': 'concepts', significance: 'ethics', 'origin-story': 'development', history: 'development', concepts: 'concepts', relationships: 'neighbors', figures: 'figures-texts', works: 'figures-texts', debates: 'debates', misunderstandings: 'misunderstandings', relevance: 'relevance-reading', readings: 'relevance-reading'},
  rationalism: {classification: 'category', chronology: 'historiography', definition: 'category', purpose: 'family', 'central-questions': 'family', significance: 'disputes', 'origin-story': 'historiography', history: 'contexts', concepts: 'family', relationships: 'empiricism', figures: 'expanded-canon', works: 'descartes', debates: 'disputes', misunderstandings: 'misunderstandings', relevance: 'science-ai', readings: 'reading-path'},
  empiricism: {classification: 'category', chronology: 'historiography', definition: 'category', purpose: 'category', 'central-questions': 'category', significance: 'live-disputes', 'origin-story': 'historiography', history: 'ancient-medieval', concepts: 'perception-concepts', relationships: 'rationalism', figures: 'hume', works: 'reading-path', debates: 'objections', misunderstandings: 'misunderstandings', relevance: 'modern-practice', readings: 'reading-path'},
  'german-idealism': {classification: 'overview', chronology: 'development', definition: 'overview', purpose: 'overview', 'central-questions': 'concepts', significance: 'modern-relevance', 'origin-story': 'development', history: 'development', concepts: 'concepts', relationships: 'neighbors', figures: 'figures-works', works: 'figures-works', debates: 'debates', misunderstandings: 'misconceptions', relevance: 'modern-relevance', readings: 'reading-path'},
};

const reviewedSections = (record: Branch, profile: Profile): ArticleSection[] => (record.articleSections ?? []).map((section) => ({
  ...section,
  paragraphs: section.paragraphs.map((paragraph, index) => p(
    `${record.id}-${section.id}-${index + 1}`,
    profile.edits?.[section.id]?.[index] ?? (typeof paragraph === 'string' ? paragraph : paragraph.text),
    profile.citations(section.id),
  )),
}));

const structuredEvidence = (record: Branch, profile: Profile): ClaimEvidence => {
  const sections = claimSections[record.id];
  if (!sections) throw new Error(`Missing structured-claim evidence map for ${record.id}`);
  return Object.fromEntries(Object.entries(sections).map(([key, section]) => [key, profile.citations(section)])) as ClaimEvidence;
};

const structuredClaims = (record: Branch, evidence: ClaimEvidence) => ({
  classification: claim(`${record.category} · ${record.name}`, evidence.classification),
  chronology: claim(serialize({originPeriod: record.originPeriod, roughStartYear: record.roughStartYear}), evidence.chronology),
  definition: claim(record.shortDefinition, evidence.definition),
  purpose: claim(record.oneSentencePurpose, evidence.purpose),
  'central-questions': claim(serialize(record.coreQuestions), evidence['central-questions']),
  significance: claim(record.whyItMatters, evidence.significance),
  'origin-story': claim(record.originStory ?? '', evidence['origin-story']),
  history: claim(serialize({brief: record.historicalDevelopment, detailed: record.historicalDevelopmentDetailed}), evidence.history),
  concepts: claim(serialize({core: record.keyConcepts, detailed: record.keyConceptsDetailed}), evidence.concepts),
  relationships: claim(serialize({related: record.relatedBranchIds, contrasting: record.contrastingBranchIds, rivals: record.rivalPositions, subBranches: record.subBranches}), evidence.relationships),
  figures: claim(serialize({major: record.majorPhilosopherIds, detailed: record.majorFigures}), evidence.figures),
  works: claim(serialize(record.majorWorks), evidence.works),
  debates: claim(serialize({internal: record.internalTensions, detailed: record.internalDebates, comparisons: record.comparisons}), evidence.debates),
  misunderstandings: claim(serialize({brief: record.commonMisunderstandings, detailed: record.misconceptionsDetailed}), evidence.misunderstandings),
  relevance: claim(serialize({brief: record.modernExamples, detailed: record.modernRelevanceDetailed}), evidence.relevance),
  readings: claim(serialize({suggested: record.suggestedReadingPath, beginner: record.beginnerReadingPath, advanced: record.advancedReadingPath}), evidence.readings),
});

/** Applies only when Sol registers this final overlay at the end of the branch editorial chain. */
export const applyFinalWorldTraditionsClaimReviewEditorial = (record: Branch): Branch => {
  const profile = profiles[record.id];
  if (!profile) return record;
  const reviewed: Branch = {...record, ...profile.patch, articleSections: reviewedSections(record, profile)};
  const evidence = structuredEvidence(reviewed, profile);
  return {
    ...reviewed,
    editorial: {
      sources: profile.sources,
      structuredClaims: structuredClaims(reviewed, evidence),
      review: {
        status: 'claim-reviewed',
        reviewedOn,
        method: 'Full substantive branch-page claim review. Every article paragraph and rendered structured claim was checked against cited primary texts where appropriate, independent specialist references, and explicit historical-label, chronology, transmission, classification, influence, and interpretive safeguards. “Indian philosophy,” “Buddhist philosophy,” rationalism, empiricism, and German Idealism are retained only as qualified umbrella labels; no article equates article review with Museum review. Primary Museum copy remains outside this overlay and must be reconciled separately by Sol after integrated locks are generated.',
        reviewNotePath: profile.reviewNotePath,
        lock: reviewLocks[record.id],
        evidencePolicy: {
          minimumIndependentSecondarySources: 2,
          minimumIndependentSecondaryDomains: 2,
          requiredSourceTypes: ['primary-text'],
        },
      },
    },
  };
};
