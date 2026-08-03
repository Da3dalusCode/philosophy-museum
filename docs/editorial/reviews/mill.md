# John Stuart Mill claim-review dossier

- Canonical ID: `mill`
- Visitor route: `#/philosophers/mill`
- Editorial submission date: 2026-08-03
- Effective status: `claim-reviewed`
- Deterministic lock: `fnv1a64:6e91db417cbab2f2`
- Coverage: 13 sections; 29 citation-bearing paragraphs; 17 structured claims; 72 citation references
- Evidence set: 8 registered and cited sources, including five primary-text/corpus records and three independent specialist resources
- Depth: 2,089 final substantive words

## Method and review boundary

Every existing paragraph, the new section, and each structured field was checked across *On Liberty*, *Utilitarianism*, *Considerations on Representative Government*, *The Subjection of Women*, *A System of Logic*, *Principles of Political Economy*, the broader Mill corpus, two SEP specialist entries, and *The Cambridge Companion to Mill*. The review treats moral philosophy, political philosophy, logic, political economy, religion, autobiography, parliamentary action, and East India Company employment together. It targeted harm-principle qualifications, the proof of utility, higher pleasures, Harriet Taylor Mill, competence, democracy, paternalism, imperial exception, labor/cooperation, and the difference between first publication and later editions.

The article lock should not silently cover Museum prose. Museum surfaces were inspected separately and require their own integration review.

## Paragraph evidence map

| Article section(s) | Evidence and inspectable locators |
| --- | --- |
| `overview`; `formation` | General SEP §§1–2; Cambridge Companion introduction and development chapters; *Autobiography* chs. III–V through the corpus portal |
| `utilitarianism`; `proof-utility` | *Utilitarianism* chs. II–V; moral/political SEP §§2–4 |
| `liberty`; `speech`; `individuality` | *On Liberty* chs. I–V; moral/political SEP §§5–7 |
| `women-equality` | *Subjection* chs. I–IV; Companion chapter on Mill and feminism |
| `democracy-government` | *Representative Government* chs. III, VII–VIII, XVI–XVIII; moral/political SEP §8; Companion chapters on democracy and empire |
| `logic-empiricism` | *System of Logic* books III and VI; general SEP sections on logic, induction, and social science |
| `political-economy` | *Political Economy* books II and IV, with edition history; general SEP political-economy section; Companion chapter on economy |
| `legacy-reading` | Both SEP entries; Companion introduction and reception |
| `religion-empire-and-qualified-liberty` | *On Liberty* chs. I, IV–V; *Representative Government* chs. IV, XVI–XVIII; general SEP religion/politics sections; Companion chapters on religion, liberty, government, and empire |

## Structured-claim evidence map

| Claim family | Evidence |
| --- | --- |
| Dates, life, education, crisis, Company career, Parliament | General SEP §1; Companion introduction; *Autobiography* |
| Utility, qualitative pleasure, justice, rules, sanctions | *Utilitarianism* chs. II–V; moral/political SEP §§2–4 |
| Liberty, speech, individuality, competence qualifications | *On Liberty* chs. I–V; moral/political SEP §§5–7 |
| Representative government and empire | *Representative Government* chs. III–VIII, XVI–XVIII; Companion specialist chapters |
| Logic and political economy | *Logic* books III, VI; *Political Economy* books II, IV; general SEP |
| Equality and Harriet Taylor Mill | *Subjection* chs. I–IV; Companion feminism/collaboration discussion; claims of precise coauthorship remain qualified |
| Religion | *Three Essays on Religion* in the Mill corpus; general SEP religion section |
| Reading path and disputes | Primary works above plus Companion disagreement chapters |

## Corrections, distinctions, and uncertainty audit

- The harm principle governs coercion of competent adults and is stated with qualifications concerning harm, duties, dangerous contexts, children, and capacity. It is not “anything goes unless there is a direct physical injury.”
- Mill’s free-discussion case is an epistemic and developmental argument about fallibility, partial truth, contestation, and living conviction, not a simple defense of unrestricted speech on every platform and in every circumstance.
- Qualitative pleasures and competent judges are explained without claiming that the text uncontroversially remains purely hedonistic; dignity, excellence, and development generate a real interpretive dispute.
- The “proof” of utility is not advertised as a valid formal deduction. Competing naturalistic and reflective readings remain open.
- Liberty, individuality, democracy, competence, representation, and paternalism are separated. Participation can educate, while weighted voting and colonial tutelage expose hierarchy.
- East India Company employment and the civilizational exception are integral to interpretation but do not replace the logic, ethics, feminism, and political economy of the corpus.
- Mill is not reduced to laissez-faire. Distribution, inheritance, labor organization, and producer cooperation developed through later editions of *Political Economy*.
- Harriet Taylor Mill is treated as an author and sustained intellectual partner. The exact share of individual texts, especially *On Liberty*, remains disputed rather than assigned with false precision.
- *Three Essays on Religion* is posthumous; Mill’s critical natural theology is not conventional Christianity and is not simple atheistic dismissal.
- Mill’s observed claims about “women’s nature” are reported as an epistemic critique of evidence formed under subordination, while class and imperial limitations remain visible.
- The inherited unsupported superlative “the most influential nineteenth-century defender” is replaced with the reviewable claim that Mill was a major defender and central reviser.

## Entity-complete surface inventory

| Surface | Exact record/file | Finding and only material action recommended |
| --- | --- | --- |
| Canonical record | `src/data/philosophers.ts`; `src/data/contentDepth.ts`; `src/data/postKantianNineteenthArticles.ts` (`mill`) | Apply the override after article assembly. Add religion and a more explicit competence/empire boundary; expand works beyond *Utilitarianism* and *On Liberty*. |
| Search/directory/Compare | `src/data/searchIndex.ts`; generated `src/data/generated/searchIndex.json`; canonical directory/Compare consumers | Regenerate; do not hand-edit JSON. Verify summaries no longer imply unrestricted speech or simple laissez-faire. |
| Timeline/Big History | `src/data/timelineEvents.ts` `mill-liberal-utility`; `src/data/wallChart.ts` `utilitarianism` and `on-liberty` | Current founder/developer chronology and 1859 landmark are sound. “Mill revises … through liberty, individuality, and harm” is compact but should not imply *On Liberty* alone revised utilitarianism. No required change if drawer provides context. |
| Map/relationships | `src/data/philosophers.ts` has `bentham → mill`; `src/data/relationships.ts`/derived map | Retain as high-level influence, not exclusive intellectual descent. Do not add Harriet Taylor Mill as a canonical philosopher edge unless the relationship schema can represent a noncanonical interlocutor truthfully. |
| Learning paths | `src/data/learningPaths.ts`, `ethics` and `politics` | Politics step already names imperial exceptions and competence hierarchies; retain. |
| Primary Museum interpretation | `src/data/museum/museumExpansionInterpretations.ts`, `mill`; `src/data/museum/nineteenthPrimaryInterpretationEnrichment.ts` | Interpretation is accurate and unusually strong on Harriet Taylor Mill and empire. Add only a brief competence/children/duties qualification if space permits; do not mechanically copy the article. |
| Primary title/invitation mirror | `src/data/museum/museumCanonicalProgram.ts`, `mill` | Normalize subtitle-heavy `displayName` to `John Stuart Mill` if the executable canonical-title derivation does not already supersede it. Keep current complete visitor question. |
| Legacy Museum catalog | `src/data/museumCatalog.ts`, `mill`, `mill-stereoscopic-portrait`, `mill-on-liberty-1859` | Sound. Preserve the distinction between the older catalog portrait and Gallery 20 Watts lifetime portrait. |
| Supplemental Museum | `src/data/museum/utilityLibertyCapitalSupplementalExhibits.ts`: `liberty-romantic-formation`, `liberty-harriet-collaboration`, `liberty-cooperative-experiments`, `liberty-public-assembly`, `liberty-womens-suffrage`, `liberty-imperial-exception` | The six records already preserve the key distinctions: Wordsworth painting is contextual; Taylor authorship is uncertain; Rochdale is adjacent rather than implementation; imperial coins do not settle each text. No substantive rewrite recommended. Confirm factual plaque `shortTitle` plus one invitation is what renders. |
| Assets/provenance/accessibility | `src/data/museum/utilityLibertyCapitalGalleryAssets.ts`; `src/data/museumCatalog.ts`; provenance docs | Watts portrait is a 1873 lifetime likeness; supporting contexts have explicit limitations. No asset change. |
| Assignment/route/fixed contract | `docs/museum-masterplan/philosopher-assignments.csv` row `mill`; Gallery 20 curation/program | Preserve primary Gallery 20 home, anchor tier, secondary Justice/Moral Life routes, geometry, and counts. |
| Editorial triage | generated depth/coverage reports | Authoritative regeneration records the current review and passing depth. |

## Review acceptance and residual risk

Accepted after integrated rereading and deterministic lock verification. Residual risks concern edition-sensitive shifts in *Political Economy*, assigning Harriet Taylor Mill’s collaboration too precisely, using “harm” without Mill’s qualifications, and treating developmental language about colonized peoples as a minor exception rather than an institutional imperial boundary. No assignment, geometry, route, or asset change is warranted.
