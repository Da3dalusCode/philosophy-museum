import {branchById} from './branches';
import {philosopherById} from './philosophers';
import type {
  ComparisonCasefile,
  ComparisonEntityKind,
  ComparisonEvidenceRef,
  ComparisonStatement,
} from '../types/philosophy';

export type {
  ComparisonCasefile,
  ComparisonEvidenceRef,
  ComparisonStatement,
} from '../types/philosophy';

/**
 * Comparative dossiers are a non-canonical teaching surface. Their evidence
 * points back to the source registers attached to the reviewed canonical
 * records; they do not alter an article's review lock or editorial status.
 */
export type ComparisonKind = ComparisonEntityKind;

const sourceIds: Record<string, string> = {
  stoicism: 'sto-sep', epicureanism: 'epi-sep',
  rationalism: 'rat-markie-sep', empiricism: 'emp-markie-sep',
  deontology: 'deo-sep', utilitarianism: 'uti-history-sep',
  confucianism: 'conf-ethics-sep', mohism: 'mohism-sep',
  'buddhist-philosophy': 'bud-buddha-sep', vedanta: 'ved-upanishads-iep',
  'islamic-philosophy': 'islamic-cambridge', 'medieval-scholasticism': 'sch-sep',
  plato: 'pla-sep', aristotle: 'ari-sep', confucius: 'conf-sep', mozi: 'mozi-sep',
  buddha: 'bud-suttas', nagarjuna: 'nag-sep',
  kant: 'kant-sep', hume: 'hum-enquiries', beauvoir: 'bdv-sep', sartre: 'srt-sep',
  'al-ghazali': 'ghazali-incoherence', averroes: 'averroes-decisive',
};

const statement = (kind: ComparisonKind, text: string, ...entityIds: string[]): ComparisonStatement => ({
  text,
  evidence: entityIds.map((entityId) => ({entityKind: kind, entityId, sourceId: sourceIds[entityId]})),
});

const branchStatement = (text: string, ...ids: string[]) => statement('branch', text, ...ids);
const philosopherStatement = (text: string, ...ids: string[]) => statement('philosopher', text, ...ids);

const branchCase = (participantIds: readonly [string, string], content: Omit<ComparisonCasefile, 'kind' | 'participantIds'>): ComparisonCasefile => ({
  kind: 'branch', participantIds, ...content,
});
const philosopherCase = (participantIds: readonly [string, string], content: Omit<ComparisonCasefile, 'kind' | 'participantIds'>): ComparisonCasefile => ({
  kind: 'philosopher', participantIds, ...content,
});

export const comparisonCasefiles: readonly ComparisonCasefile[] = [
  branchCase(['stoicism', 'epicureanism'], {
    sharedQuestion: branchStatement('What kind of therapy makes a life secure and free from destructive disturbance?', 'stoicism', 'epicureanism'),
    historicalRelationship: branchStatement('Both schools formed in the Hellenistic world and made philosophy a way of life, but their surviving sources preserve different systems and later receptions rather than one simple two-school debate.', 'stoicism', 'epicureanism'),
    sharedAssumptions: [
      branchStatement('Both criticize unlimited desire, treat fear and false belief as practical problems, and connect ethical training to an account of nature.', 'stoicism', 'epicureanism'),
    ],
    axes: [
      {label: 'The human good', question: branchStatement('Is a good life secured by virtue or by pleasure properly understood?', 'stoicism', 'epicureanism'), positions: [
        {entityId: 'stoicism', claim: branchStatement('Stoics make virtue the only good; health, wealth, and reputation may be worth choosing without determining moral worth.', 'stoicism')},
        {entityId: 'epicureanism', claim: branchStatement('Epicureans identify pleasure with the good, chiefly as freedom from bodily pain and mental disturbance rather than luxury or constant stimulation.', 'epicureanism')},
      ], contrast: branchStatement('The disagreement is not “discipline versus enjoyment”: it concerns what can make a life go well when fortune changes.', 'stoicism', 'epicureanism')},
      {label: 'Desire and attachment', question: branchStatement('Which desires should be trained, limited, or released?', 'stoicism', 'epicureanism'), positions: [
        {entityId: 'stoicism', claim: branchStatement('Stoic practice examines impressions and assent so that desire and aversion answer to reason and social duty.', 'stoicism')},
        {entityId: 'epicureanism', claim: branchStatement('Epicurean practice distinguishes natural and necessary desires from empty desires and uses friendship and modest sufficiency to reduce fear.', 'epicureanism')},
      ], contrast: branchStatement('Both are therapeutic, but Stoic exercises center moral judgment while Epicurean exercises center the economy of desire and fear.', 'stoicism', 'epicureanism')},
    ],
    terminology: [
      {topic: 'Freedom from disturbance', positions: [
        {entityId: 'stoicism', term: 'apatheia', explanation: branchStatement('Apatheia concerns freedom from destructive passions through corrected judgment; it is not emotional numbness.', 'stoicism')},
        {entityId: 'epicureanism', term: 'ataraxia', explanation: branchStatement('Ataraxia names tranquility sought through removing fear and unnecessary desire within an Epicurean account of pleasure.', 'epicureanism')},
      ], warning: branchStatement('The two terms can illuminate a shared therapeutic aim, but they do not carry the same psychology, ethics, or physics.', 'stoicism', 'epicureanism')},
    ],
    arguments: [
      {entityId: 'stoicism', title: 'Make agency answerable to virtue', summary: branchStatement('The Stoic argument presses a stability question: if external success can be lost, it cannot by itself be the measure of a good person.', 'stoicism'), pressure: branchStatement('This view must still explain why preferred external goods and grief matter without becoming goods in the strict ethical sense.', 'stoicism')},
      {entityId: 'epicureanism', title: 'Remove fears that multiply suffering', summary: branchStatement('Epicurean arguments connect fear of gods, death, and insatiable desire to unnecessary disturbance, then ask which pleasures genuinely secure a life.', 'epicureanism'), pressure: branchStatement('This view must explain how a pleasure-centered end bears public obligations and hardship without collapsing into consumer preference.', 'epicureanism')},
    ],
    readings: [
      {entityId: 'stoicism', title: 'Enchiridion', author: 'Epictetus', kind: 'primary', stage: 'Start with a short practice text', whyHere: branchStatement('Read the control distinction as a discipline of judgment and action, then test it against the school’s wider commitments.', 'stoicism')},
      {entityId: 'epicureanism', title: 'Letter to Menoeceus', author: 'Epicurus', kind: 'primary', stage: 'Read the rival therapeutic program', whyHere: branchStatement('Use the letter to distinguish Epicurean pleasure from the caricature of indiscriminate indulgence.', 'epicureanism')},
    ],
    interpretiveLimits: [branchStatement('Roman Stoic writers, Lucretius, and later popular receptions should not be treated as interchangeable with the early schools or with one another.', 'stoicism', 'epicureanism')],
    followOns: [{kind: 'branch', participantIds: ['stoicism', 'buddhist-philosophy'], label: 'Stoicism and Buddhist Philosophy', reason: branchStatement('Compare carefully how practices of desire and suffering can resemble one another while resting on distinct accounts of self and nature.', 'stoicism', 'buddhist-philosophy')}],
  }),
  branchCase(['confucianism', 'mohism'], {
    sharedQuestion: branchStatement('How should ethical cultivation and public order respond to partiality, conflict, and material need?', 'confucianism', 'mohism'),
    historicalRelationship: branchStatement('Confucian and Mohist texts belong to the plural Warring States argument culture; the comparison concerns rival answers within that setting, not two timeless cultural essences.', 'confucianism', 'mohism'),
    sharedAssumptions: [branchStatement('Both make ethical formation politically consequential and ask how standards, exemplary conduct, and institutions can improve shared life.', 'confucianism', 'mohism')],
    axes: [
      {label: 'Care and social relation', question: branchStatement('Should moral concern begin from differentiated roles or be extended impartially?', 'confucianism', 'mohism'), positions: [
        {entityId: 'confucianism', claim: branchStatement('Confucian traditions make humaneness, ritual practice, family relation, and cultivated judgment central to ethical and political order.', 'confucianism')},
        {entityId: 'mohism', claim: branchStatement('Mohist arguments for jian ai criticize partial concern when it produces aggression and disorder, while linking benefit to public standards and livelihood.', 'mohism')},
      ], contrast: branchStatement('The point is not simply family loyalty versus universal love: each tradition connects care to a different account of social coordination and political legitimacy.', 'confucianism', 'mohism')},
      {label: 'Normative method', question: branchStatement('What tests whether a practice deserves endorsement?', 'confucianism', 'mohism'), positions: [
        {entityId: 'confucianism', claim: branchStatement('Confucian ethics gives ritual, learning, exemplary persons, and historically received texts a role in forming reliable judgment.', 'confucianism')},
        {entityId: 'mohism', claim: branchStatement('Mohist texts emphasize standards, practical effects, and argument, while their own political and cosmological commitments remain part of the picture.', 'mohism')},
      ], contrast: branchStatement('Mohist appeal to benefit is not a modern maximizing calculus, and Confucian ritual is not merely etiquette or arbitrary convention.', 'confucianism', 'mohism')},
    ],
    terminology: [{topic: 'Care', positions: [
      {entityId: 'confucianism', term: 'ren and li', explanation: branchStatement('Humaneness and ritual name cultivated dispositions and patterned relations rather than a detached rule for aggregating welfare.', 'confucianism')},
      {entityId: 'mohism', term: 'jian ai', explanation: branchStatement('Often rendered “impartial concern,” jian ai targets damaging partiality in a Mohist program of benefit, order, and moral reform.', 'mohism')},
    ], warning: branchStatement('Translating both through “love” can hide their different argumentative, institutional, and cosmological settings.', 'confucianism', 'mohism')}],
    arguments: [
      {entityId: 'confucianism', title: 'Cultivation is socially learned', summary: branchStatement('Confucian reasoning asks how persons become responsive to others through education, ritual, reflection, and roles rather than through a single abstract formula.', 'confucianism'), pressure: branchStatement('It must answer worries that inherited roles can preserve hierarchy, exclusion, or unexamined partiality.', 'confucianism')},
      {entityId: 'mohism', title: 'Partiality has public costs', summary: branchStatement('Mohist criticism makes favoritism answer for aggression, waste, and failures of mutual benefit.', 'mohism'), pressure: branchStatement('It must explain how impartial concern works with families, offices, disagreement, and the text’s own demands for conformity.', 'mohism')},
    ],
    readings: [
      {entityId: 'confucianism', title: 'Analects, selected books', author: 'Confucius and the Analects tradition', kind: 'primary', stage: 'Read a practice of cultivation', whyHere: branchStatement('Track how exemplary conduct, learning, and ritual appear in short exchanges rather than assuming a systematic treatise.', 'confucianism')},
      {entityId: 'mohism', title: 'The Mozi, chapters 14–19', author: 'Anonymous Mohist authors; translated by Ian Johnston', kind: 'primary', stage: 'Read the case for impartial concern', whyHere: branchStatement('Read the argument alongside its claims about benefit, order, and the harms of partiality.', 'mohism')},
    ],
    interpretiveLimits: [branchStatement('The received texts are layered and the identities and dates of their speakers are not transparent; neither tradition should be reduced to one founder’s modern doctrine.', 'confucianism', 'mohism')],
    followOns: [{kind: 'branch', participantIds: ['mohism', 'legalism'], label: 'Mohism and Legalism', reason: branchStatement('Ask how public standards can serve moral concern or state capacity, and why administrative clarity does not determine its own ends.', 'mohism', 'legalism')}],
  }),
  branchCase(['buddhist-philosophy', 'vedanta'], {
    sharedQuestion: branchStatement('What is liberated, and what kind of inquiry or discipline can loosen suffering and ignorance?', 'buddhist-philosophy', 'vedanta'),
    historicalRelationship: branchStatement('These are internally diverse South Asian philosophical traditions with long histories of debate, commentary, and changing institutional settings; comparison must not erase that plurality.', 'buddhist-philosophy', 'vedanta'),
    sharedAssumptions: [branchStatement('Both connect metaphysical and epistemic questions with practices of liberation, but neither is exhausted by meditation or a single modern “spirituality” label.', 'buddhist-philosophy', 'vedanta')],
    axes: [
      {label: 'Self and ultimate reality', question: branchStatement('Does liberation disclose a lasting self, or loosen the grasping that takes any constituent as self?', 'buddhist-philosophy', 'vedanta'), positions: [
        {entityId: 'buddhist-philosophy', claim: branchStatement('Buddhist traditions analyze persons and experience without endorsing a permanent, independent self, while later schools develop different accounts of emptiness, cognition, and personhood.', 'buddhist-philosophy')},
        {entityId: 'vedanta', claim: branchStatement('Vedānta traditions interpret Upaniṣadic materials through divergent accounts of ātman, brahman, dependence, and liberation; they are not one undifferentiated nondualism.', 'vedanta')},
      ], contrast: branchStatement('A shared concern with ignorance does not license translating anātman and ātman as opposite answers to one simple modern mind-body question.', 'buddhist-philosophy', 'vedanta')},
      {label: 'Authority and reasoning', question: branchStatement('How do text, disciplined experience, inference, and debate contribute to knowledge?', 'buddhist-philosophy', 'vedanta'), positions: [
        {entityId: 'buddhist-philosophy', claim: branchStatement('Buddhist philosophers debate perception, inference, language, meditation, and testimony in different ways across schools and periods.', 'buddhist-philosophy')},
        {entityId: 'vedanta', claim: branchStatement('Vedānta authors develop competing hermeneutics of scripture and reason, including disputes over what scripture can disclose about brahman and self.', 'vedanta')},
      ], contrast: branchStatement('Neither tradition is simply “faith” or simply “experience”; both develop technical arguments whose terms need historical and linguistic care.', 'buddhist-philosophy', 'vedanta')},
    ],
    terminology: [{topic: 'Self', positions: [
      {entityId: 'buddhist-philosophy', term: 'anātman', explanation: branchStatement('No-self analysis resists taking a permanent essence as the owner behind changing aggregates and experience.', 'buddhist-philosophy')},
      {entityId: 'vedanta', term: 'ātman / brahman', explanation: branchStatement('These terms receive divergent interpretations across Vedānta lineages and cannot be supplied with a single English metaphysical equivalent.', 'vedanta')},
    ], warning: branchStatement('The comparison is most useful when it marks a specific contested problem, not when it makes one tradition a preliminary version of the other.', 'buddhist-philosophy', 'vedanta')}],
    arguments: [
      {entityId: 'buddhist-philosophy', title: 'Analyze dependence without reifying a self', summary: branchStatement('Buddhist arguments use impermanence, dependent arising, and analysis of experience to test whether a permanent owner is needed for agency or liberation.', 'buddhist-philosophy'), pressure: branchStatement('Different Buddhist schools disagree about how far analysis reaches, so no single Buddhist conclusion should be silently generalized.', 'buddhist-philosophy')},
      {entityId: 'vedanta', title: 'Interpret liberation through scriptural inquiry', summary: branchStatement('Vedānta reasoning asks how Upaniṣadic teaching, interpretation, and philosophical argument disclose the relation of self, world, and brahman.', 'vedanta'), pressure: branchStatement('Disagreement among Advaita, Viśiṣṭādvaita, Dvaita, and other lineages blocks a one-sentence account of “the Vedānta view.”', 'vedanta')},
    ],
    readings: [
      {entityId: 'buddhist-philosophy', title: 'The Discourse on the Characteristics of Not-Self', author: 'Early Buddhist discourse tradition', kind: 'primary', stage: 'Begin with the early analytical question', whyHere: branchStatement('Read it before importing later Madhyamaka or Yogācāra vocabulary into early teaching.', 'buddhist-philosophy')},
      {entityId: 'vedanta', title: 'Principal Upaniṣads, selected passages', author: 'Upaniṣadic traditions', kind: 'primary', stage: 'Read the shared textual field', whyHere: branchStatement('Use a scholarly translation and note how later Vedānta commentaries argue over the texts rather than treating them as self-interpreting.', 'vedanta')},
    ],
    interpretiveLimits: [branchStatement('Dates, textual strata, Sanskrit and Pāli translation choices, and later commentarial affiliations require caution; “Hinduism versus Buddhism” is too coarse for the arguments here.', 'buddhist-philosophy', 'vedanta')],
    followOns: [{kind: 'philosopher', participantIds: ['buddha', 'nagarjuna'], label: 'The Buddha and Nāgārjuna', reason: philosopherStatement('Follow one historically later Buddhist development while keeping early-discourse and Madhyamaka vocabularies distinct.', 'buddha', 'nagarjuna')}],
  }),
  branchCase(['islamic-philosophy', 'medieval-scholasticism'], {
    sharedQuestion: branchStatement('How can philosophical argument, inherited sciences, and revealed traditions be brought into a disciplined relation?', 'islamic-philosophy', 'medieval-scholasticism'),
    historicalRelationship: branchStatement('Arabic-speaking philosophical worlds and Latin scholastic institutions were connected through translation, commentary, travel, and contested reception, not by a simple handoff from one civilization to another.', 'islamic-philosophy', 'medieval-scholasticism'),
    sharedAssumptions: [branchStatement('Both labels cover many authors, institutions, genres, and theological commitments; both include technical work in logic, metaphysics, natural philosophy, and ethics.', 'islamic-philosophy', 'medieval-scholasticism')],
    axes: [
      {label: 'Reason and revelation', question: branchStatement('What work can demonstrative argument do alongside scriptural interpretation and theology?', 'islamic-philosophy', 'medieval-scholasticism'), positions: [
        {entityId: 'islamic-philosophy', claim: branchStatement('Islamic philosophy includes falsafa, kalām, Sufi philosophical traditions, and debates over reason and revelation that cannot be collapsed into one agreement.', 'islamic-philosophy')},
        {entityId: 'medieval-scholasticism', claim: branchStatement('Scholastic traditions organize disputation, commentary, and theological inquiry in diverse Latin Christian settings and argue over the scope of natural reason.', 'medieval-scholasticism')},
      ], contrast: branchStatement('The comparison reveals connected problems, but “faith versus reason” conceals different genres, languages, institutions, and internal opponents.', 'islamic-philosophy', 'medieval-scholasticism')},
      {label: 'Aristotelian inheritance', question: branchStatement('How should inherited Greek texts be translated, corrected, and used?', 'islamic-philosophy', 'medieval-scholasticism'), positions: [
        {entityId: 'islamic-philosophy', claim: branchStatement('Arabic translation and commentary movements made Greek philosophical resources newly available and transformed them in Islamic intellectual settings.', 'islamic-philosophy')},
        {entityId: 'medieval-scholasticism', claim: branchStatement('Latin scholastic thinkers received Aristotelian and Arabic-language materials through further translation and debated their implications in new institutional contexts.', 'medieval-scholasticism')},
      ], contrast: branchStatement('Transmission is neither passive copying nor proof that later thinkers simply held the views of their sources.', 'islamic-philosophy', 'medieval-scholasticism')},
    ],
    terminology: [{topic: 'Tradition labels', positions: [
      {entityId: 'islamic-philosophy', term: 'falsafa and kalām', explanation: branchStatement('These labels name partly overlapping argumentative and institutional histories, not a single uniform “Islamic philosophy” doctrine.', 'islamic-philosophy')},
      {entityId: 'medieval-scholasticism', term: 'scholasticism', explanation: branchStatement('Scholasticism marks methods and institutions across centuries more than a single thesis held by every medieval Christian author.', 'medieval-scholasticism')},
    ], warning: branchStatement('Civilizational labels are useful orientation devices only when their internal diversity and cross-language connections remain visible.', 'islamic-philosophy', 'medieval-scholasticism')}],
    arguments: [
      {entityId: 'islamic-philosophy', title: 'Translation invites transformation', summary: branchStatement('The history of Arabic philosophical work shows that translating and commenting on a text can generate new questions about logic, metaphysics, and divine knowledge.', 'islamic-philosophy'), pressure: branchStatement('A genealogy of transmission must not overwrite local debates, religious traditions, or non-Aristotelian currents.', 'islamic-philosophy')},
      {entityId: 'medieval-scholasticism', title: 'Disputation tests distinctions', summary: branchStatement('Scholastic forms of question, objection, and reply make contested distinctions publicly assessable rather than merely repeating authorities.', 'medieval-scholasticism'), pressure: branchStatement('The method should not be idealized as socially universal or detached from the educational and ecclesial institutions that sustained it.', 'medieval-scholasticism')},
    ],
    readings: [
      {entityId: 'islamic-philosophy', title: 'The Incoherence of the Philosophers, selections', author: 'al-Ghazālī', kind: 'primary', stage: 'Read a dispute from within', whyHere: branchStatement('It makes visible why philosophical claims about causation, eternity, and theology became contested in Islamic intellectual life.', 'islamic-philosophy')},
      {entityId: 'medieval-scholasticism', title: 'Summa Theologiae, selected questions', author: 'Thomas Aquinas', kind: 'primary', stage: 'Read a scholastic form', whyHere: branchStatement('Follow objections and replies as an argumentative practice rather than as a list of medieval conclusions.', 'medieval-scholasticism')},
    ],
    interpretiveLimits: [branchStatement('The comparison does not license a story in which Arabic scholarship merely preserved Greek texts for Europe, nor one in which Latin scholasticism simply copied Arabic philosophy.', 'islamic-philosophy', 'medieval-scholasticism')],
    followOns: [{kind: 'philosopher', participantIds: ['al-ghazali', 'averroes'], label: 'al-Ghazālī and Averroes', reason: philosopherStatement('Examine a documented contest over philosophy, theology, and interpretation without making either author stand for an entire civilization.', 'al-ghazali', 'averroes')}],
  }),
  philosopherCase(['plato', 'aristotle'], {
    sharedQuestion: philosopherStatement('How can inquiry explain a changing world while making knowledge, value, and political judgment intelligible?', 'plato', 'aristotle'),
    historicalRelationship: philosopherStatement('Aristotle studied in Plato’s Academy, but the surviving corpora, dating, and authorial voices require more care than a simple teacher-versus-pupil story.', 'plato', 'aristotle'),
    sharedAssumptions: [philosopherStatement('Both pursue reasons rather than mere opinion, connect ethics to political life, and treat philosophy as demanding education of judgment and desire.', 'plato', 'aristotle')],
    axes: [
      {label: 'Intelligibility and form', question: philosopherStatement('Must stable intelligibility be separated from sensible things, or found in the structures of natural beings?', 'plato', 'aristotle'), positions: [
        {entityId: 'plato', claim: philosopherStatement('Platonic dialogues develop several arguments and images around Forms, knowledge, soul, and education; no single speaker automatically supplies Plato’s final doctrine.', 'plato')},
        {entityId: 'aristotle', claim: philosopherStatement('Aristotle analyzes substance, form, matter, change, and causes within a wider program of inquiry whose methods vary by subject.', 'aristotle')},
      ], contrast: philosopherStatement('The contrast is not simply “otherworldly Plato versus empirical Aristotle”: both use argument, observation, dialectic, and inherited problems in different combinations.', 'plato', 'aristotle')},
      {label: 'Ethical formation', question: philosopherStatement('How does a person become capable of living well?', 'plato', 'aristotle'), positions: [
        {entityId: 'plato', claim: philosopherStatement('Plato repeatedly links ethical transformation to inquiry, education, psychic order, and political arrangements in dramatically framed dialogues.', 'plato')},
        {entityId: 'aristotle', claim: philosopherStatement('Aristotle gives habituation, practical judgment, friendship, and civic institutions central roles in an account of flourishing.', 'aristotle')},
      ], contrast: philosopherStatement('Both resist reducing ethics to preference, but they frame the relation among knowledge, character, and the city differently.', 'plato', 'aristotle')},
    ],
    terminology: [{topic: 'Form', positions: [
      {entityId: 'plato', term: 'eidos / idea', explanation: philosopherStatement('These terms occur in dialogues with varying argumentative roles and should not be treated as a detachable theory in every context.', 'plato')},
      {entityId: 'aristotle', term: 'form and substance', explanation: philosopherStatement('Aristotle’s hylomorphic and causal vocabulary functions within analyses of natural beings and cannot be equated with later “matter versus spirit” language.', 'aristotle')},
    ], warning: philosopherStatement('English “form” is a useful bridge but not a guarantee of doctrinal equivalence.', 'plato', 'aristotle')}],
    arguments: [
      {entityId: 'plato', title: 'Ask what changing examples answer to', summary: philosopherStatement('Platonic arguments test whether sensible examples alone can supply stable standards for knowledge, explanation, and value.', 'plato'), pressure: philosopherStatement('Interpreters disagree over how dialogues, myths, aporiai, and developmental chronology bear on any reconstructed doctrine of Forms.', 'plato')},
      {entityId: 'aristotle', title: 'Explain by the causes proper to the subject', summary: philosopherStatement('Aristotle’s explanatory program asks what makes a thing the kind of thing it is and what level of precision its subject permits.', 'aristotle'), pressure: philosopherStatement('Later labels such as “Organon” and “metaphysics” can obscure the organization and transmission of the surviving corpus.', 'aristotle')},
    ],
    readings: [
      {entityId: 'plato', title: 'Republic, Books VI–VII', author: 'Plato', kind: 'primary', stage: 'Read an education argument in context', whyHere: philosopherStatement('Keep the images of sun, line, and cave connected to the dialogue’s political and ethical setting.', 'plato')},
      {entityId: 'aristotle', title: 'Nicomachean Ethics, Books I–II', author: 'Aristotle', kind: 'primary', stage: 'Read ethical method before the contrast hardens', whyHere: philosopherStatement('It introduces flourishing and habituation while showing why ethics permits a different precision from mathematics.', 'aristotle')},
    ],
    interpretiveLimits: [philosopherStatement('Neither corpus is a transparent textbook: dramatic form, textual transmission, chronology, and later reception make simple “Platonist versus Aristotelian” summaries provisional.', 'plato', 'aristotle')],
    followOns: [{kind: 'branch', participantIds: ['platonism', 'aristotelianism'], label: 'Platonism and Aristotelianism', reason: philosopherStatement('Move from two corpora to their later school formations, where reception and institutional history multiply rather than merely repeat the original disagreements.', 'plato', 'aristotle')}],
  }),
  philosopherCase(['confucius', 'mozi'], {
    sharedQuestion: philosopherStatement('What sort of ethical practice can repair disorder and make authority answerable to human flourishing?', 'confucius', 'mozi'),
    historicalRelationship: philosopherStatement('Both are situated through received Warring States texts and later traditions, but their biographies, authorship, and exact chronology do not permit a simple recorded face-to-face debate.', 'confucius', 'mozi'),
    sharedAssumptions: [philosopherStatement('Both make ethical formation, social order, and exemplary or reliable conduct matters of public argument rather than private taste.', 'confucius', 'mozi')],
    axes: [
      {label: 'Moral concern', question: philosopherStatement('Should ethical concern be ordered through roles or directed impartially across persons?', 'confucius', 'mozi'), positions: [
        {entityId: 'confucius', claim: philosopherStatement('The Analects tradition connects humane conduct with learning, ritual, family relation, and the difficult cultivation of judgment.', 'confucius')},
        {entityId: 'mozi', claim: philosopherStatement('Mohist texts argue that partial concern fuels conflict and advance impartial concern alongside benefit, standards, and anti-aggression arguments.', 'mozi')},
      ], contrast: philosopherStatement('The disagreement is practical and political as well as emotional: each account proposes different ways to coordinate a community.', 'confucius', 'mozi')},
      {label: 'Tradition and criticism', question: philosopherStatement('When should inherited practices be preserved, revised, or rejected?', 'confucius', 'mozi'), positions: [
        {entityId: 'confucius', claim: philosopherStatement('Confucian teaching treats ritual and exemplary tradition as media of formation while requiring reflective learning rather than empty performance.', 'confucius')},
        {entityId: 'mozi', claim: philosopherStatement('Mohist criticism assesses costly ritual, offensive war, and favoritism by their effects on people and order.', 'mozi')},
      ], contrast: philosopherStatement('Neither position is adequately described as blind traditionalism or bare cost-benefit calculation.', 'confucius', 'mozi')},
    ],
    terminology: [{topic: 'Impartiality', positions: [
      {entityId: 'confucius', term: 'ren', explanation: philosopherStatement('Ren names cultivated humaneness in relations; it does not by itself specify a modern equal-treatment rule.', 'confucius')},
      {entityId: 'mozi', term: 'jian ai', explanation: philosopherStatement('Jian ai is a Mohist norm directed against harmful partiality, not a direct Chinese anticipation of every later universalist theory.', 'mozi')},
    ], warning: philosopherStatement('Modern vocabulary can clarify a question but should not decide the answer before the texts’ own terms and genres are read.', 'confucius', 'mozi')}],
    arguments: [
      {entityId: 'confucius', title: 'Reform conduct through learning and ritual', summary: philosopherStatement('Confucian reasoning asks how patterned practice, exemplary persons, and self-examination make humane judgment more reliable.', 'confucius'), pressure: philosopherStatement('The view must confront whether role-based practices can reproduce exclusion or hierarchy rather than cultivate reciprocal responsibility.', 'confucius')},
      {entityId: 'mozi', title: 'Expose the cost of partiality', summary: philosopherStatement('Mohist arguments connect partial favor with disorder and ask rulers and communities to justify customs by public benefit.', 'mozi'), pressure: philosopherStatement('The view must explain how its standards apply without coercive uniformity or an implausibly simple account of family attachment.', 'mozi')},
    ],
    readings: [
      {entityId: 'confucius', title: 'Analects, selected books', author: 'Confucius and the Analects tradition', kind: 'primary', stage: 'Begin with short exchanges', whyHere: philosopherStatement('Read for the interaction of learning, ritual, and humane conduct rather than extracting one slogan.', 'confucius')},
      {entityId: 'mozi', title: 'The Mozi, chapters 14–19', author: 'Anonymous Mohist authors; translated by Ian Johnston', kind: 'primary', stage: 'Read the argument for jian ai', whyHere: philosopherStatement('Pair the anti-partiality argument with its social and political conditions.', 'mozi')},
    ],
    interpretiveLimits: [philosopherStatement('The names Confucius and Mozi organize layered textual traditions; caution about authorship and chronology is part of the comparison, not a reason to erase the disagreement.', 'confucius', 'mozi')],
    followOns: [{kind: 'branch', participantIds: ['confucianism', 'mohism'], label: 'Confucianism and Mohism', reason: branchStatement('Widen the comparison from named textual figures to layered traditions of cultivation, impartial concern, ritual, standards, and political order.', 'confucianism', 'mohism')}],
  }),
  philosopherCase(['buddha', 'nagarjuna'], {
    sharedQuestion: philosopherStatement('How does analysis of dependent experience loosen suffering and attachment?', 'buddha', 'nagarjuna'),
    historicalRelationship: philosopherStatement('Nāgārjuna is a historically later Buddhist philosopher whose Madhyamaka arguments develop in relation to Buddhist traditions; he should not be presented as simply repeating a fifth-century BCE teacher in later vocabulary.', 'buddha', 'nagarjuna'),
    sharedAssumptions: [philosopherStatement('Both are read within Buddhist traditions of liberation and dependent arising, while their surviving evidence, genres, and philosophical problems differ.', 'buddha', 'nagarjuna')],
    axes: [
      {label: 'Dependent arising', question: philosopherStatement('What follows when phenomena arise dependently rather than through an independent essence?', 'buddha', 'nagarjuna'), positions: [
        {entityId: 'buddha', claim: philosopherStatement('Early Buddhist discourses analyze suffering, impermanence, craving, and the absence of a permanent self within a practical path of liberation.', 'buddha')},
        {entityId: 'nagarjuna', claim: philosopherStatement('Nāgārjuna’s Madhyamaka arguments examine whether phenomena can possess intrinsic nature and connect emptiness with dependent arising.', 'nagarjuna')},
      ], contrast: philosopherStatement('Later emptiness vocabulary may illuminate one reception of dependent arising, but it should not be projected without qualification onto every early discourse.', 'buddha', 'nagarjuna')},
      {label: 'Philosophical method', question: philosopherStatement('Is the task primarily therapeutic instruction, dialectical critique, or both?', 'buddha', 'nagarjuna'), positions: [
        {entityId: 'buddha', claim: philosopherStatement('Early materials combine ethical discipline, meditative practice, and analyses directed toward ending suffering rather than a modern theoretical system.', 'buddha')},
        {entityId: 'nagarjuna', claim: philosopherStatement('Nāgārjuna uses tightly structured dialectical arguments whose interpretation remains disputed among contemporary scholars and Buddhist traditions.', 'nagarjuna')},
      ], contrast: philosopherStatement('Calling both “anti-metaphysical” can flatten their textual aims and the positive role of path, convention, and teaching.', 'buddha', 'nagarjuna')},
    ],
    terminology: [{topic: 'Emptiness and no-self', positions: [
      {entityId: 'buddha', term: 'anātman', explanation: philosopherStatement('No-self analysis cautions against identifying a permanent owner behind changing experience and the aggregates.', 'buddha')},
      {entityId: 'nagarjuna', term: 'śūnyatā', explanation: philosopherStatement('Emptiness in Madhyamaka concerns the absence of intrinsic nature and is tied to dependent arising and conventional designation.', 'nagarjuna')},
    ], warning: philosopherStatement('The terms are related in Buddhist history but not interchangeable labels for a modern “illusion of self” thesis.', 'buddha', 'nagarjuna')}],
    arguments: [
      {entityId: 'buddha', title: 'Locate the conditions of suffering', summary: philosopherStatement('Early teaching traces suffering to conditioned processes, craving, and ignorance so that ethical and contemplative practice has a practical target.', 'buddha'), pressure: philosopherStatement('Historical reconstruction must distinguish early teaching, later community elaboration, and much later Buddhist philosophical systems.', 'buddha')},
      {entityId: 'nagarjuna', title: 'Test intrinsic nature dialectically', summary: philosopherStatement('Madhyamaka arguments pressure accounts that make things independently self-grounding, asking whether causal and conceptual relations would then become unintelligible.', 'nagarjuna'), pressure: philosopherStatement('Interpreters dispute whether this is a global anti-realist thesis, a therapeutic method, or a more specific analysis of essence claims.', 'nagarjuna')},
    ],
    readings: [
      {entityId: 'buddha', title: 'Discourse on the Characteristics of Not-Self', author: 'Early Buddhist discourse tradition', kind: 'primary', stage: 'Read an early discourse first', whyHere: philosopherStatement('It anchors the question of self before later philosophical terminology is introduced.', 'buddha')},
      {entityId: 'nagarjuna', title: 'Mūlamadhyamakakārikā, selected chapters', author: 'Nāgārjuna', kind: 'primary', stage: 'Then read a later argument', whyHere: philosopherStatement('Use a scholarly translation and commentary to track the target of each dialectical move.', 'nagarjuna')},
    ],
    interpretiveLimits: [philosopherStatement('The Buddha’s life and teachings are reconstructed from layered sources, and Nāgārjuna’s dates, works, and philosophical commitments include live scholarly disputes.', 'buddha', 'nagarjuna')],
    followOns: [{kind: 'branch', participantIds: ['buddhist-philosophy', 'vedanta'], label: 'Buddhist Philosophy and Vedānta', reason: branchStatement('Test how later traditions debate liberation, self, ignorance, and authority without turning either side into a single doctrine.', 'buddhist-philosophy', 'vedanta')}],
  }),
  philosopherCase(['al-ghazali', 'averroes'], {
    sharedQuestion: philosopherStatement('What authority should philosophical demonstration have when its conclusions appear to challenge theological commitments?', 'al-ghazali', 'averroes'),
    historicalRelationship: philosopherStatement('Averroes’s Decisive Treatise and Incoherence of the Incoherence answer a debate intensified by al-Ghazālī’s Incoherence of the Philosophers, but neither author represents the whole range of Islamic intellectual life.', 'al-ghazali', 'averroes'),
    sharedAssumptions: [philosopherStatement('Both engage scripture, inherited philosophical argument, and the interpretation of contested claims about causation, eternity, and divine knowledge.', 'al-ghazali', 'averroes')],
    axes: [
      {label: 'Philosophical demonstration', question: philosopherStatement('When does demonstrative reasoning disclose truth, and when does it exceed its proper scope?', 'al-ghazali', 'averroes'), positions: [
        {entityId: 'al-ghazali', claim: philosopherStatement('al-Ghazālī criticizes philosophers on specific theological and metaphysical questions while using logical and philosophical resources in his own diverse writings.', 'al-ghazali')},
        {entityId: 'averroes', claim: philosopherStatement('Averroes defends demonstrative inquiry and argues for interpretive distinctions when scriptural wording and demonstration seem to conflict.', 'averroes')},
      ], contrast: philosopherStatement('The dispute is not reducible to irrational faith versus secular reason; it concerns standards of demonstration, interpretation, and theological consequence.', 'al-ghazali', 'averroes')},
      {label: 'Causation and necessity', question: philosopherStatement('How should causal regularity be understood in relation to divine power?', 'al-ghazali', 'averroes'), positions: [
        {entityId: 'al-ghazali', claim: philosopherStatement('al-Ghazālī’s discussion of causation is embedded in a wider critique of particular philosophical claims and in questions about divine agency.', 'al-ghazali')},
        {entityId: 'averroes', claim: philosopherStatement('Averroes’s response defends the intelligibility of causal inquiry while contesting al-Ghazālī’s argumentative conclusions.', 'averroes')},
      ], contrast: philosopherStatement('Neither side can be captured by the bare claim that one “denies” and the other “accepts” causation without attending to the arguments and theological stakes.', 'al-ghazali', 'averroes')},
    ],
    terminology: [{topic: 'Philosopher', positions: [
      {entityId: 'al-ghazali', term: 'falāsifa', explanation: philosopherStatement('al-Ghazālī’s target is a determinate constellation of philosophical theses and authors, not every use of reason or logic.', 'al-ghazali')},
      {entityId: 'averroes', term: 'demonstration and interpretation', explanation: philosopherStatement('Averroes distinguishes audiences and forms of reasoning in defending a place for demonstrative inquiry within an Islamic legal and theological framework.', 'averroes')},
    ], warning: philosopherStatement('Translations such as “religion” and “philosophy” can conceal the legal, exegetical, and institutional terms through which the dispute was conducted.', 'al-ghazali', 'averroes')}],
    arguments: [
      {entityId: 'al-ghazali', title: 'Demand theological accountability', summary: philosopherStatement('The Incoherence tests whether certain philosophical conclusions can meet the standards imposed by theological commitments and rigorous argument.', 'al-ghazali'), pressure: philosopherStatement('It is misleading to infer from criticism of particular doctrines that al-Ghazālī rejected logic, learning, or every philosophical method.', 'al-ghazali')},
      {entityId: 'averroes', title: 'Defend disciplined interpretation', summary: philosopherStatement('Averroes argues that demonstrative reasoning and appropriately qualified interpretation can serve rather than simply threaten religious understanding.', 'averroes'), pressure: philosopherStatement('His defense has to account for who is competent to interpret and how public teaching handles complex arguments.', 'averroes')},
    ],
    readings: [
      {entityId: 'al-ghazali', title: 'The Incoherence of the Philosophers, selections', author: 'al-Ghazālī', kind: 'primary', stage: 'Read the challenge', whyHere: philosopherStatement('Identify a particular target and argument before generalizing about al-Ghazālī’s relation to philosophy.', 'al-ghazali')},
      {entityId: 'averroes', title: 'The Decisive Treatise', author: 'Averroes (Ibn Rushd)', kind: 'primary', stage: 'Read the response on method', whyHere: philosopherStatement('It introduces Averroes’s account of demonstrative inquiry and interpretive responsibility.', 'averroes')},
    ],
    interpretiveLimits: [philosopherStatement('The famous opposition has a long Latin and modern reception; reading it only through a later “Islam versus reason” story distorts both authors and their settings.', 'al-ghazali', 'averroes')],
    followOns: [{kind: 'branch', participantIds: ['islamic-philosophy', 'medieval-scholasticism'], label: 'Islamic Philosophy and Medieval Scholasticism', reason: branchStatement('Trace translation, commentary, and contested reception across Arabic-speaking and Latin institutions without narrating a one-way transfer.', 'islamic-philosophy', 'medieval-scholasticism')}],
  }),
  branchCase(['rationalism', 'empiricism'], {
    sharedQuestion: branchStatement('What can make knowledge reliable: rational structure, experience, or a more complicated cooperation between them?', 'rationalism', 'empiricism'),
    historicalRelationship: branchStatement('“Rationalism” and “empiricism” are later organizing labels for early modern debates; they identify real contrasts without neatly sorting every author or argument into two camps.', 'rationalism', 'empiricism'),
    sharedAssumptions: [branchStatement('Both traditions seek publicly assessable reasons for belief and challenge inherited authority when it outruns argument, evidence, or method.', 'rationalism', 'empiricism')],
    axes: [
      {label: 'Sources of knowledge', question: branchStatement('What contribution can the mind make before, alongside, or beyond sensory experience?', 'rationalism', 'empiricism'), positions: [
        {entityId: 'rationalism', claim: branchStatement('Rationalist projects give reason, intelligible structure, and in several authors innate resources an important role in explaining knowledge.', 'rationalism')},
        {entityId: 'empiricism', claim: branchStatement('Empiricist projects emphasize experience, observation, reflection, and the limits of claims not answerable to them.', 'empiricism')},
      ], contrast: branchStatement('The contrast concerns explanatory priority and justification, not a choice between “thinking” and “having senses.”', 'rationalism', 'empiricism')},
      {label: 'Method and certainty', question: branchStatement('Should philosophy seek demonstrative foundations, experimental inquiry, or fallible practices calibrated to their subject?', 'rationalism', 'empiricism'), positions: [
        {entityId: 'rationalism', claim: branchStatement('Rationalists often test whether clear principles and deductive structure can secure knowledge against skeptical doubt.', 'rationalism')},
        {entityId: 'empiricism', claim: branchStatement('Empiricists often test how far observation, habit, experiment, and reflection can justify claims without pretending to certainty where it is unavailable.', 'empiricism')},
      ], contrast: branchStatement('Neither label dictates one method: early modern authors repeatedly mix mathematics, natural inquiry, metaphysics, and reflection.', 'rationalism', 'empiricism')},
    ],
    terminology: [{topic: 'Experience', positions: [
      {entityId: 'rationalism', term: 'innate resources and reason', explanation: branchStatement('Rationalist claims about reason or innateness vary sharply among Descartes, Spinoza, Leibniz, and their later interpreters.', 'rationalism')},
      {entityId: 'empiricism', term: 'experience', explanation: branchStatement('Empiricist “experience” can include sensation, reflection, experiment, habit, and social inquiry rather than bare uninterpreted data.', 'empiricism')},
    ], warning: branchStatement('Treating reason as anti-experience or experience as mindless observation reproduces the caricature the historical comparison is meant to correct.', 'rationalism', 'empiricism')}],
    arguments: [
      {entityId: 'rationalism', title: 'Explain necessity and intelligible order', summary: branchStatement('Rationalist arguments press the thought that some knowledge claims seem to demand more than a record of contingent observations.', 'rationalism'), pressure: branchStatement('They must explain how rational structure reaches the world without turning a preferred method into a guarantee of truth.', 'rationalism')},
      {entityId: 'empiricism', title: 'Make claims answerable to inquiry', summary: branchStatement('Empiricist arguments ask what experience, observation, or practice could support a claim and expose where confidence outruns those resources.', 'empiricism'), pressure: branchStatement('They must explain mathematics, necessity, causation, and self-knowledge without simply smuggling in the principles under dispute.', 'empiricism')},
    ],
    readings: [
      {entityId: 'rationalism', title: 'Meditations on First Philosophy, I–II', author: 'René Descartes', kind: 'primary', stage: 'Start with the skeptical pressure', whyHere: branchStatement('Read the doubt and cogito as moves in a larger project, not as a proof that all rationalists share one method.', 'rationalism')},
      {entityId: 'empiricism', title: 'An Enquiry Concerning Human Understanding, sections II–VII', author: 'David Hume', kind: 'primary', stage: 'Test an empiricist challenge', whyHere: branchStatement('Track how impressions, ideas, causation, and habit constrain the scope of philosophical claims.', 'empiricism')},
    ],
    interpretiveLimits: [branchStatement('The labels are retrospective and can conceal other early modern debates about religion, politics, gender, colonialism, science, and institutions.', 'rationalism', 'empiricism')],
    followOns: [{kind: 'philosopher', participantIds: ['kant', 'hume'], label: 'Kant and Hume', reason: philosopherStatement('Follow how Kant recasts a familiar early modern contrast through a critical account of the conditions of experience and knowledge.', 'kant', 'hume')}],
  }),
  branchCase(['deontology', 'utilitarianism'], {
    sharedQuestion: branchStatement('What makes an action right when duties, welfare, rights, and foreseeable harms pull in different directions?', 'deontology', 'utilitarianism'),
    historicalRelationship: branchStatement('The labels identify families of modern moral theory shaped by different authors, revisions, and applications; they are not two single doctrines speaking with one voice.', 'deontology', 'utilitarianism'),
    sharedAssumptions: [branchStatement('Both demand reasons that can criticize self-serving preference and require ethical judgment to account for other people, not merely the agent’s immediate aims.', 'deontology', 'utilitarianism')],
    axes: [
      {label: 'The ground of right action', question: branchStatement('Does rightness primarily depend on the principle of action or on the value of its consequences?', 'deontology', 'utilitarianism'), positions: [
        {entityId: 'deontology', claim: branchStatement('Deontological approaches give duties, rights, constraints, and the status of persons a role not reducible to aggregate outcome.', 'deontology')},
        {entityId: 'utilitarianism', claim: branchStatement('Utilitarian approaches assess actions and institutions through welfare, pleasure, suffering, or other accounts of overall good consequences.', 'utilitarianism')},
      ], contrast: branchStatement('The central dispute is about what may be done for a better total outcome and what must not be done even when benefits are tempting.', 'deontology', 'utilitarianism')},
      {label: 'Moral calculation and judgment', question: branchStatement('How should an agent reason when the effects of a choice are uncertain or widely distributed?', 'deontology', 'utilitarianism'), positions: [
        {entityId: 'deontology', claim: branchStatement('Deontological theories often test maxims, duties, permissions, and claims that agents owe one another.', 'deontology')},
        {entityId: 'utilitarianism', claim: branchStatement('Utilitarian theories must connect general welfare standards with decision procedures, evidence, institutions, and foreseeable consequences.', 'utilitarianism')},
      ], contrast: branchStatement('Neither theory is just an arithmetic shortcut: both need accounts of evidence, rules, institutions, and moral disagreement.', 'deontology', 'utilitarianism')},
    ],
    terminology: [{topic: 'Value and obligation', positions: [
      {entityId: 'deontology', term: 'duty', explanation: branchStatement('Duty can name Kantian obligations, pluralist prima facie duties, rights-based constraints, or other nonconsequentialist structures.', 'deontology')},
      {entityId: 'utilitarianism', term: 'utility', explanation: branchStatement('Utility has distinct Benthamite, Millian, rule-utilitarian, and contemporary interpretations; it is not simply private pleasure.', 'utilitarianism')},
    ], warning: branchStatement('“Rules versus results” is a useful first contrast but hides internal disagreement about rights, motives, distribution, character, and institutions.', 'deontology', 'utilitarianism')}],
    arguments: [
      {entityId: 'deontology', title: 'Respect persons as more than containers of welfare', summary: branchStatement('Deontological arguments press the worry that maximizing a total can license using an individual in ways incompatible with their standing as a person.', 'deontology'), pressure: branchStatement('They must explain conflicts among duties and why a constraint retains force when avoiding it could prevent grave harm.', 'deontology')},
      {entityId: 'utilitarianism', title: 'Make preventable suffering morally visible', summary: branchStatement('Utilitarian arguments press the worry that inviolable-looking rules can ignore avoidable suffering and the effects of institutions on many lives.', 'utilitarianism'), pressure: branchStatement('They must explain distribution, demandingness, rights, and whether an impartial aggregate can represent what individuals may permissibly do.', 'utilitarianism')},
    ],
    readings: [
      {entityId: 'deontology', title: 'Groundwork of the Metaphysics of Morals', author: 'Immanuel Kant', kind: 'primary', stage: 'Read a principle-based account', whyHere: branchStatement('Use the text to distinguish universalizability and humanity formulations from a slogan about following rules.', 'deontology')},
      {entityId: 'utilitarianism', title: 'Utilitarianism', author: 'John Stuart Mill', kind: 'primary', stage: 'Read the consequentialist case', whyHere: branchStatement('Track Mill’s treatment of happiness, quality, proof, justice, and objection rather than reducing utility to immediate pleasure.', 'utilitarianism')},
    ],
    interpretiveLimits: [branchStatement('Historical authors and later theories disagree internally, and real cases often involve descriptive uncertainty before either moral framework is applied.', 'deontology', 'utilitarianism')],
    followOns: [{kind: 'branch', participantIds: ['rationalism', 'empiricism'], label: 'Rationalism and Empiricism', reason: branchStatement('Compare how moral theories also rely on rival views about reason, evidence, sentiment, and the authority of experience.', 'deontology', 'utilitarianism')}],
  }),
  philosopherCase(['kant', 'hume'], {
    sharedQuestion: philosopherStatement('How can human beings justify knowledge, causal inference, and moral judgment without claiming access to a standpoint outside experience?', 'kant', 'hume'),
    historicalRelationship: philosopherStatement('Kant read Hume and treats skeptical pressure as decisive for critical philosophy, but the famous story that Hume simply “awakened” Kant should not replace attention to Kant’s wider sources and development.', 'kant', 'hume'),
    sharedAssumptions: [philosopherStatement('Both reject easy metaphysical dogmatism and make the limits and conditions of human cognition central philosophical questions.', 'kant', 'hume')],
    axes: [
      {label: 'Causation and necessity', question: philosopherStatement('What justifies our expectation that events will occur in regular causal patterns?', 'kant', 'hume'), positions: [
        {entityId: 'hume', claim: philosopherStatement('Hume analyzes causal belief through experience, custom, and the mind’s transition from observed regularities rather than an impression of necessary connection.', 'hume')},
        {entityId: 'kant', claim: philosopherStatement('Kant argues that causal order belongs among conditions through which experience of an objective world is possible for us.', 'kant')},
      ], contrast: philosopherStatement('Kant does not merely add a stronger causal fact to Hume’s observations; he changes the question toward the conditions of possible experience.', 'kant', 'hume')},
      {label: 'Reason and morality', question: philosopherStatement('What authority can reason have over belief, feeling, and action?', 'kant', 'hume'), positions: [
        {entityId: 'hume', claim: philosopherStatement('Hume’s moral philosophy gives sentiment, sympathy, convention, and reflection central roles while resisting a simple derivation of values from abstract reason alone.', 'hume')},
        {entityId: 'kant', claim: philosopherStatement('Kant grounds moral obligation in practical reason and autonomy while distinguishing moral worth from inclination or merely successful outcomes.', 'kant')},
      ], contrast: philosopherStatement('The contrast is not cold reason versus mere feeling: each philosopher offers a complex account of human nature, judgment, and normativity.', 'kant', 'hume')},
    ],
    terminology: [{topic: 'Experience', positions: [
      {entityId: 'hume', term: 'impressions and ideas', explanation: philosopherStatement('Hume’s vocabulary tracks the liveliness, association, and origin of perceptions rather than a simple inventory of external objects.', 'hume')},
      {entityId: 'kant', term: 'a priori and categories', explanation: philosopherStatement('Kant uses these terms to analyze the contribution of cognitive forms and concepts to possible experience, not to license unconstrained speculation.', 'kant')},
    ], warning: philosopherStatement('Anachronistic use of “empiricism” and “rationalism” can hide the distinctive critical problem each thinker is trying to solve.', 'kant', 'hume')}],
    arguments: [
      {entityId: 'hume', title: 'Ask for the source of an idea', summary: philosopherStatement('Hume’s method asks what impression, experience, or practice supports a concept and exposes where purported necessity exceeds that support.', 'hume'), pressure: philosopherStatement('The resulting account must explain why mathematical, causal, and moral reasoning can guide life without a direct impression of necessity or value.', 'hume')},
      {entityId: 'kant', title: 'Investigate the conditions of possible experience', summary: philosopherStatement('Kant’s critical argument asks what structures must be in place for objectively ordered experience and norm-governed judgment to be possible for finite knowers.', 'kant'), pressure: philosopherStatement('It must explain how such conditions bind us without reintroducing the dogmatic metaphysics it criticizes.', 'kant')},
    ],
    readings: [
      {entityId: 'hume', title: 'An Enquiry Concerning Human Understanding, sections IV–VII', author: 'David Hume', kind: 'primary', stage: 'Read the skeptical pressure', whyHere: philosopherStatement('Track the argument about induction and causation before reading Kant’s reconstruction of its significance.', 'hume')},
      {entityId: 'kant', title: 'Prolegomena, §§4–27', author: 'Immanuel Kant', kind: 'primary', stage: 'Read the critical response', whyHere: philosopherStatement('It offers a comparatively direct entrance to Kant’s question about synthetic a priori knowledge and experience.', 'kant')},
    ],
    interpretiveLimits: [philosopherStatement('Hume’s skepticism and Kant’s response have many competing interpretations; no short comparison settles debates over naturalism, idealism, or the scope of critique.', 'kant', 'hume')],
    followOns: [{kind: 'branch', participantIds: ['rationalism', 'empiricism'], label: 'Rationalism and Empiricism', reason: branchStatement('Return to the broader early modern labels only after seeing how Kant and Hume complicate their apparent opposition.', 'rationalism', 'empiricism')}],
  }),
  philosopherCase(['beauvoir', 'sartre'], {
    sharedQuestion: philosopherStatement('How can freedom be real when persons are embodied, socially situated, and exposed to the freedom of others?', 'beauvoir', 'sartre'),
    historicalRelationship: philosopherStatement('Beauvoir and Sartre were close intellectual interlocutors, but Beauvoir’s work has its own arguments, genres, political commitments, and critical reception; it should not be treated as an appendix to Sartre.', 'beauvoir', 'sartre'),
    sharedAssumptions: [philosopherStatement('Both draw on phenomenology and existentialism to analyze freedom, responsibility, conflict, and the danger of evading one’s situation.', 'beauvoir', 'sartre')],
    axes: [
      {label: 'Freedom and situation', question: philosopherStatement('How does a person choose when body, history, oppression, and relations already shape the field of action?', 'beauvoir', 'sartre'), positions: [
        {entityId: 'sartre', claim: philosopherStatement('Sartre analyzes consciousness, projects, bad faith, and responsibility through an account of freedom that refuses to make social facticity a total excuse.', 'sartre')},
        {entityId: 'beauvoir', claim: philosopherStatement('Beauvoir develops an ethics of ambiguity that makes freedom inseparable from concrete situations, reciprocal projects, oppression, and the freedom of others.', 'beauvoir')},
      ], contrast: philosopherStatement('Beauvoir does not simply supply “context” to an otherwise complete Sartrean freedom; she changes the ethical and political stakes of how freedom is understood.', 'beauvoir', 'sartre')},
      {label: 'Otherness and ethics', question: philosopherStatement('What does another person’s freedom demand of mine?', 'beauvoir', 'sartre'), positions: [
        {entityId: 'sartre', claim: philosopherStatement('Sartre examines being-for-others, conflict, recognition, and bad faith through phenomenological descriptions of relations and projects.', 'sartre')},
        {entityId: 'beauvoir', claim: philosopherStatement('Beauvoir connects ethical ambiguity to material and gendered conditions that can make some people into objects for others’ projects.', 'beauvoir')},
      ], contrast: philosopherStatement('Their shared vocabulary does not entail a settled shared ethics; feminist readings and Sartre scholarship continue to dispute the relation.', 'beauvoir', 'sartre')},
    ],
    terminology: [{topic: 'Evasion', positions: [
      {entityId: 'sartre', term: 'bad faith', explanation: philosopherStatement('Bad faith names unstable attempts to deny either one’s facticity or one’s freedom within a situation.', 'sartre')},
      {entityId: 'beauvoir', term: 'ambiguity', explanation: philosopherStatement('Ambiguity names the irreducible condition of being both free and situated, which Beauvoir treats as an ethical problem rather than an excuse for passivity.', 'beauvoir')},
    ], warning: philosopherStatement('The terms overlap in an existential vocabulary but should not be used to erase Beauvoir’s analysis of gender, embodiment, and oppression.', 'beauvoir', 'sartre')}],
    arguments: [
      {entityId: 'sartre', title: 'Responsibility cannot be outsourced', summary: philosopherStatement('Sartre’s analysis pressures attempts to let social roles, emotions, or fixed identities decide a person’s projects in advance.', 'sartre'), pressure: philosopherStatement('It must explain how responsibility remains meaningful under conditions of severe material and political constraint.', 'sartre')},
      {entityId: 'beauvoir', title: 'Freedom is ethically reciprocal and situated', summary: philosopherStatement('Beauvoir argues that willing one’s freedom requires willing the freedom of others while confronting the concrete structures that obstruct it.', 'beauvoir'), pressure: philosopherStatement('Her work raises difficult questions about how ethical reciprocity operates amid unequal power, violence, and compromised agency.', 'beauvoir')},
    ],
    readings: [
      {entityId: 'sartre', title: 'Existentialism Is a Humanism', author: 'Jean-Paul Sartre', kind: 'primary', stage: 'Enter the existential question', whyHere: philosopherStatement('Use the lecture as an introduction, then test its compressed claims against Sartre’s more difficult phenomenological work.', 'sartre')},
      {entityId: 'beauvoir', title: 'The Ethics of Ambiguity, Part I', author: 'Simone de Beauvoir', kind: 'primary', stage: 'Read Beauvoir on her own terms', whyHere: philosopherStatement('It introduces ambiguity, freedom, and ethical relation before moving to The Second Sex and political writings.', 'beauvoir')},
    ],
    interpretiveLimits: [philosopherStatement('Their friendship, collaboration, disagreement, and later receptions are historically important but do not authorize biographical reduction of either philosopher’s arguments.', 'beauvoir', 'sartre')],
    followOns: [{kind: 'branch', participantIds: ['buddhist-philosophy', 'vedanta'], label: 'Buddhist Philosophy and Vedānta', reason: branchStatement('Shift traditions and test how different accounts of self, situation, and liberation complicate familiar existential vocabulary.', 'buddhist-philosophy', 'vedanta')}],
  }),
];

export const comparisonCasefileKey = (kind: ComparisonKind, firstId: string, secondId: string): string =>
  `${kind}:${[firstId, secondId].sort().join(':')}`;

const casefileByKey = new Map(
  comparisonCasefiles.map((casefile) => [
    comparisonCasefileKey(casefile.kind, casefile.participantIds[0], casefile.participantIds[1]),
    casefile,
  ]),
);

export const getComparisonCasefile = (kind: ComparisonKind, firstId: string, secondId: string): ComparisonCasefile | undefined =>
  casefileByKey.get(comparisonCasefileKey(kind, firstId, secondId));

export const resolveComparisonEvidence = (reference: ComparisonEvidenceRef) => {
  const entity = reference.entityKind === 'branch'
    ? branchById(reference.entityId)
    : philosopherById(reference.entityId);
  return entity?.editorial?.sources.find(({id}) => id === reference.sourceId);
};
