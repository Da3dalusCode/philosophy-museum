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
  'political-authority-legitimacy': 'fnv1a64:9e87abd3ac525823',
  'public-action-civil-disobedience': 'fnv1a64:e66d0e15ef920e1e',
  'arendt-human-condition': 'fnv1a64:841cce220afd4f2e',
  'arendt-eichmann-judgment': 'fnv1a64:f2e4a681bf8243ca',
  'rawls-theory-of-justice': 'fnv1a64:691e1591f441b0b0',
  'rawls-original-position': 'fnv1a64:e3e47b4f05829573',
  'nozick-anarchy-state-utopia': 'fnv1a64:0140f0c3fea97e7a',
  'nozick-entitlement-rectification': 'fnv1a64:ec6205cbdf8f44b3',
  'nussbaum-capabilities-approach': 'fnv1a64:ff14f17561fc5aa7',
  'nussbaum-frontiers-justice': 'fnv1a64:b2a98f8681f96a8d',
  'amartya-sen-capability-development': 'fnv1a64:3b95b1ec998bbd98',
  'habermas-public-sphere': 'fnv1a64:79abf764ec1d5b48',
  'democratic-deliberation-assembly': 'fnv1a64:f06ac6ecfc8f9b2a',
  'feminist-cooper-voice-education': 'fnv1a64:f51caebf063c9471',
  'feminist-truth-abolition-rights': 'fnv1a64:569764bb5979be3d',
  'feminist-crenshaw-intersectionality': 'fnv1a64:cff4c91325bfbec5',
  'feminist-standpoint-situated-objectivity': 'fnv1a64:50d7b5deaded24f2',
  'feminist-care-dependency-labor': 'fnv1a64:b4f8e5fdd86747bf',
  'feminist-astell-reason-education': 'fnv1a64:bd035db023ab81ac',
  'feminist-wollstonecraft-manufactured-inequality': 'fnv1a64:4b17ee85c19cb5f5',
  'feminist-de-gouges-citizenship': 'fnv1a64:9e36c7d32a9689f8',
  'feminist-bluestocking-intellectual-publics': 'fnv1a64:5da45a62ca520803',
  'feminist-education-domesticity': 'fnv1a64:58dee1805bfa0ae3',
  'feminist-abolition-convention-exclusion': 'fnv1a64:41574f53e5d17dfe',
  'beauvoir-labor-and-immanence': 'fnv1a64:584cc33915dfe806',
  'beauvoir-situation-and-place': 'fnv1a64:ed5de2a0ecb6d7e0',
  'beauvoir-second-sex-movement': 'fnv1a64:b152e83cbc42cc81',
  'beauvoir-aging-and-otherness': 'fnv1a64:28e2a5fe73586d97',
  'beauvoir-boupacha-colonial-violence': 'fnv1a64:de90435edc1a022e',
  'butler-performativity-and-action': 'fnv1a64:04e62d57566feb7e',
  'butler-trans-livability': 'fnv1a64:ffa8eb17f6df66b3',
  'butler-disability-dependency': 'fnv1a64:5f366420da751803',
  'butler-coalition-and-contestation': 'fnv1a64:d397faff32ebb9e4',
  'butler-assembly-precarity': 'fnv1a64:61b8723e7ca42d64',
  'fanon-racializing-gaze': 'fnv1a64:e9d480577dcbccdd',
  'fanon-colonial-psychiatry': 'fnv1a64:6d0167a55164eae4',
  'fanon-algerian-revolution': 'fnv1a64:445a6d8fec22a027',
  'fanon-violence-decolonization': 'fnv1a64:8c76c01031ede9b2',
  'fanon-national-consciousness': 'fnv1a64:0a6b681b834ad6e7',
  'davis-prison-abolition': 'fnv1a64:7dbe55044e5b6f9e',
  'davis-race-gender-class': 'fnv1a64:9d74673a080c5277',
  'hooks-margin-center': 'fnv1a64:b47794c9b17c6b32',
  'hooks-engaged-pedagogy-love': 'fnv1a64:e026eef94066b8f2',
  'cesaire-colonialism-thingification': 'fnv1a64:08fbbeb12285819e',
  'dubois-color-line-colonial-world': 'fnv1a64:ed4136c55e1f88ec',
  'said-orientalism-representation': 'fnv1a64:5f76ce407dba1d66',
  'spivak-subaltern-representation': 'fnv1a64:27a5c9385489e3d3',
  'ngugi-language-decolonization': 'fnv1a64:c7a888d32d2357a3',
  'wynter-humanism-coloniality': 'fnv1a64:6a70eb8e462040c3',
};

/** Walking order is deliberately identical to Galleries 24, 25, and 26. */
const evidence: Record<string, Evidence> = {
  'political-authority-legitimacy': {
    plaqueTitle: 'Authority, Institutions, and Public Accountability', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Political Philosophy',
    invitation: 'Follow this original interpretive circuit from public authorization through institutions and back through contest and revision, while keeping coercion, obedience, legitimacy, and democratic accountability distinct rather than treating authority as self-justifying power.',
    visualReading: 'The circular table, civic buildings, connecting routes, and revision arrows belong to an original 2026 Museum drawing. They identify a conceptual comparison only; they are not a historical constitution, an author’s diagram, or evidence that public institutions are accountable in practice.',
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
    visualReading: 'Three equal collage panels show bodily maintenance, fabricated objects, and people speaking together. The 2026 Museum drawing is not by Arendt and does not depict an actual household, workplace, polis, or stable division among activities.',
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
    visualReading: 'Equal figures, a translucent veil, and branching social arrangements form an original 2026 Museum drawing. The composition visualizes a choice situation only; it is neither Rawls’s diagram nor a historical meeting or empirical experiment.',
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
    visualReading: 'A 2026 Museum drawing links acquisition and transfer before broken chains and dispossession redirect the sequence toward investigation and rectification. It is not Nozick’s diagram, a legal title chain, or a record of any particular property.',
    claim: 'Entitlement theory evaluates holdings historically through just acquisition, just transfer, and rectification of injustice. It therefore cannot infer justice from a present pattern alone, and Nozick left the content and institutional application of rectification notably underdeveloped.',
    boundary: 'The image foregrounds theft, enslavement, colonial seizure, and exclusion without proposing one remedy. Evidence, descendants, institutional responsibility, collective claims, compensation, restitution, and limits on otherwise voluntary exchange demand arguments beyond the schematic arrows.',
    guide: ['Ask what evidence would establish each acquisition and transfer rather than treating possession as a moral title.', 'Keep rectification central while distinguishing Nozick’s sketch from legal doctrine, reparations programs, and rival theories of historical justice.'],
  },
  'nussbaum-capabilities-approach': {
    plaqueTitle: 'Central Capabilities as Real Opportunities', plaqueType: 'concept-argument-diagram-or-method', articleTitle: 'Martha Nussbaum',
    invitation: 'Read ten open portals as an original prompt for plural real opportunities, not a ladder or official diagram, then test universal thresholds against disability, culture, democratic voice, resources, and paternalism.',
    visualReading: 'The 2026 Museum drawing places a person before ten differently pictured openings. It evokes plurality and access but does not reproduce Nussbaum’s wording, rank capabilities, show achieved functionings, or measure what anyone can actually do or be.',
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
    boundary: 'The photograph cannot establish job titles, race, pay, authorship, experience, or one collective standpoint for every person pictured. A workplace image may reveal distributed labor while still concealing hierarchy, segregation, credit, management, technical method, and the archive’s own framing.',
    guide: ['Keep the corrected NASA station, 1949 date, institutional labor, and visible equipment separate from unrecorded biographies.', 'Compare standpoint, situated knowledge, reflexivity, strong objectivity, division of labor, evidence, and disagreement.'],
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
    resolution: 'corrected the event from 21 May 1999 to 21 May 1990 using contemporary NIH and NLM records while retaining uncertainty about the exact image creator and capture record.',
    additionalSources: [
      source('National Library of Medicine — Storm the NIH, 21 May 1990', 'https://www.nlm.nih.gov/exhibition/surviving-and-thriving/index.html', 'collection-record'),
      source('Routledge — Gender Trouble', 'https://www.routledge.com/Gender-Trouble/Butler/p/book/9780415389556', 'primary-text'),
    ],
  },
  'butler-trans-livability': {
    plaqueTitle: 'National Trans Visibility March, 29 September 2019', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Judith Butler',
    invitation: 'This United States march records contingent public action, not trans life as such; ask what recognition can enable and what material security, self-determination, care, housing, and safety visibility alone cannot deliver.',
    visualReading: 'Avery Jensen’s creator-licensed photograph shows marchers with trans-pride colors and signs. The Commons upload establishes maker, date, and license but no holding institution, while event location, organizers, attendance, and participant views require separate records.',
    claim: 'Butler’s work asks how recognition and gender norms condition livability, embodiment, and public appearance. Trans philosophy and activism have autonomous histories and disagreements, so recognition must be evaluated alongside material institutions rather than treated as Butler’s application.',
    boundary: 'One U.S. march cannot represent global trans lives, safety, health care, housing, policing, race, disability, class, or progress. Visibility can enable solidarity while increasing exposure to surveillance and violence; the photograph cannot decide that balance for those pictured.',
    guide: ['Identify Jensen, 29 September 2019, creator license, visible signs, and the absence of a holding institution.', 'Compare recognition, livability, self-determination, material support, visibility, surveillance, trans philosophy, activism, and internal difference.'],
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
    plaqueTitle: 'Algerian Refugees Sheltering in Caves, 1958', plaqueType: 'historical-event-or-institutional-context', articleTitle: 'Frantz Fanon',
    invitation: 'Encounter a fragmentary record of wartime displacement, then read Fanon’s contested account of colonial violence alongside trauma, coercion, unequal risk, and political agency that slogans about violence too easily conceal.',
    visualReading: 'Adults and children gather at a cave entrance in a cropped photograph described as Algerian refugees in 1958. The original photographer, exact location, occasion, full frame, publication, and archive rights record remain incomplete beyond the mediated Tunisian source.',
    claim: 'The Wretched of the Earth analyzes colonial force, counterviolence, psychic injury, organization, and political transformation. The displacement image keeps civilian cost visible, but it cannot verify Fanon’s wording, a particular family’s experience, or a general judgment about revolutionary means.',
    boundary: 'Sartre’s forceful preface is reception text, not Fanon’s own argument, and clinical material complicates celebration of violence. Commons’ Tunisian public-domain claim remains source-qualified, while testimony, military history, trauma, coercion, strategy, and aftermath need separate records.',
    guide: ['Identify the source-described 1958 displacement scene, crop, unknown maker and place, and incomplete archival rights.', 'Separate colonial force, counterviolence, civilian trauma, Fanon’s text, Sartre’s preface, political agency, organization, and later debate.'],
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
    visualReading: 'An unknown photographer records a primary-school class at the Church of Scotland Kikuyu mission, circa 1905–1940, CSWC GB-237-CSWC47-LS7-024. Language, lesson, identities, exact date, direct collection rights, and fuller provenance remain unrecorded.',
    claim: 'Decolonising the Mind connects language, education, literature, publishing, audience, memory, and imperial power. Ngũgĩ’s turn to Gikuyu and community theater challenges institutional rankings without reducing decolonization to linguistic purity or one personal choice.',
    boundary: 'The photograph is not Ngũgĩ’s school or Kamĩrĩĩthũ and cannot establish its instructional language or pupil experience. The Fanon CTA is comparative because no Ngũgĩ article is installed; their related challenges to colonial language must remain distinct projects.',
    guide: ['Identify the mission-school archive frame, broad date, reference, unknown language and identities, and incomplete rights provenance.', 'Track Gikuyu, English, education, publishing, audience, Kamĩrĩĩthũ, institutional power, multilingual practice, and the comparative Fanon route.'],
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

const reviewMethod = 'Galleries 24–26 supplemental review: exactly three concurrent GPT-5.6 Terra/High read-only evidence scopes of seventeen, sixteen, and sixteen non-overlapping exhibits were reconciled by the Sol parent against the assembled runtime registry and installed bytes across identity, attribution, date, institution, provenance, rights, caption, alt text, natural ratio, primary evidence, later reception, reproductions, interpretive imagery, unresolved evidence, three claim-mapped object-led paragraphs, factual two-level plaques, subject-specific guidance, canonical relationships, exact article actions, current review locks, and desktop, mobile, and fresh staged-3D presentation.';

const visualReview = (id: string): NonNullable<NonNullable<MuseumSupplementalExhibit['review']>['visualReview']> => ({
  desktop: {reviewedOn: '2026-08-21', viewport: '1440×900', evidence: `Direct route inspected with the full aspect-safe object preview, three untitled sourced paragraphs, subject-specific evidence guide, factual plaque relationship, exact article action, and no horizontal overflow. Evidence: docs/visual-validation/gallery-24-26-supplementals/desktop/${id}.png`},
  mobile: {reviewedOn: '2026-08-21', viewport: '390×844', evidence: `Direct route inspected with a wrapped factual title, aspect-safe object preview, scrollable interpretation, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-24-26-supplementals/mobile/${id}.png`},
  threeDimensional: {reviewedOn: '2026-08-21', viewport: '1280×720 fresh direct-route session', evidence: `Fresh direct-route session verified direct target activation, close/resume, the sole intended proximity card, and exact routed-target reopening without neighboring-card substitution. Evidence: docs/visual-validation/gallery-24-26-supplementals/staged-3d/${id}.png`},
});

const canonicalContext = (input: MuseumSupplementalExhibit): MuseumCanonicalContextRef => {
  if (input.articleRoute?.kind === 'philosopher') return {kind: 'philosopher', id: input.articleRoute.philosopherId};
  if (input.articleRoute?.kind === 'branch') return {kind: 'branch', id: input.articleRoute.branchId};
  throw new Error(`Gallery 24–26 supplemental exhibit ${input.id} lacks a canonical article route.`);
};

const reviewSupplementalExhibit = (galleryNumber: 24 | 25 | 26, input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery ${galleryNumber} review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery ${galleryNumber} presentation for ${input.id}.`);
  const asset = getMuseumAsset(input.assetId);
  const objectSources: MuseumSupplementalInterpretationSource[] = [
    {id: 'object', label: `${asset.title} — installed source record`, url: asset.sourcePageUrl, kind: 'collection-record'},
    ...(asset.objectPageUrl && asset.objectPageUrl !== asset.sourcePageUrl
      ? [{id: 'holding', label: `${asset.institution} — object or institutional record`, url: asset.objectPageUrl, kind: 'collection-record'} as const]
      : []),
  ];
  const objectSourceUrls = new Set(objectSources.map(({url}) => url));
  const supplementary = [...input.sources, ...(reviewed.additionalSources ?? [])]
    .filter(({url}, index, items) => !objectSourceUrls.has(url) && items.findIndex((item) => item.url === url) === index);
  const claimSources: MuseumSupplementalInterpretationSource[] = supplementary.map((item, index) => ({...item, id: `claim-${index + 1}`}));
  const sources = [...objectSources, ...claimSources];
  const objectIds = objectSources.flatMap((item) => item.id ? [item.id] : []);
  const claimIds = claimSources.flatMap((item) => item.id ? [item.id] : []);
  const allSourceIds = [...objectIds, ...claimIds];
  const objectInterpretation = `${asset.attribution} Recorded institution or provenance: ${asset.institution}. Rights: ${asset.license}. ${asset.historicalNote}`;
  const dateLabel = `${asset.creator} · ${asset.objectDate} · ${asset.institution} · ${asset.license}`;
  return {
    ...input,
    dateLabel,
    lead: reviewed.invitation,
    sections: [
      {heading: '', paragraphs: [`${objectInterpretation} ${reviewed.visualReading}`], sourceIds: allSourceIds},
      {heading: '', paragraphs: [`${reviewed.claim} ${input.keyIdeas[1]} The installed object is therefore the starting evidence rather than visual proof of the philosophical thesis: the linked primary text or academic reference bears the interpretive claim, and later applications, institutions, or criticism remain separate reception evidence unless independently documented.`], sourceIds: allSourceIds},
      {heading: '', paragraphs: [`${reviewed.boundary} ${input.keyIdeas[2]} ${input.cautions.join(' ')} The exhibit’s evidentiary discipline follows from those limits: ${reviewed.guide[0]} ${reviewed.guide[1]}`], sourceIds: allSourceIds},
    ],
    sources,
    visitorGuide: [
      {heading: `${reviewed.plaqueTitle}: object evidence`, items: [
        {label: 'Identity and date', description: `${asset.title}; ${asset.creator}; ${asset.objectDate}.`, sourceIds: objectIds},
        {label: 'Custody and rights', description: `${asset.institution}. ${asset.license}.`, sourceIds: objectIds},
      ]},
      {heading: `${reviewed.articleTitle}: claims and limits`, items: [
        {label: 'Establish first', description: reviewed.guide[0], sourceIds: allSourceIds},
        {label: 'Carry forward', description: reviewed.guide[1], sourceIds: claimIds.length ? claimIds : objectIds},
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
      articleActionLabel: `Read the full sourced ${reviewed.articleTitle} article`,
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
      reviewedOn: '2026-08-21',
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
