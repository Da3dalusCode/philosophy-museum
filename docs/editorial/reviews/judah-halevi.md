# Judah Halevi research dossier (pre-integration)

Research pass: 2026-08-05. Special note: the SEP entry was substantively revised on 2026-07-30. Its new chronology and interpretation supersede several older summaries. This dossier does not confer claim-review approval.

## Surface inventory

- Canonical article: `src/data/judahHaleviCompletionArticles.ts`, 11 sections / 22 substantive paragraphs.
- Structured profile/depth: `src/data/philosophers.ts`, `src/data/medievalCompletionDepth.ts`, accuracy metadata.
- Reuse: profile, compare, branch, search, chronology, and relationship rendering.
- Museum: Jewish-gallery standard placement; article-derived primary interpretation; `judah-halevi-kuzari` and `judah-halevi-divan` supplemental exhibits.

## Exact correction set

| ID | Risk | Exact proposed treatment | Evidence |
|---|---|---|---|
| HAL-1 | `c. 1075–1141` and “whether he reached the land is uncertain” present an old chronology too cleanly. | Date display: “born probably in the 1070s or 1080s; died 1141.” Note: “Documents show him sailing from Alexandria in May 1141; the latest synthesis infers arrival and death in the Land of Israel that summer, while direct documentation of arrival is absent and the Jerusalem-gate legend is unsupported.” | SEP Halevi §§1–2 (rev. 2026-07-30). |
| HAL-2 | The article risks either an anti-reason caricature or the opposite claim that reason is “indispensable” to religious certainty. | Replace with: “Halevi is philosophically learned and uses skeptical philosophical arguments selectively. Reason remains valid in demonstrable domains and useful in testing pretensions, but the distinctive certainty of revelation and commandments rests for him on sensory signs, concurrent tradition, and prophecy rather than philosophical demonstration.” | *Kuzari* I.1–25, I.67, I.89, V.14; SEP §§3–5. |
| HAL-3 | “Collective memory” is too loose for Halevi’s testimony argument. | Use “concurrent/mass-transmitted tradition (Arabic *tawātur*)” and explain that Halevi appeals to public national revelation and convergent transmission. Present the argument as contested, not self-validating. | *Kuzari* I.25, I.89, V.14; SEP §4. |
| HAL-4 | “The Divine Thing is not a physical substance” is overly definitive and can erase hierarchical/biological imagery. | Replace with: “The Arabic *al-amr al-ilāhī* has no single uncontested modern equivalent. It can name divine presence, influence/efficacy, and a supra-human prophetic aptitude; the text’s hierarchical and quasi-biological imagery must be retained and ethically interrogated rather than sanitized.” | *Kuzari* I.95, II.9–14, IV.3; SEP §6. |
| HAL-5 | Commandments are explained through “tacit knowledge” as if it were Halevi’s term. | Label tacit knowledge as a modern curatorial analogy. State that rational explanations do not determine the specific revealed forms; contrast rational and “auditory” commandments and tie precise practice to divine instruction. | *Kuzari* II.26, II.48, II.60; SEP §§5–6. |
| HAL-6 | Prophecy is reduced to a gift-vs-intellect contrast. | Add Halevi’s accounts of internal senses, images, visionary experience, preparation, the Divine Thing, and Moses’ exceptional status; retain scholarly disagreement about how “natural” this becomes. | *Kuzari* IV.3–6, IV.15–16, V.14; SEP §6. |

## Paragraph evidence map

| Canonical section | ¶1 | ¶2 | Primary locator(s) | Secondary control |
|---|---|---|---|---|
| Overview | Retain poet, physician, thinker; update chronology HAL-1 | Revise philosophy/revelation balance under HAL-2 | *Kuzari* I.1–25; poems/letters | O-HAL-1 §§1–3 |
| Historical context | Retain Andalusi and Arabic/Hebrew intellectual world | Apply documentary journey account under HAL-1 | Cairo Geniza letters synthesized in O-HAL-1 §§1–2 | O-HAL-1 §§1–2 |
| Kuzari dialogue | Retain philosopher/Christian/Muslim/Jewish sage sequence | Retain king’s conversion and later dialogue structure | *Kuzari* I.1–25; I.89 onward | O-HAL-1 §3 |
| History and testimony | Replace generic memory under HAL-3 | Retain public-sign argument as argument, not proof accepted by all | *Kuzari* I.25, I.89, V.14 | O-HAL-1 §4 |
| Reason, science, influence | Replace “reason indispensable” under HAL-2 | Retain selective appropriation and criticism of Aristotelian systems | *Kuzari* I.1–25; V.12–14 | O-HAL-2; O-HAL-3 |
| Divine Thing and prophecy | Replace cleaned-up definition under HAL-4 | Expand prophecy under HAL-6 | *Kuzari* I.95; II.9–14; IV.3–6, 15–16 | O-HAL-1 §6 |
| Commandment and practice | Apply HAL-5 | Retain embodied/communal practice without modern anti-theory slogan | *Kuzari* II.26, 48, 60 | O-HAL-1 §§5–6 |
| Hebrew and Land | Retain Hebrew’s sacred role as Halevi’s claim | Retain Land/prophecy relation while marking hierarchy and politics | *Kuzari* II.9–24; II.67–80 | O-HAL-1 §§6–7 |
| Poetry and longing | Retain poetry as central, not decorative | Update final-journey account under HAL-1 | Selected Zion poems; letters | O-HAL-1 §§1–2, 8 |
| Influence and controversy | Retain influence and anti-philosophy caution | Revise into selective/moderate fideism under HAL-2 | *Kuzari* V.12–14 | O-HAL-1 §§3–7; O-HAL-3 |
| Beginner synthesis | Retain lived history/practice emphasis | Revise testimony, reason, Divine Thing, and journey under HAL-1–5 | Primary divisions above | O-HAL-1 |

## Structured-data proposals

- Replace current date display with HAL-1; date confidence `low` for birth and `medium` for death. Keep an approximate numeric 1075/1080 only for plotting, with the note visible.
- Summary: “A Hebrew poet, physician, and Judeo-Arabic thinker who used dialogue and selective skepticism to defend prophecy, concurrent tradition, and commanded practice against philosophical overreach.”
- Ideas: concurrent tradition (*tawātur*); selective/moderate fideism; Divine Thing; prophecy and internal senses; auditory commandments; Hebrew; Land of Israel; poetry and longing.
- Works: *Kuzari* and the Hebrew *Dīwān*; retain medical/letter activity as biography rather than inventing lost titles.
- Branches: philosophy of religion `major`; epistemology, philosophy of language, ethics, and philosophy of culture/history `substantial`.
- Relationships: place Saadia, kalām, Aristotelian/Avicennian philosophy, and Andalusi poetry as contexts. Do not encode Maimonides as direct influence, or Halevi as simply “anti-Aristotle.”
- Search concepts: physician, Hebrew poet, Judeo-Arabic, Kuzari, tawatur/concurrent tradition, prophecy, Divine Thing, commandments, Hebrew, Zion, Land of Israel.

### Reuse-surface audit

- No independent target-specific timeline, relationship-depth, wall-chart landmark, or learning-path claim was found beyond generic/profile reading data.
- Compare/profile inherit the outdated date display and shallow tradition/revelation labels until canonical metadata changes. Do not hand-edit generated search; refresh it after HAL-1–HAL-6. Avoid an unsupported direct Halevi→Maimonides edge.

## Museum reconciliation

The article-derived primary interpretation needs a separate rewrite against HAL-1–HAL-6. The `judah-halevi-kuzari` exhibit should replace generic “history” with concurrent tradition, characterize Halevi as a selective/moderate fideist rather than irrationalist, and keep the dialogue’s philosophical sophistication. The `judah-halevi-divan` exhibit can retain medicine, letters, prayer, argument, and verse, but must update the final journey: sailing is documented; arrival/death is a reasoned current inference; the Jerusalem legend is unsupported. Add book-and-paragraph locators to both plaques.

## Source register

| ID | Durable source and locator | Use |
|---|---|---|
| P-HAL-1 | Judah Halevi, *Kuzari*, I.1–25, I.67, I.89, I.95; II.9–26, II.48, II.60, II.67–80; IV.3–6, IV.15–16; V.12–14, V.22–28; [Hirschfeld edition](https://archive.org/details/judahhalleviskit00judauoft) | Dialogue, testimony, reason, Divine Thing, commandment, land, journey |
| O-HAL-1 | Ehud Krinis, [SEP, “Judah Halevi”](https://plato.stanford.edu/entries/halevi/), substantive revision 2026-07-30, §§1–8 | Current chronology and interpretive control |
| O-HAL-2 | Barry S. Kogan, “Judah Halevi and his use of philosophy in the *Kuzari*,” [DOI](https://doi.org/10.1017/CCOL0521652073.006) | Philosophy, skepticism, and dialogue |
| O-HAL-3 | Y. Tzvi Langermann, “Science and the *Kuzari*,” [DOI](https://doi.org/10.1017/S0269889700002763) | Science and philosophy, peer-reviewed control |

## Residual uncertainty and lock gate

The birth year, direct proof of arrival in the Land of Israel, the correct translation/metaphysics of *al-amr al-ilāhī*, and the strength of the fideism label remain contested. Required integration count: **6 exact corrections**, **22/22 article paragraphs mapped**, **6 structured/reuse groups**, and **3 Museum surfaces reconciled**. The 2026 SEP revision should be date-stamped in editorial notes so older chronology does not silently return.
## Final integration certification

Canonical ID: `judah-halevi`. Formal review lock: `fnv1a64:806cc9a455c9fd18`. The research-stage no-lock language above is superseded after canonical and Museum reconciliation.
