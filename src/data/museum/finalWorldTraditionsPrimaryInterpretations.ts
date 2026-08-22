import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';
import type {BranchExhibitEditorialRecord} from './articleClaimReviewBatchBranchExhibitEditorial';

/*
 * Handoff-only reconciliation for the five final claim-reviewed world and
 * modern-tradition branches. Sol owns registration in the shared enrichment
 * chain and replacement of the explicit deterministic review-lock placeholder.
 */

type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

type FinalWorldTraditionId =
  | 'indian-philosophy'
  | 'buddhist-philosophy'
  | 'rationalism'
  | 'empiricism'
  | 'german-idealism';

const EXHIBIT_REVIEW_LOCKS_BY_NAME: Readonly<Record<string, `fnv1a64:${string}`>> = {
  'Indian Philosophy': 'fnv1a64:231c06ffab89d679',
  'Buddhist Philosophy': 'fnv1a64:8b03f10aa6151542',
  Rationalism: 'fnv1a64:1ba4e9db4b2c3270',
  Empiricism: 'fnv1a64:f1af1ea138b6e265',
  'German Idealism': 'fnv1a64:c46806f79981401a',
};

const objectLed = (
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
    articleActionLabel: `Read the full sourced ${name} article`,
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
    method: 'Reviewed against the current claim-reviewed article, its registered academic and primary sources, and the registered principal-object record. The object-led prose, explained visitor guide, full sourced-article action, provenance and rights, current deterministic lock, and uncropped desktop and narrow presentation satisfy the locked exhibit standard.',
    lock: EXHIBIT_REVIEW_LOCKS_BY_NAME[name],
  },
});

/**
 * Complete editorial records for the five exhibits. The record map is not
 * registered here so that this file cannot alter the shared Museum chain.
 */
export const FINAL_WORLD_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL:
Readonly<Record<FinalWorldTraditionId, BranchExhibitEditorialRecord>> = {
  'indian-philosophy': {
    canonicalTitle: 'Indian Philosophy',
    hallId: 'classical-south-asian-worlds',
    gallery: 'Classical South Asia: Jain, Yoga, and Brahmanical Systems',
    roomId: 'south-orientation-many-schools',
    roomTitle: 'Many schools, shared questions, and missing traditions',
    plaqueInvitation: 'Enter a plural South Asian field. Track views of knowledge, words, acts, self, world, and release across rival paths—while testing maps, canons, and labels that falsely give one region a single voice.',
    principalAsset: {
      id: 'south-many-schools-interpretive',
      title: 'Many schools, shared questions, unfinished routes',
      caption: 'An interpretive orientation image makes plurality—and the gallery’s omissions—visible.',
      provenance: 'Philosophy Atlas Museum with generation details unavailable; original interpretive illustration held by Philosophy Atlas Museum. It is a contemporary conceptual aid, not a historical map, a sacred diagram, or a record of a unified South Asian system.',
      rights: 'Original Philosophy Atlas Museum interpretive illustration; rights-status record. Retain the registered attribution “Original interpretive illustration created for Philosophy Atlas Museum with generation details unavailable.” This is not an external collection object or independently licensed historical image.',
      alt: 'A dark museum collage of divergent pathways, manuscript leaves, debate circles, and one visibly unfinished route.',
      preview: 'Preserve the complete portrait-oriented registered panel without crop or distortion; scale it within the bounded preview so the divergent paths, manuscript leaves, debate circles, and unfinished route remain visible.',
      visualInspection: 'At desktop, verify that the full portrait composition and compact guide leave the opening prose readable. On narrow screens, verify that the complete collage remains visible and that the generated, non-historical provenance and its interpretive limits are easy to find.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:8fc473b6667e909b',
      boundary: 'The article remains governed by its own current claim-review lock. This separately reconciled Museum interpretation has a current exhibit lock in the canonical chain and does not reopen or substitute for the article review.',
    },
    interpretation: objectLed(
      'Indian Philosophy',
      [
        'Indian philosophy is a retrospective umbrella for many multilingual traditions produced in and across South Asia, not the name of one religion, people, canon, or timeless spiritual outlook. Vedic and Upaniṣadic materials, śramaṇa movements, Buddhist and Jain arguments, Brahmanical schools, materialist and skeptical positions, devotional currents, and later Islamic, colonial, anticolonial, diasporic, and academic settings enter changing conversations. They developed through teachers, monasteries, courts, temples, households, debates, manuscripts, commentary, and translation. A gallery label can orient visitors only if it does not turn this immense and contested archive into a single civilizational voice or silently make Veda-connected traditions representative of every South Asian philosophical project.',
        'Across those disagreements, thinkers ask what makes cognition reliable; how perception, inference, testimony, language, and error work; whether persons, selves, bodies, causation, universals, or divine reality are fundamental; and how action shapes bondage, responsibility, or release. Nyāya develops exacting accounts of pramāṇas, or means of warranted cognition, while Mīmāṃsā, Buddhist, Jain, Sāṃkhya, Yoga, Vedānta, and other traditions contest authority, ontology, semantics, and practice on different terms. The familiar six-school arrangement is a later organizing schema, not a census of six synchronized institutions. Nor do mokṣa, nirvāṇa, and kaivalya name one interchangeable goal. Shared questions make comparison possible; rival answers keep comparison honest.',
        'This illustration of unknown generation date shows paths, leaves, debate circles, and an unfinished route. It is not evidence from a historical archive, a map of actual schools, or a sacred image representing their practices. Its contemporary Museum authorship and incomplete generated provenance make its limit part of the exhibit: a Museum has chosen an orientation device because no single object could stand for the traditions gathered under this label. The image can prompt visitors to ask which texts, languages, institutions, and communities its framing leaves out. It cannot settle a contested canon, establish influence, or convert regional proximity into philosophical agreement. Read the object as an admission of curatorial incompleteness, then return to arguments and texts.',
      ],
      [
        {heading: 'A qualified umbrella', items: [
          {label: 'Retrospective label', description: '“Indian philosophy” is a modern organizing name for diverse South Asian argument traditions; it does not identify one ancient school, religion, or shared doctrine.'},
          {label: 'Contested canons', description: 'Texts and authoritative lineages differ by tradition, language, region, and institution, so no short roster can speak for the whole field.'},
        ]},
        {heading: 'Ways of reasoning', items: [
          {label: 'Pramāṇa', description: 'A means of warranted cognition, such as perception, inference, or testimony; traditions disagree about which sources count and why.'},
          {label: 'Nyāya', description: 'A South Asian tradition that develops methods of debate and detailed accounts of knowledge, inference, language, and error.'},
        ]},
        {heading: 'Different aims', items: [
          {label: 'Mokṣa, nirvāṇa, and kaivalya', description: 'Distinct accounts of liberation or release associated with different traditions; they should not be collapsed into one universal spiritual experience.'},
        ]},
      ],
      'south-many-schools-interpretive',
      'This generated Museum illustration of unknown generation date is a contemporary orientation device, not a historical source, map, or sacred diagram. Its paths and unfinished route make curatorial selection visible, but cannot prove a canon, an influence chain, or a shared South Asian philosophical system.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Epistemology in Classical Indian Philosophy', url: 'https://plato.stanford.edu/entries/epistemology-india/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Language and Testimony in Classical Indian Philosophy', url: 'https://plato.stanford.edu/entries/language-india/', kind: 'academic-reference'},
        {label: 'The Early Upaniṣads: Annotated Text and Translation', url: 'https://global.oup.com/academic/product/the-early-upanisads-9780195124354', kind: 'primary-text'},
        {label: 'Nyāya Sūtras of Gautama — registered primary-text edition', url: 'https://archive.org/details/nyayasutrasofgautama00gautuoft', kind: 'primary-text'},
        {label: 'Many schools, shared questions, unfinished routes — registered Museum asset record', url: 'https://github.com/Da3dalusCode/philosophy-museum/blob/4e8587112422ca01c2a3b70b02bcd4e356f529b0/public/assets/museum/classical-south-asian-worlds/south-many-schools-interpretive-panel.webp', kind: 'collection-record'},
      ],
    ),
  },
  'buddhist-philosophy': {
    canonicalTitle: 'Buddhist Philosophy',
    hallId: 'buddhist-philosophies',
    gallery: 'Buddhist Philosophies of Liberation and Knowledge',
    roomId: 'buddhist-many-paths',
    roomTitle: 'Many Buddhist paths and early discourses',
    plaqueInvitation: 'Begin with Buddhist paths, not one creed. Track pain, change, no-self, karma, study, practice, and insight across many communities—while texts, images, tongues, and rites carry disputes, aims, and new hopes for release.',
    principalAsset: {
      id: 'buddhist-wheel-life-dazu',
      title: 'Buddhist Wheel of Life at Baodingshan',
      caption: 'The Baodingshan Wheel of Life gives visual form to impermanence, karma, realms of rebirth, and release.',
      provenance: 'Historic carvers unknown; Southern Song dynasty, 1174–1252; Dazu Rock Carvings, Chongqing; photograph by Laurent Bélanger, 2010. The monument is a Chinese Buddhist visual tradition made many centuries after the historical Buddha.',
      rights: 'CC BY-SA 4.0 photograph. Retain the registered attribution “Laurent Bélanger, photograph of the Buddhist Wheel of Life at Baodingshan, 2010, CC BY-SA 4.0,” including the share-alike license link and source record.',
      alt: 'A large stone Wheel of Life held by a fierce figure at the Dazu rock-carving complex.',
      preview: 'Preserve the complete landscape registered panel without crop or distortion; scale it within the bounded preview so the enclosing figure and the Wheel of Life remain visible together.',
      visualInspection: 'At desktop, verify that the complete monument remains legible beside the opening prose and guide. On narrow screens, verify that the full wheel and figure remain visible and that the Southern Song, Chinese, and CC BY-SA qualifications stay readable.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:f2495c0bdc6b50e3',
      boundary: 'The article remains governed by its own current claim-review lock. This separately reconciled Museum interpretation has a current exhibit lock in the canonical chain and does not reopen or substitute for the article review.',
    },
    interpretation: objectLed(
      'Buddhist Philosophy',
      [
        'Buddhist philosophy names diverse traditions of inquiry and practice that grew from early South Asian communities and moved through many languages, regions, institutions, and material forms. Early discourses organize problems of suffering, impermanence, action, attention, and release, but they are transmitted canons rather than stenographic access to one recoverable speaker. Abhidharma analyses, Madhyamaka arguments, Yogācāra accounts of cognition, pramāṇa debates, and later Tibetan, East Asian, Southeast Asian, and modern traditions develop different vocabularies and priorities. A shared lineage does not erase disagreement over texts, discipline, metaphysics, ritual, authority, or the relation between philosophical analysis and liberative practice.',
        'No-self denies that a permanent, independent self is found among the changing aggregates; it is not the claim that persons, responsibility, memory, suffering, or care are unreal. Dependent arising examines conditioned relations rather than announcing that nothing matters, and karma concerns ethically patterned action without supplying one simple theory of fate. Meditation is equally easy to flatten: across traditions it can include attention training, ethical preparation, concentration, insight, visualization, recitation, and ritual disciplines, not a generic private wellness technique. Buddhist philosophers ask what experience can disclose, how concepts mislead, how compassion and restraint matter, and how analysis itself can serve a path rather than merely furnish a doctrine.',
        'The Baodingshan Wheel of Life is a Southern Song Chinese monument, photographed in 2010, not an image from the Buddha’s lifetime or a universal diagram of every Buddhist philosophy. Its stone wheel, enclosing figure, and rebirth imagery make impermanence, karma, realms, and release visually forceful within one influential tradition. They cannot establish a single Buddhist cosmology, prove an early doctrine, or substitute an image for the differing analyses of no-self and practice. The object instead shows philosophy traveling through devotion, place, carving, and later photography. Keeping the full composition visible matters: it preserves the monument’s local visual argument while asking how a visitor’s first Buddhist image may already select a particular historical world.',
      ],
      [
        {heading: 'Core problems', items: [
          {label: 'No-self', description: 'The analysis that no permanent, independent self is found among changing processes; it does not deny persons, responsibility, or ordinary suffering.'},
          {label: 'Dependent arising', description: 'The claim that phenomena occur through conditions and relations, used in different ways across traditions rather than as a slogan that nothing is real.'},
        ]},
        {heading: 'Paths and arguments', items: [
          {label: 'Abhidharma', description: 'Families of systematic analyses of experience and mental factors that differ among Buddhist schools.'},
          {label: 'Madhyamaka', description: 'A tradition associated with Nāgārjuna that examines emptiness and dependence while resisting both fixed essence and nihilism.'},
          {label: 'Meditation', description: 'A range of disciplined practices embedded in ethical, institutional, and doctrinal settings, not one uniform technique or a synonym for relaxation.'},
        ]},
      ],
      'buddhist-wheel-life-dazu',
      'This Wheel of Life at Baodingshan is a Southern Song Chinese Buddhist monument, not an early portrait or a universal Buddhist diagram. It visualizes one influential tradition’s karma, rebirth, and release imagery; it cannot settle the diverse philosophies, texts, or practices gathered under Buddhism.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Buddha', url: 'https://plato.stanford.edu/entries/buddha/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Mind in Indian Buddhist Philosophy', url: 'https://plato.stanford.edu/entries/mind-indian-buddhism/', kind: 'academic-reference'},
        {label: 'Early Buddhist Discourses (Nikāyas and Āgamas)', url: 'https://suttacentral.net/', kind: 'primary-text'},
        {label: 'Nāgārjuna — Root Verses on the Middle Way', url: 'https://read.84000.co/translation/toh3824.html', kind: 'primary-text'},
        {label: 'Buddhist Wheel of Life at Baodingshan — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Buddhist_Wheel_of_Life.jpg', kind: 'collection-record'},
      ],
    ),
  },
  rationalism: {
    canonicalTitle: 'Rationalism',
    hallId: 'rationalism-mind-nature-system',
    gallery: 'Rationalism: Mind, Nature, and System',
    roomId: 'rationalism-cartesian-foundations',
    roomTitle: 'Cartesian foundations and dualism',
    plaqueInvitation: 'Use “rationalism” with care. Compare reason, inborn ideas, necessity, mind, nature, and order—while tracking disputes, experience, debate, and the late label that never once made these thinkers one shared school at all.',
    principalAsset: {
      id: 'rationalism-cartesian-vortices',
      title: 'Descartes’s mechanical universe of plenum and vortices',
      caption: 'A 1644 illustration visualizes Descartes’s plenum and vortex cosmology.',
      provenance: 'Illustration published in René Descartes’s Principia philosophiae, 1644; Library of Congress, cph.3b46131. It documents one Cartesian natural-philosophical model rather than a self-declared rationalist movement.',
      rights: 'Public Domain Mark 1.0. Retain the registered attribution “Descartes, Principia philosophiae vortex illustration, 1644, Library of Congress. Public Domain Mark 1.0,” with the Commons source record.',
      alt: 'A seventeenth-century diagram fills the cosmos with nested swirling vortices carrying celestial bodies.',
      preview: 'Preserve the complete portrait-oriented registered panel without crop or distortion; scale it within the bounded preview so the nested vortices and celestial bodies remain legible.',
      visualInspection: 'At desktop, verify that the diagram’s fine lines remain readable in the compact object block without crowding the first paragraph. On narrow screens, verify that the full vortex system remains visible and that its Cartesian—not generic rationalist—status is clear.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:e7d944b8a514c111',
      boundary: 'The article remains governed by its own current claim-review lock. This separately reconciled Museum interpretation has a current exhibit lock in the canonical chain and does not reopen or substitute for the article review.',
    },
    interpretation: objectLed(
      'Rationalism',
      [
        '“Rationalism” is a later family name, not a seventeenth-century club whose members announced one program. It can help visitors compare projects that give reason, necessity, innateness, intelligible order, or systematic explanation an ambitious role. Yet Descartes, Spinoza, Leibniz, and Anne Conway disagree sharply about substance, God, mind, body, causation, freedom, and what an adequate explanation requires. Descartes distinguishes thinking from extended created substance; Spinoza argues for one substance; Leibniz develops simple perceiving substances; Conway describes a living and transformable creation. The label earns its place only when it opens those conflicts rather than replacing them with a tidy team portrait.',
        'Reason here is not a magical faculty that works without experience. Descartes combines deduction with experiment, observation, instruments, and mathematical construction; Spinoza’s geometrical presentation does not make every proposition self-validating; Leibniz argues with Locke about experience and disposition; Conway writes through correspondence and intellectual networks that shaped who could publish and be remembered. The later opposition between rationalism and empiricism identifies real questions about sources and justification of knowledge, but it simplifies historical practice after the fact. Writers called empiricists reason beyond immediate sensation, and writers called rationalists appeal to experience. Comparative labels should guide a question, not decide its answer before inquiry begins.',
        'This 1644 vortex sheet belongs to Descartes’s Principia philosophiae. Its ordered swirls make one effort to connect matter, motion, and astronomical appearances visually tangible, but they do not picture a rationalist essence or settle physics. Spinoza, Leibniz, and Conway did not share this cosmology, and later physical criticism exposed its limits. The print is therefore a productive material test: a system can seek intelligible order while remaining answerable to phenomena, instruments, objections, and revision. The full uncropped diagram should stay visible so its dense arrangement reads as a historical model, not as decorative proof that reason alone contains a universe. Ask what a system gains—and risks—when it tries to make nature fully intelligible.',
      ],
      [
        {heading: 'A comparative label', items: [
          {label: 'Later family name', description: 'A historian’s grouping for projects with ambitious roles for reason or intelligible order; it is not seventeenth-century party membership.'},
          {label: 'Innateness', description: 'A disputed claim that some principles or capacities are not acquired from experience in the relevant way; it is not identical with modern genetic claims.'},
        ]},
        {heading: 'Rival systems', items: [
          {label: 'Substance', description: 'A basic reality in early-modern metaphysics: Descartes, Spinoza, Leibniz, and Conway give incompatible accounts of it.'},
          {label: 'Principle of sufficient reason', description: 'Leibniz’s demand that there be an intelligible reason why something is so rather than otherwise; its scope and implications remain contested.'},
        ]},
        {heading: 'Read against a contrast', items: [
          {label: 'Rationalism–empiricism', description: 'A useful but retrospective comparison of epistemological theses, not two sealed camps of reason-only and experience-only thinkers.'},
        ]},
      ],
      'rationalism-cartesian-vortices',
      'This 1644 Cartesian vortex illustration records one proposed mechanical cosmos. It is not a rationalist emblem, evidence that its thinkers agreed, or proof of the model; its value is to show system-building meeting astronomical appearances, criticism, and revision.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Rationalism vs. Empiricism', url: 'https://plato.stanford.edu/archives/spr2006/entries/rationalism-empiricism/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — The Distinction Between Innate and Acquired Characteristics', url: 'https://plato.stanford.edu/entries/innate-acquired/', kind: 'academic-reference'},
        {label: 'René Descartes — Meditations on First Philosophy', url: 'https://hackettpublishing.com/meditations-on-first-philosophy', kind: 'primary-text'},
        {label: 'Baruch Spinoza — Ethics', url: 'https://www.gutenberg.org/ebooks/3800', kind: 'primary-text'},
        {label: 'Descartes’s mechanical universe of plenum and vortices — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Illustration_showing_Descartes%27_mechanical_view_of_a_universe_filled_with_plenum_and_a_system_of_vortexes_that_carries_planets_around_the_sun_LCCN92518505.jpg', kind: 'collection-record'},
      ],
    ),
  },
  empiricism: {
    canonicalTitle: 'Empiricism',
    hallId: 'empiricism-science-political-order',
    gallery: 'Empiricism, Science, and Political Order',
    roomId: 'empiricism-locke-ideas-rights',
    roomTitle: 'Ideas, experience, identity, and rights',
    plaqueInvitation: 'Enter empiricism through experiment. Ask how sense, tools, habit, trust, models, and groups test belief—while later labels, pure observation, and claims that experience stands alone hide its social and political frame today.',
    principalAsset: {
      id: 'empiricism-orrery-lecture-1766',
      title: 'A Philosopher Lecturing on the Orrery',
      caption: 'Wright’s orrery lecture stages observation as instrument, model, explanation, attention, and social trust.',
      provenance: 'Joseph Wright of Derby, A Philosopher Lecturing on the Orrery, c. 1766; Derby Museum and Art Gallery. The painting is interpretive context for public observation, not a scene from the birth of empiricism or a portrait of Locke, Berkeley, or Hume.',
      rights: 'Public Domain Mark 1.0. Retain the registered attribution “Joseph Wright of Derby, A Philosopher Lecturing on the Orrery, c. 1766, Derby Museum and Art Gallery. Public Domain Mark 1.0,” with the Commons source record.',
      alt: 'A lecturer and a mixed-age audience gather around a lamp-lit mechanical model of the solar system in a dark room.',
      preview: 'Preserve the complete landscape registered panel without crop or distortion; scale it within the bounded preview so the lecturer, mixed-age audience, lamp, and mechanical solar-system model remain visible.',
      visualInspection: 'At desktop, verify that the full lamp-lit group remains legible alongside the opening prose. On narrow screens, verify that the entire lecture scene stays visible and that the object’s indirect relation to empiricism is not hidden by the caption or crop.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:1a050bd1282cdcd7',
      boundary: 'The article remains governed by its own current claim-review lock. This separately reconciled Museum interpretation has a current exhibit lock in the canonical chain and does not reopen or substitute for the article review.',
    },
    interpretation: objectLed(
      'Empiricism',
      [
        'Empiricism is a later family name for changing claims about the role of experience in the origin, justification, or testing of belief; it is not one school or a simple record of sensations. Early modern writers called empiricists—Bacon, Locke, Berkeley, and Hume—pursue different problems and reach incompatible conclusions. Locke examines sources and limits of ideas and knowledge; Berkeley uses experience to contest material substance; Hume probes causation, induction, testimony, sentiment, religion, and skepticism. Earlier and later empiricisms also differ. The label is most illuminating when it specifies which role experience is being asked to play instead of treating four centuries as a single anti-reason doctrine.',
        'Observation is never a neutral transcript. It is trained and selected through bodies, senses, instruments, concepts, language, drawings, models, publication, and communities that judge testimony. Bacon’s experimental rhetoric does not promise theory-free facts; Locke’s appeal to experience includes sensation and reflection; Berkeley analyzes learned coordination of vision and touch; Hume distinguishes impressions from ideas while questioning the rational warrant for causal expectation. These arguments make social and political conditions visible as well: who can observe, record, circulate evidence, own property, or have testimony believed affects what becomes public knowledge. Empiricism should therefore not detach experience from mediation, institutions, or power.',
        'Joseph Wright’s 1766 orrery lecture gathers a lecturer and audience around a lamp-lit mechanical solar-system model. The painting stages attention, apparatus, explanation, and shared trust, making observation look public and materially organized. It neither depicts Locke, Berkeley, or Hume nor establishes that British experimental science exhausts empiricism. An orrery is a model, not the heavens themselves; its clarity depends on construction, scale, and a teacher’s performance. The painting can thus sharpen rather than settle the exhibit’s question: when does a mediated representation count as evidence? Its full landscape composition must remain intact so the figures, lamp, and device read as a social scene, not a generic icon of “science.”',
      ],
      [
        {heading: 'Experience, in several roles', items: [
          {label: 'Empiricism', description: 'A family of claims that experience matters to concepts, justification, or inquiry; the relevant role differs among philosophers and periods.'},
          {label: 'Sensation and reflection', description: 'Locke’s two sources of ideas: external sensory experience and awareness of the mind’s own operations.'},
        ]},
        {heading: 'Mediated observation', items: [
          {label: 'Instrument', description: 'A device that extends or organizes perception while introducing calibration, skill, design, and interpretation into what is observed.'},
          {label: 'Testimony', description: 'What others report; Hume treats it as indispensable yet assessable through evidence, credibility, and experience.'},
          {label: 'Habit', description: 'Hume’s name for the learned expectation that carries us from past regularities to future causal inferences without deductive proof.'},
        ]},
      ],
      'empiricism-orrery-lecture-1766',
      'Wright’s 1766 orrery lecture is an interpretive social scene, not a founding event or portrait of an empiricist philosopher. It makes models, instruments, explanation, attention, and trust visible, while reminding visitors that observation is materially and socially mediated.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Ancient and Medieval Empiricism', url: 'https://plato.stanford.edu/entries/empiricism-ancient-medieval/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Rationalism vs. Empiricism', url: 'https://plato.stanford.edu/archives/spr2006/entries/rationalism-empiricism/', kind: 'academic-reference'},
        {label: 'Francis Bacon — Novum Organum', url: 'https://www.gutenberg.org/ebooks/45988', kind: 'primary-text'},
        {label: 'John Locke — An Essay Concerning Human Understanding', url: 'https://www.gutenberg.org/ebooks/10615', kind: 'primary-text'},
        {label: 'A Philosopher Lecturing on the Orrery — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Wright_of_Derby,_The_Orrery.jpg', kind: 'collection-record'},
      ],
    ),
  },
  'german-idealism': {
    canonicalTitle: 'German Idealism',
    hallId: 'german-idealism-afterlives',
    gallery: 'German Idealism & Romantic Afterlives',
    roomId: 'german-idealism-orientation',
    roomTitle: 'Post-Kantian self, activity, and freedom',
    plaqueInvitation: 'Step beyond Kant’s threshold. Compare post-Kantian views of self, nature, freedom, art, time, and reason—while testing labels, rival systems, partners, and a portrait that shows Kant as precursor but never a member.',
    principalAsset: {
      id: 'german-idealism-kant-claessens-portrait',
      title: 'Portrait of Immanuel Kant',
      caption: 'Kant stands at the threshold of German Idealism: a critical precursor whose limits prompted rival post-Kantian systems.',
      provenance: 'Lambertus Antonius Claessens, after a painting attributed on the Rijksmuseum record to C. Vernet; c. 1792–c. 1808; Rijksmuseum, Amsterdam, RP-P-1886-A-10329. This derivative print’s date range extends beyond Kant’s death in 1804.',
      rights: 'CC0 1.0 dedication. Retain the registered attribution “Lambertus Antonius Claessens, after C. Vernet, Portrait of Immanuel Kant, c. 1792–1808, Rijksmuseum. CC0,” with the Commons source record.',
      alt: 'Immanuel Kant appears in profile within an oval frame above a small identifying inscription.',
      preview: 'Preserve the complete portrait-oriented registered panel without crop or distortion; center it within the bounded preview so Kant’s profile, oval frame, and identifying inscription remain visible.',
      visualInspection: 'At desktop, verify that the complete narrow portrait is centered beside the opening prose and guide. On narrow screens, verify that the full print remains visible and that the caption foregrounds Kant’s precursor status, derivative attribution, and broad date range.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:89b46fe0dec01330',
      boundary: 'The article remains governed by its own current claim-review lock. This separately reconciled Museum interpretation has a current exhibit lock in the canonical chain and does not reopen or substitute for the article review.',
    },
    interpretation: objectLed(
      'German Idealism',
      [
        'German Idealism is a contested retrospective family name for overlapping post-Kantian projects of the late eighteenth and early nineteenth centuries, not a doctrine completed by a tidy succession of thinkers. Kant is its critical precursor, not simply one member of an interchangeable school: his accounts of possible experience, freedom, judgment, nature, and the limits of speculative knowledge set problems that successors differently defended, revised, or rejected. Fichte, Schelling, and Hegel pursue rival accounts of self-activity, nature, identity, history, art, social life, and freedom. Reinhold, Jacobi, Hölderlin, women excluded from canonical institutions, translators, editors, students, and later critics also shape the intellectual field and its selective canon.',
        'Idealism here does not mean that a private mind invents physical reality, nor is it merely Berkeleyan immaterialism in German clothing. Fichte investigates the activity through which self-consciousness and obligation become intelligible; Schelling’s changing philosophies of nature, art, identity, and freedom resist reduction to one formula; Hegel links consciousness, recognition, institutions, history, logic, art, religion, and freedom without offering a universal thesis–antithesis–synthesis machine. Their systems can illuminate each other, but they cannot be substituted for one another. Romantic, religious, materialist, existential, neo-Kantian, phenomenological, pragmatist, analytic, and critical receptions repeatedly transform or oppose selected idealist problems rather than simply inherit a finished system.',
        'Claessens’s derivative print of Kant marks a threshold. The Rijksmuseum record attributes its model to C. Vernet and gives a broad c. 1792–c. 1808 range, extending beyond Kant’s death; it is not evidence for a documented sitting or for Kant’s endorsement of later systems. The image can identify the philosopher whose critique made post-Kantian disagreements urgent, but it cannot make him a German Idealist by portraiture. Keeping the full oval print and inscription visible preserves its character as a later graphic object. It directs a precise question back to the gallery: what did successors think Kant left unresolved, and why did answers about self, nature, freedom, history, and reason diverge so sharply?',
      ],
      [
        {heading: 'A contested family', items: [
          {label: 'Post-Kantian', description: 'A historical relation to problems opened by Kant’s critical philosophy, not proof that later thinkers simply repeated Kant or that Kant joined their systems.'},
          {label: 'Transcendental idealism', description: 'Kant’s account of the conditions under which objects can be experienced, not the thesis that a private mind creates the physical world.'},
        ]},
        {heading: 'Rival projects', items: [
          {label: 'Fichte', description: 'Developed changing accounts of self-activity, finite agency, obligation, and the starting point of philosophy.'},
          {label: 'Schelling', description: 'Developed changing philosophies of nature, art, identity, and freedom that cannot be compressed into a single Romantic slogan.'},
          {label: 'Hegel', description: 'Connected consciousness, recognition, institutions, history, logic, art, religion, and freedom without a universal three-step dialectical recipe.'},
        ]},
        {heading: 'Afterlives', items: [
          {label: 'Reception', description: 'Later thinkers inherit, revise, criticize, and repurpose selected idealist problems; the movement has no uncontested roster or clean endpoint.'},
        ]},
      ],
      'german-idealism-kant-claessens-portrait',
      'This derivative print identifies Kant as a critical precursor, not a member by default or an endorser of successor systems. Its attributed model and date range extending beyond 1804 require care; the portrait cannot document a sitting or settle German Idealism’s contested boundaries.',
      [
        {label: 'Internet Encyclopedia of Philosophy — German Idealism', url: 'https://iep.utm.edu/germidea/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Idealism', url: 'https://plato.stanford.edu/entries/idealism/', kind: 'academic-reference'},
        {label: 'Immanuel Kant — Critique of Pure Reason', url: 'https://www.gutenberg.org/ebooks/4280', kind: 'primary-text'},
        {label: 'Johann Gottlieb Fichte — Introductions to the Wissenschaftslehre', url: 'https://www.marxists.org/reference/archive/fichte/works/science-knowledge.htm', kind: 'primary-text'},
        {label: 'Portrait of Immanuel Kant — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Portret_van_Immanuel_Kant,_RP-P-1886-A-10329.jpg', kind: 'collection-record'},
      ],
    ),
  },
};

/** Derived chain-ready interpretations; registration remains Sol’s integration step. */
export const FINAL_WORLD_TRADITIONS_PRIMARY_INTERPRETATIONS:
Readonly<Record<FinalWorldTraditionId, MuseumPrimaryInterpretationEnrichment>> = {
  'indian-philosophy': FINAL_WORLD_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL['indian-philosophy'].interpretation,
  'buddhist-philosophy': FINAL_WORLD_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL['buddhist-philosophy'].interpretation,
  rationalism: FINAL_WORLD_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL.rationalism.interpretation,
  empiricism: FINAL_WORLD_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL.empiricism.interpretation,
  'german-idealism': FINAL_WORLD_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL['german-idealism'].interpretation,
};

/** Derived exact-canonical wall invitations; canonical titles remain owned by the shared plaque contract. */
export const FINAL_WORLD_TRADITIONS_PRIMARY_PLAQUE_INVITATIONS:
Readonly<Record<FinalWorldTraditionId, string>> = {
  'indian-philosophy': FINAL_WORLD_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL['indian-philosophy'].plaqueInvitation,
  'buddhist-philosophy': FINAL_WORLD_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL['buddhist-philosophy'].plaqueInvitation,
  rationalism: FINAL_WORLD_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL.rationalism.plaqueInvitation,
  empiricism: FINAL_WORLD_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL.empiricism.plaqueInvitation,
  'german-idealism': FINAL_WORLD_TRADITIONS_PRIMARY_EXHIBIT_EDITORIAL['german-idealism'].plaqueInvitation,
};
