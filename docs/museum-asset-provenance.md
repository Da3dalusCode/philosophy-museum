# Museum asset provenance

The preserved Museum registry contains **118 provenance records** and **236 committed local WebP derivatives**, with a scene and panel variant for each registered source object. The canonical six contain **59 primary exhibits** and currently reference **64 local media placements**; media is optional across the program, while Gallery 01 intentionally gives all 20 exhibits at least one sourced image. The modern preparation manifest locks 85 post-Ancient records and 170 derivatives; the Gallery 01 Mediterranean manifest locks 17 additional records and 34 derivatives. Sixteen earlier Ancient records retain reviewed typed metadata.

Typed records are assembled in `src/data/museum/museumAssets.ts` from the Ancient records in that file and the preserved modern, expansion, canonical-six, and Krishnamurti sets in `modernMuseumAssets.ts`, `museumExpansionAssets.ts`, `canonicalMuseumAssets.ts`, and `krishnamurtiMuseumAssets.ts`. They preserve titles, creators, object dates, institutions, exact source pages, rights terms, attribution, transformation notices, dimensions, alt text, captions, focal points, and likeness cautions.

Human review establishes provenance and interpretive suitability. The deterministic audit verifies committed records and files without pretending to re-verify remote collection metadata.

## Curatorial and technical policy

- Runtime media is local and Vite-base-aware; the Museum never hotlinks source images.
- Scene derivatives have a maximum dimension of 640 px. Panel derivatives have a maximum dimension of 1280 px and load with the selected exhibit.
- Portraits are labeled as lifetime, posthumous, attributed, copied, imagined, or uncertain. A face never substitutes for historical evidence.
- Where practical, a philosopher exhibit pairs an identity or contextual anchor with a primary text, manuscript, document, or other material witness.
- Public-domain and CC0 sources are preferred. CC BY and CC BY-SA sources remain acceptable when creator, license, attribution, and derivative notice are explicit.
- Downloaded originals are not committed. Exact source pages, selected download URLs, derivative dimensions, byte counts, and hashes for the post-Ancient corpus are locked in the preparation manifest.

## Current canonical-six use

The live roster reuses reviewed legacy media when the same philosopher remains in one of the six permanent halls. It also adds five provenance records needed by the canonical program:

| Live exhibit | Registered source object | Rights / caveat |
| --- | --- | --- |
| Francis Bacon | Paul van Somer I, *Portrait of Francis Bacon*, 1617 | Public-domain painting and reproduction; the collection attribution supersedes an older Pourbus attribution. |
| Alfred North Whitehead | 1923 portrait published in *Splendour of the Heavens* | Photographer unknown; public domain in the United States, with status elsewhere requiring separate jurisdictional review. |
| Martha Nussbaum | Sally Ryan, University of Chicago Law School portrait, 2010 | CC BY-SA 3.0, with creator and derivative attribution retained. |
| Jiddu Krishnamurti | 1920s Bain News Service lifetime photograph | Library of Congress Bain Collection; no known copyright restrictions. The 1920s date follows the reviewed Commons record because the Library of Congress caption card records no date. |
| Jiddu Krishnamurti with Annie Besant | Agence Rol photograph aboard the *Pacific*, March 1927 | Bibliothèque nationale de France, Rol 118226 / EI-13 (1421); public domain in France and the United States. It documents Theosophical formation, not mature allegiance. |

## Gallery 01 · corrected visual-curation source set

Gallery 01 gives every exhibit a reviewed, provenance-backed image. The corrected set favors visually legible works with real interpretive value while labeling later portraits and reception scenes honestly; none is presented as an authenticated ancient likeness.

| Exhibit | Local source object | Essential caveat |
| --- | --- | --- |
| Ancient Greek Philosophy | Modern map of Archaic Greek settlement networks | A schematic geographic orientation, not an ancient map or fixed cultural border. |
| Thales | 1553 portrait from Rouillé’s *Promptuarii Iconum Insigniorum* | A Renaissance conventional portrait, produced roughly two millennia after Thales. |
| Anaximander | Modern reconstruction of the lost world map | Hypothetical reconstruction assembled from later reports, not Anaximander’s drawing. |
| Anaximenes | Later conventional portrait in the Bibliothèque nationale de France | No authenticated likeness survives; the print records later reception. |
| Pythagoras | Raphael’s Pythagoras with ratio tablet | Renaissance reception art and an imagined figure, not a portrait or classroom record. |
| Philolaus | 1492 woodcut of Pythagoras and Philolaus with musical pipes | A Renaissance reception scene, not an ancient experiment or likeness. |
| Parmenides | Figure traditionally identified in Raphael’s *School of Athens* | The identification is conventional and disputed; the figure is imagined. |
| Zeno of Elea | Bernard Picart’s 1699 portrait print | A much later conventional portrait, not an authenticated likeness. |
| Leucippus | Luca Giordano’s 1652–1653 painting | Baroque reception portraiture, not evidence for Leucippus’s appearance. |
| Democritus | Velázquez’s *Democritus* | A Baroque interpretation of the “laughing philosopher” tradition. |
| Heraclitus | Eighteenth-century Venetian bust in the V&A | A later traditional representation, not an ancient portrait. |
| Empedocles | René Boyvin’s sixteenth-century Etna print | Visualizes a legendary death story rather than a documented event. |
| Anaxagoras | Jusepe de Ribera’s 1636 painting | A Baroque imagined philosopher portrait. |
| Protagoras | Jusepe de Ribera’s 1637 painting | A Baroque imagined philosopher portrait, not a likeness made from life. |
| Gorgias | 1818 illustration from *Biografia degli Uomini Illustri della Sicilia* | Records later Sicilian commemoration, not Gorgias’s appearance. |
| Platonism | Roman mosaic conventionally called Plato’s Academy | A later reception image with a conventional identification, not a literal view of the Academy. |
| Aristotelianism | Persian manuscript image of Aristotle teaching | A long afterlife of Aristotle in Persianate visual culture, not his historical classroom. |

The tables below preserve the 96-object Phase 2 registry. They remain useful provenance records even when a former installation is no longer a live primary exhibit.

## Preserved Phase 2 registry · Gallery 01 · Ancient Greek & Hellenistic Philosophy

| Exhibit | Principal anchor | Supporting object | Essential caveat |
| --- | --- | --- | --- |
| Socrates | Louvre Roman head after the Lysippos type | David, *The Death of Socrates* | Both are posthumous; David’s scene is reception art. |
| Plato | Capitoline Roman copy after Silanion | Raphael, *The School of Athens* | The marble is a later copy; the fresco is Renaissance intellectual theater. |
| Aristotle | Palazzo Altemps Roman portrait copy | British Library Papyrus 131 | The bust is copied and restored; authorship of the text by Aristotle personally or his school remains qualified. |
| Cynicism | Gérôme, *Diogenes* | de Crayer, *Alexander and Diogenes* | Both are later receptions of anecdotes, not likeness evidence. |
| Epicureanism | Roman double herm | 1483 Lucretius manuscript | The herm is restored; the manuscript documents Renaissance transmission. |
| Stoicism | Naples bust attributed to Zeno | Louvre Marcus Aurelius bust | Zeno’s identification is comparative rather than inscribed. |
| Skepticism | Riedel’s imagined Sextus engraving | 1569 *Adversus mathematicos* | No authenticated portrait of Sextus survives. |
| Neoplatonism | Ostia head conventionally identified as Plotinus | Ficino-annotated *Enneads* | The head is uncertain; the manuscript is Renaissance, not ancient. |

## Preserved Phase 2 registry · Gallery 02 · Renaissance, Reason, and Revolution

| Philosopher | Principal anchor | Supporting object | Rights / caveat |
| --- | --- | --- | --- |
| Machiavelli | Santi di Tito portrait | 1532 *Il principe* title page | Both are posthumous to Machiavelli; public domain. |
| Descartes | Frans Hals lifetime portrait, 1649 | 1637 *Discours de la méthode* | Public domain. |
| Hobbes | John Michael Wright lifetime portrait | Bosse’s *Leviathan* frontispiece | Portrait reproduction marked public domain; frontispiece CC0. |
| Locke | Godfrey Kneller lifetime portrait | 1690 *Two Treatises* title page | Public domain; the political text was published anonymously. |
| Spinoza | Anonymous portrait traditionally identified as Spinoza | 1677 *Opera Posthuma* | Portrait identification remains qualified; public domain. |
| Hume | Allan Ramsay lifetime portrait | 1739 *Treatise* title page | Public domain; the first edition was anonymous. |
| Rousseau | Maurice Quentin de La Tour lifetime portrait | 1762 *Du contrat social* | Public domain. |
| Kant | Johann Gottlieb Becker lifetime portrait | 1781 *Critique* first-edition title page | Portrait public domain; title-page photograph CC BY-SA 3.0. |

## Preserved Phase 2 registry · Gallery 03 · Modernity, Freedom, and Critique

| Philosopher | Principal anchor | Supporting object | Rights / caveat |
| --- | --- | --- | --- |
| Kierkegaard | Niels Christian Kierkegaard lifetime drawing | *Philosophical Fragments* manuscript | Public domain; pseudonymous publication remains interpretively important. |
| Marx | J. J. E. Mayall lifetime photograph | 1867 *Das Kapital* title page | Public domain; only volume one appeared during Marx’s lifetime. |
| Nietzsche | Gustav-Adolf Schultze lifetime photograph | 1883 *Zarathustra* title page | Public domain; the literary speaker is not a transparent doctrine list. |
| Heidegger | Herbert Wetterauer posthumous portrait | Willy Pragher 1954 lecture photograph | CC BY-SA 3.0 and CC BY 4.0; the display directly acknowledges Heidegger’s Nazism and antisemitic notebooks. |
| Sartre | Anefo 1965 press portrait | Sartre and Beauvoir at the Balzac memorial | CC0 and Commons public-domain determination; Beauvoir remains an independent author. |
| Beauvoir | Fritz Cohen 1967 press photograph | 1924 French suffrage poster | Public domain and CC0; the poster is political context, not an illustration of *The Second Sex*. |
| Camus | UPI 1957 press portrait | 1943 *Combat* issue | U.S./anonymous-work public-domain determinations; *Combat* was collective and Camus rejected the existentialist label. |
| Foucault | 1968 *Diário de Lisboa* photograph | Bentham’s Panopticon plan | Portuguese/public-domain determinations; Foucault treats the Panopticon as a disciplinary diagram, not universal literal architecture. |

## Preserved Phase 2 registry · Gallery 04 · Logic, Language, and Science

| Philosopher | Principal anchor | Supporting object | Rights / caveat |
| --- | --- | --- | --- |
| Peirce | Napoleon Sarony lifetime portrait | MS 145 manuscript page | Portrait public domain; manuscript scan CC BY-SA 2.0 and not a published diagram. |
| Frege | c. 1879 young Frege photograph | 1879 *Begriffsschrift* | Public domain; portrait photographer and exact date remain uncertain. |
| Russell | 1894 lifetime photograph | First page of “On Denoting” | Portrait public-domain determination; document image CC BY-SA 3.0. |
| Dewey | Eva Watson-Schütze 1902 portrait | 1916 *Democracy and Education* title page | Public domain; title page is a material witness, not the complete argument. |
| Carnap | 1895 childhood portrait | Carnap–Reichenbach archival collection | Portrait public domain; archive photograph CC BY-SA 4.0 and is later context, not a Carnap text. |
| Popper | DorianKBandy 1987 portrait | New Zealand alien-registration record | CC BY-SA 4.0 and CC BY-SA 2.0; the state record documents exile, not falsificationism. |
| Quine | 1980 Bluenose II photograph | Later qualitative-sphere diagram | CC BY 4.0 and CC BY-SA 3.0; the diagram is a 2014 interpretation of Quine, not his own drawing. |
| Kuhn | 1977 Princeton blackboard photograph | 1970 second-edition *Structure* cover | Commons public-domain determinations; the text-only cover does not place the copyrighted book text in the public domain. |

## Preserved Phase 2 registry · Gallery 05 · Ethics, Justice, and Political Life

| Philosopher | Principal anchor | Supporting object | Rights / caveat |
| --- | --- | --- | --- |
| Bentham | Henry William Pickersgill lifetime portrait | 1823 *Principles* edition | Public domain; the displayed edition is later than the 1789 publication. |
| Wollstonecraft | John Opie lifetime portrait | 1792 *Vindication* title page | Public domain; the portrait was left unfinished at her death. |
| Mill | London Stereoscopic Company photograph | 1859 *On Liberty* title-page facsimile | Public domain; the displayed scan comes through a later facsimile. |
| Arendt | Anonymous 1933 photograph | Bard College grave | Anonymous/U.S. public-domain determinations and CC BY-SA 4.0; the grave is a memory object, not a primary source. |
| Fanon | Pre-1961 photograph reproduced on a 1967 jacket | 2024 Paris street plaque | Commons U.S.-formalities determination and CC BY-SA 4.0; global status of the unidentified photograph remains qualified. |
| Rawls | Alec Rawls 1971 jacket portrait | *A Theory of Justice* first-edition cover | Commons U.S.-formalities and simple-cover determinations; the underlying book remains copyrighted. |
| Nozick | 1977 *Libertarian Review* portrait | *Anarchy, State, and Utopia* cover | Commons U.S.-notice and text-logo determinations; the cover file’s edition metadata is inconsistent, so no exact edition claim is made. |
| Habermas | Wolfram Huke 2008 discussion photograph | Nikolas Becker 2011 lecture photograph | Both CC BY-SA 3.0; the second records an EU-crisis lecture, not *The Structural Transformation* itself. |

## Preserved Phase 2 registry · Gallery 06 · Mind, Consciousness, and the Self

| Philosopher | Principal anchor | Supporting object | Rights / caveat |
| --- | --- | --- | --- |
| Patañjali | Modern traditional devotional statue | Pre-1900 *Yoga Sūtras* manuscript | CC BY-SA 3.0 and public domain; neither is a historical likeness or autograph, and authorship/dating remain disputed. |
| Vasubandhu | Kōfuku-ji statue by Unkei, c. 1208 | 12th-century Japanese *Abhidharmakośa* handscroll | Later representation with Commons old-photo determination; handscroll CC0 and documents Chinese/Japanese transmission, not an autograph. |
| William James | Notman Studios 1903 photograph | 1890 *Principles of Psychology* title page | Public domain. |
| Husserl | 1910s photograph | Göttingen commemorative plaque | Photograph carries Italian/anonymous and U.S. jurisdiction caveats; plaque photograph CC BY-SA 4.0 and is later commemoration. |
| Merleau-Ponty | Lifetime photograph | Père-Lachaise grave | Portrait CC BY 3.0 with unclear capture metadata; grave photograph CC0 and is not a primary source. |
| Anscombe | 2014 interpretive drawing | 1953 *Philosophical Investigations* cover | Drawing CC BY-SA 3.0 and posthumous; simple cover is shown for Anscombe’s translation context, while the text remains copyrighted. |
| Nagel | 1978 lifetime photograph | 2008 NYU ethics class | CC BY-SA 4.0 and CC BY-SA 3.0; the classroom image is not specifically about the bat argument. |
| Parfit | Anna Riedl 2015 Harvard photograph | Later Repugnant Conclusion diagram | CC BY-SA 4.0 and public-domain dedication; the diagram is later explanatory work, not Parfit-authored. |

## Modern asset lock pipeline

`scripts/prepareMuseumModernAssets.py` reads `scripts/museumModernAssetManifest.json`. The manifest fixes all 85 post-Ancient asset IDs—including the five canonical-six additions—along with their hall folders, exact source pages, original-image URLs, selected download URLs, derivative dimensions, byte counts, and SHA-256 digests.

`scripts/prepareMuseumMediterraneanAssets.py` reads `scripts/museumMediterraneanAssetManifest.json` and applies the same local-only, size-bounded, hashed workflow to the 17 new Gallery 01 sources. This separate lock keeps the bounded curatorial pass auditable without changing the preserved 85-record modern corpus.

The script downloads to a temporary workspace, applies EXIF orientation, resizes without upscaling, writes optimized WebP candidates, and validates both cached and generated files against the lock. `--refresh-locks` is an explicit curatorial operation; ordinary runs verify without silently rewriting the corpus. Ancient derivatives retain their existing reviewed typed records.

## Rights categories represented

- Public Domain Mark 1.0 and collection-specific public-domain determinations
- CC0 1.0 public-domain dedication
- CC BY 4.0
- CC BY-SA 3.0
- Earlier CC BY / CC BY-SA terms used by the Ancient gallery
- Commons public-domain templates for anonymous European works, Portugal, and U.S. press material

Run `npm run audit:museum-assets` to verify that every optional media-reference field across the 59 live exhibits resolves when present, the registry contains 118 records and 236 derivatives, the post-Ancient lock contains 85 records and 170 derivatives, and the Gallery 01 lock contains 17 records and 34 derivatives. The audit also checks local path safety and case, WebP dimensions, rights-kind and license-URL consistency, derivative notices, attribution, alt text, likeness classification, manifest-to-typed-record agreement, byte and SHA-256 locks, runtime hotlink prevention, and unexpected missing or orphaned files. The audit performs no network requests and does not impose a two-object-per-exhibit quota outside Gallery 01.
