import type {
  ArticleSection,
  Branch,
  CitationReference,
  EditorialSource,
} from '../../types/philosophy';
import {citation as c, paragraph as p, structuredClaim as claim} from './pilotHelpers';

const sep = (
  id: string,
  authors: string[],
  title: string,
  edition: string,
  year: number,
  url: string,
  note: string,
): EditorialSource => ({
  id,
  type: 'scholarly-reference',
  authors,
  title,
  containerTitle: 'The Stanford Encyclopedia of Philosophy',
  publisher: 'Metaphysics Research Lab, Stanford University',
  edition,
  year,
  url,
  accessedOn: '2026-08-01',
  note,
});

const sources: EditorialSource[] = [
  sep('kantianism-kant', ['Michael Rohlf'], 'Immanuel Kant', 'Spring 2024', 2024, 'https://plato.stanford.edu/archives/spr2024/entries/kant/', 'System-wide specialist account of Kant used to establish the inheritance being reconstructed.'),
  sep('kantianism-reinhold', ['Daniel Breazeale', 'John Walsh'], 'Karl Leonhard Reinhold', 'Summer 2026', 2026, 'https://plato.stanford.edu/archives/sum2026/entries/karl-reinhold/', 'Specialist chronology and interpretation of Reinhold’s 1786 Letters, Elementary Philosophy, and reception role.'),
  sep('kantianism-ti', ['Nicholas F. Stang'], 'Kant’s Transcendental Idealism', 'Fall 2022', 2022, 'https://plato.stanford.edu/archives/fall2022/entries/kant-transcendental-idealism/', 'Specialist map of the idealism and thing-in-itself disputes.'),
  sep('kantianism-maimon', ['Peter Thielke', 'Yitzhak Y. Melamed'], 'Salomon Maimon', 'Summer 2026', 2026, 'https://plato.stanford.edu/archives/sum2026/entries/maimon/', 'Specialist account of Maimon’s challenge to Kant and role in first reception.'),
  {
    id: 'kantianism-fichte', type: 'scholarly-reference', authors: ['Curtis Bowman'], title: 'Johann Gottlieb Fichte',
    containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin',
    url: 'https://iep.utm.edu/fichtejg/', accessedOn: '2026-08-01',
    note: 'Specialist account used to distinguish the 1794/95 Foundation from Fichte’s later, repeatedly revised Wissenschaftslehre.',
  },
  sep('kantianism-schelling', ['Andrew Bowie'], 'Friedrich Wilhelm Joseph von Schelling', 'Summer 2025', 2025, 'https://plato.stanford.edu/archives/sum2025/entries/schelling/', 'Specialist account of Schelling’s staged development and transformations of post-Kantian problems.'),
  sep('kantianism-hegel', ['Paul Redding'], 'Georg Wilhelm Friedrich Hegel', 'Spring 2024', 2024, 'https://plato.stanford.edu/archives/spr2024/entries/hegel/', 'Specialist account preserving metaphysical and post-Kantian disputes over Hegel.'),
  sep('kantianism-schopenhauer', ['Robert Wicks'], 'Arthur Schopenhauer', 'Summer 2026', 2026, 'https://plato.stanford.edu/archives/sum2026/entries/schopenhauer/', 'Specialist account of Schopenhauer’s selective appropriation and rejection of Kant.'),
  {
    id: 'kantianism-beiser', type: 'scholarly-book', authors: ['Frederick C. Beiser'],
    title: 'The Genesis of Neo-Kantianism, 1796–1880', publisher: 'Oxford University Press', year: 2014,
    url: 'https://academic.oup.com/book/1997', accessedOn: '2026-08-01',
    note: 'Opened book abstract, contents, and chapter records used for the plural nineteenth-century reception; its broader classification is treated as an argued reconstruction and paired with a full specialist review.',
  },
  {
    id: 'kantianism-patton', type: 'journal-article', authors: ['Lydia Patton'],
    title: 'Review of The Genesis of Neo-Kantianism, 1796–1880', containerTitle: 'Notre Dame Philosophical Reviews', year: 2015,
    url: 'https://ndpr.nd.edu/reviews/the-genesis-of-neo-kantianism-1796-1880/', accessedOn: '2026-08-01',
    note: 'Independent specialist review used to keep Beiser’s revised nineteenth-century taxonomy contestable.',
  },
  sep('kantianism-neo', ['Jeremy Heis'], 'Neo-Kantianism', 'Summer 2021', 2021, 'https://plato.stanford.edu/archives/sum2021/entries/neo-kantianism/', 'Principal specialist source for the classical Marburg and Southwest schools, their common commitments, and disputed wider boundaries.'),
  sep('kantianism-cohen', ['Scott Edgar'], 'Hermann Cohen', 'Spring 2025', 2025, 'https://plato.stanford.edu/archives/spr2025/entries/cohen/', 'Specialist account of Cohen’s theoretical, ethical, political, and religious philosophy.'),
  sep('kantianism-cassirer', ['Michael Friedman'], 'Ernst Cassirer', 'Spring 2024', 2024, 'https://plato.stanford.edu/archives/spr2024/entries/cassirer/', 'Specialist account of Cassirer’s Marburg formation, symbolic forms, science, exile, and political thought.'),
  {
    id: 'kantianism-oshea', type: 'scholarly-book', authors: ['James O’Shea'],
    title: 'Kant’s Theoretical Philosophy: The “Analytic” Tradition', containerTitle: 'The Kantian Mind',
    editors: ['Sorin Baiasu', 'Mark Timmons'], publisher: 'Routledge', year: 2025,
    url: 'https://researchrepository.ucd.ie/entities/publication/6068368e-2989-46f3-bc43-2bcce2892a63', accessedOn: '2026-08-01',
    note: 'Peer-reviewed book chapter; the repository accepted manuscript was inspected and used for the selective analytic reception of Kant.',
  },
  sep('kantianism-sellars', ['Willem deVries', 'Carl Sachs'], 'Wilfrid Sellars', 'Current entry accessed 2026', 2024, 'https://plato.stanford.edu/entries/sellars/', 'Specialist account of the myth of the given, the space of reasons, and Sellars’s Kantian inheritance.'),
  sep('kantianism-conceptualism', ['Colin McLear'], 'Kantian Conceptualism/Nonconceptualism', 'Summer 2020', 2020, 'https://plato.stanford.edu/archives/sum2020/entries/kant-conceptualism/', 'Specialist map of the conceptualist and nonconceptualist dispute.'),
  sep('kantianism-transarg', ['Robert Stern', 'Tony Cheng'], 'Transcendental Arguments', 'Summer 2025', 2025, 'https://plato.stanford.edu/archives/sum2025/entries/transcendental-arguments/', 'Specialist account of the forms, ambitions, and limits of transcendental arguments.'),
  sep('kantianism-husserl', ['Dan Zahavi'], 'Edmund Husserl', 'Summer 2026', 2026, 'https://plato.stanford.edu/archives/sum2026/entries/husserl/', 'Specialist account of Husserl’s transformative rather than simply derivative relation to transcendental philosophy.'),
  sep('kantianism-heidegger', ['Mark Wrathall'], 'Martin Heidegger', 'Summer 2026', 2026, 'https://plato.stanford.edu/archives/sum2026/entries/heidegger/', 'Specialist account used with an explicit warning that Heidegger’s retrieval of Kant is controversial.'),
  sep('kantianism-critical-theory', ['Robin Celikates', 'Jeffrey Flynn'], 'Critical Theory (Frankfurt School)', 'Summer 2026', 2026, 'https://plato.stanford.edu/archives/sum2026/entries/critical-theory/', 'Specialist genealogy that places Kant beside Hegel, Marx, Weber, psychoanalysis, and social research.'),
  sep('kantianism-adorno', ['Lambert Zuidervaart'], 'Theodor W. Adorno', 'Summer 2026', 2026, 'https://plato.stanford.edu/archives/sum2026/entries/adorno/', 'Specialist account of negative dialectics, nonidentity, critique, and aesthetics.'),
  sep('kantianism-habermas', ['James Bohman', 'William Rehg'], 'Jürgen Habermas', 'Summer 2026', 2026, 'https://plato.stanford.edu/archives/sum2026/entries/habermas/', 'Specialist account of communicative reason, discourse ethics, law, and democratic legitimacy.'),
  sep('kantianism-kant-moral', ['Robert Johnson', 'Adam Cureton'], 'Kant’s Moral Philosophy', 'Spring 2026', 2026, 'https://plato.stanford.edu/archives/spr2026/entries/kant-moral/', 'Specialist account of autonomy, moral standing, duties, motivation, and contemporary Kantian disputes.'),
  sep('kantianism-rawls', ['Leif Wenar'], 'John Rawls', 'Spring 2024', 2024, 'https://plato.stanford.edu/archives/spr2024/entries/rawls/', 'Specialist account distinguishing A Theory of Justice from Rawls’s later political liberalism.'),
  sep('kantianism-original-position', ['Samuel Freeman'], 'Original Position', 'Spring 2026', 2026, 'https://plato.stanford.edu/archives/spr2026/entries/original-position/', 'Specialist account of the original position’s role and principal objections.'),
  sep('kantianism-constructivism', ['Carla Bagnoli'], 'Constructivism in Metaethics', 'Spring 2026', 2026, 'https://plato.stanford.edu/archives/spr2026/entries/constructivism-metaethics/', 'Specialist account of Rawls’s 1980 label and realist, antirealist, and procedural disputes.'),
  {
    id: 'kantianism-friedman', type: 'journal-article', authors: ['Michael Friedman'],
    title: 'Extending the Dynamics of Reason', containerTitle: 'Erkenntnis', year: 2011,
    url: 'https://media.philosophy.ox.ac.uk/assets/pdf_file/0003/38613/Friedman.2011.pdf', accessedOn: '2026-08-01',
    note: 'Opened article used for the dynamic or relativized a priori and rational continuity through framework change.',
  },
  sep('kantianism-kant-politics', ['Frederick Rauscher'], 'Kant’s Social and Political Philosophy', 'Summer 2026', 2026, 'https://plato.stanford.edu/archives/sum2026/entries/kant-social-political/', 'Specialist account of public right, cosmopolitan right, colonialism, and political exclusions.'),
  sep('kantianism-feminist-autonomy', ['Natalie Stoljar'], 'Feminist Perspectives on Autonomy', 'Spring 2026', 2026, 'https://plato.stanford.edu/archives/spr2026/entries/feminism-autonomy/', 'Specialist account of relational, socially enabled, and critical reconstructions of autonomy.'),
  sep('kantianism-marx', ['Jonathan Wolff', 'David Leopold'], 'Karl Marx', 'Summer 2025', 2025, 'https://plato.stanford.edu/archives/sum2025/entries/marx/', 'Used to distinguish Marx’s direct formation from later Kantian analogies.'),
  sep('kantianism-nietzsche', ['Brian Leiter'], 'Nietzsche’s Moral and Political Philosophy', 'Spring 2020', 2020, 'https://plato.stanford.edu/archives/spr2020/entries/nietzsche-moral-political/', 'Used to distinguish interpretive resemblance from doctrinal Kantian affiliation.'),
  {
    id: 'kantianism-kleingeld', type: 'journal-article', authors: ['Pauline Kleingeld'], title: 'Kant’s Second Thoughts on Race',
    containerTitle: 'The Philosophical Quarterly', year: 2007, doi: '10.1111/j.1467-9213.2007.498.x',
    url: 'https://doi.org/10.1111/j.1467-9213.2007.498.x', accessedOn: '2026-08-01',
    note: 'Evidence for an influential late-reform interpretation, presented as one side of an unresolved specialist dispute.',
  },
  {
    id: 'kantianism-lu-adler', type: 'scholarly-book', authors: ['Huaping Lu-Adler'], title: 'Kant, Race, and Racism: Views from Somewhere',
    publisher: 'Oxford University Press', year: 2023, doi: '10.1093/oso/9780197685211.001.0001',
    url: 'https://academic.oup.com/book/45865', accessedOn: '2026-08-01',
    note: 'Opened book and chapter abstracts used for a specialist counterargument emphasizing continuity, ideological formation, and the systemic place of race in Kant; no unseen chapter detail is claimed.',
  },
  {
    id: 'kantianism-kant-primary', type: 'primary-text', authors: ['Immanuel Kant'], title: 'Kants gesammelte Schriften, Akademie edition',
    publisher: 'Bonner Kant-Korpus', url: 'https://www.korpora.org/Kant/', accessedOn: '2026-08-01',
    note: 'Primary-text corpus; citations use standard A/B or Akademie divisions and do not imply one preferred translation.',
  },
  {
    id: 'kantianism-fichte-primary', type: 'primary-text', authors: ['Johann Gottlieb Fichte'], title: 'Grundlage der gesammten Wissenschaftslehre: als Handschrift für seine Zuhörer',
    publisher: 'Bayerische Staatsbibliothek / Deutsche Digitale Bibliothek', year: 1794,
    url: 'https://www.deutsche-digitale-bibliothek.de/item/WBP7ZOLNSI52MI2NH455ML2ZM5TAQORT', accessedOn: '2026-08-01',
    note: 'Digitized German first edition, cited by §§1–3; interpretive claims are cross-checked against the specialist IEP entry, and no preferred English translation is implied.',
  },
  {
    id: 'kantianism-rawls-1980', type: 'journal-article', authors: ['John Rawls'], title: 'Kantian Constructivism in Moral Theory',
    containerTitle: 'The Journal of Philosophy', year: 1980, doi: '10.2307/2025790',
    url: 'https://doi.org/10.2307/2025790', accessedOn: '2026-08-01',
    note: 'Primary philosophical intervention used for Rawls’s introduction of the label “Kantian constructivism.”',
  },
  {
    id: 'kantianism-reader', type: 'scholarly-book', authors: ['Sebastian Luft (editor)'], title: 'The Neo-Kantian Reader',
    publisher: 'Routledge', year: 2015, isbn: '9780415452526',
    url: 'https://www.routledge.com/The-Neo-Kantian-Reader/Luft/p/book/9780415452526',
    note: 'Further reading only; not counted as evidence for reviewed claims.',
  },
];

const q = (sourceId: string, kind: Parameters<typeof c>[1], value: string, note?: string) => c(sourceId, kind, value, note);

const sectionCitations: Record<string, CitationReference[][]> = {
  'contested-inheritance': [
    [q('kantianism-neo', 'section', '1. Common Features of Neo-Kantians'), q('kantianism-kant', 'section', 'Introduction; 2–7')],
    [q('kantianism-ti', 'section', '3–5'), q('kantianism-kant-politics', 'section', '9–10'), q('kantianism-kant-moral', 'section', '11'), q('kantianism-feminist-autonomy', 'section', '1')],
    [q('kantianism-neo', 'section', '1'), q('kantianism-constructivism', 'section', '1')],
  ],
  'first-reception': [
    [q('kantianism-ti', 'section', '2. The Feder–Garve Review and Kant’s Replies'), q('kantianism-reinhold', 'section', '1–2')],
    [q('kantianism-ti', 'section', '3.4'), q('kantianism-maimon', 'section', '4–5'), q('kantianism-fichte', 'section', '2.c')],
    [q('kantianism-ti', 'section', '4–5'), q('kantianism-maimon', 'section', '5')],
  ],
  fichte: [
    [q('kantianism-fichte', 'section', '2.b–2.e'), q('kantianism-fichte-primary', 'standard-division', '§§1–3')],
    [q('kantianism-fichte', 'section', '2.a; 2.d–2.e')],
    [q('kantianism-fichte', 'section', '2.d; 4')],
  ],
  'schelling-hegel': [
    [q('kantianism-schelling', 'section', '2–4')],
    [q('kantianism-hegel', 'section', '1–3')],
    [q('kantianism-hegel', 'section', '2.2–2.4'), q('kantianism-schelling', 'section', '2–4')],
  ],
  'nineteenth-critics': [
    [q('kantianism-schopenhauer', 'section', '3–5')],
    [q('kantianism-beiser', 'chapter', 'General Introduction; Part I — opened book abstract/contents/chapter records'), q('kantianism-patton', 'section', 'Review essay')],
    [q('kantianism-neo', 'section', 'Introduction; 1'), q('kantianism-beiser', 'chapter', 'General Introduction — opened book abstract/chapter record')],
  ],
  'marx-nietzsche': [
    [q('kantianism-marx', 'section', 'Article introduction; 1.4; 2')],
    [q('kantianism-nietzsche', 'section', '1–2')],
    [q('kantianism-critical-theory', 'section', '1.2'), q('kantianism-feminist-autonomy', 'section', '1')],
  ],
  'back-to-kant': [
    [q('kantianism-neo', 'section', 'Introduction')],
    [q('kantianism-neo', 'section', '1')],
    [q('kantianism-neo', 'section', 'Introduction; 1')],
  ],
  marburg: [
    [q('kantianism-neo', 'section', '2.1–2.2')],
    [q('kantianism-cohen', 'section', '3–6'), q('kantianism-cassirer', 'section', '2–4')],
    [q('kantianism-neo', 'section', '2.3'), q('kantianism-friedman', 'page', '431–434')],
  ],
  southwest: [
    [q('kantianism-neo', 'section', '3.1–3.3')],
    [q('kantianism-neo', 'section', '3.1–3.3')],
    [q('kantianism-neo', 'section', '1; 3')],
  ],
  'international-neokantianism': [
    [q('kantianism-neo', 'section', '1; notes'), q('kantianism-beiser', 'chapter', 'General Introduction — opened book abstract/chapter record'), q('kantianism-patton', 'section', 'Review essay')],
    [q('kantianism-cohen', 'section', '8–10'), q('kantianism-cassirer', 'section', 'Biography; 6')],
    [q('kantianism-neo', 'section', 'Introduction; notes'), q('kantianism-patton', 'section', 'Review essay')],
  ],
  'parting-ways': [
    [q('kantianism-neo', 'section', 'Introduction'), q('kantianism-cassirer', 'section', 'Biography')],
    [q('kantianism-neo', 'section', 'Introduction'), q('kantianism-oshea', 'page', '1')],
    [q('kantianism-oshea', 'page', '1'), q('kantianism-husserl', 'section', '3; 5'), q('kantianism-heidegger', 'section', '2.8 — discussion citing GA 21:194')],
  ],
  'analytic-reception': [
    [q('kantianism-oshea', 'page', '1–4')],
    [q('kantianism-oshea', 'page', '4–5')],
    [q('kantianism-transarg', 'section', '1–4')],
  ],
  'sellars-mcdowell': [
    [q('kantianism-oshea', 'page', '2–3'), q('kantianism-sellars', 'section', '4. Epistemology')],
    [q('kantianism-oshea', 'page', '7–8'), q('kantianism-conceptualism', 'section', '1–5')],
    [q('kantianism-sellars', 'section', '4. Epistemology; 7.3 Rules and Normativity'), q('kantianism-conceptualism', 'section', '1–5')],
  ],
  'continental-inheritances': [
    [q('kantianism-husserl', 'section', '3; 5')],
    [q('kantianism-heidegger', 'section', '2.8 — discussion citing GA 21:194')],
    [q('kantianism-husserl', 'section', '3; 5'), q('kantianism-heidegger', 'section', '2.8 — discussion citing GA 21:194')],
  ],
  'critical-theory': [
    [q('kantianism-critical-theory', 'section', '1.2')],
    [q('kantianism-adorno', 'section', '3–4')],
    [q('kantianism-habermas', 'section', '3')],
  ],
  'ethical-revivals': [
    [q('kantianism-kant-moral', 'section', '10–15'), q('kantianism-constructivism', 'section', '2.3')],
    [q('kantianism-constructivism', 'section', '2.2')],
    [q('kantianism-kant-moral', 'section', '11–16'), q('kantianism-feminist-autonomy', 'section', '1–4')],
  ],
  'rawls-politics': [
    [q('kantianism-rawls', 'section', '4.6'), q('kantianism-original-position', 'section', '2–4')],
    [q('kantianism-rawls', 'section', '3–4')],
    [q('kantianism-rawls', 'section', '3–4'), q('kantianism-feminist-autonomy', 'section', '1–4')],
  ],
  constructivisms: [
    [q('kantianism-constructivism', 'section', '1–2.3'), q('kantianism-rawls-1980', 'page', '515–572')],
    [q('kantianism-constructivism', 'section', '6–7'), q('kantianism-kant-moral', 'section', '15')],
    [q('kantianism-constructivism', 'section', '2.1')],
  ],
  'science-theory': [
    [q('kantianism-cassirer', 'section', '3'), q('kantianism-friedman', 'page', '431–434')],
    [q('kantianism-friedman', 'page', '431–434')],
    [q('kantianism-neo', 'section', '2.3'), q('kantianism-friedman', 'page', '431–434')],
  ],
  'contemporary-theory': [
    [q('kantianism-ti', 'section', '4–5')],
    [q('kantianism-conceptualism', 'section', '1–5')],
    [q('kantianism-ti', 'section', '4–5')],
  ],
  'criticism-exclusion': [
    [q('kantianism-kant-politics', 'section', '8–10'), q('kantianism-kleingeld', 'page', '573–592'), q('kantianism-lu-adler', 'chapter', 'Introduction and chapters 1–3 — opened book/chapter abstracts')],
    [q('kantianism-feminist-autonomy', 'section', '1–4'), q('kantianism-kant-moral', 'section', '11')],
    [q('kantianism-feminist-autonomy', 'section', '1–4'), q('kantianism-kant-moral', 'section', '11'), q('kantianism-lu-adler', 'chapter', 'Introduction — opened book abstract')],
  ],
  'practical-tests': [
    [q('kantianism-kant-moral', 'section', '16', 'Contemporary application rather than Kant’s own technology ethics')],
    [q('kantianism-kant-moral', 'section', '13'), q('kantianism-rawls', 'section', '3–4')],
    [q('kantianism-kant-politics', 'section', '9'), q('kantianism-feminist-autonomy', 'section', '1–4', 'Contemporary extension')],
  ],
  'what-counts': [
    [q('kantianism-neo', 'section', '1')],
    [q('kantianism-neo', 'section', '1'), q('kantianism-constructivism', 'section', '1–2')],
    [q('kantianism-critical-theory', 'section', '1.2'), q('kantianism-feminist-autonomy', 'section', '1–4')],
  ],
  'reading-path': [
    [q('kantianism-kant', 'section', 'Bibliography > Primary Literature'), q('kantianism-kant-primary', 'work', 'Prolegomena; Groundwork; Critique of Pure Reason; political essays')],
    [q('kantianism-reinhold', 'section', '1–2'), q('kantianism-fichte', 'section', '2–4'), q('kantianism-schelling', 'section', '2–4'), q('kantianism-hegel', 'section', '1–3'), q('kantianism-neo', 'section', '1–3')],
    [q('kantianism-oshea', 'page', '1–8'), q('kantianism-constructivism', 'section', '1–7'), q('kantianism-critical-theory', 'section', '1.2'), q('kantianism-feminist-autonomy', 'section', '1–4')],
  ],
};

const paragraphOverrides: Record<string, Partial<Record<number, string>>> = {
  'contested-inheritance': {
    1: 'The inheritance begins with a productive instability. Kant claims that cognition depends on forms and concepts contributed by finite knowers while remaining answerable to an empirically real world. He limits theoretical knowledge to possible experience yet gives freedom and moral law practical authority. He treats reason as self-critical and autonomous, but his writings also contain racial and gender hierarchy, civilizational ranking, and a rational-capacity account that raises disputed questions about moral standing. Each conjunction creates different ways to continue Kant and different reasons to break with him.',
  },
  'first-reception': {
    1: 'Friedrich Heinrich Jacobi formulated a famous difficulty: Kant appears to require things in themselves to affect sensibility while denying theoretical use of causality beyond possible experience. Jacobi argued that one could not enter the critical system without that presupposition and could not remain in it with the concept. Whether the objection exposes a contradiction or relies on a disputed reading of affection is itself part of the reception. Gottlob Ernst Schulze pressed skeptical objections, while Salomon Maimon challenged the strict separation of sensibility and understanding and demanded a deeper account of their cooperation.',
  },
  fichte: {
    0: 'Fichte’s 1794/95 Foundation of the Entire Wissenschaftslehre reconstructs the demand for a unified critical philosophy around the activity through which the I posits itself and distinguishes itself from a not-I. This is not the everyday ego inventing the world at whim. Fichte aims to disclose conditions of finite self-conscious agency, where resistance, limitation, striving, and recognition make acting and knowing possible. He repeatedly recast the Wissenschaftslehre in later presentations, so the 1794/95 Foundation should not be treated as his one final system.',
  },
  'schelling-hegel': {
    2: 'Whether German Idealism counts as Kantianism depends on the standard used. Fichte, Schelling, and Hegel grow from problems set by Kant and often present themselves as completing critique. They also revise or contest Kant’s limits, faculty distinctions, fixed categories, and restrictions on intellectual intuition. Whether those revisions realize Kant’s critical intention or restore a form of speculative metaphysics remains a central interpretive dispute rather than a settled verdict.',
  },
  'nineteenth-critics': {
    1: 'Johann Friedrich Herbart resisted the idealist attempt to derive reality from the activity of consciousness and pursued a pluralist realism. Jakob Friedrich Fries defended critical philosophy while grounding access to a priori principles in empirical self-observation, provoking charges of psychologism. Friedrich Eduard Beneke developed psychology against speculative idealism. Beiser’s grouping of such figures into a wider, partly “lost” Kantian tradition broadens the familiar Fichte-to-Hegel narrative, but that revisionist taxonomy is itself debated.',
  },
  'marx-nietzsche': {
    0: 'Marx was formed most directly by Hegel, the Young Hegelians, socialist politics, and political economy. He relocates philosophical criticism in labor, property, class, and historically produced social relations and attacks abstractions that treat formally free persons apart from material dependence. Later theorists sometimes draw Kantian analogies when Marx reconstructs conditions of social objectivity or measures institutions against norms they claim, but those analogies are retrospective and do not make Marx a doctrinal Kantian.',
    1: 'Nietzsche attacks universal moral law, the intelligible moral agent, disinterested judgment, and confidence that reason legislates independently of embodied drives. His genealogy of reason and morality can resemble critique turned against Kant, but resemblance is not affiliation. Nietzsche rejects equal dignity and universal obligation where Kantian ethics makes their authority central, and any Kantian lineage must be argued rather than inferred from the shared word “critique.”',
    2: 'Marxian and Nietzschean objections became challenges for later Kantians: can universal norms answer material domination, genealogy, embodiment, and historically privileged standpoints? Critical theorists, feminists, and other reconstructive Kantians offer different answers. Their work shows how Kantian arguments can be revised under external criticism; it does not retroactively enroll every critic of abstraction in Kantianism.',
  },
  'international-neokantianism': {
    0: '“Neo-Kantianism” has both a narrow and a broad historical use. In the narrow or classical sense it names the Marburg and Southwest schools. Broader histories include earlier “back to Kant” figures and independent critical philosophers such as Alois Riehl, Hans Vaihinger, Leonard Nelson, Charles Renouvier, or Léon Brunschvicg. Those wider classifications track real arguments and networks but are contested; the page does not treat every national reception of Kant as one organized neo-Kantian movement.',
  },
  'parting-ways': {
    0: 'Neo-Kantianism’s institutional dominance weakened after the First World War through a combination of philosophical criticism, generational change, altered university fields, political upheaval, antisemitism, exile, and National Socialist destruction. Phenomenology, Heidegger’s ontology, logical empiricism, and philosophical anthropology often defined projects against neo-Kantian teachers, but none can be explained as the simple intellectual effect of one school’s collapse.',
    1: 'The later analytic–continental distinction can obscure shared problems without proving a single genealogy. Carnap, Heidegger, Cassirer, and Reichenbach encountered neo-Kantian teachers or questions in different ways, then developed sharply divergent projects. Their histories support connections among objectivity, meaning, finitude, science, and culture while leaving room for independent sources and institutional contingencies.',
  },
  'sellars-mcdowell': {
    2: 'Inferentialist extensions of Sellars emphasize judgment, normativity, and socially articulated practices of giving and asking for reasons. Critics ask whether such accounts over-intellectualize perception, marginalize embodiment and affect, or make nonhuman cognition difficult to recognize. The broader analytic Kantian dispute remains live because receptivity, conceptual activity, and rational constraint have not settled into one accepted balance.',
  },
  'continental-inheritances': {
    2: 'Later phenomenology, hermeneutics, existentialism, and deconstruction selectively transform Kantian questions about finitude, conditions of possibility, freedom, judgment, and critique. They do not constitute one continuous “continental Kantianism,” and influence must be established thinker by thinker. The securely evidenced point here is narrower: Husserl and Heidegger each make substantial but transformative use of Kantian problems, and Heidegger’s claim to retrieve an unrealized Kant remains controversial.',
  },
  constructivisms: {
    0: 'Rawls introduced “Kantian constructivism” as a label in his 1980 Dewey Lectures. In broad outline, constructivist views explain normative authority through procedures or constitutive standards of practical reason rather than by discovering a moral order wholly independent of rational agency. Rawls, Korsgaard, and O’Neill develop different versions. Whether constructivism is realist, antirealist, or faithful to Kant remains disputed, as does whether the relevant standpoint is agency as such, social practice, or a political conception of citizens.',
  },
  'science-theory': {
    0: 'Kant’s philosophy of nature was formed around Euclidean geometry and Newtonian mechanics. Later mathematics and physics challenged particular Kantian theses and the scientific background assumptions supporting them; evolutionary theory also changed the setting for arguments about organisms and purposiveness. Some successors abandon synthetic a priori knowledge, while others reconstruct framework principles that constitute objects and measurements within a theory yet can be revised during scientific change. These are rival later responses, not one result forced by “science” in the abstract.',
  },
  'criticism-exclusion': {
    0: 'Kantian universalism cannot be inherited responsibly without confronting Kant’s hierarchical writings on race, sex, anthropology, culture, and historical development. Kleingeld argues for a significant late rejection of racial hierarchy, slavery, and colonial domination; Lu-Adler argues that racism remains systemically connected to Kant’s thought and ideological setting. The extent and meaning of change remain an unresolved specialist dispute. Later condemnations of conquest do not erase earlier hierarchy, and monogenesis alone did not guarantee equality.',
    1: 'Feminist philosophers have both criticized and reconstructed autonomy. Relational accounts argue that agency develops through care, dependence, institutions, embodiment, and unequal power rather than appearing as an isolated capacity. Kantian moral standing grounded in rational capacity creates disputed questions about infants and people with profound cognitive disabilities; contemporary accounts variously appeal to potential, relations, duties, status, or revised foundations. Critical philosophy of race and decolonial criticism likewise test whether impartial reason and universal history conceal a dominant standpoint.',
    2: 'Kantian replies take several forms. Some use equal dignity and the prohibition on treating persons merely as means to criticize Kant’s exclusions from within. Others revise autonomy as socially enabled, embodied, and answerable to affected agents. Still others argue that central categories require replacement rather than repair. These are competing reconstructions, and universal language by itself neither resolves the historical record nor decides which account of normativity succeeds.',
  },
  'practical-tests': {
    0: 'As a contemporary Kantian extension in technology ethics, one can ask whether systems manipulate users, conceal reasons, exploit workers, or make decisions that affected persons cannot contest. Transparency matters not merely because it improves outcomes but because accountable agents should not be subjected to opaque power. Explanation alone is insufficient if institutions offer no meaningful ability to refuse or appeal. These questions reconstruct autonomy and publicity for technologies Kant did not discuss.',
    1: 'In contemporary medicine and public policy, Kantian approaches use equal standing to constrain aggregate calculations that sacrifice some people as mere instruments. Universalizability, public justification, and duties of respect provide tools rather than an automatic result. Describing a maxim, identifying affected agents, weighing imperfect duties, and understanding foreseeable consequences require empirical knowledge and judgment; these applications extend rather than quote Kant.',
    2: 'Contemporary Kantians also extend cosmopolitan right and duties across climate, migration, global institutions, and future generations. Kant’s own framework did not adequately confront colonial extraction, racial capitalism, or nonhuman nature. Current theorists dispute whether duties are individual, institutional, or shared across unjust structures, making the examples reconstructions rather than positions explicitly articulated by Kant.',
  },
};

const reviewedSections = (sections: ArticleSection[] | undefined): ArticleSection[] => (sections ?? []).map((section) => ({
  ...section,
  paragraphs: section.paragraphs.map((paragraph, index) => p(
    'kantianism-' + section.id + '-' + (index + 1),
    paragraphOverrides[section.id]?.[index] ?? (typeof paragraph === 'string' ? paragraph : paragraph.text),
    sectionCitations[section.id]?.[index] ?? [q('kantianism-kant', 'section', 'Introduction; sections 2–7; Bibliography')],
  )),
}));

const serialize = (value: unknown) => typeof value === 'string' ? value : JSON.stringify(value);

const structuredClaims = (record: Branch) => ({
  classification: claim(record.category, [q('kantianism-neo', 'section', 'Introduction; 1'), q('kantianism-reinhold', 'section', '1–2')]),
  date: claim('1786 Reinhold publication landmark; not an exact origin', [q('kantianism-reinhold', 'section', '1. Reinhold’s Life and Work')]),
  definition: claim(record.shortDefinition, [q('kantianism-neo', 'section', 'Introduction; 1'), q('kantianism-reinhold', 'section', '1–2')]),
  purpose: claim(record.oneSentencePurpose, [q('kantianism-kant', 'section', '2–7'), q('kantianism-neo', 'section', '1–3')]),
  'central-question': claim(record.coreQuestions[0] ?? '', [q('kantianism-kant', 'section', '2–7'), q('kantianism-neo', 'section', '1–3')]),
  'central-questions': claim(serialize(record.coreQuestions), [q('kantianism-kant', 'section', '2–7'), q('kantianism-neo', 'section', '1–3')]),
  'origin-story': claim(record.originStory ?? '', [q('kantianism-reinhold', 'section', '1–2'), q('kantianism-neo', 'section', 'Introduction')]),
  chronology: claim(serialize({originPeriod: record.originPeriod, startYear: record.roughStartYear, development: record.historicalDevelopment, detailed: record.historicalDevelopmentDetailed}), [q('kantianism-reinhold', 'section', '1–2'), q('kantianism-beiser', 'chapter', 'General Introduction; Part I — opened book abstract/contents/chapter records'), q('kantianism-neo', 'section', 'Introduction; 1–3')]),
  concepts: claim(serialize({concepts: record.keyConcepts, detailed: record.keyConceptsDetailed}), [q('kantianism-kant', 'section', '2–7'), q('kantianism-neo', 'section', '1–3'), q('kantianism-constructivism', 'section', '1–7')]),
  'concept-1': claim(record.keyConceptsDetailed?.[0]?.explanation ?? '', [q('kantianism-kant', 'section', '2–7'), q('kantianism-kant-primary', 'work', 'Critical works')]),
  'concept-2': claim(record.keyConceptsDetailed?.[1]?.explanation ?? '', [q('kantianism-kant', 'section', '2–7'), q('kantianism-neo', 'section', '1')]),
  'concept-3': claim(record.keyConceptsDetailed?.[2]?.explanation ?? '', [q('kantianism-conceptualism', 'section', '1–5'), q('kantianism-oshea', 'page', '2–8')]),
  'concept-4': claim(record.keyConceptsDetailed?.[3]?.explanation ?? '', [q('kantianism-kant-moral', 'section', '10–15'), q('kantianism-constructivism', 'section', '1–2.3')]),
  'concept-5': claim(record.keyConceptsDetailed?.[4]?.explanation ?? '', [q('kantianism-neo', 'section', '1–3')]),
  'concept-6': claim(record.keyConceptsDetailed?.[5]?.explanation ?? '', [q('kantianism-constructivism', 'section', '1–2.3'), q('kantianism-rawls-1980', 'page', '515–572')]),
  'concept-7': claim(record.keyConceptsDetailed?.[6]?.explanation ?? '', [q('kantianism-rawls', 'section', '3–4'), q('kantianism-habermas', 'section', '3')]),
  relations: claim(serialize({related: record.relatedBranchIds, contrasting: record.contrastingBranchIds, rivals: record.rivalPositions}), [q('kantianism-neo', 'section', '1'), q('kantianism-critical-theory', 'section', '1.2')]),
  figures: claim(serialize({ids: record.majorPhilosopherIds, figures: record.majorFigures}), [q('kantianism-reinhold', 'section', '1–2'), q('kantianism-neo', 'section', 'Introduction; 1–3'), q('kantianism-rawls', 'section', '3–4')]),
  works: claim(serialize(record.majorWorks), [q('kantianism-neo', 'section', 'Bibliography'), q('kantianism-kant-primary', 'work', 'Named Kant works'), q('kantianism-fichte-primary', 'standard-division', '§§1–3'), q('kantianism-cassirer', 'section', '3'), q('kantianism-oshea', 'page', '1–5'), q('kantianism-constructivism', 'section', '2.2'), q('kantianism-rawls-1980', 'page', '515–572')]),
  debates: claim(serialize({internal: record.internalDebates, tensions: record.internalTensions}), [q('kantianism-ti', 'section', '3–5'), q('kantianism-conceptualism', 'section', '1–5'), q('kantianism-constructivism', 'section', '1–7'), q('kantianism-kleingeld', 'page', '573–592'), q('kantianism-lu-adler', 'chapter', 'Introduction and chapters 1–3 — opened book/chapter abstracts')]),
  misconceptions: claim(serialize({common: record.commonMisunderstandings, detailed: record.misconceptionsDetailed}), [q('kantianism-neo', 'section', '1'), q('kantianism-kant-moral', 'section', '10–16')]),
  relevance: claim(serialize({examples: record.modernExamples, detailed: record.modernRelevanceDetailed}), [q('kantianism-kant-moral', 'section', '13–16'), q('kantianism-kant-politics', 'section', '8–10'), q('kantianism-feminist-autonomy', 'section', '1–4'), q('kantianism-friedman', 'page', '431–434'), q('kantianism-rawls', 'section', '3–4')]),
  'reading-paths': claim(serialize({suggested: record.suggestedReadingPath, beginner: record.beginnerReadingPath, advanced: record.advancedReadingPath}), [q('kantianism-kant', 'section', 'Bibliography'), q('kantianism-neo', 'section', 'Bibliography'), q('kantianism-reinhold', 'section', 'Bibliography')]),
});

export const applyKantianismEditorial = (record: Branch): Branch => {
  if (record.id !== 'kantianism') return record;

  const reviewed: Branch = {
    ...record,
    category: 'Reception tradition / family of programs',
    shortDefinition: 'A contested reception family that reconstructs Kantian critique, objectivity, autonomy, judgment, and public justification across historically distinct and often rival programs.',
    oneSentencePurpose: 'Examines which conditions make knowledge, agency, normativity, and public justification possible—and which Kantian commitments later thinkers must preserve, revise, or reject.',
    originPeriod: '1786 Reinhold publication landmark within an already developing reception',
    roughStartYear: 1786,
    originStory: 'The Atlas uses Reinhold’s 1786 Letters on the Kantian Philosophy as a visible reception landmark, not as the exact origin of Kantianism. Kantianism took shape through contested readings, defenses, criticisms, and reconstructions of Kant during the 1780s and after.',
    historicalDevelopment: [
      'Kant’s first readers dispute idealism, skepticism, the thing in itself, and whether critique needs one foundational principle.',
      'Fichte, Schelling, and Hegel transform and contest Kant’s limits in rival post-Kantian systems.',
      'Nineteenth-century critics and “back to Kant” movements produce realist, psychological, scientific, and historical alternatives.',
      'Classical Marburg and Southwest neo-Kantian schools rebuild transcendental method around science, value, history, and culture.',
      'Analytic, phenomenological, critical-theory, ethical, political, and constructivist inheritances selectively reconstruct different Kantian problems.',
    ],
    keyConcepts: [
      {
        id: 'kantianism-critique',
        name: 'Critique',
        plainDefinition: 'Reason examines the grounds, reach, and limits of its own claims.',
        deeperExplanation: 'Kantian critique asks what licenses a claim and where its authority ends instead of accepting either inherited metaphysics or unexamined skepticism.',
        example: 'Distinguish what an argument establishes about possible experience from what it merely assumes about things beyond experience.',
        relatedConceptIds: ['kantianism-transcendental-inquiry', 'kantianism-objective-validity'],
      },
      {
        id: 'kantianism-transcendental-inquiry',
        name: 'Transcendental inquiry',
        plainDefinition: 'Inquiry into conditions required for experience, knowledge, agency, or validity to be possible.',
        deeperExplanation: 'The method reasons from a capacity or practice toward enabling conditions while leaving their necessity and scope open to challenge.',
        example: 'Ask which shared concepts and measurement rules allow observations to count as evidence for one scientific object.',
        relatedConceptIds: ['kantianism-critique', 'kantianism-objective-validity'],
      },
      {
        id: 'kantianism-receptivity-spontaneity',
        name: 'Receptivity and spontaneity',
        plainDefinition: 'Cognition must be constrained by what is given and actively organized through concepts and judgment.',
        deeperExplanation: 'Later Kantians dispute whether justificatory experience is already conceptual and how an independent world can rationally constrain thought.',
        example: 'A perception may causally affect a believer without yet counting as a reason unless it can enter practices of judgment and correction.',
        relatedConceptIds: ['kantianism-transcendental-inquiry', 'kantianism-objective-validity'],
      },
      {
        id: 'kantianism-autonomy',
        name: 'Autonomy',
        plainDefinition: 'Agents are bound by principles whose authority they can rationally acknowledge rather than by appetite or imposed power alone.',
        deeperExplanation: 'Ethical, political, constructivist, and relational Kantians disagree about whether autonomy is individual, socially enabled, value-responsive, or law-constructing.',
        example: 'Test whether consent expresses accountable agency or merely records agreement under manipulation or severe dependence.',
        relatedConceptIds: ['kantianism-public-justification', 'kantianism-constructivism'],
      },
      {
        id: 'kantianism-objective-validity',
        name: 'Objective validity',
        plainDefinition: 'A judgment must answer to standards under which it can be correct or incorrect, not merely occur as a private state.',
        deeperExplanation: 'Neo-Kantians use this problem to separate normative justification from the psychological history of how a belief arose.',
        example: 'A causal account of why someone formed a belief does not by itself show that the belief is warranted.',
        relatedConceptIds: ['kantianism-critique', 'kantianism-receptivity-spontaneity'],
      },
      {
        id: 'kantianism-constructivism',
        name: 'Constructivism',
        plainDefinition: 'A family of views explaining normative authority through procedures or constitutive standards of practical reason.',
        deeperExplanation: 'Rawlsian and other constructivisms differ over whose standpoint constructs principles and whether independent values justify the procedure.',
        example: 'Model fair political principles from conditions that represent citizens as free and equal while asking what the model excludes.',
        relatedConceptIds: ['kantianism-autonomy', 'kantianism-public-justification'],
      },
      {
        id: 'kantianism-public-justification',
        name: 'Public justification',
        plainDefinition: 'Coercive principles should be justifiable to those subject to them as free and equal persons.',
        deeperExplanation: 'Political Kantians reconstruct self-legislation through institutions of reciprocal reason-giving rather than copying Kant’s own political conclusions.',
        example: 'Ask whether affected people can understand, contest, and revise the rules used by a public decision system.',
        relatedConceptIds: ['kantianism-autonomy', 'kantianism-constructivism'],
      },
    ],
    suggestedReadingPath: [
      'Begin with Kant’s Prolegomena, Groundwork Sections I–II, and the first Critique’s prefaces and introduction.',
      'Read Reinhold and then selected Fichte, Schelling, and Hegel to see why first readers reconstructed critique rather than merely repeating it.',
      'Compare Marburg neo-Kantian work on science with Southwest neo-Kantian work on value and historical knowledge.',
      'Follow one twentieth-century route in theoretical philosophy and one in ethics or politics, then test both against feminist, race, disability, and decolonial criticism.',
    ],
    modernExamples: [
      'Testing whether an automated public decision is explainable and contestable by the people subject to it.',
      'Identifying the mathematical and coordinative assumptions that make measurements comparable within a scientific framework.',
      'Evaluating whether medical consent reflects accountable agency under conditions of vulnerability and unequal power.',
      'Designing laws that can be publicly justified to citizens represented as free and equal without erasing historical exclusion.',
      'Debating how cosmopolitan duties should be reconstructed for migration, climate risk, and future generations.',
    ],
    commonMisunderstandings: [
      'Kantianism is not Kant’s philosophy repeated unchanged.',
      'The 1786 Reinhold publication is an Atlas landmark, not the exact birth of every Kantian reception.',
      'Criticism of Kant does not by itself make Marx, Nietzsche, Heidegger, or critical theorists doctrinal Kantians.',
      'German Idealism grows from Kant while revising or contesting central limits; whether it completes or departs from critique is disputed.',
      'Classical neo-Kantianism names the Marburg and Southwest schools more precisely than it names every later return to Kant.',
      'Kantian ethics contains major disputes about standing, value, motivation, institutions, consequences, and judgment.',
      'Contemporary applications to technology, climate, and institutions are reconstructions, not positions explicitly stated by Kant.',
    ],
    sourceLinks: [],
    articleSections: reviewedSections(record.articleSections),
  };

  return {
    ...reviewed,
    editorial: {
      sources,
      furtherReadingSourceIds: ['kantianism-reader'],
      structuredClaims: structuredClaims(reviewed),
      review: {
        status: 'claim-reviewed',
        reviewedOn: '2026-08-01',
        method: 'Full page-level claim review of all article paragraphs and claim-bearing branch metadata against primary texts, specialist histories, independent reference works, explicit reception boundaries, high-risk exclusion scholarship, and directly reused branch summaries; evidence locators and further-reading roles were manually separated before lock generation.',
        reviewNotePath: 'docs/editorial/reviews/kantianism.md',
        lock: 'fnv1a64:60822113bbc5a862',
        evidencePolicy: {minimumIndependentSecondarySources: 5, minimumIndependentSecondaryDomains: 3, requiredSourceTypes: ['primary-text', 'journal-article']},
      },
    },
  };
};
