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
  legalism: 'legalism-sep', platonism: 'pla-middle-sep', aristotelianism: 'ari-metaphysics-sep',
  'chinese-philosophy': 'chi-lai', metaphysics: 'met-sep', ontology: 'ont-logic-sep',
  'analytic-philosophy': 'ana-iep', 'continental-philosophy': 'con-companion',
  'virtue-ethics': 'vir-sep', daoism: 'daoism-sep', jainism: 'jain-sep',
  existentialism: 'exi-sep', phenomenology: 'phe-sep',
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
  branchCase(['stoicism', 'buddhist-philosophy'], {
    sharedQuestion: branchStatement('How can disciplined practice loosen the judgments, cravings, and attachments through which suffering gains control over a life?', 'stoicism', 'buddhist-philosophy'),
    historicalRelationship: branchStatement('This is a retrospective philosophical comparison, not evidence of a direct ancient exchange: Stoicism formed in the Hellenistic Mediterranean, while Buddhist traditions developed from South Asian teachings and institutions with distinct textual histories.', 'stoicism', 'buddhist-philosophy'),
    sharedAssumptions: [branchStatement('Both treat ethical transformation as trained practice rather than assent to a slogan, and both connect destructive distress to how a person understands and responds to experience.', 'stoicism', 'buddhist-philosophy')],
    axes: [
      {label: 'Self and agency', question: branchStatement('What kind of agent undertakes the work of liberation or ethical freedom?', 'stoicism', 'buddhist-philosophy'), positions: [
        {entityId: 'stoicism', claim: branchStatement('Stoics address a rational and socially situated agent whose assent, impulse, and character can become virtuous within a causally ordered cosmos.', 'stoicism')},
        {entityId: 'buddhist-philosophy', claim: branchStatement('Buddhist analyses deny an independent, permanent self and examine persons through changing aggregates, dependent conditions, karma, and paths of cultivation.', 'buddhist-philosophy')},
      ], contrast: branchStatement('Stoic self-command strengthens rational agency; Buddhist non-self analysis questions the very attachment to an enduring controller, without erasing conventional agency or responsibility.', 'stoicism', 'buddhist-philosophy')},
      {label: 'The source of distress', question: branchStatement('Which attachment or error must practice transform?', 'stoicism', 'buddhist-philosophy'), positions: [
        {entityId: 'stoicism', claim: branchStatement('Stoic passions involve evaluative judgments that mistake externals for genuine goods or evils; correction aims at virtue, appropriate action, and freedom from destructive passion.', 'stoicism')},
        {entityId: 'buddhist-philosophy', claim: branchStatement('Buddhist paths diagnose suffering through craving, ignorance, and dependent origination, while traditions disagree about the analysis of mind, reality, and awakening.', 'buddhist-philosophy')},
      ], contrast: branchStatement('Both retrain response, but Stoic therapy is governed by virtue in a providentially ordered nature, whereas Buddhist liberation is organized around suffering, impermanence, non-self, and cessation.', 'stoicism', 'buddhist-philosophy')},
    ],
    terminology: [{topic: 'Release from disturbance', positions: [
      {entityId: 'stoicism', term: 'apatheia', explanation: branchStatement('Apatheia is freedom from passions grounded in false value judgments, not indifference to other people or the absence of every feeling.', 'stoicism')},
      {entityId: 'buddhist-philosophy', term: 'nirvāṇa', explanation: branchStatement('Nirvāṇa names the cessation of the conditions of suffering within Buddhist soteriology; accounts of its meaning and path vary across traditions.', 'buddhist-philosophy')},
    ], warning: branchStatement('Apatheia and nirvāṇa are not translations of one another: their ethical, psychological, cosmological, and institutional settings differ.', 'stoicism', 'buddhist-philosophy')}],
    arguments: [
      {entityId: 'stoicism', title: 'Make the good resistant to fortune', summary: branchStatement('If virtue alone determines moral worth, loss and illness can wound a life without turning the sufferer into a bad person or removing the demand for just action.', 'stoicism'), pressure: branchStatement('The view must explain grief, dependency, and material injustice without treating external harms as ethically negligible.', 'stoicism')},
      {entityId: 'buddhist-philosophy', title: 'Trace suffering through dependent conditions', summary: branchStatement('Buddhist analysis asks how craving and mistaken appropriation reproduce suffering, then tests practices that weaken those conditions rather than securing a permanent self.', 'buddhist-philosophy'), pressure: branchStatement('Comparison must preserve disagreements among early Buddhist, Madhyamaka, Yogācāra, Abhidharma, and later traditions.', 'buddhist-philosophy')},
    ],
    readings: [
      {entityId: 'stoicism', title: 'Discourses, Book I', author: 'Epictetus', kind: 'primary', stage: 'Begin with assent and agency', whyHere: branchStatement('The Discourses place exercises of judgment inside a demanding account of character, role, and responsibility.', 'stoicism')},
      {entityId: 'buddhist-philosophy', title: 'Anattalakkhaṇa Sutta (SN 22.59)', author: 'Early Buddhist traditions', kind: 'primary', stage: 'Test the non-self analysis', whyHere: branchStatement('Read the argument about the aggregates before importing a modern theory of identity or a Stoic ideal of self-mastery.', 'buddhist-philosophy')},
    ],
    interpretiveLimits: [branchStatement('Similar exercises do not establish a shared doctrine, and modern therapeutic receptions should not be projected backward as proof of historical equivalence.', 'stoicism', 'buddhist-philosophy')],
    followOns: [{kind: 'branch', participantIds: ['buddhist-philosophy', 'jainism'], label: 'Buddhist Philosophy and Jainism', reason: branchStatement('Stay in South Asian debates and compare liberation, karma, nonviolence, and rival accounts of the living self.', 'buddhist-philosophy', 'jainism')}],
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
  branchCase(['mohism', 'legalism'], {
    sharedQuestion: branchStatement('What public standards can end disorder when private advantage, inherited rank, and unreliable officials distort political judgment?', 'mohism', 'legalism'),
    historicalRelationship: branchStatement('Mohist and fa-oriented texts arose in Warring States argument and statecraft, but “Legalism” is a later, imperfect grouping of distinct thinkers rather than the name of one contemporary school.', 'mohism', 'legalism'),
    sharedAssumptions: [branchStatement('Both distrust rule by inherited prestige alone and seek publicly usable standards, offices, incentives, or tests that do not depend on a ruler simply recognizing private virtue.', 'mohism', 'legalism')],
    axes: [
      {label: 'The end of government', question: branchStatement('Whose good determines whether an institution succeeds?', 'mohism', 'legalism'), positions: [
        {entityId: 'mohism', claim: branchStatement('Mohist texts judge policies by inclusive benefit, material sufficiency, population, order, and opposition to aggressive war, under an impartial Heaven.', 'mohism')},
        {entityId: 'legalism', claim: branchStatement('Fa thinkers prioritize a strong, orderly state and ruler, using agriculture, warfare, law, office, and administrative control to channel self-interest.', 'legalism')},
      ], contrast: branchStatement('Mohist standards claim a moral end in benefit to all under Heaven; fa statecraft makes institutional capacity and the security of rule central.', 'mohism', 'legalism')},
      {label: 'How standards work', question: branchStatement('Should order depend on moral emulation or on impersonal administration?', 'mohism', 'legalism'), positions: [
        {entityId: 'mohism', claim: branchStatement('Mohists combine models, argument, merit, upward conformity, rewards, and the intention of Heaven in a program meant to reform conduct and judgment.', 'mohism')},
        {entityId: 'legalism', claim: branchStatement('Han Fei and related fa thinkers emphasize public laws, matching claims to performance, administrative technique, and the ruler’s control of reward and punishment.', 'legalism')},
      ], contrast: branchStatement('Both value standards and incentives, but they justify and direct them toward different moral and political objects.', 'mohism', 'legalism')},
    ],
    terminology: [{topic: 'Standards', positions: [
      {entityId: 'mohism', term: 'fa as models', explanation: branchStatement('Mohist fa can be models or standards used to distinguish acceptable claims and practices by accessible tests and consequences.', 'mohism')},
      {entityId: 'legalism', term: 'fa as public norms', explanation: branchStatement('In fa statecraft, law-like standards join administrative techniques and positional power; the tradition cannot be reduced to statutes alone.', 'legalism')},
    ], warning: branchStatement('The shared graph fa does not establish a shared political philosophy, and translating it simply as “law” hides its wider uses.', 'mohism', 'legalism')}],
    arguments: [
      {entityId: 'mohism', title: 'Judge rule by inclusive benefit', summary: branchStatement('Mohist argument exposes the public costs of partiality, lavish display, fatalism, and aggressive war, then asks institutions to benefit ordinary people.', 'mohism'), pressure: branchStatement('Its program must explain coercive conformity, the authority assigned to Heaven, and how plural goods should be weighed.', 'mohism')},
      {entityId: 'legalism', title: 'Design for predictable incentives', summary: branchStatement('Fa arguments press the problem that moral exhortation cannot reliably control ministers, succession, taxation, military competition, or official performance.', 'legalism'), pressure: branchStatement('Administrative effectiveness does not by itself justify the ruler’s ends or protect subjects from domination and punishment.', 'legalism')},
    ],
    readings: [
      {entityId: 'mohism', title: 'Mozi, “Impartial Concern” and “Condemning Aggressive War”', author: 'Mohist communities', kind: 'primary', stage: 'Read the moral standard', whyHere: branchStatement('These chapters connect impartial concern to arguments about benefit, conflict, and public policy.', 'mohism')},
      {entityId: 'legalism', title: 'Han Feizi, selections on the two handles and matching names to results', author: 'Han Feizi', kind: 'primary', stage: 'Read the administrative response', whyHere: branchStatement('The selections show why technique, office, performance, reward, and punishment form a system rather than a slogan about harsh law.', 'legalism')},
    ],
    interpretiveLimits: [branchStatement('Neither Mohism nor the retrospectively grouped fa tradition is internally uniform, and neither maps cleanly onto modern utilitarianism, technocracy, rule of law, or authoritarianism.', 'mohism', 'legalism')],
    followOns: [{kind: 'branch', participantIds: ['confucianism', 'daoism'], label: 'Confucianism and Daoism', reason: branchStatement('Compare a different dispute over cultivation, inherited forms, non-forcing, and the danger of rigid standards.', 'confucianism', 'daoism')}],
  }),
  branchCase(['chinese-philosophy', 'confucianism'], {
    sharedQuestion: branchStatement('When does a broad historical field clarify a debate, and when must interpretation move to one specific lineage, corpus, or practice?', 'chinese-philosophy', 'confucianism'),
    historicalRelationship: branchStatement('Chinese Philosophy is an umbrella for many changing debates; Confucianism is one internally diverse tradition within that field, alongside Daoist, Mohist, fa, Buddhist, and other conversations.', 'chinese-philosophy', 'confucianism'),
    sharedAssumptions: [branchStatement('Both labels direct attention to philosophy formed through Chinese texts, languages, institutions, and receptions, while neither names a single timeless doctrine.', 'chinese-philosophy', 'confucianism')],
    axes: [
      {label: 'Scope of the label', question: branchStatement('What kind of unity does each category claim?', 'chinese-philosophy', 'confucianism'), positions: [
        {entityId: 'chinese-philosophy', claim: branchStatement('The umbrella organizes rival schools and later transformations without implying that they agree on the Way, human nature, government, knowledge, or reality.', 'chinese-philosophy')},
        {entityId: 'confucianism', claim: branchStatement('The tradition links arguments about learning, ritual, humaneness, family, government, and canonical interpretation across sharply different thinkers and periods.', 'confucianism')},
      ], contrast: branchStatement('One category maps a plural field; the other follows a particular, contested lineage inside it, so they are nested rather than symmetrical rivals.', 'chinese-philosophy', 'confucianism')},
      {label: 'Explanatory stakes', question: branchStatement('What disappears when the broader or narrower frame is used alone?', 'chinese-philosophy', 'confucianism'), positions: [
        {entityId: 'chinese-philosophy', claim: branchStatement('The broad frame preserves Mohist, Daoist, fa, Buddhist, and other challenges that make the history an argument rather than a Confucian consensus.', 'chinese-philosophy')},
        {entityId: 'confucianism', claim: branchStatement('The narrower frame makes visible disputes among Confucius, Mencius, Xunzi, Zhu Xi, Wang Yangming, and modern interpreters that an umbrella survey can compress.', 'confucianism')},
      ], contrast: branchStatement('Breadth prevents one-tradition reduction; lineage-specific study prevents regional context from substituting for an actual position.', 'chinese-philosophy', 'confucianism')},
    ],
    terminology: [{topic: 'The Way', positions: [
      {entityId: 'chinese-philosophy', term: 'dao across debates', explanation: branchStatement('Dao can name rival ways, guidance, practices, or patterns across texts; its recurrence does not guarantee doctrinal agreement.', 'chinese-philosophy')},
      {entityId: 'confucianism', term: 'the Confucian dao', explanation: branchStatement('Confucian uses connect the Way to learning, ritual, humane relationships, exemplary rule, and contested accounts of cultivation.', 'confucianism')},
    ], warning: branchStatement('A shared translated word should prompt comparison of textual use, not a claim that all Chinese traditions express one holistic worldview.', 'chinese-philosophy', 'confucianism')}],
    arguments: [
      {entityId: 'chinese-philosophy', title: 'Preserve the argument culture', summary: branchStatement('A plural field frame keeps conquest, institutions, translation, and rivalry visible instead of making one school the voice of a civilization.', 'chinese-philosophy'), pressure: branchStatement('An umbrella can become so broad that it supplies context without enough conceptual precision to answer a philosophical question.', 'chinese-philosophy')},
      {entityId: 'confucianism', title: 'Follow a durable contested lineage', summary: branchStatement('A tradition frame lets readers trace how canonical texts, commentaries, ritual, education, and political criticism were reconstructed over time.', 'confucianism'), pressure: branchStatement('It must not turn later canonization or state sponsorship into proof that Confucianism exhausted Chinese philosophy.', 'confucianism')},
    ],
    readings: [
      {entityId: 'chinese-philosophy', title: 'Classical Chinese philosophical texts', author: 'Chinese Text Project', kind: 'primary', stage: 'Survey rival corpora', whyHere: branchStatement('Sample named texts side by side so the umbrella category remains visibly plural and source-based.', 'chinese-philosophy')},
      {entityId: 'confucianism', title: 'Analects, Books 1–4', author: 'Confucius and transmitters', kind: 'primary', stage: 'Enter one lineage closely', whyHere: branchStatement('The layered text introduces learning, ritual, relationship, and humane conduct without standing for every later Confucian view.', 'confucianism')},
    ],
    interpretiveLimits: [branchStatement('Because the categories are nested, this casefile clarifies scale and method rather than staging a doctrinal contest between equal opponents.', 'chinese-philosophy', 'confucianism')],
    followOns: [{kind: 'branch', participantIds: ['confucianism', 'daoism'], label: 'Confucianism and Daoism', reason: branchStatement('Move from field boundaries to a historically sharper dispute about cultivation, standards, and non-forcing.', 'confucianism', 'daoism')}],
  }),
  branchCase(['confucianism', 'daoism'], {
    sharedQuestion: branchStatement('Does good order emerge through cultivated forms and relationships, or by loosening the forcing and fixed distinctions through which people try to impose order?', 'confucianism', 'daoism'),
    historicalRelationship: branchStatement('Classical texts later grouped as Confucian and Daoist developed amid overlapping debates about dao, names, government, cultivation, and skill, but both labels cover layered corpora and later traditions.', 'confucianism', 'daoism'),
    sharedAssumptions: [branchStatement('Both ask how conduct can become responsive to a larger way of life and criticize rulers whose desires and coercion deform social order.', 'confucianism', 'daoism')],
    axes: [
      {label: 'Cultivation and form', question: branchStatement('Do inherited practices educate responsiveness or obstruct it?', 'confucianism', 'daoism'), positions: [
        {entityId: 'confucianism', claim: branchStatement('Confucian traditions treat ritual, study, music, family relation, and exemplary conduct as practices through which feeling and judgment can be cultivated.', 'confucianism')},
        {entityId: 'daoism', claim: branchStatement('Daoist texts question rigid naming, moral display, and coercive schemes, often praising non-forcing, adaptive skill, simplicity, and responsiveness to changing situations.', 'daoism')},
      ], contrast: branchStatement('Confucian practice reforms desire through patterned participation; Daoist critique asks when the pattern itself becomes an artificial obstacle to attunement.', 'confucianism', 'daoism')},
      {label: 'Political action', question: branchStatement('How should a ruler act without producing greater disorder?', 'confucianism', 'daoism'), positions: [
        {entityId: 'confucianism', claim: branchStatement('Confucian arguments emphasize cultivated example, humane government, appropriate roles, remonstrance, and institutions of learning.', 'confucianism')},
        {entityId: 'daoism', claim: branchStatement('Daodejing-oriented arguments warn that aggressive intervention, status competition, and multiplying prohibitions can generate the disorder they claim to cure.', 'daoism')},
      ], contrast: branchStatement('Both can oppose punitive overreach, but they diagnose and repair political distortion through different accounts of norm, desire, and action.', 'confucianism', 'daoism')},
    ],
    terminology: [{topic: 'Following the Way', positions: [
      {entityId: 'confucianism', term: 'li and ren', explanation: branchStatement('Ritual propriety and humaneness concern formed relationships and responsive conduct, not etiquette mechanically obeyed.', 'confucianism')},
      {entityId: 'daoism', term: 'wuwei and ziran', explanation: branchStatement('Non-forcing and spontaneity name modes of action less dominated by contrivance; they do not prescribe literal inactivity.', 'daoism')},
    ], warning: branchStatement('“Harmony” and “the Way” are insufficient comparisons unless the text, practice, and disputed standard are named.', 'confucianism', 'daoism')}],
    arguments: [
      {entityId: 'confucianism', title: 'Good judgment is socially cultivated', summary: branchStatement('Confucian reasoning presses the fact that people learn attention, feeling, and responsibility through relationships and practices rather than inventing themselves alone.', 'confucianism'), pressure: branchStatement('Inherited rites and roles can also entrench hierarchy, exclusion, or deference unless their authority remains criticizable.', 'confucianism')},
      {entityId: 'daoism', title: 'Forced order defeats its own purpose', summary: branchStatement('Daoist critique exposes how fixed distinctions, reputation, utility, and controlling action can narrow perception and multiply conflict.', 'daoism'), pressure: branchStatement('Non-forcing must still guide action amid injustice and cannot be assumed to settle institutional questions by itself.', 'daoism')},
    ],
    readings: [
      {entityId: 'confucianism', title: 'Analects', author: 'Confucius and followers', kind: 'primary', stage: 'Read cultivation in aphoristic form', whyHere: branchStatement('Track learning, ritual, relationship, and government before treating Confucianism as a fixed code.', 'confucianism')},
      {entityId: 'daoism', title: 'Daodejing in two reputable translations', author: 'Laozi tradition', kind: 'primary', stage: 'Compare non-forcing across translations', whyHere: branchStatement('Differences between translations make the conceptual risks of easy equivalence visible.', 'daoism')},
    ],
    interpretiveLimits: [branchStatement('Later religious Daoism, Neo-Confucian borrowing, imperial institutions, and modern reconstructions exceed a simple two-school opposition.', 'confucianism', 'daoism')],
    followOns: [{kind: 'branch', participantIds: ['confucianism', 'mohism'], label: 'Confucianism and Mohism', reason: branchStatement('Turn from non-forcing to the sharper classical dispute over graded care, impartial concern, ritual, and public benefit.', 'confucianism', 'mohism')}],
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
  branchCase(['buddhist-philosophy', 'jainism'], {
    sharedQuestion: branchStatement('How can embodied beings escape karmic bondage and suffering through knowledge, discipline, and transformed conduct?', 'buddhist-philosophy', 'jainism'),
    historicalRelationship: branchStatement('Buddhist and Jain communities emerged in the wider śramaṇa environment of ancient South Asia and developed through long debate, institutional rivalry, and distinct canons rather than as two versions of one path.', 'buddhist-philosophy', 'jainism'),
    sharedAssumptions: [branchStatement('Both connect liberation to disciplined conduct, reject the sufficiency of inherited ritual status, and make the consequences of harmful action central to the path.', 'buddhist-philosophy', 'jainism')],
    axes: [
      {label: 'What is liberated', question: branchStatement('Does liberation perfect a living self or undo attachment to any permanent self?', 'buddhist-philosophy', 'jainism'), positions: [
        {entityId: 'buddhist-philosophy', claim: branchStatement('Buddhist traditions analyze persons without an eternal independent self, using aggregates and dependent arising while disagreeing over the status of persons and consciousness.', 'buddhist-philosophy')},
        {entityId: 'jainism', claim: branchStatement('Jain philosophy affirms living, conscious substances whose capacities are obscured by karmic matter and disclosed through purification.', 'jainism')},
      ], contrast: branchStatement('The traditions disagree at the center: Jain liberation releases the jīva, whereas Buddhist non-self analysis rejects that enduring substance.', 'buddhist-philosophy', 'jainism')},
      {label: 'Action and nonviolence', question: branchStatement('How does conduct bind, purify, or cease the processes that sustain suffering?', 'buddhist-philosophy', 'jainism'), positions: [
        {entityId: 'buddhist-philosophy', claim: branchStatement('Buddhist ethics relates intention, karma, compassion, discipline, and insight within varied monastic and lay paths.', 'buddhist-philosophy')},
        {entityId: 'jainism', claim: branchStatement('Jain discipline radicalizes nonviolence and restraint because actions and passions contribute to karmic influx and bondage of living beings.', 'jainism')},
      ], contrast: branchStatement('Both condemn harm, but Jain karmic materialism and Buddhist intention-centered analyses give nonviolence different metaphysical and practical roles.', 'buddhist-philosophy', 'jainism')},
    ],
    terminology: [{topic: 'Karma', positions: [
      {entityId: 'buddhist-philosophy', term: 'kamma / karma', explanation: branchStatement('Buddhist accounts emphasize intentional action and its conditioning consequences without positing a permanent owner of karma.', 'buddhist-philosophy')},
      {entityId: 'jainism', term: 'karman', explanation: branchStatement('Jain accounts describe subtle karmic matter binding to the jīva through action, passion, and carelessness.', 'jainism')},
    ], warning: branchStatement('The same Sanskrit-derived term belongs to rival causal and ontological theories; it should not be translated as a single cosmic reward system.', 'buddhist-philosophy', 'jainism')}],
    arguments: [
      {entityId: 'buddhist-philosophy', title: 'No permanent owner is required', summary: branchStatement('Dependent continuity can explain suffering, practice, and responsibility without treating a changing person as an eternal substance.', 'buddhist-philosophy'), pressure: branchStatement('Different Buddhist schools give importantly different accounts of continuity, mind, conventional persons, and liberation.', 'buddhist-philosophy')},
      {entityId: 'jainism', title: 'Many living standpoints are real', summary: branchStatement('Jain realism connects the plurality of living selves to disciplined nonviolence and many-sided analysis of complex objects and claims.', 'jainism'), pressure: branchStatement('The relation between many-sidedness, omniscience, and determinate truth requires more care than the slogan that every view is true.', 'jainism')},
    ],
    readings: [
      {entityId: 'buddhist-philosophy', title: 'Selected early discourses', author: 'Early Buddhist traditions', kind: 'primary', stage: 'Read suffering and non-self', whyHere: branchStatement('Begin with named discourses before treating later Buddhist metaphysics as one original doctrine.', 'buddhist-philosophy')},
      {entityId: 'jainism', title: 'Ācārāṅga Sūtra, Book I', author: 'Śvetāmbara canonical transmitters', kind: 'primary', stage: 'Read disciplined nonviolence', whyHere: branchStatement('The text gives restraint and harm their ascetic setting before comparison with a general ethics of compassion.', 'jainism')},
    ],
    interpretiveLimits: [branchStatement('Both traditions span languages, sects, philosophical schools, lay and monastic practices, and changing historical settings that no single self-versus-no-self axis exhausts.', 'buddhist-philosophy', 'jainism')],
    followOns: [{kind: 'branch', participantIds: ['buddhist-philosophy', 'vedanta'], label: 'Buddhist Philosophy and Vedānta', reason: branchStatement('Continue the self debate through rival interpretations of liberation, ultimate reality, and scriptural authority.', 'buddhist-philosophy', 'vedanta')}],
  }),
  branchCase(['platonism', 'aristotelianism'], {
    sharedQuestion: branchStatement('How can changing particular things be intelligible through stable forms, causes, definitions, and ordered inquiry?', 'platonism', 'aristotelianism'),
    historicalRelationship: branchStatement('Aristotle studied in Plato’s Academy and criticized Platonic positions, but Platonism and Aristotelianism are later, internally diverse reception traditions extending through Greek, Arabic, Jewish, Christian, and modern settings.', 'platonism', 'aristotelianism'),
    sharedAssumptions: [branchStatement('Both treat philosophy as systematic inquiry linking logic, knowledge, nature, ethics, and first principles, and both became adaptable curricula for later commentators.', 'platonism', 'aristotelianism')],
    axes: [
      {label: 'Forms and particulars', question: branchStatement('How does an intelligible structure explain the many changing things that exhibit it?', 'platonism', 'aristotelianism'), positions: [
        {entityId: 'platonism', claim: branchStatement('Platonist traditions often give intelligible Forms or principles explanatory priority over sensible particulars, though separation and participation receive many interpretations.', 'platonism')},
        {entityId: 'aristotelianism', claim: branchStatement('Aristotelian traditions analyze substances through form and matter, essence, actuality, potentiality, and causes rather than a separate realm of Forms.', 'aristotelianism')},
      ], contrast: branchStatement('The dispute concerns where explanatory form belongs and how it accounts for particulars, not whether either side recognizes structure.', 'platonism', 'aristotelianism')},
      {label: 'The route to knowledge', question: branchStatement('Should inquiry ascend toward first principles or begin from differentiated natural subjects?', 'platonism', 'aristotelianism'), positions: [
        {entityId: 'platonism', claim: branchStatement('Platonist dialectic, recollection, mathematical order, and purification place transformation of the knower within the ascent toward intelligible reality.', 'platonism')},
        {entityId: 'aristotelianism', claim: branchStatement('Aristotelian inquiry starts from appearances, distinctions, and established opinions, then seeks demonstrations and causes appropriate to each subject.', 'aristotelianism')},
      ], contrast: branchStatement('Platonist ascent and Aristotelian differentiation are recurring orientations, not algorithms uniformly followed by every later member of either tradition.', 'platonism', 'aristotelianism')},
    ],
    terminology: [{topic: 'Form', positions: [
      {entityId: 'platonism', term: 'eidos / idea', explanation: branchStatement('A Form can function as a stable intelligible object and explanatory standard, but Plato’s dialogues and later Platonists do not supply one uncontroversial theory.', 'platonism')},
      {entityId: 'aristotelianism', term: 'eidos / morphē', explanation: branchStatement('Form is analyzed within hylomorphic substances and definitions as a cause of what a thing is, rather than simply copied from a separate object.', 'aristotelianism')},
    ], warning: branchStatement('Shared Greek vocabulary sharpens the disagreement; it does not make the two metaphysical roles interchangeable.', 'platonism', 'aristotelianism')}],
    arguments: [
      {entityId: 'platonism', title: 'Explanation reaches beyond sensible flux', summary: branchStatement('If knowledge and value require stable standards, sensible particulars alone may not explain what they are, why they count as instances, or how judgment can criticize appearance.', 'platonism'), pressure: branchStatement('Participation, separation, and the unity of Forms generate problems already dramatized inside the Platonic corpus.', 'platonism')},
      {entityId: 'aristotelianism', title: 'Explain substances through their causes', summary: branchStatement('Form, matter, actuality, potentiality, and four-cause analysis aim to explain change without separating a thing’s intelligible nature from the substance under study.', 'aristotelianism'), pressure: branchStatement('Aristotelian accounts face their own disputes about substance, universals, intellect, theology, and the scope of teleology.', 'aristotelianism')},
    ],
    readings: [
      {entityId: 'platonism', title: 'Republic, Books VI–VII', author: 'Plato', kind: 'primary', stage: 'Read intelligibility and education', whyHere: branchStatement('The sun, line, and cave connect knowledge, value, and formation without serving as a complete handbook of Platonism.', 'platonism')},
      {entityId: 'aristotelianism', title: 'Metaphysics, Books VII–IX', author: 'Aristotle', kind: 'primary', stage: 'Read substance and actuality', whyHere: branchStatement('These books expose the difficult arguments behind the hylomorphic contrast with separate Forms.', 'aristotelianism')},
    ],
    interpretiveLimits: [branchStatement('Neoplatonists used Aristotle, Aristotelians absorbed Platonic materials, and later religious and linguistic settings transformed both lineages; the traditions are not sealed camps.', 'platonism', 'aristotelianism')],
    followOns: [{kind: 'philosopher', participantIds: ['plato', 'aristotle'], label: 'Plato and Aristotle', reason: philosopherStatement('Return from reception traditions to the two corpora whose internal tensions later schools repeatedly reconstructed.', 'plato', 'aristotle')}],
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
  branchCase(['metaphysics', 'ontology'], {
    sharedQuestion: branchStatement('What exists, how is it categorized, and what broader explanatory work remains after an inventory of being is proposed?', 'metaphysics', 'ontology'),
    historicalRelationship: branchStatement('Ontology is often treated as a part, method, or successor vocabulary within metaphysics, but the scope of both terms has shifted from early modern system building through contemporary analytic, continental, and comparative uses.', 'metaphysics', 'ontology'),
    sharedAssumptions: [branchStatement('Both investigate being and reality at a general level and require more than listing familiar objects, because categories and commitments themselves need justification.', 'metaphysics', 'ontology')],
    axes: [
      {label: 'Scope', question: branchStatement('Does the inquiry ask what there is, or also how reality is structured and explained?', 'metaphysics', 'ontology'), positions: [
        {entityId: 'metaphysics', claim: branchStatement('Metaphysics includes existence and categories but also modality, time, causation, persistence, dependence, mind and matter, and questions about first principles or fundamentality.', 'metaphysics')},
        {entityId: 'ontology', claim: branchStatement('Ontology focuses on being, categories, ontological commitment, and the kinds of entities a theory recognizes, though traditions define that task differently.', 'ontology')},
      ], contrast: branchStatement('Ontology supplies a focused family of questions inside or alongside the broader metaphysical project; neither term has one universally fixed boundary.', 'metaphysics', 'ontology')},
      {label: 'Method and commitment', question: branchStatement('How does a theory reveal what it is committed to?', 'metaphysics', 'ontology'), positions: [
        {entityId: 'metaphysics', claim: branchStatement('Metaphysicians use explanation, grounding, modality, conceptual analysis, science, phenomenology, and tradition-specific arguments to compare structures of reality.', 'metaphysics')},
        {entityId: 'ontology', claim: branchStatement('Ontological inquiry may analyze categories, quantify over entities, formalize relations, or question the meaning of being before proposing an inventory.', 'ontology')},
      ], contrast: branchStatement('A formal inventory can clarify commitment without settling grounding or causation, while a rich metaphysical explanation can conceal an unclear ontology.', 'metaphysics', 'ontology')},
    ],
    terminology: [{topic: 'Priority', positions: [
      {entityId: 'metaphysics', term: 'grounding / fundamentality', explanation: branchStatement('These terms ask what explains or determines other facts or entities and whether reality has a more basic level.', 'metaphysics')},
      {entityId: 'ontology', term: 'category / commitment', explanation: branchStatement('These terms ask which kinds a scheme recognizes and what entities must exist if its claims are true.', 'ontology')},
    ], warning: branchStatement('“What exists?” and “what is fundamental?” are connected but distinct questions; answering one does not automatically answer the other.', 'metaphysics', 'ontology')}],
    arguments: [
      {entityId: 'metaphysics', title: 'An inventory does not explain itself', summary: branchStatement('Even a clear list of entities leaves questions about possibility, dependence, identity through change, causation, and why the categories fit together.', 'metaphysics'), pressure: branchStatement('The broader the field becomes, the harder it is to state a distinctive method or prevent speculative excess.', 'metaphysics')},
      {entityId: 'ontology', title: 'Make commitments explicit', summary: branchStatement('Ontology forces a theory to say what kinds of things its explanations presuppose and whether its language carries avoidable commitments.', 'ontology'), pressure: branchStatement('Formal clarity can still leave disputed whether the framework tracks reality, language, thought, social practice, or only a chosen model.', 'ontology')},
    ],
    readings: [
      {entityId: 'metaphysics', title: 'Metaphysics', author: 'Peter van Inwagen, Meghan Sullivan, and Sara Bernstein', kind: 'secondary', stage: 'Map the broader field', whyHere: branchStatement('Use a contemporary overview to separate recurring problem families before treating metaphysics as one ancient project.', 'metaphysics')},
      {entityId: 'ontology', title: 'Empiricism, Semantics, and Ontology', author: 'Rudolf Carnap', kind: 'primary', stage: 'Test a framework challenge', whyHere: branchStatement('Carnap makes the relation among language, framework choice, and ontological questions explicit and contestable.', 'ontology')},
    ],
    interpretiveLimits: [branchStatement('Ancient Greek, Islamic, South Asian, Chinese, phenomenological, and analytic inquiries do not all divide metaphysics from ontology in the same way.', 'metaphysics', 'ontology')],
    followOns: [{kind: 'branch', participantIds: ['platonism', 'aristotelianism'], label: 'Platonism and Aristotelianism', reason: branchStatement('Apply the distinction to rival historical accounts of form, substance, cause, and intelligibility.', 'platonism', 'aristotelianism')}],
  }),
  branchCase(['analytic-philosophy', 'continental-philosophy'], {
    sharedQuestion: branchStatement('What do modern philosophical labels reveal about method, canon, institution, and problem choice—and what histories do they conceal?', 'analytic-philosophy', 'continental-philosophy'),
    historicalRelationship: branchStatement('The analytic–continental divide hardened through twentieth-century institutions, curricula, languages, and retrospective narratives; neither side is geographically pure or doctrinally unified.', 'analytic-philosophy', 'continental-philosophy'),
    sharedAssumptions: [branchStatement('Both contain arguments about language, mind, science, ethics, politics, history, and metaphysics, and both repeatedly criticize earlier pictures of reason and philosophical method.', 'analytic-philosophy', 'continental-philosophy')],
    axes: [
      {label: 'Philosophical method', question: branchStatement('Should progress come chiefly through explicit argument and analysis or through historical, phenomenological, genealogical, and critical reconstruction?', 'analytic-philosophy', 'continental-philosophy'), positions: [
        {entityId: 'analytic-philosophy', claim: branchStatement('Analytic lineages often prize explicit premises, distinctions, formal tools, conceptual analysis, and problem-focused exchange, while disagreeing about the purpose of analysis.', 'analytic-philosophy')},
        {entityId: 'continental-philosophy', claim: branchStatement('Continental lineages include phenomenology, existentialism, hermeneutics, critical theory, genealogy, and deconstruction, often foregrounding history, interpretation, embodiment, and power.', 'continental-philosophy')},
      ], contrast: branchStatement('The contrast concerns recurring emphases and institutions, not a license to equate one side with argument and the other with literature.', 'analytic-philosophy', 'continental-philosophy')},
      {label: 'History and language', question: branchStatement('Is philosophical language a tool to clarify, or also a historical medium that shapes what can appear as a problem?', 'analytic-philosophy', 'continental-philosophy'), positions: [
        {entityId: 'analytic-philosophy', claim: branchStatement('From Frege and Russell through ordinary-language and later work, analytic philosophers repeatedly revise how logical form, use, reference, and argument bear on philosophical confusion.', 'analytic-philosophy')},
        {entityId: 'continental-philosophy', claim: branchStatement('Continental thinkers often examine how inherited concepts, texts, practices, and institutions produce horizons of meaning and structures of exclusion.', 'continental-philosophy')},
      ], contrast: branchStatement('Both analyze language and inherit histories; they differ more in characteristic questions, styles of reconstruction, and canons than in possessing mutually exclusive methods.', 'analytic-philosophy', 'continental-philosophy')},
    ],
    terminology: [{topic: 'Critique', positions: [
      {entityId: 'analytic-philosophy', term: 'analysis', explanation: branchStatement('Analysis can mean logical decomposition, conceptual clarification, linguistic attention, model building, or argumentative reconstruction across changing phases.', 'analytic-philosophy')},
      {entityId: 'continental-philosophy', term: 'genealogy / deconstruction', explanation: branchStatement('These practices interrogate historical formation, exclusions, and unstable oppositions rather than merely rejecting clarity or truth.', 'continental-philosophy')},
    ], warning: branchStatement('No single method defines either family, and many philosophers cross the divide or reject the label assigned to them.', 'analytic-philosophy', 'continental-philosophy')}],
    arguments: [
      {entityId: 'analytic-philosophy', title: 'Expose the inferential structure', summary: branchStatement('Explicit distinctions and reconstructable arguments make disagreement easier to test, revise, and connect to logic or science.', 'analytic-philosophy'), pressure: branchStatement('Problem-focused clarity can hide the historical and institutional conditions that made a question or vocabulary seem neutral.', 'analytic-philosophy')},
      {entityId: 'continental-philosophy', title: 'Interrogate the conditions of the question', summary: branchStatement('Historical and phenomenological critique asks how a problem emerges through experience, language, power, and inherited conceptual schemes.', 'continental-philosophy'), pressure: branchStatement('Expansive contextualization can make the standard of argumentative success or the scope of a claim difficult to identify.', 'continental-philosophy')},
    ],
    readings: [
      {entityId: 'analytic-philosophy', title: 'On Sense and Reference', author: 'Gottlob Frege', kind: 'primary', stage: 'Read a founding problem closely', whyHere: branchStatement('The essay shows how a precise distinction about meaning becomes a wider philosophical method.', 'analytic-philosophy')},
      {entityId: 'continental-philosophy', title: 'Phenomenology of Spirit, guided selections on recognition', author: 'G. W. F. Hegel', kind: 'primary', stage: 'Read historical experience and recognition', whyHere: branchStatement('Guided selections show why conceptual development and social relation matter to a major continental inheritance.', 'continental-philosophy')},
    ],
    interpretiveLimits: [branchStatement('The divide omits pragmatist, feminist, Africana, Asian, Indigenous, Latin American, and other formations when it is mistaken for a complete map of modern philosophy.', 'analytic-philosophy', 'continental-philosophy')],
    followOns: [{kind: 'branch', participantIds: ['phenomenology', 'existentialism'], label: 'Phenomenology and Existentialism', reason: branchStatement('Replace umbrella labels with a documented methodological and historical relationship inside one part of the continental family.', 'phenomenology', 'existentialism')}],
  }),
  branchCase(['phenomenology', 'existentialism'], {
    sharedQuestion: branchStatement('How should philosophy describe lived experience when persons are embodied, temporal, situated, and responsible for projects they did not begin from nowhere?', 'phenomenology', 'existentialism'),
    historicalRelationship: branchStatement('Twentieth-century existential thinkers transformed phenomenological methods associated with Husserl and Heidegger, but existentialism also has nineteenth-century sources and phenomenology extends far beyond existential themes.', 'phenomenology', 'existentialism'),
    sharedAssumptions: [branchStatement('Both resist explaining human life only as an external object and attend to first-person orientation, meaning, embodiment, temporality, and relation to a shared world.', 'phenomenology', 'existentialism')],
    axes: [
      {label: 'Primary task', question: branchStatement('Is the first task to describe structures of experience or to confront the demands of concrete existence?', 'phenomenology', 'existentialism'), positions: [
        {entityId: 'phenomenology', claim: branchStatement('Phenomenology studies intentionality and structures of appearing through descriptive, transcendental, hermeneutic, genetic, and embodied approaches.', 'phenomenology')},
        {entityId: 'existentialism', claim: branchStatement('Existentialism foregrounds freedom, anxiety, finitude, authenticity, absurdity, responsibility, and the social situations in which projects acquire meaning.', 'existentialism')},
      ], contrast: branchStatement('Phenomenology names a family of methods and research programs; existentialism names a problem orientation and movement that selectively reworks those methods.', 'phenomenology', 'existentialism')},
      {label: 'Suspension and engagement', question: branchStatement('Should inquiry bracket ordinary commitments or begin from urgent involvement in the world?', 'phenomenology', 'existentialism'), positions: [
        {entityId: 'phenomenology', claim: branchStatement('Husserlian reduction suspends the natural attitude to investigate how objects and meanings are given, while later phenomenologists revise that procedure.', 'phenomenology')},
        {entityId: 'existentialism', claim: branchStatement('Existential arguments often begin from unavoidable involvement—choice, oppression, death, bad faith, and responsibility—rather than a detached inventory of consciousness.', 'existentialism')},
      ], contrast: branchStatement('The difference is one of emphasis, not clean separation: existential description can be phenomenological, and phenomenology can be ethical, political, or historical.', 'phenomenology', 'existentialism')},
    ],
    terminology: [{topic: 'Situated meaning', positions: [
      {entityId: 'phenomenology', term: 'intentionality', explanation: branchStatement('Intentionality names experience as directed toward something through meaningful structures, not a private picture sealed inside the mind.', 'phenomenology')},
      {entityId: 'existentialism', term: 'existence / situation', explanation: branchStatement('Existence and situation mark the unfinished, factical field in which a person interprets limits and undertakes projects.', 'existentialism')},
    ], warning: branchStatement('First-person analysis is not introspective autobiography, and existential freedom is not absence of bodily, social, or historical constraint.', 'phenomenology', 'existentialism')}],
    arguments: [
      {entityId: 'phenomenology', title: 'Return to how meaning is given', summary: branchStatement('Careful description can expose structures of perception, embodiment, time, and intersubjectivity hidden by premature scientific or metaphysical theories.', 'phenomenology'), pressure: branchStatement('Phenomenology must explain how first-person evidence addresses social power, unconscious formation, and competing descriptions.', 'phenomenology')},
      {entityId: 'existentialism', title: 'No theory removes the demand to live', summary: branchStatement('Existential thought presses the fact that finite persons must act and become responsible amid contingency, uncertainty, and inherited situations.', 'existentialism'), pressure: branchStatement('Strong language of freedom and authenticity can obscure material constraint or turn one model of selfhood into a universal ideal.', 'existentialism')},
    ],
    readings: [
      {entityId: 'phenomenology', title: 'The Idea of Phenomenology', author: 'Edmund Husserl', kind: 'primary', stage: 'Enter the method', whyHere: branchStatement('The lectures introduce reduction and givenness before later existential transformations are assumed.', 'phenomenology')},
      {entityId: 'existentialism', title: 'The Ethics of Ambiguity', author: 'Simone de Beauvoir', kind: 'primary', stage: 'Read situated freedom ethically', whyHere: branchStatement('Beauvoir connects freedom to ambiguity, oppression, and the freedom of others rather than an isolated act of choice.', 'existentialism')},
    ],
    interpretiveLimits: [branchStatement('Husserl, Heidegger, Sartre, Beauvoir, Merleau-Ponty, and later phenomenologists disagree substantially; genealogy does not imply one shared doctrine.', 'phenomenology', 'existentialism')],
    followOns: [{kind: 'philosopher', participantIds: ['beauvoir', 'sartre'], label: 'Beauvoir and Sartre', reason: philosopherStatement('Test how two close interlocutors differently connect phenomenology, freedom, ethics, embodiment, and oppression.', 'beauvoir', 'sartre')}],
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
  branchCase(['virtue-ethics', 'deontology'], {
    sharedQuestion: branchStatement('What makes a person’s action ethically good when admirable character, practical judgment, duty, and respect appear to point in different directions?', 'virtue-ethics', 'deontology'),
    historicalRelationship: branchStatement('Contemporary virtue ethics partly revived through criticism of modern obligation-centered theory, while deontology includes Kantian, Rossian, rights-based, and contractualist approaches rather than one rulebook.', 'virtue-ethics', 'deontology'),
    sharedAssumptions: [branchStatement('Both deny that a favorable outcome alone settles moral worth and ask agents to act for reasons that discipline appetite, convenience, and self-serving exception.', 'virtue-ethics', 'deontology')],
    axes: [
      {label: 'Primary ethical focus', question: branchStatement('Should evaluation begin from the excellent person or from what persons owe one another?', 'virtue-ethics', 'deontology'), positions: [
        {entityId: 'virtue-ethics', claim: branchStatement('Virtue ethics makes traits, emotions, practical wisdom, relationships, and flourishing basic to understanding what a good agent sees and does.', 'virtue-ethics')},
        {entityId: 'deontology', claim: branchStatement('Deontological theories make duties, rights, permissions, constraints, or principles basic to what agents may do to and for persons.', 'deontology')},
      ], contrast: branchStatement('Virtue ethics asks what good practical perception and character require; deontology asks which claims bind action even when character or benefit is disputed.', 'virtue-ethics', 'deontology')},
      {label: 'Judgment and constraint', question: branchStatement('How should an agent decide when context is complex but some acts seem impermissible?', 'virtue-ethics', 'deontology'), positions: [
        {entityId: 'virtue-ethics', claim: branchStatement('Practical wisdom interprets particulars and coordinates virtues without assuming that every case can be solved by a context-free decision procedure.', 'virtue-ethics')},
        {entityId: 'deontology', claim: branchStatement('Duties and rights identify reasons and constraints that remain authoritative even when violating them could express an attractive trait or improve outcomes.', 'deontology')},
      ], contrast: branchStatement('Sensitivity without constraint risks rationalization; constraint without cultivated judgment risks misdescribing the act, conflict, or person to whom duty is owed.', 'virtue-ethics', 'deontology')},
    ],
    terminology: [{topic: 'Moral reason', positions: [
      {entityId: 'virtue-ethics', term: 'phronēsis', explanation: branchStatement('Practical wisdom is the developed capacity to perceive and deliberate well about action in a whole life, not cleverness at reaching a chosen end.', 'virtue-ethics')},
      {entityId: 'deontology', term: 'duty / right', explanation: branchStatement('A duty or right marks a normative claim that can constrain choice independently of the agent’s preferred outcome.', 'deontology')},
    ], warning: branchStatement('“Character versus rules” is too crude: virtues shape action, and sophisticated deontology requires judgment about maxims, claims, conflicts, and exceptions.', 'virtue-ethics', 'deontology')}],
    arguments: [
      {entityId: 'virtue-ethics', title: 'Right action requires formed perception', summary: branchStatement('Rules cannot apply themselves; an agent must notice what matters, feel appropriately, deliberate across a life, and act from more than reluctant compliance.', 'virtue-ethics'), pressure: branchStatement('Virtue ethics must clarify action guidance, cultural disagreement, situationist evidence, and whether flourishing can protect those treated unjustly.', 'virtue-ethics')},
      {entityId: 'deontology', title: 'Persons impose limits on choice', summary: branchStatement('Duties and rights articulate why another person cannot be used merely as material for one’s project, character, or favored vision of flourishing.', 'deontology'), pressure: branchStatement('Deontology must explain conflicts, thresholds, moral remainder, and why a constraint holds when grave harm could be prevented.', 'deontology')},
    ],
    readings: [
      {entityId: 'virtue-ethics', title: 'Nicomachean Ethics, Books I, II, and VI', author: 'Aristotle', kind: 'primary', stage: 'Read flourishing and practical wisdom', whyHere: branchStatement('The books connect habituation, choice, virtue, and judgment rather than offering a list of admirable traits.', 'virtue-ethics')},
      {entityId: 'deontology', title: 'Groundwork of the Metaphysics of Morals', author: 'Immanuel Kant', kind: 'primary', stage: 'Read obligation and respect', whyHere: branchStatement('The text develops good will, universal law, and humanity beyond the caricature that morality means obeying any rule.', 'deontology')},
    ],
    interpretiveLimits: [branchStatement('Aristotle is not all virtue ethics, Kant is not all deontology, and traditions such as Confucian and feminist virtue ethics revise the terms of the comparison.', 'virtue-ethics', 'deontology')],
    followOns: [{kind: 'branch', participantIds: ['virtue-ethics', 'utilitarianism'], label: 'Virtue Ethics and Utilitarianism', reason: branchStatement('Hold character and practical judgment against impartial welfare and outcome-sensitive institutional reasoning.', 'virtue-ethics', 'utilitarianism')}],
  }),
  branchCase(['virtue-ethics', 'utilitarianism'], {
    sharedQuestion: branchStatement('Should ethical life be organized around excellent character and flourishing or around impartially producing the best consequences for everyone affected?', 'virtue-ethics', 'utilitarianism'),
    historicalRelationship: branchStatement('Modern virtue ethics often defines itself against consequence-centered theory, while utilitarianism developed through Bentham, Mill, Sidgwick, and later act, rule, preference, and plural-value revisions.', 'virtue-ethics', 'utilitarianism'),
    sharedAssumptions: [branchStatement('Both can criticize egoism, take moral development seriously, and assess practices and institutions rather than limiting ethics to isolated emergency choices.', 'virtue-ethics', 'utilitarianism')],
    axes: [
      {label: 'Standard of success', question: branchStatement('What ultimately makes an action or life ethically successful?', 'virtue-ethics', 'utilitarianism'), positions: [
        {entityId: 'virtue-ethics', claim: branchStatement('Virtue ethics evaluates action through excellent practical reason, emotion, relationship, and human flourishing across a life.', 'virtue-ethics')},
        {entityId: 'utilitarianism', claim: branchStatement('Utilitarian theories evaluate actions, rules, motives, or institutions by their contribution to aggregate or impartial welfare under a specified account of value.', 'utilitarianism')},
      ], contrast: branchStatement('The dispute asks whether good character helps constitute the ethical end or is chiefly valuable because of the outcomes it tends to produce.', 'virtue-ethics', 'utilitarianism')},
      {label: 'Partial ties and impartial concern', question: branchStatement('How should friendship, family, and personal projects weigh against equal concern for distant others?', 'virtue-ethics', 'utilitarianism'), positions: [
        {entityId: 'virtue-ethics', claim: branchStatement('Many virtue theories treat friendship, role, attachment, and particular judgment as constituents of flourishing rather than biases to be subtracted.', 'virtue-ethics')},
        {entityId: 'utilitarianism', claim: branchStatement('Utilitarian impartiality requires each person’s welfare to count, while indirect theories may defend partial practices by their wider consequences.', 'utilitarianism')},
      ], contrast: branchStatement('Virtue ethics risks parochial exclusion; utilitarianism risks alienating agents from constitutive relationships or treating persons as locations in an aggregate.', 'virtue-ethics', 'utilitarianism')},
    ],
    terminology: [{topic: 'The human good', positions: [
      {entityId: 'virtue-ethics', term: 'eudaimonia', explanation: branchStatement('Flourishing concerns excellent activity and a whole human life, not a passing feeling of happiness or private success.', 'virtue-ethics')},
      {entityId: 'utilitarianism', term: 'utility', explanation: branchStatement('Utility is a standard of value or welfare whose interpretation varies across pleasure, preference, rule, and pluralist accounts.', 'utilitarianism')},
    ], warning: branchStatement('Both can use “happiness,” but Aristotelian flourishing and classical utilitarian happiness play different explanatory roles.', 'virtue-ethics', 'utilitarianism')}],
    arguments: [
      {entityId: 'virtue-ethics', title: 'Ethics must form reliable agents', summary: branchStatement('A good life requires attention, emotion, habit, and judgment that can respond well when no calculation captures the morally salient particulars.', 'virtue-ethics'), pressure: branchStatement('Character language must still criticize unjust social norms and explain what to do when virtuous considerations conflict.', 'virtue-ethics')},
      {entityId: 'utilitarianism', title: 'Every affected welfare claim counts', summary: branchStatement('Impartial consequence makes preventable suffering visible even when custom, loyalty, or admired character would otherwise exclude distant people.', 'utilitarianism'), pressure: branchStatement('The theory must address demandingness, distribution, rights, measurement, uncertainty, and integrity.', 'utilitarianism')},
    ],
    readings: [
      {entityId: 'virtue-ethics', title: 'Modern Moral Philosophy', author: 'G. E. M. Anscombe', kind: 'primary', stage: 'Read the modern challenge', whyHere: branchStatement('The essay helps explain why modern virtue ethics questioned obligation-centered moral theory and revived older vocabularies.', 'virtue-ethics')},
      {entityId: 'utilitarianism', title: 'Utilitarianism', author: 'John Stuart Mill', kind: 'primary', stage: 'Read utility and objections', whyHere: branchStatement('Mill addresses happiness, quality, proof, justice, and moral cultivation rather than presenting a bare maximizing formula.', 'utilitarianism')},
    ],
    interpretiveLimits: [branchStatement('Agent-based and target-centered virtue theories differ, as do act, rule, preference, and ideal utilitarianisms; one axis cannot decide every hybrid proposal.', 'virtue-ethics', 'utilitarianism')],
    followOns: [{kind: 'branch', participantIds: ['deontology', 'utilitarianism'], label: 'Deontology and Utilitarianism', reason: branchStatement('Compare the better-known dispute over rights, constraints, welfare, and what may be done for a better outcome.', 'deontology', 'utilitarianism')}],
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
