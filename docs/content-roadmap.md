# Philosophy Atlas content roadmap

This roadmap summarizes the current editorial program and its remaining work. Durable requirements live in the [editorial program](./standards/editorial-program.md), [accepted decisions](./decisions/README.md), and [validation matrix](./standards/validation-matrix.md). Generated reports and executable audits are authoritative for live counts.

## Current collection

Philosophy Atlas currently contains:

- **192 canonical full articles:** 147 philosopher profiles and 45 articles on philosophies, branches, schools, traditions, movements, methods, and frameworks.
- **192 canonical Museum exhibits:** one for each article-backed canonical entity.
- **411 supplemental Museum exhibits:** works, objects, arguments, diagrams, events, and contextual installations.
- **26 curated/open galleries and 105 rooms:** 603 interpreted stops on one connected public level.

All 192 canonical full articles meet the 2,000-word substantive-prose floor. This closes the universal depth migration; it does not complete sourcing or review.

## Editorial state

The current editorial report records:

- **123 claim-reviewed articles** with current review locks;
- **65 bibliography-only articles** whose references are not mapped as completed claim review;
- **4 unreviewed articles**;
- **0 source-mapped articles awaiting completed review**; and
- **0 review-out-of-date articles**.

Museum exhibit review is separate. The generated exhibit ledger records **121 standard-compliant canonical exhibits** and **71 unreviewed canonical exhibits**, with no stale, unmatched, or ambiguous exhibit-to-article relationships.

Article depth, bibliography presence, claim review, and exhibit review are independent milestones. A long article is not necessarily claim-reviewed, and a claim-reviewed article does not by itself make the related Museum exhibit standard-compliant. Philosophy Atlas is not a peer-reviewed or independently reviewed academic publication.

## Current priorities

1. Complete claim review for the remaining bibliography-only and unreviewed articles, preserving uncertainty and disagreement.
2. Complete the separate Museum exhibit review only after each related article and displayed object can be reconciled to the exhibit standard.
3. Advance the approved flagship roster toward its higher depth targets without filler or weakened source discipline.
4. Maintain source, image-rights, accessibility, chronology, classification, and relationship metadata as the collection evolves.
5. Deepen comparison and learning routes selectively while keeping Big History and Philosophy Map readable.

The Museum architecture, 26-gallery program, canonical assignments, and existing GitHub Pages deployment path remain fixed unless explicitly reopened under the project standards.

## Live reports

- `npm run report:coverage` — canonical article presence.
- `npm run report:depth` — article-depth inventory.
- `npm run report:editorial` — bibliography, evidence, review, and stale-lock coverage.
- `npm run report:exhibits` — canonical exhibit-to-article review ledger.
- `npm run report:flagships` — progress against the approved flagship roster.
- `npm run audit:articles`, `npm run audit:editorial`, and `npm run audit:exhibits` — blocking checks for the relevant contracts.

These reports measure repository state. They do not replace historical or philosophical judgment, establish consensus, or confer peer review.
