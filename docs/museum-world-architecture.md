# Museum Ring-pilot runtime architecture

## Approved scope

The live Museum is a compact, single-level physical proof of the approved **Ring of Wings**. It keeps the existing six public gallery shells and all 48 installations, but the building is no longer a six-stop chain. The permanent intellectual plan remains **Worlds with a Questions Forum**: 10 wings, 26 halls, 105 planned rooms or zones, and the existing reserve capacity. The runtime pilot proves the physical system without pretending that the other twenty halls or a curated Core Questions Forum have been built.

The six public routes and content rosters remain unchanged:

1. Ancient Greek and Hellenistic Philosophy
2. Renaissance, Reason, and Revolution
3. Modernity, Freedom, and Critique
4. Logic, Language, and Science
5. Ethics, Justice, and Political Life
6. Mind, Consciousness, and the Self

Ancient remains the temporary public entrance because it contains the visitor-map kiosk. The central court is labeled as the **Core Questions Forum location — orientation only**; it is circulation space, not an open intellectual hall.

## Three separate data layers

The pilot deliberately separates concerns that the former chain coupled together.

| Layer | Owns | Does not own |
| --- | --- | --- |
| Intellectual program | primary philosopher/branch homes, secondary routes, tiers, wings, halls, rooms, capacities | metres, meshes, React loaders |
| Physical building manifest | physical node IDs, level, transforms, doorway slots, connections, safe arrivals, circulation cells, reservations, map status | philosopher assignments, exhibit interpretation |
| Rendered hall content | hall-local partitions, installations, lighting, media, interaction viewpoints | world placement or building adjacency |

`src/data/museum/museumBuildingManifest.json` is the authoritative runtime source for placement, doorway occupancy, and physical connections. `museumHallTemplates.ts` is the executable template/interface registry and mirrors the approved `hall-program.json` dimensions and portal slots. `museumBuildingRuntime.ts` joins those sources, validates named legacy adapters, and compiles placed hall definitions, low-cost circulation nodes, two directed transitions per live connection, collision walls, and lookup APIs. The six `*Hall.ts` modules remain content and legacy-layout inputs: moving a hall changes its manifest transform, not its philosopher/exhibit data.

Public `MuseumHallId` values remain the six URL-safe content IDs. Physical IDs use a separate namespace (`hall:`, `corridor:`, and `place:`), so the entrance, court, and corridors never become public Museum routes or fake intellectual halls.

## Compact pilot floor plan

The building contains 18 live physical nodes on `L0`:

- six placed public hall shells;
- five compact outer-loop connectors;
- one entrance and orientation court;
- one central Forum circulation court;
- four Forum spokes; and
- one entrance-to-Forum shortcut.

Twenty-two undirected seams are authored once. Twelve close the outer walking loop through all six galleries and the entrance court. Eight connect four hall branches to the central court through west, north, east, and south spokes. Two connect the entrance court directly to the Forum court. The compiler produces both traversal directions from each record; reservations never produce transitions.

The outer loop can therefore be walked clockwise or counterclockwise and returns to the entrance without fast travel. The four spokes plus the entrance shortcut create five meaningful central route choices in the pilot. They demonstrate the permanent Ring principle without stretching six shells around the full future 25-hall circumference.

## Shared physical contract

The runtime manifest records metres and one level. The pilot contract is:

- wall thickness: 0.36 m;
- default clear doorway: 4.0 m wide × 3.2 m high;
- threshold transition depth: 1.2 m;
- safe landing: at least 4.0 m × 4.0 m;
- default circulation ceiling: 5.2 m; and
- step-free circulation throughout.

The permanent program standardizes three ordinary hall templates: `standard-rect`, `sequence-3`, and `crossroads-4`. `focal-terminal` is registered as a rare special case and is unused by this pilot. The executable registry carries each template's canonical footprint, room range, portal slots, wall thickness, ceiling height, safe landing, lighting roles, collision policy, map policy, and exhibit-bay/viewing targets.

All six live shells are **legacy-adapted interface proofs**, not canonical footprint instances. Their named adapters bind descriptive manifest slot names to the canonical cardinal portal interface and record footprint, ceiling, or expanded-entry deviations. This preserves mature exhibit layouts without misrepresenting them as newly constructed 20 × 24 m, 24 × 56 m, or 28 × 28 m template shells. An adapter must still expose the standard runtime contract; it cannot create a private portal, map, collision, lighting, or exhibit-slot model.

Hall-local cells, colliders, viewpoints, and installations remain local. The manifest supplies world translation and yaw. Sessions therefore survive building rearrangement: a saved pose is validated against the current local layout before use, and an unsafe pose falls back to a safe spawn.

## One-source seams and movement

Each manifest connection names two physical nodes and one doorway slot at each endpoint. Runtime compilation resolves the slots into local entrances and derives two signed-plane crossings. Endpoint world positions must coincide, clear dimensions must be compatible, inward normals must oppose, and both arrival poses must be collision-safe.

For hall shells, the set of **live connection endpoints** is the sole opening authority. An active endpoint splits any wall across the portal plane and subtracts its manifest safe-arrival landing from legacy jamb walls; it then receives one render-only lintel above the authored clear height and one resolved threshold-light anchor. A manifest slot without a live endpoint receives a full-height collision/render closure and no threshold invitation. The renderer consumes the compiler's architecture-wall list, while movement consumes only the compiled floor-standing wall colliders, so adding or removing a seam cannot leave a contradictory locally authored opening or overhead collision body.

The same template resolution publishes the hall's map cells from rendered spatial bounds, perimeter and anchor track IDs, accessible-label anchors, and an explicit classification of every exhibit bay/viewing clearance against the approved targets. The visitor-map projection consumes these resolved map cells rather than reconstructing a second hall footprint.

The active movement definition is a **physical node**, not a public hall. Crossing into a corridor or court changes collision geometry without changing the public route. Crossing into a public hall updates the route with history replacement, preserving the previous contract that walking does not flood browser history. Directory, exhibit, map fast travel, and other deliberate choices still use history pushes.

Low-cost corridor/court floors, walls, lighting strips, benches, signs, and reservation barriers stay resident inside the one persistent React Three Fiber `Canvas`. Hall render modules remain lazy and contain the expensive architecture detail, installations, local lights, and media.

Long circulation cells derive segmented ceiling guides and sparse flush floor bands from their measured run length. These orientation cues keep the 45–59 m spokes and shortcut readable while remaining step-free and introducing no new route node or collision body.

## Readiness and bounded residency

The former active-plus-all-neighbors rule was safe only for a chain. The Ring pilot uses a bounded policy recorded in the manifest:

- maximum resident hall-content subtrees: 3;
- always retain the active/last public hall;
- prepare only the public hall at the specifically approached doorway;
- retain at most one recent hall; and
- begin targeted preparation within 6 m of a live hall threshold.

Circulation geometry is always cheap and resident; it does not consume a hall-content slot. A gallery is crossable only after its lazy entry module/media and its post-`Suspense` render signal are ready. A failed gallery preparation blocks only that doorway. Retry remounts that hall’s content epoch, while the loop or a central route remains available. Entry-visible media gates readiness. Remainder warming is restricted to the active hall, so an approached subtree cannot silently decode its full media set behind the smaller entry-resident allowance.

This is intentionally a small policy, not a speculative streaming platform. The manifest’s **96 MiB decoded-texture budget is now an admission constraint**, not a planning-only number. `museumTextureBudget.ts` derives a conservative allocation from the actual scene-asset dimensions and the canvas-texture dimensions shared with the renderers. It assumes RGBA8 uploads, includes exact mip chains for generated plaques/signs, includes the larger of a source image and its mutually exclusive failure fallback, and distinguishes a full active hall from the entry-visible subset of an approached or recent hall. `museumResidency.ts` always retains the active hall, admits the specific approached hall only when the measured pair fits, and retains a recent hall only when the complete plan remains within both the three-subtree cap and 96 MiB.

The deterministic Museum audit checks every ordered active/approach pair and all 120 distinct active/approach/recent plans. Current evidence is 40.43–43.11 MiB for an active subtree, 13.99–32.89 MiB for an entry-resident subtree, and a 94.53 MiB maximum admitted plan. Thirty-two of the 120 three-hall plans intentionally reject the optional recent hall. All active/approach pairs fit, so readiness-gated crossings remain preparable. The budget governs variable lazy hall-content allocations; always-resident circulation labels are fixed structural overhead rather than candidates for residency eviction.

## Reservations and growth

The pilot shows four blocked insertion bays and eight blocked outward portals `R1`–`R8`. Every barrier uses the literal visitor-facing label:

> Future gallery — not yet open

Reservations have physical and map footprints but are excluded from connections, prefetch, route IDs, visitor-map walking edges, and fast-travel actions. Each future footprint extends outward from a distinct wall-line opening instead of straddling the live route. One manifest-owned barrier center and width feeds the rendered barricade, collision body, and wall cut; the matching lintel preserves the authored 3.2 m clear portal height. This keeps all four insertion bays and all eight outward portals visually separate while preventing invisible collision beyond a barrier.

Opening a reservation is an atomic future change: build both sides, add safe arrivals, make the node live, author one connection, pass collision/readiness/map/route audits, and only then expose it as walkable. No second floor, scattered campus, or additional intellectual hall is represented by this pilot.

## Physical visitor map

The visitor map is a projection of the same manifest/runtime geometry used by movement. It transforms each hall template adapter's resolved map cells and each circulation node's authored cells into world-space footprints, then draws the entrance, Forum court, door markers, live walking seams, kiosk, and blocked reservation footprints. There is no separately authored percentage layout.

Walking topology and fast travel are visibly separate. Only the six live public halls are selectable safe-travel destinations. Future reservations are descriptive, noninteractive geometry. The current physical node is highlighted even while the visitor is in a corridor or court, while the last public hall remains available to route and accessibility UI. The narrow layout keeps the spatial SVG and adds an accessible destination list rather than collapsing the building back into a conceptual card graph.

The kiosk and modal use the same projection. `M` remains the complete six-hall/48-exhibit directory and non-free-movement alternative.

## Persistent interaction contracts

`MuseumWorldScene` still owns exactly one Canvas, camera, and player rig. `MuseumPage` owns route/history state, active physical location, overlays, readiness, hall-content residency, sessions, and Pointer Lock/drag-look/touch controls. Interpretation panels, guided visits, focus recovery, immersive/fullscreen state, direct exhibit routes, and the non-WebGL directory fallback retain their previous behavior.

The public compatibility boundary is intentionally narrow:

- no public hall or exhibit ID changed;
- no interpretation or media record changed;
- all six lazy content loaders remain;
- hall sessions remain local; and
- physical-only IDs cannot appear in Museum URLs.

Rollback is correspondingly simple: the feature branch can be abandoned without data migration. Within the feature, circulation placement is isolated in the manifest and compiler; content files need only their added physical openings reverted if the Ring adapter itself is rolled back.

## Verification contract

`node scripts/validateMuseumMasterplan.mjs` checks the locked program and Beauvoir placement. `npm run audit:museum` also compares the executable registry to the approved planning templates, resolves every legacy adapter, toggles a synthetic endpoint to prove deterministic opening/closure behavior, checks active pedestrian bands and landings against wall and obstacle colliders, verifies render-only lintels and threshold anchors, and confirms that the visitor map consumes resolved map cells. Loop/spoke reachability, reservations, bounded residency, one Canvas, and the unchanged six-hall/48-exhibit content contract remain covered. The routing, asset, integrity, article, and accuracy audits remain independent release gates.

Before extending the building, run the production build and every audit, then inspect the full loop in both directions, all five central route choices, every blocked barrier, the desktop and narrow maps, safe fast travel to all six halls, directory/guided/session/history behavior, controls and focus, representative media in all six halls, and the non-WebGL/failure fallbacks.

## Adding a future live hall

1. Complete and review the intellectual program and content independently.
2. Select one of the three normal templates or justify the rare focal template.
3. Place a physical node and compatible doorway slots in the manifest.
4. Replace an approved reservation with built circulation and one live connection record.
5. Add the hall-local content adapter and lazy renderer without another Canvas.
6. Add the public route only if the node is a real live public hall.
7. Verify safe arrivals, collision clearance, bounded approach preparation, map projection, fallback navigation, and all deterministic audits.
