import type {NavigableAppRoute} from '../../routing/routes';
import type {MuseumAssetId} from './museumAssetTypes';
import {
  FEMINIST_PHILOSOPHIES_GALLERY_ID,
  FEMINIST_PHILOSOPHIES_ROOM_SIGN_COPY,
  getFeministPhilosophiesInstallationSlot,
} from './feministPhilosophiesGalleryCuration';
import {
  FEMINIST_PHILOSOPHIES_GALLERY_ASSETS,
  type FeministPhilosophiesGalleryAssetId,
} from './feministPhilosophiesGalleryAssets';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
} from './museumSupplementalAuthoring';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export {FEMINIST_PHILOSOPHIES_GALLERY_ID, FEMINIST_PHILOSOPHIES_ROOM_SIGN_COPY};

export const FEMINIST_PHILOSOPHIES_PALETTE = Object.freeze({
  ink: '#2d2932',
  suffrageViolet: '#755b82',
  abolitionGold: '#9b763d',
  situatedBlue: '#536f82',
  careGreen: '#5d7567',
  embodiedRose: '#8b5e68',
  coalitionRed: '#8a504d',
});

export type FeministPhilosophiesSupplementalExhibitId =
  | 'feminist-cooper-voice-education'
  | 'feminist-truth-abolition-rights'
  | 'feminist-crenshaw-intersectionality'
  | 'feminist-standpoint-situated-objectivity'
  | 'feminist-care-dependency-labor'
  | 'feminist-astell-reason-education'
  | 'feminist-wollstonecraft-manufactured-inequality'
  | 'feminist-de-gouges-citizenship'
  | 'feminist-bluestocking-intellectual-publics'
  | 'feminist-education-domesticity'
  | 'feminist-abolition-convention-exclusion'
  | 'beauvoir-labor-and-immanence'
  | 'beauvoir-situation-and-place'
  | 'beauvoir-second-sex-movement'
  | 'beauvoir-aging-and-otherness'
  | 'beauvoir-boupacha-colonial-violence'
  | 'butler-performativity-and-action'
  | 'butler-trans-livability'
  | 'butler-disability-dependency'
  | 'butler-coalition-and-contestation'
  | 'butler-assembly-precarity';

type Parent = 'feminist-philosophy' | 'beauvoir' | 'judith-butler';
type AcademicReference = Readonly<{label: string; url: string}>;
type CuratedInput = {
  id: FeministPhilosophiesSupplementalExhibitId;
  assetId: FeministPhilosophiesGalleryAssetId;
  parent: Parent;
  displayName: string;
  shortTitle: string;
  focus: string;
  dateLabel: string;
  question: string;
  lead: string;
  evidence: string;
  argument: string;
  dispute: string;
  cautions: readonly [string, string];
  academicSource: AcademicReference;
  articleActionLabel?: string;
};

const FEMINIST_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Feminist Philosophy',
  url: 'https://plato.stanford.edu/entries/feminist-philosophy/',
};
const EPISTEMOLOGY_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Feminist Epistemology and Philosophy of Science',
  url: 'https://plato.stanford.edu/entries/feminism-epistemology/',
};
const INTERSECTIONALITY_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Feminist Perspectives on Intersectionality',
  url: 'https://plato.stanford.edu/entries/feminism-intersectionality/',
};
const ETHICS_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Feminist Ethics',
  url: 'https://plato.stanford.edu/entries/feminism-ethics/',
};
const WOLLSTONECRAFT_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Mary Wollstonecraft',
  url: 'https://plato.stanford.edu/entries/wollstonecraft/',
};
const BEAUVOIR_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Simone de Beauvoir',
  url: 'https://plato.stanford.edu/entries/beauvoir/',
};
const BODY_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Feminist Perspectives on the Body',
  url: 'https://plato.stanford.edu/entries/feminist-body/',
};
const GENDER_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Feminist Perspectives on Sex and Gender',
  url: 'https://plato.stanford.edu/entries/feminism-gender/',
};
const DISABILITY_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Feminist Perspectives on Disability',
  url: 'https://plato.stanford.edu/entries/feminism-disability/',
};

const parentRoute = (parent: Parent): NavigableAppRoute => parent === 'feminist-philosophy'
  ? {kind: 'branch', branchId: parent}
  : {kind: 'philosopher', philosopherId: parent};

const imageSource = (assetId: FeministPhilosophiesGalleryAssetId) => {
  const record = FEMINIST_PHILOSOPHIES_GALLERY_ASSETS.find(({id}) => id === assetId);
  if (!record) throw new Error(`Gallery 25 asset source ${assetId} is missing.`);
  return {label: `${record.institution} — displayed image record`, url: record.sourcePageUrl, kind: 'collection-record' as const};
};

const academic = ({label, url}: AcademicReference) => ({
  label, url, kind: 'academic-reference' as const,
});

const curated = (input: CuratedInput): MuseumSupplementalExhibit =>
  authorSupplementalExhibit({
    id: input.id as MuseumSupplementalExhibitId,
    assetId: input.assetId as MuseumAssetId,
    displayName: input.displayName,
    shortTitle: input.shortTitle,
    workLabel: input.focus,
    dateLabel: input.dateLabel,
    question: input.question,
    frontSubtitle: input.question,
    lead: input.lead,
    keyIdeas: [input.evidence, input.argument, input.dispute],
    cautions: input.cautions,
    sections: [
      {heading: 'Read the evidence', paragraph: input.evidence},
      {heading: 'Follow the argument', paragraph: input.argument},
      {heading: 'Keep the dispute open', paragraph: input.dispute},
    ],
    sources: [imageSource(input.assetId), academic(input.academicSource)],
    articleRoute: parentRoute(input.parent),
    articleActionLabel: input.articleActionLabel,
    entityKind: input.parent === 'feminist-philosophy' ? 'branch' : 'philosopher',
    panelKicker: 'Gallery 25 work and context exhibit',
  });

export const FEMINIST_PHILOSOPHIES_SUPPLEMENTAL_EXHIBITS = [
  curated({
    id: 'feminist-cooper-voice-education', assetId: 'feminist-cooper-m-street-school', parent: 'feminist-philosophy',
    displayName: 'Anna Julia Cooper: Voice, Education, and Black Women’s Authority', shortTitle: 'A Voice from the South',
    focus: 'BLACK FEMINIST THOUGHT · EDUCATION, RACE, GENDER, PUBLIC VOICE, AND INSTITUTIONS', dateLabel: 'A Voice from the South published 1892 · M Street principalship 1902–1906',
    question: 'What changes when Black women speak as theorists of democracy rather than as evidence inside someone else’s reform program?',
    lead: 'Anna Julia Cooper joined philosophical argument to teaching and institution-building. A Voice from the South rejects accounts of progress that ask Black women to wait behind racial uplift defined by men or womanhood defined by white reformers. Education matters not as private refinement but as authority to interpret a social order and participate in changing it.',
    evidence: 'M Street High School marks an institution Cooper led, not merely a building associated with her name. Her defense of a demanding curriculum challenged paternalistic assumptions that Black students required only industrial training and demonstrated how educational standards become political decisions about whose intellect is cultivated.',
    argument: 'Cooper’s “voice” is neither solitary self-expression nor a claim that identity guarantees truth. It is a demand that democratic knowledge include people positioned at intersecting structures of race and sex, whose exclusion leaves both racial and women’s movements unable to understand the freedom they profess.',
    dispute: 'Cooper’s language of uplift, civilization, and educated leadership belongs to nineteenth-century debates and invites criticism about class hierarchy. Read her institutional work and later scholarship alongside the radical reach of her claim that freedom cannot be achieved by sacrificing the most subordinated members of a group.',
    cautions: ['The 2008 school photograph preserves a site; it does not depict Cooper’s principalship or classroom practice.', 'Do not collapse Cooper into a precursor whose value lies only in anticipating later intersectionality.'],
    academicSource: FEMINIST_REFERENCE,
  }),
  curated({
    id: 'feminist-truth-abolition-rights', assetId: 'feminist-truth-self-representation', parent: 'feminist-philosophy',
    displayName: 'Sojourner Truth: Abolition, Womanhood, and Authored Presence', shortTitle: 'Abolition and Womanhood',
    focus: 'ABOLITION · ENSLAVEMENT, WOMEN’S RIGHTS, SPEECH, RELIGION, AND SELF-REPRESENTATION', dateLabel: 'Lifetime carte-de-visite dated 1864 · speeches survive through mediated reports',
    question: 'How do race, enslavement, labor, and gender unsettle the supposedly universal subject of women’s rights?',
    lead: 'Sojourner Truth brought an emancipated Black woman’s authority into abolitionist, religious, and women’s-rights publics that often separated race from sex. Her speeches survive in conflicting transcriptions, while the photographs she sold offered a different authored record: a chosen pose, a commercial strategy, and a declaration that she could control the circulation of her image.',
    evidence: 'The carte-de-visite is not a passive likeness. Truth sold such cards to support her work and paired them with a claim that she sold the shadow to sustain the substance. That practice makes media, economic independence, and public authority part of the evidence rather than treating the photograph as decoration.',
    argument: 'Truth’s intervention exposes how ideals of feminine delicacy were racialized and classed. Experiences of coerced labor and family separation could not fit a politics built around protected domestic womanhood. The point is not that hardship proves personhood, but that rights language fails when its model citizen quietly excludes those it addresses.',
    dispute: 'The famous “Ain’t I a Woman?” version was published years later in a dialect unlike Truth’s own speech. Responsible interpretation compares transcripts and avoids making one line carry her whole career, which included land, migration, religion, abolition, labor, and claims for reparative support.',
    cautions: ['The lifetime portrait is authored self-presentation, not transparent access to Truth’s inner life.', 'Quote attributions and dialect require source criticism; the most famous transcript is not a verbatim record.'],
    academicSource: FEMINIST_REFERENCE,
  }),
  curated({
    id: 'feminist-crenshaw-intersectionality', assetId: 'feminist-crenshaw-intersectionality', parent: 'feminist-philosophy',
    displayName: 'Kimberlé Crenshaw: Intersectionality as Structural Analysis', shortTitle: 'Intersectionality',
    focus: 'LAW · STRUCTURAL INTERSECTIONALITY, REPRESENTATION, RACE, GENDER, AND REMEDY', dateLabel: 'Foundational legal articles published 1989 and 1991',
    question: 'Why can a remedy for race discrimination or sex discrimination fail precisely where both structures meet?',
    lead: 'Kimberlé Crenshaw introduced intersectionality through legal analysis of cases in which Black women’s discrimination claims disappeared between frameworks designed around Black men or white women. The concept names how institutions, remedies, and political representation can be organized so that a person located at more than one structured axis becomes unintelligible to each category taken alone.',
    evidence: 'The legal cases matter because intersectionality is not merely a richer personal identity description. Courts decided what kind of group could count, whose employment histories established discrimination, and whether combined claims were administratively recognizable. Institutional categories produced gaps with material consequences.',
    argument: 'Structural intersectionality shows that race, gender, class, immigration status, and other relations can reorganize one another rather than simply adding burdens. Political intersectionality asks how movements organized around one axis can marginalize members whose priorities complicate a unified public agenda.',
    dispute: 'The term now circulates far beyond its legal origin. That reach can support better analysis, but checklist use can drain it of power, history, and remedy. A strong application specifies the institution, mechanism, comparison group, and practical consequence instead of announcing that everything intersects.',
    cautions: ['Intersectionality is not a ranking of who is most oppressed or a requirement to list every identity.', 'The portrait establishes Crenshaw’s public presence; the legal argument must be read in the cases and articles.'],
    academicSource: INTERSECTIONALITY_REFERENCE,
  }),
  curated({
    id: 'feminist-standpoint-situated-objectivity', assetId: 'feminist-situated-knowledge-computers', parent: 'feminist-philosophy',
    displayName: 'Standpoint and Situated Knowledge: Objectivity from Somewhere', shortTitle: 'Situated Knowledge',
    focus: 'EPISTEMOLOGY · STANDPOINT, LABOR, POWER, EVIDENCE, AND STRONG OBJECTIVITY', dateLabel: 'Feminist standpoint debates developed across the late twentieth century',
    question: 'Can acknowledging social location make inquiry more objective rather than less?',
    lead: 'Feminist standpoint theories challenge the fantasy of a view from nowhere without claiming that every experience is automatically correct. Social organization distributes work, risk, access, and credibility. People required to navigate dominant institutions from subordinated positions may encounter contradictions those institutions make easy for more advantaged participants not to notice.',
    evidence: 'The NACA office makes scientific production visibly collective. Calculation, clerical organization, engineering credit, segregation, hiring, and promotion shaped what became knowledge. The image does not prove a standpoint; it asks visitors to trace the labor and authority that a finished technical result can conceal.',
    argument: 'A standpoint is an achieved critical position, not a biological possession. Inquiry can become stronger when investigators identify how questions, samples, concepts, and standards arose, then expose them to people differently affected by the research. Situated accountability is offered as a discipline of objectivity.',
    dispute: 'Critics worry about romanticizing marginalization, treating groups as internally uniform, or replacing evidence with identity. Standpoint theorists answer in different ways. The productive question is which social relations generate ignorance and which practices make claims more answerable to counterevidence.',
    cautions: ['The women in the NACA photograph did not all occupy one political or epistemic standpoint.', 'Situated knowledge does not mean that any belief is true for whoever holds it.'],
    academicSource: EPISTEMOLOGY_REFERENCE,
  }),
  curated({
    id: 'feminist-care-dependency-labor', assetId: 'feminist-care-laundry-child', parent: 'feminist-philosophy',
    displayName: 'Care, Dependency, and the Labor that Sustains Persons', shortTitle: 'Care and Dependency',
    focus: 'FEMINIST ETHICS · CARE, DEPENDENCY, MAINTENANCE, LABOR, AND PUBLIC POLICY', dateLabel: 'Care-ethics debates developed from the 1980s onward',
    question: 'What moral and political theories become possible when dependency is treated as a human condition rather than an exception?',
    lead: 'Feminist ethics brought child care, disability support, household maintenance, nursing, emotional labor, and interdependence into theories that often imagined independent adults meeting as equals. Care can be attentive, skilled, and sustaining, yet it is also allocated through gender, race, class, migration, and markets that expose some caregivers to exhaustion and coercion.',
    evidence: 'The laundry photograph joins infant care to repetitive physical work. It cannot reveal the woman’s own circumstances, but it makes simultaneous demands visible. A philosophical account should ask who controls time, who receives rest, what resources exist, and whether care is recognized as public infrastructure.',
    argument: 'Dependency does not cancel autonomy; relationships and institutions help make agency possible. Care ethics therefore evaluates responsiveness, trust, embodied need, and unequal power alongside general rules. Political approaches ask how care work should be shared, supported, and governed rather than left to private virtue.',
    dispute: 'Celebrating care can romanticize sacrifice or reinstall women as natural caregivers. Universal policies can also overlook different needs and family forms. The field remains divided over how care relates to justice, markets, professional standards, disability politics, and the right to refuse exploitative demands.',
    cautions: ['The unidentified subject must not become a sentimental emblem of natural female care.', 'Care is a contested practice and institution, not an essentially feminine moral capacity.'],
    academicSource: ETHICS_REFERENCE,
  }),
  curated({
    id: 'feminist-astell-reason-education', assetId: 'feminist-astell-learned-woman', parent: 'feminist-philosophy',
    displayName: 'Mary Astell: Reason, Education, and Freedom in Marriage', shortTitle: 'A Serious Proposal',
    focus: 'EARLY MODERN PHILOSOPHY · REASON, EDUCATION, MARRIAGE, AUTHORITY, AND RELIGION', dateLabel: 'A Serious Proposal to the Ladies published 1694 and 1697',
    question: 'If women possess rational souls, what could justify educating them for dependence?',
    lead: 'Mary Astell used the period’s own commitments to rational souls, moral responsibility, and resistance to arbitrary authority against women’s denied education and subordination in marriage. Her proposed female educational community offered intellectual formation beyond a social world that trained women to pursue appearance, flattery, and advantageous marriage.',
    evidence: 'The learned-woman frontispiece belongs to a nearby print culture, not to Astell’s biography. It helps reconstruct the available visual ideal of a learned woman while its attribution limits prevent the gallery from turning it into a false portrait.',
    argument: 'Astell’s challenge works as an internal critique: if reason grounds responsibility, women require the education needed to exercise it. Her Reflections upon Marriage presses political language further by asking why arbitrary power condemned in government should become acceptable inside the household.',
    dispute: 'Astell was a conservative Anglican and royalist, and her project did not advocate modern democratic equality across class or religion. Those commitments complicate rather than erase the force of her arguments about education and domestic authority.',
    cautions: ['The displayed frontispiece is not Mary Astell and is labeled as a period comparison.', 'Do not convert Astell’s specific religious and political project into a timeless liberal feminism.'],
    academicSource: FEMINIST_REFERENCE,
  }),
  curated({
    id: 'feminist-wollstonecraft-manufactured-inequality', assetId: 'feminist-wollstonecraft-portrait', parent: 'feminist-philosophy',
    displayName: 'Mary Wollstonecraft: Manufactured Inequality', shortTitle: 'Rights of Woman',
    focus: 'ENLIGHTENMENT · EDUCATION, VIRTUE, CITIZENSHIP, DEPENDENCE, AND REVOLUTION', dateLabel: 'A Vindication of the Rights of Woman published 1792',
    question: 'What appears natural only because institutions train people to perform it?',
    lead: 'Mary Wollstonecraft argues that women’s apparent frivolity, weakness, and dependence cannot justify exclusion when education and social reward systematically cultivate those traits. A society that expects women to be rational mothers and companions while denying serious education contradicts its own account of virtue and citizenship.',
    evidence: 'John Opie’s portrait offers a verified lifetime likeness but not a picture of Wollstonecraft’s argument. The philosophical evidence lies in her comparison of educational practices, economic dependence, marriage, manners, and revolutionary declarations of universal rights.',
    argument: 'Virtue cannot be sex-specific if it rests on reason and responsibility. Wollstonecraft therefore connects private formation to public freedom: dependent subjects trained to manipulate rather than deliberate cannot participate as equal citizens, and men’s character is also damaged by arbitrary privilege.',
    dispute: 'Her rhetoric sometimes accepts civilizational hierarchies, idealizes middle-class domesticity, or disparages women shaped by the very system she criticizes. Readers should preserve the structural insight while examining class, empire, sexuality, and forms of life her remedy leaves narrow.',
    cautions: ['The portrait cannot verify personality, virtue, or a single stable political identity.', 'Wollstonecraft’s universalism should be read with its classed and imperial limits visible.'],
    academicSource: WOLLSTONECRAFT_REFERENCE,
  }),
  curated({
    id: 'feminist-de-gouges-citizenship', assetId: 'feminist-de-gouges-presumed-portrait', parent: 'feminist-philosophy',
    displayName: 'Olympe de Gouges: Revolution and the Woman Citizen', shortTitle: 'Woman and the Citizen',
    focus: 'FRENCH REVOLUTION · CITIZENSHIP, LAW, PUBLIC SPEECH, SLAVERY, AND PUNISHMENT', dateLabel: 'Declaration of the Rights of Woman and the Female Citizen published 1791',
    question: 'What does a universal declaration reveal when its subject is rewritten as explicitly female?',
    lead: 'Olympe de Gouges rewrote revolutionary rights language article by article to expose how “man” could operate as both universal humanity and an exclusionary male citizen. She joined women’s civil and political status to public authorship, marriage reform, children’s recognition, taxation, property, and opposition to slavery.',
    evidence: 'The displayed portrait is only presumed to represent de Gouges. That uncertainty matters because fame encourages viewers to treat an attractive likeness as proof of identity. The reliable evidence is her published political theater, pamphlets, declarations, and documented execution in 1793.',
    argument: 'Repetition becomes critique: if women can be punished by the state and bear civic burdens, they must be able to speak, legislate, own, and appear publicly as citizens. The declaration tests whether revolutionary universality survives when its hidden gender is made explicit.',
    dispute: 'De Gouges’s positions shifted within a volatile revolution, and her antislavery writing involved representational limits of its own. She should neither be reduced to a martyr for modern feminism nor detached from struggles over empire, race, class, and political violence.',
    cautions: ['The sitter’s identity is uncertain and the gallery never presents the image as verified.', 'Modern feminist citizenship categories should not erase the declaration’s revolutionary and colonial setting.'],
    academicSource: FEMINIST_REFERENCE,
  }),
  curated({
    id: 'feminist-bluestocking-intellectual-publics', assetId: 'feminist-bluestocking-muses', parent: 'feminist-philosophy',
    displayName: 'Bluestocking Publics: Recognition and Its Boundaries', shortTitle: 'Women’s Intellectual Publics',
    focus: 'EIGHTEENTH-CENTURY PUBLICS · AUTHORSHIP, SALONS, PATRONAGE, REPUTATION, AND CLASS', dateLabel: 'The Nine Living Muses published 1778',
    question: 'Who becomes recognizable as an intellectual, and which forms of labor make that recognition possible?',
    lead: 'Eighteenth-century women built networks of reading, patronage, correspondence, conversation, publication, and criticism despite legal and educational constraints. Bluestocking circles challenged assumptions about women’s intellectual incapacity, yet public recognition remained shaped by class, race, empire, respectability, and access to leisure.',
    evidence: 'The Nine Living Muses gathers celebrated women into an imagined classical scene. It is evidence of cultural recognition and myth-making, not a documentary meeting. The absent household workers, colonial wealth, publishers, and less respectable writers are part of the image’s institutional frame.',
    argument: 'Intellectual agency is social. Authorship depends on rooms, readers, money, reputation, education, and protection from scandal. Expanding the canon therefore requires more than adding names; it asks how archives and institutions made some forms of women’s thought collectible and others disposable.',
    dispute: 'A women’s public can contest male authority while policing its own boundaries. Visitors should compare elite strategies of respectability with dissenting religious, abolitionist, working-class, and Black women’s publics rather than treating “women writers” as one coherent constituency.',
    cautions: ['The group image is allegorical and does not show an actual gathering.', 'Visibility within an elite circle should not be mistaken for universal access to intellectual life.'],
    academicSource: FEMINIST_REFERENCE,
  }),
  curated({
    id: 'feminist-education-domesticity', assetId: 'feminist-education-domestic-science', parent: 'feminist-philosophy',
    displayName: 'Education, Expertise, and the Domestic Boundary', shortTitle: 'Domestic Science',
    focus: 'EDUCATION · PROFESSIONALIZATION, HOUSEHOLD LABOR, SCIENCE, CLASS, AND GENDER', dateLabel: 'Ohio State Normal College classroom photographed 1913',
    question: 'Can professionalizing domestic knowledge open authority while preserving the boundary that confines women to it?',
    lead: 'Domestic science translated cooking, sanitation, nutrition, budgeting, and household management into college curricula and public expertise. It could create education and employment for women while also directing their knowledge toward a gendered sphere assumed to be their proper social destination.',
    evidence: 'The classroom shows equipment, repeated workstations, and collective instruction. It makes expertise visible without telling us what students wanted or where they worked afterward. The same institutional scene can contain opportunity, discipline, and social sorting.',
    argument: 'Feminist analysis asks not whether domestic knowledge is intellectually serious—it is—but why necessary labor is distributed, valued, and governed as it is. Professional recognition can challenge contempt while leaving unpaid work and racialized service relations untouched.',
    dispute: 'Dismissal of domestic science can repeat the devaluation of feminized labor; celebration can romanticize domestic assignment. Better questions follow budgets, credentials, wages, migration, technology, disability, and the power to choose or refuse a role.',
    cautions: ['The students’ motives and later lives cannot be inferred from the photograph.', 'Domestic skill is not naturally women’s work, and professionalization does not automatically redistribute unpaid labor.'],
    academicSource: ETHICS_REFERENCE,
  }),
  curated({
    id: 'feminist-abolition-convention-exclusion', assetId: 'feminist-abolition-convention', parent: 'feminist-philosophy',
    displayName: 'Abolitionist Convention: Coalition and Exclusion', shortTitle: 'The 1840 Convention',
    focus: 'ABOLITION · DELEGATE STATUS, WOMEN’S RIGHTS, PUBLIC SPEECH, RACE, AND COALITION', dateLabel: 'World Anti-Slavery Convention held 1840 · commemorative painting completed 1841',
    question: 'How can a movement against domination reproduce exclusion inside its own public procedures?',
    lead: 'At the 1840 World Anti-Slavery Convention in London, women delegates from the United States were denied full participation and seated apart. The dispute became one route into organized women’s rights, but it must remain inside abolition’s broader Black Atlantic history rather than becoming a simple origin story owned by white reformers.',
    evidence: 'Haydon’s commemorative painting arranges recognizable figures and places women observers to the side. As a constructed public memory, it records whom patrons wanted represented and how the gathering was staged after the fact, not every conflict or participant’s experience.',
    argument: 'Procedures define the political subject. A movement may proclaim universal emancipation while rules of credentialing, speech, seating, and agenda-setting decide whose reasons count. Coalition requires attention to those mechanisms, not only agreement on an abstract cause.',
    dispute: 'Narratives that move directly from London to Seneca Falls can marginalize Black women’s abolitionist work and make antislavery politics background for another movement. The more accurate route traces overlapping alliances, racism, strategic conflict, and changing claims about citizenship.',
    cautions: ['The painting is a selective commemoration, not a photograph or complete attendance record.', 'Do not turn women’s exclusion into a white-only origin myth for feminism.'],
    academicSource: FEMINIST_REFERENCE,
  }),
  curated({
    id: 'beauvoir-labor-and-immanence', assetId: 'feminist-labor-washerwoman', parent: 'beauvoir',
    displayName: 'Labor, Immanence, and Projects that Open a Future', shortTitle: 'Labor and Immanence',
    focus: 'THE SECOND SEX · HOUSEWORK, RECURRENCE, ECONOMIC INDEPENDENCE, AND AMBIGUOUS FREEDOM', dateLabel: 'The Second Sex published in French 1949',
    question: 'When does necessary repetitive labor sustain freedom, and when is a person confined to repetition?',
    lead: 'Beauvoir contrasts transcendence—projects that reach beyond a settled present—with immanence, a condition of enclosure and repetitive maintenance. She does not mean that bodily or household work lacks value. The injustice lies in assigning one group to recurrence while others claim open-ended projects, public recognition, and economic authority.',
    evidence: 'The laundry worker’s unidentified life cannot be read directly through Beauvoir. The photograph instead makes duration, bodily effort, equipment, and accumulated material visible, then asks who controls the work, receives its benefit, and can leave it.',
    argument: 'Economic participation can expand independence, but paid work alone does not end domination when wages, care obligations, harassment, law, and household divisions remain unequal. Freedom is situated: material options and social meanings shape which projects are genuinely available.',
    dispute: 'Beauvoir’s language can devalue maintenance or treat masculine-coded production as the model of transcendence. Care, disability, ecological, and labor theorists press the account to recognize sustaining activity as shared world-making without romanticizing forced service.',
    cautions: ['The worker predates Beauvoir and is not evidence for a single universal female condition.', 'Immanence should not be equated with care or repetitive work as such; confinement and unequal assignment are central.'],
    academicSource: BEAUVOIR_REFERENCE,
  }),
  curated({
    id: 'beauvoir-situation-and-place', assetId: 'feminist-situation-paris-street', parent: 'beauvoir',
    displayName: 'Situation: Freedom Begins in a World Already Underway', shortTitle: 'Situated Freedom',
    focus: 'EXISTENTIAL PHENOMENOLOGY · BODY, HISTORY, PLACE, HABIT, POSSIBILITY, AND RESPONSIBILITY', dateLabel: 'The Ethics of Ambiguity published 1947 · The Second Sex 1949',
    question: 'How can freedom be real without pretending that everyone begins with the same possibilities?',
    lead: 'For Beauvoir, a person is neither a fixed thing nor a disembodied chooser. Freedom takes shape within a situation: body, history, institutions, relationships, risks, habits, and meanings that precede action but do not dictate one inevitable future. Responsibility concerns how projects take up and transform those conditions.',
    evidence: 'The Paris street predates Beauvoir’s career and was only later associated with her name. Its layered reception helps distinguish a lived social situation from the tourist map of a famous intellectual’s neighborhood.',
    argument: 'Oppression works by narrowing practical possibility and treating a person as an object defined from outside. Yet Beauvoir resists turning constraint into destiny. Situated agency requires material and collective conditions through which more people can pursue projects and recognize one another as freedoms.',
    dispute: 'How much freedom remains under severe domination is a recurring tension in existential ethics. Critics also ask whether Beauvoir’s early framework adequately addressed race, colonialism, and economic structure. Her later political engagements and changing work should not be projected backward as a seamless system.',
    cautions: ['The street image is reception context and does not depict Beauvoir.', 'Situated freedom neither blames oppressed people for their conditions nor erases agency under constraint.'],
    academicSource: BEAUVOIR_REFERENCE,
  }),
  curated({
    id: 'beauvoir-second-sex-movement', assetId: 'feminist-womens-day-petrograd', parent: 'beauvoir',
    displayName: 'From “One Is Not Born” to Collective Transformation', shortTitle: 'The Second Sex in Motion',
    focus: 'THE SECOND SEX · SOCIAL BECOMING, MYTH, EMBODIMENT, HISTORY, AND COLLECTIVE CHANGE', dateLabel: 'The Second Sex published 1949 · feminist receptions transformed it thereafter',
    question: 'How does a socially produced condition become changeable without becoming unreal?',
    lead: '“One is not born, but rather becomes, a woman” condenses Beauvoir’s analysis of social becoming: bodies are lived through myths, education, work, sexuality, law, and expectations that shape possibility. The claim does not deny embodiment; it rejects the inference from bodily difference to a fixed social destiny.',
    evidence: 'The 1917 Petrograd demonstration belongs to another place, politics, and generation. It is comparison evidence that gendered subjects act collectively within history, not an illustration Beauvoir selected or a movement caused by her book.',
    argument: 'Woman is constructed as the Other relative to a male subject treated as neutral humanity. Myths of femininity make this hierarchy appear natural. Transformation therefore requires more than private refusal: economic, reproductive, legal, educational, and political relations must change.',
    dispute: 'The Second Sex has been criticized for racial, colonial, class, heterosexual, and able-bodied assumptions, as well as passages that readers experience as hostile to pregnancy or female embodiment. Its importance lies partly in the arguments later feminists revised, contested, and redirected.',
    cautions: ['The Petrograd march predates Beauvoir and must remain a comparative political history.', 'Do not make Beauvoir the origin or universal spokesperson of feminist social-construction arguments.'],
    academicSource: BODY_REFERENCE,
  }),
  curated({
    id: 'beauvoir-aging-and-otherness', assetId: 'feminist-aging-portrait', parent: 'beauvoir',
    displayName: 'Old Age: A Future Treated as Someone Else’s', shortTitle: 'Aging and Otherness',
    focus: 'THE COMING OF AGE · EMBODIMENT, TIME, SOCIAL DEATH, WORK, AND RECIPROCITY', dateLabel: 'La Vieillesse published 1970',
    question: 'Why do societies treat old age as an alien condition even though it is a possible future of every life?',
    lead: 'In The Coming of Age, Beauvoir examines aging across biology, lived experience, work, poverty, institutions, history, and representation. Old age is bodily, but the meaning and hardship attached to it are socially organized. A culture can praise longevity while isolating actual older people from work, reciprocity, authority, and public presence.',
    evidence: 'The unidentified sitter confronts the viewer as a particular person while the archive supplies almost no biography. That gap models Beauvoir’s warning: “the aged” becomes an abstract category when individual projects, relations, and voices disappear.',
    argument: 'Aging reveals temporal otherness. People often imagine their older self as someone else and organize institutions around that disavowal. Justice requires material security and opportunities for meaningful projects, not only benevolent care delivered to passive recipients.',
    dispute: 'Aging is not one experience. Disability, race, gender, class, sexuality, work history, family, and geography change its conditions. Beauvoir’s large synthesis can generalize too broadly, so contemporary gerontology and disability theory should test rather than merely inherit it.',
    cautions: ['The sitter is unidentified; no diagnosis, class position, or self-understanding should be invented.', 'Old age is not equivalent to disability, dependence, or social withdrawal.'],
    academicSource: BEAUVOIR_REFERENCE,
  }),
  curated({
    id: 'beauvoir-boupacha-colonial-violence', assetId: 'feminist-boupacha-solidarity', parent: 'beauvoir',
    displayName: 'Djamila Boupacha: Testimony, Advocacy, and Colonial Torture', shortTitle: 'The Boupacha Campaign',
    focus: 'ALGERIAN WAR · TORTURE, TESTIMONY, LEGAL ADVOCACY, SOLIDARITY, AND REPRESENTATION', dateLabel: 'Campaign led by Gisèle Halimi and Simone de Beauvoir, 1960–1962',
    question: 'How can solidarity amplify testimony without replacing the person whose violence made the case possible?',
    lead: 'Djamila Boupacha, an Algerian FLN member, reported rape and torture by French forces after her 1960 arrest. Lawyer Gisèle Halimi and Simone de Beauvoir helped publicize the case and expose colonial violence denied by the French state. The campaign demonstrates both the necessity and the representational risks of famous advocacy.',
    evidence: 'The 1963 photograph shows Boupacha after release, not during torture or trial. It restores her visible presence after records that often center European advocates, but it cannot disclose trauma, intention, or the whole Algerian struggle.',
    argument: 'Solidarity can use access to courts, publishers, and international publics to make suppressed violence contestable. Ethical advocacy remains answerable to testimony and political context rather than converting another person’s suffering into proof of the advocate’s courage.',
    dispute: 'The case sits inside anticolonial war, nationalist politics, gendered violence, and postwar memory. Beauvoir’s role matters, but Boupacha and Halimi must not become supporting characters in an existentialist biography or a simple story of metropolitan rescue.',
    cautions: ['The photograph postdates the campaign and cannot illustrate the torture or courtroom evidence.', 'Boupacha’s agency and Algeria’s anticolonial struggle remain primary; Beauvoir is one participant in the advocacy network.'],
    academicSource: BEAUVOIR_REFERENCE,
  }),
  curated({
    id: 'butler-performativity-and-action', assetId: 'feminist-act-up-assembly', parent: 'judith-butler',
    displayName: 'Performativity: Norms Repeated Through Action', shortTitle: 'Performativity',
    focus: 'GENDER TROUBLE · CITATION, RECOGNITION, NORMS, EMBODIED ACTION, AND RESIGNIFICATION', dateLabel: 'Gender Trouble published 1990 · Bodies That Matter 1993',
    question: 'How can gender be socially produced without becoming a costume an individual freely chooses?',
    lead: 'Butler’s performativity names the repeated social acts, norms, classifications, and recognitions through which gender appears natural and stable. It is not the claim that gender is a theatrical role selected at will. Subjects become intelligible through norms they did not invent, yet repetition is never perfectly identical and can be contested.',
    evidence: 'ACT UP’s demonstration shows coordinated embodied action confronting an institution, not a visual proof of performativity. Signs, chants, occupation, risk, cameras, and bodily presence make claims possible through conventions activists also transform.',
    argument: 'A performative act does not express a fully formed identity waiting behind it; reiterated practices help constitute the identity recognized by others. Because norms depend on repetition, parody, refusal, coalition, and altered citation can expose their contingency without guaranteeing liberation.',
    dispute: 'Critics have worried that discourse eclipses material bodies or organized politics. Butler’s later work emphasizes vulnerability, war, precarity, and assembly, while debates continue over agency, sex, language, and how theory relates to trans and feminist movements.',
    cautions: ['Performativity is not voluntary performance, deception, or the denial of bodily materiality.', 'ACT UP has its own activist history and is not an illustration produced for Butler’s argument.'],
    academicSource: GENDER_REFERENCE,
  }),
  curated({
    id: 'butler-trans-livability', assetId: 'feminist-trans-visibility-march', parent: 'judith-butler',
    displayName: 'Trans Livability Beyond Recognition Alone', shortTitle: 'Trans Livability',
    focus: 'RECOGNITION · TRANS LIFE, VIOLENCE, HEALTH, LAW, VISIBILITY, AND SELF-DETERMINATION', dateLabel: 'Trans visibility march photographed 2019 · debates remain ongoing',
    question: 'What makes a life livable beyond being recognized by a dominant norm?',
    lead: 'Butler asks how norms decide which bodies and kinships become intelligible, grievable, or protected. Trans politics makes the stakes concrete: legal documents, health care, housing, work, safety, language, and self-determination shape livability. Recognition can support survival while also demanding conformity or increasing exposure.',
    evidence: 'The march records collective visibility, pride, mourning, and demand. It cannot represent all trans people, especially those unable or unwilling to appear publicly. Visibility is a strategy under conditions of unequal risk, not an uncomplicated measure of progress.',
    argument: 'If recognition is granted only to people who fit established categories, inclusion can preserve the norm that produced exclusion. Livability requires changing institutions and material conditions while respecting self-description, embodiment, and forms of kinship not authorized in advance.',
    dispute: 'Trans philosophers and activists are not applications of Butler and often criticize frameworks built without their experience. Disputes over sex, gender, medicine, law, and feminism require precise claims and attention to consequences rather than using Butler as final authority.',
    cautions: ['One U.S. march cannot stand for global trans histories or internally diverse communities.', 'Visibility can bring recognition and danger; it is not the same as safety, health care, or material freedom.'],
    academicSource: GENDER_REFERENCE,
  }),
  curated({
    id: 'butler-disability-dependency', assetId: 'feminist-disability-access-protest', parent: 'judith-butler',
    displayName: 'Dependency, Disability, and the Infrastructure of Agency', shortTitle: 'Access and Dependency',
    focus: 'DISABILITY FEMINISM · ACCESS, INTERDEPENDENCE, CARE, INFRASTRUCTURE, AND PUBLIC SPACE', dateLabel: 'Manchester accessible-transport demonstration, 8 September 1991',
    question: 'What if dependence reveals the social infrastructure of every agency rather than a defect in some bodies?',
    lead: 'Feminist disability theory challenges ideals of autonomy built around an unmarked independent body. Everyone relies on social, material, and ecological supports, but access is distributed unequally and some dependencies are stigmatized. Butler’s account of vulnerability can join this analysis only when disability histories and expertise remain distinct.',
    evidence: 'The bus protest identifies a designed barrier and a political target. Inaccessibility is not located solely in an individual body; vehicles, curbs, schedules, funding, law, and public priorities create or remove exclusion.',
    argument: 'Agency is enabled, not diminished, by reliable supports. Recognizing interdependence shifts attention from charitable accommodation to collective obligation and design. It also complicates care: assistance must support self-determination rather than convert need into paternal authority.',
    dispute: 'Vulnerability language can flatten differences or portray disabled people mainly as fragile. Disability movements emphasize expertise, conflict, sexuality, work, pleasure, and direct action. Any synthesis with Butler must preserve those political genealogies and disagreements.',
    cautions: ['Disability activism is not a metaphor for dependence; it is an authored political history.', 'The event date is 1991 despite later digital upload metadata.'],
    academicSource: DISABILITY_REFERENCE,
  }),
  curated({
    id: 'butler-coalition-and-contestation', assetId: 'feminist-queer-coalition-krakow', parent: 'judith-butler',
    displayName: 'Coalition Without a Final Shared Identity', shortTitle: 'Contested Coalition',
    focus: 'QUEER AND FEMINIST POLITICS · ALLIANCE, DIFFERENCE, DEMOCRACY, CONFLICT, AND SOLIDARITY', dateLabel: 'Kraków Equality March photographed 21 May 2022',
    question: 'Can people act together without first agreeing on one identity that contains them all?',
    lead: 'Butler treats coalition as a political practice that need not wait for a perfectly unified subject called “women” or “the people.” Groups can align around demands while remaining differently positioned and internally disputatious. The absence of final unity is not failure; it can make revision and accountability possible.',
    evidence: 'The Kraków march places rainbow and women’s-strike symbols within one public action. Visible proximity documents a contingent alliance, not a complete map of demands, organizations, or private agreement.',
    argument: 'Identity categories can mobilize resistance and also police membership. Coalition shifts the question from discovering the group’s true essence to building conditions under which different participants can act, disagree, and renegotiate common demands without erasure.',
    dispute: 'Open-ended coalition can conceal power if the best-resourced group sets language, risk, and agenda. Durable solidarity needs procedures, translation, redistribution, and ways to address harm—not only celebration of plurality or a shared opponent.',
    cautions: ['Visible symbols do not prove consensus or equal power among participants.', 'Coalition should not erase the specific Polish legal, religious, and political context of the march.'],
    academicSource: GENDER_REFERENCE,
  }),
  curated({
    id: 'butler-assembly-precarity', assetId: 'feminist-public-assembly-ithaca', parent: 'judith-butler',
    displayName: 'Assembly: Bodies Making a Public Claim', shortTitle: 'Bodies in Alliance',
    focus: 'NOTES TOWARD A PERFORMATIVE THEORY OF ASSEMBLY · PRECARITY, PUBLIC SPACE, SUPPORT, AND DEMOCRACY', dateLabel: 'Women’s March photographed 21 January 2017',
    question: 'What political claim is made before every participant speaks the same sentence?',
    lead: 'In Butler’s work on assembly, bodies gathered in streets and squares make a claim through persistence, exposure, movement, and mutual support. Public appearance contests whose bodies may occupy space and whose needs count. Assemblies also depend on transport, food, care, communication, sanitation, and media that political imagery often hides.',
    evidence: 'The panoramic photograph shows scale and occupation but not agreement. Its width makes the crowd appear as one body while individual motives disappear, a useful warning against reading assembly as a unified will.',
    argument: 'Precarity is politically distributed vulnerability to injury, displacement, poverty, and abandonment. Acting together can disclose that distribution and demand sustaining infrastructure. The assembly is performative because it enacts a public relation while naming what institutions deny.',
    dispute: 'Not every crowd is emancipatory, and the ability to assemble is unequal. Policing, disability access, work, migration status, digital surveillance, and caregiving determine who can appear. Democratic analysis must ask what happens before, within, and after the photographed moment.',
    cautions: ['A crowd is not automatically democratic, feminist, or unified.', 'The Ithaca march did not arise from Butler’s theory and should be interpreted through its own local participants and demands.'],
    academicSource: GENDER_REFERENCE,
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

type InstallationKind = 'feminist-work' | 'feminist-context' | 'feminist-concept';

const layout = ({
  id, parentExhibitId, guidedAfterExhibitId, slotId, assetId,
  mediaWidth, mediaHeight, installationKind, accent,
}: {
  id: FeministPhilosophiesSupplementalExhibitId;
  parentExhibitId: Parent;
  guidedAfterExhibitId?: Parent;
  slotId: string;
  assetId: FeministPhilosophiesGalleryAssetId;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: InstallationKind;
  accent: string;
}): MuseumSupplementalExhibitLayout => {
  const authoredSlot = getFeministPhilosophiesInstallationSlot(slotId);
  const position = {x: authoredSlot.x, z: authoredSlot.z};
  const authored = authorSupplementalLayout({
    id: id as MuseumSupplementalExhibitId,
    parentExhibitId,
    guidedAfterExhibitId: guidedAfterExhibitId ?? parentExhibitId,
    zoneId: authoredSlot.spatialCellId,
    position,
    rotationY: authoredSlot.rotationY,
    assetId: assetId as MuseumAssetId,
    mediaWidth,
    mediaHeight,
    installationKind: installationKind as MuseumSupplementalInstallationKind,
    accent,
    width: 3.58,
  });
  return {
    ...authored,
    interactionRadius: 3.3,
    viewpoint: {
      x: position.x + Math.sin(authoredSlot.rotationY) * authoredSlot.supplementalViewpointDistance,
      z: position.z + Math.cos(authoredSlot.rotationY) * authoredSlot.supplementalViewpointDistance,
      yaw: authoredSlot.rotationY,
      pitch: -.055,
    },
  };
};

export const FEMINIST_PHILOSOPHIES_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'feminist-cooper-voice-education', parentExhibitId: 'feminist-philosophy', slotId: 'feminist-orientation-genealogies:west-outer', assetId: 'feminist-cooper-m-street-school', mediaWidth: 3.18, mediaHeight: 1.62, installationKind: 'feminist-context', accent: FEMINIST_PHILOSOPHIES_PALETTE.abolitionGold}),
  layout({id: 'feminist-truth-abolition-rights', parentExhibitId: 'feminist-philosophy', slotId: 'feminist-orientation-genealogies:east-room-face', assetId: 'feminist-truth-self-representation', mediaWidth: 1.62, mediaHeight: 2.7, installationKind: 'feminist-work', accent: FEMINIST_PHILOSOPHIES_PALETTE.abolitionGold}),
  layout({id: 'feminist-crenshaw-intersectionality', parentExhibitId: 'feminist-philosophy', slotId: 'feminist-orientation-genealogies:east-cross-face', assetId: 'feminist-crenshaw-intersectionality', mediaWidth: 3.18, mediaHeight: 2.08, installationKind: 'feminist-concept', accent: FEMINIST_PHILOSOPHIES_PALETTE.coalitionRed}),
  layout({id: 'feminist-standpoint-situated-objectivity', parentExhibitId: 'feminist-philosophy', slotId: 'feminist-orientation-genealogies:south-room-face', assetId: 'feminist-situated-knowledge-computers', mediaWidth: 3.18, mediaHeight: 2.49, installationKind: 'feminist-concept', accent: FEMINIST_PHILOSOPHIES_PALETTE.situatedBlue}),
  layout({id: 'feminist-care-dependency-labor', parentExhibitId: 'feminist-philosophy', slotId: 'feminist-orientation-genealogies:south-cross-face', assetId: 'feminist-care-laundry-child', mediaWidth: 3.18, mediaHeight: 2.43, installationKind: 'feminist-context', accent: FEMINIST_PHILOSOPHIES_PALETTE.careGreen}),

  layout({id: 'feminist-astell-reason-education', parentExhibitId: 'feminist-philosophy', guidedAfterExhibitId: 'feminist-philosophy', slotId: 'feminist-early-genealogies:north-outer', assetId: 'feminist-astell-learned-woman', mediaWidth: 1.63, mediaHeight: 2.7, installationKind: 'feminist-work', accent: FEMINIST_PHILOSOPHIES_PALETTE.suffrageViolet}),
  layout({id: 'feminist-wollstonecraft-manufactured-inequality', parentExhibitId: 'feminist-philosophy', guidedAfterExhibitId: 'feminist-philosophy', slotId: 'feminist-early-genealogies:east-outer', assetId: 'feminist-wollstonecraft-portrait', mediaWidth: 2.24, mediaHeight: 2.7, installationKind: 'feminist-work', accent: FEMINIST_PHILOSOPHIES_PALETTE.suffrageViolet}),
  layout({id: 'feminist-de-gouges-citizenship', parentExhibitId: 'feminist-philosophy', guidedAfterExhibitId: 'feminist-philosophy', slotId: 'feminist-early-genealogies:west-room-face', assetId: 'feminist-de-gouges-presumed-portrait', mediaWidth: 2.4, mediaHeight: 2.7, installationKind: 'feminist-work', accent: FEMINIST_PHILOSOPHIES_PALETTE.coalitionRed}),
  layout({id: 'feminist-bluestocking-intellectual-publics', parentExhibitId: 'feminist-philosophy', guidedAfterExhibitId: 'feminist-philosophy', slotId: 'feminist-early-genealogies:west-cross-face', assetId: 'feminist-bluestocking-muses', mediaWidth: 3.18, mediaHeight: 2.48, installationKind: 'feminist-context', accent: FEMINIST_PHILOSOPHIES_PALETTE.abolitionGold}),
  layout({id: 'feminist-education-domesticity', parentExhibitId: 'feminist-philosophy', guidedAfterExhibitId: 'feminist-philosophy', slotId: 'feminist-early-genealogies:south-room-face', assetId: 'feminist-education-domestic-science', mediaWidth: 3.18, mediaHeight: 2.56, installationKind: 'feminist-context', accent: FEMINIST_PHILOSOPHIES_PALETTE.careGreen}),
  layout({id: 'feminist-abolition-convention-exclusion', parentExhibitId: 'feminist-philosophy', guidedAfterExhibitId: 'feminist-philosophy', slotId: 'feminist-early-genealogies:south-cross-face', assetId: 'feminist-abolition-convention', mediaWidth: 3.18, mediaHeight: 2.47, installationKind: 'feminist-context', accent: FEMINIST_PHILOSOPHIES_PALETTE.abolitionGold}),

  layout({id: 'beauvoir-labor-and-immanence', parentExhibitId: 'beauvoir', slotId: 'feminist-situated-freedom:south-outer', assetId: 'feminist-labor-washerwoman', mediaWidth: 1.99, mediaHeight: 2.7, installationKind: 'feminist-context', accent: FEMINIST_PHILOSOPHIES_PALETTE.careGreen}),
  layout({id: 'beauvoir-situation-and-place', parentExhibitId: 'beauvoir', slotId: 'feminist-situated-freedom:west-room-face', assetId: 'feminist-situation-paris-street', mediaWidth: 3.18, mediaHeight: 2.36, installationKind: 'feminist-context', accent: FEMINIST_PHILOSOPHIES_PALETTE.situatedBlue}),
  layout({id: 'beauvoir-second-sex-movement', parentExhibitId: 'beauvoir', slotId: 'feminist-situated-freedom:west-cross-face', assetId: 'feminist-womens-day-petrograd', mediaWidth: 3.18, mediaHeight: 2.45, installationKind: 'feminist-concept', accent: FEMINIST_PHILOSOPHIES_PALETTE.coalitionRed}),
  layout({id: 'beauvoir-aging-and-otherness', parentExhibitId: 'beauvoir', slotId: 'feminist-situated-freedom:north-room-face', assetId: 'feminist-aging-portrait', mediaWidth: 2.1, mediaHeight: 2.7, installationKind: 'feminist-context', accent: FEMINIST_PHILOSOPHIES_PALETTE.embodiedRose}),
  layout({id: 'beauvoir-boupacha-colonial-violence', parentExhibitId: 'beauvoir', slotId: 'feminist-situated-freedom:north-cross-face', assetId: 'feminist-boupacha-solidarity', mediaWidth: 2.66, mediaHeight: 2.7, installationKind: 'feminist-context', accent: FEMINIST_PHILOSOPHIES_PALETTE.coalitionRed}),

  layout({id: 'butler-performativity-and-action', parentExhibitId: 'judith-butler', slotId: 'feminist-gender-norms:south-outer', assetId: 'feminist-act-up-assembly', mediaWidth: 3.18, mediaHeight: 2.22, installationKind: 'feminist-concept', accent: FEMINIST_PHILOSOPHIES_PALETTE.coalitionRed}),
  layout({id: 'butler-trans-livability', parentExhibitId: 'judith-butler', slotId: 'feminist-gender-norms:east-room-face', assetId: 'feminist-trans-visibility-march', mediaWidth: 3.18, mediaHeight: 2.12, installationKind: 'feminist-context', accent: FEMINIST_PHILOSOPHIES_PALETTE.suffrageViolet}),
  layout({id: 'butler-disability-dependency', parentExhibitId: 'judith-butler', slotId: 'feminist-gender-norms:east-cross-face', assetId: 'feminist-disability-access-protest', mediaWidth: 1.9, mediaHeight: 2.7, installationKind: 'feminist-context', accent: FEMINIST_PHILOSOPHIES_PALETTE.careGreen}),
  layout({id: 'butler-coalition-and-contestation', parentExhibitId: 'judith-butler', slotId: 'feminist-gender-norms:north-room-face', assetId: 'feminist-queer-coalition-krakow', mediaWidth: 2.02, mediaHeight: 2.7, installationKind: 'feminist-context', accent: FEMINIST_PHILOSOPHIES_PALETTE.suffrageViolet}),
  layout({id: 'butler-assembly-precarity', parentExhibitId: 'judith-butler', slotId: 'feminist-gender-norms:north-cross-face', assetId: 'feminist-public-assembly-ithaca', mediaWidth: 3.18, mediaHeight: 1.14, installationKind: 'feminist-concept', accent: FEMINIST_PHILOSOPHIES_PALETTE.situatedBlue}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getFeministPhilosophiesSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = FEMINIST_PHILOSOPHIES_SUPPLEMENTAL_EXHIBITS.find(({id: value}) => value === id);
  if (!record) throw new Error(`Gallery 25 supplemental exhibit ${id} is missing.`);
  return record;
};
