import type {MuseumHallId} from '../museumCatalog';
import {MUSEUM_BUILDING_MANIFEST} from './museumBuildingManifest';
import {getMuseumAsset} from './museumAssets';
import {
  MEDITERRANEAN_GALLERY_ID,
} from './mediterraneanGalleryCuration';
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

export type MuseumPersistentTextureEstimate = {
  buildingSignBytes: number;
  reservationSignBytes: number;
  readinessGateBytes: number;
  maximumSimultaneousReadinessGates: number;
  totalBytes: number;
  totalMiB: number;
};

const textureBudgetBytes =
  MUSEUM_BUILDING_MANIFEST.residencyPolicy.decodedTextureBudgetMiB * 1024 * 1024;

const sumSpecs = (specs: readonly MuseumDecodedTextureSpec[]): number =>
  specs.reduce((sum, spec) => sum + decodedTextureBytes(spec), 0);

const publicHallNodeIds = new Set(
  MUSEUM_BUILDING_MANIFEST.nodes
    .filter(({publicHallId}) => Boolean(publicHallId))
    .map(({id}) => id),
);

/**
 * Conservatively reserve every always-mounted building label and the largest
 * number of hall gates that one runtime node can show at once.
 */
const persistentTextureEstimate = (): MuseumPersistentTextureEstimate => {
  const buildingSignBytes = decodedTextureBytes(museumTextureDimensionsForPlane(
    5.6,
    5.6 * .27,
    MUSEUM_TEXTURE_SPECS.buildingSign,
  ));
  const reservationSignBytes = MUSEUM_BUILDING_MANIFEST.reservations.reduce((sum, reservation) =>
    sum + decodedTextureBytes(museumTextureDimensionsForPlane(
      reservation.barrierWidth * .9,
      reservation.barrierWidth * .245,
      MUSEUM_TEXTURE_SPECS.reservationSign,
    )), 0);
  const hallConnectionsByNode = new Map<string, number>();
  for (const connection of MUSEUM_BUILDING_MANIFEST.connections.filter(({implementationStatus}) => implementationStatus === 'live')) {
    if (publicHallNodeIds.has(connection.b.nodeId)) {
      hallConnectionsByNode.set(connection.a.nodeId, (hallConnectionsByNode.get(connection.a.nodeId) ?? 0) + 1);
    }
    if (publicHallNodeIds.has(connection.a.nodeId)) {
      hallConnectionsByNode.set(connection.b.nodeId, (hallConnectionsByNode.get(connection.b.nodeId) ?? 0) + 1);
    }
  }
  const maximumSimultaneousReadinessGates = Math.max(1, ...hallConnectionsByNode.values());
  const readinessGateBytes = decodedTextureBytes(MUSEUM_TEXTURE_SPECS.readinessSign);
  const totalBytes = buildingSignBytes
    + reservationSignBytes
    + readinessGateBytes * maximumSimultaneousReadinessGates;
  return {
    buildingSignBytes,
    reservationSignBytes,
    readinessGateBytes,
    maximumSimultaneousReadinessGates,
    totalBytes,
    totalMiB: bytesToMiB(totalBytes),
  };
};

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
  const interpretationHeight = hallId === MEDITERRANEAN_GALLERY_ID
    ? .7
    : exhibit.scene.mediaMounts.length > 0
    ? .42
    : Math.min(1.55, backing.size.height - .48);
  const specs = [museumTextureDimensionsForPlane(
    interpretationWidth,
    interpretationHeight,
    hallId === MEDITERRANEAN_GALLERY_ID
      ? MUSEUM_TEXTURE_SPECS.mediterraneanNameStrip
      : MUSEUM_TEXTURE_SPECS.contemporaryNameStrip,
  )];
  if (hallId === MEDITERRANEAN_GALLERY_ID) {
    specs.push(museumTextureDimensionsForPlane(
      Math.min(backing.size.width - .34, 2.25),
      .64,
      MUSEUM_TEXTURE_SPECS.mediterraneanBackLabel,
    ));
  }
  return specs;
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
  const signs = (definition.layout.signs ?? []).flatMap((sign) => {
    const referenceWidth = hallId === MEDITERRANEAN_GALLERY_ID
      ? 600
      : MUSEUM_TEXTURE_SPECS.contemporarySignWidth;
    const reference = {
      width: referenceWidth,
      height: Math.round(referenceWidth * sign.height / sign.width),
      mipmaps: true,
    };
    const spec = museumTextureDimensionsForPlane(sign.width, sign.height, reference);
    return [spec];
  });
  return hallId === MUSEUM_BUILDING_MANIFEST.kiosk.publicHallId
    ? [
        ...signs,
        MUSEUM_TEXTURE_SPECS.visitorMapKiosk,
        MUSEUM_TEXTURE_SPECS.mediterraneanOrientation,
      ]
    : signs;
};

const MEDITERRANEAN_ORIENTATION_ASSET_IDS = [
  'plato-school-of-athens',
] as const;

/**
 * Conservative GPU allocation for one lazy hall subtree. Entry-resident mode
 * uses the doorway-gated entry asset set, including every exhibit touched by
 * that set; active mode includes the complete hall.
 */
export const estimateMuseumHallTextureResidency = (
  hallId: MuseumHallId,
  mode: MuseumHallTextureMode,
  entryEntranceId?: string | null,
): MuseumHallTextureEstimate => {
  const definition = MUSEUM_WORLD_DEFINITIONS.find(({id}) => id === hallId);
  if (!definition) throw new Error(`Museum texture estimate cannot resolve hall ${hallId}.`);
  const entryExhibitIds = new Set(entryEntranceId === null
    ? []
    : entryEntranceId === undefined
      ? Object.values(definition.prefetch.entryExhibitIdsByEntrance).flat()
      : definition.prefetch.entryExhibitIdsByEntrance[entryEntranceId] ?? []);
  const exhibits = mode === 'active'
    ? definition.layout.exhibits
    : definition.layout.exhibits.filter(({id}) => entryExhibitIds.has(id));
  const sceneAssetIds = [...new Set(exhibits.flatMap(({scene}) =>
    scene.mediaMounts.map(({assetId}) => assetId)))];
  const orientationAssetIds = hallId === MEDITERRANEAN_GALLERY_ID
    ? MEDITERRANEAN_ORIENTATION_ASSET_IDS
    : [];
  // Orientation media uses isolated textures and therefore remains an extra
  // allocation even when the same source also appears in an exhibit.
  const sceneBytes = sceneAssetIds.reduce((sum, assetId) => sum + sceneAssetBytes(assetId), 0)
    + orientationAssetIds.reduce((sum, assetId) => sum + sceneAssetBytes(assetId), 0);
  const generatedBytes = sumSpecs([
    ...generatedHallSpecs(hallId),
    ...exhibits.flatMap((exhibit) => generatedSpecsForExhibit(hallId, exhibit)),
  ]);
  const totalBytes = sceneBytes + generatedBytes;
  return {
    hallId,
    mode,
    exhibitCount: exhibits.length,
    sceneAssetCount: sceneAssetIds.length + orientationAssetIds.length,
    sceneBytes,
    generatedBytes,
    totalBytes,
    totalMiB: bytesToMiB(totalBytes),
  };
};

export const MUSEUM_PERSISTENT_TEXTURE_ESTIMATE = persistentTextureEstimate();

export const MUSEUM_DECODED_TEXTURE_BUDGET_BYTES = textureBudgetBytes;
export const MUSEUM_DECODED_TEXTURE_BUDGET_MIB =
  MUSEUM_BUILDING_MANIFEST.residencyPolicy.decodedTextureBudgetMiB;
