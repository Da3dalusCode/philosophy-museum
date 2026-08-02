# 0002 — Editorial depth and flagship scope

- **Status:** Accepted
- **Date:** 2026-08-01

## Decision

All canonical full articles retain the universal 2,000-word substantive-prose minimum. A bounded flagship tier uses higher targets: 4,000 words for thinkers and 5,000 for philosophies, fields, schools, and traditions. The exact owner-approved scope is the manifest at [`../editorial/flagship-program.json`](../editorial/flagship-program.json); additions or removals require an explicit owner standards change. Approved labels without a canonical article remain visible as missing work rather than being silently dropped.

## Rationale

A universal floor prevents skeletal coverage, while a bounded flagship tier supports museum-grade treatment of the Atlas’s most important learning routes without imposing arbitrary uniform length on every subject.

## Consequences

- `npm run report:depth` remains the universal inventory.
- `npm run report:flagships` reports target progress without failing below-target migration backlog.
- Depth never substitutes for accuracy, evidence, or review status. See the [editorial program](../standards/editorial-program.md).

## Reopening conditions

Reopen only when the owner explicitly changes a target, category rule, or named flagship roster as standards maintenance.
