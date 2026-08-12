import type {MuseumAssetId} from './museumAssetTypes';
import type {
  MuseumMediaMountDefinition,
  MuseumSceneVolume,
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from './museumWorldTypes';
import {GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS} from './gallery01Placement';
import {
  PLATO_SUPPLEMENTAL_EXHIBITS,
  PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  type MuseumSupplementalExhibit,
} from './platoSupplementalExhibits';

const volume = (
  id: string,
  role: MuseumSceneVolume['role'],
  center: MuseumSceneVolume['center'],
  size: MuseumSceneVolume['size'],
): MuseumSceneVolume => ({id, role, center, size});

const mediaMount = (
  id: MuseumSupplementalExhibitId,
  assetId: MuseumAssetId,
  width: number,
  height: number,
): MuseumMediaMountDefinition => ({
  id: `${id}-hero-media`,
  assetId,
  kind: 'wall-frame',
  position: [0, 2.18, -.38],
  rotation: [0, 0, 0],
  width,
  height,
  frameDepth: .11,
  supportHeight: 0,
  anchorId: `${id}-backing`,
  bounds: volume(`${id}-media-bounds`, 'media', {x: 0, y: 2.18, z: -.38}, {width: width + .18, height: height + .18, depth: .2}),
  supportBounds: volume(`${id}-media-support`, 'media', {x: 0, y: 2.18, z: -.55}, {width: width * .72, height: height * .72, depth: .18}),
});

const RECEPTION_ID = 'greek-philosophy-reception' as const;
const SOCRATES_CONTEXT_ID = 'socrates-trial-death' as const;
const MILETUS_CONTEXT_ID = 'miletus-ionian-coast' as const;

/**
 * Three contextual installations complete the six-face rhythm without
 * pretending that any subject is another canonical philosopher.
 */
export const GALLERY_01_CONTEXT_SUPPLEMENTAL_EXHIBITS = [
  {
    id: MILETUS_CONTEXT_ID,
    displayName: 'Miletus and the Ionian Coast',
    shortTitle: 'Miletus and the Ionian Coast',
    workLabel: 'MILETUS · IONIA · SIXTH CENTURY BCE CONTEXT',
    dateLabel: 'Sixth-century BCE context · later remains photographed in 2004',
    question: 'How does a coastal city change the questions people can ask about nature?',
    frontSubtitle: 'Port, observation, exchange, and the setting of Milesian inquiry',
    lead: 'Thales, Anaximander, and Anaximenes are associated with Miletus on the western coast of Anatolia. Its maritime setting supplies context for travel, observation, measurement, and intellectual contact, but no port economy mechanically explains why a particular cosmology emerged.',
    keyIdeas: [
      'Miletus was a port city in Ionia, on the western coast of Anatolia.',
      'The Milesians asked how diverse natural phenomena could belong to an intelligible order.',
      'Later testimony connects their interests to astronomy, geography, measurement, and explanation.',
      'Shared place does not make Thales, Anaximander, and Anaximenes one uniform school with a fixed doctrine.',
    ],
    cautions: [
      'The photograph shows later remains at the site, not a documented view of sixth-century BCE Miletus.',
      'Trade and travel provide context; they should not be treated as a complete causal explanation of philosophy.',
      'Most evidence for the Milesians survives through later reports, and exact biographies remain uncertain.',
    ],
    sections: [
      {
        heading: '',
        paragraphs: ['The photograph shows the partially restored Ionic Stoa at Miletus, on the western coast of present-day Türkiye. Its pale columns and stone foundations belong to later phases of a city that was rebuilt many times, so this is not the Miletus that Thales, Anaximander, and Anaximenes would have known. Even so, the remains give their inquiries a material setting. Early Greek philosophy did not begin in an abstract landscape: it emerged in communities around the Aegean and Anatolian coasts, among harbors, temples, workshops, public spaces, and routes of travel.'],
        sourceIds: ['miletus-photo', 'miletus-site'],
      },
      {
        heading: '',
        paragraphs: ['Miletus was a prosperous Ionian port whose inhabitants lived with seafaring, settlement, craft, political conflict, and exchange. Water, winds, stars, shorelines, and distance were part of ordinary practical knowledge, while travel brought different techniques and stories into contact. This setting helps explain why questions about nature, measurement, order, and change could become especially vivid there. It does not supply a single cause for philosophy: commercial life did not automatically produce cosmology, and ideas did not travel in only one direction. Because the Milesians’ own writings are almost entirely lost, the connection between their city and their thought must be drawn with care.'],
        sourceIds: ['miletus-site', 'sep-presocratics'],
      },
      {
        heading: '',
        paragraphs: ['Later writers associate Thales with water as a first principle, Anaximander with the indefinite or boundless, and Anaximenes with air changing through rarefaction and condensation. The three thinkers did not simply repeat one doctrine. Their surviving reputations suggest a developing conversation in which a proposed account of the natural world could be revised or replaced by another. That willingness to seek intelligible processes within nature became one important strand of Greek philosophy. The nearby exhibits explore each thinker separately; this view of Miletus holds them together just long enough to see the shared coastal setting from which their different questions entered the history of philosophy.'],
        sourceIds: ['sep-presocratics'],
      },
    ],
    sources: [
      {id: 'miletus-photo', label: 'Wikimedia Commons: Ionic Stoa at Miletus photograph and public-domain record', url: 'https://commons.wikimedia.org/wiki/File:MiletusIonicStoa.jpg', kind: 'collection-record'},
      {id: 'miletus-site', label: 'Perseus Art & Archaeology: Miletus site record', url: 'https://www.perseus.tufts.edu/hopper/artifact?name=Miletus&object=Site', kind: 'collection-record'},
      {id: 'sep-presocratics', label: 'Stanford Encyclopedia of Philosophy: Presocratic Philosophy', url: 'https://plato.stanford.edu/entries/presocratics/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'The Ionic Stoa belongs to later phases of Miletus and has been partly restored. The photograph nevertheless places Milesian philosophy in the coastal Anatolian city with which its earliest figures are associated.',
    assetId: 'miletus-ionian-coast-interpretive',
    panelAssetId: 'miletus-ionian-coast-interpretive',
    articleRoute: {kind: 'branch', branchId: 'ancient-greek'},
    presentation: {
      panelKicker: 'Gallery 01 historical setting exhibit',
      proximityKicker: 'Historical setting',
      factRows: [
        {label: 'Place', value: 'Miletus · Ionia · western Anatolia'},
        {label: 'Period', value: 'Sixth century BCE context'},
        {label: 'Evidence', value: 'Later testimony, archaeology, and a modern site photograph'},
      ],
      articleActionLabel: 'Read the full sourced Ancient Greek Philosophy article',
      entityKind: 'branch',
      keyIdeasLabel: 'Interpretive anchors',
      cautionsLabel: 'Historical cautions',
      exhibitLayout: 'object-led',
    },
    wallPlaque: {
      type: 'historical-event-or-institutional-context',
      invitation: 'The Ionian port of Miletus situates Thales, Anaximander, and Anaximenes within travel, observation, measurement, and competing explanations of nature.',
      canonicalContexts: [{kind: 'branch', id: 'ancient-greek'}],
    },
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-11',
      method: 'Gallery 01 supplemental review: object identity, claims, sources, rights, accessibility, provenance, and the established untitled object-led exhibit presentation.',
      resolution: 'Resolved: replaced the unverified generated scene with a public-domain site photograph; qualified the site’s chronology and contextual inferences; added claim-level source mapping and object-led guidance.',
      lock: 'fnv1a64:6bd67e2c93fa4da5',
    },
  },
  {
    id: RECEPTION_ID,
    displayName: 'The School of Athens',
    shortTitle: 'The School of Athens',
    workLabel: 'RAPHAEL · STANZA DELLA SEGNATURA · 1509–1511',
    dateLabel: 'Fresco, 1509–1511 · Vatican Museums, Room of the Segnatura',
    question: 'How did Renaissance Rome turn many ancient debates into one compelling image of philosophy?',
    frontSubtitle: 'Raphael’s Renaissance fresco as a later image of ancient philosophy',
    lead: 'Raphael painted The School of Athens in the Vatican’s Room of the Segnatura in 1509–1511. The fresco gathers philosophers, mathematicians, and scientists from different periods into invented architecture, with Plato and Aristotle at the center. It is Renaissance reception, not a record of an ancient meeting or a reliable portrait gallery.',
    keyIdeas: [
      'Raphael’s fresco forms an imagined intellectual community rather than recording one historical meeting.',
      'Later histories often organize diverse ancient inquiries around a small set of canonical figures.',
      'The fresco compresses centuries of disagreement into a single legible scene.',
      'Its monumental architecture makes philosophical inquiry look public, ordered, and continuous.',
    ],
    cautions: [
      'Raphael painted the fresco in 1509–1511, nearly two millennia after many of the thinkers represented.',
      'The fresco is reception history, not evidence for the appearance of ancient philosophers or one shared institution.',
      'Its canon is selective and should not be mistaken for a complete map of ancient intellectual life.',
    ],
    sections: [
      {
        heading: '',
        paragraphs: ['The image shows Raphael’s fresco The School of Athens, painted in 1509–1511 for the Vatican’s Room of the Segnatura. Plato and Aristotle walk together at the center, carrying their books and making contrasting gestures, while other figures read, argue, teach, calculate, and demonstrate around them. Raphael set the gathering within an immense painted architecture whose arches and deep perspective give philosophy the scale of a public world. The fresco is a Renaissance vision of ancient learning, created in Rome nearly two thousand years after many of the people it represents.'],
        sourceIds: ['vatican-school', 'commons-school'],
      },
      {
        heading: '',
        paragraphs: ['No such assembly took place. Raphael brought together thinkers separated by centuries, regions, and deep disagreements, then arranged them as if they belonged to one living community. Plato and Aristotle provide a memorable center, but the surrounding groups widen philosophy to include mathematics, astronomy, natural inquiry, and conversation. Some figures, including Pythagoras, Diogenes, Heraclitus, Euclid, Ptolemy, and Zoroaster, are identified by the Vatican Museums; other names proposed over the centuries remain uncertain. The painting therefore offers an interpretation of ancient philosophy rather than a documentary group portrait.'],
        sourceIds: ['vatican-school', 'smarthistory-school'],
      },
      {
        heading: '',
        paragraphs: ['That interpretation has been enormously influential. By presenting many traditions within a single harmonious space, the fresco turns the ancient past into a shared intellectual inheritance for Renaissance Rome. It also makes a selective canon look complete: local settings disappear, missing texts become invisible, and rival schools seem to participate in one grand conversation. The individual exhibits in this gallery restore some of that complexity by returning to particular works, places, and disputes. Raphael’s achievement lies in the tension between those views. The School of Athens is both a magnificent celebration of philosophy and a reminder that every picture of its history is shaped by later choices about who belongs at the center.'],
        sourceIds: ['vatican-school', 'smarthistory-school'],
      },
    ],
    sources: [
      {id: 'vatican-school', label: 'Vatican Museums: The School of Athens', url: 'https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/stanze-di-raffaello/stanza-della-segnatura/scuola-di-atene.html', kind: 'collection-record'},
      {id: 'commons-school', label: 'Wikimedia Commons: Wilfredor photograph and CC0 rights record', url: 'https://commons.wikimedia.org/wiki/File:The_School_of_Athens_by_Raffaello_Sanzio_da_Urbino,_Vatican.jpg', kind: 'collection-record'},
      {id: 'smarthistory-school', label: 'Smarthistory: Raphael, School of Athens', url: 'https://smarthistory.org/raphael-school-of-athens/', kind: 'academic-reference'},
    ],
    objectInterpretation: 'Raphael gathers thinkers from many periods into an imagined Renaissance assembly. The central pairing of Plato and Aristotle gives visual order to a much more varied ancient inheritance.',
    assetId: 'greek-philosophy-reception-interpretive',
    panelAssetId: 'greek-philosophy-reception-interpretive',
    articleRoute: {kind: 'branch', branchId: 'ancient-greek'},
    presentation: {
      panelKicker: 'Gallery 01 reception and orientation exhibit',
      proximityKicker: 'Reception and orientation',
      factRows: [
        {label: 'Focus', value: 'How later cultures assemble a philosophical canon'},
        {label: 'Object', value: 'Raphael fresco · 1509–1511 · Vatican Museums'},
        {label: 'Museum role', value: 'Renaissance reception history; not ancient evidence'},
      ],
      articleActionLabel: 'Read the full sourced Ancient Greek Philosophy article',
      entityKind: 'branch',
      keyIdeasLabel: 'What the image organizes',
      cautionsLabel: 'Historical cautions',
      exhibitLayout: 'object-led',
    },
    wallPlaque: {
      type: 'reception-or-transmission-history',
      title: 'The School of Athens',
      invitation: 'Raphael’s imagined assembly shows how the Renaissance reorganized the inheritance of ancient philosophy.',
      canonicalContexts: [{kind: 'branch', id: 'ancient-greek'}],
    },
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-11',
      method: 'Gallery 01 supplemental review: object identity, claims, sources, rights, accessibility, provenance, and the established untitled object-led exhibit presentation.',
      resolution: 'Resolved: replaced the mismatched 2026 AI illustration with Wilfredor’s CC0 photograph of Raphael’s actual fresco and reconciled every title, caption, prose, source, provenance, credit, rights, and accessibility field.',
      lock: 'fnv1a64:236de58679ba2d2f',
    },
  },
  {
    id: SOCRATES_CONTEXT_ID,
    displayName: 'The Trial and Death of Socrates',
    shortTitle: 'The Trial and Death of Socrates',
    workLabel: 'ATHENS · 399 BCE · LITERARY WITNESS AND LATER RECEPTION',
    dateLabel: 'Trial and execution in 399 BCE · reception painting, 1802',
    question: 'What happens when examination collides with civic judgment?',
    frontSubtitle: 'Athenian law, philosophical witness, and a later image of courage',
    lead: 'In 399 BCE an Athenian jury convicted Socrates of impiety and corrupting the young. Plato’s Apology presents a defense of the examined life, while the Phaedo narrates Socrates’ final hours. Fabre’s 1802 painting belongs to the later reception of those accounts; it is not a courtroom record or eyewitness image.',
    keyIdeas: [
      'The trial joins philosophical practice to the institutions and conflicts of democratic Athens.',
      'Plato presents Socrates as refusing to abandon examination merely to secure acquittal.',
      'The surviving accounts are literary works by followers, not neutral transcripts.',
      'Later artists transformed Socrates into an emblem of principled resistance and intellectual courage.',
    ],
    cautions: [
      'Fabre’s painting was made more than two millennia after the event and is not eyewitness evidence.',
      'Its setting, companions, and figure of Socrates are artistic interpretations rather than documented likenesses.',
      'The political background and precise motives of the prosecution remain historically contested.',
    ],
    sections: [
      {
        heading: '',
        paragraphs: ['François-Xavier Fabre painted The Death of Socrates in 1802. Socrates reclines calmly and reaches toward the cup of hemlock while the people around him lean, plead, and grieve. Fabre uses the contrast between the philosopher’s composure and his companions’ distress to turn the scene into a moral drama about courage and conviction. The painting was made more than two thousand years after Socrates died and draws on literary accounts rather than living memory. It shows how a later European artist imagined the philosophical meaning of the death, not how the event looked in 399 BCE.'],
        sourceIds: ['fabre-commons', 'geneva-fabre'],
      },
      {
        heading: '',
        paragraphs: ['The surviving ancient accounts place Socrates before an Athenian jury on charges of impiety and corrupting the young. In Plato’s Apology, he defends a life devoted to questioning himself and others, and he refuses to promise silence in exchange for safety. Plato’s Phaedo presents his final hours among friends, while Xenophon offers another defense of his conduct and religious practice. Each writer had his own purpose, so their details must be compared rather than combined into a simple transcript. The trial also took place after years of war and political violence in Athens, a tense background whose precise role in the prosecution remains debated.'],
        sourceIds: ['plato-apology', 'plato-phaedo', 'xenophon-memorabilia', 'sep-socrates'],
      },
      {
        heading: '',
        paragraphs: ['The trial made Socratic examination inseparable from questions of civic authority. How far may a citizen challenge accepted beliefs? What does a community do with a public critic who unsettles younger listeners? Plato’s Socrates treats examination as a duty that outranks self-preservation, but the city answers through its lawful institutions and imposes death. Fabre’s painting helped carry that conflict into modern culture by making Socrates an emblem of integrity under pressure. Its solemn heroism should not settle every historical question, yet it reveals why this death became more than a legal episode: it offered later readers and artists a lasting image of philosophy tested by fear, loyalty, law, and mortality.'],
        sourceIds: ['plato-apology', 'plato-phaedo', 'sep-socrates', 'geneva-fabre'],
      },
    ],
    sources: [
      {id: 'plato-apology', label: 'Plato, Apology (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Plat.+Apol.', kind: 'primary-text'},
      {id: 'plato-phaedo', label: 'Plato, Phaedo (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Plat.+Phaedo', kind: 'primary-text'},
      {id: 'xenophon-memorabilia', label: 'Xenophon, Memorabilia I.1 (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Xen.+Mem.+1.1.1', kind: 'primary-text'},
      {id: 'sep-socrates', label: 'Stanford Encyclopedia of Philosophy: Socrates', url: 'https://plato.stanford.edu/entries/socrates/', kind: 'academic-reference'},
      {id: 'fabre-commons', label: 'Wikimedia Commons: Fabre painting photograph and CC BY-SA record', url: 'https://commons.wikimedia.org/wiki/File:Death_of_Socrates_-_Francois-Xavier_Fabre.jpg', kind: 'collection-record'},
      {id: 'geneva-fabre', label: 'Musée d’Art et d’Histoire de Genève: collection display dossier', url: 'https://institutions.ville-geneve.ch/fileadmin/user_upload/mah/documents/Expositions/2020/Nouvel_Accrochage_DP_V2-version-SITE.pdf', kind: 'collection-record'},
    ],
    objectInterpretation: 'Fabre’s 1802 painting draws on the literary tradition of Socrates’ final hours. Its calm central figure helped make the philosopher’s death an enduring image of conviction under pressure.',
    assetId: 'socrates-trial-interpretive',
    panelAssetId: 'socrates-trial-interpretive',
    articleRoute: {kind: 'philosopher', philosopherId: 'socrates'},
    presentation: {
      panelKicker: 'Gallery 01 historical context exhibit',
      proximityKicker: 'Historical context',
      factRows: [
        {label: 'Event', value: 'Trial and execution of Socrates'},
        {label: 'Historical setting', value: 'Athens · 399 BCE'},
        {label: 'Evidence', value: 'Ancient literary witnesses; reception painting by Fabre, 1802'},
      ],
      articleActionLabel: 'Read the full sourced Socrates article',
      entityKind: 'philosopher',
      keyIdeasLabel: 'Interpretive anchors',
      cautionsLabel: 'Historical cautions',
      exhibitLayout: 'object-led',
    },
    wallPlaque: {
      type: 'historical-event-or-institutional-context',
      invitation: 'The trial of 399 BCE made Socratic examination a test of civic judgment, law, and philosophical integrity.',
      canonicalContexts: [{kind: 'philosopher', id: 'socrates'}],
    },
    review: {
      status: 'standard-compliant',
      reviewedOn: '2026-08-11',
      method: 'Gallery 01 supplemental review: object identity, claims, sources, rights, accessibility, provenance, and the established untitled object-led exhibit presentation.',
      resolution: 'Resolved: replaced the unverified generated trial scene with Fabre’s authenticated 1802 reception painting; separated event from reception; removed the unrelated Met record and added mapped primary, scholarly, object, and rights evidence.',
      lock: 'fnv1a64:78793eb292c8bd48',
    },
  },
] as const satisfies readonly MuseumSupplementalExhibit[];

export const GALLERY_01_CONTEXT_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  {
    id: MILETUS_CONTEXT_ID,
    parentExhibitId: 'ancient-greek',
    guidedAfterExhibitId: 'anaximander',
    zoneId: 'med-orientation-nature',
    spatialCellId: 'med-orientation-nature',
    ...GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS[MILETUS_CONTEXT_ID],
    interactionRadius: 3.35,
    collider: {id: `supplemental:${MILETUS_CONTEXT_ID}`, center: GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS[MILETUS_CONTEXT_ID].position, size: {width: 4.35, depth: 1.04}, rotation: GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS[MILETUS_CONTEXT_ID].rotationY},
    assetId: 'miletus-ionian-coast-interpretive',
    mediaMount: mediaMount(MILETUS_CONTEXT_ID, 'miletus-ionian-coast-interpretive', 3.35, 2.24),
    label: {position: [0, 3.82, -.31], width: 4.05, height: .82},
    footprint: {width: 4.35, height: 4.38, depth: 1.04},
    installationKind: 'mediterranean-context',
    accent: '#2f6f78',
  },
  {
    id: RECEPTION_ID,
    parentExhibitId: 'ancient-greek',
    guidedAfterExhibitId: 'ancient-greek',
    zoneId: 'med-orientation-nature',
    spatialCellId: 'med-orientation-nature',
    ...GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS[RECEPTION_ID],
    interactionRadius: 3.35,
    collider: {id: `supplemental:${RECEPTION_ID}`, center: GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS[RECEPTION_ID].position, size: {width: 4.35, depth: 1.04}, rotation: GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS[RECEPTION_ID].rotationY},
    assetId: 'greek-philosophy-reception-interpretive',
    mediaMount: mediaMount(RECEPTION_ID, 'greek-philosophy-reception-interpretive', 3.35, 2.18),
    label: {position: [0, 3.82, -.31], width: 4.05, height: .82},
    footprint: {width: 4.35, height: 4.38, depth: 1.04},
    installationKind: 'mediterranean-context',
    accent: '#a95339',
  },
  {
    id: SOCRATES_CONTEXT_ID,
    parentExhibitId: 'socrates',
    guidedAfterExhibitId: 'socrates',
    zoneId: 'med-sophists-socratic',
    spatialCellId: 'med-sophists-socratic',
    ...GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS[SOCRATES_CONTEXT_ID],
    interactionRadius: 3.35,
    collider: {id: `supplemental:${SOCRATES_CONTEXT_ID}`, center: GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS[SOCRATES_CONTEXT_ID].position, size: {width: 4.35, depth: 1.04}, rotation: GALLERY_01_CONTEXT_SUPPLEMENTAL_PLACEMENTS[SOCRATES_CONTEXT_ID].rotationY},
    assetId: 'socrates-trial-interpretive',
    mediaMount: mediaMount(SOCRATES_CONTEXT_ID, 'socrates-trial-interpretive', 3.35, 2.2),
    label: {position: [0, 3.82, -.31], width: 4.05, height: .82},
    footprint: {width: 4.35, height: 4.38, depth: 1.04},
    installationKind: 'mediterranean-context',
    accent: '#2f6f78',
  },
] as const satisfies readonly MuseumSupplementalExhibitLayout[];

const contextById = new Map<MuseumSupplementalExhibitId, MuseumSupplementalExhibit>(
  GALLERY_01_CONTEXT_SUPPLEMENTAL_EXHIBITS.map((record) => [record.id, record]),
);

export const getGallery01ContextSupplementalExhibit = (
  id: MuseumSupplementalExhibitId,
): MuseumSupplementalExhibit => {
  const record = contextById.get(id);
  if (!record) throw new Error(`Gallery 01 context exhibit ${id} is missing.`);
  return record;
};

export const GALLERY_01_SUPPLEMENTAL_EXHIBITS = [
  ...GALLERY_01_CONTEXT_SUPPLEMENTAL_EXHIBITS,
  ...PLATO_SUPPLEMENTAL_EXHIBITS,
] as const satisfies readonly MuseumSupplementalExhibit[];

export const GALLERY_01_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
  ...GALLERY_01_CONTEXT_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  ...PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
] as const satisfies readonly MuseumSupplementalExhibitLayout[];
