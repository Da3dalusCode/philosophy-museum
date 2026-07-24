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
      export * from '/src/data/museum/renaissanceSupplementalExhibits.ts';
      export * from '/src/data/museum/phenomenologySupplementalExhibits.ts';
      export * from '/src/data/museum/analyticSupplementalExhibits.ts';
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
  ANALYTIC_SUPPLEMENTAL_EXHIBITS,
  MUSEUM_ASSETS,
  MUSEUM_HALLS,
  MUSEUM_FRAME_RAIL_FRONT_Z,
  MUSEUM_SCENE_IMAGE_FACING,
  MUSEUM_SCENE_IMAGE_FILTERING,
  MUSEUM_SCENE_IMAGE_PLANE_Z,
  MUSEUM_SCENE_MEDIA_LOADING_COLOR,
  MUSEUM_SCENE_MEDIA_MATERIAL_MODE,
  PLATO_SUPPLEMENTAL_EXHIBITS,
  PHENOMENOLOGY_SUPPLEMENTAL_EXHIBITS,
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
];
const ORIGINAL_INTERPRETIVE_ASSET_IDS = new Set([
  'plato-cave-interpretive-illustration',
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
]);
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
  'plato-cave-interpretive-illustration',
  'plato-republic-justice-ideal-city',
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
const platoSupplementalReferencedIds = PLATO_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const renaissanceSupplementalReferencedIds = RENAISSANCE_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const phenomenologySupplementalReferencedIds = PHENOMENOLOGY_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const analyticSupplementalReferencedIds = ANALYTIC_SUPPLEMENTAL_EXHIBITS.map(({assetId}) => assetId);
const supplementalReferencedIds = [
  ...platoSupplementalReferencedIds,
  ...renaissanceSupplementalReferencedIds,
  ...phenomenologySupplementalReferencedIds,
  ...analyticSupplementalReferencedIds,
];
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

check('the canonical six expose 63 primaries with optional, resolvable local media references', () => {
  assert.deepEqual(MUSEUM_HALLS.map(({id}) => id), ACTIVE_HALL_IDS);
  assert.equal(liveExhibits.length, 63);
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
  assert.equal(PHENOMENOLOGY_SUPPLEMENTAL_EXHIBITS.length, 19);
  assert.equal(new Set(phenomenologySupplementalReferencedIds).size, 19);
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
  assert.equal(primaryReferencedIds.length, 12);
  const galleryReferencedIds = [...primaryReferencedIds, ...phenomenologySupplementalReferencedIds];
  assert.equal(galleryReferencedIds.length, 31);
  assert.equal(new Set(galleryReferencedIds).size, 31, 'Gallery 03 repeats an image across primary or supplemental exhibits');
  assert.equal(new Set(galleryReferencedIds.map((id) => assetById.get(id).sourcePageUrl)).size, 31, 'Gallery 03 repeats an underlying source image');
  assert.equal(new Set(galleryReferencedIds.map((id) => sha256(exactCasePath(assetById.get(id).variants.panel.path)))).size, 31, 'Gallery 03 repeats identical panel bytes');
  assert(!galleryReferencedIds.some((id) => /grave|plaque/.test(id)), 'Gallery 03 still routes through a grave or plaque image');
  const requiredTitlePrefixes = new Map([
    ['phenomenology-intentionality', 'Husserl:'],
    ['heidegger-being-time', 'Heidegger:'],
    ['merleau-phenomenology-perception', 'Merleau-Ponty:'],
    ['sartre-bad-faith', 'Sartre:'],
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

check('Gallery 04 resolves every wall image through a unique local asset id', () => {
  assert.equal(ANALYTIC_SUPPLEMENTAL_EXHIBITS.length, 22);
  assert.equal(analyticSupplementalReferencedIds.length, 22);
  assert.equal(new Set(analyticSupplementalReferencedIds).size, 22, 'Gallery 04 repeats a supplemental image asset');
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
  assert.equal(galleryReferencedIds.length, 32, 'Gallery 04 wall-image count changed');
  assert.equal(new Set(galleryReferencedIds).size, 32, 'Gallery 04 repeats an image asset across primary or supplemental installations');
});

check('the preserved asset registry contains 181 unique records and derivative paths', () => {
  assert.equal(MUSEUM_ASSETS.length, 181);
  assert.equal(assetById.size, 181);
  const variantPaths = MUSEUM_ASSETS.flatMap(({variants}) => [variants.scene.path, variants.panel.path]);
  assert.equal(variantPaths.length, 362);
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

check('the 143-file-source preparation manifest locks every post-Ancient asset uniformly', () => {
  assert.equal(modernManifest.version, 1);
  assert.equal(Object.keys(manifestAssets).length, 143);
  const managedAssets = MUSEUM_ASSETS.filter(({variants}) => !variants.scene.path.startsWith('assets/museum/ancient-greek/'));
  assert.equal(managedAssets.length, 143);
  assert.deepEqual(Object.keys(manifestAssets).sort(), managedAssets.map(({id}) => id).sort());
  assert.match(preparationSource, /MANIFEST_PATH = ROOT \/ "scripts" \/ "museumModernAssetManifest\.json"/);
  assert.match(preparationSource, /EXPECTED_ASSET_COUNT = 143/);
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
    if (lock.sourceKind === 'owner-approved-original-illustration') {
      assert.match(asset.id, /-interpretive$/, `${asset.id} marks a non-interpretive asset as an original illustration`);
      assert.equal(new URL(lock.sourcePageUrl).hostname, 'github.com', `${asset.id} original source page must use GitHub`);
      assert.equal(new URL(lock.sourceImageUrl).hostname, 'raw.githubusercontent.com', `${asset.id} original source image must use the repository`);
      assert.equal(new URL(lock.selectedThumbnailUrl).hostname, 'raw.githubusercontent.com', `${asset.id} original thumbnail must use the repository`);
    } else {
      assert.equal(new URL(lock.sourcePageUrl).hostname, 'commons.wikimedia.org', `${asset.id} lock source page must use Commons`);
      assert.equal(new URL(lock.sourceImageUrl).hostname, 'upload.wikimedia.org', `${asset.id} lock source image must use Wikimedia upload`);
      assert.equal(new URL(lock.selectedThumbnailUrl).hostname, 'upload.wikimedia.org', `${asset.id} lock thumbnail must use Wikimedia upload`);
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
    'analytic-traditions': 25,
    'core-questions-forum': 3,
    'ethics-justice-political-life': 16,
    'justice-democratic-reason': 1,
    'logic-language-science': 16,
    'mind-consciousness-self': 16,
    'modernity-freedom-critique': 16,
    'phenomenology-existence-embodiment': 21,
    'renaissance-humanism-new-method': 13,
    'renaissance-reason-revolution': 16,
  }, 'preparation lock folder inventory changed');
});

check('all 286 managed derivatives match exact dimensions, bytes, and SHA-256 locks', () => {
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

check('the 22-source Gallery 01 lock reproduces all curated Mediterranean media', () => {
  assert.equal(mediterraneanManifest.version, 1);
  assert.equal(Object.keys(mediterraneanManifestAssets).length, 22);
  assert.deepEqual(Object.keys(mediterraneanManifestAssets).sort(), [...MEDITERRANEAN_ASSET_IDS].sort());
  assert.match(mediterraneanPreparationSource, /museumMediterraneanAssetManifest\.json/);
  assert.match(mediterraneanPreparationSource, /EXPECTED_ASSET_COUNT = 22/);
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

check('the committed Museum inventory contains exactly the 362 registered derivatives', () => {
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
