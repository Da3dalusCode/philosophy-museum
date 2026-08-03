# Philosophy of Science claim-review dossier

- Canonical ID: `philosophy-of-science`
- Visitor route: `#/branches/philosophy-of-science`
- Editorial payload: `src/data/editorial/coreFieldsEntityCompleteEditorial.ts`
- Review date: 2026-08-03
- Effective status: `claim-reviewed`
- Review lock: `fnv1a64:5cdff89068223970`
- Coverage: 12 sections; 24 citation-bearing paragraphs; 19 structured-claim groups; 68 citation references
- Evidence: 14 registered sources (10 specialist references, 4 primary works); all paragraphs and structured groups carry inspectable locators
- Article depth: 2,191 substantive prose words, excluding structured facts and source metadata

## Method and boundary

The review replaces a “scientific method” capsule with an account of practices, observation, experiment, measurement, models, explanation, confirmation, induction, demarcation, realism, theory change, social organization, expertise, values, and responsibility. It treats philosophy of science as continuous with the history and practice of particular sciences while retaining normative questions about evidence and explanation. The canonical branch article and structured facts are inside scope. Bacon, Hume, Popper, Kuhn, the air-pump painting, and all linked science events retain separate review boundaries.

## Evidence and locator map

| Claim family | Main evidence and inspectable locators |
| --- | --- |
| Method plurality and history | SEP, *Scientific Method*, §§1–4; Bacon, *Novum Organum*, Book I, aphorisms 1–68 and Book II |
| Observation and instruments | SEP, *Theory and Observation in Science*, §§1–5 |
| Measurement and uncertainty | SEP, *Measurement in Science*, §§1–6 |
| Models and idealization | SEP, *Models in Science*, §§1–6 |
| Explanation | SEP, *Scientific Explanation*, §§1–6 |
| Confirmation and induction | SEP, *Confirmation*, §§1–6; Hume, *Enquiry*, §§IV–VII, X |
| Demarcation and testing | Popper, *Logic of Scientific Discovery*, chapters 1–5 and 10 |
| Realism and antirealism | SEP, *Scientific Realism*, §§1–5 |
| Theory change | SEP, *Thomas Kuhn*, §§2–5; Kuhn, *Structure*, §§II–XIII |
| Social institutions and values | SEP, *Social Dimensions of Scientific Knowledge*, §§1–6; SEP, *Feminist Perspectives on Science*, §§1–5 |

The structured registry separately maps classification, chronology, concepts, fields, relationships, figures, works, debates, misunderstandings, applications, and reading steps.

## Corrections and qualifications

- There is no single timeless “scientific method.” Observation, experiment, measurement, modeling, simulation, fieldwork, classification, historical inference, statistics, and engineering interventions have different evidential structures.
- Early-modern Europe is a major institutional and conceptual transformation, not the origin of systematic empirical inquiry. Greek, Chinese, South Asian, Islamic, African, Indigenous, and other knowledge traditions require specific histories rather than a prehistory label.
- Baconian induction is not modern statistical inference, and Bacon is not credited with inventing experimentation.
- Hume's induction problem is not answered merely by saying science works. Confirmation and prediction still require assumptions about relevance, stability, and background knowledge.
- Falsifiability is one influential demarcation proposal, not the definition of science; auxiliary assumptions and probabilistic claims complicate simple refutation stories.
- Observation can be theory-laden without becoming arbitrary. Instruments, calibration, data reuse, independent constraints, and criticism matter.
- Models can explain and explore precisely because they idealize; simplification is not automatically error or deception.
- Scientific realism has metaphysical, semantic, and epistemic dimensions. Instrumentalism, constructive empiricism, entity realism, and structural realism are not synonyms.
- Kuhnian paradigms and incommensurability are not presented as irrational mob psychology or as proof that truth is irrelevant.
- Social organization is epistemically constitutive through trust, testimony, peer criticism, funding, division of labor, and institutions. “Social” does not mean merely biased.
- Values can enter problem selection, standards of evidence, risk thresholds, and application without implying that evidence is whatever a community prefers.
- Indigenous and local knowledge should not be romanticized as a single worldview or evaluated only by resemblance to laboratory practice; epistemic injustice and extractive appropriation remain live concerns.
- The ethics of experiments, dual-use research, public health, environment, and uncertainty communication are part of responsible science, not external public-relations topics.

## Disputes and residual uncertainty

Open disputes include confirmation, Bayesian priors, explanation, causation, laws, idealization, realism, underdetermination, demarcation, reproducibility, testimony, value freedom, standpoint, expertise, progress, and cross-tradition comparison. The 1620 Bacon landmark is deliberately described as an early-modern publication anchor rather than the field's first year.

## Surface reconciliation inventory

| Surface | Record/file | Finding and required action |
| --- | --- | --- |
| Canonical registry | `src/data/branches.ts` | Overlay is registered after existing depth overlays; effective record and stored lock were verified. |
| Existing depth | `src/data/modernCoreBranchDepth.ts`, `src/data/contentDepth.ts` | Supersede shallow prose, concepts, works, and reading route. |
| Museum primary | `src/data/museum/museumCanonicalProgram.ts` (`philosophy-of-science`) | Preserve Forum placement, practice-centered question, routes, and primary asset. |
| Museum asset | `src/data/museum/coreQuestionsForumAssets.ts` (`science-air-pump-wright-1768`) | Preserve National Gallery provenance, public-domain metadata, non-documentary caution, and visible animal-ethics framing. |
| Museum supplemental | `src/data/museum/coreQuestionsForumSupplementalExhibits.ts` (`forum-avicenna-demonstration`) | Preserve record and geometry. It usefully resists a Bacon-only genealogy. |
| Museum compact sources | `src/data/museum/museumInterpretations.ts` | Current branch interpretation support appears too dependent on the SEP method entry alone. Reconcile compact copy against the registered explanation, models, measurement, social, and feminist sources without importing article-lock status. |
| Search/directory | canonical consumers; `src/data/generated/searchIndex.json` | Regenerate. Ensure method, measurement, model, explanation, confirmation, realism, Kuhn, values, and expertise are indexed. |
| Compare | `src/components/Compare/CompareMode.tsx` | Generic Compare should inherit the structured facts. Verify long lists and visible labels after registration. |
| Big History/timeline | `src/data/timelineEvents.ts`, `src/data/wallChart.ts` | Existing Galileo/Bacon/Hume/pragmatism events and the explicitly “new science” early-modern band are usable. Preserve the band's qualified scope; do not relabel it as the origin of science. |
| Relationship map | `src/data/relationships.ts` (`philosophy-of-science` from `epistemology`) | Material correction: replace `modern-descendant` with `overlaps-with`; the single descent edge overstates genealogy and understates metaphysics, logic, history, and practice. |
| Learning path | `src/data/learningPaths.ts` knowledge path | Preserve its broader epistemology purpose, but branch-specific rendering should use the new sequence through method, induction, testing, models, Kuhn, social organization, and values. |
| Routes | `src/data/generated/routeManifest.json` | Regenerate; do not hand-edit. |
| Assignment/masterplan | `docs/museum-masterplan/branch-assignments.csv`, hall and canonical program | Preserve Forum assignment and `core-science` anchor. No geometry or asset-contract changes. |
| Reports/triage | depth and coverage reports | Authoritative regeneration records the current review and passing depth. |

## Acceptance and residual risk

Accepted after overlay registration, deterministic lock verification, derived-artifact regeneration, relationship correction, broader Museum reconciliation, and Level 2 claim-review plus shared validation. Residual risk remains in flattening scientific plurality into one method or treating historical, feminist, social, and decolonial criticism as external to scientific reasoning.
