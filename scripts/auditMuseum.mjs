import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync} from 'node:fs';
import {dirname, extname, resolve} from 'node:path';
import {performance} from 'node:perf_hooks';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const MUSEUM_MODULE_INITIALIZATION_BUDGET_MS = 2_000;
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const galleryRoot = resolve(repoRoot, 'src/components/MuseumGallery');
const museumDataRoot = resolve(repoRoot, 'src/data/museum');
const buildingManifest = JSON.parse(readFileSync(resolve(museumDataRoot, 'museumContinuousEnfiladeManifest.json'), 'utf8'));
const masterplanProgram = JSON.parse(readFileSync(resolve(repoRoot, 'docs/museum-masterplan/hall-program.json'), 'utf8'));
const singleLevelPlan = JSON.parse(readFileSync(resolve(repoRoot, 'docs/museum-masterplan/single-level-building-plan.json'), 'utf8'));
const source = (file) => readFileSync(resolve(repoRoot, file), 'utf8');
const exhibitWallStandardSource = source('docs/museum-masterplan/exhibit-wall-standard.md');
const registrySource = source('src/components/MuseumGallery/museumWorldRegistry.ts');
const museumPageSource = source('src/components/MuseumGallery/MuseumPage.tsx');
const museumWorldSource = source('src/components/MuseumGallery/MuseumWorldScene.tsx');
const museumControlsSource = source('src/components/MuseumGallery/useMuseumControls.ts');
const museumModalSource = source('src/components/MuseumGallery/MuseumModal.tsx');
const architectureSource = source('src/components/MuseumGallery/ContemporaryHallArchitecture.tsx');
const buildingArchitectureSource = source('src/components/MuseumGallery/MuseumBuildingArchitecture.tsx');
const grandEntranceArchitectureSource = source('src/components/MuseumGallery/MuseumGrandEntranceArchitecture.tsx');
const canonicalSceneSource = source('src/components/MuseumGallery/CanonicalMuseumHallScene.tsx');
const canonicalExhibitsSource = source('src/components/MuseumGallery/CanonicalMuseumExhibits.tsx');
const mediterraneanMediaSource = source('src/components/MuseumGallery/MediterraneanExhibitMedia.tsx');
const mediterraneanCurationSource = source('src/components/MuseumGallery/MediterraneanGalleryCuration.tsx');
const platoSupplementalDataSource = source('src/data/museum/platoSupplementalExhibits.ts');
const platoSupplementalSceneSource = source('src/components/MuseumGallery/PlatoSupplementalExhibits.tsx');
const phenomenologySupplementalDataSource = source('src/data/museum/phenomenologySupplementalExhibits.ts');
const phenomenologySupplementalSceneSource = source('src/components/MuseumGallery/PhenomenologySupplementalExhibits.tsx');
const analyticSupplementalDataSource = source('src/data/museum/analyticSupplementalExhibits.ts');
const analyticSupplementalScenePath = 'src/components/MuseumGallery/AnalyticSupplementalExhibits.tsx';
const analyticSupplementalSceneSource = existsSync(resolve(repoRoot, analyticSupplementalScenePath))
  ? source(analyticSupplementalScenePath)
  : undefined;
const justiceSupplementalDataSource = source('src/data/museum/justiceSupplementalExhibits.ts');
const justiceSupplementalSceneSource = source('src/components/MuseumGallery/JusticeSupplementalExhibits.tsx');
const classicalSouthAsianSupplementalDataSource = source('src/data/museum/classicalSouthAsianSupplementalExhibits.ts');
const classicalSouthAsianSupplementalSceneSource = source('src/components/MuseumGallery/ClassicalSouthAsianSupplementalExhibits.tsx');
const buddhistSupplementalDataSource = source('src/data/museum/buddhistSupplementalExhibits.ts');
const buddhistSupplementalSceneSource = source('src/components/MuseumGallery/BuddhistSupplementalExhibits.tsx');
const classicalChineseSupplementalDataSource = source('src/data/museum/classicalChineseSupplementalExhibits.ts');
const classicalChineseSupplementalSceneSource = source('src/components/MuseumGallery/ClassicalChineseSupplementalExhibits.tsx');
const islamicSupplementalDataSource = source('src/data/museum/islamicSupplementalExhibits.ts');
const islamicSupplementalSceneSource = source('src/components/MuseumGallery/IslamicSupplementalExhibits.tsx');
const eastAsianSupplementalDataSource = source('src/data/museum/eastAsianSupplementalExhibits.ts');
const eastAsianSupplementalSceneSource = source('src/components/MuseumGallery/EastAsianSupplementalExhibits.tsx');
const jewishSupplementalDataSource = source('src/data/museum/jewishSupplementalExhibits.ts');
const jewishSupplementalSceneSource = source('src/components/MuseumGallery/JewishSupplementalExhibits.tsx');
const latinScholasticSupplementalDataSource = source('src/data/museum/latinChristianScholasticSupplementalExhibits.ts');
const hellenisticRomanSupplementalDataSource = source('src/data/museum/hellenisticRomanSupplementalExhibits.ts');
const lateAntiquitySupplementalDataSource = source('src/data/museum/lateAntiquitySupplementalExhibits.ts');
const rationalismSupplementalDataSource = source('src/data/museum/rationalismSupplementalExhibits.ts');
const empiricismSupplementalDataSource = source('src/data/museum/empiricismSupplementalExhibits.ts');
const enlightenmentSupplementalDataSource = source('src/data/museum/enlightenmentSupplementalExhibits.ts');
const utilityLibertyCapitalSupplementalDataSource = source('src/data/museum/utilityLibertyCapitalSupplementalExhibits.ts');
const faithPessimismValueSupplementalDataSource = source('src/data/museum/faithPessimismValueSupplementalExhibits.ts');
const germanIdealismSupplementalDataSource = source('src/data/museum/germanIdealismSupplementalExhibits.ts');
const pragmatismSupplementalDataSource = source('src/data/museum/pragmatismSupplementalExhibits.ts');
const critiquePowerDeconstructionCurationSource = source('src/data/museum/critiquePowerDeconstructionGalleryCuration.ts');
const critiquePowerDeconstructionSupplementalDataSource = source('src/data/museum/critiquePowerDeconstructionSupplementalExhibits.ts');
const moralLifePracticalReasonCurationSource = source('src/data/museum/moralLifePracticalReasonGalleryCuration.ts');
const moralLifePracticalReasonSupplementalDataSource = source('src/data/museum/moralLifePracticalReasonSupplementalExhibits.ts');
const colonialismRaceLiberationCurationSource = source('src/data/museum/colonialismRaceLiberationGalleryCuration.ts');
const colonialismRaceLiberationSupplementalDataSource = source('src/data/museum/colonialismRaceLiberationSupplementalExhibits.ts');
const successorSupplementalSceneSource = source('src/components/MuseumGallery/SuccessorGallerySupplementalExhibits.tsx');
const supplementalCollectionSceneSource = source('src/components/MuseumGallery/MuseumSupplementalExhibitCollection.tsx');
const forumSupplementalDataSource = source('src/data/museum/coreQuestionsForumSupplementalExhibits.ts');
const forumSupplementalSceneSource = source('src/components/MuseumGallery/CoreQuestionsForumSupplementalExhibits.tsx');
const supplementalPanelSource = source('src/components/MuseumGallery/MuseumSupplementalInterpretationPanel.tsx');
const interpretationPanelSource = source('src/components/MuseumGallery/MuseumInterpretationPanel.tsx');
const globalSearchSource = source('src/components/Search/GlobalSearch.tsx');
const hashRouterSource = source('src/routing/hashRouter.ts');
const visitorMapSource = source('src/components/MuseumGallery/MuseumVisitorMap.tsx');
const compatibilitySource = source('src/components/MuseumGallery/MuseumCompatibilityPage.tsx');
const museumCssSource = source('src/components/MuseumGallery/museum.css');
const virtualEntry = 'virtual:philosophy-atlas-canonical-museum-audit';
const resolvedEntry = `\0${virtualEntry}`;

const result = await build({
  root: repoRoot,
  configFile: false,
  logLevel: 'silent',
  plugins: [{
    name: 'canonical-museum-audit-entry',
    resolveId: (id) => id === virtualEntry ? resolvedEntry : undefined,
    load: (id) => id === resolvedEntry ? `
      export * from '/src/data/museumCatalog.ts';
      export * from '/src/data/museum/museumBuildingManifest.ts';
      export * from '/src/data/museum/museumBuildingRuntime.ts';
      export * from '/src/data/museum/museumHallTemplates.ts';
      export * from '/src/data/museum/museumArchitectureMaterials.ts';
      export * from '/src/data/museum/mediterraneanGalleryCuration.ts';
      export * from '/src/data/museum/museumVisitorMap.ts';
      export * from '/src/data/museum/museumVisitorMapProjection.ts';
      export * from '/src/data/museum/museumAssets.ts';
      export * from '/src/data/museum/museumTextureBudget.ts';
      export * from '/src/data/museum/museumTexturePolicy.ts';
      export * from '/src/data/museum/museumInterpretations.ts';
      export * from '/src/data/museum/platoSupplementalExhibits.ts';
      export * from '/src/data/museum/analyticSupplementalExhibits.ts';
      export * from '/src/data/museum/justiceGalleryCuration.ts';
      export * from '/src/data/museum/justiceSupplementalExhibits.ts';
      export * from '/src/data/museum/classicalSouthAsianGalleryCuration.ts';
      export * from '/src/data/museum/classicalSouthAsianSupplementalExhibits.ts';
      export * from '/src/data/museum/buddhistGalleryCuration.ts';
      export * from '/src/data/museum/buddhistSupplementalExhibits.ts';
      export * from '/src/data/museum/classicalChineseGalleryCuration.ts';
      export * from '/src/data/museum/classicalChineseSupplementalExhibits.ts';
      export * from '/src/data/museum/islamicGalleryCuration.ts';
      export * from '/src/data/museum/islamicSupplementalExhibits.ts';
      export * from '/src/data/museum/eastAsianGalleryCuration.ts';
      export * from '/src/data/museum/eastAsianSupplementalExhibits.ts';
      export * from '/src/data/museum/jewishGalleryCuration.ts';
      export * from '/src/data/museum/jewishSupplementalExhibits.ts';
      export * from '/src/data/museum/latinChristianScholasticGalleryCuration.ts';
      export * from '/src/data/museum/latinChristianScholasticSupplementalExhibits.ts';
      export * from '/src/data/museum/hellenisticRomanGalleryCuration.ts';
      export * from '/src/data/museum/hellenisticRomanSupplementalExhibits.ts';
      export * from '/src/data/museum/lateAntiquityGalleryCuration.ts';
      export * from '/src/data/museum/lateAntiquitySupplementalExhibits.ts';
      export * from '/src/data/museum/rationalismGalleryCuration.ts';
      export * from '/src/data/museum/rationalismSupplementalExhibits.ts';
      export * from '/src/data/museum/empiricismGalleryCuration.ts';
      export * from '/src/data/museum/empiricismSupplementalExhibits.ts';
      export * from '/src/data/museum/enlightenmentGalleryCuration.ts';
      export * from '/src/data/museum/enlightenmentSupplementalExhibits.ts';
      export * from '/src/data/museum/utilityLibertyCapitalGalleryCuration.ts';
      export * from '/src/data/museum/utilityLibertyCapitalSupplementalExhibits.ts';
      export * from '/src/data/museum/faithPessimismValueGalleryCuration.ts';
      export * from '/src/data/museum/faithPessimismValueSupplementalExhibits.ts';
      export * from '/src/data/museum/germanIdealismGalleryCuration.ts';
      export * from '/src/data/museum/germanIdealismSupplementalExhibits.ts';
      export * from '/src/data/museum/pragmatismGalleryCuration.ts';
      export * from '/src/data/museum/pragmatismSupplementalExhibits.ts';
      export * from '/src/data/museum/critiquePowerDeconstructionGalleryCuration.ts';
      export * from '/src/data/museum/critiquePowerDeconstructionSupplementalExhibits.ts';
      export * from '/src/data/museum/moralLifePracticalReasonGalleryCuration.ts';
      export * from '/src/data/museum/moralLifePracticalReasonSupplementalExhibits.ts';
      export * from '/src/data/museum/colonialismRaceLiberationGalleryCuration.ts';
      export * from '/src/data/museum/colonialismRaceLiberationSupplementalExhibits.ts';
      export * from '/src/data/museum/coreQuestionsForumCuration.ts';
      export * from '/src/data/museum/coreQuestionsForumSupplementalExhibits.ts';
      export * from '/src/data/museum/museumSupplementalExhibits.ts';
      export * from '/src/components/MuseumGallery/museumMovement.ts';
      export * from '/src/components/MuseumGallery/museumResidency.ts';
      export * from '/src/components/MuseumGallery/museumSession.ts';
      export * from '/src/components/MuseumGallery/museumRouteSync.ts';
      export * from '/src/components/MuseumGallery/museumVisitState.ts';
      export * from '/src/components/MuseumGallery/museumWorldTransform.ts';
      export * from '/src/components/MuseumGallery/museumHallTransitions.ts';
      export * from '/src/components/MuseumGallery/museumRuntime.ts';
      export {branches} from '/src/data/branches.ts';
      export {philosophers} from '/src/data/philosophers.ts';
    ` : undefined,
  }],
  build: {
    ssr: true,
    write: false,
    minify: false,
    target: 'node18',
    rollupOptions: {input: virtualEntry, output: {format: 'es', codeSplitting: false}},
  },
});

const outputs = (Array.isArray(result) ? result : [result]).flatMap(({output}) => output);
const entry = outputs.find((item) => item.type === 'chunk' && item.isEntry);
assert(entry, 'Vite did not produce an executable canonical Museum audit entry.');
const museumModuleInitializationStartedAt = performance.now();
let museum;
try {
  museum = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`);
} catch (error) {
  console.error(`Museum audit module initialization failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
const museumModuleInitializationMs = performance.now() - museumModuleInitializationStartedAt;

const {
  ANALYTIC_SUPPLEMENTAL_EXHIBITS,
  ANALYTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  BUDDHIST_GALLERY_ID,
  BUDDHIST_PRIMARY_PLACEMENTS,
  BUDDHIST_ROOM_SIGN_COPY,
  BUDDHIST_SUPPLEMENTAL_EXHIBITS,
  BUDDHIST_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  CLASSICAL_CHINESE_CURATION_VALIDATION,
  CLASSICAL_CHINESE_GALLERY_ID,
  CLASSICAL_CHINESE_HALL_DIMENSIONS,
  CLASSICAL_CHINESE_INSTALLATION_SLOTS,
  CLASSICAL_CHINESE_PRIMARY_CIRCULATION,
  CLASSICAL_CHINESE_PRIMARY_PLACEMENTS,
  CLASSICAL_CHINESE_PRIMARY_SCALE_FLOOR,
  CLASSICAL_CHINESE_ROOM_BOUNDS,
  CLASSICAL_CHINESE_ROOM_ENTRY_POSES,
  CLASSICAL_CHINESE_ROOM_ORDER,
  CLASSICAL_CHINESE_SPATIAL_CONNECTIONS,
  CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBITS,
  CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  classicalChineseInteriorWalls,
  EAST_ASIAN_GALLERY_ID,
  EAST_ASIAN_PRIMARY_PLACEMENTS,
  EAST_ASIAN_ROOM_ENTRY_POSES,
  EAST_ASIAN_ROOM_SIGN_COPY,
  EAST_ASIAN_SUPPLEMENTAL_EXHIBITS,
  EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  ISLAMIC_GALLERY_ID,
  ISLAMIC_PRIMARY_PLACEMENTS,
  ISLAMIC_ROOM_SIGN_COPY,
  ISLAMIC_SUPPLEMENTAL_EXHIBITS,
  ISLAMIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  JEWISH_GALLERY_ID,
  JEWISH_PRIMARY_PLACEMENTS,
  JEWISH_ROOM_ENTRY_POSES,
  JEWISH_ROOM_SIGN_COPY,
  JEWISH_SUPPLEMENTAL_EXHIBITS,
  JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  LATIN_SCHOLASTIC_GALLERY_ID,
  LATIN_SCHOLASTIC_PRIMARY_PLACEMENTS,
  LATIN_SCHOLASTIC_ROOM_ENTRY_POSES,
  LATIN_SCHOLASTIC_ROOM_SIGN_COPY,
  LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBITS,
  LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  HELLENISTIC_ROMAN_CURATION_VALIDATION,
  HELLENISTIC_ROMAN_GALLERY_ID,
  HELLENISTIC_ROMAN_HALL_DIMENSIONS,
  HELLENISTIC_ROMAN_INSTALLATION_SLOTS,
  HELLENISTIC_ROMAN_PRIMARY_CIRCULATION,
  HELLENISTIC_ROMAN_PRIMARY_PLACEMENTS,
  HELLENISTIC_ROMAN_ROOM_BOUNDS,
  HELLENISTIC_ROMAN_ROOM_ENTRY_POSES,
  HELLENISTIC_ROMAN_ROOM_ORDER,
  HELLENISTIC_ROMAN_ROOM_SIGN_COPY,
  HELLENISTIC_ROMAN_SPATIAL_CONNECTIONS,
  HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBITS,
  HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  hellenisticRomanInteriorWalls,
  LATE_ANTIQUITY_GALLERY_ID,
  LATE_ANTIQUITY_PRIMARY_PLACEMENTS,
  LATE_ANTIQUITY_ROOM_ENTRY_POSES,
  LATE_ANTIQUITY_ROOM_SIGN_COPY,
  LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBITS,
  LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  RATIONALISM_GALLERY_ID,
  RATIONALISM_PRIMARY_PLACEMENTS,
  RATIONALISM_ROOM_ENTRY_POSES,
  RATIONALISM_ROOM_SIGN_COPY,
  RATIONALISM_SUPPLEMENTAL_EXHIBITS,
  RATIONALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  EMPIRICISM_GALLERY_ID,
  EMPIRICISM_HALL_DIMENSIONS,
  EMPIRICISM_PRIMARY_PLACEMENTS,
  EMPIRICISM_ROOM_ENTRY_POSES,
  EMPIRICISM_ROOM_SIGN_COPY,
  EMPIRICISM_SUPPLEMENTAL_EXHIBITS,
  EMPIRICISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  empiricismInteriorLintels,
  ENLIGHTENMENT_CURATION_VALIDATION,
  ENLIGHTENMENT_GALLERY_ID,
  ENLIGHTENMENT_HALL_DIMENSIONS,
  ENLIGHTENMENT_INSTALLATION_SLOTS,
  ENLIGHTENMENT_PRIMARY_CIRCULATION,
  ENLIGHTENMENT_PRIMARY_PLACEMENTS,
  ENLIGHTENMENT_PRIMARY_SCALE_FLOOR,
  ENLIGHTENMENT_ROOM_BOUNDS,
  ENLIGHTENMENT_ROOM_ENTRY_POSES,
  ENLIGHTENMENT_ROOM_ORDER,
  ENLIGHTENMENT_ROOM_SIGN_COPY,
  ENLIGHTENMENT_SPATIAL_CONNECTIONS,
  ENLIGHTENMENT_SUPPLEMENTAL_EXHIBITS,
  ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  enlightenmentInteriorLintels,
  enlightenmentInteriorWalls,
  enlightenmentKantBaffle,
  UTILITY_LIBERTY_CAPITAL_GALLERY_ID,
  UTILITY_LIBERTY_CAPITAL_HALL_DIMENSIONS,
  UTILITY_LIBERTY_CAPITAL_PRIMARY_PLACEMENTS,
  UTILITY_LIBERTY_CAPITAL_ROOM_ENTRY_POSES,
  UTILITY_LIBERTY_CAPITAL_ROOM_SIGN_COPY,
  UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBITS,
  UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  utilityLibertyCapitalInteriorLintels,
  FAITH_PESSIMISM_VALUE_GALLERY_ID,
  FAITH_PESSIMISM_VALUE_HALL_DIMENSIONS,
  FAITH_PESSIMISM_VALUE_PRIMARY_PLACEMENTS,
  FAITH_PESSIMISM_VALUE_ROOM_ENTRY_POSES,
  FAITH_PESSIMISM_VALUE_ROOM_SIGN_COPY,
  FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBITS,
  FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  faithPessimismValueInteriorLintels,
  GERMAN_IDEALISM_GALLERY_ID,
  GERMAN_IDEALISM_HALL_DIMENSIONS,
  GERMAN_IDEALISM_PRIMARY_PLACEMENTS,
  GERMAN_IDEALISM_ROOM_ENTRY_POSES,
  GERMAN_IDEALISM_ROOM_SIGN_COPY,
  GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBITS,
  GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  germanIdealismInteriorLintels,
  PRAGMATISM_GALLERY_ID,
  PRAGMATISM_HALL_DIMENSIONS,
  PRAGMATISM_PRIMARY_PLACEMENTS,
  PRAGMATISM_ROOM_ENTRY_POSES,
  PRAGMATISM_ROOM_SIGN_COPY,
  PRAGMATISM_SUPPLEMENTAL_EXHIBITS,
  PRAGMATISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  pragmatismInteriorLintels,
  CRITIQUE_POWER_DECONSTRUCTION_CURATION_VALIDATION,
  CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID,
  CRITIQUE_POWER_DECONSTRUCTION_HALL_DIMENSIONS,
  CRITIQUE_POWER_DECONSTRUCTION_INSTALLATION_SLOTS,
  CRITIQUE_POWER_DECONSTRUCTION_INSTALLS_PER_ROOM,
  CRITIQUE_POWER_DECONSTRUCTION_PHYSICAL_INSTALL_COUNT,
  CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_CIRCULATION,
  CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_PLACEMENTS,
  CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_SCALE_FLOOR,
  CRITIQUE_POWER_DECONSTRUCTION_ROOM_BOUNDS,
  CRITIQUE_POWER_DECONSTRUCTION_ROOM_ENTRY_POSES,
  CRITIQUE_POWER_DECONSTRUCTION_ROOM_ORDER,
  CRITIQUE_POWER_DECONSTRUCTION_ROOM_SIGN_COPY,
  CRITIQUE_POWER_DECONSTRUCTION_SPATIAL_CONNECTIONS,
  CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBITS,
  CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  critiquePowerDeconstructionInteriorWalls,
  getCritiquePowerDeconstructionSupplementalExhibit,
  MORAL_LIFE_PRACTICAL_REASON_CURATION_VALIDATION,
  MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID,
  MORAL_LIFE_PRACTICAL_REASON_HALL_DIMENSIONS,
  MORAL_LIFE_PRACTICAL_REASON_INSTALLATION_SLOTS,
  MORAL_LIFE_PRACTICAL_REASON_INSTALLS_PER_ROOM,
  MORAL_LIFE_PRACTICAL_REASON_PHYSICAL_INSTALL_COUNT,
  MORAL_LIFE_PRACTICAL_REASON_PRIMARY_CIRCULATION,
  MORAL_LIFE_PRACTICAL_REASON_PRIMARY_PLACEMENTS,
  MORAL_LIFE_PRACTICAL_REASON_PRIMARY_SCALE_FLOOR,
  MORAL_LIFE_PRACTICAL_REASON_ROOM_BOUNDS,
  MORAL_LIFE_PRACTICAL_REASON_ROOM_ENTRY_POSES,
  MORAL_LIFE_PRACTICAL_REASON_ROOM_ORDER,
  MORAL_LIFE_PRACTICAL_REASON_ROOM_SIGN_COPY,
  MORAL_LIFE_PRACTICAL_REASON_SPATIAL_CONNECTIONS,
  MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBITS,
  MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  getMoralLifePracticalReasonSupplementalExhibit,
  moralLifePracticalReasonInteriorWalls,
  COLONIALISM_RACE_LIBERATION_CONTEXTUAL_ANCHOR_PLACEMENTS,
  COLONIALISM_RACE_LIBERATION_GALLERY_ID,
  COLONIALISM_RACE_LIBERATION_HALL_DIMENSIONS,
  COLONIALISM_RACE_LIBERATION_PRIMARY_PLACEMENTS,
  COLONIALISM_RACE_LIBERATION_ROOM_ENTRY_POSES,
  COLONIALISM_RACE_LIBERATION_ROOM_SIGN_COPY,
  COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBITS,
  COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  colonialismRaceLiberationInteriorLintels,
  getColonialismRaceLiberationSupplementalExhibit,
  CLASSICAL_SOUTH_ASIAN_GALLERY_ID,
  CLASSICAL_SOUTH_ASIAN_PRIMARY_PLACEMENTS,
  CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBITS,
  CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  CORE_QUESTIONS_FORUM_PHYSICAL_LENS_IDS,
  CORE_QUESTIONS_FORUM_PRIMARY_PLACEMENTS,
  CORE_QUESTIONS_FORUM_SUPPLEMENTAL_EXHIBITS,
  CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS,
  MUSEUM_ASSETS,
  MUSEUM_BUILDING_MANIFEST,
  MUSEUM_CANONICAL_WALL_MATERIAL,
  MUSEUM_CANONICAL_PROGRAM,
  MUSEUM_DECODED_TEXTURE_BUDGET_BYTES,
  MUSEUM_DECODED_TEXTURE_BUDGET_MIB,
  MUSEUM_DIRECTED_CONNECTIONS,
  MUSEUM_FAST_WALK_SPEED,
  MUSEUM_HALLS,
  MUSEUM_HALL_TEMPLATE_REGISTRY,
  MUSEUM_INTERPRETATIONS,
  museumInterpretationFacts,
  JUSTICE_GALLERY_ID,
  JUSTICE_PRIMARY_PLACEMENTS,
  JUSTICE_ROOM_SIGN_COPY,
  JUSTICE_SUPPLEMENTAL_EXHIBITS,
  JUSTICE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  MUSEUM_LEGACY_GEOMETRY_ADAPTERS,
  MUSEUM_LIVE_PROGRAM_TOTALS,
  MEDITERRANEAN_EXHIBIT_CURATION,
  MEDITERRANEAN_GALLERY_ID,
  MEDITERRANEAN_ORIENTATION_DISPLAY,
  MEDITERRANEAN_ROOM_SIGN_COPY,
  MUSEUM_PLANNED_HALL_TITLES,
  MUSEUM_OWNER_APPROVED_WALL_MATERIAL_EXCEPTIONS,
  MUSEUM_PERSISTENT_TEXTURE_ESTIMATE,
  MUSEUM_READINESS_PRESENTATIONS,
  MUSEUM_RUNTIME_NODES,
  MUSEUM_STANDARD_WALK_SPEED,
  MUSEUM_SUPPLEMENTAL_EXHIBITS,
  MUSEUM_VISITOR_MAP_DOORWAYS,
  MUSEUM_VISITOR_MAP_EDGES,
  MUSEUM_VISITOR_MAP_ENTRANCE,
  MUSEUM_VISITOR_MAP_KIOSK,
  MUSEUM_VISITOR_MAP_KIOSK_MARKER,
  MUSEUM_VISITOR_MAP_NODES,
  MUSEUM_VISITOR_MAP_NODE_PROJECTIONS,
  MUSEUM_VISITOR_MAP_PROJECTION,
  MUSEUM_VISITOR_MAP_RESERVATIONS,
  MUSEUM_VISITOR_MAP_CROSSCUT_INTERSECTIONS,
  MUSEUM_VISITOR_MAP_TURN_COURTS,
  MUSEUM_VISITOR_MAP_VIEWBOX,
  projectMuseumVisitorMapPoint,
  MUSEUM_WORLD_DEFINITIONS,
  PLATO_SUPPLEMENTAL_EXHIBITS,
  PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  advanceMuseumPhysicalFrame,
  branches,
  philosophers,
  circleIntersectsCollider,
  clampFrameDelta,
  createMuseumExhibitVisitContext,
  createMuseumHallTravelContext,
  createMuseumInputState,
  estimateMuseumHallTextureResidency,
  hasMuseumBrowserModifier,
  getMuseumGuidedStops,
  isValidMuseumPosition,
  legacyMuseumSessionStorageKey,
  loadMuseumLastVisit,
  loadMuseumSession,
  moveWithCollisions,
  museumSessionStorageKey,
  museumPointToWorld,
  museumPoseFromWorld,
  museumPoseToWorld,
  parseMuseumExhibitVisitContext,
  parseMuseumHallTravelContext,
  parseMuseumSession,
  positionInsideSpatialUnion,
  resolveMuseumHallRenderedReadinessKeys,
  resolveMuseumHallResidencyPlan,
  resolveMuseumWallMaterial,
  resolveMuseumOrientationReset,
  resolveMuseumReadinessGateGeometry,
  resolveMuseumReadinessGateStatus,
  resolveMuseumVisitorMapDestination,
  resolveMuseumWalkingSpeed,
  saveMuseumLastVisit,
  saveMuseumSession,
  sanitizeMuseumPose,
  shouldPreserveCommittedMuseumPose,
} = museum;

const HALL_IDS = [
  'mediterranean-beginnings-classical',
  'renaissance-humanism-new-method',
  'phenomenology-existence-embodiment',
  'analytic-traditions',
  'justice-democratic-reason',
  'core-questions-forum',
  'classical-south-asian-worlds',
  'buddhist-philosophies',
  'classical-chinese-traditions',
  'islamic-philosophical-worlds',
  'east-asian-continuities',
  'jewish-philosophy',
  'latin-christian-scholastic',
  'hellenistic-roman-ways',
  'late-antiquity-inheritance',
  'rationalism-mind-nature-system',
  'empiricism-science-political-order',
  'enlightenment-revolution-kant',
  'german-idealism-afterlives',
  'utility-liberty-history-capital',
  'faith-pessimism-life-value',
  'pragmatism-democratic-inquiry',
  'critique-power-deconstruction',
  'moral-life-practical-reason',
  'colonialism-race-liberation',
];
const LEGACY_HALL_IDS = [
  'ancient-greek',
  'renaissance-reason-revolution',
  'modernity-freedom-critique',
  'logic-language-science',
  'ethics-justice-political-life',
  'mind-consciousness-self',
];
const EXPECTED_COUNTS = {
  'mediterranean-beginnings-classical': {rooms: 4, exhibits: 22, template: 'sequence-3'},
  'renaissance-humanism-new-method': {rooms: 3, exhibits: 5, template: 'sequence-3'},
  'phenomenology-existence-embodiment': {rooms: 5, exhibits: 9, template: 'sequence-3'},
  'analytic-traditions': {rooms: 5, exhibits: 7, template: 'sequence-3'},
  'justice-democratic-reason': {rooms: 3, exhibits: 5, template: 'sequence-3'},
  'core-questions-forum': {rooms: 9, exhibits: 15, template: 'crossroads-4'},
  'classical-south-asian-worlds': {rooms: 5, exhibits: 9, template: 'sequence-3'},
  'buddhist-philosophies': {rooms: 5, exhibits: 7, template: 'sequence-3'},
  'classical-chinese-traditions': {rooms: 4, exhibits: 12, template: 'crossroads-4'},
  'islamic-philosophical-worlds': {rooms: 5, exhibits: 9, template: 'sequence-3'},
  'east-asian-continuities': {rooms: 3, exhibits: 2, template: 'sequence-3'},
  'jewish-philosophy': {rooms: 2, exhibits: 3, template: 'standard-rect'},
  'latin-christian-scholastic': {rooms: 4, exhibits: 10, template: 'sequence-3'},
  'hellenistic-roman-ways': {rooms: 4, exhibits: 18, template: 'crossroads-4'},
  'late-antiquity-inheritance': {rooms: 3, exhibits: 9, template: 'sequence-3'},
  'rationalism-mind-nature-system': {rooms: 3, exhibits: 5, template: 'sequence-3'},
  'empiricism-science-political-order': {rooms: 3, exhibits: 4, template: 'sequence-3'},
  'enlightenment-revolution-kant': {rooms: 5, exhibits: 6, template: 'crossroads-4'},
  'german-idealism-afterlives': {rooms: 4, exhibits: 4, template: 'sequence-3'},
  'utility-liberty-history-capital': {rooms: 4, exhibits: 3, template: 'sequence-3'},
  'faith-pessimism-life-value': {rooms: 3, exhibits: 3, template: 'sequence-3'},
  'pragmatism-democratic-inquiry': {rooms: 4, exhibits: 4, template: 'sequence-3'},
  'critique-power-deconstruction': {rooms: 4, exhibits: 4, template: 'crossroads-4'},
  'moral-life-practical-reason': {rooms: 4, exhibits: 8, template: 'crossroads-4'},
  'colonialism-race-liberation': {rooms: 3, exhibits: 3, template: 'sequence-3'},
};
const EXPECTED_MAP_LABELS = {
  'mediterranean-beginnings-classical': 'Gallery 01 · Mediterranean Beginnings & Classical Athens',
  'renaissance-humanism-new-method': 'Gallery 02 · Renaissance, Political Order, and New Science',
  'phenomenology-existence-embodiment': 'Gallery 03 · Phenomenology, Existence, and Embodiment',
  'analytic-traditions': 'Gallery 04 · Analytic Traditions: Logic, Language, and Analysis',
  'justice-democratic-reason': 'Gallery 05 · Political Action, Justice, and Democratic Reason',
  'core-questions-forum': 'Gallery 06 · Core Questions Forum',
  'classical-south-asian-worlds': 'Gallery 07 · Classical South Asia: Jain, Yoga, and Brahmanical Systems',
  'buddhist-philosophies': 'Gallery 08 · Buddhist Philosophies of Liberation and Knowledge',
  'classical-chinese-traditions': 'Gallery 09 · Warring States & Classical Chinese Traditions',
  'islamic-philosophical-worlds': 'Gallery 10 · Arabic & Islamic Philosophical Worlds',
  'east-asian-continuities': 'Gallery 11 · Confucian Renewal & East Asian Continuities',
  'jewish-philosophy': 'Gallery 12 · Jewish Philosophy in Arabic-Speaking & Mediterranean Worlds',
  'latin-christian-scholastic': 'Gallery 13 · Latin Christian & Scholastic Traditions',
  'hellenistic-roman-ways': 'Gallery 14 · Hellenistic & Roman Ways of Life',
  'late-antiquity-inheritance': 'Gallery 15 · Late Antiquity & Neoplatonic Inheritance',
  'rationalism-mind-nature-system': 'Gallery 16 · Rationalism: Mind, Nature, and System',
  'empiricism-science-political-order': 'Gallery 17 · Empiricism, Science, and Political Order',
  'enlightenment-revolution-kant': 'Gallery 18 · Enlightenment, Revolution, and Kant’s Critical Turn',
  'german-idealism-afterlives': 'Gallery 19 · German Idealism & Romantic Afterlives',
  'utility-liberty-history-capital': 'Gallery 20 · Utility, Liberty, History, and Capital',
  'faith-pessimism-life-value': 'Gallery 21 · Faith, Pessimism, Life, and Value',
  'pragmatism-democratic-inquiry': 'Gallery 22 · Pragmatism, Science, and Democratic Inquiry',
  'critique-power-deconstruction': 'Gallery 23 · Critique, Power, and Deconstruction',
  'moral-life-practical-reason': 'Gallery 24 · Moral Life & Practical Reason',
  'colonialism-race-liberation': 'Gallery 26 · Colonialism, Race, and Liberation',
};
const TIER_RUNTIME = {
  'anchor-exhibit': {tier: 'anchor', treatment: 'anchor-bay'},
  'standard-individual-exhibit': {tier: 'standard', treatment: 'standard-bay'},
  'supporting-exhibit': {tier: 'supporting', treatment: 'supporting-panel'},
  'thematic-cluster-participant': {tier: 'cluster', treatment: 'cluster-panel'},
  'gallery-archive-or-study-wall-record': {tier: 'archive', treatment: 'archive-label'},
};
const definitions = [...MUSEUM_WORLD_DEFINITIONS];
const definitionById = new Map(definitions.map((definition) => [definition.id, definition]));
const runtimeNodeById = new Map(MUSEUM_RUNTIME_NODES.map((node) => [node.id, node]));
const hallById = new Map(MUSEUM_HALLS.map((hall) => [hall.id, hall]));
const assetById = new Map(MUSEUM_ASSETS.map((asset) => [asset.id, asset]));
const activeRefs = new Set(MUSEUM_HALLS.flatMap((hall) => hall.exhibits.map(({id}) => `${hall.id}/${id}`)));
const activeEndpointKeys = new Set(MUSEUM_BUILDING_MANIFEST.connections.flatMap(({a, b}) => [`${a.nodeId}:${a.slotId}`, `${b.nodeId}:${b.slotId}`]));
activeEndpointKeys.add(`${MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId}:${MUSEUM_BUILDING_MANIFEST.mainEntrance.slotId}`);
const unsafeExhibitViewpoints = [];
const unsafeNavigationPoses = [];
const seamCrossingFailures = [];
const residencyAdmissionFailures = [];
const interpretationQualityFailures = [];

let checks = 0;
let physicalMovementTrajectories = 0;
const check = (name, assertion) => {
  assertion();
  checks += 1;
  console.log(`✓ ${name}`);
};

check('canonical Museum visitor data initializes within its startup budget', () => {
  assert(
    museumModuleInitializationMs <= MUSEUM_MODULE_INITIALIZATION_BUDGET_MS,
    `Canonical Museum data took ${Math.round(museumModuleInitializationMs)}ms to initialize; `
      + `the ${MUSEUM_MODULE_INITIALIZATION_BUDGET_MS}ms ceiling prevents authoring-time route synthesis from blocking visitor startup.`,
  );
});

check('committed hall crossings survive the one-shot entrance route marker clearing', () => {
  const sourceHallId = 'mediterranean-beginnings-classical';
  const targetHallId = 'hellenistic-roman-ways';
  assert.equal(shouldPreserveCommittedMuseumPose({
    previousEntry: 'entrance',
    nextEntry: undefined,
    routeHallId: targetHallId,
    activeHallId: targetHallId,
    pendingTransition: {sourceHallId, targetHallId},
    pendingTravel: undefined,
  }), true, 'Gallery 01 → Gallery 14 would reload a semantic Cynicism room anchor after crossing');
  assert.equal(shouldPreserveCommittedMuseumPose({
    previousEntry: 'entrance',
    nextEntry: undefined,
    routeHallId: targetHallId,
    activeHallId: targetHallId,
    pendingTransition: undefined,
    pendingTravel: {sourceHallId, targetHallId},
  }), true, 'Map travel would reload a semantic room anchor after committing its exact pose');
  assert.equal(shouldPreserveCommittedMuseumPose({
    previousEntry: undefined,
    nextEntry: undefined,
    routeHallId: targetHallId,
    activeHallId: targetHallId,
    pendingTransition: {sourceHallId, targetHallId},
    pendingTravel: undefined,
  }), false, 'Ordinary route synchronization was incorrectly suppressed');
  assert.equal(shouldPreserveCommittedMuseumPose({
    previousEntry: 'entrance',
    nextEntry: undefined,
    routeHallId: targetHallId,
    activeHallId: sourceHallId,
    pendingTransition: {sourceHallId, targetHallId},
    pendingTravel: undefined,
  }), false, 'An uncommitted crossing was incorrectly treated as complete');
});

const unique = (values) => new Set(values).size === values.length;
const sorted = (values) => [...values].sort();
const sequenceWallSlotFor = (layout) => {
  const side = layout.position.x < 0 ? 'west' : 'east';
  const sine = Math.sin(layout.rotationY);
  if (Math.abs(sine) > .5) return sine > 0 ? 'outer-west' : 'outer-east';
  return `${Math.cos(layout.rotationY) > 0 ? 'north' : 'south'}-${side}`;
};
const SIX_SEQUENCE_ROOM_WALL_SLOTS = [
  'north-west',
  'outer-west',
  'south-west',
  'north-east',
  'outer-east',
  'south-east',
];
const EAST_ASIAN_EXPECTED_WALL_PLACEMENTS = {
  'zhu-xi': {x: -10.85, z: -18.6667, rotationY: Math.PI / 2},
  'wang-yangming': {x: 10.85, z: -18.6667, rotationY: -Math.PI / 2},
  'eac-zhu-four-books': {x: -5.55, z: -26.88, rotationY: 0},
  'eac-wang-letters': {x: 5.55, z: -26.88, rotationY: 0},
  'eac-zhu-white-deer': {x: -5.55, z: -10.4533, rotationY: Math.PI},
  'eac-taijitu-heartmind': {x: 5.55, z: -10.4533, rotationY: Math.PI},
  'eac-xuanzang-translation': {x: -10.85, z: 0, rotationY: Math.PI / 2},
  'eac-daoist-institutions': {x: 10.85, z: 0, rotationY: -Math.PI / 2},
  'eac-hwaeom-avatamsaka': {x: -5.55, z: -8.2133, rotationY: 0},
  'eac-three-teachings': {x: 5.55, z: -8.2133, rotationY: 0},
  'eac-huineng-zen-reception': {x: -5.55, z: 8.2133, rotationY: Math.PI},
  'eac-water-land-stars': {x: 5.55, z: 8.2133, rotationY: Math.PI},
  'eac-korea-four-seven': {x: -10.85, z: 18.6667, rotationY: Math.PI / 2},
  'eac-japan-hayashi': {x: 10.85, z: 18.6667, rotationY: -Math.PI / 2},
  'eac-yi-i-ojukheon': {x: -5.55, z: 10.4533, rotationY: 0},
  'eac-japan-ancient-learning': {x: 5.55, z: 10.4533, rotationY: 0},
  'eac-vietnam-le-quy-don': {x: -5.55, z: 26.88, rotationY: Math.PI},
  'eac-modern-confucianism': {x: 5.55, z: 26.88, rotationY: Math.PI},
};
const JEWISH_EXPECTED_WALL_PLACEMENTS = {
  'saadia-gaon': {x: -8.85, z: -6, rotationY: Math.PI / 2},
  'judah-halevi': {x: 8.85, z: -6, rotationY: -Math.PI / 2},
  'saadia-beliefs-opinions': {x: -4.55, z: -10.88, rotationY: 0},
  'judah-halevi-kuzari': {x: 4.55, z: -10.88, rotationY: 0},
  'judeo-arabic-geniza-law': {x: -4.55, z: -1.12, rotationY: Math.PI},
  'judah-halevi-divan': {x: 4.55, z: -1.12, rotationY: Math.PI},
  maimonides: {x: -8.85, z: 6, rotationY: Math.PI / 2},
  'maimonides-mishneh-torah': {x: -4.55, z: 1.12, rotationY: 0},
  'maimonides-guide-translation-reception': {x: 4.55, z: 1.12, rotationY: 0},
  'maimonides-guide-negative-theology': {x: -4.55, z: 10.88, rotationY: Math.PI},
  'spinoza-formation-rupture-threshold': {x: 4.55, z: 10.88, rotationY: Math.PI},
  'jewish-philosophy-after-maimonides': {x: 8.85, z: 6, rotationY: -Math.PI / 2},
};
const assertExactWallPlacements = (galleryLabel, installations, expectedPlacements) => {
  assert.deepEqual(
    sorted(installations.map(({id}) => id)),
    sorted(Object.keys(expectedPlacements)),
    `${galleryLabel} authored wall-placement roster changed`,
  );
  for (const installation of installations) {
    const expected = expectedPlacements[installation.id];
    assert(expected, `${galleryLabel}/${installation.id} lacks an exact authored wall placement`);
    approx(installation.position.x, expected.x, `${galleryLabel}/${installation.id} wall x`, .0001);
    approx(installation.position.z, expected.z, `${galleryLabel}/${installation.id} wall z`, .0001);
    approx(installation.rotationY, expected.rotationY, `${galleryLabel}/${installation.id} wall rotation`, .0001);
  }
};
const colliderAxes = ({rotation}) => [
  {x: Math.cos(rotation), z: -Math.sin(rotation)},
  {x: Math.sin(rotation), z: Math.cos(rotation)},
];
const colliderProjectionRadius = (collider, axis) => {
  const [widthAxis, depthAxis] = colliderAxes(collider);
  return Math.abs(widthAxis.x * axis.x + widthAxis.z * axis.z) * collider.size.width / 2
    + Math.abs(depthAxis.x * axis.x + depthAxis.z * axis.z) * collider.size.depth / 2;
};
const collidersOverlap = (first, second, clearance = .02) => {
  const centerDelta = {
    x: second.center.x - first.center.x,
    z: second.center.z - first.center.z,
  };
  return [...colliderAxes(first), ...colliderAxes(second)].every((axis) => {
    const centerDistance = Math.abs(centerDelta.x * axis.x + centerDelta.z * axis.z);
    return centerDistance + clearance
      < colliderProjectionRadius(first, axis) + colliderProjectionRadius(second, axis);
  });
};
const assertInstallationsDoNotOverlap = (galleryLabel, rooms, installations) => {
  for (const room of rooms) {
    const roomInstallations = installations.filter(({spatialCellId}) => spatialCellId === room.id);
    for (let firstIndex = 0; firstIndex < roomInstallations.length; firstIndex += 1) {
      for (let secondIndex = firstIndex + 1; secondIndex < roomInstallations.length; secondIndex += 1) {
        const first = roomInstallations[firstIndex];
        const second = roomInstallations[secondIndex];
        assert(
          !collidersOverlap(first.collider, second.collider),
          `${galleryLabel}/${room.id} cramps ${first.id} and ${second.id} into overlapping physical footprints`,
        );
      }
    }
  }
};
const wordCount = (value) => value.trim().split(/\s+/).filter(Boolean).length;
const distance = (first, second) => Math.hypot(first.x - second.x, first.z - second.z);
const close = (actual, expected, epsilon = 1e-5) => Math.abs(actual - expected) <= epsilon;
const approx = (actual, expected, message, epsilon = 1e-5) => assert(close(actual, expected, epsilon), `${message}: expected ${expected}, got ${actual}`);
const independentDecodedTextureBytes = ({width, height, mipmaps}) => {
  let levelWidth = Math.max(1, Math.floor(width));
  let levelHeight = Math.max(1, Math.floor(height));
  let pixels = levelWidth * levelHeight;
  while (mipmaps && (levelWidth > 1 || levelHeight > 1)) {
    levelWidth = Math.max(1, Math.floor(levelWidth / 2));
    levelHeight = Math.max(1, Math.floor(levelHeight / 2));
    pixels += levelWidth * levelHeight;
  }
  return pixels * 4;
};
const independentTextureDimensionsForPlane = (planeWidth, planeHeight, reference) => {
  const pixelBudget = Math.floor(reference.width) * Math.floor(reference.height);
  const aspect = planeWidth / planeHeight;
  let width;
  let height;
  if (aspect >= 1) {
    height = Math.max(1, Math.floor(Math.sqrt(pixelBudget / aspect)));
    width = Math.max(1, Math.floor(height * aspect));
  } else {
    width = Math.max(1, Math.floor(Math.sqrt(pixelBudget * aspect)));
    height = Math.max(1, Math.floor(width / aspect));
  }
  return {width, height, mipmaps: reference.mipmaps};
};
const allColliders = (layout) => [...layout.wallColliders, ...layout.obstacleColliders];
const sampleSegment = (from, to, spacing, visit) => {
  const length = distance(from, to);
  const sampleCount = Math.max(1, Math.ceil(length / spacing));
  for (let index = 0; index <= sampleCount; index += 1) {
    const ratio = index / sampleCount;
    visit({
      x: from.x + (to.x - from.x) * ratio,
      z: from.z + (to.z - from.z) * ratio,
    });
  }
  return length;
};
const unionBounds = (bounds) => ({
  minX: Math.min(...bounds.map(({minX}) => minX)),
  maxX: Math.max(...bounds.map(({maxX}) => maxX)),
  minZ: Math.min(...bounds.map(({minZ}) => minZ)),
  maxZ: Math.max(...bounds.map(({maxZ}) => maxZ)),
});
const validPose = (definition, pose) => isValidMuseumPosition(
  pose,
  definition.layout.playerRadius,
  definition.layout.bounds,
  [...definition.layout.wallColliders, ...definition.layout.obstacleColliders],
  definition.layout.spatialCells,
);
const worldNormal = (definition, normal) => ({
  x: normal.x * Math.cos(definition.worldTransform.yaw) + normal.z * Math.sin(definition.worldTransform.yaw),
  z: -normal.x * Math.sin(definition.worldTransform.yaw) + normal.z * Math.cos(definition.worldTransform.yaw),
});
const wallPlane = (node, wall) => {
  const {x, z, yaw} = node.worldTransform;
  const cosine = Math.cos(yaw);
  const sine = Math.sin(yaw);
  const centerX = x + cosine * wall.center.x + sine * wall.center.z;
  const centerZ = z - sine * wall.center.x + cosine * wall.center.z;
  const directionX = Math.cos(wall.rotation + yaw);
  const directionZ = -Math.sin(wall.rotation + yaw);
  const halfRun = wall.size.width / 2;
  const firstX = centerX - directionX * halfRun;
  const secondX = centerX + directionX * halfRun;
  const firstZ = centerZ - directionZ * halfRun;
  const secondZ = centerZ + directionZ * halfRun;
  const bottom = wall.bottom ?? 0;
  return Math.abs(directionX) >= Math.abs(directionZ)
    ? {axis: 'x', coordinate: centerZ, start: Math.min(firstX, secondX), end: Math.max(firstX, secondX), bottom, top: bottom + wall.height}
    : {axis: 'z', coordinate: centerX, start: Math.min(firstZ, secondZ), end: Math.max(firstZ, secondZ), bottom, top: bottom + wall.height};
};
const wallPlaneFullyCovers = (covering, candidate) => {
  const epsilon = .012;
  return covering.axis === candidate.axis
    && Math.abs(covering.coordinate - candidate.coordinate) <= epsilon
    && covering.start <= candidate.start + epsilon
    && covering.end >= candidate.end - epsilon
    && covering.bottom <= candidate.bottom + epsilon
    && covering.top >= candidate.top - epsilon;
};
const wallPlaneOverlapArea = (first, second) => {
  const epsilon = .012;
  if (first.axis !== second.axis || Math.abs(first.coordinate - second.coordinate) > epsilon) return 0;
  const run = Math.min(first.end, second.end) - Math.max(first.start, second.start);
  const height = Math.min(first.top, second.top) - Math.max(first.bottom, second.bottom);
  return run > epsilon && height > epsilon ? run * height : 0;
};
const assertCompleteSixWallSequenceGallery = ({
  label,
  galleryId,
  roomCount,
  primaryCount,
  supplementalCount,
  physicalCount,
  primaryPlacements,
  roomEntryPoses,
  roomSignCopy,
  supplementalExhibits,
  supplementalLayouts,
  directNeighborNodeIds,
}) => {
  const hall = hallById.get(galleryId);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === galleryId);
  const definition = definitionById.get(galleryId);
  const runtimeNode = MUSEUM_RUNTIME_NODES.find(({publicHallId}) => publicHallId === galleryId);
  assert(hall && program && definition && runtimeNode, `${label} is missing from the live canonical runtime`);
  assert.equal(runtimeNode.galleryState, 'curated-open', `${label} is not curated/open`);
  assert.equal(runtimeNode.layout.signs?.filter(({kind}) => kind === 'planned-status').length ?? 0, 0, `${label} still renders a planned-status sign`);
  assert.equal(program.rooms.length, roomCount, `${label} room count changed`);
  assert.equal(runtimeNode.roomIds.length, roomCount, `${label} runtime room count changed`);
  assert.equal(hall.exhibits.length, primaryCount, `${label} primary count changed`);
  assert.equal(definition.layout.exhibits.length, primaryCount, `${label} rendered primary count changed`);
  assert.equal(supplementalExhibits.length, supplementalCount, `${label} supplemental record count changed`);
  assert.equal(supplementalLayouts.length, supplementalCount, `${label} supplemental layout count changed`);
  assert.deepEqual(definition.layout.supplementalExhibits, supplementalLayouts, `${label} runtime supplemental layouts drifted`);
  assert.deepEqual(
    sorted(definition.layout.exhibits.map(({id}) => id)),
    sorted(hall.exhibits.map(({id}) => id)),
    `${label} primary records and rendered layouts diverged`,
  );
  assert.deepEqual(
    sorted(supplementalLayouts.map(({id}) => id)),
    sorted(supplementalExhibits.map(({id}) => id)),
    `${label} supplemental records and layouts diverged`,
  );
  assert.deepEqual(sorted(Object.keys(roomSignCopy)), sorted(program.rooms.map(({id}) => id)), `${label} room-sign coverage changed`);
  assert.deepEqual(sorted(Object.keys(roomEntryPoses)), sorted(program.rooms.map(({id}) => id)), `${label} room-entry coverage changed`);

  const allInstallations = [...definition.layout.exhibits, ...supplementalLayouts];
  assert.equal(allInstallations.length, physicalCount, `${label} physical installation count changed`);
  assertInstallationsDoNotOverlap(label, program.rooms, allInstallations);
  assert.equal(
    new Set(allInstallations.map(({position, rotationY}) =>
      `${position.x.toFixed(4)}:${position.z.toFixed(4)}:${rotationY.toFixed(4)}`)).size,
    physicalCount,
    `${label} repeats an authored physical wall slot`,
  );
  for (const room of program.rooms) {
    const installations = allInstallations.filter(({spatialCellId}) => spatialCellId === room.id);
    assert.equal(installations.length, 6, `${label}/${room.id} must fill all six sequence-room wall faces`);
    assert.deepEqual(
      sorted(installations.map(sequenceWallSlotFor)),
      sorted(SIX_SEQUENCE_ROOM_WALL_SLOTS),
      `${label}/${room.id} leaves a usable sequence-room wall blank or doubles a wall face`,
    );
    const view = definition.layout.entryViews.find(({spatialCellId}) => spatialCellId === room.id);
    assert.deepEqual(view?.pose, roomEntryPoses[room.id], `${label}/${room.id} entry pose drifted`);
    assert(view && validPose(definition, view.pose), `${label}/${room.id} entry pose is unsafe`);
    const sign = definition.layout.signs.find(({id}) => id === `${room.id}:room-sign`);
    assert.deepEqual(
      sign && {kicker: sign.kicker, title: sign.title, subtitle: sign.subtitle},
      roomSignCopy[room.id],
      `${label}/${room.id} physical sign differs from its authored interpretation`,
    );
  }
  for (const [id, authored] of Object.entries(primaryPlacements)) {
    const layout = definition.layout.exhibits.find((candidate) => candidate.id === id);
    assert(layout, `${label}/${id} is missing from its rendered primary program`);
    assert.deepEqual(
      {x: layout.position.x, z: layout.position.z, rotationY: layout.rotationY},
      authored,
      `${label}/${id} drifted from its authored wall placement`,
    );
    assert(layout.scene.mediaMounts.length >= 1, `${label}/${id} lacks provenance-backed scene media`);
    assert(layout.scene.objectBounds.some(({id: volumeId}) => volumeId.endsWith('-backing')), `${label}/${id} lacks a measurable installation backing`);
  }
  for (const layout of supplementalLayouts) {
    const exhibit = supplementalExhibits.find(({id}) => id === layout.id);
    assert(exhibit, `${label}/${layout.id} lacks authored visitor interpretation`);
    assert.equal(layout.assetId, exhibit.assetId, `${label}/${layout.id} scene and interpretation assets diverge`);
    assert.equal(layout.assetId, exhibit.panelAssetId, `${label}/${layout.id} scene and panel assets diverge`);
    assert.equal(layout.assetId, layout.mediaMount.assetId, `${label}/${layout.id} prefetch and media assets diverge`);
    assert(definition.layout.obstacleColliders.some(({id}) => id === layout.collider.id), `${label}/${layout.id} is absent from collision`);
    assert(validPose(definition, layout.viewpoint), `${label}/${layout.id} has an unsafe viewing pose`);
  }

  const physicalAssetIds = [
    ...hall.exhibits.map(({principalAssetId, supportingAssetIds, id}) => {
      assert(principalAssetId, `${label}/${id} lacks a principal physical asset`);
      assert.equal(supportingAssetIds.length, 0, `${label}/${id} unexpectedly adds a second physical image to a six-wall program`);
      return principalAssetId;
    }),
    ...supplementalLayouts.map(({assetId}) => assetId),
  ];
  assert.equal(physicalAssetIds.length, physicalCount, `${label} physical media count changed`);
  assert.equal(new Set(physicalAssetIds).size, physicalCount, `${label} repeats a physical-installation asset`);
  assert.equal(getMuseumGuidedStops(hall.id, hall.guidedOrder).length, physicalCount, `${label} guided visit does not reach every installation`);

  for (const neighborNodeId of directNeighborNodeIds) {
    const connection = MUSEUM_BUILDING_MANIFEST.connections.find(({a, b}) =>
      [a.nodeId, b.nodeId].includes(runtimeNode.id) && [a.nodeId, b.nodeId].includes(neighborNodeId));
    assert(connection?.accessible && connection.implementationStatus === 'live', `${label} lacks its live direct connection to ${neighborNodeId}`);
  }
};

const crossroadsTransformKey = ({position, rotationY}) =>
  `${position.x.toFixed(4)}:${position.z.toFixed(4)}:${rotationY.toFixed(6)}`;
const crossroadsSlotTransformKey = ({x, z, rotationY}) =>
  `${x.toFixed(4)}:${z.toFixed(4)}:${rotationY.toFixed(6)}`;

const assertCompleteSixWallCrossroadsGallery = ({
  label,
  galleryId,
  dimensions,
  roomOrder,
  roomBounds,
  expectedRoomBounds,
  spatialConnections,
  interiorWalls,
  installationSlots,
  installsPerRoom,
  physicalInstallCount,
  primaryCount,
  supplementalCount,
  primaryPlacements,
  primaryScaleFloor,
  roomSignCopy,
  roomEntryPoses,
  primaryCirculation,
  supplementalExhibits,
  supplementalLayouts,
  supplementalRecordGetter,
  curationValidation,
  expectedPrimaryAssets,
  expectedWorldTransform,
  expectedWorldBounds,
  entryPortalId,
  exitPortalId,
  entranceSign,
  roomSignPlacements,
}) => {
  const hall = hallById.get(galleryId);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === galleryId);
  const definition = definitionById.get(galleryId);
  const runtimeNode = MUSEUM_RUNTIME_NODES.find(({publicHallId}) => publicHallId === galleryId);
  const manifestNode = MUSEUM_BUILDING_MANIFEST.nodes.find(({publicHallId}) => publicHallId === galleryId);
  assert(hall && program && definition && runtimeNode && manifestNode, `${label} is missing from the live canonical runtime`);

  assert.equal(runtimeNode.galleryState, 'curated-open', `${label} is not curated/open`);
  assert.equal(runtimeNode.fastTravelEligible, true, `${label} is not available for fast travel`);
  assert.equal(runtimeNode.templateId, 'crossroads-4', `${label} no longer uses the crossroads template`);
  assert.deepEqual(runtimeNode.worldTransform, expectedWorldTransform, `${label} world transform drifted`);
  assert.deepEqual(manifestNode.bounds, expectedWorldBounds, `${label} world footprint drifted`);
  assert.deepEqual(runtimeNode.routePortals, {entry: entryPortalId, exit: exitPortalId}, `${label} route direction drifted`);
  assert.equal(runtimeNode.roomIds.length, 4, `${label} runtime room count changed`);
  assert.equal(runtimeNode.layout.signs?.filter(({kind}) => kind === 'planned-status').length ?? 0, 0, `${label} still renders a planned-status sign`);

  assert.deepEqual(dimensions, {
    width: 28,
    depth: 28,
    ceilingHeight: 6.2,
    wallThickness: .36,
    crossHalfWidth: 4,
  }, `${label} authored dimensions drifted`);
  assert.deepEqual(definition.resolvedTemplate.canonicalFootprint, {width: 28, depth: 28}, `${label} template footprint drifted`);
  assert.deepEqual(
    definition.resolvedTemplate.resolvedFootprint.bounds,
    {minX: -14, maxX: 14, minZ: -14, maxZ: 14},
    `${label} resolved shell is not 28 × 28`,
  );
  assert.equal(program.rooms.length, 4, `${label} canonical room count changed`);
  assert.deepEqual(program.rooms.map(({id}) => id), roomOrder, `${label} canonical room order drifted`);
  assert.deepEqual(runtimeNode.roomIds, roomOrder, `${label} runtime room order drifted`);
  assert.deepEqual(definition.layout.spatialCells.map(({id}) => id), roomOrder, `${label} rendered room order drifted`);
  assert.deepEqual(roomBounds, expectedRoomBounds, `${label} authored quadrant assignment drifted`);
  assert.deepEqual(
    Object.fromEntries(definition.layout.spatialCells.map((cell) => [cell.id, cell.renderBounds ?? cell.bounds])),
    roomBounds,
    `${label} quadrant bounds drifted`,
  );
  assert.equal(
    Object.values(roomBounds).reduce(
      (sum, bounds) => sum + (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ),
      0,
    ),
    dimensions.width * dimensions.depth,
    `${label} quadrants no longer tile the whole shell`,
  );

  assert.equal(spatialConnections.length, 4, `${label} must keep all four conceptual seams open`);
  assert.deepEqual(definition.layout.spatialConnections, spatialConnections, `${label} open-cross connections drifted`);
  assert.equal(
    new Set(spatialConnections.flatMap(({fromCellId, toCellId}) => [fromCellId, toCellId])).size,
    4,
    `${label} open seams do not connect all four rooms`,
  );
  for (const connection of spatialConnections) {
    const {openingBounds} = connection;
    const vertical = close(openingBounds.minX, -.3) && close(openingBounds.maxX, .3)
      && close(openingBounds.maxZ - openingBounds.minZ, 14);
    const horizontal = close(openingBounds.minZ, -.3) && close(openingBounds.maxZ, .3)
      && close(openingBounds.maxX - openingBounds.minX, 14);
    assert(vertical || horizontal, `${label}/${connection.id} is not a fully open quadrant seam`);
  }

  const authoredWalls = interiorWalls();
  assert.equal(authoredWalls.length, 8, `${label} lost one of its eight L-baffles`);
  const renderedWallById = new Map(definition.layout.wallColliders.map((wall) => [wall.id, wall]));
  for (const wall of authoredWalls) {
    assert.deepEqual(renderedWallById.get(wall.id), wall, `${label}/${wall.id} differs from its authored baffle`);
    assert(close(wall.height, dimensions.ceilingHeight), `${label}/${wall.id} does not reach the ceiling`);
    assert(close(Math.max(wall.size.width, wall.size.depth), 6), `${label}/${wall.id} is not a six-metre baffle`);
    assert(close(Math.min(wall.size.width, wall.size.depth), dimensions.wallThickness), `${label}/${wall.id} thickness drifted`);
    const innerEnd = wall.size.depth > wall.size.width
      ? Math.abs(wall.center.z) - wall.size.depth / 2
      : Math.abs(wall.center.x) - wall.size.width / 2;
    assert(close(innerEnd - dimensions.crossHalfWidth, 4), `${label}/${wall.id} no longer leaves a four-metre room throat`);
  }

  assert.equal(physicalInstallCount, 24, `${label} authored physical-install count drifted`);
  assert.equal(installsPerRoom, 6, `${label} installs-per-room contract drifted`);
  assert.equal(installationSlots.length, physicalInstallCount, `${label} authored slot count drifted`);
  assert.equal(new Set(installationSlots.map(({id}) => id)).size, physicalInstallCount, `${label} repeats an authored slot ID`);
  assert.equal(new Set(installationSlots.map(crossroadsSlotTransformKey)).size, physicalInstallCount, `${label} repeats an authored wall face`);

  assert.equal(hall.exhibits.length, primaryCount, `${label} primary record count changed`);
  assert.equal(definition.layout.exhibits.length, primaryCount, `${label} rendered primary count changed`);
  assert.equal(Object.keys(primaryPlacements).length, primaryCount, `${label} primary-placement count changed`);
  assert.equal(supplementalExhibits.length, supplementalCount, `${label} supplemental record count changed`);
  assert.equal(supplementalLayouts.length, supplementalCount, `${label} supplemental layout count changed`);
  assert.deepEqual(definition.layout.supplementalExhibits, supplementalLayouts, `${label} runtime supplemental layouts drifted`);

  const slotByTransform = new Map(installationSlots.map((slot) => [crossroadsSlotTransformKey(slot), slot]));
  const allInstallations = [...definition.layout.exhibits, ...supplementalLayouts];
  assert.equal(allInstallations.length, physicalInstallCount, `${label} physical installation count changed`);
  assert.equal(new Set(allInstallations.map(crossroadsTransformKey)).size, physicalInstallCount, `${label} doubles a physical wall face`);
  assertInstallationsDoNotOverlap(label, program.rooms, allInstallations);
  for (const installation of allInstallations) {
    const authoredSlot = slotByTransform.get(crossroadsTransformKey(installation));
    assert(authoredSlot, `${label}/${installation.id} is not on one of the 24 authored wall faces`);
    assert.equal(installation.spatialCellId, authoredSlot.spatialCellId, `${label}/${installation.id} is assigned to the wrong quadrant`);
    assert(authoredSlot.backingWallId, `${label}/${installation.id} lacks an authored backing wall`);
  }
  for (const roomId of roomOrder) {
    assert.equal(
      installationSlots.filter(({spatialCellId}) => spatialCellId === roomId).length,
      installsPerRoom,
      `${label}/${roomId} does not author six wall faces`,
    );
    assert.equal(
      allInstallations.filter(({spatialCellId}) => spatialCellId === roomId).length,
      installsPerRoom,
      `${label}/${roomId} does not render six installations`,
    );
  }

  assert.deepEqual(
    sorted(definition.layout.exhibits.map(({id}) => id)),
    sorted(Object.keys(expectedPrimaryAssets)),
    `${label} primary roster drifted`,
  );
  for (const [id, expectedAssetId] of Object.entries(expectedPrimaryAssets)) {
    const record = hall.exhibits.find((candidate) => candidate.id === id);
    const layout = definition.layout.exhibits.find((candidate) => candidate.id === id);
    const placement = primaryPlacements[id];
    assert(record && layout && placement, `${label}/${id} is missing its record, scene, or placement`);
    assert.equal(record.principalAssetId, expectedAssetId, `${label}/${id} primary asset drifted`);
    assert.equal(record.supportingAssetIds.length, 0, `${label}/${id} adds a second physical image to a six-wall program`);
    assert.equal(placement.scale, 'full', `${label}/${id} is not authored full-scale`);
    assert.deepEqual(
      {x: layout.position.x, z: layout.position.z, rotationY: layout.rotationY},
      {x: placement.x, z: placement.z, rotationY: placement.rotationY},
      `${label}/${id} drifted from its authored primary placement`,
    );
    const authoredSlot = installationSlots.find(({id: slotId}) => slotId === placement.slotId);
    assert(authoredSlot, `${label}/${id} names an unknown installation slot`);
    assert.equal(placement.backingWallId, authoredSlot.backingWallId, `${label}/${id} backing-wall contract drifted`);
    assert(layout.scene.footprint.width >= primaryScaleFloor.objectWidth, `${label}/${id} is narrower than the full-scale floor`);
    assert(layout.scene.footprint.height >= primaryScaleFloor.footprintHeight, `${label}/${id} is shorter than the full-scale floor`);
    assert(layout.scene.mediaMounts.some(({assetId}) => assetId === expectedAssetId), `${label}/${id} does not render its principal asset`);
    assert(layout.scene.objectBounds.some(({id: objectId}) => objectId.endsWith('-backing')), `${label}/${id} lacks measurable backing geometry`);
  }

  assert.deepEqual(
    sorted(supplementalLayouts.map(({id}) => id)),
    sorted(supplementalExhibits.map(({id}) => id)),
    `${label} supplemental records and layouts diverged`,
  );
  for (const layout of supplementalLayouts) {
    const exhibit = supplementalExhibits.find(({id}) => id === layout.id);
    assert(exhibit, `${label}/${layout.id} lacks authored interpretation`);
    assert.deepEqual(supplementalRecordGetter(layout.id), exhibit, `${label}/${layout.id} is absent from its visitor record getter`);
    assert.equal(layout.assetId, exhibit.assetId, `${label}/${layout.id} scene and interpretation assets diverge`);
    assert.equal(layout.assetId, exhibit.panelAssetId, `${label}/${layout.id} scene and panel assets diverge`);
    assert.equal(layout.assetId, layout.mediaMount.assetId, `${label}/${layout.id} prefetch and scene media diverge`);
    assert(exhibit.sources.length >= 2, `${label}/${layout.id} lacks image and scholarly provenance`);
    assert(exhibit.sources.some(({kind}) => kind === 'academic-reference'), `${label}/${layout.id} lacks a scholarly source`);
    assert(definition.layout.obstacleColliders.some(({id}) => id === layout.collider.id), `${label}/${layout.id} is absent from collision`);
    assert(validPose(definition, layout.viewpoint), `${label}/${layout.id} has an unsafe visitor viewpoint`);
  }

  const physicalAssetIds = [
    ...hall.exhibits.map(({principalAssetId}) => principalAssetId),
    ...supplementalLayouts.map(({assetId}) => assetId),
  ];
  assert.equal(physicalAssetIds.length, physicalInstallCount, `${label} physical media count changed`);
  assert.equal(new Set(physicalAssetIds).size, physicalInstallCount, `${label} repeats a physical-installation asset`);
  const physicalAssets = physicalAssetIds.map((assetId) => {
    const asset = assetById.get(assetId);
    assert(asset, `${label} uses missing asset ${assetId}`);
    assert(asset.sourcePageUrl?.startsWith('https://'), `${label}/${assetId} lacks a real source page`);
    assert(asset.attribution?.trim().length >= 24, `${label}/${assetId} lacks practical attribution`);
    assert(asset.alt?.trim().length >= 24, `${label}/${assetId} lacks literal accessibility text`);
    return asset;
  });
  assert.equal(
    new Set(physicalAssets.map(({sourcePageUrl}) => sourcePageUrl)).size,
    physicalInstallCount,
    `${label} repeats an underlying source image`,
  );
  assert.equal(getMuseumGuidedStops(hall.id, hall.guidedOrder).length, physicalInstallCount, `${label} guided route misses an installation`);

  assert.deepEqual(definition.layout.primaryCirculation, primaryCirculation, `${label} cardinal circulation drifted`);
  assert.equal(definition.layout.signs.length, 5, `${label} must render one entrance sign and four room signs`);
  for (const [roomId, pose] of Object.entries(roomEntryPoses)) {
    const view = definition.layout.entryViews.find(({spatialCellId}) => spatialCellId === roomId);
    assert.deepEqual(view?.pose, pose, `${label}/${roomId} entry pose drifted`);
    assert(Math.abs(pose.x) >= 8.1 && Math.abs(pose.z) >= 8.1, `${label}/${roomId} stages visitors in a turn throat`);
    assert(validPose(definition, pose), `${label}/${roomId} entry pose is unsafe`);
  }
  assert.deepEqual(sorted(Object.keys(roomSignCopy)), sorted(roomOrder), `${label} room-sign copy coverage drifted`);
  for (const roomId of roomOrder) {
    const copy = roomSignCopy[roomId];
    const sign = definition.layout.signs.find(({id}) => id === `${roomId}:room-sign`);
    assert.deepEqual(
      sign && {kicker: sign.kicker, title: sign.title, subtitle: sign.subtitle},
      copy,
      `${label}/${roomId} physical sign differs from its authored interpretation`,
    );
    assert.deepEqual(
      sign && {x: sign.position.x, z: sign.position.z, rotationY: sign.rotationY},
      roomSignPlacements[roomId],
      `${label}/${roomId} sign is not mounted in its own quadrant`,
    );
  }

  const entry = runtimeNode.entrances.find(({id}) => id === entryPortalId);
  const exit = runtimeNode.entrances.find(({id}) => id === exitPortalId);
  assert(entry && exit, `${label} entry or exit portal is absent from runtime geometry`);
  assert.deepEqual(definition.layout.spawn, entry.arrivalPose, `${label} default spawn is not its physical ${entryPortalId} arrival pose`);
  assert.equal(definition.resolvedTemplate.portalInterfaces.find(({manifestSlotId}) => manifestSlotId === entryPortalId)?.active, true, `${label} entry portal is sealed`);
  assert.equal(definition.resolvedTemplate.portalInterfaces.find(({manifestSlotId}) => manifestSlotId === exitPortalId)?.active, true, `${label} exit portal is sealed`);
  const renderedEntranceSign = definition.layout.signs.find(({id}) => id === `${galleryId}:entrance-sign`);
  assert.deepEqual(
    renderedEntranceSign && {
      x: renderedEntranceSign.position.x,
      z: renderedEntranceSign.position.z,
      rotationY: renderedEntranceSign.rotationY,
    },
    entranceSign,
    `${label} entrance sign is not mounted toward arriving ${entryPortalId} visitors`,
  );
  assert.equal(renderedEntranceSign?.kind, 'entrance', `${label} entrance sign lost its semantic role`);
  assert(!definition.layout.signs.some(({title, kicker, subtitle}) =>
    /\b(?:planned|coming soon|forthcoming)\b/iu.test(`${title} ${kicker} ${subtitle}`)), `${label} retains stale planned-gallery copy`);

  assert.equal(curationValidation.roomCount, 4, `${label} curation validator room count drifted`);
  assert.equal(curationValidation.connectionCount, 4, `${label} curation validator connection count drifted`);
  assert.equal(curationValidation.interiorWallCount, 8, `${label} curation validator baffle count drifted`);
  assert.equal(curationValidation.installationCount, physicalInstallCount, `${label} curation validator install count drifted`);
  assert.equal(curationValidation.primaryCount, primaryCount, `${label} curation validator primary count drifted`);
  if (Object.hasOwn(curationValidation, 'installsPerRoom')) {
    assert.equal(curationValidation.installsPerRoom, installsPerRoom, `${label} curation validator room capacity drifted`);
  }
  if (Object.hasOwn(curationValidation, 'supplementalCount')) {
    assert.equal(curationValidation.supplementalCount, supplementalCount, `${label} curation validator supplemental count drifted`);
  }
};

check('the public catalog is exactly the canonical twenty-five-hall, 101-room, 186-exhibit program', () => {
  assert.deepEqual(MUSEUM_HALLS.map(({id}) => id), HALL_IDS);
  assert.equal(MUSEUM_HALLS.reduce((sum, hall) => sum + hall.zones.length, 0), 101);
  assert.equal(MUSEUM_HALLS.reduce((sum, hall) => sum + hall.exhibits.length, 0), 186);
  assert.deepEqual(MUSEUM_LIVE_PROGRAM_TOTALS.tierCounts, {
    'anchor-exhibit': 92,
    'standard-individual-exhibit': 79,
    'supporting-exhibit': 9,
    'thematic-cluster-participant': 5,
    'gallery-archive-or-study-wall-record': 1,
  });
  assert.equal(MUSEUM_LIVE_PROGRAM_TOTALS.recordCapacity, 255);
  assert.equal(MUSEUM_LIVE_PROGRAM_TOTALS.reserveCapacity, 69);
  assert.equal(MUSEUM_LIVE_PROGRAM_TOTALS.hallCount, 25);
  assert.equal(MUSEUM_LIVE_PROGRAM_TOTALS.roomCount, 101);
  assert.equal(MUSEUM_LIVE_PROGRAM_TOTALS.exhibitCount, 186);
  assert.equal(Object.keys(MUSEUM_PLANNED_HALL_TITLES).length, 26);
  assert.equal(Object.keys(MUSEUM_PLANNED_HALL_TITLES).filter((id) => HALL_IDS.includes(id)).length, 25);
  assert.equal(Object.keys(MUSEUM_PLANNED_HALL_TITLES).filter((id) => !HALL_IDS.includes(id)).length, 1);
  for (const hall of MUSEUM_HALLS) {
    const expected = EXPECTED_COUNTS[hall.id];
    const runtimeNode = MUSEUM_RUNTIME_NODES.find(({publicHallId}) => publicHallId === hall.id);
    assert.equal(hall.zones.length, expected.rooms, `${hall.id} room count changed`);
    assert.equal(hall.exhibits.length, expected.exhibits, `${hall.id} exhibit count changed`);
    assert.equal(hall.templateId, expected.template, `${hall.id} template changed`);
    assert.deepEqual(hall.guidedOrder, hall.exhibits.map(({id}) => id), `${hall.id} guided order is stale`);
    assert.equal(runtimeNode?.mapLabel, EXPECTED_MAP_LABELS[hall.id], `${hall.id} map label drifted from its canonical title`);
  }
  assert.equal(philosophers.length, 146);
  assert.equal(branches.length, 43);
});

check('curated halls and persistent Continuous Enfilade architecture use the canonical wall material', () => {
  const currentExceptions = HALL_IDS.filter((hallId) => Object.hasOwn(MUSEUM_OWNER_APPROVED_WALL_MATERIAL_EXCEPTIONS, hallId));
  assert.deepEqual(currentExceptions, [], 'A current hall has an unapproved architectural wall exception');
  for (const hallId of HALL_IDS) {
    assert.deepEqual(resolveMuseumWallMaterial(hallId), MUSEUM_CANONICAL_WALL_MATERIAL, `${hallId} does not resolve the Gallery 01 wall standard`);
  }
  assert.match(architectureSource, /resolveMuseumWallMaterial\(definition\.id\)/, 'Canonical hall walls bypass the shared material resolver');
  assert.doesNotMatch(architectureSource, /RENAISSANCE_PALETTE\.plaster/, 'Gallery 02 still overrides the architectural wall color');
  assert.match(buildingArchitectureSource, /resolveMuseumWallMaterial\(\)/, 'Museum connectors bypass the shared wall standard');
  const persistentNodes = MUSEUM_RUNTIME_NODES.filter(({publicHallId}) => !publicHallId);
  const persistentPlannedHalls = persistentNodes.filter(({kind, galleryState}) =>
    kind === 'hall' && galleryState === 'planned-walkable');
  const persistentCirculationNodes = persistentNodes.filter(({kind}) => kind !== 'hall');
  assert.equal(persistentNodes.length, 14, 'Persistent architecture must contain 1 planned hall and 13 circulation nodes');
  assert.equal(persistentPlannedHalls.length, 1, 'Persistent architecture must retain exactly 1 planned hall shell');
  assert.equal(persistentCirculationNodes.length, 13, 'Persistent architecture must retain exactly 13 circulation nodes');
  for (const node of persistentNodes) {
    assert(node.layout.spatialCells.length > 0, `${node.id} has no walkable spatial cell`);
    assert((node.architectureWalls ?? node.layout.wallColliders).length > 0, `${node.id} has no rendered architecture`);
    assert(unique((node.architectureWalls ?? []).map(({id}) => id)), `${node.id} repeats a rendered wall id`);
  }
  const assertNoCoplanarRenderOverlap = (first, second) => {
    const firstWalls = first.architectureWalls ?? first.layout.wallColliders;
    const secondWalls = second.architectureWalls ?? second.layout.wallColliders;
    for (const firstWall of firstWalls) {
      const firstPlane = wallPlane(first, firstWall);
      for (const secondWall of secondWalls) {
        const overlapArea = wallPlaneOverlapArea(firstPlane, wallPlane(second, secondWall));
        assert(
          overlapArea <= .001,
          `${first.id}/${firstWall.id} and ${second.id}/${secondWall.id} render ${overlapArea.toFixed(3)} m² coplanar`,
        );
      }
    }
  };
  for (let first = 0; first < persistentNodes.length; first += 1) {
    for (let second = first + 1; second < persistentNodes.length; second += 1) {
      assertNoCoplanarRenderOverlap(persistentNodes[first], persistentNodes[second]);
    }
  }
  const curatedNodes = MUSEUM_RUNTIME_NODES.filter(({publicHallId}) => publicHallId);
  for (const persistent of persistentNodes) {
    for (const curated of curatedNodes) assertNoCoplanarRenderOverlap(persistent, curated);
  }
  assert.match(buildingArchitectureSource, /MUSEUM_CIRCULATION_NODES\.map/, 'Persistent building architecture is not manifest-driven');
  assert.match(buildingArchitectureSource, /MUSEUM_BUILDING_MANIFEST\.reserves\.map/, 'Closed reserve walls are not rendered from the manifest');
});

check('Grand Entrance is a legible ceremonial threshold rather than an undecorated circulation box', () => {
  const entranceNode = runtimeNodeById.get(MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId);
  const entranceManifestNode = MUSEUM_BUILDING_MANIFEST.nodes.find(
    ({id}) => id === MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId,
  );
  const publicEntry = entranceNode?.entrances.find(({id}) => id === 'public-entry');
  const firstGalleryRoute = entranceNode?.entrances.find(({id}) => id === 'through-route');
  const publicEntrySlot = entranceManifestNode?.doorwaySlots.find(({id}) => id === 'public-entry');
  const firstGalleryRouteSlot = entranceManifestNode?.doorwaySlots.find(({id}) => id === 'through-route');
  assert(entranceNode && entranceManifestNode && publicEntry && firstGalleryRoute, 'Grand Entrance threshold geometry is incomplete');
  assert.deepEqual(
    entranceManifestNode.geometry?.cells[0]?.bounds,
    {minX: -20, maxX: 20, minZ: -28, maxZ: 28},
    'Grand Entrance changed its approved 40 × 56 m envelope',
  );
  assert.equal(publicEntrySlot?.clearWidth, 4, 'Grand Entrance public threshold lost its 4 m clear width');
  assert.equal(firstGalleryRouteSlot?.clearWidth, 4, 'Gallery 01 threshold lost its 4 m clear width');
  assert.match(buildingArchitectureSource, /<MuseumGrandEntranceArchitecture node=\{node\}\/>/u, 'Grand Entrance set piece is not mounted in persistent architecture');
  for (const feature of [
    'public-threshold',
    'arrival-axis',
    'orientation-oculus',
    'gallery-one-portal',
    'coffered-ceiling',
  ]) {
    assert.match(
      grandEntranceArchitectureSource,
      new RegExp(`museumEntranceFeature: '${feature}'`, 'u'),
      `Grand Entrance lacks its ${feature} visual landmark`,
    );
  }
  assert.match(grandEntranceArchitectureSource, /museumEntrance: 'ceremonial-threshold-sequence'/u, 'Grand Entrance has no authored arrival sequence');
  assert.doesNotMatch(grandEntranceArchitectureSource, /\bonClick\b|\bonPointer/u, 'Static entrance architecture masquerades as an interactive control');
  assert.match(buildingArchitectureSource, /Gallery 01 · Mediterranean beginnings/u, 'Grand Entrance does not identify the first chronological threshold');
});

check('Gallery 01 has bounded authored curation, visitor-facing orientation, and a clear first connector', () => {
  const hall = hallById.get(MEDITERRANEAN_GALLERY_ID);
  const definition = definitionById.get(MEDITERRANEAN_GALLERY_ID);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === MEDITERRANEAN_GALLERY_ID);
  assert(hall && definition && program);

  const curationEntries = Object.entries(MEDITERRANEAN_EXHIBIT_CURATION);
  const exhibitLayoutById = new Map(definition.layout.exhibits.map((layout) => [layout.id, layout]));
  assert.equal(curationEntries.length, 22, 'Gallery 01 must retain exactly 22 authored curation entries');
  assert.deepEqual(sorted(curationEntries.map(([id]) => id)), sorted(hall.exhibits.map(({id}) => id)), 'Gallery 01 curation ids differ from its public exhibits');
  assert.deepEqual(sorted(Object.keys(MEDITERRANEAN_ROOM_SIGN_COPY)), sorted(program.rooms.map(({id}) => id)), 'Gallery 01 visitor sign copy differs from its four rooms');
  for (const [id, curation] of curationEntries) {
    const layout = exhibitLayoutById.get(id);
    assert(layout, `${id} has no physical Gallery 01 exhibit layout`);
    assert([curation.authored.x, curation.authored.z, curation.authored.rotationY].every(Number.isFinite), `${id} has an invalid authored placement`);
    assert(curation.publicKicker.trim().length >= 12, `${id} lacks visitor-facing context`);
    assert(curation.groupLabel.trim().length >= 8 && curation.visualKind.trim(), `${id} lacks an interpretive visual grouping`);
    assert(layout.scene.mediaMounts.length > 0, `${id} has no provenance-backed physical image`);
    assert(!('generatedMedia' in curation), `${id} still substitutes a generated diagram for sourced media`);
  }
  assert.equal(definition.layout.exhibits.filter(({scene}) => scene.mediaMounts.length > 0).length, 22, 'Every Gallery 01 exhibit must retain provenance-backed scene media');
  assert.equal(definition.layout.exhibits.reduce((sum, {scene}) => sum + scene.mediaMounts.length, 0), 25, 'Gallery 01 media-placement count changed');
  assert.equal(curationEntries.filter(([, curation]) => curation.frontTitle).length, 6, 'Gallery 01 question-first hierarchy changed');
  assert.deepEqual(MEDITERRANEAN_EXHIBIT_CURATION.anaxagoras.authored, {x: -5.8, z: -1.15, rotationY: Math.PI}, 'Anaxagoras returned to the crowded side-wall sightline');

  const entranceNode = runtimeNodeById.get(MUSEUM_VISITOR_MAP_KIOSK.nodeId);
  const galleryNode = MUSEUM_RUNTIME_NODES.find(({publicHallId}) => publicHallId === MEDITERRANEAN_GALLERY_ID);
  const orientation = definition.layout.furnishings.find(({id}) => id === MEDITERRANEAN_ORIENTATION_DISPLAY.id);
  assert(entranceNode, 'The Grand Entrance runtime node is absent');
  assert(galleryNode, 'Gallery 01 has no runtime building node');
  assert.equal(entranceNode.kind, 'entrance');
  assert.deepEqual(orientation, MEDITERRANEAN_ORIENTATION_DISPLAY, 'Gallery 01 orientation display is absent or stale');
  assert(definition.layout.obstacleColliders.some(({id}) => id === orientation.id), 'Gallery 01 orientation display is absent from collision');
  assert(
    isValidMuseumPosition(
      MUSEUM_VISITOR_MAP_KIOSK.approachPose,
      entranceNode.layout.playerRadius,
      entranceNode.layout.bounds,
      allColliders(entranceNode.layout),
      entranceNode.layout.spatialCells,
    ),
    'Grand Entrance map approach is unsafe',
  );
  assert.deepEqual(definition.layout.spawnFocalPoint, MEDITERRANEAN_ORIENTATION_DISPLAY.center, 'Gallery 01 spawn does not focus its local orientation landmark');
  const chronologicalEntry = galleryNode.entrances.find(({id}) => id === galleryNode.routePortals.entry);
  assert(chronologicalEntry, 'Gallery 01 chronological route entry is absent');
  const entryVector = {
    x: chronologicalEntry.arrivalPose.x - orientation.center.x,
    z: chronologicalEntry.arrivalPose.z - orientation.center.z,
  };
  const entryDistance = Math.hypot(entryVector.x, entryVector.z);
  const orientationFront = {
    x: Math.sin(orientation.rotation),
    z: Math.cos(orientation.rotation),
  };
  assert(
    (orientationFront.x * entryVector.x + orientationFront.z * entryVector.z) / entryDistance > .9,
    'Gallery 01 “From Nature to the Examined Life” sign faces away from the chronological entrance',
  );
  assert(
    Number.isFinite(definition.layout.spawnFocalPoint.x)
      && Number.isFinite(definition.layout.spawnFocalPoint.z),
    'Gallery 01 local orientation focal point is invalid',
  );

  const forbiddenPublicLabels = /anchor[-\s]+exhibit|standard[-\s]+individual[-\s]+exhibit|supporting[-\s]+exhibit|thematic[-\s]+cluster[-\s]+participant|gallery[-\s]+archive[-\s]+or[-\s]+study[-\s]+wall[-\s]+record|(?:anchor|standard)[-\s]+bay|(?:supporting|cluster)[-\s]+panel|archive[-\s]+label|presentation\s+tier|gallery\s+installation/i;
  assert.doesNotMatch(canonicalExhibitsSource, /kicker:\s*[^\n]*(?:presentationTier|treatment)/u, 'Public exhibit name strips expose internal tier or treatment fields');
  assert.doesNotMatch(museumPageSource, /item\.tier\.replaceAll/u, 'The public directory exposes internal exhibit tiers');
  assert.doesNotMatch(interpretationPanelSource, /content\.tier\.replaceAll/u, 'The interpretation panel exposes internal exhibit tiers');
  for (const interpretation of MUSEUM_INTERPRETATIONS) assert.doesNotMatch(interpretation.lead, forbiddenPublicLabels, `${interpretation.hallId}/${interpretation.id} lead exposes internal presentation language`);
  assert.match(canonicalSceneSource, /<MediterraneanGalleryCuration\/>/u, 'Gallery 01 does not render its authored orientation display');
  assert.doesNotMatch(canonicalSceneSource, /MuseumVisitorMapKiosk/u, 'The visitor map is still owned by Gallery 01 content');
  assert.match(buildingArchitectureSource, /<MuseumVisitorMapKiosk/u, 'The Grand Entrance does not own the persistent visitor map');
  assert.doesNotMatch(canonicalExhibitsSource, /MediterraneanExhibitMedia/u, 'Gallery 01 still renders diagram substitutes');
  assert.match(canonicalExhibitsSource, /<MediterraneanFinishedBack/u, 'Gallery 01 exhibit backs are unfinished');
  assert.match(canonicalExhibitsSource, /theme:\s*'mediterranean'/u, 'Gallery 01 interpretation faces do not opt into their curatorial palette');
  assert.doesNotMatch(canonicalExhibitsSource, /MediterraneanExhibitObject/u, 'Gallery 01 still renders the generic object template');
  assert.doesNotMatch(mediterraneanMediaSource, /torus(?:Knot)?Geometry|sphereGeometry/u, 'Gallery 01 media reintroduces unsupported floating sculpture geometry');
  assert.match(mediterraneanCurationSource, /createFrontTexture/u, 'Gallery 01 opening installation has no front-side story');
  assert.doesNotMatch(mediterraneanCurationSource, /createBackTexture/u, 'Gallery 01 opening installation restored unwanted reverse-side content');
  assert.equal([...mediterraneanCurationSource.matchAll(/<MuseumSceneMedia\b/gu)].length, 1, 'Gallery 01 opening installation must retain one local gallery-level image mount');
  assert.doesNotMatch(
    architectureSource,
    /MediterraneanSignRear|Continue through Gallery 01|Return to the Museum Ring/u,
    'Gallery 01 sign backs regressed to full-wall route slogans',
  );
  assert.equal(definition.layout.signs.length, 4, 'Gallery 01 must retain its entrance sign and the three approved physical room signs');
  const entranceSign = definition.layout.signs.find(({kind}) => kind === 'entrance');
  assert(entranceSign && entranceSign.width === 3.4 && entranceSign.height === .7, 'Gallery 01 entrance sign returned to its oversized treatment');
  assert(!definition.layout.signs.some(({id}) => id === 'med-sophists-socratic:room-sign'), 'The removed Room 03 physical sign returned');
  assert.equal(definition.layout.signs.find(({id}) => id === 'med-being-change-plurality:room-sign')?.position.z, -14.22, 'Room 02 sign is not mounted on its Room 01 approach face');
  assert.equal(definition.layout.signs.find(({id}) => id === 'med-plato-aristotle:room-sign')?.position.z, 13.78, 'Room 04 sign is not mounted on its Room 03 approach face');
  const gallery01NaturalApproachZ = [-27.2, -13.2, .8, 14.8];
  for (const [index, view] of definition.layout.entryViews.entries()) {
    const cell = definition.layout.spatialCells.find(({id}) => id === view.spatialCellId);
    assert(cell, `Gallery 01 entry view ${view.spatialCellId} has no room`);
    assert(Math.abs(view.pose.x) < .001, `${view.spatialCellId} no longer stages the central chronological route`);
    assert(Math.abs(view.pose.z - gallery01NaturalApproachZ[index]) < .001, `${view.spatialCellId} no longer stages its natural threshold approach`);
    assert(Math.abs(view.pose.yaw - Math.PI) < .001, `${view.spatialCellId} no longer faces along the authored Gallery 01 route`);
  }
  for (const sign of definition.layout.signs) {
    assert.doesNotMatch(`${sign.kicker} ${sign.title} ${sign.subtitle}`, forbiddenPublicLabels, `${sign.id} exposes internal presentation language`);
    const front = {x: Math.sin(sign.rotationY), z: Math.cos(sign.rotationY)};
    const approach = {
      x: sign.position.x,
      z: sign.position.z + (sign.id === 'med-orientation-nature:room-sign' ? 2 : -2),
    };
    assert(front.x * (approach.x - sign.position.x) + front.z * (approach.z - sign.position.z) > 0, `${sign.id} does not face the forward visitor approach`);
  }

  const entranceConnection = MUSEUM_BUILDING_MANIFEST.connections.find(({a, b}) =>
    [a.nodeId, b.nodeId].includes(MUSEUM_VISITOR_MAP_KIOSK.nodeId)
    && [a.nodeId, b.nodeId].includes(definition.physicalNodeId));
  assert(entranceConnection?.accessible && entranceConnection.implementationStatus === 'live', 'Grand Entrance does not connect physically to Gallery 01');
});

check('Plato’s Cave and Republic form a substantial supplemental U without entering the primary program', () => {
  const definition = definitionById.get(MEDITERRANEAN_GALLERY_ID);
  const hall = hallById.get(MEDITERRANEAN_GALLERY_ID);
  assert(definition && hall);
  const supplemental = definition.layout.supplementalExhibits ?? [];
  const stableIds = ['plato-cave-book-vii', 'plato-republic'];
  assert.equal(supplemental.length, 2, 'Gallery 01 must have exactly two supplemental Plato work exhibits');
  assert.deepEqual(sorted(supplemental.map(({id}) => id)), stableIds);
  assert.deepEqual(supplemental, PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS);
  assert.deepEqual(sorted(PLATO_SUPPLEMENTAL_EXHIBITS.map(({id}) => id)), stableIds);
  assert.equal(new Set(supplemental.map(({assetId}) => assetId)).size, 2, 'The Plato works need distinct media');
  assert(!hall.exhibits.some(({id}) => stableIds.includes(id)), 'A supplemental Plato work entered the public primary catalog');
  assert(!definition.layout.guidedOrder.some((id) => stableIds.includes(id)), 'A supplemental Plato work entered the canonical guided order');
  assert(!MUSEUM_INTERPRETATIONS.some(({id}) => stableIds.includes(id)), 'A supplemental Plato work entered the primary interpretation registry');

  assert.deepEqual(MEDITERRANEAN_EXHIBIT_CURATION.platonism.authored, {x: -10.85, z: 18, rotationY: Math.PI / 2}, 'The principal Platonism wall moved');
  assert.deepEqual(MEDITERRANEAN_EXHIBIT_CURATION.plato.authored, {x: -10.85, z: 24, rotationY: Math.PI / 2}, 'The principal Plato wall moved');
  assert.deepEqual(MEDITERRANEAN_EXHIBIT_CURATION.aristotelianism.authored, {x: 10.85, z: 18, rotationY: -Math.PI / 2}, 'The Aristotle half-room moved');
  assert.deepEqual(MEDITERRANEAN_EXHIBIT_CURATION.aristotle.authored, {x: 10.85, z: 24, rotationY: -Math.PI / 2}, 'The Aristotle half-room moved');

  const byId = new Map(supplemental.map((layout) => [layout.id, layout]));
  const republic = byId.get('plato-republic');
  const cave = byId.get('plato-cave-book-vii');
  assert(republic && cave);
  approx(republic.position.x, -6.45, 'Republic side-wall x');
  approx(cave.position.x, -6.45, 'Cave side-wall x');
  assert(republic.position.z < 16 && cave.position.z > 26, 'The two work exhibits no longer bracket the Plato wall');
  approx(republic.rotationY, 0, 'Republic inward-facing rotation');
  approx(cave.rotationY, Math.PI, 'Cave inward-facing rotation');
  assert(distance(republic.position, cave.position) > 11, 'The opposing work exhibits collapsed into one wall');
  for (const layout of supplemental) {
    assert.equal(layout.parentExhibitId, 'plato', `${layout.id} lost its supplemental Plato parent`);
    assert.equal(layout.zoneId, 'med-plato-aristotle', `${layout.id} left Room 04`);
    assert.equal(layout.spatialCellId, 'med-plato-aristotle', `${layout.id} left the Room 04 spatial cell`);
    assert(layout.position.x + layout.footprint.width / 2 < -4, `${layout.id} intrudes into the central circulation/sightline`);
    assert(layout.footprint.width >= 4.7 && layout.footprint.height >= 4.5, `${layout.id} is not visually substantial`);
    assert(layout.mediaMount.width >= 2 && layout.mediaMount.height >= 2.8, `${layout.id} media is too slight`);
    assert.equal(layout.mediaMount.assetId, layout.assetId, `${layout.id} media and prefetch assets differ`);
    assert(assetById.has(layout.assetId), `${layout.id} mounts missing asset ${layout.assetId}`);
    assert(definition.layout.obstacleColliders.some(({id}) => id === layout.collider.id), `${layout.id} is absent from collision`);
    assert(validPose(definition, layout.viewpoint), `${layout.id} has an unsafe viewing pose`);
  }

  for (const exhibit of PLATO_SUPPLEMENTAL_EXHIBITS) {
    assert.equal(exhibit.articleRoute.kind, 'philosopher');
    assert.equal(exhibit.articleRoute.philosopherId, 'plato');
    assert.match(exhibit.dateLabel, /uncertain/i, `${exhibit.id} overstates its composition date`);
    assert(exhibit.keyIdeas.length >= 5, `${exhibit.id} lacks a usable argument map`);
    assert(exhibit.cautions.length >= 3, `${exhibit.id} lacks historical or interpretive caveats`);
    assert(exhibit.sections.length >= 3, `${exhibit.id} interpretation is too shallow`);
    assert(wordCount(`${exhibit.lead} ${exhibit.sections.flatMap(({paragraphs}) => paragraphs).join(' ')}`) >= 150, `${exhibit.id} interpretation is too brief`);
    assert(exhibit.sources.some(({kind}) => kind === 'primary-text'), `${exhibit.id} lacks a primary-text link`);
    assert(exhibit.sources.some(({kind}) => kind === 'academic-reference'), `${exhibit.id} lacks an academic reference`);
  }
  assert.match(PLATO_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === 'plato-cave-book-vii').lead, /not merely saying that ordinary reality is an illusion/i);
  assert.match(PLATO_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === 'plato-republic').cautions.join(' '), /hierarchy|censorship|concentrated power|coercive/i);
  assert.match(platoSupplementalDataSource, /outside the canonical program so the Museum retains a truthful primary roster/u);
  assert.match(canonicalSceneSource, /<PlatoSupplementalExhibits/u, 'Gallery 01 does not mount the two work exhibits');
  assert.match(platoSupplementalSceneSource, /onClick=\{activate\}/u, 'The supplemental installations lack normal mouse activation');
  assert.match(platoSupplementalSceneSource, /interactionForSupplemental/u, 'The supplemental installations lack stable interaction identity');
  assert.match(museumPageSource, /Press E or Enter to open the supplemental exhibit/u, 'The shared keyboard interaction does not announce the supplemental exhibits');
  assert.match(museumPageSource, /onSelectSupplementalExhibit=/u, 'Mouse selection is not routed into the supplemental panel');
  assert.match(supplementalPanelSource, /Open Plato’s full Atlas article/u, 'The supplemental panel lacks its full Plato article route');
  assert.match(supplementalPanelSource, /MuseumSourceDetails/u, 'The supplemental panel does not expose media provenance');
  assert.match(supplementalPanelSource, /event\.key === 'Escape'/u, 'The supplemental panel lacks its keyboard close path');
});

check('all 385 supplemental exhibits share route, directory, search, guided, and fallback contracts', () => {
  assert.equal(MUSEUM_SUPPLEMENTAL_EXHIBITS.length, 385);
  assert.equal(MUSEUM_INTERPRETATIONS.length, 186, 'Every canonical installation needs one interpretation');
  assert.equal(MUSEUM_INTERPRETATIONS.length + MUSEUM_SUPPLEMENTAL_EXHIBITS.length, 571, 'The directory interpreted-stop count changed');
  assert.equal(
    new Set(MUSEUM_SUPPLEMENTAL_EXHIBITS.map(({exhibit}) => exhibit.id)).size,
    MUSEUM_SUPPLEMENTAL_EXHIBITS.length,
    'Supplemental exhibit ids must remain globally unique',
  );

  for (const {hallId, exhibit, layout} of MUSEUM_SUPPLEMENTAL_EXHIBITS) {
    const hall = hallById.get(hallId);
    const definition = definitionById.get(hallId);
    assert(hall && definition, `${exhibit.id} points to an unknown live hall`);
    const localParent = hall.exhibits.some(({id}) => id === layout.parentExhibitId);
    assert(
      localParent || (
        hallId === 'core-questions-forum'
        && layout.guidedAfterExhibitId
        && hall.exhibits.some(({id}) => id === layout.guidedAfterExhibitId)
      ),
      `${exhibit.id} has no local parent or Forum tour anchor`,
    );
    assert(hall.zones.some(({id}) => id === layout.zoneId), `${exhibit.id} has no live room`);
    assert(definition.layout.supplementalExhibits?.some(({id}) => id === exhibit.id), `${exhibit.id} is absent from its hall layout`);
    assert(!hall.exhibits.some(({id}) => id === exhibit.id), `${exhibit.id} collides with a primary exhibit id`);
    assert(exhibit.keyIdeas.length >= 3, `${exhibit.id} lacks a usable idea map`);
    assert(exhibit.cautions.length >= 2, `${exhibit.id} lacks interpretive cautions`);
    const compactComparativeLens = hallId === 'core-questions-forum';
    assert(exhibit.sections.length >= (compactComparativeLens ? 2 : 3), `${exhibit.id} interpretation is too shallow`);
    assert(exhibit.sources.length >= 2, `${exhibit.id} lacks a useful source layer`);
    assert(
      wordCount(`${exhibit.lead} ${exhibit.sections.flatMap(({paragraphs}) => paragraphs).join(' ')}`) >= (compactComparativeLens ? 80 : 120),
      `${exhibit.id} interpretation is too brief`,
    );
  }

  for (const hall of MUSEUM_HALLS) {
    const supplemental = MUSEUM_SUPPLEMENTAL_EXHIBITS.filter(({hallId}) => hallId === hall.id);
    const guided = getMuseumGuidedStops(hall.id, hall.guidedOrder);
    assert.equal(guided.length, hall.guidedOrder.length + supplemental.length, `${hall.id} guided stop count is stale`);
    for (const {exhibit, layout} of supplemental) {
      const guidedAnchorId = layout.guidedAfterExhibitId ?? layout.parentExhibitId;
      const primaryIndex = guided.findIndex(({kind, exhibitId}) =>
        kind === 'primary' && exhibitId === guidedAnchorId);
      const supplementalIndex = guided.findIndex(({kind, exhibitId}) =>
        kind === 'supplemental' && exhibitId === exhibit.id);
      assert(primaryIndex >= 0 && supplementalIndex > primaryIndex, `${exhibit.id} is not guided after its tour anchor`);
    }
  }

  assert.match(hashRouterSource, /isMuseumSupplementalExhibitId/u, 'Supplemental ids are not accepted by the Museum route guard');
  assert.match(museumPageSource, /getMuseumSupplementalExhibitsForHall/u, 'The directory/fallback does not enumerate supplemental exhibits');
  assert.match(museumPageSource, /getMuseumGuidedStops/u, 'Guided mode does not include supplemental exhibits');
  assert.match(globalSearchSource, /MUSEUM_SUPPLEMENTAL_EXHIBITS/u, 'Global search does not index supplemental exhibits');
  assert.match(supplementalPanelSource, /onClose\('history'\)/u, 'Supplemental Escape behavior does not use history-aware closing');
  assert.match(supplementalPanelSource, /museum-guided-controls/u, 'Supplemental panels lack guided navigation');
});

check('Gallery 03 gives every unobstructed half-room wall one substantial exhibit', () => {
  const hallId = 'phenomenology-existence-embodiment';
  const hall = hallById.get(hallId);
  const definition = definitionById.get(hallId);
  assert(hall && definition);
  const supplemental = MUSEUM_SUPPLEMENTAL_EXHIBITS.filter((entry) => entry.hallId === hallId);
  assert.equal(hall.exhibits.length, 9, 'Gallery 03 primary catalog changed');
  assert.equal(supplemental.length, 20, 'Gallery 03 must have twenty bounded supplemental stops');
  assert.equal(definition.layout.supplementalExhibits?.length, 20, 'Gallery 03 scene layout is missing supplemental stops');

  const expectedPrimaryCounts = new Map([
    ['phenomenology-method', 2],
    ['phenomenology-being-embodiment', 2],
    ['existentialism-freedom', 2],
    ['existentialism-situated-absurd', 1],
    ['phenomenology-interpretation-alterity', 2],
  ]);
  const expectedSupplementalCounts = new Map([
    ['phenomenology-method', 4],
    ['phenomenology-being-embodiment', 4],
    ['existentialism-freedom', 3],
    ['existentialism-situated-absurd', 5],
    ['phenomenology-interpretation-alterity', 4],
  ]);
  const expectedWallSlots = new Map([
    ['phenomenology-method', ['north-west', 'outer-west', 'south-west', 'north-east', 'outer-east', 'south-east']],
    ['phenomenology-being-embodiment', ['north-west', 'outer-west', 'south-west', 'north-east', 'outer-east', 'south-east']],
    ['existentialism-freedom', ['north-west', 'south-west', 'north-east', 'outer-east', 'south-east']],
    ['existentialism-situated-absurd', ['north-west', 'outer-west', 'south-west', 'north-east', 'outer-east', 'south-east']],
    ['phenomenology-interpretation-alterity', ['north-west', 'outer-west', 'south-west', 'north-east', 'outer-east', 'south-east']],
  ]);
  const wallSlotFor = (layout) => {
    const side = layout.position.x < 0 ? 'west' : 'east';
    const sine = Math.sin(layout.rotationY);
    if (Math.abs(sine) > .5) return sine > 0 ? 'outer-west' : 'outer-east';
    return `${Math.cos(layout.rotationY) > 0 ? 'north' : 'south'}-${side}`;
  };
  for (const zone of hall.zones) {
    const primaryCount = hall.exhibits.filter(({zoneId}) => zoneId === zone.id).length;
    const roomSupplemental = supplemental.filter(({layout}) => layout.zoneId === zone.id);
    const supplementalCount = roomSupplemental.length;
    assert.equal(primaryCount, expectedPrimaryCounts.get(zone.id), `${zone.id} primary count changed`);
    assert.equal(supplementalCount, expectedSupplementalCounts.get(zone.id), `${zone.id} supplemental count is stale`);
    assert.equal(
      primaryCount + supplementalCount,
      expectedWallSlots.get(zone.id)?.length,
      `${zone.id} interpreted-stop count is stale`,
    );
    const roomLayouts = [
      ...definition.layout.exhibits.filter(({spatialCellId}) => spatialCellId === zone.id),
      ...roomSupplemental.map(({layout}) => layout),
    ];
    const occupiedSlots = roomLayouts.map(wallSlotFor);
    assert.equal(
      new Set(occupiedSlots).size,
      roomLayouts.length,
      `${zone.id} places more than one exhibit on a wall face`,
    );
    assert.deepEqual(
      [...new Set(occupiedSlots)].sort(),
      [...(expectedWallSlots.get(zone.id) ?? [])].sort(),
      `${zone.id} leaves a usable wall face blank or occupies a portal wall`,
    );
  }

  const existentialism = definition.layout.exhibits.find(({id}) => id === 'existentialism');
  const sartre = definition.layout.exhibits.find(({id}) => id === 'sartre');
  const sartreHumanism = supplemental.find(({exhibit}) => exhibit.id === 'sartre-existentialism-humanism');
  assert(existentialism && sartre && sartreHumanism, 'The Existentialism/Sartre room hierarchy is incomplete');
  assert.deepEqual(existentialism.position, {x: -6, z: -4.45}, 'Existentialism moved despite the doorway exception');
  assert.equal(wallSlotFor(existentialism), 'north-west', 'Existentialism no longer uses its doorway-exception wall');
  assert.equal(wallSlotFor(sartre), 'outer-east', 'Sartre is not on the intact primary wall');
  assert.equal(wallSlotFor(sartreHumanism.layout), 'north-east', 'Sartre’s former wall lacks its secondary exhibit');
  assert.match(sartreHumanism.exhibit.displayName, /^Sartre:/, 'The new secondary does not clearly belong to Sartre');

  const beauvoir = supplemental.find(({exhibit}) => exhibit.id === 'beauvoir-ethics-ambiguity');
  assert(beauvoir, 'Gallery 03 lost Beauvoir’s anchor-strength secondary');
  assert.equal(beauvoir.layout.zoneId, 'existentialism-situated-absurd');
  assert.deepEqual(beauvoir.exhibit.articleRoute, {kind: 'philosopher', philosopherId: 'beauvoir'});
  assert.match(beauvoir.exhibit.presentation?.panelKicker ?? '', /anchor secondary/i);
  assert.match(beauvoir.exhibit.presentation?.factRows.map(({value}) => value).join(' ') ?? '', /Feminist Philosophies remains primary/i);
  assert.match(beauvoir.exhibit.lead, /not as an appendix to Sartre/i);

  for (const {exhibit, layout} of supplemental) {
    assert(assetById.has(exhibit.assetId), `${exhibit.id} uses missing scene asset ${exhibit.assetId}`);
    assert(assetById.has(exhibit.panelAssetId), `${exhibit.id} uses missing panel asset ${exhibit.panelAssetId}`);
    assert.equal(layout.assetId, exhibit.assetId, `${exhibit.id} scene and interpretation assets diverge`);
    assert.equal(layout.mediaMount.assetId, layout.assetId, `${exhibit.id} prefetch and media assets diverge`);
    assert(definition.layout.obstacleColliders.some(({id}) => id === layout.collider.id), `${exhibit.id} is absent from collision`);
    assert(validPose(definition, layout.viewpoint), `${exhibit.id} has an unsafe viewing pose`);
    assert(layout.footprint.width >= 4.3 && layout.footprint.height >= 4.4, `${exhibit.id} is visually slight`);
    assert(layout.mediaMount.width >= 2.1 && layout.mediaMount.height >= 2.2, `${exhibit.id} media is too small to read`);
  }

  const levinas = supplemental.find(({exhibit}) => exhibit.id === 'levinas-ethics-before-ontology')?.exhibit;
  const gadamer = supplemental.find(({exhibit}) => exhibit.id === 'gadamer-truth-method')?.exhibit;
  assert.equal(levinas?.assetId, 'levinas-totality-infinity-2002');
  assert.match(`${levinas?.lead} ${levinas?.cautions.join(' ')}`, /German study edition|1961 French first edition/i);
  assert.equal(gadamer?.assetId, 'gadamer-letter-pawliszyn');
  assert.match(`${gadamer?.lead} ${gadamer?.cautions.join(' ')}`, /signed 1989 letter|scholarly correspondence/i);
  assert.match(canonicalSceneSource, /<PhenomenologySupplementalExhibits/u, 'Gallery 03 does not mount its shared supplemental collection');
  assert.match(phenomenologySupplementalSceneSource, /onClick=\{activate\}/u, 'Gallery 03 supplemental installations lack mouse activation');
  assert.match(phenomenologySupplementalSceneSource, /interactionForSupplemental/u, 'Gallery 03 supplemental installations lack stable interaction identity');
  assert.match(phenomenologySupplementalDataSource, /Room 01 · Attend[\s\S]*Room 05 · Answer/u, 'Gallery 03 room sequence copy is incomplete');
});

check('Gallery 04 fills twenty-nine usable wall faces with resolved, philosopher-led installations', () => {
  const hallId = 'analytic-traditions';
  const hall = hallById.get(hallId);
  const definition = definitionById.get(hallId);
  assert(hall && definition);
  const supplemental = MUSEUM_SUPPLEMENTAL_EXHIBITS.filter((entry) => entry.hallId === hallId);
  assert.equal(hall.exhibits.length, 7, 'Gallery 04 primary catalog changed');
  assert.equal(ANALYTIC_SUPPLEMENTAL_EXHIBITS.length, 22, 'Gallery 04 must define twenty-two supplemental exhibits');
  assert.equal(ANALYTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS.length, 22, 'Gallery 04 must define twenty-two supplemental layouts');
  assert.equal(supplemental.length, 22, 'Gallery 04 supplemental registry is stale');
  assert.equal(definition.layout.supplementalExhibits?.length, 22, 'Gallery 04 scene layout is missing supplemental stops');

  const exhibitIds = sorted(ANALYTIC_SUPPLEMENTAL_EXHIBITS.map(({id}) => id));
  const layoutIds = sorted(ANALYTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({id}) => id));
  assert.deepEqual(layoutIds, exhibitIds, 'Gallery 04 exhibit and layout ids diverge');
  assert.deepEqual(
    sorted(supplemental.map(({exhibit}) => exhibit.id)),
    exhibitIds,
    'Gallery 04 central registry does not resolve every supplemental layout',
  );

  const philosopherPrefix = new Map([
    ['frege', 'Frege'],
    ['russell', 'Russell'],
    ['moore', 'Moore'],
    ['wittgenstein', 'Wittgenstein'],
    ['quine', 'Quine'],
    ['carnap', 'Carnap'],
    ['anscombe', 'Anscombe'],
  ]);
  for (const exhibit of ANALYTIC_SUPPLEMENTAL_EXHIBITS) {
    const prefix = philosopherPrefix.get(exhibit.id.split('-')[0]);
    assert(prefix, `${exhibit.id} has no named-philosopher title contract`);
    assert(
      exhibit.displayName.startsWith(`${prefix}:`) || exhibit.displayName.startsWith(`${prefix} and `),
      `${exhibit.id} title must begin with ${prefix}`,
    );
  }

  const expectedWallSlots = new Map([
    ['analytic-origins-foundations', ['north-west', 'outer-west', 'south-west', 'north-east', 'outer-east', 'south-east']],
    ['analytic-common-sense-metaethics', ['north-west', 'outer-west', 'south-west', 'north-east', 'outer-east', 'south-east']],
    ['analytic-wittgenstein', ['north-west', 'outer-west', 'south-west', 'north-east', 'south-east']],
    ['analytic-naturalism', ['north-west', 'outer-west', 'south-west', 'north-east', 'outer-east', 'south-east']],
    ['analytic-action-intention', ['north-west', 'outer-west', 'south-west', 'north-east', 'outer-east', 'south-east']],
  ]);
  const wallSlotFor = (layout) => {
    const side = layout.position.x < 0 ? 'west' : 'east';
    const sine = Math.sin(layout.rotationY);
    if (Math.abs(sine) > .5) return sine > 0 ? 'outer-west' : 'outer-east';
    return `${Math.cos(layout.rotationY) > 0 ? 'north' : 'south'}-${side}`;
  };
  let installationCount = 0;
  for (const zone of hall.zones) {
    const roomLayouts = [
      ...definition.layout.exhibits.filter(({spatialCellId}) => spatialCellId === zone.id),
      ...supplemental.filter(({layout}) => layout.zoneId === zone.id).map(({layout}) => layout),
    ];
    installationCount += roomLayouts.length;
    const occupiedSlots = roomLayouts.map(wallSlotFor);
    assert.equal(new Set(occupiedSlots).size, roomLayouts.length, `${zone.id} repeats a wall face`);
    assert.deepEqual(
      sorted(occupiedSlots),
      sorted(expectedWallSlots.get(zone.id) ?? []),
      `${zone.id} does not match its usable wall faces`,
    );
  }
  assert.equal(installationCount, 29, 'Gallery 04 must fill exactly twenty-nine usable wall faces');

  for (const {exhibit, layout} of supplemental) {
    assert.equal(layout.assetId, exhibit.assetId, `${exhibit.id} scene and interpretation assets diverge`);
    assert.equal(layout.mediaMount.assetId, layout.assetId, `${exhibit.id} prefetch and media assets diverge`);
    assert(definition.layout.obstacleColliders.some(({id}) => id === layout.collider.id), `${exhibit.id} is absent from collision`);
    assert(validPose(definition, layout.viewpoint), `${exhibit.id} has an unsafe viewing pose`);
  }
  assert.match(analyticSupplementalDataSource, /Room 01 · Formalize[\s\S]*Room 05 · Act/u, 'Gallery 04 room sequence copy is incomplete');
  if (analyticSupplementalSceneSource) {
    assert.match(canonicalSceneSource, /<AnalyticSupplementalExhibits/u, 'Gallery 04 supplemental renderer exists but is not mounted');
    assert.match(analyticSupplementalSceneSource, /onClick=\{activate\}/u, 'Gallery 04 supplemental installations lack mouse activation');
    assert.match(analyticSupplementalSceneSource, /interactionForSupplemental/u, 'Gallery 04 supplemental installations lack stable interaction identity');
  }
});

check('Gallery 05 fills its exact eighteen-wall civic sequence with clear hierarchy, deep content, and a dedicated renderer', () => {
  const hall = hallById.get(JUSTICE_GALLERY_ID);
  const definition = definitionById.get(JUSTICE_GALLERY_ID);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === JUSTICE_GALLERY_ID);
  assert(hall && definition && program);

  const expectedPrimaryPlacements = {
    'political-philosophy': {x: -10.85, z: -18.667, rotationY: Math.PI / 2},
    arendt: {x: 10.85, z: -18.667, rotationY: -Math.PI / 2},
    rawls: {x: -10.85, z: 0, rotationY: Math.PI / 2},
    nozick: {x: 10.85, z: 0, rotationY: -Math.PI / 2},
    'martha-nussbaum': {x: -10.85, z: 18.667, rotationY: Math.PI / 2},
  };
  const expectedPrimaryAssets = {
    'political-philosophy': 'political-philosophy-good-government',
    arendt: 'arendt-portrait-1933',
    rawls: 'rawls-portrait',
    nozick: 'nozick-portrait',
    'martha-nussbaum': 'martha-nussbaum-portrait-2010',
  };
  const expectedSupplemental = [
    {id: 'political-authority-legitimacy', title: 'Political Philosophy: Authority and Legitimacy', parentId: 'political-philosophy', roomId: 'justice-political-orientation', wallSlot: 'north-west', assetId: 'political-authority-interpretive', articleRoute: {kind: 'branch', branchId: 'political-philosophy'}},
    {id: 'public-action-civil-disobedience', title: 'Political Philosophy: Public Action and Civil Disobedience', parentId: 'political-philosophy', roomId: 'justice-political-orientation', wallSlot: 'south-west', assetId: 'march-washington-leaders-1963', articleRoute: {kind: 'branch', branchId: 'political-philosophy'}},
    {id: 'arendt-human-condition', title: 'Arendt: The Human Condition', parentId: 'arendt', roomId: 'justice-political-orientation', wallSlot: 'north-east', assetId: 'arendt-human-condition-interpretive', articleRoute: {kind: 'philosopher', philosopherId: 'arendt'}},
    {id: 'arendt-eichmann-judgment', title: 'Arendt: Eichmann, Judgment, and Responsibility', parentId: 'arendt', roomId: 'justice-political-orientation', wallSlot: 'south-east', assetId: 'eichmann-trial-1961', articleRoute: {kind: 'philosopher', philosopherId: 'arendt'}},
    {id: 'rawls-theory-of-justice', title: 'Rawls: A Theory of Justice', parentId: 'rawls', roomId: 'justice-distribution-rights', wallSlot: 'north-west', assetId: 'rawls-theory-justice-1971', articleRoute: {kind: 'philosopher', philosopherId: 'rawls'}},
    {id: 'rawls-original-position', title: 'Rawls: The Original Position', parentId: 'rawls', roomId: 'justice-distribution-rights', wallSlot: 'south-west', assetId: 'rawls-original-position-interpretive', articleRoute: {kind: 'philosopher', philosopherId: 'rawls'}},
    {id: 'nozick-anarchy-state-utopia', title: 'Nozick: Anarchy, State, and Utopia', parentId: 'nozick', roomId: 'justice-distribution-rights', wallSlot: 'north-east', assetId: 'nozick-anarchy-state-utopia-1974', articleRoute: {kind: 'philosopher', philosopherId: 'nozick'}},
    {id: 'nozick-entitlement-rectification', title: 'Nozick: Entitlement and Rectification', parentId: 'nozick', roomId: 'justice-distribution-rights', wallSlot: 'south-east', assetId: 'nozick-entitlement-interpretive', articleRoute: {kind: 'philosopher', philosopherId: 'nozick'}},
    {id: 'nussbaum-capabilities-approach', title: 'Nussbaum: The Capabilities Approach', parentId: 'martha-nussbaum', roomId: 'justice-capabilities-democracy', wallSlot: 'north-west', assetId: 'nussbaum-capabilities-interpretive', articleRoute: {kind: 'philosopher', philosopherId: 'martha-nussbaum'}},
    {id: 'nussbaum-frontiers-justice', title: 'Nussbaum: Frontiers of Justice', parentId: 'martha-nussbaum', roomId: 'justice-capabilities-democracy', wallSlot: 'south-west', assetId: 'ada-signing-1990', articleRoute: {kind: 'philosopher', philosopherId: 'martha-nussbaum'}},
    {id: 'amartya-sen-capability-development', title: 'Amartya Sen: Capability and Development', parentId: 'martha-nussbaum', roomId: 'justice-capabilities-democracy', wallSlot: 'north-east', assetId: 'amartya-sen-pmo-2005', articleRoute: {kind: 'branch', branchId: 'political-philosophy'}},
    {id: 'habermas-public-sphere', title: 'Habermas: The Public Sphere', parentId: 'martha-nussbaum', roomId: 'justice-capabilities-democracy', wallSlot: 'south-east', assetId: 'habermas-portrait', articleRoute: {kind: 'philosopher', philosopherId: 'habermas'}},
    {id: 'democratic-deliberation-assembly', title: 'Democratic Deliberation: Assembly and Public Reason', parentId: 'martha-nussbaum', roomId: 'justice-capabilities-democracy', wallSlot: 'outer-east', assetId: 'glarus-landsgemeinde-2009', articleRoute: {kind: 'branch', branchId: 'political-philosophy'}},
  ];
  const expectedPrimaryIdsByRoom = new Map([
    ['justice-political-orientation', ['political-philosophy', 'arendt']],
    ['justice-distribution-rights', ['rawls', 'nozick']],
    ['justice-capabilities-democracy', ['martha-nussbaum']],
  ]);
  const allWallSlots = ['north-west', 'outer-west', 'south-west', 'north-east', 'outer-east', 'south-east'];
  const wallSlotFor = (layout) => {
    const side = layout.position.x < 0 ? 'west' : 'east';
    const sine = Math.sin(layout.rotationY);
    if (Math.abs(sine) > .5) return sine > 0 ? 'outer-west' : 'outer-east';
    return `${Math.cos(layout.rotationY) > 0 ? 'north' : 'south'}-${side}`;
  };

  assert.equal(hall.exhibits.length, 5, 'Gallery 05 primary catalog changed');
  assert.equal(JUSTICE_SUPPLEMENTAL_EXHIBITS.length, 13, 'Gallery 05 must define thirteen supplemental exhibits');
  assert.equal(JUSTICE_SUPPLEMENTAL_EXHIBIT_LAYOUTS.length, 13, 'Gallery 05 must define thirteen supplemental layouts');
  assert.equal(definition.layout.supplementalExhibits?.length, 13, 'Gallery 05 scene layout is missing supplemental stops');
  assert.deepEqual(definition.layout.supplementalExhibits, JUSTICE_SUPPLEMENTAL_EXHIBIT_LAYOUTS, 'Gallery 05 compiled layouts differ from their authored source');
  assert.deepEqual(JUSTICE_PRIMARY_PLACEMENTS, expectedPrimaryPlacements, 'Gallery 05 primary hierarchy moved from its five intact outer walls');
  assert.deepEqual(
    sorted(Object.keys(JUSTICE_ROOM_SIGN_COPY)),
    sorted(program.rooms.map(({id}) => id)),
    'Gallery 05 room-sign copy differs from its three-room sequence',
  );
  assert.deepEqual(
    JUSTICE_SUPPLEMENTAL_EXHIBITS.map(({id}) => id),
    expectedSupplemental.map(({id}) => id),
    'Gallery 05 supplemental content roster or sequence changed',
  );
  assert.deepEqual(
    JUSTICE_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({id}) => id),
    expectedSupplemental.map(({id}) => id),
    'Gallery 05 supplemental layout roster or sequence changed',
  );

  const primaryLayoutById = new Map(definition.layout.exhibits.map((layout) => [layout.id, layout]));
  for (const [id, authored] of Object.entries(expectedPrimaryPlacements)) {
    const layout = primaryLayoutById.get(id);
    const exhibit = hall.exhibits.find((candidate) => candidate.id === id);
    assert(layout && exhibit, `Gallery 05 primary ${id} is missing`);
    assert.deepEqual(
      {x: layout.position.x, z: layout.position.z, rotationY: layout.rotationY},
      authored,
      `${id} moved from its authored primary wall`,
    );
    assert.equal(exhibit.principalAssetId, expectedPrimaryAssets[id], `${id} primary media changed`);
    assert.deepEqual(exhibit.supportingAssetIds ?? [], [], `${id} duplicates work or memorial media on its primary`);
  }
  assert(!JSON.stringify(hall.exhibits).includes('arendt-grave-bard'), 'Gallery 05 restored the Arendt grave image');

  const supplementalRegistry = MUSEUM_SUPPLEMENTAL_EXHIBITS.filter(({hallId}) => hallId === JUSTICE_GALLERY_ID);
  assert.equal(supplementalRegistry.length, 13, 'Gallery 05 central supplemental registry is stale');
  const supplementalById = new Map(supplementalRegistry.map((entry) => [entry.exhibit.id, entry]));
  for (const expected of expectedSupplemental) {
    const entry = supplementalById.get(expected.id);
    assert(entry, `Gallery 05 supplemental ${expected.id} is missing from the central registry`);
    assert.equal(entry.exhibit.displayName, expected.title, `${expected.id} title changed`);
    assert.equal(entry.layout.parentExhibitId, expected.parentId, `${expected.id} lost its primary hierarchy`);
    assert.equal(entry.layout.zoneId, expected.roomId, `${expected.id} moved to the wrong room`);
    assert.equal(entry.layout.spatialCellId, expected.roomId, `${expected.id} moved to the wrong spatial cell`);
    assert.equal(wallSlotFor(entry.layout), expected.wallSlot, `${expected.id} moved to the wrong wall face`);
    assert.equal(entry.exhibit.assetId, expected.assetId, `${expected.id} scene media changed`);
    assert.equal(entry.exhibit.panelAssetId, expected.assetId, `${expected.id} panel media diverges from its scene evidence`);
    assert.equal(entry.layout.assetId, expected.assetId, `${expected.id} layout media diverges from its interpretation`);
    assert.equal(entry.layout.mediaMount.assetId, expected.assetId, `${expected.id} prefetch media diverges from its scene`);
    assert.deepEqual(entry.exhibit.articleRoute, expected.articleRoute, `${expected.id} Atlas route changed`);
    assert(assetById.has(expected.assetId), `${expected.id} uses missing asset ${expected.assetId}`);
    assert(entry.exhibit.keyIdeas.length >= 3, `${expected.id} lacks a three-part argument map`);
    assert(entry.exhibit.cautions.length >= 2, `${expected.id} lacks interpretive cautions`);
    assert(entry.exhibit.sections.length >= 3, `${expected.id} interpretation is too shallow`);
    assert(entry.exhibit.sources.length >= 3, `${expected.id} lacks a rigorous source layer`);
    assert(
      wordCount(`${entry.exhibit.lead} ${entry.exhibit.sections.flatMap(({paragraphs}) => paragraphs).join(' ')}`) >= 180,
      `${expected.id} interpretation is too brief for Gallery 05`,
    );
    assert.equal(entry.exhibit.presentation?.factRows.length, 4, `${expected.id} visitor panel lacks its four-part evidence summary`);
    assert(definition.layout.obstacleColliders.some(({id}) => id === entry.layout.collider.id), `${expected.id} is absent from collision`);
    assert(validPose(definition, entry.layout.viewpoint), `${expected.id} has an unsafe viewing pose`);
  }

  let installationCount = 0;
  for (const room of hall.zones) {
    const primaryIds = hall.exhibits.filter(({zoneId}) => zoneId === room.id).map(({id}) => id);
    assert.deepEqual(primaryIds, expectedPrimaryIdsByRoom.get(room.id), `${room.id} primary hierarchy changed`);
    const roomLayouts = [
      ...definition.layout.exhibits.filter(({spatialCellId}) => spatialCellId === room.id),
      ...supplementalRegistry.filter(({layout}) => layout.zoneId === room.id).map(({layout}) => layout),
    ];
    installationCount += roomLayouts.length;
    const occupiedSlots = roomLayouts.map(wallSlotFor);
    assert.equal(roomLayouts.length, 6, `${room.id} must retain one installation on each usable half-room wall`);
    assert.equal(new Set(occupiedSlots).size, 6, `${room.id} repeats a wall face`);
    assert.deepEqual(sorted(occupiedSlots), sorted(allWallSlots), `${room.id} no longer fills all six wall faces`);
  }
  assert.equal(installationCount, 18, 'Gallery 05 must fill exactly eighteen usable wall faces');

  for (const room of program.rooms) {
    const copy = JUSTICE_ROOM_SIGN_COPY[room.id];
    const sign = definition.layout.signs.find(({id}) => id === `${room.id}:room-sign`);
    assert(copy && sign, `${room.id} lacks its visitor-facing orientation sign`);
    assert.equal(sign.kicker, copy.kicker);
    assert.equal(sign.title, copy.title);
    assert.equal(sign.subtitle, copy.subtitle);
  }
  assert.match(justiceSupplementalDataSource, /Room 01 · Authorize and contest[\s\S]*Room 03 · Enable and deliberate/u, 'Gallery 05 room sequence copy is incomplete');
  assert.equal([...canonicalSceneSource.matchAll(/<JusticeSupplementalExhibits\b/gu)].length, 1, 'Gallery 05 must mount its dedicated supplemental renderer exactly once');
  assert.match(justiceSupplementalSceneSource, /onClick=\{activate\}/u, 'Gallery 05 supplemental installations lack mouse activation');
  assert.match(justiceSupplementalSceneSource, /interactionForSupplemental/u, 'Gallery 05 supplemental installations lack stable interaction identity');
  assert.match(justiceSupplementalSceneSource, /getJusticeSupplementalExhibit/u, 'Gallery 05 renderer does not resolve authored visitor content');
  assert.match(justiceSupplementalSceneSource, /MuseumSceneMedia/u, 'Gallery 05 renderer does not mount its provenance-backed media');
  assert.match(justiceSupplementalSceneSource, /MUSEUM_CANONICAL_EXHIBIT_BACKING_MATERIAL/u, 'Gallery 05 renderer bypasses the canonical primary/secondary hierarchy material');
});

check('Gallery 03 onward makes every primary at least as large as its biggest secondary installation', () => {
  const candidateGalleryIds = Object.entries(EXPECTED_MAP_LABELS)
    .filter(([, label]) => {
      const match = /^Gallery (\d+)/u.exec(label);
      return match && Number(match[1]) >= 3;
    })
    .map(([hallId]) => hallId);
  const enforcedGalleryIds = [];

  for (const hallId of candidateGalleryIds) {
    const definition = definitionById.get(hallId);
    assert(definition, `${hallId} lacks a compiled gallery definition`);
    const supplementalLayouts = definition.layout.supplementalExhibits ?? [];
    if (!supplementalLayouts.length) continue;
    enforcedGalleryIds.push(hallId);
    const largestWidth = Math.max(...supplementalLayouts.map(({footprint}) => footprint.width));
    const largestHeight = Math.max(...supplementalLayouts.map(({footprint}) => footprint.height));

    for (const layout of definition.layout.exhibits) {
      const backing = layout.scene.objectBounds.find(({id}) => id.endsWith('-backing'));
      const plinth = layout.scene.objectBounds.find(({id}) => id.endsWith('-plinth'));
      assert(backing && plinth, `${hallId}/${layout.id} lacks primary backing or plinth geometry`);
      assert(
        layout.scene.footprint.width >= largestWidth - .001,
        `${hallId}/${layout.id} is narrower than the gallery's biggest secondary exhibit`,
      );
      assert(
        layout.scene.footprint.height >= largestHeight - .001,
        `${hallId}/${layout.id} is shorter than the gallery's biggest secondary exhibit`,
      );
      assert(
        backing.size.width >= largestWidth - .001,
        `${hallId}/${layout.id} backing is narrower than the biggest secondary backing`,
      );
      assert(
        backing.size.height >= largestHeight - .121,
        `${hallId}/${layout.id} backing is shorter than the biggest secondary backing`,
      );
      assert(
        plinth.size.width >= largestWidth + .299,
        `${hallId}/${layout.id} plinth gives the primary less presence than a secondary installation`,
      );
    }
  }

  assert.deepEqual(
    sorted(enforcedGalleryIds),
    sorted([
      'phenomenology-existence-embodiment',
      'analytic-traditions',
      'justice-democratic-reason',
      'core-questions-forum',
      'classical-south-asian-worlds',
      'buddhist-philosophies',
      'classical-chinese-traditions',
      'islamic-philosophical-worlds',
      'east-asian-continuities',
      'jewish-philosophy',
      'latin-christian-scholastic',
      'hellenistic-roman-ways',
      'late-antiquity-inheritance',
      'rationalism-mind-nature-system',
      'empiricism-science-political-order',
      'enlightenment-revolution-kant',
      'german-idealism-afterlives',
      'utility-liberty-history-capital',
      'faith-pessimism-life-value',
      'pragmatism-democratic-inquiry',
      'critique-power-deconstruction',
      'moral-life-practical-reason',
      'colonialism-race-liberation',
    ]),
    'Fully built Galleries 03–24 and 26 should enforce the completed-gallery hierarchy',
  );
  assert(
    canonicalExhibitsSource.includes('primaryEmphasis ? .72 : .42'),
    'Full-scale primary exhibits must retain secondary-scale name strips',
  );
  assert(
    canonicalExhibitsSource.includes('? backing.size.height - .16'),
    'Full-scale philosophy exhibits without media must fill their gallery-scale backing',
  );
});

check('the permanent exhibit-wall standard distinguishes two half-rooms from one sequence room', () => {
  assert.match(exhibitWallStandardSource, /two half-rooms/u);
  assert.match(exhibitWallStandardSource, /normal full room has \*\*six installations\*\*, not three/u);
  assert.match(exhibitWallStandardSource, /outer wall of each half-room is its primary wall/u);
  assert.match(exhibitWallStandardSource, /actual live side portal or fixed architectural obstruction/u);
  assert.match(exhibitWallStandardSource, /inspect both half-rooms in every changed room/u);
});

check('Gallery 07 preserves primary hierarchy and fills all thirty half-room wall faces', () => {
  const hall = hallById.get(CLASSICAL_SOUTH_ASIAN_GALLERY_ID);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === CLASSICAL_SOUTH_ASIAN_GALLERY_ID);
  const definition = definitionById.get(CLASSICAL_SOUTH_ASIAN_GALLERY_ID);
  assert(hall && program && definition);
  assert.equal(program.rooms.length, 5);
  assert.equal(hall.exhibits.length, 9);
  assert.equal(CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBITS.length, 21);
  assert.deepEqual(
    definition.layout.supplementalExhibits,
    CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  );

  const primaryByRoom = new Map(program.rooms.map((room) => [
    room.id,
    definition.layout.exhibits.filter(({spatialCellId}) => spatialCellId === room.id),
  ]));
  const supplementalByRoom = new Map(program.rooms.map((room) => [
    room.id,
    CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS
      .filter(({spatialCellId}) => spatialCellId === room.id),
  ]));
  for (const room of program.rooms) {
    const installations = [
      ...(primaryByRoom.get(room.id) ?? []),
      ...(supplementalByRoom.get(room.id) ?? []),
    ];
    assert.equal(installations.length, 6, `${room.id} must fill both three-wall half-rooms`);
    assert.deepEqual(
      sorted(installations.map(sequenceWallSlotFor)),
      sorted(SIX_SEQUENCE_ROOM_WALL_SLOTS),
      `${room.id} leaves a half-room wall blank or doubles a wall face`,
    );
    assert(
      (primaryByRoom.get(room.id) ?? []).some((layout) =>
        ['outer-west', 'outer-east'].includes(sequenceWallSlotFor(layout))),
      `${room.id} has no primary on a prominent outer wall`,
    );
  }

  for (const [id, authored] of Object.entries(CLASSICAL_SOUTH_ASIAN_PRIMARY_PLACEMENTS)) {
    const layout = definition.layout.exhibits.find((candidate) => candidate.id === id);
    assert(layout, `${id} is missing from Gallery 07`);
    assert.deepEqual(
      {x: layout.position.x, z: layout.position.z, rotationY: layout.rotationY},
      authored,
      `${id} drifted from its authored hierarchy wall`,
    );
  }
  const vedantaRoomPrimaries = primaryByRoom.get('south-vedanta-rival-readings') ?? [];
  assert.deepEqual(
    sorted(vedantaRoomPrimaries
      .filter((layout) => ['outer-west', 'outer-east'].includes(sequenceWallSlotFor(layout)))
      .map(({id}) => id)),
    ['shankara', 'vedanta'],
    'Vedānta and Śaṅkara must own the two most prominent walls in the final room',
  );

  const imageIds = [
    ...program.rooms.flatMap(({exhibits}) =>
      exhibits.map(({principalAssetId}) => principalAssetId).filter(Boolean)),
    ...CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({assetId}) => assetId),
  ];
  assert.equal(imageIds.length, 30);
  assert.equal(new Set(imageIds).size, 30, 'Gallery 07 repeats a wall image');
  assert.match(canonicalSceneSource, /<ClassicalSouthAsianSupplementalExhibits/u, 'Gallery 07 does not mount its supplemental renderer');
  assert.match(classicalSouthAsianSupplementalSceneSource, /onClick=\{activate\}/u, 'Gallery 07 supplemental installations lack mouse activation');
  assert.match(classicalSouthAsianSupplementalSceneSource, /interactionForSupplemental/u, 'Gallery 07 supplemental installations lack stable interaction identity');
  assert.match(classicalSouthAsianSupplementalSceneSource, /MuseumSceneMedia/u, 'Gallery 07 supplemental installations lack provenance-backed media');
});

check('Gallery 08 preserves primary hierarchy and fills all thirty half-room wall faces', () => {
  const hall = hallById.get(BUDDHIST_GALLERY_ID);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === BUDDHIST_GALLERY_ID);
  const definition = definitionById.get(BUDDHIST_GALLERY_ID);
  assert(hall && program && definition);
  assert.equal(program.rooms.length, 5);
  assert.equal(hall.exhibits.length, 7);
  assert.equal(BUDDHIST_SUPPLEMENTAL_EXHIBITS.length, 23);
  assert.deepEqual(definition.layout.supplementalExhibits, BUDDHIST_SUPPLEMENTAL_EXHIBIT_LAYOUTS);
  assert.deepEqual(
    sorted(Object.keys(BUDDHIST_ROOM_SIGN_COPY)),
    sorted(program.rooms.map(({id}) => id)),
    'Gallery 08 room signs do not cover its complete sequence',
  );

  const primaryByRoom = new Map(program.rooms.map((room) => [
    room.id,
    definition.layout.exhibits.filter(({spatialCellId}) => spatialCellId === room.id),
  ]));
  const supplementalByRoom = new Map(program.rooms.map((room) => [
    room.id,
    BUDDHIST_SUPPLEMENTAL_EXHIBIT_LAYOUTS.filter(({spatialCellId}) => spatialCellId === room.id),
  ]));
  for (const room of program.rooms) {
    const installations = [
      ...(primaryByRoom.get(room.id) ?? []),
      ...(supplementalByRoom.get(room.id) ?? []),
    ];
    assert.equal(installations.length, 6, `${room.id} must fill both three-wall half-rooms`);
    assert.deepEqual(
      sorted(installations.map(sequenceWallSlotFor)),
      sorted(SIX_SEQUENCE_ROOM_WALL_SLOTS),
      `${room.id} leaves a half-room wall blank or doubles a wall face`,
    );
  }

  for (const [id, authored] of Object.entries(BUDDHIST_PRIMARY_PLACEMENTS)) {
    const layout = definition.layout.exhibits.find((candidate) => candidate.id === id);
    assert(layout, `${id} is missing from Gallery 08`);
    assert.deepEqual(
      {x: layout.position.x, z: layout.position.z, rotationY: layout.rotationY},
      authored,
      `${id} drifted from its primary wall`,
    );
  }
  for (const roomId of ['buddhist-many-paths', 'buddhist-madhyamaka', 'buddhist-abhidharma-yogacara', 'buddhist-pramana']) {
    assert((primaryByRoom.get(roomId) ?? []).length > 0, `${roomId} lost its primary focal installation`);
  }
  assert(
    (primaryByRoom.get('buddhist-many-paths') ?? []).every((layout) =>
      ['outer-west', 'outer-east'].includes(sequenceWallSlotFor(layout))),
    'Buddhist Philosophy and the Buddha must own the first room’s two primary walls',
  );
  assert(
    (primaryByRoom.get('buddhist-pramana') ?? []).length === 3,
    'The pramāṇa room must keep all three primary exhibits',
  );
  assert.equal(
    (primaryByRoom.get('buddhist-pramana') ?? [])
      .filter((layout) => ['outer-west', 'outer-east'].includes(sequenceWallSlotFor(layout))).length,
    2,
    'The pramāṇa room must reserve both outer walls for primaries',
  );

  const imageIds = [
    ...program.rooms.flatMap(({exhibits}) => exhibits.map(({principalAssetId}) => principalAssetId).filter(Boolean)),
    ...BUDDHIST_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({assetId}) => assetId),
  ];
  assert.equal(imageIds.length, 30);
  assert.equal(new Set(imageIds).size, 30, 'Gallery 08 repeats a wall image');
  assert.match(canonicalSceneSource, /<BuddhistSupplementalExhibits/u, 'Gallery 08 does not mount its supplemental renderer');
  assert.match(buddhistSupplementalSceneSource, /onClick=\{activate\}/u, 'Gallery 08 supplemental installations lack mouse activation');
  assert.match(buddhistSupplementalSceneSource, /interactionForSupplemental/u, 'Gallery 08 supplemental installations lack stable interaction identity');
  assert.match(buddhistSupplementalSceneSource, /MuseumSceneMedia/u, 'Gallery 08 supplemental installations lack provenance-backed media');
  assert.match(buddhistSupplementalDataSource, /Texts move—and philosophical worlds change/u, 'Gallery 08 transmission room copy is missing');

  const firstTurnConnection = MUSEUM_BUILDING_MANIFEST.connections.find(({a, b}) =>
    [a.nodeId, b.nodeId].includes('hall:classical-south-asian-worlds')
    && [a.nodeId, b.nodeId].includes('turn:band-01-to-02'));
  const secondTurnConnection = MUSEUM_BUILDING_MANIFEST.connections.find(({a, b}) =>
    [a.nodeId, b.nodeId].includes('turn:band-01-to-02')
    && [a.nodeId, b.nodeId].includes('hall:buddhist-philosophies'));
  assert(firstTurnConnection?.accessible && secondTurnConnection?.accessible, 'Gallery 07–08 turn court is not walkable');
  assert.equal(firstTurnConnection.routeRole, 'through-route');
  assert.equal(secondTurnConnection.routeRole, 'through-route');
});

check('Gallery 09 uses an open-cross architecture and fills every room with six wall-backed exhibits', () => {
  const hall = hallById.get(CLASSICAL_CHINESE_GALLERY_ID);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === CLASSICAL_CHINESE_GALLERY_ID);
  const definition = definitionById.get(CLASSICAL_CHINESE_GALLERY_ID);
  assert(hall && program && definition);
  assert.equal(program.rooms.length, 4);
  assert.equal(hall.exhibits.length, 12);
  assert.equal(CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBITS.length, 12);
  assert.deepEqual(definition.layout.supplementalExhibits, CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBIT_LAYOUTS);
  assert.equal(CLASSICAL_CHINESE_CURATION_VALIDATION.installationCount, 24);
  assert.equal(CLASSICAL_CHINESE_CURATION_VALIDATION.installsPerRoom, 6);
  assert.equal(CLASSICAL_CHINESE_CURATION_VALIDATION.interiorWallCount, 8);
  assert(CLASSICAL_CHINESE_CURATION_VALIDATION.minimumCrossClearance >= 1.25);
  assert.deepEqual(
    definition.layout.spatialCells.map(({id}) => id),
    CLASSICAL_CHINESE_ROOM_ORDER,
    'Gallery 09 room order drifted from the authored crossroads',
  );
  for (const cell of definition.layout.spatialCells) {
    assert.deepEqual(cell.renderBounds ?? cell.bounds, CLASSICAL_CHINESE_ROOM_BOUNDS[cell.id], `${cell.id} bounds drifted`);
    assert.deepEqual(
      definition.layout.entryViews.find(({spatialCellId}) => spatialCellId === cell.id)?.pose,
      CLASSICAL_CHINESE_ROOM_ENTRY_POSES[cell.id],
      `${cell.id} no longer enters toward its primary wall`,
    );
  }
  assert.deepEqual(definition.layout.spatialConnections, CLASSICAL_CHINESE_SPATIAL_CONNECTIONS);
  assert.deepEqual(definition.layout.primaryCirculation, CLASSICAL_CHINESE_PRIMARY_CIRCULATION);
  assert.equal(
    definition.layout.wallColliders.filter(({id}) => id.includes(':cct-')).length,
    8,
    'Gallery 09 lost one of its eight L-baffles',
  );

  for (const [id, authored] of Object.entries(CLASSICAL_CHINESE_PRIMARY_PLACEMENTS)) {
    const layout = definition.layout.exhibits.find((candidate) => candidate.id === id);
    assert(layout, `${id} is missing from Gallery 09`);
    assert.deepEqual(
      {x: layout.position.x, z: layout.position.z, rotationY: layout.rotationY},
      {x: authored.x, z: authored.z, rotationY: authored.rotationY},
      `${id} drifted from its full-scale primary wall`,
    );
    assert(layout.scene.footprint.width >= CLASSICAL_CHINESE_PRIMARY_SCALE_FLOOR.objectWidth);
    assert(layout.scene.footprint.height >= CLASSICAL_CHINESE_PRIMARY_SCALE_FLOOR.footprintHeight);
  }

  const transformKey = ({position, rotationY}) =>
    `${position.x.toFixed(3)}:${position.z.toFixed(3)}:${rotationY.toFixed(6)}`;
  const slotByTransform = new Map(CLASSICAL_CHINESE_INSTALLATION_SLOTS.map((slot) => [
    `${slot.x.toFixed(3)}:${slot.z.toFixed(3)}:${slot.rotationY.toFixed(6)}`,
    slot,
  ]));
  const installations = [
    ...definition.layout.exhibits,
    ...CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  ];
  assert.equal(installations.length, 24);
  assert.equal(new Set(installations.map(transformKey)).size, 24, 'Gallery 09 doubles a physical wall position');
  for (const installation of installations) {
    const slot = slotByTransform.get(transformKey(installation));
    assert(slot, `${installation.id} is not on an authored Gallery 09 wall face`);
    assert.equal(installation.spatialCellId, slot.spatialCellId, `${installation.id} is assigned to the wrong room`);
  }
  for (const room of program.rooms) {
    assert.equal(
      installations.filter(({spatialCellId}) => spatialCellId === room.id).length,
      6,
      `${room.id} must contain exactly six exhibits`,
    );
  }
  const imageIds = [
    ...program.rooms.flatMap(({exhibits}) => exhibits.map(({principalAssetId}) => principalAssetId).filter(Boolean)),
    ...CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({assetId}) => assetId),
  ];
  assert.equal(imageIds.length, 24);
  assert.equal(new Set(imageIds).size, 24, 'Gallery 09 repeats a wall image');
  assert.match(canonicalSceneSource, /<ClassicalChineseSupplementalExhibits/u, 'Gallery 09 does not mount its supplemental renderer');
  assert.match(classicalChineseSupplementalSceneSource, /onClick=\{activate\}/u, 'Gallery 09 supplemental installations lack mouse activation');
  assert.match(classicalChineseSupplementalSceneSource, /interactionForSupplemental/u, 'Gallery 09 supplemental installations lack stable interaction identity');
  assert.match(classicalChineseSupplementalSceneSource, /MuseumSceneMedia/u, 'Gallery 09 supplemental installations lack provenance-backed media');
  assert.match(classicalChineseSupplementalDataSource, /Every layout consumes one of the curation contract/u);
});

check('Gallery 10 preserves primary hierarchy and fills all thirty half-room wall faces', () => {
  const hall = hallById.get(ISLAMIC_GALLERY_ID);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === ISLAMIC_GALLERY_ID);
  const definition = definitionById.get(ISLAMIC_GALLERY_ID);
  assert(hall && program && definition);
  assert.equal(program.rooms.length, 5);
  assert.equal(hall.exhibits.length, 9);
  assert.equal(ISLAMIC_SUPPLEMENTAL_EXHIBITS.length, 21);
  assert.deepEqual(definition.layout.supplementalExhibits, ISLAMIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS);
  assert.deepEqual(
    sorted(Object.keys(ISLAMIC_ROOM_SIGN_COPY)),
    sorted(program.rooms.map(({id}) => id)),
    'Gallery 10 room signs do not cover its complete sequence',
  );

  const primaryByRoom = new Map(program.rooms.map((room) => [
    room.id,
    definition.layout.exhibits.filter(({spatialCellId}) => spatialCellId === room.id),
  ]));
  const supplementalByRoom = new Map(program.rooms.map((room) => [
    room.id,
    ISLAMIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS.filter(({spatialCellId}) => spatialCellId === room.id),
  ]));
  for (const room of program.rooms) {
    const installations = [
      ...(primaryByRoom.get(room.id) ?? []),
      ...(supplementalByRoom.get(room.id) ?? []),
    ];
    assert.equal(installations.length, 6, `${room.id} must fill both three-wall half-rooms`);
    assert.deepEqual(
      sorted(installations.map(sequenceWallSlotFor)),
      sorted(SIX_SEQUENCE_ROOM_WALL_SLOTS),
      `${room.id} leaves a half-room wall blank or doubles a wall face`,
    );
    assert(
      (primaryByRoom.get(room.id) ?? []).some((layout) =>
        ['outer-west', 'outer-east'].includes(sequenceWallSlotFor(layout))),
      `${room.id} has no primary on a prominent outer wall`,
    );
  }
  for (const [id, authored] of Object.entries(ISLAMIC_PRIMARY_PLACEMENTS)) {
    const layout = definition.layout.exhibits.find((candidate) => candidate.id === id);
    assert(layout, `${id} is missing from Gallery 10`);
    assert.deepEqual(
      {x: layout.position.x, z: layout.position.z, rotationY: layout.rotationY},
      authored,
      `${id} drifted from its authored hierarchy wall`,
    );
  }
  const imageIds = [
    ...program.rooms.flatMap(({exhibits}) => exhibits.map(({principalAssetId}) => principalAssetId).filter(Boolean)),
    ...ISLAMIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({assetId}) => assetId),
  ];
  assert.equal(imageIds.length, 30);
  assert.equal(new Set(imageIds).size, 30, 'Gallery 10 repeats a wall image');
  assert.match(canonicalSceneSource, /<IslamicSupplementalExhibits/u, 'Gallery 10 does not mount its supplemental renderer');
  assert.match(islamicSupplementalSceneSource, /onClick=\{activate\}/u, 'Gallery 10 supplemental installations lack mouse activation');
  assert.match(islamicSupplementalSceneSource, /interactionForSupplemental/u, 'Gallery 10 supplemental installations lack stable interaction identity');
  assert.match(islamicSupplementalSceneSource, /MuseumSceneMedia/u, 'Gallery 10 supplemental installations lack provenance-backed media');
  assert.match(islamicSupplementalDataSource, /Five rooms × six wall faces = thirty installations/u);
});

check('Gallery 11 fills exactly eighteen wall faces with equal Song–Ming primaries and specific East Asian continuities', () => {
  const hall = hallById.get(EAST_ASIAN_GALLERY_ID);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === EAST_ASIAN_GALLERY_ID);
  const definition = definitionById.get(EAST_ASIAN_GALLERY_ID);
  assert(hall && program && definition);
  assert.equal(program.rooms.length, 3);
  assert.equal(hall.exhibits.length, 2);
  assert.equal(EAST_ASIAN_SUPPLEMENTAL_EXHIBITS.length, 16);
  assert.equal(EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS.length, 16);
  assert.deepEqual(definition.layout.supplementalExhibits, EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS);
  assert.deepEqual(
    sorted(Object.keys(EAST_ASIAN_ROOM_SIGN_COPY)),
    sorted(program.rooms.map(({id}) => id)),
    'Gallery 11 room signs do not cover its complete sequence',
  );

  const expectedRoomInstallationIds = new Map([
    ['east-song-ming-confucian', [
      'zhu-xi',
      'wang-yangming',
      'eac-zhu-four-books',
      'eac-wang-letters',
      'eac-zhu-white-deer',
      'eac-taijitu-heartmind',
    ]],
    ['east-buddhist-daoist-transmissions', [
      'eac-xuanzang-translation',
      'eac-daoist-institutions',
      'eac-hwaeom-avatamsaka',
      'eac-three-teachings',
      'eac-huineng-zen-reception',
      'eac-water-land-stars',
    ]],
    ['east-regional-continuities-reserve', [
      'eac-korea-four-seven',
      'eac-japan-hayashi',
      'eac-yi-i-ojukheon',
      'eac-japan-ancient-learning',
      'eac-vietnam-le-quy-don',
      'eac-modern-confucianism',
    ]],
  ]);
  const allInstallations = [
    ...definition.layout.exhibits,
    ...EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  ];
  assert.equal(allInstallations.length, 18, 'Gallery 11 must contain exactly eighteen physical installations');
  assertExactWallPlacements('Gallery 11', allInstallations, EAST_ASIAN_EXPECTED_WALL_PLACEMENTS);
  assertInstallationsDoNotOverlap('Gallery 11', program.rooms, allInstallations);
  for (const room of program.rooms) {
    const installations = allInstallations.filter(({spatialCellId}) => spatialCellId === room.id);
    assert.equal(installations.length, 6, `${room.id} must fill both three-wall half-rooms`);
    assert.deepEqual(
      sorted(installations.map(({id}) => id)),
      sorted(expectedRoomInstallationIds.get(room.id) ?? []),
      `${room.id} does not contain its exact authored installation set`,
    );
    assert.deepEqual(
      sorted(installations.map(sequenceWallSlotFor)),
      sorted(SIX_SEQUENCE_ROOM_WALL_SLOTS),
      `${room.id} leaves a usable half-room wall blank or doubles a wall face`,
    );
  }

  for (const [id, authored] of Object.entries(EAST_ASIAN_PRIMARY_PLACEMENTS)) {
    const layout = definition.layout.exhibits.find((candidate) => candidate.id === id);
    assert(layout, `${id} is missing from Gallery 11`);
    assert.deepEqual(
      {x: layout.position.x, z: layout.position.z, rotationY: layout.rotationY},
      authored,
      `${id} drifted from its full-scale primary outer wall`,
    );
    assert(['outer-west', 'outer-east'].includes(sequenceWallSlotFor(layout)), `${id} is not on a primary outer wall`);
  }
  const zhuXi = definition.layout.exhibits.find(({id}) => id === 'zhu-xi');
  const wangYangming = definition.layout.exhibits.find(({id}) => id === 'wang-yangming');
  assert(zhuXi && wangYangming);
  assert.deepEqual(
    {width: zhuXi.scene.footprint.width, height: zhuXi.scene.footprint.height},
    {width: wangYangming.scene.footprint.width, height: wangYangming.scene.footprint.height},
    'Zhu Xi and Wang Yangming must remain equal full-scale visual primaries',
  );
  const largestSecondaryWidth = Math.max(...EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({footprint}) => footprint.width));
  const largestSecondaryHeight = Math.max(...EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({footprint}) => footprint.height));
  for (const primary of [zhuXi, wangYangming]) {
    assert(primary.scene.footprint.width >= largestSecondaryWidth, `${primary.id} is narrower than a secondary work`);
    assert(primary.scene.footprint.height >= largestSecondaryHeight, `${primary.id} is shorter than a secondary work`);
  }
  for (const contextAnchorId of [
    'eac-xuanzang-translation',
    'eac-daoist-institutions',
    'eac-korea-four-seven',
    'eac-japan-hayashi',
  ]) {
    const layout = EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS.find(({id}) => id === contextAnchorId);
    assert(layout && ['outer-west', 'outer-east'].includes(sequenceWallSlotFor(layout)), `${contextAnchorId} must remain a full outer-wall contextual anchor`);
    assert.equal(layout.footprint.width, largestSecondaryWidth, `${contextAnchorId} is not full-scale`);
    assert.equal(layout.footprint.height, largestSecondaryHeight, `${contextAnchorId} is not full-scale`);
  }

  for (const room of program.rooms) {
    const copy = EAST_ASIAN_ROOM_SIGN_COPY[room.id];
    const sign = definition.layout.signs.find(({id}) => id === `${room.id}:room-sign`);
    const view = definition.layout.entryViews.find(({spatialCellId}) => spatialCellId === room.id);
    assert(sign && copy, `${room.id} lacks its physical interpretive sign`);
    assert.deepEqual(
      {kicker: sign.kicker, title: sign.title, subtitle: sign.subtitle},
      copy,
      `${room.id} physical sign differs from its authored interpretation`,
    );
    assert.deepEqual(view?.pose, EAST_ASIAN_ROOM_ENTRY_POSES[room.id], `${room.id} directory viewpoint drifted`);
    assert(view && validPose(definition, view.pose), `${room.id} directory viewpoint is unsafe`);
  }
  for (const layout of EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS) {
    const exhibit = EAST_ASIAN_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === layout.id);
    assert(exhibit, `${layout.id} lacks interpretation content`);
    assert.equal(layout.assetId, exhibit.assetId, `${layout.id} scene and interpretation assets diverge`);
    assert.equal(layout.mediaMount.assetId, layout.assetId, `${layout.id} prefetch and media assets diverge`);
    assert(definition.layout.obstacleColliders.some(({id}) => id === layout.collider.id), `${layout.id} is absent from collision`);
    assert(validPose(definition, layout.viewpoint), `${layout.id} has an unsafe viewing pose`);
  }
  const imageIds = [
    ...program.rooms.flatMap(({exhibits}) => exhibits.map(({principalAssetId}) => principalAssetId).filter(Boolean)),
    ...EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({assetId}) => assetId),
  ];
  assert.equal(imageIds.length, 18);
  assert.equal(new Set(imageIds).size, 18, 'Gallery 11 repeats a physical-installation image');
  assert.equal(getMuseumGuidedStops(hall.id, hall.guidedOrder).length, 18, 'Gallery 11 guided visit does not reach every installation');
  assert.match(canonicalSceneSource, /<EastAsianSupplementalExhibits/u, 'Gallery 11 does not mount its renderer');
  assert.match(eastAsianSupplementalSceneSource, /MuseumSupplementalExhibitCollection/u, 'Gallery 11 does not delegate to the shared full-scale renderer');
  assert.match(supplementalCollectionSceneSource, /onClick=\{activate\}/u, 'Gallery 11 supplemental installations lack mouse activation');
  assert.match(supplementalCollectionSceneSource, /interactionForSupplemental/u, 'Gallery 11 supplemental installations lack stable interaction identity');
  assert.match(supplementalCollectionSceneSource, /MuseumSceneMedia/u, 'Gallery 11 supplemental installations lack provenance-backed media');
  assert.match(eastAsianSupplementalDataSource, /Three rooms × six wall faces = eighteen physical installations/u);
  assert.match(eastAsianSupplementalDataSource, /Korean Hwaeom[\s\S]*Vietnamese Confucian Worlds[\s\S]*Modern Confucian Reconstructions/u, 'Gallery 11 regional treatment is generic or incomplete');
});

check('Gallery 12 fills exactly twelve wall faces with three philosopher primaries and an open later history', () => {
  const hall = hallById.get(JEWISH_GALLERY_ID);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === JEWISH_GALLERY_ID);
  const definition = definitionById.get(JEWISH_GALLERY_ID);
  assert(hall && program && definition);
  assert.equal(program.rooms.length, 2);
  assert.equal(hall.exhibits.length, 3);
  assert.deepEqual(sorted(hall.exhibits.map(({id}) => id)), ['judah-halevi', 'maimonides', 'saadia-gaon']);
  assert.equal(JEWISH_SUPPLEMENTAL_EXHIBITS.length, 9);
  assert.equal(JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS.length, 9);
  assert.deepEqual(definition.layout.supplementalExhibits, JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS);
  assert.deepEqual(
    sorted(Object.keys(JEWISH_ROOM_SIGN_COPY)),
    sorted(program.rooms.map(({id}) => id)),
    'Gallery 12 room signs do not cover its complete sequence',
  );

  const expectedRoomInstallationIds = new Map([
    ['jewish-reason-revelation', [
      'saadia-gaon',
      'judah-halevi',
      'saadia-beliefs-opinions',
      'judeo-arabic-geniza-law',
      'judah-halevi-kuzari',
      'judah-halevi-divan',
    ]],
    ['jewish-maimonidean-crossroads', [
      'maimonides',
      'maimonides-mishneh-torah',
      'maimonides-guide-negative-theology',
      'maimonides-guide-translation-reception',
      'jewish-philosophy-after-maimonides',
      'spinoza-formation-rupture-threshold',
    ]],
  ]);
  const allInstallations = [
    ...definition.layout.exhibits,
    ...JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  ];
  assert.equal(allInstallations.length, 12, 'Gallery 12 must contain exactly twelve physical installations');
  assertExactWallPlacements('Gallery 12', allInstallations, JEWISH_EXPECTED_WALL_PLACEMENTS);
  assertInstallationsDoNotOverlap('Gallery 12', program.rooms, allInstallations);
  for (const room of program.rooms) {
    const installations = allInstallations.filter(({spatialCellId}) => spatialCellId === room.id);
    assert.equal(installations.length, 6, `${room.id} must fill both three-wall half-rooms`);
    assert.deepEqual(
      sorted(installations.map(({id}) => id)),
      sorted(expectedRoomInstallationIds.get(room.id) ?? []),
      `${room.id} does not contain its exact authored installation set`,
    );
    assert.deepEqual(
      sorted(installations.map(sequenceWallSlotFor)),
      sorted(SIX_SEQUENCE_ROOM_WALL_SLOTS),
      `${room.id} leaves a usable half-room wall blank or doubles a wall face`,
    );
  }

  for (const [id, authored] of Object.entries(JEWISH_PRIMARY_PLACEMENTS)) {
    const layout = definition.layout.exhibits.find((candidate) => candidate.id === id);
    assert(layout, `${id} is missing from Gallery 12`);
    assert.deepEqual(
      {x: layout.position.x, z: layout.position.z, rotationY: layout.rotationY},
      authored,
      `${id} drifted from its full-scale primary outer wall`,
    );
    assert(['outer-west', 'outer-east'].includes(sequenceWallSlotFor(layout)), `${id} is not on a primary outer wall`);
  }
  const saadia = definition.layout.exhibits.find(({id}) => id === 'saadia-gaon');
  const halevi = definition.layout.exhibits.find(({id}) => id === 'judah-halevi');
  const maimonidesLayout = definition.layout.exhibits.find(({id}) => id === 'maimonides');
  assert(saadia && halevi && maimonidesLayout);
  assert.deepEqual(
    {width: saadia.scene.footprint.width, height: saadia.scene.footprint.height},
    {width: halevi.scene.footprint.width, height: halevi.scene.footprint.height},
    'Saadia Gaon and Judah Halevi must remain equal full-scale visual primaries',
  );
  const largestSecondaryWidth = Math.max(...JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({footprint}) => footprint.width));
  const largestSecondaryHeight = Math.max(...JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({footprint}) => footprint.height));
  for (const primary of [saadia, halevi, maimonidesLayout]) {
    assert(primary.scene.footprint.width >= largestSecondaryWidth, `${primary.id} is narrower than a secondary work`);
    assert(primary.scene.footprint.height >= largestSecondaryHeight, `${primary.id} is shorter than a secondary work`);
  }
  const continuation = JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS.find(({id}) => id === 'jewish-philosophy-after-maimonides');
  assert(continuation && sequenceWallSlotFor(continuation) === 'outer-east', 'Gallery 12 later continuity must remain a prominent outer-wall contextual anchor');
  assert.equal(continuation.footprint.width, largestSecondaryWidth, 'The later-continuity contextual anchor is not full-scale');
  assert.equal(continuation.footprint.height, largestSecondaryHeight, 'The later-continuity contextual anchor is not full-scale');

  for (const room of program.rooms) {
    const copy = JEWISH_ROOM_SIGN_COPY[room.id];
    const sign = definition.layout.signs.find(({id}) => id === `${room.id}:room-sign`);
    const view = definition.layout.entryViews.find(({spatialCellId}) => spatialCellId === room.id);
    assert(sign && copy, `${room.id} lacks its physical interpretive sign`);
    assert.deepEqual(
      {kicker: sign.kicker, title: sign.title, subtitle: sign.subtitle},
      copy,
      `${room.id} physical sign differs from its authored interpretation`,
    );
    assert.deepEqual(view?.pose, JEWISH_ROOM_ENTRY_POSES[room.id], `${room.id} directory viewpoint drifted`);
    assert(view && validPose(definition, view.pose), `${room.id} directory viewpoint is unsafe`);
  }
  for (const layout of JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS) {
    const exhibit = JEWISH_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === layout.id);
    assert(exhibit, `${layout.id} lacks interpretation content`);
    assert.equal(layout.assetId, exhibit.assetId, `${layout.id} scene and interpretation assets diverge`);
    assert.equal(layout.mediaMount.assetId, layout.assetId, `${layout.id} prefetch and media assets diverge`);
    assert(definition.layout.obstacleColliders.some(({id}) => id === layout.collider.id), `${layout.id} is absent from collision`);
    assert(validPose(definition, layout.viewpoint), `${layout.id} has an unsafe viewing pose`);
  }
  assert(!program.rooms.flatMap(({exhibits}) => exhibits).some(({entityKind}) => entityKind === 'branch'), 'Gallery 12 invented a canonical Jewish Philosophy branch');
  assert(!JEWISH_SUPPLEMENTAL_EXHIBITS.some(({articleRoute}) => articleRoute?.kind === 'branch'), 'Gallery 12 invented a branch route for balance');
  const laterContinuity = JEWISH_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === 'jewish-philosophy-after-maimonides');
  assert(laterContinuity && !laterContinuity.articleRoute, 'The contextual continuation anchor fabricated an Atlas route');
  assert.match(`${laterContinuity.lead} ${laterContinuity.sections.flatMap(({paragraphs}) => paragraphs).join(' ')}`, /Gersonides[\s\S]*Crescas[\s\S]*Mendelssohn[\s\S]*Rosenzweig[\s\S]*Levinas/u, 'Gallery 12 incorrectly ends Jewish philosophy with Maimonides');
  const spinozaThreshold = JEWISH_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === 'spinoza-formation-rupture-threshold');
  assert.deepEqual(spinozaThreshold?.articleRoute, {kind: 'philosopher', philosopherId: 'spinoza'});
  const spinozaThresholdCopy = `${spinozaThreshold?.lead} ${spinozaThreshold?.cautions.join(' ')}`;
  assert.match(spinozaThresholdCopy, /secondary here[\s\S]*primary[\s\S]*(?:Gallery 16|Rationalism gallery)/iu, 'Spinoza is not clearly secondary in Gallery 12 and primary in Gallery 16');
  assert.doesNotMatch(spinozaThresholdCopy, /future Rationalism gallery/iu, 'Gallery 12 still describes open Gallery 16 as future');
  const rationalismHall = hallById.get('rationalism-mind-nature-system');
  const rationalismNode = MUSEUM_RUNTIME_NODES.find(({publicHallId}) => publicHallId === 'rationalism-mind-nature-system');
  assert(rationalismHall?.exhibits.some(({id, roomId}) => id === 'spinoza' && roomId === 'rationalism-spinoza-conway'), 'Spinoza is not a canonical Gallery 16 primary');
  assert(rationalismNode?.galleryState === 'curated-open' && rationalismNode.fastTravelEligible, 'Gallery 16 is not open for visitor travel');
  const imageIds = [
    ...program.rooms.flatMap(({exhibits}) => exhibits.map(({principalAssetId}) => principalAssetId).filter(Boolean)),
    ...JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({assetId}) => assetId),
  ];
  assert.equal(imageIds.length, 12);
  assert.equal(new Set(imageIds).size, 12, 'Gallery 12 repeats a physical-installation image');
  assert.equal(getMuseumGuidedStops(hall.id, hall.guidedOrder).length, 12, 'Gallery 12 guided visit does not reach every installation');
  assert.deepEqual(definition.resolvedTemplate.canonicalFootprint, {width: 20, depth: 24}, 'Gallery 12 no longer uses the standard rectangle');
  assert.deepEqual(definition.resolvedTemplate.resolvedFootprint.bounds, {minX: -10, maxX: 10, minZ: -12, maxZ: 12}, 'Gallery 12 standard-rect bounds drifted');
  const latinNode = MUSEUM_RUNTIME_NODES.find(({programHallId}) => programHallId === 'latin-christian-scholastic');
  assert(latinNode?.publicHallId === 'latin-christian-scholastic' && latinNode.galleryState === 'curated-open', 'Gallery 13 is not registered as curated/open');
  assert.equal(latinNode.roomIds.length, 4);
  assert.equal(latinNode.layout.signs?.filter(({kind}) => kind === 'planned-status').length ?? 0, 0);
  const latinConnection = MUSEUM_BUILDING_MANIFEST.connections.find(({a, b}) =>
    [a.nodeId, b.nodeId].includes('hall:jewish-philosophy')
    && [a.nodeId, b.nodeId].includes(latinNode.id));
  assert(latinConnection?.accessible && latinConnection.implementationStatus === 'live', 'Gallery 12 does not open into curated Gallery 13');
  assert.equal(definition.resolvedTemplate.portalInterfaces.find(({manifestSlotId}) => manifestSlotId === 'N0')?.active, true, 'Gallery 12 through-route exit is not open');
  assert.match(canonicalSceneSource, /<JewishSupplementalExhibits/u, 'Gallery 12 does not mount its renderer');
  assert.match(jewishSupplementalSceneSource, /MuseumSupplementalExhibitCollection/u, 'Gallery 12 does not delegate to the shared full-scale renderer');
  assert.match(supplementalCollectionSceneSource, /onClick=\{activate\}/u, 'Gallery 12 supplemental installations lack mouse activation');
  assert.match(supplementalCollectionSceneSource, /interactionForSupplemental/u, 'Gallery 12 supplemental installations lack stable interaction identity');
  assert.match(supplementalCollectionSceneSource, /MuseumSceneMedia/u, 'Gallery 12 supplemental installations lack provenance-backed media');
  assert.match(jewishSupplementalDataSource, /Two rooms × six wall faces = twelve physical installations/u);
  assert.match(jewishSupplementalDataSource, /identifies language and intellectual setting, not Muslim identity/u, 'Gallery 12 conflates Judeo-Arabic writing with Muslim identity');
});

check('Gallery 13 is a complete four-room, 24-installation Latin Christian and scholastic sequence', () => {
  assertCompleteSixWallSequenceGallery({
    label: 'Gallery 13',
    galleryId: LATIN_SCHOLASTIC_GALLERY_ID,
    roomCount: 4,
    primaryCount: 10,
    supplementalCount: 14,
    physicalCount: 24,
    primaryPlacements: LATIN_SCHOLASTIC_PRIMARY_PLACEMENTS,
    roomEntryPoses: LATIN_SCHOLASTIC_ROOM_ENTRY_POSES,
    roomSignCopy: LATIN_SCHOLASTIC_ROOM_SIGN_COPY,
    supplementalExhibits: LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBITS,
    supplementalLayouts: LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
    directNeighborNodeIds: ['hall:jewish-philosophy', 'hall:core-questions-forum'],
  });
  assert.match(canonicalSceneSource, /<LatinScholasticSupplementalExhibits/u, 'Gallery 13 does not mount its supplemental renderer');
  assert.match(successorSupplementalSceneSource, /getLatinScholasticSupplementalExhibit/u, 'Gallery 13 renderer does not resolve authored visitor content');
  assert.match(
    latinScholasticSupplementalDataSource,
    /Boethius and the Logical Curriculum[\s\S]*Arguments Across Arabic, Hebrew, and Latin Reading Worlds[\s\S]*Poverty, Censure, and the Boundaries of Political Authority/u,
    'Gallery 13 does not sustain its transmission-to-authority interpretive sequence',
  );
});

check('Gallery 14 is a complete 25-installation crossroads of four distinct Hellenistic and Roman ways', () => {
  const hall = hallById.get(HELLENISTIC_ROMAN_GALLERY_ID);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === HELLENISTIC_ROMAN_GALLERY_ID);
  const definition = definitionById.get(HELLENISTIC_ROMAN_GALLERY_ID);
  assert(hall && program && definition);
  assert.deepEqual(HELLENISTIC_ROMAN_CURATION_VALIDATION, {
    roomCount: 4,
    connectionCount: 4,
    interiorWallCount: 8,
    installationCount: 25,
    primaryCount: 18,
    supplementalCount: 7,
  });
  assert.equal(program.rooms.length, 4);
  assert.equal(hall.exhibits.length, 18);
  assert.equal(HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBITS.length, 7);
  assert.equal(HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS.length, 7);
  assert.deepEqual(definition.layout.supplementalExhibits, HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS);
  assert.deepEqual(HELLENISTIC_ROMAN_ROOM_ORDER, program.rooms.map(({id}) => id));
  assert.deepEqual(definition.layout.spatialConnections, HELLENISTIC_ROMAN_SPATIAL_CONNECTIONS);
  assert.deepEqual(
    sorted(Object.keys(HELLENISTIC_ROMAN_ROOM_SIGN_COPY)),
    sorted(program.rooms.map(({id}) => id)),
    'Gallery 14 room signs do not cover all four schools',
  );

  const allInstallations = [
    ...definition.layout.exhibits,
    ...HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  ];
  assert.equal(allInstallations.length, 25, 'Gallery 14 must contain exactly twenty-five physical installations');
  assertInstallationsDoNotOverlap('Gallery 14', program.rooms, allInstallations);
  const expectedCounts = new Map([
    ['hell-cynic-way', 6],
    ['hell-epicurean-garden', 6],
    ['hell-stoic-stoa', 7],
    ['hell-skeptical-lineages', 6],
  ]);
  for (const room of program.rooms) {
    const installations = allInstallations.filter(({spatialCellId}) => spatialCellId === room.id);
    assert.equal(installations.length, expectedCounts.get(room.id), `${room.id} does not fill its authored installation capacity`);
    assert.deepEqual(definition.layout.entryViews.find(({spatialCellId}) => spatialCellId === room.id)?.pose, HELLENISTIC_ROMAN_ROOM_ENTRY_POSES[room.id]);
    const sign = definition.layout.signs.find(({id}) => id === `${room.id}:room-sign`);
    assert.deepEqual(
      sign && {kicker: sign.kicker, title: sign.title, subtitle: sign.subtitle},
      HELLENISTIC_ROMAN_ROOM_SIGN_COPY[room.id],
      `${room.id} physical sign differs from its authored interpretation`,
    );
  }
  assert.equal(new Set(allInstallations.map(({position, rotationY}) =>
    `${position.x.toFixed(4)}:${position.z.toFixed(4)}:${rotationY.toFixed(4)}`)).size, 25, 'Gallery 14 repeats an authored physical slot');
  for (const [id, authored] of Object.entries(HELLENISTIC_ROMAN_PRIMARY_PLACEMENTS)) {
    const layout = definition.layout.exhibits.find((candidate) => candidate.id === id);
    assert(layout, `${id} is missing from Gallery 14`);
    assert.deepEqual(
      {x: layout.position.x, z: layout.position.z, rotationY: layout.rotationY},
      {x: authored.x, z: authored.z, rotationY: authored.rotationY},
      `${id} drifted from its full-scale authored placement`,
    );
    assert.equal(authored.scale, 'full');
    assert(HELLENISTIC_ROMAN_INSTALLATION_SLOTS.some(({id: slotId, backingWallId}) =>
      slotId === authored.slotId && backingWallId === authored.backingWallId), `${id} lacks a real backing wall`);
    const backingWall = definition.layout.wallColliders.find(({id: wallId}) => wallId === authored.backingWallId);
    const backing = layout.scene.objectBounds.find(({id: volumeId}) => volumeId.endsWith('-backing'));
    assert(backing, `${id} lacks a measurable installation backing`);
    if (!backingWall) {
      assert.match(authored.backingWallId, /:(?:north|south|west|east)-wall$/u, `${id} names an unknown backing wall`);
      continue;
    }
    const cosine = Math.cos(layout.rotationY);
    const sine = Math.sin(layout.rotationY);
    const backingCenter = {
      x: layout.position.x + cosine * backing.center.x + sine * backing.center.z,
      z: layout.position.z - sine * backing.center.x + cosine * backing.center.z,
    };
    const wallRunsAlongLocalX = backingWall.size.width >= backingWall.size.depth;
    const wallRun = wallRunsAlongLocalX
      ? {x: Math.cos(backingWall.rotation), z: -Math.sin(backingWall.rotation)}
      : {x: Math.sin(backingWall.rotation), z: Math.cos(backingWall.rotation)};
    const wallRunLength = Math.max(backingWall.size.width, backingWall.size.depth);
    const backingRun = {x: cosine, z: -sine};
    const backingDepth = {x: sine, z: cosine};
    const centerOffset = Math.abs(
      (backingCenter.x - backingWall.center.x) * wallRun.x
        + (backingCenter.z - backingWall.center.z) * wallRun.z,
    );
    const projectedHalfWidth = (
      Math.abs(backingRun.x * wallRun.x + backingRun.z * wallRun.z) * backing.size.width
        + Math.abs(backingDepth.x * wallRun.x + backingDepth.z * wallRun.z) * backing.size.depth
    ) / 2;
    assert(
      centerOffset + projectedHalfWidth <= wallRunLength / 2 + .01,
      `${id} overhangs ${authored.backingWallId}`,
    );
  }
  assert.deepEqual(
    definition.layout.primaryCirculation,
    HELLENISTIC_ROMAN_PRIMARY_CIRCULATION,
    'Gallery 14 circulation drifted from the four-school crossroads',
  );
  for (const layout of HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS) {
    const exhibit = HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === layout.id);
    assert(exhibit, `${layout.id} lacks interpretation content`);
    assert.equal(layout.assetId, exhibit.assetId, `${layout.id} scene and interpretation assets diverge`);
    assert(definition.layout.obstacleColliders.some(({id}) => id === layout.collider.id), `${layout.id} is absent from collision`);
    assert(validPose(definition, layout.viewpoint), `${layout.id} has an unsafe viewing pose`);
  }
  const imageIds = [
    ...program.rooms.flatMap(({exhibits}) => exhibits.map(({principalAssetId}) => principalAssetId).filter(Boolean)),
    ...HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({assetId}) => assetId),
  ];
  assert.equal(imageIds.length, 25);
  assert.equal(new Set(imageIds).size, 25, 'Gallery 14 repeats a physical-installation image');
  assert.equal(getMuseumGuidedStops(hall.id, hall.guidedOrder).length, 25, 'Gallery 14 guided visit does not reach every installation');
  assert.match(canonicalSceneSource, /<HellenisticRomanSupplementalExhibits/u, 'Gallery 14 does not mount its renderer');
  assert.match(successorSupplementalSceneSource, /onClick=\{activate\}/u, 'Gallery 14 supplemental installations lack mouse activation');
  assert.match(successorSupplementalSceneSource, /interactionForSupplemental/u, 'Gallery 14 supplemental installations lack stable interaction identity');
  assert.match(successorSupplementalSceneSource, /MuseumSceneMedia/u, 'Gallery 14 supplemental installations lack provenance-backed media');
  assert.match(hellenisticRomanSupplementalDataSource, /Frank Speech[\s\S]*Partnership Against Convention[\s\S]*Cosmopolitan Claim/u, 'Gallery 14 Cynic context is incomplete');
});

check('Galleries 09 and 14 have finished full-height baffles and four-metre room throats', () => {
  const contracts = [
    {
      id: CLASSICAL_CHINESE_GALLERY_ID,
      dimensions: CLASSICAL_CHINESE_HALL_DIMENSIONS,
      walls: classicalChineseInteriorWalls(),
      entryPoses: CLASSICAL_CHINESE_ROOM_ENTRY_POSES,
    },
    {
      id: HELLENISTIC_ROMAN_GALLERY_ID,
      dimensions: HELLENISTIC_ROMAN_HALL_DIMENSIONS,
      walls: hellenisticRomanInteriorWalls(),
      entryPoses: HELLENISTIC_ROMAN_ROOM_ENTRY_POSES,
    },
  ];
  for (const {id, dimensions, walls, entryPoses} of contracts) {
    assert.equal(walls.length, 8, `${id} lost an L-baffle segment`);
    assert(walls.every(({height}) => close(height, dimensions.ceilingHeight)), `${id} has an unfinished baffle top`);
    assert(walls.every(({size}) => close(Math.max(size.width, size.depth), 6)), `${id} restored an eight-metre blind baffle`);
    const innerEnds = walls.map(({center, size}) => size.depth > size.width
      ? Math.abs(center.z) - size.depth / 2
      : Math.abs(center.x) - size.width / 2);
    assert(innerEnds.every((innerEnd) => close(innerEnd - dimensions.crossHalfWidth, 4)), `${id} room throat is narrower than four metres`);
    const definition = definitionById.get(id);
    assert(definition);
    for (const [roomId, pose] of Object.entries(entryPoses)) {
      assert(Math.abs(pose.x) >= 8.1 && Math.abs(pose.z) >= 8.1, `${id}/${roomId} still stages in the turn throat`);
      assert(validPose(definition, pose), `${id}/${roomId} has an unsafe widened-room entry`);
    }
  }
});

check('Gallery 15 is a complete 18-installation sequence whose final room makes transmission substantive', () => {
  const hall = hallById.get(LATE_ANTIQUITY_GALLERY_ID);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === LATE_ANTIQUITY_GALLERY_ID);
  const definition = definitionById.get(LATE_ANTIQUITY_GALLERY_ID);
  assert(hall && program && definition);
  assert.equal(program.rooms.length, 3);
  assert.equal(hall.exhibits.length, 9);
  assert.equal(LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBITS.length, 9);
  assert.equal(LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS.length, 9);
  assert.deepEqual(definition.layout.supplementalExhibits, LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS);
  assert.deepEqual(
    sorted(Object.keys(LATE_ANTIQUITY_ROOM_SIGN_COPY)),
    sorted(program.rooms.map(({id}) => id)),
    'Gallery 15 room signs do not cover the full sequence',
  );

  const allInstallations = [
    ...definition.layout.exhibits,
    ...LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  ];
  assert.equal(allInstallations.length, 18, 'Gallery 15 must contain exactly eighteen physical installations');
  assertInstallationsDoNotOverlap('Gallery 15', program.rooms, allInstallations);
  for (const room of program.rooms) {
    const installations = allInstallations.filter(({spatialCellId}) => spatialCellId === room.id);
    assert.equal(installations.length, 6, `${room.id} must fill all six sequence-room wall faces`);
    assert.deepEqual(
      sorted(installations.map(sequenceWallSlotFor)),
      sorted(SIX_SEQUENCE_ROOM_WALL_SLOTS),
      `${room.id} leaves a usable sequence-room wall blank or doubles a wall face`,
    );
    assert.deepEqual(definition.layout.entryViews.find(({spatialCellId}) => spatialCellId === room.id)?.pose, LATE_ANTIQUITY_ROOM_ENTRY_POSES[room.id]);
    const sign = definition.layout.signs.find(({id}) => id === `${room.id}:room-sign`);
    assert.deepEqual(
      sign && {kicker: sign.kicker, title: sign.title, subtitle: sign.subtitle},
      LATE_ANTIQUITY_ROOM_SIGN_COPY[room.id],
      `${room.id} physical sign differs from its authored interpretation`,
    );
  }
  const transmissionRoom = program.rooms.find(({id}) => id === 'late-commentary-transmission');
  assert(transmissionRoom);
  assert.equal(transmissionRoom.exhibits.length, 0, 'Gallery 15 final room should not invent a canonical primary');
  assert.equal(
    LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS.filter(({spatialCellId}) => spatialCellId === transmissionRoom.id).length,
    6,
    'Gallery 15 final room must contain six interpreted transmission installations',
  );
  for (const [id, authored] of Object.entries(LATE_ANTIQUITY_PRIMARY_PLACEMENTS)) {
    const layout = definition.layout.exhibits.find((candidate) => candidate.id === id);
    assert(layout, `${id} is missing from Gallery 15`);
    assert.deepEqual(
      {x: layout.position.x, z: layout.position.z, rotationY: layout.rotationY},
      authored,
      `${id} drifted from its authored sequence-wall placement`,
    );
  }
  for (const layout of LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS) {
    const exhibit = LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === layout.id);
    assert(exhibit, `${layout.id} lacks interpretation content`);
    assert.equal(layout.assetId, exhibit.assetId, `${layout.id} scene and interpretation assets diverge`);
    assert(definition.layout.obstacleColliders.some(({id}) => id === layout.collider.id), `${layout.id} is absent from collision`);
    assert(validPose(definition, layout.viewpoint), `${layout.id} has an unsafe viewing pose`);
  }
  const imageIds = [
    ...program.rooms.flatMap(({exhibits}) => exhibits.map(({principalAssetId}) => principalAssetId).filter(Boolean)),
    ...LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({assetId}) => assetId),
  ];
  assert.equal(imageIds.length, 18);
  assert.equal(new Set(imageIds).size, 18, 'Gallery 15 repeats a physical-installation image');
  assert.equal(getMuseumGuidedStops(hall.id, hall.guidedOrder).length, 18, 'Gallery 15 guided visit does not reach every installation');
  assert.match(canonicalSceneSource, /<LateAntiquitySupplementalExhibits/u, 'Gallery 15 does not mount its renderer');
  assert.match(successorSupplementalSceneSource, /getLateAntiquitySupplementalExhibit/u, 'Gallery 15 renderer does not resolve authored visitor content');
  assert.match(lateAntiquitySupplementalDataSource, /Greek, Syriac, and Arabic Worlds[\s\S]*Proclus’s Elements[\s\S]*Renaissance Reconstruction/u, 'Gallery 15 transmission room is generic or incomplete');
});

check('Gallery 16 is a complete three-room, 18-installation rationalist systems sequence', () => {
  assertCompleteSixWallSequenceGallery({
    label: 'Gallery 16',
    galleryId: RATIONALISM_GALLERY_ID,
    roomCount: 3,
    primaryCount: 5,
    supplementalCount: 13,
    physicalCount: 18,
    primaryPlacements: RATIONALISM_PRIMARY_PLACEMENTS,
    roomEntryPoses: RATIONALISM_ROOM_ENTRY_POSES,
    roomSignCopy: RATIONALISM_ROOM_SIGN_COPY,
    supplementalExhibits: RATIONALISM_SUPPLEMENTAL_EXHIBITS,
    supplementalLayouts: RATIONALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
    directNeighborNodeIds: ['hall:renaissance-humanism-new-method', 'turn:band-03-to-04'],
  });
  assert.match(canonicalSceneSource, /<RationalismSupplementalExhibits/u, 'Gallery 16 does not mount its supplemental renderer');
  assert.match(successorSupplementalSceneSource, /getRationalismSupplementalExhibit/u, 'Gallery 16 renderer does not resolve authored visitor content');
  assert.match(
    rationalismSupplementalDataSource,
    /Discourse on Method[\s\S]*Princess Elisabeth[\s\S]*Anne Conway’s Principles[\s\S]*Leibniz and Clarke[\s\S]*Binary Arithmetic/u,
    'Gallery 16 omits a required method, embodiment, Conway, or Leibniz interpretive strand',
  );
});

check('Gallery 17 is a complete three-room, 18-installation empiricist sequence with render-only lintels', () => {
  assertCompleteSixWallSequenceGallery({
    label: 'Gallery 17',
    galleryId: EMPIRICISM_GALLERY_ID,
    roomCount: 3,
    primaryCount: 4,
    supplementalCount: 14,
    physicalCount: 18,
    primaryPlacements: EMPIRICISM_PRIMARY_PLACEMENTS,
    roomEntryPoses: EMPIRICISM_ROOM_ENTRY_POSES,
    roomSignCopy: EMPIRICISM_ROOM_SIGN_COPY,
    supplementalExhibits: EMPIRICISM_SUPPLEMENTAL_EXHIBITS,
    supplementalLayouts: EMPIRICISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
    directNeighborNodeIds: ['turn:band-03-to-04', 'hall:enlightenment-revolution-kant'],
  });
  const definition = definitionById.get(EMPIRICISM_GALLERY_ID);
  assert(definition);
  assert.deepEqual(EMPIRICISM_HALL_DIMENSIONS, {
    width: 24,
    depth: 56,
    ceilingHeight: 5.8,
    wallThickness: .36,
    openingWidth: 4,
    openingHeight: 3.2,
  });
  assert.equal(definition.layout.spatialConnections.length, 2, 'Gallery 17 must retain exactly two room openings');
  const roomCells = definition.layout.spatialCells.filter(({kind}) => kind === 'room');
  assert.equal(roomCells.length, 3);
  for (const cell of roomCells) {
    const exactBounds = cell.renderBounds ?? cell.bounds;
    const roomDepth = exactBounds.maxZ - exactBounds.minZ;
    assert(close(exactBounds.maxX - exactBounds.minX, 24), `${cell.id} is not the full sequence width`);
    assert(close(roomDepth, 56 / 3), `${cell.id} is not one of three equal-depth rooms (${roomDepth} m)`);
    assert(close(cell.ceilingHeight, 5.8), `${cell.id} ceiling height drifted`);
  }
  assert(close(
    roomCells.reduce((sum, {bounds, renderBounds}) => {
      const exactBounds = renderBounds ?? bounds;
      return sum + (exactBounds.maxX - exactBounds.minX) * (exactBounds.maxZ - exactBounds.minZ);
    }, 0),
    24 * 56,
  ), 'Gallery 17 rooms no longer tile the full 24 × 56 m shell');

  const lintels = empiricismInteriorLintels();
  assert.equal(lintels.length, 2, 'Gallery 17 must retain exactly two interior lintels');
  assert.deepEqual(
    lintels.map(({center, size}) => ({center, size})),
    [
      {center: {x: 0, z: -9.333333}, size: {width: 4, depth: .36}},
      {center: {x: 0, z: 9.333333}, size: {width: 4, depth: .36}},
    ],
    'Gallery 17 interior lintel geometry drifted',
  );
  assert(lintels.every(({bottom, height}) => close(bottom, 3.2) && close(height, 2.6)), 'Gallery 17 lintel heights drifted');
  for (const lintel of lintels) {
    assert.deepEqual(
      definition.architectureWalls.find(({id}) => id === lintel.id),
      lintel,
      `${lintel.id} is absent from rendered architecture`,
    );
    assert(
      !definition.layout.wallColliders.some(({id}) => id === lintel.id),
      `${lintel.id} incorrectly closes a walkable opening`,
    );
  }
  assert.match(canonicalSceneSource, /<EmpiricismSupplementalExhibits/u, 'Gallery 17 does not mount its supplemental renderer');
  assert.match(successorSupplementalSceneSource, /export function EmpiricismSupplementalExhibits/u, 'Gallery 17 supplemental renderer is absent');
  assert.match(successorSupplementalSceneSource, /getEmpiricismSupplementalExhibit/u, 'Gallery 17 renderer does not resolve authored visitor content');
  assert.match(empiricismSupplementalDataSource, /export const EMPIRICISM_SUPPLEMENTAL_EXHIBITS/u, 'Gallery 17 supplemental content is not exported');
});

check('Gallery 18 is a complete 25-installation Enlightenment crossroads with the approved Kant threshold', () => {
  const hall = hallById.get(ENLIGHTENMENT_GALLERY_ID);
  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === ENLIGHTENMENT_GALLERY_ID);
  const definition = definitionById.get(ENLIGHTENMENT_GALLERY_ID);
  const runtimeNode = MUSEUM_RUNTIME_NODES.find(({publicHallId}) => publicHallId === ENLIGHTENMENT_GALLERY_ID);
  assert(hall && program && definition && runtimeNode);
  assert.equal(runtimeNode.galleryState, 'curated-open');
  assert.equal(runtimeNode.fastTravelEligible, true);
  assert.deepEqual(ENLIGHTENMENT_CURATION_VALIDATION, {
    roomCount: 5,
    connectionCount: 4,
    collisionWallCount: 8,
    lintelCount: 4,
    installationCount: 25,
    primaryCount: 6,
    supplementalCount: 19,
  });
  assert.deepEqual(ENLIGHTENMENT_HALL_DIMENSIONS, {
    width: 28,
    depth: 28,
    ceilingHeight: 6.2,
    wallThickness: .36,
    openingWidth: 4,
    openingHeight: 3.2,
  });
  assert.equal(definition.layout.floorArea, 784);
  assert.deepEqual(ENLIGHTENMENT_ROOM_ORDER, program.rooms.map(({id}) => id));
  assert.deepEqual(
    definition.layout.spatialCells.map(({id, bounds, renderBounds}) => ({
      id,
      bounds: renderBounds ?? bounds,
    })),
    ENLIGHTENMENT_ROOM_ORDER.map((id) => ({id, bounds: ENLIGHTENMENT_ROOM_BOUNDS[id]})),
    'Gallery 18 runtime rooms drifted from the approved five-cell plan',
  );
  const roomBounds = Object.values(ENLIGHTENMENT_ROOM_BOUNDS);
  assert.equal(
    roomBounds.reduce((sum, bounds) =>
      sum + (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ), 0),
    784,
    'Gallery 18 rooms must tile the full 28 × 28 m shell',
  );
  const strictBoundsOverlap = (first, second) => first.minX < second.maxX - 1e-5
    && first.maxX > second.minX + 1e-5
    && first.minZ < second.maxZ - 1e-5
    && first.maxZ > second.minZ + 1e-5;
  for (let first = 0; first < roomBounds.length; first += 1) {
    for (let second = first + 1; second < roomBounds.length; second += 1) {
      assert(!strictBoundsOverlap(roomBounds[first], roomBounds[second]), 'Gallery 18 room bounds overlap');
    }
  }

  assert.deepEqual(definition.layout.spatialConnections, ENLIGHTENMENT_SPATIAL_CONNECTIONS);
  assert.equal(ENLIGHTENMENT_SPATIAL_CONNECTIONS.length, 4);
  for (const {openingBounds} of ENLIGHTENMENT_SPATIAL_CONNECTIONS) {
    const openingRuns = [
      openingBounds.maxX - openingBounds.minX,
      openingBounds.maxZ - openingBounds.minZ,
    ].sort((first, second) => first - second);
    assert(close(openingRuns[0], 1.2) && close(openingRuns[1], 4), 'Gallery 18 lost a four-metre central opening');
  }

  const boundaryWalls = enlightenmentInteriorWalls();
  const kantBaffle = enlightenmentKantBaffle();
  assert.equal(boundaryWalls.length, 8, 'Gallery 18 must retain eight split central-boundary walls');
  assert(boundaryWalls.every(({height}) => close(height, 6.2)), 'Gallery 18 has an unfinished central-boundary wall');
  for (const wall of [...boundaryWalls, kantBaffle]) {
    assert.deepEqual(
      definition.layout.wallColliders.find(({id}) => id === wall.id),
      wall,
      `${wall.id} is missing from Gallery 18 collision architecture`,
    );
  }
  assert.deepEqual(
    kantBaffle,
    {
      id: `${ENLIGHTENMENT_GALLERY_ID}:enlightenment-kant-critical-baffle`,
      center: {x: 0, z: -2.66},
      size: {width: 4.4, depth: .08},
      rotation: 0,
      height: 6.2,
    },
    'Kant exhibit baffle drifted from the approved independent millwork',
  );
  const northBoundaryInnerFace = -4 + ENLIGHTENMENT_HALL_DIMENSIONS.wallThickness / 2;
  const kantBaffleNorthFace = kantBaffle.center.z - kantBaffle.size.depth / 2;
  assert(
    kantBaffleNorthFace - northBoundaryInnerFace
      >= definition.layout.playerRadius * 2 + .4,
    'Gallery 18 Kant baffle leaves less than 20 cm practical clearance on each side of the visitor',
  );

  const lintels = enlightenmentInteriorLintels();
  assert.equal(lintels.length, 4, 'Gallery 18 must retain four central-opening lintels');
  assert(lintels.every(({bottom, height}) => close(bottom, 3.2) && close(height, 3)), 'Gallery 18 lintel heights drifted');
  for (const lintel of lintels) {
    assert.deepEqual(
      definition.architectureWalls.find(({id}) => id === lintel.id),
      lintel,
      `${lintel.id} is absent from rendered architecture`,
    );
    assert(
      !definition.layout.wallColliders.some(({id}) => id === lintel.id),
      `${lintel.id} incorrectly closes a walkable central opening`,
    );
  }

  assert.equal(program.rooms.length, 5);
  assert.equal(hall.exhibits.length, 6);
  assert.equal(ENLIGHTENMENT_SUPPLEMENTAL_EXHIBITS.length, 19);
  assert.equal(ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS.length, 19);
  assert.deepEqual(definition.layout.supplementalExhibits, ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS);
  assert.equal(ENLIGHTENMENT_INSTALLATION_SLOTS.length, 25);
  assert(unique(ENLIGHTENMENT_INSTALLATION_SLOTS.map(({id}) => id)), 'Gallery 18 installation slot ids repeat');
  const primaryBySlotId = new Map(Object.entries(ENLIGHTENMENT_PRIMARY_PLACEMENTS).map(([id, authored]) => [
    authored.slotId,
    {
      id,
      authored,
      layout: definition.layout.exhibits.find((candidate) => candidate.id === id),
    },
  ]));
  const supplementalBySlotId = new Map(ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map((layout) => [
    layout.slotId,
    {id: layout.id, authored: layout, layout},
  ]));
  assert.equal(primaryBySlotId.size, 6);
  assert.equal(supplementalBySlotId.size, 19);
  assert.deepEqual(
    sorted([...primaryBySlotId.keys(), ...supplementalBySlotId.keys()]),
    sorted(ENLIGHTENMENT_INSTALLATION_SLOTS.map(({id}) => id)),
    'Gallery 18 does not use every approved installation slot exactly once',
  );
  for (const slot of ENLIGHTENMENT_INSTALLATION_SLOTS) {
    const installation = primaryBySlotId.get(slot.id) ?? supplementalBySlotId.get(slot.id);
    assert(installation?.layout, `${slot.id} has no physical installation`);
    assert.equal(installation.authored.backingWallId, slot.backingWallId, `${slot.id} backing-wall reference drifted`);
    assert.equal(installation.layout.spatialCellId, slot.spatialCellId, `${slot.id} moved to the wrong room`);
    assert.deepEqual(
      {
        x: installation.layout.position.x,
        z: installation.layout.position.z,
        rotationY: installation.layout.rotationY,
      },
      {x: slot.x, z: slot.z, rotationY: slot.rotationY},
      `${slot.id} moved off its authored wall bay`,
    );
  }
  const allInstallations = [
    ...definition.layout.exhibits,
    ...ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  ];
  assert.equal(allInstallations.length, 25);
  assertInstallationsDoNotOverlap('Gallery 18', program.rooms, allInstallations);
  const expectedRoomCounts = new Map([
    ['enlightenment-law-institutions', 6],
    ['enlightenment-society-freedom', 6],
    ['enlightenment-sentiment-commerce', 6],
    ['enlightenment-equality-education', 6],
    ['enlightenment-kant-critical', 1],
  ]);
  for (const room of program.rooms) {
    assert.equal(
      allInstallations.filter(({spatialCellId}) => spatialCellId === room.id).length,
      expectedRoomCounts.get(room.id),
      `${room.id} does not retain its approved installation count`,
    );
  }

  const axisAlignedBounds = ({center, size, rotation = 0}) => {
    const quarterTurn = Math.abs(Math.sin(rotation)) > .5;
    const width = quarterTurn ? size.depth : size.width;
    const depth = quarterTurn ? size.width : size.depth;
    return {
      minX: center.x - width / 2,
      maxX: center.x + width / 2,
      minZ: center.z - depth / 2,
      maxZ: center.z + depth / 2,
    };
  };
  const wallSupportsInstallation = (installation, wall) => {
    const wallBounds = axisAlignedBounds(wall);
    const installationBounds = axisAlignedBounds({
      center: installation.position,
      size: {width: installation.footprint.width, depth: installation.footprint.depth},
      rotation: installation.rotationY,
    });
    const back = {
      x: -Math.sin(installation.rotationY),
      z: -Math.cos(installation.rotationY),
    };
    const widthRunsAlongX = Math.abs(Math.cos(installation.rotationY)) > .5;
    const wallRun = widthRunsAlongX
      ? wallBounds.maxX - wallBounds.minX
      : wallBounds.maxZ - wallBounds.minZ;
    if (wallRun < installation.footprint.width - .06) return false;
    if (widthRunsAlongX && (
      installationBounds.minX < wallBounds.minX - .06
      || installationBounds.maxX > wallBounds.maxX + .06
    )) return false;
    if (!widthRunsAlongX && (
      installationBounds.minZ < wallBounds.minZ - .06
      || installationBounds.maxZ > wallBounds.maxZ + .06
    )) return false;
    for (let distanceBehind = .35; distanceBehind <= 1.6; distanceBehind += .05) {
      const point = {
        x: installation.position.x + back.x * distanceBehind,
        z: installation.position.z + back.z * distanceBehind,
      };
      if (
        point.x >= wallBounds.minX - .04
        && point.x <= wallBounds.maxX + .04
        && point.z >= wallBounds.minZ - .04
        && point.z <= wallBounds.maxZ + .04
      ) return true;
    }
    return false;
  };
  const physicalInstallations = [
    ...definition.layout.exhibits.map((layout) => ({
      id: layout.id,
      position: layout.position,
      rotationY: layout.rotationY,
      footprint: layout.scene.footprint,
    })),
    ...ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  ];
  for (const installation of physicalInstallations) {
    assert(
      definition.layout.wallColliders.some((wall) => wallSupportsInstallation(installation, wall)),
      `${installation.id} is not backed by an exhibit-sized Gallery 18 wall`,
    );
  }

  assert.deepEqual(ENLIGHTENMENT_PRIMARY_SCALE_FLOOR, {
    bayWidth: 3.8,
    objectWidth: 3.8,
    objectHeight: 3.55,
    footprintHeight: 4.44,
  });
  for (const layout of definition.layout.exhibits) {
    assert.equal(layout.scene.footprint.width, 3.8, `${layout.id} is no longer full-scale`);
    assert(layout.scene.mediaMounts.length >= 1, `${layout.id} lacks provenance-backed scene media`);
  }
  const kantPlacement = ENLIGHTENMENT_PRIMARY_PLACEMENTS.kant;
  const kant = definition.layout.exhibits.find(({id}) => id === 'kant');
  const kantBacking = kant?.scene.objectBounds.find(({id}) => id === 'kant-backing');
  assert(kant && kantBacking);
  assert.equal(kantPlacement.slotId, 'enlightenment-kant-critical:critical-screen');
  assert.equal(kantPlacement.backingWallId, kantBaffle.id);
  assert.equal(kant.spatialCellId, 'enlightenment-kant-critical');
  const cosine = Math.cos(kant.rotationY);
  const sine = Math.sin(kant.rotationY);
  const kantBackingBounds = axisAlignedBounds({
    center: {
      x: kant.position.x + cosine * kantBacking.center.x + sine * kantBacking.center.z,
      z: kant.position.z - sine * kantBacking.center.x + cosine * kantBacking.center.z,
    },
    size: kantBacking.size,
    rotation: kant.rotationY,
  });
  const kantBaffleBounds = axisAlignedBounds(kantBaffle);
  assert(close(kantBackingBounds.minZ, kantBaffleBounds.maxZ, .001), 'Kant backing is not flush with its independent baffle');
  assert(
    kantBackingBounds.minX >= kantBaffleBounds.minX - .01
      && kantBackingBounds.maxX <= kantBaffleBounds.maxX + .01,
    'Kant backing overhangs its independent baffle',
  );

  assert.deepEqual(definition.layout.primaryCirculation, ENLIGHTENMENT_PRIMARY_CIRCULATION);
  assert.deepEqual(ENLIGHTENMENT_PRIMARY_CIRCULATION.points[0], {x: 12, z: 0});
  assert.deepEqual(ENLIGHTENMENT_PRIMARY_CIRCULATION.points.at(-1), {x: -12, z: 0});
  assert(ENLIGHTENMENT_PRIMARY_CIRCULATION.points.every(({z}) => z === 0), 'Gallery 18 E0 → W0 route is no longer straight');
  assert.equal(ENLIGHTENMENT_PRIMARY_CIRCULATION.clearanceRadius, .72);
  const northToEastLeg = definition.layout.guidedWalkLegs.find(({fromExhibitId, toExhibitId}) =>
    fromExhibitId === 'montesquieu' && toExhibitId === 'rousseau');
  assert(northToEastLeg, 'Gallery 18 lacks its north-to-east guided leg');
  const northBypassIndex = northToEastLeg.waypoints.findIndex(({x, z}) => x >= 3 && z <= -3);
  const northBypass = northToEastLeg.waypoints[northBypassIndex];
  const eastBypassIndex = northToEastLeg.waypoints.findIndex(
    ({x, z}, index) => index > northBypassIndex && close(x, northBypass?.x ?? Number.NaN) && close(z, 0),
  );
  assert(
    northBypassIndex >= 0 && eastBypassIndex > northBypassIndex,
    `Gallery 18 north-to-east guided route no longer bypasses the Kant baffle on its east side: ${JSON.stringify(northToEastLeg.waypoints)}`,
  );
  const northDoorIndex = northToEastLeg.waypoints.findIndex(
    ({x, z}) => Math.abs(x) <= .01 && z > -4 && z < -3,
  );
  assert(northDoorIndex >= 0 && northDoorIndex < northBypassIndex);
  const comfortRadius = definition.layout.playerRadius + .16;
  const gallery18Colliders = allColliders(definition.layout);
  const comfortableCentralRoute = northToEastLeg.waypoints.slice(northDoorIndex, eastBypassIndex + 1);
  for (let index = 1; index < comfortableCentralRoute.length; index += 1) {
    sampleSegment(comfortableCentralRoute[index - 1], comfortableCentralRoute[index], .05, (point) => {
      assert(
        isValidMuseumPosition(
          point,
          comfortRadius,
          definition.layout.bounds,
          gallery18Colliders,
          definition.layout.spatialCells,
        ),
        `Gallery 18 north-to-east route loses its practical clearance near ${JSON.stringify(point)}`,
      );
    });
  }

  assert.deepEqual(sorted(Object.keys(ENLIGHTENMENT_ROOM_ENTRY_POSES)), sorted(ENLIGHTENMENT_ROOM_ORDER));
  for (const roomId of ENLIGHTENMENT_ROOM_ORDER) {
    const pose = ENLIGHTENMENT_ROOM_ENTRY_POSES[roomId];
    const bounds = ENLIGHTENMENT_ROOM_BOUNDS[roomId];
    assert(
      pose.x > bounds.minX && pose.x < bounds.maxX && pose.z > bounds.minZ && pose.z < bounds.maxZ,
      `${roomId} entry pose is outside its authored room`,
    );
    assert.deepEqual(
      definition.layout.entryViews.find(({spatialCellId}) => spatialCellId === roomId)?.pose,
      pose,
      `${roomId} entry view drifted`,
    );
    assert(validPose(definition, pose), `${roomId} entry pose is unsafe`);
    const sign = definition.layout.signs.find(({id}) => id === `${roomId}:room-sign`);
    assert.deepEqual(
      sign && {kicker: sign.kicker, title: sign.title, subtitle: sign.subtitle},
      ENLIGHTENMENT_ROOM_SIGN_COPY[roomId],
      `${roomId} physical sign differs from its authored interpretation`,
    );
  }
  assert.equal(definition.layout.signs.length, 6, 'Gallery 18 must retain one entrance sign and five room signs');
  assert.equal(definition.layout.signs.filter(({kind}) => kind === 'planned-status').length, 0, 'Gallery 18 still renders a planned-status sign');
  assert.equal(definition.layout.signs.find(({kind}) => kind === 'entrance')?.title, hall.title);

  assert.equal(runtimeNode.routePortals?.entry, 'E0');
  assert.equal(runtimeNode.routePortals?.exit, 'W0');
  assert.deepEqual(
    sorted(definition.resolvedTemplate.portalInterfaces.filter(({active}) => active).map(({manifestSlotId}) => manifestSlotId)),
    ['E0', 'W0'],
  );
  const eastEntrance = definition.entrances.find(({id}) => id === 'E0');
  assert(eastEntrance);
  assert.deepEqual(definition.layout.spawn, eastEntrance.arrivalPose, 'Gallery 18 does not spawn from its E0 chronological entrance');
  for (const neighborNodeId of ['hall:empiricism-science-political-order', 'hall:german-idealism-afterlives']) {
    const connection = MUSEUM_BUILDING_MANIFEST.connections.find(({a, b}) =>
      [a.nodeId, b.nodeId].includes(runtimeNode.id) && [a.nodeId, b.nodeId].includes(neighborNodeId));
    assert(connection?.accessible && connection.implementationStatus === 'live', `Gallery 18 lacks its live seam to ${neighborNodeId}`);
  }

  const imageIds = [
    ...hall.exhibits.map(({principalAssetId}) => principalAssetId),
    ...ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({assetId}) => assetId),
  ];
  assert.equal(imageIds.length, 25);
  assert.equal(new Set(imageIds).size, 25, 'Gallery 18 repeats a physical-installation image');
  assert.equal(getMuseumGuidedStops(hall.id, hall.guidedOrder).length, 25, 'Gallery 18 guided visit does not reach every installation');
  assert.match(canonicalSceneSource, /<EnlightenmentSupplementalExhibits/u, 'Gallery 18 does not mount its supplemental renderer');
  assert.match(successorSupplementalSceneSource, /export function EnlightenmentSupplementalExhibits/u, 'Gallery 18 supplemental renderer is absent');
  assert.match(successorSupplementalSceneSource, /getEnlightenmentSupplementalExhibit/u, 'Gallery 18 renderer does not resolve authored visitor content');
  assert.match(enlightenmentSupplementalDataSource, /export const ENLIGHTENMENT_SUPPLEMENTAL_EXHIBITS/u, 'Gallery 18 supplemental content is not exported');
});

const assertSequenceGalleryLintels = (label, galleryId, expectedDimensions, lintels) => {
  const definition = definitionById.get(galleryId);
  assert(definition, `${label} has no runtime definition`);
  assert.deepEqual(expectedDimensions, {
    width: 24,
    depth: 56,
    ceilingHeight: 5.8,
    wallThickness: .36,
    openingWidth: 4,
    openingHeight: 3.2,
  });
  assert(lintels.length > 0, `${label} has no interior lintels`);
  assert(lintels.every(({size, bottom, height}) =>
    close(size.width, 4)
    && close(size.depth, .36)
    && close(bottom, 3.2)
    && close(height, 2.6)), `${label} lintel dimensions drifted`);
  for (const lintel of lintels) {
    assert.deepEqual(
      definition.architectureWalls.find(({id}) => id === lintel.id),
      lintel,
      `${label}/${lintel.id} is absent from rendered architecture`,
    );
    assert(
      !definition.layout.wallColliders.some(({id}) => id === lintel.id),
      `${label}/${lintel.id} incorrectly closes a walkable opening`,
    );
  }
};

check('Gallery 19 is a complete four-room, 24-installation German Idealism and afterlives sequence', () => {
  assertCompleteSixWallSequenceGallery({
    label: 'Gallery 19',
    galleryId: GERMAN_IDEALISM_GALLERY_ID,
    roomCount: 4,
    primaryCount: 4,
    supplementalCount: 20,
    physicalCount: 24,
    primaryPlacements: GERMAN_IDEALISM_PRIMARY_PLACEMENTS,
    roomEntryPoses: GERMAN_IDEALISM_ROOM_ENTRY_POSES,
    roomSignCopy: GERMAN_IDEALISM_ROOM_SIGN_COPY,
    supplementalExhibits: GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBITS,
    supplementalLayouts: GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
    directNeighborNodeIds: ['hall:enlightenment-revolution-kant', 'crossing:band-04'],
  });
  assertSequenceGalleryLintels(
    'Gallery 19',
    GERMAN_IDEALISM_GALLERY_ID,
    GERMAN_IDEALISM_HALL_DIMENSIONS,
    germanIdealismInteriorLintels(),
  );
  assert.equal(germanIdealismInteriorLintels().length, 3, 'Gallery 19 must retain three render-only lintels');
  assert.match(canonicalSceneSource, /<GermanIdealismSupplementalExhibits/u, 'Gallery 19 does not mount its supplemental renderer');
  assert.match(successorSupplementalSceneSource, /getGermanIdealismSupplementalExhibit/u, 'Gallery 19 renderer does not resolve authored visitor content');
  assert.match(germanIdealismSupplementalDataSource, /export const GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBITS/u, 'Gallery 19 supplemental content is not exported');
  const romanticNature = GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === 'nature-romantic-beholder');
  assert(
    romanticNature?.sections.flatMap(({paragraphs}) => paragraphs).join(' ').includes('nature as visible spirit and spirit as invisible nature'),
    'Gallery 19 reverses Schelling’s visible-spirit / invisible-nature formulation',
  );
  const haitiDebate = GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === 'hegel-haiti-recognition-debate');
  assert(
    haitiDebate?.sources.some(({url}) => url === 'https://mimesisjournals.com/ojs/index.php/babelonline/article/view/2932'),
    'Gallery 19 lacks a debate-specific academic source for the contested Hegel–Haiti connection',
  );
  const haitiAsset = assetById.get('german-idealism-haiti-crete-a-pierrot');
  assert.match(haitiAsset?.creator ?? '', /Ernest Hébert/u, 'Gallery 19 misspells the Crête-à-Pierrot engraver’s name');
  assert.doesNotMatch(haitiAsset?.attribution ?? '', /Ernst Hébert/u, 'Gallery 19 retains the incorrect Crête-à-Pierrot attribution');
});

check('Gallery 20 is a complete four-room, 24-installation utility, liberty, and capital sequence', () => {
  assertCompleteSixWallSequenceGallery({
    label: 'Gallery 20',
    galleryId: UTILITY_LIBERTY_CAPITAL_GALLERY_ID,
    roomCount: 4,
    primaryCount: 3,
    supplementalCount: 21,
    physicalCount: 24,
    primaryPlacements: UTILITY_LIBERTY_CAPITAL_PRIMARY_PLACEMENTS,
    roomEntryPoses: UTILITY_LIBERTY_CAPITAL_ROOM_ENTRY_POSES,
    roomSignCopy: UTILITY_LIBERTY_CAPITAL_ROOM_SIGN_COPY,
    supplementalExhibits: UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBITS,
    supplementalLayouts: UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
    directNeighborNodeIds: ['crossing:band-04', 'hall:faith-pessimism-life-value'],
  });
  assertSequenceGalleryLintels(
    'Gallery 20',
    UTILITY_LIBERTY_CAPITAL_GALLERY_ID,
    UTILITY_LIBERTY_CAPITAL_HALL_DIMENSIONS,
    utilityLibertyCapitalInteriorLintels(),
  );
  assert.equal(utilityLibertyCapitalInteriorLintels().length, 3, 'Gallery 20 must retain three render-only lintels');
  assert.match(canonicalSceneSource, /<UtilityLibertyCapitalSupplementalExhibits/u, 'Gallery 20 does not mount its supplemental renderer');
  assert.match(successorSupplementalSceneSource, /getUtilityLibertyCapitalSupplementalExhibit/u, 'Gallery 20 renderer does not resolve authored visitor content');
  assert.match(utilityLibertyCapitalSupplementalDataSource, /export const UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBITS/u, 'Gallery 20 supplemental content is not exported');
});

check('Gallery 21 is a complete three-room, 18-installation faith, pessimism, and value sequence', () => {
  assertCompleteSixWallSequenceGallery({
    label: 'Gallery 21',
    galleryId: FAITH_PESSIMISM_VALUE_GALLERY_ID,
    roomCount: 3,
    primaryCount: 3,
    supplementalCount: 15,
    physicalCount: 18,
    primaryPlacements: FAITH_PESSIMISM_VALUE_PRIMARY_PLACEMENTS,
    roomEntryPoses: FAITH_PESSIMISM_VALUE_ROOM_ENTRY_POSES,
    roomSignCopy: FAITH_PESSIMISM_VALUE_ROOM_SIGN_COPY,
    supplementalExhibits: FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBITS,
    supplementalLayouts: FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
    directNeighborNodeIds: ['hall:utility-liberty-history-capital', 'turn:band-04-to-05'],
  });
  assertSequenceGalleryLintels(
    'Gallery 21',
    FAITH_PESSIMISM_VALUE_GALLERY_ID,
    FAITH_PESSIMISM_VALUE_HALL_DIMENSIONS,
    faithPessimismValueInteriorLintels(),
  );
  assert.equal(faithPessimismValueInteriorLintels().length, 2, 'Gallery 21 must retain two render-only lintels');
  assert.match(canonicalSceneSource, /<FaithPessimismValueSupplementalExhibits/u, 'Gallery 21 does not mount its supplemental renderer');
  assert.match(successorSupplementalSceneSource, /getFaithPessimismValueSupplementalExhibit/u, 'Gallery 21 renderer does not resolve authored visitor content');
  assert.match(faithPessimismValueSupplementalDataSource, /export const FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBITS/u, 'Gallery 21 supplemental content is not exported');
});

check('Gallery 22 is a complete four-room, 24-installation pragmatism and democratic-inquiry sequence', () => {
  assertCompleteSixWallSequenceGallery({
    label: 'Gallery 22',
    galleryId: PRAGMATISM_GALLERY_ID,
    roomCount: 4,
    primaryCount: 4,
    supplementalCount: 20,
    physicalCount: 24,
    primaryPlacements: PRAGMATISM_PRIMARY_PLACEMENTS,
    roomEntryPoses: PRAGMATISM_ROOM_ENTRY_POSES,
    roomSignCopy: PRAGMATISM_ROOM_SIGN_COPY,
    supplementalExhibits: PRAGMATISM_SUPPLEMENTAL_EXHIBITS,
    supplementalLayouts: PRAGMATISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
    directNeighborNodeIds: ['turn:band-04-to-05', 'hall:analytic-traditions'],
  });
  assertSequenceGalleryLintels(
    'Gallery 22',
    PRAGMATISM_GALLERY_ID,
    PRAGMATISM_HALL_DIMENSIONS,
    pragmatismInteriorLintels(),
  );
  assert.equal(pragmatismInteriorLintels().length, 3, 'Gallery 22 must retain three render-only lintels');
  assert.match(canonicalSceneSource, /<PragmatismSupplementalExhibits/u, 'Gallery 22 does not mount its supplemental renderer');
  assert.match(successorSupplementalSceneSource, /getPragmatismSupplementalExhibit/u, 'Gallery 22 renderer does not resolve authored visitor content');
  assert.match(pragmatismSupplementalDataSource, /export const PRAGMATISM_SUPPLEMENTAL_EXHIBITS/u, 'Gallery 22 supplemental content is not exported');
  const calaisExhibit = PRAGMATISM_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === 'peirce-coast-survey-observatory');
  assert.match(calaisExhibit?.lead ?? '', /granite instrument supports/u, 'Gallery 22 misdescribes the surviving Calais observatory remains');
  assert(
    calaisExhibit?.sources.some(({url}) => url.includes('maine.gov/mhpc/') && url.includes('calais-observatory')),
    'Gallery 22 lacks the official preservation record for the Calais observatory site',
  );
  const calaisAsset = assetById.get('peirce-coast-survey-calais-observatory');
  assert.match(calaisAsset?.alt ?? '', /granite instrument-support stones/u, 'Gallery 22 alt text does not describe the visible Calais remains');
  assert.doesNotMatch(calaisAsset?.alt ?? '', /\bbuilding\b/u, 'Gallery 22 alt text incorrectly claims the Calais observatory building survives');
  const alexandrinaAsset = assetById.get('william-james-alexandrina-woodcut-1865');
  assert.doesNotMatch(alexandrinaAsset?.alt ?? '', /Black Brazilian/u, 'Gallery 22 accessibility text assigns an unsupported modern identity to Alexandrina');

  const runtimeNode = MUSEUM_RUNTIME_NODES.find(({publicHallId}) => publicHallId === PRAGMATISM_GALLERY_ID);
  const definition = definitionById.get(PRAGMATISM_GALLERY_ID);
  assert(runtimeNode && definition);
  assert.equal(runtimeNode.routePortals.entry, 'S0', 'Gallery 22 must preserve the approved reverse-direction S0 entry');
  const entry = runtimeNode.entrances.find(({id}) => id === 'S0');
  assert(entry, 'Gallery 22 S0 entrance is absent from runtime geometry');
  assert.deepEqual(definition.layout.spawn, entry.arrivalPose, 'Gallery 22 default spawn is not the physical S0 arrival pose');
  const entranceSign = definition.layout.signs.find(({kind}) => kind === 'entrance');
  assert.equal(entranceSign?.id, 'pragmatism-continuities-reserve:room-sign', 'Gallery 22 entrance sign is not placed in the physically first zone');
  assert.equal(entranceSign?.rotationY, 0, 'Gallery 22 entrance sign faces away from visitors arriving through S0');
});

check('Gallery 23 is a complete four-room, 24-installation critique and deconstruction crossroads', () => {
  assertCompleteSixWallCrossroadsGallery({
    label: 'Gallery 23',
    galleryId: CRITIQUE_POWER_DECONSTRUCTION_GALLERY_ID,
    dimensions: CRITIQUE_POWER_DECONSTRUCTION_HALL_DIMENSIONS,
    roomOrder: CRITIQUE_POWER_DECONSTRUCTION_ROOM_ORDER,
    roomBounds: CRITIQUE_POWER_DECONSTRUCTION_ROOM_BOUNDS,
    expectedRoomBounds: {
      'continental-orientation': {minX: -14, maxX: 0, minZ: -14, maxZ: 0},
      'critique-genealogy-power': {minX: 0, maxX: 14, minZ: -14, maxZ: 0},
      'critique-deconstruction': {minX: 0, maxX: 14, minZ: 0, maxZ: 14},
      'critique-critical-theory': {minX: -14, maxX: 0, minZ: 0, maxZ: 14},
    },
    spatialConnections: CRITIQUE_POWER_DECONSTRUCTION_SPATIAL_CONNECTIONS,
    interiorWalls: critiquePowerDeconstructionInteriorWalls,
    installationSlots: CRITIQUE_POWER_DECONSTRUCTION_INSTALLATION_SLOTS,
    installsPerRoom: CRITIQUE_POWER_DECONSTRUCTION_INSTALLS_PER_ROOM,
    physicalInstallCount: CRITIQUE_POWER_DECONSTRUCTION_PHYSICAL_INSTALL_COUNT,
    primaryCount: 4,
    supplementalCount: 20,
    primaryPlacements: CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_PLACEMENTS,
    primaryScaleFloor: CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_SCALE_FLOOR,
    roomSignCopy: CRITIQUE_POWER_DECONSTRUCTION_ROOM_SIGN_COPY,
    roomEntryPoses: CRITIQUE_POWER_DECONSTRUCTION_ROOM_ENTRY_POSES,
    primaryCirculation: CRITIQUE_POWER_DECONSTRUCTION_PRIMARY_CIRCULATION,
    supplementalExhibits: CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBITS,
    supplementalLayouts: CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
    supplementalRecordGetter: getCritiquePowerDeconstructionSupplementalExhibit,
    curationValidation: CRITIQUE_POWER_DECONSTRUCTION_CURATION_VALIDATION,
    expectedPrimaryAssets: {
      'continental-philosophy': 'critique-continental-europe-orthographic',
      foucault: 'critique-foucault-watercolor-2013',
      derrida: 'critique-derrida-espinosa-drawing-2013',
      habermas: 'critique-habermas-critical-theory-heidelberg-1964',
    },
    expectedWorldTransform: {x: -75, z: 42, yaw: -3.14159265359},
    expectedWorldBounds: {minX: -89, maxX: -61, minZ: 28, maxZ: 56},
    entryPortalId: 'W0',
    exitPortalId: 'E0',
    entranceSign: {x: -13.78, z: 0, rotationY: -Math.PI / 2},
    roomSignPlacements: {
      'continental-orientation': {x: -9, z: -13.72, rotationY: 0},
      'critique-genealogy-power': {x: 9, z: -13.72, rotationY: 0},
      'critique-deconstruction': {x: 13.72, z: 9, rotationY: -Math.PI / 2},
      'critique-critical-theory': {x: -13.72, z: 9, rotationY: Math.PI / 2},
    },
  });

  assert.equal(
    [...canonicalSceneSource.matchAll(/<CritiquePowerDeconstructionSupplementalExhibits\b/gu)].length,
    1,
    'Gallery 23 must mount its supplemental renderer exactly once',
  );
  assert.match(successorSupplementalSceneSource, /export function CritiquePowerDeconstructionSupplementalExhibits/u, 'Gallery 23 supplemental renderer is absent');
  assert.match(successorSupplementalSceneSource, /getCritiquePowerDeconstructionSupplementalExhibit/u, 'Gallery 23 renderer does not resolve authored visitor content');
  assert.match(critiquePowerDeconstructionSupplementalDataSource, /export const CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBITS/u, 'Gallery 23 supplemental content is not exported');
  assert.match(critiquePowerDeconstructionCurationSource, /four-metre throat remains fully walkable/u, 'Gallery 23 curation no longer explains its open-cross clearance contract');
  assert.doesNotMatch(
    `${critiquePowerDeconstructionCurationSource}\n${critiquePowerDeconstructionSupplementalDataSource}`,
    /\b(?:planned gallery|forthcoming gallery|coming soon)\b/iu,
    'Gallery 23 retains stale unopened-gallery copy',
  );

  const foucaultAsset = assetById.get('critique-foucault-watercolor-2013');
  const derridaAsset = assetById.get('critique-derrida-espinosa-drawing-2013');
  const habermasAsset = assetById.get('critique-habermas-critical-theory-heidelberg-1964');
  assert.equal(foucaultAsset?.sourcePageUrl, 'https://commons.wikimedia.org/wiki/File:Michel_Foucault.jpg', 'Gallery 23 Foucault source drifted from the approved high-resolution drawing');
  assert.equal(derridaAsset?.sourcePageUrl, 'https://commons.wikimedia.org/wiki/File:Derrida_Dibujo.jpg', 'Gallery 23 Derrida source drifted from the approved high-resolution drawing');
  assert.equal(foucaultAsset?.likenessStatus, 'imagined', 'Gallery 23 presents the posthumous Foucault drawing as documentary');
  assert.equal(derridaAsset?.likenessStatus, 'imagined', 'Gallery 23 presents the posthumous Derrida drawing as documentary');
  assert.match(foucaultAsset?.historicalNote ?? '', /almost three decades after Foucault’s death[\s\S]*imagined likeness/u, 'Gallery 23 does not disclose the Foucault portrait’s later construction');
  assert.match(derridaAsset?.historicalNote ?? '', /nine years after Derrida’s death[\s\S]*not a lifetime likeness/u, 'Gallery 23 does not disclose the Derrida portrait’s later construction');
  assert.equal(habermasAsset?.sourcePageUrl, 'https://commons.wikimedia.org/wiki/File:AdornoHorkheimerHabermasbyJeremyJShapiro2.png', 'Gallery 23 Habermas source drifted from the approved 1964 group photograph');
  assert.match(habermasAsset?.historicalNote ?? '', /group photograph records proximity, not agreement/u, 'Gallery 23 overclaims what the Habermas group photograph proves');
});

check('Gallery 24 is a complete four-room, 24-installation moral-life crossroads with its reverse route intact', () => {
  assertCompleteSixWallCrossroadsGallery({
    label: 'Gallery 24',
    galleryId: MORAL_LIFE_PRACTICAL_REASON_GALLERY_ID,
    dimensions: MORAL_LIFE_PRACTICAL_REASON_HALL_DIMENSIONS,
    roomOrder: MORAL_LIFE_PRACTICAL_REASON_ROOM_ORDER,
    roomBounds: MORAL_LIFE_PRACTICAL_REASON_ROOM_BOUNDS,
    expectedRoomBounds: {
      'moral-ethics-orientation': {minX: -14, maxX: 0, minZ: -14, maxZ: 0},
      'moral-character-virtue': {minX: 0, maxX: 14, minZ: -14, maxZ: 0},
      'moral-duty-consequence': {minX: 0, maxX: 14, minZ: 0, maxZ: 14},
      'moral-rights-persons-futures': {minX: -14, maxX: 0, minZ: 0, maxZ: 14},
    },
    spatialConnections: MORAL_LIFE_PRACTICAL_REASON_SPATIAL_CONNECTIONS,
    interiorWalls: moralLifePracticalReasonInteriorWalls,
    installationSlots: MORAL_LIFE_PRACTICAL_REASON_INSTALLATION_SLOTS,
    installsPerRoom: MORAL_LIFE_PRACTICAL_REASON_INSTALLS_PER_ROOM,
    physicalInstallCount: MORAL_LIFE_PRACTICAL_REASON_PHYSICAL_INSTALL_COUNT,
    primaryCount: 8,
    supplementalCount: 16,
    primaryPlacements: MORAL_LIFE_PRACTICAL_REASON_PRIMARY_PLACEMENTS,
    primaryScaleFloor: MORAL_LIFE_PRACTICAL_REASON_PRIMARY_SCALE_FLOOR,
    roomSignCopy: MORAL_LIFE_PRACTICAL_REASON_ROOM_SIGN_COPY,
    roomEntryPoses: MORAL_LIFE_PRACTICAL_REASON_ROOM_ENTRY_POSES,
    primaryCirculation: MORAL_LIFE_PRACTICAL_REASON_PRIMARY_CIRCULATION,
    supplementalExhibits: MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBITS,
    supplementalLayouts: MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
    supplementalRecordGetter: getMoralLifePracticalReasonSupplementalExhibit,
    curationValidation: MORAL_LIFE_PRACTICAL_REASON_CURATION_VALIDATION,
    expectedPrimaryAssets: {
      ethics: 'moral-ethics-seven-works-mercy',
      'virtue-ethics': 'moral-virtue-aristotle-homer',
      'iris-murdoch': 'moral-murdoch-charlbury-road',
      'philippa-foot': 'moral-foot-somerville-1939',
      deontology: 'moral-deontology-oath-horatii',
      utilitarianism: 'moral-utilitarian-sidgwick-portrait',
      'judith-thomson': 'moral-thomson-trolley-problem',
      'derek-parfit': 'moral-parfit-all-souls-college',
    },
    expectedWorldTransform: {x: -75, z: 70, yaw: -3.14159265359},
    expectedWorldBounds: {minX: -89, maxX: -61, minZ: 56, maxZ: 84},
    entryPortalId: 'E0',
    exitPortalId: 'W0',
    entranceSign: {x: 13.78, z: 0, rotationY: Math.PI / 2},
    roomSignPlacements: {
      'moral-ethics-orientation': {x: -9, z: -13.72, rotationY: 0},
      'moral-character-virtue': {x: 9, z: -13.72, rotationY: 0},
      'moral-duty-consequence': {x: 13.72, z: 9, rotationY: -Math.PI / 2},
      'moral-rights-persons-futures': {x: -13.72, z: 9, rotationY: Math.PI / 2},
    },
  });

  assert.equal(
    [...canonicalSceneSource.matchAll(/<MoralLifePracticalReasonSupplementalExhibits\b/gu)].length,
    1,
    'Gallery 24 must mount its supplemental renderer exactly once',
  );
  assert.match(successorSupplementalSceneSource, /export function MoralLifePracticalReasonSupplementalExhibits/u, 'Gallery 24 supplemental renderer is absent');
  assert.match(successorSupplementalSceneSource, /getMoralLifePracticalReasonSupplementalExhibit/u, 'Gallery 24 renderer does not resolve authored visitor content');
  assert.match(moralLifePracticalReasonSupplementalDataSource, /export const MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBITS/u, 'Gallery 24 supplemental content is not exported');
  assert.match(moralLifePracticalReasonCurationSource, /one moral forum rather than four sealed corridors/u, 'Gallery 24 curation no longer explains its open-cross model');
  assert.doesNotMatch(
    `${moralLifePracticalReasonCurationSource}\n${moralLifePracticalReasonSupplementalDataSource}`,
    /\b(?:planned gallery|forthcoming gallery|coming soon)\b/iu,
    'Gallery 24 retains stale unopened-gallery copy',
  );

  const murdochAsset = assetById.get('moral-murdoch-charlbury-road');
  const footAsset = assetById.get('moral-foot-somerville-1939');
  const thomsonAsset = assetById.get('moral-thomson-trolley-problem');
  const parfitAsset = assetById.get('moral-parfit-all-souls-college');
  assert.equal(murdochAsset?.role, 'context', 'Gallery 24 misrepresents Murdoch’s house as a likeness');
  assert.match(murdochAsset?.historicalNote ?? '', /contextual, not a likeness/u, 'Gallery 24 does not disclose that Murdoch’s primary image is contextual');
  assert.equal(footAsset?.likenessStatus, 'uncertain', 'Gallery 24 overstates Philippa Foot’s position in a group photograph');
  assert.match(footAsset?.historicalNote ?? '', /does not identify her position in the group/u, 'Gallery 24 omits the uncertainty in Foot’s group photograph');
  assert.equal(thomsonAsset?.role, 'context', 'Gallery 24 misrepresents the trolley diagram as a Thomson likeness');
  assert.match(thomsonAsset?.historicalNote ?? '', /not made by Thomson[\s\S]*not her portrait/u, 'Gallery 24 does not disclose the trolley diagram’s status');
  assert.equal(parfitAsset?.role, 'context', 'Gallery 24 misrepresents All Souls College as a Parfit likeness');
  assert.match(parfitAsset?.historicalNote ?? '', /does not depict Parfit/u, 'Gallery 24 does not disclose that Parfit’s primary image is contextual');
});

check('Gallery 26 is a complete three-room, 18-installation colonialism, race, and liberation sequence', () => {
  assertCompleteSixWallSequenceGallery({
    label: 'Gallery 26',
    galleryId: COLONIALISM_RACE_LIBERATION_GALLERY_ID,
    roomCount: 3,
    primaryCount: 3,
    supplementalCount: 15,
    physicalCount: 18,
    primaryPlacements: COLONIALISM_RACE_LIBERATION_PRIMARY_PLACEMENTS,
    roomEntryPoses: COLONIALISM_RACE_LIBERATION_ROOM_ENTRY_POSES,
    roomSignCopy: COLONIALISM_RACE_LIBERATION_ROOM_SIGN_COPY,
    supplementalExhibits: COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBITS,
    supplementalLayouts: COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
    directNeighborNodeIds: ['hall:feminist-philosophies', 'place:final-return-threshold'],
  });
  assertSequenceGalleryLintels(
    'Gallery 26',
    COLONIALISM_RACE_LIBERATION_GALLERY_ID,
    COLONIALISM_RACE_LIBERATION_HALL_DIMENSIONS,
    colonialismRaceLiberationInteriorLintels(),
  );
  assert.equal(colonialismRaceLiberationInteriorLintels().length, 2, 'Gallery 26 must retain two render-only lintels');
  assert.equal(
    [...canonicalSceneSource.matchAll(/<ColonialismRaceLiberationSupplementalExhibits\b/gu)].length,
    1,
    'Gallery 26 must mount its supplemental renderer exactly once',
  );
  assert.match(successorSupplementalSceneSource, /export function ColonialismRaceLiberationSupplementalExhibits/u, 'Gallery 26 supplemental renderer is absent');
  assert.match(successorSupplementalSceneSource, /getColonialismRaceLiberationSupplementalExhibit/u, 'Gallery 26 renderer does not resolve authored visitor content');
  assert.match(colonialismRaceLiberationSupplementalDataSource, /export const COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBITS/u, 'Gallery 26 supplemental content is not exported');
  assert.doesNotMatch(
    `${colonialismRaceLiberationCurationSource}\n${colonialismRaceLiberationSupplementalDataSource}`,
    /\b(?:planned gallery|forthcoming gallery|coming soon)\b/iu,
    'Gallery 26 retains stale unopened-gallery copy',
  );

  const program = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === COLONIALISM_RACE_LIBERATION_GALLERY_ID);
  const definition = definitionById.get(COLONIALISM_RACE_LIBERATION_GALLERY_ID);
  const runtimeNode = MUSEUM_RUNTIME_NODES.find(({publicHallId}) =>
    publicHallId === COLONIALISM_RACE_LIBERATION_GALLERY_ID);
  assert(program && definition && runtimeNode);
  assert.deepEqual(
    program.rooms.map(({exhibits}) => exhibits.map(({id}) => id)),
    [['fanon'], ['angela-davis', 'bell-hooks'], []],
    'Gallery 26 canonical primaries drifted or a contextual continuity was promoted without approval',
  );
  assert.deepEqual(
    Object.fromEntries(program.rooms.map((room) => [
      room.id,
      [
        ...room.exhibits.map(({id}) => id),
        ...COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBIT_LAYOUTS
          .filter(({spatialCellId}) => spatialCellId === room.id)
          .map(({id}) => id),
      ].length,
    ])),
    {
      'colonial-embodiment-liberation': 6,
      'colonial-black-feminism-abolition': 6,
      'colonial-context-reserve': 6,
    },
    'Gallery 26 must retain a 6/6/6 room distribution',
  );
  assert.deepEqual(
    Object.fromEntries(program.rooms.flatMap(({exhibits}) => exhibits.map(({id, principalAssetId}) => [id, principalAssetId]))),
    {
      fanon: 'colonial-fanon-portrait',
      'angela-davis': 'colonial-davis-portrait',
      'bell-hooks': 'colonial-hooks-portrait',
    },
    'Gallery 26 primary media assignments drifted',
  );
  const davisInterpretation = MUSEUM_INTERPRETATIONS.find(
    ({hallId, id}) => hallId === COLONIALISM_RACE_LIBERATION_GALLERY_ID && id === 'angela-davis',
  );
  assert(davisInterpretation, 'Gallery 26 Angela Davis primary interpretation is missing');
  const davisFactLabels = museumInterpretationFacts(davisInterpretation).map(({label}) => label);
  assert(davisFactLabels.includes('Born'), 'Gallery 26 Angela Davis drawer must label her 1944 life event as Born');
  assert(
    davisFactLabels.includes('Evidence / interpretive cautions'),
    'Gallery 26 primary drawer must use the accurate evidence-and-cautions fact label',
  );
  assert(
    !davisFactLabels.includes('Surviving evidence'),
    'Gallery 26 primary drawer retains the misleading Surviving evidence fact label',
  );
  assert.equal(runtimeNode.routePortals.entry, 'N0', 'Gallery 26 must preserve its approved N0 entry');
  assert.equal(runtimeNode.routePortals.exit, 'S0', 'Gallery 26 must preserve its approved S0 exit');
  const entry = runtimeNode.entrances.find(({id}) => id === 'N0');
  assert(entry, 'Gallery 26 N0 entrance is absent from runtime geometry');
  assert.deepEqual(definition.layout.spawn, entry.arrivalPose, 'Gallery 26 default spawn is not the physical N0 arrival pose');
  const entranceSign = definition.layout.signs.find(({kind}) => kind === 'entrance');
  assert.equal(entranceSign?.id, 'colonial-embodiment-liberation:room-sign', 'Gallery 26 entrance sign is not placed in the physically first room');
  assert.equal(entranceSign?.rotationY, Math.PI, 'Gallery 26 entrance sign faces away from visitors arriving through N0');

  for (const [id, expected] of Object.entries(COLONIALISM_RACE_LIBERATION_CONTEXTUAL_ANCHOR_PLACEMENTS)) {
    const layout = COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBIT_LAYOUTS.find((candidate) => candidate.id === id);
    assert(layout, `Gallery 26 contextual anchor ${id} is missing`);
    assert.deepEqual(
      {x: layout.position.x, z: layout.position.z, rotationY: layout.rotationY},
      expected,
      `Gallery 26 contextual anchor ${id} drifted`,
    );
    assert.equal(layout.footprint.width, 4.6, `Gallery 26 contextual anchor ${id} is not full scale`);
    assert.equal(getColonialismRaceLiberationSupplementalExhibit(layout.id).id, layout.id);
  }
  assert.equal(
    COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBIT_LAYOUTS
      .filter(({spatialCellId}) => spatialCellId === 'colonial-context-reserve').length,
    6,
    'Gallery 26 continuity room must contain six contextual installations',
  );
  assert(
    getColonialismRaceLiberationSupplementalExhibit('ngugi-language-decolonization').sources
      .some(({url}) => url === 'https://www.humanities.uci.edu/news/power-language'),
    'Gallery 26 Ngũgĩ interpretation must retain its exact UC Irvine source',
  );
  assert(
    getColonialismRaceLiberationSupplementalExhibit('wynter-humanism-coloniality').sources
      .some(({url}) => url === 'https://historicalsociety.stanford.edu/sylvia-wynter'),
    'Gallery 26 Wynter interpretation must retain its exact Stanford oral-history source',
  );
});

check('Gallery 06 is an open, wall-supported 25-exhibit Forum with full-scale primaries', () => {
  const forumProgram = MUSEUM_CANONICAL_PROGRAM.find(({id}) => id === 'core-questions-forum');
  const forumDirectory = hallById.get('core-questions-forum');
  const forumDefinition = definitionById.get('core-questions-forum');
  assert(forumProgram && forumDirectory && forumDefinition);
  assert.equal(forumProgram.rooms.length, 9);
  assert.equal(forumProgram.recordCapacity, 25);
  assert.equal(forumDefinition.layout.exhibits.length, 15);
  assert.equal(forumDefinition.layout.supplementalExhibits?.length, 10);
  assert.equal(CORE_QUESTIONS_FORUM_SUPPLEMENTAL_EXHIBITS.length, 10);
  assert.equal(CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS.length, 10);
  assert.equal(
    forumDefinition.layout.exhibits.length + (forumDefinition.layout.supplementalExhibits?.length ?? 0),
    forumProgram.recordCapacity,
    'Gallery 06 no longer fills its approved 25-installation capacity',
  );

  for (const room of forumProgram.rooms) {
    const supplementalCount = CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS
      .filter(({spatialCellId}) => spatialCellId === room.id).length;
    assert.equal(
      room.exhibits.length + supplementalCount,
      room.recordCapacity,
      `${room.id} does not fill its approved Forum capacity`,
    );
  }

  const largestPrimaryWidth = Math.max(...forumDefinition.layout.exhibits.map(({scene}) => scene.footprint.width));
  const largestPrimaryHeight = Math.max(...forumDefinition.layout.exhibits.map(({scene}) => scene.footprint.height));
  const largestSupplementalWidth = Math.max(...CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS.map(({footprint}) => footprint.width));
  const largestSupplementalHeight = Math.max(...CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS.map(({footprint}) => footprint.height));
  for (const layout of forumDefinition.layout.exhibits) {
    const backing = layout.scene.objectBounds.find(({id}) => id.endsWith('-backing'));
    assert(backing, `${layout.id} lacks its full-scale primary backing`);
    assert.equal(layout.scene.footprint.width, largestPrimaryWidth, `${layout.id} is narrower than another Forum primary`);
    assert.equal(layout.scene.footprint.height, largestPrimaryHeight, `${layout.id} is shorter than another Forum primary`);
    assert.equal(backing.size.width, largestPrimaryWidth, `${layout.id} backing is narrower than another Forum primary`);
    assert.equal(backing.size.height, 3.55, `${layout.id} backing lost the Gallery 03–05 primary height`);
    assert(layout.scene.mediaMounts.length >= 1, `${layout.id} lacks an image-led installation`);
  }
  assert.equal(largestPrimaryWidth, 3.8, 'Gallery 06 primary width drifted from the established anchor standard');
  assert.equal(largestPrimaryHeight, 3.71, 'Gallery 06 primary height drifted from the established anchor standard');
  assert(largestPrimaryWidth > largestSupplementalWidth, 'A Forum supplemental is as wide as a primary');
  assert(largestPrimaryHeight > largestSupplementalHeight, 'A Forum supplemental is as tall as a primary');

  const expectedFieldAssets = new Map([
    ['metaphysics', 'metaphysics-reality-layers-interpretive'],
    ['ontology', 'ontology-being-process-interpretive'],
    ['epistemology', 'epistemology-evidence-lens-interpretive'],
    ['philosophy-of-mind', 'philosophy-mind-subjective-objective-interpretive'],
    ['logic', 'logic-hamilton-euler-diagrams-1874'],
    ['philosophy-of-language', 'language-rosetta-stone-1922'],
    ['philosophy-of-science', 'science-air-pump-wright-1768'],
    ['aesthetics', 'aesthetics-hokusai-great-wave'],
    ['philosophy-of-religion', 'philosophy-religion-plural-inquiry-interpretive'],
  ]);
  const forumPrimaries = forumProgram.rooms.flatMap(({exhibits}) => exhibits);
  const forumImageIds = [
    ...forumPrimaries.map(({principalAssetId}) => principalAssetId),
    ...CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS.map(({assetId}) => assetId),
  ];
  assert.equal(forumImageIds.length, 25);
  assert.equal(new Set(forumImageIds).size, 25, 'Gallery 06 repeats a wall image');
  for (const [exhibitId, assetId] of expectedFieldAssets) {
    const exhibit = forumPrimaries.find(({id}) => id === exhibitId);
    assert.equal(exhibit?.principalAssetId, assetId, `${exhibitId} lost its dedicated field visual`);
    assert(assetById.has(assetId), `${exhibitId} uses missing asset ${assetId}`);
  }
  assert(!forumImageIds.some((assetId) => /grave|plaque/.test(assetId ?? '')), 'Gallery 06 restored a grave or plaque image');
  for (const layout of CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS) {
    const asset = assetById.get(layout.assetId);
    assert(asset, `${layout.id} uses missing asset ${layout.assetId}`);
    assert(asset.sourcePageUrl?.startsWith('https://'), `${layout.id} lacks a real source page`);
    assert(asset.attribution?.trim().length >= 24, `${layout.id} lacks practical attribution`);
  }
  assert.deepEqual(
    sorted(CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS.map(({id}) => id)),
    sorted(CORE_QUESTIONS_FORUM_PHYSICAL_LENS_IDS),
    'Gallery 06 physical comparative-lens roster drifted',
  );
  assert(
    canonicalExhibitsSource.includes("definition.id === 'core-questions-forum'"),
    'Gallery 06 must retain the full-scale primary renderer instead of the compact legacy treatment',
  );
  assert.match(canonicalSceneSource, /<CoreQuestionsForumSupplementalExhibits/u, 'Gallery 06 does not mount its physical comparative lenses');
  assert.match(forumSupplementalSceneSource, /interactionForSupplemental/u, 'Gallery 06 comparative lenses lack stable interaction identity');
  assert.match(forumSupplementalSceneSource, /MuseumSceneMedia/u, 'Gallery 06 comparative lenses lack provenance-backed media');
  assert.match(forumSupplementalDataSource, /guidedAfterExhibitId/u, 'Gallery 06 empty portal rooms lost their guided-tour anchors');

  const axisAlignedBounds = ({center, size, rotation = 0}) => {
    const quarterTurn = Math.abs(Math.sin(rotation)) > .5;
    const width = quarterTurn ? size.depth : size.width;
    const depth = quarterTurn ? size.width : size.depth;
    return {
      minX: center.x - width / 2,
      maxX: center.x + width / 2,
      minZ: center.z - depth / 2,
      maxZ: center.z + depth / 2,
    };
  };
  const wallSupportsInstallation = (installation, wall) => {
    const wallBounds = axisAlignedBounds(wall);
    const installationBounds = axisAlignedBounds({
      center: installation.position,
      size: {width: installation.footprint.width, depth: installation.footprint.depth},
      rotation: installation.rotationY,
    });
    const back = {
      x: -Math.sin(installation.rotationY),
      z: -Math.cos(installation.rotationY),
    };
    const widthRunsAlongX = Math.abs(Math.cos(installation.rotationY)) > .5;
    const wallRun = widthRunsAlongX
      ? wallBounds.maxX - wallBounds.minX
      : wallBounds.maxZ - wallBounds.minZ;
    if (wallRun < installation.footprint.width - .06) return false;
    if (widthRunsAlongX && (
      installationBounds.minX < wallBounds.minX - .06
      || installationBounds.maxX > wallBounds.maxX + .06
    )) return false;
    if (!widthRunsAlongX && (
      installationBounds.minZ < wallBounds.minZ - .06
      || installationBounds.maxZ > wallBounds.maxZ + .06
    )) return false;
    for (let distanceBehind = .35; distanceBehind <= 1.6; distanceBehind += .05) {
      const point = {
        x: installation.position.x + back.x * distanceBehind,
        z: installation.position.z + back.z * distanceBehind,
      };
      if (
        point.x >= wallBounds.minX - .04
        && point.x <= wallBounds.maxX + .04
        && point.z >= wallBounds.minZ - .04
        && point.z <= wallBounds.maxZ + .04
      ) return true;
    }
    return false;
  };
  const physicalInstallations = [
    ...forumDefinition.layout.exhibits.map((layout) => ({
      id: layout.id,
      position: layout.position,
      rotationY: layout.rotationY,
      footprint: layout.scene.footprint,
    })),
    ...CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS,
  ];
  for (const installation of physicalInstallations) {
    assert(
      forumDefinition.layout.wallColliders.some((wall) => wallSupportsInstallation(installation, wall)),
      `${installation.id} is not backed by an exhibit-sized Forum wall`,
    );
    const installationBounds = axisAlignedBounds({
      center: installation.position,
      size: {width: installation.footprint.width, depth: installation.footprint.depth},
      rotation: installation.rotationY,
    });
    for (const wall of forumDefinition.layout.wallColliders) {
      const wallBounds = axisAlignedBounds(wall);
      assert(
        !(
          installationBounds.minX < wallBounds.maxX - .001
          && installationBounds.maxX > wallBounds.minX + .001
          && installationBounds.minZ < wallBounds.maxZ - .001
          && installationBounds.maxZ > wallBounds.minZ + .001
        ),
        `${installation.id} intersects structural wall ${wall.id}`,
      );
    }
  }
  const northSouthSupports = forumDefinition.layout.wallColliders.filter(({id}) =>
    /:forum-v-(?:west|east)-(?:north|south)$/u.test(id));
  assert.equal(northSouthSupports.length, 4, 'Gallery 06 lost a crosscut-edge support wall');
  assert(northSouthSupports.every(({center, size}) =>
    close(Math.abs(center.x), 5)
      && close(Math.abs(center.z), 11.333)
      && close(size.width, .36)
      && close(size.depth, 5.333)
      && Math.abs(center.z) + size.depth / 2 >= 13.999),
  'Gallery 06 crosscut supports intrude into the doorway or leave a perimeter slit');
  assert.deepEqual(
    sorted(Object.keys(CORE_QUESTIONS_FORUM_PRIMARY_PLACEMENTS)),
    sorted(forumDefinition.layout.exhibits.map(({id}) => id)),
    'Gallery 06 primary authored-placement roster drifted',
  );
  assert.equal(forumDefinition.layout.spatialConnections.length, 12, 'Gallery 06 lost a room-to-room opening');
  assert.equal(forumDefinition.layout.primaryCirculation.points.length, 7, 'Gallery 06 lost one arm of its four-way circulation cross');

  const plannedHallIds = new Set(Object.keys(MUSEUM_PLANNED_HALL_TITLES));
  const culturallyOutwardHallIds = new Set([
    'classical-south-asian-worlds',
    'buddhist-philosophies',
    'classical-chinese-traditions',
    'islamic-philosophical-worlds',
    'jewish-philosophy',
  ]);
  const primaryExhibitIds = new Set(MUSEUM_CANONICAL_PROGRAM.flatMap(({rooms}) => rooms.flatMap(({exhibits}) => exhibits.map(({id}) => id))));
  const forumPrimaryEntityIds = new Set(forumProgram.rooms.flatMap(({exhibits}) => exhibits.map(({entityId}) => entityId)));
  const philosopherIds = new Set(philosophers.map(({id}) => id));
  const lensIds = [];
  const lensEntityIds = [];

  for (const room of forumProgram.rooms) {
    const lenses = room.comparativeLenses ?? [];
    assert(lenses.length >= 2, `${room.id} must carry at least two comparative lenses`);
    assert(unique(lenses.map(({id}) => id)), `${room.id} repeats a comparative-lens id`);
    assert(unique(lenses.map(({entityId}) => entityId)), `${room.id} repeats a comparative entity`);
    assert(unique(lenses.map(({displayName}) => displayName)), `${room.id} repeats a comparative display name`);
    assert(unique(lenses.map(({culturalSetting}) => culturalSetting)), `${room.id} repeats a cultural setting`);
    assert(lenses.some(({primaryHallId}) => culturallyOutwardHallIds.has(primaryHallId)), `${room.id} lacks a lens outside modern European/North-American framing`);

    const directoryRoom = forumDirectory.zones.find(({id}) => id === room.id);
    assert.deepEqual(directoryRoom?.comparativeLenses, lenses, `${room.id} comparative lenses are missing or stale in the directory`);
    for (const lens of lenses) {
      assert(lens.id.trim().length >= 5, `${room.id} has an invalid comparative-lens id`);
      assert(philosopherIds.has(lens.entityId), `${room.id}/${lens.id} does not name a registered philosopher`);
      assert(lens.displayName.trim().length >= 8, `${room.id}/${lens.id} lacks a useful display name`);
      assert(lens.culturalSetting.trim().length >= 12, `${room.id}/${lens.id} lacks a substantive cultural setting`);
      assert(plannedHallIds.has(lens.primaryHallId), `${room.id}/${lens.id} points to an unknown planned primary hall`);
      assert.notEqual(lens.primaryHallId, 'core-questions-forum', `${room.id}/${lens.id} must route outward from the Forum`);
      assert(lens.rationale.trim().length >= 48, `${room.id}/${lens.id} lacks a substantive routing rationale`);
      assert(!primaryExhibitIds.has(lens.id), `${room.id}/${lens.id} was incorrectly counted as a primary exhibit`);
      assert(!forumPrimaryEntityIds.has(lens.entityId), `${room.id}/${lens.id} duplicates a Forum primary assignment`);
      lensIds.push(lens.id);
      lensEntityIds.push(lens.entityId);
    }
  }

  assert(unique(lensIds), 'Forum comparative-lens ids must be globally unique');
  const requiredEntities = ['aristotle', 'patanjali', 'kanada', 'nagarjuna', 'dignaga', 'dharmakirti', 'confucius', 'zhuangzi', 'maimonides'];
  for (const entityId of requiredEntities) assert(lensEntityIds.includes(entityId), `Forum comparative lenses omit required entity ${entityId}`);
  const islamicThinkers = new Set(['al-farabi', 'al-ghazali', 'avicenna', 'averroes', 'mulla-sadra', 'suhrawardi']);
  assert(lensEntityIds.some((entityId) => islamicThinkers.has(entityId)), 'Forum comparative lenses require at least one named Islamic thinker');
  const wayfindingSigns = forumDefinition.layout.signs.filter(({kind}) => kind === 'wayfinding');
  assert.equal(wayfindingSigns.length, 0, 'Gallery 06 restored floating comparative-lens signs in place of exhibits');
  const roomSigns = forumDefinition.layout.signs.filter(({kind}) => kind === 'zone');
  assert.equal(roomSigns.length, 9);
  const ethicsPortalSign = roomSigns.find(({title}) => title === 'Ethics');
  const compactRoomSigns = roomSigns.filter(({title}) => title !== 'Ethics');
  assert(compactRoomSigns.every(({width, height, position}) => width <= 3.65 && height === .68 && position.y < 5), 'Forum field-room labels must remain compact and wall-backed');
  assert(ethicsPortalSign?.width === 5.6 && ethicsPortalSign.height === 1.08 && ethicsPortalSign.position.y === 3.45, 'The Ethics portal must retain its prominent wall-backed orientation panel');
  assert.equal(forumDefinition.layout.signs.filter(({kind}) => kind === 'entrance').length, 1);
  assert.match(exhibitWallStandardSource, /Core Questions Forum exception/u, 'The Gallery 06 wall standard is not recorded for future work');
});

check('the executable manifest exactly implements the approved Continuous Enfilade contract', () => {
  assert.equal(buildingManifest.schemaVersion, 2);
  assert.equal(buildingManifest.manifestVersion, 'continuous-enfilade-single-level-v1');
  assert.equal(buildingManifest.status, 'implemented-approved-continuous-enfilade');
  assert.equal(buildingManifest.physicalOptionId, 'continuous-enfilade-single-level');
  assert.deepEqual(buildingManifest.runtimeEmbedding, singleLevelPlan.runtimeEmbedding);
  assert.deepEqual(MUSEUM_BUILDING_MANIFEST, buildingManifest, 'the imported runtime manifest differs from the generated artifact');
  assert.deepEqual(
    buildingManifest.counts,
    {
      halls: 26,
      rooms: 105,
      curatedOpen: 25,
      plannedWalkable: 1,
      reserves: 2,
      hallCount: 26,
      curatedOpenHallCount: 25,
      plannedWalkableHallCount: 1,
      canonicalRoomCount: 105,
      nodeCount: 39,
      connectionCount: 43,
      throughRouteConnectionCount: 37,
      crosscutConnectionCount: 6,
      crosscutIntersectionCount: 6,
      standaloneCrossingNodeCount: 5,
      turnCourtCount: 5,
      reserveCount: 2,
      plannedStatusSignCount: 1,
    },
  );

  const hallNodes = buildingManifest.nodes.filter(({kind}) => kind === 'hall');
  const curatedNodes = hallNodes.filter(({galleryState}) => galleryState === 'curated-open');
  const plannedNodes = hallNodes.filter(({galleryState}) => galleryState === 'planned-walkable');
  assert.equal(hallNodes.length, 26);
  assert.equal(curatedNodes.length, 25);
  assert.equal(plannedNodes.length, 1);
  assert.deepEqual(sorted(curatedNodes.map(({publicHallId}) => publicHallId)), sorted(HALL_IDS));
  assert.deepEqual(plannedNodes.map(({programHallId}) => programHallId), ['feminist-philosophies']);
  assert(plannedNodes.every(({publicHallId, fastTravelEligible}) => publicHallId === undefined && fastTravelEligible !== true));
  for (const promotedHallId of [
    'german-idealism-afterlives',
    'pragmatism-democratic-inquiry',
    'critique-power-deconstruction',
    'moral-life-practical-reason',
    'colonialism-race-liberation',
  ]) {
    const node = hallNodes.find(({programHallId}) => programHallId === promotedHallId);
    assert.equal(node?.galleryState, 'curated-open', `${promotedHallId} did not promote to curated/open`);
    assert.equal(node?.publicHallId, promotedHallId, `${promotedHallId} lacks its public content id`);
    assert.equal(node?.geometry, undefined, `${promotedHallId} still uses planned-shell geometry`);
  }
  assert.equal(buildingManifest.nodes.length, 39);
  assert.equal(MUSEUM_RUNTIME_NODES.length, 39);
  assert.equal(buildingManifest.connections.length, 43);
  assert.equal(buildingManifest.connections.filter(({routeRole}) => routeRole === 'through-route').length, 37);
  assert.equal(buildingManifest.connections.filter(({routeRole}) => routeRole === 'crosscut').length, 6);
  assert(buildingManifest.connections.every(({accessible, implementationStatus}) => accessible && implementationStatus === 'live'));
  assert.equal(buildingManifest.reserves.length, 2);
  assert(buildingManifest.reserves.every(({bounds, currentDoorState, boundaryWall}) =>
    bounds.maxX - bounds.minX === 56
    && bounds.maxZ - bounds.minZ === 28
    && currentDoorState === 'solid-construction-wall'
    && boundaryWall?.size?.height === 5.8
    && boundaryWall?.fullHeight === true
    && boundaryWall?.collision === true
    && boundaryWall?.rendered === true));

  const nodeByProgramHallId = new Map(hallNodes.map((node) => [node.programHallId, node]));
  const templateById = new Map(MUSEUM_HALL_TEMPLATE_REGISTRY.map((template) => [template.id, template]));
  const architecturalPortalWorld = (plannedHall, portalId) => {
    const portal = templateById.get(plannedHall.templateId)?.portalSlots.find(({id}) => id === portalId);
    assert(portal, `${plannedHall.id}/${portalId} is absent from its canonical template`);
    const radians = plannedHall.placement.rotationDegrees * Math.PI / 180;
    return {
      x: plannedHall.placement.x + portal.position.x * Math.cos(radians) - portal.position.z * Math.sin(radians),
      z: plannedHall.placement.z + portal.position.x * Math.sin(radians) + portal.position.z * Math.cos(radians),
    };
  };
  for (const plannedHall of singleLevelPlan.halls) {
    const node = nodeByProgramHallId.get(plannedHall.id);
    assert(node, `${plannedHall.id} is absent from the executable manifest`);
    assert.equal(node.publicGalleryNumber, plannedHall.publicGalleryNumber, `${plannedHall.id} public number changed`);
    assert.equal(node.visitSequence, plannedHall.visitSequence, `${plannedHall.id} visit sequence changed`);
    assert.equal(node.templateId, plannedHall.templateId, `${plannedHall.id} template changed`);
    assert.equal(node.bandId, plannedHall.bandId, `${plannedHall.id} structural band changed`);
    assert.deepEqual(node.roomIds, plannedHall.roomIds, `${plannedHall.id} room roster changed`);
    assert.deepEqual(node.planPlacement, plannedHall.placement, `${plannedHall.id} source plan placement changed`);
    approx(node.transform.x, -plannedHall.placement.x, `${plannedHall.id} reflected runtime x`);
    approx(node.transform.z, plannedHall.placement.z, `${plannedHall.id} runtime z`);
    assert(Number.isFinite(node.transform.yaw), `${plannedHall.id} runtime yaw is invalid`);
    for (const role of ['entry', 'exit']) {
      const portalId = plannedHall.routePortals[role];
      const runtimePortal = node.doorwaySlots.find(({id}) => id === portalId);
      const approvedPortal = architecturalPortalWorld(plannedHall, portalId);
      assert(runtimePortal, `${plannedHall.id}/${role} runtime doorway is missing`);
      approx(-runtimePortal.worldPosition.x, approvedPortal.x, `${plannedHall.id}/${role} architectural x`);
      approx(runtimePortal.worldPosition.z, approvedPortal.z, `${plannedHall.id}/${role} architectural z`);
    }
  }
  const roomIds = hallNodes.flatMap(({roomIds}) => roomIds);
  assert.equal(roomIds.length, 105);
  assert(unique(roomIds));
  assert.deepEqual(sorted(roomIds), sorted(masterplanProgram.rooms.map(({id}) => id)));
  assert.deepEqual(
    buildingManifest.throughRoute.hallOrder,
    singleLevelPlan.structuralBands.flatMap(({visitSequence}) => visitSequence),
  );
  assert.equal(buildingManifest.throughRoute.start, singleLevelPlan.grandEntrance.id);
  assert.equal(buildingManifest.throughRoute.finish, singleLevelPlan.finalThreshold.id);
  assert.equal(buildingManifest.crosscut.clearWidth, 10);
  assert.equal(buildingManifest.crosscut.intersections.length, 6);
  assert.equal(buildingManifest.nodes.filter(({physicalRole}) => physicalRole === 'turn-court').length, 5);
  assert.equal(buildingManifest.nodes.filter(({physicalRole}) => physicalRole === 'crosscut-intersection').length, 5);
  assert.equal(buildingManifest.nodes.filter(({physicalRole}) => physicalRole === 'final-return-threshold').length, 1);
  assert.equal(buildingManifest.nodes.filter(({physicalRole}) => physicalRole === 'grand-entrance-orientation').length, 1);
});

check('the executable template registry retains the approved canonical contracts', () => {
  const templateById = new Map(MUSEUM_HALL_TEMPLATE_REGISTRY.map((template) => [template.id, template]));
  const plannedTemplateById = new Map(masterplanProgram.templates.map((template) => [template.id, template]));
  assert.deepEqual(MUSEUM_HALL_TEMPLATE_REGISTRY.map(({id}) => id), ['standard-rect', 'sequence-3', 'crossroads-4', 'focal-terminal']);
  assert.deepEqual(MUSEUM_HALL_TEMPLATE_REGISTRY.map(({id}) => id), masterplanProgram.templates.map(({id}) => id), 'runtime and approved planning template registries differ');
  for (const template of MUSEUM_HALL_TEMPLATE_REGISTRY) {
    const planned = plannedTemplateById.get(template.id);
    assert(planned, `${template.id} is absent from the approved masterplan`);
    assert.equal(template.title, planned.title, `${template.id} title differs from the approved masterplan`);
    assert.deepEqual(template.footprintMetres, planned.footprintMetres, `${template.id} footprint differs from the approved masterplan`);
    assert.deepEqual(template.roomRange, planned.roomRange, `${template.id} room range differs from the approved masterplan`);
    assert.deepEqual(template.portalSlots.map(({id}) => id), planned.portalSlots, `${template.id} portal slots differ from the approved masterplan`);
    assert.deepEqual(template.portalSlots.filter(({optional}) => optional).map(({id}) => id), planned.optionalPortalSlots, `${template.id} optional portal slots differ from the approved masterplan`);
    assert.equal(template.wallThicknessMetres, planned.wallThicknessMetres, `${template.id} wall thickness differs from the approved masterplan`);
    assert.equal(template.ceilingHeightMetres, planned.ceilingHeightMetres, `${template.id} ceiling height differs from the approved masterplan`);
    assert.deepEqual(template.publicPortal, planned.publicPortal, `${template.id} public portal differs from the approved masterplan`);
    assert.deepEqual(template.safeArrivalLanding, {width: 4, depth: 4, poseOffsetFromPortal: 2});
    assert.deepEqual(template.lightingInterface, ['ambient', 'threshold', 'perimeter-track', 'anchor-track', 'accessible-label-light']);
    assert.deepEqual(template.collisionPolicy, {
      openingAuthority: 'live-connection-endpoints',
      inactiveSlotClosure: 'full-height-collision-wall',
      activeSlotLintel: 'render-only-above-clear-height',
    });
    assert.deepEqual(template.mapPolicy, {canonicalShape: 'footprint-rectangle', legacyAdapterShape: 'spatial-cell-union'});
    assert.deepEqual(template.exhibitSlotPolicy, {standardBayWidth: 3, anchorBayWidth: 4.5, clearViewingFloor: {width: .9, depth: 1.4}});
    assert.equal(template.availability, template.id === 'focal-terminal' ? 'rare-special-case' : 'normal-active');
  }
  const sequence = templateById.get('sequence-3');
  const forum = templateById.get('crossroads-4');
  assert.deepEqual(sequence.footprintMetres, {width: 24, depth: 56});
  assert.equal(sequence.wallThicknessMetres, .36);
  assert.equal(sequence.ceilingHeightMetres, 5.8);
  assert.deepEqual(sequence.roomRange, [3, 5]);
  assert.deepEqual(sequence.portalSlots.map(({id}) => id), ['N0', 'S0', 'E1', 'W1']);
  assert.deepEqual(forum.footprintMetres, {width: 28, depth: 28});
  assert.equal(forum.wallThicknessMetres, .36);
  assert.equal(forum.ceilingHeightMetres, 6.2);
  assert.deepEqual(forum.roomRange, [4, 9]);
  assert.deepEqual(forum.portalSlots.map(({id}) => id), ['N0', 'S0', 'E0', 'W0', 'N1', 'S1']);
  assert(MUSEUM_LEGACY_GEOMETRY_ADAPTERS.length > 0, 'retained prototype data should remain explicitly classified, not silently erased');
});

check('all twenty-five runtime halls are canonical, data-driven, and internally aligned', () => {
  assert.deepEqual(definitions.map(({id}) => id), HALL_IDS);
  assert.equal(new Set(definitions.map(({physicalNodeId}) => physicalNodeId)).size, 25);
  for (const definition of definitions) {
    const hall = hallById.get(definition.id);
    const node = MUSEUM_BUILDING_MANIFEST.nodes.find(({publicHallId}) => publicHallId === definition.id);
    const expected = EXPECTED_COUNTS[definition.id];
    assert(hall && node);
    assert.equal(node.geometryAdapterId, undefined, `${definition.id} still uses a legacy geometry adapter`);
    assert.equal(definition.resolvedTemplate.adapterId, 'canonical-template');
    assert.equal(definition.resolvedTemplate.conformance, 'canonical');
    assert.equal(definition.resolvedTemplate.footprintConformance, 'exact');
    assert.deepEqual(definition.resolvedTemplate.deviations, []);
    assert.equal(definition.resolvedTemplate.templateId, expected.template);
    assert.equal(definition.resolvedTemplate.exhibitSlots.length, expected.exhibits);
    assert.equal(definition.layout.spatialCells.filter(({kind}) => kind === 'room').length, expected.rooms);
    assert.deepEqual(sorted(definition.layout.spatialCells.map(({id}) => id)), sorted(hall.zones.map(({id}) => id)));
    assert.deepEqual(sorted(definition.layout.exhibits.map(({id}) => id)), sorted(hall.exhibits.map(({id}) => id)));
    assert.deepEqual(definition.layout.guidedOrder, definition.layout.exhibits.map(({id}) => id));
    assert.equal(definition.layout.guidedWalkLegs.length, Math.max(0, hall.exhibits.length - 1));
    assert.equal(definition.layout.entryViews.length, hall.zones.length);
    assert.equal(definition.layout.lighting.tracks.length, hall.zones.length);
    assert.equal(definition.layout.lighting.exhibitLights.length, hall.exhibits.length);
    const comparativeLensCount = hall.zones.reduce((sum, zone) => sum + (zone.comparativeLenses?.length ?? 0), 0);
    const removedPhysicalRoomSigns = [
      MEDITERRANEAN_GALLERY_ID,
      'renaissance-humanism-new-method',
      'phenomenology-existence-embodiment',
      'analytic-traditions',
      JUSTICE_GALLERY_ID,
      'classical-south-asian-worlds',
      'buddhist-philosophies',
      'classical-chinese-traditions',
      'islamic-philosophical-worlds',
      'east-asian-continuities',
      'jewish-philosophy',
      'latin-christian-scholastic',
      'hellenistic-roman-ways',
      'late-antiquity-inheritance',
      'rationalism-mind-nature-system',
      'empiricism-science-political-order',
      'german-idealism-afterlives',
      'utility-liberty-history-capital',
      'faith-pessimism-life-value',
      'pragmatism-democratic-inquiry',
      'colonialism-race-liberation',
    ].includes(definition.id) ? 1 : 0;
    const expectedPhysicalSignCount = definition.id === 'core-questions-forum'
      ? 10
      : hall.zones.length + 1 + comparativeLensCount - removedPhysicalRoomSigns;
    assert.equal(definition.layout.signs.length, expectedPhysicalSignCount);
    assert(validPose(definition, definition.layout.spawn), `${definition.id} spawn is unsafe`);
    assert(validPose(definition, definition.layout.reset), `${definition.id} reset is unsafe`);
    const expectedWidth = expected.template === 'crossroads-4'
      ? 28
      : expected.template === 'standard-rect'
        ? 20
        : 24;
    const expectedDepth = expected.template === 'crossroads-4'
      ? 28
      : expected.template === 'standard-rect'
        ? 24
        : 56;
    const renderBounds = definition.resolvedTemplate.resolvedFootprint.bounds;
    const mapBounds = unionBounds(definition.resolvedTemplate.mapCells.map(({bounds}) => bounds));
    approx(renderBounds.maxX - renderBounds.minX, expectedWidth, `${definition.id} rendered width`);
    approx(renderBounds.maxZ - renderBounds.minZ, expectedDepth, `${definition.id} rendered depth`);
    assert.deepEqual(mapBounds, renderBounds, `${definition.id} map cells differ from the rendered canonical footprint`);
    assert.deepEqual(definition.resolvedTemplate.mapCells, [{id: `${definition.id}:canonical-footprint`, bounds: renderBounds}], `${definition.id} map projection must use one canonical footprint cell`);
    assert(definition.layout.bounds.minX <= renderBounds.minX && definition.layout.bounds.maxX >= renderBounds.maxX, `${definition.id} navigation bounds do not contain the rendered footprint`);
    assert(definition.layout.bounds.minZ <= renderBounds.minZ && definition.layout.bounds.maxZ >= renderBounds.maxZ, `${definition.id} navigation bounds do not contain the rendered footprint`);
    approx(definition.layout.floorArea, expectedWidth * expectedDepth, `${definition.id} floor area`);
    assert.deepEqual(definition.resolvedTemplate.canonicalFootprint, {width: expectedWidth, depth: expectedDepth});
    assert.deepEqual(definition.resolvedTemplate.resolvedRoomCeilingRange, [definition.resolvedTemplate.canonicalCeilingHeight, definition.resolvedTemplate.canonicalCeilingHeight]);
    assert.deepEqual(definition.resolvedTemplate.lightingInterface.roles, ['ambient', 'threshold', 'perimeter-track', 'anchor-track', 'accessible-label-light']);
    assert.equal(definition.resolvedTemplate.lightingInterface.perimeterTrackIds.length, expected.rooms);
    assert.equal(definition.resolvedTemplate.lightingInterface.anchorTrackIds.length > 0, true);
    assert.equal(
      definition.resolvedTemplate.lightingInterface.accessibleLabelAnchorIds.length,
      definition.layout.signs.length + hall.exhibits.length,
    );
    assert(unique(definition.layout.exhibits.map(({id}) => id)), `${definition.id} duplicates exhibit layouts`);
    assert(unique(definition.layout.wallColliders.map(({id}) => id)), `${definition.id} duplicates wall colliders`);
    for (const layout of definition.layout.exhibits) {
      const catalog = hall.exhibits.find(({id}) => id === layout.id);
      const tier = TIER_RUNTIME[catalog.tier];
      assert.equal(layout.zoneId, catalog.zoneId, `${definition.id}/${layout.id} room drifted`);
      assert.equal(layout.spatialCellId, catalog.zoneId, `${definition.id}/${layout.id} spatial cell drifted`);
      assert.equal(layout.presentationTier, tier.tier, `${definition.id}/${layout.id} tier drifted`);
      assert.equal(layout.treatment, tier.treatment, `${definition.id}/${layout.id} treatment drifted`);
      const viewpointBlockers = [...definition.layout.wallColliders, ...definition.layout.obstacleColliders]
        .filter((collider) => circleIntersectsCollider(layout.viewpoint, definition.layout.playerRadius, collider))
        .map(({id}) => id);
      if (!validPose(definition, layout.viewpoint)) unsafeExhibitViewpoints.push(`${definition.id}/${layout.id} ${JSON.stringify(layout.viewpoint)} blockers=${viewpointBlockers.join(',') || 'bounds/spatial-union'}`);
      assert(!definition.layout.wallColliders.some((collider) => circleIntersectsCollider(layout.position, .1, collider)), `${definition.id}/${layout.id} intersects architecture`);
      for (const mount of layout.scene.mediaMounts) assert(assetById.has(mount.assetId), `${definition.id}/${layout.id} mounts missing asset ${mount.assetId}`);
    }
    for (const slot of definition.resolvedTemplate.exhibitSlots) {
      assert.equal(slot.viewingClearance, 'meets-target', `${definition.id}/${slot.exhibitId} misses viewing clearance`);
      assert.equal(slot.tierConformance, 'meets-tier', `${definition.id}/${slot.exhibitId} misses tier bay width`);
    }
    for (const view of definition.layout.entryViews) {
      if (!validPose(definition, view.pose)) unsafeNavigationPoses.push(`${definition.id}/${view.spatialCellId} room-entry ${JSON.stringify(view.pose)}`);
    }
    for (const point of definition.layout.primaryCirculation.points) {
      if (!validPose(definition, {...point, yaw: 0, pitch: 0})) unsafeNavigationPoses.push(`${definition.id} primary-circulation ${JSON.stringify(point)}`);
    }
    for (const sign of definition.layout.signs) {
      assert(sign.width > 1 && sign.height > .5, `${definition.id}/${sign.id} sign plane is too small`);
      assert(sign.position.x >= definition.layout.bounds.minX && sign.position.x <= definition.layout.bounds.maxX, `${definition.id}/${sign.id} sign escapes the hall`);
      assert(sign.position.z >= definition.layout.bounds.minZ && sign.position.z <= definition.layout.bounds.maxZ, `${definition.id}/${sign.id} sign escapes the hall`);
    }

    const connectedSlots = new Set(MUSEUM_BUILDING_MANIFEST.connections.flatMap(({a, b}) => [a, b]).filter(({nodeId}) => nodeId === node.id).map(({slotId}) => slotId));
    assert.deepEqual(sorted(definition.resolvedTemplate.portalInterfaces.filter(({active}) => active).map(({manifestSlotId}) => manifestSlotId)), sorted(connectedSlots));
    for (const portal of definition.resolvedTemplate.portalInterfaces) {
      const approvedForumCrosscutExpansion = definition.id === 'core-questions-forum'
        && (portal.manifestSlotId === 'N0' || portal.manifestSlotId === 'S0')
        && portal.actual.clearWidth === 10;
      assert.equal(
        portal.dimensionConformance,
        approvedForumCrosscutExpansion ? 'expanded-adapter' : 'exact',
      );
      const closureId = `${node.id}:${portal.manifestSlotId}:inactive-closure`;
      if (portal.active) {
        assert(!definition.layout.wallColliders.some(({id}) => id === closureId), `${definition.id}/${portal.manifestSlotId} active portal is closed`);
      } else {
        assert(definition.layout.wallColliders.some(({id}) => id === closureId), `${definition.id}/${portal.manifestSlotId} inactive portal lacks full closure`);
      }
    }
    const activePortalIds = new Set(definition.resolvedTemplate.portalInterfaces.filter(({active}) => active).map(({manifestSlotId}) => manifestSlotId));
    for (const entrance of definition.entrances.filter(({id}) => activePortalIds.has(id))) assert(validPose(definition, entrance.arrivalPose), `${definition.id}/${entrance.id} active arrival is unsafe`);
    const expectedEntranceIds = sorted(definition.entrances.map(({id}) => id));
    assert.deepEqual(sorted(Object.keys(definition.prefetch.entryExhibitIdsByEntrance)), expectedEntranceIds, `${definition.id} entry-exhibit keys drifted from its entrances`);
    assert.deepEqual(sorted(Object.keys(definition.prefetch.entrySceneAssetIdsByEntrance ?? {})), expectedEntranceIds, `${definition.id} entry-media keys drifted from its entrances`);
    for (const entrance of definition.entrances) {
      const expectedRoom = definition.layout.spatialCells.reduce((nearest, cell) => {
        const authoredBounds = cell.renderBounds ?? cell.bounds;
        const center = {x: (authoredBounds.minX + authoredBounds.maxX) / 2, z: (authoredBounds.minZ + authoredBounds.maxZ) / 2};
        const centerDistance = distance(center, entrance.position);
        return !nearest || centerDistance < nearest.distance ? {cell, distance: centerDistance} : nearest;
      }, undefined).cell;
      const expectedExhibitIds = expectedRoom.exhibitIds.slice(0, 2);
      assert.deepEqual(definition.prefetch.entryExhibitIdsByEntrance[entrance.id], expectedExhibitIds, `${definition.id}/${entrance.id} entry exhibits do not match the nearest rendered room`);
      const expectedAssetIds = sorted([...new Set(definition.layout.exhibits
        .filter(({id}) => expectedExhibitIds.includes(id))
        .flatMap(({scene}) => scene.mediaMounts.map(({assetId}) => assetId))
        .concat((definition.layout.supplementalExhibits ?? [])
          .filter(({spatialCellId}) => spatialCellId === expectedRoom.id)
          .map(({assetId}) => assetId)))]);
      assert.deepEqual(sorted(definition.prefetch.entrySceneAssetIdsByEntrance[entrance.id]), expectedAssetIds, `${definition.id}/${entrance.id} entry media do not match the rendered entry exhibits`);
    }
    const expectedEntrySceneAssetIds = sorted([...new Set(Object.values(definition.prefetch.entrySceneAssetIdsByEntrance).flat())]);
    assert.deepEqual(sorted(definition.prefetch.entrySceneAssetIds), expectedEntrySceneAssetIds, `${definition.id} aggregate entry media drifted from the entrance-specific sets`);
    assert(definition.prefetch.entrySceneAssetIds.every((id) => definition.prefetch.sceneAssetIds.includes(id)), `${definition.id} entry media is not a bounded subset`);
  }
});

check('primary circulation and every guided leg are continuously sampled and collision-free', () => {
  for (const definition of definitions) {
    const {layout} = definition;
    const colliders = allColliders(layout);
    const circulation = layout.primaryCirculation;
    assert(circulation.id.trim(), `${definition.id} primary circulation has no id`);
    assert(circulation.clearanceRadius >= layout.playerRadius, `${definition.id} primary circulation is narrower than the visitor`);
    assert(circulation.points.length >= 2, `${definition.id} primary circulation has no usable path`);
    let circulationLength = 0;
    for (let index = 1; index < circulation.points.length; index += 1) {
      circulationLength += sampleSegment(circulation.points[index - 1], circulation.points[index], .05, (point) => {
        assert(positionInsideSpatialUnion(point, circulation.clearanceRadius, layout.spatialCells), `${definition.id} primary circulation exits the spatial union near ${JSON.stringify(point)}`);
        assert(isValidMuseumPosition(point, circulation.clearanceRadius, layout.bounds, colliders, layout.spatialCells), `${definition.id} primary circulation loses ${circulation.clearanceRadius.toFixed(2)} m clearance near ${JSON.stringify(point)}`);
      });
    }
    if (definition.resolvedTemplate.templateId === 'standard-rect') {
      assert(circulationLength >= 20, `${definition.id} primary circulation is implausibly short`);
    } else {
      assert(circulationLength > 20, `${definition.id} primary circulation is implausibly short`);
    }

    const exhibitById = new Map(layout.exhibits.map((exhibit) => [exhibit.id, exhibit]));
    assert.equal(layout.guidedWalkLegs.length, Math.max(0, layout.guidedOrder.length - 1));
    for (const [index, leg] of layout.guidedWalkLegs.entries()) {
      assert.equal(leg.fromExhibitId, layout.guidedOrder[index], `${definition.id} guided leg ${index} has the wrong source`);
      assert.equal(leg.toExhibitId, layout.guidedOrder[index + 1], `${definition.id} guided leg ${index} has the wrong target`);
      const from = exhibitById.get(leg.fromExhibitId);
      const to = exhibitById.get(leg.toExhibitId);
      assert(from && to, `${definition.id} guided leg ${index} references a missing exhibit`);
      const points = [from.viewpoint, ...leg.waypoints, to.viewpoint];
      assert(points.length >= 2, `${definition.id} guided leg ${leg.fromExhibitId} -> ${leg.toExhibitId} has no path`);
      for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
        sampleSegment(points[pointIndex - 1], points[pointIndex], .05, (point) => {
          assert(positionInsideSpatialUnion(point, layout.playerRadius, layout.spatialCells), `${definition.id} guided leg ${leg.fromExhibitId} -> ${leg.toExhibitId} exits the hall near ${JSON.stringify(point)}`);
          assert(isValidMuseumPosition(point, layout.playerRadius, layout.bounds, colliders, layout.spatialCells), `${definition.id} guided leg ${leg.fromExhibitId} -> ${leg.toExhibitId} collides near ${JSON.stringify(point)}`);
        });
      }
    }
  }
});

check('runtime seams are bidirectional, world-aligned, step-free, and crossable', () => {
  assert.equal(MUSEUM_DIRECTED_CONNECTIONS.length, MUSEUM_BUILDING_MANIFEST.connections.length * 2);
  for (const connection of MUSEUM_BUILDING_MANIFEST.connections) {
    const directed = MUSEUM_DIRECTED_CONNECTIONS.filter(({connectionId}) => connection.id === connectionId);
    assert.equal(directed.length, 2, `${connection.id} is not bidirectional`);
    assert.deepEqual(directed.map(({id, sourceNodeId, targetNodeId, localEntranceId, targetEntranceId}) => ({id, sourceNodeId, targetNodeId, localEntranceId, targetEntranceId})), [
      {id: `${connection.id}:a-to-b`, sourceNodeId: connection.a.nodeId, targetNodeId: connection.b.nodeId, localEntranceId: connection.a.slotId, targetEntranceId: connection.b.slotId},
      {id: `${connection.id}:b-to-a`, sourceNodeId: connection.b.nodeId, targetNodeId: connection.a.nodeId, localEntranceId: connection.b.slotId, targetEntranceId: connection.a.slotId},
    ], `${connection.id} directed endpoints drifted`);
    const source = runtimeNodeById.get(connection.a.nodeId);
    const target = runtimeNodeById.get(connection.b.nodeId);
    const sourceEntrance = source.entrances.find(({id}) => id === connection.a.slotId);
    const targetEntrance = target.entrances.find(({id}) => id === connection.b.slotId);
    assert(sourceEntrance && targetEntrance);
    const sourceWorld = museumPointToWorld(source, sourceEntrance.position);
    const targetWorld = museumPointToWorld(target, targetEntrance.position);
    assert(distance(sourceWorld, targetWorld) < .001, `${connection.id} endpoints do not meet in world space`);
    const sourceNormal = worldNormal(source, sourceEntrance.inwardNormal);
    const targetNormal = worldNormal(target, targetEntrance.inwardNormal);
    assert(
      Math.hypot(sourceNormal.x + targetNormal.x, sourceNormal.z + targetNormal.z) < .001,
      `${connection.id} normals do not oppose`,
    );
    const sourceDimensions = Math.abs(sourceEntrance.inwardNormal.x) > .5
      ? {clearWidth: sourceEntrance.transitionBounds.size.depth, transitionDepth: sourceEntrance.transitionBounds.size.width}
      : {clearWidth: sourceEntrance.transitionBounds.size.width, transitionDepth: sourceEntrance.transitionBounds.size.depth};
    const targetDimensions = Math.abs(targetEntrance.inwardNormal.x) > .5
      ? {clearWidth: targetEntrance.transitionBounds.size.depth, transitionDepth: targetEntrance.transitionBounds.size.width}
      : {clearWidth: targetEntrance.transitionBounds.size.width, transitionDepth: targetEntrance.transitionBounds.size.depth};
    assert.deepEqual(sourceDimensions, targetDimensions, `${connection.id} endpoint dimensions differ`);
    assert(validPose(source, sourceEntrance.arrivalPose), `${connection.id} source landing is unsafe`);
    assert(validPose(target, targetEntrance.arrivalPose), `${connection.id} target landing is unsafe`);
  }

  const runPhysicalCrossing = (
    connection,
    walkingSpeed,
    retainedTargetActive,
    tangentOffset = 0,
  ) => {
    physicalMovementTrajectories += 1;
    const source = runtimeNodeById.get(connection.sourceNodeId);
    const target = runtimeNodeById.get(connection.targetNodeId);
    assert(source && target, `${connection.id} references a missing runtime node`);
    const entrance = source.entrances.find(({id}) => id === connection.localEntranceId);
    const targetEntrance = target.entrances.find(({id}) => id === connection.targetEntranceId);
    assert(entrance, `${connection.id} has no source entrance ${connection.localEntranceId}`);
    assert(targetEntrance, `${connection.id} has no target entrance ${connection.targetEntranceId}`);
    assert(validPose(source, entrance.arrivalPose), `${connection.id} starts from an invalid source arrival`);
    const portalWorld = museumPointToWorld(source, entrance.position);
    const inwardWorld = worldNormal(source, entrance.inwardNormal);
    const targetInwardWorld = worldNormal(target, targetEntrance.inwardNormal);
    const sourceSignedWorldDistance = (worldPose) =>
      (worldPose.x - portalWorld.x) * inwardWorld.x
      + (worldPose.z - portalWorld.z) * inwardWorld.z;
    const targetSignedWorldDistance = (worldPose) =>
      (worldPose.x - portalWorld.x) * targetInwardWorld.x
      + (worldPose.z - portalWorld.z) * targetInwardWorld.z;
    const renderedTargetKeys = target.publicHallId
      ? resolveMuseumHallRenderedReadinessKeys(
          target.publicHallId,
          retainedTargetActive,
          connection.targetEntranceId,
        )
      : [];
    const requiredTargetKey = target.publicHallId
      ? `${target.publicHallId}::museum-entry::${connection.targetEntranceId}`
      : undefined;
    if (requiredTargetKey) assert(
      renderedTargetKeys.includes(requiredTargetKey),
      `${connection.id} retained active hall never publishes connector-facing readiness ${requiredTargetKey}`,
    );
    const readyHallEntryKeys = new Set(renderedTargetKeys);
    let currentNode = source;
    const tangent = {x: -entrance.inwardNormal.z, z: entrance.inwardNormal.x};
    const lateralApertureSample = Math.abs(tangentOffset) > 1e-6;
    const sourceDepth = lateralApertureSample ? .25 : 0;
    let currentPose = {
      ...entrance.arrivalPose,
      x: (lateralApertureSample
        ? entrance.position.x + entrance.inwardNormal.x * sourceDepth
        : entrance.arrivalPose.x) + tangent.x * tangentOffset,
      z: (lateralApertureSample
        ? entrance.position.z + entrance.inwardNormal.z * sourceDepth
        : entrance.arrivalPose.z) + tangent.z * tangentOffset,
      yaw: Math.atan2(entrance.inwardNormal.x, entrance.inwardNormal.z),
      pitch: 0,
    };
    assert(validPose(source, currentPose), `${connection.id} offset ${tangentOffset} starts from an invalid source arrival`);
    let currentWorld = museumPoseToWorld(currentNode, currentPose);
    assert(sourceSignedWorldDistance(currentWorld) > 0, `${connection.id} authored arrival is not inside its source portal`);
    const areaSequence = [source.id];
    let portalCrossings = 0;
    let transitionCount = 0;
    let targetProgress = 0;
    const requiredTargetProgress = lateralApertureSample ? .25 : 3;
    const frameLimit = 360;

    for (let frame = 0; frame < frameLimit && targetProgress < requiredTargetProgress; frame += 1) {
      const previousWorld = currentWorld;
      const previousSigned = sourceSignedWorldDistance(previousWorld);
      const result = advanceMuseumPhysicalFrame({
        definition: currentNode,
        pose: currentPose,
        input: {forward: 1, strafe: 0, walkingSpeed},
        rawDelta: 1 / 60,
        readyHallEntryKeys,
      });
      assert.notEqual(
        result.kind,
        'blocked',
        `${connection.id} offset ${tangentOffset.toFixed(3)} blocked during held production movement (${result.reason ?? 'unknown'})`,
      );
      const frameNode = currentNode;
      const framePose = result.pose;
      assert(validPose(frameNode, framePose), `${connection.id} produced an invalid ${frameNode.id} pose`);
      const crossingWorld = museumPoseToWorld(frameNode, framePose);
      const crossingSigned = sourceSignedWorldDistance(crossingWorld);
      const movementNormal = frameNode.id === source.id
        ? {x: -inwardWorld.x, z: -inwardWorld.z}
        : targetInwardWorld;
      const frameProgress =
        (crossingWorld.x - previousWorld.x) * movementNormal.x
        + (crossingWorld.z - previousWorld.z) * movementNormal.z;
      assert(frameProgress > 1e-6, `${connection.id} stalled or reversed while forward input remained held`);
      if (frameNode.id === source.id && previousSigned >= 0 && crossingSigned < 0) portalCrossings += 1;

      if (result.kind === 'transition') {
        transitionCount += 1;
        assert.equal(result.transition.connection.id, connection.id, `${connection.id} triggered ${result.transition.connection.id}`);
        assert.equal(result.transition.targetNode.id, target.id, `${connection.id} entered ${result.transition.targetNode.id}`);
        const arrivalWorld = museumPoseToWorld(result.transition.targetNode, result.transition.arrival);
        const mappedArrival = museumPoseFromWorld(result.transition.targetNode, crossingWorld);
        const mappedBlockers = [
          ...result.transition.targetNode.layout.wallColliders,
          ...result.transition.targetNode.layout.obstacleColliders,
        ].filter((collider) => circleIntersectsCollider(
          mappedArrival,
          result.transition.targetNode.layout.playerRadius,
          collider,
        )).map(({id}) => id);
        assert(
          distance(crossingWorld, arrivalWorld) <= 1e-5,
          `${connection.id} offset ${tangentOffset.toFixed(3)} transition fell back or teleported ${distance(crossingWorld, arrivalWorld).toFixed(3)} m`
            + ` at (${mappedArrival.x.toFixed(3)}, ${mappedArrival.z.toFixed(3)}); blockers: ${mappedBlockers.join(', ') || 'spatial union'}`,
        );
        currentNode = result.transition.targetNode;
        currentPose = {...result.transition.arrival};
        assert(validPose(currentNode, currentPose), `${connection.id} committed an invalid target pose`);
        areaSequence.push(currentNode.id);
        currentWorld = arrivalWorld;
      } else {
        currentPose = result.pose;
        currentWorld = crossingWorld;
      }
      if (currentNode.id === target.id) targetProgress = Math.max(0, targetSignedWorldDistance(currentWorld));
    }

    assert.deepEqual(areaSequence, [source.id, target.id], `${connection.id} area sequence drifted`);
    assert.equal(transitionCount, 1, `${connection.id} did not commit exactly one transition`);
    assert.equal(portalCrossings, 1, `${connection.id} did not cross exactly one portal plane`);
    assert(
      targetProgress >= requiredTargetProgress,
      `${connection.id} stopped ${targetProgress.toFixed(2)} m beyond the seam`,
    );
  };

  for (const connection of MUSEUM_DIRECTED_CONNECTIONS) {
    const source = runtimeNodeById.get(connection.sourceNodeId);
    const entrance = source?.entrances.find(({id}) => id === connection.localEntranceId);
    assert(source && entrance, `${connection.id} lacks a source aperture for trajectory sampling`);
    const clearWidth = Math.abs(entrance.inwardNormal.x) > .5
      ? entrance.transitionBounds.size.depth
      : entrance.transitionBounds.size.width;
    const usableHalfWidth = clearWidth / 2
      - source.layout.playerRadius
      - MUSEUM_BUILDING_MANIFEST.physicalContract.wallThickness / 2
      - .08;
    assert(usableHalfWidth > 0, `${connection.id} has no usable doorway aperture`);
    runPhysicalCrossing(connection, MUSEUM_STANDARD_WALK_SPEED, false);
    runPhysicalCrossing(connection, MUSEUM_FAST_WALK_SPEED, false);
    for (const fraction of [-1, -.5, .5, 1]) {
      runPhysicalCrossing(connection, MUSEUM_STANDARD_WALK_SPEED, false, usableHalfWidth * fraction);
    }
    const target = runtimeNodeById.get(connection.targetNodeId);
    if (target?.publicHallId && !source?.publicHallId) {
      runPhysicalCrossing(connection, MUSEUM_STANDARD_WALK_SPEED, true);
      runPhysicalCrossing(connection, MUSEUM_FAST_WALK_SPEED, true);
    }
  }
});

check('all five turn courts match map handedness and are walkable through both bends', () => {
  const hallNodes = MUSEUM_BUILDING_MANIFEST.nodes.filter(({kind}) => kind === 'hall');
  const strictBoundsOverlap = (first, second) => first.minX < second.maxX - 1e-5
    && first.maxX > second.minX + 1e-5
    && first.minZ < second.maxZ - 1e-5
    && first.maxZ > second.minZ + 1e-5;
  for (const turn of singleLevelPlan.turnCourts) {
    const manifestNode = MUSEUM_BUILDING_MANIFEST.nodes.find(({id}) => id === turn.id);
    const runtimeNode = runtimeNodeById.get(turn.id);
    assert(manifestNode?.geometry && runtimeNode, `${turn.id} is absent from the constructed runtime`);
    assert.deepEqual(runtimeNode.worldTransform, {x: 0, z: 0, yaw: 0}, `${turn.id} does not use its world-authored orthogonal footprint`);
    assert.deepEqual(manifestNode.geometry.planCenterline, turn.centerline, `${turn.id} lost its architectural centerline`);
    const runtimeCenterline = manifestNode.geometry.worldCenterline;
    assert.deepEqual(
      runtimeCenterline,
      turn.centerline.map(({x, z}) => ({x: -x, z})),
      `${turn.id} did not reflect architectural X into the right-handed runtime`,
    );
    runtimeCenterline.forEach((point, index) => {
      const projected = projectMuseumVisitorMapPoint(turn.id, point);
      assert.deepEqual(
        projected,
        {x: turn.centerline[index].x, y: -turn.centerline[index].z},
        `${turn.id} map point ${index} differs from its approved centerline`,
      );
    });
    for (const bendIndex of [1, 2]) {
      const planIncoming = {
        x: turn.centerline[bendIndex].x - turn.centerline[bendIndex - 1].x,
        z: turn.centerline[bendIndex].z - turn.centerline[bendIndex - 1].z,
      };
      const planOutgoing = {
        x: turn.centerline[bendIndex + 1].x - turn.centerline[bendIndex].x,
        z: turn.centerline[bendIndex + 1].z - turn.centerline[bendIndex].z,
      };
      const runtimeIncoming = {
        x: runtimeCenterline[bendIndex].x - runtimeCenterline[bendIndex - 1].x,
        z: runtimeCenterline[bendIndex].z - runtimeCenterline[bendIndex - 1].z,
      };
      const runtimeOutgoing = {
        x: runtimeCenterline[bendIndex + 1].x - runtimeCenterline[bendIndex].x,
        z: runtimeCenterline[bendIndex + 1].z - runtimeCenterline[bendIndex].z,
      };
      const architecturalTurn = Math.sign(
        planIncoming.x * planOutgoing.z - planIncoming.z * planOutgoing.x,
      );
      const embodiedRuntimeTurn = Math.sign(
        runtimeIncoming.z * runtimeOutgoing.x - runtimeIncoming.x * runtimeOutgoing.z,
      );
      assert.notEqual(architecturalTurn, 0, `${turn.id} bend ${bendIndex} is not a turn`);
      assert.equal(
        embodiedRuntimeTurn,
        architecturalTurn,
        `${turn.id} bend ${bendIndex} has opposite physical and map handedness`,
      );
    }
    assert.equal(manifestNode.geometry.segmentCount, 3, `${turn.id} lost a centerline run`);
    assert.equal(manifestNode.geometry.interiorOpenings.length, manifestNode.geometry.cells.length - 1, `${turn.id} has a sealed internal bend`);
    assert(manifestNode.geometry.interiorOpenings.every(({clearWidth}) => close(clearWidth, 8)), `${turn.id} has a narrowed internal bend`);
    assert.equal(manifestNode.geometry.signs.length, 1, `${turn.id} lacks threshold wayfinding`);
    assert.equal(manifestNode.geometry.signs[0].kind, 'wayfinding', `${turn.id} has the wrong sign type`);
    assert(manifestNode.geometry.cells.every(({guidanceAxis}) => guidanceAxis === 'x' || guidanceAxis === 'z'), `${turn.id} has a transverse ceiling guide`);
    const constructedArea = manifestNode.geometry.cells.reduce((sum, {bounds}) =>
      sum + (bounds.maxX - bounds.minX) * (bounds.maxZ - bounds.minZ), 0);
    approx(
      constructedArea,
      manifestNode.geometry.clearWidth * manifestNode.geometry.measuredCenterlineLength,
      `${turn.id} constructed floor area`,
    );
    for (let first = 0; first < manifestNode.geometry.cells.length; first += 1) {
      for (let second = first + 1; second < manifestNode.geometry.cells.length; second += 1) {
        assert(
          !strictBoundsOverlap(manifestNode.geometry.cells[first].bounds, manifestNode.geometry.cells[second].bounds),
          `${turn.id} duplicates floor or ceiling at a bend`,
        );
      }
      for (const hallNode of hallNodes) {
        assert(
          !strictBoundsOverlap(manifestNode.geometry.cells[first].bounds, hallNode.bounds),
          `${turn.id}/${manifestNode.geometry.cells[first].id} cuts through ${hallNode.id}`,
        );
      }
    }
    const fromEntrance = runtimeNode.entrances.find(({id}) => id === 'from');
    const toEntrance = runtimeNode.entrances.find(({id}) => id === 'to');
    assert(fromEntrance && toEntrance, `${turn.id} lacks a terminal doorway`);
    const colliders = [...runtimeNode.layout.wallColliders, ...runtimeNode.layout.obstacleColliders];
    const traverse = (start, waypoints, label) => {
      physicalMovementTrajectories += 1;
      let current = {...start};
      assert(validPose(runtimeNode, current), `${turn.id}/${label} begins outside the court`);
      for (const point of waypoints) {
        const moved = moveWithCollisions(
          current,
          {x: point.x - current.x, z: point.z - current.z},
          runtimeNode.layout.playerRadius,
          runtimeNode.layout.bounds,
          colliders,
          runtimeNode.layout.spatialCells,
        );
        assert(
          distance(moved, point) <= .01,
          `${turn.id}/${label} is blocked ${distance(moved, point).toFixed(3)} m before a bend`,
        );
        current = {...current, ...moved};
        assert(validPose(runtimeNode, current), `${turn.id}/${label} reaches an invalid bend`);
      }
    };
    traverse(
      fromEntrance.arrivalPose,
      [...runtimeCenterline.slice(1, -1), toEntrance.arrivalPose],
      'forward',
    );
    traverse(
      toEntrance.arrivalPose,
      [...runtimeCenterline.slice(1, -1).reverse(), fromEntrance.arrivalPose],
      'reverse',
    );
  }
});

check('the physical visitor map is a truthful projection of live geometry and safe travel', () => {
  const approvedVisitOrder = singleLevelPlan.structuralBands.flatMap(({visitSequence}) => visitSequence);
  assert.deepEqual(MUSEUM_VISITOR_MAP_PROJECTION.map(({hall}) => hall.id), approvedVisitOrder);
  assert.deepEqual(MUSEUM_VISITOR_MAP_NODES.map(({programHallId}) => programHallId), approvedVisitOrder);
  assert.equal(MUSEUM_VISITOR_MAP_NODES.length, 26);
  assert.equal(MUSEUM_VISITOR_MAP_NODES.filter(({galleryState}) => galleryState === 'curated-open').length, 25);
  assert.equal(MUSEUM_VISITOR_MAP_NODES.filter(({galleryState}) => galleryState === 'planned-walkable').length, 1);
  assert.equal(MUSEUM_VISITOR_MAP_NODES.filter(({fastTravelEligible}) => fastTravelEligible).length, 25);
  assert.equal(MUSEUM_VISITOR_MAP_NODES.flatMap(({rooms}) => rooms).length, 105);
  assert.equal(MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.length, MUSEUM_RUNTIME_NODES.length);
  assert.equal(MUSEUM_VISITOR_MAP_EDGES.length, MUSEUM_BUILDING_MANIFEST.connections.length);
  assert.equal(MUSEUM_VISITOR_MAP_CROSSCUT_INTERSECTIONS.length, 6);
  assert.equal(MUSEUM_VISITOR_MAP_TURN_COURTS.length, 5);
  assert.equal(MUSEUM_VISITOR_MAP_RESERVATIONS.length, 2);
  assert(MUSEUM_VISITOR_MAP_RESERVATIONS.every(({reservationType, status}) =>
    reservationType === 'gallery-reserve' && status === 'closed-reserve'));
  assert(MUSEUM_VISITOR_MAP_VIEWBOX.width > 0 && MUSEUM_VISITOR_MAP_VIEWBOX.height > 0);
  assert.equal(MUSEUM_VISITOR_MAP_ENTRANCE.key, `${MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId}:${MUSEUM_BUILDING_MANIFEST.mainEntrance.slotId}`);
  assert.equal(MUSEUM_VISITOR_MAP_KIOSK.nodeId, MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId);
  assert.equal(MUSEUM_VISITOR_MAP_KIOSK_MARKER.nodeId, MUSEUM_BUILDING_MANIFEST.mainEntrance.nodeId);
  assert.deepEqual(sorted(MUSEUM_VISITOR_MAP_EDGES.map(({connectionId}) => connectionId)), sorted(MUSEUM_BUILDING_MANIFEST.connections.map(({id}) => id)), 'Visitor-map edges differ from the manifest connections');
  assert.deepEqual(sorted(MUSEUM_VISITOR_MAP_RESERVATIONS.map(({id}) => id)), sorted(MUSEUM_BUILDING_MANIFEST.reserves.map(({id}) => id)), 'Visitor-map reserves differ from the manifest reserves');
  for (const projection of MUSEUM_VISITOR_MAP_NODE_PROJECTIONS) {
    assert(runtimeNodeById.has(projection.id), `Visitor map projects unknown physical node ${projection.id}`);
    assert(projection.cells.length > 0, `${projection.id} has no projected map polygon`);
    assert(projection.cells.every(({area, points}) => area > 0 && points.length >= 4 && points.every(({x, y}) => Number.isFinite(x) && Number.isFinite(y))), `${projection.id} has invalid projected geometry`);
    assert(projection.outline.length > 0, `${projection.id} has no projected exterior outline`);
    const insideProjectedUnion = (point) => projection.cells.some(({points}) => {
      const minimumX = Math.min(...points.map(({x}) => x));
      const maximumX = Math.max(...points.map(({x}) => x));
      const minimumY = Math.min(...points.map(({y}) => y));
      const maximumY = Math.max(...points.map(({y}) => y));
      return point.x > minimumX + .001 && point.x < maximumX - .001
        && point.y > minimumY + .001 && point.y < maximumY - .001;
    });
    for (const {start, end} of projection.outline) {
      assert([start.x, start.y, end.x, end.y].every(Number.isFinite), `${projection.id} has an invalid outline segment`);
      const run = Math.hypot(end.x - start.x, end.y - start.y);
      assert(run > .001, `${projection.id} has a zero-length outline segment`);
      const midpoint = {x: (start.x + end.x) / 2, y: (start.y + end.y) / 2};
      const normal = {x: -(end.y - start.y) / run, y: (end.x - start.x) / run};
      const firstSide = insideProjectedUnion({x: midpoint.x + normal.x * .02, y: midpoint.y + normal.y * .02});
      const secondSide = insideProjectedUnion({x: midpoint.x - normal.x * .02, y: midpoint.y - normal.y * .02});
      assert(firstSide !== secondSide, `${projection.id} map outline draws a false internal wall`);
    }
    assert(Number.isFinite(projection.labelPoint.x) && Number.isFinite(projection.labelPoint.y), `${projection.id} has an invalid map label point`);
  }
  for (const edge of MUSEUM_VISITOR_MAP_EDGES) {
    assert(edge.points.length >= 2 && edge.points.every(({x, y}) => Number.isFinite(x) && Number.isFinite(y)), `${edge.connectionId} has invalid map-edge geometry`);
  }
  for (const node of MUSEUM_VISITOR_MAP_NODES) {
    const physicalProjection = MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.find(({id}) => id === node.physicalNodeId);
    assert(physicalProjection, `${node.programHallId} has no physical map projection`);
    assert.equal(node.rooms.length, node.roomIds.length, `${node.programHallId} map room metadata is incomplete`);
    if (node.hallId) {
      const definition = definitionById.get(node.hallId);
      const destination = resolveMuseumVisitorMapDestination(definition, node);
      assert(destination && validPose(definition, destination), `${node.hallId} fast-travel destination is unsafe`);
      approx(physicalProjection.cells.reduce((sum, cell) => sum + cell.area, 0), definition.layout.floorArea, `${node.hallId} map footprint area`);
    } else {
      assert.equal(node.fastTravelEligible, false, `${node.programHallId} exposes fake fast travel`);
      assert.equal(node.destination.kind, 'walk-only', `${node.programHallId} exposes a curated destination`);
    }
  }
  const projectedDoorwayKeys = sorted(MUSEUM_VISITOR_MAP_DOORWAYS.map(({key}) => key));
  assert.deepEqual(projectedDoorwayKeys, sorted(activeEndpointKeys), 'Visitor map must show active doorways plus the main entrance, not inactive template slots');
  assert(!MUSEUM_VISITOR_MAP_NODE_PROJECTIONS.some(({publicHallId, id}) => LEGACY_HALL_IDS.includes(publicHallId) || LEGACY_HALL_IDS.some((legacyId) => id === `hall:${legacyId}`)));
});

check('decoded texture residency admits every active and approached hall under 96 MiB', () => {
  assert.equal(MUSEUM_DECODED_TEXTURE_BUDGET_MIB, 96);
  assert.equal(MUSEUM_DECODED_TEXTURE_BUDGET_BYTES, 96 * 1024 * 1024);
  assert.equal(buildingManifest.reserves.length, 2, 'persistent reserve-label count changed');
  const expectedBuildingSignBytes = independentDecodedTextureBytes(independentTextureDimensionsForPlane(
    5.6,
    5.6 * .27,
    {width: 600, height: 160, mipmaps: true},
  ));
  const expectedPlannedStatusSignBytes = buildingManifest.nodes.reduce((sum, node) =>
    sum + (node.geometry?.signs ?? []).reduce((signSum, sign) =>
      signSum + independentDecodedTextureBytes(independentTextureDimensionsForPlane(
        sign.width,
        sign.height,
        {width: 600, height: 160, mipmaps: true},
      )), 0), 0);
  const expectedReservationSignBytes = buildingManifest.reserves.reduce((sum, reservation) =>
    sum + independentDecodedTextureBytes(independentTextureDimensionsForPlane(
      (reservation.boundaryWall?.size.width ?? 4) * .9,
      Math.min(1.1, (reservation.boundaryWall?.size.width ?? 4) * .245),
      {width: 700, height: 190, mipmaps: true},
    )), 0);
  const expectedVisitorMapKioskBytes = independentDecodedTextureBytes({
    width: 1200,
    height: 918,
    mipmaps: true,
  });
  const expectedReadinessGateBytes = independentDecodedTextureBytes({width: 600, height: 160, mipmaps: true});
  const publicNodeIds = new Set(buildingManifest.nodes.filter(({publicHallId}) => Boolean(publicHallId)).map(({id}) => id));
  const gateCounts = new Map();
  for (const connection of buildingManifest.connections.filter(({implementationStatus}) => implementationStatus === 'live')) {
    if (publicNodeIds.has(connection.b.nodeId)) gateCounts.set(connection.a.nodeId, (gateCounts.get(connection.a.nodeId) ?? 0) + 1);
    if (publicNodeIds.has(connection.a.nodeId)) gateCounts.set(connection.b.nodeId, (gateCounts.get(connection.b.nodeId) ?? 0) + 1);
  }
  const expectedMaximumReadinessGates = Math.max(1, ...gateCounts.values());
  assert(expectedMaximumReadinessGates >= 1 && expectedMaximumReadinessGates <= 4, 'the independent physical-node gate count is unbounded');
  const expectedPersistentBytes = expectedBuildingSignBytes
    + expectedPlannedStatusSignBytes
    + expectedReservationSignBytes
    + expectedVisitorMapKioskBytes
    + expectedReadinessGateBytes * expectedMaximumReadinessGates;
  assert.deepEqual(MUSEUM_PERSISTENT_TEXTURE_ESTIMATE, {
    buildingSignBytes: expectedBuildingSignBytes,
    plannedStatusSignBytes: expectedPlannedStatusSignBytes,
    reservationSignBytes: expectedReservationSignBytes,
    visitorMapKioskBytes: expectedVisitorMapKioskBytes,
    readinessGateBytes: expectedReadinessGateBytes,
    maximumSimultaneousReadinessGates: expectedMaximumReadinessGates,
    totalBytes: expectedPersistentBytes,
    totalMiB: expectedPersistentBytes / 1024 / 1024,
  }, 'persistent building, reservation, and readiness allocations drifted');
  let peak = 0;
  for (const hallId of HALL_IDS) {
    const active = estimateMuseumHallTextureResidency(hallId, 'active');
    const entry = estimateMuseumHallTextureResidency(hallId, 'entry-resident');
    console.log(`  ${hallId}: active ${active.totalMiB.toFixed(2)} MiB · entry ${entry.totalMiB.toFixed(2)} MiB`);
    assert(active.totalBytes > 0, `${hallId} has no active texture residency`);
    if (active.totalBytes > MUSEUM_DECODED_TEXTURE_BUDGET_BYTES) residencyAdmissionFailures.push(`${hallId} active textures use ${active.totalMiB.toFixed(2)} MiB and exceed 96 MiB`);
    assert(entry.totalBytes > 0 && entry.totalBytes <= active.totalBytes, `${hallId} entry textures are unbounded`);
  }
  assert(MUSEUM_PERSISTENT_TEXTURE_ESTIMATE.totalBytes > 0, 'persistent building textures are missing from the residency estimate');
  assert(MUSEUM_PERSISTENT_TEXTURE_ESTIMATE.totalBytes < MUSEUM_DECODED_TEXTURE_BUDGET_BYTES, 'persistent building textures consume the whole budget');
  const realApproaches = MUSEUM_DIRECTED_CONNECTIONS.flatMap((connection) => {
    const target = runtimeNodeById.get(connection.targetNodeId);
    return target?.publicHallId ? [{hallId: target.publicHallId, entranceId: connection.targetEntranceId, connectionId: connection.id}] : [];
  });
  assert(realApproaches.length > 0, 'the building exposes no physical public-hall approaches');
  for (const activeHallId of HALL_IDS) {
    for (const approach of realApproaches) {
      const approachedHallId = approach.hallId;
      if (activeHallId === approachedHallId) continue;
      const plan = resolveMuseumHallResidencyPlan({activeHallId, approachedHallId, approachedEntranceId: approach.entranceId});
      assert(plan.hallIds.includes(activeHallId), `${activeHallId} was evicted`);
      if (!plan.hallIds.includes(approachedHallId)) residencyAdmissionFailures.push(`${activeHallId} -> ${approach.connectionId}: active=${estimateMuseumHallTextureResidency(activeHallId, 'active').totalMiB.toFixed(2)} MiB entry=${estimateMuseumHallTextureResidency(approachedHallId, 'entry-resident', approach.entranceId).totalMiB.toFixed(2)} MiB skipped=${plan.skippedForTextureBudget.join(',')}`);
      assert(plan.hallIds.length <= 3);
      assert(plan.decodedTextureBytes <= plan.decodedTextureBudgetBytes);
      assert.equal(plan.persistentDecodedTextureBytes, MUSEUM_PERSISTENT_TEXTURE_ESTIMATE.totalBytes);
      peak = Math.max(peak, plan.decodedTextureBytes);
      for (const recentHallId of HALL_IDS) {
        if (recentHallId === activeHallId || recentHallId === approachedHallId) continue;
        const withRecent = resolveMuseumHallResidencyPlan({activeHallId, approachedHallId, approachedEntranceId: approach.entranceId, recentHallId});
        if (!withRecent.hallIds.includes(activeHallId) || !withRecent.hallIds.includes(approachedHallId)) residencyAdmissionFailures.push(`${activeHallId} -> ${approachedHallId} with recent ${recentHallId}`);
        assert(withRecent.hallIds.length <= 3);
        assert(withRecent.decodedTextureBytes <= withRecent.decodedTextureBudgetBytes);
        peak = Math.max(peak, withRecent.decodedTextureBytes);
      }
    }
  }
  console.log(`  texture residency peak: ${(peak / 1024 / 1024).toFixed(2)} MiB / 96 MiB`);
});

check('all 186 live canonical exhibits have substantial, sourced, route-aware interpretation', () => {
  assert.equal(MUSEUM_INTERPRETATIONS.length, 186);
  assert.equal(new Set(MUSEUM_INTERPRETATIONS.map(({hallId, id}) => `${hallId}/${id}`)).size, 186);
  assert.deepEqual(sorted(MUSEUM_INTERPRETATIONS.map(({hallId, id}) => `${hallId}/${id}`)), sorted(activeRefs));
  for (const interpretation of MUSEUM_INTERPRETATIONS) {
    const hall = hallById.get(interpretation.hallId);
    const exhibit = hall?.exhibits.find(({id}) => id === interpretation.id);
    assert(exhibit, `${interpretation.hallId}/${interpretation.id} is not live`);
    const minimumLead = ['anchor-exhibit', 'standard-individual-exhibit'].includes(interpretation.tier) ? 100 : 70;
    const minimumTotal = ['anchor-exhibit', 'standard-individual-exhibit'].includes(interpretation.tier) ? 220 : 150;
    if (wordCount(interpretation.lead) < minimumLead) interpretationQualityFailures.push(`${interpretation.id}: lead ${wordCount(interpretation.lead)} < ${minimumLead} words`);
    assert(wordCount(interpretation.centralQuestion) >= 5, `${interpretation.id} central question is too shallow`);
    if (interpretation.sections.length < 3) interpretationQualityFailures.push(`${interpretation.id}: ${interpretation.sections.length} < 3 sections`);
    const sectionWords = wordCount(interpretation.sections.flatMap(({paragraphs}) => paragraphs).join(' '));
    if (sectionWords < 80) interpretationQualityFailures.push(`${interpretation.id}: section body ${sectionWords} < 80 words`);
    const totalInterpretiveWords = wordCount(interpretation.lead) + sectionWords;
    if (totalInterpretiveWords < minimumTotal) interpretationQualityFailures.push(`${interpretation.id}: total interpretation ${totalInterpretiveWords} < ${minimumTotal} words`);
    if (interpretation.keyIdeas.length < 1) interpretationQualityFailures.push(`${interpretation.id}: no key ideas`);
    if (interpretation.keyWorks.length < 1) interpretationQualityFailures.push(`${interpretation.id}: no key works or traditions`);
    if (interpretation.sources.length < 3) interpretationQualityFailures.push(`${interpretation.id}: ${interpretation.sources.length} < 3 sources`);
    for (const sourceRecord of interpretation.sources) assert(/^https?:\/\//.test(sourceRecord.url), `${interpretation.id} has invalid source ${sourceRecord.url}`);
    assert.equal(interpretation.articleRoute.kind, exhibit.entityKind === 'philosopher' ? 'philosopher' : 'branch');
    const articleId = interpretation.articleRoute.philosopherId ?? interpretation.articleRoute.branchId;
    assert.equal(articleId, exhibit.entityId, `${interpretation.id} article route targets the wrong record`);
    for (const related of interpretation.relatedExhibits) assert(activeRefs.has(`${related.hallId}/${related.exhibitId}`), `${interpretation.id} links a non-live related exhibit`);
    for (const [assetId, text] of Object.entries(interpretation.objectInterpretations)) {
      assert(assetById.has(assetId), `${interpretation.id} interprets missing asset ${assetId}`);
      assert(wordCount(text) >= 12, `${interpretation.id}/${assetId} object interpretation is too shallow`);
    }
    for (const assetId of [exhibit.principalAssetId, ...(exhibit.supportingAssetIds ?? [])].filter(Boolean)) {
      assert(interpretation.objectInterpretations[assetId], `${interpretation.id} lacks interpretation for ${assetId}`);
    }
    for (const connection of interpretation.connections ?? []) {
      assert(connection.relationship.length >= 24, `${interpretation.id} has an unexplained connection`);
      if (connection.status === 'planned') assert.equal(connection.route, undefined, `${interpretation.id} links an unopened planned hall`);
    }
  }
  const krishnamurti = MUSEUM_INTERPRETATIONS.find(({id}) => id === 'jiddu-krishnamurti');
  assert(krishnamurti);
  assert.equal(krishnamurti.hallId, 'core-questions-forum');
  assert.equal(krishnamurti.roomId, 'core-mind-self');
  assert.equal(krishnamurti.tier, 'standard-individual-exhibit');
  assert(krishnamurti.connections.some(({kind, label}) => kind === 'room-comparison' && /Religion/i.test(label)));
  assert(krishnamurti.connections.some(({kind, status, label}) => kind === 'secondary-route' && status === 'open' && /South Asia/i.test(label)));
  assert(krishnamurti.connections.some(({kind, label, relationship}) => kind === 'live-comparison' && /Nagel/i.test(label) && /not a claim of influence/i.test(relationship)));
  assert.deepEqual(Object.keys(krishnamurti.objectInterpretations).sort(), ['jiddu-krishnamurti-bain-portrait', 'jiddu-krishnamurti-besant-1927']);
});

check('Fast movement substeps cannot tunnel through walls, exhibits, barriers, or readiness thresholds', () => {
  assert.equal(clampFrameDelta(10), .05);
  const playerRadius = .32;
  const bounds = {minX: -5, maxX: 5, minZ: -5, maxZ: 5};
  const spatialCells = [{id: 'speed-audit', bounds, ceilingHeight: 4, lightingGroupId: 'audit'}];
  const fastFrameDistance = MUSEUM_FAST_WALK_SPEED * clampFrameDelta(10);
  for (const [label, collider] of [
    ['wall', {id: 'speed-wall', center: {x: 0, z: 0}, size: {width: 8, depth: .05}, rotation: 0}],
    ['exhibit', {id: 'speed-exhibit', center: {x: 0, z: 0}, size: {width: .7, depth: .7}, rotation: 0}],
    ['future barrier', {id: 'speed-future', center: {x: 0, z: 0}, size: {width: 4, depth: .08}, rotation: 0}],
  ]) {
    const next = moveWithCollisions(
      {x: 0, z: -1},
      {x: 0, z: fastFrameDistance * 8},
      playerRadius,
      bounds,
      [collider],
      spatialCells,
    );
    assert(!circleIntersectsCollider(next, playerRadius, collider), `Fast movement ended inside ${label}`);
    assert(next.z <= -playerRadius, `Fast movement tunneled through ${label}`);
  }
  for (const node of MUSEUM_RUNTIME_NODES) {
    for (const entrance of node.entrances) {
      const thresholdDepth = Math.abs(entrance.inwardNormal.x) > .5
        ? entrance.transitionBounds.size.width
        : entrance.transitionBounds.size.depth;
      assert(fastFrameDistance < thresholdDepth, `${node.id}/${entrance.id} readiness threshold can be skipped in one Fast frame`);
    }
  }
});

check('sessions, walking pace, readiness, and travel contexts remain safe and hall-qualified', () => {
  assert.equal(MUSEUM_STANDARD_WALK_SPEED, 3.75);
  assert.equal(MUSEUM_FAST_WALK_SPEED, 6);
  assert.equal(resolveMuseumWalkingSpeed('standard'), 3.75);
  assert.equal(resolveMuseumWalkingSpeed('standard', true), 6);
  assert.equal(resolveMuseumWalkingSpeed('fast', true), 6);
  assert.deepEqual(createMuseumInputState(), {forward: 0, strafe: 0, walkingSpeed: 3.75, lookX: 0, lookY: 0});
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: false, metaKey: false}), false);
  assert.equal(hasMuseumBrowserModifier({altKey: true, ctrlKey: false, metaKey: false}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: true, metaKey: false}), true);
  assert.equal(hasMuseumBrowserModifier({altKey: false, ctrlKey: false, metaKey: true}), true);
  assert.equal(resolveMuseumReadinessGateStatus('loading', false), 'loading');
  assert.equal(resolveMuseumReadinessGateStatus('failed', false), 'failed');
  assert.equal(resolveMuseumReadinessGateStatus('ready', true), undefined);
  assert.deepEqual(Object.keys(MUSEUM_READINESS_PRESENTATIONS), ['idle', 'loading', 'failed']);
  const orientationNode = runtimeNodeById.get(MUSEUM_VISITOR_MAP_KIOSK.nodeId);
  const orientationManifestNode = MUSEUM_BUILDING_MANIFEST.nodes.find(({id}) =>
    id === MUSEUM_VISITOR_MAP_KIOSK.nodeId);
  assert(orientationNode && orientationManifestNode, 'The authored Grand Entrance orientation destination is missing');
  assert.equal(orientationNode.publicHallId, undefined, 'The Grand Entrance was incorrectly attached to Gallery 01 content');
  assert.deepEqual(orientationNode.layout.reset, orientationNode.layout.spawn, 'Fresh arrival and Reset use different Grand Entrance poses');
  assert(validPose(orientationNode, orientationNode.layout.reset), 'The authored Grand Entrance orientation pose is unsafe');
  assert.deepEqual(orientationManifestNode.orientationLandmark, {
    id: MUSEUM_VISITOR_MAP_KIOSK.id,
    position: MUSEUM_VISITOR_MAP_KIOSK.center,
  });
  assert(
    orientationNode.layout.furnishings.some(({id}) => id === MUSEUM_VISITOR_MAP_KIOSK.id)
      && orientationNode.layout.obstacleColliders.some(({id}) => id === MUSEUM_VISITOR_MAP_KIOSK.id),
    'The physical visitor-map landmark lacks persistent rendering/collision ownership',
  );
  const spawnForward = {
    x: -Math.sin(orientationNode.layout.spawn.yaw),
    z: -Math.cos(orientationNode.layout.spawn.yaw),
  };
  const visibleFromSpawn = (point) => {
    const offset = {x: point.x - orientationNode.layout.spawn.x, z: point.z - orientationNode.layout.spawn.z};
    const length = Math.hypot(offset.x, offset.z);
    return length > 0 && (offset.x * spawnForward.x + offset.z * spawnForward.z) / length
      >= Math.cos(orientationNode.layout.cameraFov / 2 * Math.PI / 180);
  };
  assert(visibleFromSpawn(MUSEUM_VISITOR_MAP_KIOSK.center), 'Fresh arrival does not face the physical visitor map');
  const semanticDefinition = definitions[0];
  const semanticExhibit = semanticDefinition.layout.exhibits[0];
  const sessionValues = new Map();
  const sessionStorage = {
    getItem: (key) => sessionValues.get(key) ?? null,
    setItem: (key, value) => sessionValues.set(key, value),
    removeItem: (key) => sessionValues.delete(key),
  };
  assert(
    saveMuseumSession(
      semanticDefinition.layout,
      semanticDefinition.layout.spawn,
      semanticExhibit.id,
      sessionStorage,
    ),
    'A valid Museum session could not be saved',
  );
  const storedSemanticSession = JSON.parse(
    sessionValues.get(museumSessionStorageKey(semanticDefinition.id)),
  );
  assert.equal(storedSemanticSession.version, 2);
  assert.equal(storedSemanticSession.hallId, semanticDefinition.id);
  assert.equal(storedSemanticSession.exhibitId, semanticExhibit.id);
  assert.equal(
    storedSemanticSession.manifestVersion,
    MUSEUM_BUILDING_MANIFEST.manifestVersion,
  );
  for (const rawPoseField of ['x', 'z', 'yaw', 'pitch']) {
    assert(
      !Object.hasOwn(storedSemanticSession, rawPoseField),
      `v2 Museum storage persisted raw ${rawPoseField}`,
    );
  }
  const loadedSemanticSession = loadMuseumSession(semanticDefinition.layout, sessionStorage);
  assert(loadedSemanticSession, 'A semantic Museum session could not be resolved');
  assert.deepEqual(
    {
      x: loadedSemanticSession.x,
      z: loadedSemanticSession.z,
      yaw: loadedSemanticSession.yaw,
      pitch: loadedSemanticSession.pitch,
    },
    semanticExhibit.viewpoint,
    'An exhibit session did not resolve to its authored viewpoint',
  );
  assert.deepEqual(
    loadMuseumLastVisit(sessionStorage),
    storedSemanticSession,
    'The building-level last-visit pointer diverged from the saved semantic anchor',
  );
  assert(
    saveMuseumLastVisit(
      {
        hallId: semanticDefinition.id,
        entranceId: MUSEUM_BUILDING_MANIFEST.mainEntrance.slotId,
      },
      sessionStorage,
    ),
    'An entrance last-visit pointer could not be saved',
  );
  assert.equal(
    loadMuseumLastVisit(sessionStorage)?.entranceId,
    MUSEUM_BUILDING_MANIFEST.mainEntrance.slotId,
  );

  sessionValues.delete(museumSessionStorageKey(semanticDefinition.id));
  const legacyRaw = JSON.stringify({
    version: 1,
    hallId: semanticDefinition.id,
    ...semanticDefinition.layout.spawn,
    lastNearbyExhibit: semanticExhibit.id,
  });
  sessionValues.set(legacyMuseumSessionStorageKey(semanticDefinition.id), legacyRaw);
  const migratedLegacySession = loadMuseumSession(semanticDefinition.layout, sessionStorage);
  assert.equal(migratedLegacySession?.migratedFromVersion, 1);
  const migratedSemanticRecord = JSON.parse(
    sessionValues.get(museumSessionStorageKey(semanticDefinition.id)),
  );
  assert.equal(migratedSemanticRecord.version, 2);
  assert.equal(migratedSemanticRecord.exhibitId, semanticExhibit.id);
  assert.equal(
    sessionValues.get(legacyMuseumSessionStorageKey(semanticDefinition.id)),
    legacyRaw,
    'v1 migration removed the rollback session record',
  );
  for (const rawPoseField of ['x', 'z', 'yaw', 'pitch']) {
    assert(
      !Object.hasOwn(migratedSemanticRecord, rawPoseField),
      `v1 migration copied raw ${rawPoseField} into v2 storage`,
    );
  }
  const legacyRoomView = semanticDefinition.layout.entryViews[0];
  const legacyRoom = semanticDefinition.layout.spatialCells.find(
    ({id}) => id === legacyRoomView.spatialCellId,
  );
  assert(legacyRoom, 'The v1 room migration fixture has no authored room');
  const legacyRoomSession = parseMuseumSession(JSON.stringify({
    version: 1,
    hallId: semanticDefinition.id,
    x: (legacyRoom.bounds.minX + legacyRoom.bounds.maxX) / 2,
    z: (legacyRoom.bounds.minZ + legacyRoom.bounds.maxZ) / 2,
    yaw: 2.4,
    pitch: .4,
  }), semanticDefinition.layout);
  assert.equal(legacyRoomSession?.roomId, legacyRoom.id);
  assert.deepEqual(
    legacyRoomSession
      ? {
          x: legacyRoomSession.x,
          z: legacyRoomSession.z,
          yaw: legacyRoomSession.yaw,
          pitch: legacyRoomSession.pitch,
        }
      : undefined,
    sanitizeMuseumPose(legacyRoomView.pose, semanticDefinition.layout),
    'v1 migration replayed raw coordinates instead of the room entry pose',
  );

  for (const definition of definitions) {
    const raw = JSON.stringify({version: 1, hallId: definition.id, ...definition.layout.spawn, lastNearbyExhibit: definition.layout.exhibits[0]?.id});
    const migrated = parseMuseumSession(raw, definition.layout);
    assert(migrated, `${definition.id} valid session was rejected`);
    assert.equal(migrated.version, 2, `${definition.id} did not resolve a legacy record as v2`);
    assert.equal(migrated.migratedFromVersion, 1, `${definition.id} did not identify a v1 migration`);
    assert.equal(parseMuseumSession('{bad json', definition.layout), undefined, `${definition.id} accepted malformed JSON`);
    assert.equal(parseMuseumSession('x'.repeat(4097), definition.layout), undefined, `${definition.id} accepted an oversized session`);
    assert.equal(parseMuseumSession(JSON.stringify({version: 1, hallId: 'ancient-greek', ...definition.layout.spawn}), definition.layout), undefined, `${definition.id} accepted a retired hall session`);
    assert.equal(parseMuseumSession(JSON.stringify({version: 0, hallId: definition.id, ...definition.layout.spawn}), definition.layout), undefined, `${definition.id} accepted the wrong session version`);
    const invalidLegacyCoordinates = parseMuseumSession(JSON.stringify({version: 1, hallId: definition.id, x: null, z: 0, yaw: 0, pitch: 0}), definition.layout);
    assert(invalidLegacyCoordinates, `${definition.id} did not fall back safely for invalid legacy coordinates`);
    assert(validPose(definition, invalidLegacyCoordinates), `${definition.id} resolved invalid legacy coordinates to an unsafe pose`);
    assert.equal(sanitizeMuseumPose({...definition.layout.spawn, x: Number.POSITIVE_INFINITY}, definition.layout), undefined, `${definition.id} accepted a non-finite pose`);
    assert.equal(sanitizeMuseumPose({...definition.layout.exhibits[0].collider.center, yaw: 0, pitch: 0}, definition.layout), undefined, `${definition.id} accepted a pose inside an exhibit`);
    const authoredSpatialCells = definition.layout.spatialCells.map((cell) => cell.renderBounds
      ? {...cell, bounds: cell.renderBounds}
      : cell);
    const seamCandidates = definition.entrances.flatMap((entrance) => definition.layout.spatialCells.flatMap((cell) => {
      if (!cell.renderBounds) return [];
      const authored = cell.renderBounds;
      const candidates = [];
      if (cell.bounds.minX < authored.minX && Math.abs(entrance.position.x - authored.minX) < .01) candidates.push({x: authored.minX - .15, z: entrance.position.z, yaw: 0, pitch: 0});
      if (cell.bounds.maxX > authored.maxX && Math.abs(entrance.position.x - authored.maxX) < .01) candidates.push({x: authored.maxX + .15, z: entrance.position.z, yaw: 0, pitch: 0});
      if (cell.bounds.minZ < authored.minZ && Math.abs(entrance.position.z - authored.minZ) < .01) candidates.push({x: entrance.position.x, z: authored.minZ - .15, yaw: 0, pitch: 0});
      if (cell.bounds.maxZ > authored.maxZ && Math.abs(entrance.position.z - authored.maxZ) < .01) candidates.push({x: entrance.position.x, z: authored.maxZ + .15, yaw: 0, pitch: 0});
      return candidates;
    }));
    const expandedSeamPose = seamCandidates.find((candidate) =>
      isValidMuseumPosition(candidate, definition.layout.playerRadius, definition.layout.bounds, allColliders(definition.layout), definition.layout.spatialCells)
      && !positionInsideSpatialUnion(candidate, definition.layout.playerRadius, authoredSpatialCells));
    assert(expandedSeamPose, `${definition.id} exposes no valid expanded seam pose for the session audit`);
    const sanitizedSeamPose = sanitizeMuseumPose(expandedSeamPose, definition.layout);
    assert(sanitizedSeamPose, `${definition.id} could not clamp an expanded seam pose into its authored footprint`);
    assert(positionInsideSpatialUnion(sanitizedSeamPose, definition.layout.playerRadius, authoredSpatialCells), `${definition.id} preserved a session in navigation-only seam overlap`);
    assert(distance(sanitizedSeamPose, expandedSeamPose) > .1, `${definition.id} did not move the navigation-only seam session pose`);
    const parsedSeamSession = parseMuseumSession(JSON.stringify({version: 1, hallId: definition.id, ...expandedSeamPose}), definition.layout);
    assert(parsedSeamSession && positionInsideSpatialUnion(parsedSeamSession, definition.layout.playerRadius, authoredSpatialCells), `${definition.id} restored a session outside the authored spatial union`);
    const unknownNearby = parseMuseumSession(JSON.stringify({version: 1, hallId: definition.id, ...definition.layout.spawn, lastNearbyExhibit: 'not-an-exhibit'}), definition.layout);
    assert(unknownNearby && !Object.hasOwn(unknownNearby, 'lastNearbyExhibit'), `${definition.id} preserved an unknown nearby exhibit`);
    const travel = createMuseumHallTravelContext(definition.id);
    assert.deepEqual(parseMuseumHallTravelContext({philosophyAtlasMuseumTravel: travel}, definition.id), travel);
    assert.equal(parseMuseumHallTravelContext({philosophyAtlasMuseumTravel: {...travel, version: 0}}, definition.id), undefined);
    assert.equal(parseMuseumHallTravelContext({philosophyAtlasMuseumTravel: {...travel, resumeExploration: false}}, definition.id), undefined);
    assert.equal(parseMuseumHallTravelContext({philosophyAtlasMuseumTravel: travel}, HALL_IDS.find((id) => id !== definition.id)), undefined);
    const visit = createMuseumExhibitVisitContext(definition.id, 'direct');
    assert.deepEqual(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: visit}, definition.id), visit);
    assert.equal(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: {...visit, version: 0}}, definition.id), undefined);
    assert.equal(parseMuseumExhibitVisitContext({philosophyAtlasMuseum: visit}, HALL_IDS.find((id) => id !== definition.id)), undefined);
    for (const entrance of definition.entrances) {
      const gate = resolveMuseumReadinessGateGeometry(entrance);
      assert(gate.thresholdWidth < gate.clearWidth && gate.plaqueWidth < gate.clearWidth, `${definition.id}/${entrance.id} readiness furniture blocks the doorway`);
    }
  }
});

check('the React implementation uses one persistent Canvas, one shared canonical renderer, truthful compatibility, and retryable readiness', () => {
  const tsxSources = readdirSync(galleryRoot).filter((file) => extname(file) === '.tsx').map((file) => readFileSync(resolve(galleryRoot, file), 'utf8'));
  const canvasCount = tsxSources.reduce((sum, text) => sum + [...text.matchAll(/<Canvas\b/g)].length, 0);
  assert.equal(canvasCount, 1, 'MuseumGallery must contain exactly one React Three Fiber Canvas');
  assert.match(museumWorldSource, /Owns the one Museum Canvas/);
  assert.doesNotMatch(museumWorldSource, /key=\{(?:activeHallId|route\.hallId)\}/);
  assert.match(registrySource, /CanonicalMuseumHallScene/);
  assert.match(registrySource, /MUSEUM_CANONICAL_HALL_IDS\.map/);
  for (const legacyScene of ['AncientGreekHallScene', 'RenaissanceReasonRevolutionHallScene', 'ModernityFreedomCritiqueHallScene', 'LogicLanguageScienceHallScene', 'EthicsJusticePoliticalLifeHallScene', 'MindConsciousnessSelfHallScene']) {
    assert(!registrySource.includes(legacyScene), `runtime registry still imports ${legacyScene}`);
  }
  assert.match(canonicalSceneSource, /CanonicalMuseumExhibits/);
  assert.match(canonicalSceneSource, /ContemporaryHallArchitecture/);
  assert.match(canonicalExhibitsSource, /Every Gallery 01 installation presents provenance-backed imagery/);
  assert.match(canonicalExhibitsSource, /usePlaqueTexture/);
  assert.match(architectureSource, /museumTextureDimensionsForPlane/);
  assert.match(architectureSource, /<mesh position=\{\[0, 0, \.002\]\}><planeGeometry/);
  assert.match(visitorMapSource, /The Continuous Enfilade is a single-level, 26-gallery museum/);
  assert.match(visitorMapSource, /26-gallery collection plan/);
  assert.match(visitorMapSource, /10 metre north–south crosscut has six truthful intersections/);
  assert.match(visitorMapSource, /Twenty-five curated galleries are open for fast travel; one planned gallery shell is walkable but has no travel control/);
  assert.match(visitorMapSource, /projectMuseumVisitorMapHeading/);
  assert.match(visitorMapSource, /Fast travel is limited to the 25 curated\/open galleries/);
  assert.doesNotMatch(visitorMapSource, /Ring of Wings|Permanent construction stage|registered hall’s authored safe spawn/);
  assert.match(visitorMapSource, /MUSEUM_VISITOR_MAP_RESERVATIONS/);
  assert.match(visitorMapSource, /selected\.hall\.rooms\.map/);
  assert.match(compatibilitySource, /is not currently installed/);
  assert.match(compatibilitySource, /underlying Atlas record, article, relationships, media, and source data have not been deleted/);
  assert.match(museumPageSource, /residentHallIds/);
  assert.match(museumPageSource, /retryHallContent/);
  assert.match(museumPageSource, /Retry gallery/);
  assert.match(museumPageSource, /MUSEUM_WORLD_REGISTRY\.filter/);
  assert.match(museumPageSource, /onOpenVisitorMap: showVisitorMap/);
  assert.match(museumPageSource, /<span>MAP \(M\)<\/span>/);
  assert.match(museumPageSource, /Position reset to the Grand Entrance and visitor map/);
  assert.match(museumPageSource, /MUSEUM_BUILDING_MANIFEST\.mainEntrance\.nodeId/);
  assert.match(museumPageSource, /Walk to Gallery 01/);
  assert.match(museumPageSource, /Fast-travel to Forum crosscut/);
  assert.match(museumPageSource, /Start guided opening/);
  assert.match(museumPageSource, /canResumeLastMuseumVisit && <button/);
  assert.match(museumPageSource, /Resume saved visit/);
  assert.match(museumPageSource, /Explore entrance freely/);
  assert.match(museumPageSource, /Map & curated fast travel/);
  assert.match(museumPageSource, /Final Return \/ Exit threshold/);
  assert.match(museumPageSource, /loadMuseumLastVisit/);
  assert.match(museumPageSource, /activeNodeRef\.current\.publicHallId && hallLoadStatus/);
  assert.doesNotMatch(museumPageSource, /tickets|lockers|generic study/i);
  assert.match(buildingArchitectureSource, /Philosophy Atlas Museum · Grand Entrance/);
  assert.match(buildingArchitectureSource, /MUSEUM_BUILDING_MANIFEST\.reserves/);
  assert.match(buildingArchitectureSource, /<MuseumVisitorMapKiosk/);
  assert.match(museumControlsSource, /event\.code === 'KeyM'[\s\S]{0,180}onOpenVisitorMap/);
  assert.doesNotMatch(museumControlsSource, /event\.code === 'KeyD'/, 'D must remain movement-only');
  assert.doesNotMatch(museumControlsSource, /onOpenDirectory/, 'The keyboard controls still expose a Directory shortcut');
  assert.match(visitorMapSource, /panelClassName="museum-visitor-map-panel"/);
  assert.match(visitorMapSource, /museum-visitor-map-action/);
  assert.match(museumModalSource, /document\.documentElement\.style\.overflow = 'hidden'/);
  assert.match(museumModalSource, /document\.body\.style\.overflow = 'hidden'/);
  assert.match(museumCssSource, /\.museum-visitor-map-panel\{[^}]*height:100%[^}]*overflow:hidden/);
  assert.match(museumCssSource, /@media\(min-width:901px\) and \(max-height:820px\)/);
  assert.match(museumCssSource, /museum-visitor-map-reservations/);
});

assert.deepEqual(unsafeExhibitViewpoints, [], `unsafe exhibit viewpoints:\n${unsafeExhibitViewpoints.join('\n')}`);
assert.deepEqual(unsafeNavigationPoses, [], `unsafe navigation poses:\n${unsafeNavigationPoses.join('\n')}`);
assert.deepEqual(seamCrossingFailures, [], `collision-resolved seam failures:\n${seamCrossingFailures.join('\n')}`);
assert.deepEqual(residencyAdmissionFailures, [], `approached-hall residency failures:\n${[...new Set(residencyAdmissionFailures)].join('\n')}`);
assert.deepEqual(interpretationQualityFailures, [], `interpretation quality failures:\n${interpretationQualityFailures.join('\n')}`);

console.log(`\nMuseum audit passed: ${checks} groups covering ${definitions.length} canonical halls, 101 rooms, 186 canonical exhibits, ${MUSEUM_SUPPLEMENTAL_EXHIBITS.length} supplemental exhibits, 571 interpreted stops, ${physicalMovementTrajectories} production-frame crossing trajectories over ${MUSEUM_DIRECTED_CONNECTIONS.length} directed crossings and ${MUSEUM_BUILDING_MANIFEST.connections.length} physical seams, 96 MiB bounded residency, and ${Math.round(museumModuleInitializationMs)}ms canonical-data initialization.`);
