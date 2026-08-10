import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';

type OrientationItem = {readonly label: string; readonly value: string};
type OrientationSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

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

const standard = (
  name: string,
  paragraphs: readonly string[],
  orientation: readonly OrientationSection[],
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
    method: 'Reconciled against the current claim-reviewed article and registered exhibit sources; object-led presentation, subject-specific visitor guide, and principal-object provenance reviewed against the locked exhibit standard.',
    lock,
  },
  objectInterpretations: {[assetId]: objectText},
});

export const EAST_ASIAN_PRIMARY_INTERPRETATIONS:
Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>> = {
  confucius: standard(
    'Confucius',
    [
      'Confucius is a late Spring and Autumn teacher associated with Lu, conventionally dated 551–479 BCE. Those dates orient rather than document a fully recoverable career: many travels, offices, and encounters belong to later morally shaped biography. His importance rests in conversations about learning, ritual, music, family, language, and government that communities preserved and reinterpreted. The Analects is the central witness, yet its twenty received books are a layered collection of sayings, scenes, and dialogues, not a book written or dictated by one historical person. That uncertainty distinguishes a historical teacher from the many traditions that later made him exemplary.',
      'Within that collection, ren names demanding relational humaneness, while li names embodied practices that can educate feeling and coordinate conduct. Learning involves study, rehearsal, reflection, and correction among others, not merely acquiring information. A junzi—often rendered “exemplary person”—becomes reliable through this work rather than inherited rank alone. These terms resist one-word English equivalents and do not yield a mechanical code. They ask how a person can make care, judgment, speech, and shared forms answerable to the particular relationships in which they matter. Music and poetry likewise belong to cultivation because attention is learned through practice, not declared by insight alone.',
      'Confucius links public authority to credible conduct, fitting roles, remonstrance, and humane practice rather than coercion alone. That orientation also leaves hard questions about hierarchy, family loyalty, paternalism, and who may revise inherited forms. The Yuan portrait records a later visual canon of the sage, not a documented lifetime likeness; it makes reception visible without proving the teacher’s appearance or doctrine. Read the exhibit as an invitation to test whether repeated practice deepens attention, and when humane judgment should challenge the ritual or hierarchy that trained it. A role earns authority through conduct, not merely by bearing an inherited name.',
    ],
    [
      {heading: 'Key ideas', items: [
        {label: 'Humaneness (ren)', description: 'A demanding way of responding to other people with care, reciprocity, restraint, and situational judgment.'},
        {label: 'Ritual practice (li)', description: 'Learned forms of conduct that can coordinate a community and educate feeling when they remain answerable to humane judgment.'},
      ]},
      {heading: 'How cultivation works', items: [
        {label: 'Learning with others', description: 'Study, rehearsal, reflection, and correction turn inherited texts and practices into a continuing discipline.'},
        {label: 'The exemplary person', description: 'A junzi is formed through reliable conduct and willingness to learn, not simply born into high rank.'},
      ]},
      {heading: 'Continuing question', items: [
        {label: 'Authority and criticism', description: 'When do roles and rituals earn trust, and when should humane concern revise the hierarchies they preserve?'},
      ]},
    ],
    'china-confucius-yuan-portrait',
    'This formal Yuan-dynasty album portrait was made roughly eighteen centuries after Confucius. It shows the durable visual canon through which later communities remembered a sage, not a documented lifetime likeness. The object identifies his reception while the layered Analects, rather than the painted face, supplies the exhibit’s main early textual evidence.',
    'fnv1a64:f088ecf7490b481d',
  ),
  mencius: standard(
    'Mencius',
    [
      'Mencius was a Warring States Confucian teacher conventionally placed around 372–289 BCE, although his chronology and court itinerary remain approximate. The received Mengzi presents exchanges with rulers, rivals, and students in a layered collection, not a verbatim travel diary. Its later place among the Four Books made this account of cultivation unusually influential without erasing ancient competitors. The exhibit begins with a thinker and text in transmission, not a single transparent voice: later canonical authority should not make contested chronology or textual formation disappear. Its dialogues present arguments in particular political encounters rather than a detached psychology textbook.',
      'Saying that human nature is good does not mean people begin morally complete or reliably choose well. Mencius identifies incipient responses—often called four beginnings—that can grow into humaneness, rightness, ritual propriety, and wisdom. Compassion, shame, respect, and discrimination need nourishment, attention, reflection, extension, and supportive conditions. Xin, or heart-mind, joins feeling and judgment rather than reproducing a modern split between emotion and reason. A first morally salient response matters only if cultivation carries it beyond the vivid immediate case into dependable action. Poverty, neglect, and coercion can damage the conditions under which that development is possible.',
      'Humane government includes material security, reduced destructive burdens, education, remonstrance, and limits on rulers who harm the people. These arguments remain hierarchical and are not a modern democratic program. Nor is the disagreement with Xunzi merely optimism against pessimism: they classify spontaneous tendencies, moral capacities, deliberate practice, and achieved goodness differently. The Yuan portrait records Mencius’s later canonical commemoration rather than his appearance. It helps show how reception elevated the teacher while leaving visitors to ask which institutions let moral capacities flourish or fail. Those questions make moral growth a public problem as well as a private aspiration.',
    ],
    [
      {heading: 'Key ideas', items: [
        {label: 'Moral beginnings', description: 'Early responses such as compassion can be cultivated into durable virtues; they are not proof that anyone is already good.'},
        {label: 'Heart-mind (xin)', description: 'A single term for the capacity that feels, notices, judges, and can be educated.'},
      ]},
      {heading: 'Politics and practice', items: [
        {label: 'Humane government', description: 'Rulers should reduce avoidable hardship and support conditions in which people can learn and act well.'},
        {label: 'Extension', description: 'A response to one visible case must be reflected on and carried outward rather than stopping at personal sympathy.'},
      ]},
      {heading: 'Continuing debate', items: [
        {label: 'Mencius and Xunzi', description: 'Their disagreement concerns how moral capacities, desire, learning, and achieved goodness relate—not a simple divide between cheerfulness and despair.'},
      ]},
    ],
    'china-mencius-yuan-portrait',
    'This Yuan-dynasty portrait was produced many centuries after Mencius and records his later canonical commemoration, not his historical appearance. Its formal scholar-sage imagery helps explain how reception elevated Mencius, while the exhibit keeps that later authority distinct from the approximate Warring States biography and layered Mengzi text.',
    'fnv1a64:3bebb6078e0e6bd3',
  ),
  xunzi: standard(
    'Xunzi',
    [
      'Xunzi was a late Warring States thinker conventionally dated around 310–235 BCE and associated by later sources with Zhao, Qi, and Chu. The received Xunzi has unusually sustained essays, but its thirty-two chapters also reflect compositional and editorial layers. Stories about offices, students, and influence remain useful orientation only when separated from secure authorship and chronology. The exhibit therefore treats the text as a resource for arguments about education and order, not a transparent biography or a single timeless doctrine. Its force lies in explaining how human practices make ethical and political life possible.',
      'His famous claim that human nature is bad does not mean total depravity or an inability to become good. Spontaneous desires and dispositions do not, by themselves, create ethical order; goodness is achieved through deliberate effort, teachers, standards, practice, and ritual. Ritual can coordinate scarce goods, shape grief and desire, and make roles intelligible. The heart-mind can distinguish and direct, but fixation can also blind it. Xunzi seeks to order desire rather than abolish it, making cultivation a demanding social and institutional practice. Study requires models and repeated correction, but that need does not settle whose models deserve authority.',
      'Heaven follows constant patterns instead of adjusting events to reward virtue, leaving people responsible for organizing their affairs. Public naming uses shared conventions to stabilize distinctions and action without making language private whim. These resources explain education and cooperation while raising questions about hierarchy, sage authority, and criticism of inherited constructions. The Qing portrait is a much later commemorative image, not a Warring States likeness; it represents later reception, not proof of biography or doctrine. Xunzi’s standards matter most when visitors ask who may revise them and for whose benefit. His influence on later statecraft debates does not make him simply a Legalist.',
    ],
    [
      {heading: 'Key ideas', items: [
        {label: 'Deliberate effort', description: 'Ethical character is made through learning, practice, teachers, and correction rather than simply uncovered inside us.'},
        {label: 'Ritual', description: 'Shared forms can coordinate desire, grief, goods, and roles; they are social tools rather than empty ceremony.'},
      ]},
      {heading: 'How order is made', items: [
        {label: 'Names and standards', description: 'Publicly shared distinctions can guide action, but their authority must remain open to critical examination.'},
        {label: 'Constant Heaven', description: 'Natural patterns do not reward virtue, so human beings bear responsibility for their institutions.'},
      ]},
      {heading: 'Continuing debate', items: [
        {label: 'Construction and hierarchy', description: 'If norms are made, when do they educate fairly and when do they preserve authority that needs revision?'},
      ]},
    ],
    'china-xunzi-qing-portrait',
    'This Qing-dynasty painting is a much later traditional representation, not a Warring States likeness. Its official robes visualize Xunzi through later scholarly and political reception. The exhibit uses it for identification while refusing to let a commemorative image settle his uncertain biography, the layered collection, or his contested relationship to later statecraft.',
    'fnv1a64:5203edd8ba26df71',
  ),
  laozi: standard(
    'Laozi',
    [
      'No secure biography or numerical lifespan can be recovered for Laozi. Sima Qian preserves competing stories about an archivist, a meeting with Confucius, and departure through a frontier pass; later religious and artistic traditions add further identities. The responsible starting point is an attributed textual persona connected to a layered collection of terse verses, not a documented founder who wrote a finished book. Excavated Guodian and Mawangdui witnesses preserve Laozi-related material in different selections and sequences before the familiar received arrangement of eighty-one chapters. They reveal a textual history before later readers supplied a stable biography and a single canonical order.',
      'This plurality does not make the Daodejing random, but it blocks a simple author-and-publication story. Dao can name way, course, or generative path; de can name virtue, potency, or efficacy; wu and you change with context. One English word cannot quietly turn these terms into a creator, a substance, or creation from nothing. Wuwei recommends action without coercive display or self-assertion, not literal inactivity, while ziran concerns unforced being-so rather than mere impulse. Each verse needs its setting, translation choices, and argumentative pressure. A memorable line is not a detachable slogan whose meaning survives every context.',
      'Softness, reversal, desire, war, and rulership support therapeutic, political, mystical, and statecraft readings that remain in tension. “Daoism” is a retrospective label, not one uniform identity for this text’s philosophical, religious, commentarial, and institutional histories. The Ming handscroll stages the later legend of Laozi transmitting the Daodejing at a pass; it cannot prove a single historical traveler composed the received text. It makes reception visible while inviting visitors to compare how apparent opposites reshape an argument about action and force. Its scene also warns against mistaking an influential legend for evidence of authorship.',
    ],
    [
      {heading: 'Text and identity', items: [
        {label: 'An attributed persona', description: '“Laozi” connects several historical traditions to a text, not a securely documented author with a recoverable biography.'},
        {label: 'Several witnesses', description: 'Excavated and received versions preserve different selections and orders, showing that the text has a transmission history.'},
      ]},
      {heading: 'Key ideas', items: [
        {label: 'The Way (dao)', description: 'A flexible term for a course, way, or generative path; translation should not silently make it a Western-style creator or substance.'},
        {label: 'Noncoercive action (wuwei)', description: 'Acting without forceful display or self-assertion, not doing nothing at all.'},
      ]},
      {heading: 'Continuing debate', items: [
        {label: 'Politics and withdrawal', description: 'Does resistance to force guide careful rule, personal withdrawal, spiritual practice, or several competing possibilities?'},
      ]},
    ],
    'china-laozi-daodejing-handscroll',
    'This Ming-period handscroll stages the later legend of Laozi transmitting the Daodejing at a frontier pass. It is not evidence that one historical traveler composed the received text in a single encounter. The object makes the biographical story visible precisely so the exhibit can distinguish reception, attributed persona, and layered textual witnesses.',
    'fnv1a64:0e8281600d198ec0',
  ),
  zhuangzi: standard(
    'Zhuangzi',
    [
      'A probable later-fourth-century BCE thinker named Zhuang Zhou stands behind part of this tradition, but the person and received book are not identical. The thirty-three chapters preserved through Guo Xiang’s edition comprise seven Inner, fifteen Outer, and eleven Miscellaneous chapters. The Inner Chapters are traditionally associated most closely with Zhuang Zhou, yet none is a signed manuscript and the later groups preserve diverse voices and developments. The exhibit reads an anthology with an editorial history rather than extracting an unquestioned system from a familiar name. Its chapters make philosophical inquiry inseparable from genre, compilation, and later reception.',
      'Its stories of enormous birds, disputing friends, skilled craftspeople, altered bodies, dreamers, mourners, and refusals of office test rigid habits of judgment. Language, training, social use, and standpoint shape what seems obvious, but perspectival limits do not make every belief equally true. Cook Ding’s responsive movement is trained and cautious skill, not magical effortlessness. Accounts of uselessness can expose coercive social standards without guaranteeing that withdrawal answers injustice. The stories change the scale of a question before they yield a lesson. Their humor is a philosophical method, not a license to avoid argument.',
      'Accounts of bodily difference can overturn assumptions about normality while still using marked bodies for rhetorical surprise; death narratives can revise attachment without requiring suppressed grief. Later philosophical and religious Daoist, literary, artistic, and Chan readers transformed the collection rather than uncovering one timeless doctrine. Hua Zuli’s 1326 portrait gives that much later reception a face, not documentary access to Zhuang Zhou or the chapters’ authors. The guide asks visitors to notice whom a standard excludes and whether trained responsiveness can remain critical of cruelty. That remains a question rather than the text’s one final political instruction, demanding a reader willing to remain unsettled.',
    ],
    [
      {heading: 'How the text works', items: [
        {label: 'Stories and reversal', description: 'Parables, jokes, shifts in scale, and strange encounters unsettle quick judgments rather than simply state conclusions.'},
        {label: 'A layered anthology', description: 'Inner, Outer, and Miscellaneous chapters preserve different voices and histories; none should automatically be assigned to one author.'},
      ]},
      {heading: 'Key ideas', items: [
        {label: 'Perspective', description: 'Standpoint and language shape what seems natural, yet this does not mean every claim is equally good or true.'},
        {label: 'Skilled responsiveness', description: 'Cook Ding models practice that is trained, attentive, and adaptive rather than effortless escape from responsibility.'},
      ]},
      {heading: 'Continuing question', items: [
        {label: 'Freedom and criticism', description: 'Can loosening rigid standards expose cruelty without turning withdrawal or irony into an answer to every injustice?'},
      ]},
    ],
    'china-zhuangzi-hua-zuli-1326',
    'Hua Zuli painted this traditional portrait in 1326, more than fifteen centuries after Zhuang Zhou’s probable lifetime. It gives later reception a memorable face but cannot identify the authors of the Inner, Outer, or Miscellaneous chapters. The exhibit treats the image as commemoration, not documentary access to the textual persona.',
    'fnv1a64:e4e86fedf2d55db6',
  ),
  mozi: standard(
    'Mozi',
    [
      'Mozi names an elusive early Warring States teacher and the founding authority claimed by an organized movement. Dependable biography is sparse, while followers trained advocates, served in offices, debated rivals, and developed expertise in defending threatened cities. The received Mozi is their layered anthology, not an autograph: doctrinal triads, dialogues, later Canons, anecdotes, and technical siege chapters differ in voice, date, and purpose. That history keeps a remembered founder, a disciplined community, and a composite corpus from being treated as the same thing. It also prevents every later technical chapter from becoming a personal saying of Mozi.',
      'Inclusive or impartial concern challenges the exclusion that lets people protect only their own family or state while discounting injury to outsiders. It need not demand identical emotion or action toward everyone. Mohist benefit foregrounds material sufficiency, population, and order, making comparison with consequential thinking illuminating without turning the program into later hedonistic utilitarianism. Fa are teachable models or standards, often explained through crafts, meant to make judgment more public than prestige or private impulse. The questions are practical: whose welfare counts, and can a proposed standard be taught and checked? Merit and economy make the comparison extend to appointment and luxury as well as warfare.',
      'Opposition to aggressive war exposes the inconsistency of praising conquest while condemning smaller theft and murder, yet it does not reject every punishment, defense, or coercive institution. Heaven and ghosts supply both moral accountability and political enforcement; they are not decorative extras. The later Canons extend Mohist work on language, inference, knowledge, and technical matters but should not be assigned directly to Mozi. The Western Han bamboo slips witness copying, loss, and recovery rather than an autograph or a finished anthology, keeping reformist impartiality and strict hierarchy visibly in tension. Their fragmentary survival makes the material history of the movement’s texts part of the argument.',
    ],
    [
      {heading: 'Key ideas', items: [
        {label: 'Inclusive concern', description: 'Injury to people outside one’s family or state should count morally rather than being dismissed as someone else’s loss.'},
        {label: 'Shared benefit', description: 'Policies are judged by effects on sufficiency, population, and order, not simply status or inherited privilege.'},
      ]},
      {heading: 'Public standards', items: [
        {label: 'Models (fa)', description: 'Teachable standards, often compared to craft tools, that make reasons and decisions more publicly testable.'},
        {label: 'Against aggressive war', description: 'Conquest cannot be praised while analogous violence by ordinary people is condemned; defense remains a separate question.'},
      ]},
      {heading: 'Continuing tension', items: [
        {label: 'Impartiality and enforcement', description: 'Can a movement oppose domination while relying on hierarchy, religious authority, and centralized discipline?'},
      ]},
    ],
    'china-mozi-lost-article-slips',
    'These Western Han bamboo slips transmit a lost Mozi article and materially anchor a history of copying, loss, and recovery. They postdate Mozi and are neither an autograph nor proof that the anthology formed at once. Their fragmentary survival supports the exhibit’s distinction between remembered founder, organized movement, and layered corpus.',
    'fnv1a64:97d252bcfda2ecdc',
  ),
  'han-feizi': standard(
    'Han Feizi',
    [
      'Han Fei was a late Warring States thinker conventionally dated around 280–233 BCE. A later biography links him to Han’s ruling lineage, Xunzi, and death in Qin custody, but many details remain reconstructed. The received Han Feizi contains fifty-five chapters with stylistic and doctrinal variation. It is the principal source for his political project without being transparently a single-authored book. The exhibit therefore treats its arguments as historically specific responses to problems of rule rather than an easy guide to bureaucracy or a biography fixed by later stories. Its political analysis begins from the dangers of delegation, competition, and self-interested reporting inside a state.',
      'Fa can mean laws, standards, models, or institutional criteria depending on context; it is broader than one modern idea of law. Shu names techniques for assigning office, comparing claims with performance, concealing preferences, and monitoring ministers. Shi names power or strategic advantage attached to a position rather than personal virtue. These concerns interact but are not three interchangeable tools. Rewards and punishments seek predictable alignment while concentrating the sovereign’s control. They respond sharply to hidden information, favoritism, bureaucratic capture, and unreliable virtue. A ruler is urged to judge performance rather than trust persuasive appearances or personal affection.',
      'That response leaves a central vulnerability: who monitors a foolish, captured, or abusive ruler? Public standards can constrain ministers while serving censorship, coercion, and monarchical supremacy. “Legalism,” or fajia, is a later bibliographic umbrella for diverse thinkers, not Han Fei’s declared school, and links to Xunzi require comparison rather than a simple genealogy. The modern commemorative statue makes later reception visible but cannot preserve Han Fei’s appearance or settle the text’s politics. Use it to trace who sets standards, judges performance, and controls sanctions. A design can reduce private favoritism while making public contest and correction impossible.',
    ],
    [
      {heading: 'Institutional tools', items: [
        {label: 'Standards (fa)', description: 'Public rules, models, or criteria for judging conduct; the term is broader than a single modern idea of law.'},
        {label: 'Administrative technique (shu)', description: 'Methods for assigning office, checking claims against performance, and limiting ministerial manipulation.'},
        {label: 'Positional power (shi)', description: 'Authority attached to an office rather than the moral excellence of the person occupying it.'},
      ]},
      {heading: 'Central problem', items: [
        {label: 'Information and delegation', description: 'How can a ruler judge officials when praise, reports, and personal loyalty may hide failure or self-interest?'},
      ]},
      {heading: 'Continuing danger', items: [
        {label: 'Who watches the ruler?', description: 'A system may curb private favoritism among ministers while leaving concentrated sovereign power without public accountability.'},
      ]},
    ],
    'china-han-fei-modern-statue',
    'This modern commemorative statue does not preserve Han Fei’s appearance or an ancient sculptural tradition. Its monumental authority belongs to recent reception and can easily naturalize the ruler-centered power the text analyzes. The exhibit uses it as an identified later representation while keeping authorship, coercion, and accountability visible.',
    'fnv1a64:1859ed4c9c5c5291',
  ),
  'zhu-xi': standard(
    'Zhu Xi',
    [
      'Zhu Xi lived from 1130 to 1200 in Southern Song China as a scholar, teacher, commentator, and official. His work joined classical interpretation, cultivation, inquiry, and institution building. “Neo-Confucianism” is a modern umbrella, while daoxue, Learning of the Way, and later Cheng–Zhu labels map changing intellectual associations rather than a single organization he founded. He worked amid academy building, print, political faction, debates with Buddhist and Daoist traditions, and the loss of northern Song territory. His proposals were contested and officially condemned late in his life. Later authority for his commentaries should not be projected backward as proof of consensus.',
      'Li names pattern, order, or coherence, and qi names the psychophysical material force through which concrete things exist and change. They are analytically distinguishable but never two separate worlds: li is not a Platonic Form, and qi is not inert matter. Human nature is good as pattern, yet uneven qi, desire, habit, and circumstance can obscure fitting response. Gewu, investigation of things, is broader than gathering external facts or staring at bamboo; it joins reading, questioning, observing affairs, comparing cases, and correction. Jing, reverent attentiveness, steadies the heart-mind in ordinary duties. Zhu distinguishes knowing from acting, giving knowledge guidance and practice completion, so neither memorization nor unexamined energetic action counts as finished learning.',
      'Zhu did not author the Four Books. He selected, edited, ordered, and commented on inherited Analects, Mencius, Great Learning, and Doctrine of the Mean materials, helping build a curriculum later academies and states amplified. Yuan examination policy privileged his interpretations in 1313, posthumously; that success is an afterlife, not proof of philosophical correctness. The displayed 19th- or early-20th-century portrait from a famous-men album is later commemoration. It makes a robed scholar-sage visible but cannot preserve Zhu Xi’s appearance, document his teaching, or settle the value of the curriculum. Together, text and image ask whether disciplined self-correction can educate judgment while authority turns one commentary into orthodoxy.',
    ],
    [
      {heading: 'Historical frame', items: [
        {label: 'Learning of the Way (daoxue)', description: 'Zhu Xi’s preferred name for a Confucian project of learning and cultivation; “Neo-Confucianism” is a later umbrella, not one timeless school.'},
        {label: 'Cheng–Zhu tradition', description: 'A retrospective lineage label that links Zhu Xi with the Cheng brothers while leaving real disagreements and changing institutions visible.'},
      ]},
      {heading: 'How cultivation works', items: [
        {label: 'Pattern and material force (li and qi)', description: 'Complementary terms for intelligible coherence and the changing psychophysical stuff of concrete life, not two separately existing worlds.'},
        {label: 'Investigation and reverent attention (gewu and jing)', description: 'A practice of studying texts, affairs, relationships, and conduct with gathered attention, rather than fact collection or private stillness alone.'},
      ]},
      {heading: 'Texts and authority', items: [
        {label: 'The Four Books', description: 'Inherited Analects, Mencius, Great Learning, and Doctrine of the Mean texts that Zhu Xi selected, ordered, and commented on rather than authored.'},
        {label: 'Examination authority', description: 'Later state privileging of Zhu’s interpretations, which spread a common curriculum but did not prove that it was uncontested or philosophically final.'},
      ]},
    ],
    'zhu-xi-traditional-portrait',
    'This 19th- or early-20th-century portrait from a famous-men album belongs to Zhu Xi’s later commemorative tradition. It makes a scholar-sage image visible, but it is not a lifetime likeness, a record of his teaching, or evidence that his curriculum and interpretations were universally accepted.',
    'fnv1a64:50ce3dbcf935357d',
  ),
  'wang-yangming': standard(
    'Wang Yangming',
    [
      'Wang Shouren, conventionally known as Wang Yangming, lived from 1472 to 1529 as a Ming official, commander, teacher, and controversial public figure. The later labels “Neo-Confucian,” “school of mind,” and Lu–Wang identify meaningful comparisons but are not his simple self-description or proof of one unbroken institution. His mature teaching is preserved through letters, dialogues, records, and posthumous compilations. Longchang became a retrospective turning point. The setting matters: a philosophy of moral practice was developed in family obligations, office, exile, conflict, and coercive state power.',
      'For Wang, the heart-mind is not a private ego that manufactures the external world. It is the relational site through which pattern becomes present in responsible judgment. *Liangzhi*, often rendered innate or pure knowing, names a capacity to recognize moral salience; it is neither an inborn rulebook nor the infallibility of sincere feeling. Selfish desire, social position, and rationalization can obscure it. The unity of knowledge and action therefore concerns ethically engaged knowing: a person who really sees what care requires has already begun to act, though deliberation, correction, and weakness of will remain real problems. Wang’s reinterpretation of investigating things as rectifying affairs asks learners to test intentions in concrete relationships rather than accumulate detached information.',
      'The Four Sentences associated with the 1527 Tianquan Bridge exchange became a disputed reception node. Qian Dehong, Wang Ji, and later interpreters differ over original mind, good and evil, effort, and realization; no compact formula settles the disagreement. The displayed Ming portrait attributed to Shen Junhui offers a formal scholar-official image at Shaoxing Museum, but the record does not authorize a photographically exact likeness or a picture of innate knowing. It is an attributed visual reception of a public teacher. Set that composed face beside Wang’s administrative and military career, including coercive campaigns, and ask how moral confidence is checked when people disagree: not by private certainty, but by attention, relationships, consequences, correction, and action.',
    ],
    [
      {heading: 'Moral practice', items: [
        {label: 'Heart-mind', description: 'The responsive center of feeling, thought, and judgment through which moral pattern is encountered in concrete relations.'},
        {label: 'Innate knowing', description: '*Liangzhi* is a capacity for moral recognition that can be obscured; it does not make personal feeling infallible.'},
      ]},
      {heading: 'Knowing and acting', items: [
        {label: 'Unity of knowledge and action', description: 'Ethically serious knowledge is already active in conduct, while still requiring deliberation, correction, and resistance to weakness of will.'},
        {label: 'Rectifying affairs', description: 'Wang’s reinterpretation of investigation turns learning toward correcting intentions amid ordinary responsibilities rather than detached accumulation.'},
      ]},
      {heading: 'A contested inheritance', items: [
        {label: 'Four Sentences', description: 'A late teaching associated with Tianquan Bridge whose wording and relation to effort or sudden realization remain disputed.'},
        {label: 'Public power', description: 'Wang’s service as official and commander makes any account of decisive moral practice answerable to state coercion.'},
      ]},
    ],
    'wang-yangming-traditional-portrait',
    'This Ming-dynasty hanging-scroll portrait is attributed to Shen Junhui and held by Shaoxing Museum. It is an attributed visual tradition, not a photographically exact likeness and not evidence for Wang’s doctrine or the episodes of his career. It makes later public remembrance of a scholar-official visible while surviving texts and historical sources ground the interpretation.',
    'fnv1a64:fb417de4c4f1e265',
  ),
};
