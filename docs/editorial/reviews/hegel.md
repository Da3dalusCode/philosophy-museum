# Hegel claim-review dossier

- Canonical ID: `hegel`
- Visitor route: `#/philosophers/hegel`
- Review date and status: 2026-08-03; `claim-reviewed`
- Stored review lock: `fnv1a64:64440047f4813d8f`
- Coverage: 24 sections; 51 citation-bearing paragraphs; 17 structured claim groups; 120 citation references
- Evidence: 8 registered and cited sources; every paragraph and structured claim mapped in `modernGermanIdealistReactionsEditorial.ts`
- Article depth: 4,111 final substantive words; thinker flagship target met

## Review method and boundary

The full canonical record was reviewed against Hegel’s lifetime-published *Phenomenology of Spirit*, *Science of Logic*, *Encyclopedia* outline, and *Elements of the Philosophy of Right*; Paul Redding’s SEP overview; Julie Maybee’s focused SEP account of dialectic; the *Cambridge Companion to Hegel and Nineteenth-Century Philosophy*; and Daniel James and Franz Knappik’s recent *Hegel and Colonialism*. The review separately checked textual authority for posthumous lecture volumes, dialectical method, lordship and bondage, institutional and political claims, art and religion, gender, race, colonialism, influence, and the difference between Hegel and later Hegelian schools.

The stored lock covers the integrated canonical article and structured record. It does not silently cover independent Museum prose; Museum primary and supplemental interpretation, assets, plaques, assignments, routes, and derived surfaces were inspected as a separate boundary below.

## Source and locator coverage

- `hegel-sep`: sections 1–3 for life, work, mature philosophy, major interpretations, and legacy.
- `hegel-dialectics-sep`: sections 1–4 for immanent dialectical development and the history of the method; used to reject the textbook three-step formula.
- `hegel-companion`: chapters 1–15 for life, Phenomenology, lordship/bondage, logic, idealism, social philosophy, religion, nature, life, and aesthetics.
- `hegel-colonialism`: sections 2–6 for slavery, race, colonialism, civil society, “civilized nations,” and lecture/published-text relationships.
- `hegel-phenomenology`: Preface, Introduction, Consciousness, Self-Consciousness, Reason, Spirit, Religion, and Absolute Knowing; the lordship-and-bondage and conscience/forgiveness divisions receive precise standard-division locators.
- `hegel-logic`: doctrines of Being, Essence, and Concept, including the opening transition, contradiction, actuality, life, cognition, and the idea.
- `hegel-encyclopedia`: published system outline and paragraph divisions; editorial additions and separate lecture evidence are not silently assigned Hegel-authored status.
- `hegel-right`: §§34–360, with focused locators for morality, family, civil society, poverty and colonization, state, international right, and world history.

The paragraph map is section-specific in the module. Structured mappings cover classification; secure dates and the changing authority of lecture records; contribution and biography; context; central problem; status-qualified branches; ideas, works, life events, and development; received and later influence; disputes and misunderstandings; branch contributions; and staged reading paths.

## Corrections, qualifications, and disputes preserved

- Dialectic is described as immanent testing and development of determinations, not a universal thesis–antithesis–synthesis mechanism.
- The *Phenomenology* is an education of consciousness that expands into social and historical spirit, not a catalogue of mental states or a simple preface to the later system.
- “Lordship and bondage” identifies Hegel’s compact passage. “Master–slave dialectic” is marked as a later reception label. Marxist, existential, anticolonial, feminist, and recognition-theory transformations are not projected unchanged into the 1807 text.
- The Haitian Revolution belongs to the revolutionary Atlantic context. The Buck-Morss connection remains important and disputed; no direct textual dependence is asserted as settled.
- The *Science of Logic* is not reduced either to formal logic or cosmic word-magic. Metaphysical, non-metaphysical, conceptual-realist, and post-Kantian readings remain live disputes.
- Nature and subjective spirit include embodiment, habit, feeling, language, and will. Obsolete scientific claims and racialized anthropology are not defended as deductions from philosophy.
- Freedom is explained through abstract right, morality, family, civil society, and political institutions. Hegel’s rational state is not whatever government exists, but the article does not remake him into a present-day progressive democrat: monarchy, estates, bureaucracy, restricted participation, and the unresolved poverty/rabble problem remain visible.
- Hegel’s explicit assignment of women to family life and men to civil society/state is identified as hierarchical and inconsistent with the universality of developed freedom. Reconstructive feminist uses are distinguished from Hegel’s text.
- World history is presented as an account of developing freedom and criticized for Eurocentric sequence, racialized exclusions, and colonial hierarchy. Racism and colonialism are not treated as detachable personal remarks, and the whole system is not reduced to them.
- Art’s “pastness” does not mean artworks cease. The familiar “end of art” slogan is treated as a disputed reading of art’s highest vocation.
- Christianity’s systematic privilege and the global hierarchy of the religion lectures remain explicit. Orthodox, heterodox, secularizing, and philosophical-theological interpretations are not collapsed.
- Familiar volumes on art, religion, world history, and history of philosophy are identified as posthumous lecture constructions whose course and witnesses matter.
- Right/Center/Left Hegelianism, Marx, Kierkegaard, Kojève, Fanon, critical theory, and contemporary recognition theory belong to reception history, not to Hegel’s direct doctrine.

The final prose retains no unsupported exact quotation. “The rational is actual” and the Napoleon “world spirit on horseback” tradition are handled only through qualified paraphrase; the Museum asset note correctly identifies Hegel’s documented “world-soul” wording and rejects the popular phrase as exact quotation.

## Uncertainty audit

- **System:** disputes over metaphysical and non-metaphysical readings cannot responsibly be resolved in one label.
- **Method:** the necessity and scope of dialectical transitions remain contested even after rejecting the three-step cartoon.
- **Recognition:** the role of recognition across Hegel’s system is larger than the lordship/bondage episode, and later theories transform it.
- **Political judgment:** Hegel is neither straightforward state worshiper nor modern democrat; the normative and historical relation to Prussia remains debated.
- **Haiti:** contextual relevance is strong; direct source dependence and its extent remain disputed.
- **Race and colonialism:** textual layers and development require care, but the evidence does not permit treating them as harmless marginalia.
- **Religion:** Christian and philosophical content supports incompatible readings of God, incarnation, community, and conceptual knowledge.
- **Lecture archives:** posthumous composites remain indispensable and must be cited with course/editorial awareness.

## Entity-complete surface inventory and integration recommendations

### Canonical and structured data

- `src/data/philosophers.ts`, tuple `hegel`: the current seed makes dialectic and recognition slogans and lists both German Idealism and continental philosophy as primary. Register the proposed override so German Idealism is primary, continental philosophy is a retrospective precursor relation, and logic, right, art, religion, mind, nature, history, and disputed institutions are represented.
- `src/data/contentDepth.ts`, record `hegel`: materially shallow. The override supplies full development, influences, legacy, and tensions.
- `src/data/philosopherCompletionDepth.ts`, record `hegel`: currently only two bibliography links. Supersede with mapped sources, works, chronology, terminology, and reading paths.
- `src/data/postKantianNineteenthArticles.ts`, record `hegel`: preserves its 12 baseline sections; the module inserts 12 flagship sections before reading strategy, producing 4,111 words.
- `docs/editorial/flagship-program.json`, record `hegel`: preserve the approved 4,000-word target and roster.
- `src/data/canonicalArticles.ts` and philosopher registry composition: registration only; no schema or architecture change recommended.

### Museum primary, supplemental, object, and plaque surfaces

- `src/data/museum/museumCanonicalProgram.ts`, primary exhibit `german-idealism-afterlives / german-idealism-hegel / hegel`: assignment, anchor tier, question, secondary route, and Schlesinger asset are accurate. Preserve. `displayName` remains program metadata; the plaque must continue to derive exact canonical title `Hegel`.
- `src/data/museum/museumInterpretations.ts`, `MUSEUM_DEEP_ARTICLE_ENTITY_IDS` entry `hegel`: article recomposition is in scope for reconciliation. After the new 24-section article lands, ensure the 250–400-word Museum sequence includes logic/system, recognition/social freedom, and one candid limitations paragraph rather than selecting only Phenomenology/history material.
- `src/data/museum/germanIdealismGalleryCuration.ts`, room `german-idealism-hegel`: sign correctly rejects a mechanical three-step formula and foregrounds institution; preserve architecture and geometry.
- `src/data/museum/germanIdealismSupplementalExhibits.ts`, records `hegel-lecture-room`, `hegel-napoleon-jena`, `hegel-birthplace-stuttgart`, `hegel-berlin-institution`, and `hegel-haiti-recognition-debate`: inspected. Their cautions correctly distinguish a contemporary image from transcript, a 1895 Napoleon scene from eyewitness evidence, a modern birthplace from historical reconstruction, a later university print from Hegel’s exact institution, and the Haiti thesis from settled direct dependence. No material rewrite recommended.
- The same file’s `afterlives-young-hegelians`, `afterlives-feuerbach`, and `afterlives-strauss` are semantically related. Their current copy correctly distinguishes satire, heterogeneous later schools, and non-inevitable secularization. Preserve.
- `src/data/museum/germanIdealismGalleryAssets.ts`: Schlesinger portrait, Kugler lecture image, later Napoleon illustration, Hegelhaus photograph, Berlin institution print, Crête-à-Pierrot image, and afterlife assets have responsible identification, provenance, rights, limitations, and alt text. The Haiti image note’s “significant but disputed” language matches the canonical review.
- Supplemental factual titles and invitations are materially compliant. Preserve `Hegel Lecturing`, `Hegel and Napoleon`, `Hegel House, Stuttgart`, `Hegel’s Berlin Institution`, and `Hegel and the Haitian Question` unless the plaque audit identifies length—not accuracy—pressure.
- `docs/museum-asset-provenance.md`: no Hegel asset defect found and no asset change is proposed.

### Search, directory, Compare, wall, timeline, map, paths, relationships, and routes

- `src/components/Compare/CompareMode.tsx`: derived from contribution, ideas, and beginner explanation. The structured override materially corrects Compare; no bespoke component copy is needed.
- `src/components/PhilosopherProfile/PhilosopherProfile.tsx`: directory search and profile surfaces derive from the canonical record. New terms make logic, institution, art, religion, race, colonialism, and lecture status inspectable.
- `src/data/searchIndex.ts` and `src/data/generated/searchIndex.json`: derived and regenerated through the authoritative compiler.
- `src/data/routeManifest.ts` and `src/data/generated/routeManifest.json`: canonical philosopher, primary exhibit, and five supplemental exhibit routes exist. Refresh through the compiler only.
- `src/data/timelineEvents.ts`, event `hegel-dialectic` (1807): materially shallow and overstates “historical dialectic.” Recommended replacement: identify publication of the *Phenomenology*, shapes of consciousness testing their standards, recognition/lordship-bondage as one moment, and historical spirit without implying that the work contains Hegel’s whole later system.
- `src/data/timelineEvents.ts`, event `german-idealism` (1790): revise only if the batch already touches it; avoid a linear sequence whose endpoint is Hegel.
- `src/data/wallChart.ts`, work `spirit`: current text in the inspected worktree already rejects thesis–antithesis–synthesis and accurately describes the developmental argument. Preserve. The German Idealism band and Hegel lifetime placement are accurate.
- `src/data/relationships.ts`: no explicit Hegel edges were found. Add only material edges supported by the reviewed record: Schelling overlaps/disagrees with Hegel; Hegel influences Marx; Kierkegaard reacts against a Hegelian system as he understood it; later continental philosophy is reception, not primary membership. Use the existing relation vocabulary and do not imply one-way total dependence.
- `src/data/learningPaths.ts`: no Hegel-focused path currently exists. Do not force him into a path merely for completeness. A future German Idealism/system path would be appropriate; the politics path could include him only if institutional freedom and its exclusions are substantively added.
- Philosophy Wall/Map drawers derive contribution, ideas, works, and branch membership from the canonical record, so the patch corrects their summaries. Explicit influence-line changes require the relationship step above.

### Assignment, masterplan, fixed contracts, and triage

- `docs/museum-masterplan/philosopher-assignments.csv`, row `hegel`; `docs/museum-masterplan/hall-program.json`, room `german-idealism-hegel`; `docs/museum-masterplan/single-level-building-plan.json`; and `src/data/museum/germanIdealismGalleryCuration.ts`: primary home, anchor tier, secondary route, record capacity, and geometry are correct. Preserve.
- `docs/museum-masterplan/exhibit-wall-standard.md`: preserve Gallery 19’s 24 installations, 6-per-room structure, and zero text-dominant/isolated-book result.
- `docs/editorial/editorial-coverage-report.md`: bibliography-only status, 1,808 words, and current risk signals become stale. Regenerate only through the reporter.
- `docs/editorial/article-depth-inventory.*`: authoritative regeneration records 4,111 words and flagship-complete status.
- `docs/content-roadmap.md`: Hegel remains named backlog until reports refresh; no manual target-specific prose change required.

## Residual risk and acceptance conditions

Accepted after integrated flagship rereading, Museum reconciliation, material timeline and relationship corrections, deterministic lock verification, and the owner-required focused gates. The highest residual risks are exact lecture-text attribution, adequate representation of the Logic rather than Phenomenology alone, the political state/democracy false binary, the Haiti inference, and under-integrating gender/race/colonialism into evaluation of universal freedom.
