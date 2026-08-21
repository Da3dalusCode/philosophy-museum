import type {
  MuseumCanonicalContextRef,
  MuseumSupplementalExhibit,
  MuseumSupplementalInterpretationSource,
} from './platoSupplementalExhibits';

type SourceSpec = MuseumSupplementalInterpretationSource & {id: string};
type Evidence = {
  plaqueTitle: string;
  plaqueType: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['type'];
  invitation: string;
  articleTitle: string;
  dateLabel: string;
  objectInterpretation: string;
  additions: readonly [string, string, string];
  sources?: readonly SourceSpec[];
  guide: readonly [string, string, string, string];
  resolution: string;
  lock: string;
};

const collection = (id: string, label: string, url: string): SourceSpec => ({id, label, url, kind: 'collection-record'});
const academic = (id: string, label: string, url: string): SourceSpec => ({id, label, url, kind: 'academic-reference'});
const primary = (id: string, label: string, url: string): SourceSpec => ({id, label, url, kind: 'primary-text'});
const evidence: Record<string, Evidence> = {
  'peirce-observatory-measurement': {
    plaqueTitle: 'Telescope at Harvard College Observatory', plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Vander Weyde’s c. 1900 photograph makes an observatory instrument visible while offering no evidence that Peirce used this particular telescope.',
    articleTitle: 'Charles Sanders Peirce', dateLabel: 'William M. Vander Weyde · gelatin dry-plate negative, c. 1900 · George Eastman Museum, 1974:0056:0869 · no known restrictions',
    objectInterpretation: 'The installed image reproduces William M. Vander Weyde’s c. 1900 gelatin dry-plate negative of a telescope at Harvard College Observatory, George Eastman Museum 1974:0056:0869. The museum reports no known copyright restrictions; the record does not connect Peirce to this instrument.',
    additions: ['The fixed mounting, tube, interior structure, and slotted dome show arranged equipment but leave calibration, observers, notebooks, schedules, and error estimates outside the frame.', 'Peirce’s astronomy and metrology made repeatability, error, and comparison practical problems. Those historical connections derive from his scientific record, not from personal use of this telescope.', 'Fallibilism rejects both immunity from correction and indiscriminate doubt. Instrumental precision can reduce some errors while institutions still shape access, priorities, training, and whose objections count.'],
    guide: ['The Eastman Museum records a c. 1900 glass-negative object and accession 1974:0056:0869.', 'No Peirce use, visit, or observation at this telescope is documented.', 'Calibration and repeatability make observations publicly comparable.', 'Fallibilism needs corrigible method, not skepticism about every claim equally.'],
    resolution: 'supplied medium, maker, museum accession and exact rights status, removed implied Peirce use, separated instrument evidence from fallibilist interpretation, and preserved natural ratio and article.', lock: 'fnv1a64:209d1c43461b5bb8',
  },
  'peirce-coast-survey-observatory': {
    plaqueTitle: 'Granite Supports at the Calais Observatory Site', plaqueType: 'object-manuscript-site-or-archaeological-context',
    invitation: 'Surviving instrument supports anchor the Coast Survey’s distributed material network while the source neither depicts the former building nor places Peirce at this station.',
    articleTitle: 'Charles Sanders Peirce', dateLabel: 'Former U.S. Coast Survey observatory site, Calais, Maine, used 1857–1866 · Magicpiano photograph, 24 July 2013 · CC BY-SA 3.0',
    objectInterpretation: 'The installed image is Magicpiano’s 2013 CC BY-SA 3.0 photograph of surviving granite clock and transit-instrument supports at the former U.S. Coast Survey observatory in Calais, Maine. The Commons filename says Castine, but its description and the Maine preservation record identify Calais; no Peirce presence is documented.',
    additions: ['The exposed stones and bedrock document remnants in place after the observatory building disappeared. They do not reconstruct its full equipment, procedures, staff, or data.', 'Longitude work coordinated clocks, astronomical observations, telegraphic signals, stations, and calculations. Peirce’s Coast Survey career belongs to that network without requiring an invented visit to Calais.', 'Agreement alone does not make inquiry communal or reliable. Standards must permit recalibration, rival hypotheses, inconvenient results, and participation beyond an already aligned group.'],
    guide: ['The Maine record resolves the filename conflict in favor of Calais.', 'Only granite supports survive; the photograph does not show the working observatory.', 'Distributed measurement depends on timing, standards, communication, and comparison.', 'No source places Peirce at this station.'],
    resolution: 'preserved the Calais identification only with the Maine record, disclosed the misleading filename and absent Peirce presence, retained CC BY-SA terms, and separated site evidence from community-of-inquiry interpretation.', lock: 'fnv1a64:cfb3d16242884f02',
  },
  'peirce-mapmaking-standards': {
    plaqueTitle: 'Coast and Geodetic Survey Map-Making Division', plaqueType: 'historical-event-or-institutional-context',
    invitation: 'A 1940 government-office photograph shows later collective drafting and checking, not Peirce’s workplace or a transparent image of neutral representation.',
    articleTitle: 'Charles Sanders Peirce', dateLabel: 'Harris & Ewing · photograph, 1940 · Library of Congress, LC-H22-D-8656 / LC-DIG-hec-28362 · no known restrictions on publication',
    objectInterpretation: 'The installed Harris & Ewing photograph shows the Coast and Geodetic Survey map-making division in 1940, Library of Congress LC-H22-D-8656 / LC-DIG-hec-28362. It postdates Peirce and carries the collection’s “no known restrictions on publication” status rather than a general-purpose license.',
    additions: ['Rows of workers, drafting tables, sheets, and instruments expose skilled production while the posed viewpoint cannot reveal every role, check, hierarchy, or exclusion.', 'Measurements become portable signs through selection, scale, projection, notation, copying, and correction. Peirce’s semiotic and fallibilist relevance is interpretive continuity, not evidence that he directed this office.', 'A public map can support criticism because conventions and results travel, yet standardized representation also omits detail and serves institutional priorities that require separate scrutiny.'],
    sources: [collection('loc', 'Library of Congress — Coast and Geodetic Survey map-making division', 'https://www.loc.gov/item/2016877308/')],
    guide: ['The Harris & Ewing photograph dates to 1940 and therefore postdates Peirce.', 'LOC’s exact rights statement is “no known restrictions on publication.”', 'Scale and convention make measurements usable while selecting what appears.', 'Institutional continuity does not establish Peirce’s presence or control.'],
    resolution: 'corrected the rights language to the LOC status, supplied identifiers, made later institutional continuity explicit, bounded representation claims, and preserved ratio and canonical article.', lock: 'fnv1a64:a6a24feee5500fe8',
  },
  'peirce-printing-public-record': {
    plaqueTitle: 'Coast and Geodetic Survey Press Room', plaqueType: 'historical-event-or-institutional-context',
    invitation: 'A 1937 press-room photograph makes reproducible public records visible while postdating Peirce and withholding the contents and uses of the charts being printed.',
    articleTitle: 'Charles Sanders Peirce', dateLabel: 'Harris & Ewing · photograph, 1937 · Library of Congress, LCCN 2016871356 · no known restrictions on publication',
    objectInterpretation: 'The installed Harris & Ewing photograph shows the Coast and Geodetic Survey room where maps and charts were printed in 1937, Library of Congress LCCN 2016871356. It postdates Peirce by more than two decades; LOC reports no known restrictions rather than an affirmative public-domain license.',
    additions: ['Presses, workers, paper, and crowded machinery show production conditions but not the printed claims, correction procedures, audience, or authority of any particular chart.', 'Printing can stabilize a record that others inspect, compare, criticize, and reuse. That relation to Peircean public inquiry is conceptual and institutional, not personal biography.', 'Reproducibility does not guarantee truth or equal access. Durable errors, restricted distribution, state priorities, and specialized literacy remain possible within a technically public record. Publicity enables criticism but does not ensure its success.'],
    sources: [collection('loc', 'Library of Congress — Coast and Geodetic Survey press room, 2016871356', 'https://www.loc.gov/item/2016871356/')],
    guide: ['The scene is a 1937 Harris & Ewing photograph, not a Peirce-era workplace.', 'The exact rights basis is no known restrictions on publication.', 'Printing makes records repeatable but does not certify their claims.', 'Public inquiry also depends on access, criticism, correction, and intelligibility.'],
    resolution: 'supplied the LOC number and exact rights statement, kept 1937 later than Peirce, separated reproducibility from truth and access, and preserved natural ratio and CTA.', lock: 'fnv1a64:a0049a55d40dc434',
  },
  'james-naturalist-expedition': {
    plaqueTitle: 'Thayer Expedition Assistants and Volunteers', plaqueType: 'paired-or-grouped-historical-figures',
    invitation: 'An c. 1866 group portrait includes William James at lower left while exposing neither individual field tasks nor the racial and institutional terms of collecting.',
    articleTitle: 'William James', dateLabel: 'Unidentified photographer · group portrait, c. 1866 · Harvard HOLLIS Images · public domain in the United States',
    objectInterpretation: 'The installed group photograph shows assistants and volunteers of the Thayer Expedition around 1866, with William James seated at lower left. Harvard HOLLIS is reported as the source, but no item number is supplied. The pose documents membership, not field behavior, belief, or an egalitarian scientific community.',
    additions: ['Clothing, arrangement, outdoor setting, and the identified young James establish a posed expedition group. The photograph cannot allocate tasks or reveal relations with Brazilian people whose lives entered the expedition record.', 'James’s early natural-history training preceded his shift through medicine toward psychology and philosophy. Biography supports that trajectory without turning collecting practices into mature radical empiricism.', 'The expedition belonged to racialized nineteenth-century science and unequal extraction. That context must remain visible while claims about James’s own views or actions require distinct evidence.'],
    guide: ['James is identified at lower left in a c. 1866 posed group.', 'No HOLLIS call number or complete object provenance appears in the accessible record.', 'Scientific formation preceded James’s mature psychology and pragmatism.', 'Expedition hierarchy and racial science require context without invented individual motives.'],
    resolution: 'retained the identified sitter and approximate date, disclosed missing item number and limits of the pose, separated formation from mature doctrine, and preserved public-domain basis, ratio, and article.', lock: 'fnv1a64:9f69094d5b80f00b',
  },
  'james-alexandrina-observation': {
    plaqueTitle: 'Head of Alexandrina', plaqueType: 'reception-or-transmission-history',
    invitation: 'An unidentified woodcut maker translated James’s 1865 drawing into an 1868 publication, making mediation and unequal control of representation part of the evidence.',
    articleTitle: 'William James', dateLabel: 'Unidentified woodcut artist after an 1865 drawing by William James · published in A Journey in Brazil, 1868 · original drawing and block custody unknown',
    objectInterpretation: 'The installed image is the woodcut Head of Alexandrina, cut by an unidentified maker after William James’s 1865 drawing and published in Louis Agassiz and Elizabeth Cary Agassiz’s A Journey in Brazil in 1868. The original drawing, woodblock, and current custody are unverified; 1868 is publication, not necessarily creation, date.',
    additions: ['The printed profile identifies Alexandrina by name and records how a drawn encounter became a reproducible image. It cannot recover her consent, words, self-understanding, or the woodcut maker’s decisions.', 'Field observation is already mediated by encounter, drawing, selection, cutting, caption, publication, and institutional authority. Those layers complicate any appeal to immediate experience.', 'James’s later radical empiricism should not be projected backward as the portrait’s meaning. The object instead asks whose relations enter an archive and who controls their description and circulation.'],
    sources: [primary('book', 'A Journey in Brazil — 1868 primary publication', 'https://archive.org/details/journeyinbrazil00agas')],
    guide: ['The woodcut maker is unknown; James supplied the 1865 source drawing.', 'A Journey in Brazil was published in 1868, not 1868–69.', 'No holding record establishes the original drawing or woodblock’s custody.', 'Alexandrina’s agency and voice cannot be inferred from the printed profile.'],
    resolution: 'corrected publication to 1868, distinguished drawing from woodcut maker and publication witness, disclosed unresolved original custody and consent, and preserved rights, ratio, and William James article.', lock: 'fnv1a64:41b90ea805016600',
  },
  'james-home-library': {
    plaqueTitle: 'Library in the William James House', plaqueType: 'object-manuscript-site-or-archaeological-context',
    invitation: 'George M. Cushing’s 1967 HABS photograph records a later state of James’s domestic library, not a room frozen at his death or evidence of any one composition session.',
    articleTitle: 'William James', dateLabel: 'George M. Cushing · HABS photograph, October 1967 · Library of Congress, HABS MA-1024 · U.S. government work',
    objectInterpretation: 'The installed image is George M. Cushing’s October 1967 Historic American Buildings Survey photograph of the library in the William James House, Cambridge, Library of Congress HABS MA-1024. As a federal HABS image it is public domain in the United States, but the room was photographed fifty-seven years after James’s death.',
    additions: ['Shelves, framed pictures, furniture, and camera position show a documented later interior. They cannot establish which books James owned, how the room looked during his life, or where a specific text was written.', 'Domestic reading, correspondence, lecture preparation, conversation, and revision formed part of James’s intellectual work, while biographical and manuscript evidence—not décor—must establish particulars.', 'A preserved authorial room can encourage a solitary-genius story. Family labor, students, publishers, colleagues, servants, institutions, and changing access complicate that reception image.'],
    guide: ['Cushing made the HABS image in October 1967, not during James’s lifetime.', 'HABS MA-1024 identifies the federal documentation set.', 'The room’s later state cannot certify original contents or arrangement.', 'Domestic authorship involves social and material supports beyond a single study.'],
    resolution: 'verified photographer, date, HABS identifier and government-work basis, distinguished later room state from lifetime use, bounded authorship inference, and preserved ratio and article.', lock: 'fnv1a64:f4922fe02f45315a',
  },
  'james-leonora-piper-inquiry': {
    plaqueTitle: 'Leonora Piper in the Illustrated Press', plaqueType: 'paired-or-grouped-historical-figures',
    invitation: 'An 1899 newspaper portrait identifies a subject of psychical investigation while neither verifying paranormal claims nor documenting James’s procedures or conclusions.',
    articleTitle: 'William James', dateLabel: 'Unidentified image maker · newspaper portrait reported in The Inter Ocean, 25 June 1899 · original issue and custody chain not independently verified',
    objectInterpretation: 'The installed halftone portrait identifies Leonora Piper and is reported as published in The Inter Ocean on 25 June 1899. The maker, exact source issue witness, original photograph, and custody chain remain unverified. Its U.S. term-expired basis does not authenticate paranormal claims.',
    additions: ['The seated press likeness is evidence of public representation, not a séance transcript, controlled test, or observation by James. Newspaper framing and reproduction are separate from the investigated events.', 'James treated testimony, fraud controls, alternative explanations, and recalcitrant experiences as questions for inquiry. His participation does not make every claim proven or reduce it to credulity.', 'Later reception often divides the episode into vindication or embarrassment. A fallibilist account instead keeps method, evidential quality, uncertainty, and unresolved interpretation visible.'],
    guide: ['The accessible record reports 25 June 1899 but lacks a direct issue scan and custody chain.', 'The image maker and original photograph remain unidentified.', 'Piper’s portrait does not verify mediumship or show an experimental sitting.', 'James’s inquiry can be studied without treating uncertainty as proof or dismissal.'],
    resolution: 'disclosed the weak newspaper issue and custody chain, retained maker uncertainty and term-expired basis, separated portrait from psychical evidence, and preserved ratio, current article, and unresolved status.', lock: 'fnv1a64:e8bf4992a9d44c04',
  },
  'james-self-portrait-formation': {
    plaqueTitle: 'William James Self-Portrait', plaqueType: 'work-or-text',
    invitation: 'James’s c. 1866 drawing records youthful self-representation before his mature psychology and pragmatism without disclosing vocation through expression or unfinished marks.',
    articleTitle: 'William James', dateLabel: 'William James · drawing, c. 1866 · James Family Papers, Houghton Library · call number not supplied · public-domain work',
    objectInterpretation: 'The installed reproduction is William James’s c. 1866 self-portrait from the James Family Papers at Houghton Library, Harvard. No call number or direct Houghton scan chain appears in the accessible record. Its marks record self-representation, not a diagnosis or illustration of later doctrine.',
    additions: ['The drawn head, three-quarter pose, and unfinished handling establish an artistic object by James. Facial expression cannot reveal indecision, illness, temperament, or future philosophical commitment.', 'James studied art before moving through science and medicine toward psychology and philosophy. That biographical sequence must be established independently from the portrait’s appearance.', 'His later distinctions between the empirical self and knowing activity can orient a chronological comparison, but the mature theory cannot be read backward as the young artist’s intention.'],
    guide: ['James made the drawing around 1866; Houghton holds the family papers.', 'No call number or direct repository scan provenance was located.', 'Physiognomy cannot establish mood, diagnosis, or vocation.', 'Later accounts of “I” and “me” are chronological comparisons, not the drawing’s subject.'],
    resolution: 'retained authorship, date and Houghton context, disclosed absent call number and scan chain, rejected physiognomic and retrospective inference, and preserved public-domain ratio and article.', lock: 'fnv1a64:195537c35523127e',
  },
  'dewey-michigan-intellectual-work': {
    plaqueTitle: 'The Inlander Staff with Dewey and Scott', plaqueType: 'paired-or-grouped-historical-figures',
    invitation: 'A c. 1890–1893 staff portrait records Dewey’s association with a student literary magazine while withholding its editorial labor, hierarchy, and discussions.',
    articleTitle: 'John Dewey', dateLabel: 'Unidentified photographer · group portrait, c. 1890–1893 · Bentley Historical Library association reported; exact item, custody, and rights unresolved',
    objectInterpretation: 'The installed photograph is identified as The Inlander staff with faculty advisers John Dewey and Fred Newton Scott. Because the magazine was organized in December 1890, the former c. 1884–1893 range was impossible; c. 1890–1893 is retained. No direct Bentley item, original custody, creator, or rights record was verified.',
    additions: ['The posed rows establish affiliation and named advisers, not editorial practice, discussion, equality, authorship, or the content of any issue.', 'The Inlander’s 1890 formation supplies a bounded institutional connection during Dewey’s Michigan years. His later philosophy of communication and democracy is relevant interpretation, not the photograph’s message.', 'A student public depends on access, authority, selection, and accountability as well as association. The source cannot tell whose work or voices were excluded from this literary institution.'],
    sources: [academic('bentley', 'Bentley Historical Library — Inlander records finding aid', 'https://findingaids.lib.umich.edu/catalog/umich-bhl-9993'), primary('daily', 'Michigan Daily retrospective — Inlander founding context', 'https://digital.bentley.umich.edu/midaily/mdp.39015071755677/346')],
    guide: ['The Inlander was organized in December 1890, fixing the earliest possible date.', 'Exact item, original custody, photographer, and rights basis remain unresolved.', 'A posed staff portrait proves affiliation but not shared editorial power.', 'Deweyan communication is an interpretive lens, not an object fact.'],
    resolution: 'corrected the impossible date range to c. 1890–1893, disclosed exact source/custody/rights gaps, bounded affiliation and democratic interpretation, and preserved ratio, route, and current Dewey article.', lock: 'fnv1a64:3647b77aed07ec50',
  },
  'dewey-child-drawing': {
    plaqueTitle: 'A Child’s Drawing of a Cave and Trees', plaqueType: 'work-or-text',
    invitation: 'Dewey reproduced this anonymous drawing in The School and Society in 1900, but the page cannot identify its maker, prompt, classroom, creation date, or intended meaning.',
    articleTitle: 'John Dewey', dateLabel: 'Unidentified child artist · drawing reproduced in The School and Society, 1900 · original custody unknown · public domain in the United States',
    objectInterpretation: 'The installed image reproduces an unidentified child’s Drawing of a Cave and Trees from John Dewey’s The School and Society (1900). Dewey is the publication’s author, not the established artist. The child, prompt, classroom, creation date, original drawing, and custody remain unknown.',
    additions: ['Lines, trees, cave opening, and published placement are visible; the page alone does not disclose the child’s intention, learning process, agency, or success.', 'Dewey used educational examples within an argument about activity, occupation, experience, and reflection. The printed text—not speculation about the anonymous maker—grounds that pedagogical relation.', 'Adult theory can preserve a child’s production while also absorbing it into an author’s case. Interpretation should keep the unknown maker and institutional selection visible rather than ventriloquizing the child.'],
    sources: [primary('page', 'The School and Society — page containing the drawing', 'https://en.wikisource.org/wiki/Page:The_School_and_Society.djvu/61'), primary('book', 'Library of Congress — The School and Society, 1915 edition', 'https://www.loc.gov/item/15018118/')],
    guide: ['The maker is an unidentified child; Dewey did not draw the image.', '1900 is the reproduction date, not a verified creation date.', 'The original drawing, prompt, classroom, and custody are unknown.', 'Learning-through-activity comes from Dewey’s argument, not inferred child psychology.'],
    resolution: 'retained the child as unknown creator, corrected institution and publication/creation distinction, sourced the page and book, bounded intention and learning claims, and preserved public-domain ratio and Dewey CTA.', lock: 'fnv1a64:d87e262879fd647b',
  },
  'dewey-hull-house-kindergarten': {
    plaqueTitle: 'Hull House Kindergarten', plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Allen B. Pond’s 1902 classroom photograph shows an independent Hull House setting—not Dewey’s Laboratory School—and leaves curriculum, identities, and participant agency unresolved.',
    articleTitle: 'John Dewey', dateLabel: 'Allen B. Pond · Kindergarten Detail, 1902 · Jane Addams Hull-House Museum credit; accession unverified · public domain in the United States',
    objectInterpretation: 'The installed image is Allen B. Pond’s 1902 Kindergarten Detail at Hull House, credited to the Jane Addams Hull-House Museum. The former “unidentified photographer” attribution was incorrect. No accession was located, and the source’s U.S. public-domain basis does not identify children, adults, curriculum, or consent.',
    additions: ['Low tables, crowded seating, children, and adults establish one arranged classroom moment. The photograph cannot disclose a lesson’s content, children’s experience, or how authority was negotiated.', 'Hull House was an independent neighborhood and settlement institution associated with Jane Addams’s social philosophy; it was not a branch of Dewey’s Laboratory School.', 'The Deweyan relation lies in questions about education, association, and public life. Keeping Addams’s reciprocity and Hull House practice distinct prevents a later photograph from becoming mere illustration of Dewey.'],
    guide: ['Commons credits Allen B. Pond; the previous unidentified-maker label was wrong.', 'Jane Addams Hull-House Museum credit lacks a located accession number.', 'Hull House kindergarten was not Dewey’s Laboratory School.', 'The image cannot establish curriculum, consent, equality, or educational outcome.'],
    resolution: 'corrected photographer to Allen B. Pond, retained the museum credit with accession limit, distinguished Hull House and Addams from Dewey’s school, bounded classroom inference, and preserved ratio and rights.', lock: 'fnv1a64:05ffa8090571b61f',
  },
  'dewey-laboratory-school': {
    plaqueTitle: 'University of Chicago Laboratory Schools, 2006', plaqueType: 'reception-or-transmission-history',
    invitation: 'A public-domain 2006 exterior bears the institution’s name but cannot show the small South Side house where Dewey’s experimental school opened in 1896.',
    articleTitle: 'John Dewey', dateLabel: 'Crimsonmaroon · digital photograph, 22 October 2006 · University of Chicago Laboratory Schools · public-domain dedication',
    objectInterpretation: 'The installed image is Crimsonmaroon’s 22 October 2006 photograph of the University of Chicago Laboratory Schools, released through the photographer’s public-domain dedication. It shows a later Collegiate Gothic campus, not the small South Side house where the original school opened in 1896.',
    additions: ['Lawn, trees, façade, and institutional name establish a modern exterior only. Architecture cannot demonstrate classroom observation, curriculum, admissions, outcomes, or continuity of Deweyan practice.', 'University histories describe the 1896 elementary school as a small experimental setting where teaching could be observed and revised. That record, not the 2006 building, grounds the founding claim.', 'Institutional continuity is a question rather than a guarantee. Names persist while populations, governance, resources, pedagogy, and accountability change across more than a century. The modern building supplies no shortcut around that comparison. Architecture is not pedagogical evidence.'],
    sources: [academic('history', 'University of Chicago Laboratory Schools — institutional history', 'https://www.ucls.uchicago.edu/about-lab/history'), collection('archive', 'University of Chicago Library — Department of Education records', 'https://www.lib.uchicago.edu/e/scrc/findingaids/view.php?eadid=ICU.SPCL.EDUCATIONDEPT')],
    guide: ['Crimsonmaroon made and dedicated the 2006 digital photograph.', 'The original 1896 school opened in a different small South Side house.', 'The exterior cannot show Dewey-era classroom practice or outcomes.', 'A continuing institutional name does not guarantee unchanged pedagogy.'],
    resolution: 'verified the 2006 creator/date/dedication, distinguished the later campus from the 1896 setting, sourced the institutional history, bounded continuity claims, and preserved ratio and Dewey article.', lock: 'fnv1a64:2a3120eeb3e664c0',
  },
  'dewey-labor-education': {
    plaqueTitle: 'Immigrants in Night School, Boston, 1909', plaqueType: 'historical-event-or-institutional-context',
    invitation: 'A Hine-attributed NCLC photograph records a Boston night-school classroom while leaving the school, lesson, identities, immigration histories, and participants’ purposes unresolved.',
    articleTitle: 'John Dewey', dateLabel: 'Lewis Wickes Hine, attribution based on provenance · photographic print, October 1909 · Library of Congress, LOT 7483, v. 1, no. 0894 / LC-DIG-nclc-04549 · no known restrictions',
    objectInterpretation: 'The installed photograph is Immigrants in night school. Location: Boston, Massachusetts, dated October 1909 and attributed to Lewis Wickes Hine from National Child Labor Committee provenance. Library of Congress call LOT 7483, v. 1, no. 0894, reproduction LC-DIG-nclc-04549; no known restrictions on publication.',
    additions: ['The primary photograph records students, desks, books, writing, and a classroom at one instant. It cannot name participants, assign national origins or occupations, identify the school or lesson, or demonstrate learning and consent.', 'The relation to Dewey is interpretive rather than biographical: his account of democracy helps ask how education continues through public institutions, but no evidence makes him present, influential, or responsible for this night school.', 'Later democratic reception must not turn the collective catalog label “immigrants” into a complete social identity. Language, work, age, exclusion, sponsorship, teaching authority, and students’ own goals remain unresolved evidence limits.'],
    sources: [collection('loc', 'Library of Congress — Immigrants in night school, 2018674497', 'https://www.loc.gov/pictures/item/2018674497/')],
    guide: ['LOC supplies the October 1909 date, NCLC caption-card title, call number, and reproduction number.', 'Hine attribution is based on provenance; the school, teacher, text, and individual students remain unidentified.', 'The photograph documents a class, not Dewey’s presence, influence, curriculum, or educational result.', 'Democratic interpretation must keep participant voice, assimilation, access, authority, and unresolved identities visible.'],
    resolution: 'replaced the text-dominant WPA poster with a rights-clear Hine-provenance classroom photograph, supplied exact LOC identity, date, custody, identifiers and rights, bounded collective caption language and Dewey inference, and preserved natural ratio and CTA.', lock: 'fnv1a64:f5c0d8944cbcc4de',
  },
  'continuity-jane-addams': {
    plaqueTitle: 'Jane Addams, c. 1913?', plaqueType: 'paired-or-grouped-historical-figures',
    invitation: 'A National Child Labor Committee portrait introduces Addams as an independent philosopher while its date, location, and Hine attribution carry catalog qualifications.',
    articleTitle: 'Pragmatism', dateLabel: 'Lewis Wickes Hine, attribution based on provenance · c. 1913? · Library of Congress, nclc.04836 / LCCN 2018676451 · no known restrictions',
    objectInterpretation: 'The installed image is Jane Addams of Hull House, Chicago, Ill., attributed to Lewis Wickes Hine by National Child Labor Committee provenance, Library of Congress nclc.04836 / LCCN 2018676451. The date is estimated from neighboring captions; neither date nor location appears on the original caption card. LOC reports no known restrictions.',
    additions: ['The standing portrait, desk, and chair identify Addams but do not prove the room is Hull House or depict settlement work, residents, relationships, or programs.', 'Addams’s sympathetic knowledge joins inquiry to reciprocal relationships, conflict, action, and the standpoint of people affected. Her philosophy is not Dewey’s theory translated into practice.', 'Later recovery of Addams within philosophy corrects institutional omission while still requiring attention to her own books, organizing, collaborators, limits, and contested settlement authority. A portrait alone cannot perform that recovery.'],
    sources: [collection('loc', 'Library of Congress — Jane Addams of Hull House, 2018676451', 'https://www.loc.gov/item/2018676451/')],
    guide: ['Hine attribution is based on collection provenance, not a signature.', 'The c. 1913 date is estimated; original caption supplies no date or location.', 'The portrait cannot establish that it was made inside Hull House.', 'Addams’s sympathetic knowledge and social democracy are independent contributions.'],
    resolution: 'corrected date and location certainty, qualified Hine attribution and exact LOC rights status, supplied identifiers, centered Addams as philosopher, and preserved ratio and Pragmatism CTA.', lock: 'fnv1a64:567c87d06c019858',
  },
  'continuity-hull-house-arts': {
    plaqueTitle: 'Eleanor Smith’s Hull House Singing Class', plaqueType: 'historical-event-or-institutional-context',
    invitation: 'A photograph published in the 1929 Hull House Year Book makes collective music visible while leaving photographer, original custody, repertoire, and children’s agency unresolved.',
    articleTitle: 'Pragmatism', dateLabel: 'Unidentified photographer · published in Hull House Year Book, 1929 · original print custody unknown · public domain in the United States',
    objectInterpretation: 'The installed photograph shows Eleanor Sophia Smith at a piano leading a Hull House singing class, published on page 21 of the Hull House Year Book in 1929. The photographer, original print, institution-level custody, and accession are unknown; publication provenance is not a holding institution.',
    additions: ['The piano, adult leader, and children in rows document one published class scene. The page cannot establish repertoire, voluntary participation, learning, enjoyment, discipline, or who selected the image.', 'Hull House music belonged to a later strand of the settlement’s cultural work. Addams’s account of art and social life provides context without making her or Dewey present in this class.', 'Collective music can coordinate attention and expression while adult authority and institutional norms remain active. Participation should not be romanticized as automatically democratic.'],
    guide: ['The Year Book is publication provenance, not verified original custody.', 'The photographer and accession remain unknown.', 'The photograph does not place Addams or Dewey in the class.', 'Repertoire, authority, access, and children’s experience remain unresolved.'],
    resolution: 'distinguished publication from custody, retained the unknown photographer and U.S. term basis, bounded participation claims, preserved Smith and Hull House specificity, ratio, and Pragmatism article.', lock: 'fnv1a64:a82eb722c471f2d2',
  },
  'continuity-alain-locke': {
    plaqueTitle: 'Alain Locke, 1907', plaqueType: 'paired-or-grouped-historical-figures',
    invitation: 'A youthful portrait published in July 1907 precedes Locke’s mature value philosophy and cannot make the Rhodes Scholarship or later New Negro work visible in his pose.',
    articleTitle: 'Pragmatism', dateLabel: 'Unidentified photographer · published in A.M.E. Church Review, July 1907 · original print custody unknown · public domain in the United States',
    objectInterpretation: 'The installed image is an unidentified-maker portrait of Alain LeRoy Locke published in A.M.E. Church Review, volume 24, number 1, July 1907. The publication is direct provenance for the reproduction, not custody of the original photograph; maker, exact exposure date, original print, and accession remain unknown.',
    additions: ['The formal suit, high collar, youthful sitter, and publication witness document early public representation. They do not depict a scholarship experience or mature philosophical commitments.', 'Locke’s critical relativism and value pluralism examine how values are felt, organized, communicated, and revised without collapsing plural cultures into arbitrary equivalence.', 'The New Negro belongs to later cultural and political work. Art can reorganize representation and valuation without by itself guaranteeing political equality or institutional transformation.'],
    guide: ['The portrait appeared in A.M.E. Church Review in July 1907.', 'Photographer, exact exposure date, original custody, and accession are unknown.', 'The pose cannot represent mature value pluralism.', 'Locke’s later New Negro work is reception and development, not object metadata.'],
    resolution: 'replaced the curatorial scholarship title with a factual 1907 identity, corrected publication provenance and custody limits, separated youthful image from mature work, and preserved U.S. public-domain ratio and Pragmatism CTA.', lock: 'fnv1a64:be588ca92b3b59c6',
  },
  'continuity-anna-julia-cooper': {
    plaqueTitle: 'Anna Julia Cooper, c. 1902', plaqueType: 'paired-or-grouped-historical-figures',
    invitation: 'C. M. Bell’s portrait introduces Cooper as a Black feminist philosopher and educator while the closed book’s identity and her relation to pragmatism remain unresolved.',
    articleTitle: 'Pragmatism', dateLabel: 'C. M. Bell · photograph, c. 1902 · Library of Congress, bellcm.15413a / LCCN 2016702852 · no known copyright restrictions',
    objectInterpretation: 'The installed photograph is C. M. Bell’s c. 1902 portrait of Anna Julia Cooper, C. M. Bell Studio Collection, Library of Congress bellcm.15413a / LCCN 2016702852. LOC reports no known copyright restrictions. The book in her lap is unidentified, and the date remains approximate.',
    additions: ['The seated studio pose and closed book identify Cooper and a prop but cannot supply the book’s title, reading history, doctrine, or conditions of the sitting.', 'A Voice from the South develops arguments about Black women’s social and intellectual position, education, race, gender, and citizenship in Cooper’s own terms.', 'Standpoint and intersectionality are useful later frames, not labels Cooper used in their current form. Continuity with pragmatism is interpretive and should not turn her into a formal school member.'],
    sources: [collection('loc', 'Library of Congress — Anna Julia Cooper, 2016702852', 'https://www.loc.gov/item/2016702852/')],
    guide: ['LOC supplies Bell attribution, identifiers, c. 1902 date, and no-known-restrictions status.', 'The closed book is unidentified and cannot be given a title.', 'A Voice from the South grounds Cooper’s arguments in her own work.', 'Pragmatist continuity and later standpoint language require qualification.'],
    resolution: 'supplied exact LOC identifiers and rights wording, retained approximate date and unidentified book, centered Cooper’s own philosophy, bounded later terminology and school relation, and preserved ratio and CTA.', lock: 'fnv1a64:c28b3db180f054dc',
  },
  'continuity-shaw-student-movement': {
    plaqueTitle: 'King at Shaw University, 16 April 1960', plaqueType: 'historical-event-or-institutional-context',
    invitation: 'A press photograph records Martin Luther King Jr. at the Ella Baker-organized Shaw conference but cannot stand in for Baker, student workshops, or the organizing that produced SNCC.',
    articleTitle: 'Pragmatism', dateLabel: 'Unidentified photographer · Shaw University press conference, 16 April 1960 · State Archives of North Carolina · no known copyright restrictions',
    objectInterpretation: 'The installed photograph shows Martin Luther King Jr. at a Shaw University press conference on 16 April 1960, held by the State Archives of North Carolina. The photographer and exact call number are unverified; the Flickr Commons status is no known copyright restrictions, not an affirmative license. Ella Baker and student workshops are not shown.',
    additions: ['King, microphones, press table, and surrounding men establish a public-media moment. The frame over-centers him relative to Baker, student organizers, women, workshops, and wider participation.', 'Baker convened the 15–17 April meeting in response to sit-ins, and SNCC developed through student-led discussion and organization. Movement records, not the press portrait, ground that history.', 'Public inquiry is an interpretive relation rather than a pragmatist genealogy. Student leadership, collective strategy, internal disagreement, risk, and institutional accountability must retain their own traditions.'],
    sources: [academic('sncc', 'SNCC Digital Gateway — Founding of SNCC', 'https://snccdigital.org/events/founding-of-sncc/'), primary('student', 'Student Voice — movement primary publication', 'https://snccdigital.org/wp-content/uploads/digitalcollections/sv6006.pdf')],
    guide: ['The photograph shows King at a press conference, not Baker or workshops.', 'State Archives custody lacks a retrieved call number; rights are NKR only.', 'The Shaw conference ran 15–17 April 1960 and helped form SNCC.', 'Student-led organizing must not be reduced to King or a pragmatist lineage.'],
    resolution: 'identified exactly what the press photograph shows and omits, retained unknown photographer/call number and NKR status, sourced Baker and SNCC history, bounded pragmatist interpretation, and preserved ratio and CTA.', lock: 'fnv1a64:5a9f30c4189de370',
  },
  'continuity-fannie-lou-hamer': {
    plaqueTitle: 'Fannie Lou Hamer in Atlantic City, 22 August 1964', plaqueType: 'historical-event-or-institutional-context',
    invitation: 'Leffler photographed Hamer before the convention opened, so the image introduces the MFDP challenge without depicting her Credentials Committee testimony.',
    articleTitle: 'Pragmatism', dateLabel: 'Warren K. Leffler · photograph, 22 August 1964 · Library of Congress, ds.07134 · restoration Adam Cuerden · public domain',
    objectInterpretation: 'The installed image is Adam Cuerden’s restoration of Warren K. Leffler’s photograph of Fannie Lou Hamer in Atlantic City on 22 August 1964, Library of Congress U.S. News & World Report Magazine Collection, ds.07134. Donated staff-photo rights support public-domain reuse. The date precedes the convention opening and the image is not the testimony.',
    additions: ['Hamer’s seated profile, patterned dress, table, and act of speaking establish a dated press photograph. They cannot supply the words, audience, institutional setting, or outcome of later testimony.', 'The Mississippi Freedom Democratic Party challenged an all-white delegation produced by voter suppression; Hamer’s testimony and the rejected compromise belong to archival and primary records.', 'Democratic inquiry here means institutions answering excluded citizens, organized evidence, bodily risk, and demands for revision. Hamer’s political thought cannot be reduced to academic pragmatism.'],
    sources: [academic('archives', 'U.S. National Archives — African American voting rights resources', 'https://www.archives.gov/research/african-americans/vote'), primary('hamer', 'American Archive — Fannie Lou Hamer interview and transcript', 'https://americanarchive.org/catalog/cpb-aacip_28-bg2h70895r')],
    guide: ['Leffler made the photograph on 22 August 1964; Cuerden restored it.', 'LOC ds.07134 and donated U.S. News staff rights anchor the object and reuse basis.', 'The date precedes the convention and this is not the Credentials Committee testimony.', 'MFDP organizing and Hamer’s testimony require primary and archival records.'],
    resolution: 'corrected the title from convention testimony to exact date/place context, supplied LOC identifier, maker, restoration and rights basis, centered MFDP evidence, bounded pragmatist framing, and preserved ratio and CTA.', lock: 'fnv1a64:652e08dfdd514582',
  },
};

const reviewMethod = 'Galleries 18–19 supplemental review: exactly three concurrent GPT-5.6 Terra/High read-only evidence scopes of twelve, eleven, and eleven non-overlapping exhibits were reconciled by the Sol parent across installed-object identity, attribution, dating, institution, provenance, rights, captions, alt text, primary evidence, later reception, interpretive imagery, unresolved evidence, claim-level sources, factual plaques, subject-specific guidance, canonical relationships, exact article actions, current review locks, natural-ratio mounting, and desktop, mobile, and fresh staged-3D presentation.';

const visualReview = (id: string): NonNullable<NonNullable<MuseumSupplementalExhibit['review']>['visualReview']> => ({
  desktop: {reviewedOn: '2026-08-20', viewport: '1440×900', evidence: `Direct route inspected with the full uncropped object preview, three untitled sourced paragraphs, subject-specific evidence guide, factual plaque relationship, exact article action, and no horizontal overflow. Evidence: docs/visual-validation/gallery-18-19-supplementals/desktop/${id}.png`},
  mobile: {reviewedOn: '2026-08-20', viewport: '390×844', evidence: `Direct route inspected with a wrapped factual title, aspect-safe object preview, scrollable interpretation, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-18-19-supplementals/mobile/${id}.png`},
  threeDimensional: {reviewedOn: '2026-08-20', viewport: '1280×720 fresh direct-route session', evidence: `Fresh direct-route session inspected after closing the detail view: the sole staged activation remained this routed target, with a factual two-level plaque, unobstructed controls, and a natural-ratio mount. Evidence: docs/visual-validation/gallery-18-19-supplementals/staged-3d/${id}.png`},
});

const canonicalContext = (input: MuseumSupplementalExhibit): MuseumCanonicalContextRef => {
  if (input.articleRoute?.kind === 'philosopher') return {kind: 'philosopher', id: input.articleRoute.philosopherId};
  if (input.articleRoute?.kind === 'branch') return {kind: 'branch', id: input.articleRoute.branchId};
  throw new Error(`Gallery 19 supplemental exhibit ${input.id} lacks a canonical article route.`);
};

export const reviewPragmatismSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery 19 review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery 19 presentation for ${input.id}.`);
  const baseParagraphs = input.sections.map((section) => section.paragraphs.join(' '));
  if (baseParagraphs.length !== 3) throw new Error(`Gallery 19 supplemental exhibit ${input.id} must begin with exactly three paragraphs.`);
  const sources: readonly MuseumSupplementalInterpretationSource[] = [
    {...input.sources[0], id: 'object'},
    {...input.sources[1], id: 'context'},
    ...(reviewed.sources ?? []),
  ];
  const sourceIds = sources.flatMap((source) => source.id ? [source.id] : []);
  const argumentIds = sources.flatMap((source) => source.id && source.kind !== 'collection-record' ? [source.id] : []);
  return {
    ...input,
    dateLabel: reviewed.dateLabel,
    sections: baseParagraphs.map((paragraph, index) => ({heading: '', paragraphs: [`${paragraph} ${reviewed.additions[index]}`], sourceIds: index === 0 ? sourceIds : argumentIds.length ? argumentIds : sourceIds})),
    sources,
    visitorGuide: [
      {heading: `${reviewed.plaqueTitle}: object record`, items: reviewed.guide.slice(0, 2).map((description, index) => ({label: ['Identity', 'Material limit'][index], description, sourceIds}))},
      {heading: `${reviewed.plaqueTitle}: interpretive limits`, items: reviewed.guide.slice(2).map((description, index) => ({label: ['Philosophical claim', 'Interpretive limit'][index], description, sourceIds}))},
    ],
    objectInterpretation: reviewed.objectInterpretation,
    presentation: {...input.presentation, panelKicker: 'Gallery 19 supplemental exhibit', proximityKicker: reviewed.plaqueTitle, factRows: [{label: 'Object', value: reviewed.plaqueTitle}, {label: 'Evidence', value: reviewed.dateLabel}, {label: 'Atlas route', value: reviewed.articleTitle}], articleActionLabel: `Read the full sourced ${reviewed.articleTitle} article`, exhibitLayout: 'object-led'},
    wallPlaque: {type: reviewed.plaqueType, title: reviewed.plaqueTitle, invitation: reviewed.invitation, canonicalContexts: [canonicalContext(input)]},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-20', method: reviewMethod, resolution: `Resolved: ${reviewed.resolution}`, lock: reviewed.lock, visualReview: visualReview(input.id)},
  };
};
