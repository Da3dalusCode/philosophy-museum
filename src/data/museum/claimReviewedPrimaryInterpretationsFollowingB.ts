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
  plaqueSubtitleLines: 1 | 2 | 3 | 4 = 4,
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
    plaqueSubtitleLines,
  },
  objectInterpretations: {[assetId]: objectText},
  review: {
    status: 'standard-compliant',
    reviewedOn: '2026-08-10',
    method: 'Reconciled separately against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.',
    lock,
  },
});

/**
 * Object-led conversions for the following claim-reviewed canonical primaries.
 * These focused Museum readings complement, rather than abridge, the full
 * sourced canonical articles.
 */
export const CLAIM_REVIEWED_PRIMARY_INTERPRETATIONS_FOLLOWING_B:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  husserl: objectLed(
    'Husserl',
    [
      'Husserl made intentionality—the directedness of consciousness toward something—a starting point for a new kind of philosophical description. In the Logical Investigations, he resisted psychologism: logical validity is not a report about how minds happen to associate ideas. But he did not replace empirical psychology with an inventory of private inner objects. Perceiving, remembering, judging, imagining, and valuing are ways in which a world is given. Phenomenology asks how those relations work before a theory reduces them to brain events, physical causes, or subjective impressions. Its aim is disciplined description, not a report of a solitary observer’s feelings.',
      'The epoché and reduction make that discipline more demanding. Suspending ordinary assumptions about what exists does not deny the world; it redirects attention to the meaningful correlation between experience and what is experienced. Husserl repeatedly reworked this project through transcendental, genetic, intersubjective, and historical analyses. His late account of the lifeworld asks how science depends on a shared practical world even when it abstracts from it. Antisemitic Nazi measures restricted his academic standing and public presence in his final years. The rescued Nachlass is indispensable evidence, but its manuscripts and posthumous editions do not yield one finished doctrine that editors merely recovered.',
      'This 1910s photograph gives a face to a thinker at the period of the transcendental turn, but its author is unknown and its immediate chain runs through a Getty/Mondadori reproduction. It can support a limited identity and period connection; it cannot picture intentionality, show a reduction being performed, or decide whether Husserl was a realist, idealist, or something prior to that opposition. Nor can a serious expression certify rigor. The portrait is most useful when it interrupts the temptation to make philosophy psychological biography. Visitors should return from a visible person to the changing arguments, research practices, political vulnerability, and unfinished archive through which phenomenology became a durable but contested project.',
    ],
    [
      {heading: 'How phenomenology begins', items: [
        {label: 'Intentionality', description: 'Consciousness is always directed toward something—an object, possibility, memory, value, or imagined scene—rather than sealed inside itself.'},
        {label: 'Anti-psychologism', description: 'Logical validity is not explained by contingent mental habits; this leaves room to study experience without reducing logic to psychology.'},
      ]},
      {heading: 'A changing method', items: [
        {label: 'Epoché and reduction', description: 'A suspension of ordinary existential commitment that examines how things are given, not disbelief in the world or a retreat from practical life.'},
        {label: 'Lifeworld', description: 'The shared, embodied background of practice and meaning that scientific abstraction presupposes without exhausting.'},
      ]},
      {heading: 'Read the record carefully', items: [
        {label: 'Nachlass', description: 'The rescued manuscripts and lectures greatly extend the record, yet their unfinished and posthumous form prevents treating them as one final book.'},
        {label: 'Nazi restrictions', description: 'Antisemitic policy damaged Husserl’s academic standing and public presence; this historical pressure belongs beside, not outside, the late work.'},
      ]},
    ],
    'husserl-portrait',
    'This 1910s lifetime photograph identifies Edmund Husserl, but its photographer is unknown and its immediate source is a Getty/Mondadori reproduction. It can establish only limited identity and period context. A portrait cannot display intentionality, perform the reduction, settle the changing scope of Husserl’s method, or turn the recovered Nachlass into a completed philosophical system.',
    'fnv1a64:8ec83434cd16f333',
    3,
  ),
  heidegger: objectLed(
    'Heidegger',
    [
      'Heidegger reopens the question of being by starting from Dasein, existence for whom being is an issue. Being and Time does not offer a psychology of personality. It asks how a world is already meaningful in practical involvement: tools refer to tasks, other people, and possibilities in a shared situation. Being-in-the-world resists the picture of an isolated mind first confronting external objects. Care names the structure in which thrown conditions, projects, moods, understanding, and concern with others belong together. Authenticity is not private heroic self-invention; it concerns taking up inherited possibilities rather than drifting with what “one” does.',
      'Finitude, death, and temporality give this analysis urgency, but the published book remains unfinished. Heidegger later shifted emphasis toward the history of being, art, language, and technology; “enframing” names a historically powerful way in which entities can appear as resources, not a blanket rejection of devices or a policy program. The political record cannot be quarantined as irrelevant biography. He joined the Nazi Party, served as Freiburg rector in 1933–34, and the Black Notebooks contain antisemitic passages. Those facts require inquiry into connections among philosophical vocabulary, historical judgment, and politics without licensing the opposite shortcut that every phenomenological description is simply Nazi ideology. The tensions remain interpretive and moral work for readers.',
      'Willy Pragher’s 10 May 1960 photograph is a cropped detail from a Hausen ceremonial group image, showing Heidegger seated among other attendees after the war. It documents a late public appearance and the visual afterlife of an internationally known philosopher; it cannot visualize being, care, authenticity, or the history of being. Nor does an attentive pose disclose remorse, political judgment, or the relation of any concept to National Socialism. The photograph’s group setting is a better prompt than a solitary genius portrait: ideas travelled through institutions, audiences, publication, silence, and controversy. Visitors should hold the thinker’s lasting influence alongside the historical evidence that makes an aesthetically neutral encounter impossible.',
    ],
    [
      {heading: 'Existence in a world', items: [
        {label: 'Being-in-the-world', description: 'Practical involvement with tools, tasks, others, and possibilities, not a private subject attempting to infer an outside world.'},
        {label: 'Care', description: 'The interconnected structure of thrown conditions, projects, moods, understanding, and concern with others that shapes Dasein’s existence.'},
        {label: 'Authenticity', description: 'Owning an inherited possibility rather than simply conforming to anonymous public expectations; it is not isolation, superiority, or moral innocence.'},
      ]},
      {heading: 'Later work and its limits', items: [
        {label: 'Enframing', description: 'A way modern technology can reveal entities as ordered resources; it is neither a technical manual nor a command to reject every device.'},
        {label: 'Unfinished book', description: 'Being and Time stops before its projected second division, so it cannot be treated as a complete closed system.'},
      ]},
      {heading: 'Political accountability', items: [
        {label: 'Rectorship and party membership', description: 'Heidegger’s 1933–34 rectorate and Nazi Party membership make political responsibility part of interpretation, not a detachable footnote.'},
        {label: 'Black Notebooks', description: 'Published notebooks containing antisemitic passages that demand direct scrutiny while not automatically resolving every philosophy–politics relation.'},
      ]},
    ],
    'heidegger-pragher-portrait-1960',
    'Willy Pragher’s 10 May 1960 photograph is a cropped detail from a Hausen ceremonial group image, held by the Landesarchiv Baden-Württemberg. It establishes Heidegger’s late public presence, not a doctrine, private disposition, repentance, or a visual answer to the relation between his philosophy, Nazism, and antisemitism.',
    'fnv1a64:164e7f41c2af9215',
    3,
  ),
  sartre: objectLed(
    'Jean-Paul Sartre',
    [
      'Jean-Paul Sartre treats consciousness as intentional and unable to become a thing with a fixed essence. In Being and Nothingness, the for-itself is not a supernatural free will floating above body or history. It exists through facticity: a body, past, social position, language, other people, and material circumstances it did not choose. Freedom names the task of taking a position within conditions, not power to obtain anything. Sartre’s vocabulary of nothingness describes the gap through which a person can negate, imagine, and project possibilities instead of coinciding with facts.',
      'Bad faith names an unstable attempt to evade that responsibility by treating oneself as only a fixed thing or only unrestricted choice. It is not merely ordinary lying, nor an unconscious mechanism that cancels agency. The look of another person makes a self appear as an object in someone else’s world, opening conflict and a problem of recognition. Sartre’s later political writing changes the scale of analysis. The Critique of Dialectical Reason considers scarcity, institutions, groups, serial relations, and historical praxis; it neither abandons the earlier work nor lets individual freedom explain oppression. Beauvoir was an independent philosophical interlocutor whose account of situated freedom exposes limits in Sartrean individualism.',
      'The displayed image is a 12 July 1965 black-and-white Anefo photograph whose report context is not recorded in the available item description. Its worn mounting and cropped press-image appearance make it a material trace of media circulation, not a window into Sartre’s interior life. It cannot demonstrate bad faith, show the look, settle a changing relation to Marxism, or certify anticolonial judgment. That restraint matters because Sartre’s political commitments included sustained opposition to colonial domination and torture alongside serious errors concerning violence and repression, including the rhetoric of his Fanon preface. A public image should lead visitors back to the hard question his work cannot avoid: how can responsibility remain real when action is conditioned by other people, institutions, scarcity, and history?',
    ],
    [
      {heading: 'Freedom under conditions', items: [
        {label: 'Facticity', description: 'The body, past, social situation, language, and material conditions that a person does not choose but must take up in acting.'},
        {label: 'For-itself', description: 'Sartre’s term for consciousness as a relation to possibilities and negation, not a hidden substance or a magical faculty outside the world.'},
        {label: 'Bad faith', description: 'An evasive self-interpretation that treats a person as only a fixed role or only pure freedom; it is not simply lying to someone else.'},
      ]},
      {heading: 'Others and history', items: [
        {label: 'The look', description: 'The experience of appearing in another person’s world, which complicates self-understanding without proving that every relation must be domination.'},
        {label: 'Praxis and scarcity', description: 'Later tools for examining how collective action, institutions, and material limits shape freedom beyond an isolated individual.'},
      ]},
      {heading: 'A changing political life', items: [
        {label: 'Anticolonialism', description: 'A sustained opposition to colonial domination and torture that must be read beside Sartre’s failures of judgment about violence and repression.'},
        {label: 'Beauvoir', description: 'An independent philosopher whose work on ambiguity, embodiment, and oppression is not an application or derivative footnote to Sartre.'},
      ]},
    ],
    'sartre-anefo-1965',
    'This 12 July 1965 image is an Anefo black-and-white negative of Jean-Paul Sartre, held by the Nationaal Archief as item 917-9600; its report series is recorded as unknown. It establishes a lifetime media image, not his inner freedom, bad faith, philosophical development, political judgment, or relationship with Beauvoir.',
    'fnv1a64:9e6bc2819b3e1e5b',
  ),
  camus: objectLed(
    'Albert Camus',
    [
      'Albert Camus begins from the absurd: not a property of the universe, but the collision between a human demand for intelligibility and a world without a final answer. The Myth of Sisyphus asks whether that collision makes suicide rational, and rejects self-destruction and philosophical escape into a consoling guarantee. Lucidity means remaining with the problem without pretending it has vanished. It is not nihilism or proof that nothing matters. Camus uses essays, novels, plays, journalism, and notebooks differently, so Meursault, Sisyphus, and a public essay should not be compressed into one speaker delivering a system. He rejected the existentialist label, despite productive comparison with existentialism.',
      'Revolt turns this diagnosis outward. To rebel is to refuse humiliation while discovering a limit and a value shared with others; it is not a license for unlimited violence in the name of a future good. In The Rebel, Camus criticizes political projects that make murder historically necessary, a position that put him in conflict with Sartre and communist intellectuals. Critics dispute its history, treatment of revolution, and confidence in “measure.” The Plague connects disease, separation, ordinary work, and solidarity, while its colonial Oran marginalizes Arab Algerian lives and cannot be reduced to a Resistance allegory or innocent universal setting.',
      'United Press International’s 1957 portrait shows Camus at a desk with a cigarette and was collected in the New York World-Telegram and the Sun Newspaper Photograph Collection. It is a public-author image from his Nobel year, but it cannot make celebrity evidence of philosophical clarity, reveal a literary character’s meaning, or resolve a colonial political position. Camus was born into French settler Algeria, reported colonial poverty, sought a civilian truce during the Algerian War, and did not endorse independence. His concern for civilian life did not adequately confront colonial structure or the political claims of colonized Algerians. The exhibit keeps that contradiction beside lucid solidarity rather than making Camus a moral mascot or one-word dismissal.',
    ],
    [
      {heading: 'Living without a final guarantee', items: [
        {label: 'The absurd', description: 'The relation between a human desire for ultimate intelligibility and a world that supplies no final answer, not a theorem that life is meaningless.'},
        {label: 'Lucidity', description: 'Staying answerable to the problem without suicide or consoling escape; it does not mean resignation, emotional numbness, or a self-help slogan.'},
      ]},
      {heading: 'Revolt and limit', items: [
        {label: 'Revolt', description: 'A refusal of degradation that affirms a shared claim and a limit, rather than permission to purify the world through unlimited violence.'},
        {label: 'Measure', description: 'Camus’s contested language for political restraint and proportion, especially when future justice is used to excuse present killing.'},
      ]},
      {heading: 'Colonial contradiction', items: [
        {label: 'French Algeria', description: 'The settler-colonial setting that shaped Camus’s life and work; it cannot be background scenery for a universal dilemma.'},
        {label: 'Civilian truce', description: 'Camus’s appeal to protect civilians during the Algerian War, which did not adequately meet anticolonial self-determination or structural violence.'},
      ]},
    ],
    'camus-loc-1957',
    'This 1957 United Press International photograph, held by the Library of Congress in the New York World-Telegram and the Sun Newspaper Photograph Collection, shows Albert Camus at a desk with a cigarette. It establishes a Nobel-year public image, not the absurd, the meaning of a novel, political innocence, or a resolution of Camus’s colonial contradictions.',
    'fnv1a64:854dcd070007f814',
  ),
  wittgenstein: objectLed(
    'Ludwig Wittgenstein',
    [
      'Ludwig Wittgenstein’s work changes philosophical method without yielding one ready-made “Wittgensteinian” doctrine. The Tractatus investigates how propositions can picture facts through logical form and presses a distinction between what can be said and what can only be shown. Its numbered propositions are austere, but its treatment of ethics, value, and the book’s own elucidations resists a simple positivist reading. Logic does not become a mirror held up by a private spectator; it marks conditions for meaningful representation. The Tractatus was Wittgenstein’s only book-length philosophical publication during his lifetime, preventing it from being the final statement of every later concern.',
      'The later writings move from one ideal logical form to the many activities in which words are used. Language-games, forms of life, family resemblance, rule-following, sensation, and certainty examine how practices give words their roles. “Meaning is use” is not a universal one-line theory, and a language-game is not an arbitrary personal game beyond criticism. Rule-following asks how a sign can guide further action without a private interpretation fixing every case; public criteria, training, agreement in practices, and disagreement all matter. Readers still dispute the continuity between early and later work, the scope of therapeutic method, and whether the later corpus sustains a social, individual, or plural account of these questions.',
      'Moritz Nähr’s 1930 studio portrait, held by the Austrian National Library as Pf 42.805:C (1), gives a dated lifetime likeness but no view of an argument. It cannot show logical form, determine what a word means, or decide whether the early and later writings form a break. The corpus itself requires comparable caution. Philosophical Investigations was prepared from repeatedly revised manuscripts and published posthumously in 1953 by G. E. M. Anscombe and Rush Rhees; later editions reconsidered material once called Part II, now commonly Philosophy of Psychology—A Fragment. The photograph gives a recognizable person, while the manuscript history warns against turning that person’s authority into one author-fixed final system.',
    ],
    [
      {heading: 'The early inquiry', items: [
        {label: 'Logical form', description: 'The structure through which a proposition can represent a possible fact; it is not a hidden object visible behind every sentence.'},
        {label: 'Saying and showing', description: 'The Tractatus distinction between what propositions can state and what its account treats as displayed in their use or logical form.'},
      ]},
      {heading: 'The later investigation', items: [
        {label: 'Language-games', description: 'Diverse human activities in which words have roles; they resist the demand that all language share one ideal logical model.'},
        {label: 'Rule-following', description: 'The problem of how a sign guides further action, where training and public practice matter without mechanically fixing every new case.'},
        {label: 'Hinge commitments', description: 'Background certainties explored in On Certainty that make doubt and inquiry possible, not empirical hypotheses quietly awaiting proof.'},
      ]},
      {heading: 'A mediated corpus', items: [
        {label: 'Philosophical Investigations', description: 'A posthumous 1953 edition assembled from prepared but unpublished materials, indispensable for readers yet not an author-issued final system.'},
        {label: 'Part II / Fragment', description: 'Material formerly printed as Part II and later titled Philosophy of Psychology—A Fragment, showing why editorial history changes interpretation.'},
      ]},
    ],
    'wittgenstein-naehr-1930',
    'Moritz Nähr’s 1930 lifetime studio portrait of Ludwig Wittgenstein is held by the Austrian National Library as Pf 42.805:C (1). It identifies a historical person but cannot display logical form, decide the early–later relation, establish what language-games mean, or make posthumously edited manuscripts an author-fixed final doctrine.',
    'fnv1a64:3610a535e8a1f12a',
    3,
  ),
  beauvoir: objectLed(
    'Simone de Beauvoir',
    [
      'Simone de Beauvoir develops an original philosophy of ambiguity: human beings are at once factical and transcending, embodied and capable of projecting beyond what they have been made to be. A body, history, economic dependence, institutions, and the regard of others shape practical possibilities. In The Ethics of Ambiguity, freedom becomes ethically demanding because one person’s projects unfold in a shared world. To will one’s own freedom consistently means willing conditions in which other people can act as well. Beauvoir is often introduced as Sartre’s companion, but that reverses an intellectual relation between independent thinkers and misses how her account of reciprocity corrects an abstract individualism.',
      'The Second Sex turns this framework toward the social production of woman as Other. Beauvoir draws on philosophy, biology, psychoanalysis, history, literature, and lived situation to show how a dominant group can pass itself off as the neutral human norm. Bodies are real, yet anatomy does not dictate a social destiny; femininity is shaped through institutions, myths, labor, desire, and repeated expectations. “Becoming” is a historical and material process, not a performance chosen at will. Oppression does more than limit a menu of options: it can block education, work, bodily autonomy, public recognition, and futures that make a project practicable. This is why liberation needs collective and material transformation as well as individual refusal.',
      'The 1955 Xinhua photograph shows Beauvoir at a Beijing anniversary ceremony, also attended by Sartre. It establishes a dated public presence, but not the meaning of her visit, a theory of China, or later feminist philosophy. The work itself needs critical reading. The unabridged Borde–Malovany-Chevallier translation restored passages omitted in the earlier English version, while generalizations about race, class, colonialism, sexuality, and reproductive embodiment remain open to criticism. Biographical evidence raises serious questions about consent, age, and institutional authority. A philosophy of reciprocal freedom is not insulated from asymmetries its author recognized and failed to confront.',
    ],
    [
      {heading: 'Situated freedom', items: [
        {label: 'Ambiguity', description: 'The condition of being both shaped by facts and able to project possibilities; it rejects both fixed destiny and fantasy of unlimited choice.'},
        {label: 'Reciprocal freedom', description: 'An ethical demand to seek conditions in which others can act, not a private right to pursue one’s project regardless of their situation.'},
      ]},
      {heading: 'How oppression works', items: [
        {label: 'Otherness', description: 'The making of a group into deviation from an allegedly neutral norm, through institutions, myths, language, labor, and daily expectation.'},
        {label: 'Immanence and transcendence', description: 'Terms for confinement in repetitive, dependent conditions and the capacity to project beyond them; neither maps neatly onto a sex or a permanent role.'},
      ]},
      {heading: 'Read critically', items: [
        {label: 'The Second Sex in translation', description: 'The 2011 Borde–Malovany-Chevallier English translation restores material cut from the earlier Parshley version, but no translation removes historical limits.'},
        {label: 'Biography and authority', description: 'Memoirs and letters require documentary care while evidence about relationships with younger women and former students raises ethical questions about consent and power.'},
      ]},
    ],
    'feminist-beauvoir-portrait',
    'Liu Dong’ao’s Xinhua photograph records Simone de Beauvoir at the 1 October 1955 Beijing ceremony marking the sixth anniversary of the People’s Republic of China; Sartre also attended. It can establish a dated public appearance; it cannot establish the meaning of the visit, the content of The Second Sex, Beauvoir’s independence, or a visual proof of situated freedom.',
    'fnv1a64:20c59abfc63927b3',
  ),
  arendt: objectLed(
    'Hannah Arendt',
    [
      'Hannah Arendt studied political life by examining what destroys the conditions in which people can appear, speak, and act together. Forced from Germany as a Jewish refugee, she made statelessness central to political thought. The “right to have rights” exposes how rights become precarious when no effective political community recognizes a person’s standing. The Origins of Totalitarianism traces antisemitism, imperialism, racism, statelessness, ideology, terror, and loneliness without turning them into one timeless cause. Arendt’s distinctions are historical diagnostic tools, not a vocabulary that makes every oppression total domination or lets democratic institutions off the hook.',
      'The Human Condition separates labor, work, and action. Labor sustains life; work builds a durable world; action and speech disclose plural persons and begin processes no one controls. These activities overlap in real lives and should not be mistaken for castes. Natality names the capacity to begin, while promises and forgiveness address the unpredictability of acting with others. Arendt distinguishes power, generated when people act in concert, from violence as instrumental force. That contrast does not make material need, care, labor, race, or colonialism nonpolitical. Critics test whether her boundary between social and political excludes experiences necessary for public equality.',
      'An unidentified 1933 photograph, reproduced in Elisabeth Young-Bruehl’s biography, shows the young Arendt before the long exile and postwar career through which these categories were formed. It can provide a fragile date and identity context; it cannot represent statelessness, certify judgment, or prove a political theory from a face. Arendt’s report on Eichmann requires the same restraint. “Banality of evil” did not mean harmlessness, diminished guilt, or an explanation of the Holocaust. It described her interpretation of clichés, careerism, and failures of judgment; later evidence of Eichmann’s ideological commitment and initiative means thoughtlessness cannot be a complete empirical portrait. Her treatment of Jewish councils, race, colonialism, and school desegregation remains a site of serious criticism, as does the unfinished status of her theory of judgment.',
    ],
    [
      {heading: 'Political standing', items: [
        {label: 'Right to have rights', description: 'The need to belong to a political community capable of recognizing and enforcing rights, not a single additional right written above all others.'},
        {label: 'Total domination', description: 'A historically specific form of rule combining ideology, terror, and loneliness; it should not become a casual name for every injustice.'},
      ]},
      {heading: 'A shared world', items: [
        {label: 'Labor, work, and action', description: 'Arendt’s distinctions among sustaining life, making a durable world, and beginning relations through speech and deeds; actual lives often combine them.'},
        {label: 'Plurality and natality', description: 'The condition of distinct people acting together and the capacity to begin something new, neither of which guarantees an equal or just public world.'},
        {label: 'Power and violence', description: 'Power arises from collective action in concert; violence is instrumental force, a distinction that does not erase coercion or material dependence.'},
      ]},
      {heading: 'Judgment under criticism', items: [
        {label: 'Banality of evil', description: 'Arendt’s account of Eichmann’s clichés and failures of judgment, not a claim that his crimes were ordinary, harmless, or free of agency.'},
        {label: 'Unfinished judgment', description: 'The Life of the Mind was incomplete, so Arendt’s account of judgment is reconstructed from lectures, essays, and notes rather than a final volume.'},
      ]},
    ],
    'arendt-portrait-1933',
    'This unidentified 1933 lifetime photograph of Hannah Arendt is reproduced in Elisabeth Young-Bruehl’s biography; its original repository and photographer are not identified. It provides limited identity and date context, not visual evidence of exile, statelessness, action, judgment, Eichmann’s guilt, or the adequacy of Arendt’s political distinctions.',
    'fnv1a64:355bf2f5d9e1037d',
  ),
};
