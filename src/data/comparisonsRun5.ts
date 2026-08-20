import type {
  ComparisonCasefile,
  ComparisonStatement,
} from '../types/philosophy';

const sourceIds: Record<string, string> = {
  hegel: 'hegel-sep',
  marx: 'marx-sep',
};

const philosopherStatement = (text: string, ...entityIds: string[]): ComparisonStatement => ({
  text,
  evidence: entityIds.map((entityId) => ({entityKind: 'philosopher', entityId, sourceId: sourceIds[entityId]})),
});

const philosopherCase = (participantIds: readonly [string, string], content: Omit<ComparisonCasefile, 'kind' | 'participantIds'>): ComparisonCasefile => ({
  kind: 'philosopher', participantIds, ...content,
});

/** Content-expansion run 5 casefile retained as part of the authored corpus. */
export const expansionRun5ComparisonCasefiles: readonly ComparisonCasefile[] = [
  philosopherCase(['hegel', 'marx'], {
    sharedQuestion: philosopherStatement('How can historically produced forms of social life become intelligible, free, and collectively transformable when labor, institutions, and conflict shape the people who act within them?', 'hegel', 'marx'),
    historicalRelationship: philosopherStatement('Marx formed his project through critical engagement with Hegel and the Young Hegelian milieu, appropriating developmental and immanent critique while redirecting it through practical activity, political economy, class, and capitalism; this is a transformation and disagreement, not a mechanical inversion from “ideas” to “matter.”', 'hegel', 'marx'),
    sharedAssumptions: [
      philosopherStatement('Both treat social forms as historically made rather than timeless, understand freedom as more than private choice, and ask how institutions can embody human powers while also confronting people as external constraints.', 'hegel', 'marx'),
      philosopherStatement('Both analyze contradiction as a pressure internal to a form of life, but neither corpus can responsibly be reduced to the later classroom formula thesis–antithesis–synthesis.', 'hegel', 'marx'),
    ],
    axes: [
      {
        label: 'History and immanent change',
        question: philosopherStatement('What makes a social order historically intelligible and capable of transformation from within?', 'hegel', 'marx'),
        positions: [
          {entityId: 'hegel', claim: philosopherStatement('Hegel follows forms of consciousness, social life, and spirit as their own standards expose one-sidedness and require more adequate relations of freedom; the Phenomenology, Logic, Philosophy of Right, and posthumous history lectures do not present one interchangeable historical script.', 'hegel')},
          {entityId: 'marx', claim: philosopherStatement('Marx analyzes historically specific relations of production, class struggle, political conflict, and changing productive capacities, but his early manuscripts, programmatic collaborations, historical journalism, and critique of political economy do not yield one uncontested stage sequence.', 'marx')},
        ],
        contrast: philosopherStatement('Marx transforms Hegelian developmental critique by locating historical pressures in practical social relations and production, yet “materialism” does not replace close analysis of law, politics, consciousness, or collective agency with an automatic economic cause.', 'hegel', 'marx'),
      },
      {
        label: 'Alienation and labor',
        question: philosopherStatement('How can human activity produce a world in which people fail to recognize or control their own powers?', 'hegel', 'marx'),
        positions: [
          {entityId: 'hegel', claim: philosopherStatement('In the Phenomenology, labor within lordship and bondage disciplines desire and gives durable form to the world, while alienation belongs to a wider education of spirit whose estrangements are worked through in social and historical forms.', 'hegel')},
          {entityId: 'marx', claim: philosopherStatement('The 1844 manuscripts diagnose alienated labor through separation from product, activity, human capacities, and others; later political economy analyzes wage labor, commodity form, exploitation, and fetishism without simply repeating the early vocabulary.', 'marx')},
        ],
        contrast: philosopherStatement('Marx inherits a problem about powers becoming external but makes capitalist labor relations central; Hegelian labor is not already a theory of wage labor, and Marx’s mature critique cannot be read as a glossary for the 1844 manuscripts.', 'hegel', 'marx'),
      },
      {
        label: 'Civil society and capitalism',
        question: philosopherStatement('Can market dependence be institutionally mediated, or must the relations organizing production and property themselves be transformed?', 'hegel', 'marx'),
        positions: [
          {entityId: 'hegel', claim: philosopherStatement('Hegelian civil society organizes needs, labor, exchange, estates, administration, and corporations while generating dependence and poverty; it is a necessary but one-sided sphere that requires family and state institutions rather than a self-sufficient market.', 'hegel')},
          {entityId: 'marx', claim: philosopherStatement('Marx treats capitalist production, private property, wage labor, accumulation, and class power as a social totality whose market appearances cannot be corrected merely by placing exchange inside a higher political framework.', 'marx')},
        ],
        contrast: philosopherStatement('Hegel seeks institutions that contain civil society and make its participants members of an ethical whole, whereas Marx argues that capitalist property and production reproduce domination that those political mediations do not overcome.', 'hegel', 'marx'),
      },
      {
        label: 'The state and social freedom',
        question: philosopherStatement('What political institutions can convert divided private interests into a freedom people recognize as their own?', 'hegel', 'marx'),
        positions: [
          {entityId: 'hegel', claim: philosopherStatement('Hegel presents the rational state as an articulated system of right, family, civil society, administration, estates, legislature, and constitutional monarchy through which freedom becomes objective; this is not an endorsement of every existing government.', 'hegel')},
          {entityId: 'marx', claim: philosopherStatement('Marx offers several historically situated accounts of the capitalist state rather than one finished theory, and his writings on political emancipation, Bonapartism, the Paris Commune, and communist transition leave major institutional questions open.', 'marx')},
        ],
        contrast: philosopherStatement('For Hegel the state can reconcile differentiated institutions within ethical life; for Marx political forms remain shaped by class society and must be subordinated to collective self-government rather than assumed to reconcile it.', 'hegel', 'marx'),
      },
      {
        label: 'Collective transformation',
        question: philosopherStatement('How can people change a social order without imagining either reform or revolution as automatic?', 'hegel', 'marx'),
        positions: [
          {entityId: 'hegel', claim: philosopherStatement('Hegelian transformation tests and reconstructs institutions so that persons can recognize themselves in rights and shared practices, but his mature politics does not provide a program of proletarian revolution and retains severe exclusions and unresolved poverty.', 'hegel')},
          {entityId: 'marx', claim: philosopherStatement('Marx connects emancipation to organized class struggle and collective reorganization of production, property, and political power, while declining to supply a detailed blueprint and offering no warrant that contradiction alone will produce liberation.', 'marx')},
        ],
        contrast: philosopherStatement('Their disagreement concerns which institutions can realize freedom and which social relations must be remade: Hegel emphasizes mediated ethical reconciliation, while Marx presses toward collective transformation of capitalist production and class power.', 'hegel', 'marx'),
      },
    ],
    terminology: [
      {
        topic: 'Contradiction and social transformation',
        positions: [
          {entityId: 'hegel', term: 'dialectical development', explanation: philosopherStatement('A determination or social form is tested through tensions generated by its own claims and relations, producing a more adequate determination rather than following a preset three-beat template.', 'hegel')},
          {entityId: 'marx', term: 'material contradiction', explanation: philosopherStatement('Conflicts among productive activity, property, class relations, political forms, and human capacities are historically specific social relations, not matter mechanically battling ideas.', 'marx')},
        ],
        warning: philosopherStatement('“Idealism versus materialism” can name a genuine philosophical dispute only after the terms are specified; as a slogan it hides Hegel’s account of embodied institutions and Marx’s sustained analysis of law, politics, ideology, and collective agency.', 'hegel', 'marx'),
      },
    ],
    arguments: [
      {
        entityId: 'hegel',
        title: 'Freedom must become objective in institutions',
        summary: philosopherStatement('Private intention is insufficient for freedom: rights, recognition, family, civil society, and political institutions must make agency durable and mutually intelligible.', 'hegel'),
        pressure: philosopherStatement('Hegel must explain how institutions count as rational when his own account preserves monarchy, restricted participation, gender hierarchy, colonial hierarchy, and a poverty problem it does not solve.', 'hegel'),
      },
      {
        entityId: 'marx',
        title: 'Transform the relations that reproduce unfreedom',
        summary: philosopherStatement('If labor and social cooperation reproduce capital and class power, emancipation requires collective control over the productive relations through which those powers confront their creators.', 'marx'),
        pressure: philosopherStatement('Marx must explain transition, pluralism, rights, state functions, and durable institutions without relying on historical inevitability or leaving race, gender, colonialism, and ecology as derivative questions.', 'marx'),
      },
    ],
    readings: [
      {entityId: 'hegel', title: 'Elements of the Philosophy of Right, §§142–256', author: 'G. W. F. Hegel', kind: 'primary', stage: 'Build the institutional argument', whyHere: philosopherStatement('Read ethical life through family, civil society, labor, poverty, administration, and the state before treating reconciliation as a political slogan.', 'hegel')},
      {entityId: 'marx', title: 'Capital, Volume I: commodity, working day, machinery, and accumulation chapters', author: 'Karl Marx', kind: 'primary', stage: 'Trace the transformation into critique of capital', whyHere: philosopherStatement('Follow commodity form, wage labor, exploitation, cooperation, machinery, and accumulation so the mature critique is not reduced to the early theory of alienation.', 'marx')},
    ],
    interpretiveLimits: [
      philosopherStatement('Hegel’s lifetime publications must be distinguished from edited lecture corpora, and Marx’s early manuscripts, collaborations, journalism, notebooks, published Capital, and posthumously edited volumes must not be treated as one simultaneous system.', 'hegel', 'marx'),
      philosopherStatement('The comparison does not decide continuity within either corpus, endorse Hegel’s hierarchy, or make Marx the inevitable truth of Hegel; it isolates a historically consequential inheritance, transformation, and disagreement.', 'hegel', 'marx'),
    ],
    followOns: [
      {kind: 'philosopher', participantIds: ['marx', 'fanon'], label: 'Karl Marx and Frantz Fanon', reason: philosopherStatement('Continue with an authored dossier that tests how Marxian critique is transformed again through colonial racialization, violence, national consciousness, and decolonization.', 'marx')},
    ],
  }),
];
