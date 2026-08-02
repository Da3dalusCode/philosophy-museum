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

const primary = (
  id: string,
  authors: string[],
  title: string,
  year: number,
  url: string,
  note: string,
): EditorialSource => ({
  id,
  type: 'primary-text',
  authors,
  title,
  year,
  url,
  accessedOn: '2026-08-01',
  note,
});

const sources: EditorialSource[] = [
  sep('mxm-socialism-sep', ['Pablo Gilabert', 'Martin O’Neill'], 'Socialism', 'Fall 2025', 2025, 'https://plato.stanford.edu/archives/fall2025/entries/socialism/', 'Specialist account used for socialism’s definitions, institutions, strategies, democracy, and internal plurality.'),
  sep('mxm-marx-sep', ['Jonathan Wolff', 'David Leopold'], 'Karl Marx', 'Summer 2025', 2025, 'https://plato.stanford.edu/archives/sum2025/entries/marx/', 'Used to keep Marx’s own corpus distinct from later Marxist reception.'),
  {
    id: 'mxm-mega', type: 'institutional-archive', authors: ['Berlin-Brandenburg Academy of Sciences and Humanities'],
    title: 'Marx-Engels-Gesamtausgabe (MEGA²)', publisher: 'Berlin-Brandenburg Academy of Sciences and Humanities',
    url: 'https://mega.bbaw.de/de', accessedOn: '2026-08-01',
    note: 'Official historical-critical edition project used for corpus, manuscript, and posthumous editorial-status claims, including Division II.',
  },
  {
    id: 'mxm-sumpf-civil-war', type: 'scholarly-reference', authors: ['Alexandre Sumpf'],
    title: 'Russian Civil War', containerTitle: '1914-1918-Online: International Encyclopedia of the First World War',
    publisher: 'Freie Universität Berlin', year: 2014, doi: '10.15463/ie1418.10171',
    url: 'https://encyclopedia.1914-1918-online.net/article/russian-civil-war/', accessedOn: '2026-08-01',
    note: 'Open specialist article used for the civil war’s military, social, national, and political plurality, the Constituent Assembly, peasant revolt, coercion, and the end of political pluralism.',
  },
  {
    id: 'mxm-marcobelli-pacifism', type: 'scholarly-reference', authors: ['Elisa Marcobelli'],
    title: 'Pre-war Socialist Pacifism', containerTitle: '1914-1918-Online: International Encyclopedia of the First World War',
    publisher: 'Freie Universität Berlin', year: 2018, doi: '10.15463/ie1418.10526/1.1',
    url: 'https://encyclopedia.1914-1918-online.net/article/pre-war-socialist-pacifism-1-1/', accessedOn: '2026-08-01',
    note: 'Full open specialist article, version 1.1, inspected for the Second International’s antiwar debates, national loyalties, and the August 1914 fracture; its France, Germany, and Italy scope is not generalized to every member party.',
  },
  {
    id: 'mxm-loc-soviet', type: 'institutional-archive',
    authors: ['Raymond E. Zickel (editor)', 'Eugene K. Keefe (editor)', 'Library of Congress Federal Research Division'],
    title: 'Soviet Union: A Country Study', publisher: 'Federal Research Division, Library of Congress', year: 1991,
    url: 'https://www.loc.gov/item/90025756/', accessedOn: '2026-08-01',
    note: 'Full digitized institutional study, with research completed in 1989, used for high-level revolutionary and Soviet institutional chronology; paired with current specialist sources for interpretation and disputed scale.',
  },
  {
    id: 'mxm-loc-china', type: 'institutional-archive',
    authors: ['Robert L. Worden (editor)', 'Andrea Matles Savada (editor)', 'Ronald E. Dolan (editor)', 'Library of Congress Federal Research Division'],
    title: 'China: A Country Study', publisher: 'Federal Research Division, Library of Congress', year: 1988,
    url: 'https://www.loc.gov/item/87600493/', accessedOn: '2026-08-01',
    note: 'Full digitized institutional study, with research completed in 1987, used for high-level Great Leap Forward, Cultural Revolution, party-state, education, and economic chronology; paired with specialist sources and not used for exact victim totals.',
  },
  {
    id: 'mxm-sayim-comintern', type: 'journal-article', authors: ['Burak Sayim'],
    title: 'Transregional by design: The early communist press in the Middle East and global revolutionary networks',
    containerTitle: 'Journal of Global History', year: 2023, doi: '10.1017/S1740022822000250',
    url: 'https://www.cambridge.org/core/journals/journal-of-global-history/article/transregional-by-design-the-early-communist-press-in-the-middle-east-and-global-revolutionary-networks/ED8FAF8A4242E9BD914FCDB94002EC4E', accessedOn: '2026-08-01',
    note: 'Full open-access specialist article inspected for the early Comintern’s transregional networks, multilingual print logistics, anticolonial connections, and uneven centralization.',
  },
  {
    id: 'mxm-eley-marxism-revolution', type: 'scholarly-book', authors: ['Geoff Eley'],
    title: 'Marxism and Socialist Revolution',
    containerTitle: 'The Cambridge History of Communism, Volume I: World Revolution and Socialism in One Country 1917–1941',
    editors: ['Silvio Pons', 'Stephen A. Smith'], publisher: 'Cambridge University Press', year: 2017,
    doi: '10.1017/9781316137024',
    url: 'https://www.cambridge.org/core/books/cambridge-history-of-communism/marxism-and-socialist-revolution/23198CE3741CE430152F5DFAE04BC0C5',
    accessedOn: '2026-08-01',
    note: 'Full open chapter HTML, pp. 49–73, inspected for mass socialist parties, Kautsky and Bebel, deterministic expectations, reform and revolution, national loyalties, and colonial policy.',
  },
  {
    id: 'mxm-council-democracy', type: 'journal-article', authors: ['Benjamin Ask Popp-Madsen', 'Gaard Kets'],
    title: 'Workers’ Councils and Radical Democracy: Toward a Conceptual History of Council Democracy from Marx to Occupy',
    containerTitle: 'Polity', year: 2021, doi: '10.1086/711750',
    url: 'https://research-api.cbs.dk/ws/portalfiles/portal/66877904/benjamin_ask_popp_madsen_et_al_workers_councils_and_radical_democracy_publishersversion.pdf', accessedOn: '2026-08-01',
    note: 'Final published repository PDF, 53(1), pp. 160–188, inspected for Lenin’s and interwar council communists’ competing council models and the institutional difficulties of council democracy.',
  },
  {
    id: 'mxm-cambridge-thought', type: 'scholarly-book', authors: ['Terence Ball (editor)', 'Richard Bellamy (editor)'],
    title: 'The Cambridge History of Twentieth-Century Political Thought', publisher: 'Cambridge University Press', year: 2003,
    doi: '10.1017/CHOL9780521563543', url: 'https://www.cambridge.org/core/books/cambridge-history-of-twentiethcentury-political-thought/DA22CCF70AD0B5A45671D7C6B82E3835',
    accessedOn: '2026-08-01', note: 'Publisher volume and chapter records inspected for the Second International, Russian Revolution, Asian communism, Western Marxism, and French Marxism; record-level citations are labeled and do not stand alone for unseen detail.',
  },
  {
    id: 'mxm-cambridge-communism-v1', type: 'scholarly-book', authors: ['Silvio Pons (editor)', 'Stephen A. Smith (editor)'],
    title: 'The Cambridge History of Communism, Volume I: World Revolution and Socialism in One Country 1917–1941', publisher: 'Cambridge University Press', year: 2017,
    doi: '10.1017/9781316137024', url: 'https://www.cambridge.org/core/books/the-cambridge-history-of-communism/B9C5FA2BB979884CAC7E9EFEB6B70439',
    accessedOn: '2026-08-01', note: 'Volume and named chapter records used for pre-1941 international communist history; locators do not imply access to paywalled chapter text.',
  },
  {
    id: 'mxm-cambridge-communism', type: 'scholarly-book', authors: ['Norman Naimark (editor)', 'Silvio Pons (editor)', 'Sophie Quinn-Judge (editor)'],
    title: 'The Cambridge History of Communism, Volume II: The Socialist Camp and World Power 1941–1960s', publisher: 'Cambridge University Press', year: 2017,
    doi: '10.1017/9781316459850',
    url: 'https://www.cambridge.org/core/books/cambridge-history-of-communism/cambridge-history-of-communism/15B6431C4C6E6B765CC6C438CC0EFB6E',
    accessedOn: '2026-08-01', note: 'Volume II and named chapter records used for post-1941 communist history; locators do not imply access to paywalled chapter text.',
  },
  {
    id: 'mxm-mawdsley-wwii', type: 'scholarly-book', authors: ['Evan Mawdsley'],
    title: 'World War II, Soviet Power and International Communism',
    containerTitle: 'The Cambridge History of Communism, Volume II: The Socialist Camp and World Power 1941–1960s',
    editors: ['Norman Naimark', 'Silvio Pons', 'Sophie Quinn-Judge'], publisher: 'Cambridge University Press', year: 2017,
    url: 'https://www.cambridge.org/core/books/cambridge-history-of-communism/world-war-ii-soviet-power-and-international-communism/E4B56BD42512E2A06300341C591C0003', accessedOn: '2026-08-01',
    note: 'Full chapter PDF, pp. 15–37, inspected for the Popular Front, Nazi–Soviet pact, June 1941 reversal, Comintern dissolution, wartime resistance, Soviet victory, and postwar expansion.',
  },
  {
    id: 'mxm-ripp-hungary', type: 'journal-article', authors: ['Zoltán Ripp'],
    title: 'Hungary’s Part in the Soviet–Yugoslav Conflict, 1956–58', containerTitle: 'Contemporary European History',
    year: 1998, doi: '10.1017/S0960777300004872',
    url: 'https://www.cambridge.org/core/journals/contemporary-european-history/article/hungarys-part-in-the-sovietyugoslav-conflict-195658/6479D038AADAE6F92DEDA13D92700051', accessedOn: '2026-08-01',
    note: 'Full article PDF inspected for the suppression of the Hungarian revolution, Soviet regional constraints, and the Imre Nagy conflict.',
  },
  {
    id: 'mxm-weiner-prague', type: 'journal-article', authors: ['Amir Weiner'],
    title: 'Déjà Vu All Over Again: Prague Spring, Romanian Summer and Soviet Autumn on the Soviet Western Frontier',
    containerTitle: 'Contemporary European History', year: 2006, doi: '10.1017/S0960777306003195',
    url: 'https://www.cambridge.org/core/journals/contemporary-european-history/article/deja-vu-all-over-again-prague-spring-romanian-summer-and-soviet-autumn-on-the-soviet-western-frontier/2C59B9753B623F0A04E753347CEE8D7F', accessedOn: '2026-08-01',
    note: 'Full article PDF inspected for the Prague Spring, Soviet intervention, reform, and frontier politics.',
  },
  {
    id: 'mxm-didonato-eurocommunism', type: 'journal-article', authors: ['Michele Di Donato'],
    title: 'The Cold War and Socialist Identity: The Socialist International and the Italian “Communist Question” in the 1970s',
    containerTitle: 'Contemporary European History', year: 2015, doi: '10.1017/S0960777315000053',
    url: 'https://www.cambridge.org/core/journals/contemporary-european-history/article/cold-war-and-socialist-identity-the-socialist-international-and-the-italian-communist-question-in-the-1970s/EFD9E054DBE92B6DC5FB165CFE2F6ACD', accessedOn: '2026-08-01',
    note: 'Full article inspected for Italian Eurocommunism, constitutional transformation, Western communist coordination, Soviet opposition, and the project’s limits.',
  },
  {
    id: 'mxm-oxford-communism', type: 'scholarly-book', authors: ['Stephen A. Smith (editor)'],
    title: 'The Oxford Handbook of the History of Communism', publisher: 'Oxford University Press', year: 2014,
    doi: '10.1093/oxfordhb/9780199602056.001.0001', url: 'https://academic.oup.com/edited-volume/35402',
    accessedOn: '2026-08-01', note: 'Specialist handbook used at introduction and named chapter level; locators do not imply inspection beyond those records.',
  },
  {
    id: 'mxm-communist-terror', type: 'scholarly-book', authors: ['Julia C. Strauss'],
    title: 'Communist Revolution and Political Terror', containerTitle: 'The Oxford Handbook of the History of Communism',
    publisher: 'Oxford University Press', year: 2014, doi: '10.1093/oxfordhb/9780199602056.013.020',
    url: 'https://academic.oup.com/edited-volume/35402/chapter-abstract/302648894', accessedOn: '2026-08-01',
    note: 'Opened abstract used to preserve disputes over definitions, scale, victim counts, and deliberate versus policy-generated deaths.',
  },
  {
    id: 'mxm-harris-terror', type: 'scholarly-book', authors: ['James Harris'], title: 'The Great Fear: Stalin’s Terror of the 1930s',
    publisher: 'Oxford University Press', year: 2016, doi: '10.1093/acprof:oso/9780199695768.001.0001',
    url: 'https://academic.oup.com/book/6046', accessedOn: '2026-08-01',
    note: 'Book abstract only; used for high-level Stalin-terror framing, not unseen page detail.',
  },
  {
    id: 'mxm-macf-cultural-revolution', type: 'scholarly-book', authors: ['Roderick MacFarquhar'], title: 'The Origins of the Cultural Revolution, Volume 3',
    publisher: 'Oxford University Press', year: 1997, doi: '10.1093/acprof:oso/9780192149978.001.0001',
    url: 'https://academic.oup.com/book/34582', accessedOn: '2026-08-01',
    note: 'Book abstract only; used for high-level famine-aftermath and Cultural Revolution framing without exact death totals.',
  },
  {
    id: 'mxm-oxford-marx', type: 'scholarly-book', authors: ['Matt Vidal (editor)', 'Tony Smith (editor)', 'Tomás Rotta (editor)', 'Paul Prew (editor)'],
    title: 'The Oxford Handbook of Karl Marx', publisher: 'Oxford University Press', year: 2019,
    doi: '10.1093/oxfordhb/9780190695545.001.0001', url: 'https://academic.oup.com/edited-volume/34643',
    accessedOn: '2026-08-01', note: 'Specialist handbook used at named chapter or abstract level with those limits stated in locators.',
  },
  {
    id: 'mxm-sage-marxism', type: 'scholarly-book', authors: ['Beverley Skeggs (editor)', 'Sara R. Farris (editor)', 'Alberto Toscano (editor)', 'Svenja Bromberg (editor)'],
    title: 'The SAGE Handbook of Marxism', publisher: 'SAGE', year: 2022, isbn: '9781473974234',
    url: 'https://uk.sagepub.com/en-gb/eur/the-sage-handbook-of-marxism/book248518', accessedOn: '2026-08-01',
    note: 'Broad specialist handbook used by named chapter records for internal traditions and contemporary extensions.',
  },
  {
    id: 'mxm-western-cambridge', type: 'scholarly-book', authors: ['Max Pensky'], title: 'Western Marxism: Revolutions in Theory',
    containerTitle: 'The Cambridge History of Modern European Thought', publisher: 'Cambridge University Press', year: 2019,
    doi: '10.1017/9781316160879.011', url: 'https://www.cambridge.org/core/books/abs/cambridge-history-of-modern-european-thought/western-marxism-revolutions-in-theory/2ABC70825404C8CA15F5350880BB6F85',
    accessedOn: '2026-08-01', note: 'Specialist chapter record used for the retrospective and contested Western Marxism category.',
  },
  sep('mxm-gramsci-sep', ['James Martin'], 'Antonio Gramsci', 'Spring 2025', 2025, 'https://plato.stanford.edu/archives/spr2025/entries/gramsci/', 'Specialist account used for hegemony, civil society, organization, and the Prison Notebooks’ textual history.'),
  sep('mxm-critical-theory-sep', ['Robin Celikates', 'Jeffrey Flynn'], 'Critical Theory (Frankfurt School)', 'Spring 2024', 2024, 'https://plato.stanford.edu/archives/spr2024/entries/critical-theory/', 'Specialist genealogy and map of Frankfurt School and later critical-theory disputes.'),
  sep('mxm-lukacs-sep', ['Titus Stahl'], 'Georg [György] Lukács', 'Spring 2024', 2024, 'https://plato.stanford.edu/archives/spr2024/entries/lukacs/', 'Specialist account used for reification, class consciousness, and Lukács’s reception.'),
  sep('mxm-althusser-sep', ['William Lewis'], 'Louis Althusser', 'Spring 2017', 2017, 'https://plato.stanford.edu/archives/spr2017/entries/althusser/', 'Specialist account used for structural Marxism, ideology, reproduction, and agency disputes.'),
  sep('mxm-analytical-sep', ['David Leopold'], 'Analytical Marxism', 'Winter 2022', 2022, 'https://plato.stanford.edu/archives/win2022/entries/marxism-analytical/', 'Specialist account preserving the movement’s internal diversity and contested boundaries.'),
  sep('mxm-ideology-sep', ['William Clare Roberts'], 'Ideology', 'Spring 2026', 2026, 'https://plato.stanford.edu/archives/spr2026/entries/ideology/', 'Specialist account used for competing Marxian concepts of ideology.'),
  sep('mxm-colonialism-sep', ['Margaret Kohn', 'Kavita Reddy'], 'Colonialism', 'Spring 2023', 2023, 'https://plato.stanford.edu/archives/spr2023/entries/colonialism/', 'Specialist account of Marxist, anticolonial, postcolonial, and decolonial arguments.'),
  sep('mxm-fanon-sep', ['John Drabinski'], 'Frantz Fanon', 'Spring 2024', 2024, 'https://plato.stanford.edu/archives/spr2024/entries/frantz-fanon/', 'Specialist account used for Fanon’s transformative relation to Marxism and anticolonial struggle.'),
  sep('mxm-liberation-sep', ['Eduardo Mendieta'], 'Philosophy of Liberation', 'Spring 2022', 2022, 'https://plato.stanford.edu/archives/spr2022/entries/liberation/', 'Specialist account used for distinct religious and decolonial encounters with Marxian analysis.'),
  sep('mxm-latin-america-sep', ['Jorge J. E. Gracia', 'Manuel Vargas'], 'Latin American Philosophy', 'Spring 2025', 2025, 'https://plato.stanford.edu/archives/spr2025/entries/latin-american-philosophy/', 'Specialist account used for heterodox Latin American Marxism and Mariátegui’s rejection of a copied European stage sequence in Peru.'),
  sep('mxm-feminism-class-sep', ['Ann Ferguson', 'Rosemary Hennessy', 'Mechthild Nagel'], 'Feminist Perspectives on Class and Work', 'Fall 2024', 2024, 'https://plato.stanford.edu/archives/fall2024/entries/feminism-class/', 'Specialist account used for Engels, domestic-labor and dual-systems disputes, social reproduction, unpaid work, global care, and race-and-class criticism.'),
  {
    id: 'mxm-douglas-james', type: 'journal-article', authors: ['Rachel Douglas'],
    title: 'Unsilencing the Haitian Revolution: C. L. R. James and The Black Jacobins', containerTitle: 'Atlantic Studies',
    year: 2022, doi: '10.1080/14788810.2020.1839283', url: 'https://eprints.gla.ac.uk/224159/', accessedOn: '2026-08-01',
    note: 'Full open published article, 19(2), pp. 281–304, inspected for James’s changing account of the Haitian Revolution, mass agency, and history from below.',
  },
  {
    id: 'mxm-davis-ore', type: 'scholarly-reference', authors: ['Catherine R. Squires'], title: 'Angela Y. Davis and Communication Studies',
    containerTitle: 'Oxford Research Encyclopedia of Communication', publisher: 'Oxford University Press', year: 2018,
    doi: '10.1093/acrefore/9780190228613.013.597', url: 'https://academic.oup.com/edited-volume/61798/chapter-abstract/546221525', accessedOn: '2026-08-01',
    note: 'Opened peer-reviewed reference abstract and contents used only for Davis’s synthesis of Marxist, feminist, critical-race, and cultural analysis and the documented range of her work.',
  },
  {
    id: 'mxm-dependency-ore', type: 'scholarly-reference', authors: ['Ray Kiely'], title: 'Dependency and World-Systems Perspectives on Development',
    containerTitle: 'Oxford Research Encyclopedia of International Studies', publisher: 'Oxford University Press', year: 2017,
    doi: '10.1093/acrefore/9780190846626.013.142', url: 'https://academic.oup.com/edited-volume/61835/chapter-abstract/546990418',
    accessedOn: '2026-08-01', note: 'Opened abstract and critical assessment used for dependency and world-systems claims and objections.',
  },
  {
    id: 'mxm-workers-inquiry', type: 'journal-article', authors: ['Jamie Woodcock'], title: 'The Workers’ Inquiry from Trotskyism to Operaismo',
    containerTitle: 'Ephemera', year: 2014, url: 'https://ora.ox.ac.uk/objects/uuid%3A9e91124e-5842-49f9-ae6d-15b2bcd9e8e2',
    accessedOn: '2026-08-01', note: 'Peer-reviewed repository article used for workerism, inquiry, and autonomist development.',
  },
  {
    id: 'mxm-robinson', type: 'scholarly-book', authors: ['Cedric J. Robinson'], title: 'Black Marxism: The Making of the Black Radical Tradition',
    publisher: 'University of North Carolina Press', edition: 'Revised third edition', year: 2020,
    url: 'https://uncpress.org/9781469663739/black-marxism-revised-and-updated-third-edition/', accessedOn: '2026-08-01',
    note: 'Publisher argument and JSTOR introduction/contents were inspected; citations stay at Introduction or named-division level.',
  },
  {
    id: 'mxm-du-bois', type: 'primary-text', authors: ['W. E. B. Du Bois'], title: 'Black Reconstruction in America',
    year: 1935, url: 'https://www.bard.edu/library/pdfs/archives/Du_Bois-Black_Reconstruction_in_America.pdf', accessedOn: '2026-08-01',
    note: 'Institutionally hosted scan used for chapter 4 and chapters 14–17.',
  },
  {
    id: 'mxm-ecology-rift', type: 'scholarly-book', authors: ['Brett Clark', 'John Bellamy Foster', 'Stefano B. Longo'],
    title: 'Metabolic Rifts and the Ecological Crisis', containerTitle: 'The Oxford Handbook of Karl Marx',
    publisher: 'Oxford University Press', year: 2019, doi: '10.1093/oxfordhb/9780190695545.013.38',
    url: 'https://academic.oup.com/edited-volume/34643/chapter-abstract/295197964', accessedOn: '2026-08-01',
    note: 'Opened chapter abstract used for the metabolic-rift reconstruction.',
  },
  {
    id: 'mxm-ecology-critical', type: 'scholarly-book', authors: ['Mathew Humphrey'], title: 'New Marx for Old? Marxism, Humanity, and Ecology',
    containerTitle: 'Preservation Versus the People?', publisher: 'Oxford University Press', year: 2002,
    doi: '10.1093/0199242674.003.0005', url: 'https://academic.oup.com/book/5696/chapter-abstract/148805452',
    accessedOn: '2026-08-01', note: 'Opened abstract used as a counterweight in the productivism/ecology dispute.',
  },
  primary('mxm-engels-socialism', ['Friedrich Engels'], 'Socialism: Utopian and Scientific', 1880, 'https://www.marxists.org/archive/marx/works/1880/soc-utop/index.htm', 'Authorized 1892 Aveling English edition; cited by Introduction and Parts I–III. MIA supplies an accessible historical translation, not a neutral critical edition.'),
  primary('mxm-bernstein', ['Eduard Bernstein'], 'Evolutionary Socialism', 1899, 'https://www.marxists.org/reference/archive/bernstein/works/1899/evsoc/index.htm', 'Accessible 1907 English translation cited by named divisions and conclusion.'),
  primary('mxm-luxemburg-reform', ['Rosa Luxemburg'], 'Reform or Revolution', 1900, 'https://www.marxists.org/archive/luxemburg/1900/reform-revolution/index.htm', 'Primary text cited by Parts One–Two; later revision status is retained.'),
  primary('mxm-luxemburg-mass-strike', ['Rosa Luxemburg'], 'The Mass Strike, the Political Party and the Trade Unions', 1906, 'https://www.marxists.org/archive/luxemburg/1906/mass-strike/index.htm', 'Primary text cited by sections 3–7; organizational interpretation remains disputed.'),
  primary('mxm-luxemburg-russian', ['Rosa Luxemburg'], 'The Russian Revolution', 1918, 'https://www.marxists.org/archive/luxemburg/1918/russian-revolution/', 'Written in 1918 and published posthumously in 1922; cited by chapters 1–8.'),
  primary('mxm-luxemburg-accumulation', ['Rosa Luxemburg'], 'The Accumulation of Capital', 1913, 'https://www.marxists.org/archive/luxemburg/1913/accumulation-capital/index.htm', 'Accessible English translation cited by Section III, chapters 26–32, for Luxemburg’s account of imperial expansion; translation and interpretation are not treated as neutral or uncontested.'),
  primary('mxm-lenin-witbd', ['Vladimir Lenin'], 'What Is To Be Done?', 1902, 'https://www.marxists.org/archive/lenin/works/1901/witbd/', 'Primary text cited by chapters II–V and kept distinct from later party practice.'),
  primary('mxm-lenin-imperialism', ['Vladimir Lenin'], 'Imperialism, the Highest Stage of Capitalism', 1916, 'https://www.marxists.org/archive/lenin/works/1916/imp-hsc/', 'Primary text cited by chapters I–X; periodization and later applicability remain disputed.'),
  primary('mxm-lenin-april', ['Vladimir Lenin'], 'The April Theses', 1917, 'https://www.marxists.org/archive/lenin/works/1917/apr/07.htm', 'Primary intervention cited by theses 1–10.'),
  primary('mxm-lenin-state', ['Vladimir Lenin'], 'State and Revolution', 1917, 'https://www.marxists.org/archive/lenin/works/1917/staterev/', 'Primary text cited by chapters I–VI and distinguished from later governing institutions.'),
  primary('mxm-mao-practice', ['Mao Zedong'], 'On Practice', 1937, 'https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_16.htm', 'Accessible primary text; translation status is not treated as neutral or definitive.'),
  primary('mxm-mao-contradiction', ['Mao Zedong'], 'On Contradiction', 1937, 'https://www.marxists.org/reference/archive/mao/selected-works/volume-1/mswv1_17.htm', 'Accessible primary text cited by sections I–VII.'),
  primary('mxm-mao-leadership', ['Mao Zedong'], 'Some Questions Concerning Methods of Leadership', 1943, 'https://www.marxists.org/reference/archive/mao/selected-works/volume-3/mswv3_13.htm', 'Accessible primary text cited by numbered paragraphs 1–6.'),
  primary('mxm-mao-correct', ['Mao Zedong'], 'On the Correct Handling of Contradictions Among the People', 1957, 'https://www.marxists.org/reference/archive/mao/selected-works/volume-5/mswv5_58.htm', 'Accessible primary text cited by sections I–XII.'),
  primary('mxm-lukacs-reification', ['Georg Lukács'], 'Reification and the Consciousness of the Proletariat', 1923, 'https://www.marxists.org/archive/lukacs/works/history/hcc05.htm', 'Primary essay from History and Class Consciousness cited by Parts I–III.'),
  primary('mxm-pannekoek-councils', ['Anton Pannekoek'], 'Workers’ Councils', 1936, 'https://www.marxists.org/archive/pannekoe/1936/councils.htm', 'Accessible primary essay cited by sections 1–2 for the council-communist case for workers’ self-government; archive transcription is not treated as a critical edition.'),
  primary('mxm-trotsky-revolution-betrayed', ['Leon Trotsky'], 'The Revolution Betrayed', 1936, 'https://www.marxists.org/archive/trotsky/1936/revbet/', 'Accessible primary text cited by chapters IX–XI for Trotsky’s account of bureaucracy, property, democracy, party rule, and political revolution; archive translation is not treated as a critical edition.'),
  primary('mxm-davis-housework', ['Angela Y. Davis'], 'Women, Race & Class, Chapter 13: The Approaching Obsolescence of Housework: A Working-Class Perspective', 1981, 'https://www.marxists.info/subject/women/authors/davis-angela/housework.htm', 'Accessible chapter transcription used for Davis’s analysis of racialized and gendered housework and working-class feminism; it is not a critical edition.'),
  primary('mxm-marx-religion', ['Karl Marx'], 'Introduction to A Contribution to the Critique of Hegel’s Philosophy of Right', 1844, 'https://www.marxists.org/archive/marx/works/1843/critique-hpr/intro.htm', 'Primary text cited around the religion discussion and transition from theological to political criticism.'),
  {
    id: 'mxm-marx-engels-reader', type: 'scholarly-book', authors: ['Robert C. Tucker (editor)'], title: 'The Marx-Engels Reader',
    publisher: 'W. W. Norton', edition: 'Second edition', year: 1978, isbn: '9780393090406',
    url: 'https://wwnorton.com/books/9780393090406', note: 'Further reading only; not counted as evidence for reviewed claims.',
  },
];

const recordLevelBoundaries: Record<string, string> = {
  'mxm-cambridge-thought': 'opened chapter record',
  'mxm-cambridge-communism-v1': 'opened volume/chapter records',
  'mxm-cambridge-communism': 'opened volume/chapter records',
  'mxm-oxford-communism': 'opened introduction/chapter records',
  'mxm-oxford-marx': 'opened abstract/chapter record',
  'mxm-sage-marxism': 'opened contents/chapter records',
  'mxm-western-cambridge': 'opened chapter record',
};

const q = (sourceId: string, kind: Parameters<typeof c>[1], value: string, note?: string) => {
  const boundary = recordLevelBoundaries[sourceId];
  const boundedValue = boundary && !value.includes('opened') ? `${value} — ${boundary}` : value;
  return c(sourceId, kind, boundedValue, note);
};

const sectionCitations: Record<string, CitationReference[][]> = {
  'contested-family': [
    [q('mxm-socialism-sep', 'section', '1–2'), q('mxm-sage-marxism', 'chapter', 'Editors’ introduction; chapters 17, 22, 31')],
    [q('mxm-socialism-sep', 'section', '2; 4–5'), q('mxm-oxford-communism', 'chapter', 'Introduction'), q('mxm-cambridge-thought', 'chapter', '10–14')],
  ],
  'marx-engels': [
    [q('mxm-mega', 'standard-division', 'Divisions I–II'), q('mxm-oxford-communism', 'chapter', '1'), q('mxm-marx-sep', 'section', '1; 8')],
    [q('mxm-mega', 'standard-division', 'Division II'), q('mxm-engels-socialism', 'standard-division', 'Introduction; Parts II–III'), q('mxm-oxford-communism', 'chapter', '1')],
  ],
  'second-international': [
    [q('mxm-eley-marxism-revolution', 'page', '49–73, especially the discussion of mass parties, Kautsky, Bebel, and deterministic expectation'), q('mxm-cambridge-thought', 'chapter', '10, pp. 217–238'), q('mxm-engels-socialism', 'standard-division', 'Parts II–III')],
    [q('mxm-eley-marxism-revolution', 'page', '49–73, especially internationalism, national loyalties, and colonial policy'), q('mxm-marcobelli-pacifism', 'section', 'Introduction; 2.2; 3.3; Conclusion'), q('mxm-colonialism-sep', 'section', '4')],
  ],
  revisionism: [
    [q('mxm-bernstein', 'standard-division', 'I(b–c); II(b–d); III(c–d); Conclusion'), q('mxm-eley-marxism-revolution', 'page', '49–73, especially reform, revisionism, and orthodox strategy')],
    [q('mxm-luxemburg-reform', 'standard-division', 'Parts One–Two'), q('mxm-socialism-sep', 'section', '4–5')],
  ],
  luxemburg: [
    [q('mxm-luxemburg-reform', 'standard-division', 'Parts One–Two'), q('mxm-luxemburg-mass-strike', 'section', '3–7'), q('mxm-luxemburg-accumulation', 'standard-division', 'Section III, chapters 26–32, especially 27 and 31')],
    [q('mxm-luxemburg-russian', 'chapter', '1; 4–8'), q('mxm-oxford-communism', 'chapter', '2'), q('mxm-cambridge-thought', 'chapter', '11')],
  ],
  lenin: [
    [q('mxm-lenin-witbd', 'chapter', 'II–V'), q('mxm-lenin-imperialism', 'chapter', 'I; VII–X'), q('mxm-oxford-communism', 'chapter', '2')],
    [q('mxm-lenin-april', 'standard-division', 'Theses 1–10'), q('mxm-lenin-state', 'chapter', 'II–III; V–VI'), q('mxm-sumpf-civil-war', 'section', '1–4.2, especially labor militarization, Kronstadt, and Red Army coercion'), q('mxm-loc-soviet', 'section', 'Revolutions and Civil War; The Era of the New Economic Policy')],
  ],
  'russian-revolution': [
    [q('mxm-sumpf-civil-war', 'section', '1–4.2'), q('mxm-loc-soviet', 'section', 'Revolutions and Civil War; The Era of the New Economic Policy'), q('mxm-luxemburg-russian', 'chapter', '2; 4–8')],
    [q('mxm-sumpf-civil-war', 'section', '2–4'), q('mxm-loc-soviet', 'section', 'Revolutions and Civil War; The Era of the New Economic Policy'), q('mxm-socialism-sep', 'section', '5')],
  ],
  'comintern-antifascism': [
    [q('mxm-sayim-comintern', 'page', '216–235, especially 216–218 and “A network of linguistic networks and the logistics of a multi-typeface operation”'), q('mxm-mawdsley-wwii', 'page', '17–20')],
    [q('mxm-mawdsley-wwii', 'page', '17–20; 24–26; 29–35')],
  ],
  'soviet-orthodoxy': [
    [q('mxm-loc-soviet', 'section', 'Transformation and Terror; The Communist Party'), q('mxm-harris-terror', 'section', 'Book abstract'), q('mxm-communist-terror', 'chapter', '20 — abstract')],
    [q('mxm-loc-soviet', 'section', 'Reconstruction and Cold War; The Khrushchev Era; The Brezhnev Era; The Communist Party'), q('mxm-oxford-communism', 'chapter', '3; 7; 9; 21–22; 31–34'), q('mxm-cambridge-communism', 'work', 'Volume II')],
  ],
  oppositions: [
    [q('mxm-council-democracy', 'page', '160–188, especially “The Councils as Revolutionary Organs” and the interwar council-communist discussion'), q('mxm-pannekoek-councils', 'section', '1–2'), q('mxm-trotsky-revolution-betrayed', 'chapter', 'IX–XI, especially “State Capitalism?”, “Is the Bureaucracy a Ruling Class?”, “The Soviets and Democracy”, and “Democracy and the Party”')],
    [q('mxm-council-democracy', 'page', '160–188, especially the council system’s coordination and durability problems'), q('mxm-sumpf-civil-war', 'section', '2–4.2, especially labor militarization, Kronstadt, and Red Army coercion'), q('mxm-luxemburg-russian', 'chapter', '4–8'), q('mxm-socialism-sep', 'section', '4–5')],
  ],
  'postwar-eurocommunism': [
    [q('mxm-mawdsley-wwii', 'page', '29–35'), q('mxm-ripp-hungary', 'page', '197–205, especially section II and 204–205'), q('mxm-weiner-prague', 'page', '159–161; 184–190')],
    [q('mxm-didonato-eurocommunism', 'page', '201–205; 210–211; sections “The rise of Italian communism,” “Socialist leaders and Western policymaking,” and Conclusion')],
  ],
  gramsci: [
    [q('mxm-gramsci-sep', 'section', '3.1–3.5'), q('mxm-sage-marxism', 'chapter', '25; 31')],
    [q('mxm-gramsci-sep', 'section', '3.2–3.6; 4')],
  ],
  'western-marxism': [
    [q('mxm-lukacs-sep', 'section', '3.1–3.3'), q('mxm-lukacs-reification', 'standard-division', 'Parts I–III'), q('mxm-western-cambridge', 'page', '259–288')],
    [q('mxm-western-cambridge', 'page', '259–288'), q('mxm-cambridge-thought', 'chapter', '13–14'), q('mxm-critical-theory-sep', 'section', '1.2; 1.7')],
  ],
  'frankfurt-school': [
    [q('mxm-critical-theory-sep', 'section', '1.1–1.5')],
    [q('mxm-critical-theory-sep', 'section', '1.6–1.7; 2.2–2.5; 4.1–4.3')],
  ],
  'maoism-theory': [
    [q('mxm-mao-practice', 'work', 'Whole essay'), q('mxm-mao-leadership', 'standard-division', 'Numbered paragraphs 1–6'), q('mxm-oxford-communism', 'chapter', '4; 12')],
    [q('mxm-mao-contradiction', 'section', 'III–VI'), q('mxm-mao-correct', 'section', 'I–II'), q('mxm-oxford-communism', 'chapter', '4; 12')],
  ],
  'maoism-power': [
    [q('mxm-loc-china', 'section', 'The Great Leap Forward, 1958–60; The Cultural Revolution, 1966–76; Education and Culture'), q('mxm-macf-cultural-revolution', 'section', 'Book abstract'), q('mxm-communist-terror', 'chapter', '20 — abstract')],
    [q('mxm-loc-china', 'section', 'The Cultural Revolution, 1966–76; Party and Government; Political Realignments at the Party Center'), q('mxm-macf-cultural-revolution', 'section', 'Book abstract'), q('mxm-communist-terror', 'chapter', '20 — abstract', 'Exact death totals omitted; scale and causation remain disputed')],
  ],
  anticolonial: [
    [q('mxm-colonialism-sep', 'section', '4–5'), q('mxm-fanon-sep', 'section', 'Whole entry'), q('mxm-latin-america-sep', 'section', '2.3, socialist and Marxist thought; 3.1, Mariátegui and Indigenous land'), q('mxm-douglas-james', 'page', '281–304, especially the abstract and discussion of mass agency and history from below')],
    [q('mxm-colonialism-sep', 'section', '5'), q('mxm-liberation-sep', 'section', '2'), q('mxm-latin-america-sep', 'section', '2.3, philosophy of liberation')],
  ],
  'dependency-world-systems': [
    [q('mxm-dependency-ore', 'section', 'Abstract; critical assessment'), q('mxm-colonialism-sep', 'section', '4')],
    [q('mxm-dependency-ore', 'section', 'Abstract; critical assessment'), q('mxm-sage-marxism', 'chapter', '23; 47; 60; 62')],
  ],
  'black-marxisms': [
    [q('mxm-du-bois', 'chapter', '4; 14–17'), q('mxm-sage-marxism', 'chapter', '13–14; 58'), q('mxm-davis-ore', 'section', 'Opened abstract; contents “Race, Gender, and Class” and “The Prison-Industrial Complex”'), q('mxm-davis-housework', 'chapter', '13')],
    [q('mxm-robinson', 'page', 'Introduction, pp. 1–6; named book divisions'), q('mxm-sage-marxism', 'chapter', '58')],
  ],
  'feminist-marxisms': [
    [q('mxm-feminism-class-sep', 'section', '1–5'), q('mxm-sage-marxism', 'chapter', '3; 15; 74; 78')],
    [q('mxm-feminism-class-sep', 'section', '2; 4–5; 7; 9'), q('mxm-sage-marxism', 'chapter', '3; 34; 57; 74; 78')],
  ],
  'humanism-structuralism': [
    [q('mxm-marx-sep', 'section', '2; 8'), q('mxm-cambridge-thought', 'chapter', '14'), q('mxm-mega', 'work', 'Corpus and publication history')],
    [q('mxm-althusser-sep', 'section', '3.2–3.5; 4.2–4.3'), q('mxm-ideology-sep', 'section', '1.3.2'), q('mxm-cambridge-thought', 'chapter', '14')],
  ],
  autonomism: [
    [q('mxm-workers-inquiry', 'page', '493–513'), q('mxm-sage-marxism', 'chapter', '7; 77')],
    [q('mxm-workers-inquiry', 'page', '493–513'), q('mxm-sage-marxism', 'chapter', '3; 74; 78; 83')],
  ],
  'analytical-marxism': [
    [q('mxm-analytical-sep', 'section', '1–4')],
    [q('mxm-analytical-sep', 'section', '3–6'), q('mxm-socialism-sep', 'section', '4')],
  ],
  'ecological-marxisms': [
    [q('mxm-ecology-rift', 'chapter', '33 — abstract'), q('mxm-sage-marxism', 'chapter', '36–39')],
    [q('mxm-ecology-rift', 'chapter', '33 — abstract'), q('mxm-ecology-critical', 'chapter', '4 — abstract'), q('mxm-sage-marxism', 'chapter', '36–39')],
  ],
  'political-economy': [
    [q('mxm-sage-marxism', 'chapter', '5–10; 21'), q('mxm-oxford-marx', 'chapter', '7–15')],
    [q('mxm-dependency-ore', 'section', 'Abstract; critical assessment'), q('mxm-sage-marxism', 'chapter', '6; 8; 20; 23; 47; 59; 79; 85–87'), q('mxm-oxford-marx', 'chapter', '20; 22; 24; 32')],
  ],
  'democracy-organization': [
    [q('mxm-socialism-sep', 'section', '4–5'), q('mxm-sage-marxism', 'chapter', '17–19; 64'), q('mxm-oxford-communism', 'chapter', '25; 27')],
    [q('mxm-socialism-sep', 'section', '4–5'), q('mxm-marx-sep', 'section', '6'), q('mxm-oxford-communism', 'chapter', '20–23; 29')],
  ],
  'culture-ideology': [
    [q('mxm-ideology-sep', 'section', '1.3; 2–3'), q('mxm-gramsci-sep', 'section', '3.1–3.5'), q('mxm-critical-theory-sep', 'section', '1.4–1.5; 3.2–3.3')],
    [q('mxm-ideology-sep', 'section', '2–3'), q('mxm-critical-theory-sep', 'section', '2.2–2.5'), q('mxm-sage-marxism', 'chapter', '31; 43; 46')],
  ],
  'religion-liberation': [
    [q('mxm-marx-religion', 'standard-division', 'Religion discussion through transition to political criticism'), q('mxm-sage-marxism', 'chapter', '66'), q('mxm-ideology-sep', 'section', '1.3.1')],
    [q('mxm-liberation-sep', 'section', '2'), q('mxm-sage-marxism', 'chapter', '66'), q('mxm-oxford-communism', 'chapter', '15; 34')],
  ],
  contemporary: [
    [q('mxm-sage-marxism', 'chapter', '8; 46; 59; 77; 79–87'), q('mxm-oxford-marx', 'chapter', '18; 20; 22; 32')],
    [q('mxm-sage-marxism', 'chapter', '3; 12–15; 34–39; 57–60; 74; 78; 81'), q('mxm-socialism-sep', 'section', '4–5')],
  ],
  evaluation: [
    [q('mxm-socialism-sep', 'section', '2–5'), q('mxm-analytical-sep', 'section', '3–6'), q('mxm-oxford-communism', 'chapter', 'Introduction')],
    [q('mxm-mawdsley-wwii', 'page', '15–37'), q('mxm-sumpf-civil-war', 'section', '1–4.2'), q('mxm-loc-soviet', 'section', 'Transformation and Terror; The Communist Party'), q('mxm-loc-china', 'section', 'The Great Leap Forward, 1958–60; The Cultural Revolution, 1966–76'), q('mxm-sage-marxism', 'chapter', '13; 15; 23; 39; 57–58')],
  ],
  'what-counts': [
    [q('mxm-socialism-sep', 'section', 'Introduction; 2'), q('mxm-analytical-sep', 'section', '1; 6'), q('mxm-critical-theory-sep', 'section', '1.7')],
    [q('mxm-socialism-sep', 'section', '3–5'), q('mxm-oxford-communism', 'chapter', 'Introduction'), q('mxm-sage-marxism', 'chapter', 'Editors’ introduction')],
    [q('mxm-colonialism-sep', 'section', '4–5'), q('mxm-sage-marxism', 'chapter', '15; 23; 52; 57'), q('mxm-socialism-sep', 'section', '5')],
  ],
  'reading-path': [
    [q('mxm-cambridge-thought', 'chapter', '10–14'), q('mxm-engels-socialism', 'work', 'Primary-work metadata'), q('mxm-bernstein', 'work', 'Primary-work metadata'), q('mxm-luxemburg-reform', 'work', 'Primary-work metadata'), q('mxm-lenin-witbd', 'work', 'Primary-work metadata'), q('mxm-oxford-communism', 'chapter', '1–4; 10–12')],
    [q('mxm-western-cambridge', 'page', '259–288'), q('mxm-critical-theory-sep', 'section', '1–4'), q('mxm-gramsci-sep', 'section', '1; 3–4'), q('mxm-analytical-sep', 'section', '1–6'), q('mxm-sage-marxism', 'chapter', '3; 37–39; 58; 74')],
  ],
};

const paragraphOverrides: Record<string, Partial<Record<number, string>>> = {
  'contested-family': {
    1: 'Four questions should remain separate. What did Marx and Engels argue? How did later thinkers reconstruct that inheritance? How did organizations use it in strategy and discipline? What happened when parties claiming Marxism exercised state power? Intellectual genealogy cannot excuse political outcomes, while outcomes do not prove that every idea caused them. Marxist history includes revolutionary and reformist currents within social democracy, communist and council traditions, critical theory, anticolonial liberation, Black radical thought, feminism, analytical reconstruction, ecology, and more. A responsible history studies crossings and exclusions without making Soviet Marxism-Leninism or academic Western theory the whole tradition.',
  },
  'marx-engels': {
    1: 'Early “Marxism” was constructed through editions, summaries, party education, translations, and polemics before much of Marx’s corpus was available. The 1844 manuscripts and Grundrisse entered debate decades later; critical editions have exposed layers of revision and editorial choice. Disputes about whether Engels naturalized or systematized Marx too strongly remain live. Their collaboration makes a simple betrayal story inadequate, but it does not make every later Engels formulation identical with Marx’s unfinished research. The history begins with mediation, not pure doctrine followed by corruption.',
  },
  'comintern-antifascism': {
    0: 'The Comintern linked parties and militant networks across continents through a self-consciously centralist apparatus that moved people, money, and multilingual print. In the early 1920s it drew on pre-existing networks and sometimes made tactical alliances with anticolonial movements; centralization from Moscow increased, but national parties retained local roots and were not merely passive relays. By the mid-1930s the Soviet-dominated Comintern endorsed popular fronts against fascism. The result combined real transnational organization and anticolonial connection with tightening direction from a state center.',
    1: 'Communists became important participants in anti-fascist resistance and entered the postwar period with the prestige of Soviet victory, but the movement’s line followed sharp geopolitical turns. The Nazi–Soviet pact disoriented many parties; Germany’s June 1941 invasion produced another reversal, and Stalin dissolved the Comintern in 1943. The record therefore includes genuine resistance alongside dependence on Soviet strategy, not a simple heroic or puppet narrative.',
  },
  'second-international': {
    0: 'After 1889, mass socialist parties and unions made Marxism a language of organized working-class politics, especially in Europe. Karl Kautsky, August Bebel, and other Second International Marxists systematized historical materialism, class politics, and expectations of capitalist development. Parliamentary growth coexisted with a revolutionary horizon: parties built large memberships and durable newspapers, schools, unions, cooperatives, and electoral organizations while often describing socialism as the outcome of historical laws. That combination could turn strategy into waiting for an apparently inevitable future.',
    1: 'The International was never uniform. National parties faced different states, suffrage rules, labor structures, empires, peasantries, and religious cultures. Influential European currents treated some colonial rule as progressive or opposed it inconsistently, while anticolonial delegates and activists contested those positions. The collapse of international unity in 1914, when major parties backed their governments in world war, exposed the weakness of formal internationalism against national institutions and loyalties. Later communists, reformists, and antiwar socialists drew incompatible lessons.',
  },
  revisionism: {
    0: 'Eduard Bernstein argued that capitalism was adapting through credit, corporations, unions, and democracy rather than developing as influential orthodox readings predicted toward polarization and collapse. Socialists should state ethical and democratic commitments openly and pursue reform instead of preserving revolutionary rhetoric. “Revisionism” became an accusation as well as a position. Orthodox opponents defended class antagonism and systemic transformation, while reformist practice expanded even where parties officially rejected Bernstein.',
  },
  luxemburg: {
    0: 'Rosa Luxemburg joined economic analysis, internationalism, and revolutionary organization while resisting bureaucratic substitution for mass initiative. She debated Bernstein, analyzed imperial expansion and accumulation, supported mass strikes as schools of collective action, and opposed the First World War. On a strong textual reading, the mass-strike argument does not reject organization; it makes organized capacity and struggle reciprocal. Later “spontaneist” and organizational readings remain disputed.',
  },
  lenin: {
    1: 'In 1917 Lenin rejected a staged expectation that Russia must complete a long bourgeois phase before socialist action. The April Theses and State and Revolution link immediate rupture to soviet power and the destruction of a bureaucratic-military state apparatus. Yet governing amid war, collapse, foreign intervention, famine, and civil conflict produced centralization, coercion, and suppression. Historical emergency helps explain those choices without rendering them politically innocent or theoretically irrelevant.',
  },
  'russian-revolution': {
    0: 'The Russian Revolution joined mass participation, military breakdown, land seizure, worker organization, national movements, and competing socialist parties. Bolshevik leadership mattered, but October was not the execution of a philosophical blueprint. The new government withdrew from world war, ratified peasant land seizures, abolished landed property, and proclaimed worker rule amid civil war and economic disintegration. It also dissolved the Constituent Assembly, restricted rival parties, expanded political policing, and subordinated independent institutions. Kronstadt, strikes, peasant rebellion, and factional conflict exposed the distance between rule in workers’ names and workers’ capacity to contest it.',
  },
  'soviet-orthodoxy': {
    1: 'Soviet intellectual life was more complex than official manuals: philosophers, economists, scientists, writers, and dissidents worked within, around, and against changing constraints. Yet doctrine could be settled administratively, research subordinated to party lines, and disagreement criminalized. After Stalin, de-Stalinization, reform efforts, dissident Marxisms, national paths, and eventual stagnation changed the system without ending one-party rule or establishing durable pluralist democratic institutions. The Soviet record belongs to evaluating Marxism because concepts, organizations, and authority interacted there; it is not the tradition’s exhaustive meaning.',
  },
  oppositions: {
    0: 'Marxist opposition to centralized party rule took more than one form. Interwar council communists treated workers’ councils as institutions of workplace democracy and continuing self-government, not merely temporary instruments that should yield authority to a party. Trotsky’s argument was different: The Revolution Betrayed defended nationalized property and the October legacy while describing a privileged bureaucracy, a “degenerated workers’ state,” and the need for political revolution. These were rival criticisms, not one democratic alternative; they disagreed about party, state, property, and the institutional form of worker rule.',
    1: 'Opposition does not confer innocence. Trotsky helped create and command a Red Army that enforced labor discipline and suppressed Kronstadt, while council-democratic proposals faced unresolved problems of coordination, scale, defense, and institutional durability. Their importance is nevertheless historical as well as theoretical: Marxists criticized bureaucratic substitution and restrictions on political freedom while those institutions were being formed. These alternatives prevent treating one-party repression as a deduction from every Marxist premise, but their defeat also belongs to the record of Marxist-led institutions. The durable question is how councils, parties, unions, opposition groups, and officials could remain mutually accountable under crisis.',
  },
  'postwar-eurocommunism': {
    0: 'The Red Army’s advance and the postwar balance of power enabled communist governments across Eastern Europe under decisive Soviet predominance. Regimes varied by country and period, but recurrent reform crises exposed tensions among one-party rule, national autonomy, and democratic socialist aspirations. Soviet force crushed the 1956 Hungarian revolution and the 1968 Czechoslovak reform movement, making the limits of bloc sovereignty unmistakable.',
    1: 'In the 1970s, the Italian Communist Party pursued constitutional transformation, pluralism, and greater independence from Moscow, and tried to draw the French and Spanish parties into a Western European reform-communist caucus. The parties did not form a coherent bloc, however, and the project reached a dead end under internal contradictions, inconsistent allied support, Soviet hostility, and changing domestic and Cold War conditions.',
  },
  gramsci: {
    1: 'Gramsci’s “war of position” addresses durable institutional struggle where a rapid assault on the state is insufficient. Organic intellectuals articulate experiences and organize collective understanding; a party can function as a modern prince that builds a new collective will. These ideas can support democratic coalition and education, yet they also raise the danger that leadership substitutes its interpretation for popular agency. The Prison Notebooks are fragmentary, revisional texts written under fascist prison censorship and later published through editorial constructions. Their concepts should not become a context-free handbook for influencing opinion.',
  },
  'frankfurt-school': {
    0: 'The Institute for Social Research joined Marxian political economy with sociology, psychology, philosophy, aesthetics, and empirical study. Horkheimer, Adorno, Marcuse, Fromm, and other Institute researchers worked alongside close interlocutors such as Walter Benjamin while confronting fascism, Stalinism, mass culture, antisemitism, exile, and advanced capitalism. Their “critical theory” asks how domination persists when direct economic interest does not explain compliance. Authoritarian personality, instrumental reason, culture industry, administered life, and one-dimensional society name different mechanisms, not one doctrine.',
  },
  'maoism-theory': {
    1: 'Mao’s essays on contradiction distinguish principal and secondary contradictions and insist that their configuration changes. “Continuing revolution under socialism” became a central later label for the Maoist claim that class conflict persists after public ownership; it is not a neutral description shared by all interpreters. Maoism later inspired sharply different movements across Asia, Africa, Latin America, Europe, and North America. Some built durable organizations among excluded rural populations; others reproduced militarism, personality cults, coercion, or simplified social analysis.',
  },
  'maoism-power': {
    0: 'The People’s Republic transformed landholding, public health, literacy, industry, and national sovereignty. It also concentrated authority in a party-state that punished opposition. The Great Leap Forward’s coercive collectivization, unrealistic production targets, distorted reporting, and grain policies contributed to catastrophic famine. The Cultural Revolution mobilized attacks on alleged capitalist restoration but produced persecution, factional violence, humiliation, imprisonment, educational rupture, and destruction of cultural life. Exact victim totals and the allocation of causal responsibility remain disputed; the page therefore states no single number.',
  },
  anticolonial: {
    0: 'Marxism offered anticolonial thinkers a language for linking conquest, land, labor, extraction, class, and world markets. It also carried European stage theories and organizational models that required criticism. José Carlos Mariátegui rejected the assumption that Peru must copy a European sequence and made Indigenous land relations central to a heterodox socialism. C. L. R. James’s changing Black Jacobins placed enslaved people and popular Haitian agency at the center of revolution. Frantz Fanon joined political economy to racialized embodiment, colonial violence, national consciousness, and warnings about postcolonial elites. These reconstructions did not turn anticolonial Marxism into one doctrine.',
    1: 'Liberation movements faced a double problem: building unity against empire while preserving conflict and accountability within the future nation. Cold War intervention and colonial legacies shaped later institutions, but do not by themselves settle how Marxist organization affected those outcomes. Anticolonial Marxism transformed the tradition by making empire constitutive rather than peripheral, yet it produced no single formula for the relation among class, nation, ethnicity, peasantry, gender, culture, and democratic institutions.',
  },
  'black-marxisms': {
    0: 'Black Marxist traditions analyze capitalism through slavery, colonialism, racialized labor, land, policing, and imperial war while challenging European class schemas. W. E. B. Du Bois’s Black Reconstruction places enslaved people’s self-emancipation and the “general strike” at the center of the Civil War era and examines how racial status divided labor and defeated interracial democracy. Claudia Jones, Angela Davis, Stuart Hall, and other thinkers develop distinct accounts of gender, empire, culture, prisons, and political organization. No single theory called Black Marxism contains them all.',
    1: 'Cedric Robinson’s Black Marxism argues that capitalism developed within already racialized European orders and reconstructs a Black radical tradition not reducible to a Marxist genealogy. “Racial capitalism” is now used in several, sometimes incompatible, ways. Some scholars integrate race into capitalist accumulation; some resist making capitalism the origin or exhaustive explanation of racial domination; some criticize Robinson’s history while retaining his challenge. Race is not a decorative identity added after class analysis: racial rule helps constitute property, labor markets, citizenship, coercion, and collective agency.',
  },
  autonomism: {
    1: 'Italian workerism and feminist Wages for Housework currents intersected and contested the category of work; feminist theorists made unwaged reproductive labor visible where factory-centered workerism had often marginalized it. Later autonomist ideas of refusal, social production, and networked labor generated further disputes. Critics argue that celebrations of autonomy can understate institutions, organization, racial and gender hierarchy, and capital’s command, while claims that knowledge work displaced industrial labor can erase mines, farms, warehouses, care work, and global manufacturing.',
  },
  'analytical-marxism': {
    1: 'Analytical Marxists did not agree on methodological individualism, rational choice, history, exploitation, or socialism. As confidence in an inevitable transition declined, normative questions became more explicit. Cohen moved toward egalitarian political philosophy; Erik Olin Wright combined class analysis with institutional “real utopias.” Critics argue that analytical methods strip Marxism of dialectic, history, and emergent social relations. Defenders answer that structural theories still owe mechanisms and evidence. The current shows an internally diverse Marxism willing to reject or reconstruct some substantive Marxian claims while retaining socialist equality and analysis of class power.',
  },
  'political-economy': {
    0: 'Marxist political economy contains competing accounts of value, money, finance, labor, profit, crisis, and capitalist transformation. The available specialist handbook maps establish the breadth of these research programs, not one settled taxonomy or causal theory. “Marxian economics” can therefore describe research inspired by Marx without commitment to every Marxist political position.',
    1: 'Global political economy adds debates over imperialism, dependency, uneven development, and core–periphery relations. Dependency and world-systems approaches reject a simple national-stage path, while critics dispute their treatment of domestic class, states, race, gender, ecology, and peripheral agency. Contemporary work extends these questions to finance, logistics, platforms, intellectual property, supply chains, and informal labor; those extensions require fresh empirical evidence rather than assuming nineteenth-century categories apply unchanged.',
  },
  'religion-liberation': {
    0: 'Marx’s critique of religion is often reduced to one metaphor about opium. The surrounding argument treats religion as both an expression of suffering and a protest against it, while insisting that criticism must address the social conditions requiring consolation. Later Marxists range from militant atheism and state suppression of religious institutions to alliances with believers and analyses of religion as culture, organization, hope, or ideology.',
    1: 'Latin American liberation theology and related movements use Marxian social analysis within Christian commitments to the poor, base communities, and opposition to dictatorship and dependency. Other religious and decolonial encounters with Marxian analysis are historically distinct and should not be grouped as one Marxist theology. Critics warn that class analysis can instrumentalize faith or ignore doctrine, while religious institutions can preserve patriarchy and hierarchy. These crossings require study of what religious practice actually does in a historical struggle.',
  },
  contemporary: {
    0: 'Contemporary Marxist research extends class and accumulation analysis to insecure employment, global production networks, logistics, migration, debt, housing, finance, automation, and digital platforms. These are research programs rather than settled conclusions: claims about platform ownership, data, worker status, algorithmic management, and value creation must be established case by case.',
    1: 'Care and ecological crises test whether accumulation sustains the social and natural conditions on which production depends. Feminist, ecological, anti-racist, and abolitionist Marxisms offer competing extensions of class analysis rather than one agreed model. Contemporary debates ask which combinations of public ownership, cooperatives, planning, universal services, ecological limits, and democratic institutions could support a transition without assuming that any one instrument guarantees emancipation.',
  },
  'what-counts': {
    2: 'Boundaries are also relational. Marxists learned from and argued with social democracy about reform and with anticolonial and postcolonial thought about empire and Eurocentrism. Borrowing does not dissolve every difference. It reveals that traditions develop through criticism and shared struggles rather than sealed ownership of concepts. These exchanges can expose assumptions that internal debate has normalized. A self-described Marxism that cannot say what these encounters changed is offering an identity, not yet an adequate history.',
  },
};

const reviewedSections = (sections: ArticleSection[] | undefined): ArticleSection[] => (sections ?? []).map((section) => ({
  ...section,
  paragraphs: section.paragraphs.map((paragraph, index) => p(
    'marxism-' + section.id + '-' + (index + 1),
    paragraphOverrides[section.id]?.[index] ?? (typeof paragraph === 'string' ? paragraph : paragraph.text),
    sectionCitations[section.id]?.[index] ?? [q('mxm-socialism-sep', 'section', '1–5')],
  )),
}));

const serialize = (value: unknown) => typeof value === 'string' ? value : JSON.stringify(value);

const structuredClaims = (record: Branch) => ({
  classification: claim(record.category, [q('mxm-socialism-sep', 'section', 'Introduction; 2'), q('mxm-oxford-communism', 'chapter', 'Introduction')]),
  date: claim('1883 Atlas anchor: Marx’s death and the post-Marx inheritance, not a single origin date', [q('mxm-marx-sep', 'section', '1; 8'), q('mxm-mega', 'work', 'Corpus and editorial history')]),
  definition: claim(record.shortDefinition, [q('mxm-socialism-sep', 'section', '1–2'), q('mxm-sage-marxism', 'chapter', 'Editors’ introduction')]),
  purpose: claim(record.oneSentencePurpose, [q('mxm-socialism-sep', 'section', '1–5'), q('mxm-oxford-marx', 'chapter', '2–3; 7–15')]),
  'central-question': claim(record.coreQuestions[0] ?? '', [q('mxm-socialism-sep', 'section', '3–5'), q('mxm-oxford-marx', 'chapter', '2–3; 7–15')]),
  'central-questions': claim(serialize(record.coreQuestions), [q('mxm-socialism-sep', 'section', '3–5'), q('mxm-oxford-marx', 'chapter', '2–3; 7–15')]),
  'origin-story': claim(record.originStory ?? '', [q('mxm-mega', 'work', 'Corpus and editorial history'), q('mxm-cambridge-thought', 'chapter', '10'), q('mxm-oxford-communism', 'chapter', '1')]),
  chronology: claim(serialize({originPeriod: record.originPeriod, startYear: record.roughStartYear, development: record.historicalDevelopment, detailed: record.historicalDevelopmentDetailed}), [q('mxm-eley-marxism-revolution', 'page', '49–73'), q('mxm-cambridge-thought', 'chapter', '10–14'), q('mxm-cambridge-communism-v1', 'work', 'Named volume and chapter records'), q('mxm-cambridge-communism', 'work', 'Named volume and chapter records'), q('mxm-sayim-comintern', 'page', '216–235'), q('mxm-mawdsley-wwii', 'page', '15–37'), q('mxm-sumpf-civil-war', 'section', '1–4'), q('mxm-loc-soviet', 'section', 'Revolutions and Civil War through The Brezhnev Era'), q('mxm-ripp-hungary', 'page', '197–205'), q('mxm-weiner-prague', 'page', '159–161; 184–190'), q('mxm-didonato-eurocommunism', 'page', '201–211'), q('mxm-loc-china', 'section', 'The Great Leap Forward, 1958–60 through The Post-Mao Period, 1976–78')]),
  concepts: claim(serialize({concepts: record.keyConcepts, detailed: record.keyConceptsDetailed}), [q('mxm-marx-sep', 'section', '2–8'), q('mxm-ideology-sep', 'section', '1.3; 2–3'), q('mxm-gramsci-sep', 'section', '3.1–3.5'), q('mxm-ecology-rift', 'chapter', '33 — abstract')]),
  'concept-1': claim(record.keyConceptsDetailed?.[0]?.explanation ?? '', [q('mxm-marx-sep', 'section', '2'), q('mxm-oxford-marx', 'chapter', '2')]),
  'concept-2': claim(record.keyConceptsDetailed?.[1]?.explanation ?? '', [q('mxm-oxford-marx', 'chapter', '3'), q('mxm-analytical-sep', 'section', '4.3')]),
  'concept-3': claim(record.keyConceptsDetailed?.[2]?.explanation ?? '', [q('mxm-ideology-sep', 'section', '1.3; 3'), q('mxm-gramsci-sep', 'section', '3.1–3.5')]),
  'concept-4': claim(record.keyConceptsDetailed?.[3]?.explanation ?? '', [q('mxm-lenin-imperialism', 'chapter', 'I–VII'), q('mxm-colonialism-sep', 'section', '4'), q('mxm-sage-marxism', 'chapter', '23')]),
  'concept-5': claim(record.keyConceptsDetailed?.[4]?.explanation ?? '', [q('mxm-socialism-sep', 'section', '5'), q('mxm-cambridge-thought', 'chapter', '10–11')]),
  'concept-6': claim(record.keyConceptsDetailed?.[5]?.explanation ?? '', [q('mxm-feminism-class-sep', 'section', '2; 4–5; 7; 9'), q('mxm-davis-housework', 'chapter', '13'), q('mxm-sage-marxism', 'chapter', '3; 34; 78')]),
  'concept-7': claim(record.keyConceptsDetailed?.[6]?.explanation ?? '', [q('mxm-socialism-sep', 'section', '1; 4'), q('mxm-marx-sep', 'section', '6')]),
  'concept-8': claim(record.keyConceptsDetailed?.[7]?.explanation ?? '', [q('mxm-ecology-rift', 'chapter', '33 — abstract'), q('mxm-ecology-critical', 'chapter', '4 — abstract'), q('mxm-sage-marxism', 'chapter', '37–39')]),
  relations: claim(serialize({related: record.relatedBranchIds, contrasting: record.contrastingBranchIds, rivals: record.rivalPositions}), [q('mxm-socialism-sep', 'section', '2–5'), q('mxm-critical-theory-sep', 'section', '1.7'), q('mxm-colonialism-sep', 'section', '4–5')]),
  figures: claim(serialize({ids: record.majorPhilosopherIds, figures: record.majorFigures}), [q('mxm-marx-sep', 'section', 'Whole entry'), q('mxm-fanon-sep', 'section', 'Whole entry'), q('mxm-davis-ore', 'section', 'Opened abstract and contents'), q('mxm-critical-theory-sep', 'section', '1.6–1.7; 2.2–2.5')]),
  works: claim(serialize(record.majorWorks), [q('mxm-mega', 'work', 'Corpus records'), q('mxm-engels-socialism', 'work', 'Named work'), q('mxm-luxemburg-reform', 'work', 'Named work'), q('mxm-lenin-state', 'work', 'Named work'), q('mxm-gramsci-sep', 'section', 'Bibliography'), q('mxm-critical-theory-sep', 'section', '1.5. The Dialectic of Enlightenment'), q('mxm-robinson', 'page', 'Introduction; contents')]),
  debates: claim(serialize({internal: record.internalDebates, tensions: record.internalTensions}), [q('mxm-socialism-sep', 'section', '3–5'), q('mxm-communist-terror', 'chapter', '20 — abstract'), q('mxm-loc-soviet', 'section', 'Transformation and Terror; The Communist Party'), q('mxm-loc-china', 'section', 'The Great Leap Forward, 1958–60; The Cultural Revolution, 1966–76'), q('mxm-analytical-sep', 'section', '1–6'), q('mxm-ecology-rift', 'chapter', '33 — abstract'), q('mxm-ecology-critical', 'chapter', '4 — abstract')]),
  misconceptions: claim(serialize({common: record.commonMisunderstandings, detailed: record.misconceptionsDetailed}), [q('mxm-socialism-sep', 'section', '1–5'), q('mxm-mawdsley-wwii', 'page', '15–37'), q('mxm-loc-soviet', 'section', 'Transformation and Terror; The Communist Party'), q('mxm-loc-china', 'section', 'The Great Leap Forward, 1958–60; The Cultural Revolution, 1966–76'), q('mxm-oxford-communism', 'chapter', 'Introduction; 20–23')]),
  relevance: claim(serialize({examples: record.modernExamples, detailed: record.modernRelevanceDetailed}), [q('mxm-feminism-class-sep', 'section', '2; 4–5; 7; 9'), q('mxm-socialism-sep', 'section', '4–5'), q('mxm-sage-marxism', 'chapter', 'Contemporary sections cited in paragraphs'), q('mxm-oxford-marx', 'chapter', '18; 20; 22; 32')]),
  'reading-paths': claim(serialize({suggested: record.suggestedReadingPath, beginner: record.beginnerReadingPath, advanced: record.advancedReadingPath}), [q('mxm-cambridge-thought', 'chapter', '10–14'), q('mxm-oxford-communism', 'chapter', '1–4; 10–12'), q('mxm-sage-marxism', 'chapter', 'Named traditions in paragraph map')]),
});

export const applyMarxismEditorial = (record: Branch): Branch => {
  if (record.id !== 'marxism') return record;

  const reviewed: Branch = {
    ...record,
    category: 'Contested reception tradition / family',
    shortDefinition: 'A diverse and contested family of theories, movements, organizations, and state projects that reconstruct Marxian critiques of capitalism and social domination.',
    oneSentencePurpose: 'Analyzes how production, property, class, and accumulation organize power while testing which institutions could transform them without substituting party or state rule for self-emancipation.',
    originPeriod: '1883 Atlas anchor for Marx’s death and the increasingly post-Marx inheritance',
    roughStartYear: 1883,
    originStory: 'Marxism took shape through Marx and Engels’s collaboration and, increasingly after Marx’s death in 1883, through Engels’s editing, socialist parties, labor movements, debates, revolutions, and states that turned a contested inheritance into rival theories and institutions.',
    keyConcepts: [
      {
        id: 'marxism-historical-materialism',
        name: 'Historical materialism',
        plainDefinition: 'Historical explanation through production, reproduction, property, institutions, conflict, and formed agency rather than ideas alone.',
        deeperExplanation: 'Marxists disagree whether these relations identify tendencies, mechanisms, functional pressures, or a determinate sequence of development.',
        example: 'Explain a housing crisis through land, credit, ownership, law, construction, and political organization rather than attitudes alone.',
        relatedConceptIds: ['marxism-class-struggle', 'marxism-social-reproduction'],
      },
      {
        id: 'marxism-class-struggle',
        name: 'Class struggle',
        plainDefinition: 'Conflict and organization among groups differently positioned within production and property relations.',
        deeperExplanation: 'A structural position does not automatically create solidarity; parties, unions, states, race, gender, nation, and political memory help form collective agency.',
        example: 'Ask how workers divided by contract status, citizenship, race, and occupation could—or could not—act together.',
        relatedConceptIds: ['marxism-historical-materialism', 'marxism-organization'],
      },
      {
        id: 'marxism-ideology-hegemony',
        name: 'Ideology and hegemony',
        plainDefinition: 'Accounts of how domination is reproduced through social appearances, institutions, culture, consent, and force.',
        deeperExplanation: 'Marxist traditions disagree whether ideology is primarily distorted belief, lived practice, institutional formation, or an objective appearance generated by social relations.',
        example: 'Study how workplace authority appears technically necessary while being reinforced by law, education, media, and ordinary expectations.',
        relatedConceptIds: ['marxism-class-struggle', 'marxism-organization'],
      },
      {
        id: 'marxism-imperialism',
        name: 'Imperialism and uneven development',
        plainDefinition: 'Capitalist expansion links territories through unequal finance, extraction, trade, political rule, and war.',
        deeperExplanation: 'Leninist, dependency, world-systems, anticolonial, and decolonial approaches disagree about periods, mechanisms, national agency, and the explanatory reach of class.',
        example: 'Trace how a global supply chain distributes ownership, wages, environmental damage, and political leverage across jurisdictions.',
        relatedConceptIds: ['marxism-historical-materialism', 'marxism-metabolism'],
      },
      {
        id: 'marxism-organization',
        name: 'Organization and self-emancipation',
        plainDefinition: 'The problem of turning dispersed grievances into collective power without substituting leaders for those meant to rule.',
        deeperExplanation: 'Parties, councils, unions, fronts, and movements solve different problems of scale and continuity while creating different risks of bureaucracy and exclusion.',
        example: 'Evaluate whether members can contest policy, recall leaders, organize opposition, and retain independent associations.',
        relatedConceptIds: ['marxism-class-struggle', 'marxism-associated-production'],
      },
      {
        id: 'marxism-social-reproduction',
        name: 'Social reproduction',
        plainDefinition: 'The care, household, educational, health, migratory, and public processes that reproduce people and labor-power.',
        deeperExplanation: 'Feminist and Black Marxist approaches show how paid production depends on work and institutions distributed through gender, race, citizenship, and disability.',
        example: 'Analyze a care shortage through wages, unpaid household work, immigration policy, public provision, and gendered expectations.',
        relatedConceptIds: ['marxism-historical-materialism', 'marxism-metabolism'],
      },
      {
        id: 'marxism-associated-production',
        name: 'Associated production',
        plainDefinition: 'Producers democratically govern shared productive powers rather than meeting them as private capital or unaccountable state command.',
        deeperExplanation: 'The idea supplies an emancipatory standard, but Marxist traditions dispute the roles of planning, markets, law, expertise, pluralism, and constitutional limits.',
        example: 'Compare nationalization by a ministry with institutions in which workers and affected communities share information and decision authority.',
        relatedConceptIds: ['marxism-organization', 'marxism-metabolism'],
      },
      {
        id: 'marxism-metabolism',
        name: 'Metabolism and ecological crisis',
        plainDefinition: 'Production organizes material exchanges with the rest of nature and can disrupt the conditions on which life depends.',
        deeperExplanation: 'Ecological Marxists use this idea to connect accumulation with extraction and climate while disputing Marx’s productivism and the institutions required by ecological limits.',
        example: 'Assess an energy transition through emissions, extraction, ownership, labor, Indigenous sovereignty, and democratic control.',
        relatedConceptIds: ['marxism-imperialism', 'marxism-associated-production'],
      },
    ],
    suggestedReadingPath: [
      'Read Marx separately first: the Theses on Feuerbach, Manifesto, Eighteenth Brumaire, selected Capital chapters, Civil War in France, and Gotha critique with attention to genre and date.',
      'Compare Engels, Bernstein, Luxemburg, and Lenin on systematization, reform, organization, imperialism, and the state.',
      'Read histories of the Russian, Soviet, Chinese, and global communist experiences beside participants’ texts and records of repression and dissent.',
      'Follow parallel routes through Gramsci and critical theory, anticolonial and Black traditions, feminist social reproduction, analytical Marxism, and ecological Marxism.',
    ],
    modernExamples: [
      'Workplace surveillance, insecure labor, algorithmic management, logistics, and global supply chains.',
      'Housing, debt, finance, monopoly power, public ownership, and democratic control of investment.',
      'Care shortages, migration, schools, health systems, and the unequal organization of social reproduction.',
      'Racialized property, policing, prisons, borders, abolition, and the limits of class reduction.',
      'Climate change, extraction, agriculture, energy, just transition, and democratically governed ecological limits.',
      'Institutional design for accountable parties, movements, councils, cooperatives, planning, markets, and opposition.',
    ],
    rivalPositions: ['kantianism', 'utilitarianism', 'pragmatism'],
    commonMisunderstandings: [
      'Marxism is not Marx’s thought copied unchanged.',
      'The 1883 date is an Atlas anchor for post-Marx inheritance, not the birth of every Marxist argument or organization.',
      'Marxism-Leninism is a historically constructed state doctrine, not a neutral synonym for every Marxist tradition.',
      'Class analysis does not automatically explain race, gender, nation, caste, colonialism, disability, sexuality, or ecology.',
      'Public ownership alone does not establish worker control, pluralist democracy, ecological rationality, or communism.',
      'War and emergency help explain revolutionary centralization but do not make repression politically innocent.',
      'Criticizing Soviet and Maoist repression does not make labor, anticolonial, feminist, Black, analytical, or ecological Marxist traditions irrelevant.',
      'Pointing to Marxism’s diversity does not excuse every movement or make evaluation impossible.',
    ],
    majorWorks: record.majorWorks?.map((work) => work.title.includes('Cedric J. Robinson, Black Marxism')
      ? {
          ...work,
          summary: 'Critiques the racial limits of European radicalism and reconstructs a Black radical tradition not reducible to a Marxist genealogy.',
          whyItMatters: 'It makes racial capitalism and the boundaries of Marxist inheritance central contemporary disputes.',
        }
      : work),
    sourceLinks: [],
    articleSections: reviewedSections(record.articleSections),
  };

  return {
    ...reviewed,
    editorial: {
      sources,
      furtherReadingSourceIds: ['mxm-marx-engels-reader'],
      structuredClaims: structuredClaims(reviewed),
      review: {
        status: 'claim-reviewed',
        reviewedOn: '2026-08-01',
        method: 'Full visitor-page claim review of all article paragraphs and rendered branch facts using exact primary-work records, official critical-edition metadata, independent specialist philosophy and global history, explicit dispute and outcome-causation controls, direct-reuse inventory, and deterministic lock validation; abstract-level evidence and historical translations are labeled honestly.',
        reviewNotePath: 'docs/editorial/reviews/marxism.md',
        lock: 'fnv1a64:99f90dfdd267335d',
        evidencePolicy: {minimumIndependentSecondarySources: 8, minimumIndependentSecondaryDomains: 5, requiredSourceTypes: ['primary-text', 'institutional-archive', 'journal-article']},
      },
    },
  };
};
