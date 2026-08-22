import type {
  MuseumCanonicalContextRef,
  MuseumSupplementalExhibit,
  MuseumSupplementalInterpretationSource,
} from './platoSupplementalExhibits';
import {getMuseumAsset} from './museumAssets';

type PlaqueType = NonNullable<MuseumSupplementalExhibit['wallPlaque']>['type'];
type Evidence = {
  plaqueTitle: string;
  plaqueType: PlaqueType;
  articleTitle: string;
  invitation: string;
  visualReading: string;
  claim: string;
  boundary: string;
  guide: readonly [string, string];
  resolution?: string;
  additionalSources?: readonly MuseumSupplementalInterpretationSource[];
};

const source = (
  label: string,
  url: string,
  kind: MuseumSupplementalInterpretationSource['kind'],
): MuseumSupplementalInterpretationSource => ({label, url, kind});

const locks: Record<string, string> = {
  'political-authority-legitimacy': 'fnv1a64:eb9397ba1dc7cf41',
  'public-action-civil-disobedience': 'fnv1a64:9218a51ec211057f',
  'arendt-human-condition': 'fnv1a64:0b9cd89d3a7ea55d',
  'arendt-eichmann-judgment': 'fnv1a64:5fbee8748e07ce5c',
  'rawls-theory-of-justice': 'fnv1a64:2a94e6c323e42424',
  'rawls-original-position': 'fnv1a64:8172440f3d06c3bb',
  'nozick-anarchy-state-utopia': 'fnv1a64:d7b3eb8870429288',
  'nozick-entitlement-rectification': 'fnv1a64:cb7123f91b66bdb3',
  'nussbaum-capabilities-approach': 'fnv1a64:156eebc2cc78344d',
  'nussbaum-frontiers-justice': 'fnv1a64:8250622f5f1455c2',
  'amartya-sen-capability-development': 'fnv1a64:65f8a5d243566f11',
  'habermas-public-sphere': 'fnv1a64:ab182506a03c55fc',
  'democratic-deliberation-assembly': 'fnv1a64:2494c5f79a9d49db',
  'feminist-cooper-voice-education': 'fnv1a64:41e91d609b25b102',
  'feminist-truth-abolition-rights': 'fnv1a64:a210c083edcb7130',
  'feminist-crenshaw-intersectionality': 'fnv1a64:2aaacd7ebc79d5cd',
  'feminist-standpoint-situated-objectivity': 'fnv1a64:7c1b67582a7f7d28',
  'feminist-care-dependency-labor': 'fnv1a64:e217f154c9d0c24b',
  'feminist-astell-reason-education': 'fnv1a64:511e7621fd268615',
  'feminist-wollstonecraft-manufactured-inequality': 'fnv1a64:2b56d1478f7b949b',
  'feminist-de-gouges-citizenship': 'fnv1a64:1b889a91f8def047',
  'feminist-bluestocking-intellectual-publics': 'fnv1a64:d38dff6946e4c41a',
  'feminist-education-domesticity': 'fnv1a64:bc6ffd216829e453',
  'feminist-abolition-convention-exclusion': 'fnv1a64:631590bc4e8d5790',
  'beauvoir-labor-and-immanence': 'fnv1a64:2d254855d395f276',
  'beauvoir-situation-and-place': 'fnv1a64:63c74126868e7e69',
  'beauvoir-second-sex-movement': 'fnv1a64:f5d5a2bc5905d852',
  'beauvoir-aging-and-otherness': 'fnv1a64:7e91d559d92e11a6',
  'beauvoir-boupacha-colonial-violence': 'fnv1a64:153a090b5460f44e',
  'butler-performativity-and-action': 'fnv1a64:f01dcd029cdcf7b1',
  'butler-trans-livability': 'fnv1a64:45ec001e50f3341d',
  'butler-disability-dependency': 'fnv1a64:442fc74474307244',
  'butler-coalition-and-contestation': 'fnv1a64:16725ec11a984aff',
  'butler-assembly-precarity': 'fnv1a64:fb6ed36690ded9bc',
  'fanon-racializing-gaze': 'fnv1a64:fb0bf82bc6a2db0f',
  'fanon-colonial-psychiatry': 'fnv1a64:12846ac525c59e73',
  'fanon-algerian-revolution': 'fnv1a64:95b4e270195a70c5',
  'fanon-violence-decolonization': 'fnv1a64:d4f224432422fe9c',
  'fanon-national-consciousness': 'fnv1a64:153f95617a039a07',
  'davis-prison-abolition': 'fnv1a64:a5f5e2fcbf08fd38',
  'davis-race-gender-class': 'fnv1a64:fac664499eb7b5d5',
  'hooks-margin-center': 'fnv1a64:6c220c5966f1985b',
  'hooks-engaged-pedagogy-love': 'fnv1a64:60ca692005e66a67',
  'cesaire-colonialism-thingification': 'fnv1a64:4268c4987e083ea5',
  'dubois-color-line-colonial-world': 'fnv1a64:de358f1b5f8e4540',
  'said-orientalism-representation': 'fnv1a64:7ceb548ae122378d',
  'spivak-subaltern-representation': 'fnv1a64:b80c74828c2723dd',
  'ngugi-language-decolonization': 'fnv1a64:d3dfb8f622180695',
  'wynter-humanism-coloniality': 'fnv1a64:5285566e29fd8b40',
};

/** Walking order is deliberately identical to Galleries 24, 25, and 26. */
const evidence: Record<string, Evidence> = {
  'political-authority-legitimacy': {
    plaqueTitle: 'Authority, Institutions, and Public Accountability', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Political Philosophy',
    invitation: 'Follow this original interpretive circuit from public authorization through institutions and back through contest and revision, while keeping coercion, obedience, legitimacy, and democratic accountability distinct rather than treating authority as self-justifying power.',
    visualReading: 'The circular table, civic buildings, connecting routes, and revision arrows belong to an original contemporary Museum drawing. They identify a conceptual comparison only; they are not a historical constitution, an author’s diagram, or evidence that public institutions are accountable in practice.',
    claim: 'Political authority concerns a claimed right to issue binding directives and a correlative question of political obligation. Legitimacy may be defended through consent, fair procedure, public reason, benefits, necessity, or justice, but no single path is assumed by the image.',
    boundary: 'A diagram can separate authorization, exercise, challenge, and revision without proving that any regime satisfies them. De facto power, legal validity, moral legitimacy, and a person’s reasons to obey remain different judgments, especially where exclusion or coercion corrupts apparent consent.',
    guide: ['Trace authorization, institutional exercise, contest, and revision as separate stages rather than one circle of automatic legitimacy.', 'Distinguish de facto command, legal office, justified authority, political obligation, dissent, and remedies for exclusion.'],
  },
  'public-action-civil-disobedience': {
    plaqueTitle: 'Leaders of the March on Washington, 28 August 1963', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Political Philosophy',
    invitation: 'Begin with one documented leadership group at the March on Washington, then distinguish protest, public assembly, civil disobedience, nonviolence, coalition, and democratic persuasion without making one United States event the universal model.',
    visualReading: 'Rowland Scherman’s photograph records named march leadership moving together during the March on Washington for Jobs and Freedom. Dress, gesture, and formation are visible; the frame does not disclose every organizer, participant, demand, disagreement, or individual motive.',
    claim: 'Civil disobedience is commonly analyzed as conscientious, communicative, and deliberately unlawful political action, while marches and assemblies need not themselves break law. The historical event shows organized public presence, but classification requires evidence about conduct, law, purpose, and response beyond the photograph.',
    boundary: 'The NARA record establishes maker, date, event, and custody, not a single theory of democratic action. Leadership imagery can eclipse grassroots organizing, women’s labor, internal debate, surveillance, repression, and movements outside the United States, so later reception must not become the whole history.',
    guide: ['Identify Scherman, 28 August 1963, NARA 542000, and the leaders pictured before drawing political conclusions.', 'Separate lawful march, assembly, protest, nonviolent strategy, civil disobedience, coalition history, and later commemoration.'],
  },
  'arendt-human-condition': {
    plaqueTitle: 'Labor, Work, and Action: Interpretive Triptych', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Hannah Arendt',
    invitation: 'Read this original triptych as a prompt for Arendt’s distinctions among recurring life-process, a durable made world, and plural public action, while testing the hierarchy and exclusions her framework can reproduce.',
    visualReading: 'Three equal collage panels show bodily maintenance, fabricated objects, and people speaking together. The contemporary Museum drawing is not by Arendt and does not depict an actual household, workplace, polis, or stable division among activities.',
    claim: 'The Human Condition distinguishes labor, work, and action to ask what kinds of activity sustain life, build a common world, and disclose persons among equals. The categories organize an argument rather than assign every task or person to one permanent sphere.',
    boundary: 'The image cannot settle feminist criticism of Arendt’s public/private distinction or make maintenance visually inferior. Care, racialized and gendered labor, disability, household coercion, exclusion from citizenship, and the material supports of public appearance must remain visible when evaluating the framework.',
    guide: ['Use the three panels to compare temporal patterns and social conditions, not to rank people or occupations.', 'Track labor, work, action, plurality, natality, worldliness, household power, and feminist criticism through Arendt’s texts and reception.'],
    additionalSources: [source('University of Chicago Press — The Human Condition', 'https://press.uchicago.edu/ucp/books/book/chicago/H/bo29137972.html', 'primary-text')],
  },
  'arendt-eichmann-judgment': {
    plaqueTitle: 'Adolf Eichmann at Trial in Jerusalem, 5 April 1961', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Hannah Arendt',
    invitation: 'Examine a state press photograph of Eichmann inside the trial booth, then separate the proceeding, Arendt’s reporting, the phrase “banality of evil,” survivor evidence, legal judgment, and contested later reception.',
    visualReading: 'The Israel Government Press Office image shows Eichmann seated behind glass at the Jerusalem trial. It establishes a dated courtroom setting but cannot reveal thought, motive, remorse, responsibility, testimony, institutional history, or the meaning of Arendt’s later formulation.',
    claim: 'Arendt’s report examined judgment, responsibility, bureaucracy, ideology, and the defendant’s reliance on clichés. “Banality” did not mean that the crimes or their consequences were trivial, nor does one photograph demonstrate her interpretation of his language and conduct.',
    boundary: 'The trial, Arendt’s book, archival evidence, survivor testimony, prosecution strategy, and subsequent scholarship are distinct records. Critics dispute her portrait of Eichmann, treatment of Jewish councils, historical claims, and tone; the installation must not let a compelling booth image settle those disputes.',
    guide: ['Identify the 1961 Jerusalem proceeding and government photograph before introducing Arendt’s report.', 'Distinguish legal guilt, historical explanation, bureaucratic participation, ideological commitment, thoughtlessness, survivor evidence, and critical reception.'],
  },
  'rawls-theory-of-justice': {
    plaqueTitle: 'A Theory of Justice, 1971 American Hardcover', plaqueType: 'work-or-text', articleTitle: 'John Rawls',
    invitation: 'Treat this green hardcover as evidence of a 1971 publication, not a diagram or authenticated first printing, then follow how Rawls formulated and later revised justice as fairness across distinct texts.',
    visualReading: 'The source photograph shows a simple green Harvard University Press cover with white lettering. It supports identification of the published title and design, while the displayed copy’s printing, accession, custody, and dealer history are not independently established.',
    claim: 'A Theory of Justice presents the original position, two principles, fair equality of opportunity, the difference principle, and a priority structure within justice as fairness. The cover does not explain those arguments, and Rawls’s later Political Liberalism reframed important questions of stability and pluralism.',
    boundary: 'Commons treats the typographic cover as copyright-ineligible, not Rawls’s text. “First edition” and “first printing” are not interchangeable, and this unaccessioned copy cannot prove either; publication history, revisions, objections, and later reception require bibliographic and textual evidence.',
    guide: ['Record the 1971 title and simple cover while withholding claims about this copy’s printing, accession, or custody.', 'Distinguish the 1971 formulation, revised edition, political liberalism, primary texts, and later criticism.'],
  },
  'rawls-original-position': {
    plaqueTitle: 'The Original Position and Veil of Ignorance', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'John Rawls',
    invitation: 'Use this original interpretive scene to follow Rawls’s decision device under fair informational limits, without mistaking the veil for ignorance of social facts, human difference, or an actual founding contract.',
    visualReading: 'Equal figures, a translucent veil, and branching social arrangements form an original contemporary Museum drawing. The composition visualizes a choice situation only; it is neither Rawls’s diagram nor a historical meeting or empirical experiment.',
    claim: 'The original position models fair agreement by restricting knowledge of one’s place, talents, class, religion, and conception of the good while retaining general social knowledge. Its parties select principles for a basic structure, not rules for every private choice.',
    boundary: 'The device does not erase embodiment or demand political amnesia. Critics question its assumptions about persons, disability, race, gender, family, global justice, motivation, and idealization; a balanced circle cannot answer whether its informational restrictions or selected principles are justified.',
    guide: ['Identify which particular facts are withheld and which general knowledge the parties retain.', 'Separate the hypothetical device, circumstances of justice, parties’ reasoning, selected principles, basic structure, and objections to idealization.'],
  },
  'nozick-anarchy-state-utopia': {
    plaqueTitle: 'Wilt Chamberlain, 1959', plaqueType: 'reception-or-transmission-history', articleTitle: 'Robert Nozick',
    invitation: 'Meet the basketball player later named in Nozick’s transfer example, while keeping this 1959 portrait separate from the hypothetical payments, background property rights, voluntariness, and disputed justice of the starting distribution.',
    visualReading: 'Fred Palumbo’s portrait shows Chamberlain holding a basketball years before Anarchy, State, and Utopia. The Library of Congress identifies LC-USZ62-115223 and says no known restrictions on publication; pose and likeness reveal nothing about Nozick’s argument.',
    claim: 'Nozick asks readers to imagine voluntary payments upsetting an initially patterned distribution, arguing that liberty disrupts end-state patterns. The example depends on entitlement to the starting holdings and genuine voluntary transfer, conditions that the portrait cannot establish.',
    boundary: '“No known restrictions” is not a categorical worldwide public-domain license. Chamberlain neither authored nor endorsed the example, and critics contest background ownership, bargaining power, structural inequality, and rectification; a famous athlete’s likeness must not make those assumptions disappear.',
    guide: ['Identify Palumbo, 1959, the LOC record, and its precise rights advisory before discussing the later thought experiment.', 'Test initial acquisition, transfer, voluntariness, patterned principles, side constraints, and rectification independently.'],
  },
  'nozick-entitlement-rectification': {
    plaqueTitle: 'Acquisition, Transfer, and Rectification', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Robert Nozick',
    invitation: 'Follow this original interpretive chain through acquisition and transfer to rupture and repair, keeping possession distinct from entitlement and refusing to let an incomplete rectification principle certify present holdings.',
    visualReading: 'A contemporary Museum drawing links acquisition and transfer before broken chains and dispossession redirect the sequence toward investigation and rectification. It is not Nozick’s diagram, a legal title chain, or a record of any particular property.',
    claim: 'Entitlement theory evaluates holdings historically through just acquisition, just transfer, and rectification of injustice. It therefore cannot infer justice from a present pattern alone, and Nozick left the content and institutional application of rectification notably underdeveloped.',
    boundary: 'The image foregrounds theft, enslavement, colonial seizure, and exclusion without proposing one remedy. Evidence, descendants, institutional responsibility, collective claims, compensation, restitution, and limits on otherwise voluntary exchange demand arguments beyond the schematic arrows.',
    guide: ['Ask what evidence would establish each acquisition and transfer rather than treating possession as a moral title.', 'Keep rectification central while distinguishing Nozick’s sketch from legal doctrine, reparations programs, and rival theories of historical justice.'],
  },
  'nussbaum-capabilities-approach': {
    plaqueTitle: 'Central Capabilities as Real Opportunities', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Martha Nussbaum',
    invitation: 'Read ten open portals as an original prompt for plural real opportunities, not a ladder or official diagram, then test universal thresholds against disability, culture, democratic voice, resources, and paternalism.',
    visualReading: 'The contemporary Museum drawing places a person before ten differently pictured openings. It evokes plurality and access but does not reproduce Nussbaum’s wording, rank capabilities, show achieved functionings, or measure what anyone can actually do or be.',
    claim: 'Nussbaum proposes a list of central capabilities protected to threshold levels as requirements of dignity and political justice. Capabilities are substantive opportunities, not resources alone or compulsory achievements, and practical reason and affiliation play architectonic roles.',
    boundary: 'Open doors can conceal conversion barriers, care needs, social stigma, violence, environment, and institutional exclusion. Critics dispute the list’s authorship, universality, threshold setting, democratic legitimacy, and paternalism; Sen’s comparative capability approach is related but not interchangeable.',
    guide: ['Distinguish resources, conversion factors, capability, chosen functioning, threshold, and actual institutional access.', 'Compare Nussbaum’s specified list with Sen’s open comparative framework and disability, feminist, global, and democratic critiques.'],
  },
  'nussbaum-frontiers-justice': {
    plaqueTitle: 'Signing of the Americans with Disabilities Act, 26 July 1990', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Martha Nussbaum',
    invitation: 'Read the ADA signing as one United States legal milestone, then ask how disability, dependency, care, access, and political membership pressure contract theories that idealize independent and similarly situated parties.',
    visualReading: 'Joyce Naltchayan Boghosian’s federal photograph shows President George H. W. Bush signing the ADA beside disability-rights advocates on the White House lawn. It records enactment, not enforcement, adequacy, lived access, or agreement among the people pictured.',
    claim: 'Nussbaum argues that disability, nationality, and species membership expose limits in contract traditions built around roughly equal and independent cooperators. A capabilities account instead asks which real opportunities institutions secure, including supports that make agency possible.',
    boundary: 'The 1990 statute and Nussbaum’s later theory have no simple causal relation, and a U.S. law is not global disability justice. Implementation, exclusions, institutional design, movement history, care labor, self-determination, and disability scholarship must remain distinct evidence.',
    guide: ['Identify the federal maker, date, NARA 186415, signing event, and U.S. statutory context.', 'Separate enactment, enforcement, accessibility, support, dependency, capability thresholds, movement demands, and global comparison.'],
  },
  'amartya-sen-capability-development': {
    plaqueTitle: 'Amartya Sen at a New Delhi Book Release, 2005', plaqueType: 'other', articleTitle: 'Political Philosophy',
    invitation: 'Use this lifetime event portrait to identify Amartya Sen, then distinguish his capability approach, comparative justice, public reasoning, development analysis, and empirical work from Nussbaum’s separate list and threshold project.',
    visualReading: 'The Government of India photograph shows Sen wearing glasses and facing the camera at a 2005 New Delhi release of The Argumentative Indian. It establishes identity, date, and event, not the content, success, or authorship of any capability policy.',
    claim: 'Sen shifts evaluation from resources or utility toward people’s substantive freedoms to achieve valued functionings, emphasizing heterogeneous conversion and public reasoning. He resists fixing one canonical list in advance and links development to the expansion of freedom.',
    boundary: 'A government photograph cannot prove endorsement, policy influence, or developmental outcomes. Sen and Nussbaum share capability vocabulary but differ in method and institutional emphasis; economic measurement, democracy, famine, gender, disability, and global application require separate evidence.',
    guide: ['Identify the 2005 PIB event portrait without turning attendance into government endorsement or theory evidence.', 'Compare capability, functioning, agency, conversion factors, public reasoning, comparative justice, development, and Nussbaum’s distinct list.'],
  },
  'habermas-public-sphere': {
    plaqueTitle: 'Jürgen Habermas in Discussion, 2008', plaqueType: 'other', articleTitle: 'Jürgen Habermas',
    invitation: 'Begin with Habermas speaking in a public discussion, then move beyond the photograph to institutions, media, exclusion, counterpublics, communicative power, and the historical revisions demanded by his public-sphere model.',
    visualReading: 'Wolfram Huke’s licensed event photograph records Habermas seated with a microphone at the Munich School of Philosophy in 2008. It establishes a public intellectual setting but not symmetrical participation, consensus, an ideal speech situation, or any proposition’s truth.',
    claim: 'Habermas reconstructs a bourgeois public sphere in which private people debate public authority, then analyzes transformations driven by state, market, media, and organization. Later work connects communicative action, discourse, law, and democratic legitimacy.',
    boundary: 'One male philosopher at a microphone cannot stand for public reason. Feminist, class, race, colonial, and media criticism exposes exclusions in the historical model and the importance of counterpublics; actual communication also includes strategic power, inequality, distortion, and refusal.',
    guide: ['Use the portrait for identity, maker, date, venue, and event form only.', 'Track historical public spheres, exclusions, counterpublics, communicative versus strategic action, law, media, and institutional power.'],
  },
  'democratic-deliberation-assembly': {
    plaqueTitle: 'Landsgemeinde in Glarus, 3 May 2009', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Political Philosophy',
    invitation: 'Survey one open-air cantonal assembly, then ask how agenda control, membership, voice, information, scale, voting, exclusion, and review shape democratic legitimacy beyond the visual appeal of citizens gathered together.',
    visualReading: 'Marc Schlumpf’s elevated photograph shows a dense public assembled in Glarus’s central square. It records scale, spatial arrangement, and date but cannot identify each participant, determine eligibility, recover arguments, or demonstrate equal influence and informed consent.',
    claim: 'Deliberative democracy links legitimate law to public reasoning among free and equal citizens, while assemblies materialize only some conditions of participation. Votes, reasons, representation, contestation, administration, and rights remain institutionally connected but conceptually distinct.',
    boundary: 'The Landsgemeinde is a living Swiss institution with a specific history, not a timeless or universally scalable model. Past exclusions, current membership rules, agenda setting, privacy, disability access, minority protection, and implementation cannot be inferred from an orderly crowd.',
    guide: ['Identify Glarus, 3 May 2009, photographer, open-air form, and the image’s limits on eligibility and speech.', 'Compare assembly, deliberation, voting, representation, agenda power, minority rights, administrative follow-through, and routes of appeal.'],
  },

  // Gallery 25
  'feminist-cooper-voice-education': {
    plaqueTitle: 'M Street High School, Washington, D.C.', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Feminist Philosophy',
    invitation: 'View a 2008 photograph of the school associated with Anna Julia Cooper’s educational leadership, then follow how Black women’s authority, curriculum, institutional access, class, race, and democratic voice intersect without collapsing into one precursor story.',
    visualReading: 'The licensed architectural photograph records a red-brick school building in 2008. It does not show Cooper, her students, classrooms, 1902–1906 principalship, or historical curriculum, and no direct institutional object accession accompanies the creator upload.',
    claim: 'Cooper defended demanding education and Black women’s authority to interpret democracy in A Voice from the South and through institutional work. The building can locate that history only when paired with primary texts and records rather than treated as a monument that speaks for her.',
    boundary: 'The site must not make Cooper valuable only as a forerunner of intersectionality or erase tensions in uplift, leadership, class, and curriculum. Later building fabric and present commemoration are reception evidence, not transparent access to nineteenth-century educational practice.',
    guide: ['Separate the 2008 building photograph from Cooper’s principalship, students, curriculum, and written arguments.', 'Read voice, education, Black women’s authority, uplift, class, institutional power, and later feminist reception together.'],
    additionalSources: [source('Documenting the American South — A Voice from the South', 'https://docsouth.unc.edu/church/cooper/cooper.html', 'primary-text')],
  },
  'feminist-truth-abolition-rights': {
    plaqueTitle: 'Sojourner Truth Carte-de-Visite, 1864', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Feminist Philosophy',
    invitation: 'Read Truth’s sold photographic card as authored public presence and material support, then distinguish the verified object from disputed speech transcripts, later dialect, abolition history, women’s rights, religion, labor, and reception.',
    visualReading: 'The National Gallery of Art identifies an 1864 carte-de-visite, accession 2014.19.1, showing Truth seated with knitting beside a table. Its inscription says she sold the shadow to support the substance, making circulation and income part of the object.',
    claim: 'Truth’s public work challenged racialized ideals of womanhood and linked emancipation, labor, religion, family, and rights. The deliberately sold portrait supplies stronger evidence of self-presentation than later editors’ invented dialect, but it cannot recover a speech or interior state.',
    boundary: 'A lifetime photograph is still a staged and commercial medium. The famous later “Ain’t I a Woman?” transcription is not verbatim and cannot carry Truth’s entire career; competing reports, authorship, audience, abolition, land, migration, and reparative claims require source criticism.',
    guide: ['Identify the NGA object, accession, 1864 date, pose, inscription, and commercial circulation.', 'Compare contemporaneous reports with later dialect and keep speech, portrait, abolition, religion, labor, and women’s-rights histories distinct.'],
  },
  'feminist-crenshaw-intersectionality': {
    plaqueTitle: 'Kimberlé Crenshaw at a Public Event, 2018', plaqueType: 'other', articleTitle: 'Feminist Philosophy',
    invitation: 'Use this lifetime event photograph to identify Kimberlé Crenshaw, then return to legal cases and texts where intersectionality names structural failures that cannot be repaired by adding separate race and sex analyses.',
    visualReading: 'The Heinrich Böll Foundation photograph shows Crenshaw speaking into a microphone in 2018. It establishes maker, date, license, likeness, and public work but cannot visually demonstrate a legal doctrine, case record, institutional remedy, or community consensus.',
    claim: 'Crenshaw coined intersectionality in legal analysis to show how single-axis frameworks could make Black women’s discrimination claims unintelligible. The concept concerns interacting structures and institutional categories, not a score, identity checklist, or claim that experience automatically guarantees knowledge.',
    boundary: 'A prominent scholar’s portrait must not erase prior Black feminist work, later applications, internal debate, or differences among structural, political, and representational intersectionality. Claims about doctrine and remedy belong to cases and texts, not microphone, gesture, or identity alone.',
    guide: ['Use the photograph for identity and public setting; use the 1989 article for the legal problem and argument.', 'Distinguish single-axis failure, structural interaction, political representation, identity, experience, remedy, and later uses of the term.'],
    additionalSources: [source('University of Chicago Law School — Demarginalizing the Intersection of Race and Sex', 'https://chicagounbound.uchicago.edu/uclf/vol1989/iss1/8/', 'primary-text')],
  },
  'feminist-standpoint-situated-objectivity': {
    plaqueTitle: 'NACA Computer Department, High-Speed Flight Research Station, 1949', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Feminist Philosophy',
    invitation: 'Study a documented workplace of women computers, then ask how institutional position shapes evidence and authority without assuming that women share one standpoint or that marginalization automatically produces truer knowledge.',
    visualReading: 'NASA identifies women seated at desks with calculating equipment in NACA’s High-Speed Flight Research Station in 1949. The former label wrongly placed them at the Aircraft Engine Research Laboratory and NASA Glenn; the corrected record locates one specific workplace.',
    claim: 'Feminist standpoint and situated-knowledge theories examine how social location, division of labor, methods, and institutions shape inquiry. Reflexive objectivity requires accountable practices and comparison, not the claim that identity mechanically determines belief or confers infallibility.',
    boundary: 'NASA identifies the Computer Department and describes calculations for engineers, while naming director Roxanah Yancey and several workers. The photograph still cannot establish pay, racial identification, individual experience, a shared standpoint, or how authorship and technical credit were distributed.',
    guide: ['Identify the October 1949 High-Speed Flight Research Station Computer Department, its calculation work, the people NASA names, and corrected NASA Armstrong custody.', 'Keep pay, racial identification, individual experience, management, standpoint, and the distribution of authorship and technical credit as separate evidence questions.'],
    resolution: 'corrected the institution from NASA Glenn’s predecessor to NACA’s High-Speed Flight Research Station and bounded workplace, standpoint, identity, and objectivity claims.',
    additionalSources: [source('Donna Haraway — Situated Knowledges', 'https://doi.org/10.2307/3178066', 'primary-text')],
  },
  'feminist-care-dependency-labor': {
    plaqueTitle: 'Woman Holding an Infant While Doing Laundry', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Feminist Philosophy',
    invitation: 'Look closely at one unidentified person balancing laundry and infant care, then ask how moral theories change when survival depends on time, rest, wages, disability support, and institutions rather than heroic private sacrifice alone.',
    visualReading: 'The source-attributed Women’s Bureau photograph shows a woman holding an infant while bending over a wash basin. Its broad 1893–1945 range, exact place, identities, kinship, employment status, direct NARA accession, and federal-work record remain unresolved.',
    claim: 'Care ethics makes dependency, attention, relationship, maintenance, and the organization of sustaining labor philosophically central. It contests abstractions of autonomous agents while refusing the gendered assumption that women naturally owe unlimited private care.',
    boundary: 'One photograph cannot establish motherhood, consent, pay, class, race, feeling, or a universal care relation. Dependency can coexist with agency, and responsibility extends to households, employers, markets, states, disability supports, and global labor arrangements rather than resting on one depicted person.',
    guide: ['Describe concurrent laundry and infant care while withholding kinship, employment, place, and interior-state claims.', 'Track care, dependency, agency, maintenance labor, gendered naturalization, disability, wages, time, and institutional distribution.'],
  },
  'feminist-astell-reason-education': {
    plaqueTitle: 'Frontispiece to The Excellent Woman, 1692', plaqueType: 'reception-or-transmission-history', articleTitle: 'Feminist Philosophy',
    invitation: 'This learned woman is not Mary Astell; use the comparative period print to examine why Astell made women’s rational education a moral demand and why her Anglican royalist project resists easy modern labels.',
    visualReading: 'An idealized woman sits among books and instruments inside an architectural frame in the 1692 English edition of Jacques du Bosc’s work. The installed scan has no identified holding, accession, or verified printmaker and is not an Astell likeness.',
    claim: 'Astell’s Serious Proposal argues that women possess rational souls and need intellectual formation rather than training in pleasing dependence. Her critique of arbitrary authority connects education, marriage, religion, and moral agency from within High-Church commitments.',
    boundary: 'Adjacent visual culture cannot become biographical evidence or Astell’s own educational plan. The public-domain historical print and the digital file’s Commons license are different rights layers, while Astell’s Tory theology complicates retrospective labels of liberal or secular feminism.',
    guide: ['Identify the du Bosc frontispiece as period comparison, not Astell’s portrait, authorship, or institution.', 'Read rational soul, education, marriage, arbitrary power, Anglican theology, and modern feminist reception without flattening their tensions.'],
    additionalSources: [
      source('University of Virginia — A Serious Proposal to the Ladies', 'https://anthology.lib.virginia.edu/work/Astell/astell-serious-proposal', 'primary-text'),
      source('University of Michigan EEBO — A Serious Proposal', 'https://quod.lib.umich.edu/e/eebo/A26092.0001.001?view=toc', 'primary-text'),
    ],
  },
  'feminist-wollstonecraft-manufactured-inequality': {
    plaqueTitle: 'Mary Wollstonecraft, c. 1797', plaqueType: 'other', articleTitle: 'Feminist Philosophy',
    invitation: 'Meet Wollstonecraft beside Opie’s lifetime portrait and trace her argument that women’s seeming weakness was cultivated through education, dependency, and reward—an indictment of institutions rather than women’s natural character.',
    visualReading: 'The National Portrait Gallery identifies John Opie’s oil, c. 1797, as NPG 1237 and records Jane, Lady Shelley’s 1899 bequest. The painting verifies a lifetime likeness, not a passage of Vindication, moral character, or transparent interiority.',
    claim: 'A Vindication of the Rights of Woman argues that denied education and rewarded dependence manufacture apparent incapacity, while virtue and reason should not be sex-specific. Its political reach and limits become visible only through the primary text and historical scholarship.',
    boundary: 'The underlying painting is public domain, while the installed NPG-derived reproduction has source-specific terms. Wollstonecraft’s arguments about class, sexuality, motherhood, citizenship, reason, and empire require critical reading rather than a progress narrative anchored by a familiar face.',
    guide: ['Record Opie, c. 1797, oil, NPG 1237, Shelley bequest, and the separate reproduction-rights layer.', 'Follow education, cultivated dependency, reason, virtue, citizenship, class, and contested reception through the Vindication and scholarship.'],
    additionalSources: [source('Wollstonecraft, A Vindication of the Rights of Woman — Project Gutenberg', 'https://www.gutenberg.org/cache/epub/3420/pg3420.html', 'primary-text')],
  },
  'feminist-de-gouges-citizenship': {
    plaqueTitle: 'Projet de l’impôt patriotique donné par Madame de Gouges, 1788', plaqueType: 'work-or-text', articleTitle: 'Feminist Philosophy',
    invitation: 'Read a period allegorical print tied to de Gouges’s patriotic-tax proposal, then follow her 1791 demand for women’s citizenship without relying on a drawing whose supposed identification as her portrait has been withdrawn.',
    visualReading: 'The BnF catalogs C. Frussotte’s etching after Claude-Louis Desrais, published in 1788 and held in the Michel Hennin collection as Hennin 10181. It materializes public political print culture and is not a portrait or verified likeness.',
    claim: 'De Gouges’s Declaration of the Rights of Woman and the Female Citizen rewrites revolutionary rights language to demand women’s equality in law, office, property, opinion, representation, and public accountability. Its preamble, seventeen articles, and postamble supply primary evidence.',
    boundary: 'This replacement is necessary because Paris Musées now catalogs the former “presumed portrait” as La Philosophie after Prud’hon, c. 1798–1801, with the de Gouges title obsolete. The 1788 print supports political circulation, not her appearance or every later feminist attribution.',
    guide: ['Identify Frussotte, Desrais, 1788, BnF Hennin 10181, allegorical print, and complete absence of portrait evidence.', 'Read the 1791 declaration’s structure, revolutionary appropriation, citizenship claims, exclusions, and later canonization separately.'],
    resolution: 'removed the institutionally withdrawn de Gouges likeness, replaced it with BnF Hennin 10181, and separated political print evidence, the 1791 declaration, portrait attribution, and later reception.',
    additionalSources: [
      source('Assemblée nationale — Declaration of the Rights of Woman and the Female Citizen', 'https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/revolution-francaise/declaration-des-droits-de-la-femme-et-de-la-citoyenne', 'primary-text'),
      source('Paris Musées — La Philosophie, former identification withdrawn', 'https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/la-philosophie-d-apres-pierre-paul-prud-hon', 'collection-record'),
    ],
  },
  'feminist-bluestocking-intellectual-publics': {
    plaqueTitle: 'The Nine Living Muses, Print after Richard Samuel', plaqueType: 'reception-or-transmission-history', articleTitle: 'Feminist Philosophy',
    invitation: 'This derivative print turns selected women writers and artists into classical muses; ask how recognition made intellectual women visible while patronage, class, empire, and print circulation shaped entry into that public.',
    visualReading: 'Nine idealized women appear in an allegorical interior. The installed file is a print after Samuel rather than straightforwardly his NPG 4905 oil, and its exact printmaker, impression date, holding, accession, and digital provenance remain unverified.',
    claim: 'Bluestocking networks created consequential intellectual publics through conversation, correspondence, patronage, publication, and sociability. A celebratory print shows how reputation traveled while also selecting who could count as a visible learned woman.',
    boundary: 'Allegory is not a documentary gathering or transparent set of portraits. The “Nine Living Muses” print and Samuel’s differently titled painting must remain distinct, while working-class, Black, colonial, religious, and dissenting women excluded from elite recognition cannot be recovered from the composition.',
    guide: ['Separate the installed derivative print, popular title, unknown impression, and Samuel’s NPG 4905 oil.', 'Track allegory, selection, sociability, patronage, publication, class, empire, exclusion, and later feminist recovery.'],
    additionalSources: [
      source('National Portrait Gallery — Portraits in the Characters of the Muses', 'https://www.npg.org.uk/collections/search/portraitExtended/mw00328/Portraits-in-the-Characters-of-the-Muses-in-the-Temple-of-Apollo?displayNo=40&rNo=16&search=ap&subj=44%3BMaking+art', 'collection-record'),
      source('National Portrait Gallery — Celebrating modern muses', 'https://www.npg.org.uk/whatson/exhibitions/2008/brilliant-women/celebrating-modern-muses', 'academic-reference'),
    ],
  },
  'feminist-education-domesticity': {
    plaqueTitle: 'Domestic Science Instruction, Ohio State Normal College, 1913', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Feminist Philosophy',
    invitation: 'In this cooking classroom, education expands skill and credentials while sorting women toward domestic expertise; ask who designed curricula, whose labor was valued, and which futures educational institutions made imaginable.',
    visualReading: 'Frank R. Snyder’s photograph shows women at individual cooking stations in one Ohio State Normal College classroom. Miami University Libraries identifies Snyder collection item 4143 and says no known copyright restrictions, not a universal public-domain license.',
    claim: 'Education can enlarge intellectual and economic agency while curricula classify students and channel gendered labor. Feminist analysis therefore asks not only who enters an institution but who sets knowledge, credentials, resources, authority, and expected social roles.',
    boundary: 'The image cannot reveal students’ motives, later careers, classroom speech, pay, race, class, or whether they experienced domestic science as opportunity or control. Professionalization, household labor, care, coercion, and institutional access remain related but nonidentical histories.',
    guide: ['Identify Snyder, 1913, the specific classroom, Miami item 4143, and its no-known-restrictions statement.', 'Distinguish access, curriculum, credential, domestic expertise, professionalization, care labor, classification, and student agency.'],
  },
  'feminist-abolition-convention-exclusion': {
    plaqueTitle: 'The Anti-Slavery Society Convention, 1840', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Feminist Philosophy',
    invitation: 'Haydon’s commemorative painting records a convention where women attended yet were barred from participation; follow how reform coalitions can oppose domination while reproducing unequal representation within their own procedures.',
    visualReading: 'The National Portrait Gallery identifies Haydon’s 1841 oil as NPG 599, given by the British and Foreign Anti-Slavery Society in 1880. The commissioned composition centers speakers and groups women at one side rather than neutrally photographing an event.',
    claim: 'Women’s attendance and exclusion from delegate participation reveal linked histories of abolition and women’s rights. Coalition can expand political action while preserving unequal voice, agenda control, authority, and recognition inside movements committed to emancipation.',
    boundary: 'The painting cannot establish every sitter’s beliefs, speech, disagreement, or the complete convention. Its underlying work is public domain while the installed NPG-derived reproduction has source-specific terms; commemoration, event history, movement practice, and later feminist interpretation must remain distinct.',
    guide: ['Record Haydon, 1841, NPG 599, commission, 1880 gift, and the painting’s selective arrangement.', 'Compare attendance, delegate status, voice, coalition, abolition, women’s rights, internal hierarchy, and commemorative reception.'],
    additionalSources: [source('National Portrait Gallery — women’s exclusion at the convention', 'https://www.npg.org.uk/collections/interactives/pof-anti-slavery-society-convention', 'collection-record')],
  },
  'beauvoir-labor-and-immanence': {
    plaqueTitle: 'Unidentified Laundry Worker, c. 1880–1914', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Simone de Beauvoir',
    invitation: 'An unidentified laundry worker cannot illustrate Beauvoir directly; use the comparative photograph to test her contrast between future-opening projects and repetition while keeping paid work, housework, class, and agency distinct.',
    visualReading: 'The photograph shows a worker beside a large basin and piled linens. The Commons record supplies only an approximate 1880–1914 range; photographer, place, sitter, holding, accession, work arrangement, and source-specific rights record are not identified.',
    claim: 'Beauvoir analyzes immanence as confinement to repetitive maintenance and transcendence as projects that open possibilities, while insisting that freedom is situated. The distinction can expose gendered labor but does not classify every repeated task or worker in advance.',
    boundary: 'Paid laundry, unpaid household work, care, exploitation, skill, survival, and chosen routine are not interchangeable. The subject’s perspective cannot be recovered from Beauvoir’s categories, and the image supplies comparative labor history rather than evidence of The Second Sex or a universal female condition.',
    guide: ['State the sparse object record and describe visible work without inventing place, pay, biography, or feeling.', 'Compare immanence, transcendence, situation, paid labor, housework, class, maintenance, agency, and feminist criticism.'],
  },
  'beauvoir-situation-and-place': {
    plaqueTitle: 'Rue Bonaparte, Paris, 20 July 1914', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Simone de Beauvoir',
    invitation: 'This Paris street predates Beauvoir’s public career and shows no philosopher; use it to resist celebrity geography and ask how freedom begins amid inherited places, bodies, institutions, histories, and material constraints.',
    visualReading: 'Léon Auguste’s autochrome records pedestrians and shopfronts at rue Bonaparte’s intersection with rues Guillaume-Apollinaire and de l’Abbaye. The later Sartre–Beauvoir square name belongs to reception history, not the 1914 object title or depicted event.',
    claim: 'For Beauvoir, situation names facticity, embodiment, history, social relation, and material condition as the field in which freedom acts. It rejects both pure voluntarism and a deterministic claim that circumstances erase every project or responsibility.',
    boundary: 'A later commemorative place-name cannot establish Beauvoir’s biography, relationship to the intersection, or philosophy. Geography is one condition among institutions, bodies, resources, power, and temporal inheritance; a picturesque archival street must not turn situation into a tourist landmark.',
    guide: ['Identify Auguste, 20 July 1914, the exact intersection, and the later place-name as separate reception evidence.', 'Read facticity, freedom, embodiment, history, social constraint, project, and responsibility beyond celebrity geography.'],
  },
  'beauvoir-second-sex-movement': {
    plaqueTitle: 'International Women’s Day Demonstration, Petrograd, 8 March 1917', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Simone de Beauvoir',
    invitation: 'A Petrograd demonstration predates The Second Sex and does not cause it; use the scene to ask why emancipation requires collective transformation while keeping revolutionary movement history distinct from Beauvoir’s later analysis.',
    visualReading: 'An unknown photographer records a dense women’s demonstration in Petrograd on 8 March 1917 according to the Commons-mediated museum description. Direct collection provenance, accession, negative history, participant identities, and source-specific rights confirmation remain unavailable.',
    claim: 'Beauvoir’s account that woman is socially made analyzes institutions, myths, embodiment, labor, sexuality, and lived situation rather than voluntary self-invention. Collective action can transform conditions of becoming but has histories and concepts not derived from one later philosopher.',
    boundary: 'The photograph cannot identify speeches, motives, organizations, political differences, or later outcomes, and it is not causal prehistory for The Second Sex. Revolutionary feminism, socialism, liberal rights, labor politics, and Beauvoir’s reception should be compared without collapsing them.',
    guide: ['Use the source-described event and date while keeping provenance, rights, people, and demands qualified.', 'Distinguish social becoming, individual freedom, collective action, institutional change, movement history, and Beauvoir’s later reception.'],
  },
  'beauvoir-aging-and-otherness': {
    plaqueTitle: 'Unidentified Older Woman, c. 1900', plaqueType: 'other', articleTitle: 'Simone de Beauvoir',
    invitation: 'An unidentified woman’s studio portrait cannot reveal a life history; let it open Beauvoir’s question about how institutions and images make a universal human future appear as somebody else’s distant condition.',
    visualReading: 'Florida Memory dates the 8 × 5 inch Volusia County photoprint to about 1900 and identifies Connell collection CC564. The seated woman remains unnamed, and the repository states no known copyright restrictions rather than granting a license.',
    claim: 'Beauvoir treats old age as embodied change interpreted through economic, institutional, cultural, and interpersonal structures. Otherness is produced in social relations and images rather than being a natural moral property of an older body.',
    boundary: 'Formal pose, dress, age, and archive description cannot disclose health, wealth, work, family, consent, isolation, dignity, or self-understanding. The sitter is not representative of all aging, and Beauvoir’s analysis must be tested across gender, race, class, disability, care, and historical context.',
    guide: ['Record c. 1900, Florida Memory CC564, Volusia County, photoprint format, unknown sitter, and precise rights statement.', 'Distinguish biological aging, socially produced otherness, economic condition, care, disability, self-interpretation, and archival silence.'],
    resolution: 'corrected the date to c. 1900, added Florida Memory CC564 and material details, and bounded rights, biography, aging, and social-othering claims.',
  },
  'beauvoir-boupacha-colonial-violence': {
    plaqueTitle: 'Djamila Boupacha, 2017', plaqueType: 'reception-or-transmission-history', articleTitle: 'Simone de Beauvoir',
    invitation: 'Center Djamila Boupacha through a later licensed portrait while keeping it separate from her 1960 arrest, torture, testimony, trial, and release, then examine how advocacy can amplify a witness without taking over her history.',
    visualReading: 'BRAHIM DJELLOUL Mustapha’s creator-uploaded CC BY-SA 4.0 photograph identifies Boupacha in 2017. It replaces a 1963 Kaye/Daily Express/Hulton image that Getty marks rights-managed and cannot document the earlier case or campaign.',
    claim: 'The 1962 book Djamila Boupacha joined Gisèle Halimi’s legal advocacy, Beauvoir’s intervention, testimony, and international publicity within the Algerian War. The BnF record establishes the publication and coauthors, not every event or Boupacha’s consent to later representations.',
    boundary: 'The 2017 portrait cannot show torture, trial evidence, political affiliation, or the 1960–62 campaign, and Beauvoir must not become its protagonist. Centering testimony requires primary and scholarly case evidence while preserving Boupacha’s agency and the representational risks of metropolitan advocacy.',
    guide: ['Identify the 2017 maker, creator license, later lifetime portrait, and complete temporal separation from the case.', 'Distinguish Boupacha’s testimony and agency, Halimi’s legal work, Beauvoir’s advocacy, the 1962 book, colonial violence, and later reception.'],
    resolution: 'removed the rights-managed Getty/Hulton derivative, installed a creator-licensed 2017 portrait, and separated later likeness, the 1960–62 case, testimony, advocacy, and reception.',
    additionalSources: [
      source('BnF — Djamila Boupacha, Beauvoir and Halimi, 1962', 'https://catalogue.bnf.fr/ark:/12148/cb33037246z', 'collection-record'),
      source('BnF — Gisèle Halimi archive and Boupacha correspondence', 'https://www.bnf.fr/fr/actualites/hommage-gisele-halimi', 'collection-record'),
    ],
  },
  'butler-performativity-and-action': {
    plaqueTitle: 'ACT UP “Storm the NIH” Demonstration, 21 May 1990', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Judith Butler',
    invitation: 'ACT UP’s NIH action was not staged for Butler; follow its organized embodied demands to distinguish performativity from voluntary theatrical performance and to keep AIDS activism’s autonomous institutional history in view.',
    visualReading: 'The NIH History Office photograph shows ACT UP demonstrators and banners outside a federal health institution. Contemporary NIH and National Library of Medicine records date “Storm the NIH” to 21 May 1990, correcting the former 1999 label.',
    claim: 'Performativity names the reiterated, norm-governed production of intelligible identity and the possibility of contest within repetition, not free theatrical choice. Organized protest can expose norms and institutions, but its history and demands are evidence in their own right.',
    boundary: 'The exact image creator and capture metadata remain separately unverified, and the frame cannot establish every participant, slogan, tactic, or outcome. ACT UP’s AIDS activism cannot become an illustration of Butler, while a protest scene alone cannot explain Gender Trouble or Bodies That Matter.',
    guide: ['Use NIH/NLM chronology to correct the event to 21 May 1990 while retaining exact image-metadata uncertainty.', 'Separate performance, performativity, reiterated norm, agency, ACT UP strategy, AIDS policy, institutional contest, and later theory.'],
    resolution: 'corrected the event from 21 May 1999 to 21 May 1990, replaced the unstable NIH PDF target with the NLM institutional history, and retained uncertainty about the exact image creator and capture record.',
    additionalSources: [
      source('National Library of Medicine — Storm the NIH, 21 May 1990', 'https://www.nlm.nih.gov/exhibition/surviving-and-thriving/index.html', 'collection-record'),
      source('Routledge — Gender Trouble', 'https://www.routledge.com/Gender-Trouble/Butler/p/book/9780415389556', 'primary-text'),
    ],
  },
  'butler-trans-livability': {
    plaqueTitle: 'National Trans Visibility March, 28 September 2019', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Judith Butler',
    invitation: 'This United States march records contingent public action, not trans life as such; ask what recognition can enable and what material security, self-determination, care, housing, and safety visibility alone cannot deliver.',
    visualReading: 'Avery Jensen’s creator-licensed photograph shows marchers with trans-pride colors and signs at the Washington, D.C., event dated 28 September 2019 by its organizers. The file has no holding institution, while attendance and participant views require separate records.',
    claim: 'Butler’s work asks how recognition and gender norms condition livability, embodiment, and public appearance. Trans philosophy and activism have autonomous histories and disagreements, so recognition must be evaluated alongside material institutions rather than treated as Butler’s application.',
    boundary: 'One U.S. march cannot represent global trans lives, safety, health care, housing, policing, race, disability, class, or progress. Visibility can enable solidarity while increasing exposure to surveillance and violence; the photograph cannot decide that balance for those pictured.',
    guide: ['Identify Jensen, the 28 September 2019 Washington event, creator license, visible signs, and the absence of a holding institution.', 'Compare recognition, livability, self-determination, material support, visibility, surveillance, trans philosophy, activism, and internal difference.'],
    resolution: 'corrected the march from 29 to 28 September 2019 using the organizer’s event record and separated that event date from the image file’s incomplete capture metadata.',
  },
  'butler-disability-dependency': {
    plaqueTitle: 'Protest Against Inaccessible Buses, Manchester, 8 September 1991', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Judith Butler',
    invitation: 'The Manchester protest names an inaccessible bus as a political barrier; follow disability activists’ challenge to ideals of independence, then ask which infrastructures make agency possible and who controls assistance.',
    visualReading: 'CityTony’s later licensed upload shows disabled protesters beside a bus on Wilmslow Road. It records a source-described 1991 access action but supplies no direct local archive, organizer record, holding institution, or full account of demands and participants.',
    claim: 'Disability feminism challenges the treatment of dependence as private deficiency and locates agency in accessible environments, assistance, care, rights, and self-determination. Butler’s vulnerability and interdependence form one contested cross-field conversation rather than the protest’s origin.',
    boundary: 'Disability must not become a metaphor for generalized precarity or proof that autonomy is unreal. The image cannot establish each impairment, access need, organizational role, or outcome, and assistance remains politically accountable only when disabled people shape its terms.',
    guide: ['Describe the bus, Wilmslow Road, protest, 1991 date, later upload, and missing direct event archive.', 'Track access, barrier, disability justice, dependency, interdependence, assistance, agency, self-determination, and Butler’s comparative role.'],
  },
  'butler-coalition-and-contestation': {
    plaqueTitle: 'Equality March and Women’s Strike Contingent, Kraków, 2022', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Judith Butler',
    invitation: 'A Kraków march places rainbow and Women’s Strike symbols in shared space; ask how coalition coordinates action across difference while making power, risk, agenda, representation, and dissent discussable rather than presumed resolved.',
    visualReading: 'Tomasz Molina’s creator-licensed 21 May 2022 photograph shows rainbow flags and Women’s Strike symbols among marchers. Visible proximity establishes neither organizational membership nor agreement, equal risk, shared identity, agenda control, or coalition durability.',
    claim: 'Coalition can organize common action without requiring one identity or permanent consensus, while democratic contest keeps exclusions and unequal power open to challenge. Butler’s account of plurality and assembly helps pose questions that the Polish action must answer through its own history.',
    boundary: 'The image cannot substitute for Polish legal, religious, electoral, feminist, queer, or organizational evidence. Signs do not disclose speaker authority, internal conflict, policing, safety, or outcomes, and cross-movement alignment should not erase differences in vulnerability or strategic priority.',
    guide: ['Identify Molina, Kraków, 21 May 2022, visible symbols, creator license, and the strict limits of visual inference.', 'Compare coalition, plurality, common action, agenda power, contestation, dissent, unequal risk, local history, and institutional response.'],
  },
  'butler-assembly-precarity': {
    plaqueTitle: 'Women’s March in Ithaca, New York, 21 January 2017', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Judith Butler',
    invitation: 'See how one Ithaca march makes collective presence visible while obscuring internal difference, then ask which material supports let people appear, act, and persist publicly under unequally distributed precarity.',
    visualReading: 'Random Tree’s CC0 panorama records a large local march filling an Ithaca street. It establishes a date, place, and visible gathering but not organizer, attendance, shared demand, participant identity, political agreement, safety, or Butler’s influence.',
    claim: 'Butler treats assembly as embodied action whose meaning depends on streets, shelter, food, care, labor, transport, media, and freedom from violence. Precarity names unequally distributed exposure and support, not a condition that makes every assembled person equivalent.',
    boundary: 'A panoramic crowd can hide internal hierarchy, exclusion, disability access, policing, care work, surveillance, and those unable or unwilling to appear. Public presence is neither automatic consensus nor proof of emancipation, and one U.S. event cannot represent all assembly politics.',
    guide: ['Identify Ithaca, 21 January 2017, photographer, CC0 dedication, panorama, and the absence of motive evidence.', 'Track assembly, appearance, infrastructure, precarity, unequal exposure, support labor, access, surveillance, and internal difference.'],
    additionalSources: [source('Judith Butler — Notes Toward a Performative Theory of Assembly', 'https://doi.org/10.4159/9780674495548', 'primary-text')],
  },

  // Gallery 26
  'fanon-racializing-gaze': {
    plaqueTitle: 'Segregated Water Cooler, Oklahoma City, 1939', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Frantz Fanon',
    invitation: 'Examine a Jim Crow terminal where racial classification organized ordinary movement, then read Fanon on how a hostile social world imposes bodily meaning without making race a biological or personal destiny.',
    visualReading: 'Russell Lee’s July 1939 FSA/OWI photograph shows a Black man at a cooler marked for segregated use. The LOC identifies LC-USF33-012327-M5 and says no known restrictions; the installed file also carries a Commons restoration.',
    claim: 'Fanon’s sociogenic analysis explains how institutions, language, images, and encounters impose a racial schema on lived embodiment. The U.S. photograph offers comparative evidence of material classification but is not a scene from Martinique, France, Algeria, or Fanon’s text.',
    boundary: 'No known restrictions is not a categorical public-domain license, and the image cannot universalize Black experience or Fanon’s gender and sexuality claims. Jim Crow and French colonial orders must be compared historically rather than treated as identical instances of one gaze.',
    guide: ['Identify Lee, Oklahoma City, July 1939, LOC call number, visible sign, restoration, and precise rights advisory.', 'Distinguish sociogeny, epidermal racial schema, lived embodiment, U.S. segregation, French colonial histories, and limits in Fanon’s account.'],
  },
  'fanon-colonial-psychiatry': {
    plaqueTitle: 'Blida-Joinville Psychiatric Hospital, 1933', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Frantz Fanon',
    invitation: 'View the hospital Fanon entered two decades later, then ask how psychiatric care, institutional hierarchy, colonial violence, and cultural difference shaped his challenge to medicine that treated political injury as private defect.',
    visualReading: 'A source-described 1933 view shows Blida-Joinville’s administration pavilion and landscaped drive. The original photographer, negative, holding, and custody are unknown; Commons contributor amekinfo supplied the digital file rather than a verified 1933 authorship.',
    claim: 'Fanon’s 1953 appointment at Blida connected psychiatry, institutional practice, cultural context, and colonial violence. His clinical and political writings resist reducing suffering either to isolated pathology or to a slogan that ignores individual care.',
    boundary: 'The building predates Fanon and cannot identify his ward, patients, colleagues, reforms, treatment methods, or outcomes. Digital-file licensing does not resolve the original photograph’s provenance, and neither architecture nor theory can substitute for patient testimony and institutional records.',
    guide: ['Separate the source-described 1933 pavilion, unknown original maker and custody, digital contributor, and Fanon’s 1953 arrival.', 'Track institutional psychotherapy, colonial psychiatry, clinical care, political injury, cultural context, patient evidence, and outcome limits.'],
    resolution: 'removed the unsupported claim that Commons contributor amekinfo was the 1933 photographer and disclosed the unknown negative, custody, building use, and Fanon-specific limits.',
  },
  'fanon-algerian-revolution': {
    plaqueTitle: 'Woman Identified as an FLN Fighter', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Frantz Fanon',
    invitation: 'Meet an unidentified fighter attributed to the FLN, then trace Fanon’s political commitment across Martinique, France, Algeria, and Africa without converting either one woman or one theorist into the Algerian revolution itself.',
    visualReading: 'The photograph shows an unidentified woman outdoors whom its mediated source identifies as an FLN fighter. Photographer, date, place, operation, role, original custody, first publication, and rights evidence remain unverified beyond Echaab and Commons.',
    claim: 'Fanon joined the FLN after psychiatric work in Algeria and became a writer, editor, diplomat, and revolutionary intellectual. His commitment was political and transnational rather than reducible to birthplace, while Algerian agency cannot be absorbed into his biography.',
    boundary: 'The image supports only a source-attributed wartime portrait and cannot name the sitter, establish an action, or represent every woman in the struggle. Commons’ public-domain assertion remains qualified, and FLN history, internal conflict, civilians, gender, and postwar outcomes require independent evidence.',
    guide: ['Keep sitter, maker, date, place, action, custody, first publication, and rights explicitly unresolved.', 'Distinguish FLN history, Fanon’s political belonging, Algerian collective agency, gendered participation, transnational solidarity, and later reception.'],
  },
  'fanon-violence-decolonization': {
    plaqueTitle: 'Photograph Described as Algerian Refugees Sheltering in Caves, 1958', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Frantz Fanon',
    invitation: 'Encounter a fragmentary record of wartime displacement, then read Fanon’s contested account of colonial violence alongside trauma, coercion, unequal risk, and political agency that slogans about violence too easily conceal.',
    visualReading: 'Adults and children gather at a cave entrance in a cropped photograph whose filename describes Algerian refugees in 1958. Commons records only “before 1984,” an unknown photographer, and production by a Wikipedian in Residence at the National Archives of Tunisia; it supplies no archive identifier or original publication.',
    claim: 'The Wretched of the Earth analyzes colonial force, counterviolence, psychic injury, organization, and political transformation. The displacement image keeps civilian cost visible, but it cannot verify Fanon’s wording, a particular family’s experience, or a general judgment about revolutionary means.',
    boundary: 'Sartre’s forceful preface is reception text, not Fanon’s own argument, and clinical material complicates celebration of violence. Commons applies Tunisia’s expired-photograph term on a before-July-1984 basis, but the absent archive identifier and original publication leave date, custody, and rights provenance incomplete.',
    guide: ['Identify the filename’s 1958 description, Commons’ broader before-1984 date, recorded crop, unknown maker and place, absent archive identifier, and qualified Tunisian rights rationale.', 'Separate colonial force, counterviolence, civilian trauma, Fanon’s text, Sartre’s preface, political agency, organization, and later debate.'],
    resolution: 'disclosed the conflict between the filename’s 1958 description and Commons’ before-1984 date, the missing archive identifier and original publication, the derivative crop, and the qualified Tunisian public-domain rationale.',
  },
  'fanon-national-consciousness': {
    plaqueTitle: 'National Independence Day Decorations, Algiers, 2015', plaqueType: 'reception-or-transmission-history', articleTitle: 'Frantz Fanon',
    invitation: 'Look beyond the Algerian flags of a later commemoration, then read Fanon’s warning that independence requires popular participation, economic transformation, and contestable institutions rather than national symbols inherited by an elite.',
    visualReading: 'Emna Mizouni’s creator-licensed photograph shows Algerian flags decorating an Algiers building on 5 July 2015. It records a public commemoration fifty-three years after independence, not the 1962 event, political consensus, or Fanon’s predicted outcome.',
    claim: 'Fanon criticizes a postcolonial national bourgeoisie that may inherit intermediary power without transforming economy, participation, and institutions. National consciousness for him is active political practice and social reorganization rather than recovery of a pure cultural essence.',
    boundary: 'Flags cannot establish present policy, public opinion, class structure, democratic participation, or completed decolonization. A later celebration belongs to reception history, and Fanon’s warnings must be tested against specific histories rather than used as a timeless verdict on Algeria.',
    guide: ['Identify Mizouni, Algiers, 5 July 2015, creator license, commemorative decoration, and temporal distance from 1962.', 'Compare national consciousness, national bourgeoisie, popular participation, economic transformation, culture, commemoration, and historical outcomes.'],
  },
  'davis-prison-abolition': {
    plaqueTitle: 'Abolish All Prisons Protest, Belmarsh, 2022', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Angela Davis',
    invitation: 'Read a London protest as one abolitionist public rather than Angela Davis’s personal platform, then ask what social provision, survivor support, and democratic institutions would make carceral responses less necessary to collective safety.',
    visualReading: 'Alisdare Hickson’s creator-licensed photograph shows demonstrators outside Belmarsh Prison on 22 January 2022. It documents one British action and visible signs, not Davis’s authorship, U.S. abolition generally, participant consensus, organization, or every cause present.',
    claim: 'Davis treats prison abolition as constructive transformation of the social conditions and institutions that make cages appear necessary. Decarceration, education, housing, health, survivor support, economic justice, and democratic safety cannot be reduced to closing one building.',
    boundary: 'The image cannot decide which reforms shrink carceral capacity and which legitimate expansion, nor can it erase differences between British and U.S. systems. Abolition, public safety, accountability, gendered violence, race, disability, migration, and movement disagreement require independent evidence.',
    guide: ['Identify Hickson, Belmarsh, London, 22 January 2022, creator license, and the event’s non-Davis status.', 'Track prison-industrial complex, decarceration, abolition democracy, survivor support, non-reformist reform, public safety, and jurisdictional difference.'],
    additionalSources: [source('Angela Davis — Are Prisons Obsolete?', 'https://www.penguinrandomhouse.com/books/213837/are-prisons-obsolete-by-angela-y-davis/', 'primary-text')],
  },
  'davis-race-gender-class': {
    plaqueTitle: 'NCNW Gathering with British and American Labor Women, 1945', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Angela Davis',
    invitation: 'Study an organized wartime meeting where race, gender, and labor converge, then use Davis’s history to question whose work and freedom feminism foregrounds and whether coalition can survive unequal power.',
    visualReading: 'A U.S. Office of War Information photograph records an NCNW gathering with British war workers and American labor women on 21 April 1945, NARA 535812. It shows a meeting but not relationships, speech, disagreement, or political unity.',
    claim: 'Women, Race & Class reconstructs how enslavement, labor, abolition, suffrage, domestic work, racism, and class conflict shape feminist history. The earlier photograph offers contextual organization, not evidence that Davis influenced the event or that later analysis was already shared.',
    boundary: 'The event predates Davis’s book by thirty-six years, and visible proximity cannot prove equal authority or durable coalition. “Intersectionality” is useful comparative vocabulary but should not be retroactively credited to Davis instead of Crenshaw or used to erase differences among traditions.',
    guide: ['Identify the OWI context, 21 April 1945, NCNW gathering, NARA 535812, and limits on participant inference.', 'Compare race, gender, class, labor, abolition, suffrage, social reproduction, coalition, conflict, and later analytic vocabulary.'],
  },
  'hooks-margin-center': {
    plaqueTitle: 'Segregated Cinema Entrance, Belzoni, 1939', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'bell hooks',
    invitation: 'Notice how a segregated cinema entrance turns margin and center into built space, then follow hooks’s account of marginality as oppression and as a potentially critical location from which dominant culture can be contested.',
    visualReading: 'Marion Post Wolcott’s October 1939 photograph shows a Black patron climbing a separate exterior cinema entrance in Belzoni, Mississippi. The LOC says no known restrictions; the archival title’s period terminology remains confined to the source record.',
    claim: 'hooks analyzes margin and center as relations of power and develops the oppositional gaze as critical spectatorship under racial and gender domination. Marginality can become a site of resistance without being inherently empowering or a romantic identity.',
    boundary: 'The image predates hooks and is not her Kentucky life, writing, or every margin. It cannot disclose the patron’s viewing, thought, consent, destination, or resistance, and one Jim Crow arrangement cannot substitute for media, feminist, class, or global histories.',
    guide: ['Identify Wolcott, Belzoni, October 1939, the built segregation, LOC collection, and exact rights advisory.', 'Distinguish margin as oppression, marginality as possible critical location, oppositional gaze, spectatorship, agency, and romanticization.'],
  },
  'hooks-engaged-pedagogy-love': {
    plaqueTitle: 'Rural Black School, Creek County, 1940', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'bell hooks',
    invitation: 'See a classroom shaped by unequal access to books, then read hooks on engaged pedagogy, where critical learning joins voice, care, responsibility, and resistance without confusing any historical classroom with her method.',
    visualReading: 'Russell Lee’s February 1940 photograph shows a teacher and pupils reading closely in a rural Black school in Creek County, Oklahoma. The LOC notes unequal access to free books and says no known restrictions on publication.',
    claim: 'hooks’s engaged pedagogy joins critical participation, self-actualization, rigor, care, and responsibility while treating education as a possible practice of freedom. Love is an ethical practice tied to truth and justice rather than a substitute for power analysis.',
    boundary: 'The classroom predates hooks and cannot establish language, curriculum, pupil experience, teacher method, or later outcome. Resource inequality does not prove engaged pedagogy, and historical Black education must not become an inspirational backdrop for one philosopher’s vocabulary.',
    guide: ['Record Lee, Creek County, February 1940, the LOC resource note, visible reading, and precise rights advisory.', 'Track engaged pedagogy, voice, rigor, responsibility, care, love, access, institutional inequality, and students’ irreducible experience.'],
  },
  'cesaire-colonialism-thingification': {
    plaqueTitle: 'Plan of Fort Royal and Cul de Sac Royal, Martinico, 1760', plaqueType: 'object-manuscript-site-or-archaeological-context', articleTitle: 'Frantz Fanon',
    invitation: 'Read this military survey as an imperial ordering of Martinique, then place Césaire’s critique of colonial thingification beside Fanon without collapsing Négritude, Discourse on Colonialism, and Fanon’s distinct revolutionary project.',
    visualReading: 'The Library of Congress identifies De Caylus and Thomas Jefferys’s 1760 plan of Fort Royal and Cul de Sac Royal, call G5084.F6 1760 .C2. The former “Houl” and general-Martinique attribution was incorrect.',
    claim: 'Césaire’s Discourse on Colonialism indicts colonial violence, hypocrisy, dehumanization, and “thingification.” The military plan supplies primary evidence of survey representation and strategic ordering, not Césaire’s wording or the lived totality of Martinique.',
    boundary: 'The map predates Césaire by more than 150 years and cannot show population, enslavement, resistance, experience, or later political history. The canonical CTA leads comparatively to Fanon because no Césaire article exists; it must not imply authorship, ownership, or one undifferentiated school.',
    guide: ['Identify De Caylus, Jefferys, Fort Royal, harbor, 1760, LOC call number, and the corrected object scope.', 'Compare survey, colonial ordering, thingification, Négritude, Césaire, Fanon, textual difference, and the comparative CTA boundary.'],
    resolution: 'corrected the object from a general Martinique plan by Houl to De Caylus and Jefferys’s 1760 Fort Royal/Cul de Sac Royal survey, with LOC call number and comparative Césaire–Fanon boundary.',
    additionalSources: [source('NYU Press — Discourse on Colonialism', 'https://nyupress.org/9781583670248/discourse-on-colonialism/', 'primary-text')],
  },
  'dubois-color-line-colonial-world': {
    plaqueTitle: 'Pan-African Congress, Paris, 1919', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Angela Davis',
    invitation: 'Enter the 1919 Pan-African Congress as a contested international meeting, then follow Du Bois from the color line and double consciousness toward Reconstruction, empire, organized solidarity, and changing arguments about democracy.',
    visualReading: 'An unknown photographer records a formal session held in Paris on 19–22 February 1919 and reproduced in The Crisis in May. LOC identifies Du Bois and Blaise Diagne as organizers, but delegates’ views are not visible.',
    claim: 'Du Bois linked the color line, double consciousness, citizenship, labor, Reconstruction, empire, and Pan-African organization across a changing career. The congress provides institutional evidence of transnational politics rather than a complete picture of agreement or membership.',
    boundary: 'A formal group photograph cannot recover every participant, constituency, strategy, language, hierarchy, or dispute. The canonical CTA is a comparative Angela Davis route because no Du Bois article is installed here; it must not imply that Du Bois is merely her subtopic.',
    guide: ['Identify Paris, 19–22 February 1919, The Crisis reproduction, LOC context, and organizer evidence.', 'Distinguish color line, double consciousness, Pan-African organization, empire, changing strategy, congress disagreement, and comparative CTA ownership.'],
    additionalSources: [source('Stanford Encyclopedia of Philosophy — W. E. B. Du Bois', 'https://plato.stanford.edu/entries/dubois/', 'academic-reference')],
  },
  'said-orientalism-representation': {
    plaqueTitle: 'Women of Algiers in Their Apartment, 1833–34', plaqueType: 'reception-or-transmission-history', articleTitle: 'Frantz Fanon',
    invitation: 'Study Delacroix’s painted interior as a European representation with makers, viewers, and imperial conditions, then use Said’s Orientalism to ask how cultural expertise can classify others while claiming merely to describe them.',
    visualReading: 'MFAH identifies Delacroix’s 1833–34 oil as accession 2019.274 and records its 2018 rediscovery and 2019 acquisition. The painting depicts women and an attendant but provides no unmediated access to their lives, speech, consent, or self-understanding.',
    claim: 'Said analyzes Orientalism as an institutional field of scholarship, literature, art, administration, and authority that produces “the Orient” as an object of knowledge. One painting can be examined within that field but cannot stand for his whole archive or argument.',
    boundary: 'Neither “West” nor “East” is homogeneous, and representation is not simply false imagery opposed to pure presence. The canonical CTA leads comparatively to Fanon because no Said article is installed; it must disclose rather than erase the difference between their projects.',
    guide: ['Identify Delacroix, date, oil, MFAH 2019.274, rediscovery, acquisition, and limits on represented lives.', 'Track Orientalism, representation, institution, expertise, authority, worldliness, internal difference, and the comparative Said–Fanon route.'],
    additionalSources: [source('Vintage — Edward Said, Orientalism', 'https://www.penguinrandomhouse.com/books/159783/orientalism-by-edward-w-said/', 'primary-text')],
  },
  'spivak-subaltern-representation': {
    plaqueTitle: 'Map of the 1905 Partition of Bengal', plaqueType: 'reception-or-transmission-history', articleTitle: 'bell hooks',
    invitation: 'Use this modern reconstruction of a colonial boundary to ask with Spivak how administrative archives, translation, and representation can make subordinated people legible while preventing their speech from registering as agency.',
    visualReading: 'XrysD’s 2017 CC BY-SA reconstruction distinguishes Bengal from Eastern Bengal and Assam using cited historical survey and gazetteer data. It is not a colonial original, direct subaltern testimony, or independently accessioned institutional map.',
    claim: 'Spivak distinguishes political proxy from portrayal while asking how colonial and elite institutions structure whether subaltern speech can register as speech. Representation cannot be escaped by simply claiming to let an unmediated subject speak.',
    boundary: 'The map cannot represent “the subaltern,” sati, testimony, displacement, caste, gender, language, or political response. Its source-data chain needs further provenance, and the bell hooks CTA is comparative only rather than evidence that Spivak belongs to hooks’s project.',
    guide: ['Identify the 2017 reconstruction, creator license, historical-data claim, non-colonial status, and absent institutional accession.', 'Distinguish Vertretung and Darstellung, subalternity, speech, institutional listening, advocacy, cartographic authority, and the comparative CTA.'],
    additionalSources: [source('Columbia University Press — Can the Subaltern Speak?', 'https://cup.columbia.edu/book/can-the-subaltern-speak/9780231512855/', 'primary-text')],
  },
  'ngugi-language-decolonization': {
    plaqueTitle: 'Primary-School Class at Kikuyu Mission, Kenya', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Frantz Fanon',
    invitation: 'Consider a colonial mission classroom without guessing its language of instruction, then follow Ngũgĩ’s challenge to educational systems that rank languages, audiences, memory, and cultural authority through unequal institutions.',
    visualReading: 'An unknown photographer records a primary-school class at the Church of Scotland Kikuyu mission within a 1905–1940 archive coverage range, file GB 237 CSWC47/LS7/24. The University of Edinburgh holds the CSWC 47 fonds; the Foreign Mission Committee is the fonds creator, not an identified photographer.',
    claim: 'Decolonising the Mind connects language, education, literature, publishing, audience, memory, and imperial power. Ngũgĩ’s turn to Gikuyu and community theater challenges institutional rankings without reducing decolonization to linguistic purity or one personal choice.',
    boundary: 'The photograph is not Ngũgĩ’s school or Kamĩrĩĩthũ and cannot establish its instructional language or pupil experience. The Fanon CTA is comparative because no Ngũgĩ article is installed; their related challenges to colonial language must remain distinct projects.',
    guide: ['Identify the unknown photographer, mission-school archive frame, 1905–1940 coverage range, CSWC 47 repository, legacy USC digitization, unknown language and identities, and repository-contact rights status.', 'Track Gikuyu, English, education, publishing, audience, Kamĩrĩĩthũ, institutional power, multilingual practice, and the comparative Fanon route.'],
    resolution: 'corrected the photographer to unknown, separated the Foreign Mission Committee’s fonds authorship from image authorship, replaced dead legacy targets with the Edinburgh fonds and rights guidance, qualified the Commons public-domain rationale, and retyped the UCI feature as an institutional record.',
    additionalSources: [source('James Currey — Decolonising the Mind', 'https://boydellandbrewer.com/book/decolonising-the-mind-9780852555019/', 'primary-text')],
  },
  'wynter-humanism-coloniality': {
    plaqueTitle: 'British Illustration of the Morant Bay Rebellion, 1875', plaqueType: 'reception-or-transmission-history', articleTitle: 'Frantz Fanon',
    invitation: 'Read this British colonial image for its caption, viewpoint, and exclusions, then follow Wynter’s challenge to the supposedly universal figure of “Man” that ranks people through racial, economic, and historical descriptions.',
    visualReading: 'An unidentified illustrator’s print depicts the 1865 Morant Bay rebellion in Cassell’s Illustrated History of England, published 1875. The exact library copy, holding, accession, and reproduction chain are unresolved, and its hostile caption is part of the evidence.',
    claim: 'Wynter argues that a historically specific genre of the human overrepresents itself as universal, joining biological and symbolic orders in sociogenic world-making. Her use of Fanon is consequential but does not make her simply a later member of one school.',
    boundary: 'The colonial print cannot illustrate Wynter’s analysis, recover rebel testimony, or neutrally report the event. The Fanon CTA is comparative because no Wynter article is installed; primary scholarship supports their relation while leaving Wynter’s Caribbean, literary, scientific, and historical range distinct.',
    guide: ['Identify 1865 event versus 1875 publication, British viewpoint, hostile caption, unknown illustrator, and unresolved holding copy.', 'Track genre of the human, overrepresentation, sociogeny, coloniality, Morant Bay representation, Wynter’s distinct project, and the comparative Fanon route.'],
    additionalSources: [source('Sylvia Wynter — The Ceremony Found', 'https://doi.org/10.1215/01642472-8750064', 'primary-text')],
  },
};

const referenceUrls = {
  politicalLegitimacy: 'https://plato.stanford.edu/entries/legitimacy/',
  politicalAuthority: 'https://plato.stanford.edu/entries/authority/',
  politicalObligation: 'https://iep.utm.edu/poli-obl/',
  civilDisobedience: 'https://plato.stanford.edu/entries/civil-disobedience/',
  civilRightsHistory: 'https://www.loc.gov/collections/civil-rights-history-project/',
  arendtSep: 'https://plato.stanford.edu/entries/arendt/',
  arendtIep: 'https://iep.utm.edu/hannah-arendt/',
  humanCondition: 'https://press.uchicago.edu/ucp/books/book/chicago/H/bo29137972.html',
  eichmannBook: 'https://www.penguinrandomhouse.com/books/320983/eichmann-in-jerusalem-by-hannah-arendt/',
  eichmannUshmm: 'https://encyclopedia.ushmm.org/content/en/article/adolf-eichmann',
  eichmannArchive: 'https://catalog.archives.gov.il/en/chapter/the-eichmann-trial/',
  rawlsSep: 'https://plato.stanford.edu/entries/rawls/',
  rawlsIep: 'https://iep.utm.edu/rawls/',
  theoryOfJustice: 'https://www.hup.harvard.edu/books/9780674000780',
  originalPosition: 'https://plato.stanford.edu/entries/original-position/',
  nozickSep: 'https://plato.stanford.edu/entries/nozick-political/',
  nozickBook: 'https://www.basicbooks.com/titles/robert-nozick/anarchy-state-and-utopia/9780465097203/',
  libertarianism: 'https://plato.stanford.edu/entries/libertarianism/',
  distributiveJustice: 'https://plato.stanford.edu/entries/justice-distributive/',
  capabilityApproach: 'https://plato.stanford.edu/entries/capability-approach/',
  nussbaumIep: 'https://iep.utm.edu/martha-nussbaum/',
  frontiersOfJustice: 'https://www.hup.harvard.edu/books/9780674019171',
  disability: 'https://plato.stanford.edu/entries/disability/',
  adaArchive: 'https://www.archives.gov/research/americans-with-disabilities',
  developmentAsFreedom: 'https://www.penguinrandomhouse.com/books/163962/development-as-freedom-by-amartya-sen/',
  undp: 'https://hdr.undp.org/',
  habermasSep: 'https://plato.stanford.edu/entries/habermas/',
  habermasIep: 'https://iep.utm.edu/habermas/',
  criticalTheory: 'https://plato.stanford.edu/entries/critical-theory/',
  democracy: 'https://plato.stanford.edu/entries/democracy/',
  publicReason: 'https://plato.stanford.edu/entries/public-reason/',
  swissDirectDemocracy: 'https://www.ch.ch/en/votes-and-elections/referendum/',
  feministPhilosophy: 'https://plato.stanford.edu/entries/feminist-philosophy/',
  voiceFromSouth: 'https://docsouth.unc.edu/church/cooper/cooper.html',
  intersectionality: 'https://plato.stanford.edu/entries/feminism-intersectionality/',
  demarginalizing: 'https://chicagounbound.uchicago.edu/uclf/vol1989/iss1/8/',
  feministEpistemology: 'https://plato.stanford.edu/entries/feminism-epistemology/',
  situatedKnowledges: 'https://doi.org/10.2307/3178066',
  feministEthics: 'https://plato.stanford.edu/entries/feminism-ethics/',
  astellProposal: 'https://anthology.lib.virginia.edu/work/Astell/astell-serious-proposal',
  astellSep: 'https://plato.stanford.edu/entries/astell/',
  wollstonecraftSep: 'https://plato.stanford.edu/entries/wollstonecraft/',
  vindication: 'https://www.gutenberg.org/cache/epub/3420/pg3420.html',
  deGougesDeclaration: 'https://www.assemblee-nationale.fr/dyn/histoire-et-patrimoine/revolution-francaise/declaration-des-droits-de-la-femme-et-de-la-citoyenne',
  parisMusees: 'https://www.parismuseescollections.paris.fr/fr/musee-carnavalet/oeuvres/la-philosophie-d-apres-pierre-paul-prud-hon',
  npgMuses: 'https://www.npg.org.uk/collections/search/portraitExtended/mw00328/Portraits-in-the-Characters-of-the-Muses-in-the-Temple-of-Apollo?displayNo=40&rNo=16&search=ap&subj=44%3BMaking+art',
  npgModernMuses: 'https://www.npg.org.uk/whatson/exhibitions/2008/brilliant-women/celebrating-modern-muses',
  npgConventionExclusion: 'https://www.npg.org.uk/collections/interactives/pof-anti-slavery-society-convention',
  beauvoirSep: 'https://plato.stanford.edu/entries/beauvoir/',
  feministBody: 'https://plato.stanford.edu/entries/feminist-body/',
  boupachaBook: 'https://catalogue.bnf.fr/ark:/12148/cb33037246z',
  boupachaArchive: 'https://www.bnf.fr/fr/actualites/hommage-gisele-halimi',
  genderSep: 'https://plato.stanford.edu/entries/feminism-gender/',
  genderTrouble: 'https://www.routledge.com/Gender-Trouble/Butler/p/book/9780415389556',
  nlmStorm: 'https://www.nlm.nih.gov/exhibition/surviving-and-thriving/index.html',
  capitalPrideMarch: 'https://www.capitalpride.org/events/national-trans-visibility-march/',
  undoingGender: 'https://www.routledge.com/Undoing-Gender/Butler/p/book/9780415969239',
  feministDisability: 'https://plato.stanford.edu/entries/feminism-disability/',
  butlerAssembly: 'https://doi.org/10.4159/9780674495548',
  fanonSep: 'https://plato.stanford.edu/entries/frantz-fanon/',
  blackSkin: 'https://groveatlantic.com/book/black-skin-white-masks/',
  fanonArchive: 'https://imec-archives.com/archives/fonds/178FNN',
  fanonClinicalWritings: 'https://www.editionsladecouverte.fr/ecrits_sur_l_alienation_et_la_liberte-9782348037337',
  wretchedEarth: 'https://groveatlantic.com/book/the-wretched-of-the-earth/',
  prisonsObsolete: 'https://www.penguinrandomhouse.com/books/213837/are-prisons-obsolete-by-angela-y-davis/',
  womenRaceClass: 'https://www.penguinrandomhouse.com/books/36909/women-race-and-class-by-angela-y-davis/',
  hooksFeministTheory: 'https://www.routledge.com/Feminist-Theory/hooks/p/book/9781138821668',
  hooksTeaching: 'https://www.routledge.com/Teaching-to-Transgress/hooks/p/book/9780415908085',
  hooksLove: 'https://www.harpercollins.com/products/all-about-love-bell-hooks',
  colonialismSep: 'https://plato.stanford.edu/entries/colonialism/',
  cesaireDiscourse: 'https://nyupress.org/9781583670248/discourse-on-colonialism/',
  duboisSep: 'https://plato.stanford.edu/entries/dubois/',
  saidOrientalism: 'https://www.penguinrandomhouse.com/books/159783/orientalism-by-edward-w-said/',
  spivakSubaltern: 'https://cup.columbia.edu/book/can-the-subaltern-speak/9780231512855/',
  ngugiDecolonising: 'https://boydellandbrewer.com/book/decolonising-the-mind-9780852555019/',
  edinburghRights: 'https://library.ed.ac.uk/digitisation-services/cultural-heritage-digitisation-service/image-licensing',
  wynterOralHistory: 'https://historicalsociety.stanford.edu/sylvia-wynter',
  wynterCeremony: 'https://doi.org/10.1215/01642472-8750064',
  butlerAssemblyReview: 'https://ndpr.nd.edu/reviews/notes-toward-a-performative-theory-of-assembly/',
  davisPrisonScholarship: 'https://harvardlawreview.org/wp-content/uploads/2019/04/1568-1574_Online.pdf',
  davisRaceScholarship: 'https://plato.stanford.edu/entries/femapproach-continental/',
  hooksMarginScholarship: 'https://iep.utm.edu/fem-race/',
  hooksPedagogyScholarship: 'https://strathprints.strath.ac.uk/77445/',
  hooksLoveScholarship: 'https://academic.oup.com/bjsw/article/53/1/570/6633585',
  spivakScholarship: 'https://press-files.anu.edu.au/downloads/press/p15131/html/ch01.xhtml?page=3',
  ngugiInterview: 'https://www.humanities.uci.edu/news/power-language',
} as const;

type ReferenceKey = keyof typeof referenceUrls;
type ParagraphEvidencePlan = {
  opening?: readonly ReferenceKey[];
  claim: readonly ReferenceKey[];
  boundary: readonly ReferenceKey[];
};

const authoritativeSources: Partial<Record<string, readonly MuseumSupplementalInterpretationSource[]>> = {
  'arendt-eichmann-judgment': [source('Penguin Classics — Eichmann in Jerusalem', referenceUrls.eichmannBook, 'primary-text')],
  'rawls-theory-of-justice': [source('Harvard University Press — A Theory of Justice', referenceUrls.theoryOfJustice, 'primary-text')],
  'nozick-anarchy-state-utopia': [source('Basic Books — Anarchy, State, and Utopia', referenceUrls.nozickBook, 'primary-text')],
  'nozick-entitlement-rectification': [source('Basic Books — Anarchy, State, and Utopia', referenceUrls.nozickBook, 'primary-text')],
  'nussbaum-frontiers-justice': [source('Harvard University Press — Frontiers of Justice', referenceUrls.frontiersOfJustice, 'primary-text')],
  'amartya-sen-capability-development': [source('Vintage — Development as Freedom', referenceUrls.developmentAsFreedom, 'primary-text')],
  'feminist-astell-reason-education': [source('Stanford Encyclopedia of Philosophy — Mary Astell', referenceUrls.astellSep, 'academic-reference')],
  'butler-trans-livability': [
    source('Capital Pride Alliance — National Trans Visibility March, 28 September 2019', referenceUrls.capitalPrideMarch, 'collection-record'),
    source('Routledge — Undoing Gender', referenceUrls.undoingGender, 'primary-text'),
  ],
  'butler-disability-dependency': [source('Judith Butler — Notes Toward a Performative Theory of Assembly', referenceUrls.butlerAssembly, 'primary-text')],
  'butler-coalition-and-contestation': [source('Judith Butler — Notes Toward a Performative Theory of Assembly', referenceUrls.butlerAssembly, 'primary-text')],
  'butler-assembly-precarity': [source('Notre Dame Philosophical Reviews — Notes Toward a Performative Theory of Assembly', referenceUrls.butlerAssemblyReview, 'academic-reference')],
  'fanon-racializing-gaze': [source('Grove Atlantic — Black Skin, White Masks', referenceUrls.blackSkin, 'primary-text')],
  'fanon-colonial-psychiatry': [
    source('IMEC — Frantz Fanon archive, 178FNN', referenceUrls.fanonArchive, 'collection-record'),
    source('La Découverte — Écrits sur l’aliénation et la liberté', referenceUrls.fanonClinicalWritings, 'primary-text'),
  ],
  'fanon-algerian-revolution': [source('IMEC — Frantz Fanon archive, 178FNN', referenceUrls.fanonArchive, 'collection-record')],
  'fanon-violence-decolonization': [source('Grove Atlantic — The Wretched of the Earth', referenceUrls.wretchedEarth, 'primary-text')],
  'fanon-national-consciousness': [source('Grove Atlantic — The Wretched of the Earth', referenceUrls.wretchedEarth, 'primary-text')],
  'davis-prison-abolition': [source('Harvard Law Review — Prison Abolition and Grounded Justice', referenceUrls.davisPrisonScholarship, 'academic-reference')],
  'davis-race-gender-class': [
    source('Vintage — Women, Race & Class', referenceUrls.womenRaceClass, 'primary-text'),
    source('Stanford Encyclopedia of Philosophy — Continental Feminism', referenceUrls.davisRaceScholarship, 'academic-reference'),
  ],
  'hooks-margin-center': [
    source('Routledge — Feminist Theory: From Margin to Center', referenceUrls.hooksFeministTheory, 'primary-text'),
    source('Internet Encyclopedia of Philosophy — Feminist Perspectives on Class and Work', referenceUrls.hooksMarginScholarship, 'academic-reference'),
  ],
  'hooks-engaged-pedagogy-love': [
    source('Routledge — Teaching to Transgress', referenceUrls.hooksTeaching, 'primary-text'),
    source('William Morrow — All About Love', referenceUrls.hooksLove, 'primary-text'),
    source('Strathclyde repository — scholarship on hooks’s engaged pedagogy', referenceUrls.hooksPedagogyScholarship, 'academic-reference'),
    source('British Journal of Social Work — scholarship on hooks’s ethics of love', referenceUrls.hooksLoveScholarship, 'academic-reference'),
  ],
  'spivak-subaltern-representation': [source('Australian National University Press — scholarly analysis of “Can the Subaltern Speak?”', referenceUrls.spivakScholarship, 'academic-reference')],
  'ngugi-language-decolonization': [
    source('University of Edinburgh Library — image licensing and rights guidance', referenceUrls.edinburghRights, 'collection-record'),
    source('UC Irvine — Ngũgĩ wa Thiong’o interview on the power of language', referenceUrls.ngugiInterview, 'primary-interview'),
  ],
};

const bibliographicRecordUrls = new Set<string>([
  referenceUrls.humanCondition,
  referenceUrls.eichmannBook,
  referenceUrls.theoryOfJustice,
  referenceUrls.nozickBook,
  referenceUrls.frontiersOfJustice,
  referenceUrls.developmentAsFreedom,
  referenceUrls.situatedKnowledges,
  referenceUrls.genderTrouble,
  referenceUrls.undoingGender,
  referenceUrls.butlerAssembly,
  referenceUrls.blackSkin,
  referenceUrls.fanonClinicalWritings,
  referenceUrls.wretchedEarth,
  referenceUrls.prisonsObsolete,
  referenceUrls.womenRaceClass,
  referenceUrls.hooksFeministTheory,
  referenceUrls.hooksTeaching,
  referenceUrls.hooksLove,
  referenceUrls.cesaireDiscourse,
  referenceUrls.saidOrientalism,
  referenceUrls.spivakSubaltern,
  referenceUrls.ngugiDecolonising,
  referenceUrls.wynterCeremony,
]);

const sourceKindOverrides: Partial<Record<string, Readonly<Record<string, MuseumSupplementalInterpretationSource['kind']>>>> = {
  'ngugi-language-decolonization': {
    [referenceUrls.ngugiInterview]: 'primary-interview',
  },
  'wynter-humanism-coloniality': {
    [referenceUrls.wynterOralHistory]: 'primary-interview',
  },
};

const paragraphEvidence: Record<string, ParagraphEvidencePlan> = {
  'political-authority-legitimacy': {claim: ['politicalLegitimacy', 'politicalAuthority', 'politicalObligation'], boundary: ['politicalLegitimacy', 'politicalAuthority']},
  'public-action-civil-disobedience': {claim: ['civilDisobedience'], boundary: ['civilDisobedience', 'civilRightsHistory']},
  'arendt-human-condition': {claim: ['humanCondition', 'arendtSep'], boundary: ['arendtSep', 'arendtIep']},
  'arendt-eichmann-judgment': {claim: ['eichmannBook', 'arendtSep'], boundary: ['eichmannBook', 'eichmannUshmm', 'eichmannArchive']},
  'rawls-theory-of-justice': {claim: ['theoryOfJustice', 'rawlsSep'], boundary: ['theoryOfJustice', 'rawlsSep', 'rawlsIep']},
  'rawls-original-position': {claim: ['originalPosition', 'rawlsSep'], boundary: ['originalPosition', 'rawlsIep']},
  'nozick-anarchy-state-utopia': {claim: ['nozickBook', 'nozickSep'], boundary: ['nozickSep', 'libertarianism']},
  'nozick-entitlement-rectification': {claim: ['nozickBook', 'nozickSep'], boundary: ['nozickSep', 'distributiveJustice']},
  'nussbaum-capabilities-approach': {claim: ['capabilityApproach', 'nussbaumIep'], boundary: ['capabilityApproach', 'nussbaumIep']},
  'nussbaum-frontiers-justice': {claim: ['frontiersOfJustice', 'nussbaumIep'], boundary: ['frontiersOfJustice', 'disability']},
  'amartya-sen-capability-development': {claim: ['developmentAsFreedom', 'capabilityApproach'], boundary: ['capabilityApproach', 'undp']},
  'habermas-public-sphere': {claim: ['habermasSep', 'habermasIep'], boundary: ['habermasSep', 'criticalTheory']},
  'democratic-deliberation-assembly': {claim: ['democracy', 'publicReason'], boundary: ['democracy', 'swissDirectDemocracy']},
  'feminist-cooper-voice-education': {claim: ['voiceFromSouth', 'feministPhilosophy'], boundary: ['voiceFromSouth', 'feministPhilosophy']},
  'feminist-truth-abolition-rights': {claim: ['feministPhilosophy'], boundary: ['feministPhilosophy']},
  'feminist-crenshaw-intersectionality': {claim: ['intersectionality', 'demarginalizing'], boundary: ['intersectionality', 'demarginalizing']},
  'feminist-standpoint-situated-objectivity': {claim: ['feministEpistemology', 'situatedKnowledges'], boundary: ['feministEpistemology', 'situatedKnowledges']},
  'feminist-care-dependency-labor': {claim: ['feministEthics'], boundary: ['feministEthics']},
  'feminist-astell-reason-education': {claim: ['astellProposal', 'astellSep'], boundary: ['astellProposal', 'astellSep']},
  'feminist-wollstonecraft-manufactured-inequality': {claim: ['wollstonecraftSep', 'vindication'], boundary: ['wollstonecraftSep', 'vindication']},
  'feminist-de-gouges-citizenship': {claim: ['deGougesDeclaration'], boundary: ['deGougesDeclaration', 'parisMusees']},
  'feminist-bluestocking-intellectual-publics': {claim: ['npgMuses', 'npgModernMuses'], boundary: ['npgMuses', 'npgModernMuses']},
  'feminist-education-domesticity': {claim: ['feministEthics'], boundary: ['feministEthics']},
  'feminist-abolition-convention-exclusion': {claim: ['npgConventionExclusion', 'feministPhilosophy'], boundary: ['npgConventionExclusion', 'feministPhilosophy']},
  'beauvoir-labor-and-immanence': {claim: ['beauvoirSep'], boundary: ['beauvoirSep']},
  'beauvoir-situation-and-place': {claim: ['beauvoirSep'], boundary: ['beauvoirSep']},
  'beauvoir-second-sex-movement': {claim: ['feministBody'], boundary: ['feministBody']},
  'beauvoir-aging-and-otherness': {claim: ['beauvoirSep'], boundary: ['beauvoirSep']},
  'beauvoir-boupacha-colonial-violence': {claim: ['boupachaBook', 'boupachaArchive', 'beauvoirSep'], boundary: ['boupachaBook', 'boupachaArchive', 'beauvoirSep']},
  'butler-performativity-and-action': {claim: ['genderTrouble', 'genderSep'], boundary: ['genderTrouble', 'genderSep', 'nlmStorm']},
  'butler-trans-livability': {opening: ['capitalPrideMarch'], claim: ['undoingGender', 'genderSep'], boundary: ['capitalPrideMarch', 'undoingGender', 'genderSep']},
  'butler-disability-dependency': {claim: ['feministDisability', 'butlerAssembly'], boundary: ['feministDisability', 'butlerAssembly']},
  'butler-coalition-and-contestation': {claim: ['butlerAssembly', 'genderSep'], boundary: ['butlerAssembly', 'genderSep']},
  'butler-assembly-precarity': {claim: ['butlerAssembly', 'butlerAssemblyReview'], boundary: ['butlerAssemblyReview']},
  'fanon-racializing-gaze': {claim: ['blackSkin', 'fanonSep'], boundary: ['blackSkin', 'fanonSep']},
  'fanon-colonial-psychiatry': {claim: ['fanonClinicalWritings', 'fanonSep'], boundary: ['fanonArchive', 'fanonSep']},
  'fanon-algerian-revolution': {claim: ['fanonSep', 'fanonArchive'], boundary: ['fanonSep', 'fanonArchive']},
  'fanon-violence-decolonization': {claim: ['wretchedEarth', 'fanonSep'], boundary: ['wretchedEarth', 'fanonSep']},
  'fanon-national-consciousness': {claim: ['wretchedEarth', 'fanonSep'], boundary: ['wretchedEarth', 'fanonSep']},
  'davis-prison-abolition': {claim: ['prisonsObsolete', 'davisPrisonScholarship'], boundary: ['davisPrisonScholarship']},
  'davis-race-gender-class': {claim: ['womenRaceClass', 'davisRaceScholarship'], boundary: ['davisRaceScholarship']},
  'hooks-margin-center': {claim: ['hooksFeministTheory', 'hooksMarginScholarship'], boundary: ['hooksMarginScholarship']},
  'hooks-engaged-pedagogy-love': {claim: ['hooksTeaching', 'hooksLove', 'hooksPedagogyScholarship', 'hooksLoveScholarship'], boundary: ['hooksPedagogyScholarship', 'hooksLoveScholarship']},
  'cesaire-colonialism-thingification': {claim: ['cesaireDiscourse', 'colonialismSep'], boundary: ['cesaireDiscourse', 'colonialismSep']},
  'dubois-color-line-colonial-world': {claim: ['duboisSep'], boundary: ['duboisSep']},
  'said-orientalism-representation': {claim: ['saidOrientalism', 'colonialismSep'], boundary: ['saidOrientalism', 'colonialismSep']},
  'spivak-subaltern-representation': {claim: ['spivakSubaltern', 'spivakScholarship', 'colonialismSep'], boundary: ['spivakScholarship', 'colonialismSep']},
  'ngugi-language-decolonization': {opening: ['edinburghRights'], claim: ['ngugiDecolonising', 'ngugiInterview'], boundary: ['ngugiInterview', 'edinburghRights']},
  'wynter-humanism-coloniality': {claim: ['wynterCeremony', 'wynterOralHistory'], boundary: ['wynterCeremony', 'wynterOralHistory']},
};

const objectLedDevelopments: Record<string, string> = {
  'political-authority-legitimacy': 'The return arrow from institutions to a deliberating public makes contest and revision visible instead of depicting authorization as a one-time transfer. That visual choice is the Museum’s interpretation; the legitimacy, authority, and obligation references supply the arguments against which the circuit must be tested.',
  'public-action-civil-disobedience': 'Scherman’s tightly grouped leaders make coordination and public visibility legible while cropping away most of the coalition that made the march possible. The photograph documents a march, but only evidence about law, purpose, conduct, and response can determine whether a particular action also counts as civil disobedience.',
  'arendt-human-condition': 'The triptych moves from replenishing life, through fabricated things, to people appearing before one another, giving Arendt’s temporal distinctions a visual rhythm. Equal framing keeps any panel from becoming a verdict on human worth, while the text and specialist references—not the collage—carry the philosophical classification.',
  'arendt-eichmann-judgment': 'The glass booth gives bureaucratic distance and courtroom containment a powerful material form, yet neither Eichmann’s posture nor his expression diagnoses thoughtlessness, ideology, or responsibility. Arendt’s report, the trial archive, Holocaust history, and later criticism remain different bodies of evidence around the same charged image.',
  'rawls-theory-of-justice': 'The closed green cover makes the gap between a material publication and its abstract argument unusually clear: it establishes that a titled book circulated, not what its principles mean. Reading the primary text alongside specialist accounts is therefore necessary before the edition photograph can anchor intellectual history.',
  'rawls-original-position': 'The translucent veil separates the pictured parties from the branching outcomes, making informational restriction easier to inspect. It cannot show which facts Rawls withholds or retains, so the composition functions as a question about fair choice while the textual sources define the device.',
  'nozick-anarchy-state-utopia': 'Because the portrait predates Nozick’s book, Chamberlain appears first as a historical person rather than as a prop inside a thought experiment. The later transfer example borrows his name and earning power; the photograph supplies neither the imagined payments nor the entitlement assumptions on which Nozick’s conclusion depends.',
  'nozick-entitlement-rectification': 'Broken chains interrupt the diagram’s smooth sequence of acquisition and transfer, preventing present possession from looking self-validating. That interruption keeps rectification visible, but the arrows cannot identify victims, reconstruct title, choose a remedy, or complete the principle that Nozick left underdeveloped.',
  'nussbaum-capabilities-approach': 'Ten illuminated openings suggest plurality and genuine possibility instead of one staircase toward a single good life. Yet an open-looking portal is not evidence that a person can cross it, and its glow cannot reveal the social support required to reach it. The number is a curatorial reference rather than a substitute for Nussbaum’s formulations, revisions, and threshold arguments.',
  'nussbaum-frontiers-justice': 'The signing table records a legal threshold crossed in one jurisdiction, while the advocates around it keep disability politics from appearing as a gift made by a lone officeholder. Juxtaposing that event with Nussbaum tests contract assumptions; it does not turn the ADA into an enactment of her later theory.',
  'amartya-sen-capability-development': 'The book-release setting identifies Sen within a public culture of argument, but the visible title is The Argumentative Indian rather than Development as Freedom. His portrait can orient the visitor to a thinker; the capability and development sources must establish why freedom, conversion, and public reasoning belong together.',
  'habermas-public-sphere': 'A microphone, table, and interlocutor show that public speech depends on material access, staging, and an audience, even before anyone evaluates an argument. They do not establish equal standing or undistorted communication, making the event photograph a prompt to examine the exclusions that public-sphere theory must confront.',
  'democratic-deliberation-assembly': 'The elevated view makes the Landsgemeinde’s scale and open-air voting form visible while compressing participants into an apparently unified circle. Rules of membership, agenda control, reasons offered, exclusions, and outcomes sit outside the frame, so assembly remains historical evidence rather than a picture of an ideal deliberative procedure.',
  'feminist-cooper-voice-education': 'The M Street façade anchors Cooper’s thought in a specific educational institution where she taught, but brickwork cannot disclose curriculum, classroom authority, or pupils’ experiences. Her own text supplies the argument that education, voice, and institutional access reshape who can enter public reasoning.',
  'feminist-truth-abolition-rights': 'Truth’s carefully staged carte-de-visite joins self-presentation to a copyright inscription and a commercial form she used to support her work. Those material choices document agency in representation; they do not reproduce a speech, resolve disputed transcripts, or make one portrait contain abolition and women’s-rights history.',
  'feminist-crenshaw-intersectionality': 'The microphone places Crenshaw in a later scene of public scholarship, whereas the 1989 legal article identifies the doctrinal failure her concept addressed. Visibility and audibility help pose a question about institutional listening, but the photograph cannot supply intersectionality’s legal argument or delimit its later uses.',
  'feminist-standpoint-situated-objectivity': 'Desks, calculating equipment, and grouped workers make the division of technical labor visible while leaving the distribution of credit largely off camera. NASA’s record can name the department, functions, and several people; standpoint theory asks a further question about how such institutional positions shape inquiry and authority.',
  'feminist-care-dependency-labor': 'Holding an infant while working over laundry brings simultaneous bodily care and domestic production into one frame. The scene makes divided time and material dependence hard to ignore, but it cannot identify consent, household relations, compensation, or a universal experience of care; feminist ethics supplies the analytic vocabulary.',
  'feminist-astell-reason-education': 'The frontispiece offers a period allegory of learned womanhood rather than Mary Astell’s face. Its books and composed figure show an available visual ideal, while Astell’s proposal turns women’s rational capacity and denied education into an argument whose substance must be read in her text.',
  'feminist-wollstonecraft-manufactured-inequality': 'Opie’s lifetime portrait establishes Wollstonecraft as a historical author and records a later museum-held likeness, not the social process she criticized. Her written argument—not expression, dress, or pose—supports the claim that unequal formation can manufacture the traits then invoked to justify subordination.',
  'feminist-de-gouges-citizenship': 'The patriotic-tax print records de Gouges intervening in fiscal and public debate before the better-known declaration. It gives material evidence of authorship and print circulation, while her declaration supplies the explicit challenge to a citizenship language that universalized rights through a male political subject.',
  'feminist-bluestocking-intellectual-publics': 'Arranging nine women as muses constructs a public genealogy of female intellect, even though the National Portrait Gallery warns that several likenesses are conventional or invented. The print therefore documents celebratory reception and intended identity more securely than an actual salon network or direct line of influence.',
  'feminist-education-domesticity': 'Rows of workstations turn cooking into a formal curriculum, making the institutional organization of domestic skill visible. The photograph cannot decide whether students experienced that training as opportunity, discipline, professional preparation, or gendered sorting, so feminist ethics must frame rather than be inferred from the room.',
  'feminist-abolition-convention-exclusion': 'Haydon’s arrangement places women in the gallery above the principal floor, a compositional choice tied by the National Portrait Gallery to their contested participation. Because the painting is a later construction of the convention, it records reception as well as exclusion and cannot serve as a transparent eyewitness view.',
  'beauvoir-labor-and-immanence': 'The worker’s bent posture and repetitive task give maintenance labor a bodily weight that an abstract opposition between immanence and transcendence can hide. The photograph neither diagnoses her freedom nor turns her into Beauvoir’s example; the juxtaposition asks how material conditions constrain projects without erasing agency.',
  'beauvoir-situation-and-place': 'The Paris streetscape is a later site of commemoration associated with Beauvoir and Sartre, not a picture of existential “situation.” Its named place reveals how intellectual memory attaches philosophy to urban geography, while Beauvoir’s text must establish how embodied freedom takes shape within conditions not freely chosen.',
  'beauvoir-second-sex-movement': 'The Petrograd demonstrators precede The Second Sex by decades and preserve collective action outside Beauvoir’s authorship. Their movement keeps feminist history from becoming one philosopher’s intellectual biography, while the body reference supports the separate analysis of how social meanings are attached to sexed embodiment.',
  'beauvoir-aging-and-otherness': 'An unidentified older woman meets the viewer without becoming an illustration of a universal aging experience. The absence of a name makes archival othering palpable, yet face, dress, and posture cannot disclose interior life; Beauvoir’s analysis addresses the social relations that make age into a diminished status.',
  'beauvoir-boupacha-colonial-violence': 'The post-release portrait restores Boupacha’s visible presence in a record often organized around famous advocates. Her expression cannot stand in for testimony, torture, legal strategy, or political commitment, so the BnF book and archive records carry the campaign history while the photograph resists her disappearance.',
  'butler-performativity-and-action': 'Banners and bodies confronting NIH document an autonomous AIDS-activist action with its own demands and risks. Repetition, citation, and resignification provide a curatorial way to ask how collective acts become legible; Gender Trouble supplies that theory, and the NLM record supplies the event history.',
  'butler-trans-livability': 'Trans-pride colors and hand-held signs show a chosen public strategy on one documented day, not a measure of safety or material freedom. The organizer’s event record fixes the date and setting, while Undoing Gender supports the separate argument about recognition, self-determination, and conditions under which a life becomes livable.',
  'butler-disability-dependency': 'Wheelchairs positioned beside an inaccessible bus make infrastructure, rather than an individual body, the immediate political obstacle. The scene belongs to disability-rights history and must not become a metaphor for generalized vulnerability; disability scholarship and Butler’s assembly work support the later comparison about dependency and public space.',
  'butler-coalition-and-contestation': 'Overlapping banners in the Kraków march show groups sharing a route without revealing unanimity, stable membership, or one hierarchy of demands. The contingent alliance makes coalition visible as work, while Butler’s account of assembly helps explain why acting together need not require a closed identity in advance.',
  'butler-assembly-precarity': 'The panorama makes mass occupation and bodily persistence legible while rendering most individual motives unreadable. That tension matters: scale can enact a public claim without proving a single popular will, and Butler’s text—not the crowd’s visual unity—supports the account of infrastructure, exposure, and performative assembly.',
  'fanon-racializing-gaze': 'The labeled water cooler shows racial classification enforced through an ordinary fixture and a segregated terminal, making domination environmental rather than merely attitudinal. This United States record is not Fanon’s colonial scene; Black Skin, White Masks supports the comparative account of a social gaze imposed on embodied life.',
  'fanon-colonial-psychiatry': 'The Blida-Joinville façade locates a colonial institution but cannot show wards, patients, therapies, staff relations, or Fanon’s reforms. Its administrative exterior is useful precisely because it withholds clinical life, which must be reconstructed from Fanon’s writings, specialist interpretation, and the surviving archive.',
  'fanon-algerian-revolution': 'One unnamed woman interrupts a male-centered visual history of the FLN while her missing provenance prevents the Museum from assigning a role or operation. The photograph documents a mediated attribution; Fanon’s archive and scholarship separately support his political commitments and the wider revolutionary context.',
  'fanon-violence-decolonization': 'The crop concentrates attention on civilians at a cave entrance while concealing the larger page, location, and circumstances beyond its edges. That fragment keeps displacement and unequal risk beside the debate, but The Wretched of the Earth—not the photograph—supports Fanon’s analysis of force, counterviolence, organization, and trauma.',
  'fanon-national-consciousness': 'The 2015 flags are later commemoration, not evidence from the war of independence or the first postcolonial government. Their national symbolism makes Fanon’s warnings newly askable, while the primary text must establish his distinctions among liberation, political education, national culture, and elite capture.',
  'davis-prison-abolition': 'The banner outside Belmarsh records a public demand to abolish prisons, but it does not specify transition, survivor support, safety, or alternative institutions. Davis’s book supplies the constructive historical argument; the protest photograph documents a later movement scene whose program cannot be read from one slogan.',
  'davis-race-gender-class': 'The official 1945 group photograph stages Black women, British war workers, and American labor women as a wartime coalition. Formal arrangement cannot prove agreement or equal power, so Women, Race & Class supplies the historical method for examining how labor, racism, and gender complicate political alliance.',
  'hooks-margin-center': 'The separate cinema entrance makes a racialized margin architectural and compulsory, yet hooks’s “margin” is not exhausted by physical distance from a doorway. The Jim Crow photograph documents one structure of exclusion; Feminist Theory supports her reconstruction of movement from positions dominant feminism had treated as peripheral.',
  'hooks-engaged-pedagogy-love': 'Teacher and pupils reading together make education’s bodily arrangement and material resources visible, but the 1940 classroom cannot attest dialogue, voice, care, or method. Teaching to Transgress and All About Love carry hooks’s arguments, while Lee’s photograph preserves a distinct history of rural schooling.',
  'cesaire-colonialism-thingification': 'Fortifications, streets, and harbor geometry make the survey’s strategic imperial viewpoint visible. The plan is primary evidence of spatial ordering rather than a total portrait of colonial life, and Césaire’s text—not the map’s lines—supports the claim that colonial domination reduces persons and relations to usable things.',
  'dubois-color-line-colonial-world': 'The formal congress scene documents an organized Pan-African public and named conveners while suppressing most speeches, disagreements, and constituencies outside the frame. It makes transnational institution-building visible; Du Bois scholarship supplies the changing arguments that joined the color line to labor, empire, and democracy.',
  'said-orientalism-representation': 'Delacroix’s carefully composed interior is a European representation produced within imperial conditions, not testimony from the women depicted. Its beauty and detail sharpen the question of how authority attaches to seeing, while Orientalism supports the broader analysis of scholarship, art, administration, and institutional knowledge.',
  'spivak-subaltern-representation': 'The modern map turns a colonial partition into legible colored territory, showing how boundaries can appear settled after the fact. Because it is neither a 1905 administrative original nor subaltern testimony, Spivak’s text must support the argument about proxy, portrayal, and the institutions that determine whether speech registers.',
  'ngugi-language-decolonization': 'Crowded desks, books, and a mission classroom make colonial schooling materially visible without revealing what language anyone spoke or how pupils experienced the lesson. The archive and repository rights guidance establish the lantern slide’s limited provenance; Decolonising the Mind separately supports Ngũgĩ’s argument about language, education, memory, and audience.',
  'wynter-humanism-coloniality': 'The illustrator and hostile caption frame Morant Bay through a British colonial narrative, making viewpoint part of the surviving evidence. The print cannot neutrally reconstruct the rebellion or visualize Wynter’s theory; her writing and oral history support the separate analysis of how one genre of the human becomes universalized.',
};

const reviewMethod = 'Independent supplemental remediation: exactly three concurrent GPT-5.6 Terra/High read-only scopes examined all 49 Gallery 24–26 records, isolated Gallery 04/16/21/22 findings, and replacement evidence plus generated-asset lineage. The Sol parent reconciled every judgment and edit, separated object, reproduction, bibliographic, primary, interview, scholarly, reception, and interpretive evidence, and retained accurate object-specific guidance while repairing only demonstrated source-role and claim-mapping failures.';

const visualReview = (id: string): NonNullable<NonNullable<MuseumSupplementalExhibit['review']>['visualReview']> => {
  const directReviewedOn = id === 'spivak-subaltern-representation' ? '2026-08-22' : '2026-08-21';
  return {
    desktop: {reviewedOn: directReviewedOn, viewport: '1440×900', evidence: `Direct route inspected with the full aspect-safe object preview, three untitled sourced paragraphs, subject-specific evidence guide, factual plaque relationship, exact article action, and no horizontal overflow. Evidence: docs/visual-validation/gallery-24-26-supplementals/desktop/${id}.png`},
    mobile: {reviewedOn: directReviewedOn, viewport: '390×844', evidence: `Direct route inspected with a wrapped factual title, aspect-safe object preview, scrollable interpretation, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-24-26-supplementals/mobile/${id}.png`},
    threeDimensional: {reviewedOn: '2026-08-21', viewport: '1280×720 retained staged-3D evidence', evidence: `The prior direct-route capture remains applicable because this remediation changed editorial evidence and provenance without changing geometry or interaction handlers. It records target activation, close/resume, the intended proximity card, and exact routed-target reopening. Evidence: docs/visual-validation/gallery-24-26-supplementals/staged-3d/${id}.png`},
  };
};

const canonicalContext = (input: MuseumSupplementalExhibit): MuseumCanonicalContextRef => {
  if (input.articleRoute?.kind === 'philosopher') return {kind: 'philosopher', id: input.articleRoute.philosopherId};
  if (input.articleRoute?.kind === 'branch') return {kind: 'branch', id: input.articleRoute.branchId};
  throw new Error(`Gallery 24–26 supplemental exhibit ${input.id} lacks a canonical article route.`);
};

const uniqueSourceIds = (ids: readonly string[]): string[] => [...new Set(ids)];

const reviewSupplementalExhibit = (galleryNumber: 24 | 25 | 26, input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery ${galleryNumber} review evidence for ${input.id}.`);
  const evidencePlan = paragraphEvidence[input.id];
  if (!evidencePlan) throw new Error(`Missing Gallery ${galleryNumber} paragraph evidence plan for ${input.id}.`);
  const objectLedDevelopment = objectLedDevelopments[input.id];
  if (!objectLedDevelopment) throw new Error(`Missing Gallery ${galleryNumber} object-led development for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery ${galleryNumber} presentation for ${input.id}.`);
  const asset = getMuseumAsset(input.assetId);
  const objectSources: MuseumSupplementalInterpretationSource[] = [
    {id: 'object', label: `${asset.title} — installed source record`, url: asset.sourcePageUrl, kind: 'collection-record'},
    ...(asset.objectPageUrl && asset.objectPageUrl !== asset.sourcePageUrl
      ? [{id: 'holding', label: `${asset.institution} — object or institutional record`, url: asset.objectPageUrl, kind: 'collection-record'} as const]
      : []),
  ];
  const objectSourceUrls = new Set(objectSources.map(({url}) => url));
  const kindOverrides: Readonly<Record<string, MuseumSupplementalInterpretationSource['kind']>> = sourceKindOverrides[input.id] ?? {};
  const supplementary = [...input.sources, ...(reviewed.additionalSources ?? []), ...(authoritativeSources[input.id] ?? [])]
    .filter(({url}, index, items) => !objectSourceUrls.has(url) && items.findIndex((item) => item.url === url) === index)
    .map((item) => ({
      ...item,
      kind: kindOverrides[item.url] ?? (bibliographicRecordUrls.has(item.url) ? 'bibliographic-record' : item.kind),
    }));
  const claimSources: MuseumSupplementalInterpretationSource[] = supplementary.map((item, index) => ({...item, id: `claim-${index + 1}`}));
  const sources = [...objectSources, ...claimSources];
  const objectIds = objectSources.flatMap((item) => item.id ? [item.id] : []);
  const visualObjectIds = objectSources.flatMap((item) => item.id === 'object' ? [item.id] : []);
  const resolveReferenceIds = (keys: readonly ReferenceKey[]): string[] => keys.map((key) => {
    const url = referenceUrls[key];
    const matched = sources.find((item) => item.url === url);
    if (!matched?.id) throw new Error(`Gallery ${galleryNumber} supplemental exhibit ${input.id} cannot resolve ${key} (${url}).`);
    return matched.id;
  });
  const paragraphSourceIds = [
    uniqueSourceIds([...objectIds, ...resolveReferenceIds(evidencePlan.opening ?? [])]),
    uniqueSourceIds([...visualObjectIds, ...resolveReferenceIds(evidencePlan.claim)]),
    uniqueSourceIds([...objectIds, ...resolveReferenceIds(evidencePlan.boundary)]),
  ] as const;
  const objectInterpretation = `${asset.caption} ${asset.historicalNote}`;
  const dateLabel = `${asset.creator} · ${asset.objectDate} · ${asset.institution} · ${asset.license}`;
  return {
    ...input,
    dateLabel,
    lead: reviewed.invitation,
    sections: [
      {heading: '', paragraphs: [`${asset.attribution} ${reviewed.visualReading} ${asset.historicalNote}`], sourceIds: paragraphSourceIds[0]},
      {heading: '', paragraphs: [`${reviewed.claim} ${input.keyIdeas[1]} ${objectLedDevelopment}`], sourceIds: paragraphSourceIds[1]},
      {heading: '', paragraphs: [`${reviewed.boundary} ${input.keyIdeas[2]} ${input.cautions.join(' ')} ${reviewed.guide[0]} ${reviewed.guide[1]}`], sourceIds: paragraphSourceIds[2]},
    ],
    sources,
    visitorGuide: [
      {heading: `${reviewed.plaqueTitle}: object evidence`, items: [
        {label: 'Identity and date', description: `${asset.title}; ${asset.creator}; ${asset.objectDate}.`, sourceIds: paragraphSourceIds[0]},
        {label: 'Custody and rights', description: `${asset.institution}. ${asset.license}.`, sourceIds: paragraphSourceIds[0]},
      ]},
      {heading: input.id === 'spivak-subaltern-representation'
        ? 'Spivak and representation: claims and limits'
        : `${reviewed.articleTitle}: claims and limits`, items: [
        {label: 'Establish first', description: reviewed.guide[0], sourceIds: uniqueSourceIds([...paragraphSourceIds[0], ...paragraphSourceIds[1]])},
        {label: 'Carry forward', description: reviewed.guide[1], sourceIds: uniqueSourceIds([...paragraphSourceIds[1], ...paragraphSourceIds[2]])},
      ]},
    ],
    objectInterpretation,
    presentation: {
      ...input.presentation,
      panelKicker: `Gallery ${galleryNumber} supplemental exhibit`,
      proximityKicker: reviewed.plaqueTitle,
      factRows: [
        {label: 'Object', value: reviewed.plaqueTitle},
        {label: 'Maker / date', value: `${asset.creator} · ${asset.objectDate}`},
        {label: 'Custody / rights', value: `${asset.institution} · ${asset.license}`},
        {label: 'Atlas route', value: reviewed.articleTitle},
      ],
      articleActionLabel: input.id === 'spivak-subaltern-representation'
        ? 'Compare Spivak’s representation problem with the full sourced bell hooks article'
        : `Read the full sourced ${reviewed.articleTitle} article`,
      exhibitLayout: 'object-led',
    },
    wallPlaque: {
      type: reviewed.plaqueType,
      title: reviewed.plaqueTitle,
      invitation: reviewed.invitation,
      canonicalContexts: [canonicalContext(input)],
    },
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-22',
      method: reviewMethod,
      resolution: `Resolved: ${reviewed.resolution ?? `reconciled ${reviewed.plaqueTitle} across object identity, attribution, date, institution, provenance, rights, caption, alt text, claim boundaries, natural ratio, plaque, guide, sources, route, and interaction evidence.`}`,
      lock: locks[input.id] ?? 'fnv1a64:0000000000000000',
      visualReview: visualReview(input.id),
    },
  };
};

export const reviewJusticeDemocraticReasonSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => reviewSupplementalExhibit(24, input);
export const reviewFeministPhilosophiesSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => reviewSupplementalExhibit(25, input);
export const reviewColonialismRaceLiberationSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => reviewSupplementalExhibit(26, input);
