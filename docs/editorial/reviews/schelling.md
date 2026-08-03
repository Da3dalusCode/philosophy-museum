# Schelling claim-review dossier

- Canonical ID: `schelling`
- Visitor route: `#/philosophers/schelling`
- Review date and status: 2026-08-03; `claim-reviewed`
- Stored review lock: `fnv1a64:6443b88ff19d4ab3`
- Coverage: 13 sections; 26 citation-bearing paragraphs; 17 structured claim groups; 64 citation references
- Evidence: 7 registered and cited sources; every paragraph and structured claim mapped in `modernGermanIdealistReactionsEditorial.ts`
- Article depth: 2,175 final substantive words

## Review method and boundary

The canonical article and every claim-bearing structured field were reread against Andrew Bowie’s specialist SEP account, the 2017 *Cambridge Companion to German Idealism*, and primary editions of the 1799 *First Outline*, 1800 *System of Transcendental Idealism*, 1809 Freedom Essay, an identified *Ages of the World* draft, and the posthumously edited Berlin lectures on positive philosophy. The review checked dates, phase transitions, work and lecture status, attribution, later labels, influence language, claims about science, and theological and political qualifications. No AI-generated text was treated as evidence.

The stored lock covers the integrated canonical article and structured record. It does not claim that the separate Museum interpretation is covered; Museum copy and supplemental surfaces were inspected as a separate entity-complete boundary below.

## Source and locator coverage

- `schelling-sep`: sections 1–5 for career, changing systems, Naturphilosophie, identity, Ages, and positive philosophy.
- `schelling-companion`: chapters 7, 8, 12, 14, 15, and 16 for early Schelling, chemistry and nature, organism, politics, arts, and reception.
- `schelling-nature`: Foreword, “Outline of the Whole,” and divisions I–III of the 1799 *First Outline*.
- `schelling-system`: Introduction, epochs I–IV, and conclusion on art in the 1800 *System*.
- `schelling-freedom`: the 1809 essay’s distinctions of ground/existence, freedom for good and evil, personality, and love.
- `schelling-ages`: editor’s introduction and the identified surviving draft; cited as an unfinished draft, never as a final lifetime book.
- `schelling-positive`: editorial introduction and Berlin lectures on negative and positive philosophy; cited as posthumously edited lecture material.

The paragraph map is stored section-by-section in the module. Structured mappings cover classification, dates and dating note, contribution, short biography, context, central problem, branches and status-qualified memberships, ideas and works, biography and chronology, explanation, received and later influence, detailed ideas and works, development and disputes, branch contributions, and reading paths.

## Corrections, qualifications, and disputes preserved

- The canonical record now distinguishes early post-Fichtean work, philosophy of nature, transcendental idealism, identity philosophy, the Freedom Essay, the multiply drafted Ages project, and late positive philosophy. They are related phases, not one unchanged doctrine and not a simple ladder culminating in Hegel.
- Nature is productive and dynamically organized in the early philosophy, but the article does not present speculative constructions as experimental findings or direct anticipations of modern biology, physics, ecology, or systems theory.
- Art’s role belongs principally to the 1800 transcendental system and related aesthetics; it is not used as a timeless key to every phase.
- The 1809 account of freedom makes evil a real possibility and distinguishes ground from existence in God. The ground is not described as an independent evil deity, and disputes over divine goodness and necessity remain open.
- *The Ages of the World* is identified as unfinished and multiply drafted. The late mythology, revelation, and positive-philosophy materials are identified as lecture and posthumous archives rather than finished books Schelling published.
- Positive philosophy limits what conceptual necessity can deduce; it is not summarized as abandonment of reason for mystical authority.
- Mythology is treated as a historical process in Schelling’s framework while its Christian hierarchy and Eurocentrism remain explicit.
- “German Romantic,” “irrationalist,” “mystic,” and “proto-ecologist” are treated as later or partial classifications, not Schelling’s own stable identity or full doctrine.
- Political material remains bounded. Scattered revolutionary, conservative, national, organismic, and mythic vocabularies do not add up to a complete political theory; later appropriations require case-by-case evidence.

The final check found no retained exact quotation requiring a page locator. The well-known formulas “nature as visible spirit” and Hegel’s “night in which all cows are black” are paraphrased and contextualized rather than presented as freestanding proof texts.

## Uncertainty audit

- **Continuity:** scholarship disagrees over one enduring project versus significant philosophical restarts. The article preserves both evidence of continuity and real architectural change.
- **Textual authority:** lecture witnesses and posthumous editions can document positions without constituting one final authorial text.
- **Science:** the relation of Schelling’s Naturphilosophie to historical and present science remains interpretive; no priority claim is made.
- **Theology:** the status of God, ground, revelation, and Christianity is philosophically and confessionally contested.
- **Influence:** later connections to Kierkegaard, Heidegger, psychoanalysis, theology, process thought, and environmental philosophy are framed as reception lines, not identical doctrines.

## Entity-complete surface inventory and integration recommendations

### Canonical and structured data

- `src/data/philosophers.ts`, tuple `schelling`: currently supplies only a generic German-Idealist seed. Register `applyModernGermanIdealistReactionsEditorial` after the existing depth composition so the proposed contribution, branches, works, chronology, relationships, readings, disputes, and review replace generic fields.
- `src/data/contentDepth.ts`, record `schelling`: no dedicated record is present; generic fallbacks remain inadequate until the proposed patch applies.
- `src/data/philosopherCompletionDepth.ts`, record `schelling`: existing reading path and two bibliography links are accurate but superseded by the mapped path and seven-source evidence set.
- `src/data/germanIdealismCompletionArticles.ts`, record `schelling`: preserve its 12 substantive sections; the module inserts `corpus-and-publication` before `phases` to clear the universal floor and make editorial status explicit.
- `src/data/canonicalArticles.ts` and philosopher registry composition: registration only; no architecture change recommended.

### Museum primary, supplemental, object, and plaque surfaces

- `src/data/museum/museumCanonicalProgram.ts`, primary exhibit `german-idealism-afterlives / german-idealism-nature / schelling`: assignment, room, tier, principal asset, and visitor question are accurate. Preserve them. `displayName` is contextual metadata; the primary plaque runtime must continue deriving the exact canonical title `Schelling`.
- `src/data/museum/museumInterpretations.ts`, `MUSEUM_DEEP_ARTICLE_ENTITY_IDS` entry `schelling`: currently recomposes article sections. After registration, verify that section selection does not overrepresent the early nature phase; a bespoke 250–400-word interpretation is preferable only if the recomposition fails the canonical-record Museum gate.
- `src/data/museum/germanIdealismGalleryCuration.ts`, room `german-idealism-nature`: accurate room sign; preserve architecture and geometry.
- `src/data/museum/germanIdealismSupplementalExhibits.ts`, records `nature-caroline-intellectual-network`, `nature-romantic-beholder`, `nature-goethe-color`, `nature-galvani-living-force`, and `nature-voltaic-pile`: inspected. The cautions correctly distinguish collaboration from invented attribution, cultural parallel from direct influence, Goethe’s diagram from Schelling’s doctrine, experimental context from Naturphilosophie, and an artifact from documented personal contact. No material content rewrite recommended.
- `src/data/museum/germanIdealismGalleryAssets.ts`, Schelling portrait and five associated assets: identification, rights, captions, limitations, and alt text are materially responsible. Preserve.
- Supplemental plaque titles should continue to be the factual `shortTitle` values (“Caroline and the Jena Circle,” “Romantic Nature and the Beholder,” “Goethe’s Color Circle,” “Galvani and Living Force,” “An Early Electrical Battery”) with complete invitations derived by the plaque contract. No title correction is needed.
- `docs/museum-asset-provenance.md`: no target-specific material defect found and no asset/provenance change is proposed.

### Search, directory, Compare, wall, timeline, map, paths, relationships, and routes

- `src/components/Compare/CompareMode.tsx`: representation is derived from `contributionSummary`, `mainIdeas`, and `beginnerExplanation`; the proposed patch materially fixes Compare without bespoke copy.
- `src/components/PhilosopherProfile/PhilosopherProfile.tsx`: directory search uses name, tradition, and main ideas; the proposed structured record makes phase terms visible. No component change recommended.
- `src/data/searchIndex.ts` and `src/data/generated/searchIndex.json`: derived and refreshed through the authoritative compiler.
- `src/data/routeManifest.ts` and `src/data/generated/routeManifest.json`: canonical philosopher and Museum routes already exist. Refresh generated output only through its compiler.
- `src/data/timelineEvents.ts`, event `german-idealism` (1790): broadly accurate but shallow. Material correction recommended: replace “extend Kant into systems” with language about competing post-Kantian projects, and avoid implying a single movement beginning exactly in 1790. Do not add a Schelling-only event unless the batch’s timeline density warrants it.
- `src/data/wallChart.ts`, `german-idealism` band: Schelling placement is accurate; current band summary is acceptable. No Schelling work landmark exists. Adding the 1809 Freedom Essay would materially improve phase visibility if wall density allows, but this is a content recommendation, not a geometry change.
- `src/data/relationships.ts`: no explicit Schelling edges were found. Add only evidenced relations that fit the existing graph vocabulary: Fichte influenced Schelling; Schelling and Hegel overlap/develop through collaboration and dispute; Schelling influenced Kierkegaard as a later reception relation. Do not encode Romanticism or environmental philosophy as direct school membership.
- `src/data/learningPaths.ts`: no path currently uses Schelling. This is not automatically a defect; add him only if a German Idealism or nature/system path is introduced. Do not force him into the generic metaphysics path solely to touch the surface.

### Assignment, masterplan, fixed contracts, and triage

- `docs/museum-masterplan/philosopher-assignments.csv`, row `schelling`; `docs/museum-masterplan/hall-program.json`, room `german-idealism-nature`; `docs/museum-masterplan/single-level-building-plan.json`; and `src/data/museum/germanIdealismGalleryCuration.ts`: assignment and fixed geometry are accurate and locked. Preserve.
- `docs/museum-masterplan/exhibit-wall-standard.md`: Gallery 19’s 24-installation contract and zero text-dominant/isolated-book result must remain unchanged.
- `docs/editorial/flagship-program.json`: Schelling is not a flagship; do not change the roster.
- `docs/editorial/editorial-coverage-report.md`: authoritative regeneration records the current claim review and final depth.
- `docs/content-roadmap.md`: no target-specific correction required beyond regenerated editorial totals.

## Residual risk and acceptance conditions

Accepted after integrated rereading, Museum reconciliation, downstream surface corrections, deterministic lock verification, and focused editorial and Museum gates. Residual risk is concentrated in the edition status of late lecture materials, the continuity question, overclaiming scientific anticipation, and political appropriation.
