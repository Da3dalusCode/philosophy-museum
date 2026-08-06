# Maimonides research dossier (pre-integration)

Research pass: 2026-08-05. This is an evidence map and exact-correction proposal, not an article or Museum approval.

## Surface inventory

- Canonical article: `src/data/medievalBridgeArticles.ts`, 13 sections / 26 substantive paragraphs.
- Structured profile/depth: `src/data/philosophers.ts`, `src/data/priorityDepth.ts`, generic depth helpers.
- Reuse: profile, compare, branches, search, chronology, and relationship rendering.
- Museum: Jewish-gallery anchor placement; article-derived primary interpretation; supplemental exhibits for *Mishneh Torah*, negative theology, and translation/reception of the *Guide*.

## Exact correction set

| ID | Risk | Exact proposed treatment | Evidence |
|---|---|---|---|
| MAI-1 | “Reconciled philosophical reasoning with Jewish law and theology” erases deliberate tensions. | Replace with: “Reworked Jewish law and scriptural interpretation through Aristotelian and Arabic philosophical traditions while preserving limits, tensions, and pedagogical concealment rather than producing a frictionless reconciliation.” | *Guide*, Introduction; III.54; SEP Maimonides §§3–8. |
| MAI-2 | Biography is too thin to explain law, medicine, leadership, and displacement. | Add: born Córdoba 1138; family displaced after Almohad rule; residence in Fez then Fustat; physician and communal leader; works in Judeo-Arabic and Hebrew. Do not assert forced conversion as settled fact. | SEP §1. |
| MAI-3 | Prophecy is presented as straightforward intellectual perfection. | Replace with: “In *Guide* II.32 Maimonides surveys three views. His own account links prophecy to overflow from the Active Intellect through perfected intellect and imagination, while allowing that God may miraculously withhold it and treating Moses as exceptional. Scholars dispute how naturalized or supernatural the resulting theory is.” | *Guide* II.32–48; Islamic-influence SEP §5. |
| MAI-4 | Avicenna and Averroes are foregrounded while al-Farabi is omitted or Averroes is made a direct formative source. | Use: “Aristotle as read through al-Farabi and Avicenna is central; Averroes belongs to Maimonides’s contemporary Andalusi/Aristotelian environment and later comparison, but direct formative dependence should not be asserted without work-specific evidence.” | Islamic-influence SEP §§2–4. |
| MAI-5 | Ethics is made merely preparatory to solitary intellectual perfection. | Add the culmination of *Guide* III.54: after intellectual apprehension, the highest practical imitation of God manifests lovingkindness, righteousness, and justice in governance/action. State that scholarship disputes how intellectual and moral-political perfection relate. | *Guide* III.27, III.51, III.54; SEP §§7–8. |
| MAI-6 | Esotericism can become license to attribute any hidden doctrine. | Anchor contradiction to the *Guide*’s Introduction and its “seven causes.” Present strong esoteric/Straussian and more cautious pedagogical readings as competing interpretations; require textual evidence for any concealed claim. | *Guide*, Introduction; SEP §4. |

## Paragraph evidence map

| Canonical section | ¶1 | ¶2 | Primary locator(s) | Secondary control |
|---|---|---|---|---|
| Overview | Replace smooth reconciliation under MAI-1 | Retain law/philosophy/medicine breadth; add MAI-2 | *Guide* Introduction; *Mishneh Torah* Introduction | O-MAI-1 §§1–3 |
| Historical context | Add displacement/languages/leadership under MAI-2 | Revise philosophical background under MAI-4 | Letters and works; *Guide* Introduction | O-MAI-1 §1; O-MAI-2 §§1–4 |
| Guide and audience | Retain Joseph ben Judah and perplexed elite reader | Retain indirect pedagogy; discipline esotericism under MAI-6 | *Guide* Introduction | O-MAI-1 §§3–4 |
| Language and attributes | Retain equivocation/anthropomorphism program | Retain negative theology with exact chapters | *Guide* I.50–60, esp. 58–60 | O-MAI-1 §5 |
| Creation | Retain three positions and limits of demonstration | Retain Maimonides’s acceptance of creation in time, marking interpretive dispute | *Guide* II.13–25 | O-MAI-1 §6 |
| Prophecy | Replace overly smooth naturalization under MAI-3 | Retain Moses’ exception and political function with qualifications | *Guide* II.32–48 | O-MAI-2 §5 |
| Providence | Retain differentiated providence account | Retain intellectual attachment, avoiding simple merit calculus | *Guide* III.17–18, III.51 | O-MAI-1 §7 |
| Law and reasons | Retain body/soul welfare and rational inquiry | Retain limits/ritual history with work-specific claims | *Guide* III.25–49; *Mishneh Torah* Introduction | O-MAI-1 §§7–8 |
| Ethics and perfection | Revise purely instrumental ethics under MAI-5 | Retain intellectual perfection only in tension with III.54’s active return | *Guide* III.27, III.51, III.54; *Eight Chapters* | O-MAI-1 §8; O-MAI-4, pp. 339–359, esp. discussion of *Guide* III.51–54 |
| Esoteric writing | Apply MAI-6 | Retain unresolved interpretation rather than declaring a hidden doctrine | *Guide* Introduction | O-MAI-1 §4 |
| Key works | Add *Commentary on the Mishnah*, *Eight Chapters*, medical works, resurrection treatise | Retain code/Guide genre distinction | Works named | O-MAI-1 §§1–3 |
| Influence and reception | Retain Jewish/Christian/modern reception | Revise source edges under MAI-4 | Translation history; later citations | O-MAI-1 conclusion; O-MAI-2 |
| Beginner synthesis | Replace “reconciler” under MAI-1 | Propagate MAI-3/5/6 tensions | Primary divisions above | O-MAI-1 |

## Structured-data proposals

- Keep 1138–1204 with high confidence; locate life as Córdoba/Fez/Fustat rather than only “Andalusia/Egypt.”
- Summary: use MAI-1 wording.
- Ideas: negative theology; equivocal language; creation and demonstration; prophecy/Active Intellect; providence; reasons for commandments; intellectual and ethical perfection; esoteric pedagogy.
- Works: *Commentary on the Mishnah*, *Eight Chapters*, *Mishneh Torah*, *Guide of the Perplexed*, medical writings, *Treatise on Resurrection*.
- Branches: philosophy of religion `major`; metaphysics, ethics, political philosophy, and philosophy of language `substantial`; medieval Scholasticism `later reception`, not membership.
- Relations: Aristotle, al-Farabi, and Avicenna as qualified intellectual sources; later reception by Aquinas and Spinoza. Do not create an Averroes direct-influence edge without target-specific proof.
- Search concepts: Rambam, Judeo-Arabic, Mishneh Torah, physician, law, negative theology, creation, prophecy, Active Intellect, providence, commandments, ethics, esotericism.

### Reuse-surface audit

- No independent target-specific timeline, relationship-depth, or learning-path claim was found beyond profile reading data and Museum chronology. Medieval Scholasticism belongs to reception, not Maimonides’s own school membership.
- Compare/profile inherit the smooth “reconciled” summary and shallow search tokens. Apply MAI-1–MAI-6 canonically, then compiler-refresh search; do not hand-edit generated output or infer a direct Averroes edge.

## Museum reconciliation

The article-derived primary interpretation must be independently reconciled to MAI-1–MAI-6. The *Mishneh Torah* plaque may retain completion around 1180, architectural comprehensiveness, and source/authority controversy. The negative-theology plaque should cite *Guide* I.50–60 and avoid implying that Maimonides merely says nothing about God; negative predication and action attributes have distinct roles. The translation plaque may retain Samuel ibn Tibbon’s Hebrew translation completed in 1204 and later Latin reception, with exact translator/date sourcing. No article status may automatically promote these three supplemental exhibits.

## Source register

| ID | Durable source and locator | Use |
|---|---|---|
| P-MAI-1 | Maimonides, *Guide of the Perplexed*, Introduction; I.50–60; II.13–25; II.32–48; III.17–18; III.25–49; III.51; III.54, [CCEL PDF](https://www.ccel.org/ccel/m/maimonides/guide/cache/guide.pdf) | Esotericism, attributes, creation, prophecy, providence, law, perfection |
| P-MAI-2 | Maimonides, *Mishneh Torah*, Introduction; *Eight Chapters* — work-division locators only/background; omit from the URL registry pending inspected stable editions | Codification, ethics, law; paragraph coverage remains controlled by P-MAI-1/O-MAI-1 |
| O-MAI-1 | [SEP, “Maimonides”](https://plato.stanford.edu/entries/maimonides/), revised 2024, §§1–8 | Biography and current interpretive control |
| O-MAI-2 | [SEP, “Influence of Arabic and Islamic Philosophy on Maimonides”](https://plato.stanford.edu/entries/maimonides-islamic/), §§2–5 | Al-Farabi/Avicenna and prophecy |
| O-MAI-3 | Josef Stern, *Maimonides’ Guide of the Perplexed in Translation: A History from the Thirteenth Century to the Twentieth* (2024) — bibliographic lead/background only; verify publication metadata and durable URL before registry use | Translation/reception; do not integrate until verified |
| O-MAI-4 | Roslyn Weiss, “Maimonides on Perfecting Perfection,” *Harvard Theological Review* 110.3 (2017), 339–359, [DOI](https://doi.org/10.1017/S0017816017000141), esp. its analysis of *Guide* III.51–54 | Independent Cambridge-domain control for the disputed relation among intellectual perfection, moral action, imitatio Dei, and political/community-directed activity |

## Residual uncertainty and lock gate

Creation, prophecy’s natural/supernatural remainder, the scope of esoteric writing, and the relation between intellectual and ethical-political perfection are actively disputed. Forced-conversion narratives and direct Averroes dependence require stronger evidence than currently present. Required integration count: **6 exact corrections**, **26/26 article paragraphs mapped**, **6 structured/reuse groups**, and **4 Museum surfaces reconciled**.
## Final integration certification

Canonical ID: `maimonides`. Formal review lock: `fnv1a64:e979683d643ff242`. The research-stage no-lock language above is superseded after canonical and Museum reconciliation.
