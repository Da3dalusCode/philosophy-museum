# Philosophy Atlas documentation map

This index separates durable standards, current production authority, and historical design evidence. The deployed state is determined by `main` and the GitHub Pages workflow. Accepted [standards](./standards/README.md) and [decisions](./decisions/README.md) govern product direction; generated data, canonical registries, and executable audits remain authoritative for what the application currently ships.

## Current project documentation

- [`standards/README.md`](./standards/README.md) — mandatory product, editorial, conflict, and validation standards.
- [`decisions/README.md`](./decisions/README.md) — accepted owner decisions and reopening conditions.
- [`../README.md`](../README.md) — public product overview, local setup, routes, and release status.
- [`museum-masterplan/README.md`](./museum-masterplan/README.md) — entry point for the approved intellectual program and Continuous Enfilade building plan.
- [`museum-masterplan/recommended-program.md`](./museum-masterplan/recommended-program.md) — current 10-wing, 26-gallery, 105-room curatorial program.
- [`museum-masterplan/single-level-building-plan.md`](./museum-masterplan/single-level-building-plan.md) — implemented single-level physical plan, circulation, reserves, and release contract.
- [`museum-masterplan/exhibit-wall-standard.md`](./museum-masterplan/exhibit-wall-standard.md) — current installation, clearance, hierarchy, and wall-use rules.
- [`museum-structural-residency.md`](./museum-structural-residency.md) — current permanent-structure and content-residency contract.
- [`museum-asset-provenance.md`](./museum-asset-provenance.md) — current media inventory, rights policy, lock pipeline, and preserved provenance history.
- [`editorial/exhibit-review-ledger.md`](./editorial/exhibit-review-ledger.md) — generated canonical exhibit-to-article inventory and separate exhibit-review baseline.
- [`editorial/flagship-program.json`](./editorial/flagship-program.json) — owner-approved flagship roster and targets; live progress is reported by `npm run report:flagships`.
- [`content-roadmap.md`](./content-roadmap.md) — current editorial coverage and remaining claim, exhibit, and flagship work.

## Executable production authorities

These files and checks define what the application actually ships:

- [`../src/data/museum/museumContinuousEnfiladeManifest.json`](../src/data/museum/museumContinuousEnfiladeManifest.json) — generated physical placement and circulation manifest for the live building.
- [`../src/data/generated/routeManifest.json`](../src/data/generated/routeManifest.json) — generated lightweight route and search manifest.
- [`../src/data/museum/museumAssets.ts`](../src/data/museum/museumAssets.ts) — assembled Museum asset registry.
- [`../.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) — production validation and GitHub Pages deployment gate.
- `npm run check:museum-building` and `npm run check:route-manifest` — prove generated manifests match their checked-in sources.
- `npm run validate:museum-masterplan`, `npm run validate:museum-building-plan`, and the `audit:*` commands — enforce program, geometry, routes, content, media, accuracy, and referential-integrity contracts.

The current validated Museum contains 26 curated/open galleries, 105 rooms, 192 primary exhibits, 411 supplemental exhibits, and 603 interpreted stops. Counts in archived documents describe their own checkpoints, not the current release.

## Historical and superseded evidence

The following records remain useful for understanding earlier decisions, regressions, and migrations, but they are not current runtime specifications:

- [`build-week-visitor-map.md`](./build-week-visitor-map.md) — visitor-map checkpoint handoff.
- [`museum-ring-pilot.md`](./museum-ring-pilot.md) — six-shell Ring pilot implementation record.
- [`museum-world-architecture.md`](./museum-world-architecture.md) — Phase 2 world-architecture record.
- [`screenshots/museum-canonical-six/`](./screenshots/museum-canonical-six/) — canonical-six visual checkpoint, predating the complete 26-gallery building.
- [`screenshots/ring-pilot-review/`](./screenshots/ring-pilot-review/) — Ring-pilot review captures.
- `src/data/museum/museumBuildingManifest.json` — rollback-era Ring artifact retained outside this documentation tree.

Alternative diagrams and migration records under [`museum-masterplan/`](./museum-masterplan/) explain how the approved design was selected and implemented. [Decision 0001](./decisions/0001-museum-structure.md) locks the Continuous Enfilade as the permanent physical architecture; Ring, campus, and braided-promenade materials are superseded design history, not future targets.

Existing screenshots are checkpoint evidence, not proof of the current deployed appearance. Use the live site or a fresh production build for current visual review.
