# Approved Museum program

## Approved program at a glance

**Worlds with a Questions Forum — Expanded and Culturally Safeguarded** is the approved long-term intellectual program, locked for the Ring pilot. It combines one comparative Core Questions Forum with nine historically or culturally situated wings. The Forum helps visitors ask across traditions; it does not claim that modern academic branches are the source, destination, or universal vocabulary of every tradition.

This is the approved planning program and the authority for the first permanent collection cutover. Its machine-readable intellectual sources are [hall-program.json](./hall-program.json), [branch-assignments.csv](./branch-assignments.csv), and [philosopher-assignments.csv](./philosopher-assignments.csv). The owner-approved implementation order converts the six prototype shells directly to their six permanent successors; it follows final primary assignments and presentation tiers rather than preserving the former 48-exhibit roster.

| Program measure | Exact total |
| --- | ---: |
| Wings | **10** |
| Halls | **26** |
| Rooms / zones | **105** |
| Planned record capacity | **260** |
| Current branch/tradition primary assignments | **43** |
| Current philosopher primary assignments | **144** |
| Total current primary assignments | **187** |
| Unallocated record capacity | **73** |

Here, **record capacity** means the number of Atlas records a room is planned to interpret at the appropriate presentation tier. It is not visitor occupancy, floor area, or the number of freestanding objects. A shared cluster may use less physical area than an anchor exhibit even though both records count toward assignment coverage.

## The assignment contract

Every current record receives exactly one primary physical home with five explicit fields: wing, hall, room or zone, presentation tier, and concise rationale. Existing stable record IDs—not display-name matching—connect the program to the Atlas data. The two CSV manifests are the complete inventory; the prose below explains the system rather than replacing those files.

Primary placement answers: **Where can this record be interpreted most responsibly and completely?** It does not answer every place the record matters. A philosopher's formative setting, institutional lineage, self-identification, and decisive contribution all matter. Historical/cultural placement takes priority when a purely thematic placement would detach an idea from the practices, texts, languages, or debates that made it intelligible. Contribution-first placement is used for modern specialists when it is the clearer account.

Umbrella records do not swallow the specific schools under them. “Ancient Greek Philosophy,” “Indian Philosophy,” “Chinese Philosophy,” and “Continental Philosophy” are supporting orientation exhibits, while Platonism, Jainism, Confucianism, Daoism, and other specific traditions retain their own anchor roles. Modern academic fields such as metaphysics, epistemology, logic, mind, science, aesthetics, and religion have primary homes in the Forum, but the Forum's displays must point back to historical traditions rather than imply that those fields invented the questions.

Disputed membership is displayed as disputed. “Precursor,” “influence,” “later reception,” “retrospective family,” and “rejected label” are distinct interpretive statuses. A primary placement therefore must not be read as an unqualified claim of school membership.

Placements for living and recently deceased thinkers remain curatorial judgments, not declarations that reception history has closed. They should be revisited when the Atlas record, scholarship, or surrounding collection changes, while retaining stable IDs and a documented migration rather than silent relabeling.

### Presentation tiers

Tier expresses exhibit treatment, not philosophical worth. It prevents “complete coverage” from becoming 187 equally large monuments.

| Tier | Branches | Philosophers | Total | Intended physical treatment |
| --- | ---: | ---: | ---: | --- |
| Anchor exhibit | 37 | 54 | **91** | A major interpretive installation for a field, tradition, system, or thinker central to the room's argument |
| Standard individual exhibit | 0 | 81 | **81** | A self-contained philosopher exhibit with context, contribution, works, and relationships |
| Supporting exhibit | 4 | 5 | **9** | A compact but named exhibit that supports orientation, lineage, or transition |
| Thematic cluster participant | 2 | 3 | **5** | A clearly identified record within a shared installation where separation would misstate the evidence or overstate certainty |
| Gallery archive or study-wall record | 0 | 1 | **1** | A visible, searchable record with a defensible home but without a full installation at current depth |
| **Total** | **43** | **144** | **187** | Complete current inventory |

The lower-footprint assignments are deliberate and reviewable. The four supporting umbrella branches are Ancient Greek Philosophy, Indian Philosophy, Chinese Philosophy, and Continental Philosophy. The five thematic-cluster participants are Legalism, Buddhist Epistemology, Laozi, Pseudo-Dionysius, and Patañjali. Leucippus is the sole study-wall record. These assignments can be promoted later if source depth grows; their present tier never erases their primary home.

Tier balance is an operational review, not only a disclaimer. The final scholarship review promoted Zhuangzi, Zhu Xi, Śaṅkara, and Dignāga to anchor scale so the current East Asian, South Asian, and Buddhist rooms do not rely only on umbrella or branch anchors. Before a hall opens, reviewers must compare anchor floor area, sightline prominence, media budget, and named route visibility across wings. No wing may launch without at least two philosopher-scale landmarks or equivalent multi-voice installations, and living status alone never justifies anchor treatment.

### Secondary associations

Of the 187 records, 164 have at least one secondary hall association, producing 299 resolved **hall-route candidates**. Twenty-three have no secondary hall because a forced link would add noise rather than insight. A secondary association may produce:

- a linked comparison or reception panel;
- a “continue this question” wayfinding route;
- a study-wall reference or map edge;
- a compact account of influence, criticism, transformation, or later use.

It must not produce a second full primary installation, silently change a disputed membership, or detach a quotation from its original exhibit context. The primary exhibit owns the full biography, historical setting, and core interpretation; the secondary appearance states why the record matters **here** and points back to that home.

The semicolon-separated CSV fields establish destination coverage, not final interpretive semantics. Before any candidate becomes a live appearance, a secondary-association manifest must add a room-level destination, a relation type (`comparison`, `reception`, `transmission`, `criticism`, `later-use`, or `continuation`), and a one-sentence scholarly rationale. This is an implementation gate: bare adjacency must never be rendered as influence or school membership.

## Coverage and reserve by wing

The table below reconciles the 187 current primary assignments with the 260-slot program. “Reserve” is capacity not currently occupied by a primary assignment; it may still support orientation and secondary interpretation before new records are added.

| Wing | Halls | Rooms | Capacity | Current branches | Current philosophers | Current total | Reserve |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Core Questions Forum | 1 | 9 | 25 | 9 | 6 | 15 | 10 |
| Mediterranean Antiquity | 3 | 11 | 61 | 8 | 41 | 49 | 12 |
| South Asian Intellectual Worlds | 1 | 5 | 14 | 3 | 6 | 9 | 5 |
| Buddhist Traditions Across Asia | 1 | 5 | 13 | 2 | 5 | 7 | 6 |
| Chinese & East Asian Intellectual Worlds | 2 | 7 | 23 | 5 | 9 | 14 | 9 |
| Connected Medieval & Post-Classical Intellectual Worlds | 3 | 11 | 33 | 2 | 20 | 22 | 11 |
| Early Modern Europe & Enlightenments | 4 | 14 | 23 | 2 | 16 | 18 | 5 |
| Nineteenth-Century Transformations | 3 | 11 | 15 | 1 | 9 | 10 | 5 |
| Modern Philosophical Traditions | 4 | 18 | 28 | 5 | 19 | 24 | 4 |
| Ethics, Politics, and Social Thought | 4 | 14 | 25 | 6 | 13 | 19 | 6 |
| **Total** | **26** | **105** | **260** | **43** | **144** | **187** | **73** |

## Wing and hall program

Room lists below follow the intended interpretive sequence. The number in parentheses is exact record capacity from `hall-program.json`. “Assigned” at hall level counts current primary records, not secondary appearances.

### 1. Core Questions Forum

**Program (`wing-core-questions`):** 1 hall, 9 rooms, capacity 25; 15 current assignments, 10 reserve slots.

This is the shared orientation and comparison hub. Its branch anchors provide a vocabulary for finding questions throughout the building, while its philosopher exhibits—Whitehead, Nagel, Krishnamurti, Carnap, Popper, and Kuhn—show that modern fields also have histories and disagreements. Krishnamurti’s Mind & Self placement is comparative: his South Asian secondary route and Philosophy of Religion comparison are explicit, and neither is an inherited-school membership. Ethics and Political Life are portals to full halls in another wing, not substitutes for them.

The Forum roster remains weighted toward modern European and North American field formation even after adding an Indian-born independent thinker, so its first impression must not be the primary roster alone. Every Forum room must stage at least two named historical or cultural lenses, including at least one outside modern European/North American traditions where scholarship supports it; the Forum as a whole must visibly route to every cultural-historical wing. Aristotle, Patañjali, Kaṇāda, Nāgārjuna, Dignāga, Dharmakīrti, Confucian and Daoist materials, and Islamic and Jewish thinkers are required named presences, not optional map links.

#### Core Questions Forum

`core-questions-forum` · crossroads template · 9 rooms · capacity 25 · 15 assigned · 10 reserve

Rooms: Reality & Being (4); Knowledge (2); Mind & Self (3); Logic & Language (3); Science (5); Ethics portal (2); Political Life portal (2); Aesthetics (2); Philosophy of Religion (2).

### 2. Mediterranean Antiquity

**Program (`wing-mediterranean-antiquity`):** 3 halls, 11 rooms, capacity 61; 49 current assignments, 12 reserve slots.

The wing separates archaic/classical formations, Hellenistic and Roman ways of life, and late-antique transformations. It does not present Greece as the universal beginning of philosophy. Instead, it gives this particular Mediterranean history enough internal sequence to distinguish schools, institutions, genres, and later receptions.

#### Mediterranean Beginnings & Classical Athens

`mediterranean-beginnings-classical` · sequential template · 4 rooms · capacity 26 · 22 assigned · 4 reserve

Rooms: Orientation, Ionia, and natural explanation (5); Number, being, change, plurality, and atomism (10); Sophists, civic speech, and Socratic inquiry (6); Plato, Aristotle, Academy, and Lyceum (5).

#### Hellenistic & Roman Ways of Life

`hellenistic-roman-ways` · crossroads template · 4 rooms · capacity 22 · 18 assigned · 4 reserve

Rooms: Cynic challenge (4); Epicurean Garden and Roman transmission (4); Early system and Roman Stoa (8); Academic and Pyrrhonian skeptical lineages (6).

#### Late Antiquity & Neoplatonic Inheritance

`late-antiquity-inheritance` · sequential template · 3 rooms · capacity 13 · 9 assigned · 4 reserve

Rooms: Plotinus and later pagan Platonisms (6); Christian transformations of Platonism (5); Commentary, translation, and transmission (2).

### 3. South Asian Intellectual Worlds

**Program (`wing-south-asian-worlds`):** 1 hall, 5 rooms, capacity 14; 9 current assignments, 5 reserve slots.

This wing provides a cultural-historical primary setting for the current Jain, Yoga, realist/category, and Vedānta materials. The orientation explicitly says “many schools” and “missing traditions,” preventing six philosophers and three branch records from standing in for the breadth of South Asian philosophy.

#### Classical South Asia: Jain, Yoga, and Brahmanical Systems

`classical-south-asian-worlds` · sequential template · 5 rooms · capacity 14 · 9 assigned · 5 reserve

Rooms: Many schools, shared questions, and missing traditions (2); Jain worlds: soul, karma, nonviolence, and knowing (3); Categories, atoms, and realist debate (2); Yoga, mind, discipline, and liberation (2); Vedānta: rival readings of self, world, and Brahman (5).

### 4. Buddhist Traditions Across Asia

**Program (`wing-buddhist-worlds`):** 1 hall, 5 rooms, capacity 13; 7 current assignments, 6 reserve slots.

Buddhist philosophy receives a distinct transregional wing rather than becoming a subset of “Indian Philosophy” or a detachable answer in Epistemology. The sequence moves from plural paths and early discourses through Madhyamaka, Abhidharma/Yogacara, and pramāṇa, then holds room for translation and transformation across Asia.

#### Buddhist Philosophies of Liberation and Knowledge

`buddhist-philosophies` · sequential template · 5 rooms · capacity 13 · 7 assigned · 6 reserve

Rooms: Many Buddhist paths and early discourses (3); Madhyamaka: emptiness and dependence (2); Abhidharma to Yogacara (2); Pramāṇa, perception, inference, and language (4); Translation and transformation across Asia (2).

### 5. Chinese & East Asian Intellectual Worlds

**Program (`wing-east-asian-worlds`):** 2 halls, 7 rooms, capacity 23; 14 current assignments, 9 reserve slots.

The first hall preserves the argumentative plurality of early China; the second prevents the story from stopping at the Warring States. “Legalism” is treated as a retrospective label for fa and statecraft currents and receives a bay distinct from Mohism even though the two are placed in one debate room. Adjacency means argument, not membership. Laozi is presented with textual-attribution uncertainty. Reserved rooms name the regional coverage the current dataset does not yet supply.

#### Warring States & Classical Chinese Traditions

`classical-chinese-traditions` · crossroads template · 4 rooms · capacity 16 · 12 assigned · 4 reserve

Rooms: Many ways in early China (2); Ritual, humaneness, cultivation, and human nature (5); Daodejing, Zhuangzi, and the Way (4); Mohist debate and fa/statecraft currents (5).

#### Confucian Renewal & East Asian Continuities

`east-asian-continuities` · sequential template · 3 rooms · capacity 7 · 2 assigned · 5 reserve

Rooms: Song-Ming Confucian reconstructions (3); Buddhist translation, Daoist institutions, and the Three Teachings (2); Korea, Japan, Vietnam, and modern continuities (2).

### 6. Connected Medieval & Post-Classical Intellectual Worlds

**Program (`wing-medieval-connected-worlds`):** 3 halls, 11 rooms, capacity 33; 22 current assignments, 11 reserve slots.

“Connected” describes translation, commentary, travel, institutions, debate, and reception; it does not merge three traditions. Arabic/Islamic, Jewish, and Latin Christian materials retain separate halls and internal sequences. The arrangement makes their exchanges visible without reducing Arabic and Islamic philosophy to a transmission service for Europe.

#### Arabic & Islamic Philosophical Worlds

`islamic-philosophical-worlds` · sequential template · 5 rooms · capacity 14 · 9 assigned · 5 reserve

Rooms: Translation-era falsafa and classification of knowledge (4); Avicennian system: being, soul, logic, and science (2); Kalām, critique, and philosophical appropriation (2); Al-Andalus: philosophy, law, medicine, and commentary (3); Illumination and post-Avicennian Safavid continuities (3).

#### Jewish Philosophy in Arabic-Speaking & Mediterranean Worlds

`jewish-philosophy` · standard rectangular template · 2 rooms · capacity 5 · 3 assigned · 2 reserve

Rooms: Jewish kalām, poetry, law, reason, and revelation (3); Maimonides: law, negative theology, and Aristotelian argument (2).

The hall is justified by the philosopher records and their intellectual setting even though the current branch inventory has no stable Jewish Philosophy branch ID. The program must not invent a balancing branch record merely to make the counts look symmetrical.

Spinoza receives a formation-and-rupture threshold here while retaining a Rationalism primary home. The current two-room roster must not imply that Jewish philosophy ends with Maimonides: early-modern and later Jewish philosophy is a named expansion trigger for this hall or an adjoining continuation room.

#### Latin Christian & Scholastic Traditions

`latin-christian-scholastic` · sequential template · 4 rooms · capacity 14 · 10 assigned · 4 reserve

Rooms: Late-antique transmission and Carolingian reception (3); Monastic reason, dialectic, and early scholastic practice (4); High university synthesis and contest (2); Late scholastic alternatives, mysticism, and political conflict (5).

### 7. Early Modern Europe & Enlightenments

**Program (`wing-early-modern-enlightenment`):** 4 halls, 14 rooms, capacity 23; 18 current assignments, 5 reserve slots.

Four halls replace a single “reason and revolution” story with distinguishable routes through political order and new inquiry, rationalist systems, empiricist arguments, and plural Enlightenment conflicts. The final hall presents Kant as a late-Enlightenment threshold, with German Idealism as a successor route rather than an anachronistic primary membership.

#### Renaissance, Political Order, and New Science

`renaissance-humanism-new-method` · sequential template · 3 rooms · capacity 6 · 3 assigned · 3 reserve

Rooms: Civic power and statecraft (2); Experiment, method, and organized inquiry (2); Sovereignty, covenant, and materialism (2).

#### Rationalism: Mind, Nature, and System

`rationalism-mind-nature-system` · sequential template · 3 rooms · capacity 7 · 5 assigned · 2 reserve

Rooms: Cartesian foundations and dualism (3); Substance, vitality, God/Nature, and freedom (3); Monads, sufficient reason, and possible worlds (1).

#### Empiricism, Science, and Political Order

`empiricism-science-political-order` · sequential template · 3 rooms · capacity 4 · 4 assigned · no reserve

Rooms: Ideas, experience, identity, and rights (2); Perception and immaterialism (1); Causation, habit, sentiment, and mitigated skepticism (1).

#### Enlightenment, Revolution, and Kant’s Critical Turn

`enlightenment-revolution-kant` · crossroads template · 5 rooms · capacity 6 · 6 assigned · no reserve

Rooms: Law and comparative institutions (1); Inequality, civic freedom, and education (1); Moral sentiments and commercial society (1); Education, gender, and excluded universalism (2); Kant: critical philosophy as threshold (1).

### 8. Nineteenth-Century Transformations

**Program (`wing-nineteenth-transformations`):** 3 halls, 11 rooms, capacity 15; 10 current assignments, 5 reserve slots.

The wing makes three simultaneous transformations legible: post-Kantian system building; arguments about utility, liberty, history, labor, and capital; and challenges organized around faith, suffering, life, and value. It avoids treating all nineteenth-century thought as a single march toward one twentieth-century school.

#### German Idealism & Romantic Afterlives

`german-idealism-afterlives` · sequential template · 4 rooms · capacity 7 · 4 assigned · 3 reserve

Rooms: Post-Kantian self, activity, and freedom (3); Nature, identity, art, and freedom (1); History, recognition, social freedom, and system (1); Divergent receptions and later arguments (2).

#### Utility, Liberty, History, and Capital

`utility-liberty-history-capital` · sequential template · 4 rooms · capacity 5 · 3 assigned · 2 reserve

Rooms: Utility, law, reform, and individuality (2); Liberty, equality, and experiments in living (1); Labor, capital, class, and historical critique (1); Political economy and social transformations (1).

#### Faith, Pessimism, Life, and Value

`faith-pessimism-life-value` · sequential template · 3 rooms · capacity 3 · 3 assigned · no reserve

Rooms: Will, representation, suffering, and reception (1); Faith, subjectivity, anxiety, and becoming a self (1); Genealogy, nihilism, life, and value creation (1).

### 9. Modern Philosophical Traditions

**Program (`wing-modern-traditions`):** 4 halls, 18 rooms, capacity 28; 24 current assignments, 4 reserve slots.

This is the tightest wing. It gives pragmatist, analytic, phenomenological/existential, and critical/deconstructive traditions internal room sequences rather than flattening them into “modern philosophy.” Family labels remain historical claims to be explained: Continental Philosophy is explicitly a retrospective orientation term, while Existentialism distinguishes members, precursors, influences, and people who rejected the label.

#### Pragmatism, Science, and Democratic Inquiry

`pragmatism-democratic-inquiry` · sequential template · 4 rooms · capacity 6 · 4 assigned · 2 reserve

Rooms: Peirce: signs, fallibilism, and public inquiry (2); James: experience, belief, and pluralism (1); Dewey: inquiry, education, and experimental democracy (1); Later pragmatist continuities and omissions (2).

#### Analytic Traditions: Logic, Language, and Analysis

`analytic-traditions` · sequential template · 5 rooms · capacity 7 · 7 assigned · no reserve

Rooms: Origins in logic, analysis, and reference (3); Common sense, realism, and metaethics (1); Wittgenstein: logical form, use, and therapy (1); Holism, naturalism, and ontology (1); Action, intention, and ordinary language (1).

#### Phenomenology, Existence, and Embodiment

`phenomenology-existence-embodiment` · sequential template · 5 rooms · capacity 10 · 9 assigned · 1 reserve

Rooms: Intentionality, reduction, and lifeworld (2); Being-in-the-world, perception, and embodiment (2); Existentialism: freedom, facticity, and bad faith (2); Situated freedom, ambiguity, the absurd, and revolt (2); Interpretation, tradition, alterity, and responsibility (2).

#### Critique, Power, and Deconstruction

`critique-power-deconstruction` · crossroads template · 4 rooms · capacity 5 · 4 assigned · 1 reserve

Rooms: Continental philosophy as a retrospective family (2); Archaeology, genealogy, institutions, and subject formation (1); Writing, difference, institution, and justice (1); Critical Theory, public sphere, and communicative reason (1).

### 10. Ethics, Politics, and Social Thought

**Program (`wing-ethics-politics-society`):** 4 halls, 14 rooms, capacity 25; 19 current assignments, 6 reserve slots.

This wing gives practical and social questions enough space not to become appendices to intellectual history. Its four halls distinguish moral reasoning, political authority and justice, feminist genealogies, and colonialism/race/liberation while connecting them heavily. Beauvoir’s approved primary is in Feminist Philosophies; historical primaries such as Aristotle, Kant, Mill, and Foucault can have major secondary presences elsewhere in the wing without being physically duplicated.

#### Moral Life & Practical Reason

`moral-life-practical-reason` · crossroads template · 4 rooms · capacity 9 · 8 assigned · 1 reserve

Rooms: Ethics: reasons, relationships, practices, and ways of living (2); Character, flourishing, attention, and virtue revival (3); Duty, respect, consequences, and welfare (2); Rights, persons, hard cases, and future generations (2).

#### Political Action, Justice, and Democratic Reason

`justice-democratic-reason` · sequential template · 3 rooms · capacity 6 · 5 assigned · 1 reserve

Rooms: Political philosophy, authority, and public action (3); Justice, distribution, rights, and the state (2); Capabilities, dignity, democracy, and public reason (1).

#### Feminist Philosophies

`feminist-philosophies` · crossroads template · 4 rooms · capacity 5 · 3 assigned · 2 reserve

Rooms: Feminist philosophy and plural genealogies (2); Early-modern education, marriage, virtue, and citizenship (1); Situated freedom, embodiment, and otherness (1); Gender, norms, performativity, and social ontology (1).

#### Colonialism, Race, and Liberation

`colonialism-race-liberation` · sequential template · 3 rooms · capacity 5 · 3 assigned · 2 reserve

Rooms: Colonial embodiment, violence, psychiatry, and liberation (1); Black feminism, abolition, education, culture, and love (2); Anticolonial, postcolonial, Africana, and decolonial continuities (2).

## How difficult placements work

These examples show the primary/secondary rule in practice. They are not the complete controversy inventory; the CSVs retain 31 explicit controversy notes.

| Record | Primary home | Major secondary route(s) | Interpretive rule |
| --- | --- | --- | --- |
| Aristotle | Mediterranean Beginnings & Classical Athens | Forum; Arabic/Islamic, Jewish, Latin Christian, Justice, and Moral Life halls | Ancient primary; later receptions and field influence are strong but not cloned anchors |
| Kant | Enlightenment, Revolution, and Kant's Critical Turn | Forum; German Idealism; Justice; Moral Life | Late-Enlightenment primary; German Idealism is a successor route because Kant is a precursor, not simply a member |
| Wittgenstein | Analytic Traditions | Forum; Moral Life | One analytic home covers early logical and later use-oriented phases; logic, language, mind, and ethics are lenses |
| Buddhist Epistemology | Buddhist Philosophies | Core Questions Forum | A modern umbrella for pramāṇa lineages; cultural-historical primary, Knowledge/Logic comparison secondary |
| Islamic Philosophy | Arabic & Islamic Philosophical Worlds | Forum; Jewish Philosophy; Latin Christian Scholasticism | A distinct intellectual-world primary avoids reducing it to medieval transmission into Europe |
| Simone de Beauvoir | Feminist Philosophies | Phenomenology, Existence, and Embodiment | Feminist primary recognizes her independent reorganization of freedom, embodiment, oppression, and becoming; PEE retains an anchor-strength existential and phenomenological secondary |
| Albert Camus | Phenomenology, Existence, and Embodiment | Justice and Democratic Reason; Colonialism, Race, and Liberation | Placed beside existentialism while clearly marked as rejecting the label; absurdity and revolt lead the account, while the colonial route stages his Algerian/French settler position and a critical Fanon counterpoint |
| Michel Foucault | Critique, Power, and Deconstruction | Colonialism/Race/Liberation; Feminist Philosophies; Justice | Genealogy and subject formation organize the primary; political and social receptions stay substantial |
| Elizabeth Anscombe | Analytic Traditions | Forum; Moral Life | Contribution-first Action/Intention primary; ethics and virtue revival remain major secondary readings |
| Mulla Sadra | Arabic & Islamic Philosophical Worlds | Forum; Rationalism | Seventeenth-century Safavid continuation in an Islamic intellectual world, not a falsely “medieval” placement |

## Cultural and historical safeguards

The program is culturally safeguarded only if these are treated as implementation requirements:

1. **Plural worlds are porous, not sealed.** Thresholds must show translation, travel, institutional change, argument, borrowing, criticism, and transformation. Wing boundaries organize a visit; they do not claim civilizational purity.
2. **The Forum is comparative, not universalizing.** Modern branch labels are navigation aids. Historical exhibits must retain their own vocabularies, aims, genres, and practices.
3. **Mediterranean antiquity is one beginning among several.** It may open a chronological route, but it must not be labeled the origin of philosophy as such.
4. **South Asian and Buddhist materials are related but not collapsed.** Buddhism's South Asian formation and transregional transformations both remain visible. Jain, Yoga, realist, and Vedānta arguments receive their own contexts.
5. **Chinese traditions retain contested names and later lives.** “Legalism” is marked retrospective; Laozi is an attributed textual persona rather than a securely dated biography; the story continues beyond the Warring States.
6. **Arabic/Islamic, Jewish, and Latin Christian halls are connected equals.** Islamic philosophy is not a relay station from Greece to Europe, Jewish philosophy is not a sidebar to either neighbor, and scholasticism is identified as a practice and institutional culture rather than a synonym for all medieval thought. Mulla Sadra's post-Avicennian room must visibly say “Safavid continuities” so a seventeenth-century thinker is not absorbed into a generic medieval period.
7. **Chronological uncertainty is visible.** The Buddha receives an approximate historical frame; Mahāvīra is not called the inventor of Jain teaching; Kaṇāda and Patañjali are presented through attribution/floruit uncertainty rather than false exact lifetimes.
8. **Retrospective families and rejected labels stay qualified.** Continental philosophy, existentialism, decolonial continuities, and other broad program terms are not silently treated as self-identified schools.
9. **Feminist and anticolonial routes are not late add-ons.** The feminist genealogy begins before 1792 because the current collection includes Mary Astell; Beauvoir’s Feminist Philosophies primary and anchor-strength PEE secondary are both prominent; Foucault’s and other secondary presences remain substantial; Fanon’s primary is anticolonial/Fanonian without asserting membership in every later coloniality school.
10. **The current dataset is a scope boundary, not a canon.** Empty reserve rooms name omissions openly instead of making the present inventory look complete.

## Reserved contexts, collection gaps, and capacity pressure

The 73-slot reserve consists of 21 slots in 12 rooms with no current primary assignment and 52 open slots within partly assigned rooms. “No primary assignment” does not mean an empty gallery: portals, timelines, secondary appearances, maps, and context installations may occupy it before the Atlas gains new primary records.

| Wing | Room with no current primary assignment | Capacity |
| --- | --- | ---: |
| Core Questions Forum | Ethics portal | 2 |
| Core Questions Forum | Political Life portal | 2 |
| Mediterranean Antiquity | Commentary, translation, and transmission | 2 |
| Buddhist Traditions Across Asia | Translation and transformation across Asia | 2 |
| Chinese & East Asian Intellectual Worlds | Buddhist translation, Daoist institutions, and the Three Teachings | 2 |
| Chinese & East Asian Intellectual Worlds | Korea, Japan, Vietnam, and modern continuities | 2 |
| Nineteenth-Century Transformations | Divergent receptions and later arguments | 2 |
| Nineteenth-Century Transformations | Liberty, equality, and experiments in living | 1 |
| Nineteenth-Century Transformations | Political economy and social transformations | 1 |
| Modern Philosophical Traditions | Later pragmatist continuities and omissions | 2 |
| Ethics, Politics, and Social Thought | Early-modern education, marriage, virtue, and citizenship | 1 |
| Ethics, Politics, and Social Thought | Anticolonial, postcolonial, Africana, and decolonial continuities | 2 |
| **Total** | **12 rooms** | **21** |

Named reserve contexts should guide research without predetermining new records. The present Atlas remains especially thin in South Asian schools beyond the current Jain, Yoga, category/realist, and Vedānta materials; Buddhist transmission beyond its present classical Indian-centered roster; Korean, Japanese, Vietnamese, and modern East Asian continuities; early-modern and later Jewish philosophy; later pragmatisms; feminist genealogies between the early-modern and contemporary anchors; and broader anticolonial, postcolonial, Africana, Indigenous, Latin American, and decolonial histories. These are not interchangeable “global” gaps. Each requires its own specialist review, sources, and—where necessary—new hall capacity.

Four halls are already at their planned primary-record capacity: Empiricism, Enlightenment, Faith/Pessimism/Life/Value, and Analytic Traditions. A new record in one of those narratives should trigger a local capacity review, not automatic demotion of an existing exhibit or misuse of an unrelated reserve room. Phenomenology/Existence/Embodiment now has one unassigned primary-record slot, but Beauvoir’s required anchor-strength secondary creates real presentation pressure there. Modern Philosophical Traditions has four reserve slots overall and remains the clearest early expansion pressure at 24 of 28 assigned slots (85.7%).

## Locked program conditions

This approved program governs the Ring pilot under all of the following conditions:

- one primary assignment for each of the 43 branch IDs and 144 philosopher IDs;
- capacity is treated as record-planning capacity rather than visitor or architectural occupancy;
- secondary associations remain links and interpretive appearances, not duplicate homes;
- cultural safeguards are carried into labels, thresholds, sightlines, and map routes;
- reserve contexts remain visibly provisional until supported by researched Atlas records;
- a full hall can expand rather than forcing future material into a misleading category.

The program establishes what the eventual Museum must be capable of housing and the intellectual rules the approved Ring geometry and staged migration must preserve. The first permanent cutover opens the Core Questions Forum and five other permanent halls; it does not claim that the remaining twenty planned halls are already built.
