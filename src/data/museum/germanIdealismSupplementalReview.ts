import type {
  MuseumCanonicalContextRef,
  MuseumSupplementalExhibit,
  MuseumSupplementalInterpretationSource,
  MuseumSupplementalVisitorGuideItem,
} from './platoSupplementalExhibits';

type GuideItem = Omit<MuseumSupplementalVisitorGuideItem, 'sourceIds'> & {sourceIds?: readonly string[]};
type ReviewEvidence = {
  plaqueTitle: string;
  plaqueType: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['type'];
  invitation: string;
  articleTitle: string;
  dateLabel: string;
  objectInterpretation: string;
  additions: readonly [string, string, string];
  sources: readonly MuseumSupplementalInterpretationSource[];
  guide: readonly [GuideItem, GuideItem, GuideItem, GuideItem];
  resolution: string;
  lock: string;
};

const collection = (id: string, label: string, url: string): MuseumSupplementalInterpretationSource => ({id, label, url, kind: 'collection-record'});
const academic = (id: string, label: string, url: string): MuseumSupplementalInterpretationSource => ({id, label, url, kind: 'academic-reference'});
const primary = (id: string, label: string, url: string): MuseumSupplementalInterpretationSource => ({id, label, url, kind: 'primary-text'});
const guide = (label: string, description: string, ...sourceIds: string[]): GuideItem => ({label, description, sourceIds});

const evidence: Record<string, ReviewEvidence> = {
  'idealism-weimar-intellectual-world': {
    plaqueTitle: 'Weimarer Musenhof',
    plaqueType: 'reception-or-transmission-history',
    invitation: 'Von Oer’s 1860 commemoration invites comparison between literary court culture, intellectual exchange, and the retrospective making of a German canon.',
    articleTitle: 'German Idealism',
    dateLabel: 'Theobald von Oer · 1860 · present holding and prior provenance unverified',
    objectInterpretation: 'The installed painting is Theobald von Oer’s Weimarer Musenhof, 1860, a later staged commemoration centered on Schiller reading at Tiefurt while Goethe stands at right. Commons supports the work and public-domain status but does not establish a present holding institution or copy-level provenance.',
    additions: [
      'Commons records the work and its public-domain status but no present collection or provenance, so the harmonious gathering remains evidence of nineteenth-century cultural memory rather than a recovered event.',
      'That distinction keeps Weimar Classicism, Jena Romanticism, and post-Kantian philosophy connected through exchange and patronage without turning them into one organization, doctrine, or documented meeting.',
      'The absent custody history is also a useful limit: canon formation can be studied through this image, but no unseen participant, conversation, or direct philosophical influence can be recovered from it.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Theobald von Oer, Weimarer Musenhof', 'https://commons.wikimedia.org/wiki/File:Oer-Weimarer_Musenhof.jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Idealism', 'https://plato.stanford.edu/entries/idealism/')],
    guide: [guide('Retrospective painting', 'The scene was painted in 1860 and composes an earlier cultural world rather than documenting one gathering.', 'object'), guide('Weimar Classicism', 'Literary and courtly networks overlap with, but are not identical to, German Idealism.', 'context'), guide('Jena Romanticism', 'Nearby writers and critics transformed shared problems through different genres and institutions.', 'context'), guide('Canon and absence', 'Placement and attention show how later memory centers some labor and leaves other contributions offstage.', 'object', 'context')],
    resolution: 'Resolved: verified the installed 1860 commemorative painting, retained its unresolved holding and provenance, separated later reception from primary evidence, preserved its full ratio, sourced all three interpretive paragraphs, and linked the current German Idealism article.',
    lock: 'fnv1a64:90fcf0003069e7e6',
  },
  'idealism-jena-system-labor': {
    plaqueTitle: 'Collegium Jenense, Jena',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    invitation: 'Muratov’s modern site photograph invites visitors to locate Fichte’s Jena work within teaching, publishing, employment, controversy, and revision.',
    articleTitle: 'Fichte',
    dateLabel: 'Vitold Muratov · photographed 24 March 2013 · historic university site in Jena',
    objectInterpretation: 'The installed bytes are Vitold Muratov’s 24 March 2013 photograph of the Collegium Jenense, licensed CC BY-SA 3.0. The image documents a present historic site, not a visually unchanged 1790s campus, classroom, audience, or lecture.',
    additions: [
      'The dated CC BY-SA photograph securely documents the current site and streetscape, while the surviving façade cannot establish how rooms, circulation, or teaching appeared during Fichte’s 1794–1799 tenure.',
      'Fichte’s repeated versions of the Wissenschaftslehre and his departure during the atheism controversy make institutional mediation part of the history, not merely a backdrop to a finished system.',
      'Reading the building this way distinguishes what the photograph directly shows from historically sourced university conditions and from the wider inference that institutions distribute authority, access, and risk.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Collegium Jenense (Jena)', 'https://commons.wikimedia.org/wiki/File:Collegium_Jenense_(Jena).jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Johann Gottlieb Fichte', 'https://plato.stanford.edu/entries/johann-fichte/')],
    guide: [guide('Modern site evidence', 'The photograph is from 2013 and does not reconstruct a late-eighteenth-century classroom.', 'object'), guide('Wissenschaftslehre versions', 'Fichte repeatedly reformulated the project across lectures and publications.', 'context'), guide('Atheism controversy', 'The dispute joined philosophical claims to censorship, reputation, and employment.', 'context'), guide('Institutional access', 'University practice depends on authorized teachers, students, printers, and patrons.', 'object', 'context')],
    resolution: 'Resolved: identified the installed 2013 licensed photograph, bounded its architectural evidence, distinguished Fichte-era institutional history from visible modern fabric, preserved the natural mount, mapped the claims, and linked the current Fichte article.',
    lock: 'fnv1a64:c875cfef17eb8d52',
  },
  'fichte-napoleonic-political-geography': {
    plaqueTitle: 'Germany and the Confederation of the Rhine, 1812',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Putzger’s later school map supplies political geography for Fichte’s wartime addresses while exposing the limits of borders as explanations of identity and freedom.',
    articleTitle: 'Fichte',
    dateLabel: 'Friedrich Wilhelm Putzger · atlas published 1902 · represents political geography in 1812',
    objectInterpretation: 'The installed image is a 1902 Putzger school-atlas map retrospectively representing central European political geography in 1812. The Internet Archive scan and public-domain record do not identify a particular original atlas copy or prove that Fichte encountered this map.',
    additions: [
      'Its clean colors and borders compress war, occupation, taxation, reform, and changing allegiance into a retrospective snapshot whose original exemplar and holding remain unresolved beyond the scan.',
      'Fichte delivered the Addresses to the German Nation in occupied Berlin in 1807–1808, before the mapped moment, so the sheet contextualizes a changing order rather than illustrating his text.',
      'The map supports neither automatic nationalist conclusions nor exculpation by emergency; visitors must separate documented chronology, later cartographic reconstruction, and judgments about exclusion within Fichte’s rhetoric.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Putzger map of Germany and the Confederation of the Rhine', 'https://commons.wikimedia.org/wiki/File:(Putzger)_Germany_and_Confederation_of_the_Rhine,_1812.jpg'), primary('primary', 'University of California San Diego — Fichte texts', 'https://philosophyfaculty.ucsd.edu/faculty/ctolley/texts/fichte.html'), academic('context', 'Stanford Encyclopedia of Philosophy — Johann Gottlieb Fichte', 'https://plato.stanford.edu/entries/johann-fichte/')],
    guide: [guide('Retrospective school map', 'The atlas appeared in 1902 and was not an object Fichte used in 1812.', 'object'), guide('Confederation of the Rhine', 'The colored political units simplify a rapidly changing Napoleonic order.', 'object', 'context'), guide('Addresses, 1807–1808', 'The addresses join education, language, and collective renewal after Prussian defeat.', 'primary', 'context'), guide('Emergency and exclusion', 'Anti-imperial context does not settle the hierarchy or later reception of national rhetoric.', 'context')],
    resolution: 'Resolved: verified the 1902 retrospective map and scan limits, corrected its chronology against Fichte’s addresses, distinguished cartographic evidence from political interpretation, preserved its ratio, mapped the claims, and linked the current Fichte article.',
    lock: 'fnv1a64:21cd6b8e9a69c7ec',
  },
  'fichte-revolution-freedom': {
    plaqueTitle: 'Storming of the Bastille and Arrest of de Launay',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'An undated Versailles painting of 14 July 1789 invites comparison between revolutionary violence and Fichte’s early argument for legitimate constitutional change.',
    articleTitle: 'Fichte',
    dateLabel: 'Unidentified painter · undated work representing 14 July 1789 · Versailles, MV 5517 / 86EE 1289',
    objectInterpretation: 'The installed oil is the anonymous Versailles painting Storming of the Bastille and arrest of Governor de Launay, representing 14 July 1789. Its execution date is undetermined; the collection records acquisition in 1900 under MV 5517 / 86EE 1289, so the event date must not be used as the object date.',
    additions: [
      'The Versailles record identifies the represented arrest and accession history but not a secure execution date, making this an authored historical representation rather than timestamped reportage or evidence of Fichte’s response.',
      'Fichte’s 1793 Contribution asks whether a people may change its constitution and attacks inherited privilege; that legal-philosophical argument is not equivalent to approving every revolutionary action.',
      'The object therefore stages rupture while the primary text supplies reasons, allowing visitors to distinguish event imagery, constitutional legitimacy, later political phases, and the ethical assessment of violence.',
    ],
    sources: [collection('object', 'Palace of Versailles — Storming of the Bastille and arrest of de Launay', 'https://collections.chateauversailles.fr/#e8679850-10cc-4034-877c-70e968b7012a'), collection('object-image', 'Wikimedia Commons — installed Bastille painting', 'https://commons.wikimedia.org/wiki/File:Anonymous_-_Prise_de_la_Bastille.jpg'), primary('primary', 'Bayerische Staatsbibliothek — Fichte, Beitrag (1793)', 'https://www.digitale-sammlungen.de/de/details/bsb10421850'), academic('context', 'Stanford Encyclopedia of Philosophy — Johann Gottlieb Fichte', 'https://plato.stanford.edu/entries/johann-fichte/')],
    guide: [guide('Object date unresolved', 'The painting represents 14 July 1789, but that is not a verified creation date.', 'object'), guide('de Launay’s arrest', 'The collection title identifies a particular episode rather than a generic revolutionary crowd.', 'object'), guide('Constitutional change', 'Fichte’s 1793 text argues about the people’s authority and inherited privilege.', 'primary'), guide('Argument versus event', 'Neither the painting nor the context proves approval of each act of revolutionary violence.', 'primary', 'context')],
    resolution: 'Resolved: separated the Bastille event date from the undated painting, added Versailles accessions and acquisition context, distinguished imagery from Fichte’s 1793 constitutional argument, preserved the ratio, mapped all claims, and linked the current Fichte article.',
    lock: 'fnv1a64:4ad03995eb10e592',
  },
  'nature-caroline-intellectual-network': {
    plaqueTitle: 'Portrait of Caroline Schlegel',
    plaqueType: 'paired-or-grouped-historical-figures',
    invitation: 'Tischbein’s 1798 portrait invites attention to Caroline Schlegel’s translation, criticism, editing, and unequal archival attribution within Jena’s intellectual networks.',
    articleTitle: 'Schelling',
    dateLabel: 'Johann Friedrich August Tischbein · 1798 · private Rhenish collection; known auction provenance',
    objectInterpretation: 'The installed portrait is Johann Friedrich August Tischbein’s 1798 oil of Caroline Schlegel, later Schelling—not a work by Johann Heinrich Tischbein despite the legacy filename. Commons records a Bassenge auction and private Rhenish ownership, but not a public collection or complete earlier provenance.',
    additions: [
      'The sitter’s date-specific name and the correct Tischbein attribution matter because later marital naming and a misleading filename can quietly reorganize both identity and authorship around Schelling.',
      'Caroline’s documented literary, translational, editorial, and conversational work belongs to the Jena network, while evidence does not license invented coauthorship of Schelling’s distinctive philosophical claims.',
      'The known sale and private-collection chain sets a clear boundary: recovering gendered intellectual labor requires specific documents, not either erasure or certainty supplied by a likeness alone.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Tischbein portrait of Caroline Schlegel', 'https://commons.wikimedia.org/wiki/File:Johann_Heinrich_Tischbein_-_Bildnis_der_Caroline_Schelling_(1798).jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Friedrich Wilhelm Joseph von Schelling', 'https://plato.stanford.edu/entries/schelling/')],
    guide: [guide('Caroline Schlegel in 1798', 'Use the sitter’s contemporary name rather than making her later marriage retroactive.', 'object'), guide('Correct Tischbein', 'The supported creator is Johann Friedrich August Tischbein despite the legacy filename.', 'object'), guide('Network labor', 'Translation, criticism, editing, and conversation shaped Jena’s shared intellectual world.', 'context'), guide('Attribution limit', 'Participation should be credited without claiming undocumented coauthorship of doctrines.', 'object', 'context')],
    resolution: 'Resolved: corrected the portrait creator and date-specific sitter name, retained the private and incomplete provenance, distinguished documented network labor from invented coauthorship, preserved the ratio, mapped claims, and linked the current Schelling article.',
    lock: 'fnv1a64:e4f18b16fc5cb94d',
  },
  'nature-romantic-beholder': {
    plaqueTitle: 'Wanderer above the Sea of Fog',
    plaqueType: 'reception-or-transmission-history',
    invitation: 'Friedrich’s c. 1818 painting invites comparison with Schelling’s productive nature while remaining an autonomous Romantic work rather than a philosophical diagram.',
    articleTitle: 'Schelling',
    dateLabel: 'Caspar David Friedrich · c. 1818 · Hamburger Kunsthalle, HK-5161',
    objectInterpretation: 'The installed work is Caspar David Friedrich’s c. 1818 oil Wanderer above the Sea of Fog, Hamburger Kunsthalle HK-5161. The Rückenfigur, rock, fog, and interrupted vista belong to the painting’s construction; no record establishes direct influence from Schelling.',
    additions: [
      'The Kunsthalle object record secures title, date, medium, and accession while the public-domain derivative preserves the complete vertical composition and its deliberately obstructed rather than panoramic vision.',
      'Schelling’s account of nature as productive rather than inert offers a bounded philosophical comparison, not a key that converts the wanderer, fog, or mountain into fixed concepts.',
      'The interpretive relation is later reception: it can sharpen questions about beholding and mastery without turning Romantic solitude into modern ecology or proving artist-philosopher dependence.',
    ],
    sources: [collection('object', 'Hamburger Kunsthalle — Wanderer above the Sea of Fog, HK-5161', 'https://online-sammlung.hamburger-kunsthalle.de/de/objekt/HK-5161'), collection('object-image', 'Wikimedia Commons — installed Friedrich reproduction', 'https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Wanderer_above_the_Sea_of_Fog.jpeg'), academic('context', 'Stanford Encyclopedia of Philosophy — Schelling', 'https://plato.stanford.edu/entries/schelling/')],
    guide: [guide('Rückenfigur', 'The turned figure organizes a viewer’s relation to a landscape that remains partly hidden.', 'object'), guide('HK-5161', 'The Kunsthalle record identifies the c. 1818 oil and its collection object.', 'object'), guide('Productive nature', 'Schelling resists treating nature as merely inert material for a subject.', 'context'), guide('Reception, not influence', 'The comparison is interpretive; no direct Schelling–Friedrich dependence is established.', 'object', 'context')],
    resolution: 'Resolved: verified the Kunsthalle object and accession, preserved the complete composition and public-domain source, bounded the Schelling comparison as later reception rather than influence, mapped claims, and linked the current Schelling article.',
    lock: 'fnv1a64:2e4a42e94415b5c5',
  },
  'nature-goethe-color': {
    plaqueTitle: 'Goethe’s Color Circle',
    plaqueType: 'concept-argument-diagram-or-method',
    invitation: 'Goethe’s 1809 circle invites visitors to separate observable color, lived perception, and symbolic association when comparing his project with Schelling’s philosophy of nature.',
    articleTitle: 'Schelling',
    dateLabel: 'Johann Wolfgang von Goethe · 1809 · square digital crop by Luestling, CC0',
    objectInterpretation: 'The installed square image is a Commons CC0 crop of Goethe’s 1809 color circle for the allegorical, symbolic, and mystical use of color. The historic diagram and the modern digital crop have distinct creator and rights histories; neither is a Schelling diagram.',
    additions: [
      'Six labeled sectors order relations among colors and qualities, while the square crop is a later digital preparation whose CC0 dedication must not be reassigned to Goethe’s original authorship.',
      'Goethe’s project joins experiment, phenomenological description, and symbolic interpretation; comparison with Schelling concerns a shared period problem rather than one thinker supplying the other’s doctrine.',
      'Visitors should keep physical optics, experienced appearance, and affective symbolism distinct, since the diagram neither establishes universal color meanings nor carries modern experimental authority into Naturphilosophie.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Goethe color circle, square derivative', 'https://commons.wikimedia.org/wiki/File:Goethe,_Farbenkreis_zur_Symbolisierung_des_menschlichen_Geistes-_und_Seelenlebens,_1809,_square.jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Schelling', 'https://plato.stanford.edu/entries/schelling/')],
    guide: [guide('Historic diagram', 'Goethe organized six colors for allegorical, symbolic, and mystical use in 1809.', 'object'), guide('Digital crop', 'The square derivative and its CC0 dedication are separate from the underlying object.', 'object'), guide('Perception and optics', 'Observed appearance, physical explanation, and symbolic association answer different questions.', 'context'), guide('Shared period problem', 'The circle contextualizes Schelling without becoming evidence of his doctrine.', 'object', 'context')],
    resolution: 'Resolved: distinguished Goethe’s 1809 diagram from the CC0 square derivative, preserved object and crop creators, bounded the Schelling comparison, retained the square ratio, mapped claims, and linked the current Schelling article.',
    lock: 'fnv1a64:a040a4bb7c260e94',
  },
  'nature-galvani-living-force': {
    plaqueTitle: 'Galvani’s Animal-Electricity Experiment',
    plaqueType: 'concept-argument-diagram-or-method',
    invitation: 'The 1791 experimental plate invites a distinction between apparatus-based evidence and Schelling’s philosophical account of dynamic, organized nature.',
    articleTitle: 'Schelling',
    dateLabel: 'Plate published with Luigi Galvani’s De viribus electricitatis · 1791 · engraver and holding unverified',
    objectInterpretation: 'The installed plate is Tav. 1 from Galvani’s De viribus electricitatis in motu musculari commentarius, published in 1791. The accessible record does not identify its draughtsman, engraver, particular exemplar, or present holding, and it does not show that Schelling used this exact image.',
    additions: [
      'Frogs, exposed nerves, metals, and apparatus record an experimental arrangement, but authorship of the published work does not by itself establish that Galvani drew or engraved this plate.',
      'The Galvani–Volta dispute made living response, contact, and electrical force newly contestable, offering historical context for Naturphilosophie without transferring experimental proof to a metaphysical system.',
      'Responsible comparison preserves the difference between primary experimental evidence, philosophical synthesis, later scientific explanation, and ethical questions raised by the represented use of animal bodies.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Galvani experiment plate', 'https://commons.wikimedia.org/wiki/File:Luigi_Galvani_Experiment.jpeg'), academic('context', 'Stanford Encyclopedia of Philosophy — Schelling', 'https://plato.stanford.edu/entries/schelling/')],
    guide: [guide('Tavola 1', 'The plate belongs to Galvani’s 1791 publication; its draughtsman and engraver remain unknown.', 'object'), guide('Experimental arrangement', 'Apparatus and prepared animal bodies isolate relations for observation and repetition.', 'object'), guide('Galvani–Volta dispute', 'Competing explanations followed from the observed muscular response.', 'context'), guide('Evidence boundary', 'Experimental authority does not automatically validate Schelling’s philosophical use of dynamic nature.', 'object', 'context')],
    resolution: 'Resolved: identified the 1791 publication plate, removed artist over-attribution, stated exemplar and holding limits, separated experimental authority from Naturphilosophie, preserved the ratio, mapped claims, and linked the current Schelling article.',
    lock: 'fnv1a64:52d1d2dac8935904',
  },
  'nature-voltaic-pile': {
    plaqueTitle: 'Original Voltaic Pile',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    invitation: 'A 1959 collection photograph of a pile probably made or used by Volta invites attention to dynamic matter, stored arrangement, and uncertain object histories.',
    articleTitle: 'Schelling',
    dateLabel: 'Object probably made or used by Alessandro Volta · photographed 1959 · Wellcome, R19/1950',
    objectInterpretation: 'The installed image is Wellcome M0017447, a collection photograph made in 1959 of an early voltaic pile catalogued as probably made or used by Volta, museum number R19/1950. The object appeared at Como in 1899; the qualified maker/use history must remain distinct from the CC BY 4.0 photograph.',
    additions: [
      'Alternating discs and separators form the vertical stack, but the photograph records a museum object in 1959 rather than the act of invention around 1800 or an authenticated workshop scene.',
      'Volta’s pile enabled sustained current and sharpened disputes arising from Galvani, supplying a material scientific context for Schelling’s dynamic nature without proving contact with this artifact.',
      'The catalog’s word “probably” is substantive provenance evidence: it prevents a confident maker claim while still supporting inquiry into how arranged materials reorganized concepts of activity and force.',
    ],
    sources: [collection('object', 'Wellcome Collection — original voltaic pile, R19/1950', 'https://wellcomecollection.org/works/qwp959cv'), collection('object-image', 'Wikimedia Commons — Wellcome M0017447', 'https://commons.wikimedia.org/wiki/File:Original_Voltaic_pile._Wellcome_M0017447.jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Schelling', 'https://plato.stanford.edu/entries/schelling/')],
    guide: [guide('Object and photograph', 'The probable early pile and the 1959 collection photograph have different dates and creators.', 'object'), guide('Qualified provenance', 'Wellcome says the object was probably made or used by Volta rather than documenting certainty.', 'object'), guide('Continuous current', 'The piled arrangement sustained electrical action and redirected experimental inquiry.', 'context'), guide('No contact claim', 'Nothing here establishes that Schelling saw or handled this particular object.', 'object', 'context')],
    resolution: 'Resolved: corrected the photograph to 1959, retained the object’s probably-made-or-used qualifier and documented custody, separated object and image rights, preserved the vertical ratio, mapped claims, and linked the current Schelling article.',
    lock: 'fnv1a64:cef06a61c366f6be',
  },
  'hegel-lecture-room': {
    plaqueTitle: 'Hegel with Students',
    plaqueType: 'reception-or-transmission-history',
    invitation: 'A weakly documented lecture-room image invites visitors to distinguish Hegel’s publications, changing courses, student notes, and posthumous editorial transmission.',
    articleTitle: 'Hegel',
    dateLabel: 'Attributed to Franz Kugler · date traditionally given as 1828 · reproduced 1931; original holding unverified',
    objectInterpretation: 'The installed image is attributed to Franz Kugler and traditionally dated 1828, but its accessible source chain reaches a 1931 reproduction without establishing the original sheet, exact publication, holding, or a particular witnessed lecture. It is an illustrative lifetime scene, not a transcript.',
    additions: [
      'Rows of students and a standing lecturer make oral teaching visible, yet the weak source chain cannot certify a specific course, date, audience, eyewitness viewpoint, or surviving physical impression.',
      'Hegel’s published works, repeated lecture courses, student notebooks, and edited posthumous volumes are related but nonidentical evidence whose differences help explain interpretive variation.',
      'The scene therefore supports a transmission history rather than a uniform “Hegelian school”: pedagogy distributes philosophical authority while listeners, editors, and publication practices transform what later readers receive.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Hegel with students', 'https://commons.wikimedia.org/wiki/File:Friedrich_Hegel_mit_Studenten_Lithographie_F_Kugler.jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Georg Wilhelm Friedrich Hegel', 'https://plato.stanford.edu/entries/hegel/')],
    guide: [guide('Weak object chain', 'Attribution, 1828 dating, original format, and holding are not equally secure.', 'object'), guide('Illustration, not transcript', 'The image cannot identify a particular lecture or recover its exact words.', 'object'), guide('Lecture courses', 'Hegel revised subjects across oral presentations and surviving student notes.', 'context'), guide('Posthumous editions', 'Later editorial construction belongs to the reception history of the lecture corpus.', 'context')],
    resolution: 'Resolved: qualified the Kugler attribution and traditional date, stated the 1931 reproduction and unknown original holding, separated illustration from lecture evidence, preserved the ratio, mapped claims, and linked the current Hegel article.',
    lock: 'fnv1a64:7aebdff669a7cd9b',
  },
  'hegel-napoleon-jena': {
    plaqueTitle: '“Two Philosophers Meet at Jena”',
    plaqueType: 'reception-or-transmission-history',
    invitation: 'This 1895 historicist illustration invites scrutiny of Hegel’s documented “world-soul” letter and the later myth of a witnessed philosophical encounter with Napoleon.',
    articleTitle: 'Hegel',
    dateLabel: 'Unidentified illustrator · published 1895 · imagines Jena in 1806; original holding unverified',
    objectInterpretation: 'The installed image is a later illustration published in 1895 under the caption Two Philosophers Meet at Jena, staging Hegel, Napoleon, and officers in 1806. The accessible record does not substantiate the legacy “Kurtz” attribution or establish an original holding; it is not eyewitness evidence.',
    additions: [
      'Mounted figures and a watching civilian turn the episode into historical theater almost ninety years later, and no visible detail can verify an actual face-to-face meeting or the artist’s identity.',
      'Hegel’s 13 October 1806 letter called Napoleon the “world-soul”; the battle followed the next day, while “world spirit on horseback” is a popular paraphrase rather than his exact wording.',
      'Keeping letter, battle, image, and slogan separate permits criticism of conquest and teleology without treating historical intelligibility as endorsement or later legend as primary evidence.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Hegel and Napoleon in Jena illustration', 'https://commons.wikimedia.org/wiki/File:Hegel-and-Napoleon-in-Jena-1806.jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Hegel', 'https://plato.stanford.edu/entries/hegel/')],
    guide: [guide('Published in 1895', 'The picture is a later historicist staging of events associated with 1806.', 'object'), guide('Creator unresolved', 'The available source does not substantiate the legacy Kurtz attribution.', 'object'), guide('World-soul letter', 'Hegel’s dated letter supplies the documented phrase and chronology.', 'context'), guide('Myth versus evidence', 'A popular slogan and imagined encounter should not replace the letter record.', 'object', 'context')],
    resolution: 'Resolved: removed the unverified Kurtz attribution, identified the 1895 reception image, separated it from Hegel’s dated world-soul letter and the later horseback paraphrase, preserved the ratio, mapped claims, and linked the current Hegel article.',
    lock: 'fnv1a64:cff2b417748cce58',
  },
  'hegel-birthplace-stuttgart': {
    plaqueTitle: 'Hegel House, Stuttgart',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    invitation: 'A 2021 museum-site photograph invites visitors to separate Hegel’s career geography from the later heritage practices that organize his public memory.',
    articleTitle: 'Hegel',
    dateLabel: 'MerianStgt · photographed 31 May 2021 · Hegel House museum, Stuttgart',
    objectInterpretation: 'The installed CC BY-SA 4.0 photograph by MerianStgt shows the Hegel House museum and modern Stuttgart streetscape on 31 May 2021. It locates a heritage site but does not establish unchanged 1770 building fabric, a reconstructed interior, or a cause of Hegel’s later system.',
    additions: [
      'The façade, signage, paving, and neighboring buildings are direct evidence of the present museum setting, while the photograph cannot recover the domestic interior or urban experience of Hegel’s birth year.',
      'Stuttgart begins a career geography that also includes Tübingen, Jena, Nuremberg, Heidelberg, and Berlin, each with different educational, professional, and political conditions.',
      'Birthplace museums make public memory spatially accessible, but biography should neither be detached from institutions nor used to explain philosophical arguments through an origin-site image.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Hegelhaus Stuttgart', 'https://commons.wikimedia.org/wiki/File:Hegelhaus_Stuttgart.jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Hegel', 'https://plato.stanford.edu/entries/hegel/')],
    guide: [guide('2021 photograph', 'The image documents the present museum façade and streetscape.', 'object'), guide('Fabric limit', 'Visible architecture must not be projected unchanged into 1770.', 'object'), guide('Career cities', 'Stuttgart, Tübingen, Jena, Nuremberg, Heidelberg, and Berlin mark distinct institutional phases.', 'context'), guide('Heritage practice', 'A birthplace museum interprets memory; it does not explain a philosophical system by itself.', 'object', 'context')],
    resolution: 'Resolved: verified the 2021 licensed site photograph, bounded claims about historic fabric and interiors, distinguished career geography from heritage interpretation, preserved the ratio, mapped claims, and linked the current Hegel article.',
    lock: 'fnv1a64:82cde744d8797510',
  },
  'hegel-berlin-institution': {
    plaqueTitle: 'The University at Opernplatz, Berlin',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'An anonymous 1855 lithograph invites an institutional reading of Hegel’s Berlin teaching while remaining later evidence with unresolved custody.',
    articleTitle: 'Hegel',
    dateLabel: 'Unidentified artist · 1855 · published university view; present holding unverified',
    objectInterpretation: 'The installed anonymous 1855 lithograph is catalogued as a view of the university at Opernplatz. It postdates Hegel’s death by twenty-four years, and the accessible record does not establish its original source, physical holding, or complete provenance.',
    additions: [
      'The square, façade, pedestrians, and carriages visualize a civic institution after Hegel’s tenure; present-day names and building history should not be retroactively treated as the print’s own full catalog evidence.',
      'Hegel taught in Berlin from 1818 to 1831, where professorship, courses, students, state institutions, and print publics shaped the reception of arguments about freedom and objective spirit.',
      'Institutional location complicates the reduction to an “official Prussian philosopher”: employment and authority matter, but neither this later lithograph nor that label settles the content or politics of his philosophy.',
    ],
    sources: [collection('object', 'Wikimedia Commons — OpernplatzUniversitaet1855', 'https://commons.wikimedia.org/wiki/File:OpernplatzUniversitaet1855.jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Hegel', 'https://plato.stanford.edu/entries/hegel/')],
    guide: [guide('Later university view', 'The 1855 print was made twenty-four years after Hegel’s death.', 'object'), guide('Custody unresolved', 'Creator, original publication context, and present physical holding remain unverified.', 'object'), guide('Berlin tenure', 'Hegel’s 1818–1831 teaching joined courses, students, office, and publication.', 'context'), guide('Institution and argument', 'State employment matters without reducing the philosophy to an official slogan.', 'object', 'context')],
    resolution: 'Resolved: identified the anonymous 1855 Opernplatz university view, retained its unresolved source and custody, separated later architecture from Hegel’s tenure, preserved institutional nuance and natural ratio, mapped claims, and linked the current Hegel article.',
    lock: 'fnv1a64:7aed9aadaa1db65d',
  },
  'hegel-haiti-recognition-debate': {
    plaqueTitle: 'Attack and Capture of Crête-à-Pierrot',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Raffet and Hébert’s 1839 image of an 1802 battle opens an evidence-aware inquiry into the disputed Haiti context of Hegel’s lordship-and-bondage passage.',
    articleTitle: 'Hegel',
    dateLabel: 'Auguste Raffet, drawing; Ernest Hébert, engraving · published 1839 · represents March 1802',
    objectInterpretation: 'The installed engraving is Raffet and Hébert’s Attack and Capture of Crête-à-Pierrot, published in 1839 and retrospectively representing fighting of 4–24 March 1802. Its specific battle, later date, and unresolved holding prevent its use as a general eyewitness image of the Haitian Revolution.',
    additions: [
      'Smoke, troops, and fortifications stage one military episode through a later Napoleonic publication, not the full revolution, enslaved people’s political agency, or Hegel’s access to Caribbean news.',
      'The Phenomenology’s lordship-and-bondage sequence is a conceptual argument; scholarship can place it beside Saint-Domingue and documented press circulation without turning the passage into a disguised chronicle.',
      'The Haiti connection is a major interpretive proposal but direct textual dependence remains disputed, so primary evidence, historical context, later imagery, and scholarly inference must stay visibly differentiated.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Attack and capture of Crête-à-Pierrot', 'https://commons.wikimedia.org/wiki/File:Haitian_Revolution.jpg'), primary('primary', 'Cambridge University Press — Hegel, The Phenomenology of Spirit', 'https://www.cambridge.org/core/books/georg-wilhelm-friedrich-hegel-the-phenomenology-of-spirit/6FEDB42FDEF2E5FF97FEAE0EEEDABE8E'), academic('context', 'Caterina Maurer — The shadow of the Haitian uprising on Hegel’s thought', 'https://mimesisjournals.com/ojs/index.php/babelonline/article/view/2932')],
    guide: [guide('Crête-à-Pierrot', 'The image represents a specific March 1802 battle rather than the whole Haitian Revolution.', 'object'), guide('Published in 1839', 'Raffet and Hébert made a later Napoleonic-history image, not eyewitness reportage.', 'object'), guide('Lordship and bondage', 'Hegel’s passage is a conceptual sequence whose primary text must remain distinct.', 'primary'), guide('Disputed direct source', 'Press awareness is historically relevant, while one-to-one dependence remains contested.', 'context')],
    resolution: 'Resolved: identified the specific 1802 battle and 1839 image, separated it from Hegel’s primary text, framed the Haiti relation as significant but disputed scholarship, preserved the ratio, mapped claims, and linked the current Hegel article.',
    lock: 'fnv1a64:d94031ee28028f6f',
  },
  'afterlives-holderlin': {
    plaqueTitle: 'Friedrich Hölderlin',
    plaqueType: 'paired-or-grouped-historical-figures',
    invitation: 'Hiemer’s c. 1792 lifetime pastel introduces Hölderlin as an independent thinker and poet beside German Idealism rather than a literary appendix to Hegel or Schelling.',
    articleTitle: 'German Idealism',
    dateLabel: 'Franz Carl Hiemer · c. 1792 · Deutsches Literaturarchiv Marbach',
    objectInterpretation: 'The installed work is Franz Carl Hiemer’s c. 1792 pastel portrait of Friedrich Hölderlin, held by the Schiller-Nationalmuseum / Deutsches Literaturarchiv Marbach. It is a lifetime likeness whose identification has a history of dispute; a face does not document a doctrine.',
    additions: [
      'The pastel’s collection identity and date anchor Hölderlin’s contemporaneity with his Tübingen companions, while the historically contested likeness prevents treating appearance as transparent personal evidence.',
      'Fragments on judgment and being and the philosophical work of poetic form address post-Kantian division without becoming unfinished versions of either Schelling’s or Hegel’s systems.',
      'Authorship debates around the Oldest System-Programme and Hölderlin’s later illness require explicit uncertainty; neither collaborative context nor biography licenses a reductive explanation of the work.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Hiemer pastel of Hölderlin', 'https://commons.wikimedia.org/wiki/File:FK_Hiemer_-_Friedrich_H%C3%B6lderlin_(Pastell_1792).jpg'), academic('biography', 'Deutsche Biographie — Franz Carl Hiemer', 'https://www.deutsche-biographie.de/sfz32216.html'), academic('context', 'Stanford Encyclopedia of Philosophy — Idealism', 'https://plato.stanford.edu/entries/idealism/')],
    guide: [guide('Lifetime pastel', 'The c. 1792 portrait establishes contemporaneity but not philosophical content.', 'object'), guide('Contested likeness', 'Historical dispute around identification should remain visible.', 'object', 'biography'), guide('Judgment and being', 'Hölderlin approaches post-Kantian division through fragments and poetic form.', 'context'), guide('Authorship and illness', 'Uncertain collaboration and later illness should not become shortcuts for interpretation.', 'context')],
    resolution: 'Resolved: verified the Marbach lifetime pastel and its likeness caveat, treated Hölderlin as an independent participant, retained authorship and biographical limits, preserved the ratio, mapped claims, and linked the current German Idealism article.',
    lock: 'fnv1a64:579721d67843ccd7',
  },
  'afterlives-novalis': {
    plaqueTitle: 'Novalis',
    plaqueType: 'reception-or-transmission-history',
    invitation: 'Eichens’s posthumous engraving frames Novalis’s afterlife while his fragments make unfinished inquiry across philosophy, poetry, science, and social practice part of the wider idealist field.',
    articleTitle: 'German Idealism',
    dateLabel: 'Friedrich Eduard Eichens · steel engraving, 1845 · exact impression and holding unverified',
    objectInterpretation: 'The installed image reproduces Friedrich Eduard Eichens’s 1845 steel engraving of Novalis through a 1936 publication. It is posthumous, and the accessible record does not identify the exact surviving impression, present holding, or complete provenance.',
    additions: [
      'The oval profile and identifying caption construct a reception portrait forty-four years after Novalis’s death, not a documented sitting or direct record of his working life.',
      'His Fichte Studies, fragments, scientific and mining work, and unfinished encyclopedia project make open form a method of inquiry rather than evidence of hostility to reason.',
      'The unresolved impression history reinforces the interpretive limit: Romantic incompletion can challenge closed presentation without exempting claims from chronology, textual evidence, or philosophical disagreement.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Eichens engraving of Novalis', 'https://commons.wikimedia.org/wiki/File:Novalis2.jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Novalis', 'https://plato.stanford.edu/entries/novalis/')],
    guide: [guide('Posthumous engraving', 'The 1845 image is later reception, not a lifetime likeness.', 'object'), guide('Unknown impression', 'The scan’s 1936 source does not establish a present physical holding.', 'object'), guide('Fichte Studies', 'Novalis engaged post-Kantian problems through notes and experimental forms.', 'context'), guide('Romantic encyclopedia', 'Unfinished inquiry crossed poetry, science, philosophy, and practical knowledge.', 'context')],
    resolution: 'Resolved: identified the 1845 posthumous steel engraving and 1936 scan chain, retained the unresolved impression and holding, deepened Novalis’s independent method, preserved the ratio, mapped claims, and linked the current German Idealism article.',
    lock: 'fnv1a64:23f3a7ac4268564f',
  },
  'afterlives-runge-morning': {
    plaqueTitle: 'Der Morgen (Kleiner Morgen)',
    plaqueType: 'reception-or-transmission-history',
    invitation: 'Runge’s completed 1808 small Morning organizes color, light, bodies, and growth into a Romantic whole without becoming a diagram of Schelling or Hegel.',
    articleTitle: 'German Idealism',
    dateLabel: 'Philipp Otto Runge · 1808 · Hamburger Kunsthalle, HK-1016',
    objectInterpretation: 'The installed painting is Runge’s completed first or small version, Der Morgen (Kleiner Morgen), 1808, Hamburger Kunsthalle HK-1016. It must be distinguished from the unfinished larger version and treated as an autonomous Romantic allegory, not direct evidence of idealist influence.',
    additions: [
      'The full vertical composition joins a central figure, children, flowers, rays, and landscape; the Kunsthalle identity corrects the ambiguous title that could point visitors toward the unfinished Großer Morgen.',
      'Runge’s Times of Day project and color thinking pursue unity through visual and theological form, creating a historical parallel to idealist problems without translating neatly into propositions.',
      'The relation remains interpretive: collection evidence secures the object, while any claim of direct dependence on Schelling or Hegel would require documentation absent from the painting and sources.',
    ],
    sources: [collection('object', 'Hamburger Kunsthalle — Philipp Otto Runge collection context', 'https://www.hamburger-kunsthalle.de/de/ausstellungen/philipp-otto-runge'), collection('object-record', 'Hamburger Kunsthalle — research on Runge’s Morning versions', 'https://online-sammlung.hamburger-kunsthalle.de/de/objekt/34194'), academic('context', 'German History in Documents and Images — Der kleine Morgen', 'https://germanhistorydocs.org/de/vom-vormaerz-bis-zur-preussischen-vorherrschaft-1815-1866/philipp-otto-runge-der-kleine-morgen-1808')],
    guide: [guide('Kleiner Morgen', 'The installed 1808 painting is the completed small or first version.', 'object', 'object-record'), guide('Großer Morgen', 'A separate larger version remained unfinished and should not be conflated with this object.', 'object-record'), guide('Times of Day', 'Runge developed a larger visual cycle of time, color, nature, and theology.', 'context'), guide('Parallel, not diagram', 'The painting can accompany idealist questions without illustrating a doctrine.', 'object', 'context')],
    resolution: 'Resolved: corrected the work to Der Morgen (Kleiner Morgen), distinguished the unfinished larger version, retained Kunsthalle identity, bounded the idealist comparison, preserved the vertical ratio, mapped claims, and linked the current German Idealism article.',
    lock: 'fnv1a64:33d8b15e5b81f505',
  },
  'afterlives-young-hegelians': {
    plaqueTitle: 'Die Freien',
    plaqueType: 'reception-or-transmission-history',
    invitation: 'Engels’s 1842 caricature turns one Berlin circle into a scene of satire, journalism, religious criticism, and political disagreement within Hegel’s contested afterlife.',
    articleTitle: 'Hegel',
    dateLabel: 'Friedrich Engels · caricature, 1842 · exact original custody and scan chain unresolved',
    objectInterpretation: 'The installed line drawing is Friedrich Engels’s 1842 caricature of Die Freien. Commons records a later scan and related archival reference but does not establish the exact original sheet, current custody, or a complete derivative chain; satire cannot serve as a neutral membership roster.',
    additions: [
      'Distortion, labels, newspapers, drink, and procession turn intellectual sociability into polemical performance, so even confident figure identifications must not erase the image’s satirical purpose.',
      'Die Freien was one Berlin circle within a broader and internally divided Young Hegelian field, not a complete map of post-Hegelian religious and political criticism.',
      'Marx and Engels’s later break with criticism confined to religion or consciousness belongs to reception history, while this earlier caricature documents neither a fixed collective doctrine nor inevitable transition.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Friedrich Engels, Die Freien', 'https://commons.wikimedia.org/wiki/File:Friedrich_Engels_-_Die_Freien_(1842)-1.1_V01-1.2_raw_RGASPI.jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Ludwig Feuerbach and the Young Hegelians', 'https://plato.stanford.edu/entries/ludwig-feuerbach/')],
    guide: [guide('Satirical evidence', 'Exaggeration and arrangement communicate Engels’s polemical viewpoint.', 'object'), guide('Custody unresolved', 'The exact original sheet and full digital source chain are not established.', 'object'), guide('Die Freien', 'The Berlin circle was one node rather than the whole Young Hegelian field.', 'context'), guide('Contested afterlife', 'Religious, political, and material critiques diverged rather than forming one relay beyond Hegel.', 'context')],
    resolution: 'Resolved: identified the 1842 caricature, retained the unresolved original and derivative chain, prevented roster use, distinguished Die Freien from broader Young Hegelianism, preserved the ratio, mapped claims, and linked the current Hegel article.',
    lock: 'fnv1a64:b9405da52bdcd512',
  },
  'afterlives-feuerbach': {
    plaqueTitle: 'Ludwig Feuerbach',
    plaqueType: 'reception-or-transmission-history',
    invitation: 'A weakly documented portrait introduces Feuerbach’s theology critique while making object uncertainty and philosophical identification two different evidentiary questions.',
    articleTitle: 'Hegel',
    dateLabel: 'Unidentified maker · c. 1840 asserted by a 1972 reproduction source · original object and rights provenance unresolved',
    objectInterpretation: 'The installed low-resolution image is conventionally identified as Ludwig Feuerbach and dated c. 1840 only through a 1972 reproduction source. Maker, technique, original holding, provenance, authenticated sitting, and a specific U.S. public-domain rationale remain unresolved; it should not be called a drawing.',
    additions: [
      'The head-and-shoulders image supports a cautious sitter label but no secure medium, maker, custody, exact date, or inference about Feuerbach’s expression and intellectual character.',
      'The Essence of Christianity redirects divine predicates toward alienated human powers, yet Feuerbach’s sensuous anthropology remains a distinctive position rather than merely an incomplete draft of Marx.',
      'Marx’s practical and historical criticism is later reception; keeping it separate from the weak object record prevents philosophical confidence from laundering uncertainty about the installed likeness.',
    ],
    sources: [collection('object', 'Wikimedia Commons — conventionally identified Feuerbach portrait', 'https://commons.wikimedia.org/wiki/File:Ludwig-Feuerbach.jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Ludwig Feuerbach', 'https://plato.stanford.edu/entries/ludwig-feuerbach/')],
    guide: [guide('Source-asserted likeness', 'The sitter and c. 1840 date rest on a later reproduction record.', 'object'), guide('Object limits', 'Maker, technique, holding, provenance, and exact rights basis remain unresolved.', 'object'), guide('Projection and alienation', 'Feuerbach reads theological predicates as displaced human powers.', 'context'), guide('Not merely proto-Marx', 'Later material-practical criticism should not erase Feuerbach’s independent argument.', 'context')],
    resolution: 'Resolved: downgraded the image to a source-asserted likeness, removed the unsupported drawing claim, stated maker, medium, custody, provenance, and rights limits, preserved Feuerbach’s independent argument, ratio, source mappings, and current Hegel link.',
    lock: 'fnv1a64:3a75c31d1ecbc1f3',
  },
  'afterlives-strauss': {
    plaqueTitle: 'Portrait of David Friedrich Strauss',
    plaqueType: 'reception-or-transmission-history',
    invitation: 'Mayer’s nineteenth-century portrait print accompanies Strauss’s historical Gospel criticism without making myth identical to deception or secularization inevitable.',
    articleTitle: 'Hegel',
    dateLabel: 'Carl Mayer after Schmidt · steel engraving, 1837–1868 · Rijksmuseum, RP-P-1913-325',
    objectInterpretation: 'The installed print is Carl Mayer’s steel engraving after a drawing by Schmidt, published by Literatur-Comptoir between 1837 and 1868, Rijksmuseum RP-P-1913-325. The museum records purchase in 1905 and a public-domain/CC0 reproduction; the broad date range does not document a sitting.',
    additions: [
      'The oval portrait, printed caption, derivative design, publisher, broad date range, and later museum acquisition make this a transmission object rather than a precisely dated life study.',
      'Strauss’s Life of Jesus treats myth as communal historical formation rather than simply conscious fraud, placing scriptural criticism within disputes emerging from Hegelian theology.',
      'The print cannot prove an inevitable path from Hegel to disbelief; it instead anchors one controversial reception in which method, doctrine, institutional consequences, and religious commitment remained contested.',
    ],
    sources: [collection('object', 'Rijksmuseum — Portrait of David Friedrich Strauss, RP-P-1913-325', 'https://www.rijksmuseum.nl/en/collection/object/Portret%2Bvan%2BDavid%2BFriedrich%2BStrauss--a633b09d1e7079e6f8067e420625cf2d'), collection('object-image', 'Wikimedia Commons — installed Strauss print', 'https://commons.wikimedia.org/wiki/File:Portret_van_David_Friedrich_Strauss,_RP-P-1913-325.jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Ludwig Feuerbach and post-Hegelian criticism', 'https://plato.stanford.edu/entries/ludwig-feuerbach/')],
    guide: [guide('Derivative steel engraving', 'Mayer printed the portrait after a drawing by Schmidt.', 'object'), guide('Broad date range', '1837–1868 is a production range, not evidence for a dated sitting.', 'object'), guide('Myth', 'Strauss analyzes communal narrative formation rather than reducing Gospel authors to fraud.', 'context'), guide('Contested secularization', 'Historical criticism did not make one philosophical or religious outcome inevitable.', 'context')],
    resolution: 'Resolved: verified maker, source artist, publisher, medium, broad date, accession, purchase, and rights record; distinguished print reception from a sitting and myth from fraud; preserved the ratio, mapped claims, and linked the current Hegel article.',
    lock: 'fnv1a64:58d1dc9a540fdc86',
  },
};

const reviewMethod = 'Galleries 16–17 supplemental review: exactly three concurrent GPT-5.6 Terra/High read-only evidence scopes of fourteen, fourteen, and thirteen non-overlapping exhibits were reconciled by the Sol parent across installed-object identity, attribution, dating, institution, provenance, rights, captions, alt text, claim-level sources, factual plaques, subject-specific guidance, canonical relationships, exact article actions, current review locks, natural-ratio mounting, and desktop, mobile, and staged-3D presentation.';

const visualReview = (id: string): NonNullable<NonNullable<MuseumSupplementalExhibit['review']>['visualReview']> => ({
  desktop: {reviewedOn: '2026-08-20', viewport: '1440×900', evidence: `Direct route inspected with the full uncropped object preview, three untitled sourced paragraphs, subject-specific guide, factual plaque relationship, exact article action, and no horizontal overflow. Evidence: docs/visual-validation/gallery-16-17-supplementals/desktop/${id}.png`},
  mobile: {reviewedOn: '2026-08-20', viewport: '390×844', evidence: `Direct route inspected with a wrapped factual title, aspect-safe object preview, scrollable interpretation, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-16-17-supplementals/mobile/${id}.png`},
  threeDimensional: {reviewedOn: '2026-08-20', viewport: '1280×720 fresh direct-route session', evidence: `Fresh direct-route session inspected after closing the detail view: authored viewpoint, factual two-level plaque, distinct installation, unobstructed working plaque activation, controls, and natural-ratio media mount. Evidence: docs/visual-validation/gallery-16-17-supplementals/staged-3d/${id}.png`},
});

const canonicalContext = (input: MuseumSupplementalExhibit): MuseumCanonicalContextRef => {
  if (input.articleRoute?.kind === 'branch') return {kind: 'branch', id: input.articleRoute.branchId};
  if (input.articleRoute?.kind === 'philosopher') return {kind: 'philosopher', id: input.articleRoute.philosopherId};
  throw new Error(`Gallery 16 supplemental exhibit ${input.id} lacks a canonical article route.`);
};

export const reviewGermanIdealismSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery 16 review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery 16 presentation for ${input.id}.`);
  const baseParagraphs = input.sections.map((section) => section.paragraphs.join(' '));
  if (baseParagraphs.length !== 3) throw new Error(`Gallery 16 supplemental exhibit ${input.id} must begin with exactly three paragraphs.`);
  const sourceIds = reviewed.sources.flatMap((source) => source.id ? [source.id] : []);
  const argumentSourceIds = reviewed.sources.flatMap((source) => source.id && source.kind !== 'collection-record' ? [source.id] : []);
  const guideSourceIds = (item: GuideItem) => item.sourceIds?.length ? item.sourceIds : sourceIds;
  return {
    ...input,
    dateLabel: reviewed.dateLabel,
    sections: baseParagraphs.map((paragraph, index) => ({heading: '', paragraphs: [`${paragraph} ${reviewed.additions[index]}`], sourceIds: index === 1 && argumentSourceIds.length ? argumentSourceIds : sourceIds})),
    sources: reviewed.sources,
    visitorGuide: [
      {heading: 'Inspect the object and its limits', items: reviewed.guide.slice(0, 2).map((item) => ({...item, sourceIds: guideSourceIds(item)}))},
      {heading: 'Follow the philosophical relation', items: reviewed.guide.slice(2).map((item) => ({...item, sourceIds: guideSourceIds(item)}))},
    ],
    objectInterpretation: reviewed.objectInterpretation,
    presentation: {
      ...input.presentation,
      panelKicker: 'Gallery 16 supplemental exhibit',
      proximityKicker: reviewed.plaqueTitle,
      factRows: [{label: 'Object', value: reviewed.plaqueTitle}, {label: 'Evidence', value: reviewed.dateLabel}, {label: 'Atlas route', value: reviewed.articleTitle}],
      articleActionLabel: `Read the full sourced ${reviewed.articleTitle} article`,
      exhibitLayout: 'object-led',
    },
    wallPlaque: {type: reviewed.plaqueType, title: reviewed.plaqueTitle, invitation: reviewed.invitation, canonicalContexts: [canonicalContext(input)]},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-20', method: reviewMethod, resolution: reviewed.resolution, lock: reviewed.lock, visualReview: visualReview(input.id)},
  };
};
