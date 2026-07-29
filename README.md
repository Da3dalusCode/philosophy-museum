# Philosophy Atlas

**An interactive guide to philosophy as a connected history of ideas.**

[Explore the live site](https://da3daluscode.github.io/philosophy-museum/) · [Enter the walkable museum](https://da3daluscode.github.io/philosophy-museum/#/museum)

Philosophy Atlas is a free educational website and digital museum for exploring philosophers, traditions, arguments, historical developments, and relationships between ideas. It combines detailed written guides with timelines, maps, comparisons, learning paths, and a continuously walkable 3D museum.

No account, subscription, download, or special software is required. Everything runs in the browser.

## What is inside

- **43 philosophical branches and traditions**, from ancient schools to modern movements
- **146 philosopher profiles** with historical context, major works, central ideas, and related thinkers
- **Big History**, a filterable timeline connecting events, branches, and philosophers
- **Branch Explorer**, with long-form introductions, key concepts, debates, readings, and source links
- **Philosophy Map**, showing selected relationships between traditions and thinkers
- **Compare**, for side-by-side branch and philosopher comparisons
- **Learning Paths**, with guided routes through major themes and periods
- **A one-level 26-gallery 3D museum** with 14 curated/open galleries, 12 honest planned/walkable shells, 105 named rooms, and two closed expansion reserves

## The walkable museum

The Museum presents philosophy as a physical journey through the implemented **Continuous Enfilade**. A chronological route crosses all 26 gallery shells in six structural bands; a 10 m north–south crosscut provides six alternate intersections, including the independent Core Questions Forum. Five bounded turn courts connect the bands, and a Final Return threshold closes the full route.

The public state is deliberately mixed: the 14 galleries listed below are curated and open, while Gallery 13 and Galleries 16–26 remain named, blank, walkable architectural shells with one truthful planned-status sign and no fabricated exhibits or fast-travel controls.

1. **Mediterranean Beginnings & Classical Athens**
   Ionian natural explanation, disputes over being and change, civic argument, Socrates, Plato, Aristotle, Platonism, and Aristotelianism

2. **Renaissance, Political Order, and New Science**
   Machiavelli, Marsilio Ficino, Francis Bacon, Galileo Galilei, and Hobbes across recovery, statecraft, experimental method, sovereignty, and materialism

3. **Phenomenology, Existence, and Embodiment**
   Husserl, Heidegger, Merleau-Ponty, Sartre, Camus, Levinas, Gadamer, and the Phenomenology and Existentialism traditions

4. **Analytic Traditions: Logic, Language, and Analysis**
   Frege, Russell, G. E. Moore, Wittgenstein, Quine, Anscombe, and Analytic Philosophy

5. **Political Action, Justice, and Democratic Reason**
   Political Philosophy, Arendt, Rawls, Nozick, and Martha Nussbaum

6. **Core Questions Forum**
   Comparative rooms for reality, knowledge, mind and self, logic and language, science, aesthetics, religion, and outward routes to historically situated traditions; Jiddu Krishnamurti appears in Mind & Self

7. **Classical South Asia: Jain, Yoga, and Brahmanical Systems**

8. **Buddhist Philosophies of Liberation and Knowledge**

9. **Warring States & Classical Chinese Traditions**

10. **Arabic & Islamic Philosophical Worlds**

11. **Confucian Renewal & East Asian Continuities**

12. **Jewish Philosophy in Arabic-Speaking & Mediterranean Worlds**

14. **Hellenistic & Roman Ways of Life**
    Cynic public refusal, Epicurean therapy, Stoic systems and exercises, and rival Academic and Pyrrhonian skeptical lineages

15. **Late Antiquity: Neoplatonism, Commentary, and Inheritance**
    Pagan and Christian Platonisms, commentary classrooms, translation networks, and distinct Byzantine, Arabic, Latin, Jewish, and Renaissance afterlives

Every curated exhibit has a walkable installation, focused interpretation, structured facts, and a link to the full philosopher or branch article. The 14 curated galleries contain 132 primary exhibits and 198 supplemental/context installations. Provenance-backed media is used where reliable reusable imagery or documents are available; media is not added merely to fill a quota.

The physical visitor map is generated from the same compiled manifest that places gallery shells, rooms, crosscut intersections, turn courts, doors, safe arrivals, the entrance, final threshold, and reserves. It shows all 26 stable gallery numbers and titles, distinguishes curated/open from planned/walkable, tracks current position and facing, and limits fast travel to the 14 curated galleries.

### Museum controls

- Choose **Enter museum** to begin.
- Use **W A S D** or the arrow keys to move.
- Move the mouse to look around when Pointer Lock is available; click and drag is the fallback.
- Press **E** or **Enter** near an exhibit to open it.
- Press **M** for the visitor map, **R** to reset, and **Escape** to pause. The Directory has its own visible control.
- Touch controls, guided visits, fullscreen, immersive mode, and a complete non-WebGL directory are also available.

## Who this is for

Philosophy Atlas is intended for curious readers, students, teachers, and anyone who wants more structure than a list of famous names. The goal is to make philosophy approachable without making it shallow: ideas are placed in historical context, connected to neighboring traditions, and supported by routes for deeper reading.

## Project status

The project is actively being developed.

Current written coverage includes all **146 philosophers** and **43 branches** in the Atlas. The Museum program and its implemented architecture are locked at 10 wings, 26 galleries, and 105 rooms. Twelve galleries are curated/open; fourteen complete planned shells remain walkable but uncurated; two 56 × 28 m expansion reserves remain physically closed. Retired Museum URLs resolve through aliases or explanatory handoffs, and displaced records remain available in the Atlas. Museum media includes structured provenance and rights metadata; citation depth across the wider Atlas is still being improved.

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
npm run check:museum-building
npm run validate:museum-masterplan
npm run validate:museum-building-plan
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

The Museum audits cover the approved masterplan, the exact compiled 26-gallery/105-room geometry, canonical hall-template contracts, endpoint-owned openings and closures, curated and planned states, public and compatibility routes, through-route/crosscut/turn-court reachability, closed reserves, decoded-texture-budgeted residency, map correspondence, stable-ID sessions, movement and colliders, viewpoints, guided paths, interpretation coverage, local media, and asset provenance.

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

Core interfaces live in `src/types/philosophy.ts`. Most local content records live under `src/data`, including branches, philosophers, timeline events, relationships, learning paths, Museum catalogs, interpretations, hall layouts, and asset metadata. The Museum’s production physical placement and circulation contract lives in `src/data/museum/museumContinuousEnfiladeManifest.json`; `museumBuildingManifest.json` is retained only as the rollback-era Ring artifact. Executable canonical hall-template contracts live in `src/data/museum/museumHallTemplates.ts`.

Stable IDs connect records without a database. Content and runtime integrity are checked by repository audit scripts.

### Adding content

- **Branch:** Add or extend a complete branch record and connect related branch and philosopher IDs.
- **Philosopher:** Add a philosopher record using existing branch IDs where appropriate.
- **Timeline event:** Add an event and connect relevant branch and philosopher IDs.
- **Learning path:** Add a path with ordered steps.
- **Museum exhibit:** Add catalog, interpretation, spatial, media, provenance, route, and audit coverage together.

Keep explanations readable, distinguish disputed membership from canonical affiliation, preserve uncertainty around dates and historical likenesses, and never invent exact quotations or provenance.

## Current limitations and future work

- The full 26-gallery, 105-room building is walkable. Galleries 01–12 and 14–15 are curated/open exhibitions; Gallery 13 and Galleries 16–26 remain honest planned architectural shells.
- Source and citation depth is stronger in the long-form articles and Museum records than in some older structured summaries.
- The Philosophy Map intentionally uses a curated subset for readability.
- Some influence and relationship data could be linked more deeply.
- Visit position is stored locally, but there are no accounts or long-term reading-progress features.
- Planned work includes curating Galleries 13–26 in place, broader cross-cultural Museum coverage, stronger source layers, study tools, saved progress, quizzes, and exportable notes. Planned shells remain walkable but expose no exhibits, guided routes, or fast travel until their curation is complete.
