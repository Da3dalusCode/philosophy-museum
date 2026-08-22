import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';

type GuideInput = readonly [
  string,
  readonly [string, string, readonly string[]][],
  string,
  readonly [string, string, readonly string[]][],
];

type ReviewEvidence = {
  plaqueTitle: string;
  invitation: string;
  plaqueType: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['type'];
  canonicalContexts: NonNullable<MuseumSupplementalExhibit['wallPlaque']>['canonicalContexts'];
  articleTitle: string;
  objectInterpretation: string;
  context: readonly [string, string, string];
  sources: MuseumSupplementalExhibit['sources'];
  paragraphSourceIds: readonly [readonly string[], readonly string[], readonly string[]];
  guide: GuideInput;
  resolution: string;
  lock: string;
};

const collection = (id: string, label: string, url: string) => ({id, label, url, kind: 'collection-record' as const});
const academic = (id: string, label: string, url: string) => ({id, label, url, kind: 'academic-reference' as const});

const evidence: Record<string, ReviewEvidence> = {
  'eac-zhu-four-books': {
    plaqueTitle: 'The Four Books with Collected Commentaries',
    invitation: 'This later court edition preserves Zhu Xi’s influential arrangement and commentary, through which four inherited texts became a contested curriculum for cultivation and later examinations.',
    plaqueType: 'work-or-text', canonicalContexts: [{kind: 'philosopher', id: 'zhu-xi'}], articleTitle: 'Zhu Xi',
    objectInterpretation: 'The National Palace Museum volume is a Qing inner-court imitation of a Southern Song printed edition, not a book Zhu Xi handled. Its open pages materially distinguish base text from collected commentary while its later manufacture warns against treating transmission as unchanged.',
    context: [
      'The object establishes a later editorial and printing afterlife; Zhu Xi’s claim-reviewed article and specialist scholarship establish how selection, sequence, gloss, and cultivation made the Four Books into a philosophical curriculum.',
      'Yuan examination policy privileged Zhu’s interpretations only after his death. That institutional success increased their reach without proving consensus, erasing the texts’ earlier histories, or making commentary philosophically neutral.',
      'Reading the page as an argument about reading keeps two levels visible: inherited voices remain available, yet the apparatus directs attention and helps later teachers decide which distinctions learners should notice first.',
    ],
    sources: [
      collection('four-books-npm', 'National Palace Museum via Wikimedia Commons — The Four Books with Collected Commentaries', 'https://commons.wikimedia.org/wiki/File:The_Four_Books,_with_a_Collection_of_Comments.jpg'),
      academic('zhu-xi-sep', 'Stanford Encyclopedia of Philosophy — Zhu Xi', 'https://plato.stanford.edu/entries/zhu-xi/'),
      academic('song-ming-sep', 'Stanford Encyclopedia of Philosophy — Song-Ming Confucianism', 'https://plato.stanford.edu/entries/song-ming-confucianism/'),
    ],
    paragraphSourceIds: [['four-books-npm', 'zhu-xi-sep'], ['zhu-xi-sep', 'song-ming-sep'], ['four-books-npm', 'zhu-xi-sep']],
    guide: ['Reading Zhu Xi’s curriculum', [
      ['Four inherited texts', 'The Analects, Mencius, Great Learning, and Doctrine of the Mean predate Zhu Xi; he selected, ordered, edited, and commented on them.', ['zhu-xi-sep']],
      ['Commentary as argument', 'Glosses guide attention and connect passages, so preservation and philosophical reconstruction happen together.', ['zhu-xi-sep', 'song-ming-sep']],
    ], 'Authority after Zhu Xi', [
      ['Later examination status', 'State sponsorship amplified one reading after Zhu’s death without making it uncontested or finally correct.', ['zhu-xi-sep']],
      ['A Qing witness', 'The displayed volume imitates an earlier printed model but is neither a Song original nor Zhu Xi’s own copy.', ['four-books-npm']],
    ]],
    resolution: 'Resolved: verified the National Palace Museum Qing court witness, separated artifact date from Zhu Xi’s commentarial work, mapped curricular and institutional claims, preserved public-domain attribution and natural proportions, and linked the current Zhu Xi article.', lock: 'fnv1a64:0e24d15b5d041d7a',
  },
  'eac-zhu-white-deer': {
    plaqueTitle: 'White Deer Grotto Academy',
    invitation: 'This repeatedly rebuilt academy preserves the institutional afterlife of Zhu Xi’s 1179 revival, where study, conduct, relationships, and rules joined philosophical cultivation to a shared place.',
    plaqueType: 'historical-event-or-institutional-context', canonicalContexts: [{kind: 'philosopher', id: 'zhu-xi'}], articleTitle: 'Zhu Xi',
    objectInterpretation: '武铁辆玻 photographed the historic Jiangxi complex in 2010 and licensed the image CC BY-SA 2.0. The tree-lined approach and later halls document a living commemorative site, not intact twelfth-century buildings or direct visual evidence of Zhu Xi’s teaching.',
    context: [
      'Zhu Xi began reviving the academy in 1179 and associated study there with articles of learning that joined ethical relationships, careful inquiry, conduct, and correction. Architecture mattered because the program required teachers, peers, routines, texts, and memory.',
      'The academy’s influence traveled through copying, adaptation, restoration, and later institutional use. Its fame is therefore a reception history rather than proof that one stable Song organization remained physically or pedagogically unchanged.',
      'The site grounds philosophy without turning buildings into doctrine. It shows how cultivation can acquire schedules and social expectations while leaving open who gained access, how local patronage worked, and how later communities revised the model.',
    ],
    sources: [
      collection('white-deer-commons', 'Wikimedia Commons — White Deer Grotto Academy photograph', 'https://commons.wikimedia.org/wiki/File:White_Deer_Grotto_Academy.jpg'),
      academic('white-deer-brill', 'Martin Gehlmann — Transmissions of the White Deer Grotto Academy Articles of Learning in Korea', 'https://brill.com/display/book/9789004424074/BP000010.pdf'),
      academic('zhu-xi-sep', 'Stanford Encyclopedia of Philosophy — Zhu Xi', 'https://plato.stanford.edu/entries/zhu-xi/'),
    ],
    paragraphSourceIds: [['white-deer-commons', 'white-deer-brill'], ['white-deer-brill', 'zhu-xi-sep'], ['white-deer-commons', 'white-deer-brill']],
    guide: ['Learning in an academy', [
      ['Rules of learning', 'Study is joined to ethical relationships, conduct, inquiry, and correction rather than reduced to private reading.', ['white-deer-brill', 'zhu-xi-sep']],
      ['Institutional practice', 'Teachers, peers, patronage, ritual, and routines give a cultivation program a durable social form.', ['white-deer-brill']],
    ], 'Reading the present site', [
      ['Revival from 1179', 'Zhu Xi’s intervention began a new chapter in an older site; it was not the academy’s timeless origin.', ['white-deer-brill']],
      ['Rebuilt architecture', 'The 2010 photograph records later fabric and commemoration, not an untouched Southern Song campus.', ['white-deer-commons']],
    ]],
    resolution: 'Resolved: verified the 2010 licensed photograph, dated Zhu Xi’s revival carefully, distinguished institutional transmission from surviving fabric, mapped every claim, preserved natural proportions, and linked the current Zhu Xi article.', lock: 'fnv1a64:144aba11ea3b22be',
  },
  'eac-wang-letters': {
    plaqueTitle: 'Former Residence Site of Wang Shouren',
    invitation: 'This 2017 photograph supplies place context for Wang Yangming; Princeton’s separate 1523–1525 handscroll supplies related evidence for addressed counsel and correspondence.',
    plaqueType: 'object-manuscript-site-or-archaeological-context', canonicalContexts: [{kind: 'philosopher', id: 'wang-yangming'}], articleTitle: 'Wang Yangming',
    objectInterpretation: '猫猫的日记本 photographed the restored former-residence site of Wang Shouren in Shaoxing in 2017 under CC BY-SA 4.0. The courtyard grounds Wang’s life in place, but it is neither the setting of the Zheng correspondence nor intact sixteenth-century fabric and cannot illustrate innate knowing.',
    context: [
      'Princeton’s separate collection record identifies Wang Shouren’s ink-on-paper Letters to Zheng Bangrui as a handscroll made about 1523–1525, accession y1979-95. The letter form makes teaching responsive to a named person and difficulty rather than a detached slogan.',
      'For Wang, genuine knowledge of the good is already active, yet liangzhi is not the infallibility of sincere impulse. Desire, rationalization, position, consequences, and disagreement make correction indispensable, especially in a life that joined teaching to coercive public office.',
      'The installed residence photograph supplies place rather than calligraphy. Reading it beside the documented handscroll and article preserves addressed practice and the historical disputes generated by Wang’s administration, campaigns, students, and later interpreters without merging three different kinds of evidence.',
    ],
    sources: [
      collection('wang-residence-commons', 'Wikimedia Commons — former residence site of Wang Shouren in Shaoxing', 'https://commons.wikimedia.org/wiki/File:Former_Residence_of_Wang_Shouren_in_Shaoxing_01_2017-02.jpg'),
      collection('wang-letters-princeton', 'Princeton University Art Museum — Letters to Zheng Bangrui', 'https://artmuseum.princeton.edu/art/collections/objects/32340'),
      academic('wang-sep', 'Stanford Encyclopedia of Philosophy — Wang Yangming', 'https://plato.stanford.edu/entries/wang-yangming/'),
    ],
    paragraphSourceIds: [['wang-residence-commons', 'wang-letters-princeton'], ['wang-sep', 'wang-letters-princeton'], ['wang-residence-commons', 'wang-letters-princeton', 'wang-sep']],
    guide: ['Counsel and moral practice', [
      ['Innate knowing', 'Liangzhi names a capacity for moral recognition that can be obscured; it does not make every sincere feeling reliable.', ['wang-sep']],
      ['Knowledge and action', 'Ethically serious knowing already inclines conduct while remaining answerable to reflection, correction, and consequences.', ['wang-sep']],
    ], 'Separating site and handscroll', [
      ['Addressed writing', 'A letter answers a person and circumstance, letting philosophical instruction become relational and practical.', ['wang-letters-princeton', 'wang-sep']],
      ['Two separate objects', 'The installed residence photograph and Princeton handscroll have different makers, dates, holdings, rights, and evidentiary limits.', ['wang-residence-commons', 'wang-letters-princeton']],
    ]],
    resolution: 'Resolved: retitled and redated the plaque for the installed 26 February 2017 CC BY-SA residence photograph, assigned it a contextual site role, kept Princeton’s 1523–1525 handscroll as a separate related object, mapped each claim to its evidence, preserved the asset bytes and natural proportions, and linked the current Wang Yangming article.', lock: 'fnv1a64:494aae3d84373cbd',
  },
  'eac-taijitu-heartmind': {
    plaqueTitle: 'Zhou Dunyi’s Taijitu',
    invitation: 'This modern reconstruction charts a Song cosmological diagram that Zhu Xi interpreted within his lineage, opening a later Confucian comparison with Wang Yangming’s heart-mind emphasis.',
    plaqueType: 'concept-argument-diagram-or-method', canonicalContexts: [{kind: 'branch', id: 'confucianism'}, {kind: 'philosopher', id: 'zhu-xi'}, {kind: 'philosopher', id: 'wang-yangming'}], articleTitle: 'Confucianism',
    objectInterpretation: 'Edescas2 created this English reconstruction in 2023 and dedicated it CC0. Its vertical labels translate a historical diagram tradition for present readers; it is not a Song manuscript, an archaeological witness, or evidence that Zhou Dunyi, Zhu Xi, and Wang Yangming directly debated one another.',
    context: [
      'The diagram coordinates polarity, movement and stillness, yin and yang, the five phases, and generation. Its compressed visual order requires commentary, so any reading already depends on choices about how relations, stages, and translated terms should be understood.',
      'Zhu Xi elevated Zhou Dunyi within a reconstructed genealogy and integrated the diagram into an account of pattern and material force. Wang later shifted attention toward responsible awareness without rejecting disciplined inquiry or proposing a private mind that invents the world.',
      'Comparison is valuable only when chronology stays visible. The exhibit stages a later internal debate about cosmos, pattern, material process, emotion, and heart-mind rather than inventing a face-to-face controversy or a simple opposition between outer facts and inward feeling.',
    ],
    sources: [
      collection('taijitu-commons', 'Wikimedia Commons — Zhou Dunyi Taijitu English reconstruction', 'https://commons.wikimedia.org/wiki/File:Zhou_Dunyi_Taijitu_English.png'),
      academic('zhu-xi-sep', 'Stanford Encyclopedia of Philosophy — Zhu Xi', 'https://plato.stanford.edu/entries/zhu-xi/'),
      academic('chinese-metaphysics-sep', 'Stanford Encyclopedia of Philosophy — Metaphysics in Chinese Philosophy', 'https://plato.stanford.edu/entries/chinese-metaphysics/'),
    ],
    paragraphSourceIds: [['taijitu-commons', 'zhu-xi-sep'], ['zhu-xi-sep', 'chinese-metaphysics-sep'], ['taijitu-commons', 'chinese-metaphysics-sep']],
    guide: ['Following the diagram', [
      ['Generative sequence', 'Polarity, movement, stillness, yin-yang, and the five phases are linked as transformations rather than displayed as isolated things.', ['zhu-xi-sep', 'chinese-metaphysics-sep']],
      ['Modern reconstruction', 'English labels make one interpretation accessible but do not turn the image into a historical manuscript.', ['taijitu-commons']],
    ], 'A later Confucian comparison', [
      ['Zhu Xi’s genealogy', 'Zhu placed Zhou within a reconstructed lineage and read the diagram through pattern and material force.', ['zhu-xi-sep']],
      ['Wang’s heart-mind emphasis', 'Wang redirected inquiry toward active moral awareness; he did not directly debate Zhou Dunyi.', ['chinese-metaphysics-sep']],
    ]],
    resolution: 'Resolved: retained the verified 2023 CC0 reconstruction, made its modern translated status explicit, mapped the diagram and later comparison claims, preserved chronology and natural proportions, and linked the current Confucianism article.', lock: 'fnv1a64:fdd29d51a6c6c071',
  },
  'eac-xuanzang-translation': {
    plaqueTitle: 'Portrait of Xuanzang with Attendant',
    invitation: 'This fourteenth-century Japanese reception image remembers Xuanzang, whose seventh-century translations and commentaries supplied terms that Faxiang and Hossō scholars reorganized in new settings.',
    plaqueType: 'reception-or-transmission-history', canonicalContexts: [{kind: 'branch', id: 'buddhist-philosophy'}], articleTitle: 'Buddhist Philosophy',
    objectInterpretation: 'The Metropolitan Museum identifies this fourteenth-century Japanese hanging scroll as in the style of Kasuga Motomitsu, accession 29.160.29. Made roughly seven centuries after Xuanzang, it records Japanese commemoration and pilgrimage memory rather than his appearance or translation bureau at work.',
    context: [
      'Xuanzang’s return to Tang China and organized translation activity expanded the Chinese vocabulary and corpus available for Buddhist argument. Translation decisions did not merely copy Sanskrit meanings; consistency, commentary, cataloguing, and institutional sponsorship made new fields of interpretation possible.',
      'Faxiang and Japanese Hossō offer concrete afterlives, but no one route represents all East Asian Buddhism. Schools selected and reorganized translated distinctions in different languages, monasteries, political settings, and classificatory projects rather than receiving an unchanged Chinese package.',
      'The painting makes transmission visible through later visual culture while its date limits what it can establish. Textual and institutional evidence ground the philosophical claims; the scroll shows how a translator became a remembered patriarchal and travel-associated figure in Japan.',
    ],
    sources: [
      collection('xuanzang-met', 'The Metropolitan Museum of Art — Portrait of Xuanzang with Attendant', 'https://www.metmuseum.org/art/collection/search/45372'),
      academic('xuanzang-iep', 'Internet Encyclopedia of Philosophy — Xuanzang', 'https://iep.utm.edu/xuanzang/'),
      academic('buddhist-philosophy-sep', 'Stanford Encyclopedia of Philosophy — Buddhist Philosophy', 'https://plato.stanford.edu/entries/buddha/'),
    ],
    paragraphSourceIds: [['xuanzang-met', 'xuanzang-iep'], ['xuanzang-iep', 'buddhist-philosophy-sep'], ['xuanzang-met', 'xuanzang-iep']],
    guide: ['Translation as institution', [
      ['A coordinated bureau', 'Teams, source texts, terminology, revision, catalogues, and sponsorship shaped what a translation could become.', ['xuanzang-iep']],
      ['Faxiang and Hossō', 'Later Chinese and Japanese scholars reorganized Xuanzang’s textual legacy for distinct scholastic communities.', ['xuanzang-iep']],
    ], 'Reading Japanese reception', [
      ['A later commemoration', 'The fourteenth-century scroll belongs to Japanese memory, not Xuanzang’s seventh-century biography.', ['xuanzang-met']],
      ['Many Buddhist afterlives', 'One translator and one lineage cannot stand for the philosophical diversity of East Asian Buddhist traditions.', ['buddhist-philosophy-sep']],
    ]],
    resolution: 'Resolved: verified the Metropolitan Museum scroll and its Japanese reception date, corrected the misleading Chan-source label by using Xuanzang-specific evidence, mapped translation and afterlife claims, preserved CC0 attribution and natural proportions, and linked Buddhist Philosophy.', lock: 'fnv1a64:0c156028075a3968',
  },
  'eac-daoist-institutions': {
    plaqueTitle: 'Daoist Priest’s Ritual Robe with Celestial Palace',
    invitation: 'This 1820 ritual robe makes Daoist priestly office and liturgical cosmology visible, widening Daoism beyond two early texts without making one Qing object represent every lineage.',
    plaqueType: 'object-manuscript-site-or-archaeological-context', canonicalContexts: [{kind: 'branch', id: 'daoism'}], articleTitle: 'Daoism',
    objectInterpretation: 'The Metropolitan Museum identifies the object as a Chinese Daoist priest’s ritual robe with celestial palace, dated 1820, accession 44.61. Its embroidered cosmology belongs to performed office and the Rogers Fund acquisition history; it is one late-imperial witness, not a universal Daoist uniform.',
    context: [
      'A robe positions an officiant within an ordered ritual world. Vestments, registers, ordination, teachers, manuals, temples, patrons, and canonical collections locate authority in trained roles and transmitted institutions rather than in private appreciation of early philosophical texts alone.',
      'Celestial Masters, Lingbao, Shangqing, and Quanzhen developed different revelations, disciplines, offices, and communal forms. Interaction with Buddhist institutions, local cults, states, print, warfare, and modern reform generated change without making these lineages one uniform priesthood.',
      'The distinction between philosophical and religious Daoism can conceal the historical traffic among argument, revelation, practice, literature, and institution. The robe corrects a text-only view while its exact date and holding prevent the opposite mistake of projecting one Qing setting backward across centuries.',
    ],
    sources: [
      collection('daoist-robe-met', 'The Metropolitan Museum of Art — Daoist priest’s ritual robe with celestial palace', 'https://www.metmuseum.org/art/collection/search/69669'),
      academic('religious-daoism-sep', 'Stanford Encyclopedia of Philosophy — Religious Daoism', 'https://plato.stanford.edu/archives/sum2021/entries/daoism-religion/'),
      academic('daoism-sep', 'Stanford Encyclopedia of Philosophy — Daoism', 'https://plato.stanford.edu/entries/daoism/'),
    ],
    paragraphSourceIds: [['daoist-robe-met', 'religious-daoism-sep'], ['religious-daoism-sep', 'daoism-sep'], ['daoist-robe-met', 'daoism-sep']],
    guide: ['Authority in ritual communities', [
      ['Ordination and registers', 'Training and transmitted authorization help establish who may undertake particular ritual offices.', ['religious-daoism-sep']],
      ['Many institutional lineages', 'Celestial Masters, Lingbao, Shangqing, and Quanzhen have distinct histories rather than forming one timeless priesthood.', ['religious-daoism-sep', 'daoism-sep']],
    ], 'What the robe can show', [
      ['Performed cosmology', 'Embroidered emblems position the priest within a liturgical order; they are more than detached decoration.', ['daoist-robe-met']],
      ['One Qing setting', 'An 1820 garment cannot establish the clothing, organization, or practice of every Daoist period and community.', ['daoist-robe-met']],
    ]],
    resolution: 'Resolved: adopted the Metropolitan Museum’s exact object title, date, accession, provenance, and rights, mapped institutional claims to religious-Daoism scholarship, preserved the one-setting limitation and natural proportions, and linked the current Daoism article.', lock: 'fnv1a64:3b228435977e020a',
  },
  'eac-hwaeom-avatamsaka': {
    plaqueTitle: 'Korean Avataṃsaka Sūtra Cover',
    invitation: 'This Korean cover, made centuries after Uisang and Wonhyo, witnesses the Avataṃsaka Sūtra’s material afterlife while Hwaeom thinkers developed distinct accounts of relation and interpenetration.',
    plaqueType: 'object-manuscript-site-or-archaeological-context', canonicalContexts: [{kind: 'branch', id: 'buddhist-philosophy'}], articleTitle: 'Buddhist Philosophy',
    objectInterpretation: 'British Library Or. 7377 is a Korean Avataṃsaka Sūtra cover made about 1400, with gold designs on an indigo ground. It postdates Uisang and Wonhyo by centuries and witnesses later manuscript investment, not their handwriting, institutions, or direct interpretation.',
    context: [
      'Translation made the scripture available, but Korean commentaries, diagrams, classifications, teaching lineages, ritual uses, and political settings determined the questions it generated. A transregional Buddhist text therefore became material for specifically Korean philosophical work rather than a passive copy.',
      'Hwaeom accounts of interpenetration ask how phenomena can remain distinct while depending upon and disclosing a wider relational order. Uisang and Wonhyo followed different intellectual trajectories, so neither one term nor one founder exhausts Korean Buddhist philosophy.',
      'The luxurious cover records copying, patronage, devotion, and preservation as part of philosophical transmission. Its material beauty can prompt inquiry into the text’s later life, but argument and specialist history—not ornament alone—support claims about doctrinal classification and relational metaphysics.',
    ],
    sources: [
      collection('avatamsaka-bl', 'British Library via Wikimedia Commons — Korean Avataṃsaka Sūtra cover, Or. 7377', 'https://commons.wikimedia.org/wiki/File:Korean_sutra_covers_-_Avatamsaka_sutra_(c.1400)_-_BL_Or._7377.jpg'),
      academic('korean-buddhism-rep', 'Routledge Encyclopedia of Philosophy — Korean Buddhist Philosophy, Silla Hwaeom', 'https://www.rep.routledge.com/articles/overview/buddhist-philosophy-korean/v-1/sections/unified-silla-period-silla-hwaom-school'),
      academic('huayan-sep', 'Stanford Encyclopedia of Philosophy — Huayan Buddhism', 'https://plato.stanford.edu/entries/buddhism-huayan/'),
    ],
    paragraphSourceIds: [['avatamsaka-bl', 'korean-buddhism-rep'], ['korean-buddhism-rep', 'huayan-sep'], ['avatamsaka-bl', 'korean-buddhism-rep']],
    guide: ['Korean Hwaeom arguments', [
      ['Interpenetration', 'Phenomena can be distinct without being isolated because each arises and becomes intelligible through wider relations.', ['huayan-sep', 'korean-buddhism-rep']],
      ['Different Korean trajectories', 'Uisang’s lineage and diagrammatic teaching should not erase Wonhyo’s distinct harmonizing work.', ['korean-buddhism-rep']],
    ], 'The manuscript afterlife', [
      ['Gold on indigo', 'The cover makes later Korean copying, patronage, and devotional investment materially visible.', ['avatamsaka-bl']],
      ['Centuries later', 'The circa-1400 object cannot document seventh-century thinkers or serve as their personal manuscript.', ['avatamsaka-bl', 'korean-buddhism-rep']],
    ]],
    resolution: 'Resolved: verified British Library Or. 7377 as a Korean cover circa 1400, separated material reception from Uisang and Wonhyo, mapped Hwaeom claims to specialist sources, preserved CC0 attribution and natural proportions, and linked Buddhist Philosophy.', lock: 'fnv1a64:78ad52d0147174ba',
  },
  'eac-huineng-zen-reception': {
    plaqueTitle: 'Huineng with Geese and Myna',
    invitation: 'Unkoku Tōeki’s Japanese painting receives Huineng as Zen patriarch, showing how later communities remade Chan lineage memory, sudden-awakening rhetoric, and institutional authority across regions.',
    plaqueType: 'reception-or-transmission-history', canonicalContexts: [{kind: 'branch', id: 'buddhist-philosophy'}], articleTitle: 'Buddhist Philosophy',
    objectInterpretation: 'Unkoku Tōeki painted this Japanese triptych between about 1600 and 1644; the Metropolitan Museum holds it as 2021.398.14a–c. Nearly nine centuries separate it from Huineng, so the imagined patriarch documents Japanese Zen reception rather than a lifetime likeness.',
    context: [
      'Texts and stories associated with Huineng helped construct claims about legitimate transmission and awakening. The Platform Sūtra accumulated textual layers, making lineage history an argument performed by later communities rather than a neutral report of one founding scene.',
      'Sudden-awakening rhetoric did not abolish meditation, ethics, ritual, teacher relationships, or institutional discipline. Different Chan and Zen communities negotiated insight and training differently, so a memorable patriarchal image cannot define the practice of every school.',
      'The triptych preserves a name while changing the visual language and purposes through which that name is encountered. The image is therefore excellent evidence for reception and poor evidence for Huineng’s appearance, the earliest textual layer, or an unchanged Chinese package exported to Japan.',
    ],
    sources: [
      collection('huineng-met', 'The Metropolitan Museum of Art — Huineng with Geese and Myna', 'https://www.metmuseum.org/art/collection/search/853200'),
      academic('chan-sep', 'Stanford Encyclopedia of Philosophy — Chan Buddhism', 'https://plato.stanford.edu/entries/buddhism-chan/'),
      academic('platform-rep', 'Routledge Encyclopedia of Philosophy — Platform Sūtra', 'https://www.rep.routledge.com/articles/thematic/platform-sutra/v-1'),
    ],
    paragraphSourceIds: [['huineng-met', 'platform-rep'], ['chan-sep', 'platform-rep'], ['huineng-met', 'chan-sep']],
    guide: ['Lineage and awakening', [
      ['Constructed transmission', 'Patriarchal stories authorize teaching, but their literary and institutional formation must remain visible.', ['chan-sep', 'platform-rep']],
      ['Sudden and cultivated', 'Sudden-awakening language can coexist with long practice, ethical formation, ritual, and discipline.', ['chan-sep']],
    ], 'Reading Japanese Zen reception', [
      ['An imagined patriarch', 'The seventeenth-century painting cannot preserve Huineng’s historical appearance.', ['huineng-met']],
      ['Reception transforms', 'Japanese communities preserved Huineng’s name while changing media, institutions, and interpretive purposes.', ['huineng-met', 'chan-sep']],
    ]],
    resolution: 'Resolved: verified Unkoku Tōeki’s Metropolitan Museum triptych, replaced the misleading broad source label with Chan and Platform Sūtra scholarship, mapped lineage and reception claims, preserved public-domain attribution and natural proportions, and linked Buddhist Philosophy.', lock: 'fnv1a64:81bca550918a6680',
  },
  'eac-three-teachings': {
    plaqueTitle: 'One Circle of Harmony',
    invitation: 'This courtly composite pictures Confucian, Daoist, and Buddhist concord as a persuasive claim, inviting scrutiny of the disagreements, institutions, and unequal authority compressed into harmony.',
    plaqueType: 'concept-argument-diagram-or-method', canonicalContexts: [{kind: 'branch', id: 'chinese-philosophy'}, {kind: 'branch', id: 'daoism'}, {kind: 'branch', id: 'buddhist-philosophy'}], articleTitle: 'Chinese Philosophy',
    objectInterpretation: 'The Palace Museum painting is attributed to the Chenghua Emperor and dated to the fifteenth century. Its composite body visually fuses figures associated with the Three Teachings; attribution and court setting support a history of reception, not proof of the emperor’s private intention or timeless agreement.',
    context: [
      'The rounded figure makes concord perceptually immediate before a viewer asks what differences have been compressed. Such images can celebrate complementarity, manage rivalry, or support governance, but political purpose must be argued from historical context rather than read transparently from a smile.',
      'Confucian, Daoist, and Buddhist communities borrowed vocabulary, ritual forms, and institutional practices while also competing for patronage, office, authority, and legitimacy. Interaction, polemic, accommodation, and boundary maintenance can occur at the same time.',
      '“Three Teachings” is therefore a historically used relation among distinguishable traditions, not a claim that every doctrine or institution is identical. The object gives one formulation of harmony unusual visibility while the linked article restores plurality and contest around it.',
    ],
    sources: [
      collection('three-teachings-commons', 'Palace Museum via Wikimedia Commons — One Circle of Harmony', 'https://commons.wikimedia.org/wiki/File:%E4%B8%80%E5%9C%98%E5%92%8C%E6%B0%A3.jpg'),
      academic('three-teachings-oxford', 'Oxford Handbook of Confucianism — The Three Teachings', 'https://academic.oup.com/edited-volume/61799/chapter-abstract/546316892'),
      academic('chinese-philosophy-iep', 'Internet Encyclopedia of Philosophy — Chinese Philosophy', 'https://iep.utm.edu/chinese-philosophy-overview-of-topics/'),
    ],
    paragraphSourceIds: [['three-teachings-commons', 'three-teachings-oxford'], ['three-teachings-oxford', 'chinese-philosophy-iep'], ['three-teachings-commons', 'three-teachings-oxford']],
    guide: ['Composing the Three Teachings', [
      ['Composite figure', 'One rounded body invites viewers to experience unity before identifying which differences the image compresses.', ['three-teachings-commons']],
      ['Concord as a claim', 'Harmony is a historical argument about relations among traditions, not neutral evidence that they always agreed.', ['three-teachings-oxford']],
    ], 'Interaction without sameness', [
      ['Borrowing and rivalry', 'Communities could exchange practices and terms while competing for patronage, office, and authority.', ['three-teachings-oxford', 'chinese-philosophy-iep']],
      ['Courtly visibility', 'Attribution to an emperor gives this formulation political resonance without proving one transparent intention.', ['three-teachings-commons', 'three-teachings-oxford']],
    ]],
    resolution: 'Resolved: retained the cautious Chenghua attribution and Palace Museum holding, replaced an unrelated medicine source with Three Teachings scholarship, mapped concord and contest claims, preserved public-domain attribution and natural proportions, and linked Chinese Philosophy.', lock: 'fnv1a64:7b0ab8b5f0dfeba0',
  },
  'eac-water-land-stars': {
    plaqueTitle: 'Star Deities of the Northern and Central Dippers',
    invitation: 'These Daoist star deities belong to a 1454 Buddhist water-and-land ritual set, showing concrete liturgical borrowing without dissolving the institutions or purposes that repositioned them.',
    plaqueType: 'object-manuscript-site-or-archaeological-context', canonicalContexts: [{kind: 'branch', id: 'daoism'}, {kind: 'branch', id: 'buddhist-philosophy'}], articleTitle: 'Daoism',
    objectInterpretation: 'The Metropolitan Museum identifies this dated 1454 silk painting, accession 2012.525, as Daoist star deities from an imperially commissioned Buddhist water-and-land ritual set. The Oscar L. Tang Family gift and CC0 image record anchor one specific act of liturgical incorporation.',
    context: [
      'The northern and central dipper figures retain Daoist identities while taking a role inside an ordered Buddhist rite addressing many classes of beings. Placement changes what an image does, so borrowing is active adaptation rather than simple duplication or proof of doctrinal identity.',
      'Water-and-land ritual assembled paintings, offerings, recitation, officiants, cosmological classifications, and patrons into performed care. Imperial commission connected religious adaptation to political authority and resources without showing that every Buddhist or Daoist community accepted the same arrangement.',
      'This exact object provides unusually direct evidence of traditions meeting materially. It also disciplines generalization: porous boundaries can coexist with distinctive liturgies, offices, texts, and institutions, and one commissioned set cannot establish universal harmony across periods or regions.',
    ],
    sources: [
      collection('water-land-met', 'The Metropolitan Museum of Art — Daoist star deities from a Buddhist ritual set', 'https://www.metmuseum.org/art/collection/search/44698'),
      academic('water-land-harvard', 'Harvard University — Water-Land Ritual painting and liturgical context', 'https://dash.harvard.edu/bitstreams/0c253ead-b70f-44fa-a065-38340c2f9759/download'),
      academic('religious-daoism-sep', 'Stanford Encyclopedia of Philosophy — Religious Daoism', 'https://plato.stanford.edu/archives/sum2021/entries/daoism-religion/'),
    ],
    paragraphSourceIds: [['water-land-met', 'water-land-harvard'], ['water-land-harvard', 'religious-daoism-sep'], ['water-land-met', 'water-land-harvard']],
    guide: ['Inside a water-and-land rite', [
      ['Daoist deities, Buddhist sequence', 'The star gods keep recognizable identities while their ritual placement and function are reorganized.', ['water-land-met', 'water-land-harvard']],
      ['Imperial commission', 'Patronage joins religious adaptation to political resources without proving universal doctrinal agreement.', ['water-land-met']],
    ], 'What borrowing establishes', [
      ['Porous boundaries', 'Practitioners could recognize powers across traditions while maintaining distinctive offices and liturgies.', ['water-land-harvard', 'religious-daoism-sep']],
      ['One dated set', 'The 1454 object anchors a specific encounter and cannot represent every Buddhist or Daoist community.', ['water-land-met']],
    ]],
    resolution: 'Resolved: verified the Metropolitan Museum’s 1454 identity, imperial commission, accession, gift provenance, and rights, mapped ritual-borrowing claims, preserved institutional distinctions and natural proportions, and linked the current Daoism article.', lock: 'fnv1a64:8b7cb1a3e5639123',
  },
  'eac-korea-four-seven': {
    plaqueTitle: 'The Four–Seven Debate in Joseon Korea',
    invitation: 'A modern view of Dosan Seowon anchors the correspondence through which Yi Hwang, Ki Dae-seung, Yi I, and Seong Hon developed Korean arguments about emotion.',
    plaqueType: 'historical-event-or-institutional-context', canonicalContexts: [{kind: 'branch', id: 'confucianism'}], articleTitle: 'Confucianism',
    objectInterpretation: 'Julie photographed Jeongyodang teaching hall at Dosan Seowon in 2008 under CC BY-SA 2.0. The preserved and rebuilt academy grounds Yi Hwang’s Korean institutional afterlife; it is neither unchanged sixteenth-century fabric nor a diagram of the Four–Seven positions.',
    context: [
      'Correspondence beginning in 1559 between Yi Hwang and Ki Dae-seung asked how the Mencian Four Beginnings and the broader Seven Feelings relate to principle, vital force, embodied affect, and moral direction. Replies refined positions instead of merely repeating Zhu Xi.',
      'Yi I and Seong Hon later reorganized the dispute, producing multiple Korean formulations rather than one national answer. The exchange shows philosophical development through objection, revision, and inherited vocabulary inside a specific Joseon scholarly world.',
      'Dosan Seowon connected teaching, books, ritual commemoration, landscape, and local networks. The site prevents placeless “East Asian” presentation while its restoration history keeps architecture from being mistaken for direct proof of an argument about emotion.',
    ],
    sources: [
      collection('dosan-commons', 'Wikimedia Commons — Jeongyodang at Dosan Seowon', 'https://commons.wikimedia.org/wiki/File:Korea-Andong-Dosan_Seowon-Jeongyodang-01.jpg'),
      academic('korean-confucianism-sep', 'Stanford Encyclopedia of Philosophy — Korean Confucianism', 'https://plato.stanford.edu/entries/korean-confucianism/'),
      academic('confucianism-sep', 'Stanford Encyclopedia of Philosophy — Confucianism', 'https://plato.stanford.edu/entries/confucianism/'),
    ],
    paragraphSourceIds: [['dosan-commons', 'korean-confucianism-sep'], ['korean-confucianism-sep', 'confucianism-sep'], ['dosan-commons', 'korean-confucianism-sep']],
    guide: ['Terms of the Korean debate', [
      ['Four Beginnings', 'Mencian tendencies toward compassion, shame, deference, and discriminating judgment carry explicit moral direction.', ['korean-confucianism-sep']],
      ['Seven Feelings', 'A broader affective classification raises questions about how embodied emotion and moral normativity meet.', ['korean-confucianism-sep']],
    ], 'Philosophy through correspondence', [
      ['Toegye and Kobong', 'Yi Hwang and Ki Dae-seung revised formulations through sustained exchange rather than repeating a settled orthodoxy.', ['korean-confucianism-sep']],
      ['Later reorganization', 'Yi I and Seong Hon inherited and reshaped the terrain, preserving rival Joseon answers.', ['korean-confucianism-sep']],
    ]],
    resolution: 'Resolved: verified the licensed 2008 Dosan Seowon photograph, mapped Four–Seven chronology and positions to Korean specialist evidence, separated academy afterlife from doctrine, preserved natural proportions, and linked the current Confucianism article.', lock: 'fnv1a64:4455555c6b47b498',
  },
  'eac-yi-i-ojukheon': {
    plaqueTitle: 'Ojukheon and Yi I',
    invitation: 'This preserved Gangneung family site locates Yi I’s Korean afterlife while his analysis of principle, vital force, cultivation, and public responsibility remains grounded in texts.',
    plaqueType: 'historical-event-or-institutional-context', canonicalContexts: [{kind: 'branch', id: 'confucianism'}], articleTitle: 'Confucianism',
    objectInterpretation: 'DogilRobot photographed Ojukheon in 2024 and dedicated the image CC0. The tiled hall, bamboo, and courtyard document a preserved family and commemorative site associated with Yi I, not an unchanged lifetime view or material proof of his metaphysics.',
    context: [
      'Yi I, or Yulgok, treated principle as never concretely separate from configurations of vital force. Differences in clarity, habit, circumstance, and emotional activity therefore matter to moral formation without turning pattern into a detached second world.',
      'Cultivation reaches education, office, and public responsibility because institutions shape what agents can perceive and do. The exhibit keeps those practical stakes without making unsupported staffing, taxation, or defense details carry more precision than the registered specialist source establishes.',
      'Ojukheon supplies location, kinship, memory, preservation, and tourism to the reception history. Its specificity resists presenting Korean philosophy as a copy in an abstract region, while the object caution stops current architecture from illustrating a proposition about li and ki.',
    ],
    sources: [
      collection('ojukheon-commons', 'Wikimedia Commons — Ojukheon photograph', 'https://commons.wikimedia.org/wiki/File:Dogilrobot_ojukheon.jpg'),
      academic('korean-confucianism-sep', 'Stanford Encyclopedia of Philosophy — Korean Confucianism', 'https://plato.stanford.edu/entries/korean-confucianism/'),
      academic('confucianism-sep', 'Stanford Encyclopedia of Philosophy — Confucianism', 'https://plato.stanford.edu/entries/confucianism/'),
    ],
    paragraphSourceIds: [['ojukheon-commons', 'korean-confucianism-sep'], ['korean-confucianism-sep', 'confucianism-sep'], ['ojukheon-commons', 'korean-confucianism-sep']],
    guide: ['Yi I’s practical metaphysics', [
      ['Principle and vital force', 'Li is never encountered apart from concrete ki, so moral analysis attends to embodied configurations and change.', ['korean-confucianism-sep']],
      ['Cultivation and public life', 'Education and responsible action belong to the same practical field as self-correction.', ['korean-confucianism-sep', 'confucianism-sep']],
    ], 'Reading Ojukheon', [
      ['A family and memory site', 'The Gangneung complex locates Yi I within Korean kinship, education, and commemoration.', ['ojukheon-commons']],
      ['A modern photograph', 'The 2024 view cannot establish sixteenth-century fabric or illustrate a philosophical claim.', ['ojukheon-commons']],
    ]],
    resolution: 'Resolved: verified the 2024 CC0 photograph and limited it to site and reception evidence, mapped Yi I’s li-ki and cultivation claims, softened unsupported policy specifics, preserved natural proportions, and linked the current Confucianism article.', lock: 'fnv1a64:a98a1840fbbde4d5',
  },
  'eac-japan-hayashi': {
    plaqueTitle: 'Taiseiden at Yushima Seidō',
    invitation: 'The rebuilt hall marks the institutional afterlife of Hayashi Razan’s Tokugawa adaptation of Zhu Xi learning through service, curriculum, ritual, teaching, and continuing contest.',
    plaqueType: 'historical-event-or-institutional-context', canonicalContexts: [{kind: 'branch', id: 'confucianism'}], articleTitle: 'Confucianism',
    objectInterpretation: 'Ocdp photographed the present Taiseiden at Yushima Seidō in 2013 and dedicated the image CC0. Relocation, fire, earthquake, and rebuilding separate this hall from Razan’s lifetime; it records institutional memory rather than untouched seventeenth-century fabric.',
    context: [
      'Hayashi Razan adapted Zhu Xi learning to Tokugawa service, ritual, historical writing, education, and advice. His descendants helped turn scholarship and teaching into a durable institutional office whose authority depended on new Japanese political and pedagogical conditions.',
      'The private school moved to the Yushima site in 1690, after Razan’s death, and later Shōheizaka institutions amplified a curriculum. Institutional reach did not create consensus: Itō Jinsai, Ogyū Sorai, and other Japanese Confucians challenged its language, metaphysics, antiquity, and politics.',
      'The current building makes continuity visible as restoration and reinterpretation. Reading it alongside sources preserves a specifically Japanese history while refusing both the claim that Tokugawa Confucianism was only official ideology and the fantasy of an unchanged imported orthodoxy.',
    ],
    sources: [
      collection('yushima-commons', 'Wikimedia Commons — Taiseiden at Yushima Seidō', 'https://commons.wikimedia.org/wiki/File:Yushima_Seido_002.jpg'),
      academic('japanese-confucian-sep', 'Stanford Encyclopedia of Philosophy — Japanese Confucian Philosophy', 'https://plato.stanford.edu/archives/spr2017/entries/japanese-confucian/'),
      collection('yushima-tokyo-library', 'Tokyo Metropolitan Library — Yushima Seidō institutional history', 'https://www.library.metro.tokyo.lg.jp/portals/0/edo/tokyo_library/english/modal/index.html?d=5656'),
    ],
    paragraphSourceIds: [['yushima-commons', 'japanese-confucian-sep'], ['japanese-confucian-sep', 'yushima-tokyo-library'], ['yushima-commons', 'japanese-confucian-sep']],
    guide: ['From scholar to institution', [
      ['Hayashi Razan', 'Razan connected Zhu Xi interpretation to Tokugawa service, ritual, education, history, and advice.', ['japanese-confucian-sep']],
      ['A later Yushima center', 'The Hayashi school moved here in 1690, and later institutions expanded its public pedagogical role.', ['yushima-tokyo-library']],
    ], 'Authority and contest', [
      ['Institution is not consensus', 'Jinsai, Sorai, and others challenged the language, metaphysics, and politics of established Zhu Xi learning.', ['japanese-confucian-sep']],
      ['Rebuilt memory', 'The present Taiseiden records restoration and commemoration rather than untouched Tokugawa architecture.', ['yushima-commons', 'yushima-tokyo-library']],
    ]],
    resolution: 'Resolved: verified the 2013 CC0 photograph, sourced the 1690 institutional chronology, separated Razan from the present rebuilt hall, mapped Japanese disputes, preserved natural proportions, and linked the current Confucianism article.', lock: 'fnv1a64:97d5b393386709f8',
  },
  'eac-japan-ancient-learning': {
    plaqueTitle: 'Itō Jinsai and Ogyū Sorai’s Ancient Learning',
    invitation: 'Jinsai and Sorai both returned to ancient words while developing rival accounts of relational ethics, rites, music, institutions, and the authority of Zhu Xi learning.',
    plaqueType: 'paired-or-grouped-historical-figures', canonicalContexts: [{kind: 'branch', id: 'confucianism'}], articleTitle: 'Confucianism',
    objectInterpretation: 'Kyoto University’s rare-materials record preserves this portrait tradition for Itō Jinsai, but the Commons source establishes neither artist nor exact date. It is presented as a public-domain historical representation, not a secure lifetime likeness or an image of Ogyū Sorai.',
    context: [
      'Jinsai returned to the Analects and Mencius to emphasize ethical terms as lived within ordinary human feeling and relationship. Philology becomes philosophical when a different account of a word changes what human nature, conduct, and the Way can mean.',
      'Sorai also criticized established Zhu Xi readings but foregrounded ancient language, sage-kings, rites, music, and institutions. His Way is a humanly instituted ordering project, not simply Jinsai’s relational ethics or one shared doctrine called Ancient Learning.',
      'Kogaku names overlapping returns and critiques rather than a single school position. The Kogidō academy and Sorai’s Ken’en circle gave rival readings distinct communities, demonstrating Japanese philosophical production through selective inheritance, disagreement, and institution building.',
    ],
    sources: [
      collection('jinsai-portrait-commons', 'Kyoto University via Wikimedia Commons — portrait of Itō Jinsai', 'https://commons.wikimedia.org/wiki/File:%E4%BC%8A%E8%97%A4%E4%BB%81%E6%96%8E%E5%83%8F.jpg'),
      academic('japanese-confucian-sep', 'Stanford Encyclopedia of Philosophy — Japanese Confucian Philosophy', 'https://plato.stanford.edu/archives/spr2017/entries/japanese-confucian/'),
      academic('confucianism-sep', 'Stanford Encyclopedia of Philosophy — Confucianism', 'https://plato.stanford.edu/entries/confucianism/'),
    ],
    paragraphSourceIds: [['jinsai-portrait-commons', 'japanese-confucian-sep'], ['japanese-confucian-sep', 'confucianism-sep'], ['jinsai-portrait-commons', 'japanese-confucian-sep']],
    guide: ['Two returns to antiquity', [
      ['Itō Jinsai', 'Jinsai reads ethical language through ordinary feeling and relationship, especially in the Analects and Mencius.', ['japanese-confucian-sep']],
      ['Ogyū Sorai', 'Sorai emphasizes ancient language and a Way instituted through rites, music, and political order.', ['japanese-confucian-sep']],
    ], 'Why “Ancient Learning” is plural', [
      ['Philology as philosophy', 'Changing how a word is historically understood can redirect an account of persons, conduct, and society.', ['japanese-confucian-sep']],
      ['Distinct communities', 'Jinsai’s Kogidō and Sorai’s Ken’en circle carried rival readings rather than one uniform doctrine.', ['japanese-confucian-sep']],
    ]],
    resolution: 'Resolved: retained the public-domain Jinsai portrait only with its unknown artist and date explicit, mapped Jinsai and Sorai’s distinct positions, rejected a unitary Kogaku doctrine, preserved natural proportions, and linked the current Confucianism article.', lock: 'fnv1a64:b74d9ce28050a75a',
  },
  'eac-vietnam-le-quy-don': {
    plaqueTitle: 'Vân đài loại ngữ',
    invitation: 'This undated Hán-script manuscript witnesses Lê Quý Đôn’s Vietnamese classified discourse, where inherited texts, cosmology, history, institutions, geography, and observed knowledge enter one scholarly project.',
    plaqueType: 'work-or-text', canonicalContexts: [{kind: 'branch', id: 'confucianism'}], articleTitle: 'Confucianism',
    objectInterpretation: 'The Vietnamese Nôm Preservation Foundation catalog identifies this handwritten Hán-script copy at the National Library of Vietnam as NLVNPF-0996-01 / R.118. The copy is undated, measures 28 × 17 cm, and has incomplete third and fourth volumes; imaging occurred in 2009.',
    context: [
      'Lê Quý Đôn compiled Vân đài loại ngữ in 1773, organizing discourse across cosmology, geography, literature, history, institutions, and practical knowledge. Its range resists isolating moral cultivation from empirical observation, textual inheritance, and statecraft.',
      'Writing in Hán, or Classical Chinese, placed Vietnamese scholarship in a transregional textual field without erasing Vietnamese authorship, dynastic institutions, landscapes, archives, or political problems. The script is not chữ Nôm, and shared language does not determine community identity.',
      'The manuscript’s actual catalog replaces an unsupported museum attribution and keeps composition separate from copying. Missing volumes and an uncertain copy date turn preservation into part of the interpretation rather than inviting invented provenance or false material continuity.',
    ],
    sources: [
      collection('van-dai-nom', 'Vietnamese Nôm Preservation Foundation — Vân đài loại ngữ, NLVNPF-0996-01 / R.118', 'https://lib.nomfoundation.org/collection/1/volume/1132/'),
      academic('le-quy-don-hpu', 'Haiphong University Library — Vân đài loại ngữ bibliographic record', 'https://lib.hpu.edu.vn/jspui/handle/123456789/9743'),
      academic('le-quy-don-britannica', 'Encyclopaedia Britannica — Lê Quý Đôn', 'https://www.britannica.com/biography/Le-Quy-Don'),
    ],
    paragraphSourceIds: [['van-dai-nom', 'le-quy-don-hpu'], ['le-quy-don-hpu', 'le-quy-don-britannica'], ['van-dai-nom', 'le-quy-don-hpu']],
    guide: ['Reading the Vietnamese manuscript', [
      ['Hán script', 'The work uses literary Classical Chinese in a specifically Vietnamese scholarly setting; it is not written in chữ Nôm.', ['van-dai-nom']],
      ['An undated copy', 'The surviving manuscript’s copying date is unknown and must remain distinct from the work’s 1773 compilation.', ['van-dai-nom', 'le-quy-don-hpu']],
    ], 'Lê Quý Đôn’s classified discourse', [
      ['Knowledge in categories', 'Cosmology, geography, literature, history, institutions, and practical observation are organized within one wide inquiry.', ['le-quy-don-hpu', 'le-quy-don-britannica']],
      ['Local thought in a shared language', 'Transregional script did not erase Vietnamese authorship, archives, landscapes, or political questions.', ['le-quy-don-hpu']],
    ]],
    resolution: 'Resolved: corrected the holding to National Library of Vietnam NLVNPF-0996-01 / R.118, replaced invented copy provenance with the exact catalog, distinguished Hán script and 1773 composition from an undated incomplete copy, mapped claims, preserved rights and natural proportions, and linked Confucianism.', lock: 'fnv1a64:452585b39952591c',
  },
  'eac-modern-confucianism': {
    plaqueTitle: 'Kang Youwei and Modern Confucian Reconstructions',
    invitation: 'Kang Youwei’s 1905 portrait opens onto modern reconstructions in which reform, Buddhist philosophy, Kant, democracy, war, migration, and institutional rupture changed claims of Confucian continuity.',
    plaqueType: 'reception-or-transmission-history', canonicalContexts: [{kind: 'branch', id: 'confucianism'}], articleTitle: 'Confucianism',
    objectInterpretation: 'Elmer Chickering photographed Kang Youwei in 1905; the portrait was published in 1906 and is public domain. It supplies a strong lifetime likeness of one late-Qing reformer, not a group portrait or visual summary of Xiong Shili, Mou Zongsan, and every modern Confucian project.',
    context: [
      'Kang used contested accounts of classical texts and a future-oriented Confucius to support institutional reform. He is an important modern antecedent whose political and hermeneutic projects should not be made a simple member of every later movement called New Confucianism.',
      'Xiong Shili appropriated and criticized Buddhist philosophy while constructing a new metaphysics of reality, transformation, and moral subjectivity. Mou Zongsan worked across Confucian sources and Kantian questions about autonomy, moral knowledge, freedom, and political modernity.',
      'Empire, revolution, colonialism, war, migration, diaspora, and global philosophical exchange made continuity an argued reconstruction rather than passive survival. Later thinkers still dispute whether Confucian commitments support democracy, pluralism, and equality and who gets represented by the modern label.',
    ],
    sources: [
      collection('kang-portrait-commons', 'Wikimedia Commons — Elmer Chickering portrait of Kang Youwei', 'https://commons.wikimedia.org/wiki/File:Portrait_of_Kang_Youwei.jpg'),
      academic('modern-confucianism-sep', 'Stanford Encyclopedia of Philosophy — Modern Confucianism', 'https://plato.stanford.edu/entries/confucianism-modern/'),
      academic('kang-reform-routledge', 'Routledge — Kang Youwei’s Gongyang Confucianism and political reform', 'https://www.taylorfrancis.com/chapters/edit/10.4324/9781351289405-25/philosophical-hermeneutics-political-reform-study-kang-youwei-use-gongyang-confucianism-young-tsu-wong'),
    ],
    paragraphSourceIds: [['kang-portrait-commons', 'kang-reform-routledge'], ['modern-confucianism-sep', 'kang-reform-routledge'], ['modern-confucianism-sep', 'kang-portrait-commons']],
    guide: ['Three reconstruction projects', [
      ['Kang Youwei and reform', 'Kang’s contested classical history and future-oriented Confucius supported a radical late-Qing institutional program.', ['kang-reform-routledge']],
      ['Xiong Shili and Buddhism', 'Xiong appropriated and criticized Buddhist philosophy while building a new account of reality and moral subjectivity.', ['modern-confucianism-sep']],
      ['Mou Zongsan and Kant', 'Mou used Kantian problems to rethink moral knowledge, freedom, autonomy, and political modernity.', ['modern-confucianism-sep']],
    ], 'Continuity after rupture', [
      ['An argued inheritance', 'Modern continuity is constructed through disagreement under empire, revolution, war, migration, and global exchange.', ['modern-confucianism-sep']],
    ]],
    resolution: 'Resolved: verified Chickering’s 1905 lifetime photograph, limited it to Kang, distinguished Kang’s reform project from later New Confucianisms, mapped Xiong and Mou to specialist evidence, preserved public-domain rights and natural proportions, and linked Confucianism.', lock: 'fnv1a64:1c811a9a6131e2f7',
  },
};

const method = 'Gallery 07 supplemental review: exactly two non-overlapping GPT-5.6 Terra/High read-only evidence scopes of eight exhibits each were reconciled by the Sol parent across installed-object identity, interpretation, claim-level sourcing, attribution, date, institution, provenance, rights, accessibility, article relationship, routes, review locks, and desktop, mobile, and staged-3D presentation.';

const visitorGuide = (input: GuideInput): NonNullable<MuseumSupplementalExhibit['visitorGuide']> => [
  {heading: input[0], items: input[1].map(([label, description, sourceIds]) => ({label, description, sourceIds}))},
  {heading: input[2], items: input[3].map(([label, description, sourceIds]) => ({label, description, sourceIds}))},
];

export const reviewEastAsianSupplementalExhibit = (input: MuseumSupplementalExhibit): MuseumSupplementalExhibit => {
  const reviewed = evidence[input.id];
  if (!reviewed) throw new Error(`Missing Gallery 07 review evidence for ${input.id}.`);
  if (!input.presentation) throw new Error(`Missing Gallery 07 presentation for ${input.id}.`);
  return {
    ...input,
    sections: [
      {heading: '', paragraphs: [`${input.lead} ${reviewed.objectInterpretation} ${input.sections[0].paragraphs.join(' ')} ${reviewed.context[0]}`], sourceIds: reviewed.paragraphSourceIds[0]},
      {heading: '', paragraphs: [`${input.sections[1].paragraphs.join(' ')} ${reviewed.context[1]} ${input.keyIdeas.join(' ')}`], sourceIds: reviewed.paragraphSourceIds[1]},
      {heading: '', paragraphs: [`${input.sections[2].paragraphs.join(' ')} ${reviewed.context[2]} ${input.cautions.join(' ')}`], sourceIds: reviewed.paragraphSourceIds[2]},
    ],
    visitorGuide: visitorGuide(reviewed.guide),
    sources: reviewed.sources,
    objectInterpretation: reviewed.objectInterpretation,
    presentation: {
      ...input.presentation,
      panelKicker: 'Gallery 07 supplemental exhibit',
      articleActionLabel: `Read the full sourced ${reviewed.articleTitle} article`,
      exhibitLayout: 'object-led',
    },
    wallPlaque: {type: reviewed.plaqueType, title: reviewed.plaqueTitle, invitation: reviewed.invitation, canonicalContexts: reviewed.canonicalContexts},
    review: {
      status: 'standard-compliant', reviewedOn: '2026-08-12', method,
      resolution: reviewed.resolution, lock: reviewed.lock,
      visualReview: {
        desktop: {reviewedOn: '2026-08-12', viewport: '1440×900', evidence: `Direct route inspected with loaded full-composition object preview, three untitled paragraphs, subject-specific guide, sourced-article CTA, complete controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-07-supplementals/desktop/${input.id}.png`},
        mobile: {reviewedOn: '2026-08-12', viewport: '390×844', evidence: `Direct route inspected with wrapped title, loaded uncropped object preview, scrollable interpretation, sticky article and return controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-07-supplementals/mobile/${input.id}.png`},
        threeDimensional: {reviewedOn: '2026-08-12', viewport: '1280×720 fresh direct-route session', evidence: `Fresh direct-route session inspected after closing the detail view and resuming the live canvas: authored viewpoint, factual two-level plaque, distinct installation, working visit controls, and natural-ratio media mount. Evidence: docs/visual-validation/gallery-07-supplementals/staged-3d/${input.id}.png`},
      },
    },
  };
};
