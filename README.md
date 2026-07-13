# Philosophy Atlas

**An interactive guide to philosophy as a connected history of ideas.**

[Explore the live site](https://da3daluscode.github.io/philosophy-museum/) · [Enter the walkable museum](https://da3daluscode.github.io/philosophy-museum/#/museum)

Philosophy Atlas is a free educational website and digital museum for exploring philosophers, traditions, arguments, historical developments, and relationships between ideas. It combines detailed written guides with timelines, maps, comparisons, learning paths, and a continuously walkable 3D museum.

No account, subscription, download, or special software is required. Everything runs in the browser.

## What is inside

- **43 philosophical branches and traditions**, from ancient schools to modern movements
- **141 philosopher profiles** with historical context, major works, central ideas, and related thinkers
- **Big History**, a filterable timeline connecting events, branches, and philosophers
- **Branch Explorer**, with long-form introductions, key concepts, debates, readings, and source links
- **Philosophy Map**, showing selected relationships between traditions and thinkers
- **Compare**, for side-by-side branch and philosopher comparisons
- **Learning Paths**, with guided routes through major themes and periods
- **A three-gallery 3D museum** with 24 interpreted exhibits and seamless walking between halls

## The walkable museum

The Museum presents philosophy as a physical journey through three connected galleries:

1. **Ancient Greek & Hellenistic Gallery**  
   Socrates, Plato, Aristotle, Cynicism, Epicureanism, Stoicism, Skepticism, and Neoplatonism

2. **Renaissance, Reason, and Revolution**  
   Machiavelli, Descartes, Hobbes, Locke, Spinoza, Hume, Rousseau, and Kant

3. **Modernity, Freedom, and Critique**  
   Kierkegaard, Marx, Nietzsche, Heidegger, Sartre, Beauvoir, Camus, and Foucault

Each exhibit combines a walkable installation, historical images or documents, a focused interpretation, structured facts, and a link to the full philosopher or branch article.

### Museum controls

- Choose **Enter museum** to begin.
- Use **W A S D** or the arrow keys to move.
- Move the mouse to look around when Pointer Lock is available; click and drag is the fallback.
- Press **E** or **Enter** near an exhibit to open it.
- Press **M** for the directory, **R** to reset, and **Escape** to pause.
- Touch controls, guided visits, fullscreen, immersive mode, and a complete non-WebGL directory are also available.

## Who this is for

Philosophy Atlas is intended for curious readers, students, teachers, and anyone who wants more structure than a list of famous names. The goal is to make philosophy approachable without making it shallow: ideas are placed in historical context, connected to neighboring traditions, and supported by routes for deeper reading.

## Project status

The project is actively being developed.

Current written coverage includes all **141 philosophers** and **43 branches** in the Atlas. The 3D Museum currently covers three major historical galleries and will continue to expand. Museum media includes structured provenance and rights metadata; citation depth across the wider Atlas is still being improved.

The application is local-first and static. It has no backend, database, login system, runtime API, advertising, or paid service dependency.

---

## Developer notes

### Technology

- Vite
- React
- TypeScript
- React Three Fiber / Three.js
- Local TypeScript data
- CSS
- GitHub Pages

### Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

Create and inspect a production build with:

```bash
npm run build
npm run preview
```

### Validation commands

```bash
npm run build
npm run audit:routing
npm run audit:museum
npm run audit:museum-assets
npm run audit:integrity
npm run audit:articles
npm run audit:accuracy
npm run report:coverage
npm run report:bundle
```

The Museum audits cover hall and exhibit registration, routes, connections, sessions, colliders, viewpoints, guided paths, interpretation coverage, local media, and asset provenance.

### GitHub Pages deployment

The production site is hosted at:

https://da3daluscode.github.io/philosophy-museum/

Pushing to `main` triggers the GitHub Pages workflow, which installs dependencies, builds the Vite application, and deploys `dist`.

### Main routes

- `#/history`
- `#/museum`
- `#/museum/ancient-greek`
- `#/museum/renaissance-reason-revolution`
- `#/museum/modernity-freedom-critique`
- `#/branches`
- `#/map`
- `#/philosophers`
- `#/compare`
- `#/learning`

Every Museum exhibit also has a direct route, such as:

- `#/museum/ancient-greek/exhibits/plato`
- `#/museum/renaissance-reason-revolution/exhibits/kant`
- `#/museum/modernity-freedom-critique/exhibits/nietzsche`

### Data model

Core interfaces live in `src/types/philosophy.ts`. Most local content records live under `src/data`, including branches, philosophers, timeline events, relationships, learning paths, Museum catalogs, interpretations, hall layouts, and asset metadata.

Stable IDs connect records without a database. Content and runtime integrity are checked by repository audit scripts.

### Adding content

- **Branch:** Add or extend a complete branch record and connect related branch and philosopher IDs.
- **Philosopher:** Add a philosopher record using existing branch IDs where appropriate.
- **Timeline event:** Add an event and connect relevant branch and philosopher IDs.
- **Learning path:** Add a path with ordered steps.
- **Museum exhibit:** Add catalog, interpretation, spatial, media, provenance, route, and audit coverage together.

Keep explanations readable, distinguish disputed membership from canonical affiliation, preserve uncertainty around dates and historical likenesses, and never invent exact quotations or provenance.

## Current limitations and future work

- The walkable Museum covers only part of philosophy's full historical and cross-cultural range.
- Source and citation depth is stronger in the long-form articles and Museum records than in some older structured summaries.
- The Philosophy Map intentionally uses a curated subset for readability.
- Some influence and relationship data could be linked more deeply.
- Visit position is stored locally, but there are no accounts or long-term reading-progress features.
- Planned work includes additional galleries, broader cross-cultural Museum coverage, stronger source layers, study tools, saved progress, quizzes, and exportable notes.
