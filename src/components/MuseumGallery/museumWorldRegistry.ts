import type {ComponentType} from 'react';
import {ANCIENT_GREEK_HALL_DEFINITION} from '../../data/museum/ancientGreekHall';
import {ETHICS_JUSTICE_POLITICAL_LIFE_HALL_DEFINITION} from '../../data/museum/ethicsJusticePoliticalLifeHall';
import {LOGIC_LANGUAGE_SCIENCE_HALL_DEFINITION} from '../../data/museum/logicLanguageScienceHall';
import {MIND_CONSCIOUSNESS_SELF_HALL_DEFINITION} from '../../data/museum/mindConsciousnessSelfHall';
import {MODERNITY_FREEDOM_CRITIQUE_HALL_DEFINITION} from '../../data/museum/modernityFreedomCritiqueHall';
import {RENAISSANCE_REASON_REVOLUTION_HALL_DEFINITION} from '../../data/museum/renaissanceReasonRevolutionHall';
import {getMuseumAsset, museumAssetUrl} from '../../data/museum/museumAssets';
import type {
  MuseumExhibitRef,
  MuseumHallDefinition,
} from '../../data/museum/museumWorldTypes';
import type {MuseumHallId} from '../../data/museumCatalog';

export type MuseumHallContentProps = {
  definition: MuseumHallDefinition;
  active: boolean;
  viewerHallId: MuseumHallId;
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

const renaissanceReasonRevolutionRegistration: MuseumHallRegistration = {
  definition: RENAISSANCE_REASON_REVOLUTION_HALL_DEFINITION,
  loadContent: () => import('./RenaissanceReasonRevolutionHallScene').then(({RenaissanceReasonRevolutionHallContent}) => ({
    default: RenaissanceReasonRevolutionHallContent,
  })),
};

const modernityFreedomCritiqueRegistration: MuseumHallRegistration = {
  definition: MODERNITY_FREEDOM_CRITIQUE_HALL_DEFINITION,
  loadContent: () => import('./ModernityFreedomCritiqueHallScene').then(({ModernityFreedomCritiqueHallContent}) => ({
    default: ModernityFreedomCritiqueHallContent,
  })),
};

const logicLanguageScienceRegistration: MuseumHallRegistration = {
  definition: LOGIC_LANGUAGE_SCIENCE_HALL_DEFINITION,
  loadContent: () => import('./LogicLanguageScienceHallScene').then(({LogicLanguageScienceHallContent}) => ({
    default: LogicLanguageScienceHallContent,
  })),
};

const ethicsJusticePoliticalLifeRegistration: MuseumHallRegistration = {
  definition: ETHICS_JUSTICE_POLITICAL_LIFE_HALL_DEFINITION,
  loadContent: () => import('./EthicsJusticePoliticalLifeHallScene').then(({EthicsJusticePoliticalLifeHallContent}) => ({
    default: EthicsJusticePoliticalLifeHallContent,
  })),
};

const mindConsciousnessSelfRegistration: MuseumHallRegistration = {
  definition: MIND_CONSCIOUSNESS_SELF_HALL_DEFINITION,
  loadContent: () => import('./MindConsciousnessSelfHallScene').then(({MindConsciousnessSelfHallContent}) => ({
    default: MindConsciousnessSelfHallContent,
  })),
};

const contentPromises = new Map<MuseumHallId, Promise<{default: ComponentType<MuseumHallContentProps>}>>();
const imagePromises = new Map<string, Promise<void>>();

export const MUSEUM_WORLD_REGISTRY = [
  ancientGreekRegistration,
  renaissanceReasonRevolutionRegistration,
  modernityFreedomCritiqueRegistration,
  logicLanguageScienceRegistration,
  ethicsJusticePoliticalLifeRegistration,
  mindConsciousnessSelfRegistration,
] as const satisfies readonly MuseumHallRegistration[];

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
