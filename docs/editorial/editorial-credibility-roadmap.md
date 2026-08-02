# Editorial credibility roadmap

This is a temporary sequencing roadmap, not a standards document. The durable rules are the [editorial program](../standards/editorial-program.md), [research-first decision](../decisions/0003-research-first-content-cadence.md), and [validation matrix](../standards/validation-matrix.md). Live inventories and reports supersede snapshot counts below.

Snapshot date: 2026-07-31

## Measured starting point after the pilot

The canonical registry contains 189 applicable full articles: 146 philosophers and 43 philosophies, branches, schools, traditions, movements, methods, or frameworks. There are currently no standalone article-backed work, text, argument, concept, or major Museum-exhibit routes. All 189 records have article prose; 80 meet the hard 2,000-word substantive-prose floor and 109 fail it. The failures comprise 95 philosopher articles and 14 philosophy articles. There are no exemptions.

The earlier manual depth target list omitted nine canonical records: Ficino, Galileo, Kant, Nietzsche, Wittgenstein, Jiddu Krishnamurti, Epistemology, Ethics, and Analytic Philosophy. The universal inventory now derives from the authoritative philosopher, philosophy, and standalone registries, so those omissions cannot recur through target-list drift.

Editorial credibility is a different measurement. Two philosophers and one philosophy are currently `claim-reviewed`; 60 philosopher and 40 philosophy pages are `bibliography-only`; 84 philosopher and two philosophy pages are `unreviewed`; none is `source-mapped` or stale. The legacy bibliographies are useful leads but do not count as claim evidence.

## Permanent gates

Every batch must satisfy both independent systems:

1. **Depth:** the canonical article has at least 2,000 Unicode word tokens in `articleSections` paragraph text. Headings, metadata, citations, sources, reading lists, images, interface copy, supporting Museum panels, and duplicate rendering do not count. The audit remains strict, with no exceptions or advisory mode.
2. **Credibility:** the review status reflects actual claim mapping. Reaching 2,000 words cannot grant `source-mapped` or `claim-reviewed`; a page below 2,000 cannot receive `claim-reviewed`.

Neither gate rewards filler, repetition, generic biography, redundant summaries, excessive quotation, or counter manipulation. When correction removes weak prose, useful claim-mapped context, arguments, primary-text setting, interpretive disputes, reception, limitations, translation problems, and attribution problems are the appropriate ways to restore depth.

## Risk-prioritized batches

The exact live membership and word deficit for each batch must be taken from `docs/editorial/article-depth-inventory.json`; the IDs below identify the first review anchors, not exemptions for unlisted failures.

### Batch 1 — severe depth gaps in central routes

Start with Epistemology (670), Ethics (719), Analytic Philosophy (709), Nietzsche (825), Wittgenstein (839), and Kant (939). These are heavily connected routes whose current prose is far below the floor. The review should prioritize quotation provenance, canonical work attributions, periodization, influence claims, and internal disputes. Add article routes for a major work only if the product creates a genuinely standalone long-form page; otherwise keep work panels mapped to the philosopher or philosophy article.

### Batch 2 — ancient Mediterranean evidence and source genres

Review a globally bounded ancient batch including the shortest Pre-Socratics and sophists, then Hellenistic and late-antique pages with insecure biography or fragmentary evidence. Separate fragments, testimonia, later doxography, comedy, dialogue, biography, and modern reconstruction. Treat exact dates, “founder” labels, and influence chains as human-review triggers. Candidate anchors include Anaximenes, Protagoras, Democritus, Leucippus, Gorgias, Pseudo-Dionysius, and Proclus.

### Batch 3 — South and East Asian traditions

Review Buddhist Philosophy, Buddhist Epistemology, Jainism, Vedānta, and their highest-risk philosopher links alongside a Chinese pair selected for chronology and translation risk. Require specialists or strong specialist references for Sanskrit, Pali, Tibetan, and Chinese terminology; distinguish traditional dates from historical confidence; record text attribution and translation choices; and avoid presenting modern Atlas taxonomy as a tradition’s uncontested self-description.

### Batch 4 — medieval Jewish, Christian, and Islamic continuities

Review Islamic Philosophy and the sub-floor philosopher pages around translation movements, kalām/falsafa relations, scholastic reception, mysticism, and law. Pair the Islamic material with at least one Jewish and one Christian bridge so influence is not narrated as a one-direction civilizational handoff. Candidate anchors include al-Kindī, al-Fārābī, Avicenna, al-Ghazālī, Averroes, Abelard, Meister Eckhart, and Maimonides where the inventory indicates need.

### Batch 5 — early modern, political, and scientific transformations

Review Rationalism, Empiricism, Political Philosophy, Philosophy of Science, Galileo, and selected seventeenth- through nineteenth-century records. Check priority claims about “modernity” or scientific method, work dates and editions, colonial and political context, and retrospective school labels. Reconcile wall, timeline, relationship, comparison, and Museum reuse for every reviewed record.

### Batch 6 — modern plurality, social philosophy, and major works

Review Philosophy of Mind and a balanced set of analytic, continental, pragmatist, feminist, Black, disability, and liberation thinkers that remain below depth or only bibliography-only. This batch should also decide which high-demand works or arguments merit independent article routes. The Republic and Allegory of the Cave currently remain short Museum surfaces backed by Plato’s canonical profile; they are not hidden standalone articles. If either becomes a full independent article, it must enter the standalone registry, pass 2,000 words, receive its own route, and be audited exactly once.

## Batch acceptance checklist

- The canonical registry, route manifest, Museum article-action mappings, and search/navigation entry points agree.
- Baseline and final substantive word counts are recorded, including prose removed, prose added, and net change.
- Every final article is at least 2,000 substantive words without filler or excessive quotation.
- High-risk claims—dates, exact quotations, first/founder/superlative claims, influence, causation, disputed biography, authorship, and broad classifications—receive durable source locators or explicit qualification.
- Every structured article paragraph and reviewed quick fact has a stable ID and one or more valid citations.
- Cited evidence is separated from further reading; uncited bibliography links do not count toward coverage.
- Primary texts are treated as primary evidence with genre and transmission limits; at least two independent specialist secondary sources are used where the topic permits.
- Disagreement, translation alternatives, attribution limits, and unresolved questions remain visible.
- Reused wall, timeline, relationship, comparison, and Museum descriptions are reconciled within the recorded review boundary.
- The review note identifies scope, sources, retained claims, changes, quotation handling, disputes, unresolved issues, baseline/final counts, commands, and exact lock.
- `npm run audit:editorial`, the batch-targeted depth audit, relevant integrity/routing/Museum/accuracy audits, TypeScript, build, and browser acceptance pass.
- A final diff review confirms that unrelated records were not silently relabeled.

## Human-review threshold

Automation may verify identifiers, citation references, metadata shapes, locator shapes, routes, word counts, and lock freshness. A human editor or domain specialist must decide whether evidence supports the wording, translations are fair, source genres are used appropriately, a scholarly dispute is represented proportionately, and a cross-cultural classification is responsible. Specialist escalation is required before `claim-reviewed` when the page depends materially on uncertain ancient biography, contested authorship, non-English technical vocabulary, sectarian or regional classification, living or marginalized communities, or a disputed interpretation that cannot be responsibly framed from the available specialist literature.

The high-risk-language report is triage only. It does not prove that a sentence is false, padded, or unsupported, and a count close to 2,000 is not itself evidence of manipulation.

## Commands and completion condition

- `npm run report:depth` regenerates every canonical count, failure ID, and Museum backing map.
- `npm run audit:articles` remains the strict universal audit and will fail until all 189 applicable records pass.
- `npm run audit:articles:reviewed` dynamically verifies every claim-reviewed page; `audit:articles:pilots` remains a historical cohort check.
- `npm run report:editorial` regenerates status totals and high-risk triage.
- `npm run audit:editorial` validates the source model, citations, review notes, depth/status rule, and locks.

The migration is complete only when the universal depth report has zero failures and zero missing articles, the strict audit passes without changing the floor, and no applicable full article is absent from the authoritative registry.
