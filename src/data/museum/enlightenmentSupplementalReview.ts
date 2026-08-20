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
  'enlightenment-persian-mirror': {
    plaqueTitle: 'Antoine Coypel, Study Identified as Mohammad Reza Beg, c. 1715',
    plaqueType: 'paired-or-grouped-historical-figures',
    canonicalContexts: [{kind: 'philosopher', id: 'montesquieu'}],
    articleTitle: 'Montesquieu',
    invitation: 'Coypel’s attributed study of a real Safavid envoy tests the distance between diplomatic encounter and Montesquieu’s fictional Persian correspondents.',
    objectInterpretation: 'The installed oval head-and-shoulders oil study is attributed to Antoine Coypel and identified from an old verso inscription as Mohammad Reza Beg, probably c. 1715. A 2007 Sotheby’s record documents the claim and then-private ownership; earlier provenance and the present owner are unverified.',
    overrides: {
      displayName: 'Mohammad Reza Beg and the Persian Mirror',
      shortTitle: 'A Persian Envoy in France',
      workLabel: 'ATTRIBUTED PORTRAIT STUDY · DIPLOMATIC CONTEXT',
      dateLabel: 'Antoine Coypel · probably c. 1715 · present owner unverified',
      lead: 'An old inscription identifies Coypel’s painted study with the Safavid envoy Mohammad Reza Beg. The historical diplomat is not Usbek or Rica, and the object’s incomplete provenance prevents a stronger identification.',
    },
    paragraphs: [
      'The installed portrait-format image shows an oval head-and-shoulders study of a bearded man wearing pale patterned headwear. Sotheby’s 2007 catalog attributed the small oil on paperboard to Antoine Coypel and associated it with Mohammad Reza Beg’s 1715 embassy through an old inscription on the reverse. That evidence is meaningful but not conclusive: the complete earlier provenance, circumstances of painting, and present ownership are not verified. The image is marked public domain through Commons. It does not show the standing full figure once described in the alt text, and its sitter identification must retain the catalog’s attributed rather than documentary status.',
      'Mohammad Reza Beg was a historical Safavid envoy received in France, whereas Usbek and Rica are fictional letter writers in Montesquieu’s Persian Letters. The novel uses shifting viewpoints, unreliable voices, distance, and reversals of observation to estrange French institutions and customs. Its Persian speakers cannot be treated as transcripts of an actual diplomat’s opinions or as transparent representatives of a single culture. Montesquieu’s device opens criticism of monarchy, religion, gender, and social convention while also depending on European literary constructions of Persia. The historical embassy and fictional correspondence belong to intersecting but nonidentical forms of encounter.',
      'The painted study makes that distinction ethically productive. A real person’s attributed likeness resists the temptation to turn “Persia” into a free-floating mask, yet the uncertain inscription and ownership block claims of complete biographical access. Likewise, Persian Letters invites readers to compare perspectives without guaranteeing that the author escapes the asymmetries of representing others. The object cannot prove that Mohammad Reza Beg inspired a character, that Montesquieu saw the study, or that diplomatic encounter caused the novel’s form. It instead anchors a bounded comparison among a historical embassy, an attributed portrait, and a fictional method whose critical power and representational limits should be read together.',
    ],
    paragraphSourceIds: [['envoy-sothebys', 'envoy-commons'], ['persian-letters', 'montesquieu-sep'], ['envoy-sothebys', 'persian-letters', 'montesquieu-sep']],
    sources: [
      collection('envoy-sothebys', 'Sotheby’s — Coypel study identified as Mohammad Reza Beg, lot 256', 'https://www.sothebys.com/en/auctions/ecatalogue/2007/important-old-master-paintings-and-european-works-of-art-including-property-of-the-albright-knox-art-gallery-n08321/lot.256.html'),
      collection('envoy-commons', 'Wikimedia Commons — attributed portrait of Mohammad Reza Beg', 'https://commons.wikimedia.org/wiki/File:Mohammed_Reza_Bey,_Persian_Ambassador_to_France,_during_the_reign_of_Louis_XIV_by_Antoine_Coypel.jpg'),
      primary('persian-letters', 'Montesquieu — Persian Letters, Project Gutenberg', 'https://www.gutenberg.org/ebooks/3206'),
      academic('montesquieu-sep', 'Stanford Encyclopedia of Philosophy — Baron de Montesquieu', 'https://plato.stanford.edu/entries/montesquieu/'),
    ],
    visitorGuide: [
      {heading: 'Identifying the portrait study', items: [
        {label: 'Inscribed attribution', description: 'The sitter and embassy association depend on an old verso inscription reported in the sale catalog.', sourceIds: ['envoy-sothebys']},
        {label: 'Incomplete provenance', description: 'Ownership was recorded for the 2007 sale, but earlier history and the present owner remain unverified.', sourceIds: ['envoy-sothebys']},
      ]},
      {heading: 'Separating history and fiction', items: [
        {label: 'Historical envoy', description: 'Mohammad Reza Beg was a diplomat, not one of Montesquieu’s invented correspondents.', sourceIds: ['envoy-sothebys', 'persian-letters']},
        {label: 'Fictional estrangement', description: 'Usbek and Rica support shifting comparison without becoming transparent ethnographic testimony.', sourceIds: ['persian-letters', 'montesquieu-sep']},
      ]},
    ],
    resolution: 'Resolved: reconciled the installed oval study against the false full-length description, dated and qualified its inscription-based identification, stated the private-sale and present-owner limits, distinguished the historical envoy from fictional Persians, preserved the natural ratio, mapped all claims, and linked the current Montesquieu article.',
    lock: 'fnv1a64:80d5ceb6f32dc69e',
  },
  'enlightenment-comparison-map': {
    plaqueTitle: 'Guillaume Delisle, Mappemonde à l’usage du Roy, 1720',
    plaqueType: 'concept-argument-diagram-or-method',
    canonicalContexts: [{kind: 'philosopher', id: 'montesquieu'}],
    articleTitle: 'Montesquieu',
    invitation: 'Delisle’s royal world map materializes comparison as a constructed viewpoint rather than a neutral surface from which laws can be ranked.',
    objectInterpretation: 'The installed two-hemisphere engraving is Guillaume Delisle’s Mappemonde à l’usage du Roy, 1720. The source supports the published map and public-domain status but does not identify a particular physical exemplar, holding institution, shelfmark, or copy-level provenance.',
    overrides: {
      displayName: 'Mappemonde à l’usage du Roy',
      shortTitle: 'The Comparative Map',
      workLabel: 'PRINTED WORLD MAP · COMPARATIVE METHOD',
      dateLabel: 'Guillaume Delisle · 1720 · particular exemplar unverified',
      lead: 'Delisle’s double-hemisphere map arranges the world for a royal French user. It makes comparison possible while exposing selection, projection, labels, and political address as part of the evidence.',
    },
    paragraphs: [
      'Two hemispheres, French place-names, geographic networks, and ornamental cartouches structure the installed Mappemonde à l’usage du Roy. Commons identifies Guillaume Delisle and dates the engraving to 1720, but the available record does not establish a particular copy, holding collection, shelfmark, or complete provenance. “Public-domain cartographic print” describes rights, not custody. The whole landscape composition is displayed at its natural ratio, preserving both mapped space and its framing. The title’s royal addressee matters: this is a constructed instrument of geographic knowledge situated within French political and imperial horizons, not a transparent image of one naturally divided world.',
      'Montesquieu compares laws, governments, customs, climate, commerce, religion, and historical circumstances in order to explain why institutions vary. The Spirit of the Laws does not offer a single scale on which societies can simply be ranked. Laws form relations within wider systems, and political liberty depends on arrangements suited to particular conditions. That contextual method can resist imposing one model everywhere, but it also risks generalization, selective reports, climate determinism, and unequal access to testimony. Comparison requires deciding which cases count, what features are commensurable, and whose descriptions are trusted—choices that a map can hide beneath visual order.',
      'Delisle’s engraving makes those methodological choices visible. Projection, boundaries, blank spaces, naming, and royal dedication organize what can be compared before any conclusion is drawn. The object does not prove that Montesquieu used this exact sheet or that cartography dictated his political theory. Nor should its global reach be mistaken for a viewpoint free of European power. It instead invites disciplined comparison of comparison itself: contextual explanation can illuminate institutional relations while remaining answerable for its sources and categories. The unresolved exemplar history reinforces that lesson, since even a widely reproduced map is not one provenance-free object available from nowhere.',
    ],
    paragraphSourceIds: [['delisle-commons'], ['spirit-laws', 'montesquieu-sep'], ['delisle-commons', 'spirit-laws', 'montesquieu-sep']],
    sources: [
      collection('delisle-commons', 'Wikimedia Commons — Delisle, Mappemonde à l’usage du Roy, 1720', 'https://commons.wikimedia.org/wiki/File:1720_map_of_the_world_-_Mappemonde_a_l%27usage_du_Roy.jpg'),
      primary('spirit-laws', 'Montesquieu — The Spirit of Laws, Project Gutenberg', 'https://www.gutenberg.org/ebooks/27573'),
      academic('montesquieu-sep', 'Stanford Encyclopedia of Philosophy — Baron de Montesquieu', 'https://plato.stanford.edu/entries/montesquieu/'),
    ],
    visitorGuide: [
      {heading: 'Inspecting the map’s viewpoint', items: [
        {label: 'Royal address', description: 'The title identifies a map made for the king’s use rather than a politically unmarked world image.', sourceIds: ['delisle-commons']},
        {label: 'Unknown exemplar', description: 'The source establishes a published design but not the custody or provenance of one physical copy.', sourceIds: ['delisle-commons']},
      ]},
      {heading: 'Testing comparative method', items: [
        {label: 'Relations among laws', description: 'Montesquieu explains institutions through connected circumstances rather than one isolated rule.', sourceIds: ['spirit-laws', 'montesquieu-sep']},
        {label: 'Source asymmetry', description: 'Comparison still depends on selected reports, categories, and unequal positions of observation.', sourceIds: ['montesquieu-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Delisle’s 1720 map and public-domain source, stated the absent holding and exemplar provenance, preserved its royal political frame, bounded any direct Montesquieu connection, corrected the natural ratio, mapped every claim, and linked the current Montesquieu article.',
    lock: 'fnv1a64:12e23f7232e8a225',
  },
  'enlightenment-power-checks-power': {
    plaqueTitle: 'The House of Commons under Sir Robert Walpole, 1800',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'montesquieu'}],
    articleTitle: 'Montesquieu',
    invitation: 'A retrospective Commons painting shows constitutional power as a crowded practice while Montesquieu’s text resists the later slogan of three perfectly separated branches.',
    objectInterpretation: 'The installed painting is Parliamentary Art Collection WOA 3067, dated 1800 and attributed to an unknown artist after originals by William Hogarth and James Thornhill. It depicts Walpole’s 1722–42 administration retrospectively and is not a contemporary record of Montesquieu’s English visit.',
    overrides: {
      displayName: 'The House of Commons under Sir Robert Walpole',
      shortTitle: 'When Power Checks Power',
      workLabel: 'RETROSPECTIVE INSTITUTIONAL PAINTING',
      dateLabel: 'Unknown artist after Hogarth and Thornhill · 1800 · WOA 3067',
      lead: 'The Parliamentary Art Collection dates this crowded Commons image to 1800, decades after the administration depicted. It helps test institutional checks without becoming eyewitness evidence for Montesquieu.',
    },
    paragraphs: [
      'Members crowd the old House of Commons around its central table and Speaker’s chair in the installed portrait-format scene. The Parliamentary Art Collection identifies WOA 3067 as a painting made in 1800 by an unknown artist after originals by William Hogarth and James Thornhill. That catalog record corrects a legacy description that gave no execution date and named Hogarth alone. The represented administration, 1722–42, is not the painting’s date. The object is out of copyright, but its retrospective construction means it cannot serve as an eyewitness transcript of parliamentary procedure, party discipline, corruption, or Montesquieu’s experience in Britain.',
      'Montesquieu argues that liberty requires power to check power through a constitution in which legislative, executive, and judicial functions are not concentrated without restraint. His account of England describes interacting bodies, social orders, and veto capacities rather than the later textbook image of three branches sealed from one another. The Spirit of the Laws combines admiration, selective reconstruction, and normative argument. Actual eighteenth-century practice included patronage, cabinet development, electoral inequality, and institutions unlike modern constitutional systems. The phrase “separation of powers” is useful only if it does not erase coordination, mixed government, and historically changing arrangements.',
      'The painting makes institutional density legible: authority is distributed among architecture, office, procedure, speaking positions, membership, and conventions. Yet an image centered on assembled elites can make exclusions disappear and turn representation into the appearance of the whole political community. Because it was painted in 1800, it also belongs to later memory of Walpole’s Commons, not simply to the moment Montesquieu analyzed. The object cannot prove that checks worked, that members were independent, or that the English constitution matched his ideal. It instead supports a bounded inquiry into how constitutional liberty depends on lived relations that slogans and retrospective images can both simplify.',
    ],
    paragraphSourceIds: [['commons-parliament'], ['spirit-laws', 'montesquieu-sep'], ['commons-parliament', 'spirit-laws', 'montesquieu-sep']],
    sources: [
      collection('commons-parliament', 'UK Parliament Heritage Collections — House of Commons, WOA 3067', 'https://heritagecollections.parliament.uk/collections/getrecord/HOP_WOA_3067'),
      primary('spirit-laws', 'Montesquieu — The Spirit of Laws, Project Gutenberg', 'https://www.gutenberg.org/ebooks/27573'),
      academic('montesquieu-sep', 'Stanford Encyclopedia of Philosophy — Baron de Montesquieu', 'https://plato.stanford.edu/entries/montesquieu/'),
    ],
    visitorGuide: [
      {heading: 'Correcting the Commons object', items: [
        {label: 'Painted in 1800', description: 'The work retrospectively depicts Walpole’s earlier administration rather than recording it contemporaneously.', sourceIds: ['commons-parliament']},
        {label: 'Two source artists', description: 'Parliament attributes the unknown painter’s composition after originals by Hogarth and Thornhill.', sourceIds: ['commons-parliament']},
      ]},
      {heading: 'Following constitutional checks', items: [
        {label: 'Distributed functions', description: 'Liberty requires restraints among powers, not the unreviewed concentration of legislative, executive, and judicial authority.', sourceIds: ['spirit-laws', 'montesquieu-sep']},
        {label: 'Mixed institutions', description: 'Montesquieu’s English account involves interaction and balance rather than three wholly isolated branches.', sourceIds: ['spirit-laws', 'montesquieu-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected WOA 3067 to an unknown artist after Hogarth and Thornhill, execution date 1800, and out-of-copyright Parliamentary record; labeled the scene as retrospective; preserved constitutional nuance and natural ratio; mapped every claim; and linked the current Montesquieu article.',
    lock: 'fnv1a64:ac860fa007878423',
  },
  'enlightenment-law-lived-institution': {
    plaqueTitle: 'William Hogarth, The Bench, 1758',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'montesquieu'}],
    articleTitle: 'Montesquieu',
    invitation: 'Hogarth’s satirical judges shift attention from constitutional design to the people, habits, and judgments through which law becomes lived practice.',
    objectInterpretation: 'The installed print is William Hogarth’s The Bench, 1758, an etching and engraving in the National Gallery of Art’s Rosenwald Collection, accession 1944.5.104. It is satire, not statistical evidence about every English judge.',
    overrides: {
      displayName: 'The Bench',
      shortTitle: 'Law as Lived Institution',
      workLabel: 'SATIRICAL PRINT · LEGAL ADMINISTRATION',
      dateLabel: 'William Hogarth · 1758 · NGA, 1944.5.104',
      lead: 'Four compressed judges make a legal institution appear as conduct, attention, posture, and character. Hogarth’s satire tests how formal law depends on administrators without proving a general judicial condition.',
    },
    paragraphs: [
      'Four bewigged judges sit pressed together in Hogarth’s The Bench. The National Gallery of Art identifies the 1758 work as etching and engraving, records the Rosenwald Collection and accession 1944.5.104, traces its provenance, and makes the image available as public-domain media. The object’s title and format distinguish it from a painted group portrait or a neutral courtroom report. Hogarth constructs types and contrasts of character through faces, posture, and compressed arrangement. The satire can direct attention to legal office as embodied practice, but it cannot establish how all judges behaved or quantify corruption, competence, distraction, and independence across a legal system.',
      'Montesquieu treats laws as relations embedded in forms of government, social conditions, customs, commerce, and political principles. Constitutional liberty therefore depends on more than written allocation of powers. Courts require procedures, trained officers, habits of judgment, and conditions that prevent arbitrary domination. His analyses can illuminate how institutions work through people without yielding a modern administrative checklist directly from the eighteenth-century text. The judicial function in his English constitution is also more complex than a timeless diagram of an autonomous modern branch. Historical vocabulary and institutional development must be preserved when applying the argument beyond his setting.',
      'The print’s satire makes one interpretive risk visible: offices can acquire formal dignity even when their occupants appear inattentive, vain, or ill-suited. Yet caricature intensifies difference for effect, and the viewer’s amusement is not independent evidence of institutional failure. The object neither confirms Montesquieu’s empirical account nor stands as his own criticism of judges. It helps bridge design and administration by asking what happens after powers are assigned—who interprets rules, under what incentives, and with what public scrutiny. A careful reading holds together the verified print, its satirical genre, Montesquieu’s contextual theory of law, and the uncertainty involved in generalizing from one crafted image.',
    ],
    paragraphSourceIds: [['bench-nga', 'bench-commons'], ['spirit-laws', 'montesquieu-sep'], ['bench-nga', 'spirit-laws', 'montesquieu-sep']],
    sources: [
      collection('bench-nga', 'National Gallery of Art — Hogarth, The Bench, 1944.5.104', 'https://www.nga.gov/artworks/30450-bench'),
      collection('bench-commons', 'Wikimedia Commons — Hogarth, The Bench', 'https://commons.wikimedia.org/wiki/File:William_Hogarth,_The_Bench,_1758,_NGA_30450.jpg'),
      primary('spirit-laws', 'Montesquieu — The Spirit of Laws, Project Gutenberg', 'https://www.gutenberg.org/ebooks/27573'),
      academic('montesquieu-sep', 'Stanford Encyclopedia of Philosophy — Baron de Montesquieu', 'https://plato.stanford.edu/entries/montesquieu/'),
    ],
    visitorGuide: [
      {heading: 'Reading Hogarth’s legal satire', items: [
        {label: 'Etching and engraving', description: 'NGA identifies the 1758 object and Rosenwald accession rather than a painted courtroom scene.', sourceIds: ['bench-nga']},
        {label: 'Constructed types', description: 'Posture and expression support satire but cannot measure an entire judiciary.', sourceIds: ['bench-nga', 'bench-commons']},
      ]},
      {heading: 'From law to administration', items: [
        {label: 'Institutional relations', description: 'Montesquieu connects laws to government, custom, circumstances, and political principle.', sourceIds: ['spirit-laws', 'montesquieu-sep']},
        {label: 'Qualified extension', description: 'Modern administrative lessons are applications, not wording directly supplied by his text.', sourceIds: ['montesquieu-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected The Bench to NGA accession 1944.5.104, etching-and-engraving medium, Rosenwald provenance, and public-domain media; bounded satire as non-statistical evidence; preserved historical institutional nuance and the natural ratio; mapped all claims; and linked the current Montesquieu article.',
    lock: 'fnv1a64:097cc874bd191cf2',
  },
  'enlightenment-liberty-slavery-contradiction': {
    plaqueTitle: '“Am I Not a Man and a Brother?” Medallion, after 1786',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'montesquieu'}],
    articleTitle: 'Montesquieu',
    invitation: 'Wedgwood’s later abolition medallion confronts the contradiction between universal liberty and Atlantic slavery while its kneeling figure preserves a paternalistic appeal.',
    objectInterpretation: 'The installed ceramic medallion was designed by Henry Webber, modeled by William Hackwood in 1787, and manufactured by Wedgwood after 1786; Brooklyn Museum 55.9.25v records its gift provenance. It belongs to later abolitionist reception, not Montesquieu’s own objects.',
    overrides: {
      displayName: '“Am I Not a Man and a Brother?”',
      shortTitle: 'Liberty and Slavery',
      workLabel: 'ABOLITION MEDALLION · LATER RECEPTION',
      dateLabel: 'Webber, Hackwood, and Wedgwood · after 1786 · Brooklyn Museum, 55.9.25v',
      lead: 'A widely circulated abolition emblem appealed to shared humanity through a chained kneeling figure. Its political force and unequal posture belong together in evaluating Enlightenment liberty’s exclusions.',
    },
    paragraphs: [
      'The installed photograph shows an oval ceramic medallion with a chained Black man kneeling beneath an abolitionist question. Brooklyn Museum identifies Henry Webber as designer, William Hackwood as modeler of the 1787 model, Wedgwood as manufacturer, dates the object after 1786, and records accession 55.9.25v as a 1955 gift from the heirs of George and Amy Putnam. The modern Daderot photograph is CC0. These details correct the simpler attribution to Hackwood alone and an imprecise c. 1786 date. The medallion’s small portable form supported circulation, but the installed image cannot by itself reconstruct every user, audience, or political effect.',
      'Montesquieu condemns slavery and uses biting irony to expose European justifications, yet his treatment remains entangled with the categories, climate arguments, and limits of his time. The Spirit of the Laws supplies the relevant evidence; the later medallion cannot be projected backward as his emblem or proof of influence. Universal claims about liberty become historically accountable when compared with institutions that denied personhood and extracted labor through Atlantic slavery. That comparison should neither erase antislavery argument nor let rhetorical criticism stand in for the voices, resistance, and political agency of enslaved people and Black abolitionists.',
      'The medallion itself carries an interpretive contradiction. Its appeal to common humanity helped mobilize antislavery sentiment, but the chained kneeling figure asks a presumed viewer for recognition from a posture of dependency. The slogan can challenge exclusion while leaving the viewer in the position of granting brotherhood. This is later abolitionist reception rather than a neutral illustration of Enlightenment progress. Reading the object with Montesquieu therefore requires separate timelines and levels of evidence: an eighteenth-century political text, a post-1786 campaign object, documented makers and provenance, and a modern critical judgment about humanitarian imagery’s paternalism.',
    ],
    paragraphSourceIds: [['medallion-brooklyn', 'medallion-commons'], ['spirit-laws', 'montesquieu-sep'], ['medallion-brooklyn', 'spirit-laws', 'montesquieu-sep']],
    sources: [
      collection('medallion-brooklyn', 'Brooklyn Museum — “Am I Not a Man and a Brother?” medallion, 55.9.25v', 'https://www.brooklynmuseum.org/objects/2586'),
      collection('medallion-commons', 'Wikimedia Commons — Wedgwood abolition medallion photograph', 'https://commons.wikimedia.org/wiki/File:Am_I_not_a_Man_and_a_Brother,_medallion_modelled_by_William_H._Hackwood,_Wedgwood,_Etruria,_England,_c._1786,_tinted_stoneware_-_Brooklyn_Museum_-_DSC09289_(cropped).JPG'),
      primary('spirit-laws', 'Montesquieu — The Spirit of Laws, Project Gutenberg', 'https://www.gutenberg.org/ebooks/27573'),
      academic('montesquieu-sep', 'Stanford Encyclopedia of Philosophy — Baron de Montesquieu', 'https://plato.stanford.edu/entries/montesquieu/'),
    ],
    visitorGuide: [
      {heading: 'Following the medallion’s making', items: [
        {label: 'Three maker roles', description: 'Webber designed, Hackwood modeled, and Wedgwood manufactured the abolition object.', sourceIds: ['medallion-brooklyn']},
        {label: 'Recorded gift', description: 'Brooklyn Museum documents accession 55.9.25v as a 1955 gift from the Putnam heirs.', sourceIds: ['medallion-brooklyn']},
      ]},
      {heading: 'Assessing the political appeal', items: [
        {label: 'Later reception', description: 'The post-1786 medallion is not Montesquieu’s object or evidence that he influenced its design.', sourceIds: ['medallion-brooklyn', 'spirit-laws']},
        {label: 'Unequal posture', description: 'The kneeling appeal can oppose slavery while centering a viewer empowered to recognize humanity.', sourceIds: ['medallion-brooklyn', 'montesquieu-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected the medallion’s Webber/Hackwood/Wedgwood roles, after-1786 date, Brooklyn accession and gift provenance, photograph rights, and natural ratio; labeled later abolitionist reception and its paternalistic visual limit; mapped all claims; and linked the current Montesquieu article.',
    lock: 'fnv1a64:7f9f145c001454a7',
  },
  'enlightenment-geneva-citizenship': {
    plaqueTitle: 'Robert Gardelle, View of Geneva from the West, c. 1720–50',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'rousseau'}],
    articleTitle: 'Jean-Jacques Rousseau',
    invitation: 'Gardelle’s wide prospect makes Rousseau’s native republic materially bounded while its walls cannot reveal who possessed citizenship or political voice.',
    objectInterpretation: 'The installed etching is Robert Gardelle’s Vue de Genève du côté du Couchant, c. 1720–50, Zentralbibliothek Zürich, Graphische Sammlung STF XX,85. Its 640×274 scene is mounted at the exact panoramic ratio rather than the former compressed proportion.',
    overrides: {
      displayName: 'View of Geneva from the West',
      shortTitle: 'Geneva and Citizenship',
      workLabel: 'ETCHED CITY PROSPECT · CIVIC CONTEXT',
      dateLabel: 'Robert Gardelle · c. 1720–50 · Zentralbibliothek Zürich, STF XX,85',
      lead: 'Geneva’s walls, roads, lake, and surrounding land stretch across Gardelle’s etched prospect. The city becomes a visible polity without making the legal boundaries of citizenship equally visible.',
    },
    paragraphs: [
      'Gardelle’s panoramic etching shows Geneva from the west, its fortified city extending behind roads, figures, water, and surrounding terrain. The Zentralbibliothek Zürich source identifies Vue de Genève du côté du Couchant, dates it broadly to 1720–50, and records Graphische Sammlung shelfmark STF XX,85. The installed reproduction retains the engraved view and lettered key while removing only a modern calibration target. Its extreme width is an object fact, not decorative stretching, so the media mount follows the 640×274 scene ratio exactly. The composed prospect communicates civic self-presentation but cannot reveal the legal status of everyone living inside or near the walls.',
      'Rousseau was born a citizen of Geneva and repeatedly used the language of citizens, sovereignty, law, and political association. In The Social Contract, legitimate authority arises when people collectively legislate as sovereign while each obeys laws understood as self-imposed through membership in the whole. That model does not mean every empirical decision of a city automatically expresses freedom. Rousseau distinguishes the sovereign people, government, particular wills, and the general will, and he recognizes conditions under which political association is corrupted. Historical Geneva also restricted citizenship by sex, status, religion, origin, and inherited privilege, facts a distant city view cannot map.',
      'The object allows two boundaries to be compared without collapsing them. Fortifications make the republic’s physical enclosure legible; political membership depends on institutional rules and unequal classifications that remain visually absent. Rousseau’s normative citizen cannot simply be read off the figures on the road, and the print offers no census of voices. Nor is it evidence that this exact prospect shaped his theory. It supplies a material horizon for asking who can say “we” when a people claims to legislate for itself. The wide image’s restored proportion reinforces the point: compressing the city would alter what the object shows, just as compressing citizenship into residence would erase political distinctions.',
    ],
    paragraphSourceIds: [['geneva-commons'], ['social-contract', 'rousseau-sep'], ['geneva-commons', 'social-contract', 'rousseau-sep']],
    sources: [
      collection('geneva-commons', 'Zentralbibliothek Zürich / Wikimedia Commons — View of Geneva from the West, STF XX,85', 'https://commons.wikimedia.org/wiki/File:Zentralbibliothek_Z%C3%BCrich_-_Vue_de_Geneve_du_cot%C3%A9_du_Couchant_-_991081642359705501.jpg'),
      primary('social-contract', 'Jean-Jacques Rousseau — The Social Contract, Project Gutenberg', 'https://www.gutenberg.org/ebooks/46333'),
      academic('rousseau-sep', 'Stanford Encyclopedia of Philosophy — Jean-Jacques Rousseau', 'https://plato.stanford.edu/entries/rousseau/'),
    ],
    visitorGuide: [
      {heading: 'Reading Gardelle’s panorama', items: [
        {label: 'Recorded etching', description: 'The Zürich record supplies creator, broad date, medium, title, and STF XX,85 shelfmark.', sourceIds: ['geneva-commons']},
        {label: 'Physical boundary', description: 'Walls and terrain show a bounded city but not every resident’s legal or political status.', sourceIds: ['geneva-commons']},
      ]},
      {heading: 'Distinguishing political membership', items: [
        {label: 'Sovereign citizens', description: 'Rousseau’s people legislate collectively and are not identical with a government or every resident.', sourceIds: ['social-contract', 'rousseau-sep']},
        {label: 'Excluded voices', description: 'A normative language of citizenship must be tested against historical restrictions on membership.', sourceIds: ['rousseau-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Gardelle’s title, etching medium, broad date, Zürich shelfmark, source treatment, and public-domain status; corrected the one-pixel derivative and severe panoramic mount distortion; separated physical walls from legal citizenship; mapped every claim; and linked the current Jean-Jacques Rousseau article.',
    lock: 'fnv1a64:7ae94bb6d8fc85a2',
  },
  'enlightenment-luxury-amour-propre': {
    plaqueTitle: 'Jean-Honoré Fragonard, The Swing, c. 1767–68',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'rousseau'}],
    articleTitle: 'Jean-Jacques Rousseau',
    invitation: 'Fragonard’s elite garden spectacle offers cultural context for Rousseau’s analysis of luxury, comparison, dependence, and amour-propre without illustrating his text.',
    objectInterpretation: 'The installed work is Fragonard’s The Swing, c. 1767–68, Wallace Collection P430. The painting’s commissioned erotic spectacle is contextual only; it depicts no Rousseauian character and does not establish invisible labor or direct philosophical influence.',
    overrides: {
      displayName: 'The Swing',
      shortTitle: 'Luxury and Amour-propre',
      workLabel: 'ROCOCO PAINTING · SOCIAL COMPARISON',
      dateLabel: 'Jean-Honoré Fragonard · c. 1767–68 · Wallace Collection, P430',
      lead: 'A richly dressed woman swings through a staged garden between differently placed male viewers. The composition invites analysis of display and recognition while remaining an elite artwork, not a diagram of Rousseau.',
    },
    paragraphs: [
      'Fragonard’s The Swing places a richly dressed woman above a concealed admirer while another man propels the swing through a luxuriant garden. The Wallace Collection identifies the oil painting, dates it to about 1767–68, and assigns P430. Its account connects the work with a courtly erotic commission, and the installed public-domain reproduction preserves the complete portrait composition. The image’s foliage, sculpture, dress, and theatrical viewpoints stage privilege and desire, but they do not document the full household economy behind such luxury. Claims about unseen servants or specific labor conditions would require evidence beyond what the canvas and collection record establish.',
      'Rousseau distinguishes amour de soi, a basic concern for self-preservation, from amour-propre, a socially mediated concern with comparative standing and recognition. In unequal societies, people learn to measure themselves through the regard of others, pursue distinction, and become dependent on opinions they cannot control. Luxury can intensify this system by turning display into a competitive language. Rousseau’s account is not a blanket claim that every pleasure, ornament, or social recognition is vicious, and his works develop the distinction differently across contexts. The Discourse on Inequality and later texts carry the philosophical analysis; Fragonard’s scene supplies a suggestive culture of appearances.',
      'The painting’s multiple viewpoints make comparison spatial. One figure looks upward from concealment, another directs motion, and the swinging woman occupies the scene’s visible center while remaining part of a commissioned fantasy. Viewers, too, are recruited into the arrangement. That structure can illuminate dependence on being seen without proving any sitter’s psychology or mapping Rousseau’s concepts one-to-one onto the figures. The work was not made to illustrate him, and luxury’s economic and colonial conditions extend beyond the garden. Used cautiously, P430 helps ask how pleasure becomes status and how recognition becomes power while preserving the difference between object history, philosophical argument, and modern social critique.',
    ],
    paragraphSourceIds: [['swing-wallace', 'swing-commons'], ['inequality-primary', 'rousseau-sep'], ['swing-wallace', 'inequality-primary', 'rousseau-sep']],
    sources: [
      collection('swing-wallace', 'Wallace Collection — Fragonard, The Swing, P430', 'https://wallacelive.wallacecollection.org/eMP/eMuseumPlus?module=collection&objectId=65364&service=ExternalInterface'),
      collection('swing-commons', 'Wikimedia Commons — Fragonard, The Swing', 'https://commons.wikimedia.org/wiki/File:Fragonard,_The_Swing.jpg'),
      primary('inequality-primary', 'Jean-Jacques Rousseau — Discourse on Inequality, Project Gutenberg', 'https://www.gutenberg.org/ebooks/11136'),
      academic('rousseau-sep', 'Stanford Encyclopedia of Philosophy — Jean-Jacques Rousseau', 'https://plato.stanford.edu/entries/rousseau/'),
    ],
    visitorGuide: [
      {heading: 'Tracing the garden spectacle', items: [
        {label: 'Commissioned scene', description: 'The Wallace account situates the painting within courtly erotic display rather than Rousseauian illustration.', sourceIds: ['swing-wallace']},
        {label: 'Visible luxury', description: 'Dress, sculpture, foliage, concealment, and controlled motion organize social attention.', sourceIds: ['swing-wallace', 'swing-commons']},
      ]},
      {heading: 'Distinguishing forms of self-regard', items: [
        {label: 'Amour de soi', description: 'Rousseau associates basic self-concern with preservation rather than comparative public rank.', sourceIds: ['inequality-primary', 'rousseau-sep']},
        {label: 'Amour-propre', description: 'Social comparison makes esteem depend on others and can intensify inequality and competition.', sourceIds: ['inequality-primary', 'rousseau-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Fragonard’s P430 identity, date, collection, subject, and natural portrait ratio; removed unsupported invisible-labor inference as an object claim; kept the painting contextual rather than influential; mapped all prose; and linked the current Jean-Jacques Rousseau article.',
    lock: 'fnv1a64:c8fd7eda5966ad9a',
  },
  'enlightenment-education-forms-person': {
    plaqueTitle: 'Jean-Siméon Chardin, The Young Schoolmistress, about 1737',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'rousseau'}],
    articleTitle: 'Jean-Jacques Rousseau',
    invitation: 'Chardin’s private lesson shows education as embodied relation while Rousseau’s Émile turns formation into a disputed program of freedom, dependence, and gender.',
    objectInterpretation: 'The installed painting is Chardin’s The Young Schoolmistress, about 1737, National Gallery NG4077. The older child is probably a sister or cousin teaching a younger child at home; identities and even the pupil’s sex remain uncertain.',
    overrides: {
      displayName: 'The Young Schoolmistress',
      shortTitle: 'Education Forms a Person',
      workLabel: 'DOMESTIC LESSON · EDUCATIONAL CONTEXT',
      dateLabel: 'Jean-Siméon Chardin · about 1737 · National Gallery, NG4077',
      lead: 'An adolescent points to an open page as a younger child responds. Chardin’s quiet private lesson reveals education as attention and relationship without depicting Émile, Sophie, or Rousseau’s practice.',
    },
    paragraphs: [
      'An older girl bends toward a younger child and points at an open page in Chardin’s The Young Schoolmistress. The National Gallery dates NG4077 to about 1737, identifies oil on canvas, records its provenance and 1925 bequest, and explains that the setting is probably a private middle-class lesson rather than a school. The teacher may be an older sister or cousin, and the younger child is probably a boy, although neither identity is certain. The complete landscape composition is shown at its natural ratio. Calling the figures Émile, Sophie, governess, or documented pupils would turn contextual genre painting into invented biography.',
      'Émile asks how a person might be educated for freedom in a society that produces dependence and false wants. Rousseau’s tutor manages environments, delays abstract instruction, and seeks learning through consequences and activity rather than direct moralizing. The apparent “natural” education is highly artificial because the tutor carefully arranges what the child encounters while hiding that control. Rousseau also assigns Sophie a gendered education oriented toward men and domestic roles, exposing a major exclusion in his account of human freedom. The primary text therefore presents both a powerful critique of rote formation and a program structured by authority and unequal sex roles.',
      'Chardin’s concentrated gestures make learning visible as a relation among bodies, objects, patience, imitation, and authority. The painting leaves the lesson’s exact content and outcome open, which prevents it from confirming Rousseau’s method. It also belongs to the bourgeois domestic culture that educational theory often idealized while access to literacy remained uneven. A responsible comparison asks who selects the exercise, who is expected to teach, and what future social role each learner is being formed to occupy. Later feminist criticism, including Wollstonecraft’s, can challenge Rousseau’s gendered design, but that reception should be labeled as subsequent argument rather than placed inside Chardin’s 1737 scene.',
    ],
    paragraphSourceIds: [['schoolmistress-ng', 'schoolmistress-commons'], ['emile-primary', 'rousseau-sep'], ['schoolmistress-ng', 'emile-primary', 'rousseau-sep']],
    sources: [
      collection('schoolmistress-ng', 'National Gallery — Chardin, The Young Schoolmistress, NG4077', 'https://www.nationalgallery.org.uk/paintings/jean-simeon-chardin-the-young-schoolmistress'),
      collection('schoolmistress-commons', 'Wikimedia Commons — Chardin, The Young Schoolmistress', 'https://commons.wikimedia.org/wiki/File:Jean_Sim%C3%A9on_Chardin_-_The_Young_Schoolmistress_-_WGA04750FXD.jpg'),
      primary('emile-primary', 'Jean-Jacques Rousseau — Émile, Project Gutenberg', 'https://www.gutenberg.org/ebooks/5427'),
      academic('rousseau-sep', 'Stanford Encyclopedia of Philosophy — Jean-Jacques Rousseau', 'https://plato.stanford.edu/entries/rousseau/'),
    ],
    visitorGuide: [
      {heading: 'Identifying the private lesson', items: [
        {label: 'Probable relationship', description: 'The young teacher is likely a sister or cousin rather than a professional governess.', sourceIds: ['schoolmistress-ng']},
        {label: 'Uncertain pupil', description: 'The younger child is probably a boy, but the National Gallery preserves uncertainty.', sourceIds: ['schoolmistress-ng']},
      ]},
      {heading: 'Testing Rousseau’s formation', items: [
        {label: 'Managed freedom', description: 'Émile’s tutor arranges experience while attempting to minimize overt command.', sourceIds: ['emile-primary', 'rousseau-sep']},
        {label: 'Gendered design', description: 'Sophie’s assigned education exposes unequal roles inside Rousseau’s account of freedom.', sourceIds: ['emile-primary', 'rousseau-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected NG4077 to about 1737 and its private-lesson interpretation, preserved uncertainty about the figures, verified provenance and ratio, separated the painting from Émile and Sophie, stated the gendered limitation and later-critical status, mapped every claim, and linked the current Jean-Jacques Rousseau article.',
    lock: 'fnv1a64:a1e81efb3119d9b1',
  },
  'enlightenment-general-will': {
    plaqueTitle: 'Charles Thévenin, The Fête de la Fédération, 1792',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'rousseau'}],
    articleTitle: 'Jean-Jacques Rousseau',
    invitation: 'Thévenin’s 1792 painting of the 1790 festival stages national unanimity after Rousseau’s death and tests the difference between spectacle and a general will.',
    objectInterpretation: 'The installed painting is Charles Thévenin’s 1792 representation of the Fête de la Fédération held on 14 July 1790, Musée Carnavalet. It postdates both the event and Rousseau and supplies later revolutionary reception, not evidence he witnessed or directed it.',
    overrides: {
      displayName: 'The Fête de la Fédération, 14 July 1790',
      shortTitle: 'General Will and Public Festival',
      workLabel: 'REVOLUTIONARY PAINTING · LATER RECEPTION',
      dateLabel: 'Charles Thévenin · painted 1792, depicting 14 July 1790 · Musée Carnavalet',
      lead: 'An immense crowd converges on the Champ-de-Mars altar in a painting completed two years after the festival. Monumental unity must not be mistaken automatically for Rousseau’s general will.',
    },
    paragraphs: [
      'Thévenin’s wide painting assembles an immense crowd, military ranks, standards, architecture, and a central altar at the Champ-de-Mars. The work is dated 1792 and depicts the Fête de la Fédération of 14 July 1790; the Musée Carnavalet source image is released through Paris Musées as CC0. Those two dates must remain distinct. Rousseau died in 1778 and could not have witnessed either the festival or this painting. The composition is a crafted revolutionary spectacle rather than a neutral aerial record, and its apparent simultaneity cannot establish what every participant believed or whether represented unity survived beyond the ceremony.',
      'In The Social Contract, the general will concerns the common good as citizens legislate for the whole, not the sum of private preferences, the command of a ruler, or whatever a numerical majority happens to choose. Citizens can be mistaken about the common interest, factions can distort deliberation, and institutional conditions matter. Rousseau’s formulation has inspired democratic and authoritarian readings because collective self-rule can be invoked to challenge domination or to silence dissent in the name of a supposedly unified people. The concept must therefore be followed through distinctions among sovereign, government, law, association, and particular wills rather than reduced to a cheering crowd.',
      'Thévenin’s image is valuable as later reception because revolutionary political culture transformed civic unity into ceremony, bodies, oaths, and monumental scale. The painting can show how a people was represented, not prove that a general will existed. Its 1792 hindsight may organize the 1790 event for later viewers, and its elevated view subordinates differences within the mass. A careful reading asks who is authorized to speak for the whole, what institutional procedures connect participation to law, and how disagreement remains possible. It neither credits Rousseau as direct cause of the festival nor denies that revolutionary actors selectively used his language after his death.',
    ],
    paragraphSourceIds: [['federation-commons'], ['social-contract', 'rousseau-sep'], ['federation-commons', 'social-contract', 'rousseau-sep']],
    sources: [
      collection('federation-commons', 'Musée Carnavalet / Wikimedia Commons — Thévenin, Fête de la Fédération', 'https://commons.wikimedia.org/wiki/File:Charles_Th%C3%A9venin_-_La_f%C3%AAte_de_la_F%C3%A9d%C3%A9ration,_le_14_juillet_1790,_au_Champ-de-Mars,_actuel_7%C3%A8me_arrondissement_-_La_F%C3%AAte_de_la_F%C3%A9d%C3%A9ration,_le_14_juillet_1790,_au_Champ-de-Mars_-_Mus%C3%A9e_Carnavalet_-_2.jpg'),
      primary('social-contract', 'Jean-Jacques Rousseau — The Social Contract, Project Gutenberg', 'https://www.gutenberg.org/ebooks/46333'),
      academic('rousseau-sep', 'Stanford Encyclopedia of Philosophy — Jean-Jacques Rousseau', 'https://plato.stanford.edu/entries/rousseau/'),
    ],
    visitorGuide: [
      {heading: 'Keeping the festival dates clear', items: [
        {label: 'Event in 1790', description: 'The Fête de la Fédération occurred at the Champ-de-Mars on 14 July 1790.', sourceIds: ['federation-commons']},
        {label: 'Painting in 1792', description: 'Thévenin completed the representation later, after Rousseau’s 1778 death.', sourceIds: ['federation-commons', 'rousseau-sep']},
      ]},
      {heading: 'Distinguishing the general will', items: [
        {label: 'Common good', description: 'The general will concerns citizens legislating for the whole, not an aggregate of private desires.', sourceIds: ['social-contract', 'rousseau-sep']},
        {label: 'Spectacle is not proof', description: 'A represented crowd cannot establish agreement, valid procedure, or durable collective self-rule.', sourceIds: ['federation-commons', 'social-contract']},
      ]},
    ],
    resolution: 'Resolved: separated Thévenin’s 1792 painting from the 1790 event and Rousseau’s lifetime, verified the Carnavalet/CC0 source and natural ratio, labeled later revolutionary reception, distinguished the general will from crowd unanimity, mapped every claim, and linked the current Jean-Jacques Rousseau article.',
    lock: 'fnv1a64:313dec14d1c26613',
  },
  'enlightenment-rousseau-botany': {
    plaqueTitle: 'Rousseau Botanizing at Ermenonville, c. 1778',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'rousseau'}],
    articleTitle: 'Jean-Jacques Rousseau',
    invitation: 'Moreau’s commemorative image of Rousseau botanizing opens the late practice in which close attention, solitude, memory, and classification meet.',
    objectInterpretation: 'The installed etching is Jean-Michel Moreau le Jeune’s c. 1778 Rousseau botanizing at Ermenonville, after Mayer, Musée Carnavalet G.21034. Paris Musées records acquisition as unknown and releases the image CC0; the scene is authored commemoration, not a mechanical record of one excursion.',
    overrides: {
      displayName: 'Rousseau Botanizing at Ermenonville',
      shortTitle: 'Rousseau’s Botanical Practice',
      workLabel: 'COMMEMORATIVE ETCHING · LATE-LIFE PRACTICE',
      dateLabel: 'Jean-Michel Moreau le Jeune, after Mayer · c. 1778 · Carnavalet, G.21034',
      lead: 'Rousseau walks with a specimen and stick near Ermenonville in a commemorative etching. The image directs attention to his late botany while preserving uncertainty about the exact excursion and acquisition.',
    },
    paragraphs: [
      'Rousseau walks in profile among low plants, holding a specimen and a long stick in the installed portrait-format etching. Paris Musées identifies Jean-Michel Moreau le Jeune as engraver after Mayer, dates the work to about 1778, records Musée Carnavalet G.21034, describes the medium as etching, lists acquisition as unknown, and releases the image CC0. The corrected alt follows the bytes rather than saying he bends beside a path with unspecified collecting equipment. Although the scene is associated with Ermenonville near the end of Rousseau’s life, it remains an authored commemorative image rather than a photograph or verified record of one day.',
      'In the Reveries of the Solitary Walker, botany offers disciplined attention and temporary relief from social persecution, memory, and self-justification. Rousseau collects, names, compares, and arranges plants while also reflecting on reverie, happiness, isolation, and the limits of explanation. The practice is neither pure escape from society nor merely a premodern natural science. Classification can focus perception without exhausting the lived encounter, and the herbarium can preserve a moment while transforming it into ordered material. The primary text supplies these connections; the commemorative print cannot reveal Rousseau’s interior state or verify each episode narrated in autobiographical prose.',
      'The image belongs at the boundary of lifetime association and later reception. It may preserve a recognizable late persona, yet pose, landscape, and specimen are composed for viewers. Its unknown acquisition history limits provenance without destroying the museum record. Reading it with the Reveries allows visitors to compare two forms of selection: the engraver frames Rousseau as solitary botanist, while Rousseau frames plant study as a practice of attention and self-relation. Neither form gives unmediated access to the person. The result is a bounded portrait of practice that acknowledges commemoration, textual self-fashioning, object uncertainty, and the specificity of botanical observation.',
    ],
    paragraphSourceIds: [['botany-paris', 'botany-commons'], ['reveries-primary', 'rousseau-sep'], ['botany-paris', 'reveries-primary', 'rousseau-sep']],
    sources: [
      collection('botany-paris', 'Paris Musées — Rousseau botanizing at Ermenonville, G.21034', 'https://www.parismuseescollections.paris.fr/en/node/99741'),
      collection('botany-commons', 'Wikimedia Commons — Moreau after Mayer, Rousseau botanizing', 'https://commons.wikimedia.org/wiki/File:Jean-Jacques_Rousseau_herborisant_%C3%A0_Ermenonville_en_juin_1778,_G.21034(2).jpg'),
      primary('reveries-primary', 'Jean-Jacques Rousseau — The Reveries of the Solitary Walker', 'https://www.gutenberg.org/files/65434/65434-h/65434-h.htm'),
      academic('rousseau-sep', 'Stanford Encyclopedia of Philosophy — Jean-Jacques Rousseau', 'https://plato.stanford.edu/entries/rousseau/'),
    ],
    visitorGuide: [
      {heading: 'Verifying the botanical image', items: [
        {label: 'Etching G.21034', description: 'Paris Musées records Moreau after Mayer, c. 1778, and the Carnavalet accession.', sourceIds: ['botany-paris']},
        {label: 'Unknown acquisition', description: 'The museum preserves the object while explicitly listing its acquisition history as unknown.', sourceIds: ['botany-paris']},
      ]},
      {heading: 'Following Rousseau’s plant practice', items: [
        {label: 'Attention and classification', description: 'Collecting and naming plants discipline observation without exhausting the encounter.', sourceIds: ['reveries-primary', 'rousseau-sep']},
        {label: 'Commemorative persona', description: 'The composed scene cannot verify Rousseau’s interior state or one exact excursion.', sourceIds: ['botany-paris', 'reveries-primary']},
      ]},
    ],
    resolution: 'Resolved: verified Moreau’s etching after Mayer, c. 1778 date, G.21034 accession, unknown acquisition, CC0 rights, actual walking pose, and natural ratio; labeled commemoration and textual self-fashioning; mapped every claim; and linked the current Jean-Jacques Rousseau article.',
    lock: 'fnv1a64:7bc5d876154de64c',
  },
  'enlightenment-sympathy-judgment': {
    plaqueTitle: 'Jean-Baptiste Greuze, The Punished Son, 1778',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'adam-smith'}],
    articleTitle: 'Adam Smith',
    invitation: 'Greuze’s family catastrophe makes moral spectatorship visible as an effort to reconstruct conduct, circumstance, grief, and blame from a positioned scene.',
    objectInterpretation: 'The installed painting is Greuze’s The Punished Son, 1778, Musée du Louvre INV 5039. The Louvre records acquisition in 1820 and earlier provenance; the work postdates the first Theory of Moral Sentiments and was not commissioned as Smith’s illustration.',
    overrides: {
      displayName: 'The Punished Son',
      shortTitle: 'Sympathy and Judgment',
      workLabel: 'MORAL GENRE PAINTING · SPECTATORSHIP',
      dateLabel: 'Jean-Baptiste Greuze · 1778 · Musée du Louvre, INV 5039',
      lead: 'A returning son collapses beside his dying father as a family’s gestures distribute grief and blame. The scene tests Smithian spectatorship without prescribing one correct response.',
    },
    paragraphs: [
      'Greuze’s The Punished Son crowds a family around a dying father while the returning son collapses in remorse. The Louvre identifies the 1778 oil on canvas under INV 5039, records its acquisition in 1820 and earlier provenance, and supplies the authoritative object history behind the installed public-domain derivative. The arrangement of bodies, gazes, and gestures constructs a moral narrative for viewers, but no painted expression proves what each figure thinks. The work appeared after the first 1759 Theory of Moral Sentiments and was not commissioned to illustrate Smith. It belongs to a culture of moral spectatorship rather than his personal viewing record.',
      'Smith begins moral judgment from our capacity to imagine another person’s situation without claiming direct access to that person’s feeling. Sympathy arises when a spectator can enter a standpoint and find a response proportionate to understood circumstances. Because spectators and agents are partial, the figure of an impartial spectator helps regulate resentment, praise, self-command, and conscience. This is not a detached observer with perfect information or an algorithm that converts visible expressions into verdicts. Judgment depends on narrative, comparison, correction, and awareness that our imagined fellow-feeling may fail. The Theory’s revisions also show Smith continuing to refine the account.',
      'Greuze’s painting lets visitors feel both the attraction and danger of rapid judgment. The composition directs sympathy toward suffering, remorse, and familial consequence, yet viewers must infer a past they cannot see. Gender, age, authority, and conventions of filial duty shape whose pain appears credible. The object therefore supports a bounded exercise: identify how the scene solicits approval or blame, then ask what information and social assumptions make that response possible. It cannot prove Smith’s psychology or ensure impartiality. The Louvre provenance, the work’s later date, and the constructed moral narrative remain distinct evidentiary layers within one encounter.',
    ],
    paragraphSourceIds: [['punished-louvre', 'punished-commons'], ['sentiments-primary', 'smith-moral-sep'], ['punished-louvre', 'sentiments-primary', 'smith-moral-sep']],
    sources: [
      collection('punished-louvre', 'Musée du Louvre — Greuze, The Punished Son, INV 5039', 'https://collections.louvre.fr/ark:/53355/cl010066513'),
      collection('punished-commons', 'Wikimedia Commons — Greuze, The Punished Son', 'https://commons.wikimedia.org/wiki/File:Jean-Baptiste_Greuze_-_The_Punished_Son.jpg'),
      primary('sentiments-primary', 'Adam Smith — The Theory of Moral Sentiments, Project Gutenberg', 'https://www.gutenberg.org/ebooks/58559'),
      academic('smith-moral-sep', 'Stanford Encyclopedia of Philosophy — Adam Smith’s Moral and Political Philosophy', 'https://plato.stanford.edu/entries/smith-moral-political/'),
    ],
    visitorGuide: [
      {heading: 'Tracing Greuze’s moral narrative', items: [
        {label: 'Constructed aftermath', description: 'Gesture and grouping imply a family history without showing the earlier conduct directly.', sourceIds: ['punished-louvre', 'punished-commons']},
        {label: 'Later context', description: 'The 1778 painting postdates the first Theory of Moral Sentiments and is not Smith’s illustration.', sourceIds: ['punished-louvre', 'sentiments-primary']},
      ]},
      {heading: 'Testing spectator judgment', items: [
        {label: 'Imagined situation', description: 'Sympathy depends on reconstructing circumstances rather than directly possessing another’s feeling.', sourceIds: ['sentiments-primary', 'smith-moral-sep']},
        {label: 'Impartial correction', description: 'The impartial spectator regulates partial responses without becoming an infallible external observer.', sourceIds: ['sentiments-primary', 'smith-moral-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Greuze’s 1778 Louvre object, INV 5039, 1820 acquisition and prior provenance, rights, caption, alt, and exact ratio; kept the later moral scene distinct from Smith; mapped three paragraphs and a specific guide; and linked the current Adam Smith article.',
    lock: 'fnv1a64:06e1f0a37c00bc88',
  },
  'enlightenment-division-labor': {
    plaqueTitle: 'Épinglier, Plate II: Pinmaking Operations, 1763',
    plaqueType: 'concept-argument-diagram-or-method',
    canonicalContexts: [{kind: 'philosopher', id: 'adam-smith'}],
    articleTitle: 'Adam Smith',
    invitation: 'An Encyclopédie plate divides pinmaking into tools and operations, clarifying productivity while keeping skill, coordination, and worker formation in view.',
    objectInterpretation: 'The installed engraving is Épinglier, plate II, from the Encyclopédie volume of plates published in 1763. The source does not identify the individual engraver, a particular physical exemplar, holding institution, shelfmark, or complete copy provenance.',
    overrides: {
      displayName: 'Épinglier, Plate II: Pinmaking Operations',
      shortTitle: 'The Division of Labor',
      workLabel: 'ENCYCLOPÉDIE PLATE · PRODUCTION OPERATIONS',
      dateLabel: 'Encyclopédie workshop · 1763 · particular exemplar unverified',
      lead: 'Tools, stations, and successive pinmaking operations fill a technical engraving. Its decomposed process makes Smith’s famous example legible without proving that he copied this exact plate.',
    },
    paragraphs: [
      'The installed landscape engraving arranges pinmaking tools, workshop stations, and successive operations under the title Épinglier, plate II. Commons identifies it with the Encyclopédie’s 1763 volume of plates and marks the reproduction public domain. The available record does not name an individual engraver, locate a particular physical copy, provide a shelfmark, or trace an exemplar’s provenance; “Encyclopédie workshop” is therefore safer than an invented maker. The natural-ratio display keeps the upper workshop scenes and lower technical figures together. The image offers material evidence of how one eighteenth-century publication analyzed craft, not a complete record of every pin shop.',
      'In The Wealth of Nations, Smith’s pin-manufactory example explains how dividing tasks can multiply output through increased dexterity, saved transition time, and machines that facilitate specialized operations. The point concerns organization as well as individual effort. Market extent limits specialization, and the example participates in a larger account of exchange, prices, capital, wages, and institutions. Smith did not merely celebrate fragmentation: he later warns that repetitive narrow labor can damage workers’ intellectual and civic capacities, giving public education a role. Productivity and human development therefore belong to the same argument rather than to separate optimistic and critical authors.',
      'The plate makes specialization appear cleanly decomposable, but actual production depends on tacit skill, maintenance, supervision, supply, pacing, and coordination across operations. A diagram can clarify sequence while hiding bargaining power and fatigue. No evidence presented here shows that Smith copied this exact engraving or based his example on its pictured shop; similarity of trade is not a proven transmission path. The object is most useful when visitors move between its ordered operations and Smith’s double concern with output and worker formation. Its unresolved exemplar history also reminds us that reproducible technical knowledge travels through books whose particular copies still have material histories.',
    ],
    paragraphSourceIds: [['pin-commons', 'enccre-docs'], ['wealth-primary', 'smith-moral-sep'], ['pin-commons', 'wealth-primary', 'smith-moral-sep']],
    sources: [
      collection('pin-commons', 'Wikimedia Commons — Encyclopédie, Épinglier, plate II', 'https://commons.wikimedia.org/wiki/File:Encyclopedie_volume_3-057.jpg'),
      collection('enccre-docs', 'ENCCRE — Encyclopédie critical edition documentation', 'https://enccre.academie-sciences.fr/encyclopedie/documentation/'),
      primary('wealth-primary', 'Adam Smith — An Inquiry into the Nature and Causes of the Wealth of Nations', 'https://www.gutenberg.org/ebooks/3300'),
      academic('smith-moral-sep', 'Stanford Encyclopedia of Philosophy — Adam Smith’s Moral and Political Philosophy', 'https://plato.stanford.edu/entries/smith-moral-political/'),
    ],
    visitorGuide: [
      {heading: 'Reading the pinmaking sequence', items: [
        {label: 'Operations and tools', description: 'The plate separates a trade into stations and instruments while keeping one production sequence visible.', sourceIds: ['pin-commons', 'enccre-docs']},
        {label: 'Unidentified exemplar', description: 'The source does not establish the engraver, holding copy, shelfmark, or copy-level provenance.', sourceIds: ['pin-commons']},
      ]},
      {heading: 'Following Smith’s double account', items: [
        {label: 'Productivity gains', description: 'Dexterity, reduced transition time, and machinery help explain increased output.', sourceIds: ['wealth-primary']},
        {label: 'Worker formation', description: 'Smith also warns that repetitive specialization can narrow capacities and require public education.', sourceIds: ['wealth-primary', 'smith-moral-sep']},
      ]},
    ],
    resolution: 'Resolved: identified the 1763 Encyclopédie pinmaking plate while stating its unknown engraver, exemplar, holding, and provenance; verified public-domain rights and natural ratio; rejected a direct-copy claim; joined productivity to worker formation; mapped every claim; and linked the current Adam Smith article.',
    lock: 'fnv1a64:6b12b8929e33c529',
  },
  'enlightenment-commerce-social-world': {
    plaqueTitle: 'Claude-Joseph Vernet, Bordeaux Harbor from the Salinières, 1758',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'adam-smith'}],
    articleTitle: 'Adam Smith',
    invitation: 'Vernet’s commissioned harbor panorama joins exchange to labor, infrastructure, law, distant routes, and the colonial conditions polished official views leave outside their frame.',
    objectInterpretation: 'The installed work is Vernet’s Bordeaux Harbor from the Salinières, 1758, Musée du Louvre INV 8301, deposited at the Musée national de la Marine. It belongs to the royal Ports de France commission and is not a neutral inventory of commerce.',
    overrides: {
      displayName: 'Bordeaux Harbor from the Salinières',
      shortTitle: 'Commerce as a Social World',
      workLabel: 'COMMISSIONED HARBOR PAINTING · COMMERCIAL CONTEXT',
      dateLabel: 'Claude-Joseph Vernet · 1758 · Louvre INV 8301, deposited Musée de la Marine',
      lead: 'Workers, carts, merchants, small boats, and oceangoing ships animate Vernet’s official port view. Its polished abundance opens the institutional world of commerce while obscuring costs beyond the visible shore.',
    },
    paragraphs: [
      'Vernet’s wide harbor view fills the Bordeaux waterfront with laborers, merchants, carts, small craft, ships, buildings, and river traffic. The object is Bordeaux Harbor from the Salinières, painted in 1758 for the royal Ports de France commission, held by the Louvre as INV 8301 and deposited at the Musée national de la Marine. The public-domain reproduction is displayed at the corrected exact 640×398 ratio after a one-pixel derivative normalization. The painting’s official commission and choreographed abundance matter: it organizes a favorable civic-commercial spectacle rather than offering a neutral ledger of cargo, wages, ownership, or coercion.',
      'Smith analyzes commercial society as a network of specialization, exchange, prices, law, security, trust, capital, and public institutions. The pursuit of self-interest does not operate in an institutional vacuum, and the famous invisible-hand language cannot summarize the whole system. Markets rely on justice and rules; merchants can collude, influence policy, and seek privileges; workers face unequal bargaining positions. Smith also attends to moral formation and public works. A harbor is therefore not simply a symbol of free exchange. It materializes coordination across labor, infrastructure, finance, customs, navigation, and political authority, exactly the relations an isolated transaction can hide.',
      'The painting’s omissions are equally instructive. Bordeaux’s Atlantic commerce was connected to colonial production and slavery, yet the official view can absorb distant extraction into orderly ships and picturesque activity. That does not make every visible worker a direct participant in one route, and the canvas cannot quantify the port’s economy. It asks viewers to compare the social world required for exchange with the polished image through which a state represented it. There is no claim that Smith saw this work or that Vernet illustrated his theory. The object’s commission, custody, later deposit, rights, and restored geometry provide a bounded foundation for interpreting commerce without romanticizing circulation.',
    ],
    paragraphSourceIds: [['bordeaux-commons', 'bordeaux-heritage'], ['wealth-primary', 'smith-moral-sep'], ['bordeaux-heritage', 'wealth-primary', 'smith-moral-sep']],
    sources: [
      collection('bordeaux-commons', 'Wikimedia Commons — Vernet, Bordeaux Harbor from the Salinières', 'https://commons.wikimedia.org/wiki/File:Vernet-port-Bordeaux.jpg'),
      collection('bordeaux-heritage', 'French regional heritage inventory — Vernet’s Ports de France commission and Bordeaux work', 'https://patrimoine.auvergnerhonealpes.fr/dossier/IM63004777'),
      primary('wealth-primary', 'Adam Smith — An Inquiry into the Nature and Causes of the Wealth of Nations', 'https://www.gutenberg.org/ebooks/3300'),
      academic('smith-moral-sep', 'Stanford Encyclopedia of Philosophy — Adam Smith’s Moral and Political Philosophy', 'https://plato.stanford.edu/entries/smith-moral-political/'),
    ],
    visitorGuide: [
      {heading: 'Locating Vernet’s harbor', items: [
        {label: 'Royal commission', description: 'The Bordeaux scene belongs to the Ports de France series and constructs an official view.', sourceIds: ['bordeaux-heritage']},
        {label: 'Louvre and deposit', description: 'The work is Louvre INV 8301 and is deposited at the Musée national de la Marine.', sourceIds: ['bordeaux-heritage']},
      ]},
      {heading: 'Expanding the exchange', items: [
        {label: 'Institutional market', description: 'Law, trust, infrastructure, capital, and public authority enable the visible transactions.', sourceIds: ['wealth-primary', 'smith-moral-sep']},
        {label: 'Beyond the shore', description: 'A polished port view can omit colonial extraction and coercion connected with distant routes.', sourceIds: ['bordeaux-heritage', 'smith-moral-sep']},
      ]},
    ],
    resolution: 'Resolved: corrected Vernet’s title, Louvre INV 8301 custody and Marine deposit, royal commission context, public-domain source, one-pixel derivative, and natural mount; bounded the official view and colonial inference; mapped every claim; and linked the current Adam Smith article.',
    lock: 'fnv1a64:177fb2e6fd1f0f04',
  },
  'enlightenment-chartered-monopoly': {
    plaqueTitle: 'Thomas Luny, The East Indiaman Hindostan and Other Vessels, 1792',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'adam-smith'}],
    articleTitle: 'Adam Smith',
    invitation: 'Luny’s Hindostan makes chartered commerce visible as ship, voyage, privilege, and empire two years after Smith’s death.',
    objectInterpretation: 'The installed painting is Thomas Luny’s The East Indiaman Hindostan and Other Vessels, 1792, Royal Museums Greenwich BHC3403. It was associated with the Hindostan’s Macartney-embassy voyage and is later context, not an image from Smith’s viewing history.',
    overrides: {
      displayName: 'The East Indiaman Hindostan and Other Vessels',
      shortTitle: 'Chartered Monopoly',
      workLabel: 'MARINE PAINTING · COMPANY AND EMPIRE',
      dateLabel: 'Thomas Luny · 1792 · Royal Museums Greenwich, BHC3403',
      lead: 'The East Indiaman Hindostan sails among smaller vessels in a painting made for its Macartney-embassy voyage. The ship joins trade to corporate privilege and imperial statecraft.',
    },
    paragraphs: [
      'A large East Indiaman sails among smaller vessels beneath a luminous sky in Thomas Luny’s The East Indiaman Hindostan and Other Vessels. Royal Museums Greenwich identifies the 1792 oil painting, records BHC3403, connects it with the Hindostan’s voyage carrying the Macartney embassy, and supplies the collection history behind the public-domain reproduction. The installed wide image retains the complete maritime composition. Luny painted it two years after Smith died, so it is not evidence of an object he viewed, a voyage he witnessed, or a commission he influenced. Its exact ship and institutional record nevertheless make later company commerce materially specific.',
      'Smith sharply criticizes exclusive trading companies and colonial monopolies for combining private interest with public authority, restricting competition, distorting policy, and imposing costs on subjects and consumers. His defense of freer trade is not a claim that every exchange is voluntary or that states have no role. The East India Company’s chartered privileges joined commercial organization to military, fiscal, diplomatic, and territorial power. A ship such as Hindostan therefore cannot be read as neutral transport. Its operation depended on capital, crews, law, ports, state protection, company governance, and imperial relations extending far beyond the painted sea.',
      'The Macartney-embassy association adds a precise later context without making the painting a full history of Britain and China. The scene celebrates maritime capability and can obscure labor, coercion, negotiation, and unequal sovereignty within a serene seascape. It also postdates the Wealth of Nations, so any Smithian connection is interpretive rather than causal. Visitors can use the object to distinguish ordinary market exchange from chartered monopoly and to ask how corporate form distributes risk and authority. The verified date, accession, voyage context, and later-reception status prevent the ship from becoming a generic icon of globalization or a retroactive illustration of Smith.',
    ],
    paragraphSourceIds: [['hindostan-rmg', 'hindostan-commons'], ['wealth-primary', 'smith-moral-sep'], ['hindostan-rmg', 'wealth-primary', 'smith-moral-sep']],
    sources: [
      collection('hindostan-rmg', 'Royal Museums Greenwich — The East Indiaman Hindostan, BHC3403', 'https://www.rmg.co.uk/collections/objects/rmgc-object-14876'),
      collection('hindostan-commons', 'Wikimedia Commons — Luny, The East Indiaman Hindostan', 'https://commons.wikimedia.org/wiki/File:Thomas_Luny_(1759-1837)_-_The_East_Indiaman_%27Hindostan%27_(%27Hindustan%27)_and_Other_Vessels_-_BHC3403_-_Royal_Museums_Greenwich.jpg'),
      primary('wealth-primary', 'Adam Smith — An Inquiry into the Nature and Causes of the Wealth of Nations', 'https://www.gutenberg.org/ebooks/3300'),
      academic('smith-moral-sep', 'Stanford Encyclopedia of Philosophy — Adam Smith’s Moral and Political Philosophy', 'https://plato.stanford.edu/entries/smith-moral-political/'),
    ],
    visitorGuide: [
      {heading: 'Following the Hindostan', items: [
        {label: 'BHC3403', description: 'Royal Museums Greenwich supplies the ship title, 1792 date, medium, accession, and collection record.', sourceIds: ['hindostan-rmg']},
        {label: 'Embassy voyage', description: 'The object record associates the painting with the Macartney embassy’s voyage.', sourceIds: ['hindostan-rmg']},
      ]},
      {heading: 'Distinguishing company power', items: [
        {label: 'Exclusive privilege', description: 'Smith criticizes chartered monopolies that align private advantage with public authority.', sourceIds: ['wealth-primary', 'smith-moral-sep']},
        {label: 'Later image', description: 'The painting postdates Smith and cannot document his viewing, influence, or endorsement.', sourceIds: ['hindostan-rmg', 'smith-moral-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Luny’s 1792 Hindostan, BHC3403, Macartney-embassy voyage, collection record, public-domain source, and natural ratio; labeled its post-Smith status and bounded imperial inference; mapped all claims; and linked the current Adam Smith article.',
    lock: 'fnv1a64:3268bd8d3e7b60e0',
  },
  'enlightenment-industry-public-judgment': {
    plaqueTitle: 'Paul Sandby, Iron Forge on the River Kent, Westmorland',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    canonicalContexts: [{kind: 'philosopher', id: 'adam-smith'}],
    articleTitle: 'Adam Smith',
    invitation: 'Sandby’s exterior riverside forge locates industry within water, land, labor, and public judgment while significant object metadata remains unresolved.',
    objectInterpretation: 'The installed image shows Paul Sandby’s Iron Forge on the River Kent, Westmorland as an exterior forge beside rushing water and a rocky fall. Yale custody is reported, but accessible evidence does not securely establish date, medium, accession, complete provenance, or current image rights.',
    overrides: {
      displayName: 'Iron Forge on the River Kent, Westmorland',
      shortTitle: 'Industry and Public Judgment',
      workLabel: 'LANDSCAPE DRAWING · INDUSTRIAL CONTEXT',
      dateLabel: 'Paul Sandby · date and medium unresolved · reported Yale Center for British Art',
      lead: 'A forge sits beside rushing water in Sandby’s exterior landscape. The actual bytes replace a false dark-interior description, while incomplete catalog access requires explicit uncertainty about medium, date, accession, provenance, and rights.',
    },
    paragraphs: [
      'The installed landscape image places a forge beside a river and rocky fall, with trees, buildings, small workers, and animals along the bank. It is not the dark forge interior described by the former alt text. Commons identifies Paul Sandby and the title Iron Forge on the River Kent, Westmorland and reports the Yale Center for British Art, but the accessible source does not securely supply an object date, medium, accession, complete provenance, or the terms governing Yale’s current digital image. The record therefore uses a broad drawing category and states uncertainty instead of turning a likely watercolor attribution into an unsupported certainty.',
      'Smith treats productive improvement within a larger moral and institutional world. Division of labor and capital accumulation can expand output, but workers, employers, legislators, consumers, and spectators occupy unequal positions. Public judgment may admire useful invention while overlooking bodily risk, dependency, environmental transformation, or bargaining power. Smith’s moral philosophy asks how spectators correct partiality, and his political economy examines laws and interests shaping production. Joining those inquiries resists the idea that efficiency alone supplies its own ethical verdict. A riverside forge can open this question, though it cannot document a workplace Smith visited or provide labor statistics.',
      'Sandby’s actual exterior matters interpretively. Waterpower, terrain, transport, buildings, animals, and human figures integrate industry with a transformed landscape rather than isolating production inside a furnace. At the same time, the distant scale makes workers difficult to individuate, encouraging a picturesque judgment of improvement. That tension is visible; claims about precise conditions are not. The object’s unresolved metadata impose another discipline: uncertainty about medium and provenance should be stated rather than hidden beneath conceptual usefulness. Visitors can compare aesthetic distance with Smithian judgment while keeping the image contextual, the workers unidentifiable, and the historical facts no stronger than the surviving source permits.',
    ],
    paragraphSourceIds: [['forge-commons'], ['wealth-primary', 'sentiments-primary', 'smith-moral-sep'], ['forge-commons', 'sentiments-primary', 'smith-moral-sep']],
    sources: [
      collection('forge-commons', 'Wikimedia Commons — Sandby, Iron Forge on the River Kent', 'https://commons.wikimedia.org/wiki/File:Paul_Sandby_-_Iron_Forge_on_the_River_Kent,_Westmorland_-_Google_Art_Project.jpg'),
      primary('wealth-primary', 'Adam Smith — An Inquiry into the Nature and Causes of the Wealth of Nations', 'https://www.gutenberg.org/ebooks/3300'),
      primary('sentiments-primary', 'Adam Smith — The Theory of Moral Sentiments, Project Gutenberg', 'https://www.gutenberg.org/ebooks/58559'),
      academic('smith-moral-sep', 'Stanford Encyclopedia of Philosophy — Adam Smith’s Moral and Political Philosophy', 'https://plato.stanford.edu/entries/smith-moral-political/'),
    ],
    visitorGuide: [
      {heading: 'Correcting the forge view', items: [
        {label: 'Exterior landscape', description: 'The installed bytes show river, waterfall, forge buildings, workers, animals, and wooded banks.', sourceIds: ['forge-commons']},
        {label: 'Metadata limit', description: 'Date, medium, accession, full provenance, and current institutional image rights remain unresolved.', sourceIds: ['forge-commons']},
      ]},
      {heading: 'Judging productive improvement', items: [
        {label: 'More than output', description: 'Smith’s political economy includes institutions and worker formation alongside productivity.', sourceIds: ['wealth-primary', 'smith-moral-sep']},
        {label: 'Picturesque distance', description: 'The broad view integrates industry with landscape while making individual working conditions hard to see.', sourceIds: ['forge-commons', 'sentiments-primary']},
      ]},
    ],
    resolution: 'Resolved: reconciled the installed exterior forge against the false dark-interior description, retained reported Yale custody but stated unresolved date, medium, accession, provenance, and rights, used the natural ratio, bounded labor inference, mapped every claim, and linked the current Adam Smith article.',
    lock: 'fnv1a64:9514bd4f5a5ba77f',
  },
  'enlightenment-marriage-domestic-government': {
    plaqueTitle: 'Hogarth, Marriage A-la-Mode: 1, The Marriage Settlement, c. 1743',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'mary-astell'}],
    articleTitle: 'Mary Astell',
    invitation: 'Hogarth’s aristocratic contract scene supplies later context for Astell’s analysis of marriage as a political relation structured by authority, property, and education.',
    objectInterpretation: 'The installed work is Hogarth’s Marriage A-la-Mode: 1, The Marriage Settlement, c. 1743, National Gallery NG113, purchased in 1824. It postdates Astell’s 1731 death and depicts a specific aristocratic bargain, not every household or a scene she knew.',
    overrides: {
      displayName: 'Marriage A-la-Mode: The Marriage Settlement',
      shortTitle: 'Marriage as Domestic Government',
      workLabel: 'SATIRICAL PAINTING · LATER DOMESTIC CONTEXT',
      dateLabel: 'William Hogarth · c. 1743 · National Gallery, NG113',
      lead: 'Two elite families negotiate a marriage while the prospective spouses sit apart. Hogarth’s later satire turns domestic union into contract, property, rank, and government without illustrating Astell directly.',
    },
    paragraphs: [
      'Hogarth’s first Marriage A-la-Mode painting stages a contract between an indebted aristocratic family and a wealthy merchant family. The prospective spouses sit disengaged while older men inspect papers and genealogical claims. The National Gallery identifies The Marriage Settlement, dates it to about 1743, records NG113, traces the series’ provenance, and notes its purchase in 1824. The public-domain reproduction preserves the full landscape composition. The satire concerns a particular elite arranged marriage and was painted after Mary Astell died in 1731. It is neither a portrait of her nor a universal statistical image of women, marriage, or household life.',
      'In Some Reflections upon Marriage, Astell examines how women educated for dependence can enter a legal and social relation in which a husband exercises extensive authority. She exposes tension between political arguments against arbitrary power and assumptions of domestic sovereignty. Her critique does not reduce marriage to finance alone, and it operates within Anglican, moral, and class commitments that require historical attention. Astell emphasizes judgment, education, friendship, and the danger of choosing under pressures that have shaped women’s capacities and options. Her intervention makes domestic hierarchy a philosophical and political problem rather than a private exception to public principles.',
      'Hogarth’s contract scene provides later visual context for that problem because law, money, lineage, desire, and family strategy occupy one space. Its comedy can expose coercive structures while inviting viewers to judge particular characters, and its aristocratic focus cannot stand for all social classes. The temporal gap must remain explicit: Astell did not respond to this painting, and the work does not prove her analysis. Used carefully, NG113 lets visitors examine how a formally voluntary agreement may be produced through unequal education and bargaining power. Object provenance, satirical genre, Astell’s argument, and later reception remain linked without becoming interchangeable evidence.',
    ],
    paragraphSourceIds: [['marriage-ng', 'marriage-commons'], ['astell-marriage', 'astell-sep'], ['marriage-ng', 'astell-marriage', 'astell-sep']],
    sources: [
      collection('marriage-ng', 'National Gallery — Hogarth, The Marriage Settlement, NG113', 'https://www.nationalgallery.org.uk/paintings/william-hogarth-marriage-a-la-mode-1-the-marriage-settlement'),
      collection('marriage-commons', 'Wikimedia Commons — Hogarth, The Marriage Settlement', 'https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Marriage_A-la-Mode_1_The_Marriage_Settlement.jpg'),
      primary('astell-marriage', 'Mary Astell — Some Reflections upon Marriage, Wikisource', 'https://en.wikisource.org/wiki/Some_Reflections_upon_Marriage'),
      academic('astell-sep', 'Stanford Encyclopedia of Philosophy — Mary Astell', 'https://plato.stanford.edu/entries/mary-astell/'),
    ],
    visitorGuide: [
      {heading: 'Reading the marriage contract', items: [
        {label: 'Elite bargain', description: 'Money, debt, lineage, and family ambition organize this specific aristocratic arrangement.', sourceIds: ['marriage-ng', 'marriage-commons']},
        {label: 'Later satire', description: 'The c. 1743 painting postdates Astell and cannot document her viewing or direct influence.', sourceIds: ['marriage-ng', 'astell-sep']},
      ]},
      {heading: 'Following Astell’s critique', items: [
        {label: 'Domestic authority', description: 'Astell tests political opposition to arbitrary rule against assumptions about husbands’ power.', sourceIds: ['astell-marriage', 'astell-sep']},
        {label: 'Educated dependence', description: 'Unequal formation shapes judgment, choices, and bargaining before a marriage agreement is made.', sourceIds: ['astell-marriage', 'astell-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Hogarth’s c. 1743 NG113 object, purchase and provenance, rights, caption, alt, and natural ratio; labeled it post-Astell reception and a specific elite satire; grounded domestic-government analysis in Astell’s text; mapped every claim; and linked the current Mary Astell article.',
    lock: 'fnv1a64:c4c8c59b7ce8e9f4',
  },
  'enlightenment-women-public-intellectuals': {
    plaqueTitle: 'Richard Samuel, Portraits in the Characters of the Muses, 1778',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'mary-astell'}],
    articleTitle: 'Mary Astell',
    invitation: 'Samuel’s later allegory celebrates learned women while its invented and uncertain likenesses reveal how public intellectual identity was manufactured.',
    objectInterpretation: 'The installed painting is Richard Samuel’s 1778 Portraits in the Characters of the Muses in the Temple of Apollo, National Portrait Gallery NPG 4905. The nine identities are conventional or intended; the NPG considers only three likenesses plausible, and Astell is not depicted.',
    overrides: {
      displayName: 'Portraits in the Characters of the Muses',
      shortTitle: 'Women as Public Intellectuals',
      workLabel: 'ALLEGORICAL GROUP PAINTING · LATER RECEPTION',
      dateLabel: 'Richard Samuel · 1778 · National Portrait Gallery, NPG 4905',
      lead: 'Nine allegorical figures appear as the Muses in Samuel’s highly idealized painting. The identities circulated through a related print, but most faces are not secure likenesses and Mary Astell is absent.',
    },
    paragraphs: [
      'Nine women in classical costume assemble around Apollo in Richard Samuel’s Portraits in the Characters of the Muses in the Temple of Apollo. The National Portrait Gallery dates the oil painting to 1778, records NPG 4905 and its 1972 purchase, and explains that Samuel did not take sittings. Intended identities are inferred through a related print; only three likenesses are regarded as plausible, while several faces were invented. The former lifetime-portrait status therefore overstated the evidence. Mary Astell, who died in 1731, is not depicted, and the painting was made forty-seven years after her death.',
      'Astell argues that women possess rational capacities and that their apparent intellectual inferiority reflects defective education, distraction, and social design rather than nature. A Serious Proposal imagines a female community devoted to study, friendship, religious life, and disciplined judgment. Her work participates in public print while confronting institutions that restrict women’s access to learned authority. The later category of “Bluestocking” does not simply name Astell’s circle, and Samuel’s celebrated women belong to a different generation. Linking them requires reception history: her arguments help frame the problem of recognition, but the 1778 painting is not evidence of a direct group lineage.',
      'Samuel’s allegory both expands and controls visibility. Learned women appear collectively monumental, yet classical costume, idealization, and uncertain faces transform individual achievements into a marketable cultural type. The NPG notes that the work was a speculative venture connected with contemporary interest in the Muses. That history prevents an easy story in which recognition simply replaces exclusion. Visitors can ask who receives a public likeness, who is named through another print, and why intellectual authority is staged as exceptional allegory. Astell’s absence matters: the object belongs to later reception of women’s learning, not a portrait record of the philosopher or proof that her program had been fulfilled.',
    ],
    paragraphSourceIds: [['muses-npg', 'muses-commons'], ['astell-proposal', 'astell-sep'], ['muses-npg', 'astell-sep']],
    sources: [
      collection('muses-npg', 'National Portrait Gallery — Portraits in the Characters of the Muses, NPG 4905', 'https://www.npg.org.uk/collections/search/portrait/mw00328/Portraits-in-the-Characters-of-the-Muses-in-the-Temple-of-Apollo'),
      collection('muses-commons', 'Wikimedia Commons — Richard Samuel, Portraits in the Characters of the Muses', 'https://commons.wikimedia.org/wiki/File:Portraits_in_the_Characters_of_the_Muses_in_the_Temple_of_Apollo_by_Richard_Samuel.jpg'),
      primary('astell-proposal', 'Mary Astell — A Serious Proposal to the Ladies, Project Vox source edition', 'https://projectvox.org/astell-1666-1731/attachment/first-edition-of-a-serious-proposal-to-the-ladies-ed/'),
      academic('astell-sep', 'Stanford Encyclopedia of Philosophy — Mary Astell', 'https://plato.stanford.edu/entries/mary-astell/'),
    ],
    visitorGuide: [
      {heading: 'Checking Samuel’s identities', items: [
        {label: 'No sittings', description: 'The NPG reports that Samuel did not paint the nine figures from individual sittings.', sourceIds: ['muses-npg']},
        {label: 'Three plausible likenesses', description: 'Most identities are conventional or inferred, and several faces were invented.', sourceIds: ['muses-npg']},
      ]},
      {heading: 'Locating Astell’s reception', items: [
        {label: 'Rational capacity', description: 'Astell challenges educational and social arrangements that suppress women’s judgment.', sourceIds: ['astell-proposal', 'astell-sep']},
        {label: 'Not a group lineage', description: 'The 1778 painting neither includes Astell nor proves direct continuity from her proposed community.', sourceIds: ['muses-npg', 'astell-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Samuel’s 1778 NPG 4905 painting and purchase, corrected its nine figures from secure lifetime portraits to intended identities with only three plausible likenesses, stated Astell’s absence and later status, preserved the natural ratio, mapped every claim, and linked the current Mary Astell article.',
    lock: 'fnv1a64:e916353632afa088',
  },
  'enlightenment-access-to-knowledge': {
    plaqueTitle: 'François de Troy, Astronomy Lesson of the Duchesse du Maine, c. 1705',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'wollstonecraft'}],
    articleTitle: 'Mary Wollstonecraft',
    invitation: 'A courtly astronomy lesson makes women’s learned attention visible while locating access to instruments, books, and teachers inside rank and private patronage.',
    objectInterpretation: 'The installed painting is François de Troy’s c. 1705 Astronomy Lesson of the Duchesse du Maine at the Château de Sceaux, collection 88.24.1. It predates Wollstonecraft and depicts elite private learning, not broad educational access or her direct influence.',
    overrides: {
      displayName: 'Astronomy Lesson of the Duchesse du Maine',
      shortTitle: 'Access to Knowledge',
      workLabel: 'COURTLY GROUP PORTRAIT · EDUCATIONAL CONTEXT',
      dateLabel: 'François de Troy · c. 1705 · Musée du Domaine de Sceaux, 88.24.1',
      lead: 'The Duchesse du Maine studies among books, diagrams, globes, an armillary sphere, and male intellectuals. The learned scene reveals access made possible by wealth and patronage rather than a universal classroom.',
    },
    paragraphs: [
      'François de Troy’s painting presents Louise Bénédicte, Duchesse du Maine, with Abbé Charles-Claude Genest and Nicolas de Malézieu in a richly furnished learned setting. The Musée du Domaine départemental de Sceaux identifies Astronomy Lesson of the Duchesse du Maine at the Château de Sceaux, dates it to about 1705, and records 88.24.1. Books, diagrams, globes, and an armillary sphere make astronomical inquiry visible, while the collection record and public-domain derivative support the object chain. This is a courtly group portrait, not a generic school, and its broad landscape ratio must remain uncompressed.',
      'Wollstonecraft argues in A Vindication of the Rights of Woman that women’s apparent weakness and superficiality are produced by education organized for dependence, beauty, and male approval. Rational virtue requires serious formation, useful knowledge, bodily strength, economic prospects, and civic respect rather than ornamental accomplishment. Her case is not that a few elite women never learned science. Exceptional access can coexist with structures that deny systematic education to most women. The painting predates Wollstonecraft by decades, so it cannot illustrate her influence; it supplies an earlier example through which privilege and the distribution of intellectual resources become concrete.',
      'The scene’s abundance invites a question about infrastructure. Who owns the library and instruments, who can summon learned companions, and whose study becomes worthy of portraiture? The duchess’s attention is real within the work, but the setting does not prove independent authorship, equal institutional standing, or broad access outside courtly patronage. Wollstonecraft’s argument shifts the standard from admired exception to rights, capacity, and public provision. A responsible comparison neither dismisses elite learning as fake nor mistakes it for equality. It labels the temporal distance, verifies the named sitters, and treats books, instruments, space, wealth, and social permission as conditions of knowledge.',
    ],
    paragraphSourceIds: [['astronomy-sceaux', 'astronomy-commons'], ['vindication-primary', 'wollstonecraft-sep'], ['astronomy-sceaux', 'vindication-primary', 'wollstonecraft-sep']],
    sources: [
      collection('astronomy-sceaux', 'Domaine de Sceaux — Astronomy Lesson of the Duchesse du Maine, 88.24.1', 'https://collections.domaine-de-sceaux.hauts-de-seine.fr/fr/notice/88-24-1-la-lecon-d-astronomie-de-la-duchesse-du-maine-au-chateau-de-sceaux-2910cf49-8353-4f59-8409-b8cbc8a87c34'),
      collection('astronomy-commons', 'Wikimedia Commons — François de Troy, Astronomy Lesson', 'https://commons.wikimedia.org/wiki/File:La_Le%C3%A7on_d%E2%80%99astronomie_de_la_duchesse_du_Maine_-_Fran%C3%A7ois_de_Troy.jpg'),
      primary('vindication-primary', 'Mary Wollstonecraft — A Vindication of the Rights of Woman', 'https://www.gutenberg.org/ebooks/3420'),
      academic('wollstonecraft-sep', 'Stanford Encyclopedia of Philosophy — Mary Wollstonecraft', 'https://plato.stanford.edu/entries/wollstonecraft/'),
    ],
    visitorGuide: [
      {heading: 'Locating the courtly lesson', items: [
        {label: 'Named sitters', description: 'Sceaux identifies the duchess, Genest, and Malézieu rather than a generic teacher and pupil.', sourceIds: ['astronomy-sceaux']},
        {label: 'Elite infrastructure', description: 'Library, instruments, private space, wealth, and patronage make this learned encounter possible.', sourceIds: ['astronomy-sceaux', 'astronomy-commons']},
      ]},
      {heading: 'Testing educational equality', items: [
        {label: 'Produced dependence', description: 'Wollstonecraft argues that gendered education forms weakness rather than revealing natural incapacity.', sourceIds: ['vindication-primary', 'wollstonecraft-sep']},
        {label: 'Exception versus right', description: 'One elite learned woman does not establish systematic access to serious education.', sourceIds: ['vindication-primary', 'astronomy-sceaux']},
      ]},
    ],
    resolution: 'Resolved: verified the Sceaux c. 1705 object, accession, sitters, provenance source, rights, caption, alt, and exact natural ratio; labeled elite earlier context rather than Wollstonecraft’s influence; distinguished exception from educational right; mapped every claim; and linked the current Mary Wollstonecraft article.',
    lock: 'fnv1a64:afb5f76119e6c749',
  },
  'enlightenment-revolution-from-street': {
    plaqueTitle: 'À Versailles, à Versailles, 5 October 1789',
    plaqueType: 'historical-event-or-institutional-context',
    canonicalContexts: [{kind: 'philosopher', id: 'wollstonecraft'}],
    articleTitle: 'Mary Wollstonecraft',
    invitation: 'An anonymous contemporary print of the march toward Versailles places rights beside collective action while its holding, shelfmark, and restoration chain remain unresolved.',
    objectInterpretation: 'The installed 1789 print À Versailles, à Versailles shows a procession with staffs, tools, banners, and a cannon. Commons supplies a restored public-domain reproduction but no durable BnF permalink, shelfmark, or restoration provenance; those institutional details remain unverified.',
    overrides: {
      displayName: 'À Versailles, à Versailles, 5 October 1789',
      shortTitle: 'Revolution from the Street',
      workLabel: 'CONTEMPORARY PRINT · COLLECTIVE POLITICAL ACTION',
      dateLabel: 'Anonymous French printmaker · 1789 · holding and shelfmark unverified',
      lead: 'A large procession advances toward Versailles with banners, tools, staffs, and a cannon. The designed and later-restored image records political representation, not transparent portraits of Wollstonecraft or a uniform crowd.',
    },
    paragraphs: [
      'The installed landscape print presents a mass procession toward Versailles on 5 October 1789. Women and other marchers carry banners, tools, staffs, and a cannon through a designed contemporary image later digitally restored. Commons marks the reproduction public domain but does not supply a durable Bibliothèque nationale de France link, shelfmark, source scan history, or restoration provenance. Those details cannot responsibly be upgraded into a verified BnF/Gallica custody claim. The image is not a photograph or a collection of individualized portraits, and none of its figures should be identified as Wollstonecraft. Its exact natural ratio preserves the procession without resolving authorship or institutional gaps.',
      'Wollstonecraft responded to the French Revolution in A Vindication of the Rights of Men and then extended the argument in A Vindication of the Rights of Woman. She challenges inherited rank, arbitrary authority, and an education that makes women dependent while demanding rational virtue and citizenship. Her political philosophy should not be reduced to commentary on one march, and the print does not show her participation. The October action nevertheless supplies historical context for women acting as political agents in public, pressing claims through bodies, subsistence demands, force, and collective movement rather than only through published declarations.',
      'The procession complicates any clean division between philosophical rights and street politics. A print can celebrate, caricature, simplify, or discipline a crowd; restoration can further shape what modern viewers see. Participants also had differing aims and positions, so “women” does not name one uniform revolutionary subject. The object’s unresolved custody and image history are evidence limits, not reasons to erase the event. Used cautiously, it lets visitors ask how claims become action, who gains public visibility, and how political agency is represented. Wollstonecraft’s text supplies the normative argument, while the anonymous 1789 image supplies contemporary but mediated revolutionary context.',
    ],
    paragraphSourceIds: [['march-commons'], ['vindication-primary', 'wollstonecraft-sep'], ['march-commons', 'vindication-primary', 'wollstonecraft-sep']],
    sources: [
      collection('march-commons', 'Wikimedia Commons — À Versailles, à Versailles, 5 October 1789, restored reproduction', 'https://commons.wikimedia.org/wiki/File:A_Versailles,_%C3%A0_Versailles_5_octobre_1789_-_Restoration.jpg'),
      primary('vindication-primary', 'Mary Wollstonecraft — A Vindication of the Rights of Woman', 'https://www.gutenberg.org/ebooks/3420'),
      academic('wollstonecraft-sep', 'Stanford Encyclopedia of Philosophy — Mary Wollstonecraft', 'https://plato.stanford.edu/entries/wollstonecraft/'),
    ],
    visitorGuide: [
      {heading: 'Checking the procession image', items: [
        {label: 'Designed contemporary print', description: 'The 1789 image represents the march but is not transparent eyewitness photography.', sourceIds: ['march-commons']},
        {label: 'Unresolved source chain', description: 'The available record lacks a durable holding link, shelfmark, and documented restoration provenance.', sourceIds: ['march-commons']},
      ]},
      {heading: 'Connecting action and rights', items: [
        {label: 'Public political agency', description: 'The march supplies context for collective action without making every participant’s aim identical.', sourceIds: ['march-commons']},
        {label: 'Separate normative text', description: 'Wollstonecraft’s arguments about rank, education, virtue, and citizenship come from her writings, not this image.', sourceIds: ['vindication-primary', 'wollstonecraft-sep']},
      ]},
    ],
    resolution: 'Resolved: followed the installed bytes and Commons record, withdrew unsupported BnF/Gallica custody and shelfmark, stated unknown restoration provenance, preserved contemporary-but-mediated status and the natural ratio, separated Wollstonecraft from the marchers, mapped every claim, and linked the current Mary Wollstonecraft article.',
    lock: 'fnv1a64:242fc6d8666dae77',
  },
  'enlightenment-kant-sublime': {
    plaqueTitle: 'Caspar David Friedrich, The Monk by the Sea, 1808–10',
    plaqueType: 'reception-or-transmission-history',
    canonicalContexts: [{kind: 'philosopher', id: 'kant'}],
    articleTitle: 'Immanuel Kant',
    invitation: 'Friedrich’s tiny monk before sea and sky offers later Romantic context for Kant’s sublime while remaining neither his illustration nor evidence of endorsement.',
    objectInterpretation: 'The installed painting is Caspar David Friedrich’s The Monk by the Sea, 1808–10, Alte Nationalgalerie A I 516, Staatliche Museen zu Berlin object 965511. It was made roughly two decades after Kant’s 1790 third Critique and belongs to later reception.',
    overrides: {
      displayName: 'The Monk by the Sea',
      shortTitle: 'Kant and the Sublime',
      workLabel: 'ROMANTIC PAINTING · LATER AESTHETIC RECEPTION',
      dateLabel: 'Caspar David Friedrich · 1808–10 · Alte Nationalgalerie, A I 516',
      lead: 'A tiny dark-robed figure stands before an immense sea and clouded sky. Friedrich’s later painting invites comparison with Kant’s sublime without becoming a worked example supplied by the philosopher.',
    },
    paragraphs: [
      'A solitary dark figure stands at the edge of a vast, nearly empty sea beneath bands of cloud in Friedrich’s The Monk by the Sea. Staatliche Museen zu Berlin identifies the oil painting, dates it 1808–10, records Alte Nationalgalerie inventory A I 516 and object 965511, and supplies the authoritative collection record behind the public-domain reproduction. The wide composition’s exact 640×407 ratio is essential to the figure’s small scale. Friedrich painted the work after Kant’s lifetime and about two decades after the Critique of the Power of Judgment. It is later Romantic context, not a commission, illustration, or painting Kant endorsed.',
      'Kant’s sublime concerns a reflective judgment in which imagination strains before magnitude or power while reason brings ideas that exceed sensible presentation. The mathematical sublime emphasizes magnitude; the dynamical sublime concerns might experienced from a position of safety. The resulting feeling joins displeasure at imaginative inadequacy with pleasure connected to rational vocation. It is not simply terror, beautiful vastness, or a measurable property stored in an object. Kant also embeds the account in claims about faculties, culture, morality, and communicability that remain contested. The primary text, not Friedrich’s seascape, supplies those distinctions.',
      'The painting is compelling because it withholds many conventional cues of scale and narrative. Sea and sky dwarf the monk, yet the viewer remains positioned before a crafted canvas rather than exposed to physical danger. That arrangement can prompt a Kantian reading, but other theological, political, Romantic, and art-historical interpretations remain possible. Declaring the work a perfect diagram of the sublime would flatten both object and theory. A responsible comparison preserves the later date, verified provenance, and difference between visual effect and philosophical argument. Visitors can test where imagination falters and judgment begins while acknowledging that the monk’s identity, experience, and relation to Kant are not given by the bytes.',
    ],
    paragraphSourceIds: [['monk-smb', 'monk-commons'], ['judgment-primary', 'kant-aesthetics-sep'], ['monk-smb', 'judgment-primary', 'kant-aesthetics-sep']],
    sources: [
      collection('monk-smb', 'Staatliche Museen zu Berlin — Friedrich, The Monk by the Sea, object 965511', 'https://id.smb.museum/object/965511/'),
      collection('monk-commons', 'Wikimedia Commons — Friedrich, The Monk by the Sea', 'https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Der_M%C3%B6nch_am_Meer_-_Google_Art_Project.jpg'),
      primary('judgment-primary', 'Immanuel Kant — The Critique of Judgement, Project Gutenberg', 'https://www.gutenberg.org/ebooks/48433'),
      academic('kant-aesthetics-sep', 'Stanford Encyclopedia of Philosophy — Kant’s Aesthetics and Teleology', 'https://plato.stanford.edu/entries/kant-aesthetics/'),
    ],
    visitorGuide: [
      {heading: 'Locating Friedrich’s painting', items: [
        {label: 'A I 516', description: 'The Berlin record supplies title, artist, 1808–10 date, medium, inventory, and object history.', sourceIds: ['monk-smb']},
        {label: 'Later Romantic context', description: 'The painting postdates the third Critique and Kant’s lifetime, with no documented endorsement.', sourceIds: ['monk-smb', 'kant-aesthetics-sep']},
      ]},
      {heading: 'Distinguishing kinds of sublime', items: [
        {label: 'Mathematical magnitude', description: 'Imagination strains to comprehend scale beyond adequate sensible presentation.', sourceIds: ['judgment-primary', 'kant-aesthetics-sep']},
        {label: 'Dynamical power', description: 'Threatening natural power can occasion sublime judgment when contemplated from safety.', sourceIds: ['judgment-primary', 'kant-aesthetics-sep']},
      ]},
    ],
    resolution: 'Resolved: verified Friedrich’s 1808–10 Berlin object, A I 516 and 965511 identifiers, provenance source, public-domain rights, alt, caption, and exact ratio; labeled later Romantic reception; bounded the Kantian comparison; mapped every claim; and linked the current Immanuel Kant article.',
    lock: 'fnv1a64:19697ea9e70e50bd',
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

export const reviewEnlightenmentSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery 15 review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery 15 presentation for ${input.id}.`);
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
      panelKicker: 'Gallery 15 supplemental exhibit',
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
