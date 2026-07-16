import type {ComponentType} from 'react';
import {getMuseumAsset, museumAssetUrl} from '../../data/museum/museumAssets';
import {MUSEUM_WORLD_DEFINITIONS} from '../../data/museum/museumWorldDefinitions';
import type {
  MuseumExhibitRef,
  MuseumHallDefinition,
} from '../../data/museum/museumWorldTypes';
import type {MuseumHallId} from '../../data/museumCatalog';

export type MuseumHallContentProps = {
  definition: MuseumHallDefinition;
  active: boolean;
  entryEntranceId?: string;
  nearby?: MuseumExhibitRef;
  visitorMapNearby: boolean;
  onSelectExhibit: (exhibit: MuseumExhibitRef) => void;
  onSelectVisitorMap: () => void;
  onSceneGesture: () => void;
};

export type MuseumHallRegistration = {
  definition: MuseumHallDefinition;
  loadContent: () => Promise<{default: ComponentType<MuseumHallContentProps>}>;
};

const contentLoaders: Record<MuseumHallId, MuseumHallRegistration['loadContent']> = {
  'ancient-greek': () => import('./AncientGreekHallScene').then(({AncientGreekHallContent}) => ({
    default: AncientGreekHallContent,
  })),
  'renaissance-reason-revolution': () => import('./RenaissanceReasonRevolutionHallScene').then(({RenaissanceReasonRevolutionHallContent}) => ({
    default: RenaissanceReasonRevolutionHallContent,
  })),
  'modernity-freedom-critique': () => import('./ModernityFreedomCritiqueHallScene').then(({ModernityFreedomCritiqueHallContent}) => ({
    default: ModernityFreedomCritiqueHallContent,
  })),
  'logic-language-science': () => import('./LogicLanguageScienceHallScene').then(({LogicLanguageScienceHallContent}) => ({
    default: LogicLanguageScienceHallContent,
  })),
  'ethics-justice-political-life': () => import('./EthicsJusticePoliticalLifeHallScene').then(({EthicsJusticePoliticalLifeHallContent}) => ({
    default: EthicsJusticePoliticalLifeHallContent,
  })),
  'mind-consciousness-self': () => import('./MindConsciousnessSelfHallScene').then(({MindConsciousnessSelfHallContent}) => ({
    default: MindConsciousnessSelfHallContent,
  })),
};

const contentPromises = new Map<MuseumHallId, Promise<{default: ComponentType<MuseumHallContentProps>}>>();
const imagePromises = new Map<string, Promise<void>>();

export const MUSEUM_WORLD_REGISTRY = MUSEUM_WORLD_DEFINITIONS.map((definition) => ({
  definition,
  loadContent: contentLoaders[definition.id],
})) satisfies readonly MuseumHallRegistration[];

export const getMuseumHallRegistration = (hallId: MuseumHallId): MuseumHallRegistration | undefined =>
  MUSEUM_WORLD_REGISTRY.find(({definition}) => definition.id === hallId);

export const loadMuseumHallContent = (
  hallId: MuseumHallId,
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

/** Load the adjacent code and only the entrance-visible media required for a safe crossing. */
export const prefetchMuseumHallEntry = async (hallId: MuseumHallId): Promise<void> => {
  const registration = getMuseumHallRegistration(hallId);
  const content = loadMuseumHallContent(hallId);
  if (!registration || !content) throw new Error(`Museum hall ${hallId} is not registered.`);
  // Scene media has a documented in-world fallback, so a single image must not
  // turn a code-ready doorway into a permanent barrier.
  const entryMedia = Promise.allSettled(registration.definition.prefetch.entrySceneAssetIds.map(preloadSceneAsset));
  await Promise.all([content, entryMedia]);
};

/** Continue warming the remaining local scene media without gating the doorway. */
export const prefetchMuseumHallRemainder = async (hallId: MuseumHallId): Promise<void> => {
  const registration = getMuseumHallRegistration(hallId);
  if (!registration) throw new Error(`Museum hall ${hallId} is not registered.`);
  await Promise.all(registration.definition.prefetch.sceneAssetIds.map(preloadSceneAsset));
};

export const prefetchMuseumHallContent = loadMuseumHallContent;
