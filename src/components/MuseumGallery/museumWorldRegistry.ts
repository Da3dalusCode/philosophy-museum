import type {ComponentType} from 'react';
import {ANCIENT_GREEK_HALL_DEFINITION} from '../../data/museum/ancientGreekHall';
import type {
  MuseumExhibitRef,
  MuseumHallDefinition,
} from '../../data/museum/museumWorldTypes';
import type {MuseumHallId} from '../../data/museumCatalog';

export type MuseumHallContentProps = {
  definition: MuseumHallDefinition;
  nearby?: MuseumExhibitRef;
  onSelectExhibit: (exhibit: MuseumExhibitRef) => void;
  onSceneGesture: () => void;
};

export type MuseumHallRegistration = {
  definition: MuseumHallDefinition;
  loadContent: () => Promise<{default: ComponentType<MuseumHallContentProps>}>;
};

const ancientGreekRegistration: MuseumHallRegistration = {
  definition: ANCIENT_GREEK_HALL_DEFINITION,
  loadContent: () => import('./AncientGreekHallScene').then(({AncientGreekHallContent}) => ({
    default: AncientGreekHallContent,
  })),
};

export const MUSEUM_WORLD_REGISTRY = [
  ancientGreekRegistration,
] as const satisfies readonly MuseumHallRegistration[];

export const getMuseumHallRegistration = (hallId: MuseumHallId): MuseumHallRegistration | undefined =>
  MUSEUM_WORLD_REGISTRY.find(({definition}) => definition.id === hallId);

export const prefetchMuseumHallContent = (hallId: MuseumHallId): Promise<unknown> | undefined =>
  getMuseumHallRegistration(hallId)?.loadContent();
