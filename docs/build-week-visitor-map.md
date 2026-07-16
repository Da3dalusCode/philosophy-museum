# Build Week: Museum visitor map

> Historical handoff snapshot for the visitor-map checkpoint at commit `c3eb4a9`. Branch and deployment statements below describe that checkpoint only; current Ring-pilot and production status is governed by `main`, the Ring implementation record, and the GitHub Pages workflow. No Build Week Session ID was recorded.

## Baseline and branch

- Authoritative baseline: `39007cf1480900e16cd24bdd8ba1820fd4779a41`
- Feature branch: `codex/museum-visitor-map`
- Baseline source: refreshed `origin/main`
- Production deployment status: **not yet deployed**

## Feature goal

Add a believable, contemporary physical visitor-map kiosk to the right side of the Hall I entrance. The object must remain visible from the authored spawn without blocking the central gallery sightline. Approaching it exposes keyboard, touch, and ray-click interaction; the resulting accessible DOM map shows every registered gallery and travels through the existing Museum session, route, and hall-activation system to an authored safe spawn.

## Implementation

- `src/data/museum/museumVisitorMap.ts` — centralized kiosk placement, interaction range, visual-map positions, and typed safe-destination policy; it contains no duplicated hall titles or descriptions.
- `src/data/museum/museumWorldDefinitions.ts` and `museumVisitorMapProjection.ts` — one data-only manifest drives the lazy runtime registry plus both map renderings; graph edges and gallery labels cannot drift from registered connections or the Museum catalog.
- `src/data/museum/ancientGreekHall.ts` — replaces the right-side entrance bench with the shared collision-backed kiosk furnishing.
- `src/components/MuseumGallery/MuseumVisitorMapKiosk.tsx` — code-native limestone, black-metal, bronze, illuminated screen, and local map graphic inside the existing Hall I scene.
- `src/components/MuseumGallery/MuseumWorldScene.tsx` and `museumRuntime.ts` — publish one discriminated nearby interaction target for exhibits or the visitor map.
- `src/components/MuseumGallery/useMuseumControls.ts` and `MuseumPage.tsx` — reuse E/Enter, touch, scene-click suppression, session saving, Pointer Lock release/resume, hall activation, and route pushes. `M` remains dedicated to the complete directory.
- `src/components/MuseumGallery/MuseumModal.tsx` — extracts the existing dialog focus trap, Escape, backdrop, inert-background, and focus-return behavior for reuse.
- `src/components/MuseumGallery/MuseumVisitorMap.tsx` and `museum.css` — data-driven connected-hall diagram, current-location state, catalog descriptions, safe-travel action, and narrow/touch layout.
- `scripts/auditMuseum.mjs` — adds deterministic registered-hall coverage, destination, map-integrity, placement, desktop/portrait frustum, rendered-yaw collision, approach-path, line-of-sight, front-side interaction, responsive-layout, focus-return, and reuse assertions.

## Validation performed

Before editing, the full repository suite passed at the baseline SHA:

```text
npm run build
npm run audit:routing
npm run audit:museum
npm run audit:museum-assets
npm run audit:integrity
npm run audit:articles
npm run audit:accuracy
npm run report:coverage
npm run report:bundle
git diff --check
```

After implementation:

- `npm run build` — pass; TypeScript and Vite production build completed, with only the repository's existing large-chunk advisory.
- `npm run audit:routing` — pass, 25 groups.
- `npm run audit:museum` — pass, 23 groups covering all six halls plus visitor-map placement, registry projection, destination integrity, rotated collision, portrait visibility, and approach safety.
- `npm run audit:museum-assets` — pass, 9 groups covering 96 assets and 192 local derivatives.
- `npm run audit:integrity`, `npm run audit:articles`, and `npm run audit:accuracy` — pass.
- `npm run report:coverage` — 141/141 philosopher and 43/43 branch articles covered.
- `npm run report:bundle` — pass; final Museum page chunk 325,119 raw bytes / 98,488 gzip bytes.
- `git diff --check` — pass; PowerShell reported only line-ending conversion notices.
- Direct baseline browser observation at 1280×720 confirmed the original open `x=0` sightline, left orientation plinth, and visible right-side furnishing slot used by the kiosk.
- The in-app browser subsequently rejected local-page reload and screenshot access under its URL security policy. Post-change desktop, narrow, immersive, fullscreen, console, request, and interaction observations therefore require the local review steps below; no alternate browser surface was used to bypass that restriction.

## Screenshot paths

- `docs/screenshots/museum-visitor-map-baseline.png` — direct pre-change 1280×720 entrance reference showing the unobstructed central sightline and original right-side bench slot.
- Post-change screenshots: not captured because the in-app browser blocked further access to the local URL. Capture desktop and narrow review images during the local demonstration before Build Week submission.

## Final commit

This document ships in the coherent Build Week visitor-map feature commit. Its exact SHA is reported in the final handoff and visible with:

```powershell
git log -1 --oneline
```

## Local demonstration

1. From the repository root, run `npm run dev -- --host 127.0.0.1`.
2. Open `http://127.0.0.1:5173/philosophy-museum/#/museum/ancient-greek`.
3. Confirm the illuminated map kiosk appears to the right of the initial spawn and the central passage remains open.
4. Choose **Enter museum**, approach the kiosk, and use E/Enter. On touch, use the contextual interaction action. A close ray-click on the kiosk should open the same map; a remote click from spawn should not.
5. Confirm the map marks Gallery 01 as **You are here**, shows all registered galleries, and displays the selected hall’s gallery number, period, description, and historical sweep.
6. Travel to each gallery. Confirm every selection arrives at its authored safe spawn, updates the URL/current-hall marker, and leaves movement safely unentered or paused.
7. Use Back and Forward across several map choices. Confirm saved source positions and authored map arrivals remain predictable.
8. Close with the X button, backdrop, and Escape. Confirm focus returns appropriately and an actively exploring visit safely reacquires Pointer Lock or falls back to drag-look.
9. Press M and confirm the existing complete directory, exhibit links, room viewpoints, and guided visit remain unchanged.
10. Repeat the map flow in a narrow viewport, immersive mode, and browser fullscreen; check the console and Network panel for errors or first-party 404s.

At the `c3eb4a9` checkpoint, nothing in this visitor-map feature was merged or deployed by that work. This is historical status, not a claim about the later Ring-pilot release.
