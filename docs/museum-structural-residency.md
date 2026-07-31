# Museum structural residency

Status: production model for the canonical 26-gallery Museum.

## Why this exists

The Museum used to keep connected doorway openings in permanent circulation
geometry while the rooms behind those openings lived inside lazy hall-content
subtrees. From more than six metres away, a visitor could therefore see a
doorway into empty space. Moving closer mounted an entire room at once and
caused a visible architecture and lighting pop.

Gallery 01 and Gallery 14 proved the corrective model in a two-hall pilot. The
production rollout applies that same model to every canonical hall without
changing the approved building plan, collision layout, content-residency
limits, or visitor routes.

## Permanent world, lazy content

All 26 canonical halls now keep their authored low-cost physical truth mounted:

- floors, ceilings, perimeter walls, partitions, doorway jambs, and lintels;
- template interfaces, with exactly one owner at every shared threshold;
- tracks and fixture bodies;
- benches and other low-cost furnishings;
- primary-installation plinths and backing silhouettes; and
- sign bodies.

High-resolution exhibit media, interpretation faces, supplemental
installations, interaction meshes, generated sign faces, and exhibit
spotlights remain lazy. The two visually approved pilot halls retain their
generated sign faces in the permanent layer; the other 24 halls mount those
faces only while their content is resident. This 26-structure/2-sign-face split
keeps the persistent decoded-texture estimate at 17.88 MiB and the audited
active/approach peak at 92.79 MiB under the unchanged 96 MiB cap.

The content-residency contract remains:

- at most three resident hall-content subtrees;
- one recent hall;
- a six-metre approach distance; and
- a 96 MiB decoded-texture budget.

## Ownership and geometry

`museumStructuralResidency.ts` defines the permanent/resident mount policy.
`MuseumPermanentHallStructure.tsx` renders the permanent world outside lazy
hall registration. `CanonicalMuseumHallScene.tsx` supplies only the lazy
complement, so no resident subtree can draw a second shell.

Permanent wall and portal ownership follows physical building-manifest order,
not configurable activation order. `museumWallGeometry.ts` is the shared
production and audit implementation for transformed wall planes, subtraction,
overlap measurement, and fragment reconstruction. It respects arbitrary
rotation and render overrides while preserving collision geometry.

The compiled production plan covers 105 named program rooms or zones through
100 physical spatial cells and all 39 hall-touching physical connections. The
Core Questions Forum's nine semantic routes share four physical question bays;
every other gallery keeps a one-to-one room/zone-to-cell mapping. Automated probes verify open apertures,
single-owner jambs and lintels, one threshold owner, and closure of all 64
inactive hall slots. Pairwise world-plane checks reject coplanar duplicates.

## Deterministic evidence harness

The development-only `?museumPilot=1` harness provides exact camera poses for
the original pilot and representative non-pilot seams:

1. Entrance → Gallery 01 far/near: keys `1` and `2`
2. Gallery 01 → Gallery 14 far/near: keys `3` and `4`
3. Gallery 15 → Gallery 07 far/near: keys `5` and `6`
4. Gallery 08 → Gallery 09 far/near: keys `7` and `8`
5. Gallery 06 → Gallery 02 far/near: keys `9` and `0`
6. Turn Court 03→04 → Gallery 17 far/near: keys `[` and `]`

Pressing `P` refreshes full scene telemetry. The hidden record contains the
camera, viewport, all 26 hall states, renderer counters, stable light IDs,
stable semantic structural IDs, owners, residency layers, materials, and world
bounds. Normal interval updates reuse the cached scene record, avoiding a
full-scene traversal every 250 ms. The harness is inert unless its development
query flag is present.

## Automated guardrails

The Museum audits cover:

- exact 26-hall structural membership and the two-hall permanent sign-face
  exception;
- invariant structure across every active and directed-approach residency
  state;
- zero permanent media ownership and zero resident duplicate shells;
- physical-order ownership at every shared wall and portal;
- all hall-touching apertures, jambs, lintels, and thresholds;
- all inactive portal closures and all authored-wall coverage;
- preservation of special baffles, crosscuts, and render-only lintels;
- decoded-texture admission under 96 MiB; and
- a Vite module-graph check that excludes canonical content scenes,
  supplemental renderers, and scene media from the permanent closure.

Rollback is a normal Git revert. There is no backend, database, migration, or
external runtime service involved.
