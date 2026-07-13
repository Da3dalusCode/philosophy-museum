import assert from 'node:assert/strict';
import {readFileSync, readdirSync, statSync} from 'node:fs';
import {dirname, resolve, sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = resolve(repoRoot, 'public');
const virtualEntry = 'virtual:philosophy-atlas-museum-asset-audit';
const resolvedEntry = `\0${virtualEntry}`;
const result = await build({
  root: repoRoot,
  configFile: false,
  logLevel: 'silent',
  plugins: [{
    name: 'museum-asset-audit-entry',
    resolveId: (id) => id === virtualEntry ? resolvedEntry : undefined,
    load: (id) => id === resolvedEntry ? `
      export * from '/src/data/museumCatalog.ts';
      export * from '/src/data/museum/museumAssets.ts';
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
const {MUSEUM_ASSETS, MUSEUM_HALLS, branches, philosophers} = await import(moduleUrl);

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

const hall = MUSEUM_HALLS[0];
const assetById = new Map(MUSEUM_ASSETS.map((asset) => [asset.id, asset]));
const philosopherIds = new Set(philosophers.map(({id}) => id));
const branchIds = new Set(branches.map(({id}) => id));
const referencedIds = hall.exhibits.flatMap((exhibit) => [exhibit.principalAssetId, ...exhibit.supportingAssetIds]);

check('the curated pilot contains 12–20 unique assets', () => {
  assert(MUSEUM_ASSETS.length >= 12 && MUSEUM_ASSETS.length <= 20);
  assert(unique(MUSEUM_ASSETS.map(({id}) => id)));
});

check('every exhibit has one principal asset and resolved supporting assets', () => {
  for (const exhibit of hall.exhibits) {
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
    const exhibit = hall.exhibits.find(({entityId, entityKind}) => entityId === asset.entityId && entityKind === asset.entityKind);
    assert(exhibit, `${asset.id} has no matching Museum exhibit`);
  }
});

check('every committed asset is referenced exactly once and no principal is orphaned', () => {
  assert(unique(referencedIds), 'one asset is assigned to more than one catalog slot');
  assert.deepEqual([...referencedIds].sort(), MUSEUM_ASSETS.map(({id}) => id).sort());
});

check('provenance, rights, interpretation, and accessibility fields are complete', () => {
  for (const asset of MUSEUM_ASSETS) {
    for (const field of ['title', 'creator', 'objectDate', 'institution', 'license', 'attribution', 'alt', 'caption', 'historicalNote', 'likenessStatus']) {
      assert.equal(typeof asset[field], 'string', `${asset.id}.${field} is required`);
      assert(asset[field].trim(), `${asset.id}.${field} cannot be empty`);
    }
    assert(isHttpUrl(asset.sourcePageUrl), `${asset.id} needs an exact source page URL`);
    assert(isHttpUrl(asset.licenseUrl), `${asset.id} needs a license URL`);
    if (asset.objectPageUrl) assert(isHttpUrl(asset.objectPageUrl), `${asset.id} object page is invalid`);
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

const totalBytes = MUSEUM_ASSETS.flatMap(({variants}) => Object.values(variants))
  .reduce((total, variant) => total + statSync(exactCasePath(variant.path)).size, 0);
console.log(`\nMuseum asset audit passed: ${checks} groups covering ${MUSEUM_ASSETS.length} assets, ${referencedIds.length} catalog references, and ${(totalBytes / 1024 / 1024).toFixed(2)} MiB of committed media.`);
