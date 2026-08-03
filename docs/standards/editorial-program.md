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

## Primary Museum interpretation

Canonical articles and primary Museum interpretations are distinct editorial surfaces. The article is the comprehensive sourced reference; a primary Museum exhibit requires bespoke, concise, object-aware interpretation for spatial exploration. Do not mechanically dump article metadata, section prose, bibliographies, key-idea catalogs, or complete dispute inventories into a Museum modal.

Use the canonical subject name as the default prominent title. A thematic subtitle should be rare, genuinely useful, and visually subordinate. Do not stack an eyebrow, canonical title, thematic subtitle, giant question, and multiple section headings into competing title layers. Explain the subject directly before foregrounding a curatorial hook or representative object.

Representative objects should support and illuminate the subject rather than redefine the entire exhibit around one object or historical episode. When the hierarchy needs clarification, prefer typography, spacing, and visual emphasis before adding more labels or subtitles.

Paragraph-based interpretation without visible section headings is valid and preferred when headings would fragment the reading experience. Three conceptual movements do not require three visible subtitles.

After a canonical page completes claim review, reconcile its primary Museum exhibit before deployment. The review record must state whether the Museum interpretation was inside the formal review boundary or was reconciled separately; never imply that an article lock covers separate Museum copy when it does not.

The canonical-title, direct-explanation, paragraph-based Museum pattern is an established routine pattern. Related content batches that do not change shared UI, CSS, geometry, assets, or rendering behavior should normally complete article review and primary Museum reconciliation in the same branch and run. Conforming Museum-copy changes require the focused deterministic editorial and Museum audits, not a repeated desktop/mobile browser matrix, screenshot review, or separate owner visual review. The GitHub Pages workflow remains the single complete release gate after focused feature checks pass. Expanded browser or owner review is required when shared layout or rendering changes, geometry or assets change, an exhibit is a meaningful visual outlier, Codex detects clipping or hierarchy problems, or the owner explicitly requests it.

As normal guidance rather than inflexible counters, aim for a 25–45-word direct wall-plaque invitation beneath the canonical title, a 45–90-word object identification and caption, a 250–400-word main interpretation arranged in three or four coherent paragraphs or genuinely useful sections, and no more than five or six compact orientation items. Subject, object, layout, and accessibility may justify proportionate variation.

## Credibility states

Depth, bibliography, source mapping, and claim review are separate states:

- `unreviewed` records no completed evidence work.
- `bibliography-only` means references exist but are not mapped to claims.
- `source-mapped` requires real claim-to-source mappings and appropriate locator coverage.
- `claim-reviewed` requires the recorded review method, real mappings, adequate locator coverage, and a current review lock.
- `review-out-of-date` means claim-bearing content no longer matches that lock.

No record may be described as `claim-reviewed` merely because it is long, has a bibliography, or passed automated checks. See the [editorial data model](../editorial/editorial-model.md) and [Decision 0004](../decisions/0004-editorial-state-separation.md).
