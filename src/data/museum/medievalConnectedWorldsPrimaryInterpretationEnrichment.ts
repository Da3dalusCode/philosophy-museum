import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';

type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

const lead = (historicalFrame: string, interpretiveStakes: string): string =>
  `${historicalFrame} ${interpretiveStakes}`;

const standard = (
  name: string,
  paragraphs: readonly string[],
  orientation: readonly VisitorGuideSection[],
  assetId: MuseumAssetId,
  objectText: string,
  lock: string,
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
  review: {
    status: 'standard-compliant',
    reviewedOn: '2026-08-09',
    method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.',
    lock,
  },
  objectInterpretations: {[assetId]: objectText},
});

export const MEDIEVAL_CONNECTED_WORLDS_PRIMARY_INTERPRETATION_ENRICHMENT:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  'islamic-philosophy': {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Islamic Philosophy names a diverse field of arguments made in Islamic worlds; it is not the name of one doctrine, one language, or one religious community. Arabic became a major philosophical language, but scholars also wrote and read in Persian, Syriac, Hebrew, Latin, and other languages. Translation mattered because translators, patrons, copyists, commentators, physicians, jurists, and theologians selected texts, made technical vocabularies, corrected inherited materials, and posed questions of their own. The field includes falsafa, often associated with philosophical work shaped by Greek materials, but also meets kalām, law, Sufi inquiry, medicine, mathematics, astronomy, and adab in particular institutions and genres. Those intersections should not erase the differences among disciplines or the Christian, Jewish, and Muslim participants who did not share one social position or intellectual aim.',
      'The questions are correspondingly plural. Thinkers asked how demonstration establishes knowledge, what kinds of causes explain nature, whether being and necessity can be analyzed, how prophecy and imagination relate to understanding, and what law or ethical formation requires. Al-Kindi, al-Farabi, Avicenna, al-Ghazali, Ibn Tufayl, Ibn Rushd, Suhrawardi, and Mulla Sadra mark different routes through those questions, not stages in a single civilizational relay. A familiar tale makes this work a passive preservation of Greek learning for later Europe; another ends the story with al-Ghazali or Ibn Rushd. Both stories miss creative translation, debate, and the substantial post-classical continuities of Avicennian, illuminationist, theological, and commentarial philosophy. Hebrew and Latin translations are important afterlives, but they do not exhaust the field’s histories.',
      'The displayed painting comes from a 1237 manuscript of al-Hariri’s Maqāmāt. It shows a learned gathering and can help a visitor notice the social setting in which texts, speech, and teaching mattered. It cannot document Baghdad’s ninth-century translation circles, identify a particular philosophical lesson, or stand for every community represented here. Its later literary scene is therefore an invitation to ask who is pictured as a knower and how knowledge travels, rather than visual proof for a simplified “House of Wisdom” story. The exhibit follows arguments through texts and their changing readers while keeping the image’s own date, genre, and limits in view.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Ways into the field', items: [
        {label: 'Falsafa', description: 'Philosophical inquiry in Arabic and related languages that creatively engaged Greek, late-antique, and local intellectual materials.'},
        {label: 'Kalām', description: 'Theological dialectic about God, causation, language, and responsibility; it overlaps with philosophy but is not identical to falsafa.'},
      ]},
      {heading: 'Questions carried across traditions', items: [
        {label: 'Demonstration', description: 'A disciplined form of proof whose scope, audiences, and relation to other kinds of argument remained contested.'},
        {label: 'Translation and commentary', description: 'Practices that transformed terminology and arguments through selection, explanation, correction, and disagreement rather than merely copying texts.'},
      ]},
      {heading: 'Historical caution', items: [
        {label: 'Many communities and languages', description: '“Islamic,” “Arabic,” and “Islamicate” overlap but are not interchangeable labels for the people, languages, or institutions involved.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Islamic Philosophy article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:20fe505b3cd89420'},
    objectInterpretations: {
      'islamic-scholarly-lecture-maqamat': 'This 1237 literary manuscript painting visualizes a learned gathering, not the House of Wisdom, a ninth-century translation circle, or a particular philosophical lesson. It helps frame scholarly exchange while its later date and narrative genre limit what it can establish about the field’s origins.',
    },
  },
  'al-kindi': {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Al-Kindi worked in the ninth-century Abbasid network conventionally called the al-Kindi circle. The label marks patronage, translation, revision, and argument; it does not prove he performed every translation or directed each collaborator. He defended the value of taking truth from earlier sources while writing philosophy in Arabic for new questions. His importance therefore lies neither in a lone-founder myth nor in a passive preservation story. His surviving work links first philosophy, divine unity, mathematics, medicine, music, optics, ethics, and language, but the corpus is incomplete and many titles attributed to him are lost or uncertain. Conventional dates are likewise approximate, so a varied intellectual record should not become a falsely detailed biography.',
      'In On First Philosophy, only the first part survives, making it risky to treat the work as a complete system. It argues about the first cause, unity, finitude, and the limits of predication, drawing on materials that were often late-antique and only sometimes straightforwardly Aristotelian. On the Intellect distinguishes an external first intellect from human intellect in potentiality, actuality, and acquired use; its compact terminology should not be replaced with later Farabian or Averroist schemes. Al-Kindi’s sciences are not a modern research program. They ask how mathematical training, observation, language, and causal explanation can discipline inquiry, while some inherited arts now carry very different evidential standing. His Treatise on Cryptanalysis is especially striking for its use of letter frequency, an early surviving extended account of that method rather than the invention of cryptography as such.',
      'The displayed manuscript page contains Arabic prose and a cipher table from a later witness to the Treatise on Cryptanalysis. It makes a particular kind of practical reasoning visible: patterns in written language can be counted and used to test a cipher. The page is not al-Kindi’s autograph, and its copying date cannot be substituted for the ninth-century composition of the work. Nor can one technical treatise establish every part of his metaphysics or the full range of his collaborations. It instead keeps the visitor close to a surviving argument while reminding us how much of al-Kindi’s corpus survives through fragile, later transmission.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Key questions', items: [
        {label: 'First philosophy', description: 'Inquiry into the first cause, unity, and the principles needed to explain the world without treating the surviving treatise as complete.'},
        {label: 'Intellect', description: 'Al-Kindi distinguishes an external first intellect from changing human intellectual capacities; later systems use related words differently.'},
      ]},
      {heading: 'A work and a method', items: [
        {label: 'Treatise on Cryptanalysis', description: 'A surviving work that uses recurring letter frequencies to help break ciphers, connecting language, number, and practical inquiry.'},
        {label: 'Translation circle', description: 'A collaborative, partly reconstructed Abbasid network in which Greek and Syriac materials were rendered and reshaped in Arabic.'},
      ]},
      {heading: 'Reading caution', items: [
        {label: 'Incomplete corpus', description: 'Many works are lost, fragmentary, or uncertainly attributed, so modern reconstructions must distinguish surviving text from reported title.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Al-Kindi article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:7d13f0c75ef63672'},
    objectInterpretations: {
      'al-kindi-cryptanalysis-manuscript': 'This later manuscript witness preserves a page from al-Kindi’s Treatise on Cryptanalysis, including its cipher table. It can establish the work’s later textual transmission and make frequency analysis visible, but it is not al-Kindi’s handwriting or evidence that he alone managed the wider translation network.',
    },
  },
  'al-farabi': {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Al-Farabi asks how forms of knowledge become ordered, teachable, and politically consequential. His writings connect logic, language, classification of the sciences, metaphysics, psychology, music, religion, and political philosophy, but they do not give a single unchanging system with an easily recoverable biography behind it. Much personal information comes from late reports, and even his approximate origins and itinerary remain uncertain. The later honorific “Second Master” records reception rather than an uncontested rank. What survives most securely is a set of arguments about different intellectual arts and about the conditions under which communities can be directed toward happiness. That range matters because al-Farabi does not propose that every claim should be demonstrated in the same way or that scholarship can be detached from education and civic life.',
      'Logic distinguishes demonstration from dialectic, rhetoric, sophistry, and poetics: each has a different relation to truth, persuasion, language, and audience. The Enumeration of the Sciences maps fields rather than merely listing them, while the political works ask how a virtuous community might coordinate knowledge, imagination, law, and leadership. In the Virtuous City, the ruler and city form a normative political-psychological model ordered toward human perfection, not a literal plan for Baghdad or a ready-made constitution. Al-Farabi’s account of religion as civic representation belongs inside that demanding framework; it does not declare all religion irrational imagery. Nor should a disputed work, Harmonization of the Opinions of the Two Sages, be used as simple proof that he authored a fully settled reconciliation of Plato and Aristotle.',
      'The principal object is a 1630 copy of al-Farabi’s discussion of the scope of Aristotle’s Metaphysics. Its paired pages, rubrication, and marginal notes show a text being transmitted and studied roughly seven centuries after al-Farabi’s death. The manuscript can illuminate later readers’ sustained effort to classify philosophical inquiry and clarify a difficult Aristotelian book. It cannot give us an autograph, a reliable portrait, or a transparent record of tenth-century teaching. Its value lies in making commentary a material practice: arguments survive because copyists and readers organize, annotate, and reopen them.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Arts of reasoning', items: [
        {label: 'Demonstration', description: 'Reasoning aimed at scientific knowledge, distinguished from other useful but differently authoritative forms of argument.'},
        {label: 'The five arts', description: 'Demonstration, dialectic, rhetoric, sophistry, and poetics: categories for how arguments address truth, persuasion, and audiences.'},
      ]},
      {heading: 'Political inquiry', items: [
        {label: 'Virtuous City', description: 'A normative account of a community ordered toward happiness through knowledge, education, law, imagination, and leadership—not a civic blueprint.'},
        {label: 'Religion and representation', description: 'A political-philosophical account of how a community can represent truths through images and practices, not a blanket dismissal of religion.'},
      ]},
      {heading: 'Textual caution', items: [
        {label: 'Harmonization', description: 'A work once used to portray al-Farabi as reconciling Plato and Aristotle, though its authorship is seriously disputed.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Al-Farabi article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:be9562f09da02465'},
    objectInterpretations: {
      'al-farabi-metaphysics-bodleian': 'These 1630 pages are a late copy of al-Farabi’s discussion of Aristotle’s Metaphysics. They show the work’s manuscript transmission, annotation, and later study, but they are neither an autograph nor evidence for a detailed reconstruction of al-Farabi’s life or classroom.',
    },
  },
  avicenna: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Avicenna built linked inquiries rather than famous doctrines. Logic trains demonstrative reasoning; natural philosophy studies change and bodies; psychology examines perception, internal senses, self-awareness, and intellect; medicine addresses embodied life; metaphysics asks what it is for things to be possible, necessary, caused, and intelligible. This architecture lets questions about being, soul, and knowledge inform one another, yet it does not make every conclusion equally settled. His Greek inheritance came through late-antique and Arabic philosophical traditions, not from direct possession of a complete Plato or an untouched Aristotle. Later Islamic, Jewish, and Latin readers took up different parts of this work, sometimes adapting them and sometimes making them targets of critique. “Avicennian” is therefore the name of contested afterlives as well as a powerful system.',
      'Essence and existence should not be reduced to the slogan that existence is simply added to an essence. Avicenna considers what a quiddity is independently of whether it is instantiated, then connects possibility, causality, and explanation. His Necessary Existent argument is likewise not a first link in a temporal chain: possible things are dependent in themselves, and the account asks what explains their dependence without making their totality self-explanatory. The Flying Person thought experiment imagines radical sensory deprivation in order to isolate immediate self-awareness. It bears on the soul considered in itself and on whether bodily connection is constitutive, but its inference to an immaterial soul remains debated. The Healing is an encyclopedia, while the Canon of Medicine has a distinct medical history and later authority.',
      'The image is a much later manuscript-style representation of Avicenna teaching pharmacy, reproduced by the Wellcome Collection. It keeps his philosophical and medical reputations together, but it is not a lifetime likeness and cannot establish a recorded lesson, a clinical method, or the truth of a medical doctrine. Its retrospective teaching scene is evidence of how later readers remembered a philosopher-physician. Visitors should use it as a prompt to move between disciplines in the writings, not as a shortcut from portraiture to proof. The system becomes clearer when its arguments are followed in their specific genres and later transmissions.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Metaphysical tools', items: [
        {label: 'Essence and existence', description: 'A distinction used to ask what a thing is and whether it is instantiated, without importing a later textbook formula into Avicenna.'},
        {label: 'Necessary Existent', description: 'The being that is necessary in itself, contrasted with possible things whose existence depends on causes.'},
      ]},
      {heading: 'Mind and method', items: [
        {label: 'Flying Person', description: 'A thought experiment about immediate self-awareness under sensory deprivation; its implications for immateriality remain disputed.'},
        {label: 'Demonstration', description: 'A disciplined form of inquiry that structures Avicenna’s logic and the sciences rather than a catchall for every belief.'},
      ]},
      {heading: 'Major works', items: [
        {label: 'The Healing', description: 'A wide philosophical encyclopedia spanning logic, nature, psychology, and metaphysics.'},
        {label: 'The Canon of Medicine', description: 'A medical work with its own long manuscript and curricular reception, distinct from the philosophical encyclopedia.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Ibn Sina / Avicenna article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:33b7d02761b2112d'},
    objectInterpretations: {
      'avicenna-pharmacy-wellcome': 'This much later teaching image remembers Avicenna as a philosopher and physician. It can support a reception history of that combined reputation, but it is not a lifetime likeness, a record of a historical pharmacy lesson, or evidence for the accuracy of particular medical claims.',
    },
  },
  'al-ghazali': {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Al-Ghazali’s critique works through expertise rather than through a simple refusal of philosophy. In Seljuk-era intellectual life he moved among legal theory, Ashʿari theology, logic, ethical formation, philosophical debate, and Sufi practice. His later account of crisis, departure from Baghdad, and return is a crafted intellectual and spiritual narrative, not an unfiltered diary. That caution helps keep his life from becoming a conversion fable. The central problem is how knowledge, authority, reasoning, and disciplined practice can be responsibly ordered when several learned traditions make rival claims. His use of logic does not entail acceptance of every Avicennian conclusion, and his theological commitments do not make argument superfluous. The result is a complex program of appropriation, criticism, and transformation.',
      'The Incoherence of the Philosophers tests twenty selected positions. Its concluding judgment treats three theses as religiously disqualifying while differentiating other errors and innovations; it does not condemn mathematics, medicine, logic, or inquiry as such. Discussion 17 challenges the claim that an observed causal conjunction is necessary in itself. Whether al-Ghazali’s wider position requires direct occasional creation or permits secondary causes within a stable divine order remains disputed, so “habit” is not a complete solution. The Aims of the Philosophers should not be introduced as a neutral first half of the Incoherence. It is an Arabic adaptation of Avicenna’s Persian Dānishnāma, and its date and relation to the later critique are unsettled. The Revival of the Religious Sciences places learning, intention, virtue, and practice within an ethical and spiritual project.',
      'Kahlil Gibran’s 1917 drawing is an explicitly imaginative portrait made more than eight centuries after al-Ghazali. It cannot establish his appearance, identify a historical setting, or settle the meaning of his crisis and writings. It does show a modern desire to give an influential scholar a memorable face. That reception image is useful precisely when it is not confused with evidence from the eleventh or twelfth century. The exhibit asks visitors to let the critical texts, their genres, and their later debates do the historical work—and to resist the myth that one famous critic simply ended Islamic philosophy.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'How the critique works', items: [
        {label: 'The Incoherence of the Philosophers', description: 'A work that examines twenty selected philosophical theses and makes differentiated judgments rather than rejecting all reason or science.'},
        {label: 'Causation', description: 'Discussion 17 rejects necessary conjunction in the observed world; scholars still dispute how its account of divine agency should be read.'},
      ]},
      {heading: 'Texts in context', items: [
        {label: 'The Aims of the Philosophers', description: 'An Arabic adaptation of Avicenna’s Persian Dānishnāma, not simply a neutral primer written as the first half of the critique.'},
        {label: 'Revival of the Religious Sciences', description: 'A wide work that joins knowledge, intention, ethics, and spiritual discipline in a program of transformed practice.'},
      ]},
      {heading: 'Interpretive caution', items: [
        {label: 'Deliverance from Error', description: 'A crafted retrospective account of intellectual searching, valuable evidence but not an unmediated diary of motives or events.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Al-Ghazali article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:1a7a9c121eaca51a'},
    objectInterpretations: {
      'al-ghazali-gibran-1917': 'Gibran’s 1917 drawing is an imaginative, posthumous portrait. It documents modern reception and the wish to visualize al-Ghazali, but it cannot establish his appearance, the details of his life, or the meaning of his philosophical and theological arguments.',
    },
  },
  averroes: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Ibn Rushd, known as Averroes, wrote as jurist, philosopher, commentator, and physician in Almohad Andalusia and the Maghreb. His work asks how disciplined inquiry relates to revealed Law without making either a slogan for a modern dispute between secular reason and religion. In the Decisive Treatise, philosophical investigation is framed through jurisprudence: what does the Law require or permit for qualified people? Its discussion differentiates audiences, kinds of argument, and risks of misinterpretation. The claim that truth does not oppose truth is not a “double truth” doctrine. It states that sound demonstration and revelation cannot ultimately conflict, while leaving hard questions about interpretation, teaching, and error. Biography also needs restraint: court roles and a later exile are documented more securely than motives, personal teachers, or a simplified political fall.',
      'Averroes’s Aristotelian commentaries come in several genres and stages; the familiar short, middle, and long sequence is useful orientation, not a rigid authorial taxonomy. The Long Commentary on De anima develops a difficult mature account of material and agent intellect, but earlier treatments differ, so it should not become the claim that every human literally shares one mind. His response to al-Ghazali addresses particular philosophical disputes rather than settling an eternal contest between two camps. The Kulliyyat sets out general medical principles, alongside but not reducible to practical bedside medicine. Arabic circulation, Hebrew translation, Latin translation, and later Latin “Averroism” are distinct reception histories. They explain why one author became several contested figures without making those later portraits his complete doctrine.',
      'The exhibited halftone is a later European encyclopaedia portrait digitized by the Wellcome Collection. It presents a turbaned learned man as Averroes, but it is not a lifetime likeness and cannot identify the philosopher’s face, profession, or view of Aristotle. The print is evidence of later European visual reception: it turns a complex Andalusi jurist and commentator into an authoritative image. That makes it a useful warning. Visitors can use the portrait to ask how a reception tradition manufactures intellectual icons, then return to the legal, philosophical, and medical texts where his arguments remain more varied than the image allows.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Law and inquiry', items: [
        {label: 'Decisive Treatise', description: 'A juridical argument about when and for whom the Law requires or permits philosophical investigation and interpretation.'},
        {label: 'Demonstration', description: 'A demanding form of proof, distinguished from other forms of address and linked to questions about qualified audiences.'},
      ]},
      {heading: 'Reading Aristotle', items: [
        {label: 'Commentary genres', description: 'Averroes used compressed, middle, and long explanatory forms among other genres; the tidy three-level taxonomy is only a guide.'},
        {label: 'Long Commentary on De anima', description: 'A mature treatment of soul and intellect whose difficult account of separate intellects should not be reduced to “one shared mind.”'},
      ]},
      {heading: 'Reception', items: [
        {label: 'Latin Averroism', description: 'A later Latin reception category, not a transparent name for Ibn Rushd’s whole doctrine or the only form of his influence.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Ibn Rushd / Averroes article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:4f85c3d3a0412572'},
    objectInterpretations: {
      'averroes-wellcome-portrait': 'This later European printed portrait is not a lifetime likeness of Ibn Rushd. It records a later visual construction of “Averroes” and his authority, but cannot establish his face, an event in his life, or the contents of his legal, philosophical, or medical writings.',
    },
  },
  suhrawardi: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Suhrawardi’s Philosophy of Illumination redirects post-Avicennian inquiry through light, manifestation, self-awareness, and knowledge by presence. The language can tempt a visitor to oppose mystical vision to reasoning, but that is the wrong contrast. Suhrawardi criticizes and refines logical definition, uses argument, and insists that discursive work alone does not exhaust knowing. Knowledge by presence names an immediate relation in which a knower is not first given an external representation of what is known; it is not an invitation to treat every private experience as unchallengeable proof. His light vocabulary organizes degrees of manifestation and dependence, while his allegories and accounts of imaginal reality extend philosophical reflection across genres. These moves make illuminationism a philosophical alternative within a shared argumentative world, not an exit from rational inquiry.',
      'The historical record is also uneven. Suhrawardi studied and traveled through learned centers before his death in Aleppo while still young, but the charges, decision, and exact circumstances of the execution remain disputed. The later label “primacy of essence” can summarize one contrast with Avicennian metaphysics, yet it should not make Suhrawardi’s work a single, fixed doctrine or project onto him a fully developed later illuminationist system. The world of images belongs centrally to his thought, but later commentators elaborate its architecture. The Philosophy of Illumination combines philosophical demonstration, symbolic narrative, and a demand for trained insight; the combination raises enduring questions about how experiential claims can be assessed and taught without reducing them to mere private feeling.',
      'The principal image is an undated, conventional later portrait whose original context is uncertain. It gives Suhrawardi a recognizable face for modern viewers, but it is not a lifetime likeness and cannot establish his appearance, his journey to Aleppo, or the content of illuminationist arguments. The portrait therefore records reception rather than biography. Visitors can set that retrospective image beside the nearby manuscript witnesses to see a better kind of historical evidence: copies and annotations show readers carrying a difficult text forward, even while they do not dissolve uncertainty about the author’s life or settle the interpretation of light.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Ways of knowing', items: [
        {label: 'Knowledge by presence', description: 'Immediate awareness in which what is known is not first encountered as an external representation; it is not a license for unchecked private certainty.'},
        {label: 'Demonstration and insight', description: 'Suhrawardi joins argument to disciplined perception, resisting the false choice between formal reasoning and trained experience.'},
      ]},
      {heading: 'Illuminationist vocabulary', items: [
        {label: 'Light', description: 'A philosophical language for degrees of manifestation, dependence, and intelligibility—not simply a decorative metaphor.'},
        {label: 'World of images', description: 'A domain central to Suhrawardi’s philosophical imagination, later expanded by commentators beyond what one authorial formula can settle.'},
      ]},
      {heading: 'Major work', items: [
        {label: 'Philosophy of Illumination', description: 'Suhrawardi’s major work, combining critique of inherited philosophy, argument, allegory, and a demand for trained insight.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Suhrawardi article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:326b00bf719a738e'},
    objectInterpretations: {
      'suhrawardi-later-portrait': 'This later conventional portrait has an uncertain date and original context. It makes Suhrawardi’s later reception visible, but it is not a lifetime likeness and cannot establish his appearance, biography, or the arguments of the Philosophy of Illumination.',
    },
  },
  'mulla-sadra': {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Mulla Sadra places existence, rather than a fixed inventory of essences, at the center of a post-Avicennian metaphysical inquiry. He transforms Avicennian arguments, illuminationist themes, Twelver Shi‘i theology, mystical interpretation, Qurʾanic exegesis, and hadith commentary without simply fusing them into a harmonious list. The “School of Isfahan” is a later historiographic label, not the name of an institution he founded. His biography also mixes stronger and weaker evidence: study with Mir Damad and Shaykh Bahaʾi is well grounded, while a formal authorization is not preserved; a period of withdrawal at Kahak is probable, but its motives cannot be made into a clean persecution or conversion story. Even the preferred death date, c. 1635/36, competes with a traditional 1640/41 date.',
      'Primacy of existence asks readers to treat quiddities as dependent ways in which reality is understood rather than the ultimate metaphysical starting point. Gradation or modulation of being then explains unity and difference without making the debate between monism and plurality disappear. Substantial motion is not modern particle physics or a slogan that everything is unstable: it concerns change in material substance and helps organize Sadra’s accounts of time and the developing soul. Knowledge by presence and the unity of knower and known reconsider what it means for an intellect to possess an object. His account of imaginal and bodily resurrection argues for personal return through a transformed understanding of body, yet whether it satisfies inherited expectations of bodily resurrection remains a real theological and philosophical dispute.',
      'The displayed sculpture is a modern commemoration, photographed in Shiraz. It testifies to Mulla Sadra’s continuing public significance and to a contemporary effort to give a difficult philosopher a civic image. It cannot show his seventeenth-century appearance, establish a specific episode at Kahak or Isfahan, or validate the metaphysical doctrines named on the plaque. That limit matters because later seminary and South Asian receptions selected and systematized different Sadrian claims rather than preserving one untouched school. The sculpture can therefore prompt a final question: how do institutions remember a thinker whose arguments about existence and transformation resist becoming a settled monument?',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'Metaphysical proposals', items: [
        {label: 'Primacy of existence', description: 'The view that existence is metaphysically primary, while quiddities describe ways reality is understood rather than independent ultimate foundations.'},
        {label: 'Gradation of being', description: 'A way of explaining degrees of reality and dependence that keeps unity and plurality in a continuing philosophical dispute.'},
      ]},
      {heading: 'Change and knowing', items: [
        {label: 'Substantial motion', description: 'Change within material substance, used to rethink time and the soul; it is not a claim about modern physical particles or universal instability.'},
        {label: 'Knowledge by presence', description: 'An account of knowing in which the relation of knower and known is more intimate than possession of an external representation.'},
      ]},
      {heading: 'A continuing debate', items: [
        {label: 'Imaginal and bodily resurrection', description: 'Sadra’s contested account of personal return through a transformed body, debated over whether it meets doctrinal expectations.'},
        {label: 'The Four Journeys', description: 'His major philosophical work, whose broad architecture cannot be reduced to a single doctrine or a simple synthesis of sources.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Mulla Sadra article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and subject-specific visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:74128c3fa39e2a66'},
    objectInterpretations: {
      'mulla-sadra-modern-statue': 'This is a modern commemorative sculpture photographed in Shiraz. It documents contemporary memory of Mulla Sadra, not a seventeenth-century likeness, a record of his withdrawal or teaching, or evidence that any disputed Sadrian doctrine is true.',
    },
  },
  'saadia-gaon': standard(
    'Saadia Gaon',
    [
      'Saadia Gaon worked in the Abbasid-era Jewish world as a Judeo-Arabic theologian, scriptural interpreter, Hebrew philologist, legal authority, liturgist, and communal leader. His *Book of Beliefs and Opinions* is a work of kalām: it argues with Arabic theological methods while reshaping Jewish scriptural and rabbinic materials. That setting should not be reduced to a simple pipeline from Greek philosophy into Judaism, nor should substantial but selective parallels with Muʿtazilite theology become direct dependence on al-Fārābī. Saadia joins creation, divine unity, law, soul, and resurrection to an account of responsible understanding and embodied action.',
      'The book’s four sources of knowledge are sense perception, necessary or first rational knowledge, inferential knowledge, and reliable report or tradition. Reliable report is not sheer deference: public signs, transmission, and coherence with the other sources bear on its warrant. Revelation specifies practices whose particular form reason alone does not determine, while rational commandments concern good and bad that reason can apprehend. Both are divine gifts tied to discipline and reward, not one a regrettable substitute for the other. Saadia’s account of one created soul distinguishes appetitive, spirited, and rational functions and joins the soul to the body for moral action and resurrection. Its cosmology and physiology belong to historical argument, not modern science.',
      'The displayed 2025 photograph shows the restored interior of Ben Ezra Synagogue in Cairo, the institution associated with the Cairo Geniza. It is not a view of Saadia’s tenth-century surroundings, an image of a specific manuscript, or evidence that he used this synagogue. Its relevance lies in the archive later recovered there: Geniza materials preserve Jewish intellectual, liturgical, legal, and communal life, including works by and connected with Saadia. The restored room should prompt questions about how buildings, ritual practice, storage, copying, and rediscovery shape survival. It anchors communal transmission without turning one modern interior into a reconstruction of Saadia’s world.',
    ],
    [
      {heading: 'Four sources of knowledge', items: [
        {label: 'Sense perception and first reason', description: 'Perception supplies experience, while necessary rational knowledge names basic truths reason can immediately grasp.'},
        {label: 'Inference and reliable report', description: 'Reasoning extends knowledge from evidence; warranted tradition depends on public transmission and coherence, not blind acceptance.'},
      ]},
      {heading: 'Law and embodied life', items: [
        {label: 'Rational and heard commandments', description: 'Reason can apprehend some moral goods, while revelation gives particular practices whose form it cannot determine alone.'},
        {label: 'Created soul', description: 'One soul has distinguishable functions and is joined to the body for moral action and resurrection, in a historically situated cosmology.'},
      ]},
      {heading: 'A connected setting', items: [
        {label: 'Jewish kalām', description: 'Saadia argues in an Arabic theological environment while reworking Jewish scriptural, legal, and linguistic materials.'},
        {label: 'Textual practice', description: 'Prayer, commentary, lexicography, and law show that philosophical inquiry circulated through communal forms as well as treatises.'},
      ]},
    ],
    'saadia-baqashah-geniza',
    'Fahd Hashemi’s 2025 photograph shows the restored interior of Ben Ezra Synagogue in Cairo. The synagogue’s Geniza history connects it to later preservation of Jewish texts, including Saadian materials, but the modern interior is not Saadia’s tenth-century setting, a manuscript image, or proof that he used this synagogue. It makes the institutional afterlife of storage and recovery visible without reconstructing his surroundings.',
    'fnv1a64:5aed16e0e017e762',
  ),
  'judah-halevi': standard(
    'Judah Halevi',
    [
      'Judah Halevi was a Hebrew poet and Judeo-Arabic philosopher whose birth is placed probably in the 1070s or 1080s and whose death is dated 1141. His *Kuzari* is a learned dialogue, not a transcript of a historical Khazar debate or a transparent monologue in Halevi’s voice. It uses skeptical philosophical arguments selectively: reason remains valid in demonstrable domains and can test pretensions, but the distinctive certainty of revelation and commandment rests on sensory signs, prophecy, and concurrent, mass-transmitted tradition. That position is neither simple irrationalism nor a proof that tradition automatically warrants itself. The staged voices, poetry, language, land, and practice construct a deliberate alternative to an exclusively demonstrative system.',
      'Halevi’s appeal to *tawātur* concerns public revelation and convergent transmission, more exact than “collective memory.” The Arabic *al-amr al-ilāhī*, often translated “Divine Thing,” has no uncontested modern equivalent: it can name divine presence, influence, or a supra-human prophetic aptitude. Its hierarchical and quasi-biological imagery should be examined, not cleaned into a neutral abstraction. Prophecy, imagination, commandment, Hebrew, and the Land of Israel are consequently tied to a difficult account of a prepared people and way of life. The *Kuzari* asks what demonstration misses, but it does not make every inherited claim immune to inquiry.',
      'This worn Geniza letter is authentic primary evidence in Judah Halevi’s Judeo-Arabic hand, concerning ransom for a female prisoner in Toledo. It records one act of communal life and writing, not a portrait and not evidence for the later Jerusalem-gate legend. Documents do show Halevi sailing from Alexandria in May 1141; current scholarship infers that he arrived and died in the Land of Israel that summer, though direct documentation of arrival is absent. The object brings a much firmer kind of evidence into view: a person writing amid obligation, danger, and community. Let that material letter sharpen the exhibit’s question—what can public transmission, embodied practice, and lived responsibility show that abstract proof alone cannot?',
    ],
    [
      {heading: 'How the dialogue argues', items: [
        {label: 'Selective skepticism', description: 'Philosophical reasoning tests claims and remains valid in its domains, but does not supply revelation’s distinctive certainty for Halevi.'},
        {label: 'Concurrent tradition', description: '*Tawātur* is a public, mass-transmitted tradition of revelation, offered as a contested epistemic argument rather than mere memory.'},
      ]},
      {heading: 'Terms that resist reduction', items: [
        {label: 'The Divine Thing', description: '*Al-amr al-ilāhī* has no single modern equivalent; its imagery of divine influence and prophetic aptitude remains interpretively difficult.'},
        {label: 'Commanded practice', description: 'Ritual, language, land, and communal history are not ornaments around doctrine but elements of the *Kuzari*’s account of knowing.'},
      ]},
      {heading: 'Reading a life carefully', items: [
        {label: 'Kuzari and Dīwān', description: 'The dialogue and Hebrew poems use distinct genres; neither should be reduced to a slogan about faith against reason.'},
        {label: 'The final journey', description: 'Sailing from Alexandria is documented; arrival and death in the Land of Israel are current inferences, while the Jerusalem legend lacks support.'},
      ]},
    ],
    'judah-halevi-letter-geniza',
    'This twelfth-century Judeo-Arabic Geniza letter, Cambridge University Library T-S 8J18.5, is an authentic letter by Judah Halevi concerning ransom for a female prisoner in Toledo. It is primary documentary evidence of his communal writing, not a portrait and not evidence for later travel or death legends. The object makes one situated act of responsibility visible without standing for his entire philosophical corpus.',
    'fnv1a64:45562942cae851b7',
  ),
  maimonides: standard(
    'Maimonides',
    [
      'Maimonides was born in Córdoba in 1138, displaced with his family after Almohad rule, lived in Fez and then Fustat, and worked as jurist, physician, communal leader, and philosophical interpreter in Judeo-Arabic and Hebrew. His *Mishneh Torah* and *Guide for the Perplexed* serve different genres and audiences. They do not yield a frictionless reconciliation of law, scripture, and philosophy. Rather, he reworks Jewish interpretation through Aristotelian and Arabic philosophical traditions while preserving limits, tensions, and pedagogical concealment. Aristotle as read through al-Fārābī and Avicenna is central; Averroes belongs to Maimonides’s contemporary environment and later comparison.',
      'In the *Guide*, negative predication disciplines speech about God without saying nothing at all: action attributes and carefully controlled language still have roles. Creation marks a limit of demonstration. The account of prophecy links an overflow from the Active Intellect through perfected intellect and imagination, while allowing that God may withhold prophecy and treating Moses as exceptional; how naturalized or supernatural this theory is remains disputed. Maimonides’s account of perfection also resists a solitary-intellectual ending. In *Guide* III.54, intellectual apprehension is joined to the practical imitation of God through lovingkindness, righteousness, and justice in governance and action. His deliberate contradictions invite rival esoteric, pedagogical, rationalist, and political readings, not permission to invent a hidden doctrine at will.',
      'The displayed Bodleian leaf is Maimonides’s autograph *Commentary on the Mishnah*, written in Egypt about 1167–68 and preserved as MS Pococke 295, folio 295a. Its revisions and diagram make a rare working page materially present: Judeo-Arabic writing, law, argument, and graphic explanation occur together in the author’s own hand. It is not a page of the *Guide* or *Mishneh Torah*, and one manuscript cannot settle every philosophical position in a varied corpus. Yet its authenticity gives the visitor a more exact encounter than a later imagined portrait. Ask how disciplined interpretation can coordinate law, intellectual humility, and public action while leaving real limits and disagreements visible.',
    ],
    [
      {heading: 'Works and genres', items: [
        {label: 'Mishneh Torah', description: 'A systematic Hebrew legal code whose comprehensiveness serves a different purpose from the *Guide*’s staged philosophical perplexities.'},
        {label: 'Guide for the Perplexed', description: 'A Judeo-Arabic work for a perplexed reader that uses controlled indirection and creates enduring disputes about its pedagogy.'},
      ]},
      {heading: 'Questions under limits', items: [
        {label: 'Negative theology', description: 'Language about God is disciplined through negation and qualified predication, rather than treated as simple silence or ordinary description.'},
        {label: 'Prophecy and perfection', description: 'Intellect, imagination, divine will, ethical action, and governance are connected without a settled formula that removes their tensions.'},
      ]},
      {heading: 'Intellectual setting', items: [
        {label: 'Arabic philosophical inheritances', description: 'Aristotle, al-Fārābī, and Avicenna are important interlocutors, while direct dependence on Averroes should not be presumed.'},
        {label: 'Imitation in action', description: 'The culminating practical ideal includes lovingkindness, righteousness, and justice, even as the relation to contemplation remains contested.'},
      ]},
    ],
    'maimonides-mishnah-autograph',
    'This autograph Judeo-Arabic page from Maimonides’s *Commentary on the Mishnah*, Egypt about 1167–68, is Bodleian Libraries MS Pococke 295, folio 295a. Revisions and a diagram provide direct material evidence of his working hand. It is not a page of the *Guide* or *Mishneh Torah* and cannot settle every philosophical question raised by his larger corpus.',
    'fnv1a64:90e5359883729255',
  ),
  augustine: standard(
    'Augustine',
    [
      'Augustine of Hippo (354–430) reworked Christian doctrine through sustained arguments about will, memory, time, signs, evil, grace, and political community. His North African career moved through rhetoric, Manichaeism, Platonist reading, conversion, and episcopal controversy. The *Confessions* analyzes a divided will within prayer. Its pear theft is not a one-line love of disorder: Augustine distributes the motive among delight in transgression, distorted imitation of freedom, and companionship. The “Platonist books” were likely mediated Latin translations associated with Marius Victorinus, probably including Plotinus and possibly Porphyry, but the exact corpus remains uncertain. Christian appropriation and transformation are not membership in a Neoplatonist school.',
      'Memory and time are inquiries into creaturely relation to God, not detached modern topics. Evil is privation joined to disordered willing; its explanatory force does not dissolve responsibility or suffering. Augustine’s account of freedom develops: early anti-Manichaean works emphasize voluntary responsibility, while later anti-Pelagian writings increasingly stress prevenient and healing grace. Scholars dispute how continuous that development is. In *City of God*, the two cities arise from two loves and do not simply map onto church and state; earthly peace remains mixed. Augustine’s later support for coercion against dissenters, in Letters 93 and 185, is a troubling development of episcopal practice that belongs inside.',
      'The Lateran fresco is a sixth-century image associated with Augustine, made after his death and among the earliest surviving portraits of him. Its weathered face and book belong to early reception, not a likeness made from life or evidence for the claims of the *Confessions* and *City of God*. The painting makes an early authoritative memory visible while the texts and their changing controversies must carry the arguments. This gap between image and evidence is useful: an authoritative face can conceal transformation, disagreement, and political danger. Let the fresco prompt the harder question of how inward examination, grace, interpretation, and communal power can be held together without turning any one into a settled identity.',
    ],
    [
      {heading: 'Reading the arguments', items: [
        {label: 'Divided will and grace', description: 'Augustine analyzes conflicted agency, then develops a later account that gives prevenient and healing grace greater weight.'},
        {label: 'Memory and time', description: 'The *Confessions* treats memory and time as theological-philosophical inquiries, including time as a distension of the mind.'},
      ]},
      {heading: 'Evil, signs, and community', items: [
        {label: 'Privation and disordered love', description: 'Evil lacks independent substance but remains bound to distorted willing, responsibility, and difficult theodicy questions.'},
        {label: 'Two cities and earthly peace', description: 'Two communities arise from opposed loves; they do not neatly identify church and state, and their historical peace is fragile.'},
      ]},
      {heading: 'Necessary cautions', items: [
        {label: 'Platonist inheritances', description: 'Augustine transforms mediated Platonist materials through Christian thought; the precise books and authors he read remain uncertain.'},
        {label: 'Coercion', description: 'His defense of coercion in later episcopal practice is a troubling development, not an incidental detail or harmless application.'},
      ]},
    ],
    'augustine-lateran-fresco',
    'This sixth-century Lateran fresco by an unknown artist is an early posthumous image associated with Augustine. Created after his death, it is reception rather than a portrait made from life and cannot establish his appearance, conversion story, or philosophical doctrine. The book-bearing bishop records early authority while the texts and their historical controversies remain the evidence for the exhibit’s claims.',
    'fnv1a64:dc7ee0bf847acfab',
  ),
  aquinas: {
    lead: '',
    keyIdeas: [],
    keyWorks: [],
    sections: [{heading: '', paragraphs: [
      'Thomas Aquinas worked as a Dominican theologian and philosopher across Paris, Cologne, and Italian study houses. He wrote commentaries, disputed questions, treatises, sermons, and an unfinished Summa while transforming Aristotelian, Augustinian, Neoplatonic, Arabic-Latin, Jewish, patristic, and legal sources. This is not a frictionless synthesis or a medieval consensus. The Summa’s form matters: objections, a response, and replies make disagreement visible within the argument. Famous claims about the Five Ways, analogy, natural law, cognition, and being lose force when detached from that sequence and from the distinct tasks Aquinas assigns to philosophy and sacred teaching.',
      'The Five Ways begin from effects and open a longer inquiry; they do not by themselves establish every divine attribute. Aquinas’s distinction between essence and an act of being helps explain why creatures are dependent rather than self-explanatory. Analogical language allows statements about God without treating divine and creaturely predicates as simply identical or unrelated. Natural law belongs within a larger account of action, habit, virtue, grace, and beatitude, not within a modern policy checklist. Each of these ideas remains tied to arguments, genres, and interlocutors that later readers have selected, criticized, and adapted differently.',
      'Crivelli’s 1476 altarpiece was painted about two centuries after Aquinas’s death. It presents a devotional and institutional Thomas holding a church and book, not an authenticated likeness or a map of the Summa’s arguments. The image makes later authority visible while warning against using canonization as philosophical proof. Aquinas’s real invitation is more demanding: follow how objections reshape a question, notice which sources have been transformed rather than merely borrowed, and keep the unfinished work, its institutional setting, and its contested reception inside the account of a thinker often made to look too settled. Those questions remain more useful than a monument to settled authority.',
    ]}],
    presentation: {mode: 'concise', orientation: [
      {heading: 'How to read Aquinas', items: [
        {label: 'Question and reply', description: 'The Summa stages objections and answers so its conclusions should not be lifted out as isolated slogans.'},
        {label: 'Several sources', description: 'Aristotelian, Christian, Arabic-Latin, Jewish, and other inheritances are transformed within new arguments.'},
      ]},
      {heading: 'Key ideas', items: [
        {label: 'Analogy', description: 'Words about God and creatures are related without having one flatly identical meaning.'},
        {label: 'Natural law', description: 'Part of a wider account of action, virtue, grace, and human fulfillment—not a ready-made policy list.'},
      ]},
      {heading: 'Major work', items: [
        {label: 'Summa theologiae', description: 'An unfinished, highly organized theological work built through questions, objections, replies, and distinctions.'},
      ]},
    ], articleActionLabel: 'Read the full sourced Aquinas article', bodyLayout: 'prose', exhibitLayout: 'object-led', plaqueKicker: '', plaqueSubtitleLines: 4},
    objectInterpretations: {
      'scholastic-aquinas-crivelli': 'Crivelli’s 1476 devotional panel was painted about two centuries after Aquinas’s death. It presents later institutional authority, not an authenticated likeness or an illustration of the Summa’s arguments; book and church should not be mistaken for a complete philosophical system.',
    },
    review: {status: 'standard-compliant', reviewedOn: '2026-08-09', method: 'Reconciled against the current claim-reviewed article, registered sources, and principal-object provenance; object-led presentation and visitor guide reviewed against the locked exhibit standard.', lock: 'fnv1a64:9a8037f0e8d6bb9e'},
  },
  'philosophy-of-religion': {
    lead: lead('Philosophy of religion studies arguments, testimony, experience, practice, interpretation, suffering, authority, and forms of ultimacy across internally diverse traditions. Classical theism is one family of views, not the field’s universal template. Comparison must therefore name texts and questions precisely while leaving room for naturalist, skeptical, feminist, postcolonial, phenomenological, genealogical, and tradition-rooted methods.', 'The gallery begins from specific disagreements: what counts as evidence, how testimony gains authority, whether suffering challenges an ultimate order, how language reaches beyond ordinary objects, and how practices form knowers. It then asks whether inherited categories illuminate or distort the comparison. Difference is preserved without declaring traditions incomparable or secretly identical.'),
    keyIdeas: ['Gods, ultimacy, liberation, and contested categories', 'Reason, testimony, trust, and disagreement', 'Evil, suffering, experience, and religious language', 'Practice, interpretation, authority, and institutions', 'Global comparison without forced sameness'],
    keyWorks: ['Anselm, Proslogion', 'Aquinas, Summa theologiae', 'Al-Ghazali, Incoherence of the Philosophers', 'Hume, Dialogues Concerning Natural Religion', 'Nāgārjuna, Mūlamadhyamakakārikā'],
    sectionCaution: 'Broadening the field’s canon and methods is an active disciplinary proposal, not an accomplished consensus; every comparison needs bounded, tradition-sensitive evidence.',
  },
};
