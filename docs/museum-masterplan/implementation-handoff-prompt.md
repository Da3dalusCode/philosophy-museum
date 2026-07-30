# Exact implementation handoff prompt

Copy everything below into a new Codex conversation:

---

Fully maintain and verify the approved Continuous Enfilade Museum architecture, preserve the 24 populated galleries in it, keep all 26 gallery shells and all 105 named rooms physically complete, and push the completed implementation to production.

This is an implementation turn, not another architecture-design turn. Do not redesign, reinterpret, or hand-place the building. The Continuous Enfilade is already the production architecture. For a gallery-curation release, the physical requirements below are preservation and regression gates, not authorization to reconstruct working building geometry. The current state is 24 curated/open galleries and 2 planned/walkable shells; Galleries 01–24 are curated in their fixed visit positions.

The authoritative physical contract is:

- `docs/museum-masterplan/single-level-building-plan.json`
- `docs/museum-masterplan/single-level-building-plan.md`
- `docs/museum-masterplan/diagrams/continuous-enfilade-single-level.svg`

The intellectual/room and migration authorities are:

- `docs/museum-masterplan/hall-program.json`
- `docs/museum-masterplan/recommended-program.md`
- `docs/museum-masterplan/migration-plan.md`
- `docs/museum-masterplan/exhibit-wall-standard.md`
- `docs/museum-masterplan/implementation-lessons.md`

Before editing:

1. Read `AGENTS.md` and every authority listed above. Treat the implementation-lessons regression gates as binding acceptance criteria.
2. Run `git status --short` first. Preserve all unrelated and in-progress work. Never reset, delete, overwrite, or stage unrelated files.
3. Inspect the current Galleries 01–24 hall definitions, world transforms, manifest, connections, map projection, directory, direct routes, session persistence, guided visits, collision, audits, and performance/lazy-loading implementation.
4. Treat the current three-hall residency, 6 m approach preparation, 96 MiB decoded-texture budget, and lazy media boundary as authoritative. Extend them; do not replace them or eagerly initialize 26 halls.
5. Keep planning brief. Build the full migration.

Required physical result:

- One single public level.
- The exact 262 × 168 m six-band gallery block and 282 × 224 m controlled plan bounds from the JSON.
- The exact 40 × 56 m Grand Entrance & Orientation Hall, with map, facing direction, resume, route choice, guided visit, and fast travel. Do not build fake tickets, lockers, café, shop, or generic study controls.
- All 26 canonical hall shells at the exact centers and rotations in the control JSON.
- Compile the JSON’s east-positive, north-positive architectural frame through its declared Three.js handedness adapter (`runtime.x = -plan.x`, `runtime.z = plan.z`). Do not copy the left-handed floor coordinates directly into the right-handed runtime or mirror the north-up visitor map. Both bends of every turn must have the same embodied left/right sense in the runtime and map.
- All 105 canonical named rooms.
- Six back-to-back 28 m structural bands. Template margins are solid structure/services, never visible public gaps.
- The exact continuous serpentine through-gallery route, so visitors continue through each gallery’s far threshold without turning around.
- The exact 10 m north–south crosscut, with five ordinary threshold crossing bays and the Core Questions Forum as its sixth intersection.
- The Core Questions Forum in its own independent 28 × 28 m bay. It must not overlap, notch, cover, or steal space from Jewish Philosophy, Latin Christian & Scholastic Traditions, Renaissance/New Science, or Rationalism.
- All five exterior dogleg turn courts at the exact centerlines from the control JSON, 8 m clear, with two full-width right-angle turns, continuous ceiling guidance, and threshold wayfinding. Do not substitute diagonal chords or long empty corridors.
- The exact final return/exit threshold after Colonialism, Race, and Liberation.
- Two exact 56 × 28 m closed expansion reserves fed by the north crosscut extension. They are outside the 26-gallery program and are not destinations.
- No improvised shortcut, side doorway, corridor, hall rotation, map edge, or reserve. If measured implementation geometry conflicts with the control plan, stop, explain the conflict, and amend/revalidate the plan before changing the runtime.

Populated versus planned states:

- Preserve Galleries 01–24 as whole hall-local roots wherever possible. Preserve every room partition, exhibit, supplemental/context installation, image/media mount, attribution, interpretation, sign, lighting treatment, guided viewpoint/order, interaction, article route, asset ID, direct URL, and local collider.
- Recompute only world transforms, active route portals, world collision, safe arrivals, guided/world camera transforms, audio/light bounds, connection readiness, and map projection.
- Preserve all existing public Gallery numbers exactly. Public release number is not the same as physical visit sequence.
- Preserve the planned Galleries 25–26 numbers exactly as specified in the control JSON.
- Keep the remaining 2 halls and every named room as walkable architectural shells. Use the room-layout strategies in the control JSON.
- Planned shells have floors, ceilings, partitions, collision, safe arrivals, generic local lighting, closed unused portals, and geometry-only future wall slots.
- Planned shells have blank exhibit walls and one honest noninteractive “planned gallery” status sign at the hall entrance. Do not fabricate placeholder exhibits, images, quotations, biographies, controls, article routes, attributions, or dead interactions.
- Planned shells remain walkable so the through route is complete, but they are not counted as open galleries and should not receive normal gallery fast-travel controls.
- The public state is exactly 24 curated/open galleries, 2 walkable/planned shells, and 2 closed expansion reserves. Public numbering is release identity and must not be rewritten to imitate visit order.
- Do not curate Gallery 25 or any other future gallery unless the task explicitly requests that release.

Architecture and exhibit-wall safeguards:

- The crosscut may occupy only the five planned threshold bays and the Forum. It must never pierce another gallery room.
- Every unused optional portal is a full-height rendered and collision wall.
- Preserve the current exact Gallery 01–24 room-by-room installation and wall-slot audit expectations after relocation.
- Preserve the Museum-wide visual-character gate: every textual-medium placement is explicitly classified, no curated room may contain more than one text-dominant page or isolated book, the existing Gallery 17/18 gallery-wide ceilings remain in force, Galleries 19–22 retain their stricter zero-text-image result with at least four non-textual visual-character groups in each gallery, and Galleries 23–24 retain their independently sourced, exhibit-specific 48-image result and audited room-level diversity.
- Excess pages and lone-book views must be replaced by independently sourced, exhibit-specific images that can carry the installation alone. Generated wrappers, subordinate artifact insets, quota-filling collages, and repeated gallery-wide “anchor” illustration styles are prohibited.
- Do not use a connector, planned threshold, or status sign to excuse a blank usable wall in a curated gallery.
- Planned shells are exempt from installation-count completeness only while their manifest state remains planned; audit all of their room counts, walls, portals, collision, and circulation.
- Architecture must not clip or crowd any existing installation, sign, light, viewpoint, or interaction.

Map, routing, and state:

- Generate the physical visitor map from the new authoritative runtime manifest, not a separate hand-authored topology.
- Show all 26 full gallery titles, stable public Gallery numbers, 24 curated/open states, 2 planned/walkable states, the Grand Entrance, through route, crosscut, five turn courts, final threshold, current position, facing arrow, and two closed reserves.
- The complete map, gallery list, current-location information, legend, and curated fast-travel controls must fit at 1920 × 1080 without scrolling.
- Planned shells may be selected for truthful status/details but must not look curated or expose dead exhibit controls.
- Preserve every existing direct gallery/exhibit URL, directory entry, guided visit, fast travel, reset, Back/Forward behavior, and interaction.
- Migrate saved sessions by stable gallery/room/exhibit ID. Never replay old raw world coordinates into the new building.
- Walking directions use only physically crossable connections. Map proximity never implies a connection or philosophical influence.

Performance and implementation setup:

- Build the new manifest and building beside the current runtime and keep the current manifest as rollback until the new building passes.
- Prefer one manifest compiler/source over duplicated hand-authored transforms.
- Extend the existing lazy-loading/residency solution. Initial Museum load may mount the Grand Entrance, nearby lightweight architecture, and lightweight map data only.
- Do not import or initialize curated-gallery media except for the active/prepared threshold target.
- The 2 planned shells use shared architecture/material/lighting/collision modules and import no exhibit media.
- A crossing becomes available only after target code, nearest-room media where applicable, collision, safe arrival, and scene commit are ready.
- The map must not import Three.js hall scenes or media modules.
- Cut over the building manifest, map, directory state, session resolver, and entrance together. Do not ship a mixed old/new building.

Verification before release:

- Extend `npm run validate:museum-building-plan` so it compares the implemented runtime manifest and compiled geometry to the approved JSON—not merely the planning file to itself.
- Encode all 26 hall transforms, 105 rooms, six crosscut intersections, five turn-court endpoints/lengths, entrance, final threshold, planned/open states, two reserves, no-overlap, and no-gallery-piercing rules in executable audits.
- Run:
  - `npm run build`
  - `npm run validate:museum-masterplan`
  - `npm run validate:museum-building-plan`
  - `npm run audit:routing`
  - `npm run audit:museum`
  - `npm run audit:museum-assets`
  - `npm run audit:articles`
  - `npm run audit:accuracy`
  - `git diff --check`
- Run the local app and verify HTTP 200.
- Use risk-scoped browser checks for the changed galleries and affected architecture, plus one representative through-route and map pass. Do not repeat the entire unchanged building merely to increase the test count.
- Confirm usable walls in curated galleries remain filled, primaries still read first, imagery/titles remain legible and relevant, nothing is clipped/cramped/floating, movement is clear, planned shells are honestly blank, and browser console has no errors.
- Test representative direct exhibit URLs, directory entries, interactions, image attribution, guided visits, fast travel, reset, session resume, and old-route compatibility.
- Cold-load the Museum and confirm it does not download or initialize all curated-gallery media or any nonexistent planned-gallery media.
- Automated checks are not a substitute for the full visual walk.

Deployment:

- Stage only intended files. Do not include unrelated user files or changes from other conversations.
- Commit the complete building migration and push the production branch.
- Wait for GitHub Pages deployment to succeed.
- Recheck the Grand Entrance, map, the changed populated gallery entries, representative interactions and imagery, planned-shell status/counts, affected movement, direct URLs, and browser console on the live production site.
- Do not stop with unpushed local work.

In the final report provide:

- production links;
- commit hash;
- exact counts for populated galleries, planned shells, rooms, crosscut intersections, turn courts, and reserves;
- major files changed;
- checks run and results;
- local and production visual-verification result;
- deployment result;
- any real limitations or approved control-plan amendments;
- the exact recommended prompt to curate Gallery 25 — Feminist Philosophies.

---
