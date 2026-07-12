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
- **Museum:** A walkable Ancient Greek & Hellenistic gallery with eight exhibits, an accessible directory, and a guided alternative.
- **Branch Explorer:** The primary educational view; Stoicism is the showcase branch.
- **Philosophy Map:** Clickable relationship constellation and branch inspector.
- **Philosophers:** Searchable profiles that explain where a thinker fits.
- **Compare:** Branch-vs-branch and thinker-vs-thinker comparisons with presets.
- **Learning Paths:** Guided, step-by-step beginner routes.
- **Global search:** Opens branches or philosopher profiles from any view.

## Museum routes and controls

The Museum is lazy-loaded at `#/museum/ancient-greek`; the convenience route `#/museum` replaces itself with that canonical hall URL. Each installation also has a direct route such as `#/museum/ancient-greek/exhibits/plato` or `#/museum/ancient-greek/exhibits/stoicism`.

- Choose **Enter museum** before movement or look controls engage.
- Desktop: W A S D or arrow keys move, the mouse looks around, E or Enter opens a nearby exhibit, R resets, M opens the directory, and Escape pauses or releases Pointer Lock.
- Touch: use the independent left movement and right look controls, then the contextual Interact button. Pause, Reset, and Directory remain available inside the stage.
- The DOM directory and guided exhibit controls expose all eight labels and full-article links without requiring free movement or WebGL.
- Camera position is validated and retained only for the current browser session so article Back/Forward round trips resume in the hall.

Run the Museum-specific structural, collision, session, and data audit with `npm run audit:museum`.

## Data model

Core interfaces live in `src/types/philosophy.ts`. Local records live in `src/data`: `branches.ts`, `philosophers.ts`, `timelineEvents.ts`, `relationships.ts`, and `learningPaths.ts`. IDs connect records without a database.

### Add content

- **Branch:** Add a complete `Branch` record in `src/data/branches.ts`; connect related branch and philosopher IDs.
- **Philosopher:** Add a tuple in `src/data/philosophers.ts`; use existing branch IDs in `primaryBranchIds`.
- **Timeline event:** Add a `TimelineEvent` in `src/data/timelineEvents.ts` and connect branch/philosopher IDs.
- **Learning path:** Add a path with ordered steps in `src/data/learningPaths.ts`.

Keep explanations beginner-readable, mark date confidence for uncertain ancient or pseudonymous figures, avoid binary school labels when membership is disputed, distinguish broad umbrella traditions from specific schools with separate branch records when the app already names them, use membership statuses such as canonical figure, commentator, or school systematizer, represent canonical founders or early figures in branch origin metadata, and never invent exact quotations.

## Known limitations

V1 seed data is broad but intentionally concise outside the deepest article set. The map uses a curated subset of branches for readability. Influence fields on many philosopher records are not yet deeply linked. The decorative 3D constellation is not itself a navigation surface. The Museum currently contains one complete hall; it retains camera position only for the current browser session and does not persist long-term progress.

## Phase 2 ideas (not built)

- SEP/IEP/Wikipedia/Wikidata links and enrichment
- A real citation and source layer
- Additional walkable museum halls and a shared lobby
- Saved reading progress and quiz mode
- Deeper cross-cultural philosophy coverage
- Exportable study notes
