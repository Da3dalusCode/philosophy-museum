import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync, readdirSync, statSync} from 'node:fs';
import {dirname, relative, resolve, sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = resolve(repoRoot, 'public');
const museumMediaRoot = resolve(publicRoot, 'assets/museum');
const sceneMediaSource = readFileSync(resolve(repoRoot, 'src/components/MuseumGallery/MuseumSceneMedia.tsx'), 'utf8');
const preparationSource = readFileSync(resolve(repoRoot, 'scripts/prepareMuseumModernAssets.py'), 'utf8');
const modernManifest = JSON.parse(readFileSync(resolve(repoRoot, 'scripts/museumModernAssetManifest.json'), 'utf8'));
const mediterraneanPreparationSource = readFileSync(resolve(repoRoot, 'scripts/prepareMuseumMediterraneanAssets.py'), 'utf8');
const mediterraneanManifest = JSON.parse(readFileSync(resolve(repoRoot, 'scripts/museumMediterraneanAssetManifest.json'), 'utf8'));
const successorPreparationSource = readFileSync(resolve(repoRoot, 'scripts/prepareMuseumSuccessorGalleriesAssets.py'), 'utf8');
const successorManifest = JSON.parse(readFileSync(resolve(repoRoot, 'scripts/museumSuccessorGalleriesAssetManifest.json'), 'utf8'));
const galleries13And16PreparationSource = readFileSync(resolve(repoRoot, 'scripts/prepareMuseumGalleries13And16Assets.py'), 'utf8');
const galleries13And16Manifest = JSON.parse(readFileSync(resolve(repoRoot, 'scripts/museumGalleries13And16AssetManifest.json'), 'utf8'));
const gallery17PreparationSource = readFileSync(resolve(repoRoot, 'scripts/prepareMuseumGallery17Assets.py'), 'utf8');
const gallery17Manifest = JSON.parse(readFileSync(resolve(repoRoot, 'scripts/museumGallery17AssetManifest.json'), 'utf8'));
const gallery18PreparationSource = readFileSync(resolve(repoRoot, 'scripts/prepareMuseumGallery18Assets.py'), 'utf8');
const gallery18Manifest = JSON.parse(readFileSync(resolve(repoRoot, 'scripts/museumGallery18AssetManifest.json'), 'utf8'));
const galleries20And21PreparationSource = readFileSync(
  resolve(repoRoot, 'scripts/prepareMuseumGalleries20And21Assets.py'),
  'utf8',
);
const galleries20And21Manifest = JSON.parse(
  readFileSync(resolve(repoRoot, 'scripts/museumGalleries20And21AssetManifest.json'), 'utf8'),
);
const galleries19And22PreparationSource = readFileSync(
  resolve(repoRoot, 'scripts/prepareMuseumGalleries19And22Assets.py'),
  'utf8',
);
const galleries19And22Manifest = JSON.parse(
  readFileSync(resolve(repoRoot, 'scripts/museumGalleries19And22AssetManifest.json'), 'utf8'),
);
const galleries23And24PreparationSource = readFileSync(
  resolve(repoRoot, 'scripts/prepareMuseumGalleries23And24Assets.py'),
  'utf8',
);
const galleries23And24Manifest = JSON.parse(
  readFileSync(resolve(repoRoot, 'scripts/museumGalleries23And24AssetManifest.json'), 'utf8'),
);
const gallery26PreparationSource = readFileSync(resolve(repoRoot, 'scripts/prepareMuseumGallery26Assets.py'), 'utf8');
const gallery26Manifest = JSON.parse(
  readFileSync(resolve(repoRoot, 'scripts/museumGallery26AssetManifest.json'), 'utf8'),
);
const gallery25PreparationSource = readFileSync(resolve(repoRoot, 'scripts/prepareMuseumGallery25Assets.py'), 'utf8');
const gallery25Manifest = JSON.parse(
  readFileSync(resolve(repoRoot, 'scripts/museumGallery25AssetManifest.json'), 'utf8'),
);
const legacyImageDiversityPreparationSource = readFileSync(
  resolve(repoRoot, 'scripts/prepareMuseumLegacyImageReplacements.py'),
  'utf8',
);
const legacyImageDiversityProgram = JSON.parse(
  readFileSync(resolve(repoRoot, 'src/data/museum/museumLegacyImageDiversity.json'), 'utf8'),
);
const auditBase = '/philosophy-atlas-audit/';
const virtualEntry = 'virtual:philosophy-atlas-museum-asset-audit';
const resolvedEntry = `\0${virtualEntry}`;

const result = await build({
  root: repoRoot,
  configFile: false,
  base: auditBase,
  logLevel: 'silent',
  plugins: [{
    name: 'museum-asset-audit-entry',
    resolveId: (id) => id === virtualEntry ? resolvedEntry : undefined,
    load: (id) => id === resolvedEntry ? `
      export * from '/src/data/museumCatalog.ts';
      export * from '/src/data/museum/museumAssets.ts';
      export * from '/src/data/museum/museumMediaPolicy.ts';
      export * from '/src/data/museum/museumLegacyImageDiversity.ts';
      export * from '/src/data/museum/platoSupplementalExhibits.ts';
      export * from '/src/data/museum/gallery01SupplementalExhibits.ts';
      export * from '/src/data/museum/renaissanceSupplementalExhibits.ts';
      export * from '/src/data/museum/phenomenologySupplementalExhibits.ts';
      export * from '/src/data/museum/analyticSupplementalExhibits.ts';
      export * from '/src/data/museum/justiceSupplementalExhibits.ts';
      export * from '/src/data/museum/coreQuestionsForumSupplementalExhibits.ts';
      export * from '/src/data/museum/classicalSouthAsianSupplementalExhibits.ts';
      export * from '/src/data/museum/buddhistSupplementalExhibits.ts';
      export * from '/src/data/museum/classicalChineseSupplementalExhibits.ts';
      export * from '/src/data/museum/islamicSupplementalExhibits.ts';
      export * from '/src/data/museum/eastAsianSupplementalExhibits.ts';
      export * from '/src/data/museum/jewishSupplementalExhibits.ts';
      export * from '/src/data/museum/latinChristianScholasticSupplementalExhibits.ts';
      export * from '/src/data/museum/hellenisticRomanSupplementalExhibits.ts';
      export * from '/src/data/museum/lateAntiquitySupplementalExhibits.ts';
      export * from '/src/data/museum/rationalismSupplementalExhibits.ts';
      export * from '/src/data/museum/empiricismSupplementalExhibits.ts';
      export * from '/src/data/museum/enlightenmentSupplementalExhibits.ts';
      export * from '/src/data/museum/utilityLibertyCapitalSupplementalExhibits.ts';
      export * from '/src/data/museum/faithPessimismValueSupplementalExhibits.ts';
      export * from '/src/data/museum/germanIdealismSupplementalExhibits.ts';
      export * from '/src/data/museum/pragmatismSupplementalExhibits.ts';
      export * from '/src/data/museum/critiquePowerDeconstructionSupplementalExhibits.ts';
      export * from '/src/data/museum/moralLifePracticalReasonSupplementalExhibits.ts';
      export * from '/src/data/museum/feministPhilosophiesSupplementalExhibits.ts';
      export * from '/src/data/museum/colonialismRaceLiberationSupplementalExhibits.ts';
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
assert(entry, 'Vite did not produce an executable Museum asset audit entry.');

const permanentStructureResult = await build({
  root: repoRoot,
  configFile: false,
  logLevel: 'silent',
  build: {
    ssr: true,
    write: false,
    minify: false,
    target: 'node18',
    rollupOptions: {
      input: resolve(
        repoRoot,
        'src/components/MuseumGallery/MuseumPermanentHallStructure.tsx',
      ),
      output: {format: 'es', codeSplitting: false},
    },
  },
});
const permanentStructureOutputs = (
  Array.isArray(permanentStructureResult)
    ? permanentStructureResult
    : [permanentStructureResult]
).flatMap(({output}) => output);
const permanentStructureEntry = permanentStructureOutputs.find(
  (item) => item.type === 'chunk' && item.isEntry,
);
assert(permanentStructureEntry, 'Vite did not produce the permanent Museum structure audit entry.');
const permanentStructureModules = Object.keys(permanentStructureEntry.modules)
  .map((moduleId) => moduleId.replaceAll('\\', '/'));
const permanentStructureHasModule = (suffix) =>
  permanentStructureModules.some((moduleId) => moduleId.endsWith(suffix));
for (const required of [
  '/MuseumPermanentHallStructure.tsx',
  '/ContemporaryHallArchitecture.tsx',
  '/MuseumPrimaryExhibitStructure.tsx',
  '/MediterraneanOrientationStructure.tsx',
]) {
  assert(
    permanentStructureHasModule(required),
    `Permanent Museum structure is missing ${required}`,
  );
}
for (const forbidden of [
  '/CanonicalMuseumHallScene.tsx',
  '/CanonicalMuseumExhibits.tsx',
  '/MuseumSceneMedia.tsx',
  '/PlatoSupplementalExhibits.tsx',
  '/SuccessorGallerySupplementalExhibits.tsx',
]) {
  assert(
    !permanentStructureHasModule(forbidden),
    `Permanent Museum structure statically imports resident media module ${forbidden}`,
  );
}

const {
  ANALYTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  ANALYTIC_SUPPLEMENTAL_EXHIBITS,
  BUDDHIST_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  BUDDHIST_SUPPLEMENTAL_EXHIBITS,
  CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBITS,
  CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBITS,
  EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  EAST_ASIAN_SUPPLEMENTAL_EXHIBITS,
  ISLAMIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  ISLAMIC_SUPPLEMENTAL_EXHIBITS,
  JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  JEWISH_SUPPLEMENTAL_EXHIBITS,
  LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBITS,
  HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBITS,
  LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBITS,
  RATIONALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  RATIONALISM_SUPPLEMENTAL_EXHIBITS,
  EMPIRICISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  EMPIRICISM_SUPPLEMENTAL_EXHIBITS,
  ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  ENLIGHTENMENT_SUPPLEMENTAL_EXHIBITS,
  UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBITS,
  FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBITS,
  GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBITS,
  PRAGMATISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  PRAGMATISM_SUPPLEMENTAL_EXHIBITS,
  CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBITS,
  MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBITS,
  FEMINIST_PHILOSOPHIES_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  FEMINIST_PHILOSOPHIES_SUPPLEMENTAL_EXHIBITS,
  COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBITS,
  JUSTICE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  JUSTICE_SUPPLEMENTAL_EXHIBITS,
  CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS,
  CORE_QUESTIONS_FORUM_SUPPLEMENTAL_EXHIBITS,
  MUSEUM_ASSETS,
  MUSEUM_HALLS,
  MUSEUM_FRAME_RAIL_FRONT_Z,
  MUSEUM_SCENE_IMAGE_FACING,
  MUSEUM_SCENE_IMAGE_FILTERING,
  MUSEUM_SCENE_IMAGE_PLANE_Z,
  MUSEUM_SCENE_MEDIA_LOADING_COLOR,
  MUSEUM_SCENE_MEDIA_MATERIAL_MODE,
  MUSEUM_LEGACY_STANDALONE_REPLACEMENT_ASSET_IDS,
  MUSEUM_LEGACY_RETAINED_TEXT_DOMINANT_OR_SINGLE_BOOK_ASSET_IDS,
  MUSEUM_LEGACY_VISUALLY_RICH_TEXTUAL_MEDIA_ASSET_IDS,
  MUSEUM_MAXIMUM_TEXT_DOMINANT_OR_SINGLE_BOOK_PER_ROOM,
  PLATO_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  PLATO_SUPPLEMENTAL_EXHIBITS,
  GALLERY_01_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  GALLERY_01_SUPPLEMENTAL_EXHIBITS,
  PHENOMENOLOGY_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  PHENOMENOLOGY_SUPPLEMENTAL_EXHIBITS,
  RENAISSANCE_SUPPLEMENTAL_EXHIBIT_LAYOUTS,
  RENAISSANCE_SUPPLEMENTAL_EXHIBITS,
  museumAssetUrl,
} = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`);

const ACTIVE_HALL_IDS = [
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
  'feminist-philosophies',
  'colonialism-race-liberation',
];
const MANAGED_HALL_FOLDERS = [
  'analytic-traditions',
  'renaissance-reason-revolution',
  'modernity-freedom-critique',
  'logic-language-science',
  'ethics-justice-political-life',
  'mind-consciousness-self',
  'core-questions-forum',
  'renaissance-humanism-new-method',
  'justice-democratic-reason',
  'phenomenology-existence-embodiment',
  'classical-south-asian-worlds',
  'buddhist-philosophies',
  'classical-chinese-traditions',
  'islamic-philosophical-worlds',
  'east-asian-continuities',
  'jewish-philosophy',
];
const NEW_CANONICAL_ASSET_IDS = [
  'jiddu-krishnamurti-bain-portrait',
  'jiddu-krishnamurti-besant-1927',
  'francis-bacon-portrait-1617',
  'ficino-nga-medal-1499',
  'galileo-sustermans-portrait-1636',
  'alfred-north-whitehead-portrait-1923',
  'martha-nussbaum-portrait-2010',
  'analytic-founders-collage',
  'moore-portrait-1914',
  'wittgenstein-naehr-1930',
  'anscombe-portrait-interpretive',
  'political-philosophy-good-government',
  'political-authority-interpretive',
  'march-washington-leaders-1963',
  'arendt-human-condition-interpretive',
  'eichmann-trial-1961',
  'rawls-original-position-interpretive',
  'nozick-entitlement-interpretive',
  'nussbaum-capabilities-interpretive',
  'ada-signing-1990',
  'amartya-sen-pmo-2005',
  'glarus-landsgemeinde-2009',
  'metaphysics-reality-layers-interpretive',
  'ontology-being-process-interpretive',
  'epistemology-evidence-lens-interpretive',
  'philosophy-mind-subjective-objective-interpretive',
  'logic-hamilton-euler-diagrams-1874',
  'language-rosetta-stone-1922',
  'science-air-pump-wright-1768',
  'aesthetics-hokusai-great-wave',
  'philosophy-religion-plural-inquiry-interpretive',
  'south-many-schools-interpretive',
  'jain-lokapurusha-cosmology',
  'mahavira-chandigarh-bust',
  'kanada-vaisesika-sutra-1793',
  'vedanta-telugu-manuscript',
  'shankara-ravi-varma',
  'ramanuja-statue-cc0',
  'madhva-pajaka-vigraha',
  'south-sarva-darsana-1908',
  'south-upanishad-sama-veda-manuscript',
  'mahavira-kalpasutra-birth',
  'kanada-atomic-theory-illustration',
  'vaiseshika-two-pramana',
  'samkhya-yoga-three-pramana',
  'shankara-aitareya-bhasya-1593',
  'madhva-udupi-krishna-matha',
  'buddhist-wheel-life-dazu',
  'buddha-gandhara-meditating',
  'nagarjuna-sichuan-thangka',
  'buddhist-monastic-debate',
  'dignaga-teaching-logic-relief',
  'dharmakirti-cleveland-silver',
  'buddhist-gandhara-birchbark',
  'buddhist-prajnaparamita-walters',
  'buddhist-dependent-arising-wheel',
  'vasubandhu-mere-ideation',
  'buddhist-xuanzang-statue',
  'buddhist-tibetan-pecha',
  'buddhist-diamond-sutra-868',
];
const ORIGINAL_INTERPRETIVE_ASSET_IDS = new Set([
  'plato-cave-interpretive-illustration',
  'levinas-totality-infinity-2002',
  'phenomenology-intentionality-interpretive',
  'heidegger-being-time-interpretive',
  'merleau-perception-interpretive',
  'existentialism-situated-freedom-interpretive',
  'sartre-bad-faith-look-interpretive',
  'moore-open-question-interpretive',
  'wittgenstein-language-games-interpretive',
  'quine-web-belief-interpretive',
  'anscombe-intention-interpretive',
  'anscombe-portrait-interpretive',
  'political-authority-interpretive',
  'arendt-human-condition-interpretive',
  'rawls-original-position-interpretive',
  'nozick-entitlement-interpretive',
  'nussbaum-capabilities-interpretive',
  'metaphysics-reality-layers-interpretive',
  'ontology-being-process-interpretive',
  'epistemology-evidence-lens-interpretive',
  'philosophy-mind-subjective-objective-interpretive',
  'philosophy-religion-plural-inquiry-interpretive',
  'south-many-schools-interpretive',
]);
const FORUM_FIELD_ASSET_IDS = [
  'metaphysics-reality-layers-interpretive',
  'ontology-being-process-interpretive',
  'epistemology-evidence-lens-interpretive',
  'philosophy-mind-subjective-objective-interpretive',
  'logic-hamilton-euler-diagrams-1874',
  'language-rosetta-stone-1922',
  'science-air-pump-wright-1768',
  'aesthetics-hokusai-great-wave',
  'philosophy-religion-plural-inquiry-interpretive',
];
const MEDITERRANEAN_ASSET_IDS = [
  'ancient-greek-colonization-map',
  'thales-promptuarii-portrait',
  'anaximander-world-map',
  'anaximenes-bnf-portrait',
  'pythagoras-ratios-raphael',
  'philolaus-musical-pipes',
  'parmenides-raphael-traditional',
  'zeno-elea-rijksmuseum-print',
  'leucippus-giordano',
  'democritus-velazquez',
  'heraclitus-va-bust',
  'empedocles-met-print',
  'anaxagoras-ribera',
  'protagoras-ribera',
  'prodicus-choice-of-hercules',
  'hippias-greek-strigil',
  'gorgias-ortolani',
  'platonism-academy-mosaic',
  'aristotelianism-walters-teaching',
  'socrates-trial-interpretive',
  'greek-philosophy-reception-interpretive',
  'miletus-ionian-coast-interpretive',
  'plato-cave-interpretive-illustration',
  'plato-republic-justice-ideal-city',
  'plato-republic-parisinus-1807',
];
const TRUSTED_EXTERNAL_SOURCE_LOCKS = new Map([
  ['wang-yangming-letters-zheng', {
    sourcePageUrl: 'https://artmuseum.princeton.edu/art/collections/objects/32340',
    sourceImageUrl: 'https://media.artmuseum.princeton.edu/iiif/3/collection/PUAMSTU2016_38492/full/max/0/default.jpg',
    selectedThumbnailUrl: 'https://media.artmuseum.princeton.edu/iiif/3/collection/PUAMSTU2016_38492/full/1280,/0/default.jpg',
  }],
  ['east-daoist-ritual-robe', {
    sourcePageUrl: 'https://www.metmuseum.org/art/collection/search/69669',
    sourceImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/69669/2467731/main-image',
    selectedThumbnailUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/69669/2467731/main-image',
  }],
  ['east-water-land-star-deities', {
    sourcePageUrl: 'https://www.metmuseum.org/art/collection/search/44698',
    sourceImageUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/44698/1298649/main-image',
    selectedThumbnailUrl: 'https://collectionapi.metmuseum.org/api/collection/v1/iiif/44698/1298649/main-image',
  }],
  ['saadia-baqashah-geniza', {
    sourcePageUrl: 'https://openn.library.upenn.edu/Data/0002/html/h221.html',
    sourceImageUrl: 'https://openn.library.upenn.edu/Data/0002/h221/data/web/4589_0000_web.jpg',
    selectedThumbnailUrl: 'https://openn.library.upenn.edu/Data/0002/h221/data/web/4589_0000_web.jpg',
  }],
  ['judah-halevi-divan-geniza', {
    sourcePageUrl: 'https://openn.library.upenn.edu/Data/0002/html/h314.html',
    sourceImageUrl: 'https://openn.library.upenn.edu/Data/0002/h314/data/web/4681_0000_web.jpg',
    selectedThumbnailUrl: 'https://openn.library.upenn.edu/Data/0002/h314/data/web/4681_0000_web.jpg',
  }],
  ['saadia-beliefs-landauer', {
    sourcePageUrl: 'https://archive.org/details/kitbalamnt00saaduoft',
    sourceImageUrl: 'https://archive.org/download/kitbalamnt00saaduoft/kitbalamnt00saaduoft.pdf',
    selectedThumbnailUrl: 'https://archive.org/download/kitbalamnt00saaduoft/page/n6.jpg',
  }],
  ['rationalism-conway-principia', {
    sourcePageUrl: 'https://books.google.com/books?id=y6hbDBQqTiQC',
    sourceImageUrl: 'https://books.google.com/books/content?id=y6hbDBQqTiQC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api',
    selectedThumbnailUrl: 'https://books.google.com/books/content?id=y6hbDBQqTiQC&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api',
  }],
  ['enlightenment-astell-serious-proposal-1694', {
    sourcePageUrl: 'https://projectvox.org/astell-1666-1731/attachment/first-edition-of-a-serious-proposal-to-the-ladies-ed/',
    sourceImageUrl: 'https://projectvox.org/wp-content/uploads/2017/03/First-edition-of-A-serious-proposal-to-the-ladies-ed.jpg',
    selectedThumbnailUrl: 'https://projectvox.org/wp-content/uploads/2017/03/First-edition-of-A-serious-proposal-to-the-ladies-ed.jpg',
  }],
]);
const TRUSTED_EXTERNAL_OBJECT_PAGES = new Map([
  ['saadia-beliefs-landauer', 'https://archive.org/details/kitbalamnt00saaduoft'],
  ['maimonides-mishneh-torah', 'https://www.loc.gov/item/2021667526/'],
]);
const manifestAssets = modernManifest?.assets ?? {};
const mediterraneanManifestAssets = mediterraneanManifest?.assets ?? {};
const successorManifestAssets = successorManifest?.assets ?? {};
const galleries13And16ManifestAssets = galleries13And16Manifest?.assets ?? {};
const gallery17ManifestAssets = gallery17Manifest?.assets ?? {};
const gallery18ManifestAssets = gallery18Manifest?.assets ?? {};
const galleries20And21ManifestAssets = galleries20And21Manifest?.assets ?? {};
const galleries19And22ManifestAssets = galleries19And22Manifest?.assets ?? {};
const galleries23And24ManifestAssets = galleries23And24Manifest?.assets ?? {};
const gallery26ManifestAssets = gallery26Manifest?.assets ?? {};
const gallery25ManifestAssets = gallery25Manifest?.assets ?? {};
const assetById = new Map(MUSEUM_ASSETS.map((asset) => [asset.id, asset]));
const liveExhibits = MUSEUM_HALLS.flatMap((hall) => hall.exhibits.map((exhibit) => ({hall, exhibit})));
const canonicalReferencedIds = liveExhibits.flatMap(({exhibit}) => [
  exhibit.principalAssetId,
  ...(exhibit.supportingAssetIds ?? []),
].filter(Boolean));
const platoSupplementalReferencedIds = PLATO_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const gallery01SupplementalReferencedIds = GALLERY_01_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const renaissanceSupplementalReferencedIds = RENAISSANCE_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const phenomenologySupplementalReferencedIds = PHENOMENOLOGY_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const analyticSupplementalReferencedIds = ANALYTIC_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const justiceSupplementalReferencedIds = JUSTICE_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const coreQuestionsForumSupplementalReferencedIds = CORE_QUESTIONS_FORUM_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const classicalSouthAsianSupplementalReferencedIds = CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const buddhistSupplementalReferencedIds = BUDDHIST_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const classicalChineseSupplementalReferencedIds = CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const islamicSupplementalReferencedIds = ISLAMIC_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const eastAsianSupplementalReferencedIds = EAST_ASIAN_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const jewishSupplementalReferencedIds = JEWISH_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const latinScholasticSupplementalReferencedIds = LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const hellenisticRomanSupplementalReferencedIds = HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const lateAntiquitySupplementalReferencedIds = LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const rationalismSupplementalReferencedIds = RATIONALISM_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const empiricismSupplementalReferencedIds = EMPIRICISM_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const enlightenmentSupplementalReferencedIds = ENLIGHTENMENT_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const utilityLibertyCapitalSupplementalReferencedIds = UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const faithPessimismValueSupplementalReferencedIds = FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const germanIdealismSupplementalReferencedIds = GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const pragmatismSupplementalReferencedIds = PRAGMATISM_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const critiquePowerDeconstructionSupplementalReferencedIds =
  CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const moralLifePracticalReasonSupplementalReferencedIds =
  MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const feministPhilosophiesSupplementalReferencedIds =
  FEMINIST_PHILOSOPHIES_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const colonialismRaceLiberationSupplementalReferencedIds =
  COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const supplementalReferencedIds = [
  ...gallery01SupplementalReferencedIds,
  ...renaissanceSupplementalReferencedIds,
  ...phenomenologySupplementalReferencedIds,
  ...analyticSupplementalReferencedIds,
  ...justiceSupplementalReferencedIds,
  ...coreQuestionsForumSupplementalReferencedIds,
  ...classicalSouthAsianSupplementalReferencedIds,
  ...buddhistSupplementalReferencedIds,
  ...classicalChineseSupplementalReferencedIds,
  ...islamicSupplementalReferencedIds,
  ...eastAsianSupplementalReferencedIds,
  ...jewishSupplementalReferencedIds,
  ...latinScholasticSupplementalReferencedIds,
  ...hellenisticRomanSupplementalReferencedIds,
  ...lateAntiquitySupplementalReferencedIds,
  ...rationalismSupplementalReferencedIds,
  ...empiricismSupplementalReferencedIds,
  ...enlightenmentSupplementalReferencedIds,
  ...utilityLibertyCapitalSupplementalReferencedIds,
  ...faithPessimismValueSupplementalReferencedIds,
  ...germanIdealismSupplementalReferencedIds,
  ...pragmatismSupplementalReferencedIds,
  ...critiquePowerDeconstructionSupplementalReferencedIds,
  ...moralLifePracticalReasonSupplementalReferencedIds,
  ...feministPhilosophiesSupplementalReferencedIds,
  ...colonialismRaceLiberationSupplementalReferencedIds,
];
const referencedIds = [...canonicalReferencedIds, ...supplementalReferencedIds];
const physicalSupplementalGroups = [
  {galleryId: 'mediterranean-beginnings-classical', records: GALLERY_01_SUPPLEMENTAL_EXHIBITS, layouts: GALLERY_01_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'renaissance-humanism-new-method', records: RENAISSANCE_SUPPLEMENTAL_EXHIBITS, layouts: RENAISSANCE_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'phenomenology-existence-embodiment', records: PHENOMENOLOGY_SUPPLEMENTAL_EXHIBITS, layouts: PHENOMENOLOGY_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'analytic-traditions', records: ANALYTIC_SUPPLEMENTAL_EXHIBITS, layouts: ANALYTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'justice-democratic-reason', records: JUSTICE_SUPPLEMENTAL_EXHIBITS, layouts: JUSTICE_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'core-questions-forum', records: CORE_QUESTIONS_FORUM_SUPPLEMENTAL_EXHIBITS, layouts: CORE_QUESTIONS_FORUM_SUPPLEMENTAL_LAYOUTS},
  {galleryId: 'classical-south-asian-worlds', records: CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBITS, layouts: CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'buddhist-philosophies', records: BUDDHIST_SUPPLEMENTAL_EXHIBITS, layouts: BUDDHIST_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'classical-chinese-traditions', records: CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBITS, layouts: CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'islamic-philosophical-worlds', records: ISLAMIC_SUPPLEMENTAL_EXHIBITS, layouts: ISLAMIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'east-asian-continuities', records: EAST_ASIAN_SUPPLEMENTAL_EXHIBITS, layouts: EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'jewish-philosophy', records: JEWISH_SUPPLEMENTAL_EXHIBITS, layouts: JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'latin-christian-scholastic', records: LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBITS, layouts: LATIN_SCHOLASTIC_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'hellenistic-roman-ways', records: HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBITS, layouts: HELLENISTIC_ROMAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'late-antiquity-inheritance', records: LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBITS, layouts: LATE_ANTIQUITY_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'rationalism-mind-nature-system', records: RATIONALISM_SUPPLEMENTAL_EXHIBITS, layouts: RATIONALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'empiricism-science-political-order', records: EMPIRICISM_SUPPLEMENTAL_EXHIBITS, layouts: EMPIRICISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'enlightenment-revolution-kant', records: ENLIGHTENMENT_SUPPLEMENTAL_EXHIBITS, layouts: ENLIGHTENMENT_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'utility-liberty-history-capital', records: UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBITS, layouts: UTILITY_LIBERTY_CAPITAL_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'faith-pessimism-life-value', records: FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBITS, layouts: FAITH_PESSIMISM_VALUE_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'german-idealism-afterlives', records: GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBITS, layouts: GERMAN_IDEALISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'pragmatism-democratic-inquiry', records: PRAGMATISM_SUPPLEMENTAL_EXHIBITS, layouts: PRAGMATISM_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'critique-power-deconstruction', records: CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBITS, layouts: CRITIQUE_POWER_DECONSTRUCTION_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'moral-life-practical-reason', records: MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBITS, layouts: MORAL_LIFE_PRACTICAL_REASON_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'feminist-philosophies', records: FEMINIST_PHILOSOPHIES_SUPPLEMENTAL_EXHIBITS, layouts: FEMINIST_PHILOSOPHIES_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
  {galleryId: 'colonialism-race-liberation', records: COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBITS, layouts: COLONIALISM_RACE_LIBERATION_SUPPLEMENTAL_EXHIBIT_LAYOUTS},
];
const physicalSupplementalAssetIds = physicalSupplementalGroups.flatMap(({layouts}) => layouts.map(({assetId}) => assetId));
const physicalInstallationAssetIds = [...canonicalReferencedIds, ...physicalSupplementalAssetIds];

const LEGACY_IMAGE_DIVERSITY_HALL_IDS = ACTIVE_HALL_IDS.slice(0, 16);
const TEXT_OR_SINGLE_BOOK_CANDIDATE_MEDIA_KINDS = new Set([
  'book-page',
  'document',
  'manuscript',
  'papyrus',
]);
const legacyStandaloneReplacementIds = new Set(MUSEUM_LEGACY_STANDALONE_REPLACEMENT_ASSET_IDS);
const legacyRetainedTextDominantIds = new Set(
  MUSEUM_LEGACY_RETAINED_TEXT_DOMINANT_OR_SINGLE_BOOK_ASSET_IDS,
);
const legacyVisuallyRichTextualMediaIds = new Set(
  MUSEUM_LEGACY_VISUALLY_RICH_TEXTUAL_MEDIA_ASSET_IDS,
);
const legacyPhysicalPlacements = LEGACY_IMAGE_DIVERSITY_HALL_IDS.flatMap((hallId) => {
  const hall = MUSEUM_HALLS.find(({id}) => id === hallId);
  const supplementalGroup = physicalSupplementalGroups.find(({galleryId}) => galleryId === hallId);
  assert(hall && supplementalGroup, `${hallId} is absent from the legacy image-diversity inventory`);
  return [
    ...hall.exhibits.flatMap(({id: exhibitId, roomId, principalAssetId, supportingAssetIds}) =>
      [principalAssetId, ...(supportingAssetIds ?? [])]
        .filter(Boolean)
        .map((assetId, assetIndex) => ({
          hallId,
          roomId,
          exhibitId,
          assetId,
          placementKind: assetIndex === 0 ? 'primary-principal' : 'primary-supporting',
        }))),
    ...supplementalGroup.layouts.map(({id: exhibitId, spatialCellId: roomId, assetId}) => ({
      hallId,
      roomId,
      exhibitId,
      assetId,
      placementKind: 'supplemental',
    })),
  ];
});

if (process.argv.includes('--report-image-diversity-candidates')) {
  const requestedHall = process.argv
    .find((argument) => argument.startsWith('--image-diversity-hall='))
    ?.split('=', 2)[1];
  const candidatesByRoom = new Map();
  for (const placement of legacyPhysicalPlacements) {
    if (requestedHall && placement.hallId !== requestedHall) continue;
    const asset = assetById.get(placement.assetId);
    assert(asset, `${placement.assetId} is absent from the Museum asset registry`);
    if (
      asset.visualCharacter !== 'text-dominant'
      && !TEXT_OR_SINGLE_BOOK_CANDIDATE_MEDIA_KINDS.has(asset.mediaKind)
    ) continue;
    const key = `${placement.hallId}/${placement.roomId}`;
    if (!candidatesByRoom.has(key)) candidatesByRoom.set(key, []);
    candidatesByRoom.get(key).push({
      id: asset.id,
      mediaKind: asset.mediaKind,
      title: asset.title,
      alt: asset.alt,
      placementKind: placement.placementKind,
    });
  }
  console.log('\nGallery 1–16 text/page/single-book candidate inventory:');
  for (const [room, assets] of [...candidatesByRoom].sort(([first], [second]) => first.localeCompare(second))) {
    console.log(`\n${room} · ${assets.length} candidate${assets.length === 1 ? '' : 's'}`);
    for (const asset of assets) {
      const placement = legacyPhysicalPlacements.find(({assetId}) => assetId === asset.id);
      console.log(`- ${asset.id} [${asset.mediaKind}] ${asset.title} · ${placement?.exhibitId ?? 'unknown exhibit'} · ${asset.placementKind}`);
      console.log(`  ${asset.alt}`);
    }
  }
  process.exit(0);
}

if (process.argv.includes('--report-unplaced-assets')) {
  const placedIds = new Set(physicalInstallationAssetIds);
  const unplacedAssets = MUSEUM_ASSETS.filter(({id}) => !placedIds.has(id));
  console.log(`\nUnplaced registered assets · ${unplacedAssets.length}`);
  for (const asset of unplacedAssets) {
    console.log(`- ${asset.id} [${asset.mediaKind}] ${asset.title}`);
    console.log(`  ${asset.alt}`);
  }
  process.exit(0);
}

let checks = 0;
const check = (name, assertion) => {
  assertion();
  checks += 1;
  console.log(`✓ ${name}`);
};
const unique = (values) => new Set(values).size === values.length;
const isHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};
const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
const toPublicPath = (path) => relative(publicRoot, path).split(sep).join('/');

const exactCasePath = (relativePath) => {
  let current = publicRoot;
  for (const part of relativePath.split('/')) {
    assert(part && part !== '.' && part !== '..', `unsafe path segment in ${relativePath}`);
    const match = readdirSync(current).find((entryName) => entryName === part);
    assert(match, `${relativePath} is missing or has incorrect filename casing at ${part}`);
    current = resolve(current, match);
  }
  assert(current.startsWith(`${publicRoot}${sep}`), `${relativePath} escapes public/`);
  return current;
};

const walkFiles = (directory) => readdirSync(directory, {withFileTypes: true}).flatMap((directoryEntry) => {
  const path = resolve(directory, directoryEntry.name);
  return directoryEntry.isDirectory() ? walkFiles(path) : [path];
});

const readUInt24LE = (bytes, offset) => bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16);
const webpDimensions = (path) => {
  const bytes = readFileSync(path);
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', `${path} is not a RIFF file`);
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', `${path} is not WebP`);
  let offset = 12;
  while (offset + 8 <= bytes.length) {
    const kind = bytes.toString('ascii', offset, offset + 4);
    const length = bytes.readUInt32LE(offset + 4);
    const data = offset + 8;
    if (kind === 'VP8X') return {width: 1 + readUInt24LE(bytes, data + 4), height: 1 + readUInt24LE(bytes, data + 7)};
    if (kind === 'VP8 ') return {width: bytes.readUInt16LE(data + 6) & 0x3fff, height: bytes.readUInt16LE(data + 8) & 0x3fff};
    if (kind === 'VP8L') {
      assert.equal(bytes[data], 0x2f, `${path} has an invalid VP8L signature`);
      const bits = bytes.readUInt32LE(data + 1);
      return {width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff)};
    }
    offset = data + length + (length % 2);
  }
  assert.fail(`Unable to determine WebP dimensions for ${path}`);
};

check('Galleries 1–16 classify every textual-media candidate and cap plain pages or lone books at one per room', () => {
  const replacementIds = [...legacyStandaloneReplacementIds];
  const retainedIds = [...legacyRetainedTextDominantIds];
  const visuallyRichIds = [...legacyVisuallyRichTextualMediaIds];
  assert.equal(legacyImageDiversityProgram.version, 2);
  assert.equal(MUSEUM_MAXIMUM_TEXT_DOMINANT_OR_SINGLE_BOOK_PER_ROOM, 1);
  assert.equal(replacementIds.length, 52, 'the reviewed Gallery 1–16 replacement program changed size');
  assert.equal(new Set(replacementIds).size, replacementIds.length, 'the standalone-replacement list repeats an asset');
  assert.equal(new Set(retainedIds).size, retainedIds.length, 'the retained text-dominant list repeats an asset');
  assert.equal(new Set(visuallyRichIds).size, visuallyRichIds.length, 'the visually rich textual-media list repeats an asset');
  assert.equal(
    new Set([...replacementIds, ...retainedIds, ...visuallyRichIds]).size,
    replacementIds.length + retainedIds.length + visuallyRichIds.length,
    'the legacy visual-character classifications overlap',
  );

  const candidatePlacements = legacyPhysicalPlacements.filter(({assetId}) => {
    const asset = assetById.get(assetId);
    assert(asset, `${assetId} is absent from the Museum asset registry`);
    return TEXT_OR_SINGLE_BOOK_CANDIDATE_MEDIA_KINDS.has(asset.mediaKind);
  });
  const candidateIds = new Set(candidatePlacements.map(({assetId}) => assetId));
  const classifiedTextualIds = new Set([...retainedIds, ...visuallyRichIds]);
  assert.deepEqual(
    [...candidateIds].filter((id) => !classifiedTextualIds.has(id)).sort(),
    [],
    'Gallery 1–16 contains unreviewed manuscript, document, papyrus, or book-page imagery',
  );
  assert.deepEqual(
    [...classifiedTextualIds].filter((id) => !candidateIds.has(id)).sort(),
    [],
    'the Gallery 1–16 visual-character inventory contains a stale or non-physical asset',
  );
  assert.deepEqual(
    replacementIds.filter((id) => !legacyPhysicalPlacements.some(({assetId}) => assetId === id)).sort(),
    [],
    'the standalone replacement inventory contains an uninstalled asset',
  );

  const retainedByRoom = new Map();
  for (const placement of candidatePlacements) {
    if (!legacyRetainedTextDominantIds.has(placement.assetId)) continue;
    const key = `${placement.hallId}/${placement.roomId}`;
    if (!retainedByRoom.has(key)) retainedByRoom.set(key, []);
    retainedByRoom.get(key).push(placement.assetId);
  }
  for (const [room, ids] of retainedByRoom) {
    const approvedMaximum = room === 'analytic-traditions/analytic-wittgenstein'
      ? 2
      : MUSEUM_MAXIMUM_TEXT_DOMINANT_OR_SINGLE_BOOK_PER_ROOM;
    assert(
      ids.length <= approvedMaximum,
      `${room} exceeds its approved plain-page/lone-book ceiling: ${ids.join(', ')}`,
    );
  }

  const legacyLocks = {
    ...manifestAssets,
    ...successorManifestAssets,
    ...galleries13And16ManifestAssets,
  };
  const replacementSourcePages = [];
  for (const id of replacementIds) {
    const asset = assetById.get(id);
    const lock = legacyLocks[id];
    assert(asset && lock, `${id} lacks its runtime record or source lock`);
    assert(
      ['portrait-or-figure', 'artwork-or-social-scene', 'place-or-architecture', 'material-object', 'map-or-diagram']
        .includes(asset.visualCharacter),
      `${id} is not classified as a standalone visual`,
    );
    assert(
      !TEXT_OR_SINGLE_BOOK_CANDIDATE_MEDIA_KINDS.has(asset.mediaKind),
      `${id} still presents a textual medium after replacement`,
    );
    assert.doesNotMatch(
      `${asset.alt} ${asset.caption} ${asset.historicalNote} ${asset.derivativeNotice ?? ''}`,
      /contextual composite|subordinate (?:source |authenticated-source )?inset|visual study of/i,
      `${id} retains rejected composite language`,
    );
    assert.equal(lock.visualCharacter, asset.visualCharacter, `${id} source lock visual character drifted`);
    assert.equal(lock.textDominantOrSingleBook, false, `${id} remains flagged as a plain page or lone book`);
    assert.equal(lock.standaloneReplacementVersion, 1, `${id} standalone replacement version drifted`);
    assert.equal(lock.sourcePageUrl, asset.sourcePageUrl, `${id} source lock differs from runtime provenance`);
    assert.deepEqual(
      lock.sourceCropBox ?? null,
      legacyImageDiversityProgram.standaloneReplacements[id].cropBox ?? null,
      `${id} source crop drifted`,
    );
    if (lock.sourceCropBox) {
      assert.match(asset.derivativeNotice ?? '', /cropped.+resized.+converted.+WebP/i, `${id} does not disclose its source crop`);
    }
    if (lock.sourceKind === 'owner-approved-original-illustration') {
      assert.equal(id, 'levinas-totality-infinity-2002', `${id} is an unreviewed original illustration`);
      assert.equal(new URL(lock.sourcePageUrl).hostname, 'github.com', `${id} original source page is not on GitHub`);
      assert.equal(new URL(lock.sourceImageUrl).hostname, 'raw.githubusercontent.com', `${id} original source file is not raw GitHub content`);
      assert.match(asset.historicalNote, /contemporary interpretive/i, `${id} does not disclose its contemporary interpretation`);
    } else {
      assert.equal(new URL(lock.sourcePageUrl).hostname, 'commons.wikimedia.org', `${id} source is not on Commons`);
      assert(new URL(lock.sourcePageUrl).pathname.startsWith('/wiki/File:'), `${id} source is not an exact File page`);
    }
    for (const rejectedField of [
      'contextualCompositeVersion',
      'contextualCompositeMotif',
      'contextualCompositeSourceInset',
    ]) {
      assert(!(rejectedField in lock), `${id} retains rejected source-lock field ${rejectedField}`);
    }
    replacementSourcePages.push(lock.sourcePageUrl);
  }
  assert.equal(new Set(replacementSourcePages).size, replacementSourcePages.length, 'standalone replacements reuse a source page');
  for (const id of retainedIds) {
    assert.equal(assetById.get(id)?.visualCharacter, 'text-dominant', `${id} is not explicitly marked as the retained room exception`);
  }
  assert.match(legacyImageDiversityPreparationSource, /EXPECTED_REPLACEMENT_COUNT\s*=\s*52/);
  assert.match(legacyImageDiversityPreparationSource, /standaloneReplacementVersion/);
  assert.match(legacyImageDiversityPreparationSource, /no compositing, framing/);
  assert.match(legacyImageDiversityPreparationSource, /--refresh-locks/);
});

check('the canonical twenty-six expose 192 primaries, 411 supplementals, and 603 interpreted stops with resolvable local media', () => {
  assert.deepEqual(MUSEUM_HALLS.map(({id}) => id), ACTIVE_HALL_IDS);
  assert.equal(MUSEUM_HALLS.length, 26);
  assert.equal(liveExhibits.length, 192);
  assert.equal(supplementalReferencedIds.length, 411);
  assert.equal(liveExhibits.length + supplementalReferencedIds.length, 603);
  assert.equal(referencedIds.length, 619);
  assert(canonicalReferencedIds.length > 0, 'the live primary program references no local media');
  for (const {hall, exhibit} of liveExhibits) {
    assert(Array.isArray(exhibit.supportingAssetIds), `${hall.id}/${exhibit.id} has no supporting-asset array`);
    for (const id of [exhibit.principalAssetId, ...exhibit.supportingAssetIds].filter(Boolean)) {
      const asset = assetById.get(id);
      assert(asset, `${hall.id}/${exhibit.id} references missing asset ${id}`);
      assert.equal(asset.entityKind, exhibit.entityKind, `${id} entity kind differs from ${exhibit.id}`);
      assert.equal(asset.entityId, exhibit.entityId, `${id} is not provenance-linked to ${exhibit.id}`);
    }
  }
  const krishnamurti = MUSEUM_HALLS.find(({id}) => id === 'core-questions-forum')?.exhibits.find(({id}) => id === 'jiddu-krishnamurti');
  assert.equal(krishnamurti?.principalAssetId, 'jiddu-krishnamurti-bain-portrait');
  assert.deepEqual(krishnamurti?.supportingAssetIds, ['jiddu-krishnamurti-besant-1927']);
});

check('the two Plato work exhibits stay supplemental while resolving distinct local media', () => {
  assert.equal(PLATO_SUPPLEMENTAL_EXHIBITS.length, 2);
  assert.deepEqual(PLATO_SUPPLEMENTAL_EXHIBITS.map(({id}) => id).sort(), ['plato-cave-book-vii', 'plato-republic']);
  assert.deepEqual(platoSupplementalReferencedIds.sort(), ['plato-cave-interpretive-illustration', 'plato-republic-justice-ideal-city']);
  for (const exhibit of PLATO_SUPPLEMENTAL_EXHIBITS) {
    const asset = assetById.get(exhibit.assetId);
    assert(asset, `${exhibit.id} references missing asset ${exhibit.assetId}`);
    assert.equal(asset.entityKind, 'philosopher', `${exhibit.assetId} must remain attached to Plato`);
    assert.equal(asset.entityId, 'plato', `${exhibit.assetId} must remain attached to Plato`);
  }
});

check('Gallery 02 work, discovery, and context exhibits resolve thirteen distinct live media records', () => {
  assert.equal(RENAISSANCE_SUPPLEMENTAL_EXHIBITS.length, 13);
  assert.equal(new Set(renaissanceSupplementalReferencedIds).size, 13);
  for (const exhibit of RENAISSANCE_SUPPLEMENTAL_EXHIBITS) {
    assert(assetById.has(exhibit.assetId), `${exhibit.id} references missing asset ${exhibit.assetId}`);
    assert(assetById.has(exhibit.panelAssetId), `${exhibit.id} panel references missing asset ${exhibit.panelAssetId}`);
  }
});

check('Gallery 03 resolves every interpreted stop through unique, relevant local media', () => {
  assert.equal(PHENOMENOLOGY_SUPPLEMENTAL_EXHIBITS.length, 21);
  assert.equal(new Set(phenomenologySupplementalReferencedIds).size, 21);
  for (const exhibit of PHENOMENOLOGY_SUPPLEMENTAL_EXHIBITS) {
    assert(assetById.has(exhibit.assetId), `${exhibit.id} references missing asset ${exhibit.assetId}`);
    assert(assetById.has(exhibit.panelAssetId), `${exhibit.id} panel references missing asset ${exhibit.panelAssetId}`);
    assert.equal(exhibit.assetId, exhibit.panelAssetId, `${exhibit.id} uses mismatched scene and panel media`);
  }
  const hall = MUSEUM_HALLS.find(({id}) => id === 'phenomenology-existence-embodiment');
  assert(hall, 'Gallery 03 is absent from the canonical program');
  const primaryReferencedIds = hall.exhibits.flatMap(({principalAssetId, supportingAssetIds}) => [
    principalAssetId,
    ...supportingAssetIds,
  ].filter(Boolean));
  assert.equal(primaryReferencedIds.length, 14);
  const galleryReferencedIds = [...primaryReferencedIds, ...phenomenologySupplementalReferencedIds];
  assert.equal(galleryReferencedIds.length, 35);
  assert.equal(new Set(galleryReferencedIds).size, 35, 'Gallery 03 repeats an image across primary or supplemental exhibits');
  assert.equal(new Set(galleryReferencedIds.map((id) => assetById.get(id).sourcePageUrl)).size, 35, 'Gallery 03 repeats an underlying source image');
  assert.equal(new Set(galleryReferencedIds.map((id) => sha256(exactCasePath(assetById.get(id).variants.panel.path)))).size, 35, 'Gallery 03 repeats identical panel bytes');
  assert(!galleryReferencedIds.some((id) => /grave|plaque/.test(id)), 'Gallery 03 still routes through a grave or plaque image');
  const existentialism = hall.exhibits.find(({id}) => id === 'existentialism');
  assert.equal(existentialism?.principalAssetId, 'existentialism-munch-karl-johan', 'Existentialism lost its primary visual');
  const phenomenology = hall.exhibits.find(({id}) => id === 'phenomenology');
  assert.equal(phenomenology?.principalAssetId, 'phenomenology-cezanne-still-life', 'Phenomenology lost its primary visual');
  const requiredTitlePrefixes = new Map([
    ['phenomenology-intentionality', 'Husserl:'],
    ['existentialism-kierkegaard-precursor', 'Kierkegaard:'],
    ['heidegger-being-time', 'Heidegger:'],
    ['merleau-phenomenology-perception', 'Merleau-Ponty:'],
    ['sartre-bad-faith', 'Sartre:'],
    ['sartre-existentialism-humanism', 'Sartre:'],
    ['camus-absurd-revolt', 'Camus:'],
    ['levinas-ethics-before-ontology', 'Levinas:'],
    ['gadamer-truth-method', 'Gadamer:'],
    ['husserl-epoche-reduction', 'Husserl:'],
    ['husserl-time-consciousness', 'Husserl:'],
    ['heidegger-being-with', 'Heidegger:'],
    ['merleau-flesh-reversibility', 'Merleau-Ponty:'],
    ['beauvoir-second-sex', 'Beauvoir:'],
    ['camus-plague-solidarity', 'Camus:'],
    ['fanon-colonial-experience', 'Fanon:'],
    ['levinas-saying-said', 'Levinas:'],
    ['gadamer-art-play-truth', 'Gadamer:'],
  ]);
  for (const [id, prefix] of requiredTitlePrefixes) {
    const exhibit = PHENOMENOLOGY_SUPPLEMENTAL_EXHIBITS.find((candidate) => candidate.id === id);
    assert(exhibit?.displayName.startsWith(prefix), `${id} does not clearly name its philosopher`);
  }
});

check('Gallery 20 resolves every wall image through a unique local asset id', () => {
  assert.equal(ANALYTIC_SUPPLEMENTAL_EXHIBITS.length, 23);
  assert.equal(analyticSupplementalReferencedIds.length, 23);
  assert.equal(new Set(analyticSupplementalReferencedIds).size, 23, 'Gallery 20 repeats a supplemental image asset');
  for (const exhibit of ANALYTIC_SUPPLEMENTAL_EXHIBITS) {
    assert(assetById.has(exhibit.assetId), `${exhibit.id} references missing asset ${exhibit.assetId}`);
    assert(assetById.has(exhibit.panelAssetId), `${exhibit.id} panel references missing asset ${exhibit.panelAssetId}`);
  }
  const hall = MUSEUM_HALLS.find(({id}) => id === 'analytic-traditions');
  assert(hall, 'Gallery 04 is absent from the canonical program');
  const primaryReferencedIds = hall.exhibits.flatMap(({principalAssetId, supportingAssetIds}) => [
    principalAssetId,
    ...supportingAssetIds,
  ].filter(Boolean));
  assert.equal(primaryReferencedIds.length, 10, 'Gallery 04 primary media count changed');
  const galleryReferencedIds = [...primaryReferencedIds, ...analyticSupplementalReferencedIds];
  assert.equal(galleryReferencedIds.length, 33, 'Gallery 20 wall-image count changed');
  assert.equal(new Set(galleryReferencedIds).size, 33, 'Gallery 20 repeats an image asset across primary or supplemental installations');
});

check('Gallery 05 resolves eighteen unique, relevant, attributed wall images', () => {
  assert.equal(JUSTICE_SUPPLEMENTAL_EXHIBITS.length, 13);
  assert.equal(justiceSupplementalReferencedIds.length, 13);
  assert.equal(new Set(justiceSupplementalReferencedIds).size, 13, 'Gallery 05 repeats a supplemental image asset');
  for (const exhibit of JUSTICE_SUPPLEMENTAL_EXHIBITS) {
    assert(assetById.has(exhibit.assetId), `${exhibit.id} references missing asset ${exhibit.assetId}`);
    assert(assetById.has(exhibit.panelAssetId), `${exhibit.id} panel references missing asset ${exhibit.panelAssetId}`);
  }
  const hall = MUSEUM_HALLS.find(({id}) => id === 'justice-democratic-reason');
  assert(hall, 'Gallery 05 is absent from the canonical program');
  const primaryReferencedIds = hall.exhibits.flatMap(({principalAssetId, supportingAssetIds}) => [
    principalAssetId,
    ...supportingAssetIds,
  ].filter(Boolean));
  assert.equal(primaryReferencedIds.length, 5, 'Gallery 05 must give each primary one focused visual');
  assert.equal(hall.exhibits.find(({id}) => id === 'political-philosophy')?.principalAssetId, 'political-philosophy-good-government');
  const galleryReferencedIds = [...primaryReferencedIds, ...justiceSupplementalReferencedIds];
  assert.equal(galleryReferencedIds.length, 18, 'Gallery 05 wall-image count changed');
  assert.equal(new Set(galleryReferencedIds).size, 18, 'Gallery 05 repeats an image asset across primary or supplemental installations');
  assert.equal(
    new Set(galleryReferencedIds.map((id) => assetById.get(id).sourcePageUrl)).size,
    18,
    'Gallery 05 repeats an exact source image page',
  );
  assert.equal(
    new Set(galleryReferencedIds.map((id) => sha256(exactCasePath(assetById.get(id).variants.panel.path)))).size,
    18,
    'Gallery 05 repeats identical panel bytes',
  );
  assert(!galleryReferencedIds.some((id) => /grave|plaque/.test(id)), 'Gallery 05 still routes through a grave or plaque image');
});

check('Gallery 06 gives every primary a unique relevant image and every field anchor a dedicated visual', () => {
  const hall = MUSEUM_HALLS.find(({id}) => id === 'core-questions-forum');
  assert(hall, 'Gallery 06 is absent from the canonical program');
  assert.equal(hall.exhibits.length, 15);
  const principalIds = hall.exhibits.map(({principalAssetId}) => principalAssetId).filter(Boolean);
  assert.equal(principalIds.length, 15, 'Every Gallery 06 primary must have a principal image');
  assert.equal(new Set(principalIds).size, 15, 'Gallery 06 repeats a principal image');
  assert.deepEqual(
    hall.exhibits.filter(({entityKind}) => entityKind === 'branch').map(({principalAssetId}) => principalAssetId),
    FORUM_FIELD_ASSET_IDS,
    'Gallery 06 field anchors drifted from their dedicated visual program',
  );
  for (const id of principalIds) {
    const asset = assetById.get(id);
    assert(asset, `Gallery 06 references missing asset ${id}`);
    assert(asset.attribution.trim().length >= 16, `${id} lacks useful attribution`);
    assert(asset.historicalNote.trim().length >= 40, `${id} lacks an interpretive caveat`);
  }
  assert.equal(
    new Set(principalIds.map((id) => assetById.get(id).sourcePageUrl)).size,
    15,
    'Gallery 06 repeats an exact source image page',
  );
  assert.equal(
    new Set(principalIds.map((id) => sha256(exactCasePath(assetById.get(id).variants.panel.path)))).size,
    15,
    'Gallery 06 repeats identical principal panel bytes',
  );
  assert(!principalIds.some((id) => /grave|plaque/.test(id)), 'Gallery 06 routes a primary through a grave or plaque image');
});

check('Gallery 07 fills thirty wall installations with unique, attributed media', () => {
  assert.equal(CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBITS.length, 21);
  assert.equal(new Set(classicalSouthAsianSupplementalReferencedIds).size, 21, 'Gallery 07 repeats a supplemental image asset');
  const hall = MUSEUM_HALLS.find(({id}) => id === 'classical-south-asian-worlds');
  assert(hall, 'Gallery 07 is absent from the canonical program');
  assert.equal(hall.exhibits.length, 9, 'Gallery 07 primary roster changed');
  const primaryReferencedIds = hall.exhibits.flatMap(({principalAssetId, supportingAssetIds}) => [
    principalAssetId,
    ...supportingAssetIds,
  ].filter(Boolean));
  assert.equal(primaryReferencedIds.length, 9, 'Every Gallery 07 primary must have one focused visual');
  const galleryReferencedIds = [...primaryReferencedIds, ...classicalSouthAsianSupplementalReferencedIds];
  assert.equal(galleryReferencedIds.length, 30, 'Gallery 07 wall-image count changed');
  assert.equal(new Set(galleryReferencedIds).size, 30, 'Gallery 07 repeats an image asset');
  assert.equal(new Set(galleryReferencedIds.map((id) => assetById.get(id).sourcePageUrl)).size, 30, 'Gallery 07 repeats a source page');
  assert.equal(new Set(galleryReferencedIds.map((id) => sha256(exactCasePath(assetById.get(id).variants.panel.path)))).size, 30, 'Gallery 07 repeats identical panel bytes');
  assert(!galleryReferencedIds.some((id) => /grave|plaque/.test(id)), 'Gallery 07 routes through a grave or plaque image');
  for (const exhibit of CLASSICAL_SOUTH_ASIAN_SUPPLEMENTAL_EXHIBITS) {
    assert(assetById.has(exhibit.assetId), `${exhibit.id} references missing asset ${exhibit.assetId}`);
    assert(assetById.has(exhibit.panelAssetId), `${exhibit.id} panel references missing asset ${exhibit.panelAssetId}`);
  }
});

check('Gallery 08 fills thirty wall installations with unique, attributed media', () => {
  assert.equal(BUDDHIST_SUPPLEMENTAL_EXHIBITS.length, 23);
  assert.equal(new Set(buddhistSupplementalReferencedIds).size, 23, 'Gallery 08 repeats a supplemental image asset');
  const hall = MUSEUM_HALLS.find(({id}) => id === 'buddhist-philosophies');
  assert(hall, 'Gallery 08 is absent from the canonical program');
  assert.equal(hall.exhibits.length, 7, 'Gallery 08 primary roster changed');
  const primaryReferencedIds = hall.exhibits.flatMap(({principalAssetId, supportingAssetIds}) => [
    principalAssetId,
    ...supportingAssetIds,
  ].filter(Boolean));
  assert.equal(primaryReferencedIds.length, 7, 'Every Gallery 08 primary must have one focused visual');
  const galleryReferencedIds = [...primaryReferencedIds, ...buddhistSupplementalReferencedIds];
  assert.equal(galleryReferencedIds.length, 30, 'Gallery 08 wall-image count changed');
  assert.equal(new Set(galleryReferencedIds).size, 30, 'Gallery 08 repeats an image asset');
  assert.equal(new Set(galleryReferencedIds.map((id) => assetById.get(id).sourcePageUrl)).size, 30, 'Gallery 08 repeats a source page');
  assert.equal(new Set(galleryReferencedIds.map((id) => sha256(exactCasePath(assetById.get(id).variants.panel.path)))).size, 30, 'Gallery 08 repeats identical panel bytes');
  assert(!galleryReferencedIds.some((id) => /grave|plaque/.test(id)), 'Gallery 08 routes through a grave or plaque image');
  for (const exhibit of BUDDHIST_SUPPLEMENTAL_EXHIBITS) {
    assert(assetById.has(exhibit.assetId), `${exhibit.id} references missing asset ${exhibit.assetId}`);
    assert(assetById.has(exhibit.panelAssetId), `${exhibit.id} panel references missing asset ${exhibit.panelAssetId}`);
  }
});

check('Gallery 09 fills every crossroads room with six unique, attributed installations', () => {
  assert.equal(CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBITS.length, 12);
  assert.equal(new Set(classicalChineseSupplementalReferencedIds).size, 12, 'Gallery 09 repeats a supplemental image asset');
  const hall = MUSEUM_HALLS.find(({id}) => id === 'classical-chinese-traditions');
  assert(hall, 'Gallery 09 is absent from the canonical program');
  assert.equal(hall.exhibits.length, 12, 'Gallery 09 primary roster changed');
  const primaryReferencedIds = hall.exhibits.flatMap(({principalAssetId, supportingAssetIds}) => [
    principalAssetId,
    ...supportingAssetIds,
  ].filter(Boolean));
  assert.equal(primaryReferencedIds.length, 12, 'Every Gallery 09 primary must have one focused visual');
  const galleryReferencedIds = [...primaryReferencedIds, ...classicalChineseSupplementalReferencedIds];
  assert.equal(galleryReferencedIds.length, 24, 'Gallery 09 installation count changed');
  assert.equal(new Set(galleryReferencedIds).size, 24, 'Gallery 09 repeats an image asset');
  assert.equal(new Set(galleryReferencedIds.map((id) => assetById.get(id).sourcePageUrl)).size, 24, 'Gallery 09 repeats a source page');
  assert.equal(new Set(galleryReferencedIds.map((id) => sha256(exactCasePath(assetById.get(id).variants.panel.path)))).size, 24, 'Gallery 09 repeats identical panel bytes');
  assert(!galleryReferencedIds.some((id) => /grave|plaque/.test(id)), 'Gallery 09 routes through a grave or plaque image');
  for (const exhibit of CLASSICAL_CHINESE_SUPPLEMENTAL_EXHIBITS) {
    assert(assetById.has(exhibit.assetId), `${exhibit.id} references missing asset ${exhibit.assetId}`);
    assert(assetById.has(exhibit.panelAssetId), `${exhibit.id} panel references missing asset ${exhibit.panelAssetId}`);
  }
});

check('Gallery 10 fills every sequence room with six unique, attributed installations', () => {
  assert.equal(ISLAMIC_SUPPLEMENTAL_EXHIBITS.length, 21);
  assert.equal(new Set(islamicSupplementalReferencedIds).size, 21, 'Gallery 10 repeats a supplemental image asset');
  const hall = MUSEUM_HALLS.find(({id}) => id === 'islamic-philosophical-worlds');
  assert(hall, 'Gallery 10 is absent from the canonical program');
  assert.equal(hall.exhibits.length, 9, 'Gallery 10 primary roster changed');
  const primaryReferencedIds = hall.exhibits.flatMap(({principalAssetId, supportingAssetIds}) => [
    principalAssetId,
    ...supportingAssetIds,
  ].filter(Boolean));
  assert.equal(primaryReferencedIds.length, 9, 'Every Gallery 10 primary must have one focused visual');
  const galleryReferencedIds = [...primaryReferencedIds, ...islamicSupplementalReferencedIds];
  assert.equal(galleryReferencedIds.length, 30, 'Gallery 10 installation count changed');
  assert.equal(new Set(galleryReferencedIds).size, 30, 'Gallery 10 repeats an image asset');
  assert.equal(new Set(galleryReferencedIds.map((id) => assetById.get(id).sourcePageUrl)).size, 30, 'Gallery 10 repeats a source page');
  assert.equal(new Set(galleryReferencedIds.map((id) => sha256(exactCasePath(assetById.get(id).variants.panel.path)))).size, 30, 'Gallery 10 repeats identical panel bytes');
  assert(!galleryReferencedIds.some((id) => /grave|plaque/.test(id)), 'Gallery 10 routes through a grave or plaque image');
  for (const exhibit of ISLAMIC_SUPPLEMENTAL_EXHIBITS) {
    assert(assetById.has(exhibit.assetId), `${exhibit.id} references missing asset ${exhibit.assetId}`);
    assert(assetById.has(exhibit.panelAssetId), `${exhibit.id} panel references missing asset ${exhibit.panelAssetId}`);
  }
});

check('Gallery 11 fixes six physical installations in each of its three sequence rooms', () => {
  assert.equal(EAST_ASIAN_SUPPLEMENTAL_EXHIBITS.length, 16);
  assert.equal(EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS.length, 16);
  assert.equal(new Set(eastAsianSupplementalReferencedIds).size, 16, 'Gallery 11 repeats a supplemental image asset');
  const hall = MUSEUM_HALLS.find(({id}) => id === 'east-asian-continuities');
  assert(hall, 'Gallery 11 is absent from the canonical program');
  assert.equal(hall.exhibits.length, 2, 'Gallery 11 primary roster changed');
  const primaryReferencedIds = hall.exhibits.flatMap(({principalAssetId, supportingAssetIds}) => [
    principalAssetId,
    ...supportingAssetIds,
  ].filter(Boolean));
  assert.deepEqual(primaryReferencedIds.sort(), ['wang-yangming-traditional-portrait', 'zhu-xi-traditional-portrait']);
  assert.deepEqual(
    EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({id}) => id).sort(),
    EAST_ASIAN_SUPPLEMENTAL_EXHIBITS.map(({id}) => id).sort(),
    'Gallery 11 supplemental records and physical layouts diverged',
  );
  for (const layout of EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS) {
    const exhibit = EAST_ASIAN_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === layout.id);
    assert.equal(layout.assetId, exhibit?.assetId, `${layout.id} physical layout uses the wrong asset`);
    assert(assetById.has(layout.assetId), `${layout.id} references missing asset ${layout.assetId}`);
    assert(assetById.has(exhibit?.panelAssetId), `${layout.id} panel references missing asset ${exhibit?.panelAssetId}`);
  }
  const physicalIds = [...primaryReferencedIds, ...EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({assetId}) => assetId)];
  assert.equal(physicalIds.length, 18, 'Gallery 11 physical installation count changed');
  assert.equal(new Set(physicalIds).size, 18, 'Gallery 11 repeats a physical installation asset');
  for (const roomId of ['east-song-ming-confucian', 'east-buddhist-daoist-transmissions', 'east-regional-continuities-reserve']) {
    const primaryCount = hall.exhibits
      .filter(({roomId: exhibitRoomId}) => exhibitRoomId === roomId)
      .flatMap(({principalAssetId, supportingAssetIds}) => [principalAssetId, ...supportingAssetIds].filter(Boolean))
      .length;
    const supplementalCount = EAST_ASIAN_SUPPLEMENTAL_EXHIBIT_LAYOUTS.filter(({spatialCellId}) => spatialCellId === roomId).length;
    assert.equal(primaryCount + supplementalCount, 6, `Gallery 11 room ${roomId} must retain six physical wall installations`);
  }
});

check('Gallery 12 fixes six physical installations in each of its two rectangular rooms', () => {
  assert.equal(JEWISH_SUPPLEMENTAL_EXHIBITS.length, 9);
  assert.equal(JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS.length, 9);
  assert.equal(new Set(jewishSupplementalReferencedIds).size, 9, 'Gallery 12 repeats a supplemental image asset');
  const hall = MUSEUM_HALLS.find(({id}) => id === 'jewish-philosophy');
  assert(hall, 'Gallery 12 is absent from the canonical program');
  assert.equal(hall.exhibits.length, 3, 'Gallery 12 primary roster changed');
  const primaryReferencedIds = hall.exhibits.flatMap(({principalAssetId, supportingAssetIds}) => [
    principalAssetId,
    ...supportingAssetIds,
  ].filter(Boolean));
  assert.deepEqual(primaryReferencedIds.sort(), ['judah-halevi-letter-geniza', 'maimonides-mishnah-autograph', 'saadia-baqashah-geniza']);
  assert.deepEqual(
    JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({id}) => id).sort(),
    JEWISH_SUPPLEMENTAL_EXHIBITS.map(({id}) => id).sort(),
    'Gallery 12 supplemental records and physical layouts diverged',
  );
  for (const layout of JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS) {
    const exhibit = JEWISH_SUPPLEMENTAL_EXHIBITS.find(({id}) => id === layout.id);
    assert.equal(layout.assetId, exhibit?.assetId, `${layout.id} physical layout uses the wrong asset`);
    assert(assetById.has(layout.assetId), `${layout.id} references missing asset ${layout.assetId}`);
    assert(assetById.has(exhibit?.panelAssetId), `${layout.id} panel references missing asset ${exhibit?.panelAssetId}`);
  }
  const physicalIds = [...primaryReferencedIds, ...JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS.map(({assetId}) => assetId)];
  assert.equal(physicalIds.length, 12, 'Gallery 12 physical installation count changed');
  assert.equal(new Set(physicalIds).size, 12, 'Gallery 12 repeats a physical installation asset');
  for (const roomId of ['jewish-reason-revelation', 'jewish-maimonidean-crossroads']) {
    const primaryCount = hall.exhibits
      .filter(({roomId: exhibitRoomId}) => exhibitRoomId === roomId)
      .flatMap(({principalAssetId, supportingAssetIds}) => [principalAssetId, ...supportingAssetIds].filter(Boolean))
      .length;
    const supplementalCount = JEWISH_SUPPLEMENTAL_EXHIBIT_LAYOUTS.filter(({spatialCellId}) => spatialCellId === roomId).length;
    assert.equal(primaryCount + supplementalCount, 6, `Gallery 12 room ${roomId} must retain six physical wall installations`);
  }
});

check('Galleries 13 and 16 fill seven sequence rooms with 42 distinct physical media records', () => {
  const expected = new Map([
    ['latin-christian-scholastic', {
      primary: 10,
      supplemental: 14,
      physical: 24,
      rooms: ['latin-transmission-carolingian', 'latin-dialectic-early-scholastic', 'latin-high-scholastic', 'latin-late-debates'],
    }],
    ['rationalism-mind-nature-system', {
      primary: 5,
      supplemental: 13,
      physical: 18,
      rooms: ['rationalism-cartesian-foundations', 'rationalism-spinoza-conway', 'rationalism-leibniz-system'],
    }],
  ]);
  const combinedPhysicalIds = [];
  for (const [hallId, counts] of expected) {
    const hall = MUSEUM_HALLS.find(({id}) => id === hallId);
    const group = physicalSupplementalGroups.find(({galleryId}) => galleryId === hallId);
    assert(hall && group, `${hallId} is absent from the physical asset audit`);
    assert.equal(hall.exhibits.length, counts.primary, `${hallId} primary count changed`);
    assert.equal(group.records.length, counts.supplemental, `${hallId} supplemental record count changed`);
    assert.equal(group.layouts.length, counts.supplemental, `${hallId} supplemental layout count changed`);
    assert.deepEqual(
      group.layouts.map(({id}) => id).sort(),
      group.records.map(({id}) => id).sort(),
      `${hallId} supplemental records and layouts diverged`,
    );
    for (const layout of group.layouts) {
      const record = group.records.find(({id}) => id === layout.id);
      assert.equal(layout.assetId, record?.assetId, `${hallId}/${layout.id} physical layout uses the wrong scene asset`);
      assert.equal(layout.assetId, record?.panelAssetId, `${hallId}/${layout.id} panel uses a different asset`);
      assert(assetById.has(layout.assetId), `${hallId}/${layout.id} references missing asset ${layout.assetId}`);
    }
    const primaryIds = hall.exhibits.flatMap(({principalAssetId, supportingAssetIds, id}) => {
      assert(principalAssetId, `${hallId}/${id} lacks a principal asset`);
      assert.equal(supportingAssetIds.length, 0, `${hallId}/${id} adds an unexpected second image to a six-wall installation`);
      return [principalAssetId];
    });
    const physicalIds = [...primaryIds, ...group.layouts.map(({assetId}) => assetId)];
    assert.equal(physicalIds.length, counts.physical, `${hallId} physical media count changed`);
    assert.equal(new Set(physicalIds).size, counts.physical, `${hallId} repeats a physical asset`);
    for (const roomId of counts.rooms) {
      const roomPrimaryCount = hall.exhibits
        .filter(({roomId: exhibitRoomId}) => exhibitRoomId === roomId)
        .length;
      const roomSupplementalCount = group.layouts.filter(({spatialCellId}) => spatialCellId === roomId).length;
      assert.equal(roomPrimaryCount + roomSupplementalCount, 6, `${hallId}/${roomId} must retain six physical wall installations`);
    }
    combinedPhysicalIds.push(...physicalIds);
  }
  assert.equal(combinedPhysicalIds.length, 42);
  assert.equal(new Set(combinedPhysicalIds).size, 42, 'Galleries 13 and 16 reuse a physical image across galleries');
  assert.deepEqual(
    Object.keys(galleries13And16ManifestAssets).sort(),
    combinedPhysicalIds.sort(),
    'The Gallery 13/16 source lock does not exactly cover the 42 physical installations',
  );
});

check('Galleries 17 and 18 fill their approved rooms with 44 distinct physical media records', () => {
  const expected = new Map([
    ['empiricism-science-political-order', {
      primary: 4,
      supplemental: 14,
      physical: 18,
      manifestAssets: gallery17ManifestAssets,
      roomInstallations: new Map([
        ['empiricism-locke-ideas-rights', 6],
        ['empiricism-berkeley-perception', 6],
        ['empiricism-hume-skepticism', 6],
      ]),
    }],
    ['enlightenment-revolution-kant', {
      primary: 6,
      supplemental: 20,
      physical: 26,
      manifestAssets: gallery18ManifestAssets,
      roomInstallations: new Map([
        ['enlightenment-law-institutions', 6],
        ['enlightenment-society-freedom', 6],
        ['enlightenment-sentiment-commerce', 6],
        ['enlightenment-equality-education', 7],
        ['enlightenment-kant-critical', 1],
      ]),
    }],
  ]);
  const combinedPhysicalIds = [];
  for (const [hallId, counts] of expected) {
    const hall = MUSEUM_HALLS.find(({id}) => id === hallId);
    const group = physicalSupplementalGroups.find(({galleryId}) => galleryId === hallId);
    assert(hall && group, `${hallId} is absent from the physical asset audit`);
    assert.equal(hall.exhibits.length, counts.primary, `${hallId} primary count changed`);
    assert.equal(group.records.length, counts.supplemental, `${hallId} supplemental record count changed`);
    assert.equal(group.layouts.length, counts.supplemental, `${hallId} supplemental layout count changed`);
    assert.deepEqual(
      group.layouts.map(({id}) => id).sort(),
      group.records.map(({id}) => id).sort(),
      `${hallId} supplemental records and layouts diverged`,
    );
    for (const layout of group.layouts) {
      const record = group.records.find(({id}) => id === layout.id);
      assert.equal(layout.assetId, record?.assetId, `${hallId}/${layout.id} physical layout uses the wrong scene asset`);
      assert.equal(layout.assetId, record?.panelAssetId, `${hallId}/${layout.id} panel uses a different asset`);
      assert(assetById.has(layout.assetId), `${hallId}/${layout.id} references missing asset ${layout.assetId}`);
    }
    const primaryIds = hall.exhibits.flatMap(({principalAssetId, supportingAssetIds, id}) => {
      assert(principalAssetId, `${hallId}/${id} lacks a principal asset`);
      assert.equal(supportingAssetIds.length, 0, `${hallId}/${id} adds an unexpected second physical image`);
      return [principalAssetId];
    });
    const physicalIds = [...primaryIds, ...group.layouts.map(({assetId}) => assetId)];
    assert.equal(physicalIds.length, counts.physical, `${hallId} physical media count changed`);
    assert.equal(new Set(physicalIds).size, counts.physical, `${hallId} repeats a physical asset`);
    assert.deepEqual(
      Object.keys(counts.manifestAssets).sort(),
      physicalIds.slice().sort(),
      `${hallId} source lock does not exactly cover its physical installations`,
    );
    for (const [roomId, installationCount] of counts.roomInstallations) {
      const roomPrimaryCount = hall.exhibits.filter(({roomId: exhibitRoomId}) => exhibitRoomId === roomId).length;
      const roomSupplementalCount = group.layouts.filter(({spatialCellId}) => spatialCellId === roomId).length;
      assert.equal(
        roomPrimaryCount + roomSupplementalCount,
        installationCount,
        `${hallId}/${roomId} physical wall-installation count changed`,
      );
    }
    combinedPhysicalIds.push(...physicalIds);
  }
  assert.equal(combinedPhysicalIds.length, 44);
  assert.equal(new Set(combinedPhysicalIds).size, 44, 'Galleries 17 and 18 reuse a physical asset across galleries');
});

check('Galleries 20 and 21 preserve distinct standalone images and the image-diversity gate', () => {
  const expected = new Map([
    ['utility-liberty-history-capital', {
      primary: 4,
      supplemental: 21,
      physical: 25,
      roomInstallations: {'nineteenth-social-transformations': 7},
      roomIds: [
        'nineteenth-utilitarian-reform',
        'nineteenth-liberty-equality',
        'nineteenth-labor-capital',
        'nineteenth-social-transformations',
      ],
    }],
    ['faith-pessimism-life-value', {
      primary: 4,
      supplemental: 14,
      physical: 18,
      roomIds: [
        'nineteenth-will-pessimism',
        'nineteenth-faith-subjectivity',
        'nineteenth-genealogy-value',
      ],
    }],
  ]);
  const combinedPhysicalIds = [];
  for (const [hallId, counts] of expected) {
    const hall = MUSEUM_HALLS.find(({id}) => id === hallId);
    const group = physicalSupplementalGroups.find(({galleryId}) => galleryId === hallId);
    assert(hall && group, `${hallId} is absent from the physical asset audit`);
    assert.equal(hall.exhibits.length, counts.primary, `${hallId} primary count changed`);
    assert.equal(group.records.length, counts.supplemental, `${hallId} supplemental record count changed`);
    assert.equal(group.layouts.length, counts.supplemental, `${hallId} supplemental layout count changed`);
    assert.deepEqual(
      group.layouts.map(({id}) => id).sort(),
      group.records.map(({id}) => id).sort(),
      `${hallId} supplemental records and layouts diverged`,
    );
    const primaryIds = hall.exhibits.map(({principalAssetId, supportingAssetIds, id}) => {
      assert(principalAssetId, `${hallId}/${id} lacks a principal asset`);
      assert.equal(supportingAssetIds.length, 0, `${hallId}/${id} adds an unexpected second physical image`);
      return principalAssetId;
    });
    const physicalIds = [...primaryIds, ...group.layouts.map(({assetId}) => assetId)];
    assert.equal(physicalIds.length, counts.physical, `${hallId} physical media count changed`);
    assert.equal(new Set(physicalIds).size, counts.physical, `${hallId} repeats a physical asset`);
    assert.deepEqual(
      physicalIds.slice().sort(),
      Object.entries(galleries20And21ManifestAssets)
        .filter(([, lock]) => lock.hallFolder === hallId)
        .map(([id]) => id)
        .sort(),
      `${hallId} source lock does not exactly cover its physical installations`,
    );
    for (const roomId of counts.roomIds) {
      const roomAssetIds = [
        ...hall.exhibits
          .filter(({roomId: exhibitRoomId}) => exhibitRoomId === roomId)
          .map(({principalAssetId}) => principalAssetId),
        ...group.layouts
          .filter(({spatialCellId}) => spatialCellId === roomId)
          .map(({assetId}) => assetId),
      ];
      const expectedRoomCount = counts.roomInstallations?.[roomId] ?? 6;
      assert.equal(roomAssetIds.length, expectedRoomCount, `${hallId}/${roomId} physical wall-installation count changed`);
      assert.equal(new Set(roomAssetIds).size, expectedRoomCount, `${hallId}/${roomId} repeats an image`);
      for (const id of roomAssetIds) {
        const lock = galleries20And21ManifestAssets[id];
        assert(lock, `${hallId}/${roomId}/${id} lacks a Gallery 20/21 source lock`);
        assert.equal(lock.textDominantOrSingleBook, false, `${hallId}/${roomId}/${id} violates the no paper-only/lone-book gate`);
        assert.notEqual(lock.visualCharacter, 'text-dominant', `${hallId}/${roomId}/${id} is text-dominant`);
      }
    }
    const visualCharacters = new Set(
      physicalIds.map((id) => galleries20And21ManifestAssets[id]?.visualCharacter).filter(Boolean),
    );
    assert(
      visualCharacters.size >= 4,
      `${hallId} needs at least four visual-character groups; found ${[...visualCharacters].sort().join(', ')}`,
    );
    combinedPhysicalIds.push(...physicalIds);
  }
  assert.equal(combinedPhysicalIds.length, 43);
  assert.equal(new Set(combinedPhysicalIds).size, 43, 'Galleries 20 and 21 reuse a physical image across galleries');
});

check('Galleries 19 and 22 preserve standalone images and the image-diversity gate', () => {
  const expected = new Map([
    ['german-idealism-afterlives', {
      primary: 5,
      supplemental: 20,
      physical: 25,
      roomInstallations: {'german-idealism-afterlives-room': 7},
      roomIds: [
        'german-idealism-orientation',
        'german-idealism-nature',
        'german-idealism-hegel',
        'german-idealism-afterlives-room',
      ],
    }],
    ['pragmatism-democratic-inquiry', {
      primary: 4,
      supplemental: 20,
      physical: 24,
      roomInstallations: {},
      roomIds: [
        'pragmatism-peirce-inquiry',
        'pragmatism-james-experience',
        'pragmatism-dewey-democracy',
        'pragmatism-continuities-reserve',
      ],
    }],
  ]);
  const combinedPhysicalIds = [];
  for (const [hallId, counts] of expected) {
    const {roomIds} = counts;
    const hall = MUSEUM_HALLS.find(({id}) => id === hallId);
    const group = physicalSupplementalGroups.find(({galleryId}) => galleryId === hallId);
    assert(hall && group, `${hallId} is absent from the physical asset audit`);
    assert.equal(hall.exhibits.length, counts.primary, `${hallId} primary count changed`);
    assert.equal(group.records.length, counts.supplemental, `${hallId} supplemental record count changed`);
    assert.equal(group.layouts.length, counts.supplemental, `${hallId} supplemental layout count changed`);
    assert.deepEqual(
      group.layouts.map(({id}) => id).sort(),
      group.records.map(({id}) => id).sort(),
      `${hallId} supplemental records and layouts diverged`,
    );
    const primaryIds = hall.exhibits.map(({principalAssetId, supportingAssetIds, id}) => {
      assert(principalAssetId, `${hallId}/${id} lacks a principal asset`);
      assert.equal(supportingAssetIds.length, 0, `${hallId}/${id} adds an unexpected second physical image`);
      return principalAssetId;
    });
    const physicalIds = [...primaryIds, ...group.layouts.map(({assetId}) => assetId)];
    assert.equal(physicalIds.length, counts.physical, `${hallId} physical media count changed`);
    assert.equal(new Set(physicalIds).size, counts.physical, `${hallId} repeats a physical asset`);
    assert.deepEqual(
      physicalIds.slice().sort(),
      Object.entries(galleries19And22ManifestAssets)
        .filter(([, lock]) => lock.hallFolder === hallId)
        .map(([id]) => id)
        .sort(),
      `${hallId} source lock does not exactly cover its physical installations`,
    );
    for (const roomId of roomIds) {
      const roomAssetIds = [
        ...hall.exhibits
          .filter(({roomId: exhibitRoomId}) => exhibitRoomId === roomId)
          .map(({principalAssetId}) => principalAssetId),
        ...group.layouts
          .filter(({spatialCellId}) => spatialCellId === roomId)
          .map(({assetId}) => assetId),
      ];
      const expectedRoomCount = counts.roomInstallations[roomId] ?? 6;
      assert.equal(roomAssetIds.length, expectedRoomCount, `${hallId}/${roomId} physical wall-installation count changed`);
      assert.equal(new Set(roomAssetIds).size, expectedRoomCount, `${hallId}/${roomId} repeats an image`);
      for (const id of roomAssetIds) {
        const lock = galleries19And22ManifestAssets[id];
        assert(lock, `${hallId}/${roomId}/${id} lacks a Gallery 19/22 source lock`);
        assert.equal(lock.textDominantOrSingleBook, false, `${hallId}/${roomId}/${id} violates the no paper-only/lone-book gate`);
        assert.notEqual(lock.visualCharacter, 'text-dominant', `${hallId}/${roomId}/${id} is text-dominant`);
      }
    }
    const visualCharacters = new Set(
      physicalIds.map((id) => galleries19And22ManifestAssets[id]?.visualCharacter).filter(Boolean),
    );
    assert(
      visualCharacters.size >= 4,
      `${hallId} needs at least four visual-character groups; found ${[...visualCharacters].sort().join(', ')}`,
    );
    combinedPhysicalIds.push(...physicalIds);
  }
  assert.equal(combinedPhysicalIds.length, 49);
  assert.equal(new Set(combinedPhysicalIds).size, 49, 'Galleries 19 and 22 reuse a physical image across galleries');
});

check('Galleries 23 and 24 fill every room with six new standalone images and preserve the image-diversity gate', () => {
  const expected = new Map([
    ['critique-power-deconstruction', {
      primary: 4,
      supplemental: 20,
      roomIds: [
        'continental-orientation',
        'critique-genealogy-power',
        'critique-deconstruction',
        'critique-critical-theory',
      ],
    }],
    ['moral-life-practical-reason', {
      primary: 8,
      supplemental: 16,
      roomIds: [
        'moral-ethics-orientation',
        'moral-character-virtue',
        'moral-duty-consequence',
        'moral-rights-persons-futures',
      ],
    }],
  ]);
  const combinedPhysicalIds = [];
  for (const [hallId, {primary, supplemental, roomIds}] of expected) {
    const hall = MUSEUM_HALLS.find(({id}) => id === hallId);
    const group = physicalSupplementalGroups.find(({galleryId}) => galleryId === hallId);
    assert(hall && group, `${hallId} is absent from the physical asset audit`);
    assert.equal(hall.exhibits.length, primary, `${hallId} primary count changed`);
    assert.equal(group.records.length, supplemental, `${hallId} supplemental record count changed`);
    assert.equal(group.layouts.length, supplemental, `${hallId} supplemental layout count changed`);
    assert.deepEqual(
      group.layouts.map(({id}) => id).sort(),
      group.records.map(({id}) => id).sort(),
      `${hallId} supplemental records and layouts diverged`,
    );
    const primaryIds = hall.exhibits.map(({principalAssetId, supportingAssetIds, id}) => {
      assert(principalAssetId, `${hallId}/${id} lacks a principal asset`);
      assert.equal(supportingAssetIds.length, 0, `${hallId}/${id} adds an unexpected second physical image`);
      return principalAssetId;
    });
    const physicalIds = [...primaryIds, ...group.layouts.map(({assetId}) => assetId)];
    assert.equal(physicalIds.length, 24, `${hallId} physical media count changed`);
    assert.equal(new Set(physicalIds).size, 24, `${hallId} repeats a physical asset`);
    assert.deepEqual(
      physicalIds.slice().sort(),
      Object.entries(galleries23And24ManifestAssets)
        .filter(([, lock]) => lock.hallFolder === hallId)
        .map(([id]) => id)
        .sort(),
      `${hallId} source lock does not exactly cover its physical installations`,
    );
    for (const roomId of roomIds) {
      const roomAssetIds = [
        ...hall.exhibits
          .filter(({roomId: exhibitRoomId}) => exhibitRoomId === roomId)
          .map(({principalAssetId}) => principalAssetId),
        ...group.layouts
          .filter(({spatialCellId}) => spatialCellId === roomId)
          .map(({assetId}) => assetId),
      ];
      assert.equal(roomAssetIds.length, 6, `${hallId}/${roomId} must retain six physical wall installations`);
      assert.equal(new Set(roomAssetIds).size, 6, `${hallId}/${roomId} repeats an image`);
      for (const id of roomAssetIds) {
        const lock = galleries23And24ManifestAssets[id];
        assert(lock, `${hallId}/${roomId}/${id} lacks a Gallery 23/24 source lock`);
        assert.equal(lock.textDominantOrSingleBook, false, `${hallId}/${roomId}/${id} violates the no paper-only/lone-book gate`);
        assert.notEqual(lock.visualCharacter, 'text-dominant', `${hallId}/${roomId}/${id} is text-dominant`);
      }
    }
    const visualCharacters = new Set(
      physicalIds.map((id) => galleries23And24ManifestAssets[id]?.visualCharacter).filter(Boolean),
    );
    assert(
      visualCharacters.size >= 4,
      `${hallId} needs at least four visual-character groups; found ${[...visualCharacters].sort().join(', ')}`,
    );
    combinedPhysicalIds.push(...physicalIds);
  }
  assert.equal(combinedPhysicalIds.length, 48);
  assert.equal(new Set(combinedPhysicalIds).size, 48, 'Galleries 23 and 24 reuse a physical image across galleries');
});

check('Gallery 25 fills its four-room crossroads with six unique standalone images per room', () => {
  const hall = MUSEUM_HALLS.find(({id}) => id === 'feminist-philosophies');
  const group = physicalSupplementalGroups.find(({galleryId}) => galleryId === 'feminist-philosophies');
  assert(hall && group, 'Gallery 25 is absent from the physical asset audit');
  assert.equal(hall.exhibits.length, 3);
  assert.equal(group.records.length, 21);
  assert.equal(group.layouts.length, 21);
  const primaryAssets = hall.exhibits.map(({principalAssetId}) => principalAssetId);
  const physicalIds = [...primaryAssets, ...group.layouts.map(({assetId}) => assetId)];
  assert.equal(physicalIds.length, 24);
  assert.equal(new Set(physicalIds).size, 24, 'Gallery 25 repeats a physical asset');
  assert.deepEqual(Object.keys(gallery25ManifestAssets).sort(), [...physicalIds].sort());
  const roomIds = [
    'feminist-orientation-genealogies',
    'feminist-early-genealogies',
    'feminist-situated-freedom',
    'feminist-gender-norms',
  ];
  for (const roomId of roomIds) {
    const primaryRoomAssets = hall.exhibits
      .filter(({zoneId}) => zoneId === roomId)
      .map(({principalAssetId}) => principalAssetId);
    const roomAssetIds = [
      ...primaryRoomAssets,
      ...group.layouts.filter(({spatialCellId}) => spatialCellId === roomId).map(({assetId}) => assetId),
    ];
    assert.equal(roomAssetIds.length, 6, `Gallery 25/${roomId} must retain six installations`);
    assert.equal(new Set(roomAssetIds).size, 6, `Gallery 25/${roomId} repeats an image`);
    for (const id of roomAssetIds) {
      const lock = gallery25ManifestAssets[id];
      assert(lock, `Gallery 25/${roomId}/${id} lacks a source lock`);
      assert.equal(lock.textDominantOrSingleBook, false);
      assert.notEqual(lock.visualCharacter, 'text-dominant');
    }
  }
  assert(new Set(physicalIds.map((id) => gallery25ManifestAssets[id]?.visualCharacter)).size >= 4);
});

check('Gallery 26 fills its approved three-room sequence with six unique standalone images per room', () => {
  const hallId = 'colonialism-race-liberation';
  const roomIds = [
    'colonial-embodiment-liberation',
    'colonial-black-feminism-abolition',
    'colonial-context-reserve',
  ];
  const hall = MUSEUM_HALLS.find(({id}) => id === hallId);
  const group = physicalSupplementalGroups.find(({galleryId}) => galleryId === hallId);
  assert(hall && group, 'Gallery 26 is absent from the physical asset audit');
  assert.equal(hall.exhibits.length, 3, 'Gallery 26 primary count changed');
  assert.equal(group.records.length, 15, 'Gallery 26 supplemental record count changed');
  assert.equal(group.layouts.length, 15, 'Gallery 26 supplemental layout count changed');
  assert.deepEqual(
    group.layouts.map(({id}) => id).sort(),
    group.records.map(({id}) => id).sort(),
    'Gallery 26 supplemental records and layouts diverged',
  );
  const primaryIds = hall.exhibits.map(({principalAssetId, supportingAssetIds, id}) => {
    assert(principalAssetId, `Gallery 26/${id} lacks a principal asset`);
    assert.equal(supportingAssetIds.length, 0, `Gallery 26/${id} adds an unexpected second physical image`);
    return principalAssetId;
  });
  const physicalIds = [...primaryIds, ...group.layouts.map(({assetId}) => assetId)];
  assert.equal(physicalIds.length, 18);
  assert.equal(new Set(physicalIds).size, 18, 'Gallery 26 repeats a physical asset');
  assert.deepEqual(
    physicalIds.slice().sort(),
    Object.keys(gallery26ManifestAssets).sort(),
    'Gallery 26 source lock does not exactly cover its physical installations',
  );
  for (const roomId of roomIds) {
    const roomAssetIds = [
      ...hall.exhibits
        .filter(({roomId: exhibitRoomId}) => exhibitRoomId === roomId)
        .map(({principalAssetId}) => principalAssetId),
      ...group.layouts
        .filter(({spatialCellId}) => spatialCellId === roomId)
        .map(({assetId}) => assetId),
    ];
    assert.equal(roomAssetIds.length, 6, `Gallery 26/${roomId} must retain six physical wall installations`);
    assert.equal(new Set(roomAssetIds).size, 6, `Gallery 26/${roomId} repeats an image`);
    for (const id of roomAssetIds) {
      const lock = gallery26ManifestAssets[id];
      assert(lock, `Gallery 26/${roomId}/${id} lacks a source lock`);
      assert.equal(lock.textDominantOrSingleBook, false, `Gallery 26/${roomId}/${id} violates the no paper-only/lone-book gate`);
      assert.notEqual(lock.visualCharacter, 'text-dominant', `Gallery 26/${roomId}/${id} is text-dominant`);
    }
  }
  const visualCharacters = new Set(
    physicalIds.map((id) => gallery26ManifestAssets[id]?.visualCharacter).filter(Boolean),
  );
  assert(
    visualCharacters.size >= 4,
    `Gallery 26 needs at least four visual-character groups; found ${[...visualCharacters].sort().join(', ')}`,
  );
});

check('Gallery 26 media keeps documented likenesses and contextual time-place caveats explicit', () => {
  for (const [id, entityId] of [
    ['colonial-fanon-portrait', 'fanon'],
    ['colonial-davis-portrait', 'angela-davis'],
    ['colonial-hooks-portrait', 'bell-hooks'],
  ]) {
    const asset = assetById.get(id);
    assert(asset, `${id} is absent from the Gallery 26 asset registry`);
    assert.equal(asset.entityId, entityId, `${id} is attached to the wrong philosopher`);
    assert.equal(asset.role, 'identity', `${id} must remain an identity image`);
    assert.equal(asset.mediaKind, 'photograph', `${id} must remain a documented photograph`);
    assert.equal(asset.likenessStatus, 'lifetime-photograph', `${id} must remain a documented lifetime photograph`);
  }

  for (const id of [
    'colonial-fanon-racial-schema',
    'colonial-fanon-clinic',
    'colonial-davis-prison-abolition',
    'colonial-hooks-engaged-pedagogy',
  ]) {
    const asset = assetById.get(id);
    assert(asset, `${id} is absent from the Gallery 26 asset registry`);
    assert.equal(asset.role, 'context', `${id} must remain contextual rather than a likeness`);
    assert.equal(asset.likenessStatus, 'not-applicable', `${id} must not imply a likeness`);
  }

  for (const id of Object.keys(gallery26ManifestAssets)) {
    const asset = assetById.get(id);
    assert(asset, `${id} is absent from the Gallery 26 asset registry`);
    assert.doesNotMatch(
      `${asset.title} ${asset.alt} ${asset.caption} ${asset.historicalNote}`,
      /\bnegro\b/iu,
      `${id} leaks a historical source-file slur into visitor-facing copy`,
    );
  }

  const racialSchema = assetById.get('colonial-fanon-racial-schema');
  assert.match(racialSchema?.historicalNote ?? '', /Oklahoma/iu, 'Fanon racial-schema context omits its Oklahoma location');
  assert.match(racialSchema?.historicalNote ?? '', /Fanon/iu, 'Fanon racial-schema context omits its interpretive distance from Fanon');
  const clinic = assetById.get('colonial-fanon-clinic');
  assert.match(clinic?.historicalNote ?? '', /1933/iu, 'Fanon clinic context omits its 1933 date');
  assert.match(clinic?.historicalNote ?? '', /(?:before|predat)[\s\S]*Fanon|Fanon[\s\S]*(?:before|predat)/iu, 'Fanon clinic context omits that the photograph predates Fanon');
  const abolition = assetById.get('colonial-davis-prison-abolition');
  assert.match(abolition?.historicalNote ?? '', /Belmarsh/iu, 'Davis abolition context omits its Belmarsh location');
  assert.match(abolition?.historicalNote ?? '', /(?:contemporary|202\d)/iu, 'Davis abolition context omits that the image is contemporary');
  assert.match(abolition?.historicalNote ?? '', /Davis/iu, 'Davis abolition context omits its interpretive distance from Davis');
  const pedagogy = assetById.get('colonial-hooks-engaged-pedagogy');
  assert.match(pedagogy?.historicalNote ?? '', /1940/iu, 'hooks pedagogy context omits its historical date');
  assert.match(pedagogy?.historicalNote ?? '', /hooks/iu, 'hooks pedagogy context omits its interpretive distance from hooks');
  assert.match(pedagogy?.historicalNote ?? '', /\bnot\b|\bbefore\b|\bpredat/iu, 'hooks pedagogy context risks presenting the classroom as a scene from hooks’s work');
});

check('every physical installation has a museum-wide unique asset, source page, and derivative hash', () => {
  for (const {galleryId, records, layouts} of physicalSupplementalGroups) {
    assert.equal(layouts.length, records.length, `${galleryId} supplemental record and physical-layout counts diverged`);
    assert.deepEqual(
      layouts.map(({id}) => id).sort(),
      records.map(({id}) => id).sort(),
      `${galleryId} supplemental records and physical layouts diverged`,
    );
    for (const layout of layouts) {
      const record = records.find(({id}) => id === layout.id);
      assert.equal(layout.assetId, record?.assetId, `${galleryId}/${layout.id} physical layout uses the wrong asset`);
    }
  }
  assert.equal(physicalSupplementalAssetIds.length, supplementalReferencedIds.length, 'supplemental physical installation count diverged from interpreted records');
  const repeatedPhysicalAssetIds = [...new Set(
    physicalInstallationAssetIds.filter((id, index, ids) => ids.indexOf(id) !== index),
  )];
  assert(
    unique(physicalInstallationAssetIds),
    `two physical installations reuse an asset id: ${repeatedPhysicalAssetIds.join(', ')}`,
  );
  const physicalAssets = physicalInstallationAssetIds.map((id) => {
    const asset = assetById.get(id);
    assert(asset, `physical installation references missing asset ${id}`);
    return asset;
  });
  const physicalSourcePageUrls = physicalAssets.map(({sourcePageUrl}) => sourcePageUrl);
  const repeatedPhysicalSourcePages = [...new Set(
    physicalSourcePageUrls.filter((url, index, urls) => urls.indexOf(url) !== index),
  )];
  assert(
    unique(physicalSourcePageUrls),
    `two physical installations reuse an exact source-page URL: ${repeatedPhysicalSourcePages.join(', ')}`,
  );
  assert(unique(physicalAssets.map(({variants}) => sha256(exactCasePath(variants.scene.path)))), 'two physical installations reuse identical scene bytes');
  assert(unique(physicalAssets.map(({variants}) => sha256(exactCasePath(variants.panel.path)))), 'two physical installations reuse identical panel bytes');
});

check('the preserved asset registry contains 661 unique records and derivative paths', () => {
  assert.equal(MUSEUM_ASSETS.length, 661);
  assert.equal(assetById.size, 661);
  const variantPaths = MUSEUM_ASSETS.flatMap(({variants}) => [variants.scene.path, variants.panel.path]);
  assert.equal(variantPaths.length, 1322);
  assert(unique(variantPaths), 'two asset variants share a derivative path');
  for (const id of NEW_CANONICAL_ASSET_IDS) assert(assetById.has(id), `new canonical asset ${id} is missing`);
  for (const id of MEDITERRANEAN_ASSET_IDS) assert(assetById.has(id), `Gallery 01 asset ${id} is missing`);
});

check('all asset records carry complete provenance, rights, interpretation, and accessibility metadata', () => {
  const allowedRoles = new Set(['identity', 'primary-source', 'material-history', 'context']);
  const allowedKinds = new Set(['sculpture-photograph', 'painting', 'engraving', 'manuscript', 'papyrus', 'book-page', 'photograph', 'drawing', 'digital-image', 'document', 'architectural-plan']);
  const allowedRights = new Set(['license', 'rights-status', 'dedication']);
  for (const asset of MUSEUM_ASSETS) {
    for (const [field, value] of Object.entries({
      title: asset.title,
      creator: asset.creator,
      objectDate: asset.objectDate,
      institution: asset.institution,
      license: asset.license,
      attribution: asset.attribution,
      alt: asset.alt,
      caption: asset.caption,
      historicalNote: asset.historicalNote,
      likenessStatus: asset.likenessStatus,
    })) assert.equal(typeof value === 'string' && value.trim().length > 0, true, `${asset.id}.${field} is incomplete`);
    assert(allowedRoles.has(asset.role), `${asset.id} has unsupported role ${asset.role}`);
    assert(allowedKinds.has(asset.mediaKind), `${asset.id} has unsupported media kind ${asset.mediaKind}`);
    assert(allowedRights.has(asset.rightsKind), `${asset.id} has unsupported rights kind ${asset.rightsKind}`);
    assert(isHttpUrl(asset.sourcePageUrl), `${asset.id} sourcePageUrl is not an HTTP(S) source page`);
    const sourcePage = new URL(asset.sourcePageUrl);
    assert.equal(sourcePage.protocol, 'https:', `${asset.id} source page must use HTTPS`);
    const trustedExternalSource = legacyStandaloneReplacementIds.has(asset.id)
      ? undefined
      : TRUSTED_EXTERNAL_SOURCE_LOCKS.get(asset.id);
    if (ORIGINAL_INTERPRETIVE_ASSET_IDS.has(asset.id)) {
      assert.equal(sourcePage.hostname, 'github.com');
      if (asset.id === 'anscombe-portrait-interpretive') {
        assert.equal(asset.license, 'CC BY-SA 3.0');
        assert.equal(asset.objectPageUrl, 'https://commons.wikimedia.org/wiki/File:Elisabeth_Anscombe.jpg');
      } else {
        assert.equal(asset.license, 'Original Philosophy Atlas Museum interpretive illustration');
      }
    } else if (asset.id === 'plato-republic-justice-ideal-city') {
      assert.equal(sourcePage.hostname, 'www.nga.gov');
      assert.equal(asset.objectPageUrl, 'https://art.thewalters.org/object/37.677/');
    } else if (trustedExternalSource) {
      assert.equal(asset.sourcePageUrl, trustedExternalSource.sourcePageUrl, `${asset.id} external source page changed`);
    } else {
      assert.equal(sourcePage.hostname, 'commons.wikimedia.org', `${asset.id} source page must use Wikimedia Commons`);
      assert(sourcePage.pathname.startsWith('/wiki/File:'), `${asset.id} sourcePageUrl must be an exact Commons file page`);
    }
    if (asset.licenseUrl) {
      assert(isHttpUrl(asset.licenseUrl), `${asset.id} license or rights-status URL is invalid`);
      assert.equal(new URL(asset.licenseUrl).protocol, 'https:', `${asset.id} licenseUrl must use HTTPS`);
    } else {
      assert(ORIGINAL_INTERPRETIVE_ASSET_IDS.has(asset.id) || asset.id === 'plato-republic-justice-ideal-city', `${asset.id} needs a license or rights-status URL`);
    }
    if (asset.objectPageUrl) {
      assert(isHttpUrl(asset.objectPageUrl), `${asset.id} objectPageUrl is invalid`);
      assert.equal(new URL(asset.objectPageUrl).protocol, 'https:', `${asset.id} objectPageUrl must use HTTPS`);
    }
    if (
      TRUSTED_EXTERNAL_OBJECT_PAGES.has(asset.id)
      && !legacyStandaloneReplacementIds.has(asset.id)
    ) {
      assert.equal(asset.objectPageUrl, TRUSTED_EXTERNAL_OBJECT_PAGES.get(asset.id), `${asset.id} trusted external object page changed`);
    }
    if (/^CC BY(?:-|\s)/.test(asset.license)) {
      assert.equal(asset.rightsKind, 'license', `${asset.id} must classify CC BY terms as a license`);
      assert.equal(new URL(asset.licenseUrl).hostname, 'creativecommons.org', `${asset.id} CC license URL must use Creative Commons`);
      assert(/resized.+converted.+WebP/i.test(asset.derivativeNotice ?? ''), `${asset.id} must disclose derivative modifications`);
    }
    if (asset.license.startsWith('Public Domain Mark')) {
      assert.equal(asset.rightsKind, 'rights-status', `${asset.id} must classify Public Domain Mark as rights status`);
      assert(new URL(asset.licenseUrl).pathname.startsWith('/publicdomain/mark/'), `${asset.id} has the wrong Public Domain Mark URL`);
    }
    if (asset.license.startsWith('CC0')) {
      assert.equal(asset.rightsKind, 'dedication', `${asset.id} must classify CC0 as a dedication`);
      assert(new URL(asset.licenseUrl).pathname.startsWith('/publicdomain/zero/'), `${asset.id} has the wrong CC0 URL`);
    }
    assert(asset.alt.trim().length >= 24, `${asset.id} alt text is too shallow`);
    assert(asset.caption.trim().length >= 16, `${asset.id} caption is too shallow`);
    assert(asset.historicalNote.trim().length >= 40, `${asset.id} needs an interpretive caveat`);
    assert(asset.attribution.trim().length >= 16, `${asset.id} attribution is too shallow`);
    if (asset.focalPoint) {
      assert(asset.focalPoint.x >= 0 && asset.focalPoint.x <= 1, `${asset.id} focalPoint.x is outside normalized bounds`);
      assert(asset.focalPoint.y >= 0 && asset.focalPoint.y <= 1, `${asset.id} focalPoint.y is outside normalized bounds`);
    }
  }
  for (const id of TRUSTED_EXTERNAL_SOURCE_LOCKS.keys()) assert(assetById.has(id), `trusted external source ${id} has no asset record`);
  for (const id of TRUSTED_EXTERNAL_OBJECT_PAGES.keys()) assert(assetById.has(id), `trusted external object page ${id} has no asset record`);
});

check('every registered variant is exact-case local WebP media with locked dimensions', () => {
  for (const asset of MUSEUM_ASSETS) {
    for (const [variantName, variant] of Object.entries(asset.variants)) {
      assert.match(variant.path, /^assets\/museum\/[a-z0-9-]+\/[a-z0-9-]+-(scene|panel)\.webp$/, `${asset.id}.${variantName} is not a canonical local path`);
      assert(!variant.path.startsWith('/') && !variant.path.includes('..'), `${asset.id}.${variantName} path is unsafe`);
      const path = exactCasePath(variant.path);
      assert.equal(statSync(path).isFile(), true, `${variant.path} is not a file`);
      assert(statSync(path).size > 0 && statSync(path).size <= 600_000, `${variant.path} violates the derivative byte ceiling`);
      assert.deepEqual(webpDimensions(path), {width: variant.width, height: variant.height}, `${variant.path} dimensions differ from metadata`);
      assert(Number.isSafeInteger(variant.width) && variant.width > 0, `${variant.path} has an invalid width`);
      assert(Number.isSafeInteger(variant.height) && variant.height > 0, `${variant.path} has an invalid height`);
      assert(Math.min(variant.width, variant.height) >= 180, `${variant.path} is too small for a Museum derivative`);
      if (variantName === 'scene') assert(Math.max(variant.width, variant.height) <= 640, `${variant.path} exceeds the scene bound`);
      if (variantName === 'panel') assert(Math.max(variant.width, variant.height) <= 1280, `${variant.path} exceeds the panel bound`);
    }
  }
});

check('the 318-source modern-manifest subset excludes all separately locked Gallery 01 and Galleries 13–26 media', () => {
  assert.equal(modernManifest.version, 1);
  assert.equal(Object.keys(manifestAssets).length, 318);
  const managedAssets = MUSEUM_ASSETS.filter(({variants}) =>
    !variants.scene.path.startsWith('assets/museum/ancient-greek/')
      && !variants.scene.path.startsWith('assets/museum/hellenistic-roman-ways/')
      && !variants.scene.path.startsWith('assets/museum/late-antiquity-inheritance/')
      && !variants.scene.path.startsWith('assets/museum/latin-christian-scholastic/')
      && !variants.scene.path.startsWith('assets/museum/rationalism-mind-nature-system/')
      && !variants.scene.path.startsWith('assets/museum/empiricism-science-political-order/')
      && !variants.scene.path.startsWith('assets/museum/enlightenment-revolution-kant/')
      && !variants.scene.path.startsWith('assets/museum/german-idealism-afterlives/')
      && !variants.scene.path.startsWith('assets/museum/utility-liberty-history-capital/')
      && !variants.scene.path.startsWith('assets/museum/faith-pessimism-life-value/')
      && !variants.scene.path.startsWith('assets/museum/pragmatism-democratic-inquiry/')
      && !variants.scene.path.startsWith('assets/museum/critique-power-deconstruction/')
      && !variants.scene.path.startsWith('assets/museum/moral-life-practical-reason/')
      && !variants.scene.path.startsWith('assets/museum/colonialism-race-liberation/')
      && !variants.scene.path.startsWith('assets/museum/feminist-philosophies/'));
  assert.equal(managedAssets.length, 318);
  assert.deepEqual(Object.keys(manifestAssets).sort(), managedAssets.map(({id}) => id).sort());
  assert.match(preparationSource, /MANIFEST_PATH = ROOT \/ "scripts" \/ "museumModernAssetManifest\.json"/);
  assert.match(preparationSource, /EXPECTED_ASSET_COUNT = 318/);
  for (const folder of MANAGED_HALL_FOLDERS) assert(preparationSource.includes(`"${folder}"`), `preparation pipeline omits ${folder}`);
  assert.match(preparationSource, /record\["selectedThumbnailUrl"\]/);
  assert.match(preparationSource, /assert_locked\(slug, "scene"/);
  assert.match(preparationSource, /assert_locked\(slug, "panel"/);
  assert.match(preparationSource, /"sha256": sha256\(path\)/);

  const countsByFolder = new Map();
  for (const asset of managedAssets) {
    const lock = manifestAssets[asset.id];
    assert(lock, `${asset.id} has no preparation lock`);
    assert(MANAGED_HALL_FOLDERS.includes(lock.hallFolder), `${asset.id} has invalid hallFolder ${lock.hallFolder}`);
    countsByFolder.set(lock.hallFolder, (countsByFolder.get(lock.hallFolder) ?? 0) + 1);
    assert.equal(lock.sourcePageUrl, asset.sourcePageUrl, `${asset.id} lock source page differs from provenance`);
    for (const field of ['sourcePageUrl', 'sourceImageUrl', 'selectedThumbnailUrl']) assert(lock[field]?.startsWith('https://'), `${asset.id}.${field} must be locked HTTPS`);
    const trustedExternalSource = legacyStandaloneReplacementIds.has(asset.id)
      ? undefined
      : TRUSTED_EXTERNAL_SOURCE_LOCKS.get(asset.id);
    if (lock.sourceKind === 'owner-approved-original-illustration') {
      assert(
        asset.id.endsWith('-interpretive') || legacyStandaloneReplacementIds.has(asset.id),
        `${asset.id} marks an unreviewed asset as an original illustration`,
      );
      assert.equal(new URL(lock.sourcePageUrl).hostname, 'github.com', `${asset.id} original source page must use GitHub`);
      assert.equal(new URL(lock.sourceImageUrl).hostname, 'raw.githubusercontent.com', `${asset.id} original source image must use the repository`);
      assert.equal(new URL(lock.selectedThumbnailUrl).hostname, 'raw.githubusercontent.com', `${asset.id} original thumbnail must use the repository`);
    } else if (trustedExternalSource) {
      assert.equal(lock.sourcePageUrl, trustedExternalSource.sourcePageUrl, `${asset.id} trusted source page changed`);
      assert.equal(lock.sourceImageUrl, trustedExternalSource.sourceImageUrl, `${asset.id} trusted source image changed`);
      assert.equal(lock.selectedThumbnailUrl, trustedExternalSource.selectedThumbnailUrl, `${asset.id} trusted thumbnail changed`);
    } else {
      assert.equal(new URL(lock.sourcePageUrl).hostname, 'commons.wikimedia.org', `${asset.id} lock source page must use Commons`);
      const allowedMediaHosts = [
        'classical-south-asian-worlds',
        'buddhist-philosophies',
        'classical-chinese-traditions',
        'islamic-philosophical-worlds',
        'core-questions-forum',
        'east-asian-continuities',
        'jewish-philosophy',
      ].includes(lock.hallFolder)
        ? ['commons.wikimedia.org', 'upload.wikimedia.org']
        : ['upload.wikimedia.org'];
      assert(allowedMediaHosts.includes(new URL(lock.sourceImageUrl).hostname), `${asset.id} lock source image must use Wikimedia`);
      assert(allowedMediaHosts.includes(new URL(lock.selectedThumbnailUrl).hostname), `${asset.id} lock thumbnail must use Wikimedia`);
    }
    for (const variantName of ['scene', 'panel']) {
      const variant = asset.variants[variantName];
      const expected = lock[variantName];
      assert(expected, `${asset.id}.${variantName} lock is missing`);
      assert(Number.isSafeInteger(expected.width) && expected.width > 0, `${asset.id}.${variantName}.width is invalid`);
      assert(Number.isSafeInteger(expected.height) && expected.height > 0, `${asset.id}.${variantName}.height is invalid`);
      assert(Number.isSafeInteger(expected.bytes) && expected.bytes > 0, `${asset.id}.${variantName}.bytes is invalid`);
      assert.match(expected.sha256 ?? '', /^[0-9a-f]{64}$/, `${asset.id}.${variantName}.sha256 is invalid`);
      assert.equal(variant.path, `assets/museum/${lock.hallFolder}/${asset.id}-${variantName}.webp`, `${asset.id}.${variantName} path differs from its folder lock`);
      assert.equal(expected.width, variant.width, `${asset.id}.${variantName} lock width differs from runtime metadata`);
      assert.equal(expected.height, variant.height, `${asset.id}.${variantName} lock height differs from runtime metadata`);
    }
  }
  assert.deepEqual(Object.fromEntries([...countsByFolder].sort()), {
    'analytic-traditions': 26,
    'buddhist-philosophies': 28,
    'classical-chinese-traditions': 24,
    'classical-south-asian-worlds': 28,
    'core-questions-forum': 22,
    'east-asian-continuities': 18,
    'ethics-justice-political-life': 16,
    'islamic-philosophical-worlds': 30,
    'jewish-philosophy': 12,
    'justice-democratic-reason': 12,
    'logic-language-science': 16,
    'mind-consciousness-self': 16,
    'modernity-freedom-critique': 16,
    'phenomenology-existence-embodiment': 25,
    'renaissance-humanism-new-method': 13,
    'renaissance-reason-revolution': 16,
  }, 'preparation lock folder inventory changed');
});

check('all 636 managed derivatives match exact dimensions, bytes, and SHA-256 locks', () => {
  for (const [id, lock] of Object.entries(manifestAssets)) {
    const asset = assetById.get(id);
    assert(asset, `${id} lock has no asset record`);
    for (const variantName of ['scene', 'panel']) {
      const path = exactCasePath(asset.variants[variantName].path);
      const expected = lock[variantName];
      assert.equal(statSync(path).size, expected.bytes, `${id}.${variantName} byte count drifted`);
      assert.equal(sha256(path), expected.sha256, `${id}.${variantName} SHA-256 drifted`);
      assert.deepEqual(webpDimensions(path), {width: expected.width, height: expected.height}, `${id}.${variantName} locked dimensions drifted`);
    }
  }
});

check('the 25-source Gallery 01 lock reproduces all curated Mediterranean media', () => {
  assert.equal(mediterraneanManifest.version, 1);
  assert.equal(Object.keys(mediterraneanManifestAssets).length, 25);
  assert.deepEqual(Object.keys(mediterraneanManifestAssets).sort(), [...MEDITERRANEAN_ASSET_IDS].sort());
  assert.match(mediterraneanPreparationSource, /museumMediterraneanAssetManifest\.json/);
  assert.match(mediterraneanPreparationSource, /EXPECTED_ASSET_COUNT = 25/);
  assert.match(mediterraneanPreparationSource, /Resampling\.LANCZOS/);
  assert.match(mediterraneanPreparationSource, /"sha256": sha256\(destination\)/);
  for (const id of MEDITERRANEAN_ASSET_IDS) {
    const lock = mediterraneanManifestAssets[id];
    const asset = assetById.get(id);
    assert(asset && lock, `${id} is absent from its runtime record or source lock`);
    assert.equal(lock.sourcePageUrl, asset.sourcePageUrl, `${id} lock source page differs from provenance`);
    if (lock.sourceKind === 'owner-approved-original-illustration') {
      assert.equal(id, 'plato-cave-interpretive-illustration');
      assert.equal(new URL(lock.sourcePageUrl).hostname, 'github.com');
      assert.equal(new URL(lock.sourceImageUrl).hostname, 'github.com');
      assert.equal(new URL(lock.selectedThumbnailUrl).hostname, 'github.com');
      assert.equal(lock.sceneMaximum, 450, `${id} must retain its tighter scene cap`);
    } else if (lock.sourceKind === 'curated-two-object-composite') {
      assert.equal(id, 'plato-republic-justice-ideal-city');
      assert.equal(new URL(lock.sourcePageUrl).hostname, 'www.nga.gov');
      assert.equal(new URL(lock.sourceImageUrl).hostname, 'api.nga.gov');
      assert.equal(new URL(lock.companionPageUrl).hostname, 'art.thewalters.org');
      assert.equal(new URL(lock.companionImageUrl).hostname, 'art.thewalters.org');
    } else {
      assert.equal(new URL(lock.sourcePageUrl).hostname, 'commons.wikimedia.org', `${id} source lock must use Commons`);
      assert.equal(new URL(lock.sourceImageUrl).hostname, 'upload.wikimedia.org', `${id} original lock must use Wikimedia upload`);
      assert.equal(new URL(lock.selectedThumbnailUrl).hostname, 'upload.wikimedia.org', `${id} derivative source must use Wikimedia upload`);
    }
    if (id === 'plato-republic-justice-ideal-city' || id === 'plato-republic-parisinus-1807') {
      assert.equal(lock.sceneMaximum, 480, `${id} must retain its tighter scene cap`);
    }
    for (const variantName of ['scene', 'panel']) {
      const variant = asset.variants[variantName];
      const expected = lock[variantName];
      const path = exactCasePath(variant.path);
      assert(expected, `${id}.${variantName} lock is missing`);
      assert.equal(variant.path, `assets/museum/ancient-greek/${id}-${variantName}.webp`);
      assert.equal(variant.width, expected.width, `${id}.${variantName} width differs from its lock`);
      assert.equal(variant.height, expected.height, `${id}.${variantName} height differs from its lock`);
      assert.equal(statSync(path).size, expected.bytes, `${id}.${variantName} byte count drifted`);
      assert.equal(sha256(path), expected.sha256, `${id}.${variantName} SHA-256 drifted`);
    }
  }
});

check('the 34-source Galleries 14–15 lock reproduces every successor-gallery derivative', () => {
  assert.equal(successorManifest.version, 1);
  assert.equal(Object.keys(successorManifestAssets).length, 34);
  assert.match(successorPreparationSource, /museumSuccessorGalleriesAssetManifest\.json/);
  assert.match(successorPreparationSource, /EXPECTED_ASSET_COUNT = 34/);
  assert.match(successorPreparationSource, /assert_locked\(slug, "scene"/);
  assert.match(successorPreparationSource, /assert_locked\(slug, "panel"/);
  assert.match(successorPreparationSource, /"sha256": sha256\(destination\)/);
  const countsByFolder = new Map();
  for (const [id, lock] of Object.entries(successorManifestAssets)) {
    const asset = assetById.get(id);
    assert(asset, `${id} successor lock has no asset record`);
    assert(['hellenistic-roman-ways', 'late-antiquity-inheritance'].includes(lock.hallFolder), `${id} has invalid successor folder ${lock.hallFolder}`);
    countsByFolder.set(lock.hallFolder, (countsByFolder.get(lock.hallFolder) ?? 0) + 1);
    assert.equal(lock.sourcePageUrl, asset.sourcePageUrl, `${id} successor lock source page differs from provenance`);
    for (const field of ['sourcePageUrl', 'sourceImageUrl', 'selectedThumbnailUrl']) {
      assert(lock[field]?.startsWith('https://'), `${id}.${field} must be locked HTTPS`);
    }
    for (const variantName of ['scene', 'panel']) {
      const variant = asset.variants[variantName];
      const expected = lock[variantName];
      const path = exactCasePath(variant.path);
      assert(expected, `${id}.${variantName} successor lock is missing`);
      assert.equal(variant.path, `assets/museum/${lock.hallFolder}/${id}-${variantName}.webp`);
      assert.equal(variant.width, expected.width, `${id}.${variantName} width differs from its lock`);
      assert.equal(variant.height, expected.height, `${id}.${variantName} height differs from its lock`);
      assert.equal(statSync(path).size, expected.bytes, `${id}.${variantName} byte count drifted`);
      assert.equal(sha256(path), expected.sha256, `${id}.${variantName} SHA-256 drifted`);
      assert.deepEqual(webpDimensions(path), {width: expected.width, height: expected.height}, `${id}.${variantName} locked dimensions drifted`);
    }
  }
  assert.deepEqual(Object.fromEntries([...countsByFolder].sort()), {
    'hellenistic-roman-ways': 17,
    'late-antiquity-inheritance': 17,
  });
});

check('the 42-source Galleries 13 and 16 lock reproduces every curated derivative', () => {
  assert.equal(galleries13And16Manifest.version, 1);
  assert.equal(Object.keys(galleries13And16ManifestAssets).length, 42);
  const previouslyLockedIds = new Set([
    ...Object.keys(manifestAssets),
    ...Object.keys(mediterraneanManifestAssets),
    ...Object.keys(successorManifestAssets),
  ]);
  assert.equal(previouslyLockedIds.size, 377, 'The pre-Gallery-13/16 source-lock inventories overlap');
  for (const id of Object.keys(galleries13And16ManifestAssets)) {
    assert(!previouslyLockedIds.has(id), `${id} is redundantly owned by an older preparation manifest`);
  }
  assert.equal(previouslyLockedIds.size + Object.keys(galleries13And16ManifestAssets).length, 419);
  assert.match(galleries13And16PreparationSource, /museumGalleries13And16AssetManifest\.json/);
  assert.match(galleries13And16PreparationSource, /EXPECTED_ASSET_COUNT = 42/);
  assert.match(galleries13And16PreparationSource, /assert_locked\(slug, "scene"/);
  assert.match(galleries13And16PreparationSource, /assert_locked\(slug, "panel"/);
  assert.match(galleries13And16PreparationSource, /"sha256": sha256\(destination\)/);
  const countsByFolder = new Map();
  for (const [id, lock] of Object.entries(galleries13And16ManifestAssets)) {
    const asset = assetById.get(id);
    assert(asset, `${id} Gallery 13/16 lock has no asset record`);
    assert(
      ['latin-christian-scholastic', 'rationalism-mind-nature-system'].includes(lock.hallFolder),
      `${id} has invalid Gallery 13/16 folder ${lock.hallFolder}`,
    );
    countsByFolder.set(lock.hallFolder, (countsByFolder.get(lock.hallFolder) ?? 0) + 1);
    assert.equal(lock.sourcePageUrl, asset.sourcePageUrl, `${id} source lock differs from runtime provenance`);
    for (const field of ['sourcePageUrl', 'sourceImageUrl', 'selectedThumbnailUrl']) {
      assert(lock[field]?.startsWith('https://'), `${id}.${field} must be locked HTTPS`);
    }
    for (const variantName of ['scene', 'panel']) {
      const variant = asset.variants[variantName];
      const expected = lock[variantName];
      assert(expected, `${id}.${variantName} Gallery 13/16 lock is missing`);
      assert(Number.isSafeInteger(expected.width) && expected.width > 0, `${id}.${variantName}.width is invalid`);
      assert(Number.isSafeInteger(expected.height) && expected.height > 0, `${id}.${variantName}.height is invalid`);
      assert(Number.isSafeInteger(expected.bytes) && expected.bytes > 0, `${id}.${variantName}.bytes is invalid`);
      assert.match(expected.sha256 ?? '', /^[0-9a-f]{64}$/, `${id}.${variantName}.sha256 is invalid`);
      assert.equal(variant.path, `assets/museum/${lock.hallFolder}/${id}-${variantName}.webp`);
      assert.equal(variant.width, expected.width, `${id}.${variantName} width differs from its lock`);
      assert.equal(variant.height, expected.height, `${id}.${variantName} height differs from its lock`);
      const path = exactCasePath(variant.path);
      assert.equal(statSync(path).size, expected.bytes, `${id}.${variantName} byte count drifted`);
      assert.equal(sha256(path), expected.sha256, `${id}.${variantName} SHA-256 drifted`);
      assert.deepEqual(webpDimensions(path), {width: expected.width, height: expected.height}, `${id}.${variantName} locked dimensions drifted`);
    }
  }
  assert.deepEqual(Object.fromEntries([...countsByFolder].sort()), {
    'latin-christian-scholastic': 24,
    'rationalism-mind-nature-system': 18,
  });
});

check('the 44-source Galleries 17 and 18 locks reproduce every curated derivative without source or hash reuse', () => {
  assert.equal(gallery17Manifest.version, 1);
  assert.equal(gallery18Manifest.version, 1);
  assert.equal(Object.keys(gallery17ManifestAssets).length, 18);
  assert.equal(Object.keys(gallery18ManifestAssets).length, 26);

  const previousManifestAssets = {
    ...manifestAssets,
    ...mediterraneanManifestAssets,
    ...successorManifestAssets,
    ...galleries13And16ManifestAssets,
  };
  const previouslyLockedIds = new Set(Object.keys(previousManifestAssets));
  const newManifestAssets = {...gallery17ManifestAssets, ...gallery18ManifestAssets};
  const newManifestIds = Object.keys(newManifestAssets);
  assert.equal(previouslyLockedIds.size, 419, 'The pre-Gallery-17/18 source-lock inventories overlap');
  assert.equal(newManifestIds.length, 44, 'The Gallery 17/18 source-lock inventories overlap');
  for (const id of newManifestIds) {
    assert(!previouslyLockedIds.has(id), `${id} is redundantly owned by an older preparation manifest`);
  }
  assert.equal(previouslyLockedIds.size + newManifestIds.length, 463);

  for (const [source, manifestName, count] of [
    [gallery17PreparationSource, 'museumGallery17AssetManifest.json', 18],
    [gallery18PreparationSource, 'museumGallery18AssetManifest.json', 26],
  ]) {
    assert(source.includes(manifestName), `preparation pipeline omits ${manifestName}`);
    assert.match(source, new RegExp(`EXPECTED_ASSET_COUNT = ${count}`));
    assert.match(source, /assert_locked\(slug, "scene"/);
    assert.match(source, /assert_locked\(slug, "panel"/);
    assert.match(source, /"sha256": sha256\(destination\)/);
    assert.match(source, /visualCharacter/);
    assert.match(source, /textDominantOrSingleBook/);
  }

  const previousSourcePages = new Set(Object.values(previousManifestAssets).map(({sourcePageUrl}) => sourcePageUrl));
  const previousSceneHashes = new Set(Object.values(previousManifestAssets).map(({scene}) => scene.sha256));
  const previousPanelHashes = new Set(Object.values(previousManifestAssets).map(({panel}) => panel.sha256));
  const newSourcePages = [];
  const newSceneHashes = [];
  const newPanelHashes = [];
  const countsByFolder = new Map();
  for (const [id, lock] of Object.entries(newManifestAssets)) {
    const asset = assetById.get(id);
    assert(asset, `${id} Gallery 17/18 lock has no asset record`);
    assert(
      ['empiricism-science-political-order', 'enlightenment-revolution-kant'].includes(lock.hallFolder),
      `${id} has invalid Gallery 17/18 folder ${lock.hallFolder}`,
    );
    countsByFolder.set(lock.hallFolder, (countsByFolder.get(lock.hallFolder) ?? 0) + 1);
    assert.equal(lock.sourcePageUrl, asset.sourcePageUrl, `${id} source lock differs from runtime provenance`);
    assert.equal(lock.visualCharacter, asset.visualCharacter, `${id} visual-character lock differs from runtime metadata`);
    for (const field of ['sourcePageUrl', 'sourceImageUrl', 'selectedThumbnailUrl']) {
      assert(lock[field]?.startsWith('https://'), `${id}.${field} must be locked HTTPS`);
    }
    const trustedExternalSource = TRUSTED_EXTERNAL_SOURCE_LOCKS.get(id);
    if (trustedExternalSource) {
      assert.equal(lock.sourcePageUrl, trustedExternalSource.sourcePageUrl, `${id} trusted source page changed`);
      assert.equal(lock.sourceImageUrl, trustedExternalSource.sourceImageUrl, `${id} trusted source image changed`);
      assert.equal(lock.selectedThumbnailUrl, trustedExternalSource.selectedThumbnailUrl, `${id} trusted thumbnail changed`);
    } else {
      assert.equal(new URL(lock.sourcePageUrl).hostname, 'commons.wikimedia.org', `${id} source page must use Commons`);
      assert(new URL(lock.sourcePageUrl).pathname.startsWith('/wiki/File:'), `${id} source page must identify an exact Commons file`);
    }
    assert(!previousSourcePages.has(lock.sourcePageUrl), `${id} reuses a source page owned by an earlier manifest`);
    newSourcePages.push(lock.sourcePageUrl);
    for (const variantName of ['scene', 'panel']) {
      const variant = asset.variants[variantName];
      const expected = lock[variantName];
      assert(expected, `${id}.${variantName} Gallery 17/18 lock is missing`);
      assert(Number.isSafeInteger(expected.width) && expected.width > 0, `${id}.${variantName}.width is invalid`);
      assert(Number.isSafeInteger(expected.height) && expected.height > 0, `${id}.${variantName}.height is invalid`);
      assert(Number.isSafeInteger(expected.bytes) && expected.bytes > 0, `${id}.${variantName}.bytes is invalid`);
      assert.match(expected.sha256 ?? '', /^[0-9a-f]{64}$/, `${id}.${variantName}.sha256 is invalid`);
      assert.equal(variant.path, `assets/museum/${lock.hallFolder}/${id}-${variantName}.webp`);
      assert.equal(variant.width, expected.width, `${id}.${variantName} width differs from its lock`);
      assert.equal(variant.height, expected.height, `${id}.${variantName} height differs from its lock`);
      const path = exactCasePath(variant.path);
      assert.equal(statSync(path).size, expected.bytes, `${id}.${variantName} byte count drifted`);
      assert.equal(sha256(path), expected.sha256, `${id}.${variantName} SHA-256 drifted`);
      assert.deepEqual(webpDimensions(path), {width: expected.width, height: expected.height}, `${id}.${variantName} locked dimensions drifted`);
      if (variantName === 'scene') {
        assert(!previousSceneHashes.has(expected.sha256), `${id}.scene reuses bytes owned by an earlier manifest`);
        newSceneHashes.push(expected.sha256);
      } else {
        assert(!previousPanelHashes.has(expected.sha256), `${id}.panel reuses bytes owned by an earlier manifest`);
        newPanelHashes.push(expected.sha256);
      }
    }
  }
  assert(unique(newSourcePages), 'Galleries 17 and 18 reuse an exact source page');
  assert(unique(newSceneHashes), 'Galleries 17 and 18 reuse identical scene bytes');
  assert(unique(newPanelHashes), 'Galleries 17 and 18 reuse identical panel bytes');
  assert.deepEqual(Object.fromEntries([...countsByFolder].sort()), {
    'empiricism-science-political-order': 18,
    'enlightenment-revolution-kant': 26,
  });
  const molyneuxAsset = assetById.get('locke-molyneux-ribera-touch');
  assert.equal(molyneuxAsset?.mediaKind, 'painting', 'Molyneux still uses clinical photography');
  assert.match(molyneuxAsset?.title ?? '', /Sense of Touch/u, 'Molyneux lost its tactile-visual companion');
  assert.doesNotMatch(JSON.stringify(molyneuxAsset), /surgery|operation/iu, 'Molyneux still carries surgical imagery metadata');
  const genevaLock = gallery18ManifestAssets['enlightenment-geneva-gardelle-view'];
  assert.deepEqual(genevaLock.crop, {left: 0, top: 0, right: 1920, bottom: 823}, 'Geneva calibration-strip crop drifted');
  assert.equal(genevaLock.panel.height, 548, 'Geneva panel no longer preserves the reviewed 2× scene ratio after excluding the calibration strip');
  assert.match(gallery18PreparationSource, /image = image\.crop\(box\)/u, 'Gallery 18 preparation does not reproduce the reviewed crop');
});

check('Galleries 17 and 18 preserve the approved visual-diversity limits', () => {
  for (const {galleryName, assets, maximumTextDominant} of [
    {galleryName: 'Gallery 17', assets: gallery17ManifestAssets, maximumTextDominant: 3},
    {galleryName: 'Gallery 18', assets: gallery18ManifestAssets, maximumTextDominant: 4},
  ]) {
    const entries = Object.entries(assets);
    const textDominantIds = entries
      .filter(([, lock]) => lock.visualCharacter === 'text-dominant')
      .map(([id]) => id);
    const loneBookIds = entries
      .filter(([, lock]) => lock.textDominantOrSingleBook === true && lock.visualCharacter !== 'text-dominant')
      .map(([id]) => id);
    const nonTextVisualCategories = new Set(
      entries
        .map(([, lock]) => lock.visualCharacter)
        .filter((visualCharacter) => visualCharacter !== 'text-dominant'),
    );
    for (const [id, lock] of entries) {
      assert.equal(typeof lock.textDominantOrSingleBook, 'boolean', `${id} lacks an explicit text/lone-book classification`);
      if (lock.visualCharacter === 'text-dominant') {
        assert.equal(lock.textDominantOrSingleBook, true, `${id} text-dominant classification is not explicitly flagged`);
      }
    }
    assert(
      textDominantIds.length <= maximumTextDominant,
      `${galleryName} exceeds its ${maximumTextDominant}-asset text-dominant limit: ${textDominantIds.join(', ')}`,
    );
    assert.equal(loneBookIds.length, 0, `${galleryName} contains lone-book imagery: ${loneBookIds.join(', ')}`);
    assert(
      nonTextVisualCategories.size >= 4,
      `${galleryName} needs at least four non-text visual categories; found ${[...nonTextVisualCategories].sort().join(', ')}`,
    );
  }
});

check('the 43-source Galleries 20 and 21 lock reproduces every derivative without source or hash reuse', () => {
  assert.equal(galleries20And21Manifest.version, 1);
  assert.equal(Object.keys(galleries20And21ManifestAssets).length, 43);
  assert.match(galleries20And21PreparationSource, /museumGalleries20And21AssetManifest\.json/);
  assert.match(galleries20And21PreparationSource, /EXPECTED_ASSET_COUNT = 43/);
  assert.match(galleries20And21PreparationSource, /assert_locked\(slug, "scene"/);
  assert.match(galleries20And21PreparationSource, /assert_locked\(slug, "panel"/);
  assert.match(galleries20And21PreparationSource, /"sha256": sha256\(destination\)/);
  assert.match(galleries20And21PreparationSource, /visualCharacter/);
  assert.match(galleries20And21PreparationSource, /textDominantOrSingleBook/);

  const previousManifestAssets = {
    ...manifestAssets,
    ...mediterraneanManifestAssets,
    ...successorManifestAssets,
    ...galleries13And16ManifestAssets,
    ...gallery17ManifestAssets,
    ...gallery18ManifestAssets,
  };
  const previouslyLockedIds = new Set(Object.keys(previousManifestAssets));
  assert.equal(previouslyLockedIds.size, 463, 'The pre-Gallery-20/21 source-lock inventories overlap');
  const previousSourcePages = new Set(Object.values(previousManifestAssets).map(({sourcePageUrl}) => sourcePageUrl));
  const previousSceneHashes = new Set(Object.values(previousManifestAssets).map(({scene}) => scene.sha256));
  const previousPanelHashes = new Set(Object.values(previousManifestAssets).map(({panel}) => panel.sha256));
  const sourcePages = [];
  const sceneHashes = [];
  const panelHashes = [];
  const countsByFolder = new Map();

  for (const [id, lock] of Object.entries(galleries20And21ManifestAssets)) {
    assert(!previouslyLockedIds.has(id), `${id} is redundantly owned by an older preparation manifest`);
    const asset = assetById.get(id);
    assert(asset, `${id} Gallery 20/21 lock has no asset record`);
    assert(
      ['utility-liberty-history-capital', 'faith-pessimism-life-value'].includes(lock.hallFolder),
      `${id} has invalid Gallery 20/21 folder ${lock.hallFolder}`,
    );
    countsByFolder.set(lock.hallFolder, (countsByFolder.get(lock.hallFolder) ?? 0) + 1);
    assert.equal(lock.sourcePageUrl, asset.sourcePageUrl, `${id} source lock differs from runtime provenance`);
    assert.equal(lock.visualCharacter, asset.visualCharacter, `${id} visual-character lock differs from runtime metadata`);
    assert.equal(lock.textDominantOrSingleBook, false, `${id} violates the no paper-only/lone-book gate`);
    for (const field of ['sourcePageUrl', 'sourceImageUrl', 'selectedThumbnailUrl']) {
      assert(lock[field]?.startsWith('https://'), `${id}.${field} must be locked HTTPS`);
    }
    assert.equal(new URL(lock.sourcePageUrl).hostname, 'commons.wikimedia.org', `${id} source page must use Commons`);
    assert(new URL(lock.sourcePageUrl).pathname.startsWith('/wiki/File:'), `${id} source page must identify an exact Commons file`);
    assert(!previousSourcePages.has(lock.sourcePageUrl), `${id} reuses a source page owned by an earlier manifest`);
    sourcePages.push(lock.sourcePageUrl);
    for (const variantName of ['scene', 'panel']) {
      const variant = asset.variants[variantName];
      const expected = lock[variantName];
      assert(expected, `${id}.${variantName} Gallery 20/21 lock is missing`);
      assert(Number.isSafeInteger(expected.width) && expected.width > 0, `${id}.${variantName}.width is invalid`);
      assert(Number.isSafeInteger(expected.height) && expected.height > 0, `${id}.${variantName}.height is invalid`);
      assert(Number.isSafeInteger(expected.bytes) && expected.bytes > 0, `${id}.${variantName}.bytes is invalid`);
      assert.match(expected.sha256 ?? '', /^[0-9a-f]{64}$/, `${id}.${variantName}.sha256 is invalid`);
      assert.equal(variant.path, `assets/museum/${lock.hallFolder}/${id}-${variantName}.webp`);
      assert.equal(variant.width, expected.width, `${id}.${variantName} width differs from its lock`);
      assert.equal(variant.height, expected.height, `${id}.${variantName} height differs from its lock`);
      const path = exactCasePath(variant.path);
      assert.equal(statSync(path).size, expected.bytes, `${id}.${variantName} byte count drifted`);
      assert.equal(sha256(path), expected.sha256, `${id}.${variantName} SHA-256 drifted`);
      assert.deepEqual(webpDimensions(path), {width: expected.width, height: expected.height}, `${id}.${variantName} locked dimensions drifted`);
      if (variantName === 'scene') {
        assert(!previousSceneHashes.has(expected.sha256), `${id}.scene reuses bytes owned by an earlier manifest`);
        sceneHashes.push(expected.sha256);
      } else {
        assert(!previousPanelHashes.has(expected.sha256), `${id}.panel reuses bytes owned by an earlier manifest`);
        panelHashes.push(expected.sha256);
      }
    }
  }
  assert.equal(previouslyLockedIds.size + Object.keys(galleries20And21ManifestAssets).length, 506);
  assert(unique(sourcePages), 'Galleries 20 and 21 reuse an exact source page');
  assert(unique(sceneHashes), 'Galleries 20 and 21 reuse identical scene bytes');
  assert(unique(panelHashes), 'Galleries 20 and 21 reuse identical panel bytes');
  assert.deepEqual(Object.fromEntries([...countsByFolder].sort()), {
    'faith-pessimism-life-value': 18,
    'utility-liberty-history-capital': 25,
  });
});

check('the 49-source Galleries 19 and 22 lock reproduces every derivative without source or hash reuse', () => {
  assert.equal(galleries19And22Manifest.version, 1);
  assert.equal(Object.keys(galleries19And22ManifestAssets).length, 49);
  assert.match(galleries19And22PreparationSource, /museumGalleries19And22AssetManifest\.json/);
  assert.match(galleries19And22PreparationSource, /EXPECTED_ASSET_COUNT = 49/);
  assert.match(galleries19And22PreparationSource, /assert_locked\(slug, "scene"/);
  assert.match(galleries19And22PreparationSource, /assert_locked\(slug, "panel"/);
  assert.match(galleries19And22PreparationSource, /"sha256": sha256\(destination\)/);
  assert.match(galleries19And22PreparationSource, /visualCharacter/);
  assert.match(galleries19And22PreparationSource, /textDominantOrSingleBook/);

  const previousManifestAssets = {
    ...manifestAssets,
    ...mediterraneanManifestAssets,
    ...successorManifestAssets,
    ...galleries13And16ManifestAssets,
    ...gallery17ManifestAssets,
    ...gallery18ManifestAssets,
    ...galleries20And21ManifestAssets,
  };
  const previouslyLockedIds = new Set(Object.keys(previousManifestAssets));
  assert.equal(previouslyLockedIds.size, 506, 'The pre-Gallery-19/22 source-lock inventories overlap');
  const previousSourcePages = new Set(Object.values(previousManifestAssets).map(({sourcePageUrl}) => sourcePageUrl));
  const previousSceneHashes = new Set(Object.values(previousManifestAssets).map(({scene}) => scene.sha256));
  const previousPanelHashes = new Set(Object.values(previousManifestAssets).map(({panel}) => panel.sha256));
  const sourcePages = [];
  const sceneHashes = [];
  const panelHashes = [];
  const countsByFolder = new Map();

  for (const [id, lock] of Object.entries(galleries19And22ManifestAssets)) {
    assert(!previouslyLockedIds.has(id), `${id} is redundantly owned by an older preparation manifest`);
    const asset = assetById.get(id);
    assert(asset, `${id} Gallery 19/22 lock has no asset record`);
    assert(
      ['german-idealism-afterlives', 'pragmatism-democratic-inquiry'].includes(lock.hallFolder),
      `${id} has invalid Gallery 19/22 folder ${lock.hallFolder}`,
    );
    countsByFolder.set(lock.hallFolder, (countsByFolder.get(lock.hallFolder) ?? 0) + 1);
    assert.equal(lock.sourcePageUrl, asset.sourcePageUrl, `${id} source lock differs from runtime provenance`);
    assert.equal(lock.visualCharacter, asset.visualCharacter, `${id} visual-character lock differs from runtime metadata`);
    assert.equal(lock.textDominantOrSingleBook, false, `${id} violates the no paper-only/lone-book gate`);
    for (const field of ['sourcePageUrl', 'sourceImageUrl', 'selectedThumbnailUrl']) {
      assert(lock[field]?.startsWith('https://'), `${id}.${field} must be locked HTTPS`);
    }
    assert.equal(new URL(lock.sourcePageUrl).hostname, 'commons.wikimedia.org', `${id} source page must use Commons`);
    assert(new URL(lock.sourcePageUrl).pathname.startsWith('/wiki/File:'), `${id} source page must identify an exact Commons file`);
    assert(!previousSourcePages.has(lock.sourcePageUrl), `${id} reuses a source page owned by an earlier manifest`);
    sourcePages.push(lock.sourcePageUrl);
    for (const variantName of ['scene', 'panel']) {
      const variant = asset.variants[variantName];
      const expected = lock[variantName];
      assert(expected, `${id}.${variantName} Gallery 19/22 lock is missing`);
      assert(Number.isSafeInteger(expected.width) && expected.width > 0, `${id}.${variantName}.width is invalid`);
      assert(Number.isSafeInteger(expected.height) && expected.height > 0, `${id}.${variantName}.height is invalid`);
      assert(Number.isSafeInteger(expected.bytes) && expected.bytes > 0, `${id}.${variantName}.bytes is invalid`);
      assert.match(expected.sha256 ?? '', /^[0-9a-f]{64}$/, `${id}.${variantName}.sha256 is invalid`);
      assert.equal(variant.path, `assets/museum/${lock.hallFolder}/${id}-${variantName}.webp`);
      assert.equal(variant.width, expected.width, `${id}.${variantName} width differs from its lock`);
      assert.equal(variant.height, expected.height, `${id}.${variantName} height differs from its lock`);
      const path = exactCasePath(variant.path);
      assert.equal(statSync(path).size, expected.bytes, `${id}.${variantName} byte count drifted`);
      assert.equal(sha256(path), expected.sha256, `${id}.${variantName} SHA-256 drifted`);
      assert.deepEqual(webpDimensions(path), {width: expected.width, height: expected.height}, `${id}.${variantName} locked dimensions drifted`);
      if (variantName === 'scene') {
        assert(!previousSceneHashes.has(expected.sha256), `${id}.scene reuses bytes owned by an earlier manifest`);
        sceneHashes.push(expected.sha256);
      } else {
        assert(!previousPanelHashes.has(expected.sha256), `${id}.panel reuses bytes owned by an earlier manifest`);
        panelHashes.push(expected.sha256);
      }
    }
  }
  assert.equal(previouslyLockedIds.size + Object.keys(galleries19And22ManifestAssets).length, 555);
  assert(unique(sourcePages), 'Galleries 19 and 22 reuse an exact source page');
  assert(unique(sceneHashes), 'Galleries 19 and 22 reuse identical scene bytes');
  assert(unique(panelHashes), 'Galleries 19 and 22 reuse identical panel bytes');
  assert.deepEqual(Object.fromEntries([...countsByFolder].sort()), {
    'german-idealism-afterlives': 25,
    'pragmatism-democratic-inquiry': 24,
  });
});

check('the 48-source Galleries 23 and 24 lock reproduces every derivative without source or hash reuse', () => {
  assert.equal(galleries23And24Manifest.version, 1);
  assert.equal(Object.keys(galleries23And24ManifestAssets).length, 48);
  assert.match(galleries23And24PreparationSource, /museumGalleries23And24AssetManifest\.json/);
  assert.match(galleries23And24PreparationSource, /EXPECTED_ASSET_COUNT = 48/);
  assert.match(galleries23And24PreparationSource, /assert_locked\(slug, "scene"/);
  assert.match(galleries23And24PreparationSource, /assert_locked\(slug, "panel"/);
  assert.match(galleries23And24PreparationSource, /"sha256": sha256\(destination\)/);
  assert.match(galleries23And24PreparationSource, /visualCharacter/);
  assert.match(galleries23And24PreparationSource, /textDominantOrSingleBook/);

  const previousManifestAssets = {
    ...manifestAssets,
    ...mediterraneanManifestAssets,
    ...successorManifestAssets,
    ...galleries13And16ManifestAssets,
    ...gallery17ManifestAssets,
    ...gallery18ManifestAssets,
    ...galleries20And21ManifestAssets,
    ...galleries19And22ManifestAssets,
  };
  const previouslyLockedIds = new Set(Object.keys(previousManifestAssets));
  assert.equal(previouslyLockedIds.size, 555, 'The pre-Gallery-23/24 source-lock inventories overlap');
  const previousSourcePages = new Set(Object.values(previousManifestAssets).map(({sourcePageUrl}) => sourcePageUrl));
  const previousSceneHashes = new Set(Object.values(previousManifestAssets).map(({scene}) => scene.sha256));
  const previousPanelHashes = new Set(Object.values(previousManifestAssets).map(({panel}) => panel.sha256));
  const sourcePages = [];
  const sceneHashes = [];
  const panelHashes = [];
  const countsByFolder = new Map();

  for (const [id, lock] of Object.entries(galleries23And24ManifestAssets)) {
    assert(!previouslyLockedIds.has(id), `${id} is redundantly owned by an older preparation manifest`);
    const asset = assetById.get(id);
    assert(asset, `${id} Gallery 23/24 lock has no asset record`);
    assert(
      ['critique-power-deconstruction', 'moral-life-practical-reason'].includes(lock.hallFolder),
      `${id} has invalid Gallery 23/24 folder ${lock.hallFolder}`,
    );
    countsByFolder.set(lock.hallFolder, (countsByFolder.get(lock.hallFolder) ?? 0) + 1);
    assert.equal(lock.sourcePageUrl, asset.sourcePageUrl, `${id} source lock differs from runtime provenance`);
    assert.equal(lock.visualCharacter, asset.visualCharacter, `${id} visual-character lock differs from runtime metadata`);
    assert.equal(lock.textDominantOrSingleBook, false, `${id} violates the no paper-only/lone-book gate`);
    for (const field of ['sourcePageUrl', 'sourceImageUrl', 'selectedThumbnailUrl']) {
      assert(lock[field]?.startsWith('https://'), `${id}.${field} must be locked HTTPS`);
    }
    assert.equal(new URL(lock.sourcePageUrl).hostname, 'commons.wikimedia.org', `${id} source page must use Commons`);
    assert(new URL(lock.sourcePageUrl).pathname.startsWith('/wiki/File:'), `${id} source page must identify an exact Commons file`);
    assert(!previousSourcePages.has(lock.sourcePageUrl), `${id} reuses a source page owned by an earlier manifest`);
    sourcePages.push(lock.sourcePageUrl);
    for (const variantName of ['scene', 'panel']) {
      const variant = asset.variants[variantName];
      const expected = lock[variantName];
      assert(expected, `${id}.${variantName} Gallery 23/24 lock is missing`);
      assert(Number.isSafeInteger(expected.width) && expected.width > 0, `${id}.${variantName}.width is invalid`);
      assert(Number.isSafeInteger(expected.height) && expected.height > 0, `${id}.${variantName}.height is invalid`);
      assert(Number.isSafeInteger(expected.bytes) && expected.bytes > 0, `${id}.${variantName}.bytes is invalid`);
      assert.match(expected.sha256 ?? '', /^[0-9a-f]{64}$/, `${id}.${variantName}.sha256 is invalid`);
      assert.equal(variant.path, `assets/museum/${lock.hallFolder}/${id}-${variantName}.webp`);
      assert.equal(variant.width, expected.width, `${id}.${variantName} width differs from its lock`);
      assert.equal(variant.height, expected.height, `${id}.${variantName} height differs from its lock`);
      const path = exactCasePath(variant.path);
      assert.equal(statSync(path).size, expected.bytes, `${id}.${variantName} byte count drifted`);
      assert.equal(sha256(path), expected.sha256, `${id}.${variantName} SHA-256 drifted`);
      assert.deepEqual(webpDimensions(path), {width: expected.width, height: expected.height}, `${id}.${variantName} locked dimensions drifted`);
      if (variantName === 'scene') {
        assert(!previousSceneHashes.has(expected.sha256), `${id}.scene reuses bytes owned by an earlier manifest`);
        sceneHashes.push(expected.sha256);
      } else {
        assert(!previousPanelHashes.has(expected.sha256), `${id}.panel reuses bytes owned by an earlier manifest`);
        panelHashes.push(expected.sha256);
      }
    }
  }
  assert.equal(previouslyLockedIds.size + Object.keys(galleries23And24ManifestAssets).length, 603);
  assert(unique(sourcePages), 'Galleries 23 and 24 reuse an exact source page');
  assert(unique(sceneHashes), 'Galleries 23 and 24 reuse identical scene bytes');
  assert(unique(panelHashes), 'Galleries 23 and 24 reuse identical panel bytes');
  assert.deepEqual(Object.fromEntries([...countsByFolder].sort()), {
    'critique-power-deconstruction': 24,
    'moral-life-practical-reason': 24,
  });
});

check('the 18-source Gallery 26 lock reproduces every derivative without source or hash reuse', () => {
  assert.equal(gallery26Manifest.version, 1);
  assert.equal(Object.keys(gallery26ManifestAssets).length, 18);
  assert.match(gallery26PreparationSource, /museumGallery26AssetManifest\.json/);
  assert.match(gallery26PreparationSource, /EXPECTED_ASSET_COUNT = 18/);
  assert.match(gallery26PreparationSource, /EXPECTED_VISUAL_CHARACTER_MINIMUM = 4/);
  assert.match(gallery26PreparationSource, /NEAR_DUPLICATE_DISTANCE_LIMIT = 6/);
  assert.match(gallery26PreparationSource, /assert_locked\(/);
  assert.match(gallery26PreparationSource, /"sha256": sha256\(destination\)/);
  assert.match(gallery26PreparationSource, /textDominantOrSingleBook/);
  assert.match(gallery26PreparationSource, /assert_no_local_asset_collisions/);
  assert.match(gallery26PreparationSource, /--refresh-locks/);

  const previousManifestAssets = {
    ...manifestAssets,
    ...mediterraneanManifestAssets,
    ...successorManifestAssets,
    ...galleries13And16ManifestAssets,
    ...gallery17ManifestAssets,
    ...gallery18ManifestAssets,
    ...galleries20And21ManifestAssets,
    ...galleries19And22ManifestAssets,
    ...galleries23And24ManifestAssets,
  };
  const previouslyLockedIds = new Set(Object.keys(previousManifestAssets));
  assert.equal(previouslyLockedIds.size, 603, 'The pre-Gallery-26 source-lock inventories overlap');
  const previousSourcePages = new Set(Object.values(previousManifestAssets).map(({sourcePageUrl}) => sourcePageUrl));
  const previousSceneHashes = new Set(Object.values(previousManifestAssets).map(({scene}) => scene.sha256));
  const previousPanelHashes = new Set(Object.values(previousManifestAssets).map(({panel}) => panel.sha256));
  const sourcePages = [];
  const sceneHashes = [];
  const panelHashes = [];
  const visualCharacters = new Set();

  for (const [id, lock] of Object.entries(gallery26ManifestAssets)) {
    assert(!previouslyLockedIds.has(id), `${id} is redundantly owned by an older preparation manifest`);
    const asset = assetById.get(id);
    assert(asset, `${id} Gallery 26 lock has no asset record`);
    assert.equal(lock.hallFolder, 'colonialism-race-liberation', `${id} has an invalid Gallery 26 folder`);
    assert.equal(lock.sourcePageUrl, asset.sourcePageUrl, `${id} source lock differs from runtime provenance`);
    assert.equal(lock.visualCharacter, asset.visualCharacter, `${id} visual-character lock differs from runtime metadata`);
    assert.equal(lock.textDominantOrSingleBook, false, `${id} violates the no paper-only/lone-book gate`);
    assert.notEqual(lock.visualCharacter, 'text-dominant', `${id} is text-dominant`);
    visualCharacters.add(lock.visualCharacter);
    for (const field of ['sourcePageUrl', 'sourceImageUrl', 'selectedThumbnailUrl']) {
      assert(lock[field]?.startsWith('https://'), `${id}.${field} must be locked HTTPS`);
    }
    assert.equal(new URL(lock.sourcePageUrl).hostname, 'commons.wikimedia.org', `${id} source page must use Commons`);
    assert(new URL(lock.sourcePageUrl).pathname.startsWith('/wiki/File:'), `${id} source page must identify an exact Commons file`);
    assert(!previousSourcePages.has(lock.sourcePageUrl), `${id} reuses a source page owned by an earlier manifest`);
    sourcePages.push(lock.sourcePageUrl);
    for (const variantName of ['scene', 'panel']) {
      const variant = asset.variants[variantName];
      const expected = lock[variantName];
      assert(expected, `${id}.${variantName} Gallery 26 lock is missing`);
      assert(Number.isSafeInteger(expected.width) && expected.width > 0, `${id}.${variantName}.width is invalid`);
      assert(Number.isSafeInteger(expected.height) && expected.height > 0, `${id}.${variantName}.height is invalid`);
      assert(Number.isSafeInteger(expected.bytes) && expected.bytes > 0, `${id}.${variantName}.bytes is invalid`);
      assert.match(expected.sha256 ?? '', /^[0-9a-f]{64}$/, `${id}.${variantName}.sha256 is invalid`);
      assert.equal(variant.path, `assets/museum/colonialism-race-liberation/${id}-${variantName}.webp`);
      assert.equal(variant.width, expected.width, `${id}.${variantName} width differs from its lock`);
      assert.equal(variant.height, expected.height, `${id}.${variantName} height differs from its lock`);
      const path = exactCasePath(variant.path);
      assert.equal(statSync(path).size, expected.bytes, `${id}.${variantName} byte count drifted`);
      assert.equal(sha256(path), expected.sha256, `${id}.${variantName} SHA-256 drifted`);
      assert.deepEqual(webpDimensions(path), {width: expected.width, height: expected.height}, `${id}.${variantName} locked dimensions drifted`);
      if (variantName === 'scene') {
        assert(!previousSceneHashes.has(expected.sha256), `${id}.scene reuses bytes owned by an earlier manifest`);
        sceneHashes.push(expected.sha256);
      } else {
        assert(!previousPanelHashes.has(expected.sha256), `${id}.panel reuses bytes owned by an earlier manifest`);
        panelHashes.push(expected.sha256);
      }
    }
  }
  assert.equal(previouslyLockedIds.size + Object.keys(gallery26ManifestAssets).length, 621);
  assert.equal(visualCharacters.size >= 4, true, 'Gallery 26 has insufficient visual-character diversity');
  assert(unique(sourcePages), 'Gallery 26 reuses an exact source page');
  assert(unique(sceneHashes), 'Gallery 26 reuses identical scene bytes');
  assert(unique(panelHashes), 'Gallery 26 reuses identical panel bytes');
});

check('the 24-source Gallery 25 lock reproduces every derivative without source or hash reuse', () => {
  assert.equal(gallery25Manifest.version, 1);
  assert.equal(Object.keys(gallery25ManifestAssets).length, 24);
  assert.match(gallery25PreparationSource, /museumGallery25AssetManifest\.json/);
  assert.match(gallery25PreparationSource, /EXPECTED_ASSET_COUNT = 24/);
  assert.match(gallery25PreparationSource, /EXPECTED_HALL_FOLDER = "feminist-philosophies"/);
  const previousManifestAssets = {
    ...manifestAssets,
    ...mediterraneanManifestAssets,
    ...successorManifestAssets,
    ...galleries13And16ManifestAssets,
    ...gallery17ManifestAssets,
    ...gallery18ManifestAssets,
    ...galleries20And21ManifestAssets,
    ...galleries19And22ManifestAssets,
    ...galleries23And24ManifestAssets,
    ...gallery26ManifestAssets,
  };
  const previouslyLockedIds = new Set(Object.keys(previousManifestAssets));
  assert.equal(previouslyLockedIds.size, 621, 'The pre-Gallery-25 source-lock inventories overlap');
  const previousSourcePages = new Set(Object.values(previousManifestAssets).map(({sourcePageUrl}) => sourcePageUrl));
  const previousSceneHashes = new Set(Object.values(previousManifestAssets).map(({scene}) => scene.sha256));
  const previousPanelHashes = new Set(Object.values(previousManifestAssets).map(({panel}) => panel.sha256));
  const sourcePages = [];
  const sceneHashes = [];
  const panelHashes = [];
  const visualCharacters = new Set();
  for (const [id, lock] of Object.entries(gallery25ManifestAssets)) {
    assert(!previouslyLockedIds.has(id), `${id} is redundantly owned by an older manifest`);
    const asset = assetById.get(id);
    assert(asset, `${id} Gallery 25 lock has no asset record`);
    assert.equal(lock.hallFolder, 'feminist-philosophies');
    assert.equal(lock.sourcePageUrl, asset.sourcePageUrl);
    assert.equal(lock.visualCharacter, asset.visualCharacter);
    assert.equal(lock.textDominantOrSingleBook, false);
    assert.notEqual(lock.visualCharacter, 'text-dominant');
    assert(!previousSourcePages.has(lock.sourcePageUrl), `${id} reuses an earlier source page`);
    sourcePages.push(lock.sourcePageUrl);
    visualCharacters.add(lock.visualCharacter);
    for (const variantName of ['scene', 'panel']) {
      const variant = asset.variants[variantName];
      const expected = lock[variantName];
      assert(expected, `${id}.${variantName} Gallery 25 lock is missing`);
      assert.equal(variant.path, `assets/museum/feminist-philosophies/${id}-${variantName}.webp`);
      assert.equal(variant.width, expected.width);
      assert.equal(variant.height, expected.height);
      const path = exactCasePath(variant.path);
      assert.equal(statSync(path).size, expected.bytes);
      assert.equal(sha256(path), expected.sha256);
      assert.deepEqual(webpDimensions(path), {width: expected.width, height: expected.height});
      if (variantName === 'scene') {
        assert(!previousSceneHashes.has(expected.sha256), `${id}.scene reuses earlier bytes`);
        sceneHashes.push(expected.sha256);
      } else {
        assert(!previousPanelHashes.has(expected.sha256), `${id}.panel reuses earlier bytes`);
        panelHashes.push(expected.sha256);
      }
    }
  }
  assert.equal(previouslyLockedIds.size + Object.keys(gallery25ManifestAssets).length, 645);
  assert(visualCharacters.size >= 4);
  assert(unique(sourcePages));
  assert(unique(sceneHashes));
  assert(unique(panelHashes));
});

check('Galleries 14–15 fill 43 unique physical installations without image reuse', () => {
  const expected = new Map([
    ['hellenistic-roman-ways', {primary: 18, supplemental: 7, physical: 25}],
    ['late-antiquity-inheritance', {primary: 9, supplemental: 9, physical: 18}],
  ]);
  for (const [hallId, counts] of expected) {
    const hall = MUSEUM_HALLS.find(({id}) => id === hallId);
    const group = physicalSupplementalGroups.find(({galleryId}) => galleryId === hallId);
    assert(hall && group, `${hallId} is absent from the physical asset audit`);
    assert.equal(hall.exhibits.length, counts.primary, `${hallId} primary installation count changed`);
    assert.equal(group.layouts.length, counts.supplemental, `${hallId} supplemental installation count changed`);
    const ids = [
      ...hall.exhibits.flatMap(({principalAssetId, supportingAssetIds}) => [principalAssetId, ...supportingAssetIds].filter(Boolean)),
      ...group.layouts.map(({assetId}) => assetId),
    ];
    assert.equal(ids.length, counts.physical, `${hallId} physical media count changed`);
    assert.equal(new Set(ids).size, counts.physical, `${hallId} repeats a physical installation image`);
  }
});

check('the committed Museum inventory contains exactly the 1322 registered derivatives', () => {
  const actual = walkFiles(museumMediaRoot).map(toPublicPath).sort();
  const expected = MUSEUM_ASSETS.flatMap(({variants}) => [variants.scene.path, variants.panel.path]).sort();
  assert.deepEqual(actual, expected);
});

check('all asset URLs resolve beneath a non-root Vite base without runtime hotlinks', () => {
  for (const asset of MUSEUM_ASSETS) {
    for (const variant of Object.values(asset.variants)) {
      const url = museumAssetUrl(variant);
      assert.equal(url, `${auditBase}${variant.path}`);
      assert(!/^https?:/i.test(url), `${asset.id} emits a runtime hotlink`);
      assert(!url.includes('//assets/'), `${asset.id} emits a malformed base URL`);
    }
  }
});

check('scene-media policy keeps local images unlit, front-facing, and clear of frame rails', () => {
  assert.equal(MUSEUM_SCENE_MEDIA_MATERIAL_MODE, 'unlit-srgb');
  assert.equal(MUSEUM_SCENE_IMAGE_FACING, 'positive-z');
  assert.equal(MUSEUM_SCENE_IMAGE_FILTERING, 'linear-no-mipmaps-keyed-material');
  assert.equal(MUSEUM_SCENE_MEDIA_LOADING_COLOR, '#8b857a');
  assert(MUSEUM_SCENE_IMAGE_PLANE_Z > MUSEUM_FRAME_RAIL_FRONT_Z, 'image plane must sit in front of its frame rails');
  assert(MUSEUM_SCENE_IMAGE_PLANE_Z - MUSEUM_FRAME_RAIL_FRONT_Z >= .005, 'image plane lacks a stable anti-z-fighting gap');
  assert.match(sceneMediaSource, /<meshBasicMaterial key="scene-ready" map=\{textureState\.texture\} toneMapped=\{false\}\/>/);
  assert.match(sceneMediaSource, /texture\.minFilter = LinearFilter;/);
  assert.match(sceneMediaSource, /texture\.generateMipmaps = false;/);
  assert.match(sceneMediaSource, /texture\.colorSpace = SRGBColorSpace;/);
  assert.match(sceneMediaSource, /museumAssetUrl\(asset\.variants\.scene\)/);
  assert.doesNotMatch(sceneMediaSource, /<meshStandardMaterial key="scene-ready"/);
  assert.doesNotMatch(sceneMediaSource, /sourcePageUrl|objectPageUrl|selectedThumbnailUrl/);
});

console.log(`\nMuseum asset audit passed: ${checks} groups, ${MUSEUM_ASSETS.length} provenance records, ${MUSEUM_ASSETS.length * 2} local derivatives, ${Object.keys(manifestAssets).length * 2 + Object.keys(mediterraneanManifestAssets).length * 2 + Object.keys(successorManifestAssets).length * 2 + Object.keys(galleries13And16ManifestAssets).length * 2 + Object.keys(gallery17ManifestAssets).length * 2 + Object.keys(gallery18ManifestAssets).length * 2 + Object.keys(galleries20And21ManifestAssets).length * 2 + Object.keys(galleries19And22ManifestAssets).length * 2 + Object.keys(galleries23And24ManifestAssets).length * 2 + Object.keys(gallery26ManifestAssets).length * 2 + Object.keys(gallery25ManifestAssets).length * 2} exact hash locks, and ${referencedIds.length} live media placements.`);
