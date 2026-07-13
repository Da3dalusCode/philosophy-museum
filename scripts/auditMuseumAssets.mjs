import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync, readdirSync, statSync} from 'node:fs';
import {dirname, resolve, sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = resolve(repoRoot, 'public');
const sceneMediaSource = readFileSync(resolve(repoRoot, 'src/components/MuseumGallery/MuseumSceneMedia.tsx'), 'utf8');
const medievalPreparationSource = readFileSync(resolve(repoRoot, 'scripts/prepareMedievalMuseumAssets.py'), 'utf8');
const medievalManifest = JSON.parse(readFileSync(resolve(repoRoot, 'scripts/medievalMuseumAssetManifest.json'), 'utf8'));
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
assert(entry, 'Vite did not produce an executable Museum asset audit entry.');
const moduleUrl = `data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`;
const {
  MUSEUM_ASSETS,
  MUSEUM_HALLS,
  MUSEUM_FRAME_RAIL_FRONT_Z,
  MUSEUM_SCENE_IMAGE_FACING,
  MUSEUM_SCENE_IMAGE_FILTERING,
  MUSEUM_SCENE_IMAGE_PLANE_Z,
  MUSEUM_SCENE_MEDIA_LOADING_COLOR,
  MUSEUM_SCENE_MEDIA_MATERIAL_MODE,
  branches,
  museumAssetUrl,
  philosophers,
} = await import(moduleUrl);

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
const normalizedCommonsFilename = (value) => decodeURIComponent(value).replaceAll('_', ' ');
const sourcePageFilename = (value) => normalizedCommonsFilename(new URL(value).pathname.split('/wiki/File:')[1]);
const uploadFilename = (value) => normalizedCommonsFilename(new URL(value).pathname.split('/').at(-1));

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

const assetById = new Map(MUSEUM_ASSETS.map((asset) => [asset.id, asset]));
const philosopherIds = new Set(philosophers.map(({id}) => id));
const branchIds = new Set(branches.map(({id}) => id));
const referencedIds = MUSEUM_HALLS.flatMap((hall) => hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]));
const medievalAssets = MUSEUM_ASSETS.filter(({variants}) => variants.scene.path.startsWith('assets/museum/medieval-worlds/'));
const medievalManifestAssets = medievalManifest?.assets ?? {};
const preparationAssetBlock = medievalPreparationSource.match(/\nASSETS = \{([\s\S]*?)\n\}\n/);
assert(preparationAssetBlock, 'Unable to read ASSETS from the Medieval preparation recipe.');
const preparationAssets = new Map(
  [...preparationAssetBlock[1].matchAll(/^\s{4}"([^"]+)": "([^"]+)",$/gm)].map(([, id, url]) => [id, url]),
);

check('both curated hall pilots contain 16 assets and all 32 IDs are unique', () => {
  assert.equal(MUSEUM_ASSETS.length, 32);
  assert(unique(MUSEUM_ASSETS.map(({id}) => id)));
  for (const hall of MUSEUM_HALLS) {
    const hallAssetIds = hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]);
    assert.equal(hallAssetIds.length, 16, `${hall.id} must retain exactly two curated assets per exhibit`);
    assert(unique(hallAssetIds));
  }
});

check('Medieval typed records, preparation recipe, and lock manifest agree', () => {
  assert.equal(medievalManifest.version, 1);
  assert.equal(medievalAssets.length, 16);
  const ids = medievalAssets.map(({id}) => id).sort();
  assert.deepEqual(Object.keys(medievalManifestAssets).sort(), ids, 'manifest IDs differ from typed Medieval asset IDs');
  assert.deepEqual([...preparationAssets.keys()].sort(), ids, 'preparation recipe IDs differ from typed Medieval asset IDs');
  assert.match(medievalPreparationSource, /MANIFEST_PATH = ROOT \/ "scripts" \/ "medievalMuseumAssetManifest\.json"/);
  assert.match(medievalPreparationSource, /download\(str\(locked\["selectedThumbnailUrl"\]\), source\)/);
  assert.match(medievalPreparationSource, /validate_derivative\(slug, "scene"/);

  for (const asset of medievalAssets) {
    const locked = medievalManifestAssets[asset.id];
    assert(locked, `${asset.id} is absent from the Medieval lock manifest`);
    assert.equal(locked.sourcePageUrl, asset.sourcePageUrl, `${asset.id} source page differs between data and manifest`);
    assert.equal(locked.sourceImageUrl, preparationAssets.get(asset.id), `${asset.id} source image differs between recipe and manifest`);

    const sourcePage = new URL(locked.sourcePageUrl);
    const sourceImage = new URL(locked.sourceImageUrl);
    const thumbnail = new URL(locked.selectedThumbnailUrl);
    assert.equal(sourcePage.protocol, 'https:');
    assert.equal(sourcePage.hostname, 'commons.wikimedia.org');
    assert.equal(sourceImage.protocol, 'https:');
    assert.equal(sourceImage.hostname, 'upload.wikimedia.org');
    assert.equal(thumbnail.protocol, 'https:');
    assert.equal(thumbnail.hostname, 'upload.wikimedia.org');
    assert.equal(sourcePageFilename(locked.sourcePageUrl), uploadFilename(locked.sourceImageUrl), `${asset.id} source filenames disagree`);
    assert.equal(uploadFilename(locked.selectedThumbnailUrl).replace(/^\d+px-/, ''), uploadFilename(locked.sourceImageUrl), `${asset.id} thumbnail filename disagrees`);
    const sourceRelativePath = sourceImage.pathname.split('/wikipedia/commons/')[1];
    assert(sourceRelativePath, `${asset.id} source image is outside the Commons media path`);
    assert(thumbnail.pathname.startsWith(`/wikipedia/commons/thumb/${sourceRelativePath}/`), `${asset.id} thumbnail is not derived from its locked source image`);

    for (const variantName of ['scene', 'panel']) {
      const expected = locked[variantName];
      assert(Number.isSafeInteger(expected?.bytes) && expected.bytes > 0, `${asset.id} ${variantName} has an invalid locked byte count`);
      assert.match(expected?.sha256 ?? '', /^[0-9a-f]{64}$/, `${asset.id} ${variantName} has an invalid SHA-256 lock`);
    }
  }
});

check('Medieval derivatives match their exact byte and SHA-256 locks', () => {
  for (const asset of medievalAssets) {
    for (const [variantName, variant] of Object.entries(asset.variants)) {
      assert.equal(variant.path, `assets/museum/medieval-worlds/${asset.id}-${variantName}.webp`);
      const path = exactCasePath(variant.path);
      const expected = medievalManifestAssets[asset.id][variantName];
      assert.equal(statSync(path).size, expected.bytes, `${asset.id} ${variantName} byte count drifted`);
      assert.equal(sha256(path), expected.sha256, `${asset.id} ${variantName} content hash drifted`);
    }
  }
});

check('Medieval derivative directory contains no unregistered files', () => {
  const expected = medievalAssets.flatMap(({variants}) => Object.values(variants).map(({path}) => path.split('/').at(-1))).sort();
  const entries = readdirSync(resolve(publicRoot, 'assets/museum/medieval-worlds'), {withFileTypes: true});
  for (const entry of entries) assert(entry.isFile(), `unexpected non-file entry in Medieval derivative directory: ${entry.name}`);
  assert.deepEqual(entries.map(({name}) => name).sort(), expected);
});

check('every exhibit has one principal asset and resolved supporting assets', () => {
  for (const exhibit of MUSEUM_HALLS.flatMap(({exhibits}) => exhibits)) {
    assert(assetById.has(exhibit.principalAssetId), `${exhibit.id} principal asset is missing`);
    assert(exhibit.supportingAssetIds.length > 0, `${exhibit.id} needs a supporting asset`);
    assert(unique(exhibit.supportingAssetIds), `${exhibit.id} repeats a supporting asset`);
    for (const id of exhibit.supportingAssetIds) assert(assetById.has(id), `${exhibit.id} references missing asset ${id}`);
  }
});

check('asset entity references exist and match their exhibit', () => {
  for (const asset of MUSEUM_ASSETS) {
    const entityIds = asset.entityKind === 'philosopher' ? philosopherIds : branchIds;
    assert(entityIds.has(asset.entityId), `${asset.id} references an unknown ${asset.entityKind}`);
    const exhibit = MUSEUM_HALLS.flatMap(({exhibits}) => exhibits).find(({entityId, entityKind}) => entityId === asset.entityId && entityKind === asset.entityKind);
    assert(exhibit, `${asset.id} has no matching Museum exhibit`);
  }
});

check('every committed asset is referenced exactly once and no principal is orphaned', () => {
  assert(unique(referencedIds), 'one asset is assigned to more than one catalog slot');
  assert.deepEqual([...referencedIds].sort(), MUSEUM_ASSETS.map(({id}) => id).sort());
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
    assert(sourcePage.pathname.startsWith('/wiki/File:'), `${asset.id} sourcePageUrl must be the exact committed media file page`);
    assert(isHttpUrl(asset.licenseUrl), `${asset.id} needs a license URL`);
    const licenseUrl = new URL(asset.licenseUrl);
    assert.equal(licenseUrl.protocol, 'https:', `${asset.id} license URL must use HTTPS`);
    if (asset.objectPageUrl) assert(isHttpUrl(asset.objectPageUrl), `${asset.id} object page is invalid`);
    assert(['license', 'rights-status', 'dedication'].includes(asset.rightsKind), `${asset.id} rights kind is invalid`);
    if (/^CC BY(?:-|\s)/.test(asset.license)) {
      assert.equal(asset.rightsKind, 'license', `${asset.id} must identify its CC BY terms as an image license`);
      assert.equal(licenseUrl.hostname, 'creativecommons.org', `${asset.id} CC license URL must use Creative Commons`);
      assert(licenseUrl.pathname.startsWith('/licenses/'), `${asset.id} CC license URL must identify license terms`);
      assert(/resized.+converted.+WebP/i.test(asset.derivativeNotice ?? ''), `${asset.id} must disclose local derivative modifications`);
    }
    if (asset.license.startsWith('Public Domain Mark')) {
      assert.equal(asset.rightsKind, 'rights-status', `${asset.id} must label Public Domain Mark as a rights status`);
      assert.equal(licenseUrl.hostname, 'creativecommons.org');
      assert(licenseUrl.pathname.startsWith('/publicdomain/mark/'), `${asset.id} Public Domain Mark URL is inconsistent`);
    }
    if (asset.license.startsWith('CC0')) {
      assert.equal(asset.rightsKind, 'dedication', `${asset.id} must label CC0 as a dedication`);
      assert.equal(licenseUrl.hostname, 'creativecommons.org');
      assert(licenseUrl.pathname.startsWith('/publicdomain/zero/'), `${asset.id} CC0 URL is inconsistent`);
    }
    if (asset.license.includes('PD-self')) {
      assert.equal(asset.rightsKind, 'dedication', `${asset.id} must label PD-self as a dedication`);
      assert.equal(licenseUrl.hostname, 'commons.wikimedia.org');
      assert.equal(licenseUrl.pathname, '/wiki/Template:PD-self');
    }
    if (asset.license.includes('PD-Art')) {
      assert.equal(asset.rightsKind, 'rights-status', `${asset.id} must label PD-Art as a rights status`);
      assert.equal(licenseUrl.hostname, 'commons.wikimedia.org');
      assert.equal(licenseUrl.pathname, '/wiki/Template:PD-Art');
    }
    if (asset.license.includes('PD-Turkey')) {
      assert.equal(asset.rightsKind, 'rights-status', `${asset.id} must label PD-Turkey as a rights status`);
      assert.equal(licenseUrl.hostname, 'commons.wikimedia.org');
      assert.equal(licenseUrl.pathname, '/wiki/Template:PD-Turkey');
    }
    if (asset.license.includes('PD-Saudi Arabia')) {
      assert.equal(asset.rightsKind, 'rights-status', `${asset.id} must label PD-Saudi Arabia as a rights status`);
      assert.equal(licenseUrl.hostname, 'commons.wikimedia.org');
      assert.equal(licenseUrl.pathname, '/wiki/Template:PD-Saudi_Arabia');
    }
    if (asset.license.startsWith('Licence Ouverte')) {
      assert.equal(asset.rightsKind, 'license', `${asset.id} must label Licence Ouverte as a license`);
      const isVersionedWikisource = licenseUrl.hostname === 'en.wikisource.org' && licenseUrl.pathname === '/wiki/Open_Licence_v1.0';
      const isEtalabTerms = licenseUrl.hostname === 'www.etalab.gouv.fr' && licenseUrl.pathname.includes('licence-ouverte');
      assert(isVersionedWikisource || isEtalabTerms, `${asset.id} Licence Ouverte URL is inconsistent`);
    }
    if (asset.focalPoint) {
      assert(asset.focalPoint.x >= 0 && asset.focalPoint.x <= 1, `${asset.id} focal x is invalid`);
      assert(asset.focalPoint.y >= 0 && asset.focalPoint.y <= 1, `${asset.id} focal y is invalid`);
    }
  }
});

check('all runtime variants are local, base-safe, exact-case WebP files', () => {
  const paths = [];
  for (const asset of MUSEUM_ASSETS) {
    for (const [variantName, variant] of Object.entries(asset.variants)) {
      assert(!/^https?:/i.test(variant.path), `${asset.id} ${variantName} hotlinks runtime media`);
      assert(!variant.path.startsWith('/'), `${asset.id} ${variantName} is root-relative`);
      assert(variant.path.startsWith('assets/museum/'), `${asset.id} ${variantName} is outside Museum assets`);
      assert(variant.path.endsWith('.webp'), `${asset.id} ${variantName} must use WebP`);
      const path = exactCasePath(variant.path);
      const stats = statSync(path);
      assert(stats.isFile(), `${variant.path} is not a file`);
      assert(stats.size > 0 && stats.size <= 600_000, `${variant.path} size ${stats.size} is outside the 1–600 KB limit`);
      const dimensions = webpDimensions(path);
      assert.deepEqual(dimensions, {width: variant.width, height: variant.height}, `${variant.path} metadata dimensions disagree`);
      const maxDimension = variantName === 'scene' ? 640 : 1280;
      assert(Math.max(dimensions.width, dimensions.height) <= maxDimension, `${variant.path} exceeds ${variantName} limits`);
      assert(Math.min(dimensions.width, dimensions.height) >= 180, `${variant.path} is too small`);
      paths.push(variant.path);
    }
  }
  assert(unique(paths), 'a local derivative path has conflicting provenance assignments');
});

check('all 32 scene images resolve beneath a non-root Vite base', () => {
  assert.equal(MUSEUM_ASSETS.length, 32);
  const runtimeUrls = MUSEUM_ASSETS.map(({variants}) => museumAssetUrl(variants.scene));
  assert.equal(runtimeUrls.length, 32);
  assert(unique(runtimeUrls));
  for (const [index, runtimeUrl] of runtimeUrls.entries()) {
    const asset = MUSEUM_ASSETS[index];
    assert(runtimeUrl.startsWith(`${auditBase}assets/museum/`), `${asset.id} produced non-base-safe URL ${runtimeUrl}`);
    assert.equal(runtimeUrl, `${auditBase}${asset.variants.scene.path}`);
    const parsed = new URL(runtimeUrl, 'https://museum-audit.invalid');
    assert.equal(parsed.origin, 'https://museum-audit.invalid');
    assert(parsed.pathname.endsWith('.webp'));
  }
});

check('scene-media policy keeps images unlit, front-facing, and clear of frame rails', () => {
  assert.equal(MUSEUM_SCENE_MEDIA_MATERIAL_MODE, 'unlit-srgb');
  assert.equal(MUSEUM_SCENE_IMAGE_FACING, 'positive-z');
  assert.equal(MUSEUM_SCENE_IMAGE_FILTERING, 'linear-no-mipmaps-keyed-material');
  assert.match(MUSEUM_SCENE_MEDIA_LOADING_COLOR, /^#[0-9a-f]{6}$/i);
  assert.notEqual(MUSEUM_SCENE_MEDIA_LOADING_COLOR.toLowerCase(), '#000000');
  assert(Number.isFinite(MUSEUM_SCENE_IMAGE_PLANE_Z));
  assert(Number.isFinite(MUSEUM_FRAME_RAIL_FRONT_Z));
  assert(MUSEUM_FRAME_RAIL_FRONT_Z > 0, 'frame rails must project toward the positive-z viewer side');
  assert(MUSEUM_SCENE_IMAGE_PLANE_Z > MUSEUM_FRAME_RAIL_FRONT_Z, 'image plane must sit in front of frame rails');
  assert(MUSEUM_SCENE_IMAGE_PLANE_Z - MUSEUM_FRAME_RAIL_FRONT_Z >= .005, 'image/frame clearance is too small for stable depth ordering');
  assert.match(sceneMediaSource, /<meshBasicMaterial key="scene-ready" map=\{textureState\.texture\} toneMapped=\{false\}\/>/, 'ready scene images must use a keyed unlit material');
  assert.match(sceneMediaSource, /key="scene-loading"/, 'loading and ready materials must not share a shader instance');
  assert.match(sceneMediaSource, /key="scene-failed"/, 'failed and ready materials must not share a shader instance');
  assert.match(sceneMediaSource, /texture\.minFilter = LinearFilter;/, 'scene texture filtering must stay WebGL-safe');
  assert.match(sceneMediaSource, /texture\.generateMipmaps = false;/, 'non-power-of-two scene textures must not force mipmaps');
  assert.match(sceneMediaSource, /MUSEUM_FRAME_RAIL_FRONT_Z - railDepth \/ 2/, 'rendered rails must consume the audited front-plane contract');
  assert.doesNotMatch(sceneMediaSource, /<meshStandardMaterial key="scene-ready"/, 'lit ready-image materials recreate the black-image regression');
});

const totalBytes = MUSEUM_ASSETS.flatMap(({variants}) => Object.values(variants))
  .reduce((total, variant) => total + statSync(exactCasePath(variant.path)).size, 0);
const medievalBytes = MUSEUM_ASSETS.filter(({variants}) => variants.scene.path.startsWith('assets/museum/medieval-worlds/'))
  .flatMap(({variants}) => Object.values(variants))
  .reduce((total, variant) => total + statSync(exactCasePath(variant.path)).size, 0);
console.log(`\nMuseum asset audit passed: ${checks} groups covering ${MUSEUM_ASSETS.length} assets, ${referencedIds.length} catalog references, and ${(totalBytes / 1024 / 1024).toFixed(2)} MiB of committed media (${(medievalBytes / 1024 / 1024).toFixed(2)} MiB new Medieval media).`);
