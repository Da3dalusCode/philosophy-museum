import type {MuseumZoneId} from '../museumCatalog';
import type {MuseumAssetId} from './museumAssetTypes';
import {reviewJusticeDemocraticReasonSupplementalExhibit} from './gallery24To26SupplementalReview';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {
  MuseumMediaMountDefinition,
  MuseumPoint,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export const JUSTICE_GALLERY_ID = 'justice-democratic-reason' as const;

export const JUSTICE_PALETTE = Object.freeze({
  ink: '#23272d',
  indigo: '#485776',
  copper: '#a06d49',
  civicRed: '#985047',
  paper: '#e9dfcf',
});

export const JUSTICE_ROOM_SIGN_COPY = {
  'justice-political-orientation': {
    kicker: 'Room 01 · Authorize and contest',
    title: 'Authority, public action, and political judgment',
    subtitle: 'Ask when power becomes legitimate—and when citizens must resist, revise, or begin again.',
  },
  'justice-distribution-rights': {
    kicker: 'Room 02 · Distribute and constrain',
    title: 'Justice, rights, holdings, and the state',
    subtitle: 'Competing principles test fair institutions, individual rights, history, and repair.',
  },
  'justice-capabilities-democracy': {
    kicker: 'Room 03 · Enable and deliberate',
    title: 'Capabilities, dignity, and democratic reason',
    subtitle: 'Move from formal rights toward real opportunity, inclusion, voice, and public justification.',
  },
} as const;

const volume = (
  id: string,
  center: MuseumSceneVolume['center'],
  size: MuseumSceneVolume['size'],
): MuseumSceneVolume => ({id, role: 'media', center, size});

const mediaMount = (
  id: MuseumSupplementalExhibitId,
  assetId: MuseumAssetId,
  width: number,
  height: number,
): MuseumMediaMountDefinition => {
  const y = 2.14;
  return {
    id: `${id}-hero-media`,
    assetId,
    kind: 'wall-frame',
    position: [0, y, -.39],
    rotation: [0, 0, 0],
    width,
    height,
    frameDepth: .1,
    supportHeight: 0,
    anchorId: `${id}-backing`,
    bounds: volume(`${id}-media-bounds`, {x: 0, y, z: -.39}, {width: width + .18, height: height + .18, depth: .2}),
    supportBounds: volume(`${id}-media-support`, {x: 0, y, z: -.55}, {width: width * .74, height: height * .74, depth: .18}),
  };
};

const cameraFor = (position: MuseumPoint, rotationY: number, distance = 2.92): MuseumPoint => ({
  x: position.x + Math.sin(rotationY) * distance,
  z: position.z + Math.cos(rotationY) * distance,
});

const layout = ({
  id,
  parentExhibitId,
  zoneId,
  position,
  rotationY,
  assetId,
  mediaWidth,
  mediaHeight,
  installationKind,
  accent,
}: {
  id: MuseumSupplementalExhibitId;
  parentExhibitId: 'political-philosophy' | 'arendt' | 'rawls' | 'nozick' | 'martha-nussbaum';
  zoneId: MuseumZoneId;
  position: MuseumPoint;
  rotationY: number;
  assetId: MuseumAssetId;
  mediaWidth: number;
  mediaHeight: number;
  installationKind: MuseumSupplementalInstallationKind;
  accent: string;
}): MuseumSupplementalExhibitLayout => {
  const width = 4.35;
  return {
    id,
    parentExhibitId,
    zoneId,
    spatialCellId: zoneId,
    position,
    rotationY,
    interactionRadius: 3.65,
    collider: {
      id: `supplemental:${id}`,
      center: position,
      size: {width, depth: 1.05},
      rotation: rotationY,
    },
    viewpoint: {...cameraFor(position, rotationY), yaw: rotationY, pitch: -.055},
    assetId,
    mediaMount: mediaMount(id, assetId, mediaWidth, mediaHeight),
    label: {position: [0, 4.04, -.3], width: width - .36, height: .72},
    footprint: {width, height: 4.44, depth: 1.05},
    installationKind,
    accent,
  };
};

const presentation = (
  panelKicker: string,
  proximityKicker: string,
  factRows: readonly {label: string; value: string}[],
  articleActionLabel: string,
  entityKind: 'philosopher' | 'branch' = 'philosopher',
) => ({
  panelKicker,
  proximityKicker,
  factRows,
  articleActionLabel,
  entityKind,
  keyIdeasLabel: 'Argument map',
  cautionsLabel: 'Keep in view',
});

type JusticeExhibitInput = Omit<MuseumSupplementalExhibit, 'presentation'> & {
  presentation: ReturnType<typeof presentation>;
};

const justiceExhibit = <T extends JusticeExhibitInput>(record: T): T => record;

export const JUSTICE_SUPPLEMENTAL_EXHIBITS = ([
  justiceExhibit({
    id: 'political-authority-legitimacy',
    displayName: 'Political Philosophy: Authority and Legitimacy',
    shortTitle: 'Political Philosophy: Legitimate Authority',
    workLabel: 'POLITICAL PHILOSOPHY · AUTHORITY AND LEGITIMACY',
    dateLabel: 'A recurring question from antiquity to the present',
    question: 'What turns the exercise of political power into a right to rule?',
    frontSubtitle: 'Power, justification, consent, obligation, and the standing to govern',
    lead: 'Political authority is not merely the capacity to command. Philosophers ask whether a state has a justified right to issue and enforce rules, whether citizens acquire duties to comply, and what happens when those claims separate. Consent, public reason, fair institutions, democratic participation, and the protection of basic rights offer competing or complementary answers. The interpretive image organizes these relations rather than depicting one historical regime. It should be read as a question map: lawful power may still be illegitimate, legitimate institutions may make mistaken decisions, and a justified state may not generate an unlimited obligation to obey every command.',
    keyIdeas: [
      'De facto power describes control, while legitimacy concerns a justified right to rule.',
      'Political obligation asks whether and why citizens owe compliance to institutions or laws.',
      'Consent, fairness, democracy, rights, and public justification support different accounts of legitimacy.',
    ],
    cautions: [
      'Legal validity and political legitimacy overlap in practice but are not identical concepts.',
      'A theory can defend legitimate authority without granting the state unrestricted moral permission.',
    ],
    sections: [
      {heading: 'Power and a claim of right', paragraphs: ['A government can successfully enforce rules through force, habit, or coordination. Legitimacy adds a normative claim: those rules are issued by institutions entitled to govern under conditions people can reasonably be asked to accept.']},
      {heading: 'Why citizens might owe obedience', paragraphs: ['Some accounts appeal to actual or hypothetical consent; others to fair cooperation, associative membership, natural duties of justice, or democratic authorship. Each explanation faces hard cases involving dissenters, outsiders, and structurally excluded groups.']},
      {heading: 'The limits remain political', paragraphs: ['Even justified institutions can violate rights, lose public trust, or impose decisions without adequate reasons. Political philosophy therefore examines authority alongside resistance, accountability, contestation, and the conditions for institutional repair.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Political Legitimacy', url: 'https://plato.stanford.edu/entries/legitimacy/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Authority', url: 'https://plato.stanford.edu/entries/authority/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Political Obligation', url: 'https://iep.utm.edu/poli-obl/', kind: 'academic-reference'},
    ],
    assetId: 'political-authority-interpretive',
    panelAssetId: 'political-authority-interpretive',
    articleRoute: {kind: 'branch', branchId: 'political-philosophy'},
    presentation: presentation('Gallery 05 concept exhibit', 'Authority and legitimacy', [
      {label: 'Field', value: 'Political philosophy'},
      {label: 'Problem', value: 'The justified right to rule'},
      {label: 'Visual', value: 'Interpretive map of authority claims'},
      {label: 'Atlas route', value: 'Political Philosophy'},
    ], 'Open Political Philosophy in the Atlas', 'branch'),
  }),
  justiceExhibit({
    id: 'public-action-civil-disobedience',
    displayName: 'Political Philosophy: Public Action and Civil Disobedience',
    shortTitle: 'Political Philosophy: Civil Disobedience',
    workLabel: 'POLITICAL PHILOSOPHY · PUBLIC ACTION AND DISSENT',
    dateLabel: 'March on Washington, 28 August 1963',
    question: 'When may citizens openly break a law in order to challenge injustice?',
    frontSubtitle: 'Public protest, conscience, nonviolence, persuasion, and democratic change',
    lead: 'Civil disobedience is commonly understood as a conscientious, communicative breach of law undertaken to oppose injustice and address a wider public. Its point is not simply private refusal: the act contests an institution’s reasons, exposes exclusions, and seeks political change. The photograph of leaders at the 1963 March on Washington records one major episode in the U.S. civil-rights movement, but the march itself was permitted and cannot stand as a literal picture of every form of civil disobedience. It supplies a concrete public context for traditions that also include boycotts, sit-ins, freedom rides, legal challenges, organizing, and arguments over militancy, nonviolence, and democratic responsibility.',
    keyIdeas: [
      'Civil disobedience communicates a political claim through a deliberate breach of law.',
      'Publicity and willingness to accept legal consequences matter in some theories but not all.',
      'Organized protest can challenge which voices, injuries, and reasons institutions recognize.',
    ],
    cautions: [
      'The March on Washington combined many forms of organizing and was not itself an illegal action.',
      'No single model of respectful, nonviolent dissent exhausts resistance under severe oppression.',
    ],
    sections: [
      {heading: 'An appeal through action', paragraphs: ['Breaking a rule can dramatize the distance between a political order’s stated principles and its practices. The act becomes an argument addressed to fellow citizens, officials, courts, and people excluded from ordinary channels.']},
      {heading: 'Democratic fidelity or disruption', paragraphs: ['Rawls treats civil disobedience as a public, nonviolent appeal within a nearly just society. Other thinkers argue that this framework is too narrow for colonial rule, racial domination, or institutions that repeatedly ignore polite demands.']},
      {heading: 'Movements exceed a single image', paragraphs: ['Public change depends on networks, strategy, risk, labor, legal work, and sustained local participation. The leaders pictured here matter, but the museum image must not erase thousands of organizers or reduce a movement to one stage.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Civil Disobedience', url: 'https://plato.stanford.edu/entries/civil-disobedience/', kind: 'academic-reference'},
      {label: 'Martin Luther King, Jr., “Letter from Birmingham Jail” (King Institute)', url: 'https://kinginstitute.stanford.edu/king-papers/documents/letter-birmingham-jail', kind: 'primary-text'},
      {label: 'Library of Congress — Civil Rights History Project', url: 'https://www.loc.gov/collections/civil-rights-history-project/', kind: 'collection-record'},
    ],
    assetId: 'march-washington-leaders-1963',
    panelAssetId: 'march-washington-leaders-1963',
    articleRoute: {kind: 'branch', branchId: 'political-philosophy'},
    presentation: presentation('Gallery 05 public-life exhibit', 'Public action and dissent', [
      {label: 'Question', value: 'When law-breaking can contest injustice'},
      {label: 'Event', value: 'March on Washington, 1963'},
      {label: 'Visual', value: 'Documentary photograph; contextual'},
      {label: 'Atlas route', value: 'Political Philosophy'},
    ], 'Open Political Philosophy in the Atlas', 'branch'),
  }),
  justiceExhibit({
    id: 'arendt-human-condition',
    displayName: 'Arendt: The Human Condition',
    shortTitle: 'Arendt: The Human Condition',
    workLabel: 'ARENDT · THE HUMAN CONDITION',
    dateLabel: 'Published 1958',
    question: 'What becomes possible when people act and speak together in a shared world?',
    frontSubtitle: 'Labor, work, action, plurality, natality, and the public realm',
    lead: 'In The Human Condition, Hannah Arendt distinguishes labor, work, and action as different dimensions of active life. Labor answers recurring biological need; work builds a comparatively durable human world; action discloses who people are through speech and initiative among equals. Political freedom appears most fully in action, where outcomes remain unpredictable because others can respond and begin anew. The interpretive image is a contemporary visual translation of these relations, not an illustration commissioned or approved by Arendt. Its open civic space should not imply that every actual public realm is equally accessible, protected, or free of material dependence.',
    keyIdeas: [
      'Action depends on plurality: distinct people share a world without becoming interchangeable.',
      'Natality names the human capacity to begin, initiate, and introduce something unforeseen.',
      'A durable public world gives words and deeds a space of appearance and remembrance.',
    ],
    cautions: [
      'Labor, work, and action are analytic distinctions, not a simple hierarchy of worthy and unworthy people.',
      'Critics challenge Arendt’s separation of social need from politics and her treatment of household labor.',
    ],
    sections: [
      {heading: 'Three activities, three conditions', paragraphs: ['Labor follows life’s recurring cycles, work fabricates objects and institutions, and action unfolds directly among persons. Arendt uses the distinctions to diagnose what modern societies make visible or push out of public concern.']},
      {heading: 'Freedom as beginning', paragraphs: ['Freedom is not only private choice or sovereignty over oneself. It appears when someone initiates words or deeds whose meaning is taken up, contested, and continued by others in a plural setting.']},
      {heading: 'A shared world under pressure', paragraphs: ['Mass society, bureaucracy, loneliness, and instrumental reasoning can weaken the spaces where citizens appear to one another. Preserving politics therefore requires institutions and practices that sustain plurality without pretending difference disappears.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Hannah Arendt', url: 'https://plato.stanford.edu/entries/arendt/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Hannah Arendt', url: 'https://iep.utm.edu/hannah-arendt/', kind: 'academic-reference'},
      {label: 'Library of Congress — Hannah Arendt Papers', url: 'https://www.loc.gov/collections/hannah-arendt-papers/about-this-collection/', kind: 'collection-record'},
    ],
    assetId: 'arendt-human-condition-interpretive',
    panelAssetId: 'arendt-human-condition-interpretive',
    articleRoute: {kind: 'philosopher', philosopherId: 'arendt'},
    presentation: presentation('Gallery 05 work exhibit', 'Action in a shared world', [
      {label: 'Philosopher', value: 'Hannah Arendt'},
      {label: 'Work', value: 'The Human Condition'},
      {label: 'Visual', value: 'Interpretive image of plurality and action'},
      {label: 'Atlas route', value: 'Arendt’s full profile'},
    ], 'Open Arendt’s full Atlas article'),
  }),
  justiceExhibit({
    id: 'arendt-eichmann-judgment',
    displayName: 'Arendt: Eichmann, Judgment, and Responsibility',
    shortTitle: 'Arendt: Eichmann and Judgment',
    workLabel: 'ARENDT · EICHMANN IN JERUSALEM',
    dateLabel: 'Trial 1961; book published 1963',
    question: 'How can grave wrongdoing be carried out through ordinary habits of thoughtlessness?',
    frontSubtitle: 'Judgment, responsibility, bureaucracy, controversy, and the banality of evil',
    lead: 'Arendt attended Adolf Eichmann’s 1961 trial in Jerusalem and later used “the banality of evil” for her interpretation of his clichés, careerism, and failures of judgment. The phrase neither made Nazi crimes trivial nor diminished Eichmann’s agency or guilt; later evidence of his ideological commitment and initiative means “thoughtlessness” cannot be a complete empirical portrait. Her report provoked intense disputes about Eichmann’s motives, Jewish councils, the trial, and the adequacy of her evidence and tone. The courtroom photograph is documentary evidence of the proceeding, not a portrait of Arendt’s conclusions and not an invitation to center the perpetrator over victims. It should direct attention toward responsibility within institutions while preserving the historical specificity of the Holocaust.',
    keyIdeas: [
      'Thoughtlessness can coexist with calculated conduct and participation in enormous crimes.',
      'Following orders or administrative routines does not erase personal responsibility and judgment.',
      'Arendt’s account links political evil to institutions without reducing guilt to an impersonal system.',
    ],
    cautions: [
      '“Banality” describes a mode of participation and judgment; it does not minimize the crime or victims’ suffering.',
      'Later historical research has challenged parts of Arendt’s characterization of Eichmann and his ideological commitment.',
    ],
    sections: [
      {heading: 'A courtroom and a report', paragraphs: ['The trial assembled testimony, documents, legal arguments, and public memory. Arendt approached it as a reporter and political thinker, producing a book whose interpretations cannot substitute for the larger evidentiary record.']},
      {heading: 'Thinking without guarantees', paragraphs: ['Arendt asks whether the practice of examining one’s own claims from other standpoints can interrupt obedience and cliché. Judgment is not a mechanical rule, yet its absence does not excuse an agent.']},
      {heading: 'Controversy belongs in the exhibit', paragraphs: ['The book’s reception includes criticism from survivors, historians, philosophers, and Arendt’s contemporaries. Responsible interpretation keeps those disagreements visible and resists turning one provocative phrase into a complete theory of evil.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Hannah Arendt', url: 'https://plato.stanford.edu/entries/arendt/', kind: 'academic-reference'},
      {label: 'United States Holocaust Memorial Museum — Adolf Eichmann', url: 'https://encyclopedia.ushmm.org/content/en/article/adolf-eichmann', kind: 'academic-reference'},
      {label: 'Israel State Archives — The Eichmann Trial', url: 'https://catalog.archives.gov.il/en/chapter/the-eichmann-trial/', kind: 'collection-record'},
    ],
    assetId: 'eichmann-trial-1961',
    panelAssetId: 'eichmann-trial-1961',
    articleRoute: {kind: 'philosopher', philosopherId: 'arendt'},
    presentation: presentation('Gallery 05 controversy exhibit', 'Judgment and responsibility', [
      {label: 'Philosopher', value: 'Hannah Arendt'},
      {label: 'Work', value: 'Eichmann in Jerusalem'},
      {label: 'Visual', value: '1961 trial photograph; documentary'},
      {label: 'Atlas route', value: 'Arendt’s full profile'},
    ], 'Open Arendt’s full Atlas article'),
  }),
  justiceExhibit({
    id: 'rawls-theory-of-justice',
    displayName: 'Rawls: A Theory of Justice',
    shortTitle: 'Rawls: A Theory of Justice',
    workLabel: 'RAWLS · A THEORY OF JUSTICE',
    dateLabel: 'First edition published 1971',
    question: 'Which principles should govern the basic institutions of a fair society?',
    frontSubtitle: 'Equal liberties, fair opportunity, distribution, and the basic structure',
    lead: 'John Rawls’s A Theory of Justice presents justice as fairness: principles for the basic structure of society chosen under conditions designed to represent citizens as free and equal. Rawls gives priority to an adequate scheme of equal basic liberties, requires fair equality of opportunity, and permits social and economic inequalities only when they benefit the least advantaged under the difference principle. The displayed first-edition cover is a publication object rather than a diagram of the theory. Rawls revised formulations across editions and later distinguished a political conception for a pluralist democracy from a comprehensive moral doctrine.',
    keyIdeas: [
      'Justice primarily evaluates major institutions and how they distribute rights, duties, opportunities, and prospects.',
      'Basic liberties have priority and cannot simply be traded away for aggregate welfare or economic growth.',
      'The difference principle tests inequalities by their effects on the expectations of the least advantaged.',
    ],
    cautions: [
      'Rawls does not require identical income or wealth, and the difference principle is not a rule for every isolated transaction.',
      'A Theory of Justice is neither Rawls’s final formulation nor an uncontested map of democratic justice.',
    ],
    sections: [
      {heading: 'The subject of justice', paragraphs: ['Rawls focuses on the basic structure: constitutional rules, legal institutions, markets, property systems, and the social arrangements that shape life prospects over time. Background fairness matters before individual choices are assessed.']},
      {heading: 'Priority and distribution', paragraphs: ['Equal liberties constrain permissible bargains. Fair opportunity asks whether positions are genuinely open, while the difference principle compares institutional schemes from the standpoint of those who fare worst within them.']},
      {heading: 'A long argumentative project', paragraphs: ['The book revived systematic Anglophone political philosophy and generated libertarian, communitarian, feminist, critical-race, disability, and global-justice objections. Those responses reveal both the framework’s reach and its exclusions.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — John Rawls', url: 'https://plato.stanford.edu/entries/rawls/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — John Rawls', url: 'https://iep.utm.edu/rawls/', kind: 'academic-reference'},
      {label: 'Harvard University Archives — John Rawls Papers', url: 'https://hollisarchives.lib.harvard.edu/repositories/4/resources/4330', kind: 'collection-record'},
    ],
    assetId: 'rawls-theory-justice-1971',
    panelAssetId: 'rawls-theory-justice-1971',
    articleRoute: {kind: 'philosopher', philosopherId: 'rawls'},
    presentation: presentation('Gallery 05 work exhibit', 'Justice as fairness', [
      {label: 'Philosopher', value: 'John Rawls'},
      {label: 'Work', value: 'A Theory of Justice'},
      {label: 'Visual', value: '1971 first-edition cover'},
      {label: 'Atlas route', value: 'Rawls’s full profile'},
    ], 'Open Rawls’s full Atlas article'),
  }),
  justiceExhibit({
    id: 'rawls-original-position',
    displayName: 'Rawls: The Original Position',
    shortTitle: 'Rawls: Original Position',
    workLabel: 'RAWLS · ORIGINAL POSITION AND VEIL OF IGNORANCE',
    dateLabel: 'Developed most fully in A Theory of Justice, 1971',
    question: 'What principles would people choose if no one could tailor the rules to personal advantage?',
    frontSubtitle: 'Fair choice, the veil of ignorance, primary goods, and public principles',
    lead: 'Rawls’s original position is a thought experiment that models fair agreement. The parties know general facts about society and human psychology but stand behind a veil of ignorance: they do not know their class, race, gender, talents, religion, generation, or particular conception of the good. Because no one can design institutions for a known social position, the choice situation is meant to represent citizens symmetrically. The interpretive image visualizes hidden positions and shared rules, but it should not suggest an actual meeting, a lottery, or people stripped of identity in ordinary political life. The device tests principles; it does not replace democratic judgment.',
    keyIdeas: [
      'The veil of ignorance blocks information that would enable bargaining from arbitrary social advantage.',
      'Parties choose principles for institutions, not detailed policies for one known historical society.',
      'The construction models fairness through restrictions on reasons rather than predicting real voter behavior.',
    ],
    cautions: [
      'The original position is hypothetical and representational; Rawls does not claim an actual contract occurred.',
      'Critics question whether its parties, goods, and exclusions adequately represent dependency, identity, disability, and history.',
    ],
    sections: [
      {heading: 'Why hide particular facts?', paragraphs: ['Knowledge of general economics and psychology helps parties compare workable systems. Ignorance of personal position prevents them from loading the principles in favor of the powerful, fortunate, or currently dominant.']},
      {heading: 'A device of representation', paragraphs: ['Rawls asks what free and equal citizens would regard as fair terms of cooperation when represented under suitable constraints. The answer depends on how those constraints are justified, not on theatrical imagination alone.']},
      {heading: 'From choice to public reason', paragraphs: ['Chosen principles still require constitutional interpretation, legislation, and public argument. Later Rawls places greater emphasis on political liberalism and how citizens with different worldviews can justify shared coercive institutions.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Original Position', url: 'https://plato.stanford.edu/entries/original-position/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — John Rawls', url: 'https://plato.stanford.edu/entries/rawls/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — John Rawls', url: 'https://iep.utm.edu/rawls/', kind: 'academic-reference'},
    ],
    assetId: 'rawls-original-position-interpretive',
    panelAssetId: 'rawls-original-position-interpretive',
    articleRoute: {kind: 'philosopher', philosopherId: 'rawls'},
    presentation: presentation('Gallery 05 concept exhibit', 'Choosing without advantage', [
      {label: 'Philosopher', value: 'John Rawls'},
      {label: 'Device', value: 'Original position and veil of ignorance'},
      {label: 'Visual', value: 'Interpretive diagram of fair choice'},
      {label: 'Atlas route', value: 'Rawls’s full profile'},
    ], 'Open Rawls’s full Atlas article'),
  }),
  justiceExhibit({
    id: 'nozick-anarchy-state-utopia',
    displayName: 'Nozick: Anarchy, State, and Utopia',
    shortTitle: 'Nozick: Anarchy, State, and Utopia',
    workLabel: 'NOZICK · ANARCHY, STATE, AND UTOPIA',
    dateLabel: 'Published 1974',
    question: 'How much may a state do without violating the rights of individuals?',
    frontSubtitle: 'Rights, side constraints, the minimal state, entitlement, and voluntary association',
    lead: 'Robert Nozick’s Anarchy, State, and Utopia argues that individuals possess rights that act as side constraints on what others and the state may do, even for desirable social outcomes. He imagines how a minimal state limited to protection, contract enforcement, and adjudication might arise without violating rights. The book directly challenges Rawlsian patterned distribution and ends with a pluralistic “framework for utopia” in which voluntary communities pursue different ideals. The displayed cover identifies the 1974 publication, but it should not turn Nozick’s later, wider philosophy into a single libertarian slogan or imply that the book settled the historical justice of actual holdings.',
    keyIdeas: [
      'Rights constrain permissible means rather than entering only as values to maximize.',
      'A minimal state may protect against force, theft, and fraud while avoiding broader paternalistic or redistributive aims.',
      'Voluntary communities can embody diverse ideals within a common framework of rights.',
    ],
    cautions: [
      'Nozick’s argument is not simply that taxation and theft are identical in every respect.',
      'The theory’s application depends on difficult questions about original acquisition, coercion, inheritance, and rectification.',
    ],
    sections: [
      {heading: 'From anarchy to a state', paragraphs: ['Nozick starts with people possessing rights outside a state and asks whether protective associations could develop into a dominant agency and minimal state through morally permissible steps. The derivation is part of the defense.']},
      {heading: 'Side constraints', paragraphs: ['Individuals may not be used merely as instruments for aggregate welfare. This separateness-of-persons claim limits what institutions may impose even when officials believe a policy would produce better overall consequences.']},
      {heading: 'Utopia without one blueprint', paragraphs: ['The final framework allows people to form and leave communities organized around different visions of life. Critics ask whether unequal power, dependency, and barriers to exit make voluntary association less straightforward than the model assumes.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Robert Nozick’s Political Philosophy', url: 'https://plato.stanford.edu/entries/nozick-political/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Robert Nozick', url: 'https://iep.utm.edu/nozick/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Libertarianism', url: 'https://plato.stanford.edu/entries/libertarianism/', kind: 'academic-reference'},
    ],
    assetId: 'nozick-anarchy-state-utopia-1974',
    panelAssetId: 'nozick-anarchy-state-utopia-1974',
    articleRoute: {kind: 'philosopher', philosopherId: 'nozick'},
    presentation: presentation('Gallery 05 work exhibit', 'Rights and the minimal state', [
      {label: 'Philosopher', value: 'Robert Nozick'},
      {label: 'Work', value: 'Anarchy, State, and Utopia'},
      {label: 'Visual', value: '1974 first-edition cover'},
      {label: 'Atlas route', value: 'Nozick’s full profile'},
    ], 'Open Nozick’s full Atlas article'),
  }),
  justiceExhibit({
    id: 'nozick-entitlement-rectification',
    displayName: 'Nozick: Entitlement and Rectification',
    shortTitle: 'Nozick: Entitlement and Rectification',
    workLabel: 'NOZICK · ACQUISITION, TRANSFER, AND RECTIFICATION',
    dateLabel: 'Entitlement theory formulated in 1974',
    question: 'Is a distribution just because of its pattern, or because of the history that produced it?',
    frontSubtitle: 'Historical justice, holdings, voluntary transfer, past wrongs, and repair',
    lead: 'Nozick’s entitlement theory judges holdings through their history rather than by whether the resulting distribution matches a preferred pattern. A person is entitled to a holding if it arose through just acquisition, just transfer, or rectification of earlier injustice. Repeated voluntary exchanges can disrupt any fixed pattern, so maintaining one may require continuous interference. The interpretive image traces paths of acquisition, transfer, and damaged chains of title. It is not evidence that existing property distributions are just. Nozick explicitly acknowledges the need for rectification, while leaving the principle underdeveloped—a major difficulty wherever conquest, enslavement, colonialism, exclusion, or fraud shape present holdings.',
    keyIdeas: [
      'Historical principles assess how holdings arose, not only the shape of the current distribution.',
      'Justice in transfer depends on voluntary exchange from holdings that were themselves legitimately held.',
      'Rectification must address the effects of past violations rather than treating the status quo as a clean starting point.',
    ],
    cautions: [
      'A market outcome is not automatically entitled if its starting points or transfers were unjust.',
      'Nozick does not provide a complete rectification formula, and that omission limits easy application of the theory.',
    ],
    sections: [
      {heading: 'History instead of a snapshot', paragraphs: ['Two identical distributions can differ morally if one arose through consent and another through theft. Entitlement theory therefore asks for a sequence of transactions and acquisitions rather than evaluating only final shares.']},
      {heading: 'The challenge to patterns', paragraphs: ['A favored distribution can change when people give, trade, create, or spend. Nozick argues that repeatedly restoring the pattern would intrude on choices, though critics dispute whether background institutions are ever neutral.']},
      {heading: 'Rectification is central', paragraphs: ['Historical injustice is not an optional appendix. Without defensible accounts of acquisition and repair, present entitlement cannot simply be presumed, especially when records, land, labor, and political power reflect durable coercion.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Robert Nozick’s Political Philosophy', url: 'https://plato.stanford.edu/entries/nozick-political/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Distributive Justice', url: 'https://plato.stanford.edu/entries/justice-distributive/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Robert Nozick', url: 'https://iep.utm.edu/nozick/', kind: 'academic-reference'},
    ],
    assetId: 'nozick-entitlement-interpretive',
    panelAssetId: 'nozick-entitlement-interpretive',
    articleRoute: {kind: 'philosopher', philosopherId: 'nozick'},
    presentation: presentation('Gallery 05 concept exhibit', 'History and holdings', [
      {label: 'Philosopher', value: 'Robert Nozick'},
      {label: 'Theory', value: 'Entitlement and rectification'},
      {label: 'Visual', value: 'Interpretive history of holdings'},
      {label: 'Atlas route', value: 'Nozick’s full profile'},
    ], 'Open Nozick’s full Atlas article'),
  }),
  justiceExhibit({
    id: 'nussbaum-capabilities-approach',
    displayName: 'Nussbaum: The Capabilities Approach',
    shortTitle: 'Nussbaum: Capabilities',
    workLabel: 'NUSSBAUM · CENTRAL HUMAN CAPABILITIES',
    dateLabel: 'Developed across work from the 1980s to the present',
    question: 'What must people genuinely be able to do and to be in order to live with dignity?',
    frontSubtitle: 'Substantive freedom, dignity, thresholds, plural capabilities, and political duties',
    lead: 'Martha Nussbaum’s capabilities approach evaluates justice by asking what each person is actually able to do and be, not only what resources they hold or how satisfied they report feeling. Her proposed list includes life, bodily health and integrity, senses and thought, emotion, practical reason, affiliation, relations with other species, play, and control over one’s environment. Political principles should secure a threshold of each capability for every person. The interpretive image presents the list as a plural field, not a ladder or a score. Capabilities are genuine opportunities: respecting choice means distinguishing an available capability from a functioning someone is forced to perform.',
    keyIdeas: [
      'Capabilities are substantive opportunities, while functionings are the beings and doings people actually realize.',
      'Human dignity requires attention to several irreducible dimensions rather than one aggregate welfare measure.',
      'A threshold aims to secure each person’s minimum entitlement without ranking lives by productivity.',
    ],
    cautions: [
      'The approach does not require government to force every person to exercise every capability.',
      'Nussbaum’s specific list and its universal scope are debated within the broader capability tradition.',
    ],
    sections: [
      {heading: 'Resources are not enough', paragraphs: ['People convert income, rights, and public goods into opportunities differently because of disability, care responsibilities, discrimination, location, and social norms. Equal means can therefore coexist with unequal real freedom.']},
      {heading: 'Plural and person-centered', paragraphs: ['Capabilities cannot be reduced to a single total whose gains for some cancel severe deprivation for others. The unit of concern is each person, including those whose dependence exposes the limits of idealized independence.']},
      {heading: 'From evaluation to institutions', paragraphs: ['The framework guides constitutional rights, development measures, education, health, gender justice, and disability policy. Concrete thresholds still require democratic specification, evidence, and attention to local voices rather than philosophical fiat.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — The Capability Approach', url: 'https://plato.stanford.edu/entries/capability-approach/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Martha Nussbaum', url: 'https://iep.utm.edu/martha-nussbaum/', kind: 'academic-reference'},
      {label: 'UN Development Programme — Human Development Reports', url: 'https://hdr.undp.org/', kind: 'collection-record'},
    ],
    assetId: 'nussbaum-capabilities-interpretive',
    panelAssetId: 'nussbaum-capabilities-interpretive',
    articleRoute: {kind: 'philosopher', philosopherId: 'martha-nussbaum'},
    presentation: presentation('Gallery 05 concept exhibit', 'What people can do and be', [
      {label: 'Philosopher', value: 'Martha Nussbaum'},
      {label: 'Framework', value: 'Central human capabilities'},
      {label: 'Visual', value: 'Interpretive capability field'},
      {label: 'Atlas route', value: 'Nussbaum’s full profile'},
    ], 'Open Nussbaum’s full Atlas article'),
  }),
  justiceExhibit({
    id: 'nussbaum-frontiers-justice',
    displayName: 'Nussbaum: Frontiers of Justice',
    shortTitle: 'Nussbaum: Frontiers of Justice',
    workLabel: 'NUSSBAUM · FRONTIERS OF JUSTICE',
    dateLabel: 'Published 2006; ADA photograph from 1990',
    question: 'How should a theory of justice include people whose lives do not fit an ideal of independent cooperation?',
    frontSubtitle: 'Disability, dependency, care, nationality, species, and equal dignity',
    lead: 'In Frontiers of Justice, Nussbaum argues that familiar social-contract models struggle with three cases: people with disabilities, justice across national borders, and duties toward nonhuman animals. A theory built around roughly equal, independent contractors can misdescribe lifelong dependency and obscure care as a public responsibility. The photograph of the 1990 Americans with Disabilities Act signing records an important U.S. legal milestone; it is not an image of Nussbaum, a full history of disability activism, or proof that formal rights secure real capabilities. It provides institutional context for a philosophical demand to design education, care, access, work, and political membership around equal dignity.',
    keyIdeas: [
      'Dependency and care are normal features of human life rather than marginal exceptions to citizenship.',
      'Justice should secure capabilities directly instead of treating productive reciprocity as the basis of equal worth.',
      'Institutional inclusion requires material access, social recognition, support, and political voice together.',
    ],
    cautions: [
      'The ADA is a U.S. legal achievement and cannot represent disability justice globally or mark the work as complete.',
      'Disability scholars debate Nussbaum’s list, guardianship implications, species norms, and who should define flourishing.',
    ],
    sections: [
      {heading: 'Beyond the contracting citizen', paragraphs: ['Contract traditions often imagine parties able to cooperate over a full life on roughly equal terms. Nussbaum asks how principles change when cognitive, sensory, physical, and care needs are present from the beginning.']},
      {heading: 'Capabilities and support', paragraphs: ['Equal dignity may require varied educational arrangements, accessible environments, supported decision-making, income, health care, and recognition of caregivers. Difference in support does not imply difference in basic worth.']},
      {heading: 'Law as one part of justice', paragraphs: ['Civil-rights legislation can prohibit exclusion and establish standards, but lived freedom also depends on enforcement, design, public investment, attitudes, and disabled people’s authority in decisions that shape their lives.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Disability: Definitions, Models, Experience', url: 'https://plato.stanford.edu/entries/disability/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Martha Nussbaum', url: 'https://iep.utm.edu/martha-nussbaum/', kind: 'academic-reference'},
      {label: 'U.S. National Archives — Americans with Disabilities Act', url: 'https://www.archives.gov/research/americans-with-disabilities', kind: 'collection-record'},
    ],
    assetId: 'ada-signing-1990',
    panelAssetId: 'ada-signing-1990',
    articleRoute: {kind: 'philosopher', philosopherId: 'martha-nussbaum'},
    presentation: presentation('Gallery 05 context exhibit', 'Disability and equal dignity', [
      {label: 'Philosopher', value: 'Martha Nussbaum'},
      {label: 'Work', value: 'Frontiers of Justice'},
      {label: 'Visual', value: 'ADA signing, 1990; contextual'},
      {label: 'Atlas route', value: 'Nussbaum’s full profile'},
    ], 'Open Nussbaum’s full Atlas article'),
  }),
  justiceExhibit({
    id: 'amartya-sen-capability-development',
    displayName: 'Amartya Sen: Capability and Development',
    shortTitle: 'Amartya Sen: Development as Freedom',
    workLabel: 'AMARTYA SEN · CAPABILITY AND DEVELOPMENT',
    dateLabel: 'Capability research developed from the late 1970s onward',
    question: 'Should development be measured by resources and growth, or by the freedoms people can actually exercise?',
    frontSubtitle: 'Functionings, agency, public reasoning, poverty, and human development',
    lead: 'Amartya Sen’s capability approach shifts evaluation from utility or resources alone toward the genuine freedoms people have to achieve valuable functionings. Poverty becomes capability deprivation, and development expands interconnected freedoms involving health, education, political participation, economic opportunity, and social security. Sen emphasizes public reasoning and generally resists fixing one canonical list in advance, a productive contrast with Nussbaum’s proposed central capabilities. The 2005 photograph identifies Sen as a public economist and philosopher; it does not visualize deprivation, stand for the people whose lives development measures assess, or turn a diverse research program into one person’s achievement.',
    keyIdeas: [
      'Functionings are achieved states and activities; capabilities are the real opportunities to select among them.',
      'Agency includes a person’s ability to pursue goals they have reason to value, not only personal well-being.',
      'Public reasoning helps communities identify valuable capabilities and scrutinize unequal freedom.',
    ],
    cautions: [
      'The capability approach is a framework with internal disagreements, not one settled metric or policy formula.',
      'A portrait of Sen must not replace the testimony and agency of people experiencing deprivation.',
    ],
    sections: [
      {heading: 'Why goods convert differently', paragraphs: ['Income and commodities matter, but age, disability, climate, public services, discrimination, and household power affect what someone can do with them. Evaluation therefore asks about effective opportunity as well as means.']},
      {heading: 'Freedom as process and opportunity', paragraphs: ['Sen connects the range of options people possess with their agency in shaping decisions. Political participation is not merely an instrument for better outcomes; it is itself part of development and accountability.']},
      {heading: 'A shared but plural tradition', paragraphs: ['Sen and Nussbaum overlap in rejecting utility and resources as complete measures. Their differences over lists, thresholds, philosophical foundations, and democratic specification keep the capability approach open to further argument.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — The Capability Approach', url: 'https://plato.stanford.edu/entries/capability-approach/', kind: 'academic-reference'},
      {label: 'Nobel Prize — Amartya Sen, Facts', url: 'https://www.nobelprize.org/prizes/economic-sciences/1998/sen/facts/', kind: 'collection-record'},
      {label: 'UN Development Programme — Human Development Reports', url: 'https://hdr.undp.org/', kind: 'collection-record'},
    ],
    assetId: 'amartya-sen-pmo-2005',
    panelAssetId: 'amartya-sen-pmo-2005',
    articleRoute: {kind: 'branch', branchId: 'political-philosophy'},
    presentation: presentation('Gallery 05 philosopher exhibit', 'Development as freedom', [
      {label: 'Philosopher', value: 'Amartya Sen'},
      {label: 'Framework', value: 'Capability and human development'},
      {label: 'Visual', value: 'Documentary portrait, 2005'},
      {label: 'Atlas route', value: 'Political Philosophy'},
    ], 'Open Political Philosophy in the Atlas', 'branch'),
  }),
  justiceExhibit({
    id: 'habermas-public-sphere',
    displayName: 'Habermas: The Public Sphere',
    shortTitle: 'Habermas: Public Sphere',
    workLabel: 'HABERMAS · THE PUBLIC SPHERE',
    dateLabel: 'Structural Transformation published 1962',
    question: 'Which social spaces allow public opinion to test power through reasons?',
    frontSubtitle: 'Communication, media, civil society, access, publicity, and democratic legitimacy',
    lead: 'Jürgen Habermas’s early history of the public sphere examines spaces in which private people addressed public matters through discussion, print, association, and criticism of state power. The ideal of publicity offers a standard for democratic accountability, while the historical narrative also tracks commercialization and managed opinion. Habermas later revised the model under feminist, historical, and social-theoretical criticism, acknowledging plural and contested publics. The portrait identifies Habermas but does not depict a public sphere or suggest that democratic communication rests on one authoritative speaker. A public is constituted through relations, institutions, media, access, and counterpublic contestation rather than philosophical celebrity.',
    keyIdeas: [
      'A public sphere links civil society to political decision through communication and criticism.',
      'Publicity can expose power to scrutiny, but media ownership and unequal access shape whose reasons circulate.',
      'Democratic legitimacy depends on opinion and will formation beyond periodic voting alone.',
    ],
    cautions: [
      'The historical bourgeois public sphere excluded many people and should not be treated as an inclusive golden age.',
      'Habermas’s model has changed over time and is contested by theories of counterpublics, power, race, gender, and media.',
    ],
    sections: [
      {heading: 'A space between household and state', paragraphs: ['Coffeehouses, salons, periodicals, associations, and later mass media create channels through which issues become public. Habermas asks how those channels can support criticism rather than merely stage consent.']},
      {heading: 'Inclusion changes the model', paragraphs: ['Critics show that supposedly universal publics often rested on exclusions and that subordinated groups formed alternative publics. Democratic communication may require multiple arenas, not one culturally uniform conversation.']},
      {heading: 'From print to platforms', paragraphs: ['Digital media multiply access and expression while enabling surveillance, disinformation, fragmentation, and private control over visibility. The public-sphere framework remains useful when paired with analysis of infrastructure and power.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Jürgen Habermas', url: 'https://plato.stanford.edu/entries/habermas/', kind: 'academic-reference'},
      {label: 'Internet Encyclopedia of Philosophy — Jürgen Habermas', url: 'https://iep.utm.edu/habermas/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Critical Theory', url: 'https://plato.stanford.edu/entries/critical-theory/', kind: 'academic-reference'},
    ],
    assetId: 'habermas-portrait',
    panelAssetId: 'habermas-portrait',
    articleRoute: {kind: 'philosopher', philosopherId: 'habermas'},
    presentation: presentation('Gallery 05 philosopher exhibit', 'Public reason and media', [
      {label: 'Philosopher', value: 'Jürgen Habermas'},
      {label: 'Concept', value: 'The public sphere'},
      {label: 'Visual', value: 'Documentary portrait'},
      {label: 'Atlas route', value: 'Habermas’s full profile'},
    ], 'Open Habermas’s full Atlas article'),
  }),
  justiceExhibit({
    id: 'democratic-deliberation-assembly',
    displayName: 'Democratic Deliberation: Assembly and Public Reason',
    shortTitle: 'Democratic Deliberation',
    workLabel: 'DEMOCRACY · DELIBERATION AND ASSEMBLY',
    dateLabel: 'Glarus Landsgemeinde photographed in 2009',
    question: 'How can collective decisions be shaped by reasons people can exchange and contest?',
    frontSubtitle: 'Participation, equality, agenda setting, public reasons, voting, and institutional design',
    lead: 'Deliberative democracy treats legitimate collective decisions as more than an aggregation of preferences. Citizens and representatives should be able to offer reasons, hear challenges, revise views, and hold decision-makers accountable under conditions of political equality. The photograph of the open-air Landsgemeinde in Glarus, Switzerland, gives this ideal a vivid institutional setting, but an assembly is not automatically inclusive or deliberative. Historically, participation was restricted, visible voting can create pressure, and large modern societies require many linked forums. The image is therefore a prompt to compare institutions—assemblies, legislatures, courts, media, parties, citizens’ panels, and social movements—rather than a model to copy without qualification.',
    keyIdeas: [
      'Deliberation asks participants to justify proposals with reasons others can examine and answer.',
      'Political equality concerns access, voice, agenda-setting power, information, and uptake—not only a formal vote.',
      'Voting can close a decision while public reasoning shapes preferences, alternatives, and future accountability.',
    ],
    cautions: [
      'Face-to-face assembly does not guarantee inclusion, freedom from domination, or equal influence.',
      'Consensus is not always possible or desirable; legitimate disagreement and protected opposition remain essential.',
    ],
    sections: [
      {heading: 'Reasons before and after votes', paragraphs: ['Deliberation can reveal hidden costs, identify shared interests, and make officials explain coercive rules. It also continues after decisions through review, protest, journalism, election, and revision.']},
      {heading: 'Design shapes who is heard', paragraphs: ['Speaking time, facilitation, language, expertise, disability access, childcare, publicity, and agenda control determine whether formal invitations become meaningful participation. Institutions must address power inside discussion, not only at entry.']},
      {heading: 'A system of connected publics', paragraphs: ['No single forum can represent a complex democracy. A deliberative system links informal publics, movements, specialist bodies, legislatures, and legal institutions while preserving routes for contestation and correction.']},
    ],
    sources: [
      {label: 'Stanford Encyclopedia of Philosophy — Democracy', url: 'https://plato.stanford.edu/entries/democracy/', kind: 'academic-reference'},
      {label: 'Stanford Encyclopedia of Philosophy — Public Reason', url: 'https://plato.stanford.edu/entries/public-reason/', kind: 'academic-reference'},
      {label: 'Swiss Federal Chancellery — Direct Democracy', url: 'https://www.ch.ch/en/votes-and-elections/referendum/', kind: 'collection-record'},
    ],
    assetId: 'glarus-landsgemeinde-2009',
    panelAssetId: 'glarus-landsgemeinde-2009',
    articleRoute: {kind: 'branch', branchId: 'political-philosophy'},
    presentation: presentation('Gallery 05 civic-practice exhibit', 'Deliberation and assembly', [
      {label: 'Tradition', value: 'Deliberative democracy'},
      {label: 'Question', value: 'How public reasons shape collective choice'},
      {label: 'Visual', value: 'Glarus assembly, 2009; contextual'},
      {label: 'Atlas route', value: 'Political Philosophy'},
    ], 'Open Political Philosophy in the Atlas', 'branch'),
  }),
] as const satisfies readonly MuseumSupplementalExhibit[]).map(reviewJusticeDemocraticReasonSupplementalExhibit);

export const JUSTICE_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout({id: 'political-authority-legitimacy', parentExhibitId: 'political-philosophy', zoneId: 'justice-political-orientation', position: {x: -5.55, z: -27.38}, rotationY: 0, assetId: 'political-authority-interpretive', mediaWidth: 2.135, mediaHeight: 3.2, installationKind: 'justice-concept', accent: JUSTICE_PALETTE.indigo}),
  layout({id: 'public-action-civil-disobedience', parentExhibitId: 'political-philosophy', zoneId: 'justice-political-orientation', position: {x: -5.55, z: -9.953}, rotationY: Math.PI, assetId: 'march-washington-leaders-1963', mediaWidth: 3.4, mediaHeight: 2.709375, installationKind: 'justice-context', accent: JUSTICE_PALETTE.civicRed}),
  layout({id: 'arendt-human-condition', parentExhibitId: 'arendt', zoneId: 'justice-political-orientation', position: {x: 5.55, z: -27.38}, rotationY: 0, assetId: 'arendt-human-condition-interpretive', mediaWidth: 2.135, mediaHeight: 3.2, installationKind: 'justice-work', accent: JUSTICE_PALETTE.copper}),
  layout({id: 'arendt-eichmann-judgment', parentExhibitId: 'arendt', zoneId: 'justice-political-orientation', position: {x: 5.55, z: -9.953}, rotationY: Math.PI, assetId: 'eichmann-trial-1961', mediaWidth: 2.4, mediaHeight: 3.2, installationKind: 'justice-context', accent: JUSTICE_PALETTE.ink}),
  layout({id: 'rawls-theory-of-justice', parentExhibitId: 'rawls', zoneId: 'justice-distribution-rights', position: {x: -5.55, z: -8.713}, rotationY: 0, assetId: 'rawls-theory-justice-1971', mediaWidth: 2.145, mediaHeight: 3.2, installationKind: 'justice-work', accent: JUSTICE_PALETTE.indigo}),
  layout({id: 'rawls-original-position', parentExhibitId: 'rawls', zoneId: 'justice-distribution-rights', position: {x: -5.55, z: 8.713}, rotationY: Math.PI, assetId: 'rawls-original-position-interpretive', mediaWidth: 2.135, mediaHeight: 3.2, installationKind: 'justice-concept', accent: JUSTICE_PALETTE.copper}),
  layout({id: 'nozick-anarchy-state-utopia', parentExhibitId: 'nozick', zoneId: 'justice-distribution-rights', position: {x: 5.55, z: -8.713}, rotationY: 0, assetId: 'nozick-anarchy-state-utopia-1974', mediaWidth: 2.53, mediaHeight: 3.2, installationKind: 'justice-work', accent: JUSTICE_PALETTE.ink}),
  layout({id: 'nozick-entitlement-rectification', parentExhibitId: 'nozick', zoneId: 'justice-distribution-rights', position: {x: 5.55, z: 8.713}, rotationY: Math.PI, assetId: 'nozick-entitlement-interpretive', mediaWidth: 2.135, mediaHeight: 3.2, installationKind: 'justice-concept', accent: JUSTICE_PALETTE.civicRed}),
  layout({id: 'nussbaum-capabilities-approach', parentExhibitId: 'martha-nussbaum', zoneId: 'justice-capabilities-democracy', position: {x: -5.55, z: 9.953}, rotationY: 0, assetId: 'nussbaum-capabilities-interpretive', mediaWidth: 2.135, mediaHeight: 3.2, installationKind: 'justice-concept', accent: JUSTICE_PALETTE.indigo}),
  layout({id: 'nussbaum-frontiers-justice', parentExhibitId: 'martha-nussbaum', zoneId: 'justice-capabilities-democracy', position: {x: -5.55, z: 27.38}, rotationY: Math.PI, assetId: 'ada-signing-1990', mediaWidth: 3.4, mediaHeight: 2.3003125, installationKind: 'justice-context', accent: JUSTICE_PALETTE.civicRed}),
  layout({id: 'amartya-sen-capability-development', parentExhibitId: 'martha-nussbaum', zoneId: 'justice-capabilities-democracy', position: {x: 5.55, z: 9.953}, rotationY: 0, assetId: 'amartya-sen-pmo-2005', mediaWidth: 2.12, mediaHeight: 3.2, installationKind: 'justice-context', accent: JUSTICE_PALETTE.copper}),
  layout({id: 'habermas-public-sphere', parentExhibitId: 'martha-nussbaum', zoneId: 'justice-capabilities-democracy', position: {x: 5.55, z: 27.38}, rotationY: Math.PI, assetId: 'habermas-portrait', mediaWidth: 3.4, mediaHeight: 2.2684375, installationKind: 'justice-context', accent: JUSTICE_PALETTE.ink}),
  layout({id: 'democratic-deliberation-assembly', parentExhibitId: 'martha-nussbaum', zoneId: 'justice-capabilities-democracy', position: {x: 10.85, z: 18.667}, rotationY: -Math.PI / 2, assetId: 'glarus-landsgemeinde-2009', mediaWidth: 3.4, mediaHeight: 2.263125, installationKind: 'justice-context', accent: JUSTICE_PALETTE.paper}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

const supplementalById = new Map<MuseumSupplementalExhibitId, MuseumSupplementalExhibit>(
  JUSTICE_SUPPLEMENTAL_EXHIBITS.map((record) => [record.id, record]),
);

export const findJusticeSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit | undefined => supplementalById.get(id);

export const getJusticeSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = findJusticeSupplementalExhibit(id);
  if (!record) throw new Error(`Gallery 05 supplemental exhibit ${id} is missing.`);
  return record;
};
