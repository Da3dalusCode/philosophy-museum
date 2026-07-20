import type {ComponentType} from 'react';
import {getMuseumAsset, museumAssetUrl} from '../../data/museum/museumAssets';
import {MUSEUM_WORLD_DEFINITIONS} from '../../data/museum/museumWorldDefinitions';
import type {
  MuseumExhibitRef,
  MuseumHallDefinition,
  MuseumSupplementalExhibitRef,
} from '../../data/museum/museumWorldTypes';
import {MUSEUM_CANONICAL_HALL_IDS} from '../../data/museum/museumCanonicalProgram';
import type {MuseumPublicHallId} from '../../data/museumCatalog';

export type MuseumHallContentProps = {
  definition: MuseumHallDefinition;
  active: boolean;
  entryEntranceId?: string;
  nearby?: MuseumExhibitRef;
  nearbySupplemental?: MuseumSupplementalExhibitRef;
  visitorMapNearby: boolean;
  onSelectExhibit: (exhibit: MuseumExhibitRef) => void;
  onSelectSupplementalExhibit: (exhibit: MuseumSupplementalExhibitRef) => void;
  onSelectVisitorMap: () => void;
  onSceneGesture: () => void;
};

export type MuseumHallRegistration = {
  definition: MuseumHallDefinition;
  loadContent: () => Promise<{default: ComponentType<MuseumHallContentProps>}>;
};

const canonicalContentLoader: MuseumHallRegistration['loadContent'] = () =>
  import('./CanonicalMuseumHallScene').then(({CanonicalMuseumHallContent}) => ({
    default: CanonicalMuseumHallContent,
  }));

const contentLoaders = Object.fromEntries(
  MUSEUM_CANONICAL_HALL_IDS.map((hallId) => [hallId, canonicalContentLoader]),
) as Record<MuseumPublicHallId, MuseumHallRegistration['loadContent']>;

const contentPromises = new Map<MuseumPublicHallId, Promise<{default: ComponentType<MuseumHallContentProps>}>>();
const imagePromises = new Map<string, Promise<void>>();

export const MUSEUM_WORLD_REGISTRY = MUSEUM_WORLD_DEFINITIONS.map((definition) => ({
  definition,
  loadContent: contentLoaders[definition.id as MuseumPublicHallId],
})) satisfies readonly MuseumHallRegistration[];

export const getMuseumHallRegistration = (hallId: MuseumPublicHallId): MuseumHallRegistration | undefined =>
  MUSEUM_WORLD_REGISTRY.find(({definition}) => definition.id === hallId);

export const loadMuseumHallContent = (
  hallId: MuseumPublicHallId,
): Promise<{default: ComponentType<MuseumHallContentProps>}> | undefined => {
  const registration = getMuseumHallRegistration(hallId);
  if (!registration) return undefined;
  const existing = contentPromises.get(hallId);
  if (existing) return existing;
  const promise = registration.loadContent().catch((error) => {
    contentPromises.delete(hallId);
    throw error;
  });
  contentPromises.set(hallId, promise);
  return promise;
};

const preloadSceneAsset = (assetId: Parameters<typeof getMuseumAsset>[0]): Promise<void> => {
  const url = museumAssetUrl(getMuseumAsset(assetId).variants.scene);
  const existing = imagePromises.get(url);
  if (existing) return existing;
  if (typeof Image === 'undefined') return Promise.resolve();
  const promise = new Promise<void>((resolve, reject) => {
    const image = new Image();
    const timeout = window.setTimeout(() => {
      image.src = '';
      reject(new Error(`Timed out while preloading Museum scene media ${assetId}.`));
    }, 12_000);
    image.decoding = 'async';
    image.onload = () => {
      window.clearTimeout(timeout);
      void image.decode().catch(() => undefined).finally(resolve);
    };
    image.onerror = () => {
      window.clearTimeout(timeout);
      reject(new Error(`Unable to preload Museum scene media ${assetId}.`));
    };
    image.src = url;
  }).catch((error) => {
    imagePromises.delete(url);
    throw error;
  });
  imagePromises.set(url, promise);
  return promise;
};

/** Load adjacent code and only the media visible from the specifically approached entrance. */
export const prefetchMuseumHallEntry = async (
  hallId: MuseumPublicHallId,
  entranceId?: string,
): Promise<void> => {
  const registration = getMuseumHallRegistration(hallId);
  const content = loadMuseumHallContent(hallId);
  if (!registration || !content) throw new Error(`Museum hall ${hallId} is not registered.`);
  // Scene media has a documented in-world fallback, so a single image must not
  // turn a code-ready doorway into a permanent barrier.
  const assetIds = entranceId === undefined
    ? registration.definition.prefetch.entrySceneAssetIds
    : registration.definition.prefetch.entrySceneAssetIdsByEntrance?.[entranceId] ?? [];
  const entryMedia = Promise.allSettled(assetIds.map(preloadSceneAsset));
  await Promise.all([content, entryMedia]);
};

/** Continue warming the remaining local scene media without gating the doorway. */
export const prefetchMuseumHallRemainder = async (hallId: MuseumPublicHallId): Promise<void> => {
  const registration = getMuseumHallRegistration(hallId);
  if (!registration) throw new Error(`Museum hall ${hallId} is not registered.`);
  await Promise.all(registration.definition.prefetch.sceneAssetIds.map(preloadSceneAsset));
};

export const prefetchMuseumHallContent = loadMuseumHallContent;
