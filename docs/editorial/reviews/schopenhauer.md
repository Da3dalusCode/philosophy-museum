# Schopenhauer claim-review dossier

- Canonical ID: `schopenhauer`
- Visitor route: `#/philosophers/schopenhauer`
- Review date and status: 2026-08-03; `claim-reviewed`
- Stored review lock: `fnv1a64:a123a41d0b36ef10`
- Coverage: 15 sections; 32 citation-bearing paragraphs; 17 structured claim groups; 86 citation references
- Evidence: 7 registered and cited sources; every paragraph and structured claim mapped in `modernGermanIdealistReactionsEditorial.ts`
- Article depth: 2,335 final substantive words

## Review method and boundary

The canonical article and structured record were checked against Robert Wicks’s SEP account, the *Cambridge Companion to Schopenhauer*, and Cambridge primary editions of the 1813/1847 *Fourfold Root*, both volumes and editions of *The World as Will and Representation*, the two ethics prize essays, and *Parerga and Paralipomena*. The review targeted edition chronology, representation and sufficient reason, the body argument for will, causation and individuation, aesthetics and music, compassion, asceticism, Indian reception, later influence, and prejudicial claims about women, race, Jews, and culture.

The deterministic lock covers the integrated canonical article and structured record, not separate Museum copy. Museum primary interpretation, supplemental interpretations, assets, plaques, assignment, and routes were inspected independently below.

## Source and locator coverage

- `schopenhauer-sep`: sections 1–7 for life, system, representation, will, aesthetics, ethics/religion, Indian reception, and influence.
- `schopenhauer-companion`: chapters on Fourfold Root, Kant, metaphysics, body, aesthetics, ethics, religion, and reception.
- `schopenhauer-fourfold`: editorial introduction and chapters 4–8 of the 1813 and 1847 forms; revision is tracked rather than backdated.
- `schopenhauer-wwr1`: Books I–IV, Appendix, and edition prefaces.
- `schopenhauer-wwr2`: supplements to Books I–IV and the editorial introduction; treated as the 1844/1859 later volume, not part of the 1818 text.
- `schopenhauer-ethics`: *On the Freedom of the Will* and *On the Basis of Morals*, especially the latter’s parts II–IV.
- `schopenhauer-parerga`: chapters 15–16 and 27 for religion, Sanskrit literature, and “On Women,” plus associated later discussions of suffering and culture.

Section mappings and all 17 structured claim groups are stored in the module. The mapping explicitly covers dates and edition notes, classifications, branches, works, life and development, explanation, influence, disputes, prejudicial claims, and reading paths.

## Corrections, qualifications, and disputes preserved

- Representation is the subject–object form of experience ordered through space, time, causality, and other grounds. Will and representation are not described as two independently existing worlds.
- The principle of sufficient reason is divided into grounds of becoming, knowing, being, and acting. Efficient causation is not made the template for every explanation.
- The body is known externally as representation and internally through action, effort, desire, and resistance. Generalizing this double aspect into a universal metaphysics of will is identified as Schopenhauer’s bold and contestable inference.
- Will is blind, aim-renewing striving rather than ordinary conscious choice. Individuation through space and time helps connect metaphysical competition to compassion.
- Pessimism is a structural account of desire, satisfaction, boredom, conflict, and vulnerability—not a mood, pose, or claim that nothing matters.
- Aesthetic contemplation offers temporary release from interested striving; music receives exceptional metaphysical standing. Compassion grounds moral worth; ascetic denial seeks a more radical quieting. These are distinct responses.
- The first volume’s 1818 publication/1819 imprint, the 1844 supplement volume, the 1859 revision, and the 1847 revision of *Fourfold Root* are distinguished. Later supplements are not projected into the first edition.
- Schopenhauer’s reception of the Upanishads and Buddhism came through the Persian-to-Latin *Oupnek’hat*, European scholarship, selective sources, and Orientalist categories. It was philosophically consequential but not direct Sanskrit mastery, tradition membership, or proof of doctrinal equivalence.
- “On Women” and racialized, antisemitic, and culturally hierarchical passages are treated as serious parts of the corpus. Biography and condemnation do not replace explanation, and period context does not excuse them.
- The contradiction between expansive compassion ethics and categorical hierarchy is presented as a philosophical problem, not solved by isolated anecdotes about people Schopenhauer admired.
- Nietzsche, Wagner, Freud, literary modernism, animal ethics, pessimism, and contemporary receptions are framed as transformations or influence lines, not identities of doctrine.

No retained exact quotation requires a page locator. The article paraphrases the pendulum/oscillation imagery and “principium individuationis” in context rather than using aphorisms as evidence for the full system.

## Uncertainty audit

- **Thing in itself:** interpreters dispute whether will is the thing in itself without qualification or only the best available characterization “for us.” The article avoids categorical overstatement.
- **Body argument:** its scope beyond one’s own embodied access remains contested.
- **Edition:** later elaboration may clarify or shift emphases; dates and volumes remain visible.
- **Ethics and salvation:** the relation among compassion, justice, asceticism, and denial of will remains interpretively difficult.
- **Indian reception:** affinity, appropriation, error, and transformation cannot be collapsed into a verdict that Schopenhauer either “understood India” or did not engage it.
- **Influence:** claims about Freud, Wagner, Nietzsche, antinatalism, and present debates require bounded wording and direct evidence where specified.

## Entity-complete surface inventory and integration recommendations

### Canonical and structured data

- `src/data/philosophers.ts`, tuple `schopenhauer`: currently lists only metaphysics and one work/idea. Register the override so epistemology, ethics, aesthetics, religion, mind, and later continental reception are represented without making retrospective continental philosophy a primary self-description.
- `src/data/contentDepth.ts`, record `schopenhauer`: shallow and too vague about Indian traditions. The proposed fields replace it with the mediated *Oupnek’hat* route and explicit edition/prejudice tensions.
- `src/data/postKantianNineteenthArticles.ts`, record `schopenhauer`: preserve its 12 sections; the module adds `editions-and-system`, `causation-individuation`, and `prejudice-corpus` before reading strategy.
- `src/data/philosopherCompletionDepth.ts`: no target-specific Schopenhauer completion block was found. The proposed structured patch supplies the missing chronology, works, relationships, and readings.
- `src/data/canonicalArticles.ts` and philosopher registry composition: registration only; no schema change recommended.

### Museum primary, supplemental, object, and plaque surfaces

- `src/data/museum/museumCanonicalProgram.ts`, primary exhibit `faith-pessimism-life-value / nineteenth-will-pessimism / schopenhauer`: assignment, tier, secondary routes, question, and lifetime photograph are accurate. Preserve. Primary title must remain exact canonical `Schopenhauer` at runtime.
- `src/data/museum/nineteenthPrimaryInterpretationEnrichment.ts`, record `schopenhauer`: materially strong and already within the 250–400-word interpretive target. It correctly handles double aspect, speculative generalization, pessimism, art, compassion, asceticism, mediated Asian reception, misogyny, and racial hierarchy. Reconcile terminology and the updated work list, but do not rewrite correct prose merely to touch it.
- The same record’s portrait note correctly identifies J. Schäfer’s March 1859 lifetime photograph and rejects character-reading from appearance. Preserve.
- `src/data/museum/faithPessimismValueGalleryCuration.ts`, room `nineteenth-will-pessimism`: title/subtitle accurately distinguish pessimism from mood and include compassion, art, music, and cross-cultural reading. Preserve geometry and sign.
- `src/data/museum/faithPessimismValueSupplementalExhibits.ts`, records `schopenhauer-kant-and-representation`, `schopenhauer-frankfurt-work`, `schopenhauer-music-and-wagner`, `schopenhauer-oupnekhat-route`, and `schopenhauer-pessimism-afterlife`: inspected. The current copy correctly treats Kantian inheritance as transformation, late recognition as reception history, Wagner as selective reception, the *Oupnek’hat* as Persian/Latin mediation, and pessimism as a diagnosis with distinct responses. No material correction recommended.
- `src/data/museum/faithPessimismValueGalleryAssets.ts`: Kant bust, Schopenhauer house, Wagner portrait, Anquetil-Duperron medallion, monument, and principal portrait have responsible object identification, provenance/rights, limitations, and alt text. Preserve.
- Supplemental factual titles and invitations are compliant: `Kant and Representation`, `A System Waiting for Readers`, `Music and Aesthetic Release`, `A Mediated Upanishadic Encounter`, and `Pessimism Beyond Temperament`. No accuracy edit is needed.
- `docs/museum-asset-provenance.md`: no target-specific defect found and no asset change proposed.

### Search, directory, Compare, wall, timeline, map, paths, relationships, and routes

- `src/components/Compare/CompareMode.tsx`: derived from canonical summary, ideas, and explanation. The patch materially corrects Compare without bespoke copy.
- `src/components/PhilosopherProfile/PhilosopherProfile.tsx`: profile directory and cards will gain works, edition note, and branch-qualified terminology from the patch.
- `src/data/searchIndex.ts` and `src/data/generated/searchIndex.json`: derived. Recompile; do not hand-edit.
- `src/data/routeManifest.ts` and `src/data/generated/routeManifest.json`: philosopher, primary exhibit, and five supplemental routes exist. Refresh only through the compiler.
- `src/data/timelineEvents.ts`, event `schopenhauer-will` (1818): materially shallow. Correct publication language to “late 1818 with an 1819 title-page date,” add representation and embodiment, and avoid saying will is simply a pervasive discovered thing. The “influences existential thought” phrase should become a bounded later-reception claim.
- `src/data/wallChart.ts`: Schopenhauer is not on a dedicated school band and no *World as Will and Representation* landmark is present. Add the 1818/1819 work only if the selected wall band can represent him without falsely enrolling him in existentialism or German Idealism. Do not alter geometry for this editorial pass.
- `src/data/relationships.ts`: no explicit Schopenhauer edges were found. Material candidates are Kant influenced Schopenhauer, Schopenhauer influenced Nietzsche, and Nietzsche reacts against Schopenhauer. Asian traditions should not be represented as one undifferentiated direct-influence edge; the mediated route needs prose or a qualified relationship model.
- `src/data/learningPaths.ts`: Schopenhauer is absent from the metaphysics and existentialism paths. This is not automatically defective. If added, he belongs in a bounded embodiment/pessimism comparison and must not be called an existentialist or a Buddhist philosopher.
- Philosophy Wall/Map and directory drawers derive canonical structured fields; the patch corrects their summary data. Explicit route lines require the relationship updates above.

### Assignment, masterplan, fixed contracts, and triage

- `docs/museum-masterplan/philosopher-assignments.csv`, row `schopenhauer`; `docs/museum-masterplan/hall-program.json`, room `nineteenth-will-pessimism`; `docs/museum-masterplan/single-level-building-plan.json`; and `src/data/museum/faithPessimismValueGalleryCuration.ts`: primary home, standard tier, secondary routes, capacity, and geometry are accurate. Preserve.
- `docs/museum-masterplan/exhibit-wall-standard.md`: preserve Gallery 21’s 18 installations, 6 per room, and zero text-dominant/isolated-book result.
- `docs/editorial/flagship-program.json`: Schopenhauer is not a flagship. Preserve roster.
- `docs/editorial/editorial-coverage-report.md` and `docs/editorial/article-depth-inventory.*`: authoritative regeneration records the current review and final depth.
- `docs/content-roadmap.md`: no manual target-specific change needed beyond generated totals.

## Residual risk and acceptance conditions

Accepted after integrated rereading, preservation of the already strong Museum primary interpretation, downstream surface corrections, deterministic lock verification, and focused gates. Residual risk centers on overclaiming the body argument, backdating later supplements, turning Asian comparison into equivalence, and treating prejudicial writings as either irrelevant or the whole philosophy.
