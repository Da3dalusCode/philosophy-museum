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
  'utility-bentham-young-reformer': {
    plaqueTitle: 'Jeremy Bentham, aged thirteen',
    plaqueType: 'paired-or-grouped-historical-figures',
    invitation: 'This 1760 studio portrait presents Bentham’s precocious elite education before his reform program, opening questions about legal criticism, utility, and administrative clarity.',
    articleTitle: 'Jeremy Bentham',
    dateLabel: 'Studio of Thomas Frye · oil on canvas, 1760 · National Portrait Gallery, NPG 196',
    objectInterpretation: 'The installed painting is Jeremy Bentham, by the studio of Thomas Frye, oil on canvas, 1760, National Portrait Gallery NPG 196. NPG provenance follows Bentham’s father, Lord Lansdowne, a later pawnbroker recovery by Bowring, and Bowring’s 1865 gift; the current digital image has separate use terms.',
    additions: [
      'The National Portrait Gallery attributes the work to Frye’s studio, dates it 1760, and identifies the thirteen-year-old sitter with classical learning; those conventions cannot reveal a mature doctrine.',
      'The extended provenance—from Bentham’s father to Lansdowne, Bowring’s later recovery, and the 1865 NPG gift—shows how the child-prodigy image itself acquired a reformer’s afterlife.',
      'That object history sharpens the interpretive question: codification and legibility may challenge inherited authority while still requiring affected people to contest administrators’ categories and measures.',
    ],
    sources: [collection('object', 'National Portrait Gallery — Jeremy Bentham, NPG 196', 'https://www.npg.org.uk/collections/search/portrait/mw00517/Jeremy-Bentham'), collection('provenance', 'National Portrait Gallery — extended provenance for NPG 196', 'https://www.npg.org.uk/collections/search/portraitExtended/mw00517/Jeremy-Bentham'), primary('primary', 'Bentham — Introduction to the Principles of Morals and Legislation', 'https://historyofeconomicthought.mcmaster.ca/bentham/morals.pdf'), academic('context', 'Stanford Encyclopedia of Philosophy — Jeremy Bentham', 'https://plato.stanford.edu/entries/bentham/')],
    guide: [guide('Studio attribution', 'NPG assigns the 1760 oil to the studio of Thomas Frye, not confidently to Frye alone.', 'object'), guide('Portrait provenance', 'The recorded chain runs through Bentham’s father, Lansdowne, Bowring, and the 1865 NPG gift.', 'provenance'), guide('Blackstone and codification', 'Bentham turned from legal formation toward criticism of inherited, obscure law.', 'context'), guide('Administrative legibility', 'Clear systems remain answerable to people affected by their categories and decisions.', 'primary', 'context')],
    resolution: 'Resolved: corrected the maker to the studio of Thomas Frye and date to 1760, added medium, NPG number, recorded provenance and image-rights distinction, bounded childhood inference, preserved the ratio, mapped claims, and linked the current Jeremy Bentham article.',
    lock: 'fnv1a64:64a95b3f585a0747',
  },
  'utility-penitentiary-reform': {
    plaqueTitle: 'Millbank Penitentiary, Westminster',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Shepherd and Tingle’s 1829 exterior makes punishment an administered environment while inviting visitors to distinguish Millbank from Bentham’s unbuilt Panopticon.',
    articleTitle: 'Jeremy Bentham',
    dateLabel: 'Thomas Hosmer Shepherd, drawn; James Tingle, engraved · 1829 · exact physical copy and holding unverified',
    objectInterpretation: 'The installed engraving is titled Penitentiary, Millbank, Westminster and is signed as drawn by Thomas Hosmer Shepherd and engraved by James Tingle in 1829. Commons references a British Museum source, but no accession establishes that a particular physical copy is held there.',
    additions: [
      'The exterior view records walls, radial mass, traffic, and construction as a printmaker arranged them; it gives no direct testimony about prisoners’ daily confinement or the exact source copy.',
      'Millbank was a distinct government penitentiary rather than Bentham’s Panopticon, so its illness, cost, confusing circulation, and harshness contextualize reform without demonstrating adoption of his plan.',
      'Consequential assessment must include prisoners’ injury, voice, unequal power, remedies, and family disruption alongside expense or deterrence; visible order supplies no presumption of humane outcomes.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Millbank Penitentiary, 1829', 'https://commons.wikimedia.org/wiki/File:Millbank_Penitentiary_1829.jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Jeremy Bentham', 'https://plato.stanford.edu/entries/bentham/')],
    guide: [guide('Exterior print', 'The engraving shows architecture and circulation, not lived prisoner testimony.', 'object'), guide('Holding unresolved', 'A British Museum source reference lacks an accession for the exact physical copy.', 'object'), guide('Panopticon distinction', 'Millbank did not implement Bentham’s exact unbuilt proposal.', 'context'), guide('Consequences and remedies', 'Institutional evaluation includes harm, voice, unequal power, and effective redress.', 'context')],
    resolution: 'Resolved: verified the signed 1829 maker roles, removed the unsupported specific British Museum holding, separated Millbank from the Panopticon, centered prisoner consequences, preserved the ratio, mapped claims, and linked the current Jeremy Bentham article.',
    lock: 'fnv1a64:3cad7db6f3fc624e',
  },
  'utility-law-public-judgment': {
    plaqueTitle: 'The Old Bailey',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Rowlandson and Pugin’s 1808 courtroom scene makes law a public social process, connecting Bentham’s demand for intelligible rules to evidence, procedure, and unequal access.',
    articleTitle: 'Jeremy Bentham',
    dateLabel: 'Thomas Rowlandson and Augustus Charles Pugin · Microcosm of London, plate 58, 1808 · installed scan from a later edition',
    objectInterpretation: 'The installed image reproduces plate 58 of Ackermann’s Microcosm of London, The Old Bailey, designed by Rowlandson and Pugin in 1808. Commons identifies a scan from a 1904 edition; it does not demonstrate that the source copy is a British Museum holding.',
    additions: [
      'Elevated judges, advocates, defendants, officials, and spectators form an authored social theater, while the later scan chain prevents treating the bytes as one catalogued 1808 museum impression.',
      'Bentham’s attacks on legal fictions and inaccessible common law join publicity to codification and evidence reform, but written clarity does not eliminate interpretation, fact-finding, counsel, or enforcement.',
      'Public observation can restrain secrecy and also intensify spectacle or humiliation; a utilitarian review follows delays, error, unequal representation, witness burdens, safety, and opportunities for correction.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Microcosm of London, plate 58, Old Bailey', 'https://commons.wikimedia.org/wiki/File:Microcosm_of_London_Plate_058_-_Old_Bailey_edited.jpg'), primary('primary', 'Bentham — A Fragment on Government', 'https://oll.libertyfund.org/title/bentham-a-fragment-on-government'), academic('context', 'Stanford Encyclopedia of Philosophy — Jeremy Bentham', 'https://plato.stanford.edu/entries/bentham/')],
    guide: [guide('Plate and scan', 'The 1808 design reaches the installation through a later edition scan.', 'object'), guide('No demonstrated BM copy', 'The accessible source does not provide a British Museum accession for this physical impression.', 'object'), guide('Codification and evidence', 'Bentham sought knowable rules and contestable reasons within legal procedure.', 'primary', 'context'), guide('Publicity is not justice', 'Open proceedings still involve unequal counsel, spectacle, error, and remedy.', 'context')],
    resolution: 'Resolved: identified Microcosm plate 58 and its later scan, removed the unsupported British Museum holding, retained publisher and makers, distinguished social representation from trial evidence, preserved the ratio, mapped claims, and linked the current Jeremy Bentham article.',
    lock: 'fnv1a64:f5a2515f13611a74',
  },
  'utility-suffering-moral-standing': {
    plaqueTitle: 'The First Stage of Cruelty',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Hogarth’s 1751 moral satire makes animal torment a public habit; beside Bentham’s later sentience question, it asks how institutions respond to normalized suffering.',
    articleTitle: 'Jeremy Bentham',
    dateLabel: 'William Hogarth · engraving, 1751 · Yale Center for British Art, B1981.25.1440',
    objectInterpretation: 'The installed work is Hogarth’s 1751 engraving The First Stage of Cruelty: First, Children Torturing Animals, Yale Center for British Art B1981.25.1440, supplied through a CC0 record. It predates Bentham and is moral satire rather than evidence that he used the print.',
    additions: [
      'The Yale object identity anchors the crowded scenes of torment, spectatorship, and habituation, but satirical compression cannot quantify ordinary behavior or stand in for every human–animal relation.',
      'Bentham’s later question asks whether a being can suffer, displacing speech and sophisticated reason as thresholds while leaving difficult comparisons among interests and harms unresolved.',
      'Modern animal ethics is a later field, not a label for Hogarth or Bentham; rights, aggregation, uncertain sentience, enforcement, and institutional practice require arguments beyond the image.',
    ],
    sources: [collection('object', 'Yale Center for British Art / Commons — The First Stage of Cruelty, B1981.25.1440', 'https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_First_Stage_of_Cruelty,_First,_Children_Torturing_Animals_-_B1981.25.1440_-_Yale_Center_for_British_Art.jpg'), primary('primary', 'Bentham — Introduction to the Principles of Morals and Legislation', 'https://historyofeconomicthought.mcmaster.ca/bentham/morals.pdf'), academic('context', 'Stanford Encyclopedia of Philosophy — Jeremy Bentham', 'https://plato.stanford.edu/entries/bentham/')],
    guide: [guide('Moral satire', 'Hogarth constructs a public warning rather than a statistical record of cruelty.', 'object'), guide('Predates Bentham', 'The 1751 print was not made to illustrate utilitarianism.', 'object'), guide('Sentience', 'Bentham asks about suffering rather than species, language, or complex rational performance.', 'primary'), guide('Later animal ethics', 'Rights, aggregation, uncertainty, and institutional change extend and dispute his test.', 'context')],
    resolution: 'Resolved: verified the Yale engraving, accession and CC0 source, kept Hogarth distinct from Bentham, separated sentience from later animal-ethics reception, preserved the ratio, mapped claims, and linked the current Jeremy Bentham article.',
    lock: 'fnv1a64:a55669722a187783',
  },
  'liberty-romantic-formation': {
    plaqueTitle: 'William Wordsworth on Helvellyn',
    plaqueType: 'reception-or-transmission-history',
    invitation: 'Haydon’s poetical 1842 portrait provides a visual counterpoint to Mill’s account of Wordsworth, feeling, recovery, and cultivated individuality.',
    articleTitle: 'John Stuart Mill',
    dateLabel: 'Benjamin Robert Haydon · oil on canvas, 1842 · National Portrait Gallery, NPG 1857',
    objectInterpretation: 'The installed painting is Haydon’s 1842 lifetime portrait William Wordsworth, NPG 1857. Wordsworth sat in London in June, while Haydon painted the Helvellyn background from memory; the resulting poetical construction is not a scene from Mill’s crisis or their meeting.',
    additions: [
      'The folded pose and mountain setting deliberately stage poetic identity, and the NPG sitting history prevents the landscape from being mistaken for an outdoor portrait session or biographical reportage.',
      'Mill’s 1826 crisis and later account of Wordsworth concern the cultivation of durable feeling, revising rather than abandoning his utilitarian inheritance and its attention to character.',
      'The painting supplies later contextual imagery only: liberty and individuality still depend on material, educational, familial, and workplace conditions that poetry alone neither documents nor remedies.',
    ],
    sources: [collection('object', 'National Portrait Gallery — William Wordsworth, NPG 1857', 'https://www.npg.org.uk/collections/search/portrait/mw06936/William-Wordsworth'), collection('provenance', 'National Portrait Gallery — extended record for Wordsworth on Helvellyn', 'https://www.npg.org.uk/collections/search/portraitExtended/mw06936/William-Wordsworth?displayNo=60&rNo=6&sText=wordsworth&search=sp'), primary('primary', 'Mill — On Liberty and The Subjection of Women', 'https://oll.libertyfund.org/titles/mill-on-liberty-and-the-subjection-of-women-1879-ed?html=true'), academic('context', 'Stanford Encyclopedia of Philosophy — John Stuart Mill', 'https://plato.stanford.edu/entries/mill/')],
    guide: [guide('Poetical construction', 'Wordsworth sat in London; Haydon supplied the Helvellyn background from memory.', 'object', 'provenance'), guide('Not Mill’s crisis', 'The portrait neither depicts Mill nor documents his reading experience.', 'object'), guide('Cultivated feeling', 'Mill describes a recovery that enlarged his view of character and valuable experience.', 'context'), guide('Conditions of individuality', 'Education, work, family, and public opinion shape capacities for experiments in living.', 'primary', 'context')],
    resolution: 'Resolved: verified Haydon’s 1842 NPG object and sitting history, distinguished the remembered landscape from reportage and Mill’s life, preserved the reception relation and ratio, mapped claims, and linked the current John Stuart Mill article.',
    lock: 'fnv1a64:30aafff83689ae60',
  },
  'liberty-harriet-collaboration': {
    plaqueTitle: 'Harriet Taylor Mill',
    plaqueType: 'paired-or-grouped-historical-figures',
    invitation: 'This c. 1834 portrait introduces Taylor Mill as an essayist and sustained interlocutor while the archive requires collaboration to be credited without invented sentence-level authorship.',
    articleTitle: 'John Stuart Mill',
    dateLabel: 'Unidentified artist · oil on canvas laid on board, c. 1834 · NPG 5489',
    objectInterpretation: 'The installed painting is NPG 5489, Harriet Mill (née Hardy), by an unknown artist, oil on canvas laid on board, c. 1834, given by F. A. von Hayek in 1982. The Commons reproduction carries a separate PD-Art rights caveat; maker uncertainty does not make the catalog date unknown.',
    additions: [
      'The portrait preserves a catalogued sitter, medium, approximate date, accession, and gift history while revealing nothing by itself about private conversation, drafting, or intellectual division of labor.',
      'Taylor Mill’s Enfranchisement of Women, correspondence, and Mill’s acknowledgements support substantial participation; scholars still dispute the exact scope of collaboration on individual works, especially On Liberty.',
      'Gendered publication conventions and archival gaps require specific attribution rather than a choice between decorative “influence” and unsupported total coauthorship; uncertainty must remain visible at the claim level.',
    ],
    sources: [collection('object', 'National Portrait Gallery — Harriet Mill, NPG 5489', 'https://www.npg.org.uk/collections/search/portrait?mkey=mw07681'), collection('rights', 'Wikimedia Commons — Harriet Mill reproduction and rights caveat', 'https://commons.wikimedia.org/wiki/File:Harriet_Mill_from_NPG.jpg'), academic('context', 'Stanford Encyclopedia of Philosophy — Mill’s Moral and Political Philosophy', 'https://plato.stanford.edu/entries/mill-moral-political/')],
    guide: [guide('Catalogued c. 1834', 'The artist is unknown, but the NPG does supply an approximate date and medium.', 'object'), guide('Gift and reproduction', 'Hayek gave the work in 1982; the digital reproduction has a separate rights caveat.', 'object', 'rights'), guide('Enfranchisement of Women', 'Taylor Mill’s own publication supplies direct evidence of her positions.', 'context'), guide('Attribution discipline', 'Collaboration should be credited without inventing sentence-level coauthorship.', 'context')],
    resolution: 'Resolved: corrected the date to c. 1834, added medium, accession and Hayek gift, retained the unknown artist and reproduction-rights caveat, bounded collaboration claims, preserved the ratio, mapped claims, and linked the current John Stuart Mill article.',
    lock: 'fnv1a64:89643109a6478fb5',
  },
  'liberty-cooperative-experiments': {
    plaqueTitle: 'The Rochdale Pioneers’ Shop, Toad Lane',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    invitation: 'A 2015 digital reproduction of an undated historic shop image grounds Rochdale’s consumer cooperative while distinguishing it from Mill’s producer-association ideal.',
    articleTitle: 'John Stuart Mill',
    dateLabel: 'The Co-op Group · digital photograph/reproduction captured 14 October 2015 · CC BY 2.0',
    objectInterpretation: 'The installed bytes are The Co-op Group’s 2015 digital photograph or reproduction of an undated historic image of the former Pioneers’ shop at 31 Toad Lane. The original image’s maker, date, medium, holding, and provenance are unresolved; the present museum site does not prove custody of that source image.',
    additions: [
      'The visible monochrome shop view is nested inside a modern licensed derivative, so its architecture may ground place while neither file date nor current museum identity supplies an original photograph date.',
      'Rochdale’s 1844 consumer cooperative organized purchasing, membership, surplus return, and governance; Mill’s producer cooperation concerns a related but nonidentical transformation of workplace authority.',
      'Comparison should test capital, markets, management, membership barriers, and internal power without claiming that one shop implemented Mill’s program or escaped every dependency of market society.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Toad Lane derivative, source and licence', 'https://commons.wikimedia.org/wiki/File:Toad_Lane,_Rochdale,_Lancashire_(27380261546).jpg'), collection('history', 'Rochdale Pioneers Museum — Our Story', 'https://rochdalepioneersmuseum.coop/wp-content/uploads/2013/02/Our-Story.pdf'), primary('primary', 'Online Library of Liberty — John Stuart Mill corpus', 'https://oll.libertyfund.org/people/john-stuart-mill')],
    guide: [guide('Nested image', 'The installed file is a 2015 digital reproduction of an older undated image.', 'object'), guide('Original unresolved', 'Maker, date, medium, repository, and provenance of the historic source remain unknown.', 'object'), guide('Consumer cooperative', 'Rochdale reorganized purchasing, membership, governance, and distribution of surplus.', 'history'), guide('Producer association', 'Mill’s workplace ideal is related but not identical to the Toad Lane experiment.', 'primary')],
    resolution: 'Resolved: reconciled the installed 2015 derivative against the undated nested image, removed invented original maker and museum custody, preserved the CC BY 2.0 source, distinguished consumer from producer cooperation, corrected the ratio, mapped claims, and linked the current John Stuart Mill article.',
    lock: 'fnv1a64:174c3ec00ac7705d',
  },
  'liberty-public-assembly': {
    plaqueTitle: 'To the Memory of Hyde Park Railings',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'This 1866 satirical broadside memorializes barriers broken during the Reform League confrontation, making assembly a problem of access, policing, and political voice.',
    articleTitle: 'John Stuart Mill',
    dateLabel: '“Pasquin” (probably pseudonymous); published by F. Farrah · woodcut broadside, 1866 · People’s History Museum source',
    objectInterpretation: 'The installed broadside is To the Memory of Hyde Park Railings, that fell July 23, 1866. It is signed “Pasquin” and prints F. Farrah, 282 Strand, as publisher; Pasquin is probably a pseudonym, so the artist remains unidentified. The People’s History Museum source supports context, not neutral reportage.',
    additions: [
      'The mock funeral monument, policemen, printed names, and publisher line turn a confrontation into partisan memorial parody; satire selects targets and cannot reconstruct every action in Hyde Park.',
      'The Reform League campaign sought expanded manhood suffrage, not universal suffrage, and public assembly connected claims about speech to physical access, collective presence, and police authority.',
      'Mill’s liberty framework can illuminate official veto and public-order arguments, but the broadside cannot settle safety, representation, disruption, or whose political presence remained excluded after reform.',
    ],
    sources: [collection('object', 'People’s History Museum–sourced record — Hyde Park Railings broadside', 'https://picryl.com/media/in-memory-of-the-hyde-park-railings-1866-c1f048'), academic('catalog', 'Jarndyce catalogue — Pasquin? and F. Farrah attribution', 'https://www.jarndyce.co.uk/catalogues/pdfs/Jarndyce_Catalogue_217.pdf'), primary('primary', 'Mill — On Liberty and The Subjection of Women', 'https://oll.libertyfund.org/titles/mill-on-liberty-and-the-subjection-of-women-1879-ed?html=true'), academic('context', 'Stanford Encyclopedia of Philosophy — Mill’s Moral and Political Philosophy', 'https://plato.stanford.edu/entries/mill-moral-political/')],
    guide: [guide('Satirical broadside', 'The image is memorial parody rather than eyewitness reportage.', 'object'), guide('Qualified signature', 'Pasquin is probably pseudonymous; F. Farrah is the printed publisher.', 'object', 'catalog'), guide('Manhood suffrage', 'The Reform League demand was broad male enfranchisement, not universal suffrage.', 'catalog'), guide('Assembly and access', 'Political voice depends on public space, collective presence, policing, and safety.', 'primary', 'context')],
    resolution: 'Resolved: added the Pasquin and F. Farrah evidence with uncertainty, retained satire and People’s History Museum source limits, corrected the franchise description, preserved the ratio, mapped claims, and linked the current John Stuart Mill article.',
    lock: 'fnv1a64:da35fcf3b53d0790',
  },
  'liberty-womens-suffrage': {
    plaqueTitle: 'The 1866 Women’s Suffrage Petition',
    plaqueType: 'reception-or-transmission-history',
    invitation: 'Newcombe’s 1910 commemoration of Emily Davies and Elizabeth Garrett presenting the petition to Mill invites inquiry into equality, political voice, and movement memory.',
    articleTitle: 'John Stuart Mill',
    dateLabel: 'Bertha Newcombe · oil on canvas, 1910 · The Women’s Library at LSE, TWL.1998.60',
    objectInterpretation: 'The installed signed oil is Bertha Newcombe’s 1910 commemoration of Emily Davies and Elizabeth Garrett presenting the 1866 women’s suffrage petition to John Stuart Mill at an apple stall in Westminster Hall, LSE TWL.1998.60. It is movement memory, not 1866 eyewitness reportage.',
    additions: [
      'The apple stall, rolled petition, and identifiable participants stage the 7 June exchange forty-four years later, so the picture documents suffrage commemoration more directly than the original handover.',
      'Mill presented the petition, proposed an unsuccessful 1867 amendment, and argued in The Subjection of Women that apparent capacities had been historically formed under unequal institutions.',
      'The vote belongs with property, education, work, marriage, and practical exit from domination, while the campaign’s social and franchise limits prevent one commemorative scene from representing all women.',
    ],
    sources: [collection('object', 'LSE Library — The Women’s Library', 'https://www.lse.ac.uk/library/collection-highlights/the-womens-library'), collection('history', 'The National Archives — 1866 mass women’s suffrage petition', 'https://www.nationalarchives.gov.uk/explore-the-collection/stories/the-1866-mass-womens-suffrage-petition/'), primary('primary', 'Mill — On Liberty and The Subjection of Women', 'https://oll.libertyfund.org/titles/mill-on-liberty-and-the-subjection-of-women-1879-ed?html=true'), academic('context', 'Stanford Encyclopedia of Philosophy — John Stuart Mill', 'https://plato.stanford.edu/entries/mill/')],
    guide: [guide('1910 commemoration', 'Newcombe painted a later movement memory rather than a scene witnessed in 1866.', 'object'), guide('Named participants', 'The record identifies Emily Davies, Elizabeth Garrett, and John Stuart Mill.', 'object', 'history'), guide('Petition and amendment', 'Mill presented the petition and moved a parliamentary amendment in 1867.', 'history', 'context'), guide('Subjection and formation', 'Unequal institutions shape capacities, options, and evidence invoked to justify subordination.', 'primary', 'context')],
    resolution: 'Resolved: verified Newcombe’s 1910 oil, three participants, LSE collection number and public-domain source, distinguished commemoration from 1866 reportage, deepened the political context, preserved the ratio, mapped claims, and linked the current John Stuart Mill article.',
    lock: 'fnv1a64:d168814d0554f430',
  },
  'liberty-imperial-exception': {
    plaqueTitle: 'East India Company Coinage',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    invitation: 'A photographed museum display of Company coinage makes commerce, revenue, and territorial government tangible within the institutional world that complicates Mill’s liberty.',
    articleTitle: 'John Stuart Mill',
    dateLabel: 'Assorted East India Company coin display · National Museum, New Delhi · Daderot photograph, 2010',
    objectInterpretation: 'The installed image is Daderot’s 2010 photograph of a labeled National Museum, New Delhi display board containing assorted East India Company coins. It is not one coin or one dated issue; individual makers, dates, accessions, and provenance cannot be recovered from the image, while the photographer dedicated the photograph to the public domain.',
    additions: [
      'Rows of differently sized coins and regional labels materialize a museum classification of Company authority, but the photograph cannot support a general catalog claim for every displayed object.',
      'Mill’s East India Company career and his discussion of dependencies qualify the stated scope of liberal liberty by assigning governing judgment through a civilizational hierarchy of readiness.',
      'The tension should neither erase the anti-paternalist arguments nor excuse empire; it asks who defines competence, whose testimony counts, and how a declared exception can reproduce domination.',
    ],
    sources: [collection('object', 'Wikimedia Commons — East India Company coins, National Museum, New Delhi', 'https://commons.wikimedia.org/wiki/File:East_India_Company_coins_-_National_Museum,_New_Delhi_-_IMG_2224.jpg'), primary('primary', 'Mill — Considerations on Representative Government', 'https://oll.libertyfund.org/title/mill-considerations-on-representative-government'), academic('context', 'Stanford Encyclopedia of Philosophy — John Stuart Mill', 'https://plato.stanford.edu/entries/mill/')],
    guide: [guide('Display, not one coin', 'The photograph shows assorted objects with regional labels rather than a single dated issue.', 'object'), guide('Provenance limit', 'Individual accessions, dates, makers, and coin histories are not legible from the installed image.', 'object'), guide('Government of dependencies', 'Mill’s representative-government text assigns a different governing framework to dependencies.', 'primary'), guide('Who defines readiness?', 'Civilizational competence claims complicate liberal opposition to paternalism.', 'primary', 'context')],
    resolution: 'Resolved: identified the 2010 museum-display photograph, removed singular-coin and undocumented accession claims, separated photographer rights from object histories, made the imperial exception explicit, preserved the ratio, mapped claims, and linked the current John Stuart Mill article.',
    lock: 'fnv1a64:663b36b0e36e8608',
  },
  'capital-feuerbach-inversion': {
    plaqueTitle: 'Ludwig Feuerbach',
    plaqueType: 'reception-or-transmission-history',
    invitation: 'Weger’s nineteenth-century engraving invites visitors to distinguish Feuerbach’s critique of religion from Marx’s turn toward social practice and historical relations.',
    articleTitle: 'Karl Marx',
    dateLabel: 'August Weger · engraving, nineteenth century · exact date, impression, holding, and provenance unverified',
    objectInterpretation: 'The installed portrait is a nineteenth-century engraving of Ludwig Feuerbach signed by August Weger. Commons supports the reproduced image and public-domain status, but the original print’s exact date, impression, holding institution, and provenance remain unresolved; the likeness is not evidence for a doctrine.',
    additions: [
      'The bearded seated figure and engraved signature establish portrait format and maker while leaving the circumstances of production, custody, and any documented sitting unknown.',
      'Feuerbach interprets religious predicates as alienated human powers; Marx’s Theses on Feuerbach redirects critique toward sensuous activity, social relations, and transformative practice.',
      'That later criticism must not turn Feuerbach into a mere proto-Marx: projection, species-being, praxis, and historical relation mark genuine continuities and disagreements rather than a simple supersession with a foreordained endpoint.',
    ],
    sources: [collection('object', 'Wikimedia Commons — August Weger engraving of Ludwig Feuerbach', 'https://commons.wikimedia.org/wiki/File:Feuerbach_Ludwig.jpg'), primary('primary', 'Marx — Theses on Feuerbach', 'https://www.marxists.org/archive/marx/works/1845/theses/theses.htm'), academic('context', 'Stanford Encyclopedia of Philosophy — Karl Marx', 'https://plato.stanford.edu/entries/marx/')],
    guide: [guide('Portrait engraving', 'The object identifies Feuerbach but does not picture a philosophical argument.', 'object'), guide('Unresolved impression', 'Exact date, physical holding, provenance, and sitting history remain unknown.', 'object'), guide('Projection', 'Feuerbach relocates theological predicates in alienated human powers.', 'context'), guide('Praxis', 'Marx redirects criticism toward sensuous social activity and transformation.', 'primary', 'context')],
    resolution: 'Resolved: retained Weger’s secure maker while stating the unresolved date, impression, holding and provenance, separated portrait evidence from doctrine, distinguished Feuerbach from Marx’s practical turn, preserved the ratio, mapped claims, and linked the current Karl Marx article.',
    lock: 'fnv1a64:6b9d2f72508cb033',
  },
  'capital-alienated-labor': {
    plaqueTitle: 'The Iron Rolling Mill (Modern Cyclopes)',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Menzel’s industrial painting invites comparison of represented cooperation, machinery, heat, rest, and command with Marx’s distinct early and mature analyses of labor.',
    articleTitle: 'Karl Marx',
    dateLabel: 'Adolph von Menzel · oil on canvas, 1872–1875 · Alte Nationalgalerie, A I 201',
    objectInterpretation: 'The installed work is Menzel’s Eisenwalzwerk (Moderne Cyklopen), The Iron Rolling Mill (Modern Cyclopes), oil on canvas, 1872–1875, Alte Nationalgalerie A I 201. Menzel developed the composition through studies in Berlin metal factories; it is not a neutral photograph or one-site transcript.',
    additions: [
      'Workers coordinate around furnaces, rollers, belts, food, and rest in a composition assembled through studies, so every visible relation remains Menzel’s represented selection rather than raw factory data.',
      'Marx’s 1844 alienation analysis should be distinguished from Capital’s later treatment of wage labor, cooperation, machinery, labor power, and surplus value rather than merged into one slogan.',
      'The painting prompts questions about pace, safety, knowledge, control, and surplus without implying that every machine, difficult task, or cooperative process is by itself alienated labor.',
    ],
    sources: [collection('object', 'Staatliche Museen zu Berlin — Eisenwalzwerk, A I 201', 'https://visit.smb.museum/object/obj-958605'), primary('primary', 'Marx — Capital, volume I', 'https://www.marxists.org/archive/marx/works/1867-c1/'), academic('context', 'Stanford Encyclopedia of Philosophy — Karl Marx', 'https://plato.stanford.edu/entries/marx/')],
    guide: [guide('1872–1875', 'The painting developed over several years rather than belonging simply to 1875.', 'object'), guide('Mediated factory scene', 'Studies informed the composition; it is not a single-site documentary photograph.', 'object'), guide('Early alienation', 'The 1844 account names relations to product, activity, species life, and other people.', 'context'), guide('Mature analysis', 'Capital examines labor power, cooperation, machinery, command, and surplus through different categories.', 'primary', 'context')],
    resolution: 'Resolved: corrected Menzel’s object date to 1872–1875, added title, medium and accession, stated the study-based composition, separated early alienation from Capital, corrected the derivative and natural ratio, mapped claims, and linked the current Karl Marx article.',
    lock: 'fnv1a64:e031d2968214903c',
  },
  'capital-machinery-knowledge': {
    plaqueTitle: 'Jacquard Loom',
    plaqueType: 'object-manuscript-site-or-archaeological-context',
    invitation: 'This nineteenth-century Scottish loom invites visitors to trace stored pattern information, continuing skill, investment, and ownership rather than treating a device as an autonomous cause.',
    articleTitle: 'Karl Marx',
    dateLabel: 'Nineteenth-century Scottish handloom with Jacquard attachment · NMS T.1934.241 · Alf van Beem photograph, 2020',
    objectInterpretation: 'The installed CC0 photograph by Alf van Beem, dated 18 February 2020, shows National Museums Scotland T.1934.241: a nineteenth-century Scottish handloom with Jacquard attachment, used by Robert and James Hamilton of Stonehouse and probably made by Joseph Hood of Newmilns.',
    additions: [
      'The wooden frame, card chain, mechanism, and partly woven textile document this particular museum object, not a generic first Jacquard machine or a typical factory floor.',
      'Punched cards coordinate warp selection while preparation, maintenance, interpretation, and weaving skill remain; technical storage reorganizes labor rather than simply eliminating knowledge.',
      'Marx’s machinery and fixed-capital analysis asks who controls socially accumulated knowledge, tempo, investment, and output; the device alone neither causes exploitation nor completes a simple origin story for computing.',
    ],
    sources: [collection('object', 'National Museums Scotland — The Jacquard loom', 'https://www.nms.ac.uk/discover-catalogue/the-jacquard-loom-innovation-in-textiles-and-computing'), primary('primary', 'Marx — Capital, volume I', 'https://www.marxists.org/archive/marx/works/1867-c1/'), academic('context', 'Stanford Encyclopedia of Philosophy — Karl Marx', 'https://plato.stanford.edu/entries/marx/')],
    guide: [guide('Specific Scottish loom', 'NMS identifies this handloom, attachment, users, and probable maker.', 'object'), guide('2020 photograph', 'The installed CC0 image documents a museum display, not nineteenth-century operation.', 'object'), guide('Punched-card coordination', 'Stored pattern selection reorganizes but does not abolish skilled work.', 'object'), guide('Control of knowledge', 'Marx’s question concerns ownership and social organization, not technological determinism.', 'primary', 'context')],
    resolution: 'Resolved: identified NMS T.1934.241, its users, probable maker, attachment, 2020 photographer and CC0 rights, bounded computing and deskilling claims, preserved the ratio, mapped claims, and linked the current Karl Marx article.',
    lock: 'fnv1a64:8b1ae6776337dccb',
  },
  'capital-commodity-spectacle': {
    plaqueTitle: 'The Foreign Department, Crystal Palace',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'McNeven’s 1851 exhibition interior invites visitors to read display, classification, and world trade beside Marx’s analysis of commodity form and social appearance.',
    articleTitle: 'Karl Marx',
    dateLabel: 'J. McNeven · colored engraving, 1851 · Victoria and Albert Museum',
    objectInterpretation: 'The installed image is J. McNeven’s 1851 colored engraving The Foreign Department in the Crystal Palace, held by the Victoria and Albert Museum and reproduced as public-domain historical art. It documents an authored exhibition view, not proof of Marx’s commodity theory.',
    additions: [
      'The iron-and-glass interior, national signage, goods, statues, and visitors organize abundance through display and classification while leaving production, transport, and many laboring bodies outside the frame.',
      'Capital distinguishes use-value and exchange-value, and commodity fetishism names a social appearance in which relations among producers take the form of relations among things.',
      'A critical reconstruction must restore labor, colonial extraction, credit, transport, and state power without calling every display a fetish or attributing the later category of “spectacle” to Marx.',
    ],
    sources: [collection('object', 'Wikimedia Commons / V&A — Crystal Palace interior', 'https://commons.wikimedia.org/wiki/File:Crystal_Palace_-_interior.jpg'), primary('primary', 'Marx — Capital, volume I', 'https://www.marxists.org/archive/marx/works/1867-c1/'), academic('context', 'Stanford Encyclopedia of Philosophy — Karl Marx', 'https://plato.stanford.edu/entries/marx/')],
    guide: [guide('Exhibition view', 'The engraving stages the Foreign Department rather than recording all production behind it.', 'object'), guide('Display and classification', 'National labels and arranged goods create a public order of comparison.', 'object'), guide('Use and exchange value', 'Marx separates material usefulness from the commodity’s value form.', 'primary'), guide('Fetishism, not spectacle', 'A specific social appearance should not be replaced with a later catch-all label.', 'primary', 'context')],
    resolution: 'Resolved: verified McNeven’s 1851 V&A engraving and public-domain record, kept exhibition display distinct from theory, specified commodity fetishism and later spectacle limits, preserved the ratio, mapped claims, and linked the current Karl Marx article.',
    lock: 'fnv1a64:f167e892dfe4e0b1',
  },
  'capital-class-revolution-1848': {
    plaqueTitle: 'The Barricade, rue de la Mortellerie, June 1848',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Meissonier’s c. 1850–1851 aftermath painting invites visitors to connect the June Days with Marx’s later analysis of alliances, institutions, class fractions, and defeat.',
    articleTitle: 'Karl Marx',
    dateLabel: 'Jean-Louis-Ernest Meissonier · oil on canvas, c. 1850–1851 · Louvre RF 1942-31',
    objectInterpretation: 'The installed bytes are Meissonier’s Louvre oil La Barricade, rue de la Mortellerie, June 1848, also Souvenir de guerre civile, c. 1850–1851, RF 1942-31—not the different 1848 watercolor RF 51769. It is a later artistic response to the June Days aftermath.',
    additions: [
      'Bodies, blood, stones, and the narrow street confront viewers with aftermath through a composition made roughly two years later, not a transparent casualty census or event photograph.',
      'The February Revolution, closure of the National Workshops, and June repression belong to a chronology after the Communist Manifesto; Marx analyzed them later in Class Struggles and Eighteenth Brumaire.',
      'Those texts examine class fractions, alliances, organization, and state capacity rather than promising deterministic revolution, while the painting cannot establish every victim’s identity, politics, or circumstances.',
    ],
    sources: [collection('object', 'Musée du Louvre — La Barricade, RF 1942-31', 'https://collections.louvre.fr/en/ark%3A/53355/cl010064313'), primary('primary', 'Marx — The Class Struggles in France', 'https://www.marxists.org/archive/marx/works/1850/class-struggles-france/'), primary('primary-2', 'Marx — The Eighteenth Brumaire of Louis Bonaparte', 'https://www.marxists.org/archive/marx/works/1852/18th-brumaire/'), academic('context', 'Stanford Encyclopedia of Philosophy — Karl Marx', 'https://plato.stanford.edu/entries/marx/')],
    guide: [guide('Correct Louvre object', 'The installation is RF 1942-31, an oil, not the distinct watercolor RF 51769.', 'object'), guide('Aftermath and content warning', 'The painting depicts corpses, blood, and broken barricade stones after the June Days.', 'object'), guide('June Days chronology', 'Workshop closure and repression followed February 1848 and the Manifesto’s publication.', 'primary'), guide('Class fractions and state', 'Marx’s later analyses resist a simple, automatic revolution narrative.', 'primary', 'primary-2', 'context')],
    resolution: 'Resolved: verified the installed Louvre oil against the similarly titled watercolor, corrected date, title, medium and accession, stated the aftermath and chronology, rejected deterministic reading, preserved the ratio, mapped claims, and linked the current Karl Marx article.',
    lock: 'fnv1a64:42fb7b4825696415',
  },
  'transformations-ricardo-political-economy': {
    plaqueTitle: 'David Ricardo',
    plaqueType: 'paired-or-grouped-historical-figures',
    invitation: 'Phillips’s lifetime portrait introduces Ricardo’s distribution problem before visitors compare classical political economy with Marx’s historical critique of capital.',
    articleTitle: 'Karl Marx',
    dateLabel: 'Thomas Phillips · oil on canvas, c. 1821 · National Portrait Gallery record NPG L241; current custody to confirm',
    objectInterpretation: 'The installed portrait is Thomas Phillips’s c. 1821 lifetime oil of David Ricardo, catalogued by the National Portrait Gallery as NPG L241. Available records indicate a loan association with Christopher Ricardo, so present ownership, custody, and display should not be asserted beyond the catalog identifier.',
    additions: [
      'The seated figure, dark coat, and papers provide public biographical context, not a diagram of value, rent, wages, profit, or the circumstances of composing the Principles.',
      'Ricardo analyzes distribution among wages, profits, and rent; Marx learned from that field while distinguishing labor power from labor and historicizing capital’s social relations.',
      'Shared vocabulary should not make Ricardo a proto-Marxist: method, history, class, exploitation, and political conclusions differ even where later critique inhabits questions classical economy made visible.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Thomas Phillips portrait of David Ricardo', 'https://commons.wikimedia.org/wiki/File:Portrait_of_David_Ricardo_by_Thomas_Phillips.jpg'), primary('ricardo', 'David Ricardo — Principles of Political Economy and Taxation', 'https://www.gutenberg.org/ebooks/33310'), primary('primary', 'Marx — Capital, volume I', 'https://www.marxists.org/archive/marx/works/1867-c1/'), academic('context', 'Stanford Encyclopedia of Philosophy — Karl Marx', 'https://plato.stanford.edu/entries/marx/')],
    guide: [guide('Lifetime portrait', 'The c. 1821 oil identifies Ricardo but does not visualize his economic argument.', 'object'), guide('Custody caution', 'NPG L241 is secure as a catalog record; current ownership and display require confirmation.', 'object'), guide('Distribution problem', 'Ricardo organizes political economy around wages, profit, and rent.', 'ricardo'), guide('Labor power', 'Marx’s historical account distinguishes labor capacity and surplus production.', 'primary', 'context')],
    resolution: 'Resolved: verified Phillips, date, medium and NPG L241 while retaining custody uncertainty, separated portrait from economic argument, distinguished Ricardo from Marx, preserved the ratio, mapped claims, and linked the current Karl Marx article.',
    lock: 'fnv1a64:49b249507ec0fee8',
  },
  'transformations-industrial-city': {
    plaqueTitle: 'Manchester from Kersal Moor',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Wyld’s romanticized 1852 panorama invites visitors to read pastoral foreground and industrial scale together while asking what class infrastructure lies outside the view.',
    articleTitle: 'Karl Marx',
    dateLabel: 'William Wyld · watercolor, 1852 · Royal Collection, RCIN 920223',
    objectInterpretation: 'The installed work is William Wyld’s 1852 watercolor Manchester from Kersal Moor, Royal Collection RCIN 920223. Commissioned after Victoria and Albert’s 1851 Manchester visit for a royal souvenir album, it deliberately romanticizes the view and is not neutral urban data.',
    additions: [
      'Rustic figures, goats, and open moor occupy the foreground while factories and smoke spread across the horizon, making distance and pastoral contrast part of the commissioned composition.',
      'Engels investigated housing, health, work, and class in industrial Manchester, evidence the watercolor does not show simply because its skyline makes industrial growth visible.',
      'A Marxian reading of infrastructure asks how transport, housing, pollution, sanitation, and time distribute costs and access; that is a sourced interpretive application, not a quantity measured by painted smoke.',
    ],
    sources: [collection('object', 'Royal Collection — Manchester from Kersal Moor, RCIN 920223', 'https://www.rct.uk/collection/publications/victoria-albert-our-lives-in-watercolour/manchester-from-kersal-moor'), primary('primary', 'Engels — The Condition of the Working Class in England', 'https://www.marxists.org/archive/marx/works/1845/condition-working-class/'), academic('context', 'Stanford Encyclopedia of Philosophy — Karl Marx', 'https://plato.stanford.edu/entries/marx/')],
    guide: [guide('Royal commission', 'The watercolor belonged to a souvenir project after the 1851 royal visit.', 'object'), guide('Romanticized view', 'Pastoral foreground and distant industrial haze are deliberate compositional choices.', 'object'), guide('Engels’s investigation', 'Housing, health, work, and class require evidence beyond the panorama.', 'primary'), guide('Class infrastructure', 'Transport, sanitation, housing, pollution, and time distribute industrial costs unevenly.', 'primary', 'context')],
    resolution: 'Resolved: verified Wyld’s 1852 Royal Collection watercolor, accession and commission, foregrounded its stated romanticization, separated skyline from social data, preserved the ratio, mapped claims, and linked the current Karl Marx article.',
    lock: 'fnv1a64:7f37fff056a5d207',
  },
  'transformations-gendered-labor': {
    plaqueTitle: 'The Sempstress',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Redgrave’s 1846 reform painting invites visitors to bring domestic outwork, piece rates, gendered risk, and later social-reproduction analysis into view.',
    articleTitle: 'Karl Marx',
    dateLabel: 'Richard Redgrave · oil on canvas, 1846 · Tate T14166; known version of the lost 1844 original',
    objectInterpretation: 'The installed painting is Tate T14166, Richard Redgrave’s 1846 The Sempstress. Tate identifies it as the only known version of the lost original shown at the Royal Academy in 1844 with lines from Thomas Hood’s Song of the Shirt; this is not that exhibited original.',
    additions: [
      'A lone seamstress, clock, candle, window, and sparse room stage a sentimental reform appeal whose composed pathos cannot serve as statistics for all working women.',
      'Domestic outwork and piece rates shift workspace, heat, illness, tools, waiting time, and reproduction costs beyond the factory while leaving workers exposed to market and contractor control.',
      'Social reproduction is a later feminist-socialist development rather than a theory to attribute wholesale to Marx; it extends analysis by asking how labor power and daily life are sustained.',
    ],
    sources: [collection('object', 'Tate — Richard Redgrave, The Sempstress, T14166', 'https://www.tate.org.uk/art/artworks/redgrave-the-sempstress-t14166'), primary('primary', 'Marx — Capital, volume I', 'https://www.marxists.org/archive/marx/works/1867-c1/'), academic('context', 'Stanford Encyclopedia of Philosophy — Karl Marx', 'https://plato.stanford.edu/entries/marx/')],
    guide: [guide('1846 known version', 'The installed Tate painting is not the lost work shown at the Royal Academy in 1844.', 'object'), guide('Sentimental staging', 'The scene directs moral attention without transparently representing all seamstresses.', 'object'), guide('Outwork and piece rates', 'Home-based labor relocates costs and risks rather than escaping market discipline.', 'primary'), guide('Later social reproduction', 'Feminist-socialist analysis extends Marx and should be labeled as reception.', 'context')],
    resolution: 'Resolved: distinguished Tate’s 1846 known version from the lost 1844 original, retained medium and accession, bounded sentimental evidence, labeled social reproduction as later reception, preserved the ratio, mapped claims, and linked the current Karl Marx article.',
    lock: 'fnv1a64:0880dee3ebc35364',
  },
  'transformations-global-cotton': {
    plaqueTitle: 'A Cotton Office in New Orleans',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Degas’s 1873 merchant office invites visitors to follow samples, grading, papers, credit, and information into a post-emancipation commodity chain whose field labor remains unseen.',
    articleTitle: 'Karl Marx',
    dateLabel: 'Edgar Degas · oil on canvas, 1873 · Musée des Beaux-Arts de Pau, 878.1.2',
    objectInterpretation: 'The installed painting is Degas’s 1873 A Cotton Office in New Orleans, Musée des Beaux-Arts de Pau 878.1.2. The French Ministry record identifies municipal ownership, Degas’s earlier ownership, and acquisition in 1878; the office scene visibly omits plantation and mill labor.',
    additions: [
      'Merchants and relatives sample cotton, read papers and a newspaper, converse, and keep accounts, making one family-linked office network visible while fields, docks, mills, and most workers remain absent.',
      'Sample, grade, price, credit, transport, and information connect material fiber through commodity form; neither the white office nor cotton’s visibility reveals the whole chain automatically.',
      'Reconstruction ended legal slavery but not coercion, racial violence, debt, and sharecropping; analysis must avoid both unchanged-everything and completed-liberation stories beyond this single 1873 room.',
    ],
    sources: [collection('object', 'French Ministry of Culture POP — A Cotton Office in New Orleans', 'https://pop.culture.gouv.fr/notice/joconde/00980000397'), academic('history', 'Library of Congress — cotton history and Minard’s maps', 'https://blogs.loc.gov/maps/2021/06/19th-century-colonization-and-slavery-in-charles-minards-flow-maps/'), primary('primary', 'Marx — Capital, volume I', 'https://www.marxists.org/archive/marx/works/1867-c1/'), academic('context', 'Stanford Encyclopedia of Philosophy — Karl Marx', 'https://plato.stanford.edu/entries/marx/')],
    guide: [guide('Pau object record', 'The 1873 oil entered the municipal collection in 1878 after Degas’s ownership.', 'object'), guide('Visible office, absent chain', 'The painting shows samples and accounts but not plantation, dock, or mill labor.', 'object'), guide('Grading and credit', 'Commodity circulation joins material comparison to finance, transport, and information.', 'primary'), guide('Reconstruction limits', 'Emancipation changed legal status while coercion and racial domination persisted in new forms.', 'history')],
    resolution: 'Resolved: verified the Pau painting, accession, medium, ownership and acquisition history, made the office’s exclusions explicit, bounded Reconstruction claims, preserved the ratio, mapped claims, and linked the current Karl Marx article.',
    lock: 'fnv1a64:da668bf98ccc1710',
  },
  'transformations-chartist-politics': {
    plaqueTitle: 'Chartist Meeting on Kennington Common',
    plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Kilburn’s restored 10 April 1848 daguerreotype invites visitors to see association, petition, press, and strategy before suffrage rather than merely an anonymous crowd.',
    articleTitle: 'Karl Marx',
    dateLabel: 'William Edward Kilburn · daguerreotype, 10 April 1848 · Royal Collection RCIN 2932484; restoration by Bammesk',
    objectInterpretation: 'The installed image is Bammesk’s restored derivative of Kilburn’s 10 April 1848 daguerreotype of the Chartist meeting on Kennington Common, Royal Collection RCIN 2932484. Distance, viewpoint, exposure, and restoration limit individual identification and crowd-census claims.',
    additions: [
      'The broad crowd, platform, flags, buildings, and factory chimney fix one arranged and technologically constrained view whose scale cannot disclose each attendee’s commitments or support.',
      'The six Charter points demanded universal male suffrage, secret ballot, equal districts, annual Parliaments, paid members, and removal of the MP property qualification; “universal” did not include women.',
      'Marx and Engels followed but neither authored nor controlled Chartism, whose associations, press, petitions, and disagreements over moral and physical force made organization a contested achievement.',
    ],
    sources: [collection('object', 'Wikimedia Commons — Kilburn Chartist meeting restoration', 'https://commons.wikimedia.org/wiki/File:Chartist_meeting_on_Kennington_Common_by_William_Edward_Kilburn_1848_-_restoration1.png'), academic('history', 'UK Parliament — Chartism', 'https://www.parliament.uk/about/living-heritage/transformingsociety/electionsvoting/chartists/overview/'), academic('context', 'Stanford Encyclopedia of Philosophy — Karl Marx', 'https://plato.stanford.edu/entries/marx/')],
    guide: [guide('Daguerreotype and restoration', 'The historic exposure and later restoration both shape what can be inspected.', 'object'), guide('One viewpoint', 'Distance and framing prevent a census or reliable identification of the whole crowd.', 'object'), guide('Six points', 'Chartism’s constitutional program sought universal male, not universal, suffrage.', 'history'), guide('Strategic disagreement', 'Moral force, physical force, association, petition, and press were contested within the movement.', 'history', 'context')],
    resolution: 'Resolved: verified Kilburn’s date, medium, Royal Collection number and restoration credit, bounded crowd claims, corrected universal to universal male suffrage, preserved Chartist agency, ratio and source mappings, and linked the current Karl Marx article.',
    lock: 'fnv1a64:69afdf8e4438c845',
  },
  'transformations-cotton-flows': {
    plaqueTitle: 'European Raw-Cotton Imports, 1858, 1864, and 1865',
    plaqueType: 'concept-argument-diagram-or-method',
    invitation: 'Minard’s three-panel 1866 map invites visitors to read changing flow widths as trade data and then ask whose labor, ecology, and political authority remain invisible.',
    articleTitle: 'Karl Marx',
    dateLabel: 'Charles Joseph Minard; Regnier et Dourdet, Paris · lithographed and hand-colored, 1866 · LOC 99463789',
    objectInterpretation: 'The installed bytes reproduce Minard’s three maps on one 1866 sheet, Carte figurative et approximative des quantités de coton brut importées en Europe en 1858, en 1864 et en 1865, Library of Congress LCCN 99463789 / G3201.J82 1865 .M5, produced with Regnier et Dourdet.',
    additions: [
      'Band widths encode approximate aggregate quantities and origins across three dates; the Library of Congress record also notes a sectioned and mounted copy with physical losses, distinguishing map design from one sheet’s condition.',
      'Civil War disruption and the dramatic 1864 expansion of Indian supply are visible before partial 1865 rebalancing, but explanation requires blockade, prices, credit, shipping, policy, and the Lancashire Cotton Famine.',
      'Rerouting is not emancipation: world-market analysis must keep aggregate trade data distinct from labor regimes, ecological costs, colonial authority, racial coercion, and household risk that the bands cannot display.',
    ],
    sources: [collection('object', 'Library of Congress — Minard cotton-flow map, 99463789', 'https://www.loc.gov/item/99463789/'), academic('history', 'Library of Congress — nineteenth-century cotton history and Minard', 'https://blogs.loc.gov/maps/2021/06/19th-century-colonization-and-slavery-in-charles-minards-flow-maps/'), primary('primary', 'Marx — Capital, volume I', 'https://www.marxists.org/archive/marx/works/1867-c1/'), academic('context', 'Stanford Encyclopedia of Philosophy — Karl Marx', 'https://plato.stanford.edu/entries/marx/')],
    guide: [guide('Three maps on one sheet', 'The design compares 1858, 1864, and 1865 with proportional bands.', 'object'), guide('Physical-sheet limits', 'The LOC record distinguishes the mapped design from losses in a sectioned, mounted copy.', 'object'), guide('Civil War rerouting', 'Blockade, scarcity, credit, shipping, and policy redirected European supply.', 'history'), guide('Map limits', 'Flow width does not depict labor regimes, ecology, or political coercion.', 'object', 'primary', 'context')],
    resolution: 'Resolved: supplied Minard’s full title, maker firm, 1866 publication, LOC identifiers, sheet structure and condition limit, separated aggregate flows from labor regimes, preserved the ratio, mapped claims, and linked the current Karl Marx article.',
    lock: 'fnv1a64:4e879f92d187abc6',
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
  throw new Error(`Gallery 17 supplemental exhibit ${input.id} lacks a canonical article route.`);
};

export const reviewUtilityLibertyCapitalSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery 17 review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery 17 presentation for ${input.id}.`);
  const baseParagraphs = input.sections.map((section) => section.paragraphs.join(' '));
  if (baseParagraphs.length !== 3) throw new Error(`Gallery 17 supplemental exhibit ${input.id} must begin with exactly three paragraphs.`);
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
      panelKicker: 'Gallery 17 supplemental exhibit',
      proximityKicker: reviewed.plaqueTitle,
      factRows: [{label: 'Object', value: reviewed.plaqueTitle}, {label: 'Evidence', value: reviewed.dateLabel}, {label: 'Atlas route', value: reviewed.articleTitle}],
      articleActionLabel: `Read the full sourced ${reviewed.articleTitle} article`,
      exhibitLayout: 'object-led',
    },
    wallPlaque: {type: reviewed.plaqueType, title: reviewed.plaqueTitle, invitation: reviewed.invitation, canonicalContexts: [canonicalContext(input)]},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-20', method: reviewMethod, resolution: reviewed.resolution, lock: reviewed.lock, visualReview: visualReview(input.id)},
  };
};
