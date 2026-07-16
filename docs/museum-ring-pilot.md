# Ring of Wings six-shell pilot implementation record

Status: implemented Ring-pilot record. Production status is determined by `main` and the GitHub Pages workflow, not by the presence of a feature branch.

## What this pilot proves

This phase converts the six mature live gallery shells into a compact physical proof of the approved single-level Ring of Wings. It proves one physical source of truth, a closed bidirectional walk, multiple central routes, hub-safe content residency, truthful future barriers, and a physical visitor map while preserving every public route, exhibit, interpretation, media record, and accessibility alternative.

It does **not** construct the other twenty planned intellectual halls, curate the Core Questions Forum, open a future portal, add a second floor, create a campus, or revise the 48 live exhibit rosters. The current six hall names remain temporary content shells rather than the final 26-hall taxonomy.

## Approved planning decisions encoded

- Intellectual program: **Worlds with a Questions Forum**.
- Physical program: **Ring of Wings**, one level.
- Locked capacity: 10 wings, 26 halls, 105 rooms or zones, 258 assignment slots.
- Permanent circulation direction: entrance/orientation court, central Forum, 25 outer halls, four Forum spokes, five meaningful shortcuts, eight outward expansion portals.
- Normal templates: standard rectangular, sequential multi-room, and crossroads/hub; focal/terminal remains rare.
- Presentation tiers remain anchor, standard individual, supporting, cluster participant, and archive/study-wall record.
- Simone de Beauvoir’s primary home is Feminist Philosophies / `feminist-situated-freedom`; Phenomenology, Existence, and Embodiment retains an anchor-strength secondary route.
- All 43 branches and 141 philosophers retain exact-once primary assignment coverage.

## Runtime manifest

The authoritative live contract is [`src/data/museum/museumBuildingManifest.json`](../src/data/museum/museumBuildingManifest.json). Its stable top-level data includes:

- schema and manifest version;
- approved pilot status and one `L0` level;
- shared physical and residency contracts;
- public entrance, Forum location, and kiosk references;
- hall, corridor, entrance, and court physical nodes;
- hall content IDs only where a physical node is a public gallery;
- world transforms and geometry adapter/template metadata;
- circulation cells, doorway slots, clear dimensions, landings, and arrivals;
- one undirected record per live physical seam; and
- blocked insertion and outward-expansion reservations.

`museumHallTemplates.ts` is the executable copy of the approved canonical template interfaces. `museumBuildingRuntime.ts` validates references, resolves each hall through that registry and its named legacy adapter, joins six content/layout inputs to their placed nodes, derives circulation and hall architecture/collision walls, and emits both directed crossings from every connection. Scene movement, readiness, structural rendering, threshold lighting, and map projection consume that compiled contract.

## Pilot arrangement

The compact pilot uses 18 live physical nodes and 22 authored seams.

### Outer loop

The public route begins at the entrance/orientation court and Ancient’s kiosk entrance. Five compact outer connectors join the six gallery shells. Mind’s new return passage closes back into the entrance court. The result is a continuous step-free loop that can be walked in either direction:

`Entrance → Ancient → Renaissance → Modernity → Logic → Ethics → Mind → Entrance`

Each arrow represents built corridor geometry and two manifest seams, not a teleport-only graph edge.

### Central routes

Four hall-local branch adapters connect to a central orientation court:

| Direction | Live hall branch | Circulation node |
| --- | --- | --- |
| west | Ancient `forum-west-threshold` | `corridor:spoke-west` |
| north | Modernity `forum-north-threshold` | `corridor:spoke-north` |
| east | Logic `forum-east-threshold` | `corridor:spoke-east` |
| south | Mind `forum-south-threshold` | `corridor:spoke-south` |

An entrance-to-Forum corridor supplies the fifth meaningful central route choice. The court is explicitly an orientation and circulation space; no unfinished Forum exhibits are represented as live.

### Legacy shell adapters

The six hall definitions now contain local content/layout only. Placement, doorway occupancy, and adjacency were removed from those files. Ancient, Modernity, Logic, and Mind received real branch cells and collision openings. Mind also received a collision-backed ring-return passage, and its former terminal “journey complete” sign now points back into the continuing Ring.

The six manifest nodes exercise three ordinary **interface contracts** through named adapters; none claims a canonical template footprint:

| Live shell | Interface | Legacy adapter |
| --- | --- | --- |
| Ancient Greek and Hellenistic | `crossroads-4` | `legacy-ancient-atrium-sequence` |
| Renaissance, Reason, and Revolution | `sequence-3` | `legacy-sequence-west-return` |
| Modernity, Freedom, and Critique | `crossroads-4` | `legacy-sequence-forum-branch` |
| Logic, Language, and Science | `crossroads-4` | `legacy-sequence-forum-branch` |
| Ethics, Justice, and Political Life | `standard-rect` | `legacy-sequence-straight` |
| Mind, Consciousness, and the Self | `crossroads-4` | `legacy-sequence-return-and-forum-branch` |

Each resolution records its footprint, ceiling, portal, and exhibit-slot deviations against the canonical contract. `focal-terminal` stays registered and rare; the pilot does not use it.

Live manifest connection endpoints are the sole authority for hall openings. The compiler cuts the portal and safe-arrival envelope from legacy wall colliders, adds a render-only lintel and threshold-light anchor, and publishes the resolved map cells. Removing that endpoint instead produces a full-height closure and no threshold light. Hall renderers consume the compiler's architecture walls, so a stale local doorway cannot contradict the connection graph.

Long circulation cells use proportional segmented ceiling guides and sparse flush floor bands. The treatment makes the north/south spokes and entrance shortcut legible without adding obstacles, false destinations, or decorative sign clutter.

## Reservations

Four insertion bays preserve likely pilot-to-program expansion points for South Asian, Islamic, analytic, and feminist destinations. Eight outward portals preserve `R1`–`R8`. Every reservation:

- is visibly and physically barred;
- is labeled `Future gallery — not yet open`;
- owns a distinct outward footprint plus a wall-line barrier center and width;
- is absent from live connections and directed crossings;
- cannot trigger prefetch;
- is not a public route or fast-travel target; and
- appears as blocked geometry on the physical map.

## Residency, texture budget, and failure containment

The content cap is three hall subtrees: active/last hall, the one hall whose doorway is being approached, and at most one recent hall. Court and corridor structure remains resident independently. Preparation begins at 6 m, but crossing remains gated until lazy code/entry media and the committed scene subtree are both ready.

The manifest’s 96 MiB decoded-texture limit is enforced during admission. A deterministic RGBA8 estimate uses every scene WebP’s recorded dimensions, exact generated mip chains, renderer-shared plaque/sign/kiosk dimensions, and the larger of each source or mutually exclusive fallback allocation. Full active halls currently measure 40.43–43.11 MiB; entry-resident halls measure 22.80–32.92 MiB. Every active/approach pair fits. Across all 120 distinct active/approach/recent combinations, the largest admitted plan is 94.53 MiB and 32 combinations drop the optional recent hall. Only an active hall warms remainder media, preventing an approached hall from expanding beyond its entry-resident profile before crossing.

A failed load withdraws readiness only for its target doorway and exposes the existing Retry UI. Because the pilot has a loop and central alternatives, the visitor can turn around and continue through another live route rather than being trapped at an endpoint.

## Compatibility and rollback

The compatibility boundary remains unchanged:

- exactly six public hall IDs and routes;
- exactly 48 exhibit IDs and rosters;
- the same interpretations and 96 source-media records;
- hall-local session keys and validated local poses;
- one persistent Canvas;
- directory, guided visits, interpretation panels, history behavior, reset, immersive/fullscreen, Pointer Lock, drag-look, touch, focus, and non-WebGL fallback.

Physical-only IDs never become URL values. Fast travel still lands at a validated public-hall spawn. The implementation can be rolled back through a normal revert of the Ring-pilot commits; there is no backend or stored-data migration.

## Map and diagrams

The visitor map projects real world-space hall cells and manifest circulation cells. It marks doors, the public entrance, Ancient’s physical kiosk, the current physical node, the live loop/spokes, and all blocked reservations. Its destination list contains only the six public halls, with walking and fast travel labeled separately. The spatial plan remains visible at narrow widths.

- Permanent planning direction: [`docs/museum-masterplan/diagrams/ring-of-wings.svg`](./museum-masterplan/diagrams/ring-of-wings.svg)
- Manifest-derived runtime plan: [`docs/museum-masterplan/diagrams/ring-pilot-runtime.svg`](./museum-masterplan/diagrams/ring-pilot-runtime.svg)

The runtime SVG is generated by `npm run generate:museum-diagram`. The generator loads the same compiled manifest, hall-local footprints, doorway slots, seams, reservations, entrance, and kiosk projection used by the live visitor map. Its embedded metadata records the manifest version and element totals, so a fresh checkout can reproduce and review the committed diagram instead of depending on an external screenshot.

## Verification and remaining work

Release review requires the masterplan validator, production build, routing/Museum/assets/integrity/articles/accuracy audits, coverage and bundle reports, diff checks, and browser review at desktop and narrow viewports. Browser observations and generated screenshot paths are recorded in the final branch report rather than hard-coded here.

The next construction phase should select one approved reserved bay, finish its intellectual content and local hall adapter, prove both physical arrivals and bounded preparation, then publish its connection and map status atomically. It must not reopen taxonomy or Ring alternatives without a concrete contradiction in the approved contract.
