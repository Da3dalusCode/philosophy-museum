import type {MuseumAssetId} from './museumAssetTypes';
import {museumAssetById} from './museumAssets';
import {
  MUSEUM_CANONICAL_PROGRAM,
  MUSEUM_PLANNED_HALL_TITLES,
  type MuseumCanonicalExhibit,
  type MuseumCanonicalHall,
  type MuseumCanonicalRoom,
  type MuseumPresentationTier,
} from './museumCanonicalProgram';
import {getMuseumHallTemplate} from './museumHallTemplates';
import {getMuseumManifestHallNode, MUSEUM_BUILDING_MANIFEST} from './museumBuildingManifest';
import {MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY} from './museumArchitectureMaterials';
import {
  MEDITERRANEAN_EXHIBIT_CURATION,
  MEDITERRANEAN_GALLERY_ID,
  MEDITERRANEAN_ORIENTATION_DISPLAY,
  MEDITERRANEAN_ROOM_SIGN_COPY,
} from './mediterraneanGalleryCuration';
import {PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS} from './platoSupplementalExhibits';
import {
  RENAISSANCE_EXHIBIT_CURATION,
  RENAISSANCE_GALLERY_ID,
  RENAISSANCE_ROOM_SIGN_COPY,
} from './renaissanceGalleryCuration';
import {RENAISSANCE_SUPPLEMENTAL_EXHIBIT_LAYOUTS} from './renaissanceSupplementalExhibits';
import {
  PHENOMENOLOGY_GALLERY_ID,
  PHENOMENOLOGY_ROOM_SIGN_COPY,
  PHENOMENOLOGY_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './phenomenologySupplementalExhibits';
import {PHENOMENOLOGY_PRIMARY_PLACEMENTS} from './phenomenologyGalleryCuration';
import {
  ANALYTIC_GALLERY_ID,
  ANALYTIC_ROOM_SIGN_COPY,
  ANALYTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './analyticSupplementalExhibits';
import {ANALYTIC_PRIMARY_PLACEMENTS} from './analyticGalleryCuration';
import {
  JUSTICE_GALLERY_ID,
  JUSTICE_ROOM_SIGN_COPY,
  JUSTICE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './justiceSupplementalExhibits';
import {JUSTICE_PRIMARY_PLACEMENTS} from './justiceGalleryCuration';
import {
  CLASSICAL_SOUTH_ASIAN_GALLERY_ID,
  CLASSICAL_SOUTH_ASIAN_ROOM_SIGN_COPY,
  CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './classicalSouthAsianSupplementalExhibits';
import {CLASSICAL_SOUTH_ASIAN_PRIMARY_PLACEMENTS} from './classicalSouthAsianGalleryCuration';
import {
  BUDDHIST_GALLERY_ID,
  BUDDHIST_ROOM_SIGN_COPY,
  BUDDHIST_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './buddhistSupplementalExhibits';
import {BUDDHIST_PRIMARY_PLACEMENTS} from './buddhistGalleryCuration';
import {
  CLASSICAL_CHINESE_GALLERY_ID,
  CLASSICAL_CHINESE_HALL_DIMENSIONS,
  CLASSICAL_CHINESE_PRIMARY_CIRCULATION,
  CLASSICAL_CHINESE_PRIMARY_PLACEMENTS,
  CLASSICAL_CHINESE_PRIMARY_SCALE_FLOOR,
  CLASSICAL_CHINESE_ROOM_BOUNDS,
  CLASSICAL_CHINESE_ROOM_ENTRY_POSES,
  CLASSICAL_CHINESE_ROOM_ORDER,
  CLASSICAL_CHINESE_ROOM_SIGN_COPY,
  CLASSICAL_CHINESE_SPATIAL_CONNECTIONS,
  classicalChineseInteriorWalls,
} from './classicalChineseGalleryCuration';
import {
  CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './classicalChineseSupplementalExhibits';
import {
  ISLAMIC_GALLERY_ID,
  ISLAMIC_ROOM_SIGN_COPY,
  ISLAMIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './islamicSupplementalExhibits';
import {
  ISLAMIC_PRIMARY_PLACEMENTS,
  ISLAMIC_ROOM_ENTRY_POSES,
} from './islamicGalleryCuration';
import {
  EAST_ASIAN_GALLERY_ID,
  EAST_ASIAN_ROOM_SIGN_COPY,
  EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './eastAsianSupplementalExhibits';
import {
  EAST_ASIAN_PRIMARY_PLACEMENTS,
  EAST_ASIAN_ROOM_ENTRY_POSES,
} from './eastAsianGalleryCuration';
import {
  JEWISH_GALLERY_ID,
  JEWISH_ROOM_SIGN_COPY,
  JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './jewishSupplementalExhibits';
import {
  JEWISH_PRIMARY_PLACEMENTS,
  JEWISH_ROOM_ENTRY_POSES,
} from './jewishGalleryCuration';
import {
  HELLENISTIC_ROMAN_GALLERY_ID,
  HELLENISTIC_ROMAN_HALL_DIMENSIONS,
  HELLENISTIC_ROMAN_PRIMARY_CIRCULATION,
  HELLENISTIC_ROMAN_PRIMARY_PLACEMENTS,
  HELLENISTIC_ROMAN_PRIMARY_SCALE_FLOOR,
  HELLENISTIC_ROMAN_ROOM_BOUNDS,
  HELLENISTIC_ROMAN_ROOM_ENTRY_POSES,
  HELLENISTIC_ROMAN_ROOM_ORDER,
  HELLENISTIC_ROMAN_ROOM_SIGN_COPY,
  HELLENISTIC_ROMAN_SPATIAL_CONNECTIONS,
  hellenisticRomanInteriorWalls,
} from './hellenisticRomanGalleryCuration';
import {
  HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './hellenisticRomanSupplementalExhibits';
import {
  LATE_ANTIQUITY_GALLERY_ID,
  LATE_ANTIQUITY_PRIMARY_PLACEMENTS,
  LATE_ANTIQUITY_ROOM_ENTRY_POSES,
  LATE_ANTIQUITY_ROOM_SIGN_COPY,
} from './lateAntiquityGalleryCuration';
import {
  LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './lateAntiquitySupplementalExhibits';
import {
  LATIN_SCHOLASTIC_GALLERY_ID,
  LATIN_SCHOLASTIC_PRIMARY_PLACEMENTS,
  LATIN_SCHOLASTIC_ROOM_ENTRY_POSES,
  LATIN_SCHOLASTIC_ROOM_SIGN_COPY,
} from './latinChristianScholasticGalleryCuration';
import {
  LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './latinChristianScholasticSupplementalExhibits';
import {
  RATIONALISM_GALLERY_ID,
  RATIONALISM_PRIMARY_PLACEMENTS,
  RATIONALISM_ROOM_ENTRY_POSES,
  RATIONALISM_ROOM_SIGN_COPY,
} from './rationalismGalleryCuration';
import {
  RATIONALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './rationalismSupplementalExhibits';
import {
  EMPIRICISM_GALLERY_ID,
  EMPIRICISM_PRIMARY_PLACEMENTS,
  EMPIRICISM_ROOM_ENTRY_POSES,
  EMPIRICISM_ROOM_SIGN_COPY,
  empiricismInteriorLintels,
} from './empiricismGalleryCuration';
import {
  EMPIRICISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './empiricismSupplementalExhibits';
import {
  ENLIGHTENMENT_GALLERY_ID,
  ENLIGHTENMENT_HALL_DIMENSIONS,
  ENLIGHTENMENT_PRIMARY_CIRCULATION,
  ENLIGHTENMENT_PRIMARY_PLACEMENTS,
  ENLIGHTENMENT_PRIMARY_SCALE_FLOOR,
  ENLIGHTENMENT_ROOM_BOUNDS,
  ENLIGHTENMENT_ROOM_ENTRY_POSES,
  ENLIGHTENMENT_ROOM_ORDER,
  ENLIGHTENMENT_ROOM_SIGN_COPY,
  ENLIGHTENMENT_SPATIAL_CONNECTIONS,
  enlightenmentInteriorLintels,
  enlightenmentInteriorWalls,
  enlightenmentKantBaffle,
} from './enlightenmentGalleryCuration';
import {
  ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './enlightenmentSupplementalExhibits';
import {
  GERMAN_IDEALISM_GALLERY_ID,
  GERMAN_IDEALISM_PRIMARY_PLACEMENTS,
  GERMAN_IDEALISM_ROOM_ENTRY_POSES,
  GERMAN_IDEALISM_ROOM_SIGN_COPY,
  germanIdealismInteriorLintels,
} from './germanIdealismGalleryCuration';
import {
  GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './germanIdealismSupplementalExhibits';
import {
  UTILITY_LIBERTY_CAPITAL_GALLERY_ID,
  UTILITY_LIBERTY_CAPITAL_PRIMARY_PLACEMENTS,
  UTILITY_LIBERTY_CAPITAL_ROOM_ENTRY_POSES,
  UTILITY_LIBERTY_CAPITAL_ROOM_SIGN_COPY,
  utilityLibertyCapitalInteriorLintels,
} from './utilityLibertyCapitalGalleryCuration';
import {
  UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './utilityLibertyCapitalSupplementalExhibits';
import {
  FAITH_PESSIMISM_VALUE_GALLERY_ID,
  FAITH_PESSIMISM_VALUE_PRIMARY_PLACEMENTS,
  FAITH_PESSIMISM_VALUE_ROOM_ENTRY_POSES,
  FAITH_PESSIMISM_VALUE_ROOM_SIGN_COPY,
  faithPessimismValueInteriorLintels,
} from './faithPessimismValueGalleryCuration';
import {
  FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './faithPessimismValueSupplementalExhibits';
import {
  PRAGMATISM_GALLERY_ID,
  PRAGMATISM_PRIMARY_PLACEMENTS,
  PRAGMATISM_ROOM_ENTRY_POSES,
  PRAGMATISM_ROOM_SIGN_COPY,
  pragmatismInteriorLintels,
} from './pragmatismGalleryCuration';
import {
  PRAGMATISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './pragmatismSupplementalExhibits';
import {
  CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID,
  CRITIQUE_POWER_DECONSTRUCTION_HALL_DIMENSIONS,
  CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_CIRCULATION,
  CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_PLACEMENTS,
  CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_SCALE_FLOOR,
  CRITIQUE_POWER_DECONSTRUCTION_ROOM_BOUNDS,
  CRITIQUE_POWER_DECONSTRUCTION_ROOM_ENTRY_POSES,
  CRITIQUE_POWER_DECONSTRUCTION_ROOM_ORDER,
  CRITIQUE_POWER_DECONSTRUCTION_ROOM_SIGN_COPY,
  CRITIQUE_POWER_DECONSTRUCTION_SPATIAL_CONNECTIONS,
  critiquePowerDeconstructionInteriorWalls,
} from './critiquePowerDeconstructionGalleryCuration';
import {
  CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './critiquePowerDeconstructionSupplementalExhibits';
import {
  MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID,
  MORAL_LIFE_PRACTICAL_REASON_HALL_DIMENSIONS,
  MORAL_LIFE_PRACTICAL_REASON_PRIMARY_CIRCULATION,
  MORAL_LIFE_PRACTICAL_REASON_PRIMARY_PLACEMENTS,
  MORAL_LIFE_PRACTICAL_REASON_PRIMARY_SCALE_FLOOR,
  MORAL_LIFE_PRACTICAL_REASON_ROOM_BOUNDS,
  MORAL_LIFE_PRACTICAL_REASON_ROOM_ENTRY_POSES,
  MORAL_LIFE_PRACTICAL_REASON_ROOM_ORDER,
  MORAL_LIFE_PRACTICAL_REASON_ROOM_SIGN_COPY,
  MORAL_LIFE_PRACTICAL_REASON_SPATIAL_CONNECTIONS,
  moralLifePracticalReasonInteriorWalls,
} from './moralLifePracticalReasonGalleryCuration';
import {
  MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './moralLifePracticalReasonSupplementalExhibits';
import {
  COLONIALISM_RACE_LIBERATION_GALLERY_ID,
  COLONIALISM_RACE_LIBERATION_PRIMARY_PLACEMENTS,
  COLONIALISM_RACE_LIBERATION_ROOM_ENTRY_POSES,
  COLONIALISM_RACE_LIBERATION_ROOM_SIGN_COPY,
  colonialismRaceLiberationInteriorLintels,
} from './colonialismRaceLiberationGalleryCuration';
import {
  COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
} from './colonialismRaceLiberationSupplementalExhibits';
import {
  CORE_QUESTIONS_FORUM_GALLERY_ID,
  CORE_QUESTIONS_FORUM_PRIMARY_CIRCULATION,
  CORE_QUESTIONS_FORUM_PRIMARY_PLACEMENTS,
  CORE_QUESTIONS_FORUM_ROOM_ENTRY_POSES,
  coreQuestionsForumInteriorWalls,
  coreQuestionsForumSigns,
} from './coreQuestionsForumCuration';
import {
  CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS,
} from './coreQuestionsForumSupplementalExhibits';
import type {
  MuseumBounds,
  MuseumCollider,
  MuseumExhibitLayout,
  MuseumHallContentDefinition,
  MuseumInstallationSceneDefinition,
  MuseumInstallationTier,
  MuseumInstallationTreatment,
  MuseumMediaMountDefinition,
  MuseumPoint,
  MuseumPoint3,
  MuseumPose,
  MuseumSceneVolume,
  MuseumSceneVolumeRole,
  MuseumSize3,
  MuseumSpatialCell,
  MuseumSpatialConnection,
  MuseumSupplementalExhibitLayout,
  MuseumTrackDefinition,
  MuseumWallDefinition,
} from './museumWorldTypes';
import type {MuseumExhibitId, MuseumPublicHallId, MuseumZoneId} from '../museumCatalog';

export type MuseumCanonicalHallContentDefinition = Omit<MuseumHallContentDefinition, 'id'> & {
  id: MuseumPublicHallId;
};

const SEQUENCE_WIDTH = 24;
const SEQUENCE_DEPTH = 56;
const SEQUENCE_CEILING = 5.8;
const FORUM_SIZE = 28;
const FORUM_CEILING = 6.2;
const CORE_QUESTIONS_FORUM_ID = CORE_QUESTIONS_FORUM_GALLERY_ID;
const WALL = .36;
const EYE_HEIGHT = 1.7;

type TierContract = {
  tier: MuseumInstallationTier;
  treatment: MuseumInstallationTreatment;
  bayWidth: number;
  objectWidth: number;
  objectDepth: number;
  objectHeight: number;
};

const TIER_CONTRACTS: Readonly<Record<MuseumPresentationTier, TierContract>> = {
  'anchor-exhibit': {tier: 'anchor', treatment: 'anchor-bay', bayWidth: 4.6, objectWidth: 3.8, objectDepth: 2.05, objectHeight: 3.55},
  'standard-individual-exhibit': {tier: 'standard', treatment: 'standard-bay', bayWidth: 3.2, objectWidth: 2.8, objectDepth: 1.85, objectHeight: 3.15},
  'supporting-exhibit': {tier: 'supporting', treatment: 'supporting-panel', bayWidth: 2.5, objectWidth: 2.25, objectDepth: 1.55, objectHeight: 2.75},
  'thematic-cluster-participant': {tier: 'cluster', treatment: 'cluster-panel', bayWidth: 3.1, objectWidth: 2.7, objectDepth: 1.7, objectHeight: 2.9},
  'gallery-archive-or-study-wall-record': {tier: 'archive', treatment: 'archive-label', bayWidth: 1.9, objectWidth: 1.75, objectDepth: 1.45, objectHeight: 2.35},
};

type PrimaryInstallationScaleFloor = Readonly<{
  bayWidth: number;
  objectWidth: number;
  objectHeight: number;
  footprintHeight: number;
}>;

const fullScalePrimaryStartIndex = MUSEUM_CANONICAL_PROGRAM.findIndex(({id}) => id === PHENOMENOLOGY_GALLERY_ID);
if (fullScalePrimaryStartIndex < 0) throw new Error('The full-scale primary exhibit policy has no Gallery 03 starting point.');

const supplementalLayoutsForHall = (hallId: MuseumPublicHallId): readonly MuseumSupplementalExhibitLayout[] =>
  hallId === CORE_QUESTIONS_FORUM_ID
    ? CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS
    : hallId === MEDITERRANEAN_GALLERY_ID
    ? PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS
    : hallId === RENAISSANCE_GALLERY_ID
      ? RENAISSANCE_SUPPLEMENTAL_EXHIBIT_LAYOUTS
      : hallId === PHENOMENOLOGY_GALLERY_ID
        ? PHENOMENOLOGY_SUPPLEMENTAL_EXHIBIT_LAYOUTS
        : hallId === ANALYTIC_GALLERY_ID
          ? ANALYTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS
          : hallId === JUSTICE_GALLERY_ID
            ? JUSTICE_SUPPLEMENTAL_EXHIBIT_LAYOUTS
            : hallId === CLASSICAL_SOUTH_ASIAN_GALLERY_ID
              ? CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS
              : hallId === BUDDHIST_GALLERY_ID
                ? BUDDHIST_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === CLASSICAL_CHINESE_GALLERY_ID
                  ? CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === ISLAMIC_GALLERY_ID
                  ? ISLAMIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === EAST_ASIAN_GALLERY_ID
                  ? EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === JEWISH_GALLERY_ID
                  ? JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === LATIN_SCHOLASTIC_GALLERY_ID
                  ? LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === HELLENISTIC_ROMAN_GALLERY_ID
                  ? HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === LATE_ANTIQUITY_GALLERY_ID
                  ? LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === RATIONALISM_GALLERY_ID
                  ? RATIONALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === EMPIRICISM_GALLERY_ID
                  ? EMPIRICISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === ENLIGHTENMENT_GALLERY_ID
                  ? ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === GERMAN_IDEALISM_GALLERY_ID
                  ? GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === UTILITY_LIBERTY_CAPITAL_GALLERY_ID
                  ? UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === FAITH_PESSIMISM_VALUE_GALLERY_ID
                  ? FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === PRAGMATISM_GALLERY_ID
                  ? PRAGMATISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID
                  ? CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID
                  ? MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBIT_LAYOUTS
                : hallId === COLONIALISM_RACE_LIBERATION_GALLERY_ID
                  ? COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBIT_LAYOUTS
              : [];

const primaryScaleFloorForHall = (
  hall: MuseumCanonicalHall,
  supplementalLayouts: readonly MuseumSupplementalExhibitLayout[],
): PrimaryInstallationScaleFloor | undefined => {
  if (hall.id === CORE_QUESTIONS_FORUM_ID) {
    return {
      bayWidth: TIER_CONTRACTS['anchor-exhibit'].bayWidth,
      objectWidth: TIER_CONTRACTS['anchor-exhibit'].objectWidth,
      objectHeight: TIER_CONTRACTS['anchor-exhibit'].objectHeight,
      footprintHeight: TIER_CONTRACTS['anchor-exhibit'].objectHeight + .16,
    };
  }
  const galleryIndex = MUSEUM_CANONICAL_PROGRAM.findIndex(({id}) => id === hall.id);
  if (galleryIndex < fullScalePrimaryStartIndex || !supplementalLayouts.length) return undefined;
  const objectWidth = Math.max(...supplementalLayouts.map(({footprint}) => footprint.width));
  const footprintHeight = Math.max(...supplementalLayouts.map(({footprint}) => footprint.height));
  return {
    bayWidth: objectWidth,
    objectWidth,
    // Supplemental backing millwork is inset .12 m from its interaction footprint.
    objectHeight: footprintHeight - .12,
    footprintHeight,
  };
};

const tierContractFor = (
  record: MuseumCanonicalExhibit,
  primaryScaleFloor?: PrimaryInstallationScaleFloor,
): TierContract => {
  const contract = TIER_CONTRACTS[record.tier];
  if (!primaryScaleFloor) return contract;
  return {
    ...contract,
    bayWidth: Math.max(contract.bayWidth, primaryScaleFloor.bayWidth),
    objectWidth: Math.max(contract.objectWidth, primaryScaleFloor.objectWidth),
    objectHeight: Math.max(contract.objectHeight, primaryScaleFloor.objectHeight),
  };
};

const volume = (
  id: string,
  role: MuseumSceneVolumeRole,
  center: MuseumPoint3,
  size: MuseumSize3,
): MuseumSceneVolume => ({id, role, center, size});

const optionalAsset = (id: string | undefined): MuseumAssetId | undefined => {
  if (!id) return undefined;
  const candidate = id as MuseumAssetId;
  return museumAssetById.has(candidate) ? candidate : undefined;
};

const mediaMount = (
  exhibitId: string,
  assetId: MuseumAssetId,
  index: number,
  backing: MuseumSceneVolume,
  sceneWidth: number,
  sceneHeight: number,
  totalCount: number,
  preserveMediterraneanAspect: boolean,
): MuseumMediaMountDefinition => {
  const source = museumAssetById.get(assetId)?.variants.scene;
  const sourceAspect = source ? source.width / source.height : 1;
  const maximumWidth = totalCount === 1
    ? sceneWidth - .48
    : Math.max(.8, (sceneWidth - .7) / 2);
  const maximumHeight = Math.max(.9, sceneHeight - 1.16);
  let countWidth = index === 0 ? Math.min(1.45, sceneWidth * .42) : Math.min(1.08, sceneWidth * .32);
  let height = index === 0 ? Math.min(1.72, sceneHeight * .48) : Math.min(1.28, sceneHeight * .38);
  let x = index === 0 ? -sceneWidth * .18 : sceneWidth * .27;
  let y = Math.max(1.35, sceneHeight * .58);
  if (preserveMediterraneanAspect) {
    countWidth = maximumWidth;
    height = countWidth / sourceAspect;
    if (height > maximumHeight) {
      height = maximumHeight;
      countWidth = height * sourceAspect;
    }
    x = totalCount === 1 ? 0 : index === 0 ? -sceneWidth * .23 : sceneWidth * .23;
    y = (.3 + sceneHeight - .86) / 2;
  }
  const id = `${exhibitId}-media-${index + 1}`;
  return {
    id,
    assetId,
    kind: 'wall-frame',
    position: [x, y, -.69],
    rotation: [0, 0, 0],
    width: countWidth,
    height,
    frameDepth: .11,
    supportHeight: 0,
    anchorId: backing.id,
    bounds: volume(`${id}-bounds`, 'media', {x, y, z: -.69}, {width: countWidth + .18, height: height + .18, depth: .2}),
    supportBounds: volume(`${id}-support`, 'media', {x, y, z: -.82}, {width: countWidth * .7, height: height * .72, depth: .2}),
  };
};

const createScene = (
  record: MuseumCanonicalExhibit,
  compactForumInstallation = false,
  canonicalExhibitConstruction = false,
  primaryScaleFloor?: PrimaryInstallationScaleFloor,
): MuseumInstallationSceneDefinition => {
  const contract = tierContractFor(record, primaryScaleFloor);
  const physicalContract = compactForumInstallation
    ? {
        ...contract,
        objectWidth: primaryScaleFloor
          ? contract.objectWidth
          : Math.min(contract.objectWidth, contract.tier === 'anchor' ? 3 : 2.55),
        objectDepth: Math.min(contract.objectDepth, contract.tier === 'anchor' ? 1.45 : 1.4),
        objectHeight: primaryScaleFloor
          ? contract.objectHeight
          : Math.min(contract.objectHeight, contract.tier === 'anchor' ? 3.15 : 2.85),
      }
    : contract;
  const backing = volume(
    `${record.id}-backing`,
    'base',
    {x: 0, y: physicalContract.objectHeight / 2, z: -.76},
    {width: physicalContract.objectWidth, height: physicalContract.objectHeight, depth: .16},
  );
  const plinthHeight = canonicalExhibitConstruction
    ? MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY.height
    : .2;
  const plinthDepth = canonicalExhibitConstruction
    ? MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY.depth
    : Math.max(.72, physicalContract.objectDepth * .55);
  const plinthWidth = canonicalExhibitConstruction
    ? physicalContract.objectWidth + MUSEUM_CANONICAL_EXHIBIT_PLINTH_GEOMETRY.sideOverhang * 2
    : Math.max(1.2, physicalContract.objectWidth * .82);
  const plinthCenterZ = canonicalExhibitConstruction
    ? backing.center.z - backing.size.depth / 2 + plinthDepth / 2
    : -.05;
  const plinth = volume(
    `${record.id}-plinth`,
    'base',
    {x: 0, y: plinthHeight / 2, z: plinthCenterZ},
    {width: plinthWidth, height: plinthHeight, depth: plinthDepth},
  );
  const motif = volume(
    `${record.id}-concept`,
    'concept-object',
    {x: 0, y: .52, z: .18},
    {width: Math.min(.82, physicalContract.objectWidth * .3), height: .58, depth: .42},
  );
  const mediaAssets = [
    optionalAsset(record.principalAssetId),
    optionalAsset(record.supportingAssetIds?.[0]),
  ].filter((assetId): assetId is MuseumAssetId => Boolean(assetId));
  const preserveCuratedAspect = Object.hasOwn(MEDITERRANEAN_EXHIBIT_CURATION, record.id)
    || Object.hasOwn(RENAISSANCE_EXHIBIT_CURATION, record.id)
    || Boolean(primaryScaleFloor);
  const plaqueWidth = Math.min(1.22, physicalContract.objectWidth - .28);
  const plaqueId = `${record.id}-plaque`;
  return {
    footprint: {
      width: physicalContract.objectWidth,
      height: primaryScaleFloor?.footprintHeight ?? physicalContract.objectHeight + .16,
      depth: physicalContract.objectDepth,
    },
    mediaMounts: mediaAssets.map((assetId, index) => mediaMount(
      record.id,
      assetId,
      index,
      backing,
      physicalContract.objectWidth,
      physicalContract.objectHeight,
      mediaAssets.length,
      preserveCuratedAspect,
    )),
    plaque: {
      id: plaqueId,
      position: [0, .48, physicalContract.objectDepth / 2 - .18],
      rotation: [-.18, 0, 0],
      width: plaqueWidth,
      height: .46,
      supportHeight: .22,
      anchorId: 'gallery-floor',
      bounds: volume(`${plaqueId}-bounds`, 'plaque', {x: 0, y: .48, z: physicalContract.objectDepth / 2 - .18}, {width: plaqueWidth + .14, height: .58, depth: .28}),
      supportBounds: volume(`${plaqueId}-support`, 'plaque', {x: 0, y: .11, z: physicalContract.objectDepth / 2 - .16}, {width: .55, height: .22, depth: .34}),
    },
    objectBounds: [plinth, backing, motif],
    focalTarget: {x: 0, y: Math.min(1.72, physicalContract.objectHeight * .56), z: -.2},
    interactionBounds: volume(
      `${record.id}-interaction`,
      'principal-object',
      {x: 0, y: physicalContract.objectHeight / 2, z: 0},
      {width: physicalContract.objectWidth, height: physicalContract.objectHeight, depth: Math.max(1.42, physicalContract.objectDepth)},
    ),
  };
};

const colliderBounds = (center: MuseumPoint, rotation: number, width: number, depth: number): MuseumBounds => {
  const quarterTurn = Math.abs(Math.sin(rotation)) > .5;
  const worldWidth = quarterTurn ? depth : width;
  const worldDepth = quarterTurn ? width : depth;
  return {
    minX: center.x - worldWidth / 2,
    maxX: center.x + worldWidth / 2,
    minZ: center.z - worldDepth / 2,
    maxZ: center.z + worldDepth / 2,
  };
};

const overlaps = (first: MuseumBounds, second: MuseumBounds, padding = 0): boolean =>
  first.minX < second.maxX + padding
  && first.maxX > second.minX - padding
  && first.minZ < second.maxZ + padding
  && first.maxZ > second.minZ - padding;

const VIEWPOINT_CLEARANCE_RADIUS = .34;

const circleIntersectsBounds = (
  point: MuseumPoint,
  radius: number,
  bounds: MuseumBounds,
): boolean => {
  const nearestX = Math.max(bounds.minX, Math.min(bounds.maxX, point.x));
  const nearestZ = Math.max(bounds.minZ, Math.min(bounds.maxZ, point.z));
  return Math.hypot(point.x - nearestX, point.z - nearestZ) < radius;
};

const viewpointFitsRoom = (point: MuseumPoint, bounds: MuseumBounds): boolean =>
  point.x >= bounds.minX + VIEWPOINT_CLEARANCE_RADIUS
  && point.x <= bounds.maxX - VIEWPOINT_CLEARANCE_RADIUS
  && point.z >= bounds.minZ + VIEWPOINT_CLEARANCE_RADIUS
  && point.z <= bounds.maxZ - VIEWPOINT_CLEARANCE_RADIUS;

const guidedSegmentIsClear = (
  from: MuseumPoint,
  to: MuseumPoint,
  bounds: MuseumBounds,
  obstacleBounds: readonly MuseumBounds[],
): boolean => {
  const distance = Math.hypot(to.x - from.x, to.z - from.z);
  const sampleCount = Math.max(1, Math.ceil(distance / .05));
  for (let index = 0; index <= sampleCount; index += 1) {
    const ratio = index / sampleCount;
    const point = {
      x: from.x + (to.x - from.x) * ratio,
      z: from.z + (to.z - from.z) * ratio,
    };
    if (!viewpointFitsRoom(point, bounds)) return false;
    if (obstacleBounds.some((obstacle) => circleIntersectsBounds(
      point,
      VIEWPOINT_CLEARANCE_RADIUS,
      obstacle,
    ))) return false;
  }
  return true;
};

const compactRoute = (points: readonly MuseumPoint[]): readonly MuseumPoint[] =>
  points.filter((point, index) => index === 0
    || Math.hypot(point.x - points[index - 1].x, point.z - points[index - 1].z) > .001);

const guidedRouteLength = (points: readonly MuseumPoint[]): number => points.slice(1)
  .reduce((sum, point, index) => sum + Math.hypot(
    point.x - points[index].x,
    point.z - points[index].z,
  ), 0);

const guidedRouteIsClear = (
  points: readonly MuseumPoint[],
  bounds: MuseumBounds,
  obstacleBounds: readonly MuseumBounds[],
): boolean => points.slice(1).every((point, index) =>
  guidedSegmentIsClear(points[index], point, bounds, obstacleBounds));

const guidedObstacleBounds = (colliders: readonly MuseumCollider[]): readonly MuseumBounds[] =>
  colliders.map((collider) => colliderBounds(
    collider.center,
    collider.rotation,
    collider.size.width,
    collider.size.depth,
  ));

/** Find a short, deterministic aisle route instead of letting a tour cut through an installation. */
const guidedWaypointsWithinRoom = (
  from: MuseumPoint,
  to: MuseumPoint,
  bounds: MuseumBounds,
  colliders: readonly MuseumCollider[],
  includeCrossroadsCandidates = false,
): readonly MuseumPoint[] => {
  const candidates: MuseumPoint[][] = [
    [from, to],
    [from, {x: from.x, z: to.z}, to],
    [from, {x: to.x, z: from.z}, to],
    [from, {x: 0, z: from.z}, {x: 0, z: to.z}, to],
  ];
  const roomCenter = {
    x: (bounds.minX + bounds.maxX) / 2,
    z: (bounds.minZ + bounds.maxZ) / 2,
  };
  for (let z = bounds.minZ + 1; z <= bounds.maxZ - 1; z += 1) {
    candidates.push([from, {x: from.x, z}, {x: to.x, z}, to]);
  }
  for (let x = bounds.minX + 1; x <= bounds.maxX - 1; x += 1) {
    candidates.push([from, {x, z: from.z}, {x, z: to.z}, to]);
  }
  if (includeCrossroadsCandidates) {
    // Crossroads rooms sometimes need one move into an aisle before turning
    // around a display baffle. Pairing interior x/z lanes covers that simple
    // museum-walk shape without imposing this quadratic search on every hall.
    for (let x = bounds.minX + 1; x <= bounds.maxX - 1; x += .75) {
      for (let z = bounds.minZ + 1; z <= bounds.maxZ - 1; z += .75) {
        candidates.push([
          from,
          {x, z: from.z},
          {x, z},
          {x: to.x, z},
          to,
        ]);
        candidates.push([
          from,
          {x: from.x, z},
          {x, z},
          {x, z: to.z},
          to,
        ]);
        candidates.push([
          from,
          {x: from.x, z: roomCenter.z},
          {x, z: roomCenter.z},
          {x, z},
          {x: to.x, z},
          to,
        ]);
      }
    }
  }
  const obstacleBounds = guidedObstacleBounds(colliders);
  const clear = candidates
    .map((candidate) => compactRoute(candidate))
    .sort((first, second) => guidedRouteLength(first) - guidedRouteLength(second))
    .find((candidate) => guidedRouteIsClear(candidate, bounds, obstacleBounds));
  if (!clear) throw new Error(`No collision-free guided route exists between ${JSON.stringify(from)} and ${JSON.stringify(to)}.`);
  return clear;
};

type PlacementCandidate = MuseumPoint & {rotationY: number; viewpointDistance?: number};

const MEDITERRANEAN_AUTHORED_PLACEMENTS = Object.fromEntries(
  Object.entries(MEDITERRANEAN_EXHIBIT_CURATION).map(([id, curation]) => [id, {
    ...curation.authored,
  }]),
) as Readonly<Record<string, PlacementCandidate>>;

const RENAISSANCE_AUTHORED_PLACEMENTS = Object.fromEntries(
  Object.entries(RENAISSANCE_EXHIBIT_CURATION).map(([id, curation]) => [id, {
    ...curation.authored,
  }]),
) as Readonly<Record<string, PlacementCandidate>>;

const wallCandidates = (bounds: MuseumBounds): readonly PlacementCandidate[] => {
  const width = bounds.maxX - bounds.minX;
  const depth = bounds.maxZ - bounds.minZ;
  const zAt = (ratio: number) => bounds.minZ + depth * ratio;
  const xAt = (ratio: number) => bounds.minX + width * ratio;
  const perimeter = [
    ...[.17, .5, .83].map((ratio) => ({x: bounds.minX + 1.15, z: zAt(ratio), rotationY: Math.PI / 2})),
    ...[.17, .5, .83].map((ratio) => ({x: bounds.maxX - 1.15, z: zAt(ratio), rotationY: -Math.PI / 2})),
    ...[.25, .75].map((ratio) => ({x: xAt(ratio), z: bounds.minZ + 1.15, rotationY: 0})),
    ...[.25, .75].map((ratio) => ({x: xAt(ratio), z: bounds.maxZ - 1.15, rotationY: Math.PI})),
  ];
  if (width < 16) return perimeter;
  // Deep sequence rooms can carry a restrained inner study row while the
  // four-metre centreline remains a continuous, unobstructed walking route.
  return [
    ...perimeter,
    ...[.22, .5, .78].map((ratio) => ({x: bounds.minX + 6, z: zAt(ratio), rotationY: Math.PI / 2})),
    ...[.22, .5, .78].map((ratio) => ({x: bounds.maxX - 6, z: zAt(ratio), rotationY: -Math.PI / 2})),
  ];
};

const createExhibitLayout = (
  record: MuseumCanonicalExhibit,
  roomId: string,
  candidate: PlacementCandidate,
  compactForumInstallation = false,
  canonicalExhibitConstruction = false,
  primaryScaleFloor?: PrimaryInstallationScaleFloor,
): MuseumExhibitLayout => {
  const scene = createScene(record, compactForumInstallation, canonicalExhibitConstruction, primaryScaleFloor);
  const contract = tierContractFor(record, primaryScaleFloor);
  const target = {
    x: candidate.x + scene.focalTarget.x * Math.cos(candidate.rotationY) + scene.focalTarget.z * Math.sin(candidate.rotationY),
    z: candidate.z - scene.focalTarget.x * Math.sin(candidate.rotationY) + scene.focalTarget.z * Math.cos(candidate.rotationY),
  };
  // Compact canonical rooms keep the whole visitor circle clear of neighboring
  // bays while remaining inside each installation's interaction radius.
  const viewpointDistance = candidate.viewpointDistance ?? (compactForumInstallation
    ? primaryScaleFloor ? 3.05 : contract.tier === 'anchor' ? 2.85 : 2.65
    : primaryScaleFloor ? 4.4 : contract.tier === 'anchor' ? 2.85 : 2.65);
  const camera = {
    x: candidate.x + (scene.focalTarget.x * Math.cos(candidate.rotationY) + (scene.focalTarget.z + viewpointDistance) * Math.sin(candidate.rotationY)),
    z: candidate.z + (-scene.focalTarget.x * Math.sin(candidate.rotationY) + (scene.focalTarget.z + viewpointDistance) * Math.cos(candidate.rotationY)),
  };
  const collider: MuseumCollider = {
    id: `exhibit-${record.id}`,
    center: {x: candidate.x, z: candidate.z},
    size: {width: scene.footprint.width, depth: scene.footprint.depth},
    rotation: candidate.rotationY,
  };
  return {
    id: record.id as MuseumExhibitId,
    zoneId: roomId as MuseumZoneId,
    spatialCellId: roomId,
    position: {x: candidate.x, z: candidate.z},
    rotationY: candidate.rotationY,
    interactionRadius: primaryScaleFloor ? 5.15 : contract.tier === 'anchor' ? 4 : 3.45,
    bayWidth: contract.bayWidth,
    presentationTier: contract.tier,
    treatment: contract.treatment,
    collider,
    viewpoint: {
      ...camera,
      yaw: candidate.rotationY,
      pitch: Math.atan2(scene.focalTarget.y - EYE_HEIGHT, Math.hypot(target.x - camera.x, target.z - camera.z)),
    },
    scene,
  };
};

const roomBoundsForSequence = (
  rooms: readonly MuseumCanonicalRoom[],
  width = SEQUENCE_WIDTH,
  depth = SEQUENCE_DEPTH,
): ReadonlyMap<string, MuseumBounds> => {
  const roomDepth = depth / rooms.length;
  return new Map(rooms.map((room, index) => [room.id, {
    minX: -width / 2,
    maxX: width / 2,
    minZ: -depth / 2 + index * roomDepth,
    maxZ: -depth / 2 + (index + 1) * roomDepth,
  }]));
};

const FORUM_ROOM_ORDER = [
  'core-reality-being', 'core-knowledge', 'core-mind-self',
  'core-logic-language', 'core-aesthetics', 'core-science',
  'core-ethics-portal', 'core-political-portal', 'core-religion',
] as const;

const roomBoundsForForum = (rooms: readonly MuseumCanonicalRoom[]): ReadonlyMap<string, MuseumBounds> => {
  const byId = new Map(rooms.map((room) => [room.id, room]));
  const cellSize = FORUM_SIZE / 3;
  const result = new Map<string, MuseumBounds>();
  FORUM_ROOM_ORDER.forEach((roomId, index) => {
    if (!byId.has(roomId)) throw new Error(`Core Questions Forum is missing canonical room ${roomId}.`);
    const column = index % 3;
    const row = Math.floor(index / 3);
    result.set(roomId, {
      minX: -FORUM_SIZE / 2 + column * cellSize,
      maxX: -FORUM_SIZE / 2 + (column + 1) * cellSize,
      minZ: -FORUM_SIZE / 2 + row * cellSize,
      maxZ: -FORUM_SIZE / 2 + (row + 1) * cellSize,
    });
  });
  return result;
};

const sequenceConnections = (rooms: readonly MuseumCanonicalRoom[], roomBounds: ReadonlyMap<string, MuseumBounds>): MuseumSpatialConnection[] =>
  rooms.slice(0, -1).map((room, index) => {
    const next = rooms[index + 1];
    const boundary = roomBounds.get(room.id)!.maxZ;
    return {
      id: `threshold:${room.id}:${next.id}`,
      fromCellId: room.id,
      toCellId: next.id,
      openingBounds: {minX: -2, maxX: 2, minZ: boundary - .3, maxZ: boundary + .3},
    };
  });

const forumConnections = (roomBounds: ReadonlyMap<string, MuseumBounds>): MuseumSpatialConnection[] => {
  const result: MuseumSpatialConnection[] = [];
  const cellSize = FORUM_SIZE / 3;
  const boundaryInset = .3;
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      const index = row * 3 + column;
      const id = FORUM_ROOM_ORDER[index];
      const bounds = roomBounds.get(id)!;
      if (column < 2) {
        const target = FORUM_ROOM_ORDER[index + 1];
        const opening = row === 1
          ? {minZ: bounds.minZ + .35, maxZ: bounds.maxZ - .35}
          : row === 0
            ? {minZ: bounds.maxZ - 4, maxZ: bounds.maxZ}
            : {minZ: bounds.minZ, maxZ: bounds.minZ + 4};
        result.push({
          id: `threshold:${id}:${target}`,
          fromCellId: id,
          toCellId: target,
          openingBounds: {
            minX: bounds.maxX - boundaryInset,
            maxX: bounds.maxX + boundaryInset,
            ...opening,
          },
        });
      }
      if (row < 2) {
        const target = FORUM_ROOM_ORDER[index + 3];
        const opening = column === 1
          ? {minX: bounds.minX + .35, maxX: bounds.maxX - .35}
          : column === 0
            ? {minX: bounds.maxX - 4, maxX: bounds.maxX}
            : {minX: bounds.minX, maxX: bounds.minX + 4};
        result.push({
          id: `threshold:${id}:${target}`,
          fromCellId: id,
          toCellId: target,
          openingBounds: {
            ...opening,
            minZ: bounds.maxZ - boundaryInset,
            maxZ: bounds.maxZ + boundaryInset,
          },
        });
      }
    }
  }
  if (result.length !== 12 || cellSize <= 0) {
    throw new Error('Core Questions Forum must retain all twelve room-to-room connections.');
  }
  return result;
};

const forumGuidedWaypoints = (
  from: MuseumPoint,
  to: MuseumPoint,
  fromCellId: string,
  toCellId: string,
  roomBounds: ReadonlyMap<string, MuseumBounds>,
  spatialConnections: readonly MuseumSpatialConnection[],
  colliders: readonly MuseumCollider[],
): readonly MuseumPoint[] => {
  const center = (bounds: MuseumBounds): MuseumPoint => ({
    x: (bounds.minX + bounds.maxX) / 2,
    z: (bounds.minZ + bounds.maxZ) / 2,
  });
  const fromIndex = FORUM_ROOM_ORDER.indexOf(fromCellId as (typeof FORUM_ROOM_ORDER)[number]);
  const toIndex = FORUM_ROOM_ORDER.indexOf(toCellId as (typeof FORUM_ROOM_ORDER)[number]);
  if (fromIndex < 0 || toIndex < 0) throw new Error(`Unknown Forum guided cells ${fromCellId} -> ${toCellId}.`);
  const startRow = Math.floor(fromIndex / 3);
  const startColumn = fromIndex % 3;
  const targetRow = Math.floor(toIndex / 3);
  const targetColumn = toIndex % 3;
  const cellPath = (horizontalFirst: boolean): string[] => {
    let row = startRow;
    let column = startColumn;
    const cells: string[] = [FORUM_ROOM_ORDER[row * 3 + column]];
    const moveColumn = () => {
      while (column !== targetColumn) {
        column += Math.sign(targetColumn - column);
        cells.push(FORUM_ROOM_ORDER[row * 3 + column]);
      }
    };
    const moveRow = () => {
      while (row !== targetRow) {
        row += Math.sign(targetRow - row);
        cells.push(FORUM_ROOM_ORDER[row * 3 + column]);
      }
    };
    if (horizontalFirst) {
      moveColumn();
      moveRow();
    } else {
      moveRow();
      moveColumn();
    }
    return cells;
  };
  const routeThroughCells = (
    cells: readonly string[],
    openingBias: -1 | 0 | 1,
  ): readonly MuseumPoint[] => {
    const result: MuseumPoint[] = [from];
    let current = from;
    for (let index = 0; index < cells.length - 1; index += 1) {
      const currentCellId = cells[index];
      const nextCellId = cells[index + 1];
      const currentBounds = roomBounds.get(currentCellId)!;
      const nextBounds = roomBounds.get(nextCellId)!;
      const connection = spatialConnections.find(({fromCellId: first, toCellId: second}) =>
        (first === currentCellId && second === nextCellId)
        || (first === nextCellId && second === currentCellId));
      if (!connection) throw new Error(`Forum route has no opening between ${currentCellId} and ${nextCellId}.`);
      const openingCenter = center(connection.openingBounds);
      const openingWidth = connection.openingBounds.maxX - connection.openingBounds.minX;
      const openingDepth = connection.openingBounds.maxZ - connection.openingBounds.minZ;
      if (openingBias && openingWidth > openingDepth) {
        openingCenter.x = openingBias < 0
          ? connection.openingBounds.minX + .65
          : connection.openingBounds.maxX - .65;
      } else if (openingBias && openingDepth > openingWidth) {
        openingCenter.z = openingBias < 0
          ? connection.openingBounds.minZ + .65
          : connection.openingBounds.maxZ - .65;
      }
      const currentCenter = center(currentBounds);
      const nextCenter = center(nextBounds);
      const horizontal = Math.abs(nextCenter.x - currentCenter.x) > Math.abs(nextCenter.z - currentCenter.z);
      const direction = horizontal
        ? Math.sign(nextCenter.x - currentCenter.x)
        : Math.sign(nextCenter.z - currentCenter.z);
      const before = horizontal
        ? {x: openingCenter.x - direction * .55, z: openingCenter.z}
        : {x: openingCenter.x, z: openingCenter.z - direction * .55};
      const after = horizontal
        ? {x: openingCenter.x + direction * .55, z: openingCenter.z}
        : {x: openingCenter.x, z: openingCenter.z + direction * .55};
      result.push(...guidedWaypointsWithinRoom(current, before, currentBounds, colliders, true).slice(1), after);
      current = after;
    }
    result.push(...guidedWaypointsWithinRoom(current, to, roomBounds.get(toCellId)!, colliders, true).slice(1));
    return compactRoute(result);
  };
  const hallBounds = {minX: -FORUM_SIZE / 2, maxX: FORUM_SIZE / 2, minZ: -FORUM_SIZE / 2, maxZ: FORUM_SIZE / 2};
  const candidates: readonly MuseumPoint[][] = [true, false].flatMap((horizontalFirst) =>
    ([-1, 0, 1] as const).flatMap((openingBias) => {
      try {
        return [[...routeThroughCells(cellPath(horizontalFirst), openingBias)]];
      } catch {
        return [];
      }
    }));
  const obstacleBounds = guidedObstacleBounds(colliders);
  const clear = candidates
    .filter((candidate) => guidedRouteIsClear(candidate, hallBounds, obstacleBounds))
    .sort((first, second) => guidedRouteLength(first) - guidedRouteLength(second));
  if (!clear.length) throw new Error(`No collision-free Forum route exists between ${fromCellId} and ${toCellId}.`);
  return clear[0];
};

const quadrantCrossroadsGuidedWaypoints = (
  from: MuseumPoint,
  to: MuseumPoint,
  fromCellId: string,
  toCellId: string,
  roomBounds: ReadonlyMap<string, MuseumBounds>,
  colliders: readonly MuseumCollider[],
  roomEntryPoses: Readonly<Record<string, MuseumPose>>,
  hallDimensions: Readonly<{width: number; depth: number}>,
  galleryLabel: string,
): readonly MuseumPoint[] => {
  const entryFor = (cellId: string): MuseumPoint => {
    const pose = roomEntryPoses[cellId];
    if (!pose) throw new Error(`Unknown ${galleryLabel} guided cell ${cellId}.`);
    return {x: pose.x, z: pose.z};
  };
  const crossApproach = (entry: MuseumPoint, magnitude: number): MuseumPoint => ({
    x: Math.sign(entry.x) * magnitude,
    z: Math.sign(entry.z) * magnitude,
  });
  const startEntry = entryFor(fromCellId);
  const targetEntry = entryFor(toCellId);
  const startLeg = guidedWaypointsWithinRoom(
    from,
    startEntry,
    roomBounds.get(fromCellId)!,
    colliders,
    true,
  );
  const targetLeg = guidedWaypointsWithinRoom(
    targetEntry,
    to,
    roomBounds.get(toCellId)!,
    colliders,
    true,
  );
  const route = compactRoute([
    ...startLeg,
    crossApproach(startEntry, 4.75),
    crossApproach(startEntry, 3),
    {x: 0, z: 0},
    crossApproach(targetEntry, 3),
    crossApproach(targetEntry, 4.75),
    ...targetLeg,
  ]);
  const hallBounds: MuseumBounds = {
    minX: -hallDimensions.width / 2,
    maxX: hallDimensions.width / 2,
    minZ: -hallDimensions.depth / 2,
    maxZ: hallDimensions.depth / 2,
  };
  if (!guidedRouteIsClear(route, hallBounds, guidedObstacleBounds(colliders))) {
    throw new Error(`No collision-free ${galleryLabel} route exists between ${fromCellId} and ${toCellId}.`);
  }
  return route;
};

const enlightenmentCrossroadsGuidedWaypoints = (
  from: MuseumPoint,
  to: MuseumPoint,
  fromCellId: string,
  toCellId: string,
  roomBounds: ReadonlyMap<string, MuseumBounds>,
  colliders: readonly MuseumCollider[],
): readonly MuseumPoint[] => {
  const kantCellId = 'enlightenment-kant-critical';
  const doorwayByOuterCell = {
    'enlightenment-law-institutions': {
      outer: {x: 0, z: -4.55},
      center: {x: 0, z: -3.26},
    },
    'enlightenment-society-freedom': {
      outer: {x: 4.55, z: 0},
      center: {x: 3.28, z: 0},
    },
    'enlightenment-sentiment-commerce': {
      outer: {x: 0, z: 4.55},
      center: {x: 0, z: 3.28},
    },
    'enlightenment-equality-education': {
      outer: {x: -4.55, z: 0},
      center: {x: -3.28, z: 0},
    },
  } as const;
  type OuterCellId = keyof typeof doorwayByOuterCell;
  const fromDoor = doorwayByOuterCell[fromCellId as OuterCellId];
  const toDoor = doorwayByOuterCell[toCellId as OuterCellId];
  if (fromCellId !== kantCellId && !fromDoor) {
    throw new Error(`Unknown Gallery 18 guided cell ${fromCellId}.`);
  }
  if (toCellId !== kantCellId && !toDoor) {
    throw new Error(`Unknown Gallery 18 guided cell ${toCellId}.`);
  }

  const startLeg = fromDoor
    ? guidedWaypointsWithinRoom(
        from,
        fromDoor.outer,
        roomBounds.get(fromCellId)!,
        colliders,
        true,
      )
    : [from];
  const targetLeg = toDoor
    ? guidedWaypointsWithinRoom(
        toDoor.outer,
        to,
        roomBounds.get(toCellId)!,
        colliders,
        true,
      )
    : [to];
  const centralFrom = fromDoor?.center ?? from;
  const centralTo = toDoor?.center ?? to;
  const centralCandidates: readonly MuseumPoint[][] = [
    [centralFrom, centralTo],
    [centralFrom, {x: centralFrom.x, z: centralTo.z}, centralTo],
    [centralFrom, {x: centralTo.x, z: centralFrom.z}, centralTo],
    [centralFrom, {x: 0, z: 0}, centralTo],
    [centralFrom, {x: 3, z: centralFrom.z}, {x: 3, z: centralTo.z}, centralTo],
    [centralFrom, {x: -3, z: centralFrom.z}, {x: -3, z: centralTo.z}, centralTo],
    [centralFrom, {x: 3, z: centralFrom.z}, {x: 3, z: 0}, {x: centralTo.x, z: 0}, centralTo],
    [centralFrom, {x: -3, z: centralFrom.z}, {x: -3, z: 0}, {x: centralTo.x, z: 0}, centralTo],
  ];
  const hallBounds: MuseumBounds = {minX: -14, maxX: 14, minZ: -14, maxZ: 14};
  const obstacleBounds = guidedObstacleBounds(colliders);
  const centralRoute = centralCandidates
    .map((candidate) => compactRoute(candidate))
    .filter((candidate) => guidedRouteIsClear(candidate, hallBounds, obstacleBounds))
    .sort((first, second) => guidedRouteLength(first) - guidedRouteLength(second))[0];
  if (!centralRoute) {
    throw new Error(`No collision-free Gallery 18 central route exists between ${fromCellId} and ${toCellId}.`);
  }
  const route = compactRoute([
    ...startLeg,
    ...(fromDoor ? [fromDoor.center] : []),
    ...centralRoute.slice(1),
    ...(toDoor ? [toDoor.outer, ...targetLeg.slice(1)] : []),
  ]);
  if (!guidedRouteIsClear(route, hallBounds, obstacleBounds)) {
    throw new Error(`No collision-free Gallery 18 route exists between ${fromCellId} and ${toCellId}.`);
  }
  return route;
};

const outerWalls = (width: number, depth: number, height: number, prefix: string): MuseumWallDefinition[] => [
  {id: `${prefix}:north-wall`, center: {x: 0, z: -depth / 2}, size: {width, depth: WALL}, rotation: 0, height},
  {id: `${prefix}:south-wall`, center: {x: 0, z: depth / 2}, size: {width, depth: WALL}, rotation: 0, height},
  {id: `${prefix}:west-wall`, center: {x: -width / 2, z: 0}, size: {width: WALL, depth}, rotation: 0, height},
  {id: `${prefix}:east-wall`, center: {x: width / 2, z: 0}, size: {width: WALL, depth}, rotation: 0, height},
];

const sequencePartitionWalls = (
  rooms: readonly MuseumCanonicalRoom[],
  roomBounds: ReadonlyMap<string, MuseumBounds>,
  prefix: string,
  width = SEQUENCE_WIDTH,
  ceiling = SEQUENCE_CEILING,
): MuseumWallDefinition[] =>
  rooms.slice(0, -1).flatMap((room, index) => {
    const z = roomBounds.get(room.id)!.maxZ;
    const openingWidth = 4;
    const segmentWidth = (width - openingWidth) / 2;
    const segmentCenter = openingWidth / 2 + segmentWidth / 2;
    return [
      {id: `${prefix}:partition-${index + 1}-west`, center: {x: -segmentCenter, z}, size: {width: segmentWidth, depth: WALL}, rotation: 0, height: ceiling},
      {id: `${prefix}:partition-${index + 1}-east`, center: {x: segmentCenter, z}, size: {width: segmentWidth, depth: WALL}, rotation: 0, height: ceiling},
    ];
  });

const forumPartitionWalls = (prefix: string): MuseumWallDefinition[] => {
  return [...coreQuestionsForumInteriorWalls(prefix)];
};

const placeRoomExhibits = (
  room: MuseumCanonicalRoom,
  bounds: MuseumBounds,
  exclusions: readonly MuseumBounds[],
  centerFallback = false,
  authoredPlacements?: Readonly<Record<string, PlacementCandidate>>,
  canonicalExhibitConstruction = false,
  primaryScaleFloor?: PrimaryInstallationScaleFloor,
): MuseumExhibitLayout[] => {
  const accepted: MuseumExhibitLayout[] = [];
  const candidates = [...wallCandidates(bounds)];
  if (centerFallback) {
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerZ = (bounds.minZ + bounds.maxZ) / 2;
    const freestanding: PlacementCandidate[] = [];
    for (const zOffset of [-2.15, 2.15]) {
      for (const xOffset of [-3, -.75, .75, 3]) {
        freestanding.push({x: centerX + xOffset, z: centerZ + zOffset, rotationY: xOffset > 0 ? -Math.PI / 2 : Math.PI / 2});
      }
    }
    freestanding.push({x: centerX, z: centerZ, rotationY: 0});
    // Try four compact, inward-facing corner bays first; perimeter and inner
    // study positions remain deterministic fallbacks for rooms with portals.
    const halfWidth = (bounds.maxX - bounds.minX) / 2;
    const halfDepth = (bounds.maxZ - bounds.minZ) / 2;
    candidates.unshift(
      {x: centerX - halfWidth * .56, z: centerZ - halfDepth * .7, rotationY: 0},
      {x: centerX + halfWidth * .56, z: centerZ - halfDepth * .7, rotationY: 0},
      {x: centerX - halfWidth * .56, z: centerZ + halfDepth * .7, rotationY: Math.PI},
      {x: centerX + halfWidth * .56, z: centerZ + halfDepth * .7, rotationY: Math.PI},
    );
    candidates.push(...freestanding);
  }
  const resolveCandidate = (
    record: MuseumCanonicalExhibit,
    candidate: PlacementCandidate,
    placed: readonly MuseumExhibitLayout[],
  ): MuseumExhibitLayout | undefined => {
    const scene = createScene(record, centerFallback, canonicalExhibitConstruction, primaryScaleFloor);
    const footprint = colliderBounds(candidate, candidate.rotationY, scene.footprint.width, scene.footprint.depth);
    const proposed = createExhibitLayout(
      record,
      room.id,
      candidate,
      centerFallback,
      canonicalExhibitConstruction,
      primaryScaleFloor,
    );
    const inside = footprint.minX >= bounds.minX + .08 && footprint.maxX <= bounds.maxX - .08
      && footprint.minZ >= bounds.minZ + .08 && footprint.maxZ <= bounds.maxZ - .08;
    const blocked = placed.some((layout) => {
      const acceptedFootprint = colliderBounds(
        layout.position,
        layout.rotationY,
        layout.scene.footprint.width,
        layout.scene.footprint.depth,
      );
      return overlaps(footprint, acceptedFootprint, .25)
        || circleIntersectsBounds(proposed.viewpoint, VIEWPOINT_CLEARANCE_RADIUS, acceptedFootprint)
        || circleIntersectsBounds(layout.viewpoint, VIEWPOINT_CLEARANCE_RADIUS, footprint);
    });
    return inside
      && viewpointFitsRoom(proposed.viewpoint, bounds)
      && !exclusions.some((exclusion) => overlaps(footprint, exclusion, .28))
      && !blocked
      ? proposed
      : undefined;
  };

  if (authoredPlacements) {
    for (const record of room.exhibits) {
      const candidate = authoredPlacements[record.id];
      if (!candidate) throw new Error(`Canonical authored gallery has no placement for ${record.id}.`);
      const proposed = resolveCandidate(record, candidate, accepted);
      if (!proposed) {
        const scene = createScene(record, centerFallback, canonicalExhibitConstruction, primaryScaleFloor);
        const footprint = colliderBounds(candidate, candidate.rotationY, scene.footprint.width, scene.footprint.depth);
        const candidateLayout = createExhibitLayout(
          record,
          room.id,
          candidate,
          centerFallback,
          canonicalExhibitConstruction,
          primaryScaleFloor,
        );
        const blockers = accepted.filter((layout) => {
          const acceptedFootprint = colliderBounds(
            layout.position,
            layout.rotationY,
            layout.scene.footprint.width,
            layout.scene.footprint.depth,
          );
          return overlaps(footprint, acceptedFootprint, .25)
            || circleIntersectsBounds(candidateLayout.viewpoint, VIEWPOINT_CLEARANCE_RADIUS, acceptedFootprint)
            || circleIntersectsBounds(layout.viewpoint, VIEWPOINT_CLEARANCE_RADIUS, footprint);
        }).map(({id}) => id);
        throw new Error(
          `Canonical authored placement for ${record.id} violates its room, route, or neighboring installation `
          + `(footprint ${JSON.stringify(footprint)}, viewpoint ${JSON.stringify(candidateLayout.viewpoint)}, blockers ${blockers.join(', ') || 'none'}).`,
        );
      }
      accepted.push(proposed);
    }
    return accepted;
  }

  if (centerFallback) {
    const search = (
      recordIndex: number,
      remaining: readonly PlacementCandidate[],
      placed: readonly MuseumExhibitLayout[],
    ): readonly MuseumExhibitLayout[] | undefined => {
      if (recordIndex >= room.exhibits.length) return placed;
      const record = room.exhibits[recordIndex];
      for (let index = 0; index < remaining.length; index += 1) {
        const proposed = resolveCandidate(record, remaining[index], placed);
        if (!proposed) continue;
        const resolved = search(
          recordIndex + 1,
          remaining.filter((_, candidateIndex) => candidateIndex !== index),
          [...placed, proposed],
        );
        if (resolved) return resolved;
      }
      return undefined;
    };
    const resolved = search(0, candidates, []);
    if (!resolved) {
      throw new Error(`Canonical room ${room.id} cannot place its exhibits with clear visitor viewpoints.`);
    }
    return [...resolved];
  }

  for (const record of room.exhibits) {
    const candidateIndex = candidates.findIndex((candidate) => Boolean(resolveCandidate(record, candidate, accepted)));
    if (candidateIndex < 0) {
      throw new Error(`Canonical room ${room.id} cannot place exhibit ${record.id} without violating a landing, opening, or adjacent bay.`);
    }
    accepted.push(resolveCandidate(record, candidates.splice(candidateIndex, 1)[0], accepted)!);
  }
  return accepted;
};

const createCanonicalHall = (hall: MuseumCanonicalHall): MuseumCanonicalHallContentDefinition => {
  const isCoreForum = hall.id === CORE_QUESTIONS_FORUM_ID;
  const isClassicalChineseCrossroads = hall.id === CLASSICAL_CHINESE_GALLERY_ID;
  const isHellenisticRomanCrossroads = hall.id === HELLENISTIC_ROMAN_GALLERY_ID;
  const isEnlightenmentCrossroads = hall.id === ENLIGHTENMENT_GALLERY_ID;
  const isCritiquePowerDeconstructionCrossroads = hall.id === CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID;
  const isMoralLifePracticalReasonCrossroads = hall.id === MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID;
  const isAuthoredQuadrantCrossroads = isClassicalChineseCrossroads
    || isHellenisticRomanCrossroads
    || isCritiquePowerDeconstructionCrossroads
    || isMoralLifePracticalReasonCrossroads;
  const isAuthoredCrossroads = isAuthoredQuadrantCrossroads || isEnlightenmentCrossroads;
  const isCrossroads = isCoreForum || isAuthoredCrossroads;
  const template = getMuseumHallTemplate(hall.templateId);
  const authoredCrossroadsDimensions = isClassicalChineseCrossroads
    ? CLASSICAL_CHINESE_HALL_DIMENSIONS
    : isHellenisticRomanCrossroads
      ? HELLENISTIC_ROMAN_HALL_DIMENSIONS
    : isCritiquePowerDeconstructionCrossroads
      ? CRITIQUE_POWER_DECONSTRUCTION_HALL_DIMENSIONS
    : isMoralLifePracticalReasonCrossroads
      ? MORAL_LIFE_PRACTICAL_REASON_HALL_DIMENSIONS
      : ENLIGHTENMENT_HALL_DIMENSIONS;
  const ceiling = isAuthoredCrossroads
    ? authoredCrossroadsDimensions.ceilingHeight
    : isCoreForum ? FORUM_CEILING : template.ceilingHeightMetres;
  const width = isAuthoredCrossroads
    ? authoredCrossroadsDimensions.width
    : isCoreForum ? FORUM_SIZE : template.footprintMetres.width;
  const depth = isAuthoredCrossroads
    ? authoredCrossroadsDimensions.depth
    : isCoreForum ? FORUM_SIZE : template.footprintMetres.depth;
  const roomBounds = isClassicalChineseCrossroads
    ? new Map(Object.entries(CLASSICAL_CHINESE_ROOM_BOUNDS))
    : isHellenisticRomanCrossroads
      ? new Map(Object.entries(HELLENISTIC_ROMAN_ROOM_BOUNDS))
    : isCritiquePowerDeconstructionCrossroads
      ? new Map(Object.entries(CRITIQUE_POWER_DECONSTRUCTION_ROOM_BOUNDS))
    : isMoralLifePracticalReasonCrossroads
      ? new Map(Object.entries(MORAL_LIFE_PRACTICAL_REASON_ROOM_BOUNDS))
    : isEnlightenmentCrossroads
      ? new Map(Object.entries(ENLIGHTENMENT_ROOM_BOUNDS))
    : isCoreForum ? roomBoundsForForum(hall.rooms) : roomBoundsForSequence(hall.rooms, width, depth);
  const orderedRooms = isClassicalChineseCrossroads
    ? CLASSICAL_CHINESE_ROOM_ORDER.map((id) => hall.rooms.find((room) => room.id === id)!)
    : isHellenisticRomanCrossroads
      ? HELLENISTIC_ROMAN_ROOM_ORDER.map((id) => hall.rooms.find((room) => room.id === id)!)
    : isCritiquePowerDeconstructionCrossroads
      ? CRITIQUE_POWER_DECONSTRUCTION_ROOM_ORDER.map((id) => hall.rooms.find((room) => room.id === id)!)
    : isMoralLifePracticalReasonCrossroads
      ? MORAL_LIFE_PRACTICAL_REASON_ROOM_ORDER.map((id) => hall.rooms.find((room) => room.id === id)!)
    : isEnlightenmentCrossroads
      ? ENLIGHTENMENT_ROOM_ORDER.map((id) => hall.rooms.find((room) => room.id === id)!)
    : isCoreForum
      ? FORUM_ROOM_ORDER.map((id) => hall.rooms.find((room) => room.id === id)!)
      : [...hall.rooms];
  const spatialConnections = isClassicalChineseCrossroads
    ? [...CLASSICAL_CHINESE_SPATIAL_CONNECTIONS]
    : isHellenisticRomanCrossroads
      ? [...HELLENISTIC_ROMAN_SPATIAL_CONNECTIONS]
    : isCritiquePowerDeconstructionCrossroads
      ? [...CRITIQUE_POWER_DECONSTRUCTION_SPATIAL_CONNECTIONS]
    : isMoralLifePracticalReasonCrossroads
      ? [...MORAL_LIFE_PRACTICAL_REASON_SPATIAL_CONNECTIONS]
    : isEnlightenmentCrossroads
      ? [...ENLIGHTENMENT_SPATIAL_CONNECTIONS]
    : isCoreForum
      ? forumConnections(roomBounds)
      : sequenceConnections(orderedRooms, roomBounds);
  const node = getMuseumManifestHallNode(hall.id);
  if (!node) throw new Error(`Canonical hall ${hall.id} has no physical manifest node.`);
  const liveEndpointKeys = new Set(
    MUSEUM_BUILDING_MANIFEST.connections
      .filter(({implementationStatus, accessible}) => implementationStatus === 'live' && accessible)
      .flatMap(({a, b}) => [`${a.nodeId}/${a.slotId}`, `${b.nodeId}/${b.slotId}`]),
  );
  const doorwayExclusions = node.doorwaySlots
    // A doorway removes usable wall space only when the manifest gives that
    // exact endpoint a live physical connection. Reserved and inactive slots
    // remain full-height exhibit walls.
    .filter(({id}) => liveEndpointKeys.has(`${node.id}/${id}`))
    .map(({landingBounds}) => landingBounds);
  const furnishings = hall.id === MEDITERRANEAN_GALLERY_ID
    ? [MEDITERRANEAN_ORIENTATION_DISPLAY]
    : [];
  const furnishingExclusions = furnishings.map((item) => colliderBounds(
    item.center,
    item.rotation,
    item.size.width,
    item.size.depth,
  ));
  const supplementalExhibits = supplementalLayoutsForHall(hall.id);
  const computedPrimaryScaleFloor = primaryScaleFloorForHall(hall, supplementalExhibits);
  const authoredPrimaryScaleFloor = isClassicalChineseCrossroads
    ? CLASSICAL_CHINESE_PRIMARY_SCALE_FLOOR
    : isHellenisticRomanCrossroads
      ? HELLENISTIC_ROMAN_PRIMARY_SCALE_FLOOR
    : isCritiquePowerDeconstructionCrossroads
      ? CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_SCALE_FLOOR
    : isMoralLifePracticalReasonCrossroads
      ? MORAL_LIFE_PRACTICAL_REASON_PRIMARY_SCALE_FLOOR
      : ENLIGHTENMENT_PRIMARY_SCALE_FLOOR;
  const primaryScaleFloor = isAuthoredCrossroads
    ? {
        bayWidth: Math.max(authoredPrimaryScaleFloor.bayWidth, computedPrimaryScaleFloor?.bayWidth ?? 0),
        objectWidth: Math.max(authoredPrimaryScaleFloor.objectWidth, computedPrimaryScaleFloor?.objectWidth ?? 0),
        objectHeight: Math.max(authoredPrimaryScaleFloor.objectHeight, computedPrimaryScaleFloor?.objectHeight ?? 0),
        footprintHeight: Math.max(authoredPrimaryScaleFloor.footprintHeight, computedPrimaryScaleFloor?.footprintHeight ?? 0),
      }
    : computedPrimaryScaleFloor;
  const exhibits = orderedRooms.flatMap((room) => {
    const bounds = roomBounds.get(room.id)!;
    // Forum installations are authored against the actual offset walls and
    // baffles. Treating every broad semantic cell seam as a doorway exclusion
    // would reject valid wall-backed bays inside the intentionally open cross.
    const connectionExclusions = isCrossroads
      ? []
      : spatialConnections
        .filter(({fromCellId, toCellId}) => fromCellId === room.id || toCellId === room.id)
        .map(({openingBounds}) => openingBounds);
    return placeRoomExhibits(
      room,
      bounds,
      [...doorwayExclusions, ...connectionExclusions, ...furnishingExclusions],
      isCrossroads,
      hall.id === CORE_QUESTIONS_FORUM_ID
        ? CORE_QUESTIONS_FORUM_PRIMARY_PLACEMENTS
        : hall.id === CLASSICAL_CHINESE_GALLERY_ID
          ? CLASSICAL_CHINESE_PRIMARY_PLACEMENTS
        : hall.id === HELLENISTIC_ROMAN_GALLERY_ID
          ? HELLENISTIC_ROMAN_PRIMARY_PLACEMENTS
        : hall.id === CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID
          ? CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_PLACEMENTS
        : hall.id === MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID
          ? MORAL_LIFE_PRACTICAL_REASON_PRIMARY_PLACEMENTS
        : hall.id === MEDITERRANEAN_GALLERY_ID
        ? MEDITERRANEAN_AUTHORED_PLACEMENTS
        : hall.id === RENAISSANCE_GALLERY_ID
          ? RENAISSANCE_AUTHORED_PLACEMENTS
          : hall.id === PHENOMENOLOGY_GALLERY_ID
            ? PHENOMENOLOGY_PRIMARY_PLACEMENTS
            : hall.id === ANALYTIC_GALLERY_ID
              ? ANALYTIC_PRIMARY_PLACEMENTS
              : hall.id === JUSTICE_GALLERY_ID
                ? JUSTICE_PRIMARY_PLACEMENTS
                : hall.id === CLASSICAL_SOUTH_ASIAN_GALLERY_ID
                  ? CLASSICAL_SOUTH_ASIAN_PRIMARY_PLACEMENTS
                  : hall.id === BUDDHIST_GALLERY_ID
                    ? BUDDHIST_PRIMARY_PLACEMENTS
                    : hall.id === ISLAMIC_GALLERY_ID
                      ? ISLAMIC_PRIMARY_PLACEMENTS
                    : hall.id === EAST_ASIAN_GALLERY_ID
                      ? EAST_ASIAN_PRIMARY_PLACEMENTS
                    : hall.id === JEWISH_GALLERY_ID
                      ? JEWISH_PRIMARY_PLACEMENTS
                    : hall.id === LATE_ANTIQUITY_GALLERY_ID
                      ? LATE_ANTIQUITY_PRIMARY_PLACEMENTS
                    : hall.id === LATIN_SCHOLASTIC_GALLERY_ID
                      ? LATIN_SCHOLASTIC_PRIMARY_PLACEMENTS
                    : hall.id === RATIONALISM_GALLERY_ID
                      ? RATIONALISM_PRIMARY_PLACEMENTS
                    : hall.id === EMPIRICISM_GALLERY_ID
                      ? EMPIRICISM_PRIMARY_PLACEMENTS
                    : hall.id === ENLIGHTENMENT_GALLERY_ID
                      ? ENLIGHTENMENT_PRIMARY_PLACEMENTS
                    : hall.id === GERMAN_IDEALISM_GALLERY_ID
                      ? GERMAN_IDEALISM_PRIMARY_PLACEMENTS
                    : hall.id === UTILITY_LIBERTY_CAPITAL_GALLERY_ID
                      ? UTILITY_LIBERTY_CAPITAL_PRIMARY_PLACEMENTS
                    : hall.id === FAITH_PESSIMISM_VALUE_GALLERY_ID
                      ? FAITH_PESSIMISM_VALUE_PRIMARY_PLACEMENTS
                    : hall.id === PRAGMATISM_GALLERY_ID
                      ? PRAGMATISM_PRIMARY_PLACEMENTS
                    : hall.id === COLONIALISM_RACE_LIBERATION_GALLERY_ID
                      ? COLONIALISM_RACE_LIBERATION_PRIMARY_PLACEMENTS
            : undefined,
      hall.id === MEDITERRANEAN_GALLERY_ID
        || hall.id === RENAISSANCE_GALLERY_ID
        || Boolean(primaryScaleFloor),
      primaryScaleFloor,
    );
  });
  const cells: MuseumSpatialCell[] = orderedRooms.map((room) => ({
    id: room.id,
    kind: 'room',
    title: room.title,
    bounds: roomBounds.get(room.id)!,
    ceilingHeight: ceiling,
    exhibitIds: room.exhibits.map(({id}) => id as MuseumExhibitId),
    lightingGroupId: `lighting:${room.id}`,
  }));
  const tracks: MuseumTrackDefinition[] = cells.map((cell) => ({
    id: `track:${cell.id}`,
    center: {x: (cell.bounds.minX + cell.bounds.maxX) / 2, y: ceiling - .24, z: (cell.bounds.minZ + cell.bounds.maxZ) / 2},
    size: {width: Math.max(2, cell.bounds.maxX - cell.bounds.minX - 1.2), height: .07, depth: .08},
  }));
  const exhibitLights = exhibits.map((layout) => {
    const target = {x: layout.position.x, y: Math.min(1.72, layout.scene.focalTarget.y), z: layout.position.z};
    const track = tracks.find(({id}) => id === `track:${layout.spatialCellId}`)!;
    const mountPosition = {x: Math.max(track.center.x - track.size.width / 2, Math.min(track.center.x + track.size.width / 2, target.x)), y: ceiling - .28, z: track.center.z};
    return {
      id: `light:${layout.id}`,
      exhibitId: layout.id,
      trackId: track.id,
      mountPosition,
      position: {...mountPosition, y: mountPosition.y - .32},
      target,
      intensity: layout.presentationTier === 'anchor' ? 38 : 31,
      distance: 10,
      angle: .4,
      penumbra: .72,
    };
  });
  const wallColliders = [
    ...outerWalls(width, depth, ceiling, hall.id),
    ...(isClassicalChineseCrossroads
      ? classicalChineseInteriorWalls()
      : isHellenisticRomanCrossroads
        ? hellenisticRomanInteriorWalls()
      : isCritiquePowerDeconstructionCrossroads
        ? critiquePowerDeconstructionInteriorWalls()
      : isMoralLifePracticalReasonCrossroads
        ? moralLifePracticalReasonInteriorWalls()
      : isEnlightenmentCrossroads
        ? [...enlightenmentInteriorWalls(), enlightenmentKantBaffle()]
      : isCoreForum
        ? forumPartitionWalls(hall.id)
        : sequencePartitionWalls(orderedRooms, roomBounds, hall.id, width, ceiling)),
  ];
  if (
    hall.id === CORE_QUESTIONS_FORUM_ID
    || hall.id === RENAISSANCE_GALLERY_ID
    || hall.id === PHENOMENOLOGY_GALLERY_ID
    || hall.id === ANALYTIC_GALLERY_ID
    || hall.id === JUSTICE_GALLERY_ID
    || hall.id === CLASSICAL_SOUTH_ASIAN_GALLERY_ID
    || hall.id === BUDDHIST_GALLERY_ID
    || hall.id === CLASSICAL_CHINESE_GALLERY_ID
    || hall.id === ISLAMIC_GALLERY_ID
    || hall.id === 'east-asian-continuities'
    || hall.id === 'jewish-philosophy'
    || hall.id === HELLENISTIC_ROMAN_GALLERY_ID
    || hall.id === LATE_ANTIQUITY_GALLERY_ID
    || hall.id === LATIN_SCHOLASTIC_GALLERY_ID
    || hall.id === RATIONALISM_GALLERY_ID
    || hall.id === EMPIRICISM_GALLERY_ID
    || hall.id === ENLIGHTENMENT_GALLERY_ID
    || hall.id === GERMAN_IDEALISM_GALLERY_ID
    || hall.id === UTILITY_LIBERTY_CAPITAL_GALLERY_ID
    || hall.id === FAITH_PESSIMISM_VALUE_GALLERY_ID
    || hall.id === PRAGMATISM_GALLERY_ID
    || hall.id === CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID
    || hall.id === MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID
    || hall.id === COLONIALISM_RACE_LIBERATION_GALLERY_ID
  ) {
    const acceptedSupplementalBounds: {spatialCellId: string; bounds: MuseumBounds}[] = [];
    for (const layout of supplementalExhibits) {
      const cellBounds = roomBounds.get(layout.spatialCellId);
      if (!cellBounds) throw new Error(`${hall.title} supplemental exhibit ${layout.id} has no room.`);
      const footprint = colliderBounds(
        layout.position,
        layout.rotationY,
        layout.collider.size.width,
        layout.collider.size.depth,
      );
      const inside = footprint.minX >= cellBounds.minX + .08
        && footprint.maxX <= cellBounds.maxX - .08
        && footprint.minZ >= cellBounds.minZ + .08
        && footprint.maxZ <= cellBounds.maxZ - .08;
      const primaryBounds = exhibits
        .filter(({spatialCellId}) => spatialCellId === layout.spatialCellId)
        .map((item) => ({
          id: item.id,
          bounds: colliderBounds(item.position, item.rotationY, item.collider.size.width, item.collider.size.depth),
        }));
      const primaryOverlap = primaryBounds.find(({bounds}) => overlaps(footprint, bounds, .32));
      const violations = [
        ...(!inside ? ['room bounds'] : []),
        ...(!viewpointFitsRoom(layout.viewpoint, cellBounds) ? ['viewpoint'] : []),
        ...(doorwayExclusions.some((exclusion) => overlaps(footprint, exclusion, .28)) ? ['doorway'] : []),
        ...(primaryOverlap ? [`primary exhibit ${primaryOverlap.id}`] : []),
        ...(acceptedSupplementalBounds.some(
          (accepted) => accepted.spatialCellId === layout.spatialCellId
            && overlaps(footprint, accepted.bounds, .32),
        ) ? ['supplemental exhibit'] : []),
      ];
      if (violations.length) throw new Error(
        `${hall.title} supplemental placement ${layout.id} violates: ${violations.join(', ')}.`,
      );
      acceptedSupplementalBounds.push({spatialCellId: layout.spatialCellId, bounds: footprint});
    }
  }
  const obstacleColliders = [
    ...exhibits.map(({collider}) => collider),
    ...supplementalExhibits.map(({collider}) => collider),
    ...furnishings,
  ];
  const guidedWalkLegs = exhibits.slice(0, -1).map((layout, index) => {
    const target = exhibits[index + 1];
    const waypoints = isEnlightenmentCrossroads && layout.spatialCellId !== target.spatialCellId
      ? enlightenmentCrossroadsGuidedWaypoints(
          layout.viewpoint,
          target.viewpoint,
          layout.spatialCellId,
          target.spatialCellId,
          roomBounds,
          [...wallColliders, ...obstacleColliders],
        )
      : isAuthoredQuadrantCrossroads && layout.spatialCellId !== target.spatialCellId
      ? quadrantCrossroadsGuidedWaypoints(
          layout.viewpoint,
          target.viewpoint,
          layout.spatialCellId,
          target.spatialCellId,
          roomBounds,
          [...wallColliders, ...obstacleColliders],
          isClassicalChineseCrossroads
            ? CLASSICAL_CHINESE_ROOM_ENTRY_POSES
            : isHellenisticRomanCrossroads
              ? HELLENISTIC_ROMAN_ROOM_ENTRY_POSES
            : isCritiquePowerDeconstructionCrossroads
              ? CRITIQUE_POWER_DECONSTRUCTION_ROOM_ENTRY_POSES
              : MORAL_LIFE_PRACTICAL_REASON_ROOM_ENTRY_POSES,
          authoredCrossroadsDimensions,
          isClassicalChineseCrossroads
            ? 'Gallery 09'
            : isHellenisticRomanCrossroads
              ? 'Gallery 14'
            : isCritiquePowerDeconstructionCrossroads
              ? 'Gallery 23'
              : 'Gallery 24',
        )
      : isCoreForum && layout.spatialCellId !== target.spatialCellId
        ? forumGuidedWaypoints(
            layout.viewpoint,
            target.viewpoint,
            layout.spatialCellId,
            target.spatialCellId,
            roomBounds,
            spatialConnections,
            [...wallColliders, ...obstacleColliders],
          )
      : layout.spatialCellId === target.spatialCellId
      ? guidedWaypointsWithinRoom(
          layout.viewpoint,
          target.viewpoint,
          roomBounds.get(layout.spatialCellId)!,
          [...wallColliders, ...obstacleColliders],
          isCrossroads,
        )
      : [
          layout.viewpoint,
          {x: 0, z: layout.viewpoint.z},
          {x: 0, z: target.viewpoint.z},
          target.viewpoint,
        ];
    return {fromExhibitId: layout.id, toExhibitId: target.id, waypoints};
  });
  const defaultSpawnSlotId = node.routePortals?.entry ?? 'N0';
  const defaultSpawn = node.doorwaySlots.find(({id}) => id === defaultSpawnSlotId)?.arrivalPose
    ?? node.doorwaySlots[0].arrivalPose;
  const southAsianEntryPrimary = hall.id === CLASSICAL_SOUTH_ASIAN_GALLERY_ID
    ? exhibits.find(({spatialCellId}) => spatialCellId === orderedRooms[0]?.id)
    : undefined;
  const spawn = hall.id === MEDITERRANEAN_GALLERY_ID
    ? {...defaultSpawn, yaw: 2.65, pitch: -.015}
    : southAsianEntryPrimary
      ? {...southAsianEntryPrimary.viewpoint}
      : defaultSpawn;
  const standardSigns = [
    {
      id: `${hall.id}:entrance-sign`,
      kind: 'entrance' as const,
      title: hall.title,
      kicker: isCoreForum ? 'Core Questions Forum' : 'Permanent gallery',
      subtitle: hall.period,
      position: {x: -Math.min(7, width / 3), y: 2.15, z: -depth / 2 + .22},
      rotationY: 0,
      width: Math.min(4.8, width * .38),
      height: 1.08,
    },
    ...orderedRooms.flatMap((room) => {
      const bounds = roomBounds.get(room.id)!;
      const roomSign = {
        id: `${room.id}:room-sign`,
        kind: 'zone' as const,
        title: room.title,
        kicker: 'Room',
        subtitle: 'Questions, objects, and arguments in historical context',
        position: {x: bounds.maxX - .22, y: isCoreForum ? 5.25 : 2.2, z: (bounds.minZ + bounds.maxZ) / 2},
        rotationY: -Math.PI / 2,
        width: isCoreForum ? 2.45 : Math.min(3.6, Math.max(2.4, bounds.maxZ - bounds.minZ - 1)),
        height: isCoreForum ? .62 : .88,
      };
      const comparativeLensSigns = (room.comparativeLenses ?? []).map((lens, index) => ({
        id: `${room.id}:lens:${lens.id}`,
        kind: 'wayfinding' as const,
        title: lens.displayName,
        kicker: 'Comparative lens · route outward',
        subtitle: `${lens.culturalSetting} → ${MUSEUM_PLANNED_HALL_TITLES[lens.primaryHallId]}`,
        position: {
          x: bounds.minX + .22,
          y: isCoreForum ? 5.25 - index * .68 : 1.25 + index * 1.18,
          z: (bounds.minZ + bounds.maxZ) / 2,
        },
        rotationY: Math.PI / 2,
        width: isCoreForum ? 2.4 : Math.min(4.15, Math.max(2.8, bounds.maxZ - bounds.minZ - .8)),
        height: isCoreForum ? .56 : .76,
      }));
      return [roomSign, ...comparativeLensSigns];
    }),
  ];
  const promotedSequenceSigns = hall.id === GERMAN_IDEALISM_GALLERY_ID
    ? orderedRooms.map((room) => {
        const copy = GERMAN_IDEALISM_ROOM_SIGN_COPY[
          room.id as keyof typeof GERMAN_IDEALISM_ROOM_SIGN_COPY
        ];
        if (!copy) throw new Error(`Gallery 19 has no visitor-facing orientation copy for ${room.id}.`);
        const bounds = roomBounds.get(room.id)!;
        return {
          id: `${room.id}:room-sign`,
          kind: room.id === 'german-idealism-orientation' ? 'entrance' as const : 'zone' as const,
          title: copy.title,
          kicker: copy.kicker,
          subtitle: copy.subtitle,
          position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
          rotationY: Math.PI,
          width: room.id === 'german-idealism-orientation' ? 5.2 : 4.8,
          height: .82,
        };
      })
    : hall.id === UTILITY_LIBERTY_CAPITAL_GALLERY_ID
    ? orderedRooms.map((room) => {
        const copy = UTILITY_LIBERTY_CAPITAL_ROOM_SIGN_COPY[
          room.id as keyof typeof UTILITY_LIBERTY_CAPITAL_ROOM_SIGN_COPY
        ];
        if (!copy) throw new Error(`Gallery 20 has no visitor-facing orientation copy for ${room.id}.`);
        const bounds = roomBounds.get(room.id)!;
        return {
          id: `${room.id}:room-sign`,
          kind: room.id === 'nineteenth-utilitarian-reform' ? 'entrance' as const : 'zone' as const,
          title: copy.title,
          kicker: copy.kicker,
          subtitle: copy.subtitle,
          position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
          rotationY: Math.PI,
          width: room.id === 'nineteenth-utilitarian-reform' ? 5.2 : 4.8,
          height: .82,
        };
      })
    : hall.id === FAITH_PESSIMISM_VALUE_GALLERY_ID
      ? orderedRooms.map((room) => {
          const copy = FAITH_PESSIMISM_VALUE_ROOM_SIGN_COPY[
            room.id as keyof typeof FAITH_PESSIMISM_VALUE_ROOM_SIGN_COPY
          ];
          if (!copy) throw new Error(`Gallery 21 has no visitor-facing orientation copy for ${room.id}.`);
          const bounds = roomBounds.get(room.id)!;
          return {
            id: `${room.id}:room-sign`,
            kind: room.id === 'nineteenth-will-pessimism' ? 'entrance' as const : 'zone' as const,
            title: copy.title,
            kicker: copy.kicker,
            subtitle: copy.subtitle,
            position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
            rotationY: Math.PI,
            width: room.id === 'nineteenth-will-pessimism' ? 5.2 : 4.8,
            height: .82,
          };
        })
      : hall.id === PRAGMATISM_GALLERY_ID
        ? orderedRooms.map((room) => {
            const copy = PRAGMATISM_ROOM_SIGN_COPY[
              room.id as keyof typeof PRAGMATISM_ROOM_SIGN_COPY
            ];
            if (!copy) throw new Error(`Gallery 22 has no visitor-facing orientation copy for ${room.id}.`);
            const bounds = roomBounds.get(room.id)!;
            return {
              id: `${room.id}:room-sign`,
              kind: room.id === 'pragmatism-continuities-reserve' ? 'entrance' as const : 'zone' as const,
              title: copy.title,
              kicker: copy.kicker,
              subtitle: copy.subtitle,
              position: {x: 0, y: 4.55, z: bounds.minZ + .22},
              rotationY: 0,
              width: room.id === 'pragmatism-continuities-reserve' ? 5.2 : 4.8,
              height: .82,
            };
          })
      : hall.id === COLONIALISM_RACE_LIBERATION_GALLERY_ID
        ? orderedRooms.map((room) => {
            const copy = COLONIALISM_RACE_LIBERATION_ROOM_SIGN_COPY[
              room.id as keyof typeof COLONIALISM_RACE_LIBERATION_ROOM_SIGN_COPY
            ];
            if (!copy) throw new Error(`Gallery 26 has no visitor-facing orientation copy for ${room.id}.`);
            const bounds = roomBounds.get(room.id)!;
            return {
              id: `${room.id}:room-sign`,
              kind: room.id === 'colonial-embodiment-liberation' ? 'entrance' as const : 'zone' as const,
              title: copy.title,
              kicker: copy.kicker,
              subtitle: copy.subtitle,
              position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
              rotationY: Math.PI,
              width: room.id === 'colonial-embodiment-liberation' ? 5.2 : 4.8,
              height: .82,
            };
          })
      : undefined;
  const establishedSigns = hall.id === MEDITERRANEAN_GALLERY_ID
    ? [
        {
          id: `${hall.id}:entrance-sign`,
          kind: 'entrance' as const,
          title: 'PHILOSOPHY ATLAS MUSEUM',
          kicker: '',
          subtitle: 'Gallery 01 · Mediterranean Beginnings & Classical Athens',
          position: {x: 0, y: 4.35, z: -18.2},
          rotationY: Math.PI,
          width: 3.4,
          height: .7,
        },
        ...orderedRooms
          .filter(({id}) => id !== 'med-sophists-socratic')
          .map((room, index) => {
            const copy = MEDITERRANEAN_ROOM_SIGN_COPY[room.id as keyof typeof MEDITERRANEAN_ROOM_SIGN_COPY];
            if (!copy) throw new Error(`Gallery 01 has no visitor-facing room copy for ${room.id}.`);
            const bounds = roomBounds.get(room.id)!;
            return {
              id: `${room.id}:room-sign`,
              kind: 'zone' as const,
              title: copy.title,
              kicker: copy.kicker,
              subtitle: copy.subtitle,
              position: {
                x: index === 0 ? 6 : -6,
                y: 2.25,
                z: index === 0 ? bounds.maxZ + .22 : bounds.minZ - .22,
              },
              rotationY: index === 0 ? 0 : Math.PI,
              width: 3.9,
              height: .88,
            };
          }),
      ]
    : hall.id === RENAISSANCE_GALLERY_ID
      ? orderedRooms.map((room) => {
          const copy = RENAISSANCE_ROOM_SIGN_COPY[room.id as keyof typeof RENAISSANCE_ROOM_SIGN_COPY];
          if (!copy) throw new Error(`Gallery 02 has no visitor-facing orientation copy for ${room.id}.`);
          const bounds = roomBounds.get(room.id)!;
          return {
            id: `${room.id}:room-sign`,
            kind: room.id === 'early-statecraft-republic' ? 'entrance' as const : 'zone' as const,
            title: copy.title,
            kicker: copy.kicker,
            subtitle: copy.subtitle,
            position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
            rotationY: Math.PI,
            width: room.id === 'early-statecraft-republic' ? 5.2 : 4.8,
            height: .82,
          };
        })
      : hall.id === PHENOMENOLOGY_GALLERY_ID
        ? orderedRooms.map((room) => {
            const copy = PHENOMENOLOGY_ROOM_SIGN_COPY[room.id as keyof typeof PHENOMENOLOGY_ROOM_SIGN_COPY];
            if (!copy) throw new Error(`Gallery 03 has no visitor-facing orientation copy for ${room.id}.`);
            const bounds = roomBounds.get(room.id)!;
            return {
              id: `${room.id}:room-sign`,
              kind: room.id === 'phenomenology-method' ? 'entrance' as const : 'zone' as const,
              title: copy.title,
              kicker: copy.kicker,
              subtitle: copy.subtitle,
              position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
              rotationY: Math.PI,
              width: room.id === 'phenomenology-method' ? 5.2 : 4.8,
              height: .82,
            };
          })
        : hall.id === ANALYTIC_GALLERY_ID
          ? orderedRooms.map((room) => {
              const copy = ANALYTIC_ROOM_SIGN_COPY[room.id as keyof typeof ANALYTIC_ROOM_SIGN_COPY];
              if (!copy) throw new Error(`Gallery 04 has no visitor-facing orientation copy for ${room.id}.`);
              const bounds = roomBounds.get(room.id)!;
              return {
                id: `${room.id}:room-sign`,
                kind: room.id === 'analytic-origins-foundations' ? 'entrance' as const : 'zone' as const,
                title: copy.title,
                kicker: copy.kicker,
                subtitle: copy.subtitle,
                position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
                rotationY: Math.PI,
                width: room.id === 'analytic-origins-foundations' ? 5.2 : 4.8,
                height: .82,
              };
            })
          : hall.id === JUSTICE_GALLERY_ID
            ? orderedRooms.map((room) => {
                const copy = JUSTICE_ROOM_SIGN_COPY[room.id as keyof typeof JUSTICE_ROOM_SIGN_COPY];
                if (!copy) throw new Error(`Gallery 05 has no visitor-facing orientation copy for ${room.id}.`);
                const bounds = roomBounds.get(room.id)!;
                return {
                  id: `${room.id}:room-sign`,
                  kind: room.id === 'justice-political-orientation' ? 'entrance' as const : 'zone' as const,
                  title: copy.title,
                  kicker: copy.kicker,
                  subtitle: copy.subtitle,
                  position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
                  rotationY: Math.PI,
                  width: room.id === 'justice-political-orientation' ? 5.2 : 4.8,
                  height: .82,
                };
              })
            : hall.id === CLASSICAL_SOUTH_ASIAN_GALLERY_ID
              ? orderedRooms.map((room) => {
                  const copy = CLASSICAL_SOUTH_ASIAN_ROOM_SIGN_COPY[
                    room.id as keyof typeof CLASSICAL_SOUTH_ASIAN_ROOM_SIGN_COPY
                  ];
                  if (!copy) throw new Error(`Gallery 07 has no visitor-facing orientation copy for ${room.id}.`);
                  const bounds = roomBounds.get(room.id)!;
                  return {
                    id: `${room.id}:room-sign`,
                    kind: room.id === 'south-orientation-many-schools' ? 'entrance' as const : 'zone' as const,
                    title: copy.title,
                    kicker: copy.kicker,
                    subtitle: copy.subtitle,
                    position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
                    rotationY: Math.PI,
                    width: room.id === 'south-orientation-many-schools' ? 5.2 : 4.8,
                    height: .82,
                  };
                })
              : hall.id === BUDDHIST_GALLERY_ID
                ? orderedRooms.map((room) => {
                    const copy = BUDDHIST_ROOM_SIGN_COPY[
                      room.id as keyof typeof BUDDHIST_ROOM_SIGN_COPY
                    ];
                    if (!copy) throw new Error(`Gallery 08 has no visitor-facing orientation copy for ${room.id}.`);
                    const bounds = roomBounds.get(room.id)!;
                    return {
                      id: `${room.id}:room-sign`,
                      kind: room.id === 'buddhist-many-paths' ? 'entrance' as const : 'zone' as const,
                      title: copy.title,
                      kicker: copy.kicker,
                      subtitle: copy.subtitle,
                      position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
                      rotationY: Math.PI,
                      width: room.id === 'buddhist-many-paths' ? 5.2 : 4.8,
                      height: .82,
                    };
                  })
                : hall.id === CLASSICAL_CHINESE_GALLERY_ID
                  ? orderedRooms.map((room) => {
                      const copy = CLASSICAL_CHINESE_ROOM_SIGN_COPY[
                        room.id as keyof typeof CLASSICAL_CHINESE_ROOM_SIGN_COPY
                      ];
                      if (!copy) throw new Error(`Gallery 09 has no visitor-facing orientation copy for ${room.id}.`);
                      const placement = room.id === 'china-many-ways'
                        ? {x: -9, z: -13.72, rotationY: 0}
                        : room.id === 'china-confucian-cultivation'
                          ? {x: 9, z: -13.72, rotationY: 0}
                          : room.id === 'china-daoist-way'
                            ? {x: -13.72, z: 9, rotationY: Math.PI / 2}
                            : {x: 13.72, z: 9, rotationY: -Math.PI / 2};
                      return {
                        id: `${room.id}:room-sign`,
                        kind: room.id === 'china-many-ways' ? 'entrance' as const : 'zone' as const,
                        title: copy.title,
                        kicker: copy.kicker,
                        subtitle: copy.subtitle,
                        position: {x: placement.x, y: 5.22, z: placement.z},
                        rotationY: placement.rotationY,
                        width: 4.6,
                        height: .72,
                      };
                    })
                  : hall.id === ISLAMIC_GALLERY_ID
                  ? orderedRooms.map((room) => {
                      const copy = ISLAMIC_ROOM_SIGN_COPY[
                        room.id as keyof typeof ISLAMIC_ROOM_SIGN_COPY
                      ];
                      if (!copy) throw new Error(`Gallery 10 has no visitor-facing orientation copy for ${room.id}.`);
                      const bounds = roomBounds.get(room.id)!;
                      return {
                        id: `${room.id}:room-sign`,
                        kind: room.id === 'islamic-translation-falsafa' ? 'entrance' as const : 'zone' as const,
                        title: copy.title,
                        kicker: copy.kicker,
                        subtitle: copy.subtitle,
                        position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
                        rotationY: Math.PI,
                        width: room.id === 'islamic-translation-falsafa' ? 5.2 : 4.8,
                        height: .82,
                      };
                    })
                  : hall.id === EAST_ASIAN_GALLERY_ID
                    ? orderedRooms.map((room) => {
                        const copy = EAST_ASIAN_ROOM_SIGN_COPY[
                          room.id as keyof typeof EAST_ASIAN_ROOM_SIGN_COPY
                        ];
                        if (!copy) throw new Error(`Gallery 11 has no visitor-facing orientation copy for ${room.id}.`);
                        const bounds = roomBounds.get(room.id)!;
                        return {
                          id: `${room.id}:room-sign`,
                          kind: room.id === 'east-song-ming-confucian' ? 'entrance' as const : 'zone' as const,
                          title: copy.title,
                          kicker: copy.kicker,
                          subtitle: copy.subtitle,
                          position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
                          rotationY: Math.PI,
                          width: room.id === 'east-song-ming-confucian' ? 5.2 : 4.8,
                          height: .82,
                        };
                      })
                    : hall.id === JEWISH_GALLERY_ID
                      ? orderedRooms.map((room) => {
                          const copy = JEWISH_ROOM_SIGN_COPY[
                            room.id as keyof typeof JEWISH_ROOM_SIGN_COPY
                          ];
                          if (!copy) throw new Error(`Gallery 12 has no visitor-facing orientation copy for ${room.id}.`);
                          const bounds = roomBounds.get(room.id)!;
                          return {
                            id: `${room.id}:room-sign`,
                            kind: room.id === 'jewish-reason-revelation' ? 'entrance' as const : 'zone' as const,
                            title: copy.title,
                            kicker: copy.kicker,
                            subtitle: copy.subtitle,
                            position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
                            rotationY: Math.PI,
                            width: room.id === 'jewish-reason-revelation' ? 5.2 : 4.8,
                            height: .82,
                          };
                        })
                    : hall.id === HELLENISTIC_ROMAN_GALLERY_ID
                      ? orderedRooms.map((room) => {
                          const copy = HELLENISTIC_ROMAN_ROOM_SIGN_COPY[
                            room.id as keyof typeof HELLENISTIC_ROMAN_ROOM_SIGN_COPY
                          ];
                          if (!copy) throw new Error(`Gallery 14 has no visitor-facing orientation copy for ${room.id}.`);
                          const placement = room.id === 'hell-cynic-way'
                            ? {x: -9, z: -13.72, rotationY: 0}
                            : room.id === 'hell-epicurean-garden'
                              ? {x: 9, z: -13.72, rotationY: 0}
                              : room.id === 'hell-stoic-stoa'
                                ? {x: -13.72, z: 9, rotationY: Math.PI / 2}
                                : {x: 13.72, z: 9, rotationY: -Math.PI / 2};
                          return {
                            id: `${room.id}:room-sign`,
                            kind: room.id === 'hell-cynic-way' ? 'entrance' as const : 'zone' as const,
                            title: copy.title,
                            kicker: copy.kicker,
                            subtitle: copy.subtitle,
                            position: {x: placement.x, y: 5.22, z: placement.z},
                            rotationY: placement.rotationY,
                            width: 4.6,
                            height: .72,
                          };
                        })
                    : hall.id === CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID
                      ? [
                          {
                            id: `${hall.id}:entrance-sign`,
                            kind: 'entrance' as const,
                            title: hall.title,
                            kicker: 'Gallery 23 · Critique, power, and contested modernity',
                            subtitle: hall.period,
                            position: {x: -13.78, y: 4.7, z: 0},
                            rotationY: -Math.PI / 2,
                            width: 4.2,
                            height: .72,
                          },
                          ...orderedRooms.map((room) => {
                            const copy = CRITIQUE_POWER_DECONSTRUCTION_ROOM_SIGN_COPY[
                              room.id as keyof typeof CRITIQUE_POWER_DECONSTRUCTION_ROOM_SIGN_COPY
                            ];
                            if (!copy) throw new Error(`Gallery 23 has no visitor-facing orientation copy for ${room.id}.`);
                            const placement = room.id === 'continental-orientation'
                              ? {x: -9, z: -13.72, rotationY: 0}
                              : room.id === 'critique-genealogy-power'
                                ? {x: 9, z: -13.72, rotationY: 0}
                                : room.id === 'critique-deconstruction'
                                  ? {x: 13.72, z: 9, rotationY: -Math.PI / 2}
                                  : {x: -13.72, z: 9, rotationY: Math.PI / 2};
                            return {
                              id: `${room.id}:room-sign`,
                              kind: 'zone' as const,
                              title: copy.title,
                              kicker: copy.kicker,
                              subtitle: copy.subtitle,
                              position: {x: placement.x, y: 5.22, z: placement.z},
                              rotationY: placement.rotationY,
                              width: 4.6,
                              height: .72,
                            };
                          }),
                        ]
                    : hall.id === MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID
                      ? [
                          {
                            id: `${hall.id}:entrance-sign`,
                            kind: 'entrance' as const,
                            title: hall.title,
                            kicker: 'Gallery 24 · Moral life and practical reason',
                            subtitle: hall.period,
                            position: {x: 13.78, y: 4.7, z: 0},
                            rotationY: Math.PI / 2,
                            width: 4.2,
                            height: .72,
                          },
                          ...orderedRooms.map((room) => {
                            const copy = MORAL_LIFE_PRACTICAL_REASON_ROOM_SIGN_COPY[
                              room.id as keyof typeof MORAL_LIFE_PRACTICAL_REASON_ROOM_SIGN_COPY
                            ];
                            if (!copy) throw new Error(`Gallery 24 has no visitor-facing orientation copy for ${room.id}.`);
                            const placement = room.id === 'moral-ethics-orientation'
                              ? {x: -9, z: -13.72, rotationY: 0}
                              : room.id === 'moral-character-virtue'
                                ? {x: 9, z: -13.72, rotationY: 0}
                                : room.id === 'moral-duty-consequence'
                                  ? {x: 13.72, z: 9, rotationY: -Math.PI / 2}
                                  : {x: -13.72, z: 9, rotationY: Math.PI / 2};
                            return {
                              id: `${room.id}:room-sign`,
                              kind: 'zone' as const,
                              title: copy.title,
                              kicker: copy.kicker,
                              subtitle: copy.subtitle,
                              position: {x: placement.x, y: 5.22, z: placement.z},
                              rotationY: placement.rotationY,
                              width: 4.6,
                              height: .72,
                            };
                          }),
                        ]
                    : hall.id === LATE_ANTIQUITY_GALLERY_ID
                      ? orderedRooms.map((room) => {
                          const copy = LATE_ANTIQUITY_ROOM_SIGN_COPY[
                            room.id as keyof typeof LATE_ANTIQUITY_ROOM_SIGN_COPY
                          ];
                          if (!copy) throw new Error(`Gallery 15 has no visitor-facing orientation copy for ${room.id}.`);
                          const bounds = roomBounds.get(room.id)!;
                          return {
                            id: `${room.id}:room-sign`,
                            kind: room.id === 'late-neoplatonic-systems' ? 'entrance' as const : 'zone' as const,
                            title: copy.title,
                            kicker: copy.kicker,
                            subtitle: copy.subtitle,
                            position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
                            rotationY: Math.PI,
                            width: room.id === 'late-neoplatonic-systems' ? 5.2 : 4.8,
                            height: .82,
                          };
                        })
                    : hall.id === LATIN_SCHOLASTIC_GALLERY_ID
                      ? orderedRooms.map((room) => {
                          const copy = LATIN_SCHOLASTIC_ROOM_SIGN_COPY[
                            room.id as keyof typeof LATIN_SCHOLASTIC_ROOM_SIGN_COPY
                          ];
                          if (!copy) throw new Error(`Gallery 13 has no visitor-facing orientation copy for ${room.id}.`);
                          const bounds = roomBounds.get(room.id)!;
                          return {
                            id: `${room.id}:room-sign`,
                            kind: room.id === 'latin-transmission-carolingian' ? 'entrance' as const : 'zone' as const,
                            title: copy.title,
                            kicker: copy.kicker,
                            subtitle: copy.subtitle,
                            position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
                            rotationY: Math.PI,
                            width: room.id === 'latin-transmission-carolingian' ? 5.2 : 4.8,
                            height: .82,
                          };
                        })
                    : hall.id === RATIONALISM_GALLERY_ID
                      ? orderedRooms.map((room) => {
                          const copy = RATIONALISM_ROOM_SIGN_COPY[
                            room.id as keyof typeof RATIONALISM_ROOM_SIGN_COPY
                          ];
                          if (!copy) throw new Error(`Gallery 16 has no visitor-facing orientation copy for ${room.id}.`);
                          const bounds = roomBounds.get(room.id)!;
                          return {
                            id: `${room.id}:room-sign`,
                            kind: room.id === 'rationalism-cartesian-foundations' ? 'entrance' as const : 'zone' as const,
                            title: copy.title,
                            kicker: copy.kicker,
                            subtitle: copy.subtitle,
                            position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
                            rotationY: Math.PI,
                            width: room.id === 'rationalism-cartesian-foundations' ? 5.2 : 4.8,
                            height: .82,
                          };
                        })
                    : hall.id === EMPIRICISM_GALLERY_ID
                      ? orderedRooms.map((room) => {
                          const copy = EMPIRICISM_ROOM_SIGN_COPY[
                            room.id as keyof typeof EMPIRICISM_ROOM_SIGN_COPY
                          ];
                          if (!copy) throw new Error(`Gallery 17 has no visitor-facing orientation copy for ${room.id}.`);
                          const bounds = roomBounds.get(room.id)!;
                          return {
                            id: `${room.id}:room-sign`,
                            kind: room.id === 'empiricism-locke-ideas-rights' ? 'entrance' as const : 'zone' as const,
                            title: copy.title,
                            kicker: copy.kicker,
                            subtitle: copy.subtitle,
                            position: {x: 0, y: 4.55, z: bounds.maxZ - .22},
                            rotationY: Math.PI,
                            width: room.id === 'empiricism-locke-ideas-rights' ? 5.2 : 4.8,
                            height: .82,
                          };
                        })
                    : hall.id === ENLIGHTENMENT_GALLERY_ID
                      ? [
                          {
                            id: `${hall.id}:entrance-sign`,
                            kind: 'entrance' as const,
                            title: hall.title,
                            kicker: 'Gallery 18 · Four arguments, one critical threshold',
                            subtitle: hall.period,
                            position: {x: 14.22, y: 4.7, z: 0},
                            rotationY: Math.PI / 2,
                            width: 4.2,
                            height: .72,
                          },
                          ...orderedRooms.map((room) => {
                            const copy = ENLIGHTENMENT_ROOM_SIGN_COPY[
                              room.id as keyof typeof ENLIGHTENMENT_ROOM_SIGN_COPY
                            ];
                            if (!copy) throw new Error(`Gallery 18 has no visitor-facing orientation copy for ${room.id}.`);
                            const placement = room.id === 'enlightenment-law-institutions'
                              ? {x: 0, y: 5.2, z: -13.78, rotationY: 0}
                              : room.id === 'enlightenment-society-freedom'
                                ? {x: 13.78, y: 4.7, z: 0, rotationY: -Math.PI / 2}
                                : room.id === 'enlightenment-sentiment-commerce'
                                  ? {x: 0, y: 5.2, z: 13.78, rotationY: Math.PI}
                                  : room.id === 'enlightenment-equality-education'
                                    ? {x: -13.78, y: 4.7, z: 0, rotationY: Math.PI / 2}
                                    : {x: 0, y: 5.2, z: -2.6, rotationY: 0};
                            return {
                              id: `${room.id}:room-sign`,
                              kind: 'zone' as const,
                              title: copy.title,
                              kicker: copy.kicker,
                              subtitle: copy.subtitle,
                              position: {x: placement.x, y: placement.y, z: placement.z},
                              rotationY: placement.rotationY,
                              width: room.id === 'enlightenment-kant-critical' ? 4.35 : 4,
                              height: .72,
                            };
                          }),
                        ]
              : hall.id === CORE_QUESTIONS_FORUM_ID
                ? coreQuestionsForumSigns()
                : standardSigns;
  const signs = promotedSequenceSigns ?? establishedSigns;
  const guidedOrder = orderedRooms.flatMap((room) => room.exhibits.map(({id}) => id as MuseumExhibitId));
  const entryRoomIdByEntrance = new Map<string, string>();
  const entryExhibitIdsByEntrance = Object.fromEntries(node.doorwaySlots.map((slot) => {
    const nearestRoom = cells.reduce((nearest, cell) => {
      const center = {x: (cell.bounds.minX + cell.bounds.maxX) / 2, z: (cell.bounds.minZ + cell.bounds.maxZ) / 2};
      const distance = Math.hypot(center.x - slot.position.x, center.z - slot.position.z);
      return !nearest || distance < nearest.distance ? {cell, distance} : nearest;
    }, undefined as {cell: MuseumSpatialCell; distance: number} | undefined)!.cell;
    entryRoomIdByEntrance.set(slot.id, nearestRoom.id);
    return [slot.id, nearestRoom.exhibitIds.slice(0, 2)] as const;
  }));
  const entrySceneAssetIdsByEntrance = Object.fromEntries(Object.entries(entryExhibitIdsByEntrance).map(([entranceId, entryIds]) => {
    const ids = new Set(entryIds);
    const roomId = entryRoomIdByEntrance.get(entranceId);
    return [entranceId, [...new Set([
      ...exhibits
        .filter(({id}) => ids.has(id))
        .flatMap(({scene}) => scene.mediaMounts.map(({assetId}) => assetId)),
      ...supplementalExhibits
        .filter(({spatialCellId}) => spatialCellId === roomId)
        .map(({assetId}) => assetId),
    ])]];
  }));
  const allSceneAssetIds = [...new Set([
    ...exhibits.flatMap(({scene}) => scene.mediaMounts.map(({assetId}) => assetId)),
    ...supplementalExhibits.map(({assetId}) => assetId),
  ])];
  const entrySceneAssetIds = [...new Set(Object.values(entrySceneAssetIdsByEntrance).flat())];
  return {
    id: hall.id,
    fallbackLabel: hall.title,
    ...(hall.id === EMPIRICISM_GALLERY_ID
      ? {architectureOnlyWalls: empiricismInteriorLintels()}
      : hall.id === ENLIGHTENMENT_GALLERY_ID
        ? {architectureOnlyWalls: enlightenmentInteriorLintels()}
      : hall.id === GERMAN_IDEALISM_GALLERY_ID
        ? {architectureOnlyWalls: germanIdealismInteriorLintels()}
      : hall.id === UTILITY_LIBERTY_CAPITAL_GALLERY_ID
        ? {architectureOnlyWalls: utilityLibertyCapitalInteriorLintels()}
      : hall.id === FAITH_PESSIMISM_VALUE_GALLERY_ID
        ? {architectureOnlyWalls: faithPessimismValueInteriorLintels()}
      : hall.id === PRAGMATISM_GALLERY_ID
        ? {architectureOnlyWalls: pragmatismInteriorLintels()}
      : hall.id === COLONIALISM_RACE_LIBERATION_GALLERY_ID
        ? {architectureOnlyWalls: colonialismRaceLiberationInteriorLintels()}
        : {}),
    prefetch: {entryExhibitIdsByEntrance, entrySceneAssetIdsByEntrance, entrySceneAssetIds, sceneAssetIds: allSceneAssetIds},
    layout: {
      id: hall.id,
      title: hall.title,
      eyeHeight: EYE_HEIGHT,
      playerRadius: .34,
      bounds: {minX: -width / 2, maxX: width / 2, minZ: -depth / 2, maxZ: depth / 2},
      floorArea: width * depth,
      cameraFov: 66,
      cameraFar: 260,
      spawn,
      spawnFocalPoint: hall.id === MEDITERRANEAN_GALLERY_ID
        ? {...MEDITERRANEAN_ORIENTATION_DISPLAY.center}
        : hall.id === RENAISSANCE_GALLERY_ID
          ? {...RENAISSANCE_EXHIBIT_CURATION.machiavelli.authored}
          : {x: 0, z: 0},
      reset: spawn,
      spatialCells: cells,
      spatialConnections,
      entryViews: cells.map((cell) => {
        const firstPrimary = isCrossroads
          || hall.id === CLASSICAL_SOUTH_ASIAN_GALLERY_ID
          || hall.id === BUDDHIST_GALLERY_ID
          || hall.id === ISLAMIC_GALLERY_ID
          || hall.id === EAST_ASIAN_GALLERY_ID
          || hall.id === JEWISH_GALLERY_ID
          || hall.id === LATE_ANTIQUITY_GALLERY_ID
          || hall.id === LATIN_SCHOLASTIC_GALLERY_ID
          || hall.id === RATIONALISM_GALLERY_ID
          || hall.id === EMPIRICISM_GALLERY_ID
          || hall.id === GERMAN_IDEALISM_GALLERY_ID
          || hall.id === UTILITY_LIBERTY_CAPITAL_GALLERY_ID
          || hall.id === FAITH_PESSIMISM_VALUE_GALLERY_ID
          || hall.id === PRAGMATISM_GALLERY_ID
          ? exhibits.find(({spatialCellId}) => spatialCellId === cell.id)
          : undefined;
        const authoredEntryPose = isClassicalChineseCrossroads
          ? CLASSICAL_CHINESE_ROOM_ENTRY_POSES[
              cell.id as keyof typeof CLASSICAL_CHINESE_ROOM_ENTRY_POSES
            ]
          : isHellenisticRomanCrossroads
            ? HELLENISTIC_ROMAN_ROOM_ENTRY_POSES[
                cell.id as keyof typeof HELLENISTIC_ROMAN_ROOM_ENTRY_POSES
              ]
          : isCritiquePowerDeconstructionCrossroads
            ? CRITIQUE_POWER_DECONSTRUCTION_ROOM_ENTRY_POSES[
                cell.id as keyof typeof CRITIQUE_POWER_DECONSTRUCTION_ROOM_ENTRY_POSES
              ]
          : isMoralLifePracticalReasonCrossroads
            ? MORAL_LIFE_PRACTICAL_REASON_ROOM_ENTRY_POSES[
                cell.id as keyof typeof MORAL_LIFE_PRACTICAL_REASON_ROOM_ENTRY_POSES
              ]
          : hall.id === ISLAMIC_GALLERY_ID
            ? ISLAMIC_ROOM_ENTRY_POSES[
                cell.id as keyof typeof ISLAMIC_ROOM_ENTRY_POSES
              ]
          : hall.id === EAST_ASIAN_GALLERY_ID
            ? EAST_ASIAN_ROOM_ENTRY_POSES[
                cell.id as keyof typeof EAST_ASIAN_ROOM_ENTRY_POSES
              ]
          : hall.id === JEWISH_GALLERY_ID
            ? JEWISH_ROOM_ENTRY_POSES[
                cell.id as keyof typeof JEWISH_ROOM_ENTRY_POSES
              ]
          : hall.id === LATE_ANTIQUITY_GALLERY_ID
            ? LATE_ANTIQUITY_ROOM_ENTRY_POSES[
                cell.id as keyof typeof LATE_ANTIQUITY_ROOM_ENTRY_POSES
              ]
          : hall.id === LATIN_SCHOLASTIC_GALLERY_ID
            ? LATIN_SCHOLASTIC_ROOM_ENTRY_POSES[
                cell.id as keyof typeof LATIN_SCHOLASTIC_ROOM_ENTRY_POSES
              ]
          : hall.id === RATIONALISM_GALLERY_ID
            ? RATIONALISM_ROOM_ENTRY_POSES[
                cell.id as keyof typeof RATIONALISM_ROOM_ENTRY_POSES
              ]
          : hall.id === EMPIRICISM_GALLERY_ID
            ? EMPIRICISM_ROOM_ENTRY_POSES[
                cell.id as keyof typeof EMPIRICISM_ROOM_ENTRY_POSES
              ]
          : hall.id === ENLIGHTENMENT_GALLERY_ID
            ? ENLIGHTENMENT_ROOM_ENTRY_POSES[
                cell.id as keyof typeof ENLIGHTENMENT_ROOM_ENTRY_POSES
              ]
          : hall.id === GERMAN_IDEALISM_GALLERY_ID
            ? GERMAN_IDEALISM_ROOM_ENTRY_POSES[
                cell.id as keyof typeof GERMAN_IDEALISM_ROOM_ENTRY_POSES
              ]
          : hall.id === UTILITY_LIBERTY_CAPITAL_GALLERY_ID
            ? UTILITY_LIBERTY_CAPITAL_ROOM_ENTRY_POSES[
                cell.id as keyof typeof UTILITY_LIBERTY_CAPITAL_ROOM_ENTRY_POSES
              ]
          : hall.id === FAITH_PESSIMISM_VALUE_GALLERY_ID
            ? FAITH_PESSIMISM_VALUE_ROOM_ENTRY_POSES[
                cell.id as keyof typeof FAITH_PESSIMISM_VALUE_ROOM_ENTRY_POSES
              ]
          : hall.id === PRAGMATISM_GALLERY_ID
            ? PRAGMATISM_ROOM_ENTRY_POSES[
                cell.id as keyof typeof PRAGMATISM_ROOM_ENTRY_POSES
              ]
          : hall.id === COLONIALISM_RACE_LIBERATION_GALLERY_ID
            ? COLONIALISM_RACE_LIBERATION_ROOM_ENTRY_POSES[
                cell.id as keyof typeof COLONIALISM_RACE_LIBERATION_ROOM_ENTRY_POSES
              ]
          : isCoreForum
            ? CORE_QUESTIONS_FORUM_ROOM_ENTRY_POSES[cell.id]
            : undefined;
        return {
          spatialCellId: cell.id,
          // Gallery 01 is read as a chronological promenade. Stage its directory
          // views just inside each threshold so the visitor sees the room unfold
          // in the same direction as the authored route. Forum views prioritize
          // the first primary installation so partitions never become the room's
          // accidental focal point. Gallery 09 likewise uses authored room
          // approaches so the open cross never makes a secondary the first read.
          // Gallery 10 stages all three walls of the west half-room together.
          pose: authoredEntryPose
            ?? firstPrimary?.viewpoint
            ?? (hall.id === MEDITERRANEAN_GALLERY_ID || hall.id === RENAISSANCE_GALLERY_ID
              ? {x: 0, z: cell.bounds.minZ + .8, yaw: Math.PI, pitch: -.01}
              : {x: Math.max(cell.bounds.minX + 2.8, Math.min(cell.bounds.maxX - 2.8, 0)), z: (cell.bounds.minZ + cell.bounds.maxZ) / 2, yaw: Math.PI, pitch: 0}),
          expectedVisibleExhibitIds: cell.exhibitIds,
        };
      }),
      wallColliders,
      furnishings,
      obstacleColliders,
      exhibits,
      ...(supplementalExhibits.length ? {supplementalExhibits} : {}),
      primaryCirculation: isClassicalChineseCrossroads
        ? CLASSICAL_CHINESE_PRIMARY_CIRCULATION
        : isHellenisticRomanCrossroads
          ? HELLENISTIC_ROMAN_PRIMARY_CIRCULATION
        : isCritiquePowerDeconstructionCrossroads
          ? CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_CIRCULATION
        : isMoralLifePracticalReasonCrossroads
          ? MORAL_LIFE_PRACTICAL_REASON_PRIMARY_CIRCULATION
        : isEnlightenmentCrossroads
          ? ENLIGHTENMENT_PRIMARY_CIRCULATION
        : {
            id: `${hall.id}:primary-circulation`,
            points: isCoreForum
              ? CORE_QUESTIONS_FORUM_PRIMARY_CIRCULATION
              : hall.id === BUDDHIST_GALLERY_ID
                ? [{x: 0, z: -26}, {x: 0, z: 0}, {x: 0, z: 24.4}]
                : [{x: 0, z: -depth / 2 + 2}, {x: 0, z: 0}, {x: 0, z: depth / 2 - 2}],
            clearanceRadius: isCoreForum ? .62 : 1.25,
          },
      guidedOrder,
      guidedWalkLegs,
      lighting: {
        ambientIntensity: isCrossroads ? .5 : .46,
        hemisphereIntensity: isCrossroads ? .68 : .62,
        directionalIntensity: .72,
        tracks,
        exhibitLights,
      },
      signs,
    },
  };
};

/** One data-driven authoring pipeline for every permanent, canonical hall. */
export const CANONICAL_MUSEUM_HALL_DEFINITIONS: readonly MuseumCanonicalHallContentDefinition[] =
  MUSEUM_CANONICAL_PROGRAM.map(createCanonicalHall);
