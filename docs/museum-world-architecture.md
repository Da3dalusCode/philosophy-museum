# Museum continuous-world architecture

## Current artifact

The Museum is one walkable six-gallery world:

1. **Ancient Greek & Hellenistic Philosophy** — Classical foundations, Hellenistic ways of life, and Neoplatonism.
2. **Renaissance, Reason, and Revolution** — power and method; sovereignty, rights, and nature; experience, freedom, and critique.
3. **Modernity, Freedom, and Critique** — faith, alienation, and crisis; existence, freedom, and the absurd; power, knowledge, and institutions.
4. **Logic, Language, and Science** — signs and logical structures; experimental inquiry and criticism; webs of belief and scientific revolutions.
5. **Ethics, Justice, and Political Life** — utility, equality, and liberty; freedom and decolonization; justice, rights, and democratic reason.
6. **Mind, Consciousness, and the Self** — disciplines of mind and self; experience, intentionality, and embodiment; action, consciousness, and personhood.

Each gallery contains eight installations. The forty-eight stops share one WebGL canvas, camera rig, movement controller, directory, interpretation-panel system, visit state, and fullscreen/immersive state. Routes describe where the visitor is; they do not replace the 3D runtime.

## Persistent runtime boundary

`MuseumWorldScene` is the sole owner of the React Three Fiber `Canvas`. `MuseumPage` owns browser history, overlays, interpretation panels, hall readiness, saved poses, and control state. Hall render modules contribute local architecture, active lighting, and installations; they never create a canvas or duplicate navigation.

`museumWorldRegistry.ts` binds each serializable `MuseumHallDefinition` to a dynamic render-only module. The registry contains exactly the six active galleries. Code and image requests are promise-deduplicated, and failed entries are cleared so Retry starts a genuinely new attempt.

Geometry residency is the active gallery plus its declared neighbors. At an endpoint this means two galleries; in each interior gallery it means three. Leaving an adjacency evicts its render subtree and textures. The canvas and camera remain mounted.

## Coordinates and physical seams

Layouts use hall-local `x`/`z` floor coordinates, `y` for height, radians for yaw, and metres as the authoring convention. Each definition supplies a world translation and yaw. Collisions, guided viewpoints, and sessions remain local; rendering and seam checks transform them into the common world.

- Gallery 01 is at world origin. Its east threshold is `(18, -28.5)`.
- Gallery 02 is translated to `(18, -28.5)` and rotated `-π/2`. Its far west-side threshold at local `(-18, -49)` lands at world `(67, -46.5)`.
- Gallery 03 begins at world `(67, -46.5)` with zero additional yaw. Its new south threshold lands at `(67, -110.5)`.
- Gallery 04 begins at `(67, -110.5)` and turns east at local `(18, -49)`, whose world point is `(85, -159.5)`.
- Gallery 05 begins at `(85, -159.5)` and is rotated `-π/2`. Its south-local threshold at `(0, -64)` lands at `(149, -159.5)`.
- Gallery 06 begins at `(149, -159.5)`, also rotated `-π/2`, and is the eastern endpoint.

All five links are reciprocal. The source and target seam points coincide in world space and their inward normals oppose each other. Crossing detection is plane-based: the previous pose must be on the interior side, the current pose on the exterior side, and both must fall within the authored lateral opening. The source pose is transformed through world coordinates into the target hall. A target arrival pose is used only when the mapped result fails that hall’s collision contract.

Physical crossings use route **replace**, preventing doorway motion from flooding browser history. Directory, exhibit, and other deliberate choices use pushes. Direct and directory hall activation restore a safe saved session or the hall’s `layout.spawn`; entrance arrival poses are reserved for actual seam travel.

## Readiness and failure recovery

A neighbor is crossable only after two independent conditions hold:

1. its lazy entry code and entrance-visible local media are prepared; and
2. its post-`Suspense` scene subtree has committed inside the persistent canvas.

A layout-effect signal marks the second condition. Unmounting or a lazy-boundary failure immediately withdraws readiness. Retry increments only that hall’s content epoch, leaving the canvas, camera, controls, and other halls intact. Entrance payloads start loading immediately; nonentrance media may warm during an idle slice unless the document is hidden or the browser reports Save-Data/slow-network conditions.

Every local image has an in-world fallback. The directory remains a complete non-WebGL path. A WebGL/runtime retry may remount the canvas through the explicit scene epoch; ordinary navigation never does.

## Hall and installation grammar

Ancient uses its stone-and-bronze architectural foundation with corrected compositions: Socrates, Plato, and Aristotle form the Classical triad; Cynicism, Epicureanism, Stoicism, and Skepticism form a perimeter U that preserves the central path.

Galleries 02–06 share a neutral contemporary grammar: warm mineral walls, dark charcoal or wood-toned floors, visible pale ceilings, dark metal, restrained bronze or brass, integrated name strips, framed local media, lecterns, compact concept objects, track lighting, and sparse wall-mounted signage. Subtle material accents, room proportions, and the Gallery 04–06 dogleg distinguish the new thematic halls without turning them into unrelated color worlds. Each gallery has one restrained entrance identity sign. Zone names sit on walls or threshold fascias; wayfinding is small and physically attached. There are no stacked sign forests, hanging placards, or floor arrows.

Every installation declares one scene footprint. The collider derives from that footprint and placement. Media, supports, plaques, concept objects, interaction bounds, and focal targets are installation-local. Scene media uses typed mounts (`wall-frame`, `recess-frame`, `lectern`, or `freestanding-panel`) and cannot invent a separate collision model.

`primaryCirculation` records each visitor spine and clearance radius. `guidedWalkLegs` records legal waypoint polylines between consecutive exhibit viewpoints. Audits sample both against the walkable spatial union, walls, furnishings, and installation colliders.

## Routes, interaction, and session state

Public routes are hall-qualified: `#/museum/<hall-id>` and `#/museum/<hall-id>/exhibits/<exhibit-id>`. Scene callbacks use `{hallId, exhibitId}` references. Interpretation history state records the origin—active exploration, paused hall, directory, guided visit, or direct link—so closing a panel follows an explicit resume policy.

Active exploration preserves the player pose and can reacquire Pointer Lock after a gesture. Directory, guided, paused, and direct-link exits remain paused at their safe viewpoint. Window blur or document hiding moves an active visit to `focus-suspended`, clears held input, and never moves the camera. Explicit Pause is the normal action that discards active intent.

Each gallery has an independent, validated session key containing a hall-local pose and nearest exhibit. Physical crossing saves the source, transforms and saves the target, changes the collision definition atomically, and retains active movement intent. Session writes are signature-deduplicated.

## Verification contract

`npm run audit:museum` checks the exact six-hall catalog, eight exhibits and three zones per hall, layout/catalog agreement, safe spawns and viewpoints, Ancient compositions, bidirectional adjacency, five transformed seam pairs with opposing normals, both crossing directions, interpretation depth, two assets per exhibit, qualified sessions/history, Pointer Lock state transitions, rendered readiness, resident adjacency, recovery paths, and exactly one `Canvas`.

`npm run audit:museum-assets` checks all ninety-six typed records, 192 local derivatives, exact casing and dimensions, rights and attribution fields, per-exhibit coverage, manifest agreement, SHA-256 locks, and the absence of retired or unregistered Museum media.

Before extending the world, run the build and both audits, then test every seam in both directions, direct routes, Back/Forward, the directory, guided viewpoints, saved-session restoration, pointer-lock release/resume, fullscreen continuity, context loss, and the non-WebGL fallback.

## Adding a future gallery

1. Add stable catalog and interpretation records.
2. Author local cells, walls, circulation, spawn/reset, entrance views, installations, and derived colliders.
3. Connect a real reciprocal seam in both definitions and verify its world transform.
4. Add a render-only content component—never another `Canvas`.
5. Register a lazy loader and truthful adjacent-entry prefetch.
6. Keep active-plus-adjacent residency and the prepared-plus-rendered readiness contract.
7. Extend deterministic audits before browser review.
