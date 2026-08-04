# Product principles

## Product identity

Philosophy Atlas is an interactive museum and atlas of philosophical development, not a generic encyclopedia, card dashboard, or code showcase. It should make historical sequence, conceptual structure, disagreement, transmission, and transformation legible before requiring a visitor to inspect implementation details.

## Permanent Museum structure

- The permanent intellectual structure is **Worlds with a Questions Forum**: historically and culturally defensible primary homes connected by explicit comparative routes and a central questions forum. The approved detailed program remains the 10-wing, 26-gallery, 105-room program in the [Museum masterplan](../museum-masterplan/recommended-program.md).
- The accepted and permanent physical structure is the implemented **Continuous Enfilade**. Its 26 curated/open galleries, 105 rooms, chronological visitor route, six crosscut intersections and shortcuts, integrated Core Questions Forum, Grand Entrance, final return and exit, and established reserves are a locked product decision.
- Preserve the current masterplan, building implementation, and physical visitor map. Do not reorganize or rebuild the Museum unless the owner explicitly opens a new Museum-architecture redesign.
- The earlier Single-level Ring of Wings is superseded planning history. It is not a permanent model, migration target, accepted-but-unimplemented decision, or geometry backlog.

The accepted architecture lock is recorded in [Decision 0001](../decisions/0001-museum-structure.md). “Worlds with a Questions Forum” is an intellectual and curatorial principle; it does not require Ring geometry.

## Permanent Museum wayfinding and interaction

- Public Gallery 01–26 numbers follow the recommended physical visitor route. The route sequence is the single numbering authority; stable hall IDs remain the durable software identity and are not exposed as visitor-facing identifiers.
- Visitor maps describe how to move through the Museum. They do not expose collection-planning, manifest, construction-state, or release-tracking metadata.
- When walking and looking require a click to resume, the Museum presents one centered, prominent **Resume Visit** interaction overlay derived from the actual input-capture state. It stays hidden while another interface is intentionally open.
- The recommended route is marked by one continuous, flush, noncolliding floor inlay from the Main Entrance through Gallery 26 to the final return and exit. Crosscut and shortcut branches use a quieter related treatment.
- Gallery 01 follows the same deliberate exhibit-placement standard as the strongest later galleries: authored room assignments remain fixed, wall compositions are balanced, focal anchors read first, and doorway, sightline, circulation, and route-inlay clearances remain open.

## Cultural and editorial integrity

- Europe is not the default frame into which other traditions are inserted. Primary homes must follow historical and cultural formation, documented intellectual identity, contribution, and continuity of argument.
- Cross-cultural routes must identify transmission, translation, institutions, contest, or reception rather than imply vague influence.
- Uncertainty, retrospective labels, disputed memberships, and attribution problems must remain visible.

## Primary canonical exhibit title contract

- Every primary canonical Museum exhibit must render the exact canonical philosopher or philosophy article title as both its prominent wall-plaque title and its modal title.
- Contextual or thematic subtitles, doctrinal summaries, historical framing, object hooks, and curatorial theses must never be concatenated into or substituted for that prominent title. They belong in the smaller invitation, deck, orientation information, interpretation prose, room title, or gallery title.
- The runtime title must derive from the canonical philosopher or philosophy registry. Descriptive program text may be retained separately for search or secondary curatorial context, but it must not silently replace the canonical wall or modal title.
- Exceptions require an explicit owner-approved repository decision. There are currently no implicit exceptions.

## Primary wall-plaque legibility contract

- Every primary canonical Museum wall plaque uses exactly two text levels: the exact canonical entity title and one complete, direct visitor invitation beneath it. Canonical-title exactness and plaque legibility are separate mandatory contracts; satisfying one never waives the other.
- Generic kickers, eyebrows, entity-type labels, and date or location headings are prohibited on primary plaques. Historical setting and chronology belong in room and gallery signs or the modal orientation and interpretation.
- Primary titles and invitations must never be clipped, shortened, or ellipsized. Wrapping is required before font reduction, and a complete invitation may use two, three, or when necessary four lines.
- The title and invitation must be fitted independently. The canonical title remains clearly dominant, while both roles retain their explicit readable minimum for the production plaque texture.
- Complete meaning and minimum readable sizing take priority over preserving blank space. The fitting path should use the safe rectangle and vertically balance both left-aligned blocks without changing the existing plaque frame or physical dimensions.
- When a complete invitation cannot fit within the supported capacity at readable size, shorten only that wall invitation to a direct 25–45-word formulation. Never change the canonical title, modal interpretation, or canonical article to solve a plaque-layout failure.
- This contract applies to all primary canonical exhibits and does not automatically govern room signs, gallery signs, navigation signs, object labels, supplemental surfaces, or noncanonical architectural labels.
- Exceptions require explicit owner approval and a durable repository decision. There are currently no implicit exceptions.

## Supplemental wall-plaque contract

- Every physical supplemental Museum wall plaque uses exactly two visible text levels: a clear factual title for the supplemental subject and one complete visitor invitation explaining what it is, why it matters, and how it relates to at least one authoritative canonical philosopher, philosophy, school, or tradition.
- The title identifies the supplemental work, text, concept, argument, diagram, method, people, object, manuscript, site, reception history, event, or institutional context. It must not combine a parent entity with a generated curatorial thesis or subtitle. Standard work titles and established concept or diagram names are preferred; paired or grouped figures normally use their names; material and historical exhibits use factual descriptions supported by repository metadata.
- The canonical relationship belongs in the invitation, not in a generic kicker. Author-plus-work headings, category labels, period labels that duplicate the room, lists of concepts, and phrases such as “logic and reception,” “work and afterlives,” or “philosopher and historical context” are prohibited as visible kickers.
- Supplemental titles and invitations must be fitted independently, remain complete, and never be clipped, shortened, or ellipsized. Wrapping precedes font reduction; both roles must satisfy geometry-aware readable minimums and remain inside the measured safe rectangle without changing the existing plaque frame, dimensions, or installation position.
- The supplemental taxonomy is data, audit, and governance support only. It must not appear as a third heading level on the plaque.
- Representative patterns include a work titled *Elements of Theology* with Proclus and its axiomatic form explained in the invitation; a diagram titled *The Porphyrian Tree* with Porphyry and later logic explained beneath it; and a paired-figures title such as *Hipparchia and Crates* with their Cynic relationship explained beneath it. These are patterns, not mandatory production strings.
- Correct primary canonical plaques remain governed by the independent primary title and legibility contracts and must not regress during supplemental work.
- Exceptions require an explicit owner-approved repository decision rather than ad hoc copy. There are currently no implicit exceptions.

## Owner-facing quality

- Major visual work requires owner visual review before it is treated as accepted, even when automated checks pass.
- The owner should be able to judge the product through working behavior, clear reports, and visual evidence. The owner is not expected to review code or Git internals to discover whether a request was fulfilled.
- Implementation reports must state what changed, what was validated, what remains unreviewed, and whether anything was merged or deployed.
