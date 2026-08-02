import assert from 'node:assert/strict';
import {validateFlagshipManifestShape} from './reportFlagshipProgram.mjs';

const valid = {
  version: 1,
  programId: 'test',
  targets: {thinker: 4000, philosophy: 5000},
  entries: [{label: 'Thinker', canonicalId: 'thinker', category: 'thinker', target: 4000}],
  approvedButMissing: [
    {label: 'Tradition', proposedCanonicalId: 'tradition', category: 'philosophy', target: 5000},
  ],
};

assert.deepEqual(validateFlagshipManifestShape(valid), []);
assert.match(
  validateFlagshipManifestShape({...valid, entries: [...valid.entries, {...valid.entries[0]}]}).join('\n'),
  /Duplicate flagship ID/,
);
assert.match(
  validateFlagshipManifestShape({...valid, entries: [{...valid.entries[0], target: 0}]}).join('\n'),
  /positive integer/,
);
assert.match(validateFlagshipManifestShape(null).join('\n'), /root must be an object/);

console.log('Flagship reporter tests passed: valid manifest, duplicate IDs, invalid targets, and malformed roots.');
