# Socrates pilot claim review

- Canonical ID: `socrates`
- Visitor route: `#/philosophers/socrates`
- Review date: 2026-07-31
- Authored and effective status: `claim-reviewed`
- Stored review lock: `fnv1a64:6e6aff134ff8e585`
- Article depth: 2,702 baseline words; 3,010 final words; 2,702 words removed and 3,010 substantive words added; net change +308

## Method and boundaries

The complete visitor profile was rewritten as 17 sections and 37 stable, citation-bearing paragraphs. The review covered the article prose, hero facts represented in structured claims, dates and dating note, classification, biographical summary, contribution summary, reading routes, and the Socrates descriptions reused in the primary Museum interpretation. It also checked the most direct timeline and wall-chart references. It did not extend `claim-reviewed` status to every independent Plato dialogue panel, every later reception page, or every relationship edge that merely mentions Socrates.

The word counter includes only Unicode word tokens in `articleSections[].paragraphs[].text`. Headings, metadata, citations, sources, reading lists, and Museum copy are excluded. The old prose was replaced rather than counted alongside the reviewed article.

## Sources consulted

Evidence sources were Debra Nails and S. Sara Monoson’s specialist SEP article; James Ambury’s independent IEP overview; Plato’s *Apology* in the Jowett Internet Classics text, located by Stephanus division; Xenophon’s *Memorabilia* Book 1 in the Marchant Perseus edition, located by book, chapter, and section; and Aristophanes’ *Clouds*, located by line ranges. The Project Gutenberg *Memorabilia* is listed only as further reading and does not count as evidence.

## Claims retained

The review retained the secure orientation that Socrates was a conspicuous Athenian conversational figure, attracted associates, was prosecuted and executed in 399 BCE, and became an enduring model of philosophy as examined life. It retained the importance of questioning, professions of limited knowledge, ethical concern for character or soul, the association of virtue and knowledge in Socratic texts, the political and military context of fifth-century Athens, and the wide later reception of the Socratic figure.

## Corrections and qualifications

- The page now begins with the Socratic problem and treats Plato, Xenophon, Aristophanes, and later evidence as unlike literary witnesses rather than a seamless biography.
- The birth date is `c. 470/469 BCE`; the profile distinguishes its approximation from the secure 399 BCE death date.
- “The Socratic method” is presented as a family of practices, not one uniform procedure.
- “I know that I know nothing” is identified as a popular paraphrase, not a verbatim sentence from Plato’s *Apology*.
- Statements spoken by Plato’s character are not automatically assigned to the historical Socrates.
- The trial is not reduced to a single hidden political cause. Formal religious and educational charges, older comic prejudice, and recent political trauma are distinguished.
- Later Cynic, Stoic, skeptical, religious, and modern appropriations are described as receptions and transformations, not doctrines Socrates founded.
- The primary Museum interpretation now attributes its source traditions and uses the corrected approximate date.

## Quotations, disputes, and unresolved questions

No unattributed exact quotation is presented as the historical Socrates’ verbatim speech. Quoted language is either identified as a modern slogan or anchored to a primary text and durable locator. SEP and IEP section locators were independently checked against the cited archived/current tables of contents and corrected where earlier labels no longer matched. The historical relation among the Platonic, Xenophontic, Aristophanic, and Aristotelian portraits remains unresolved, as do the exact scope of Socrates’ positive ethical commitments, the unity of his inquiry practices, and the weight of political context in the conviction. The profile records those limits instead of selecting one reconstruction as settled fact.

## Review acceptance and commands

The profile exceeds the universal 2,000-word substantive-prose floor. Every article paragraph and reviewed structured claim has at least one valid citation; evidence and further reading are separated; source metadata and locators pass the deterministic audit; and the stored lock matches the visitor-facing claim set.

Verification commands: `npm run audit:editorial`, `npm run audit:articles:pilots`, `npm run report:editorial`, `npm run report:depth`, `npm run audit:accuracy`, and `npm run build`.
