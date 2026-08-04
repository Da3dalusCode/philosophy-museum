import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import {
  authorSupplementalExhibit,
  authorSupplementalLayout,
  type SupplementalExhibitAuthoring,
} from './museumSupplementalAuthoring';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from './museumWorldTypes';

export const EAST_ASIAN_GALLERY_ID = 'east-asian-continuities' as const;

export const EAST_ASIAN_PALETTE = Object.freeze({
  ink: '#182321',
  jade: '#4b806f',
  cinnabar: '#a54d42',
  indigo: '#425f7b',
  gold: '#b7944e',
  paper: '#e6ddc7',
});

export const EAST_ASIAN_ROOM_SIGN_COPY = {
  'east-song-ming-confucian': {
    kicker: 'Room 01 · Reconstruct the Way',
    title: 'Song–Ming Confucian reconstructions',
    subtitle: 'Texts, academies, metaphysics, cultivated inquiry, and rival accounts of the heart-mind.',
  },
  'east-buddhist-daoist-transmissions': {
    kicker: 'Room 02 · Translation changes traditions',
    title: 'Buddhist translation, Daoist institutions, and the Three Teachings',
    subtitle: 'Borrowing, rivalry, ritual, translation, and political claims—not timeless sameness.',
  },
  'east-regional-continuities-reserve': {
    kicker: 'Room 03 · Many local histories',
    title: 'Korea, Japan, Vietnam, and modern continuities',
    subtitle: 'Named debates, schools, institutions, reforms, and reconstructions across East Asian worlds.',
  },
} as const;

const image = (label: string, url: string) => ({label, url, kind: 'collection-record' as const});
const academic = (label: string, url: string) => ({label, url, kind: 'academic-reference' as const});
const songMing = academic(
  'Stanford Encyclopedia of Philosophy — Song-Ming Confucianism',
  'https://plato.stanford.edu/entries/song-ming-confucianism/',
);
const korean = academic(
  'Stanford Encyclopedia of Philosophy — Korean Confucianism',
  'https://plato.stanford.edu/entries/korean-confucianism/',
);
const japanese = academic(
  'Stanford Encyclopedia of Philosophy — Japanese Confucian Philosophy',
  'https://plato.stanford.edu/archives/spr2017/entries/japanese-confucian/',
);
const modern = academic(
  'Stanford Encyclopedia of Philosophy — Modern Confucianism',
  'https://plato.stanford.edu/entries/confucianism-modern/',
);
const chineseBuddhism = academic(
  'Stanford Encyclopedia of Philosophy — Chinese Buddhist Philosophy',
  'https://plato.stanford.edu/entries/buddhism-chan/',
);
const daoism = academic(
  'Stanford Encyclopedia of Philosophy — Daoism',
  'https://plato.stanford.edu/entries/daoism/',
);

const record = (input: Omit<SupplementalExhibitAuthoring, 'panelKicker'>): MuseumSupplementalExhibit =>
  authorSupplementalExhibit({...input, panelKicker: 'Gallery 11 work and context exhibit'});

export const EAST_ASIAN_SUPPLEMENTAL_EXHIBITS = [
  record({
    id: 'eac-zhu-four-books',
    assetId: 'zhu-xi-four-books-edition',
    displayName: 'Zhu Xi’s Four Books with Collected Commentaries',
    shortTitle: 'Zhu Xi: The Four Books',
    workLabel: 'ZHU XI · CURRICULUM AND COMMENTARY',
    dateLabel: 'Commentaries completed in the 12th century · displayed Qing court edition after a Southern Song model',
    question: 'How can editing and commentary reorganize an intellectual tradition?',
    frontSubtitle: 'Analects, Mencius, Great Learning, Doctrine of the Mean, examination, and interpretation',
    lead: 'Zhu Xi brought four earlier texts into a coordinated course of moral and philosophical study. His editions and commentaries did not merely preserve a canon: they supplied sequences, distinctions, and reading practices that later institutions and examinations amplified across East Asia.',
    keyIdeas: [
      'A curriculum is an argument about what should be read first and how the parts belong together.',
      'Commentary directs attention while leaving later readers room to dispute the inherited interpretation.',
      'State adoption increased Zhu Xi’s reach without making his interpretation uncontested.',
    ],
    cautions: [
      'The displayed object is a much later court edition, not Zhu Xi’s copy.',
      'The Four Books contain distinct voices and histories; Zhu’s synthesis should not erase them.',
    ],
    sections: [
      {heading: 'Four texts become one path', paragraph: 'Zhu arranged the Great Learning, Analects, Mencius, and Doctrine of the Mean as stages in learning. That pedagogical architecture changed the relative prominence of texts that had circulated long before him.'},
      {heading: 'Commentary makes philosophical choices', paragraph: 'Glosses on humaneness, principle, material force, emotion, and cultivation connect passages into a system. Readers encounter both an early text and a Song reconstruction of what it should mean.'},
      {heading: 'Institutions magnify interpretation', paragraph: 'The curriculum’s later place in education and examinations gave it extraordinary reach in China, Korea, Japan, and Vietnam, while regional scholars continued to adapt and criticize it.'},
    ],
    sources: [
      image('Wikimedia Commons — The Four Books with a Collection of Comments', 'https://commons.wikimedia.org/wiki/File:The_Four_Books,_with_a_Collection_of_Comments.jpg'),
      songMing,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'zhu-xi'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'eac-zhu-white-deer',
    assetId: 'white-deer-grotto-academy',
    displayName: 'Zhu Xi at White Deer Grotto Academy: Learning Becomes Institution',
    shortTitle: 'Zhu Xi: White Deer Grotto',
    workLabel: 'ZHU XI · ACADEMY AND RULES OF LEARNING',
    dateLabel: 'Academy revived under Zhu Xi in 1179 · modern photograph of the historic site',
    question: 'What architecture and routine does a philosophy of cultivation require?',
    frontSubtitle: 'Teaching, conduct, shared study, ritual, institutional memory, and the regulations of learning',
    lead: 'Zhu Xi’s revival of White Deer Grotto Academy and the regulations associated with it made learning a shared institutional practice. Reading, conduct, friendship, ritual, and correction were joined in a place whose later reputation traveled far beyond its local setting.',
    keyIdeas: [
      'Cultivation depends on repeated practices and social expectations, not private insight alone.',
      'Academies joined textual study to teacher–student relationships and local patronage.',
      'White Deer Grotto became a model through later reception rather than remaining unchanged from 1179.',
    ],
    cautions: [
      'The photograph shows a historic site repeatedly rebuilt, not intact Song fabric.',
      'One academy cannot stand for the full diversity of Song and later educational institutions.',
    ],
    sections: [
      {heading: 'A program occupies a place', paragraph: 'An academy supplies schedules, teachers, peers, archives, ritual spaces, and expectations of conduct. Zhu’s philosophical program became durable partly because it could be practiced through such arrangements.'},
      {heading: 'Rules connect study and character', paragraph: 'The White Deer Grotto learning regulations organize relationships and ethical duties around study. Knowledge is tested by the habits and responsibilities through which a learner lives.'},
      {heading: 'A site accumulates afterlives', paragraph: 'Later restorations and commemorations made the academy a symbol of Confucian learning. The present architecture therefore records reception as well as the memory of Zhu’s intervention. Its regulations circulated as a model well beyond the academy’s own valley.'},
    ],
    sources: [
      image('Wikimedia Commons — White Deer Grotto Academy', 'https://commons.wikimedia.org/wiki/File:White_Deer_Grotto_Academy.jpg'),
      songMing,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'zhu-xi'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'eac-wang-letters',
    assetId: 'wang-yangming-letters-zheng',
    displayName: 'Wang Yangming’s Letters to Zheng Bangrui: Philosophy in Practice',
    shortTitle: 'Wang Yangming: Letters in Practice',
    workLabel: 'WANG YANGMING · LETTERS AND MORAL JUDGMENT',
    dateLabel: 'Handscroll written about 1523–1525',
    question: 'How does a philosophy change when it is taught through counsel and correspondence?',
    frontSubtitle: 'Writing, administration, friendship, instruction, decision, and the unity of knowledge and action',
    lead: 'Wang Yangming’s calligraphic letters locate philosophy inside relationships and decisions. His account of innate moral knowing and the unity of knowledge and action was worked out through teaching, administration, correspondence, and reflection—not delivered as an isolated slogan.',
    keyIdeas: [
      'A letter responds to a particular person and situation while advancing a general claim.',
      'Knowing is morally significant when it changes attention, desire, and action.',
      'Calligraphy is material evidence of communication, not a transparent picture of an inner doctrine.',
    ],
    cautions: [
      'Do not reduce “unity of knowledge and action” to acting on any sincere impulse.',
      'The letters require historical context; they are not a timeless self-help manual.',
    ],
    sections: [
      {heading: 'Teaching is addressed', paragraph: 'Wang’s instruction often begins from a correspondent’s difficulty. That format makes ethical knowledge answerable to circumstances while still seeking standards that are not mere preference.'},
      {heading: 'Knowing already leans toward action', paragraph: 'For Wang, genuine recognition of the good includes an active orientation toward it. Failure to act can reveal that what looked like knowledge remained verbal or obstructed.'},
      {heading: 'Practice tests doctrine', paragraph: 'Administrative responsibilities and political conflict prevent the philosophy from floating free of institutions. They also generate enduring controversies over Wang’s own decisions and later uses of his teaching. His career makes moral judgment answerable to consequences as well as intention.'},
    ],
    sources: [
      image('Princeton University Art Museum — Letters to Zheng Bangrui', 'https://artmuseum.princeton.edu/art/collections/objects/32340'),
      songMing,
    ],
    articleRoute: {kind: 'philosopher', philosopherId: 'wang-yangming'},
    entityKind: 'philosopher',
  }),
  record({
    id: 'eac-taijitu-heartmind',
    assetId: 'zhou-dunyi-taijitu-reconstruction',
    displayName: 'Zhou Dunyi’s Taijitu and the Song–Ming Debate over Pattern and Heart-Mind',
    shortTitle: 'Pattern, Cosmos, and Heart-Mind',
    workLabel: 'SONG–MING CONFUCIAN DEBATE · MODERN DIAGRAM',
    dateLabel: 'Zhou Dunyi lived 1017–1073 · displayed diagram is a 2023 English reconstruction',
    question: 'How should cosmic order, material process, emotion, and moral awareness be related?',
    frontSubtitle: 'Supreme polarity, yin–yang, five phases, principle, material force, and the heart-mind',
    lead: 'Zhou Dunyi’s Explanation of the Diagram of the Supreme Polarity became a major resource for later Confucian cosmology. Zhu Xi placed it near the beginning of a genealogy of the Way, while Wang Yangming redirected attention toward the heart-mind’s active moral knowing.',
    keyIdeas: [
      'The diagram coordinates generative processes rather than picturing a static collection of things.',
      'Zhu Xi’s investigation of pattern includes texts, conduct, relationships, and events—not only external objects.',
      'Wang’s heart-mind emphasis is a reconstruction within Confucian debate, not a rejection of disciplined inquiry.',
    ],
    cautions: [
      'The English diagram is a modern reconstruction and must not be presented as a Song manuscript.',
      'Wang Yangming did not directly debate Zhou Dunyi; the exhibit compares later positions.',
    ],
    sections: [
      {heading: 'A diagram orders transformation', paragraph: 'The Taijitu links polarity, movement and stillness, yin and yang, the five phases, and the generation of beings. Its compact form invites commentary because each relation requires interpretation.'},
      {heading: 'Zhu Xi constructs a lineage', paragraph: 'Zhu treated Zhou as an important predecessor and integrated the diagram into a larger account of principle and material force. That lineage was itself an act of Song intellectual reconstruction.'},
      {heading: 'Wang changes the center of gravity', paragraph: 'Wang argues that principle is not discovered as a detached structure outside responsible awareness. The comparison reveals a genuine internal dispute while resisting the caricature “outer things versus pure inwardness.”'},
    ],
    sources: [
      image('Wikimedia Commons — Zhou Dunyi Taijitu English reconstruction', 'https://commons.wikimedia.org/wiki/File:Zhou_Dunyi_Taijitu_English.png'),
      songMing,
    ],
    articleRoute: {kind: 'branch', branchId: 'confucianism'},
    entityKind: 'branch',
  }),
  record({
    id: 'eac-xuanzang-translation',
    assetId: 'east-xuanzang-japanese-reception',
    displayName: 'Xuanzang’s Translation Legacy: Terms That Built East Asian Schools',
    shortTitle: 'Xuanzang: Translation Afterlives',
    workLabel: 'BUDDHIST TRANSLATION · SECONDARY RECEPTION',
    dateLabel: 'Xuanzang lived c. 602–664 · Japanese painting in a 14th-century style',
    question: 'How does translated vocabulary become material for new schools and arguments?',
    frontSubtitle: 'Sanskrit, Chinese, commentary, pilgrimage memory, Japanese reception, and scholastic classification',
    lead: 'Xuanzang’s translations and commentaries reshaped the vocabulary available to East Asian Buddhist thinkers. A later Japanese image shows that his legacy traveled through texts, institutions, pilgrimage memory, and visual commemoration rather than remaining an unchanged Chinese export.',
    keyIdeas: [
      'Translation choices stabilize distinctions that later philosophers can adopt or challenge.',
      'Commentary and classification produce new intellectual settings around a translated text.',
      'Japanese commemoration is reception evidence, not a portrait made from life.',
    ],
    cautions: [
      'Xuanzang remains a secondary transmission figure here; Gallery 05 retains Buddhist canonical primaries.',
      '“East Asian Buddhism” includes many schools and languages, not one unified doctrine.',
    ],
    sections: [
      {heading: 'Terminology builds an argument space', paragraph: 'Rendering technical Sanskrit concepts in Chinese required decisions about similarity, novelty, and consistency. Those terms became the working materials of later debate.'},
      {heading: 'Translations enter institutions', paragraph: 'Monasteries, catalogues, teachers, copyists, and state sponsorship shaped which texts circulated and how they were read. Transmission is therefore social and material as well as linguistic.'},
      {heading: 'A Japanese image marks another transformation', paragraph: 'The painting belongs to a later Japanese cult of Xuanzang and his attendant. It makes the reach of translation visible while warning against treating reception imagery as documentary biography. Faxiang and Japanese Hossō readers reorganized his textual legacy for their own scholastic settings.'},
    ],
    sources: [
      image('The Metropolitan Museum of Art — Portrait of Xuanzang with Attendant', 'https://commons.wikimedia.org/wiki/File:Portrait_of_Xuanzang_(Genj%C5%8D)_with_Attendant_MET_DP-15580-007.jpg'),
      chineseBuddhism,
    ],
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    entityKind: 'branch',
  }),
  record({
    id: 'eac-daoist-institutions',
    assetId: 'east-daoist-ritual-robe',
    displayName: 'Daoist Priesthoods: Canon, Ordination, and Ritual Worlds',
    shortTitle: 'Daoist Institutions and Ritual',
    workLabel: 'DAOIST COMMUNITIES · ORDINATION AND LITURGY',
    dateLabel: 'Chinese ritual robe dated 1820',
    question: 'What disappears when Daoism is reduced to two early philosophical books?',
    frontSubtitle: 'Priesthood, transmitted registers, canon, liturgy, patrons, temples, and ritual cosmology',
    lead: 'An embroidered Daoist priest’s robe makes institutional Daoism visible. Ordination lineages, transmitted registers, ritual offices, temples, patrons, and expanding canons developed over centuries alongside the early texts foregrounded in Gallery 06.',
    keyIdeas: [
      'Ritual garments locate authority in trained roles and transmitted institutions.',
      'Daoist canons preserve diverse revelations, liturgies, biographies, commentaries, and technical works.',
      'Institutional histories interact with Buddhism and Confucian governance without becoming identical to either.',
    ],
    cautions: [
      'The 1820 robe is not evidence for every Daoist community or period.',
      'Institutional Daoism should not be dismissed as a corruption of an allegedly pure philosophical origin.',
    ],
    sections: [
      {heading: 'A robe maps a ritual cosmos', paragraph: 'Images and emblems on vestments help position an officiant within a liturgical order. The object belongs to performed practice, not merely symbolic decoration.'},
      {heading: 'Lineage organizes transmission', paragraph: 'Registers, ordination, teachers, and ritual manuals establish who may perform particular rites. Authority is negotiated through institutions as well as through arguments in texts.'},
      {heading: 'The tradition keeps changing', paragraph: 'Daoist communities responded to Buddhist institutions, imperial regulation, local cults, warfare, print, and modern reform. Continuity consists partly in the ability to reorganize inherited resources. Celestial Masters, Lingbao, Shangqing, and Quanzhen developed different lineages, disciplines, revelations, and institutional forms rather than one uniform priesthood.'},
    ],
    sources: [
      image('The Metropolitan Museum of Art — Daoist priest’s robe', 'https://www.metmuseum.org/art/collection/search/69669'),
      daoism,
    ],
    articleRoute: {kind: 'branch', branchId: 'daoism'},
    entityKind: 'branch',
  }),
  record({
    id: 'eac-hwaeom-avatamsaka',
    assetId: 'east-hwaeom-avatamsaka-cover',
    displayName: 'The Avataṃsaka Sūtra in Korean Hwaeom: Uisang, Wonhyo, and Interpenetration',
    shortTitle: 'Korean Hwaeom and the Avataṃsaka',
    workLabel: 'KOREAN BUDDHISM · HWAEOM RECONSTRUCTION',
    dateLabel: 'Korean manuscript cover, about 1400 · traditions shaped from the 7th century onward',
    question: 'How did a translated scripture become a specifically Korean field of interpretation?',
    frontSubtitle: 'Uisang, Wonhyo, doctrinal classification, interpenetration, manuscript art, and institutions',
    lead: 'Korean Hwaeom thinkers such as Uisang and Wonhyo interpreted the Avataṃsaka Sūtra through local monastic networks, doctrinal classifications, ritual, and political settings. The ornate manuscript cover marks a Korean material afterlife rather than a passive copy of a Chinese school.',
    keyIdeas: [
      'Interpenetration asks how phenomena can be distinct without being isolated.',
      'Uisang and Wonhyo developed different intellectual and institutional trajectories.',
      'Manuscript production is part of a text’s philosophical history.',
    ],
    cautions: [
      'The c. 1400 cover postdates Uisang and Wonhyo by many centuries.',
      'Hwaeom does not exhaust Korean Buddhist philosophy.',
    ],
    sections: [
      {heading: 'A scripture becomes a field', paragraph: 'Translation made the Avataṃsaka available, but commentaries, diagrams, teaching lineages, and classification systems determined which questions it generated in Korea.'},
      {heading: 'Interpenetration resists isolated things', paragraph: 'Hwaeom accounts explore how each phenomenon depends upon and can disclose a wider relational order. The claim is not that all differences simply vanish.'},
      {heading: 'A Korean object records continuity', paragraph: 'The cover’s materials and design belong to later Korean manuscript culture. It witnesses continued investment in the scripture while keeping the early thinkers and the surviving object historically distinct. Uisang’s diagrammatic teaching and Wonhyo’s harmonizing analyses also show that Korean Hwaeom contained more than one method.'},
    ],
    sources: [
      image('Wikimedia Commons — Korean Avataṃsaka Sūtra cover', 'https://commons.wikimedia.org/wiki/File:Korean_sutra_covers_-_Avatamsaka_sutra_(c.1400)_-_BL_Or._7377.jpg'),
      academic('Encyclopaedia Britannica — Hwaom', 'https://www.britannica.com/topic/Hwaom'),
    ],
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    entityKind: 'branch',
  }),
  record({
    id: 'eac-huineng-zen-reception',
    assetId: 'east-huineng-japanese-reception',
    displayName: 'Huineng’s Chan Lineage in Japanese Zen Reception',
    shortTitle: 'Huineng in Japanese Reception',
    workLabel: 'CHAN / ZEN · LINEAGE RECONSTRUCTION',
    dateLabel: 'Japanese painting by Unkoku Tōeki, about 1600–1644',
    question: 'How does a lineage story authorize later practice?',
    frontSubtitle: 'Platform Sūtra, sudden awakening, patriarchal memory, painting, institution, and adaptation',
    lead: 'A Japanese painting of Huineng shows Chan patriarchal memory being remade within Zen reception. The Platform Sūtra, stories of transmission, meditation practices, and institutional lineages changed across regions; they were never an unchanged package exported from China.',
    keyIdeas: [
      'Lineage narratives connect authority to remembered teachers and texts.',
      'Sudden awakening did not eliminate training, ritual, or institutional discipline.',
      'Visual reception can reveal what a later community valued in an inherited figure.',
    ],
    cautions: [
      'The painting was made nearly a millennium after Huineng and is not a likeness.',
      'Chan and Zen include competing schools, practices, and histories.',
    ],
    sections: [
      {heading: 'A patriarch is constructed through texts', paragraph: 'Accounts of Huineng helped define claims about transmission and awakening. Their literary formation matters because lineage history is also an argument about legitimate teaching. The Platform Sūtra itself accumulated textual layers as communities retold the authority of the sixth patriarch.'},
      {heading: 'Sudden does not mean effortless', paragraph: 'Rhetoric of sudden awakening can coexist with long discipline, ritual, ethical formation, and institutional routine. Later schools negotiated that relation differently.'},
      {heading: 'Japan receives by transforming', paragraph: 'Unkoku Tōeki’s painting places Huineng inside a Japanese visual and monastic world. Reception preserves a name while changing the media and purposes through which it is encountered.'},
    ],
    sources: [
      image('The Metropolitan Museum of Art — Huineng with Geese and Myna', 'https://commons.wikimedia.org/wiki/File:Unkoku_T%C5%8Deki_%E9%9B%B2%E8%B0%B7%E7%AD%89%E7%9B%8A_-_Huineng,_the_Sixth_Patriarch_of_Zen,_with_Geese_and_Myna_-_2021.398.14a%E2%80%93c_-_Metropolitan_Museum_of_Art.jpg'),
      chineseBuddhism,
    ],
    articleRoute: {kind: 'branch', branchId: 'buddhist-philosophy'},
    entityKind: 'branch',
  }),
  record({
    id: 'eac-three-teachings',
    assetId: 'east-three-teachings-painting',
    displayName: 'The Three Teachings: Chenghua’s Harmony as a Political Claim',
    shortTitle: 'The Three Teachings: Claimed Harmony',
    workLabel: 'CONFUCIAN, DAOIST, BUDDHIST INTERACTION',
    dateLabel: 'Painting attributed to the Chenghua Emperor, 15th century',
    question: 'Who benefits when distinct teachings are pictured as one harmonious circle?',
    frontSubtitle: 'Concord, competition, court politics, composite figures, polemic, and unequal authority',
    lead: 'The composite figure called One Circle of Harmony stages Confucian, Daoist, and Buddhist concord as a persuasive image. Harmony was an argument made in particular political settings, not proof that three traditions always taught the same thing.',
    keyIdeas: [
      'Images of concord can manage rivalry as much as they celebrate agreement.',
      'Communities borrowed practices and vocabulary while maintaining institutional boundaries.',
      'Court patronage gave some formulations of harmony more visibility and force than others.',
    ],
    cautions: [
      'Do not translate “Three Teachings” into a timeless claim that all religions are identical.',
      'The named historical figures in harmony stories often lived in different contexts from the image.',
    ],
    sections: [
      {heading: 'Concord is composed', paragraph: 'The rounded body fuses recognizable associations into a single visual whole. That formal success invites viewers to experience unity before asking what disagreements have been compressed.'},
      {heading: 'Interaction includes conflict', paragraph: 'Buddhist, Daoist, and Confucian actors competed for patronage, offices, ritual authority, and public legitimacy. Borrowing and polemic can occur at the same time.'},
      {heading: 'A court image makes a claim', paragraph: 'An imperial context changes the stakes of harmony. Presenting traditions as complementary can support governance, regulate difference, and elevate one political vision of order. The picture’s seamless circle is therefore an achievement of persuasion, not neutral evidence of consensus.'},
    ],
    sources: [
      image('Wikimedia Commons — One Circle of Harmony', 'https://commons.wikimedia.org/wiki/File:%E4%B8%80%E5%9C%98%E5%92%8C%E6%B0%A3.jpg'),
      academic('Stanford Encyclopedia of Philosophy — Chinese Philosophy and Chinese Medicine', 'https://plato.stanford.edu/entries/chinese-phil-medicine/'),
    ],
    articleRoute: {kind: 'branch', branchId: 'chinese-philosophy'},
    entityKind: 'branch',
  }),
  record({
    id: 'eac-water-land-stars',
    assetId: 'east-water-land-star-deities',
    displayName: 'Buddhist Water-and-Land Rituals with Daoist Star Deities',
    shortTitle: 'Borrowed Gods, Reworked Ritual',
    workLabel: 'BUDDHIST RITUAL · DAOIST STAR DEITIES',
    dateLabel: 'Chinese painting dated 1454 from an imperially commissioned ritual set',
    question: 'What does direct material borrowing reveal that a story of separate traditions conceals?',
    frontSubtitle: 'Water-and-land ritual, star deities, imperial commission, liturgical adaptation, and porous boundaries',
    lead: 'The Metropolitan Museum identifies these Daoist star gods as part of a Buddhist water-and-land ritual set. The object is direct evidence that institutions could borrow and reposition divine figures while preserving distinctive liturgical purposes.',
    keyIdeas: [
      'Borrowing changes meaning by placing an image inside a new ritual sequence.',
      'Imperial commission links religious adaptation to resources and political authority.',
      'Porous boundaries do not make Buddhist and Daoist institutions interchangeable.',
    ],
    cautions: [
      'One commissioned set cannot establish universal harmony between traditions.',
      'The figures should be identified as Daoist star deities functioning in a Buddhist ritual context.',
    ],
    sections: [
      {heading: 'Context changes a deity’s work', paragraph: 'A figure may retain a name and iconography while taking on a new role inside another institution’s ritual. That is adaptation, not simple duplication.'},
      {heading: 'Ritual assembles a world', paragraph: 'Water-and-land rites address multiple classes of beings through ordered images, offerings, recitations, and officiants. The set turns cosmological classification into performed care.'},
      {heading: 'Institutions meet without disappearing', paragraph: 'The painting documents a braided history in which practitioners recognized useful powers across boundaries. It also shows why interaction should not be narrated as absorption into one generic “Asian religion.” The set’s dated imperial commission lets this exchange be located in a specific ritual and political program.'},
    ],
    sources: [
      image('The Metropolitan Museum of Art — Daoist star deities from a water-and-land ritual set', 'https://www.metmuseum.org/art/collection/search/44698'),
      daoism,
    ],
    articleRoute: {kind: 'branch', branchId: 'daoism'},
    entityKind: 'branch',
  }),
  record({
    id: 'eac-korea-four-seven',
    assetId: 'dosan-seowon-academy',
    displayName: 'Joseon Korea: Yi Hwang, Ki Dae-seung, Yi I, and the Four–Seven Debate',
    shortTitle: 'Joseon Korea: The Four–Seven Debate',
    workLabel: 'KOREAN CONFUCIAN PHILOSOPHY · EMOTION AND NORMATIVITY',
    dateLabel: 'Debate began in correspondence in 1559 · Dosan Seowon teaching hall photographed in 2008',
    question: 'How do principle, vital force, emotion, and moral normativity meet in one response?',
    frontSubtitle: 'Yi Hwang, Ki Dae-seung, Yi I, Seong Hon, correspondence, academies, and moral psychology',
    lead: 'The Four–Seven Debate began in letters between Yi Hwang and Ki Dae-seung and continued through Yi I and Seong Hon. It developed distinct Korean arguments about emotions, principle, vital force, and the sources of moral normativity.',
    keyIdeas: [
      'The “four beginnings” and “seven emotions” name different inherited classifications of affect.',
      'Correspondence made disagreement iterative: replies refined positions rather than merely repeating Zhu Xi.',
      'Academies such as Dosan gave Korean scholarship its own institutional geography.',
    ],
    cautions: [
      'Do not call Joseon thought a passive Korean copy of Chinese Neo-Confucianism.',
      'The present Dosan architecture records later preservation and rebuilding as well as Yi Hwang’s legacy.',
    ],
    sections: [
      {heading: 'An inherited vocabulary generates a new dispute', paragraph: 'Mencian moral beginnings and the broader seven emotions raised a problem about how normative direction appears within embodied affect. Korean correspondents developed unusually fine-grained answers.'},
      {heading: 'Letters make philosophy collaborative', paragraph: 'Yi Hwang and Ki Dae-seung revised formulations across years of exchange. Yi I and Seong Hon later reorganized the terrain, making the debate a continuing Korean conversation. Later scholars inherited rival formulations rather than a single settled Joseon answer.'},
      {heading: 'An academy anchors a regional world', paragraph: 'Dosan Seowon connected teaching, ritual commemoration, landscape, books, and local networks. The site makes Korean institutional formation visible instead of using a generic “East Asian” setting.'},
    ],
    sources: [
      image('Wikimedia Commons — Dosan Seowon Jeongyodang teaching hall', 'https://commons.wikimedia.org/wiki/File:Korea-Andong-Dosan_Seowon-Jeongyodang-01.jpg'),
      korean,
    ],
    articleRoute: {kind: 'branch', branchId: 'confucianism'},
    entityKind: 'branch',
  }),
  record({
    id: 'eac-yi-i-ojukheon',
    assetId: 'yi-i-ojukheon',
    displayName: 'Yi I at Ojukheon: Qi, Statecraft, and Reform',
    shortTitle: 'Yi I: Cultivation and Statecraft',
    workLabel: 'YI I / YULGOK · KOREAN CONFUCIANISM',
    dateLabel: 'Yi I lived 1536–1584 · modern photograph of his historic family site',
    question: 'How should metaphysical analysis change institutions and public action?',
    frontSubtitle: 'Vital force, principle, moral psychology, education, defense, reform, and Korean statecraft',
    lead: 'Yi I, known as Yulgok, gave vital force a central role in moral psychology and connected cultivation to education, administration, defense, and institutional reform. Ojukheon grounds this work in a specific Korean family and intellectual setting.',
    keyIdeas: [
      'Principle is never encountered apart from concrete configurations of vital force.',
      'Self-cultivation and statecraft belong to one practical field.',
      'Reform requires diagnosis of institutions, resources, and habits—not metaphysics alone.',
    ],
    cautions: [
      'Ojukheon is a historic family site, not an illustration of a philosophical proposition.',
      'Yi I’s position should not be collapsed into either Zhu Xi’s or Yi Hwang’s.',
    ],
    sections: [
      {heading: 'Qi makes moral life concrete', paragraph: 'Yi I treats vital force as the active configuration through which principle is expressed. Differences in clarity, habit, and circumstance therefore matter for ethical formation.'},
      {heading: 'Cultivation reaches public institutions', paragraph: 'Education, offices, military preparedness, and economic conditions become philosophical concerns because they shape what agents can perceive and do. Yi I’s reform memorials connected moral purpose to staffing, taxation, defense, and the practical timing of change.'},
      {heading: 'A family site resists placeless history', paragraph: 'Ojukheon ties Yi I to Gangneung, kinship, education, and commemoration. The image gives Korean thought a location without pretending the surviving buildings are unchanged sixteenth-century evidence.'},
    ],
    sources: [
      image('Wikimedia Commons — Ojukheon', 'https://commons.wikimedia.org/wiki/File:Dogilrobot_ojukheon.jpg'),
      korean,
    ],
    articleRoute: {kind: 'branch', branchId: 'confucianism'},
    entityKind: 'branch',
  }),
  record({
    id: 'eac-japan-hayashi',
    assetId: 'hayashi-yushima-seido',
    displayName: 'Tokugawa Japan: Hayashi Razan and the Institutions of Zhu Xi Learning',
    shortTitle: 'Hayashi Razan and Tokugawa Learning',
    workLabel: 'JAPANESE CONFUCIANISM · EDUCATIONAL INSTITUTIONS',
    dateLabel: 'Hayashi Razan lived 1583–1657 · present Yushima Seidō photographed in 2013',
    question: 'How does a philosophical interpretation become a Tokugawa educational institution?',
    frontSubtitle: 'Hayashi Razan, bakufu service, ritual, curriculum, Yushima, and institutional adaptation',
    lead: 'Hayashi Razan adapted Zhu Xi learning to Tokugawa service, ritual, education, and political order. The Hayashi school and the later Yushima/Shōheizaka institutions gave that interpretation a specifically Japanese public and pedagogical life.',
    keyIdeas: [
      'Adoption changes a teaching by attaching it to new offices and institutions.',
      'Razan’s political uses of Zhu Xi learning were contested by other Japanese Confucians.',
      'Yushima’s present architecture marks institutional memory after fires and reconstruction.',
    ],
    cautions: [
      'The current Taiseiden is not untouched seventeenth-century fabric.',
      'Tokugawa Confucian philosophy cannot be reduced to official ideology.',
    ],
    sections: [
      {heading: 'A scholar enters government service', paragraph: 'Razan’s scholarship connected classical interpretation to ceremony, historical writing, education, and advice. Those roles changed what Confucian learning could do in Tokugawa public life. Hayashi descendants converted service and teaching into a durable scholarly office whose authority was repeatedly negotiated.'},
      {heading: 'Institution does not mean consensus', paragraph: 'State-linked schools magnified one curriculum, but Itō Jinsai, Ogyū Sorai, and others challenged its language, metaphysics, and account of antiquity.'},
      {heading: 'The site is an afterlife', paragraph: 'Yushima Seidō became a durable symbol of Confucian education through repeated rebuilding. Its survival shows institutional continuity as restoration and reinterpretation rather than frozen origin. The present hall should therefore be read as institutional memory, not untouched Tokugawa evidence.'},
    ],
    sources: [
      image('Wikimedia Commons — Yushima Seidō Taiseiden', 'https://commons.wikimedia.org/wiki/File:Yushima_Seido_002.jpg'),
      japanese,
    ],
    articleRoute: {kind: 'branch', branchId: 'confucianism'},
    entityKind: 'branch',
  }),
  record({
    id: 'eac-japan-ancient-learning',
    assetId: 'ito-jinsai-portrait',
    displayName: 'Itō Jinsai and Ogyū Sorai: Ancient Learning Reopens the Classics',
    shortTitle: 'Japanese Ancient Learning',
    workLabel: 'ITŌ JINSAI AND OGYŪ SORAI · KOGAKU',
    dateLabel: 'Itō Jinsai, 1627–1705 · Ogyū Sorai, 1666–1728 · later portrait tradition',
    question: 'Can returning to older words overturn an established orthodoxy?',
    frontSubtitle: 'Analects, Mencius, ancient language, rites, music, institutions, and critique of Zhu Xi learning',
    lead: 'Itō Jinsai and Ogyū Sorai both turned toward ancient texts while disagreeing about what that return required. Jinsai foregrounded relational ethical language; Sorai emphasized ancient language, rites, music, and institutions. Neither was a passive Japanese copy of Zhu Xi.',
    keyIdeas: [
      'Philology can be philosophical when changing a word changes an account of human life.',
      'Jinsai emphasizes ordinary relational feeling and conduct in the Analects and Mencius.',
      'Sorai treats the Way as a humanly instituted order of rites and music rather than a timeless metaphysical pattern.',
    ],
    cautions: [
      '“Ancient Learning” names overlapping critiques, not a single doctrine.',
      'The portrait is a later historical representation, not a lifetime photograph.',
    ],
    sections: [
      {heading: 'Jinsai returns to relational language', paragraph: 'Jinsai challenges abstract readings by attending to how ethical terms work in ordinary human relationships. The classics disclose a lived way before they become a metaphysical system.'},
      {heading: 'Sorai returns to institutions', paragraph: 'Sorai’s study of ancient language supports a political account of rites, music, and sage-kings. The Way is made effective through institutions that order conduct and feeling.'},
      {heading: 'A Japanese debate redirects an inheritance', paragraph: 'Both thinkers engage Chinese texts through Tokugawa educational and political conditions. Their disagreements demonstrate regional philosophical production, not one-way influence. Jinsai’s Kogidō academy and Sorai’s Ken’en circle gave their rival readings distinct communities of study and transmission.'},
    ],
    sources: [
      image('Wikimedia Commons — portrait of Itō Jinsai', 'https://commons.wikimedia.org/wiki/File:%E4%BC%8A%E8%97%A4%E4%BB%81%E6%96%8E%E5%83%8F.jpg'),
      japanese,
    ],
    articleRoute: {kind: 'branch', branchId: 'confucianism'},
    entityKind: 'branch',
  }),
  record({
    id: 'eac-vietnam-le-quy-don',
    assetId: 'le-quy-don-van-dai',
    displayName: 'Vietnamese Confucian Worlds: Chu Văn An and Lê Quý Đôn’s Vân đài loại ngữ',
    shortTitle: 'Vietnamese Learning and Statecraft',
    workLabel: 'ĐẠI VIỆT / VIETNAM · TEACHING, REMONSTRANCE, AND CLASSIFICATION',
    dateLabel: 'Chu Văn An, 1292–1370 · Lê Quý Đôn, 1726–1784 · work compiled 1772–1773',
    question: 'How were classical learning, political duty, and local knowledge reconstructed in Vietnam?',
    frontSubtitle: 'Chu Văn An, Lê Quý Đôn, Hán learning, remonstrance, history, statecraft, and encyclopedic inquiry',
    lead: 'Chu Văn An became a model of teaching and principled remonstrance in Đại Việt. Centuries later, Lê Quý Đôn organized philosophy, history, statecraft, and observed knowledge in Vân đài loại ngữ, a work written in Hán/Classical Chinese within a specifically Vietnamese intellectual world.',
    keyIdeas: [
      'Shared written Classical Chinese did not erase Vietnamese institutions, politics, or authorship.',
      'Remonstrance ties scholarly integrity to the risks of public office.',
      'Lê Quý Đôn’s classificatory work joins textual inheritance to historical and local inquiry.',
    ],
    cautions: [
      'Do not label the displayed Vân đài loại ngữ manuscript as chữ Nôm.',
      'Vietnamese Confucian history includes disagreement, Buddhism, local traditions, colonial rupture, and modern change.',
    ],
    sections: [
      {heading: 'Chu Văn An makes teaching political', paragraph: 'Traditions surrounding Chu Văn An connect education to the duty to remonstrate against corrupt power. His memory became an argument about scholarly responsibility in Vietnamese public life.'},
      {heading: 'Lê Quý Đôn classifies a world', paragraph: 'Vân đài loại ngữ assembles cosmology, geography, literature, institutions, and practical knowledge. Its range shows that Confucian scholarship did not isolate moral theory from empirical and historical inquiry.'},
      {heading: 'A shared script carries local thought', paragraph: 'Writing in Hán placed Vietnamese scholars in a transregional textual world while they addressed Vietnamese dynasties, landscapes, archives, and political problems. Language does not determine community identity.'},
    ],
    sources: [
      image('Wikimedia Commons — Lê Quý Đôn, Vân đài loại ngữ', 'https://commons.wikimedia.org/wiki/File:V%C3%A2n_%C4%91%C3%A0i_lo%E1%BA%A1i_ng%E1%BB%AF_(q.01)-0996-01-001.jpg'),
      academic('Encyclopaedia Britannica — Le Quy Don', 'https://www.britannica.com/biography/Le-Quy-Don'),
    ],
    articleRoute: {kind: 'branch', branchId: 'confucianism'},
    entityKind: 'branch',
  }),
  record({
    id: 'eac-modern-confucianism',
    assetId: 'kang-youwei-1905',
    displayName: 'Modern Reconstructions: Kang Youwei, Xiong Shili, Mou Zongsan, and New Confucianism',
    shortTitle: 'Modern Confucian Reconstructions',
    workLabel: 'REFORM, METAPHYSICS, DEMOCRACY, AND GLOBAL PHILOSOPHY',
    dateLabel: 'Kang Youwei, 1858–1927 · Xiong Shili, 1885–1968 · Mou Zongsan, 1909–1995',
    question: 'How can a tradition survive rupture without pretending that nothing changed?',
    frontSubtitle: 'Political reform, Buddhist engagement, Kant, moral autonomy, democracy, diaspora, and present debate',
    lead: 'Modern Confucian thinkers reconstructed the tradition under empire, republican revolution, colonialism, war, migration, and global philosophical exchange. Kang Youwei recast Confucius for reform; Xiong Shili rebuilt metaphysics through Buddhist engagement; Mou Zongsan confronted Kant, autonomy, and democracy.',
    keyIdeas: [
      'Modern continuity is an argued reconstruction, not the passive survival of an unchanged essence.',
      'Buddhist and European philosophical resources become partners and targets in new systems.',
      'Confucian philosophy continues across present-day East Asia, diasporas, and global scholarship.',
    ],
    cautions: [
      '“New Confucianism” contains major disagreements and does not represent every modern Confucian voice.',
      'Kang’s political projects and uses of Confucius remain historically contested.',
    ],
    sections: [
      {heading: 'Kang makes the canon reformist', paragraph: 'Kang Youwei used contested textual histories and a future-oriented image of Confucius to support institutional transformation. His work shows that appeals to antiquity can generate radical modern programs.'},
      {heading: 'Xiong rebuilds metaphysics through encounter', paragraph: 'Xiong Shili appropriated and criticized Buddhist philosophy to formulate an account of reality, transformation, and moral subjectivity. Interaction produced a new system rather than a return to Song orthodoxy.'},
      {heading: 'Mou argues across Kant and Confucianism', paragraph: 'Mou Zongsan used Kantian questions to rethink moral knowledge, freedom, and political modernity. Later thinkers continue to dispute whether and how Confucian commitments support democracy, pluralism, and equality.'},
    ],
    sources: [
      image('Wikimedia Commons — portrait of Kang Youwei', 'https://commons.wikimedia.org/wiki/File:Portrait_of_Kang_Youwei.jpg'),
      modern,
    ],
    articleRoute: {kind: 'branch', branchId: 'confucianism'},
    entityKind: 'branch',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];

/**
 * Three rooms × six wall faces = eighteen physical installations.
 * Zhu Xi and Wang Yangming occupy two equal outer primaries in Room 01.
 * These sixteen layouts fill every remaining wall; no doorway exception is
 * claimed because both live gallery portals sit in central north/south aisles.
 */
export const EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  // Room 01: two canonical primaries and four return-wall works.
  authorSupplementalLayout({id: 'eac-zhu-four-books', parentExhibitId: 'zhu-xi', zoneId: 'east-song-ming-confucian', position: {x: -5.55, z: -26.88}, rotationY: 0, assetId: 'zhu-xi-four-books-edition', mediaWidth: 3.25, mediaHeight: 2.75, installationKind: 'east-asian-work', accent: EAST_ASIAN_PALETTE.gold}),
  authorSupplementalLayout({id: 'eac-wang-letters', parentExhibitId: 'wang-yangming', zoneId: 'east-song-ming-confucian', position: {x: 5.55, z: -26.88}, rotationY: 0, assetId: 'wang-yangming-letters-zheng', mediaWidth: 3.3, mediaHeight: 2.55, installationKind: 'east-asian-work', accent: EAST_ASIAN_PALETTE.cinnabar}),
  authorSupplementalLayout({id: 'eac-zhu-white-deer', parentExhibitId: 'zhu-xi', zoneId: 'east-song-ming-confucian', position: {x: -5.55, z: -10.4533}, rotationY: Math.PI, assetId: 'white-deer-grotto-academy', mediaWidth: 3.3, mediaHeight: 2.55, installationKind: 'east-asian-context', accent: EAST_ASIAN_PALETTE.jade}),
  authorSupplementalLayout({id: 'eac-taijitu-heartmind', parentExhibitId: 'wang-yangming', zoneId: 'east-song-ming-confucian', position: {x: 5.55, z: -10.4533}, rotationY: Math.PI, assetId: 'zhou-dunyi-taijitu-reconstruction', mediaWidth: 2.65, mediaHeight: 3.25, installationKind: 'east-asian-concept', accent: EAST_ASIAN_PALETTE.indigo}),

  // Room 02: two full-scale contextual outer anchors and four return installations.
  authorSupplementalLayout({id: 'eac-xuanzang-translation', parentExhibitId: 'zhu-xi', guidedAfterExhibitId: 'wang-yangming', zoneId: 'east-buddhist-daoist-transmissions', position: {x: -10.85, z: 0}, rotationY: Math.PI / 2, assetId: 'east-xuanzang-japanese-reception', mediaWidth: 2.55, mediaHeight: 3.25, installationKind: 'east-asian-context', accent: EAST_ASIAN_PALETTE.indigo}),
  authorSupplementalLayout({id: 'eac-daoist-institutions', parentExhibitId: 'zhu-xi', guidedAfterExhibitId: 'wang-yangming', zoneId: 'east-buddhist-daoist-transmissions', position: {x: 10.85, z: 0}, rotationY: -Math.PI / 2, assetId: 'east-daoist-ritual-robe', mediaWidth: 2.55, mediaHeight: 3.25, installationKind: 'east-asian-context', accent: EAST_ASIAN_PALETTE.jade}),
  authorSupplementalLayout({id: 'eac-hwaeom-avatamsaka', parentExhibitId: 'zhu-xi', guidedAfterExhibitId: 'wang-yangming', zoneId: 'east-buddhist-daoist-transmissions', position: {x: -5.55, z: -8.2133}, rotationY: 0, assetId: 'east-hwaeom-avatamsaka-cover', mediaWidth: 3.3, mediaHeight: 2.55, installationKind: 'east-asian-work', accent: EAST_ASIAN_PALETTE.gold}),
  authorSupplementalLayout({id: 'eac-three-teachings', parentExhibitId: 'zhu-xi', guidedAfterExhibitId: 'wang-yangming', zoneId: 'east-buddhist-daoist-transmissions', position: {x: 5.55, z: -8.2133}, rotationY: 0, assetId: 'east-three-teachings-painting', mediaWidth: 2.7, mediaHeight: 3.2, installationKind: 'east-asian-concept', accent: EAST_ASIAN_PALETTE.cinnabar}),
  authorSupplementalLayout({id: 'eac-huineng-zen-reception', parentExhibitId: 'zhu-xi', guidedAfterExhibitId: 'wang-yangming', zoneId: 'east-buddhist-daoist-transmissions', position: {x: -5.55, z: 8.2133}, rotationY: Math.PI, assetId: 'east-huineng-japanese-reception', mediaWidth: 3.3, mediaHeight: 2.55, installationKind: 'east-asian-work', accent: EAST_ASIAN_PALETTE.indigo}),
  authorSupplementalLayout({id: 'eac-water-land-stars', parentExhibitId: 'zhu-xi', guidedAfterExhibitId: 'wang-yangming', zoneId: 'east-buddhist-daoist-transmissions', position: {x: 5.55, z: 8.2133}, rotationY: Math.PI, assetId: 'east-water-land-star-deities', mediaWidth: 2.6, mediaHeight: 3.2, installationKind: 'east-asian-context', accent: EAST_ASIAN_PALETTE.gold}),

  // Room 03: specific Korean, Japanese, Vietnamese, and modern continuities.
  authorSupplementalLayout({id: 'eac-korea-four-seven', parentExhibitId: 'zhu-xi', guidedAfterExhibitId: 'wang-yangming', zoneId: 'east-regional-continuities-reserve', position: {x: -10.85, z: 18.6667}, rotationY: Math.PI / 2, assetId: 'dosan-seowon-academy', mediaWidth: 3.3, mediaHeight: 2.55, installationKind: 'east-asian-context', accent: EAST_ASIAN_PALETTE.jade}),
  authorSupplementalLayout({id: 'eac-japan-hayashi', parentExhibitId: 'zhu-xi', guidedAfterExhibitId: 'wang-yangming', zoneId: 'east-regional-continuities-reserve', position: {x: 10.85, z: 18.6667}, rotationY: -Math.PI / 2, assetId: 'hayashi-yushima-seido', mediaWidth: 3.3, mediaHeight: 2.55, installationKind: 'east-asian-context', accent: EAST_ASIAN_PALETTE.indigo}),
  authorSupplementalLayout({id: 'eac-yi-i-ojukheon', parentExhibitId: 'zhu-xi', guidedAfterExhibitId: 'wang-yangming', zoneId: 'east-regional-continuities-reserve', position: {x: -5.55, z: 10.4533}, rotationY: 0, assetId: 'yi-i-ojukheon', mediaWidth: 3.3, mediaHeight: 2.55, installationKind: 'east-asian-context', accent: EAST_ASIAN_PALETTE.gold}),
  authorSupplementalLayout({id: 'eac-japan-ancient-learning', parentExhibitId: 'zhu-xi', guidedAfterExhibitId: 'wang-yangming', zoneId: 'east-regional-continuities-reserve', position: {x: 5.55, z: 10.4533}, rotationY: 0, assetId: 'ito-jinsai-portrait', mediaWidth: 2.55, mediaHeight: 3.25, installationKind: 'east-asian-context', accent: EAST_ASIAN_PALETTE.cinnabar}),
  authorSupplementalLayout({id: 'eac-vietnam-le-quy-don', parentExhibitId: 'zhu-xi', guidedAfterExhibitId: 'wang-yangming', zoneId: 'east-regional-continuities-reserve', position: {x: -5.55, z: 26.88}, rotationY: Math.PI, assetId: 'le-quy-don-van-dai', mediaWidth: 2.6, mediaHeight: 3.2, installationKind: 'east-asian-work', accent: EAST_ASIAN_PALETTE.jade}),
  authorSupplementalLayout({id: 'eac-modern-confucianism', parentExhibitId: 'zhu-xi', guidedAfterExhibitId: 'wang-yangming', zoneId: 'east-regional-continuities-reserve', position: {x: 5.55, z: 26.88}, rotationY: Math.PI, assetId: 'kang-youwei-1905', mediaWidth: 2.55, mediaHeight: 3.25, installationKind: 'east-asian-context', accent: EAST_ASIAN_PALETTE.gold}),
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

export const getEastAsianSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = EAST_ASIAN_SUPPLEMENTAL_EXHIBITS.find((item) => item.id === id);
  if (!record) throw new Error(`Gallery 11 supplemental exhibit ${id} is missing.`);
  return record;
};
