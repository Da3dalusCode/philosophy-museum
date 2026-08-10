import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';

type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

const objectLed = (
  name: string,
  paragraphs: readonly string[],
  orientation: readonly VisitorGuideSection[],
  assetId: MuseumAssetId,
  objectText: string,
  lock: `fnv1a64:${string}`,
): MuseumPrimaryInterpretationEnrichment => ({
  lead: '',
  keyIdeas: [],
  keyWorks: [],
  sections: [{heading: '', paragraphs}],
  presentation: {
    mode: 'concise',
    orientation,
    articleActionLabel: `Read the full sourced ${name} article`,
    bodyLayout: 'prose',
    exhibitLayout: 'object-led',
    plaqueKicker: '',
    plaqueSubtitleLines: 4,
  },
  objectInterpretations: {[assetId]: objectText},
  review: {
    status: 'standard-compliant',
    reviewedOn: '2026-08-09',
    method: 'Reconciled separately against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.',
    lock,
  },
});

/**
 * The next seven eligible claim-reviewed canonical exhibits in ledger order.
 * These are title-local Museum readings, distinct from the complete sourced articles.
 */
export const CANONICAL_ORDER_PRIMARY_INTERPRETATIONS_D:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  dewey: objectLed(
    'John Dewey',
    [
      'John Dewey made inquiry a practice for dealing with a situation that has become indeterminate, blocked, or confusing. Instead of beginning with a spectator mind confronting a sorted world, he follows people as they identify a trouble, imagine possible responses, test consequences, and revise habits. Ideas are instruments in this work, but not disposable tricks: their worth depends on whether they help inquiry transform a problem. “Warranted assertibility” names the standing a claim earns through testing and criticism, not certainty or consensus. Dewey’s pragmatism therefore connects knowledge to action while keeping action answerable to a world that can resist it.',
      'Education and democracy are not afterthoughts in this philosophy. Learning by doing does not mean activity without discipline; it means purposeful activity organized by questions, materials, feedback, cooperation, and reflection. Democracy, similarly, is more than voting. A public forms when people recognize shared indirect consequences and need institutions through which to investigate and address them. Communication and institutions matter, but experts cannot replace affected publics. Dewey’s account is tested where unequal access to safety, property, education, media, or political power determines who can name a problem and whose experience counts as evidence. Jane Addams and the collaborative history of the Laboratory School make that test especially sharp.',
      'Gibson’s c. 1890 studio photograph is a lifetime portrait of a young Dewey, made before his best-known writing on democratic publics and education. It can establish a historical person and an early professional presentation; it cannot picture inquiry, prove a doctrine, or make a schoolroom and democracy follow from one another. Its composed stillness is useful precisely by contrast. Dewey asks visitors to see intelligence as social and experimental: a capacity distributed across materials, institutions, habits, conflict, and revision. The portrait should lead back to the practical question his philosophy keeps open—what arrangements let people learn from shared consequences?',
    ],
    [
      {heading: 'Inquiry in practice', items: [
        {label: 'Problematic situation', description: 'Inquiry starts from a concrete disruption that must be described and worked on, not from doubt about every belief at once.'},
        {label: 'Warranted assertibility', description: 'A conclusion earns provisional standing through public testing and correction; it is neither infallible certainty nor a popularity vote.'},
      ]},
      {heading: 'Education and public life', items: [
        {label: 'Growth', description: 'Growth means richer, more connected capacities for further experience and participation, not aimless novelty or one fixed model of maturity.'},
        {label: 'A public', description: 'People become a public when indirect consequences affect them together and they need organized communication and action.'},
      ]},
      {heading: 'A necessary pressure', items: [
        {label: 'Democracy is not automatic', description: 'Invitation, conversation, or expertise alone do not overcome unequal power; participation must be able to alter inquiry and institutions.'},
        {label: 'Collaboration', description: 'Dewey belongs to a broader pragmatist milieu that includes Addams, educators, families, and organizers, not a solitary theory applied by others.'},
      ]},
    ],
    'dewey-gibson-studio-portrait-c1890',
    'John Jefferson Gibson’s c. 1890 sepia studio photograph is a lifetime head-and-shoulders portrait of John Dewey, held by the Bentley Historical Library. It identifies Dewey in an early career setting and records a composed photographic likeness. It cannot show a particular class, establish the meaning of “learning by doing,” or prove his later accounts of inquiry, democracy, public communication, or social reconstruction.',
    'fnv1a64:2f7a1a8a1c528cb1',
  ),
  'iris-murdoch': objectLed(
    'Iris Murdoch',
    [
      'Iris Murdoch challenges an image of moral agency as a sovereign will choosing among options already clearly described. Long before an overt choice, people notice selectively, protect themselves with fantasy, and form images of others through fear, vanity, resentment, and love. Her famous mother-in-law example makes the point ordinary: a person can work inwardly to redescribe another more justly, and that work is already moral achievement. Attention is not mere concentration. It is a disciplined, fallible effort to let another reality correct the ego’s convenient picture. “Unselfing” therefore does not mean self-hatred, service without limits, or political passivity; it names release from self-absorbed distortion.',
      'Murdoch’s Good is a demanding orientation beyond private preference, not a personal divine commander. Her selective modern Platonism draws on art, literature, psychology, religion, Simone Weil, and analytic debate without turning those materials into one syncretic system. Novels and philosophical essays illuminate a shared concern with particularity and fantasy, but a novel is not a treatise in costume. Her later work also gives duty a larger role than a frozen picture of the 1970 collection suggests. The lasting criticism is equally important: moral vision may prepare action, yet vision alone can underdescribe institutions, racialized and gendered power, disability, labor, and collective political struggle. Just attention must remain corrigible by those conditions.',
      'The photograph shows 30 Charlbury Road in Oxford with its blue plaque to Murdoch, taken by A. J. Paxton in 2025. It records a present-day associated place, not Murdoch, her interior life, or the house as she experienced it. Nor can a plaque interpret attention, goodness, or freedom. The leafy exterior nevertheless makes a useful distinction visible: biography supplies a location, while philosophy asks how one’s descriptions of other people are made and remade. The object should not domesticate Murdoch into a private sage. It directs the visitor back to her harder question: when a moral response feels obvious, which fantasies, categories, and absences have already arranged what we think we see?',
    ],
    [
      {heading: 'Before the choice', items: [
        {label: 'Moral vision', description: 'Descriptions of a person or situation can be generous or self-protective before anyone decides what to do.'},
        {label: 'Attention', description: 'A patient effort to see an independent reality justly and lovingly, rather than simply sustaining focus on what one already wants.'},
      ]},
      {heading: 'The Good and art', items: [
        {label: 'The Good', description: 'Murdoch’s non-possessable standard of perfection resists reducing goodness to preference, a checklist, or a personal deity.'},
        {label: 'Literature', description: 'Fiction can train responsiveness to opacity and particularity, but it neither guarantees moral improvement nor substitutes for argument.'},
      ]},
      {heading: 'Keep the pressure open', items: [
        {label: 'Freedom', description: 'Freedom is improved responsiveness to what is there, not merely unconstrained choosing; action and duty still matter.'},
        {label: 'Politics and gender', description: 'Murdoch offers resources against mastery and fantasy, while critics ask how her inward emphasis handles structural injustice and unequal care.'},
      ]},
    ],
    'moral-murdoch-charlbury-road',
    'A. J. Paxton’s 14 June 2025 photograph shows 30 Charlbury Road, Oxford, with a blue plaque to Iris Murdoch. It is a contemporary contextual view of a place associated with Murdoch, not a likeness, an interior of her work, or evidence that the house remains as she knew it. The plaque identifies an association; it cannot establish her moral philosophy, personal character, or the meaning of attention and unselfing.',
    'fnv1a64:a464cfd910b218a9',
  ),
  'philippa-foot': objectLed(
    'Philippa Foot',
    [
      'Philippa Foot asked how moral judgment can be answerable to reasons without floating free from human life. She argues that people can be mistaken about courage, justice, cruelty, need, and practical reason. Her mature account of natural goodness compares human evaluation with judgments about living things: roots can be defective for an oak, wings for a bird, and practical reasoning for a human being. The comparison does not say that whatever occurs in nature is good, that statistics dictate virtue, or that biology supplies a moral rulebook. Human beings are rational, dependent, linguistic, and social; the contested question is how those facts bear on what counts as a defect or an excellence in action.',
      'Foot’s position developed rather than arriving as one unchanged system. Her early criticism of noncognitivism, her 1972 paper, and the rationalism of Natural Goodness need to be read in sequence. Virtues such as courage, justice, and benevolence are corrective excellences in a life marked by danger, scarcity, desire, promise, and mutual need. The familiar runaway trolley originated in her 1967 discussion of abortion and double effect, where it tested distinctions among intending harm, foreseeing harm, doing, and allowing. It was not a parlor game or a complete ethics, and it is not Judith Jarvis Thomson’s later family of trolley cases.',
      'The object is a 1939 group photograph of Somerville College graduates. The source record depicts Foot within the cohort but does not identify her position, so the exhibit does not pick out a particular face or claim secure individual likeness. It can show an institutional setting for a philosopher whose work was shaped among other Oxford women thinkers; it cannot show which argument any graduate accepted, what happened in a seminar, or why natural goodness succeeds. Its collective composition resists the heroic portrait. Foot’s philosophy asks whether practical reason can criticize a will that turns away from shared human goods.',
    ],
    [
      {heading: 'Natural goodness', items: [
        {label: 'Life-form judgment', description: 'Evaluation asks what counts as functioning well for a kind of living being, while human rationality makes moral evaluation distinctively complex.'},
        {label: 'Not “whatever is natural”', description: 'A fact can be common, biologically explicable, or inherited without being a reason to endorse it as good or just.'},
      ]},
      {heading: 'Virtue and reasons', items: [
        {label: 'Corrective excellences', description: 'Virtues answer characteristic human failures—fear, selfishness, indifference, and excess—within relationships of dependence and cooperation.'},
        {label: 'Practical rationality', description: 'Foot asks whether disregard for justice is merely a missing preference or a defect in how a person responds to reasons.'},
      ]},
      {heading: 'Read the cases accurately', items: [
        {label: 'Double effect', description: 'Foot’s original trolley comparison examines intended and foreseen harm inside a wider argument about abortion and permissibility.'},
        {label: 'A changing philosopher', description: 'Early essays, the hypothetical-imperatives paper, and Natural Goodness should not be made to say one timeless thing.'},
      ]},
    ],
    'moral-foot-somerville-1939',
    'This 1939 photograph by an unknown photographer shows Somerville College graduates posed in several rows. The Commons record identifies Philippa Foot as present but does not locate her in the group, so no individual face is designated. The image can establish a cohort and institutional setting; it cannot document Foot’s classroom conversations, settle her changing moral theory, or make a group affiliation into proof of philosophical agreement.',
    'fnv1a64:7448808038bfa201',
  ),
  'judith-thomson': objectLed(
    'Judith Jarvis Thomson',
    [
      'Judith Jarvis Thomson used spare cases to make moral assumptions answer for themselves. A dependent violinist, runaway trolley, innocent threat, or property claim can reveal distinctions hidden inside a quick verdict. In A Defense of Abortion, she grants fetal personhood for the sake of argument and asks what follows: a right to life, she contends, does not automatically include a right to use another person’s body. That conditional strategy does not settle the moral status of every abortion, pregnancy, responsibility, care relation, or legal policy. It changes the question from personhood alone to consent, bodily authority, positive duties, and the limits of what one person may demand from another.',
      'The same discipline shaped Thomson’s broader theory of rights. A right is not simply a good outcome or strong preference; it structures claims, duties, permissions, and the ways people may be wronged even when an outcome looks beneficial. Her trolley work develops Philippa Foot’s earlier driver case into variants that test agency, means, side effects, and redirecting harm. Thomson repeatedly revised her own conclusions, including a later reversal about Bystander at the Switch. Thought experiments are not polls of immediate intuition or machines that produce a theory. They are controlled comparisons that force a proposed principle to say why one altered feature should change an action’s moral status.',
      'The 2018 Wikimedia diagram is a simplified switch case: a tram approaches a choice between five figures and one. Made by McGeddon and adapted as a vector by Zapyon, it is not Thomson’s work, portrait, or a representation of a real emergency. It isolates numbers and tracks while omitting consent, history, uncertainty, bodily vulnerability, institutions, and almost every detail that actual moral conflict carries. The image can therefore introduce a method of comparison, not deliver its conclusion. It should send a visitor back to Thomson’s central demand for precision: who has a claim against whom, what is being imposed or withheld, and what makes an act permitted, required, generous, or wrong?',
    ],
    [
      {heading: 'Rights under pressure', items: [
        {label: 'A claim-right', description: 'A right can place a duty on someone else and identify a particular wrong, rather than merely adding one more benefit to a total.'},
        {label: 'Permission and decency', description: 'An action may be permitted yet ungenerous; Thomson’s ethics is wider than enforceable claims alone.'},
      ]},
      {heading: 'Bodily use and harm', items: [
        {label: 'The violinist argument', description: 'The 1971 essay conditionally grants personhood to test whether survival entails entitlement to another person’s bodily support.'},
        {label: 'Doing and allowing', description: 'Killing, letting die, redirecting harm, and withdrawing aid may differ, but no one simple active-versus-passive rule does all the work.'},
      ]},
      {heading: 'Cases as instruments', items: [
        {label: 'Change one feature', description: 'Varying consent, agency, intention, threat, or responsibility tests which principle genuinely explains a shifted judgment.'},
        {label: 'The trolley’s history', description: 'Foot introduced the original comparison; Thomson expanded and reconsidered it rather than treating one diagram as a settled tradition.'},
      ]},
    ],
    'moral-thomson-trolley-problem',
    'McGeddon’s trolley-problem diagram, adapted as a vector by Zapyon in 2018, shows a tram, switch, five figures, and one figure. It is a later explanatory diagram, not a work or portrait by Judith Jarvis Thomson. It can isolate a numerical choice for comparison, but it cannot establish her account of rights, reproduce the agency and background of any real emergency, or settle disputes about abortion, consent, self-defense, intention, and permissible harm.',
    'fnv1a64:fd468942e2c414e8',
  ),
  'derek-parfit': objectLed(
    'Derek Parfit',
    [
      'Derek Parfit made personal identity ethically unsettling. Ordinary thought often assumes that there must be a deep further fact about whether a future person is really me. Parfit separates that question from what matters in survival: psychological connectedness and continuity through memories, intentions, beliefs, character, and other relations. His term Relation R names those relations when they have the right cause. Teletransportation and branching cases are not technological predictions; they test whether identity can remain the sole explanation of why survival matters when two future people might each be psychologically continuous with one earlier person. Reductionism does not say persons are unreal or death is unimportant. It asks whether a person’s importance rests on more particular facts, rather than a separately existing ego.',
      'That move changes ethics across generations. The non-identity problem shows that choices about climate, health, reproduction, and institutions can affect which people exist, not merely how a fixed group fares. The Repugnant Conclusion exposes the pressure on population theories that total welfare can favor a vast population with lives barely worth living over a smaller, much better-off one. Parfit presents this as a problem, not a recommendation. In On What Matters, he later argues that revised Kantian, contractualist, and consequentialist approaches may converge in a Triple Theory, while defending objective reasons. The convergence project, aggregation, demandingness, embodiment, and normative truth remain heavily disputed.',
      'Bob Collowan’s 2013 photograph shows the facade and towers of All Souls College, Oxford, where Parfit was a fellow. It identifies an institutional place linked to a long philosophical career, but not Parfit himself, his office, a particular discussion, or the circumstances in which an argument was written. A college building cannot demonstrate Relation R, solve population ethics, or turn impersonal reason into a view without people. Its stone symmetry contrasts with Parfit’s thought experiments: philosophy may work through austere abstractions, yet its questions concern survival, future people, and how far the boundaries of a self should organize concern.',
    ],
    [
      {heading: 'What matters in survival?', items: [
        {label: 'Relation R', description: 'Psychological continuity and connectedness with the right causal origin may matter for survival even where strict numerical identity does not.'},
        {label: 'Branching', description: 'If two successors each stand in the relevant psychological relation to one earlier person, identity cannot simply do the explanatory work.'},
      ]},
      {heading: 'Future people', items: [
        {label: 'Non-identity', description: 'Choices can change who exists, challenging views that call an act bad only when it makes a particular person worse off.'},
        {label: 'Repugnant Conclusion', description: 'A demanding population-ethics problem created by rival judgments about total welfare, quality of life, and number—not Parfit’s preferred outcome.'},
      ]},
      {heading: 'Reasons and convergence', items: [
        {label: 'Objective reasons', description: 'Parfit argues that some considerations count in favor independently of desire or social approval, a position critics contest.'},
        {label: 'Triple Theory', description: 'His later proposal seeks convergence among revised Kantian, contractualist, and consequentialist principles without erasing their deep disagreements.'},
      ]},
    ],
    'moral-parfit-all-souls-college',
    'Bob Collowan’s 21 July 2013 photograph shows the facade of All Souls College, Oxford. Parfit was a fellow of the college, so the building locates a long institutional association without supplying a portrait. The modern exterior cannot depict his office or a seminar, establish how any text was composed, or settle his arguments about survival, future people, population ethics, objective reasons, or moral-theory convergence.',
    'fnv1a64:a53b9a85ddafca1d',
  ),
  'feminist-philosophy': objectLed(
    'Feminist Philosophy',
    [
      'Feminist philosophy is a plural field that asks how gendered power changes the philosophical problems people can see, the knowers they treat as credible, and the institutions they call just. It is not a single doctrine or a history of women added to an unchanged canon. Feminist arguments revise ideas of autonomy, knowledge, objectivity, embodiment, care, labor, violence, language, citizenship, and social reality by asking whose lives were silently treated as normal. Gender is never the only axis. Race, class, sexuality, disability, nationality, colonial history, and legal status alter how power is organized and experienced. The field holds liberal, socialist, existential, Black feminist, intersectional, care-ethical, poststructuralist, trans, disability, decolonial, Indigenous, and other projects in active disagreement.',
      'Its concepts are methods of reconstruction, not checklists. Intersectionality names the way single-axis legal and political models can hide interacting structures; it is not arithmetic applied to identities. Situated knowledge and standpoint theory make social location relevant to inquiry without giving anyone automatic infallibility or making evidence optional. Care ethics brings dependency and life-sustaining labor into view while refusing the claim that women are naturally caring. The Atlas uses Wollstonecraft’s 1792 Vindication as a major European landmark, not a universal origin, and treats the familiar wave story as a limited regional chronology. Genealogies of abolition, labor, colonialism, religion, sexuality, disability, and trans life demand more than one beginning.',
      'The object shows the opening of the 1913 woman suffrage procession in Washington, D.C.: marchers, a vote banner, a horse, a vehicle, crowd, and Capitol create an image of collective political action. It can document one historic event and foreground the public organization of a demand; it cannot stand for every woman, every feminist tradition, or a consensus about liberation. Racial exclusion and segregation within the procession are necessary to its interpretation, not a footnote outside it. The photograph stages the field’s critical practice. A movement’s visible unity can reveal a claim while also concealing who set its terms, whose labor made it possible, and who could not enter on equal footing.',
    ],
    [
      {heading: 'Questions that remake inquiry', items: [
        {label: 'Situated knowledge', description: 'Knowers work from social locations that shape questions, access, authority, and blind spots; stronger objectivity requires examining those conditions.'},
        {label: 'Intersectionality', description: 'Interacting structures of power can be obscured when law or theory treats race, gender, class, and other relations as separate tracks.'},
      ]},
      {heading: 'Genealogies, not one timeline', items: [
        {label: '1792 as a landmark', description: 'Wollstonecraft’s Vindication is an important European text, not the origin of feminism everywhere or for everyone.'},
        {label: 'The wave metaphor', description: 'Useful for a bounded U.S./European story, it can hide regional continuities, different movements, and struggles that did not fit its sequence.'},
      ]},
      {heading: 'Material political tests', items: [
        {label: 'Care and dependency', description: 'Care is necessary labor organized by institutions and unequal power, not a sentimental supplement to an independent individual.'},
        {label: 'Coalition', description: 'Solidarity can support shared action across difference without assuming identical identities, histories, interests, or final political answers.'},
      ]},
    ],
    'feminist-philosophy-procession',
    'This U.S. National Archives photograph records the opening of the Woman Suffrage Procession in Washington, D.C., in 1913. It shows a specific public action—marchers, a suffrage banner, crowd, vehicle, horse, and the Capitol—not a universal origin image for feminist philosophy. The photograph cannot represent every feminist tradition or participant’s view; racial exclusion and segregation within the event remain essential limits on what its visible unity can establish.',
    'fnv1a64:ce62328f3b7b663b',
  ),
  'judith-butler': objectLed(
    'Judith Butler',
    [
      'Judith Butler asks how social norms make some genders, bodies, desires, kinships, and lives recognizable while casting others as incoherent, impossible, or disposable. Gender performativity is often mistaken for a claim that anyone freely chooses a theatrical role each morning. Butler’s argument is more demanding: repeated acts, expectations, institutions, and recognitions produce the appearance of stable gender identity, usually under constraint rather than personal authorship. Because norms must be repeated, they can also be reiterated differently, interrupted, parodied, or exposed as contingent. Agency is neither outside power nor a fiction made impossible by it; it works within the unstable repetitions through which subjects become intelligible.',
      'Bodies That Matter responds to the claim that this account denies bodies. Butler does not invent flesh out of discourse. Bodies are material, vulnerable, and forceful, while medical, legal, linguistic, and social norms organize which bodies count as sexed, ordinary, legitimate, or protected. The later work moves beyond Gender Trouble’s genealogy to ethical opacity, recognition, livability, precarity, grievability, assembly, interdependency, war, and nonviolence. This trajectory matters because political categories can be necessary for organizing while also excluding people at their margins. Critics debate the prose, the adequacy of materiality, the durability of political categories, and the consequences of particular political judgments; none of those disputes licenses a slogan in place of the arguments.',
      'Andrew Rusk’s 2011 photograph shows Butler speaking at a public lecture. It is a lifetime image that establishes identity and a speaking setting, not a visual explanation of performativity or a verdict on a corpus that changes across decades. The lecture image can make public address and intellectual work visible, but it cannot tell us which norms structure recognition, whose life is grievable, or how an assembly acts. Its value lies in restraint. Butler’s philosophy asks visitors to look beyond a single speaker toward the norms, infrastructures, and collective acts that make speech, bodily presence, and political appearance possible for some people and precarious for others.',
    ],
    [
      {heading: 'Keep three claims separate', items: [
        {label: 'Performativity', description: 'Gender is produced through reiterative social practice under norms, not freely chosen theatrical self-invention.'},
        {label: 'Materialization', description: 'Bodies are real and vulnerable, while norms shape the classifications and conditions through which bodies become socially meaningful.'},
      ]},
      {heading: 'Recognition and livability', items: [
        {label: 'Intelligibility', description: 'Norms organize who can appear as a coherent subject, speaker, kin, or mourner; they enable and restrict at once.'},
        {label: 'Livable life', description: 'Recognition can sustain a person while demanding conformity, so political categories must be usable and open to revision.'},
      ]},
      {heading: 'Later political work', items: [
        {label: 'Grievability and precarity', description: 'Political frames distribute whose vulnerability is publicly recognized, protected, mourned, or treated as expendable.'},
        {label: 'Assembly', description: 'Bodies gathering in public make claims through dependency, infrastructure, persistence, and plurality, not only through spoken demands.'},
      ]},
    ],
    'feminist-butler-portrait',
    'Andrew Rusk’s 9 March 2011 photograph shows Judith Butler speaking at a public lecture. It is a lifetime photograph that identifies Butler and documents one speaking event. It cannot represent every phase of a changing corpus, show how performativity or materialization works, or decide debates over gender, recognition, precarity, assembly, interdependency, and Butler’s public political positions.',
    'fnv1a64:8531afa8ce4b6b74',
  ),
};
