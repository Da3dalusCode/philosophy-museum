import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';
import type {MuseumExhibitReview} from '../../editorial/exhibitReview';

type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

const standardReview = (lock: string): MuseumExhibitReview => ({
  status: 'standard-compliant',
  reviewedOn: '2026-08-09',
  method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.',
  lock,
});

const STANDARD_REVIEW_BY_NAME: Readonly<Record<string, MuseumExhibitReview>> = {
  'Maurice Merleau-Ponty': standardReview('fnv1a64:80681bc7e7b7a552'),
  'Emmanuel Levinas': standardReview('fnv1a64:c56cdd4003e222fb'),
  'Hans-Georg Gadamer': standardReview('fnv1a64:641b2c06ea41c38f'),
  'Bertrand Russell': standardReview('fnv1a64:bca8fcf167aa31ca'),
  'Gottlob Frege': standardReview('fnv1a64:c115071bc8ca04ca'),
  'G. E. Moore': standardReview('fnv1a64:5c3f9ecd95c2490f'),
  'W. V. O. Quine': standardReview('fnv1a64:42df89ae8020bda9'),
  'Elizabeth Anscombe': standardReview('fnv1a64:acbf548916e3996c'),
};

const primary = (
  name: string,
  paragraphs: readonly string[],
  orientation: readonly VisitorGuideSection[],
  assetId: MuseumAssetId,
  objectText: string,
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
  review: STANDARD_REVIEW_BY_NAME[name],
});

/**
 * Object-led primary interpretation for the phenomenology and analytic
 * installations. Claim review, exhibit review state, and deterministic locks
 * are integrated centrally rather than repeated in this authored surface.
 */
export const PHENOMENOLOGY_ANALYTIC_PRIMARY_INTERPRETATIONS:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  'merleau-ponty': primary(
    'Maurice Merleau-Ponty',
    [
      'Maurice Merleau-Ponty starts not with a mind inspecting inner pictures, but with a body already at work in a meaningful world. A hand reaches for a cup, a walker finds a route, and a speaker takes up a language before each act is mapped by detached thought. The lived body is therefore not merely an object among objects. Its body schema organizes posture, reach, orientation, and practical possibility; motor intentionality names this directed “I can.” Perception is neither a pile of sensations nor a private construction imposed on raw data. It is an open, skilled involvement with things that can surprise, resist, and be shared with others.',
      'Phenomenology of Perception makes this claim through space, habit, sexuality, expression, other people, and clinical material. The case known as Schneider can reveal capacities obscured by ordinary fluency, but it is not a conclusive experiment or a license to make a disabled person a mere philosophical symbol. Merleau-Ponty drew on psychology and neurology without reducing experience to their measurements. Scientific accounts remain valuable, yet their objects are encountered from within an already embodied field. This is why learning a gesture or inhabiting a room changes what appears possible: perception is historically and socially formed, while never becoming an invention of an isolated consciousness.',
      'His later work pushes beyond a simple subject–object divide. “Flesh” and “chiasm” describe the intertwining of perceiver and perceived, touching and touched, without naming literal tissue or a finished cosmic substance. Nature survives partly as edited lecture material, and The Visible and the Invisible was unfinished when he died; neither authorizes a completed late doctrine. The undated photograph presents Merleau-Ponty during his lifetime with hands in the foreground, but its photographer and original chain of custody remain unclear. It cannot display the lived body as a theory or establish a philosophical disposition from a pose. The image offers historical presence; embodied description does the interpretive work.',
    ],
    [
      {heading: 'Embodied orientation', items: [
        {label: 'Lived body', description: 'The body as a center of movement, sensation, and practical possibility, not simply the biological body measured from outside.'},
        {label: 'Body schema', description: 'The usually unthematized organization of posture, reach, and orientation that lets skilled action proceed without calculating every movement.'},
        {label: 'Motor intentionality', description: 'The bodily directedness expressed in an “I can,” where movement is already oriented toward a task or world.'},
      ]},
      {heading: 'How to read the later work', items: [
        {label: 'Flesh and chiasm', description: 'Terms for the intertwining of perceiver and perceived; they are not a biological theory, mystical fusion, or completed system.'},
        {label: 'Schneider case', description: 'A historical clinical case used in the argument, requiring care because a person’s life cannot be reduced to an illustrative deficit.'},
      ]},
    ],
    'merleau-ponty-portrait',
    'This undated lifetime photograph gives Merleau-Ponty historical presence, but its credited photographer and original chain of custody remain unclear. His visible posture and hands cannot demonstrate the lived body, motor intentionality, or the later account of flesh.',
  ),
  levinas: primary(
    'Emmanuel Levinas',
    [
      'Emmanuel Levinas asks whether philosophy begins too readily by making what is other intelligible within a total picture of what we already know. His answer begins with an encounter: another person is not first an item to classify, use, or absorb into my projects. The face names exposure, vulnerability, and address rather than a collection of visible features. It calls the self to responsibility before a freely chosen contract or a calculation of mutual advantage. This priority of ethics does not make Levinas a theorist of pleasant sympathy. The relation is asymmetrical and unsettling: I am answerable to another person in a way no description of their qualities can exhaust.',
      'Totality and Infinity develops this challenge through desire, hospitality, language, separation, and infinity. Otherwise than Being sharpens it through Saying and Said: the Saying is the exposure of address and response, while the Said is the fixed content, concept, or institution needed to communicate and judge. Neither term licenses escaping ordinary language or law. The third party introduces comparison, justice, institutions, and public accountability, so responsibility for one cannot simply ignore responsibilities to many. “Substitution” is likewise not voluntary empathy or ordinary causal blame. It names an extreme vocabulary for being answerable, whose adequacy and political consequences remain contested.',
      'Levinas’s philosophical writing and Jewish writings are related but cannot be casually fused into one undifferentiated doctrine. Critics question whether asymmetry, gendered language, and the passage to justice adequately meet political violence and reciprocal relations. Bracha L. Ettinger’s 1991 lifetime portrait shows Levinas indoors, speaking with his hands. It is a recognizable historical photograph, not a visual illustration of the face: physiognomy is precisely not what the term means here. Nor can a photographed conversational moment prove that ethical responsibility precedes theory. The portrait gives a person to encounter; the difficult distinction between ethical address, institutional justice, and representation remains a task for readers.',
    ],
    [
      {heading: 'Ethical encounter', items: [
        {label: 'Face', description: 'The exposed, addressing presence of another person, not their facial appearance, character profile, or a demand for visual empathy.'},
        {label: 'Responsibility', description: 'An ethical answerability that is prior to chosen agreement; it is not ordinary legal blame or a claim that one person controls every outcome.'},
        {label: 'Infinity', description: 'The other’s irreducibility to a total concept, not a numerical quantity or a mystical object beyond all thought.'},
      ]},
      {heading: 'Language and justice', items: [
        {label: 'Saying and Said', description: 'The living exposure of address and the fixed contents needed for concepts, communication, law, and judgment.'},
        {label: 'Third party', description: 'The presence of others beyond the immediate encounter, introducing comparison, institutions, and the demands of justice.'},
      ]},
    ],
    'levinas-ettinger-portrait-1991',
    'Bracha L. Ettinger’s 1991 lifetime photograph records Levinas speaking indoors. It establishes late-life identity context, but the visible face cannot be treated as physiognomic evidence for his ethical “face,” responsibility, or account of infinity.',
  ),
  gadamer: primary(
    'Hans-Georg Gadamer',
    [
      'Hans-Georg Gadamer treats understanding as an event that occurs within language, history, and an encounter with a question. We do not begin from nowhere: inherited practices, terms, expectations, and questions shape what appears plausible. He calls this historically effected consciousness. Prejudgment, or Vorurteil, therefore does not mean every bias is justified. It names fore-judgments that must be tested, revised, and sometimes exposed as distorting. Tradition and authority can preserve insight, but neither replaces argument. Interpretation works through a hermeneutic circle in which a sense guides reading and is altered as the text, artwork, law, or conversation pushes back.',
      'Truth and Method objects to treating method as the sole model of truth, especially in art and the human sciences. It does not reject disciplined inquiry or provide a manual that guarantees correct interpretation. Understanding includes application: to understand a law, historical work, or claim is also to ask how it bears on the present situation. A fusion of horizons is not a merger into consensus or a claim that every disagreement disappears. Dialogue remains answerable to the Sache, the matter at issue, rather than merely exchanging private impressions. Gadamer’s accounts of play and language make understanding participatory and finite, not a relativist prison in which no claim can be challenged.',
      'That openness also faces political and historical pressure. Gadamer’s university career under National Socialism requires scrutiny without casting him simply as either an uncomplicated ideologue or a resistance figure; hermeneutical dialogue does not settle that judgment. Habermas argues that tradition can conceal ideology, while Gadamer insists that reflection itself remains situated. Derrida presses further questions about alterity and closure. Ruuskanen’s c. 2000 photograph shows the elderly Gadamer outdoors with an open book, a fitting but limited image of reading. It cannot demonstrate hermeneutic understanding, prove a theory of dialogue, or resolve his political record. The exhibit asks visitors to let a text answer back rather than make a photograph certify openness.',
    ],
    [
      {heading: 'Interpretive situation', items: [
        {label: 'Prejudgment', description: 'A prior expectation or judgment that makes understanding possible but can be tested, corrected, and shown to be distorting.'},
        {label: 'Historically effected consciousness', description: 'Awareness that interpretation is shaped by an ongoing history whose effects include language, institutions, and inherited questions.'},
        {label: 'Hermeneutic circle', description: 'The movement between an anticipated whole and particular details, where each can revise the other rather than produce circular proof.'},
      ]},
      {heading: 'Understanding in practice', items: [
        {label: 'Fusion of horizons', description: 'A transformed shared perspective achieved through encounter, not guaranteed agreement, simple assimilation, or escape from history.'},
        {label: 'Application', description: 'The present bearing of what is understood; interpreting a text or law includes judging how its claim matters now.'},
        {label: 'Ideology critique', description: 'Habermas’s warning that inherited understanding can hide domination, a challenge Gadamer’s emphasis on dialogue must answer.'},
      ]},
    ],
    'gadamer-ruuskanen-portrait-2000',
    'Leena Ruuskanen’s c. 2000 lifetime photograph shows Gadamer outdoors reading an open book. It supplies identity and a material scene of reading, but it neither demonstrates hermeneutic openness nor settles his political record, method debate, or theory of dialogue.',
  ),
  russell: primary(
    'Bertrand Russell',
    [
      'Bertrand Russell repeatedly used logical analysis to ask what a sentence commits us to, but his long career is not one doctrine with a single result. In “On Denoting,” the theory of descriptions analyzes a major class of apparently referring phrases by showing how quantificational structure can avoid treating every grammatical noun phrase as a name. The proposal is not a universal recipe for language. Russell’s work with acquaintance and later logical atomism similarly seeks ways to connect knowledge, propositions, and the world, yet their scope and difficulties remain part of the story. Logic, for Russell, could clarify philosophical problems; it did not make history, ethics, or ordinary language disappear.',
      'With Alfred North Whitehead, Russell pursued logicism in Principia Mathematica: the hope that arithmetic could be derived from logical principles and definitions. Russell’s paradox had already shown a contradiction in unrestricted set-like assumptions, and the joint work uses ramified type theory and the axiom of reducibility to manage related dangers. This is an extraordinary technical project, not an uncomplicated proof that all mathematics has been reduced to logic. Its lasting importance includes formal methods and questions about foundations, while its original ambitions, axioms, and limits should not be silently converted into a final victory for logical analysis.',
      'Russell’s public life also changed over time: engagements with war, education, nuclear danger, and political authority require period-specific attention rather than one label such as pacifist or radical. His 1950 Nobel Prize was in Literature, recognizing writing as well as public intellectual work, not a prize for logic or peace. The 1894 studio photograph shows a young Russell early in his career; its photographer is unidentified and the public-domain status rests on an assumed term expiry. It gives neither a portrait of the later activist nor evidence for descriptions, logicism, or atomism. The exhibit keeps an early face beside a many-stage philosophical and public career.',
    ],
    [
      {heading: 'Logical analysis', items: [
        {label: 'Theory of descriptions', description: 'An analysis of many denoting phrases that reveals quantificational structure instead of assuming each phrase names an object.'},
        {label: 'Acquaintance', description: 'Russell’s changing account of direct awareness, central to parts of his epistemology but not a settled foundation for all knowledge.'},
        {label: 'Logical atomism', description: 'A later attempt to relate analysis, simple facts, and propositions; it is one phase of Russell’s development, not his permanent position.'},
      ]},
      {heading: 'Foundations and public life', items: [
        {label: 'Logicism', description: 'The project of deriving arithmetic from logic through definitions and proofs, pursued jointly with Whitehead and limited by demanding axioms.'},
        {label: 'Russell’s paradox', description: 'A contradiction generated by an unrestricted collection defined as the things not belonging to themselves, exposing a foundational problem.'},
        {label: 'Periodization', description: 'A way to keep Russell’s changing technical views and political commitments from being compressed into one timeless position.'},
      ]},
    ],
    'russell-portrait-1894',
    'This 1894 studio photograph shows Russell early in his career. Its photographer is unidentified and Commons records public-domain status by assumed term expiry; the image establishes only limited identity context, not his later logical theories, activism, or Nobel recognition.',
  ),
  frege: primary(
    'Gottlob Frege',
    [
      'Gottlob Frege sought an objective account of arithmetic and inference at a moment when traditional logic could not clearly represent multiple quantification, relations, and functional structure. His 1879 Begriffsschrift introduced a formal concept-script in which functions, arguments, variables, and quantifiers could make logical form explicit. Frege opposed psychologism: logical laws are not reports about how human beings happen to think. That stance does not make thought private or logic detached from language. It asks how judgments can be true or false independently of fluctuating associations, and why arithmetic should be established by proof rather than by an empirical psychology of counting.',
      'Logicism was Frege’s attempt to derive arithmetic from logic by defining numbers and proving the required laws. The project in Basic Laws of Arithmetic depended on Basic Law V, whose inconsistency was exposed through Russell’s paradox. The failure of that derivation is decisive for the original system, not a minor technical blemish. It does not erase Frege’s separate innovations in quantificational logic, anti-psychologism, and semantics, nor does it make him the uncontested sole inventor of modern logic. His importance is clearest where a powerful project, its internal collapse, and its surviving conceptual tools are all kept visible together.',
      '“On Sense and Reference” distinguishes the reference of an expression from its sense, the way that reference is presented. This helps explain why an identity statement may be informative even when two names pick out the same object. Frege’s accounts of thought, concept, and object remain difficult; the concept–object distinction carries a famous expressive tension and does not solve every problem about language. The displayed portrait is conventionally dated around 1879, but the anonymous photograph’s original source and precise date are weakly documented. It gives a likely lifetime identity image, not evidence for a theorem, the continuity of logicism, or a transparent image of formal thought.',
    ],
    [
      {heading: 'Logic and objectivity', items: [
        {label: 'Begriffsschrift', description: 'Frege’s 1879 formal language, designed to display logical structure through functions, arguments, variables, and quantifiers.'},
        {label: 'Anti-psychologism', description: 'The claim that logical validity does not rest on contingent facts about human mental habits or associations.'},
        {label: 'Logicism', description: 'The attempt to derive arithmetic from logic; its Basic Laws formulation fails because the system is inconsistent.'},
      ]},
      {heading: 'Language and meaning', items: [
        {label: 'Sense and reference', description: 'The distinction between an expression’s mode of presentation and the object it refers to, explaining informative identity claims.'},
        {label: 'Concept and object', description: 'Frege’s strict distinction between predicative concepts and objects, which creates a difficult problem when philosophy tries to state it.'},
        {label: 'Russell’s paradox', description: 'The contradiction that exposed inconsistency in Basic Law V and ended Frege’s original derivation of arithmetic.'},
      ]},
    ],
    'frege-portrait',
    'This anonymous portrait is conventionally dated to about 1879, but its photographer, exact date, and original source are not securely recorded. It offers limited lifetime identity context and cannot establish Frege’s notation, anti-psychologism, logicism, or the meaning of sense and reference.',
  ),
  'g-e-moore': primary(
    'G. E. Moore',
    [
      'G. E. Moore helped make careful analysis, plain examples, and resistance to grand idealist claims central to early analytic philosophy. In “The Refutation of Idealism,” he challenges the easy inference from the fact that experience is experienced to the conclusion that everything experienced is mental. His later appeals to common sense and his proof of an external world insist that philosophy should not discard ordinary knowledge without explaining what went wrong. Raising two hands is meant to make an ordinary claim conspicuous, not to magic away the skeptic’s question of how its premises are known. The argument’s force remains contested, which is part of its philosophical value.',
      'In Principia Ethica, Moore asks what “good” means and warns against defining it simply as a natural property such as pleasure, desire-satisfaction, or evolutionary fitness. The naturalistic fallacy names a problem in such attempted definitions; it is not a label for every inference from facts to values. His open-question argument asks why, after a proposed definition of good, it can still seem intelligible to ask whether the defined property really is good. The argument was enormously influential, but it does not settle non-naturalism beyond dispute. Moore’s ethics also includes ideal consequentialism and organic unities, so “intuitionist” alone obscures the relation between metaethics and normative judgment.',
      'Moore’s style makes philosophy look simple only after distinctions have been made. Ordinary belief, analysis, intrinsic value, and proof pull in different directions and invite continued criticism. Ray Strachey’s 1914 photograph, cropped from a group portrait with Oliver Strachey and John Maynard Keynes, shows Moore outdoors with a pipe. It is valuable Cambridge-period identity context, not a record of a seminar, a proof, or an argument about goodness. The crop cannot settle skepticism, establish the open-question argument, or license a nostalgia for unexamined “common sense.” The exhibit treats plain examples as invitations to examine what a claim means and how it is known.',
    ],
    [
      {heading: 'Analysis and the external world', items: [
        {label: 'Idealism', description: 'The broad view Moore criticized when it treats reality as inseparable from experience or mind; his target should not be reduced to one slogan.'},
        {label: 'Common sense', description: 'Ordinary beliefs philosophy should not discard casually, not a guarantee that first appearances are theory-free or beyond criticism.'},
        {label: 'Proof of an external world', description: 'Moore’s hand-raising argument, which displays an ordinary premise while leaving open disputes about whether and how it is known.'},
      ]},
      {heading: 'Goodness and value', items: [
        {label: 'Naturalistic fallacy', description: 'Moore’s objection to defining good by a natural property, not a ban on reasoning from facts to ethical conclusions.'},
        {label: 'Open-question argument', description: 'The test of whether a proposed definition leaves it intelligible to ask whether that property is genuinely good; it remains contested.'},
        {label: 'Organic unity', description: 'The claim that the value of a whole need not equal the simple sum of the values of its parts.'},
      ]},
    ],
    'moore-portrait-1914',
    'Ray Strachey’s 1914 lifetime photograph is cropped from a group portrait of Moore, Oliver Strachey, and John Maynard Keynes. It provides Cambridge-period identity context, but neither the pipe nor the outdoor pose proves Moore’s common-sense arguments, metaethics, or normative conclusions.',
  ),
  quine: primary(
    'W. V. O. Quine',
    [
      'W. V. O. Quine challenged the picture in which truths of meaning sit securely apart from truths of fact and each empirical statement receives its own confirming experience. “Two Dogmas of Empiricism” attacks leading explanations of analyticity and reductionism, often because they appeal to nearby notions without independently explaining them. The result is not a formal proof that no constrained analytic distinction can ever be drawn. It is a demand to explain the distinction without circularity. Beliefs confront experience as an interconnected web, but the web is not perfectly even: observation sentences and deeply entrenched theoretical commitments face revision differently and at different cost.',
      'Quine extends this holism into questions of ontology, translation, and naturalized epistemology. To ask what a regimented theory says exists is to look at what values its bound variables must range over; this is a criterion for reading commitments, not a complete ontology produced by counting nouns. Indeterminacy of translation concerns the possibility that equally behaviorally adequate translation manuals diverge, not ordinary ambiguity or the practical impossibility of learning another language. Naturalized epistemology studies how sensory input and scientific theory actually relate from within inquiry. Whether that move leaves room for justification and normativity remains a live dispute rather than a simple replacement of philosophy by science.',
      'Quine’s exchanges with Rudolf Carnap make the stakes sharper: Carnap preserves a role for choosing frameworks; Quine treats choices as continuous with total theory. Neither position is captured by a slogan about conventions or facts. Maryclaire Quine’s 1980 color family photograph shows Quine aboard Bluenose II in Halifax Harbour; the scan has recorded color and level adjustments. It supplies a late-life identity context, not a diagram of belief revision or evidence about language users. A boat, like a web, can tempt an image into doing explanatory work it cannot do. The philosophical task is to ask what evidence determines, what theory contributes, and where revision has its costs.',
    ],
    [
      {heading: 'Experience and theory', items: [
        {label: 'Analyticity', description: 'The proposed distinction between truths of meaning and truths of fact that Quine argues requires a non-circular explanation.'},
        {label: 'Web of belief', description: 'An interconnected system in which experience can prompt revision at many points, although some beliefs are more entrenched than others.'},
        {label: 'Reductionism', description: 'The idea that each meaningful statement can be tied to its own confirming experiences, which Quine challenges alongside analyticity.'},
      ]},
      {heading: 'Meaning, existence, and method', items: [
        {label: 'Indeterminacy of translation', description: 'The possibility of different translation manuals fitting all available behavior, distinct from everyday vagueness or simple ambiguity.'},
        {label: 'Ontological commitment', description: 'What a carefully regimented theory must quantify over, not a ready-made list of everything that exists.'},
        {label: 'Naturalized epistemology', description: 'The study of knowing within empirical inquiry, raising a continuing question about what becomes of normative justification.'},
      ]},
    ],
    'quine-portrait',
    'Maryclaire Quine’s 1980 family photograph shows Quine aboard Bluenose II in Halifax Harbour; the Commons scan records color and level adjustments. It provides late-life identity context, but neither the vessel nor the image can demonstrate holism, translation indeterminacy, ontology, or naturalized epistemology.',
  ),
  anscombe: primary(
    'Elizabeth Anscombe',
    [
      'Elizabeth Anscombe changes the question of intention from “what inner event caused this movement?” to “under what description is this person intentionally acting?” In Intention, a distinctive sense of “Why?” can reveal reasons, ends, ignorance, or the practical intelligibility of an action. The same movement may be moving an arm, pumping water, replenishing a supply, or producing an unanticipated harm. An agent can intentionally do some of these without intentionally doing all of them. Intention is therefore neither a private object hidden behind behavior nor a label automatically attached to every consequence. It belongs to how action, reasons, circumstances, and descriptions hang together in practice.',
      'Practical knowledge names an agent’s non-observational knowledge of what they are doing while acting. It is productive in a qualified sense: an error can call for correction in the action rather than in a detached report. That does not make agents infallible, immune to self-deception, or fully aware of every result. Anscombe’s account invites close attention to failure, mistaken circumstances, and foreseen side effects. Her challenge to consequentialism likewise does not say consequences never matter. It rejects treating every act-type as available as a means once projected totals look favorable. Modern Moral Philosophy helped redirect discussion toward moral psychology and virtue, but it is not itself a complete virtue theory and does not make Anscombe virtue ethics’ sole founder.',
      'Her work engages Wittgenstein, Aristotle, Aquinas, causation, religion, controversy, and war. Her translation and literary executorship of Wittgenstein matter, but do not reduce her action theory to his method. Her opposition to honoring Truman concerned intentional killing of noncombatants, not pacifism; her Catholic commitments and contested conclusions need neither sanitizing nor dismissal by association. The displayed portrait is a 2026 restyling of a posthumous 2014 illustration. It is not a documentary photograph or authenticated likeness, and its composed face cannot show intention, practical knowledge, or moral seriousness. The object signals reception; its action questions remain open.',
    ],
    [
      {heading: 'Action and knowledge', items: [
        {label: 'Action under a description', description: 'A bodily event can be intentional under some descriptions and not others, depending on the agent’s reasons, knowledge, and practical aim.'},
        {label: 'The question “Why?”', description: 'A diagnostic question whose applicable sense can reveal the practical reasoning through which an action is intelligible.'},
        {label: 'Practical knowledge', description: 'Non-observational knowledge expressed in intentional action; it guides performance but can fail through error or circumstance.'},
      ]},
      {heading: 'Ethics and intellectual context', items: [
        {label: 'Consequentialism', description: 'A term Anscombe helped make prominent for views that allow projected totals to override prohibitions on certain intentional acts.'},
        {label: 'Modern Moral Philosophy', description: 'Her provocative critique of modern obligation language and consequentialism, influential for virtue ethics but not a complete virtue theory.'},
        {label: 'Wittgenstein', description: 'Teacher, interlocutor, translator, and literary estate connection whose importance does not erase Anscombe’s independent philosophy.'},
      ]},
    ],
    'anscombe-portrait-interpretive',
    'This 2026 charcoal-and-sepia rendering substantially restyles a posthumous 2014 illustration of Anscombe. It is neither a documentary photograph nor an independently authenticated likeness, and its composed face cannot establish her action theory, ethics, Catholic commitments, or relation to Wittgenstein.',
  ),
};
