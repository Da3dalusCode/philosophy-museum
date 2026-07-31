# Editorial data model

The editorial layer is backward compatible. Legacy article paragraphs remain strings and legacy `sourceLinks` remain further-reading references. A reviewed page may instead use structured paragraphs with stable claim IDs and citation references.

## Source and citation records

An editorial source has a stable page-local ID, source type, author list, title, URL, and the bibliographic fields appropriate to that source. A citation contains a source ID plus an optional typed locator and a short editorial note. Locator types distinguish article sections, chapters, standard textual divisions, book/chapter references, lines, verses, pages, whole works, and similar durable shapes.

The UI derives source numbering from source-array order. Evidence lists include only sources that are actually cited. Explicit editorial further-reading IDs and legacy `sourceLinks` are displayed separately and do not count toward claim coverage.

## Statuses

- `unreviewed`: no claim-level review is recorded.
- `bibliography-only`: legacy references exist but are not mapped to claims.
- `source-mapped`: citations are mapped, but the page has not completed the recorded claim-review method.
- `claim-reviewed`: the recorded review is complete and the stored lock matches current claim-bearing content.
- `review-out-of-date`: a derived runtime state used when a nominally claim-reviewed record no longer matches its lock.

The interface uses descriptive labels rather than terms such as “fact-checked” or “peer-reviewed.”

## Review lock

The deterministic review snapshot includes visitor-facing prose and structured facts, source links, editorial citations, and editorial source metadata. Presentation-only fields such as colors, icons, and images are excluded. Review bookkeeping and the lock itself are also excluded.

The snapshot is serialized with sorted object keys and hashed with a stable 64-bit FNV-1a implementation. This is a change detector, not a cryptographic signature or proof of correctness. Both the browser and the editorial audit use the same implementation. A change to a reviewed claim, citation locator, or cited-source record therefore removes the current-review badge until a reviewer records a new lock.

## Accessibility and routing

Citation markers are native buttons with source-and-locator labels. Activating a marker scrolls to and focuses the corresponding source entry without changing the application hash route. Every cited source offers a return-to-first-citation control. External source links are visibly labeled and include screen-reader text stating that they open an external site. This model preserves Back/Forward behavior because source jumps do not compete with the hash router.
