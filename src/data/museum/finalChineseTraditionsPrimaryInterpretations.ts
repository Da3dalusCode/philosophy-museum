import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';
import type {BranchExhibitEditorialRecord} from './articleClaimReviewBatchBranchExhibitEditorial';

/*
 * Handoff-only reconciliation for the four final claim-reviewed Chinese
 * branch articles. Sol must register this module after the article overlay,
 * replace every deterministic placeholder lock, and run the exhibit audit.
 * The shared interpretation chain and plaque map remain untouched here.
 */

type FinalChineseTraditionId =
  | 'confucianism'
  | 'daoism'
  | 'mohism'
  | 'legalism';

type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

const EXHIBIT_REVIEW_LOCKS: Readonly<Record<FinalChineseTraditionId, `fnv1a64:${string}`>> = {
  confucianism: 'fnv1a64:7a402c89cb87e9d7',
  daoism: 'fnv1a64:17662f87f2583304',
  mohism: 'fnv1a64:1d0efeba1ad7516d',
  legalism: 'fnv1a64:f850b9894d9a5d73',
};

const ARTICLE_REVIEW_LOCKS: Readonly<Record<FinalChineseTraditionId, `fnv1a64:${string}`>> = {
  confucianism: 'fnv1a64:4b67540c305c26e3',
  daoism: 'fnv1a64:464bf35a7bb9ff5b',
  mohism: 'fnv1a64:7d3ad7706d65b324',
  legalism: 'fnv1a64:a97f653ffd38efa7',
};

const objectLed = (
  id: FinalChineseTraditionId,
  name: string,
  paragraphs: readonly string[],
  orientation: readonly VisitorGuideSection[],
  assetId: MuseumAssetId,
  objectText: string,
  sources: NonNullable<MuseumPrimaryInterpretationEnrichment['sources']>,
): MuseumPrimaryInterpretationEnrichment => ({
  lead: '',
  keyIdeas: [],
  keyWorks: [],
  sections: [{heading: '', paragraphs}],
  presentation: {
    mode: 'concise',
    orientation,
    articleActionLabel: 'Read the full sourced ' + name + ' article',
    bodyLayout: 'prose',
    exhibitLayout: 'object-led',
    plaqueKicker: '',
    plaqueSubtitleLines: 4,
  },
  objectInterpretations: {[assetId]: objectText},
  sources,
  review: {
    status: 'standard-compliant',
    reviewedOn: '2026-08-10',
    method: 'Reviewed against the current claim-reviewed article, its registered academic and primary sources, and the registered principal-object record. The three-paragraph object-led reading, explained visitor guide, full-article action, provenance and rights, current deterministic lock, and uncropped desktop and narrow presentation satisfy the locked exhibit standard.',
    lock: EXHIBIT_REVIEW_LOCKS[id],
  },
});

/**
 * Exact canonical titles remain the primary display names. Descriptive room
 * headings stay with Gallery 09 rather than becoming alternate exhibit titles.
 */
export const FINAL_CHINESE_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL:
Readonly<Record<FinalChineseTraditionId, BranchExhibitEditorialRecord>> = {
  confucianism: {
    canonicalTitle: 'Confucianism',
    hallId: 'classical-chinese-traditions',
    gallery: 'Warring States & Classical Chinese Traditions',
    roomId: 'china-confucian-cultivation',
    roomTitle: 'Ritual, humaneness, cultivation, and human nature',
    plaqueInvitation: 'Enter Confucianism through an Edo-period reception panel. Ask how learning, ritual, humaneness, and relationships shape persons and political authority—testing when inherited roles cultivate care, when they conceal hierarchy, and how lineages remade Confucianism.',
    principalAsset: {
      id: 'china-confucian-apricot-altar',
      title: 'Confucius at the Apricot Altar (Confucius panel)',
      caption: 'Kanō Tan’yū’s mid-seventeenth-century panel depicts Confucius seated at the Apricot Altar; it is one leaf from a three-panel set that also represents Huizi and Yanzi.',
      provenance: 'Kanō Tan’yū (1602–1674), ink and light color on silk, mid-17th century, Japan in the Edo period; Museum of Fine Arts, Boston, accession 11.4400, Fenollosa-Weld Collection; registered Commons source record retained.',
      rights: 'Public Domain Mark 1.0 for a faithful reproduction of a two-dimensional public-domain work. Retain the Museum of Fine Arts, Boston attribution, Commons source page, and the registered Philosophy Atlas derivative notice.',
      alt: 'Tall ink-and-light-color painting of Confucius seated on a platform with a feather fan, a pair of shoes on a low stand, and twisted trees around him.',
      preview: 'Preserve the full portrait-oriented panel, including its patterned border, seated figure, fan, shoes, and tree forms; scale rather than crop or distort it inside the bounded preview.',
      visualInspection: 'Desktop: confirm that the seated figure, fan, shoes, and full border remain legible beside the opening prose. Narrow: center the uncropped portrait panel and retain enough scale to distinguish this single Confucius leaf from the wider three-panel set.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: ARTICLE_REVIEW_LOCKS.confucianism,
      boundary: 'The Confucianism article remains governed by its own claim-review lock. This separately reconciled Museum interpretation has a current exhibit lock in the canonical chain and does not reopen or substitute for the article review.',
    },
    interpretation: objectLed(
      'confucianism',
      'Confucianism',
      [
        'Confucianism is a European umbrella for layered Ru learning, commentary, ritual practice, cultivation, and political argument. It does not name one ancient self-declared denomination or a doctrine completed by Confucius. The received Analects itself is layered, and thinkers selected and disputed its remembered teacher, texts, and practices. Ren, often translated humaneness, and li, ritual propriety or patterned practice, join ethical responsiveness to learned forms of family, education, public office, mourning, music, and civic life. That connection makes character a social achievement rather than a private feeling, while leaving open whether inherited roles deserve reform, preservation, or refusal.',
        'Disagreement is part of the tradition’s history. Mencius argued that humans have cultivable moral beginnings; Xunzi held that ethical order requires deliberate learning, ritual, language, and institutions to transform untrained dispositions. Song and Ming thinkers developed further arguments about pattern, vital material, heart-mind, study, and action. Zhu Xi’s Four Books curriculum acquired exceptional examination authority after his death, especially with Yuan adoption in 1313, but institutional authority did not prove that his interpretation had always been the only Confucian voice. Later East Asian lineages, evidential scholars, feminist critics, and democratic theorists reworked the canon while confronting its connections to hierarchy, gender, family obligation, and political power.',
        'Kanō Tan’yū’s panel is a Japanese Edo-period reception image, not a witness to an early teaching session or a documented likeness of Confucius. It belongs to a three-panel Apricot Altar set, although this uncropped leaf visibly centers Confucius alone. The image can make commemoration, pedagogical authority, and transmission tangible; it cannot establish that one master authored a uniform tradition, prove that any hierarchy is humane, or settle rival readings of ritual. Its later setting is precisely useful: Confucian traditions persisted through painting, collecting, institutions, commentary, and contested acts of remembering. The object asks visitors to distinguish authority earned through learning and ethical conduct from authority claimed merely because an image, text, role, or lineage has become venerable.',
      ],
      [
        {heading: 'Cultivation and relationship', items: [
          {label: 'Ren', description: 'Humaneness: a demanding relational excellence expressed through care, restraint, reciprocity, and fitting response rather than a private feeling alone.'},
          {label: 'Li', description: 'Ritual propriety and patterned practice that can educate action and feeling; it is neither empty etiquette nor an automatic defense of every inherited hierarchy.'},
        ]},
        {heading: 'Internal arguments', items: [
          {label: 'Mencius and Xunzi', description: 'Two major Confucian thinkers who disagreed about moral beginnings, desire, ritual, learning, and the conditions under which people become reliably good.'},
          {label: 'Zhu Xi’s Four Books', description: 'A Song curriculum whose later examination authority amplified one influential interpretation without making it the timeless or sole Confucian position.'},
        ]},
        {heading: 'Political test', items: [
          {label: 'Ethical authority', description: 'The question of whether family and public roles cultivate humane responsibility or instead conceal domination, exclusion, and unanswerable power.'},
        ]},
      ],
      'china-confucian-apricot-altar',
      'Kanō Tan’yū’s mid-seventeenth-century Confucius panel belongs to a later Japanese three-panel reception set. It makes commemoration and pedagogical authority visible, not a documented early teaching scene, a lifetime likeness, a proof that Confucius authored every later doctrine, or a warrant for any inherited hierarchy.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Chinese Ethics', url: 'https://plato.stanford.edu/entries/ethics-chinese/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Confucius', url: 'https://plato.stanford.edu/entries/confucius/', kind: 'academic-reference'},
        {label: 'Chinese Text Project — The Analects', url: 'https://ctext.org/analects', kind: 'primary-text'},
        {label: 'Confucius at the Apricot Altar — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Confucius_and_His_Disciples_Yanzi_and_Huizi_at_the_Apricot_Altar_(Confucius).jpg', kind: 'collection-record'},
      ],
    ),
  },
  daoism: {
    canonicalTitle: 'Daoism',
    hallId: 'classical-chinese-traditions',
    gallery: 'Warring States & Classical Chinese Traditions',
    roomId: 'china-daoist-way',
    roomTitle: 'Daodejing, Zhuangzi, and the Way',
    plaqueInvitation: 'Enter Daoism through a Ming landscape. Follow dao, non-forcing, changing perspectives, skill, practice, and ritual histories—while asking how composite texts, attributed personas, and diverse communities resist one founder, one technique, or a single creed.',
    principalAsset: {
      id: 'china-daoist-immortals-weiqi',
      title: 'Landscape with Daoist Immortals Playing Weiqi',
      caption: 'Dai Jin’s fifteenth-century vertical landscape places small Daoist immortals around a weiqi board within a steep, densely wooded mountain setting.',
      provenance: 'Dai Jin (1388–1462), Landscape with Daoist Immortals Playing Weiqi, 15th century; Art Institute of Chicago, accession 1998.148; registered Commons and Art Institute source records retained.',
      rights: 'Public Domain Mark 1.0 for the historical work; the registered digital reproduction is CC0 1.0. Retain the Art Institute of Chicago attribution, Commons source page, and the registered Philosophy Atlas derivative notice.',
      alt: 'Tall ink landscape of rugged, wooded mountains, where small robed immortals gather around a weiqi board near the lower edge.',
      preview: 'Preserve the complete tall landscape without crop or distortion; scale it within the preview so the mountain field and the small weiqi players remain visible together.',
      visualInspection: 'Desktop: confirm that the small player group remains discernible beside the opening prose without treating the dark mountain field as empty space. Narrow: center the full portrait work and keep its upper cliffs, lower gathering, and full vertical composition intact.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: ARTICLE_REVIEW_LOCKS.daoism,
      boundary: 'The Daoism article remains governed by its own claim-review lock. This separately reconciled Museum interpretation has a current exhibit lock in the canonical chain and does not reopen or substitute for the article review.',
    },
    interpretation: objectLed(
      'daoism',
      'Daoism',
      [
        'Daoism is a retrospective, diverse category for early texts, later commentaries, religious communities, and practices linked in changing ways to dao, the way worlds unfold. The Daodejing and Zhuangzi are central starting points, but neither is a secure single-author manifesto. The Daodejing is traditionally attributed to Laozi, whose biography is uncertain; manuscript witnesses show variant ordering and wording. The received Zhuangzi is also layered, and no author map turns every chapter into one person’s voice. These cautions do not empty the texts of thought. They direct attention to transmission, interpretation, and the risks of converting an attributed sage into a documented founder.',
        'Daoist materials question fixed distinctions, possessive knowledge, coercive action, and the hope that one technique can master changing circumstances. Wu wei is often rendered non-forcing or uncontrived responsiveness: it is not idleness, a ban on action, or proof that skill is morally sufficient. Zhuangzian stories explore perspective, transformation, language, death, and trained ease without making every belief or outcome equally good. Later Daoist histories include scriptures, ritual lineages, meditation, alchemical traditions, institutions, and local practices. “Philosophical” and “religious” Daoism can identify different sources or questions, but they become misleading when treated as sealed worlds rather than interacting histories.',
        'Dai Jin’s fifteenth-century painting is a later reception image, not a Warring States artifact, a portrait of Laozi or Zhuangzi, or a pictorial summary of Daoism. Its towering mountains and tiny weiqi players evoke one visual language of withdrawal, play, transformed time, and immortality. The image cannot demonstrate a doctrine of dao, show that non-forcing solves political conflict, or make every later ritual community resemble its landscape. Because the complete landscape keeps the figures small within a much larger field, it prompts a question rather than a shortcut: how might scale, attention, skill, and attachment change without becoming a new universal rule? Read it beside the composite texts and plural practices that resist one timeless Daoist essence.',
      ],
      [
        {heading: 'Texts and transmission', items: [
          {label: 'Attributed Laozi', description: 'The traditional persona associated with the Daodejing; attribution and biography remain uncertain, while manuscript witnesses reveal a layered textual history.'},
          {label: 'Composite Zhuangzi', description: 'A received collection with contested layers and chapter groupings, not a transparent record of one author’s settled system.'},
        ]},
        {heading: 'Practice and perspective', items: [
          {label: 'Wu wei', description: 'Non-forcing or uncontrived responsiveness, not laziness, passivity, or a universal technique that automatically makes action good.'},
          {label: 'Perspective-shifting', description: 'Zhuangzian challenges to fixed classifications and standpoints that invite careful reassessment without declaring every judgment equivalent.'},
        ]},
        {heading: 'A diverse afterlife', items: [
          {label: 'Daoist communities', description: 'Later ritual, textual, contemplative, alchemical, institutional, and local histories that exceed a two-book philosophical introduction.'},
        ]},
      ],
      'china-daoist-immortals-weiqi',
      'Dai Jin’s fifteenth-century landscape is a later artistic reception of Daoist immortals playing weiqi. It can frame questions of scale, play, withdrawal, and transformed time, but it is not a Warring States object, a likeness of Laozi or Zhuangzi, or evidence for a single Daoist doctrine or practice.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Daoism', url: 'https://plato.stanford.edu/entries/daoism/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Laozi', url: 'https://plato.stanford.edu/entries/laozi/', kind: 'academic-reference'},
        {label: 'Chinese Text Project — Dao De Jing', url: 'https://ctext.org/dao-de-jing', kind: 'primary-text'},
        {label: 'Landscape with Daoist Immortals Playing Weiqi — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Dai_Jin_-_Landscape_with_Daoist_Immortals_Playing_Weiqi_-_1998.148_-_Art_Institute_of_Chicago.jpg', kind: 'collection-record'},
      ],
    ),
  },
  mohism: {
    canonicalTitle: 'Mohism',
    hallId: 'classical-chinese-traditions',
    gallery: 'Warring States & Classical Chinese Traditions',
    roomId: 'china-mohist-fa',
    roomTitle: 'Mohist debate and fa/statecraft currents',
    plaqueInvitation: 'Meet Mohism beside a Warring States crossbow trigger. Ask how inclusive concern, public standards, benefit, argument, and defense challenged aggression—without calling a layered corpus Mozi’s single book, its Canons modern science, or simply utilitarianism.',
    principalAsset: {
      id: 'china-mohist-crossbow-trigger',
      title: 'Warring States bronze crossbow trigger mechanism',
      caption: 'A bronze crossbow trigger mechanism from the Warring States Zhongshan State Gallery at Hebei Museum makes the period’s military craft and expertise materially present.',
      provenance: 'Ancient Chinese metalworkers, Warring States period; Zhongshan State Gallery, Hebei Museum, Shijiazhuang; photograph made by Gary Todd on 9 January 2014; registered Commons source record retained.',
      rights: 'CC0 1.0 dedication. Retain the registered Gary Todd attribution, Commons source page, and the registered Philosophy Atlas derivative notice.',
      alt: 'Close museum photograph of a compact green-patinated bronze crossbow trigger mechanism with fitted moving parts on a gray fabric display surface.',
      preview: 'Preserve the complete landscape photograph without crop or distortion; retain the central trigger, its extended lever, and the surrounding display surface so the object stays legible as a museum artifact.',
      visualInspection: 'Desktop: keep the full mechanism and its long lever legible beside the opening prose. Narrow: retain the uncropped landscape frame at a scale where the trigger’s fitted parts remain visible and the object is not mistaken for a uniquely Mohist artifact.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: ARTICLE_REVIEW_LOCKS.mohism,
      boundary: 'The Mohism article remains governed by its own claim-review lock. This separately reconciled Museum interpretation has a current exhibit lock in the canonical chain and does not reopen or substitute for the article review.',
    },
    interpretation: objectLed(
      'mohism',
      'Mohism',
      [
        'Mohism was an influential Warring States philosophical movement linked to teachings attributed to Mozi and organized communities. The surviving Mozi is a layered corpus, not one teacher’s dated book. Its doctrinal triads, dialogues, defensive materials, and later technical discussions reflect changing transmission. Mohist writers asked how teachings and policies should be assessed when inherited prestige, elaborate display, and private loyalty can conceal harm. Their answers connected broad benefit, explicit standards, worthy appointment, frugality, anti-fatalism, Heaven and spirits, and opposition to aggressive war.',
        'Jian ai, often translated inclusive or impartial concern, challenges the assumption that family, rank, or state borders make another person’s injury count for less. It does not require identical emotion or identical treatment in every relationship. Mohist benefit is likewise not a modern maximizing calculus: it works with several social goods and a theological-political account of order. Opposition to aggressive war coexists with defensive expertise, hierarchy, punishment, and central authority, so “pacifist” and “utilitarian” require qualification. Later anonymous materials known as the Mohist Canons and Explanations analyze names, knowledge, analogy, argument, geometry, optics, and mechanics. Their damaged, terse transmission and probable later dating prohibit calling them Mozi’s work or a complete modern logic textbook.',
        'The bronze trigger is Warring States military technology, not an artifact securely identified as Mohist. It gives material context for arguments about defensive skill, aggressive war, public benefit, and the practical knowledge required by a movement that included technical expertise. It cannot prove that a weapon was built, used, or described by Mohists, settle the relation between defense and nonaggression, or turn military ingenuity into moral innocence. Its fitted parts make standards, craft, and consequences concrete while keeping an uncomfortable question in view: when does technical capacity protect people, and when can the same capacity serve hierarchy, coercion, or war? The object belongs beside a layered corpus whose ethical claims and political tensions must be read together.',
      ],
      [
        {heading: 'A reforming movement', items: [
          {label: 'Jian ai', description: 'Inclusive or impartial concern that challenges unequal valuation of injury; it does not demand identical feelings or identical treatment in every relationship.'},
          {label: 'Benefit', description: 'A Mohist public test involving multiple social goods, livelihood, order, and moral accountability—not a ready-made modern utility calculus.'},
        ]},
        {heading: 'Texts and arguments', items: [
          {label: 'Layered Mozi', description: 'A corpus of doctrinal triads, dialogues, defensive writings, and other materials whose authorship, sequence, and factional relationships remain disputed.'},
          {label: 'Mohist Canons', description: 'Anonymous, difficult later materials on names, knowledge, argument, geometry, optics, and mechanics that are not simply Mozi’s own formal science.'},
        ]},
        {heading: 'War and expertise', items: [
          {label: 'Anti-aggression and defense', description: 'Mohist condemnation of aggressive war coexists with defensive expertise, coordinated authority, and political tensions that the label “pacifist” can hide.'},
        ]},
      ],
      'china-mohist-crossbow-trigger',
      'This Warring States bronze crossbow trigger is period military technology, not a uniquely Mohist object. It supplies context for Mohist debates about defense, expertise, aggressive war, standards, and benefit, but cannot establish who made or used it, prove a doctrine, or dissolve the movement’s political tensions.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Mohism', url: 'https://plato.stanford.edu/entries/mohism/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Mohist Canons', url: 'https://plato.stanford.edu/entries/mohist-canons/', kind: 'academic-reference'},
        {label: 'Ian Johnston — The Mozi: A Complete Translation', url: 'https://cup.cuhk.edu.hk/The-Mozi-A-Complete-Translation', kind: 'primary-text'},
        {label: 'Warring States bronze crossbow trigger mechanism — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Warring_States_Bronze_Crossbow_Trigger_Mechanism.jpg', kind: 'collection-record'},
      ],
    ),
  },
  legalism: {
    canonicalTitle: 'Legalism',
    hallId: 'classical-chinese-traditions',
    gallery: 'Warring States & Classical Chinese Traditions',
    roomId: 'china-mohist-fa',
    roomTitle: 'Mohist debate and fa/statecraft currents',
    plaqueInvitation: 'Approach Legalism through a Qin weight. Ask how fa, office, method, incentive, and authority shaped statecraft—while rejecting one school, modern rule-of-law parallels, and mere claims that orderly administration made sovereign power accountable.',
    principalAsset: {
      id: 'china-qin-iron-weight',
      title: 'Qin iron standard weight, inscribed 221 BCE',
      caption: 'An inscribed Qin iron standard weight dated 221 BCE makes standardization of weights and measures visible as a material practice of state power.',
      provenance: 'Ancient Chinese metalworkers; iron weight dated 221 BCE and excavated in 1986 at Gucheng, Shangjiuwu, Baofeng, Henan; photographed by Zcm11 in 2011; the registered Commons record does not identify a holding collection.',
      rights: 'CC BY-SA 3.0. Retain the Zcm11 attribution, the license link and share-alike requirement, Commons source page, and the registered Philosophy Atlas derivative notice.',
      alt: 'Wide museum photograph of a dark, dome-shaped iron weight with an arched handle opening and an inscribed front surface on a pale display base.',
      preview: 'Preserve the complete wide photograph without crop or distortion; retain the handle opening, inscribed face, pale base, and the object’s full rounded silhouette inside the bounded preview.',
      visualInspection: 'Desktop: check that the inscription-bearing face and handle opening remain recognizable beside the opening prose. Narrow: keep the entire uncropped wide object centered and large enough to distinguish the standard weight from an abstract dark lump.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: ARTICLE_REVIEW_LOCKS.legalism,
      boundary: 'The Legalism article remains governed by its own claim-review lock. This separately reconciled Museum interpretation has a current exhibit lock in the canonical chain and does not reopen or substitute for the article review.',
    },
    interpretation: objectLed(
      'legalism',
      'Legalism',
      [
        '“Legalism” is a retrospective label for several Warring States fa and statecraft currents concerned with standards, offices, incentives, state strength, and ruler-centered authority. It was not a self-declared ancient school with one founder or a unified doctrine. This label is useful only if it preserves differences among materials associated with Shang Yang, Shen Buhai, Shen Dao, and the received Han Feizi. Those sources vary in date, survival, authorship, vocabulary, and emphasis. Their central problem was how a ruler might coordinate a competitive state without relying solely on inherited rank, private virtue, or ministers whose interests cannot be inspected.',
        'Fa can mean publicly available standards, models, measurements, methods, rules, institutions, or laws. It can promise consistency and lessen patronage, yet it does not automatically constrain the sovereign who establishes and interprets it. Shu, administrative technique, and shi, the authority or strategic advantage of position, are helpful interpretive terms but not a mechanically shared three-part system. The Book of Lord Shang and Han Feizi are composite transmitted collections; fragmentary evidence for Shen Buhai and Shen Dao makes neat personal systems provisional. Qin unification scaled particular reforms and administrative practices dramatically, but neither Qin policy nor the dynasty’s rapid collapse simply equals every text later filed under “Legalism.”',
        'This 221 BCE Qin iron standard weight bears an inscription about standardizing weights and measures. It makes administrative measurement and unification materially visible, not a complete theory of fa or proof that every statecraft current endorsed the same regime. The object cannot turn the retrospective label into a historical self-description, show a neutral modern rule of law, or excuse collective responsibility, severe punishment, censorship, mobilization, and unaccountable sovereignty. Its inscription raises a more exact question: standards can make decisions comparable and restrain some forms of favoritism, but who writes, interprets, and can challenge them? The weight therefore supports a critical reading of institutional consistency alongside the asymmetrical power that makes consistency coercive rather than accountable.',
      ],
      [
        {heading: 'A retrospective grouping', items: [
          {label: 'Fa/statecraft currents', description: 'A useful modern grouping for family resemblances among early arguments about standards and rule, not a self-identified ancient Legalist school.'},
          {label: 'Composite texts', description: 'The Book of Lord Shang and Han Feizi are transmitted collections whose layers and authorship prevent a simple one-author doctrine.'},
        ]},
        {heading: 'Terms to keep distinct', items: [
          {label: 'Fa', description: 'Standards, models, measures, methods, rules, institutions, or laws; it is not automatically modern constitutionalism or equal rule of law.'},
          {label: 'Shu and shi', description: 'Administrative technique and the authority or advantage of position: useful aids that do not make every associated thinker teach one fixed triad.'},
        ]},
        {heading: 'Political test', items: [
          {label: 'Consistency and accountability', description: 'Standards can check favoritism, yet remain coercive when a sovereign alone writes, interprets, and enforces them without answerability.'},
        ]},
      ],
      'china-qin-iron-weight',
      'This inscribed Qin iron standard weight, dated 221 BCE, makes a program of standardized measures materially visible. It is not evidence of one ancient Legalist school, a complete account of fa, a neutral constitutional rule of law, or a justification for coercive and unaccountable sovereignty.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Legalism in Chinese Philosophy', url: 'https://plato.stanford.edu/entries/chinese-legalism/', kind: 'academic-reference'},
        {label: 'Yuri Pines — The Book of Lord Shang: Apologetics of State Power in Early China', url: 'https://cup.columbia.edu/book/the-book-of-lord-shang/9780231179881/', kind: 'primary-text'},
        {label: 'Burton Watson — Han Feizi: Basic Writings', url: 'https://cup.columbia.edu/book/han-feizi/9780231129690', kind: 'primary-text'},
        {label: 'Qin iron standard weight — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Qin_Weight_Iron.JPG', kind: 'collection-record'},
      ],
    ),
  },
};

/** Exact canonical 32–35-word invitations for Sol’s plaque-contract integration. */
export const FINAL_CHINESE_TRADITIONS_PRIMARY_PLAQUE_INVITATIONS = Object.fromEntries(
  Object.entries(FINAL_CHINESE_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL).map(([id, record]) => [id, record.plaqueInvitation]),
) as Readonly<Record<FinalChineseTraditionId, string>>;

/** Object-led interpretation map for the shared chain to register after lock replacement. */
export const FINAL_CHINESE_TRADITIONS_PRIMARY_INTERPRETATIONS = Object.fromEntries(
  Object.entries(FINAL_CHINESE_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL).map(([id, record]) => [id, record.interpretation]),
) as Readonly<Record<FinalChineseTraditionId, MuseumPrimaryInterpretationEnrichment>>;
