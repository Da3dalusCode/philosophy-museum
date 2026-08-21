import type {NavigableAppRoute} from '../../routing/routes';
import type {MuseumAssetId} from './museumAssetTypes';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
} from './museumSupplementalAuthoring';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import {
  PRAGMATISM_GALLERY_ID,
  PRAGMATISM_ROOM_SIGN_COPY,
} from './pragmatismGalleryCuration';
import type {PragmatismGalleryAssetId} from './pragmatismGalleryAssets';
import {reviewPragmatismSupplementalExhibit} from './pragmatismSupplementalReview';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export {PRAGMATISM_GALLERY_ID, PRAGMATISM_ROOM_SIGN_COPY};

export const PRAGMATISM_PALETTE = Object.freeze({
  ink: '#2d302f',
  inquiryBlue: '#456d7d',
  fallibilistGold: '#a6783f',
  experiencePlum: '#6f5b74',
  democracyRed: '#985c4f',
  educationGreen: '#587064',
  archiveCharcoal: '#2d302f',
});

export type PragmatismSupplementalExhibitId =
  | 'peirce-observatory-measurement'
  | 'peirce-coast-survey-observatory'
  | 'peirce-mapmaking-standards'
  | 'peirce-printing-public-record'
  | 'james-naturalist-expedition'
  | 'james-alexandrina-observation'
  | 'james-home-library'
  | 'james-leonora-piper-inquiry'
  | 'james-self-portrait-formation'
  | 'dewey-michigan-intellectual-work'
  | 'dewey-child-drawing'
  | 'dewey-hull-house-kindergarten'
  | 'dewey-laboratory-school'
  | 'dewey-labor-education'
  | 'continuity-jane-addams'
  | 'continuity-hull-house-arts'
  | 'continuity-alain-locke'
  | 'continuity-anna-julia-cooper'
  | 'continuity-shaw-student-movement'
  | 'continuity-fannie-lou-hamer';

type ParentId = 'peirce' | 'william-james' | 'dewey';

type AcademicReference = {
  label: string;
  url: string;
};

type CuratedInput = {
  id: PragmatismSupplementalExhibitId;
  assetId: PragmatismGalleryAssetId;
  parent: ParentId;
  displayName: string;
  shortTitle: string;
  focus: string;
  dateLabel: string;
  question: string;
  lead: string;
  ideas: readonly [string, string, string];
  sectionDetails: readonly [string, string, string];
  cautions: readonly [string, string];
  imageSource: string;
  academicSource: AcademicReference;
  articleRoute?: NavigableAppRoute;
  entityKind?: 'philosopher' | 'branch';
};

const image = (url: string) => ({
  label: url.includes('loc.gov/')
    ? 'Library of Congress — displayed object or image record'
    : 'Wikimedia Commons — displayed object or image record',
  url,
  kind: 'collection-record' as const,
});

const academic = ({label, url}: AcademicReference) => ({
  label,
  url,
  kind: 'academic-reference' as const,
});

const PEIRCE_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Charles Sanders Peirce',
  url: 'https://plato.stanford.edu/entries/peirce/',
};

const JAMES_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — William James',
  url: 'https://plato.stanford.edu/entries/james/',
};

const DEWEY_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — John Dewey',
  url: 'https://plato.stanford.edu/entries/dewey/',
};

const ADDAMS_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Jane Addams',
  url: 'https://plato.stanford.edu/entries/addams-jane/',
};

const LOCKE_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Alain LeRoy Locke',
  url: 'https://plato.stanford.edu/entries/alain-locke/',
};

const COOPER_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Anna Julia Cooper',
  url: 'https://plato.stanford.edu/entries/anna-julia-cooper/',
};

const PRAGMATISM_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Pragmatism',
  url: 'https://plato.stanford.edu/entries/pragmatism/',
};

const philosopherRoute = (philosopherId: ParentId): NavigableAppRoute => ({
  kind: 'philosopher',
  philosopherId,
});

const curated = (input: CuratedInput): MuseumSupplementalExhibit => authorSupplementalExhibit({
  id: input.id as MuseumSupplementalExhibitId,
  assetId: input.assetId as MuseumAssetId,
  displayName: input.displayName,
  shortTitle: input.shortTitle,
  workLabel: input.focus,
  dateLabel: input.dateLabel,
  question: input.question,
  frontSubtitle: input.question,
  lead: input.lead,
  keyIdeas: input.ideas,
  cautions: input.cautions,
  sections: [
    {heading: 'Read the evidence', paragraph: `${input.ideas[0]} ${input.sectionDetails[0]}`},
    {heading: 'Follow the inquiry', paragraph: `${input.ideas[1]} ${input.sectionDetails[1]}`},
    {heading: 'Test the inheritance', paragraph: `${input.ideas[2]} ${input.sectionDetails[2]}`},
  ],
  sources: [image(input.imageSource), academic(input.academicSource)],
  articleRoute: input.articleRoute ?? philosopherRoute(input.parent),
  entityKind: input.entityKind ?? 'philosopher',
  panelKicker: 'Gallery 19 evidence and context exhibit',
});

const PRAGMATISM_CURATED_EXHIBITS = [
  curated({
    id: 'peirce-observatory-measurement',
    assetId: 'peirce-harvard-observatory-telescope-c1900',
    parent: 'peirce',
    displayName: 'Measurement Before Metaphor: The Observatory as a Working Institution',
    shortTitle: 'Observatory Measurement',
    focus: 'INQUIRY · INSTRUMENTS, ERROR, COMPARISON, AND COMMUNAL CHECKING',
    dateLabel: 'Harvard College Observatory telescope photographed around 1900',
    question: 'What does philosophical fallibilism look like when inquiry depends on instruments, trained observers, and repeated correction?',
    lead: 'A telescope is not a transparent window onto nature. It joins glass, calibration, observers, notebooks, schedules, and comparison into a practice whose results can be checked. That material setting helps explain why Peirce treated inquiry as a public discipline rather than a private flash of certainty.',
    ideas: [
      'The photograph makes the apparatus of observation visible while leaving most of its procedures outside the frame.',
      'Peirce’s work in astronomy and metrology taught him to treat error as something to estimate and manage rather than deny.',
      'Fallibilism does not mean that every claim is equally doubtful; it demands methods through which better-supported claims can survive criticism.',
    ],
    sectionDetails: [
      'The instrument’s scale and fixed mounting show that observation is organized before anyone looks through the eyepiece. Its design limits what can be detected, while calibration and recording make different observations comparable. The image dates from around 1900 and should be read as institutional context, not as a portrait of Peirce at this specific telescope.',
      'Peirce worked for the United States Coast Survey and undertook astronomical and gravitational measurements. Repeated observations exposed variation caused by instruments, environments, and human judgment. His philosophical account of inquiry carries this practical lesson: reasons gain authority through procedures that other investigators can repeat, challenge, and improve.',
      'A beginner can contrast fallibilism with both dogmatism and casual skepticism. Dogmatism treats correction as defeat; casual skepticism treats uncertainty as a reason to stop. Peircean inquiry instead asks how a community can locate sources of error, redesign a test, and approach a more stable result without claiming immunity from future evidence.',
    ],
    cautions: [
      'This photograph does not document Peirce using the displayed telescope.',
      'Instrumental precision can reduce some errors while leaving institutional bias, access, and research priorities unexamined.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Harvard_Observatory_Telescope.jpg',
    academicSource: PEIRCE_REFERENCE,
  }),
  curated({
    id: 'peirce-coast-survey-observatory',
    assetId: 'peirce-coast-survey-calais-observatory',
    parent: 'peirce',
    displayName: 'A Network of Stations: Coast Survey Observation at Calais',
    shortTitle: 'Survey Observatory Site',
    focus: 'FIELD SCIENCE · STATIONS, LONGITUDE, COORDINATION, AND LOCAL CONDITIONS',
    dateLabel: 'Calais observatory site, used 1857–1866 · photographed 2013',
    question: 'How can distant observers produce one usable result when every measurement begins from a particular place?',
    lead: 'The surviving granite instrument supports at Calais place measurement inside weather, terrain, transport, and coordinated schedules. Peirce’s Coast Survey work belonged to this wider network of stations. Knowledge became reliable through relations among local observations, not by escaping locality altogether.',
    ideas: [
      'The surviving granite supports remind us that national scientific systems were assembled from particular sites, instruments, and practical constraints.',
      'Coordinated observations turn separated measurements into evidence only when standards, timing, and methods are shared.',
      'A community of inquiry is an achievement requiring communication and correction, not simply a crowd that happens to agree.',
    ],
    sectionDetails: [
      'Despite its misleading Commons filename, the source description identifies these remains with the former Coast Survey observatory at Calais, Maine. The building is gone, while granite supports for its clock and transit instrument survive in place. The site is useful evidence for the Survey’s distributed material world, but the record does not establish that Peirce worked at this particular station. That distinction keeps an institutional connection from becoming invented biography.',
      'Nineteenth-century longitude determination linked clocks, astronomical observations, telegraphic signals, and calculations across stations. Peirce’s scientific career exposed him to cases in which one observer’s result made sense only within a chain of other observations. His social conception of inquiry likewise treats independent checking as a condition of warranted confidence.',
      'Shared method can still reproduce a shared mistake. The philosophical point is therefore stronger than agreement: an inquiry must remain open to recalcibration, inconvenient observations, rival hypotheses, and new participants. Public standards matter because they let disagreements identify a procedure that can be examined rather than merely opposing one authority to another.',
    ],
    cautions: [
      'The Calais site is Coast Survey context, not direct documentation of Peirce working at this specific station.',
      'Do not romanticize a scientific network as automatically inclusive or free from state and institutional priorities.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:CastineME_Observatory.jpg',
    academicSource: {
      label: 'Maine Historic Preservation Commission — Calais Observatory (1857–1866)',
      url: 'https://www.maine.gov/mhpc/programs/national-register-of-historic-places/recent-listings/calais-observatory-calais-1857-1866',
    },
  }),
  curated({
    id: 'peirce-mapmaking-standards',
    assetId: 'peirce-coast-survey-mapmaking-division-1940',
    parent: 'peirce',
    displayName: 'From Observations to a Map: Standards Make Evidence Travel',
    shortTitle: 'Mapmaking Standards',
    focus: 'REPRESENTATION · SELECTION, SCALE, CONVENTION, AND REVISABLE RESULTS',
    dateLabel: 'U.S. Coast and Geodetic Survey map-making division photographed in 1940',
    question: 'What work must occur before a measurement becomes a public sign that others can use?',
    lead: 'Rows of specialists convert field records into coordinated graphic form. The photograph was made long after Peirce’s service, yet it reveals the institutional afterlife of a problem central to his semeiotic: signs do not copy reality without mediation; they organize relations that interpreters learn to use.',
    ideas: [
      'A map is a manufactured sign whose scale, symbols, omissions, and intended uses shape what it can disclose.',
      'Peirce’s account of signs emphasizes a relation among sign, object, and interpretant rather than a picture simply resembling its subject.',
      'Public representation becomes trustworthy through traceable standards and revision, not through visual confidence alone.',
    ],
    sectionDetails: [
      'Drafting tables, coordinated labor, and repeated graphic conventions show representation as a process. A finished chart can appear self-evident because the decisions behind its projection, scale, labels, and data have disappeared. The photograph restores some of that labor while still withholding whose territory, hazards, and priorities entered the final product.',
      'For Peirce, a sign functions by standing for an object in a way that produces a further interpretant; icons, indices, and symbols emphasize different relations. A survey mark may be physically connected to a location, while lines and legends rely on learned convention. Mapmaking therefore offers a concrete bridge between his scientific practice and his general theory of signs.',
      'The image also disciplines a common misunderstanding of pragmatism. Practical consequences are not whatever feels useful to one person. A chart must support shared navigation and withstand conflict with later observations. When coastlines, depths, or reference systems change, correction is evidence that the representational practice remains answerable to its object.',
    ],
    cautions: [
      'The 1940 office is a later institutional descendant, not Peirce’s personal workplace.',
      'Maps can be technically consistent while serving unequal political, military, or commercial purposes.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Map-making_Division_of_Coast_%26_Geodetic_Survey,_Dept_of_Commerce_LCCN2016877308.jpg',
    academicSource: PEIRCE_REFERENCE,
  }),
  curated({
    id: 'peirce-printing-public-record',
    assetId: 'peirce-coast-survey-press-room-1937',
    parent: 'peirce',
    displayName: 'Printing the Result: Inquiry Requires a Public Record',
    shortTitle: 'The Public Record',
    focus: 'PUBLICATION · REPRODUCTION, DISTRIBUTION, SCRUTINY, AND CORRECTION',
    dateLabel: 'Coast and Geodetic Survey press room photographed in 1937',
    question: 'Why must the results of inquiry circulate beyond the people who first produced them?',
    lead: 'The press room turns a local product into reproducible charts that can be used and contested elsewhere. Although photographed decades after Peirce’s Coast Survey work, it gives physical form to his claim that inquiry points beyond an individual investigator toward an indefinitely extended community.',
    ideas: [
      'Printing stabilizes a record sufficiently for comparison while multiplying the audience able to discover its errors.',
      'Peirce opposed grounding knowledge in private intuition because unshareable certainty cannot enter a common test.',
      'Publication serves inquiry only when records remain accessible, interpretable, and correctable rather than acquiring authority from circulation itself.',
    ],
    sectionDetails: [
      'Large presses, paper handling, and skilled operators show that dissemination is material labor. Reproduced charts can coordinate navigation across many users, but identical copies also reproduce identical mistakes. Publicity creates the possibility of scrutiny; it does not guarantee that criticism is heard or that revisions reach everyone affected.',
      'Peirce’s anti-Cartesian essays reject the idea that philosophy should begin from a manufactured universal doubt resolved by individual self-certainty. Actual doubt arises within practice, and inquiry answers it through signs and reasons available to others. A printed scientific record makes that outward orientation concrete: a result becomes part of a longer conversation rather than the investigator’s possession.',
      'Today the same question applies to data, code, archives, and institutional reports. Reproducibility requires enough context to understand how a result was made, not only a polished conclusion. A pragmatist public therefore needs durable records, channels for dissent, and procedures that can convert well-founded criticism into corrected practice.',
    ],
    cautions: [
      'The photograph dates to 1937 and should not be described as a scene from Peirce’s career.',
      'Wide distribution may amplify error or official authority as easily as it amplifies warranted findings.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Press_room_where_all_maps_and_charts_are_printed_for_the_Coast_and_Geodetic_Survey_LCCN2016871356.jpg',
    academicSource: PEIRCE_REFERENCE,
  }),
  curated({
    id: 'james-naturalist-expedition',
    assetId: 'william-james-thayer-expedition-group-c1866',
    parent: 'william-james',
    displayName: 'Learning to See in the Field: James and the Thayer Expedition',
    shortTitle: 'The Thayer Expedition',
    focus: 'FORMATION · NATURAL HISTORY, TRAVEL, COLLECTING, AND CONTINGENCY',
    dateLabel: 'Group portrait around 1866 · William James seated at lower left',
    question: 'How did an unfinished scientific vocation shape James’s later attention to experience, selection, and the limits of detached observation?',
    lead: 'The young William James appears among assistants and volunteers on Louis Agassiz’s expedition to Brazil. The journey exposed him to field observation, illness, collecting, and a scientific project entangled with racial hierarchy. It belongs to his formation without serving as a simple origin story for later pragmatism.',
    ideas: [
      'The group portrait restores the collective labor around an expedition often narrated through a famous leader.',
      'Fieldwork confronts an observer with selection: what to notice, collect, name, preserve, and exclude from the record.',
      'James’s later empiricism values the thickness of experience, but that value does not erase the unequal conditions under which some experiences were recorded.',
    ],
    sectionDetails: [
      'Formal posing turns a mobile and internally unequal expedition into an orderly group. James sits at the lower left, but the photograph says little about each person’s work or about the Brazilian people whose environments and bodies became objects of study. Reading the image critically means asking who stood behind the camera and beyond its social frame.',
      'James joined the 1865–1866 Thayer Expedition while considering a career in natural history. Seasickness, poor health, and uncertainty contributed to his early return. The episode did not directly produce radical empiricism, yet it gave him practical experience of observation as embodied, selective, and dependent on circumstances rather than the activity of an untouched spectator.',
      'Agassiz also used collecting and representation within a polygenist racial program. James later moved away from his teacher’s racial science, but visitors should not treat his presence as innocent by default or claim a tidy conversion the archive cannot supply. A pragmatist inheritance is strongest when it examines the practices that made evidence, including their exclusions and harms.',
    ],
    cautions: [
      'Do not make the expedition a single-cause explanation of James’s mature philosophy.',
      'Scientific collecting in Brazil must be read with its imperial and racial hierarchies, not only as adventurous fieldwork.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Group_portrait_of_Thayer_Expedition_assistants_and_volunteers.jpg',
    academicSource: JAMES_REFERENCE,
  }),
  curated({
    id: 'james-alexandrina-observation',
    assetId: 'william-james-alexandrina-woodcut-1865',
    parent: 'william-james',
    displayName: 'Alexandrina Looks Back: Observation, Mediation, and Power',
    shortTitle: 'Head of Alexandrina',
    focus: 'REPRESENTATION · SITTER, SKETCH, WOODCUT, CAPTION, AND RACIALIZED GAZE',
    dateLabel: 'James’s sketch made in 1865 · woodcut published 1868–1869',
    question: 'What happens to a person when scientific and travel records convert an encounter into an image for distant readers?',
    lead: 'Alexandrina is named, yet the surviving print reaches us through William James’s sketch, an unidentified woodcut artist, and a travel book shaped by the Agassiz expedition. Her portrait is evidence of an encounter and of a representational chain; it is not a neutral specimen or transparent access to her life.',
    ideas: [
      'Keeping Alexandrina’s name in the label resists reducing her to the visual feature that the period caption emphasized.',
      'A sketch transformed into a woodcut passes through multiple hands, technologies, and editorial purposes before becoming published evidence.',
      'Radical attention to experience must ask whose first-person account survives and whose appearance is interpreted by others.',
    ],
    sectionDetails: [
      'The print presents Alexandrina in profile and was based on a sketch by James, but an unidentified craftsperson cut the published block. The accompanying book drew attention to her hair and situated the image within racialized description. A museum should expose that framing rather than repeat its language as if it were a self-description.',
      'James’s later philosophy argues against carving experience into rigid, self-sufficient units before attending to its relations. This image offers a difficult test for that openness. Alexandrina was encountered within a social world of race, gender, labor, travel, and unequal authority, yet the expedition record narrows those relations into an appearance selected for publication.',
      'The exhibit therefore redirects inquiry from “What type does this face represent?” to “How was this representation produced, and what testimony is missing?” That shift does not recover Alexandrina’s voice. It makes the limits of the record explicit and treats the absent first-person perspective as an epistemic loss rather than an invitation to invent one.',
    ],
    cautions: [
      'The print is mediated through James’s drawing and an unidentified woodcut artist; it is not an unfiltered likeness.',
      'Do not infer Alexandrina’s identity, beliefs, or life story beyond what the surviving record supports.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Head_of_Alexandrina.jpg',
    academicSource: JAMES_REFERENCE,
  }),
  curated({
    id: 'james-home-library',
    assetId: 'william-james-house-library-habs-1967',
    parent: 'william-james',
    displayName: 'A Philosophy Made in Conversation: The William James House Library',
    shortTitle: 'James’s Domestic Library',
    focus: 'INTELLECTUAL LIFE · READING, CORRESPONDENCE, FAMILY, AND CONVERSATION',
    dateLabel: 'Cambridge house interior documented by HABS in October 1967',
    question: 'How does a domestic intellectual environment complicate the image of philosophy as solitary thought?',
    lead: 'Built-in shelves and clustered pictures evoke a room where books, letters, visitors, and family life could meet. The photograph was made fifty-seven years after James died, so it offers architectural afterlife rather than a frozen view of his desk. Its value lies in opening philosophy’s domestic and social infrastructure.',
    ideas: [
      'A library organizes possible encounters among authors, disciplines, memories, and unfinished questions.',
      'James wrote within a dense network of family, students, colleagues, correspondents, and critics rather than from isolation.',
      'Pluralism becomes a practice when rival descriptions remain in conversation without being forced into one finished system.',
    ],
    sectionDetails: [
      'The Historic American Buildings Survey documented the room in 1967, preserving shelves, openings, and decorative arrangement. It cannot tell visitors which books James placed where, what objects changed after 1910, or what conversation occurred on a given day. Architectural documentation supports careful questions, not a staged claim of untouched authenticity.',
      'James moved across physiology, psychology, religion, philosophy, and public debate. His lectures and correspondence often test ideas against concrete cases and anticipated objections. The house reminds us that this work also depended on time, space, care, money, editing, and relationships—conditions frequently omitted when a doctrine is reduced to one author and one book.',
      'James’s pluralism describes a world whose parts are connected but not necessarily absorbed into an all-enclosing whole. A working library offers a modest analogy: its volumes can conflict, overlap, and alter a reader without becoming chapters of one system. The analogy remains practical only if readers still judge evidence rather than celebrating variety for its own sake.',
    ],
    cautions: [
      'The 1967 photograph is not an untouched reconstruction of James’s lifetime library.',
      'Domestic space should not hide the labor and privilege that made a celebrated scholar’s work possible.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:William_James_House_-_079933pv.jpg',
    academicSource: JAMES_REFERENCE,
  }),
  curated({
    id: 'james-leonora-piper-inquiry',
    assetId: 'william-james-leonora-piper-newspaper-1899',
    parent: 'william-james',
    displayName: 'Leonora Piper and the Risk of Investigating the Disputed',
    shortTitle: 'Psychical Research',
    focus: 'EVIDENCE · TESTIMONY, CONTROLS, FRAUD, EXPERIENCE, AND SUSPENDED JUDGMENT',
    dateLabel: 'Leonora Piper portrayed in the illustrated press, 25 June 1899',
    question: 'How should inquiry proceed when testimony is significant, ordinary explanations are contested, and decisive evidence remains elusive?',
    lead: 'The newspaper portrait shows Leonora Piper, whose mediumistic trances James and other psychical researchers investigated. James resisted dismissing reports merely because they offended current expectations, but openness did not require accepting a supernatural explanation. The case tests how inquiry can remain hospitable and critical at once.',
    ideas: [
      'The press portrait made Piper publicly recognizable while also framing a contested investigation as spectacle.',
      'James treated unusual experiences as data worthy of description, not as automatic proof of the interpretation attached to them.',
      'A live hypothesis must face controls, alternative explanations, and the possibility that evidence will remain underdetermined.',
    ],
    sectionDetails: [
      'The halftone image supplies a face but no transcript, experimental protocol, or independent result. Newspaper circulation could broaden interest while rewarding sensational categories such as believer and debunker. The exhibit therefore separates the historical person, the reported performances, the tests applied, and the competing explanations instead of collapsing them into one claim.',
      'James participated in organized psychical research and observed Piper over years. He considered fraud, subconscious processes, telepathy, and survival-related interpretations without treating all as equally established. His willingness to investigate reflects a broader conviction that philosophy should not exclude stubborn experience by definition, especially when ordinary categories fail to describe what participants report.',
      'Intellectual courage can mean examining a stigmatized subject; it can also mean refusing to announce more than the evidence warrants. Visitors should ask whether controls rule out ordinary information channels, whether reports are selective, whether observers influence interpretation, and what would count against each hypothesis. Suspended judgment is an active research position, not evasive neutrality.',
    ],
    cautions: [
      'Piper’s portrait and James’s interest do not verify paranormal or spiritualist explanations.',
      'Historical investigators’ confidence should be evaluated through their procedures and records, not borrowed as authority.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:The_medium_Mrs._Leonora_Piper.png',
    academicSource: JAMES_REFERENCE,
  }),
  curated({
    id: 'james-self-portrait-formation',
    assetId: 'william-james-self-portrait-c1866',
    parent: 'william-james',
    displayName: 'Drawing a Possible Self: Art Before Psychology and Philosophy',
    shortTitle: 'James’s Self-Portrait',
    focus: 'FORMATION · ART, VOCATION, ATTENTION, AND A SELF STILL IN PROCESS',
    dateLabel: 'Self-portrait drawing around 1866',
    question: 'What does a youthful self-representation reveal—and fail to reveal—about a life not yet organized by one vocation?',
    lead: 'James drew this searching likeness while still weighing art, medicine, natural history, and uncertain futures. The portrait should not be made to illustrate a later theory of the self. Instead, it lets visitors see vocation as a contingent path shaped by practice, health, relationships, and revision.',
    ideas: [
      'A self-portrait is an active construction made through selection and skill, not a transparent view into an inner essence.',
      'James’s early artistic training sharpened habits of attention that remained valuable after he left painting as a profession.',
      'His later account of the self distinguishes changing streams, social recognitions, bodily life, and acts of appropriation rather than positing one simple substance on display.',
    ],
    sectionDetails: [
      'The pencil drawing selects pose, expression, cropping, and emphasis; its intimacy comes from a made object, not from direct access to James’s thoughts. Dating it to around 1866 places it near a period of vocational uncertainty and poor health. Neither the eyes nor the unfinished line can legitimately be read as a coded statement of pragmatism.',
      'James had studied art with William Morris Hunt before pursuing scientific and medical training. Changing direction did not make the artistic period wasted preparation. Careful looking, sensitivity to temperament, and resistance to overly smooth systems later marked his psychological and philosophical prose, although those continuities should be argued from writings rather than deduced from the portrait.',
      'For beginners, the work introduces James’s distinction between a person as known and the knower’s ongoing activity without pretending that the drawing solves it. We represent ourselves to ourselves and others, but those representations enter a moving history. A pragmatist self is formed through habits and choices while remaining exposed to new relations and possible redirection.',
    ],
    cautions: [
      'Do not treat facial expression as evidence of a diagnosis, crisis, or mature doctrine.',
      'A narrative of eventual philosophical success can erase the real uncertainty of James’s early choices.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:William_James_self-portrait.jpg',
    academicSource: JAMES_REFERENCE,
  }),
  curated({
    id: 'dewey-michigan-intellectual-work',
    assetId: 'dewey-inlander-staff-faculty-advisers-c1884-93',
    parent: 'dewey',
    displayName: 'A Student Public Takes Shape: Dewey and The Inlander',
    shortTitle: 'The Inlander Staff',
    focus: 'COMMUNICATION · EDITING, ASSOCIATION, STUDENT VOICE, AND PUBLIC RESPONSIBILITY',
    dateLabel: 'University of Michigan staff portrait around 1884–1893',
    question: 'How can making a publication become education in cooperation, judgment, and responsibility to readers?',
    lead: 'Students pose with faculty advisers John Dewey and Fred Newton Scott around a shared periodical. The photograph cannot recover their editorial debates, but it makes education visible as organized communication rather than information delivered by one lecturer to isolated recipients.',
    ideas: [
      'A publication creates a small public by coordinating writers, editors, advisers, production, and readers.',
      'Dewey’s educational philosophy treats communication as participation in shared activity, not merely the transmission of finished conclusions.',
      'Association becomes democratic only when participants have meaningful opportunities to contribute, question authority, and learn from consequences.',
    ],
    sectionDetails: [
      'The posed rows communicate membership and institutional respectability while hiding the unequal work behind a periodical. The source identifies Dewey and Scott as faculty advisers, but it does not tell us what they advised, who selected material, or whose voices were excluded. A group portrait records affiliation more securely than interaction.',
      'During his Michigan years, Dewey was moving from an idealist formation toward psychology and an increasingly social account of mind. Editing and advising do not prove a later doctrine, yet a student publication offers a concrete example of learning through consequential activity: choices about language and audience produce an object for response beyond the classroom.',
      'For Dewey, communication can transform a collection of individuals into a public capable of recognizing shared problems. But institutional membership alone is insufficient. Visitors can test the democratic quality of any educational project by asking who sets its agenda, who bears routine labor, whether dissent can alter the result, and how feedback changes the next attempt.',
    ],
    cautions: [
      'The photograph documents affiliation, not the content or equality of the group’s work.',
      'Do not project Dewey’s mature educational theory backward as the staff’s explicit program.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Inlander_staff_with_faculty_advisors_John_Dewey_%26_Fred_Newton_Scott.jpg',
    academicSource: DEWEY_REFERENCE,
  }),
  curated({
    id: 'continuity-jane-addams',
    assetId: 'pragmatism-continuity-jane-addams-hine-1913',
    parent: 'dewey',
    displayName: 'Jane Addams: Sympathetic Knowledge and Social Democracy',
    shortTitle: 'Jane Addams',
    focus: 'PUBLIC PHILOSOPHY · SETTLEMENT, CARE, RECIPROCITY, PEACE, AND REFORM',
    dateLabel: 'Lewis Hine portrait at Hull House, 1913',
    question: 'What changes when philosophical inquiry is conducted through long residence, reciprocal relationships, and public action?',
    lead: 'Lewis Hine photographs Jane Addams beside the working furniture of Hull House. Addams was an author, organizer, institution builder, and philosopher in her own right. Her account of sympathetic knowledge joins understanding to relationship and action while testing reform against the experience of people most affected.',
    ideas: [
      'The portrait locates a public thinker in an institution where neighborhood problems generated both practical projects and philosophical reflection.',
      'Addams’s sympathetic knowledge requires receptive engagement with others rather than projection of the reformer’s preferred story.',
      'Her radical meliorism measures progress laterally through shared gains, not only through achievements by exceptional individuals.',
    ],
    sectionDetails: [
      'Hine’s formal portrait presents Addams as a recognizable public figure but cannot show the many residents, neighbors, workers, and collaborators who sustained Hull House. Desk, chair, and interior frame intellectual labor without turning settlement work into one person’s creation. The image should introduce a network, not restore a solitary founder myth.',
      'Addams wrote from experiences of immigration, labor conflict, garbage collection, juvenile justice, gendered violence, education, and peace advocacy. She treated social settlements as sites where knowledge could be tested in action. Unlike detached benevolence, sympathetic knowledge asks the inquirer to form relationships capable of correcting comfortable assumptions.',
      'Addams also exposes the gendered construction of the philosophical canon. Dewey and other men were often credited with theory while her work was classified as application. Recovering her does more than add a missing name: it changes what counts as philosophical method by treating care, organizing, administration, narrative, and institutional experiment as sources of disciplined reflection.',
    ],
    cautions: [
      'Addams must not be reduced to Dewey’s assistant or to a practical example of ideas authored by men.',
      'Sympathy can become paternalism unless affected people can challenge the reformer’s interpretation and shape action.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Jane_Addams_of_Hull_House,_Chicago,_Ill._LOC_nclc.04836.jpg',
    academicSource: ADDAMS_REFERENCE,
    articleRoute: {kind: 'branch', branchId: 'pragmatism'},
    entityKind: 'branch',
  }),
  curated({
    id: 'continuity-hull-house-arts',
    assetId: 'pragmatism-continuity-hull-house-singing-class-1929',
    parent: 'dewey',
    displayName: 'Democracy in Rehearsal: Eleanor Smith’s Hull House Singing Class',
    shortTitle: 'Hull House Arts',
    focus: 'CULTURE · LISTENING, COORDINATION, EXPRESSION, DISCIPLINE, AND BELONGING',
    dateLabel: 'Singing class published in the 1929 Hull House Year Book',
    question: 'Can making music together cultivate democratic capacities without demanding cultural sameness?',
    lead: 'A teacher at the piano leads a large group of children in song. The scene extends Hull House’s story beyond policy reform into cultural participation and disciplined cooperation. Music can create shared attention, yet it also raises questions about whose repertoire, language, and authority organize the room.',
    ideas: [
      'Collective singing coordinates breath, listening, memory, timing, and response through embodied practice.',
      'Addams treated art and recreation as elements of a rich social life rather than luxuries added after material needs were met.',
      'A common activity supports plural democracy only when participation does not require erasing cultural difference.',
    ],
    sectionDetails: [
      'The 1929 photograph shows Eleanor Smith’s class within Hull House’s later institutional life. It does not establish that Addams or Dewey attended this session or reveal how children experienced it. Rows facing a pianist can support cooperative music, adult direction, performance discipline, or several of these at once.',
      'Hull House programs included music, theater, crafts, lectures, labor education, and festivals. Addams understood cultural activity as a means of association and mutual recognition, especially amid industrial urban life. Such programs could allow neighbors to share traditions, but settlement workers also possessed resources and authority that could privilege their ideas of refinement.',
      'The democratic question is therefore not whether everyone sings the same notes. It is whether participants learn to attend to one another, contribute to the form, and revise a shared performance without converting difference into deficiency. Culture becomes inquiry when people can ask what an activity expresses, whom it welcomes, and how its rules might change.',
    ],
    cautions: [
      'The image records one class and cannot reveal each child’s experience or degree of choice.',
      'Shared culture should not be romanticized when educators control the repertoire, language, and standards of participation.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Eleanor_Smith_singing_class.jpg',
    academicSource: ADDAMS_REFERENCE,
    articleRoute: {kind: 'branch', branchId: 'pragmatism'},
    entityKind: 'branch',
  }),
  curated({
    id: 'continuity-alain-locke',
    assetId: 'pragmatism-continuity-alain-locke-rhodes-portrait-1907',
    parent: 'dewey',
    displayName: 'Alain Locke: Value Pluralism and Democratic Culture',
    shortTitle: 'Alain Locke',
    focus: 'VALUES · PLURALISM, CULTURE, RACE, EDUCATION, AND CRITICAL RELATIVISM',
    dateLabel: 'Portrait published no later than 1907',
    question: 'How can plural values be compared and transformed without declaring one culture’s inherited standard absolute?',
    lead: 'The young Alain Locke appears near the beginning of an intellectual career that would join philosophy, education, aesthetics, and the New Negro movement. His critical value pluralism broadens the gallery beyond its familiar founders while resisting the mistake that pluralism means every judgment is interchangeable.',
    ideas: [
      'The youthful portrait predates Locke’s mature philosophy and should open a trajectory rather than summarize it.',
      'Locke treated values as shaped in historical and cultural life while preserving the possibility of comparison, criticism, and transformation.',
      'Art and cultural expression can reorganize social perception, but representation alone cannot substitute for material and political equality.',
    ],
    sectionDetails: [
      'This formal image was published around the time Locke became the first African American Rhodes Scholar. That milestone brought recognition within institutions structured by racial exclusion. It should not eclipse his later teaching at Howard University, philosophical writing, editorial work, and role in debates surrounding the Harlem Renaissance.',
      'Locke drew from pragmatist and other philosophical resources to develop a functional account of value and a pluralist approach to culture. Values are not timeless objects simply discovered intact, yet neither are they arbitrary preferences sealed from criticism. Their meanings emerge through practices and can be reoriented when wider experience exposes their limits.',
      'As editor of The New Negro, Locke argued that artistic and intellectual self-representation could challenge inherited racial stereotypes and support new forms of collective life. The claim remains contestable: cultural achievement can alter perception while markets and institutions select which voices circulate. Pragmatist continuity here means inquiry into how values operate, not enrollment in one uniform school.',
    ],
    cautions: [
      'Do not reduce Locke’s philosophy to the Rhodes Scholarship or to his role as an arts promoter.',
      'Pluralism is not the claim that all values are equally defensible or that power disappears in cultural exchange.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Alain_LeRoy_Locke.jpg',
    academicSource: LOCKE_REFERENCE,
    articleRoute: {kind: 'branch', branchId: 'pragmatism'},
    entityKind: 'branch',
  }),
  curated({
    id: 'dewey-child-drawing',
    assetId: 'dewey-child-cave-and-trees-drawing-1900',
    parent: 'dewey',
    displayName: 'The Child’s Mark as Evidence: Drawing in The School and Society',
    shortTitle: 'A Child Draws a Cave',
    focus: 'LEARNING · MAKING, IMAGINATION, PURPOSE, REFLECTION, AND GROWTH',
    dateLabel: 'Unidentified child’s drawing reproduced in 1900',
    question: 'What can a child’s made object show about learning that a recited answer cannot?',
    lead: 'A child’s lines form a cave, trees, and a represented problem within Dewey’s The School and Society. The image matters because a learner produced something that can be discussed and revised. Its anonymous attribution also warns how easily educational theory can eclipse the child whose work becomes its evidence.',
    ideas: [
      'The drawing records an act of organizing experience, not simply a score on a predetermined answer.',
      'Dewey connected learning to purposeful occupations in which perception, imagination, technique, and reflection cooperate.',
      'Child-centered education still requires careful guidance and must not turn children’s work into decorative proof of an adult theory.',
    ],
    sectionDetails: [
      'The cave and trees are legible without displaying academic realism. Their educational importance lies in the questions that surrounded their making: what activity prompted the image, what the child intended, what difficulties appeared, and how discussion changed the next effort. The published page alone cannot answer those questions or identify the young artist.',
      'Dewey criticized classrooms that separated abstract subject matter from the learner’s active concerns. He did not propose that children simply do whatever they please. Teachers arrange environments where meaningful projects generate needs for observation, history, number, language, and technique, then help students reflect on the consequences of their attempts.',
      'The exhibit asks adults to distinguish honoring agency from romanticizing spontaneity. A learner needs room to initiate and revise, but also access to accumulated knowledge and skilled feedback. Democratic education treats the child as a participant whose experience matters while recognizing that education deliberately expands what the learner can notice, imagine, and do.',
    ],
    cautions: [
      'The child artist is unidentified; the drawing must not be attributed to Dewey.',
      'One published example cannot demonstrate the overall success or inclusiveness of the Laboratory School.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:The_School_and_Society_-_Drawing_of_a_Cave_and_Trees.png',
    academicSource: DEWEY_REFERENCE,
  }),
  curated({
    id: 'dewey-hull-house-kindergarten',
    assetId: 'dewey-hull-house-kindergarten-1902',
    parent: 'dewey',
    displayName: 'Learning in a Neighborhood Institution: Hull House Kindergarten',
    shortTitle: 'Hull House Kindergarten',
    focus: 'SOCIAL EDUCATION · CARE, IMMIGRATION, NEIGHBORHOOD KNOWLEDGE, AND RECIPROCITY',
    dateLabel: 'Hull House kindergarten photographed in 1902',
    question: 'How does education change when a school is understood within neighborhood life rather than apart from it?',
    lead: 'Children and adults gather around low tables in a Hull House classroom. This was not Dewey’s Laboratory School, yet Hull House was an important site of exchange among Jane Addams, Dewey, reformers, immigrants, workers, and educators. The room places democratic learning amid care and community institutions.',
    ideas: [
      'The crowded scene makes early education visible as coordinated bodily, emotional, and intellectual labor.',
      'Addams and Hull House developed their own social philosophy and should not be reduced to an application of Dewey’s ideas.',
      'A neighborhood institution can learn from participants only when exchange is reciprocal rather than a one-way civilizing mission.',
    ],
    sectionDetails: [
      'The image shows tables, materials, children, and adults within a shared room, but a single instant cannot reveal the curriculum or children’s responses. Its modest resolution and unknown photographer limit close inference. The most reliable claim is institutional: kindergarten formed one strand of Hull House’s wider educational and social work.',
      'Dewey visited Hull House and shared with Addams an interest in democracy, education, and intelligence formed through association. Their relationship involved intellectual exchange, not a simple hierarchy from theorist to practitioner. Settlement experience pressed philosophical questions about labor, immigration, poverty, gender, and culture that a university classroom could keep abstract.',
      'The democratic test concerns whose knowledge directs action. Residents and educators may bring resources, but neighbors also interpret needs and consequences from positions outsiders do not occupy. Education becomes social inquiry when programs change through listening, participation, and observed results rather than treating communities as objects to be improved according to a fixed external plan.',
    ],
    cautions: [
      'This is Hull House, not Dewey’s Laboratory School or a class taught by Dewey.',
      'Settlement work combined reciprocal learning with real class and cultural power differences that should not be softened into harmony.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:JA_Hull_House_-_Kindergarten_Detail.jpeg',
    academicSource: ADDAMS_REFERENCE,
  }),
  curated({
    id: 'dewey-laboratory-school',
    assetId: 'dewey-laboratory-schools-exterior-2006',
    parent: 'dewey',
    displayName: 'An Experiment Becomes an Institution: The Laboratory Schools',
    shortTitle: 'The Laboratory School',
    focus: 'INSTITUTION · EXPERIMENT, CURRICULUM, CONTINUITY, AND ACCOUNTABILITY',
    dateLabel: 'University of Chicago Laboratory Schools photographed in 2006',
    question: 'What is gained—and what can be lost—when an educational experiment becomes a lasting institution?',
    lead: 'A twenty-first-century campus exterior keeps the Laboratory Schools’ name visible long after Dewey’s founding experiment. It is not the original 1896 setting and cannot illustrate a Dewey-era lesson. Instead, it raises a pragmatist question about how institutions preserve, revise, or merely commemorate an experimental purpose.',
    ideas: [
      'The later building records institutional continuity without guaranteeing continuity of pedagogy.',
      'Dewey’s laboratory metaphor joined teaching to systematic observation and revision rather than treating children as passive experimental subjects.',
      'An experiment remains democratic only when affected learners and communities can help evaluate its aims and consequences.',
    ],
    sectionDetails: [
      'Collegiate Gothic architecture, lawn, and mature trees present a stable school identity in 2006. Dewey’s original Laboratory School began elsewhere in 1896, and its classrooms, staffing, enrollment, and social conditions differed from those behind this facade. The time gap is the exhibit’s subject, not an inconvenience to hide.',
      'Dewey and colleagues sought to connect subject matter with occupations that organized practical and intellectual problems. “Laboratory” meant that educators should study learning through reflective practice and improve curriculum in light of evidence. It did not authorize unaccountable experimentation on children or promise one universal method applicable without context.',
      'Durable institutions accumulate resources, expertise, traditions, and reputations, but those strengths can harden into self-protection. A Deweyan evaluation asks what problems the school now identifies, whose experience counts as evidence, how failures are disclosed, and whether revision reaches admissions, curriculum, assessment, and relationships beyond the campus—not merely classroom technique.',
    ],
    cautions: [
      'The 2006 exterior is not the original Laboratory School setting or evidence of Dewey-era practice.',
      'Institutional survival should not be treated as proof that an educational experiment succeeded for every learner.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:University_of_Chicago_Laboratory_Schools.jpg',
    academicSource: DEWEY_REFERENCE,
  }),
  curated({
    id: 'dewey-labor-education',
    assetId: 'dewey-hine-night-school-boston-1909',
    parent: 'dewey',
    displayName: 'Democratic Learning Beyond School: Night School and Public Life',
    shortTitle: 'Night School and Democracy',
    focus: 'PUBLIC LIFE · NIGHT SCHOOL, IMMIGRATION, ASSOCIATION, AND PARTICIPANT VOICE',
    dateLabel: 'Boston night-school photograph, October 1909',
    question: 'When does a night school become a democratic institution rather than merely an extension of institutional discipline?',
    lead: 'Rows of students read and write at wooden desks in an October 1909 Boston night school. The Library of Congress title identifies the students collectively as immigrants, while the National Child Labor Committee provenance supports the attribution to Lewis Hine. The photograph records organized learning beyond the daytime school without naming the institution, teacher, assigned text, students, or their purposes.',
    ideas: [
      'Desks, open books, bent heads, a chalkboard, and rows of male students establish a photographed night-school session, not its curriculum or outcome.',
      'Dewey understood democracy as associated inquiry and communication that cannot be confined to childhood schooling or electoral procedure.',
      'Night schools can widen access to literacy and public participation while also imposing assimilation, discipline, and institutional definitions of need.',
    ],
    sectionDetails: [
      'The LOC record dates the print to October 1909, preserves the NCLC caption-card title, and qualifies Hine’s attribution as provenance-based. The frame cannot identify a book, language, occupation, immigration history, length of attendance, teacher–student relation, or what anyone learned. Visible concentration is not participant testimony.',
      'Dewey’s political philosophy treats democracy as a way institutions organize shared experience, communication, and revision. Night schools, libraries, unions, settlements, and public forums may become educational environments because people encounter common consequences there. This photograph documents none of Dewey’s presence or influence; the relationship must be argued from his writings, not read from faces or desks.',
      'A democratic test therefore asks who defined the course, who could attend, which languages and experiences counted, whether students could question instruction, and how learning altered their agency. The official collective label “immigrants” cannot replace individual identities or voices. The scene opens those questions while withholding the evidence needed to answer them.',
    ],
    cautions: [
      'The caption identifies immigrants collectively but does not name individuals, origins, occupations, school, teacher, text, or curriculum.',
      'No evidence makes Dewey the school’s designer, teacher, participant, or influence.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Immigrants_in_night_school._LOC_nclc.04549.jpg',
    academicSource: DEWEY_REFERENCE,
  }),
  curated({
    id: 'continuity-anna-julia-cooper',
    assetId: 'pragmatism-continuity-anna-julia-cooper-bell-c1902',
    parent: 'dewey',
    displayName: 'Anna Julia Cooper: Experience Against Democratic Abstraction',
    shortTitle: 'Anna Julia Cooper',
    focus: 'STANDPOINT · RACE, GENDER, EDUCATION, CITIZENSHIP, AND VOICE',
    dateLabel: 'C. M. Bell studio portrait around 1902',
    question: 'What does democratic inquiry miss when people facing intersecting exclusions are treated as objects of reform rather than knowers?',
    lead: 'Anna Julia Cooper sits with an unidentified closed book, a scholar and educator whose work analyzed race, gender, class, citizenship, and education together. She is presented as a critical continuity and omission, not assigned retroactively to a formal pragmatist school she did not claim.',
    ideas: [
      'The portrait’s book signals learning in a conventional studio language, but its unidentified title cannot stand in for Cooper’s actual writings.',
      'Cooper argued that Black women’s position disclosed structures that dominant accounts of both race and gender failed to see.',
      'A democracy cannot call inquiry public while excluding the testimony, education, and agency of those most affected by its institutions.',
    ],
    sectionDetails: [
      'Bell’s portrait gives Cooper a dignified visual presence but reveals neither the book in her hand nor the arguments she made. Those must be recovered through texts such as A Voice from the South and her educational work. The image resists archival absence only when interpretation refuses to turn an elegant pose into a complete intellectual biography.',
      'Cooper examined how racism and sexism interact rather than treating one as a secondary complication of the other. Her analysis gives epistemic weight to a social position that dominant reform movements often ignored. Education mattered not as assimilation into a fixed hierarchy but as development of voices capable of interpreting and transforming public life.',
      'Placing Cooper in this continuity room tests pragmatism’s claims about experience. If a philosophy praises experience while canonizing mainly white men, its procedures for selecting relevant experience require criticism. Cooper supplies independent philosophical resources for that criticism; she is not valuable merely because her work can improve someone else’s tradition.',
    ],
    cautions: [
      'Cooper should not be labeled a formal pragmatist without qualification or absorbed into Dewey’s intellectual biography.',
      'The closed book in the photograph is unidentified and must not be assigned a title.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:A_J_Cooper.jpg',
    academicSource: COOPER_REFERENCE,
    articleRoute: {kind: 'branch', branchId: 'pragmatism'},
    entityKind: 'branch',
  }),
  curated({
    id: 'continuity-shaw-student-movement',
    assetId: 'pragmatism-continuity-shaw-university-public-inquiry-1960',
    parent: 'dewey',
    displayName: 'Inquiry Becomes Organization: The Shaw University Meeting',
    shortTitle: 'The Shaw Meeting',
    focus: 'DEMOCRATIC ACTION · STUDENT VOICE, ORGANIZING, STRATEGY, AND INSTITUTION BUILDING',
    dateLabel: 'Martin Luther King Jr. at Shaw University, 16 April 1960',
    question: 'How can people turn shared experience of injustice into an organization capable of learning and acting collectively?',
    lead: 'Martin Luther King Jr. speaks at Shaw University during the Ella Baker-organized meeting associated with the formation of the Student Nonviolent Coordinating Committee. The photograph shows neither Baker nor the workshops that did the organizing work. It opens a case in democratic intelligence without renaming a civil-rights meeting as a pragmatist conference.',
    ideas: [
      'A press table makes public speech visible while much of the listening, disagreement, and planning remains beyond the frame.',
      'Baker defended student-led organization rather than treating young activists as a temporary audience for established leaders.',
      'Collective inquiry requires structures that preserve local knowledge, distribute leadership, and revise strategy through experience.',
    ],
    sectionDetails: [
      'The crowded photograph centers King because the camera and press recognized him, but the meeting’s institutional significance cannot be read from his visibility alone. Baker, students, local organizers, and workshop participants shaped the emerging organization. Visual prominence and causal importance are not the same historical claim.',
      'The sit-in movement had generated practical knowledge across many communities: how to train participants, respond to violence, negotiate, communicate, raise funds, and sustain local action. Gathering at Shaw allowed students to compare those experiences. The result was not a finished blueprint but an organization that could continue coordinating and learning.',
      'This history extends a pragmatist question about publics beyond the academy. People become a capable public by naming a shared problem and building means to investigate and act on it. Yet the connection is interpretive, not genealogical: civil-rights organizers drew on many religious, political, and community traditions and should not be claimed as illustrations of one philosophical lineage.',
    ],
    cautions: [
      'The meeting was not a pragmatist conference, and civil-rights organizers should not be reduced to applications of Dewey.',
      'King’s visibility in this frame must not erase Ella Baker, student leaders, local organizers, or the meeting’s workshop labor.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Martin_Luther_King_Jr._at_Shaw_University.jpg',
    academicSource: PRAGMATISM_REFERENCE,
    articleRoute: {kind: 'branch', branchId: 'pragmatism'},
    entityKind: 'branch',
  }),
  curated({
    id: 'continuity-fannie-lou-hamer',
    assetId: 'pragmatism-continuity-fannie-lou-hamer-1964',
    parent: 'dewey',
    displayName: 'Fannie Lou Hamer: Testimony as a Democratic Test',
    shortTitle: 'Fannie Lou Hamer',
    focus: 'PUBLIC EVIDENCE · TESTIMONY, ORGANIZING, RISK, INSTITUTIONS, AND REVISION',
    dateLabel: 'Atlantic City portrait, 22 August 1964 · before the convention opened',
    question: 'What must an institution do when testimony exposes that its official procedures exclude the people it claims to represent?',
    lead: 'Fannie Lou Hamer speaks with focused intensity in Atlantic City during the Mississippi Freedom Democratic Party’s 1964 challenge. This photograph was made before the Democratic National Convention opened and should not be captioned as the exact Credentials Committee testimony. It nevertheless anchors the political force of experience made public.',
    ideas: [
      'Hamer’s authority came from organizing and lived confrontation with voter suppression, not from experience treated as a private possession.',
      'Testimony becomes public evidence when it can challenge official descriptions and demand an institutional response.',
      'A democratic process fails the pragmatist test when it absorbs criticism symbolically while preserving the practices that produced exclusion.',
    ],
    sectionDetails: [
      'Warren K. Leffler’s photograph fixes one moment and expression without supplying Hamer’s words or the full sequence of the convention challenge. Its August 22 date matters: the convention had not yet opened, so the image cannot literally document her televised committee appearance. Responsible display separates the portrait’s evidentiary power from an attractive but false caption.',
      'Hamer and the Mississippi Freedom Democratic Party exposed the contradiction between an officially recognized delegation and a political system structured by racial terror and disfranchisement. Her testimony connected institutional rules to bodily violence and organized exclusion. Experience here is not a substitute for argument; it supplies facts that official procedure had learned not to register.',
      'The convention’s offered compromise remains a test case in whether institutions genuinely learn. Recognition without adequate power may domesticate criticism rather than answer it. The pragmatist connection is therefore normative and cautious: democratic institutions should revise in response to consequences disclosed by excluded publics, while Hamer’s thought and activism exceed any philosophical tradition assigned by this gallery.',
    ],
    cautions: [
      'This August 22 photograph is not the exact Credentials Committee testimony and must not be captioned as such.',
      'Hamer was an organizer and political thinker in her own traditions, not an illustrative footnote to Dewey or academic pragmatism.',
    ],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Fannie_Lou_Hamer_1964-08-22.png',
    academicSource: PRAGMATISM_REFERENCE,
    articleRoute: {kind: 'branch', branchId: 'pragmatism'},
    entityKind: 'branch',
  }),
].map(reviewPragmatismSupplementalExhibit) satisfies readonly MuseumSupplementalExhibit[];

const PRAGMATISM_SUPPLEMENTAL_EXHIBIT_ORDER = [
  'peirce-observatory-measurement',
  'peirce-coast-survey-observatory',
  'peirce-mapmaking-standards',
  'peirce-printing-public-record',
  'james-naturalist-expedition',
  'james-alexandrina-observation',
  'james-home-library',
  'james-leonora-piper-inquiry',
  'james-self-portrait-formation',
  'dewey-michigan-intellectual-work',
  'dewey-child-drawing',
  'dewey-hull-house-kindergarten',
  'dewey-laboratory-school',
  'dewey-labor-education',
  'continuity-jane-addams',
  'continuity-hull-house-arts',
  'continuity-alain-locke',
  'continuity-anna-julia-cooper',
  'continuity-shaw-student-movement',
  'continuity-fannie-lou-hamer',
] as const satisfies readonly PragmatismSupplementalExhibitId[];

export const PRAGMATISM_SUPPLEMENTAL_EXHIBITS =
  PRAGMATISM_SUPPLEMENTAL_EXHIBIT_ORDER.map((id) => {
    const exhibit = PRAGMATISM_CURATED_EXHIBITS.find((candidate) => candidate.id === id);
    if (!exhibit) throw new Error(`Gallery 19 supplemental exhibit ${id} is missing.`);
    return exhibit;
  }) satisfies readonly MuseumSupplementalExhibit[];

type InstallationKind = 'pragmatism-work' | 'pragmatism-context' | 'pragmatism-concept';

const layout = (
  id: PragmatismSupplementalExhibitId,
  parentExhibitId: ParentId,
  guidedAfterExhibitId: ParentId,
  zoneId:
    | 'pragmatism-peirce-inquiry'
    | 'pragmatism-james-experience'
    | 'pragmatism-dewey-democracy'
    | 'pragmatism-continuities-reserve',
  position: {x: number; z: number},
  rotationY: number,
  assetId: PragmatismGalleryAssetId,
  mediaWidth: number,
  mediaHeight: number,
  installationKind: InstallationKind,
  accent: string,
) => authorSupplementalLayout({
  id: id as MuseumSupplementalExhibitId,
  parentExhibitId,
  guidedAfterExhibitId,
  zoneId,
  position,
  rotationY,
  assetId: assetId as MuseumAssetId,
  mediaWidth,
  mediaHeight,
  installationKind: installationKind as MuseumSupplementalInstallationKind,
  accent,
  viewpointDistance: 3,
});

export const PRAGMATISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout(
    'peirce-observatory-measurement',
    'peirce',
    'peirce',
    'pragmatism-peirce-inquiry',
    {x: -5.55, z: -26.88},
    0,
    'peirce-harvard-observatory-telescope-c1900',
    2.7 * 535 / 640,
    2.7,
    'pragmatism-context',
    PRAGMATISM_PALETTE.inquiryBlue,
  ),
  layout(
    'peirce-coast-survey-observatory',
    'peirce',
    'peirce',
    'pragmatism-peirce-inquiry',
    {x: -5.55, z: -15.12},
    Math.PI,
    'peirce-coast-survey-calais-observatory',
    3.2,
    3.2 * 425 / 640,
    'pragmatism-context',
    PRAGMATISM_PALETTE.educationGreen,
  ),
  layout(
    'peirce-mapmaking-standards',
    'peirce',
    'peirce',
    'pragmatism-peirce-inquiry',
    {x: 5.55, z: -26.88},
    0,
    'peirce-coast-survey-mapmaking-division-1940',
    3.2,
    3.2 * 514 / 640,
    'pragmatism-concept',
    PRAGMATISM_PALETTE.fallibilistGold,
  ),
  layout(
    'peirce-printing-public-record',
    'peirce',
    'peirce',
    'pragmatism-peirce-inquiry',
    {x: 5.55, z: -15.12},
    Math.PI,
    'peirce-coast-survey-press-room-1937',
    3.2,
    3.2 * 505 / 640,
    'pragmatism-concept',
    PRAGMATISM_PALETTE.archiveCharcoal,
  ),
  layout(
    'james-naturalist-expedition',
    'william-james',
    'william-james',
    'pragmatism-james-experience',
    {x: -5.55, z: -12.88},
    0,
    'william-james-thayer-expedition-group-c1866',
    3.2,
    3.2 * 485 / 640,
    'pragmatism-context',
    PRAGMATISM_PALETTE.educationGreen,
  ),
  layout(
    'james-alexandrina-observation',
    'william-james',
    'william-james',
    'pragmatism-james-experience',
    {x: -5.55, z: -1.12},
    Math.PI,
    'william-james-alexandrina-woodcut-1865',
    2.7 * 578 / 640,
    2.7,
    'pragmatism-context',
    PRAGMATISM_PALETTE.democracyRed,
  ),
  layout(
    'james-home-library',
    'william-james',
    'william-james',
    'pragmatism-james-experience',
    {x: 5.55, z: -12.88},
    0,
    'william-james-house-library-habs-1967',
    3.2,
    3.2 * 458 / 640,
    'pragmatism-context',
    PRAGMATISM_PALETTE.fallibilistGold,
  ),
  layout(
    'james-leonora-piper-inquiry',
    'william-james',
    'william-james',
    'pragmatism-james-experience',
    {x: 10.85, z: -7},
    -Math.PI / 2,
    'william-james-leonora-piper-newspaper-1899',
    3.05,
    3.05 * 581 / 640,
    'pragmatism-concept',
    PRAGMATISM_PALETTE.experiencePlum,
  ),
  layout(
    'james-self-portrait-formation',
    'william-james',
    'william-james',
    'pragmatism-james-experience',
    {x: 5.55, z: -1.12},
    Math.PI,
    'william-james-self-portrait-c1866',
    2.7 * 479 / 640,
    2.7,
    'pragmatism-work',
    PRAGMATISM_PALETTE.experiencePlum,
  ),
  layout(
    'dewey-michigan-intellectual-work',
    'dewey',
    'dewey',
    'pragmatism-dewey-democracy',
    {x: -5.55, z: 1.12},
    0,
    'dewey-inlander-staff-faculty-advisers-c1884-93',
    3.2,
    3.2 * 499 / 640,
    'pragmatism-context',
    PRAGMATISM_PALETTE.inquiryBlue,
  ),
  layout(
    'dewey-child-drawing',
    'dewey',
    'dewey',
    'pragmatism-dewey-democracy',
    {x: -5.55, z: 12.88},
    Math.PI,
    'dewey-child-cave-and-trees-drawing-1900',
    3.2,
    3.2 * 480 / 640,
    'pragmatism-work',
    PRAGMATISM_PALETTE.fallibilistGold,
  ),
  layout(
    'dewey-hull-house-kindergarten',
    'dewey',
    'dewey',
    'pragmatism-dewey-democracy',
    {x: 5.55, z: 1.12},
    0,
    'dewey-hull-house-kindergarten-1902',
    3.2,
    3.2 * 375 / 571,
    'pragmatism-context',
    PRAGMATISM_PALETTE.democracyRed,
  ),
  layout(
    'dewey-laboratory-school',
    'dewey',
    'dewey',
    'pragmatism-dewey-democracy',
    {x: 10.85, z: 7},
    -Math.PI / 2,
    'dewey-laboratory-schools-exterior-2006',
    3.2,
    3.2 * 480 / 640,
    'pragmatism-context',
    PRAGMATISM_PALETTE.educationGreen,
  ),
  layout(
    'dewey-labor-education',
    'dewey',
    'dewey',
    'pragmatism-dewey-democracy',
    {x: 5.55, z: 12.88},
    Math.PI,
    'dewey-hine-night-school-boston-1909',
    3.2,
    3.2 * 450 / 640,
    'pragmatism-concept',
    PRAGMATISM_PALETTE.democracyRed,
  ),
  layout(
    'continuity-jane-addams',
    'dewey',
    'dewey',
    'pragmatism-continuities-reserve',
    {x: -5.55, z: 15.12},
    0,
    'pragmatism-continuity-jane-addams-hine-1913',
    2.7 * 448 / 640,
    2.7,
    'pragmatism-context',
    PRAGMATISM_PALETTE.democracyRed,
  ),
  layout(
    'continuity-hull-house-arts',
    'dewey',
    'dewey',
    'pragmatism-continuities-reserve',
    {x: -10.85, z: 21},
    Math.PI / 2,
    'pragmatism-continuity-hull-house-singing-class-1929',
    3.2,
    3.2 * 412 / 640,
    'pragmatism-context',
    PRAGMATISM_PALETTE.educationGreen,
  ),
  layout(
    'continuity-alain-locke',
    'dewey',
    'dewey',
    'pragmatism-continuities-reserve',
    {x: -5.55, z: 26.88},
    Math.PI,
    'pragmatism-continuity-alain-locke-rhodes-portrait-1907',
    2.7 * 455 / 640,
    2.7,
    'pragmatism-concept',
    PRAGMATISM_PALETTE.experiencePlum,
  ),
  layout(
    'continuity-anna-julia-cooper',
    'dewey',
    'dewey',
    'pragmatism-continuities-reserve',
    {x: 5.55, z: 15.12},
    0,
    'pragmatism-continuity-anna-julia-cooper-bell-c1902',
    2.7 * 462 / 640,
    2.7,
    'pragmatism-concept',
    PRAGMATISM_PALETTE.fallibilistGold,
  ),
  layout(
    'continuity-shaw-student-movement',
    'dewey',
    'dewey',
    'pragmatism-continuities-reserve',
    {x: 10.85, z: 21},
    -Math.PI / 2,
    'pragmatism-continuity-shaw-university-public-inquiry-1960',
    3.2,
    3.2 * 389 / 640,
    'pragmatism-context',
    PRAGMATISM_PALETTE.inquiryBlue,
  ),
  layout(
    'continuity-fannie-lou-hamer',
    'dewey',
    'dewey',
    'pragmatism-continuities-reserve',
    {x: 5.55, z: 26.88},
    Math.PI,
    'pragmatism-continuity-fannie-lou-hamer-1964',
    2.7 * 425 / 640,
    2.7,
    'pragmatism-concept',
    PRAGMATISM_PALETTE.democracyRed,
  ),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getPragmatismSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = PRAGMATISM_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 19 supplemental exhibit ${id} is missing.`);
  return record;
};
