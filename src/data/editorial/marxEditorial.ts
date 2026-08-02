import type {
  ArticleSection,
  CitationReference,
  EditorialSource,
  Philosopher,
} from '../../types/philosophy';
import {citation as c, paragraph as p, structuredClaim as claim} from './pilotHelpers';

const sources: EditorialSource[] = [
  {
    id: 'marx-sep', type: 'scholarly-reference', authors: ['Jonathan Wolff', 'David Leopold'], title: 'Karl Marx',
    containerTitle: 'The Stanford Encyclopedia of Philosophy', editors: ['Edward N. Zalta', 'Uri Nodelman'],
    publisher: 'Metaphysics Research Lab, Stanford University', edition: 'Summer 2025', year: 2025,
    url: 'https://plato.stanford.edu/archives/sum2025/entries/marx/', accessedOn: '2026-08-01',
    note: 'Specialist overview used for biography, alienation, history, political economy, morality, ideology, state, communism, and interpretive disputes.',
  },
  {
    id: 'marx-oxford-handbook', type: 'scholarly-book', authors: ['Matt Vidal (editor)', 'Tony Smith (editor)', 'Tomás Rotta (editor)', 'Paul Prew (editor)'],
    title: 'The Oxford Handbook of Karl Marx', publisher: 'Oxford University Press', year: 2019,
    doi: '10.1093/oxfordhb/9780190695545.001.0001', url: 'https://academic.oup.com/edited-volume/34643',
    note: 'Specialist chapter abstracts used only where the cited abstract supports the claim; unseen chapter detail is not treated as evidence.',
  },
  {
    id: 'marx-cambridge-companion', type: 'scholarly-book', authors: ['Terrell Carver (editor)'],
    title: 'The Cambridge Companion to Marx', publisher: 'Cambridge University Press', year: 1991,
    doi: '10.1017/CCOL0521366259', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-marx/C8B7D6342B659E2AA6203BA970A791DF/listing',
    accessedOn: '2026-08-01',
    note: 'Independent specialist collection. Only opened publisher chapter summaries and page-range metadata are used as evidence.',
  },
  {
    id: 'marx-johnson-mode-production', type: 'journal-article', authors: ['Sarah Johnson'],
    title: 'The Early Life of Marx’s “Mode of Production”', containerTitle: 'Modern Intellectual History', year: 2021,
    doi: '10.1017/S1479244319000374', url: 'https://www.cambridge.org/core/journals/modern-intellectual-history/article/abs/early-life-of-marxs-mode-of-production/2160F3361401936A97CE804B811F252D',
    accessedOn: '2026-08-01',
    note: 'The opened abstract supports the editorial-history caution around familiar mode-of-production formulations; no unseen article detail is claimed.',
  },
  {
    id: 'marx-battistini-civil-war', type: 'journal-article', authors: ['Matteo Battistini'],
    title: 'Karl Marx and the Global History of the Civil War', containerTitle: 'International Labor and Working-Class History', year: 2021,
    doi: '10.1017/S0147547921000089', url: 'https://www.cambridge.org/core/journals/international-labor-and-working-class-history/article/karl-marx-and-the-global-history-of-the-civil-war-the-slave-movement-workingclass-struggle-and-the-american-state-within-the-world-market/5FE4B6669063991CEA6B830DEF314313',
    accessedOn: '2026-08-01',
    note: 'Full specialist article used for Marx’s Civil War analysis, enslaved people’s agency, class struggle, slavery, and the world market.',
  },
  {
    id: 'marx-mega', type: 'institutional-archive', authors: ['Karl Marx', 'Friedrich Engels'],
    title: 'Marx-Engels-Gesamtausgabe (MEGA²)', publisher: 'Berlin-Brandenburg Academy of Sciences and Humanities',
    url: 'https://www.bbaw.de/en/research/marx-engels-gesamtausgabe-the-complete-works-of-marx-and-engels', accessedOn: '2026-08-01',
    note: 'Historical-critical edition project used to distinguish publications, manuscripts, correspondence, excerpts, and editorial layers.',
  },
  {
    id: 'marx-primary', type: 'primary-text', authors: ['Karl Marx', 'Friedrich Engels'],
    title: 'Marx and Engels primary-text archive', publisher: 'Marxists Internet Archive',
    url: 'https://www.marxists.org/archive/marx/works/index.htm', accessedOn: '2026-08-01',
    note: 'Public reading archive. Citations name individual work divisions; translation and editorial status are stated where material was unpublished, collaborative, or posthumously edited.',
  },
  {
    id: 'marx-heinrich', type: 'scholarly-book', authors: ['Michael Heinrich'],
    title: 'An Introduction to the Three Volumes of Karl Marx’s Capital', publisher: 'Monthly Review Press', year: 2012,
    url: 'https://monthlyreview.org/product/an_introduction_to_the_three_volumes_of_karl_marxs_capital/',
    note: 'Further reading only. This influential reconstruction is not counted as evidence for the reviewed prose.',
  },
];

const q = (sourceId: string, kind: Parameters<typeof c>[1], value: string, note?: string) => c(sourceId, kind, value, note);

const sectionCitations: Record<string, CitationReference[]> = {
  overview: [q('marx-sep', 'section', 'Article introduction; 8. Legacy'), q('marx-mega', 'work', 'MEGA² divisions I–IV'), q('marx-primary', 'work', 'Capital, Volume I; The Eighteenth Brumaire of Louis Bonaparte')],
  'life-corpus': [q('marx-sep', 'section', 'Article introduction'), q('marx-mega', 'work', 'MEGA² divisions I–IV'), q('marx-primary', 'work', 'Chronological archive and individual publication records')],
  development: [q('marx-sep', 'section', '1. Alienation and Human Flourishing; 2. Theory of History'), q('marx-primary', 'work', 'Critique of Hegel’s Philosophy of Right; Theses on Feuerbach; A Contribution to the Critique of Political Economy'), q('marx-johnson-mode-production', 'section', 'Abstract')],
  alienation: [q('marx-sep', 'section', '1. Alienation'), q('marx-primary', 'chapter', 'Economic and Philosophic Manuscripts of 1844: Estranged Labour'), q('marx-cambridge-companion', 'chapter', 'Chapter 5 — opened publisher summary')],
  'materialist-history': [q('marx-sep', 'section', '2. Theory of History'), q('marx-primary', 'work', 'The German Ideology, Part I; A Contribution to the Critique of Political Economy, Preface; Letter to Vera Zasulich and drafts'), q('marx-johnson-mode-production', 'section', 'Abstract'), q('marx-oxford-handbook', 'chapter', '36. Asia and the Shift in Marx’s Conception of Revolution and History — abstract')],
  ideology: [q('marx-sep', 'section', '5. Ideology'), q('marx-primary', 'work', 'The German Ideology, Part I; Capital, Volume I, chapter 1, section 4')],
  class: [q('marx-primary', 'work', 'The Communist Manifesto, sections I–II; The Eighteenth Brumaire; Capital, Volume III, chapter 52'), q('marx-cambridge-companion', 'chapter', 'Chapter 3 — opened publisher summary'), q('marx-sep', 'section', '2. Theory of History; 6. State and Politics')],
  'labor-process': [q('marx-primary', 'chapter', 'Capital, Volume I, chapters 7, 13–15'), q('marx-sep', 'section', '3. Economics')],
  'commodity-fetish': [q('marx-primary', 'chapter', 'Capital, Volume I, chapter 1, sections 1–4; chapters 2–3'), q('marx-sep', 'section', '3. Economics; 5. Ideology'), q('marx-oxford-handbook', 'chapter', '7. Marx’s Conceptualization of Value in Capital — abstract')],
  'method-presentation': [q('marx-primary', 'standard-division', 'Grundrisse, 1857 Introduction, section 3; Capital, Volume I, second German edition afterword'), q('marx-sep', 'section', '3.1 Reading Capital'), q('marx-cambridge-companion', 'chapter', 'Chapter 11 — opened publisher summary')],
  'value-surplus': [q('marx-primary', 'chapter', 'Capital, Volume I, chapters 1, 4–9'), q('marx-sep', 'section', '3.2 Labour theory of value; 3.3 Exploitation'), q('marx-oxford-handbook', 'chapter', '7. Marx’s Conceptualization of Value in Capital — abstract')],
  accumulation: [q('marx-primary', 'chapter', 'Capital, Volume I, chapters 23–33'), q('marx-sep', 'section', '3. Economics')],
  'circulation-reproduction': [q('marx-primary', 'work', 'Capital, Volume II, parts I–III'), q('marx-mega', 'work', 'Capital manuscripts and Engels’s editorial materials'), q('marx-oxford-handbook', 'chapter', '15. Reproduction and Crisis in Capitalist Economies — opened abstract')],
  'profit-credit-rent': [q('marx-primary', 'work', 'Capital, Volume III, parts I–VI'), q('marx-mega', 'work', 'Capital manuscripts and Engels’s editorial materials'), q('marx-sep', 'section', '3. Economics')],
  crisis: [q('marx-primary', 'chapter', 'Capital, Volume II, part III; Capital, Volume III, part III, chapter 15'), q('marx-oxford-handbook', 'chapter', '15. Reproduction and Crisis in Capitalist Economies — abstract'), q('marx-sep', 'section', '3. Economics')],
  state: [q('marx-sep', 'section', '6. State and Politics'), q('marx-primary', 'work', 'On the Jewish Question; The Eighteenth Brumaire; The Civil War in France'), q('marx-oxford-handbook', 'chapter', '16. The Capitalist State and State Power — opened abstract')],
  'revolution-communism': [q('marx-sep', 'section', '7. Utopianism'), q('marx-primary', 'work', 'The Communist Manifesto, section II; The Civil War in France; Critique of the Gotha Programme, parts I and IV'), q('marx-oxford-handbook', 'chapter', '39. Marx’s Concept of Socialism — abstract')],
  colonialism: [q('marx-primary', 'work', 'The British Rule in India; The Future Results of British Rule in India; Letter to Vera Zasulich and drafts; letter to Ludwig Kugelmann, 29 November 1869'), q('marx-oxford-handbook', 'chapter', '36. Asia and the Shift in Marx’s Conception of Revolution and History — abstract'), q('marx-sep', 'section', '2. Theory of History')],
  'race-slavery': [q('marx-primary', 'work', 'Capital, Volume I, chapter 10, section 7; IWMA address to Abraham Lincoln; Letter to Sigfrid Meyer and August Vogt, 9 April 1870'), q('marx-battistini-civil-war', 'page', '158–185'), q('marx-sep', 'section', '8. Legacy')],
  'gender-reproduction': [q('marx-primary', 'work', 'Capital, Volume I, chapter 6 and chapter 15, section 3; The German Ideology, fundamental conditions'), q('marx-cambridge-companion', 'chapter', 'Chapters 8–9 — opened publisher summaries'), q('marx-oxford-handbook', 'chapter', '17. Capitalist Social Reproduction — abstract')],
  ecology: [q('marx-primary', 'chapter', 'Capital, Volume I, chapter 15, section 10; Capital, Volume III, chapter 47'), q('marx-oxford-handbook', 'chapter', '33. Metabolic Rifts and the Ecological Crisis — opened abstract'), q('marx-sep', 'section', '3. Economics; 8. Legacy')],
  continuity: [q('marx-sep', 'section', '1. Alienation; 2. Theory of History; 3. Economics; 8. Legacy'), q('marx-mega', 'work', 'MEGA² divisions I–IV'), q('marx-primary', 'work', '1844 Manuscripts; Grundrisse; Capital, Volume I')],
  'morality-value-disputes': [q('marx-sep', 'section', '3.2 Labour theory of value; 3.3 Exploitation; 4. Morality'), q('marx-primary', 'work', 'Capital, Volume I; Critique of the Gotha Programme'), q('marx-oxford-handbook', 'chapter', '7. Marx’s Conceptualization of Value in Capital — abstract')],
  'agency-strategy': [q('marx-primary', 'work', 'The Communist Manifesto; The Eighteenth Brumaire; IWMA General Rules; Critique of the Gotha Programme'), q('marx-sep', 'section', '6. State and Politics; 7. Utopianism'), q('marx-oxford-handbook', 'chapter', '39. Marx’s Concept of Socialism — abstract')],
  'legacy-reading': [q('marx-sep', 'section', '8. Legacy; Bibliography'), q('marx-mega', 'work', 'MEGA² editorial architecture'), q('marx-primary', 'work', 'Chronological archive'), q('marx-cambridge-companion', 'chapter', 'Chapter 2 — opened publisher summary')],
};

const reviewedSections = (sections: ArticleSection[] | undefined): ArticleSection[] => (sections ?? []).map((section) => ({
  ...section,
  paragraphs: section.paragraphs.map((paragraph, index) => p(
    `marx-${section.id}-${index + 1}`,
    typeof paragraph === 'string' ? paragraph : paragraph.text,
    sectionCitations[section.id] ?? [q('marx-sep', 'section', '1–8')],
  )),
}));

const serialize = (value: unknown) => typeof value === 'string' ? value : JSON.stringify(value);

const structuredClaims = (record: Philosopher) => ({
  classification: claim(`${record.region} · ${record.tradition}`, [q('marx-sep', 'section', 'Article introduction'), q('marx-mega', 'work', 'Biographical and corpus records')]),
  date: claim(record.dateDisplay ?? record.lifespan, [q('marx-sep', 'section', 'Article introduction'), q('marx-mega', 'work', 'Biographical and correspondence records')]),
  'dating-note': claim(record.dateNote ?? '', [q('marx-sep', 'section', 'Article introduction')]),
  'contribution-summary': claim(record.contributionSummary, [q('marx-sep', 'section', '1–8'), q('marx-primary', 'work', 'Capital, Volume I; The German Ideology, Part I')]),
  'short-biography': claim(record.shortBio ?? record.lifeStory, [q('marx-sep', 'section', 'Article introduction'), q('marx-mega', 'work', 'Works, correspondence, and biographical chronology')]),
  'historical-context': claim(record.historicalContext, [q('marx-sep', 'section', 'Article introduction; 1–3'), q('marx-primary', 'work', 'Journalism, political addresses, and economic writings')]),
  'central-problem': claim(record.centralQuestions?.[0] ?? record.contributionSummary, [q('marx-sep', 'section', '1–8'), q('marx-primary', 'work', 'Economic and Philosophic Manuscripts of 1844; Capital, Volume I')]),
  branches: claim(serialize({primary: record.primaryBranchIds, secondary: record.secondaryBranchIds, memberships: record.branchMemberships}), [q('marx-sep', 'section', '1–8'), q('marx-mega', 'work', 'MEGA² divisions I–IV')]),
  'ideas-and-works': claim(serialize({ideas: record.mainIdeas, works: record.keyWorks}), [q('marx-sep', 'section', '1–8'), q('marx-mega', 'work', 'MEGA² divisions I–IV')]),
  biography: claim(serialize({lifeStory: record.lifeStory, extendedBio: record.extendedBio, lifeEvents: record.lifeEvents}), [q('marx-sep', 'section', 'Article introduction'), q('marx-mega', 'work', 'Works and correspondence chronology')]),
  explanation: claim(record.beginnerExplanation, [q('marx-sep', 'section', '1–8'), q('marx-primary', 'work', 'Economic and Philosophic Manuscripts of 1844; Capital, Volume I')]),
  influence: claim(serialize({received: record.influencesReceived, idsReceived: record.influencedByIds, later: record.influenceOnLaterThought, idsLater: record.influencedIds}), [q('marx-sep', 'section', 'Article introduction; 8. Legacy'), q('marx-cambridge-companion', 'chapter', 'Chapter 2 — opened publisher summary')]),
  'detailed-ideas': claim(serialize(record.majorIdeasDetailed), [q('marx-sep', 'section', '1–7'), q('marx-primary', 'work', 'Named primary works in paragraph citations')]),
  'detailed-works': claim(serialize(record.keyWorksDetailed), [q('marx-sep', 'section', 'Article introduction; 1–7'), q('marx-mega', 'work', 'MEGA² divisions I–IV')]),
  'development-and-disputes': claim(serialize({development: record.intellectualDevelopment, tensions: record.controversiesOrInterpretiveTensions, misunderstandings: record.commonMisunderstandings}), [q('marx-sep', 'section', '1–8'), q('marx-johnson-mode-production', 'section', 'Abstract'), q('marx-battistini-civil-war', 'page', '158–185'), q('marx-oxford-handbook', 'chapter', 'Selected opened chapter abstracts')]),
  'branch-contributions': claim(serialize(record.branchContributions), [q('marx-sep', 'section', '1–8'), q('marx-primary', 'work', 'Named primary works in paragraph citations')]),
  'reading-paths': claim(serialize({first: record.suggestedFirstReading, beginner: record.beginnerReadingPath, advanced: record.advancedReadingPath}), [q('marx-sep', 'section', 'Bibliography'), q('marx-mega', 'work', 'MEGA² editorial architecture')]),
});

export const applyMarxEditorial = (record: Philosopher): Philosopher => {
  if (record.id !== 'marx') return record;

  const reviewed: Philosopher = {
    ...record,
    name: 'Karl Marx',
    region: 'Prussia / France / Belgium / Britain',
    tradition: 'Critique of political economy / communist political thought',
    lifeStory: 'Karl Marx was born in Trier in 1818, studied in Bonn and Berlin, worked as a journalist, and lived in exile in Paris, Brussels, and London. He combined research in political economy with revolutionary journalism and organization and maintained a lifelong intellectual and political collaboration with Friedrich Engels.',
    beginnerExplanation: 'Marx asks why social powers created through collective labor confront people as commodities, capital, class power, and institutional necessity. His critique explains historically specific relations rather than reducing every event or idea to “the economy.”',
    influencedByIds: ['hegel'],
    influencedIds: ['sartre', 'beauvoir', 'fanon', 'habermas', 'angela-davis'],
    suggestedFirstReading: 'The Eighteenth Brumaire of Louis Bonaparte',
    historicalContext: 'Marx wrote amid post-Hegelian philosophy, Prussian censorship, industrial capitalism, British political economy and labor movements, French socialism, European revolutions, empire, slavery, national struggles, and the growth of international working-class organization.',
    dateDisplay: '1818–1883',
    dateConfidence: 'high',
    dateNote: 'Birth and death dates are secure. Publication and authority vary across authored books, collaborations, journalism, manuscripts, notebooks, correspondence, and Engels-edited posthumous volumes.',
    lifeEvents: [
      {year: 1818, label: 'Born in Trier', description: 'Born on 5 May in Trier in the Kingdom of Prussia.'},
      {year: 1841, label: 'Doctorate completed', description: 'Received a doctorate from the University of Jena for a dissertation on Democritus and Epicurus.'},
      {year: 1844, label: 'Paris and collaboration with Engels', description: 'Met Friedrich Engels in Paris as Marx’s turn toward political economy and communist politics accelerated.'},
      {year: 1848, label: 'Revolutionary intervention', description: 'Co-authored The Communist Manifesto with Friedrich Engels during the revolutions of 1848.'},
      {year: 1849, label: 'Exile in London', description: 'Settled in London, where he remained for the rest of his life.'},
      {year: 1864, label: 'International Working Men’s Association', description: 'Helped draft foundational documents for the First International.'},
      {year: 1867, label: 'Capital, Volume I', description: 'Published the first German edition of the only volume of Capital he completed for publication.'},
      {year: 1883, label: 'Died in London', description: 'Died on 14 March, leaving extensive manuscripts later edited and published by others.'},
    ],
    schoolMemberships: ['Marxian critique and communist politics; precursor and primary source for the later, internally diverse tradition called Marxism.'],
    branchMemberships: [
      {branchId: 'marxism', status: 'precursor', note: 'Primary source for later Marxist traditions; Marxism was constructed through later editions, parties, debates, movements, and states rather than authored as one closed system by Marx.', confidence: 'high'},
      {branchId: 'political-philosophy', status: 'major', note: 'Major critic of state, rights, class power, political emancipation, and associated production, though his institutional prescriptions remain incomplete.', confidence: 'high'},
      {branchId: 'continental-philosophy', status: 'precursor', note: 'A major nineteenth-century source for later continental philosophy and critical theory; the branch label is retrospective.', confidence: 'high'},
    ],
    branchContributions: [
      {branchId: 'marxism', summary: 'Supplies the heterogeneous primary corpus from which later Marxist parties, movements, states, and theories constructed rival inheritances rather than one closed system.'},
      {branchId: 'political-philosophy', summary: 'Analyzes political emancipation, rights, class power, state autonomy, revolution, and associated production while leaving institutional safeguards and transition underdetermined.'},
      {branchId: 'continental-philosophy', summary: 'Provides major nineteenth-century resources for later work on alienation, ideology, historical social forms, domination, and praxis; the continental category is retrospective.'},
    ],
    sourceLinks: [],
    articleSections: reviewedSections(record.articleSections),
  };

  return {
    ...reviewed,
    editorial: {
      sources,
      furtherReadingSourceIds: ['marx-heinrich'],
      structuredClaims: structuredClaims(reviewed),
      review: {
        status: 'claim-reviewed',
        reviewedOn: '2026-08-01',
        method: 'Full page-level claim review of article prose and claim-bearing structured metadata against Marx’s primary texts with genre and editorial-status controls, the MEGA² corpus architecture, independent specialist scholarship, explicit interpretive disputes, and directly reused summaries; locators and source roles were manually checked before lock generation.',
        reviewNotePath: 'docs/editorial/reviews/marx.md',
        lock: 'fnv1a64:30ab71b3a6dd1451',
        evidencePolicy: {minimumIndependentSecondarySources: 3, minimumIndependentSecondaryDomains: 3, requiredSourceTypes: ['primary-text', 'institutional-archive']},
      },
    },
  };
};
