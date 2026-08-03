# Iris Murdoch claim-review dossier

- Canonical ID: `iris-murdoch`
- Visitor route: `#/philosophers/iris-murdoch`
- Editorial submission date: 2026-08-03
- Effective status: `claim-reviewed`
- Deterministic lock: `fnv1a64:c903e4366cb8269c`
- Coverage: 13 sections; 30 citation-bearing paragraphs; 17 structured claims; 86 citation references
- Evidence set: 8 registered and cited sources, including three primary-work records, an institutional archive, and four independent scholarly resources
- Depth: 2,097 final substantive words

## Method and review boundary

Every existing paragraph, the new section, and all structured fields were checked against the three essays in *The Sovereignty of Good*, *Metaphysics as a Guide to Morals*, the philosophical/literary essays in *Existentialists and Mystics*, Lawrence Blum’s SEP entry, *Iris Murdoch, Philosopher*, *Iris Murdoch and the Political*, focused feminist criticism, and the institutional archive guide. The high-risk pass focused on attention, moral realism, fantasy, unselfing, love, art, freedom, Plato, transcendence without a personal God, later duty, politics, gender, and the difference between novels and philosophical arguments.

Museum interpretation was inspected but is not included in the canonical article lock unless the primary agent explicitly broadens the review boundary.

## Paragraph evidence map

| Article section(s) | Evidence and inspectable locators |
| --- | --- |
| `overview`; `historical-setting` | SEP §§1–4; *Iris Murdoch, Philosopher*, introduction/context chapters |
| `attention`; `unselfing` | *Sovereignty*: “The Idea of Perfection” and “On ‘God’ and ‘Good’”; SEP §§6–13 |
| `good` | *Sovereignty*: “On ‘God’ and ‘Good’” and “The Sovereignty of Good over Other Concepts”; SEP §5; Broackes volume chapters on the Good/realism |
| `freedom` | “The Idea of Perfection”; Sartre and Sovereignty essays in *Existentialists and Mystics*; SEP §§4, 6–8 |
| `literature` | “The Sublime and the Good,” “Against Dryness,” and literary essays; *Metaphysics* art/literature chapters; Broackes volume art chapters |
| `analytic-context` | SEP §§2–4, 14; Broackes volume analysis/virtue/method chapters |
| `religion-secular` | “On ‘God’ and ‘Good’”; *Metaphysics* religion/Good chapters; SEP §§5, 15 |
| `criticisms` | SEP §§10–15; Browning political chapters; Manne’s focused feminist article |
| `misunderstandings`; `reading-strategy` | SEP §§1–15; Broackes introduction; Murdoch archive corpus overview |
| `love-politics-gender-and-later-development` | All three *Sovereignty* essays; *Metaphysics* chapters on duty, art, politics, religion; Browning chs. 1–7; Manne article; SEP §§10–15 |

## Structured-claim evidence map

| Claim family | Evidence |
| --- | --- |
| Dates, life, wartime/postwar work, teaching, corpus | SEP §§1–3; Iris Murdoch Collections guide |
| Attention, fantasy, unselfing, freedom, Good | Three *Sovereignty* essays; SEP §§4–13 |
| Art, literature, love, metaphor | *Existentialists and Mystics* named essays; *Metaphysics*; Broackes specialist chapters |
| Religion and non-theistic transcendence | “On ‘God’ and ‘Good’”; *Metaphysics*; SEP §§5, 15 |
| Politics and gender | Browning, chs. 1–7; Manne; SEP §§10–15 |
| Development and later duty | *Metaphysics* duty/political chapters; SEP §15 |
| Classification/reception | SEP overview; Broackes volume. “Virtue ethics” remains adjacent reception, not a complete classification of Murdoch’s Platonist moral realism. |
| Reading paths | “The Idea of Perfection”; “Vision and Choice in Morality”; selected *Metaphysics* chapters |

## Corrections, distinctions, and uncertainty audit

- Murdoch is a philosopher and novelist whose genres interact; she is not a novelist who occasionally offered philosophical reflections, and novels are not illustrations with one-to-one doctrinal keys.
- Attention is an active, fallible discipline of just and loving perception, not mere concentration. Noticing, sustaining focus, and successfully seeing justly can come apart.
- Love is answerable to the independent reality and particularity of another person. Idealization and fantasy can masquerade as love.
- Unselfing is not self-hatred, annihilation of agency, compulsory feminine service, or political passivity.
- The Good is not a personal divine commander, a checklist, or individual preference. Its metaphysical strength and exact relation to moral properties remain disputed.
- Plato, Weil, Kant, Christianity, psychoanalysis, Hindu and Buddhist materials are selective sources, not one syncretic system or claims of doctrinal equivalence.
- Moral vision precedes and shapes choice but does not make action, consequences, principles, or duty irrelevant. *Metaphysics* gives duty greater explicit weight than a frozen 1970 portrait suggests.
- Art may train unselfing, but good art does not guarantee good conduct and literature can also console fantasy.
- Murdoch has political thought: early communist involvement, later liberalism, “A House of Theory,” and the personal-perfection/political-decency distinction. She does not provide a comprehensive theory of institutions.
- Feminist interpretation remains divided. Attention and anti-mastery offer resources; humility, self-erasure, gendered labor, and weak analysis of structural sources of perception invite criticism.
- The inherited phrase “fat relentless ego” is edition-dependent quotation language without a page locator; the proposed override paraphrases it rather than laundering it through a work-level citation.

## Entity-complete surface inventory

| Surface | Exact record/file | Finding and only material action recommended |
| --- | --- | --- |
| Canonical record | `src/data/philosophers.ts`; `src/data/philosopherCompletionDepth.ts`; `src/data/lateTwentiethEthicsArticles.ts` | Apply proposed override, append the development/politics/gender section, and ensure the exact-quotation issue is removed or page-cited. |
| Search/directory/Compare | canonical consumers and generated search manifest | Regenerate; verify summary presents Murdoch as a philosopher and does not collapse her into generic virtue ethics. |
| Timeline/Big History | no dedicated `timelineEvents.ts` event; no explicit Wall landmark | Absence is acceptable at current density. A new event is optional, not required for entity completeness; do not inflate the chart merely to touch a surface. |
| Map/relationships | canonical branches/derived map | Retain ethics and virtue-ethics proximity, but add/retain aesthetics and modern Platonism only if supported by existing branch IDs. Do not encode Plato or Weil as simple direct influence edges if the map cannot express reception/appropriation nuance. |
| Learning paths | `src/data/learningPaths.ts`, `ethics` | Existing “Train attention” step is accurate and concise. Retain. |
| Primary Museum program | `src/data/museum/museumCanonicalProgram.ts`, `iris-murdoch`; `moralLifePracticalReasonGalleryCuration.ts` | Normalize subtitle-heavy `displayName` to exact `Iris Murdoch` if the authoritative mirror is rendered. Preserve the accurate complete invitation and current Moral Life/Character assignment. |
| Primary Museum interpretation | canonical primary appears to derive from canonical philosopher content plus general interpretation sources in `src/data/museum/museumInterpretations.ts`; no bespoke 250–400-word Murdoch primary record was found | Material integration action: provide/reconcile a concise primary interpretation through the existing accepted primary-enrichment mechanism, covering attention, Good, freedom, love, art, later duty, and politics without dumping the article. Do not change UI or geometry. |
| Supplemental Museum | `src/data/museum/moralLifePracticalReasonSupplementalExhibits.ts`, `murdoch-kestrel-unselfing` | Strong object-aware record. Keep its explicit cautions that this is not Murdoch’s kestrel and unselfing is not self-annihilation/passivity. Its single supplemental surface is proportionate. |
| Assets/provenance/accessibility | `src/data/museum/moralLifePracticalReasonGalleryAssets.ts`, `moral-murdoch-charlbury-road` and `moral-murdoch-kestrel`; `museumInterpretations.ts` source records | House is context rather than likeness and says so; kestrel is a separate modern photograph and says so. Rights/alt/limitations are inspectable. No asset change. |
| Assignment/route/fixed contract | `docs/museum-masterplan/philosopher-assignments.csv` row `iris-murdoch`; Gallery 24 program/placement | Assignment is defensible. No route, room, placement, density, or fixed-count change. |
| Related ethics surfaces | `src/data/virtueEthicsBranchDepth.ts`; `editorialDepthBatch01.ts`; `feministSocialContinuationArticles.ts` | Ensure adjacent prose says Murdoch helped reopen attention/moral psychology rather than presenting her as a standard Aristotelian virtue theorist. Existing branch prose largely does this. |
| Editorial triage | generated depth and coverage reports | Authoritative regeneration records the current review and passing depth. |

## Review acceptance and residual risk

Accepted after integrated rereading, deterministic lock verification, and bespoke primary Museum reconciliation. Residual risk concerns edition-dependent quotations, treating the 1970 collection as a single composed treatise, overstating secularism or Platonism, and allowing the compelling language of attention to obscure institutions. No asset, assignment, or geometry change is justified.
