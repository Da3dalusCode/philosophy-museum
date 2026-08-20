# Independent review findings and resolutions

## Review scope and verdict

An independent Sol / extra-high review challenged the synthesized Phase 1 artifacts against production SHA `be7765691a30383b012208a40cf9ed93a9be519a`. It checked the public route, resolved installation graph, transforms, fixture count, room/semantic coverage, ceiling geometry, portal and partition conflicts, renderer dispatch, and runtime constraints. The initial verdict was **conditional** because two implementation blockers and one major acceptance gap remained in the draft.

After the parent resolved those items and regenerated the artifacts, the Phase 1 specification is **implementation-ready with zero unresolved design blockers**. The implementation still must satisfy the serialized validator, renderer-role tests, photometric field checks, visual review, and quantitative performance gates; Phase 1 does not claim that unimplemented production geometry has already passed runtime QA.

## Material findings

| Priority | Independent finding | Resolution in final artifacts | Final status |
|---|---|---|---|
| Blocker | The draft's 24°/32°/36°/40° labels were width heuristics, not a proof that one fixture covered the resolved media. A draft audit found 352 of 551 rollout fields narrower than the widest media rectangle. | Replaced the heuristic for Galleries 03–26. For each installation, the generator now unions **all resolved media rectangles**, expands every edge by `max(5%, 0.10 m)`, aims at the union center, measures every expanded corner from the exact source, adds 2° installation reserve, and chooses the next 5° field. The new `resolved-media-field-coverage` validator passes all 551 records; selected fields are 25°–90° and required geometric fields are 22.11°–83.61°. Counts remain 551 fixtures for 551 rollout installations because every coherent installation is coverable by one declared optic. | Resolved |
| Blocker | The detailed fixture/ceiling renderer was gated by `prototypeId`; a new gallery map alone could silently leave Galleries 03–26 on generic geometry, while reusing `prototypeId` would let `?museumLightingPrototype=0` disable production lighting. | Prompt 2 must add `lightingStandard?: { system: "track" | "recessed"; revision: "rollout-v1" }` to `MuseumLightingDefinition`, independent of `prototypeId`. Detailed ceiling, diffuser, passage/circulation, track, and recessed-gimbal dispatch moves to that production discriminator. Galleries 03–26 must not receive `prototypeId`, and renderer-role/count tests must prove their architecture is present regardless of the prototype query. Gallery 01/02 prototype behavior remains locked. | Resolved in implementation specification |
| Major | The draft preserved real-light, shadow, texture, and residency limits but had no numeric renderer budget for the permanently resident hall structures. | Added exact before/after telemetry gates at dense Galleries 11/20/21 and long sightlines, desktop and low-power: active-view draw calls ≤ baseline+10; long sightline ≤ baseline+24; triangles ≤ baseline+150,000 / +400,000; shared geometries ≤ baseline+12; materials ≤ baseline+8; textures unchanged; desktop p95 ≤ `max(16.7 ms, baseline+2.0 ms)`; low-power p95 ≤ `max(33.3 ms, baseline+4.0 ms)`; zero context loss in a 15-minute traversal. | Resolved in implementation acceptance |
| Minor | Two evidence paths pointed to `src/data/museum/` instead of the component directory. | Corrected to `src/components/MuseumGallery/museumWorldTransform.ts` and `src/components/MuseumGallery/museumResidency.ts`; related paths were made fully qualified. | Resolved |

## Coverage-derived optic coordination

The final schedule uses five field categories across Galleries 03–26: 9 narrow, 68 medium, 265 wide-flood, 202 extra-wide-flood, and 7 very-wide framing/wallwash fields. The seven very-wide records are explicit photometric coordination items rather than hidden sharing:

- Gallery 03: `late-antiquity-inheritance/supplemental/aristotle-across-languages` — 80° selected minimum.
- Gallery 07: `east-asian-continuities/supplemental/eac-daoist-institutions` — 90°; `eac-yi-i-ojukheon` — 85°; `eac-vietnam-le-quy-don` — 85°.
- Gallery 12: `renaissance-humanism-new-method/supplemental/galileo-telescopes` — 80°.
- Gallery 26: `colonialism-race-liberation/primary/angela-davis` — 80°; `primary/bell-hooks` — 80°.

A symmetric flood, framing projector, or asymmetric wallwash may implement these fields only if its IES/projected boundary contains every serialized expanded-media corner. This requirement does not permit inter-installation sharing.

## Findings independently verified as correct

The reviewer found no contrary evidence for the following:

- Exact source SHA and successful GitHub Pages deployment.
- Exact public Gallery 01–26 route mapping.
- 603 installations total: 192 primary and 411 supplemental; 551 in Galleries 03–26.
- 603 unique fixture and installation keys, with zero inter-installation sharing.
- 99 physical/spatial cells and 105 semantic zones.
- Thirteen track-standard and thirteen recessed-standard galleries.
- Twenty-eight portal/crosscut source overrides: Galleries 06 (4), 11 (8), 15 (4), 22 (4), 23 (4), and 25 (4).
- Four required Gallery 11 comparative-parent allowances.
- No active-landing encroachment, ceiling-height mismatch, fixture/circulation intersection, intervening-wall aim conflict, or transform discrepancy in the audited graph.

## Additional synthesis corrections retained in the audit trail

- Stale legacy gallery-number comments and the inactive Ring manifest were excluded; the Continuous Enfilade public route is authoritative.
- Compact five-cell Galleries 04, 05, 08, 20, and 21 were classified by physical subdivision as Gallery 02 recessed systems, not copied whole-hall track layouts.
- Gallery 11 and Gallery 15 baseline coverage was expanded to every semantic entry view after distinguishing physical rooms, runtime spatial cells, and semantic zones.
- Screenshot frames containing the resume overlay were rejected and recaptured unobstructed.
- The final baseline gate resolves 183 per-gallery referenced files: 157 raw production frames plus 26 gallery contact sheets, with four additional master sheets and the baseline README.

## Final review gate

`installation-manifest.json` schema v2 passes all 19 design-time checks, including the new resolved-media field proof. No production source was edited, built, committed, pushed, or deployed. Proposed post-change visual coherence and runtime telemetry necessarily remain Prompt 2 acceptance work because Phase 1 is investigation and design only.
