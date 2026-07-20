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
      export * from '/src/data/museum/platoSupplementalExhibits.ts';
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
const {
  MUSEUM_ASSETS,
  MUSEUM_HALLS,
  MUSEUM_FRAME_RAIL_FRONT_Z,
  MUSEUM_SCENE_IMAGE_FACING,
  MUSEUM_SCENE_IMAGE_FILTERING,
  MUSEUM_SCENE_IMAGE_PLANE_Z,
  MUSEUM_SCENE_MEDIA_LOADING_COLOR,
  MUSEUM_SCENE_MEDIA_MATERIAL_MODE,
  PLATO_SUPPLEMENTAL_EXHIBITS,
  museumAssetUrl,
} = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`);

const ACTIVE_HALL_IDS = [
  'mediterranean-beginnings-classical',
  'renaissance-humanism-new-method',
  'phenomenology-existence-embodiment',
  'analytic-traditions',
  'justice-democratic-reason',
  'core-questions-forum',
];
const MANAGED_HALL_FOLDERS = [
  'renaissance-reason-revolution',
  'modernity-freedom-critique',
  'logic-language-science',
  'ethics-justice-political-life',
  'mind-consciousness-self',
  'core-questions-forum',
  'renaissance-humanism-new-method',
  'justice-democratic-reason',
];
const NEW_CANONICAL_ASSET_IDS = [
  'jiddu-krishnamurti-bain-portrait',
  'jiddu-krishnamurti-besant-1927',
  'francis-bacon-portrait-1617',
  'alfred-north-whitehead-portrait-1923',
  'martha-nussbaum-portrait-2010',
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
  'plato-cave-saenredam-1604',
  'plato-republic-parisinus-1807',
];
const manifestAssets = modernManifest?.assets ?? {};
const mediterraneanManifestAssets = mediterraneanManifest?.assets ?? {};
const assetById = new Map(MUSEUM_ASSETS.map((asset) => [asset.id, asset]));
const liveExhibits = MUSEUM_HALLS.flatMap((hall) => hall.exhibits.map((exhibit) => ({hall, exhibit})));
const canonicalReferencedIds = liveExhibits.flatMap(({exhibit}) => [
  exhibit.principalAssetId,
  ...(exhibit.supportingAssetIds ?? []),
].filter(Boolean));
const supplementalReferencedIds = PLATO_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const referencedIds = [...canonicalReferencedIds, ...supplementalReferencedIds];

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

check('the canonical six expose 61 primaries with optional, resolvable local media references', () => {
  assert.deepEqual(MUSEUM_HALLS.map(({id}) => id), ACTIVE_HALL_IDS);
  assert.equal(liveExhibits.length, 61);
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
  assert.deepEqual(supplementalReferencedIds.sort(), ['plato-cave-saenredam-1604', 'plato-republic-parisinus-1807']);
  for (const exhibit of PLATO_SUPPLEMENTAL_EXHIBITS) {
    const asset = assetById.get(exhibit.assetId);
    assert(asset, `${exhibit.id} references missing asset ${exhibit.assetId}`);
    assert.equal(asset.entityKind, 'philosopher', `${exhibit.assetId} must remain attached to Plato`);
    assert.equal(asset.entityId, 'plato', `${exhibit.assetId} must remain attached to Plato`);
  }
});

check('the preserved asset registry contains 122 unique records and derivative paths', () => {
  assert.equal(MUSEUM_ASSETS.length, 122);
  assert.equal(assetById.size, 122);
  const variantPaths = MUSEUM_ASSETS.flatMap(({variants}) => [variants.scene.path, variants.panel.path]);
  assert.equal(variantPaths.length, 244);
  assert(unique(variantPaths), 'two asset variants share a derivative path');
  for (const id of NEW_CANONICAL_ASSET_IDS) assert(assetById.has(id), `new canonical asset ${id} is missing`);
  for (const id of MEDITERRANEAN_ASSET_IDS) assert(assetById.has(id), `Gallery 01 asset ${id} is missing`);
});

check('all asset records carry complete provenance, rights, interpretation, and accessibility metadata', () => {
  const allowedRoles = new Set(['identity', 'primary-source', 'material-history', 'context']);
  const allowedKinds = new Set(['sculpture-photograph', 'painting', 'engraving', 'manuscript', 'papyrus', 'book-page', 'photograph', 'drawing', 'document', 'architectural-plan']);
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
    assert.equal(sourcePage.hostname, 'commons.wikimedia.org', `${asset.id} source page must use Wikimedia Commons`);
    assert(sourcePage.pathname.startsWith('/wiki/File:'), `${asset.id} sourcePageUrl must be an exact Commons file page`);
    assert(isHttpUrl(asset.licenseUrl), `${asset.id} needs a license or rights-status URL`);
    assert.equal(new URL(asset.licenseUrl).protocol, 'https:', `${asset.id} licenseUrl must use HTTPS`);
    if (asset.objectPageUrl) {
      assert(isHttpUrl(asset.objectPageUrl), `${asset.id} objectPageUrl is invalid`);
      assert.equal(new URL(asset.objectPageUrl).protocol, 'https:', `${asset.id} objectPageUrl must use HTTPS`);
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

check('the 85-file-source preparation manifest locks every post-Ancient asset uniformly', () => {
  assert.equal(modernManifest.version, 1);
  assert.equal(Object.keys(manifestAssets).length, 85);
  const managedAssets = MUSEUM_ASSETS.filter(({variants}) => !variants.scene.path.startsWith('assets/museum/ancient-greek/'));
  assert.equal(managedAssets.length, 85);
  assert.deepEqual(Object.keys(manifestAssets).sort(), managedAssets.map(({id}) => id).sort());
  assert.match(preparationSource, /MANIFEST_PATH = ROOT \/ "scripts" \/ "museumModernAssetManifest\.json"/);
  assert.match(preparationSource, /EXPECTED_ASSET_COUNT = 85/);
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
    assert.equal(new URL(lock.sourcePageUrl).hostname, 'commons.wikimedia.org', `${asset.id} lock source page must use Commons`);
    assert.equal(new URL(lock.sourceImageUrl).hostname, 'upload.wikimedia.org', `${asset.id} lock source image must use Wikimedia upload`);
    assert.equal(new URL(lock.selectedThumbnailUrl).hostname, 'upload.wikimedia.org', `${asset.id} lock thumbnail must use Wikimedia upload`);
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
    'core-questions-forum': 3,
    'ethics-justice-political-life': 16,
    'justice-democratic-reason': 1,
    'logic-language-science': 16,
    'mind-consciousness-self': 16,
    'modernity-freedom-critique': 16,
    'renaissance-humanism-new-method': 1,
    'renaissance-reason-revolution': 16,
  }, 'preparation lock folder inventory changed');
});

check('all 170 managed derivatives match exact dimensions, bytes, and SHA-256 locks', () => {
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

check('the 21-source Gallery 01 lock reproduces all curated Mediterranean media', () => {
  assert.equal(mediterraneanManifest.version, 1);
  assert.equal(Object.keys(mediterraneanManifestAssets).length, 21);
  assert.deepEqual(Object.keys(mediterraneanManifestAssets).sort(), [...MEDITERRANEAN_ASSET_IDS].sort());
  assert.match(mediterraneanPreparationSource, /museumMediterraneanAssetManifest\.json/);
  assert.match(mediterraneanPreparationSource, /EXPECTED_ASSET_COUNT = 21/);
  assert.match(mediterraneanPreparationSource, /Resampling\.LANCZOS/);
  assert.match(mediterraneanPreparationSource, /"sha256": sha256\(destination\)/);
  for (const id of MEDITERRANEAN_ASSET_IDS) {
    const lock = mediterraneanManifestAssets[id];
    const asset = assetById.get(id);
    assert(asset && lock, `${id} is absent from its runtime record or source lock`);
    assert.equal(lock.sourcePageUrl, asset.sourcePageUrl, `${id} lock source page differs from provenance`);
    assert.equal(new URL(lock.sourcePageUrl).hostname, 'commons.wikimedia.org', `${id} source lock must use Commons`);
    assert.equal(new URL(lock.sourceImageUrl).hostname, 'upload.wikimedia.org', `${id} original lock must use Wikimedia upload`);
    assert.equal(new URL(lock.selectedThumbnailUrl).hostname, 'upload.wikimedia.org', `${id} derivative source must use Wikimedia upload`);
    if (id === 'plato-cave-saenredam-1604' || id === 'plato-republic-parisinus-1807') {
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

check('the committed Museum inventory contains exactly the 244 registered derivatives', () => {
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

console.log(`\nMuseum asset audit passed: ${checks} groups, ${MUSEUM_ASSETS.length} provenance records, ${MUSEUM_ASSETS.length * 2} local derivatives, ${Object.keys(manifestAssets).length * 2 + Object.keys(mediterraneanManifestAssets).length * 2} exact hash locks, and ${referencedIds.length} live media placements.`);
