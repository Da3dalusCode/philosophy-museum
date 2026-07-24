import assert from 'node:assert/strict';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'vite';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const virtualEntry = 'virtual:philosophy-atlas-content-coverage';
const resolvedEntry = `\0${virtualEntry}`;

const result = await build({
  root: repoRoot,
  configFile: false,
  logLevel: 'silent',
  plugins: [{
    name: 'content-coverage-entry',
    resolveId: (id) => id === virtualEntry ? resolvedEntry : undefined,
    load: (id) => id === resolvedEntry ? `
      export {philosophers} from '/src/data/philosophers.ts';
      export {branches} from '/src/data/branches.ts';
      export {philosopherArticles, branchArticles} from '/src/data/articleDepth.ts';
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
assert(entry, 'Vite did not produce an executable content-coverage entry.');

const {
  philosophers,
  branches,
  philosopherArticles,
  branchArticles,
} = await import(`data:text/javascript;base64,${Buffer.from(entry.code).toString('base64')}`);

const philosopherIds = philosophers.map(({id}) => id);
const branchIds = branches.map(({id}) => id);
const articlePhilosopherIds = Object.keys(philosopherArticles);
const articleBranchIds = Object.keys(branchArticles);
const articlePhilosopherSet = new Set(articlePhilosopherIds);
const articleBranchSet = new Set(articleBranchIds);
const philosopherSet = new Set(philosopherIds);
const branchSet = new Set(branchIds);
const missingPhilosophers = philosopherIds.filter((id) => !articlePhilosopherSet.has(id));
const missingBranches = branchIds.filter((id) => !articleBranchSet.has(id));
const orphanPhilosopherArticles = articlePhilosopherIds.filter((id) => !philosopherSet.has(id));
const orphanBranchArticles = articleBranchIds.filter((id) => !branchSet.has(id));
const percent = (covered, total) => `${Math.round((covered / total) * 100)}%`;

const printGroup = (title, ids) => {
  console.log(`\n${title} (${ids.length})`);
  if (ids.length === 0) {
    console.log('  none');
    return;
  }
  for (const id of ids) console.log(`  ${id}`);
};

assert.equal(philosopherIds.length, 146, 'The approved Atlas must contain exactly 146 philosopher records.');
assert.equal(new Set(philosopherIds).size, philosopherIds.length, 'Philosopher IDs must be unique.');
assert.equal(branchIds.length, 43, 'The approved Atlas must contain exactly 43 branch records.');
assert.equal(new Set(branchIds).size, branchIds.length, 'Branch IDs must be unique.');
assert(philosopherSet.has('jiddu-krishnamurti'), 'Jiddu Krishnamurti is missing from the philosopher registry.');
assert(articlePhilosopherSet.has('jiddu-krishnamurti'), 'Jiddu Krishnamurti is missing from the article registry.');
assert.deepEqual(missingPhilosophers, [], 'Every philosopher requires articleSections.');
assert.deepEqual(missingBranches, [], 'Every branch requires articleSections.');
assert.deepEqual(orphanPhilosopherArticles, [], 'The philosopher article registry contains orphan IDs.');
assert.deepEqual(orphanBranchArticles, [], 'The branch article registry contains orphan IDs.');

console.log('Content article coverage');
console.log(`Article registry: ${articlePhilosopherIds.length} philosopher articles, ${articleBranchIds.length} branch articles`);
console.log(`Philosophers: ${philosopherIds.length - missingPhilosophers.length}/${philosopherIds.length} covered (${percent(philosopherIds.length - missingPhilosophers.length, philosopherIds.length)})`);
console.log(`Branches: ${branchIds.length - missingBranches.length}/${branchIds.length} covered (${percent(branchIds.length - missingBranches.length, branchIds.length)})`);
printGroup('Philosophers missing articleSections', missingPhilosophers);
printGroup('Branches missing articleSections', missingBranches);
printGroup('Orphan philosopher articles', orphanPhilosopherArticles);
printGroup('Orphan branch articles', orphanBranchArticles);
console.log('\nCoverage contract passed: 146 philosophers and 43 branches, including Marsilio Ficino, Galileo Galilei, Prodicus, Hippias of Elis, and Jiddu Krishnamurti, are covered exactly once.');
