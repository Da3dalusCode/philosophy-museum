# Ontology claim-review dossier

- Canonical ID: `ontology`
- Visitor route: `#/branches/ontology`
- Editorial payload: `src/data/editorial/coreFieldsEntityCompleteEditorial.ts`
- Review date: 2026-08-03
- Effective status: `claim-reviewed`
- Review lock: `fnv1a64:f6fc3525c84fed79`
- Coverage: 10 sections; 23 citation-bearing paragraphs; 19 structured-claim groups; 54 citation references
- Evidence: 11 registered sources (7 specialist references, 4 primary texts); every article paragraph and structured group has inspectable locators
- Article depth: 2,189 substantive prose words, excluding structured facts and source metadata

## Method and boundary

This review replaces a short survey with an entity-complete account of existence, commitment, categories, identity, persistence, composition, process, modality, grounding, social ontology, metaontology, and globally responsible comparison. It distinguishes a discipline, an inventory, a category scheme, and a formal representation rather than using “ontology” for all four. The review covers the canonical branch article and its rendered structured facts. It does not confer reviewed status on Metaphysics, Aristotle, Nāgārjuna, Quine, Carnap, or any other linked record.

The Museum's primary object, generated interpretive image, supplemental exhibits, and concise wall text remain outside the deterministic article lock. They were inspected for contradiction, route integrity, provenance, and interpretive overreach. Their present placements and visual contracts should be preserved.

## Evidence and locator map

| Claim family | Main evidence and inspectable locators |
| --- | --- |
| Field boundary and uses of ontology | SEP, *Metaphysics*, §§1, 2.1–2.3, 4; SEP, *Logic and Ontology*, §3 |
| Commitment and quantification | SEP, *Logic and Ontology*, §4.1; Quine, *On What There Is* |
| Categories, substance, actuality, potentiality | SEP, *Categories*, §§1–3, 5; Aristotle, *Metaphysics* Ζ–Θ |
| Grounding, modality, dependence | SEP, *Metaphysical Grounding*, §§1–4; SEP, *Metaphysics*, §3.1 |
| Social entities and construction | SEP, *Social Ontology*, §§2–5 |
| Buddhist and Chinese comparisons | SEP, *Nāgārjuna*, §§2–3; SEP, *Metaphysics in Chinese Philosophy*, §§1–3, 6; *Daodejing*, chapters 1, 2, 11, 25, 40 |
| Frameworks and metaontology | Carnap, “Internal and external questions”; Quine, *On What There Is*; SEP, *Logic and Ontology*, §§3.1–3.2, 4.4–4.6 |

The structured-claim registry separately maps classification, date anchor, origin, summary, purpose, questions, history, terminology, concepts, subfields, relationships, figures, chronology, works, debates, misunderstandings, applications, and reading path. Primary locators are stable divisions where pagination varies.

## Corrections and qualifications

- Ontology and metaphysics overlap, but “ontology is a sub-branch of metaphysics” is not a neutral universal classification. The payload uses `overlap` and explicitly records the contested boundary.
- The early-modern coinage of *ontologia* is a terminology landmark, not the origin of inquiry into being. Greek, Sanskrit, Buddhist, Chinese, and Islamic projects retain their own vocabularies and purposes.
- Existence is not silently equated with reality, actuality, or fundamentality.
- Quine's criterion diagnoses commitment in a regimented theory; it is not presented as proof that first-order notation transparently reads reality.
- Reduction, dependence, construction, elimination, and unreality are kept distinct.
- Nāgārjuna's emptiness is not nihilism or a hidden substance. Chinese *you/wu*, *qi*, *li*, and *dao* are not declared equivalents of European being, matter, form, or process.
- Comparative similarity is separated from documented influence. Islamic philosophers are not treated as a transmission bridge whose value lies only in anticipating later Europe.
- Social categories can be constructed and causally real. Ontological description and political endorsement are not collapsed.
- Metaontological pluralism does not imply that every apparent disagreement is merely verbal.

## Disputes and residual uncertainty

Open disputes include the ontology/metaphysics boundary; whether existence is univocal; realism about universals, properties, possible worlds, grounding, and social groups; criteria of composition and persistence; the relation between ordinary and fundamental objects; and whether some ontological disputes are substantive or framework-relative. Approximate chronology is intentional because a single global “start year” would fabricate precision.

Source coverage is authoritative but concentrated in SEP for secondary synthesis. The payload therefore declares one minimum secondary domain, uses four independently hosted primary anchors, and does not pretend to have a two-domain specialist consensus where none was registered.

## Surface reconciliation inventory

| Surface | Record/file | Finding and required action |
| --- | --- | --- |
| Canonical registry | `src/data/branches.ts` | Overlay is registered after existing depth overlays; effective record and stored lock were verified. |
| Existing depth | `src/data/ontologyBranchDepth.ts`, `src/data/contentDepth.ts` | The new payload supersedes shallow prose, concepts, works, and generic reading steps. Preserve unrelated branch content. |
| Museum primary | `src/data/museum/museumCanonicalProgram.ts` (`ontology`) | Preserve Core Questions Forum placement, “no single origin” wording, routes, and asset contract. |
| Museum asset | `src/data/museum/coreQuestionsForumAssets.ts` (`ontology-being-process-interpretive`) | Preserve. The generated-image provenance and warning against privileging substance or process are accurate. |
| Museum supplemental | `src/data/museum/coreQuestionsForumSupplementalExhibits.ts` (`forum-mulla-sadra-existence`) | Preserve exhibit and geometry. Its parent is `metaphysics`; ontology is a semantic route, not a reason to alter the fixed assignment. |
| Museum compact copy | `src/data/museum/museumInterpretations.ts` and concise/fallback interpretation path | Reconcile derived copy against the registered article; do not duplicate a new primary interpretation merely to restate it. |
| Search/directory | canonical branch consumers; `src/data/generated/searchIndex.json` | Directory should update from the effective branch. Regenerate search output; never hand-edit the generated index. |
| Compare | `src/components/Compare/CompareMode.tsx` and canonical branch selector | Generic Compare should inherit the new structured facts. No ontology-specific preset is required. |
| Big History/timeline | `src/data/timelineEvents.ts`, `src/data/wallChart.ts` | Existing Aristotle and Heidegger landmarks remain valid. The wall's ontology/metaphysics treatment should not imply one origin. No fabricated origin event is recommended. |
| Relationship map | `src/data/relationships.ts` (`ontology` → `metaphysics`) | Material correction: replace rigid `sub-branch-of` with `overlaps-with` or another explicitly contested relation. |
| Learning paths | `src/data/learningPaths.ts` metaphysics path | Preserve the route, but use the new reading sequence when branch-specific copy is rendered; do not present Aristotle-to-Heidegger as the field's only genealogy. |
| Routes | `src/data/generated/routeManifest.json` | Regenerate after registration; do not hand-edit. |
| Assignment/masterplan | `docs/museum-masterplan/branch-assignments.csv`, hall program, canonical program | Preserve fixed Forum assignment and `core-reality-being` anchor. No geometry or contract change. |
| Editorial reports/triage | `docs/editorial/article-depth-inventory.*`, `docs/editorial/editorial-coverage-report.*` | Authoritative regeneration records the current review and passing depth. |

## Acceptance and residual risk

Accepted after overlay registration, effective-record inspection, relationship correction, deterministic lock verification, derived-artifact regeneration, and the Level 2 claim-review and shared validation gates. Residual risk remains in cross-tradition comparison and in presenting disputed metaontological positions without a false field consensus.
