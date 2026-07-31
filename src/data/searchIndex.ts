import type {MuseumPublicHallId} from './museumCatalog';

export type AtlasSearchRecord = {
  id: string;
  label: string;
  searchText: string;
};

export type MuseumSearchRecord = AtlasSearchRecord & {
  hallId: MuseumPublicHallId;
};

export type MuseumHallSearchRecord = Omit<AtlasSearchRecord, 'id'> & {
  id: MuseumPublicHallId;
};

export type AtlasSearchIndex = {
  schemaVersion: 1;
  branches: readonly AtlasSearchRecord[];
  philosophers: readonly AtlasSearchRecord[];
  museumHalls: readonly MuseumHallSearchRecord[];
  museumExhibits: readonly MuseumSearchRecord[];
};

let searchIndexPromise: Promise<AtlasSearchIndex> | undefined;

export const loadAtlasSearchIndex = (): Promise<AtlasSearchIndex> => {
  if (!searchIndexPromise) {
    searchIndexPromise = import('./generated/searchIndex.json')
      .then(({default: searchIndex}) => searchIndex as AtlasSearchIndex)
      .catch((error: unknown) => {
        searchIndexPromise = undefined;
        throw error;
      });
  }
  return searchIndexPromise;
};
