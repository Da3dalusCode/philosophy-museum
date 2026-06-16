# Philosophy Atlas agent guide

## Project summary

Philosophy Atlas is a local-first Vite + React + TypeScript educational web app. It teaches philosophy through branches, schools, thinkers, historical timelines, relationships, comparisons, and guided learning paths.

The app has no backend, no database, no auth, no API requirement, and no deployment requirement for v1. All core content lives in local TypeScript data files under `src/data`.

## Core product goal

The product is not a generic encyclopedia and not a dashboard.

It should feel like an interactive museum/atlas of philosophical development:

* branches and schools emerge over time
* philosophers enter and redirect the conversation
* major works change the debate
* later traditions inherit, revive, oppose, or transform earlier ones
* users can explore both historical sequence and conceptual structure

The central visual metaphor is a dense interactive philosophy wall chart:

* time runs left to right
* school/branch bands persist across active periods
* philosopher markers sit near their lifetimes or active years
* major works appear as dated landmarks
* influence/development/reaction/overlap lines show relationships
* clicking items opens useful detail drawers

## Commands

Use these commands from the repo root:

```bash
npm ci
npm run dev
npm run build
npm run preview
```

Before calling a coding task complete, run:

```bash
npm run build
```

If a browser/dev-server check is requested and possible, run:

```bash
npm run dev
```

Then verify the local URL returns HTTP 200.

## Coding conventions

* Prefer small readable React components.
* Prefer TypeScript types over loose objects.
* Keep data in `src/data`.
* Keep shared types in `src/types`.
* Keep visual style in `src/styles/global.css` unless a component-specific style is clearly better.
* Do not introduce a backend, database, auth, deployment, external runtime API, or paid service unless explicitly requested.
* Do not add heavy dependencies without a strong reason.
* Do not invent exact quotes, citations, sources, images, or command output.
* Use approximate dates when exact dates are uncertain.
* Keep explanations beginner-friendly but not shallow.

## UI and visualization quality bar

For major UI or visualization changes, do not make a shallow pass.

Before editing:

* Inspect the relevant components, data files, and CSS.
* Identify the current visual model.
* Identify why that model fails the user’s stated goal.
* Define the target artifact in plain English.
* Create a concrete implementation checklist before coding.

During editing:

* Prefer one deep, coherent redesign over many small unrelated tweaks.
* Do not preserve a layout merely because it already exists.
* If the current layout is the wrong model, replace it.
* Do not stop after making the page only “somewhat better.”
* Keep working until the acceptance checklist is implemented or a specific technical blocker is reached.

For visualization work:

* The view must communicate structure before the user clicks anything.
* Time, direction, grouping, color meaning, and line meaning must be visually obvious.
* Dense information is acceptable if it is organized.
* Avoid generic card dashboards.
* Avoid decorative graphs that require long explanation.
* Every clickable element must have a visible purpose and working handler.
* Static labels must not look clickable.
* Drawers/modals should explain why the selected thing matters, not just repeat data.

## Philosophy Wall expectations

The Philosophy Wall is the central artifact.

When working on Big History or Philosophy Map:

* Preserve the wall-chart model unless explicitly asked to replace it.
* Prefer improving readability, density controls, zoom, panning, legends, and detail drawers over another conceptual rewrite.
* Big History should emphasize the historical sweep and philosopher/work/school development.
* Philosophy Map should emphasize school/branch genealogy, influence, overlap, opposition, and transformation.
* Use modes to change emphasis rather than duplicating unrelated visualizations.
* The chart should be readable at 1920x1080.
* It should also remain usable at smaller widths through scrolling, zooming, or compact controls.

## Interaction rules

* If something opens a drawer, it should look clickable.
* If something navigates, it should look like a button/link.
* If something is only a label, it should not have hover/click styling.
* No dead “open,” “explore,” or arrow controls.
* Filtering must not leave stale drawers open.
* Search should include visible names and labels, not only IDs.
* Reset controls should clear all active filters and return the view to a sensible default.

## Data/content rules

For branches:

* Include central question, historical origin, key concepts, disagreements, related branches, modern examples, and specific reading recommendations where practical.

For philosophers:

* Include dates, schools/branches, main contribution, major works, influenced-by/influenced, and beginner explanation where practical.

For readings:

* Recommend specific books, essays, dialogues, or works.
* Do not fabricate page numbers or citations.

For images:

* Use fallback medallions when no reliable image is available.
* Do not invent image sources or licenses.

## Verification

Before final response:

* Run `npm run build`.
* Inspect relevant handlers and navigation callbacks directly.
* Verify named user flows from the prompt.
* If browser automation fails because of the Windows process sandbox, say so clearly.
* Do not use browser automation failure as an excuse to leave obvious click handlers broken.

## Final response expectations

Report:

1. Diagnosis or plan.
2. Commands run and results.
3. Files changed.
4. What changed.
5. How to test locally.
6. Known limitations.
7. Suggested next prompt.

## Content depth expectations

For content-expansion tasks, do not add shallow encyclopedia blurbs.

Deep philosopher profiles should include:
- historical context
- life story
- major questions
- main ideas
- key works
- relationship to earlier philosophers
- influence on later philosophers
- branch/school connections
- controversies or interpretive tensions
- beginner explanation
- recommended reading path
- image metadata when reliable

Deep branch/school pages should include:
- central question
- origin story
- historical development
- major philosophers
- major works
- key concepts
- internal disagreements
- rival schools
- modern relevance
- common misunderstandings
- suggested reading path
- links to related timeline/wall items

For image work:
- Prefer Wikimedia Commons or other clearly reusable/public-domain sources.
- Do not invent image URLs, authors, credits, or licenses.
- Store image source URL, credit, and license text in data.
- Use fallback medallions when reliable image metadata is unavailable.
- The UI should show attribution/source information where practical.

For source/reference work:
- Prefer source links to SEP, IEP, Wikipedia, Wikidata, Internet Archive, Project Gutenberg, Perseus, or public-domain primary texts.
- Do not copy long passages.
- Use original summaries.
- Do not fabricate page numbers or exact citations.
