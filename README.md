# Philosophy Atlas

**A free, interactive atlas of philosophy as a connected history of ideas.**

[Explore the live site](https://da3daluscode.github.io/philosophy-museum/) · [Enter the walkable Museum](https://da3daluscode.github.io/philosophy-museum/#/museum) · [Read the editorial methodology](https://da3daluscode.github.io/philosophy-museum/#/methodology)

## What Philosophy Atlas is

Philosophy Atlas is a browser-based educational project for exploring how philosophical questions, schools, thinkers, works, and disagreements develop across time and cultures. It presents philosophy as an evolving conversation rather than a list of isolated biographies.

The Atlas combines long-form articles, historical timelines, conceptual maps, comparisons, guided learning paths, search, and a walkable 3D Museum. It is static and local-first: there is no account, backend, advertising, subscription, or paid service requirement.

## Highlights

- **191 long-form canonical articles:** 146 philosopher profiles and 45 records covering philosophies, branches, schools, traditions, movements, methods, and frameworks.
- **[Big History](https://da3daluscode.github.io/philosophy-museum/#/history):** a filterable chronology connecting thinkers, traditions, works, and major historical developments.
- **[Branch Explorer](https://da3daluscode.github.io/philosophy-museum/#/branches) and [Philosophy Map](https://da3daluscode.github.io/philosophy-museum/#/map):** complementary ways to follow concepts, disagreements, inheritance, opposition, and transformation.
- **[Philosopher profiles](https://da3daluscode.github.io/philosophy-museum/#/philosophers), [Compare](https://da3daluscode.github.io/philosophy-museum/#/compare), and [Learning Paths](https://da3daluscode.github.io/philosophy-museum/#/paths):** focused reading, side-by-side study, and guided routes through major questions and periods.
- **Global search:** coverage across philosophers, traditions, Museum galleries, and individual exhibits.
- **Walkable Museum:** 26 curated/open galleries and 105 rooms on one connected public level, with guided travel and a complete directory for visitors who prefer not to use free movement.

## Editorial depth and sourcing

Every one of the 191 canonical articles meets the universal minimum of 2,000 substantive words. The release gate enforces that floor for all 146 philosopher articles and all 45 philosophy, branch, school, tradition, movement, method, and framework articles. The [generated depth inventory](docs/editorial/article-depth-inventory.md) records the method and per-article results.

Depth is not the same as evidence or completed editorial review. At v1.0.0, the [generated editorial coverage report](docs/editorial/editorial-coverage-report.md) records:

- **122** current claim reviews;
- **66** bibliography-only records;
- **3** unreviewed records;
- **0** source-mapped records awaiting claim review; and
- **0** stale review locks.

Bibliography-only and unreviewed records have not completed claim review, and the corpus should not be described as fully claim-reviewed, fully sourced, independently fact-checked, or peer reviewed. The in-app [editorial methodology](https://da3daluscode.github.io/philosophy-museum/#/methodology) and repository [editorial model](docs/editorial/editorial-model.md) explain the review states, claim-to-source mappings, locators, and stale-review safeguards.

## Walkable Museum

The Museum turns the Atlas into a physical journey through 26 curated/open galleries and 105 named rooms or zones. Its collection contains **191 primary exhibits** and **409 supplemental/context exhibits**, for **600 interpreted stops** in total.

Public Gallery 01–26 numbering follows the chronological visitor route. A continuous flush route inlay runs from the Grand Entrance through every gallery to the Final Return and exit; quieter branches mark the central crosscut and shortcuts. The Museum Map is generated from the same compiled building manifest, tracks the visitor's position and facing, and supports fast travel across the complete public route.

Visitors can walk freely, follow guided travel between safe viewpoints, or use the accessible directory to open every exhibit and its related Atlas article. Stable direct exhibit routes make individual installations linkable without requiring a full Museum traversal. The [Museum masterplan](docs/museum-masterplan/README.md), [building plan](docs/museum-masterplan/single-level-building-plan.md), and [media provenance record](docs/museum-asset-provenance.md) document the current program, route, and rights metadata.

## Controls

- Choose **Enter museum**, then use **W A S D** or the arrow keys to move.
- Choose **Standard** or **Fast** as the preferred pace; hold **Shift** for temporary Fast movement on desktop.
- Press **Space** to jump.
- Press **Ctrl** or **C** while moving to slide. Jump during a slide to cancel it into a brief airborne momentum boost.
- Press **E** or **Enter** near an exhibit or the Museum Map to interact.
- Press **M** for the Museum Map and **R** to reset to the Grand Entrance.
- Press **Escape** to release mouse capture; in drag-look mode it pauses the visit.
- Press **F** for browser fullscreen when no panel is open and fullscreen is available.
- On touch devices, use the separate movement and look controls plus Standard/Fast, Jump, Slide, and contextual Interact actions.

Guided travel and the complete directory remain available without keyboard-and-mouse free movement or WebGL navigation.

## Running locally

Use Node.js 22 and npm, matching the production workflow:

```bash
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173/philosophy-museum/`.

Create and inspect a production build with:

```bash
npm run build
npm run preview
```

## Validation and deployment

The production site is deployed through [GitHub Pages](https://da3daluscode.github.io/philosophy-museum/) when `main` is updated. The [deployment workflow](.github/workflows/deploy.yml) installs the locked dependencies with Node.js 22, verifies generated manifests, runs the full content and Museum gate, builds the site, enforces bundle budgets, and deploys only after every check passes.

The current release gate includes:

```bash
npm run check:museum-building
npm run check:route-manifest
npm run validate:museum-masterplan
npm run validate:museum-building-plan
npm run audit:routing
npm run audit:museum
npm run audit:museum-assets
npm run audit:articles
npm run audit:articles:reviewed
npm run audit:editorial
npm run test:editorial
npm run audit:accuracy
npm run audit:integrity
npm run build
npm run report:bundle
```

The universal article-depth audit is a blocking release gate. It currently passes all 191 canonical articles; it is not an advisory check and no longer represents a migration backlog.

## Project status

**Philosophy Atlas v1.0.0 is the first formal public release of a substantially complete core product.** The long-form Atlas, timelines, maps, comparisons, learning paths, search, and complete 26-gallery Museum are published and usable without an account.

Ongoing work includes formal claim review for the remaining bibliography-only and unreviewed records, deeper claim-to-source coverage, relationship enrichment, maintenance, and targeted visual refinement. The Philosophy Map remains intentionally selective for readability, and the static local-first application does not provide accounts or durable cross-device progress.

## License and media rights

The site is free to visit. This repository currently has no repository-wide `LICENSE` file and no repository-wide software license, so it should not be described as open-source software.

Museum media retains item-specific source, credit, license, likeness, derivative, and rights metadata. See the [Museum asset provenance record](docs/museum-asset-provenance.md) for the current policy and inventory.
