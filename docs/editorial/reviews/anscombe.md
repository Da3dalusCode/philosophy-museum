# Elizabeth Anscombe claim-review dossier

- Canonical ID: `anscombe`
- Canonical title: `Elizabeth Anscombe`
- Visitor route: `#/philosophers/anscombe`
- Editorial submission date: 2026-08-03
- Effective status: `claim-reviewed`
- Deterministic lock: `fnv1a64:b90f7daea8dd6309`
- Coverage: 14 sections; 29 citation-bearing paragraphs; 17 structured claims; 88 citation references
- Evidence set: 8 registered and cited sources, including four primary-work records, a biographical archive, and three independent specialist sources
- Depth: 2,187 final substantive words

## Method and review boundary

Every paragraph and structured field was checked against *Intention* (using stable section numbers), “Modern Moral Philosophy,” “Causality and Determination,” the essays collected in *Ethics, Religion and Politics*, the SEP and IEP specialist entries, the British Academy memoir, and *Essays on Anscombe’s Intention*. The targeted risk pass distinguished intention from prediction, desire, foresight, and consequences; tested practical knowledge and first-person authority against failure; separated Aristotle, Aquinas, and Wittgenstein from later receptions; and reviewed claims concerning consequentialism, war, double effect, sexuality, religion, and virtue ethics.

Museum content was inspected as a separate editorial surface. It is not inside the canonical article lock unless explicitly added to the lock boundary.

## Paragraph evidence map

| Article section(s) | Evidence and inspectable locators |
| --- | --- |
| `overview`; `context` | SEP §§1–2; British Academy memoir; IEP §1 |
| `wittgenstein` | SEP §§1–2; memoir sections on Wittgenstein, executorship, translation, and publications |
| `intention-book`; `description` | *Intention* §§1–26; SEP §§3–4; *Essays on Anscombe’s Intention*, action-description and “Why?” chapters |
| `practical-knowledge` | *Intention* §§28–32, 45–48; SEP §4; *Essays*, practical-knowledge chapters |
| `modern-moral-philosophy`; `consequentialism` | “MMP,” pp. 1–19; SEP §5; IEP §§5–6 |
| `truman` | “Mr. Truman’s Degree” in *Ethics, Religion and Politics*; SEP §5; memoir account of the Oxford protest |
| `causality` | “Causality and Determination,” whole essay; SEP §3; IEP §3 |
| `influence`; `misunderstandings`; `reading-strategy` | SEP §§2–6; IEP §§2–8; *Essays* introduction |
| `prediction-desire-first-person-religion` | *Intention* §§1–4, 28–32, 45–48, 52; “MMP”; “Mr. Truman’s Degree,” “War and Murder,” and “Contraception and Chastity”; SEP §§3–6 |

## Structured-claim evidence map

| Claim family | Evidence |
| --- | --- |
| Name, dates, education, career, Wittgenstein relationship | British Academy memoir; SEP §1 |
| Intention, description, practical reasoning, first person | *Intention* §§1–52; SEP §§2–4; *Essays* |
| Causation | “Causality and Determination”; SEP/IEP causation sections |
| Moral philosophy, war, sexuality, religion | “MMP”; *Ethics, Religion and Politics* named essays; SEP §§5–6; IEP §§5–8 |
| Classification | Analytic/Action primary supported by the action corpus; ethics/virtue-revival secondary supported by “MMP” and reception. Do not invert this hierarchy. |
| Influence and disputes | *Essays on Anscombe’s Intention*; SEP reception throughout §§2–6 |
| Reading paths | Stable *Intention* section clusters; whole “MMP”; named collected essays |

## Corrections, distinctions, and uncertainty audit

- The canonical Atlas title remains `Elizabeth Anscombe`, matching the owner-named target and current registry. `G. E. M. Anscombe` remains the bibliographic form used in source and work metadata; it is not a competing canonical title.
- Intention is not an inner episode added to bodily movement. Intentionality attaches under descriptions organized by practical reasoning and the applicable sense of “Why?”.
- Prediction, desire, intention, foresight, consequence, and side effect are not interchangeable. Distinguishing them does not by itself settle the morality of a case.
- Practical knowledge is non-observational and productive in a qualified sense; it is not magic introspection or infallibility. Failed execution and mistaken circumstances remain possible.
- First-person authority is not a general guarantee that speakers cannot misunderstand their motives or actions.
- Anscombe engages Aristotle and Aquinas as argumentative resources. “Neo-Aristotelian action theory” is a later reception family, not her self-description.
- Wittgenstein was teacher and interlocutor; the translation and executorship are important, but Anscombe’s philosophy is not merely a faithful application of his method.
- “Modern Moral Philosophy” states three provocative theses and helped redirect later virtue ethics; it is not itself a complete virtue theory.
- Her rejection of consequentialism does not mean consequences never matter. It rejects making every act-type available as a means when projected totals are favorable.
- Opposition to honoring Truman is not generic pacifism. The argument concerns intentional killing of noncombatants and truthful action description.
- Catholic commitments and controversial positions on abortion, contraception, and sexuality must be accurately reported without treating religious authority as either a refutation or the whole argument.
- The current article phrase “Anscombe’s influence … is difficult to overstate” should be softened during integration to a non-superlative statement of broad, documented influence.

## Entity-complete surface inventory

| Surface | Exact record/file | Finding and only material action recommended |
| --- | --- | --- |
| Canonical record | `src/data/philosophers.ts`; `src/data/contentDepth.ts`; `src/data/analyticContinuationArticles.ts` | Preserve the canonical title `Elizabeth Anscombe`, apply the structured override, append the new distinctions section, and retain article action-theory priority. |
| Search/directory/Compare | canonical consumers plus `src/data/generated/searchIndex.json` and route manifest | Regenerate from authority; never fork IDs or routes around alternate bibliographic name forms. |
| Timeline/Big History | no dedicated event in `src/data/timelineEvents.ts`; Analytic band in `src/data/wallChart.ts` includes `anscombe` | Absence of a dedicated event is not a defect at current density. Analytic-band membership is correct. Do not move her into a virtue-only band. |
| Map/relationships | canonical branch memberships and derived map | Add/retain `analytic-philosophy` as central/major and `virtue-ethics` as influence or major secondary; do not encode “Wittgenstein influenced Anscombe” more strongly than evidence/relationship vocabulary allows. |
| Learning paths | `src/data/learningPaths.ts`, `ethics` and `mind` | Both accurately use action description and embodied practical knowledge. Retain. |
| Primary Museum interpretation | `src/data/museum/museumExpansionInterpretations.ts`, record `anscombe` (legacy hall ID); `museumCatalog.ts` | Interpretation is strong and already states non-infallibility, ethics breadth, religious controversy, and *Intention*. Preserve the canonical `Elizabeth Anscombe` title at runtime and the live Analytic primary without changing assignment. |
| Primary title/invitation mirror | `src/data/museum/museumCanonicalProgram.ts`, exhibit `anscombe` | `Elizabeth Anscombe` matches the canonical registry. The question is accurate. Preserve Analytic/Action primary and secondary Moral Life/Core Questions routes. |
| Supplemental Museum | `src/data/museum/analyticSupplementalExhibits.ts`: `anscombe-intention-why`, `anscombe-practical-knowledge`, `anscombe-modern-moral-philosophy`, `anscombe-truman-degree`, `anscombe-causality` | Five-surface program matches corpus breadth. Check the practical-knowledge plaque does not imply infallibility and “MMP” does not label her the founder of virtue ethics. No geometry change. |
| Assets/provenance/accessibility | `src/data/museum/analyticTraditionsGalleryAssets.ts`; older `museumCatalog.ts` assets; provenance doc | Current interpretive portrait clearly identifies derivative/posthumous status; pump and Newton’s cradle are explicit contextual foils. Preserve these limitations. The generated portrait is an existing accepted asset; no asset change is proposed. |
| Classification/assignment | `docs/museum-masterplan/classification-principles.md`; `difficult-placements.md`; `philosopher-assignments.csv` row `anscombe`; `recommended-program.md` | These are authoritative and correct: contribution-first Action/Intention primary, ethics/virtue revival substantial secondary. No reassignment. |
| Related branches | `src/data/branches.ts` includes Anscombe in ethics, virtue ethics, and analytic philosophy; `feministPhilosophyBranchDepth.ts` | Feminist branch correctly warns she is not a founder/representative feminist philosopher. Preserve. |
| Editorial triage | generated depth and coverage reports | Authoritative regeneration records the current review and passing depth. |

## Review acceptance and residual risk

Accepted after integrated rereading and deterministic lock verification. Residual risk centers on compression in *Intention*, later theoretical vocabulary being projected backward, and presenting disputed Catholic conclusions as entailed by her action theory. Alternate bibliographic name forms do not require a canonical-title change; assignment and geometry are not at issue.
