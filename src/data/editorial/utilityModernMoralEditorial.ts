import type {ArticleSection, CitationReference, EditorialSource, Philosopher, ReadingEntry} from '../../types/philosophy';
import {citation as c} from './pilotHelpers';
import {
  applyModernClusterEditorialConfig,
  type ModernClusterEditorialConfig,
} from './modernClusterEditorialHelpers';

const q = (sourceId: string, kind: Parameters<typeof c>[1], value: string, note?: string) =>
  c(sourceId, kind, value, note);
const reading = (
  author: string,
  title: string,
  difficulty: ReadingEntry['difficulty'],
  whyRead: string,
  type: ReadingEntry['type'] = 'primary',
): ReadingEntry => ({author, title, difficulty, whyRead, type});
const sections = (...groups: Array<[string[], CitationReference[]]>): Record<string, CitationReference[]> =>
  Object.fromEntries(groups.flatMap(([ids, citations]) => ids.map((id) => [id, citations])));
const addition = (
  id: string,
  title: string,
  paragraphs: string[],
  relatedBranchIds: string[],
  relatedPhilosopherIds: string[],
  relatedWorkTitles: string[],
): ArticleSection => ({id, title, paragraphs, relatedBranchIds, relatedPhilosopherIds, relatedWorkTitles});

const accessedOn = '2026-08-03';

const benthamSources: EditorialSource[] = [
  {id: 'bentham-sep', type: 'scholarly-reference', authors: ['James E. Crimmins'], title: 'Jeremy Bentham', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/bentham/', accessedOn, note: 'Specialist synthesis used for chronology, utility, jurisprudence, punishment, democracy, political economy, religion, empire, and the Panopticon.'},
  {id: 'bentham-iep', type: 'scholarly-reference', authors: ['William Sweet'], title: 'Jeremy Bentham', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/jeremy-bentham/', accessedOn, note: 'Independent overview used for legal positivism, rights criticism, moral psychology, reform, and reception.'},
  {id: 'bentham-ipml', type: 'primary-text', authors: ['Jeremy Bentham'], title: 'An Introduction to the Principles of Morals and Legislation', edition: '1789 text, 1823 authorial revisions', url: 'https://historyofeconomicthought.mcmaster.ca/bentham/morals.pdf', accessedOn, note: 'Primary source for utility, pleasure and pain, the circumstances of valuation, sanctions, motives, offences, punishment, and the sentience note.'},
  {id: 'bentham-fragment', type: 'primary-text', authors: ['Jeremy Bentham'], title: 'A Fragment on Government', year: 1776, url: 'https://oll.libertyfund.org/title/bentham-a-fragment-on-government', accessedOn, note: 'Primary source for criticism of Blackstone, political obedience, and the difference between description and justification of law.'},
  {id: 'bentham-panopticon', type: 'primary-text', authors: ['Jeremy Bentham'], editors: ['Tim Causer', 'Philip Schofield'], title: 'Panopticon versus New South Wales and Other Writings on Australia', publisher: 'UCL Press', year: 2022, doi: '10.14324/111.9781787359383', url: 'https://www.uclpress.co.uk/products/154699', accessedOn, note: 'Authoritative collected-works volume used for the failed penitentiary project, punishment, transportation, colonial policy, and editorial chronology.'},
  {id: 'bentham-sexuality', type: 'primary-text', authors: ['Jeremy Bentham'], editors: ['Philip Schofield', 'Catherine Pease-Watkin', 'Michael Quinn'], title: 'Of Sexual Irregularities, and Other Writings on Sexual Morality', publisher: 'Oxford University Press', year: 2014, doi: '10.1093/acprof:oso/9780199685189.001.0001', url: 'https://global.oup.com/academic/product/of-sexual-irregularities-and-other-writings-on-sexual-morality-9780199685189', accessedOn, note: 'Critical edition used for Bentham’s unpublished defenses of consensual sexual liberty and the limits of equating private manuscripts with public reform success.'},
  {id: 'bentham-evidence', type: 'scholarly-book', authors: ['Gerald J. Postema'], title: 'Bentham and the Common Law Tradition', publisher: 'Oxford University Press', edition: 'Second edition', year: 2019, doi: '10.1093/oso/9780198793052.001.0001', url: 'https://academic.oup.com/book/35306', accessedOn, note: 'Independent study used for law, adjudication, publicity, evidence, codification, and the relation between analytic jurisprudence and normative reform.'},
  {id: 'bentham-project', type: 'institutional-archive', authors: ['Bentham Project'], title: 'The Bentham Project', publisher: 'University College London', url: 'https://www.ucl.ac.uk/laws/research/research-projects/bentham-project', accessedOn, note: 'Institutional corpus guide used to distinguish published books, manuscripts, posthumous editions, and the ongoing critical edition.'},
];

const millSources: EditorialSource[] = [
  {id: 'mill-sep', type: 'scholarly-reference', authors: ['David Brink'], title: 'Mill’s Moral and Political Philosophy', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/mill-moral-political/', accessedOn, note: 'Specialist analysis of utilitarianism, liberty, harm, rights, sanctions, justice, individuality, democracy, equality, and interpretive disputes.'},
  {id: 'mill-general-sep', type: 'scholarly-reference', authors: ['Christopher Macleod'], title: 'John Stuart Mill', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/mill/', accessedOn, note: 'Independent specialist overview for life, naturalism, logic, induction, psychology, equality, authority, and the breadth of Mill’s system.'},
  {id: 'mill-liberty', type: 'primary-text', authors: ['John Stuart Mill'], title: 'On Liberty', year: 1859, url: 'https://oll.libertyfund.org/titles/mill-on-liberty-and-the-subjection-of-women-1879-ed?html=true', accessedOn, note: 'Primary source; locators use chapter divisions, especially I–V.'},
  {id: 'mill-utilitarianism', type: 'primary-text', authors: ['John Stuart Mill'], title: 'Utilitarianism', year: 1861, url: 'https://www.gutenberg.org/ebooks/11224', accessedOn, note: 'Primary source for the greatest-happiness principle, qualitative pleasure, proof, sanctions, justice, and rules.'},
  {id: 'mill-government', type: 'primary-text', authors: ['John Stuart Mill'], title: 'Considerations on Representative Government', year: 1861, url: 'https://oll.libertyfund.org/title/mill-considerations-on-representative-government', accessedOn, note: 'Primary source for participation, competence, plural voting, representation, nationality, and government of dependencies.'},
  {id: 'mill-women', type: 'primary-text', authors: ['John Stuart Mill'], title: 'The Subjection of Women', year: 1869, url: 'https://oll.libertyfund.org/titles/mill-on-liberty-and-the-subjection-of-women-1879-ed?html=true', accessedOn, note: 'Primary source for marriage, equality, the manufactured character of gender, and institutional barriers.'},
  {id: 'mill-logic-economy', type: 'primary-text', authors: ['John Stuart Mill'], title: 'The Collected Works of John Stuart Mill: A System of Logic and Principles of Political Economy', publisher: 'University of Toronto Press / Liberty Fund digital edition', url: 'https://oll.libertyfund.org/people/john-stuart-mill', accessedOn, note: 'Primary corpus portal used for induction, ethology, social science, production/distribution, cooperation, labor, property, and edition changes.'},
  {id: 'mill-companion', type: 'scholarly-book', authors: ['John Skorupski'], editors: ['John Skorupski'], title: 'The Cambridge Companion to Mill', publisher: 'Cambridge University Press', year: 1998, doi: '10.1017/CCOL0521419875', url: 'https://www.cambridge.org/core/books/cambridge-companion-to-mill/4738AA507D20380E2B3DC4806F8B16B8', accessedOn, note: 'Independent collection used for disputed relations among liberty, utility, logic, political economy, religion, Harriet Taylor Mill, feminism, and empire.'},
];

const anscombeSources: EditorialSource[] = [
  {id: 'anscombe-sep', type: 'scholarly-reference', authors: ['Eric Wiland', 'Julia Driver'], title: 'Gertrude Elizabeth Margaret Anscombe', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/anscombe/', accessedOn, note: 'Specialist synthesis for life, first person, action, practical knowledge, causation, ethics, war, sexuality, religion, and reception.'},
  {id: 'anscombe-iep', type: 'scholarly-reference', authors: ['Duncan Richter'], title: 'G. E. M. Anscombe', containerTitle: 'Internet Encyclopedia of Philosophy', publisher: 'University of Tennessee at Martin', url: 'https://iep.utm.edu/anscombe/', accessedOn, note: 'Independent overview used for first-person authority, causation, intention, consequentialism, military ethics, and sexual ethics.'},
  {id: 'anscombe-intention', type: 'primary-text', authors: ['G. E. M. Anscombe'], title: 'Intention', publisher: 'Harvard University Press', edition: 'Second edition', year: 1963, url: 'https://www.hup.harvard.edu/books/9780674003996', accessedOn, note: 'Primary source; section-number locators follow the stable numbered divisions used across editions.'},
  {id: 'anscombe-mmp', type: 'primary-text', authors: ['G. E. M. Anscombe'], title: 'Modern Moral Philosophy', containerTitle: 'Philosophy', year: 1958, doi: '10.1017/S0031819100037943', url: 'https://www.cambridge.org/core/journals/philosophy/article/modern-moral-philosophy/9B80460A8D6D4A25BEB8C9B0F056AB10', accessedOn, note: 'Primary source for the three theses, the law conception of ethics, consequentialism, virtue, and the call for philosophy of psychology.'},
  {id: 'anscombe-causation', type: 'primary-text', authors: ['G. E. M. Anscombe'], title: 'Causality and Determination', containerTitle: 'Causation and Conditionals', editors: ['Ernest Sosa'], publisher: 'Oxford University Press', year: 1975, url: 'https://philpapers.org/rec/ANSCAD', accessedOn, note: 'Primary source for criticism of necessary-connection models, derivativeness, causal language, and indeterminism.'},
  {id: 'anscombe-ethics', type: 'primary-text', authors: ['G. E. M. Anscombe'], title: 'Ethics, Religion and Politics: Collected Philosophical Papers, Volume III', publisher: 'University of Minnesota Press', year: 1981, url: 'https://www.upress.umn.edu/9780816613243/ethics-religion-and-politics/', accessedOn, note: 'Primary collection used for Truman, war, double effect, justice, contraception, sexuality, and religious commitment; essay titles are locators.'},
  {id: 'anscombe-memoir', type: 'institutional-archive', authors: ['Jenny Teichman'], title: 'Gertrude Elizabeth Margaret Anscombe, 1919–2001', containerTitle: 'Proceedings of the British Academy', publisher: 'British Academy', year: 2002, url: 'https://www.thebritishacademy.ac.uk/documents/374/115p031.pdf', accessedOn, note: 'Biographical memoir used for dates, education, Wittgenstein, publications, teaching, protest, family, and intellectual context.'},
  {id: 'anscombe-essays', type: 'scholarly-book', authors: ['Anton Ford', 'Jennifer Hornsby', 'Frederick Stoutland'], editors: ['Anton Ford', 'Jennifer Hornsby', 'Frederick Stoutland'], title: 'Essays on Anscombe’s Intention', publisher: 'Harvard University Press', year: 2011, url: 'https://www.hup.harvard.edu/books/9780674051027', accessedOn, note: 'Independent collection used for disputes about action description, practical knowledge, reasons and causes, first-person authority, and practical reasoning.'},
];

const murdochSources: EditorialSource[] = [
  {id: 'murdoch-sep', type: 'scholarly-reference', authors: ['Lawrence Blum'], title: 'Iris Murdoch', containerTitle: 'The Stanford Encyclopedia of Philosophy', publisher: 'Metaphysics Research Lab, Stanford University', url: 'https://plato.stanford.edu/entries/murdoch/', accessedOn, note: 'Specialist synthesis for biography, trajectory, moral realism, attention, inner activity, virtue, politics, feminism, and later duty.'},
  {id: 'murdoch-sovereignty', type: 'primary-text', authors: ['Iris Murdoch'], title: 'The Sovereignty of Good', publisher: 'Routledge', year: 1970, url: 'https://www.routledge.com/The-Sovereignty-of-Good/Murdoch/p/book/9780415253994', accessedOn, note: 'Primary collection; locators use the three essay titles rather than edition-dependent pages.'},
  {id: 'murdoch-metaphysics', type: 'primary-text', authors: ['Iris Murdoch'], title: 'Metaphysics as a Guide to Morals', publisher: 'Chatto & Windus', year: 1992, url: 'https://www.penguin.co.uk/books/359257/metaphysics-as-a-guide-to-morals-by-iris-murdoch/9780099433552', accessedOn, note: 'Primary source for the mature treatment of consciousness, the Good, art, religion, duty, politics, and metaphysics.'},
  {id: 'murdoch-existentialists', type: 'primary-text', authors: ['Iris Murdoch'], editors: ['Peter Conradi'], title: 'Existentialists and Mystics: Writings on Philosophy and Literature', publisher: 'Penguin', year: 1997, url: 'https://www.penguin.co.uk/books/360839/existentialists-and-mystics-by-iris-murdoch/9780140264920', accessedOn, note: 'Primary collection used for Sartre, vision and choice, the sublime, literature, religion, art, and the development of Murdoch’s project.'},
  {id: 'murdoch-companion', type: 'scholarly-book', authors: ['Justin Broackes'], editors: ['Justin Broackes'], title: 'Iris Murdoch, Philosopher', publisher: 'Oxford University Press', year: 2012, doi: '10.1093/acprof:oso/9780199696593.001.0001', url: 'https://academic.oup.com/book/6456', accessedOn, note: 'Independent essays used for context, concepts, moral realism, vision, art, metaphysics, and interpretive disputes.'},
  {id: 'murdoch-political', type: 'scholarly-book', authors: ['Gary Browning'], title: 'Iris Murdoch and the Political', publisher: 'Oxford University Press', year: 2024, doi: '10.1093/9780191937347.001.0001', url: 'https://academic.oup.com/book/57536', accessedOn, note: 'Independent study used to avoid treating politics as absent and to assess liberalism, communism, citizenship, gender, and the moral/political distinction.'},
  {id: 'murdoch-gender', type: 'journal-article', authors: ['Nora Hämäläinen'], title: 'Reduce Ourselves to Zero? Sabina Lovibond, Iris Murdoch, and Feminism', containerTitle: 'Hypatia', publisher: 'Cambridge University Press', year: 2015, doi: '10.1111/hypa.12172', url: 'https://www.cambridge.org/core/journals/hypatia/article/reduce-ourselves-to-zero-sabina-lovibond-iris-murdoch-and-feminism/F485C199AC18ED42D8811C367B71CC11', accessedOn, note: 'Focused secondary source used for disputes about self-scrutiny, gender, subordination, feminism, and social criticism.'},
  {id: 'murdoch-archive', type: 'institutional-archive', authors: ['Kingston University Archives and Special Collections'], title: 'Iris Murdoch Collections', publisher: 'Kingston University London', url: 'https://www.kingston.ac.uk/experience/our-campuses/library-and-learning-services/archives-and-special-collections', accessedOn, note: 'Institutional archive guide used for corpus, manuscripts, letters, notebooks, and the boundary between philosophical works, fiction, and posthumous materials.'},
];

const additions: Record<string, ArticleSection> = {
  bentham: addition('evidence-poverty-sexuality-empire', 'Evidence, poverty, sexuality, and the reach of administration', [
    'Bentham’s reform program extended beyond the topics for which he is now most famous. His vast writings on judicial evidence and procedure sought to make fact-finding less dependent on technical exclusions and professional mystery. His poor-law plans treated subsistence, employment, health, incentives, and supervision as connected administrative problems. These projects show analytical jurisprudence turning into institutional design: defining a legal concept is different from deciding which institutions should exist, and both are different from the later organizations called Benthamite. The designs can expose cruelty and waste while also making vulnerable people objects of classification by officials whose assumptions remain contestable.',
    'The manuscripts on sexual morality reveal a remarkably extensive utilitarian case against penal or religious sanctions on consensual private conduct. They were not, however, a public campaign that transformed nineteenth-century law; their late critical publication is part of the story. Similar care is needed with democracy and exclusion. Bentham’s mature constitutional thought attacked aristocratic interest and pressed toward representative democracy, yet the breadth, timing, and details of suffrage proposals varied. Impartial utility supplied resources for inclusion without automatically erasing the assumptions of a British male reformer writing inside unequal institutions.',
    'Bentham also addressed colonies, transportation, and proposals for codes beyond Britain. He criticized costly empire and the transportation system associated with New South Wales, but his international projects could still place a European codifier in the position of offering comprehensive law to other societies. It is therefore misleading either to recruit him as an uncomplicated anticolonial thinker or to treat every administrative scheme as one uniform project of domination. The evidence supports a divided legacy: powerful criticism of unaccountable suffering, together with confidence that sufficiently transparent expertise could render populations governable.',
  ], ['political-philosophy', 'utilitarianism', 'ethics'], ['bentham', 'mill'], ['Rationale of Judicial Evidence', 'Pauper Management Improved', 'Of Sexual Irregularities', 'Panopticon versus New South Wales']),
  mill: addition('religion-empire-and-qualified-liberty', 'Religion, empire, and the boundaries of liberty', [
    'Mill’s liberalism includes strong protection for religious discussion but is not grounded in conventional Christian doctrine. In the posthumous Three Essays on Religion he subjects natural theology and the moral character of nature to critical scrutiny, while leaving a qualified space for hope and imaginative religion. This part of the corpus matters because it connects freedom of thought to fallibilism and to Mill’s larger account of culture. It also prevents On Liberty from becoming a freestanding speech manifesto detached from his logic, psychology, ethics, and reflections on human development.',
    'The harm principle applies to competent human beings in what Mill calls the maturity of their faculties, and it does not eliminate duties to others, liability for other-regarding conduct, regulation of dangerous circumstances, or education of children. Mill also notoriously withholds its full application from societies he classifies as not yet capable of improvement through free discussion. His long East India Company career and his writings on dependencies place that exception inside institutions of imperial rule. The tension cannot be repaired by treating the exception as a casual aside, nor can the whole corpus be reduced to it. Mill’s arguments against arbitrary interference and inherited hierarchy remain critical resources whose stated scope was narrowed by a developmental hierarchy.',
    'The same ambivalence appears in representative government. Participation can educate judgment, yet Mill proposed competence-weighted devices and defended paternal rule under some colonial conditions. His liberal individual is socially formed through education, association, labor, family, and political institutions rather than naturally self-sufficient. A responsible interpretation therefore distinguishes anti-paternalism among competent adults from every form of regulation, and distinguishes Mill’s defense of individuality from unrestricted speech, laissez-faire economics, or a guarantee that liberal institutions themselves will identify competence without prejudice.',
  ], ['political-philosophy', 'utilitarianism', 'philosophy-of-religion'], ['mill', 'bentham'], ['Three Essays on Religion', 'On Liberty', 'Considerations on Representative Government']),
  anscombe: addition('prediction-desire-first-person-religion', 'Prediction, desire, first-person authority, and contested moral commitments', [
    'Anscombe distinguishes intending from predicting, desiring, and merely foreseeing. Someone may predict an outcome with certainty yet refuse to make it an aim; may desire an outcome without forming any plan; or may foresee a side effect while intending a different end and means. These distinctions do not by themselves decide the moral status of a case. They identify the action that moral judgment must address. Her account of first-person authority is likewise not a claim that agents are infallible about themselves. Practical knowledge can be defective when performance fails, the agent misunderstands circumstances, or a description is not one under which the action is intentional.',
    'Aristotle and Aquinas are active argumentative resources in this account, especially practical reasoning and the claim that practical knowledge is in a distinctive sense productive of what it knows. Wittgenstein’s influence appears in her attention to grammar, criteria, and the temptation to invent inner objects, but Anscombe’s theory is not a transcription of Wittgenstein. Later causal theories of action, neo-Aristotelian accounts, and first-person theories inherit different parts of the project. Their disagreement is reception, not proof that Intention secretly contains one settled contemporary school.',
    'Her Catholic convictions shaped public opposition to civilian bombing, abortion, contraception, and some forms of sexual conduct. The arguments and their conclusions must be reported accurately without treating ecclesial commitment as either a refutation or a substitute for analysis. Her defense of absolute prohibitions and double-effect distinctions remains disputed, as do her sexual ethics. “Modern Moral Philosophy” redirected Anglophone ethics toward psychology and virtue, but it did not itself supply a complete virtue theory; making later virtue ethics stand in for Anscombe would conceal both the breadth of her work and the severity of positions many later virtue ethicists reject.',
  ], ['analytic-philosophy', 'philosophy-of-mind', 'ethics'], ['anscombe', 'wittgenstein', 'aristotle'], ['Intention', 'Modern Moral Philosophy', 'Ethics, Religion and Politics']),
  'iris-murdoch': addition('love-politics-gender-and-later-development', 'Love, politics, gender, and a changing moral philosophy', [
    'Love in Murdoch’s philosophy is neither warmth nor permission to idealize. To love is to acknowledge another center of reality whose particularity resists the ego’s fantasy. Attention can fail because the agent never notices, cannot sustain focus, or redescribes the other in flattering terms; “loving” must therefore remain answerable to justice and truth. Art can rehearse unselfing by presenting form and particularity independent of the spectator, but literature is not automatically morally improving. Murdoch’s novels stage opacity, contingency, manipulation, sexuality, and self-deception rather than translating essays into characters with fixed doctrinal labels.',
    'Her non-theistic use of transcendence is deliberately difficult. The Good is not a personal God who commands, yet it is more than whatever an individual chooses. Murdoch draws selectively on Plato, Simone Weil, Kant, Christianity, Buddhism, Hindu thought, psychoanalysis, and literature without claiming that these sources are equivalent. In the later Metaphysics as a Guide to Morals, duty receives more positive weight than some readings of The Sovereignty of Good suggest. The mature corpus should therefore not be frozen at the mother-in-law example or reduced to a single formula in which seeing always replaces doing.',
    'Politics and gender expose limits as well as resources. Murdoch distinguishes perfection appropriate to personal moral-spiritual life from the decency that liberal political institutions can seek; scholars dispute whether this protects pluralism or separates inner morality too sharply from structural power. Feminist readers have found resources in attention, particularity, and criticism of mastery while questioning humility, self-erasure, gendered service, and the relative silence about social sources of distorted vision. Her early communist involvement, later liberalism, and recurring concern with power show that politics was present, though never organized into a comprehensive political theory.',
  ], ['ethics', 'aesthetics', 'political-philosophy', 'feminist-philosophy'], ['iris-murdoch', 'plato', 'anscombe'], ['The Sovereignty of Good', 'Metaphysics as a Guide to Morals', 'Existentialists and Mystics']),
};

const configs: Record<string, ModernClusterEditorialConfig> = {
  bentham: {
    sources: benthamSources,
    sectionCitations: sections(
      [['overview', 'historical-setting', 'life-and-source-caution'], [q('bentham-sep', 'section', '1–3'), q('bentham-iep', 'section', 'Life and method'), q('bentham-project', 'work', 'Critical-edition and manuscript overview')]],
      [['principle-of-utility', 'felicific-calculus'], [q('bentham-ipml', 'chapter', 'Chapters I, IV–VI'), q('bentham-sep', 'section', '4. Moral philosophy')]],
      [['law-and-punishment'], [q('bentham-ipml', 'chapter', 'Chapters XIII–XVII'), q('bentham-sep', 'section', '6–7'), q('bentham-evidence', 'book-chapter', 'Parts II–III')]],
      [['rights-and-fictions'], [q('bentham-fragment', 'work', 'Preface and chapters I, IV'), q('bentham-iep', 'section', 'Law and rights'), q('bentham-evidence', 'book-chapter', 'Parts I–II')]],
      [['democracy-and-reform'], [q('bentham-sep', 'section', '8. Constitutional law'), q('bentham-iep', 'section', 'Political philosophy')]],
      [['panopticon'], [q('bentham-panopticon', 'work', 'Panopticon and New South Wales writings'), q('bentham-sep', 'section', '7. Penal law and punishment')]],
      [['animals-and-marginal-cases'], [q('bentham-ipml', 'chapter', 'Chapter XVII, section 1 note'), q('bentham-sep', 'section', '4 and 7')]],
      [['influence-and-criticism', 'misunderstandings', 'reading-strategy'], [q('bentham-sep', 'section', '4–9'), q('bentham-iep', 'section', 'Criticism and influence'), q('bentham-project', 'work', 'Collected Works overview')]],
      [['evidence-poverty-sexuality-empire'], [q('bentham-evidence', 'book-chapter', 'Parts II–III'), q('bentham-sexuality', 'work', 'Of Sexual Irregularities and Sextus'), q('bentham-panopticon', 'work', 'Panopticon versus New South Wales'), q('bentham-sep', 'section', '3, 7–8')]],
    ),
    evidence: {
      life: [q('bentham-sep', 'section', '1–3'), q('bentham-project', 'work', 'Corpus overview')],
      ideas: [q('bentham-ipml', 'chapter', 'Chapters I, IV–VI'), q('bentham-sep', 'section', '4–8')],
      works: [q('bentham-project', 'work', 'Collected Works overview'), q('bentham-ipml', 'work', 'Whole work'), q('bentham-panopticon', 'work', 'Editorial introduction')],
      influence: [q('bentham-sep', 'section', '9. Influence'), q('bentham-iep', 'section', 'Influence')],
      disputes: [q('bentham-evidence', 'book-chapter', 'Parts I–III'), q('bentham-sep', 'section', '4–9'), q('bentham-sexuality', 'work', 'Editorial introduction')],
      reading: [q('bentham-ipml', 'chapter', 'Chapters I, IV, XIII'), q('bentham-fragment', 'work', 'Preface'), q('bentham-project', 'work', 'Collected Works overview')],
    },
    patch: {
      contributionSummary: 'Built classical utilitarianism into a program of analytical jurisprudence and institutional reform spanning legislation, evidence, punishment, administration, democracy, sexuality, poverty, animals, and empire.',
      mainIdeas: ['Principle of utility', 'Pleasure and pain as legislative standards', 'Codification and publicity', 'Punishment as an evil requiring preventive justification', 'Artificial legal rights', 'Institutional inspection and accountability'],
      keyWorks: ['A Fragment on Government', 'An Introduction to the Principles of Morals and Legislation', 'Panopticon writings', 'Rationale of Judicial Evidence', 'Constitutional Code', 'Of Sexual Irregularities'],
      dateDisplay: '1748–1832', dateConfidence: 'high', dateNote: 'Birth and death years are secure. Many works circulated late or posthumously, so manuscript date, first publication, translation, and critical-edition date must be distinguished.',
      lifeStory: 'Jeremy Bentham trained for the English bar but chose criticism and reconstruction of law over legal practice. His immense manuscript corpus ranges across morals, jurisprudence, evidence, procedure, punishment, administration, political economy, religion, sexuality, poor relief, democracy, colonies, and international law. Followers and editors transmitted this work unevenly, so “Benthamism” is not identical with everything Bentham wrote.',
      historicalContext: 'Bentham worked amid Enlightenment reform, Britain’s uncodified common law, severe penal practice, revolution and reaction, expanding administration, industrial change, and empire. His drive for public reasons and accountable institutions challenged inherited privilege while also expressing confidence in classification, incentives, inspection, and expert design.',
      beginnerExplanation: 'Bentham asks what a law or institution actually does to every affected sentient interest. His famous dimensions of pleasure and pain organize attention to consequences; they are not a push-button algorithm routinely used for every choice. The humane demand to justify suffering coexists with hard questions about aggregation, surveillance, and who controls administrative measures.',
      suggestedFirstReading: 'An Introduction to the Principles of Morals and Legislation, chapters I and XIII',
      beginnerReadingPath: [
        reading('Jeremy Bentham', 'An Introduction to the Principles of Morals and Legislation, chapters I, IV, and XIII', 'beginner', 'Introduces utility, dimensions of pleasure and pain, and punishment without pretending to offer a daily arithmetic algorithm.'),
        reading('James E. Crimmins', 'Jeremy Bentham', 'beginner', 'Maps the sprawling corpus and separates moral theory, jurisprudence, politics, punishment, and later reception.', 'article'),
        reading('Jeremy Bentham', 'A Fragment on Government, preface and chapter I', 'intermediate', 'Shows the legal critic attacking justificatory fictions and inherited authority.'),
      ],
      advancedReadingPath: [
        reading('Jeremy Bentham', 'Panopticon versus New South Wales and Other Writings on Australia', 'advanced', 'Use the critical editorial introduction to connect inspection, punishment, transportation, and colonial policy.'),
        reading('Jeremy Bentham', 'Of Sexual Irregularities, and Other Writings on Sexual Morality', 'advanced', 'Study the unpublished utilitarian defense of consensual sexual liberty with attention to manuscript history.'),
        reading('Gerald J. Postema', 'Bentham and the Common Law Tradition', 'advanced', 'Examine law, adjudication, codification, and evidence beyond the standard pleasure-calculus portrait.', 'secondary'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/bentham.md', reviewLock: 'fnv1a64:9ad4d691577ad134', reviewedOn: '2026-08-03',
  },
  mill: {
    sources: millSources,
    sectionCitations: sections(
      [['overview', 'formation'], [q('mill-general-sep', 'section', '1–2'), q('mill-companion', 'book-chapter', 'Introduction and chapters on life and development')]],
      [['utilitarianism', 'proof-utility'], [q('mill-utilitarianism', 'chapter', 'Chapters II–V'), q('mill-sep', 'section', '2–4')]],
      [['liberty', 'speech', 'individuality'], [q('mill-liberty', 'chapter', 'Chapters I–V'), q('mill-sep', 'section', '5–7')]],
      [['women-equality'], [q('mill-women', 'chapter', 'Chapters I–IV'), q('mill-companion', 'book-chapter', 'Chapter on Mill and feminism')]],
      [['democracy-government'], [q('mill-government', 'chapter', 'Chapters III, VII–VIII, XVI–XVIII'), q('mill-sep', 'section', '8'), q('mill-companion', 'book-chapter', 'Chapters on democracy and empire')]],
      [['logic-empiricism'], [q('mill-logic-economy', 'work', 'A System of Logic, Books III and VI'), q('mill-general-sep', 'section', 'Logic, induction, and social science')]],
      [['political-economy'], [q('mill-logic-economy', 'work', 'Principles of Political Economy, Books II and IV'), q('mill-general-sep', 'section', 'Political economy'), q('mill-companion', 'book-chapter', 'Chapter on political economy')]],
      [['legacy-reading'], [q('mill-sep', 'section', '2–8'), q('mill-general-sep', 'section', '1–8'), q('mill-companion', 'book-chapter', 'Introduction')]],
      [['religion-empire-and-qualified-liberty'], [q('mill-liberty', 'chapter', 'Chapters I, IV–V'), q('mill-government', 'chapter', 'Chapters IV, XVI–XVIII'), q('mill-general-sep', 'section', 'Religion and political philosophy'), q('mill-companion', 'book-chapter', 'Chapters on religion, liberty, government, and empire')]],
    ),
    evidence: {
      life: [q('mill-general-sep', 'section', '1. Life'), q('mill-companion', 'book-chapter', 'Introduction')],
      ideas: [q('mill-sep', 'section', '2–8'), q('mill-general-sep', 'section', 'Logic, ethics, politics, and religion')],
      works: [q('mill-liberty', 'work', 'Whole work'), q('mill-utilitarianism', 'work', 'Whole work'), q('mill-government', 'work', 'Whole work'), q('mill-logic-economy', 'work', 'Corpus portal')],
      influence: [q('mill-sep', 'section', '1 and 8'), q('mill-general-sep', 'section', '1–4'), q('mill-companion', 'book-chapter', 'Introduction and reception')],
      disputes: [q('mill-companion', 'book-chapter', 'Chapters on utility, liberty, feminism, democracy, economy, and empire'), q('mill-sep', 'section', '2–8')],
      reading: [q('mill-liberty', 'chapter', 'Chapters I–III'), q('mill-utilitarianism', 'chapter', 'Chapters II and V'), q('mill-women', 'chapter', 'Chapter I')],
    },
    patch: {
      contributionSummary: 'Revised utilitarianism through qualitative development and joined it to liberty, individuality, representative government, gender equality, empirical logic, political economy, and critical reflection on religion.',
      mainIdeas: ['Greatest happiness with qualitative pleasures', 'Liberty and the harm principle', 'Experiments in living', 'Fallibility and free discussion', 'Representative participation and competence', 'Gender equality', 'Induction and social science'],
      keyWorks: ['A System of Logic', 'Principles of Political Economy', 'On Liberty', 'Utilitarianism', 'Considerations on Representative Government', 'The Subjection of Women', 'Autobiography', 'Three Essays on Religion'],
      dateDisplay: '1806–1873', dateConfidence: 'high', dateNote: 'Birth and death years are secure. Essays often appeared serially or in revised editions; publication date should not be confused with composition or posthumous collection.',
      lifeStory: 'John Stuart Mill’s intensive Benthamite education, early reform activity, mental crisis, encounters with Romanticism, partnership with Harriet Taylor Mill, thirty-five-year East India Company career, parliamentary service, and repeated revision of logic and political economy all belong to one developing project. Harriet Taylor Mill’s contribution was substantial, but the exact authorship history of individual texts remains disputed.',
      historicalContext: 'Mill wrote amid British industrialization, class conflict, empire, franchise reform, associationist psychology, Romantic reactions to rationalism, women’s-rights campaigns, socialism, and debates over religious authority. His liberal and utilitarian arguments both contest and reproduce nineteenth-century hierarchies of competence and civilization.',
      beginnerExplanation: 'Mill protects room for competent adults to think, speak, associate, and experiment in living because individuality and correction promote well-being. The harm principle is not unrestricted speech or a ban on all regulation: it includes qualifications concerning harm, duty, dangerous contexts, children, competence, and—most troublingly—colonial societies Mill placed outside its full protection.',
      suggestedFirstReading: 'On Liberty, chapters I–III',
      beginnerReadingPath: [
        reading('John Stuart Mill', 'On Liberty, chapters I–III', 'beginner', 'Read the principle together with fallibility, social tyranny, and individuality before applying it as a slogan.'),
        reading('John Stuart Mill', 'Utilitarianism, chapters II and V', 'intermediate', 'Connect qualitative pleasure to justice, rights, sanctions, and rules.'),
        reading('John Stuart Mill', 'The Subjection of Women, chapter I', 'beginner', 'See why observed character cannot establish natural capacity under conditions of subordination.'),
      ],
      advancedReadingPath: [
        reading('John Stuart Mill', 'A System of Logic, Books III and VI', 'advanced', 'Study induction and the difficult extension of causal inquiry to social phenomena.'),
        reading('John Stuart Mill', 'Principles of Political Economy, Books II and IV', 'advanced', 'Track distribution, property, labor, cooperation, and the editions through which Mill’s views developed.'),
        reading('John Skorupski, ed.', 'The Cambridge Companion to Mill', 'advanced', 'Compare disputes across logic, utility, liberty, gender, democracy, economy, religion, and empire.', 'secondary'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/mill.md', reviewLock: 'fnv1a64:aa8e7f27fc8adef2', reviewedOn: '2026-08-03',
  },
  anscombe: {
    sources: anscombeSources,
    sectionCitations: sections(
      [['overview', 'context'], [q('anscombe-sep', 'section', '1–2'), q('anscombe-memoir', 'work', 'Biographical memoir'), q('anscombe-iep', 'section', '1. Life')]],
      [['wittgenstein'], [q('anscombe-sep', 'section', '1–2'), q('anscombe-memoir', 'work', 'Wittgenstein and publications')]],
      [['intention-book', 'description'], [q('anscombe-intention', 'standard-division', 'Sections 1–26'), q('anscombe-sep', 'section', '3–4'), q('anscombe-essays', 'book-chapter', 'Essays on action description and the question why')]],
      [['practical-knowledge'], [q('anscombe-intention', 'standard-division', 'Sections 28–32 and 45–48'), q('anscombe-sep', 'section', '4. Practical knowledge'), q('anscombe-essays', 'book-chapter', 'Essays on practical knowledge')]],
      [['modern-moral-philosophy', 'consequentialism'], [q('anscombe-mmp', 'page', '1–19'), q('anscombe-sep', 'section', '5. Moral philosophy'), q('anscombe-iep', 'section', '5–6')]],
      [['truman'], [q('anscombe-ethics', 'work', 'Mr. Truman’s Degree'), q('anscombe-sep', 'section', '5. Moral and political philosophy'), q('anscombe-memoir', 'work', 'Oxford protest')]],
      [['causality'], [q('anscombe-causation', 'work', 'Whole essay'), q('anscombe-sep', 'section', '3. Causation'), q('anscombe-iep', 'section', '3. Causation')]],
      [['influence', 'misunderstandings', 'reading-strategy'], [q('anscombe-sep', 'section', '2–6'), q('anscombe-iep', 'section', '2–8'), q('anscombe-essays', 'book-chapter', 'Introduction')]],
      [['prediction-desire-first-person-religion'], [q('anscombe-intention', 'standard-division', 'Sections 1–4, 28–32, 45–48, 52'), q('anscombe-mmp', 'page', '1–19'), q('anscombe-ethics', 'work', 'Mr. Truman’s Degree; War and Murder; Contraception and Chastity'), q('anscombe-sep', 'section', '3–6')]],
    ),
    evidence: {
      life: [q('anscombe-memoir', 'work', 'Whole memoir'), q('anscombe-sep', 'section', '1. Life')],
      ideas: [q('anscombe-intention', 'standard-division', 'Sections 1–52'), q('anscombe-sep', 'section', '2–6')],
      works: [q('anscombe-intention', 'work', 'Whole work'), q('anscombe-mmp', 'work', 'Whole essay'), q('anscombe-ethics', 'work', 'Collected essays'), q('anscombe-causation', 'work', 'Whole essay')],
      influence: [q('anscombe-essays', 'book-chapter', 'Introduction and essays'), q('anscombe-sep', 'section', '2–6')],
      disputes: [q('anscombe-sep', 'section', '4–6'), q('anscombe-iep', 'section', '4–8'), q('anscombe-essays', 'book-chapter', 'Essays on practical knowledge and action')],
      reading: [q('anscombe-intention', 'standard-division', 'Sections 1–5, 18–26, 28–32, 45–48'), q('anscombe-mmp', 'work', 'Whole essay')],
    },
    patch: {
      contributionSummary: 'Transformed philosophy of action through intention, action description, practical knowledge, first-person authority, reasons, and causation, while mounting a historically influential critique of modern moral philosophy.',
      mainIdeas: ['Intention under a description', 'The question why', 'Practical knowledge without observation', 'First-person authority without infallibility', 'Practical reasoning', 'Causal plurality', 'Critique of consequentialism and law-like moral obligation'],
      keyWorks: ['Intention', 'Modern Moral Philosophy', 'An Introduction to Wittgenstein’s Tractatus', 'Causality and Determination', 'Ethics, Religion and Politics'],
      dateDisplay: '1919–2001', dateConfidence: 'high', dateNote: 'Birth and death dates are secure. Intention first appeared in 1957 and was revised for its 1963 second edition; essay publication and later collection dates should be distinguished.',
      lifeStory: 'Gertrude Elizabeth Margaret Anscombe studied classics and philosophy at Oxford, became a close philosophical interlocutor and literary executor of Wittgenstein, translated Philosophical Investigations, and taught at Oxford and Cambridge. A convert to Roman Catholicism, she joined technical philosophy to public moral protest, including opposition to Oxford’s honorary degree for Harry Truman.',
      historicalContext: 'Anscombe wrote within postwar analytic and ordinary-language philosophy, renewed Aristotelian and Thomistic inquiry, debates over reasons and causes, and controversies about consequentialism, nuclear war, abortion, sexuality, and religious ethics. Her later reception in virtue ethics is important but only one part of a much wider corpus.',
      beginnerExplanation: 'Anscombe asks what someone is intentionally doing, under which description, for what reason, and how the agent knows it. Intention is not the same as wanting, predicting, foreseeing, or merely causing a result. Her moral philosophy depends on those action distinctions, but her own controversial Catholic conclusions should not be confused with everything later virtue ethicists took from her.',
      suggestedFirstReading: 'Intention, sections 1–5 and 18–26',
      beginnerReadingPath: [
        reading('G. E. M. Anscombe', 'Intention, sections 1–5 and 18–26', 'intermediate', 'Begin with intentional action, the question why, and multiple descriptions of one performance.'),
        reading('Eric Wiland and Julia Driver', 'Gertrude Elizabeth Margaret Anscombe', 'beginner', 'Use a specialist map before approaching the compact primary texts.', 'article'),
        reading('G. E. M. Anscombe', 'Modern Moral Philosophy', 'intermediate', 'Read the three theses and the critique of consequentialism as diagnosis, not a complete virtue theory.', 'essay'),
      ],
      advancedReadingPath: [
        reading('G. E. M. Anscombe', 'Intention, sections 28–32 and 45–52', 'advanced', 'Study practical knowledge, practical reasoning, error, and the cause-of-what-it-understands claim.'),
        reading('G. E. M. Anscombe', 'Ethics, Religion and Politics', 'advanced', 'Test the relations among action theory, absolute prohibitions, war, sexuality, justice, and Catholic commitment.'),
        reading('Anton Ford, Jennifer Hornsby, and Frederick Stoutland, eds.', 'Essays on Anscombe’s Intention', 'advanced', 'Compare influential disagreements about reasons, causes, description, and first-person knowledge.', 'secondary'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/anscombe.md', reviewLock: 'fnv1a64:454368017127b889', reviewedOn: '2026-08-03',
  },
  'iris-murdoch': {
    sources: murdochSources,
    sectionCitations: sections(
      [['overview', 'historical-setting'], [q('murdoch-sep', 'section', '1–4'), q('murdoch-companion', 'book-chapter', 'Introduction and chapters on context')]],
      [['attention', 'unselfing'], [q('murdoch-sovereignty', 'work', 'The Idea of Perfection; On “God” and “Good”'), q('murdoch-sep', 'section', '6–13')]],
      [['good'], [q('murdoch-sovereignty', 'work', 'On “God” and “Good”; The Sovereignty of Good over Other Concepts'), q('murdoch-sep', 'section', '5. Moral reality and moral realism'), q('murdoch-companion', 'book-chapter', 'Chapters on the Good and moral realism')]],
      [['freedom'], [q('murdoch-sovereignty', 'work', 'The Idea of Perfection'), q('murdoch-existentialists', 'work', 'The Sovereignty of Good; Sartre essays'), q('murdoch-sep', 'section', '4 and 6–8')]],
      [['literature'], [q('murdoch-existentialists', 'work', 'The Sublime and the Good; Against Dryness; literature essays'), q('murdoch-metaphysics', 'chapter', 'Chapters on art and literature'), q('murdoch-companion', 'book-chapter', 'Chapters on art and literature')]],
      [['analytic-context'], [q('murdoch-sep', 'section', '2–4 and 14'), q('murdoch-companion', 'book-chapter', 'Chapters on analysis, virtue, and method')]],
      [['religion-secular'], [q('murdoch-sovereignty', 'work', 'On “God” and “Good”'), q('murdoch-metaphysics', 'chapter', 'Chapters on religion and the Good'), q('murdoch-sep', 'section', '5 and 15')]],
      [['criticisms'], [q('murdoch-sep', 'section', '10–15'), q('murdoch-political', 'chapter', 'Chapters on moral and political domains'), q('murdoch-gender', 'work', 'Whole article')]],
      [['misunderstandings', 'reading-strategy'], [q('murdoch-sep', 'section', '1–15'), q('murdoch-companion', 'book-chapter', 'Introduction'), q('murdoch-archive', 'work', 'Collections overview')]],
      [['love-politics-gender-and-later-development'], [q('murdoch-sovereignty', 'work', 'The Idea of Perfection; On “God” and “Good”; The Sovereignty of Good over Other Concepts'), q('murdoch-metaphysics', 'chapter', 'Chapters on duty, art, politics, and religion'), q('murdoch-political', 'chapter', 'Chapters 1–7'), q('murdoch-gender', 'work', 'Whole article'), q('murdoch-sep', 'section', '10–15')]],
    ),
    evidence: {
      life: [q('murdoch-sep', 'section', '1–3'), q('murdoch-archive', 'work', 'Collections overview')],
      ideas: [q('murdoch-sovereignty', 'work', 'Three essays'), q('murdoch-metaphysics', 'work', 'Whole work'), q('murdoch-sep', 'section', '4–15')],
      works: [q('murdoch-sovereignty', 'work', 'Whole work'), q('murdoch-metaphysics', 'work', 'Whole work'), q('murdoch-existentialists', 'work', 'Collected essays')],
      influence: [q('murdoch-sep', 'section', '2 and 10–14'), q('murdoch-companion', 'book-chapter', 'Introduction and reception chapters')],
      disputes: [q('murdoch-political', 'chapter', 'Chapters 1–7'), q('murdoch-gender', 'work', 'Whole article'), q('murdoch-sep', 'section', '10–15')],
      reading: [q('murdoch-sovereignty', 'work', 'The Idea of Perfection'), q('murdoch-existentialists', 'work', 'Vision and Choice in Morality'), q('murdoch-metaphysics', 'chapter', 'Selected chapters')],
    },
    patch: {
      contributionSummary: 'Recast ethics around attention, moral vision, fantasy, unselfing, love, art, freedom, and a non-theistic Platonic Good while sustaining philosophy and literature as distinct but interacting practices.',
      mainIdeas: ['Just and loving attention', 'Moral vision and description', 'Fantasy and the ego', 'Unselfing', 'The sovereignty of Good', 'Freedom as truthful responsiveness', 'Art and literature as disciplines of attention'],
      keyWorks: ['Sartre: Romantic Rationalist', 'The Sovereignty of Good', 'The Fire and the Sun', 'Metaphysics as a Guide to Morals', 'Existentialists and Mystics'],
      dateDisplay: '1919–1999', dateConfidence: 'high', dateNote: 'Birth and death years are secure. The Sovereignty of Good collects three separately delivered and published essays; it is not a single continuous treatise composed in 1970.',
      lifeStory: 'Iris Murdoch studied classics and philosophy at Oxford, worked in wartime government and postwar relief, studied philosophy at Cambridge, and taught at St Anne’s College, Oxford. She wrote philosophy, twenty-six novels, plays, poetry, reviews, and letters. Philosophy and fiction illuminate shared problems of attention and self-deception, but neither should be decoded as a simple version of the other.',
      historicalContext: 'Murdoch developed her ethics against postwar existentialist and analytic pictures of the sovereign choosing will. Plato, Simone Weil, Kant, Sartre, Wittgensteinian analysis, psychoanalysis, religious thought, Asian traditions, art, and literature enter a selective modern moral realism whose politics, gender implications, and metaphysical strength remain disputed.',
      beginnerExplanation: 'Murdoch argues that moral life begins before a dramatic choice, in what we notice and how fantasy organizes another person. Attention and unselfing seek a just, loving, reality-directed vision. This is not passive niceness: seeing can demand action, and her later work gives duty a larger role while distinguishing personal perfection from politically achievable decency.',
      suggestedFirstReading: 'The Sovereignty of Good, “The Idea of Perfection”',
      beginnerReadingPath: [
        reading('Iris Murdoch', 'The Sovereignty of Good: “The Idea of Perfection”', 'beginner', 'Start with the mother-in-law example and the argument that inner vision can be morally active.'),
        reading('Lawrence Blum', 'Iris Murdoch', 'beginner', 'A specialist guide to trajectory, attention, realism, politics, feminism, and later duty.', 'article'),
        reading('Iris Murdoch', 'Vision and Choice in Morality', 'intermediate', 'See the early critique of a moral philosophy centered too narrowly on publicly observable choice.', 'essay'),
      ],
      advancedReadingPath: [
        reading('Iris Murdoch', 'Metaphysics as a Guide to Morals', 'advanced', 'Follow the mature, difficult treatment of consciousness, art, religion, duty, the Good, and politics.'),
        reading('Iris Murdoch', 'Existentialists and Mystics', 'advanced', 'Trace development across philosophy, literature, Sartre, art, religion, and moral psychology.'),
        reading('Justin Broackes, ed.', 'Iris Murdoch, Philosopher', 'advanced', 'Compare specialist interpretations of realism, vision, art, virtue, and metaphysics.', 'secondary'),
      ],
    },
    reviewNotePath: 'docs/editorial/reviews/iris-murdoch.md', reviewLock: 'fnv1a64:c903e4366cb8269c', reviewedOn: '2026-08-03',
  },
};

export const utilityModernMoralTargetIds = ['bentham', 'mill', 'anscombe', 'iris-murdoch'] as const;

const proseReplacements: Readonly<Record<string, ReadonlyArray<readonly [string, string]>>> = {
  mill: [[
    'John Stuart Mill is the most influential nineteenth-century defender of liberal liberty and one of the major revisers of utilitarianism.',
    'John Stuart Mill is a major nineteenth-century defender of liberal liberty and a central reviser of utilitarianism.',
  ]],
  anscombe: [
    ['Anscombe was one of the most important mediators of Wittgenstein\'s philosophy.', 'Anscombe was a major mediator of Wittgenstein\'s philosophy.'],
    ['One of Anscombe\'s most influential claims is that intentional action involves practical knowledge.', 'A central Anscombean claim is that intentional action involves practical knowledge.'],
    ['Anscombe\'s influence on philosophy of action is difficult to overstate.', 'Anscombe\'s work became a major reference point in twentieth- and twenty-first-century philosophy of action.'],
  ],
  'iris-murdoch': [[
    'the fat relentless ego',
    'an ego that persistently recenters experience on itself',
  ]],
};

const applyReviewedProseCorrections = (recordId: string, articleSections: ArticleSection[]): ArticleSection[] => {
  const replacements = proseReplacements[recordId] ?? [];
  return articleSections.map((section) => ({
    ...section,
    paragraphs: section.paragraphs.map((paragraph) => {
      const replaceText = (text: string) => replacements.reduce(
        (revised, [before, after]) => revised.replace(before, after),
        text,
      );
      return typeof paragraph === 'string'
        ? replaceText(paragraph)
        : {...paragraph, text: replaceText(paragraph.text)};
    }),
  }));
};

export const applyUtilityModernMoralEditorial = (record: Philosopher): Philosopher => {
  const config = configs[record.id];
  const extraSection = additions[record.id];
  if (!config || !extraSection) return record;
  const articleSections = [...(record.articleSections ?? [])];
  if (!articleSections.some((section) => section.id === extraSection.id)) {
    articleSections.push(extraSection);
  }
  return applyModernClusterEditorialConfig({
    ...record,
    articleSections: applyReviewedProseCorrections(record.id, articleSections),
  }, config);
};
