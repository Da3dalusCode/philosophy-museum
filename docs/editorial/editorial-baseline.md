# Editorial credibility baseline

Snapshot date: 2026-07-31

Authoritative starting commit: `c4016b0308237aeb03e3e7d6c0af8630d22611a1`

Branch evaluated: `main` after a seven-commit fast-forward to `origin/main`

This document records the corpus before claim-level citations and editorial statuses were introduced. Live counts should be obtained with `npm run report:editorial`; this snapshot is retained so later work can be compared with a fixed starting point.

## Measured article corpus

| Surface | Records | With legacy `sourceLinks` | Without legacy `sourceLinks` | Inline claim citations | Explicit editorial statuses |
| --- | ---: | ---: | ---: | ---: | ---: |
| Philosopher profiles | 146 | 61 | 85 | 0 | 0 |
| Branch pages | 43 | 41 | 2 | 0 | 0 |
| Total | 189 | 102 | 87 | 0 | 0 |

The existing `sourceLinks` arrays were bibliography-style links. They did not identify which sentence, list item, date, classification, quotation, work attribution, or influence claim a source supported. Their presence therefore did not establish claim-level coverage.

The article-depth audit reported a long-form article for all 146 philosopher records and all 43 branch records. Its word totals are length heuristics only: they detect missing or unexpectedly short material, not accuracy, evidence quality, originality, or editorial review. Several records sat exactly at or near the configured minimum, which made the threshold particularly unsuitable as a quality label.

The accuracy audit passed its selected known-fact regression checks. Those checks protect a limited set of deliberately encoded dates, labels, memberships, and integrity corrections. They do not read or fact-check every prose claim and must not be represented as doing so.

## Claim-bearing visitor surfaces

The editorial corpus is larger than the two long-form article registries. Claims appear in:

- philosopher hero metadata, date notes, biographies, contribution summaries, questions, ideas, works, influence lists, branch memberships, misconceptions, and reading routes;
- branch hero metadata, origin stories, questions, development summaries, concepts, figures, works, debates, rivals, modern relevance, misconceptions, and reading routes;
- article paragraphs and article connection panels;
- Big History timeline events, wall-chart school bands, philosopher and work markers, and their detail drawers;
- Philosophy Map relationship labels and detail drawers;
- comparison summaries and guided learning-path explanations;
- Museum labels, interpretation panels, supplemental exhibits, compatibility records, and reused Atlas excerpts;
- search labels and route manifests when they repeat names, dates, categories, or descriptions.

The three pilots deliberately review a bounded set of these reuse paths. A page-level status does not silently extend to unrelated Museum installations, map edges, or timeline records unless the pilot review note names that surface.

## Baseline risk model

The highest editorial-risk patterns were not evenly distributed. The first audit design therefore treats the following as triage signals rather than proof of error:

- exact quotations or quote-like wording without a durable locator;
- exact ancient or traditionally transmitted dates;
- “first,” “founder,” “originated,” “invented,” “decisive,” and other priority or superlative claims;
- influence chains and causal accounts of intellectual development;
- disputed biography, authorship, school membership, or doctrinal attribution;
- broad civilizational, religious, national, or cross-cultural classifications;
- prose that converts a later tradition or a modern scholarly reconstruction into a historical actor’s own uncontested view.

Automated warnings can route these claims to human review. They cannot settle the underlying history or interpretation.

## Baseline verification results

The unchanged starting commit passed:

- `npm run build`
- `npm run audit:integrity`
- `npm run audit:articles`
- `npm run audit:accuracy`
- `npm run audit:routing`
- `npm run report:coverage`
- `npm run report:bundle`
- `git diff --check`

The baseline production build used Vite 8.0.16 and processed 2,559 modules. The entry JavaScript bundle was 465,370 raw bytes and 133,884 gzip bytes. Its initial JavaScript closure was 473,905 raw bytes and 137,142 gzip bytes. The total JavaScript corpus was 8,749,507 raw bytes and 2,550,359 gzip bytes. The large philosopher and Museum chunks were already lazy route assets; editorial source packs must remain off the initial route.

## Baseline conclusion

At the starting commit, Philosophy Atlas had complete long-form record coverage and useful regression checks, but no normalized evidence model, no claim-to-source mapping, no stale-review detection, and no public way to distinguish a bibliography from a completed claim review. The editorial foundation adds those capabilities without relabeling the legacy corpus or implying that automated checks make philosophical judgments.
