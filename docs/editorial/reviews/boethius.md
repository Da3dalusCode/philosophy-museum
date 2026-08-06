# Boethius research dossier (pre-integration)

Research pass: 2026-08-05. This dossier proposes evidence-backed corrections; it does not approve the canonical article or Museum interpretation.

## Surface inventory

- Canonical article: `src/data/medievalBridgeArticles.ts`, 13 sections / 26 substantive paragraphs.
- Structured profile/depth: `src/data/philosophers.ts`, `src/data/priorityDepth.ts`, generic depth helpers.
- Reuse: compare/profile/search and the Scholasticism/Neoplatonism wall context.
- Museum: Latin-Christian scholastic standard placement, late-antiquity supplemental context, and enriched primary interpretation.

## Exact correction set

| ID | Risk | Exact proposed treatment | Evidence |
|---|---|---|---|
| BOE-1 | `477–524` is too exact and likely ends too early. | Use display dates “c. 475/480–525/526 CE; chronology uncertain.” If numeric plotting requires single years, use 477–526 and attach medium confidence. Harmonize every Museum occurrence. | SEP Boethius §1; Cambridge companions O-BOE-2/O-BOE-3. |
| BOE-2 | “Last Roman and first scholastic” turns a reception bridge into Boethius’s identity. | Title/summary: “Late Roman logician, theologian, and author of the *Consolation*.” Explain that his translations and commentaries became foundational for medieval Latin curricula; do not call him a member of a later Scholastic school. | SEP §§1–3; O-BOE-2. |
| BOE-3 | The biography states only “treason” and “awaiting execution.” | Replace with: “After accusations that included conspiracy/treason in the hostile political setting of Theoderic’s court, Boethius was imprisoned and executed, probably in 525 or 526. He presents the *Consolation* as written in confinement; details and chronology are imperfectly recoverable.” | SEP §1 and *Consolation* I, prose 4. |
| BOE-4 | Calling wealth, office, fame, and pleasure simply “false goods” can imply that all externals are worthless. | Add: “They are unstable and cannot constitute the highest good; some external and relational goods can retain genuine but non-final value.” | *Consolation* II, proses 1–8; III, prose 2; SEP §6. |
| BOE-5 | The theological corpus can be presented as uniformly authored and doctrinal. | Name individual tractates. Add: “The attribution of *De fide catholica* was historically disputed; modern scholarship often defends it, but the collected tractates are not uniform in genre or explicit doctrinal content.” | SEP §4; Chadwick O-BOE-4. |
| BOE-6 | Primary branch `medieval-scholasticism` treats reception as membership. | Make logic and philosophy of religion primary/substantial; label Scholasticism as precursor/reception. Platonist inheritance likewise needs qualified association. | SEP §§2–6. |

## Paragraph evidence map

| Canonical section | ¶1 | ¶2 | Primary locator(s) | Secondary control |
|---|---|---|---|---|
| Overview | Revise identity under BOE-2 | Retain two-sided corpus without “two Boethiuses” simplification | *Consolation* I; logical works catalogued in SEP | O-BOE-1 §§1–6 |
| Historical context | Revise dates/charges under BOE-1/3 | Retain Greek-learning contraction, but state reception rather than inevitable “bridge” | *Consolation* I.4 | O-BOE-1 §§1–2 |
| Logic project | Retain translation/commentary program | Retain categories, propositions, syllogism, topical reasoning | Commentaries on *Categories*, *On Interpretation*, Porphyry’s *Isagoge* | O-BOE-1 §§2–3 |
| Universals | Retain Isagoge problem | Retain qualified solution and later reception; avoid projecting mature scholastic camps backward | Second commentary on Porphyry | O-BOE-1 §2.1 |
| Consolation form | Retain prose/verse dialogue and Lady Philosophy | Retain therapeutic ascent | *Consolation* I–III | O-BOE-1 §6 |
| Fortune and happiness | Revise external-goods absolutism under BOE-4 | Retain highest-good/participation argument | *Consolation* II.1–8; III.2–12 | O-BOE-1 §6 |
| Providence and fate | Retain providence/fate distinction | Retain order/contingency, avoiding deterministic closure | *Consolation* IV, prose 6 | O-BOE-1 §6.3 |
| Foreknowledge and freedom | Retain problem statement | Retain timeless-present response while marking objections unresolved | *Consolation* V, proses 3–6 | O-BOE-1 §6.4 |
| Theology and person | Retain philosophical method in Christian questions | Revise uniform-corpus implication under BOE-5; retain person definition with source | *Contra Eutychen et Nestorium* ch. 3 | O-BOE-1 §4; O-BOE-4 |
| Liberal arts | Retain music/quadrivial transmission | Retain threefold music as theoretical classification, not empirical finding | *De institutione musica* I.2 | O-BOE-2 chapters on music/quadrivium |
| Key works | Retain categories but name representative works | Retain Christianity/silence question as unresolved | Works named above and *Consolation* | O-BOE-1 §§2–6 |
| Influence and reception | Retain curriculum and *Consolation* reception | Revise “first scholastic” identity under BOE-2/6 | Medieval manuscript/curriculum reception | O-BOE-2 |
| Beginner synthesis | Retain fortune/providence/freedom core | Retain logical transmission with qualified bridge language | *Consolation* II–V | O-BOE-1 |

## Structured-data proposals

- Apply BOE-1 dates and medium confidence.
- Summary: “A late Roman logician and theologian whose translations, commentaries, and *Consolation* profoundly shaped medieval Latin philosophy.”
- Ideas: logic and universals; fortune and happiness; providence and fate; divine foreknowledge and freedom; eternity; person and nature; mathematical music.
- Works: *Second Commentary on Porphyry’s Isagoge*, *De topicis differentiis*, *De institutione musica*, the individually named theological tractates, and *Consolation of Philosophy*.
- Branches: logic `major`; philosophy of religion/metaphysics `substantial`; medieval Scholasticism `later-reception/precursor`; Platonism `qualified inheritance`.
- Search concepts: logic, universals, Porphyry, categories, topical reasoning, prose and verse, Fortune, providence, fate, eternity, freedom, person, nature, music.

### Reuse-surface audit

- Wall/map: Scholasticism is a later reception/precursor relation, not Boethius’s historical school identity; late-antique Platonist context also needs qualification.
- No separately evidenced target-specific timeline, relationship-depth, or learning-path claim was found beyond profile reading recommendations. Compare/profile render canonical structured fields; generated search must be compiler-refreshed after BOE-1–BOE-6.

## Museum reconciliation

The enriched primary interpretation is the strongest existing surface: retain its two-corpus framing, incomplete Plato/Aristotle translation plan, Christian-silence caution, logic/music objects, and note that the familiar portrait is many centuries later. Apply BOE-1 dates and BOE-2/5 membership/corpus qualifications. The late-antiquity and Latin-Christian supplemental exhibits should use the same uncertain death range. The *Consolation* plaque should distinguish unstable instrumental goods from the highest good and cite books II–V. Primary Museum copy remains a separate review object even when text is article-derived.

## Source register

| ID | Durable source and locator | Use |
|---|---|---|
| P-BOE-1 | Boethius, *Consolation of Philosophy*, I.4; II.1–8; III.2–12; IV.6; V.3–6, [Project Gutenberg edition](https://www.gutenberg.org/files/14328/14328-h/14328-h.htm) | Biography as narrated, happiness, providence, foreknowledge |
| P-BOE-2 | Boethius, *Contra Eutychen et Nestorium* ch. 3; *De institutione musica* I.2 — work-division locators only/background; omit from the URL registry pending an inspected stable primary edition | Person/nature and music classification; paragraph coverage remains independently controlled by O-BOE-1/O-BOE-2 |
| O-BOE-1 | [SEP, “Anicius Manlius Severinus Boethius”](https://plato.stanford.edu/entries/boethius/), §§1–6 | Current dates, logic, theology, *Consolation* |
| O-BOE-2 | John Marenbon, ed., *The Cambridge Companion to Boethius*, [DOI](https://doi.org/10.1017/CCOL9780521872669) | Corpus, context, reception |
| O-BOE-3 | Michael Wiitala, ed., *Boethius’ Consolation of Philosophy: A Critical Guide*, [DOI](https://doi.org/10.1017/9781009288279) | Current peer-reviewed readings of the *Consolation* |
| O-BOE-4 | Henry Chadwick, “The Authenticity of Boethius’s Fourth Tractate, *De fide catholica*,” [DOI](https://doi.org/10.1093/jts/XXXI.2.551) | Attribution history |

## Residual uncertainty and lock gate

Birth/death chronology, the judicial accusations, *De fide catholica* attribution, and the exact relation between the Christian tractates and the *Consolation* remain interpretive issues. Required integration count: **6 exact corrections**, **26/26 article paragraphs mapped**, **6 structured groups**, and **3 Museum contexts reconciled**. Do not claim editorial approval until a separate claim-review pass completes.
## Final integration certification

Canonical ID: `boethius`. Formal review lock: `fnv1a64:bc73e56af6834d5e`. The research-stage no-lock language above is superseded after canonical and Museum reconciliation.
