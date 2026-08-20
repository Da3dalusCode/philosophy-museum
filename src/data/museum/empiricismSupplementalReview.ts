import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';

type ReviewEvidence = {
  plaqueTitle: string;
  invitation: string;
  plaqueType: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['type'];
  canonicalContexts: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['canonicalContexts'];
  articleTitle: string;
  objectInterpretation: string;
  paragraphs: readonly [string, string, string];
  paragraphSourceIds: readonly [readonly string[], readonly string[], readonly string[]];
  sources: MuseumSupplementalExhibit['sources'];
  visitorGuide: NonNullable<MuseumSupplementalExhibit['visitorGuide']>;
  resolution: string;
  lock: string;
  overrides?: Partial<Pick<MuseumSupplementalExhibit,
    | 'displayName'
    | 'shortTitle'
    | 'workLabel'
    | 'dateLabel'
    | 'question'
    | 'frontSubtitle'
    | 'lead'
  >>;
};

const collection = (id: string, label: string, url: string) => ({id, label, url, kind: 'collection-record' as const});
const academic = (id: string, label: string, url: string) => ({id, label, url, kind: 'academic-reference' as const});
const primary = (id: string, label: string, url: string) => ({id, label, url, kind: 'primary-text' as const});

const evidence: Record<string, ReviewEvidence> = {
  'empiricism-micrographia-enlarged-sight': {
    plaqueTitle: 'Micrographia (1665), Open at the Flea Plate',
    plaqueType: 'work-or-text',
    canonicalContexts: [{kind: 'branch', id: 'empiricism'}],
    articleTitle: 'Empiricism',
    invitation: 'An open copy of Hooke’s Micrographia makes enlarged sight public through a chain of specimen, lens, drawing, engraving, book, and collection photograph.',
    objectInterpretation: 'The installed image is Wellcome Collection photograph L0043503 of an open Micrographia volume displaying Hooke’s fold-out flea plate, not the detached engraving suggested by its legacy identifier. The 1665 book image and later color photograph must be distinguished; the exact reproduction is licensed CC BY 4.0.',
    overrides: {
      displayName: 'Micrographia (1665), Open at the Flea Plate',
      shortTitle: 'The Open Micrographia',
      workLabel: 'OPEN BOOK · FOLD-OUT MICROSCOPY PLATE',
      dateLabel: 'Robert Hooke · book published 1665 · Wellcome Collection image L0043503',
      lead: 'The installed photograph shows an open volume and its fold-out flea plate. Its material layers reveal observation becoming portable evidence without turning a crafted representation into unmediated sight.',
    },
    paragraphs: [
      'The installed landscape image records an open copy of Robert Hooke’s Micrographia. Printed text occupies the left page while the immense engraved flea unfolds across the volume on the right. Wellcome Collection identifies the photograph as L0043503, and the Commons file supplies the exact CC BY 4.0 reproduction from which the scene and detail derivatives were made. The photograph’s date and the particular copy’s shelf history are not supplied, so the secure claims concern what the image shows, its collection source, and the book’s 1665 publication. It is neither the detached plate alone nor a photograph through Hooke’s microscope.',
      'Micrographia joined descriptions of instruments and procedures to spectacular images of ordinary materials transformed by magnification. Hooke’s flea becomes legible through a sequence: a specimen is prepared, illuminated, viewed repeatedly through imperfect lenses, described, drawn, translated into an engraving, folded into a book, and judged by readers. That mediation does not make the observation worthless. It makes the grounds of trust inspectable and shareable while exposing places where selection or distortion can enter. Early experimental knowledge depended on practiced observers, makers, printers, patrons, and readers as well as on the sensory encounter itself.',
      'The object therefore complicates a simple contrast between experience and reason. Observation is organized by questions, instruments, visual conventions, comparison, and inference; the printed image lets distant readers encounter a claim without independently reproducing every step. Hooke’s plate cannot by itself prove that anyone can repeat the observation, and the modern collection photograph adds another representational layer. Yet the open volume shows how empiricism could become a public discipline: evidence was not merely a private impression but something materially stabilized for criticism. The canonical article follows that tradition while preserving disputes about testimony, theory-laden seeing, experiment, and the reach of sensory warrant.',
    ],
    paragraphSourceIds: [['hooke-commons', 'hooke-wellcome'], ['micrographia-primary', 'experiment-sep'], ['micrographia-primary', 'experiment-sep']],
    sources: [
      collection('hooke-wellcome', 'Wellcome Collection — Micrographia item record', 'https://wellcomecollection.org/works/ajveb66y/items'),
      collection('hooke-commons', 'Wikimedia Commons — Wellcome L0043503 open Micrographia volume', 'https://commons.wikimedia.org/wiki/File:Robert_Hooke,_Micrographia,_flea_Wellcome_L0043503.jpg'),
      primary('micrographia-primary', 'Robert Hooke — Micrographia, Project Gutenberg', 'https://www.gutenberg.org/ebooks/15491'),
      academic('experiment-sep', 'Stanford Encyclopedia of Philosophy — Experiment in Physics', 'https://plato.stanford.edu/entries/physics-experiment/'),
    ],
    visitorGuide: [
      {heading: 'From lens to printed evidence', items: [
        {label: 'Open volume', description: 'The installed photograph includes text, binding, folds, and the enlarged plate rather than isolating the flea.', sourceIds: ['hooke-commons', 'hooke-wellcome']},
        {label: 'Mediated observation', description: 'Specimen, instrument, repeated looking, drawing, engraving, and publication all shape what readers can assess.', sourceIds: ['micrographia-primary', 'experiment-sep']},
      ]},
      {heading: 'Limits of the flea image', items: [
        {label: 'Not a microscope photograph', description: 'The plate is an engraved translation of observations, and the installed color image is a later collection photograph.', sourceIds: ['hooke-commons']},
        {label: 'Public but not self-verifying', description: 'Print widens access to a claim without guaranteeing that every reader has repeated the experiment.', sourceIds: ['experiment-sep']},
      ]},
    ],
    resolution: 'Resolved: identified the installed bytes as an open Micrographia volume, separated the 1665 engraving from the later Wellcome photograph, retained CC BY 4.0 attribution, corrected the one-pixel derivative and natural mount, sourced three object-led paragraphs, and linked the current Empiricism article.',
    lock: 'fnv1a64:29ba3c0205d383ca',
  },
  'locke-molyneux-crossmodal-vision': {
    plaqueTitle: 'Jusepe de Ribera, The Sense of Touch, c. 1615–16',
    plaqueType: 'concept-argument-diagram-or-method',
    canonicalContexts: [{kind: 'philosopher', id: 'locke'}],
    articleTitle: 'Locke',
    invitation: 'Ribera’s tactile allegory predates Molyneux’s question and helps distinguish recognizing shape by touch from recognizing it at first sight.',
    objectInterpretation: 'The installed portrait-format work is Jusepe de Ribera’s The Sense of Touch, c. 1615–16, Norton Simon Museum F.1965.1.052.P. It is an earlier allegory of touch and a painting–sculpture comparison, not an illustration of Molyneux, Locke, Cheselden, or restored vision.',
    overrides: {
      displayName: 'Molyneux’s Question and The Sense of Touch',
      shortTitle: 'Molyneux’s Question',
      workLabel: 'CONTEXT PAINTING · TOUCH AND SIGHT',
      dateLabel: 'Jusepe de Ribera · c. 1615–16 · Norton Simon Museum, F.1965.1.052.P',
      lead: 'Ribera’s blind figure explores a sculpted head by touch while a painting rests nearby. The earlier allegory makes a sensory distinction visible but supplies no experimental answer to Molyneux’s later question.',
    },
    paragraphs: [
      'Ribera’s painting shows a blind man handling a sculpted head while a painted image rests beside him. The Norton Simon Museum dates The Sense of Touch to about 1615–16, identifies it as oil on canvas, assigns accession F.1965.1.052.P, and traces its provenance. The work belongs to a series concerning the senses and to a rivalry between painting and sculpture, not to Locke’s Essay. It predates William Molyneux’s 1688 question by more than seventy years. The museum reserves rights in its current digital image, while the installed Commons derivative is marked public domain; those claims describe different files in the source chain.',
      'Molyneux asked whether a person born blind who learned to distinguish a cube from a sphere by touch would identify them by sight immediately after gaining vision. Locke answered no because the person had not yet learned which visible appearances correspond to which tactile shapes. The problem tests whether spatial recognition transfers across sensory modalities or depends on acquired associations. It is not simply a question about naming, and it cannot be settled by staring at Ribera’s figure. Historical reports of restored sight, including Cheselden’s later case, raised further methodological problems about surgery, visual capacity, questioning, learning, and what observers believed a patient’s responses meant.',
      'The object helps because it refuses to collapse touch into sight: hands encounter weight, volume, and surface while painting offers an appearance to vision. Yet Ribera was constructing an allegory, not recording controlled cross-modal research. Modern philosophy and perceptual science continue to dispute what counts as recognition, how quickly learning occurs, and whether different spatial capacities transfer together. The question also concerns a disabled person whose experience is often treated only as a test for sighted theorists. A responsible reading separates the painting’s art history, Locke’s claim about learned correspondence, later clinical reports, and contemporary evidence rather than making one image answer all four.',
    ],
    paragraphSourceIds: [['ribera-norton'], ['molyneux-sep', 'locke-essay'], ['ribera-norton', 'molyneux-sep']],
    sources: [
      collection('ribera-norton', 'Norton Simon Museum — The Sense of Touch', 'https://www.nortonsimon.org/art/detail/F.1965.1.052.P/'),
      primary('locke-essay', 'John Locke — An Essay Concerning Human Understanding', 'https://www.gutenberg.org/ebooks/10615'),
      academic('molyneux-sep', 'Stanford Encyclopedia of Philosophy — Molyneux’s Problem', 'https://plato.stanford.edu/entries/molyneux-problem/'),
    ],
    visitorGuide: [
      {heading: 'Separating the sensory tasks', items: [
        {label: 'Tactile recognition', description: 'The imagined learner can already distinguish cube and sphere by handling their shape.', sourceIds: ['locke-essay', 'molyneux-sep']},
        {label: 'First visual recognition', description: 'The disputed step is immediate identification by sight before new cross-modal learning.', sourceIds: ['molyneux-sep']},
      ]},
      {heading: 'What Ribera can establish', items: [
        {label: 'Earlier allegory', description: 'The painting predates the question and belongs to artistic comparison between tactile sculpture and visual painting.', sourceIds: ['ribera-norton']},
        {label: 'No experimental result', description: 'A composed scene cannot report the outcome of surgery, testing, or later perceptual research.', sourceIds: ['ribera-norton', 'molyneux-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Ribera’s object, accession, date, medium, provenance, source-chain rights distinction, and natural portrait ratio; bounded it as pre-Molyneux context; mapped the argument to primary and scholarly evidence; and linked the current Locke article.',
    lock: 'fnv1a64:96143a453a281a3e',
  },
  'locke-consciousness-prince-cobbler': {
    plaqueTitle: 'David Teniers the Younger, A Cobbler in His Workshop, 1671',
    plaqueType: 'concept-argument-diagram-or-method',
    canonicalContexts: [{kind: 'philosopher', id: 'locke'}],
    articleTitle: 'Locke',
    invitation: 'A period workshop gives social texture to Locke’s prince-and-cobbler exchange while the Essay, not the painting, carries the argument about consciousness and personhood.',
    objectInterpretation: 'The installed work is David Teniers the Younger’s signed 1671 A Cobbler in His Workshop. Its Commons/private-market record supports identity, date, medium, and dimensions, but a responsible present holding and full provenance are not independently documented.',
    overrides: {
      displayName: 'The Prince and the Cobbler',
      shortTitle: 'Prince and Cobbler',
      workLabel: 'THOUGHT EXPERIMENT · PERIOD WORKSHOP CONTEXT',
      dateLabel: 'David Teniers the Younger · 1671 · present holding unverified',
      lead: 'Teniers’s workshop is not Locke’s imagined case. It places skilled labor and rank beside a thought experiment asking what follows a person when consciousness and body are separated in imagination.',
    },
    paragraphs: [
      'Shoes, tools, leather, baskets, and household goods surround a seated cobbler in the installed portrait-format painting. The source identifies David Teniers the Younger, the title A Cobbler in His Workshop, the date 1671, oil on canvas, a signature, and dimensions. It comes through a private-market record reproduced on Commons rather than a current collection catalog. The present owner, intervening provenance, and custody of the original are therefore unresolved and must not be invented. Teniers painted a genre scene, not Locke’s prince-and-cobbler case, and nothing in the image depicts transferred consciousness, memory, or a princely life.',
      'Locke distinguishes a human organism from a person. A living human remains the same organism through continuous organized life, while personal identity reaches as far as consciousness can extend backward to past action and thought. The prince-and-cobbler example imagines the prince’s consciousness entering the cobbler’s body: ordinary accountability would follow the conscious person, even though observers might still call the body a cobbler. The example does not describe cellular change, a literal medical procedure, or a theory that memory alone creates identity. Locke’s shifting language about consciousness, appropriation, and forensic responsibility has generated continuing disputes about circularity, gaps, duplication, and forgotten actions.',
      'The workshop makes social classification tangible. Clothing, tools, labor, and surroundings help others recognize a cobbler, precisely the kind of bodily and social evidence that the imagined exchange disrupts. That contrast can clarify the example without making class a decorative metaphor: legal praise and blame attach to persons living within institutions that identify bodies, names, and ranks. The painting cannot decide whether Locke’s account survives amnesia, false memory, or multiple continuers. It instead gives the thought experiment a bounded historical companion while the Essay supplies the claim. Because the object’s current custody is uncertain, its own documentary limit remains visible alongside the philosophical uncertainty it helps stage.',
    ],
    paragraphSourceIds: [['cobbler-commons'], ['locke-identity-sep', 'locke-essay'], ['cobbler-commons', 'locke-identity-sep']],
    sources: [
      collection('cobbler-commons', 'Wikimedia Commons — Teniers, A Cobbler in His Workshop', 'https://commons.wikimedia.org/wiki/File:David_Teniers_(II)_-_A_cobbler_in_his_workshop.jpg'),
      primary('locke-essay', 'John Locke — An Essay Concerning Human Understanding', 'https://www.gutenberg.org/ebooks/10615'),
      academic('locke-identity-sep', 'Stanford Encyclopedia of Philosophy — Locke on Personal Identity', 'https://plato.stanford.edu/entries/locke-personal-identity/'),
    ],
    visitorGuide: [
      {heading: 'Keeping Locke’s identities apart', items: [
        {label: 'Human organism', description: 'Sameness of living organization is not identical to the reach of personal consciousness.', sourceIds: ['locke-essay', 'locke-identity-sep']},
        {label: 'Forensic person', description: 'Locke connects personhood to responsibility, praise, punishment, and the appropriation of actions.', sourceIds: ['locke-identity-sep']},
      ]},
      {heading: 'Workshop evidence and its limit', items: [
        {label: 'Social recognition', description: 'Tools, dress, and labor make the cobbler’s public identity legible before the imagined exchange.', sourceIds: ['cobbler-commons']},
        {label: 'Unverified custody', description: 'The source supports the object’s basic identity but not its present owner or a complete provenance chain.', sourceIds: ['cobbler-commons']},
      ]},
    ],
    resolution: 'Resolved: kept Teniers’s 1671 workshop distinct from Locke’s imagined exchange, removed anachronistic cellular language, stated the unverified holding and provenance, mounted the installed bytes naturally, claim-mapped three paragraphs, and linked the current Locke article.',
    lock: 'fnv1a64:0025c9695a963ffb',
  },
  'locke-rights-property-carolina': {
    plaqueTitle: 'Ogilby and Lamb, A New Description of Carolina, c. 1680',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'locke'}],
    articleTitle: 'Locke',
    invitation: 'A near-contemporary colonial map places Locke’s theory of property beside offices and institutions that administered land, dispossession, and slavery.',
    objectInterpretation: 'The installed map is John Ogilby and Francis Lamb’s A New Description of Carolina, c. 1680, from UNC’s North Carolina Maps collection. No evidence shows that Locke owned, commissioned, consulted, or contributed to this particular sheet.',
    overrides: {
      displayName: 'A New Description of Carolina',
      shortTitle: 'Carolina, Property, and Office',
      workLabel: 'COLONIAL MAP · POLITICAL CONTEXT',
      dateLabel: 'John Ogilby and Francis Lamb · c. 1680 · UNC North Carolina Maps',
      lead: 'Ogilby and Lamb’s map is not Locke’s document. It provides near-contemporary colonial geography for examining his property theory, Carolina service, contested authorship, and the limits of universal rights.',
    },
    paragraphs: [
      'The installed landscape engraving charts Carolina’s coast, rivers, settlements, neighboring territories, and an elaborate title cartouche. UNC’s North Carolina Maps record and the Commons file identify John Ogilby and engraver Francis Lamb, date the sheet to about 1680, and support its public-domain reproduction. A map records claims, routes, names, and administrative knowledge; it does not transparently represent Indigenous land relations or the violence by which mapped possession became enforceable. No surviving evidence presented here links Locke personally to this sheet. It is therefore colonial cartographic context, not his map, his commission, or proof that one image caused a philosophical doctrine.',
      'In the Second Treatise, Locke argues that persons have property in themselves and may acquire external property by mixing labor with resources, initially under limits concerning spoilage and leaving enough and as good for others. Money, consent, political authority, conquest, and prerogative complicate the account. Locke also served as secretary to the Lords Proprietors of Carolina and later as a commissioner of the Board of Trade and Plantations; calling him secretary to both bodies would conflate distinct offices. Scholarship disputes the exact authorship and significance of the Fundamental Constitutions and how Locke’s colonial work bears on the scope and operation of his political theory.',
      'The map makes the dispute harder to isolate as abstract inconsistency. Its bounded territories and European place-names belong to institutions that converted land into administrable and transferable claims while slavery structured colonial wealth. Locke’s language of natural equality and rights sits beside work for colonial proprietors and participation in investments tied to enslavement. That history neither makes every proposition in the Treatises a coded map legend nor permits biography to be excluded from interpretation. A careful account distinguishes textual argument, documented office, contested authorship, and broader structures. It also states uncertainty where evidence does not support a direct causal path between this exact object and Locke’s words.',
    ],
    paragraphSourceIds: [['carolina-unc', 'carolina-commons'], ['locke-treatises', 'locke-political-sep'], ['locke-political-sep', 'carolina-unc']],
    sources: [
      collection('carolina-unc', 'UNC North Carolina Maps — A New Description of Carolina', 'https://dc.lib.unc.edu/cdm/ref/collection/ncmaps/id/498'),
      collection('carolina-commons', 'Wikimedia Commons — Ogilby and Lamb Carolina map', 'https://commons.wikimedia.org/wiki/File:A_New_Description_of_Carolina.jpg'),
      primary('locke-treatises', 'John Locke — Two Treatises of Government, Online Library of Liberty', 'https://oll.libertyfund.org/titles/locke-the-two-treatises-of-civil-government-hollis-ed'),
      academic('locke-political-sep', 'Stanford Encyclopedia of Philosophy — Locke’s Political Philosophy', 'https://plato.stanford.edu/entries/locke-political/'),
    ],
    visitorGuide: [
      {heading: 'Reading the colonial map', items: [
        {label: 'Mapped claims', description: 'Coasts, rivers, settlements, and borders organize territory through a European administrative frame.', sourceIds: ['carolina-unc', 'carolina-commons']},
        {label: 'No personal link', description: 'The evidence does not show that Locke owned, used, commissioned, or helped make this sheet.', sourceIds: ['carolina-unc']},
      ]},
      {heading: 'Testing the property argument', items: [
        {label: 'Acquisition and limits', description: 'Labor, spoilage, sufficiency, money, consent, and jurisdiction belong to the full textual dispute.', sourceIds: ['locke-treatises', 'locke-political-sep']},
        {label: 'Distinct offices', description: 'Locke served Carolina’s proprietors and later the Board of Trade in different institutional capacities.', sourceIds: ['locke-political-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Ogilby and Lamb’s UNC map, treated it as colonial context rather than Locke’s object, corrected the conflated offices, stated the disputed connections among theory, land, and slavery, restored the natural ratio, mapped all claims, and linked the current Locke article.',
    lock: 'fnv1a64:b06b0027925e7c2f',
  },
  'berkeley-vision-learned-distance': {
    plaqueTitle: 'Jobst Bürgi, Perspective-Drawing Device, 1604 (?)',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'philosopher', id: 'berkeley'}],
    articleTitle: 'George Berkeley',
    invitation: 'Bürgi’s perspective device separates geometrical projection from Berkeley’s claim that visible ideas become signs of tactile distance through experience.',
    objectInterpretation: 'The installed photograph shows Jobst Bürgi’s perspective-drawing device, dated 1604 (?) by the Kunsthistorisches Museum, Kunstkammer KK 788. Wolfgang Sauber’s 2010 photograph is CC BY-SA 3.0; the instrument predates Berkeley and is not known to have been used by him.',
    overrides: {
      displayName: 'Perspective-Drawing Device and Learned Distance',
      shortTitle: 'Learned Distance',
      workLabel: 'SCIENTIFIC INSTRUMENT · OPTICAL CONTEXT',
      dateLabel: 'Jobst Bürgi · 1604 (?) · Kunsthistorisches Museum, KK 788',
      lead: 'A surviving perspective device controls projection on a drawing surface. Berkeley’s theory addresses a different problem: how visual and tactile ideas become coordinated signs rather than delivering distance immediately.',
    },
    paragraphs: [
      'Brass arms, sights, and a drawing surface assemble into the device shown in the installed photograph. The Kunsthistorisches Museum identifies it as a perspective-drawing instrument by Jobst Bürgi, dates it 1604 with a question mark, and assigns Kunstkammer inventory KK 788. The museum describes it as a Prague scientific instrument; “Kassel, 1604” is therefore too definite as an object date and place. Wolfgang Sauber made the displayed photograph in 2010 and released it under CC BY-SA 3.0. The apparatus predates Berkeley by decades, and no evidence shows he handled, cited, or designed it. Its provenance and photographic license belong to the object record, not to Berkeley’s theory.',
      'Berkeley’s New Theory of Vision argues that distance is not immediately seen. Visible ideas such as color, light, and apparent magnitude are distinct from tactile ideas of extension, resistance, and movement. Through repeated experience, the former come to function as signs of the latter, much as words prompt expectations without resembling what they signify. This is why “retinal ideas” is an unhelpful modernization of his vocabulary: Berkeley is analyzing relations among visible and tangible ideas, not offering a physiological account of the retina. He also distinguishes this learned coordination from geometrical optics, whose lines and angles can calculate projection without describing what ordinary perception directly contains.',
      'Bürgi’s device makes that distinction concrete because it fixes a viewpoint and mechanically relates sightlines to marks on a plane. It can demonstrate how a representation is constructed, but it cannot establish how an infant, newly sighted person, or practiced observer experiences space. Nor does it prove Berkeley’s immaterialism, which rests on further arguments. The instrument is best used as a controlled contrast: geometrical projection specifies relations an artisan can build, while perceptual learning concerns expectations formed across sensory experience. The uncertainty in the museum’s 1604 (?) date and the absence of a Berkeley connection remain part of the interpretation rather than obstacles concealed by a polished photograph.',
    ],
    paragraphSourceIds: [['burgi-khm', 'burgi-commons'], ['vision-primary', 'berkeley-sep'], ['burgi-khm', 'vision-primary']],
    sources: [
      collection('burgi-khm', 'Kunsthistorisches Museum — Perspective-Drawing Device, KK 788', 'https://www.khm.at/en/artworks/perspective-drawing-device-86987'),
      collection('burgi-commons', 'Wikimedia Commons — Wolfgang Sauber photograph of Bürgi’s device', 'https://commons.wikimedia.org/wiki/File:Perspektive_Zeichenger%C3%A4t.jpg'),
      primary('vision-primary', 'George Berkeley — An Essay Towards a New Theory of Vision', 'https://www.gutenberg.org/ebooks/4722'),
      academic('berkeley-sep', 'Stanford Encyclopedia of Philosophy — George Berkeley', 'https://plato.stanford.edu/entries/berkeley/'),
    ],
    visitorGuide: [
      {heading: 'Distinguishing projection and perception', items: [
        {label: 'Fixed sightline', description: 'The apparatus materially relates a chosen viewpoint to marks on a drawing surface.', sourceIds: ['burgi-khm']},
        {label: 'Learned signs', description: 'Berkeley treats visible ideas as acquired signs for tactile expectations rather than immediate distance.', sourceIds: ['vision-primary', 'berkeley-sep']},
      ]},
      {heading: 'Boundaries of the comparison', items: [
        {label: 'Not Berkeley’s instrument', description: 'The device predates him, and no source connects it to his use or authorship.', sourceIds: ['burgi-khm', 'burgi-commons']},
        {label: 'Qualified date', description: 'The holding museum gives 1604 with uncertainty, so the exhibit preserves the question mark.', sourceIds: ['burgi-khm']},
      ]},
    ],
    resolution: 'Resolved: verified Bürgi’s KK 788 instrument and licensed photographer, corrected the place/date overstatement to 1604 (?), used Berkeley’s visible and tactile vocabulary, bounded the comparison, preserved the natural ratio, mapped every claim, and linked the current George Berkeley article.',
    lock: 'fnv1a64:a1a70e61cd3621c0',
  },
  'berkeley-perception-and-object': {
    plaqueTitle: 'Gijsbrechts, The Reverse of a Framed Painting, 1668–72',
    plaqueType: 'concept-argument-diagram-or-method',
    canonicalContexts: [{kind: 'philosopher', id: 'berkeley'}],
    articleTitle: 'George Berkeley',
    invitation: 'Gijsbrechts’s painted reverse tests perception and inference without turning Berkeley’s immaterialism into the claim that ordinary objects are private illusions.',
    objectInterpretation: 'The installed work is Cornelis Norbertus Gijsbrechts’s Trompe l’oeil: The Reverse of a Framed Painting, 1668–72, oil on canvas, Statens Museum for Kunst KMS1989. The complete natural-ratio image shows a painted object whose subject is the apparent back of another painting.',
    overrides: {
      displayName: 'The Reverse of a Framed Painting',
      shortTitle: 'Perception and Object',
      workLabel: 'TROMPE-L’ŒIL PAINTING · PERCEPTUAL CONTEXT',
      dateLabel: 'Cornelis Norbertus Gijsbrechts · 1668–72 · SMK, KMS1989',
      lead: 'Gijsbrechts paints canvas, stretcher, tacks, and label so that one painted surface appears to be another object’s reverse. The deception sharpens a Berkeleyan question without proving his answer.',
    },
    paragraphs: [
      'The installed painting imitates a wooden stretcher, folded canvas edges, tacks, shadows, and an inventory label. Statens Museum for Kunst identifies Cornelis Norbertus Gijsbrechts, dates the oil on canvas to 1668–72, and records inventory KMS1989; the Commons derivative is marked public domain. The whole rectangular composition matters because the painted boundary helps masquerade as the back of a framed object. This is not a photograph of a canvas reverse and not a damaged image shown backward. It is a deliberately crafted trompe-l’œil whose museum identity, material support, acquisition history, and reproduction rights can be checked independently of its philosophical use.',
      'Berkeley argues that sensible objects are collections of ideas perceived in regular and coherent ways, not effects supported by an unknowable material substance existing outside all perception. He does not conclude that ordinary tables, trees, or paintings are mere hallucinations or that each person invents a private world. Stable order, shared language, embodied action, and divine coordination distinguish ordinary experience from imagination. Gijsbrechts’s deception can reveal that perception involves expectation and inference: viewers initially classify the surface as an object’s reverse, then revise the judgment. But a corrected misidentification of one painting is not an argument that material substance is impossible.',
      'The work’s value is diagnostic rather than demonstrative. It lets visitors distinguish what is immediately presented—the colors, edges, highlights, and shadows—from what those features prompt them to take the thing to be. Once the deception is known, the same visible arrangement supports a different object judgment. Berkeley’s account asks how far such analysis extends and whether positing mind-independent material substance explains anything beyond ordered sensible experience. Critics dispute his arguments about abstraction, resemblance, continuity, and other minds. The painting settles none of those disputes. It supplies a controlled occasion for examining perceptual commitment while remaining an earlier work with no documented connection to Berkeley.',
    ],
    paragraphSourceIds: [['gijsbrechts-smk', 'gijsbrechts-commons'], ['dialogues-primary', 'berkeley-sep'], ['gijsbrechts-smk', 'dialogues-primary', 'berkeley-sep']],
    sources: [
      collection('gijsbrechts-smk', 'Statens Museum for Kunst — The Reverse of a Framed Painting, KMS1989', 'https://collection.smk.dk/#/en/detail/KMS1989'),
      collection('gijsbrechts-commons', 'Wikimedia Commons — Gijsbrechts reverse trompe-l’œil', 'https://commons.wikimedia.org/wiki/File:Cornelius_Norbertus_Gijsbrechts_-_Trompe_l%27oeil._The_Reverse_of_a_Framed_Painting_-_Google_Art_Project.jpg'),
      primary('dialogues-primary', 'George Berkeley — Three Dialogues between Hylas and Philonous', 'https://www.gutenberg.org/ebooks/4724'),
      academic('berkeley-sep', 'Stanford Encyclopedia of Philosophy — George Berkeley', 'https://plato.stanford.edu/entries/berkeley/'),
    ],
    visitorGuide: [
      {heading: 'Testing the painted reverse', items: [
        {label: 'Visible cues', description: 'Edges, tacks, wood grain, shadow, and label prompt a confident but revisable object judgment.', sourceIds: ['gijsbrechts-smk']},
        {label: 'Material painting', description: 'The museum object is itself oil on canvas even though its subject imitates another canvas’s back.', sourceIds: ['gijsbrechts-smk', 'gijsbrechts-commons']},
      ]},
      {heading: 'Keeping Berkeley’s claim bounded', items: [
        {label: 'Ordinary reality', description: 'Immaterialism does not reduce stable shared experience to arbitrary private fantasy.', sourceIds: ['dialogues-primary', 'berkeley-sep']},
        {label: 'Analogy, not proof', description: 'One successful trompe-l’œil cannot establish the rejection of material substance.', sourceIds: ['berkeley-sep']},
      ]},
    ],
    resolution: 'Resolved: verified the SMK object, date, medium, inventory, provenance source, rights, caption, alt, and natural ratio; kept the perceptual analogy modest; supplied three mapped paragraphs and a specific guide; and linked the current George Berkeley article.',
    lock: 'fnv1a64:886d823bc54ac99f',
  },
  'berkeley-bermuda-college-project': {
    plaqueTitle: 'John Smibert, The Bermuda Group, 1728, Reworked 1739',
    plaqueType: 'paired-or-grouped-historical-figures',
    canonicalContexts: [{kind: 'philosopher', id: 'berkeley'}],
    articleTitle: 'George Berkeley',
    invitation: 'Smibert’s group portrait gathers people associated with Berkeley’s unbuilt college scheme while its Atlantic setting requires attention to missionary colonialism and documented slaveholding.',
    objectInterpretation: 'The installed work is John Smibert’s The Bermuda Group, begun in 1728 and reworked in 1739, Yale University Art Gallery 1808.1. It includes Berkeley, members of his family, Smibert, and associates, but does not document every sitter’s exact role in the abandoned plan.',
    overrides: {
      displayName: 'The Bermuda Group',
      shortTitle: 'Berkeley’s Bermuda Project',
      workLabel: 'GROUP PORTRAIT · ATLANTIC COLONIAL CONTEXT',
      dateLabel: 'John Smibert · begun 1728, reworked 1739 · Yale, 1808.1',
      lead: 'Smibert’s portrait is associated with Berkeley’s plan for an Atlantic college. Reading it responsibly joins named people and patronage to missionary aims, imperial power, Whitehall, and documented enslavement.',
    },
    paragraphs: [
      'Adults and children assemble around George Berkeley in John Smibert’s large group portrait. Yale University Art Gallery identifies the work as The Bermuda Group (Dean Berkeley and His Entourage), accession 1808.1, begun in 1728 and reworked in 1739. Named figures include Berkeley, Anne and Henry Berkeley, Smibert, and people connected with the scheme and its patronage network. The installed Commons derivative is marked public domain, while Yale applies terms to its own current digital images; those source statements should remain distinct. A portrait can establish iconography and association, but it does not prove each sitter’s precise institutional role, motive, or agreement.',
      'Berkeley proposed a college in Bermuda intended to educate colonial settlers and convert Indigenous people to Christianity. Funding did not arrive as expected, the college was never built, and Berkeley eventually left Rhode Island. The project belonged to British imperial, missionary, and patronage structures rather than a neutral expansion of learning. Whitehall was Berkeley’s Rhode Island estate, not the planned college, and documentary research establishes that he enslaved people there. These facts matter to his biography and moral evaluation. They should be sourced independently rather than inferred from facial expressions, arrangement, clothing, or the mere presence of household members in Smibert’s composition.',
      'The painting thus exposes a tension between philosophical universality and situated projects. Berkeley’s writings on perception do not straightforwardly entail his educational plan, yet his intellectual life included clerical office, fundraising, travel, property, and colonial hierarchy. The portrait can broaden the unit of analysis beyond an isolated author without becoming a complete map of responsibility. It is also a work revised over time, so its 1728/1739 material history complicates the idea of one frozen departure scene. A responsible account names documented slaveholding and missionary colonialism, preserves uncertainty about individual roles, and resists using elegant collective portraiture to naturalize unequal Atlantic relations.',
    ],
    paragraphSourceIds: [['bermuda-yale', 'bermuda-commons', 'bermuda-si'], ['berkeley-tcd', 'berkeley-sep'], ['bermuda-yale', 'berkeley-tcd', 'berkeley-sep']],
    sources: [
      collection('bermuda-yale', 'Yale University Art Gallery — The Bermuda Group, 1808.1', 'https://artgallery.yale.edu/collections/objects/21'),
      collection('bermuda-commons', 'Wikimedia Commons — Smibert, The Bermuda Group', 'https://commons.wikimedia.org/wiki/File:John_Smibert_-_The_Bermuda_Group_(Dean_Berkeley_and_His_Entourage)_-_1808.1_-_Yale_University_Art_Gallery.jpg'),
      collection('bermuda-si', 'Smithsonian — The Bermuda Group collection record', 'https://www.si.edu/object/siris_ari_37414'),
      academic('berkeley-tcd', 'Trinity College Dublin — Berkeley legacies evidence review', 'https://www.tcd.ie/seniordean/legacies/berkeleyTLRWGworkingpaper.pdf'),
      academic('berkeley-sep', 'Stanford Encyclopedia of Philosophy — George Berkeley', 'https://plato.stanford.edu/entries/berkeley/'),
    ],
    visitorGuide: [
      {heading: 'Identifying the group', items: [
        {label: '1728 and 1739', description: 'The portrait was begun near the project’s active period and later reworked rather than completed in one moment.', sourceIds: ['bermuda-yale', 'bermuda-si']},
        {label: 'Named association', description: 'Collection records identify Berkeley, family members, Smibert, and associates without proving every role.', sourceIds: ['bermuda-yale', 'bermuda-si']},
      ]},
      {heading: 'Atlantic responsibilities', items: [
        {label: 'Unbuilt college', description: 'The Bermuda institution remained a missionary colonial proposal rather than an operating school.', sourceIds: ['berkeley-sep', 'berkeley-tcd']},
        {label: 'Whitehall slaveholding', description: 'Specialist documentary research, not the portrait alone, establishes Berkeley’s Rhode Island enslavement.', sourceIds: ['berkeley-tcd']},
      ]},
    ],
    resolution: 'Resolved: verified Smibert’s begun/reworked dates, Yale accession, sitters, source-chain rights, and natural ratio; named the project’s missionary colonialism and Whitehall slaveholding from specialist evidence; bounded portrait inference; and linked the current George Berkeley article.',
    lock: 'fnv1a64:e63854b6e4b2be3e',
  },
  'berkeley-camera-obscura-signs': {
    plaqueTitle: 'Charles-Amédée-Philippe van Loo, The Camera Obscura, 1764',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'berkeley'}],
    articleTitle: 'George Berkeley',
    invitation: 'Van Loo’s woman and two children examine a camera obscura in 1764, offering later optical context for Berkeley’s account of ordered and learned signs.',
    objectInterpretation: 'The installed nearly square painting is Van Loo’s The Camera Obscura, 1764, National Gallery of Art 1945.10.1. It shows a woman and two children at the device; the former accession, dog, and generic crowd description conflicted with the authoritative bytes and NGA record.',
    overrides: {
      displayName: 'The Camera Obscura',
      shortTitle: 'Ordered Optical Signs',
      workLabel: 'LATER CONTEXT PAINTING · OPTICAL APPARATUS',
      dateLabel: 'Charles-Amédée-Philippe van Loo · 1764 · NGA, 1945.10.1',
      lead: 'Van Loo’s 1764 scene postdates Berkeley’s major works. A woman and two children peer into a camera obscura, making the apparatus a later analogy for constrained appearances rather than evidence Berkeley used it.',
    },
    paragraphs: [
      'A seated woman and two children look through an oval opening into a wooden camera obscura in the installed image. The National Gallery of Art identifies Charles-Amédée-Philippe van Loo, the title The Camera Obscura, the year 1764, oil on canvas, and accession 1945.10.1; its open-access media are public domain. Those facts correct a materially wrong accession, 1942.9.37, and an alt description that invented a dog and an undifferentiated crowd. The installed bytes are decisive about depicted figures. NGA’s provenance record supports the object history, while the nearly square natural ratio preserves the complete staged viewing apparatus.',
      'Berkeley treats visual ideas as signs that, through regular experience, guide expectations about touch, movement, and other sensations. A sign need not resemble what it indicates. The order of experience is not arbitrary, and Berkeley distinguishes vivid, coherent perceptions from voluntary imagination. Van Loo’s apparatus can clarify one bounded feature of that account: an image depends on organized causal conditions and learned practices of looking. Yet a physical camera cannot prove that matter is philosophically dispensable, and Berkeley did not use this 1764 painting as an argument. His Principles provide the doctrine; the object supplies later cultural context for optical mediation and social demonstration.',
      'The scene also reminds viewers that instruments are encountered through instruction and shared attention. The children’s positions, the woman’s guidance, the darkened enclosure, and the viewing aperture organize what becomes visible. That social arrangement is suggestive, not a transcript of Berkeleyan pedagogy or evidence for an eighteenth-century consensus about perception. Because the painting was made eleven years after Berkeley’s death, it belongs to later reception context rather than his working world. Reading it responsibly therefore requires two corrections at once: describe the actual woman and children rather than a fictional dog, and resist converting a visually apt analogy into a claim of historical influence or philosophical demonstration.',
    ],
    paragraphSourceIds: [['camera-nga', 'camera-commons'], ['principles-primary', 'berkeley-sep'], ['camera-nga', 'berkeley-sep']],
    sources: [
      collection('camera-nga', 'National Gallery of Art — The Camera Obscura, 1945.10.1', 'https://www.nga.gov/artworks/32578-camera-obscura'),
      collection('camera-commons', 'Wikimedia Commons — Van Loo, The Camera Obscura', 'https://commons.wikimedia.org/wiki/File:Van_Loo_The_Camera_Obscura_1764.jpg'),
      primary('principles-primary', 'George Berkeley — A Treatise Concerning the Principles of Human Knowledge', 'https://www.gutenberg.org/ebooks/4723'),
      academic('berkeley-sep', 'Stanford Encyclopedia of Philosophy — George Berkeley', 'https://plato.stanford.edu/entries/berkeley/'),
    ],
    visitorGuide: [
      {heading: 'Checking the depicted apparatus', items: [
        {label: 'Actual figures', description: 'NGA and the installed bytes show a woman and two children, with no dog in the scene.', sourceIds: ['camera-nga', 'camera-commons']},
        {label: 'Correct accession', description: 'The National Gallery of Art records the painting as 1945.10.1 and releases its media openly.', sourceIds: ['camera-nga']},
      ]},
      {heading: 'Using the optical analogy', items: [
        {label: 'Ordered signs', description: 'Regular visible experience supports learned expectations without requiring resemblance between sign and meaning.', sourceIds: ['principles-primary', 'berkeley-sep']},
        {label: 'Later context', description: 'The 1764 painting postdates Berkeley and is neither his apparatus nor evidence for direct influence.', sourceIds: ['camera-nga', 'berkeley-sep']},
      ]},
    ],
    resolution: 'Resolved: reconciled the installed figures and device against the false dog/crowd copy, corrected NGA accession 1945.10.1 and object URL, verified public-domain media and provenance, preserved the natural ratio, bounded later reception, claim-mapped all prose, and linked the current George Berkeley article.',
    lock: 'fnv1a64:06e77156e7d6aae9',
  },
  'berkeley-siris-tar-water-chain': {
    plaqueTitle: 'Otto Wilhelm Thomé, Pinus sylvestris, 1885',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'berkeley'}],
    articleTitle: 'George Berkeley',
    invitation: 'Thomé’s later Scots-pine plate marks the botanical edge of Siris while remaining neither Berkeley’s ingredient record nor present-day medical advice.',
    objectInterpretation: 'The installed image is Otto Wilhelm Thomé’s 1885 Pinus sylvestris botanical plate from Flora von Deutschland, Österreich und der Schweiz. It is a later published illustration without a particular holding exemplar, not evidence for the exact botanical source or recipe of Berkeley’s tar water.',
    overrides: {
      displayName: 'Siris and a Later Scots-Pine Plate',
      shortTitle: 'Siris and Tar Water',
      workLabel: 'LATER BOTANICAL PLATE · TEXTUAL CONTEXT',
      dateLabel: 'Otto Wilhelm Thomé · Pinus sylvestris · published 1885',
      lead: 'A nineteenth-century Scots-pine plate stands beside Berkeley’s Siris as explicit later context. The image cannot identify his tar source, validate his medical claims, or supply a treatment.',
    },
    paragraphs: [
      'The installed portrait image arranges a Scots-pine branch, paired needles, cones, seed scales, roots, and reproductive details. Commons identifies it as Otto Wilhelm Thomé’s Pinus sylvestris plate, published in 1885 in Flora von Deutschland, Österreich und der Schweiz, and marks it public domain. The record concerns an edition image rather than a named museum object, shelfmark, or securely traced physical copy. It was produced more than a century after Berkeley’s Siris. The plate cannot establish which pine species supplied the tar Berkeley discussed, how the historical preparation was made, or what material he actually handled.',
      'Siris begins with tar water and moves through discussions of chemistry, medicine, natural philosophy, spirit, and metaphysics in a deliberately ascending chain. Berkeley attributes extensive benefits to the preparation, but historical advocacy is not clinical evidence under modern standards. The text is philosophically interesting because practical remedy, speculative natural explanation, ancient authorities, and immaterialist commitments meet within one work. Its transitions can appear abrupt to modern readers, yet they express Berkeley’s effort to relate sensible effects to an ordered hierarchy of causes. The primary text, not Thomé’s botanical morphology, supplies those claims and their period vocabulary.',
      'The later plate is useful precisely when its limits are explicit. It gives a careful visual language for identifying one pine species while demonstrating how botanical classification itself changed after Berkeley. That specificity prevents “pine tar” from sliding into an unsupported claim about Pinus sylvestris, and it separates historical intellectual context from health guidance. Siris belongs to the reception history of medicine and metaphysics, not a current prescription. Visitors can follow its chain of reasoning and ask why empirical reports, inherited authorities, and speculative principles seemed mutually supporting, while withholding any inference that the beautiful botanical plate authenticates Berkeley’s ingredients or therapeutic conclusions.',
    ],
    paragraphSourceIds: [['pine-commons', 'thome-index'], ['siris-primary', 'berkeley-sep'], ['pine-commons', 'siris-primary']],
    sources: [
      collection('pine-commons', 'Wikimedia Commons — Thomé, Pinus sylvestris, 1885', 'https://commons.wikimedia.org/wiki/File:Illustration_Pinus_sylvestris0.jpg'),
      collection('thome-index', 'University of Hamburg archive — Thomé botanical plate index', 'https://www-archiv.fdm.uni-hamburg.de/b-online/thome/Alphabetical_list.html'),
      primary('siris-primary', 'George Berkeley — Siris, Internet Archive', 'https://archive.org/details/sirischainofphil00berk'),
      academic('berkeley-sep', 'Stanford Encyclopedia of Philosophy — George Berkeley', 'https://plato.stanford.edu/entries/berkeley/'),
    ],
    visitorGuide: [
      {heading: 'Following the Siris chain', items: [
        {label: 'Practical opening', description: 'The work begins with tar water before moving into chemistry, causation, spirit, and metaphysics.', sourceIds: ['siris-primary', 'berkeley-sep']},
        {label: 'Historical medicine', description: 'Berkeley’s therapeutic claims belong to an eighteenth-century text and are not present-day medical guidance.', sourceIds: ['siris-primary']},
      ]},
      {heading: 'Bounding the botanical plate', items: [
        {label: 'Later classification', description: 'Thomé’s 1885 plate depicts Scots pine through a later botanical system.', sourceIds: ['pine-commons', 'thome-index']},
        {label: 'No ingredient proof', description: 'The image cannot identify the species, recipe, dosage, or material Berkeley actually used.', sourceIds: ['pine-commons', 'siris-primary']},
      ]},
    ],
    resolution: 'Resolved: verified Thomé’s 1885 published plate and public-domain status, stated the absent copy-level custody, separated Scots pine from Berkeley’s unspecified tar source, rejected medical advice, mounted the portrait naturally, mapped every claim, and linked the current George Berkeley article.',
    lock: 'fnv1a64:b0ebb09ea457a848',
  },
  'hume-causation-billiard-table': {
    plaqueTitle: 'Chardin, La Partie de billard, c. 1720',
    plaqueType: 'concept-argument-diagram-or-method',
    canonicalContexts: [{kind: 'philosopher', id: 'hume'}],
    articleTitle: 'David Hume',
    invitation: 'Chardin’s period billiards scene stages collision and expectation while Hume’s text asks where the impression of necessary connection can be found.',
    objectInterpretation: 'The installed work is Jean-Baptiste-Siméon Chardin’s La Partie de billard, c. 1720, Musée Carnavalet P2081, released through Paris Musées as CC0. It is a social painting, not Hume’s diagram or evidence that he saw this canvas.',
    overrides: {
      displayName: 'Billiard Balls and Necessary Connection',
      shortTitle: 'Billiards and Causation',
      workLabel: 'CONTEXT PAINTING · CAUSAL EXAMPLE',
      dateLabel: 'Jean-Baptiste-Siméon Chardin · c. 1720 · Musée Carnavalet, P2081',
      lead: 'A cue approaches balls on Chardin’s crowded table. The scene makes sequence and expectation visible while the Enquiry carries Hume’s analysis of necessary connection.',
    },
    paragraphs: [
      'Players and spectators gather around a long billiard table as a cue approaches the balls in Chardin’s La Partie de billard. Paris Musées identifies the oil painting, dates it to about 1720, holds it at the Musée Carnavalet under P2081, and releases the source image as CC0. The installed wide derivative preserves the entire social scene at its natural ratio. The painting was not designed as a diagram of Hume’s argument, and no evidence shows that he used or saw it. It supplies a historically proximate billiards setting whose object identity and rights remain separate from the philosophical example it helps visitors imagine.',
      'Hume asks what experience presents when one event is called the cause of another. In a single collision, observers perceive one ball moving, contact, and another ball moving; they do not perceive an additional binding power that logically guarantees the effect. Repeated conjunction forms a habit of expectation, and reflection on that transition supplies the idea of necessary connection. Hume is not denying that collisions happen, that regularities can be learned, or that causal vocabulary is useful. His challenge concerns the justification and origin of the necessity we project beyond what any isolated sensory sequence displays.',
      'The crowded painting adds a useful complication: causal judgment occurs within skilled practice. Players know tables, cues, angles, force, and expected outcomes, while spectators rely on learned regularities and testimony. Modern mechanics can explain the collision with resources unavailable to the mere glance, but Hume’s epistemic question remains about how observed cases warrant general expectation. The picture cannot settle debates between regularity, counterfactual, mechanistic, or realist accounts of causation. It instead slows the famous example down enough to separate event, sequence, learned anticipation, and inferred necessity while preserving the ordinary world in which causal reasoning guides action.',
    ],
    paragraphSourceIds: [['billiards-paris', 'billiards-commons'], ['hume-enquiry', 'hume-sep'], ['billiards-paris', 'hume-enquiry', 'hume-sep']],
    sources: [
      collection('billiards-paris', 'Paris Musées — Chardin, La Partie de billard, P2081', 'https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/la-partie-de-billard'),
      collection('billiards-commons', 'Wikimedia Commons — Chardin billiards painting', 'https://commons.wikimedia.org/wiki/File:Chardin_-_La_Partie_de_billard,_Vers_1720,_P2081.jpg'),
      primary('hume-enquiry', 'David Hume — An Enquiry Concerning Human Understanding', 'https://www.gutenberg.org/ebooks/9662'),
      academic('hume-sep', 'Stanford Encyclopedia of Philosophy — David Hume', 'https://plato.stanford.edu/entries/hume/'),
    ],
    visitorGuide: [
      {heading: 'Dissecting the collision', items: [
        {label: 'Observed sequence', description: 'Motion, contact, and subsequent motion are perceptible features of the billiard example.', sourceIds: ['hume-enquiry']},
        {label: 'Expected effect', description: 'Repeated conjunction shapes the mind’s transition from one event to anticipation of another.', sourceIds: ['hume-enquiry', 'hume-sep']},
      ]},
      {heading: 'Keeping the painting contextual', items: [
        {label: 'Social practice', description: 'Players and spectators bring learned skills to the scene rather than observing as blank minds.', sourceIds: ['billiards-paris']},
        {label: 'Not Hume’s diagram', description: 'The painting supplies period context but neither depicts the philosopher nor proves his analysis.', sourceIds: ['billiards-paris', 'hume-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Chardin’s P2081 identity, date, medium, holding, CC0 source chain, alt, caption, and natural ratio; kept the social scene distinct from Hume’s text; claim-mapped three paragraphs; and linked the current David Hume article.',
    lock: 'fnv1a64:caa2adaf61f51cda',
  },
  'hume-self-theatre-without-spectator': {
    plaqueTitle: 'Unknown Artist, Theater Interior with Performance Taking Place, c. 1740–60',
    plaqueType: 'concept-argument-diagram-or-method',
    canonicalContexts: [{kind: 'philosopher', id: 'hume'}],
    articleTitle: 'David Hume',
    invitation: 'An anonymous period theatre makes Hume’s famous metaphor visible while his own warning prevents the metaphor from becoming a literal inner stage or spectator.',
    objectInterpretation: 'The installed print is an anonymous eighteenth-century Theater Interior with Performance Taking Place, c. 1740–60, recorded by Cooper Hewitt as object 18348639. Its object chain supplies qualified period context, not an image by Hume or proof of a mental theatre.',
    overrides: {
      displayName: 'The Theatre of the Mind',
      shortTitle: 'A Theatre without Spectator',
      workLabel: 'PERIOD PRINT · PHILOSOPHICAL METAPHOR',
      dateLabel: 'Unknown artist · c. 1740–60 · Cooper Hewitt, 18348639',
      lead: 'A crowded theatre visualizes succession, attention, and staging. Hume immediately cautions that the mind is not literally a theatre, and his Appendix leaves a serious problem unresolved.',
    },
    paragraphs: [
      'The installed landscape print presents a crowded theatre interior during a performance. Cooper Hewitt records the object under 18348639 and the Commons source identifies an unknown maker and a date of about 1740–60. Because the maker remains anonymous and the institutional chain is mediated through the available digital records, attribution should not be sharpened beyond the evidence. The print is not Hume’s image, an illustration commissioned for the Treatise, or a view of an inner mind. It is period visual context whose tiers, stage, performers, and spectators make the risks of Hume’s theatrical metaphor unusually easy to inspect.',
      'In Treatise I.iv.6 Hume describes the mind as a succession of perceptions appearing with great rapidity, then warns that the comparison to a theatre must not mislead: there is no known place where scenes are represented and no additional simple self discovered behind them. Introspection encounters particular perceptions—sensations, passions, thoughts, memories—not an invariant owner given as a separate impression. “No inner spectator” is therefore an interpretive paraphrase, not a sentence to place in quotation marks as Hume’s exact wording. The bundle account challenges substantial selves without denying the practical continuity of character, memory, agency, or social attribution.',
      'The object’s actual spectators show why the metaphor can betray the argument. A physical theatre has an architecture, a stage, and viewers who remain while performances change; importing those structures into mind would reintroduce the very enduring subject Hume says introspection does not reveal. Hume later admits in the Treatise Appendix that he cannot reconcile principles governing identity and perceptions to his satisfaction. That unresolved admission prevents a triumphal reading. The anonymous print can help visitors notice succession, association, and point of view, but only the primary text establishes the caveat and the difficulty. Later theories of self should not be projected backward as Hume’s settled solution.',
    ],
    paragraphSourceIds: [['theatre-cooper', 'theatre-commons'], ['hume-treatise', 'hume-sep'], ['hume-treatise', 'hume-sep', 'theatre-cooper']],
    sources: [
      collection('theatre-cooper', 'Cooper Hewitt — Theater Interior with Performance Taking Place, 18348639', 'https://collection.cooperhewitt.org/objects/18348639/'),
      collection('theatre-commons', 'Wikimedia Commons — anonymous theatre interior, c. 1740–60', 'https://commons.wikimedia.org/wiki/File:Print,_Theater_Interior_with_Performance_Taking_Place,_ca._1740%E2%80%9360_(CH_18348639).jpg'),
      primary('hume-treatise', 'David Hume — A Treatise of Human Nature', 'https://www.gutenberg.org/ebooks/4705'),
      academic('hume-sep', 'Stanford Encyclopedia of Philosophy — David Hume', 'https://plato.stanford.edu/entries/hume/'),
    ],
    visitorGuide: [
      {heading: 'Using Hume’s theatre carefully', items: [
        {label: 'Successive perceptions', description: 'Introspection finds changing particular perceptions rather than a separate invariant self-impression.', sourceIds: ['hume-treatise', 'hume-sep']},
        {label: 'No literal stage', description: 'Hume expressly warns that the theatrical comparison does not identify a mental place of performance.', sourceIds: ['hume-treatise']},
      ]},
      {heading: 'Preserving the unresolved issue', items: [
        {label: 'Appendix difficulty', description: 'Hume later acknowledges that his principles of identity and perception do not reconcile satisfactorily.', sourceIds: ['hume-treatise', 'hume-sep']},
        {label: 'Anonymous context', description: 'The print has no documented connection to Hume and does not supply a philosophical solution.', sourceIds: ['theatre-cooper', 'theatre-commons']},
      ]},
    ],
    resolution: 'Resolved: identified the anonymous Cooper Hewitt theatre print and qualified its record, made “no inner spectator” an explicit paraphrase, retained Hume’s Appendix difficulty, restored the natural ratio, mapped all claims to object and text evidence, and linked the current David Hume article.',
    lock: 'fnv1a64:168ee3263a76fd50',
  },
  'hume-sentiment-and-social-judgment': {
    plaqueTitle: 'Jean-Baptiste Greuze, L’Accordée de village, 1761',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'hume'}],
    articleTitle: 'David Hume',
    invitation: 'Greuze’s staged marriage-and-dowry scene tests how sympathy, standpoint, convention, and hierarchy shape moral judgment without becoming Hume’s own illustration.',
    objectInterpretation: 'The installed work is Greuze’s L’Accordée de village, 1761, Louvre INV 5037 / MR 1774. Its Salon title foregrounded a father paying the dowry; the Commons derivative and Louvre record support the object, while the painting does not dictate one moral response.',
    overrides: {
      displayName: 'Moral Sentiment and the Village Bride',
      shortTitle: 'Sentiment and Social Judgment',
      workLabel: 'GENRE PAINTING · MORAL SPECTATORSHIP',
      dateLabel: 'Jean-Baptiste Greuze · 1761 · Louvre, INV 5037 / MR 1774',
      lead: 'Greuze directs attention through gesture, family grouping, money, and the dowry transaction. The scene lets visitors test Hume’s moral psychology while keeping its hierarchies and his own exclusions in view.',
    },
    paragraphs: [
      'A family gathers around a marriage agreement in Greuze’s L’Accordée de village. The Louvre identifies the 1761 oil on canvas under INV 5037 / MR 1774 and records its Salon title as a village marriage in which a father pays the dowry to his son-in-law. That wording makes money and family authority part of the object rather than an optional modern theme. The installed image comes through a Commons/Web Gallery of Art derivative while the Louvre supplies authoritative catalog history. Greuze did not illustrate Hume, and the carefully directed expressions cannot prove that every spectator experiences the same sympathy or judgment.',
      'Hume grounds moral approval and disapproval in sentiment while explaining how sympathy communicates the situations and feelings of others. Because immediate partiality varies with proximity and interest, moral judgment adopts a more general point of view corrected by shared circumstances and stable character assessment. The process is neither a mechanical calculation nor an infallible route to impartiality. Conventions, education, social position, and selective attention shape what becomes salient. In Greuze’s scene, affection, obedience, property, gender, and generational authority are organized for viewers, making it possible to ask how an apparently immediate response has already been composed by narrative and social expectation.',
      'Hume’s published racist judgments show that his theory did not prevent exclusionary comparison. It is a modern critical inference—not Hume’s own diagnosis—to say that those judgments expose the limits of corrected sympathy or the failure of a general point of view to apply itself. The race claim therefore requires independent scholarship rather than deduction from this French painting. The object is a later contextual test of moral spectatorship: it can reveal how sentiment may widen concern or reproduce hierarchy, but it does not illustrate Hume’s racism and cannot resolve his theory. Responsible interpretation keeps the dowry economy, object provenance, philosophical argument, and biographical accountability distinct but answerable to one another.',
    ],
    paragraphSourceIds: [['bride-louvre', 'bride-commons'], ['morals-primary', 'hume-moral-sep'], ['hume-race', 'hume-moral-sep', 'bride-louvre']],
    sources: [
      collection('bride-louvre', 'Musée du Louvre — L’Accordée de village, INV 5037', 'https://collections.louvre.fr/ark:/53355/cl010062574'),
      collection('bride-commons', 'Wikimedia Commons — Greuze, L’Accordée de village', 'https://commons.wikimedia.org/wiki/File:Jean-Baptiste_Greuze_-_L%27Accord%C3%A9e_de_Village_-_WGA10655.jpg'),
      primary('morals-primary', 'David Hume — An Enquiry Concerning the Principles of Morals', 'https://www.gutenberg.org/ebooks/4320'),
      academic('hume-moral-sep', 'Stanford Encyclopedia of Philosophy — Hume’s Moral Philosophy', 'https://plato.stanford.edu/entries/hume-moral/'),
      academic('hume-race', 'Oxford Handbooks — Hume on race', 'https://academic.oup.com/edited-volume/28299/chapter-abstract/214977924'),
    ],
    visitorGuide: [
      {heading: 'Reading Greuze’s moral staging', items: [
        {label: 'Dowry transaction', description: 'The 1761 Salon title makes the father’s payment and family authority part of the scene’s identity.', sourceIds: ['bride-louvre']},
        {label: 'Directed response', description: 'Gesture, grouping, money, and expression guide attention without fixing one universal reaction.', sourceIds: ['bride-louvre', 'bride-commons']},
      ]},
      {heading: 'Testing corrected sympathy', items: [
        {label: 'General viewpoint', description: 'Hume explains moral judgment through sentiments corrected beyond immediate private interest.', sourceIds: ['morals-primary', 'hume-moral-sep']},
        {label: 'No automatic inclusion', description: 'Independent evidence is needed to assess how Hume’s racist claims expose limits in his practice.', sourceIds: ['hume-race']},
      ]},
    ],
    resolution: 'Resolved: verified Greuze’s Louvre identity, accessions, 1761 Salon dowry context, source chain, caption, alt, and ratio; kept the painting distinct from Hume; sourced the race claim independently and stated its inferential status; and linked the current David Hume article.',
    lock: 'fnv1a64:ac3d05fb06fa72fd',
  },
  'hume-skepticism-backgammon-return': {
    plaqueTitle: 'Three Backgammon Players, c. 1625',
    plaqueType: 'concept-argument-diagram-or-method',
    canonicalContexts: [{kind: 'philosopher', id: 'hume'}],
    articleTitle: 'David Hume',
    invitation: 'A convivial backgammon scene gives material form to Hume’s return from skeptical reflection to ordinary sociability without pretending that play logically refutes skepticism.',
    objectInterpretation: 'The installed painting is Three Backgammon Players, attributed to the circle of Hendrick ter Brugghen, c. 1625, Centraal Museum 6144. It predates Hume and depicts neither his game nor his companions; the figures gesture, but their exact speech or disagreement is unknown.',
    overrides: {
      displayName: 'Three Backgammon Players',
      shortTitle: 'Skepticism and the Return to Play',
      workLabel: 'CONTEXT PAINTING · ORDINARY PRACTICE',
      dateLabel: 'Circle of Hendrick ter Brugghen · c. 1625 · Centraal Museum, 6144',
      lead: 'Three players lean across a board in a painting made before Hume. The game evokes his famous return to company and play while leaving skeptical argument and ordinary belief in deliberate tension.',
    },
    paragraphs: [
      'Counters and dice lie on a board as three richly dressed players gesture toward one another in the installed painting. Centraal Museum identifies Three Backgammon Players as a work from the circle of Hendrick ter Brugghen, dates it to about 1625, and records inventory 6144; the reproduction is marked public domain. The image predates Hume by decades and cannot depict his own evening. Its figures may be animated, but the bytes do not establish that they are arguing, what they say, or who is winning. The complete landscape composition provides a social game as context rather than biographical documentation.',
      'At the close of Treatise I.iv.7, intense skeptical reflection leaves Hume confused and melancholic. Nature interrupts: he dines, plays backgammon, converses, and becomes cheerful, after which the abstract doubts appear cold and strained. This is not a deductive refutation of skepticism or a solution to induction. It is an account of how belief, attention, custom, embodiment, and sociability reassert themselves in ordinary life. The later label “mitigated skepticism” is especially associated with the Enquiry and should not be placed in the Treatise passage as Hume’s own term there. Philosophy resumes within, not above, natural human practice.',
      'Backgammon joins rule-governed calculation with chance, habit, emotion, and other people. Players trust a board, remember moves, anticipate outcomes, and act without first proving the external world or the uniformity of nature. That makes the painting a strong companion to Hume’s practical return, but the game does not authorize complacency: natural belief can restore agency while leaving intellectual limits intact. Hume’s response invites inquiry conducted with proportioned confidence and awareness of human faculties. The artwork contributes texture—gesture, attention, stakes, shared time—while the primary text supplies the philosophical movement from crisis to ordinary engagement and back to reflective investigation.',
    ],
    paragraphSourceIds: [['backgammon-museum', 'backgammon-commons'], ['treatise-section', 'hume-sep'], ['backgammon-museum', 'treatise-section', 'hume-sep']],
    sources: [
      collection('backgammon-museum', 'Centraal Museum — Three Backgammon Players, 6144', 'https://www.centraalmuseum.nl/nl/collectie/6144-drie-triktrakspelers-hendrick-ter-brugghen'),
      collection('backgammon-commons', 'Wikimedia Commons — Three Backgammon Players', 'https://commons.wikimedia.org/wiki/File:Three_Backgammon_Players_from_the_circle_of_Hendrick_ter_Brugghen_Centraal_Museum_6144.jpg'),
      primary('treatise-section', 'David Hume — Treatise of Human Nature, I.iv.7', 'https://davidhume.org/texts/t/1/4/7'),
      academic('hume-sep', 'Stanford Encyclopedia of Philosophy — David Hume', 'https://plato.stanford.edu/entries/hume/'),
    ],
    visitorGuide: [
      {heading: 'Following Hume’s return', items: [
        {label: 'Natural interruption', description: 'Dining, conversation, and play restore ordinary engagement after exhausting skeptical reflection.', sourceIds: ['treatise-section']},
        {label: 'No logical refutation', description: 'The return describes belief and attention in practice rather than a proof against skepticism.', sourceIds: ['treatise-section', 'hume-sep']},
      ]},
      {heading: 'Reading the players cautiously', items: [
        {label: 'Earlier painting', description: 'The c. 1625 work predates Hume and has no documented biographical connection to him.', sourceIds: ['backgammon-museum', 'backgammon-commons']},
        {label: 'Visible gesture only', description: 'The figures gesture over the board, but their speech, dispute, and outcome are not recoverable.', sourceIds: ['backgammon-commons']},
      ]},
    ],
    resolution: 'Resolved: verified the Centraal Museum object, attribution, date, inventory, rights, and natural ratio; removed unsupported “arguing” copy; distinguished the Treatise passage from the later mitigated-skepticism label; mapped all claims; and linked the current David Hume article.',
    lock: 'fnv1a64:0341d4fe40497fbd',
  },
  'hume-edinburgh-public-world': {
    plaqueTitle: 'The “Heart of Midlothian,” High Street, Edinburgh',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'hume'}],
    articleTitle: 'David Hume',
    invitation: 'Johnston’s 1852 reconstruction places Hume’s science of human nature amid Edinburgh’s law, labor, rank, commerce, and exclusions while remaining a later image.',
    objectInterpretation: 'The installed lithograph is W. & A. K. Johnston’s 1852 The “Heart of Midlothian,” High Street, Edinburgh, a retrospective reconstruction rather than an eyewitness view of Hume’s daily route. Its publication is known, but a present holding institution is not verified.',
    overrides: {
      displayName: 'The “Heart of Midlothian,” High Street, Edinburgh',
      shortTitle: 'Hume’s Edinburgh Public World',
      workLabel: 'LATER LITHOGRAPH · URBAN AND INSTITUTIONAL CONTEXT',
      dateLabel: 'W. & A. K. Johnston · published 1852 · present holding unverified',
      lead: 'A nineteenth-century reconstruction crowds Edinburgh High Street with courts, guards, workers, traders, water carriers, gentlemen, children, and animals. Its retrospective city tests the standpoint of Hume’s human science.',
    },
    paragraphs: [
      'The installed lithograph reconstructs Edinburgh High Street around the old Tolbooth, the “Heart of Midlothian.” Guards, workers, traders, water carriers, gentlemen, children, carts, and animals fill a scene published by W. & A. K. Johnston in 1852. The source records its publication context but does not identify a present holding institution or prove that every architectural and social detail corresponds to one moment in Hume’s eighteenth-century city. It was made long after his death and is not eyewitness documentation of his route. Its value lies in retrospective urban visualization, and that later status must remain as prominent as its crowded detail.',
      'Hume’s project of a science of human nature examined understanding, passions, morals, convention, commerce, politics, religion, and historical development. Such inquiry was never conducted from nowhere. Hume worked as author, librarian, historian, diplomat, and public figure across Edinburgh, London, and Paris, encountering institutions that distributed credibility, education, work, security, and power unevenly. The lithograph’s juxtaposition of court, policing, trade, labor, and rank makes situated observation visible without establishing direct influence from any pictured person. It also warns against turning “society” into an undifferentiated background when Hume’s own explanations rely on custom, testimony, sympathy, and institutional practice.',
      'Accountability belongs within that situated history. Hume made lasting contributions to epistemology, moral psychology, history, and political economy while also publishing racist claims. Independent scholarship is needed to assess those texts; a street image cannot diagnose them. Nor should the vague phrase “participating in imperial worlds” substitute for documented offices, writings, and networks. Skeptical scrutiny of unsupported necessity does not automatically expose inherited hierarchy, and Hume did not consistently extend his critical method to race. The 1852 reconstruction can therefore open a question about standpoint and exclusion while remaining later reception. It does not soften racist judgment into atmosphere or reduce Hume’s philosophy to biography.',
    ],
    paragraphSourceIds: [['edinburgh-commons'], ['hume-sep'], ['hume-race', 'hume-sep', 'edinburgh-commons']],
    sources: [
      collection('edinburgh-commons', 'Wikimedia Commons — Johnston, Heart of Midlothian reconstruction', 'https://commons.wikimedia.org/wiki/File:The_%27Heart_of_Midlothian%27,_High_Street,_Edinburgh.jpg'),
      academic('hume-sep', 'Stanford Encyclopedia of Philosophy — David Hume', 'https://plato.stanford.edu/entries/hume/'),
      academic('hume-race', 'Oxford Handbooks — Hume on race', 'https://academic.oup.com/edited-volume/28299/chapter-abstract/214977924'),
    ],
    visitorGuide: [
      {heading: 'Locating the urban reconstruction', items: [
        {label: 'Published in 1852', description: 'The lithograph retrospectively stages an earlier High Street and is not an eyewitness record of Hume.', sourceIds: ['edinburgh-commons']},
        {label: 'Custody unresolved', description: 'A publication source is recorded, but the present physical holding institution is not independently verified.', sourceIds: ['edinburgh-commons']},
      ]},
      {heading: 'Testing a situated human science', items: [
        {label: 'Institutional observer', description: 'Hume’s inquiry developed through specific literary, civic, and governmental roles rather than a view from nowhere.', sourceIds: ['hume-sep']},
        {label: 'Racist judgment', description: 'The historical claim requires direct textual scholarship and cannot be inferred from the reconstructed street.', sourceIds: ['hume-race']},
      ]},
    ],
    resolution: 'Resolved: identified Johnston’s 1852 retrospective lithograph, stated the unverified current custody, preserved later-reception status, replaced vague imperial framing with documented and sourced limits, corrected the natural mount, mapped all claims, and linked the current David Hume article.',
    lock: 'fnv1a64:66b8dc21d330f5c5',
  },
};

const reviewMethod = 'Galleries 14–15 supplemental review: exactly three concurrent GPT-5.6 Terra/High read-only evidence scopes of twelve, eleven, and eleven non-overlapping exhibits were reconciled by the Sol parent across installed-object identity, attribution, dating, institution, provenance, rights, captions, alt text, claim-level sources, factual plaques, canonical relationships, exact article actions, current review locks, natural-ratio mounting, and desktop, mobile, and staged-3D presentation.';

const visualReview = (id: string): NonNullable<NonNullable<MuseumSupplementalExhibit['review']>['visualReview']> => ({
  desktop: {
    reviewedOn: '2026-08-20',
    viewport: '1440×900',
    evidence: `Direct route inspected with the full uncropped object preview, three untitled sourced paragraphs, subject-specific guide, factual plaque relationship, complete article action, and no horizontal overflow. Evidence: docs/visual-validation/gallery-14-15-supplementals/desktop/${id}.png`,
  },
  mobile: {
    reviewedOn: '2026-08-20',
    viewport: '390×844',
    evidence: `Direct route inspected with a wrapped factual title, full aspect-safe object preview, scrollable interpretation, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-14-15-supplementals/mobile/${id}.png`,
  },
  threeDimensional: {
    reviewedOn: '2026-08-20',
    viewport: '1280×720 fresh direct-route session',
    evidence: `Fresh direct-route session inspected after closing the detail view: authored viewpoint, factual two-level plaque, distinct installation, working visit controls, and natural-ratio media mount. Evidence: docs/visual-validation/gallery-14-15-supplementals/staged-3d/${id}.png`,
  },
});

export const reviewEmpiricismSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery 14 review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery 14 presentation for ${input.id}.`);
  const evidenceLabel = reviewed.overrides?.dateLabel ?? input.dateLabel;
  return {
    ...input,
    ...reviewed.overrides,
    sections: reviewed.paragraphs.map((paragraph, index) => ({
      heading: '',
      paragraphs: [paragraph],
      sourceIds: reviewed.paragraphSourceIds[index],
    })),
    sources: reviewed.sources,
    visitorGuide: reviewed.visitorGuide,
    objectInterpretation: reviewed.objectInterpretation,
    presentation: {
      ...input.presentation,
      panelKicker: 'Gallery 14 supplemental exhibit',
      proximityKicker: reviewed.plaqueTitle,
      factRows: [
        {label: 'Object', value: reviewed.plaqueTitle},
        {label: 'Evidence', value: evidenceLabel},
        {label: 'Atlas route', value: reviewed.articleTitle},
      ],
      articleActionLabel: `Read the full sourced ${reviewed.articleTitle} article`,
      exhibitLayout: 'object-led',
    },
    wallPlaque: {
      type: reviewed.plaqueType,
      title: reviewed.plaqueTitle,
      invitation: reviewed.invitation,
      canonicalContexts: reviewed.canonicalContexts,
    },
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-20',
      method: reviewMethod,
      resolution: reviewed.resolution,
      lock: reviewed.lock,
      visualReview: visualReview(input.id),
    },
  };
};
