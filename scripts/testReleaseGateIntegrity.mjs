import assert from 'node:assert/strict';
import {mkdtemp, readFile, rm, stat, utimes, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {
  generatedArtifactMatches,
  writeGeneratedArtifactIfChanged,
} from './generatedArtifactIntegrity.mjs';

const fixtures = [
  {
    program: 'primary',
    json: '{\n  "total": 192,\n  "status": "standard-compliant"\n}\n',
    markdown: '# Primary ledger\n\n| Total | Status |\n| ---: | --- |\n| 192 | standard-compliant |\n',
  },
  {
    program: 'supplemental',
    json: '{\n  "total": 411,\n  "reviewed": 93,\n  "backlog": 318\n}\n',
    markdown: '# Supplemental ledger\n\n| Total | Reviewed | Backlog |\n| ---: | ---: | ---: |\n| 411 | 93 | 318 |\n',
  },
];

for (const {program, json, markdown} of fixtures) {
  for (const [format, generated] of [['JSON', json], ['Markdown', markdown]]) {
    const crlf = generated.replaceAll('\n', '\r\n');
    const semanticMutation = generated.replace(/\b(?:192|411)\b/u, '999');

    assert(generatedArtifactMatches(generated, generated), `${program} ${format} LF must match itself`);
    assert(generatedArtifactMatches(crlf, generated), `${program} ${format} CRLF must match generated LF`);
    assert(!generatedArtifactMatches(semanticMutation, generated), `${program} ${format} semantic changes must fail`);
    assert(!generatedArtifactMatches(generated.slice(0, -1), generated), `${program} ${format} final-newline changes must fail`);
  }
}

const temporaryDirectory = await mkdtemp(join(tmpdir(), 'philosophy-atlas-release-gate-'));
const temporaryLedger = join(temporaryDirectory, 'ledger.md');
try {
  const generated = fixtures[0].markdown;
  const crlf = generated.replaceAll('\n', '\r\n');
  await writeFile(temporaryLedger, crlf, 'utf8');
  const fixedTimestamp = new Date('2001-01-01T00:00:00.000Z');
  await utimes(temporaryLedger, fixedTimestamp, fixedTimestamp);
  const before = await stat(temporaryLedger);

  assert.equal(
    await writeGeneratedArtifactIfChanged(temporaryLedger, generated),
    false,
    'CRLF-equivalent generated artifacts must not be rewritten',
  );
  const afterEquivalent = await stat(temporaryLedger);
  assert.equal(await readFile(temporaryLedger, 'utf8'), crlf, 'EOL-only equivalence must preserve the committed bytes');
  assert.equal(afterEquivalent.mtimeMs, before.mtimeMs, 'EOL-only equivalence must preserve the committed mtime');

  const semanticMutation = generated.replace('192', '193');
  assert.equal(
    await writeGeneratedArtifactIfChanged(temporaryLedger, semanticMutation),
    true,
    'Semantic generated-artifact changes must be written',
  );
  assert.equal(await readFile(temporaryLedger, 'utf8'), semanticMutation, 'Semantic writes must store the generated content exactly');
} finally {
  await rm(temporaryDirectory, {recursive: true, force: true});
}

console.log('Release-gate integrity test passed: primary and supplemental JSON/Markdown accept LF/CRLF differences only, reject semantic mutations, and skip EOL-only rewrites.');
