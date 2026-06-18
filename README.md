# Philosophy Atlas

Philosophy Atlas is a local-first interactive museum of philosophical structure: branches, durable questions, historical development, relationships, thinkers, and beginner learning routes. It uses Vite, React, TypeScript, local seed data, CSS, and a lightweight React Three Fiber constellation. No backend, account, API key, or live data service is required.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Build with `npm run build`; inspect the production build with `npm run preview`.

## Deploy to GitHub Pages

This repository is configured as a public draft site for GitHub Pages:

https://da3daluscode.github.io/philosophy-museum/

Before deploying, verify the production build locally:

```bash
npm run build
npm run preview
```

The GitHub Pages workflow builds the Vite app and publishes `dist` when changes are pushed to `main`, or when the workflow is run manually.

## Views

- **Big History:** Filterable chronological events with connected branches and thinkers.
- **Branch Explorer:** The primary educational view; Stoicism is the showcase branch.
- **Philosophy Map:** Clickable relationship constellation and branch inspector.
- **Philosophers:** Searchable profiles that explain where a thinker fits.
- **Compare:** Branch-vs-branch and thinker-vs-thinker comparisons with presets.
- **Learning Paths:** Guided, step-by-step beginner routes.
- **Global search:** Opens branches or philosopher profiles from any view.

## Data model

Core interfaces live in `src/types/philosophy.ts`. Local records live in `src/data`: `branches.ts`, `philosophers.ts`, `timelineEvents.ts`, `relationships.ts`, and `learningPaths.ts`. IDs connect records without a database.

### Add content

- **Branch:** Add a complete `Branch` record in `src/data/branches.ts`; connect related branch and philosopher IDs.
- **Philosopher:** Add a tuple in `src/data/philosophers.ts`; use existing branch IDs in `primaryBranchIds`.
- **Timeline event:** Add a `TimelineEvent` in `src/data/timelineEvents.ts` and connect branch/philosopher IDs.
- **Learning path:** Add a path with ordered steps in `src/data/learningPaths.ts`.

Keep explanations beginner-readable, mark date confidence for uncertain ancient or pseudonymous figures, avoid binary school labels when membership is disputed, distinguish broad traditions from specific schools with membership statuses such as canonical figure, commentator, or school systematizer, represent canonical founders or early figures in branch origin metadata, and never invent exact quotations.

## Known limitations

V1 seed data is broad but intentionally concise outside the Stoicism showcase. The map uses a curated subset of branches for readability. Influence fields on many philosopher records are not yet deeply linked. The decorative 3D constellation is not itself a navigation surface. No progress is persisted between sessions.

## Phase 2 ideas (not built)

- SEP/IEP/Wikipedia/Wikidata links and enrichment
- A real citation and source layer
- Richer animations and 3D museum rooms
- Saved reading progress and quiz mode
- Deeper cross-cultural philosophy coverage
- Exportable study notes
