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
  museumAssetUrl,
} = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`);

const ACTIVE_HALL_FOLDERS = [
  'ancient-greek',
  'renaissance-reason-revolution',
  'modernity-freedom-critique',
];
const MODERN_HALL_FOLDERS = ACTIVE_HALL_FOLDERS.slice(1);
const manifestAssets = modernManifest?.assets ?? {};
const assetById = new Map(MUSEUM_ASSETS.map((asset) => [asset.id, asset]));
const referencedIds = MUSEUM_HALLS.flatMap((hall) => hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]));

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

const walkFiles = (directory) => readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
  const path = resolve(directory, entry.name);
  return entry.isDirectory() ? walkFiles(path) : [path];
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

check('the active three halls expose 48 unique assets, exactly two per exhibit', () => {
  assert.deepEqual(MUSEUM_HALLS.map(({id}) => id), ACTIVE_HALL_FOLDERS);
  assert.equal(MUSEUM_ASSETS.length, 48);
  assert.equal(assetById.size, 48);
  assert.equal(referencedIds.length, 48);
  assert(unique(referencedIds), 'one curated asset is assigned to multiple exhibit slots');
  assert.deepEqual([...referencedIds].sort(), MUSEUM_ASSETS.map(({id}) => id).sort());
  for (const hall of MUSEUM_HALLS) {
    const ids = hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]);
    assert.equal(ids.length, 16, `${hall.id} must have 16 asset slots`);
    assert(unique(ids), `${hall.id} reuses an asset`);
  }
});

check('active asset records belong to their exact exhibit and hall folder', () => {
  for (const hall of MUSEUM_HALLS) {
    for (const exhibit of hall.exhibits) {
      for (const id of [exhibit.principalAssetId, ...exhibit.supportingAssetIds]) {
        const asset = assetById.get(id);
        assert(asset, `${hall.id}/${exhibit.id} references missing asset ${id}`);
        assert.equal(asset.entityKind, exhibit.entityKind, `${id} entity kind drifted`);
        assert.equal(asset.entityId, exhibit.entityId, `${id} entity target drifted`);
        for (const variant of Object.values(asset.variants)) {
          assert(variant.path.startsWith(`assets/museum/${hall.id}/`), `${id} is stored outside ${hall.id}`);
        }
      }
    }
  }
  assert(MUSEUM_ASSETS.every(({variants}) => !variants.scene.path.includes('/medieval-worlds/')), 'retired Medieval media remains in the active registry');
});

check('the modern lock manifest and preparation pipeline describe the exact 32 new assets', () => {
  assert.equal(modernManifest.version, 1);
  assert.equal(Object.keys(manifestAssets).length, 32);
  const modernAssets = MUSEUM_ASSETS.filter(({variants}) => MODERN_HALL_FOLDERS.some((folder) => variants.scene.path.startsWith(`assets/museum/${folder}/`)));
  assert.equal(modernAssets.length, 32);
  assert.deepEqual(Object.keys(manifestAssets).sort(), modernAssets.map(({id}) => id).sort());
  assert.match(preparationSource, /MANIFEST_PATH = ROOT \/ "scripts" \/ "museumModernAssetManifest\.json"/);
  assert.match(preparationSource, /EXPECTED_ASSET_COUNT = 32/);
  assert.match(preparationSource, /EXPECTED_HALLS = \{"renaissance-reason-revolution", "modernity-freedom-critique"\}/);
  assert.match(preparationSource, /record\["selectedThumbnailUrl"\]/);
  assert.match(preparationSource, /assert_locked\(slug, "scene"/);
  assert.match(preparationSource, /assert_locked\(slug, "panel"/);
  assert.match(preparationSource, /"sha256": sha256\(path\)/);

  const missingLocks = [];
  const sourcePageMismatches = [];
  const countsByFolder = new Map();
  for (const asset of modernAssets) {
    const lock = manifestAssets[asset.id];
    assert(lock, `${asset.id} has no modern manifest record`);
    assert(MODERN_HALL_FOLDERS.includes(lock.hallFolder), `${asset.id} has invalid hallFolder ${lock.hallFolder}`);
    countsByFolder.set(lock.hallFolder, (countsByFolder.get(lock.hallFolder) ?? 0) + 1);
    if (lock.sourcePageUrl !== asset.sourcePageUrl) sourcePageMismatches.push({
      id: asset.id,
      manifest: lock.sourcePageUrl,
      typed: asset.sourcePageUrl,
    });
    for (const field of ['sourcePageUrl', 'sourceImageUrl', 'selectedThumbnailUrl']) {
      assert.equal(new URL(lock[field]).protocol, 'https:', `${asset.id}.${field} must be HTTPS`);
    }
    assert.equal(new URL(lock.sourcePageUrl).hostname, 'commons.wikimedia.org');
    assert.equal(new URL(lock.sourceImageUrl).hostname, 'upload.wikimedia.org');
    assert.equal(new URL(lock.selectedThumbnailUrl).hostname, 'upload.wikimedia.org');
    for (const variantName of ['scene', 'panel']) {
      const expected = lock[variantName];
      if (!expected) {
        missingLocks.push(`${asset.id}.${variantName}`);
        continue;
      }
      assert(Number.isSafeInteger(expected.width) && expected.width > 0, `${asset.id}.${variantName}.width is invalid`);
      assert(Number.isSafeInteger(expected.height) && expected.height > 0, `${asset.id}.${variantName}.height is invalid`);
      assert(Number.isSafeInteger(expected.bytes) && expected.bytes > 0, `${asset.id}.${variantName}.bytes is invalid`);
      assert.match(expected.sha256 ?? '', /^[0-9a-f]{64}$/, `${asset.id}.${variantName}.sha256 is invalid`);
    }
  }
  assert.deepEqual(Object.fromEntries([...countsByFolder].sort()), {
    'modernity-freedom-critique': 16,
    'renaissance-reason-revolution': 16,
  });
  assert.deepEqual(sourcePageMismatches, [], `modern source pages differ between the lock manifest and typed provenance: ${JSON.stringify(sourcePageMismatches, null, 2)}`);
  assert.deepEqual(missingLocks, [], `modern manifest is structurally valid but still needs ${missingLocks.length} derivative locks: ${missingLocks.join(', ')}`);
});

check('all 64 modern derivatives match their exact dimensions, bytes, and SHA-256 locks', () => {
  for (const [id, lock] of Object.entries(manifestAssets)) {
    const asset = assetById.get(id);
    assert(asset, `${id} is locked but not active`);
    for (const variantName of ['scene', 'panel']) {
      const variant = asset.variants[variantName];
      const expected = lock[variantName];
      assert.equal(variant.path, `assets/museum/${lock.hallFolder}/${id}-${variantName}.webp`);
      assert.equal(variant.width, expected.width, `${id} ${variantName} typed width differs from lock`);
      assert.equal(variant.height, expected.height, `${id} ${variantName} typed height differs from lock`);
      const path = exactCasePath(variant.path);
      assert.equal(statSync(path).size, expected.bytes, `${id} ${variantName} byte count drifted`);
      assert.equal(sha256(path), expected.sha256, `${id} ${variantName} content hash drifted`);
    }
  }
});

check('the committed Museum media inventory contains only the 96 registered active derivatives', () => {
  const expected = MUSEUM_ASSETS.flatMap(({variants}) => Object.values(variants).map(({path}) => path)).sort();
  const actual = walkFiles(museumMediaRoot).map(toPublicPath).sort();
  assert.equal(expected.length, 96);
  assert.deepEqual(actual, expected, 'public/assets/museum contains missing, retired, or unregistered files');
  assert.deepEqual(readdirSync(museumMediaRoot, {withFileTypes: true}).filter((entry) => entry.isDirectory()).map(({name}) => name).sort(), [...ACTIVE_HALL_FOLDERS].sort());
});

check('provenance, rights, interpretation, and accessibility fields are complete', () => {
  for (const asset of MUSEUM_ASSETS) {
    for (const field of ['title', 'creator', 'objectDate', 'institution', 'license', 'rightsKind', 'attribution', 'alt', 'caption', 'historicalNote', 'likenessStatus']) {
      assert.equal(typeof asset[field], 'string', `${asset.id}.${field} is required`);
      assert(asset[field].trim(), `${asset.id}.${field} cannot be empty`);
    }
    assert(isHttpUrl(asset.sourcePageUrl), `${asset.id} needs an exact source page URL`);
    const sourcePage = new URL(asset.sourcePageUrl);
    assert.equal(sourcePage.protocol, 'https:', `${asset.id} source page must use HTTPS`);
    assert.equal(sourcePage.hostname, 'commons.wikimedia.org', `${asset.id} source page must use Wikimedia Commons`);
    assert(sourcePage.pathname.startsWith('/wiki/File:'), `${asset.id} sourcePageUrl must be an exact Commons file page`);
    assert(isHttpUrl(asset.licenseUrl), `${asset.id} needs a license or rights-status URL`);
    assert.equal(new URL(asset.licenseUrl).protocol, 'https:');
    if (asset.objectPageUrl) assert(isHttpUrl(asset.objectPageUrl), `${asset.id} objectPageUrl is invalid`);
    assert(['license', 'rights-status', 'dedication'].includes(asset.rightsKind), `${asset.id} rightsKind is invalid`);
    if (/^CC BY(?:-|\s)/.test(asset.license)) {
      assert.equal(asset.rightsKind, 'license', `${asset.id} must identify CC BY terms as a license`);
      assert.equal(new URL(asset.licenseUrl).hostname, 'creativecommons.org');
      assert(/resized.+converted.+WebP/i.test(asset.derivativeNotice ?? ''), `${asset.id} must disclose derivative modifications`);
    }
    if (asset.license.startsWith('Public Domain Mark')) {
      assert.equal(asset.rightsKind, 'rights-status');
      assert(new URL(asset.licenseUrl).pathname.startsWith('/publicdomain/mark/'));
    }
    if (asset.license.startsWith('CC0')) {
      assert.equal(asset.rightsKind, 'dedication');
      assert(new URL(asset.licenseUrl).pathname.startsWith('/publicdomain/zero/'));
    }
    if (asset.focalPoint) {
      assert(asset.focalPoint.x >= 0 && asset.focalPoint.x <= 1, `${asset.id} focal x is invalid`);
      assert(asset.focalPoint.y >= 0 && asset.focalPoint.y <= 1, `${asset.id} focal y is invalid`);
    }
  }
});

check('every runtime variant is local, base-safe, exact-case WebP media', () => {
  const paths = [];
  for (const asset of MUSEUM_ASSETS) {
    for (const [variantName, variant] of Object.entries(asset.variants)) {
      assert(!/^https?:/i.test(variant.path), `${asset.id} ${variantName} hotlinks runtime media`);
      assert(!variant.path.startsWith('/'), `${asset.id} ${variantName} is root-relative`);
      assert(variant.path.startsWith('assets/museum/'), `${asset.id} ${variantName} is outside Museum assets`);
      assert(variant.path.endsWith('.webp'), `${asset.id} ${variantName} must use WebP`);
      const path = exactCasePath(variant.path);
      const stats = statSync(path);
      assert(stats.isFile());
      assert(stats.size > 0 && stats.size <= 600_000, `${variant.path} size ${stats.size} is outside the 1–600 KB limit`);
      const dimensions = webpDimensions(path);
      assert.deepEqual(dimensions, {width: variant.width, height: variant.height}, `${variant.path} typed dimensions disagree`);
      const maxDimension = variantName === 'scene' ? 640 : 1280;
      assert(Math.max(dimensions.width, dimensions.height) <= maxDimension, `${variant.path} exceeds ${variantName} limits`);
      assert(Math.min(dimensions.width, dimensions.height) >= 180, `${variant.path} is too small`);
      paths.push(variant.path);
    }
  }
  assert(unique(paths), 'a local derivative path has conflicting provenance assignments');
});

check('all 48 scene images resolve beneath a non-root Vite base', () => {
  const runtimeUrls = MUSEUM_ASSETS.map(({variants}) => museumAssetUrl(variants.scene));
  assert.equal(runtimeUrls.length, 48);
  assert(unique(runtimeUrls));
  for (const [index, runtimeUrl] of runtimeUrls.entries()) {
    const asset = MUSEUM_ASSETS[index];
    assert.equal(runtimeUrl, `${auditBase}${asset.variants.scene.path}`);
    assert(runtimeUrl.startsWith(`${auditBase}assets/museum/`));
  }
});

check('scene-media policy keeps local images unlit, front-facing, and clear of rails', () => {
  assert.equal(MUSEUM_SCENE_MEDIA_MATERIAL_MODE, 'unlit-srgb');
  assert.equal(MUSEUM_SCENE_IMAGE_FACING, 'positive-z');
  assert.equal(MUSEUM_SCENE_IMAGE_FILTERING, 'linear-no-mipmaps-keyed-material');
  assert.match(MUSEUM_SCENE_MEDIA_LOADING_COLOR, /^#[0-9a-f]{6}$/i);
  assert.notEqual(MUSEUM_SCENE_MEDIA_LOADING_COLOR.toLowerCase(), '#000000');
  assert(MUSEUM_SCENE_IMAGE_PLANE_Z > MUSEUM_FRAME_RAIL_FRONT_Z);
  assert(MUSEUM_SCENE_IMAGE_PLANE_Z - MUSEUM_FRAME_RAIL_FRONT_Z >= .005);
  assert.match(sceneMediaSource, /<meshBasicMaterial key="scene-ready" map=\{textureState\.texture\} toneMapped=\{false\}\/>/);
  assert.match(sceneMediaSource, /texture\.minFilter = LinearFilter;/);
  assert.match(sceneMediaSource, /texture\.generateMipmaps = false;/);
  assert.doesNotMatch(sceneMediaSource, /<meshStandardMaterial key="scene-ready"/);
});

const totalBytes = MUSEUM_ASSETS.flatMap(({variants}) => Object.values(variants))
  .reduce((total, variant) => total + statSync(exactCasePath(variant.path)).size, 0);
const modernBytes = MUSEUM_ASSETS.filter(({variants}) => MODERN_HALL_FOLDERS.some((folder) => variants.scene.path.includes(`/${folder}/`)))
  .flatMap(({variants}) => Object.values(variants))
  .reduce((total, variant) => total + statSync(exactCasePath(variant.path)).size, 0);
console.log(`\nMuseum asset audit passed: ${checks} groups covering 48 assets, 96 local derivatives, and ${(totalBytes / 1024 / 1024).toFixed(2)} MiB of media (${(modernBytes / 1024 / 1024).toFixed(2)} MiB in Galleries 02–03).`);
