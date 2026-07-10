# Philosophy Atlas content roadmap

## Current coverage

As of Phase 3B, the atlas contains approximately:

- 141 philosopher records.
- 43 branch and school records.
- 28 sustained school bands on the Philosophy Wall.
- 24 selected landmark works on the Philosophy Wall.
- Article-grade coverage for 122 of 141 philosopher records, measured by `npm run report:coverage`.
- Article-grade coverage for 21 of 43 branch and school records, measured by `npm run report:coverage`, making branch depth the main remaining content gap.

Coverage is strongest for ancient Greek philosophy, Pre-Socratic and Hellenistic schools, early modern European philosophy, medieval Christian/Islamic/scholastic philosophy, Chinese and Indian/Buddhist core traditions, analytic philosophy, pragmatism and philosophy of science, feminist/social philosophy, and late twentieth-century ethics.

The atlas now includes meaningful starting coverage for:

- Greek, Roman, Christian, Jewish, Islamic, Indian, Buddhist, and Chinese traditions.
- Metaphysics, epistemology, ethics, politics, mind, language, science, religion, and aesthetics.
- Pragmatist, phenomenological, existentialist, analytic, continental, feminist, and critical traditions.

## Article-first direction

Philosopher Profiles and Branch Explorer are moving from exhibit-card summaries toward article-grade reference pages. The new model preserves concise structured fields for the Philosophy Wall, comparisons, quick reference, readings, and connections, while adding `articleSections` as the primary depth layer. Article sections use sustained paragraph prose, stable headings, a contents rail, and optional links to related branches, philosophers, and works.

Records without authored article sections continue to render through the earlier structured exhibit layout. They should be treated as useful summaries rather than finished reference articles.

## Gold-standard audited articles

The current gold-standard articles pass the default `npm run audit:articles` check. Most article records meet the 1,800-word floor. Medieval bridge, scholastic, medieval Islamic continuation, and early modern core records use the stricter 2,000-word floor.

- Philosophers, ancient and Hellenistic: Thales, Anaximander, Anaximenes, Pythagoras, Philolaus, Parmenides, Zeno of Elea, Heraclitus, Empedocles, Anaxagoras, Leucippus, Democritus, Protagoras, Gorgias, Antisthenes, Plato, Socrates, Aristotle, Epicurus, Epictetus, Zeno of Citium, Seneca, Marcus Aurelius, Pyrrho, Sextus Empiricus, Lucretius, Diogenes, Cleanthes, Chrysippus, Arcesilaus, and Carneades.
- Philosophers, late antique and medieval: Plotinus, Porphyry, Iamblichus, Proclus, Pseudo-Dionysius, Origen, Gregory of Nyssa, Augustine, Boethius, John Scotus Eriugena, Anselm, Peter Abelard, Thomas Aquinas, Ibn Sina / Avicenna, Maimonides, Al-Kindi, Al-Farabi, Al-Ghazali, Averroes, Duns Scotus, William of Ockham, Meister Eckhart, and Marsilius of Padua.
- Philosophers, cross-cultural: Confucius, Laozi, Zhuangzi, Mencius, Xunzi, Mozi, Han Feizi, Zhu Xi, Wang Yangming, Siddhartha Gautama / the Buddha, Nagarjuna, Mahavira, Kanada, Patanjali, Vasubandhu, Dignaga, Dharmakirti, Adi Shankara, Ramanuja, and Madhva.
- Philosophers, early modern and Enlightenment: Machiavelli, Francis Bacon, Descartes, Hobbes, Anne Conway, Spinoza, Locke, Berkeley, Leibniz, Hume, Montesquieu, Adam Smith, Rousseau, Mary Astell, Mary Wollstonecraft, Bentham, and John Stuart Mill.
- Philosophers, nineteenth and twentieth century: Hegel, Schopenhauer, Kierkegaard, Marx, Frege, Bertrand Russell, G. E. Moore, Rudolf Carnap, W. V. O. Quine, Elizabeth Anscombe, Peirce, William James, Dewey, Whitehead, Popper, Kuhn, Merleau-Ponty, Levinas, Gadamer, Iris Murdoch, Philippa Foot, Judith Jarvis Thomson, Thomas Nagel, Derek Parfit, Martha Nussbaum, Judith Butler, Angela Davis, and bell hooks.
- Branches: Platonism, Ancient Greek Philosophy, Stoicism, Epicureanism, Skepticism, Cynicism, Aristotelianism, Neoplatonism, Epistemology, Ethics, Analytic Philosophy, Philosophy of Religion, Medieval Scholasticism, Islamic Philosophy, Rationalism, Empiricism, German Idealism, Existentialism, Phenomenology, Political Philosophy, and Philosophy of Science.

These records model the target editorial depth: a clear opening orientation, sustained historical and argumentative explanation, interpretive cautions, connections across the atlas, and a practical reading path.

The medieval bridge and continuation passes now cover the Christian/Jewish/Islamic transition from late antiquity into scholastic and post-Avicennian debates, with special attention to faith and reason, divine language, law, grace, free will, necessary being, political order, mysticism, and philosophical interpretation.

## Accuracy hardening pass

The metadata layer now distinguishes rough placement anchors from display claims. Philosophers with uncertain, legendary, floruit, or pseudonymous chronology can carry `dateDisplay`, `dateConfidence`, and `dateNote` while preserving numeric years for sorting, wall placement, and timelines.

Branch membership now supports a status vocabulary for disputed or historically indirect labels: founder, central, major, precursor, associated, critic, disputed, self-rejected-label, influence, and later-reception. This is especially important where shallow branch IDs would otherwise flatten Kant’s relation to German Idealism, Kierkegaard and Nietzsche’s relation to existentialism, Camus’ rejected existentialist label, Augustine’s reception of Platonism, and the distinction between Antisthenes and Diogenes in Cynicism.

Founder integrity fixes now require branch origin metadata, major figure lists, timelines, and wall bands to represent canonical early figures where practical. The first locked checks cover Bentham and Mill for Utilitarianism, Peirce/James/Dewey for Pragmatism, Frege/Russell/Moore/Wittgenstein for Analytic Philosophy, and Antisthenes/Diogenes for Cynicism.

The focused `npm run audit:accuracy` script checks these high-priority consistency rules. Remaining accuracy work should continue as fact-check packs: review ancient and cross-cultural chronologies, expand membership statuses to more branches, and compare branch origin stories against timeline and wall metadata before adding new article packs.

The second accuracy pass extends those rules to ancient and cross-cultural chronology. Chinese, Indian, Buddhist, Jain, Daoist, Confucian, Mohist, Legalist, and Vedanta-related records should not imply modern exact dating where the evidence is traditional, approximate, legendary, or disputed. Broad tradition pages should distinguish canonical figures, critics, commentators, school systematizers, and later reception instead of treating every figure as a simple member of one school. Current locked checks cover Confucius, Laozi, Zhuangzi, Mahavira, Kanada, Patanjali, Shankara, Ramanuja, Dignaga, Dharmakirti, and the broad Chinese/Indian/Buddhist branch figure lists.

The branch content-model pass splits named cross-cultural traditions out of over-broad umbrella records where the app already represents them. Chinese Philosophy remains an umbrella, while Confucianism, Daoism, Mohism, and Legalism are branch records with their own figure lists and relationship edges. Indian Philosophy remains an umbrella, while Jainism, Vedanta, Buddhist Philosophy, and Buddhist Epistemology carry their own branch records. Future content packs should add deeper prose to these branches rather than folding them back into umbrella tradition pages.

## Article-format coverage

The philosopher records authored and rendered in the article-first format now include every philosopher listed in the gold-standard audited section above. Kant, Nietzsche, and Wittgenstein also have earlier article-format records, but they are not currently part of the default long-form audit floor.

The branch records authored and rendered in the article-first format are:

- Platonism, Ancient Greek Philosophy, Stoicism, Epicureanism, Skepticism, Cynicism, Aristotelianism, Neoplatonism
- Epistemology
- Ethics
- Analytic Philosophy
- Philosophy of Religion, Medieval Scholasticism, and Islamic Philosophy
- Rationalism, Empiricism, German Idealism, Existentialism, Phenomenology, Political Philosophy, and Philosophy of Science

These records establish the editorial and UI pattern for future article packs: concise overview first, sustained historical and argumentative prose as the main body, and compact readings, sources, concepts, and atlas connections as supporting reference material. Branch coverage remains much thinner than philosopher coverage and should be the next large content frontier.

## Structured deep pack

The current structured deep philosopher pack is deliberately limited to twelve profiles:

- Plato, Aristotle, Augustine, Aquinas, Descartes, Hume, Kant, Nietzsche, Wittgenstein, Heidegger, Simone de Beauvoir, and Foucault.

These profiles contain authored historical framing, multiple central questions, specifically explained ideas and works, named influence routes, interpretive disputes, staged reading paths, and stable reference links. Plato, Aristotle, Augustine, Aquinas, Descartes, Hume, Kant, Nietzsche, and Wittgenstein now have some form of article-first coverage. Heidegger, Simone de Beauvoir, and Foucault still use the structured exhibit presentation and should be treated as high-priority candidates for article conversion.

The current audited article-grade branch pack is:

- Platonism, Ancient Greek Philosophy, Aristotelianism, Neoplatonism, Stoicism, Epicureanism, Skepticism, Cynicism, Epistemology, Ethics, Analytic Philosophy, Philosophy of Religion, Medieval Scholasticism, Islamic Philosophy, Rationalism, Empiricism, German Idealism, Existentialism, Phenomenology, Political Philosophy, and Philosophy of Science.

These pages now contain specific origin stories, periodized development, concepts, major works, internal debates, modern relevance, misconceptions, reading paths, and reference links. Metaphysics, Political Philosophy, Existentialism, Phenomenology, and other major branch records still have structured summaries but do not yet count as article-grade coverage under `npm run report:coverage`.

## Current shallow areas

Most philosopher records now have article-grade depth. The remaining shallow philosopher records are concentrated enough to finish in one or two focused passes. Branch and school records are now the larger gap: many are useful structured summaries, but 21 of 43 currently have article-grade `articleSections`.

High-priority shallow groups include:

- Remaining philosopher profiles: Fichte, Schelling, Husserl, Heidegger, Sartre, Beauvoir, Camus, Arendt, Rawls, Nozick, Foucault, Derrida, Saadia Gaon, Judah Halevi, Ibn Tufayl, Suhrawardi, Mulla Sadra, Habermas, and Fanon.
- Branch depth: Metaphysics, Ontology, Virtue Ethics, Deontology, Utilitarianism, Logic, Philosophy of Language, Philosophy of Mind, Aesthetics, Pragmatism, Continental Philosophy, Feminist Philosophy, Chinese Philosophy, Confucianism, Daoism, Mohism, Legalism, Indian Philosophy, Jainism, Vedanta, Buddhist Philosophy, and Buddhist Epistemology.
- Portrait/source metadata remains shallow. Most new article profiles still rely on fallback medallions until image rights and attribution can be verified.

## Recommended future article packs

1. Branch-depth sprint: write article-grade pages for the 22 missing branch records, starting with Metaphysics, Ontology, Logic, Philosophy of Language, Philosophy of Mind, Feminist Philosophy, Pragmatism, and the remaining Chinese, Indian, and Buddhist tradition pages.
2. Remaining philosopher completion sprint: finish Fichte, Schelling, Husserl, Heidegger, Sartre, Beauvoir, Camus, Arendt, Rawls, Nozick, Foucault, Derrida, Habermas, Fanon, Saadia Gaon, Judah Halevi, Ibn Tufayl, Suhrawardi, and Mulla Sadra.
3. Continental branch-and-profile pack: pair the remaining continental philosophers with branch pages for Phenomenology, Existentialism, Continental Philosophy, and German Idealism.
4. Jewish/Islamic later philosophy pack: add Saadia Gaon, Judah Halevi, Ibn Tufayl, Suhrawardi, Mulla Sadra, plus branch pages for Islamic Philosophy and Philosophy of Religion.
5. Analytic/topic branch pack: Logic, Philosophy of Language, Philosophy of Mind, Philosophy of Science, Deontology, Utilitarianism, and Philosophy of Mind should receive article-grade pages now that many major analytic philosophers are covered.
6. Cross-cultural branch pack: Chinese Philosophy, Confucianism, Daoism, Mohism, Legalism, Indian Philosophy, Jainism, Vedanta, Buddhist Philosophy, and Buddhist Epistemology need dedicated tradition pages that match the depth of their philosopher records.
7. Political and social philosophy pack: Rawls, Nozick, Arendt, Habermas, Fanon, Political Philosophy, Feminist Philosophy, and future philosophy of race/decolonial/disability branch records.
8. Image/source metadata pass: add verified image metadata only where public-domain or clearly reusable sources can be confirmed; otherwise keep fallback medallions.

## Image and source strategy

- Image metadata uses structured local fields for URL, alt text, source URL, credit, license, license URL, and notes.
- Missing or uncertain images deliberately use the existing fallback medallion.
- No image should be added until its source and reuse terms are confidently verified.
- Source-link fields support SEP, IEP, Wikimedia, Wikidata, primary texts, public-domain texts, and other reliable references.
- The article-grade pack adds a small set of stable SEP and Wikipedia reference links.
- Portrait metadata remains intentionally deferred. Each candidate image still needs URL, source page, creator credit, license, and license URL verified together; profiles continue to use fallback medallions meanwhile.

## Editorial standards

- Keep explanations beginner-friendly without flattening disagreements.
- Mark approximate dates where precision is uncertain.
- Do not invent quotations, citations, image credits, or licenses.
- Treat every tradition as an evolving argument rather than a single doctrine.
- Prefer a small number of carefully structured additions over generic filler.
- Use article prose for explanation and cards only where comparison, navigation, or quick reference genuinely benefits.
