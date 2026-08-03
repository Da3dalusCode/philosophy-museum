# Philosophy of Mind claim-review dossier

- Canonical ID: `philosophy-of-mind`
- Visitor route: `#/branches/philosophy-of-mind`
- Editorial payload: `src/data/editorial/coreFieldsEntityCompleteEditorial.ts`
- Review date: 2026-08-03
- Effective status: `claim-reviewed`
- Review lock: `fnv1a64:f8b12a3aa2f779e6`
- Coverage: 21 sections; 55 citation-bearing paragraphs; 19 structured-claim groups; 173 citation references
- Evidence: 19 registered sources (15 specialist references and 4 primary/journal anchors); all paragraphs and structured groups have inspectable locators
- Article depth: 5,108 substantive prose words, excluding structured facts and source metadata; field flagship target met

## Method and boundary

This comprehensive review treats consciousness as one problem family within philosophy of mind, not the entire field. Separate sections cover the modern field's construction; concepts and method; conscious experience; intentionality and content; perception and action; dualism and other metaphysical options; physicalism; behaviorism, identity, functionalism, and computational approaches; causal exclusion; embodiment, enaction, and extension; emotion; selfhood and personhood; social cognition; other animals; psychopathology and neurodiversity; Buddhist and classical Indian debates; Chinese heart-mind traditions; artificial systems; ethics and power; and a staged reading route.

The review covers the canonical branch article and rendered branch facts. It does not transfer reviewed status to Descartes, James, Nagel, Clark and Chalmers, Buddhist schools, Chinese traditions, AI systems, neuroscience claims, or Museum object interpretations. Empirical examples are used to frame philosophical inference, not to announce unsettled scientific results as facts.

## Evidence and locator map

| Claim family | Main evidence and inspectable locators |
| --- | --- |
| Consciousness and explanatory targets | SEP, *Consciousness*, §§1–7; Nagel, “What Is It Like to Be a Bat?”, full article |
| Intentionality and representation | SEP, *Intentionality*, §§1–8 |
| Dualism and physicalism | SEP, *Dualism*, §§1–4; SEP, *Physicalism*, §§1–5; Descartes, *Meditations* II and VI |
| Behaviorism, functionalism, elimination | SEP, *Behaviorism*, §§1–5; SEP, *Functionalism*, §§1–5; SEP, *Eliminative Materialism*, §§1–4 |
| Mental causation | SEP, *Mental Causation*, §§1–5 |
| Embodied/extended cognition | SEP, *Embodied Cognition*, §§1–5; Clark and Chalmers, “The Extended Mind,” §§1–5 |
| Self and stream of thought | SEP, *Self-Consciousness*, §§1–7; James, *Principles of Psychology*, chapters IX–XII |
| Animal minds | SEP, *Animal Cognition*, §§1–8 |
| Indian Buddhist and classical Indian positions | SEP, *Mind in Indian Buddhist Philosophy*, §§1–6; SEP, *Personhood in Classical Indian Philosophy*, §§1–7 |
| Chinese heart-mind | SEP, *Mind (Heart-Mind) in Chinese Philosophy*, §§1–7 |
| AI distinctions | SEP, *Artificial Intelligence*, §§1–7; no inference from fluent output to consciousness |

The structured registry maps classification, date caveat, origin, summary, purpose, questions, history, terminology, 13 concepts, classifications, relationships, 20 figures/traditions, chronology, 20 works, disputes, misconceptions, applications, and reading sequence.

## Corrections and qualifications

- The field is not dated to 1641 as though reflection on mind began with Descartes. That date is a landmark in one early-modern European reconstruction of the problem.
- “Mind-body problem” is not treated as one timeless question with only Cartesian dualism and reductive physicalism as answers.
- Consciousness, wakefulness, access, phenomenal character, self-consciousness, and reportability are kept distinct.
- Intentionality means directedness or aboutness, not merely conscious intention. Mental content and phenomenal character may overlap without being identical.
- Substance, property, predicate, and hylomorphic dualisms are distinguished. Physicalism is not equated with crude identity theory or the denial of psychology.
- Methodological, psychological, and analytic behaviorisms are distinguished. Functionalism is not automatically computationalism, and multiple realization is an argument family rather than a settled proof.
- Eliminativism is described as selective or revisionary in many forms, not as the cartoon claim that nothing mental exists.
- Embodied, embedded, enactive, and extended approaches are related programs with internal disagreements, not one “4E theory.” Clark and Chalmers' parity-style argument is presented as contestable.
- A causal-exclusion problem is not itself empirical disproof of mental causation. Realization, intervention, agency, and explanatory levels remain live options.
- Emotion and cognition are not treated as mutually exclusive faculties. Social and affective dimensions of mind are not relegated to optional applications.
- “Self,” “person,” “subject,” first-person perspective, bodily ownership, and narrative identity are not used interchangeably.
- Buddhist no-self positions are plural and are not Western materialism. Classical Indian traditions disagree sharply over enduring self, consciousness, personhood, and liberation.
- Chinese *xin* is rendered “heart-mind” to resist importing a Cartesian inner-substance model; cultivation, affect, body, relation, and political agency remain visible.
- Animal cognition is handled with comparative-method cautions against both anthropomorphism and anthropodenial.
- Psychiatric and neurodiversity examples do not reduce persons to deficits or make philosophical conclusions follow directly from diagnostic categories.
- Current AI fluency is not evidence sufficient to establish consciousness, understanding, agency, or moral status. Behavioral, architectural, functional, phenomenal, and ethical questions are kept separate.
- First-person testimony, third-person measurement, social power, and conceptual framing are treated as mutually constraining sources of evidence.

## Disputes and residual uncertainty

Open disputes include the relation between consciousness and representation; whether phenomenal character is physical, functional, representational, primitive, or illusory; causal exclusion; the individuation of content; the boundaries of cognition; enactive and predictive accounts; self-representation and no-self positions; animal concepts and consciousness; the normative status of psychiatric categories; and the conditions under which an artificial system could be a subject. The payload deliberately avoids claiming that neuroscience or AI research has resolved these philosophical disputes.

The source set is broad across specialist topics but SEP-heavy. Primary anchors are used narrowly: Descartes for the Meditations' arguments, James for stream/attention/habit/self, Nagel for subjective character, and Clark/Chalmers for active externalism. None is treated as the field's final taxonomy.

## Surface reconciliation inventory

| Surface | Record/file | Finding and required action |
| --- | --- | --- |
| Canonical registry | `src/data/branches.ts` | Overlay is registered after existing depth overlays; effective record and stored lock were verified. |
| Existing depth | `src/data/philosophyMindBranchDepth.ts`, `src/data/contentDepth.ts` | Supersede existing survey, concept list, works, and reading steps with the comprehensive payload. |
| Museum primary | `src/data/museum/museumCanonicalProgram.ts` (`philosophy-of-mind`) | Preserve Core Questions Forum placement, historically cautious question, routes, and primary asset. |
| Museum asset | `src/data/museum/coreQuestionsForumAssets.ts` (`philosophy-mind-subjective-objective-interpretive`) | Preserve generated provenance and explicit neutrality among dualism, physicalism, and idealism. |
| Museum compact copy | `src/data/museum/museumInterpretations.ts` and concise/fallback path | Reconcile any derived copy with the article's consciousness/content/self distinctions. Keep object interpretation outside the article lock. |
| Search/directory | canonical consumers; `src/data/generated/searchIndex.json` | Regenerate. Ensure visible-name indexing reaches consciousness, intentionality, mental causation, embodiment, emotion, self, animal cognition, heart-mind, and AI. |
| Compare | `src/components/Compare/CompareMode.tsx` | Generic Compare should inherit the new structured facts. Test long concept/work lists and do not truncate the comprehensive page into a dualism/physicalism card. |
| Big History/timeline | `src/data/timelineEvents.ts`, `src/data/wallChart.ts` | Existing Descartes, Conway, and Wittgenstein landmarks remain valid but do not represent a field origin. No fabricated start event or single mind band is required. |
| Relationship map | `src/data/relationships.ts` | Preserve overlap with Metaphysics. Add Epistemology and Phenomenology overlap only if those edges improve the readable genealogy and use existing semantic contracts. |
| Learning path | `src/data/learningPaths.ts` mind path | Material correction: the current two-step Descartes/Whitehead path is far too shallow. Expand to consciousness; intentionality/perception/action; embodiment/cognition; self/social/animal minds; and artificial-systems evidence, with cross-cultural cautions. |
| Routes | `src/data/generated/routeManifest.json` | Regenerate; do not hand-edit. |
| Assignment/masterplan | `docs/museum-masterplan/branch-assignments.csv`, hall and canonical program | Preserve Forum assignment and `core-mind-self` anchor. No geometry or asset-contract change. |
| Flagship/editorial governance | `docs/editorial/flagship-program.json`, depth batches | Philosophy of Mind remains a flagship; generated reports record its completed status. |
| Reports/triage | `docs/editorial/article-depth-inventory.*`, `docs/editorial/editorial-coverage-report.*` | Authoritative regeneration records the current review and flagship-complete depth. |

## Acceptance and residual risk

Accepted after overlay registration, deterministic lock verification, derived-artifact regeneration, learning-path expansion, Museum reconciliation without geometry changes, and the Level 2 claim-review plus shared gates. Residual risk remains in projecting a single vocabulary across historical and cross-cultural mind traditions or treating current AI performance as evidence of consciousness.
