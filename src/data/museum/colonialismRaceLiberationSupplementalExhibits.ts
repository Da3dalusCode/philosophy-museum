import type {NavigableAppRoute} from '../../routing/routes';
import type {MuseumAssetId} from './museumAssetTypes';
import {
  COLONIALISM_RACE_LIBERATION_GALLERY_ID,
  COLONIALISM_RACE_LIBERATION_ROOM_SIGN_COPY,
} from './colonialismRaceLiberationGalleryCuration';
import {
  COLONIALISM_RACE_LIBERATION_GALLERY_ASSETS,
  type ColonialismRaceLiberationGalleryAssetId,
} from './colonialismRaceLiberationGalleryAssets';
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

export {
  COLONIALISM_RACE_LIBERATION_GALLERY_ID,
  COLONIALISM_RACE_LIBERATION_ROOM_SIGN_COPY,
};

export const COLONIALISM_RACE_LIBERATION_PALETTE = Object.freeze({
  ink: '#292d32',
  anticolonialRed: '#8a4f46',
  clinicBlue: '#4f6d78',
  liberationGold: '#9a753f',
  abolitionPlum: '#70546e',
  pedagogyGreen: '#557064',
  oceanIndigo: '#4c5f7a',
});

export type ColonialismRaceLiberationSupplementalExhibitId =
  | 'fanon-racializing-gaze'
  | 'fanon-colonial-psychiatry'
  | 'fanon-algerian-revolution'
  | 'fanon-violence-decolonization'
  | 'fanon-national-consciousness'
  | 'davis-prison-abolition'
  | 'davis-race-gender-class'
  | 'hooks-margin-center'
  | 'hooks-engaged-pedagogy-love'
  | 'cesaire-colonialism-thingification'
  | 'dubois-color-line-colonial-world'
  | 'said-orientalism-representation'
  | 'spivak-subaltern-representation'
  | 'ngugi-language-decolonization'
  | 'wynter-humanism-coloniality';

type PrimaryParent = 'fanon' | 'angela-davis' | 'bell-hooks';

type AcademicReference = Readonly<{
  label: string;
  url: string;
}>;

type CuratedInput = {
  id: ColonialismRaceLiberationSupplementalExhibitId;
  assetId: ColonialismRaceLiberationGalleryAssetId;
  parent: PrimaryParent;
  displayName: string;
  shortTitle: string;
  focus: string;
  dateLabel: string;
  question: string;
  lead: string;
  ideas: readonly [string, string, string];
  cautions: readonly [string, string];
  academicSource: AcademicReference;
  articleRoute?: NavigableAppRoute;
  articleActionLabel?: string;
};

const FANON_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Frantz Fanon',
  url: 'https://plato.stanford.edu/entries/frantz-fanon/',
};
const DAVIS_REFERENCE = {
  label: 'University of California, Santa Cruz — Angela Davis directory profile',
  url: 'https://campusdirectory.ucsc.edu/cd_detail?uid=aydavis',
};
const HOOKS_REFERENCE = {
  label: 'Berea College bell hooks Center — About bell hooks',
  url: 'https://www.berea.edu/centers/the-bell-hooks-center/about-bell',
};
const COLONIALISM_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — Colonialism',
  url: 'https://plato.stanford.edu/entries/colonialism/',
};
const DUBOIS_REFERENCE = {
  label: 'Stanford Encyclopedia of Philosophy — W. E. B. Du Bois',
  url: 'https://plato.stanford.edu/entries/dubois/',
};
const NGUGI_REFERENCE = {
  label: 'UC Irvine School of Humanities — The power of language',
  url: 'https://www.humanities.uci.edu/news/power-language',
};
const WYNTER_REFERENCE = {
  label: 'Stanford Historical Society — Sylvia Wynter oral history',
  url: 'https://historicalsociety.stanford.edu/sylvia-wynter',
};

const parentRoute = (parent: PrimaryParent): NavigableAppRoute => ({
  kind: 'philosopher',
  philosopherId: parent,
});

const imageSource = (assetId: ColonialismRaceLiberationGalleryAssetId) => {
  const asset = COLONIALISM_RACE_LIBERATION_GALLERY_ASSETS.find(
    (record) => record.id === assetId,
  );
  if (!asset) throw new Error(`Gallery 26 asset source ${assetId} is missing.`);
  return {
    label: `${asset.institution} — displayed image record`,
    url: asset.sourcePageUrl,
    kind: 'collection-record' as const,
  };
};

const academic = ({label, url}: AcademicReference) => ({
  label,
  url,
  kind: 'academic-reference' as const,
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
    keyIdeas: input.ideas,
    cautions: input.cautions,
    sections: [
      {heading: 'Read the evidence', paragraph: input.ideas[0]},
      {heading: 'Follow the argument', paragraph: input.ideas[1]},
      {heading: 'Keep the dispute open', paragraph: input.ideas[2]},
    ],
    sources: [imageSource(input.assetId), academic(input.academicSource)],
    articleRoute: input.articleRoute ?? parentRoute(input.parent),
    articleActionLabel: input.articleActionLabel,
    entityKind: 'philosopher',
    panelKicker: 'Gallery 26 work and context exhibit',
  });

export const COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBITS = [
  curated({
    id: 'fanon-racializing-gaze',
    assetId: 'colonial-fanon-racial-schema',
    parent: 'fanon',
    displayName: 'The Racializing Gaze and the Lived Body',
    shortTitle: 'The Racializing Gaze',
    focus: 'BLACK SKIN, WHITE MASKS · SOCIOGENY, EMBODIMENT, LANGUAGE, AND RECOGNITION',
    dateLabel: 'Black Skin, White Masks published in French in 1952',
    question: 'How can a racial order enter bodily experience without race becoming a biological destiny or an isolated private feeling?',
    lead: 'In Black Skin, White Masks, Fanon combines psychiatry, phenomenology, literature, psychoanalysis, and political history to ask what colonial antiblackness does to a person’s relation to body, language, desire, and other people. His account is sociogenic: the injuries he describes are produced through a social world of institutions, images, expectations, and unequal recognition. A racializing encounter can interrupt ordinary bodily orientation and force someone to negotiate a public identity imposed before action or speech. Fanon is not proposing that skin carries a natural psychology. He is diagnosing how a historically made racial order can be lived as though it were immediate and inescapable.',
    ideas: [
      'The displayed image is evidence of a material culture that trained viewers to classify bodies. It cannot illustrate every Black experience, but it helps visitors notice that a gaze is never merely one person looking. Schools, advertising, colonial administration, medicine, popular entertainment, and inherited language teach which meanings seem instantly visible. Fanon’s “epidermal racial schema” names the violent overlay of those public meanings upon the body; it does not turn racial categories into anatomy.',
      'Fanon revises phenomenological descriptions of embodiment by showing that social hostility can fracture the unreflective ease with which a person normally moves through space. He also studies language and assimilation: mastery of the colonizer’s language may promise status while requiring distance from racialized origins. These analyses expose recognition as political, yet some chapters rely on dated psychoanalytic claims and troubling generalizations about women, sexuality, and interracial desire. Those limits belong inside the interpretation, not in a footnote outside it.',
      'The beginner’s key distinction is between identity and fixation. Fanon does not ask Black people to deny history or culture; he opposes a world in which a person must become the racial essence another has assigned. Liberation therefore requires more than private self-esteem. It demands changes to the institutions, images, economic relations, and forms of recognition that keep reproducing the scene. Read the 1952 book beside his later revolutionary writings without pretending his vocabulary or political emphasis stayed unchanged.',
    ],
    cautions: [
      'The Oklahoma segregation photograph is comparative evidence from the United States, not a scene from Fanon’s Martinique, France, or Algeria.',
      'His analyses of gender, sexuality, and interracial desire contain serious limits and must not be universalized.',
    ],
    academicSource: FANON_REFERENCE,
  }),
  curated({
    id: 'fanon-colonial-psychiatry',
    assetId: 'colonial-fanon-clinic',
    parent: 'fanon',
    displayName: 'The Clinic Inside a Colonial Order',
    shortTitle: 'Colonial Psychiatry',
    focus: 'PSYCHIATRY · INSTITUTION, SOCIAL THERAPY, CULTURE, AND COLONIAL VIOLENCE',
    dateLabel: 'Fanon worked at Blida-Joinville Hospital in Algeria, 1953–1956',
    question: 'Can psychiatric care become liberating while the hospital, profession, and surrounding society remain organized by colonial domination?',
    lead: 'Fanon arrived at Blida-Joinville psychiatric hospital in colonial Algeria in 1953 after medical training in France and formative work with psychiatrist François Tosquelles. He experimented with forms of social therapy that treated the ward as a human environment rather than a warehouse for isolated symptoms. Activities, meetings, occupational practices, and changes to staff–patient relations could restore agency and social connection. Yet Fanon also learned that methods developed for European patients could fail when imposed without attention to Algerian language, religion, community, and colonial experience. The clinic became a site where medicine’s categories and the political order supporting them had to be examined together.',
    ideas: [
      'A hospital image makes institutional scale visible: corridors, locked boundaries, schedules, diagnostic files, professional hierarchies, and everyday care shape what counts as illness and recovery. Fanon did not conclude that all mental suffering was only politics. He asked how war, racism, displacement, torture, and cultural dislocation entered clinical life, and how a therapeutic institution might reproduce the very objectification it claimed to cure.',
      'Fanon’s psychiatric writing includes case histories and experiments with culturally responsive activities, but it should not be turned into a solitary-hero story. Nurses, patients, colleagues, earlier institutional psychotherapy, and local knowledge all mattered. Nor was his practice free of the era’s coercive assumptions. In 1956 he resigned, arguing that a colonial society systematically produced dehumanization that medicine alone could not repair; he then committed himself openly to the Algerian revolution.',
      'The continuing problem is double: do not medicalize political injury as an individual defect, and do not erase the particular needs of patients by treating every symptom as a political symbol. Trauma can persist after formal independence, while psychiatric systems can still distribute credibility and confinement unequally. Fanon’s clinic invites institutional critique joined to careful care, not a choice between medicine and politics.',
    ],
    cautions: [
      'Social therapy at Blida was collaborative and historically situated; it was not Fanon’s unaided invention.',
      'Political explanation does not make every psychiatric symptom identical or eliminate the need for individual care.',
    ],
    academicSource: FANON_REFERENCE,
  }),
  curated({
    id: 'fanon-algerian-revolution',
    assetId: 'colonial-fanon-algerian-revolution',
    parent: 'fanon',
    displayName: 'Choosing a Revolution Across Borders',
    shortTitle: 'Fanon and Algeria',
    focus: 'ALGERIAN REVOLUTION · FLN, WRITING, DIPLOMACY, AND POLITICAL BELONGING',
    dateLabel: 'Algerian War of Independence, 1954–1962 · Fanon died in 1961',
    question: 'How did a Martinican psychiatrist come to speak and act within the Algerian struggle without his biography becoming a simple national origin story?',
    lead: 'Fanon was born in Martinique, served in the Free French forces during the Second World War, studied in France, and moved to colonial Algeria as a psychiatrist. After resigning from Blida-Joinville, he worked with the National Liberation Front, wrote for El Moudjahid, and represented the Algerian movement in African diplomatic networks. His belonging to the revolution was therefore a political commitment forged across Caribbean, French, Algerian, and continental African settings—not evidence that identity follows birthplace alone. It also placed him inside an organization and conflict whose strategies, internal differences, civilian costs, and postwar authority cannot be reduced to one writer.',
    ideas: [
      'The displayed revolutionary evidence records a collective struggle rather than Fanon’s personal authorship of Algerian independence. Rural fighters, urban organizers, women carrying out visible and concealed work, workers, prisoners, diplomats, families, and competing political organizations shaped the war. French counterinsurgency used torture, detention, displacement, and collective punishment. Keeping this wider field visible prevents a famous theorist from absorbing the agency of millions.',
      'Fanon’s journalism and diplomatic work expanded his analysis from the intimate racializing encounter toward military occupation, national culture, African solidarity, and the political institutions needed after liberation. He argued that anticolonial struggle could make new collective agency possible, but he did not treat national identity as ancient purity. A nation had to be built through participation and political education, and could be betrayed when elites substituted flags and offices for social transformation.',
      'Readers should resist two retrospective memberships. Fanon is a major anticolonial and Africana thinker whose work later decolonial theorists use, but he did not belong to a later “coloniality” school. He also cannot be made the representative voice of every Algerian. His transnational position is philosophically important precisely because it raises questions of solidarity, authorization, translation, and the difference between joining a struggle and owning its meaning.',
    ],
    cautions: [
      'Fanon was Martinican and joined the Algerian struggle; do not rewrite him as Algerian by birth.',
      'His later decolonial reception does not make him a member of a school formulated after his death.',
    ],
    academicSource: FANON_REFERENCE,
  }),
  curated({
    id: 'fanon-violence-decolonization',
    assetId: 'colonial-fanon-war-displacement',
    parent: 'fanon',
    displayName: 'Violence Under Colonial Conditions',
    shortTitle: 'The Violence Debate',
    focus: 'THE WRETCHED OF THE EARTH · COERCION, COUNTERVIOLENCE, AGENCY, AND TRAUMA',
    dateLabel: 'The Wretched of the Earth published in 1961 during the Algerian war',
    question: 'What does Fanon claim violence can do in a colonial struggle, and what disappears when the book is reduced to celebration or condemnation?',
    lead: 'The Wretched of the Earth begins from a colonial order already maintained through conquest, police, military force, segregated space, land seizure, and the daily threat of punishment. Fanon argues that anticolonial counterviolence can break the colonized person’s imposed passivity and produce collective agency. That claim is morally and politically explosive. It is not softened by pretending he was merely describing violence, yet neither is it accurate to extract a universal command to kill. Fanon analyzes a specific structure, different revolutionary strategies, the uneven role of classes, and the psychic injuries that violence inflicts on combatants and civilians.',
    ideas: [
      'Displacement makes the asymmetry of colonial war visible. People may be removed from land, confined, surveilled, or forced into camps before a dramatic armed encounter occurs. Fanon’s account widens violence beyond a single blow while still taking armed struggle seriously. It asks why the colonizer’s continuing coercion is often treated as background order while resistance alone becomes the event requiring explanation.',
      'Fanon sometimes attributes cleansing or transformative power to revolutionary violence, a claim that has inspired liberation movements and sustained forceful criticism. The clinical case material near the book’s end complicates triumphal readings: torture, killing, fear, guilt, and war can leave enduring psychic damage. Jean-Paul Sartre’s incendiary preface shaped the book’s reception but is not Fanon’s text and should never be quoted as though Fanon wrote it.',
      'The debate cannot be settled by slogan. Nonviolent strategy may mobilize broad participation and constrain retaliation; armed resistance may arise where peaceful opposition is crushed; both can reproduce hierarchy or exclude vulnerable people. Fanon offers tools for diagnosing colonial force and the recovery of agency, not an algorithm valid in every conflict. A responsible reading asks who decides, who bears risk, what alternatives existed, and what institutions struggle is building.',
    ],
    cautions: [
      'Do not mistake Sartre’s 1961 preface for Fanon’s own argument or vocabulary.',
      'Fanon neither offers a context-free command to use violence nor escapes responsibility for his affirmative claims about it.',
    ],
    academicSource: FANON_REFERENCE,
  }),
  curated({
    id: 'fanon-national-consciousness',
    assetId: 'colonial-fanon-national-consciousness',
    parent: 'fanon',
    displayName: 'After the Flag: National Consciousness and Its Betrayal',
    shortTitle: 'National Consciousness',
    focus: 'POSTCOLONIAL POLITICS · ELITES, POPULAR PARTICIPATION, CULTURE, AND INSTITUTION',
    dateLabel: 'Written amid African decolonization and published in 1961',
    question: 'Why can formal independence reproduce colonial structures, and what would turn national consciousness into democratic participation?',
    lead: 'Fanon warns that removing colonial rulers does not automatically redistribute land, transform dependent economies, democratize administration, or repair racialized institutions. A national middle class may inherit offices and commercial roles while lacking an independent economic project, becoming an intermediary between foreign capital and a population still excluded from power. His target is not education or administration as such. It is a political class that treats nationality as entitlement and substitutes ceremony, patronage, and ethnic competition for popular transformation.',
    ideas: [
      'The displayed scene of political transition should be read for both achievement and incompletion. Flags, assemblies, speeches, and international recognition matter because colonial sovereignty has been defeated. They cannot by themselves show whether rural communities, workers, women, linguistic minorities, or displaced people can shape policy. Fanon asks visitors to look behind the national image toward the distribution of institutions and resources.',
      'National culture, in Fanon’s account, is not a museum of customs purified of contact. Artists and intellectuals may first seek a recovered precolonial grandeur, but living culture takes form within struggle and argument about a shared future. Political education likewise cannot mean party propaganda delivered downward. Fanon imagines reciprocal communication through which people understand decisions, criticize leaders, and acquire the capacity to govern.',
      'Later histories confirm some of his warnings but should not be forced into a prophecy template. Postcolonial states followed varied routes under Cold War pressure, debt, intervention, internal conflict, social movements, and creative institution-building. Fanon’s critique is most useful as a set of questions: who benefits from independence, how dependency persists, which publics can act, and whether unity suppresses disagreement or makes common action possible.',
    ],
    cautions: [
      'Do not treat every postcolonial state as one failed repetition of Fanon’s warning.',
      'National culture is an active and contested practice here, not an untouched essence recovered from the past.',
    ],
    academicSource: FANON_REFERENCE,
  }),
  curated({
    id: 'davis-prison-abolition',
    assetId: 'colonial-davis-prison-abolition',
    parent: 'angela-davis',
    displayName: 'Abolition Beyond the Prison Gate',
    shortTitle: 'Prison Abolition',
    focus: 'ABOLITION · PRISONS, POLICING, RACIAL CAPITALISM, AND SOCIAL PROVISION',
    dateLabel: 'Davis’s abolitionist work spans the 1970s–present · Are Prisons Obsolete? published 2003',
    question: 'What would it mean to make prisons less necessary rather than treating confinement as the automatic answer to social harm?',
    lead: 'Angela Davis places the modern prison within histories of slavery’s aftermath, racial segregation, gendered punishment, labor exploitation, policing, and the expansion of punitive institutions. “Abolition” does not mean pretending serious harm never occurs or opening every cell without preparation. It names a long project of dismantling institutions that reproduce violence while building ways to prevent harm, support survivors, resolve conflict, and sustain housing, health, education, and economic security. The prison-industrial-complex framework also directs attention away from one building toward the political, economic, and cultural relationships that make incarceration appear inevitable.',
    ideas: [
      'The displayed evidence of confinement should be read as an institution rather than a neutral container for people already judged dangerous. Architecture controls visibility and movement; law determines who enters; budgets and contracts organize labor; media narratives shape fear; and conditions inside distribute vulnerability by race, gender, disability, citizenship, and class. Davis asks why this machinery expanded even when it did not repair the social conditions associated with harm.',
      'Her abolitionism developed through Black radical traditions, Marxism, feminist movements, political-prisoner campaigns, and collective organizing. Her own arrest, imprisonment, trial, and 1972 acquittal matter, but biography is not the whole argument. Davis’s analysis depends on histories and movements larger than one celebrated case. It also overlaps with thinkers and organizers such as Ruth Wilson Gilmore without making their concepts interchangeable or assigning all abolitionist work to Davis.',
      'Abolition is best tested through concrete transition questions: which practices reduce violence without widening surveillance, how survivors receive material support, how communities prevent retaliation, and whether reforms shrink or legitimate carceral power. Some critics argue that abolition underestimates persistent dangerous conduct or lacks an adequate account of immediate protection. The challenge for abolitionists is to answer those concerns institutionally, not by substituting moral aspiration for design.',
    ],
    cautions: [
      'Prison abolition is a constructive institutional project, not a claim that serious harm can simply be ignored.',
      'Davis is one participant in broad abolitionist movements; do not turn a collective tradition into a single-author theory.',
    ],
    academicSource: DAVIS_REFERENCE,
  }),
  curated({
    id: 'davis-race-gender-class',
    assetId: 'colonial-davis-race-gender-class',
    parent: 'angela-davis',
    displayName: 'Race, Gender, Class, and the Politics of Labor',
    shortTitle: 'Women, Race & Class',
    focus: 'BLACK FEMINISM · LABOR, SLAVERY, SUFFRAGE, DOMESTIC WORK, AND COALITION',
    dateLabel: 'Women, Race & Class published in 1981',
    question: 'How do histories of labor and racial power change a feminism that treats “women” as one socially uniform group?',
    lead: 'Women, Race & Class reconstructs conflicts and alliances among abolition, women’s rights, labor, suffrage, antiracist struggle, and campaigns around reproductive freedom. Davis argues that an account centered on the domestic confinement of white middle-class women cannot explain the coerced labor of enslaved women, the paid domestic work disproportionately assigned to Black women, or the political struggles through which gender and racial domination were joined. Her method is historical and material: categories become intelligible through labor, law, property, organization, and contested movements rather than through a list of identities added together.',
    ideas: [
      'The image should prompt visitors to ask whose labor makes a social ideal possible. The celebrated separation of home from workplace depended on race and class: many women worked under compulsion or for wages inside other families’ homes. Davis uses that history to challenge a universal story in which feminism begins when previously protected women leave a private sphere and enter public life.',
      'Davis examines cooperation and racism within abolitionist and suffrage movements, including the retreat of some white suffragists from Black political rights. She also connects domestic labor to social provision, asking how care could be reorganized rather than merely shifted onto poorly paid workers. She did not coin the later term “intersectionality,” and her Marxist Black feminist framework should not be retroactively renamed as though all theories of interlocking power were the same.',
      'The book’s large historical sweep has invited debate over selection, emphasis, and the risk of treating “Black women” or “white women” as internally uniform. Its enduring lesson is methodological rather than a finished map: follow how institutions create different positions, then examine coalition without assuming common identity guarantees common interest. In this room that method distinguishes Davis’s political economy and abolitionism from hooks’s cultural criticism and pedagogy even where their questions meet.',
    ],
    cautions: [
      'Do not retrospectively credit Davis with coining intersectionality or collapse her Marxist framework into every later usage of the term.',
      'Broad social categories contain differences of sexuality, nationality, disability, political strategy, and class that the exhibit cannot exhaust.',
    ],
    academicSource: DAVIS_REFERENCE,
  }),
  curated({
    id: 'hooks-margin-center',
    assetId: 'colonial-hooks-margin-center',
    parent: 'bell-hooks',
    displayName: 'From Margin to Center Without a New Center',
    shortTitle: 'Feminist Theory from the Margin',
    focus: 'FEMINIST THEORY · RACE, CLASS, GENDER, VOICE, AND TRANSFORMATIVE COALITION',
    dateLabel: 'Feminist Theory: From Margin to Center published in 1984',
    question: 'How can marginalized experience expose a movement’s exclusions without turning any one standpoint into an automatic or final authority?',
    lead: 'bell hooks criticized versions of U.S. feminism that treated the experience of relatively privileged white women as the condition of women in general. Feminist Theory: From Margin to Center argues that race, class, and gender organize different vulnerabilities and possibilities, and that feminism should become a mass political movement against sexist oppression rather than a program for equal access within an unchanged hierarchy. “Margin” is not a romantic location outside power. It is a position produced by social relations that can make contradictions visible while still requiring argument, coalition, and self-critique.',
    ideas: [
      'The segregated movie-house entrance gives “margin” an architectural form and links political exclusion to hooks’s later analysis of spectatorship. A Black viewer is admitted through a racialized side route before any film begins, so culture’s audience is already organized by power. The photograph predates hooks’s writing and cannot illustrate her theory by itself, but it helps visitors ask who is positioned to look, from where, and under whose rules.',
      'hooks rejects the idea that solidarity follows automatically from being women. A feminism adequate to Black women’s lives must confront racism and class exploitation within feminist spaces while also confronting sexism within antiracist movements. Coalition becomes transformative when participants can criticize domination in their own institutions and imagine changes that benefit those with the least power, not simply place a few individuals in elite roles.',
      'Standpoint can disclose what dominant perspectives miss, yet no identity guarantees freedom from error. The margin also differs across place, sexuality, disability, age, and economic position. hooks’s broad language about women and men, especially in some later work, can rely on binary generalizations that readers should question. Her project asks for an oppositional politics capable of revision, not a new center whose speaker can no longer be challenged.',
    ],
    cautions: [
      'The Mississippi photograph documents U.S. segregation before hooks’s career; it is historical context, not a portrait of her or direct evidence for her argument.',
      'Keep hooks’s cultural and pedagogical method distinct from Davis’s Black radical political economy and prison abolition.',
    ],
    academicSource: HOOKS_REFERENCE,
  }),
  curated({
    id: 'hooks-engaged-pedagogy-love',
    assetId: 'colonial-hooks-engaged-pedagogy',
    parent: 'bell-hooks',
    displayName: 'Teaching, Voice, and Love as Public Practice',
    shortTitle: 'Engaged Pedagogy',
    focus: 'TEACHING TO TRANSGRESS · EDUCATION, VOICE, FREEDOM, CARE, AND POWER',
    dateLabel: 'Teaching to Transgress published 1994 · All About Love published 2000',
    question: 'Can a classroom become a practice of freedom while authority, unequal risk, and institutional constraint remain present?',
    lead: 'In Teaching to Transgress, hooks develops “engaged pedagogy” through Black feminist thought, her experience of segregated and integrated schools, and a critical encounter with Paulo Freire. Education can invite students to become agents in knowledge rather than passive recipients, but participation is not achieved by declaring the room equal. Teachers still grade, select material, and shape whose speech appears relevant. hooks links liberatory teaching to care for the whole person and later develops love as an ethical practice involving commitment, knowledge, responsibility, respect, and trust—not as a warm feeling that excuses conflict.',
    ideas: [
      'A classroom image can conceal uneven exposure. One student’s autobiographical disclosure may be praised as authenticity while another protects themselves from stereotype or institutional risk. hooks encourages voice and reciprocal presence, including teachers’ willingness to acknowledge their own position, but engaged pedagogy must preserve room for refusal. Participation should expand agency rather than convert intimacy into another assignment.',
      'hooks admired Freire’s account of education against domination while criticizing sexism in his language and reception. That combination—inheritance without discipleship—models her method. She joins critique to the possibility of transformation, insisting that pleasure, excitement, and care need not make intellectual rigor less serious. Her writing on love similarly argues that domination damages the capacity to love and that political change requires practiced relations, not only correct structural analysis.',
      'Love cannot replace policy, redistribution, or protection from violence. Nor does a caring teacher eliminate power simply by being sincere. Critics can ask how engaged pedagogy scales across large classes, compulsory curricula, precarious employment, and disagreement over safety. The value of hooks’s framework lies in making those conditions discussable while refusing the cynical conclusion that education can only reproduce domination.',
    ],
    cautions: [
      'The historical classroom photograph is context rather than a record of hooks teaching or a demonstration that this classroom was liberatory.',
      'Love is an accountable practice in hooks’s work, not a sentimental substitute for structural change or conflict.',
    ],
    academicSource: HOOKS_REFERENCE,
  }),
  curated({
    id: 'cesaire-colonialism-thingification',
    assetId: 'colonial-cesaire-anticolonialism',
    parent: 'fanon',
    displayName: 'Aimé Césaire: Colonialism and the Destruction of Relation',
    shortTitle: 'Césaire’s Anticolonial Reckoning',
    focus: 'DISCOURSE ON COLONIALISM · CONQUEST, OBJECTIFICATION, EUROPE, AND NÉGRITUDE',
    dateLabel: 'Discourse on Colonialism first published 1950; revised edition 1955',
    question: 'What does colonial conquest do not only to those it subjugates but also to the civilization that authorizes it?',
    lead: 'Aimé Césaire’s Discourse on Colonialism indicts European claims to civilization by comparing them with conquest, forced labor, expropriation, racism, and mass death across colonial worlds. Colonization, he argues, turns human relationships into relations of domination and use—an operation often summarized through his language of objectification or “thingification.” He also turns the accusation back toward Europe: practices tolerated overseas return to corrupt the political and moral order that called itself civilized. The essay is a polemic written from Martinican, Négritude, communist, surrealist, and anticolonial engagements; it is not a neutral survey of every empire.',
    ideas: [
      'The displayed object anchors a text that moves rapidly across places and atrocities. Its force comes partly from montage: official claims, literary prestige, racial pseudoscience, capitalist appetite, and physical terror appear within one structure of excuse. That rhetoric can disclose continuities without proving that every colony, administrator, or colonized response was identical. Historical comparison still requires local evidence and chronology.',
      'Césaire helped formulate Négritude with Léopold Sédar Senghor and Léon-Gontran Damas, using poetry and politics to resist colonial assimilation and affirm Black history and culture. Their positions were not interchangeable, and Négritude itself generated debate over essentialism, gender, class, and the meaning of African belonging across diaspora. Fanon learned from Césaire—his former teacher—and later criticized versions of racial affirmation that risked freezing a living political future into inherited essence.',
      'The essay’s urgent question survives formal empire: which institutions still convert people, land, and knowledge into administrable resources, and which declarations of universality hide unequal access to the human? Yet Césaire should not be made a timeless spokesperson for all decolonial thought. Read Discourse on Colonialism beside Notebook of a Return to the Native Land and his later break with the French Communist Party to see a changing political and poetic project.',
    ],
    cautions: [
      'The 1760 plan of Martinique is a colonial cartographic object made long before Césaire; it maps an administered island rather than illustrating his essay.',
      'Césaire, Senghor, Damas, and Fanon occupy related but contested routes; do not merge them into one Négritude doctrine.',
    ],
    academicSource: COLONIALISM_REFERENCE,
    articleActionLabel: 'Compare Césaire’s route with Fanon in the Atlas',
  }),
  curated({
    id: 'dubois-color-line-colonial-world',
    assetId: 'colonial-dubois-pan-africanism',
    parent: 'angela-davis',
    displayName: 'W. E. B. Du Bois: The Color Line as a World Problem',
    shortTitle: 'The Color Line and Empire',
    focus: 'AFRICANA PHILOSOPHY · DOUBLE CONSCIOUSNESS, RECONSTRUCTION, EMPIRE, AND PAN-AFRICANISM',
    dateLabel: 'The Souls of Black Folk published 1903 · Du Bois’s Pan-African work spanned decades',
    question: 'How does a racial order join intimate self-relation to labor, citizenship, empire, and international politics?',
    lead: 'W. E. B. Du Bois’s famous diagnosis of the twentieth century’s “color line” connects U.S. segregation with colonial rule and global distributions of labor and power. In The Souls of Black Folk, double consciousness names a conflict produced when Black Americans must understand themselves through a hostile society’s devaluing gaze while sustaining their own strivings and collective life. It is not a natural division inside Black personality. Across later historical, sociological, political, and autobiographical work, Du Bois expanded the problem toward Reconstruction, racial capitalism, democracy, African independence, peace, and Pan-African institution-building.',
    ideas: [
      'The Pan-African evidence in this installation should be read as organization, not a photograph of instant unity. Congresses joined participants with different languages, national positions, class locations, colonial statuses, and strategies. Du Bois advocated international solidarity while his own influence and U.S.-centered assumptions were contested. Pan-Africanism names a field of projects and arguments, not one organization or settled philosophy.',
      'Black Reconstruction in America reframed formerly enslaved people as political and laboring agents whose withdrawal from plantations helped destroy slavery and whose democratic experiments were overthrown. This challenged histories that treated Reconstruction as misrule and whiteness as politically neutral. Du Bois’s account of democracy therefore changed with his analysis of empire, capital, and organized counterrevolution; it cannot be frozen at the liberal pluralism of one early book.',
      'Du Bois’s long life also contains tensions: elitist formulations associated with the “Talented Tenth,” changing positions on integration and separatism, commitment to socialism, international peace campaigns, and a final move to Ghana. Those changes are evidence of thought under pressure rather than stages in an inevitable conversion. Read The Souls of Black Folk with Black Reconstruction and The World and Africa before using one phrase to summarize six decades.',
    ],
    cautions: [
      'Double consciousness is a historically produced social relation, not an innate psychology shared identically by all Black people.',
      'Pan-Africanism contains divergent movements and interests; Du Bois never represented the whole field.',
    ],
    academicSource: DUBOIS_REFERENCE,
    articleActionLabel: 'Compare Du Bois’s Black radical route with Davis in the Atlas',
  }),
  curated({
    id: 'said-orientalism-representation',
    assetId: 'colonial-said-orientalism',
    parent: 'fanon',
    displayName: 'Edward Said: Representation and the Geography of Expertise',
    shortTitle: 'Orientalism',
    focus: 'ORIENTALISM · SCHOLARSHIP, EMPIRE, REPRESENTATION, AND WORLDLY TEXTS',
    dateLabel: 'Orientalism published in 1978',
    question: 'How can a body of scholarship help produce the object it claims simply to describe?',
    lead: 'Edward Said uses “Orientalism” for an historically organized field through which European and later U.S. institutions represented a broad, internally diverse “East” as timeless, irrational, sensual, passive, or dangerous in contrast with a modern and governing West. The argument is not that every scholar lied or that places beyond Europe were invented out of nothing. It asks how archives, philology, travel writing, art, administration, and military power established recurring positions from which some people could classify and speak for others with institutional authority.',
    ideas: [
      'The displayed image should be examined as a representation with a maker, audience, genre, and circulation—not as a transparent window onto the people or place depicted. Details may be observed accurately while the composition still organizes difference for an outside viewer. Said’s method joins close reading to the “worldliness” of texts: representations acquire force through publishing, universities, museums, foreign policy, and inherited expectations.',
      'Said drew on Michel Foucault’s account of discourse but retained a strong role for authors, historical conflict, humanist criticism, and political responsibility. Critics have challenged Orientalism’s large geographic and chronological sweep, its emphasis on British and French traditions, its treatment of German scholarship, and whether discourse leaves enough room for the agency of represented peoples. Those debates revised postcolonial study rather than simply invalidating the question of knowledge and empire.',
      'Rejecting Orientalist essentialism cannot mean replacing one homogeneous “East” with an equally homogeneous “West,” or refusing any cross-cultural description. The practical task is accountable representation: specify evidence, attend to internal disagreement, make the position of the interpreter visible, and leave room for people to contest the frame. Read Orientalism alongside Culture and Imperialism and Said’s Palestinian political writings without treating those projects as one undifferentiated thesis.',
    ],
    cautions: [
      'Orientalism does not claim that every Western description is false or that colonized peoples lack agency.',
      'Do not answer a Western/Eastern binary by reversing its moral signs while leaving both imagined blocs intact.',
    ],
    academicSource: COLONIALISM_REFERENCE,
    articleActionLabel: 'Compare Said’s postcolonial critique with Fanon in the Atlas',
  }),
  curated({
    id: 'spivak-subaltern-representation',
    assetId: 'colonial-spivak-subaltern',
    parent: 'bell-hooks',
    displayName: 'Gayatri Chakravorty Spivak: Representation and the Subaltern',
    shortTitle: 'Can the Subaltern Speak?',
    focus: 'POSTCOLONIAL FEMINISM · REPRESENTATION, ARCHIVE, SATI, AND EPISTEMIC VIOLENCE',
    dateLabel: '“Can the Subaltern Speak?” developed through versions in the 1980s',
    question: 'What prevents a dominated person’s speech from becoming legible as an authorized political claim?',
    lead: 'Gayatri Chakravorty Spivak’s “Can the Subaltern Speak?” examines how intellectuals, colonial archives, nationalist narratives, and patriarchal structures can claim to recover oppressed voices while reorganizing them within categories they did not control. “Subaltern” here is not a respectful synonym for anyone marginalized. It names positions so cut off from recognized channels of representation that speech may fail to register as political agency. Spivak’s analysis of British colonial debate over sati asks how a woman’s act becomes evidence for rival projects—imperial rescue and patriarchal tradition—without yielding a transparent intention that the archive can simply retrieve.',
    ideas: [
      'The installation’s evidence should be read for archival asymmetry. Laws, official reports, reform arguments, missionary accounts, and elite texts survive through institutions with reasons to classify. The absence of an unmediated first-person record does not mean women had no thoughts or resistance; it means the interpreter cannot repair unequal preservation by inventing a voice and calling the invention recovery.',
      'Spivak distinguishes two senses of representation often rendered as political proxy and philosophical or artistic portrayal. Speaking for a constituency and depicting who that constituency is can reinforce one another. Her critique targets intellectuals who imagine they have escaped this problem by letting oppressed subjects “speak for themselves,” as though the platform, translation, selection, and audience no longer structured what could be heard.',
      'The essay has multiple versions, dense theoretical inheritances, and sustained controversy. Its conclusion should not become a command that subaltern people remain silent or that solidarity is impossible. It demands persistent work on institutions of listening, education, translation, and political representation while preserving the difference between enabling speech and claiming possession of another’s experience. Read it beside Spivak’s later reflections and the Subaltern Studies debates it both joined and criticized.',
    ],
    cautions: [
      'The 1905 Bengal partition map supplies colonial-administrative context; it is not evidence of an unmediated subaltern voice or a direct illustration of Spivak’s sati analysis.',
      'The argument diagnoses failures of representation; it does not deny oppressed people agency or forbid solidaristic political work.',
    ],
    academicSource: COLONIALISM_REFERENCE,
    articleActionLabel: 'Compare Spivak’s feminist postcolonial route with hooks in the Atlas',
  }),
  curated({
    id: 'ngugi-language-decolonization',
    assetId: 'colonial-ngugi-language',
    parent: 'fanon',
    displayName: 'Ngũgĩ wa Thiong’o: Language, Theater, and Decolonizing the Mind',
    shortTitle: 'Decolonizing Language',
    focus: 'LANGUAGE · EDUCATION, LITERATURE, COMMUNITY THEATER, AND MATERIAL POWER',
    dateLabel: 'Decolonising the Mind published 1986 · Gikuyu-language turn developed from the late 1970s',
    question: 'How does the language of education shape whose world becomes thinkable, publishable, and institutionally valued?',
    lead: 'Ngũgĩ wa Thiong’o argues that colonial education does more than teach vocabulary. By assigning prestige, punishment, examination, publication, and intellectual authority to the colonizer’s language, it can estrange students from the languages through which families and communities remember, joke, work, and interpret the world. His decision to center Gikuyu in fiction and theater followed work at the Kamĩrĩĩthũ Community Education and Cultural Centre, political detention, and reflection on the audiences created or excluded by English-language literature. Decolonising the Mind gathers that argument without making translation or multilingual exchange the enemy.',
    ideas: [
      'The displayed evidence of performance or language becomes political through its conditions of production. Community theater can join local speech, collective rehearsal, labor history, music, and a nearby audience, changing who participates in authorship and criticism. The Kenyan state’s repression of Kamĩrĩĩthũ shows that language matters not only as cultural identity but as a way of organizing publics around land, labor, and political memory.',
      'Ngũgĩ first achieved international recognition through novels in English before writing major fiction such as Devil on the Cross in Gikuyu and translating across languages. The shift is therefore a strategic and creative reorientation, not proof that a language has one authentic political content. Indigenous-language institutions can reproduce hierarchy, and colonial languages can be appropriated for resistance. His question concerns the unequal system that determines which choices receive resources and reach.',
      'Decolonization of language requires more than telling individual writers to change medium. Publishing infrastructure, schools, libraries, translation, literacy policy, digital access, and economic survival shape what can circulate. Readers can also question gender, class, and national assumptions within anticolonial cultural projects. Read Decolonising the Mind with Devil on the Cross and accounts of Kamĩrĩĩthũ to keep literary form, institution, and political struggle connected.',
    ],
    cautions: [
      'The colonial-era school photograph predates Ngũgĩ’s work and does not document Kamĩrĩĩthũ or his own education.',
      'Language choice is structured by schools, publishing, class, migration, and state power; it is not simply an individual test of authenticity.',
    ],
    academicSource: NGUGI_REFERENCE,
    articleActionLabel: 'Compare Ngũgĩ’s decolonizing route with Fanon in the Atlas',
  }),
  curated({
    id: 'wynter-humanism-coloniality',
    assetId: 'colonial-wynter-humanism',
    parent: 'fanon',
    displayName: 'Sylvia Wynter: Beyond One Genre of the Human',
    shortTitle: 'Unsettling “Man”',
    focus: 'AFRICANA AND DECOLONIAL THOUGHT · HUMANISM, COLONIALITY, RACE, AND SOCIOGENY',
    dateLabel: 'Wynter’s interdisciplinary project spans the late 20th–21st centuries',
    question: 'What changes when one historically specific model of the human presents itself as humanity’s universal definition?',
    lead: 'Sylvia Wynter argues that modern Western orders have repeatedly overrepresented a particular figure—secular, bourgeois, economically optimizing, and racially classified “Man”—as though it exhausted the possibilities of being human. This is not a complaint that the word is insufficiently inclusive while its institutions remain unchanged. It is an account of how conquest, 1492, plantation slavery, political economy, biological classification, and knowledge disciplines helped install a governing description of humanity whose differences are measured as deficiency. Wynter draws on Fanon’s sociogeny to insist that humans are biological and symbolically self-interpreting beings who help enact the orders that describe them.',
    ideas: [
      'The illustrated report of the Jamaica uprising places colonial classification inside a scene of resistance and repression, but its captions and composition belong to a nineteenth-century publishing apparatus. It cannot picture Wynter’s “genre of the human” directly. It can direct attention to media, law, census, market, and archive as sites where descriptions organize expectations, allocate life chances, and make historical rankings appear natural.',
      'Wynter’s vocabulary enters conversation with Black studies, Caribbean thought, anticolonial theory, systems thinking, literary criticism, and Latin American discussions of coloniality, but she should not be assigned to one retrospective school. Her “bios/mythoi” formulation resists the choice between biological reduction and pure cultural construction. Humans live through organic capacities and shared symbolic codes, including stories about what kinds of creature we are.',
      'The aim is not to discard every universal claim or replace “Man” with one newly perfect identity. Wynter asks how different genres of being human might become thinkable without reproducing an outside population marked as less rational, less evolved, or less valuable. Her dense essays demand slow reading. Begin with “Unsettling the Coloniality of Being/Power/Truth/Freedom,” then return to Fanon to trace how psychic experience and world-making institutions meet.',
    ],
    cautions: [
      'The Jamaica uprising print long predates Wynter and carries the framing of its own publisher; it is colonial-history context, not an illustration she selected.',
      'Her work intersects several traditions but should not be retroactively reduced to membership in a single decolonial school.',
    ],
    academicSource: WYNTER_REFERENCE,
    articleActionLabel: 'Compare Wynter’s Fanonian route with Fanon in the Atlas',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

type InstallationKind = 'colonial-work' | 'colonial-context' | 'colonial-concept';

const layout = (
  id: ColonialismRaceLiberationSupplementalExhibitId,
  parentExhibitId: PrimaryParent,
  guidedAfterExhibitId: PrimaryParent,
  zoneId:
    | 'colonial-embodiment-liberation'
    | 'colonial-black-feminism-abolition'
    | 'colonial-context-reserve',
  position: {x: number; z: number},
  rotationY: number,
  assetId: ColonialismRaceLiberationGalleryAssetId,
  mediaWidth: number,
  mediaHeight: number,
  installationKind: InstallationKind,
  accent: string,
  width?: number,
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
  ...(width ? {width} : {}),
});

export const COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout('fanon-racializing-gaze', 'fanon', 'fanon', 'colonial-embodiment-liberation', {x: -5.55, z: -26.88}, 0, 'colonial-fanon-racial-schema', 2.08, 2.7, 'colonial-concept', COLONIALISM_RACE_LIBERATION_PALETTE.ink),
  layout('fanon-colonial-psychiatry', 'fanon', 'fanon', 'colonial-embodiment-liberation', {x: -5.55, z: -10.4533}, Math.PI, 'colonial-fanon-clinic', 3.15, 2.28, 'colonial-context', COLONIALISM_RACE_LIBERATION_PALETTE.clinicBlue),
  layout('fanon-algerian-revolution', 'fanon', 'fanon', 'colonial-embodiment-liberation', {x: 5.55, z: -26.88}, 0, 'colonial-fanon-algerian-revolution', 3.15, 2.32, 'colonial-context', COLONIALISM_RACE_LIBERATION_PALETTE.anticolonialRed),
  layout('fanon-violence-decolonization', 'fanon', 'fanon', 'colonial-embodiment-liberation', {x: 5.55, z: -10.4533}, Math.PI, 'colonial-fanon-war-displacement', 3.15, 2.28, 'colonial-concept', COLONIALISM_RACE_LIBERATION_PALETTE.abolitionPlum),
  layout('fanon-national-consciousness', 'fanon', 'fanon', 'colonial-embodiment-liberation', {x: 10.85, z: -18.6667}, -Math.PI / 2, 'colonial-fanon-national-consciousness', 3.05, 2.35, 'colonial-work', COLONIALISM_RACE_LIBERATION_PALETTE.liberationGold),

  layout('davis-prison-abolition', 'angela-davis', 'angela-davis', 'colonial-black-feminism-abolition', {x: -5.55, z: -8.2133}, 0, 'colonial-davis-prison-abolition', 3.15, 2.32, 'colonial-concept', COLONIALISM_RACE_LIBERATION_PALETTE.abolitionPlum),
  layout('davis-race-gender-class', 'angela-davis', 'angela-davis', 'colonial-black-feminism-abolition', {x: -5.55, z: 8.2133}, Math.PI, 'colonial-davis-race-gender-class', 3.15, 2.32, 'colonial-work', COLONIALISM_RACE_LIBERATION_PALETTE.anticolonialRed),
  layout('hooks-margin-center', 'bell-hooks', 'bell-hooks', 'colonial-black-feminism-abolition', {x: 5.55, z: -8.2133}, 0, 'colonial-hooks-margin-center', 3.15, 2.32, 'colonial-concept', COLONIALISM_RACE_LIBERATION_PALETTE.oceanIndigo),
  layout('hooks-engaged-pedagogy-love', 'bell-hooks', 'bell-hooks', 'colonial-black-feminism-abolition', {x: 5.55, z: 8.2133}, Math.PI, 'colonial-hooks-engaged-pedagogy', 3.15, 2.32, 'colonial-context', COLONIALISM_RACE_LIBERATION_PALETTE.pedagogyGreen),

  // Room 03 has no canonical primary. Césaire and Wynter receive equal outer-wall scale;
  // all six records remain contextual and join the guided visit after hooks.
  layout('cesaire-colonialism-thingification', 'fanon', 'bell-hooks', 'colonial-context-reserve', {x: -10.85, z: 18.6667}, Math.PI / 2, 'colonial-cesaire-anticolonialism', 3.48, 2.7, 'colonial-context', COLONIALISM_RACE_LIBERATION_PALETTE.anticolonialRed, 4.6),
  layout('dubois-color-line-colonial-world', 'angela-davis', 'bell-hooks', 'colonial-context-reserve', {x: -5.55, z: 10.4533}, 0, 'colonial-dubois-pan-africanism', 2.04, 2.7, 'colonial-context', COLONIALISM_RACE_LIBERATION_PALETTE.liberationGold),
  layout('said-orientalism-representation', 'fanon', 'bell-hooks', 'colonial-context-reserve', {x: 5.55, z: 10.4533}, 0, 'colonial-said-orientalism', 3.15, 2.32, 'colonial-work', COLONIALISM_RACE_LIBERATION_PALETTE.oceanIndigo),
  layout('spivak-subaltern-representation', 'bell-hooks', 'bell-hooks', 'colonial-context-reserve', {x: -5.55, z: 26.88}, Math.PI, 'colonial-spivak-subaltern', 3.15, 2.32, 'colonial-concept', COLONIALISM_RACE_LIBERATION_PALETTE.abolitionPlum),
  layout('ngugi-language-decolonization', 'fanon', 'bell-hooks', 'colonial-context-reserve', {x: 5.55, z: 26.88}, Math.PI, 'colonial-ngugi-language', 3.15, 2.32, 'colonial-context', COLONIALISM_RACE_LIBERATION_PALETTE.pedagogyGreen),
  layout('wynter-humanism-coloniality', 'fanon', 'bell-hooks', 'colonial-context-reserve', {x: 10.85, z: 18.6667}, -Math.PI / 2, 'colonial-wynter-humanism', 3.48, 2.7, 'colonial-context', COLONIALISM_RACE_LIBERATION_PALETTE.ink, 4.6),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getColonialismRaceLiberationSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBITS.find(
    (item) => item.id === id,
  );
  if (!record) throw new Error(`Gallery 26 supplemental exhibit ${id} is missing.`);
  return record;
};
