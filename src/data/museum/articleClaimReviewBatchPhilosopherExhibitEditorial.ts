import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';

type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

/*
 * Final object-led exhibit conversions for the seven reviewed modern
 * philosophers in this batch. Each entry preserves the live canonical
 * principal asset, including its registered caption, provenance, rights,
 * alt text, and uncropped preview.
 */

const EXHIBIT_REVIEW_LOCKS_BY_NAME: Readonly<Record<string, `fnv1a64:${string}`>> = {
  'John Rawls': 'fnv1a64:b99208ed1ac94dac',
  'Robert Nozick': 'fnv1a64:b471e342c2903c83',
  'Michel Foucault': 'fnv1a64:d52f673a48a5f018',
  'Jacques Derrida': 'fnv1a64:6944a8e0184b63f0',
  'Jürgen Habermas': 'fnv1a64:88e297008026b0dc',
  'Frantz Fanon': 'fnv1a64:45ee49e93a806942',
  'Jiddu Krishnamurti': 'fnv1a64:0b64d6003f5f4ee2',
};

/** Exact-title wall copy mirrored by the authoritative primary plaque contract. */
export const ARTICLE_CLAIM_REVIEW_BATCH_PHILOSOPHER_WALL_COPY = {
  rawls: {title: 'John Rawls', invitation: 'Use Rawls’s 1971 dust-jacket portrait to enter justice as fairness. Ask how equal liberty, fair opportunity, the difference principle, public reason, and global duties work—and which histories and exclusions still pressure the framework.'},
  nozick: {
    title: 'Robert Nozick',
    invitation: 'Meet Nozick through a 1977 magazine portrait. Ask how rights, entitlement, rectification, the minimal state, and voluntary community fit—and why later reservations do not amount to a simple recantation of his political philosophy.',
  },
  foucault: {
    title: 'Michel Foucault',
    invitation: 'Meet Foucault through a posthumous watercolor. Ask how archaeology, genealogy, discipline, power, sexuality, and subject formation change historical inquiry, while this imagined likeness proves nothing about his character, methods, or contested interventions.',
  },
  derrida: {
    title: 'Jacques Derrida',
    invitation: 'Meet Derrida through a posthumous pencil portrait. Ask how différance, trace, iterability, justice, and hospitality unsettle inherited oppositions, while this imagined likeness cannot make deconstruction arbitrary or resolve the arguments it recalls.',
  },
  habermas: {
    title: 'Jürgen Habermas',
    invitation: 'See Habermas with Horkheimer, Adorno, and Landshut in 1964. Ask how speech, public reason, law, and democracy resist unequal power—without reading a shared photograph as agreement, succession, or proof of a school.',
  },
  fanon: {
    title: 'Frantz Fanon',
    invitation: 'See Fanon speaking at a Tunis press conference whose date remains uncertain. Ask how racialization, psychiatry, colonial violence, organization, and national consciousness shape liberation without reducing his analysis to a timeless defense of force.',
  },
  'jiddu-krishnamurti': {
    title: 'Jiddu Krishnamurti',
    invitation: 'Meet the young Krishnamurti in a 1920s press portrait. Ask how conditioning, authority, fear, attention, relationship, and education shape freedom—and why this Theosophical-era image cannot represent his mature teaching after the 1929 dissolution.',
  },
} as const;

const objectLed = (
  name: string,
  paragraphs: readonly string[],
  orientation: readonly VisitorGuideSection[],
  assetId: MuseumAssetId,
  objectText: string,
  sources: MuseumPrimaryInterpretationEnrichment['sources'],
  plaqueSubtitleLines: 1 | 2 | 3 | 4 = 3,
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
    method: 'Reconciled separately against the current claim-reviewed canonical article, its registered sources, and the live principal-object record; object-led reading, visitor guide, exact canonical title, full-composition preview preservation, evidence limits, and responsive presentation received final editorial and visual review.',
    lock: EXHIBIT_REVIEW_LOCKS_BY_NAME[name],
  },
  sources,
});

/** Object-aware primary-exhibit conversions registered by the shared Museum interpretation chain. */
export const ARTICLE_CLAIM_REVIEW_BATCH_PHILOSOPHER_EXHIBIT_EDITORIAL:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  rawls: objectLed(
    'John Rawls',
    [
      'John Rawls asks how a society’s basic institutions should distribute liberties, opportunities, income, wealth, and the bases of self-respect. Justice as fairness begins with a device of representation, not a historical meeting. In the original position, representatives choose principles behind a veil of ignorance that removes class, race, gender, talent, and comprehensive doctrine as bargaining advantages. Rawls argues that this fair-choice model supports equal basic liberties, fair equality of opportunity, and inequalities arranged to benefit the least advantaged. The difference principle is not a command to maximize the worst-off position in every isolated decision; it belongs within a lexically ordered institutional account of justice.',
      'Political Liberalism changes the emphasis without making the earlier project disappear. Rawls asks how citizens who reasonably disagree about religion, morality, and the good life might nevertheless endorse constitutional essentials for their own different reasons. Public reason and an overlapping consensus are proposals for political justification, not demands that citizens erase private convictions or that actual agreement proves justice. The account remains contested. Feminist, disability, critical-race, Indigenous, postcolonial, and global-justice critics question what ideal theory abstracts from, including histories of slavery, colonial rule, family dependence, dispossession, and unequal power. The Law of Peoples also does not simply export the domestic difference principle to the globe.',
      'Alec Rawls’s 1971 photograph, reproduced from the first United States hardcover dust jacket of A Theory of Justice, gives this exhibit a lifetime likeness at the moment the book entered public circulation. Its U.S.-specific public-domain status and dust-jacket origin matter to the object record, but neither supplies evidence for the original position nor shows the citizens whose terms of cooperation Rawls models. A reserved portrait cannot certify impartiality, settle the ordering of the principles, or answer criticisms of idealization. It is most useful as a reminder that an institutional theory travelled through teaching, publishing, criticism, and political argument—not as a visual substitute for the people and histories its abstractions must answer.',
    ],
    [
      {heading: 'Justice as fairness', items: [
        {label: 'Original position', description: 'A hypothetical choice situation designed to test which institutional principles no party can tailor to its own social advantage.'},
        {label: 'Veil of ignorance', description: 'The restriction that hides a represented citizen’s class, race, gender, talents, and comprehensive doctrine while retaining general social knowledge.'},
        {label: 'Two principles', description: 'Equal basic liberties come first; fair equality of opportunity comes next; then the difference principle regulates permitted inequalities.'},
      ]},
      {heading: 'Political legitimacy', items: [
        {label: 'Reasonable pluralism', description: 'The durable fact that free citizens can disagree conscientiously about religion, value, and the good life.'},
        {label: 'Public reason', description: 'A proposal for justifying constitutional essentials with reasons fellow citizens can assess, not a ban on private faith or conviction.'},
        {label: 'Overlapping consensus', description: 'Support for political principles from different moral or religious outlooks, rather than one officially enforced worldview.'},
      ]},
      {heading: 'A live dispute', items: [
        {label: 'Ideal theory', description: 'A model of a well-ordered society that critics say can obscure repair for racial, colonial, gendered, disability, and economic injustice.'},
      ]},
    ],
    'rawls-portrait',
    'Alec Rawls’s 1971 lifetime photograph comes from the first U.S. hardcover dust jacket of A Theory of Justice. It identifies John Rawls at the book’s initial circulation, not the original position, impartiality, citizens’ actual agreement, or an answer to criticisms of ideal theory. Its registered rights determination is U.S.-specific.',
    [
      {label: 'Stanford Encyclopedia of Philosophy — John Rawls', url: 'https://plato.stanford.edu/entries/rawls/', kind: 'academic-reference'},
      {label: 'John Rawls — A Theory of Justice', url: 'https://www.hup.harvard.edu/books/9780674000780', kind: 'primary-text'},
      {label: 'John Rawls — Political Liberalism', url: 'https://cup.columbia.edu/book/political-liberalism/9780231130899', kind: 'primary-text'},
    ],
  ),
  nozick: objectLed(
    'Robert Nozick',
    [
      'Robert Nozick’s Anarchy, State, and Utopia challenges political theories that use people as inputs to a preferred social pattern. His rights-based side constraints limit what others and the state may do to separate persons, even when an aggregate outcome looks attractive. Nozick sketches how protective associations might become a minimal state while owing compensation to people whose independent enforcement is prohibited. The argument is not a blank check for any existing government or property arrangement. It raises difficult questions about whether the transition avoids the coercion it is meant to justify and about what rights a state may enforce once it exists.',
      'Nozick’s entitlement theory evaluates holdings historically: justice depends on acquisition, voluntary transfer, and rectification when either is unjust. It therefore does not declare every current distribution deserved. Conquest, theft, enslavement, exclusion, and dispossession make rectification central, while Nozick’s account remains too schematic to determine their remedy. The Wilt Chamberlain example argues that free exchanges can unsettle a patterned distribution; critics reply that voluntariness cannot be assessed apart from background rights and unequal bargaining conditions. The experience machine asks whether a life of pleasurable experience alone contains all that matters. It pressures hedonism especially, not every possible consequentialist view.',
      'The registered image is an extracted and retouched close portrait from the December 1977 Libertarian Review cover; its photographer is unknown and its Commons public-domain determination rests on U.S. notice formalities. It can locate a public reputation that became disproportionately attached to one early political book, but it cannot make entitlement theory visible or validate a magazine’s ideological framing. Nozick later wrote extensively about knowledge, explanation, rationality, identity, value, and meaning. His later qualifications make a simple story of total libertarian renunciation misleading, yet they do not provide a replacement political theory or erase the force of the 1974 argument. The portrait should send visitors back to those arguments and their historical burdens.',
    ],
    [
      {heading: 'Rights and the state', items: [
        {label: 'Side constraints', description: 'Rights that restrict using a person as a means for desirable collective outcomes, rather than goals to be traded off by a social calculator.'},
        {label: 'Minimal state', description: 'A state limited largely to protection against force, theft, fraud, and enforcement of contracts; Nozick’s route to it remains disputed.'},
      ]},
      {heading: 'Entitlement and distribution', items: [
        {label: 'Entitlement theory', description: 'A holding is assessed through its history of acquisition and transfer, not by whether the final distribution fits a favored pattern.'},
        {label: 'Rectification', description: 'The required response to unjust acquisition or transfer; Nozick identifies its importance but leaves its historical application underdeveloped.'},
        {label: 'Wilt Chamberlain example', description: 'A thought experiment in which voluntary payments disrupt equality, prompting debate about background property rights and genuine consent.'},
      ]},
      {heading: 'Beyond 1974', items: [
        {label: 'Experience machine', description: 'A machine offering satisfying experiences that tests whether pleasure alone captures doing, being, and contact with reality.'},
        {label: 'Later work', description: 'Books on knowledge, explanation, rationality, identity, value, and meaning that widen Nozick’s career without proving a wholesale political reversal.'},
      ]},
    ],
    'nozick-portrait',
    'This close portrait was extracted and retouched from the December 1977 Libertarian Review cover; the photographer is unknown. It records Nozick’s public image, not side constraints, entitlement, a just acquisition, or a settled political conversion. Its registered public-domain determination depends on U.S. notice formalities and is not a global rights conclusion.',
    [
      {label: 'Stanford Encyclopedia of Philosophy — Robert Nozick’s Political Philosophy', url: 'https://plato.stanford.edu/entries/nozick-political/', kind: 'academic-reference'},
      {label: 'Robert Nozick — Anarchy, State, and Utopia', url: 'https://www.basicbooks.com/titles/robert-nozick/anarchy-state-and-utopia/9780465097203/', kind: 'primary-text'},
      {label: 'Robert Nozick — Philosophical Explanations', url: 'https://www.hup.harvard.edu/books/9780674664791', kind: 'primary-text'},
    ],
  ),
  foucault: objectLed(
    'Michel Foucault',
    [
      'Michel Foucault investigates how historically specific practices make objects of knowledge, institutions, and recognizable kinds of person possible. His early archaeological work does not simply list past errors or deny that evidence matters. It asks which rules allow statements, objects, expert roles, and classifications to appear together in a field such as medicine, psychiatry, or the human sciences. Genealogy, indebted in part to Nietzsche, shifts attention from a pure origin to contingent struggles, bodies, techniques, and institutions. These approaches are not one timeless recipe: Foucault repeatedly changes the scale and vocabulary of his inquiry as his historical problems change.',
      'Discipline and Punish analyzes examination, surveillance, training, normalization, and punishment as relations that produce capable as well as compliant bodies. Bentham’s Panopticon is a diagram of asymmetric visibility, not Foucault’s invention or proof that every modern institution copies its architecture. Later writing on sexuality, biopolitics, governmentality, and practices of the self broadens the inquiry beyond enclosed institutions toward population management and self-formation. Power is relational and productive, not merely a possession of the state or a prohibition descending from above; it also meets resistance. Critics continue to ask how genealogy can criticize domination or distinguish better from worse transformations without returning to the universal standards it historicizes.',
      'Antonio Climent Encinas’s 2013 ink-and-watercolor portrait was made almost three decades after Foucault’s death. Its source, credit, CC BY-SA 3.0 license, and uncropped registered preview identify it honestly as an artistic reconstruction, not a lifetime photograph. The drawing cannot demonstrate a discourse, make discipline readable in a face, or settle the normativity question. It does, however, make mediation visible: a later artist constructs an image of a thinker whose work warns against treating representations and classifications as transparent. Visitors should not turn that irony into proof that all representation fails; the work asks for closer historical attention to the practices that make a representation authoritative.',
    ],
    [
      {heading: 'Historical inquiry', items: [
        {label: 'Archaeology', description: 'An investigation of the historical rules through which statements, objects, expert roles, and categories become intelligible in a field.'},
        {label: 'Genealogy', description: 'An account of contingent struggles and practices rather than a search for one pure origin or a steady march toward truth.'},
      ]},
      {heading: 'Power and subjects', items: [
        {label: 'Discipline', description: 'Training, examination, surveillance, and normalization that shape bodies and conduct while also producing capacities.'},
        {label: 'Panopticon', description: 'Bentham’s design, used by Foucault as a diagram of asymmetric visibility; it is not a claim that every institution has the same building.'},
        {label: 'Governmentality', description: 'Ways of governing conduct through institutions, expertise, calculation, and self-management, not government only in the narrow state sense.'},
      ]},
      {heading: 'Continuing question', items: [
        {label: 'Normativity', description: 'The unresolved question of how a history of power can criticize domination and guide resistance without pretending history supplies no standards at all.'},
      ]},
    ],
    'critique-foucault-watercolor-2013',
    'Antonio Climent Encinas’s 2013 ink-and-watercolor image is an imagined posthumous portrait of Michel Foucault, licensed CC BY-SA 3.0. It identifies a later artistic reception, not a lifetime appearance, an event, a discourse, a practice of discipline, or an answer to the ethical and political disputes about genealogy.',
    [
      {label: 'Stanford Encyclopedia of Philosophy — Michel Foucault', url: 'https://plato.stanford.edu/entries/foucault/', kind: 'academic-reference'},
      {label: 'Michel Foucault — The Archaeology of Knowledge', url: 'https://www.routledge.com/The-Archaeology-of-Knowledge/Foucault/p/book/9780415287534', kind: 'primary-text'},
      {label: 'Michel Foucault — Discipline and Punish', url: 'https://www.penguinrandomhouse.com/books/161023/discipline-and-punish-by-michel-foucault/', kind: 'primary-text'},
    ],
  ),
  derrida: objectLed(
    'Jacques Derrida',
    [
      'Jacques Derrida’s deconstruction is neither a trick for proving that texts say nothing nor a doctrine that interpretations are equally good. It reads distinctions that organize a text or institution—speech and writing, presence and absence, nature and culture, inside and outside—and asks how the privileged term depends on what it excludes. The point is not to reverse every hierarchy and stop. Deconstruction follows tensions already active in an argument, where a condition presented as secondary proves necessary to what claims priority. That work changes how evidence, responsibility, inheritance, and conceptual authority must be read; it does not exempt a reader from explaining why a reading is warranted.',
      'Terms such as différance, trace, supplement, and iterability name pressures in this inquiry. Différance joins difference with temporal deferral; a trace marks that present meaning bears what is absent; a supplement adds to and reveals an incompleteness in what seemed self-sufficient; iterability lets a mark travel beyond one fixed intention or context. None makes language arbitrary or communication impossible. Derrida’s writing on law, justice, hospitality, institutions, borders, and the right to philosophy develops these problems politically and ethically. “Justice” is not a ready legal rule, and hospitality does not eliminate conflict over laws, conditions, or material responsibility. Debates over method, relativism, translation, and political force remain part of the reception rather than errors a slogan can settle.',
      'Arturo Espinosa’s pencil drawing dates from 2013, nine years after Derrida’s death, and its CC BY 2.0 credit must remain attached to this likeness. The full registered portrait can show an artist’s reception of Derrida; it cannot establish his appearance in life, reveal a private temperament, or demonstrate deconstruction through a reflective gaze. Its posthumous status gives visitors a concrete case of representation arriving after the person it depicts, but not proof of a philosophical thesis. Read the drawing alongside arguments about writing, transmission, interpretation, and responsibility rather than treating either image or concept as self-explanatory.',
    ],
    [
      {heading: 'Reading otherwise', items: [
        {label: 'Deconstruction', description: 'Close reading that tracks how an apparent opposition depends on, suppresses, or destabilizes the term it ranks as secondary.'},
        {label: 'Metaphysics of presence', description: 'A family of philosophical preferences for immediate presence, origin, voice, or self-identity that Derrida tests rather than dismisses in one stroke.'},
      ]},
      {heading: 'Terms to keep distinct', items: [
        {label: 'Différance', description: 'A coined term for difference and deferral: meaning is differentiated and delayed rather than arriving as a self-present unit.'},
        {label: 'Supplement', description: 'What seems merely added from outside but also reveals that the supposedly complete original depended on an addition.'},
        {label: 'Iterability', description: 'The repeatability that lets a mark travel beyond its originator and context while still requiring interpretation and responsibility.'},
      ]},
      {heading: 'Ethics and institutions', items: [
        {label: 'Justice and hospitality', description: 'Later questions about law, welcome, borders, and responsibility that do not produce a simple policy rule or dissolve conflict.'},
      ]},
    ],
    'critique-derrida-espinosa-drawing-2013',
    'Arturo Espinosa’s 2013 pencil portrait, licensed CC BY 2.0, was drawn nine years after Jacques Derrida’s death. It records a later representation, not a lifetime likeness, his character, a proof about writing or presence, or a resolution of disputes about deconstruction, justice, and political responsibility.',
    [
      {label: 'Stanford Encyclopedia of Philosophy — Jacques Derrida', url: 'https://plato.stanford.edu/archives/spr2020/entries/derrida/', kind: 'academic-reference'},
      {label: 'Jacques Derrida — Of Grammatology', url: 'https://jhupbooks.press.jhu.edu/title/grammatology', kind: 'primary-text'},
      {label: 'Jacques Derrida — Force of Law: The “Mystical Foundation of Authority”', url: 'https://www.routledge.com/Deconstruction-and-the-Possibility-of-Justice/Cornell-Rosenfeld-Carlson/p/book/9780415904124', kind: 'primary-text'},
    ],
  ),
  habermas: objectLed(
    'Jürgen Habermas',
    [
      'Jürgen Habermas reconstructs critical theory around communication, public justification, and democratic institutions. Writing in postwar Germany, he sought resources for criticizing domination without reducing reason to private preference or instrumental control. The Structural Transformation of the Public Sphere studies spaces in which private people debated common affairs, but it does not preserve a universally inclusive golden age. The bourgeois public sphere was shaped by exclusions of class, gender, race, empire, and property; later scholarship on counterpublics and marginalization changes how its critical promise must be used. Habermas’s model is both a historical reconstruction and a contested normative resource.',
      'The Theory of Communicative Action distinguishes action oriented toward mutual understanding from strategic action oriented toward controlling outcomes. Speech raises claims of truth, rightness, and sincerity that reasons can challenge. This does not predict frictionless consensus, imagine actual talk free of power, or identify agreement with justice. Habermas also contrasts systems of money and administration with a lifeworld of shared meaning and solidarity. “Colonization” names a pathology when system mechanisms displace communication where interpretation and democratic will-formation are needed; it is not a claim that complex institutions can work without law, administration, or markets. Discourse ethics and deliberative democracy retain disagreement as a condition of public reason.',
      'Jeremy J. Shapiro’s April 1964 group photograph shows Horkheimer and Adorno greeting one another, with Landshut and a young Habermas behind them at a Heidelberg meeting. The registered caption, CC BY-SA 3.0 rights, and full scene preserve an important institutional context: Habermas worked within yet did not simply repeat changing generations of Critical Theory. Commons identifies him at back right, but proximity in one image cannot prove agreement, succession, influence in every direction, or the content of communicative rationality. The photograph asks visitors to see theory as an argument among people and institutions, then return to the far harder question of how public communication can remain answerable to exclusion, inequality, strategic power, and unresolved difference.',
    ],
    [
      {heading: 'Public criticism', items: [
        {label: 'Public sphere', description: 'A historically specific domain of public discussion whose critical promise must be read with its exclusions and counterpublics in view.'},
        {label: 'Counterpublics', description: 'Alternative arenas of communication formed by groups excluded or marginalized by dominant public discussion.'},
      ]},
      {heading: 'Communication and power', items: [
        {label: 'Communicative action', description: 'Action oriented toward reaching understanding through reasons, distinct from using speech mainly to secure a strategic outcome.'},
        {label: 'Validity claims', description: 'Claims about truth, rightness, and sincerity that make a statement open to challenge; they do not guarantee that discussion is equal.'},
        {label: 'System and lifeworld', description: 'A contrast between money and administration as coordination mechanisms and the shared practices of meaning and solidarity they can displace.'},
      ]},
      {heading: 'Democratic test', items: [
        {label: 'Discourse ethics', description: 'An idealizing test of whether a norm could gain acceptance under fair participation, not the claim that actual consensus is automatically moral.'},
      ]},
    ],
    'critique-habermas-critical-theory-heidelberg-1964',
    'Jeremy J. Shapiro’s April 1964 group photograph identifies a young Habermas at back right with Horkheimer, Adorno, and Landshut in Heidelberg. Licensed CC BY-SA 3.0, it establishes a documented encounter and institutional context—not agreement, succession, a visual proof of communicative rationality, or a resolution of exclusions in public life.',
    [
      {label: 'Stanford Encyclopedia of Philosophy — Jürgen Habermas', url: 'https://plato.stanford.edu/archives/sum2026/entries/habermas/', kind: 'academic-reference'},
      {label: 'Jürgen Habermas — The Structural Transformation of the Public Sphere', url: 'https://mitpress.mit.edu/9780262581080/the-structural-transformation-of-the-public-sphere/', kind: 'primary-text'},
      {label: 'Jürgen Habermas — The Theory of Communicative Action', url: 'https://www.beacon.org/The-Theory-of-Communicative-Action-Volume-1-P1684.aspx', kind: 'primary-text'},
    ],
  ),
  fanon: objectLed(
    'Frantz Fanon',
    [
      'Frantz Fanon treats colonialism as more than a foreign flag, army, or economic policy. In Black Skin, White Masks, phenomenology, psychiatry, literature, and antiracist critique describe how a racializing world enters bodily orientation, language, recognition, desire, and self-understanding. His “epidermal racial schema” is not a biological theory of race; it names lived deformation imposed by antiblack social meaning. Born in Martinique, trained through French institutions, and active in Algeria and across Africa, Fanon cannot be safely contained within one national canon. Those changing settings make his work attentive to domination and to differences that a generic image of “the colonized” can conceal.',
      'Fanon’s psychiatric work at Blida-Joinville Hospital belongs with his political writing. Colonial institutions damaged care, authority, language, and social relations; clinical reform could not remain untouched by the Algerian war. After resigning from the colonial medical service, he joined the National Liberation Front, edited its press, and worked diplomatically. The Wretched of the Earth analyzes a colonial order constituted through force, revolutionary counterviolence, political education, national culture, and the danger that postcolonial elites reproduce domination. It must not become a timeless endorsement of cruelty. Fanon considers transformative and destructive possibilities of struggle while insisting that liberation needs organization, participation, and new social relations, not merely a change of rulers.',
      'The principal photograph shows Fanon speaking into microphones at a writers’ congress press conference in Tunis. Its unknown photographer, public-domain-in-Tunisia rights statement, and date require care: the Commons filename, summary, and structured data say 1959, while an English caption says 1957. The exhibit therefore preserves “1957 or 1959,” rather than inventing an exact date. This lifetime event image can establish a public anticolonial role at one gathering; it cannot stand for every position he held, make a clinic visible, or turn a revolutionary struggle into a solitary theorist’s achievement. Visitors should hold the image beside the distributed labor, violence, and contested futures that Fanon’s work refuses to simplify.',
    ],
    [
      {heading: 'Colonial embodiment', items: [
        {label: 'Epidermal racial schema', description: 'Fanon’s name for the socially imposed bodily meaning that distorts lived experience; it is not a biological account of race.'},
        {label: 'Recognition and language', description: 'Sites where colonial and racial hierarchy can shape who is heard, valued, and able to appear as a full person.'},
      ]},
      {heading: 'Clinic and liberation', items: [
        {label: 'Colonial psychiatry', description: 'A field in which care and institutional power were entangled, making Fanon’s clinical work part of his anticolonial analysis.'},
        {label: 'Decolonization', description: 'A transformation of institutions, relationships, political participation, and human possibilities—not simply the transfer of sovereignty.'},
        {label: 'National consciousness', description: 'A political formation that can support collective liberation but can also be captured by elites or harden into new domination.'},
      ]},
      {heading: 'A contested reading', items: [
        {label: 'Violence', description: 'Fanon’s analysis of a colonial world structured by force and of counterviolence’s stakes; it is not a timeless license for cruelty.'},
      ]},
    ],
    'colonial-fanon-portrait',
    'This lifetime photograph shows Frantz Fanon at a writers’ congress press conference in Tunis, but the Commons record conflicts between 1957 and 1959. It records one public event, not a timeless revolutionary icon, his entire political position, the conditions of colonial psychiatry, or the collective agency of the Algerian struggle.',
    [
      {label: 'Stanford Encyclopedia of Philosophy — Frantz Fanon', url: 'https://plato.stanford.edu/entries/frantz-fanon/', kind: 'academic-reference'},
      {label: 'Frantz Fanon — Black Skin, White Masks', url: 'https://groveatlantic.com/book/black-skin-white-masks/', kind: 'primary-text'},
      {label: 'Frantz Fanon — The Wretched of the Earth', url: 'https://groveatlantic.com/book/the-wretched-of-the-earth/', kind: 'primary-text'},
    ],
  ),
  'jiddu-krishnamurti': objectLed(
    'Jiddu Krishnamurti',
    [
      'Jiddu Krishnamurti made the rejection of spiritual and psychological authority central to a lifetime of public inquiry. Raised in Theosophy and presented as a coming World Teacher, he dissolved the Order of the Star in 1929. This did not make learning, dialogue, education, or cooperation useless. It rejected the claim that an institution, guru, ritual, doctrine, or prescribed path can certify inward freedom. Indian formation and global reception do not make him a Vedāntin, Yogin, Buddhist, Jain, or member of another inherited school. Comparisons invite inquiry, not claims of affiliation or influence.',
      'Krishnamurti returns to conditioning, thought, memory, fear, psychological time, attention, relationship, and the observer–observed division. Conditioning names layered social, linguistic, religious, national, and personal patterns; it is not one hidden substance. Thought remains necessary for practical tasks, but he asks what happens when memory and image claim authority over a relationship or identity. Attention is not forced concentration or a repeatable technique guaranteed to produce a result. In many discussions, the judging observer belongs to the same conditioned movement as anger or fear. Critics ask whether a rejection of method becomes its own method, whether immediate insight understates trauma and material power, and whether archives and foundations can preserve a teacher without creating a new authority.',
      'The Bain News Service photograph is a 1920s lifetime press portrait from Krishnamurti’s Theosophical-era public career, held by the Library of Congress. Its registered “no known copyright restrictions” status, collection provenance, alt text, and uncropped preview should remain intact. The young face establishes an early international image, not inward realization, World Teacher claims as fact, or the mature position he developed after the 1929 dissolution. A portrait cannot show conditioning, prove choiceless awareness, or settle criticism of charisma and institutional preservation. Its distance from the later teaching is why it is useful: a public image acquired under one authority became evidence for a lifelong argument against confusing a person’s status with freedom.',
    ],
    [
      {heading: 'Authority and formation', items: [
        {label: 'Order of the Star', description: 'The Theosophical organization established around expectations that Krishnamurti would become a World Teacher; he dissolved it in 1929.'},
        {label: 'Pathless land', description: 'His challenge to the idea that membership, a guru, or a fixed method can guarantee inward freedom; it is not a command to reject all learning.'},
      ]},
      {heading: 'Inquiry into mind and relationship', items: [
        {label: 'Conditioning', description: 'Accumulated social, linguistic, religious, national, and personal patterns that organize perception and response.'},
        {label: 'Psychological time', description: 'The movement of remembered hurt, present identity, and hoped-for becoming through which fear and self-improvement can perpetuate themselves.'},
        {label: 'Attention', description: 'Undivided observation that questions suppression, selection, and a controlling inner spectator; it is not a concentration technique.'},
        {label: 'Observer and observed', description: 'A challenge to treating the self that judges anger, fear, or jealousy as wholly separate from the conditioned movement being judged.'},
      ]},
      {heading: 'A necessary tension', items: [
        {label: 'No authorized succession', description: 'Foundations and schools preserve talks and support education, yet their existence raises the question of whether a critique of authority can avoid new forms of authority.'},
      ]},
    ],
    'jiddu-krishnamurti-bain-portrait',
    'This 1920s Bain News Service lifetime press portrait, held by the Library of Congress, documents Krishnamurti’s Theosophical-era public image. It is not proof of inward realization, World Teacher claims, a mature post-1929 allegiance, conditioning, attention, or a final answer to the tension between charisma and institutional preservation.',
    [
      {label: 'Krishnamurti Foundation Trust — Dissolution of the Order of the Star', url: 'https://kfoundation.org/dissolution-speech/', kind: 'primary-text'},
      {label: 'Jiddu Krishnamurti — Freedom from the Known', url: 'https://www.harpercollins.com/products/freedom-from-the-known-j-krishnamurti', kind: 'primary-text'},
      {label: 'Roland Vernon — Star in the East: Krishnamurti, the Invention of a Messiah', url: 'https://www.simonandschuster.com/books/Star-in-the-East/Roland-Vernon/9780971078680', kind: 'academic-reference'},
    ],
  ),
};
