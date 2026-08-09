# Museum exhibit-wall standard

This is the runtime build rule for sequential galleries. It supplements the intellectual record-capacity plan; record capacity does not determine how many physical wall installations a finished room needs.

## The six-face room rule

A standard sequence room contains **two half-rooms**. Each unobstructed half-room receives **three exhibits, one on each wall face**:

- west half-room: north-west, outer-west, south-west;
- east half-room: north-east, outer-east, south-east.

That means a normal full room has **six installations**, not three. Count the physical wall faces, not the room record in the data model.

Only an actual live side portal or fixed architectural obstruction removes a wall face. A centered doorway at the north or south threshold does not remove either partition half-wall. Closed future portals are usable walls until they become live openings.

## Hierarchy and placement

- The outer wall of each half-room is its primary wall. Put a primary branch, school, or philosopher there whenever the room has one.
- North and south return walls normally carry secondary work, concept, context, or transmission exhibits.
- If a room has more primaries than outer walls, overflow primaries may use a return wall, but every primary must remain at least as large and visually substantial as the room's largest secondary.
- Never place two installations on one wall face while another usable face is blank.
- A room without a canonical primary still fills all usable faces; its strongest contextual anchors take the outer walls.

## Primary wall-plaque legibility contract

- Every canonical primary plaque contains only the exact canonical entity title and one complete visitor invitation beneath it. Generic kickers, eyebrows, entity-type labels, and date or location headings are prohibited.
- Titles and invitations must never be clipped or ellipsized. Wrap before reducing type, support up to four invitation lines when necessary, and fit the title and invitation independently rather than shrinking the entire composition together.
- The title remains clearly larger than the invitation. Both roles must meet the readable minimum enforced for the actual production texture, and all glyph bounds must remain inside the framed safe rectangle.
- Complete meaning and readable type take priority over preserving blank space. Keep the existing frame, physical dimensions, and left alignment while vertically balancing the two blocks.
- Canonical-title exactness and physical plaque legibility are separate mandatory contracts. Exceptions require explicit owner approval; room signs, gallery signs, object labels, supplemental surfaces, and other non-primary labels retain their own contracts.

## Supplemental wall-plaque contract

- Every physical supplemental plaque contains only a factual title for its specific subject and one complete invitation that explains the subject’s significance and authoritative relationship to a canonical philosopher, philosophy, school, or tradition.
- Do not render a generic or classificatory kicker. Parent names, author-plus-work labels, concept lists, reception categories, period labels, and curatorial subtitles belong in the invitation, room context, or interpretation panel—not above the factual title.
- Work and text plaques use the accepted work title without a prepended author or generated thesis. Concept and diagram plaques use the established name. Paired or grouped figures use names or an accepted group name. Objects, manuscripts, sites, reception histories, events, and institutional contexts use factual descriptions supported by existing metadata rather than slogans.
- Titles and invitations wrap and fit independently, remain complete, never ellipsize, preserve title dominance, meet geometry-aware readable minimums, and stay within browser-canvas glyph bounds for the production safe rectangle. Existing frames, physical dimensions, placements, and room density do not change to solve copy fitting.
- The factual taxonomy remains non-visible implementation and audit metadata. Primary plaques retain their separate exact-canonical-title contract.
- Examples such as *Elements of Theology*, *The Porphyrian Tree*, or *Hipparchia and Crates* illustrate the hierarchy; they do not authorize hardcoded production copy or weaken the requirement for repository-supported titles and relationships.
- Any exception requires an explicit repository decision. One-off renderer copy is not an exception mechanism.

## Primary exhibit-review contract

This is the durable review standard for canonical primary interpretation panels. It extends the existing canonical article, exhibit program, asset, and interpretation registries; it does not create a second exhibit catalog.

- The panel is predominantly single-column and object-led. The principal object appears first, followed by compact orientation, three untitled prose paragraphs, provenance/source detail, and the article action.
- The wall invitation is roughly **32–35 words** beneath the exact canonical title. The production plaque may retain the broader physical fitting fallback only when readability requires it, but that record is not `standard-compliant` without an explicit reviewed exception.
- The principal image or object has three distinct layers: a concise caption identifying what the visitor sees, provenance and rights metadata from the canonical asset registry, and an exhibit-specific interpretation explaining what the object can and cannot establish.
- The main interpretation contains **250–268 words in exactly three untitled prose paragraphs**. It explains the subject directly, incorporates the object without allowing it to redefine the subject, and preserves material uncertainties and disputes from the canonical article.
- Orientation normally contains **five** concise entries. Six may be retained only when the sixth is genuinely distinct and the interpretation records a specific exception reason.
- The final action explicitly opens the full sourced canonical article.
- Do not expose a duplicated lead, raw software IDs, route or inventory metadata, generated fact rows, metadata grids, or mechanical idea/work catalogs. These are implementation or article-reference structures, not visitor interpretation.

Article credibility and exhibit status are separate:

- `unreviewed` — no current exhibit reconciliation is recorded.
- `reconciled` — the exhibit has been checked against its corresponding article and registered sources, and its exhibit lock is current, but one or more compliance gates remain open.
- `standard-compliant` — the article relationship is unambiguous, the article is currently `claim-reviewed`, factual exhibit content is reconciled with that article and its sources, the exhibit lock is current, and the presentation satisfies every rule above.
- `out-of-date` — a previously reconciled or compliant exhibit no longer matches the locked article/exhibit snapshot, or a claimed compliance prerequisite is no longer current.

Authored exhibit-review metadata lives with the canonical primary interpretation. The generated [`exhibit-review ledger`](../editorial/exhibit-review-ledger.md) inventories every canonical exhibit, joins it to the live article registry, reports article and exhibit states independently, and identifies unmatched or ambiguous relationships. Regenerate with `npm run report:exhibits`; verify locks, relationships, and presentation gates with `npm run audit:exhibits`.

## Media and review

- Every installation uses unique, relevant imagery with truthful source, credit, and license metadata. Do not use graves, filler images, or an unrelated visual merely to complete a wall.
- Titles for work exhibits must clearly identify the philosopher or tradition they belong to.
- Before release, inspect both half-rooms in every changed room from visitor eye level. Confirm all three walls are filled, the primary reads first, no installation is cramped or clipped, and movement remains clear.
- The Museum audit must encode the expected wall-slot set so a future build cannot silently regress to three exhibits per full room.

## Gallery 01 placement contract

Gallery 01 preserves its four canonical room identities, entity-to-room assignments, authored Mediterranean assets, architecture, and doorways. Its installations follow the same deliberate spatial standard as the strongest later galleries:

- establish a readable entrance composition and terminal view in every room;
- use anchor exhibits as focal points and supporting records to complete, rather than compete with, the composition;
- balance usable wall faces without mechanical uniformity, using roughly three installations per half-room only where the authored count and wall length support that rhythm;
- preserve consistent visitor setbacks, plaque and image visibility, doorway approaches, exit sightlines, and the Gallery 01–02 transition;
- keep the central walking route and Museum route inlay free of plinths, exhibit bounds, and visitor viewpoints; and
- reject duplicate placements, room-bound escapes, wall or doorway intersections, installation overlaps, and implausible facing directions through deterministic spatial checks.

Placement defects are corrected inside the assigned room. Moving an entity to another canonical room merely to equalize counts is prohibited.

## Core Questions Forum exception

Gallery 06 is a crossroads, not a sequential two-half-room gallery. Its approved program is the governing count: **15 compact primaries plus 10 compact physical comparative lenses, for 25 installations across nine intellectual routes**.

- Preserve the 28 × 28 metre shell, all live portals, and an open four-way circulation cross.
- Treat the nine routes as directory and guided-tour groupings inside four physical question bays; do not rebuild a nine-cubicle floor plan.
- Keep exactly eight repeated doorway-edge return walls and a **6/6/7/6** installation rhythm. Do not add one-off exhibit baffles in the central field.
- Every installation owns a named outer-wall or return-wall slot. A backing wall must be at least as wide as the installation it supports; signs cannot float in openings.
- Primaries use the Gallery 06 compact 3.0 metre module and remain larger than every 2.7 metre comparative lens.
- Preserve at least 1.25 metres of clearance from the full cardinal cross, including exhibit footprints and authored visitor viewpoints.
- Rooms with no canonical primary still receive their planned physical lenses; directory-only routes do not count as wall exhibits.
- Verify all six live approaches, the center crossing, directory views, and guided routes after any interior change.

## Classical Chinese crossroads rule

Gallery 09 is also a `crossroads-4` hall, but it is not the Forum and must never turn Gallery 06's nine semantic routes into nine physical cubicles. Its four debate rooms use an authored **six-installation contract per room: 24 physical exhibits total**.

- Keep the central crossing open and legible from every approach.
- Each room receives six distinct wall-backed slots across its perimeter and restrained display baffle; unused wall faces are not acceptable.
- Canonical schools and philosophers own the prominent walls. All twelve primaries use the same full-scale floor and can never be smaller than a contextual exhibit.
- Adjacency communicates debate, not school membership: Mohism remains distinct from the retrospective grouping called “Legalism,” and Laozi is presented as an attributed textual persona rather than a secure conventional biography.

## Gallery 11–13 and 16–26 authored wall contracts

Gallery 11, **Confucian Renewal & East Asian Continuities**, uses the normal sequence-room rule with no physical exceptions: **six installations in each of three rooms, 18 total**.

- `east-song-ming-confucian`: six — equal full-scale Zhu Xi and Wang Yangming outer-wall primaries, plus four smaller work, academy, practice, and debate installations.
- `east-buddhist-daoist-transmissions`: six — two full-scale contextual outer-wall anchors and four transmission, reception, ritual, and Three Teachings installations. These are interaction histories; Gallery 08–09 retain their canonical primaries.
- `east-regional-continuities-reserve`: six — named Korean, Japanese, Vietnamese, and modern continuities, including full-scale contextual anchors where no canonical Atlas record exists.

The live north/south thresholds do not remove a return wall. The Buddhist/East Asian transmission route reaches the south threshold without consuming a side exhibit wall, so no exception is claimed.

Gallery 12, **Jewish Philosophy in Arabic-Speaking & Mediterranean Worlds**, also has no physical exceptions: **six installations in each of two rooms, 12 total**.

- `jewish-reason-revelation`: six — equal full-scale Saadia Gaon and Judah Halevi outer-wall primaries, with four smaller work and Judeo-Arabic context installations.
- `jewish-maimonidean-crossroads`: six — Maimonides as the anchor primary, four work/reception/threshold installations, and one full-scale but explicitly contextual later-continuity anchor.

The Gallery 10 connection uses the north threshold, and the Gallery 12–13 threshold is now live. Both are centered architectural openings and do not erase the authored return-wall slots.

Gallery 13, **Latin Christian & Scholastic Traditions**, follows the sequence rule exactly: **six installations in each of four rooms, 24 total**. Its ten canonical primaries and fourteen supplemental works, concepts, and contexts form one physical program; promoting the hall required data, placement, routing, collision, map, and guided-tour changes in the same release.

Gallery 16, **Rationalism: Mind, Nature, and System**, likewise contains **six installations in each of three rooms, 18 total**. Its five canonical primaries and thirteen supplemental installations treat “rationalism” as a later family label while preserving the disagreements among Descartes, Spinoza, Conway, and Leibniz.

Gallery 17, **Empiricism, Science, and Political Order**, preserves the same sequence rule: **six installations in each of three rooms, 18 total**. Four canonical primaries and fourteen supplemental installations move from Locke through Berkeley to Hume while showing observation as instrumented, represented, social, political, and historically situated.

Gallery 15, **Enlightenment, Revolution, and Kant’s Critical Turn**, uses four full-scale physical bays around an open cardinal cross while preserving five stable semantic routes. The first three physical bays contain **six installations each**; the northwest bay contains Astell, Wollstonecraft, Kant’s primary, and the dedicated **Kant’s Sublime** concept exhibit within **eight installations**, for **26 total** in a **6/6/6/8** physical rhythm. The added north-wall slot uses normal scale and requires only two Gallery 15-local adjustments: a 0.6 m Astell shift along the north wall and a 0.9 m shift of the adjacent equality baffle display along its existing face. The east–west chronological route stays straight and clear, all five room IDs remain stable for directory, URL, guided-tour, and session behavior, and no exhibit baffle occupies the central field.

For Galleries 17 and 18, every new asset records a visual-character class. Text-dominant pages and isolated books are exceptions: Gallery 17 allows no more than 3 of 18 and Gallery 18 no more than 4 of 25, while each gallery must use at least four non-textual character groups. Relevant portraits, social scenes, places, material objects, and maps or diagrams should dominate.

Gallery 19, **German Idealism & Romantic Afterlives**, follows the normal sequence rule exactly: **six installations in each of four rooms, 24 total**. Four canonical primaries—the German Idealism branch, Fichte, Schelling, and Hegel—join 20 supplemental works, contexts, concepts, and afterlives. The fourth room has no canonical primary, so its strongest contextual anchors occupy the outer walls without pretending to be duplicate primary homes.

Gallery 20, **Utility, Liberty, History, and Capital**, follows the normal sequence rule exactly: **six installations in each of four rooms, 24 total**. Its three canonical primaries and 21 supplemental works, objects, places, social scenes, and historical contexts preserve the approved four-room argument from utility and reform through liberty, labor/capital, and social transformation.

Gallery 18, **Faith, Pessimism, Life, and Value**, also follows the normal sequence rule exactly: **six installations in each of three rooms, 18 total**. Schopenhauer, Kierkegaard, Dostoevsky, and Nietzsche are the four canonical primaries; 14 supplemental installations develop the rooms without duplicating a primary home or collapsing the positions into one house style. Dostoevsky occupies the former Corsair outer-wall installation and The Brothers Karamazov occupies the adjacent former Regine Olsen wall, producing the approved **four-primary / fourteen-supplemental** distribution without architectural redesign.

Gallery 22, **Pragmatism, Science, and Democratic Inquiry**, follows the normal sequence rule exactly: **six installations in each of four rooms, 24 total**. Four canonical primaries—the Pragmatism branch, Peirce, William James, and Dewey—join 20 supplemental works, practices, institutions, contexts, and later continuities. The physical through-route enters through the continuities room and proceeds toward Peirce; room identities and guided order remain explicit rather than being silently reversed to imitate travel direction.

Galleries 19–22 set a stricter completed-image result: **zero** of their 90 installations use a text-dominant page or isolated-book view, and each gallery contains at least four non-textual visual-character groups. Each image is an independently sourced, directly relevant object strong enough to carry its installation alone. Synthetic or geometric wrappers, subordinate manuscript/book insets, quota-filling composites, and a repeated gallery-wide anchor motif are prohibited.

Gallery 23, **Critique, Power, and Deconstruction**, and Gallery 24, **Moral Life & Practical Reason**, each preserve an authored four-room crossroads with full-height L-baffles, a four-metre inner throat, and all four semantic seams. Every room contains **six installations**, for **24 per gallery and 48 total**. Their independently sourced, exhibit-specific images retain the same standalone-image and room-level diversity requirements as Galleries 19–22.

Gallery 25, **Feminist Philosophies**, preserves its four-room crossroads and all four semantic seams. Every room contains **six installations, 24 total**. All 24 use distinct provenance-backed images with no fallback or museum-wide image reuse.

Gallery 26, **Colonialism, Race, and Liberation**, follows the sequence rule exactly: **six installations in each of three rooms, 18 total**. Its images remain distinct and provenance-backed, use at least four non-textual visual-character groups, and include no text-dominant page or isolated-book view.

The completed Gallery 01–16 retrospective applies a stricter room-level rule across the open Museum: **no room may contain more than one text-dominant page or isolated-book image**. Every physical manuscript, document, papyrus, and book-page placement is explicitly reviewed. Illustrated scenes, diagrams, decorated objects, and materially distinctive artifacts are classified by what the visitor actually sees; excess plain-page or lone-book views must be replaced by independently sourced, exhibit-specific images that are visually and historically strong enough to carry the installation alone. Generated wrappers, subordinate artifact insets, quota-filling collages, and repeated gallery-wide “anchor” illustration styles are prohibited.

## Release checklist for future expansion and major refits

Before a future hall, approved expansion, or substantially refitted gallery can be called finished:

1. The executable audit enumerates its exact physical wall slots and rejects blanks, duplicates, undersized primaries, missing interaction handlers, or missing attributions.
2. Every room is inspected in the running app from both directions; each half-room or crossroads bay is photographed or otherwise visually checked at visitor eye level.
3. Every primary, supplemental panel, doorway, fast-travel destination, directory entry, and direct exhibit route works.
4. The visitor map shows the affected hall, its real walking connection, and the visitor's directional arrow without requiring desktop scrolling.
5. The production build and the focused Museum, routing, plan, asset, and exhibit-review audits for the changed contracts pass locally; unchanged broad integrity, accuracy, and article suites may run in CI unless a release-specific risk justifies repeating them.
6. The image-diversity audit classifies every textual-medium installation and rejects any curated room containing more than one plain page or isolated book. Every affected-gallery release must use at least four non-textual visual-character groups overall, with room-by-room visual review rejecting repetitive image selections even when the gallery total passes.
