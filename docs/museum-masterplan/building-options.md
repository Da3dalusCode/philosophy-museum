# Physical building decision record

## Current decision

The approved physical planning basis is the single-level **Continuous Enfilade**:

- [architectural control plan](./single-level-building-plan.md);
- [machine-readable geometry](./single-level-building-plan.json);
- [1:1000 construction-control drawing](./diagrams/continuous-enfilade-single-level.svg).

It holds the approved 10-wing, 26-gallery, 105-room program in six back-to-back structural bands and is now the active production runtime. Galleries 01–18 retain curated hall-local roots; Galleries 19–26 are complete planned/walkable shells.

## What the earlier masterplan did and did not decide

The earlier masterplan decided the intellectual program, reusable hall templates, stable IDs, a central comparative Forum, accessible thresholds, multiple routes, lazy-loaded hall content, and capacity reservations. Its Ring diagrams were conceptual. They did **not** assign final scaled coordinates, orientations, connector lengths, doorway slots, or a complete building envelope.

As a result, Galleries 01–12 were placed incrementally as each release was built. Those placements were not random, but they were optimized locally rather than compiled from a final construction drawing. The accumulated long corridors, irregular orientation, and shortcut logic are therefore not preserved as design commitments.

The room-scale work is reusable. All sixteen open halls now conform to canonical template footprints and hall-local geometry. Their collective world transforms, connectors, entrance relationship, and map are the parts being replaced.

## Reviewed concepts

| Concept | Levels | Primary strength | Blocking weakness | Decision |
| --- | ---: | --- | --- | --- |
| Ring of Wings | 1 | central return and multiple routes | only conceptual; produced incremental spokes/corridors rather than a buildable final envelope | archived design history |
| Braided Promenade | 2 | smaller level footprints | would require lifts/stairs, level-aware collision, sessions, fallback routes, and maps before the one-level system is stable | deferred comparison only |
| Pavilion Campus | 1 | strong wing identities | too much exterior/interstitial movement for a virtual museum and weaker through-gallery continuity | archived |
| Forum Cloister | 1 | first complete scaled exercise | excessive central void and promenades; visitors would leave galleries for long circulation runs | rejected |
| Compact Enfilade Matrix | 1 | chronological rows and central crosscut | unexplained spaces between rows made it read as blocks in a field, not one building | rejected |
| **Continuous Enfilade** | **1** | **shared walls, through-gallery sequence, crosscut at joints, independent Forum bay, grand entrance** | **full visit is long; future shells remain visibly uncurated** | **approved and implemented** |

## Why the Continuous Enfilade was selected

### It behaves like one building

Six 28 m structural bands touch back-to-back. The 24 m-deep sequential shells sit inside those bands with 2 m of solid wall/services on each side. There is no public gap between rows. Crossroads galleries fill a complete band.

### It keeps the successful through-gallery behavior

The chronological route alternates direction by band. A visitor exits through the far end of a gallery and continues to the next one. Five enclosed exterior dogleg courts connect row ends with full-width bends, ceiling guidance, and threshold wayfinding. Their longest uninterrupted run is 36 m; none is a long empty wing.

### It gives the crosscut a real architectural job

The 10 m north–south crosscut intersects all six bands. Five intersections occupy purpose-built threshold bays between galleries. The sixth passes through the Core Questions Forum. No normal gallery room or exhibit wall is pierced.

### It resolves the Forum overlap problem

The Core Questions Forum occupies a complete 28 × 28 m room between Latin Christian & Scholastic Traditions and Renaissance/New Science. Jewish Philosophy and Rationalism occupy the next full bays. The Forum does not cover, notch, or borrow space from any of them.

### It makes the entrance useful in a virtual museum

The 40 × 56 m Grand Entrance is a double-height-feeling orientation volume. It provides the map, facing direction, resume, route selection, guided visit, and fast travel. Tickets, lockers, café, shop, and generic study space are excluded because they would be scenery without a meaningful virtual function.

### It supports two more galleries without damaging existing walls

Two 56 × 28 m reserves sit at the north end of the crosscut. If commissioned, they open from the crosscut extension. They do not require a new side doorway through a curated hall.

## Exact comparative measures

| Measure | Continuous Enfilade |
| --- | ---: |
| Main gallery block | 262 × 168 m |
| Controlled bounds with entrance and reserves | 282 × 224 m |
| Nominal gallery floor area | approximately 30,160 m² |
| Complete through-gallery route | approximately 1,560 m |
| Public crosscut | 10 × 168 m |
| Grand Entrance | 40 × 56 m |
| Core Questions Forum | 28 × 28 m |
| Turn courts | 5, maximum straight run 36 m |
| Additional full gallery reserves | 2 |
| Public levels | 1 |

The complete visit length is a consequence of 26 full galleries, not wasted corridor. The direct crosscut, guided routes, map, and fast travel are part of the normal visitor model.

## Template and connector contract

| Template | Local footprint | Final world footprint | Normal route portals |
| --- | --- | --- | --- |
| Sequential multi-room gallery | 24 × 56 m | 56 × 24 m at 90° | transformed `S0` west and `N0` east |
| Crossroads gallery | 28 × 28 m | 28 × 28 m | `W0` and `E0` |
| Jewish Philosophy rectangular gallery | 20 × 24 m | 24 × 20 m at 90° | transformed `S0` west and `N0` east |

The Forum additionally uses `N0` and `S0` for the crosscut. No other gallery needs a crosscut side opening. Unused optional portals render and collide as full walls.

Directly adjacent galleries share a 4 m clear threshold. A crosscut pair has a 10 m crossing bay between end portals. A turn court begins and ends exactly at the two transformed route portals. The runtime map may not infer or draw another edge.

## Room-architecture decision

The 18 populated halls retain complete hall-local roots. This preserves their current room partitions, installations, media, lighting, signs, interpretation, guided views, and collision.

The remaining 10 halls use the approved templates to construct every canonical room:

- sequential rooms divide the long axis into equal named spans until curation supplies a reviewed override;
- four-room crossroads galleries use four independent quadrants;
- Enlightenment/Revolution/Kant uses four perimeter rooms plus a distinct central Kant room;
- planned rooms expose geometry and circulation only, not fake exhibits or controls.

This is why the migration remained bounded: populated content did not need to be individually reauthored, while building-level transforms, portals, map projection, safe arrivals, and saved sessions were rebuilt from the control manifest.

## Single level versus a future multi-level study

A multi-level museum remains technically possible, but it is not the current plan. It would require at least:

- three redundant accessible vertical cores;
- lifts, stairs, landings, collision, and movement transitions;
- level-aware map projection, current-position state, facing, fast travel, and guided routes;
- session persistence across levels and safe fallback when a core is unavailable;
- per-level residency/prefetch rules and browser visual review;
- a revised construction drawing proving that reduced footprint or walking distance offsets the complexity.

The app has no implemented level transition. A multi-level comparison should be commissioned only if production evidence shows that the implemented single-level plan’s 282 × 224 m controlled footprint or 1.56 km complete route is unacceptable.

## Decision change control

The following are locked unless the control plan is amended first:

- hall centers and rotations;
- the six band centerlines;
- visit sequence;
- stable public Gallery 01–26 numbers;
- five turn-court endpoints;
- six crosscut intersections;
- Forum, entrance, final-threshold, and reserve footprints;
- planned versus populated migration states.

Implementation may refine finishes, ceiling articulation, threshold detailing, light fixtures, and room partitions in future uncurated galleries. It may not improvise a new corridor, shortcut, side portal, hall orientation, or map edge to solve a local coding problem.
