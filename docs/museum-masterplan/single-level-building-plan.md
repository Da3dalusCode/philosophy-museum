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

The 262 × 168 m gallery block is a stepped continuous envelope, not a promise that every row has an equal east or west edge. Five enclosed exterior dogleg courts absorb the offsets without cutting back through a gallery footprint. Every court has two full-width right-angle turns, continuous ceiling guidance, and threshold wayfinding. Their longest uninterrupted run is 36 m, so they remain purposeful transitions rather than long, empty halls.

The 28 m band depth reconciles all approved templates without changing their interiors:

- a rotated `sequence-3` shell is 56 × 24 m and leaves 2 m of solid structure/services on each band side;
- a `crossroads-4` shell is 28 × 28 m and fills its band;
- the rotated Jewish Philosophy `standard-rect` shell is 24 × 20 m and leaves 4 m of solid structure/services on each side.

Those margins are walls and building services. They are not public gaps and do not appear as empty space in the Museum.

## The complete physical route

“Visit” below means architectural sequence. “Gallery” remains the stable public release number. Existing Gallery 01–12 numbers and URLs do not change.

| Visit | Public gallery | Full gallery title | State at architectural migration |
| ---: | ---: | --- | --- |
| 1 | Gallery 01 | Mediterranean Beginnings & Classical Athens | move populated hall |
| 2 | Gallery 14 | Hellenistic & Roman Ways of Life | build walkable planned shell |
| 3 | Gallery 15 | Late Antiquity & Neoplatonic Inheritance | build walkable planned shell |
| 4 | Gallery 07 | Classical South Asia: Jain, Yoga, and Brahmanical Systems | move populated hall |
| 5 | Gallery 08 | Buddhist Philosophies of Liberation and Knowledge | move populated hall |
| 6 | Gallery 09 | Warring States & Classical Chinese Traditions | move populated hall |
| 7 | Gallery 11 | Confucian Renewal & East Asian Continuities | move populated hall |
| 8 | Gallery 10 | Arabic & Islamic Philosophical Worlds | move populated hall |
| 9 | Gallery 12 | Jewish Philosophy in Arabic-Speaking & Mediterranean Worlds | move populated hall |
| 10 | Gallery 13 | Latin Christian & Scholastic Traditions | build walkable planned shell |
| 11 | Gallery 06 | Core Questions Forum | move populated hall |
| 12 | Gallery 02 | Renaissance, Political Order, and New Science | move populated hall |
| 13 | Gallery 16 | Rationalism: Mind, Nature, and System | build walkable planned shell |
| 14 | Gallery 17 | Empiricism, Science, and Political Order | build walkable planned shell |
| 15 | Gallery 18 | Enlightenment, Revolution, and Kant’s Critical Turn | build walkable planned shell |
| 16 | Gallery 19 | German Idealism & Romantic Afterlives | build walkable planned shell |
| 17 | Gallery 20 | Utility, Liberty, History, and Capital | build walkable planned shell |
| 18 | Gallery 21 | Faith, Pessimism, Life, and Value | build walkable planned shell |
| 19 | Gallery 22 | Pragmatism, Science, and Democratic Inquiry | build walkable planned shell |
| 20 | Gallery 04 | Analytic Traditions: Logic, Language, and Analysis | move populated hall |
| 21 | Gallery 03 | Phenomenology, Existence, and Embodiment | move populated hall |
| 22 | Gallery 23 | Critique, Power, and Deconstruction | build walkable planned shell |
| 23 | Gallery 24 | Moral Life & Practical Reason | build walkable planned shell |
| 24 | Gallery 05 | Political Action, Justice, and Democratic Reason | move populated hall |
| 25 | Gallery 25 | Feminist Philosophies | build walkable planned shell |
| 26 | Gallery 26 | Colonialism, Race, and Liberation | build walkable planned shell |

Future public numbers intentionally begin with Gallery 13 for Latin Christian & Scholastic Traditions, the already planned successor to Jewish Philosophy. Release numbering is not rewritten to imitate the architectural chronology.

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

The Grand Entrance is a 40 × 56 m, double-height-feeling arrival volume attached to the first gallery band. It is deliberately larger and more legible than the current entrance court.

It has four real jobs:

1. show the complete collection map and the visitor’s facing direction;
2. resume the last stable gallery/room/exhibit location;
3. choose the chronological route, north–south crosscut, guided visit, or labeled fast travel;
4. establish the Museum with one permanent orientation landmark.

It does not pretend that a virtual museum needs ticketing, lockers, a shop, a café, or a generic study lounge. A future study feature should be added only if it supports a real action such as saved comparisons, reading queues, or note export.

The final threshold after Colonialism, Race, and Liberation offers return to the entrance, the full map, or the end of the guided visit. The user is not forced to retrace the final gallery.

## Every room: construction state

The canonical source already names all **105 rooms** in [hall-program.json](./hall-program.json). The control JSON repeats each hall’s exact room IDs and binds them to a physical shell.

At the architectural migration:

- the 12 existing populated galleries move as whole hall-local roots;
- their room partitions, exhibits, imagery, attribution, lighting, signs, guided viewpoints, interactions, and local collision remain intact;
- the 14 future galleries receive every named room, floor, ceiling, partition, collision wall, doorway, lighting interface, safe arrival, and geometry-only wall slot;
- future walls remain blank except for one honest, noninteractive status sign at the gallery entrance;
- no placeholder exhibit, fake interaction, article link, quotation, image, or attribution is created;
- a planned shell is walkable because the continuous route must remain intact, but it is not counted as an open gallery.

Future sequential galleries divide the 56 m long axis into equal named room spans unless their curation later justifies an authored adjustment. Four-room crossroads galleries use four independent quadrants. Enlightenment, Revolution, and Kant uses four perimeter rooms plus a distinct central Kant room. The current nine-room Forum layout is preserved.

This is a deliberate staging state: visitors can understand the final building, reach every populated hall on foot, and see exactly which galleries are awaiting curation. The map must distinguish **14 curated open galleries** from **12 walkable planned shells**.

## Exhibit-wall protection

Relocation does not relax [exhibit-wall-standard.md](./exhibit-wall-standard.md).

- The populated halls retain their exact executable room and wall-slot expectations.
- Crosscut openings occur only at hall ends, so they do not remove a normal room wall.
- A planned empty room is audited for correct shell, room count, walls, portals, collision, circulation, and status—not for six installations.
- When a future gallery becomes curated-open, its exact room-by-room installation expectations must be added to the executable Museum audit in that same release.
- An inactive optional portal is a full-height exhibit wall until a real live connection exists.
- No connector, status sign, or future threshold may be used to excuse a blank wall in a curated gallery.

## Movement, map, and URL contract

The chronological walk through all 26 large galleries is approximately 1.56 km. That length is inherent in preserving full-size galleries and allowing visitors to walk through them in sequence. It is not a mandatory route.

The crosscut gives six collection intersections in 168 m. The physical map and fast travel provide a second layer of navigation. The map must derive from the same manifest as rendered geometry and show:

- all 26 gallery shells with full titles;
- 14 curated/open and 12 planned/walkable states;
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

The new building extends that pattern instead of mounting 26 galleries at Museum startup. Entrance controls, nearby architecture, and lightweight map metadata may load initially. Populated hall code and media load only for the active or prepared threshold target. Planned shells share low-cost architecture/material modules and import no exhibit media.

The map imports plan metadata, not Three.js hall scenes. A threshold becomes crossable only after its target code, nearest-room media, collision, safe arrival, and scene commit are ready. The empty future shells remain cheap because they contain no content bundle.

## Two-gallery capacity reserve

Two 56 × 28 m structural/site reserves sit north of the final band, one on each side of the crosscut extension. Each can receive the largest normal rotated sequential template. Both are outside the approved 26-gallery program.

They begin as solid construction walls and do not appear as open map destinations. If either is commissioned, it opens from the crosscut extension rather than taking an exhibit wall from an existing gallery. No current room must be re-curated merely to activate a reserve.

## Migration and setup record

### Phase A — lock and compile the plan

1. Retain the former runtime manifest and production files as the one-release rollback artifact.
2. Add a versioned continuous-building manifest beside it.
3. Compile the 26 placements, 105 room IDs, five turn courts, five ordinary crossing bays, Forum crossing, entrance, final threshold, and two reserves from the control JSON.
4. Make the plan validator and runtime manifest validator compare the same coordinates and template transforms.

**Gate:** no geometry is hand-positioned outside the manifest and the plan validator passes.

### Phase B — architecture-only preview

1. Build the entrance, six shared-wall bands, crosscut, Forum bay, turn courts, final threshold, and both closed reserves.
2. Generate all 14 future room shells with honest planned status.
3. Add collision, thresholds, safe arrivals, generic local lighting, facing-aware map geometry, and browser-visible development diagnostics.
4. Keep the preview private until the complete manifest passes; production cut over only after that gate.

**Gate:** every room and connection is walkable, no wall/ceiling gap is visible, no sign floats, no collider traps the visitor, the map exactly matches the shell, and no future media is loaded.

### Phase C — transplant the 12 populated halls

1. Mount each existing hall definition under a manifest-controlled world transform.
2. Rotate the complete local root; do not rewrite exhibit coordinates individually.
3. Remap only end thresholds required by the new route and close every obsolete optional portal as a full wall.
4. Preserve stable hall, room, exhibit, asset, article, direct URL, guided-order, and interpretation IDs.
5. Recalculate world safe arrivals, guided camera poses, audio/light bounds, and map footprints from the root transform.
6. Check the Forum’s east/west chronological doors and north/south crosscut doors independently.

**Gate:** each populated hall passes its current audits and a two-direction visitor-eye visual review in its new world position.

### Phase D — atomic building integration

1. Replace old corridor/spoke nodes with the through route, crosscut, and turn courts.
2. Update directory and map states without renumbering Gallery 01–12.
3. Add stable Gallery 13–26 planned records and room viewpoints without adding exhibit controls.
4. Migrate sessions by stable location IDs.
5. Verify direct URLs, walking connections, guided visits, fast travel, reset, resume, and all adjacent-room transitions.
6. Keep the old manifest selectable until local and production verification succeeds.

**Gate:** there is no mixed old/new map, stranded open gallery, fictional route, eager media load, or stale saved-coordinate spawn.

### Phase E — release

1. Run every required build, content, routing, Museum, asset, and accuracy audit.
2. Inspect the entrance, map, 105 rooms, six crosscut intersections, five turn courts, and all populated rooms in the browser at visitor eye level.
3. Stage only intended files, commit, and push the production branch.
4. Wait for deployment success and repeat representative live walks, interactions, imagery checks, map checks, room counts, and console checks.

**Gate:** production, not the local branch, is the source of completion.

## Risks and resolved problems

| Risk | Resolution |
| --- | --- |
| Existing halls might not fit the plan | All 12 now use exact canonical footprints; they fit the 28 m band system and can move as local roots. |
| Crosscut could steal exhibit walls | It lands only at six threshold joints; the Forum is its sole gallery interior. |
| Forum could overlap neighbors | It owns an independent 28 × 28 m bay between complete galleries. |
| Future empty halls could break the walking sequence | All named room shells are walkable but truthfully labeled planned; they are not counted as open. |
| Building startup could eagerly initialize 26 halls | Existing three-subtree residency and lazy media preparation remain authoritative; planned shells contain no media bundles. |
| Old URLs and saved visits could break | IDs remain stable and saved locations migrate by gallery/room/exhibit ID, never raw coordinates. |
| Public numbers could become incoherent | Gallery number remains release identity; visit sequence is a separate field. |
| A later extra hall could damage a curated wall | Two full reserves open from the crosscut extension, not through existing galleries. |

## Real limitations

The plan is plausible and implementable; no discovered issue makes it impossible. Three limitations are real:

1. The full chronological route is long because the galleries are genuinely large. The crosscut, guided routes, and fast travel are necessary parts of normal use, not optional polish.
2. The migration is a building-level release. It should not be attempted as a series of production corridor patches; all current halls, routes, map projection, and session arrivals must cut over together.
3. Fourteen galleries will visibly be architectural previews until curated. That is the honest cost of building the complete walkable museum before filling it. They must never be advertised or counted as finished exhibitions.

## Construction authority

For runtime maintenance and each future gallery-curation release, treat these as the ordered sources of truth:

1. [single-level-building-plan.json](./single-level-building-plan.json) — coordinates, states, numbering, route, crosscut, entrance, reserves, and implementation contracts;
2. [hall-program.json](./hall-program.json) — 26 gallery identities and all 105 room identities;
3. [exhibit-wall-standard.md](./exhibit-wall-standard.md) — physical curation and wall-slot rules;
4. the current runtime hall definitions and audits — exact populated Gallery 01–12 content and local architecture;
5. [migration-plan.md](./migration-plan.md) — safe cutover procedure.

Do not improvise a new gallery position, orientation, shortcut, side doorway, corridor, entrance, or reserve during implementation. If a measured conflict appears, stop and amend this control plan before changing runtime geometry.
