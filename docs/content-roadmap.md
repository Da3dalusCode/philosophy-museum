# Philosophy Atlas content roadmap

## Current coverage

As of Phase 3A, the atlas contains approximately:

- 135 philosopher records.
- 36 branch and school records.
- 28 sustained school bands on the Philosophy Wall.
- 24 selected landmark works on the Philosophy Wall.

Coverage is strongest for ancient Greek philosophy, Hellenistic schools, early modern European philosophy, German Idealism, existentialism, analytic philosophy, and major twentieth-century continental philosophy.

The atlas now includes meaningful starting coverage for:

- Greek, Roman, Christian, Jewish, Islamic, Indian, Buddhist, and Chinese traditions.
- Metaphysics, epistemology, ethics, politics, mind, language, science, religion, and aesthetics.
- Pragmatist, phenomenological, existentialist, analytic, continental, feminist, and critical traditions.

## Article-first direction

Philosopher Profiles and Branch Explorer are moving from exhibit-card summaries toward article-grade reference pages. The new model preserves concise structured fields for the Philosophy Wall, comparisons, quick reference, readings, and connections, while adding `articleSections` as the primary depth layer. Article sections use sustained paragraph prose, stable headings, a contents rail, and optional links to related branches, philosophers, and works.

Records without authored article sections continue to render through the earlier structured exhibit layout. They should be treated as useful summaries rather than finished reference articles.

## Gold-standard audited articles

The current gold-standard articles each contain at least 1,800 words of authored article prose and pass the default `npm run audit:articles` check:

- Philosophers: Plato, Socrates, Aristotle, Epicurus, Epictetus, Zeno of Citium, Seneca, and Marcus Aurelius.
- Branches: Platonism, Ancient Greek Philosophy, Stoicism, Epicureanism, and Skepticism.

These records model the target editorial depth: a clear opening orientation, sustained historical and argumentative explanation, interpretive cautions, connections across the atlas, and a practical reading path.

## Article-format coverage

The first philosopher records authored and rendered in the article-first format are:

- Plato, Socrates, Aristotle, Epicurus, Epictetus, Zeno of Citium, Seneca, Marcus Aurelius
- Kant
- Nietzsche
- Wittgenstein

The first branch records authored and rendered in the article-first format are:

- Platonism, Ancient Greek Philosophy, Stoicism, Epicureanism, Skepticism
- Epistemology
- Ethics
- Analytic Philosophy

These records establish the editorial and UI pattern for future article packs: concise overview first, sustained historical and argumentative prose as the main body, and compact readings, sources, concepts, and atlas connections as supporting reference material. Records in this list that are not in the gold-standard audited list use the article format but have not yet reached the long-form depth floor.

## Structured deep pack

The current structured deep philosopher pack is deliberately limited to twelve profiles:

- Plato, Aristotle, Augustine, Aquinas, Descartes, Hume, Kant, Nietzsche, Wittgenstein, Heidegger, Simone de Beauvoir, and Foucault.

These profiles contain authored historical framing, multiple central questions, specifically explained ideas and works, named influence routes, interpretive disputes, staged reading paths, and stable reference links. Unless listed in the article-format coverage above, they still use the structured exhibit presentation and should be treated as candidates for future article conversion.

The current article-grade branch pack is:

- Platonism, Aristotelianism, Stoicism, Epicureanism, Skepticism, Metaphysics, Epistemology, Ethics, Political Philosophy, Existentialism, Phenomenology, and Analytic Philosophy.

These pages now contain specific origin stories, periodized development, concepts, major works, internal debates, modern relevance, misconceptions, reading paths, and reference links.

## Current shallow areas

Many newly added philosopher records are intentionally concise. They are sufficient for search, comparison, branch membership, wall placement, and future expansion, but still need dedicated interpretive work.

High-priority shallow groups include:

- Pre-Socratic pluralists and early natural philosophers.
- Patristic and mystical Christian philosophy.
- Jewish medieval philosophy.
- Later Islamic philosophy, especially Illuminationism and post-Avicennian metaphysics.
- Indian schools beyond broad Vedanta and Buddhist summaries.
- Mohism, Legalism, and Neo-Confucian philosophy.
- Logical empiricism, philosophy of science, and postwar analytic ethics.
- Decolonial philosophy, philosophy of race, disability philosophy, and global feminist traditions.

## Recommended future article packs

1. Ancient Greek continuation: Pre-Socratic natural philosophers, pluralists, atomists, and the major Hellenistic schools.
2. Hellenistic continuation: Cleanthes, Chrysippus, Lucretius, Pyrrho, and Sextus Empiricus.
3. Medieval Christian/Jewish/Islamic pack: Augustine, Aquinas, Avicenna, Al-Ghazali, Averroes, Maimonides, Philosophy of Religion, and Medieval Scholasticism.
4. Early Modern pack: Descartes, Spinoza, Leibniz, Locke, Hume, Rationalism, and Empiricism.
5. Kant/German Idealism pack: Kant article expansion, Hegel, Schopenhauer, and German Idealism.
6. Analytic pack: Frege, Russell, Moore, Carnap, Quine, Anscombe, logic, language, mind, and science.
7. Continental pack: Husserl, Heidegger, Sartre, Beauvoir, Foucault, Derrida, Phenomenology, Existentialism, and Continental Philosophy.
8. Indian/Buddhist/Chinese pack: Buddha, Nagarjuna, Shankara, Confucius, Laozi, Zhuangzi, and dedicated tradition pages.
9. Feminist/critical/decolonial pack: Beauvoir, Fanon, Butler, Davis, bell hooks, feminist philosophy, and future race, decolonial, care, and disability branches.

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
