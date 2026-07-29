import type {
  MuseumExhibitId,
  MuseumPublicHallId,
} from '../museumCatalog';
import {
  PLATO_SUPPLEMENTAL_EXHIBITS,
  PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  type MuseumSupplementalExhibit,
} from './platoSupplementalExhibits';
import {
  RENAISSANCE_SUPPLEMENTAL_EXHIBITS,
  RENAISSANCE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './renaissanceSupplementalExhibits';
import {
  PHENOMENOLOGY_SUPPLEMENTAL_EXHIBITS,
  PHENOMENOLOGY_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './phenomenologySupplementalExhibits';
import {
  ANALYTIC_SUPPLEMENTAL_EXHIBITS,
  ANALYTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './analyticSupplementalExhibits';
import {
  JUSTICE_SUPPLEMENTAL_EXHIBITS,
  JUSTICE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './justiceSupplementalExhibits';
import {
  CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBITS,
  CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './classicalSouthAsianSupplementalExhibits';
import {
  BUDDHIST_SUPPLEMENTAL_EXHIBITS,
  BUDDHIST_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './buddhistSupplementalExhibits';
import {
  CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBITS,
  CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './classicalChineseSupplementalExhibits';
import {
  ISLAMIC_SUPPLEMENTAL_EXHIBITS,
  ISLAMIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './islamicSupplementalExhibits';
import {
  EAST_ASIAN_SUPPLEMENTAL_EXHIBITS,
  EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './eastAsianSupplementalExhibits';
import {
  JEWISH_SUPPLEMENTAL_EXHIBITS,
  JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './jewishSupplementalExhibits';
import {
  CORE_QUESTIONS_FORUM_SUPPLEMENTAL_EXHIBITS,
  CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS,
} from './coreQuestionsForumSupplementalExhibits';
import {
  HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBITS,
  HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './hellenisticRomanSupplementalExhibits';
import {
  LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBITS,
  LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './lateAntiquitySupplementalExhibits';
import {
  LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBITS,
  LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './latinChristianScholasticSupplementalExhibits';
import {
  RATIONALISM_SUPPLEMENTAL_EXHIBITS,
  RATIONALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './rationalismSupplementalExhibits';
import type {
  MuseumSupplementalExhibitId,
  MuseumSupplementalExhibitLayout,
} from './museumWorldTypes';

type MuseumSupplementalCollection = {
  hallId: MuseumPublicHallId;
  exhibits: readonly MuseumSupplementalExhibit[];
  layouts: readonly MuseumSupplementalExhibitLayout[];
};

export type MuseumSupplementalExhibitEntry = {
  hallId: MuseumPublicHallId;
  exhibit: MuseumSupplementalExhibit;
  layout: MuseumSupplementalExhibitLayout;
};

export type MuseumGuidedStop =
  | {kind: 'primary'; exhibitId: MuseumExhibitId}
  | {kind: 'supplemental'; exhibitId: MuseumSupplementalExhibitId};

const COLLECTIONS = [
  {
    hallId: 'core-questions-forum',
    exhibits: CORE_QUESTIONS_FORUM_SUPPLEMENTAL_EXHIBITS,
    layouts: CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS,
  },
  {
    hallId: 'mediterranean-beginnings-classical',
    exhibits: PLATO_SUPPLEMENTAL_EXHIBITS,
    layouts: PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'renaissance-humanism-new-method',
    exhibits: RENAISSANCE_SUPPLEMENTAL_EXHIBITS,
    layouts: RENAISSANCE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'phenomenology-existence-embodiment',
    exhibits: PHENOMENOLOGY_SUPPLEMENTAL_EXHIBITS,
    layouts: PHENOMENOLOGY_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'analytic-traditions',
    exhibits: ANALYTIC_SUPPLEMENTAL_EXHIBITS,
    layouts: ANALYTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'justice-democratic-reason',
    exhibits: JUSTICE_SUPPLEMENTAL_EXHIBITS,
    layouts: JUSTICE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'classical-south-asian-worlds',
    exhibits: CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBITS,
    layouts: CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'buddhist-philosophies',
    exhibits: BUDDHIST_SUPPLEMENTAL_EXHIBITS,
    layouts: BUDDHIST_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'classical-chinese-traditions',
    exhibits: CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBITS,
    layouts: CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'islamic-philosophical-worlds',
    exhibits: ISLAMIC_SUPPLEMENTAL_EXHIBITS,
    layouts: ISLAMIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'east-asian-continuities',
    exhibits: EAST_ASIAN_SUPPLEMENTAL_EXHIBITS,
    layouts: EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'jewish-philosophy',
    exhibits: JEWISH_SUPPLEMENTAL_EXHIBITS,
    layouts: JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'latin-christian-scholastic',
    exhibits: LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBITS,
    layouts: LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'hellenistic-roman-ways',
    exhibits: HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBITS,
    layouts: HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'late-antiquity-inheritance',
    exhibits: LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBITS,
    layouts: LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
  {
    hallId: 'rationalism-mind-nature-system',
    exhibits: RATIONALISM_SUPPLEMENTAL_EXHIBITS,
    layouts: RATIONALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  },
] as const satisfies readonly MuseumSupplementalCollection[];

export const MUSEUM_SUPPLEMENTAL_EXHIBITS: readonly MuseumSupplementalExhibitEntry[] =
  COLLECTIONS.flatMap(({hallId, exhibits, layouts}) => exhibits.map((exhibit) => {
    const layout = layouts.find(({id}) => id === exhibit.id);
    if (!layout) throw new Error(`Supplemental exhibit ${exhibit.id} has no layout in ${hallId}.`);
    return {hallId, exhibit, layout};
  }));

export const getMuseumSupplementalExhibitsForHall = (
  hallId: MuseumPublicHallId,
): readonly MuseumSupplementalExhibitEntry[] =>
  MUSEUM_SUPPLEMENTAL_EXHIBITS.filter((entry) => entry.hallId === hallId);

export const findMuseumSupplementalExhibitEntry = (
  hallId: MuseumPublicHallId,
  exhibitId: string | undefined,
): MuseumSupplementalExhibitEntry | undefined =>
  exhibitId
    ? MUSEUM_SUPPLEMENTAL_EXHIBITS.find(
      (entry) => entry.hallId === hallId && entry.exhibit.id === exhibitId,
    )
    : undefined;

export const findMuseumSupplementalExhibit = (
  hallId: MuseumPublicHallId,
  exhibitId: string | undefined,
): MuseumSupplementalExhibit | undefined =>
  findMuseumSupplementalExhibitEntry(hallId, exhibitId)?.exhibit;

export const isMuseumSupplementalExhibitId = (
  hallId: MuseumPublicHallId,
  exhibitId: string | undefined,
): exhibitId is MuseumSupplementalExhibitId =>
  Boolean(findMuseumSupplementalExhibitEntry(hallId, exhibitId));

export const getMuseumGuidedStops = (
  hallId: MuseumPublicHallId,
  primaryOrder: readonly MuseumExhibitId[],
): readonly MuseumGuidedStop[] => {
  const supplemental = getMuseumSupplementalExhibitsForHall(hallId);
  return primaryOrder.flatMap((exhibitId) => [
    {kind: 'primary' as const, exhibitId},
    ...supplemental
      .filter(({layout}) => (layout.guidedAfterExhibitId ?? layout.parentExhibitId) === exhibitId)
      .map(({exhibit}) => ({kind: 'supplemental' as const, exhibitId: exhibit.id})),
  ]);
};
