import type {MuseumWallDefinition} from './museumWorldTypes';

export const EMPIRICISM_GALLERY_ID = 'empiricism-science-political-order' as const;

export const EMPIRICISM_HALL_DIMENSIONS = Object.freeze({
  width: 24,
  depth: 56,
  ceilingHeight: 5.8,
  wallThickness: .36,
  openingWidth: 4,
  openingHeight: 3.2,
});

/** Gallery 17 preserves the approved three-room sequence and fills six wall bays per room. */
export const EMPIRICISM_PRIMARY_PLACEMENTS = {
  empiricism: {x: -10.85, z: -18.6667, rotationY: Math.PI / 2},
  locke: {x: 10.85, z: -18.6667, rotationY: -Math.PI / 2},
  berkeley: {x: -10.85, z: 0, rotationY: Math.PI / 2},
  hume: {x: -10.85, z: 18.6667, rotationY: Math.PI / 2},
} as const;

export const EMPIRICISM_ROOM_ENTRY_POSES = {
  'empiricism-locke-ideas-rights': {x: -3.5, z: -18.6667, yaw: Math.PI / 2, pitch: -.02},
  'empiricism-berkeley-perception': {x: -3.5, z: 0, yaw: Math.PI / 2, pitch: -.02},
  'empiricism-hume-skepticism': {x: -3.5, z: 18.6667, yaw: Math.PI / 2, pitch: -.02},
} as const;

export const EMPIRICISM_ROOM_SIGN_COPY = {
  'empiricism-locke-ideas-rights': {
    kicker: 'Room 01 · Experience, identity, and authority',
    title: 'Locke: Ideas, Persons, Rights',
    subtitle: 'Experience supplies the materials of thought while memory, toleration, property, government, and colonial power complicate the promise of equal freedom.',
  },
  'empiricism-berkeley-perception': {
    kicker: 'Room 02 · Vision without material substance',
    title: 'Berkeley: Perception and Immaterialism',
    subtitle: 'Problems of distance, abstraction, sensible objects, language, spirit, and divine order turn empiricism against an independently material world.',
  },
  'empiricism-hume-skepticism': {
    kicker: 'Room 03 · Habit, sentiment, and common life',
    title: 'Hume: Experience at Its Limits',
    subtitle: 'Causation, induction, personal identity, morality, religion, and mitigated skepticism test what experience warrants and how human beings keep judging.',
  },
} as const;

/** Render-only lintels preserve the approved sequence shell without closing its 2D openings. */
export const empiricismInteriorLintels = (
  prefix = EMPIRICISM_GALLERY_ID,
): readonly MuseumWallDefinition[] => {
  const {ceilingHeight, openingHeight, wallThickness, openingWidth} = EMPIRICISM_HALL_DIMENSIONS;
  const height = ceilingHeight - openingHeight;
  return [
    {
      id: `${prefix}:empiricism-locke-berkeley-lintel`,
      center: {x: 0, z: -9.333333},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:empiricism-locke-ideas-rights:empiricism-berkeley-perception',
    },
    {
      id: `${prefix}:empiricism-berkeley-hume-lintel`,
      center: {x: 0, z: 9.333333},
      size: {width: openingWidth, depth: wallThickness},
      rotation: 0,
      height,
      bottom: openingHeight,
      openingId: 'threshold:empiricism-berkeley-perception:empiricism-hume-skepticism',
    },
  ];
};
