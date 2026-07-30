# Phased Museum migration plan

## Status and governing decision

This plan records the implementation history through the completed building-level migration. **Worlds with a Questions Forum** remains the locked 10-wing, 26-gallery, 105-room intellectual program. The owner-approved physical planning basis and production geometry is the dimensioned [Continuous Enfilade](./single-level-building-plan.md).

The Continuous Enfilade manifest is production truth after a complete parallel build and atomic cutover. The former Ring manifest is retained only for one-release rollback; it does not authorize a partial corridor patch or piecemeal hall move. The architecture preview and executable geometry audits passed before Galleries 01–12 migrated together.

All current populated halls are exact canonical-template shells. Their hall-local room architecture and curation are migration assets. Their collective world transforms, old loop/spoke connectors, entrance, reservations, and map projection are not carried forward.

## Why a staged migration is necessary

At the pre-Ring baseline (`39007cf1480900e16cd24bdd8ba1820fd4779a41`), the Museum had six halls, 48 exhibits, 18 zones, five reciprocal connections, approximately 7,312 authored square metres, and approximately 390 metres of primary circulation. It also contained several assumptions that were safe for a six-hall chain but unsafe for a 26-hall building:

- `MuseumHallId`, lazy loaders, and deterministic audits are closed around exactly six halls.
- A connection is recorded in both halls, while prefetch adjacency repeats the relationship a third time.
- Runtime residency mounts the active hall and all adjacent halls. A crossroads with three or four neighbors would multiply scene and texture cost.
- The visitor map derived graph edges from connections but placed nodes with separately authored percentages; it was topologically useful, not a physical floor plan.
- There is no authoritative level, elevation, wing, template, footprint, doorway-slot, implementation-status, or reservation schema.
- Similar contemporary geometry is repeated instead of instantiated from a small template contract.

At the same time, the prototype has valuable contracts that should survive: one persistent canvas, hall-local coordinates transformed into a shared world, physical collision and seam checks, safe arrival poses, saved hall-local sessions, prepared-plus-rendered crossing readiness, and non-WebGL directory access.

## Migration invariants

Every implementation phase must preserve these rules:

1. **The map never leads construction.** It may show only geometry, doors, corridors, levels, and status present in the approved physical manifest. A blocked reservation is labeled “future” and is neither an edge nor a destination.
2. **One connection has one source record.** Runtime directions, prefetch adjacency, collision openings, and map edges derive from that record.
3. **A philosophical record has one primary home.** A secondary appearance is a cross-reference, study-wall record, or deliberately reduced interpretation—not a duplicate anchor claiming a second primary home.
4. **Compatibility survives the building cutover.** Hall, room, and exhibit-qualified routes remain stable. The public directory, map, sessions, search, and guided routes resolve through stable IDs rather than old world coordinates.
5. **Construction and curatorial cutover are separate.** A target hall can be built and tested before an installation moves; an installation moves only after its target hall, route, interpretation, collision, and map state are live together.
6. **Accessibility is physical.** Fast travel does not excuse a blocked walking route, an unsafe landing, a color-only sign, or an inaccessible map.
7. **Planned shells are honest.** The complete architecture may expose a walkable blank shell so the through route remains intact, but that shell is labeled planned, contains no fake exhibit or control, imports no exhibit media, and is not counted as open.

## Phase sequence

| Phase | Outcome | Museum content change |
| --- | --- | --- |
| 0. Review and approval | taxonomy, conceptual Ring pilot, stable IDs, successor-shell assumptions, and disposition table approved | complete; no content change |
| 1. Infrastructure and compatibility adapters | introduce the authoritative runtime building manifest and compatibility adapters | part of the approved Ring-pilot implementation; no roster change |
| 2. Six-shell physical truth | arrange the six temporary shells as a compact pilot ring with real corridors, central orientation court, shortcuts or spokes, and named reserved portals | completed Ring-infrastructure scope; the former 48 exhibits and 18 zones remained unchanged during this phase |
| 3. Canonical-six permanent cutover | replace the six temporary programs with five permanent outer-loop halls and the permanent central Core Questions Forum | install every primary assignment in the six final rosters by approved tier; preserve aliases for displaced records; add Krishnamurti as philosopher 142 |
| 4. Global-worlds demonstration | open `CSA`, `BP`, `CCT`, and `IPW` | complete |
| 5. Gallery 11–12 connected worlds | open `EAC` and `JPH`; preserve the future `LCS` threshold | complete for Galleries 11–12; `LCS` remained planned at this historical phase boundary |
| 6. Continuous Enfilade architecture migration | build all 26 hall/105 room shells, new circulation, entrance, map, and two reserves; atomically move the 12 populated halls | no new exhibit curation; 12 curated open and 14 walkable planned shells |
| 7. Subsequent gallery releases | curate planned shells one or two galleries at a time; Galleries 13–24 and Gallery 26 are complete while Gallery 25 remains planned | each release changes only its reviewed shell from planned to curated-open |

Phases 1–6 are implementation history. Phase 6 built the complete architecture without speculative gallery content. Phase 7 returns to the established one-or-two-gallery curation cadence.

## Phase 1 — infrastructure and adapters first

This phase should be visually neutral. It exists to avoid rebuilding the same foundations for every new hall.

### 1. Introduce the source layers

- Keep content assignments in the two assignment CSVs and intellectual capacity in `hall-program.json`.
- Treat CSV secondary hall IDs as route candidates. Before any becomes a live appearance, add a typed room-level association with relation type and a one-sentence rationale.
- Add an approved building manifest based on the separation illustrated by `building-manifest.example.json`: physical nodes, levels, transforms, footprints, doorway slots, one undirected connection record, safe arrivals, map polygons, status, and reservations.
- Wrap the six existing hall definitions as `live` legacy nodes. Do not require an immediate rewrite of their bespoke local geometry.
- Keep public hall and exhibit IDs stable. Replace closed compile-time assumptions with manifest validation and generated narrow types where useful; do not fall back to unvalidated arbitrary strings.

### 2. Resolve templates without erasing hall character

- Implement the three normal active templates—`standard-rect`, `sequence-3`, and `crossroads-4`—behind the existing hall-local coordinate contract. Retain `focal-terminal` only as a rare special-case contract; the current 26-hall program does not use it.
- Derive base walls, active doorway openings, colliders, threshold lights, safe landings, and map footprints from template plus placement.
- Permit reviewed hall-local partitions and installations. The template compiler standardizes interfaces, not scholarship or visual identity.

### 3. Remove graph duplication

- Author each public connection once with two node/slot endpoints.
- Generate reciprocal runtime transitions and prefetch adjacency from it.
- Validate compatible portal dimensions, coincident world seams or explicit corridor continuity, opposing inward normals, safe target landings, and status.
- Treat a reservation as a separate object. It must not enter live adjacency, prefetch, crossing, or fast-travel sets.

### 4. Make residency scale to hubs

The pre-Ring active-plus-all-neighbors rule was bounded only because the chain had degree at most two. The Ring pilot replaces it with the required budgeted policy: keep the active hall resident; prepare doorway-visible target code and entry media; render only the neighbor needed for a near-threshold crossing; and retain a recent hall only when measured memory and the three-subtree cap allow it. A crossing remains enabled only after code/media preparation and scene commit both succeed.

### 5. Preserve sessions and routes through adapters

- Version saved poses with hall ID, local coordinate contract, and physical-manifest version.
- If a shell moves in world space but its local layout does not change, its saved pose remains valid.
- If a layout changes, migrate only poses proven collision-safe; otherwise fall back to that hall's approved safe spawn.
- Keep route aliases until all inbound links and saved history have crossed a published compatibility window.

### Phase 1 exit gate

Do not rearrange a shell until audits prove that the legacy six render identically through the adapter, a single connection declaration produces both directions and the map edge, reserved nodes cannot be entered, map footprints derive from the physical source, hub residency is bounded, and saved poses either migrate safely or fall back predictably.

## Phase 2 — six-shell physical truth (implemented by the Ring pilot)

This is the approved physical scope for the Ring pilot.

### Pilot arrangement

The Phase 2 implementation placed the temporary shells in one compact, step-free loop:

`Ancient → Renaissance → Modernity → Logic → Ethics → Mind → Ancient`.

During Phase 2 this retained the prototype’s intellectual order while replacing the chain with a truthful closed walking loop. Ancient remained the temporary public entrance because the working visitor-map kiosk was already there, and the central orientation court marked the then-future Forum location. Phase 3 supersedes those temporary public identities: the court becomes the permanent Forum, the five permanent outer halls replace the other shells, and the physical manifest alone determines the surviving entrance, loop, spokes, and return geometry.

The work is limited to:

- new world transforms for the six existing shells;
- collision-backed corridors and walls joining compatible doorway slots;
- safe 4 × 4 m landing zones and 1.8–2 m primary clear routes;
- the live return connection that closes the loop plus the manifest-defined court spokes or shortcuts needed to prove non-chain circulation;
- blocked, named **insertion reservations** for the missing planned halls and wing sleeves;
- separate outward **expansion reservations** for growth beyond the approved 26-hall program;
- a visitor-map projection of the six real hall footprints, central court, every real corridor and active doorway, entrance, kiosk where useful, live walking routes, and visibly blocked reservations;
- deterministic seam, collision, route, accessibility, residency, session, and map audits.

Every new legacy-adapter opening—including the loop return and any court spoke or shortcut—must have a distinct manifest slot, wall and collision opening, compatible doorway geometry, and collision-cleared safe landing. Do not repurpose Ancient’s public entrance or an already occupied threshold. Publish each connection only when both endpoints and its intervening corridor are physically crossable.

The Phase 2 construction scope explicitly excluded new hall interiors, new exhibit records, changes to the then-active 48-exhibit roster, a new entrance hall, curatorial reclassification in production, route removals, a second floor, and any claim that the final ring was complete. Deployment remained a separate release decision made only after the complete Ring-pilot gate passed.

### Reservation rules

Insertion reservations are keyed to stable future hall or wing IDs and occupy tested footprints. They indicate where the Mediterranean split, global-worlds arc, connected-medieval halls, early-modern split, nineteenth/modern split, ethics/social split, and eventual permanent Core/entrance can join. One blocked doorway may lead to a reserved connector sleeve that later branches; it must not imply that several unseen halls already share one room.

Public treatment is literal: “Future gallery — not yet open.” The barrier has collision. The map uses a dashed or muted footprint with no walking edge and no travel action. Opening a portal is an atomic release of target geometry, connection, readiness, map status, route, and safe arrival.

### Pilot acceptance walk

A reviewer must be able to enter Ancient, walk the entire loop in either direction, return without fast travel, use every live court spoke or shortcut, open the map from the physical kiosk, and see the routes just walked. Closing any optional shortcut must not strand a hall. Every reservation must be visibly blocked in-world and noninteractive on the map. The directory may still travel to approved safe spawns, but its fast-travel action is labeled separately from the walking diagram.

## Historical Phase 2 48-exhibit disposition

All 48 installations **remain unchanged during Phase 2**, regardless of the long-term category below. The categories become actionable only when a target hall is built and approved.

For an auditable provisional plan, each current shell has one direct successor:

| Current shell | Provisional direct successor |
| --- | --- |
| Ancient Greek & Hellenistic | `MBC` — Mediterranean Beginnings & Classical Athens |
| Renaissance, Reason, and Revolution | `RHN` — Renaissance, Political Order, and New Science |
| Modernity, Freedom, and Critique | `PEE` — Phenomenology, Existence, and Embodiment |
| Logic, Language, and Science | `AT` — Analytic Traditions |
| Ethics, Justice, and Political Life | `JDR` — Political Action, Justice, and Democratic Reason |
| Mind, Consciousness, and the Self | `CQ` — Core Questions Forum |

The three categories are deterministic:

- **Remain temporarily:** the record's final primary hall equals the shell's direct successor. Its installation may survive the shell conversion, but reuse is not guaranteed until spatial and curatorial review.
- **Move primary later:** the final primary hall differs and the successor is not an approved secondary association. Move the full installation only after the primary target is live.
- **Become secondary later:** the final primary hall differs, but the successor is already listed as a secondary association. Move the canonical full installation to its primary hall, then reduce the current station to a link, study-wall record, or other explicitly secondary treatment.

This classification never deletes a philosopher or branch. “Replace” means replacing a full-size current presentation with its approved secondary form or replacing a composite shell identity after all moves—not removing the underlying Atlas record.

### Ancient Greek & Hellenistic shell

Successor: `MBC`. Counts: 3 remain temporarily, 4 move primary later, 1 becomes secondary later.

| Current exhibit (stable entity ID) | Final primary hall | Disposition |
| --- | --- | --- |
| Socrates (`socrates`) | `MBC` | **Remain temporarily** |
| Plato (`plato`) | `MBC` | **Remain temporarily** |
| Aristotle (`aristotle`) | `MBC` | **Remain temporarily** |
| Cynicism (`cynicism`) | `HRW` | **Move primary later** |
| Epicureanism (`epicureanism`) | `HRW` | **Move primary later** |
| Stoicism (`stoicism`) | `HRW` | **Move primary later** |
| Skepticism (`skepticism`) | `HRW` | **Move primary later** |
| Neoplatonism (`neoplatonism`) | `LAI` | **Become secondary later** in `MBC` |

### Renaissance, Reason, and Revolution shell

Successor: `RHN`. Counts: 2 remain temporarily, 6 move primary later, 0 become secondary later.

| Current exhibit (stable entity ID) | Final primary hall | Disposition |
| --- | --- | --- |
| Niccolò Machiavelli (`machiavelli`) | `RHN` | **Remain temporarily** |
| René Descartes (`descartes`) | `RMNS` | **Move primary later** |
| Thomas Hobbes (`hobbes`) | `RHN` | **Remain temporarily** |
| John Locke (`locke`) | `ESPO` | **Move primary later** |
| Baruch Spinoza (`spinoza`) | `RMNS` | **Move primary later** |
| David Hume (`hume`) | `ESPO` | **Move primary later** |
| Jean-Jacques Rousseau (`rousseau`) | `ERK` | **Move primary later** |
| Immanuel Kant (`kant`) | `ERK` | **Move primary later** |

### Modernity, Freedom, and Critique shell

Successor: `PEE`. Counts: 3 remain temporarily, 2 move primary later, 3 become secondary later.

| Current exhibit (stable entity ID) | Final primary hall | Disposition |
| --- | --- | --- |
| Søren Kierkegaard (`kierkegaard`) | `FPLV` | **Become secondary later** in `PEE` |
| Karl Marx (`marx`) | `ULHC` | **Move primary later** |
| Friedrich Nietzsche (`nietzsche`) | `FPLV` | **Become secondary later** in `PEE` |
| Martin Heidegger (`heidegger`) | `PEE` | **Remain temporarily** |
| Jean-Paul Sartre (`sartre`) | `PEE` | **Remain temporarily** |
| Simone de Beauvoir (`beauvoir`) | `FP` | **Become secondary later** in `PEE` |
| Albert Camus (`camus`) | `PEE` | **Remain temporarily** |
| Michel Foucault (`foucault`) | `CPD` | **Move primary later** |

### Logic, Language, and Science shell

Successor: `AT`. Counts: 3 remain temporarily, 4 move primary later, 1 becomes secondary later.

| Current exhibit (stable entity ID) | Final primary hall | Disposition |
| --- | --- | --- |
| Charles Sanders Peirce (`peirce`) | `PDI` | **Move primary later** |
| Gottlob Frege (`frege`) | `AT` | **Remain temporarily** |
| Bertrand Russell (`russell`) | `AT` | **Remain temporarily** |
| John Dewey (`dewey`) | `PDI` | **Move primary later** |
| Rudolf Carnap (`carnap`) | `CQ` | **Become secondary later** in `AT` |
| Karl Popper (`popper`) | `CQ` | **Move primary later** |
| W. V. O. Quine (`quine`) | `AT` | **Remain temporarily** |
| Thomas Kuhn (`kuhn`) | `CQ` | **Move primary later** |

### Ethics, Justice, and Political Life shell

Successor: `JDR`. Counts: 3 remain temporarily, 0 move primary later, 5 become secondary later.

| Current exhibit (stable entity ID) | Final primary hall | Disposition |
| --- | --- | --- |
| Jeremy Bentham (`bentham`) | `ULHC` | **Become secondary later** in `JDR` |
| Mary Wollstonecraft (`wollstonecraft`) | `ERK` | **Become secondary later** in `JDR` |
| John Stuart Mill (`mill`) | `ULHC` | **Become secondary later** in `JDR` |
| Hannah Arendt (`arendt`) | `JDR` | **Remain temporarily** |
| Frantz Fanon (`fanon`) | `CRL` | **Become secondary later** in `JDR` |
| John Rawls (`rawls`) | `JDR` | **Remain temporarily** |
| Robert Nozick (`nozick`) | `JDR` | **Remain temporarily** |
| Jürgen Habermas (`habermas`) | `CPD` | **Become secondary later** in `JDR` |

### Mind, Consciousness, and the Self shell

Successor: `CQ`. Counts: 1 remains temporarily, 2 move primary later, 5 become secondary later.

| Current exhibit (stable entity ID) | Final primary hall | Disposition |
| --- | --- | --- |
| Patañjali (`patanjali`) | `CSA` | **Become secondary later** in `CQ` |
| Vasubandhu (`vasubandhu`) | `BP` | **Become secondary later** in `CQ` |
| William James (`william-james`) | `PDI` | **Become secondary later** in `CQ` |
| Edmund Husserl (`husserl`) | `PEE` | **Move primary later** |
| Maurice Merleau-Ponty (`merleau-ponty`) | `PEE` | **Move primary later** |
| G. E. M. Anscombe (`anscombe`) | `AT` | **Become secondary later** in `CQ` |
| Thomas Nagel (`thomas-nagel`) | `CQ` | **Remain temporarily** |
| Derek Parfit (`derek-parfit`) | `MLPR` | **Become secondary later** in `CQ` |

### Disposition totals

| Category | Count |
| --- | ---: |
| Remain temporarily | **15** |
| Move primary later | **18** |
| Become secondary later | **15** |
| **Total Phase 2 exhibits** | **48** |

The table was derived from the Phase 2 roster, the final primary assignments, each record's approved secondary hall IDs, and the six provisional successor identities. If reviewers change a successor identity, regenerate this table from those same rules rather than hand-adjusting favored exhibits.

## Phase 3 — canonical-six permanent cutover (implemented on this feature branch)

Convert the compact construction-stage Ring to these six permanent programs:

1. `MBC` — Mediterranean Beginnings & Classical Athens, in a canonical four-room sequential hall on the outer loop.
2. `RHN` — Renaissance, Political Order, and New Science, in a canonical three-room sequential hall on the outer loop.
3. `PEE` — Phenomenology, Existence, and Embodiment, in a canonical five-room sequential hall on the outer loop.
4. `AT` — Analytic Traditions, in a canonical five-room sequential hall on the outer loop.
5. `JDR` — Political Action, Justice, and Democratic Reason, in a canonical three-room sequential hall on the outer loop.
6. `CQ` — Core Questions Forum, in a canonical nine-room crossroads hall at the central Forum location.

The first five retain a compact, continuously walkable outer loop. The permanent Forum moves into the central court and connects through real spokes. The former outer Mind-shell is retired as a public gallery node and becomes only the truthful circulation, return, construction, or reservation geometry declared by the physical manifest. No public map, directory, or travel action may continue to present it as an open gallery.

Populate the six halls from the authoritative assignment manifests, not from the former eight-exhibit rosters. Before the Krishnamurti addition, their final rosters contained 58 primary records; the `jiddu-krishnamurti` standard exhibit in `CQ` → Mind & Self brought the roster to 59. The Gallery 01 closeout added Prodicus and Hippias of Elis to the Sophists room, bringing the roster to 61; the Gallery 02 expansion then added Ficino and Galileo, bringing the live canonical-six roster to 63. The six-hall tier balance is 36 anchors, 23 standard individual exhibits, 3 supporting exhibits, no thematic-cluster participants, and 1 gallery archive or study-wall record. Every named record remains legible and substantive at its assigned scale.

The former 48 installations are source material, not a quota. A record whose final primary home is one of the six successor halls moves to its approved room and tier. A record whose primary home is not yet live leaves the full 3D roster while retaining its Atlas article, relationships, media, sources, and an alias or compatibility handoff that identifies the planned primary hall. Any reduced secondary treatment must say why the record matters in that room and must not imply a duplicate primary installation.

Krishnamurti is primary exactly once in `wing-core-questions` → `core-questions-forum` → `core-mind-self` as a `standard-individual-exhibit`. His secondary route to `classical-south-asian-worlds` is biographical and cross-cultural, not inherited-school membership. His room-level Philosophy of Religion comparison concerns authority, allegiance, and fixed paths; it is not affiliation. The Forum must send visitors outward rather than presenting itself as the building's supreme authority.

Open no successor as an empty shell. Each requires every assigned room, tier-appropriate primary treatment, complete interpretation, accessible walking and fast-travel arrival, route alias behavior, map footprint, directory/search presence, and a validated connection. The public roster, map, directory, guided routes, saved-session fallback, and direct routes change atomically.

## Phase 4 — global-worlds demonstration (implemented)

Build four distinct settings rather than one catch-all “non-Western” district:

1. Classical South Asia: Jain, Yoga, and Brahmanical Systems.
2. Buddhist Philosophies of Liberation and Knowledge.
3. Warring States & Classical Chinese Traditions.
4. Arabic & Islamic Philosophical Worlds.

This quartet established distinct cultural-historical orientation rooms, transmission thresholds, cross-wing routes, bounded loading, and a physical map that grew from six to ten permanent halls.

## Phase 5 — Gallery 11–12 connected worlds (implemented)

Gallery 11, Confucian Renewal & East Asian Continuities, and Gallery 12, Jewish Philosophy in Arabic-Speaking & Mediterranean Worlds, extended the live collection to twelve galleries. At that historical phase boundary, Latin Christian & Scholastic Traditions remained the planned Gallery 13; it is now a completed Phase 7 release.

The Warring States/East Asian, Buddhist/East Asian, Arabic-Islamic/Jewish, and Latin Scholastic relationships remain interpretive contracts. Their old physical corridors do not constrain the new building; the Continuous Enfilade preserves the historical sequence and uses the crosscut for alternate movement without turning adjacency into an influence claim.

## Phase 6 — complete Continuous Enfilade architecture migration (implemented)

This shipped as one building release, assembled beside the Ring rollback manifest and switched atomically.

### Phase 6A — compile rather than hand-place (complete)

- Introduce a versioned Continuous Enfilade runtime manifest beside the current manifest.
- Generate hall transforms, footprints, portal transforms, crossing bays, turn courts, entrance, final threshold, crosscut, and reserves from [single-level-building-plan.json](./single-level-building-plan.json).
- Bind every one of the 105 canonical room IDs before scene construction.
- Fail the build if runtime geometry differs from the control plan.

### Phase 6B — architecture-only preview (complete)

- Build the Grand Entrance, six shared-wall bands, five turn courts, full crosscut, independent Forum bay, final threshold, and two closed reserves.
- Construct all 14 future galleries as named walkable room shells.
- Give planned shells architecture, collision, safe arrivals, generic lighting, and one honest noninteractive entrance status sign.
- Give them no exhibit, media, interaction, article control, quotation, attribution, or fast-travel promise that implies a finished exhibition.
- Keep the old manifest as a one-release rollback artifact.

### Phase 6C — transplant the populated hall roots (complete)

- Move Gallery 01–12 definitions as whole local roots under their new world transforms.
- Preserve room partitions, exhibit positions relative to the hall, media, lighting, signs, interpretation, guided order, and local collision.
- Recompute transformed safe arrivals, doorway readiness, camera poses, map footprints, audio/light bounds, and world collision.
- Close obsolete optional portals as complete collision walls.
- Give the Forum east/west chronological portals and north/south crosscut portals without changing its room envelope.

### Phase 6D — integrate state, navigation, and performance (complete)

- Preserve existing public Gallery 01–12 numbers and direct routes.
- Register Gallery 13–26 stable planned records in the release order from the control plan.
- Migrate saved visits by stable gallery, room, and exhibit IDs; never replay old raw coordinates.
- Derive the 26-shell map, facing arrow, current room, through route, crosscut, and turn courts from the new manifest.
- Show 12 curated open galleries and 14 walkable planned shells as different states.
- Extend the current three-hall residency, 6 m approach preparation, and 96 MiB decoded-texture budget. Do not import planned-shell media because none exists.

### Phase 6E — atomic cutover and rollback (complete)

- The full new building passed its automated and visual release gates before cutover.
- Building manifest, map, directory state, session resolver, and entry route switched together.
- No mixed old/new building, disconnected populated hall, or speculative map edge was released.
- The old Ring manifest remains a one-release rollback artifact.

### Phase 6 acceptance walk

A reviewer must be able to:

1. enter through the Grand Entrance and understand map, facing, routes, and status without opening a control;
2. follow the full chronological route through all 26 shells without turning around inside a gallery;
3. use every crosscut intersection in both north/south directions;
4. traverse all five exterior dogleg turn courts in both directions with continuous ceiling and threshold wayfinding;
5. enter every one of the 105 rooms;
6. use all twelve populated galleries, their direct URLs, interactions, guided visits, reset, fast travel, and session resume;
7. distinguish every planned shell and both closed reserves from a curated gallery;
8. confirm the initial Museum load does not initialize all gallery content.

## Phase 7 — curate planned galleries one or two at a time

The architecture is stable after Phase 6. A normal gallery release changes one shell from `construct-planned-walkable-shell` to `curated-open` and adds its real content bundle.

Each release must:

1. preserve the planned center, orientation, route portals, and room IDs;
2. refine room partitions only within the approved shell;
3. implement exact room-by-room physical installation expectations in the executable audit;
4. complete interpretation, unique sourced imagery, attribution, routes, interactions, guided views, and visual review; every image must work as a relevant standalone object, never as a subordinate source inside a synthetic/geometric wrapper or a repeated gallery-wide anchor motif;
5. add media to the existing lazy-loading boundary;
6. update map/directory status and open counts atomically;
7. preserve public release numbering and the manifest-owned route transform even when a later-numbered gallery opens before an earlier-numbered planned shell.

Galleries 13 through 24 are now complete Phase 7 releases in their fixed architectural bays. Gallery 17 preserves its approved three-room sequence and Gallery 18 preserves its four-perimeter-room crossroads around an independent central Kant room. Galleries 19–22 preserve visit positions 16–19, their approved transforms, and the physical route through both crossing-adjacent bands; their 90 installations use no text-dominant page or isolated-book images, exceed the room-level image-diversity gate, and avoid generated wrappers or gallery-wide house motifs. Galleries 23 and 24 preserve visit positions 22 and 23, their approved 28 × 28 m crossroads shells, full-height L-baffles, four-metre inner throats, and all four semantic seams; their 48 exhibit-specific installations meet the same standalone-image and room-level diversity gates. Gallery 25, Feminist Philosophies, is the next planned shell by stable public release number.

## Visitor-map truthfulness through every phase

The visitor map is a projection, not a second floor-plan database.

- Project each live node's physical polygon, level, rotation, public doorway slots, corridor geometry, entrance, and current-location pose from the building manifest.
- Find walking routes over live, accessible connection records. Do not draw a straight line across a wall because two hall centers are close.
- Show planned gallery shells only when their complete physical geometry exists, and label them planned/walkable rather than open. Show the two expansion reserves only as physically blocked footprints; they receive no selection or travel action.
- Label **Walk route** and **Fast travel** as different operations. Fast travel targets an approved live safe pose and does not make a disconnected floor plan look connected.
- Place the primary map in the Grand Entrance and repeat compact orientation at all six crosscut intersections. Each uses text, symbol, and color.
- The final threshold may end a guided visit or return to the entrance; it must not force the visitor to retrace Colonialism, Race, and Liberation.
- Treat manifest/map disagreement as a release blocker. A new connection appears only when its walls, colliders, threshold, crossing logic, readiness, and both safe arrivals are live.

During construction, the public map must show only connections that are physically crossable. The architecture-preview map may expose the complete planned building only behind the same preview flag as the geometry. At cutover, it projects the through route, crosscut, turn courts, Forum, entrance, final threshold, 26 shells, and two closed reserves from the authoritative manifest.

## Construction and expansion triggers

| Decision | Required trigger |
| --- | --- |
| Open a reserved portal | target hall is content-complete; compatible doorway and corridor are built; both arrival poses are collision-safe; walking and fallback routes pass; residency/readiness pass; map and route status publish atomically |
| Move a current primary exhibit | its assigned primary hall is live and reviewed; the destination presentation is at least equivalent in depth and accessibility; any remaining source treatment is explicitly secondary |
| Convert a prototype shell to its successor title | every source exhibit has an approved live primary, explicitly secondary treatment, or compatibility handoff; no saved route or guided walk depends on the composite title without an alias |
| Commission a local wing-capacity review | assigned or approved projected records consume more than 85% of reviewed wing capacity, or a compressed tradition cannot be interpreted responsibly in reserve space; Modern Traditions triggers this review immediately at 85.7% |
| Add a hall inside an existing wing | the capacity review demonstrates a stable independent room program that cannot be handled by responsible tiering, rotation, or existing reserve space, and an accessible reserved connection is approved |
| Add a new wing | the content has a distinct cultural-historical or methodological setting spanning a stable multi-hall program, and placing it under an existing wing would be materially misleading |
| Build a full single-level expansion bay | the new program has stable IDs, one 56 × 28 m crosscut-fed reserve fits its reviewed template, the public threshold and accessible return route are approved, and the new room program cannot be absorbed responsibly within the approved 26 galleries |
| Compare a multi-level design | the circulation-only single-level prototype demonstrates an unacceptable footprint or walking problem and the owner requests a measured alternative; the comparison must include redundant lift/stair cores, level-aware maps, collision, sessions, fallback routes, and an explicit walking-distance benefit |

The approved 26-hall program has 260 record-capacity slots for 189 current primary records, so a second floor is not justified by the present Atlas inventory. Capacity is a curatorial planning measure, not visitor occupancy; thresholds must be reassessed if presentation tiers or room programs change.

Modern Philosophical Traditions is at 24 of 28 primary-record slots (85.7%), so the approved program commissions a local capacity review and protects the outward reservation at `PDI`. PEE’s nominal open primary slot is also expected to carry Beauvoir’s anchor-strength secondary. The review does not automatically authorize a fifth hall: it must first test tier changes, room interpretation, and whether an approved new roster has a coherent independent program.

## Visitor-startup performance boundary

Scene residency and media budgets do not cover synchronous TypeScript module initialization. Canonical hall definitions, collision geometry, and guided routes therefore have a separate visitor-startup contract:

- do not run exhaustive authoring-time layout or circulation searches for every hall when the Museum route is imported;
- keep specialized route candidates scoped to the room template that needs them, and stop after the shortest collision-free candidate is found;
- precompute repeated collider bounds instead of rebuilding them at every sampled path point;
- keep canonical-data initialization below the audited 2,000 ms ceiling, and verify a cold production-browser Museum route before release;
- move any future search that cannot remain comfortably inside that ceiling to an authoring/build artifact or defer it to the active hall without changing route safety.

## Verification at every release

Before a phase is called complete:

- run the production build and the full Museum, asset, routing, integrity, content, and masterplan validations;
- run `npm run validate:museum-building-plan` and require runtime positions, portals, states, and route lengths to match the control JSON;
- run the canonical-data startup-budget audit and cold-load the production Museum route;
- validate every public connection in both directions, every planned shell as truthfully walkable, and both expansion reserves as non-crossable;
- inspect collision, portal alignment, 4 × 4 m landings, 1.8–2 m routes, and turning pockets;
- verify direct routes, Back/Forward, directory travel, guided viewpoints, saved-session fallback, Pointer Lock release/resume, fullscreen continuity, and non-WebGL access;
- verify the map at 1920 × 1080 without scrolling and at narrow widths from every populated gallery, planned shell, turn court, and crosscut intersection;
- compare the live hall, connection, and exhibit counts with the phase manifest;
- have a historical/cultural reviewer approve any primary-to-secondary change before it reaches production.

If browser automation is blocked by the Windows process sandbox, record that limitation, complete deterministic and direct handler checks, and perform the named manual walk before release. Browser-tool failure is not permission to ship a dead doorway or a fictional map edge.

## Current production contract

The taxonomy, permanent programs, exact-once assignments, compatibility rules, and [Continuous Enfilade control geometry](./single-level-building-plan.json) are locked in production. The historical 48-exhibit disposition table and old Ring topology remain migration/rollback history, not live targets. Do not add or move a gallery, connector, shortcut, side doorway, entrance, or reserve outside the control plan. If later implementation discovers a measured conflict, amend and revalidate the control plan before changing runtime geometry.
