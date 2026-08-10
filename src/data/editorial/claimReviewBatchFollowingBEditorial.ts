import type {
  ArticleSection,
  CitationLocatorKind,
  CitationReference,
  EditorialSource,
  Philosopher,
} from '../../types/philosophy';
import {citation as cite} from './pilotHelpers';
import {
  applyModernClusterEditorialConfig,
  type ModernClusterEditorialConfig,
  type ModernClusterEvidence,
} from './modernClusterEditorialHelpers';

/*
 * Isolated material for the following claim-review batch. Sol owns canonical
 * registration, generated review notes, literal lock generation, and Museum
 * reconciliation. The pending locks are deliberate integration placeholders.
 */
const reviewedOn = '2026-08-10';
const q = (sourceId: string, kind: CitationLocatorKind, value: string, note?: string) =>
  cite(sourceId, kind, value, note);
const source = (entry: Omit<EditorialSource, 'accessedOn'>): EditorialSource => ({...entry, accessedOn: reviewedOn});

type ArticleEdits = Record<string, Record<number, string>>;
type Config = Omit<ModernClusterEditorialConfig, 'articleSections' | 'sectionCitations'> & {
  defaultCitations: CitationReference[];
  sectionCitations?: Record<string, CitationReference[]>;
};

const reviseSections = (record: Philosopher, edits: ArticleEdits | undefined): ArticleSection[] =>
  (record.articleSections ?? []).map((section) => ({
    ...section,
    paragraphs: section.paragraphs.map((paragraph, index) => {
      const text = edits?.[section.id]?.[index] ?? (typeof paragraph === 'string' ? paragraph : paragraph.text);
      return typeof paragraph === 'string' ? text : {...paragraph, text};
    }),
  }));

const citationsFor = (record: Philosopher, config: Config): Record<string, CitationReference[]> =>
  Object.fromEntries((record.articleSections ?? []).map((section) => [
    section.id,
    config.sectionCitations?.[section.id] ?? config.defaultCitations,
  ]));

const evidence = (
  life: CitationReference[],
  ideas: CitationReference[],
  works: CitationReference[],
  influence: CitationReference[],
  disputes: CitationReference[],
  reading: CitationReference[],
): ModernClusterEvidence => ({life, ideas, works, influence, disputes, reading});

const articleEdits: Record<string, ArticleEdits> = {
  husserl: {
    'husserl-life-development': {
      1: 'Husserl’s development should not be compressed into one method announced once and for all. The early descriptive analyses of the Logical Investigations gave way to the transcendental turn publicly marked by Ideas I. Work on inner time, embodiment, intersubjectivity, passive synthesis, and habituality deepened into genetic phenomenology. In his final years, after antisemitic Nazi measures had restricted his academic standing and public presence, he addressed Europe’s intellectual crisis through the lifeworld and the historical formation of reason. The late manuscripts, lecture courses, and posthumous editions are indispensable but have different documentary status; they show a thinker revising his starting points, not a single final doctrine that editors simply uncovered.',
    },
  },
  heidegger: {
    'heidegger-nazism': {
      1: 'The Black Notebooks contain antisemitic passages within Heidegger’s reflections on modernity and the history of being. Their publication makes it untenable to quarantine antisemitism as irrelevant biography. It does not, by itself, settle a single formula for the relation between every concept and National Socialism. Responsible reading examines possible links among rootlessness, calculation, peoplehood, destiny, and Heidegger’s political judgments, distinguishes periods and texts, and refuses both euphemism and an exculpatory separation of philosophy from history. A claim that every phenomenological description is identical with Nazi ideology would be no more illuminating than a claim that political commitment never bears on philosophy.',
    },
  },
  wittgenstein: {
    'corpus-editors-form': {
      0: 'The form of the surviving corpus is philosophically important. The Tractatus was the only book-length philosophical work Wittgenstein published in his lifetime. He published the transitional paper “Some Remarks on Logical Form” in 1929 and later criticized its approach. The material published as Philosophical Investigations was repeatedly drafted and rearranged. Wittgenstein selected and prepared manuscripts with publication in view, but did not issue the book himself; its 1953 first edition, edited by G. E. M. Anscombe and Rush Rhees, therefore has an editorial history. Later editions also reconsidered the status of material once printed as Part II and now often titled Philosophy of Psychology—A Fragment. The canonical later book is indispensable, but it should not be mistaken for an authorially fixed final system.',
    },
  },
  sartre: {
    'politics-controversies': {
      1: 'His interventions also invite criticism. The incendiary preface to Fanon’s The Wretched of the Earth can make decolonizing violence sound purifying and can overshadow Fanon’s more complex clinical and political analysis. Sartre at times minimized or excused repression associated with movements and regimes he understood as historically progressive. His public persona could turn distant struggles into occasions for the European intellectual’s performance of commitment. These failures should neither be hidden nor used to erase his sustained opposition to colonial domination, torture, racism, and imperial war; they show why an ethics of responsibility cannot be replaced by confidence in historical direction.',
    },
  },
  beauvoir: {
    'controversies-legacy': {
      1: 'Her relationships with younger women and former students raise serious questions about consent, age, authority, and the gap between a philosophy of freedom and lived practice. Scholarship also debates her conduct during the occupation and the retrospective framing of memoir and correspondence. These issues require documentary care: memoirs and letters are neither transparent confessions nor material to be dismissed because they are self-presentations. A thinker of reciprocity is properly assessed in light of the asymmetries she recognized and those she failed to confront.',
    },
  },
  camus: {
    'algerian-setting': {
      2: 'Camus’s Algerian position remains indispensable and contested. He condemned colonial injustice and advocated reforms and civil protections, but he did not endorse Algerian independence and remained attached to a future for the European settler community. During the war he called for a civilian truce and feared violence against civilians on all sides. That concern was principled, but his public stance did not adequately confront the structural violence of colonial rule or the political claims of colonized Algerians. Neither celebration of a humane universalist nor dismissal as merely colonial captures a contradiction that belongs to the history of his thought.',
    },
  },
  arendt: {
    eichmann: {
      0: 'Arendt’s reports on Adolf Eichmann’s trial became Eichmann in Jerusalem and provoked enduring controversy. Her phrase “the banality of evil” did not mean that the Holocaust was ordinary, harmless, or morally trivial. It described her interpretation of Eichmann’s clichés, careerism, and failures of judgment rather than a claim that he lacked agency or guilt. Arendt supported the judgment that he should be held responsible. Later historical research documenting his ideological commitment and initiative makes it especially important not to turn “thoughtlessness” into a complete empirical portrait of the perpetrator.',
    },
  },
};

const husserlSources: EditorialSource[] = [
  source({id: 'hss-sep', type: 'scholarly-reference', authors: ['Dan Zahavi'], title: 'Edmund Husserl', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Winter 2025', year: 2025, url: 'https://plato.stanford.edu/archives/win2025/entries/husserl/', note: 'Specialist synthesis for the changing methods, transcendental idealism, intersubjectivity, and corpus chronology.'}),
  source({id: 'hss-iep', type: 'scholarly-reference', authors: ['Marianne Sawicki'], title: 'Husserl, Edmund', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'Internet Encyclopedia of Philosophy', url: 'https://iep.utm.edu/husserl/', note: 'Independent overview for biography, early anti-psychologism, Ideas, and publication history.'}),
  source({id: 'hss-ideas', type: 'primary-text', authors: ['Edmund Husserl'], title: 'Ideas Pertaining to a Pure Phenomenology and to a Phenomenological Philosophy, First Book', translator: 'F. Kersten', publisher: 'Martinus Nijhoff', year: 1983, url: 'https://archive.org/details/ideaspertainingt0000huss', note: 'Cite by section; the 1913 German original and translation must not be treated as a complete record of later genetic work.'}),
  source({id: 'hss-crisis', type: 'primary-text', authors: ['Edmund Husserl'], title: 'The Crisis of European Sciences and Transcendental Phenomenology', translator: 'David Carr', publisher: 'Northwestern University Press', year: 1970, url: 'https://nupress.northwestern.edu/9780810104587/the-crisis-of-european-sciences-and-transcendental-phenomenology/', note: 'Cite by section; the late work survives in a complex publication and manuscript history.'}),
  source({id: 'hss-archives', type: 'institutional-archive', authors: ['Husserl Archives, KU Leuven'], title: 'About Us', containerTitle: 'Husserl Archives Leuven', publisher: 'KU Leuven', url: 'https://hiw.kuleuven.be/hua/about', note: 'Institutional record for the Nachlass rescue and archive; it does not settle philosophical interpretation.'}),
];

const heideggerSources: EditorialSource[] = [
  source({id: 'hdg-sep', type: 'scholarly-reference', authors: ['Mark Wrathall'], title: 'Martin Heidegger', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Spring 2025', year: 2025, url: 'https://plato.stanford.edu/archives/spr2025/entries/heidegger/', note: 'Specialist source for the new account of Being and Time, later work, political history, and interpretive disputes.'}),
  source({id: 'hdg-iep', type: 'scholarly-reference', authors: ['W. J. Korab-Karpowicz'], title: 'Heidegger, Martin', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'Internet Encyclopedia of Philosophy', url: 'https://iep.utm.edu/heidegge/', note: 'Independent overview for life, phenomenological ontology, later thought, and the contested political record.'}),
  source({id: 'hdg-bt', type: 'primary-text', authors: ['Martin Heidegger'], title: 'Being and Time', translator: 'Joan Stambaugh', publisher: 'State University of New York Press', year: 2010, url: 'https://sunypress.edu/Books/B/Being-and-Time2', note: 'Cite by the standard German pagination/section divisions; the published book is unfinished.'}),
  source({id: 'hdg-tech', type: 'primary-text', authors: ['Martin Heidegger'], title: 'The Question Concerning Technology', translator: 'William Lovitt', containerTitle: 'The Question Concerning Technology and Other Essays', publisher: 'Harper Torchbooks', edition: '1977 paperback', year: 1977, isbn: '9780061319693', url: 'https://archive.org/details/questionconcerni00heid', note: 'Cite by essay section; the linked 1977 English edition is a mode-of-revealing analysis, not a device-by-device policy manual.'}),
  source({id: 'hdg-black', type: 'primary-text', authors: ['Martin Heidegger'], title: 'Ponderings II–VI: Black Notebooks 1931–1938', translator: 'Richard Rojcewicz', publisher: 'Indiana University Press', year: 2016, url: 'https://iupress.org/9780253020659/ponderings-ii-vi/', note: 'Use with specialist historical scholarship; passages establish the presence of antisemitism but do not themselves settle every claim about conceptual dependence.'}),
];

const wittgensteinSources: EditorialSource[] = [
  source({id: 'wit-sep', type: 'scholarly-reference', authors: ['Anat Biletzki', 'Anat Matar'], title: 'Ludwig Wittgenstein', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Fall 2025', year: 2025, url: 'https://plato.stanford.edu/archives/fall2025/entries/wittgenstein/', note: 'Specialist synthesis used for chronology, early/later/middle disputes, publication history, and the range of interpretations.'}),
  source({id: 'wit-iep', type: 'scholarly-reference', authors: ['Duncan J. Richter'], title: 'Wittgenstein, Ludwig', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'Internet Encyclopedia of Philosophy', url: 'https://iep.utm.edu/wittgens/', note: 'Independent overview used for biography, the Tractatus, later philosophy, certainty, and editorial cautions.'}),
  source({id: 'wit-tractatus', type: 'primary-text', authors: ['Ludwig Wittgenstein'], title: 'Tractatus Logico-Philosophicus', translator: 'C. K. Ogden', publisher: 'Kegan Paul, Trench, Trubner & Co.', edition: 'Bilingual English–German edition', year: 1922, url: 'https://www.gutenberg.org/ebooks/5740', note: 'Cite by numbered proposition; the linked digital copy hosts the 1922 Ogden translation, while Russell’s introduction is not Wittgenstein’s own statement of the work.'}),
  source({id: 'wit-investigations', type: 'primary-text', authors: ['Ludwig Wittgenstein'], title: 'Philosophical Investigations', editors: ['P. M. S. Hacker', 'Joachim Schulte'], translator: 'G. E. M. Anscombe; revised by P. M. S. Hacker and Joachim Schulte', publisher: 'Wiley', edition: '4th revised ed.', year: 2010, isbn: '9781444307979', url: 'https://books.google.com/books?id=vGXWRovhS44C', note: 'Cite by section; this linked bilingual edition preserves the 1953 posthumous publication history and makes the former “Part II” Philosophy of Psychology—A Fragment.'}),
  source({id: 'wit-archives', type: 'institutional-archive', authors: ['Wittgenstein Archives at the University of Bergen'], title: 'WAB – The Wittgenstein Archives', publisher: 'University of Bergen', url: 'https://www4.uib.no/en/research/research-infrastructure/wab-the-wittgenstein-archives', note: 'Institutional record for the Bergen Nachlass Edition and Wittgenstein Source, used to distinguish authored publications from editorially assembled posthumous works.'}),
];

const sartreSources: EditorialSource[] = [
  source({id: 'srt-sep', type: 'scholarly-reference', authors: ['Jack Reynolds', 'Pierre-Jean Renaudie'], title: 'Jean-Paul Sartre', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Summer 2022', year: 2022, url: 'https://plato.stanford.edu/archives/sum2022/entries/sartre/', note: 'Specialist synthesis for consciousness, ontology, ethics, literature, politics, and changes across Sartre’s career.'}),
  source({id: 'srt-iep', type: 'scholarly-reference', authors: ['Christian J. Onof'], title: 'Sartre, Jean Paul: Existentialism', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'Internet Encyclopedia of Philosophy', url: 'https://iep.utm.edu/Sartre-ex/', note: 'Independent overview for early existential phenomenology, bad faith, others, authenticity, and later work.'}),
  source({id: 'srt-bn', type: 'primary-text', authors: ['Jean-Paul Sartre'], title: 'Being and Nothingness: An Essay on Phenomenological Ontology', translator: 'Hazel E. Barnes', publisher: 'Routledge', edition: 'Routledge Classics edition', year: 2003, isbn: '9780415278485', url: 'https://archive.org/details/beingnothingness0000sart', note: 'Cite by part and chapter; the linked 2003 Barnes-translation edition’s systematic vocabulary should not be retrojected unchanged onto the later political work.'}),
  source({id: 'srt-critique', type: 'primary-text', authors: ['Jean-Paul Sartre'], title: 'Critique of Dialectical Reason, Vol. 1: Theory of Practical Ensembles', translator: 'Alan Sheridan-Smith', editors: ['Jonathan Rée'], publisher: 'Verso', year: 2004, isbn: '9781859844854', url: 'https://www.versobooks.com/products/1137-critique-of-dialectical-reason-vol-1', note: 'Cite by book and chapter; the 2004 Sheridan-Smith translation’s later social analysis neither simply revokes nor simply repeats early freedom.'}),
  source({id: 'srt-politics', type: 'scholarly-reference', authors: ['Storm Heter'], title: 'Sartre’s Political Philosophy', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'Internet Encyclopedia of Philosophy', url: 'https://iep.utm.edu/sartre-p/', note: 'Specialist review of Sartre’s political philosophy, Marxism, engagement, history, and risks in his political judgment.'}),
];

const beauvoirSources: EditorialSource[] = [
  source({id: 'bdv-sep', type: 'scholarly-reference', authors: ['Debra Bergoffen', 'Megan Burke'], title: 'Simone de Beauvoir', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Fall 2024', year: 2024, url: 'https://plato.stanford.edu/archives/fall2024/entries/beauvoir/', note: 'Specialist synthesis for independent philosophy, literary forms, ethics, feminism, activism, and contested reception.'}),
  source({id: 'bdv-iep', type: 'scholarly-reference', authors: ['Shannon Mussett'], title: 'Beauvoir, Simone de', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'Internet Encyclopedia of Philosophy', url: 'https://iep.utm.edu/simone-de-beauvoir/', note: 'Independent overview for biography, ethics, The Second Sex, literature, cultural criticism, and aging.'}),
  source({id: 'bdv-ethics', type: 'primary-text', authors: ['Simone de Beauvoir'], title: 'The Ethics of Ambiguity', translator: 'Bernard Frechtman', publisher: 'Citadel Press', edition: '1962 reprint', year: 1962, isbn: '9780806501604', url: 'https://archive.org/details/ethicsofambiguit0000unse', note: 'Cite by part and chapter; the linked Frechtman translation is an existential ethical argument rather than a general permission for arbitrary choice.'}),
  source({id: 'bdv-second', type: 'primary-text', authors: ['Simone de Beauvoir'], title: 'The Second Sex', translator: 'Constance Borde and Sheila Malovany-Chevallier', publisher: 'Vintage', year: 2011, isbn: '9780307277787', url: 'https://www.penguinrandomhouse.com/books/10379/the-second-sex-by-simone-de-beauvoir-newly-translated-by-constance-borde-and-sheila-malovany/', note: 'Cite by volume/book/chapter; this 2011 unabridged English translation restored material cut from the earlier Parshley translation, while its historical generalizations remain open to criticism.'}),
  source({id: 'bdv-cambridge', type: 'scholarly-book', authors: ['Claudia Card'], title: 'The Cambridge Companion to Simone de Beauvoir', publisher: 'Cambridge University Press', year: 2003, doi: '10.1017/CCOL0521790964', isbn: '9780521790963', url: 'https://doi.org/10.1017/CCOL0521790964', note: 'Specialist collection edited by Claudia Card, used for the relation among ethics, feminism, literature, political activism, biography, and reception.'}),
];

const camusSources: EditorialSource[] = [
  source({id: 'cam-sep', type: 'scholarly-reference', authors: ['Ronald Aronson'], title: 'Albert Camus', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Winter 2022', year: 2022, url: 'https://plato.stanford.edu/archives/win2022/entries/camus/', note: 'Specialist synthesis for the absurd, revolt, literary form, political limits, Sartre dispute, and Camus’s anti-systematic self-description.'}),
  source({id: 'cam-iep', type: 'scholarly-reference', authors: ['David Sherman'], title: 'Camus, Albert', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'Internet Encyclopedia of Philosophy', url: 'https://iep.utm.edu/albert-camus/', note: 'Independent overview for biography, absurdity, revolt, political violence, literary texts, and the non-existentialist qualification.'}),
  source({id: 'cam-myth', type: 'primary-text', authors: ['Albert Camus'], title: 'The Myth of Sisyphus', translator: 'Justin O’Brien', publisher: 'Vintage', edition: '2nd ed.', year: 2018, isbn: '9780525564454', url: 'https://www.penguinrandomhouse.ca/books/23470/the-myth-of-sisyphus-by-albert-camus/9780525564454', note: 'Cite by essay and chapter; the linked O’Brien translation’s claim concerns a relation of demand and silence, not a theorem that nothing matters.'}),
  source({id: 'cam-rebel', type: 'primary-text', authors: ['Albert Camus'], title: 'The Rebel: An Essay on Man in Revolt', translator: 'Anthony Bower', publisher: 'Vintage', edition: 'Vintage International edition', year: 1992, isbn: '9780679733843', url: 'https://www.penguinrandomhouse.com/books/23475/the-rebel-by-albert-camus/', note: 'Cite by part and chapter; the linked Bower translation’s historical claims and argument about violence require critical reading rather than heroization.'}),
  source({id: 'cam-nobel', type: 'institutional-archive', authors: ['Nobel Prize Outreach'], title: 'Albert Camus: Biographical', publisher: 'Nobel Prize', year: 1957, url: 'https://www.nobelprize.org/prizes/literature/1957/camus/biographical/', note: 'Institutional biographical record used for the Nobel Prize and basic chronology, not philosophical interpretation.'}),
];

const arendtSources: EditorialSource[] = [
  source({id: 'ard-sep', type: 'scholarly-reference', authors: ['Tatjana Tömmel', 'Maurizio Passerin d’Entreves'], title: 'Hannah Arendt', containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'], publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Spring 2025', year: 2025, url: 'https://plato.stanford.edu/archives/spr2025/entries/arendt/', note: 'Specialist synthesis for life, totalitarianism, action, public world, judgment, Eichmann, and major criticism.'}),
  source({id: 'ard-iep', type: 'scholarly-reference', authors: ['Majid Yar'], title: 'Arendt, Hannah', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'Internet Encyclopedia of Philosophy', url: 'https://iep.utm.edu/hannah-arendt/', note: 'Independent overview for political thought, totalitarianism, vita activa, revolution, judgment, and criticism.'}),
  source({id: 'ard-human', type: 'primary-text', authors: ['Hannah Arendt'], title: 'The Human Condition', publisher: 'University of Chicago Press', edition: '2nd enlarged ed.', year: 2018, isbn: '9780226586601', url: 'https://press.uchicago.edu/ucp/books/book/chicago/H/bo29137972.html', note: 'Cite by chapter; this edition adds Margaret Canovan’s introduction and Danielle Allen’s foreword, while labor, work, and action remain analytic distinctions rather than a hierarchy that automatically removes care or material justice from politics.'}),
  source({id: 'ard-origins', type: 'primary-text', authors: ['Hannah Arendt'], title: 'The Origins of Totalitarianism', publisher: 'Penguin Classics', edition: 'Penguin Modern Classics edition', year: 2017, isbn: '9780241316757', url: 'https://www.penguin.co.uk/books/306643/the-origins-of-totalitarianism-by-hannah-arendt/9780241316757', note: 'Cite by part and chapter; the linked 2017 edition’s comparisons and history of imperialism/race are important but contested.'}),
  source({id: 'ard-eichmann', type: 'primary-text', authors: ['Hannah Arendt'], title: 'Eichmann in Jerusalem: A Report on the Banality of Evil', publisher: 'Penguin Classics', edition: '2006 edition with introduction by Amos Elon', year: 2006, isbn: '9780143039884', url: 'https://www.penguinrandomhouse.com/books/320983/eichmann-in-jerusalem-by-hannah-arendt/', note: 'Cite by chapter; the linked edition preserves Arendt’s report and postscript, which must be read beside later historical research on Eichmann, ideology, and Jewish councils.'}),
];

const configs: Record<string, Config> = {
  husserl: {
    sources: husserlSources,
    defaultCitations: [q('hss-sep', 'section', '§§1–10'), q('hss-iep', 'section', '§§1–6')],
    sectionCitations: {
      'husserl-life-development': [q('hss-sep', 'section', '§1'), q('hss-iep', 'section', 'Biography'), q('hss-archives', 'work', 'Archive history')],
      'husserl-reduction': [q('hss-ideas', 'standard-division', '§§27–65'), q('hss-sep', 'section', '§§5–6')],
      'husserl-time': [q('hss-sep', 'section', '§6'), q('hss-iep', 'section', 'Ideas I and II')],
      'husserl-body-others': [q('hss-sep', 'section', '§§8–10'), q('hss-iep', 'section', 'Ideas II')],
      'husserl-crisis': [q('hss-crisis', 'standard-division', '§§27–38; 41–55'), q('hss-sep', 'section', '§§9–10')],
    },
    evidence: evidence([q('hss-sep', 'section', '§1'), q('hss-iep', 'section', 'Biography'), q('hss-archives', 'work', 'Archive history')], [q('hss-ideas', 'standard-division', '§§27–65'), q('hss-sep', 'section', '§§2–10')], [q('hss-ideas', 'work', 'Whole work'), q('hss-crisis', 'work', 'Whole work')], [q('hss-sep', 'section', '§§1, 9–10'), q('hss-iep', 'section', 'How to Interpret Husserl’s Texts')], [q('hss-sep', 'section', '§§5–10'), q('hss-crisis', 'standard-division', '§§27–38')], [q('hss-iep', 'section', 'References and Further Reading'), q('hss-ideas', 'standard-division', '§§27–65')]),
    patch: {region: 'Moravia, Germany, and continental Europe', tradition: 'Transcendental phenomenology', primaryBranchIds: ['phenomenology'], secondaryBranchIds: ['epistemology', 'philosophy-of-mind', 'philosophy-of-science'], contributionSummary: 'Founded phenomenology as a rigorously descriptive investigation of intentionality, evidence, time, embodiment, intersubjectivity, and lifeworld while repeatedly revising its transcendental method.', beginnerExplanation: 'Husserl asks how a world can be meaningful in experience without reducing truth to a private mental event. “Bracketing” tests how things appear; it does not deny that there is a world.', dateDisplay: '8 April 1859–27 April 1938', dateConfidence: 'high', dateNote: 'The life dates are secure. Many late manuscripts, courses, and posthumous editions are essential evidence, but they have different editorial and documentary status from works Husserl issued himself.', mainIdeas: ['Intentionality and fulfillment', 'Epoché and reduction', 'Noesis, noema, and horizons', 'Time-consciousness', 'Embodiment and intersubjectivity', 'Passive and genetic synthesis', 'Lifeworld and the crisis of science'], keyWorks: ['Logical Investigations', 'Ideas I', 'Cartesian Meditations', 'Ideas II', 'The Crisis of European Sciences and Transcendental Phenomenology'], controversiesOrInterpretiveTensions: ['Transcendental idealism remains disputed.', 'The reduction has several routes and is not a single mechanical procedure.', 'Late manuscripts and posthumous editions require genre and chronology controls.', 'His European account of reason needs critical scrutiny of exclusions.']},
    reviewNotePath: 'docs/editorial/reviews/husserl.md', reviewLock: 'fnv1a64:1b7b6c09e14d9949', reviewedOn,
  },
  heidegger: {
    sources: heideggerSources,
    defaultCitations: [q('hdg-sep', 'section', '§§1–5'), q('hdg-iep', 'section', '§§1–7')],
    sectionCitations: {
      'heidegger-life-works': [q('hdg-sep', 'section', '§1'), q('hdg-iep', 'section', 'Life and Works')],
      'heidegger-world': [q('hdg-bt', 'standard-division', '§§12–18'), q('hdg-sep', 'section', '§2.2')],
      'heidegger-care-time': [q('hdg-bt', 'standard-division', '§§41, 65–71'), q('hdg-sep', 'section', '§§2.4–2.5')],
      'heidegger-technology': [q('hdg-tech', 'section', 'pp. 3–35'), q('hdg-sep', 'section', '§5.2')],
      'heidegger-nazism': [q('hdg-sep', 'section', '§§1, 3'), q('hdg-black', 'work', 'Ponderings II–VI'), q('hdg-iep', 'section', 'From Philosophy to Political Theory')],
    },
    evidence: evidence([q('hdg-sep', 'section', '§1'), q('hdg-iep', 'section', 'Life and Works')], [q('hdg-bt', 'standard-division', '§§12–18, 25–38, 40–44, 45–53'), q('hdg-sep', 'section', '§2')], [q('hdg-bt', 'work', 'Whole work'), q('hdg-tech', 'work', 'Whole essay')], [q('hdg-sep', 'section', '§§4–5'), q('hdg-iep', 'section', '§§4–7')], [q('hdg-sep', 'section', '§3'), q('hdg-black', 'work', 'Ponderings II–VI')], [q('hdg-bt', 'standard-division', '§§12–18'), q('hdg-tech', 'section', 'pp. 3–35')]),
    patch: {region: 'Germany', tradition: 'Phenomenological ontology and the history of being', primaryBranchIds: ['ontology', 'phenomenology', 'continental-philosophy'], secondaryBranchIds: ['aesthetics', 'philosophy-of-technology', 'philosophy-of-language'], contributionSummary: 'Reworked phenomenology into an inquiry into being, practical world-involvement, temporality, historical disclosure, art, language, and technology, while his Nazi commitment and antisemitism remain inseparable critical contexts.', beginnerExplanation: 'Heidegger asks how the world is already meaningful in practical life before we stand back to theorize it. His account of this insight never excuses his National Socialist commitment or antisemitic writing.', dateDisplay: '26 September 1889–26 May 1976', dateConfidence: 'high', dateNote: 'The dates are secure. Being and Time is unfinished; lectures, essays, and the Black Notebooks have different genres and cannot be merged into one timeless doctrine.', mainIdeas: ['Question of being and ontological difference', 'Being-in-the-world', 'Care, mood, understanding, and being-with', 'Authenticity, death, and temporality', 'Historical disclosure and language', 'Technology as enframing', 'Political responsibility and antisemitism as interpretive context'], keyWorks: ['Being and Time', 'The Origin of the Work of Art', 'Letter on Humanism', 'The Question Concerning Technology', 'Black Notebooks'], controversiesOrInterpretiveTensions: ['The relation between National Socialism, antisemitism, and individual philosophical concepts is intensely contested.', 'Dasein is not a self-help ideal or a simple psychology.', 'Later “turn” language should not erase continuities and ruptures.', 'Technology analysis is not a policy program or blanket rejection of devices.']},
    reviewNotePath: 'docs/editorial/reviews/heidegger.md', reviewLock: 'fnv1a64:928064d6255b2b4c', reviewedOn,
  },
  wittgenstein: {
    sources: wittgensteinSources,
    defaultCitations: [q('wit-sep', 'section', '§§1–6'), q('wit-iep', 'section', '§§1–10')],
    sectionCitations: {
      'war-teaching-return': [q('wit-sep', 'section', '§1'), q('wit-iep', 'section', 'Life')],
      'corpus-editors-form': [q('wit-sep', 'section', '§§1, 3, 6'), q('wit-archives', 'work', 'Manuscript and publication resources')],
      'tractatus-origins': [q('wit-tractatus', 'standard-division', '1–4.12'), q('wit-sep', 'section', '§2.1')],
      'pictures-propositions': [q('wit-tractatus', 'standard-division', '2.1–4.1212'), q('wit-sep', 'section', '§§2.1–2.4')],
      'use-games-life': [q('wit-investigations', 'standard-division', '§§1–88, 241–242'), q('wit-sep', 'section', '§§3.2–3.4')],
      'rules-going-on': [q('wit-investigations', 'standard-division', '§§138–242'), q('wit-sep', 'section', '§3.5')],
      'certainty-hinges': [q('wit-sep', 'section', '§4'), q('wit-iep', 'section', 'Certainty')],
    },
    evidence: evidence([q('wit-sep', 'section', '§1'), q('wit-iep', 'section', 'Life')], [q('wit-tractatus', 'standard-division', '1–7'), q('wit-investigations', 'standard-division', '§§1–242'), q('wit-sep', 'section', '§§2–4')], [q('wit-tractatus', 'work', 'Whole work'), q('wit-investigations', 'work', 'Whole work'), q('wit-archives', 'work', 'Manuscript and publication resources')], [q('wit-sep', 'section', '§§5–6'), q('wit-iep', 'section', 'Wittgenstein in History')], [q('wit-sep', 'section', '§§2.4, 3.1, 3.5, 4–6'), q('wit-archives', 'work', 'Manuscript and publication resources')], [q('wit-investigations', 'standard-division', '§§1–88'), q('wit-tractatus', 'standard-division', '1–7')]),
    patch: {region: 'Austria, Norway, and Britain', tradition: 'Logic, language, and philosophical method', primaryBranchIds: ['analytic-philosophy', 'philosophy-of-language', 'logic'], secondaryBranchIds: ['philosophy-of-mind', 'epistemology', 'ethics'], contributionSummary: 'Recast philosophical clarification first through logical form and later through language-games, rule-following, psychological concepts, and certainty, while leaving a complex and largely posthumously edited corpus.', beginnerExplanation: 'Wittgenstein asks what words are doing before a philosophical theory makes them mysterious. The Tractatus and later investigations differ deeply, but neither gives a ready-made “Wittgensteinian” doctrine.', dateDisplay: '26 April 1889–29 April 1951', dateConfidence: 'high', dateNote: 'The dates are secure. The Tractatus was his only book-length philosophical work published in his lifetime; major later titles are editorial constructions from manuscripts, typescripts, and lecture materials.', mainIdeas: ['Logical form, showing, and saying', 'Sense, nonsense, and philosophical clarification', 'Language-games and meaning in use', 'Forms of life', 'Rule-following and public criteria', 'Psychological concepts and private language', 'Certainty and hinge commitments'], keyWorks: ['Tractatus Logico-Philosophicus', 'Philosophical Investigations', 'The Blue and Brown Books', 'Remarks on the Foundations of Mathematics', 'On Certainty'], controversiesOrInterpretiveTensions: ['Early/later continuity and rupture are disputed.', 'The Tractatus’s nonsense, ethics, and mystical dimensions admit incompatible readings.', 'Rule-following does not have one agreed social or individualist interpretation.', 'Posthumous editions and translations shape the corpus readers encounter.']},
    reviewNotePath: 'docs/editorial/reviews/wittgenstein.md', reviewLock: 'fnv1a64:5940e64fe215d421', reviewedOn,
  },
  sartre: {
    sources: sartreSources,
    defaultCitations: [q('srt-sep', 'section', '§§1–8'), q('srt-iep', 'section', '§§1–8')],
    sectionCitations: {
      orientation: [q('srt-sep', 'section', '§§2–4'), q('srt-bn', 'book-chapter', 'Parts I–II')],
      'freedom-facticity': [q('srt-bn', 'book-chapter', 'Part IV, chs. 1–2'), q('srt-sep', 'section', '§§3–4')],
      'bad-faith': [q('srt-bn', 'book-chapter', 'Part I, ch. 2'), q('srt-iep', 'section', 'The Project of Bad Faith')],
      'others-look': [q('srt-bn', 'book-chapter', 'Part III, ch. 1'), q('srt-sep', 'section', '§4')],
      'history-marxism': [q('srt-critique', 'book-chapter', 'Book I, chs. 1–3'), q('srt-politics', 'section', '§§2–5')],
      'politics-controversies': [q('srt-politics', 'section', '§§4–6'), q('srt-sep', 'section', '§§6–7')],
    },
    evidence: evidence([q('srt-sep', 'section', '§1'), q('srt-iep', 'section', 'Sartre’s Life')], [q('srt-bn', 'book-chapter', 'Parts I–IV'), q('srt-sep', 'section', '§§2–5')], [q('srt-bn', 'work', 'Whole work'), q('srt-critique', 'work', 'Volume One')], [q('srt-sep', 'section', '§§6–8'), q('srt-politics', 'section', '§§2–6')], [q('srt-politics', 'section', '§§4–6'), q('srt-sep', 'section', '§§5–7')], [q('srt-bn', 'book-chapter', 'Part I, ch. 2; Part III, ch. 1'), q('srt-critique', 'book-chapter', 'Book I, chs. 1–3')]),
    patch: {region: 'France', tradition: 'Existential phenomenology and existential Marxism', primaryBranchIds: ['existentialism', 'continental-philosophy'], secondaryBranchIds: ['ethics', 'political-philosophy', 'philosophy-of-mind'], contributionSummary: 'Developed a phenomenology of consciousness, freedom, facticity, bad faith, others, literature, and later historical praxis, while repeatedly confronting the limits of an individual-centered account of agency.', beginnerExplanation: 'Sartre does not say that people can obtain anything by choosing hard enough. He asks how responsibility remains real when bodies, histories, oppression, other people, and material scarcity shape every project.', dateDisplay: '21 June 1905–15 April 1980', dateConfidence: 'high', dateNote: 'The dates are secure. Sartre’s fiction, lectures, essays, and later political work have distinct genres; Existentialism Is a Humanism is useful but not a complete statement of his philosophy.', mainIdeas: ['Intentional consciousness and pre-reflective self-awareness', 'For-itself, in-itself, and nothingness', 'Freedom and facticity', 'Bad faith and the fundamental project', 'The look and conflict with others', 'Engaged literature', 'Praxis, groups, scarcity, and history'], keyWorks: ['The Transcendence of the Ego', 'Nausea', 'Being and Nothingness', 'Existentialism Is a Humanism', 'What Is Literature?', 'Search for a Method', 'Critique of Dialectical Reason'], controversiesOrInterpretiveTensions: ['Early radical freedom and later structural constraint must not be collapsed.', 'Bad faith is not simple hypocrisy or an unconscious mechanism.', 'His political interventions include anticolonial commitments and serious errors of judgment about violence and repression.', 'Beauvoir was an independent interlocutor, not Sartre’s follower.']},
    reviewNotePath: 'docs/editorial/reviews/sartre.md', reviewLock: 'fnv1a64:413679cff8fea77b', reviewedOn,
  },
  beauvoir: {
    sources: beauvoirSources,
    defaultCitations: [q('bdv-sep', 'section', '§§1–14'), q('bdv-iep', 'section', '§§1–6')],
    sectionCitations: {
      orientation: [q('bdv-ethics', 'chapter', 'Parts I–III'), q('bdv-sep', 'section', '§§2, 4–5')],
      'life-setting': [q('bdv-sep', 'section', '§1'), q('bdv-iep', 'section', 'Biography')],
      'ambiguity-ethics': [q('bdv-ethics', 'chapter', 'Parts I–III'), q('bdv-sep', 'section', '§5')],
      'second-sex': [q('bdv-second', 'chapter', 'Introduction; Volumes I–II'), q('bdv-sep', 'section', '§7')],
      'oppression-situation': [q('bdv-second', 'chapter', 'Volume II, formation and situation chapters'), q('bdv-sep', 'section', '§§7, 10')],
      'controversies-legacy': [q('bdv-sep', 'section', '§§1–2, 14'), q('bdv-cambridge', 'work', 'Whole collection')],
    },
    evidence: evidence([q('bdv-sep', 'section', '§1'), q('bdv-iep', 'section', 'Biography')], [q('bdv-ethics', 'chapter', 'Parts I–III'), q('bdv-second', 'chapter', 'Introduction; Volumes I–II')], [q('bdv-ethics', 'work', 'Whole work'), q('bdv-second', 'work', 'Whole work')], [q('bdv-sep', 'section', '§§10–14'), q('bdv-cambridge', 'work', 'Whole collection')], [q('bdv-sep', 'section', '§§1–2, 7, 14'), q('bdv-cambridge', 'work', 'Whole collection')], [q('bdv-ethics', 'chapter', 'Parts I–III'), q('bdv-second', 'chapter', 'Introduction; Volumes I–II')]),
    patch: {region: 'France', tradition: 'Existential phenomenology, feminist philosophy, and ethics', primaryBranchIds: ['feminist-philosophy', 'existentialism', 'ethics'], secondaryBranchIds: ['phenomenology', 'political-philosophy', 'aesthetics'], contributionSummary: 'Developed an original account of ambiguity, situated freedom, oppression, embodiment, reciprocal projects, social becoming, aging, and political responsibility across philosophy, fiction, memoir, and activism.', beginnerExplanation: 'Beauvoir argues that freedom is embodied and socially situated. Biology is real, but anatomy does not dictate a fixed destiny; liberation needs material and collective changes, not advice to choose differently inside oppression.', dateDisplay: '9 January 1908–14 April 1986', dateConfidence: 'high', dateNote: 'The dates are secure. Memoirs, diaries, letters, fiction, essays, and interviews are distinct forms of self-presentation and evidence, not interchangeable autobiography.', mainIdeas: ['Ambiguity: facticity and transcendence', 'Situated and reciprocal freedom', 'Oppression and blocked futures', 'Woman as socially made Other', 'Embodiment without biological destiny', 'Immanence and transcendence', 'Aging, care, and social invisibility'], keyWorks: ['Pyrrhus and Cineas', 'The Ethics of Ambiguity', 'The Second Sex', 'The Blood of Others', 'The Mandarins', 'The Coming of Age'], controversiesOrInterpretiveTensions: ['Her relation to Sartre was reciprocal and independent, not isolated authorship.', 'The Second Sex requires attention to translation, historical setting, race, class, colonialism, sexuality, and reproductive embodiment.', 'Biographical evidence raises difficult questions about consent and institutional power.', 'Social becoming does not make gender a voluntary choice.']},
    reviewNotePath: 'docs/editorial/reviews/beauvoir.md', reviewLock: 'fnv1a64:fd03b426eb26167f', reviewedOn,
  },
  camus: {
    sources: camusSources,
    defaultCitations: [q('cam-sep', 'section', '§§1–6'), q('cam-iep', 'section', '§§1–6')],
    sectionCitations: {
      'algerian-setting': [q('cam-iep', 'section', 'Biography'), q('cam-nobel', 'work', 'Biographical record'), q('cam-sep', 'section', '§§2, 4–6')],
      absurd: [q('cam-myth', 'chapter', 'The Absurd Reasoning'), q('cam-sep', 'section', '§§1, 3')],
      'sisyphus-stranger': [q('cam-myth', 'chapter', 'The Myth of Sisyphus'), q('cam-sep', 'section', '§3')],
      'revolt-measure': [q('cam-rebel', 'chapter', 'Parts I–V'), q('cam-sep', 'section', '§4')],
      'controversies-influence': [q('cam-sep', 'section', '§§4, 6'), q('cam-iep', 'section', 'Political Philosophy and Ethics')],
    },
    evidence: evidence([q('cam-iep', 'section', 'Biography'), q('cam-nobel', 'work', 'Biographical record')], [q('cam-myth', 'chapter', 'The Absurd Reasoning; The Myth of Sisyphus'), q('cam-rebel', 'chapter', 'Parts I–V')], [q('cam-myth', 'work', 'Whole work'), q('cam-rebel', 'work', 'Whole work')], [q('cam-sep', 'section', '§§4–6'), q('cam-iep', 'section', 'Legacy and Influence')], [q('cam-sep', 'section', '§§1, 3–4, 6'), q('cam-iep', 'section', 'Political Philosophy and Ethics')], [q('cam-myth', 'chapter', 'The Absurd Reasoning; The Myth of Sisyphus'), q('cam-rebel', 'chapter', 'Parts I–V')]),
    patch: {region: 'French Algeria and France', tradition: 'Absurdity, revolt, and political essay', primaryBranchIds: ['existentialism'], secondaryBranchIds: ['ethics', 'political-philosophy', 'aesthetics', 'philosophy-of-religion'], contributionSummary: 'Explored absurdity, lucid living, revolt, solidarity, limits on political violence, and colonial contradiction across essays, fiction, drama, journalism, and public intervention while rejecting systematic philosophy and the existentialist label.', beginnerExplanation: 'Camus does not prove that nothing matters. He describes a conflict between the desire for ultimate meaning and a world that supplies no final guarantee, then asks how life, solidarity, and political limits remain possible.', dateDisplay: '7 November 1913–4 January 1960', dateConfidence: 'high', dateNote: 'The dates are secure. His fiction, journalism, philosophical essays, notebooks, and unfinished manuscripts have distinct voices; literary narrators do not automatically state Camus’s settled view.', mainIdeas: ['The absurd as a relation of demand and silence', 'Lucidity without appeal', 'Revolt, solidarity, and limits', 'Critique of ideological murder', 'Literature as philosophical exploration', 'Colonial Algeria and divided belonging'], keyWorks: ['The Stranger', 'The Myth of Sisyphus', 'The Plague', 'The Rebel', 'The Fall', 'Algerian Chronicles'], controversiesOrInterpretiveTensions: ['Camus rejected the existentialist label despite productive comparison with existentialism.', 'The absurd is not nihilism, an argument for suicide, or a motivational slogan.', 'The Rebel’s historical arguments and treatment of violence are contested.', 'His stance on the Algerian War opposed violence but inadequately met anticolonial self-determination.']},
    reviewNotePath: 'docs/editorial/reviews/camus.md', reviewLock: 'fnv1a64:a4778a8844113ac8', reviewedOn,
  },
  arendt: {
    sources: arendtSources,
    defaultCitations: [q('ard-sep', 'section', '§§1–6'), q('ard-iep', 'section', '§§1–10')],
    sectionCitations: {
      'setting-life': [q('ard-sep', 'section', '§1'), q('ard-iep', 'section', 'Chronology of Life and Works')],
      totalitarianism: [q('ard-origins', 'chapter', 'Parts I–III'), q('ard-sep', 'section', '§3')],
      'right-to-rights': [q('ard-origins', 'chapter', 'Part II, ch. 9'), q('ard-sep', 'section', '§3')],
      'vita-activa': [q('ard-human', 'chapter', 'chs. 1, 3–5'), q('ard-sep', 'section', '§4')],
      'action-plurality': [q('ard-human', 'chapter', 'chs. 5–6'), q('ard-sep', 'section', '§4')],
      eichmann: [q('ard-eichmann', 'chapter', 'chs. 5–8, Epilogue'), q('ard-sep', 'section', '§§1, 5–6')],
      'legacy-criticism': [q('ard-sep', 'section', '§6'), q('ard-iep', 'section', 'Criticisms and Controversies')],
    },
    evidence: evidence([q('ard-sep', 'section', '§1'), q('ard-iep', 'section', 'Chronology of Life and Works')], [q('ard-human', 'chapter', 'chs. 1, 3–6'), q('ard-origins', 'chapter', 'Parts I–III')], [q('ard-human', 'work', 'Whole work'), q('ard-origins', 'work', 'Whole work'), q('ard-eichmann', 'work', 'Whole work')], [q('ard-sep', 'section', '§6'), q('ard-iep', 'section', 'Influence')], [q('ard-sep', 'section', '§§3–6'), q('ard-iep', 'section', 'Criticisms and Controversies')], [q('ard-human', 'chapter', 'chs. 1, 3–6'), q('ard-origins', 'chapter', 'Part II, ch. 9')]),
    patch: {region: 'Germany, France, and the United States', tradition: 'Political theory and phenomenological political thought', primaryBranchIds: ['political-philosophy'], secondaryBranchIds: ['ethics', 'continental-philosophy', 'feminist-philosophy'], contributionSummary: 'Analyzed total domination, statelessness, action, plurality, natality, power, violence, judgment, and the shared world while leaving politically consequential exclusions open to sustained criticism.', beginnerExplanation: 'Arendt asks what people can do together when they appear as distinct equals in a shared world. Her sharp distinctions help diagnose politics, but they do not make labor, care, race, colonialism, or material justice nonpolitical.', dateDisplay: '14 October 1906–4 December 1975', dateConfidence: 'high', dateNote: 'The dates are secure. The Life of the Mind remained incomplete; Arendt’s account of judgment is reconstructed from lectures, essays, and notes rather than a finished third volume.', mainIdeas: ['Total domination, ideology, terror, and loneliness', 'Statelessness and the right to have rights', 'Labor, work, and action', 'Plurality, natality, promise, and forgiveness', 'Public world, appearance, and narrative', 'Power, violence, authority, and revolution', 'Thinking and reflective judgment'], keyWorks: ['The Origins of Totalitarianism', 'The Human Condition', 'Between Past and Future', 'On Revolution', 'Eichmann in Jerusalem', 'On Violence', 'The Life of the Mind'], controversiesOrInterpretiveTensions: ['Her accounts of race, imperialism, colonialism, and the social question have major limitations.', 'The distinction between public action and necessity is analytic, not a license to exclude care or material justice.', '“Banality of evil” neither excuses Eichmann nor completes the empirical account of his ideology and initiative.', 'Judgment was not completed as a final systematic theory.']},
    reviewNotePath: 'docs/editorial/reviews/arendt.md', reviewLock: 'fnv1a64:33b707c1b1ddfbc6', reviewedOn,
  },
};

/** Applies this sub-batch only when Sol registers it in the canonical editorial chain. */
export const applyClaimReviewBatchFollowingBEditorial = (record: Philosopher): Philosopher => {
  const config = configs[record.id];
  if (!config) return record;
  return applyModernClusterEditorialConfig(record, {
    ...config,
    articleSections: reviseSections(record, articleEdits[record.id]),
    sectionCitations: citationsFor(record, config),
  });
};
