import imageDiversity from './museumLegacyImageDiversity.json';
import type {
  MuseumAssetId,
  MuseumAssetRecord,
  MuseumAssetVariant,
  MuseumVisualCharacter,
} from './museumAssetTypes';

export const MUSEUM_LEGACY_IMAGE_DIVERSITY_VERSION = imageDiversity.version;
export const MUSEUM_MAXIMUM_TEXT_DOMINANT_OR_SINGLE_BOOK_PER_ROOM =
  imageDiversity.maximumTextDominantOrSingleBookPerRoom;

export const MUSEUM_LEGACY_STANDALONE_REPLACEMENT_ASSET_IDS = Object.freeze(
  Object.keys(imageDiversity.standaloneReplacements) as MuseumAssetId[],
);

export const MUSEUM_LEGACY_RETAINED_TEXT_DOMINANT_OR_SINGLE_BOOK_ASSET_IDS = Object.freeze(
  imageDiversity.retainedTextDominantOrSingleBookAssetIds as MuseumAssetId[],
);

export const MUSEUM_LEGACY_VISUALLY_RICH_TEXTUAL_MEDIA_ASSET_IDS = Object.freeze(
  imageDiversity.visuallyRichTextualMediaAssetIds as MuseumAssetId[],
);

const retainedTextDominantIds = new Set<MuseumAssetId>(
  MUSEUM_LEGACY_RETAINED_TEXT_DOMINANT_OR_SINGLE_BOOK_ASSET_IDS,
);

type StandaloneReplacementMetadata = Omit<
  Partial<MuseumAssetRecord>,
  'id' | 'entityKind' | 'entityId' | 'role' | 'variants'
> & {
  visualCharacter: Exclude<MuseumVisualCharacter, 'text-dominant'>;
  variants: {
    scene: Pick<MuseumAssetVariant, 'width' | 'height'>;
    panel: Pick<MuseumAssetVariant, 'width' | 'height'>;
  };
  hallFolder: string;
  sourceImageUrl: string;
  selectedThumbnailUrl: string;
  sourceKind?: string;
  localSourcePath?: string;
  cropBox?: [number, number, number, number];
};

const standaloneReplacements = imageDiversity.standaloneReplacements as unknown as Record<
  MuseumAssetId,
  StandaloneReplacementMetadata
>;

export const museumLegacyVisualCharacter = (
  id: MuseumAssetId,
): MuseumVisualCharacter | undefined => {
  if (standaloneReplacements[id]) return standaloneReplacements[id].visualCharacter;
  if (retainedTextDominantIds.has(id)) return 'text-dominant';
  return undefined;
};

export const applyMuseumLegacyImageDiversityMetadata = (
  asset: MuseumAssetRecord,
): MuseumAssetRecord => {
  const replacement = standaloneReplacements[asset.id];
  if (!replacement) {
    return retainedTextDominantIds.has(asset.id)
      ? {...asset, visualCharacter: 'text-dominant'}
      : asset;
  }
  const {
    hallFolder: _hallFolder,
    sourceImageUrl: _sourceImageUrl,
    selectedThumbnailUrl: _selectedThumbnailUrl,
    sourceKind: _sourceKind,
    localSourcePath: _localSourcePath,
    cropBox,
    variants,
    ...metadata
  } = replacement;
  return {
    ...asset,
    imageCreator: undefined,
    objectPageUrl: undefined,
    licenseUrl: undefined,
    focalPoint: undefined,
    ...metadata,
    variants: {
      scene: {...asset.variants.scene, ...variants.scene},
      panel: {...asset.variants.panel, ...variants.panel},
    },
    derivativeNotice: cropBox
      ? 'The source image was cropped to its pictorial subject, resized, and converted to WebP by Philosophy Atlas; no interpretive elements were added.'
      : 'The source image was resized and converted to WebP by Philosophy Atlas; no interpretive elements were added.',
  };
};
