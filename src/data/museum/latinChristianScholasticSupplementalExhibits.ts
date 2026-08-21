import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
  type SupplementalExhibitAuthoring,
} from './museumSupplementalAuthoring';
import {
  LATIN_SCHOLASTIC_GALLERY_ID,
  LATIN_SCHOLASTIC_ROOM_SIGN_COPY,
} from './latinChristianScholasticGalleryCuration';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from './museumWorldTypes';
import {reviewLatinScholasticSupplementalExhibit} from './latinChristianScholasticSupplementalReview';

export {LATIN_SCHOLASTIC_GALLERY_ID, LATIN_SCHOLASTIC_ROOM_SIGN_COPY};

export const LATIN_SCHOLASTIC_PALETTE = Object.freeze({
  ink: '#211d1a',
  oxblood: '#804b43',
  blue: '#4a6678',
  violet: '#6b5a76',
  green: '#64705a',
  gold: '#a77f3f',
  parchment: '#e6d8bb',
});

const image = (label: string, url: string) => ({label, url, kind: 'collection-record' as const});
const academic = (label: string, url: string) => ({label, url, kind: 'academic-reference' as const});
const primary = (label: string, url: string) => ({label, url, kind: 'primary-text' as const});
const record = (input: Omit<SupplementalExhibitAuthoring, 'panelKicker'>): MuseumSupplementalExhibit =>
  authorSupplementalExhibit({...input, panelKicker: 'Gallery 13 work and context exhibit'});

export const LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBITS = [
  record({
    id: 'latin-boethian-logic-curriculum',
    assetId: 'scholastic-boethius-topics',
    displayName: 'Boethius and the Logical Curriculum in Latin',
    shortTitle: 'Boethius: Logic in Latin',
    workLabel: 'TRANSLATION AND COMMENTARY · PORPHYRY AND ARISTOTLE',
    dateLabel: 'Boethius’s logical works, early 6th century · displayed witness is medieval',
    question: 'What must a translator build before a language can sustain a technical curriculum?',
    frontSubtitle: 'Translation, commentary, predicables, categories, inference, terminology, and teaching',
    lead: 'Boethius translated and commented on a substantial part of the Greek logical curriculum, including Porphyry and Aristotle. His Latin terminology and explanatory choices made logic teachable across generations that had sharply reduced access to Greek, while also carrying late-antique interpretive commitments into new schools.',
    keyIdeas: [
      'Translation fixes working distinctions among terms, propositions, predication, and inference.',
      'A commentary can reorganize a source even while presenting itself as explanation.',
      'The surviving “old logic” became intellectual infrastructure, not a sealed ancient deposit.',
    ],
    cautions: [
      'Boethius planned more translations than he completed; the surviving corpus is not all of Plato and Aristotle.',
      'Calling him only a conduit hides his own arguments, theological works, and editorial decisions.',
    ],
    sections: [
      {
        heading: 'An unfinished project still remade a curriculum',
        paragraph: 'Boethius hoped to translate and interpret both Plato and Aristotle and to address their apparent agreement. Execution cut that program short, but his versions and commentaries on logical works gave Latin readers an unusually durable sequence of introductory problems.',
      },
      {
        heading: 'Vocabulary becomes philosophical infrastructure',
        paragraph: 'Rendering Greek distinctions into Latin required more than substituting words. Stable technical usage had to be established, difficult passages divided, rival readings assessed, and examples supplied. Those decisions helped determine which questions later students could formulate precisely.',
      },
      {
        heading: 'Transmission creates new arguments',
        paragraph: 'Porphyry’s decision to postpone the metaphysical status of genera and species became, through Boethian commentary, a productive opening rather than a closed answer. Later debates about universals therefore grew from an inherited text as interpreted, taught, diagrammed, and challenged in Latin.',
      },
    ],
    sources: [
      image('Bibliothèque nationale de France / Wikimedia Commons — Boethius’s translation of Aristotle’s Topics', 'https://commons.wikimedia.org/wiki/File:BnF_lat._1338,_f._221bis-v.JPEG'),
      academic('Stanford Encyclopedia of Philosophy — Anicius Manlius Severinus Boethius', 'https://plato.stanford.edu/entries/boethius/'),
      academic('Stanford Encyclopedia of Philosophy — Medieval Logic', 'https://plato.stanford.edu/entries/logic-medieval/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'boethius'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'latin-consolation-fortune-providence',
    assetId: 'scholastic-consolation-wheel',
    displayName: 'The Consolation of Philosophy: Fortune, Providence, and Freedom',
    shortTitle: 'The Consolation and Fortune',
    workLabel: 'BOETHIUS · CONSOLATION OF PHILOSOPHY',
    dateLabel: 'Composed during imprisonment, c. 523–524 · displayed wheel is later reception',
    question: 'Can philosophical understanding console someone whom fortune has stripped of status and security?',
    frontSubtitle: 'Prose and verse, Lady Philosophy, fortune, happiness, providence, foreknowledge, and freedom',
    lead: 'In a prison dialogue alternating prose and poetry, Lady Philosophy retrains the narrator’s attention from unstable external goods toward happiness, providence, and the highest good. The final problem—how divine foreknowledge can coexist with contingent human choice—makes consolation depend on a demanding account of different modes of knowing.',
    keyIdeas: [
      'Fortune is unstable by definition; her gifts cannot secure the self-sufficient good.',
      'Philosophical therapy works through dialogue, emotional reorientation, argument, and song.',
      'Boethius distinguishes the timeless divine mode of knowing from temporal human prediction.',
    ],
    cautions: [
      'The work’s relationship to Boethius’s Christianity remains debated; it should not be declared either secretly pagan or simply a theological manual.',
      'The wheel shown here belongs to the medieval afterlife of Fortune imagery, not to Boethius’s prison or an authorial manuscript.',
    ],
    sections: [
      {
        heading: 'Fortune teaches by reversing expectations',
        paragraph: 'Lady Philosophy first exposes the contradiction in demanding constancy from Fortune. Wealth, office, fame, bodily pleasure, and power can be lost or divided; each points toward a desired sufficiency it cannot reliably provide.',
      },
      {
        heading: 'Providence is not temporal prediction',
        paragraph: 'The dialogue’s final books distinguish providence’s unified ordering from fate’s unfolding sequence. Divine knowledge is presented as an eternal present rather than advance observation, so knowing an event does not automatically make the event necessary in its own mode.',
      },
      {
        heading: 'A prison book escapes into many traditions',
        paragraph: 'The Consolation became a school text, a source for poetry, and an object of translation across medieval Europe. Its afterlife joined argument to images of Lady Philosophy and Fortune’s wheel, making reception itself part of how the work taught readers to recognize instability.',
      },
    ],
    sources: [
      image('Bayerische Staatsbibliothek / Wikimedia Commons — Wheel of Fortune in the Carmina Burana', 'https://commons.wikimedia.org/wiki/File:Wheel-of-fortune-carmina-burana.jpg'),
      primary('Project Gutenberg — The Consolation of Philosophy', 'https://www.gutenberg.org/ebooks/14328'),
      academic('Internet Encyclopedia of Philosophy — Boethius', 'https://iep.utm.edu/boethius/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'boethius'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'latin-carolingian-copying-script',
    assetId: 'scholastic-caroline-minuscule',
    displayName: 'Carolingian Books: Copying, Script, and Intellectual Reconstruction',
    shortTitle: 'The Carolingian Book',
    workLabel: 'MATERIAL CONTEXT · SCRIPTORIA, LIBRARIES, AND CAROLINE MINUSCULE',
    dateLabel: 'Late 8th–9th centuries · displayed BnF leaf is an early witness',
    question: 'How can changing the material form of books alter what a philosophical culture can recover and teach?',
    frontSubtitle: 'Caroline minuscule, correction, compilation, libraries, court networks, and selective survival',
    lead: 'Carolingian reform encouraged more regular scripts, corrected books, compilation, and exchange among monasteries, courts, schools, and cathedral communities. These practices improved legibility and helped preserve many texts, but preservation was always selective and intellectual reconstruction required readers, translators, patrons, and teachers as well as copyists.',
    keyIdeas: [
      'A more regular bookhand made texts easier to copy, compare, annotate, and circulate.',
      'Libraries and scriptoria were connected institutions rather than isolated storage rooms.',
      'Material preservation and philosophical interpretation continually shaped one another.',
    ],
    cautions: [
      'There was no single uniform “Carolingian Renaissance” experienced everywhere at once.',
      'A script preserves no argument automatically: choices about correction, attribution, excerpting, and teaching remain decisive.',
    ],
    sections: [
      {
        heading: 'Legibility is an intellectual technology',
        paragraph: 'Word separation, recognizable letterforms, punctuation practices, headings, and organized pages reduced some of the friction of reading. They also enabled comparison between copies and made room for correction, glosses, and structured study.',
      },
      {
        heading: 'Books move through networks',
        paragraph: 'Court scholars, monastic communities, bishops, and teachers requested, borrowed, corrected, and recopied works. The survival of an ancient or patristic text could depend on several linked acts of selection rather than one heroic recovery.',
      },
      {
        heading: 'Reconstruction is never neutral',
        paragraph: 'Copyists inherited damaged exemplars, variant readings, uncertain names, and changing educational priorities. A corrected book could clarify one tradition while excluding another, so the material history of a manuscript belongs inside the history of ideas rather than beneath it.',
      },
    ],
    sources: [
      image('Bibliothèque nationale de France / Wikimedia Commons — early Caroline minuscule', 'https://commons.wikimedia.org/wiki/File:Caroline_2.jpg'),
      image('Museum Schnütgen / Wikimedia Commons — Carolingian Gospel book, Saint-Amand', 'https://commons.wikimedia.org/wiki/File:Carolingian_gospel_book,_Saint-Amand,_c._860-880,_parchment_-_Museum_Schn%C3%BCtgen_-_Cologne,_Germany_-_DSC00212.jpg'),
      academic('Stanford Encyclopedia of Philosophy — John Scottus Eriugena', 'https://plato.stanford.edu/entries/scottus-eriugena/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'medieval-scholasticism'},
    entityKind: 'branch',
  }),
  record({
    id: 'latin-eriugena-greek-christian-sources',
    assetId: 'scholastic-eriugena-periphyseon',
    displayName: 'Eriugena’s Periphyseon: Greek Christian Sources Remade in Latin',
    shortTitle: 'Eriugena: Nature and Return',
    workLabel: 'JOHN SCOTUS ERIUGENA · PERIPHYSEON AND TRANSLATION',
    dateLabel: 'Translations from c. 860 · Periphyseon composed in the later 9th century',
    question: 'What happens when translation becomes the starting point for a new account of nature, nonbeing, and return?',
    frontSubtitle: 'Pseudo-Dionysius, Maximus, Gregory of Nyssa, dialectic, negative theology, procession, and return',
    lead: 'Eriugena translated Greek Christian authors and then constructed the Periphyseon as a dialogue whose unusually broad “nature” includes what is and what is not. Its fourfold division traces origin, created causes and effects, and return without naming four independent regions of reality.',
    keyIdeas: [
      'Translation supplied conceptual resources that Eriugena recombined rather than merely repeated.',
      'Negative theology treats denial as necessary when finite predicates are applied to the divine source.',
      'Procession and return organize an account of creation, knowledge, scripture, and human nature.',
    ],
    cautions: [
      'Eriugena had little direct access to pagan Neoplatonists such as Plotinus or Proclus; his Greek materials were principally Christian.',
      'Later accusations of pantheism do not substitute for explaining his difficult distinctions between creator, creation, participation, and return.',
    ],
    sections: [
      {
        heading: 'Translation creates a new Latin archive',
        paragraph: 'Rendering Pseudo-Dionysius, Maximus the Confessor, and Gregory of Nyssa required a Latin vocabulary for causation, participation, theophany, negation, and deification. Eriugena then used those choices as materials for arguments of his own.',
      },
      {
        heading: 'Nature includes being and nonbeing',
        paragraph: 'The Periphyseon tests several senses in which something may be said not to be: because it exceeds understanding, has not yet appeared, is known only through causes, or lacks a fuller actuality. “Nonbeing” therefore does not simply mean nothing.',
      },
      {
        heading: 'The four divisions describe one movement',
        paragraph: 'The famous schema moves from the uncreated source, through primordial causes and created effects, toward a return beyond ordinary division. Its paradoxes are deliberate instruments for thinking how all things depend on a source that cannot be classified as one item within the totality.',
      },
    ],
    sources: [
      image('Bibliothèque nationale de France / Wikimedia Commons — Eriugena in the manuscript tradition', 'https://commons.wikimedia.org/wiki/File:Johannes_Scottus_Eriugena.jpg'),
      academic('Stanford Encyclopedia of Philosophy — John Scottus Eriugena', 'https://plato.stanford.edu/entries/scottus-eriugena/'),
      academic('Stanford Encyclopedia of Philosophy — Pseudo-Dionysius the Areopagite', 'https://plato.stanford.edu/entries/pseudo-dionysius-areopagite/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'eriugena'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'latin-sic-et-non-dialectic',
    assetId: 'scholastic-abelard-apologia-manuscript',
    displayName: 'Sic et Non: Contradiction as a Discipline of Reading',
    shortTitle: 'Abelard’s Sic et Non',
    workLabel: 'PETER ABELARD · SIC ET NON',
    dateLabel: 'Successive versions, approximately 1121–1132 · surviving in multiple manuscripts',
    question: 'Can apparently conflicting authorities train judgment instead of ending inquiry?',
    frontSubtitle: 'Authorities, contradiction, ambiguity, attribution, context, dialectic, and student inquiry',
    lead: 'Abelard’s Sic et Non arranges opposed authoritative statements under theological questions and prefaces them with rules for responsible interpretation. It does not simply celebrate contradiction: it asks readers to examine words, speakers, contexts, textual corruption, recantation, and levels of authority before deciding whether two claims truly conflict.',
    keyIdeas: [
      'A contradiction on the page can expose ambiguity, shifting usage, or incompatible commitments.',
      'The prologue supplies interpretive disciplines while the body leaves much of the resolving work to the reader.',
      'Questioning becomes a route toward sharper judgment rather than an automatic rejection of authority.',
    ],
    cautions: [
      'The work is not proof that Abelard was a modern skeptic who thought every authority false.',
      'Its successive recensions and manuscript witnesses should not be collapsed into one fixed authorial page.',
      'The displayed object is Abelard’s Apologia contra Bernardum, not a Sic et Non witness; the linked CCCC MS 165 is a sixteenth-century paper transcript copied from a Cambridge University Library exemplar, and the linked Wikisource does not identify its edition or source.',
    ],
    sections: [
      {
        heading: 'The archive is staged as a problem',
        paragraph: 'Instead of silently harmonizing inherited statements, Abelard places affirmations and denials where their friction becomes visible. The arrangement makes collection, attribution, and comparison part of philosophical method.',
      },
      {
        heading: 'Words change with speaker and setting',
        paragraph: 'The prologue asks whether a term is being used in the same sense, whether a passage is authentic, whether an author later corrected it, and whether accommodation to an audience explains the wording. Dialectic begins with historical and linguistic care.',
      },
      {
        heading: 'An unresolved page can be pedagogically complete',
        paragraph: 'Sic et Non often withholds a master’s final solution. That incompleteness turns the reader into a participant who must distinguish, test, and reconcile rather than memorize a conclusion already detached from its arguments.',
      },
    ],
    sources: [
      image('Parker Library / Biblissima — CCCC MS 165, a 16th-century paper transcript of Sic et Non copied from a CUL exemplar', 'https://iiif.biblissima.fr/collections/manifest/effc0bdf13faa5662a82718ce560742bad5c63ef'),
      primary('Latin Wikisource — Sic et Non, edition and source unidentified', 'https://la.wikisource.org/wiki/Sic_et_non'),
      academic('Internet Encyclopedia of Philosophy — Peter Abelard', 'https://iep.utm.edu/abelard/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'abelard'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'latin-heloise-love-intention-rule',
    assetId: 'scholastic-heloise-letters',
    displayName: 'Heloise: Love, Intention, Moderation, and the Work of a Rule',
    shortTitle: 'Heloise: A Philosophical Voice',
    workLabel: 'HELOISE AND THE PARACLETE · LETTERS AND INSTITUTIONAL RULE',
    dateLabel: '12th-century correspondence · displayed image belongs to later reception',
    question: 'What changes when love, moral intention, and religious discipline are examined from Heloise’s own institutional position?',
    frontSubtitle: 'Correspondence, intention, selfless love, conscience, moderation, women’s learning, and governance',
    lead: 'Heloise’s letters are not merely evidence for Abelard’s biography. As abbess of the Paraclete, she presses questions about selfless love, intention, hypocrisy, women’s embodied lives, and the fitness of inherited monastic rules. Her arguments join personal candor to the practical responsibility of governing a community.',
    keyIdeas: [
      'Moral assessment cannot be read directly from an outward act while intention and conscience are ignored.',
      'Heloise tests whether apparently selfless love can escape possession, reward, and social calculation.',
      'A rule must be judged by the people, bodies, work, climate, and community it is meant to order.',
    ],
    cautions: [
      'Reducing Heloise to a tragic lover erases her learning, argument, leadership, and institutional authorship.',
      'The correspondence has a complex textual history and should not be treated as an unmediated modern transcript of private feeling.',
    ],
    sections: [
      {
        heading: 'A letter can carry an argument',
        paragraph: 'Heloise uses remembered choices and emotional conflict to ask whether conduct that appears virtuous can be corrupted by fear, convention, or promised reward. Personal address becomes a method for testing general moral claims.',
      },
      {
        heading: 'Love is measured against possession',
        paragraph: 'Her account of preferring the beloved to marriage or status radicalizes the demand that love seek another’s good rather than social advantage. The claim is ethically provocative even where its autobiographical framing and consequences remain contested.',
      },
      {
        heading: 'Moderation becomes responsible government',
        paragraph: 'When Heloise requests a suitable rule for her community, she challenges one-size-fits-all discipline. Attention to food, clothing, labor, liturgy, vulnerability, and local circumstance turns practical accommodation into an argument about the purpose of institutions.',
      },
    ],
    sources: [
      image('Musée Condé / Wikimedia Commons — later manuscript reception of Abelard and Heloise', 'https://commons.wikimedia.org/wiki/File:Abelardo_ed_Eloisa.jpg'),
      image('Cambridge Fleuron / Wikimedia Commons — Letters of Abelard and Heloise ornament, 1718', 'https://commons.wikimedia.org/wiki/File:Letters_of_Abelard_and_Heloise_Fleuron_T084080-9.png'),
      primary('Columbia Epistolae — Heloise, Letter 6 on a rule for the Paraclete', 'https://epistolae.ctl.columbia.edu/letter/902.html'),
      academic('Stanford Encyclopedia of Philosophy — Medieval Philosophy, including Heloise', 'https://plato.stanford.edu/entries/medieval-philosophy/'),
      academic('Internet Encyclopedia of Philosophy — Peter Abelard', 'https://iep.utm.edu/abelard/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'medieval-scholasticism'},
    entityKind: 'branch',
    articleActionLabel: 'Open Medieval Scholasticism and the shared context in the Atlas',
  }),
  record({
    id: 'latin-lectio-quaestio-disputatio',
    assetId: 'scholastic-sorbonne-theology',
    displayName: 'Lectio, Quaestio, Disputatio: Philosophy as Organized Practice',
    shortTitle: 'Reading, Questioning, Disputing',
    workLabel: 'SCHOLASTIC PRACTICE · LECTIO, QUAESTIO, DISPUTATIO, DETERMINATIO',
    dateLabel: 'Practices developed over centuries · institutionalized especially in 12th–14th-century schools',
    question: 'How can a repeatable institutional practice make disagreement rigorous without making conclusions uniform?',
    frontSubtitle: 'Authoritative texts, exposition, questions, objections, public dispute, replies, and determination',
    lead: 'Scholasticism names overlapping practices rather than one creed. Lectio explicated an authoritative text; quaestio isolated a difficulty; disputatio organized opposed arguments; and determinatio gave a master’s reasoned resolution. Their combinations varied by place, faculty, genre, and period.',
    keyIdeas: [
      'Close reading can generate questions that the source text never states directly.',
      'Objections are preserved because a conclusion must answer the strongest available difficulties.',
      'Institutional form enables disagreement while also distributing authority unequally.',
    ],
    cautions: [
      'The terms do not name one universal four-step method used identically in every medieval classroom.',
      'University philosophy was only one setting for medieval thought; monasteries, courts, religious houses, and translation communities also mattered.',
    ],
    sections: [
      {
        heading: 'Lectio makes an authority usable',
        paragraph: 'A teacher divides a text, establishes its wording, explains difficult terms, relates passages, and identifies the author’s intention. Exposition is already interpretive because deciding the text’s structure determines which problems appear.',
      },
      {
        heading: 'Quaestio turns difficulty into a form',
        paragraph: 'Apparent contradictions or uncertain implications become focused questions. Arguments on opposing sides can draw from reason, textual authority, examples, and distinctions, keeping the route to a conclusion visible.',
      },
      {
        heading: 'Disputation is both inquiry and institution',
        paragraph: 'Public or classroom debate gives objections a formal place, but the presiding master normally determines the question. The practice therefore joins intellectual openness to hierarchy, performance, curriculum, and the risks of censure.',
      },
    ],
    sources: [
      image('Kupferstichkabinett Berlin / Wikimedia Commons — university lecture by Laurentius de Voltolina', 'https://commons.wikimedia.org/wiki/File:Laurentius_de_Voltolina_Vorlesung_vor_Studenten_-_Min_1233_-_Kupferstichkabinett_Berlin.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Literary Forms of Medieval Philosophy', 'https://plato.stanford.edu/entries/medieval-literary/'),
      academic('Stanford Encyclopedia of Philosophy — Medieval Philosophy', 'https://plato.stanford.edu/entries/medieval-philosophy/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'medieval-scholasticism'},
    entityKind: 'branch',
  }),
  record({
    id: 'latin-arabic-latin-crosscurrents',
    assetId: 'scholastic-aristotle-latin-physics',
    displayName: 'Arguments Across Arabic, Hebrew, and Latin Reading Worlds',
    shortTitle: 'Connected Reading Worlds',
    workLabel: 'TRANSLATION AND CONTEST · AVICENNA, AVERROES, MAIMONIDES, LATIN READERS',
    dateLabel: 'Major Latin translation and university receptions, especially 12th–13th centuries · displayed Moerbeke folio copied in the 14th century and annotated in the 15th',
    question: 'How does a translated argument change when a new community adopts, contests, and redirects it?',
    frontSubtitle: 'Translation networks, Aristotle, Avicenna, Averroes, Maimonides, Moerbeke, Manetti, intellect, essence, and demonstration',
    lead: 'Latin readers encountered newly available Aristotelian texts together with arguments by Avicenna, Averroes, Maimonides, and other Arabic- and Hebrew-writing thinkers. These authors were not passive bridges to Greece: their independent projects shaped debates about essence and existence, demonstration, intellect, creation, prophecy, and law.',
    keyIdeas: [
      'Translation transmitted commentaries, conceptual vocabularies, and new arguments as well as ancient texts.',
      'Aquinas’s engagement with Avicenna, Averroes, and Maimonides includes adoption, criticism, and transformation.',
      'Connected traditions remain distinct; influence does not erase institutional, linguistic, or religious difference.',
    ],
    cautions: [
      'Do not reduce a plural network to one Greek→Arabic→Latin relay or make Arabic and Jewish philosophers custodians awaiting Latin Europe.',
      'Labels such as “Latin Averroism” can conceal disagreement among readers and should be used with qualification.',
      'The displayed BAV Pal. lat. 1033 folio preserves William of Moerbeke’s direct Greek-to-Latin Physics translation with later humanist Greek and Latin annotations; it is a contrasting path within the wider network, not physical evidence for Arabic or Hebrew mediation.',
    ],
    sections: [
      {
        heading: 'The translated corpus arrives already interpreted',
        paragraph: 'Aristotle’s works circulated with glosses, paraphrases, commentaries, and problems shaped by late-antique and Islamic philosophy. Latin study therefore encountered several Aristotles and several accounts of what philosophical demonstration could establish. The displayed fourteenth-century Physics folio instead witnesses William of Moerbeke’s direct Greek-to-Latin route and later fifteenth-century humanist annotation, a distinct path that must not be mistaken for evidence of Arabic or Hebrew mediation.',
      },
      {
        heading: 'Borrowing is selective and argumentative',
        paragraph: 'Aquinas draws on Avicennian distinctions while altering their metaphysical setting, reads Averroes closely while rejecting major conclusions about intellect, and engages Maimonides on divine language, law, and creation. Citation can register dependence, rivalry, or both.',
      },
      {
        heading: 'Translation changes every side of the encounter',
        paragraph: 'Technical terms acquire new associations, texts are reorganized for curricula, and positions are named by opponents. Tracking these transformations preserves the agency of source authors and receiving readers without pretending their projects converge into one tradition.',
      },
    ],
    sources: [
      image('Biblioteca Apostolica Vaticana / Wikimedia Commons — BAV Pal. lat. 1033, fol. 1r, Moerbeke’s Latin Physics with later Greek and Latin marginalia', 'https://commons.wikimedia.org/wiki/File:Aristotle_latin_manuscript.jpg'),
      image('Biblioteca Apostolica Vaticana — digitized BAV Pal. lat. 1033, fol. 1r', 'https://digi.vatlib.it/view/MSS_Pal.lat.1033/0001'),
      academic('Stanford Encyclopedia of Philosophy — Influence of Arabic and Islamic Philosophy on the Latin West', 'https://plato.stanford.edu/entries/arabic-islamic-influence/'),
      academic('Stanford Encyclopedia of Philosophy — Medieval Philosophy', 'https://plato.stanford.edu/entries/medieval-philosophy/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'medieval-scholasticism'},
    entityKind: 'branch',
    articleActionLabel: 'Open Medieval Scholasticism and the connected debates in the Atlas',
  }),
  record({
    id: 'latin-summa-question-architecture',
    assetId: 'scholastic-aquinas-summa-basel',
    displayName: 'The Summa Theologiae: Architecture of a Question',
    shortTitle: 'Inside a Summa Question',
    workLabel: 'THOMAS AQUINAS · SUMMA THEOLOGIAE',
    dateLabel: 'Composed c. 1265–1273 and left unfinished · displayed Basel manuscript is 15th century',
    question: 'Why begin an answer by preserving the arguments that seem to defeat it?',
    frontSubtitle: 'Questions, articles, objections, sed contra, respondeo, replies, sequence, and unfinished form',
    lead: 'The Summa Theologiae is an ordered teaching work composed of parts, questions, and articles. A typical article states a problem, gives objections, introduces a counter-position, develops Aquinas’s own response, and returns to the objections one by one. The structure makes disagreement inspectable rather than ornamental.',
    keyIdeas: [
      'An article’s objections establish the difficulty the answer must actually overcome.',
      'The respondeo supplies distinctions and causal structure rather than merely announcing a verdict.',
      'Replies show whether the central answer can absorb each opposing argument without evasion.',
    ],
    cautions: [
      'The Summa is a literary and pedagogical construction, not a transcript of one classroom disputation.',
      'Its compact article form should not be mistaken for simple doctrine; arguments depend on a large, sequenced conceptual system.',
    ],
    sections: [
      {
        heading: 'The objection has a real job',
        paragraph: 'Objections often invoke plausible principles, authoritative texts, or implications of positions Aquinas accepts elsewhere. The reader must understand their force before the response can count as more than contradiction by assertion.',
      },
      {
        heading: 'The center distinguishes before concluding',
        paragraph: 'The respondeo commonly separates senses, causal levels, kinds of act, or domains of inquiry. These distinctions let Aquinas preserve part of an opponent’s insight while showing why it does not decide the question as framed.',
      },
      {
        heading: 'Architecture links articles into a journey',
        paragraph: 'Individual answers depend on earlier treatments of God, creation, human action, habit, virtue, law, and grace. The work was left unfinished, so its monumental organization should be seen as a directed but incomplete intellectual project.',
      },
    ],
    sources: [
      image('Universitätsbibliothek Basel / Wikimedia Commons — Aquinas, Summa theologiae, A I 14, fol. 69v', 'https://commons.wikimedia.org/wiki/File:Basel,_Universit%C3%A4tsbibliothek,_A_I_14,_f._69v_%E2%80%93_Thomas_Aquinas,_Summa_theologiae_(prima_pars.JPG'),
      image('e-codices — Basel, Universitätsbibliothek, A I 14', 'https://www.e-codices.unifr.ch/en/list/one/ubb/A-I-0014'),
      academic('Stanford Encyclopedia of Philosophy — Literary Forms of Medieval Philosophy', 'https://plato.stanford.edu/entries/medieval-literary/'),
      academic('Internet Encyclopedia of Philosophy — Thomas Aquinas', 'https://iep.utm.edu/thomas-aquinas/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'aquinas'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'latin-essence-existence-analogy',
    assetId: 'scholastic-aquinas-summa-1482',
    displayName: 'Essence, Existence, and Analogical Language',
    shortTitle: 'Essence and Existence',
    workLabel: 'AQUINAS · BEING, PARTICIPATION, AND DIVINE NAMES',
    dateLabel: 'Developed from De ente et essentia through Aquinas’s mature works',
    question: 'How can creatures exist through received acts of being while language still refers meaningfully to their source?',
    frontSubtitle: 'Essence, existence, act, potency, participation, causation, simplicity, and analogy',
    lead: 'Aquinas distinguishes what a created thing is from the act by which it exists. Finite beings receive existence according to limited natures, while God is not composed of essence and existence. Analogical predication then asks how names such as “good” or “wise” can apply truly without placing God and creatures inside one genus.',
    keyIdeas: [
      'In created things, essence does not by itself explain the actuality of existence.',
      'Participation describes dependence without making every being a detached portion of divine being.',
      'Analogical language seeks meaningful similarity while preserving a greater dissimilarity of mode.',
    ],
    cautions: [
      'Aquinas’s existence language is not twentieth-century existentialism and should not be translated into that vocabulary.',
      'His accounts of analogy are reconstructed from several texts and remain interpretively disputed; there is no uncontested single formula.',
    ],
    sections: [
      {
        heading: 'What a thing is does not explain that it is',
        paragraph: 'We can understand the essence signified by a term without thereby knowing that such a thing exists. Aquinas uses this difference to analyze created dependence: a finite nature does not contain the sufficient reason for its own actuality.',
      },
      {
        heading: 'Existence is act, not an added object',
        paragraph: 'The act of being actualizes an essence without behaving like another component placed beside form and matter. This lets Aquinas order created perfections through participation while resisting a picture of being as one shared material.',
      },
      {
        heading: 'Names cross a difference they cannot erase',
        paragraph: 'Terms applied to God are neither simply univocal nor merely unrelated equivocations. Their creaturely meanings point causally toward a source whose mode of possessing perfection exceeds the finite mode from which the language begins.',
      },
    ],
    sources: [
      image('Wikimedia Commons — Aquinas, Summa theologiae, Venice 1482', 'https://commons.wikimedia.org/wiki/File:Thomas_Aquinas_Summa_theologiae_1482.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Thomas Aquinas', 'https://plato.stanford.edu/entries/aquinas/'),
      academic('Internet Encyclopedia of Philosophy — Aquinas’s Philosophical Theology', 'https://iep.utm.edu/thomas-aquinas-political-theology/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'aquinas'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'latin-natural-law-virtue',
    assetId: 'scholastic-aquinas-summa-1477',
    displayName: 'Natural Law Inside a Virtue-Centered Moral Life',
    shortTitle: 'Natural Law and Virtue',
    workLabel: 'AQUINAS · HABIT, VIRTUE, PRACTICAL REASON, LAW, AND COMMON GOOD',
    dateLabel: 'Summa theologiae I–II, principally composed in the late 1260s',
    question: 'How do general principles of practical reason become wise action in changing circumstances?',
    frontSubtitle: 'Happiness, passions, habit, prudence, natural law, human law, promulgation, and common good',
    lead: 'Aquinas places natural law within a much larger account of happiness, action, passions, habits, virtues, vice, grace, and several kinds of law. Natural law is rational participation in eternal law, not a complete statute book silently copied into every mind; practical judgment and cultivated virtue remain necessary.',
    keyIdeas: [
      'The first practical orientation toward good requires specification through reasoning about human goods.',
      'Prudence connects sound ends to fitting action under particular circumstances.',
      'Human law is an ordinance of reason for common good, made by legitimate care of the community and promulgated.',
    ],
    cautions: [
      'Natural law should not be isolated from Aquinas’s virtue ethics, account of flourishing, and theology.',
      'General precepts do not mechanically settle every disputed application; derivation, determination, ignorance, habit, and circumstance matter.',
    ],
    sections: [
      {
        heading: 'Practical reason begins from goods',
        paragraph: 'For Aquinas, the basic precept that good is to be pursued and evil avoided is specified through natural inclinations and rational understanding of flourishing. It initiates deliberation rather than replacing it with a list of ready-made verdicts.',
      },
      {
        heading: 'Virtue forms perception and choice',
        paragraph: 'Moral and intellectual virtues stabilize capacities to feel, judge, and act well. Prudence does not merely calculate efficient means; it identifies what the situation calls for in light of a well-ordered end.',
      },
      {
        heading: 'Law belongs to a political community',
        paragraph: 'Human laws translate more general principles into determinate rules suited to a community. Aquinas also limits law’s reach: it cannot prohibit every vice, must attend to the capacity of those governed, and is evaluated through reason and common good.',
      },
    ],
    sources: [
      image('Wikimedia Commons — Aquinas, Summa theologica, 1477', 'https://commons.wikimedia.org/wiki/File:Summa_theologica_1477.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Aquinas’s Moral, Political, and Legal Philosophy', 'https://plato.stanford.edu/entries/aquinas-moral-political/'),
      academic('Internet Encyclopedia of Philosophy — Aquinas’s Moral Philosophy', 'https://iep.utm.edu/thomasaquinas-moral-philosophy/'),
      academic('Internet Encyclopedia of Philosophy — Thomas Aquinas', 'https://iep.utm.edu/thomas-aquinas/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'aquinas'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'latin-paris-1277-contestation',
    assetId: 'scholastic-condemnation-1277',
    displayName: 'Paris 1277: Prohibited Propositions and Contested Effects',
    shortTitle: 'The Condemnation of 1277',
    workLabel: 'UNIVERSITY, EPISCOPAL AUTHORITY, AND 219 PROPOSITIONS',
    dateLabel: 'Issued by Bishop Étienne Tempier on 7 March 1277',
    question: 'What can a list of prohibited propositions tell us—and not tell us—about a culture of argument?',
    frontSubtitle: 'Paris, arts masters, Aristotelian debates, creation, intellect, necessity, freedom, censure, and historiography',
    lead: 'In 1277 the bishop of Paris, Étienne Tempier, condemned 219 propositions. The list touches necessity, creation, divine power, intellect, happiness, will, and the relation between philosophy and theology. Its targets, internal organization, enforcement, and long-term philosophical effects remain matters of historical debate.',
    keyIdeas: [
      'A condemned proposition is evidence for an institutional boundary, not automatic proof that a named thinker taught it.',
      'The document captures several disputes compressed into a single act of censure.',
      'Censure can redirect vocabulary and strategy without determining one predictable intellectual outcome.',
    ],
    cautions: [
      'Do not summarize the event as “the Church banned Aquinas”; Aquinas had died in 1274 and the list’s relation to his positions is indirect and disputed.',
      'Claims that 1277 either destroyed free inquiry or single-handedly created modern science go beyond the evidence.',
    ],
    sections: [
      {
        heading: 'A list is not a map of individual belief',
        paragraph: 'Some articles resemble positions associated with arts masters, Aristotelian interpretation, or wider debate, but the document does not consistently identify authors. Prohibition may target a logical implication, teaching formula, rumor, or composite rather than a verbatim doctrine.',
      },
      {
        heading: 'Philosophy and jurisdiction meet on the page',
        paragraph: 'The condemnation regulates what may be taught while engaging questions about divine freedom, causal necessity, human agency, and the scope of philosophical demonstration. Institutional force and conceptual argument are therefore inseparable in its history.',
      },
      {
        heading: 'Effects must be traced, not assumed',
        paragraph: 'Later thinkers could avoid a formulation, distinguish more carefully, or explore alternatives, but no single trajectory follows from the decree. The responsible historical question is which authors changed which arguments in which settings after 1277.',
      },
    ],
    sources: [
      image('Bibliothèque nationale de France / Wikimedia Commons — Articles of the condemnation of 1277', 'https://commons.wikimedia.org/wiki/File:1277_condemn_70.jpg'),
      image('Biblissima — BnF Latin 4391, manuscript witness to the 1277 act', 'https://iiif.biblissima.fr/collections/manifest/0d9f5220bcdb35d184dfd4d6768c87a6f97bac54'),
      academic('Stanford Encyclopedia of Philosophy — Condemnation of 1277', 'https://plato.stanford.edu/archives/spr2017/entries/condemnation/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'medieval-scholasticism'},
    entityKind: 'branch',
    articleActionLabel: 'Open Medieval Scholasticism and the contested university setting',
  }),
  record({
    id: 'latin-universals-signs-individuals',
    assetId: 'scholastic-porphyrian-tree-fresco',
    displayName: 'Universals, Signs, and the Irreducibility of Individuals',
    shortTitle: 'The Universals Debate',
    workLabel: 'PORPHYRY TO OCKHAM · COMMON NATURES, CONCEPTS, WORDS, AND THISNESS',
    dateLabel: 'A long debate from late antiquity through the 14th century',
    question: 'What makes one predicate true of many things without turning the many into one thing?',
    frontSubtitle: 'Genus, species, predication, status, common nature, haecceity, mental language, and supposition',
    lead: 'Porphyry’s introductory questions, Boethian commentary, Abelard’s semantics, Scotus’s common nature and individuation, and Ockham’s mental signs do not form one simple realism-versus-nominalism contest. They ask different questions about predication, cognition, ontology, language, and what makes an individual this individual.',
    keyIdeas: [
      'A theory of universals must explain shared predication without erasing numerical difference.',
      'Scotus distinguishes a common nature from the individuating “thisness” without making the common nature a separately existing universal.',
      'For Ockham, universality belongs primarily to signs capable of signifying many, especially concepts in mental language.',
    ],
    cautions: [
      'The familiar Porphyrian tree is a later pedagogical diagram, not an image drawn by Porphyry and not a neutral settlement of the debate.',
      '“Realist,” “conceptualist,” and “nominalist” can conceal major differences unless the exact claim and level of analysis are specified.',
    ],
    sections: [
      {
        heading: 'Porphyry leaves a productive opening',
        paragraph: 'The Isagoge postpones whether genera and species subsist, are bodily or incorporeal, and are separate or present in sensible things. Boethian readers inherited those questions together with tools for classification and predication.',
      },
      {
        heading: 'Scotus protects commonality and thisness',
        paragraph: 'A common nature can ground genuine similarity without being universal by itself in extra-mental reality. Individuation requires an intrinsic principle through which this nature is contracted to this singular—the doctrine later associated with haecceity.',
      },
      {
        heading: 'Ockham relocates universality to signs',
        paragraph: 'Ockham rejects a shared universal entity outside individual things and develops an account of concepts, terms, and supposition. Economy here is not “choose the easiest idea,” but refusal to posit entities that explanatory work does not require.',
      },
    ],
    sources: [
      image('Schussenried Monastery / Wikimedia Commons — an eighteenth-century Porphyrian-tree ceiling fresco', 'https://commons.wikimedia.org/wiki/File:Schussenried_Kloster_Bibliothekssaal_Gew%C3%B6lbefresko_Baum_des_Porphyrius.jpg'),
      academic('Stanford Encyclopedia of Philosophy — The Medieval Problem of Universals', 'https://plato.stanford.edu/entries/universals-medieval/'),
      academic('Stanford Encyclopedia of Philosophy — John Duns Scotus', 'https://plato.stanford.edu/entries/duns-scotus/'),
      academic('Stanford Encyclopedia of Philosophy — William of Ockham', 'https://plato.stanford.edu/entries/ockham/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'duns-scotus'},
    entityKind: 'philosopher',
    articleActionLabel: 'Open Duns Scotus and compare the later debate',
  }),
  record({
    id: 'latin-poverty-censure-political-authority',
    assetId: 'scholastic-eckhart-recantation',
    displayName: 'Poverty, Censure, and the Boundaries of Political Authority',
    shortTitle: 'Argument Under Authority',
    workLabel: 'ECKHART, OCKHAM, AND MARSILIUS · CENSURE, POVERTY, OFFICE, AND COERCION',
    dateLabel: 'Major conflicts from the 1320s · displayed notarial instrument dated 13 February 1327',
    question: 'How does philosophical argument change when teaching, religious discipline, property, and coercive power become contested together?',
    frontSubtitle: 'Evangelical poverty, papal office, jurisdiction, recantation, exile, civic peace, and coercion',
    lead: 'Eckhart’s inquisitorial proceedings, Ockham’s conflict with Pope John XXII over Franciscan poverty and authority, and Marsilius’s Defensor pacis are different disputes, not one movement. Together they reveal thinkers distinguishing spiritual claims, ownership, teaching office, legislation, judgment, and coercive jurisdiction under institutional pressure.',
    keyIdeas: [
      'A record of censure documents procedure and power as well as the propositions under examination.',
      'Arguments about evangelical poverty raised questions about property, use, corporate authority, and papal competence.',
      'Marsilius locates coercive legislation in the human political community while sharply restricting papal jurisdiction.',
    ],
    cautions: [
      'Eckhart’s 1327 declaration was conditional submission concerning error, not a simple confession that every contested teaching was false.',
      'Marsilius should not be converted into a modern secular liberal, and these conflicts should not be flattened into “reason versus religion.”',
    ],
    sections: [
      {
        heading: 'The document records a contested submission',
        paragraph: 'The notarial instrument preserves Eckhart’s public declaration during proceedings at Cologne. He disavowed error conditionally while maintaining that he did not knowingly teach error, then pursued appeal; the papal bull evaluating propositions appeared after his death.',
      },
      {
        heading: 'Poverty becomes a theory of institutions',
        paragraph: 'The Franciscan dispute asked whether Christ and the apostles owned goods, how use differs from ownership, and whether papal declarations could be reversed. Ockham’s intervention expanded into questions about heresy, rights, office, and resistance to an erring pope.',
      },
      {
        heading: 'Peace depends on locating coercive power',
        paragraph: 'Marsilius argues that rival claims to coercive jurisdiction fracture civic peace. His legislator humanus and critique of papal plenitude relocate enforceable law toward the political community, while leaving a historically Christian framework unlike modern church-state separation.',
      },
    ],
    sources: [
      image('Vatican Apostolic Archive / Wikimedia Commons — Meister Eckhart’s 1327 notarial instrument', 'https://commons.wikimedia.org/wiki/File:Meister_Eckhart,_recantation,_1327.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Meister Eckhart', 'https://plato.stanford.edu/archives/fall2025/entries/meister-eckhart/'),
      academic('Stanford Encyclopedia of Philosophy — William of Ockham', 'https://plato.stanford.edu/entries/ockham/'),
      academic('Stanford Encyclopedia of Philosophy — Marsilius of Padua', 'https://plato.stanford.edu/entries/marsilius-padua/'),
      academic('Stanford Encyclopedia of Philosophy — Medieval Political Philosophy', 'https://plato.stanford.edu/entries/medieval-political/'),
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'meister-eckhart'},
    entityKind: 'philosopher',
    articleActionLabel: 'Open Eckhart and the late-scholastic conflicts',
  }),
].map(reviewLatinScholasticSupplementalExhibit) as readonly MuseumSupplementalExhibit[];

type LatinScholasticPrimaryExhibitId =
  | 'boethius'
  | 'eriugena'
  | 'medieval-scholasticism'
  | 'anselm'
  | 'abelard'
  | 'aquinas'
  | 'duns-scotus'
  | 'ockham'
  | 'meister-eckhart'
  | 'marsilius-padua';

type LatinScholasticZoneId =
  | 'latin-transmission-carolingian'
  | 'latin-dialectic-early-scholastic'
  | 'latin-high-scholastic'
  | 'latin-late-debates';

const supplementalLayout = (
  id: MuseumSupplementalExhibitId,
  parentExhibitId: LatinScholasticPrimaryExhibitId,
  guidedAfterExhibitId: LatinScholasticPrimaryExhibitId,
  zoneId: LatinScholasticZoneId,
  position: {x: number; z: number},
  rotationY: number,
  assetId: Parameters<typeof authorSupplementalLayout>[0]['assetId'],
  mediaWidth: number,
  mediaHeight: number,
  installationKind: 'scholastic-work' | 'scholastic-context' | 'scholastic-concept',
  accent: string,
) => authorSupplementalLayout({
  id,
  parentExhibitId,
  guidedAfterExhibitId,
  zoneId,
  position,
  rotationY,
  assetId,
  mediaWidth,
  mediaHeight,
  installationKind,
  accent,
  interactionRadius: 5.1,
});

export const LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  supplementalLayout('latin-boethian-logic-curriculum', 'boethius', 'boethius', 'latin-transmission-carolingian', {x: -5.55, z: -26.88}, 0, 'scholastic-boethius-topics', 3, 3 * 257 / 640, 'scholastic-work', LATIN_SCHOLASTIC_PALETTE.blue),
  supplementalLayout('latin-consolation-fortune-providence', 'boethius', 'boethius', 'latin-transmission-carolingian', {x: 5.55, z: -26.88}, 0, 'scholastic-consolation-wheel', 2.7 * 429 / 640, 2.7, 'scholastic-work', LATIN_SCHOLASTIC_PALETTE.oxblood),
  supplementalLayout('latin-carolingian-copying-script', 'eriugena', 'boethius', 'latin-transmission-carolingian', {x: -5.55, z: -15.12}, Math.PI, 'scholastic-caroline-minuscule', 2.9, 2.9 * 462 / 524, 'scholastic-context', LATIN_SCHOLASTIC_PALETTE.gold),
  supplementalLayout('latin-eriugena-greek-christian-sources', 'eriugena', 'eriugena', 'latin-transmission-carolingian', {x: 5.55, z: -15.12}, Math.PI, 'scholastic-eriugena-periphyseon', 2.7 * 481 / 640, 2.7, 'scholastic-work', LATIN_SCHOLASTIC_PALETTE.violet),

  supplementalLayout('latin-sic-et-non-dialectic', 'abelard', 'abelard', 'latin-dialectic-early-scholastic', {x: 5.55, z: -12.88}, 0, 'scholastic-abelard-apologia-manuscript', 2.7 * 509 / 640, 2.7, 'scholastic-work', LATIN_SCHOLASTIC_PALETTE.oxblood),
  supplementalLayout('latin-heloise-love-intention-rule', 'abelard', 'abelard', 'latin-dialectic-early-scholastic', {x: -5.55, z: -1.12}, Math.PI, 'scholastic-heloise-letters', 3, 3 * 507 / 640, 'scholastic-work', LATIN_SCHOLASTIC_PALETTE.violet),
  supplementalLayout('latin-lectio-quaestio-disputatio', 'medieval-scholasticism', 'medieval-scholasticism', 'latin-dialectic-early-scholastic', {x: 5.55, z: -1.12}, Math.PI, 'scholastic-sorbonne-theology', 3, 3 * 417 / 640, 'scholastic-concept', LATIN_SCHOLASTIC_PALETTE.blue),

  supplementalLayout('latin-arabic-latin-crosscurrents', 'aquinas', 'aquinas', 'latin-high-scholastic', {x: 10.85, z: 7}, -Math.PI / 2, 'scholastic-aristotle-latin-physics', 2.7 * 317 / 640, 2.7, 'scholastic-context', LATIN_SCHOLASTIC_PALETTE.green),
  supplementalLayout('latin-summa-question-architecture', 'aquinas', 'aquinas', 'latin-high-scholastic', {x: -5.55, z: 1.12}, 0, 'scholastic-aquinas-summa-basel', 2.7 * 513 / 640, 2.7, 'scholastic-work', LATIN_SCHOLASTIC_PALETTE.blue),
  supplementalLayout('latin-essence-existence-analogy', 'aquinas', 'aquinas', 'latin-high-scholastic', {x: 5.55, z: 1.12}, 0, 'scholastic-aquinas-summa-1482', 2.7 * 464 / 640, 2.7, 'scholastic-concept', LATIN_SCHOLASTIC_PALETTE.gold),
  supplementalLayout('latin-natural-law-virtue', 'aquinas', 'aquinas', 'latin-high-scholastic', {x: -5.55, z: 12.88}, Math.PI, 'scholastic-aquinas-summa-1477', 3, 3 * 194 / 640, 'scholastic-concept', LATIN_SCHOLASTIC_PALETTE.green),
  supplementalLayout('latin-paris-1277-contestation', 'aquinas', 'aquinas', 'latin-high-scholastic', {x: 5.55, z: 12.88}, Math.PI, 'scholastic-condemnation-1277', 3, 3 * 442 / 640, 'scholastic-context', LATIN_SCHOLASTIC_PALETTE.oxblood),

  supplementalLayout('latin-universals-signs-individuals', 'duns-scotus', 'ockham', 'latin-late-debates', {x: -5.55, z: 26.88}, Math.PI, 'scholastic-porphyrian-tree-fresco', 2.7 * 384 / 640, 2.7, 'scholastic-concept', LATIN_SCHOLASTIC_PALETTE.violet),
  supplementalLayout('latin-poverty-censure-political-authority', 'meister-eckhart', 'marsilius-padua', 'latin-late-debates', {x: 5.55, z: 26.88}, Math.PI, 'scholastic-eckhart-recantation', 2.7 * 485 / 640, 2.7, 'scholastic-context', LATIN_SCHOLASTIC_PALETTE.oxblood),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getLatinScholasticSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const recordValue = LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!recordValue) throw new Error(`Gallery 13 supplemental exhibit ${id} is missing.`);
  return recordValue;
};
