# 0004 — Separate editorial states

- **Status:** Accepted
- **Date:** 2026-08-01

## Decision

Article depth, bibliography presence, claim-to-source mapping, and completed claim review are independent properties. A record may advance only to the state its stored evidence supports. `claim-reviewed` requires real mappings, appropriate locator coverage, the recorded review procedure, and a current review lock.

## Rationale

Long prose can be unsupported; a bibliography can be unmapped; mapped citations can still leave high-risk claims uncovered; automated checks cannot perform scholarly judgment. Collapsing these states would overstate credibility to visitors.

## Consequences

- Public labels remain descriptive and never imply peer review.
- The [editorial model](../editorial/editorial-model.md) defines the data contract; the [baseline](../editorial/editorial-baseline.md) remains historical evidence.
- Depth and editorial audits remain independent and are selected according to the [validation matrix](../standards/validation-matrix.md).

## Reopening conditions

Reopen only if the evidence model itself changes and an explicit owner decision preserves truthful public communication and stale-review detection.
