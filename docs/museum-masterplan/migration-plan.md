# Phased Museum migration plan

## Status and governing decision

This plan authorizes **no implementation**. It describes the safest order after the intellectual program and a physical option are approved. The recommended target is the single-level Ring of Wings in [building-options.md](./building-options.md), supporting the 10-wing, 26-hall Worlds with a Questions Forum program.

The next implementation phase is deliberately small: rearrange only the six existing shells, make their walls and corridors physically truthful, close them into a pilot loop, and construct blocked, named portal reservations. Do not add a seventh hall, change the 48-exhibit roster, rename public routes, or pretend that a reserved destination is open.

## Why a staged migration is necessary

The current Museum has six halls, 48 exhibits, 18 zones, five reciprocal connections, approximately 7,312 authored square metres, and approximately 390 metres of primary circulation. It also contains several assumptions that are safe for a six-hall chain but unsafe for a 26-hall building:

- `MuseumHallId`, lazy loaders, and deterministic audits are closed around exactly six halls.
- A connection is recorded in both halls, while prefetch adjacency repeats the relationship a third time.
- Runtime residency mounts the active hall and all adjacent halls. A crossroads with three or four neighbors would multiply scene and texture cost.
- The visitor map derives graph edges from connections but places nodes with separately authored percentages; it is topologically useful, not a physical floor plan.
- There is no authoritative level, elevation, wing, template, footprint, doorway-slot, implementation-status, or reservation schema.
- Similar contemporary geometry is repeated instead of instantiated from a small template contract.

At the same time, the prototype has valuable contracts that should survive: one persistent canvas, hall-local coordinates transformed into a shared world, physical collision and seam checks, safe arrival poses, saved hall-local sessions, prepared-plus-rendered crossing readiness, and non-WebGL directory access.

## Migration invariants

Every implementation phase must preserve these rules:

1. **The map never leads construction.** It may show only geometry, doors, corridors, levels, and status present in the approved physical manifest. A blocked reservation is labeled “future” and is neither an edge nor a destination.
2. **One connection has one source record.** Runtime directions, prefetch adjacency, collision openings, and map edges derive from that record.
3. **A philosophical record has one primary home.** A secondary appearance is a cross-reference, study-wall record, or deliberately reduced interpretation—not a duplicate anchor claiming a second primary home.
4. **Current public identity remains stable through the pilot.** The six current hall IDs, exhibit-qualified routes, catalog records, saved-session keys, zones, and 48-exhibit roster remain valid.
5. **Construction and curatorial cutover are separate.** A target hall can be built and tested before an installation moves; an installation moves only after its target hall, route, interpretation, collision, and map state are live together.
6. **Accessibility is physical.** Fast travel does not excuse a blocked walking route, an unsafe landing, a color-only sign, or an inaccessible map.
7. **No stage requires all 26 halls.** Each opened subset must be an honest, usable building with truthful blocked thresholds for later work.

## Phase sequence

| Phase | Outcome | Museum content change |
| --- | --- | --- |
| 0. Review and approval | approve taxonomy, Ring concept, stable IDs, successor-shell assumptions, and disposition table | none; this planning package is Phase 0 |
| 1. Infrastructure and compatibility adapters | introduce a shared physical source without changing the visible six-hall experience | none |
| 2. Six-shell physical truth | arrange the existing six shells as a compact pilot ring with real corridors and named reserved portals | none; all 48 exhibits and 18 zones remain exactly where they are |
| 3. Global-worlds demonstration | open `CSA`, `BP`, `CCT`, and `IPW` as the first four new halls | only approved primary moves whose targets are live; secondary links replace, rather than duplicate, full anchors |
| 4. Connected-world completion | open `JPH`, `LCS`, and `EAC`; complete their transmission routes | target-specific moves and new assigned records |
| 5. Composite-shell separation | split the remaining Mediterranean, early-modern, nineteenth-century, modern, and ethics/social programs; finalize `CQ` and the entrance role | staged exhibit moves according to the table below |
| 6. Capacity-led expansion | use outward reservations or, only if necessary, evaluate another level | only after formal content and physical triggers are met |

The numbers describe order, not releases. A phase may be split into reviewable increments, but a later phase must not be pulled forward to avoid completing infrastructure or truthfulness gates.

## Phase 1 — infrastructure and adapters first

This phase should be visually neutral. It exists to avoid rebuilding the same foundations for every new hall.

### 1. Introduce the source layers

- Keep content assignments in the two assignment CSVs and intellectual capacity in `hall-program.json`.
- Treat CSV secondary hall IDs as route candidates. Before any becomes a live appearance, add a typed room-level association with relation type and a one-sentence rationale.
- Add an approved building manifest based on the separation illustrated by `building-manifest.example.json`: physical nodes, levels, transforms, footprints, doorway slots, one undirected connection record, safe arrivals, map polygons, status, and reservations.
- Wrap the six existing hall definitions as `live` legacy nodes. Do not require an immediate rewrite of their bespoke local geometry.
- Keep public hall and exhibit IDs stable. Replace closed compile-time assumptions with manifest validation and generated narrow types where useful; do not fall back to unvalidated arbitrary strings.

### 2. Resolve templates without erasing hall character

- Implement the four standard shells—`standard-rect`, `sequence-3`, `crossroads-4`, and `focal-terminal`—behind the existing hall-local coordinate contract.
- Derive base walls, active doorway openings, colliders, threshold lights, safe landings, and map footprints from template plus placement.
- Permit reviewed hall-local partitions and installations. The template compiler standardizes interfaces, not scholarship or visual identity.

### 3. Remove graph duplication

- Author each public connection once with two node/slot endpoints.
- Generate reciprocal runtime transitions and prefetch adjacency from it.
- Validate compatible portal dimensions, coincident world seams or explicit corridor continuity, opposing inward normals, safe target landings, and status.
- Treat a reservation as a separate object. It must not enter live adjacency, prefetch, crossing, or fast-travel sets.

### 4. Make residency scale to hubs

The present active-plus-all-neighbors rule is bounded only because the chain has degree at most two. Before any `crossroads-4` gateway opens, replace it with a budgeted policy: keep the active hall resident; prepare doorway-visible target code and entry media; render only the neighbor needed for a near-threshold crossing; evict by measured memory and recency rather than graph degree. Preserve the existing rule that a crossing is enabled only after code/media preparation and scene commit both succeed.

### 5. Preserve sessions and routes through adapters

- Version saved poses with hall ID, local coordinate contract, and physical-manifest version.
- If a shell moves in world space but its local layout does not change, its saved pose remains valid.
- If a layout changes, migrate only poses proven collision-safe; otherwise fall back to that hall's approved safe spawn.
- Keep route aliases until all inbound links and saved history have crossed a published compatibility window.

### Phase 1 exit gate

Do not rearrange a shell until audits prove that the legacy six render identically through the adapter, a single connection declaration produces both directions and the map edge, reserved nodes cannot be entered, map footprints derive from the physical source, hub residency is bounded, and saved poses either migrate safely or fall back predictably.

## Phase 2 — the next build: six-shell physical truth

This is the only physical scope recommended for the next implementation request.

### Pilot arrangement

Place the current shells in one compact, step-free loop:

`Ancient → Renaissance → Modernity → Logic → Ethics → Mind → Ancient`.

This retains the prototype's five familiar adjacencies and adds one truthful return connection from Mind to Ancient. Ancient remains the temporary public entrance because the working visitor-map kiosk is already there. Mind marks the provisional Core-Forum side of the loop. This is a migration diagram, not a claim that the six composite titles are the final taxonomy.

The work is limited to:

- new world transforms for the six existing shells;
- collision-backed corridors and walls joining compatible doorway slots;
- safe 4 × 4 m landing zones and 1.8–2 m primary clear routes;
- the sixth live connection that closes the loop;
- blocked, named **insertion reservations** for the missing planned halls and wing sleeves;
- separate outward **expansion reservations** for growth beyond the approved 26-hall program;
- a visitor-map projection of the six real footprints, six real links, corridor routes, entrance, and visibly blocked reservations;
- deterministic seam, collision, route, accessibility, residency, session, and map audits.

Closing the pilot loop requires two deliberately new legacy-adapter openings: one new side portal in Mind and one new side portal in Ancient, joined by the return corridor. Do not repurpose Ancient’s public south entrance or either hall’s existing used threshold. The implementation design must name those adapter slots, prove their wall/collision openings and safe landings, and publish the new connection only when both endpoints are physically crossable.

The work explicitly excludes new hall interiors, new exhibit records, changes to the active 48-exhibit roster, a new entrance hall, curatorial reclassification in production, route removals, a second floor, deployment, and any claim that the final ring is complete.

### Reservation rules

Insertion reservations are keyed to stable future hall or wing IDs and occupy tested footprints. They indicate where the Mediterranean split, global-worlds arc, connected-medieval halls, early-modern split, nineteenth/modern split, ethics/social split, and eventual permanent Core/entrance can join. One blocked doorway may lead to a reserved connector sleeve that later branches; it must not imply that several unseen halls already share one room.

Public treatment is literal: “Future wing — not yet open.” The barrier has collision. The map uses a dashed or muted footprint with no walking edge and no travel action. Opening a portal is an atomic release of target geometry, connection, readiness, map status, route, and safe arrival.

### Pilot acceptance walk

A reviewer must be able to enter Ancient, walk the entire loop in either direction, return without fast travel, open the map from the physical kiosk, and see the route just walked. Closing any optional shortcut must not strand a hall. Every reservation must be visibly blocked in-world and noninteractive on the map. The directory may still travel to approved safe spawns, but its fast-travel action is labeled separately from the walking diagram.

## Current 48-exhibit disposition

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

Successor: `PEE`. Counts: 4 remain temporarily, 2 move primary later, 2 become secondary later.

| Current exhibit (stable entity ID) | Final primary hall | Disposition |
| --- | --- | --- |
| Søren Kierkegaard (`kierkegaard`) | `FPLV` | **Become secondary later** in `PEE` |
| Karl Marx (`marx`) | `ULHC` | **Move primary later** |
| Friedrich Nietzsche (`nietzsche`) | `FPLV` | **Become secondary later** in `PEE` |
| Martin Heidegger (`heidegger`) | `PEE` | **Remain temporarily** |
| Jean-Paul Sartre (`sartre`) | `PEE` | **Remain temporarily** |
| Simone de Beauvoir (`beauvoir`) | `PEE` | **Remain temporarily** |
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
| Remain temporarily | **16** |
| Move primary later | **18** |
| Become secondary later | **14** |
| **Total current exhibits** | **48** |

The table is derived from the current roster, the final primary assignments, each record's approved secondary hall IDs, and the six provisional successor identities. If reviewers change a successor identity, regenerate this table from those same rules rather than hand-adjusting favored exhibits.

## Phase 3 — strongest new public demonstration

Build these four halls first, as four distinct settings rather than one catch-all “non-Western” district:

1. `CSA` — Classical South Asia: Jain, Yoga, and Brahmanical Systems.
2. `BP` — Buddhist Philosophies of Liberation and Knowledge.
3. `CCT` — Warring States & Classical Chinese Traditions.
4. `IPW` — Arabic & Islamic Philosophical Worlds.

This quartet does the most to demonstrate that the new plan corrects the prototype's narrow historical coverage. It also tests the reusable sequence and crossroads templates, cultural-historical orientation rooms, transmission thresholds, reserve rooms, cross-wing routes, hub loading, and a map that grows from six to ten real halls.

Open no hall merely as an empty shell. Each requires its assigned rooms, primary records, interpretation, complete accessible route, safe arrival, local fallback, map footprint, and at least one truthful connection. Patañjali and Vasubandhu may change from full Mind-hall anchors to secondary Core links only when `CSA` and `BP` are live and their new primary presentations have passed review.

## Phase 4 — complete connected worlds before splitting the prototypes

Add `JPH` (Jewish Philosophy) and `LCS` (Latin Christian & Scholastic Traditions) next, completing the connected-medieval triad around `IPW`. Add `EAC` (East Asian Continuities) to complete the planned East Asian wing and make Buddhist translation and regional continuities visible.

These halls should open with their connecting thresholds, not as isolated terminals. `IPW–JPH–LCS`, the East Asian wing link `CCT–EAC`, and the Buddhist/East Asian transmission shortcut `BP–EAC` go live in Phase 4 and must distinguish translation, commentary, institutional reception, and comparative juxtaposition. The future `LAI–IPW` threshold remains a visibly blocked reservation until `LAI` is built in Phase 5; the map must not expose that edge early. Proximity must not imply a simple one-way inheritance story.

At the end of Phase 4, the six adapted prototype shells plus seven new halls provide 13 live physical nodes. The building has demonstrated both template families, multi-wing navigation, truthful reservations, and hub-aware loading before the large composite European halls are split.

## Phase 5 — split composite shells last

Convert the six prototypes into their direct successors and add the 13 still-missing program halls:

- Mediterranean: add `HRW` and `LAI` around successor `MBC`.
- Early Modern: add `RMNS`, `ESPO`, and `ERK` around successor `RHN`.
- Nineteenth Century: add `GIA`, `ULHC`, and `FPLV`.
- Modern Traditions: add `PDI` and `CPD` around successors `AT` and `PEE`.
- Ethics, Politics, and Social Thought: add `MLPR`, `FP`, and `CRL` around successor `JDR`.
- Core: complete the provisional Mind-to-`CQ` conversion, then move the public entrance/orientation role only after the permanent Forum, kiosk/map, saved-session migration, and accessible return routes are ready.

Use the same cutover for every group:

1. Build and validate the target behind a blocked reservation.
2. Publish its content and safe routes without removing the source installation.
3. Move the canonical primary presentation in one release.
4. Where approved, replace the source station with a visibly secondary link or study-wall record.
5. Update route labels, guided walks, visit state, and map status atomically.
6. Retire the composite shell title only after every one of its eight current exhibits has a live primary destination or reviewed successor placement.

This order avoids repeatedly remodeling the six most mature halls while the manifest, templates, map, and new cultural-historical settings are still being proven.

## Visitor-map truthfulness through every phase

The eventual visitor map is a projection, not a second floor-plan database.

- Project each live node's physical polygon, level, rotation, public doorway slots, corridor geometry, entrance, and current-location pose from the building manifest.
- Find walking routes over live, accessible connection records. Do not draw a straight line across a wall because two hall centers are close.
- Show reserved footprints only when a physical blocked reservation exists. Use a status legend; never give a reserved node a selection or travel action.
- Label **Walk route** and **Fast travel** as different operations. Fast travel targets an approved live safe pose and does not make a disconnected floor plan look connected.
- Place maps at the entrance and wing gateways. Each repeats text, symbol, and color, and identifies level where relevant.
- In a loop there is no terminal “journey complete” state. Guided routes may end; the building does not.
- Treat manifest/map disagreement as a release blocker. A new connection appears only when its walls, colliders, threshold, crossing logic, readiness, and both safe arrivals are live.

During the six-shell pilot, the map should remain a five-edge chain until the sixth corridor is physically crossable. In the release that opens the return corridor, it becomes a six-edge loop. The map must not preview that edge earlier merely because the final masterplan expects it.

## Construction and expansion triggers

| Decision | Required trigger |
| --- | --- |
| Open a reserved portal | target hall is content-complete; compatible doorway and corridor are built; both arrival poses are collision-safe; walking and fallback routes pass; residency/readiness pass; map and route status publish atomically |
| Move a current primary exhibit | its assigned primary hall is live and reviewed; the destination presentation is at least equivalent in depth and accessibility; any remaining source treatment is explicitly secondary |
| Convert a prototype shell to its successor title | all eight source exhibits have approved live dispositions and no saved route or guided walk depends on the composite title without an alias |
| Commission a local wing-capacity review | assigned or approved projected records consume more than 85% of reviewed wing capacity, or a compressed tradition cannot be interpreted responsibly in reserve space; Modern Traditions triggers this review immediately at 89.3% |
| Add a hall inside an existing wing | the capacity review demonstrates a stable independent room program that cannot be handled by responsible tiering, rotation, or existing reserve space, and an accessible reserved connection is approved |
| Add a new wing | the content has a distinct cultural-historical or methodological setting spanning a stable multi-hall program, and placing it under an existing wing would be materially misleading |
| Use an outward Ring reservation | the new program has stable IDs, at least two defensible connections, an accessible return route, and no existing planned reserve can absorb it without displacing primary records |
| Consider another floor | all suitable single-level outward reservations are allocated, a new program of at least three halls still lacks a defensible ground-level location, and three redundant lift/stair cores plus level-aware maps, collision, sessions, and fallback routes can be delivered together |

The 26-hall recommended program has 258 record-capacity slots for 184 current primary records, so a second floor is not justified by the present Atlas inventory. Capacity is a curatorial planning measure, not visitor occupancy; thresholds must be reassessed if presentation tiers or room programs change.

Modern Philosophical Traditions is already at 25 of 28 slots (89.3%), so approval should immediately commission a local capacity review and protect the outward reservation at `PDI`. That review does not automatically authorize a fifth hall: it must first test tier changes, room interpretation, and whether an approved new roster has a coherent independent program.

## Verification at every release

Before a phase is called complete:

- run the production build and the full Museum, asset, routing, integrity, content, and masterplan validations;
- validate every public connection in both directions and every reservation as non-crossable;
- inspect collision, portal alignment, 4 × 4 m landings, 1.8–2 m routes, and turning pockets;
- verify direct routes, Back/Forward, directory travel, guided viewpoints, saved-session fallback, Pointer Lock release/resume, fullscreen continuity, and non-WebGL access;
- verify the map at desktop and narrow widths from every live hall and every level in use;
- compare the live hall, connection, and exhibit counts with the phase manifest;
- have a historical/cultural reviewer approve any primary-to-secondary change before it reaches production.

If browser automation is blocked by the Windows process sandbox, record that limitation, complete deterministic and direct handler checks, and perform the named manual walk before release. Browser-tool failure is not permission to ship a dead doorway or a fictional map edge.

## Stop condition for this masterplan

Stop now for user review. The next request should choose or revise the taxonomy, Ring topology, successor-shell assumptions, and the 48-exhibit disposition table. Only then should a separate implementation task begin with Phase 1 adapters and the six-shell truth phase. No current coordinates, connections, rosters, routes, or visitor-map UI are changed by this document.
