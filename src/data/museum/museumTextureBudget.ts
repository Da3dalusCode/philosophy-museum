import type {MuseumHallId} from '../museumCatalog';
import {MUSEUM_BUILDING_MANIFEST} from './museumBuildingManifest';
import {getMuseumAsset} from './museumAssets';
import {
  bytesToMiB,
  decodedTextureBytes,
  MUSEUM_TEXTURE_SPECS,
  museumTextureDimensionsForPlane,
  type MuseumDecodedTextureSpec,
} from './museumTexturePolicy';
import {MUSEUM_WORLD_DEFINITIONS} from './museumWorldDefinitions';
import type {MuseumExhibitLayout} from './museumWorldTypes';

export type MuseumHallTextureMode = 'active' | 'entry-resident';

export type MuseumHallTextureEstimate = {
  hallId: MuseumHallId;
  mode: MuseumHallTextureMode;
  exhibitCount: number;
  sceneAssetCount: number;
  sceneBytes: number;
  generatedBytes: number;
  totalBytes: number;
  totalMiB: number;
};

const textureBudgetBytes =
  MUSEUM_BUILDING_MANIFEST.residencyPolicy.decodedTextureBudgetMiB * 1024 * 1024;

const sumSpecs = (specs: readonly MuseumDecodedTextureSpec[]): number =>
  specs.reduce((sum, spec) => sum + decodedTextureBytes(spec), 0);

const sceneAssetBytes = (assetId: Parameters<typeof getMuseumAsset>[0]): number => {
  const scene = getMuseumAsset(assetId).variants.scene;
  const sourceBytes = decodedTextureBytes({...scene, mipmaps: false});
  // A failed source is replaced, not retained beside the fallback. Reserve the
  // larger allocation so failure mode remains inside the same residency budget.
  return Math.max(sourceBytes, decodedTextureBytes(MUSEUM_TEXTURE_SPECS.sceneFallback));
};

const generatedSpecsForExhibit = (
  hallId: MuseumHallId,
  exhibit: MuseumExhibitLayout,
): readonly MuseumDecodedTextureSpec[] => {
  const plaque = museumTextureDimensionsForPlane(
    exhibit.scene.plaque.width,
    exhibit.scene.plaque.height,
    MUSEUM_TEXTURE_SPECS.plaque,
  );
  if (hallId === 'ancient-greek') return [plaque];
  const backing = exhibit.scene.objectBounds.find(({id}) => id.endsWith('-backing'));
  if (!backing) throw new Error(`Museum texture estimate cannot resolve the name-strip backing for ${exhibit.id}.`);
  const interpretationWidth = backing.size.width - .16;
  const interpretationHeight = exhibit.scene.mediaMounts.length > 0
    ? .42
    : Math.min(1.55, backing.size.height - .48);
  return [
    plaque,
    museumTextureDimensionsForPlane(
      interpretationWidth,
      interpretationHeight,
      MUSEUM_TEXTURE_SPECS.contemporaryNameStrip,
    ),
  ];
};

const generatedHallSpecs = (hallId: MuseumHallId): readonly MuseumDecodedTextureSpec[] => {
  const definition = MUSEUM_WORLD_DEFINITIONS.find(({id}) => id === hallId);
  if (!definition) throw new Error(`Museum texture estimate cannot resolve hall ${hallId}.`);
  if (hallId === 'ancient-greek') {
    const orientation = definition.layout.furnishings.find(({kind}) => kind === 'orientation-plinth');
    if (!orientation) throw new Error('Museum texture estimate cannot resolve the Ancient orientation plinth.');
    return [
      ...Array.from(
        {length: MUSEUM_TEXTURE_SPECS.ancientGallerySignCount},
        () => MUSEUM_TEXTURE_SPECS.plaque,
      ),
      museumTextureDimensionsForPlane(
        orientation.size.width - .34,
        .74,
        MUSEUM_TEXTURE_SPECS.ancientOrientationPlinth,
      ),
      MUSEUM_TEXTURE_SPECS.visitorMapKiosk,
    ];
  }
  const signs = (definition.layout.signs ?? []).map((sign) => {
    const reference = {
      width: MUSEUM_TEXTURE_SPECS.contemporarySignWidth,
      height: Math.round(MUSEUM_TEXTURE_SPECS.contemporarySignWidth * sign.height / sign.width),
      mipmaps: true,
    };
    return museumTextureDimensionsForPlane(sign.width, sign.height, reference);
  });
  return hallId === MUSEUM_BUILDING_MANIFEST.kiosk.publicHallId
    ? [...signs, MUSEUM_TEXTURE_SPECS.visitorMapKiosk]
    : signs;
};

/**
 * Conservative GPU allocation for one lazy hall subtree. Entry-resident mode
 * uses the doorway-gated entry asset set, including every exhibit touched by
 * that set; active mode includes the complete hall.
 */
export const estimateMuseumHallTextureResidency = (
  hallId: MuseumHallId,
  mode: MuseumHallTextureMode,
): MuseumHallTextureEstimate => {
  const definition = MUSEUM_WORLD_DEFINITIONS.find(({id}) => id === hallId);
  if (!definition) throw new Error(`Museum texture estimate cannot resolve hall ${hallId}.`);
  const entryExhibitIds = new Set(
    Object.values(definition.prefetch.entryExhibitIdsByEntrance).flat(),
  );
  const exhibits = mode === 'active'
    ? definition.layout.exhibits
    : definition.layout.exhibits.filter(({id}) => entryExhibitIds.has(id));
  const sceneAssetIds = [...new Set(exhibits.flatMap(({scene}) =>
    scene.mediaMounts.map(({assetId}) => assetId)))];
  const sceneBytes = sceneAssetIds.reduce((sum, assetId) => sum + sceneAssetBytes(assetId), 0);
  const generatedBytes = sumSpecs([
    ...generatedHallSpecs(hallId),
    ...exhibits.flatMap((exhibit) => generatedSpecsForExhibit(hallId, exhibit)),
  ]);
  const totalBytes = sceneBytes + generatedBytes;
  return {
    hallId,
    mode,
    exhibitCount: exhibits.length,
    sceneAssetCount: sceneAssetIds.length,
    sceneBytes,
    generatedBytes,
    totalBytes,
    totalMiB: bytesToMiB(totalBytes),
  };
};

export const MUSEUM_DECODED_TEXTURE_BUDGET_BYTES = textureBudgetBytes;
export const MUSEUM_DECODED_TEXTURE_BUDGET_MIB =
  MUSEUM_BUILDING_MANIFEST.residencyPolicy.decodedTextureBudgetMiB;
