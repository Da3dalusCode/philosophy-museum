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
      .filter(({layout}) => layout.parentExhibitId === exhibitId)
      .map(({exhibit}) => ({kind: 'supplemental' as const, exhibitId: exhibit.id})),
  ]);
};
