import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputPath = resolve(repoRoot, 'src/data/museum/museumGeneratedAssetLineage.json');
const modern = JSON.parse(await readFile(resolve(repoRoot, 'scripts/museumModernAssetManifest.json'), 'utf8')).assets;
const mediterranean = JSON.parse(await readFile(resolve(repoRoot, 'scripts/museumMediterraneanAssetManifest.json'), 'utf8')).assets;

const GENERATED_ASSET_IDS = [
  'plato-cave-interpretive-illustration',
  'levinas-ethical-interruption-interpretive',
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
];

const unknownGenerationFields = {
  generationPrompt: 'unknown',
  generationModel: 'unknown',
  generationModelVersion: 'unknown',
  generationDate: 'unknown',
  originalGenerationOutput: 'unknown',
  originalGenerationOutputSha256: 'unknown',
};

const assets = {};
for (const id of GENERATED_ASSET_IDS) {
  const manifest = modern[id] ?? mediterranean[id];
  assert(manifest, `Generated asset ${id} is absent from acquisition manifests.`);
  const sourceArtInput = id === 'levinas-ethical-interruption-interpretive';
  const repositoryArtifactSha256 = sourceArtInput
    ? createHash('sha256').update(await readFile(resolve(repoRoot, 'source-art/museum/levinas-face-to-face-contemporary-interpretation.png'))).digest('hex')
    : manifest.panel.sha256;
  assets[id] = {
    sourceReferenceUrl: manifest.sourcePageUrl,
    sourceReferenceKind: manifest.sourceKind,
    repositoryArtifactSha256,
    repositoryArtifactRole: sourceArtInput
      ? 'Committed source-art input; whether it is a raw generation output is unknown.'
      : 'Committed display derivative; it is not presented as the original generation output.',
    knownAntecedents: id === 'anscombe-portrait-interpretive'
      ? [{
          url: 'https://commons.wikimedia.org/wiki/File:Elisabeth_Anscombe.jpg',
          role: 'Source portrait antecedent for the later interpretive derivative.',
          license: 'CC BY-SA 3.0',
        }]
      : [],
    ...unknownGenerationFields,
  };
}

const serialized = `${JSON.stringify({
  version: 1,
  scope: 'The exact 23 repository-held generated or generation-derived Museum assets known at this review.',
  rule: 'Immutable repository references and verifiable derivative hashes are recorded. Missing generation prompts, models, versions, dates, raw outputs, and raw-output hashes remain unknown; a display derivative is never labeled as the original generation output.',
  assets,
}, null, 2)}\n`;

if (process.argv.includes('--check')) {
  const existing = await readFile(outputPath, 'utf8');
  assert.equal(existing, serialized, 'Generated-asset lineage record is stale; run npm run compile:generated-lineage intentionally.');
  console.log(`Generated-asset lineage record is current for ${GENERATED_ASSET_IDS.length} assets.`);
} else {
  await writeFile(outputPath, serialized, 'utf8');
  console.log(`Recorded recoverable lineage for ${GENERATED_ASSET_IDS.length} generated assets.`);
}
