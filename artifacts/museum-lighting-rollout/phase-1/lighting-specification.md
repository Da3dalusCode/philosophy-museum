# Museum lighting rollout — Phase 1 implementation specification

> Investigation and design artifact only. No production source, commit, push, build, deployment, or runtime configuration was changed.

## Source gate and authority

The surveyed state is exact: local HEAD, cached `origin/main`, GitHub `main`, the successful GitHub Pages workflow, and deployment 5897064925 all resolve to `be7765691a30383b012208a40cf9ed93a9be519a`. The tracked worktree was clean. Pre-existing untracked `.codex/config.toml`, `artifacts/`, and `tmp/` did not overlap tracked source or this new artifact path.

The authoritative public order is the Continuous Enfilade route exposed by `MUSEUM_PUBLIC_ROUTE_HALL_IDS`. The active building export comes from `src/data/museum/museumBuildingManifest.ts`; the similarly named old Ring JSON and stale gallery-number comments are not numbering or placement authority. Runtime definitions supply final `layout.exhibits`, final `layout.supplementalExhibits`, compiled walls, active portals, and the manifest world transform. The schedule never infers targets from nominal room capacity.

Key evidence paths:

- `src/data/museum/museumPublicRoute.ts:1-35` — public order.
- `src/data/museum/museumBuildingManifest.ts:199-278` and `museumContinuousEnfiladeManifest.json` — active physical manifest.
- `src/data/museum/canonicalMuseumHalls.ts:354-426, 981-1457, 2215-2400` — final supplemental selection, scale floors, curation/placement, collision checks, and lighting assembly.
- `src/components/MuseumGallery/museumWorldTransform.ts:5-24` and `src/data/museum/museumBuildingRuntime.ts:571` — exact local/world transform.
- `src/data/museum/galleryLightingPrototypes.ts:10-19, 154-379` — locked Gallery 01/02 fixture construction and physical profiles.
- `src/data/museum/museumExhibitLightingPlan.ts:40-335` — current generic target/grouping behavior that Prompt 2 must supersede for Galleries 03–26.
- `src/components/MuseumGallery/ContemporaryHallArchitecture.tsx:411-597` — instanced visible fixtures and modeled recessed form.
- `src/components/MuseumGallery/ContemporaryHallLighting.tsx:17-88` — bounded shared runtime illumination and shadow ownership.
- `src/components/MuseumGallery/museumResidency.ts:30`, `src/data/museum/museumTextureBudget.ts:286`, `src/components/MuseumGallery/MuseumWorldScene.tsx:711`, and `src/components/MuseumGallery/useMuseumControls.ts:227` — residency, texture, mobile, shadow, and pointer-lock contracts.

## Final design decisions

The final resolved graph contains **603 actual installations** (192 primary + 411 supplemental). Galleries 03–26 contain **551** of them. The proposed schedule contains **603 independently accountable accent fixtures** and **zero intentional inter-installation sharing groups**.

Gallery 01 and Gallery 02 remain locked. Their current approved prototype schedules are copied into the manifest solely as reference baselines. No alternatives were reopened.

Classification is physical, not thematic:

- Gallery 01 track standard: elongated three-/four-room serial shells. Each physical room owns segmented peripheral tracks, route-parallel ambient diffusers, independent heads, a low-output center circulation recess, and a separate shielded internal-threshold continuation.
- Gallery 02 recessed standard: compact five-room sequences, two-room compact halls, and crossroads/baffle hubs. Each actual installation receives a circular recessed gimbal with a modeled cutout/baffle; rooms receive short ambient slots and restrained circulation fill.
- No gallery requires a hybrid or bespoke classification. Geometry-specific declarative source relocations remain within the applicable standard.

## Gallery count and classification matrix

| Gallery | Runtime hall | Primary | Supplemental | Installations / accents | Standard | Shared groups | Overrides |
|---:|---|---:|---:|---:|---|---:|---:|
| 01 | `mediterranean-beginnings-classical` | 22 | 5 | 27 / 27 | gallery 01 track standard | 0 | 1 |
| 02 | `hellenistic-roman-ways` | 18 | 7 | 25 / 25 | gallery 02 recessed standard | 0 | 1 |
| 03 | `late-antiquity-inheritance` | 9 | 9 | 18 / 18 | gallery 01 track standard | 0 | 0 |
| 04 | `classical-south-asian-worlds` | 9 | 21 | 30 / 30 | gallery 02 recessed standard | 0 | 0 |
| 05 | `buddhist-philosophies` | 7 | 23 | 30 / 30 | gallery 02 recessed standard | 0 | 0 |
| 06 | `classical-chinese-traditions` | 12 | 12 | 24 / 24 | gallery 02 recessed standard | 0 | 4 |
| 07 | `east-asian-continuities` | 2 | 16 | 18 / 18 | gallery 01 track standard | 0 | 0 |
| 08 | `islamic-philosophical-worlds` | 9 | 21 | 30 / 30 | gallery 02 recessed standard | 0 | 0 |
| 09 | `jewish-philosophy` | 3 | 9 | 12 / 12 | gallery 02 recessed standard | 0 | 0 |
| 10 | `latin-christian-scholastic` | 10 | 14 | 24 / 24 | gallery 01 track standard | 0 | 0 |
| 11 | `core-questions-forum` | 15 | 10 | 25 / 25 | gallery 02 recessed standard | 0 | 9 |
| 12 | `renaissance-humanism-new-method` | 5 | 13 | 18 / 18 | gallery 01 track standard | 0 | 0 |
| 13 | `rationalism-mind-nature-system` | 5 | 13 | 18 / 18 | gallery 01 track standard | 0 | 0 |
| 14 | `empiricism-science-political-order` | 4 | 14 | 18 / 18 | gallery 01 track standard | 0 | 0 |
| 15 | `enlightenment-revolution-kant` | 6 | 20 | 26 / 26 | gallery 02 recessed standard | 0 | 4 |
| 16 | `german-idealism-afterlives` | 5 | 20 | 25 / 25 | gallery 01 track standard | 0 | 0 |
| 17 | `utility-liberty-history-capital` | 4 | 21 | 25 / 25 | gallery 01 track standard | 0 | 0 |
| 18 | `faith-pessimism-life-value` | 4 | 14 | 18 / 18 | gallery 01 track standard | 0 | 0 |
| 19 | `pragmatism-democratic-inquiry` | 4 | 20 | 24 / 24 | gallery 01 track standard | 0 | 0 |
| 20 | `analytic-traditions` | 7 | 23 | 30 / 30 | gallery 02 recessed standard | 0 | 0 |
| 21 | `phenomenology-existence-embodiment` | 9 | 21 | 30 / 30 | gallery 02 recessed standard | 0 | 0 |
| 22 | `critique-power-deconstruction` | 4 | 20 | 24 / 24 | gallery 02 recessed standard | 0 | 5 |
| 23 | `moral-life-practical-reason` | 8 | 16 | 24 / 24 | gallery 02 recessed standard | 0 | 4 |
| 24 | `justice-democratic-reason` | 5 | 13 | 18 / 18 | gallery 01 track standard | 0 | 0 |
| 25 | `feminist-philosophies` | 3 | 21 | 24 / 24 | gallery 02 recessed standard | 0 | 4 |
| 26 | `colonialism-race-liberation` | 3 | 15 | 18 / 18 | gallery 01 track standard | 0 | 0 |

## Fixture, ambient, and renderer rules

### Gallery 01 track standard

New track-standard rooms use six physical rail segments per room: route-parallel side rails at local `x=±8.65`, ending 1.55 m before room boundaries, plus four 6.1 m return segments at `z=min+3.05` and `z=max−3.05`, split into west/east halves so no rail crosses the central route. Track y is `ceiling−0.23`; head y is `ceiling−0.28`; maximum scheduled aim is 50°. A side-facing head is projected onto its owning side rail; an end-facing head is mounted on the appropriate return. Every source names its exact segment in the manifest.

Two 3000 K route-parallel diffusers at local `x=±2.9` occupy each room, stop 1.55 m before internal boundaries, and retract 4.7 m at a live exterior end portal. A separate low-glare center recess prevents a dark room center. A shielded 3000 K passage illuminator occupies each internal opening; it is not a track, does not cross a wall, and is independently circuited. Existing emissive threshold anchors remain over external portals; no new ceiling element enters their landing.

### Gallery 02 recessed standard

Each accent is a genuinely recessed circular gimbal: mount inset 0.035 m, cutout radius 0.148 m, baffle depth 0.34 m, optic-center inset 0.16 m, 3000 K, and maximum aim 50°. The normal source is the resolved installation origin plus 2.35 m along its final presentation normal, at `ceiling−0.035`. Declared portal-clearance exceptions replace that coordinate only where the normal source enters a live landing/crosscut.

New recessed-standard rooms receive two short 3000 K slots, each 3.0×0.50 m, centered 0.72 m to either side of the physical-room center. The 0.94 m clear gap between the slots contains a 0.12 m-radius low-glare circulation recess without overlap. Serial internal openings receive independent shielded passage recesses. Crossroads add center and four-arm circulation fill at `(0,0)`, `(±5.4,0)`, and `(0,±5.4)` while retaining a center recess in each physical bay. Gallery 02 itself keeps its approved 3.0×0.62 m / ±0.45 m prototype slots unchanged.

### Beam and sharing schedule

The Gallery 03–26 optics are coverage-derived, not decorative labels. For each installation, the aim target is the center of the union of every final resolved media rectangle. Every rectangle is expanded on each edge by the greater of 5% or 0.10 m; the generator measures the maximum angle from the source→target axis to every expanded corner, doubles it to obtain the required full field, adds 2° installation/aim reserve, and selects the next 5° optic. Required full fields span 22.11°–83.61°. The resulting categories are extra-wide-flood 202, medium 68, narrow 9, very-wide-framing-or-wallwash 7, wide-flood 265.

The manifest serializes the intended bounds, coverage target, required and selected full-field angles, reserve, and optic acceptance for every installation. A selected symmetric beam, framing projector, or asymmetric wallwash is acceptable only when its IES/projected field contains every serialized expanded-media corner. This proves that all 551 rollout installations remain physically coverable by one independently accountable fixture; it does not permit one fixture to serve two installations. A wall with two installations therefore still has two aim/coverage records. Galleries 01/02 retain their locked approved beam decisions and are not reopened.

### Runtime budget contract

Visible bodies, tracks, baffles, cutouts, slots, and downlights must remain instanced/batched architectural geometry. Do not instantiate 603 Three.js spotlights or shadow casters. Preserve the current shared active-hall ambient/hemisphere/directional model, one active directional shadow owner, `exhibitLights: []`, coarse-pointer/≤760 px low-power behavior, disabled low-power shadows/antialiasing, pointer-lock with drag-look fallback, maximum-three-hall residency, active+approach admission, the 92 MiB admission ceiling inside the 96 MiB model budget, deferred supplemental media, decoded-image caching, and disposal/texture limits.

All 26 permanent hall structures remain resident, so Prompt 2 must capture pre-change and post-change `renderer.info` plus frame-time telemetry using identical deterministic camera poses, viewport, DPR, warm-up, and 600-frame samples at dense Galleries 11/20/21 and the longest multi-hall sightlines, on desktop and coarse-pointer/≤760 px profiles. Acceptance caps: active-gallery draw calls ≤ baseline+10; long-sightline draw calls ≤ baseline+24; visible triangles ≤ baseline+150,000 per active-gallery view and ≤ baseline+400,000 at a long sightline; shared geometries ≤ baseline+12; materials ≤ baseline+8; textures exactly baseline; desktop p95 frame time ≤ max(16.7 ms, baseline+2.0 ms); low-power p95 ≤ max(33.3 ms, baseline+4.0 ms); and zero `webglcontextlost` events in a 15-minute full-route traversal with repeated Gallery 11/20/21 entry/exit. No geometry or material may be cloned per hall or fixture.

## Smallest coherent Prompt 2 architecture

1. Compile one final `ResolvedInstall[]` from the public Continuous Enfilade route and the existing resolved hall definitions after supplemental selection, scale floors, curation, collision validation, and local/world transforms.
2. Extend `MuseumLightingDefinition` with a production `lightingStandard?: { system: "track" | "recessed"; revision: "rollout-v1" }` discriminator, plus a declarative `GalleryLightingStandardByHallId` map and narrow `LightingSourceOverrideByInstallationKey` map. This field is independent of `prototypeId`; do not set `prototypeId` on Galleries 03–26 and do not add another 26-way content switch.
3. Generate track segments, recessed cutouts, ambient elements, passage/circulation elements, and one fixture source membership per resolved installation. Keep Gallery 01/02 prototype records locked and use the same geometric primitives.
4. Refactor detailed ceiling, ambient, passage/circulation, track-head, and recessed-gimbal dispatch to `lightingStandard`. Keep the existing `prototypeId` and `?museumLightingPrototype=0` behavior confined to locked Gallery 01/02 development comparison; the query must never disable Gallery 03–26 production lighting. Feed all roles to shared instanced geometry/material batches and continue to drive visual illumination through bounded shared/material response rather than per-installation WebGL lights.
5. Validate the final graph, serialize an inspectable snapshot, and fail broad/unused overrides.

The validator must prove: public route↔hall↔manifest-node bijection; primary/supplemental set equality; one physical slot and one fixture membership per installation; resolved-media corner coverage with margin/reserve; wall support; oriented collider clearance; active landing/crosscut clearance; partition/baffle and ambient-aperture clearance; track attachment; recessed ceiling attachment; fixture/cutout separation; aim envelope; source-to-target wall-ray clearance; semantic-to-physical cell aliases; portal and transform round trips; production renderer-role emission for every Gallery 03–26 independent of the prototype toggle; bounded real-light/shadow counts; the quantitative renderer caps above; and unchanged residency/texture/mobile/pointer behavior. The generated manifest’s current design-time checks all pass.

## Gallery-by-gallery reflected-ceiling schedules

Coordinates below are hall-local metres; the manifest includes every local and world coordinate, target, normal, wall collider, dimension, beam, and confidence record.

For this survey, `doorwayAdjacent` means the final oriented installation collider is within 1.50 m of an active external landing or an internal opening rectangle. It is a conservative coordination flag, not a collision finding; final accent-source clearance is validated separately.

### Gallery 01 — Mediterranean Beginnings & Classical Athens

**Runtime identity:** `mediterranean-beginnings-classical`; world transform `x=61, z=-70, yaw=1.570796`. **Resolved schedule:** 22 primary + 5 supplemental = **27 installations / 27 accents**, zero shared groups. **Classification:** gallery 01 track standard.

Locked reference. Record the approved four-room serial prototype exactly as production supplies it; do not alter its target list, segmented service-track language, diffuser geometry, or aiming decisions.

This section is a locked-reference record only. The specification adopts current approved prototype geometry and fixture coordinates from production; it proposes no change.

Physical shell: 4 physical room footprint(s), 4 runtime spatial cell(s), and 4 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z 14…28 | `med-orientation-nature` | 6 | 6 segmented rail elements; 2 route diffusers; center fill locked as approved |
| x -12…12, z 0…14 | `med-being-change-plurality` | 9 | 6 segmented rail elements; 2 route diffusers; center fill locked as approved |
| x -12…12, z -14…0 | `med-sophists-socratic` | 6 | 6 segmented rail elements; 2 route diffusers; center fill locked as approved |
| x -12…12, z -28…-14 | `med-plato-aristotle` | 6 | 6 segmented rail elements; 2 route diffusers; center fill locked as approved |

Internal passage illumination: 0 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 6.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 34.67° from nadir. Locked reference optics remain unchanged. Doorway-adjacent installation footprints: 2; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Other required exceptions/allowances:

- `g01-locked-reference` (locked): No alternative study or design change is proposed.

Oversized service envelopes: `mediterranean-beginnings-classical/supplemental/plato-republic` (4.75×4.55×1.08 m); `mediterranean-beginnings-classical/supplemental/plato-cave-book-vii` (4.75×4.55×1.08 m). Each remains a single installation with its own fixture.

Evidence: [labeled contact sheet](baseline/gallery-01-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-01-forward.png); [ceiling graze](baseline/gallery-01-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=1`.

### Gallery 02 — Hellenistic & Roman Ways of Life

**Runtime identity:** `hellenistic-roman-ways`; world transform `x=19, z=-70, yaw=-3.141593`. **Resolved schedule:** 18 primary + 7 supplemental = **25 installations / 25 accents**, zero shared groups. **Classification:** gallery 02 recessed standard.

Locked reference. Record the approved compact crossroads prototype exactly as production supplies it; do not alter its target list, circular recessed-gimbal construction, short slots, circulation recesses, or approved doorway mounts.

This section is a locked-reference record only. The specification adopts current approved prototype geometry and fixture coordinates from production; it proposes no change.

Physical shell: 4 physical room footprint(s), 4 runtime spatial cell(s), and 4 resolved semantic zone(s); ceiling 6.2–6.2 m. Existing shared-light baseline is ambient 0.5, hemisphere 0.68, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -14…0, z -14…0 | `hell-cynic-way` | 6 | 2 approved short slots at (-7, -7.45), (-7, -6.55); approved shared five-point circulation field unchanged |
| x 0…14, z -14…0 | `hell-epicurean-garden` | 6 | 2 approved short slots at (7, -7.45), (7, -6.55); approved shared five-point circulation field unchanged |
| x -14…0, z 0…14 | `hell-stoic-stoa` | 7 | 2 approved short slots at (-7, 6.55), (-7, 7.45); approved shared five-point circulation field unchanged |
| x 0…14, z 0…14 | `hell-skeptical-lineages` | 6 | 2 approved short slots at (7, 6.55), (7, 7.45); approved shared five-point circulation field unchanged |

Internal passage illumination: 0 independent element(s). External threshold anchors: `E0`, `W0`. Partition/baffle keep-outs serialized: 8.

Active landing/crosscut exclusions: `E0` center (12, 0), 4×4 m; `W0` center (-12, 0), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 42.72° from nadir. Locked reference optics remain unchanged. Doorway-adjacent installation footprints: 4; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Other required exceptions/allowances:

- `g02-locked-reference` (locked): No alternative study or design change is proposed.

Evidence: [labeled contact sheet](baseline/gallery-02-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-02-forward.png); [ceiling graze](baseline/gallery-02-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=2`.

### Gallery 03 — Late Antiquity & Neoplatonic Inheritance

**Runtime identity:** `late-antiquity-inheritance`; world transform `x=-33, z=-70, yaw=1.570796`. **Resolved schedule:** 9 primary + 9 supplemental = **18 installations / 18 accents**, zero shared groups. **Classification:** gallery 01 track standard.

Three long serial cells make the Gallery 01 language legible. Each room is an independent track/diffuser zone, including the third room whose population is entirely supplemental.

Physical shell: 3 physical room footprint(s), 3 runtime spatial cell(s), and 3 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-9.33 | `late-neoplatonic-systems` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -18.67) |
| x -12…12, z -9.33…9.33 | `late-christian-platonisms` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 0) |
| x -12…12, z 9.33…28 | `late-commentary-transmission` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 18.67) |

Internal passage illumination: 2 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 4.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.45° from nadir. Coverage-derived selected full fields: 55°–80°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 12; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-03-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-03-forward.png); [ceiling graze](baseline/gallery-03-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=3`.

### Gallery 04 — Classical South Asia: Jain, Yoga, and Brahmanical Systems

**Runtime identity:** `classical-south-asian-worlds`; world transform `x=-89, z=-70, yaw=1.570796`. **Resolved schedule:** 9 primary + 21 supplemental = **30 installations / 30 accents**, zero shared groups. **Classification:** gallery 02 recessed standard.

Five 11.2 m-deep cells are compact and heavily subdivided; a repeated track would over-articulate the short room rhythm. Use Gallery 02 recessed gimbals and short slots.

Physical shell: 5 physical room footprint(s), 5 runtime spatial cell(s), and 5 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-16.8 | `south-orientation-many-schools` | 6 | 2 short slot(s) at (0, -23.12), (0, -21.68); center fill (0, -22.4) |
| x -12…12, z -16.8…-5.6 | `south-jain-worlds` | 6 | 2 short slot(s) at (0, -11.92), (0, -10.48); center fill (0, -11.2) |
| x -12…12, z -5.6…5.6 | `south-categories-realism` | 6 | 2 short slot(s) at (0, -0.72), (0, 0.72); center fill (0, 0) |
| x -12…12, z 5.6…16.8 | `south-yoga-mind-liberation` | 6 | 2 short slot(s) at (0, 10.48), (0, 11.92); center fill (0, 11.2) |
| x -12…12, z 16.8…28 | `south-vedanta-rival-readings` | 6 | 2 short slot(s) at (0, 21.68), (0, 23.12); center fill (0, 22.4) |

Internal passage illumination: 4 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 8.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.04° from nadir. Coverage-derived selected full fields: 45°–75°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 20; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-04-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-04-forward.png); [ceiling graze](baseline/gallery-04-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=4`.

### Gallery 05 — Buddhist Philosophies of Liberation and Knowledge

**Runtime identity:** `buddhist-philosophies`; world transform `x=-61, z=-42, yaw=1.570796`. **Resolved schedule:** 7 primary + 23 supplemental = **30 installations / 30 accents**, zero shared groups. **Classification:** gallery 02 recessed standard.

Five compact cells follow the Gallery 02 recessed standard. The first cell’s end-wall installations remain outside the 4 m portal opening, and the ceiling keep-out prevents a source from being mistaken for threshold lighting.

Physical shell: 5 physical room footprint(s), 5 runtime spatial cell(s), and 5 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-16.8 | `buddhist-many-paths` | 6 | 2 short slot(s) at (0, -23.12), (0, -21.68); center fill (0, -22.4) |
| x -12…12, z -16.8…-5.6 | `buddhist-madhyamaka` | 6 | 2 short slot(s) at (0, -11.92), (0, -10.48); center fill (0, -11.2) |
| x -12…12, z -5.6…5.6 | `buddhist-abhidharma-yogacara` | 6 | 2 short slot(s) at (0, -0.72), (0, 0.72); center fill (0, 0) |
| x -12…12, z 5.6…16.8 | `buddhist-pramana` | 6 | 2 short slot(s) at (0, 10.48), (0, 11.92); center fill (0, 11.2) |
| x -12…12, z 16.8…28 | `buddhist-transmission-reserve` | 6 | 2 short slot(s) at (0, 21.68), (0, 23.12); center fill (0, 22.4) |

Internal passage illumination: 4 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 8.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.04° from nadir. Coverage-derived selected full fields: 50°–75°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 20; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-05-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-05-forward.png); [ceiling graze](baseline/gallery-05-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=5`.

### Gallery 06 — Warring States & Classical Chinese Traditions

**Runtime identity:** `classical-chinese-traditions`; world transform `x=-19, z=-42, yaw=-3.141593`. **Resolved schedule:** 12 primary + 12 supplemental = **24 installations / 24 accents**, zero shared groups. **Classification:** gallery 02 recessed standard.

Four compact bays around a cardinal cross require Gallery 02 recessed treatment. Four baffle-facing sources receive declared E0/W0 landing-clearance relocations; these are physical source overrides, not shared treatments.

Physical shell: 4 physical room footprint(s), 4 runtime spatial cell(s), and 4 resolved semantic zone(s); ceiling 6.2–6.2 m. Existing shared-light baseline is ambient 0.5, hemisphere 0.68, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -14…0, z -14…0 | `china-many-ways` | 6 | 2 short slot(s) at (-7, -7.72), (-7, -6.28); center fill (-7, -7) |
| x 0…14, z -14…0 | `china-confucian-cultivation` | 6 | 2 short slot(s) at (7, -7.72), (7, -6.28); center fill (7, -7) |
| x -14…0, z 0…14 | `china-daoist-way` | 6 | 2 short slot(s) at (-7, 6.28), (-7, 7.72); center fill (-7, 7) |
| x 0…14, z 0…14 | `china-mohist-fa` | 6 | 2 short slot(s) at (7, 6.28), (7, 7.72); center fill (7, 7) |

Internal passage illumination: 0 independent element(s). External threshold anchors: `E0`, `W0`. Partition/baffle keep-outs serialized: 8.

Active landing/crosscut exclusions: `E0` center (12, 0), 4×4 m; `W0` center (-12, 0), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 41.07° from nadir. Coverage-derived selected full fields: 30°–50°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 4; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Required declarative fixture-source overrides:

- `classical-chinese-traditions/supplemental/china-sunzi-strategic-reason` → source (-7.8, -1.5), aim 41.07°; The normal-based recessed source enters the live W0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `classical-chinese-traditions/supplemental/china-confucian-ritual-music` → source (7.8, -1.5), aim 41.07°; The normal-based recessed source enters the live E0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `classical-chinese-traditions/supplemental/china-zhuangzi-cook-ding` → source (-7.8, 1.5), aim 41.07°; The normal-based recessed source enters the live W0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `classical-chinese-traditions/supplemental/china-mohist-siege-defense` → source (7.8, 1.5), aim 41.07°; The normal-based recessed source enters the live E0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.

Evidence: [labeled contact sheet](baseline/gallery-06-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-06-forward.png); [ceiling graze](baseline/gallery-06-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=6`.

### Gallery 07 — Confucian Renewal & East Asian Continuities

**Runtime identity:** `east-asian-continuities`; world transform `x=33, z=-42, yaw=1.570796`. **Resolved schedule:** 2 primary + 16 supplemental = **18 installations / 18 accents**, zero shared groups. **Classification:** gallery 01 track standard.

Three elongated serial cells use two segmented peripheral service tracks per room. Track and diffuser continuity stops at every full-height partition and resumes as a separately owned room system.

Physical shell: 3 physical room footprint(s), 3 runtime spatial cell(s), and 3 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-9.33 | `east-song-ming-confucian` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -18.67) |
| x -12…12, z -9.33…9.33 | `east-buddhist-daoist-transmissions` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 0) |
| x -12…12, z 9.33…28 | `east-regional-continuities-reserve` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 18.67) |

Internal passage illumination: 2 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 4.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.45° from nadir. Coverage-derived selected full fields: 50°–90°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 12; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-07-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-07-forward.png); [ceiling graze](baseline/gallery-07-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=7`.

### Gallery 08 — Arabic & Islamic Philosophical Worlds

**Runtime identity:** `islamic-philosophical-worlds`; world transform `x=89, z=-42, yaw=1.570796`. **Resolved schedule:** 9 primary + 21 supplemental = **30 installations / 30 accents**, zero shared groups. **Classification:** gallery 02 recessed standard.

Parent decision: despite the 56 m shell, five 11.2 m cells are compact/subdivided, so this gallery uses Gallery 02 recessed treatment rather than copying a whole-hall track scheme.

Physical shell: 5 physical room footprint(s), 5 runtime spatial cell(s), and 5 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-16.8 | `islamic-translation-falsafa` | 6 | 2 short slot(s) at (0, -23.12), (0, -21.68); center fill (0, -22.4) |
| x -12…12, z -16.8…-5.6 | `islamic-avicennan-system` | 6 | 2 short slot(s) at (0, -11.92), (0, -10.48); center fill (0, -11.2) |
| x -12…12, z -5.6…5.6 | `islamic-kalam-critique` | 6 | 2 short slot(s) at (0, -0.72), (0, 0.72); center fill (0, 0) |
| x -12…12, z 5.6…16.8 | `islamic-andalusian-worlds` | 6 | 2 short slot(s) at (0, 10.48), (0, 11.92); center fill (0, 11.2) |
| x -12…12, z 16.8…28 | `islamic-post-avicennian` | 6 | 2 short slot(s) at (0, 21.68), (0, 23.12); center fill (0, 22.4) |

Internal passage illumination: 4 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 8.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.04° from nadir. Coverage-derived selected full fields: 50°–70°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 20; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-08-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-08-forward.png); [ceiling graze](baseline/gallery-08-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=8`.

### Gallery 09 — Jewish Philosophy in Arabic-Speaking & Mediterranean Worlds

**Runtime identity:** `jewish-philosophy`; world transform `x=82, z=-14, yaw=1.570796`. **Resolved schedule:** 3 primary + 9 supplemental = **12 installations / 12 accents**, zero shared groups. **Classification:** gallery 02 recessed standard.

Two compact 20×12 m rooms use Gallery 02 recessed gimbals. The central full-height partition opening receives separate passage fill; neither room depends on spill from the other.

Physical shell: 2 physical room footprint(s), 2 runtime spatial cell(s), and 2 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -10…10, z -12…0 | `jewish-reason-revelation` | 6 | 2 short slot(s) at (0, -6.72), (0, -5.28); center fill (0, -6) |
| x -10…10, z 0…12 | `jewish-maimonidean-crossroads` | 6 | 2 short slot(s) at (0, 5.28), (0, 6.72); center fill (0, 6) |

Internal passage illumination: 1 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 2.

Active landing/crosscut exclusions: `N0` center (0, -10), 4×4 m; `S0` center (0, 10), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.04° from nadir. Coverage-derived selected full fields: 55°–65°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 8; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-09-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-09-forward.png); [ceiling graze](baseline/gallery-09-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=9`.

### Gallery 10 — Latin Christian & Scholastic Traditions

**Runtime identity:** `latin-christian-scholastic`; world transform `x=42, z=-14, yaw=1.570796`. **Resolved schedule:** 10 primary + 14 supplemental = **24 installations / 24 accents**, zero shared groups. **Classification:** gallery 01 track standard.

Four 14 m serial rooms match the Gallery 01 architectural condition. Rails are segmented per room and do not bridge the three central openings.

Physical shell: 4 physical room footprint(s), 4 runtime spatial cell(s), and 4 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-14 | `latin-transmission-carolingian` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -21) |
| x -12…12, z -14…0 | `latin-dialectic-early-scholastic` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -7) |
| x -12…12, z 0…14 | `latin-high-scholastic` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 7) |
| x -12…12, z 14…28 | `latin-late-debates` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 21) |

Internal passage illumination: 3 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 6.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.45° from nadir. Coverage-derived selected full fields: 45°–75°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 16; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-10-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-10-forward.png); [ceiling graze](baseline/gallery-10-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=10`.

### Gallery 11 — Core Questions Forum

**Runtime identity:** `core-questions-forum`; world transform `x=0, z=-14, yaw=-3.141593`. **Resolved schedule:** 15 primary + 10 supplemental = **25 installations / 25 accents**, zero shared groups. **Classification:** gallery 02 recessed standard.

The Forum has four physical bays but nine semantic zones. It remains a Gallery 02 recessed system with a Forum crosscut override: eight sources are pulled clear of the active E/W landings and the 10 m N/S crosscuts. Four comparative lenses with a non-installed political-philosophy parent remain mandatory targets.

Physical shell: 4 physical room footprint(s), 4 runtime spatial cell(s), and 9 resolved semantic zone(s); ceiling 6.2–6.2 m. Existing shared-light baseline is ambient 0.5, hemisphere 0.68, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -14…0, z -14…0 | `forum-reality-knowledge-bay` | 6 | 2 short slot(s) at (-7, -7.72), (-7, -6.28); center fill (-7, -7) |
| x 0…14, z -14…0 | `forum-mind-language-bay` | 6 | 2 short slot(s) at (7, -7.72), (7, -6.28); center fill (7, -7) |
| x -14…0, z 0…14 | `forum-science-aesthetics-bay` | 7 | 2 short slot(s) at (-7, 6.28), (-7, 7.72); center fill (-7, 7) |
| x 0…14, z 0…14 | `forum-practical-religion-bay` | 6 | 2 short slot(s) at (7, 6.28), (7, 7.72); center fill (7, 7) |

Internal passage illumination: 0 independent element(s). External threshold anchors: `N0`, `S0`, `E0`, `W0`. Partition/baffle keep-outs serialized: 8.

Active landing/crosscut exclusions: `N0` center (0, -12), 10×4 m; `S0` center (0, 12), 10×4 m; `E0` center (12, 0), 4×4 m; `W0` center (-12, 0), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 32.72° from nadir. Coverage-derived selected full fields: 25°–45°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 12; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Required declarative fixture-source overrides:

- `core-questions-forum/primary/philosophy-of-language` → source (1.5, -9.4), aim 32.72°; The normal-based recessed source enters the live N0 10 m crosscut landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `core-questions-forum/supplemental/forum-mulla-sadra-existence` → source (-1.5, -9.4), aim 31.52°; The normal-based recessed source enters the live N0 10 m crosscut landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `core-questions-forum/supplemental/forum-dignaga-pramana` → source (-9.4, -1.2), aim 31.24°; The normal-based recessed source enters the live W0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `core-questions-forum/supplemental/forum-mozi-standards` → source (9.4, -1.2), aim 31.24°; The normal-based recessed source enters the live E0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `core-questions-forum/supplemental/forum-avicenna-demonstration` → source (-1.5, 9.4), aim 31.52°; The normal-based recessed source enters the live S0 10 m crosscut landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `core-questions-forum/supplemental/forum-maimonides-law` → source (9.4, 1.2), aim 32.02°; The normal-based recessed source enters the live E0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `core-questions-forum/supplemental/forum-confucian-music` → source (-9.4, 1.2), aim 32.02°; The normal-based recessed source enters the live W0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `core-questions-forum/supplemental/forum-al-ghazali-causation` → source (1.5, 9.4), aim 32.31°; The normal-based recessed source enters the live S0 10 m crosscut landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.

Other required exceptions/allowances:

- `g11-comparative-parent-allowance` (required): Four installed Forum lenses reference political-philosophy as a comparative parent although that primary is not physically installed in the Forum; preserve all four records.

Evidence: [labeled contact sheet](baseline/gallery-11-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-11-forward.png); [ceiling graze](baseline/gallery-11-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=11`.

### Gallery 12 — Renaissance, Political Order, and New Science

**Runtime identity:** `renaissance-humanism-new-method`; world transform `x=-42, z=-14, yaw=1.570796`. **Resolved schedule:** 5 primary + 13 supplemental = **18 installations / 18 accents**, zero shared groups. **Classification:** gallery 01 track standard.

Three elongated serial rooms use Gallery 01 track treatment. The 4.85 m Hobbes Materialism/Motion footprint is an oversized service-envelope flag and receives a wide beam without sharing.

Physical shell: 3 physical room footprint(s), 3 runtime spatial cell(s), and 3 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-9.33 | `early-statecraft-republic` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -18.67) |
| x -12…12, z -9.33…9.33 | `early-experiment-method` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 0) |
| x -12…12, z 9.33…28 | `early-sovereignty-materialism` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 18.67) |

Internal passage illumination: 2 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 4.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 37.79° from nadir. Coverage-derived selected full fields: 40°–80°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 12; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Oversized service envelopes: `renaissance-humanism-new-method/supplemental/hobbes-materialism-motion` (4.85×4.46×1.05 m). Each remains a single installation with its own fixture.

Evidence: [labeled contact sheet](baseline/gallery-12-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-12-forward.png); [ceiling graze](baseline/gallery-12-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=12`.

### Gallery 13 — Rationalism: Mind, Nature, and System

**Runtime identity:** `rationalism-mind-nature-system`; world transform `x=-98, z=-14, yaw=1.570796`. **Resolved schedule:** 5 primary + 13 supplemental = **18 installations / 18 accents**, zero shared groups. **Classification:** gallery 01 track standard.

Three elongated serial rooms use Gallery 01 track treatment. End-wall display pairs remain individually aimed and outside the central portal clear width.

Physical shell: 3 physical room footprint(s), 3 runtime spatial cell(s), and 3 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-9.33 | `rationalism-cartesian-foundations` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -18.67) |
| x -12…12, z -9.33…9.33 | `rationalism-spinoza-conway` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 0) |
| x -12…12, z 9.33…28 | `rationalism-leibniz-system` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 18.67) |

Internal passage illumination: 2 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 4.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.45° from nadir. Coverage-derived selected full fields: 55°–65°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 12; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-13-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-13-forward.png); [ceiling graze](baseline/gallery-13-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=13`.

### Gallery 14 — Empiricism, Science, and Political Order

**Runtime identity:** `empiricism-science-political-order`; world transform `x=-117, z=14, yaw=1.570796`. **Resolved schedule:** 4 primary + 14 supplemental = **18 installations / 18 accents**, zero shared groups. **Classification:** gallery 01 track standard.

Three elongated serial rooms use Gallery 01 track treatment. Portal-near end-wall populations stay on their owning return segments and are not treated as doorway lights.

Physical shell: 3 physical room footprint(s), 3 runtime spatial cell(s), and 3 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-9.33 | `empiricism-locke-ideas-rights` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -18.67) |
| x -12…12, z -9.33…9.33 | `empiricism-berkeley-perception` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 0) |
| x -12…12, z 9.33…28 | `empiricism-hume-skepticism` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 18.67) |

Internal passage illumination: 2 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 4.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.45° from nadir. Coverage-derived selected full fields: 50°–70°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 12; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-14-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-14-forward.png); [ceiling graze](baseline/gallery-14-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=14`.

### Gallery 15 — Enlightenment, Revolution, and Kant’s Critical Turn

**Runtime identity:** `enlightenment-revolution-kant`; world transform `x=-75, z=14, yaw=-3.141593`. **Resolved schedule:** 6 primary + 20 supplemental = **26 installations / 26 accents**, zero shared groups. **Classification:** gallery 02 recessed standard.

Four physical bays/five semantic routes use Gallery 02 recessed treatment. Four E0/W0-adjacent default sources are relocated to (±7.8, ±1.5) in the appropriate bay; all four final aims validate below 50 degrees.

Physical shell: 4 physical room footprint(s), 4 runtime spatial cell(s), and 5 resolved semantic zone(s); ceiling 6.2–6.2 m. Existing shared-light baseline is ambient 0.5, hemisphere 0.68, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x 0…14, z -14…0 | `enlightenment-law-institutions` | 6 | 2 short slot(s) at (7, -7.72), (7, -6.28); center fill (7, -7) |
| x 0…14, z 0…14 | `enlightenment-society-freedom` | 6 | 2 short slot(s) at (7, 6.28), (7, 7.72); center fill (7, 7) |
| x -14…0, z 0…14 | `enlightenment-sentiment-commerce` | 6 | 2 short slot(s) at (-7, 6.28), (-7, 7.72); center fill (-7, 7) |
| x -14…0, z -14…0 | `enlightenment-equality-education` | 8 | 2 short slot(s) at (-7, -7.72), (-7, -6.28); center fill (-7, -7) |

Internal passage illumination: 0 independent element(s). External threshold anchors: `E0`, `W0`. Partition/baffle keep-outs serialized: 8.

Active landing/crosscut exclusions: `E0` center (12, 0), 4×4 m; `W0` center (-12, 0), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 42.72° from nadir. Coverage-derived selected full fields: 45°–60°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 5; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Required declarative fixture-source overrides:

- `enlightenment-revolution-kant/supplemental/enlightenment-liberty-slavery-contradiction` → source (7.8, -1.5), aim 42.72°; Default source falls inside the live E0 4 x 4 m landing; pull inward and north while retaining aim below 50 degrees.
- `enlightenment-revolution-kant/supplemental/enlightenment-rousseau-botany` → source (7.8, 1.5), aim 42.72°; Default source falls inside the live E0 4 x 4 m landing; pull inward and south while retaining aim below 50 degrees.
- `enlightenment-revolution-kant/supplemental/enlightenment-industry-public-judgment` → source (-7.8, 1.5), aim 42.72°; Default source falls inside the live W0 4 x 4 m landing; pull inward and south while retaining aim below 50 degrees.
- `enlightenment-revolution-kant/supplemental/enlightenment-revolution-from-street` → source (-7.8, -1.5), aim 42.72°; Default source falls inside the live W0 4 x 4 m landing; pull inward and north while retaining aim below 50 degrees.

Evidence: [labeled contact sheet](baseline/gallery-15-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-15-forward.png); [ceiling graze](baseline/gallery-15-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=15`.

### Gallery 16 — German Idealism & Romantic Afterlives

**Runtime identity:** `german-idealism-afterlives`; world transform `x=-33, z=14, yaw=1.570796`. **Resolved schedule:** 5 primary + 20 supplemental = **25 installations / 25 accents**, zero shared groups. **Classification:** gallery 01 track standard.

Four 14 m serial rooms use Gallery 01 track treatment. Kantianism and Novalis are adjacent but retain separate heads and separate accountability.

Physical shell: 4 physical room footprint(s), 4 runtime spatial cell(s), and 4 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-14 | `german-idealism-orientation` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -21) |
| x -12…12, z -14…0 | `german-idealism-nature` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -7) |
| x -12…12, z 0…14 | `german-idealism-hegel` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 7) |
| x -12…12, z 14…28 | `german-idealism-afterlives-room` | 7 | 6 segmented rail elements; 2 route diffusers; center fill (0, 21) |

Internal passage illumination: 3 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 6.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.45° from nadir. Coverage-derived selected full fields: 50°–70°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 16; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-16-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-16-forward.png); [ceiling graze](baseline/gallery-16-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=16`.

### Gallery 17 — Utility, Liberty, History, and Capital

**Runtime identity:** `utility-liberty-history-capital`; world transform `x=33, z=14, yaw=1.570796`. **Resolved schedule:** 4 primary + 21 supplemental = **25 installations / 25 accents**, zero shared groups. **Classification:** gallery 01 track standard.

Four 14 m serial rooms use Gallery 01 track treatment. The two rooms without a conventional paired-primary composition still receive complete supplemental accents and center fill.

Physical shell: 4 physical room footprint(s), 4 runtime spatial cell(s), and 4 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-14 | `nineteenth-utilitarian-reform` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -21) |
| x -12…12, z -14…0 | `nineteenth-liberty-equality` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -7) |
| x -12…12, z 0…14 | `nineteenth-labor-capital` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 7) |
| x -12…12, z 14…28 | `nineteenth-social-transformations` | 7 | 6 segmented rail elements; 2 route diffusers; center fill (0, 21) |

Internal passage illumination: 3 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 6.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.45° from nadir. Coverage-derived selected full fields: 55°–70°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 16; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-17-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-17-forward.png); [ceiling graze](baseline/gallery-17-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=17`.

### Gallery 18 — Faith, Pessimism, Life, and Value

**Runtime identity:** `faith-pessimism-life-value`; world transform `x=89, z=14, yaw=1.570796`. **Resolved schedule:** 4 primary + 14 supplemental = **18 installations / 18 accents**, zero shared groups. **Classification:** gallery 01 track standard.

Three elongated serial rooms use Gallery 01 track treatment. The Will, Faith, and Value rooms remain independent ceiling zones across the two split partitions.

Physical shell: 3 physical room footprint(s), 3 runtime spatial cell(s), and 3 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-9.33 | `nineteenth-will-pessimism` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -18.67) |
| x -12…12, z -9.33…9.33 | `nineteenth-faith-subjectivity` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 0) |
| x -12…12, z 9.33…28 | `nineteenth-genealogy-value` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 18.67) |

Internal passage illumination: 2 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 4.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.45° from nadir. Coverage-derived selected full fields: 50°–70°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 12; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-18-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-18-forward.png); [ceiling graze](baseline/gallery-18-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=18`.

### Gallery 19 — Pragmatism, Science, and Democratic Inquiry

**Runtime identity:** `pragmatism-democratic-inquiry`; world transform `x=89, z=42, yaw=1.570796`. **Resolved schedule:** 4 primary + 20 supplemental = **24 installations / 24 accents**, zero shared groups. **Classification:** gallery 01 track standard.

Four serial rooms use Gallery 01 track treatment. The Continuities room has no nominal primary yet contains six actual supplemental installations; all six receive accents and the room receives its own ambient/circulation system.

Physical shell: 4 physical room footprint(s), 4 runtime spatial cell(s), and 4 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-14 | `pragmatism-peirce-inquiry` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -21) |
| x -12…12, z -14…0 | `pragmatism-james-experience` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -7) |
| x -12…12, z 0…14 | `pragmatism-dewey-democracy` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 7) |
| x -12…12, z 14…28 | `pragmatism-continuities-reserve` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 21) |

Internal passage illumination: 3 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 6.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.45° from nadir. Coverage-derived selected full fields: 55°–70°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 16; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-19-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-19-forward.png); [ceiling graze](baseline/gallery-19-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=19`.

### Gallery 20 — Analytic Traditions: Logic, Language, and Analysis

**Runtime identity:** `analytic-traditions`; world transform `x=33, z=42, yaw=1.570796`. **Resolved schedule:** 7 primary + 23 supplemental = **30 installations / 30 accents**, zero shared groups. **Classification:** gallery 02 recessed standard.

Parent decision: five 11.2 m Analytic rooms are compact/subdivided and therefore use Gallery 02 recessed treatment. The two separate Tractatus installations remain two separate gimbals, never a shared wash.

Physical shell: 5 physical room footprint(s), 5 runtime spatial cell(s), and 5 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-16.8 | `analytic-origins-foundations` | 6 | 2 short slot(s) at (0, -23.12), (0, -21.68); center fill (0, -22.4) |
| x -12…12, z -16.8…-5.6 | `analytic-common-sense-metaethics` | 6 | 2 short slot(s) at (0, -11.92), (0, -10.48); center fill (0, -11.2) |
| x -12…12, z -5.6…5.6 | `analytic-wittgenstein` | 6 | 2 short slot(s) at (0, -0.72), (0, 0.72); center fill (0, 0) |
| x -12…12, z 5.6…16.8 | `analytic-naturalism` | 6 | 2 short slot(s) at (0, 10.48), (0, 11.92); center fill (0, 11.2) |
| x -12…12, z 16.8…28 | `analytic-action-intention` | 6 | 2 short slot(s) at (0, 21.68), (0, 23.12); center fill (0, 22.4) |

Internal passage illumination: 4 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 8.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.04° from nadir. Coverage-derived selected full fields: 50°–70°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 19; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-20-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-20-forward.png); [ceiling graze](baseline/gallery-20-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=20`.

### Gallery 21 — Phenomenology, Existence, and Embodiment

**Runtime identity:** `phenomenology-existence-embodiment`; world transform `x=-33, z=42, yaw=1.570796`. **Resolved schedule:** 9 primary + 21 supplemental = **30 installations / 30 accents**, zero shared groups. **Classification:** gallery 02 recessed standard.

Parent decision: five compact 11.2 m rooms use Gallery 02 recessed treatment. Multiple-media primaries are coherent single installations, each with one accountable gimbal; they are not inter-installation sharing groups.

Physical shell: 5 physical room footprint(s), 5 runtime spatial cell(s), and 5 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-16.8 | `phenomenology-method` | 6 | 2 short slot(s) at (0, -23.12), (0, -21.68); center fill (0, -22.4) |
| x -12…12, z -16.8…-5.6 | `phenomenology-being-embodiment` | 6 | 2 short slot(s) at (0, -11.92), (0, -10.48); center fill (0, -11.2) |
| x -12…12, z -5.6…5.6 | `existentialism-freedom` | 6 | 2 short slot(s) at (0, -0.72), (0, 0.72); center fill (0, 0) |
| x -12…12, z 5.6…16.8 | `existentialism-situated-absurd` | 6 | 2 short slot(s) at (0, 10.48), (0, 11.92); center fill (0, 11.2) |
| x -12…12, z 16.8…28 | `phenomenology-interpretation-alterity` | 6 | 2 short slot(s) at (0, 21.68), (0, 23.12); center fill (0, 22.4) |

Internal passage illumination: 4 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 8.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.04° from nadir. Coverage-derived selected full fields: 55°–70°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 19; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-21-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-21-forward.png); [ceiling graze](baseline/gallery-21-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=21`.

### Gallery 22 — Critique, Power, and Deconstruction

**Runtime identity:** `critique-power-deconstruction`; world transform `x=-75, z=42, yaw=-3.141593`. **Resolved schedule:** 4 primary + 20 supplemental = **24 installations / 24 accents**, zero shared groups. **Classification:** gallery 02 recessed standard.

Four compact baffle-defined bays use Gallery 02 recessed treatment. Four sources receive E0/W0 landing-clearance relocations. Prompt 2 must carry the existing sampled 1.25 m cross-clearance proof into the shared validator.

Physical shell: 4 physical room footprint(s), 4 runtime spatial cell(s), and 4 resolved semantic zone(s); ceiling 6.2–6.2 m. Existing shared-light baseline is ambient 0.5, hemisphere 0.68, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -14…0, z -14…0 | `continental-orientation` | 6 | 2 short slot(s) at (-7, -7.72), (-7, -6.28); center fill (-7, -7) |
| x 0…14, z -14…0 | `critique-genealogy-power` | 6 | 2 short slot(s) at (7, -7.72), (7, -6.28); center fill (7, -7) |
| x 0…14, z 0…14 | `critique-deconstruction` | 6 | 2 short slot(s) at (7, 6.28), (7, 7.72); center fill (7, 7) |
| x -14…0, z 0…14 | `critique-critical-theory` | 6 | 2 short slot(s) at (-7, 6.28), (-7, 7.72); center fill (-7, 7) |

Internal passage illumination: 0 independent element(s). External threshold anchors: `E0`, `W0`. Partition/baffle keep-outs serialized: 8.

Active landing/crosscut exclusions: `E0` center (12, 0), 4×4 m; `W0` center (-12, 0), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 41.07° from nadir. Coverage-derived selected full fields: 35°–55°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 4; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Required declarative fixture-source overrides:

- `critique-power-deconstruction/supplemental/continental-freiburg-phenomenological-line` → source (-7.8, -1.5), aim 41.07°; The normal-based recessed source enters the live W0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `critique-power-deconstruction/supplemental/foucault-archive-practice` → source (7.8, -1.5), aim 41.07°; The normal-based recessed source enters the live E0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `critique-power-deconstruction/supplemental/derrida-writing-material-trace` → source (7.8, 1.5), aim 41.07°; The normal-based recessed source enters the live E0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `critique-power-deconstruction/supplemental/critical-theory-adorno-memorial` → source (-7.8, 1.5), aim 41.07°; The normal-based recessed source enters the live W0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.

Other required exceptions/allowances:

- `g22-cross-clearance-validator-parity` (implementation-required): Carry G22 sampled 1.25 m cross-clearance validation into the shared final-graph validator and apply the same proof to G23/G25.

Evidence: [labeled contact sheet](baseline/gallery-22-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-22-forward.png); [ceiling graze](baseline/gallery-22-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=22`.

### Gallery 23 — Moral Life & Practical Reason

**Runtime identity:** `moral-life-practical-reason`; world transform `x=-75, z=70, yaw=-3.141593`. **Resolved schedule:** 8 primary + 16 supplemental = **24 installations / 24 accents**, zero shared groups. **Classification:** gallery 02 recessed standard.

Four compact baffle-defined bays use Gallery 02 recessed treatment. Four sources receive E0/W0 landing-clearance relocations; central-cross fill is independent of exhibit accents.

Physical shell: 4 physical room footprint(s), 4 runtime spatial cell(s), and 4 resolved semantic zone(s); ceiling 6.2–6.2 m. Existing shared-light baseline is ambient 0.5, hemisphere 0.68, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -14…0, z -14…0 | `moral-ethics-orientation` | 6 | 2 short slot(s) at (-7, -7.72), (-7, -6.28); center fill (-7, -7) |
| x 0…14, z -14…0 | `moral-character-virtue` | 6 | 2 short slot(s) at (7, -7.72), (7, -6.28); center fill (7, -7) |
| x 0…14, z 0…14 | `moral-duty-consequence` | 6 | 2 short slot(s) at (7, 6.28), (7, 7.72); center fill (7, 7) |
| x -14…0, z 0…14 | `moral-rights-persons-futures` | 6 | 2 short slot(s) at (-7, 6.28), (-7, 7.72); center fill (-7, 7) |

Internal passage illumination: 0 independent element(s). External threshold anchors: `E0`, `W0`. Partition/baffle keep-outs serialized: 8.

Active landing/crosscut exclusions: `E0` center (12, 0), 4×4 m; `W0` center (-12, 0), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 42.72° from nadir. Coverage-derived selected full fields: 40°–60°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 4; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Required declarative fixture-source overrides:

- `moral-life-practical-reason/supplemental/ethics-labor-social-position` → source (-7.8, -1.5), aim 42.72°; The normal-based recessed source enters the live W0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `moral-life-practical-reason/supplemental/foot-natural-goodness` → source (7.8, -1.5), aim 42.72°; The normal-based recessed source enters the live E0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `moral-life-practical-reason/supplemental/utility-public-health-welfare` → source (7.8, 1.5), aim 42.72°; The normal-based recessed source enters the live E0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `moral-life-practical-reason/supplemental/parfit-future-generations` → source (-7.8, 1.5), aim 42.72°; The normal-based recessed source enters the live W0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.

Evidence: [labeled contact sheet](baseline/gallery-23-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-23-forward.png); [ceiling graze](baseline/gallery-23-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=23`.

### Gallery 24 — Political Action, Justice, and Democratic Reason

**Runtime identity:** `justice-democratic-reason`; world transform `x=-33, z=70, yaw=1.570796`. **Resolved schedule:** 5 primary + 13 supplemental = **18 installations / 18 accents**, zero shared groups. **Classification:** gallery 01 track standard.

Three elongated serial cells use Gallery 01 track treatment. Public Gallery 24 is Justice, not the stale Gallery 24 label found in Moral Life authoring comments.

Physical shell: 3 physical room footprint(s), 3 runtime spatial cell(s), and 3 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-9.33 | `justice-political-orientation` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -18.67) |
| x -12…12, z -9.33…9.33 | `justice-distribution-rights` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 0) |
| x -12…12, z 9.33…28 | `justice-capabilities-democracy` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 18.67) |

Internal passage illumination: 2 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 4.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 39.84° from nadir. Coverage-derived selected full fields: 50°–70°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 12; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Evidence: [labeled contact sheet](baseline/gallery-24-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-24-forward.png); [ceiling graze](baseline/gallery-24-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=24`.

### Gallery 25 — Feminist Philosophies

**Runtime identity:** `feminist-philosophies`; world transform `x=19, z=70, yaw=-3.141593`. **Resolved schedule:** 3 primary + 21 supplemental = **24 installations / 24 accents**, zero shared groups. **Classification:** gallery 02 recessed standard.

Four compact baffle-defined bays use Gallery 02 recessed treatment. Four sources receive E0/W0 landing-clearance relocations; every primary and supplemental remains independently aimed.

Physical shell: 4 physical room footprint(s), 4 runtime spatial cell(s), and 4 resolved semantic zone(s); ceiling 6.2–6.2 m. Existing shared-light baseline is ambient 0.5, hemisphere 0.68, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -14…0, z -14…0 | `feminist-orientation-genealogies` | 6 | 2 short slot(s) at (-7, -7.72), (-7, -6.28); center fill (-7, -7) |
| x 0…14, z -14…0 | `feminist-early-genealogies` | 6 | 2 short slot(s) at (7, -7.72), (7, -6.28); center fill (7, -7) |
| x 0…14, z 0…14 | `feminist-situated-freedom` | 6 | 2 short slot(s) at (7, 6.28), (7, 7.72); center fill (7, 7) |
| x -14…0, z 0…14 | `feminist-gender-norms` | 6 | 2 short slot(s) at (-7, 6.28), (-7, 7.72); center fill (-7, 7) |

Internal passage illumination: 0 independent element(s). External threshold anchors: `E0`, `W0`. Partition/baffle keep-outs serialized: 8.

Active landing/crosscut exclusions: `E0` center (12, 0), 4×4 m; `W0` center (-12, 0), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 42.72° from nadir. Coverage-derived selected full fields: 40°–60°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 4; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Required declarative fixture-source overrides:

- `feminist-philosophies/supplemental/feminist-care-dependency-labor` → source (-7.8, -1.5), aim 42.72°; The normal-based recessed source enters the live W0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `feminist-philosophies/supplemental/feminist-abolition-convention-exclusion` → source (7.8, -1.5), aim 42.72°; The normal-based recessed source enters the live E0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `feminist-philosophies/supplemental/beauvoir-boupacha-colonial-violence` → source (7.8, 1.5), aim 42.72°; The normal-based recessed source enters the live E0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.
- `feminist-philosophies/supplemental/butler-assembly-precarity` → source (-7.8, 1.5), aim 42.72°; The normal-based recessed source enters the live W0 landing/crosscut. This declared tangent/inboard relocation clears the full landing, ambient apertures, and baffles while retaining an aim below 50 degrees.

Evidence: [labeled contact sheet](baseline/gallery-25-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-25-forward.png); [ceiling graze](baseline/gallery-25-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=25`.

### Gallery 26 — Colonialism, Race, and Liberation

**Runtime identity:** `colonialism-race-liberation`; world transform `x=61, z=70, yaw=1.570796`. **Resolved schedule:** 3 primary + 15 supplemental = **18 installations / 18 accents**, zero shared groups. **Classification:** gallery 01 track standard.

Three elongated serial cells use Gallery 01 track treatment. The 4.6 m Césaire/Wynter contextual anchors and three 4.6 m primaries are oversized service envelopes but retain their resolved supplemental/primary identities and individual heads.

Physical shell: 3 physical room footprint(s), 3 runtime spatial cell(s), and 3 resolved semantic zone(s); ceiling 5.8–5.8 m. Existing shared-light baseline is ambient 0.46, hemisphere 0.62, directional 0.72, with 0 real per-exhibit lights. Preserve those bounded values unless a later photometric test explicitly approves a shared-light adjustment.

| Physical room bounds | Runtime spatial cell(s) | Actual accent targets | Ceiling treatment |
|---|---|---:|---|
| x -12…12, z -28…-9.33 | `colonial-embodiment-liberation` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, -18.67) |
| x -12…12, z -9.33…9.33 | `colonial-black-feminism-abolition` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 0) |
| x -12…12, z 9.33…28 | `colonial-context-reserve` | 6 | 6 segmented rail elements; 2 route diffusers; center fill (0, 18.67) |

Internal passage illumination: 2 independent element(s). External threshold anchors: `N0`, `S0`. Partition/baffle keep-outs serialized: 4.

Active landing/crosscut exclusions: `N0` center (0, -26), 4×4 m; `S0` center (0, 26), 4×4 m. No final accent, slot, track, or circulation cutout enters these rectangles.

Maximum proposed accent aim: 38.45° from nadir. Coverage-derived selected full fields: 55°–80°; every serialized expanded-media corner plus 2° reserve passes. Doorway-adjacent installation footprints: 12; the manifest records their exact opening clearance and keeps their ceiling sources out of the exclusion.

Oversized service envelopes: `colonialism-race-liberation/primary/fanon` (4.6×4.44×2.05 m); `colonialism-race-liberation/primary/angela-davis` (4.6×4.44×2.05 m); `colonialism-race-liberation/primary/bell-hooks` (4.6×4.44×2.05 m); `colonialism-race-liberation/supplemental/cesaire-colonialism-thingification` (4.6×4.44×1.05 m); `colonialism-race-liberation/supplemental/wynter-humanism-coloniality` (4.6×4.44×1.05 m). Each remains a single installation with its own fixture.

Evidence: [labeled contact sheet](baseline/gallery-26-contact-sheet.jpg); [forward/route/threshold](baseline/gallery-26-forward.png); [ceiling graze](baseline/gallery-26-ceiling-graze.png). Exact installation and fixture records: `installation-manifest.json` filtered by `gallery.number=26`.

## Validation result and blockers

Manifest validation status: **passed**. All 19 design-time checks pass, including 603:603 fixture/installation bijection, complete resolved-media field coverage for all 551 rollout targets, backing-wall resolution, finite world coordinates, aim limits, active portal/crosscut clearance, diffuser separation, partition clearance, wall-ray clearance, and track attachment.

**Unresolved blockers: none.** Prompt 2 still must implement and run the production-data validator before accepting generated geometry; Phase 1’s pass is a specification proof over the resolved SHA, not permission to skip implementation validation or visual QA.

## Exact implementation Prompt 2 scope

Implement this manifest for Galleries 03–26 while leaving the locked Gallery 01/02 prototype target lists and approved design unchanged. Add the final resolved-installation compiler/adapter; coverage-derived aim/optic calculation; the 24-gallery classification map; the explicit portal/crosscut source-override map; standard track/recessed RCP generators; a production `lightingStandard` renderer discriminator independent of `prototypeId`; and the final-graph validator. Refactor detailed ceiling/ambient/fixture dispatch to that production discriminator, assert emitted renderer roles/counts for all 24 rollout galleries, and render through shared instancing/material batches. Preserve shared real-light and shadow counts, mobile behavior, pointer-lock/drag-look, residency, deferred content, and texture budgets. Add deterministic data/geometry/coverage/renderer-role tests, before/after telemetry against every numeric cap in this specification, and focused production-view visual checks for every gallery. Do not change curation, route order, wall/portal geometry, exhibit transforms, content assets, or deployment configuration.

Implementation acceptance is exact: 551 Gallery 03–26 resolved installation keys, 551 unique proposed fixture memberships, every expanded resolved-media corner inside its selected photometric field with the 2° reserve, zero undeclared sharing, 28 declared portal/crosscut source overrides across Galleries 06/11/15/22/23/25, four retained G11 comparative-parent allowances, zero floating/intersecting fixtures, zero accent-under-diffuser conflicts, zero wall-crossing aim rays, all intended renderer roles present independent of the prototype query, all renderer telemetry within the stated caps, and no regression in the locked Gallery 01/02 references.
