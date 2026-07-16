# Philosophy Atlas Museum masterplan

**Status:** review package only. Nothing in this directory changes the live 3D Museum, its routes, exhibit rosters, hall coordinates, connections, or visitor map.

## Decision in one page

Adopt **Worlds with a Questions Forum — Expanded and Culturally Safeguarded** as the intellectual program, and use the **Ring of Wings** as the preferred physical concept for the next design stage.

The recommended program gives historically and culturally situated traditions their own primary homes, then lets a central questions forum and explicit secondary associations reveal shared problems. It contains:

| Program | Wings | Halls | Rooms / zones | Record capacity | Organizing idea |
|---|---:|---:|---:|---:|---|
| **Worlds with a Questions Forum — recommended** | **10** | **26** | **105** | **258** | Historical-cultural primary homes plus thematic cross-links |
| Braided Global Timeline | 6 | 25 | 88 | 228 | Parallel regional histories along a common chronology |
| Questions and Methods Network | 7 | 25 | 86 | 240 | Thematic questions supported by historical context houses |

“Record capacity” is a planning allowance for philosopher and branch records, not a promise of 258 full-size installations. The current Atlas contributes 184 primary records: **43 branches and 141 philosophers**. Every one has exactly one stable-ID primary assignment, a room or zone, a presentation tier, and a rationale. Secondary hall appearances are interpretive links, not duplicate primary exhibits.

## Why this is the recommendation

The hybrid program best satisfies the project’s priority order:

1. It does not reduce Islamic, Jewish, South Asian, Buddhist, Chinese, or East Asian philosophies to sidebars in a European chronology.
2. It preserves historical development: visitors can still follow ancient, medieval, early-modern, nineteenth-century, and modern sequences.
3. It handles philosophers important to several fields without duplicating them. Aristotle, Kant, Wittgenstein, Foucault, and others receive one physical home and strong secondary interpretation elsewhere.
4. Its 74-record capacity margin supports new Atlas content and rotation without forcing an immediate new wing.
5. A small set of reusable gallery templates can realize the program gradually.

The Ring of Wings is preferred because its central forum gives visitors a legible point of return, most halls can have two useful connections, and eight priority halls have named outward expansion points. The two-level promenade and pavilion campus remain serious alternatives if the site footprint or desired visitor experience changes.

## How the plan was challenged

Parallel specialist reviews were organized by distinct scope rather than by one general “accuracy” pass:

| Review stream | Consequential result |
|---|---|
| Ancient Mediterranean; Latin, Islamic, and Jewish medieval/post-classical worlds | separated skeptical lineages and three connected halls; treated Boethius and Mulla Sadra as thresholds rather than era-bin errors |
| Indian/Buddhist; Chinese/East Asian traditions | split South Asian and Buddhist wings, kept pramāṇa in Buddhist history, qualified Legalism/Laozi/Patañjali, and required later East Asian continuities |
| Early modern/Enlightenment; German Idealism/continental traditions | kept Kant late-Enlightenment, made Camus a rejected label, and resolved Beauvoir’s close primary-home dispute transparently |
| Analytic, logic, language, science, and mind | kept Wittgenstein longitudinally Analytic, Anscombe primary in Action/Intention, and modern field branches comparative rather than cultureless |
| Ethics, politics, feminist, race, and liberation thought | separated Moral Life, Justice, Feminist, and Colonialism/Race/Liberation halls and distinguished Fanon, Davis, hooks, Butler, and Habermas |
| Taxonomy, visitor experience, physical architecture, accessibility, and wayfinding | expanded the recommendation to 26 halls, preferred a one-level loop, centralized the physical manifest, and made blocked growth points explicit |

Independent final audits then checked scholarship/cultural balance, exact data coverage, and physical correspondence. Their blocking findings—uncertainty dates serialized as raw anchors, generic branch rationales, missing continuity routes, diagram/prose conflicts, and a non-crossable manifest fragment—were corrected and added to deterministic validation where machine checks are appropriate.

## What to review

Start with these documents, in order:

1. [Classification principles](./classification-principles.md) — the rules behind primary and secondary placement.
2. [Taxonomy options](./taxonomy-options.md) — three different intellectual organizations and their tradeoffs.
3. [Recommended program](./recommended-program.md) — all 10 wings, 26 halls, and 105 rooms or zones.
4. [Difficult placements](./difficult-placements.md) — disputed cases and the judgment calls made.
5. [Building options](./building-options.md) — three physical concepts, templates, circulation, accessibility, and expansion.
6. [Migration plan](./migration-plan.md) — how the six-hall prototype can become a truthful pilot without building the whole museum.

The complete assignments are reviewable as spreadsheets:

- [Philosopher assignments](./philosopher-assignments.csv) — 141 current philosopher IDs.
- [Branch assignments](./branch-assignments.csv) — 43 current branch IDs.

The machine-readable planning contract is split deliberately:

- [Hall program](./hall-program.json) defines intellectual wings, halls, rooms, capacities, tiers, and reusable templates.
- [Building manifest example](./building-manifest.example.json) demonstrates physical placement, doorway slots, arrival poses, connections, map polygons, implementation status, and reservations.
- Rendered hall definitions remain a third layer; the eventual visitor map should project the live physical manifest instead of maintaining a separate conceptual layout.

CSV secondary hall IDs are reviewed route candidates. Before implementation, each must receive a room-level destination, a typed relation, and a one-sentence scholarly rationale; bare adjacency must never be rendered as influence or membership.

The three directly reviewable, conceptual (not-to-scale) floor-plan diagrams are:

- [Ring of Wings](./diagrams/ring-of-wings.svg) — recommended single-level loop and central forum.
- [Braided Promenade](./diagrams/braided-promenade.svg) — compact two-level intertwined routes.
- [Pavilion Campus](./diagrams/pavilion-campus.svg) — expandable courtyards and linked pavilions.

## Decisions that deserve explicit approval

The package recommends, but does not hide, several consequential choices:

- Aristotle remains in Mediterranean antiquity, with unusually strong secondary appearances across logic, ethics, metaphysics, politics, science, and the connected medieval worlds.
- Kant closes the Enlightenment hall and acts as the threshold to German Idealism rather than being moved into a purely thematic gallery.
- Wittgenstein receives a longitudinal home in Analytic Traditions, with secondary associations to mind, language, and the questions forum.
- Buddhist epistemology remains inside Buddhist historical traditions; epistemology and logic are secondary lenses.
- Islamic, Jewish, and Latin Christian philosophy receive distinct but connected halls instead of a single undifferentiated “medieval” room.
- Foucault belongs in Critique, Power, and Deconstruction; phenomenology and colonial/race/liberation interpretation remain secondary.
- Camus is presented through absurdity and revolt, with an explicit note that he resisted the existentialist label.
- Beauvoir’s primary historical home is Phenomenology, Existence, and Embodiment, with an anchor-strength secondary presence in Feminist Philosophies.
- Mary Astell and Mary Wollstonecraft retain Enlightenment primary homes and anchor-strength feminist secondary interpretation.
- G. E. M. Anscombe is primary in Analytic Traditions through action and intention, with major secondary treatment in moral philosophy.

See [Difficult placements](./difficult-placements.md) for the complete reasoning and unresolved interpretive risks.

## Recommended next decision and phase

Approve or revise three things before implementation: the hybrid taxonomy, the disputed primary homes, and one physical layout concept. The next implementation phase should then rearrange **only the current six hall shells** into a truthful pilot: real walls and corridors, a centralized physical manifest, accessible safe arrivals, and reserved connection points. It should not construct all 26 halls.

The migration plan treats the current six halls as technical assets, not immutable intellectual categories. All 48 current exhibits remain unchanged during the immediate truth phase; later dispositions are documented record by record as temporary retention, primary relocation, or secondary interpretation.

## Deterministic validation

From the repository root, run:

```powershell
node scripts/validateMuseumMasterplan.mjs
npm run build
```

The validator compares the CSVs with the current TypeScript data and checks exact-once primary coverage, applied uncertainty-date metadata, stable IDs, all wing/hall/room/tier references, unique secondary hall references, template ranges/slots, program totals, capacities, and manifest nodes, poses, connections, footprints, status, and blocked reservations. The normal application build confirms that the planning-only additions do not disturb production code.

## Research and accessibility anchors

The classification review uses original summaries and stable scholarly references rather than copied passages. Especially important checks include the Stanford Encyclopedia of Philosophy entries on [Dharmakīrti](https://plato.stanford.edu/entries/dharmakiirti/), [Indian epistemology](https://plato.stanford.edu/entries/epistemology-india/), [Greek sources in Arabic and Islamic philosophy](https://plato.stanford.edu/entries/arabic-islamic-greek/), [Arabic and Islamic influence on the Latin West](https://plato.stanford.edu/entries/arabic-islamic-influence/), [Camus](https://plato.stanford.edu/entries/camus/), [Foucault](https://plato.stanford.edu/entries/foucault/), [Wittgenstein](https://plato.stanford.edu/entries/wittgenstein/), and [Kant](https://plato.stanford.edu/entries/kant/).

The template contract treats accessibility as geometry, not decoration. Detailed design should be checked against the [U.S. Access Board ADA Standards](https://www.access-board.gov/ada/) and the Smithsonian’s [Accessible Exhibition Design Guidelines](https://www.sifacilities.si.edu/sites/default/files/Files/Accessibility/accessible-exhibition-design1.pdf), with project targets that exceed bare minimum circulation where practical.

## Scope boundary

This package creates documentation, CSV/JSON planning data, SVG diagrams, and one small validator. It does **not** implement geometry, change live hall coordinates or graph connections, change active exhibits, alter routes, replace the visitor-map UI, add a runtime data dependency, merge, deploy, or open a pull request.
