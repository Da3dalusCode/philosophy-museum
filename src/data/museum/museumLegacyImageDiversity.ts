import imageDiversity from './museumLegacyImageDiversity.json';
import type {
  MuseumAssetId,
  MuseumAssetRecord,
  MuseumVisualCharacter,
} from './museumAssetTypes';

export const MUSEUM_LEGACY_IMAGE_DIVERSITY_VERSION = imageDiversity.version;
export const MUSEUM_MAXIMUM_TEXT_DOMINANT_OR_SINGLE_BOOK_PER_ROOM =
  imageDiversity.maximumTextDominantOrSingleBookPerRoom;

export const MUSEUM_LEGACY_CONTEXTUAL_COMPOSITE_ASSET_IDS = Object.freeze(
  Object.keys(imageDiversity.contextualComposites) as MuseumAssetId[],
);

export const MUSEUM_LEGACY_RETAINED_TEXT_DOMINANT_OR_SINGLE_BOOK_ASSET_IDS = Object.freeze(
  imageDiversity.retainedTextDominantOrSingleBookAssetIds as MuseumAssetId[],
);

export const MUSEUM_LEGACY_VISUALLY_RICH_TEXTUAL_MEDIA_ASSET_IDS = Object.freeze(
  imageDiversity.visuallyRichTextualMediaAssetIds as MuseumAssetId[],
);

const contextualCompositeIds = new Set<MuseumAssetId>(
  MUSEUM_LEGACY_CONTEXTUAL_COMPOSITE_ASSET_IDS,
);
const retainedTextDominantIds = new Set<MuseumAssetId>(
  MUSEUM_LEGACY_RETAINED_TEXT_DOMINANT_OR_SINGLE_BOOK_ASSET_IDS,
);
const contextualCompositeSpecifications = imageDiversity.contextualComposites as Record<
  string,
  {motif: string; palette: string; artifactSide: string}
>;

export const museumLegacyVisualCharacter = (
  id: MuseumAssetId,
): MuseumVisualCharacter | undefined => {
  if (contextualCompositeIds.has(id)) return 'contextual-composite';
  if (retainedTextDominantIds.has(id)) return 'text-dominant';
  return undefined;
};

export const applyMuseumLegacyImageDiversityMetadata = (
  asset: MuseumAssetRecord,
): MuseumAssetRecord => {
  const visualCharacter = museumLegacyVisualCharacter(asset.id);
  if (!visualCharacter) return asset;
  if (visualCharacter === 'text-dominant') return {...asset, visualCharacter};
  const motif = contextualCompositeSpecifications[asset.id]?.motif.replaceAll('-', ' ')
    ?? 'the exhibit’s central problem';
  const insetDescription = asset.alt.charAt(0).toLowerCase() + asset.alt.slice(1);
  return {
    ...asset,
    visualCharacter,
    alt:
      `Contemporary Philosophy Atlas contextual study of ${motif}; ${insetDescription} appears as a subordinate authenticated-source inset.`,
    caption:
      `${asset.caption} The source object is shown as a subordinate inset within a contemporary contextual study of ${motif}.`,
    historicalNote:
      `${asset.historicalNote} The surrounding diagram is a 2026 Philosophy Atlas interpretation, not a historical reconstruction or additional documentary evidence.`,
    derivativeNotice:
      'The authenticated source object was resized and converted to WebP as a subordinate inset within a contemporary Philosophy Atlas Museum contextual composite. The surrounding visual study is interpretive, not a historical reconstruction.',
  };
};
