# Philosophy Atlas content roadmap

This roadmap summarizes the current editorial program and its remaining work. Durable requirements live in the [editorial program](./standards/editorial-program.md), [accepted decisions](./decisions/README.md), and [validation matrix](./standards/validation-matrix.md). Generated reports and executable audits are authoritative for live counts.

## Current collection

Philosophy Atlas currently contains:

<!-- public-collection-counts:start -->
- **192 canonical full articles:** 147 philosopher profiles and 45 articles on philosophies, branches, schools, traditions, movements, methods, and frameworks; 192 of 192 are currently claim-reviewed.
- **192 primary Museum exhibits:** 192 of 192 are standard-compliant under the separate primary exhibit-review standard.
- **411 supplemental Museum exhibits:** 173 reviewed and 238 explicit backlog.
- **26 curated/open galleries and 105 rooms:** 603 interpreted stops on one connected public level.
<!-- public-collection-counts:end -->

All 192 canonical full articles meet the 2,000-word substantive-prose floor. This closes the universal depth migration; it does not complete sourcing or review.

## Editorial state

The current generated reports record no stale canonical article or primary exhibit review locks and no unmatched or ambiguous primary exhibit-to-article relationships. The 238 unreviewed supplemental exhibits remain explicit backlog rather than being treated as reviewed or compliant.

Article depth, bibliography presence, claim review, and exhibit review are independent milestones. A long article is not necessarily claim-reviewed, and a claim-reviewed article does not by itself make the related Museum exhibit standard-compliant. These are internal, AI-assisted editorial review states; Philosophy Atlas has not received independent academic or peer review.

## Current priorities

1. Maintain current canonical article and primary exhibit review locks as content, evidence, or interpretation changes.
2. Complete the supplemental Museum exhibit backlog only after each related article and displayed object can be reconciled to the supplemental exhibit standard.
3. Advance the approved flagship roster toward its higher depth targets without filler or weakened source discipline.
4. Maintain source, image-rights, accessibility, chronology, classification, and relationship metadata as the collection evolves.
5. Deepen comparison and learning routes selectively while keeping Big History and Philosophy Map readable.

The Museum architecture, 26-gallery program, canonical assignments, and existing GitHub Pages deployment path remain fixed unless explicitly reopened under the project standards.

## Live reports

- `npm run report:coverage` — canonical article presence.
- `npm run report:depth` — article-depth inventory.
- `npm run report:editorial` — bibliography, evidence, review, and stale-lock coverage.
- `npm run report:exhibits` — canonical exhibit-to-article review ledger.
- `npm run report:supplementals` — supplemental review and backlog ledger.
- `npm run report:flagships` — progress against the approved flagship roster.
- `npm run audit:articles`, `npm run audit:editorial`, `npm run audit:exhibits`, and `npm run check:public-counts` — blocking checks for the relevant contracts and public count integrity.

These reports measure repository state. They do not replace historical or philosophical judgment, establish consensus, or confer peer review.
