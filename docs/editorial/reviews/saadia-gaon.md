# Saadia Gaon research dossier (pre-integration)

Research pass: 2026-08-05. This dossier is a source map and correction proposal, not an editorial lock.

## Surface inventory

- Canonical article: `src/data/medievalJewishCompletionArticles.ts`, 11 sections / 22 substantive paragraphs.
- Structured profile/depth: `src/data/philosophers.ts`, `src/data/medievalCompletionDepth.ts`, generic depth helpers.
- Reuse: profile, compare, branch, search, chronology, and any relationship rendering.
- Museum: Jewish-gallery standard placement, article-derived primary interpretation, and `saadia-beliefs-opinions` supplemental exhibit.

## Exact correction set

| ID | Risk | Exact proposed treatment | Evidence |
|---|---|---|---|
| SAA-1 | The law section assigns broad educational/commemorative/social purposes without distinguishing what Saadia says reason can know. | Replace with: “Saadia distinguishes rational commandments, whose goodness or badness reason can apprehend, from ‘heard’ or revealed commandments, whose specific form is known through revelation. Both are divine gifts connected with action, discipline, and reward; proposed utilities for particular rituals should be attributed and not universalized.” | *Book of Beliefs and Opinions* III; SEP Saadia §§3–4. |
| SAA-2 | The soul paragraph can sound like a generic Platonic psychology translated into modern science. | Replace with: “Saadia describes one created soul with distinguishable appetitive, spirited, and rational functions, joined to the body for embodied moral action and ultimately reunited with it at resurrection. His account also uses an obsolete cosmology and physiology that should be presented historically, not naturalized.” | *Beliefs and Opinions* VI, IX; SEP §9. |
| SAA-3 | “Jewish rationalism influenced by Islamic philosophy” blurs kalām and falsafa and may imply direct dependence on al-Farabi. | Use: “Saadia argues in the Arabic kalām environment while reshaping Jewish scriptural and rabbinic materials. Parallels with Muʿtazilite theology are substantial but selective and disputed; do not encode al-Farabi as a direct influence without target-specific evidence.” | SEP §§1–3; Brody O-SAA-3 ch. 3. |
| SAA-4 | Four sources of knowledge can be paraphrased too loosely. | Name them consistently: sense perception; necessary/first rational knowledge; inferential knowledge; reliable report or tradition. Explain that report is not sheer deference: its warrant is connected with public signs, transmission, and coherence with the other sources. | *Beliefs and Opinions*, Introduction; SEP §2. |
| SAA-5 | Exact exegesis rules risk being invented from a schematic secondary summary. | State the safe claim: “Literal meaning is the default, but a reading may be rejected when it conflicts with sense, reason, another scriptural passage, or reliable tradition.” Cite the relevant scholarly edition/commentary; do not invent examples or page numbers. | *Beliefs and Opinions*, Introduction; SEP §§2–3. |

## Paragraph evidence map

| Canonical section | ¶1 | ¶2 | Primary locator(s) | Secondary control |
|---|---|---|---|---|
| Overview | Retain Gaon, translator, exegete, theologian | Revise generic “reason and revelation” into SAA-3/4 | *Beliefs and Opinions*, Introduction | O-SAA-1 §§1–3 |
| Historical context | Retain Abbasid/Judeo-Arabic setting | Retain rabbinic/Karaite controversy without making all work reactive | Polemical/exegetical corpus | O-SAA-1 §1; O-SAA-3 |
| Ways of knowing | Apply exact fourfold vocabulary under SAA-4 | Retain mutually supportive reason/report with warrant qualification | *Beliefs and Opinions*, Introduction | O-SAA-1 §2 |
| Scripture and language | Apply safe interpretive rule under SAA-5 | Retain Hebrew philology/translation and add named works | *Tafsir* and *Agron*; *Beliefs*, Introduction | O-SAA-1 §§1–3 |
| Creation and unity | Retain creation ex nihilo arguments as Saadia’s arguments, not settled demonstrations | Retain unity/attribute interpretation with anti-corporeal qualification | *Beliefs* I–II | O-SAA-1 §§5–7 |
| Law and commandment | Replace utility generalization under SAA-1 | Retain reason/revelation complementarity with rational/heard distinction | *Beliefs* III | O-SAA-1 §§3–4 |
| Soul and afterlife | Replace generic psychology under SAA-2 | Retain resurrection and justice within Saadia’s theological system | *Beliefs* VI–IX | O-SAA-1 §9 |
| Key works | Add *Agron*, *Tafsir*, *Siddur*, *Sefer Yetzirah* commentary | Retain *Beliefs and Opinions* as systematic culmination without “first” superlative | Works named | O-SAA-1 §1; O-SAA-3 |
| Influence and reception | Retain importance for later Jewish thought | Qualify paths to Halevi/Maimonides as reception/context, not automatic direct influence | Later reception | O-SAA-1 conclusion/bibliography |
| Controversies | Apply SAA-3 to Muʿtazilite relation | Retain reason/revelation and exegesis disputes | *Beliefs* Introduction, I–III | O-SAA-1 §§2–4 |
| Beginner synthesis | Retain four-source architecture | Revise law/soul summary under SAA-1/2 | *Beliefs* Introduction, III, VI–IX | O-SAA-1 |

## Structured-data proposals

- Keep conventional 882–942 with medium/high confidence; preserve Egypt/Babylonia rather than one modern nation label.
- Summary: “A Gaon, exegete, translator, and kalām theologian who organized sense, reason, inference, and reliable tradition within a Jewish account of creation, law, and redemption.”
- Ideas: four sources of knowledge; reason and reliable report; creation ex nihilo; divine unity and attributes; rational and revealed commandments; embodied soul and resurrection; scriptural interpretation.
- Works: *Book of Beliefs and Opinions*, *Tafsir*, *Agron*, *Siddur*, commentary on *Sefer Yetzirah*.
- Branches: philosophy of religion `major`; epistemology, philosophy of language, ethics, and metaphysics `substantial`; kalām as context/tradition if the taxonomy permits.
- Relationships: rabbinic and scriptural traditions plus Arabic kalām; later Jewish reception by Halevi and Maimonides stated broadly. Exclude al-Farabi as a direct edge unless sourced.
- Search concepts: Saadya/Saadia, Gaon, Judeo-Arabic, kalam/kalām, four sources of knowledge, reliable report, Tafsir, Agron, rational and revealed commandments, creation, resurrection.

### Reuse-surface audit

- No independent target-specific timeline, relationship-depth, wall-chart landmark, or learning-path claim was found beyond generic/profile reading data.
- Compare/profile render canonical fields; any later Saadia→Halevi/Maimonides edge must be evidence-specific rather than inferred from chronology. Generated search should be compiler-refreshed after SAA-1–SAA-5.

## Museum reconciliation

The primary Museum interpretation is mechanically article-derived and must be reconciled separately to SAA-1–SAA-5. The `saadia-beliefs-opinions` exhibit may retain `c. 933`, Judeo-Arabic context, and four knowledge modes, but should use the exact epistemic labels, identify the work as kalām, and add *Beliefs and Opinions*, Introduction and treatises I–III/VI–IX as locators. Do not imply a simple Greek-philosophy-to-Judaism pipeline. Article review never automatically locks either Museum surface.

## Source register

| ID | Durable source and locator | Use |
|---|---|---|
| P-SAA-1 | Saadia, *Book of Beliefs and Opinions*, Introduction; treatises I–III, VI–IX; [public Arabic edition](https://archive.org/details/kitbalamnt00saaduoft) | Knowledge, creation, attributes, law, soul, resurrection |
| P-SAA-2 | Charles H. Manekin, trans., selections from Saadia in *Medieval Jewish Philosophical Writings*, [DOI](https://doi.org/10.1017/CBO9780511811067.005), pp. 1–22 | Reliable translated primary selections |
| O-SAA-1 | [SEP, “Saadya [Saadiah]”](https://plato.stanford.edu/entries/saadya/), §§1–9 | Current scholarly control |
| O-SAA-2 | Sarah Stroumsa, *Saadya and Jewish Kalām* — bibliographic lead/background only; edition and durable URL not yet verified, so omit from the registry | Kalām context and categories; SAA-3 remains covered by O-SAA-1/O-SAA-3 |
| O-SAA-3 | Robert Brody, “Saʿadyah the Philosopher,” in *Saʿadyah Gaon*, [Cambridge Core](https://www.cambridge.org/core/books/abs/saadyah-gaon/saadyah-the-philosopher/3E5B663BE33867BCDE964BF74C8B7DB6) | Intellectual context and disputed affiliations |

## Residual uncertainty and lock gate

The degree of Muʿtazilite dependence, precise dating of some works, and some reconstructions of Saadia’s exegesis remain disputed. Treat transliterated Arabic terms consistently and do not manufacture page locators where work/treatise divisions are durable. Required integration count: **5 exact corrections**, **22/22 article paragraphs mapped**, **6 structured/reuse groups**, and **2 Museum surfaces reconciled**.
## Final integration certification

Canonical ID: `saadia-gaon`. Formal review lock: `fnv1a64:1471b3f908bb1d59`. The research-stage no-lock language above is superseded after canonical and Museum reconciliation.
