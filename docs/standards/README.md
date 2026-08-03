# Philosophy Atlas standards

These documents are the durable, owner-approved rules for planning and delivering Philosophy Atlas work. They govern product direction, editorial quality, and validation. Temporary prompts, plans, handoffs, batch notes, and historical snapshots may narrow a task, but they do not silently change these standards.

## Authority and scope

Use this order when sources disagree:

1. An explicit owner instruction in the current task that names the conflicting standard and intentionally overrides it.
2. Accepted standards here and accepted records in [`../decisions/`](../decisions/README.md).
3. Executable manifests, canonical registries, and audits for the state the application currently ships.
4. Current detailed plans and implementation documentation.
5. Temporary briefs, suggestions, handoffs, snapshots, and historical records.

An owner override is task-local unless it explicitly makes standards maintenance part of the task. Do not infer an override from a preference, suggestion, isolated implementation request, or old one-off decision. If a request conflicts with a standard and no explicit owner override names that conflict, stop before implementation and report it. Never edit these standards unless standards maintenance is in scope.

## Required conflict report

| Field | Required content |
| --- | --- |
| Requested action | What the task asks the agent to do |
| Conflict | The standard or accepted decision it contradicts |
| Why it matters | The product, editorial, technical, or release consequence |
| Safest path | The smallest standards-compliant alternative |
| Approval needed | The exact owner override or standards change required |

## Standards set

- [`product-principles.md`](./product-principles.md) — permanent product and Museum principles.
- [`editorial-program.md`](./editorial-program.md) — depth, flagship, research, and review rules.
- [`entity-complete-editorial-migration.md`](./entity-complete-editorial-migration.md) — canonical entity-complete migration scope and reconciliation rules.
- [`validation-matrix.md`](./validation-matrix.md) — risk-proportionate verification by task category.
- [`../decisions/README.md`](../decisions/README.md) — accepted decisions and reopening conditions.

Detailed program authorities remain linked from the [documentation map](../README.md). They explain implementation; they do not supersede this standards layer.
