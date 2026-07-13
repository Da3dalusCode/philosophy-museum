# Museum asset provenance

The three active galleries contain twenty-four interpreted exhibits and forty-eight curated source objects. Every object has a local scene WebP and a larger interpretation-panel WebP, producing ninety-six committed derivatives. Typed records in `src/data/museum/museumAssets.ts` and `src/data/museum/modernMuseumAssets.ts` preserve titles, creators, object dates, institutions, exact source pages, rights terms, attribution, transformation notices, dimensions, alt text, captions, focal points, and likeness cautions.

Human review establishes provenance and interpretive suitability. The deterministic audit verifies committed records and files without pretending to re-verify remote collection metadata.

## Curatorial and technical policy

- Runtime media is local and Vite-base-aware; the Museum never hotlinks source images.
- Scene derivatives have a maximum dimension of 640 px. Panel derivatives have a maximum dimension of 1280 px and load with the selected exhibit.
- Portraits are labeled as lifetime, posthumous, attributed, copied, imagined, or uncertain. A face never substitutes for historical evidence.
- Each philosopher pairs an identity or contextual anchor with a primary text, manuscript, document, or other material witness where practical.
- Public-domain and CC0 sources are preferred. CC BY and CC BY-SA sources remain acceptable when creator, license, attribution, and derivative notice are explicit.
- Downloaded originals are not committed. Exact Commons file pages and selected download URLs are locked in the preparation manifest.

## Gallery 01 · Ancient Greek & Hellenistic Philosophy

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

## Gallery 02 · Renaissance, Reason, and Revolution

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

## Gallery 03 · Modernity, Freedom, and Critique

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

## Modern asset lock pipeline

`scripts/prepareMuseumModernAssets.py` reads `scripts/museumModernAssetManifest.json`. The manifest fixes every Gallery 02–03 asset ID, hall folder, exact Commons file page, original-image URL, selected thumbnail URL, derivative dimensions, byte counts, and SHA-256 digests.

The script downloads to a temporary workspace, applies EXIF orientation, resizes without upscaling, writes optimized WebP candidates, and validates both cached and generated files against the lock. `--refresh-locks` is an explicit curatorial operation; ordinary runs verify without silently rewriting the corpus. Ancient derivatives retain their existing reviewed typed records.

## Rights categories represented

- Public Domain Mark 1.0 and collection-specific public-domain determinations
- CC0 1.0 public-domain dedication
- CC BY 4.0
- CC BY-SA 3.0
- Earlier CC BY / CC BY-SA terms used by the Ancient gallery
- Commons public-domain templates for anonymous European works, Portugal, and U.S. press material

Run `npm run audit:museum-assets` to verify exact two-object coverage per exhibit, hall ownership, local path safety and case, WebP dimensions, rights-kind and license-URL consistency, derivative notices, attribution, alt text, likeness classification, manifest/typed-record agreement, all modern byte and SHA-256 locks, and the absence of retired or orphaned files. The audit performs no network requests.
