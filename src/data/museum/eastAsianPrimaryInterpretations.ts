import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';

type OrientationItem = {readonly label: string; readonly value: string};

const concise = (
  name: string,
  lead: string,
  paragraphs: readonly string[],
  orientation: readonly OrientationItem[],
  assetId: MuseumAssetId,
  objectText: string,
): MuseumPrimaryInterpretationEnrichment => ({
  lead,
  keyIdeas: [],
  keyWorks: [],
  sections: [{heading: '', paragraphs}],
  presentation: {
    mode: 'concise',
    orientation,
    articleActionLabel: `Read the full sourced ${name} article`,
    bodyLayout: 'prose',
    plaqueKicker: '',
    plaqueSubtitleLines: 4,
  },
  objectInterpretations: {[assetId]: objectText},
});

export const EAST_ASIAN_PRIMARY_INTERPRETATIONS:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  confucius: concise(
    'Confucius',
    'Confucius asks how learning, humane attention, ritual practice, and trustworthy conduct can transform relationships and public life.',
    [
      'Confucius was a late Spring and Autumn teacher associated with the state of Lu. The familiar 551–479 BCE dates are traditional anchors, while many travels, offices, and encounters belong to later morally shaped biography. His importance rests less on a fully recoverable career than on remembered conversations about learning, ritual, music, family, language, and government that communities preserved and repeatedly reinterpreted.',
      'The Analects is the central witness, but it is not a book written or dictated by Confucius. Its twenty received books contain sayings, dialogues, scenes, and descriptions formed and transmitted through more than one community. Within them, ren names a demanding relational humaneness, li names embodied practices that can educate feeling and coordinate conduct, and the junzi becomes exemplary through study and correction rather than inherited rank alone. These terms remain wider than any single English equivalent.',
      'Political authority should earn trust through credible conduct, fitting roles, remonstrance, and humane practice, not coercion alone. Yet the tradition also raises hard questions about hierarchy, family loyalty, paternalism, and who may revise inherited forms. Later Confucian canons, state institutions, temples, commentaries, and global portraits are powerful receptions rather than one doctrine already complete in the historical teacher. The exhibit therefore joins practical cultivation to visible textual uncertainty.',
      'Read the installation as an invitation to test forms of conduct, not to memorize a sage’s rules. Ask when repeated practice deepens attention, when a role earns trust, and when humane judgment should challenge the very ritual or hierarchy that trained it. Those questions keep cultivation active rather than ceremonial.',
    ],
    [
      {label: 'Historical setting', value: 'Lu and neighboring states · late Spring and Autumn period'},
      {label: 'Chronology', value: 'Traditional 551–479 BCE · many life episodes uncertain'},
      {label: 'Primary witness', value: 'Layered Analects · not a verbatim authored book'},
      {label: 'Central practices', value: 'Learning · ren · li · music · exemplary conduct'},
      {label: 'Open tension', value: 'Relational responsibility · hierarchy · humane criticism'},
    ],
    'china-confucius-yuan-portrait',
    'This formal Yuan-dynasty album portrait was made roughly eighteen centuries after Confucius. It shows the durable visual canon through which later communities remembered a sage, not a documented lifetime likeness. The object identifies his reception while the layered Analects, rather than the painted face, supplies the exhibit’s main early textual evidence.',
  ),
  mencius: concise(
    'Mencius',
    'Mencius asks how fragile beginnings of moral concern can grow through reflection, practice, livelihood, and humane government.',
    [
      'Mencius was a Warring States Confucian teacher conventionally placed around 372–289 BCE, though the exact chronology and court itinerary remain approximate. The received Mengzi presents exchanges with rulers, rivals, and students in a layered collection rather than a verbatim travel diary. Its later place among the Four Books made this one Confucian account of cultivation extraordinarily influential without erasing ancient competitors.',
      'To say human nature is good does not mean that people are born morally complete or reliably choose well. Mencius identifies incipient responses—often called the four beginnings—that can develop into humaneness, rightness, ritual propriety, and wisdom. Compassion, shame, respect, and discrimination require nourishment, attention, reflection, extension, and supportive conditions. Xin, the heart-mind, joins feeling and judgment rather than reproducing a modern opposition between emotion and reason.',
      'Humane government therefore includes material security, reduced destructive burdens, education, remonstrance, and limits on a ruler who harms the people. These arguments remain hierarchical and cannot simply be renamed modern democracy. Nor should the disagreement with Xunzi collapse into optimism versus pessimism: the two thinkers classify spontaneous tendencies, moral capacities, deliberate practice, and achieved goodness differently. The exhibit keeps that live conceptual dispute beside Mencius’s demanding claim that institutions help moral capacities flourish or fail.',
      'The practical test is developmental: notice a morally salient response, examine what it demands beyond the vivid first case, and ask which habits or institutions help it endure. A beginning can guide criticism only if it grows into reliable action and remains answerable to people whose welfare a ruler or family might overlook.',
    ],
    [
      {label: 'Historical setting', value: 'Warring States courts · chronology approximate'},
      {label: 'Text', value: 'Layered Mengzi dialogues and arguments'},
      {label: 'Moral psychology', value: 'Beginnings · heart-mind · cultivation · extension'},
      {label: 'Political claim', value: 'Livelihood and humane rule condition moral growth'},
      {label: 'Open dispute', value: 'Human nature and achieved goodness beside Xunzi'},
    ],
    'china-mencius-yuan-portrait',
    'This Yuan-dynasty portrait was produced many centuries after Mencius and records his later canonical commemoration, not his historical appearance. Its formal scholar-sage imagery helps explain how reception elevated Mencius, while the exhibit keeps that later authority distinct from the approximate Warring States biography and layered Mengzi text.',
  ),
  xunzi: concise(
    'Xunzi',
    'Xunzi asks how learning, ritual, language, and institutions can transform unruly tendencies into cultivated character and shared order.',
    [
      'Xunzi was a late Warring States thinker conventionally dated around 310–235 BCE and associated by later sources with Zhao, Qi, and Chu. The received Xunzi offers unusually sustained essays, but its thirty-two chapters also reflect compositional and editorial layers. Later stories about offices, students, and influence are useful orientation only when kept distinct from secure authorship and chronology.',
      'The famous claim that human nature is bad does not mean total depravity or an inability to become good. Spontaneous desires and dispositions do not by themselves create ethical order; goodness is achieved through deliberate effort, teachers, standards, practice, and ritual. Ritual coordinates scarce goods, shapes grief and desire, and creates intelligible roles. The heart-mind can distinguish and direct, but it can also become blinded by fixation. Xunzi orders desire rather than demanding its elimination.',
      'Heaven follows constant patterns instead of adjusting events to reward virtue, leaving humans responsible for organizing their affairs. Public naming likewise uses shared conventions to stabilize distinctions and action without making language arbitrary private fiat. These resources can explain education and cooperation, yet they also raise questions about hierarchy, sage authority, and how inherited constructions can be criticized. Xunzi influenced later statecraft debates, but neither later students nor institutional concerns make him simply a Legalist or reduce his disagreement with Mencius to a slogan.',
      'The exhibit’s final question concerns standards for construction. If ethical forms are deliberately made, their age alone cannot justify them. Visitors can compare whether a practice coordinates desire sustainably, permits correction, and serves more than entrenched rank. Xunzi supplies tools for formation while leaving the authority to redesign those tools contested.',
    ],
    [
      {label: 'Historical setting', value: 'Late Warring States · exact career uncertain'},
      {label: 'Text', value: 'Layered thirty-two-chapter Xunzi collection'},
      {label: 'Cultivation', value: 'Learning · deliberate effort · ritual · music'},
      {label: 'Public order', value: 'Names · institutions · coordinated desire'},
      {label: 'Open tension', value: 'Constructed norms · hierarchy · critical revision'},
    ],
    'china-xunzi-qing-portrait',
    'This Qing-dynasty painting is a much later traditional representation, not a Warring States likeness. Its official robes visualize Xunzi through later scholarly and political reception. The exhibit uses it for identification while refusing to let a commemorative image settle his uncertain biography, the layered collection, or his contested relationship to later statecraft.',
  ),
  laozi: concise(
    'Laozi',
    'Laozi names an attributed textual persona through whom the Daodejing explores the Way, potency, naming, and noncoercive action.',
    [
      'No secure biography or numeric lifespan can be recovered for Laozi. Sima Qian preserves competing traditions about an archivist, a meeting with Confucius, and departure through a frontier pass; later religious and artistic traditions add further identities. The most responsible starting point is an attributed persona connected to a layered collection of terse verses, not a single documented founder who wrote one finished book.',
      'Excavated Guodian and Mawangdui witnesses show Laozi-related materials in different selections, sequences, and physical forms before the familiar received arrangement of eighty-one chapters. This plurality does not make the text random, but it prevents a simple author-and-publication story. Dao can name way, course, or generative path; de can name virtue, potency, or efficacy; wu and you shift with context. No one English choice should silently turn these terms into a creator, substance, or creation from absolute nothing.',
      'Wuwei recommends action without coercive display or self-assertion, not literal inactivity, while ziran concerns unforced being-so rather than mere impulse. Softness, reversal, desire, war, and rulership support competing therapeutic, political, mystical, and statecraft readings. “Daoism” is a retrospective label whose philosophical, religious, commentarial, and institutional histories cannot be reduced to this early text. The exhibit invites close comparison while leaving textual formation and political consequences genuinely open.',
      'Approach each verse as a compressed intervention rather than a detachable slogan. Compare translations, ask what kind of action or ruler the passage addresses, and watch how apparent opposites change one another. The point is not to solve the Daodejing into one doctrine, but to make its disciplined resistance to force legible.',
    ],
    [
      {label: 'Identity', value: 'Attributed and legendary textual persona'},
      {label: 'Textual witnesses', value: 'Guodian · Mawangdui · received Daodejing'},
      {label: 'Translation-sensitive terms', value: 'dao · de · wu/you · wuwei · ziran'},
      {label: 'Political problem', value: 'Noncoercive rule · withdrawal · possible quietism'},
      {label: 'Classification', value: '“Daoism” is later and internally diverse'},
    ],
    'china-laozi-daodejing-handscroll',
    'This Ming-period handscroll stages the later legend of Laozi transmitting the Daodejing at a frontier pass. It is not evidence that one historical traveler composed the received text in a single encounter. The object makes the biographical story visible precisely so the exhibit can distinguish reception, attributed persona, and layered textual witnesses.',
  ),
  zhuangzi: concise(
    'Zhuangzi',
    'Zhuangzi uses stories, reversals, skill, and changing perspectives to test rigid claims about knowledge, usefulness, identity, and control.',
    [
      'A probable later-fourth-century BCE thinker named Zhuang Zhou stands behind part of the tradition, but the person and received book are not identical. The thirty-three chapters preserved through Guo Xiang’s edition comprise seven Inner, fifteen Outer, and eleven Miscellaneous chapters. Inner Chapters are traditionally associated most closely with Zhuang Zhou, yet none is a signed manuscript and the later groups preserve diverse voices and developments.',
      'The text moves among enormous birds, disputing friends, skilled craftspeople, altered bodies, dreamers, mourners, and refusals of office. These scenes reveal how language, training, social use, and standpoint shape judgment. Perspectival limits do not automatically make every belief equally true. Cook Ding’s responsive movement is trained, cautious skill rather than magical effortlessness, and accounts of uselessness can expose coercive social standards without guaranteeing that withdrawal always answers injustice.',
      'Stories of bodily difference can overturn assumptions about normality while still using marked bodies for rhetorical surprise; death narratives can revise attachment without commanding the bereaved to suppress grief. Later philosophical Daoist, religious Daoist, literary, artistic, and Chan readers transformed the collection rather than uncovering one timeless system already present. The exhibit keeps the text’s humor and mobility alive while identifying chapter strata, editorial history, political ambiguity, and the risks of easy modern appropriation.',
      'Let the stories change the scale of the question before extracting a principle. Ask what a judgment enables, whom a standard excludes, and whether trained responsiveness can remain critical of cruelty. That reading practice respects the anthology’s experiments without turning irony into a universal escape from argument or responsibility.',
    ],
    [
      {label: 'Historical persona', value: 'Zhuang Zhou · later 4th century BCE, approximately'},
      {label: 'Received text', value: '7 Inner · 15 Outer · 11 Miscellaneous chapters'},
      {label: 'Methods', value: 'Story · irony · reversal · shifting scale'},
      {label: 'Central problems', value: 'Perspective · language · skill · transformation'},
      {label: 'Open dispute', value: 'Skepticism · relativism · politics · positive guidance'},
    ],
    'china-zhuangzi-hua-zuli-1326',
    'Hua Zuli painted this traditional portrait in 1326, more than fifteen centuries after Zhuang Zhou’s probable lifetime. It gives later reception a memorable face but cannot identify the authors of the Inner, Outer, or Miscellaneous chapters. The exhibit treats the image as commemoration, not documentary access to the textual persona.',
  ),
  mozi: concise(
    'Mozi',
    'Mozi and the Mohists ask how inclusive concern, public standards, shared benefit, and opposition to aggression should reshape collective life.',
    [
      'Mozi names an elusive early Warring States teacher and the founding authority claimed by an organized movement. Dependable biography is sparse, while followers trained advocates, served in offices, debated rivals, and developed expertise in defending threatened cities. The received Mozi is their layered anthology, not an autograph: doctrinal triads, dialogues, later Canons, anecdotes, and technical siege chapters differ in voice, date, and purpose.',
      'Inclusive or impartial concern challenges the exclusion that lets people protect only their own family or state while discounting injury to outsiders. It need not require identical emotion or action toward everyone. Mohist benefit foregrounds material sufficiency, population, and order, making consequential comparison illuminating without turning the program into later hedonistic utilitarianism. Fa are teachable models or standards, often explained through crafts, that aim to make judgment more public than prestige or private impulse.',
      'Opposition to aggressive war exposes the inconsistency of praising conquest while condemning smaller theft and murder, yet it does not reject every punishment, defense, or coercive institution. Heaven supplies morally charged authority, and ghosts provide both asserted religious accountability and political enforcement; neither should be edited out as decorative superstition. The anonymous later Canons extend Mohist work in language, inference, knowledge, and technical topics but must not be assigned directly to Mozi. Reformist impartiality and strict hierarchy remain in productive tension.',
      'The visitor’s test is public and comparative: whose benefit is counted, which harms disappear behind rank or borders, and can the proposed standard be taught and checked? Apply that test to conquest, luxury, appointment, and punishment alike, while asking whether Mohist centralized enforcement reproduces the domination its impartial concern opposes.',
    ],
    [
      {label: 'Historical setting', value: 'Early Warring States teacher and organized movement'},
      {label: 'Corpus', value: 'Layered Mozi · triads · dialogues · Canons · siege chapters'},
      {label: 'Core programs', value: 'Inclusive concern · benefit · merit · economy'},
      {label: 'War and religion', value: 'Anti-aggression · defense · Heaven · ghosts'},
      {label: 'Open tension', value: 'Impartial welfare · hierarchy · coercive enforcement'},
    ],
    'china-mozi-lost-article-slips',
    'These Western Han bamboo slips transmit a lost Mozi article and materially anchor a history of copying, loss, and recovery. They postdate Mozi and are neither an autograph nor proof that the anthology formed at once. Their fragmentary survival supports the exhibit’s distinction between remembered founder, organized movement, and layered corpus.',
  ),
  'han-feizi': concise(
    'Han Feizi',
    'Han Feizi analyzes how standards, administrative technique, incentives, and positional power can govern officials—and endanger those they govern.',
    [
      'Han Fei was a late Warring States thinker conventionally dated around 280–233 BCE. A later biography links him to Han’s ruling lineage, Xunzi, and death in Qin custody, but many details remain reconstructed. The received Han Feizi contains fifty-five chapters with stylistic and doctrinal variation. It is the principal source for his political project without being a transparently single-authored book.',
      'Fa can mean laws, standards, models, or institutional criteria depending on context; it is broader than a single modern idea of law. Shu names techniques for assigning office, comparing claims with performance, concealing preferences, and monitoring ministers. Shi names power or strategic advantage attached to position rather than personal virtue. These concerns interact, but they are not three interchangeable tools. Rewards and punishments seek predictable alignment while concentrating the sovereign’s control.',
      'The program responds sharply to hidden information, favoritism, bureaucratic capture, and unreliable virtue, yet it leaves a central vulnerability: who monitors a foolish, captured, or abusive ruler? Public standards can constrain ministers while serving censorship, coercion, and monarchical supremacy. “Legalism” or fajia is a later bibliographic umbrella for diverse thinkers, not Han Fei’s declared school. Connections to Xunzi and earlier fa-oriented figures require comparison, not a simple genealogy or the claim that institutional realism excuses authoritarian outcomes.',
      'Use the exhibit as an institutional stress test rather than a management manual. Trace who possesses information, sets standards, judges performance, and controls sanctions. A design may reduce private favoritism while making public contest impossible. Han Feizi’s analytic force is clearest when the solution’s concentrated power remains as visible as the problem.',
    ],
    [
      {label: 'Historical setting', value: 'Late Warring States · state of Han and Qin'},
      {label: 'Corpus', value: 'Composite fifty-five-chapter Han Feizi'},
      {label: 'Institutional terms', value: 'fa · shu · shi · rewards and punishments'},
      {label: 'Central problem', value: 'Delegation · information · ministerial capture'},
      {label: 'Open danger', value: 'Ruler supremacy · coercion · absent accountability'},
    ],
    'china-han-fei-modern-statue',
    'This modern commemorative statue does not preserve Han Fei’s appearance or an ancient sculptural tradition. Its monumental authority belongs to recent reception and can easily naturalize the ruler-centered power the text analyzes. The exhibit uses it as an identified later representation while keeping authorship, coercion, and accountability visible.',
  ),
  'zhu-xi': concise(
    'Zhu Xi',
    'Zhu Xi coordinates pattern, material force, study, ritual, and self-cultivation into an influential architecture of learning.',
    [
      'Zhu Xi lived from 1130 to 1200 in Southern Song China as a scholar, teacher, administrator, editor, and commentator. “Neo-Confucianism” is a modern umbrella, while later Cheng–Zhu labels organize a lineage retrospectively. Zhu’s synthesis was contested and at times officially condemned during his life; its later examination authority and broad East Asian influence should not be projected backward as immediate consensus.',
      'Li names intelligible pattern or coherence, while qi names the concrete material-energetic stuff through which every thing exists. They are analytically distinguishable but never two separately existing worlds. Human nature is good as pattern, yet uneven qi, desire, habit, and circumstance help explain moral failure. Investigation of things, gewu, is broader than collecting external facts: study of texts, practices, relationships, and concrete affairs extends knowledge while reverent attentiveness, jing, steadies the learner.',
      'Zhu did not author the Four Books. He selected, edited, coordinated, and commented on inherited Analects, Mencius, Great Learning, and Doctrine of the Mean materials, helping make them a curriculum later institutions amplified. His engagement with Buddhist and Daoist ideas combined borrowing, rivalry, and polemic rather than simple rejection or secret identity. The exhibit therefore joins metaphysical explanation to books, academies, ritual, governance, and institutional power, asking how a disciplined method becomes both an educational resource and an orthodoxy.',
      'The installation asks visitors to follow a method across scales: investigate a concrete relation, refine attention, compare it with texts and practice, and revise conduct. Then examine the institutions that authorize the curriculum. A program of self-correction can become harder to correct when examinations and states make one commentary normative.',
    ],
    [
      {label: 'Historical setting', value: 'Southern Song China · 1130–1200'},
      {label: 'Metaphysical terms', value: 'li · qi · human nature · desire'},
      {label: 'Cultivation', value: 'Investigation of things · study · jing · ritual'},
      {label: 'Canon work', value: 'Selected, edited, coordinated, and commented on Four Books'},
      {label: 'Reception', value: 'Contested in life · later examination and regional authority'},
    ],
    'zhu-xi-traditional-portrait',
    'This traditional portrait was painted more than six centuries after Zhu Xi and belongs to his later commemorative canon. It is not a lifetime likeness. The object makes his institutional authority visible, while the exhibit distinguishes that later sage image from a career that included teaching, administration, controversy, and official condemnation.',
  ),
  'wang-yangming': concise(
    'Wang Yangming',
    'Wang Yangming asks how moral knowing already active in the heart-mind becomes genuine only through responsible action.',
    [
      'Wang Yangming, or Wang Shouren, lived from 1472 to 1529 and combined scholarship, teaching, administration, military command, exile, and political controversy. Later Lu–Wang, school-of-mind, and Neo-Confucian classifications identify important lineages without functioning as Wang’s simple self-description. His philosophy developed through letters, dialogues, records, and posthumous editing rather than one finished systematic treatise.',
      'Mind is not a private container that invents reality; it is the morally responsive heart-mind through which pattern becomes present in concrete relations. Innate knowing, liangzhi, names an immediate capacity to recognize moral salience, not personal infallibility or permission to follow impulse. Selfish habits can obscure, rationalization can counterfeit, and social roles can distort judgment. The unity of knowledge and action means that genuine moral knowledge is already active and incomplete when conduct fails—not that every factual lesson must be performed instantly.',
      'The later bamboo-investigation story dramatizes Wang’s criticism of one rigid reading of Zhu Xi but should not define either thinker. The Four Sentences, associated with the Tianquan Bridge exchange, generated disputes between Qian Dehong, Wang Ji, and later interpreters over original mind, good and evil, effort, and realization. Wang’s military and administrative service also complicates any purely inward image: moral agency operated within state coercion. The exhibit preserves practical urgency while keeping doctrine, lineage, and political power open to criticism.',
      'Test innate knowing by its resistance to self-deception, not by the confidence of the speaker. Ask whether a judgment survives attention to relationships, consequences, correction, and action. This keeps moral immediacy from becoming private authority and keeps the unity of knowledge and action focused on responsibility rather than instant certainty.',
    ],
    [
      {label: 'Historical setting', value: 'Ming China · 1472–1529'},
      {label: 'Central terms', value: 'Heart-mind · innate knowing · knowledge and action'},
      {label: 'Practice', value: 'Attention · correction of selfish desire · responsible conduct'},
      {label: 'Textual form', value: 'Dialogues · letters · records · posthumous editing'},
      {label: 'Open dispute', value: 'Four Sentences · effort · realization · later lineages'},
    ],
    'wang-yangming-traditional-portrait',
    'This portrait tradition identifies Wang Yangming in formal Ming robes but should not be treated as photographically exact. It supports his public, administrative afterlife without representing innate knowing itself. The exhibit keeps the image beside surviving letters and a career in office, teaching, exile, and military command.',
  ),
};
