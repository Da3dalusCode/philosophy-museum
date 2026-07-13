# Museum asset pilot provenance

The Ancient Greek and Hellenistic Gallery pilot uses 16 locally committed derivatives: one principal cultural anchor and one supporting object for each of the eight exhibits. The typed records in `src/data/museum/museumAssets.ts` are the authoritative source for captions, exact source and institution links, rights, attribution, alt text, dimensions, and historical-likeness cautions. This document records the curatorial policy and gives reviewers a compact ledger without duplicating every field.

## Curatorial policy

- Runtime media is local and base-aware; the application never hotlinks source images.
- Scene derivatives have a maximum dimension of 640 px. Panel derivatives have a maximum dimension of 1280 px and load only with the selected exhibit.
- Principal philosopher anchors are ancient portraits or ancient copies where defensible. Every caption distinguishes an original, copy, attribution, later traditional image, or uncertain identification.
- Branch installations pair identity or reception media with a text, transmission artifact, or contextual object. No branch is presented as merely one person’s portrait.
- Public-domain and CC0 works are preferred. The pilot also includes CC BY and CC BY-SA photographs where the exact creator, license, and attribution are recorded.
- Optimized WebP derivatives were created from the exact Commons media files linked by the typed records. Downloaded originals are not committed.

## Pilot ledger

| Exhibit | Principal scene anchor | Supporting object | Rights category | Essential caveat |
| --- | --- | --- | --- | --- |
| Socrates | Louvre Roman portrait head after the Lysippos type | David, *The Death of Socrates* | CC BY-SA 2.5; public domain | The head is posthumous; David’s scene is reception art, not eyewitness evidence. |
| Plato | Capitoline Roman copy after Silanion | Raphael, *The School of Athens* | CC BY 2.5; public domain | Both the portrait type and Renaissance fresco are later representations. |
| Aristotle | Palazzo Altemps Roman portrait copy | British Library Papyrus 131, *Constitution of the Athenians* | PD-self; public domain | The bust is a copy with a modern mantle; authorship of the text by Aristotle personally or his school remains qualified. |
| Cynicism | Gérôme, *Diogenes* | de Crayer, *Alexander and Diogenes* | CC0; public domain | Both paintings are later receptions of Cynic anecdotes, not likeness evidence. |
| Epicureanism | Roman double herm of Epicurus and Metrodorus | 1483 manuscript of Lucretius, *De rerum natura* | CC BY-SA 2.5; public domain | The herm is a restored Roman copy; the manuscript is Renaissance transmission. |
| Stoicism | Naples bust attributed to Zeno of Citium | Antonine portrait bust of Marcus Aurelius | CC BY 2.0; PD-self | Zeno’s identification is comparative rather than inscribed; the Marcus bust’s current ownership is not established by its Commons record. |
| Skepticism | Riedel’s 1801 imagined Sextus engraving | 1569 *Adversus mathematicos* title page | public domain | No authenticated portrait of Sextus survives; the printed book is later transmission. |
| Neoplatonism | Ostia head conventionally identified as Plotinus | Ficino-annotated 1460 *Enneads* manuscript | CC BY 3.0; public domain | The head’s identification is plausible but unproven; the manuscript is Renaissance, not ancient. |

## License categories

- Creative Commons Attribution 2.0, 2.5, and 3.0
- Creative Commons Attribution-ShareAlike 2.5
- Creative Commons CC0 1.0
- Public Domain Mark 1.0 / faithful public-domain reproductions
- Commons photographer public-domain dedication (`PD-self`)

## Deliberately rejected or demoted candidates

- `Zeno of Citium.jpg`: low resolution, imaginative, and currently categorized under Zeno of Elea.
- `Sextus.jpg`: weak creator and scan provenance and the same misleading medal-derived portrait tradition.
- `Plotinos.jpg`: low resolution and awkward provenance compared with the selected Ostia photograph.
- Raphael “Hypatia” crops and an unidentified Fayum portrait: neither securely represents Hypatia and neither is necessary for this eight-exhibit pilot.
- Downloaded originals: omitted from Git because the optimized local derivatives are sufficient for the scene and interpretation panel.

Run `npm run audit:museum-assets` to verify catalog coverage, local path safety and exact casing, image dimensions, file sizes, rights fields, attribution, alt text, likeness classification, focal points, and orphaned asset references.
