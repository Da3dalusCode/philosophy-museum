# Museum doorway structural-residency pilot

Status: feature-branch pilot for owner visual review. This record does not
declare the work merged, deployed, or production-approved.

## Scope

The pilot promotes the authored low-cost structural layer for exactly two
public halls:

- Gallery 01: `mediterranean-beginnings-classical`
- Gallery 14: `hellenistic-roman-ways`

The Grand Entrance remains part of the existing permanent circulation layer.
No other gallery is promoted. The normal Museum residency contract remains
unchanged:

- at most 3 resident hall-content subtrees;
- 1 recent hall;
- a 6 m approach distance; and
- a 96 MiB decoded-texture budget.

## Root cause

Permanent circulation pre-subtracted connected hall openings, while the hall
walls, floors, ceilings, partitions, tracks, signs, silhouettes, and local
lighting lived inside lazy resident content. At a doorway viewed from beyond
the 6 m approach radius, the permanent wall already contained the opening but
the room behind it did not exist. Crossing the threshold mounted the whole
hall scene and produced an architectural and lighting pop.

The Entrance-to-Gallery-01 case also exposed a registration-state mismatch:
the next public hall could already be considered active while its physical
content was not resident, causing a large group of exhibit spotlights to mount
at the same threshold. The Gallery-01-to-Gallery-14 seam additionally required
one authoritative structural owner because both authored halls occupy the same
world wall plane.

## Implemented split

`museumStructuralResidency.ts` defines the exact pilot membership and the pure
permanent/resident mount policy. `MuseumPermanentHallStructure.tsx` mounts the
pilot structure outside lazy hall registration:

- authored floor and ceiling cells;
- perimeter walls, doorway jambs, lintels, and closures;
- all eight existing Gallery 14 baffles, unchanged;
- ceiling strips, tracks, and fixture bodies;
- template threshold interfaces with one seam owner;
- benches, low-cost signs, plinth/backing silhouettes, and the Gallery 01
  orientation installation body; and
- one low-cost active-hall base light.

Resident content retains high-resolution media, interpretation faces, labels,
supplemental installations, interaction meshes, and exhibit spotlights. Pilot
resident scenes explicitly omit the promoted structural bodies so approaching
a doorway cannot create a second coplanar copy.

Ordinary connectors still keep the last public hall as the full-content and
lighting owner. Only the Grand Entrance suppresses that logical ownership,
because its compatibility route is already Gallery 01 before the visitor has
crossed the Gallery 01 threshold.

Generated pilot sign textures are accounted as persistent structural texture
cost. High-resolution `MuseumSceneMedia` and supplemental exhibit renderers
remain outside the permanent static module closure.

## Shared-wall geometry

`museumWallGeometry.ts` is the single production and audit implementation for
wall render geometry, world-space planes, exact transformed footprints,
subtraction, overlap measurement, and fragment reconstruction.

The implementation:

- respects both width-long and depth-long authored walls;
- combines hall and wall rotations instead of axis-snapping;
- honors `renderCenter` and `renderSize` overrides;
- preserves collision centers and sizes when emitting visual fragments; and
- assigns each shared atomic wall region to one owner.

Gallery 01 is compiled first at the pilot seam. Gallery 14's coincident W0
surface is subtracted into non-overlapping fragments, and its E0 portal remains
the existing open 4 m × 3.2 m enfilade. Threshold light geometry at the
Gallery-01/Gallery-14 seam is also emitted by one owner.

## Deterministic development evidence

The development-only `?museumPilot=1` harness provides four exact camera poses
without changing production behavior:

1. Entrance → Gallery 01 far: `[97, 1.7, -70]`
2. Entrance → Gallery 01 near: `[94.5, 1.7, -70]`
3. Gallery 01 → Gallery 14 far: `[41, 1.7, -70]`
4. Gallery 01 → Gallery 14 near: `[38.5, 1.7, -70]`

The camera uses a 66° field of view and looks west at each portal. The harness
publishes hidden DOM telemetry for the camera, viewport, resident/load states,
renderer counters, lights, structural IDs, owners, layers, materials, and
world bounds. Its behavior is statically disabled in production builds.

At both transitions, the final far, retreat, and reload captures have the same
44 pilot structural IDs and identical renderer/light counts:

| Transition far pose | Calls | Triangles | Geometries | Textures | Lights |
| --- | ---: | ---: | ---: | ---: | ---: |
| Entrance → Gallery 01 | 506 | 7,586 | 652 | 23 | 9 |
| Gallery 01 → Gallery 14 | 316 | 4,546 | 1,063 | 94 | 30 |

The second row uses the reload capture because WebGL memory counters include
session/cache history. Calls and triangle counts are deterministic at all
three far-state captures. The high-resolution texture admission audit remains
below the unchanged 96 MiB ceiling.

## Automated guardrails

The Museum audits exercise the production geometry and residency helpers.
Coverage includes:

- exact two-hall pilot membership and unchanged residency policy;
- far → near → retreat → reload mount states;
- stable permanent structural IDs and zero resident duplicate architecture;
- width-long, depth-long, arbitrary-rotation, and render-override fixtures;
- fragment round trips, subtraction conservation, and non-overlap;
- real Entrance/Gallery-01 and Gallery-01/Gallery-14 aperture, jamb, lintel,
  endpoint, dimension, and ownership probes;
- Gallery 14 E0 openness and exact preservation of all eight baffles;
- texture-budget admission; and
- a Vite module-graph audit proving that the permanent closure includes only
  the structural implementation and excludes canonical scenes, scene media,
  and supplemental exhibit modules.

## Boundaries and rollback

This is intentionally not an all-gallery conversion and does not alter the
approved Gallery 14 architecture, collision layout, public IDs, routing,
directory, map, sessions, or interaction system. A broader rollout should be a
separate owner decision informed by this pilot's visual and performance
evidence.

Rollback is a normal Git revert of the feature-branch commits. There is no
database, data migration, or external service change.
