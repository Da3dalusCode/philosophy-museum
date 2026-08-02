# Validation matrix

Validation is selected by task risk, not by habit. Before implementation, classify the task into one or more categories below. For mixed work, run the union of the relevant focused checks; split unrelated risk into separate tasks when that keeps evidence clearer. A prompt may require additional checks, but a lower-risk task does not inherit every repository audit or browser flow.

| Task category | Required validation | Normally not required |
| --- | --- | --- |
| Content depth | Focused depth/report command for changed records; TypeScript/build only when imports, registration, or executable data changed; editorial audit when editorial metadata changed | Broad browser pass, Museum suite, production smoke test |
| Claim review | Claim/source/locator inspection; focused editorial test and audit; reviewed-depth audit for records promoted to `claim-reviewed`; focused rendering only when presentation changed | Broad Museum or route suite without a changed dependency |
| Shared code / UI | TypeScript production build; focused regression tests; direct handler/route inspection; browser checks for the named flows and affected viewports | Museum-specific suite when Museum behavior is untouched |
| Museum geometry / visual | Production build; relevant Museum manifest, geometry, asset, and route checks; focused browser navigation; representative viewport captures; owner visual review for major changes | Unrelated editorial batch audits |
| Integration / deployment | The complete deployment gate in [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml); clean diff; production smoke check after deployment | None of the gate may be waived implicitly |
| Docs / governance | Focused document or reporter validation; commands explicitly named by the task; `git diff --check`; build only when executable docs tooling, package scripts, imports, or generated contracts changed | Browser automation, Museum suite, broad viewport testing |

If a required check cannot run, report the exact blocker and the unverified risk. Do not substitute a passing lower-level check for a required higher-level one.
