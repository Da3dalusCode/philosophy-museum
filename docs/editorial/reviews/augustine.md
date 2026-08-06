# Augustine research dossier (pre-integration)

Research pass: 2026-08-05. This is an evidence-and-correction dossier, not a claim-review approval. The canonical article, structured profile, timeline/wall/search reuse, and primary Museum interpretation remain independently reviewable surfaces.

## Surface inventory

- Canonical article: `src/data/medievalBridgeArticles.ts`, 13 sections / 26 substantive paragraphs.
- Structured profile and depth: `src/data/philosophers.ts`, `src/data/priorityDepth.ts`, `src/data/contentDepth.ts`, and accuracy metadata in `src/data/philosophers.ts`.
- Reuse: `src/data/timelineEvents.ts`, `src/data/wallChart.ts`, generated search, compare, and branch/profile rendering.
- Museum: late-antiquity anchor placement; mechanically article-derived primary interpretation; the *Confessions* supplemental exhibit in `src/data/museum/lateAntiquitySupplementalExhibits.ts`.

## Exact correction set

| ID | Risk | Exact proposed treatment | Evidence |
|---|---|---|---|
| AUG-1 | The pear theft is reduced to “loving disorder for its own sake.” | Replace with: “Augustine describes stealing pears without need or gain, but his analysis distributes the motive among delight in transgression, distorted imitation of freedom, and the social pull of companionship. The episode is an inquiry, not a one-line diagnosis.” | *Confessions* II.4–10; SEP Augustine §7.5. |
| AUG-2 | The grace/free-will discussion can read as a single unchanged doctrine. | Add: “Augustine’s account developed: early anti-Manichaean works defend voluntary responsibility; later anti-Pelagian works increasingly stress prevenient and healing grace. Scholars dispute how continuous that development is.” | *On Free Choice of the Will* I.1–3, III.1–5; *On the Spirit and the Letter* 30–32; *On Grace and Free Choice* 16–17; SEP §§7.4–7.5. |
| AUG-3 | “Christianity + Platonism synthesis” and wall membership flatten reception into school identity. | Timeline title: “Augustine transforms Christian and Platonist inheritances.” Remove Augustine from the Neoplatonism band’s member list, or relabel the field as reception/association. Preserve the existing `later-reception` membership status. | *Confessions* VII.9–21; SEP §§4, 6; canonical membership metadata. |
| AUG-4 | The “Platonist books” can be assigned too confidently. | Retain “probably mediated,” and specify only: “likely Latin translations associated with Marius Victorinus, probably including Plotinus and possibly Porphyry; the exact corpus remains uncertain.” | *Confessions* VII.9; SEP §4. |
| AUG-5 | Political compression can detach the two cities and coercion from their textual settings. | Anchor the two loves/two cities to *City of God* XIV.28 and earthly peace to XIX.11–17. Anchor coercion to Letters 93 and 185, explicitly marking this as a troubling development in his episcopal practice. | Primary divisions listed; Oxford source O-AUG-3. |

## Paragraph evidence map

Every substantive paragraph was inspected. “Retain” means substantively supportable after normal copyediting; it does not confer lock status.

| Canonical section | ¶1 | ¶2 | Primary locator(s) | Secondary control |
|---|---|---|---|---|
| Overview | Retain: late Roman Christian philosopher/bishop and afterlife | Retain: inwardness, evil, grace, history | *Conf.* I.1; X.8–27; XI.14–31; *City* XI–XIV | O-AUG-1 §§1, 4, 7 |
| Historical context | Retain: Roman Africa, Christianity, Platonist inheritance | Retain: education, rhetoric, Manichaeism, skepticism, Platonist reading | *Conf.* III.4–12; V.3–14; VII.9–21 | O-AUG-1 §§2–4 |
| Intellectual journey | Retain | Revise pear-theft compression under AUG-1 | *Conf.* II.4–10; VIII.12 | O-AUG-1 §§2–3, 7.5 |
| Will, grace, freedom | Retain divided-will analysis | Revise developmental framing under AUG-2 | *Conf.* VIII.5–11; *Free Choice* I, III; *Grace and Free Choice* 16–17 | O-AUG-1 §§7.4–7.5 |
| Memory, time, self | Retain memory as inquiry into mind and God | Retain time as distension, while avoiding “subjective time” shorthand | *Conf.* X.8–27; XI.14–31 | O-AUG-2, esp. chapter discussion of X–XI |
| Evil and order | Retain privation and disordered will | Retain responsibility/theodicy tension | *Conf.* VII.12–16; *Enchiridion* 10–15; *Free Choice* III | O-AUG-1 §§7.5–7.6 |
| Knowledge and signs | Retain anti-skeptical and illumination claims with modest wording | Retain signs/language pedagogy | *Against the Academics* III.10–20; *Teacher* 1–14; *Christian Doctrine* I–II | O-AUG-1 §§5–6 |
| Two cities | Retain as two loves/communities, not church/state | Retain mixed-history and peace qualification; add AUG-5 locators | *City* XIV.28; XIX.11–17 | O-AUG-1 §8 |
| Scripture and philosophy | Retain critical appropriation | Revise exact Platonist mediation under AUG-4 | *Christian Doctrine* II.40; *Conf.* VII.9–21 | O-AUG-1 §§4, 6 |
| Key works | Retain listed works | Retain genre/method distinction | Primary works named in paragraph | O-AUG-1 bibliography |
| Influence and reception | Retain broad Latin reception | Retain modern reception only as reception, not identity | *Retractations* I–II (self-revision) | O-AUG-1 §§9–10 |
| Controversies | Retain grace-development dispute | Retain coercion and inward-self cautions; apply AUG-5 | Letters 93, 185; *Grace and Free Choice* | O-AUG-3 |
| Beginner synthesis | Retain with “ordered love” emphasis | Retain if AUG-1/AUG-2 qualifications propagate | *Conf.* I.1, VIII, X–XI; *City* XIV.28 | O-AUG-1 |

## Structured-data proposals

- Keep numeric dates 354–430 and North Africa. Add date confidence `high`.
- Replace the one-line summary with: “Reworked Christian doctrine through sustained arguments about will, memory, time, signs, evil, grace, and political community.”
- Add idea labels: divided will; memory and inwardness; time as distension; privation of evil; grace and freedom; two cities; signs and interpretation.
- Add works: *On Free Choice of the Will*, *On Christian Doctrine*, *The City of God*, *On the Trinity* alongside *Confessions*.
- Branches: philosophy of religion `major`; ethics, philosophy of mind, epistemology, language, and political philosophy `substantial`; Platonism and Neoplatonism `later-reception`/qualified inheritance, not school membership.
- Relations: received Cicero, Manichaean debate, Academic skepticism, and Platonist texts (Plotinus/Porphyry attribution qualified); later reception by Anselm and Aquinas. Do not encode every reception as direct personal influence.
- Search concepts after compiler refresh: memory, inwardness, divided will, grace, evil, privation, signs, language, two cities, political theology.

### Reuse-surface audit

- Timeline: the c. 400 “synthesizes Christianity and Platonism” event requires AUG-3; a `c. 397–400` composition range is safer for *Confessions* than one exact year.
- Wall/map: Augustine is currently inside the Neoplatonism band’s `philosopherIds`; reconcile this with his `later-reception` membership status under AUG-3. No relation edge should silently convert reception into school membership.
- Compare/profile consume canonical structured fields; learning/search material is generated or generic rather than separately evidenced. Refresh it through the compiler after canonical metadata changes, never by hand-editing generated output.

## Museum reconciliation

The primary Museum interpretation is currently assembled from article sections. It must not inherit any future article lock automatically. Rewrite or explicitly reconcile its overview, argument, evidence, debate, and reading zones against AUG-1–AUG-5. The *Confessions* supplemental plaque is supportable at `c. 397–400`; add book locators X–XI, and do not present “memory/will/time” as three isolated modern topics. The late-antiquity anchor can remain, but its Platonist relationship must be described as appropriation and transformation rather than school membership.

## Source register

| ID | Durable source and locator | Use |
|---|---|---|
| P-AUG-1 | Augustine, *Confessions*, II.4–10, VII.9–21, VIII.5–12, X.8–27, XI.14–31; [New Advent books X–XI](https://www.newadvent.org/fathers/110110.htm) | Pears, Platonist books, will, memory, time |
| P-AUG-2 | Augustine, *City of God*, [XIV.28](https://www.newadvent.org/fathers/120114.htm) and [XIX.11–17](https://www.newadvent.org/fathers/120119.htm) | Two loves/cities and earthly peace |
| P-AUG-3 | Augustine, *On Free Choice of the Will* I.1–3, III.1–5 (work-division locator; background-only pending a stable inspected edition); [*On Grace and Free Choice* 16–17](https://www.newadvent.org/fathers/1510.htm); [Letter 93](https://www.newadvent.org/fathers/1102093.htm) and [Letter 185](https://www.newadvent.org/fathers/1102185.htm) | Will, grace development, coercion; omit the unlinked *Free Choice* item from the registry without losing coverage from O-AUG-1 |
| O-AUG-1 | [SEP, “Saint Augustine”](https://plato.stanford.edu/entries/augustine/), §§2–8 | Current scholarly control across the article |
| O-AUG-2 | Lenka Karfíková, “Memory, Eternity, and Time,” in *The Cambridge Companion to Augustine’s Confessions*, [DOI](https://doi.org/10.1017/9781108672405.014) | Books X–XI and temporal analysis |
| O-AUG-3 | [Oxford Academic chapter on Augustine’s developing response to religious coercion](https://academic.oup.com/book/11234/chapter-abstract/159754622) | Coercion and development |

## Residual uncertainty and lock gate

The exact contents/authors of the “Platonist books,” continuity in Augustine’s doctrine of grace, and interpretation of coercion remain contested. These must be preserved as uncertainties, not resolved by confident copy. Required integration count: **5 exact corrections**, **26/26 article paragraphs mapped**, **6 structured/reuse groups**, and **2 Museum surfaces reconciled**. Keep editorial status unreviewed or research-ready until those changes receive a separate claim-review pass.
## Final integration certification

Canonical ID: `augustine`. Formal review lock: `fnv1a64:f30de6a64c90d6a5`. The research-stage no-lock language above is superseded after canonical and Museum reconciliation.
