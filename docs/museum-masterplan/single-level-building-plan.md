# Continuous Enfilade — single-level architectural control plan

**Status:** owner-approved planning basis; implemented in the production 3D runtime
**Scale drawing:** [continuous-enfilade-single-level.svg](./diagrams/continuous-enfilade-single-level.svg)
**Machine-readable geometry:** [single-level-building-plan.json](./single-level-building-plan.json)
**Program authority:** [recommended-program.md](./recommended-program.md) and [hall-program.json](./hall-program.json)

## Decision

The final 26-gallery Museum is a continuous single-level building, not a ring assembled one gallery at a time. Six back-to-back structural bands share walls. A chronological route passes through every gallery in a serpentine sequence, so a visitor can leave one gallery through its far threshold and continue without turning around. A 10 m north–south crosscut intersects every band at a threshold joint. It never cuts through a gallery room.

The Core Questions Forum has its own full 28 × 28 m bay. The crosscut passes north–south through the Forum; the chronological route passes east–west through it. Jewish Philosophy, Latin Christian & Scholastic Traditions, Renaissance/New Science, and Rationalism retain complete rectangular shells around it. Nothing overlaps or notches those galleries.

This plan supersedes the unscaled Ring topology and the rejected Forum Cloister candidate as the physical and runtime authority. Its complete manifest passed the migration gates below before the atomic production cutover.

## Exact construction envelope

| Element | Exact control dimension |
| --- | ---: |
| Main six-band gallery block | **262 × 168 m** |
| Structural band | **28 m deep** |
| Grand Entrance & Orientation Hall | **40 × 56 m** |
| North–south crosscut | **10 m clear × 168 m public length** |
| Core Questions Forum | **28 × 28 m** |
| Turn courts | **8 m clear**, longest straight run **36 m** |
| Overall controlled bounds, including entrance and two reserves | **282 × 224 m** |
| Additional gallery reserves | **2 × 56 × 28 m** |
| Complete through-gallery route | approximately **1,560 m** |

The control plan is an architectural, north-up frame: X is east-positive and Z is north-positive. Three.js uses a right-handed Y-up world, so those two positive floor axes cannot be copied directly without reversing embodied left and right. The manifest compiler therefore applies one explicit coordinate adapter: runtime X is `-plan.x`, runtime Z is `plan.z`, and runtime hall yaw is derived from each approved entry-to-exit axis. The visitor map projects runtime X back with the same reflection. This preserves every approved centerline and the north-up drawing while ensuring that a turn shown as left on the map is also physically left while walking.

The 262 × 168 m gallery block is a stepped continuous envelope, not a promise that every row has an equal east or west edge. Five enclosed exterior dogleg courts absorb the offsets without cutting back through a gallery footprint. Every court has two full-width right-angle turns, continuous ceiling guidance, and threshold wayfinding. Their longest uninterrupted run is 36 m, so they remain purposeful transitions rather than long, empty halls.

The 28 m band depth reconciles all approved templates without changing their interiors:

- a rotated `sequence-3` shell is 56 × 24 m and leaves 2 m of solid structure/services on each band side;
- a `crossroads-4` shell is 28 × 28 m and fills its band;
- the rotated Jewish Philosophy `standard-rect` shell is 24 × 20 m and leaves 4 m of solid structure/services on each side.

Those margins are walls and building services. They are not public gaps and do not appear as empty space in the Museum.

## The complete physical route

“Visit” below means architectural sequence. “Gallery” remains the stable public release number. Existing Gallery 01–26 numbers and URLs do not change when a planned shell is promoted.

| Visit | Public gallery | Full gallery title | Current production state |
| ---: | ---: | --- | --- |
| 1 | Gallery 01 | Mediterranean Beginnings & Classical Athens | curated/open |
| 2 | Gallery 14 | Hellenistic & Roman Ways of Life | curated/open |
| 3 | Gallery 15 | Late Antiquity & Neoplatonic Inheritance | curated/open |
| 4 | Gallery 07 | Classical South Asia: Jain, Yoga, and Brahmanical Systems | curated/open |
| 5 | Gallery 08 | Buddhist Philosophies of Liberation and Knowledge | curated/open |
| 6 | Gallery 09 | Warring States & Classical Chinese Traditions | curated/open |
| 7 | Gallery 11 | Confucian Renewal & East Asian Continuities | curated/open |
| 8 | Gallery 10 | Arabic & Islamic Philosophical Worlds | curated/open |
| 9 | Gallery 12 | Jewish Philosophy in Arabic-Speaking & Mediterranean Worlds | curated/open |
| 10 | Gallery 13 | Latin Christian & Scholastic Traditions | curated/open |
| 11 | Gallery 06 | Core Questions Forum | curated/open |
| 12 | Gallery 02 | Renaissance, Political Order, and New Science | curated/open |
| 13 | Gallery 16 | Rationalism: Mind, Nature, and System | curated/open |
| 14 | Gallery 17 | Empiricism, Science, and Political Order | curated/open |
| 15 | Gallery 18 | Enlightenment, Revolution, and Kant’s Critical Turn | curated/open |
| 16 | Gallery 19 | German Idealism & Romantic Afterlives | curated/open |
| 17 | Gallery 20 | Utility, Liberty, History, and Capital | curated/open |
| 18 | Gallery 21 | Faith, Pessimism, Life, and Value | curated/open |
| 19 | Gallery 22 | Pragmatism, Science, and Democratic Inquiry | curated/open |
| 20 | Gallery 04 | Analytic Traditions: Logic, Language, and Analysis | curated/open |
| 21 | Gallery 03 | Phenomenology, Existence, and Embodiment | curated/open |
| 22 | Gallery 23 | Critique, Power, and Deconstruction | curated/open |
| 23 | Gallery 24 | Moral Life & Practical Reason | curated/open |
| 24 | Gallery 05 | Political Action, Justice, and Democratic Reason | curated/open |
| 25 | Gallery 25 | Feminist Philosophies | curated/open |
| 26 | Gallery 26 | Colonialism, Race, and Liberation | curated/open |

The curated sequence now includes Galleries 13–26 through the completed Scholastic, Hellenistic/Roman, Late Antiquity, Rationalist, Empiricist, Enlightenment/Kant, German Idealist, Utility/Liberty/Capital, Faith/Pessimism/Life/Value, Pragmatist, Critique/Power/Deconstruction, Moral Life, Feminist Philosophies, and Colonialism/Race/Liberation programs. Each promotion changed only its reviewed manifest state and content bundle: stable public numbers, visit positions, approved centers, rotations, and route transforms remain unchanged.

## Six bands and crosscut joints

All full names appear here because short internal codes are implementation details, not visitor-facing architecture.

| South to north | Route direction | Galleries in visit order | Crosscut location |
| --- | --- | --- | --- |
| Band 1 | west → east | Mediterranean Beginnings; Hellenistic & Roman Ways; Late Antiquity; Classical South Asia | between Hellenistic/Roman and Late Antiquity |
| Band 2 | east → west | Buddhist Philosophies; Warring States/Classical Chinese; Confucian Renewal/East Asian Continuities; Arabic & Islamic Worlds | between Classical Chinese and East Asian Continuities |
| Band 3 | west → east | Jewish Philosophy; Latin Christian/Scholastic; Core Questions Forum; Renaissance/New Science; Rationalism | through the Forum’s north and south thresholds |
| Band 4 | east → west | Empiricism; Enlightenment/Kant; German Idealism; Utility/Liberty/Capital; Faith/Pessimism/Life | between German Idealism and Utility/Liberty/Capital |
| Band 5 | west → east | Pragmatism; Analytic Traditions; Phenomenology/Existence; Critique/Power/Deconstruction | between Analytic Traditions and Phenomenology |
| Band 6 | east → west | Moral Life; Political Action/Justice; Feminist Philosophies; Colonialism/Race/Liberation | between Political Action/Justice and Feminist Philosophies |

The crosscut therefore consumes no exhibit wall. Each ordinary intersection is a 10 × 28 m crossing bay between two complete gallery end walls. The Forum is the sole gallery intentionally occupied by the crosscut. An intersection carries north/east/south/west orientation and the physical map, but it is not a gallery and contains no exhibit.

## Grand entrance and visitor functions

The Grand Entrance is a 40 × 56 m, double-height-feeling arrival volume attached to the first gallery band. Its implemented arrival sequence now begins on a level exterior forecourt beneath a luminous canopy, passes through open bronze-and-glass doors, crosses a compass-and-timeline floor inlay, and terminates at a framed Gallery 01 threshold. A coffered luminous ceiling, wall pilasters, and the orientation oculus give the room civic scale without placing decorative obstacles in the four-metre accessible route. It is deliberately larger and more legible than an ordinary circulation court.

It has four real jobs:

1. show the complete collection map and the visitor’s facing direction;
2. resume the last stable gallery/room/exhibit location;
3. choose the chronological route, north–south crosscut, guided visit, or labeled fast travel;
4. establish the Museum with one permanent orientation landmark.

It does not pretend that a virtual museum needs ticketing, lockers, a shop, a café, or a generic study lounge. A future study feature should be added only if it supports a real action such as saved comparisons, reading queues, or note export.

The final threshold after Colonialism, Race, and Liberation offers return to the entrance, the full map, or the end of the guided visit. The user is not forced to retrace the final gallery.

## Every room: construction state

The canonical source already names all **105 rooms** in [hall-program.json](./hall-program.json). The control JSON repeats each hall’s exact room IDs and binds them to a physical shell.

At the architectural migration and through subsequent gallery promotions:

- all 26 curated galleries remain whole hall-local roots;
- their room partitions, exhibits, imagery, attribution, lighting, signs, guided viewpoints, interactions, and local collision remain intact;
- Gallery 25 retains every approved room, floor, ceiling, partition, collision wall, doorway, lighting interface, safe arrival, and wall slot;
- its four curated rooms contain exactly six substantial installations each;
- every interaction, article link, image, attribution, guided stop, and route is production-backed;
- all 26 galleries are counted as curated/open and are available through walking and fast travel.

Future sequential galleries divide the 56 m long axis into equal named room spans unless their curation later justifies an authored adjustment. Four-room crossroads galleries use four independent quadrants. Enlightenment, Revolution, and Kant uses four perimeter rooms plus a distinct central Kant room. The current nine-room Forum layout is preserved.

The staging state is complete: visitors can understand the final building and reach every curated hall on foot or by fast travel. The map must show **26 curated/open galleries**.

## Exhibit-wall protection

Relocation does not relax [exhibit-wall-standard.md](./exhibit-wall-standard.md).

- The populated halls retain their exact executable room and wall-slot expectations.
- Crosscut openings occur only at hall ends, so they do not remove a normal room wall.
- Every curated room is audited for its approved shell, room count, walls, portals, collision, circulation, installation count, and content contracts.
- Each gallery’s exact room-by-room installation expectations remain in the executable Museum audit.
- An inactive optional portal is a full-height exhibit wall until a real live connection exists.
- No connector, status sign, or future threshold may be used to excuse a blank wall in a curated gallery.

## Movement, map, and URL contract

The chronological walk through all 26 large galleries is approximately 1.56 km. That length is inherent in preserving full-size galleries and allowing visitors to walk through them in sequence. It is not a mandatory route.

The crosscut gives six collection intersections in 168 m. The physical map and fast travel provide a second layer of navigation. The map must derive from the same manifest as rendered geometry and show:

- all 26 gallery shells with full titles;
- 26 curated/open states;
- two closed expansion reserves outside the 26-gallery program;
- the complete through route, crosscut, turn courts, entrance, final threshold, current position, and facing arrow;
- stable Gallery 01–26 release numbers and separate visit sequence when useful;
- all list, current-gallery, and fast-travel controls at 1920 × 1080 without scrolling.

Existing direct gallery and exhibit URLs remain stable. Session persistence changes from world-coordinate authority to stable gallery, room, and exhibit IDs. A saved old coordinate resolves to a new safe arrival in the same stable location; it is never replayed blindly into the new world.

## Loading and performance contract

The current residency solution remains authoritative:

- at most three hall-content subtrees resident;
- one recent hall retained when budget allows;
- 6 m approach preparation;
- 96 MiB decoded-texture budget.

The new building extends that pattern instead of mounting 26 galleries at Museum startup. Entrance controls, nearby architecture, and lightweight map metadata may load initially. Curated hall code and media load only for the active or prepared threshold target.

The map imports plan metadata, not Three.js hall scenes. A threshold becomes crossable only after its target code, nearest-room media, collision, safe arrival, and scene commit are ready.

## Two-gallery capacity reserve

Two 56 × 28 m structural/site reserves sit north of the final band, one on each side of the crosscut extension. Each can receive the largest normal rotated sequential template. Both are outside the approved 26-gallery program.

They begin as solid construction walls and do not appear as open map destinations. If either is commissioned, it opens from the crosscut extension rather than taking an exhibit wall from an existing gallery. No current room must be re-curated merely to activate a reserve.

## Migration and setup record

### Phase A — lock and compile the plan

1. Retain the former runtime manifest and production files as the one-release rollback artifact.
2. Add a versioned continuous-building manifest beside it.
3. Compile the 26 placements, 105 room IDs, five turn courts, five ordinary crossing bays, Forum crossing, entrance, final threshold, and two reserves from the control JSON.
4. Make the plan validator and runtime manifest validator compare the architectural coordinates through the declared plan-to-runtime handedness adapter, including the left/right sense of both bends in every turn court.

**Gate:** no geometry is hand-positioned outside the manifest and the plan validator passes.

### Phase B — architecture-only preview

1. Build the entrance, six shared-wall bands, crosscut, Forum bay, turn courts, final threshold, and both closed reserves.
2. Generate all future room shells with honest planned status; the architecture cutover left eight planned, the Gallery 20–21 promotions left six, the Gallery 19/22 promotions left four, the Gallery 23–24 promotions left two, and the Gallery 26 promotion leaves one.
3. Add collision, thresholds, safe arrivals, generic local lighting, facing-aware map geometry, and browser-visible development diagnostics.
4. Keep the preview private until the complete manifest passes; production cut over only after that gate.

**Gate:** every room and connection is walkable, no wall/ceiling gap is visible, no sign floats, no collider traps the visitor, the map exactly matches the shell, and no future media is loaded.

### Phase C — preserve the populated halls

1. Mount each existing hall definition under a manifest-controlled world transform.
2. Rotate the complete local root; do not rewrite exhibit coordinates individually.
3. Remap only end thresholds required by the new route and close every obsolete optional portal as a full wall.
4. Preserve stable hall, room, exhibit, asset, article, direct URL, guided-order, and interpretation IDs.
5. Recalculate world safe arrivals, guided camera poses, audio/light bounds, and map footprints from the root transform.
6. Check the Forum’s east/west chronological doors and north/south crosscut doors independently.

**Gate:** each populated hall passes its current audits and a two-direction visitor-eye visual review in its new world position.

### Phase D — atomic building integration

1. Replace old corridor/spoke nodes with the through route, crosscut, and turn courts.
2. Update directory and map states without renumbering any existing gallery.
3. Preserve Gallery 25’s curated records, room viewpoints, exhibit controls, and fast-travel destination.
4. Migrate sessions by stable location IDs.
5. Verify direct URLs, walking connections, guided visits, fast travel, reset, resume, and all adjacent-room transitions.
6. Keep the old manifest selectable until local and production verification succeeds.

**Gate:** there is no mixed old/new map, stranded open gallery, fictional route, eager media load, or stale saved-coordinate spawn.

### Phase E — release

1. Run the production build and the deterministic audits whose contracts changed; rely on CI for unchanged broad suites unless risk justifies a wider local pass.
2. Inspect the changed galleries, affected seams, visitor map, and one representative route in the browser at visitor eye level; widen the pass only when the changed contract justifies it.
3. Stage only intended files, commit, and push the production branch.
4. Wait for deployment success and repeat representative live walks, interactions, imagery checks, map checks, room counts, and console checks.

**Gate:** production, not the local branch, is the source of completion.

## Risks and resolved problems

| Risk | Resolution |
| --- | --- |
| Existing halls might not fit the plan | All 26 curated halls use exact canonical footprints; they fit the 28 m band system and remain local roots. |
| Crosscut could steal exhibit walls | It lands only at six threshold joints; the Forum is its sole gallery interior. |
| Forum could overlap neighbors | It owns an independent 28 × 28 m bay between complete galleries. |
| Completed curation could break the walking sequence | Every curated hall preserves its approved portals and collision-free primary circulation. |
| Building startup could eagerly initialize 26 halls | Existing three-subtree residency and lazy media preparation remain authoritative for all curated media bundles. |
| Old URLs and saved visits could break | IDs remain stable and saved locations migrate by gallery/room/exhibit ID, never raw coordinates. |
| Public numbers could become incoherent | Gallery number remains release identity; visit sequence is a separate field. |
| A later extra hall could damage a curated wall | Two full reserves open from the crosscut extension, not through existing galleries. |

## Real limitations

The plan is implemented; no discovered issue makes it impossible. Two limitations are real:

1. The full chronological route is long because the galleries are genuinely large. The crosscut, guided routes, and fast travel are necessary parts of normal use, not optional polish.
2. The migration is a building-level release. It should not be attempted as a series of production corridor patches; all current halls, routes, map projection, and session arrivals must cut over together.

## Construction authority

For runtime maintenance and each future gallery-curation release, treat these as the ordered sources of truth:

1. [single-level-building-plan.json](./single-level-building-plan.json) — coordinates, states, numbering, route, crosscut, entrance, reserves, and implementation contracts;
2. [hall-program.json](./hall-program.json) — 26 gallery identities and all 105 room identities;
3. [exhibit-wall-standard.md](./exhibit-wall-standard.md) — physical curation and wall-slot rules;
4. the current runtime hall definitions and audits — exact populated Gallery 01–24 content and local architecture;
5. [migration-plan.md](./migration-plan.md) — safe cutover procedure.

Do not improvise a new gallery position, orientation, shortcut, side doorway, corridor, entrance, or reserve during implementation. If a measured conflict appears, stop and amend this control plan before changing runtime geometry.
