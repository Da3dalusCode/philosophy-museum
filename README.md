# Philosophy Atlas

**An interactive guide to philosophy as a connected history of ideas.**

[Explore the live site](https://da3daluscode.github.io/philosophy-museum/) · [Enter the walkable museum](https://da3daluscode.github.io/philosophy-museum/#/museum)

Philosophy Atlas is a free educational website and digital museum for exploring philosophers, traditions, arguments, historical developments, and relationships between ideas. It combines detailed written guides with timelines, maps, comparisons, learning paths, and a continuously walkable 3D museum.

No account, subscription, download, or special software is required. Everything runs in the browser.

## What is inside

- **43 philosophical branches and traditions**, from ancient schools to modern movements
- **144 philosopher profiles** with historical context, major works, central ideas, and related thinkers
- **Big History**, a filterable timeline connecting events, branches, and philosophers
- **Branch Explorer**, with long-form introductions, key concepts, debates, readings, and source links
- **Philosophy Map**, showing selected relationships between traditions and thinkers
- **Compare**, for side-by-side branch and philosopher comparisons
- **Learning Paths**, with guided routes through major themes and periods
- **A six-hall 3D museum** with 61 interpreted primary exhibits inside a compact, walkable Ring of Wings

## The walkable museum

The Museum presents philosophy as a physical journey through five permanent outer-loop halls and the central Core Questions Forum. The six live halls form a truthful, continuously walkable subset of the approved 26-hall Ring of Wings; eleven blocked thresholds mark staged insertion and outward-expansion points without presenting the other twenty planned halls as open.

1. **Mediterranean Beginnings & Classical Athens**
   Ionian natural explanation, disputes over being and change, civic argument, Socrates, Plato, Aristotle, Platonism, and Aristotelianism

2. **Renaissance, Political Order, and New Science**
   Machiavelli, Francis Bacon, and Hobbes across statecraft, experimental method, sovereignty, and materialism

3. **Phenomenology, Existence, and Embodiment**
   Husserl, Heidegger, Merleau-Ponty, Sartre, Camus, Levinas, Gadamer, and the Phenomenology and Existentialism traditions

4. **Analytic Traditions: Logic, Language, and Analysis**
   Frege, Russell, G. E. Moore, Wittgenstein, Quine, Anscombe, and Analytic Philosophy

5. **Political Action, Justice, and Democratic Reason**
   Political Philosophy, Arendt, Rawls, Nozick, and Martha Nussbaum

6. **Core Questions Forum**
   Comparative rooms for reality, knowledge, mind and self, logic and language, science, aesthetics, religion, and outward routes to historically situated traditions; Jiddu Krishnamurti appears in Mind & Self

Every exhibit has a walkable installation, focused interpretation, structured facts, and a link to the full philosopher or branch article. The live roster uses 66 local, provenance-backed media placements where reliable reusable images or documents are available; media is not required merely to fill a quota.

The physical visitor map is generated from the same building manifest that places walls, corridors, doors, and safe arrivals. It distinguishes the walkable loop and central spokes from six labeled fast-travel actions and from visibly blocked future insertion or expansion portals.

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

Current written coverage includes all **144 philosophers** and **43 branches** in the Atlas. The long-term Museum program is locked at 10 wings, 26 halls, and 105 rooms or zones. The implemented canonical-six phase opens five permanent outer-loop halls plus the central Core Questions Forum, with 29 rooms, 61 primary exhibits, and 19 reserve slots. Retired Museum URLs resolve through aliases or explanatory handoffs, and displaced records remain available in the Atlas. Museum media includes structured provenance and rights metadata; citation depth across the wider Atlas is still being improved.

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
node scripts/validateMuseumMasterplan.mjs
npm run audit:routing
npm run audit:museum
npm run audit:museum-assets
npm run audit:integrity
npm run audit:articles
npm run audit:accuracy
npm run report:coverage
npm run report:bundle
npm run generate:museum-diagram
```

The Museum audits cover the approved masterplan, canonical hall-template contracts, endpoint-owned openings and closures, hall and exhibit registration, public and compatibility routes, loop and spoke reachability, blocked reservations, decoded-texture-budgeted residency, map correspondence, sessions, movement and colliders, viewpoints, guided paths, interpretation coverage, local media, and asset provenance.

### GitHub Pages deployment

The production site is hosted at:

https://da3daluscode.github.io/philosophy-museum/

Pushing to `main` triggers the GitHub Pages workflow, which installs dependencies, builds the Vite application, and deploys `dist`.

### Main routes

- `#/history`
- `#/museum`
- `#/museum/mediterranean-beginnings-classical`
- `#/museum/renaissance-humanism-new-method`
- `#/museum/phenomenology-existence-embodiment`
- `#/museum/analytic-traditions`
- `#/museum/justice-democratic-reason`
- `#/museum/core-questions-forum`
- `#/branches`
- `#/map`
- `#/philosophers`
- `#/compare`
- `#/learning`

Every Museum exhibit also has a direct route, such as:

- `#/museum/mediterranean-beginnings-classical/exhibits/plato`
- `#/museum/renaissance-humanism-new-method/exhibits/bacon`
- `#/museum/phenomenology-existence-embodiment/exhibits/sartre`
- `#/museum/analytic-traditions/exhibits/wittgenstein`
- `#/museum/justice-democratic-reason/exhibits/rawls`
- `#/museum/core-questions-forum/exhibits/jiddu-krishnamurti`

### Data model

Core interfaces live in `src/types/philosophy.ts`. Most local content records live under `src/data`, including branches, philosophers, timeline events, relationships, learning paths, Museum catalogs, interpretations, hall layouts, and asset metadata. The Museum’s physical placement and circulation contract lives in `src/data/museum/museumBuildingManifest.json`; its executable canonical hall-template contracts live in `src/data/museum/museumHallTemplates.ts`.

Stable IDs connect records without a database. Content and runtime integrity are checked by repository audit scripts.

### Adding content

- **Branch:** Add or extend a complete branch record and connect related branch and philosopher IDs.
- **Philosopher:** Add a philosopher record using existing branch IDs where appropriate.
- **Timeline event:** Add an event and connect relevant branch and philosopher IDs.
- **Learning path:** Add a path with ordered steps.
- **Museum exhibit:** Add catalog, interpretation, spatial, media, provenance, route, and audit coverage together.

Keep explanations readable, distinguish disputed membership from canonical affiliation, preserve uncertainty around dates and historical likenesses, and never invent exact quotations or provenance.

## Current limitations and future work

- The walkable Museum covers only part of philosophy's full historical and cross-cultural range; the six permanent halls are the first implemented subset of the final 26-hall intellectual program.
- Source and citation depth is stronger in the long-form articles and Museum records than in some older structured summaries.
- The Philosophy Map intentionally uses a curated subset for readability.
- Some influence and relationship data could be linked more deeply.
- Visit position is stored locally, but there are no accounts or long-term reading-progress features.
- Planned work includes constructing the other twenty approved halls, broader cross-cultural Museum coverage, stronger source layers, study tools, saved progress, quizzes, and exportable notes. Future portals remain physically blocked until their content and circulation are complete.
