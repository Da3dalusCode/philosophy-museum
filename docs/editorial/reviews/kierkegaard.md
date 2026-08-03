# Kierkegaard claim-review dossier

- Canonical ID: `kierkegaard`
- Visitor route: `#/philosophers/kierkegaard`
- Review date and status: 2026-08-03; `claim-reviewed`
- Stored review lock: `fnv1a64:2ee6e83ef0f1e3b0`
- Coverage: 15 sections; 32 citation-bearing paragraphs; 17 structured claim groups; 86 citation references
- Evidence: 8 registered and cited sources; every paragraph and structured claim mapped in `modernGermanIdealistReactionsEditorial.ts`
- Article depth: 2,351 final substantive words

## Review method and boundary

The canonical article and structured fields were reviewed against John Lippitt’s SEP account, the *Cambridge Companion to Kierkegaard*, and Princeton editions of *Either/Or*, *Fear and Trembling / Repetition*, *The Concept of Anxiety*, *Works of Love*, *The Sickness Unto Death*, and *The Moment and Late Writings*. The method separately tracked signed works, pseudonymous works, editorial personae, journals and posthumous self-interpretation, upbuilding discourses, and direct late polemic. High-risk review covered authorial attribution, “truth is subjectivity,” stages/spheres, the Abraham problem, faith and ethics, politics, gender, social hierarchy, and later existential reception.

The deterministic lock covers the registered and reread canonical article and structured record, not separate Museum prose. Primary and supplemental Museum interpretations, object/asset records, plaques, assignment, routes, and derived surfaces were inspected independently below.

## Source and locator coverage

- `kierkegaard-sep`: sections 1–6 for life, authorship, aesthetics, ethics, religion, politics, and influence.
- `kierkegaard-companion`: chapters on irony, aesthetics, ethics, psychology, knowledge, theology, politics, and indirect communication.
- `kierkegaard-either-or`: Preface, Part I aesthetic papers, and Part II Judge William letters; voices remain distinct.
- `kierkegaard-fear-repetition`: *Fear and Trembling*’s Exordium, Eulogy, Problemata I–III, and Epilogue, plus the separate pseudonymous work *Repetition*.
- `kierkegaard-anxiety`: Introduction and chapters I–V of Vigilius Haufniensis’s pseudonymous psychological deliberation.
- `kierkegaard-works-love`: First and Second Series of the signed deliberations.
- `kierkegaard-sickness`: Parts One and Two of Anti-Climacus’s pseudonymous Christian psychology.
- `kierkegaard-late`: *The Moment* and associated signed late writings on Christendom.

The module maps each article section and all 17 structured claim groups. Structured evidence includes classification, secure dates plus genre-sensitive dating note, contribution and short biography, context, central problem, branch status, works and ideas, life/development, explanation, influences, disputes, branch contributions, and reading paths.

## Corrections, qualifications, and disputes preserved

- Pseudonyms are speakers with distinct positions, limitations, genres, and aims. Their claims cannot automatically be attributed to Kierkegaard, but they are not unrelated fictional strangers with no role in his authorship.
- Signed discourses and *Works of Love*, pseudonymous books, journals/notebooks, the posthumous *Point of View*, and the signed late attack on Christendom have different evidential roles.
- *The Point of View* describes a religious authorship from the beginning, but scholars dispute whether it records an original plan or a retrospective unity understood and reshaped as the work developed.
- “Truth is subjectivity” concerns the existing knower’s relation and appropriation, not denial of facts or license for any intensely felt belief.
- Aesthetic, ethical, and religious “stages” or spheres are possibilities and recurring orientations, not a universal three-step life ladder.
- Anxiety is possibility and the “dizziness” of freedom in a theological psychology, not simply clinical anxiety. Despair is a misrelation of the self to itself and its grounding, not ordinary sadness.
- *Fear and Trembling* is attributed to Johannes de Silentio, who says he cannot understand Abraham. The teleological suspension of the ethical remains a paradox and danger, not a general religious exemption or Kierkegaard’s unmediated rule.
- Choice is not valuable merely because it is chosen. Repetition, ethical continuity, neighbor-love, promise, forgiveness, and formation complicate the popular “leap of faith” reduction.
- *Works of Love* corrects the picture of solitary inwardness through commanded neighbor-love and equality before God, without making the text a modern political equality program.
- Kierkegaard’s critiques of the crowd, public, leveling, and Christendom are not a democratic institutional theory. His political outlook is often conservative and suspicious of 1848 mass politics; later radical uses are transformations.
- Gender equality before God and critiques of possessive fantasy coexist with stereotypes, male authority, and conventional roles. Regine Olsen’s independent life is not reduced to material for Kierkegaard’s vocation.
- Kierkegaard is a major precursor of later existentialism, phenomenology, theology, psychology, and modernism, not a self-described member of twentieth-century existentialism.

No retained exact quotation requires page-level support. Familiar terms such as “leap of faith” are not presented as a sufficient canonical formula, and the phrase “three stages” is qualified by the corpus’s plural spheres and voices.

## Uncertainty audit

- **Authorial voice:** attribution must remain local to speaker, genre, and work.
- **Authorship unity:** religious continuity and literary multiplicity remain genuine interpretive alternatives.
- **Faith and ethics:** the Abraham problem cannot responsibly be domesticated into either generic irrationalism or an easy ethical rule.
- **Politics:** egalitarian resources in neighbor-love compete with political withdrawal, conservatism, and hierarchy.
- **Gender and biography:** later feminist use and biographical interpretation must not erase explicit limits or Regine Olsen’s agency.
- **Hegel:** Kierkegaard often attacks Danish Hegelianism and “the system” as he understood them; this should not become a claim that every criticism accurately describes Hegel’s own text.
- **Reception:** secular existential appropriations illuminate real problems while omitting or transforming the Christian core.

## Entity-complete surface inventory and integration recommendations

### Canonical and structured data

- `src/data/philosophers.ts`, tuple `kierkegaard`: currently labels the tradition “Existential” and lists existentialism as primary. Register the proposed override so philosophy of religion is primary and existentialism is a high-confidence precursor membership, not anachronistic self-identification.
- `src/data/philosophers.ts`, `membershipCorrections.kierkegaard`: its existing existentialism `precursor` and philosophy-of-religion `major` statuses are accurate. The override preserves and expands this distinction.
- `src/data/contentDepth.ts`, record `kierkegaard`: accurate as a seed but shallow; the patch adds genre, repetition, love, politics, gender, hierarchy, and late Christendom distinctions.
- `src/data/postKantianNineteenthArticles.ts`, record `kierkegaard`: preserve the 12 baseline sections; the module inserts `genres-corpus`, `repetition-choice-ethics`, and `politics-hierarchy-gender` before reading strategy.
- `src/data/philosopherCompletionDepth.ts`: no target-specific Kierkegaard block was found. The patch supplies chronology, detailed works, classifications, and reading paths.
- `src/data/canonicalArticles.ts` and philosopher registry composition: registration only; no architecture change recommended.

### Museum primary, supplemental, object, and plaque surfaces

- `src/data/museum/museumCanonicalProgram.ts`, primary exhibit `faith-pessimism-life-value / nineteenth-faith-subjectivity / kierkegaard`: assignment, standard tier, question, secondary routes, former-hall compatibility pointer, and principal asset are accurate. Preserve. Primary runtime title must remain exact canonical `Kierkegaard`.
- `src/data/museum/nineteenthPrimaryInterpretationEnrichment.ts`, record `kierkegaard`: currently contains only the object interpretation. This is the main material Museum gap. Add bespoke primary lead, 250–400 words of connected interpretation, no more than five or six orientation items, works, caution, sources, and article CTA. It must distinguish pseudonyms/signed works/journals/late attack and include anxiety, despair, love, faith, and social/political limits rather than mechanically dumping article sections.
- The existing object note correctly identifies Luplau Janssen’s c. 1902 posthumous painting and rejects presenting it as a lifetime likeness or collapsing pseudonymous voices. Preserve.
- `src/data/museum/faithPessimismValueGalleryCuration.ts`, room `nineteenth-faith-subjectivity`: accurate sign distinguishing pseudonyms, ethics, anxiety, despair, faith, and attack on Christendom. Preserve geometry and room copy.
- `src/data/museum/faithPessimismValueSupplementalExhibits.ts`, records `kierkegaard-indirect-communication`, `kierkegaard-fear-trembling`, `kierkegaard-christendom-attack`, `kierkegaard-corsair-public`, and `kierkegaard-regine-legend`: inspected. They correctly distinguish pseudonymous standpoints, refuse a reusable religious exemption, separate cultural membership from Christian existence, qualify Kierkegaard’s interested testimony about the public, and preserve Regine Olsen’s independent agency. No material rewrite recommended.
- `src/data/museum/faithPessimismValueGalleryAssets.ts`: principal posthumous painting, Copenhagen salon drawing, Caravaggio sacrifice, Church of Our Lady image, *Corsaren* cartoon, and Regine Olsen photograph have responsible object identification, provenance/rights, limitations, and alt text. Preserve.
- Supplemental factual titles and invitations are compliant: `Indirect Communication`, `Fear and Trembling`, `The Attack on Christendom`, `The Corsair Affair`, and `Regine Olsen’s Independent Life`.
- `src/data/museumCatalog.ts`, `src/data/museum/modernityFreedomCritiqueHall.ts`, and related legacy/compatibility records still name the former Kierkegaard installation. The authoritative primary is Gallery 21. Verify these are compatibility/history surfaces and do not render a duplicate canonical primary; preserve the established route rather than deleting or redesigning architecture in this pass.
- `docs/museum-asset-provenance.md`: the older provenance row mentions a Niels Christian Kierkegaard drawing and *Philosophical Fragments* manuscript associated with the former exhibit. Verify that the record is clearly legacy/compatibility and does not conflict with the active Luplau Janssen principal asset. Change only if the audit shows active ambiguity.

### Search, directory, Compare, wall, timeline, map, paths, relationships, and routes

- `src/components/Compare/CompareMode.tsx`: derived from the canonical summary, ideas, and beginner explanation. The patch corrects Compare without bespoke copy.
- `src/components/PhilosopherProfile/PhilosopherProfile.tsx`: profile directory search will gain indirect communication, despair, repetition, and love terms while displaying the corrected branch status.
- `src/data/searchIndex.ts` and `src/data/generated/searchIndex.json`: derived. Recompile; do not hand-edit.
- `src/data/routeManifest.ts` and `src/data/generated/routeManifest.json`: philosopher, active primary, five supplemental, and compatibility routes must be regenerated and checked through the compiler only.
- `src/data/timelineEvents.ts`, event `kierkegaard-subjectivity` (1843): materially shallow and combines anxiety with the year of *Fear and Trembling*. Recommended correction: name the 1843 pseudonymous publication cluster, attribute *Fear and Trembling* to Johannes de Silentio, and reserve *The Concept of Anxiety* for 1844. Keep existentialism explicitly later reception.
- `src/data/wallChart.ts`, work `fear-trembling`: the inspected current text correctly attributes Johannes de Silentio and rejects a general religious exemption. Preserve. The existentialism band summary says “precursors and associated figures,” which is acceptable with the canonical precursor status.
- `src/data/relationships.ts`: no explicit Kierkegaard edges were found. Material candidates: Kierkegaard reacts against Hegelian system (qualified as his target/understanding), Schelling influences later Kierkegaard, and Kierkegaard is a historical predecessor of later existentialism. Do not encode membership as if he joined a twentieth-century school.
- `src/data/learningPaths.ts`, path `existential`: the inspected current worktree already contains speaker/genre caution, anxiety/despair, choice, and situated freedom. Preserve; it is materially aligned with this review. Consider adding neighbor-love only if the path can do so without becoming longer or theology-heavy.
- Philosophy Wall/Map drawers derive canonical fields. The patch fixes the tradition and membership display; explicit influence lines require the relationship updates above.

### Assignment, masterplan, fixed contracts, and triage

- `docs/museum-masterplan/philosopher-assignments.csv`, row `kierkegaard`: explicitly identifies him as a precursor rather than later movement member. Preserve.
- `docs/museum-masterplan/hall-program.json`, room `nineteenth-faith-subjectivity`; `docs/museum-masterplan/single-level-building-plan.json`; and `src/data/museum/faithPessimismValueGalleryCuration.ts`: active primary home, capacity, route, and geometry are correct. Preserve.
- `docs/museum-masterplan/exhibit-wall-standard.md`: preserve Gallery 21’s 18 installations, 6 per room, and zero text-dominant/isolated-book result.
- `docs/editorial/flagship-program.json`: Kierkegaard is not a flagship. Preserve roster.
- `docs/editorial/editorial-coverage-report.md` and `docs/editorial/article-depth-inventory.*`: authoritative regeneration records the current review and final depth.
- `docs/content-roadmap.md`: its note that Kierkegaard requires status-qualified existentialism membership is correct. Preserve.

## Residual risk and acceptance conditions

Accepted after integrated rereading, bespoke primary Museum reconciliation, former-hall compatibility review, downstream corrections, deterministic lock verification, and focused gates. The highest residual risks are pseudonym leakage into direct doctrine, overreliance on retrospective journals/*Point of View*, reducing the authorship to stages or leap, and underrepresenting politics/gender beside religious inwardness.
