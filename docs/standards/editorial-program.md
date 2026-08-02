# Editorial program

## Universal depth

Every applicable canonical full educational article has a hard minimum of **2,000 substantive article-prose words**. This applies to philosophers; philosophies, branches, schools, traditions, movements, methods, and frameworks; and any future standalone article-backed work, text, argument, concept, or major Museum exhibit. Supporting plaques, drawers, captions, timeline entries, and Museum panels are not duplicate full articles.

Below-floor records are migration backlog, not exceptions. Word count measures completeness only: shallow padding, repetition, generic biography, redundant summaries, and prose written to manipulate the counter are unacceptable.

## Flagship program

Flagships receive a higher depth target: **4,000 substantive words for thinkers** and **5,000 for philosophies, fields, schools, and traditions**. The exact owner-approved roster, canonical mapping, and approved-but-missing entries live in [`../editorial/flagship-program.json`](../editorial/flagship-program.json). Current counts are generated with `npm run report:flagships`; they are never stored in the manifest.

A record below its flagship target remains valid migration backlog. The target is a quality and planning standard, not a reason to add filler or weaken source discipline.

## Article quality

- Non-flagship articles must still be complete, accurate, beginner-friendly, and proportionate to their subject.
- Headings must serve the argument and visitor’s learning path, not merely divide prose into equal blocks.
- Reading recommendations should form an annotated path: explain what to read, why it belongs at that stage, and what difficulty or perspective to expect.
- Image metadata is optional when no reliable reusable image is available. Never invent an image, source, credit, or license.
- A citation is required when prose refers to a specific artwork, map, diagram, visual reconstruction, or similarly identifiable object.
- There is no fixed total source count. Source quantity follows the claims and risks of the article.

## Canonical-record Museum integration gate

Before creating a canonical philosopher or branch record, inspect its Museum representation, authoritative assignment, intended room density, physical installation and asset needs, and directly affected fixed-count contracts. The task must either include that integration work or stop before the record is added and document the missing integration scope; a canonical article may not silently enter the registry without a Museum preflight.

## Credibility states

Depth, bibliography, source mapping, and claim review are separate states:

- `unreviewed` records no completed evidence work.
- `bibliography-only` means references exist but are not mapped to claims.
- `source-mapped` requires real claim-to-source mappings and appropriate locator coverage.
- `claim-reviewed` requires the recorded review method, real mappings, adequate locator coverage, and a current review lock.
- `review-out-of-date` means claim-bearing content no longer matches that lock.

No record may be described as `claim-reviewed` merely because it is long, has a bibliography, or passed automated checks. See the [editorial data model](../editorial/editorial-model.md) and [Decision 0004](../decisions/0004-editorial-state-separation.md).
