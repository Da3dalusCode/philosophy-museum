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

/**
 * Two contextual installations complete the six-face rhythm in Rooms 01 and
 * 03 without pretending that either subject is another canonical philosopher.
 */
export const GALLERY_01_CONTEXT_SUPPLEMENTAL_EXHIBITS = [
  {
    id: RECEPTION_ID,
    displayName: 'Remembering an Ancient Conversation',
    shortTitle: 'Remembering an Ancient Conversation',
    workLabel: 'RECEPTION · HOW LATER AGES BUILD A CANON',
    dateLabel: 'Contemporary interpretive illustration · 2026',
    question: 'Why do later ages picture philosophy as one crowded school?',
    frontSubtitle: 'A Renaissance image of a much earlier conversation',
    lead: 'This original image gathers anonymous thinkers separated by places, generations, and disagreements into one imagined architecture. The assembly is not a documentary view of archaic Miletus or classical Athens. It asks visitors to notice that every visual history selects, arranges, and interprets its beginning.',
    keyIdeas: [
      'The figures form an imagined intellectual community rather than a record of one historical meeting.',
      'Later histories often organize diverse ancient inquiries around a small set of canonical figures.',
      'The painting compresses centuries of disagreement into a single legible scene.',
      'Its monumental architecture makes philosophical inquiry look public, ordered, and continuous.',
    ],
    cautions: [
      'This image was made in 2026, more than two millennia after the thinkers in this gallery.',
      'The illustration is a curatorial prompt, not evidence for the appearance of ancient philosophers.',
      'Its canon is selective and should not be mistaken for a complete map of ancient intellectual life.',
    ],
    sections: [
      {
        heading: 'A meeting that never happened',
        paragraphs: ['The illustration places ancient thinkers in a shared hall so viewers can read relationships at a glance. That clarity is an artistic construction: the Milesians, Socrates, Plato, Aristotle, and many others did not belong to one institution or moment.'],
      },
      {
        heading: 'Why the image still matters',
        paragraphs: ['The fresco shows how later cultures build an ancestry for philosophy. Its pairings and gestures became powerful shorthand for differences among mathematics, natural inquiry, metaphysics, ethics, and civic thought.'],
      },
      {
        heading: 'Look back critically',
        paragraphs: ['Use the image as a map of Renaissance admiration, then return to the room around it: the individual exhibits restore historical distance, local settings, uncertainty, and genuine disagreement that the grand assembly smooths away.'],
      },
    ],
    sources: [
      {label: 'Vatican Museums: The School of Athens', url: 'https://www.museivaticani.va/content/museivaticani/en/collezioni/musei/stanze-di-raffaello/stanza-della-segnatura/scuola-di-atene.html', kind: 'collection-record'},
      {label: 'Wikimedia Commons: Raphael, The School of Athens', url: 'https://commons.wikimedia.org/wiki/File:Raphael_School_of_Athens.jpg', kind: 'collection-record'},
    ],
    assetId: 'greek-philosophy-reception-interpretive',
    panelAssetId: 'greek-philosophy-reception-interpretive',
    articleRoute: {kind: 'branch', branchId: 'ancient-greek'},
    wallPlaque: {
      type: 'reception-or-transmission-history',
      invitation: 'Raphael’s imagined assembly shows how the Renaissance reorganized the inheritance of ancient philosophy.',
      canonicalContexts: [{kind: 'branch', id: 'ancient-greek'}],
    },
  },
  {
    id: SOCRATES_CONTEXT_ID,
    displayName: 'The Trial and Death of Socrates',
    shortTitle: 'The Trial and Death of Socrates',
    workLabel: 'ATHENS · 399 BCE · INTERPRETIVE RECONSTRUCTION',
    dateLabel: 'Trial and execution in 399 BCE · contemporary illustration, 2026',
    question: 'What happens when examination collides with civic judgment?',
    frontSubtitle: 'Athenian law, philosophical witness, and a later image of courage',
    lead: 'In 399 BCE an Athenian jury convicted Socrates of impiety and corrupting the young. Plato’s Apology presents his defense of a life devoted to examination; the Phaedo narrates his final hours. This contemporary reconstruction places the civic encounter at the center while avoiding any claim to show the actual court, jury, or appearance of Socrates.',
    keyIdeas: [
      'The trial joins philosophical practice to the institutions and conflicts of democratic Athens.',
      'Plato presents Socrates as refusing to abandon examination merely to secure acquittal.',
      'The surviving accounts are literary works by followers, not neutral transcripts.',
      'Later artists transformed Socrates into an emblem of principled resistance and intellectual courage.',
    ],
    cautions: [
      'This image was made more than two millennia after the trial and is not eyewitness evidence.',
      'The architecture, jurors, and figure of Socrates are interpretive rather than documented likenesses.',
      'The political background and precise motives of the prosecution remain historically contested.',
    ],
    sections: [
      {
        heading: 'A philosophy practiced in public',
        paragraphs: ['Socrates questioned fellow citizens in streets, workshops, gymnasia, and gathering places. The trial makes visible the friction between that public practice, personal reputation, religious accusation, generational conflict, and the city’s recent political trauma.'],
      },
      {
        heading: 'The literary witnesses',
        paragraphs: ['Plato and Xenophon preserve different defenses of Socrates. Their works shaped the philosophical meaning of the event, but neither should be treated as a stenographic record of every word spoken in court.'],
      },
      {
        heading: 'An event repeatedly reimagined',
        paragraphs: ['Later writers and artists repeatedly turned the trial and death into arguments about reason, authority, and integrity. This exhibit separates that reception from evidence: the image is a present-day interpretive aid, while the surviving ancient literary accounts remain the starting point.'],
      },
    ],
    sources: [
      {label: 'Plato, Apology (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Plat.+Apol.', kind: 'primary-text'},
      {label: 'Plato, Phaedo (Perseus)', url: 'https://www.perseus.tufts.edu/hopper/text?doc=Plat.+Phaedo', kind: 'primary-text'},
      {label: 'The Metropolitan Museum of Art: The Death of Socrates', url: 'https://www.metmuseum.org/art/collection/search/436105', kind: 'collection-record'},
    ],
    assetId: 'socrates-trial-interpretive',
    panelAssetId: 'socrates-trial-interpretive',
    articleRoute: {kind: 'philosopher', philosopherId: 'socrates'},
    wallPlaque: {
      type: 'historical-event-or-institutional-context',
      invitation: 'The trial of 399 BCE made Socratic examination a test of civic judgment, law, and philosophical integrity.',
      canonicalContexts: [{kind: 'philosopher', id: 'socrates'}],
    },
  },
] as const satisfies readonly MuseumSupplementalExhibit[];

export const GALLERY_01_CONTEXT_SUPPLEMENTAL_EXHIBIT_LAYOUTS = [
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
