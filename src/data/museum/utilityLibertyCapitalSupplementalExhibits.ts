import type {MuseumAssetId} from './museumAssetTypes';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
} from './museumSupplementalAuthoring';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import {
  UTILITY_LIBERTY_CAPITAL_GALLERY_ID,
  UTILITY_LIBERTY_CAPITAL_ROOM_SIGN_COPY,
} from './utilityLibertyCapitalGalleryCuration';
import type {UtilityLibertyCapitalGalleryAssetId} from './utilityLibertyCapitalGalleryAssets';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export {UTILITY_LIBERTY_CAPITAL_GALLERY_ID, UTILITY_LIBERTY_CAPITAL_ROOM_SIGN_COPY};

export const UTILITY_LIBERTY_CAPITAL_PALETTE = Object.freeze({
  charcoal: '#262625',
  reformBlue: '#456d7d',
  civicRed: '#985c4f',
  industryGold: '#a97a3f',
  laborGreen: '#587064',
  plum: '#6f5a72',
});

export type UtilityLibertyCapitalSupplementalExhibitId =
  | 'utility-bentham-young-reformer'
  | 'utility-penitentiary-reform'
  | 'utility-law-public-judgment'
  | 'utility-suffering-moral-standing'
  | 'liberty-romantic-formation'
  | 'liberty-harriet-collaboration'
  | 'liberty-cooperative-experiments'
  | 'liberty-public-assembly'
  | 'liberty-womens-suffrage'
  | 'liberty-imperial-exception'
  | 'capital-feuerbach-inversion'
  | 'capital-alienated-labor'
  | 'capital-machinery-knowledge'
  | 'capital-commodity-spectacle'
  | 'capital-class-revolution-1848'
  | 'transformations-ricardo-political-economy'
  | 'transformations-industrial-city'
  | 'transformations-gendered-labor'
  | 'transformations-global-cotton'
  | 'transformations-chartist-politics'
  | 'transformations-cotton-flows';

type CuratedInput = {
  id: UtilityLibertyCapitalSupplementalExhibitId;
  assetId: UtilityLibertyCapitalGalleryAssetId;
  parent: 'bentham' | 'mill' | 'marx';
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
};

const image = (url: string) => ({label: 'Wikimedia Commons — displayed object or image record', url, kind: 'collection-record' as const});
const academicByParent = {
  bentham: {label: 'Stanford Encyclopedia of Philosophy — Jeremy Bentham', url: 'https://plato.stanford.edu/entries/bentham/', kind: 'academic-reference' as const},
  mill: {label: 'Stanford Encyclopedia of Philosophy — John Stuart Mill', url: 'https://plato.stanford.edu/entries/mill/', kind: 'academic-reference' as const},
  marx: {label: 'Stanford Encyclopedia of Philosophy — Karl Marx', url: 'https://plato.stanford.edu/entries/marx/', kind: 'academic-reference' as const},
};

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
    {heading: 'Look closely', paragraph: `${input.ideas[0]} ${input.sectionDetails[0]}`},
    {heading: 'Historical argument', paragraph: `${input.ideas[1]} ${input.sectionDetails[1]}`},
    {heading: 'What remains at stake', paragraph: `${input.ideas[2]} ${input.sectionDetails[2]}`},
  ],
  sources: [image(input.imageSource), academicByParent[input.parent]],
  articleRoute: {kind: 'philosopher', philosopherId: input.parent},
  entityKind: 'philosopher',
  panelKicker: 'Gallery 20 work and context exhibit',
});

export const UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBITS = [
  curated({
    id: 'utility-bentham-young-reformer', assetId: 'utility-bentham-frye-youth', parent: 'bentham',
    displayName: 'Before the System: A Child Prodigy Becomes a Reformer', shortTitle: 'Bentham Before Utility', focus: 'BENTHAM · EDUCATION, LAW, AND REFORMING AMBITION', dateLabel: 'Portrait c. 1760–1762 · Bentham about age 12–14',
    question: 'How did an unusually compressed education prepare Bentham to treat inherited law as something that could be analyzed and redesigned?',
    lead: 'Frye’s portrait shows Bentham before utilitarianism, legislation theory, or prison reform. Books and formal dress stage the child prodigy whose legal education later produced impatience with obscurity, custom, and unexamined authority.',
    ideas: ['The youthful portrait makes formation visible without pretending that mature doctrines were already present.', 'Bentham’s later reform program joins moral evaluation to classification, publicity, administration, and legislation.', 'A life devoted to system-building raises the question of when rational clarity serves people and when it makes them administratively legible.'],
    sectionDetails: [
      'Thomas Frye presents an educated gentleman’s son through the conventions of elite portraiture: poised body, sober dress, and books offered as signs of disciplined promise. Those objects tell us how Bentham’s family wished learning to appear; they cannot reveal the content of a child’s convictions or guarantee his adult intellectual path.',
      'Bentham entered Queen’s College, Oxford, at twelve and later trained for the law, but he rejected legal practice in favor of criticism and reconstruction. His encounter with William Blackstone’s defense of English law sharpened a lifelong objection to rules grounded in inherited authority rather than stated purposes, intelligible language, and publicly assessable effects.',
      'The reformer’s ambition was emancipatory when it exposed needless suffering, professional mystification, and arbitrary power. Yet the same appetite for classification could privilege what administrators can count over what affected people can describe. Bentham’s legacy therefore asks visitors to judge not only a system’s lucid design but also who defines its measures and can contest its decisions.',
    ],
    cautions: ['Do not read the books or pose as evidence for a specific mature doctrine.', 'The painting records elite education, not the lives of those later governed by Benthamite reforms.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Jeremy_Bentham_by_Thomas_Frye.jpg',
  }),
  curated({
    id: 'utility-penitentiary-reform', assetId: 'utility-millbank-penitentiary-1829', parent: 'bentham',
    displayName: 'Punishment as an Institution to Be Designed', shortTitle: 'Penitentiary Reform', focus: 'PUNISHMENT · ARCHITECTURE, INCENTIVES, SURVEILLANCE, AND ACCOUNTABILITY', dateLabel: 'Millbank Penitentiary represented in 1829',
    question: 'What changes when punishment is judged as an institution with designed consequences rather than inherited vengeance?',
    lead: 'Millbank’s radial mass belongs to the wider era of penitentiary experiment. Bentham asked how severity, certainty, economy, inspection, and publicity might be coordinated, while the built prison exposes costs and forms of domination that a clean plan can conceal.',
    ideas: ['Walls, routes, sightlines, records, and labor turn punishment into an administered environment.', 'Consequential evaluation asks what a prison actually produces, including suffering, discipline, deterrence, and corruption.', 'Institutional design remains answerable to prisoners’ humanity rather than becoming self-justifying efficiency.'],
    sectionDetails: [
      'The print’s repeating polygons, interior yards, and controlled passages show punishment becoming a problem of circulation and supervision. Millbank, opened in the early nineteenth century, was a separate government penitentiary rather than Bentham’s Panopticon. Its confusing plan, illness, expense, and harsh conditions reveal how an orderly aerial geometry may diverge from experience on the ground.',
      'Bentham developed the Panopticon proposal in the late 1780s as a structure in which an inspector might observe occupants without being seen. He tied inspection to records, contracted management, economy, and public accountability, but the British government never built his proposed prison. His broader penal theory evaluated punishment as an evil justified only by preventing greater harms.',
      'A consequential assessment must include more than administrative cost or measurable recidivism. It must count isolation, fear, bodily and mental injury, staff incentives, family disruption, unequal policing, and the political effects of confinement. Public inspection can restrain abuse, yet surveillance can also deepen domination when prisoners have no effective voice, remedy, or exit.',
    ],
    cautions: ['Millbank was not Bentham’s Panopticon and did not implement his exact design.', 'Architectural order is not evidence of humane outcomes.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Millbank_Penitentiary_1829.jpg',
  }),
  curated({
    id: 'utility-law-public-judgment', assetId: 'utility-old-bailey-1808', parent: 'bentham',
    displayName: 'Law in Public: Judgment, Evidence, and Codification', shortTitle: 'Law in Public', focus: 'LAW · PROCEDURE, EVIDENCE, PUBLICITY, AND CODIFICATION', dateLabel: 'Old Bailey interior published 1808',
    question: 'Can law guide conduct and restrain power when its language, procedures, and reasons remain obscure?',
    lead: 'The crowded Old Bailey puts judges, lawyers, defendants, officials, and spectators inside one process. Bentham’s demand for accessible codification and public scrutiny responds to law as a lived institution, not only a set of propositions.',
    ideas: ['Publicity can expose procedure to criticism while also turning trials into spectacle.', 'Codification promises intelligibility but cannot remove judgment, evidence disputes, or unequal access.', 'A reform is utilitarian only if its consequences for security and suffering are examined rather than assumed.'],
    sectionDetails: [
      'This plate from The Microcosm of London organizes the courtroom as a social theater: elevated judges, professional advocates, constrained defendants, working officials, and an observing public occupy unequal positions. The print makes procedure visible, but its polished composition also reminds us that representation selects gestures and viewpoints instead of supplying a transparent transcript of justice.',
      'Bentham attacked technical fictions and the opacity of judge-made common law because citizens could not reliably guide conduct by rules disclosed only after litigation. Across his writings on codification, evidence, and judicial organization, he sought publicly stated law and reasons that could be criticized. Clear codes, however, still require fact-finding, interpretation, enforcement, and institutions accessible beyond wealthy litigants.',
      'Public courts can deter secret abuse and make officials answerable, but spectatorship may humiliate defendants or reward sensational prosecution. A Benthamite test therefore follows effects through the entire process: the reliability of evidence, burdens on witnesses, unequal counsel, delays, wrongful conviction, safety, and confidence in law. Formal openness is a condition of scrutiny, not proof that justice has occurred.',
    ],
    cautions: ['The print is an authored social view, not neutral courtroom reportage.', 'Bentham’s attack on legal fictions does not settle every dispute about discretion or precedent.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Microcosm_of_London_Plate_058_-_Old_Bailey_edited.jpg',
  }),
  curated({
    id: 'utility-suffering-moral-standing', assetId: 'utility-hogarth-first-cruelty', parent: 'bentham',
    displayName: 'Can They Suffer? Cruelty Before Bentham’s Question', shortTitle: 'Suffering and Standing', focus: 'SENTIENCE · CRUELTY, HABIT, LAW, AND MORAL CONSIDERATION', dateLabel: 'Hogarth print, 1751',
    question: 'Why should the capacity to suffer matter more than species membership, speech, or rational performance?',
    lead: 'Hogarth’s dense satire makes cruelty a learned public practice. Bentham’s later question about whether animals can suffer shifts moral standing toward sentience, while leaving difficult work about evidence, comparison, law, and human use.',
    ideas: ['The image asks visitors to trace how spectatorship, play, and indifference normalize suffering.', 'Bentham’s criterion challenges boundaries that reward resemblance to dominant human capacities.', 'Extending concern requires institutional consequences, not sympathy that stops at the picture frame.'],
    sectionDetails: [
      'In the first plate of Hogarth’s Four Stages of Cruelty, children participate in or watch multiple acts of animal torment while the central boy, Tom Nero, abuses a dog. The crowded street distributes responsibility across perpetrators, amused companions, and passive witnesses. Hogarth turns cruelty into a habit cultivated socially, not an isolated eruption by a uniquely monstrous individual.',
      'In a famous note to his Introduction to the Principles of Morals and Legislation, Bentham rejects speech or sophisticated reasoning as the threshold for concern and asks whether a being can suffer. That move does not make all interests identical. It does require pain and pleasure to enter moral calculation even when the sufferer cannot bargain, testify, or resemble an adult human citizen.',
      'Sentience becomes politically significant only when practices and incentives change: standards for husbandry, experimentation, transport, entertainment, habitat, and enforcement all determine whose suffering remains convenient to ignore. Contemporary animal ethics extends and disputes Bentham’s approach by asking how interests compare, whether rights constrain aggregate benefit, and how uncertain evidence about experience should guide precaution.',
    ],
    cautions: ['Hogarth predates Bentham and was not illustrating his argument.', 'The print’s moralizing sequence should not substitute for careful contemporary animal ethics.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_First_Stage_of_Cruelty,_First,_Children_Torturing_Animals_-_B1981.25.1440_-_Yale_Center_for_British_Art.jpg',
  }),
  curated({
    id: 'liberty-romantic-formation', assetId: 'liberty-wordsworth-helvellyn', parent: 'mill',
    displayName: 'Feeling, Culture, and the Recovery of Individuality', shortTitle: 'Mill and Wordsworth', focus: 'FORMATION · FEELING, POETRY, CHARACTER, AND INDIVIDUALITY', dateLabel: 'Wordsworth portrait, 1842 · Mill’s crisis began in 1826',
    question: 'Can moral and political agency survive when education develops analysis but leaves feeling and desire impoverished?',
    lead: 'Mill described Wordsworth’s poetry as important in his recovery from a mental crisis. The encounter complicates a caricature of utilitarianism as mechanical calculation by restoring emotion, culture, and character to the conditions of a valuable life.',
    ideas: ['The mountain portrait stages inwardness and cultivated feeling rather than a ledger of pleasures.', 'Mill’s revised utilitarianism distinguishes qualities of experience and the development of active character.', 'Individuality is socially formed, so education can either enlarge or deform a person’s capacities.'],
    sectionDetails: [
      'Benjamin Robert Haydon places Wordsworth against Helvellyn’s open landscape, presenting the poet as a figure of reflection shaped by sustained attention to nature. Nothing in the canvas depicts Mill or his crisis. Its value here is material and imaginative: it gives visible form to the kind of affective cultivation Mill later said analytic instruction had failed to provide.',
      'Mill recounts that in 1826 he asked whether achieving all his reforming aims would make him happy and found that it would not. Reading Wordsworth offered feelings of tranquility and durable human sympathy rather than the intense excitement he associated with other poetry. The episode helped him revise, not abandon, utilitarianism by taking character and qualitative differences among enjoyments seriously.',
      'On Liberty later treats individuality as an active achievement nourished by varied experience, choice, and experiments in living. But capacities do not unfold outside society: education, work, family authority, class, and public opinion shape available desires. A politics of freedom must therefore protect choice while asking whether people receive the material and cultural resources needed to form purposes of their own.',
    ],
    cautions: ['The painting depicts Wordsworth, not Mill’s recovery or a meeting between them.', 'Poetic cultivation does not by itself solve structural inequality.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Wordsworth_on_Helvellyn_by_Benjamin_Robert_Haydon.jpg',
  }),
  curated({
    id: 'liberty-harriet-collaboration', assetId: 'liberty-harriet-taylor-npg', parent: 'mill',
    displayName: 'Harriet Taylor Mill: Collaboration Without Erasure', shortTitle: 'Harriet Taylor Mill', focus: 'AUTHORSHIP · COLLABORATION, EQUALITY, MARRIAGE, AND FREEDOM', dateLabel: 'Portrait date and artist unknown · collaboration from the 1830s',
    question: 'How should a philosophical collaboration be reconstructed when gendered conventions distort attribution and evidence remains incomplete?',
    lead: 'Harriet Taylor Mill was an essayist and sustained intellectual interlocutor in Mill’s work on liberty, women’s equality, marriage, and social character. Responsible interpretation neither erases her nor assigns every shared claim with false precision.',
    ideas: ['Correspondence and published texts show serious intellectual exchange across decades.', 'Gendered barriers shaped whose authorship appeared independent and whose labor was absorbed into another reputation.', 'Collaboration can be philosophically constitutive even when exact sentence-level attribution is impossible.'],
    sectionDetails: [
      'The National Portrait Gallery image preserves a face while withholding the secure artist and date that normally organize a museum label. That evidentiary gap is instructive: portrait survival can make a historical person visible without disclosing her intellectual labor. Taylor Mill must be reconstructed through her own publications, correspondence, drafts, and the testimony of collaborators rather than through likeness alone.',
      'Harriet Taylor and John Stuart Mill began an intense intellectual relationship in the early 1830s and married in 1851 after the death of her first husband. She published “The Enfranchisement of Women” in 1851, and Mill credited her with profound participation in his thinking. Scholars continue to debate the precise extent of collaboration on individual works, especially On Liberty.',
      'Attribution is not solved by choosing between solitary genius and undifferentiated joint authorship. Social conventions affected whose ideas could circulate under a recognized name, while surviving drafts may not register years of conversation. A responsible account identifies Taylor Mill’s demonstrable positions, takes Mill’s acknowledgments seriously, and marks uncertainty instead of filling archival silence with either erasure or certainty.',
    ],
    cautions: ['The portrait’s creator and date are unknown; do not invent lifetime metadata.', 'Avoid both reducing Taylor Mill to influence and claiming unsupported coauthorship of every Mill text.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Harriet_Mill_from_NPG.jpg',
  }),
  curated({
    id: 'liberty-cooperative-experiments', assetId: 'liberty-rochdale-pioneers-shop', parent: 'mill',
    displayName: 'Experiments in Association: The Rochdale Pioneers', shortTitle: 'Cooperative Experiments', focus: 'ASSOCIATION · COOPERATION, WORK, PROPERTY, AND SELF-GOVERNMENT', dateLabel: 'Rochdale Society founded 1844 · historic shop photograph undated',
    question: 'Could cooperative ownership transform workers from instruments of capital into participants in shared self-government?',
    lead: 'The Toad Lane shop grounds cooperative association in shelves, accounts, members, and rules. Mill’s openness to producer cooperatives links individuality to institutions where people can practice responsibility rather than merely receive wages.',
    ideas: ['Cooperation is an institutional experiment, not only a moral attitude.', 'Shared governance can cultivate capacities while generating its own conflicts over scale, capital, and expertise.', 'Experiments in living include economic forms, not just private lifestyles.'],
    sectionDetails: [
      'The modest shop at 31 Toad Lane points to mechanisms more concrete than an ideal community. The Rochdale pioneers opened it in 1844 with member capital and rules associated with honest weights, cash trading, education, and returns linked to purchases. Shelves and ledgers mattered because durable cooperation depended on trustworthy procedures as well as solidaristic intention.',
      'In later editions of Principles of Political Economy, Mill considered forms of association in which workers could collectively own or govern production. He hoped cooperation might replace dependence on a master with shared responsibility and connect effort more directly to benefit. Rochdale began primarily as a consumer cooperative, so it supplies adjacent historical evidence rather than a direct realization of Mill’s producer model.',
      'Economic freedom concerns the authority exercised inside production, not merely a consumer’s freedom to choose between sellers. Cooperatives can distribute voice and develop practical judgment, yet they still face unequal capital, market competition, management expertise, internal dissent, and the problem of growth. Their importance lies in testing institutional alternatives while leaving their failures open to inspection and revision.',
    ],
    cautions: ['Rochdale did not simply implement Mill’s philosophical program.', 'The historic photograph’s original date is unknown and should not be inferred from its modern upload.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Toad_Lane,_Rochdale,_Lancashire_(27380261546).jpg',
  }),
  curated({
    id: 'liberty-public-assembly', assetId: 'liberty-hyde-park-railings-1866', parent: 'mill',
    displayName: 'Who May Assemble? Liberty and the Hyde Park Railings', shortTitle: 'Liberty in Public', focus: 'ASSEMBLY · DISSENT, POLICE POWER, FRANCHISE, AND PUBLIC SPACE', dateLabel: 'Contemporary satire, 1866',
    question: 'What becomes of liberty when formal speech rights collide with policing, exclusion, and control of public space?',
    lead: 'The mock funeral for Hyde Park’s broken railings transforms a reform confrontation into satire. During Mill’s parliamentary term, demands for expanded political voice tested whether liberty protected disruptive collective action as well as respectable opinion.',
    ideas: ['Public space is politically produced through rules about access, assembly, and force.', 'Dissent becomes meaningful when unpopular groups can organize rather than merely hold private beliefs.', 'Franchise reform can widen inclusion while preserving other exclusions.'],
    sectionDetails: [
      'The satire treats damaged iron railings as a deceased public figure, converting conflict into a mock civic ritual. On 23 July 1866, authorities closed Hyde Park against a Reform League meeting; crowds entered after railings gave way amid confrontation with police. Humor makes the barrier’s political role visible while refusing the evidentiary neutrality of a news photograph.',
      'Mill served as member of Parliament for Westminster from 1865 to 1868, when franchise reform and the legitimacy of organized pressure were urgent public questions. His defense of free discussion explains why dissenting views need protection from social and legal suppression. An actual mass assembly adds problems of access, policing, competing uses, and collective power that cannot be reduced to private opinion.',
      'The liberty to speak is thin when authorities can prevent people from gathering where they can be heard. Yet assembly rights also require rules addressing safety and equal access without granting officials a convenient veto over disruptive groups. The Reform League’s campaign widened democratic pressure while its demand centered male enfranchisement, demonstrating that inclusion can challenge one boundary and retain another.',
    ],
    cautions: ['The image is satire rather than documentary reportage.', 'The Reform League sought expanded manhood suffrage, not universal suffrage.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:In_Memory_of_the_Hyde_Park_Railings,_1866.jpg',
  }),
  curated({
    id: 'liberty-womens-suffrage', assetId: 'liberty-suffrage-petition-newcombe', parent: 'mill',
    displayName: 'Equality Enters Parliament: The 1866 Petition', shortTitle: 'The 1866 Petition', focus: 'EQUALITY · SUFFRAGE, REPRESENTATION, EDUCATION, AND CITIZENSHIP', dateLabel: 'Event 1866 · commemorative painting 1910',
    question: 'Can a theory of liberty remain universal when law and custom deny women political standing and cultivated independence?',
    lead: 'Emily Davies and Elizabeth Garrett brought the petition Mill presented to Parliament in 1866. Taylor Mill and Mill argue that subordination is historically manufactured, not natural evidence of incapacity.',
    ideas: ['Political exclusion helps produce the dependency later cited to justify exclusion.', 'Equality requires access to education, work, property, voice, and the power to leave domination.', 'The petition turns philosophical universality into an organized institutional demand.'],
    sectionDetails: [
      'Newcombe painted the scene more than four decades after the event, turning Emily Davies and Elizabeth Garrett’s delivery of the petition into movement memory. The retrospective composition gives organizers a dignified place in a history from which they had been excluded. It should be read as commemoration shaped by later suffrage campaigning, not a visual transcript of 1866.',
      'Mill presented the women’s suffrage petition to the House of Commons and in 1867 proposed replacing the word “man” with “person” in the reform bill; the amendment failed. In The Subjection of Women, published in 1869, he argued that observed gender character had been formed under legal and social subordination, making appeals to supposedly natural incapacity circular.',
      'The demand for a vote exposes the institutional conditions hidden by abstract declarations of equal liberty. Political voice interacts with married women’s property, education, occupational access, bodily security, and economic independence. At the same time, the Victorian campaign’s leadership and franchise terms did not dissolve class, racial, colonial, or other exclusions, so universality remained a project rather than an achieved fact.',
    ],
    cautions: ['Newcombe painted the scene in 1910; it is not an eyewitness image from 1866.', 'The campaign’s leadership and terms did not represent every woman or every intersecting exclusion.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:First_women%27s_suffrage_petition_hidden_under_an_apple_stall_(26510794911).jpg',
  }),
  curated({
    id: 'liberty-imperial-exception', assetId: 'liberty-east-india-company-coins', parent: 'mill',
    displayName: 'Company Rule in the Coin: Commerce, Sovereignty, Empire', shortTitle: 'Liberty’s Imperial Limit', focus: 'EMPIRE · COMPANY RULE, SOVEREIGNTY, COMMERCE, AND EXCLUSION', dateLabel: 'Company coinage · museum photograph 2010',
    question: 'How should Mill’s defense of liberty be read beside his long career in an institution of imperial government?',
    lead: 'East India Company coins fuse trade, taxation, political authority, and territorial rule in small material objects. Mill’s Company employment makes the gap between liberal universality and imperial exception part of the philosophy’s history.',
    ideas: ['A corporation can exercise powers that blur commerce and sovereignty.', 'Universal language can coexist with claims that some peoples are not ready for self-rule.', 'Critical reading preserves Mill’s resources against domination while refusing to detach them from empire.'],
    sectionDetails: [
      'Coinage condenses authority into a portable object: denominations, official emblems, metal standards, and circulation make a governing institution present in everyday exchange. The East India Company began as a chartered trading corporation but acquired territorial, fiscal, military, and administrative powers. These coins therefore invite inspection of how commercial infrastructure can become an instrument and sign of rule.',
      'Mill worked at East India House from 1823 until Company government ended in 1858, eventually serving as a senior examiner of correspondence. His writings could defend liberty among peoples he regarded as capable of improvement through free discussion while allowing paternal rule over societies classified as not yet ready. That exception reveals how a developmental hierarchy narrowed ostensibly universal principles.',
      'Mill’s arguments against conformity and arbitrary interference remain tools for criticizing imperial domination, but they cannot be purified by ignoring the institutions in which he served. Visitors should ask who received the authority to define readiness, civilization, and improvement; whose knowledge was discounted; and how anti-colonial thinkers transformed liberal language by demanding self-government without a tutor’s permission.',
    ],
    cautions: ['The displayed coins do not summarize Mill’s private views or every region under Company rule.', 'Material evidence of Company sovereignty does not settle the interpretation of each text.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:East_India_Company_coins_-_National_Museum,_New_Delhi_-_IMG_2224.jpg',
  }),
  curated({
    id: 'capital-feuerbach-inversion', assetId: 'utility-feuerbach-weger-engraving', parent: 'marx',
    displayName: 'From Idealism to Material Life: Feuerbach’s Inversion', shortTitle: 'Feuerbach’s Inversion', focus: 'MATERIALISM · RELIGION, PROJECTION, PRACTICE, AND SOCIAL RELATIONS', dateLabel: 'Feuerbach’s major intervention, 1841 · engraving 19th century',
    question: 'What changes when divine predicates are interpreted as alienated human powers—and why does Marx still find that reversal insufficient?',
    lead: 'Feuerbach relocates theology into human self-alienation. Marx takes the materialist break seriously but argues that contemplative critique must become an account of practice, institutions, production, and historically changeable social relations.',
    ideas: ['An inversion can expose how human powers return as apparently independent authority.', 'Marx’s criticism shifts from abstract “human essence” toward socially organized activity.', 'Changing interpretation is not yet changing the relations that reproduce alienation.'],
    sectionDetails: [
      'The nineteenth-century engraving supplies a later public likeness of Ludwig Feuerbach, not an image of his argument occurring. In The Essence of Christianity, Feuerbach interpreted divine attributes such as wisdom, love, and power as human capacities projected outward and then experienced as belonging to an independent being. Religion thus becomes a distorted relation of humanity to itself.',
      'Marx learned from Feuerbach’s reversal of idealist explanation, yet the 1845 Theses on Feuerbach object that a merely contemplative materialism treats people as objects of circumstances. Human beings transform circumstances through practical, social activity. Marx also resisted an abstract species essence detached from the historically organized relations of labor, property, family, state, and collective struggle.',
      'Exposing a projection can loosen an authority’s claim to transcendence, but recognition alone may leave the institutions that sustain dependence untouched. Marx’s demand for practice asks which organized activities reproduce alienation and which agents can alter them. It also warns against replacing theological abstraction with an equally abstract picture of “the human” that conceals conflict and historical difference.',
    ],
    cautions: ['Feuerbach is not merely a discarded stepping-stone or a proto-Marxist.', 'Materialism should not be reduced to the claim that only physical objects are real.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Feuerbach_Ludwig.jpg',
  }),
  curated({
    id: 'capital-alienated-labor', assetId: 'utility-menzel-iron-rolling-mill', parent: 'marx',
    displayName: 'Labor Under the Command of Machinery', shortTitle: 'Alienated Labor', focus: 'LABOR · MACHINERY, COOPERATION, COMMAND, SKILL, AND ALIENATION', dateLabel: 'Marx’s manuscripts 1844 and mature critique · painting 1875',
    question: 'How can collective productive power confront workers as an alien force owned and directed by capital?',
    lead: 'Menzel’s ironworks compresses furnace heat, coordinated bodies, machinery, danger, fatigue, and supervision. Marx distinguishes labor’s human capacity from wage labor organized so that product, process, and social power stand against the producer.',
    ideas: ['Alienation concerns social organization, not simply disliking difficult work.', 'Machinery embodies accumulated knowledge while ownership determines whose power it becomes.', 'Cooperation expands productive capacity and exposes production as irreducibly social.'],
    sectionDetails: [
      'Menzel’s painting distributes attention across furnace glare, muscular exertion, coordinated timing, food, fatigue, and managerial observation. No single worker commands the whole process; the mill’s productivity belongs to their cooperation with machinery. Because the canvas is an ambitious studio painting completed in 1875, its extraordinary detail is still composed rather than mechanically recorded evidence.',
      'In the Economic and Philosophic Manuscripts of 1844, Marx describes alienation from the product, the activity of labor, human species-capacity, and other people. His mature critique more precisely analyzes wage labor, exploitation, cooperation, and machinery. The vocabularies overlap but are not interchangeable: later arguments do not simply repeat a youthful account of estranged consciousness.',
      'Difficult or technologically complex work need not be alienating when producers share control over purposes, pace, knowledge, safety, and surplus. Conversely, a productive system can mobilize collective intelligence while confronting each worker as an external command. The image asks who owns the mill, who sets its rhythm, who bears injury, and who can decide how increased productivity changes working life.',
    ],
    cautions: ['The 1875 painting is a representation, not a documentary factory photograph.', 'Do not treat every use of technology as alienating in the same way.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg',
  }),
  curated({
    id: 'capital-machinery-knowledge', assetId: 'utility-jacquard-loom', parent: 'marx',
    displayName: 'Machinery, Skill, and Encoded Control', shortTitle: 'Machinery and Knowledge', focus: 'MACHINERY · KNOWLEDGE, SKILL, FIXED CAPITAL, AND CONTROL', dateLabel: 'Jacquard technology 19th century · object photographed 2020',
    question: 'When skill is reorganized into machinery, who controls the accumulated knowledge and gains from its productivity?',
    lead: 'The Jacquard mechanism stores a patterned sequence outside the individual weaver. Marx treats machinery as a social form of accumulated knowledge whose effects depend on ownership, workplace authority, labor markets, and struggle.',
    ideas: ['Technical knowledge can be objectified without becoming socially neutral.', 'Machinery may reduce drudgery or intensify pace, surveillance, displacement, and dependence.', 'The relevant unit is a production relation joining worker, machine, owner, market, and state.'],
    sectionDetails: [
      'A Jacquard attachment uses linked punched cards to control which warp threads rise, enabling complex woven patterns to be repeated. The device transfers part of pattern selection into a durable sequence, but operators still prepare, maintain, correct, and work with the mechanism. Calling it automatic can hide the skilled labor distributed around the loom.',
      'In Capital, Marx distinguishes tools handled by a worker from systems of machinery in which motion and coordination increasingly confront workers as properties of capital. Technical knowledge accumulated socially becomes fixed in equipment owned by someone else. That organization can simplify tasks, alter bargaining power, employ new groups of workers, and intensify production without making invention itself the cause of exploitation.',
      'Automation debates go wrong when they ask whether a machine is simply liberating or harmful in isolation. Outcomes depend on ownership, working hours, retraining, income security, worker voice, market competition, and public policy. Productivity could enlarge free time and collective provision, yet under different institutions it can produce unemployment, accelerated pace, surveillance, and a deeper dependence on proprietary systems.',
    ],
    cautions: ['Punched cards alone did not cause industrial exploitation or modern computing.', 'The museum object does not reproduce one typical nineteenth-century workplace.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Jacquard_loom,_photo_1.JPG',
  }),
  curated({
    id: 'capital-commodity-spectacle', assetId: 'utility-crystal-palace-interior', parent: 'marx',
    displayName: 'The World Market on Display', shortTitle: 'Commodity Spectacle', focus: 'COMMODITY · VALUE, EXCHANGE, DISPLAY, AND THE WORLD MARKET', dateLabel: 'Great Exhibition, Crystal Palace, 1851',
    question: 'How do relations among producers take the visible form of relations among things and prices?',
    lead: 'The Crystal Palace arranges goods from many places as a radiant world of comparable objects. Marx’s commodity analysis asks how labor, power, and dependence disappear behind exchange value and the apparently self-moving life of things.',
    ideas: ['A commodity is useful and exchangeable, joining qualitative labor to abstract social comparison.', 'Fetishism names a real social appearance, not merely consumer vanity or advertising.', 'The world market links distant producers while obscuring the unequal conditions of connection.'],
    sectionDetails: [
      'The Crystal Palace’s iron-and-glass interior made thousands of objects appear orderly, abundant, and available to comparison at the Great Exhibition of 1851. Classification by nation, material, or industry emphasized finished achievements while separating them from mines, fields, workshops, transport, and coercive imperial relations. Spectacle here is an organization of attention before it is a judgment about shoppers.',
      'Capital begins with the commodity’s double character: it has a particular use, yet in exchange it enters quantitative relations with unlike goods. Marx connects value to socially necessary abstract labor, not to the buyer’s subjective admiration. Commodity fetishism arises when relations among producers take the objective form of relations among products, prices, and market movements that confront everyone as independent forces.',
      'Calling that appearance fetishistic does not mean prices are imaginary or that consumers can dispel exploitation through better awareness alone. Market dependence is institutionally real. Critical inquiry must reconstruct obscured relations—ownership, labor time, ecology, credit, transport, and state power—while recognizing that no single object label can fully recover the many lives joined by a world market.',
    ],
    cautions: ['The exhibition is context for commodity spectacle, not an illustration or proof of fetishism.', 'Not every displayed object was produced under identical labor relations.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Crystal_Palace_-_interior.jpg',
  }),
  curated({
    id: 'capital-class-revolution-1848', assetId: 'utility-meissonier-barricade', parent: 'marx',
    displayName: '1848: Revolution, Defeat, and Class Conflict', shortTitle: 'The Barricade Aftermath', focus: 'REVOLUTION · CLASS, STATE POWER, DEFEAT, AND HISTORICAL ANALYSIS', dateLabel: 'June Days 1848 · painting c. 1850',
    question: 'How did the revolutions of 1848 force Marx to revise the relation between political rupture, class alliance, and state power?',
    lead: 'Meissonier’s narrow street is filled with the dead after the June Days. The image blocks romantic revolution from view and opens Marx’s more concrete analyses of class fractions, institutions, timing, and defeat.',
    ideas: ['Revolutionary language can conceal conflicts among workers, republicans, property owners, and state forces.', 'Historical outcomes depend on organization and institutions, not an automatic script.', 'Defeat becomes evidence requiring analysis rather than proof that transformation is impossible.'],
    sectionDetails: [
      'Meissonier presents the aftermath rather than the heroic instant of uprising: a barricaded street is reduced to bodies, blood, rubble, and soldiers’ victory. The compressed viewpoint denies spectators a safe panoramic distance. As a graphic artistic response produced around 1850, it conveys the violence of the June Days while still selecting a scene and framing its political meaning.',
      'The February Revolution ended the July Monarchy and established a republic, but conflict deepened after the closure of the National Workshops. Paris workers’ June uprising was violently suppressed by republican forces. In The Class Struggles in France and later The Eighteenth Brumaire, Marx examined shifting alliances among workers, bourgeois republicans, peasants, financiers, officials, and competing political representatives.',
      'These analyses complicate any picture of history moving automatically toward revolution. Class interests require organization and representation; state institutions have inherited capacities; slogans can unite groups whose aims later diverge. Defeat is therefore neither noble destiny nor simple refutation. It is evidence about timing, alliances, material support, coercive power, and the dangers borne by people asked to act on historical predictions.',
    ],
    cautions: ['The painting is graphic and depicts the aftermath of the June Days.', 'These events are not “Marx’s revolution” and followed publication of the Communist Manifesto.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Meissonier_Barricade.jpg',
  }),
  curated({
    id: 'transformations-ricardo-political-economy', assetId: 'utility-ricardo-phillips-portrait', parent: 'marx',
    displayName: 'Before Marx: Ricardo and the Laws of Distribution', shortTitle: 'Ricardo and Distribution', focus: 'POLITICAL ECONOMY · VALUE, WAGES, PROFIT, RENT, AND DISTRIBUTION', dateLabel: 'Ricardo’s Principles published 1817 · portrait c. 1821',
    question: 'How did classical political economy make distribution intelligible—and what does Marx change by historicizing its categories?',
    lead: 'Ricardo asks how social output is divided among wages, profit, and rent. Marx learns from this analytical severity while arguing that labor power, surplus value, and capital are historically specific social relations rather than timeless economic facts.',
    ideas: ['Distribution directs attention to structurally opposed claims on a social product.', 'Marx’s value theory develops through critical engagement with classical political economy.', 'Historicizing a category asks which institutions and relations make it appear natural.'],
    sectionDetails: [
      'Thomas Phillips portrays Ricardo as a prosperous public figure rather than illustrating an economic model. Ricardo had made a fortune in finance and entered Parliament before the portrait was completed. His Principles of Political Economy and Taxation organized inquiry around how output is divided among landlords, capitalists, and laborers, linking rent, wages, profit, and changing conditions of production.',
      'Marx admired Ricardo’s willingness to analyze conflict beneath market harmony while criticizing his categories as insufficiently historical. Marx distinguishes labor, which creates value in his account, from labor-power, the capacity sold for a wage. That distinction helps explain surplus value without claiming that profit is merely a dishonest surcharge imposed after otherwise equal exchange.',
      'Economic categories are abstractions that can disclose regular relations, but they can also make a particular order look universal. Historicizing wages, profit, and capital asks how property law, dispossession, labor markets, households, and states reproduce them. This does not make measurement useless; it demands that models identify their social premises and the conflicts omitted when distribution appears as a technical allocation problem.',
    ],
    cautions: ['Ricardo should not be converted into a proto-Marxist.', 'Shared vocabulary does not erase major differences in value theory, history, and politics.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Portrait_of_David_Ricardo_by_Thomas_Phillips.jpg',
  }),
  curated({
    id: 'transformations-industrial-city', assetId: 'utility-manchester-kersal-moor', parent: 'marx',
    displayName: 'Cottonopolis: The Industrial City as a Social Relation', shortTitle: 'Industrial Manchester', focus: 'CITY · FACTORY, HOUSING, SMOKE, CLASS, AND INFRASTRUCTURE', dateLabel: 'Manchester panorama painted 1852',
    question: 'How does an industrial city materialize the separation and interdependence of classes?',
    lead: 'Wyld looks from pastoral Kersal Moor toward a smoky Manchester whose mills, housing, transport, and capital form one horizon. The city makes industrial accumulation spatial without revealing every life beneath its haze.',
    ideas: ['Urban form coordinates production, circulation, residence, sanitation, and political power.', 'Distance and smoke can turn laboring districts into an abstract industrial sublime.', 'Class is lived through space, time, health, mobility, and access—not only income.'],
    sectionDetails: [
      'William Wyld’s panorama places rustic figures and goats in the foreground while factory chimneys and dense Manchester recede beneath smoke. The contrast composes industrialization as a dramatic horizon viewed from comparative calm. It reveals the city’s scale and atmospheric transformation, but distance compresses crowded streets, hazardous workplaces, and sharply unequal neighborhoods into a visually unified scene.',
      'Manchester was central to the cotton industry and to Friedrich Engels’s investigation in The Condition of the Working Class in England. For Marx and Engels, the industrial city concentrated wage labor, capital, transport, commerce, and political association. Housing patterns and sanitation were not incidental surroundings: they expressed how accumulation organized land, health risks, travel time, and proximity to pollution.',
      'A class relation becomes durable through infrastructure. Rent, street plans, railways, water, policing, and access to green space distribute the costs and advantages of production across daily life. Reading the city this way avoids treating smoke as a picturesque symbol and asks which populations are made visible to investors, hidden from comfortable observers, or forced to spend more time and health reaching work.',
    ],
    cautions: ['The panorama mediates scale and smoke rather than providing neutral urban data.', 'The rural foreground should not be mistaken for an untouched world outside industrial relations.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Wyld,_William_-_Manchester_from_Kersal_Moor,_with_rustic_figures_and_goats_-_Google_Art_Project.jpg',
  }),
  curated({
    id: 'transformations-gendered-labor', assetId: 'utility-redgrave-sempstress', parent: 'marx',
    displayName: 'Work at the Edge of Survival: The Sempstress', shortTitle: 'Gendered Precarious Labor', focus: 'LABOR · GENDER, HOME, WAGES, TIME, AND SOCIAL REPRODUCTION', dateLabel: 'Redgrave painting, 1846',
    question: 'Which forms of labor disappear when the factory worker becomes the only image of industrial capitalism?',
    lead: 'Redgrave’s seamstress works alone at night, linking paid piecework to housing, exhaustion, domestic space, and gendered vulnerability. The scene widens political economy beyond the factory floor.',
    ideas: ['Home-based wage labor blurs production and the daily reproduction of life.', 'Precarity transfers risk and idle time onto the worker while preserving market discipline.', 'Gender organizes which work is visible, valued, protected, or treated as natural duty.'],
    sectionDetails: [
      'Redgrave isolates the seamstress in a dim interior with fabric, tools, and signs of physical exhaustion, translating repetitive piecework into a moral appeal. The painting belongs to a reform culture influenced by public concern over sweated labor and Thomas Hood’s “The Song of the Shirt.” Its sentiment can focus attention while also shaping the worker for middle-class sympathy.',
      'Domestic outwork complicates any model in which industrial labor occurs only in a large mechanized factory. Contractors could distribute tasks to homes, pay by the piece, and shift the cost of workspace, heat, delay, and illness onto workers. In Capital, Marx includes domestic industry within changing systems of manufacture, showing how market discipline reaches beyond a factory owner’s direct supervision.',
      'The image also opens a problem later developed extensively by socialist and feminist theory: paid production relies on cooking, cleaning, care, bodily maintenance, and generational renewal, much of it unpaid or underpaid. Gender helps assign these tasks and devalue associated skills. A complete account of exploitation must follow both wages and the conditions that make workers available to earn them.',
    ],
    cautions: ['This is sentimental reform painting shaped by a middle-class gaze.', 'One figure cannot stand as transparent evidence for every working woman.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Richard_Redgrave_-_The_Sempstress.jpg',
  }),
  curated({
    id: 'transformations-global-cotton', assetId: 'utility-degas-cotton-office', parent: 'marx',
    displayName: 'Cotton After Emancipation: A Global Commodity Chain', shortTitle: 'The Cotton Office', focus: 'COTTON · MERCHANTS, CREDIT, QUALITY, LABOR, AND GLOBAL EXCHANGE', dateLabel: 'New Orleans office painted 1873',
    question: 'What histories and labor relations are compressed into a sample that merchants can inspect, price, and exchange?',
    lead: 'Degas fills a New Orleans office with cotton fibers, papers, conversation, and calculation. The commodity moves through hands that classify and finance it while plantation labor and distant mills remain outside the room.',
    ideas: ['Quality grading and price convert material difference into market comparison.', 'Commodity chains join agriculture, transport, finance, manufacturing, and consumption across borders.', 'Emancipation transformed legal status without ending coercion, racial hierarchy, or unequal labor markets.'],
    sectionDetails: [
      'Degas painted relatives and associates in a New Orleans cotton office during his 1872–1873 visit. Men inspect samples, read, converse, and record transactions; loose fiber is present, but fields and most manual labor are absent. The specificity of individual poses makes commerce look social and embodied even as the room narrows whose participation becomes visible.',
      'A sample allows merchants to judge grade and negotiate price for cotton they do not see being planted, picked, baled, shipped, spun, or woven. Credit, insurance, transport, and information connect these stages. Marx’s commodity analysis helps explain how their interdependence appears in the office as properties of cotton and movements of price rather than as negotiated relations among many workers.',
      'The painting dates to Reconstruction, after legal emancipation in the United States but amid sharecropping, debt dependence, white violence, and restricted political power. A changed labor regime could preserve coercive hierarchies through new contracts and institutions. Following cotton after emancipation therefore prevents both the claim that nothing changed and the claim that formal freedom completed economic liberation.',
    ],
    cautions: ['The painting shows merchants and samples in 1873, not enslaved labor itself.', 'Do not infer the whole cotton economy from one family office.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Edgar_Germain_Hilaire_Degas_016.jpg',
  }),
  curated({
    id: 'transformations-chartist-politics', assetId: 'utility-chartist-kennington-common', parent: 'marx',
    displayName: 'The People’s Charter: Mass Politics Before the Vote', shortTitle: 'Chartist Mass Politics', focus: 'ORGANIZATION · CHARTISM, PETITION, ASSEMBLY, AND DEMOCRATIC POWER', dateLabel: 'Kennington Common, 10 April 1848',
    question: 'How can people excluded from formal representation build political power through organization, petition, press, and assembly?',
    lead: 'Kilburn’s daguerreotype records an enormous Chartist gathering in April 1848. The crowd makes working-class politics visible as organization rather than a passive social condition.',
    ideas: ['A mass movement joins constitutional demands to durable associations and communication networks.', 'Numbers become political only through coordination, strategy, and institutional targets.', 'Democratic inclusion was contested through public presence before it became legal entitlement.'],
    sectionDetails: [
      'The daguerreotype looks across Kennington Common on 10 April 1848, fixing a mass meeting in a medium that required careful positioning and offers limited detail at distance. Its sweep conveys scale but cannot identify the crowd’s varied motives. The restored image should be read alongside reports, movement newspapers, petitions, and official preparations rather than as a complete census.',
      'The People’s Charter demanded universal male suffrage, the secret ballot, equal electoral districts, annual Parliaments, payment for members, and removal of the property qualification for MPs. Chartism sustained national associations, local meetings, lectures, newspapers, and petitions. Internal disagreements over strategy, including “moral force” and “physical force,” show that a shared program did not produce one political method.',
      'Marx and Engels followed Chartism because it demonstrated workers acting as an organized political constituency, but they neither created nor controlled the movement. Its history shows how people excluded from the franchise can build capacities before legal recognition. It also warns that crowd size, petition signatures, and moral urgency need strategy, durable institutions, allies, and leverage to alter governing power.',
    ],
    cautions: ['The restored photograph records one meeting and does not represent every Chartist position.', 'Visible crowd size is not a complete measure of political capacity or support.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Chartist_meeting_on_Kennington_Common_by_William_Edward_Kilburn_1848_-_restoration1.png',
  }),
  curated({
    id: 'transformations-cotton-flows', assetId: 'utility-minard-cotton-flows-1866', parent: 'marx',
    displayName: 'Cotton After Emancipation: The World Market Reroutes', shortTitle: 'Cotton Flows Reroute', focus: 'WORLD MARKET · WAR, SUPPLY, EMPIRE, AND PROPORTIONAL FLOWS', dateLabel: 'Minard comparative map, 1866',
    question: 'How does a supply rupture reorganize distant regions, labor systems, and imperial routes inside one market?',
    lead: 'Minard compares European raw-cotton imports in 1858, 1864, and 1865. The changing bands make the U.S. Civil War disruption and expanding Indian, Egyptian, and Brazilian routes visible without making their labor conditions equally visible.',
    ideas: ['A world market responds dynamically to war, scarcity, prices, transport, and imperial access.', 'Proportional flows reveal changing dependence while suppressing many local differences.', 'A rerouted commodity chain can relocate coercion rather than end it.'],
    sectionDetails: [
      'Minard varies the width of colored bands to compare approximate quantities and origins of cotton imported into Europe before, during, and just after the American Civil War. The graphic lets a visitor apprehend rerouting at a glance. It also converts varied fibers, contracts, distances, and human experiences into commensurable flows selected for a specific analytical purpose.',
      'The blockade and wartime collapse of U.S. exports produced the Lancashire Cotton Famine and encouraged expanded sourcing from India, Egypt, Brazil, and elsewhere. Prices, shipping capacity, merchant credit, colonial infrastructure, and state policy shaped the response. A market disruption in one region thus reorganized cultivation and risk across distant communities that did not participate on equal terms.',
      'Substitution is not the same as emancipation. New supplies could involve indebted cultivators, coerced cropping choices, precarious mill employment, and imperial transport systems even when chattel slavery no longer anchored the same route. The map is most powerful when used as a question generator: after locating a thicker band, visitors should ask which labor regime, ecology, and political authority made it possible.',
    ],
    cautions: ['Minard’s bands are approximate aggregate trade data.', 'The map does not depict labor conditions or provide a complete account of slavery and emancipation.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Carte_figurative_et_approximative_des_quantit%C3%A9s_de_coton_brut_import%C3%A9es_en_Europe_en_1858%2C_en_1864_et_en_1865_LOC_99463789.jpg',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

type InstallationKind = 'utility-work' | 'utility-context' | 'utility-concept';
const layout = (
  id: UtilityLibertyCapitalSupplementalExhibitId,
  parentExhibitId: 'bentham' | 'mill' | 'marx',
  zoneId: 'nineteenth-utilitarian-reform' | 'nineteenth-liberty-equality' | 'nineteenth-labor-capital' | 'nineteenth-social-transformations',
  position: {x: number; z: number},
  rotationY: number,
  assetId: UtilityLibertyCapitalGalleryAssetId,
  mediaWidth: number,
  mediaHeight: number,
  installationKind: InstallationKind,
  accent: string,
) => authorSupplementalLayout({
  id: id as MuseumSupplementalExhibitId,
  parentExhibitId,
  guidedAfterExhibitId: parentExhibitId,
  zoneId,
  position,
  rotationY,
  assetId: assetId as MuseumAssetId,
  mediaWidth,
  mediaHeight,
  installationKind: installationKind as MuseumSupplementalInstallationKind,
  accent,
});

export const UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout('utility-bentham-young-reformer', 'bentham', 'nineteenth-utilitarian-reform', {x: -5.55, z: -26.88}, 0, 'utility-bentham-frye-youth', 1.8, 2.7, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.industryGold),
  layout('utility-penitentiary-reform', 'bentham', 'nineteenth-utilitarian-reform', {x: -5.55, z: -15.12}, Math.PI, 'utility-millbank-penitentiary-1829', 3.2, 2.22, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.charcoal),
  layout('utility-law-public-judgment', 'bentham', 'nineteenth-utilitarian-reform', {x: 5.55, z: -26.88}, 0, 'utility-old-bailey-1808', 3.12, 2.36, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.reformBlue),
  layout('utility-suffering-moral-standing', 'bentham', 'nineteenth-utilitarian-reform', {x: 5.55, z: -15.12}, Math.PI, 'utility-hogarth-first-cruelty', 2.22, 2.7, 'utility-concept', UTILITY_LIBERTY_CAPITAL_PALETTE.civicRed),
  layout('liberty-romantic-formation', 'mill', 'nineteenth-liberty-equality', {x: -5.55, z: -12.88}, 0, 'liberty-wordsworth-helvellyn', 2.2, 2.7, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.plum),
  layout('liberty-harriet-collaboration', 'mill', 'nineteenth-liberty-equality', {x: -10.85, z: -7}, Math.PI / 2, 'liberty-harriet-taylor-npg', 2.2, 2.7, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.civicRed),
  layout('liberty-cooperative-experiments', 'mill', 'nineteenth-liberty-equality', {x: -5.55, z: -1.12}, Math.PI, 'liberty-rochdale-pioneers-shop', 3.12, 2.15, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.laborGreen),
  layout('liberty-public-assembly', 'mill', 'nineteenth-liberty-equality', {x: 5.55, z: -12.88}, 0, 'liberty-hyde-park-railings-1866', 3.1, 2.27, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.reformBlue),
  layout('liberty-womens-suffrage', 'mill', 'nineteenth-liberty-equality', {x: 10.85, z: -7}, -Math.PI / 2, 'liberty-suffrage-petition-newcombe', 3.05, 2.73, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.civicRed),
  layout('liberty-imperial-exception', 'mill', 'nineteenth-liberty-equality', {x: 5.55, z: -1.12}, Math.PI, 'liberty-east-india-company-coins', 3.05, 2.29, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.industryGold),
  layout('capital-feuerbach-inversion', 'marx', 'nineteenth-labor-capital', {x: -5.55, z: 1.12}, 0, 'utility-feuerbach-weger-engraving', 2.08, 2.7, 'utility-concept', UTILITY_LIBERTY_CAPITAL_PALETTE.plum),
  layout('capital-alienated-labor', 'marx', 'nineteenth-labor-capital', {x: -5.55, z: 12.88}, Math.PI, 'utility-menzel-iron-rolling-mill', 3.2, 1.98, 'utility-concept', UTILITY_LIBERTY_CAPITAL_PALETTE.civicRed),
  layout('capital-machinery-knowledge', 'marx', 'nineteenth-labor-capital', {x: 5.55, z: 1.12}, 0, 'utility-jacquard-loom', 3.05, 2.29, 'utility-concept', UTILITY_LIBERTY_CAPITAL_PALETTE.industryGold),
  layout('capital-commodity-spectacle', 'marx', 'nineteenth-labor-capital', {x: 10.85, z: 7}, -Math.PI / 2, 'utility-crystal-palace-interior', 3.2, 2.01, 'utility-concept', UTILITY_LIBERTY_CAPITAL_PALETTE.reformBlue),
  layout('capital-class-revolution-1848', 'marx', 'nineteenth-labor-capital', {x: 5.55, z: 12.88}, Math.PI, 'utility-meissonier-barricade', 2, 2.7, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.civicRed),
  layout('transformations-ricardo-political-economy', 'marx', 'nineteenth-social-transformations', {x: -5.55, z: 15.12}, 0, 'utility-ricardo-phillips-portrait', 2.09, 2.7, 'utility-concept', UTILITY_LIBERTY_CAPITAL_PALETTE.industryGold),
  layout('transformations-industrial-city', 'marx', 'nineteenth-social-transformations', {x: -10.85, z: 21}, Math.PI / 2, 'utility-manchester-kersal-moor', 3.2, 2.05, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.charcoal),
  layout('transformations-gendered-labor', 'marx', 'nineteenth-social-transformations', {x: -5.55, z: 26.88}, Math.PI, 'utility-redgrave-sempstress', 3.05, 2.55, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.plum),
  layout('transformations-global-cotton', 'marx', 'nineteenth-social-transformations', {x: 5.55, z: 15.12}, 0, 'utility-degas-cotton-office', 3.12, 2.46, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.industryGold),
  layout('transformations-chartist-politics', 'marx', 'nineteenth-social-transformations', {x: 10.85, z: 21}, -Math.PI / 2, 'utility-chartist-kennington-common', 3.2, 2.28, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.civicRed),
  layout('transformations-cotton-flows', 'marx', 'nineteenth-social-transformations', {x: 5.55, z: 26.88}, Math.PI, 'utility-minard-cotton-flows-1866', 3.2, 2.04, 'utility-context', UTILITY_LIBERTY_CAPITAL_PALETTE.reformBlue),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getUtilityLibertyCapitalSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 20 supplemental exhibit ${id} is missing.`);
  return record;
};
