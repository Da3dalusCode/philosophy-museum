# Museum continuous-world architecture

## Objective

The Museum should grow as one navigable place, not as a collection of unrelated canvases. The current release still contains one hall, but the runtime boundary now supports more halls without remounting the WebGL world or eagerly loading the future museum.

## Runtime boundary

`MuseumWorldScene` is the sole owner of the React Three Fiber `Canvas`. Route and exhibit changes must not key or replace this component. `MuseumPage` owns browser history, overlays, interpretation panels, the persisted player pose, and control state. The world scene owns camera movement, collisions, nearby-exhibit detection, rendering cadence, and the currently registered hall content.

Each hall is a lazy content module registered in `museumWorldRegistry.ts`. A registration combines:

- a serializable `MuseumHallDefinition`;
- a dynamic loader for the hall's render-only content component.

The Ancient Greek module supplies architecture, lighting, atmosphere, and installations. It does not create a canvas, own navigation, or duplicate player controls. Its registered wing is one continuous seven-cell pilot gallery: a furnished orientation atrium, Classical Foundations, Hellenistic Ways, and a Late Antiquity focal chamber are joined by three short thresholds. The 1,592-square-unit plan remains larger and more architecturally developed than the original 1,320-square-unit corridor while concentrating the eight active exhibits instead of expanding into empty rooms.

## Coordinates, entrances, and connections

Hall layouts use local `x`/`z` floor coordinates, `y` for height, radians for yaw, and metres as the authoring convention. A hall definition adds a world transform so the shared spatial root and camera apply the same local-to-world rotation and translation while collision/session data remains hall-local. Entrances declare stable IDs, local positions, arrival poses, and transition bounds. Connections declare their local entrance, target hall, and target entrance rather than embedding route strings in scene code.

The current hall is at the world origin, exposes `south-entry`, and deliberately has no hall-to-hall connections. This empty adjacency is a truthful extension seam, not a fabricated second gallery. Inside the hall, `spatialCells` define the precise walkable union and `spatialConnections` define room openings. Floors, visible ceilings, wall colliders, track rails, and exhibit lights all consume the same layout definition instead of maintaining parallel hardcoded plans.

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

The semantic visit phase is separate from the low-level look mode. Window blur or document hiding moves an active visit to `focus-suspended`, clears held input, and preserves the entered visit. Returning focus alone does not move the camera. A click on ordinary 3D architecture reactivates movement and requests Pointer Lock, while a direct exhibit click opens that exhibit with active origin and HUD controls perform only their named action. Explicit Pause is the only normal control that discards active intent.

## Session persistence

The existing local session stores the hall-qualified pose and nearest exhibit. The camera object lives inside the persistent canvas, while the pose ref lives in `MuseumPage`; changing an exhibit route therefore does not discard camera state. Future cross-hall travel should atomically save the source pose and write the target hall/entrance pose before the registered content changes. A hall-ID change already restores that hall's local session or its first declared arrival pose while preserving the Canvas.

## Loading and memory policy

Only the active hall content module is loaded. `prefetch.sceneAssetIds` lists the current hall's local scene media, while `prefetch.adjacentHallIds` reserves intent-based prefetching for real connections. A future doorway may prefetch its target after proximity, idle time, or explicit focus—not on initial Museum import.

Textures are loaded from committed local WebP scene variants. Each mounted texture is isolated and disposed when its component unmounts. Failed textures get an in-world plaque fallback. Future glTF assets must follow the same rules: local and provenance-tracked, cached per URL, reused by instancing or cloned materials only when necessary, and explicitly disposed when no cache owner remains.

Repeated architecture should use instancing when draw-call measurements justify it. Distant connected halls should use simplified geometry or an occluding portal, then promote to full content near an entrance. Do not render several full halls merely because they are adjacent in the registry.

## Frame and failure policy

The canvas renders continuously only while exploration is active, unblocked, visible, and near the viewport. Otherwise it uses demand rendering. Coarse-pointer and narrow devices use a lower DPR ceiling, no antialiasing request, and a low-power GPU preference. The current hall avoids real-time shadows.

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
8. Test walking through the connection, Back/Forward, deep links, session restoration, context loss, and the no-WebGL directory.

The next hall should validate this architecture by connecting to the existing corridor. It should not introduce a parallel runtime or convert the registry into an eager import list.
