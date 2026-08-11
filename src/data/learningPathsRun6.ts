import type {
  LearningPath,
  LearningPathArticleLink,
  LearningPathMuseumLink,
  LearningPathReading,
  LearningPathStep,
} from '../types/philosophy';

const article = (kind: 'branch' | 'philosopher', id: string, reason: string): LearningPathArticleLink => ({kind, id, reason});
const museum = (hallId: string, exhibitId: string, label: string, reason: string): LearningPathMuseumLink => ({hallId, exhibitId, label, reason});
const reading = (kind: 'primary' | 'secondary', title: string, author: string, sourceKind: 'branch' | 'philosopher', sourceId: string, whyThisStep: string): LearningPathReading => ({
  kind, title, author, sourceArticle: {kind: sourceKind, id: sourceId}, whyThisStep,
});
const step = (value: LearningPathStep): LearningPathStep => value;

/** Post-expansion consolidation adds one path without changing prior stable path or step ids. */
export const expansionRun6LearningPaths: readonly LearningPath[] = [
  {
    id: 'phenomenology', title: 'Phenomenology', level: 'intermediate', estimatedMinutes: 115,
    subjectTags: ['phenomenology', 'embodiment', 'ethics and power'], worldTags: ['twentieth-century Europe and anticolonial worlds'],
    beginnerDescription: 'Trace several contested phenomenological projects—description, ontology, embodiment, situation, and racialization—without treating them as one doctrine, private introspection, or an inevitable succession.',
    prerequisites: 'No prior phenomenology required; bring one concrete question about experience, world, body, or social power.',
    objectives: ['Distinguish phenomenological method, ontology, embodiment, ethics, and critique of power.', 'Explain how later projects transform inherited questions without forming an inevitable linear succession.', 'Use intentionality and lived experience without reducing phenomenology to private introspection.'],
    outcomes: ['Compare the distinct projects of Husserl, Heidegger, Merleau-Ponty, Beauvoir, and Fanon.', 'Analyze how a meaningful world can be bodily, social, historical, and structured by power.'],
    branchIds: ['phenomenology', 'ontology', 'feminist-philosophy', 'political-philosophy', 'continental-philosophy'],
    philosopherIds: ['husserl', 'heidegger', 'merleau-ponty', 'beauvoir', 'fanon'],
    steps: [
      step({
        id: 'phenomenology-intentionality-reduction-lifeworld', title: 'Describe intentionality, reduction, and lifeworld',
        sequenceRationale: 'The route begins with a methodological problem—how experience is directed and can be described—rather than treating Husserl as the first rung of a predetermined succession.',
        explanation: 'For Husserl, intentionality means that consciousness is ordinarily directed toward something: a remembered friend, a threatening sound, a mathematical object, or a shared task. Phenomenological reduction suspends the ordinary rush to settle what exists independently so that the ways things are given, meant, confirmed, or revised can be examined; it does not deny the world or retreat into a private interior. His later account of the lifeworld identifies the shared, embodied, historical world that scientific abstractions presuppose. Method, intersubjectivity, and world therefore belong together, even as interpreters dispute the scope of transcendental idealism and the relation between Husserl’s changing projects.',
        objectives: ['Explain intentionality as directed sense-making rather than an inner mental object.', 'Distinguish reduction from skepticism or denial of a shared world.', 'Relate the lifeworld to embodied and intersubjective conditions of inquiry.'],
        branchIds: ['phenomenology'], philosopherIds: ['husserl'], conceptIds: ['intentionality', 'phenomenological-reduction', 'lifeworld', 'intersubjectivity'],
        articleLinks: [article('philosopher', 'husserl', 'Husserl’s reviewed profile traces intentionality, reduction, intersubjectivity, embodiment, and the later lifeworld across distinct phases of his work.'), article('branch', 'phenomenology', 'The field article explains phenomenology as disciplined inquiry into meaningful experience rather than a diary of private feelings.')],
        museumLinks: [museum('phenomenology-existence-embodiment', 'husserl', 'Edmund Husserl', 'The exhibit anchors phenomenological description in directed experience, method, and the problem of a shared world.')],
        readings: [reading('primary', 'Ideas Pertaining to a Pure Phenomenology and to a Phenomenological Philosophy, First Book, §§27–65', 'Edmund Husserl', 'philosopher', 'husserl', 'Read the epoché and reduction in their technical setting before turning them into a slogan about withdrawing from reality.'), reading('secondary', 'Edmund Husserl', 'Dan Zahavi', 'philosopher', 'husserl', 'Use the specialist overview to connect intentionality and reduction with Husserl’s changing accounts of embodiment, intersubjectivity, and lifeworld.')],
        reflectionQuestions: ['What is an experience directed toward, and how is that object meaningful rather than merely present?', 'What does suspending an assumption let you describe without requiring you to deny it?'],
        checkpointQuestion: 'How can reduction investigate a shared world instead of enclosing experience inside a private mind?',
        nextHint: 'Next, ask what changes when phenomenology becomes an inquiry into being-in-the-world rather than primarily a method for transcendental consciousness.',
      }),
      step({
        id: 'phenomenology-being-world-temporality', title: 'Recast the problem as being-in-the-world and temporality',
        sequenceRationale: 'Heidegger comes next as a critical transformation of the question, not as the inevitable completion or simple application of Husserl’s method.',
        explanation: 'Heidegger’s Being and Time asks the question of being through Dasein, the being for whom being is an issue. Being-in-the-world is a unitary structure: people usually encounter equipment, others, places, and possibilities through practical involvement before adopting a detached spectator’s stance. Care and temporality organize this existence through inherited possibilities, present engagements, and projection toward futures, rather than through a sequence of isolated clock instants. This ontological project differs from Husserl’s transcendental analysis even where it inherits phenomenological resources; Heidegger’s commitment to National Socialism and antisemitism also remains indispensable critical context for evaluating his work and its reception.',
        objectives: ['Explain being-in-the-world as practical involvement rather than a mind located inside a container.', 'Relate care and temporality to possibility, history, and finite existence.', 'Distinguish Heidegger’s ontological project from Husserl’s without declaring a clean break or inevitable advance.'],
        branchIds: ['phenomenology', 'ontology'], philosopherIds: ['heidegger'], conceptIds: ['being-in-the-world', 'care', 'temporality', 'dasein'],
        articleLinks: [article('philosopher', 'heidegger', 'Heidegger’s reviewed profile covers worldhood, care, temporality, later transformations, and the necessary political and interpretive cautions.'), article('branch', 'phenomenology', 'The field article locates Heidegger as one contested transformation among several phenomenological projects, not the movement’s inevitable destination.')],
        museumLinks: [museum('phenomenology-existence-embodiment', 'heidegger', 'Martin Heidegger', 'The exhibit makes practical involvement and the renewed question of being visible while retaining the work’s historical and political stakes.')],
        readings: [reading('primary', 'Being and Time, §§12–18 and 65–71', 'Martin Heidegger', 'philosopher', 'heidegger', 'Read worldhood and temporality together so being-in-the-world is not reduced to a slogan about everyday practical activity.'), reading('secondary', 'Martin Heidegger', 'Mark Wrathall', 'philosopher', 'heidegger', 'Use the specialist account to distinguish the early ontology, later work, political history, and live interpretive disputes.')],
        reflectionQuestions: ['Which features of a familiar activity appear only because you are already involved in a practical world?', 'How does a future possibility reorganize the meaning of a present action and an inherited past?'],
        checkpointQuestion: 'Why is being-in-the-world an ontological structure rather than a claim that people happen to occupy physical surroundings?',
        nextHint: 'Now move from practical worldhood to the lived body’s perceptual capacities and ask what an embodied “I can” contributes.',
      }),
      step({
        id: 'phenomenology-embodied-perception', title: 'Take perception through an embodied “I can”',
        sequenceRationale: 'After worldhood and temporality, Merleau-Ponty lets the route examine embodiment as a distinct perceptual project rather than a biological supplement to earlier accounts.',
        explanation: 'Merleau-Ponty describes perception as bodily access to a meaningful world, not as a mind assembling neutral sensations into an inner picture. Motor intentionality and body schema name practical capacities through which a body reaches, navigates, speaks, and takes up possibilities—an “I can” that can also be altered by injury, habit, technology, and social setting. His dialogue with psychology and neurology does not reject science; it challenges explanations that omit the lived organization that makes experimental objects and actions intelligible. Later feminist, critical, disability, and medical phenomenologies use these resources while also questioning whose body, reciprocity, and social power his descriptions adequately capture.',
        objectives: ['Distinguish the lived body and body schema from a merely physiological object or visual body image.', 'Explain motor intentionality through skilled perceptual action.', 'Identify how later critical work can inherit and contest Merleau-Ponty’s account of embodiment.'],
        branchIds: ['phenomenology', 'philosophy-of-mind'], philosopherIds: ['merleau-ponty'], conceptIds: ['embodied-perception', 'motor-intentionality', 'body-schema', 'i-can'],
        articleLinks: [article('philosopher', 'merleau-ponty', 'Merleau-Ponty’s reviewed profile develops perception, motor intentionality, body schema, expression, politics, and the unfinished later ontology.'), article('branch', 'phenomenology', 'The field article places embodied perception within a plural movement and records critical extensions around gender, race, disability, and medicine.')],
        museumLinks: [museum('phenomenology-existence-embodiment', 'merleau-ponty', 'Maurice Merleau-Ponty', 'The exhibit centers the lived body as an active opening onto a shared world rather than an object observed from outside.')],
        readings: [reading('primary', 'Phenomenology of Perception, Preface and Part I selections', 'Maurice Merleau-Ponty', 'philosopher', 'merleau-ponty', 'Begin with the argument for perception, body schema, and motor intentionality before approaching the unfinished ontology of flesh.'), reading('secondary', 'Maurice Merleau-Ponty', 'Ted Toadvine', 'philosopher', 'merleau-ponty', 'Use the specialist synthesis to connect embodiment with expression, politics, late ontology, reception, and important limits.')],
        reflectionQuestions: ['Which possibility appears through a bodily capacity before you explicitly represent it?', 'How would a change in bodily ability or social environment reorganize the same material space?'],
        checkpointQuestion: 'What does an embodied “I can” explain that a picture of perception as inner representation leaves out?',
        nextHint: 'Finish by asking how situation, oppression, otherness, and racialization transform what phenomenological description and ethics must address.',
      }),
      step({
        id: 'phenomenology-situation-racialized-embodiment', title: 'Transform phenomenology through situation, otherness, and racialized embodiment',
        sequenceRationale: 'The final pairing opens further problems rather than completing a lineage: Beauvoir and Fanon transform phenomenological resources through distinct ethical, feminist, psychiatric, and anticolonial projects.',
        explanation: 'Beauvoir treats freedom as embodied and situated: projects depend on material conditions and other people, while oppression can constrain a group’s field of possibilities and produce woman as a socially subordinated Other. Her ethics asks how one freedom can will itself without denying the freedom of others, joining ambiguity and reciprocity to institutions and unequal situations. Fanon’s phenomenological, psychiatric, literary, and political analyses show how colonial anti-Black racialization reorganizes bodily space, language, recognition, and self-relation; racialized embodiment is socially and historically produced, not a biological essence or private feeling. These projects intersect without becoming interchangeable: Beauvoir’s feminist existential ethics and Fanon’s anticolonial diagnosis each expose limits in abstract accounts of subjectivity while opening different questions of power, resistance, and collective transformation.',
        objectives: ['Explain Beauvoir’s situated freedom, otherness, and ethical relation without blaming oppressed people for constrained possibilities.', 'Describe Fanon’s racialized embodiment as a colonial social structure lived through bodies, language, and institutions.', 'Compare two transformations of phenomenology without making either thinker the final stage of one linear succession.'],
        branchIds: ['phenomenology', 'feminist-philosophy', 'political-philosophy'], philosopherIds: ['beauvoir', 'fanon'], conceptIds: ['situation', 'otherness', 'oppression', 'racialized-embodiment', 'sociogeny'],
        articleLinks: [article('philosopher', 'beauvoir', 'Beauvoir’s reviewed profile distinguishes her philosophical project across situated freedom, reciprocity, oppression, otherness, ethics, and feminist criticism.'), article('philosopher', 'fanon', 'Fanon’s reviewed profile connects racialized embodiment with language, psychiatry, colonial institutions, violence, organization, and unfinished decolonization.')],
        museumLinks: [museum('colonialism-race-liberation', 'fanon', 'Frantz Fanon', 'The exhibit relocates lived embodiment within colonial institutions, racialization, psychiatry, and struggles for liberation rather than private introspection.')],
        readings: [reading('primary', 'The Second Sex, Volume II selections on situation', 'Simone de Beauvoir', 'philosopher', 'beauvoir', 'Read situation and lived experience as analyses of socially produced possibility, embodiment, dependence, and resistance rather than fixed destiny.'), reading('primary', 'Black Skin, White Masks', 'Frantz Fanon', 'philosopher', 'fanon', 'Read the chapters on language and lived Black experience to trace how colonial racialization enters bodily orientation, recognition, and self-relation.')],
        reflectionQuestions: ['How can a situation constrain freedom without turning a person into a passive object with no agency?', 'Which institution or social gaze changes what a body can do, expect, or safely disclose?'],
        checkpointQuestion: 'How do Beauvoir and Fanon make phenomenology answerable to ethics and power while pursuing distinct philosophical projects?',
        nextHint: 'Continue with Feminist Philosophy or Colonialism, Race, and Liberation, then return to the Phenomenology exhibit to compare what each route now makes visible.',
      }),
    ],
  },
];
