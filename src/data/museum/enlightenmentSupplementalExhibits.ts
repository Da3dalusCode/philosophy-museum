import type {MuseumExhibitId, MuseumZoneId} from '../museumCatalog';
import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
  type SupplementalExhibitAuthoring,
} from './museumSupplementalAuthoring';
import {
  ENLIGHTENMENT_GALLERY_ID,
  ENLIGHTENMENT_ROOM_SIGN_COPY,
  getEnlightenmentInstallationSlot,
  type EnlightenmentRoomId,
} from './enlightenmentGalleryCuration';
import type {EnlightenmentGalleryAssetId} from './enlightenmentGalleryAssets';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export {ENLIGHTENMENT_GALLERY_ID, ENLIGHTENMENT_ROOM_SIGN_COPY};

export const ENLIGHTENMENT_PALETTE = Object.freeze({
  ink: '#24262a',
  lawBlue: '#5e7485',
  comparisonGold: '#a57d45',
  civicRed: '#955d55',
  societyGreen: '#667a68',
  commerceTeal: '#587879',
  equalityViolet: '#776887',
  parchment: '#e7dcc5',
});

/**
 * Local final IDs keep this bundle isolated until the shared ID gate is updated
 * during integration. They are intentionally more descriptive than the
 * provisional Gallery 15 IDs.
 */
export type EnlightenmentSupplementalExhibitId =
  | 'enlightenment-persian-mirror'
  | 'enlightenment-comparison-map'
  | 'enlightenment-power-checks-power'
  | 'enlightenment-law-lived-institution'
  | 'enlightenment-liberty-slavery-contradiction'
  | 'enlightenment-geneva-citizenship'
  | 'enlightenment-luxury-amour-propre'
  | 'enlightenment-education-forms-person'
  | 'enlightenment-general-will'
  | 'enlightenment-rousseau-botany'
  | 'enlightenment-sympathy-judgment'
  | 'enlightenment-division-labor'
  | 'enlightenment-commerce-social-world'
  | 'enlightenment-chartered-monopoly'
  | 'enlightenment-industry-public-judgment'
  | 'enlightenment-marriage-domestic-government'
  | 'enlightenment-women-public-intellectuals'
  | 'enlightenment-access-to-knowledge'
  | 'enlightenment-revolution-from-street'
  | 'enlightenment-kant-sublime';

type EnlightenmentInstallationKind =
  | 'enlightenment-work'
  | 'enlightenment-context'
  | 'enlightenment-concept';

const supplementalId = (
  id: EnlightenmentSupplementalExhibitId,
): MuseumSupplementalExhibitId => id as MuseumSupplementalExhibitId;

const museumAssetId = (id: EnlightenmentGalleryAssetId): MuseumAssetId => id as MuseumAssetId;

const installationKind = (
  kind: EnlightenmentInstallationKind,
): MuseumSupplementalInstallationKind => kind as MuseumSupplementalInstallationKind;

const collection = (label: string, url: string) => ({
  label,
  url,
  kind: 'collection-record' as const,
});
const academic = (label: string, url: string) => ({
  label,
  url,
  kind: 'academic-reference' as const,
});

type EnlightenmentExhibitAuthoring = Omit<
  SupplementalExhibitAuthoring,
  'id' | 'assetId' | 'panelKicker'
> & {
  id: EnlightenmentSupplementalExhibitId;
  assetId: EnlightenmentGalleryAssetId;
};

const record = (input: EnlightenmentExhibitAuthoring): MuseumSupplementalExhibit =>
  authorSupplementalExhibit({
    ...input,
    id: supplementalId(input.id),
    assetId: museumAssetId(input.assetId),
    panelKicker: 'Gallery 15 work and context exhibit',
  });

const MONTESQUIEU_REFERENCE = academic(
  'Stanford Encyclopedia of Philosophy — Baron de Montesquieu',
  'https://plato.stanford.edu/entries/montesquieu/',
);
const ROUSSEAU_REFERENCE = academic(
  'Stanford Encyclopedia of Philosophy — Jean-Jacques Rousseau',
  'https://plato.stanford.edu/entries/rousseau/',
);
const SMITH_REFERENCE = academic(
  'Stanford Encyclopedia of Philosophy — Adam Smith’s moral and political philosophy',
  'https://plato.stanford.edu/entries/smith-moral-political/',
);
const ASTELL_REFERENCE = academic(
  'Stanford Encyclopedia of Philosophy — Mary Astell',
  'https://plato.stanford.edu/entries/astell/',
);
const WOLLSTONECRAFT_REFERENCE = academic(
  'Stanford Encyclopedia of Philosophy — Mary Wollstonecraft',
  'https://plato.stanford.edu/entries/wollstonecraft/',
);

export const ENLIGHTENMENT_SUPPLEMENTAL_EXHIBITS = [
  record({
    id: 'enlightenment-persian-mirror',
    assetId: 'enlightenment-persian-envoy-coypel',
    displayName: 'The Persian Mirror: Seeing France from an Imagined Elsewhere',
    shortTitle: 'Montesquieu’s Persian Mirror',
    workLabel: 'PERSIAN LETTERS · COMPARISON, SATIRE, AND THE OUTSIDER’S GAZE',
    dateLabel: 'Persian Letters published anonymously, 1721 · displayed envoy portrait, 18th century',
    question: 'What becomes visible when familiar institutions are described by a visitor who does not share their assumptions?',
    frontSubtitle: 'Defamiliarization, comparison, monarchy, religion, gender, satire, and the ethics of an imagined voice',
    lead: 'Montesquieu’s Persian Letters uses fictional travelers from Isfahan to make French monarchy, religion, manners, and domestic power appear strange. The device makes comparison philosophically productive, but it also turns “Persia” into a European literary instrument. The displayed sitter is the real Safavid envoy Mohammad Reza Beg—not Montesquieu’s fictional Usbek or Rica.',
    keyIdeas: [
      'An outsider’s perspective can reveal practices that habit has made seem natural.',
      'The novel’s multiple letters prevent a single narrator from controlling every judgment.',
      'Comparison can criticize France while still reproducing European fantasies about another society.',
    ],
    cautions: [
      'Do not identify the portrayed envoy as Usbek, Rica, or any other fictional character.',
      'Defamiliarization is not neutral: the novel’s Persian voices were constructed for a French reading public.',
    ],
    sections: [
      {
        heading: 'Distance makes custom visible',
        paragraph: 'The travelers ask why rank, fashion, papal authority, court ritual, and gender hierarchy command obedience. Their surprise exposes the contingency of arrangements that insiders experience as obvious, establishing comparison as a method rather than decorative travel writing.',
      },
      {
        heading: 'The mirror has more than one angle',
        paragraph: 'Letters circulate among travelers, friends, wives, eunuchs, and correspondents. Contradictions among those voices complicate any attempt to extract one simple doctrine and connect political domination abroad to domination within Usbek’s household.',
      },
      {
        heading: 'A useful fiction can still appropriate',
        paragraph: 'Montesquieu’s device attacks French complacency but does not document Safavid society from within. The real envoy’s portrait keeps the historical encounter visible while marking the distance between an identifiable diplomat and invented European speakers.',
      },
    ],
    sources: [
      collection(
        'Wikimedia Commons — Antoine Coypel, portrait of the Persian ambassador Mohammad Reza Beg',
        'https://commons.wikimedia.org/wiki/File:Mohammed_Reza_Bey,_Persian_Ambassador_to_France,_during_the_reign_of_Louis_XIV_by_Antoine_Coypel.jpg',
      ),
      MONTESQUIEU_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'montesquieu'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-comparison-map',
    assetId: 'enlightenment-delisle-world-map-1720',
    displayName: 'Comparison on a Mapped World',
    shortTitle: 'Comparison and the Map',
    workLabel: 'MONTESQUIEU · CLIMATE, CUSTOM, COMMERCE, LAW, AND POLITICAL FORM',
    dateLabel: 'Guillaume Delisle world map, 1720 · Spirit of the Laws, 1748',
    question: 'How can societies be compared without treating inherited categories and imperial viewpoints as neutral?',
    frontSubtitle: 'Geography, climate, historical causation, trade, custom, scale, evidence, and the mapmaker’s gaze',
    lead: 'Montesquieu widened political inquiry beyond constitutions alone. Climate, economy, religion, custom, conquest, and the size of a territory enter his explanations of law. Delisle’s map evokes the expanding comparative field, while its royal dedication and European conventions warn that the observer’s categories also have a history.',
    keyIdeas: [
      'Laws must be understood in relation to many interacting social and material conditions.',
      'Comparison weakens the claim that one legal order is simply natural for everyone.',
      'Maps organize knowledge through choices about projection, naming, borders, and centers.',
    ],
    cautions: [
      'Montesquieu’s attention to climate should not be reduced to a single deterministic formula.',
      'A royal European map is evidence of knowledge-making and power, not a transparent view from nowhere.',
    ],
    sections: [
      {
        heading: 'Law belongs to a system of relations',
        paragraph: 'The Spirit of the Laws asks how legal and political arrangements fit population, economy, religion, manners, historical inheritance, and physical setting. Its ambition is explanatory and comparative even where its evidence and generalizations remain contestable.',
      },
      {
        heading: 'Variation challenges universality',
        paragraph: 'If institutions arise within distinct combinations of causes, importing one arrangement without context may fail. That insight supports empirical humility, though it can also slide into overbroad claims about peoples or regions.',
      },
      {
        heading: 'The observer is situated too',
        paragraph: 'Delisle’s cartography improved geographic representation, yet the map was made for a European courtly world of navigation and empire. Reading the map critically extends Montesquieu’s comparative question to the tools by which comparison is performed.',
      },
    ],
    sources: [
      collection(
        'Wikimedia Commons — Guillaume Delisle, Mappemonde à l’usage du Roy, 1720',
        'https://commons.wikimedia.org/wiki/File:1720_map_of_the_world_-_Mappemonde_a_l%27usage_du_Roy.jpg',
      ),
      MONTESQUIEU_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'montesquieu'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-power-checks-power',
    assetId: 'enlightenment-house-commons-walpole',
    displayName: 'Power Checks Power: Institutions in Motion',
    shortTitle: 'Power Must Check Power',
    workLabel: 'MONTESQUIEU · MODERATE GOVERNMENT AND THE DISTRIBUTION OF POWER',
    dateLabel: 'English constitutional analysis in Spirit of the Laws, 1748 · depicted Commons, 1722–1742',
    question: 'What arrangements can restrain power before private virtue or good intentions fail?',
    frontSubtitle: 'Legislative, executive, and judicial functions, procedure, factions, social orders, and constitutional idealization',
    lead: 'Montesquieu’s famous account does not present three perfectly sealed departments. It examines functions, offices, bodies, privileges, and procedures whose interaction can prevent concentrated power from becoming arbitrary. His admired English constitution was an interpreted model, not a neutral transcript of how Britain actually worked.',
    keyIdeas: [
      'Institutional liberty depends on power encountering organized counter-power.',
      'Checks work through procedures and relationships, not labels alone.',
      'Montesquieu’s account shaped later constitutional thinking well beyond France and Britain.',
    ],
    cautions: [
      'Do not turn Montesquieu’s model into a rigid three-box diagram absent from the historical argument.',
      'Eighteenth-century parliamentary government coexisted with restricted representation, patronage, oligarchy, and empire.',
    ],
    sections: [
      {
        heading: 'Moderation is designed',
        paragraph: 'The central problem is not how to find rulers who never abuse power, but how to arrange institutions so that authority is divided, delayed, reviewed, and forced to negotiate. Liberty names security under moderated government rather than the absence of all rule.',
      },
      {
        heading: 'Functions overlap and interact',
        paragraph: 'Legislation, execution, and judgment require distinct powers, yet Montesquieu also discusses chambers, vetoes, social estates, and procedural balances. The system works through motion and resistance rather than complete institutional isolation.',
      },
      {
        heading: 'The English example was selective',
        paragraph: 'The Commons scene makes deliberative institutions tangible, but it also shows the elite political world Montesquieu idealized. His reconstruction became influential precisely because later readers could adapt it, not because it exhaustively described eighteenth-century Britain.',
      },
    ],
    sources: [
      collection(
        'UK Parliamentary Art Collection / Wikimedia Commons — House of Commons under Sir Robert Walpole',
        'https://commons.wikimedia.org/wiki/File:William_Hogarth_(1697-1764)_(after)_-_The_House_of_Commons,_Sir_Robert_Walpole%27s_Administration_(1722%E2%80%931742)_-_WOA_3067_-_Parliamentary_Art_Collection.jpg',
      ),
      MONTESQUIEU_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'montesquieu'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-law-lived-institution',
    assetId: 'enlightenment-hogarth-bench-1758',
    displayName: 'Law as a Lived Institution',
    shortTitle: 'The Institution Behind the Rule',
    workLabel: 'COURTS, OFFICES, PROCEDURE, HABIT, AND ACCESS TO JUSTICE',
    dateLabel: 'William Hogarth, The Bench, 1758',
    question: 'Why can a sound legal design still fail in everyday administration?',
    frontSubtitle: 'Judges, competence, professional culture, access, delay, discretion, and the ordinary life of institutions',
    lead: 'Constitutions do not administer themselves. Hogarth’s severe study of judges turns attention from abstract jurisdiction to the people, habits, and professional cultures through which law becomes real. Montesquieu likewise treats institutions as socially embedded arrangements rather than commands floating above practice.',
    keyIdeas: [
      'A rule’s effects depend on the offices and procedures that apply it.',
      'Institutional competence and public trust are political goods, not secondary details.',
      'Access, delay, cost, and discretion shape whether formal protections can be used.',
    ],
    cautions: [
      'Hogarth’s satirical grouping is an artistic argument, not a statistical survey of English judges.',
      'Institutional analysis should not excuse unjust rules merely because they are competently administered.',
    ],
    sections: [
      {
        heading: 'Design meets administration',
        paragraph: 'Separation of powers can assign authority, but actual judgment still requires trained officials, intelligible procedure, records, enforcement, and opportunities to be heard. Each element can moderate power or become another site of domination.',
      },
      {
        heading: 'Habits carry institutions',
        paragraph: 'Professional expectations and inherited routines shape how officeholders understand duty. Hogarth’s faces and postures suggest negligence and self-satisfaction, making visible the ethical infrastructure that formal diagrams omit.',
      },
      {
        heading: 'A citizen experiences outcomes',
        paragraph: 'From outside the bench, law is encountered through waiting, expense, language, consistency, and the possibility of appeal. Moderate government therefore requires both constitutional architecture and attention to the ordinary path through it.',
      },
    ],
    sources: [
      collection(
        'National Gallery of Art / Wikimedia Commons — William Hogarth, The Bench, 1758',
        'https://commons.wikimedia.org/wiki/File:William_Hogarth,_The_Bench,_1758,_NGA_30450.jpg',
      ),
      MONTESQUIEU_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'montesquieu'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-liberty-slavery-contradiction',
    assetId: 'enlightenment-wedgwood-abolition-medallion',
    displayName: 'Liberty and the Contradiction of Slavery',
    shortTitle: 'Liberty’s Unfinished Claim',
    workLabel: 'MONTESQUIEU · SLAVERY, IRONY, EMPIRE, AND THE LIMITS OF MODERATION',
    dateLabel: 'Spirit of the Laws, 1748 · abolition medallion modeled c. 1786',
    question: 'What happens when a philosophy of political liberty confronts institutions that deny personhood?',
    frontSubtitle: 'Irony, natural law, racialized slavery, colonial profit, abolition, hierarchy, and political responsibility',
    lead: 'Montesquieu famously exposes the absurdity of European arguments for enslavement by voicing them ironically. Yet he was not an abolitionist organizer and his work retains hierarchies that later critics had to confront. Wedgwood’s campaign medallion carries abolition into public material culture while its kneeling figure encodes a politics of supplication.',
    keyIdeas: [
      'Irony can reveal how self-interest disguises domination as reason.',
      'A theory of liberty is tested by the people its institutions exclude.',
      'Abolitionist images mobilized sympathy while also controlling how enslaved people appeared.',
    ],
    cautions: [
      'Do not promote Montesquieu into a fully modern egalitarian or organized abolitionist.',
      'The medallion opposed slavery, but its kneeling pose is not an unproblematic image of autonomous Black agency.',
    ],
    sections: [
      {
        heading: 'Bad reasons reveal a bad institution',
        paragraph: 'The Spirit of the Laws parodies defenses based on skin color, religion, conquest, and economic convenience. By allowing those arguments to indict themselves, Montesquieu shows how domination recruits supposedly universal reason.',
      },
      {
        heading: 'Critique stopped short',
        paragraph: 'His condemnation matters, but the larger comparative system can explain hierarchy without always demanding its immediate abolition. Later antislavery actors transformed philosophical criticism into campaigns, organizations, petitions, boycotts, and political struggle.',
      },
      {
        heading: 'Sympathy has a visual politics',
        paragraph: 'The Wedgwood medallion circulated widely as a portable emblem. Its question asserts shared humanity, yet the chained kneeling body asks a presumed white viewer for recognition, making the image both historically powerful and ethically constrained.',
      },
    ],
    sources: [
      collection(
        'Brooklyn Museum / Wikimedia Commons — Hackwood and Wedgwood abolition medallion, c. 1786',
        'https://commons.wikimedia.org/wiki/File:Am_I_not_a_Man_and_a_Brother,_medallion_modelled_by_William_H._Hackwood,_Wedgwood,_Etruria,_England,_c._1786,_tinted_stoneware_-_Brooklyn_Museum_-_DSC09289_(cropped).JPG',
      ),
      MONTESQUIEU_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'montesquieu'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-geneva-citizenship',
    assetId: 'enlightenment-geneva-gardelle-view',
    displayName: 'Geneva: Republic, Citizenship, and the Boundary of Membership',
    shortTitle: 'Rousseau’s Geneva',
    workLabel: 'ROUSSEAU · REPUBLICAN CITIZENSHIP AND POLITICAL BELONGING',
    dateLabel: 'Robert Gardelle view, c. 1720–1750 · Social Contract, 1762',
    question: 'Who can belong to a self-governing people, and who remains outside its walls?',
    frontSubtitle: 'Small republic, civic identity, sovereignty, membership, class, gender, residence, and exclusion',
    lead: 'Rousseau signed himself “citizen of Geneva” and made republican self-rule central to his political imagination. The walled city visualizes a bounded civic body: freedom is practiced with others inside institutions, but membership itself is distributed unequally.',
    keyIdeas: [
      'Political freedom requires participation in making the law one obeys.',
      'A people is constituted through institutions and shared practices rather than discovered ready-made.',
      'Every bounded citizen body raises questions about residents, dependents, outsiders, and excluded groups.',
    ],
    cautions: [
      'Eighteenth-century Geneva was neither a modern mass democracy nor an egalitarian republic.',
      'Rousseau’s civic ideal did not extend equal political membership to women and all residents.',
    ],
    sections: [
      {
        heading: 'A city becomes a political reference',
        paragraph: 'Geneva offered Rousseau a vocabulary of citizenship distinct from court society and absolute monarchy. Its scale and republican institutions helped him imagine direct popular sovereignty, even as his relationship to the city remained contentious.',
      },
      {
        heading: 'Freedom is institutional',
        paragraph: 'The citizen is not simply left alone. Rousseau asks how each person can join with all and still obey only a law authored in common. That demanding standard turns procedures of membership and legislation into philosophical questions.',
      },
      {
        heading: 'Walls reveal exclusions',
        paragraph: 'The panoramic view makes political space appear coherent from afar. Closer analysis restores differences among citizens, inhabitants, servants, women, migrants, and the poor, whose unequal status complicates any seamless picture of “the people.”',
      },
    ],
    sources: [
      collection(
        'Zentralbibliothek Zürich / Wikimedia Commons — Robert Gardelle, western view of Geneva',
        'https://commons.wikimedia.org/wiki/File:Zentralbibliothek_Z%C3%BCrich_-_Vue_de_Geneve_du_cot%C3%A9_du_Couchant_-_991081642359705501.jpg',
      ),
      ROUSSEAU_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'rousseau'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-luxury-amour-propre',
    assetId: 'enlightenment-fragonard-swing',
    displayName: 'Luxury, Spectacle, and Amour-Propre',
    shortTitle: 'The Social Mirror',
    workLabel: 'ROUSSEAU · RECOGNITION, DEPENDENCE, LUXURY, AND APPEARANCE',
    dateLabel: 'Jean-Honoré Fragonard, The Swing, c. 1767–1768',
    question: 'How does needing the esteem of others reshape desire, comparison, and freedom?',
    frontSubtitle: 'Amour de soi, amour-propre, status, spectatorship, inequality, leisure, and the theatrical self',
    lead: 'Rousseau distinguishes basic self-concern from amour-propre, a socially formed concern with how one ranks in the eyes of others. Fragonard’s elite scene is not an illustration commissioned for Rousseau; it is a cultural counterpoint for a world of display, concealed spectators, leisure, and unequal resources.',
    keyIdeas: [
      'Amour-propre arises through comparison and dependence on another person’s judgment.',
      'Social recognition can support moral equality or intensify rivalry and humiliation.',
      'Luxury is politically significant when display depends on invisible labor and unequal standing.',
    ],
    cautions: [
      'The Swing does not depict a scene or character from Rousseau’s writing.',
      'Rousseau does not claim that every social relation or desire for recognition is intrinsically corrupt.',
    ],
    sections: [
      {
        heading: 'The self acquires an audience',
        paragraph: 'Once people compare themselves, esteem becomes scarce and appearances acquire strategic value. Desire can turn from meeting needs toward occupying a superior position, making identity dependent on judgments no individual controls.',
      },
      {
        heading: 'Recognition is ambivalent',
        paragraph: 'The same capacity that fuels vanity also makes respect and equal standing intelligible. Rousseau’s problem is not merely sociality, but institutions that organize recognition through domination, wealth, and public inequality.',
      },
      {
        heading: 'A painting supplies context, not proof',
        paragraph: 'Fragonard stages a playful aristocratic spectacle whose laboring and economic supports remain outside the frame. The juxtaposition opens Rousseau’s critique of luxury without pretending that the canvas documents his concepts one for one.',
      },
    ],
    sources: [
      collection(
        'Wallace Collection / Wikimedia Commons — Jean-Honoré Fragonard, The Swing',
        'https://commons.wikimedia.org/wiki/File:Fragonard,_The_Swing.jpg',
      ),
      ROUSSEAU_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'rousseau'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-education-forms-person',
    assetId: 'enlightenment-chardin-schoolmistress',
    displayName: 'Education Forms the Person',
    shortTitle: 'Émile and the Educated Self',
    workLabel: 'ROUSSEAU · ÉMILE, DEVELOPMENT, DEPENDENCE, AND GENDER',
    dateLabel: 'Émile published, 1762 · Chardin school scene, c. 1736',
    question: 'Can education cultivate independent judgment without secretly arranging the learner’s world?',
    frontSubtitle: 'Development, experience, tutor, childhood, dependence, Sophie, gender, and Wollstonecraft’s reply',
    lead: 'Émile treats childhood as a distinctive stage and asks how education might protect judgment from social vanity. Yet the tutor carefully engineers experience, and the education prescribed for Sophie makes women’s formation subordinate to men. Chardin’s domestic lesson is period context, not a portrait of Rousseau’s fictional pupils.',
    keyIdeas: [
      'Education should attend to developmental capacities rather than treat a child as a small adult.',
      'Learning through consequences can still be shaped by an educator’s hidden control.',
      'The contrast between Émile and Sophie exposes the political stakes of gendered schooling.',
    ],
    cautions: [
      'Chardin’s figures are not Émile, Sophie, or a documented Rousseau classroom.',
      'Rousseau’s innovative account of childhood does not erase the unequal gender program Wollstonecraft challenged.',
    ],
    sections: [
      {
        heading: 'Childhood has its own tempo',
        paragraph: 'Rousseau resists premature abstraction and moralizing. The pupil encounters objects, limits, practical problems, and carefully staged consequences, allowing capacities to develop before society’s competitive judgments dominate them.',
      },
      {
        heading: 'Freedom can be managed from behind',
        paragraph: 'Émile often experiences choices as his own, but the tutor has arranged the environment. This paradox asks whether autonomy can be produced through dependence and how much educational authority can remain invisible without becoming manipulation.',
      },
      {
        heading: 'Sophie reveals an unequal design',
        paragraph: 'The female curriculum is directed toward pleasing and supporting men rather than equal independence. Wollstonecraft targets precisely this manufactured weakness, arguing that unequal education creates the traits later cited as evidence of natural inferiority.',
      },
    ],
    sources: [
      collection(
        'Wikimedia Commons — Jean Siméon Chardin, The Young Schoolmistress, c. 1736',
        'https://commons.wikimedia.org/wiki/File:Jean_Sim%C3%A9on_Chardin_-_The_Young_Schoolmistress_-_WGA04750FXD.jpg',
      ),
      ROUSSEAU_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'rousseau'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-general-will',
    assetId: 'enlightenment-thevenin-federation',
    displayName: 'The General Will: Freedom in Common',
    shortTitle: 'The General Will',
    workLabel: 'ROUSSEAU · POPULAR SOVEREIGNTY, LAW, AND THE COMMON GOOD',
    dateLabel: 'Social Contract, 1762 · Fête de la Fédération held 1790, painted 1792',
    question: 'How can citizens author laws for a common good without allowing a faction or leader to speak for everyone?',
    frontSubtitle: 'Sovereignty, citizen, law, common interest, majority, faction, civic unity, and political danger',
    lead: 'The general will is oriented toward a common interest; it is not simply the sum of private preferences and not whatever a ruler declares. Thévenin’s revolutionary festival shows a later attempt to stage national unity. Its immense choreography also exposes the risk that visible unanimity can conceal dissent.',
    keyIdeas: [
      'Sovereignty belongs to the people as a collective lawmaking body and cannot be represented away.',
      'The general will concerns shared conditions, while a “will of all” may aggregate private interests.',
      'Institutions must help citizens deliberate without permanent factions capturing the public voice.',
    ],
    cautions: [
      'The general will is not equivalent to a leader’s command or automatically identical with any majority vote.',
      'The 1790 festival is later revolutionary reception, not an event Rousseau attended or directed.',
    ],
    sections: [
      {
        heading: 'Common does not mean unanimous',
        paragraph: 'Rousseau asks citizens to judge as members of a whole rather than bargain only for private advantage. Disagreement can remain, but legitimate law must address everyone in general terms instead of naming a privileged beneficiary.',
      },
      {
        heading: 'The people cannot surrender authorship',
        paragraph: 'Officials may administer, propose, or execute, yet sovereignty remains with citizens. That distinction protects popular agency while leaving difficult questions about scale, participation, information, and durable disagreement.',
      },
      {
        heading: 'Unity can become spectacle',
        paragraph: 'The Fête de la Fédération celebrated a reconciled nation through bodies arranged around a common altar. The image captures collective aspiration, but its elevated viewpoint warns how easily political diversity can be composed into a single authorized picture.',
      },
    ],
    sources: [
      collection(
        'Musée Carnavalet / Wikimedia Commons — Charles Thévenin, Fête de la Fédération',
        'https://commons.wikimedia.org/wiki/File:Charles_Th%C3%A9venin_-_La_f%C3%AAte_de_la_F%C3%A9d%C3%A9ration,_le_14_juillet_1790,_au_Champ-de-Mars,_actuel_7%C3%A8me_arrondissement_-_La_F%C3%AAte_de_la_F%C3%A9d%C3%A9ration,_le_14_juillet_1790,_au_Champ-de-Mars_-_Mus%C3%A9e_Carnavalet_-_2.jpg',
      ),
      ROUSSEAU_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'rousseau'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-rousseau-botany',
    assetId: 'enlightenment-rousseau-botanizing',
    displayName: 'Botany, Walking, and Disciplined Attention',
    shortTitle: 'Rousseau Botanizing',
    workLabel: 'ROUSSEAU · REVERIE, SOLITUDE, MEMORY, AND NATURAL HISTORY',
    dateLabel: 'Reveries written 1776–1778 · displayed print after a scene of June 1778',
    question: 'Can close attention to ordinary plants loosen the grip of status, injury, and public performance?',
    frontSubtitle: 'Walking, collecting, observation, reverie, classification, solitude, memory, and self-knowledge',
    lead: 'In the Reveries of the Solitary Walker, Rousseau connects walking and botany with attention, memory, and relief from the social world. His practice is not a simple flight “back to nature”: collecting and identifying plants demand learned distinctions, material routines, and sustained observation.',
    keyIdeas: [
      'Botanical attention redirects the mind from reputation toward particular living forms.',
      'Walking creates a rhythm in which observation, memory, and reflection interact.',
      'Solitude can offer respite without resolving Rousseau’s dependence on an imagined public.',
    ],
    cautions: [
      'Do not reduce Rousseau’s botany to a slogan about rejecting knowledge or civilization.',
      'The print is a commemorative representation, not a photograph or neutral eyewitness record.',
    ],
    sections: [
      {
        heading: 'Attention becomes a practice',
        paragraph: 'Naming a plant requires noticing form, habitat, relation, and difference. The activity anchors reverie in repeated encounters with material particulars rather than leaving reflection wholly inside the solitary self.',
      },
      {
        heading: 'Walking reorganizes thought',
        paragraph: 'Movement through a landscape permits memories and sensations to arise without the timetable of formal argument. Rousseau turns this loose sequence into philosophical writing about happiness, injury, dependence, and presence.',
      },
      {
        heading: 'Solitude still has an audience',
        paragraph: 'The withdrawn walker writes to explain and preserve himself for possible readers. That tension keeps the Reveries connected to amour-propre and recognition even as botany offers temporary freedom from public judgment.',
      },
    ],
    sources: [
      collection(
        'Musée Carnavalet / Wikimedia Commons — Rousseau botanizing at Ermenonville, after Mayer',
        'https://commons.wikimedia.org/wiki/File:Jean-Jacques_Rousseau_herborisant_%C3%A0_Ermenonville_en_juin_1778,_G.21034(2).jpg',
      ),
      ROUSSEAU_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'rousseau'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-sympathy-judgment',
    assetId: 'enlightenment-greuze-punished-son',
    displayName: 'Sympathy and the Labor of Moral Judgment',
    shortTitle: 'Smith’s Impartial Spectator',
    workLabel: 'ADAM SMITH · SYMPATHY, PROPRIETY, AND THE IMPARTIAL SPECTATOR',
    dateLabel: 'Theory of Moral Sentiments, 1759 · Greuze painting, 1778',
    question: 'How can a spectator judge another person fairly when experience is never shared directly?',
    frontSubtitle: 'Imagination, sympathy, emotion, propriety, self-command, spectatorship, and social correction',
    lead: 'For Smith, sympathy is an imaginative effort to enter another person’s situation, not automatic pity and not approval. Greuze’s charged family drama invites spectators to read gesture, grief, blame, and reconciliation, making visible the interpretive labor on which moral judgment depends.',
    keyIdeas: [
      'We imaginatively reconstruct a situation because another person’s feeling is not directly available.',
      'Sympathy can occur with painful or blameworthy emotions without endorsing the action involved.',
      'The impartial spectator is a disciplined standpoint formed through social exchange, not an all-knowing observer.',
    ],
    cautions: [
      'Smith’s “sympathy” should not be translated simply as compassion or agreement.',
      'Greuze’s theatrical moral scene elicits judgment; it does not demonstrate that viewers judge impartially.',
    ],
    sections: [
      {
        heading: 'Feeling requires interpretation',
        paragraph: 'A spectator responds not merely to an expression but to an understood situation. Information, distance, prejudice, and imagination therefore influence whether emotional correspondence succeeds or fails.',
      },
      {
        heading: 'Propriety is relational',
        paragraph: 'Actors moderate expression to become intelligible to spectators, while spectators stretch imagination toward actors. Moral life develops through this adjustment, not through either private feeling or external rule alone.',
      },
      {
        heading: 'The spectator must be corrected',
        paragraph: 'Actual audiences can be partial, fashionable, powerful, or misinformed. Smith’s impartial spectator internalizes a more even standard, but the ideal remains a practice of self-scrutiny rather than a guarantee against social bias.',
      },
    ],
    sources: [
      collection(
        'Musée du Louvre / Wikimedia Commons — Jean-Baptiste Greuze, The Punished Son, 1778',
        'https://commons.wikimedia.org/wiki/File:Jean-Baptiste_Greuze_-_The_Punished_Son.jpg',
      ),
      SMITH_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'adam-smith'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-division-labor',
    assetId: 'enlightenment-encyclopedie-pinmaking',
    displayName: 'The Pin Workshop: Productivity and Narrowed Lives',
    shortTitle: 'Division of Labor',
    workLabel: 'ADAM SMITH · SPECIALIZATION, PRODUCTIVITY, EXCHANGE, AND EDUCATION',
    dateLabel: 'Encyclopédie pinmaking plate published 1763 · Wealth of Nations, 1776',
    question: 'What does specialization create, and what capacities can repetitive work diminish?',
    frontSubtitle: 'Pinmaking, dexterity, task separation, machinery, market extent, monotony, and public education',
    lead: 'Smith’s pin-factory example explains how specialization increases output through dexterity, saved transition time, and machinery. He also warns that extremely repetitive labor can narrow workers’ capacities and argues for public education. The Encyclopédie plate shows a related trade; it is not evidence that Smith copied this exact image or workshop.',
    keyIdeas: [
      'Dividing a process into tasks can increase productive coordination dramatically.',
      'The extent of specialization depends on the size and organization of exchange.',
      'Economic productivity does not by itself secure the intellectual development of workers.',
    ],
    cautions: [
      'The displayed plate is contextual evidence for pinmaking, not the documented source of Smith’s example.',
      'Smith’s analysis includes the human cost of repetitive labor; it is not uncomplicated praise of factory discipline.',
    ],
    sections: [
      {
        heading: 'A process becomes a system',
        paragraph: 'Pinmaking is decomposed into drawing wire, straightening, cutting, pointing, heading, whitening, and packaging. Output rises because tools, movements, and workers are coordinated across a repeated sequence.',
      },
      {
        heading: 'Markets shape specialization',
        paragraph: 'A specialized producer must rely on exchange for most needs. For Smith, division of labor is therefore connected to transport, institutions, demand, bargaining, and the widening network in which production occurs.',
      },
      {
        heading: 'Public judgment needs cultivation',
        paragraph: 'When a life is confined to a few simple operations, powers of reasoning and civic judgment may atrophy. Smith’s support for elementary public education belongs inside his political economy, not outside it as an unrelated moral afterthought.',
      },
    ],
    sources: [
      collection(
        'Wikimedia Commons — Encyclopédie, Épinglier plate II, published 1763',
        'https://commons.wikimedia.org/wiki/File:Encyclopedie_volume_3-057.jpg',
      ),
      SMITH_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'adam-smith'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-commerce-social-world',
    assetId: 'enlightenment-vernet-bordeaux-harbor',
    displayName: 'The Harbor as a Social World',
    shortTitle: 'Commerce Needs Institutions',
    workLabel: 'ADAM SMITH · EXCHANGE, INFRASTRUCTURE, JUSTICE, AND TRUST',
    dateLabel: 'Claude-Joseph Vernet, Bordeaux harbor, 1758',
    question: 'Which visible and invisible institutions allow strangers to coordinate through exchange?',
    frontSubtitle: 'Harbor, labor, credit, contract, transport, security, customs, information, and public works',
    lead: 'Vernet’s crowded harbor makes commerce visible as coordinated labor rather than an abstract flow of prices. Ships, porters, warehouses, roads, credit, law, and political authority sustain exchange. Smith’s commercial society depends on justice and public works even when no single actor directs the whole.',
    keyIdeas: [
      'Decentralized exchange relies on shared rules, information, enforcement, and infrastructure.',
      'Prices coordinate some decisions but do not build every precondition of a market.',
      'A commercial scene joins local labor to distant networks whose risks and benefits are unevenly distributed.',
    ],
    cautions: [
      'The painting is a composed harbor view, not a complete inventory of Bordeaux’s economy.',
      'Calling exchange “free” should not hide legal privilege, unequal bargaining power, colonial goods, or coerced labor.',
    ],
    sections: [
      {
        heading: 'Coordination has a material setting',
        paragraph: 'Cargo must be moved, stored, measured, insured, financed, and delivered. Each task depends on skills and facilities that outlast a single transaction, showing how markets are nested within collective investments and enforceable expectations.',
      },
      {
        heading: 'Justice is economically necessary',
        paragraph: 'Smith treats security of person and possession and a workable administration of justice as conditions of commercial life. Trust among strangers is not pure sentiment; it is supported by reputation, convention, and institutions.',
      },
      {
        heading: 'The network extends beyond the frame',
        paragraph: 'A European harbor connects producers and consumers across seas while obscuring many people who bear the costs of extraction, war, and empire. The lively foreground should prompt inquiry into the routes and power behind its abundance.',
      },
    ],
    sources: [
      collection(
        'Musée national de la Marine / Wikimedia Commons — Claude-Joseph Vernet, View of Bordeaux Harbor, 1758',
        'https://commons.wikimedia.org/wiki/File:Vernet-port-Bordeaux.jpg',
      ),
      SMITH_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'adam-smith'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-chartered-monopoly',
    assetId: 'enlightenment-luny-hindostan',
    displayName: 'Chartered Monopoly: Commerce Armed with Sovereignty',
    shortTitle: 'Trade, Monopoly, and Empire',
    workLabel: 'ADAM SMITH · EAST INDIA COMPANY, MONOPOLY, COLONY, AND COERCION',
    dateLabel: 'Wealth of Nations, 1776 · Hindostan painted 1792',
    question: 'What changes when a trading corporation can tax, govern, wage war, and exclude competitors?',
    frontSubtitle: 'Charter, monopoly, East India Company, sovereignty, colonial extraction, lobbying, and accountability',
    lead: 'Smith sharply criticized exclusive trading companies, especially when merchants acquired governmental power over distant populations. Thomas Luny’s East Indiaman was painted two years after Smith’s death, so it supplies later visual context rather than evidence he saw. The ship joins commerce to a corporate-imperial system backed by law and force.',
    keyIdeas: [
      'Monopoly can redirect public power toward a narrow group’s private advantage.',
      'A corporation exercising sovereignty creates conflicts between trade, rule, and accountability.',
      'Commercial wealth may conceal coercive relations beyond the consumer’s field of view.',
    ],
    cautions: [
      'The painting dates to 1792 and should not be presented as an object from Smith’s own viewing history.',
      'Criticism of monopoly did not make Smith a comprehensive critic of empire or all colonial assumptions.',
    ],
    sections: [
      {
        heading: 'A charter creates privilege',
        paragraph: 'Exclusive legal rights suppress rivals and allow merchants to influence the rules under which they trade. Smith argues that such arrangements confuse the interest of a company with the interest of the public.',
      },
      {
        heading: 'The merchant becomes a ruler',
        paragraph: 'The East India Company collected revenue, maintained armed forces, and governed territories. Its dual role intensified the danger that decisions affecting millions would be judged by distant shareholders and officials seeking gain.',
      },
      {
        heading: 'A ship is an institutional object',
        paragraph: 'The East Indiaman embodies navigation, finance, shipbuilding, military protection, chartered rights, and colonial routes. Reading it only as maritime beauty would remove the legal and coercive structure that made its voyages possible.',
      },
    ],
    sources: [
      collection(
        'Royal Museums Greenwich / Wikimedia Commons — Thomas Luny, the East Indiaman Hindostan, 1792',
        'https://commons.wikimedia.org/wiki/File:Thomas_Luny_(1759-1837)_-_The_East_Indiaman_%27Hindostan%27_(%27Hindustan%27)_and_Other_Vessels_-_BHC3403_-_Royal_Museums_Greenwich.jpg',
      ),
      SMITH_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'adam-smith'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-industry-public-judgment',
    assetId: 'enlightenment-sandby-iron-forge',
    displayName: 'Industry and the Capacity for Public Judgment',
    shortTitle: 'The Forge and the Citizen',
    workLabel: 'ADAM SMITH · PRODUCTIVE GROWTH, REPETITIVE LABOR, AND PUBLIC EDUCATION',
    dateLabel: 'Paul Sandby, Iron Forge on the River Kent, undated · Wealth of Nations, 1776',
    question: 'Can a wealthy commercial society remain free if its labor system weakens attention and civic judgment?',
    frontSubtitle: 'Industry, skill, routine, machinery, class, public instruction, civic capacity, and state responsibility',
    lead: 'Smith welcomes productive improvement but refuses to assume that wealth automatically develops the people who create it. Repetitive occupation can make a worker less able to exercise broader judgment. His remedy includes publicly supported education, placing civic capacity among the responsibilities of commercial society.',
    keyIdeas: [
      'Economic growth and human development are related but not identical measures.',
      'Specialized work can cultivate expert skill while narrowing other capacities.',
      'Public education helps sustain judgment in a society structured by division of labor.',
    ],
    cautions: [
      'The forge is an undated artistic view, not a documented workplace studied by Smith.',
      'Smith’s educational remedy was limited by his period and should not be converted into a complete modern welfare program.',
    ],
    sections: [
      {
        heading: 'Skill can deepen and narrow',
        paragraph: 'Repeated work develops speed and dexterity within a task, yet the same routine may leave little occasion for varied reasoning. Smith holds both results together rather than treating specialization as either pure progress or pure degradation.',
      },
      {
        heading: 'Citizenship requires exercise',
        paragraph: 'A person whose daily life offers few opportunities for inquiry may be less prepared to assess public claims or resist superstition and manipulation. Political judgment therefore depends partly on the organization of ordinary work.',
      },
      {
        heading: 'Education is public infrastructure',
        paragraph: 'Smith permits and encourages government action to make elementary instruction widely accessible. The proposal shows that a commercial order must reproduce capacities that market incentives alone may neglect.',
      },
    ],
    sources: [
      collection(
        'Yale Center for British Art / Wikimedia Commons — Paul Sandby, Iron Forge on the River Kent',
        'https://commons.wikimedia.org/wiki/File:Paul_Sandby_-_Iron_Forge_on_the_River_Kent,_Westmorland_-_Google_Art_Project.jpg',
      ),
      SMITH_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'adam-smith'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-marriage-domestic-government',
    assetId: 'enlightenment-hogarth-marriage-settlement',
    displayName: 'Marriage as Domestic Government',
    shortTitle: 'Who Governs at Home?',
    workLabel: 'ASTELL AND WOLLSTONECRAFT · CONSENT, MARRIAGE, PROPERTY, AND AUTHORITY',
    dateLabel: 'Astell’s Some Reflections upon Marriage, 1700 · Hogarth scene, c. 1743',
    question: 'Can political arguments against arbitrary rule stop at the household door?',
    frontSubtitle: 'Consent, coverture, property, education, rank, dependence, domestic authority, and hypocrisy',
    lead: 'Mary Astell asks why a woman born free should become subject to an absolute sovereign in marriage; Wollstonecraft later connects domestic dependence to deficient education and civic inequality. Hogarth’s satirical aristocratic contract scene exposes marriage as an economic and dynastic institution, though it cannot represent every household.',
    keyIdeas: [
      'Marriage distributes authority, property, legal identity, labor, and opportunity.',
      'Appeals to consent ring hollow when education and economic dependence constrain meaningful choice.',
      'The household tests whether political principles are genuinely universal.',
    ],
    cautions: [
      'Hogarth satirizes an elite arranged marriage and should not stand in for all women’s experiences.',
      'Astell criticized arbitrary marital power while retaining theological and hierarchical commitments distinct from later feminism.',
    ],
    sections: [
      {
        heading: 'Private power is political',
        paragraph: 'Astell’s analogy between husbands and absolute monarchs turns the household into a site of constitutional criticism. If arbitrary authority is irrational in the state, its defense in marriage demands more than custom.',
      },
      {
        heading: 'Consent needs conditions',
        paragraph: 'Formal agreement cannot bear the full weight of legitimacy when women lack education, property control, professions, and safe alternatives. Dependence structures the choices later described as voluntary.',
      },
      {
        heading: 'A contract joins families and fortunes',
        paragraph: 'Hogarth shows lawyers, titles, money, and distracted spouses surrounding the settlement. The scene makes visible the institutional scaffolding of marriage while its class specificity cautions against treating one satire as universal social evidence.',
      },
    ],
    sources: [
      collection(
        'National Gallery, London / Wikimedia Commons — William Hogarth, The Marriage Settlement',
        'https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Marriage_A-la-Mode_1_The_Marriage_Settlement.jpg',
      ),
      ASTELL_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'mary-astell'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-women-public-intellectuals',
    assetId: 'enlightenment-samuel-nine-muses',
    displayName: 'Women as Public Intellectuals',
    shortTitle: 'Recognition and the Learned Woman',
    workLabel: 'AUTHORSHIP, CONVERSATION, PATRONAGE, PUBLICATION, AND INTELLECTUAL AUTHORITY',
    dateLabel: 'Richard Samuel, Portraits in the Characters of the Muses, 1778',
    question: 'How do women enter public intellectual life when institutions control education, publication, and reputation?',
    frontSubtitle: 'Bluestockings, authorship, salons, portraiture, elite networks, allegory, recognition, and exclusion',
    lead: 'Richard Samuel’s group portrait celebrates nine contemporary learned women through the classical Muses. It demonstrates public recognition while also translating achievement into elite allegory. Neither Mary Astell nor Mary Wollstonecraft appears in the painting, which belongs to a later network and must not be used as their group portrait.',
    keyIdeas: [
      'Intellectual work depends on access to education, books, correspondence, publishers, and audiences.',
      'Collective networks can create authority where universities and professions exclude women.',
      'Recognition may broaden participation while framing women through restrictive ideals of refinement.',
    ],
    cautions: [
      'The nine sitters do not include Astell or Wollstonecraft.',
      'The elite Bluestocking milieu did not represent all women or erase barriers of class, race, labor, and religion.',
    ],
    sections: [
      {
        heading: 'The portrait names a network',
        paragraph: 'The sitters are Anna Laetitia Barbauld, Elizabeth Carter, Elizabeth Griffith, Angelica Kauffman, Charlotte Lennox, Catharine Macaulay, Elizabeth Montagu, Hannah More, and Elizabeth Ann Sheridan. Naming them prevents “learned women” from becoming an anonymous decorative type.',
      },
      {
        heading: 'Public thought needs infrastructure',
        paragraph: 'Conversation, correspondence, patronage, print, translation, and reviewing helped women build intellectual careers outside formal academic office. Those channels could enable work while leaving reputations vulnerable to gatekeepers.',
      },
      {
        heading: 'Allegory both honors and contains',
        paragraph: 'Classical drapery presents women’s learning as culturally elevated, but it also filters individual lives through a controlled ideal. The image asks whether recognition accepts women as thinkers or only after converting them into exemplary symbols.',
      },
    ],
    sources: [
      collection(
        'National Portrait Gallery / Wikimedia Commons — Richard Samuel, Portraits in the Characters of the Muses, 1778',
        'https://commons.wikimedia.org/wiki/File:Portraits_in_the_Characters_of_the_Muses_in_the_Temple_of_Apollo_by_Richard_Samuel.jpg',
      ),
      ASTELL_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'mary-astell'},
    entityKind: 'philosopher',
    articleActionLabel: 'Open Mary Astell in the Atlas',
  }),
  record({
    id: 'enlightenment-access-to-knowledge',
    assetId: 'enlightenment-duchesse-du-maine-astronomy-lesson',
    displayName: 'Access to Knowledge: Who Controls the Instrument?',
    shortTitle: 'Astronomy at Sceaux',
    workLabel: 'EDUCATION, SCIENTIFIC CULTURE, COURTLY PRIVILEGE, INSTRUMENT, AND AUTHORITY',
    dateLabel: 'François de Troy, Astronomy Lesson of the Duchesse du Maine, c. 1705',
    question: 'Does access to a scientific lesson amount to intellectual equality when education and instruments remain privileges of court and rank?',
    frontSubtitle: 'Astronomy, learned attention, private instruction, instrument, library, gender, rank, and independent judgment',
    lead: 'François de Troy places Louise Bénédicte, Duchesse du Maine, inside a richly furnished astronomy lesson with books, globes, diagrams, an armillary sphere, and two male intellectuals. The scene makes a woman’s learned attention unmistakable. It also locates that access inside an exceptional courtly household rather than a public system of equal education.',
    keyIdeas: [
      'Scientific understanding requires more than proximity: learners need time, tools, explanation, practice, and permission to question.',
      'Elite rank could open exceptional routes to learning while leaving the ordinary educational order intact.',
      'Astell and Wollstonecraft turn privileged exceptions into a universal institutional demand for women’s rational development.',
    ],
    cautions: [
      'This is a courtly group portrait, not an unposed record of a particular lesson or a survey of women’s education.',
      'One duchess receiving private instruction should not be mistaken for equal access across class, sex, or institution.',
    ],
    sections: [
      {
        heading: 'A woman occupies the learned center',
        paragraph: 'The duchess is not scenery around a male demonstration: her attention anchors the composition. Books, celestial instruments, and the library present astronomy as something she studies, while the two men and their gestures make mediation and authority part of the scene.',
      },
      {
        heading: 'Privilege opens one door and leaves others shut',
        paragraph: 'Private wealth and rank could secure tutors, libraries, instruments, and intellectual company. That exception exposes the institutional question: why should access depend on birth or patronage if rational capacity is not confined to an elite household?',
      },
      {
        heading: 'Who gets to handle the instrument?',
        paragraph: 'A lesson can cultivate judgment or preserve dependence on an authorized interpreter. Astell and Wollstonecraft demand conditions in which women become sustained reasoners—able to learn, practice, test, publish, criticize, and teach—rather than admired exceptions or permanent audiences.',
      },
    ],
    sources: [
      collection(
        'Musée du Domaine départemental de Sceaux / Wikimedia Commons — Astronomy Lesson of the Duchesse du Maine',
        'https://commons.wikimedia.org/wiki/File:La_Le%C3%A7on_d%E2%80%99astronomie_de_la_duchesse_du_Maine_-_Fran%C3%A7ois_de_Troy.jpg',
      ),
      collection(
        'Musée du Domaine départemental de Sceaux — collection record 88.24.1',
        'https://collections.domaine-de-sceaux.hauts-de-seine.fr/fr/notice/88-24-1-la-lecon-d-astronomie-de-la-duchesse-du-maine-au-chateau-de-sceaux-2910cf49-8353-4f59-8409-b8cbc8a87c34',
      ),
      WOLLSTONECRAFT_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'wollstonecraft'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-revolution-from-street',
    assetId: 'enlightenment-womens-march-versailles',
    displayName: 'Revolution from the Street',
    shortTitle: 'The Women’s March to Versailles',
    workLabel: 'BREAD, POLITICAL AGENCY, RIGHTS LANGUAGE, AND REVOLUTIONARY ACTION',
    dateLabel: 'Women’s March on Versailles, 5–6 October 1789 · contemporary anonymous print',
    question: 'How does political agency change when people excluded from formal office act collectively in public?',
    frontSubtitle: 'Market women, bread, petition, crowd, monarchy, National Assembly, violence, memory, and rights',
    lead: 'Thousands of women marched from Paris to Versailles amid a subsistence crisis, pressing demands over bread and the political order and helping compel the royal family’s return to Paris. The marchers are not stand-ins for Wollstonecraft, but their action reveals a revolutionary public broader than formal citizenship.',
    keyIdeas: [
      'Material need and constitutional politics were intertwined rather than separate motives.',
      'Collective action can create political leverage for people denied ordinary institutional power.',
      'Representations of crowds shape whose agency appears disciplined, threatening, heroic, or irrational.',
    ],
    cautions: [
      'Do not collapse thousands of participants into a single motive, class identity, or political program.',
      'The anonymous print constructs the march visually and should not be treated as a transparent eyewitness photograph.',
    ],
    sections: [
      {
        heading: 'Bread is a political demand',
        paragraph: 'Scarcity, price, provisioning, and distrust of royal policy brought household survival into national politics. The march demonstrates how the economy of daily life can expose the legitimacy of institutions.',
      },
      {
        heading: 'Exclusion does not mean passivity',
        paragraph: 'Women without formal political equality petitioned, organized, negotiated, and occupied public space. Their action complicates any history in which rights descend only from philosophical texts or legislative assemblies.',
      },
      {
        heading: 'Revolutionary agency remains contested',
        paragraph: 'Participants sought bread, accountability, and political change through a volatile event that included coercion and violence. Later retellings alternately celebrated and caricatured them, making the image’s own rhetoric part of the exhibit.',
      },
    ],
    sources: [
      collection(
        'Bibliothèque nationale de France, Gallica / Wikimedia Commons — anonymous contemporary print of the Women’s March to Versailles',
        'https://commons.wikimedia.org/wiki/File:A_Versailles,_%C3%A0_Versailles_5_octobre_1789_-_Restoration.jpg',
      ),
      WOLLSTONECRAFT_REFERENCE,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'wollstonecraft'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'enlightenment-kant-sublime',
    assetId: 'enlightenment-kant-sublime-monk-sea',
    displayName: 'Kant’s Sublime',
    shortTitle: 'Kant’s Sublime',
    workLabel: 'MATHEMATICAL AND DYNAMICAL SUBLIME · IMAGINATION, REASON, AND JUDGMENT',
    dateLabel: 'Critique of the Power of Judgment, 1790 · Friedrich painting, 1808–1810',
    question: 'Why can overwhelming magnitude or might expose imagination’s limits yet awaken reason’s claim to a supersensible vocation?',
    frontSubtitle: 'Magnitude, might, imagination’s failure, displeasure, reason, supersensible vocation, safety, and the judging subject',
    lead: 'Kant distinguishes a mathematical sublime, occasioned by magnitude that defeats imagination’s effort to comprehend a whole, from a dynamical sublime, occasioned by nature’s might when we can contemplate it from safety. In both, an initial displeasure at imagination’s inadequacy gives way to an elevated awareness that reason demands ideas—such as totality and moral freedom—that sensible presentation cannot contain.',
    keyIdeas: [
      'The mathematical sublime concerns magnitude beyond imagination’s capacity to gather a sensible whole, not merely a very large measured quantity.',
      'The dynamical sublime concerns overwhelming natural might contemplated without immediate danger; terror that simply overwhelms us does not yet produce the reflective judgment Kant describes.',
      'The transition from displeasure to pleasure reveals, for Kant, a supersensible vocation of reason rather than a newly discovered property inside the object.',
    ],
    cautions: [
      'Kant locates sublimity principally in the judging subject: nature supplies an occasion, but the mountain, storm, or sea is not sublime as an objective property in the same way it can be physically large or powerful.',
      'Friedrich completed The Monk by the Sea after Kant’s 1790 book. The painting is an interpretive companion, not an illustration commissioned or endorsed by Kant.',
    ],
    sections: [
      {
        heading: 'When imagination cannot make a whole',
        paragraph: 'In the mathematical sublime, imagination can keep apprehending successive parts yet fails to comprehend them together at the scale reason demands. The mismatch is felt as displeasure. Reflection then redirects attention from sensible mastery toward reason’s idea of totality, which no image can adequately present.',
      },
      {
        heading: 'Might without submission',
        paragraph: 'In the dynamical sublime, storms, cliffs, oceans, and other powers make bodily vulnerability vivid. When viewed from a position of safety, their might can reveal that physical nature does not exhaust the standards by which a rational and moral subject understands its vocation. This is not a claim that bodies become invulnerable.',
      },
      {
        heading: 'The sublime belongs to judgment',
        paragraph: 'The object occasions the experience, but sublimity names a reflective movement within the subject: imagination fails, reason’s demand becomes palpable, and displeasure turns into a distinct pleasure. Friedrich’s spare horizon can help viewers test this structure, provided the later painting is not mistaken for Kant’s own example or historical endorsement.',
      },
    ],
    sources: [
      collection(
        'Alte Nationalgalerie / Wikimedia Commons — Caspar David Friedrich, The Monk by the Sea',
        'https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Der_M%C3%B6nch_am_Meer_-_Google_Art_Project.jpg',
      ),
      collection(
        'Staatliche Museen zu Berlin — The Monk by the Sea, object 965511',
        'https://id.smb.museum/object/965511/',
      ),
      academic(
        'Stanford Encyclopedia of Philosophy — Kant’s Aesthetics and Teleology',
        'https://plato.stanford.edu/entries/kant-aesthetics/',
      ),
      academic(
        'Project Gutenberg — Kant’s Critique of Judgement',
        'https://www.gutenberg.org/ebooks/48433',
      ),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'kant'},
    entityKind: 'philosopher',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

export type EnlightenmentSupplementalExhibitLayout = MuseumSupplementalExhibitLayout & {
  /** Exact authored curation slot; retained for occupancy and wall-clearance audits. */
  slotId: string;
  backingWallId: string;
};

const authoredSlotLayout = ({
  id,
  parentExhibitId,
  guidedAfterExhibitId,
  slotId,
  assetId,
  mediaWidth,
  mediaHeight,
  kind,
  accent,
}: {
  id: EnlightenmentSupplementalExhibitId;
  parentExhibitId: MuseumExhibitId;
  guidedAfterExhibitId: MuseumExhibitId;
  slotId: string;
  assetId: EnlightenmentGalleryAssetId;
  mediaWidth: number;
  mediaHeight: number;
  kind: EnlightenmentInstallationKind;
  accent: string;
}): EnlightenmentSupplementalExhibitLayout => {
  const slot = getEnlightenmentInstallationSlot(slotId);
  const idValue = supplementalId(id);
  const assetIdValue = museumAssetId(assetId);
  const position = {x: slot.x, z: slot.z};
  const authored = authorSupplementalLayout({
    id: idValue,
    parentExhibitId,
    guidedAfterExhibitId,
    zoneId: slot.zoneId as MuseumZoneId,
    position,
    rotationY: slot.rotationY,
    assetId: assetIdValue,
    mediaWidth,
    mediaHeight,
    installationKind: installationKind(kind),
    accent,
    width: 3.58,
  });
  return {
    ...authored,
    spatialCellId: slot.spatialCellId,
    interactionRadius: 3.3,
    viewpoint: {
      x: position.x + Math.sin(slot.rotationY) * slot.supplementalViewpointDistance,
      z: position.z + Math.cos(slot.rotationY) * slot.supplementalViewpointDistance,
      yaw: slot.rotationY,
      pitch: -.055,
    },
    slotId: slot.id,
    backingWallId: slot.backingWallId,
  };
};

/**
 * These are the 20 curation slots left after the six primary exhibits occupy
 * their authored bays. The slot lookup supplies position, rotation, wall,
 * footprint width, spatial cell, and the locally safe camera distance.
 */
export const ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  authoredSlotLayout({
    id: 'enlightenment-persian-mirror',
    parentExhibitId: 'montesquieu',
    guidedAfterExhibitId: 'montesquieu',
    slotId: 'enlightenment-law-institutions:east-outer',
    assetId: 'enlightenment-persian-envoy-coypel',
    mediaWidth: 2.18,
    mediaHeight: 2.7,
    kind: 'enlightenment-context',
    accent: ENLIGHTENMENT_PALETTE.comparisonGold,
  }),
  authoredSlotLayout({
    id: 'enlightenment-comparison-map',
    parentExhibitId: 'montesquieu',
    guidedAfterExhibitId: 'montesquieu',
    slotId: 'enlightenment-law-institutions:west-room-face',
    assetId: 'enlightenment-delisle-world-map-1720',
    mediaWidth: 3.18,
    mediaHeight: 2.17,
    kind: 'enlightenment-concept',
    accent: ENLIGHTENMENT_PALETTE.lawBlue,
  }),
  authoredSlotLayout({
    id: 'enlightenment-power-checks-power',
    parentExhibitId: 'montesquieu',
    guidedAfterExhibitId: 'montesquieu',
    slotId: 'enlightenment-law-institutions:west-cross-face',
    assetId: 'enlightenment-house-commons-walpole',
    mediaWidth: 2.11,
    mediaHeight: 2.7,
    kind: 'enlightenment-concept',
    accent: ENLIGHTENMENT_PALETTE.civicRed,
  }),
  authoredSlotLayout({
    id: 'enlightenment-law-lived-institution',
    parentExhibitId: 'montesquieu',
    guidedAfterExhibitId: 'montesquieu',
    slotId: 'enlightenment-law-institutions:south-room-face',
    assetId: 'enlightenment-hogarth-bench-1758',
    mediaWidth: 1.82,
    mediaHeight: 2.7,
    kind: 'enlightenment-context',
    accent: ENLIGHTENMENT_PALETTE.ink,
  }),
  authoredSlotLayout({
    id: 'enlightenment-liberty-slavery-contradiction',
    parentExhibitId: 'montesquieu',
    guidedAfterExhibitId: 'montesquieu',
    slotId: 'enlightenment-law-institutions:south-cross-face',
    assetId: 'enlightenment-wedgwood-abolition-medallion',
    mediaWidth: 2.49,
    mediaHeight: 2.7,
    kind: 'enlightenment-context',
    accent: ENLIGHTENMENT_PALETTE.civicRed,
  }),
  authoredSlotLayout({
    id: 'enlightenment-general-will',
    parentExhibitId: 'rousseau',
    guidedAfterExhibitId: 'rousseau',
    slotId: 'enlightenment-society-freedom:south-outer',
    assetId: 'enlightenment-thevenin-federation',
    mediaWidth: 3.18,
    mediaHeight: 2.15,
    kind: 'enlightenment-concept',
    accent: ENLIGHTENMENT_PALETTE.civicRed,
  }),
  authoredSlotLayout({
    id: 'enlightenment-geneva-citizenship',
    parentExhibitId: 'rousseau',
    guidedAfterExhibitId: 'rousseau',
    slotId: 'enlightenment-society-freedom:west-room-face',
    assetId: 'enlightenment-geneva-gardelle-view',
    mediaWidth: 3.18,
    mediaHeight: 1.79,
    kind: 'enlightenment-context',
    accent: ENLIGHTENMENT_PALETTE.lawBlue,
  }),
  authoredSlotLayout({
    id: 'enlightenment-luxury-amour-propre',
    parentExhibitId: 'rousseau',
    guidedAfterExhibitId: 'rousseau',
    slotId: 'enlightenment-society-freedom:west-cross-face',
    assetId: 'enlightenment-fragonard-swing',
    mediaWidth: 2.15,
    mediaHeight: 2.7,
    kind: 'enlightenment-concept',
    accent: ENLIGHTENMENT_PALETTE.comparisonGold,
  }),
  authoredSlotLayout({
    id: 'enlightenment-education-forms-person',
    parentExhibitId: 'rousseau',
    guidedAfterExhibitId: 'rousseau',
    slotId: 'enlightenment-society-freedom:north-room-face',
    assetId: 'enlightenment-chardin-schoolmistress',
    mediaWidth: 2.91,
    mediaHeight: 2.7,
    kind: 'enlightenment-work',
    accent: ENLIGHTENMENT_PALETTE.societyGreen,
  }),
  authoredSlotLayout({
    id: 'enlightenment-rousseau-botany',
    parentExhibitId: 'rousseau',
    guidedAfterExhibitId: 'rousseau',
    slotId: 'enlightenment-society-freedom:north-cross-face',
    assetId: 'enlightenment-rousseau-botanizing',
    mediaWidth: 2.03,
    mediaHeight: 2.7,
    kind: 'enlightenment-context',
    accent: ENLIGHTENMENT_PALETTE.societyGreen,
  }),
  authoredSlotLayout({
    id: 'enlightenment-sympathy-judgment',
    parentExhibitId: 'adam-smith',
    guidedAfterExhibitId: 'adam-smith',
    slotId: 'enlightenment-sentiment-commerce:west-outer',
    assetId: 'enlightenment-greuze-punished-son',
    mediaWidth: 3.18,
    mediaHeight: 2.54,
    kind: 'enlightenment-concept',
    accent: ENLIGHTENMENT_PALETTE.societyGreen,
  }),
  authoredSlotLayout({
    id: 'enlightenment-division-labor',
    parentExhibitId: 'adam-smith',
    guidedAfterExhibitId: 'adam-smith',
    slotId: 'enlightenment-sentiment-commerce:east-room-face',
    assetId: 'enlightenment-encyclopedie-pinmaking',
    mediaWidth: 3.18,
    mediaHeight: 2.17,
    kind: 'enlightenment-work',
    accent: ENLIGHTENMENT_PALETTE.commerceTeal,
  }),
  authoredSlotLayout({
    id: 'enlightenment-commerce-social-world',
    parentExhibitId: 'adam-smith',
    guidedAfterExhibitId: 'adam-smith',
    slotId: 'enlightenment-sentiment-commerce:east-cross-face',
    assetId: 'enlightenment-vernet-bordeaux-harbor',
    mediaWidth: 3.18,
    mediaHeight: 1.98,
    kind: 'enlightenment-context',
    accent: ENLIGHTENMENT_PALETTE.lawBlue,
  }),
  authoredSlotLayout({
    id: 'enlightenment-chartered-monopoly',
    parentExhibitId: 'adam-smith',
    guidedAfterExhibitId: 'adam-smith',
    slotId: 'enlightenment-sentiment-commerce:north-room-face',
    assetId: 'enlightenment-luny-hindostan',
    mediaWidth: 3.18,
    mediaHeight: 1.98,
    kind: 'enlightenment-context',
    accent: ENLIGHTENMENT_PALETTE.civicRed,
  }),
  authoredSlotLayout({
    id: 'enlightenment-industry-public-judgment',
    parentExhibitId: 'adam-smith',
    guidedAfterExhibitId: 'adam-smith',
    slotId: 'enlightenment-sentiment-commerce:north-cross-face',
    assetId: 'enlightenment-sandby-iron-forge',
    mediaWidth: 3.18,
    mediaHeight: 2.5,
    kind: 'enlightenment-concept',
    accent: ENLIGHTENMENT_PALETTE.ink,
  }),
  authoredSlotLayout({
    id: 'enlightenment-marriage-domestic-government',
    parentExhibitId: 'mary-astell',
    guidedAfterExhibitId: 'mary-astell',
    slotId: 'enlightenment-equality-education:east-room-face',
    assetId: 'enlightenment-hogarth-marriage-settlement',
    mediaWidth: 3.18,
    mediaHeight: 2.42,
    kind: 'enlightenment-concept',
    accent: ENLIGHTENMENT_PALETTE.equalityViolet,
  }),
  authoredSlotLayout({
    id: 'enlightenment-women-public-intellectuals',
    parentExhibitId: 'mary-astell',
    guidedAfterExhibitId: 'mary-astell',
    slotId: 'enlightenment-equality-education:east-cross-face',
    assetId: 'enlightenment-samuel-nine-muses',
    mediaWidth: 3.18,
    mediaHeight: 2.67,
    kind: 'enlightenment-context',
    accent: ENLIGHTENMENT_PALETTE.comparisonGold,
  }),
  authoredSlotLayout({
    id: 'enlightenment-access-to-knowledge',
    parentExhibitId: 'wollstonecraft',
    guidedAfterExhibitId: 'wollstonecraft',
    slotId: 'enlightenment-equality-education:south-room-face',
    assetId: 'enlightenment-duchesse-du-maine-astronomy-lesson',
    mediaWidth: 3.18,
    mediaHeight: 2.22,
    kind: 'enlightenment-context',
    accent: ENLIGHTENMENT_PALETTE.lawBlue,
  }),
  authoredSlotLayout({
    id: 'enlightenment-revolution-from-street',
    parentExhibitId: 'wollstonecraft',
    guidedAfterExhibitId: 'wollstonecraft',
    slotId: 'enlightenment-equality-education:south-cross-face',
    assetId: 'enlightenment-womens-march-versailles',
    mediaWidth: 3.18,
    mediaHeight: 2.22,
    kind: 'enlightenment-context',
    accent: ENLIGHTENMENT_PALETTE.civicRed,
  }),
  authoredSlotLayout({
    id: 'enlightenment-kant-sublime',
    parentExhibitId: 'kant',
    guidedAfterExhibitId: 'kant',
    slotId: 'enlightenment-kant-critical:north-outer',
    assetId: 'enlightenment-kant-sublime-monk-sea',
    mediaWidth: 3.18,
    mediaHeight: 2.16,
    kind: 'enlightenment-concept',
    accent: ENLIGHTENMENT_PALETTE.ink,
  }),
] as const satisfies readonly EnlightenmentSupplementalExhibitLayout[];

export const ENLIGHTENMENT_SUPPLEMENTAL_SLOT_IDS = ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(
  ({slotId}) => slotId,
);

export const getEnlightenmentSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const recordValue = ENLIGHTENMENT_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!recordValue) throw new Error(`Gallery 15 supplemental exhibit ${id} is missing.`);
  return recordValue;
};

export const getEnlightenmentSupplementalLayout = (
  id: MuseumSupplementalExhibitId,
): EnlightenmentSupplementalExhibitLayout => {
  const layout = ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS.find((item) => item.id === id);
  if (!layout) throw new Error(`Gallery 15 supplemental layout ${id} is missing.`);
  return layout;
};

export type EnlightenmentSupplementalRoomId = EnlightenmentRoomId;
