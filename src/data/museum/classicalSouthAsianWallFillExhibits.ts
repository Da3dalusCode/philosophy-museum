import type {MuseumSupplementalExhibit} from './platoSupplementalExhibits';
import type {MuseumAssetId} from './museumAssetTypes';
import type {MuseumSupplementalExhibitId} from './museumWorldTypes';

type WallFillInput = {
  id: MuseumSupplementalExhibitId;
  assetId: MuseumAssetId;
  displayName: string;
  shortTitle: string;
  workLabel: string;
  dateLabel: string;
  question: string;
  frontSubtitle: string;
  lead: string;
  keyIdeas: readonly [string, string, string];
  cautions: readonly [string, string];
  sections: readonly [
    {heading: string; paragraph: string},
    {heading: string; paragraph: string},
    {heading: string; paragraph: string},
  ];
  imageSource: {label: string; url: string};
  reference: {label: string; url: string; kind?: 'academic-reference' | 'collection-record'};
  articleRoute: Extract<NonNullable<MuseumSupplementalExhibit['articleRoute']>, {kind: 'philosopher'}>;
  entityKind: 'philosopher' | 'branch';
};

const remainingReviewEvidence: Record<string, {
  plaqueTitle: string;
  invitation: string;
  objectInterpretation: string;
  objectSource?: {label: string; url: string};
  detail: readonly [string, string, string];
  resolution: string;
  lock: string;
}> = {
  'nyaya-argument-before-authority': {
    plaqueTitle: 'Two Scholars Quarreling',
    invitation: 'A later Persian scene of two physicians before a king serves only as a proxy while Kaṇāda’s intellectual context asks how reasons withstand structured challenge.',
    objectInterpretation: 'Walters W.609.25A depicts two physicians quarreling before a king in a Persian literary manuscript. It is neither a Nyāya–Vaiśeṣika debate nor evidence for how classical Indian arguments were staged.',
    objectSource: {label: 'Walters Art Museum — Two Scholars Quarreling, W.609.25A', url: 'https://art.thewalters.org/object/W.609.25A/'},
    detail: [
      'The Walters identifies Nizami Ganjavi as author, Yar Muhammad al-Haravi as scribe, and ʿAbd al-Wahhab ibn ʿAbd al-Fattah ibn ʿAli as artist. The text was completed in 1516, while the miniature was repainted in the eighteenth-century Safavid period. The museum describes two physicians quarreling before a king, not generic philosophers in a documented Indian debate.',
      'The work’s geography spans Persian manuscript production and later repainting, with Walters fields naming India and Afghanistan; one definite place of manufacture would overstate the record. Its provenance passes through named owners before Henry Walters and the museum, and the collection image is CC0.',
      'The comparison remains useful only because its limit is explicit. Social confrontation can prompt visitors to notice objections and accountability, but the philosophical structure comes from independently sourced Indian epistemology rather than the painted story.',
    ],
    resolution: 'Resolved: verified Walters W.609.25A, corrected the scene to two physicians before a king, restored author/scribe/artist/date/provenance limits and CC0 rights, and retained it only as an explicit proxy at its natural ratio.',
    lock: 'fnv1a64:6473e7e113e85119',
  },
  'nyaya-spitzer-philosophy-fragments': {
    plaqueTitle: 'SHT 810 Verified Fact Map',
    invitation: 'A code-native map follows only verified facts about SHT 810 while declaring that it reproduces no manuscript image, fragment, folio, or join.',
    objectInterpretation: 'This contemporary Museum diagram links SHT 810’s Kizil discovery context, fragmentary form, and Berlin holding. It is interpretation rather than manuscript evidence and makes no claim to show a leaf, a reconstructed folio, or any authenticated fragment pixels.',
    detail: [
      'The Austrian Science Fund identifies the Spitzer manuscript as SHT 810, discovered at Kizil during the third Prussian Turfan expedition in 1906 and held by the Oriental Department of the Staatsbibliothek zu Berlin. The installed image is a deterministic Museum diagram of those reported relationships, not a photograph supplied by either institution.',
      'The same research record describes about one thousand mostly small, difficult fragments and assigns the manuscript to the third century on palaeographic grounds. It identifies the unique surviving work as a noncanonical Abhidharma tract. The panel repeats only that bounded account; it does not infer a radiocarbon range, intact leaf, fragment order, folio number, or reconstruction.',
      'The record reports that the tract includes a discussion of the Vaiśeṣika theory of qualities, or guṇa. That makes the witness relevant to Kaṇāda’s intellectual context without turning it into the Vaiśeṣika Sūtra, attributing its author to Kaṇāda’s school, or treating the diagram as primary manuscript evidence.',
    ],
    resolution: 'Resolved: installed a code-native fact map based on the FWF institutional research record and labeled the image, plaque, caption, alt text, provenance, and interpretation as non-manuscript evidence.',
    lock: 'fnv1a64:d10d38eda1607d9a',
  },
  'nyaya-smoke-fire-inference': {
    plaqueTitle: 'Winter Haze over Northern India',
    invitation: 'A 2021 MODIS haze image tests how cautiously visible signs should be read before Kaṇāda’s realist context turns to the classical inference from smoke to fire.',
    objectInterpretation: 'NASA’s record describes winter haze and a pollution-trapping inversion, not visible active fires. The image is a modern prompt about uncertain signs; the classical smoke-fire example comes from textual sources.',
    objectSource: {label: 'NASA MODIS — Fire and Smoke in India, acquired 24 February 2021', url: 'https://modis.gsfc.nasa.gov/gallery/individual.php?db_date=2021-02-28'},
    detail: [
      'The installed public-domain NASA image was acquired on 24 February 2021 by MODIS and shows a broad gray winter haze south of the Himalayas. NASA’s factual description emphasizes pollution trapped by a temperature inversion rather than an observed active fire-and-smoke pair. Its page is inconsistent about Terra versus Aqua, so the exhibit names the MODIS Land Rapid Response Team without choosing a platform.',
      'This correction changes the image’s evidentiary role. A viewer cannot point to the haze and claim the classical example is literally pictured. Instead, the difficulty of interpreting a large atmospheric field makes a better prompt: a visible sign may admit smoke, dust, haze, steam, scale, or other explanations, and responsible inference depends on background conditions and defeaters.',
      'The stock movement from smoke to fire belongs to independent Nyāya and wider Indian epistemological discussions. The modern satellite view contributes uncertainty and visual scale, while the philosophical sources establish sign, target, pervasion, application, counterexample, and school-level disagreement.',
    ],
    resolution: 'Resolved: corrected the installed NASA scene from active fire and smoke to winter haze, preserved federal public-domain credit, exposed the Terra/Aqua inconsistency, remapped the classical inference to textual sources, and matched the mount ratio.',
    lock: 'fnv1a64:470dd4d3325ed603',
  },
  'yoga-six-yogis-banyan': {
    plaqueTitle: 'Six Yogis Meditate under a Banyan',
    invitation: 'An anonymous seventeenth-century painting makes ascetic practice communal and embodied while Patañjali’s Yoga remains only one tradition within this much wider visual afterlife.',
    objectInterpretation: 'The anonymous c. 1640 painting, San Diego Museum of Art 1990.355, visualizes six ascetics in community. It postdates the Yoga Sūtra by centuries and does not identify its figures as Pātañjala practitioners.',
    detail: [
      'The installed image matches an anonymous Indian painting commonly titled Six Yogis Meditate under a Banyan, c. 1640, in the San Diego Museum of Art’s Edwin Binney 3rd Collection, accession 1990.355. The source records the gift of Dr. and Mrs. Edwin Binney 3rd. Commons marks the faithful reproduction of the public-domain painting with Public Domain Mark 1.0, and the complete portrait composition is preserved.',
      'The scene makes varied bodies, vessels, books, setting, and proximity visible, correcting a text-only account of practice. It nevertheless supplies no lineage labels, named teachers, or evidence that the six figures follow Patañjali. “Yogi” covers wider ascetic, devotional, courtly, and vernacular histories than the Pātañjalayogaśāstra alone.',
      'The relationship is consequently one of reception and context. The painting can show that discipline was represented as social as well as solitary, while the Yoga Sūtra and scholarship establish claims about mental fluctuation, ethics, posture, concentration, and liberation.',
    ],
    resolution: 'Resolved: verified the anonymous c. 1640 San Diego painting, accession and Binney gift provenance, qualified its PDM reproduction rights, kept it outside automatic Pātañjala ownership, and retained its natural portrait ratio.',
    lock: 'fnv1a64:ed6869b86cda2fbd',
  },
  'yoga-posture-inner-heat': {
    plaqueTitle: 'Ascetic Deity',
    invitation: 'A tenth- or eleventh-century ascetic deity with crossed legs and a meditation strap provides bounded context for embodied discipline without becoming an image of Patañjali.',
    objectInterpretation: 'Walters 25.255 is an ascetic deity from Madhya Pradesh, possibly a divinized guru or Agni. Its crossed posture and strap support cautious comparison, not identification with Patañjali or a Yoga Sūtra practice.',
    objectSource: {label: 'Walters Art Museum — Ascetic Deity, 25.255', url: 'https://art.thewalters.org/object/25.255/'},
    detail: [
      'The installed image matches Walters Art Museum 25.255, a pink-sandstone Ascetic Deity from Madhya Pradesh dated to the tenth–eleventh century. The bearded four-armed figure sits with crossed legs held by a strap. Walters cautiously proposes a divinized guru or Agni rather than the earlier categorical label “Śaiva deity.” The Commons photograph is CC BY-SA 3.0 and remains mounted at its full portrait ratio.',
      'Recorded provenance runs from the Doris Wiener Gallery through a 1993 Sotheby’s sale to John and Berthe Ford, whose 2004 gift brought it to the Walters. Those material facts matter because they separate what the object record establishes—form, material, place, date range, collection history, and uncertain iconography—from philosophical comparison.',
      'Posture and strap make sustained embodied discipline visible, but the sculpture does not illustrate a particular Yoga Sūtra aphorism, prove “inner heat,” or depict Patañjali. Comparison must preserve differences among Śaiva, yogic, ritual, and ascetic contexts while textual sources support claims about Pātañjala practice.',
    ],
    resolution: 'Resolved: adopted the Walters title, tenth–eleventh-century date, Madhya Pradesh origin, uncertain guru-or-Agni identification and provenance, retained the installed CC BY-SA image, and bounded comparison at its natural ratio.',
    lock: 'fnv1a64:ad5e70ccb70e4ad1',
  },
  'yoga-asavari-ascetic-princess': {
    plaqueTitle: 'Asavari Ragini',
    invitation: 'A c. 1650 Bikaner Ragamala painting presents an ascetic princess among snakes while careful comparison keeps its musical genre distinct from Patañjali’s Yoga.',
    objectInterpretation: 'Cleveland 2018.190 is a c. 1650 Ragamala painting titled Asavari Ragini. Its ascetic princess broadens visual questions of discipline and gender but is not a portrait or Pātañjala document.',
    objectSource: {label: 'Cleveland Museum of Art — Ascetic Princess with Snakes in a Wilderness: Asavari Ragini, 2018.190', url: 'https://www.clevelandart.org/art/2018.190'},
    detail: [
      'The installed CC0 image matches Cleveland Museum of Art 2018.190, Ascetic Princess with Snakes in a Wilderness: Asavari Ragini, from a Ragamala. The museum dates the anonymous Bikaner painting to c. 1650, superseding the Commons description’s 1640 date. Its gum tempera and gold on paper entered Cleveland through purchase and partial gift from the Catherine and Ralph Benkaim Collection with the Severance and Greta Millikin Purchase Fund.',
      'The title and object record establish a Ragamala work whose central princess practices ascetic disciplines among water snakes. That does not make her a portrait, historical practitioner, or illustration of the Yoga Sūtra. Preserving the artistic and musical genre prevents a compelling female figure from being recruited into a lineage the object does not name.',
      'The comparison still matters. A gallery dominated by male sages can mistake its own image selection for the historical whole. Asavari Ragini invites questions about gender, visibility, patronage, and ascetic imagination, while the caution prevents representation from becoming evidence of equal institutional access or a single Yoga tradition.',
    ],
    resolution: 'Resolved: followed Cleveland’s c. 1650 date and full object title, recorded anonymous maker, Bikaner origin, acquisition provenance and CC0 rights, preserved the Ragamala genre, and retained the natural ratio.',
    lock: 'fnv1a64:c255168814dcfb80',
  },
};

const wallFill = (input: WallFillInput): MuseumSupplementalExhibit => {
  const evidence = remainingReviewEvidence[input.id];
  if (!evidence) throw new Error(`Missing Gallery 04 evidence review for ${input.id}.`);
  const contentReviewedOn = input.id === 'nyaya-spitzer-philosophy-fragments' || input.id === 'yoga-asavari-ascetic-princess'
    ? '2026-08-22'
    : '2026-08-12';
  const desktopReviewedOn = contentReviewedOn;
  const mobileReviewedOn = input.id === 'nyaya-spitzer-philosophy-fragments' ? '2026-08-22' : '2026-08-12';
  const stagedReviewedOn = contentReviewedOn;
  const imageId = `${input.id}-image`;
  const referenceId = `${input.id}-reference`;
  const objectId = `${input.id}-object`;
  const articleTitle = input.articleRoute.kind === 'philosopher' && input.articleRoute.philosopherId === 'patanjali' ? 'Patañjali' : 'Kaṇāda';
  return ({
  id: input.id,
  displayName: input.displayName,
  shortTitle: input.shortTitle,
  workLabel: input.workLabel,
  dateLabel: input.dateLabel,
  question: input.question,
  frontSubtitle: input.frontSubtitle,
  lead: input.lead,
  keyIdeas: input.keyIdeas,
  cautions: input.cautions,
  sections: [
    {heading: '', paragraphs: [`${input.lead} ${evidence.detail[0]} ${input.sections[0].paragraph}`], sourceIds: [imageId, ...(evidence.objectSource ? [objectId] : []), referenceId]},
    {heading: '', paragraphs: [`${input.sections[1].paragraph} ${evidence.detail[1]} ${input.keyIdeas.join(' ')}`], sourceIds: [referenceId, ...(evidence.objectSource ? [objectId] : []), imageId]},
    {heading: '', paragraphs: [`${input.sections[2].paragraph} ${evidence.detail[2]} ${input.cautions.join(' ')}`], sourceIds: [referenceId, imageId, ...(evidence.objectSource ? [objectId] : [])]},
  ],
  visitorGuide: [
    {heading: 'Reading the installed object', items: [
      {label: evidence.plaqueTitle, description: evidence.objectInterpretation, sourceIds: [imageId, ...(evidence.objectSource ? [objectId] : [])]},
      {label: 'Evidentiary limit', description: input.cautions[0], sourceIds: [imageId, referenceId]},
    ]},
    {heading: 'Philosophical relationship', items: [
      {label: 'Central question', description: input.question, sourceIds: [referenceId]},
      {label: 'Keep in view', description: input.keyIdeas[0], sourceIds: [referenceId]},
    ]},
  ],
  sources: [
    {id: imageId, label: input.imageSource.label, url: input.imageSource.url, kind: 'collection-record'},
    ...(evidence.objectSource ? [{id: objectId, label: evidence.objectSource.label, url: evidence.objectSource.url, kind: 'collection-record' as const}] : []),
    {id: referenceId, label: input.reference.label, url: input.reference.url, kind: input.reference.kind ?? 'academic-reference'},
  ],
  objectInterpretation: evidence.objectInterpretation,
  assetId: input.assetId,
  panelAssetId: input.assetId,
  articleRoute: input.articleRoute,
  presentation: {
    panelKicker: 'Gallery 04 supplemental exhibit',
    proximityKicker: input.shortTitle,
    factRows: [
      {label: 'Focus', value: input.workLabel},
      {label: 'Question', value: input.question},
      {label: 'Status', value: 'Contextual witness, read with the stated caution'},
    ],
    articleActionLabel: `Read the full sourced ${articleTitle} article`,
    entityKind: input.entityKind,
    keyIdeasLabel: 'Interpretive anchors',
    cautionsLabel: 'Keep in view',
    exhibitLayout: 'object-led',
  },
  wallPlaque: {type: 'object-manuscript-site-or-archaeological-context', title: evidence.plaqueTitle, invitation: evidence.invitation, canonicalContexts: [{kind: 'philosopher', id: articleTitle === 'Patañjali' ? 'patanjali' : 'kanada'}]},
  review: {
    status: 'standard-compliant', reviewedOn: contentReviewedOn,
    method: 'Gallery 04 supplemental review: two non-overlapping Terra/High evidence scopes reconciled by the Sol parent across installed-object identity, attribution, dating, institution, source record, rights, claim mapping, accessibility, provenance, routes, and aspect-safe presentation.',
    resolution: evidence.resolution, lock: evidence.lock,
    visualReview: {
      desktop: {reviewedOn: desktopReviewedOn, viewport: input.id === 'nyaya-spitzer-philosophy-fragments' || input.id === 'yoga-asavari-ascetic-princess' ? '1440×900' : '1280×720', evidence: `Direct route inspected with the installed object, three-paragraph interpretation, subject-specific sidebar, article CTA, and no horizontal overflow. Evidence: docs/visual-validation/gallery-04-supplementals/desktop/${input.id}.png`},
      mobile: {reviewedOn: mobileReviewedOn, viewport: '390×844', evidence: `Direct route inspected with wrapped copy, loaded object preview, scrollable interpretation, visible controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-04-supplementals/mobile/${input.id}.png`},
      threeDimensional: {reviewedOn: stagedReviewedOn, viewport: '1280×720 fresh direct-route session', evidence: `Fresh-session authored viewpoint inspected with a live 3D canvas, closed detail panel, readable plaque, distinct installation, and the image mounted at its natural scene ratio. Evidence: docs/visual-validation/gallery-04-supplementals/staged-3d/${input.id}.png`},
    },
  },
  });
};

type ReviewedWallFillInput = Omit<MuseumSupplementalExhibit, 'sections' | 'visitorGuide' | 'review' | 'presentation' | 'panelAssetId'> & {
  sections: readonly {paragraph: string; sourceIds: readonly string[]}[];
  visitorGuide: NonNullable<MuseumSupplementalExhibit['visitorGuide']>;
  presentation: NonNullable<MuseumSupplementalExhibit['presentation']>;
  resolution: string;
  lock: string;
};

const reviewedWallFill = (input: ReviewedWallFillInput): MuseumSupplementalExhibit => {
  const {resolution, lock, ...exhibit} = input;
  return {
    ...exhibit,
    sections: input.sections.map(({paragraph, sourceIds}) => ({heading: '', paragraphs: [paragraph], sourceIds})),
    panelAssetId: input.assetId,
    presentation: {...input.presentation, exhibitLayout: 'object-led'},
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-12',
      method: 'Gallery 04 supplemental review: two non-overlapping Terra/High evidence scopes reconciled by the Sol parent across installed-object identity, attribution, dating, institution, source record, rights, claim mapping, accessibility, provenance, routes, and aspect-safe presentation.',
      resolution,
      lock,
      visualReview: {
        desktop: {
          reviewedOn: '2026-08-12',
          viewport: '1280×720',
          evidence: `Direct route inspected with the installed object, three-paragraph interpretation, subject-specific sidebar, article CTA, and no horizontal overflow. Evidence: docs/visual-validation/gallery-04-supplementals/desktop/${input.id}.png`,
        },
        mobile: {
          reviewedOn: '2026-08-12',
          viewport: '390×844',
          evidence: `Direct route inspected with wrapped copy, loaded object preview, scrollable interpretation, visible controls, and no horizontal overflow. Evidence: docs/visual-validation/gallery-04-supplementals/mobile/${input.id}.png`,
        },
        threeDimensional: {
          reviewedOn: '2026-08-12',
          viewport: '1280×720 fresh direct-route session',
          evidence: `Fresh-session authored viewpoint inspected with a live 3D canvas, closed detail panel, readable plaque, distinct installation, and the image mounted at its natural scene ratio. Evidence: docs/visual-validation/gallery-04-supplementals/staged-3d/${input.id}.png`,
        },
      },
    },
  };
};

const epistemologyReference = {
  label: 'Stanford Encyclopedia of Philosophy — Epistemology in Classical Indian Philosophy',
  url: 'https://plato.stanford.edu/entries/epistemology-india/',
} as const;
const yogaReference = {
  label: 'Internet Encyclopedia of Philosophy — Yoga',
  url: 'https://iep.utm.edu/yoga/',
} as const;

export const CLASSICAL_SOUTH_ASIAN_WALL_FILL_EXHIBITS = [
  reviewedWallFill({
    id: 'south-ibadat-khana-plurality',
    assetId: 'south-ibadat-khana-debate',
    displayName: 'Indian Philosophy: Many Traditions, One Deliberative Room',
    shortTitle: 'Indian Philosophy: Jesuits at Akbar’s Court',
    workLabel: 'INDIAN PHILOSOPHY · PLURALITY AND ENCOUNTER',
    dateLabel: 'Nar Singh · Akbarnāma fol. 263b · late 16th/early 17th century',
    question: 'What changes when disagreement is staged as an encounter rather than a list?',
    frontSubtitle: 'A Mughal court image makes encounter visible while preserving the distance between Akbar’s assembly and earlier philosophical schools.',
    lead: 'Nar Singh’s Akbarnāma miniature shows Akbar in a managed interreligious assembly that includes Jesuit visitors. It is a later Mughal court representation, not a timeless congress of Indian philosophy.',
    keyIdeas: ['Plurality includes real disagreement, not interchangeable wisdom.', 'Institutions and patrons shape which conversations become visible.', 'A later image can illuminate reception without documenting an earlier debate.'],
    cautions: ['This is a Mughal court image, not a scene of the six classical darśanas.', 'Do not treat religious traditions as internally uniform speakers.'],
    sections: [
      {paragraph: 'The installed image reproduces a folio attributed to Nar Singh from the Akbarnāma, Chester Beatty Library MS 3, folio 263b. It represents Akbar’s interreligious assembly and places black-robed Jesuit visitors within a densely ordered court scene. The Commons source dates the work around 1605, while a Metropolitan Museum publication gives 1597; the exhibit therefore uses the conservative label “late sixteenth or early seventeenth century.” The painting is a courtly representation shaped by artist, manuscript, patronage, and protocol. It is not a verbatim record of speech, a gathering of the six classical darśanas, or visual evidence for debates many centuries earlier.', sourceIds: ['ibadat-commons', 'ibadat-met-publication']},
      {paragraph: 'The assembly matters because intellectual encounters have institutions. Akbar’s presence, court rank, translation, religious identity, and the manuscript’s later narration affect who appears and how exchange becomes visible. Indian philosophical traditions likewise developed through teachers, commentators, opponents, patrons, monasteries, courts, and routes of travel rather than as sealed lists of doctrines. Yet plurality does not mean easy agreement. Jain, Buddhist, Brahmanical, materialist, devotional, Islamic, Christian, and other participants entered different conversations with different authorities and aims. A shared room may allow comparison, but it also distributes power. The image prompts visitors to ask who convenes an encounter, who can speak, who is translated, and whose absence the picture naturalizes.', sourceIds: ['ibadat-commons', 'ibadat-met-publication', 'iep-hindu-philosophy']},
      {paragraph: 'Used beside the Indian Philosophy article, the miniature supports a claim about later encounter and representation, not about the content of ancient systems. Classical debates over knowledge, language, self, action, and liberation cannot be reconstructed from this scene, and no court image makes internally diverse traditions into single speakers. The object instead broadens the gallery’s opening question: how are disagreements carried into new political and linguistic settings, and what changes when a ruler sponsors comparison? Its early-modern date is essential evidence, not an inconvenience. By keeping Akbar’s court distinct from earlier scholastic histories, the exhibit can acknowledge contact, translation, rivalry, and patronage without inventing one continuous or harmonious conversation called “Indian philosophy.”', sourceIds: ['iep-hindu-philosophy', 'ibadat-commons', 'ibadat-met-publication']},
    ],
    visitorGuide: [
      {heading: 'Court and manuscript', items: [
        {label: 'Named folio', description: 'The work is attributed to Nar Singh and identified as Chester Beatty Library MS 3, folio 263b.', sourceIds: ['ibadat-commons', 'ibadat-met-publication']},
        {label: 'Conservative date', description: 'Published descriptions differ between 1597 and c. 1605, so the plaque keeps the range broad.', sourceIds: ['ibadat-commons', 'ibadat-met-publication']},
      ]},
      {heading: 'Limits of the encounter', items: [
        {label: 'Mughal setting', description: 'The painting concerns Akbar’s court, not an ancient meeting of philosophical schools.', sourceIds: ['ibadat-commons']},
        {label: 'Power in the room', description: 'Patronage, protocol, translation, and artistic selection shape whose encounter becomes visible.', sourceIds: ['ibadat-met-publication', 'iep-hindu-philosophy']},
      ]},
    ],
    sources: [
      {id: 'ibadat-commons', label: 'Wikimedia Commons: Jesuits at Akbar’s court', url: 'https://commons.wikimedia.org/wiki/File:Jesuits_at_Akbar%27s_court.jpg', kind: 'collection-record'},
      {id: 'ibadat-met-publication', label: 'Metropolitan Museum of Art: Wonder of the Age, object citation for Chester Beatty MS 3, fol. 263b', url: 'https://resources.metmuseum.org/resources/metpublications/pdf/Wonder_of_the_Age_Master_Painters_of_India_1100_1900.pdf', kind: 'academic-reference'},
      {id: 'iep-hindu-philosophy', label: 'Internet Encyclopedia of Philosophy: Hindu Philosophy', url: 'https://iep.utm.edu/hindu-ph/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'Nar Singh’s Akbarnāma miniature is a later Mughal representation of a managed interreligious encounter at Akbar’s court. It is not an ancient philosophical congress or a transcript of debate.',
    articleRoute: {kind: 'branch', branchId: 'indian-philosophy'},
    presentation: {
      panelKicker: 'Gallery 04 supplemental exhibit', proximityKicker: 'Jesuits at Akbar’s Court',
      factRows: [
        {label: 'Object', value: 'Akbarnāma miniature · Chester Beatty MS 3, fol. 263b'},
        {label: 'Artist / date', value: 'Nar Singh · late 16th/early 17th century'},
        {label: 'Rights', value: 'Public-domain work · installed record via Wikimedia Commons'},
      ],
      articleActionLabel: 'Read the full sourced Indian Philosophy article', entityKind: 'branch', keyIdeasLabel: 'Interpretive anchors', cautionsLabel: 'Historical cautions',
    },
    wallPlaque: {type: 'historical-event-or-institutional-context', title: 'Jesuits at Akbar’s Court', invitation: 'Nar Singh’s Akbarnāma miniature stages an early-modern interreligious encounter whose courtly setting makes patronage, translation, representation, and unequal access part of philosophical comparison.', canonicalContexts: [{kind: 'branch', id: 'indian-philosophy'}]},
    resolution: 'Resolved: verified the Nar Singh attribution and Chester Beatty folio, retained a conservative date across differing published records, bounded the image to Akbar’s court, and replaced generic Gallery 07 copy with sourced Gallery 04 interpretation.',
    lock: 'fnv1a64:2e816b93a3c58223',
  }),
  reviewedWallFill({
    id: 'south-nalanda-learning-network',
    assetId: 'south-nalanda-learning-courtyard',
    displayName: 'Indian Philosophy: Nālandā and Knowledge as an Institution',
    shortTitle: 'Indian Philosophy: Nālandā Mahāvihāra Ruins',
    workLabel: 'INDIAN PHILOSOPHY · INSTITUTIONS AND TRAVEL',
    dateLabel: 'Archaeological Site of Nālandā Mahāvihāra · photographed 9 October 2023',
    question: 'What material and institutional conditions let arguments travel?',
    frontSubtitle: 'A contemporary photograph of conserved ruins opens the institutional history of learning without inventing an ancient classroom.',
    lead: 'Sumitsurai’s 2023 photograph records brick remains at the Archaeological Site of Nālandā Mahāvihāra. Its source does not identify the exact structure as Monastery 1, so the exhibit does not repeat that claim.',
    keyIdeas: ['Institutions preserve and reorganize philosophical work.', 'Travel brings arguments into new linguistic and political settings.', 'Material ruins do not transparently reconstruct classroom life.'],
    cautions: ['Do not assign every visible structure to one school or exact century.', 'Nālandā was especially important to Buddhist learning, not a neutral home of every South Asian tradition.'],
    sections: [
      {paragraph: 'The installed object is a photograph by Sumitsurai taken on 9 October 2023 at the archaeological remains of Nālandā in Bihar. The Commons source calls it “Nalanda University Ruins” and supplies the photographer, date, and location, but it does not identify the precise building or construction phase visible. The earlier title “Monastery 1” therefore exceeded the source record. UNESCO describes the property as the remains of a monastic and scholastic institution developed over many centuries, with stupas, shrines, and vihāras that include residential and educational structures. This image records conserved material remains in the present; it is not a transparent view of an ancient seminar, library, teacher, curriculum, or single historical moment.', sourceIds: ['nalanda-commons', 'nalanda-unesco']},
      {paragraph: 'Nālandā matters to philosophy because sustained inquiry needs infrastructure. Residential communities, teachers, students, patronage, manuscript production, language study, commentary, travel routes, and institutional memory make arguments available across generations. UNESCO emphasizes the site’s long role in monastic and scholastic learning, especially within Buddhist history. That specificity should not be diluted into a neutral home for every South Asian tradition. A major institution is also not one mind: communities can contain rival interpretations, shifting curricula, and changing political conditions. The brick walls help visitors recognize the material scale of learning while leaving intellectual claims to texts, inscriptions, archaeology, and historically careful reconstruction rather than to atmosphere alone.', sourceIds: ['nalanda-unesco', 'iep-hindu-philosophy']},
      {paragraph: 'The photograph’s evidentiary relationship is therefore bounded but valuable. It shows that the site persists as an archaeological and conservation landscape and gives physical scale to spaces built for communal life. It cannot assign a particular doctrine to the visible walls, identify what happened in one room, or collapse phases extending from the early centuries BCE into the medieval period. Those limits make the object a better teaching tool, not a weaker one. Reading image and site record together distinguishes what is seen now from what historical institutions enabled: copying, teaching, debate, travel, and the reorganization of inherited knowledge. The exhibit connects Indian philosophy to those conditions without treating ruins as illustrations of a single timeless civilization.', sourceIds: ['nalanda-commons', 'nalanda-unesco', 'iep-hindu-philosophy']},
    ],
    visitorGuide: [
      {heading: 'Reading the photograph', items: [
        {label: 'Modern record', description: 'The image documents the conserved archaeological site in 2023, not Nālandā during its period of teaching.', sourceIds: ['nalanda-commons']},
        {label: 'Unidentified structure', description: 'The image source does not name the exact building or phase, so the exhibit avoids “Monastery 1.”', sourceIds: ['nalanda-commons']},
      ]},
      {heading: 'Institutional learning', items: [
        {label: 'Monastic-scholastic site', description: 'UNESCO identifies a long-lived complex of stupas, shrines, and vihāras with residential and educational functions.', sourceIds: ['nalanda-unesco']},
        {label: 'Buddhist specificity', description: 'Nālandā’s importance to Buddhist learning should not be generalized into custody of every Indian tradition.', sourceIds: ['nalanda-unesco', 'iep-hindu-philosophy']},
      ]},
    ],
    sources: [
      {id: 'nalanda-commons', label: 'Wikimedia Commons: Nalanda Ruins (32), Sumitsurai, 2023', url: 'https://commons.wikimedia.org/wiki/File:Nalanda_Ruins_%2832%29.jpg', kind: 'collection-record'},
      {id: 'nalanda-unesco', label: 'UNESCO World Heritage Centre: Archaeological Site of Nalanda Mahavihara at Nalanda, Bihar', url: 'https://whc.unesco.org/en/list/1502/', kind: 'collection-record'},
      {id: 'iep-hindu-philosophy', label: 'Internet Encyclopedia of Philosophy: Hindu Philosophy', url: 'https://iep.utm.edu/hindu-ph/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'This 2023 photograph documents conserved remains at Nālandā. Its source does not identify the precise structure, and the image cannot assign a school, activity, or historical phase to the visible walls.',
    articleRoute: {kind: 'branch', branchId: 'indian-philosophy'},
    presentation: {
      panelKicker: 'Gallery 04 supplemental exhibit', proximityKicker: 'Nālandā Mahāvihāra ruins',
      factRows: [
        {label: 'Site', value: 'Archaeological Site of Nālandā Mahāvihāra, Bihar'},
        {label: 'Photograph', value: 'Sumitsurai · 9 October 2023'},
        {label: 'Precision', value: 'Exact visible structure not identified by the image source'},
      ],
      articleActionLabel: 'Read the full sourced Indian Philosophy article', entityKind: 'branch', keyIdeasLabel: 'Interpretive anchors', cautionsLabel: 'Archaeological cautions',
    },
    wallPlaque: {type: 'object-manuscript-site-or-archaeological-context', title: 'Archaeological Remains at Nālandā Mahāvihāra', invitation: 'A contemporary photograph of Nālandā’s conserved remains gives institutional learning material scale while resisting unsupported claims about the exact structure, activity, school, or historical phase shown.', canonicalContexts: [{kind: 'branch', id: 'indian-philosophy'}]},
    resolution: 'Resolved: removed the unsupported Monastery 1 identification, verified the 2023 photograph and UNESCO site context, separated present ruins from historical classroom claims, and added explicit archaeological limits.',
    lock: 'fnv1a64:918362d2e7cba33b',
  }),
  reviewedWallFill({
    id: 'south-ashoka-public-dhamma',
    assetId: 'south-ashoka-lion-capital',
    displayName: 'Indian Philosophy: Aśoka’s Lion Capital and Public Dhamma',
    shortTitle: 'Indian Philosophy: Lion Capital of Aśoka at Sarnath',
    workLabel: 'INDIAN PHILOSOPHY · ETHICS IN PUBLIC',
    dateLabel: 'Mauryan · c. 250 BCE · Archaeological Museum Sarnath 355',
    question: 'How does ethical language change when authority makes it public?',
    frontSubtitle: 'The monumental capital anchors an Aśokan setting; surviving inscriptions, not the sculpture alone, provide the ethical language.',
    lead: 'The polished Lion Capital of Aśoka stood atop the pillar at Sarnath and is now Archaeological Museum Sarnath accession 355. The sculpture anchors imperial setting, while inscriptions supply evidence for Aśokan dhamma.',
    keyIdeas: ['Ethical vocabulary can travel through political institutions.', 'Public moral communication joins persuasion to authority.', 'Dhamma in Aśokan usage should not be reduced to one later doctrine.'],
    cautions: ['The capital is not itself a philosophical argument or a complete edict.', 'Aśoka’s patronage does not make him representative of every South Asian tradition.'],
    sections: [
      {paragraph: 'The installed photograph shows the Lion Capital of Aśoka from Sarnath, a Mauryan sandstone sculpture conventionally dated around 250 BCE and held by the Archaeological Museum Sarnath as accession 355. Four lions stand back to back above an abacus carved with animals and wheels, over an inverted lotus. Chrisi1964 released this modern photograph under CC BY-SA 4.0. The capital once crowned a pillar, giving monumental form to Aśokan authority, but it is not itself an edict and contains no complete exposition of dhamma. Its museum identity, accession, material setting, and visual program must be distinguished from propositions known through inscriptions on pillars and rocks.', sourceIds: ['ashoka-commons', 'ashoka-sarnath']},
      {paragraph: 'Aśokan inscriptions address conduct through terms that include restraint, generosity, care, respect, and relations among communities, while also speaking in the voice of an emperor. Their public placement joins ethical exhortation to administration, conquest, welfare, punishment, memory, and political legitimacy. That setting changes the philosophical question. Advice backed by imperial institutions is not merely a private teacher’s recommendation, and praise of concord does not erase asymmetries of power or disagreement about the good. The National Museum’s edict record supplies inscriptional context for this language. The capital can orient visitors toward the scale and authority of the program, but specific claims about dhamma require those textual witnesses rather than inference from lions alone.', sourceIds: ['ashoka-sarnath', 'ashoka-edict', 'iep-hindu-philosophy']},
      {paragraph: 'The object also has later political and national afterlives, but those receptions should not be projected wholesale into the third century BCE. Nor does Aśoka speak for every Indian philosophy. His Buddhist patronage and imperial program belong to a particular historical configuration, while Jain, Brahmanical, materialist, Buddhist, and other traditions developed their own disputes about ethics, knowledge, action, selfhood, and liberation. The exhibit therefore makes a paired evidentiary claim: the lion capital establishes a monumental Aśokan setting, and inscriptions establish the ethical vocabulary under discussion. Keeping sculpture, inscription, ancient program, and later symbolism distinct lets visitors ask how moral language becomes public without turning one celebrated object into a universal doctrinal emblem.', sourceIds: ['ashoka-sarnath', 'ashoka-edict', 'ashoka-commons', 'iep-hindu-philosophy']},
    ],
    visitorGuide: [
      {heading: 'Capital and pillar', items: [
        {label: 'Museum object', description: 'The Sarnath museum identifies the Mauryan capital as accession 355 and records its pillar context.', sourceIds: ['ashoka-sarnath']},
        {label: 'Licensed photograph', description: 'Chrisi1964’s modern image is reused under CC BY-SA 4.0; that license concerns the photograph.', sourceIds: ['ashoka-commons']},
      ]},
      {heading: 'Evidence for dhamma', items: [
        {label: 'Textual witness', description: 'Surviving inscriptions, rather than the carved lions alone, provide Aśokan ethical language.', sourceIds: ['ashoka-edict']},
        {label: 'Imperial address', description: 'Public exhortation joins ideals of conduct to the authority and institutions of a ruler.', sourceIds: ['ashoka-edict', 'iep-hindu-philosophy']},
      ]},
    ],
    sources: [
      {id: 'ashoka-commons', label: 'Wikimedia Commons: Sarnath capital photograph by Chrisi1964', url: 'https://commons.wikimedia.org/wiki/File:Sarnath_capital.jpg', kind: 'collection-record'},
      {id: 'ashoka-sarnath', label: 'Archaeological Museum Sarnath: Lion Capital, accession 355', url: 'https://www.sarnathmuseumasi.org/gallery/Gallery3-Acc-No-355.html', kind: 'collection-record'},
      {id: 'ashoka-edict', label: 'National Museum, New Delhi: Edict of Aśoka', url: 'https://www.nationalmuseumindia.gov.in/en/collections/index/21', kind: 'primary-text'},
      {id: 'iep-hindu-philosophy', label: 'Internet Encyclopedia of Philosophy: Hindu Philosophy', url: 'https://iep.utm.edu/hindu-ph/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The capital establishes the monumental and political setting of Aśoka’s program. It is sculpture, not an edict; surviving inscriptions must support claims about the content of dhamma.',
    articleRoute: {kind: 'branch', branchId: 'indian-philosophy'},
    presentation: {
      panelKicker: 'Gallery 04 supplemental exhibit', proximityKicker: 'Lion Capital of Aśoka at Sarnath',
      factRows: [
        {label: 'Object', value: 'Mauryan sandstone lion capital · c. 250 BCE'},
        {label: 'Holding', value: 'Archaeological Museum Sarnath · accession 355'},
        {label: 'Evidence limit', value: 'The capital is not itself an edict'},
      ],
      articleActionLabel: 'Read the full sourced Indian Philosophy article', entityKind: 'branch', keyIdeasLabel: 'Interpretive anchors', cautionsLabel: 'Historical cautions',
    },
    wallPlaque: {type: 'object-manuscript-site-or-archaeological-context', title: 'Lion Capital of the Aśokan Pillar at Sarnath', invitation: 'The monumental capital anchors Aśoka’s imperial setting, while surviving inscriptions—not the sculpture alone—supply evidence for the ethical language of public dhamma.', canonicalContexts: [{kind: 'branch', id: 'indian-philosophy'}]},
    resolution: 'Resolved: verified the Sarnath capital and accession 355, separated the sculpture from inscriptional evidence for dhamma, preserved the CC BY-SA photograph credit, and replaced the thematic plaque with a factual object title.',
    lock: 'fnv1a64:276c627ad4cef8ee',
  }),
  reviewedWallFill({
    id: 'jain-jambudvipa-moral-geography',
    assetId: 'jain-jambudvipa-cosmological-map',
    displayName: 'Jain Philosophy: Jambūdvīpa as Moral Geography',
    shortTitle: 'Jain Philosophy: Jambūdvīpa Cosmological Map',
    workLabel: 'JAIN PHILOSOPHY · COSMOS AND CONDITION',
    dateLabel: 'Anonymous map from Rajasthan · c. 1800 as described by its dealer/source record',
    question: 'How can a map locate beings within a morally structured cosmos?',
    frontSubtitle: 'A later painted diagram orders continents, mountains, waters, and embodied conditions without functioning as modern terrestrial cartography.',
    lead: 'This anonymous c. 1800 map, attributed to Rajasthan by its dealer/source record, visualizes Jambūdvīpa within Jain cosmology. No holding institution or current collection is identified.',
    keyIdeas: ['Cosmology locates ethical and embodied possibilities.', 'A diagram can organize scale without functioning as modern cartography.', 'Different Jain cosmological images emphasize different structures.'],
    cautions: ['The c. 1800 painting is a later witness, not an image from Mahāvīra’s lifetime.', 'Do not read symbolic proportions as failed geographical measurement.'],
    sections: [
      {paragraph: 'The installed object is an anonymous painted map of Jambūdvīpa dated around 1800 and attributed to Rajasthan by the Barry Lawrence Ruderman Antique Maps source record from which the Commons image derives. Rings, axial forms, mountains, waterways, regions, figures, and labels create an intensely ordered field. The source does not identify a museum, library, owner, or present holding collection, so the exhibit states that uncertainty instead of turning a dealer record into an institutional provenance. Commons marks the work with a Public Domain Mark. The object is a late visual witness to Jain cosmology, not a map from Mahāvīra’s lifetime, a modern geographical survey, or a record of one universally standardized diagram.', sourceIds: ['jambudvipa-commons', 'jambudvipa-ruderman']},
      {paragraph: 'Jain cosmology situates living beings within an immense, structured universe of regions, embodied conditions, temporal cycles, and possibilities for rebirth and liberation. Jambūdvīpa is one continent within the middle world and includes the humanly significant regions from which disciplined progress toward liberation is described. Calling the image “moral geography” is therefore an interpretation of how location, embodiment, karma, and spiritual possibility relate; it is not the object’s literal title. The map does not offer roads for a modern traveler or measurable terrestrial projections. Its repeated circles and symmetries direct attention toward relational order, scale, and kinds of life within a cosmos where action has consequences across successive embodiments.', sourceIds: ['jain-universe-jainpedia', 'jambudvipa-jainpedia', 'jain-philosophy-sep']},
      {paragraph: 'The painting complements other Jain cosmological forms without replacing them. Artists and communities transmitted inherited worlds through manuscripts, temple objects, diagrams, teaching, and ritual contexts, selecting different scales and structures for emphasis. Later date does not make the map irrelevant to philosophy; it identifies its evidentiary role as reception and visual interpretation. At the same time, one c. 1800 object cannot demonstrate that all Jain communities pictured the universe identically or settle every doctrinal variation. Read carefully, it helps visitors see that claims about soul, karma, nonviolence, embodiment, and liberation belong within a larger cosmological architecture. Read carelessly, it becomes either exotic decoration or a failed modern map—two judgments the verified object does not support.', sourceIds: ['jambudvipa-commons', 'jain-universe-jainpedia', 'jain-philosophy-sep']},
    ],
    visitorGuide: [
      {heading: 'Source-record boundaries', items: [
        {label: 'Anonymous maker', description: 'The source identifies no artist; Rajasthan and c. 1800 are reported through the dealer record.', sourceIds: ['jambudvipa-ruderman', 'jambudvipa-commons']},
        {label: 'Unknown holding', description: 'No museum, library, or current collection is named, so institutional provenance remains unresolved.', sourceIds: ['jambudvipa-ruderman', 'jambudvipa-commons']},
      ]},
      {heading: 'Cosmological reading', items: [
        {label: 'Middle-world continent', description: 'Jambūdvīpa belongs to the Jain middle world and locates regions significant to embodied life and liberation.', sourceIds: ['jambudvipa-jainpedia', 'jain-universe-jainpedia']},
        {label: 'Not survey geography', description: 'Symbolic proportion and cosmological order answer different questions from modern terrestrial cartography.', sourceIds: ['jain-universe-jainpedia', 'jain-philosophy-sep']},
      ]},
    ],
    sources: [
      {id: 'jambudvipa-commons', label: 'Wikimedia Commons: Jain Cosmological Map of the Universe—Jambūdvīpa', url: 'https://commons.wikimedia.org/wiki/File:Jain_Cosmological_Map_of_the_Universe_-_Jambudvipa.jpg', kind: 'collection-record'},
      {id: 'jambudvipa-ruderman', label: 'Barry Lawrence Ruderman Antique Maps: Jain Cosmological Map of the Universe—Jambūdvīpa', url: 'https://www.raremaps.com/gallery/detail/93336/jain-cosmological-map-of-the-universe-jambudvipa-anonymous', kind: 'collection-record'},
      {id: 'jain-universe-jainpedia', label: 'JAINpedia: Jain universe', url: 'https://jainpedia.org/themes/principles/jain-universe/', kind: 'academic-reference'},
      {id: 'jambudvipa-jainpedia', label: 'JAINpedia: Jambū-dvīpa', url: 'https://jainpedia.org/glossary/jambu-dvipa/', kind: 'academic-reference'},
      {id: 'jain-philosophy-sep', label: 'Stanford Encyclopedia of Philosophy: Jaina Philosophy', url: 'https://plato.stanford.edu/entries/jaina-philosophy/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The anonymous c. 1800 Rajasthan attribution comes from a dealer/source record, and no holding institution is identified. The image is later Jain cosmological reception, not modern survey geography.',
    articleRoute: {kind: 'branch', branchId: 'jainism'},
    presentation: {
      panelKicker: 'Gallery 04 supplemental exhibit', proximityKicker: 'Jambūdvīpa cosmological map',
      factRows: [
        {label: 'Object', value: 'Anonymous painted map of Jambūdvīpa'},
        {label: 'Attribution / date', value: 'Rajasthan · c. 1800, reported by source record'},
        {label: 'Holding', value: 'Current institution or collection not identified'},
      ],
      articleActionLabel: 'Read the full sourced Jainism article', entityKind: 'branch', keyIdeasLabel: 'Interpretive anchors', cautionsLabel: 'Source cautions',
    },
    wallPlaque: {type: 'concept-argument-diagram-or-method', title: 'Jambūdvīpa Cosmological Map', invitation: 'An anonymous later painting orders the Jain middle world as a field of regions, embodiments, and spiritual possibilities while its current holding remains honestly unknown.', canonicalContexts: [{kind: 'branch', id: 'jainism'}]},
    resolution: 'Resolved: verified the installed map and dealer-derived source record, changed the creator to anonymous, preserved the unknown holding institution, kept “moral geography” interpretive, and mapped the image to Jain cosmology without modern-cartographic claims.',
    lock: 'fnv1a64:06031d85d23401b2',
  }),
  reviewedWallFill({
    id: 'jain-samavasarana-open-assembly',
    assetId: 'jain-samavasarana-peaceful-assembly',
    displayName: 'Jain Philosophy: Samavasaraṇa and the Open Assembly',
    shortTitle: 'Jain Philosophy: Samavasaraṇa',
    workLabel: 'JAIN PHILOSOPHY · TEACHING AND NONVIOLENCE',
    dateLabel: 'Unknown artist · Rajasthan, c. 1800 as described by the Commons source record',
    question: 'What would teaching look like if no kind of being were excluded?',
    frontSubtitle: 'A later traditional assembly of humans, animals, and celestial beings visualizes universal teaching without becoming historical reportage.',
    lead: 'This source-recorded Rajasthan painting arranges a samavasaraṇa, the traditional universal teaching assembly of a Jina. Its maker and holding institution are unknown, and its c. 1800 date is reported rather than independently catalogued.',
    keyIdeas: ['The assembly joins omniscient teaching to universal accessibility.', 'Nonviolence governs relations among radically different beings.', 'Ordered visual form carries doctrinal and devotional meaning.'],
    cautions: ['The painting is a later traditional representation, not eyewitness documentation of a historical sermon.', 'The many assembled beings do not by themselves prove the distinct epistemological doctrine of many-sidedness.'],
    sections: [
      {paragraph: 'The installed image is a painting described by its Commons record as a samavasaraṇa from Rajasthan around 1800. Concentric paths and ordered zones gather human beings, animals, and celestial beings around a Tīrthaṅkara’s teaching presence. No artist, original collection, accession number, or current holding institution is identified; “Rajasthan” and “1800” remain source-record descriptions rather than independently verified catalogue facts. Commons presents the reproduction as a public-domain work, with an incomplete United States status warning that warrants retaining the exact source record. The image is a later devotional and cosmological representation. It is not a view of an ordinary lecture, a lifetime scene of Mahāvīra, or eyewitness documentation of a historical sermon.', sourceIds: ['samavasarana-commons']},
      {paragraph: 'In Jain tradition, a samavasaraṇa is the universal preaching assembly associated with a Jina after omniscience. Its carefully ordered space makes teaching available to radically different kinds of embodied listener and imagines a temporary peace among beings that might otherwise fear or harm one another. That traditional scene gives the painting a strong relationship to Jain ethical attention: nonviolence is not restricted to human social life, because living souls occupy many bodies and karmic conditions. The image spatializes accessibility, order, and peaceful attention, but it should not be asked to prove a historical event. Nor does the mere presence of many kinds of listener establish every philosophical claim about knowledge or liberation.', sourceIds: ['samavasarana-jainpedia', 'jina-preaching-jainpedia', 'jain-philosophy-sep']},
      {paragraph: 'The assembly must also be kept distinct from anekāntavāda, the philosophical warning against one-sided characterization. A painting filled with different beings can invite comparison across standpoints, but it is not itself an argument for that epistemological doctrine. Jain accounts still distinguish warranted from unwarranted claims and bind knowledge to disciplined conduct and liberation; openness does not mean that every statement is equally adequate. The object’s most direct evidence concerns later visual and devotional reception: artists and communities made the Jina’s universal teaching imaginable through concentric architecture, ranked audiences, color, and repetition. Reading it with philosophical sources preserves both dimensions—an ethically charged image of peaceful access and a historically bounded artifact whose unknown maker, holding, and transmission remain visible.', sourceIds: ['jain-philosophy-sep', 'samavasarana-jainpedia', 'jina-preaching-jainpedia', 'samavasarana-commons']},
    ],
    visitorGuide: [
      {heading: 'The represented assembly', items: [
        {label: 'Universal audience', description: 'Traditional samavasaraṇa imagery gathers humans, animals, and celestial beings around a Jina’s teaching.', sourceIds: ['samavasarana-jainpedia', 'jina-preaching-jainpedia']},
        {label: 'Peaceful order', description: 'The concentric scene makes non-harm and access visible across different embodied forms.', sourceIds: ['jina-preaching-jainpedia', 'jain-philosophy-sep']},
      ]},
      {heading: 'Source and doctrine limits', items: [
        {label: 'Unknown provenance', description: 'The Commons record names no maker, accession, or holding institution and is the only object-specific record.', sourceIds: ['samavasarana-commons']},
        {label: 'Not many-sidedness itself', description: 'A varied audience does not independently establish Jain arguments about one-sided and conditional predication.', sourceIds: ['jain-philosophy-sep']},
      ]},
    ],
    sources: [
      {id: 'samavasarana-commons', label: 'Wikimedia Commons: Samavasaraṇa painting described as Rajasthan, 1800', url: 'https://commons.wikimedia.org/wiki/File:Samavasarana_painting_from_1800_AD_Rajasthan.jpg', kind: 'collection-record'},
      {id: 'samavasarana-jainpedia', label: 'JAINpedia glossary: Samavasaraṇa', url: 'https://jainpedia.org/glossary/samavasara%E1%B9%87a/', kind: 'academic-reference'},
      {id: 'jina-preaching-jainpedia', label: 'JAINpedia manuscript guide: A Jina’s omniscience and preaching', url: 'https://jainpedia.org/manuscript/a-jinas-omniscience-and-preaching/', kind: 'academic-reference'},
      {id: 'jain-philosophy-sep', label: 'Stanford Encyclopedia of Philosophy: Jaina Philosophy', url: 'https://plato.stanford.edu/entries/jaina-philosophy/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The source-recorded c. 1800 Rajasthan painting visualizes a traditional universal teaching assembly. Its artist and holding institution are unknown, and it is not eyewitness evidence for a sermon.',
    articleRoute: {kind: 'branch', branchId: 'jainism'},
    presentation: {
      panelKicker: 'Gallery 04 supplemental exhibit', proximityKicker: 'Samavasaraṇa',
      factRows: [
        {label: 'Object', value: 'Samavasaraṇa painting'},
        {label: 'Attribution / date', value: 'Unknown artist · Rajasthan, c. 1800, reported by source record'},
        {label: 'Holding', value: 'Current institution or collection not identified'},
      ],
      articleActionLabel: 'Read the full sourced Jainism article', entityKind: 'branch', keyIdeasLabel: 'Interpretive anchors', cautionsLabel: 'Source cautions',
    },
    wallPlaque: {type: 'reception-or-transmission-history', title: 'Samavasaraṇa', invitation: 'A later Jain painting gives ordered form to the Jina’s universal teaching assembly, where many kinds of embodied listener gather without turning representation into eyewitness history.', canonicalContexts: [{kind: 'branch', id: 'jainism'}]},
    resolution: 'Resolved: retained the source-recorded Rajasthan attribution and date with explicit uncertainty, preserved the unknown holding institution and qualified rights record, and separated universal peaceful assembly from a direct argument for many-sidedness.',
    lock: 'fnv1a64:3c5d5d96b63706af',
  }),
  reviewedWallFill({
    id: 'jain-tirthankara-stillness',
    assetId: 'jain-tirthankara-mathura-red-sandstone',
    displayName: 'Jain Philosophy: The Tīrthaṅkara’s Stillness',
    shortTitle: 'Jain Philosophy: Mathura Tīrthaṅkara Sculpture',
    workLabel: 'JAIN PHILOSOPHY · RENUNCIATION AND LIBERATION',
    dateLabel: 'Mathura red-sandstone sculpture · 8th century · OM-1982-0043',
    question: 'How can an image make disciplined detachment visible?',
    frontSubtitle: 'A standing Jina in red sandstone joins iconic composure to restraint while remaining neither a portrait nor a secure image of Mahāvīra.',
    lead: 'This eighth-century red-sandstone Tīrthaṅkara from Mathura stands in frontal composure. The Stockholm museum record identifies the object but not an individual Jina, so it must not be relabeled as Mahāvīra.',
    keyIdeas: ['A Jina is a victor over bondage, not a creator deity.', 'Stillness can signify disciplined freedom from attachment.', 'Iconographic identity differs from historical portrait likeness.'],
    cautions: ['Identify the sculpture as a Tīrthaṅkara, not specifically Mahāvīra.', 'The eighth-century object postdates the early Jain community by many centuries.'],
    sections: [
      {paragraph: 'The installed photograph records a red-sandstone Tīrthaṅkara sculpture from Mathura, dated to the eighth century and held by the Museum of Far Eastern Antiquities in Stockholm as accession OM-1982-0043. The museum’s Carlotta record also traces the object as a gift from Alva and Gunnar Myrdal. Daderot released the modern photograph under CC0. The figure stands upright in frontal stillness against a carved architectural backing; the earlier alt text incorrectly said that it sat. Neither museum nor image record identifies this Jina as Mahāvīra. The sculpture is therefore a later Jain representation, not a historical portrait, a secure individual identification, or direct evidence from the early Jain community.', sourceIds: ['tirthankara-museum', 'tirthankara-commons']},
      {paragraph: 'A Tīrthaṅkara is a Jina, a victor who has overcome karmic bondage and teaches a ford toward liberation, not a creator deity who intervenes in the world. Jain sculpture often minimizes episodic action and individualized expression so that symmetry, composure, nudity or clothing, posture, attendant figures, and identifying signs carry religious and ethical meaning. The standing pose seen here can be read in relation to kāyotsarga, disciplined abandonment of bodily attachment, while the object’s damaged or absent markers limit attribution to a particular Jina. Its form does not prove a philosophical doctrine. It makes a long history of devotional representation available for interpretation alongside texts about soul, karma, restraint, knowledge, and liberation.', sourceIds: ['tirthankara-museum', 'jain-sculpture-met', 'jain-philosophy-sep']},
      {paragraph: 'Stillness should not be reduced to a generic mood of calm. Jain paths regulate action, speech, desire, possession, movement, and harm because embodied activity binds karmic matter to the soul. Renunciation and nonviolence are demanding disciplines situated within communities and differentiated expectations, not an aesthetic preference for serenity. The sculpture gives those concerns a durable bodily sign while remaining an object made many centuries after Mahāvīra. Its strongest evidence concerns the history of Jain image-making and veneration: later makers and viewers found iconic composure an effective way to represent the liberated teacher. Preserving the generic Tīrthaṅkara identification lets visitors connect form and philosophy without converting a museum object into an invented likeness.', sourceIds: ['jain-philosophy-sep', 'jain-sculpture-met', 'tirthankara-museum']},
    ],
    visitorGuide: [
      {heading: 'The Stockholm object', items: [
        {label: 'Verified identity', description: 'The museum records an eighth-century red-sandstone Tīrthaṅkara from Mathura, accession OM-1982-0043.', sourceIds: ['tirthankara-museum']},
        {label: 'Standing figure', description: 'The installed image shows an upright Jina; the corrected alt text no longer describes a seated pose.', sourceIds: ['tirthankara-commons', 'tirthankara-museum']},
      ]},
      {heading: 'Icon and discipline', items: [
        {label: 'Generic Jina', description: 'No secure marker in the record identifies Mahāvīra or another individual Tīrthaṅkara.', sourceIds: ['tirthankara-museum']},
        {label: 'Ethical stillness', description: 'Composure can orient interpretation toward restraint and liberation without functioning as proof of doctrine.', sourceIds: ['jain-sculpture-met', 'jain-philosophy-sep']},
      ]},
    ],
    sources: [
      {id: 'tirthankara-museum', label: 'National Museums of World Culture / Carlotta: Tīrthaṅkara, OM-1982-0043', url: 'https://collections.smvk.se/carlotta-om/web/object/101121', kind: 'collection-record'},
      {id: 'tirthankara-commons', label: 'Wikimedia Commons: Daderot photograph of the Mathura Tīrthaṅkara', url: 'https://commons.wikimedia.org/wiki/File:Tirthankara,_Jain_sculpture,_Mathura,_India,_8th_century_AD,_red_sandstone_-_%C3%96stasiatiska_museet,_Stockholm_-_DSC09268.JPG', kind: 'collection-record'},
      {id: 'jain-sculpture-met', label: 'Metropolitan Museum of Art: Jain Sculpture', url: 'https://www.metmuseum.org/essays/jain-sculpture', kind: 'academic-reference'},
      {id: 'jain-philosophy-sep', label: 'Stanford Encyclopedia of Philosophy: Jaina Philosophy', url: 'https://plato.stanford.edu/entries/jaina-philosophy/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The eighth-century Mathura sculpture is securely a standing Tīrthaṅkara but not a named Jina or portrait of Mahāvīra. Its philosophical role is later representation of disciplined liberation.',
    articleRoute: {kind: 'branch', branchId: 'jainism'},
    presentation: {
      panelKicker: 'Gallery 04 supplemental exhibit', proximityKicker: 'Mathura Tīrthaṅkara sculpture',
      factRows: [
        {label: 'Object', value: 'Standing Tīrthaṅkara · red sandstone · Mathura'},
        {label: 'Date', value: '8th century'},
        {label: 'Holding', value: 'Museum of Far Eastern Antiquities · OM-1982-0043'},
      ],
      articleActionLabel: 'Read the full sourced Jainism article', entityKind: 'branch', keyIdeasLabel: 'Interpretive anchors', cautionsLabel: 'Iconographic cautions',
    },
    wallPlaque: {type: 'object-manuscript-site-or-archaeological-context', title: 'Tīrthaṅkara from Mathura', invitation: 'An eighth-century standing Jina makes disciplined composure visible while the museum record’s generic identification prevents the sculpture from becoming an invented portrait of Mahāvīra.', canonicalContexts: [{kind: 'branch', id: 'jainism'}]},
    resolution: 'Resolved: verified the Mathura sculpture, eighth-century date, Stockholm accession, gift provenance, and CC0 photograph; corrected the pose from seated to standing and replaced the curatorial plaque title with the factual object name.',
    lock: 'fnv1a64:2ae2c6c8f2d8eb5a',
  }),
  wallFill({
    id: 'nyaya-argument-before-authority',
    assetId: 'nyaya-two-scholars-quarreling',
    displayName: 'Kaṇāda’s Realist Context: Argument Before Authority',
    shortTitle: 'Kaṇāda’s Context: Contested Reasons',
    workLabel: 'NYĀYA–VAIŚEṢIKA · PUBLIC ARGUMENT',
    dateLabel: 'Persian literary painting made in India · composition 1516, later repainting',
    question: 'What makes a reason answerable to an opponent?',
    frontSubtitle: 'Claim, reason, challenge, response, and the discipline of disagreement',
    lead: 'This vivid scene of two quarreling scholars is not documentation of a Nyāya debate. It is a Persian literary painting produced in India and later repainted. Used as an acknowledged proxy, the confrontation helps introduce a central philosophical demand: claims must be supported by reasons that can survive questions about evidence, inference, counterexample, and error.',
    keyIdeas: ['Argument exposes a claim to structured challenge.', 'Reasons depend on shared standards and disputed examples.', 'A proxy image must never be relabeled as historical documentation.'],
    cautions: ['The figures are not Nyāya or Vaiśeṣika philosophers.', 'Visual conflict should not reduce Indian debate traditions to mere quarrel.'],
    sections: [
      {heading: 'Disagreement becomes method', paragraph: 'Classical argument traditions analyzed theses, reasons, examples, applications, objections, and failures. The goal was not simply to speak forcefully, but to identify when a purported proof actually connects what is observed with what is claimed.'},
      {heading: 'Opponents help define rigor', paragraph: 'An interlocutor can challenge ambiguity, relevance, pervasion, or an unsupported premise. Rival Buddhist, Jain, Mīmāṃsā, Vedānta, and other thinkers shaped the development of Nyāya–Vaiśeṣika reasoning through sustained criticism.'},
      {heading: 'The image remains contextual', paragraph: 'Because the painting belongs to a different literary and historical setting, it illustrates the social visibility of disagreement rather than the content or actual staging of a classical Sanskrit philosophical debate.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Two Scholars Quarreling, Walters W.609', url: 'https://commons.wikimedia.org/wiki/File:Yar_Muhammad_al-Haravi_-_Two_Scholars_Quarreling_-_Walters_W60925A_-_Full_Page.jpg'},
    reference: epistemologyReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'kanada'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'nyaya-spitzer-philosophy-fragments',
    assetId: 'nyaya-spitzer-sht810-interpretive',
    displayName: 'Kaṇāda’s Intellectual World: Reading SHT 810 Carefully',
    shortTitle: 'Kaṇāda’s Context: SHT 810',
    workLabel: 'SHT 810 · VERIFIED FACTS AND EVIDENCE LIMITS',
    dateLabel: 'Third-century manuscript · contemporary interpretive panel',
    question: 'What may an institutional research record support when no verified reusable object image is installed?',
    frontSubtitle: 'Kizil, fragmentary survival, Berlin custody, cross-tradition argument, and explicit limits',
    lead: 'This code-native panel is not a manuscript photograph or reconstruction. It presents a small set of facts reported by the Austrian Science Fund about SHT 810: discovery at Kizil, about one thousand mostly small fragments, a third-century palaeographic date, Berlin custody, and a noncanonical Abhidharma tract that includes discussion of Vaiśeṣika qualities. Its purpose is to make both the intellectual connection and the evidentiary limit visible.',
    keyIdeas: ['An interpretive diagram must identify itself as interpretation.', 'Fragmentary witnesses can preserve cross-tradition philosophical discussion.', 'Institutional facts do not authenticate unrelated manuscript pixels.'],
    cautions: ['No manuscript fragment, folio, join, or photograph appears in this panel.', 'The reported Vaiśeṣika discussion does not make SHT 810 a Vaiśeṣika Sūtra witness.'],
    sections: [
      {heading: 'Fragmentary survival limits reconstruction', paragraph: 'The FWF record describes about one thousand mostly small fragments that are difficult to reassemble. That documented condition limits certainty and keeps the Museum from presenting an intact leaf, fixed sequence, or complete text.'},
      {heading: 'A record can support bounded history', paragraph: 'The FWF record connects Kizil, the 1906 expedition, the fragmentary witness, and its current Berlin holding. The Museum diagram visualizes those documented relations without inventing manuscript geography or a complete transmission route.'},
      {heading: 'Context without false ownership', paragraph: 'The reported discussion of Vaiśeṣika guṇa makes SHT 810 relevant to a room about realist classification. It does not authorize calling the unnamed author a follower of Kaṇāda, treating the work as the Vaiśeṣika Sūtra, or assigning any pictured fragment to a doctrine.'},
    ],
    imageSource: {label: 'Philosophy Atlas Museum — deterministic SHT 810 panel renderer', url: 'https://github.com/Da3dalusCode/philosophy-museum/blob/main/scripts/renderMuseumInterpretivePanels.py'},
    reference: {label: 'Austrian Science Fund — Spitzer Manuscript (SHT 810) project and Berlin holding', url: 'https://www.fwf.ac.at/forschungsradar/10.55776/D3658', kind: 'collection-record'},
    articleRoute: {kind: 'philosopher', philosopherId: 'kanada'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'nyaya-smoke-fire-inference',
    assetId: 'nyaya-smoke-fire-inference',
    displayName: 'Kaṇāda’s Realist Context: Smoke, Fire, and Inference',
    shortTitle: 'Kaṇāda’s Context: Smoke and Fire',
    workLabel: 'NYĀYA–VAIŚEṢIKA · INFERENCE',
    dateLabel: 'NASA satellite observation · acquired 24 February 2021',
    question: 'When does smoke justify an inference to fire?',
    frontSubtitle: 'Observed sign, pervasion, background conditions, and possible defeaters',
    lead: 'A satellite view of smoke and fire supplies a contemporary visual field for a famous Indian example of inference. Seeing smoke can justify inferring fire only within a learned relation between sign and target, under appropriate conditions, and without a defeating explanation. The image is not a classical diagram; it makes the evidential problem vivid at landscape scale.',
    keyIdeas: ['Inference moves from a recognized sign to an unobserved target.', 'The sign-target relation requires more than one coincidental pairing.', 'Context and defeaters determine whether the reasoning succeeds.'],
    cautions: ['The satellite image is a modern teaching prompt, not a historical source.', 'Classical schools analyze inference differently; one example does not erase those disputes.'],
    sections: [
      {heading: 'The sign must be connected', paragraph: 'A reason works only if it is present in the case and appropriately connected with what is to be established. Indian epistemologists developed increasingly precise accounts of that connection and its failures.'},
      {heading: 'Observation extends beyond sight', paragraph: 'Reasoning allows a knower to move from what is presently available toward causes, objects, or properties not directly perceived. That work is essential for realist systems that posit atoms, universals, inherence, and absence.'},
      {heading: 'A familiar example contains hard questions', paragraph: 'Steam, dust, distance, scale, and exceptional conditions complicate the move from smoke to fire. The apparent simplicity of the example therefore opens deeper questions about induction, reliability, and counterexample.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Fire and Smoke in India, MODIS', url: 'https://commons.wikimedia.org/wiki/File:Fire_and_Smoke_in_India_%28MODIS_2021-02-28%29.jpg'},
    reference: epistemologyReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'kanada'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'yoga-six-yogis-banyan',
    assetId: 'yoga-six-yogis-banyan',
    displayName: 'Patañjali’s Yoga in Reception: Six Yogis Under a Banyan',
    shortTitle: 'Patañjali’s Context: Six Yogis',
    workLabel: 'YOGA · PRACTICE AND COMMUNITY',
    dateLabel: 'Indian painting · c. 1640',
    question: 'What becomes visible when Yoga is shown as shared discipline?',
    frontSubtitle: 'Posture, attention, instruction, community, and a much later visual tradition',
    lead: 'Six yogis gathered beneath a banyan tree present contemplative practice as social as well as solitary. The painting was made many centuries after the Yoga Sūtra and does not prove that its figures follow Patañjali’s system. It nevertheless corrects a text-only view by making bodies, places, instruction, and communities part of Yoga’s long reception history.',
    keyIdeas: ['Practice is transmitted through people and settings as well as texts.', 'Shared discipline can coexist with inward concentration.', 'Later yogic imagery cannot be assigned automatically to Pātañjala Yoga.'],
    cautions: ['The painting is not a scene from Patañjali’s lifetime.', '“Yogi” covers traditions and practices broader than the Yoga Sūtra.'],
    sections: [
      {heading: 'Practice has a setting', paragraph: 'Bodies need time, posture, instruction, food, shelter, and a community of interpretation. Those material conditions shape how terse aphorisms become lived disciplines across very different historical environments.'},
      {heading: 'Yoga exceeds modern exercise', paragraph: 'Pātañjala Yoga analyzes fluctuations of mind, disciplined attention, ethical restraints, concentration, and liberation. Physical posture matters, but it belongs to a larger soteriological and philosophical program.'},
      {heading: 'Reception remains plural', paragraph: 'Ascetics, devotional communities, householders, courts, and modern institutions have represented Yoga differently. The painting witnesses that broader afterlife without settling which textual lineage or precise techniques its figures embody.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Six yogis under a banyan', url: 'https://commons.wikimedia.org/wiki/File:Six_yogis_meditate_under_a_banyan_%286125077334%29.jpg'},
    reference: yogaReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'patanjali'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'yoga-posture-inner-heat',
    assetId: 'yoga-ascetic-shaiva-deity',
    displayName: 'Patañjali’s Yoga in Context: Posture, Restraint, and Inner Heat',
    shortTitle: 'Patañjali’s Context: Ascetic Posture',
    workLabel: 'YOGA · EMBODIED DISCIPLINE',
    dateLabel: 'Śaiva ascetic-deity sculpture · c. 1000–1200',
    question: 'How can posture become part of a disciplined transformation?',
    frontSubtitle: 'A crossed posture, meditation strap, ascetic heat, and the danger of false attribution',
    lead: 'This sculpture of a Śaiva ascetic deity uses a crossed posture and meditation strap to make bodily discipline visible. It is not a specifically Pātañjala object, and its imagery belongs to a different religious context. The comparison is useful precisely when the boundary stays explicit: Yoga developed amid wider South Asian ascetic practices that shared techniques without becoming one system.',
    keyIdeas: ['Posture supports sustained attention rather than functioning as display alone.', 'Ascetic heat links disciplined effort with transformation.', 'Shared practices do not erase doctrinal and institutional difference.'],
    cautions: ['The sculpture is Śaiva, not an image of Patañjali or his school.', 'Do not infer the Yoga Sūtra’s full practice from one pose.'],
    sections: [
      {heading: 'The body is trained, not discarded', paragraph: 'A stable posture, regulated effort, and aids such as a meditation band show that contemplation is embodied work. Pātañjala accounts situate bodily practice within ethical, cognitive, and liberative disciplines.'},
      {heading: 'Techniques cross boundaries', paragraph: 'South Asian ascetic communities borrowed, contested, and reinterpreted practices. Similar postures or vocabularies can therefore indicate contact while leaving metaphysics, authority, ritual, and final aims importantly different.'},
      {heading: 'Comparison needs a visible limit', paragraph: 'The museum uses this object as contextual evidence for a broader ascetic world. Its label must prevent the attractive sculpture from becoming false proof that a Śaiva deity illustrates a specific aphorism by Patañjali.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Ascetic Śaiva deity, Walters 25.255', url: 'https://commons.wikimedia.org/wiki/File:Indian_-_An_Ascetic_Shaiva_Deity_-_Walters_25255.jpg'},
    reference: yogaReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'patanjali'},
    entityKind: 'philosopher',
  }),
  wallFill({
    id: 'yoga-asavari-ascetic-princess',
    assetId: 'yoga-asavari-ascetic-princess',
    displayName: 'Patañjali’s Yoga in Reception: The Ascetic Princess Āsāvarī',
    shortTitle: 'Patañjali’s Context: Ascetic Princess',
    workLabel: 'YOGA · GENDER, ASCETICISM, AND RECEPTION',
    dateLabel: 'Bikaner Ragamala painting · c. 1650',
    question: 'Who disappears when ascetic practice is pictured only through male sages?',
    frontSubtitle: 'A female ascetic personification, wilderness, music, and careful comparison',
    lead: 'This Bikaner painting personifies the musical mode Āsāvarī as an ascetic princess in the wilderness. It is not direct documentation of a woman practicing Patañjali Yoga. Its strong female ascetic figure nevertheless challenges the visual habit of representing discipline only through male sages and opens questions about gender, renunciation, patronage, and artistic reception.',
    keyIdeas: ['Visual canons shape who appears to count as a practitioner.', 'Ragamala painting joins music, mood, poetry, and personification.', 'A contextual comparison must preserve the work’s actual genre.'],
    cautions: ['Āsāvarī is a Ragamala personification, not a portrait or Yoga manual illustration.', 'The image should not be used to claim equal historical access without further evidence.'],
    sections: [
      {heading: 'Genre matters', paragraph: 'Ragamala paintings visualize musical modes through poetic figures and settings. The work’s ascetic imagery is philosophically suggestive, but the museum must not detach it from that artistic and musical purpose.'},
      {heading: 'Representation distributes visibility', paragraph: 'When galleries show only male renunciants, viewers can mistake an image-selection habit for the whole historical record. A female ascetic figure invites better questions about participation, exclusion, and the sources that survive.'},
      {heading: 'Comparison can remain honest', paragraph: 'The painting broadens the room’s account of ascetic imagination while its caution keeps Pātañjala claims tied to appropriate textual evidence. Relevance does not require pretending that every disciplined body belongs to one Yoga lineage.'},
    ],
    imageSource: {label: 'Wikimedia Commons — Ascetic Princess Āsāvarī, Cleveland Museum of Art', url: 'https://commons.wikimedia.org/wiki/File:Northwestern_India,_Rajasthan,_Rajput_Kingdom_of_Bikaner_-_Ascetic_Princess_with_Snakes_in_a_Wilderness-_Asavari_Ragini,_from_a_Ragama_-_2018.190_-_Cleveland_Museum_of_Art.jpg'},
    reference: yogaReference,
    articleRoute: {kind: 'philosopher', philosopherId: 'patanjali'},
    entityKind: 'philosopher',
  }),
] as const satisfies readonly MuseumSupplementalExhibit[];
