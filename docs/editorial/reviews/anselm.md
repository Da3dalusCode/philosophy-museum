# Anselm research dossier (pre-integration)

Research pass: 2026-08-05. This file records evidence and exact corrections only; it does not lock article or Museum claims.

## Surface inventory

- Canonical article: `src/data/medievalBridgeArticles.ts`, 13 sections / 26 substantive paragraphs.
- Structured profile/depth: `src/data/philosophers.ts`, `src/data/priorityDepth.ts`, generic depth helpers.
- Reuse: profile, compare, Scholasticism wall band, search, and branch connections.
- Museum: Latin-Christian Scholastic standard placement and enriched primary interpretation.

## Exact correction set

| ID | Risk | Exact proposed treatment | Evidence |
|---|---|---|---|
| ANS-1 | “Faith seeking understanding” is made to exclude rational address to outsiders. | Replace with: “Anselm does not suspend faith to reason from a neutral standpoint: inquiry is an activity of believing love. Yet the *Monologion* deliberately seeks reason-alone arguments that a nonbeliever could assess, so the project is neither mere confession nor restricted to insiders.” | *Monologion* Prologue; *Proslogion* Proemium; SEP §§1–2. |
| ANS-2 | “Ontological argument” and “greatest conceivable being” can replace Anselm’s text and collapse chapters 2–3. | Use “Proslogion argument” first and mark “ontological argument” as a later label. Preserve “that than which nothing greater can be thought.” Distinguish ch. 2’s intellect/reality move from ch. 3’s claim that divine nonexistence cannot be thought. | *Proslogion* 2–3; SEP §3. |
| ANS-3 | Gaunilo is said to propose a “greatest conceivable island.” | Replace with: “Gaunilo’s parody invokes a lost island alleged to be more excellent and abundant than all others; it does not use the later stock phrase ‘greatest conceivable island.’ Anselm replies that his reasoning uniquely concerns the being whose nonexistence cannot be thought, but the reply’s success remains disputed.” | Gaunilo, *On Behalf of the Fool* 6; Anselm, *Reply* 1–3. |
| ANS-4 | *Cur Deus Homo* is reduced to “feudal notions of honor.” | Replace with: “The work uses honor, debt, satisfaction, order, and fittingness within scriptural, patristic, penitential, monastic, legal, and contemporary social vocabularies. Scholarship disputes reduction to feudalism, and Anselm should not be made to teach later penal-substitution theories.” | *Cur Deus Homo* I.11–15, I.20–25, II.6–7, II.18–20; O-ANS-3/O-ANS-4. |
| ANS-5 | The incarnation is presented as merely “fitting,” or as necessity imposed on God. | State: “Within the argument’s assumptions, restoration must be accomplished by one who is truly divine and truly human; the necessity is Anselm’s rational/fitting necessity, not external compulsion on God.” | *Cur Deus Homo* II.6–7, II.18–20. |
| ANS-6 | Freedom/foreknowledge coverage omits *De concordia*. | Add *De concordia* to works and use it for grace, foreknowledge, predestination, and freedom. Define freedom as the power to preserve rectitude of will for its own sake; define truth as rectitude perceptible only by the mind. | *On Freedom of Choice* 3; *On Truth* 11; *De concordia* I–III; SEP §§4–5. |

## Paragraph evidence map

| Canonical section | ¶1 | ¶2 | Primary locator(s) | Secondary control |
|---|---|---|---|---|
| Overview | Retain monastic/archiepiscopal setting | Revise project under ANS-1 | *Proslogion* Proemium; *Monologion* Prologue | O-ANS-1 §§1–2 |
| Historical context | Retain Bec/Canterbury reform setting | Retain investiture conflict with careful chronology | Letters; Eadmer used through modern biography | O-ANS-1 §1 |
| Faith and reason | Revise insider-only implication under ANS-1 | Retain prayer and proof as joined genres | *Monologion* Prologue; *Proslogion* Proemium | O-ANS-1 §2 |
| Monologion method | Retain reason-alone, graduated-goods method | Retain divine-attribute reasoning as argument, not neutral consensus | *Monologion* 1–4, 15–28 | O-ANS-1 §2 |
| Proslogion argument | Revise label/formula and chs. 2–3 under ANS-2 | Retain necessary-existence ambition with controversy | *Proslogion* 2–3 | O-ANS-1 §3 |
| Gaunilo and reply | Revise island wording under ANS-3 | Retain scope/definition dispute as unresolved | Gaunilo 6; *Reply* 1–3 | O-ANS-1 §3 |
| Divine attributes | Retain perfect-being reasoning only as a retrospective heuristic | Retain simplicity/timelessness tensions | *Monologion* 15–28; *Proslogion* 5–26 | O-ANS-1 §§2–3 |
| Truth and freedom | Apply exact definitions under ANS-6 | Retain freedom as right-will capacity, not option-count | *On Truth* 11; *On Freedom of Choice* 1–3 | O-ANS-1 §4 |
| Foreknowledge and grace | Retain compatibility problem | Add *De concordia* under ANS-6 | *De concordia* I–III | O-ANS-1 §5 |
| Cur Deus Homo | Revise necessity under ANS-5 | Replace feudal shorthand under ANS-4 | *Cur Deus Homo* I.11–25; II.6–7, 18–20 | O-ANS-3/O-ANS-4 |
| Key works | Add *De concordia* and Gaunilo reply | Retain dialogue/prayer/treatise genre range | Works named above | O-ANS-1 bibliography |
| Influence and reception | Retain Scholastic influence | Retain later debate, marking labels/reconstructions retrospective | Medieval and modern reception | O-ANS-2/O-ANS-3 |
| Beginner synthesis | Retain faith/reason and rectitude | Revise proof/island/atonement summaries under ANS-1–5 | Primary divisions above | O-ANS-1 |

## Structured-data proposals

- Keep 1033–1109, but consider display `c. 1033–1109` and medium/high confidence for the birth year.
- Summary: “A monastic theologian who joined prayerful faith with reasoned inquiry into God, truth, freedom, foreknowledge, and redemption.”
- Ideas: faith seeking understanding; Proslogion argument; divine attributes; truth as rectitude; freedom for rectitude; foreknowledge and grace; incarnation and satisfaction.
- Works: *Monologion*, *Proslogion* plus Gaunilo exchange, *On Truth*, *On Freedom of Choice*, *De concordia*, *Cur Deus Homo*.
- Branches: philosophy of religion and Scholasticism `major`; metaphysics, logic, and ethics `substantial`.
- Relations: Augustine and Boethius as important Latin inheritances; Aquinas, Bonaventure, Scotus, and later philosophy of religion as reception. Do not encode later “ontological arguments” as identical repetitions.
- Search concepts: Monologion, Proslogion, Gaunilo, lost island, rectitude, freedom, truth, De concordia, foreknowledge, incarnation, satisfaction.

### Reuse-surface audit

- Wall/map: Scholasticism placement is supportable, but its copy should use ANS-1/2 rather than reduce Anselm to a single proof.
- No independent target-specific timeline or relationship-depth record was found. Existing learning content is primarily reading-path data, and compare/profile/search consume canonical fields. Regenerate search after structured corrections rather than editing generated tokens.

## Museum reconciliation

The enriched interpretation correctly presents the *Proslogion* within a monastic project, includes Gaunilo, expands beyond the proof, and cautions that “ontological argument” is retrospective. Apply ANS-1–ANS-6 throughout. Replace every “greatest conceivable island” formulation, remove reduction to feudalism, add *De concordia*, and distinguish satisfaction from later penal substitution. Primary interpretation remains independently claim-reviewed even if it draws on the article.

## Source register

| ID | Durable source and locator | Use |
|---|---|---|
| P-ANS-1 | Anselm, *Monologion* Prologue and 1–4; *Proslogion* Proemium and 2–3; Gaunilo 6; Anselm’s *Reply* 1–3, [CCEL collected works](https://ccel.org/ccel/anselm/basic_works.all.html) | Faith/reason, proof, island exchange |
| P-ANS-2 | *On Truth* 11; *On Freedom of Choice* 1–3; *De concordia* I–III; *Cur Deus Homo* I.11–25, II.6–7, II.18–20, [CCEL contents](https://ccel.org/ccel/anselm/basic_works/basic_works.toc.html) | Rectitude, freedom, foreknowledge, redemption |
| O-ANS-1 | [SEP, “Saint Anselm”](https://plato.stanford.edu/entries/anselm/), §§1–5 | Current scholarly control |
| O-ANS-2 | Brian Davies and Brian Leftow, eds., [*The Cambridge Companion to Anselm*](https://doi.org/10.1017/CCOL0521807468) | Context and reception |
| O-ANS-3 | David Brown, “Anselm on Atonement,” in *The Cambridge Companion to Anselm*, [metadata](https://philpapers.org/rec/BROAOA-3) | Satisfaction and later penal readings |
| O-ANS-4 | Bernard van Vreeswijk, “Anselm on Divine Justice and Human Redemption,” [DOI](https://doi.org/10.1017/S0036930616000299) | Current peer-reviewed atonement analysis |

## Residual uncertainty and lock gate

The *Proslogion* argument’s exact logical form, the force of Anselm’s reply to Gaunilo, the kind of “necessity” used in *Cur Deus Homo*, and the historical background of satisfaction remain disputed. Required integration count: **6 exact corrections**, **26/26 article paragraphs mapped**, **6 structured groups**, and **1 primary Museum interpretation reconciled**. Editorial status must remain research-ready/unreviewed until integration is separately checked.
## Final integration certification

Canonical ID: `anselm`. Formal review lock: `fnv1a64:1fcc4f8a06f9e92c`. The research-stage no-lock language above is superseded after canonical and Museum reconciliation.
