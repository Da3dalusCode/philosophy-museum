import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumPrimaryInterpretationEnrichment} from './scholasticRationalistPrimaryInterpretationEnrichment';
import type {BranchExhibitEditorialRecord} from './articleClaimReviewBatchBranchExhibitEditorial';

/*
 * Final primary-exhibit reconciliation for seven current claim-reviewed modern
 * fields. The shared interpretation chain registers the enrichment map below;
 * the canonical plaque contract owns the wall invitations.
 */

type VisitorGuideSection = {
  readonly heading: string;
  readonly items: readonly {readonly label: string; readonly description: string}[];
};

type ModernFieldExhibitId =
  | 'pragmatism'
  | 'analytic-philosophy'
  | 'existentialism'
  | 'phenomenology'
  | 'continental-philosophy'
  | 'deontology'
  | 'utilitarianism';

const EXHIBIT_REVIEW_LOCKS_BY_NAME: Readonly<Record<string, `fnv1a64:${string}`>> = {
  Pragmatism: 'fnv1a64:975e01d429fd0a9e',
  'Analytic Philosophy': 'fnv1a64:3be1a2a123a91016',
  Existentialism: 'fnv1a64:3451c54467500006',
  Phenomenology: 'fnv1a64:b45d7d7dfd12cc2c',
  'Continental Philosophy': 'fnv1a64:49a9f047670e211e',
  Deontology: 'fnv1a64:4e3c2dc000dbc0e7',
  Utilitarianism: 'fnv1a64:95c1b6712129794f',
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
    method: 'Reviewed against the current claim-reviewed article, its registered sources, and the registered principal-object record. The exhibit uses an object-led three-paragraph interpretation, an explained visitor guide, a full sourced-article action, preserved provenance and rights, and verified uncropped desktop and narrow-screen presentation.',
    lock: EXHIBIT_REVIEW_LOCKS_BY_NAME[name],
  },
});

/**
 * Handoff-ready, but intentionally unregistered, exhibit copy. Canonical
 * titles are separate from the program’s legacy display names, and each
 * principal-object record preserves the live asset registry rather than
 * creating a replacement image.
 */
export const MODERN_FIELDS_PRIMARY_EXHIBIT_OVERLAY:
Readonly<Record<ModernFieldExhibitId, BranchExhibitEditorialRecord>> = {
  pragmatism: {
    canonicalTitle: 'Pragmatism',
    hallId: 'pragmatism-democratic-inquiry',
    gallery: 'Pragmatism, Science, and Democratic Inquiry',
    roomId: 'pragmatism-peirce-inquiry',
    roomTitle: 'Peirce: signs, fallibilism, and public inquiry',
    plaqueInvitation: 'Trace Pragmatism from Peirce’s map of the earth to habits of inquiry. Ask how consequences clarify ideas, why evidence can correct belief, and how democratic experimentation must confront whose experience, harm, and voice count.',
    principalAsset: {
      id: 'pragmatism-peirce-quincuncial-map-1879',
      title: 'Peirce’s quincuncial projection of the sphere',
      caption: 'Peirce’s projection makes inquiry tangible as a practice of transforming a problem while preserving publicly testable relations.',
      provenance: 'Charles Sanders Peirce; published in the American Journal of Mathematics in December 1879; digitized through the Internet Archive; Commons source record retained.',
      rights: 'Public domain; retain the registered attribution “Charles Sanders Peirce, quincuncial projection, American Journal of Mathematics, 1879. Public domain.”',
      alt: 'A square world map bends the globe into four petal-like corners around a central northern region.',
      preview: 'Preserve the complete registered near-square panel without crop or distortion; scale it within the bounded preview so the central northern region and four petal-like corners remain legible.',
      visualInspection: 'At desktop, check that the compact map and upper-right guide do not crowd the opening prose. On narrow screens, check that the full projection remains readable without turning it into a generic diagram of pragmatism.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:f9b594c2730739db',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately against its registered sources and object record; shared integration must compute the new exhibit lock.',
    },
    interpretation: objectLed(
      'Pragmatism',
      [
        'Pragmatism took recognizable form in late nineteenth-century United States debates about logic, science, evolution, psychology, belief, and community. Charles Sanders Peirce’s pragmatic maxim asks how conceivable practical bearings make an intellectual concept intelligible: a rule for clarifying meaning within inquiry, not a consumer test of usefulness. His accounts of doubt, belief, habit, signs, abduction, and fallibilism connect knowing to action while rejecting final certainty. A well-supported claim can still be revised, but revision requires reasons, evidence, and practices that expose error. Peirce’s long-run community of inquiry is a regulative ideal of self-correction, not a prediction that present consensus has reached truth.',
        'William James made pragmatism publicly influential while developing a distinct account of experience, pluralism, belief, and truth. John Dewey extended inquiry into education, democracy, art, and publics; Jane Addams, George Herbert Mead, W. E. B. Du Bois, Alain Locke, and later thinkers complicate a three-founder story. These projects overlap but do not provide one interchangeable theory of truth. The live question is how consequences, empirical resistance, habits, institutions, and affected experience bear on warranted judgment. Power is unavoidable: a community cannot correct itself if it ignores who can define a problem, whose testimony is discounted, or which costs are kept off the ledger.',
        'Peirce’s 1879 quincuncial projection is a mathematical map of the globe, not a diagram of pragmatism or a visual summary of his semiotics. It gives the exhibit a material connection to a philosopher whose work crossed logic, measurement, and scientific practice. A projection changes how a sphere is represented while preserving selected relations; it cannot prove that inquiry converges, that every reform is experimental, or that a geographical map contains a social theory. Its public-domain record and uncropped composition retain the artifact, while the interpretation returns to a harder question: what forms of testing, criticism, and institutional inclusion make consequences answerable rather than merely convenient?',
      ],
      [
        {heading: 'Meaning and inquiry', items: [
          {label: 'Pragmatic maxim', description: 'Peirce’s rule for clarifying a concept through its conceivable practical bearings, not a license to call any comforting belief true.'},
          {label: 'Fallibilism', description: 'The view that even well-supported conclusions remain open to correction; it requires better evidence and criticism, not permanent indecision.'},
        ]},
        {heading: 'A changing tradition', items: [
          {label: 'William James', description: 'A pragmatist who made plural experience and a controversial account of truth central, without simply repeating Peirce’s logical project.'},
          {label: 'John Dewey', description: 'A philosopher who connected inquiry to education and democratic publics, asking how institutions enable shared problem solving.'},
        ]},
        {heading: 'Public test', items: [
          {label: 'Community of inquiry', description: 'A norm of inquiry in which claims remain answerable to evidence and future criticism; it is not identical with whatever a current majority believes.'},
        ]},
      ],
      'pragmatism-peirce-quincuncial-map-1879',
      'Peirce’s December 1879 quincuncial projection is a mathematical representation of the globe, not a diagram of pragmatism or a theory of signs. Its public-domain map records one part of Peirce’s scientific practice; it cannot prove convergence, democratic inclusion, or a pragmatic account of truth.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Pragmatism', url: 'https://plato.stanford.edu/entries/pragmatism/', kind: 'academic-reference'},
        {label: 'Internet Encyclopedia of Philosophy — Pragmatism', url: 'https://iep.utm.edu/pragmati/', kind: 'academic-reference'},
        {label: 'Charles S. Peirce — Writings, Volume 3', url: 'https://iupress.org/9780253016652/writings-of-charles-s-peirce-a-chronological-edition-volume-3/', kind: 'primary-text'},
        {label: 'William James — Pragmatism', url: 'https://www.gutenberg.org/ebooks/5116', kind: 'primary-text'},
        {label: 'Peirce’s quincuncial projection — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Peirce_Quincuncial_Projection_1879.jpg', kind: 'collection-record'},
      ],
    ),
  },
  'analytic-philosophy': {
    canonicalTitle: 'Analytic Philosophy',
    hallId: 'analytic-traditions',
    gallery: 'Analytic Traditions: Logic, Language, and Analysis',
    roomId: 'analytic-origins-foundations',
    roomTitle: 'Origins in logic, analysis, and reference',
    plaqueInvitation: 'Meet four analytic founders, then question a tidy collage. Follow changing uses of logic, language, science, analysis, and argument—while asking whose work one canon omits and why no portrait set defines a field.',
    principalAsset: {
      id: 'analytic-founders-collage',
      title: 'Founders of analytic philosophy',
      caption: 'Frege, Moore, Russell, and Wittgenstein: a compact visual orientation to several formative analytic projects.',
      provenance: 'A 2022 collage by Wikimedia Commons contributor Dı Gras vas Grinır, assembled from historical portraits of Frege, Moore, Russell, and Wittgenstein; Commons source record retained.',
      rights: 'CC0 1.0 dedication for the collage; retain the registered attribution noting the separately sourced Frege, Moore, Russell, and Wittgenstein portraits and that the collage is dedicated CC0.',
      alt: 'Four-part portrait collage of Gottlob Frege, G. E. Moore, Bertrand Russell, and Ludwig Wittgenstein.',
      preview: 'Preserve the full portrait-oriented four-part collage without crop or distortion; center the narrow panel in the bounded preview so all four sitters remain visible.',
      visualInspection: 'At desktop, check that all four portraits stay legible beside the opening prose. On narrow screens, confirm that centering preserves the complete group and that the object record retains its modern-collage status.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:f7f31a1d6354759b',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately against its registered sources and object record; shared integration must compute the new exhibit lock.',
    },
    interpretation: objectLed(
      'Analytic Philosophy',
      [
        'Analytic philosophy is a family of twentieth- and twenty-first-century methods, institutions, and problems, not a single doctrine called “logic philosophy.” Familiar origin stories connect Frege’s logic and semantics, Moore and Russell’s break with British Idealism, and later work on language and science. Those stories overlap without yielding one founder, method, or national essence. Logical analysis can reveal commitments obscured by grammar; conceptual analysis can distinguish rival uses and implications; formal, empirical, historical, and experimental approaches can each sharpen a problem. Precision is an achievement to be argued for, not a guarantee of political neutrality or philosophical completeness. Analytic work reaches across metaphysics, mind, science, ethics, law, race, gender, and technology.',
        'The history is also one of internal criticism. Logical empiricists tested traditional metaphysics against formal language and science, but later philosophers revived metaphysical projects under different standards. Wittgenstein’s attention to language-games, use, and rule-following redirected many readers away from hidden logical form without making truth or argument disappear. Work on modality, action, ordinary language, feminist philosophy, social epistemology, and experimental practice makes it impossible to reduce the tradition to a single armchair procedure. The analytic–continental contrast is especially unreliable when used to sort people by geography, rigor, politics, or topic. It records institutional histories of curricula, languages, and professional networks, not two sealed intellectual continents.',
        'The displayed 2022 collage gathers Frege, Moore, Russell, and Wittgenstein from separately sourced historical portraits. It orients visitors to several formative projects, but it was not a founding manifesto and cannot establish agreement, one institution, or a complete tradition. Frege’s relation to a later analytic origin narrative is retrospective; Wittgenstein’s posthumously published Philosophical Investigations cannot stand for every later method. The complete portrait-oriented composition should remain visible so the object is read honestly as a modern selection. Its tight four-person canon gives a productive warning: a picture can show which history has become memorable while leaving open which contributors, questions, and inheritances the frame excludes.',
      ],
      [
        {heading: 'Ways of clarifying', items: [
          {label: 'Logical analysis', description: 'A method that makes a claim’s logical form explicit, sometimes through formal notation; it is important but not the whole tradition.'},
          {label: 'Conceptual analysis', description: 'Clarification through distinctions, cases, uses, and implications, not a mechanical machine for discovering definitions from an armchair.'},
        ]},
        {heading: 'Changing methods', items: [
          {label: 'Logical empiricism', description: 'A movement that connected philosophy to formal language and science while criticizing parts of traditional metaphysics.'},
          {label: 'Language-games', description: 'Wittgenstein’s term for the varied practices in which words have use, inviting attention to rules and criteria rather than one hidden essence of language.'},
        ]},
        {heading: 'A boundary to test', items: [
          {label: 'Analytic–continental contrast', description: 'A later institutional contrast that can hide overlapping questions and traditions; it does not neatly sort geography, clarity, politics, or rigor.'},
        ]},
      ],
      'analytic-founders-collage',
      'This 2022 CC0 collage gathers separately sourced portraits of Frege, Moore, Russell, and Wittgenstein. It offers orientation to several formative projects, not evidence of a shared founding manifesto, one uniform method, or a complete analytic canon; the modern composition must remain distinct from its historical source images.',
      [
        {label: 'Internet Encyclopedia of Philosophy — Analytic Philosophy', url: 'https://iep.utm.edu/analytic-philosophy/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Analysis', url: 'https://plato.stanford.edu/entries/analysis/', kind: 'academic-reference'},
        {label: 'Gottlob Frege — On Sense and Reference', url: 'https://www.marxists.org/reference/subject/philosophy/works/ge/frege.htm', kind: 'primary-text'},
        {label: 'Ludwig Wittgenstein — Philosophical Investigations', url: 'https://books.google.com/books?id=vGXWRovhS44C', kind: 'primary-text'},
        {label: 'Founders of analytic philosophy — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:The_founders_of_analytic_philosophy.png', kind: 'collection-record'},
      ],
    ),
  },
  existentialism: {
    canonicalTitle: 'Existentialism',
    hallId: 'phenomenology-existence-embodiment',
    gallery: 'Phenomenology, Existence, and Embodiment',
    roomId: 'existentialism-freedom',
    roomTitle: 'Existentialism: freedom, facticity, and bad faith',
    plaqueInvitation: 'Enter Existentialism through Munch’s earlier crowd. Ask how freedom meets body, history, oppression, uncertainty, responsibility, solidarity, and revolt—without making one painting prove a doctrine or reducing lived existence to private choice or despair.',
    principalAsset: {
      id: 'existentialism-munch-karl-johan',
      title: 'Evening on Karl Johan Street',
      caption: 'Edvard Munch, Evening on Karl Johan Street, 1892: crowd, isolation, and an unsettled public world.',
      provenance: 'Edvard Munch, 1892; KODE Art Museums and Composer Homes, Bergen; Commons source record retained.',
      rights: 'Public domain; retain the registered attribution “Edvard Munch, Evening on Karl Johan Street, 1892. KODE Art Museums and Composer Homes, Bergen. Public domain.”',
      alt: 'Edvard Munch painting of an evening crowd advancing along Karl Johan Street while one dark figure walks apart.',
      preview: 'Preserve the complete landscape painting without crop or distortion; scale it within the bounded preview so the advancing crowd and separated figure remain visible.',
      visualInspection: 'At desktop, check the landscape’s legibility beside the opening prose. On narrow screens, retain the full street scene and make the pre-movement date and object limitation easy to find.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:881ec4b853f6c73e',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately against its registered sources and object record; shared integration must compute the new exhibit lock.',
    },
    interpretation: objectLed(
      'Existentialism',
      [
        'Existentialism names a heterogeneous twentieth-century movement and a wider retrospective family of projects concerned with finite, situated existence. Kierkegaard and Nietzsche are decisive precursors but wrote before the named movement and disagree about faith, value, and selfhood. Husserlian and Heideggerian phenomenology supplied resources that Sartre, Simone de Beauvoir, Merleau-Ponty, and others transformed. The postwar French moment made freedom, responsibility, literature, ethics, and political engagement public questions. Its pressure is that a life must be lived through body, history, relations, and institutions without a complete script that settles commitments in advance.',
        'Freedom is inseparable from facticity: unchosen conditions such as body, past, language, social position, relationships, and law. Sartre’s bad faith examines evasions of that tension, but it is not simply lying and should not make social roles unreal. Beauvoir’s Ethics of Ambiguity insists that freedom becomes ethical in reciprocal relations and under oppression; it cannot excuse blaming people for circumstances they did not create. Camus’s absurd names the confrontation between a demand for final intelligibility and a world that supplies no guarantee; he associated revolt with lucidity and limits while rejecting the existentialist label. These distinctions matter when existential language is used to discuss illness, disability, colonialism, gender, precarious work, or collective crisis.',
        'Munch’s Evening on Karl Johan Street predates existentialism as a named movement. Its crowded public street and isolated dark figure can invite reflection on anxiety, estrangement, and social existence, but the painting is neither a portrait of an existentialist nor an illustration of Sartre, Beauvoir, or Camus. It cannot prove that alienation has one visual form or turn a modern urban scene into a definition of freedom. The full landscape preserves its actual composition rather than treating it as decorative mood. Visitors can feel why existential questions arise in public worlds, then return to arguments about situation, responsibility, other people, solidarity, and revolt that no image of a solitary figure settles.',
      ],
      [
        {heading: 'Existence in situation', items: [
          {label: 'Facticity', description: 'The unchosen body, past, language, relationships, and institutions from which a person acts; it is not fate or an excuse to ignore agency.'},
          {label: 'Situated freedom', description: 'Agency exercised within a field of possibilities one did not wholly choose, rather than unlimited control or passive determination.'},
        ]},
        {heading: 'Difficult terms', items: [
          {label: 'Bad faith', description: 'Sartre’s account of evading the tension between condition and freedom, not merely ordinary lying or proof that social roles are unreal.'},
          {label: 'The absurd', description: 'Camus’s name for the clash between a demand for final intelligibility and a world without such a guarantee; it is not the claim that nothing matters.'},
        ]},
        {heading: 'Ethical pressure', items: [
          {label: 'Ambiguity', description: 'Beauvoir’s term for the unfinished, vulnerable conditions of freedom, requiring attention to reciprocity and oppression rather than heroic individualism.'},
        ]},
      ],
      'existentialism-munch-karl-johan',
      'Munch’s 1892 painting predates existentialism as a named movement. Its advancing crowd and separated figure are a visual companion to anxiety and public existence, not evidence for Sartre, Beauvoir, or Camus, a definition of freedom, or proof that alienation has one universal appearance.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Existentialism', url: 'https://plato.stanford.edu/entries/existentialism/', kind: 'academic-reference'},
        {label: 'Internet Encyclopedia of Philosophy — Existentialism', url: 'https://iep.utm.edu/existent/', kind: 'academic-reference'},
        {label: 'Jean-Paul Sartre — Being and Nothingness', url: 'https://archive.org/details/beingnothingness0000sart', kind: 'primary-text'},
        {label: 'Simone de Beauvoir — The Ethics of Ambiguity', url: 'https://archive.org/details/ethicsofambiguit0000unse', kind: 'primary-text'},
        {label: 'Evening on Karl Johan Street — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Edvard_Munch_-_Evening_on_Karl_Johan_Street_(1892).jpg', kind: 'collection-record'},
      ],
    ),
  },
  phenomenology: {
    canonicalTitle: 'Phenomenology',
    hallId: 'phenomenology-existence-embodiment',
    gallery: 'Phenomenology, Existence, and Embodiment',
    roomId: 'phenomenology-method',
    roomTitle: 'Intentionality, reduction, and lifeworld',
    plaqueInvitation: 'Study Cézanne’s earlier table scene as an invitation to describe appearance. Ask how objects, bodies, time, and shared worlds gain meaning—without treating one painting as proof or attentive description as theory-free sight.',
    principalAsset: {
      id: 'phenomenology-cezanne-still-life',
      title: 'Still Life with Apples and a Pot of Primroses',
      caption: 'Cézanne’s still life lets one scene appear through tensions among profile, depth, color, and point of view.',
      provenance: 'Paul Cézanne, c. 1890; The Metropolitan Museum of Art, 51.112.1; Commons and Met collection records retained.',
      rights: 'CC0 1.0 dedication; retain the registered attribution “Paul Cézanne, Still Life with Apples and a Pot of Primroses, c. 1890, The Metropolitan Museum of Art, 51.112.1. CC0 1.0.”',
      alt: 'A potted primrose, apples, folded cloth, and vessels share a table whose edges and objects shift subtly across viewpoints.',
      preview: 'Preserve the full landscape still life without crop or distortion; scale it within the bounded preview so the primrose, apples, cloth, vessels, and table edges remain visible.',
      visualInspection: 'At desktop, check that the object’s broad composition reads beside the opening prose. On narrow screens, preserve the whole painting and make clear that it predates phenomenology and was not made for Husserl.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:03cd9623d7e277f6',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately against its registered sources and object record; shared integration must compute the new exhibit lock.',
    },
    interpretation: objectLed(
      'Phenomenology',
      [
        'Phenomenology is a family of methods and historical projects that investigates how objects, others, bodies, time, and worlds become meaningful in experience. Edmund Husserl made intentionality, evidence, reduction, constitution, intersubjectivity, and lifeworld central to a modern movement, but later philosophers contested its scope. Intentionality means experience is directed toward something; it does not mean intending to act or guarantee that an object exists as it appears. The epoché, a suspension of the ordinary assumption that the world is simply settled, does not deny the world. It asks how a chair, memory, threat, tool, or other person acquires sense before theory declares what it fundamentally is.',
        'The field changed as Heidegger redirected attention toward being-in-the-world, Sartre and Beauvoir examined freedom and situation, and Merleau-Ponty made embodied perception central. Hermeneutic, ethical, feminist, critical, disability, medical, technological, and environmental phenomenologies question whether neutral consciousness can be the only starting point. A lifeworld is the practical, social, and historical world already presupposed when science turns a room into coordinates or a body into measurements. That does not make science optional; it asks how descriptive and explanatory accounts constrain one another. Phenomenologists disagree over reduction, realism, transcendental idealism, embodiment, interpretation, alterity, and whether first-person description can disclose structural power without making a local standpoint universal.',
        'Cézanne’s Still Life with Apples and a Pot of Primroses predates phenomenology as a named movement and was not painted to illustrate Husserl. Its table, vessels, fruit, color, and shifting viewpoints make it a visual companion to questions about partial appearance and perceptual organization, not proof of a theory. The painting cannot establish intentionality, demonstrate the reduction, or reveal a universal structure of perception. Its full, uncropped composition matters because no isolated apple or tilted edge carries the comparison alone. A still life can show that one scene sustains more than one profile, but phenomenology’s claims about experience require description, debate, and evidence beyond an image.',
      ],
      [
        {heading: 'Describing appearance', items: [
          {label: 'Intentionality', description: 'The directedness of experience toward something; it is not a plan to act and does not guarantee that the intended object exists as it appears.'},
          {label: 'Epoché and reduction', description: 'A suspension used to study how objects acquire sense, not a denial that the world exists or a finished settlement of realism and idealism.'},
        ]},
        {heading: 'A shared world', items: [
          {label: 'Lifeworld', description: 'The embodied, social, and historical world already presupposed by scientific abstraction; it is not an anti-scientific alternative.'},
          {label: 'Embodiment', description: 'The fact that perception and action are lived through bodily orientation and skill, not from a view outside every situation.'},
        ]},
        {heading: 'Open disagreement', items: [
          {label: 'Methodological beginning', description: 'A dispute over whether phenomenology should begin with consciousness, practical involvement, body, interpretation, ethical relation, or critical situation.'},
        ]},
      ],
      'phenomenology-cezanne-still-life',
      'Cézanne’s c. 1890 still life predates phenomenology and was not made for Husserl. Its shifting profiles, table, fruit, cloth, and vessels can accompany patient looking, but the CC0 Met object cannot demonstrate intentionality, reduction, or one universal structure of perception.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Phenomenology', url: 'https://plato.stanford.edu/entries/phenomenology/', kind: 'academic-reference'},
        {label: 'Internet Encyclopedia of Philosophy — Phenomenology', url: 'https://iep.utm.edu/phenom/', kind: 'academic-reference'},
        {label: 'Edmund Husserl — Ideas I', url: 'https://archive.org/details/ideaspertainingt0000huss', kind: 'primary-text'},
        {label: 'Maurice Merleau-Ponty — Phenomenology of Perception', url: 'https://www.routledge.com/Phenomenology-of-Perception/Merleau-Ponty/p/book/9780415834339', kind: 'primary-text'},
        {label: 'Still Life with Apples and a Pot of Primroses — Met collection record', url: 'https://www.metmuseum.org/art/collection/search/435882', kind: 'collection-record'},
      ],
    ),
  },
  'continental-philosophy': {
    canonicalTitle: 'Continental Philosophy',
    hallId: 'critique-power-deconstruction',
    gallery: 'Critique, Power, and Deconstruction',
    roomId: 'continental-orientation',
    roomTitle: 'Continental philosophy as a retrospective family',
    plaqueInvitation: 'Use this map to question a label rather than locate a doctrine. Trace divergent work on history, embodiment, language, power, and critique, then ask how academic boundaries include, exclude, and simplify philosophical inheritances.',
    principalAsset: {
      id: 'critique-continental-europe-orthographic',
      title: 'Europe in orthographic projection',
      caption: 'A geographical map opens a gallery whose first warning is that “continental philosophy” is not a doctrine fixed by a continent.',
      provenance: 'Map initiated on 7 January 2009 by Ssolbergj and later map editors; current Commons revision; Commons source record retained.',
      rights: 'GFDL 1.2 or later; retain the registered attribution “Ssolbergj and contributors, Europe (orthographic projection), Wikimedia Commons. GFDL 1.2 or later.”',
      alt: 'An orthographic globe map highlights Europe in green against surrounding gray land and blue water.',
      preview: 'Preserve the complete square map without crop or distortion; scale it within the bounded preview so Europe and surrounding context remain visible.',
      visualInspection: 'At desktop, the map should remain a compact orientation object rather than overpowering the prose. On narrow screens, check that the limitation against geographical essentialism is visible before the object can be misread as a doctrine map.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:ef74afb9a56fa5e5',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately against its registered sources and object record; shared integration must compute the new exhibit lock.',
    },
    interpretation: objectLed(
      'Continental Philosophy',
      [
        '“Continental philosophy” is a retrospective, institutionally shaped umbrella, used chiefly in Anglophone contrasts with analytic philosophy. German Idealism, Marx, and Nietzsche provide distinct arguments about history, freedom, labor, value, and interpretation. Phenomenology, existentialism, and hermeneutics transformed questions about consciousness, world, embodiment, freedom, and understanding. Frankfurt School critical theory joined philosophy to social research around capitalism, culture, authoritarianism, reason, and emancipation. Structuralism, genealogy, post-structuralism, deconstruction, feminist, queer, critical race, and decolonial critique reworked language, discourse, subject formation, difference, and power while challenging the inherited canon itself.',
        'The umbrella is useful only if its disagreements stay visible. Historicity asks how concepts, institutions, and forms of understanding are shaped by time and social conditions; it does not discredit a claim by itself. Critique can be dialectical, phenomenological, hermeneutic, Marxist, feminist, genealogical, or deconstructive, and these practices do not share one standard of evidence or political conclusion. Accounts of power also differ: production, ideology, recognition, discipline, colonial history, norms, and discourse are not synonyms. The task is to connect lived experience to institutions and history without letting one explanation swallow embodied agency, political economy, social struggle, interpretation, or truth. The label’s European canon is an object of criticism, not a neutral map of philosophy.',
        'This orthographic map highlights Europe in green, but geography cannot establish a common doctrine or draw a clean line around thinkers conventionally filed under this label. The map was initiated in 2009 and is a contemporary orientation device, not a source for phenomenology, critical theory, or deconstruction. Its square, uncropped composition makes surrounding regions visible, which matters because “continental” should not turn a continent into a sealed intellectual container. Nor does it establish opposition to analytic work: the division developed through languages, curricula, publication networks, and retrospective classification. The map asks visitors to notice how a useful shorthand can include some histories, marginalize others, and obscure transnational routes through which critique, feminism, anticolonial thought, and philosophy moved.',
      ],
      [
        {heading: 'A label under pressure', items: [
          {label: 'Retrospective umbrella', description: 'A later category that gathers diverse lineages without proving they shared one institutional identity, method, or political program.'},
          {label: 'Historicity', description: 'Attention to the temporal and social conditions that make concepts and institutions intelligible, authoritative, or open to challenge.'},
        ]},
        {heading: 'Practices of critique', items: [
          {label: 'Critique', description: 'Methods for examining conditions, exclusions, limits, and effects; phenomenological, Marxist, feminist, genealogical, and deconstructive versions differ substantially.'},
          {label: 'Power and subject formation', description: 'Ways practices, institutions, material relations, norms, and discourse shape conduct and identities without making resistance or truth impossible.'},
        ]},
        {heading: 'Read without flattening', items: [
          {label: 'Analytic–continental contrast', description: 'An institutional classification that can illuminate real histories but cannot reliably sort people by continent, rigor, topic, clarity, or politics.'},
        ]},
      ],
      'critique-continental-europe-orthographic',
      'This 2009-initiated orthographic map highlights Europe but is not evidence that geography fixes a doctrine, canon, or method. The GFDL map is an orientation device for a retrospective label; it cannot establish a clean analytic–continental division or contain transnational feminist, anticolonial, and decolonial routes.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Continental Feminism', url: 'https://plato.stanford.edu/entries/femapproach-continental/', kind: 'academic-reference'},
        {label: 'Internet Encyclopedia of Philosophy — Continental Philosophy topic archive', url: 'https://iep.utm.edu/category/continental/', kind: 'academic-reference'},
        {label: 'A Companion to Continental Philosophy', url: 'https://onlinelibrary.wiley.com/doi/book/10.1002/9781405164538', kind: 'academic-reference'},
        {label: 'G. W. F. Hegel — The Phenomenology of Spirit', url: 'https://www.cambridge.org/core/books/georg-wilhelm-friedrich-hegel-the-phenomenology-of-spirit/6FEDB42FDEF2E5FF97FEAE0EEEDABE8E', kind: 'primary-text'},
        {label: 'Europe in orthographic projection — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Europe_(orthographic_projection).svg', kind: 'collection-record'},
      ],
    ),
  },
  deontology: {
    canonicalTitle: 'Deontology',
    hallId: 'moral-life-practical-reason',
    gallery: 'Moral Life & Practical Reason',
    roomId: 'moral-duty-consequence',
    roomTitle: 'Duty, respect, consequences, and welfare',
    plaqueInvitation: 'Look at an oath’s drama of role and sacrifice without mistaking it for Kant’s theory. Ask what duties, rights, respect, and reasons constrain action when promising outcomes tempt us to use one person for another.',
    principalAsset: {
      id: 'moral-deontology-oath-horatii',
      title: 'Oath of the Horatii',
      caption: 'An oath dramatizes commitment, role, conflict, and sacrifice without deciding which obligation is justified.',
      provenance: 'Jacques-Louis David with Anne-Louis Girodet, 1786, after David’s 1784 composition; Toledo Museum of Art; Commons source record retained.',
      rights: 'Public domain; retain the registered attribution “Jacques-Louis David with Anne-Louis Girodet, Oath of the Horatii, 1786, Toledo Museum of Art. Public domain.”',
      alt: 'Three armed brothers extend their hands toward swords held by their father while grieving women and children sit to one side.',
      preview: 'Preserve the complete landscape painting without crop or distortion; scale it within the bounded preview so the brothers, swords, father, women, and children remain visible.',
      visualInspection: 'At desktop, verify the full scene remains readable beside the prose. On narrow screens, preserve the compositional tension and make the correction to “Kant illustration” available before visitors infer a single moral lesson.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:665610053c3c5992',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately against its registered sources and object record; shared integration must compute the new exhibit lock.',
    },
    interpretation: objectLed(
      'Deontology',
      [
        'Deontology is a family of normative ethical theories that treats some actions as required, forbidden, or permitted for reasons not exhausted by producing the best aggregate outcome. It asks whether duties, rights, respect, special obligations, and the form of an action have independent authority when an attractive outcome invites using one person for another. Immanuel Kant is central to modern deontological ethics, but deontology is broader than Kant and than a context-free rulebook. Rights theories, agent-centered constraints, contractualist tests, plural duties, and threshold views disagree about why constraints bind and what happens when they conflict.',
        'Kant’s Groundwork links moral worth to acting from duty through a law one can rationally will. The universal-law, humanity, and realm-of-ends formulations are formulations of one categorical imperative, but their relation and application remain disputed; they are not detached rules. In Kantian terms, respect for persons is not consumer choice or self-sufficiency. Agency depends on education, care, material security, and freedom from domination. W. D. Ross’s pluralism develops prima facie duties—such as fidelity, reparation, justice, beneficence, and nonmaleficence—that can conflict and require judgment about actual duty. Contemporary deontologists debate permissions, doing versus allowing, absolute constraints, thresholds, institutional responsibility, and whether moral reasons must be justifiable to each affected person.',
        'David and Girodet’s 1786 Oath of the Horatii stages armed brothers extending their hands toward swords held by their father while women and children grieve beside them. It dramatizes commitment, civic role, conflict, sacrifice, and unequal burdens, but it is not an illustration of Kant and civic sacrifice is not deontology as such. The painting cannot decide which oath is justified, whether a person may be used for a collective goal, or how duty conflicts with care and consequence. Its full composition also presents those affected by its demand. It tests what is owed to particular people when loyalty, role, suffering, and expected results point in competing directions.',
      ],
      [
        {heading: 'Why constraints matter', items: [
          {label: 'Deontological constraint', description: 'A limit on action grounded in respect, rights, agency, or duty, even when violating it might improve an aggregate outcome.'},
          {label: 'Patient-centered right', description: 'A claim protecting a person from being used or harmed in particular ways, rather than simply a benefit to add to a social total.'},
        ]},
        {heading: 'Kant and beyond', items: [
          {label: 'Categorical imperative', description: 'Kant’s test of moral law through universalizability and respect for humanity, not a menu of unrelated mechanical decision rules.'},
          {label: 'Prima facie duty', description: 'Ross’s term for a real moral reason that can conflict with others; judgment determines what a person’s actual duty is in a case.'},
        ]},
        {heading: 'A live conflict', items: [
          {label: 'Threshold', description: 'The disputed idea that normally binding constraints may yield when stakes become extreme, raising hard questions about where any limit lies.'},
        ]},
      ],
      'moral-deontology-oath-horatii',
      'David and Girodet’s 1786 Oath of the Horatii dramatizes civic role, oath, conflict, sacrifice, and unequal burdens. It is not an illustration of Kant or deontology, and the public-domain painting cannot decide which obligation is justified or whether a collective end permits using another person.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — Deontological Ethics', url: 'https://plato.stanford.edu/entries/ethics-deontological/', kind: 'academic-reference'},
        {label: 'Immanuel Kant — Groundwork of the Metaphysics of Morals', url: 'https://www.gutenberg.org/ebooks/5682', kind: 'primary-text'},
        {label: 'W. D. Ross — The Right and the Good', url: 'https://global.oup.com/academic/product/the-right-and-the-good-9780198244912', kind: 'primary-text'},
        {label: 'The Oxford Handbook of Deontological Ethics', url: 'https://doi.org/10.1093/oxfordhb/9780199671889.001.0001', kind: 'academic-reference'},
        {label: 'Oath of the Horatii — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg', kind: 'collection-record'},
      ],
    ),
  },
  utilitarianism: {
    canonicalTitle: 'Utilitarianism',
    hallId: 'moral-life-practical-reason',
    gallery: 'Moral Life & Practical Reason',
    roomId: 'moral-duty-consequence',
    roomTitle: 'Duty, respect, consequences, and welfare',
    plaqueInvitation: 'Meet Sidgwick as one systematizer, not the whole tradition. Ask how impartial concern for welfare guides action and institutions while choices about value, uncertainty, distribution, rights, demandingness, and future people remain contested.',
    principalAsset: {
      id: 'moral-utilitarian-sidgwick-portrait',
      title: 'Henry Sidgwick',
      caption: 'Sidgwick represents a rigorous Victorian systematization of utilitarian reasoning and its unresolved dualism of practical reason.',
      provenance: 'Unknown photographer, before 1900; National Portrait Gallery, London, NPG x17393; Commons source record retained.',
      rights: 'Public domain; retain the registered attribution “Unknown photographer, Henry Sidgwick, before 1900, National Portrait Gallery, London. Public domain.”',
      alt: 'A bearded Henry Sidgwick faces the camera in a dark jacket in a monochrome quarter-length portrait.',
      preview: 'Preserve the full portrait-oriented photograph without crop or distortion; center the narrow panel in the bounded preview so Sidgwick’s quarter-length figure remains visible.',
      visualInspection: 'At desktop, check that the portrait and compact guide do not crowd the opening prose. On narrow screens, center the full figure and ensure the object record says that Sidgwick is one major systematizer, not the sole founder or final authority.',
    },
    articleReview: {
      status: 'claim-reviewed',
      reviewedOn: '2026-08-10',
      articleLock: 'fnv1a64:87e051f44614feca',
      boundary: 'The article’s claim review is current. This Museum interpretation is reconciled separately against its registered sources and object record; shared integration must compute the new exhibit lock.',
    },
    interpretation: objectLed(
      'Utilitarianism',
      [
        'Utilitarianism is a family of consequentialist theories organized around impartial concern for the well-being of those affected. Classical versions identify welfare with pleasure and the absence of pain; later versions appeal to preferences, objective goods, or plural values. A utilitarian view combines an account of welfare, equal consideration of each affected interest, and a requirement to promote the best available outcome. The classical tradition takes systematic form in Jeremy Bentham’s 1789 Introduction to the Principles of Morals and Legislation, connecting pleasure and pain to a reforming standard for law and policy. Bentham’s felicific dimensions identify questions for comparison, but do not solve interpersonal comparison, uncertainty, distribution, or institutional trust.',
        'John Stuart Mill revised the tradition through qualitative pleasures, individuality, liberty, justice, and social reform; Henry Sidgwick gave it a rigorous nineteenth-century systematization. Later utilitarians disagree about whether acts, rules, motives, institutions, or decision procedures are assessed directly. They also disagree over hedonism, preference satisfaction, objective-list value, expected consequences, demandingness, rights, animals, future people, and population. Rule and indirect approaches ask which practices best promote welfare under limited knowledge and bias. The hardest objections concern whether a favorable total can permit unfair distribution, betrayal, coercion, or sacrifice. They press utilitarianism to explain how impartial concern recognizes people who live with policy burdens.',
        'The displayed lifetime portrait of Henry Sidgwick, taken before 1900 by an unknown photographer, gives historical presence to one major Victorian systematizer. It cannot show the content of his Methods of Ethics, prove a solution to the dualism of practical reason, or make him the sole founder or final word of utilitarianism. A single thinker’s face cannot settle a theory whose arguments range from Bentham’s legislation and Mill’s liberty to worries about distribution, rights, nonhuman welfare, and distant futures. The exhibit asks: how should preventable good and harm be weighed when every measure of welfare leaves something ethically significant at risk?',
      ],
      [
        {heading: 'The basic commitment', items: [
          {label: 'Impartial concern', description: 'Each affected person’s welfare counts without automatic priority for the agent’s own interest; this distinguishes utilitarianism from egoism.'},
          {label: 'Welfare', description: 'What makes a life go well; hedonist, preference, objective-list, and plural accounts disagree, changing what should be promoted.'},
        ]},
        {heading: 'Different applications', items: [
          {label: 'Act and rule approaches', description: 'Competing views about whether individual choices or practices and rules are assessed most directly, especially under limited information.'},
          {label: 'Expected consequences', description: 'An approach that weighs likely outcomes under uncertainty rather than pretending agents can know every result in advance.'},
        ]},
        {heading: 'Pressure from justice', items: [
          {label: 'Distribution and rights', description: 'Questions about whether a favorable total can still impose unfair burdens, betrayal, coercion, or sacrifice on particular people.'},
          {label: 'Demandingness', description: 'The concern that maximizing welfare may require more sacrifice from agents than ordinary moral life can plausibly demand.'},
        ]},
      ],
      'moral-utilitarian-sidgwick-portrait',
      'This public-domain lifetime photograph shows Henry Sidgwick before 1900, though its photographer and exact date are unknown. It provides biographical context for one major systematizer; it cannot display the Methods of Ethics, resolve practical reason’s dualism, or make Sidgwick the sole founder or final authority of utilitarianism.',
      [
        {label: 'Stanford Encyclopedia of Philosophy — The History of Utilitarianism', url: 'https://plato.stanford.edu/entries/utilitarianism-history/', kind: 'academic-reference'},
        {label: 'Stanford Encyclopedia of Philosophy — Consequentialism', url: 'https://plato.stanford.edu/entries/consequentialism/', kind: 'academic-reference'},
        {label: 'Jeremy Bentham — An Introduction to the Principles of Morals and Legislation', url: 'https://www.gutenberg.org/ebooks/20084', kind: 'primary-text'},
        {label: 'John Stuart Mill — Utilitarianism', url: 'https://www.gutenberg.org/ebooks/11224', kind: 'primary-text'},
        {label: 'Henry Sidgwick — registered collection record', url: 'https://commons.wikimedia.org/wiki/File:Henry_Sidgwick_National_Portrait_Gallery.png', kind: 'collection-record'},
      ],
    ),
  },
};

/** Exact canonical invitations consumed by the shared plaque contract. */
export const MODERN_FIELDS_PRIMARY_PLAQUE_INVITATIONS = Object.fromEntries(
  Object.entries(MODERN_FIELDS_PRIMARY_EXHIBIT_OVERLAY).map(([id, record]) => [id, record.plaqueInvitation]),
) as Readonly<Record<string, string>>;

/** Final enrichment map consumed by the shared interpretation chain. */
export const MODERN_FIELDS_PRIMARY_INTERPRETATIONS = Object.fromEntries(
  Object.entries(MODERN_FIELDS_PRIMARY_EXHIBIT_OVERLAY).map(([id, record]) => [id, record.interpretation]),
) as Readonly<Record<string, MuseumPrimaryInterpretationEnrichment>>;
