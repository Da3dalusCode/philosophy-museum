# Political Philosophy claim-review dossier

- Canonical ID: `political-philosophy`
- Visitor route: `#/branches/political-philosophy`
- Editorial payload: `src/data/editorial/coreFieldsEntityCompleteEditorial.ts`
- Review date: 2026-08-03
- Effective status: `claim-reviewed`
- Review lock: `fnv1a64:bf0a3cfc12a529d8`
- Coverage: 10 sections; 23 citation-bearing paragraphs; 19 structured-claim groups; 69 citation references
- Evidence: 13 registered sources (10 specialist references, 3 primary/archival texts); paragraph and structured-claim locators are inspectable
- Article depth: 2,104 substantive prose words, excluding structured facts and source metadata

## Method and boundary

The review treats political philosophy as inquiry into power, authority, legitimacy, obligation, justice, liberty, democracy, domination, resistance, and political membership. It rejects a story in which the field begins in early-modern Europe and later “adds” colonialism, race, gender, disability, or global justice. Those problems change the field's basic units, agents, evidence, and ideals. The canonical article and branch facts are inside scope; linked philosophers, schools, primary Museum exhibits, and their object interpretations retain separate review boundaries.

## Evidence and locator map

| Claim family | Main evidence and inspectable locators |
| --- | --- |
| Authority, legitimacy, obligation | SEP, *Authority*, §§1–4; SEP, *Political Legitimacy*, §§1–4; Hobbes, *Leviathan*, Part II, chapters 17–21 |
| Justice and institutions | SEP, *Justice*, §§1–4; SEP, *Disability and Justice*, §§1–5 |
| Democracy, equality, expertise | SEP, *Democracy*, §§1–5 |
| Liberty and social coercion | Mill, *On Liberty*, chapters I–V |
| Colonial and global order | SEP, *Colonialism*, §§1–5; SEP, *Global Justice*, §§1–4 |
| Gender, race, intersectionality | SEP, *Feminist Political Philosophy*, §§1–5; SEP, *Critical Philosophy of Race*, §§1–4; Combahee River Collective Statement, full archived text |
| Africana plurality | SEP, *Africana Philosophy*, §§1–4 |

The structured registry separately supports classification, chronology, terminology, concepts, relationships, figures, works, disputes, misconceptions, modern applications, and a sequenced reading path.

## Corrections and qualifications

- Political philosophy has multiple ancient and global histories; the conventional “c. 1500” branch start is not a field origin. The payload records it only as a possible early-modern transformation anchor.
- De facto power, legal validity, legitimacy, authority, and political obligation are related but distinct.
- Consent is not treated as the only possible justification of rule, nor actual consent as historically ubiquitous.
- Negative liberty, positive liberty, republican non-domination, capabilities, collective self-government, and liberation are not reduced to one scale.
- Ideal theory is paired with nonideal diagnosis of injustice, colonialism, racialization, gendered dependency, disability exclusion, dispossession, and resistance.
- Democracy is not equated with bare majority rule; equality, inclusion, rights, agenda control, representation, expertise, and minority protection remain live questions.
- “Western political philosophy” is not used as an unmarked universal. Africana, Islamic, South Asian, East Asian, Indigenous, feminist, anticolonial, Black, disability, and global traditions are presented as internally plural rather than demographic appendices.
- Civil disobedience is not confined to a single respectful/nonviolent model, and the March on Washington is correctly described as a contextual image rather than itself an illegal action.
- Hobbes, Mill, and the Combahee River Collective are representative argumentative anchors, not the field's sole genealogy.

## Disputes and residual uncertainty

The scope of legitimate authority, general political obligation, distributive currency, idealization, democratic epistemic authority, border control, reparations, just resistance, the public/private boundary, and the institutional meaning of equality remain contested. Classification of Africana and Indigenous political philosophies requires specificity at the tradition and text level; the article deliberately avoids one synthesized doctrine.

## Surface reconciliation inventory

| Surface | Record/file | Finding and required action |
| --- | --- | --- |
| Canonical registry | `src/data/branches.ts` | Register the overlay after `modernCoreBranchDepth`; resolve lock only after rereading the effective record. |
| Existing depth | `src/data/modernCoreBranchDepth.ts`, `src/data/contentDepth.ts` | Supersede shallow prose, lists, works, and generic reading steps with the reviewed payload. |
| Museum primary | `src/data/museum/museumCanonicalProgram.ts` (`political-philosophy`) | Preserve Justice gallery primary placement, legitimacy question, secondary Moral Life placement, routes, and fixed asset. |
| Museum primary assets | `src/data/museum/justiceDemocraticReasonGalleryAssets.ts` records for `political-philosophy` | Preserve provenance and placement; reconcile compact interpretive copy with the reviewed distinctions. |
| Museum supplemental | `src/data/museum/justiceSupplementalExhibits.ts` (`political-authority-legitimacy`, `public-action-civil-disobedience`, Sen/capability and deliberation routes) | Preserve. Existing authority/legitimacy and March-on-Washington cautions are materially accurate. |
| Forum supplemental | `src/data/museum/coreQuestionsForumSupplementalExhibits.ts` (`forum-confucius-cultivation`, `forum-mencius-humane-rule`, `forum-al-farabi-virtuous-city`, `forum-maimonides-law`) | Preserve records and geometry. They productively prevent a single-genealogy account. |
| Museum compact sources | `src/data/museum/museumInterpretations.ts` | Bespoke branch summary is reconciled separately without extending the article lock to object text. |
| Search/directory | canonical consumers; `src/data/generated/searchIndex.json` | Regenerate. Ensure visible terms include authority, legitimacy, domination, colonialism, democracy, disability, and global justice. |
| Compare | `src/components/Compare/CompareMode.tsx` | Generic Compare inherits the facts. No special preset required; test selected-branch rendering after registration. |
| Big History/timeline | `src/data/timelineEvents.ts`, `src/data/wallChart.ts` | Existing landmarks remain usable, but the generic `political-philosophy` wall band starting 1500 materially implies a false field origin. Rename its display to “Modern political philosophy” or revise the representation without disturbing wall geometry. |
| Relationship map | `src/data/relationships.ts` | Preserve overlap with Ethics. Consider additional domination/democracy relationships only if supported by existing node contracts; do not create decorative edges. |
| Learning path | `src/data/learningPaths.ts` politics path | Material correction: current path is overwhelmingly European. Add a comparative/global/nonideal step and affected figures while preserving a teachable sequence. |
| Routes | `src/data/generated/routeManifest.json` | Regenerate; do not hand-edit. |
| Assignment/masterplan | `docs/museum-masterplan/branch-assignments.csv`, hall and canonical program | Preserve Gallery 05 primary placement and Moral Life secondary route. No geometry or contract change. |
| Reports/triage | depth and editorial coverage reports | Authoritative regeneration records the current review and passing depth. |

## Acceptance and residual risk

Accepted after overlay registration, deterministic lock verification, derived-artifact regeneration, Museum reconciliation, wall-band correction, learning-path expansion, and Level 2 claim-review plus shared validation. Residual risk remains in compressing globally distinct traditions or presenting the field as converging on one modern regime.
