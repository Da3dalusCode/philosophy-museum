# Museum continuous-world architecture

## Objective

The Museum grows as one navigable place, not as a collection of unrelated canvases. The Ancient Greek and Hellenistic Gallery and Medieval Worlds Gallery now form the first continuous two-wing world. Crossing their authored threshold keeps the same WebGL canvas, camera rig, visit state, immersive/fullscreen state, and movement input active.

## Runtime boundary

`MuseumWorldScene` is the sole owner of the React Three Fiber `Canvas`. Route and exhibit changes must not key or replace this component. `MuseumPage` owns browser history, overlays, interpretation panels, the persisted player pose, and control state. The world scene owns camera movement, collisions, nearby-exhibit detection, rendering cadence, and the currently registered hall content.

Each hall is a lazy content module registered in `museumWorldRegistry.ts`. A registration combines:

- a serializable `MuseumHallDefinition`;
- a dynamic loader for the hall's render-only content component.

Hall modules supply local architecture, active-hall lighting, and installations. They do not create a canvas, own navigation, or duplicate player controls. Ancient remains the approved foundation: its orientation atrium, Classical Foundations, Hellenistic Ways, and Late Antiquity chamber now add only an east side passage beside the Neoplatonism conclusion. Its eight-cell plan is 1,626.4 authored square units. Medieval is a denser six-cell, 1,006.4-square-unit sequence: connection passage, Late Antique Inheritance, translation threshold, Arabic and Islamic Philosophical Worlds, Hebrew/Latin threshold, and Jewish and Latin Scholastic Conversations.

Both loaded halls remain under one `Canvas`. Shared background, hemisphere, and ambient light live in `MuseumWorldScene`; only the active hall enables its directional light and eight exhibit spotlights. The adjacent hall renders its architecture and entrance-visible exhibits, while the remaining installations become active after crossing. This preserves a readable doorway without doubling every spotlight or eagerly creating every scene texture.

## Coordinates, entrances, and connections

Hall layouts use local `x`/`z` floor coordinates, `y` for height, radians for yaw, and metres as the authoring convention. A hall definition adds a world transform so the shared spatial root and camera apply the same local-to-world rotation and translation while collision/session data remains hall-local. Entrances declare stable IDs, local positions, arrival poses, and transition bounds. Connections declare their local entrance, target hall, and target entrance rather than embedding route strings in scene code.

Ancient is at the world origin. Its `medieval-threshold` at local/world `(18, -28.5)` meets Medieval's `ancient-threshold`; Medieval is translated to that point and rotated `-π/2`, so walking east out of Late Antiquity continues forward along Medieval's local negative-z spine. Collision cells overlap by one movement step for safety, but the rendered floors, ceilings, and side walls end at the shared plane to avoid doubled geometry and z-fighting.

Crossing detection is plane-based, not merely proximity-based. The previous pose must be on the hall-interior side of the entrance plane and the current pose on its outward side, both within the lateral transition bounds. The source local pose is converted to world space and then to target-local space. A declared target arrival pose is used only if that exact mapped pose fails the target collision contract. Automatic crossings use route **replace**, because walking back and forth should not fill browser history with doorway noise; explicit directory and exhibit choices use normal pushes. Back/Forward therefore represents deliberate navigation while the URL always reflects the physically active hall.

## Collision and installation contracts

Every installation declares one footprint. Its player collider is derived from that footprint, placement, and rotation; scene geometry must not independently invent a conflicting collision footprint. Media, plaques, bases, concept objects, interaction bounds, and focal targets are local to the installation.

Every scene image requires a typed physical mount:

- `wall-frame` for a backing wall;
- `recess-frame` for a framed recess or plinth installation;
- `lectern` for an inclined reading support;
- `freestanding-panel` for a floor-supported display.

The Museum audit checks catalog coverage, mount kinds and anchors, bounds containment, plaque and media breathing room, footprint/collider agreement, collision-backed furnishings, entry-view composition, guided-route pacing, padded doorway approaches, viewpoint safety, room-graph connectivity, floor density, and spatial-union session safety. Room-entry checks project each promised exhibit's visible principal media and focal target through the authored camera field of view, including clipped-area, scale, front-facing, and wall-sightline checks. Furnishing and exhibit-separation checks use the rendered rotated outlines rather than axis-aligned approximations.

`primaryCirculation` records the authored visitor spine and its required clearance radius. The audit samples that path against the walkable spatial union and every runtime collider, reports its nearest obstruction, and keeps the circulation model synchronized with intentional axial detours such as the Classical focal installation.

`guidedWalkLegs` records the legal polyline between each consecutive guided viewpoint. Doorway-crossing legs include player-safe waypoints, and the audit samples every segment against the spatial union, walls, and installation colliders before calculating the walking distance. This keeps compactness claims honest when a direct Euclidean line would cut through a wall or display.

## Routes and exhibit identity

Browser routes remain the public deep-link and Back/Forward contract. Scene callbacks use qualified `{hallId, exhibitId}` references so an exhibit ID is never interpreted outside its hall. Exhibit history state also records a versioned origin: active exploration, paused hall, directory, guided visit, or direct link. Close behavior is a policy derived from that origin rather than a boolean that loses context.

Opening an exhibit from active movement blocks input and preserves both the pose and active intent. Continue exploring, the close button, and backdrop activation use that gesture to request Pointer Lock before route navigation; one typed transition preserves an acquired or pending request through the still-blocked panel teardown. Once the exhibit route is gone, controls settle from the browser's real `document.pointerLockElement`: locked when acquisition succeeded, otherwise active drag-look. Escape and native Back restore active drag-look without assuming gesture-less lock permission, and the next ordinary scene click can request Pointer Lock again. Directory, guided, paused, and direct-link exits remain paused and restore the appropriate surface.

The semantic visit phase is separate from the low-level look mode. Window blur or document hiding moves an active visit to `focus-suspended`, clears held input, and preserves the entered visit. Returning focus alone does not move the camera. The keyboard-operable Resume visit action or a click on ordinary 3D architecture reactivates movement and requests Pointer Lock, while a direct exhibit click opens that exhibit with active origin and HUD controls perform only their named action. Explicit Pause is the only normal control that discards active intent.

## Session persistence

Each hall has an independent session key containing its hall-local pose and nearest exhibit. The camera object lives inside the persistent canvas, while the pose ref and active-hall identity live in `MuseumPage`. A physical crossing copies and saves the source pose before transforming the ref, writes the mapped target pose to the target session, changes the active collision definition atomically, and marks the route update as an authored crossing so the hall-route effect does not pause movement. Direct routes and directory travel intentionally pause, restoring that hall's session, an exhibit viewpoint, a room-entry viewpoint, or its declared arrival pose. Periodic persistence is signature-deduplicated, so an entered but stationary visit does not keep rewriting `sessionStorage`.

## Loading and memory policy

Hall render code stays dynamically imported. On Museum idle, the active definition schedules its declared adjacent hall. Readiness requires the adjacent code chunk; every scene variant mounted in that hall's entrance-visible threshold view is requested and decoded best-effort before the target is marked crossable. Image failure does not trap the visitor because scene media has a documented in-world fallback. After entry readiness, the remaining declared scene variants may warm during another idle slice, except while the document is hidden or the browser reports Save-Data, 2G, or slow-2G conditions. The current hall remains mounted throughout. Direct navigation mounts the selected hall immediately and uses the same small, nonblocking status chip rather than a full-stage loading takeover.

The registry deduplicates code and image promises and removes rejected promise entries so Retry can make a fresh attempt. A per-hall content epoch resets a failed lazy boundary without remounting the `Canvas`; a global scene epoch remains reserved for an actual WebGL/runtime retry. Returning to Ancient uses the reciprocal prefetch and preserves its prior readiness rather than evicting it.

Textures are loaded from committed local WebP scene variants. Each mounted texture is isolated and disposed when its component unmounts. Failed textures get an in-world plaque fallback. Future glTF assets must follow the same rules: local and provenance-tracked, cached per URL, reused by instancing or cloned materials only when necessary, and explicitly disposed when no cache owner remains.

Repeated architecture should use instancing when draw-call measurements justify it. For the present two-hall world, inactive content is reduced to architecture plus entrance exhibits and has no exhibit spotlights. Later, nonadjacent halls should be evicted or represented by an occluding/simplified boundary; registration must never mean “render every future hall forever.”

## Frame and failure policy

The canvas uses demand rendering even during an entered visit. Keyboard, pointer, and touch input explicitly request a frame; held movement requests the next frame until input returns to zero. When the document is hidden or the stage leaves the viewport, the loop switches to `never` until it becomes renderable again. Coarse-pointer and narrow devices use a lower DPR ceiling, no antialiasing request, and a low-power GPU preference. The current hall avoids real-time shadows.

WebGL creation, render errors, context loss, asset failure, pointer-lock denial, document visibility, and fullscreen failure all have explicit fallbacks. The directory remains a complete non-WebGL path. A render failure may remount the canvas only through the explicit retry epoch; ordinary route changes must never do so.

## Budgets and measurement

Before adding a hall, record the production build and compare:

- initial application closure;
- Museum route chunk;
- shared world runtime chunk;
- active hall content chunk;
- total local scene-media bytes;
- draw calls, triangles, and texture memory at the intended 1920×1080 view;
- coarse-pointer DPR and interaction responsiveness.

Keep the shared runtime small. A hall's code and media should remain lazy. Prefer authored geometry and existing materials over a heavy new runtime dependency. If an object cannot meet the scene budget, represent it as a physically mounted image or a simplified procedural artifact.

## Adding the next hall

1. Add catalog and interpretation records with stable hall-qualified IDs.
2. Author a local layout, spawn/reset pose, entrances, installations, and derived colliders.
3. Add a render-only hall content component; never add another `Canvas`.
4. Register the definition and dynamic content loader.
5. Add truthful two-way connection records only when both entrances exist.
6. Add intent-based adjacent-hall prefetch and a deterministic arrival pose.
7. Extend audits for connectivity, global transformed bounds, entrance clearance, qualified references, and asset budgets.
8. Test walking through every reciprocal connection, Back/Forward, deep links, session restoration, context loss, and the no-WebGL directory.

The third hall should extend this proven adjacency pattern without introducing a parallel runtime or converting the registry into an eager import list. Only the active hall and genuinely adjacent ready halls should remain resident.
