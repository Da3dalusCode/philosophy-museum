import type {MuseumAssetId} from './museumAssetTypes';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
} from './museumSupplementalAuthoring';
import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import {
  FAITH_PESSIMISM_VALUE_GALLERY_ID,
  FAITH_PESSIMISM_VALUE_ROOM_SIGN_COPY,
} from './faithPessimismValueGalleryCuration';
import type {FaithPessimismValueGalleryAssetId} from './faithPessimismValueGalleryAssets';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
  MuseumSupplementalInstallationKind,
} from './museumWorldTypes';

export {FAITH_PESSIMISM_VALUE_GALLERY_ID, FAITH_PESSIMISM_VALUE_ROOM_SIGN_COPY};

export const FAITH_PESSIMISM_VALUE_PALETTE = Object.freeze({
  midnight: '#292a3d',
  wine: '#7e4e54',
  violet: '#66577f',
  forest: '#526d63',
  alpine: '#4e7280',
  gold: '#a67b45',
});

export type FaithPessimismValueSupplementalExhibitId =
  | 'schopenhauer-kant-and-representation'
  | 'schopenhauer-frankfurt-work'
  | 'schopenhauer-music-and-wagner'
  | 'schopenhauer-oupnekhat-route'
  | 'schopenhauer-pessimism-afterlife'
  | 'kierkegaard-indirect-communication'
  | 'kierkegaard-fear-trembling'
  | 'kierkegaard-christendom-attack'
  | 'dostoevsky-brothers-karamazov'
  | 'nietzsche-birth-tragedy'
  | 'nietzsche-lou-interlocutor'
  | 'nietzsche-writing-machine'
  | 'nietzsche-eternal-recurrence'
  | 'nietzsche-archive-afterlife';

type CuratedInput = {
  id: FaithPessimismValueSupplementalExhibitId;
  assetId: FaithPessimismValueGalleryAssetId;
  parent: 'schopenhauer' | 'kierkegaard' | 'dostoevsky' | 'nietzsche';
  displayName: string;
  shortTitle: string;
  focus: string;
  dateLabel: string;
  question: string;
  lead: string;
  ideas: readonly [string, string, string];
  cautions: readonly [string, string];
  imageSource: string;
};

const image = (url: string) => ({label: 'Wikimedia Commons — displayed object or image record', url, kind: 'collection-record' as const});
const academicByParent = {
  schopenhauer: {label: 'Stanford Encyclopedia of Philosophy — Arthur Schopenhauer', url: 'https://plato.stanford.edu/entries/schopenhauer/', kind: 'academic-reference' as const},
  kierkegaard: {label: 'Stanford Encyclopedia of Philosophy — Søren Kierkegaard', url: 'https://plato.stanford.edu/entries/kierkegaard/', kind: 'academic-reference' as const},
  dostoevsky: {label: 'Stanford Encyclopedia of Philosophy — Existentialism', url: 'https://plato.stanford.edu/entries/existentialism/', kind: 'academic-reference' as const},
  nietzsche: {label: 'Stanford Encyclopedia of Philosophy — Friedrich Nietzsche', url: 'https://plato.stanford.edu/entries/nietzsche/', kind: 'academic-reference' as const},
};

const curated = (input: CuratedInput): MuseumSupplementalExhibit => authorSupplementalExhibit({
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
    {heading: 'Look closely', paragraph: input.ideas[0]},
    {heading: 'Historical argument', paragraph: input.ideas[1]},
    {heading: 'What remains at stake', paragraph: input.ideas[2]},
  ],
  sources: [image(input.imageSource), academicByParent[input.parent]],
  articleRoute: {kind: 'philosopher', philosopherId: input.parent},
  entityKind: 'philosopher',
  panelKicker: 'Gallery 18 work and context exhibit',
});

export const FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBITS = [
  curated({
    id: 'schopenhauer-kant-and-representation', assetId: 'value-kant-hagemann-bust', parent: 'schopenhauer',
    displayName: 'Kant’s Boundary, Schopenhauer’s Will', shortTitle: 'Kant and Representation', focus: 'KANT · APPEARANCE, THING IN ITSELF, BODY, AND WILL', dateLabel: 'Kant bust made 1801 · Schopenhauer’s major work 1818/1819',
    question: 'How can Schopenhauer inherit Kant’s limit on knowledge yet claim embodied striving discloses the world as will?',
    lead: 'Kant’s transcendental idealism distinguishes the world as it appears under human forms of intuition and understanding from things considered independently of those conditions. Schopenhauer keeps that critical inheritance at the entrance to his system: the experienced world is representation, always organized as an object for a subject. Yet he argues that the body supplies an unusual second access. It is perceived outwardly as one object among others but lived inwardly as appetite, effort, resistance, and motion.',
    ideas: ['The bust materializes a predecessor whose boundary Schopenhauer does not simply discard. In The World as Will and Representation he treats Kant’s distinction between appearance and thing in itself as a decisive discovery, even while rejecting parts of Kant’s account of categories and moral freedom. The exhibit therefore presents inheritance and revision together, not a clean break from critical philosophy.', '“Representation” names the subject–object structure within which anything becomes an experienced object. “Will,” by contrast, is not a rational faculty issuing conscious commands. Schopenhauer uses the term for the pre-rational striving disclosed through embodied action and need, then extends it to organic life and nature. That extension makes his metaphysics more radical than a psychology of human intention.', 'The decisive move—from the double knowledge of one body to will as the inner character of the world—remains philosophically contestable. It may expose a limit in detached accounts of knowledge, but analogy does substantial work in universalizing the disclosure. Reading the system well means separating the phenomenology of embodied striving from the much larger metaphysical conclusion built upon it.'],
    cautions: ['Schopenhauer’s will is not Kant’s own doctrine of the thing in itself.', 'Do not translate “will” into a personal intention controlling the universe.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Bust_of_Emmanuel_Kant.jpg',
  }),
  curated({
    id: 'schopenhauer-frankfurt-work', assetId: 'value-schopenhauer-house-1861', parent: 'schopenhauer',
    displayName: 'Late Recognition in Frankfurt', shortTitle: 'A System Waiting for Readers', focus: 'AUTHORSHIP · REVISION, RECEPTION, ESSAYS, AND LATE RECOGNITION', dateLabel: 'Frankfurt residence from 1833 · house photographed 1861',
    question: 'What happens to a philosophical system when its first publication attracts little attention and recognition arrives decades later?',
    lead: 'The Frankfurt house belongs to Schopenhauer’s long period of revision and waiting. The first edition of The World as Will and Representation appeared in 1818 with an 1819 title-page date and attracted few readers. After settling in Frankfurt in 1833, he continued testing the system against scientific research, revising its exposition, and cultivating a combative distance from university philosophy. Recognition came only after the enlarged 1844 edition and the more accessible essays of Parerga and Paralipomena in 1851.',
    ideas: ['The building anchors philosophical labor in an urban routine rather than in the myth of one sudden revelation. Schopenhauer read newspapers and scientific works, revised manuscripts, corresponded with followers, and wrote polemics from Frankfurt. The first volume’s architecture remained central, but his later supplements accumulated decades of argument about knowledge, nature, aesthetics, ethics, sexuality, and religion.', 'The 1844 edition paired a revised first volume with an extensive second volume of supplements. Those additions do not amount to a replacement system: they revisit individual books and elaborate claims whose compressed first presentation had left major gaps. Comparing editions reveals philosophical authorship as sustained reconstruction, in which a thinker can preserve a governing thesis while changing its evidential reach and rhetorical form.', 'Late fame was not produced by merit operating outside history. The success of Parerga, advocates such as Julius Frauenstädt, and John Oxenford’s 1853 English-language article helped new readers encounter the work. The delayed reception asks who controls philosophical visibility: publishers, periodicals, institutions, disciples, changing intellectual fashions, and the author’s own choices all mediate when a system becomes “important.”'],
    cautions: ['The photograph was made in 1861, after Schopenhauer’s 1860 death.', 'Schopenhauer drafted the first edition chiefly in Dresden, not Frankfurt.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Frankfurt_Am_Main-Schopenhauerhaus-Carl_Friedrich_Mylius-1861.jpg',
  }),
  curated({
    id: 'schopenhauer-music-and-wagner', assetId: 'value-wagner-met-portrait', parent: 'schopenhauer',
    displayName: 'Music as a Temporary Ceasefire', shortTitle: 'Music and Aesthetic Release', focus: 'AESTHETICS · CONTEMPLATION, MUSIC, STRIVING, AND RECEPTION', dateLabel: 'The World as Will and Representation, Book III · Wagner reception from the 1850s',
    question: 'How can art temporarily release a subject from interested striving, and why does Schopenhauer give music exceptional status?',
    lead: 'Aesthetic contemplation offers Schopenhauer a temporary interruption of ordinary wanting, not a permanent escape from will. Absorbed attention ceases, for a time, to treat objects as useful, threatening, or desirable for an individual. Painting, sculpture, poetry, and tragedy disclose what he calls Platonic Ideas through representation. Music receives the exceptional claim that it presents the patterned movement of will more directly, without first representing those Ideas. Wagner’s portrait introduces the influential afterlife of this difficult hierarchy of the arts.',
    ideas: ['Aesthetic attention changes the mode of subjectivity rather than satisfying another appetite. The spectator becomes, in Schopenhauer’s language, a “pure subject of knowing,” temporarily released from calculations of personal advantage. Because hunger, ambition, and fear return, this is a ceasefire rather than salvation. The value lies in experiencing cognition no longer organized around the individual’s next demand.', 'Music’s privilege follows from the system’s metaphysics: melodies move through tension, delay, striving, and resolution in patterns Schopenhauer analogizes to will itself. This does not mean that a symphony secretly narrates particular emotions or worldly events. Music’s apparent independence from pictorial reference is precisely why he ranks it apart from arts that present Ideas through identifiable forms.', 'Wagner encountered Schopenhauer’s work in 1854 and drew selectively on it while developing his own account of music drama. Tristan und Isolde is often heard through this reception, but Wagner’s theatrical ambitions, nationalism, and later cultural politics are not Schopenhauer’s conclusions. Reception can enlarge one strand of a philosophy while redirecting it; the portrait is evidence of an influential reader, not a certificate of agreement.'],
    cautions: ['Wagner’s enthusiasm is not proof that Schopenhauer endorsed Wagner’s later art or politics.', 'Aesthetic respite is temporary and should not be confused with the ethical role of compassion.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Richard_Wagner_MET_DP807085.jpg',
  }),
  curated({
    id: 'schopenhauer-oupnekhat-route', assetId: 'value-anquetil-duperron-medallion', parent: 'schopenhauer',
    displayName: 'The Oupnek’hat Route', shortTitle: 'A Mediated Upanishadic Encounter', focus: 'RECEPTION · PERSIAN, LATIN, UPANISHADS, AND EUROPEAN INTERPRETATION', dateLabel: 'Oupnek’hat published 1801–1802 · Schopenhauer read the Latin version',
    question: 'How should cross-cultural philosophical influence be described when texts travel through translation, selection, and inherited European categories?',
    lead: 'Anquetil-Duperron’s Latin Oupnek’hat became Schopenhauer’s principal route to selected Upanishads, but it was already a translation of a translation. The Mughal prince Dara Shikoh had commissioned and participated in a Persian rendering of about fifty Upanishads in the seventeenth century; Anquetil-Duperron then rendered that Persian collection into idiosyncratic Latin in 1801–1802. This chain enabled a consequential European encounter while also determining vocabulary, selection, and the interpretive problems Schopenhauer inherited.',
    ideas: ['The medallion represents a translator whose decisions belong inside the philosophical history of the text. Persian and Latin terms carried Islamic, Neoplatonic, and European associations that did not transparently reproduce Sanskrit concepts. Schopenhauer’s enthusiasm for the Oupnek’hat was genuine, but the physical route reminds visitors that “influence” is an event of mediation rather than direct contact between self-contained civilizations.', 'Schopenhauer recognized affinities involving appearance, the instability of individual selfhood, suffering, compassion, and release. He interpreted them through his own distinction between representation and will, and he often joined Upanishadic, Buddhist, Platonic, and Christian ascetic materials within one comparative frame. Those juxtapositions generated new philosophy, but they do not demonstrate that the traditions taught one identical metaphysics.', 'Responsible comparison keeps both achievement and asymmetry visible. Schopenhauer elevated Indian thought within a European culture that often dismissed it, yet he relied on a narrow textual route and broad civilizational generalizations. Later philology changed translations and historical understanding. The productive question is therefore not whether he “got India right” in the abstract, but what this mediated encounter allowed him to see, transform, and misrecognize.'],
    cautions: ['Schopenhauer did not read Sanskrit originals and should not be assigned direct mastery of Indian traditions.', 'His system must not be equated with Vedānta or Buddhism as a whole.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:David_d%27Angers_-_Portrait_d%27Abraham-Hyacinthe_Anquetil-Duperron_(1731-1805),_orientaliste.jpg',
  }),
  curated({
    id: 'schopenhauer-pessimism-afterlife', assetId: 'value-schopenhauer-monument-frankfurt', parent: 'schopenhauer',
    displayName: 'Pessimism’s Public Afterlife', shortTitle: 'Pessimism Beyond Temperament', focus: 'PESSIMISM · STRIVING, SUFFERING, COMPASSION, ART, AND ASCESIS', dateLabel: 'Frankfurt monument erected 1895 · photographed 2010',
    question: 'Does pessimism merely declare life bad, or diagnose a structure of striving while testing possible forms of release?',
    lead: 'The Frankfurt monument marks Schopenhauer’s public canonization after the years when his principal work found few readers. “Pessimism” here is not simply a gloomy disposition or the claim that every moment is painful. It is a structural diagnosis: willing begins from lack, satisfaction is brief, new desire follows, and boredom threatens when no aim occupies us. The same system, however, asks whether aesthetic attention, compassion, and ascetic denial can loosen the hold of individuated striving.',
    ideas: ['Schopenhauer describes individual existence as oscillating between need and boredom, with temporary satisfaction unable to settle will once and for all. Competition intensifies this structure because objectified wills obstruct one another. The argument aims beyond a tally of pleasures and pains: even fortunate lives remain organized by restless pursuit, vulnerability, aging, and the destruction of what attachment values.', 'Compassion is the ethical counterforce to egoistic separation. In responding directly to another’s suffering, an agent acts as though the boundary between “mine” and “yours” were not metaphysically final. Aesthetic contemplation suspends willing briefly; ascetic denial seeks a more radical quieting. These responses differ, and none should be treated as a cheerful correction that erases the pessimistic diagnosis.', 'A monument turns a once-marginal polemicist into civic heritage. It can honor the seriousness of his challenge while smoothing away the hostile rhetoric, misogyny, racial hierarchy, and sweeping cultural judgments in his writings. Canonization is therefore itself an interpretive act: later publics choose which Schopenhauer to remember, and responsible reception must preserve philosophical insight without hiding exclusion behind the bronze image.'],
    cautions: ['Do not reduce the system to Schopenhauer’s temperament or a slogan that nothing matters.', 'His harsh claims about women and other peoples require direct acknowledgment rather than biographical excuse.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:FFM_Wallanlagen_Schopenhauer-Denkmal.jpg',
  }),
  curated({
    id: 'kierkegaard-indirect-communication', assetId: 'value-kierkegaard-copenhagen-salon', parent: 'kierkegaard',
    displayName: 'A Single Individual Enters the Room', shortTitle: 'Indirect Communication', focus: 'AUTHORSHIP · PSEUDONYMS, IRONY, ROLES, AND APPROPRIATION', dateLabel: 'Pseudonymous works concentrated 1843–1846 · drawing 19th century',
    question: 'Why might a philosopher construct voices and situations instead of delivering a doctrine in a single authoritative voice?',
    lead: 'Klæstrup’s salon places Kierkegaard inside a social field of posture, observation, performance, and conversation. His authorship likewise constructs situations rather than presenting one doctrine under one authoritative name. Either/Or gives competing papers to aesthetic and ethical voices; Johannes de Silentio examines faith without claiming to possess it; Johannes Climacus writes as a humorist outside Christianity. Signed religious discourses run alongside these books, complicating any attempt to let one pseudonym speak for the author.',
    ideas: ['Indirect communication makes the reader’s way of existing part of the philosophical problem. A definition can transmit information, but Kierkegaard asks how truth becomes appropriated in choice, passion, repentance, or faith. Dramatic voices prevent the reader from remaining a neutral collector of conclusions: one must notice how each speaker lives, evades, risks, and addresses another person.', 'The pseudonyms disagree and occupy deliberately limited positions. The aesthete “A,” Judge William, de Silentio, Climacus, and Anti-Climacus cannot be stacked into a ladder whose final rung automatically equals Kierkegaard’s private opinion. Their names, genres, jokes, prefaces, and internal tensions provide evidence about the stance from which each claim is made. Attribution therefore belongs to interpretation, not clerical sorting.', 'The “single individual” does not require contempt for friendship or retreat from every community. It names accountable appropriation: a crowd, church register, newspaper public, or philosophical system cannot believe, choose, or answer ethically on someone’s behalf. The salon image matters because individuality emerges amid social roles. Kierkegaard’s question is how a person relates to those roles without dissolving responsibility into them.'],
    cautions: ['Johannes de Silentio, Climacus, and Anti-Climacus are not transparent mouthpieces.', 'Kierkegaard is a major precursor to existentialism, not simply a member of a later school.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Peter_Christian_Kl%C3%A6strup_-_S%C3%B8ren_Kierkegaard_i_en_salon_i_K%C3%B8benhavn.png',
  }),
  curated({
    id: 'kierkegaard-fear-trembling', assetId: 'value-caravaggio-sacrifice-isaac', parent: 'kierkegaard',
    displayName: 'Abraham Before the Ethical', shortTitle: 'Fear and Trembling', focus: 'FEAR AND TREMBLING · FAITH, ETHICS, SILENCE, AND PARADOX', dateLabel: 'Published under Johannes de Silentio, 1843 · painting c. 1603',
    question: 'Can Abraham be understood ethically, or does the story expose a religious demand that ethical language cannot mediate?',
    lead: 'Caravaggio renders the terror that philosophical shorthand can domesticate: a father restrains his son as the blade approaches, while an angel interrupts the act. In Fear and Trembling, the pseudonymous Johannes de Silentio repeatedly retells Genesis 22, inventing alternative Abrahams who lose faith, lose Isaac, or cannot recover ordinary joy. He admires Abraham yet insists that he cannot understand or imitate the movement of faith. The distance between narrator and figure is part of the book’s argument.',
    ideas: ['The ethical prohibition against killing remains fully present rather than vanishing inside piety. De Silentio describes the ethical as the universal demand that makes action intelligible to others. Abraham cannot explain himself as a tragic hero sacrificing one finite duty for a higher public good; judged in that register alone, he appears either a murderer or someone under a terrible temptation.', 'The “teleological suspension of the ethical” names a paradox, not a reusable religious exemption. Abraham is said to stand in an absolute relation to the absolute while also expecting, “by virtue of the absurd,” to receive Isaac back. Infinite resignation would surrender the finite; faith makes the double movement of renunciation and renewed trust. De Silentio presents this as something his own reflective understanding cannot perform.', 'Silence isolates Abraham because no public reason can translate his relation to God into a rule shared by observers. That feature makes the text ethically dangerous as well as philosophically powerful. A self-declared private command cannot establish that one is Abraham rather than deluded or violent. The work intensifies responsibility by withholding an external test; it does not license certainty to exempt itself from scrutiny.'],
    cautions: ['The text cannot responsibly serve as blanket permission to override ethics by private certainty.', 'Caravaggio’s painting predates Kierkegaard and is an interpretive encounter, not his illustration.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Sacrifice_of_Isaac-Caravaggio_(Uffizi).jpg',
  }),
  curated({
    id: 'kierkegaard-christendom-attack', assetId: 'value-church-our-lady-copenhagen', parent: 'kierkegaard',
    displayName: 'Faith Inside—and Against—Christendom', shortTitle: 'The Attack on Christendom', focus: 'CHRISTIANITY · INSTITUTION, DISCIPLESHIP, OFFENSE, AND COMFORT', dateLabel: 'Final public attack, 1854–1855 · church photograph 1880–1910',
    question: 'What happens when social membership in an established church substitutes for the demanding task of Christian existence?',
    lead: 'The Church of Our Lady gives architectural form to Copenhagen’s established Lutheran Christianity, where baptism, citizenship, clergy, and public respectability reinforced one another. Kierkegaard’s final polemic did not begin as an external rejection of Christianity. After Bishop J. P. Mynster died in 1854, Hans Lassen Martensen publicly praised him as a “witness to the truth.” Kierkegaard disputed that title, then used newspaper articles and the pamphlet series The Moment to attack the comfortable identification of Denmark with a Christian society.',
    ideas: ['Institutional success can obscure the standard from which an institution claims authority. Kierkegaard compares salaried clergy, social prestige, and routine observance with New Testament images of costly discipleship and persecution. His charge is not merely that individual pastors are hypocrites; a whole arrangement can reward people for lowering a demand while continuing to speak in its name.', 'Kierkegaard contrasts cultural membership with “imitation,” the effort to follow Christ through concrete self-denial, risk, love, and responsibility. He thinks admiration from a safe distance can neutralize the model being admired. This contrast extends his lifelong concern with becoming a Christian rather than treating Christianity as inherited information, although the late attack adopts a more direct and accusatory voice than much of the pseudonymous authorship.', 'Critique from within a tradition can be especially severe because it accepts the authority of the standard used in judgment. Yet the photograph also warns against reducing religious life to one polemicist’s account of an institution. Congregational practices, care, liturgy, and community do not disappear because Kierkegaard foregrounds compromise. His argument tests Christendom’s claims; it does not provide a complete sociology of Danish believers.'],
    cautions: ['The later cathedral photograph is context, not a scene of Kierkegaard writing the polemic.', 'His attack on establishment should not be simplified into hostility toward every communal religious practice.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Interieur_van_de_Vor_Frue_Kirke_in_Kopenhagen,_RP-F-F18138.jpg',
  }),
  curated({
    id: 'dostoevsky-brothers-karamazov', assetId: 'value-brothers-karamazov-contemplator', parent: 'dostoevsky',
    displayName: 'The Brothers Karamazov', shortTitle: 'The Brothers Karamazov', focus: 'IVAN · INNOCENT SUFFERING · FREEDOM, SECURITY, RESPONSIBILITY, AND ACTIVE LOVE', dateLabel: 'Novel serialized 1879–1880 · Kramskoi painting 1876',
    question: 'Can any cosmic harmony justify innocent suffering, and can security purchased by surrendering freedom still respect the person?',
    lead: 'Dostoevsky’s final novel places its largest questions inside a damaged family. Ivan refuses a cosmic harmony bought with the suffering of innocent children; his Grand Inquisitor argues that most people will trade unbearable freedom for miracle, authority, bread, and security. Zosima and Alyosha answer without explaining suffering away: responsibility and active love must become concrete practices of attention, service, confession, and forgiveness.',
    ideas: ['Kramskoi’s solitary “contemplator” holds thought and possible action in suspension. Dostoevsky invokes this peasant type when characterizing Smerdyakov, but the painting is not a commissioned illustration or a portrait of the fictional character. Its stillness opens the novel’s question of when inward stories become evasions of responsibility.', 'Ivan does not merely offer a proof against God. He refuses to accept a final order that would make an abused child’s pain a necessary price. In the Grand Inquisitor poem, compassionate paternalism becomes domination: authority relieves people of freedom by treating them as too weak to bear it, exchanging responsible agency for managed contentment.', 'Zosima and Alyosha do not defeat Ivan with a total explanation. Active love responds locally and repeatedly to persons who cannot be reduced to examples in a system. Shared responsibility does not blame victims for their suffering; it asks each agent to answer for the relationships and institutions that indifference helps sustain.'],
    cautions: ['The novel preserves Ivan’s protest as intellectually powerful; Zosima’s response should not be presented as a simple logical refutation.', 'Kramskoi’s 1876 painting is a documented interpretive companion, not an illustration commissioned or endorsed by Dostoevsky.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Kramskoi_Meditator_1876.jpg',
  }),
  curated({
    id: 'nietzsche-birth-tragedy', assetId: 'value-greek-tragedy-mask-taranto', parent: 'nietzsche',
    displayName: 'Tragedy Before Theory', shortTitle: 'The Birth of Tragedy', focus: 'TRAGEDY · APOLLONIAN, DIONYSIAN, FORM, AND SUFFERING', dateLabel: 'The Birth of Tragedy published 1872 · ancient mask in Taranto',
    question: 'How can tragic art give form to suffering without denying the forces that undo every stable form?',
    lead: 'The terracotta mask returns Nietzsche’s first book to theatrical bodies, voices, ritual, and crafted appearance. The Birth of Tragedy argues that Attic tragedy joined two artistic drives: the Apollonian production of individuated images and measured form, and the Dionysian experience of music, intoxication, suffering, and the breakdown of individuality. Nietzsche framed this union through Schopenhauer’s metaphysics and his hopes for Wagnerian music drama, making the book both an account of Greece and an intervention in nineteenth-century German culture.',
    ideas: ['The mask joins a stable visible form to a performer’s moving body and voice. That tension helps clarify why “Apollonian” and “Dionysian” are not labels for two personality types or fixed groups of gods. They are interpretive forces whose temporary artistic conjunction lets a bounded character appear while choral music and tragic destruction expose the fragility of individuation.', 'Tragedy does not solve suffering by proving that events end well. Nietzsche claims that art can make existence affirmable without denying terror, loss, and contradiction. His controversial decline narrative blames Euripidean drama and Socratic rationalism for demanding that the world become intelligible before it can be justified, opposing that optimism to the tragic wisdom he associates with Aeschylus and Sophocles.', 'Classical philologists, most famously Ulrich von Wilamowitz-Moellendorff, attacked the book’s evidence and method. Nietzsche’s 1886 “Attempt at a Self-Criticism” later called it badly written, overly romantic, and burdened by Schopenhauerian and Kantian formulas, even as he retained its problem of affirming life. The ancient object therefore opens a historical argument; it does not authenticate his reconstruction of Greek culture.'],
    cautions: ['The Apollonian–Dionysian opposition is not an uncontested ancient Greek consensus.', 'The displayed mask has no documented connection to Nietzsche or a specific tragedy.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Greek_mask_in_terracotta_in_Museo_archeologico_nazionale_(Taranto).jpg',
  }),
  curated({
    id: 'nietzsche-lou-interlocutor', assetId: 'value-lou-andreas-salome-elvira-1897', parent: 'nietzsche',
    displayName: 'Lou Andreas-Salomé: Interlocutor, Not Episode', shortTitle: 'Andreas-Salomé as Thinker', focus: 'INTERLOCUTOR · PHILOSOPHY, AUTHORSHIP, DESIRE, AND BIOGRAPHICAL MYTH', dateLabel: 'Nietzsche–Rée encounter 1882 · Atelier Elvira portrait c. 1897',
    question: 'What is lost when an independent writer is remembered chiefly through a rejected proposal and a famous philosopher’s crisis?',
    lead: 'Lou Andreas-Salomé was a novelist, essayist, critic, and later psychoanalytic writer whose intellectual life crossed philosophy, literature, religion, sexuality, and psychology. In 1882 she, Paul Rée, and Nietzsche explored plans for a shared life of study; Nietzsche also proposed marriage, and the relationship soon fractured amid conflicting desires and hostility from his family. Her c. 1897 Atelier Elvira portrait enters the gallery well after that episode, refusing the fiction that her identity belongs inside Nietzsche’s crisis.',
    ideas: ['A later lifetime portrait makes an independent career visible beyond the encounter. Andreas-Salomé published fiction and studies of Ibsen, Rilke, religion, erotic life, and psychoanalysis; her 1894 book on Nietzsche offered an early psychological interpretation of his work. Readers may dispute her analyses without reducing the analyst to a biographical accessory, muse, or rejected beloved.', 'Intellectual relationships mix admiration, disagreement, desire, competition, and unequal retrospective narration. Andreas-Salomé, Rée, and Nietzsche did not share one settled “trinity” or identical expectations about friendship. Letters and later memoirs preserve partial, strategic accounts. Nietzsche’s sister Elisabeth also shaped a hostile image of Andreas-Salomé that influenced subsequent biography, making source criticism essential to any reconstruction.', 'Biographical causation becomes unreliable when each later concept is traced to one dramatic episode. The collapse of the 1882 plans affected Nietzsche during an already difficult period, but recurrence, self-overcoming, critique of morality, and stylistic experimentation have broader textual histories. Centering Andreas-Salomé as a thinker produces a better question: how did two authors read, challenge, and later represent one another under unequal conditions of canonization?'],
    cautions: ['The portrait was made about fifteen years after the 1882 relationship.', 'Do not reduce Andreas-Salomé to muse, femme fatale, or cause of Nietzsche’s philosophical development.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Lou_Andreas-Salom%C3%A9_-_Foto_Atelier_Elvira.jpg',
  }),
  curated({
    id: 'nietzsche-writing-machine', assetId: 'value-nietzsche-writing-ball', parent: 'nietzsche',
    displayName: 'The Writing Ball Experiment', shortTitle: 'Nietzsche’s Writing Machine', focus: 'MEDIUM · BODY, EYESIGHT, TYPE, APHORISM, AND CONSTRAINT', dateLabel: 'Nietzsche used the Malling-Hansen writing ball in 1882',
    question: 'How does a writing technology enter thought when the body can no longer sustain familiar habits of reading and composition?',
    lead: 'Nietzsche experimented with Rasmus Malling-Hansen’s compact writing ball in 1882 amid severe eyesight problems, headaches, and the difficulty of sustained handwriting. The hemispherical machine arranged keys above a paper carriage and promised rapid touch-typing, though mechanical problems and the demands of learning it limited Nietzsche’s use. Its survival makes composition materially strange: philosophy appears not as disembodied thought poured into words, but as work negotiated among eyes, fingers, posture, paper, climate, and an imperfect device.',
    ideas: ['The object redirects attention from pure ideas toward bodily conditions. Nietzsche often dictated to friends, relied on correspondents, changed locations for health, and composed in notebooks as well as letters and publications. The writing ball belongs to that larger ecology of assistance and constraint. It did not remove the body from writing; it reorganized which capacities and frustrations mattered.', 'A medium offers possibilities that an author may adapt, resist, or abandon. The machine could produce visible type without conventional pen strokes, but correction, maintenance, ribbon performance, and keyboard practice shaped its usefulness. Surviving typed material and correspondence establish an experiment, not a stable workflow. Claims about what the machine “made Nietzsche think” therefore require more evidence than suggestive resemblance between technology and prose.', 'Nietzsche’s use of aphorism predates 1882 and draws on moralists, philological notebooks, compressed polemic, and his own changing literary aims. Later writing also mixes aphorism with songs, parables, genealogical essays, and sustained argument. The writing ball can illuminate the material history of style without becoming a technological origin myth in which one unusual object explains an entire philosophy.'],
    cautions: ['Do not claim the writing ball caused Nietzsche’s aphoristic style.', 'The object’s survival does not disclose exactly which passages were composed on it.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Nietzsches_Schreibkugel_%22Malling_Hansen%22.jpg',
  }),
  curated({
    id: 'nietzsche-eternal-recurrence', assetId: 'value-nietzsche-stone-surlej', parent: 'nietzsche',
    displayName: 'The Stone of Eternal Recurrence', shortTitle: 'Recurrence near Surlej', focus: 'RECURRENCE · AFFIRMATION, TIME, TEST, AND INTERPRETATION', dateLabel: 'Thought associated with August 1881 · stone photographed 2009',
    question: 'Could one affirm life so fully as to will its recurrence, including suffering, contingency, and everything one did not choose?',
    lead: 'Nietzsche later associated the recurrence thought with an August 1881 walk beside Lake Silvaplana, near the hamlet of Surlej and a pyramidal rock. The Gay Science first published its most famous dramatic version in 1882: a demon asks whether one could bear to live this same life, in every detail, innumerable times. Thus Spoke Zarathustra later makes recurrence central but indirect, voiced through riddles, animals, visions, and Zarathustra’s struggle to teach what he can barely endure.',
    ideas: ['The boulder and recurring Alpine landscape give material force to return, but neither proves a physical theory. Nietzsche’s notebooks explore arguments about finite forces in infinite time, yet unpublished notes do not automatically carry the status of a completed doctrine. The marked site is a geography of memory and tourism built from his retrospective account, not an experimental demonstration of cosmic repetition.', 'Recurrence tests whether affirmation can include the smallest detail rather than an edited ideal life. The demon’s challenge encompasses suffering, failure, chance, and every unwanted relation—not only moments one would gladly repeat. It radicalizes Nietzsche’s concern with amor fati by asking whether a person can cease demanding that the past be otherwise, while leaving open what such willing would mean in practice.', 'Its unresolved status is philosophically productive. Cosmological hypothesis, ethical thought experiment, existential measure, and literary image need not collapse into one interpretation, but neither are they unrelated. The texts alter the question by changing speaker and genre. A responsible reading distinguishes published formulations from notebook speculation and treats ambiguity as evidence to interpret, not a gap filled by a motivational slogan.'],
    cautions: ['The stone is near Surlej, not Sils Maria proper.', 'Do not present recurrence automatically as settled cosmology or a simple motivational slogan.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Nietzsche-Stein_01.jpg',
  }),
  curated({
    id: 'nietzsche-archive-afterlife', assetId: 'value-villa-silberblick-archive', parent: 'nietzsche',
    displayName: 'Who Edited Nietzsche?', shortTitle: 'The Nietzsche Archive', focus: 'ARCHIVE · EDITION, SISTER, RECEPTION, POWER, AND DISTORTION', dateLabel: 'Nietzsche Archive at Villa Silberblick from 1896 · photograph 2021',
    question: 'How can an archive, editor, and political reception reorganize fragments into an author the author never made?',
    lead: 'Villa Silberblick housed the Nietzsche Archive after Elisabeth Förster-Nietzsche moved it to Weimar in 1896. Nietzsche had been incapacitated since 1889 and could not supervise the institution that controlled manuscripts, editions, visitors, photographs, and his public image. Förster-Nietzsche’s editorial program and political networking helped construct a posthumous author suited to nationalist reception. Most consequentially, notebook selections were arranged under the title The Will to Power and presented as though Nietzsche had completed a systematic final book.',
    ideas: ['An archive is an institution that orders evidence rather than a neutral container. Decisions about cataloguing, access, transcription, publication, portraiture, and hospitality determine what scholars and publics can see. Villa Silberblick also became a ceremonial site around the living but unresponsive philosopher. Its architecture therefore represents the production of authority as much as the preservation of paper.', 'Nietzsche’s notebook fragments require dating, sequence, and comparison with works he chose to publish. The Will to Power editions of 1901 and 1906 selected and rearranged entries from different contexts, creating an apparent system Nietzsche never authorized in that form. Later critical editorial work, especially by Giorgio Colli and Mazzino Montinari, challenged this construction by restoring chronological and manuscript relationships.', 'Rejecting appropriation does not make every troubling passage an editorial invention. Förster-Nietzsche’s archive encouraged nationalist and, later, Nazi receptions; Hitler’s visits became part of the site’s political theater. Nietzsche himself opposed German nationalism and antisemitism, yet his published works contain hierarchy, anti-egalitarianism, contempt for democracy, and rhetoric of breeding and domination. Accuracy requires distinguishing distortion from text without using either to erase the other.'],
    cautions: ['The Will to Power is not a completed or authorized Nietzsche book.', 'Do not equate Nietzsche with Nazi ideology or use the distinction to sanitize troubling claims in his texts.'],
    imageSource: 'https://commons.wikimedia.org/wiki/File:Villa_Silberblick.jpg',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

type InstallationKind = 'value-work' | 'value-context' | 'value-concept';
const layout = (
  id: FaithPessimismValueSupplementalExhibitId,
  parentExhibitId: 'schopenhauer' | 'kierkegaard' | 'dostoevsky' | 'nietzsche',
  zoneId: 'nineteenth-will-pessimism' | 'nineteenth-faith-subjectivity' | 'nineteenth-genealogy-value',
  position: {x: number; z: number},
  rotationY: number,
  assetId: FaithPessimismValueGalleryAssetId,
  mediaWidth: number,
  mediaHeight: number,
  installationKind: InstallationKind,
  accent: string,
) => authorSupplementalLayout({
  id: id as MuseumSupplementalExhibitId,
  parentExhibitId,
  guidedAfterExhibitId: parentExhibitId,
  zoneId,
  position,
  rotationY,
  assetId: assetId as MuseumAssetId,
  mediaWidth,
  mediaHeight,
  installationKind: installationKind as MuseumSupplementalInstallationKind,
  accent,
});

export const FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  layout('schopenhauer-kant-and-representation', 'schopenhauer', 'nineteenth-will-pessimism', {x: -5.55, z: -26.88}, 0, 'value-kant-hagemann-bust', 2.02, 2.7, 'value-concept', FAITH_PESSIMISM_VALUE_PALETTE.gold),
  layout('schopenhauer-frankfurt-work', 'schopenhauer', 'nineteenth-will-pessimism', {x: -5.55, z: -10.4533}, Math.PI, 'value-schopenhauer-house-1861', 3.15, 2.44, 'value-context', FAITH_PESSIMISM_VALUE_PALETTE.forest),
  layout('schopenhauer-music-and-wagner', 'schopenhauer', 'nineteenth-will-pessimism', {x: 5.55, z: -26.88}, 0, 'value-wagner-met-portrait', 1.85, 2.7, 'value-context', FAITH_PESSIMISM_VALUE_PALETTE.wine),
  layout('schopenhauer-oupnekhat-route', 'schopenhauer', 'nineteenth-will-pessimism', {x: 5.55, z: -10.4533}, Math.PI, 'value-anquetil-duperron-medallion', 2.68, 2.7, 'value-context', FAITH_PESSIMISM_VALUE_PALETTE.violet),
  layout('schopenhauer-pessimism-afterlife', 'schopenhauer', 'nineteenth-will-pessimism', {x: 10.85, z: -18.6667}, -Math.PI / 2, 'value-schopenhauer-monument-frankfurt', 2.02, 2.7, 'value-context', FAITH_PESSIMISM_VALUE_PALETTE.midnight),
  layout('kierkegaard-indirect-communication', 'kierkegaard', 'nineteenth-faith-subjectivity', {x: -5.55, z: -8.2133}, 0, 'value-kierkegaard-copenhagen-salon', 3.18, 2.38, 'value-concept', FAITH_PESSIMISM_VALUE_PALETTE.violet),
  layout('kierkegaard-fear-trembling', 'kierkegaard', 'nineteenth-faith-subjectivity', {x: -5.55, z: 8.2133}, Math.PI, 'value-caravaggio-sacrifice-isaac', 3.18, 2.45, 'value-work', FAITH_PESSIMISM_VALUE_PALETTE.wine),
  layout('kierkegaard-christendom-attack', 'kierkegaard', 'nineteenth-faith-subjectivity', {x: 5.55, z: -8.2133}, 0, 'value-church-our-lady-copenhagen', 2.08, 2.7, 'value-context', FAITH_PESSIMISM_VALUE_PALETTE.gold),
  layout('dostoevsky-brothers-karamazov', 'dostoevsky', 'nineteenth-faith-subjectivity', {x: 5.55, z: 8.2133}, Math.PI, 'value-brothers-karamazov-contemplator', 1.71, 2.7, 'value-work', FAITH_PESSIMISM_VALUE_PALETTE.forest),
  layout('nietzsche-birth-tragedy', 'nietzsche', 'nineteenth-genealogy-value', {x: -5.55, z: 10.4533}, 0, 'value-greek-tragedy-mask-taranto', 3.18, 2.12, 'value-work', FAITH_PESSIMISM_VALUE_PALETTE.gold),
  layout('nietzsche-lou-interlocutor', 'nietzsche', 'nineteenth-genealogy-value', {x: -5.55, z: 26.88}, Math.PI, 'value-lou-andreas-salome-elvira-1897', 1.85, 2.7, 'value-context', FAITH_PESSIMISM_VALUE_PALETTE.wine),
  layout('nietzsche-writing-machine', 'nietzsche', 'nineteenth-genealogy-value', {x: 5.55, z: 10.4533}, 0, 'value-nietzsche-writing-ball', 3.18, 2.05, 'value-context', FAITH_PESSIMISM_VALUE_PALETTE.midnight),
  layout('nietzsche-eternal-recurrence', 'nietzsche', 'nineteenth-genealogy-value', {x: 10.85, z: 18.6667}, -Math.PI / 2, 'value-nietzsche-stone-surlej', 3.05, 2.29, 'value-concept', FAITH_PESSIMISM_VALUE_PALETTE.alpine),
  layout('nietzsche-archive-afterlife', 'nietzsche', 'nineteenth-genealogy-value', {x: 5.55, z: 26.88}, Math.PI, 'value-villa-silberblick-archive', 2.02, 2.7, 'value-context', FAITH_PESSIMISM_VALUE_PALETTE.forest),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getFaithPessimismValueSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 21 supplemental exhibit ${id} is missing.`);
  return record;
};
