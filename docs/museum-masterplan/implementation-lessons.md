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
- The compiler deliberately removes planned-shell room geometry when a hall becomes `migrate-populated`. Re-author the approved hall-local bounds, spatial openings, collision partitions, and render-only lintels in the curated module during the same promotion; otherwise a state change silently erases part of the shell.
- Lintels above passable openings are render-only architecture. Never add their footprints to two-dimensional collision, and never omit them merely because the floor opening is correct.
- Choose placement coordinates against the actual installation footprint class and the live doorway-landing padding. Full-scale primaries, supplemental millwork, and compact portal returns do not have interchangeable depths.
- A route that clears collision by only a few centimetres is not visitor-ready. Doorway bends and baffle bypasses retain an additional practical steering margin beyond the player radius; thin exhibit millwork may preserve its display face without borrowing the full depth of an architectural wall.
- Resolve the default spawn from the hall’s declared route-entry portal. Do not assume `N0`; Gallery 18’s chronological entry is `E0`.
- Fill every usable exhibit face at the established scale. Primary and supplemental installations receive unique physical slots, relevant provenance-backed media, interpretation, article routing, and keyboard/mouse activation.
- Treat physical media as museum-wide installations, not gallery-local decorations. A newly curated gallery must not reuse an asset ID, exact source page, or identical derivative already hanging elsewhere; select a distinct relevant object instead.
- Keep the displayed interpretation source synchronized with the actual image asset and its locked provenance record. Replacing an image requires updating the asset ID, local derivatives, source link, rights note, and audit lock together.
- Planning capacity is an allowance, not permission to invent philosophers or duplicate a primary assignment. Context installations can complete the physical room while keeping the exact-once intellectual roster intact.

**Regression gate:** compare room-by-room primary and supplemental counts with the wall standard; assert approved bounds, partitions, lintels, route-entry spawn, installation footprints, and a practical steering margin around baffles; test the full guided order; and confirm that no physical installation repeats an image anywhere in the live museum.

## Visual-medium diversity

- A photographed title page, open page of uninterrupted writing, or single closed book is an exception justified by the material history of that exact text, not the default image for an argument.
- Completed galleries classify every newly installed image by visual character. Portraits and figures, artworks and social scenes, places and architecture, material objects, and maps or diagrams must collectively dominate the room.
- A page that contains a genuinely interpretive illustration, map, scientific diagram, or materially distinctive annotation is classified by that visual subject rather than automatically as text-only. The panel must explain what the visitor should look at.
- The retrospective Gallery 01–16 audit replaces the gallery-wide approximation with the stricter room rule: no completed room may display more than one text-dominant page or isolated-book view. This is a room-level ceiling, not a target.
- When a source page is materially indispensable but would exceed the room ceiling, a contextual composite may retain the authenticated object as a subordinate inset while a clearly contemporary, subject-specific visual study carries the frame. The rights panel must say that the surrounding study is interpretive and not a historical reconstruction.
- Galleries 17 and 18 retain their original gallery-wide ceilings in addition to the room rule: no more than 3 of 18 Gallery 17 installations and no more than 4 of 25 Gallery 18 installations may be text-dominant pages or single-book views.
- Media variety does not excuse weak relevance. Every image still needs a direct relationship to the displayed person, work, practice, institution, event, or argument, with accurate provenance and an explicit interpretive reason for being on the wall.

**Regression gate:** require an explicit visual-character value for every asset added during a gallery promotion; classify every legacy manuscript, document, papyrus, and book-page installation as retained text, visually rich material, or contextual composite; enforce the one-per-room ceiling; preserve the Gallery 17/18 gallery ceilings; and confirm that at least four non-textual visual-character groups appear across newly promoted galleries.

## Release verification

- Deterministic audits must encode every bug class fixed in the turn whenever a stable assertion is possible.
- Keep local verification risk-scoped: run the focused contract audits and one representative browser pass for changed galleries, seams, routes, and map state. Let unchanged broad content suites run in CI rather than repeating them without a release-specific reason.
- Local browser review covers both directions through changed seams, room entries, every new wall face, interactions, attribution, guided visits, map state, and console/network errors.
- Deployment is not complete at `git push`. Wait for the production workflow, load the deployed commit, and repeat the named live flows.
- Unrelated worktree files are never staged as part of a Museum release.
