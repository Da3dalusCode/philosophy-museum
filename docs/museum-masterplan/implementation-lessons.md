# Continuous Enfilade implementation lessons

**Status:** binding regression guidance for every Museum architecture, gallery-completion, and deployment turn.

This document records failures that reached review during the Continuous Enfilade build and the invariants that now prevent them from recurring. It supplements the dimensioned control plan; it does not redesign it.

## Coordinate frames and map agreement

- Architectural control data stays east-positive and north-positive.
- Exactly one adapter embeds it in Three.js: `runtime.x = -plan.x`, `runtime.z = plan.z`. Hall yaw is derived through the same adapter.
- The visitor map reflects runtime X back once. No hall, turn, sign, or movement helper may add a second ad-hoc mirror.
- A turn shown as left on the north-up map must feel left to a visitor walking the corresponding route, and likewise for right.

**Regression gate:** test both travel directions and both bends of all five turn courts. A numerical transform match is insufficient if embodied handedness disagrees with the map.

## Portal seams and movement continuity

- A committed doorway crossing preserves the visitor’s continuous world-space trajectory through the source and target local transforms.
- Safe-arrival poses are recovery points for fast travel, direct routes, session migration, and failed-load recovery. They are not routine post-crossing snap targets.
- Crossing detection must tolerate realistic movement substeps without repeatedly changing ownership at the seam.
- Semantic room-entry anchors must not reload merely because the visitor crossed into a neighboring hall.

**Regression gate:** walk every changed seam in both directions, including off-center approaches. Assert no lateral jump, backward snap, repeated threshold trigger, collider capture, or surprise exhibit-facing teleport.

## Turn-court construction

- A turn court is one architectural union of its complete cells and segments, not several overlapping corridor boxes.
- Rendered walls and collision walls derive from the same union. Openings are subtracted before surfaces are emitted.
- Coplanar or covered faces are split or omitted; partial wall faces must never cut across a valid path or occlude a sightline around a bend.
- The full eight-metre clear route, continuous ceiling guidance, and both right-angle bends remain intact.

**Regression gate:** inspect each bend at visitor eye height from both approaches. Confirm complete wall and ceiling surfaces, passage clearance, visible next-path guidance, and agreement between render geometry and collision.

## Signs and visitor-facing orientation

- Sign orientation is defined by its readable front normal and the intended approach direction, not by copying a rotation from another coordinate frame.
- Threshold and room signs must be readable before the decision point without blocking an opening or exhibit.

**Regression gate:** verify the dot product between the sign’s front normal and the visitor-to-sign approach vector, then visually inspect it from the actual route. A plausible Euler angle alone is not evidence that the sign faces correctly.

## Curating a planned shell

- Promote the gallery atomically across the canonical program, public roster, compiled manifest state, map/directory/fast travel, hall-local content, interpretations, supplemental registry, renderer, local media, guided stops, and audits.
- Remove the planned-status sign by recompiling from the changed migration state; never layer curated content over a planned shell.
- Preserve the approved hall transform, route portals, room IDs, and architecture. Gallery completion is a hall-local content operation unless a measured control-plan conflict is documented.
- Fill every usable exhibit face at the established scale. Primary and supplemental installations receive unique physical slots, relevant provenance-backed media, interpretation, article routing, and keyboard/mouse activation.
- Treat physical media as museum-wide installations, not gallery-local decorations. A newly curated gallery must not reuse an asset ID, exact source page, or identical derivative already hanging elsewhere; select a distinct relevant object instead.
- Keep the displayed interpretation source synchronized with the actual image asset and its locked provenance record. Replacing an image requires updating the asset ID, local derivatives, source link, rights note, and audit lock together.
- Planning capacity is an allowance, not permission to invent philosophers or duplicate a primary assignment. Context installations can complete the physical room while keeping the exact-once intellectual roster intact.

**Regression gate:** compare room-by-room primary and supplemental counts with the wall standard, test the full guided order, and confirm that no physical installation repeats an image anywhere in the live museum.

## Release verification

- Deterministic audits must encode every bug class fixed in the turn whenever a stable assertion is possible.
- Local browser review covers both directions through changed seams, room entries, every new wall face, interactions, attribution, guided visits, map state, and console/network errors.
- Deployment is not complete at `git push`. Wait for the production workflow, load the deployed commit, and repeat the named live flows.
- Unrelated worktree files are never staged as part of a Museum release.
