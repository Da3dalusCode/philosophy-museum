export const ARTICLE_PROSE_WORD_MINIMUM = 2000;

const originalArticleDepthTargets = [
  'plato', 'platonism', 'socrates', 'aristotle', 'ancient-greek', 'epicurus', 'epictetus',
  'stoicism', 'epicureanism', 'zeno', 'seneca', 'marcus-aurelius', 'skepticism', 'pyrrho',
  'sextus-empiricus', 'lucretius', 'cynicism', 'diogenes', 'cleanthes', 'chrysippus', 'plotinus',
  'aristotelianism', 'neoplatonism', 'arcesilaus', 'carneades', 'porphyry', 'iamblichus', 'proclus',
  'pseudo-dionysius', 'augustine', 'boethius', 'anselm', 'aquinas', 'avicenna', 'maimonides',
  'duns-scotus', 'ockham', 'descartes', 'spinoza', 'leibniz', 'locke', 'hume', 'confucius',
  'laozi', 'zhuangzi', 'buddha', 'nagarjuna', 'shankara', 'hegel', 'schopenhauer', 'kierkegaard',
  'marx', 'mill', 'al-kindi', 'al-farabi', 'al-ghazali', 'averroes', 'frege', 'russell',
  'g-e-moore', 'carnap', 'quine', 'anscombe', 'machiavelli', 'bacon', 'hobbes', 'berkeley',
  'rousseau', 'bentham', 'mencius', 'xunzi', 'mozi', 'han-feizi', 'zhu-xi', 'wang-yangming',
  'thales', 'anaximander', 'anaximenes', 'pythagoras', 'philolaus', 'parmenides', 'zeno-elea',
  'heraclitus', 'empedocles', 'anaxagoras', 'leucippus', 'democritus', 'protagoras', 'gorgias',
  'antisthenes', 'peirce', 'william-james', 'dewey', 'whitehead', 'popper', 'kuhn', 'mahavira',
  'kanada', 'patanjali', 'vasubandhu', 'dignaga', 'dharmakirti', 'ramanuja', 'madhva', 'origen',
  'gregory-nyssa', 'eriugena', 'abelard', 'meister-eckhart', 'marsilius-padua', 'mary-astell',
  'anne-conway', 'montesquieu', 'adam-smith', 'wollstonecraft', 'martha-nussbaum', 'judith-butler',
  'angela-davis', 'bell-hooks', 'merleau-ponty', 'levinas', 'gadamer', 'iris-murdoch',
  'philippa-foot', 'judith-thomson', 'thomas-nagel', 'derek-parfit',
];

export const completionPhilosopherTargets = [
  'prodicus', 'hippias-of-elis', 'fichte', 'schelling', 'husserl', 'heidegger', 'sartre',
  'beauvoir', 'camus', 'arendt', 'rawls', 'nozick', 'foucault', 'derrida', 'habermas', 'fanon',
  'saadia-gaon', 'judah-halevi', 'ibn-tufayl', 'suhrawardi', 'mulla-sadra',
];

export const sprintBranchTargets = [
  'philosophy-of-religion', 'medieval-scholasticism', 'islamic-philosophy', 'rationalism',
  'empiricism', 'german-idealism', 'existentialism', 'phenomenology', 'political-philosophy',
  'philosophy-of-science', 'metaphysics', 'ontology', 'virtue-ethics', 'deontology',
  'utilitarianism', 'logic', 'philosophy-of-language', 'philosophy-of-mind', 'aesthetics',
  'pragmatism', 'continental-philosophy', 'feminist-philosophy', 'chinese-philosophy',
  'confucianism', 'daoism', 'mohism', 'legalism', 'indian-philosophy', 'jainism', 'vedanta',
  'buddhist-philosophy', 'buddhist-epistemology',
];

/** Historical comparison only. Universal coverage is derived from canonicalArticles. */
export const legacyArticleDepthTargetIds = [
  ...originalArticleDepthTargets,
  ...completionPhilosopherTargets,
  ...sprintBranchTargets,
];

export const articleParagraphText = (paragraph) =>
  typeof paragraph === 'string' ? paragraph : paragraph?.text ?? '';

export const articleWordTokens = (text) =>
  text.match(/\b[\p{L}\p{N}][\p{L}\p{N}’'-]*\b/gu) ?? [];

export const countArticleProseWords = (sections = []) =>
  articleWordTokens(
    sections.flatMap((section) => section.paragraphs.map(articleParagraphText)).join(' '),
  ).length;
